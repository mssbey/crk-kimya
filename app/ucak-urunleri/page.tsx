"use client";

import Image from "next/image";
import { Plane } from "lucide-react";
import { PremiumCatalog } from "@/components/PremiumCatalog";

const AVIATION_CATEGORIES = [
  { name: "Blue Solutions", page: 2 },
  { name: "Cream Jel", page: 3 },
  { name: "Fourno", page: 4 },
  { name: "Gomma Remover", page: 5 },
  { name: "Jully RB", page: 6 },
  { name: "Tecnico Percarrelo", page: 7 },
  { name: "Tecnico Sol 400", page: 8 },
  { name: "Vinegar", page: 9 },
];

export default function UcakUrunleriPage() {
  return (
    <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
      {/* ── Minimal top bar (no nav links) ── */}
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #E2E8F0",
          padding: "0 1.5rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          boxShadow: "0 1px 8px rgba(15,23,42,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: 1550,
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            src="/logo.png"
            alt="CRK Kimya"
            width={140}
            height={46}
            style={{ objectFit: "contain", height: "auto", maxHeight: "42px" }}
            priority
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 14px",
              borderRadius: 100,
              background: "rgba(26,47,143,0.06)",
              border: "1px solid rgba(26,47,143,0.12)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#1A2F8F",
            }}
          >
            <Plane size={13} />
            Havacılık Ürün Kataloğu
          </div>
        </div>
      </div>

      {/* ── Catalog viewer (same component as main catalog) ── */}
      <div style={{ paddingTop: 68 }}>
        <PremiumCatalog
          pdfUrl="/catalog/ucak-urun.pdf"
          categories={AVIATION_CATEGORIES}
          tagLabel="Havacılık Kataloğu 2026"
          titleGradient="Uçak Bakım"
          titlePlain="Ürün Kataloğu"
          subtitle="Sayfaları çevirmek için kenarlara tıklayın veya ok tuşlarını kullanın"
          contentTopPadding={30}
        />
      </div>
    </div>
  );
}
