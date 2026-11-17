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
  themeColor: "#060709",
};

export const metadata: Metadata = {
  title: "Inderjeet // Systems & Full-Stack Architect",
  description:
    "Interactive 3D portfolio of Inderjeet: Systems & Full-Stack Software Developer specializing in React 19, Next.js App Router, Rust compiled runtimes, and Cloud-Native Kubernetes DevOps orchestration.",
  keywords: [
    "Inderjeet",
    "Systems Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Rust",
    "Kubernetes",
    "Docker",
    "Three.js",
    "WebGL",
    "DevOps",
  ],
  authors: [{ name: "Inderjeet" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#060709] text-white selection:bg-[#00ffaa] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
