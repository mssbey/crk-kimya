"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Heart, CheckCircle2 } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.hakkimizda;

const PILLAR_ICONS = [Target, Eye, Heart];
const PILLAR_COLORS = ["#1A2F8F", "#2957D8", "#0F2060"];

export default function HakkimizdaPage() {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: "76px" }}>
      {/* Hero */}
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "linear-gradient(180deg, #F0F5FF 0%, #FFFFFF 100%)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%", right: "5%",
            transform: "translateY(-50%)",
            width: "350px", height: "350px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 350 350" fill="none">
            <circle cx="175" cy="175" r="160" stroke="rgba(26,47,143,0.08)" strokeWidth="1"/>
            <circle cx="175" cy="175" r="115" stroke="rgba(26,47,143,0.06)" strokeWidth="1" strokeDasharray="4 6"/>
            <circle cx="175" cy="175" r="70" stroke="rgba(26,47,143,0.05)" strokeWidth="1"/>
            <circle cx="175" cy="175" r="8" fill="rgba(26,47,143,0.1)"/>
          </svg>
        </div>
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Image src="/logo.png" alt="CRK Kimya" width={160} height={54} style={{ objectFit: "contain", height: "auto", maxHeight: "48px" }} />
            </div>
            <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
              {c.heroChip}
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
              <span className="gradient-text">{c.heroHeading1}</span>
              <br />
              <span style={{ color: "#0F172A" }}>{c.heroHeading2}</span>
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
              {c.heroSubtext}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "clamp(2.5rem, 5vw, 5rem) 0", background: "#FFFFFF" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
              marginBottom: "5rem",
            }}
            className="about-story-grid"
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.25rem",
                  color: "#0F172A",
                }}
              >
                {c.storyHeading}
              </h2>
              {c.storyParas.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "1rem",
                    color: "#334155",
                    lineHeight: 1.85,
                    marginBottom: i < c.storyParas.length - 1 ? "1rem" : "0",
                  }}
                >
                  {para}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 56px rgba(26,47,143,0.16), 0 4px 16px rgba(0,0,0,0.08)" }}>
                <Image
                  src="/2.png"
                  alt="CRK Kimya Laboratuvar"
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "1.5rem",
                  background: "linear-gradient(0deg, rgba(10,20,60,0.88) 0%, transparent 100%)",
                }}>
                  <p style={{ color: "white", fontSize: "0.82rem", fontWeight: 700, margin: 0 }}>
                    {c.storyCaption}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                {c.storyChips.map(({ value, label }) => (
                  <div key={label} style={{
                    flex: 1,
                    background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px",
                    padding: "0.9rem 0.75rem", textAlign: "center",
                    boxShadow: "0 2px 8px rgba(26,47,143,0.05)",
                  }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 900, background: "linear-gradient(135deg,#1A2F8F,#2957D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{value}</div>
                    <div style={{ fontSize: "0.68rem", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* MVV */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginBottom: "5rem",
            }}
            className="mvv-grid"
          >
            {c.pillars.map(({ title, text }, i) => {
              const Icon = PILLAR_ICONS[i] ?? Target;
              const color = PILLAR_COLORS[i] ?? "#1A2F8F";
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "2rem",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: "3px",
                      background: `linear-gradient(90deg, ${color}, ${color}66)`,
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
                      marginBottom: "1.25rem",
                      color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.75rem" }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.78 }}>
                    {text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "linear-gradient(135deg, #EEF4FF 0%, #F5F7FA 100%)",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <CheckCircle2 size={36} color="#1A2F8F" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0F172A", marginBottom: "1rem" }}>
              {c.certsHeading}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "1.25rem" }}>
              {c.certs.map((cert) => (
                <span key={cert} style={{ padding: "6px 14px", borderRadius: "100px", background: "rgba(26,47,143,0.08)", border: "1px solid rgba(26,47,143,0.15)", fontSize: "0.82rem", fontWeight: 600, color: "#1A2F8F" }}>
                  {cert}
                </span>
              ))}
            </div>
            <p style={{ fontSize: "0.95rem", color: "#475569", maxWidth: "560px", margin: "0 auto", lineHeight: 1.78 }}>
              {c.certsBody}
            </p>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-story-grid { grid-template-columns: 1fr !important; }
          .mvv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
