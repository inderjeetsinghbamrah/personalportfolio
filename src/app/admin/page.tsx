"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  Unlock, 
  Key, 
  Eye, 
  EyeOff, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Download, 
  Upload, 
  FileText, 
  Layers, 
  Terminal, 
  ExternalLink,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  LogOut,
  Database,
  Zap
} from "lucide-react";
import { 
  usePortfolioData, 
  adminLogin,
  adminCheckSession,
  adminLogout,
  adminChangePasscode
} from "@/lib/portfolio-data";
import { 
  getLocalMessages, 
  deleteLocalMessage, 
  toggleMessageReadStatus, 
  ContactMessage, 
  checkSupabaseHealth,
  supabase,
  supabaseProjectRef,
  supabaseProjectName
} from "@/lib/supabase";
import { ProjectItem, PillarItem, PortfolioData } from "@/data/default-portfolio";
import { sound } from "@/lib/sound";

type ActiveTab = "profile" | "projects" | "resume" | "messages" | "system";

export default function AdminPage() {
  const { data, updateData, resetData } = usePortfolioData();
  
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  
  // Alternate Supabase Auth tab
  const [authMethod, setAuthMethod] = useState<"pin" | "supabase">("pin");
  const [supabaseEmail, setSupabaseEmail] = useState("");
  const [supabasePassword, setSupabasePassword] = useState("");
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(false);

  // Admin Dashboard states
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Inquiries / Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Editing Project Modal / Form State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Passcode change state
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinChangeMsg, setPinChangeMsg] = useState<{ text: string; error: boolean } | null>(null);

  // Supabase cloud health state
  const [backendHealth, setBackendHealth] = useState<{
    tested: boolean;
    connected: boolean;
    version?: string;
    error?: string;
  }>({ tested: false, connected: false });

  // Initialize Auth state & form data
  useEffect(() => {
    adminCheckSession().then((isValid) => {
      if (isValid) {
        setIsAuthenticated(true);
        loadMessages();
      }
    });
    setFormData(data);
  }, [data]);

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages", { credentials: "include" });
      if (res.ok) {
        const json = await res.json();
        if (json.messages && json.messages.length > 0) {
          setMessages(json.messages);
          return;
        }
      }
    } catch {
      // Fallback to local storage messages
    }
    const list = getLocalMessages();
    setMessages(list);
  };

  // Handle Passcode Submission (Safest Scrypt/PBKDF2 Server Verification + Redis Rate Limiting)
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const res = await adminLogin(passcodeAttempt);
    if (res.success) {
      sound.playSuccess();
      setIsAuthenticated(true);
      loadMessages();
    } else {
      sound.playError();
      setIsShaking(true);
      setAuthError(res.error || "Access Denied: Invalid Security Passcode");
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  // Handle Supabase Auth Sign-In
  const handleSupabaseSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSupabaseLoading(true);
    setAuthError("");
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: supabaseEmail,
        password: supabasePassword,
      });

      if (error) {
        setAuthError(error.message);
        sound.playError();
      } else if (authData.user) {
        sound.playSuccess();
        setIsAuthenticated(true);
        loadMessages();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setAuthError(msg);
    } finally {
      setIsSupabaseLoading(false);
    }
  };

  const handleLogout = async () => {
    sound.playClick();
    await adminLogout();
    setIsAuthenticated(false);
    setPasscodeAttempt("");
  };

  // Track Form Changes
  const handleProfileChange = <K extends keyof PortfolioData["profile"]>(field: K, value: PortfolioData["profile"][K]) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handlePillarChange = (index: number, field: keyof PillarItem, value: string) => {
    const updated = [...formData.profile.pillars];
    updated[index] = { ...updated[index], [field]: value };
    handleProfileChange("pillars", updated);
  };

  const handleResumeChange = <K extends keyof PortfolioData["resume"]>(field: K, value: PortfolioData["resume"][K]) => {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleCompetencyChange = (key: "frontend" | "systems" | "devops", val: string) => {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        competencies: {
          ...prev.resume.competencies,
          [key]: val,
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleWorkReadinessChange = (key: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      resume: {
        ...prev.resume,
        workReadiness: {
          ...prev.resume.workReadiness,
          [key]: val,
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  // Save All Changes
  const handleSaveAll = async () => {
    sound.playClick();
    const res = await updateData(formData);
    if (res.success) {
      sound.playSuccess();
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      sound.playError();
      alert(`Save notice: ${res.error || "Failed to persist changes"}`);
    }
  };

  // Move Project Up / Down
  const moveProject = (index: number, direction: "up" | "down") => {
    const newProjects = [...formData.projects];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newProjects.length) return;
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIdx];
    newProjects[targetIdx] = temp;
    setFormData((prev) => ({ ...prev, projects: newProjects }));
    setHasUnsavedChanges(true);
  };

  // Delete Project
  const deleteProject = (id: string) => {
    if (!confirm("Are you sure you want to remove this project from your portfolio?")) return;
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    setHasUnsavedChanges(true);
  };

  // Save / Update Project
  const saveProjectModal = (project: ProjectItem) => {
    let updatedProjects: ProjectItem[];
    const exists = formData.projects.some((p) => p.id === project.id);
    if (exists) {
      updatedProjects = formData.projects.map((p) => (p.id === project.id ? project : p));
    } else {
      updatedProjects = [...formData.projects, project];
    }
    setFormData((prev) => ({ ...prev, projects: updatedProjects }));
    setHasUnsavedChanges(true);
    setEditingProject(null);
    setIsCreatingProject(false);
  };

  // Change Admin Passcode (Safest Server-Side PBKDF2/Scrypt Hash + DB Sync)
  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 6) {
      setPinChangeMsg({ text: "New passcode must be at least 6 characters long", error: true });
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeMsg({ text: "New passcodes do not match", error: true });
      return;
    }

    const res = await adminChangePasscode(currentPin, newPin);
    if (res.success) {
      sound.playSuccess();
      setPinChangeMsg({ text: "Master passcode cryptographically updated & hashed in Supabase Postgres!", error: false });
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
    } else {
      sound.playError();
      setPinChangeMsg({ text: res.error || "Failed to update passcode", error: true });
    }
  };

  // Export & Import Backup JSON
  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.profile && imported.projects && imported.resume) {
          setFormData(imported);
          setHasUnsavedChanges(true);
          alert("Backup configuration loaded successfully! Click 'Save All Changes' to apply.");
        } else {
          alert("Invalid portfolio backup file format.");
        }
      } catch {
        alert("Failed to parse JSON backup file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = () => {
    if (confirm("Reset all details back to factory defaults? All custom edits will be reverted.")) {
      resetData();
      sound.playClick();
      alert("Portfolio reset to initial default dossier.");
      window.location.reload();
    }
  };

  const testSupabaseConnection = async () => {
    const health = await checkSupabaseHealth();
    setBackendHealth({
      tested: true,
      connected: health.connected,
      version: health.version,
      error: health.error,
    });
  };

  // =========================================================================
  // VIEW: LOCKED SECURITY GATE (Unauthenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#07080b] flex flex-col justify-center items-center px-4 py-12 relative text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        <div className="fixed inset-0 pointer-events-none ambient-grid opacity-30 z-0" />

        <div className="relative z-10 w-full max-w-md">
          {/* Back to site shortcut */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Public Portfolio</span>
          </Link>

          <div
            className={`rounded-2xl bg-[#0c0e14] border border-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all ${
              isShaking ? "animate-shake border-rose-500/50" : ""
            }`}
          >
            {/* Terminal Shield Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 block font-semibold">
                  RESTRICTED ACCESS // SYSTEMS CORE
                </span>
                <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
                  Owner Admin Terminal
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Authenticate to customize portfolio parameters, manage projects, and view inquiries.
                </p>
              </div>
            </div>

            {/* Auth Method Selector */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/40 border border-white/[0.08] rounded-xl mb-6 text-xs font-medium">
              <button
                type="button"
                onClick={() => setAuthMethod("pin")}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  authMethod === "pin"
                    ? "bg-white/10 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Master PIN</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod("supabase")}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  authMethod === "supabase"
                    ? "bg-white/10 text-white font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase Auth</span>
              </button>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* FORM 1: Master Passcode Entry */}
            {authMethod === "pin" ? (
              <form onSubmit={handleAuthSubmit} className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                      Security Passcode
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Default: systems2026
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPasscode ? "text" : "password"}
                      autoFocus
                      required
                      value={passcodeAttempt}
                      onChange={(e) => setPasscodeAttempt(e.target.value)}
                      placeholder="Enter master passcode..."
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors font-mono tracking-wider pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Authorize &amp; Enter Console</span>
                </button>
              </form>
            ) : (
              /* FORM 2: Supabase User Sign-In */
              <form onSubmit={handleSupabaseSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Supabase Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={supabaseEmail}
                    onChange={(e) => setSupabaseEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={supabasePassword}
                    onChange={(e) => setSupabasePassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSupabaseLoading}
                  className="w-full py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSupabaseLoading ? (
                    <span>Verifying session...</span>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Sign In with Supabase</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Security Notice */}
            <div className="mt-8 pt-5 border-t border-white/[0.08] text-[11px] font-mono text-slate-500 text-center leading-relaxed">
              <span>Stealth Route // Unauthorized access attempts logged.</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATED ADMIN CONSOLE
  // =========================================================================
  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen bg-[#07080b] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Subtle ambient grid pattern */}
      <div className="fixed inset-0 pointer-events-none ambient-grid opacity-30 z-0" />

      {/* Top Fixed Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#0c0e14]/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                SYSTEMS OVERRIDE // ADMIN CONSOLE
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-medium">
                Live Edit Mode
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* View Live Portfolio */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 text-xs text-slate-200 transition-colors"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Save Button */}
            <button
              onClick={handleSaveAll}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                hasUnsavedChanges
                  ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 animate-pulse"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>{hasUnsavedChanges ? "Save Changes" : "Saved"}</span>
            </button>

            {/* Lock / Logout */}
            <button
              onClick={handleLogout}
              title="Lock Session"
              className="p-2 rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Save confirmation toast */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All changes saved successfully! Live portfolio updated.</span>
            </div>
            <Link href="/" target="_blank" className="underline hover:text-white">
              Preview changes ➔
            </Link>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-white/[0.08] mb-8 text-xs font-medium scrollbar-none">
          {[
            { id: "profile", label: "Profile & Bio", icon: <FileText className="w-4 h-4" /> },
            { id: "projects", label: `Projects (${formData.projects.length})`, icon: <Layers className="w-4 h-4" /> },
            { id: "resume", label: "Resume & Skills", icon: <Terminal className="w-4 h-4" /> },
            {
              id: "messages",
              label: `Inquiries (${messages.length})`,
              icon: <Mail className="w-4 h-4" />,
              badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
            },
            { id: "system", label: "Security & System", icon: <Shield className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as ActiveTab);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 font-semibold shadow-md"
                  : "bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* TAB 1: PROFILE & BIO                                              */}
        {/* ================================================================= */}
        {activeTab === "profile" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Basic Identity & Availability */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Identity &amp; Status Parameters</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Full Name / Handle
                  </label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Professional Role Title
                  </label>
                  <input
                    type="text"
                    value={formData.profile.role}
                    onChange={(e) => handleProfileChange("role", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Availability Toggle & Status Badge */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/[0.06]">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Availability State
                  </label>
                  <button
                    type="button"
                    onClick={() => handleProfileChange("isAvailable", !formData.profile.isAvailable)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-medium border flex items-center justify-between transition-colors ${
                      formData.profile.isAvailable
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    }`}
                  >
                    <span>{formData.profile.isAvailable ? "Available for Roles" : "Currently Busy"}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        formData.profile.isAvailable ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Header Availability Badge Text
                  </label>
                  <input
                    type="text"
                    value={formData.profile.statusBadge}
                    onChange={(e) => handleProfileChange("statusBadge", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Timezone Overlap & Architectural Tag */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Timezone &amp; Overlap SLA Badge
                  </label>
                  <input
                    type="text"
                    value={formData.profile.timezoneOverlap}
                    onChange={(e) => handleProfileChange("timezoneOverlap", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Distributed Architecture Tag
                  </label>
                  <input
                    type="text"
                    value={formData.profile.architectureTag}
                    onChange={(e) => handleProfileChange("architectureTag", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Headlines & Narrative Bio */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <h2 className="text-base font-bold text-white tracking-tight">
                Hero Headline &amp; Narrative Bio
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Hero Main H1 Headline
                </label>
                <textarea
                  rows={2}
                  value={formData.profile.headline}
                  onChange={(e) => handleProfileChange("headline", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Narrative Bio Paragraph
                </label>
                <textarea
                  rows={4}
                  value={formData.profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <h2 className="text-base font-bold text-white tracking-tight">
                Communication Channels &amp; Social Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.profile.githubUrl}
                    onChange={(e) => handleProfileChange("githubUrl", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.profile.linkedinUrl}
                    onChange={(e) => handleProfileChange("linkedinUrl", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 3-Pillar Architecture Overview Cards */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <h2 className="text-base font-bold text-white tracking-tight">
                Hero 3-Pillar Architectural Cards
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formData.profile.pillars.map((pillar, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
                    <div className="text-xs font-mono text-slate-400 font-semibold">{pillar.number}</div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Tech Title</label>
                      <input
                        type="text"
                        value={pillar.tech}
                        onChange={(e) => handlePillarChange(idx, "tech", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={pillar.description}
                        onChange={(e) => handlePillarChange(idx, "description", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: PROJECTS DOSSIER                                           */}
        {/* ================================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header row with Add Project button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Selected Engineering Projects
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Reorder, modify metrics, update highlights, or add new production systems.
                </p>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setEditingProject({
                    id: `project-${Date.now()}`,
                    title: "New Project",
                    subtitle: "High-Throughput Distributed Microservice",
                    category: "rust",
                    badge: "Rust / Systems",
                    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
                    description: "Describe the architectural scope, concurrency model, and production deployment...",
                    highlights: [
                      "Sub-millisecond P99 tail latency under high concurrency",
                      "Automated recovery via crash-tolerant write-ahead logging",
                    ],
                    metrics: [
                      { label: "Throughput", value: "100k req/s" },
                      { label: "P99 Latency", value: "1.2 ms" },
                      { label: "Memory Footprint", value: "24 MB" },
                    ],
                    stack: ["Rust", "Tokio", "Docker"],
                    terminalCmd: "cargo test --release",
                  });
                  setIsCreatingProject(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {formData.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="card-clean p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/20 transition-all"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-white/10 bg-white/[0.04] text-emerald-400">
                        {proj.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-medium">
                        Category: {proj.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      {proj.subtitle}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.stack.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.03] border border-white/[0.06] text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {/* Move Up */}
                    <button
                      onClick={() => moveProject(idx, "up")}
                      disabled={idx === 0}
                      title="Move Up"
                      className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => moveProject(idx, "down")}
                      disabled={idx === formData.projects.length - 1}
                      title="Move Down"
                      className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => {
                        sound.playClick();
                        setEditingProject({ ...proj });
                        setIsCreatingProject(false);
                      }}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Edit / Create Project */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
                <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0e14] border border-white/20 p-6 sm:p-8 text-slate-100 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-base font-bold text-white">
                      {isCreatingProject ? "Create New Engineering Project" : `Edit Project: ${editingProject.title}`}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-slate-400 hover:text-white text-xs font-mono"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-mono mb-1">Project Title</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-mono mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={editingProject.subtitle}
                        onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-mono mb-1">Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectItem["category"] })}
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="rust">Rust / Systems</option>
                        <option value="nextjs">Next.js / Web</option>
                        <option value="devops">DevOps &amp; Cloud</option>
                        <option value="spatial">3D &amp; WASM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-mono mb-1">Badge Text</label>
                      <input
                        type="text"
                        value={editingProject.badge}
                        onChange={(e) => setEditingProject({ ...editingProject, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 font-mono mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Highlights (Comma separated or line separated) */}
                  <div>
                    <label className="block text-[11px] text-slate-400 font-mono mb-1">
                      Technical Highlights (One bullet point per line)
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.highlights.join("\n")}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          highlights: e.target.value.split("\n").filter((l) => l.trim() !== ""),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none resize-none font-mono"
                    />
                  </div>

                  {/* Metrics Editor */}
                  <div>
                    <label className="block text-[11px] text-slate-400 font-mono mb-2">Performance Metrics (3)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {editingProject.metrics.map((m, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                          <input
                            type="text"
                            placeholder="Label (e.g. Throughput)"
                            value={m.label}
                            onChange={(e) => {
                              const updated = [...editingProject.metrics];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setEditingProject({ ...editingProject, metrics: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/[0.08] text-[11px] text-slate-300"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g. 240k req/s)"
                            value={m.value}
                            onChange={(e) => {
                              const updated = [...editingProject.metrics];
                              updated[idx] = { ...updated[idx], value: e.target.value };
                              setEditingProject({ ...editingProject, metrics: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-black/40 border border-white/[0.08] text-xs font-semibold text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div>
                    <label className="block text-[11px] text-slate-400 font-mono mb-1">
                      Tech Stack (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={editingProject.stack.join(", ")}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Terminal Snippet */}
                  <div>
                    <label className="block text-[11px] text-slate-400 font-mono mb-1">
                      Terminal Command Snippet
                    </label>
                    <input
                      type="text"
                      value={editingProject.terminalCmd}
                      onChange={(e) => setEditingProject({ ...editingProject, terminalCmd: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/[0.08] text-emerald-400 text-xs focus:border-emerald-500 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveProjectModal(editingProject)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors"
                    >
                      Apply Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: RESUME & SKILLS                                            */}
        {/* ================================================================= */}
        {activeTab === "resume" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Professional Summary */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-4">
              <h2 className="text-base font-bold text-white tracking-tight">
                ATS Professional Summary
              </h2>
              <p className="text-xs text-slate-400">
                This appears on the ATS-compliant resume modal and printable dossier.
              </p>
              <textarea
                rows={5}
                value={formData.resume.summary}
                onChange={(e) => handleResumeChange("summary", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Core Competencies Matrix */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <h2 className="text-base font-bold text-white tracking-tight">
                Technical Competencies Matrix
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-emerald-400 font-semibold uppercase mb-2">
                    Frontend &amp; Edge
                  </label>
                  <textarea
                    rows={4}
                    value={formData.resume.competencies.frontend}
                    onChange={(e) => handleCompetencyChange("frontend", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-400 font-semibold uppercase mb-2">
                    Systems &amp; Concurrency
                  </label>
                  <textarea
                    rows={4}
                    value={formData.resume.competencies.systems}
                    onChange={(e) => handleCompetencyChange("systems", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-sky-400 font-semibold uppercase mb-2">
                    DevOps &amp; Cloud Infrastructure
                  </label>
                  <textarea
                    rows={4}
                    value={formData.resume.competencies.devops}
                    onChange={(e) => handleCompetencyChange("devops", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* International Work Readiness Badges */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <h2 className="text-base font-bold text-white tracking-tight">
                International Remote Readiness Badges
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Async-First</label>
                  <input
                    type="text"
                    value={formData.resume.workReadiness.asyncFirst}
                    onChange={(e) => handleWorkReadinessChange("asyncFirst", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">US/EU Overlap</label>
                  <input
                    type="text"
                    value={formData.resume.workReadiness.usEuOverlap}
                    onChange={(e) => handleWorkReadinessChange("usEuOverlap", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Contract Models</label>
                  <input
                    type="text"
                    value={formData.resume.workReadiness.contractModels}
                    onChange={(e) => handleWorkReadinessChange("contractModels", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">English Fluency</label>
                  <input
                    type="text"
                    value={formData.resume.workReadiness.english}
                    onChange={(e) => handleWorkReadinessChange("english", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: CONTACT INQUIRIES INBOX                                    */}
        {/* ================================================================= */}
        {activeTab === "messages" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Contact Form Inquiries ({messages.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submissions captured from your website&apos;s contact portal.
                </p>
              </div>

              <button
                onClick={() => {
                  loadMessages();
                  sound.playClick();
                }}
                className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="card-clean p-12 rounded-2xl text-center space-y-3">
                <Mail className="w-8 h-8 text-slate-500 mx-auto" />
                <h3 className="text-sm font-semibold text-white">No inquiries yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  When visitors submit inquiries via the &quot;Get in touch&quot; form, they will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id || msg.email + msg.created_at}
                    className={`card-clean p-5 rounded-2xl transition-all ${
                      !msg.read ? "border-emerald-500/30 bg-emerald-500/[0.02]" : "border-white/[0.06]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            !msg.read ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                          }`}
                        />
                        <span className="font-bold text-sm text-white">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}?subject=Re: Inquiring about ${encodeURIComponent(msg.focus)}`}
                          className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>{msg.email}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                          {msg.focus}
                        </span>
                        <span>{msg.created_at ? new Date(msg.created_at).toLocaleDateString() : "Recent"}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/[0.04] mb-4">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.focus)}`}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (msg.id) {
                              toggleMessageReadStatus(msg.id);
                              loadMessages();
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-300 transition-colors"
                        >
                          {msg.read ? "Mark as Unread" : "Mark as Read"}
                        </button>

                        <button
                          onClick={async () => {
                            if (msg.id && confirm("Delete this message from inbox?")) {
                              try {
                                await fetch("/api/admin/messages", {
                                  method: "DELETE",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ id: msg.id }),
                                  credentials: "include",
                                });
                              } catch {}
                              deleteLocalMessage(msg.id);
                              loadMessages();
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: SECURITY & SYSTEM SETTINGS                                 */}
        {/* ================================================================= */}
        {activeTab === "system" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Passcode Update Section */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-400" />
                  <span>Update Admin Master Passcode</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Change the secret PIN required to access this hidden console.
                </p>
              </div>

              {pinChangeMsg && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
                    pinChangeMsg.error
                      ? "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                      : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  }`}
                >
                  {pinChangeMsg.error ? (
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>{pinChangeMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleChangePin} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    New Passcode (min 4 chars)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="sm:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors"
                  >
                    Update Passcode
                  </button>
                </div>
              </form>
            </div>

            {/* Backup & Restore Section */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-6">
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Dossier Backup &amp; Migration
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Export all portfolio customizations as a JSON file or import a previous backup.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleExportBackup}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Backup JSON</span>
                </button>

                <label className="px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/10 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4 text-sky-400" />
                  <span>Import Backup JSON</span>
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>
            </div>

            {/* Supabase Cloud Connection Diagnostics */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Supabase Cloud Diagnostics</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Project: <span className="font-mono text-slate-300">{supabaseProjectName}</span> ({supabaseProjectRef})
                  </p>
                </div>

                <button
                  onClick={testSupabaseConnection}
                  className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Run Connection Ping</span>
                </button>
              </div>

              {backendHealth.tested && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    backendHealth.connected
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                      : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                  }`}
                >
                  {backendHealth.connected ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span>
                    {backendHealth.connected
                      ? `Supabase cloud endpoint responding healthy (Version: ${backendHealth.version || "active"})`
                      : `Connection issue: ${backendHealth.error}`}
                  </span>
                </div>
              )}
            </div>

            {/* Redis Ultra-Fast Caching Tier */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Redis Fast-Access Acceleration Tier</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sub-millisecond read cache with automated Supabase cache invalidation &amp; sync.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-semibold">
                  Active // Sub-5ms
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">Cache Strategy</span>
                  <span className="text-white font-bold text-xs mt-0.5 block">Read/Write-Through</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">Key Lifetime (TTL)</span>
                  <span className="text-emerald-400 font-bold text-xs mt-0.5 block">86,400s (24h)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-400 text-[10px] block">Security Rate Limiter</span>
                  <span className="text-sky-400 font-bold text-xs mt-0.5 block">5 attempts / 15m</span>
                </div>
              </div>
            </div>

            {/* Danger Zone: Factory Reset */}
            <div className="card-clean p-6 sm:p-8 rounded-2xl border-rose-500/20 bg-rose-500/[0.01] space-y-4">
              <div>
                <h2 className="text-base font-bold text-rose-400 tracking-tight">
                  Danger Zone // Revert to Defaults
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Revert all edited fields, projects, and summary statements back to the repository defaults.
                </p>
              </div>

              <button
                onClick={handleResetToDefaults}
                className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Revert to Repository Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
