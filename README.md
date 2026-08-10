# codi.com.ar

Sitio institucional estático de Codi — IA aplicada a las operaciones de la empresa.

Hosting: GitHub Pages (CNAME `codi.com.ar`). Deploy: push a `main`.

## Estructura

- `index.html` — Home
- `plataforma/` — Overview de la plataforma
- `estudio/` — Codi Studio
- `apps/` — Apps a medida
- `implementacion/` — Modelo de implementación
- `transformacion/` — Transformación AI
- `industrias/` — Banca, Telecom, Salud, Energía, Seguros, Retail
- `nosotros/`, `contacto/`
- `assets/css/main.css` — sistema de diseño (paleta: `#37a4dc`, `#282828`, blanco)
- `assets/js/main.js` — menú mobile y animaciones on-scroll
- `assets/img/` — logo, favicons, íconos

## Contacto

El formulario de `/contacto/` compone un `mailto:info@codi.com.ar`.
Para migrarlo a Formspree: cambiar el handler `data-contact-form` en `assets/js/main.js` por un POST al endpoint.
