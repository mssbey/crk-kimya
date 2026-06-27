"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
      glowRef.current.style.opacity = "1";
    };
    const leave = () => {
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(41,87,216,0.07) 0%, rgba(71,184,255,0.04) 30%, transparent 70%)",
        transition: "opacity 0.4s ease",
      }}
    />
  );
}
