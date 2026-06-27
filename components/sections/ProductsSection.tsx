"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Wrench, Droplets, User, FlaskConical, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const products = [
  {
    icon: Wrench,
    title: "Teknik Bakım",
    desc: "Endüstriyel ekipmanların bakım ve koruması için pas sökücüler, yağ çözücüler, kontak temizleyiciler ve koruyucu spreyler.",
    items: ["Pas Sökücü", "Yağ Çözücü", "Kontak Temizleyici", "Balata Spreyi"],
    accent: "#1A2F8F",
  },
  {
    icon: Droplets,
    title: "Temizlik ve Hijyen",
    desc: "Zemin, banyo, tuvalet ve genel alan temizliği için yüksek performanslı profesyonel çözümler.",
    items: ["Zemin Temizleyici", "Banyo Temizleyici", "WC Jeli", "Yüzey Spreyi"],
    accent: "#2957D8",
  },
  {
    icon: User,
    title: "Kişisel Hijyen",
    desc: "El sabunlarından dezenfektanlara, duş jellerinden şampuanlara eksiksiz kişisel bakım ürün serisi.",
    items: ["El Sabunu", "Dezenfektan", "Duş Jeli", "Şampuan"],
    accent: "#0F2060",
  },
  {
    icon: FlaskConical,
    title: "Mutfak Hijyeni",
    desc: "Profesyonel mutfaklar için bulaşık makinesi deterjanları, el yıkama ürünleri ve yüzey temizlik çözümleri.",
    items: ["Otomatik Bulaşık", "El Bulaşığı", "Yağ Çözücü", "Yüzey Temizleyici"],
    accent: "#1A2F8F",
  },
  {
    icon: ShieldCheck,
    title: "Gıda Hijyeni",
    desc: "HACCP uyumlu klor bazlı, köpüklü ve alkalin ürünlerle gıda tesislerinde tam hijyen güvencesi.",
    items: ["HACCP Uyumlu", "Klor Bazlı", "Köpüklü Sistem", "Alkalin Temizleyici"],
    accent: "#2957D8",
  },
  {
    icon: Zap,
    title: "Bakteri ve Koku Gidericiler",
    desc: "Kapalı alanlardaki istenmeyen koku ve bakterileri etkili biçimde nötralize eden özel formüller.",
    items: ["Koku Giderici", "Bakteri Nötralizörü", "Hava Spreyi", "Yüzey Dezenfektanı"],
    accent: "#0F2060",
  },
];

export function ProductsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(3.5rem, 7vw, 7rem) 0",
        background: "#F5F7FA",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
            6 Ana Ürün Kategorisi
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              color: "#0F172A",
            }}
          >
            <span className="gradient-text">Kapsamlı Ürün Portföyümüz</span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#475569",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.78,
            }}
          >
            Teknik bakımdan gıda güvenliğine, kişisel hijyenden
            endüstriyel temizliğe uzanan 300'den fazla ürünlük kapsamlı seri.
          </p>
        </motion.div>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="products-grid"
        >
          {products.map(({ icon: Icon, title, desc, items, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="premium-card"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "18px",
                padding: "2rem",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                minHeight: "280px",
                boxShadow: "0 2px 8px rgba(15,23,42,0.05), 0 8px 32px rgba(26,47,143,0.04)",
              }}
            >
              {/* Corner accent gradient */}
              <div
                style={{
                  position: "absolute",
                  top: 0, right: 0,
                  width: "100px", height: "100px",
                  background: `radial-gradient(circle at top right, ${accent}0A 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${accent}, ${accent}66, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: "52px", height: "52px",
                  borderRadius: "14px",
                  background: `${accent}0D`,
                  border: `1px solid ${accent}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: accent,
                }}
              >
                <Icon size={23} />
              </div>

              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#0F172A",
                  marginBottom: "0.75rem",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#475569",
                  lineHeight: 1.72,
                  marginBottom: "1.25rem",
                }}
              >
                {desc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: "3px 10px",
                      borderRadius: "100px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      background: `${accent}08`,
                      border: `1px solid ${accent}1A`,
                      color: accent,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Hover arrow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem", right: "1.5rem",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  color: accent,
                }}
                className="card-arrow"
              >
                <ArrowRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <Link href="/urun-gruplari">
            <button
              className="btn-glow"
              style={{
                padding: "14px 36px",
                borderRadius: "10px",
                color: "white",
                fontWeight: 600,
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Tüm Ürün Gruplarını Gör
                <ArrowRight size={18} />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>

      <style>{`
        .card-arrow { opacity: 0; }
        .premium-card:hover .card-arrow { opacity: 1 !important; }
        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
