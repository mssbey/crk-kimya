"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Wrench, Droplets, User, FlaskConical, ShieldCheck, Zap } from "lucide-react";
import { PremiumCatalog } from "@/components/PremiumCatalog";

const categories = [
  {
    icon: Wrench,
    title: "Teknik Bakım",
    desc: "Endüstriyel ekipmanların bakım ve koruması için pas sökücüler, yağ çözücüler, kontak temizleyiciler ve koruyucu spreyler.",
    items: ["Pas Sökücü", "Yağ Çözücü", "Kontak Temizleyici", "Balata Spreyi"],
    color: "#1A2F8F",
  },
  {
    icon: Droplets,
    title: "Temizlik ve Hijyen",
    desc: "Zemin, banyo, tuvalet ve genel alan temizliği için yüksek performanslı profesyonel çözümler.",
    items: ["Zemin Temizleyici", "Banyo Temizleyici", "WC Jeli", "Yüzey Spreyi"],
    color: "#2957D8",
  },
  {
    icon: User,
    title: "Kişisel Hijyen",
    desc: "El sabunlarından dezenfektanlara, duş jellerinden şampuanlara eksiksiz kişisel bakım ürün serisi.",
    items: ["El Sabunu", "Dezenfektan", "Duş Jeli", "Şampuan"],
    color: "#0F2060",
  },
  {
    icon: FlaskConical,
    title: "Mutfak Hijyeni",
    desc: "Profesyonel mutfaklar için bulaşık makinesi deterjanları, el yıkama ürünleri ve yüzey temizlik çözümleri.",
    items: ["Otomatik Bulaşık", "El Bulaşığı", "Yağ Çözücü", "Yüzey Temizleyici"],
    color: "#1A2F8F",
  },
  {
    icon: ShieldCheck,
    title: "Gıda Hijyeni",
    desc: "HACCP uyumlu klor bazlı, köpüklü ve alkalin ürünlerle gıda tesislerinde tam hijyen güvencesi.",
    items: ["HACCP Uyumlu", "Klor Bazlı", "Köpüklü Sistem", "Alkalin Temizleyici"],
    color: "#2957D8",
  },
  {
    icon: Zap,
    title: "Bakteri ve Koku Gidericiler",
    desc: "Kapalı alanlardaki istenmeyen koku ve bakterileri etkili biçimde nötralize eden özel formüller.",
    items: ["Koku Giderici", "Bakteri Nötralizörü", "Hava Spreyi", "Yüzey Dezenfektanı"],
    color: "#0F2060",
  },
];

export default function UrunGruplariPage() {
  return (
    <div style={{ background: "#FFFFFF", paddingTop: "76px" }}>
      {/* ── Hero ── */}
      <section
        style={{
          padding: "4rem 0 3rem",
          background: "linear-gradient(180deg, #EEF4FF 0%, #FFFFFF 100%)",
          borderBottom: "1px solid #E2E8F0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[400, 650, 900].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%", right: "-5%",
              width: s, height: s,
              borderRadius: "50%",
              border: `1px solid rgba(26,47,143,${0.05 - i * 0.012})`,
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        ))}

        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: 680 }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Image src="/logo.png" alt="CRK Kimya" width={160} height={54} style={{ objectFit: "contain", height: "auto", maxHeight: "48px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span className="tag-chip">6 Ana Kategori</span>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "4px 12px", borderRadius: 100,
                  background: "rgba(26,47,143,0.06)",
                  border: "1px solid rgba(26,47,143,0.12)",
                  fontSize: "0.72rem", fontWeight: 600, color: "#1A2F8F",
                }}
              >
                <BookOpen size={12} />
                Dijital Katalog
              </div>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                color: "#0F172A",
              }}
            >
              <span className="gradient-text">Ürün Gruplarımız</span>
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#475569",
                lineHeight: 1.78,
                marginBottom: "2rem",
                maxWidth: 560,
              }}
            >
              Teknik bakımdan gıda güvenliğine, kişisel hijyenden endüstriyel
              temizliğe kadar 6 ana kategoride 300&apos;den fazla ürünlük kapsamlı
              seri.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href="#katalog">
                <button
                  className="btn-glow"
                  style={{
                    padding: "12px 28px", borderRadius: 10,
                    color: "white", fontWeight: 600, fontSize: "0.9rem",
                    display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                >
                  <BookOpen size={16} /> Dijital Katalog
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Kategori Kartları ── */}
      <section style={{ padding: "clamp(3rem, 6vw, 5rem) 0", background: "#F5F7FA" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
              Tüm Kategoriler
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#0F172A",
              }}
            >
              <span className="gradient-text">Hangi Alanda Hizmet Veriyoruz?</span>
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {categories.map(({ icon: Icon, title, desc, items, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="premium-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "18px",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.05), 0 8px 32px rgba(26,47,143,0.04)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${color}, ${color}66, transparent)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0, right: 0,
                    width: "100px", height: "100px",
                    background: `radial-gradient(circle at top right, ${color}08 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    width: "52px", height: "52px",
                    borderRadius: "14px",
                    background: `${color}0D`,
                    border: `1px solid ${color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    color,
                  }}
                >
                  <Icon size={23} />
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "0.75rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#475569",
                    lineHeight: 1.75,
                    marginBottom: "1.25rem",
                  }}
                >
                  {desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "100px",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        background: `${color}08`,
                        border: `1px solid ${color}1A`,
                        color,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sektörler Bandı ── */}
      <section
        style={{
          padding: "2.5rem 0",
          background: "linear-gradient(135deg, #0F2060 0%, #1A2F8F 50%, #2957D8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
            mixBlendMode: "luminosity",
            pointerEvents: "none",
          }}
        />
        <div className="section-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
            HİZMET VERDİĞİMİZ SEKTÖRLER
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["Oteller", "Hastaneler", "Fabrikalar", "Restoranlar", "Belediyeler", "Okullar", "Spor Tesisleri", "AVM'ler"].map((s) => (
              <span
                key={s}
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PDF Catalog ── */}
      <div id="katalog">
        <PremiumCatalog />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .cat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
