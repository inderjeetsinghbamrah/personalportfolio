import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems Terminal // Restricted Authorization",
  description: "Systems operations management interface.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
