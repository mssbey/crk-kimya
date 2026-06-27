"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Target, Eye, Heart, ArrowRight, CheckCircle2 } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.about;

const PILLAR_ICONS = [Target, Eye, Heart];
const PILLAR_COLORS = ["#1A2F8F", "#2957D8", "#0EA5E9"];

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          top: "5%", right: "-5%",
          width: "500px", height: "500px",
          backgroundImage: "radial-gradient(circle, rgba(26,47,143,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "4rem" }}
        >
          <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
            {c.chip}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              <span style={{ color: "#0F172A" }}>{c.heading1}</span>
              <br />
              <span className="gradient-text">{c.heading2}</span>
            </h2>
            <Link href="/hakkimizda">
              <button
                className="btn-outline"
                style={{
                  padding: "10px 22px",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                Daha Fazlası <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            marginBottom: "5rem",
          }}
          className="about-cols"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              style={{
                fontSize: "1.05rem",
                color: "#334155",
                lineHeight: 1.85,
                marginBottom: "1.5rem",
              }}
            >
              {c.body1}
            </p>
            <p
              style={{
                fontSize: "1.05rem",
                color: "#334155",
                lineHeight: 1.85,
                marginBottom: "2rem",
              }}
            >
              {c.body2}
            </p>

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {c.highlights.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "#334155",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle2 size={16} color="#2957D8" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 64px rgba(26,47,143,0.16), 0 4px 16px rgba(0,0,0,0.08)" }}>
              <Image
                src="/1.png"
                alt="CRK Kimya Üretim Tesisi"
                width={600}
                height={400}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "1.5rem",
                background: "linear-gradient(0deg, rgba(10,20,60,0.85) 0%, transparent 100%)",
              }}>
                <p style={{ color: "white", fontSize: "0.82rem", fontWeight: 700, margin: 0, letterSpacing: "0.04em" }}>
                  {c.imageCaption1}
                </p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem", margin: "2px 0 0" }}>
                  {c.imageCaption2}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
              {c.statChips.map(({ val, lbl }) => (
                <div key={lbl} style={{
                  flex: 1, minWidth: "90px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  padding: "0.9rem 1rem",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(26,47,143,0.05)",
                }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, background: "linear-gradient(135deg,#1A2F8F,#2957D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
                  <div style={{ fontSize: "0.7rem", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="pillars-grid"
        >
          {c.pillars.map(({ title, text }, i) => {
            const Icon = PILLAR_ICONS[i] ?? Target;
            const color = PILLAR_COLORS[i] ?? "#1A2F8F";
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
                className="premium-card"
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
                    background: `linear-gradient(90deg, ${color}, ${color}99)`,
                  }}
                />
                <div
                  style={{
                    width: "48px", height: "48px",
                    borderRadius: "12px",
                    background: `${color}0F`,
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
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    color: "#0F172A",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#475569",
                    lineHeight: 1.78,
                  }}
                >
                  {text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-cols { grid-template-columns: 1fr !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
