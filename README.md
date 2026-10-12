# ASTRO Match

Autor: **Brainiac X** · Organización: [ExpertosTI](https://github.com/ExpertosTI) · Repositorio: [ExpertosTI/AstroMATCH](https://github.com/ExpertosTI/AstroMATCH)

La app de la convención, aparte del landing. El landing de ASTRO SDQ 5TO sigue en su propio despliegue. Esta app se ve con la misma marca y vive en otro contenedor.

Este repositorio es el tablero de trabajo con diseño. Aquí se deja cada pieza visual con el nombre exacto, y aquí se ve qué falta.

## Qué es la app

Teléfono de 390 × 844. Fondo void, grano y dos brillos. Tipografía de título: Climax. Tipografía de interfaz: Gotham Medium.

Cuatro pantallas después de entrar:

| Pantalla | Qué ve la persona | Qué pone diseño |
|---|---|---|
| Entrada | Logo, máquinas, lockup, “El quinto elemento”, Google, Apple, WhatsApp | Toda la escena. Lista en `piezas/entrada/` |
| WhatsApp | Número y código de 6 dígitos | Nada nuevo. Usa la atmósfera de la entrada |
| Inicio | Match, Noticias, Evento 2027 y las noticias del día | Ilustración de la tarjeta Match y dos iconos |
| Evento | Fechas, Sambil, texto de la edición, stands Premium y Doble | Sello o marca del stand, si hace falta |
| Noticias | Tres notas: quinta edición, sede, Match | Viñeta por nota, si hace falta |
| Match | Descubre, match, coordina | La pieza principal de esta app. Lista en `piezas/match/` |

Los textos ya están escritos. Diseño no los reescribe. Los cambia el panel, igual que en el sitio de ASTRO.

## Cómo entregar una pieza

1. Abre la carpeta de la pantalla.
2. Lee el `LEEME.md` de esa carpeta: medida, formato y qué no puede faltar.
3. Exporta el archivo **con el nombre que pide el leeme**. Si el nombre cambia, la app no lo encuentra.
4. Sustituye el archivo. No crees una copia `logo-final-v3.png`.
5. En `piezas/estado.json`, pasa esa pieza de `pendiente` a `listo`.
6. Abre un pull request. Título: la pantalla y la pieza. Ejemplo: `Entrada · rotativa`.

PNG con fondo transparente, o WebP. El negro del arte va calado, no pintado de `#0F0707`. A 2× del tamaño que se ve en el teléfono.

## Qué no va en este repo

- Claves, `.env`, contraseñas del panel.
- La familia completa de Gotham. Es Adobe Fonts. Aquí solo se nombra. El archivo de interfaz que ya usa la app es Gotham Medium.
- El landing. Otro repositorio, otro despliegue.

## Colaborar

La forma de trabajar, el progreso y la edición en vivo están en [docs/colaboracion.md](docs/colaboracion.md). Es el mismo gesto que ya tiene la portada de ASTRO: `/?editar`, mover, guardar, y lo ve todo el mundo.

## Mapa

```
piezas/entrada/     escena del teléfono
piezas/app/         iconos y tarjeta del inicio
piezas/match/       lo que el diseñador agrega a Match
piezas/estado.json  pendiente o listo
docs/pantallas.md   qué hay en cada pantalla, texto incluido
docs/marca.md       color, tipo, corte
docs/colaboracion.md
marca/tokens.json   valores que usa el código
```
