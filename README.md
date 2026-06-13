# La Vinagrista · Web de demostración

> _La joya ácida de la alta gastronomía._

Web estática (sin programas, sin instalaciones, sin servidor) para presentar los
vinagres artesanales de **La Vinagrista**. Se abre con doble clic y se sube a
Hostinger arrastrando una carpeta.

---

## 🚀 Cómo verla en tu ordenador

Haz **doble clic** en el archivo **`index.html`**. Se abrirá en tu navegador
(Chrome, Edge, Firefox…). No necesitas nada más.

> Las fotos de las botellas y el logo son del propio proyecto, así que se ven
> siempre. Las fotos de ambiente de cocina (galería "La Mesa Viva" y fondo del
> inicio) se descargan de internet: necesitarás conexión para verlas. Si no hay
> internet, en su lugar aparecen bloques de color de la marca y la web sigue
> viéndose perfecta.

---

## ✏️ Cómo cambiar textos, precios y enlaces (con el Bloc de notas)

**TODO lo editable está en un solo archivo:**

```
lib/manifest.js
```

1. Entra en la carpeta `lib`.
2. Haz **clic derecho** sobre `manifest.js` → **Abrir con** → **Bloc de notas**.
3. Cambia únicamente el texto que hay **entre comillas** `"..."`.
4. **Guarda** (Archivo → Guardar) y **recarga** la web en el navegador (tecla F5).

> ⚠️ Regla de oro: no borres las comillas `"`, ni las comas `,`, ni los corchetes
> `{ }` `[ ]`. Solo cambia las palabras de dentro de las comillas.

### Ejemplos rápidos

**Cambiar el eslogan:**
```js
eslogan: "La joya ácida de la alta gastronomía.",
```

**Poner un precio y activar el botón de compra de una botella:**
```js
precio: "16,00 €",      // escribe el precio entre comillas
disponible: true,        // cambia false por true para activar el botón
```
> Mientras `disponible` esté en `false`, el botón muestra la etiqueta
> "Próximamente" (modo demostración).

**Cambiar las notas de cata o el maridaje:**
```js
notas: "Luminoso, equilibrado, con una acidez limpia...",
maridaje: "Ideal para pescados grasos, ostras del Delta...",
```

**Recibir las consultas del formulario por WhatsApp:**
```js
whatsapp: "34666555444",   // tu número con prefijo (34) y SIN espacios ni signos
```
> Si lo dejas vacío (`whatsapp: ""`), el formulario abrirá el correo electrónico
> que pongas en `email`.

**Cambiar el Instagram:**
```js
instagram: "https://instagram.com/lavinagrista",
```

---

## 🖼️ Cómo cambiar las imágenes de las botellas

Las fotos están en la carpeta **`Imagenes/`**:

| Botella              | Archivo               |
|----------------------|-----------------------|
| Blanco de Garnacha   | `Imagenes/Blanco.jpg` |
| Negro de Garnacha    | `Imagenes/Negreo.jpg` |
| Arroz del Delta      | `Imagenes/Arroz.jpg`  |
| Naranja del Delta    | `Imagenes/Naranja.jpg`|
| Logotipo (cabecera)  | `Imagenes/Logo.jpg`   |
| Sello redondo        | `Imagenes/Logo2.jpg`  |

**Para sustituir una foto** sin tocar nada de código: borra la imagen antigua y
copia la nueva en la carpeta `Imagenes/` **con el mismo nombre** de archivo.

> 💡 Consejo: las fotos de las botellas funcionan mejor con **fondo blanco**.
> La web "recorta" el blanco automáticamente para fundir la botella con el color
> de cada bloque.

Si quieres usar otro nombre de archivo, cámbialo también en `lib/manifest.js`
(campo `imagen:` de cada botella).

---

## ☁️ Cómo subirla a Hostinger

1. Entra en tu panel de Hostinger → **Administrador de archivos** (o por FTP).
2. Abre la carpeta **`public_html`**.
3. **Arrastra dentro** todo el contenido de esta carpeta del proyecto:
   - `index.html`
   - la carpeta `Imagenes/`
   - la carpeta `lib/`
   - la carpeta `assets/`
4. Listo: tu web estará en tu dominio.

> La carpeta `.claude` (si existe) es solo una ayuda interna para previsualizar
> durante el desarrollo. **No hace falta subirla**, pero tampoco molesta si lo haces.

---

## 📁 Qué hay en cada carpeta

```
Web vinagrista/
├── index.html              ← la página (no necesitas tocarla)
├── README.md               ← este manual
├── lib/
│   └── manifest.js         ← 📝 TEXTOS, PRECIOS Y ENLACES (edítalo aquí)
├── assets/
│   ├── css/styles.css      ← diseño y colores (avanzado)
│   └── js/main.js          ← animaciones (no tocar)
└── Imagenes/               ← 🖼️ logo y fotos de las botellas
```

---

## 🔮 Preparada para vender en el futuro

La estructura ya está lista para activar las comandas/compras cuando quieras:
solo habrá que poner los precios, cambiar `disponible: true` y conectar el botón
"Añadir a Comanda" con la pasarela de pago. No hay que rehacer la web.

---

## ❓ Notas técnicas

- Idioma: **español de España**.
- 100 % estática: HTML + CSS + JavaScript, **sin build, sin npm, sin servidor**.
- Animaciones hechas a medida en JavaScript puro (sin librerías externas), para
  que funcione sin conexión y abriéndola con doble clic.
- Tipografías premium (Fraunces + Plus Jakarta Sans) cargadas desde Google Fonts;
  si no hay internet, se usan fuentes elegantes del sistema.
- Las fotos de ambiente son de **Unsplash** (licencia libre). Puedes cambiarlas
  por las tuyas en `lib/manifest.js`.

© 2026 La Vinagrista · Web de demostración.
