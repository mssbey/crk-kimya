"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, ShieldCheck, RefreshCw, Leaf, CheckCircle2, FileText, Search, Settings, TrendingUp, Download } from "lucide-react";

const commitments = [
  "Her ürünü uluslararası kalite standartlarına göre temin etmek",
  "Tedarikçi kalifikasyon süreçlerini titizlikle uygulamak",
  "Müşteri şikayetlerini 24 saat içinde yanıtlamak ve çözüme kavuşturmak",
  "Çalışanların kalite bilincini ve mesleki yetkinliklerini geliştirmek",
  "Çevre ve insan sağlığına duyarlı ürün ve proses seçimi yapmak",
  "Tedarik zincirinde şeffaflık ve izlenebilirlik sağlamak",
  "Sürekli iyileştirme kültürünü tüm organizasyonda yaymak",
  "Yasal ve düzenleyici gerekliliklere tam uyum sağlamak",
];

const processes = [
  {
    icon: Search,
    title: "Tedarikçi Değerlendirme",
    desc: "Her tedarikçi, kalite sistemleri, finansal istikrar ve teknik yetkinlik açısından kapsamlı bir ön değerlendirmeden geçirilir.",
    color: "#1A2F8F",
  },
  {
    icon: FileText,
    title: "Belge Doğrulama",
    desc: "Analiz sertifikaları (CoA), güvenlik bilgi formları (SDS) ve uygunluk belgeleri her parti için doğrulanır.",
    color: "#2957D8",
  },
  {
    icon: Settings,
    title: "Kalite Kontrol",
    desc: "Kritik ürünlerde bağımsız laboratuvar analizleri yapılır. Numune arşivleme sistemiyle geri izlenebilirlik sağlanır.",
    color: "#0F2060",
  },
  {
    icon: TrendingUp,
    title: "Sürekli İyileştirme",
    desc: "CAPA (Düzeltici ve Önleyici Faaliyet) sistemi ile her sapma analiz edilir, kök neden giderilir.",
    color: "#1A2F8F",
  },
];

export default function KalitePolitikasiPage() {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: "76px" }}>
      {/* Hero */}
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "linear-gradient(180deg, #EEF4FF 0%, #FFFFFF 100%)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div className="section-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Image src="/logo.png" alt="CRK Kimya" width={160} height={54} style={{ objectFit: "contain", height: "auto", maxHeight: "48px" }} />
            </div>
            <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
              Kalite Politikamız
            </span>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                color: "#0F172A",
              }}
            >
              <span className="gradient-text">Kalite Bizim</span>
              <br />
              <span style={{ color: "#0F172A" }}>DNA&apos;mızdır</span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#475569",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.78,
              }}
            >
              CRK Kimya olarak kalite; yalnızca bir belge değil, günlük
              operasyonlarımızın her adımında yaşattığımız bir kültürdür.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Central panel */}
      <section style={{ padding: "clamp(2.5rem, 5vw, 5rem) 0", background: "#FFFFFF" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: "860px", margin: "0 auto", marginBottom: "4rem" }}
          >
            {/* Main light panel */}
            <div
              style={{
                background: "linear-gradient(145deg, #EEF4FF 0%, #F0F5FF 100%)",
                border: "1px solid rgba(26,47,143,0.12)",
                borderRadius: "24px",
                padding: "3rem",
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                boxShadow: "0 8px 40px rgba(26,47,143,0.08)",
              }}
            >
              {/* Top gradient */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #1A2F8F, #2957D8, #0EA5E9)",
                }}
              />

              {/* Award icon */}
              <div
                style={{
                  width: "72px", height: "72px",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #1A2F8F, #2957D8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(26,47,143,0.3)",
                }}
              >
                <Award size={34} />
              </div>

              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  marginBottom: "1.25rem",
                }}
              >
                Sertifika ve Kalite Belgelerimiz
              </h2>

              <p
                style={{
                  fontSize: "1rem",
                  color: "#334155",
                  lineHeight: 1.85,
                  marginBottom: "1.5rem",
                  maxWidth: "640px",
                  margin: "0 auto 1.5rem",
                }}
              >
                CRK Kimya, uluslararası standartlara uygun sertifikalı kalite
                yönetim sistemiyle tüm operasyonlarını yürütmektedir.
                Tedarikçi seçiminden müşteri teslimatına, depolamadan
                belgelendirmeye kadar her süreç belgelidir.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", justifyContent: "center", marginBottom: "2rem" }}>
                {[
                  "ISO 9001:2015",
                  "ISO 10002:2018",
                  "ISO 45001:2018",
                  "Helal Kişisel Temizlik",
                  "Helal Yüzey Temizlik",
                  "GMP Uyumlu",
                  "TSE Onaylı",
                  "Marka Tescil",
                ].map((cert) => (
                  <span key={cert} style={{ padding: "6px 14px", borderRadius: "100px", background: "rgba(26,47,143,0.08)", border: "1px solid rgba(26,47,143,0.15)", fontSize: "0.82rem", fontWeight: 600, color: "#1A2F8F" }}>
                    {cert}
                  </span>
                ))}
              </div>

              {/* 4 pillars */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
                className="pillars-sm-grid"
              >
                {[
                  { icon: Award, label: "Kalite", color: "#1A2F8F" },
                  { icon: ShieldCheck, label: "Güven", color: "#2957D8" },
                  { icon: RefreshCw, label: "Süreklilik", color: "#0F2060" },
                  { icon: Leaf, label: "Sürdürülebilirlik", color: "#1A2F8F" },
                ].map(({ icon: Icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      padding: "1.25rem 0.75rem",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      textAlign: "center",
                      boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${color}33`;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 20px ${color}14`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(15,23,42,0.04)";
                    }}
                  >
                    <div
                      style={{
                        width: "42px", height: "42px",
                        borderRadius: "10px",
                        background: `${color}0D`,
                        border: `1px solid ${color}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 0.6rem",
                        color,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Commitments */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              marginBottom: "4rem",
            }}
            className="quality-bottom"
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  marginBottom: "1.5rem",
                }}
              >
                Kalite Taahhütlerimiz
              </h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {commitments.map((c) => (
                  <li
                    key={c}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      fontSize: "0.9rem",
                      color: "#334155",
                      lineHeight: 1.65,
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={16} color="#2957D8" style={{ flexShrink: 0, marginTop: "2px" }} />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  marginBottom: "1.5rem",
                }}
              >
                Kalite Süreçlerimiz
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {processes.map(({ icon: Icon, title, desc, color }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = `${color}22`;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 16px ${color}10`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(15,23,42,0.04)";
                    }}
                  >
                    <div
                      style={{
                        width: "42px", height: "42px",
                        borderRadius: "10px",
                        background: `${color}0D`,
                        border: `1px solid ${color}1F`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.3rem" }}>
                        {title}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.65 }}>
                        {desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ISO Belgelerimiz */}
      <section style={{ padding: "clamp(2.5rem, 5vw, 5rem) 0", background: "#F5F7FA" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
              Resmi Belgeler
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#0F172A",
              }}
            >
              <span className="gradient-text">ISO Sertifikalarımız</span>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#475569", marginTop: "0.75rem", maxWidth: "500px", margin: "0.75rem auto 0", lineHeight: 1.75 }}>
              Tüm belgelerimizi indirebilir, kalite standartlarımızı doğrulayabilirsiniz.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
            }}
            className="iso-grid"
          >
            {[
              {
                title: "ISO 9001:2015",
                sub: "Kalite Yönetim Sistemi",
                file: "/iso/Crk Ts En Iso 9001_2015 102026234 Draft.pdf",
                color: "#1A2F8F",
              },
              {
                title: "ISO 10002:2018",
                sub: "Müşteri Memnuniyeti Yönetimi",
                file: "/iso/Crk Ts Iso 10002_2018 102026233 Draft.pdf",
                color: "#2957D8",
              },
              {
                title: "ISO 45001:2018",
                sub: "İş Sağlığı ve Güvenliği",
                file: "/iso/Crk Iso 45001_2018 102026235 Draft.pdf",
                color: "#0F2060",
              },
              {
                title: "ISO 14001:2015",
                sub: "Çevre Yönetim Sistemi",
                file: "/iso/Crk Iso 14001_2015 102026237 Draft.pdf",
                color: "#1A2F8F",
              },
              {
                title: "ISO 31000",
                sub: "Risk Yönetim Sistemi",
                file: "/iso/Crk Iso 31000 102026236 Draft.pdf",
                color: "#2957D8",
              },
              {
                title: "CE Belgesi",
                sub: "Ürün Uygunluk Sertifikası",
                file: "/iso/Crk Ce 102026232 Draft.pdf",
                color: "#0F2060",
              },
            ].map(({ title, sub, file, color }, i) => (
              <motion.a
                key={title}
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "14px",
                  padding: "1.5rem",
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}44`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 24px ${color}14`;
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E2E8F0";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(15,23,42,0.04)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
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
                    width: "48px", height: "48px",
                    borderRadius: "12px",
                    background: `${color}0D`,
                    border: `1px solid ${color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    flexShrink: 0,
                  }}
                >
                  <Award size={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0F172A", marginBottom: "2px" }}>
                    {title}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B" }}>{sub}</div>
                </div>
                <div style={{ color: "#94A3B8", flexShrink: 0 }}>
                  <Download size={17} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .pillars-sm-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .quality-bottom { grid-template-columns: 1fr !important; }
          .iso-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) {
          .iso-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
