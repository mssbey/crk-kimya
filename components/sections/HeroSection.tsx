"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import rawContent from "@/content/site-content.json";

const c = rawContent.hero;

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  hasOrbit: boolean;
  orbitRadius?: number;
  orbitAngle?: number;
  orbitSpeed?: number;
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 0→20s oynat, 20s'de 1:24'e (84s) atla, sonuna kadar devam et
  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= 20 && v.currentTime < 84) {
      v.currentTime = 84;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 70 }, () => {
        const hasOrbit = Math.random() > 0.82;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 0.6,
          alpha: Math.random() * 0.22 + 0.06,
          hasOrbit,
          orbitRadius: hasOrbit ? Math.random() * 30 + 15 : undefined,
          orbitAngle: hasOrbit ? Math.random() * Math.PI * 2 : undefined,
          orbitSpeed: hasOrbit
            ? (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.012 + 0.004)
            : undefined,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(26,47,143,${(1 - dist / 130) * 0.12})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        if (p.hasOrbit && p.orbitRadius && p.orbitAngle !== undefined) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.orbitRadius, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(26,47,143,0.07)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
          const ex = p.x + Math.cos(p.orbitAngle) * p.orbitRadius;
          const ey = p.y + Math.sin(p.orbitAngle) * p.orbitRadius;
          ctx.beginPath();
          ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(41,87,216,0.45)";
          ctx.fill();
          if (p.orbitSpeed) p.orbitAngle += p.orbitSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,47,143,${p.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#FFFFFF",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.18,
          zIndex: 0,
        }}
      >
        <source src="/4k.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: "55%", height: "70%",
          background: "radial-gradient(ellipse at 100% 0%, rgba(26,47,143,0.06) 0%, rgba(41,87,216,0.03) 40%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0,
          width: "40%", height: "40%",
          background: "radial-gradient(ellipse at 0% 100%, rgba(26,47,143,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "8%", right: "3%",
          width: "340px", height: "340px",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.5,
        }}
      >
        <svg viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="170" cy="170" r="155" stroke="rgba(26,47,143,0.08)" strokeWidth="1"/>
          <circle cx="170" cy="170" r="115" stroke="rgba(26,47,143,0.07)" strokeWidth="1" strokeDasharray="4 6"/>
          <circle cx="170" cy="170" r="75" stroke="rgba(26,47,143,0.06)" strokeWidth="1"/>
          <circle cx="170" cy="170" r="8" fill="rgba(26,47,143,0.12)"/>
          <circle cx="170" cy="55" r="5" fill="rgba(41,87,216,0.18)"/>
          <circle cx="170" cy="285" r="5" fill="rgba(41,87,216,0.15)"/>
          <circle cx="69" cy="112" r="4" fill="rgba(41,87,216,0.15)"/>
          <circle cx="271" cy="112" r="4" fill="rgba(41,87,216,0.12)"/>
          <circle cx="69" cy="228" r="4" fill="rgba(41,87,216,0.12)"/>
          <circle cx="271" cy="228" r="6" fill="rgba(26,47,143,0.2)"/>
          <line x1="170" y1="55" x2="170" y2="285" stroke="rgba(26,47,143,0.05)" strokeWidth="0.8"/>
          <line x1="69" y1="112" x2="271" y2="228" stroke="rgba(26,47,143,0.05)" strokeWidth="0.8"/>
          <line x1="271" y1="112" x2="69" y2="228" stroke="rgba(26,47,143,0.05)" strokeWidth="0.8"/>
        </svg>
      </div>

      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
      />

      <div
        className="section-container hero-grid"
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 370px",
          gap: "4rem",
          alignItems: "center",
          paddingTop: "120px",
          paddingBottom: "80px",
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <span className="tag-chip">{c.chip}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ marginBottom: "2rem" }}
          >
            <Image
              src="/logo.png"
              alt="CRK Kimya"
              width={260}
              height={88}
              className="hero-logo"
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            <span className="gradient-text">{c.heading1}</span>
            <br />
            <span style={{ color: "#0F172A" }}>{c.heading2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56 }}
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              lineHeight: 1.78,
              maxWidth: "560px",
              marginBottom: "2.5rem",
            }}
          >
            {c.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <Link href="/urun-gruplari">
              <button
                className="btn-glow"
                style={{
                  padding: "14px 32px",
                  borderRadius: "10px",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {c.btn1}
                  <ArrowRight size={18} />
                </span>
              </button>
            </Link>
            <Link href="/iletisim">
              <button
                className="btn-outline"
                style={{
                  padding: "14px 32px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                {c.btn2}
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            style={{
              display: "flex",
              gap: "0",
              marginTop: "3rem",
              flexWrap: "wrap",
              padding: "1.5rem 0",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            {c.statItems.map(({ value, label }, i) => (
              <div
                key={label}
                style={{
                  paddingRight: i < c.statItems.length - 1 ? "2.5rem" : "0",
                  marginRight: i < c.statItems.length - 1 ? "2.5rem" : "0",
                  borderRight: i < c.statItems.length - 1 ? "1px solid #E2E8F0" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    marginBottom: "4px",
                    background: "linear-gradient(135deg, #1A2F8F, #2957D8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 500 }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="hero-card"
          style={{ position: "relative" }}
        >
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(26,47,143,0.18), 0 4px 20px rgba(0,0,0,0.1)",
              position: "relative",
            }}
          >
            <Image
              src="/1.png"
              alt="CRK Kimya"
              width={600}
              height={420}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "1.5rem",
                background: "linear-gradient(0deg, rgba(10,20,60,0.88) 0%, transparent 100%)",
              }}
            >
              <p style={{ color: "white", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.05em", opacity: 0.95, margin: 0 }}>
                {c.certText}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-16px",
              right: "-16px",
              background: "linear-gradient(135deg, #1A2F8F, #2957D8)",
              borderRadius: "14px",
              padding: "10px 16px",
              boxShadow: "0 8px 24px rgba(26,47,143,0.35)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle2 size={16} color="white" />
            <span style={{ color: "white", fontSize: "0.78rem", fontWeight: 700, whiteSpace: "nowrap" }}>
              {c.badge1}
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{
              position: "absolute",
              bottom: "-16px",
              left: "-16px",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "14px",
              padding: "10px 16px",
              boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🏆</span>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0F172A" }}>{c.badge2Title}</div>
              <div style={{ fontSize: "0.65rem", color: "#64748B" }}>{c.badge2Sub}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "#94A3B8",
        }}
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
          {c.scrollLabel}
        </span>
        <ChevronDown size={18} />
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-top: 100px !important;
            padding-bottom: 60px !important;
          }
          .hero-card { display: none !important; }
        }
      `}</style>
    </section>
  );
}
