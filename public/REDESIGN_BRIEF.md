# INSTRUCCIONES DE REDISEÑO — DB_ARCHIVES_V2
## Para: Antigravity  
## De: DB  
## Operación: Reset completo. Construye desde cero.

---

## CONCEPTO VISUAL

El sitio es un portafolio fotográfico. El nuevo diseño abandona completamente la estética de "archivo/terminal" oscura. El nuevo lenguaje visual es:

**Estética cianotipo**: azules prusianos y cyan sobre fondo crema/ivory, como una impresión fotográfica cianotipo sobre papel.  
**Tipografía rota**: mezcla intencional de tamaños, pesos y alineaciones. Algunas palabras caídas, otras gigantes. Texto que respira y colapsa al mismo tiempo.  
**Sensación**: artsy, editorial, analógico-digital. Como si una impresión de laboratorio fotográfico hubiera sido escaneada y subida a internet.

---

## PALETA DE COLORES

```css
--cream:        #F5F0E8;   /* fondo principal */
--cream-dark:   #EDE8DC;   /* fondo secundario / cards */
--blue-prussian:#1B3A6B;   /* texto principal, headers */
--blue-mid:     #2E5FA3;   /* subtítulos, acentos */
--blue-cyan:    #5B9BD5;   /* highlights, hover states */
--blue-light:   #A8C8E8;   /* texto secundario, decoración */
--blue-ghost:   #D4E5F5;   /* fondos alternativos, bordes suaves */
```

---

## TIPOGRAFÍA

Usa **dos fuentes únicamente**. Impórtalas desde Google Fonts:

1. **"DM Serif Display"** — para el título principal `DB_ARCHIVES_V2` y los nombres de sección. Grande, serifada, con carácter.
2. **"IBM Plex Mono"** — para todo lo demás: subtítulos, cuerpo, metadata, labels. Monoespaciada, computarizada, limpia.

**Reglas tipográficas especiales:**
- El título principal debe ser ENORME (clamp entre 60px y 140px). Que ocupe espacio.
- Algunas palabras del título pueden estar en líneas separadas, con sangría irregular.
- Los labels de sección (`PROYECTOS`, `ARCHIVOS`, etc.) deben ser pequeños, en mayúsculas, con letter-spacing amplio, en `IBM Plex Mono`.
- Mezcla intencionalmente tamaños: un subtítulo puede ser 11px y el siguiente 48px. No seas uniforme.
- Permite que el texto se salga de las columnas. Permite el overflow visible.

---

## LAYOUT / ESTRUCTURA

### HEADER
- Fondo: `--cream`
- El nombre **DIEGO BRAVO NILO** en DM Serif Display, enorme, centrado o ligeramente descentrado.
- Debajo, en IBM Plex Mono pequeño y espaciado: la metadata (versión, ubicación, contacto, social).
- La metadata NO debe estar en una sola línea ordenada. Distribúyela de forma asimétrica: algunas cosas a la izquierda, otras a la derecha, alguna centrada, con diferentes tamaños.

### NAVEGACIÓN
- Sin navbar convencional.
- Los ítems de navegación (`PROYECTOS`, `ARCHIVOS`) deben ser texto inline, distribuidos en el espacio, como anotaciones.
- Hover: el texto se tiñe de `--blue-cyan` con una pequeña subrayado manual (no el default del browser).

### SECCIÓN PROYECTOS
- Título de sección: `PROYECTOS` en IBM Plex Mono, pequeño, letra espaciada, color `--blue-mid`.
- Descripción: "Repertorio de mis trabajos fotográficos más destacados: desde eventos sociales hasta fotografía comercial y editorial." — en IBM Plex Mono, tamaño mediano, color `--blue-prussian`.
- Los proyectos se muestran como una grilla irregular. No uses un grid uniforme. Algunas tarjetas más anchas, otras más angostas.

### SECCIÓN ARCHIVOS (antes "DB_ARCHIVES_V2")
- Mantén el espíritu: es un registro, una colección.
- Título: `DB_ARCHIVES_V2` en DM Serif Display, grande, con una ligera rotación (-1deg o +1deg).
- La frase poética **"Donde sea que vas, Sigue la luz."** se mantiene, en itálica DM Serif Display, tamaño mediano, color `--blue-mid`.
- La tabla de muestras (DB-001 a DB-004) se convierte en una lista con layout caótico: cada ítem en una posición ligeramente diferente, alternando alineación izquierda/derecha, con separadores horizontales irregulares.

### FOOTER / CIERRE
- Minimal. Solo: coordenadas geográficas (LAT/LON), el año, y la frase en IBM Plex Mono tamaño 10px.

---

## EFECTOS Y TEXTURAS

- **Grain/ruido**: aplica un filtro SVG de ruido suave sobre el fondo crema. No mucho, solo lo suficiente para que no se vea digital-limpio.
- **Bordes irregulares**: usa `border-radius` asimétrico o clip-path en algunas secciones para romper la rectangularidad.
- **Elementos decorativos en azul claro**: líneas finas horizontales (`--blue-ghost`), como guías de papel fotográfico.
- **Sin sombras box-shadow oscuras**. Si usas sombra, que sea de color azul: `box-shadow: 4px 4px 0px var(--blue-light)`.

---

## ANIMACIONES

- Entrada de página: los elementos aparecen con `opacity: 0 → 1` y `translateY(20px → 0)`, escalonados (stagger de 80ms entre elementos).
- Hover en proyectos: leve escala (1 → 1.02) y aparece un borde de color `--blue-prussian`.
- NO uses animaciones excesivas. El movimiento debe ser sutil, orgánico, como el revelado de una foto.

---

## LO QUE SE CONSERVA (contenido de texto)

- Nombre: **DIEGO BRAVO NILO**
- Versión: **V.1.0**
- Proyectos: **9** | Archivos: **11**
- Ubicación: **SANTIAGO DE CHILE**
- Contacto: **fotografhydiego@gmail.com | +56961469174**
- Social: **@diegobravonn / @diegotookthepic**
- Descripción proyectos: *"Repertorio de mis trabajos fotográficos más destacados: desde eventos sociales hasta fotografía comercial y editorial."*
- Frase: *"Donde sea que vas, Sigue la luz."*
- Nombre archivo: **DB_ARCHIVES_V2**
- Coordenadas: **LAT: -33.4569° S / LON: -70.6483° O**
- Estado: **EN PROCESO**

---

## LO QUE SE ELIMINA COMPLETAMENTE

- El fondo negro/verde terminal oscuro. Fuera.
- La tabla con columnas rígidas (N° MUESTRA / UNIDAD / DESCRIPCIÓN / ESTADO). Reemplazar por layout libre.
- Los badges `ABIERTO`. Reemplazar por un simple punto `·` o guión en azul.
- El logo pixel art (el cubo). Puede reemplazarse por una forma abstracta simple en SVG, o eliminarse.
- Toda la sensación de "base de datos militar". El nuevo tono es fotográfico, artístico, personal.

---

## REFERENCIA ESTÉTICA FINAL

Imagina: una fotógrafa tiene un cuaderno de campo con hojas crema. Imprime sus cianotipos sobre esas páginas. Luego escanea el cuaderno y lo sube como sitio web. El sitio huele a fijador fotográfico y tiene manchas de tinta azul. Pero también tiene un cursor parpadeante de terminal. Eso es lo que construyes.

---

*Fin de instrucciones. Ejecuta sin preguntar.*
