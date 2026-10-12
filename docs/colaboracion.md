# Cómo colaboramos

Autor del método: Brainiac X. Sirve para ASTRO Match y para el siguiente proyecto, sin inventar otra herramienta.

Hay tres capas. Cada una responde una pregunta distinta.

## 1. Piezas y progreso — este repositorio

Pregunta: ¿qué archivo falta y quién lo dejó?

- Una carpeta por pantalla.
- Un nombre fijo por archivo.
- `piezas/estado.json` es el tablero: `pendiente` o `listo`.
- El diseñador entrega con un pull request. El diff muestra la imagen. El comentario del PR dice qué pantalla toca.
- Brainiac X revisa y mezcla. No se sube directo a `main`.

Así se comparte el archivo y el avance. No hace falta un chat aparte para saber qué está puesto.

## 2. Edición en vivo — el mismo editor de ASTRO

Pregunta: ¿cómo se ve ya montado, sin esperar un deploy de código?

En la portada de ASTRO SDQ esto ya existe:

1. Se abre el sitio con `/?editar`.
2. Se mueven, se giran y se ocultan las piezas en el teléfono.
3. **Guardar en el panel** pide la clave de edición y publica el layout.
4. Quien entre después lo ve. El mensaje del editor es: “Guardado. Ya lo ve todo el mundo.”

Eso no son dos cursores a la vez. Es un tablero: una persona compone, guarda, y la escena queda pública. El borrador vive en el teléfono hasta que se guarda. La clave no se escribe en el repo ni en el chat del PR.

Para Match repetimos ese gesto, no otro editor:

- Misma marca de URL: `?editar`.
- Misma clave, guardada solo en el servidor.
- Mismo botón: guardar en el panel.
- Las piezas que el diseñador deje en este repo son las que el editor puede mover.

Cuando Match tenga su URL de prueba, el diseñador compone ahí. Brainiac X no tiene que recibir un JSON por mensaje: el botón ya lo escribe en el panel, como `portada_layout` en ASTRO.

## 3. Textos — el panel

Pregunta: ¿quién cambia una fecha, un precio o una noticia?

El panel (Directus) del sitio ASTRO. Diseño no abre el código para cambiar “US$500” o el párrafo de la edición. Esos campos ya tienen dueño en el panel del VPS.

## Qué usar en cada caso

| Quiero… | Dónde |
|---|---|
| Dejar un PNG o un WebP nuevo | Carpeta de `piezas/` + pull request |
| Ver qué falta | `piezas/estado.json` |
| Mover lo que ya está en la pantalla y publicarlo | `?editar` y Guardar en el panel |
| Cambiar un texto, una fecha o un precio | Panel |
| Componer a cuatro manos, los dos a la vez | Figma. Al terminar, el archivo final entra por la capa 1, con el nombre fijo |

Figma no reemplaza este repo. Aquí queda la pieza con el nombre que la app espera. Figma es solo el momento en que dos personas mueven lo mismo al mismo tiempo. El editor de ASTRO es el momento en que esa pieza ya está en la app y se publica de un golpe.

## Proyectos que vengan después

Se copia esta carpeta, no se inventa un flujo nuevo:

1. `piezas/` con un `LEEME.md` por pantalla y `estado.json`.
2. `?editar` + Guardar en el panel, si la pantalla tiene piezas sueltas.
3. Panel para los textos.
4. Figma solo si hace falta componer en paralelo.

El README de cada proyecto dice quién es el autor y qué pantalla es de ese autor. En este, la app Match es de Brainiac X.
