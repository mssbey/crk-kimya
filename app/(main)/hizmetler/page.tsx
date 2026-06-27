"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeadphonesIcon, BarChart3, FlaskConical, Wrench, CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Tedarik Yönetimi",
    subtitle: "Ürünlerimizi müşterilere sorunsuz ulaştırma",
    desc: "Ürettiğimiz kimyasal ürünleri doğru zamanda, doğru koşullarda müşterilerimize ulaştırıyoruz. Siparişten teslimata her adımı titizlikle takip ediyor, müşteri memnuniyetini ön planda tutuyoruz.",
    features: [
      "Sipariş takip ve koordinasyonu",
      "Zamanında teslimat garantisi",
      "Müşteri bilgilendirme ve iletişim",
      "Ürün ambalajlama ve hazırlık",
      "Teslimat sonrası destek",
      "Özel teslimat koşulları yönetimi",
    ],
    color: "#1A2F8F",
  },
  {
    icon: HeadphonesIcon,
    title: "Teknik Danışmanlık",
    subtitle: "Uzman mühendis kadrosuyla çözümler",
    desc: "Kimya mühendislerinden oluşan uzman ekibimiz, ihtiyacınıza en uygun ürünleri belirlemek, uygulama süreçlerini optimize etmek ve hijyen kalitesini artırmak için sahada ve uzaktan destek sunmaktadır.",
    features: [
      "Ürün seçim ve uygulama danışmanlığı",
      "Hijyen protokolü oluşturma",
      "Proses optimizasyonu analizi",
      "Numune testi ve değerlendirme",
      "Sahada ve uzaktan destek",
      "Eğitim ve teknik doküman hazırlama",
    ],
    color: "#0F2060",
  },
  {
    icon: FlaskConical,
    title: "AR-GE ve Formülasyon",
    subtitle: "Müşteriye özel ürün geliştirme",
    desc: "Laboratuvar altyapımızla müşteri ihtiyaçlarına özel formülasyon çalışmaları gerçekleştiriyor, pilot üretim yapıyor ve sektörünüze özgü kimyasal çözümler geliştiriyoruz. Yenilikçi formüllerimiz performanstan ödün vermez.",
    features: [
      "Özel formülasyon geliştirme",
      "Pilot üretim ve test",
      "Laboratuvar analiz hizmetleri",
      "Mevcut formül iyileştirme",
      "Sertifikasyon desteği",
      "Ürün güvenlik bilgi formu (SDS)",
    ],
    color: "#1A2F8F",
  },
  {
    icon: Wrench,
    title: "Saha Uygulama Desteği",
    subtitle: "Yerinde teknik eğitim ve denetim",
    desc: "Ürünlerin doğru, güvenli ve etkili kullanımı için işletmenizde yerinde teknik eğitim ve uygulama desteği sağlıyoruz. Periyodik denetimlerle hijyen kalitesini sürekli yüksek tutmanıza yardımcı oluyoruz.",
    features: [
      "Personel teknik eğitimi",
      "Uygulama protokolü oluşturma",
      "Dozaj ve konsantrasyon yönetimi",
      "Periyodik saha denetimi",
      "Hijyen risk analizi",
      "Raporlama ve öneri sunumu",
    ],
    color: "#0F2060",
  },
];

export default function HizmetlerPage() {
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
        <div
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px", height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(26,47,143,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
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
              Hizmetlerimiz
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
              <span className="gradient-text">Kapsamlı Destek,</span>
              <br />
              <span style={{ color: "#0F172A" }}>Uçtan Uca Hizmet</span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#475569",
                maxWidth: "620px",
                margin: "0 auto",
                lineHeight: 1.78,
              }}
            >
              Tedarik yönetiminden AR-GE'ye, teknik danışmanlıktan saha
              uygulama desteğine kadar 4 temel hizmet alanında yanınızdayız.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services detail */}
      <section style={{ padding: "clamp(2.5rem, 5vw, 5rem) 0", background: "#FFFFFF" }}>
        <div className="section-container">
          {services.map(({ icon: Icon, title, subtitle, desc, features, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "20px",
                padding: "2.5rem",
                marginBottom: "1.5rem",
                position: "relative",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "2rem",
                alignItems: "start",
                boxShadow: "0 2px 12px rgba(15,23,42,0.05), 0 8px 32px rgba(26,47,143,0.04)",
              }}
              className="services-card"
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0, top: 0, bottom: 0,
                  width: "4px",
                  background: `linear-gradient(180deg, ${color}, ${color}66)`,
                  borderRadius: "4px 0 0 4px",
                }}
              />

              {/* Number + Icon */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", paddingLeft: "0.5rem" }}>
                <div
                  style={{
                    width: "60px", height: "60px",
                    borderRadius: "16px",
                    background: `${color}0D`,
                    border: `1px solid ${color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={26} />
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: `${color}88`,
                    letterSpacing: "0.05em",
                  }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Content */}
              <div>
                <div style={{ marginBottom: "0.3rem" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: color,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {subtitle}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#0F172A",
                    marginBottom: "0.875rem",
                  }}
                >
                  {title}
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#334155",
                    lineHeight: 1.82,
                    marginBottom: "1.5rem",
                    maxWidth: "700px",
                  }}
                >
                  {desc}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem",
                  }}
                  className="features-grid"
                >
                  {features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontSize: "0.875rem",
                        color: "#334155",
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle2 size={15} color={color} style={{ flexShrink: 0 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual banner */}
      <section style={{ padding: "0 0 clamp(2rem, 4vw, 3rem) 0", background: "#FFFFFF" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 64px rgba(26,47,143,0.16)" }}
          >
            <Image src="/1.png" alt="CRK Kimya Üretim" width={1200} height={480} style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, rgba(10,20,60,0.80) 0%, rgba(10,20,60,0.35) 55%, transparent 100%)",
              display: "flex", alignItems: "center", padding: "3rem 4rem",
            }}>
              <div style={{ maxWidth: "440px" }}>
                <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "white", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  Global Innovation Center
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  Modern üretim tesisimiz ve AR-GE merkezimizde geliştirdiğimiz formülasyonlar, sektörün en zorlu ihtiyaçlarını karşılıyor.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(2.5rem, 5vw, 5rem) 0",
          background: "linear-gradient(135deg, #0F2060 0%, #1A2F8F 50%, #2957D8 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.13,
            pointerEvents: "none",
            mixBlendMode: "luminosity",
          }}
        />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                color: "#FFFFFF",
              }}
            >
              Hizmetlerimiz Hakkında
              <br />
              <span style={{ color: "rgba(255,255,255,0.8)" }}>Daha Fazla Bilgi Alın</span>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(255,255,255,0.65)",
                maxWidth: "500px",
                margin: "0 auto 2rem",
                lineHeight: 1.78,
              }}
            >
              İhtiyacınıza özel çözüm paketleri için uzman ekibimizle
              iletişime geçin.
            </p>
            <Link href="/iletisim">
              <button
                style={{
                  padding: "14px 36px",
                  borderRadius: "10px",
                  color: "#1A2F8F",
                  background: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                }}
              >
                Teklif İste <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
