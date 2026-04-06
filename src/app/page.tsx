"use client";

import { useEffect, useState } from "react";

// ─── EDITABLE DATA ────────────────────────────────────────────────────────────
const AUTHOR = {
  initials: "DB",
  startYear: "2019",
  lat: "",
  lon: "",
};

const SAMPLES = [
  {
    id: "DB-001",
    unit: "luz disponible",
    lithology:
      "Material de baja cohesión. Alta sensibilidad a condiciones de iluminación ambiente. Textura variable. Granulometría fina a media.",
    observation: "depende de lo que ya estaba ahí antes de llegar",
    status: "abierto",
  },
  {
    id: "DB-002",
    unit: "interiores",
    lithology:
      "Unidad de alta presión confinante. Estructuras de compresión visibles. Escasa movilidad de fluidos.",
    observation: "el espacio como agente, no como escenario",
    status: "abierto",
  },
  {
    id: "DB-003",
    unit: "tránsito",
    lithology:
      "Superficie de transporte activo. Inconformidad basal con unidad subyacente. Evidencia de erosión lateral.",
    observation: "nada permanece lo suficiente como para ser estudiado in situ",
    status: "abierto",
  },
  {
    id: "DB-004",
    unit: "figuras",
    lithology:
      "Remanente erosional. Resistencia diferencial respecto a la matriz. Morfología preservada por contraste litológico.",
    observation: "lo que sobrevive al corte define la forma",
    status: "abierto",
  },
  {
    id: "DB-005",
    unit: "horizonte",
    lithology:
      "Superficie de contacto entre formaciones. Discontinuidad composicional marcada. Plano de referencia.",
    observation: "la línea no es el límite — es el argumento",
    status: "abierto",
  },
  {
    id: "DB-006",
    unit: "[sin clasificar]",
    lithology:
      "Litología indeterminada. Muestra en proceso de descripción. No incluir en interpretación preliminar.",
    observation: "—",
    status: "pendiente",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const mono: React.CSSProperties = { fontFamily: "var(--font-mono)" };
const serif: React.CSSProperties = { fontFamily: "var(--font-serif)", fontStyle: "italic" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p style={{
        ...mono,
        fontSize: 7,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--text-faint)",
        marginBottom: "0.5rem",
      }}>
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

// ─── HISTOGRAM (scatter map) ──────────────────────────────────────────────────
function Histogram() {
  const [cells, setCells] = useState<number[]>([]);

  useEffect(() => {
    const total = 20 * 8;
    const active = Math.floor(total * 0.38);
    const arr: number[] = Array.from({ length: total }, (_, i) => (i < active ? 1 : 0));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setCells(arr);
  }, []);

  return (
    <div style={{ marginBottom: "3rem" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(20, 1fr)",
        gap: 2,
        marginBottom: "0.75rem",
      }}>
        {cells.map((v, i) => (
          <div key={i} style={{
            height: 14,
            background: v ? "rgba(140,200,150,0.12)" : "rgba(140,200,150,0.03)",
            border: `0.5px solid ${v ? "rgba(140,200,150,0.30)" : "rgba(140,200,150,0.09)"}`,
            position: "relative",
          }}>
            {v === 1 && (
              <div style={{
                position: "absolute",
                inset: 3,
                border: "0.5px solid rgba(140,200,150,0.20)",
              }} />
            )}
          </div>
        ))}
      </div>
      <p style={{
        ...mono,
        fontSize: 8,
        letterSpacing: "0.12em",
        color: "var(--text-faint)",
      }}>
        ■ exposición registrada &nbsp;&nbsp; □ sin registro &nbsp;&nbsp; n total: variable &nbsp;&nbsp; intervalo: no uniforme
      </p>
    </div>
  );
}

// ─── SAMPLE STATUS BADGE ──────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isPending = status === "pendiente";
  return (
    <span style={{
      ...mono,
      display: "inline-block",
      fontSize: 7,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: isPending ? "rgba(80,160,100,0.18)" : "var(--text-dim)",
      border: `0.5px ${isPending ? "dashed" : "solid"} ${isPending ? "rgba(140,200,150,0.18)" : "rgba(140,200,150,0.40)"}`,
      padding: "0.15rem 0.4rem",
    }}>
      {status}
    </span>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function FieldReport() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const delays = [0, 60, 120, 180, 240, 300, 360];

  return (
    <div className="root">
      <div className="grid-bg" />
      <div className="container">

        {/* ── BLOQUE 0 — Encabezado del informe ── */}
        <div className="fade-in" style={{ animationDelay: `${delays[0]}ms`, marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem" }}>

            {/* Left: report header */}
            <div style={{ ...mono, fontSize: 8, letterSpacing: "0.2em", color: "var(--text-faint)", lineHeight: 2.2, textTransform: "uppercase" }}>
              <div>INFORME TÉCNICO DE CAMPO</div>
              <div>Proyecto: DB_archives_v2</div>
              <div>Operador: {AUTHOR.initials}</div>
              <div>Fecha inicio: {AUTHOR.startYear}</div>
              <div>Estado: EN PROCESO — NO ESCALAR</div>
            </div>

            {/* Right: coordinates block */}
            <div style={{ ...mono, fontSize: 8, letterSpacing: "0.2em", color: "var(--text-faint)", lineHeight: 2.2, textTransform: "uppercase", textAlign: "right", flexShrink: 0 }}>
              <div>LAT: {AUTHOR.lat || "—"}</div>
              <div>LON: {AUTHOR.lon || "—"}</div>
              <div>DATUM: WGS-84</div>
              <div>HOJA: IGM — sin número asignado</div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <DoubleLine />
          </div>
        </div>

        {/* ── BLOQUE 1 — Resumen ejecutivo ── */}
        <div className="fade-in" style={{ animationDelay: `${delays[1]}ms`, marginBottom: "2.5rem" }}>
          <p style={{
            ...mono,
            fontSize: 10,
            color: "var(--text-dim)",
            lineHeight: 2,
            marginBottom: "1rem",
          }}>
            El presente informe documenta el registro visual acumulado durante campañas de observación de campo en múltiples formaciones y contextos. Las muestras han sido clasificadas por afinidad composicional, no por orden cronológico de extracción.
          </p>
          <p style={{
            ...serif,
            fontSize: 13,
            color: "rgba(180,210,160,0.50)",
            lineHeight: 1.7,
            marginBottom: "1.5rem",
          }}>
            lo que se registra aquí no es el paisaje.<br />
            es la presión que lo formó.
          </p>
          <div style={{ width: "100%", height: "0.5px", background: "var(--line)" }} />
        </div>

        {/* ── BLOQUE 2 — Tabla de muestras ── */}
        <div className="fade-in" style={{ animationDelay: `${delays[2]}ms`, marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ ...mono, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.3rem" }}>
              REGISTRO DE MUESTRAS — CAMPAÑA DB_v2
            </p>
            <p style={{ ...mono, fontSize: 8, color: "var(--text-faint)", letterSpacing: "0.1em" }}>
              n = 6 unidades clasificadas &nbsp;|&nbsp; método: observación directa &nbsp;|&nbsp; clasificación: composicional
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="samples-table">
              <thead>
                <tr>
                  <th style={{ width: "7rem" }}>N° Muestra</th>
                  <th style={{ width: "7rem" }}>Unidad</th>
                  <th>Descripción litológica</th>
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
                    <td style={{ ...mono, fontSize: 9, textTransform: "uppercase", color: "var(--text-dim)", letterSpacing: "0.08em" }}>
                      {s.unit}
                    </td>
                    <td style={{ ...mono, fontSize: 9, color: "var(--text-muted)", lineHeight: 1.8 }}>
                      {s.lithology}
                    </td>
                    <td style={{ minWidth: "12rem" }}>
                      {s.observation !== "—" ? (
                        <em style={{ ...serif, fontSize: 12, color: "#9ec49a" }}>
                          {s.observation}
                        </em>
                      ) : (
                        <span style={{ ...mono, fontSize: 9, color: "var(--text-faint)" }}>—</span>
                      )}
                    </td>
                    <td>
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── BLOQUE 3 — Metodología ── */}
        <div className="fade-in" style={{ animationDelay: `${delays[3]}ms`, marginBottom: "3rem" }}>
          <SectionLabel>METODOLOGÍA Y CONDICIONES DE CAMPAÑA</SectionLabel>
          <div className="method-grid">
            {[
              {
                title: "Equipamiento",
                items: [
                  ["Instrumento", "sin especificar"],
                  ["Resolución", "variable"],
                  ["Condiciones", "disponibles"],
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
                <p style={{ ...mono, fontSize: 7, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: "0.75rem" }}>
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

        {/* ── BLOQUE 4 — Histograma ── */}
        <div className="fade-in" style={{ animationDelay: `${delays[4]}ms`, marginBottom: "3rem" }}>
          <SectionLabel>DISTRIBUCIÓN DE EXPOSICIONES — HISTOGRAMA ACUMULADO</SectionLabel>
          {mounted && <Histogram />}
        </div>

        {/* ── BLOQUE 5 — Conclusiones preliminares ── */}
        <div className="fade-in" style={{ animationDelay: `${delays[5]}ms`, marginBottom: "3rem" }}>
          <SectionLabel>CONCLUSIONES PRELIMINARES — SUJETO A REVISIÓN</SectionLabel>

          {[
            {
              num: "01.",
              text: "Las unidades clasificadas no representan la totalidad del registro. La presente documentación refleja el estado parcial de la campaña.",
              italic: false,
            },
            {
              num: "02.",
              text: "La relación entre unidades es composicional, no estratigráfica. El orden de presentación no implica jerarquía ni secuencia temporal.",
              italic: false,
            },
            {
              num: "03.",
              text: "el archivo no está terminado.\nnunca lo estará. esa es la condición de trabajo.",
              italic: true,
            },
          ].map((item) => (
            <div key={item.num} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem" }}>
              <span style={{ ...mono, fontSize: 9, color: "var(--text-faint)", flexShrink: 0, paddingTop: item.italic ? 2 : 0 }}>
                {item.num}
              </span>
              {item.italic ? (
                <em style={{ ...serif, fontSize: 13, color: "var(--accent-green)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                  {item.text}
                </em>
              ) : (
                <p style={{ ...mono, fontSize: 9, color: "var(--text-muted)", lineHeight: 2 }}>
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── BLOQUE 6 — Pie de informe ── */}
        <div className="fade-in" style={{ animationDelay: `${delays[6]}ms` }}>
          <DoubleLine />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>

            {/* Left */}
            <div style={{ ...mono, fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)", lineHeight: 2.2 }}>
              <div style={{ fontWeight: 700, fontSize: 8, color: "var(--text-muted)", marginBottom: "0.1rem" }}>DB_archives_v2</div>
              <div>Operador de campo: {AUTHOR.initials}</div>
              <div>Revisión: v∞ — sin fecha de cierre</div>
            </div>

            {/* Center */}
            <div style={{ ...mono, fontSize: 7, letterSpacing: "0.1em", color: "var(--text-faint)", lineHeight: 2.2, textAlign: "center" }}>
              <div>Este documento es de carácter preliminar.</div>
              <div>No reproducir sin autorización del operador.</div>
              <div>Clasificación: uso interno.</div>
            </div>

            {/* Right — technical stamp boxes */}
            <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>
              {[["ESCALA", "1:∞"], ["HOJA", "1 / ∞"], ["ESTADO", "activo"]].map(([label, val]) => (
                <div key={label} style={{
                  border: "0.5px solid rgba(80,160,100,0.12)",
                  padding: "0.4rem 0.75rem",
                  textAlign: "center",
                }}>
                  <div style={{ ...mono, fontSize: 7, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)" }}>
                    {label}
                  </div>
                  <div style={{ ...mono, fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 2 }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
