# La Vinagrista · Web de demostración

> _La joya ácida de la alta gastronomía._

Web estática (sin programas, sin instalaciones, sin servidor). Todos los archivos
están en **una sola carpeta**, así que se pueden seleccionar todos y subir de una vez.

---

## 🚀 Cómo verla en tu ordenador

Haz **doble clic** en el archivo **`index.html`**. Se abrirá en tu navegador. No
necesitas nada más.

> Las fotos de las botellas, el logo y la foto de los fundadores van incluidas en
> la carpeta, así que se ven siempre. Las fotos de ambiente (galería "La Mesa Viva")
> se descargan de internet: para verlas necesitas conexión. Si no hay internet, en
> su lugar aparecen bloques de color de la marca y la web sigue viéndose perfecta.

---

## ☁️ Cómo subirla (Hostinger, GitHub, Netlify…)

**Importante:** hay que subir **TODOS los archivos juntos**, no solo el `index.html`.
Si subes solo el `index.html`, la web se verá "en bruto" (sin diseño), porque le
faltan el resto de archivos.

1. Abre esta carpeta del proyecto.
2. **Selecciona todos los archivos** (Ctrl + E, o Ctrl + clic en cada uno):
   `index.html`, `styles.css`, `main.js`, `manifest.js`, `.nojekyll` y todas las
   imágenes (`Logo.jpg`, `Logo2.jpg`, `Fundadores.jpg`, `Blanco.png`, `Negro.png`,
   `Arroz.png`, `Naranja.png`).
3. Súbelos todos a la vez a tu hosting (a la carpeta `public_html` en Hostinger, o
   al repositorio en GitHub).
4. Listo: la web ya se verá con su diseño.

> 💡 La forma más rápida de conseguir un enlace para el cliente: entra en
> **app.netlify.com/drop** y arrastra la carpeta entera; te da un enlace al instante.

---

## ✏️ Cómo cambiar textos, precios y enlaces (con el Bloc de notas)

**TODO lo editable está en un solo archivo:**

```
manifest.js
```

1. Haz **clic derecho** sobre `manifest.js` → **Abrir con** → **Bloc de notas**.
2. Cambia únicamente el texto que hay **entre comillas** `"..."`.
3. **Guarda** (Archivo → Guardar) y **recarga** la web en el navegador (tecla F5).

> ⚠️ Regla de oro: no borres las comillas `"`, ni las comas `,`, ni los corchetes
> `{ }` `[ ]`. Solo cambia las palabras de dentro de las comillas.

### Ejemplos rápidos

**Cambiar el nombre que aparece grande en la portada o el eslogan:**
```js
nombre: "La Vinagrista",
eslogan: "La joya ácida de la alta gastronomía.",
```

**Poner un precio y activar el botón de compra de una botella:**
```js
precio: "16,00 €",      // escribe el precio entre comillas
disponible: true,        // cambia false por true para activar el botón
```
> Mientras `disponible` esté en `false`, el botón muestra "Próximamente" (modo demo).

**Recibir las consultas del formulario por WhatsApp:**
```js
whatsapp: "34666555444",   // tu número con prefijo (34) y SIN espacios ni signos
```
> Si lo dejas vacío (`whatsapp: ""`), el formulario abrirá el correo de `email`.

---

## 🖼️ Cómo cambiar las imágenes

Las imágenes están **en la misma carpeta**, con estos nombres:

| Elemento             | Archivo          |
|----------------------|------------------|
| Logotipo (cabecera)  | `Logo.jpg`       |
| Sello / monograma    | `Logo2.jpg`      |
| Foto de fundadores   | `Fundadores.jpg` |
| Blanco de Garnacha   | `Blanco.png`     |
| Negro de Garnacha    | `Negro.png`      |
| Arroz del Delta      | `Arroz.png`      |
| Naranja del Delta    | `Naranja.png`    |

**Para sustituir una imagen** sin tocar código: borra la antigua y copia la nueva
en la carpeta **con el mismo nombre** de archivo.

> 💡 Las botellas son imágenes `.png` con fondo transparente. Si las cambias, usa
> también PNG sin fondo para que queden integradas.

---

## 📁 Qué hay en la carpeta

```
index.html        ← la página (no necesitas tocarla)
manifest.js       ← 📝 TEXTOS, PRECIOS Y ENLACES (edítalo aquí)
styles.css        ← diseño y colores (avanzado)
main.js           ← animaciones (no tocar)
.nojekyll         ← archivo técnico para que GitHub muestre la web bien
README.md         ← este manual
Logo.jpg · Logo2.jpg · Fundadores.jpg     ← logo y equipo
Blanco.png · Negro.png · Arroz.png · Naranja.png   ← botellas
```

---

## 🔮 Preparada para vender en el futuro

La estructura ya está lista para activar las comandas/compras: solo habrá que poner
los precios, cambiar `disponible: true` y conectar el botón "Añadir a Comanda" con la
pasarela de pago. No hay que rehacer la web.

© 2026 La Vinagrista · Web de demostración.
