"use client";

import { useEffect, useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Collection {
  id: string;
  index: string;
  name: string;
  status: string;
  icon: "circle" | "rect" | "wave" | "concentric" | "horizon" | "void";
}

// ─── DATA — edit these with your real collections ─────────────────────────────
const COLLECTIONS: Collection[] = [
  { id: "a", index: "[ A ]", name: "luz disponible", status: "n frames — unresolved", icon: "circle" },
  { id: "b", index: "[ B ]", name: "interiores",     status: "n frames — unresolved", icon: "rect"   },
  { id: "c", index: "[ C ]", name: "tránsito",       status: "n frames — unresolved", icon: "wave"   },
  { id: "d", index: "[ D ]", name: "figuras",        status: "n frames — unresolved", icon: "concentric" },
  { id: "e", index: "[ E ]", name: "horizonte",      status: "n frames — unresolved", icon: "horizon" },
  { id: "f", index: "[ F ]", name: "— pending —",    status: "not yet named",         icon: "void"   },
];

const NOTES = [
  { italic: true,  text: "these are not photographs." },
  { italic: false, text: "these are the load-bearing walls of a visual practice." },
  { italic: false, text: "arranged by proximity of feeling, not by date." },
  { italic: false, text: "the captions are missing on purpose." },
  { italic: true,  text: "what you found is the structure, not the building." },
];

// ─── SVG FRAME ICONS ──────────────────────────────────────────────────────────
function FrameIcon({ type }: { type: Collection["icon"] }) {
  const base = "rgba(100,160,240,";
  switch (type) {
    case "circle":
      return (
        <svg viewBox="0 0 60 44" width={60} style={{ opacity: 0.4 }}>
          <circle cx={30} cy={22} r={10} fill="none" stroke={base + "0.6)"} strokeWidth={0.5} />
          <circle cx={30} cy={22} r={3}  fill={base + "0.3)"} />
          <line x1={20} y1={22} x2={40} y2={22} stroke={base + "0.3)"} strokeWidth={0.5} />
          <line x1={30} y1={12} x2={30} y2={32} stroke={base + "0.3)"} strokeWidth={0.5} />
        </svg>
      );
    case "rect":
      return (
        <svg viewBox="0 0 60 44" width={60} style={{ opacity: 0.4 }}>
          <rect x={15} y={10} width={30} height={24} fill="none" stroke={base + "0.6)"} strokeWidth={0.5} />
          <rect x={20} y={15} width={8}  height={8}  fill={base + "0.15)"} stroke={base + "0.4)"} strokeWidth={0.5} />
          <line x1={32} y1={17} x2={42} y2={17} stroke={base + "0.3)"} strokeWidth={0.5} />
          <line x1={32} y1={21} x2={38} y2={21} stroke={base + "0.3)"} strokeWidth={0.5} />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 60 44" width={60} style={{ opacity: 0.4 }}>
          <path d="M10,34 Q20,10 30,22 Q40,34 50,14" fill="none" stroke={base + "0.6)"} strokeWidth={0.5} />
          <circle cx={10} cy={34} r={1.5} fill={base + "0.4)"} />
          <circle cx={30} cy={22} r={1.5} fill={base + "0.4)"} />
          <circle cx={50} cy={14} r={1.5} fill={base + "0.4)"} />
        </svg>
      );
    case "concentric":
      return (
        <svg viewBox="0 0 60 44" width={60} style={{ opacity: 0.4 }}>
          <circle cx={30} cy={22} r={14} fill="none" stroke={base + "0.3)"} strokeWidth={0.5} strokeDasharray="2 3" />
          <circle cx={30} cy={22} r={7}  fill="none" stroke={base + "0.5)"} strokeWidth={0.5} />
          <circle cx={30} cy={22} r={2}  fill={base + "0.3)"} />
        </svg>
      );
    case "horizon":
      return (
        <svg viewBox="0 0 60 44" width={60} style={{ opacity: 0.4 }}>
          <line x1={10} y1={22} x2={50} y2={22} stroke={base + "0.4)"} strokeWidth={0.5} />
          <line x1={10} y1={15} x2={50} y2={15} stroke={base + "0.2)"} strokeWidth={0.5} />
          <line x1={10} y1={29} x2={50} y2={29} stroke={base + "0.2)"} strokeWidth={0.5} />
          <rect x={22} y={17} width={16} height={10} fill={base + "0.08)"} stroke={base + "0.5)"} strokeWidth={0.5} />
        </svg>
      );
    case "void":
    default:
      return (
        <span style={{
          fontSize: 8,
          letterSpacing: "0.2em",
          color: "rgba(100,160,240,0.15)",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
        }}>
          [ void ]
        </span>
      );
  }
}

// ─── SCATTER MAP ──────────────────────────────────────────────────────────────
function ScatterMap() {
  const [cells, setCells] = useState<number[]>([]);

  useEffect(() => {
    const total = 20 * 8;
    const active = Math.floor(total * 0.38);
    const arr = Array.from({ length: total }, (_, i) => (i < active ? 1 : 0));
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
            background: v ? "rgba(100,160,240,0.07)" : "rgba(100,160,240,0.03)",
            border: `0.5px solid ${v ? "rgba(100,160,240,0.2)" : "rgba(100,160,240,0.08)"}`,
            position: "relative",
          }}>
            {v === 1 && (
              <div style={{
                position: "absolute",
                inset: 3,
                border: "0.5px solid rgba(100,160,240,0.15)",
              }} />
            )}
          </div>
        ))}
      </div>
      <p style={{
        fontSize: 8,
        letterSpacing: "0.15em",
        color: "rgba(100,160,240,0.2)",
        textTransform: "uppercase",
        fontFamily: "var(--font-mono)",
      }}>
        density map — subject matter — unweighted
      </p>
    </div>
  );
}

// ─── COLLECTION CARD ──────────────────────────────────────────────────────────
function CollectionCard({ col }: { col: Collection }) {
  const isVoid = col.icon === "void";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered && !isVoid ? "#0d1e38" : "#0a1628",
        padding: "1.5rem 1.25rem",
        position: "relative",
        cursor: isVoid ? "default" : "pointer",
        border: isVoid ? "0.5px dashed rgba(100,160,240,0.1)" : undefined,
        transition: "background 0.2s",
      }}
    >
      {/* index badge */}
      <span style={{
        position: "absolute",
        top: "0.6rem",
        right: "0.75rem",
        fontSize: 7,
        color: "rgba(100,160,240,0.2)",
        letterSpacing: "0.1em",
        fontFamily: "var(--font-mono)",
      }}>
        {col.index}
      </span>

      {/* frame */}
      <div style={{
        width: "100%",
        aspectRatio: "4/3",
        border: `0.5px ${isVoid ? "dashed" : "solid"} rgba(100,160,240,${isVoid ? "0.08" : "0.15"})`,
        marginBottom: "0.75rem",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* X lines — placeholder técnico */}
        {!isVoid && (
          <svg
            viewBox="0 0 100 75"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
          >
            <line x1={0} y1={0} x2={100} y2={75} stroke="rgba(100,160,240,1)" strokeWidth={0.5} />
            <line x1={100} y1={0} x2={0} y2={75} stroke="rgba(100,160,240,1)" strokeWidth={0.5} />
          </svg>
        )}

        {/* visor corners */}
        {(["tl", "tr", "bl", "br"] as const).map((pos) => (
          <div key={pos} style={{
            position: "absolute",
            width: 8, height: 8,
            top:    pos.startsWith("t") ? 4 : undefined,
            bottom: pos.startsWith("b") ? 4 : undefined,
            left:   pos.endsWith("l")   ? 4 : undefined,
            right:  pos.endsWith("r")   ? 4 : undefined,
            borderColor: "rgba(100,160,240,0.4)",
            borderStyle: "solid",
            borderWidth: (
              pos === "tl" ? "1px 0 0 1px" :
              pos === "tr" ? "1px 1px 0 0" :
              pos === "bl" ? "0 0 1px 1px" :
                             "0 1px 1px 0"
            ),
          }} />
        ))}

        {/* dashed inner border + icon */}
        <div style={{
          position: "absolute",
          inset: 12,
          border: `0.5px dashed rgba(100,160,240,${isVoid ? "0.06" : "0.1"})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <FrameIcon type={col.icon} />
        </div>
      </div>

      <div style={{
        fontSize: 9,
        letterSpacing: "0.2em",
        color: isVoid ? "rgba(100,160,240,0.2)" : "rgba(168,196,232,0.6)",
        textTransform: "uppercase",
        marginBottom: "0.3rem",
        fontFamily: "var(--font-mono)",
      }}>
        {col.name}
      </div>
      <div style={{
        fontSize: 8,
        color: "rgba(100,160,240,0.25)",
        letterSpacing: "0.1em",
        fontFamily: "var(--font-mono)",
      }}>
        {col.status}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BlueprintPortfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="bp-root">
      <div className="bp-grid-bg" />

      <div className="bp-container">

        {/* ── STAMP BAR ── */}
        <div className="bp-fade-in" style={{
          animationDelay: "0ms",
          fontSize: 9,
          letterSpacing: "0.25em",
          color: "rgba(100,160,240,0.35)",
          textTransform: "uppercase",
          marginBottom: "3rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          fontFamily: "var(--font-mono)",
        }}>
          <span>drawing no. 001 — rev. ∞ &nbsp;|&nbsp; a working draft of seeing &nbsp;|&nbsp; do not scale</span>
          <span style={{ flex: 1, height: "0.5px", background: "rgba(100,160,240,0.15)", display: "block" }} />
        </div>

        {/* ── HERO ── */}
        <div className="bp-fade-in" style={{
          animationDelay: "80ms",
          marginBottom: "4rem",
          borderLeft: "0.5px solid rgba(100,160,240,0.25)",
          paddingLeft: "1.5rem",
          position: "relative",
        }}>
          <div className="bp-crosshair" style={{ top: -8, left: -24 }} />
          <p style={{
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "rgba(100,160,240,0.3)",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            fontFamily: "var(--font-mono)",
          }}>subject /</p>
          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            color: "#c8ddf5",
            lineHeight: 1.1,
            marginBottom: "0.8rem",
            letterSpacing: "-0.01em",
            fontWeight: 400,
          }}>
            skeleton<br />photographs
          </h1>
          <p style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(100,160,240,0.45)",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}>
            backbone — not the finished work
          </p>
        </div>

        {/* ── DIMENSION LINE ── */}
        <div className="bp-fade-in" style={{
          animationDelay: "160ms",
          display: "flex",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}>
          <div style={{ width: "0.5px", height: 12, background: "rgba(100,160,240,0.3)" }} />
          <div style={{ flex: 1, height: "0.5px", background: "rgba(100,160,240,0.15)" }} />
          <span style={{
            fontSize: 8,
            letterSpacing: "0.15em",
            color: "rgba(100,160,240,0.25)",
            padding: "0 0.75rem",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}>
            collections arranged by proximity of feeling
          </span>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(100,160,240,0.15)" }} />
          <div style={{ width: "0.5px", height: 12, background: "rgba(100,160,240,0.3)" }} />
        </div>

        {/* ── SECTION LABEL 01 ── */}
        <div className="bp-fade-in" style={{
          animationDelay: "200ms",
          fontSize: 8,
          letterSpacing: "0.3em",
          color: "rgba(100,160,240,0.3)",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontFamily: "var(--font-mono)",
        }}>
          <span style={{ color: "rgba(100,160,240,0.2)", fontSize: 7 }}>01 —</span>
          collections index
        </div>

        {/* ── COLLECTIONS GRID ── */}
        <div className="bp-collections-grid bp-fade-in" style={{ animationDelay: "260ms" }}>
          {COLLECTIONS.map((col) => (
            <CollectionCard key={col.id} col={col} />
          ))}
        </div>

        {/* ── NOTES BLOCK ── */}
        <div className="bp-fade-in" style={{
          animationDelay: "340ms",
          border: "0.5px solid rgba(100,160,240,0.1)",
          padding: "1.25rem 1.5rem",
          marginBottom: "3rem",
          position: "relative",
        }}>
          <span style={{
            position: "absolute",
            top: "-0.5rem",
            left: "1rem",
            background: "#0a1628",
            padding: "0 0.5rem",
            fontSize: 7,
            letterSpacing: "0.3em",
            color: "rgba(100,160,240,0.25)",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}>notes</span>

          {NOTES.map((note, i) => (
            <div key={i} style={{
              fontSize: 10,
              lineHeight: 2.2,
              color: "rgba(168,196,232,0.4)",
              letterSpacing: "0.08em",
              borderBottom: i < NOTES.length - 1 ? "0.5px solid rgba(100,160,240,0.06)" : undefined,
              fontFamily: "var(--font-mono)",
            }}>
              {note.italic
                ? <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "rgba(168,196,232,0.65)" }}>{note.text}</em>
                : note.text
              }
            </div>
          ))}
        </div>

        {/* ── SCATTER SECTION ── */}
        <div className="bp-fade-in" style={{ animationDelay: "400ms" }}>
          <div style={{
            fontSize: 8,
            letterSpacing: "0.3em",
            color: "rgba(100,160,240,0.3)",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            fontFamily: "var(--font-mono)",
          }}>
            <span style={{ color: "rgba(100,160,240,0.2)", fontSize: 7 }}>02 —</span>
            scatter — frequency of themes
          </div>
          {mounted && <ScatterMap />}
        </div>

        {/* ── FOOTER ── */}
        <div className="bp-fade-in" style={{
          animationDelay: "460ms",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "0.5px solid rgba(100,160,240,0.1)",
          paddingTop: "1rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <div style={{
            fontSize: 8,
            letterSpacing: "0.2em",
            color: "rgba(100,160,240,0.2)",
            textTransform: "uppercase",
            lineHeight: 2,
            fontFamily: "var(--font-mono)",
          }}>
            <div>portfolio — draft v∞</div>
            <div>field: photography</div>
            <div>status: working draft of seeing</div>
          </div>

          <div style={{ display: "flex", gap: 1 }}>
            {[["scale", "1:∞"], ["sheet", "1 / ∞"], ["date", "ongoing"]].map(([label, val]) => (
              <div key={label} style={{
                border: "0.5px solid rgba(100,160,240,0.1)",
                padding: "0.4rem 0.75rem",
                fontSize: 7,
                letterSpacing: "0.2em",
                color: "rgba(100,160,240,0.2)",
                textTransform: "uppercase",
                textAlign: "center",
                fontFamily: "var(--font-mono)",
              }}>
                {label}
                <span style={{
                  display: "block",
                  fontSize: 10,
                  color: "rgba(100,160,240,0.35)",
                  letterSpacing: "0.1em",
                  marginTop: 2,
                  fontFamily: "var(--font-mono)",
                }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
