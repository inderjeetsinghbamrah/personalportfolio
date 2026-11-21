import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08090C",
};

export const metadata: Metadata = {
  title: "Inderjeet Singh Bamrah — Full-Stack Developer & Software Architect",
  description:
    "Personal engineering laboratory & portfolio of Inderjeet Singh Bamrah: Full-Stack Developer, Software Architect, UI/UX Designer, and Lecturer in Information Technology. M.Tech CS/IT, B.Tech IT.",
  keywords: [
    "Inderjeet Singh Bamrah",
    "Software Architect",
    "Full-Stack Developer",
    "UI/UX Designer",
    "Product Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "Kubernetes",
    "Redis",
    "Outcome-Based Education",
    "EDUOBAL",
  ],
  authors: [{ name: "Inderjeet Singh Bamrah", url: "https://github.com/inderjeetsingh" }],
  openGraph: {
    title: "Inderjeet Singh Bamrah — Full-Stack Developer & Software Architect",
    description: "I design thoughtful digital experiences and engineer scalable software systems.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Inderjeet Singh Bamrah",
    jobTitle: "Full-Stack Developer & Software Architect",
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Master of Technology (M.Tech) in Computer Science & IT",
      },
      {
        "@type": "EducationalOrganization",
        name: "Bachelor of Technology (B.Tech) in Information Technology",
      },
    ],
    knowsAbout: [
      "Software Architecture",
      "Full-Stack Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Redis",
      "Docker",
      "Kubernetes",
      "Outcome-Based Education",
    ],
    sameAs: [
      "https://github.com/inderjeetsingh",
      "https://linkedin.com/in/inderjeetsinghbamrah",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/markdown" href="/index.md" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
