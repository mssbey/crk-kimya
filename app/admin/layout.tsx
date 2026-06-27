import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRK Admin Paneli",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {children}
    </div>
  );
}
