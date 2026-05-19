"use client";

import { useEffect, useState, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const AUTHOR = {
  name:      "DIEGO BRAVO NILO",
  initials:  "DB",
  version:   "V.1.0",
  location:  "SANTIAGO DE CHILE",
  email:     "fotografhydiego@gmail.com",
  phone:     "+56 9 6146 9174",
  ig1:       "@diegobravonn",
  ig2:       "@diegotookthepic",
  lat:       "-33.4569° S",
  lon:       "-70.6483° O",
  year:      "2026",
  status:    "EN PROCESO",
};

const SAMPLES = [
  {
    id: "DB-001", unit: "Proyecto 1",
    lithology: "Material de baja cohesión. Alta sensibilidad a condiciones de iluminación ambiente.",
    observation: "depende de lo que ya estaba ahí antes de llegar", status: "abierto",
  },
  {
    id: "DB-002", unit: "Proyecto 2",
    lithology: "Unidad de alta presión confinante. El espacio como agente, no como escenario.",
    observation: "el espacio como agente, no como escenario", status: "abierto",
  },
  {
    id: "DB-003", unit: "Proyecto 3",
    lithology: "Superficie de transporte activo. Evidencia de erosión lateral.",
    observation: "nada permanece lo suficiente como para ser estudiado in situ", status: "abierto",
  },
  {
    id: "DB-004", unit: "Proyecto 4",
    lithology: "Remanente erosional. Morfología preservada por contraste.",
    observation: "lo que sobrevive al corte define la forma", status: "abierto",
  },
  {
    id: "DB-005", unit: "Proyecto 5",
    lithology: "Superficie de contacto entre formaciones. Plano de referencia.",
    observation: "la línea no es el límite — es el argumento", status: "abierto",
  },
  {
    id: "DB-006", unit: "Proyecto 6",
    lithology: "Litología indeterminada. Muestra en proceso de descripción.",
    observation: "—", status: "abierto",
  },
  {
    id: "DB-007", unit: "Proyecto 7",
    lithology: "Registro extendido. Unidad adicional en expansión continua.",
    observation: "—", status: "abierto",
  },
];

// Mapeo de IDs de muestra → carpeta dinámica en Cloudinary
const CLOUDINARY_FOLDERS: Record<string, string> = {
  "DB-001": "Imagenes/Proyecto 1",
  "DB-002": "Imagenes/Proyecto 2",
  "DB-003": "Imagenes/Proyecto 3",
  "DB-004": "Imagenes/Proyecto 4",
  "DB-005": "Imagenes/Proyecto 5",
  "DB-006": "Imagenes/Proyecto 6",
  "DB-007": "Imagenes/Proyecto 7",
};

// ─── STYLE HELPERS ──────────────────────────────────────────────────────────
const mono: React.CSSProperties   = { fontFamily: "var(--font-mono)" };
const serif: React.CSSProperties  = { fontFamily: "var(--font-serif)" };

// ─── BLINKING CURSOR ────────────────────────────────────────────────────────
function BlinkCursor() {
  return <span className="blink" style={{ ...mono, fontSize: 16, color: "var(--blue-cyan)", marginLeft: 2 }}>|</span>;
}

// ─── EMPTY COLLECTION ────────────────────────────────────────────────────────
function EmptyCollection({ sampleId }: { sampleId: string }) {
  const folder = CLOUDINARY_FOLDERS[sampleId] ?? sampleId;
  return (
    <div className="empty-collection">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, opacity: 0.2 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            width: 52, height: 52,
            border: "1px solid var(--blue-light)",
            background: "var(--blue-ghost)",
          }} />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ ...mono, fontSize: 10, letterSpacing: "0.2em", color: "var(--blue-mid)",
          textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Colección vacía — {sampleId}
        </p>
        <p style={{ ...mono, fontSize: 9, color: "var(--blue-light)", letterSpacing: "0.1em" }}>
          Sube imágenes a{" "}
          <span style={{ color: "var(--blue-mid)" }}>Cloudinary › {folder}</span>
        </p>
      </div>
    </div>
  );
}

// ─── CLOUDINARY IMAGE TYPE ───────────────────────────────────────────────────
interface CloudImage { url: string; public_id: string; width: number; height: number; format: string; }

// ─── LIGHTBOX ───────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: CloudImage[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const img     = images[index];
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;
  const label   = img.public_id.split("/").pop() ?? img.public_id;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft"  && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Contador */}
      <div style={{
        position: "fixed", top: "1.25rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 10,
        background: "rgba(12,18,28,0.75)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(212,229,245,0.15)",
        padding: "0.35rem 1rem", borderRadius: 2,
      }} onClick={e => e.stopPropagation()}>
        <span style={{ ...mono, fontSize: 9, color: "rgba(212,229,245,0.7)", letterSpacing: "0.25em" }}>
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          &nbsp;&nbsp;·&nbsp;&nbsp;{label}
        </span>
      </div>

      {/* Imagen central */}
      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}
        style={{ display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", height: "100%", padding: "4rem 5rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.url} alt={label} className="lightbox-img"
          style={{
            maxWidth: "100%", maxHeight: "100%",
            objectFit: "contain",
            boxShadow: "0 8px 60px rgba(0,0,0,0.7)",
            borderRadius: 1,
          }} />
      </div>

      {/* Nav prev */}
      {hasPrev && (
        <button className="lightbox-nav lightbox-nav--prev"
          onClick={e => { e.stopPropagation(); onPrev(); }} aria-label="Anterior"
          style={{ background: "rgba(12,18,28,0.6)", backdropFilter: "blur(6px)" }}>←</button>
      )}
      {/* Nav next */}
      {hasNext && (
        <button className="lightbox-nav lightbox-nav--next"
          onClick={e => { e.stopPropagation(); onNext(); }} aria-label="Siguiente"
          style={{ background: "rgba(12,18,28,0.6)", backdropFilter: "blur(6px)" }}>→</button>
      )}

      {/* Hint inferior */}
      <div style={{
        position: "fixed", bottom: "1.25rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 10,
      }}>
        <span style={{ ...mono, fontSize: 8, color: "rgba(212,229,245,0.4)", letterSpacing: "0.2em" }}>
          ESC — CERRAR &nbsp;·&nbsp; ← → NAVEGAR
        </span>
      </div>
    </div>
  );
}

// ─── COLLECTION VIEW ────────────────────────────────────────────────────────
function CollectionView({ sample, onBack }: { sample: typeof SAMPLES[0]; onBack: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [images, setImages]               = useState<CloudImage[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);

  // Fetch images from Cloudinary via API route
  useEffect(() => {
    const folder = CLOUDINARY_FOLDERS[sample.id];
    if (!folder) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    fetch(`/api/cloudinary?folder=${encodeURIComponent(folder)}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setImages(data.images ?? []);
      })
      .catch(e => setError(String(e.message)))
      .finally(() => setLoading(false));
  }, [sample.id]);

  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = useCallback(() =>
    setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextImage = useCallback(() =>
    setLightboxIndex(i => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);

  return (
    <div className="root">
      <div className="paper-lines" />
      <div className="grain-overlay" />
      <div className="container collection-container">

        <div className="fade-in" style={{ animationDelay: "0ms" }}>
          <button className="back-btn" onClick={onBack}>← VOLVER</button>

          <div className="hr-thin" style={{ marginTop: "1.5rem" }} />

          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <div>
              <span className="section-label">COLECCIÓN — {sample.id}</span>
              <h1 style={{ ...serif, fontSize: "clamp(28px, 5vw, 52px)",
                color: "var(--blue-prussian)", fontWeight: 400 }}>
                {sample.unit}
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ ...mono, fontSize: 9, color: "var(--blue-mid)", letterSpacing: "0.15em" }}>
                N° DE REGISTROS: {loading ? "—" : images.length}
              </p>
              <p style={{ ...mono, fontSize: 9, color: "var(--blue-light)", letterSpacing: "0.15em" }}>
                ESTADO: <span style={{ color: "var(--blue-cyan)", textTransform: "uppercase" }}>·&nbsp;{sample.status}</span>
              </p>
            </div>
          </div>

          {sample.observation !== "—" && (
            <em style={{ ...serif, fontSize: 18, color: "var(--blue-mid)",
              display: "block", marginBottom: "0.75rem", fontStyle: "italic" }}>
              {sample.observation}
            </em>
          )}
          <div className="hr-thin" />
        </div>

        <div className="fade-in" style={{ animationDelay: "80ms" }}>
          {loading ? (
            <div className="empty-collection">
              <p style={{ ...mono, fontSize: 10, letterSpacing: "0.2em", color: "var(--blue-mid)",
                textTransform: "uppercase", textAlign: "center" }}>
                CARGANDO REGISTROS<span className="blink">_</span>
              </p>
            </div>
          ) : error ? (
            <div style={{ padding: "3rem", textAlign: "center",
              border: "1px dashed var(--blue-ghost)", borderRadius: 2 }}>
              <p style={{ ...mono, fontSize: 9, color: "var(--blue-mid)",
                letterSpacing: "0.15em", textTransform: "uppercase" }}>
                ERROR AL CARGAR IMÁGENES
              </p>
              <p style={{ ...mono, fontSize: 8, color: "var(--blue-light)", marginTop: "0.5rem" }}>
                {error}
              </p>
            </div>
          ) : images.length === 0 ? (
            <EmptyCollection sampleId={sample.id} />
          ) : (
            /* ── MASONRY PORTFOLIO GRID ── */
            <div style={{
              columns: "3 220px",
              columnGap: "10px",
              marginTop: "1.5rem",
            }}>
              {images.map((img, i) => (
                <button
                  key={img.public_id}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  style={{
                    display: "block",
                    width: "100%",
                    marginBottom: "10px",
                    breakInside: "avoid",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                  className="masonry-thumb"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.public_id}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      transition: "transform 0.4s ease, filter 0.4s ease",
                    }}
                    className="masonry-img"
                  />
                  {/* Overlay con número */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(12,18,28,0.6) 0%, transparent 50%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex", alignItems: "flex-end", justifyContent: "flex-start",
                    padding: "0.75rem",
                  }} className="masonry-overlay">
                    <span style={{ ...mono, fontSize: 8, color: "rgba(212,229,245,0.85)",
                      letterSpacing: "0.2em" }}>
                      {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: "3rem" }}>
          <div className="hr-thin" />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ ...mono, fontSize: 8, color: "var(--blue-light)", letterSpacing: "0.2em" }}>
              DB_ARCHIVES_V2 — {sample.id}
            </span>
            <button className="back-btn" onClick={onBack}>← VOLVER</button>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex}
          onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function FieldReport() {
  const [mounted, setMounted] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"proyectos" | "archivos">("archivos");

  useEffect(() => { setMounted(true); }, []);

  const activeSample = SAMPLES.find(s => s.id === activeCollection) ?? null;
  if (activeSample) {
    return <CollectionView sample={activeSample} onBack={() => setActiveCollection(null)} />;
  }

  const D = [0, 80, 160, 240, 320, 400, 480];

  return (
    <div className="root">
      <div className="paper-lines" />
      <div className="grain-overlay" />
      <div className="container">

        {/* ── HEADER ── */}
        <header className="header-section fade-in" style={{ animationDelay: `${D[0]}ms` }}>

          {/* Name — enormous, with irregular indentation */}
          <h1 className="header-name" aria-label="Diego Bravo Nilo">
            <span style={{ display: "block" }}>DIEGO</span>
            <span className="line-indent">BRAVO</span>
            <span className="line-small">NILO</span>
          </h1>

          {/* Metadata asimétrica */}
          <div className="metadata-grid" style={{ marginTop: "2rem" }}>
            <div className="meta-left">
              <div>DB_ARCHIVES_V2</div>
              <div>{AUTHOR.version}</div>
              <div>{AUTHOR.location}</div>
              <div>
                <span className="status-dot" />
                {AUTHOR.status}<BlinkCursor />
              </div>
            </div>
            <div className="meta-right">
              <div>{AUTHOR.email}</div>
              <div>{AUTHOR.phone}</div>
              <div>{AUTHOR.ig1}</div>
              <div>{AUTHOR.ig2}</div>
            </div>
          </div>

          <div className="hr-thin" style={{ marginTop: "2rem" }} />
        </header>

        {/* ── NAVEGACIÓN INLINE ── */}
        <nav className="nav-inline fade-in" style={{ animationDelay: `${D[1]}ms` }}
          aria-label="Secciones">
          <button
            id="nav-archivos"
            className="nav-item"
            onClick={() => setActiveSection("archivos")}
            style={{ color: activeSection === "archivos" ? "var(--blue-cyan)" : undefined }}
          >
            ARCHIVOS
          </button>
          <button
            id="nav-proyectos"
            className="nav-item"
            onClick={() => setActiveSection("proyectos")}
            style={{ color: activeSection === "proyectos" ? "var(--blue-cyan)" : undefined }}
          >
            PROYECTOS
          </button>
        </nav>

        {/* ── FRASE POÉTICA ── */}
        <div className="fade-in" style={{ animationDelay: `${D[2]}ms`, marginBottom: "3rem" }}>
          <p className="frase-poetica">
            &ldquo;Donde sea que vas,<br />Sigue la luz.&rdquo;
          </p>
          <div className="hr-irregular" />
        </div>

        {/* ── SECCIÓN ARCHIVOS ── */}
        {activeSection === "archivos" && (
          <section className="fade-in" style={{ animationDelay: `${D[3]}ms`, marginBottom: "4rem" }}>
            <span className="section-label">DB_ARCHIVES_V2</span>
            <h2 style={{ ...serif }}
              className="section-heading">
              <span className="section-heading-rotated">DB_ARCHIVES</span>
              <span style={{ fontSize: "clamp(20px, 3vw, 36px)", color: "var(--blue-cyan)", display: "block", marginTop: "0.1em" }}>
                _V2
              </span>
            </h2>

            {/* Lista caotica de archivos */}
            <div className="archives-list">
              {SAMPLES.map((s, i) => (
                <div
                  key={s.id}
                  id={`archive-${s.id}`}
                  className="archive-item"
                  onClick={() => setActiveCollection(s.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir colección ${s.id} — ${s.unit}`}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setActiveCollection(s.id); }}
                  style={{
                    animationDelay: `${D[3] + i * 60}ms`,
                  }}
                >
                  <span className="archive-id">{s.id}</span>
                  <span className="archive-unit">{s.unit}</span>
                  {s.observation !== "—" && (
                    <span className="archive-observation">{s.observation}</span>
                  )}
                  <span className="archive-dot" style={{ color: s.status === "pendiente" ? "var(--blue-ghost)" : "var(--blue-cyan)" }}>·</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── SECCIÓN PROYECTOS ── */}
        {activeSection === "proyectos" && (
          <section className="fade-in" style={{ animationDelay: `${D[3]}ms`, marginBottom: "4rem" }}>
            <span className="section-label">PROYECTOS</span>
            <h2 className="section-heading" style={{ ...serif, marginBottom: "0.5em" }}>
              Proyectos
            </h2>

            {/* Grilla irregular */}
            <div className="projects-grid">
              {[
                { num: "01", name: "Eventos Sociales" },
                { num: "02", name: "Comercial" },
                { num: "03", name: "Editorial" },
                { num: "04", name: "Retratos" },
                { num: "05", name: "Urbano" },
                { num: "06", name: "Luz disponible" },
                { num: "07", name: "Interiores" },
                { num: "08", name: "Horizonte" },
                { num: "09", name: "Sin clasificar" },
              ].map((p, i) => (
                <div
                  key={p.num}
                  id={`project-${p.num}`}
                  className="project-card"
                  role="button"
                  tabIndex={0}
                  aria-label={`Proyecto ${p.num}: ${p.name}`}
                  style={{
                    background: i % 3 === 0 ? "var(--cream-dark)" : i % 3 === 1 ? "var(--blue-ghost)" : "var(--cream)",
                    animationDelay: `${D[3] + i * 50}ms`,
                  }}
                >
                  <div className="project-card-num">{p.num}</div>
                  <div className="project-card-name">{p.name}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── METODOLOGÍA — siempre visible ── */}
        {mounted && (
          <section className="fade-in" style={{ animationDelay: `${D[4]}ms`, marginBottom: "4rem" }}>
            <span className="section-label">METODOLOGÍA</span>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1px",
              background: "var(--blue-ghost)",
              border: "1px solid var(--blue-ghost)",
            }}>
              {[
                { title: "Equipamiento", items: [
                  ["Instrumento", "Fujifilm XH-1"],
                  ["Lentes", "25mm · 35mm / FILM"],
                  ["Resolución", "24.3 mpx"],
                  ["Protocolo", "observación directa"],
                ]},
                { title: "Clasificación", items: [
                  ["Método", "afinidad composicional"],
                  ["Escala", "1:∞"],
                  ["Datum", "sensación"],
                  ["Referencia", "ninguna externa"],
                ]},
                { title: "Limitaciones", items: [
                  ["Cobertura", "parcial"],
                  ["Repetibilidad", "baja"],
                  ["Sesgo", "confirmado"],
                  ["Revisión ext.", "no realizada"],
                ]},
              ].map(col => (
                <div key={col.title} style={{ background: "var(--cream)", padding: "1.25rem" }}>
                  <p style={{ ...mono, fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase",
                    color: "var(--blue-mid)", marginBottom: "0.75rem" }}>{col.title}</p>
                  {col.items.map(([k, v]) => (
                    <div key={k} style={{ ...mono, fontSize: 9, color: "var(--blue-prussian)",
                      lineHeight: 2, opacity: 0.85 }}>
                      <span style={{ color: "var(--blue-light)" }}>{k}:</span> {v}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CONCLUSIONES ── */}
        <section className="fade-in" style={{ animationDelay: `${D[5]}ms`, marginBottom: "4rem" }}>
          <span className="section-label">CONCLUSIONES PRELIMINARES</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { num: "01.", italic: false,
                text: "Las unidades clasificadas no representan la totalidad del registro. La documentación refleja el estado parcial de la imagen completa." },
              { num: "02.", italic: false,
                text: "La relación entre unidades es de carácter composicional. El orden de presentación no implica jerarquía ni secuencia temporal." },
              { num: "03.", italic: true,
                text: "el archivo no está terminado.\nnunca lo estará. esa es la condición que siempre perdurará." },
            ].map(item => (
              <div key={item.num} style={{ display: "flex", gap: "1rem" }}>
                <span style={{ ...mono, fontSize: 10, color: "var(--blue-light)", flexShrink: 0, paddingTop: 2 }}>
                  {item.num}
                </span>
                {item.italic
                  ? <em style={{ ...serif, fontSize: 20, color: "var(--blue-mid)",
                      fontStyle: "italic", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.text}</em>
                  : <p style={{ ...mono, fontSize: 10, color: "var(--blue-prussian)",
                      lineHeight: 1.9, opacity: 0.8 }}>{item.text}</p>
                }
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer-section fade-in" style={{ animationDelay: `${D[6]}ms` }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div className="footer-coords">
              <div>LAT: {AUTHOR.lat}</div>
              <div>LON: {AUTHOR.lon}</div>
              <div style={{ marginTop: "0.25rem", fontSize: 9 }}>WGS-84 / DATUM</div>
            </div>
            <div style={{ ...mono, fontSize: 9, color: "var(--blue-mid)",
              textAlign: "right", letterSpacing: "0.15em", lineHeight: 2 }}>
              <div>DB_ARCHIVES_V2</div>
              <div>{AUTHOR.version} — {AUTHOR.year}</div>
            </div>
          </div>
          <div style={{ ...mono, fontSize: 8, color: "var(--blue-ghost)",
            textAlign: "center", marginTop: "2rem", letterSpacing: "0.25em", opacity: 0.6 }}>
            Este documento es de carácter preliminar · No reproducir sin autorización
          </div>
        </footer>

      </div>
    </div>
  );
}
