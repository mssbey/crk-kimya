"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { HeadphonesIcon, BarChart3, FlaskConical, Wrench, ArrowRight } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.services;

const ICONS = [BarChart3, HeadphonesIcon, FlaskConical, Wrench];
const COLORS = ["#1A2F8F", "#0F2060", "#1A2F8F", "#0F2060"];

export function ServicesSection() {
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
          top: "10%", left: "-8%",
          width: "400px", height: "400px",
          backgroundImage: "radial-gradient(circle, rgba(26,47,143,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
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
              <span className="gradient-text">{c.heading1}</span>
              <br />
              <span style={{ color: "#0F172A" }}>{c.heading2}</span>
            </h2>
            <Link href="/hizmetler">
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
                Tüm Hizmetler <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {c.items.map(({ title, desc, features }, i) => {
            const Icon = ICONS[i] ?? BarChart3;
            const color = COLORS[i] ?? "#1A2F8F";
            const step = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="premium-card services-card"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "2rem",
                  display: "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  gap: "1.5rem",
                  alignItems: "start",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: "4px",
                    background: `linear-gradient(180deg, ${color}, ${color}66)`,
                    borderRadius: "4px 0 0 4px",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", paddingLeft: "0.5rem" }}>
                  <div
                    style={{
                      width: "50px", height: "50px",
                      borderRadius: "14px",
                      background: `${color}0D`,
                      border: `1px solid ${color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      color: `${color}88`,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      marginBottom: "0.55rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#475569",
                      lineHeight: 1.78,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {desc}
                  </p>
                  <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                    {features.map((f) => (
                      <span
                        key={f}
                        style={{
                          padding: "3px 10px",
                          borderRadius: "100px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          background: `${color}08`,
                          border: `1px solid ${color}1F`,
                          color,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="service-col-arrow" style={{ color: `${color}55`, paddingTop: "12px" }}>
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
