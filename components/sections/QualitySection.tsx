"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, RefreshCw, Leaf, ArrowRight } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.quality;

const PILLAR_ICONS = [Award, ShieldCheck, RefreshCw, Leaf];
const PILLAR_COLORS = ["#1A2F8F", "#2957D8", "#0F2060", "#1A2F8F"];

export function QualitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(3.5rem, 7vw, 7rem) 0",
        background: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0%", right: "-5%",
          width: "450px", height: "450px",
          backgroundImage: "radial-gradient(circle, rgba(26,47,143,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="quality-cols"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="tag-chip" style={{ marginBottom: "1.25rem", display: "inline-block" }}>
              {c.chip}
            </span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                color: "#0F172A",
              }}
            >
              <span className="gradient-text">{c.heading1}</span>
              <br />
              <span style={{ color: "#0F172A" }}>{c.heading2}</span>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#334155",
                lineHeight: 1.85,
                marginBottom: "1.25rem",
              }}
            >
              {c.body1}
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "#334155",
                lineHeight: 1.85,
                marginBottom: "2rem",
              }}
            >
              {c.body2}
            </p>
            <Link href="/kalite-politikasi">
              <button
                className="btn-glow"
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  Kalite Politikamız
                  <ArrowRight size={16} />
                </span>
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, #F0F5FF 0%, #EEF4FF 100%)",
                border: "1px solid rgba(26,47,143,0.12)",
                borderRadius: "20px",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(26,47,143,0.08), 0 2px 8px rgba(26,47,143,0.05)",
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

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                {c.certs.map(({ label, sub }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.75rem 1rem",
                      background: "#FFFFFF",
                      border: "1px solid rgba(26,47,143,0.12)",
                      borderRadius: "10px",
                      boxShadow: "0 1px 4px rgba(26,47,143,0.05)",
                    }}
                  >
                    <div
                      style={{
                        width: "36px", height: "36px",
                        borderRadius: "9px",
                        background: "linear-gradient(135deg, #1A2F8F, #2957D8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0,
                      }}
                    >
                      <Award size={17} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A" }}>{label}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                {c.pillars.map(({ label, desc }, i) => {
                  const Icon = PILLAR_ICONS[i] ?? Award;
                  const color = PILLAR_COLORS[i] ?? "#1A2F8F";
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      style={{
                        padding: "1.25rem",
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "12px",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        boxShadow: "0 1px 4px rgba(15,23,42,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}33`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 16px ${color}14`;
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(15,23,42,0.04)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      <div
                        style={{
                          width: "40px", height: "40px",
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
                      <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A", marginBottom: "2px" }}>
                        {label}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#64748B" }}>
                        {desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          position: "relative",
          marginTop: "5rem",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(26,47,143,0.18)",
          maxWidth: "1200px",
          margin: "5rem auto 0",
        }}
        className="quality-banner"
      >
        <Image
          src="/3.png"
          alt="CRK Kimya Laboratuvar ve Araştırma"
          width={1200}
          height={480}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(10,20,60,0.82) 0%, rgba(10,20,60,0.4) 60%, transparent 100%)",
            display: "flex",
            alignItems: "center",
            padding: "3rem 4rem",
          }}
        >
          <div style={{ maxWidth: "480px" }}>
            <span style={{
              display: "inline-block", marginBottom: "1rem",
              padding: "5px 14px", borderRadius: "100px",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)",
              fontSize: "0.72rem", fontWeight: 700, color: "white", letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              {c.bannerChip}
            </span>
            <h3 style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}>
              {c.bannerHeading1}<br />{c.bannerHeading2}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              {c.bannerBody}
            </p>
            <Link href="/hakkimizda" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "11px 24px", borderRadius: "9px",
                background: "white", color: "#1A2F8F",
                fontWeight: 700, fontSize: "0.875rem",
                border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}>
                {c.bannerBtn}
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .quality-cols { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .quality-banner { border-radius: 16px !important; }
          .quality-banner > div:last-child { padding: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
