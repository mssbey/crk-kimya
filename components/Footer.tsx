"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Download } from "lucide-react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/urun-gruplari", label: "Ürün Grupları" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/kalite-politikasi", label: "Kalite Politikası" },
  { href: "/iletisim", label: "İletişim" },
];

const products = [
  "Endüstriyel Kimyasallar",
  "Petrokimya Ürünleri",
  "Su Arıtma Kimyasalları",
  "Gıda Katkıları",
  "Kozmetik Hammaddeleri",
  "Özel Kimyasal Çözümler",
];

const SocialIcon = ({ type }: { type: string }) => {
  if (type === "linkedin")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    );
  if (type === "twitter")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  if (type === "instagram")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
};

const socials = [
  { type: "linkedin", href: "#", label: "LinkedIn" },
  { type: "twitter", href: "#", label: "Twitter" },
  { type: "instagram", href: "#", label: "Instagram" },
  { type: "facebook", href: "#", label: "Facebook" },
];

export function Footer() {
  return (
    <footer style={{ background: "#FFFFFF" }}>
      {/* Premium separator wave */}
      <div
        style={{
          height: "6px",
          background: "linear-gradient(90deg, #1A2F8F 0%, #2957D8 50%, #0EA5E9 100%)",
        }}
      />

      {/* Main footer body */}
      <div
        style={{
          background: "#F8FAFC",
          borderTop: "1px solid #E2E8F0",
          paddingTop: "5rem",
          paddingBottom: "2.5rem",
        }}
      >
        <div className="section-container">
          {/* Main grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
              gap: "3.5rem",
            }}
            className="footer-grid"
          >
            {/* Brand */}
            <div>
              <Image
                src="/logo.png"
                alt="CRK Kimya"
                width={160}
                height={54}
                style={{ objectFit: "contain", height: "auto", maxHeight: "48px", marginBottom: "1.25rem" }}
              />
              <p
                style={{
                  color: "#64748B",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  maxWidth: "320px",
                  marginBottom: "1.5rem",
                }}
              >
                CRK Kimya, 20+ yıllık tecrübesiyle kimyasal hammaddeler ve
                endüstriyel çözümler alanında Türkiye&apos;nin güvenilir
                tedarikçilerinden biridir.
              </p>

              {/* ISO badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "8px 14px",
                  background: "rgba(26,47,143,0.05)",
                  border: "1px solid rgba(26,47,143,0.12)",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "28px", height: "28px",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, #1A2F8F, #2957D8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1A2F8F" }}>
                  ISO 9001:2015
                </span>
              </div>

              <div style={{ display: "flex", gap: "0.6rem" }}>
                {socials.map(({ type, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      color: "#64748B",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#1A2F8F";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A2F8F";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 12px rgba(26,47,143,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "#FFFFFF";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E2E8F0";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#64748B";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                  >
                    <SocialIcon type={type} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3
                style={{
                  color: "#0F172A",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "2px solid #1A2F8F",
                  display: "inline-block",
                }}
              >
                Hızlı Bağlantılar
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {navLinks.map((link) => (
                  <li key={link.href} style={{ marginBottom: "0.55rem" }}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#475569",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "color 0.22s ease",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#1A2F8F";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#475569";
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#2957D8",
                          flexShrink: 0,
                        }}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3
                style={{
                  color: "#0F172A",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "2px solid #1A2F8F",
                  display: "inline-block",
                }}
              >
                Ürün Grupları
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {products.map((product) => (
                  <li key={product} style={{ marginBottom: "0.55rem" }}>
                    <Link
                      href="/urun-gruplari"
                      style={{
                        color: "#475569",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "color 0.22s ease",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#1A2F8F";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = "#475569";
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#2957D8",
                          flexShrink: 0,
                        }}
                      />
                      {product}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3
                style={{
                  color: "#0F172A",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "2px solid #1A2F8F",
                  display: "inline-block",
                }}
              >
                İletişim
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: MapPin, text: "Selahattin Eyyubi Mah, 1631. Sk. No:29, 34517 Esenyurt / İstanbul" },
                  { icon: Phone, text: "+90 212 853 81 70" },
                  { icon: Mail, text: "info@crkkimya.com.tr" },
                  { icon: Clock, text: "Pzt – Cum: 08:00 – 18:00" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: "rgba(26,47,143,0.07)",
                        border: "1px solid rgba(26,47,143,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "#1A2F8F",
                        marginTop: "1px",
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <span
                      style={{
                        color: "#475569",
                        fontSize: "0.85rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* WhatsApp */}
              <a
                href="https://wa.me/902128538170"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "1.25rem",
                  padding: "10px 18px",
                  background: "#25D366",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(37,211,102,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(37,211,102,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(37,211,102,0.25)";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                +90 212 853 81 70
              </a>

              {/* Catalog download */}
              <a
                href="/catalog/crk-urun.pdf"
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "1.5rem",
                  padding: "10px 18px",
                  background: "linear-gradient(135deg, #1A2F8F, #2957D8)",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(26,47,143,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(26,47,143,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(26,47,143,0.2)";
                }}
              >
                <Download size={15} />
                Katalog İndir (PDF)
              </a>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              margin: "3.5rem 0 2rem",
              height: "1px",
              background: "#E2E8F0",
            }}
          />

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p style={{ color: "#94A3B8", fontSize: "0.82rem" }}>
              © 2026 CRK Kimya. Tüm Hakları Saklıdır.
            </p>
            <p style={{ color: "#94A3B8", fontSize: "0.82rem", fontStyle: "italic" }}>
              Kimyanın Gücünü Endüstriye Taşıyoruz
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
