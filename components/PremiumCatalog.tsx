"use client";

import { useState, useRef, useCallback, useEffect, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";

const PDFJS_VERSION = "6.0.227";

const DEFAULT_CATEGORIES = [
  { name: "Endüstriyel Bakım Ürünleri", page: 3 },
  { name: "Özel Endüstriyel Ürünler", page: 12 },
  { name: "Teknik Grup", page: 21 },
  { name: "Zemin Cila Grubu", page: 29 },
  { name: "Genel ve Endüstriyel Temizlik", page: 36 },
  { name: "El Hijyen Grubu", page: 42 },
  { name: "Bulaşık Yıkama", page: 48 },
  { name: "Dezenfektan ve Antiseptikler", page: 53 },
  { name: "Mekan Parfümleri", page: 58 },
  { name: "Çamaşır Yıkama", page: 63 },
  { name: "Oto Grubu", page: 67 },
];

export interface CatalogCategory { name: string; page: number; }

export interface PremiumCatalogProps {
  pdfUrl?: string;
  categories?: CatalogCategory[];
  tagLabel?: string;
  titleGradient?: string;
  titlePlain?: string;
  subtitle?: string;
  contentTopPadding?: number;
}

// ---------- Molecular Background (light theme) ----------
function MolecularBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Pt = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    const pts: Pt[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.3 + 0.06,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(26,47,143,${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(0, `rgba(26,47,143,${p.a * 0.4})`);
        g.addColorStop(1, "rgba(26,47,143,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,47,143,${p.a})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.5,
      }}
    />
  );
}

// ---------- Single Page Wrapper (react-pageflip requires forwardRef) ----------
interface PageWrapperProps {
  pageIndex: number;
  imageUrl?: string;
  pageWidth: number;
  pageHeight: number;
}

const CatalogPageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ pageIndex, imageUrl, pageWidth, pageHeight }, ref) => (
    <div
      ref={ref}
      style={{
        width: pageWidth,
        height: pageHeight,
        overflow: "hidden",
        background: "#f4f4f4",
        position: "relative",
        userSelect: "none",
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Sayfa ${pageIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
            display: "block",
            imageRendering: "auto",
          }}
          draggable={false}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #f0f4ff 0%, #e8edf8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="crk-spinner" />
        </div>
      )}
    </div>
  )
);
CatalogPageWrapper.displayName = "CatalogPageWrapper";

// ---------- Main Component ----------
export function PremiumCatalog({
  pdfUrl = "/catalog/crk-urun.pdf",
  categories = DEFAULT_CATEGORIES,
  tagLabel = "Dijital Katalog 2026",
  titleGradient = "CRK Kimya",
  titlePlain = "Ürün Kataloğu",
  subtitle = "Sayfaları çevirmek için kenarlara tıklayın veya ok tuşlarını kullanın",
  contentTopPadding = 100,
}: PremiumCatalogProps = {}) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [pdfError, setPdfError] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pageImages, setPageImages] = useState<Record<number, string>>({});

  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<any>(null);
  const requestedRef = useRef<Set<number>>(new Set());

  const [mobilePageWidth, setMobilePageWidth] = useState(320);

  const pageWidth = isMobile ? mobilePageWidth : 460;
  const pageHeight = Math.round(pageWidth * 1.414);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setMobilePageWidth(Math.min(420, Math.max(260, w - 32)));
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    requestedRef.current = new Set();
    setPageImages({});
  }, [pageWidth]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    import("pdfjs-dist").then((pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

      const task = pdfjsLib.getDocument({
        url: pdfUrl,
        disableAutoFetch: true,
        disableStream: false,
        rangeChunkSize: 65536,
      } as any);
      task.promise
        .then((pdf: any) => {
          if (cancelled) return;
          pdfDocRef.current = pdf;
          setNumPages(pdf.numPages);
          setPdfLoading(false);
        })
        .catch(() => {
          if (!cancelled) {
            setPdfError(true);
            setPdfLoading(false);
          }
        });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const BUFFER = 2;
  const rangeStart = Math.max(0, currentPage - BUFFER);
  const rangeEnd = Math.min(numPages - 1, currentPage + BUFFER);

  useEffect(() => {
    if (!pdfDocRef.current || numPages === 0) return;
    const pdf = pdfDocRef.current;

    const renderPage = async (pageIndex: number) => {
      try {
        const page = await pdf.getPage(pageIndex + 1);
        const natural = page.getViewport({ scale: 1 });
        const dpr = Math.min(window.devicePixelRatio || 1, 1);
        const SUPERSAMPLE = 2;
        const scale = (pageWidth / natural.width) * SUPERSAMPLE * dpr;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const ctx = canvas.getContext("2d", { alpha: false })!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({
          canvasContext: ctx,
          viewport,
          intent: "display",
        } as any).promise;
        const url = canvas.toDataURL("image/jpeg", 0.92);
        setPageImages((prev) => ({ ...prev, [pageIndex]: url }));
      } catch {
        requestedRef.current.delete(pageIndex);
      }
    };

    const order: number[] = [];
    for (let offset = 0; offset <= BUFFER; offset++) {
      const before = currentPage - offset;
      const after = currentPage + offset;
      if (offset === 0) {
        if (before >= 0 && before < numPages) order.push(before);
      } else {
        if (before >= 0 && before < numPages) order.push(before);
        if (after >= 0 && after < numPages && after !== before) order.push(after);
      }
    }

    for (const i of order) {
      if (!requestedRef.current.has(i)) {
        requestedRef.current.add(i);
        renderPage(i);
      }
    }
  }, [rangeStart, rangeEnd, numPages, pageWidth, currentPage]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  const goToPage = useCallback(
    (pageIndex: number) => {
      const clamped = Math.max(0, Math.min(numPages - 1, pageIndex));
      try {
        flipBookRef.current?.pageFlip()?.flip(clamped);
      } catch {}
    },
    [numPages]
  );

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // ---------- Error state ----------
  if (pdfError) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          background: "#F5F7FA",
        }}
      >
        <div style={{ fontSize: "3rem" }}>📄</div>
        <h3 style={{ color: "#0F172A", fontSize: "1.25rem", fontWeight: 700 }}>
          PDF Kataloğu Bulunamadı
        </h3>
        <p
          style={{
            color: "#475569",
            textAlign: "center",
            maxWidth: 400,
            lineHeight: 1.7,
          }}
        >
          Lütfen{" "}
          <code
            style={{
              color: "#1A2F8F",
              background: "rgba(26,47,143,0.08)",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            public/catalog/crk-urun.pdf
          </code>{" "}
          dosyasını projeye ekleyin.
        </p>
      </div>
    );
  }

  // ---------- Render ----------
  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(160deg, #F8FAFC 0%, #F5F7FA 55%, #EEF4FF 100%)",
      }}
    >
      {/* Molecular background */}
      <MolecularBg />

      {/* Ambient radial glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 10%, rgba(26,47,143,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Mouse-tracking glow */}
      <div
        style={{
          position: "fixed",
          left: mousePos.x - 280,
          top: mousePos.y - 280,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,47,143,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "left 0.08s ease, top 0.08s ease",
        }}
      />

      {/* ===== Content ===== */}
      <div
        style={{ position: "relative", zIndex: 2, paddingTop: contentTopPadding, paddingBottom: 60 }}
      >
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2.5rem", padding: "0 1rem" }}
        >
          <span className="tag-chip">{tagLabel}</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem,4vw,3rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              marginTop: "0.75rem",
              lineHeight: 1.1,
              color: "#0F172A",
            }}
          >
            <span className="gradient-text">{titleGradient}</span>{" "}
            <span style={{ color: "#0F172A" }}>{titlePlain}</span>
          </h1>
          <p
            style={{
              color: "#94A3B8",
              fontSize: "0.875rem",
              marginTop: "0.5rem",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Layout: sidebar + catalog */}
        <div
          style={{
            display: "flex",
            gap: "1.75rem",
            alignItems: "flex-start",
            padding: "0 1.5rem",
            maxWidth: 1550,
            margin: "0 auto",
          }}
        >
          {/* ── Left sidebar (desktop) ── */}
          {!isMobile && (
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ width: 210, flexShrink: 0, position: "sticky", top: 100 }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(26,47,143,0.12)",
                  borderRadius: 16,
                  padding: "1.25rem",
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 130px)",
                  boxShadow: "0 4px 20px rgba(26,47,143,0.06)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#1A2F8F",
                    marginBottom: "1rem",
                  }}
                >
                  KATEGORİLER
                </p>
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => goToPage(cat.page - 1)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      width: "100%",
                      textAlign: "left",
                      padding: "0.55rem 0.65rem",
                      borderRadius: 8,
                      border: "none",
                      background: "transparent",
                      color: "#475569",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      marginBottom: 2,
                      lineHeight: 1.4,
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(26,47,143,0.06)";
                      (e.currentTarget as HTMLElement).style.color = "#1A2F8F";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#475569";
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "rgba(26,47,143,0.5)",
                        flexShrink: 0,
                        paddingTop: 1,
                      }}
                    >
                      S{cat.page}
                    </span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </motion.aside>
          )}

          {/* ── Main catalog area ── */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              minWidth: 0,
            }}
          >
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                padding: "0.55rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
              }}
            >
              {/* Page counter */}
              <span
                style={{
                  color: "#64748B",
                  fontSize: "0.82rem",
                  whiteSpace: "nowrap",
                }}
              >
                📖{" "}
                <strong style={{ color: "#0F172A" }}>{currentPage + 1}</strong>
                <span style={{ color: "#94A3B8" }}>
                  {" "}
                  / {numPages || "..."}
                </span>
              </span>

              <div
                style={{
                  width: 1,
                  height: 18,
                  background: "#E2E8F0",
                }}
              />

              {/* Zoom */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <button
                  onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.15).toFixed(2)))}
                  style={TB_BTN}
                >
                  ➖
                </button>
                <span
                  style={{
                    color: "#475569",
                    fontSize: "0.75rem",
                    minWidth: 38,
                    textAlign: "center",
                  }}
                >
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(2, +(z + 0.15).toFixed(2)))}
                  style={TB_BTN}
                >
                  ➕
                </button>
              </div>

              <div
                style={{
                  width: 1,
                  height: 18,
                  background: "#E2E8F0",
                }}
              />

              <button
                onClick={toggleFullscreen}
                style={TB_BTN}
                title="Tam Ekran"
              >
                {isFullscreen ? "⊠" : "⛶"}
              </button>

              <a
                href={pdfUrl}
                download
                style={{ ...TB_BTN, textDecoration: "none", display: "inline-flex" }}
                title="PDF İndir"
              >
                ⬇
              </a>

              <div
                style={{
                  width: 1,
                  height: 18,
                  background: "#E2E8F0",
                }}
              />

              <button
                onClick={() => flipBookRef.current?.pageFlip()?.flipPrev()}
                style={{ ...TB_BTN, padding: "5px 14px" }}
              >
                ◀
              </button>
              <button
                onClick={() => flipBookRef.current?.pageFlip()?.flipNext()}
                style={{ ...TB_BTN, padding: "5px 14px" }}
              >
                ▶
              </button>
            </motion.div>

            {/* ── Book area ── */}
            {pdfLoading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.25rem",
                  padding: "5rem 0",
                  color: "#64748B",
                  fontSize: "0.9rem",
                }}
              >
                <div className="crk-spinner crk-spinner-lg" />
                Katalog yükleniyor...
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "relative" }}
              >
                {/* Book ground shadow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -55,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%",
                    height: 70,
                    background:
                      "radial-gradient(ellipse, rgba(15,23,42,0.18) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    zIndex: -1,
                    pointerEvents: "none",
                  }}
                />

                {/* Scaled flipbook wrapper */}
                <div
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center top",
                    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    display: "inline-block",
                    marginBottom: `${(zoom - 1) * pageHeight}px`,
                  }}
                >
                  {numPages > 0 && (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <HTMLFlipBook
                      key={isMobile ? "m" : "d"}
                      ref={flipBookRef}
                      width={pageWidth}
                      height={pageHeight}
                      size="fixed"
                      minWidth={pageWidth}
                      maxWidth={pageWidth}
                      minHeight={pageHeight}
                      maxHeight={pageHeight}
                      showCover
                      drawShadow
                      flippingTime={750}
                      usePortrait={isMobile}
                      startPage={0}
                      mobileScrollSupport
                      startZIndex={0}
                      autoSize={false}
                      maxShadowOpacity={0.35}
                      clickEventForward
                      useMouseEvents
                      swipeDistance={30}
                      showPageCorners
                      disableFlipByClick={false}
                      className="crk-flipbook"
                      onFlip={(e: any) => setCurrentPage(e.data)}
                      style={{
                        boxShadow:
                          "0 30px 80px rgba(15,23,42,0.22), 0 0 60px rgba(26,47,143,0.12)",
                      }}
                    >
                      {Array.from({ length: numPages }, (_, i) => (
                        <CatalogPageWrapper
                          key={i}
                          pageIndex={i}
                          imageUrl={pageImages[i]}
                          pageWidth={pageWidth}
                          pageHeight={pageHeight}
                        />
                      ))}
                    </HTMLFlipBook>
                  )}
                </div>
              </motion.div>
            )}

            {/* Progress indicator */}
            {numPages > 0 && !pdfLoading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                <button onClick={() => goToPage(0)} style={TB_BTN} title="İlk Sayfa">
                  ⏮
                </button>
                <div
                  style={{
                    width: 120,
                    height: 3,
                    background: "#E2E8F0",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${((currentPage + 1) / numPages) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #1A2F8F, #2957D8)",
                      borderRadius: 2,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
                <button
                  onClick={() => goToPage(numPages - 1)}
                  style={TB_BTN}
                  title="Son Sayfa"
                >
                  ⏭
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile category FAB ── */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 50,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1A2F8F, #2957D8)",
            border: "1px solid rgba(26,47,143,0.3)",
            color: "white",
            fontSize: "1.3rem",
            cursor: "pointer",
            boxShadow: "0 6px 24px rgba(26,47,143,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ☰
        </button>
      )}

      {/* ── Mobile sidebar ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 199,
                background: "rgba(15,23,42,0.3)",
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(300px, 88vw)",
                background: "#FFFFFF",
                zIndex: 200,
                padding: "2rem 1.5rem",
                overflowY: "auto",
                borderLeft: "1px solid #E2E8F0",
                boxShadow: "-4px 0 24px rgba(15,23,42,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    color: "#1A2F8F",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  KATEGORİLER
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{ ...TB_BTN, padding: "4px 10px" }}
                >
                  ✕
                </button>
              </div>

              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    goToPage(cat.page - 1);
                    setSidebarOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.85rem 0.5rem",
                    borderRadius: 8,
                    border: "none",
                    borderBottom: "1px solid #F1F5F9",
                    background: "transparent",
                    color: "#334155",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(26,47,143,0.55)",
                      fontSize: "0.7rem",
                      minWidth: 28,
                      flexShrink: 0,
                    }}
                  >
                    S{cat.page}
                  </span>
                  {cat.name}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes crk-spin { to { transform: rotate(360deg); } }
        .crk-spinner {
          width: 28px; height: 28px;
          border: 2px solid rgba(26,47,143,0.15);
          border-top-color: #2957D8;
          border-radius: 50%;
          animation: crk-spin 0.9s linear infinite;
        }
        .crk-spinner-lg { width: 46px; height: 46px; border-width: 3px; }
      `}</style>
    </div>
  );
}

// ── Style constant ──
const TB_BTN: React.CSSProperties = {
  background: "#F8FAFC",
  border: "1px solid #E2E8F0",
  borderRadius: 7,
  color: "#475569",
  fontSize: "0.88rem",
  padding: "5px 9px",
  cursor: "pointer",
  lineHeight: 1,
  transition: "all 0.2s",
};
