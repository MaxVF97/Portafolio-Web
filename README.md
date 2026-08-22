# Portfolio — Maximiliano Vargas Franco

Página web personal de una sola vista (*one-page*) que presenta mi perfil profesional: soporte de campo e infraestructura crítica (cajeros automáticos / ATMs, redes, sistemas bancarios) y mi formación autodidacta como desarrollador web, apoyada en asistentes de IA (Claude y Gemini).

**Demo publicada:** https://claude.ai/code/artifact/ea56de77-9c18-441e-9416-8928e9f09cdd

## Tecnologías

Sitio construido **100% con HTML5, CSS3 y JavaScript puro (vanilla)** — sin frameworks (no usa React, Vue, etc.), sin librerías externas de JS y sin herramientas de build (no hay `npm`, Webpack, ni paso de compilación). Es HTML/CSS/JS plano que corre directamente en el navegador.

| Parte | Detalle |
|---|---|
| Estructura | HTML5 semántico (`<nav>`, `<section>`, `<footer>`), una sola página con anclas internas (`#inicio`, `#perfil`, `#stack`, `#experiencia`, `#proyecto`, `#contacto`) |
| Estilos | CSS3 puro: variables personalizadas (`:root` / custom properties) para el sistema de color y tipografía, CSS Grid y Flexbox para el layout, `@keyframes` para animaciones, media queries para diseño responsivo y para `prefers-reduced-motion` |
| Tipografía | Google Fonts: **Sora** (títulos), **Karla** (texto), **IBM Plex Mono** (acentos tipo terminal/código) |
| Interactividad | JavaScript vanilla (ES5, sin frameworks), organizado en un único IIFE (función auto-invocada) en `js/script.js` |
| Íconos | SVG inline escritos a mano (sin librería de íconos) |

## Qué hace el JavaScript

Todo el comportamiento dinámico de la página está escrito a mano en `js/script.js`, sin dependencias externas:

- **Navegación con scroll-spy**: un listener del evento `scroll` calcula qué sección está visible comparando `window.scrollY` contra la posición (`offsetTop`) de cada `<section>`, y resalta el link correspondiente en el menú.
- **Efecto de máquina de escribir**: el texto bajo el nombre (roles como "Ingeniero en Informática", "Infraestructura Crítica & ATMs"...) se escribe y borra letra por letra usando `setTimeout` en bucle.
- **Tokens flotantes**: elementos de texto tipo terminal (`ping -t 8.8.8.8`, `SLA: 99.9%`, `git push origin main`, etc.) se crean dinámicamente con `document.createElement` y suben por la pantalla animados con CSS (`@keyframes rise`), reciclándose cuando termina su animación.
- **Fondo de red de partículas**: un `<canvas>` en el héroe dibuja puntos que se mueven y se conectan con líneas cuando están cerca, usando la API Canvas 2D (`getContext('2d')`) y `requestAnimationFrame` para animar cuadro a cuadro.
- **Accesibilidad**: toda animación se desactiva automáticamente si el sistema del usuario tiene activado "reducir movimiento" (`prefers-reduced-motion`).

No hay llamadas a APIs externas ni almacenamiento de datos — es una página completamente estática del lado del cliente.

## Estructura del proyecto

```
repo-portfolio-web/
├── index.html      # Marcado (HTML) de toda la página
├── css/
│   └── style.css   # Todos los estilos (variables, layout, animaciones, responsivo)
├── js/
│   └── script.js   # Toda la lógica interactiva (nav, typewriter, tokens, canvas)
└── README.md
```

