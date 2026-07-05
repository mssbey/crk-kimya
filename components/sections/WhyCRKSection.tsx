"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Users2, FlaskConical, TrendingDown } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.whyCRK;

const ICONS = [Leaf, Users2, FlaskConical, TrendingDown];
const COLORS = ["#5EEAD4", "#60A5FA", "#A78BFA", "#38BDF8"];

export function WhyCRKSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(3.5rem, 7vw, 7rem) 0",
        backgroundImage: "url('/Fark Yaratan.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(4,9,28,0.92) 0%, rgba(7,15,40,0.68) 38%, rgba(7,15,40,0.68) 62%, rgba(4,9,28,0.92) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 45% at 50% 32%, rgba(41,87,216,0.28) 0%, transparent 70%)",
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
          <span
            style={{
              display: "inline-block",
              marginBottom: "1.1rem",
              padding: "6px 16px",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "#93C5FD",
              background: "rgba(96,165,250,0.10)",
              border: "1px solid rgba(96,165,250,0.30)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {c.chip}
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              color: "#FFFFFF",
              textShadow: "0 4px 32px rgba(0,0,0,0.45)",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #93C5FD 0%, #60A5FA 45%, #38BDF8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {c.heading1}
            </span>
            <br />
            <span style={{ color: "#FFFFFF" }}>{c.heading2}</span>
          </h2>
          <div
            style={{
              width: "64px",
              height: "3px",
              margin: "1.2rem auto 1.2rem",
              borderRadius: "2px",
              background: "linear-gradient(90deg, transparent, #60A5FA, transparent)",
            }}
          />
          <p
            style={{
              fontSize: "1rem",
              color: "#CBD5E1",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.78,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
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
            const color = COLORS[i] ?? "#60A5FA";
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="why-glass-card"
                style={{
                  position: "relative",
                  background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "20px",
                  padding: "2rem",
                  overflow: "hidden",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${color}, ${color}44, transparent)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "-40px", right: "-40px",
                    width: "140px", height: "140px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${color}1F 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    width: "52px", height: "52px",
                    borderRadius: "14px",
                    background: `${color}1A`,
                    border: `1px solid ${color}40`,
                    boxShadow: `0 0 24px ${color}2E`,
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
                    color: "#F8FAFC",
                    marginBottom: "0.6rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.86rem",
                    color: "#B6C2D6",
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
        .why-glass-card {
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
        }
        .why-glass-card:hover {
          transform: translateY(-6px);
          border-color: rgba(147,197,253,0.45);
          box-shadow: 0 20px 48px rgba(0,0,0,0.4), 0 0 32px rgba(96,165,250,0.14);
          background: linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%);
        }
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
