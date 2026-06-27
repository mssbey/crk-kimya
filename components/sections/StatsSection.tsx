"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Package, MapPin } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.stats;

const ICONS = [Award, Users, Package, MapPin];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(3rem, 6vw, 6rem) 0",
        background: "#F5F7FA",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="animated-grid"
        style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="tag-chip" style={{ marginBottom: "1rem", display: "inline-block" }}>
            {c.chip}
          </span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#0F172A",
            }}
          >
            <span className="gradient-text">{c.heading}</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
          className="stats-grid"
        >
          {c.items.map(({ value, suffix, label, desc }, i) => {
            const Icon = ICONS[i] ?? Award;
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="premium-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "2rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.05), 0 8px 32px rgba(26,47,143,0.04)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: "30%", right: "30%",
                    height: "3px",
                    background: "linear-gradient(90deg, transparent, #1A2F8F, transparent)",
                    borderRadius: "0 0 4px 4px",
                  }}
                />
                <div
                  style={{
                    width: "52px", height: "52px",
                    borderRadius: "14px",
                    background: "rgba(26,47,143,0.07)",
                    border: "1px solid rgba(26,47,143,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    color: "#1A2F8F",
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <Icon size={22} />
                </div>
                <div
                  style={{
                    fontSize: "2.8rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                    background: "linear-gradient(135deg, #1A2F8F 0%, #2957D8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <Counter end={value} suffix={suffix} />
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "0.3rem",
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
