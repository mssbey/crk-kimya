"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.cta;

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4rem, 8vw, 8rem) 0",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0F2060 0%, #1A2F8F 45%, #2957D8 100%)",
      }}
    >
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

      {[200, 360, 520, 680].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: `${size}px`, height: `${size}px`,
            borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${0.06 - i * 0.012})`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "300px", height: "300px",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%", right: "-5%",
          transform: "translateY(-50%)",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(71,184,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="section-container"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "5px 14px",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.9)",
              marginBottom: "1.5rem",
            }}
          >
            {c.chip}
          </span>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              color: "#FFFFFF",
            }}
          >
            {c.heading1}
            <br />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{c.heading2}</span>
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "540px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.78,
            }}
          >
            {c.body}
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/iletisim">
              <button
                style={{
                  padding: "16px 40px",
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  color: "#1A2F8F",
                  fontWeight: 700,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
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
                {c.btn1}
                <ArrowRight size={20} />
              </button>
            </Link>

            <a href={`tel:${c.phone}`}>
              <button
                style={{
                  padding: "16px 36px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <Phone size={18} />
                {c.btn2}
              </button>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: "flex",
              gap: "1.25rem",
              justifyContent: "center",
              marginTop: "3rem",
              flexWrap: "wrap",
            }}
          >
            {c.badges.map((badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 16px",
                  borderRadius: "100px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <CheckCircle2 size={13} color="rgba(255,255,255,0.7)" />
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
