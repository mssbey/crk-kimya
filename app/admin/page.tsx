"use client";

import { useEffect, useState, useCallback } from "react";

type Content = Record<string, unknown>;

const SECTIONS = [
  { key: "meta", label: "🔍 SEO / Meta" },
  { key: "hero", label: "🏠 Ana Sayfa Hero" },
  { key: "stats", label: "📊 İstatistikler" },
  { key: "about", label: "🏢 Hakkımızda (Ana)" },
  { key: "services", label: "⚙️ Hizmetler" },
  { key: "whyCRK", label: "✅ Neden CRK?" },
  { key: "quality", label: "🏆 Kalite Bölümü" },
  { key: "cta", label: "📞 CTA / İletişim" },
  { key: "hakkimizda", label: "📄 Hakkımızda Sayfası" },
];

const COLORS = {
  primary: "#1A2F8F",
  accent: "#2957D8",
  bg: "#F1F5F9",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  muted: "#64748B",
  success: "#16A34A",
  error: "#DC2626",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<Content | null>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchContent = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setContent(data);
      setAuthed(true);
      sessionStorage.setItem("adminPw", pw);
    } catch {
      setLoginError("İçerik yüklenemedi. Dev sunucusu çalışıyor mu? (npm run dev)");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("adminPw");
    if (saved) {
      setPassword(saved);
      fetchContent(saved);
    }
  }, [fetchContent]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    await fetchContent(password);
  };

  const handleSave = async () => {
    if (!content) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Hata");
      const isGithub = data.mode === "github";
      setStatus("saved");
      setStatusMsg(
        isGithub
          ? "GitHub'a kaydedildi! Site 1-2 dk içinde güncellenir."
          : "Kaydedildi! Site anında güncellendi."
      );
      setTimeout(() => setStatus("idle"), isGithub ? 6000 : 3000);
    } catch (err: unknown) {
      setStatus("error");
      setStatusMsg(err instanceof Error ? err.message : "Kayıt başarısız");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const updateField = (path: string[], value: unknown) => {
    setContent((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev) as Record<string, unknown>;
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        const idx = parseInt(path[i]);
        if (!isNaN(idx) && Array.isArray(cur)) {
          cur = cur[idx] as Record<string, unknown>;
        } else {
          cur = cur[key] as Record<string, unknown>;
        }
      }
      cur[path[path.length - 1]] = value;
      return next;
    });
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, #0F2060 0%, ${COLORS.primary} 50%, ${COLORS.accent} 100%)` }}>
        <div style={{ background: COLORS.card, borderRadius: 20, padding: "2.5rem", width: 360, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${COLORS.primary}15`, border: `2px solid ${COLORS.primary}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.5rem" }}>🔐</div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: COLORS.text, margin: 0 }}>CRK Admin Panel</h1>
            <p style={{ color: COLORS.muted, fontSize: "0.875rem", marginTop: "0.4rem" }}>Site içeriğini yönetin</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: COLORS.muted, display: "block", marginBottom: 4 }}>Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin şifresi"
                autoFocus
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: "0.95rem", outline: "none", boxSizing: "border-box", color: COLORS.text }}
                onFocus={(e) => { e.target.style.borderColor = COLORS.primary; }}
                onBlur={(e) => { e.target.style.borderColor = COLORS.border; }}
              />
            </div>
            {loginError && <p style={{ color: COLORS.error, fontSize: "0.8rem", margin: 0 }}>{loginError}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              style={{ padding: "12px", borderRadius: 10, background: loading ? COLORS.muted : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`, color: "white", fontWeight: 700, fontSize: "0.95rem", border: "none", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Yükleniyor..." : "Giriş Yap"}
            </button>
          </form>
          <p style={{ color: COLORS.muted, fontSize: "0.75rem", textAlign: "center", marginTop: "1.5rem" }}>
            Bu panel sadece <strong>npm run dev</strong> sırasında çalışır.
          </p>
        </div>
      </div>
    );
  }

  if (!content) return null;

  const sec = content[activeSection] as Record<string, unknown>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: `linear-gradient(180deg, #0F2060 0%, ${COLORS.primary} 100%)`, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100, overflowY: "auto" }}>
        <div style={{ padding: "1.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: "1rem", fontWeight: 800, color: "white" }}>CRK Admin</div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginTop: 2 }}>İçerik Yönetimi</div>
        </div>
        <nav style={{ padding: "1rem 0.75rem", flex: 1 }}>
          {SECTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "9px 14px", borderRadius: 10, marginBottom: 4,
                background: activeSection === key ? "rgba(255,255,255,0.15)" : "transparent",
                border: activeSection === key ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                color: activeSection === key ? "white" : "rgba(255,255,255,0.65)",
                fontSize: "0.82rem", fontWeight: activeSection === key ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <button
            onClick={() => { sessionStorage.removeItem("adminPw"); setAuthed(false); setContent(null); }}
            style={{ width: "100%", padding: "8px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", cursor: "pointer" }}
          >
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{ background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: COLORS.text }}>
              {SECTIONS.find((s) => s.key === activeSection)?.label}
            </div>
            <div style={{ fontSize: "0.75rem", color: COLORS.muted }}>Değişikliklerinizi kaydedin ve sayfayı yenileyin</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {status === "saved" && <span style={{ color: COLORS.success, fontSize: "0.85rem", fontWeight: 600 }}>✓ {statusMsg}</span>}
            {status === "error" && <span style={{ color: COLORS.error, fontSize: "0.85rem", fontWeight: 600 }}>✗ {statusMsg}</span>}
            <button
              onClick={handleSave}
              disabled={status === "saving"}
              style={{
                padding: "10px 24px", borderRadius: 10,
                background: status === "saving" ? COLORS.muted : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                color: "white", fontWeight: 700, fontSize: "0.9rem",
                border: "none", cursor: status === "saving" ? "not-allowed" : "pointer",
                boxShadow: "0 4px 16px rgba(26,47,143,0.3)",
              }}
            >
              {status === "saving" ? "Kaydediliyor..." : "💾 Kaydet"}
            </button>
          </div>
        </div>

        {/* Content editor */}
        <div style={{ padding: "2rem", flex: 1 }}>
          <SectionEditor section={activeSection} data={sec} onUpdate={updateField} />
        </div>
      </main>
    </div>
  );
}

/* ───────────── Section editors ───────────── */

function SectionEditor({ section, data, onUpdate }: {
  section: string;
  data: Record<string, unknown>;
  onUpdate: (path: string[], value: unknown) => void;
}) {
  switch (section) {
    case "meta": return <MetaEditor data={data} onUpdate={onUpdate} />;
    case "hero": return <HeroEditor data={data} onUpdate={onUpdate} />;
    case "stats": return <StatsEditor data={data} onUpdate={onUpdate} />;
    case "about": return <AboutEditor data={data} onUpdate={onUpdate} />;
    case "services": return <ServicesEditor data={data} onUpdate={onUpdate} />;
    case "whyCRK": return <WhyCRKEditor data={data} onUpdate={onUpdate} />;
    case "quality": return <QualityEditor data={data} onUpdate={onUpdate} />;
    case "cta": return <CTAEditor data={data} onUpdate={onUpdate} />;
    case "hakkimizda": return <HakkimizdaEditor data={data} onUpdate={onUpdate} />;
    default: return <pre style={{ fontSize: "0.8rem" }}>{JSON.stringify(data, null, 2)}</pre>;
  }
}

/* ───────────── Shared UI ───────────── */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "1.75rem", marginBottom: "1.5rem" }}>
      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: COLORS.primary, marginBottom: "1.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number;
}) {
  const style: React.CSSProperties = {
    width: "100%", padding: "9px 12px", borderRadius: 8,
    border: `1.5px solid ${COLORS.border}`, fontSize: "0.9rem",
    color: COLORS.text, background: "#FAFAFA", resize: multiline ? "vertical" : "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: COLORS.muted, marginBottom: 5 }}>{label}</label>
      {multiline ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} style={style} onFocus={(e) => { e.target.style.borderColor = COLORS.primary; }} onBlur={(e) => { e.target.style.borderColor = COLORS.border; }} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={style} onFocus={(e) => { e.target.style.borderColor = COLORS.primary; }} onBlur={(e) => { e.target.style.borderColor = COLORS.border; }} />
      )}
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void; }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: COLORS.muted, marginBottom: 5 }}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: 120, padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: "0.9rem", color: COLORS.text, background: "#FAFAFA", boxSizing: "border-box" }}
        onFocus={(e) => { e.target.style.borderColor = COLORS.primary; }}
        onBlur={(e) => { e.target.style.borderColor = COLORS.border; }}
      />
    </div>
  );
}

function ListField({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void; }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: COLORS.muted, marginBottom: 8 }}>{label}</label>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <input
            value={item}
            onChange={(e) => { const next = [...items]; next[i] = e.target.value; onChange(next); }}
            style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: "0.875rem", color: COLORS.text, background: "#FAFAFA" }}
          />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} style={{ padding: "6px 12px", borderRadius: 8, background: "#FEE2E2", border: "none", color: COLORS.error, cursor: "pointer", fontWeight: 700 }}>✕</button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ""])} style={{ padding: "7px 16px", borderRadius: 8, background: `${COLORS.primary}0F`, border: `1px solid ${COLORS.primary}25`, color: COLORS.primary, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", marginTop: 4 }}>+ Ekle</button>
    </div>
  );
}

/* ───────────── Section-specific editors ───────────── */

function MetaEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  return (
    <Card title="SEO ve Meta Etiketler">
      <Field label="Sayfa Başlığı (Title)" value={data.title as string} onChange={(v) => onUpdate(["meta", "title"], v)} />
      <Field label="Açıklama (Description)" value={data.description as string} onChange={(v) => onUpdate(["meta", "description"], v)} multiline rows={2} />
      <Field label="Anahtar Kelimeler (Keywords)" value={data.keywords as string} onChange={(v) => onUpdate(["meta", "keywords"], v)} multiline rows={2} />
      <Field label="Open Graph Başlığı" value={data.ogTitle as string} onChange={(v) => onUpdate(["meta", "ogTitle"], v)} />
      <Field label="Open Graph Açıklaması" value={data.ogDescription as string} onChange={(v) => onUpdate(["meta", "ogDescription"], v)} multiline rows={2} />
    </Card>
  );
}

function HeroEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const statItems = data.statItems as Array<{ value: string; label: string }>;
  return (
    <>
      <Card title="Üst Bant ve Başlık">
        <Field label="Etiket Metni" value={data.chip as string} onChange={(v) => onUpdate(["hero", "chip"], v)} />
        <Field label="Başlık Satır 1" value={data.heading1 as string} onChange={(v) => onUpdate(["hero", "heading1"], v)} />
        <Field label="Başlık Satır 2" value={data.heading2 as string} onChange={(v) => onUpdate(["hero", "heading2"], v)} />
        <Field label="Alt Metin" value={data.subtitle as string} onChange={(v) => onUpdate(["hero", "subtitle"], v)} multiline rows={3} />
      </Card>
      <Card title="Butonlar">
        <Field label="Buton 1 Metni" value={data.btn1 as string} onChange={(v) => onUpdate(["hero", "btn1"], v)} />
        <Field label="Buton 2 Metni" value={data.btn2 as string} onChange={(v) => onUpdate(["hero", "btn2"], v)} />
      </Card>
      <Card title="İstatistik Kutuları">
        {statItems.map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
            <Field label={`Değer ${i + 1}`} value={item.value} onChange={(v) => { const next = [...statItems]; next[i] = { ...next[i], value: v }; onUpdate(["hero", "statItems"], next); }} />
            <Field label={`Etiket ${i + 1}`} value={item.label} onChange={(v) => { const next = [...statItems]; next[i] = { ...next[i], label: v }; onUpdate(["hero", "statItems"], next); }} />
          </div>
        ))}
      </Card>
      <Card title="Rozetler ve Sertifika">
        <Field label="Sertifika Metni" value={data.certText as string} onChange={(v) => onUpdate(["hero", "certText"], v)} />
        <Field label="Rozet 1 Metni" value={data.badge1 as string} onChange={(v) => onUpdate(["hero", "badge1"], v)} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <Field label="Rozet 2 Başlık" value={data.badge2Title as string} onChange={(v) => onUpdate(["hero", "badge2Title"], v)} />
          <Field label="Rozet 2 Alt" value={data.badge2Sub as string} onChange={(v) => onUpdate(["hero", "badge2Sub"], v)} />
        </div>
        <Field label="Scroll Butonu Metni" value={data.scrollLabel as string} onChange={(v) => onUpdate(["hero", "scrollLabel"], v)} />
      </Card>
    </>
  );
}

function StatsEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const items = data.items as Array<{ value: number; suffix: string; label: string; desc: string }>;
  return (
    <>
      <Card title="Başlık">
        <Field label="Etiket" value={data.chip as string} onChange={(v) => onUpdate(["stats", "chip"], v)} />
        <Field label="Başlık" value={data.heading as string} onChange={(v) => onUpdate(["stats", "heading"], v)} />
      </Card>
      <Card title="İstatistikler">
        {items.map((item, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: COLORS.muted, marginBottom: "0.75rem" }}>İstatistik {i + 1}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.75rem" }}>
              <NumberField label="Sayı" value={item.value} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], value: v }; onUpdate(["stats", "items"], next); }} />
              <Field label="Ek" value={item.suffix} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], suffix: v }; onUpdate(["stats", "items"], next); }} />
              <Field label="Etiket" value={item.label} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], label: v }; onUpdate(["stats", "items"], next); }} />
              <Field label="Açıklama" value={item.desc} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], desc: v }; onUpdate(["stats", "items"], next); }} />
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

function AboutEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const highlights = data.highlights as string[];
  const statChips = data.statChips as Array<{ val: string; lbl: string }>;
  const pillars = data.pillars as Array<{ title: string; text: string }>;
  return (
    <>
      <Card title="Başlık">
        <Field label="Etiket" value={data.chip as string} onChange={(v) => onUpdate(["about", "chip"], v)} />
        <Field label="Başlık Satır 1" value={data.heading1 as string} onChange={(v) => onUpdate(["about", "heading1"], v)} />
        <Field label="Başlık Satır 2" value={data.heading2 as string} onChange={(v) => onUpdate(["about", "heading2"], v)} />
      </Card>
      <Card title="Ana Metin">
        <Field label="Paragraf 1" value={data.body1 as string} onChange={(v) => onUpdate(["about", "body1"], v)} multiline rows={4} />
        <Field label="Paragraf 2" value={data.body2 as string} onChange={(v) => onUpdate(["about", "body2"], v)} multiline rows={4} />
      </Card>
      <Card title="Özellik Listesi">
        <ListField label="" items={highlights} onChange={(v) => onUpdate(["about", "highlights"], v)} />
      </Card>
      <Card title="Görsel Altyazıları">
        <Field label="Alt Yazı Satır 1" value={data.imageCaption1 as string} onChange={(v) => onUpdate(["about", "imageCaption1"], v)} />
        <Field label="Alt Yazı Satır 2" value={data.imageCaption2 as string} onChange={(v) => onUpdate(["about", "imageCaption2"], v)} />
      </Card>
      <Card title="İstatistik Kutuları">
        {statChips.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.5rem" }}>
            <Field label={`Değer ${i + 1}`} value={c.val} onChange={(v) => { const next = [...statChips]; next[i] = { ...next[i], val: v }; onUpdate(["about", "statChips"], next); }} />
            <Field label={`Etiket ${i + 1}`} value={c.lbl} onChange={(v) => { const next = [...statChips]; next[i] = { ...next[i], lbl: v }; onUpdate(["about", "statChips"], next); }} />
          </div>
        ))}
      </Card>
      <Card title="Misyon / Vizyon / Değerler">
        {pillars.map((p, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "1rem", marginBottom: "0.75rem" }}>
            <Field label="Başlık" value={p.title} onChange={(v) => { const next = [...pillars]; next[i] = { ...next[i], title: v }; onUpdate(["about", "pillars"], next); }} />
            <Field label="Metin" value={p.text} onChange={(v) => { const next = [...pillars]; next[i] = { ...next[i], text: v }; onUpdate(["about", "pillars"], next); }} multiline rows={4} />
          </div>
        ))}
      </Card>
    </>
  );
}

function ServicesEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const items = data.items as Array<{ title: string; desc: string; features: string[] }>;
  return (
    <>
      <Card title="Başlık">
        <Field label="Etiket" value={data.chip as string} onChange={(v) => onUpdate(["services", "chip"], v)} />
        <Field label="Başlık Satır 1" value={data.heading1 as string} onChange={(v) => onUpdate(["services", "heading1"], v)} />
        <Field label="Başlık Satır 2" value={data.heading2 as string} onChange={(v) => onUpdate(["services", "heading2"], v)} />
      </Card>
      <Card title="Hizmetler">
        {items.map((item, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "1.25rem", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: COLORS.primary, marginBottom: "0.75rem" }}>Hizmet {i + 1}</div>
            <Field label="Başlık" value={item.title} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], title: v }; onUpdate(["services", "items"], next); }} />
            <Field label="Açıklama" value={item.desc} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], desc: v }; onUpdate(["services", "items"], next); }} multiline rows={3} />
            <ListField label="Özellikler" items={item.features} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], features: v }; onUpdate(["services", "items"], next); }} />
          </div>
        ))}
      </Card>
    </>
  );
}

function WhyCRKEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const items = data.items as Array<{ title: string; desc: string }>;
  return (
    <>
      <Card title="Başlık">
        <Field label="Etiket" value={data.chip as string} onChange={(v) => onUpdate(["whyCRK", "chip"], v)} />
        <Field label="Başlık Satır 1" value={data.heading1 as string} onChange={(v) => onUpdate(["whyCRK", "heading1"], v)} />
        <Field label="Başlık Satır 2" value={data.heading2 as string} onChange={(v) => onUpdate(["whyCRK", "heading2"], v)} />
        <Field label="Alt Metin" value={data.subtext as string} onChange={(v) => onUpdate(["whyCRK", "subtext"], v)} multiline rows={2} />
      </Card>
      <Card title="Avantajlar">
        {items.map((item, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "1rem", marginBottom: "0.75rem" }}>
            <Field label="Başlık" value={item.title} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], title: v }; onUpdate(["whyCRK", "items"], next); }} />
            <Field label="Açıklama" value={item.desc} onChange={(v) => { const next = [...items]; next[i] = { ...next[i], desc: v }; onUpdate(["whyCRK", "items"], next); }} multiline rows={3} />
          </div>
        ))}
      </Card>
    </>
  );
}

function QualityEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const certs = data.certs as Array<{ label: string; sub: string }>;
  const pillars = data.pillars as Array<{ label: string; desc: string }>;
  return (
    <>
      <Card title="Başlık ve Metin">
        <Field label="Etiket" value={data.chip as string} onChange={(v) => onUpdate(["quality", "chip"], v)} />
        <Field label="Başlık Satır 1" value={data.heading1 as string} onChange={(v) => onUpdate(["quality", "heading1"], v)} />
        <Field label="Başlık Satır 2" value={data.heading2 as string} onChange={(v) => onUpdate(["quality", "heading2"], v)} />
        <Field label="Paragraf 1" value={data.body1 as string} onChange={(v) => onUpdate(["quality", "body1"], v)} multiline rows={4} />
        <Field label="Paragraf 2" value={data.body2 as string} onChange={(v) => onUpdate(["quality", "body2"], v)} multiline rows={3} />
      </Card>
      <Card title="Sertifikalar">
        {certs.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.5rem" }}>
            <Field label={`Sertifika ${i + 1}`} value={c.label} onChange={(v) => { const next = [...certs]; next[i] = { ...next[i], label: v }; onUpdate(["quality", "certs"], next); }} />
            <Field label={`Açıklama ${i + 1}`} value={c.sub} onChange={(v) => { const next = [...certs]; next[i] = { ...next[i], sub: v }; onUpdate(["quality", "certs"], next); }} />
          </div>
        ))}
      </Card>
      <Card title="Kalite Sütunları">
        {pillars.map((p, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.5rem" }}>
            <Field label={`Başlık ${i + 1}`} value={p.label} onChange={(v) => { const next = [...pillars]; next[i] = { ...next[i], label: v }; onUpdate(["quality", "pillars"], next); }} />
            <Field label={`Açıklama ${i + 1}`} value={p.desc} onChange={(v) => { const next = [...pillars]; next[i] = { ...next[i], desc: v }; onUpdate(["quality", "pillars"], next); }} />
          </div>
        ))}
      </Card>
      <Card title="Banner (Alt Görsel)">
        <Field label="Etiket" value={data.bannerChip as string} onChange={(v) => onUpdate(["quality", "bannerChip"], v)} />
        <Field label="Başlık Satır 1" value={data.bannerHeading1 as string} onChange={(v) => onUpdate(["quality", "bannerHeading1"], v)} />
        <Field label="Başlık Satır 2" value={data.bannerHeading2 as string} onChange={(v) => onUpdate(["quality", "bannerHeading2"], v)} />
        <Field label="Açıklama" value={data.bannerBody as string} onChange={(v) => onUpdate(["quality", "bannerBody"], v)} multiline rows={3} />
        <Field label="Buton Metni" value={data.bannerBtn as string} onChange={(v) => onUpdate(["quality", "bannerBtn"], v)} />
      </Card>
    </>
  );
}

function CTAEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const badges = data.badges as string[];
  return (
    <>
      <Card title="Başlık ve Metin">
        <Field label="Etiket" value={data.chip as string} onChange={(v) => onUpdate(["cta", "chip"], v)} />
        <Field label="Başlık Satır 1" value={data.heading1 as string} onChange={(v) => onUpdate(["cta", "heading1"], v)} />
        <Field label="Başlık Satır 2" value={data.heading2 as string} onChange={(v) => onUpdate(["cta", "heading2"], v)} />
        <Field label="Açıklama" value={data.body as string} onChange={(v) => onUpdate(["cta", "body"], v)} multiline rows={3} />
      </Card>
      <Card title="Butonlar ve İletişim">
        <Field label="Buton 1" value={data.btn1 as string} onChange={(v) => onUpdate(["cta", "btn1"], v)} />
        <Field label="Buton 2" value={data.btn2 as string} onChange={(v) => onUpdate(["cta", "btn2"], v)} />
        <Field label="Telefon Numarası (href formatı)" value={data.phone as string} onChange={(v) => onUpdate(["cta", "phone"], v)} />
      </Card>
      <Card title="Güven Rozetleri">
        <ListField label="" items={badges} onChange={(v) => onUpdate(["cta", "badges"], v)} />
      </Card>
    </>
  );
}

function HakkimizdaEditor({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (p: string[], v: unknown) => void }) {
  const storyParas = data.storyParas as string[];
  const storyChips = data.storyChips as Array<{ value: string; label: string }>;
  const certs = data.certs as string[];
  const pillars = data.pillars as Array<{ title: string; text: string }>;
  return (
    <>
      <Card title="Hero Bölümü">
        <Field label="Etiket" value={data.heroChip as string} onChange={(v) => onUpdate(["hakkimizda", "heroChip"], v)} />
        <Field label="Başlık Satır 1" value={data.heroHeading1 as string} onChange={(v) => onUpdate(["hakkimizda", "heroHeading1"], v)} />
        <Field label="Başlık Satır 2" value={data.heroHeading2 as string} onChange={(v) => onUpdate(["hakkimizda", "heroHeading2"], v)} />
        <Field label="Alt Metin" value={data.heroSubtext as string} onChange={(v) => onUpdate(["hakkimizda", "heroSubtext"], v)} multiline rows={3} />
      </Card>
      <Card title="Hikayemiz">
        <Field label="Bölüm Başlığı" value={data.storyHeading as string} onChange={(v) => onUpdate(["hakkimizda", "storyHeading"], v)} />
        {storyParas.map((p, i) => (
          <Field key={i} label={`Paragraf ${i + 1}`} value={p} onChange={(v) => { const next = [...storyParas]; next[i] = v; onUpdate(["hakkimizda", "storyParas"], next); }} multiline rows={3} />
        ))}
        <Field label="Görsel Altyazı" value={data.storyCaption as string} onChange={(v) => onUpdate(["hakkimizda", "storyCaption"], v)} />
      </Card>
      <Card title="Hikaye İstatistik Kutuları">
        {storyChips.map((c, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.5rem" }}>
            <Field label={`Değer ${i + 1}`} value={c.value} onChange={(v) => { const next = [...storyChips]; next[i] = { ...next[i], value: v }; onUpdate(["hakkimizda", "storyChips"], next); }} />
            <Field label={`Etiket ${i + 1}`} value={c.label} onChange={(v) => { const next = [...storyChips]; next[i] = { ...next[i], label: v }; onUpdate(["hakkimizda", "storyChips"], next); }} />
          </div>
        ))}
      </Card>
      <Card title="Sertifikalar">
        <Field label="Bölüm Başlığı" value={data.certsHeading as string} onChange={(v) => onUpdate(["hakkimizda", "certsHeading"], v)} />
        <ListField label="Sertifika Listesi" items={certs} onChange={(v) => onUpdate(["hakkimizda", "certs"], v)} />
        <Field label="Açıklama Metni" value={data.certsBody as string} onChange={(v) => onUpdate(["hakkimizda", "certsBody"], v)} multiline rows={3} />
      </Card>
      <Card title="Misyon / Vizyon / Değerler">
        {pillars.map((p, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "1rem", marginBottom: "0.75rem" }}>
            <Field label="Başlık" value={p.title} onChange={(v) => { const next = [...pillars]; next[i] = { ...next[i], title: v }; onUpdate(["hakkimizda", "pillars"], next); }} />
            <Field label="Metin" value={p.text} onChange={(v) => { const next = [...pillars]; next[i] = { ...next[i], text: v }; onUpdate(["hakkimizda", "pillars"], next); }} multiline rows={4} />
          </div>
        ))}
      </Card>
    </>
  );
}
