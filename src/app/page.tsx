"use client";

import { useEffect, useState, useCallback } from "react";

// ─── EDITABLE DATA ─────────────────────────────────────────────────────────────
const AUTHOR = {
  initials: "DB",
  startYear: "2026",
  lat: "-33.4569° S",
  lon: "-70.6483° O",
};

const SAMPLES = [
  {
    id: "DB-001", unit: "luz disponible",
    lithology: "Material de baja cohesión. Alta sensibilidad a condiciones de iluminación ambiente. Textura variable. Granulometría fina a media.",
    observation: "depende de lo que ya estaba ahí antes de llegar", status: "abierto",
  },
  {
    id: "DB-002", unit: "interiores",
    lithology: "Unidad de alta presión confinante. Estructuras de compresión visibles. Escasa movilidad de fluidos.",
    observation: "el espacio como agente, no como escenario", status: "abierto",
  },
  {
    id: "DB-003", unit: "tránsito",
    lithology: "Superficie de transporte activo. Inconformidad basal con unidad subyacente. Evidencia de erosión lateral.",
    observation: "nada permanece lo suficiente como para ser estudiado in situ", status: "abierto",
  },
  {
    id: "DB-004", unit: "figuras",
    lithology: "Remanente erosional. Resistencia diferencial respecto a la matriz. Morfología preservada por contraste litológico.",
    observation: "lo que sobrevive al corte define la forma", status: "abierto",
  },
  {
    id: "DB-005", unit: "horizonte",
    lithology: "Superficie de contacto entre formaciones. Discontinuidad composicional marcada. Plano de referencia.",
    observation: "la línea no es el límite — es el argumento", status: "abierto",
  },
  {
    id: "DB-006", unit: "[sin clasificar]",
    lithology: "Litología indeterminada. Muestra en proceso de descripción. No incluir en interpretación preliminar.",
    observation: "—", status: "pendiente",
  },
];

// ─── COLLECTIONS ────────────────────────────────────────────────────────────────
const COLLECTIONS: Record<string, { images: string[] }> = {
  "DB-001": { images: [] },
  "DB-002": { images: [] },
  "DB-003": { images: [] },
  "DB-004": { images: [] },
  "DB-005": { images: [] },
  "DB-006": { images: [] },
};

// ─── WEEKLY ACTIVITY ───────────────────────────────────────────────────────────
const ACTIVE_WEEKS: number[] = [
  0, 0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0, 0,
  1, 0, 0, 0,
  0, 0,
];

const WEEKS_2026 = [
  { w: "W01", m: "ENE", ms: true  }, { w: "W02", m: "ENE", ms: false },
  { w: "W03", m: "ENE", ms: false }, { w: "W04", m: "ENE", ms: false },
  { w: "W05", m: "ENE", ms: false }, { w: "W06", m: "FEB", ms: true  },
  { w: "W07", m: "FEB", ms: false }, { w: "W08", m: "FEB", ms: false },
  { w: "W09", m: "FEB", ms: false }, { w: "W10", m: "MAR", ms: true  },
  { w: "W11", m: "MAR", ms: false }, { w: "W12", m: "MAR", ms: false },
  { w: "W13", m: "MAR", ms: false }, { w: "W14", m: "MAR", ms: false },
  { w: "W15", m: "ABR", ms: true  }, { w: "W16", m: "ABR", ms: false },
  { w: "W17", m: "ABR", ms: false }, { w: "W18", m: "ABR", ms: false },
  { w: "W19", m: "MAY", ms: true  }, { w: "W20", m: "MAY", ms: false },
];

// ─── STYLE HELPERS ─────────────────────────────────────────────────────────────
const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif)", fontStyle: "italic" };

// ─── BLINKING DOTS ─────────────────────────────────────────────────────────────
function BlinkingDots() {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const iv = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 450);
    return () => clearInterval(iv);
  }, []);
  return <span style={{ letterSpacing: "0.05em" }}>{dots}</span>;
}

// ─── PYRITE LOGO — cubic habit crystal cluster ────────────────────────────────
// 3 isometric cubes (pyrite habit) + rocky matrix base, simplified line art
function MineralLogo({ size = 80, opacity = 0.82 }: { size?: number; opacity?: number }) {
  const s = (v: number) => `rgba(140,200,150,${v})`;
  return (
    <div className="mineral-logo-wrap" style={{ opacity }}>
      <svg viewBox="0 0 64 88" width={size} aria-hidden fill="none"
        strokeLinecap="round" strokeLinejoin="round">

        {/* ══ CUBE 1 — main, largest ══════════════════════════════════════════ */}
        {/* Top face (rhombus) */}
        <polygon points="30,11  42,18  30,25  18,18"
          stroke={s(0.68)} strokeWidth="0.75" fill={s(0.07)}/>
        {/* Left face */}
        <polygon points="18,18  30,25  30,39  18,32"
          stroke={s(0.52)} strokeWidth="0.75" fill={s(0.025)}/>
        {/* Right face */}
        <polygon points="30,25  42,18  42,32  30,39"
          stroke={s(0.58)} strokeWidth="0.75" fill={s(0.05)}/>

        {/* ══ CUBE 2 — upper right, medium ═══════════════════════════════════ */}
        <polygon points="41,14  49,18.5  41,23  33,18.5"
          stroke={s(0.62)} strokeWidth="0.70" fill={s(0.07)}/>
        <polygon points="33,18.5  41,23  41,32  33,27.5"
          stroke={s(0.46)} strokeWidth="0.70" fill={s(0.02)}/>
        <polygon points="41,23  49,18.5  49,27.5  41,32"
          stroke={s(0.52)} strokeWidth="0.70" fill={s(0.045)}/>

        {/* ══ CUBE 3 — lower left, small ══════════════════════════════════════ */}
        <polygon points="20,31  26,34.5  20,38  14,34.5"
          stroke={s(0.56)} strokeWidth="0.65" fill={s(0.06)}/>
        <polygon points="14,34.5  20,38  20,45  14,41.5"
          stroke={s(0.42)} strokeWidth="0.65" fill={s(0.02)}/>
        <polygon points="20,38  26,34.5  26,41.5  20,45"
          stroke={s(0.48)} strokeWidth="0.65" fill={s(0.04)}/>

        {/* ══ ROCK MATRIX BASE ════════════════════════════════════════════════ */}
        {/* Main irregular rock mass */}
        <path
          d="M 7,48 L 13,51 L 11,58 L 16,62 L 26,65 L 38,63 L 48,66 L 55,59 L 52,51 L 44,47 L 32,49 L 18,47 Z"
          stroke={s(0.42)} strokeWidth="0.70" fill={s(0.035)}/>
        {/* Rock fracture / cleavage detail lines */}
        <line x1="13" y1="51" x2="20" y2="48" stroke={s(0.20)} strokeWidth="0.4"/>
        <line x1="16" y1="62" x2="22" y2="58" stroke={s(0.16)} strokeWidth="0.4"/>
        <line x1="38" y1="63" x2="42" y2="57" stroke={s(0.16)} strokeWidth="0.4"/>
        <line x1="48" y1="66" x2="52" y2="60" stroke={s(0.14)} strokeWidth="0.4"/>

        {/* ══ LABEL ══════════════════════════════════════════════════════════ */}
        <text x="32" y="79" fontFamily="var(--font-mono)" fontSize="5.2"
          fill={s(0.45)} textAnchor="middle" letterSpacing="0.14em">
          DB_archives
        </text>
      </svg>
    </div>
  );
}

// ─── PYRITE LOGO SMALL — inline, next to title ────────────────────────────────
function MineralLogoSmall() {
  const s = (v: number) => `rgba(140,200,150,${v})`;
  return (
    <svg viewBox="0 0 32 38" width={13} height={16} aria-hidden fill="none"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ verticalAlign: "middle", display: "inline-block", marginRight: 5, flexShrink: 0 }}>

      {/* Main cube */}
      <polygon points="16,3  23,7  16,11  9,7"
        stroke={s(0.72)} strokeWidth="1.1" fill={s(0.07)}/>
      <polygon points="9,7  16,11  16,19  9,15"
        stroke={s(0.54)} strokeWidth="1.1" fill={s(0.02)}/>
      <polygon points="16,11  23,7  23,15  16,19"
        stroke={s(0.62)} strokeWidth="1.1" fill={s(0.05)}/>

      {/* Small cube attached upper-right */}
      <polygon points="23,5  28,8  23,11  18,8"
        stroke={s(0.60)} strokeWidth="0.9" fill={s(0.06)}/>
      <polygon points="23,11  28,8  28,14  23,17"
        stroke={s(0.50)} strokeWidth="0.9" fill={s(0.04)}/>

      {/* Rock base */}
      <path d="M 4,22 L 8,25 L 7,30 L 16,32 L 26,29 L 28,23 L 20,21 L 10,21 Z"
        stroke={s(0.45)} strokeWidth="0.9" fill={s(0.03)}/>
      {/* Fracture line */}
      <line x1="8" y1="25" x2="12" y2="22" stroke={s(0.20)} strokeWidth="0.5"/>
    </svg>
  );
}


// ─── SECTION LABEL ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p style={{ ...mono, fontSize: 7, letterSpacing: "0.3em", textTransform: "uppercase",
        color: "var(--text-faint)", marginBottom: "0.5rem" }}>
        {children}
      </p>
      <div style={{ width: "100%", height: "0.5px", background: "var(--line)", marginBottom: "1.5rem" }} />
    </>
  );
}

function DoubleLine() {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ width: "100%", height: "0.5px", background: "var(--line)", marginBottom: 3 }} />
      <div style={{ width: "100%", height: "0.5px", background: "var(--line)" }} />
    </div>
  );
}

// ─── WEEKLY HISTOGRAM ──────────────────────────────────────────────────────────
function WeekHistogram() {
  const rows = 8;
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(20,1fr)", gap: 2, marginBottom: 2 }}>
        {WEEKS_2026.map((w, i) => (
          <div key={i} style={{ ...mono, fontSize: 6, color: w.ms ? "var(--text-muted)" : "transparent",
            borderLeft: w.ms ? "0.5px solid rgba(140,200,150,0.25)" : "none",
            paddingLeft: 2, overflow: "hidden" }}>
            {w.m}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(20,1fr)", gap: 2, marginBottom: 3 }}>
        {WEEKS_2026.map((w, i) => (
          <div key={i} style={{ ...mono, fontSize: 5, color: "var(--text-faint)",
            textAlign: "center", overflow: "hidden", letterSpacing: "0.02em" }}>
            {w.w}
          </div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: "grid", gridTemplateColumns: "repeat(20,1fr)", gap: 2, marginBottom: 2 }}>
          {WEEKS_2026.map((_, c) => {
            const active = ACTIVE_WEEKS[c];
            return (
              <div key={c} style={{
                height: 12,
                background: active ? "rgba(140,200,150,0.12)" : "rgba(140,200,150,0.03)",
                border: `0.5px solid ${active ? "rgba(140,200,150,0.30)" : "rgba(140,200,150,0.09)"}`,
                position: "relative",
              }}>
                {active === 1 && (
                  <div style={{ position: "absolute", inset: 2,
                    border: "0.5px solid rgba(140,200,150,0.20)" }} />
                )}
              </div>
            );
          })}
        </div>
      ))}
      <p style={{ ...mono, fontSize: 7, letterSpacing: "0.12em", color: "var(--text-faint)", marginTop: "0.5rem" }}>
        ■ exposición registrada &nbsp;&nbsp; □ sin registro
      </p>
    </div>
  );
}

// ─── STATUS BADGE ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const p = status === "pendiente";
  return (
    <span style={{ ...mono, display: "inline-block", fontSize: 7, letterSpacing: "0.15em",
      textTransform: "uppercase", color: p ? "var(--text-faint)" : "var(--text-dim)",
      border: `0.5px ${p ? "dashed" : "solid"} ${p ? "rgba(140,200,150,0.18)" : "rgba(140,200,150,0.40)"}`,
      padding: "0.15rem 0.4rem" }}>
      {status}
    </span>
  );
}

// ─── EMPTY COLLECTION PLACEHOLDER ──────────────────────────────────────────────
function EmptyCollection({ sampleId }: { sampleId: string }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "40vh", gap: "1.5rem", padding: "3rem 1rem",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, opacity: 0.25 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{ width: 48, height: 48,
            border: "0.5px solid rgba(140,200,150,0.40)",
            background: "rgba(140,200,150,0.03)" }} />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ ...mono, fontSize: 9, letterSpacing: "0.15em", color: "var(--text-faint)",
          textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Colección vacía — {sampleId}
        </p>
        <p style={{ ...mono, fontSize: 8, color: "var(--text-faint)", letterSpacing: "0.08em" }}>
          Agrega imágenes en{" "}
          <span style={{ color: "var(--text-dim)" }}>/public/collections/{sampleId}/</span>
        </p>
        <p style={{ ...mono, fontSize: 8, color: "var(--text-faint)", marginTop: "0.35rem", letterSpacing: "0.05em" }}>
          y registra los nombres en <span style={{ color: "var(--text-dim)" }}>COLLECTIONS</span> en page.tsx
        </p>
      </div>
    </div>
  );
}

// ─── LIGHTBOX ──────────────────────────────────────────────────────────────────
function Lightbox({ images, index, sampleId, onClose, onPrev, onNext }: {
  images: string[]; index: number; sampleId: string;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const src = `/collections/${sampleId}/${images[index]}`;
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-counter" onClick={e => e.stopPropagation()}>
        <span style={{ ...mono, fontSize: 8, color: "var(--text-faint)", letterSpacing: "0.15em" }}>
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
      {hasPrev && (
        <button className="lightbox-nav lightbox-nav--prev"
          onClick={e => { e.stopPropagation(); onPrev(); }} aria-label="Anterior">←</button>
      )}
      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`${sampleId} — ${images[index]}`} className="lightbox-img" />
        <p style={{ ...mono, fontSize: 7, color: "var(--text-faint)", marginTop: "0.75rem",
          letterSpacing: "0.12em", textAlign: "center" }}>
          {images[index]}
        </p>
      </div>
      {hasNext && (
        <button className="lightbox-nav lightbox-nav--next"
          onClick={e => { e.stopPropagation(); onNext(); }} aria-label="Siguiente">→</button>
      )}
      <div className="lightbox-close-hint">
        <span style={{ ...mono, fontSize: 7, color: "var(--text-faint)", letterSpacing: "0.15em" }}>
          ESC — CERRAR &nbsp;|&nbsp; ← → NAVEGAR
        </span>
      </div>
    </div>
  );
}

// ─── COLLECTION VIEW ───────────────────────────────────────────────────────────
function CollectionView({ sample, onBack }: { sample: typeof SAMPLES[0]; onBack: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = COLLECTIONS[sample.id]?.images ?? [];

  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = useCallback(() =>
    setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextImage = useCallback(() =>
    setLightboxIndex(i => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);

  return (
    <div className="root">
      <div className="grid-bg" />
      <div className="container collection-container">

        <div className="collection-header fade-in">
          <button className="back-btn" onClick={onBack}>← VOLVER AL INFORME</button>
          <div style={{ marginTop: "1.5rem" }}><DoubleLine /></div>

          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <div>
              <p style={{ ...mono, fontSize: 7, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.35rem" }}>
                COLECCIÓN — {sample.id}
              </p>
              <h1 style={{ ...mono, fontSize: 14, letterSpacing: "0.15em",
                textTransform: "uppercase", color: "var(--text-dim)", fontWeight: 700 }}>
                {sample.unit}
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ ...mono, fontSize: 7, color: "var(--text-faint)", letterSpacing: "0.12em" }}>
                N° DE REGISTROS: {images.length}
              </p>
              <p style={{ ...mono, fontSize: 7, color: "var(--text-faint)", letterSpacing: "0.12em" }}>
                ESTADO: <span style={{ color: "var(--text-dim)", textTransform: "uppercase" }}>{sample.status}</span>
              </p>
            </div>
          </div>

          {sample.observation !== "—" && (
            <em style={{ ...serif, fontSize: 12, color: "#9ec49a", display: "block", marginBottom: "0.5rem" }}>
              {sample.observation}
            </em>
          )}
          <div style={{ width: "100%", height: "0.5px", background: "var(--line)", marginBottom: "2rem" }} />
        </div>

        {images.length === 0
          ? <EmptyCollection sampleId={sample.id} />
          : (
            <div className="photo-grid">
              {images.map((img, i) => (
                <button key={img} className="photo-thumb"
                  onClick={() => setLightboxIndex(i)} aria-label={`Ver foto ${i + 1}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/collections/${sample.id}/${img}`}
                    alt={`${sample.id} — ${img}`} className="photo-thumb-img" loading="lazy" />
                  <div className="photo-thumb-overlay">
                    <span style={{ ...mono, fontSize: 7, color: "rgba(140,200,150,0.80)", letterSpacing: "0.12em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

        <div style={{ marginTop: "3rem" }}>
          <DoubleLine />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ ...mono, fontSize: 7, color: "var(--text-faint)", letterSpacing: "0.2em" }}>
              DB_ARCHIVES_V2 — {sample.id}
            </span>
            <button className="back-btn" onClick={onBack}>← VOLVER AL INFORME</button>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} sampleId={sample.id}
          onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function FieldReport() {
  const [mounted, setMounted] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  useEffect(() => { setMounted(true); }, []);
  const D = [0, 60, 120, 180, 240, 300, 360];

  const activeSample = SAMPLES.find(s => s.id === activeCollection) ?? null;
  if (activeSample) {
    return <CollectionView sample={activeSample} onBack={() => setActiveCollection(null)} />;
  }

  return (
    <div className="root">
      <div className="grid-bg" />
      <div className="container">

        {/* ── BLOQUE 0 — Encabezado ── */}
        <div className="fade-in" style={{ animationDelay: `${D[0]}ms`, marginBottom: "2.5rem" }}>

          {/* Mobile: logo centrado arriba */}
          <div className="header-mineral-mobile">
            <MineralLogo size={64} opacity={0.50} />
          </div>

          <div className="header-grid">
            {/* Left */}
            <div style={{ ...mono, fontSize: 8, letterSpacing: "0.18em",
              color: "var(--text-faint)", lineHeight: 2.1, textTransform: "uppercase" }}>
              <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "0.1rem",
                display: "flex", alignItems: "center", gap: 4 }}>
                <MineralLogoSmall />
                DB_ARCHIVES_V2
              </div>
              <div>Proyecto: DB_archives_v2</div>
              <div>Operador: {AUTHOR.initials}</div>
              <div>Fecha inicio: {AUTHOR.startYear}</div>
              <div>Estado: EN PROCESO <BlinkingDots /></div>
            </div>

            {/* Center logo — desktop only */}
            <div className="header-mineral-center">
              <MineralLogo size={88} opacity={0.75} />
            </div>

            {/* Right */}
            <div style={{ ...mono, fontSize: 8, letterSpacing: "0.18em", color: "var(--text-faint)",
              lineHeight: 2.1, textTransform: "uppercase", textAlign: "right" }}>
              <div>LAT: {AUTHOR.lat}</div>
              <div>LON: {AUTHOR.lon}</div>
              <div>DATUM: WGS-84</div>
              <div className="header-hoja">HOJA: IGM — sin número asignado aún.</div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}><DoubleLine /></div>
        </div>

        {/* ── BLOQUE 1 — Resumen ejecutivo ── */}
        <div className="fade-in" style={{ animationDelay: `${D[1]}ms`, marginBottom: "2.5rem" }}>
          <p style={{ ...mono, fontSize: 10, color: "var(--text-dim)", lineHeight: 2, marginBottom: "1rem" }}>
            El presente informe documenta el registro visual acumulado durante campañas de observación
            en campo de múltiples visitas y contextos. Las muestras han sido clasificadas por afinidad
            composicional, no por orden cronológico de extracción.
          </p>
          <p style={{ ...serif, fontSize: 13, color: "#9ec49a", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Donde sea que vas, Sigue la luz.
          </p>
          <div style={{ width: "100%", height: "0.5px", background: "var(--line)" }} />
        </div>

        {/* ── BLOQUE 2 — Tabla de muestras ── */}
        <div className="fade-in" style={{ animationDelay: `${D[2]}ms`, marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ ...mono, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--text-faint)", marginBottom: "0.3rem" }}>
              REGISTRO DE MUESTRAS — CAMPAÑA DB_v2
            </p>
            <p style={{ ...mono, fontSize: 8, color: "var(--text-faint)", letterSpacing: "0.1em" }}>
              n = {SAMPLES.length} unidades &nbsp;|&nbsp; método: Observación-Obturador &nbsp;|&nbsp; Raw_data
            </p>
            <p style={{ ...mono, fontSize: 7, color: "var(--text-faint)", letterSpacing: "0.08em",
              marginTop: "0.4rem", opacity: 0.7 }}>
              → Selecciona una muestra para acceder a su colección fotográfica
            </p>
          </div>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table className="samples-table">
              <thead>
                <tr>
                  <th style={{ width: "5.5rem", minWidth: "5rem" }}>N° Muestra</th>
                  <th style={{ width: "6.5rem", minWidth: "6rem" }}>Unidad</th>
                  <th style={{ minWidth: "12rem" }}>Descripción</th>
                  <th style={{ minWidth: "10rem" }}>Observaciones</th>
                  <th style={{ width: "5.5rem", minWidth: "5rem" }}>Estado</th>
                  <th style={{ width: "2rem" }}></th>
                </tr>
              </thead>
              <tbody>
                {SAMPLES.map((s) => (
                  <tr key={s.id} className="sample-row"
                    onClick={() => setActiveCollection(s.id)}
                    role="button" tabIndex={0}
                    aria-label={`Abrir colección ${s.id} — ${s.unit}`}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setActiveCollection(s.id); }}>
                    <td style={{ ...mono, fontSize: 9, color: "var(--text-dim)", fontWeight: 700 }}>{s.id}</td>
                    <td style={{ ...mono, fontSize: 9, textTransform: "uppercase",
                      color: "var(--text-dim)", letterSpacing: "0.08em" }}>{s.unit}</td>
                    <td style={{ ...mono, fontSize: 9, color: "var(--text-muted)", lineHeight: 1.8 }}>{s.lithology}</td>
                    <td>
                      {s.observation !== "—"
                        ? <em style={{ ...serif, fontSize: 12, color: "#9ec49a" }}>{s.observation}</em>
                        : <span style={{ ...mono, fontSize: 9, color: "var(--text-faint)" }}>—</span>
                      }
                    </td>
                    <td><StatusBadge status={s.status} /></td>
                    <td style={{ ...mono, fontSize: 10, color: "var(--text-faint)", textAlign: "center" }}>→</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── BLOQUE 3 — Metodología ── */}
        <div className="fade-in" style={{ animationDelay: `${D[3]}ms`, marginBottom: "3rem" }}>
          <SectionLabel>METODOLOGÍA Y CONDICIONES DE CAMPAÑA</SectionLabel>
          <div className="method-grid">
            {[
              {
                title: "Equipamiento",
                items: [
                  ["Instrumento", "Fujifilm XH-1 — 25mm · 35mm / FILM also"],
                  ["Resolución", "24.3 mpx"], ["Condiciones", "—"], ["Protocolo", "observación directa"],
                ],
              },
              {
                title: "Criterios de clasificación",
                items: [
                  ["Método", "afinidad composicional"],
                  ["Escala", "1:∞"], ["Datum vertical", "sensación"], ["Referencia", "ninguna externa"],
                ],
              },
              {
                title: "Limitaciones conocidas",
                items: [
                  ["Cobertura", "parcial"], ["Repetibilidad", "baja"],
                  ["Sesgo del operador", "confirmado"], ["Revisión externa", "no realizada"],
                ],
              },
            ].map((col) => (
              <div key={col.title} style={{ background: "var(--bg-surface)", padding: "1rem" }}>
                <p style={{ ...mono, fontSize: 7, letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "var(--text-faint)", marginBottom: "0.75rem" }}>{col.title}</p>
                {col.items.map(([k, v]) => (
                  <div key={k} style={{ ...mono, fontSize: 9, color: "var(--text-muted)", lineHeight: 2 }}>
                    <span style={{ color: "var(--text-faint)" }}>{k}:</span> {v}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── BLOQUE 4 — Histograma semanal ── */}
        <div className="fade-in" style={{ animationDelay: `${D[4]}ms`, marginBottom: "3rem" }}>
          <SectionLabel>DISTRIBUCIÓN DE EXPOSICIONES — HISTOGRAMA ACUMULADO</SectionLabel>
          {mounted && <WeekHistogram />}
        </div>

        {/* ── BLOQUE 5 — Conclusiones ── */}
        <div className="fade-in" style={{ animationDelay: `${D[5]}ms`, marginBottom: "3rem" }}>
          <SectionLabel>CONCLUSIONES PRELIMINARES — SUJETO A REVISIÓN</SectionLabel>
          {[
            { num: "01.", italic: false,
              text: "Las unidades clasificadas no representan la totalidad del registro. La presente documentación refleja el estado parcial de la imágen completa." },
            { num: "02.", italic: false,
              text: "La relación entre unidades es de carácter composicional. El orden de presentación no implica jerarquía ni secuencia temporal." },
            { num: "03.", italic: true,
              text: "el archivo no está terminado.\nnunca lo estará. esa es la condición que siempre perdurará." },
          ].map((item) => (
            <div key={item.num} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
              <span style={{ ...mono, fontSize: 9, color: "var(--text-faint)", flexShrink: 0, paddingTop: item.italic ? 2 : 0 }}>
                {item.num}
              </span>
              {item.italic
                ? <em style={{ ...serif, fontSize: 13, color: "#9ec49a", lineHeight: 1.8, whiteSpace: "pre-line" }}>{item.text}</em>
                : <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", lineHeight: 2 }}>{item.text}</p>
              }
            </div>
          ))}
        </div>

        {/* ── BLOQUE 6 — Pie de informe ── */}
        <div className="fade-in" style={{ animationDelay: `${D[6]}ms` }}>
          <DoubleLine />
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ ...mono, fontSize: 7, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--text-faint)", lineHeight: 2.2 }}>
              <div style={{ fontWeight: 700, fontSize: 8, color: "var(--text-muted)", marginBottom: "0.1rem" }}>
                DB_archives_v2
              </div>
              <div>Operador de campo: {AUTHOR.initials}</div>
              <div>Revisión: v∞ — sin fecha de cierre</div>
            </div>
            <div style={{ ...mono, fontSize: 7, letterSpacing: "0.1em",
              color: "var(--text-faint)", lineHeight: 2.2, textAlign: "center" }}>
              <div>Este documento es de carácter preliminar.</div>
              <div>No reproducir sin autorización del operador.</div>
              <div>Clasificación: uso interno.</div>
            </div>
            <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>
              {[["ESCALA","1:∞"],["HOJA","1 / ∞"],["ESTADO","activo"]].map(([l,v]) => (
                <div key={l} style={{ border: "0.5px solid rgba(140,200,150,0.12)",
                  padding: "0.4rem 0.75rem", textAlign: "center" }}>
                  <div style={{ ...mono, fontSize: 7, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "var(--text-faint)" }}>{l}</div>
                  <div style={{ ...mono, fontSize: 9, color: "var(--text-muted)",
                    letterSpacing: "0.1em", marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
