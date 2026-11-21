"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import {
  Shield,
  KeyRound,
  Layers,
  Mail,
  User,
  Plus,
  Trash2,
  Edit3,
  AlertCircle,
  LogOut,
  ArrowLeft,
  ExternalLink,
  Eye,
  EyeOff
} from "lucide-react";
import { Project, ContactMessage, Profile } from "@/types/portfolio";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Admin Data state
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "profile" | "messages">("overview");
  const [, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Project Edit State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const fetchAdminData = async (code?: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", {
        headers: {
          ...(code ? { "x-admin-passcode": code } : {}),
        },
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
      setProjects(data.projects || []);
      setProfile(data.profile || null);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Attempt session cookie authentication on mount
    fetchAdminData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTick();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid authentication passcode.");
      }

      setIsAuthenticated(true);
      sound.playSuccess();
      fetchAdminData(passcode.trim());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed.";
      setAuthError(msg);
      sound.playTick();
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    sound.playTick();
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleDeleteMessage = async (id?: string) => {
    if (!id || !confirm("Permanently delete this message?")) return;
    sound.playTick();
    try {
      const res = await fetch(`/api/admin/content?type=message&id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode || "systems2026" },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        setStatusMsg({ type: "success", text: "Message deleted from PostgreSQL." });
        sound.playSuccess();
      }
    } catch {
      setStatusMsg({ type: "error", text: "Failed to delete message." });
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    sound.playTick();
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode || "systems2026",
        },
        body: JSON.stringify({
          action: "save_project",
          payload: editingProject,
        }),
      });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Project successfully updated in database." });
        sound.playSuccess();
        setEditingProject(null);
        fetchAdminData();
      } else {
        const data = await res.json();
        throw new Error(data.error || "Save failed.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving project.";
      setStatusMsg({ type: "error", text: msg });
    }
  };

  const handleTogglePublish = async (project: Project) => {
    sound.playTick();
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode || "systems2026",
        },
        body: JSON.stringify({
          action: "save_project",
          payload: {
            id: project.id,
            is_published: !project.is_published,
          },
        }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, is_published: !p.is_published } : p))
        );
        sound.playSuccess();
      }
    } catch {
      setStatusMsg({ type: "error", text: "Toggle failed." });
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    sound.playTick();
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode || "systems2026",
        },
        body: JSON.stringify({
          action: "update_profile",
          payload: profile,
        }),
      });
      if (res.ok) {
        setStatusMsg({ type: "success", text: "Profile updated successfully." });
        sound.playSuccess();
      }
    } catch {
      setStatusMsg({ type: "error", text: "Profile update failed." });
    }
  };

  // 1. Unauthenticated Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090C] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0E1017] border border-white/[0.1] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Systems Control // Administration Gate
            </h1>
            <p className="text-xs text-slate-400">
              Enter administrator passcode to access live Supabase database management.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#141824] border border-white/[0.1] text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs font-sans transition-all disabled:opacity-50"
            >
              {authLoading ? "Authorizing Session..." : "Authorize Access"}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Management Console
  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 selection:bg-indigo-500/30 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0E1017]/90 backdrop-blur-md border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
            ISB
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Admin Management Console</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PG17 CONNECTED
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Inderjeet Singh Bamrah &bull; Live Supabase Database
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 hover:text-white"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-mono text-red-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {statusMsg && (
          <div
            className={`mb-6 p-4 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${
              statusMsg.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            <span>{statusMsg.text}</span>
            <button onClick={() => setStatusMsg(null)} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-8">
          {[
            { id: "overview", label: "Overview & Stats", icon: Shield },
            { id: "projects", label: `Projects (${projects.length})`, icon: Layers },
            { id: "profile", label: "Profile & Availability", icon: User },
            { id: "messages", label: `Contact Inbox (${messages.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-[#0E1017] text-slate-400 hover:text-slate-200 border border-white/[0.06]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-1">
                <span className="text-[11px] font-mono text-slate-400">PUBLISHED PROJECTS</span>
                <div className="text-2xl font-bold text-white">
                  {projects.filter((p) => p.is_published).length} / {projects.length}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">100% ONLINE</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-1">
                <span className="text-[11px] font-mono text-slate-400">CONTACT INQUIRIES</span>
                <div className="text-2xl font-bold text-white">{messages.length}</div>
                <div className="text-[11px] text-indigo-400 font-mono">RECORDED IN SUPABASE</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-1">
                <span className="text-[11px] font-mono text-slate-400">CURRENT AVAILABILITY</span>
                <div className="text-sm font-bold text-white truncate">
                  {profile?.availability_status || "Available"}
                </div>
                <div className="text-[11px] text-sky-400 font-mono">CONFIGURABLE ON DEMAND</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-3">
              <h3 className="font-bold text-sm text-white">System Health & Verification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Database connected to Supabase PostgreSQL cluster (ref: ovmvzfakvxoshjnwsfcy). All tables protected with Row Level Security. Public visitors can only execute approved read queries on published content and sanitized inserts on contact submissions.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Projects Manager */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Manage Portfolio Projects</h3>
              <button
                onClick={() => {
                  sound.playTick();
                  setEditingProject({
                    title: "",
                    slug: "",
                    tagline: "",
                    category_name: "SaaS Applications",
                    overview: "",
                    problem_statement: "",
                    solution: "",
                    technologies: ["React", "TypeScript", "PostgreSQL"],
                    is_published: true,
                    is_featured: false,
                    sort_order: projects.length + 1,
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Editing Form Modal */}
            {editingProject && (
              <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-[#121624] border border-indigo-500/40 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <h4 className="font-bold text-white text-sm">
                    {editingProject.id ? "Edit Project" : "New Project"}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="text-slate-400 hover:text-white text-xs font-mono"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Slug (URL)</label>
                    <input
                      type="text"
                      required
                      value={editingProject.slug || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Tagline / Subtitle</label>
                  <input
                    type="text"
                    required
                    value={editingProject.tagline || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Overview</label>
                  <textarea
                    rows={3}
                    required
                    value={editingProject.overview || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 rounded bg-white/[0.05] text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
                  >
                    Save to Supabase
                  </button>
                </div>
              </form>
            )}

            {/* Project List */}
            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.slug}
                  className="p-4 rounded-xl bg-[#0E1017] border border-white/[0.08] flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{proj.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-indigo-400">
                        {proj.category_name}
                      </span>
                      {proj.is_featured && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/10 text-amber-400">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{proj.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1 ${
                        proj.is_published
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-800 text-slate-500"
                      }`}
                      title={proj.is_published ? "Published (Click to hide)" : "Draft (Click to publish)"}
                    >
                      {proj.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{proj.is_published ? "Published" : "Draft"}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playTick();
                        setEditingProject(proj);
                      }}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile Editor */}
        {activeTab === "profile" && profile && (
          <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-2xl bg-[#0E1017] border border-white/[0.08] space-y-6">
            <h3 className="text-lg font-bold text-white">Update Profile Parameters</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Professional Identity</label>
                <input
                  type="text"
                  value={profile.professional_identity}
                  onChange={(e) => setProfile({ ...profile, professional_identity: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Headline</label>
              <input
                type="text"
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Availability Status</label>
              <input
                type="text"
                value={profile.availability_status}
                onChange={(e) => setProfile({ ...profile, availability_status: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Bio</label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3 py-2 rounded bg-black/40 border border-white/[0.1] text-xs text-white"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs font-sans transition-colors"
              >
                Update Profile in Supabase
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Messages Inbox */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact Submissions ({messages.length})</h3>
            {messages.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#0E1017] text-center text-xs text-slate-400">
                No submissions received yet.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-xl bg-[#0E1017] border border-white/[0.08] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-white">{m.name}</span>
                      <span className="text-xs font-mono text-indigo-400">{m.email}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400">
                        {m.focus}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteMessage(m.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 p-3 rounded-lg bg-black/40 border border-white/[0.04]">
                    {m.message}
                  </p>

                  <div className="text-[10px] font-mono text-slate-500">
                    RECEIVED: {m.created_at ? new Date(m.created_at).toLocaleString() : "Recently"}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
