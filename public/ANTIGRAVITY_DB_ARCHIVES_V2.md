# Antigravity Prompt — DB_archives_v2

---

## Concepto

Construir un sitio que se vea y se comporte exactamente como un **informe técnico de campaña geológica de campo**. No hay ninguna referencia explícita a fotografía, portfolio, ni galería. El nombre del proyecto es `DB_archives_v2`. Los "samples" son colecciones fotográficas, pero el sitio nunca lo dice — simplemente lo es.

Quien no conoce geología ve algo técnico, denso y misterioso.
Quien conoce geología, lee exactamente lo que hay.

No hay metáfora decorativa. No hay "esto representa X". Es el informe. Punto.

---

## Nombre del sitio
```
DB_archives_v2
```
Sin subtítulo explicativo. Sin tagline. El nombre es suficiente.

---

## Stack
- Next.js + React, TypeScript
- Google Fonts: `Space Mono` (todo el UI, monospace estricto) + `Instrument Serif` (italic, solo para observaciones de campo en primera persona — como notas escritas a mano en un cuaderno)
- Sin librerías de animación externas. Solo CSS keyframes.

---

## Paleta — verde de campo

```css
--bg:           #0c1410;
--bg-hover:     #111a10;
--bg-surface:   #0f1a0d;
--line:         rgba(80,160,100,0.12);
--line-fine:    rgba(80,160,100,0.035);
--text:         #a8bfa8;
--text-dim:     rgba(120,180,120,0.30);
--text-muted:   rgba(80,160,100,0.20);
--text-faint:   rgba(80,160,100,0.14);
--accent:       #c2d9b8;
--mark:         rgba(80,160,100,0.22);
```

Grilla de fondo (position fixed, pointer-events none, z-index 0):
- Gruesa: `40px × 40px`, `rgba(80,160,100,0.035)`
- Fina: `8px × 8px`, `rgba(80,160,100,0.012)`

---

## Estructura de la página

Todo el contenido va dentro de `max-width: 860px`, centrado, `padding: 3rem 2rem 5rem`.

---

### BLOQUE 0 — Encabezado del informe

Exactamente como la primera página de un informe técnico geológico. Todo Space Mono, uppercase, tamaños pequeños.

```
INFORME TÉCNICO DE CAMPO
Proyecto: DB_archives_v2
Operador: [nombre o iniciales del autor]
Fecha inicio: [año de inicio de la práctica fotográfica]
Estado: EN PROCESO — NO ESCALAR
```

Debajo, una línea doble horizontal (dos líneas de 0.5px separadas por 3px).

A la derecha del encabezado (absolute o flex), un bloque de coordenadas:
```
LAT: [dejar vacío o poner coordenadas reales si el autor quiere]
LON: [ídem]
DATUM: WGS-84
HOJA: IGM — sin número asignado
```

Todo esto en 8–9px, letter-spacing 0.2em, color `--text-faint`. Nada debe verse importante. Es burocrático.

---

### BLOQUE 1 — Resumen ejecutivo (introducción del informe)

Sin label visible. Solo texto corrido, dos párrafos cortos:

Párrafo 1 (Space Mono 10px, color `--text-dim`, line-height 2):
```
El presente informe documenta el registro visual acumulado durante
campañas de observación de campo en múltiples formaciones y contextos.
Las muestras han sido clasificadas por afinidad composicional,
no por orden cronológico de extracción.
```

Párrafo 2 (Instrument Serif italic, 13px, color `rgba(180,210,160,0.50)`):
```
lo que se registra aquí no es el paisaje.
es la presión que lo formó.
```

Separador: línea de 0.5px full-width, `--line`.

---

### BLOQUE 2 — Tabla de muestras (el corazón del informe)

Label encabezado de tabla al estilo técnico:
```
REGISTRO DE MUESTRAS — CAMPAÑA DB_v2
n = 6 unidades clasificadas  |  método: observación directa  |  clasificación: composicional
```
8px, uppercase, `--text-faint`.

Una tabla HTML con estas columnas exactas:
```
N° MUESTRA | UNIDAD | DESCRIPCIÓN LITOLÓGICA | OBSERVACIONES DE CAMPO | ESTADO
```

Estilo de la tabla:
- `width: 100%`, `border-collapse: collapse`
- Encabezado de columnas: 7px, letter-spacing 0.25em, uppercase, `--text-faint`, border-bottom 0.5px
- Filas: border-bottom 0.5px `rgba(80,160,100,0.07)`, hover fondo `--bg-hover`
- Sin bordes laterales. Solo horizontales.
- Padding celdas: `0.75rem 0.5rem`

**Datos de las 6 filas — NO cambiar el formato, solo el contenido de las columnas editables:**

| N° MUESTRA | UNIDAD | DESCRIPCIÓN LITOLÓGICA | OBSERVACIONES DE CAMPO | ESTADO |
|---|---|---|---|---|
| DB-001 | luz disponible | Material de baja cohesión. Alta sensibilidad a condiciones de iluminación ambiente. Textura variable. Granulometría fina a media. | *depende de lo que ya estaba ahí antes de llegar* | abierto |
| DB-002 | interiores | Unidad de alta presión confinante. Estructuras de compresión visibles. Escasa movilidad de fluidos. | *el espacio como agente, no como escenario* | abierto |
| DB-003 | tránsito | Superficie de transporte activo. Inconformidad basal con unidad subyacente. Evidencia de erosión lateral. | *nada permanece lo suficiente como para ser estudiado in situ* | abierto |
| DB-004 | figuras | Remanente erosional. Resistencia diferencial respecto a la matriz. Morfología preservada por contraste litológico. | *lo que sobrevive al corte define la forma* | abierto |
| DB-005 | horizonte | Superficie de contacto entre formaciones. Discontinuidad composicional marcada. Plano de referencia. | *la línea no es el límite — es el argumento* | abierto |
| DB-006 | [sin clasificar] | Litología indeterminada. Muestra en proceso de descripción. No incluir en interpretación preliminar. | — | pendiente |

Notas de columna:
- **N° MUESTRA**: Space Mono 9px, `--text-dim`, bold
- **UNIDAD**: Space Mono 9px, uppercase, `--text-dim`
- **DESCRIPCIÓN LITOLÓGICA**: Space Mono 9px, `--text-muted`, line-height 1.8
- **OBSERVACIONES DE CAMPO**: Instrument Serif italic 12px, `rgba(180,210,160,0.48)` — estas son las únicas frases en primera persona de todo el sitio. Son las notas escritas a mano.
- **ESTADO**: badge pequeño. "abierto" = borde 0.5px `rgba(80,160,100,0.25)`, texto `--text-dim`. "pendiente" = borde dashed, todo más atenuado.

---

### BLOQUE 3 — Metodología

Título de sección: `METODOLOGÍA Y CONDICIONES DE CAMPAÑA`
7px, letter-spacing 0.3em, uppercase, `--text-faint`.
Línea separadora de 0.5px debajo.

Tres columnas (grid 3×1, gap 1px, fondo de gaps `rgba(80,160,100,0.07)`):

**Col 1 — Equipamiento**
```
Instrumento: sin especificar
Resolución: variable
Condiciones: disponibles
Protocolo: observación directa
```

**Col 2 — Criterios de clasificación**
```
Método: afinidad composicional
Escala: 1:∞
Datum vertical: sensación
Referencia: ninguna externa
```

**Col 3 — Limitaciones conocidas**
```
Cobertura: parcial
Repetibilidad: baja
Sesgo del operador: confirmado
Revisión externa: no realizada
```

Cada columna: fondo `--bg-surface`, padding 1rem, sin border-radius. Todo Space Mono 8–9px, `--text-muted`, line-height 2.

---

### BLOQUE 4 — Histograma de densidad (equivale al scatter map anterior)

Título: `DISTRIBUCIÓN DE EXPOSICIONES — HISTOGRAMA ACUMULADO`
7px, uppercase, `--text-faint`.

Misma lógica del scatter map: grid 20×8, 38% activo aleatorio al montar (useEffect + Fisher-Yates shuffle). Colores en verde.

Debajo del grid, una línea de "leyenda técnica":
```
■ exposición registrada     □ sin registro     n total: variable     intervalo: no uniforme
```
8px, `--text-faint`.

---

### BLOQUE 5 — Conclusiones preliminares

Título: `CONCLUSIONES PRELIMINARES — SUJETO A REVISIÓN`
7px, uppercase, `--text-faint`.

Tres items con numeración técnica (01., 02., 03.) seguidos de texto:

```
01.  Las unidades clasificadas no representan la totalidad del registro.
     La presente documentación refleja el estado parcial de la campaña.

02.  La relación entre unidades es composicional, no estratigráfica.
     El orden de presentación no implica jerarquía ni secuencia temporal.

03.  [Instrument Serif italic] el archivo no está terminado.
     nunca lo estará. esa es la condición de trabajo.
```

Space Mono 9px para los textos normales, Instrument Serif italic 12px para el item 03.

---

### BLOQUE 6 — Pie de informe

Línea doble horizontal (igual que el encabezado).

Tres columnas en flex, space-between:

**Izquierda:**
```
DB_archives_v2
Operador de campo: [iniciales]
Revisión: v∞ — sin fecha de cierre
```

**Centro:**
```
Este documento es de carácter preliminar.
No reproducir sin autorización del operador.
Clasificación: uso interno.
```

**Derecha (3 cajitas técnicas, gap 1px):**
- `ESCALA` / `1:∞`
- `HOJA` / `1 / ∞`
- `ESTADO` / `activo`

Todo 7–8px, Space Mono, `--text-faint`.

---

## Tipografía — reglas estrictas

- **Space Mono** para absolutamente todo el UI: labels, tablas, encabezados, metadata, valores
- **Instrument Serif italic** exclusivamente para:
  - Las observaciones de campo en la tabla (columna "observaciones")
  - El párrafo 2 del resumen ejecutivo
  - El item 03 de conclusiones
  - Cualquier frase en primera persona — como si alguien hubiera escrito a mano sobre el informe impreso
- Tamaños: 7px (metadata burocrática), 8–9px (texto de tablas y bloques), 10px (párrafos corridos), 12–13px (Instrument Serif solamente)
- Letter-spacing uppercase: 0.2em–0.3em siempre
- **Nunca** usar font-weight mayor a 700. Solo 400 y 700.

---

## Animaciones de entrada

Cada bloque entra con `opacity: 0 → 1` + `translateY(6px → 0)`, duration 0.5s, easing `ease`.
Delays escalonados de 60ms entre bloques: 0, 60, 120, 180, 240, 300, 360ms.

---

## Datos editables — exponer como constantes al tope del archivo

```ts
const AUTHOR = {
  initials: "DB",           // cambiar por iniciales reales
  startYear: "2019",        // año de inicio de la práctica fotográfica
  lat: "",                  // dejar vacío o coordenadas reales
  lon: "",
};

const SAMPLES = [
  {
    id: "DB-001",
    unit: "luz disponible",
    lithology: "Material de baja cohesión. Alta sensibilidad a condiciones de iluminación ambiente. Textura variable. Granulometría fina a media.",
    observation: "depende de lo que ya estaba ahí antes de llegar",
    status: "abierto",
  },
  {
    id: "DB-002",
    unit: "interiores",
    lithology: "Unidad de alta presión confinante. Estructuras de compresión visibles. Escasa movilidad de fluidos.",
    observation: "el espacio como agente, no como escenario",
    status: "abierto",
  },
  {
    id: "DB-003",
    unit: "tránsito",
    lithology: "Superficie de transporte activo. Inconformidad basal con unidad subyacente. Evidencia de erosión lateral.",
    observation: "nada permanece lo suficiente como para ser estudiado in situ",
    status: "abierto",
  },
  {
    id: "DB-004",
    unit: "figuras",
    lithology: "Remanente erosional. Resistencia diferencial respecto a la matriz. Morfología preservada por contraste litológico.",
    observation: "lo que sobrevive al corte define la forma",
    status: "abierto",
  },
  {
    id: "DB-005",
    unit: "horizonte",
    lithology: "Superficie de contacto entre formaciones. Discontinuidad composicional marcada. Plano de referencia.",
    observation: "la línea no es el límite — es el argumento",
    status: "abierto",
  },
  {
    id: "DB-006",
    unit: "[sin clasificar]",
    lithology: "Litología indeterminada. Muestra en proceso de descripción. No incluir en interpretación preliminar.",
    observation: "—",
    status: "pendiente",
  },
];
```

---

## Lo que NO debe aparecer en ningún lado

- La palabra "portfolio", "galería", "gallery", "fotografía" o "photography"
- Ningún ícono de cámara ni referencia visual obvia a fotografía
- Ningún componente tipo "hero image" o "cover"
- Sombras, gradientes, glow, ni efectos decorativos
- Inter, Roboto, ni fonts del sistema
- Ningún botón que diga "ver más" o "explorar" — si hay navegación, que sea numérica o por código de muestra
- Nada que "presente" el trabajo — el informe simplemente existe

