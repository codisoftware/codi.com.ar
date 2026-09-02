# Codi · rediseño

Sitio estático, sin build ni dependencias: se sirve tal cual desde GitHub Pages.

## Qué hay acá

| Ruta | Qué es |
|---|---|
| `index.html` | La home. Es la única página escrita a mano. |
| `industrias/<rubro>/` | Las seis industrias. **Generadas.** |
| `plataforma/`, `estudio/`, `apps/` | Las tres de producto. **Generadas.** |
| `assets/css/main.css` | Todo el sistema visual. |
| `assets/js/main.js` | Los agentes de píxeles, el recorrido y el formulario. |
| `contenido/*.mjs` | El texto de las páginas generadas. |
| `scripts/generar.mjs` | El molde que las arma. |

## Las páginas internas no se editan a mano

Nueve páginas comparten menú, pie y sistema visual. Escritas a mano se
desincronizan en una semana: alcanza con que alguien toque un link del menú en
una sola y se olvide de las otras ocho.

Para cambiar un texto se edita `contenido/industrias.mjs` o
`contenido/plataforma.mjs`, y después:

```bash
node scripts/generar.mjs
```

No necesita `npm install`: usa sólo Node.

## El formulario

Está al final de la home y de las nueve páginas internas, y viaja con el
origen: una consulta que sale de `/industrias/banca/` llega con el asunto
*"Consulta desde Banca"*.

Postea a [Web3Forms](https://web3forms.com) y el mail llega a
`info@codi.com.ar`. La clave vive en `assets/js/main.js` (constante
`CLAVE_ENVIO`); si se vacía, el formulario vuelve a caer en un `mailto`.

⚠️ **La clave de Web3Forms es pública por diseño** (va en el JS del navegador).
Para que nadie la use desde otro lado, conviene restringir el dominio a
`codi.com.ar` en el panel de Web3Forms. El plan gratuito son 250 envíos por mes.

### Antispam

Del lado del navegador van dos capas: un campo trampa que una persona nunca
completa y un control de tiempo (menos de tres segundos es un bot). **Las dos
responden como si el envío hubiera funcionado**: avisarle a un bot que lo
detectaste le da la pista para ajustar el patrón.

Las otras capas (límite por IP, filtro de contenido y registro del origen) van
del lado del servidor y todavía no existen, porque no hay endpoint propio.

## Detalles que conviene no romper

- **El SVG del camino en "cómo trabajamos" escala parejo.** Si se le vuelve a
  poner `preserveAspectRatio="none"`, el patrón de guiones se deforma distinto
  que el largo del path y aparece un tramo de línea suelto a la derecha.
- **El texto que se escribe letra por letra vive entero en el HTML** y recién se
  parte al activarse. Si se genera desde JavaScript, el prerender y los
  buscadores ven tarjetas vacías.
- **El puntero propio sólo se activa donde hay mouse de verdad**
  (`hover: hover`), y sobre los campos de texto vuelve el cursor nativo.
- Nada de rayas dobles en los textos.
