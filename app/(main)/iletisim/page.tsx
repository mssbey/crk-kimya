"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function IletisimPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    background: "#FFFFFF",
    border: "1.5px solid #E2E8F0",
    borderRadius: "10px",
    color: "#0F172A",
    fontSize: "0.9rem",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "#64748B",
    marginBottom: "0.45rem",
    display: "block",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  };

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
            background: "radial-gradient(ellipse, rgba(26,47,143,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="section-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Image src="/logo.png" alt="CRK Kimya" width={160} height={54} style={{ objectFit: "contain", height: "auto", maxHeight: "48px" }} />
            </div>
            <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
              İletişim
            </span>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                color: "#0F172A",
              }}
            >
              <span className="gradient-text">Bizimle</span>
              <br />
              <span style={{ color: "#0F172A" }}>İletişime Geçin</span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#475569",
                maxWidth: "560px",
                margin: "0 auto",
                lineHeight: 1.75,
              }}
            >
              Teklif almak, ürün bilgisi edinmek veya iş birliği için
              formumuzu doldurun ya da doğrudan ulaşın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section style={{ padding: "clamp(2.5rem, 5vw, 5rem) 0", background: "#FFFFFF" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.35fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "2.5rem",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(15,23,42,0.06), 0 2px 8px rgba(26,47,143,0.05)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #1A2F8F, #2957D8, #0EA5E9)",
                  }}
                />

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "3rem 1rem" }}
                  >
                    <div
                      style={{
                        width: "64px", height: "64px",
                        borderRadius: "50%",
                        background: "rgba(26,47,143,0.08)",
                        border: "1px solid rgba(26,47,143,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.5rem",
                        color: "#2957D8",
                      }}
                    >
                      <CheckCircle2 size={30} />
                    </div>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.75rem" }}>
                      Mesajınız İletildi!
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.75 }}>
                      En kısa sürede size dönüş yapacağız.
                      Acil durumlarda telefon ile ulaşabilirsiniz.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0F172A", marginBottom: "2rem" }}>
                      Teklif / Bilgi Formu
                    </h2>

                    <div
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}
                      className="form-2col"
                    >
                      <div>
                        <label style={labelStyle}>Ad Soyad *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Adınız Soyadınız"
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#2957D8";
                            (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(41,87,216,0.08)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#E2E8F0";
                            (e.target as HTMLInputElement).style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Şirket</label>
                        <input
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Şirket Adı"
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#2957D8";
                            (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(41,87,216,0.08)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#E2E8F0";
                            (e.target as HTMLInputElement).style.boxShadow = "none";
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}
                      className="form-2col"
                    >
                      <div>
                        <label style={labelStyle}>Telefon *</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+90 (5XX) XXX XX XX"
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#2957D8";
                            (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(41,87,216,0.08)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#E2E8F0";
                            (e.target as HTMLInputElement).style.boxShadow = "none";
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>E-Posta *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="ornek@sirket.com"
                          style={inputStyle}
                          onFocus={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#2957D8";
                            (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(41,87,216,0.08)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "#E2E8F0";
                            (e.target as HTMLInputElement).style.boxShadow = "none";
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={labelStyle}>Konu</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={(e) => {
                          (e.target as HTMLSelectElement).style.borderColor = "#2957D8";
                          (e.target as HTMLSelectElement).style.boxShadow = "0 0 0 3px rgba(41,87,216,0.08)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLSelectElement).style.borderColor = "#E2E8F0";
                          (e.target as HTMLSelectElement).style.boxShadow = "none";
                        }}
                      >
                        <option value="">Konu Seçiniz</option>
                        <option value="teklif">Fiyat Teklifi</option>
                        <option value="urun">Ürün Bilgisi</option>
                        <option value="teknik">Teknik Danışmanlık</option>
                        <option value="sikayet">Şikayet / Öneri</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Mesajınız *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Talep ettiğiniz ürün, miktar ve diğer detayları yazınız..."
                        style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                        onFocus={(e) => {
                          (e.target as HTMLTextAreaElement).style.borderColor = "#2957D8";
                          (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(41,87,216,0.08)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLTextAreaElement).style.borderColor = "#E2E8F0";
                          (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-glow"
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        opacity: sending ? 0.8 : 1,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {sending ? "Gönderiliyor..." : (
                          <>
                            <Send size={18} />
                            Mesaj Gönder
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {/* Contact cards */}
              {[
                {
                  icon: MapPin,
                  title: "Adres",
                  content: "Selahattin Eyyubi Mah, 1631. Sk. No:29,\n34517 Esenyurt / İstanbul, Türkiye",
                  color: "#1A2F8F",
                },
                {
                  icon: Phone,
                  title: "Telefon",
                  content: "+90 212 853 81 70",
                  color: "#2957D8",
                },
                {
                  icon: Mail,
                  title: "E-Posta",
                  content: "info@crkkimya.com.tr\nsatis@crkkimya.com.tr",
                  color: "#0F2060",
                },
                {
                  icon: Clock,
                  title: "Çalışma Saatleri",
                  content: "Pazartesi – Cuma: 08:00 – 18:00\nCumartesi: 09:00 – 14:00",
                  color: "#1A2F8F",
                },
              ].map(({ icon: Icon, title, content, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "14px",
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color}22`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 16px ${color}0F`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(15,23,42,0.04)";
                  }}
                >
                  <div
                    style={{
                      width: "44px", height: "44px",
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
                    <Icon size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "4px",
                      }}
                    >
                      {title}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                      {content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Google Maps embed */}
              <div
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  height: "220px",
                  border: "1px solid rgba(26,47,143,0.12)",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
                  position: "relative",
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=41.0334,28.6685&t=m&z=15&output=embed&iwloc=near"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CRK Kimya Konum"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .form-2col { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: #94A3B8; }
      `}</style>
    </div>
  );
}
