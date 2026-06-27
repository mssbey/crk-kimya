"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Users2, FlaskConical, TrendingDown } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.whyCRK;

const ICONS = [Leaf, Users2, FlaskConical, TrendingDown];
const COLORS = ["#1A2F8F", "#2957D8", "#1A2F8F", "#2957D8"];

export function WhyCRKSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(3.5rem, 7vw, 7rem) 0",
        background: "#EEF4FF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "300px", height: "300px",
          background: "radial-gradient(circle at 0% 0%, rgba(26,47,143,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0, right: 0,
          width: "300px", height: "300px",
          background: "radial-gradient(circle at 100% 100%, rgba(26,47,143,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
            {c.chip}
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
            <span className="gradient-text">{c.heading1}</span>
            <br />
            <span style={{ color: "#0F172A" }}>{c.heading2}</span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#475569",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.78,
            }}
          >
            {c.subtext}
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
          className="why-grid"
        >
          {c.items.map(({ title, desc }, i) => {
            const Icon = ICONS[i] ?? Leaf;
            const color = COLORS[i] ?? "#1A2F8F";
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="premium-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "2rem",
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
                    background: `linear-gradient(90deg, ${color}, ${color}55, transparent)`,
                  }}
                />

                <div
                  style={{
                    width: "52px", height: "52px",
                    borderRadius: "14px",
                    background: `${color}0D`,
                    border: `1px solid ${color}1F`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    color,
                  }}
                >
                  <Icon size={24} />
                </div>

                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "0.6rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.86rem",
                    color: "#475569",
                    lineHeight: 1.78,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
