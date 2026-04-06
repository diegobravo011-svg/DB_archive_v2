# Prompt para Antigravity — Blueprint Photography Portfolio

Paste esto completo en Antigravity como prompt de diseño/implementación:

---

Quiero construir mi portfolio de fotografía personal con una estética de **blueprint técnico arquitectónico** — planos azules, grilla de fondo, tipografía monospace, sin imágenes reales todavía (solo estructuras vacías que indiquen donde irán).

## Concepto central

La sensación que busco es: **alguien encontró accidentalmente este archivo**. No es el portfolio terminado — es el esqueleto, el backbone, la estructura antes de que llegue el trabajo. Como un plano de arquitectura encontrado en un cajón. Minimalista, técnico, poético.

Subtítulo del sitio: **"a working draft of seeing"**

## Stack
- Next.js + React (TypeScript)
- Sin librerías de animación externas, solo CSS keyframes
- Google Fonts: `Space Mono` (monospace, todo el UI) + `Instrument Serif` (italic, solo títulos y frases poéticas)

## Paleta de colores exacta
```css
--bp-bg:          #0a1628;   /* fondo principal — azul muy oscuro */
--bp-line:        rgba(100,160,240,0.15);  /* líneas de grilla gruesa */
--bp-line-fine:   rgba(100,160,240,0.04);  /* grilla fina de fondo */
--bp-text:        #a8c4e8;   /* texto base */
--bp-text-dim:    rgba(100,160,240,0.3);   /* labels, anotaciones */
--bp-text-muted:  rgba(100,160,240,0.2);   /* metadata, muy sutil */
--bp-accent:      #c8ddf5;   /* títulos principales */
--bp-hover:       #0d1e38;   /* hover de celdas */
```

## Fondo blueprint (CSS, posición fixed)
Dos capas de grilla superpuestas:
- Grilla gruesa: `40px × 40px`, opacidad 0.04
- Grilla fina: `8px × 8px`, opacidad 0.015
Ambas en azul `rgba(100,160,240, x)`, `pointer-events: none`, `z-index: 0`

## Estructura de la página (de arriba a abajo)

### 1. Stamp bar (header técnico)
```
drawing no. 001 — rev. ∞  |  a working draft of seeing  |  do not scale
```
- Font: Space Mono, 9px, letter-spacing 0.25em, uppercase
- Color: `rgba(100,160,240,0.35)`
- Seguido de una línea horizontal de 0.5px que llega al borde

### 2. Hero
- Borde izquierdo: `0.5px solid rgba(100,160,240,0.25)` con padding-left
- Crosshair decorativo arriba-izquierda (dos líneas perpendiculares de 16px, 1px, `rgba(100,160,240,0.25)`)
- Label pequeño: `subject /` en uppercase monospace muy sutil
- Título principal: `skeleton` + salto de línea + `photographs`
  - Instrument Serif, italic, `clamp(2.2rem, 5vw, 3.8rem)`, color `#c8ddf5`
- Subtítulo: `backbone — not the finished work`, Space Mono, 10px, uppercase, muy atenuado

### 3. Línea de dimensión
```
|————————— collections arranged by proximity of feeling —————————|
```
Línea horizontal de 0.5px con texto centrado (estilo plano técnico con cota de medida).
Las barras verticales en los extremos son de 12px de alto.

### 4. Section label "01 — collections index"
Font: Space Mono, 8px, uppercase, letter-spacing 0.3em, color dim

### 5. Grid de colecciones (6 celdas: 3×2 en desktop, 2×3 en mobile)
- Fondo de la grilla: `rgba(100,160,240,0.08)` con `gap: 1px` (crea las líneas de separación)
- Cada celda: fondo `#0a1628`, hover `#0d1e38`, transition 0.2s

**Contenido de cada celda:**
- Badge de índice (ej: `[ A ]`) posicionado absolute arriba-derecha, 7px, muy atenuado
- Frame (aspect-ratio 4/3):
  - Borde: `0.5px solid rgba(100,160,240,0.15)`
  - SVG de X cruzada dentro (las dos diagonales), opacidad 0.07 — esto es el placeholder técnico estándar de planos
  - 4 esquinas decorativas de 8px (solo dos lados de cada esquina, estilo visor de cámara), color `rgba(100,160,240,0.4)`
  - Borde interior punteado (`dashed`) con ícono SVG centrado específico de cada colección
- Nombre de la colección: Space Mono, 9px, uppercase, letter-spacing 0.2em
- Estado: "n frames — unresolved", 8px, muy atenuado

**Los 6 íconos SVG de las celdas** (todos 60×44px, opacidad 0.4, trazos `rgba(100,160,240,x)`):
- A / luz disponible: círculo con crosshair interno (líneas + y punto central)
- B / interiores: rectángulo con thumbnail + líneas de texto simuladas
- C / tránsito: curva bezier con 3 puntos de control circulares
- D / figuras: 3 círculos concéntricos, el exterior punteado
- E / horizonte: línea de horizonte con rect centrado, dos líneas paralelas
- F / pending: celda especial — borde dashed, texto `[ void ]`, todo más atenuado

### 6. Bloque de notas (manifiesto)
Borde: `0.5px solid rgba(100,160,240,0.1)` con label `notes` flotando sobre el borde superior (background `#0a1628`, padding horizontal).

Líneas de texto (separadas por `border-bottom: 0.5px solid rgba(100,160,240,0.06)`):
1. *(italic)* "these are not photographs."
2. "these are the load-bearing walls of a visual practice."
3. "arranged by proximity of feeling, not by date."
4. "the captions are missing on purpose."
5. *(italic)* "what you found is the structure, not the building."

Las líneas en italic usan Instrument Serif, 12px, color un poco más brillante.
Las líneas normales usan Space Mono, 10px, line-height 2.2.

### 7. Section label "02 — scatter — frequency of themes"

### 8. Scatter map / density map
Grid de 20×8 celdas pequeñas (14px de alto), gap 2px.
El 38% de las celdas se activa aleatoriamente al montar (Math.random shuffle).
- Celda inactiva: `background rgba(100,160,240,0.03)`, borde `rgba(100,160,240,0.08)`
- Celda activa: `background rgba(100,160,240,0.07)`, borde `rgba(100,160,240,0.2)`, con inset de 3px con otro borde interior `rgba(100,160,240,0.15)`
Label debajo: `density map — subject matter — unweighted`, 8px, uppercase, muy atenuado.

### 9. Footer técnico
Flex row, space-between:
- Izquierda: tres líneas de metadata (portfolio draft v∞ / field: photography / status: working draft of seeing), 8px, uppercase, line-height 2
- Derecha: tres "cajitas" técnicas contiguas (gap 1px):
  - `scale` / `1:∞`
  - `sheet` / `1 / ∞`
  - `date` / `ongoing`
  Cada caja: `border: 0.5px solid rgba(100,160,240,0.1)`, 7px label arriba, 10px valor abajo

## Animaciones de entrada
Todas las secciones entran con `opacity: 0 → 1` + `translateY(8px → 0)` en 0.6s ease.
Delays escalonados: 0ms, 80ms, 160ms, 200ms, 260ms, 340ms, 400ms, 460ms.

## Typography rules
- Todo el UI: Space Mono (monospace)
- Solo títulos grandes y frases del manifiesto: Instrument Serif italic
- Nunca mezclar en el mismo elemento
- Tamaños base: stamps/labels 7-9px, body 10px, hero `clamp(2.2rem, 5vw, 3.8rem)`
- Letter-spacing agresivo en uppercase: 0.2em–0.3em

## Datos editables
Exponer el array `COLLECTIONS` como constante al tope del archivo para que sea fácil de editar:
```ts
const COLLECTIONS = [
  { id: "a", index: "[ A ]", name: "luz disponible", status: "n frames — unresolved", icon: "circle" },
  { id: "b", index: "[ B ]", name: "interiores",     status: "n frames — unresolved", icon: "rect"   },
  { id: "c", index: "[ C ]", name: "tránsito",       status: "n frames — unresolved", icon: "wave"   },
  { id: "d", index: "[ D ]", name: "figuras",        status: "n frames — unresolved", icon: "concentric" },
  { id: "e", index: "[ E ]", name: "horizonte",      status: "n frames — unresolved", icon: "horizon" },
  { id: "f", index: "[ F ]", name: "— pending —",    status: "not yet named",         icon: "void"   },
];
```
Igualmente exponer el array `NOTES` para el manifiesto.

## Lo que NO quiero
- Nada de gradientes purple/white genéricos
- Nada de Inter, Roboto ni system fonts
- Nada de sombras drop-shadow
- Nada de animaciones rebotantes o playful
- Ningún componente que "grite" portfolio — todo debe sentirse encontrado, no presentado

