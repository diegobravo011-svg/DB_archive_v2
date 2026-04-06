"use client";

import { useEffect, useState } from "react";

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

// ─── WEEKLY ACTIVITY — 1 = semana con fotos, 0 = sin registro ──────────────────
// Índice 0 = W01 (5 ene 2026) ... Índice 19 = W20 (11 may 2026)
const ACTIVE_WEEKS: number[] = [
  0, 0, 0, 0, 0,   // W01–W05 ENE
  0, 0, 0, 0,      // W06–W09 FEB
  0, 0, 0, 0, 0,   // W10–W14 MAR
  1, 0, 0, 0,      // W15–W18 ABR
  0, 0,            // W19–W20 MAY
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

// ─── HDD LOGO SVG ──────────────────────────────────────────────────────────────
function HddLogo() {
  return (
    <div className="hdd-logo-wrap">
      <svg viewBox="0 0 100 90" width={88} aria-hidden>
        {/* Back casing */}
        <rect x="21" y="5" width="72" height="58" rx="5" fill="none"
          stroke="rgba(140,200,150,0.10)" strokeWidth="0.5" />
        {/* Mid casing */}
        <rect x="14" y="12" width="72" height="58" rx="5"
          fill="rgba(12,20,16,0.85)" stroke="rgba(140,200,150,0.22)" strokeWidth="0.5" />
        {/* Front casing */}
        <rect x="7" y="19" width="72" height="58" rx="5"
          fill="rgba(12,20,16,0.97)" stroke="rgba(140,200,150,0.55)" strokeWidth="0.5" />
        {/* Platter outer */}
        <circle cx="37" cy="48" r="20" fill="none"
          stroke="rgba(140,200,150,0.35)" strokeWidth="0.5" />
        {/* Data track dashed */}
        <circle cx="37" cy="48" r="16" fill="none"
          stroke="rgba(140,200,150,0.15)" strokeWidth="0.4" strokeDasharray="2 3" />
        {/* Platter inner */}
        <circle cx="37" cy="48" r="11" fill="none"
          stroke="rgba(140,200,150,0.22)" strokeWidth="0.5" />
        {/* Spindle */}
        <circle cx="37" cy="48" r="3.5" fill="rgba(140,200,150,0.25)" />
        {/* Read/write arm */}
        <line x1="37" y1="29" x2="70" y2="40"
          stroke="rgba(140,200,150,0.55)" strokeWidth="0.6" />
        <circle cx="70" cy="40" r="2.5" fill="none"
          stroke="rgba(140,200,150,0.55)" strokeWidth="0.5" />
        {/* Corner screws */}
        {[[14,26],[72,26],[14,70],[72,70]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="none"
            stroke="rgba(140,200,150,0.22)" strokeWidth="0.5" />
        ))}
        {/* Data ports */}
        <rect x="70" y="56" width="7" height="2.5" rx="0.5" fill="none"
          stroke="rgba(140,200,150,0.25)" strokeWidth="0.5" />
        <rect x="70" y="61" width="7" height="2.5" rx="0.5" fill="none"
          stroke="rgba(140,200,150,0.25)" strokeWidth="0.5" />
        {/* Label sticker */}
        <rect x="52" y="28" width="18" height="12" rx="1" fill="none"
          stroke="rgba(140,200,150,0.18)" strokeWidth="0.4" strokeDasharray="2 2" />
        {/* Text inside SVG */}
        <text x="43" y="83" fontFamily="var(--font-mono)" fontSize="7"
          fill="rgba(140,200,150,0.70)" textAnchor="middle" letterSpacing="0.08em">
          DB_archives_V2
        </text>
        <text x="43" y="91" fontFamily="var(--font-mono)" fontSize="5"
          fill="rgba(140,200,150,0.40)" textAnchor="middle" letterSpacing="0.06em">
          Diego Bravo Nilo
        </text>
      </svg>
    </div>
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
      {/* Month labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(20,1fr)", gap: 2, marginBottom: 2 }}>
        {WEEKS_2026.map((w, i) => (
          <div key={i} style={{ ...mono, fontSize: 6, color: w.ms ? "var(--text-muted)" : "transparent",
            borderLeft: w.ms ? "0.5px solid rgba(140,200,150,0.25)" : "none",
            paddingLeft: 2, overflow: "hidden" }}>
            {w.m}
          </div>
        ))}
      </div>
      {/* Week labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(20,1fr)", gap: 2, marginBottom: 3 }}>
        {WEEKS_2026.map((w, i) => (
          <div key={i} style={{ ...mono, fontSize: 5, color: "var(--text-faint)",
            textAlign: "center", overflow: "hidden", letterSpacing: "0.02em" }}>
            {w.w}
          </div>
        ))}
      </div>
      {/* Grid cells */}
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
        ■ exposición registrada &nbsp;&nbsp; □ sin registro &nbsp;&nbsp; n total: variable &nbsp;&nbsp; intervalo: semanal
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

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function FieldReport() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const D = [0, 60, 120, 180, 240, 300, 360];

  return (
    <div className="root">
      <div className="grid-bg" />
      <div className="container">

        {/* ── BLOQUE 0 — Encabezado ── */}
        <div className="fade-in" style={{ animationDelay: `${D[0]}ms`, marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", gap: "1.5rem", position: "relative" }}>

            {/* Left */}
            <div className="header-left" style={{ ...mono, fontSize: 8, letterSpacing: "0.2em",
              color: "var(--text-faint)", lineHeight: 2.2, textTransform: "uppercase" }}>
              <div style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "0.1rem" }}>
                DATOS EXTRAÍDOS DE DB_ARCHIVE_V2
              </div>
              <div>Proyecto: DB_archives_v2</div>
              <div>Operador: {AUTHOR.initials}</div>
              <div>Fecha inicio: {AUTHOR.startYear}</div>
              <div>Estado: EN PROCESO <BlinkingDots /></div>
            </div>

            {/* Center logo */}
            <HddLogo />

            {/* Right */}
            <div style={{ ...mono, fontSize: 8, letterSpacing: "0.2em", color: "var(--text-faint)",
              lineHeight: 2.2, textTransform: "uppercase", textAlign: "right", flexShrink: 0 }}>
              <div>LAT: {AUTHOR.lat}</div>
              <div>LON: {AUTHOR.lon}</div>
              <div>DATUM: WGS-84</div>
              <div>HOJA: IGM — sin número asignado aún.</div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <DoubleLine />
          </div>
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
              n = {SAMPLES.length} unidades clasificadas &nbsp;|&nbsp;
              método: Observación-Obturador-Procesamiento de las imágenes &nbsp;|&nbsp;
              clasificación: Raw_data
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="samples-table">
              <thead>
                <tr>
                  <th style={{ width: "6rem" }}>N° Muestra</th>
                  <th style={{ width: "7rem" }}>Unidad</th>
                  <th>Descripción</th>
                  <th>Observaciones de campo</th>
                  <th style={{ width: "6rem" }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLES.map((s) => (
                  <tr key={s.id}>
                    <td style={{ ...mono, fontSize: 9, color: "var(--text-dim)", fontWeight: 700 }}>
                      {s.id}
                    </td>
                    <td style={{ ...mono, fontSize: 9, textTransform: "uppercase",
                      color: "var(--text-dim)", letterSpacing: "0.08em" }}>
                      {s.unit}
                    </td>
                    <td style={{ ...mono, fontSize: 9, color: "var(--text-muted)", lineHeight: 1.8 }}>
                      {s.lithology}
                    </td>
                    <td style={{ minWidth: "10rem" }}>
                      {s.observation !== "—"
                        ? <em style={{ ...serif, fontSize: 12, color: "#9ec49a" }}>{s.observation}</em>
                        : <span style={{ ...mono, fontSize: 9, color: "var(--text-faint)" }}>—</span>
                      }
                    </td>
                    <td><StatusBadge status={s.status} /></td>
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
                  ["Resolución", "24.3 mpx"],
                  ["Condiciones", "—"],
                  ["Protocolo", "observación directa"],
                ],
              },
              {
                title: "Criterios de clasificación",
                items: [
                  ["Método", "afinidad composicional"],
                  ["Escala", "1:∞"],
                  ["Datum vertical", "sensación"],
                  ["Referencia", "ninguna externa"],
                ],
              },
              {
                title: "Limitaciones conocidas",
                items: [
                  ["Cobertura", "parcial"],
                  ["Repetibilidad", "baja"],
                  ["Sesgo del operador", "confirmado"],
                  ["Revisión externa", "no realizada"],
                ],
              },
            ].map((col) => (
              <div key={col.title} style={{ background: "var(--bg-surface)", padding: "1rem" }}>
                <p style={{ ...mono, fontSize: 7, letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "var(--text-faint)", marginBottom: "0.75rem" }}>
                  {col.title}
                </p>
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
            {
              num: "01.", italic: false,
              text: "Las unidades clasificadas no representan la totalidad del registro. La presente documentación refleja el estado parcial de la imágen completa.",
            },
            {
              num: "02.", italic: false,
              text: "La relación entre unidades es de carácter composicional. El orden de presentación no implica jerarquía ni secuencia temporal.",
            },
            {
              num: "03.", italic: true,
              text: "el archivo no está terminado.\nnunca lo estará. esa es la condición que siempre perdurará.",
            },
          ].map((item) => (
            <div key={item.num} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
              <span style={{ ...mono, fontSize: 9, color: "var(--text-faint)", flexShrink: 0, paddingTop: item.italic ? 2 : 0 }}>
                {item.num}
              </span>
              {item.italic
                ? <em style={{ ...serif, fontSize: 13, color: "#9ec49a", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                    {item.text}
                  </em>
                : <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", lineHeight: 2 }}>
                    {item.text}
                  </p>
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
