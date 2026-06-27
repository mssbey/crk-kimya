"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        zIndex: 9998,
        width: `${progress}%`,
        background: "linear-gradient(90deg, #1A2F8F, #2957D8, #47B8FF)",
        transition: "width 0.1s linear",
        boxShadow: "0 0 10px rgba(71,184,255,0.6)",
      }}
    />
  );
}
