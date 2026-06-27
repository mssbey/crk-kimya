"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/urun-gruplari", label: "Ürün Grupları" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/kalite-politikasi", label: "Kalite Politikası" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          background: scrolled
            ? "rgba(255,255,255,0.94)"
            : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          borderBottom: scrolled
            ? "1px solid rgba(226,232,240,0.9)"
            : "1px solid rgba(226,232,240,0.6)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(15,23,42,0.06), 0 1px 4px rgba(26,47,143,0.04)"
            : "0 1px 8px rgba(15,23,42,0.03)",
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "76px",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Image
                src="/logo.png"
                alt="CRK Kimya"
                width={160}
                height={54}
                style={{ objectFit: "contain", height: "auto", maxHeight: "46px" }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              style={{
                gap: "2rem",
                alignItems: "center",
              }}
              className="nav-desktop"
            >
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      color: active ? "#1A2F8F" : "#475569",
                      fontSize: "0.875rem",
                      fontWeight: active ? 600 : 500,
                      letterSpacing: "0.01em",
                      textDecoration: "none",
                      position: "relative",
                      paddingBottom: "4px",
                      transition: "color 0.22s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLAnchorElement).style.color = "#0F172A";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLAnchorElement).style.color = "#475569";
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position: "absolute",
                          bottom: -2,
                          left: 0, right: 0,
                          height: "2px",
                          background: "linear-gradient(90deg, #1A2F8F, #2957D8)",
                          borderRadius: "1px",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link href="/iletisim" className="nav-cta-desktop">
                <button
                  className="btn-glow"
                  style={{
                    padding: "10px 24px",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span>Teklif Al</span>
                </button>
              </Link>

              <button
                className="nav-mobile-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  background: "rgba(26,47,143,0.06)",
                  border: "1px solid rgba(26,47,143,0.12)",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "#1A2F8F",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid #E2E8F0",
                overflow: "hidden",
              }}
            >
              <div
                className="section-container"
                style={{ paddingTop: "1rem", paddingBottom: "1.5rem" }}
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "13px 0",
                        color: pathname === link.href ? "#1A2F8F" : "#334155",
                        fontSize: "0.95rem",
                        fontWeight: pathname === link.href ? 600 : 500,
                        textDecoration: "none",
                        borderBottom: "1px solid #F1F5F9",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Link href="/iletisim" onClick={() => setMobileOpen(false)}>
                  <button
                    className="btn-glow"
                    style={{
                      width: "100%",
                      marginTop: "1rem",
                      padding: "13px",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                    }}
                  >
                    <span>Teklif Al</span>
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
