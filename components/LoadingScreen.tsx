"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Molecule node positions spread across the screen
const NODES = [
  { x: 8, y: 12 }, { x: 22, y: 5 }, { x: 38, y: 18 }, { x: 55, y: 8 },
  { x: 72, y: 15 }, { x: 88, y: 9 }, { x: 95, y: 28 }, { x: 82, y: 38 },
  { x: 90, y: 55 }, { x: 85, y: 70 }, { x: 92, y: 82 }, { x: 78, y: 90 },
  { x: 62, y: 95 }, { x: 45, y: 88 }, { x: 28, y: 92 }, { x: 12, y: 85 },
  { x: 5, y: 70 }, { x: 8, y: 52 }, { x: 4, y: 35 }, { x: 15, y: 48 },
  { x: 30, y: 35 }, { x: 48, y: 42 }, { x: 65, y: 30 }, { x: 75, y: 48 },
  { x: 60, y: 62 }, { x: 40, y: 68 }, { x: 25, y: 58 }, { x: 18, y: 30 },
];

// Edges connecting nodes
const EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],
  [10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],
  [18,0],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],
  [26,27],[27,19],[2,20],[4,22],[7,23],[9,24],[11,25],[14,26],[17,19],
];

// Background hexagons
const HEXAGONS = [
  { cx: 15, cy: 20, r: 8, opacity: 0.03 },
  { cx: 75, cy: 15, r: 12, opacity: 0.025 },
  { cx: 85, cy: 70, r: 9, opacity: 0.03 },
  { cx: 20, cy: 75, r: 11, opacity: 0.02 },
  { cx: 50, cy: 50, r: 18, opacity: 0.02 },
  { cx: 40, cy: 15, r: 6, opacity: 0.035 },
  { cx: 65, cy: 85, r: 7, opacity: 0.03 },
];

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

// Tagline characters
const TAGLINE = "KİMYANIN GÜCÜNÜ ENDÜSTRİYE TAŞIYORUZ";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"nodes" | "gather" | "logo" | "done">("nodes");
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Phase timeline
    const t1 = setTimeout(() => setPhase("gather"), 1000);
    const t2 = setTimeout(() => setPhase("logo"), 2000);
    const t3 = setTimeout(() => setPhase("done"), 3000);
    const t4 = setTimeout(() => setExit(true), 3400);
    const t5 = setTimeout(() => setVisible(false), 4200);

    // Progress 0→100 over 3s
    let start: number | null = null;
    let raf: number;
    function tick(ts: number) {
      if (!start) start = ts;
      const p = Math.min(((ts - start) / 3000) * 100, 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted) return null;

  const nodeTargetX = 50;
  const nodeTargetY = 44;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: exit ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* Exit white flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "done" ? [0, 1, 0] : 0 }}
            transition={{ duration: 0.6, times: [0, 0.4, 1], delay: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.15) 0%, transparent 60%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Full-screen SVG canvas */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Background hexagons */}
            {HEXAGONS.map((h, i) => (
              <polygon
                key={`hex-${i}`}
                points={hexPoints(h.cx, h.cy, h.r)}
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="0.15"
                opacity={h.opacity}
              />
            ))}

            {/* Background floating formulas */}
            {["H₂O", "C₆H₆", "NaOH", "H₂SO₄", "NH₃", "CO₂"].map((f, i) => (
              <text
                key={`formula-${i}`}
                x={[10, 80, 20, 70, 15, 85][i]}
                y={[30, 20, 65, 80, 50, 55][i]}
                fontSize="2.5"
                fill="#0F172A"
                opacity="0.025"
                fontFamily="monospace"
              >
                {f}
              </text>
            ))}

            {/* Crystal lattice lines (very subtle) */}
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={`lattice-v-${i}`}
                x1={i * 14}
                y1="0"
                x2={i * 14}
                y2="100"
                stroke="#0EA5E9"
                strokeWidth="0.08"
                opacity="0.04"
              />
            ))}
            {Array.from({ length: 8 }, (_, i) => (
              <line
                key={`lattice-h-${i}`}
                x1="0"
                y1={i * 14}
                x2="100"
                y2={i * 14}
                stroke="#0EA5E9"
                strokeWidth="0.08"
                opacity="0.04"
              />
            ))}

            {/* Molecule edges */}
            {EDGES.map(([a, b], i) => {
              const na = NODES[a], nb = NODES[b];
              const gatherX_a = na.x + (nodeTargetX - na.x) * 0.7;
              const gatherY_a = na.y + (nodeTargetY - na.y) * 0.7;
              const gatherX_b = nb.x + (nodeTargetX - nb.x) * 0.7;
              const gatherY_b = nb.y + (nodeTargetY - nb.y) * 0.7;

              return (
                <motion.line
                  key={`edge-${i}`}
                  initial={{ opacity: 0, x1: na.x, y1: na.y, x2: nb.x, y2: nb.y }}
                  animate={
                    phase === "nodes"
                      ? { opacity: 0.12, x1: na.x, y1: na.y, x2: nb.x, y2: nb.y }
                      : phase === "gather"
                      ? { opacity: 0.2, x1: gatherX_a, y1: gatherY_a, x2: gatherX_b, y2: gatherY_b }
                      : { opacity: 0, x1: nodeTargetX, y1: nodeTargetY, x2: nodeTargetX, y2: nodeTargetY }
                  }
                  transition={{ duration: 0.8, delay: phase === "nodes" ? i * 0.02 : 0, ease: "easeInOut" }}
                  stroke="#0EA5E9"
                  strokeWidth="0.15"
                />
              );
            })}

            {/* Molecule nodes */}
            {NODES.map((n, i) => {
              const gatherX = n.x + (nodeTargetX - n.x) * 0.7;
              const gatherY = n.y + (nodeTargetY - n.y) * 0.7;

              return (
                <motion.circle
                  key={`node-${i}`}
                  initial={{ cx: n.x, cy: n.y, r: 0.4, opacity: 0 }}
                  animate={
                    phase === "nodes"
                      ? { cx: n.x, cy: n.y, r: 0.5, opacity: 0.5 }
                      : phase === "gather"
                      ? { cx: gatherX, cy: gatherY, r: 0.4, opacity: 0.7 }
                      : { cx: nodeTargetX, cy: nodeTargetY, r: 0.2, opacity: 0 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: phase === "nodes" ? i * 0.025 : 0,
                    ease: "easeInOut",
                  }}
                  fill="#0EA5E9"
                />
              );
            })}

            {/* Atom orbit rings around logo center */}
            {phase === "logo" && [6, 10, 15].map((r, i) => (
              <motion.circle
                key={`orbit-${i}`}
                cx={nodeTargetX}
                cy={nodeTargetY}
                r={r}
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="0.1"
                strokeDasharray="1 2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.12, 0.06], scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
            ))}
          </svg>

          {/* Logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{
              opacity: phase === "nodes" ? 0 : phase === "gather" ? 0.3 : 1,
              scale: phase === "logo" || phase === "done" ? 1 : 0.9,
              y: 0,
            }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: "relative", zIndex: 3 }}
          >
            {/* Energy glow behind logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: phase === "logo" || phase === "done" ? [0, 0.6, 0.2] : 0,
                scale: phase === "logo" || phase === "done" ? [0.8, 1.4, 1.1] : 0.5,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: "-40px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 70%)",
                pointerEvents: "none",
                zIndex: -1,
              }}
            />
            <Image
              src="/logo.png"
              alt="CRK Kimya"
              width={280}
              height={94}
              style={{ objectFit: "contain", filter: "none" }}
              priority
            />
          </motion.div>

          {/* Tagline — character-by-character */}
          <div
            style={{
              position: "relative",
              zIndex: 3,
              marginTop: "1.8rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0",
              maxWidth: "400px",
            }}
          >
            {TAGLINE.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: phase === "logo" || phase === "done" ? 1 : 0, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + i * 0.025,
                  ease: "easeOut",
                }}
                style={{
                  color: "#0F172A",
                  fontSize: "0.7rem",
                  letterSpacing: char === " " ? "0.3em" : "0.12em",
                  fontWeight: 500,
                  opacity: 0.55,
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* Chemical tube progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase === "logo" || phase === "done" ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              position: "relative",
              zIndex: 3,
              marginTop: "2rem",
              width: "200px",
            }}
          >
            {/* Tube outer */}
            <div
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "#F0F4F8",
                border: "1px solid rgba(14,165,233,0.2)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Liquid fill */}
              <motion.div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${progress}%`,
                  borderRadius: "3px",
                  background: "linear-gradient(90deg, #2563EB, #0EA5E9, #38BDF8)",
                  boxShadow: "0 0 8px rgba(14,165,233,0.5)",
                }}
              />
              {/* Bubbles */}
              {[20, 45, 68, 85].map((pos, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -3, 0], opacity: progress > pos ? [0.4, 0.9, 0.4] : 0 }}
                  transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, delay: i * 0.3 }}
                  style={{
                    position: "absolute",
                    left: `${pos}%`,
                    top: "1px",
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.7)",
                  }}
                />
              ))}
            </div>
            {/* Tube end caps */}
            <div style={{
              position: "absolute", left: "-4px", top: "-1px",
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#E2EAF0", border: "1px solid rgba(14,165,233,0.25)",
            }} />
            <div style={{
              position: "absolute", right: "-4px", top: "-1px",
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#E2EAF0", border: "1px solid rgba(14,165,233,0.25)",
            }} />
            {/* Completion glow */}
            <motion.div
              animate={{ opacity: progress >= 99 ? [0, 1, 0] : 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "6px",
                background: "rgba(14,165,233,0.25)",
                filter: "blur(4px)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Particle dispersion on done */}
          {phase === "done" &&
            Array.from({ length: 24 }, (_, i) => {
              const angle = (i / 24) * Math.PI * 2;
              const dist = 120 + Math.random() * 200;
              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.015 }}
                  style={{
                    position: "absolute",
                    top: "44%",
                    left: "50%",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: i % 3 === 0 ? "#0EA5E9" : i % 3 === 1 ? "#2563EB" : "#38BDF8",
                    zIndex: 4,
                    pointerEvents: "none",
                  }}
                />
              );
            })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
