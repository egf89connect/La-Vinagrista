/* ============================================================================
   LA VINAGRISTA · MOTOR DE LA WEB (vanilla JS, sin dependencias)
   Renderiza el contenido desde lib/manifest.js y activa las animaciones.
   No necesitas editar este archivo para cambiar textos (usa lib/manifest.js).
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var DATA = window.__LA_VINAGRISTA__ || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* Utilidades mini-DOM */
  function el(sel, ctx) { return (ctx || document).querySelector(sel); }
  function els(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  }); }
  // Degradados de marca para imágenes que no carguen (robusto en file:// y sin internet)
  var GRADS = [
    "linear-gradient(135deg,#EAC86F,#FF6B35)",
    "linear-gradient(135deg,#92142B,#FF6B35)",
    "linear-gradient(135deg,#4A7A46,#EAC86F)",
    "linear-gradient(135deg,#FF6B35,#92142B)"
  ];
  var gradI = 0;
  // Sustituye imágenes rotas por un degradado de marca para que nada se vea roto.
  // Para las botellas locales (mix-blend multiply) basta con ocultarlas.
  function fallback(img) {
    img.addEventListener("error", function () {
      if (img.classList.contains("slide__botella") || img.classList.contains("sello") ||
          img.hasAttribute("data-logo") || img.hasAttribute("data-splash-logo") ||
          img.hasAttribute("data-hero-mono")) {
        img.style.visibility = "hidden";
        return;
      }
      var host = img.closest(".img-marco, .tile") || img.parentNode;
      if (host) {
        host.style.background = GRADS[gradI++ % GRADS.length];
        host.style.minHeight = host.offsetHeight ? "" : "220px";
      }
      img.style.display = "none";
    });
  }

  /* Iconos SVG del proceso */
  var ICONS = {
    hoja: '<svg viewBox="0 0 24 24"><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z"/><path d="M5 19C9 14 12 11 17 8"/></svg>',
    gota: '<svg viewBox="0 0 24 24"><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/></svg>',
    reposo: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.2 2"/></svg>',
    botella: '<svg viewBox="0 0 24 24"><path d="M10 2h4v3l1.6 2.6A4 4 0 0 1 16 9.7V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9.7a4 4 0 0 1 .4-2.1L10 5Z"/><path d="M8 13h8"/></svg>'
  };

  /* ------------------------------------------------------------------ */
  /* RENDER · CABECERA + NAV                                             */
  /* ------------------------------------------------------------------ */
  function renderHeader() {
    var m = DATA.marca || {};
    var logo = el("[data-logo]");
    if (logo) { logo.src = m.logo || ""; logo.alt = (m.nombre || "Logo") + " logotipo"; fallback(logo); }
    var nav = el("[data-nav]");
    if (nav && DATA.navegacion) {
      nav.innerHTML = DATA.navegacion.map(function (n) {
        return '<a href="' + esc(n.ancla) + '" data-cursor="mirar">' + esc(n.etiqueta) + "</a>";
      }).join("");
    }
  }

  /* ------------------------------------------------------------------ */
  /* RENDER · HERO                                                       */
  /* ------------------------------------------------------------------ */
  function renderHero() {
    var h = DATA.hero || {};
    var m = DATA.marca || {};
    setText("[data-hero-kicker]", h.kicker);
    // Nombre de la marca como gran titular (con la tipografía del logo)
    var nombre = (m.nombre || "La Vinagrista").trim();
    var partes = nombre.split(" ");
    setText("[data-hero-marca-1]", partes.shift());
    setText("[data-hero-marca-2]", partes.join(" "));
    setText("[data-hero-tag]", h.tagline);
    var c1 = el("[data-hero-cta1]"), c2 = el("[data-hero-cta2]");
    if (c1 && h.ctaPrimario) {
      var l1 = el("[data-label]", c1); if (l1) l1.textContent = h.ctaPrimario.etiqueta;
      c1.setAttribute("href", h.ctaPrimario.ancla);
    }
    if (c2 && h.ctaSecundario) {
      var l2 = el("[data-label]", c2); if (l2) l2.textContent = h.ctaSecundario.etiqueta;
      c2.setAttribute("href", h.ctaSecundario.ancla);
    }
    // Monograma (Logo2) que se mueve por detrás del nombre
    var mono = el("[data-hero-mono]");
    if (mono) { mono.src = m.monograma || ""; mono.alt = ""; fallback(mono); }
  }

  /* ------------------------------------------------------------------ */
  /* RENDER · MARQUEE                                                    */
  /* ------------------------------------------------------------------ */
  function renderMarquee() {
    var track = el("[data-marquee]");
    if (!track || !DATA.marquee) return;
    var one = DATA.marquee.map(function (t) {
      return '<span class="marquee__item">' + esc(t) + "</span>";
    }).join("");
    track.innerHTML = one + one; // duplicado para bucle continuo
  }

  /* ------------------------------------------------------------------ */
  /* RENDER · MANIFIESTO                                                 */
  /* ------------------------------------------------------------------ */
  function renderManifiesto() {
    var m = DATA.manifiesto || {};
    setText("[data-mani-num]", m.numero);
    setText("[data-mani-titulo]", m.titulo);
    var p = el("[data-mani-parrafos]");
    if (p && m.parrafos) p.innerHTML = m.parrafos.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    var h = el("[data-mani-hitos]");
    if (h && m.hitos) h.innerHTML = m.hitos.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var imgs = el("[data-mani-imgs]");
    if (imgs && m.imagenes) {
      imgs.innerHTML = m.imagenes.map(function (src) {
        return '<div class="img-marco"><img src="' + esc(src) + '" alt="Paisaje de Batea y el Delta del Ebro" loading="lazy"></div>';
      }).join("");
      els("img", imgs).forEach(fallback);
    }
  }

  /* ------------------------------------------------------------------ */
  /* RENDER · TIENDA (cuadrícula de productos)                           */
  /* ------------------------------------------------------------------ */
  var CART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';

  function renderTienda() {
    var cont = el("[data-tienda]");
    if (!cont || !DATA.coleccion) return;
    var total = DATA.coleccion.length;
    cont.innerHTML = DATA.coleccion.map(function (b, i) {
      var idx = String(i + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
      var disp = !!b.disponible;
      var precio = b.precio || "";
      var boton = disp
        ? '<button class="btn-add" type="button" data-add="' + esc(b.id) + '" data-cursor="tastar">' + CART_ICON + 'Añadir</button>'
        : '<button class="btn-add is-proximamente" type="button" disabled>Próximamente</button>';
      return '' +
        '<article class="producto" data-reveal data-reveal-d="' + (i % 3) + '" style="--bloque:' + esc(b.color) + ';--acento:' + esc(b.acento) + '">' +
          '<div class="producto__media">' +
            '<span class="producto__numero">' + idx + '</span>' +
            '<img class="producto__img" src="' + esc(b.imagen) + '" alt="Botella ' + esc(b.nombre) + '" loading="lazy">' +
          '</div>' +
          '<div class="producto__body">' +
            '<h3 class="producto__nombre">' + esc(b.nombre) + '</h3>' +
            '<div class="producto__base">' + esc(b.base) + '</div>' +
            '<p class="producto__notas">' + esc(b.notas) + '</p>' +
            '<div class="producto__pie">' +
              '<span class="producto__precio">' + esc(precio) + '</span>' +
              boton +
            '</div>' +
          '</div>' +
        '</article>';
    }).join("");
    els(".producto__img", cont).forEach(fallback);
    els("[data-add]", cont).forEach(function (btn) {
      btn.addEventListener("click", function () { addToCart(btn.getAttribute("data-add")); });
    });
    // Tocar/clic en la imagen despliega la botella entera (en móvil y escritorio)
    els(".producto__media", cont).forEach(function (media) {
      media.addEventListener("click", function () {
        var card = media.closest(".producto");
        var abierto = card.classList.contains("is-open");
        els(".producto.is-open", cont).forEach(function (c) { c.classList.remove("is-open"); });
        if (!abierto) card.classList.add("is-open");
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* CARRITO DE COMPRA                                                   */
  /* ------------------------------------------------------------------ */
  var CART_KEY = "lv_cart";
  var cart = {};
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { cart = {}; }

  function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }
  function productoPorId(id) {
    var list = DATA.coleccion || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  // "13,50 €" -> 13.5
  function parsePrecio(str) {
    if (!str) return 0;
    var n = String(str).replace(/[^\d,.]/g, "").replace(/\.(?=\d{3})/g, "").replace(",", ".");
    var v = parseFloat(n);
    return isNaN(v) ? 0 : v;
  }
  // 27 -> "27,00 €"
  function fmt(n) { return n.toFixed(2).replace(".", ",") + " €"; }

  function addToCart(id) {
    if (!productoPorId(id)) return;
    cart[id] = (cart[id] || 0) + 1;
    saveCart(); updateCartUI(); openCart();
  }
  function setQty(id, qty) {
    if (qty <= 0) { delete cart[id]; } else { cart[id] = qty; }
    saveCart(); updateCartUI();
  }
  function cartCount() {
    var t = 0; for (var k in cart) if (cart.hasOwnProperty(k)) t += cart[k]; return t;
  }
  function cartTotal() {
    var t = 0;
    for (var k in cart) if (cart.hasOwnProperty(k)) {
      var p = productoPorId(k); if (p) t += parsePrecio(p.precio) * cart[k];
    }
    return t;
  }

  function updateCartUI() {
    // contador en la cabecera
    var count = cartCount();
    var badge = el("[data-cart-count]");
    if (badge) { badge.textContent = count; badge.classList.toggle("activo", count > 0); }
    // lista de artículos
    var box = el("[data-cart-items]");
    var vacio = el("[data-cart-empty]");
    var foot = el("[data-cart-foot]");
    if (!box) return;
    var ids = Object.keys(cart);
    if (!ids.length) {
      box.innerHTML = "";
      if (vacio) vacio.style.display = "";
      if (foot) foot.hidden = true;
      return;
    }
    if (vacio) vacio.style.display = "none";
    if (foot) foot.hidden = false;
    box.innerHTML = ids.map(function (id) {
      var p = productoPorId(id); if (!p) return "";
      var qty = cart[id];
      var sub = parsePrecio(p.precio) * qty;
      return '' +
        '<div class="cart-item" style="--bloque:' + esc(p.color) + '">' +
          '<div class="cart-item__img"><img src="' + esc(p.imagen) + '" alt="' + esc(p.nombre) + '"></div>' +
          '<div class="cart-item__info">' +
            '<div class="cart-item__nombre">' + esc(p.nombre) + '</div>' +
            '<div class="cart-item__precio">' + esc(p.precio || "") + ' / ud.</div>' +
            '<div class="cart-item__qty">' +
              '<button type="button" data-qty="-" data-id="' + esc(id) + '" aria-label="Quitar uno">−</button>' +
              '<span>' + qty + '</span>' +
              '<button type="button" data-qty="+" data-id="' + esc(id) + '" aria-label="Añadir uno">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-item__col">' +
            '<div class="cart-item__sub">' + fmt(sub) + '</div>' +
            '<button type="button" class="cart-item__quitar" data-remove="' + esc(id) + '">Quitar</button>' +
          '</div>' +
        '</div>';
    }).join("");
    els(".cart-item__img img", box).forEach(fallback);
    var totalEl = el("[data-cart-total]");
    if (totalEl) totalEl.textContent = fmt(cartTotal());
    // eventos cantidad / quitar
    els("[data-qty]", box).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var delta = btn.getAttribute("data-qty") === "+" ? 1 : -1;
        setQty(id, (cart[id] || 0) + delta);
      });
    });
    els("[data-remove]", box).forEach(function (btn) {
      btn.addEventListener("click", function () { setQty(btn.getAttribute("data-remove"), 0); });
    });
  }

  function openCart() {
    var c = el("[data-cart]"), o = el("[data-cart-overlay]");
    if (o) { o.hidden = false; requestAnimationFrame(function () { o.classList.add("activo"); }); }
    if (c) { c.classList.add("activo"); c.setAttribute("aria-hidden", "false"); }
  }
  function closeCart() {
    var c = el("[data-cart]"), o = el("[data-cart-overlay]");
    if (o) o.classList.remove("activo");
    if (c) { c.classList.remove("activo"); c.setAttribute("aria-hidden", "true"); }
  }

  function checkout() {
    if (!cartCount()) return;
    var c = DATA.contacto || {};
    var lineas = ["Hola La Vinagrista, quiero hacer este pedido:", ""];
    for (var k in cart) if (cart.hasOwnProperty(k)) {
      var p = productoPorId(k); if (!p) continue;
      lineas.push("• " + cart[k] + " × " + p.nombre + " (" + (p.precio || "") + ")");
    }
    lineas.push("");
    lineas.push("TOTAL: " + fmt(cartTotal()));
    lineas.push("");
    lineas.push("Mis datos (nombre, dirección y teléfono): ");
    var texto = lineas.join("\n");

    if (c.whatsapp) {
      window.open("https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(texto), "_blank");
    } else if (c.email) {
      var subject = encodeURIComponent("Pedido web · La Vinagrista");
      window.location.href = "mailto:" + c.email + "?subject=" + subject + "&body=" + encodeURIComponent(texto);
    }
  }

  function initCart() {
    var toggle = el("[data-cart-toggle]");
    if (toggle) toggle.addEventListener("click", openCart);
    var close = el("[data-cart-close]");
    if (close) close.addEventListener("click", closeCart);
    var overlay = el("[data-cart-overlay]");
    if (overlay) overlay.addEventListener("click", closeCart);
    var pay = el("[data-cart-checkout]");
    if (pay) pay.addEventListener("click", checkout);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });
    // nota de envío
    var nota = el("[data-cart-nota]");
    if (nota && DATA.tienda) nota.textContent = DATA.tienda.envioNota || "";
    updateCartUI();
  }

  /* ------------------------------------------------------------------ */
  /* RENDER · PROCESO                                                    */
  /* ------------------------------------------------------------------ */
  function renderProceso() {
    var p = DATA.proceso || {};
    setText("[data-proc-num]", p.numero);
    setText("[data-proc-titulo]", p.titulo);
    var cont = el("[data-pasos]");
    if (cont && p.pasos) {
      cont.innerHTML = p.pasos.map(function (s, i) {
        return '<div class="paso" data-reveal data-reveal-d="' + (i % 3) + '">' +
          '<div class="paso__num"></div>' +
          '<div class="paso__icono">' + (ICONS[s.icono] || ICONS.gota) + '</div>' +
          '<h3>' + esc(s.titulo) + '</h3><p>' + esc(s.texto) + '</p></div>';
      }).join("");
    }
  }

  /* ------------------------------------------------------------------ */
  /* RENDER · MESA VIVA                                                  */
  /* ------------------------------------------------------------------ */
  function renderMesa() {
    var mv = DATA.mesaViva || {};
    setText("[data-mesa-num]", mv.numero);
    setText("[data-mesa-titulo]", mv.titulo);
    var imgs = mv.imagenes || [];
    if (!imgs.length) return;
    // Repartir en 3 carriles
    var carriles = els("[data-carril]");
    carriles.forEach(function (carril, ci) {
      var subset = imgs.filter(function (_, i) { return i % 3 === ci; });
      if (!subset.length) subset = imgs;
      var html = subset.map(function (src) {
        return '<div class="tile"><img src="' + esc(src) + '" alt="Gastronomía y producto" loading="lazy"></div>';
      }).join("");
      carril.innerHTML = html + html; // duplicado para bucle
      els("img", carril).forEach(fallback);
    });
  }

  /* ------------------------------------------------------------------ */
  /* RENDER · CONTACTO + FOOTER                                          */
  /* ------------------------------------------------------------------ */
  function renderContacto() {
    var c = DATA.contacto || {};
    setText("[data-cont-titulo]", c.titulo);
    setText("[data-cont-intro]", c.intro);
    setText("[data-obrador]", c.obrador);
    var per = el("[data-perfiles]");
    if (per && c.perfiles) {
      per.innerHTML = c.perfiles.map(function (p, i) {
        var id = "perfil-" + i;
        return '<input type="radio" name="perfil" id="' + id + '" value="' + esc(p) + '"' + (i === 0 ? " checked" : "") + '>' +
          '<label for="' + id + '" data-cursor="mirar">' + esc(p) + "</label>";
      }).join("");
    }
    var s = DATA.social || {};
    var ig = el("[data-ig]");
    if (ig) { ig.href = s.instagram || "#"; var lab = ig.querySelector("[data-ig-label]"); if (lab) lab.textContent = s.instagramEtiqueta || "@lavinagrista"; }
    var sello = el("[data-sello]");
    if (sello && DATA.marca) { sello.src = DATA.marca.monograma || ""; fallback(sello); }
  }

  function renderFooter() {
    var f = DATA.footer || {};
    var g = el("[data-footer-gigante]");
    if (g && f.fraseGigante) g.textContent = f.fraseGigante;  // una sola vez
    var leg = el("[data-footer-legales]");
    if (leg && f.legales) leg.innerHTML = f.legales.map(function (l) { return '<a href="' + esc(l.enlace) + '">' + esc(l.etiqueta) + "</a>"; }).join("");
    setText("[data-footer-creditos]", f.creditos);
    setText("[data-footer-copy]", f.copyright);
    setHTML("[data-eslogan]", DATA.marca ? DATA.marca.eslogan : "");
  }

  function setText(sel, v) { var n = el(sel); if (n && v != null) n.textContent = v; }
  function setHTML(sel, v) { var n = el(sel); if (n && v != null) n.textContent = v; }

  /* ------------------------------------------------------------------ */
  /* SPLASH                                                              */
  /* ------------------------------------------------------------------ */
  function initSplash() {
    var splash = el("[data-splash]");
    if (!splash) return;
    var logo = el("[data-splash-logo]");
    if (logo && DATA.marca) { logo.src = DATA.marca.logo || ""; fallback(logo); }
    function hide() { splash.classList.add("oculto"); }
    // Doble red de seguridad: ocultar en load + temporizador
    window.addEventListener("load", function () { setTimeout(hide, reduce ? 300 : 4200); });
    setTimeout(hide, 6000);
  }

  /* ------------------------------------------------------------------ */
  /* CABECERA compacta + menú móvil                                     */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var head = el(".cabecera");
    if (head) {
      var onScroll = function () { head.classList.toggle("compacta", window.scrollY > 40); };
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }
    var toggle = el("[data-nav-toggle]");
    if (toggle) {
      toggle.addEventListener("click", function () { document.body.classList.toggle("nav-abierto"); });
      els("[data-nav] a").forEach(function (a) {
        a.addEventListener("click", function () { document.body.classList.remove("nav-abierto"); });
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* CURSOR GASTRONÓMICO                                                 */
  /* ------------------------------------------------------------------ */
  var CURSOR_TXT = { tastar: "tastar", mirar: "mirar", proximamente: "pronto", arriba: "arriba" };
  function initCursor() {
    if (coarse) return;
    var cur = el("[data-cursor-el]");
    if (!cur) return;
    var txt = el(".cursor__txt", cur);
    var x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y;
    document.addEventListener("mousemove", function (e) { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      cur.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest("[data-cursor], a, button");
      if (t) {
        var key = t.getAttribute("data-cursor");
        cur.classList.add("activo");
        txt.textContent = key ? (CURSOR_TXT[key] || key) : "mirar";
      } else {
        cur.classList.remove("activo");
      }
    });
    document.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget) cur.classList.remove("activo");
    });
  }

  /* ------------------------------------------------------------------ */
  /* REVELADOS al hacer scroll                                           */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    var items = els("[data-reveal]");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ------------------------------------------------------------------ */
  /* FORMULARIO → WhatsApp o Email                                       */
  /* ------------------------------------------------------------------ */
  function initForm() {
    var form = el("[data-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var c = DATA.contacto || {};
      var nombre = (el("#f-nombre") || {}).value || "";
      var email = (el("#f-email") || {}).value || "";
      var perfilEl = el('input[name="perfil"]:checked');
      var perfil = perfilEl ? perfilEl.value : "";
      var msg = (el("#f-mensaje") || {}).value || "";

      var texto =
        "Hola La Vinagrista 👋%0A%0A" +
        "Nombre: " + encodeURIComponent(nombre) + "%0A" +
        "Email: " + encodeURIComponent(email) + "%0A" +
        "Perfil: " + encodeURIComponent(perfil) + "%0A%0A" +
        "Consulta: " + encodeURIComponent(msg);

      if (c.whatsapp) {
        window.open("https://wa.me/" + c.whatsapp + "?text=" + texto, "_blank");
      } else if (c.email) {
        var subject = encodeURIComponent("Consulta web · " + (nombre || "La Vinagrista"));
        var body = texto.replace(/%0A/g, "%0D%0A");
        window.location.href = "mailto:" + c.email + "?subject=" + subject + "&body=" + body;
      }
      var aviso = el("[data-form-aviso]");
      if (aviso) aviso.textContent = c.whatsapp
        ? "Abriendo WhatsApp con tu mensaje preparado…"
        : "Abriendo tu programa de correo con el mensaje preparado…";
    });
  }

  /* ------------------------------------------------------------------ */
  /* BOTÓN VOLVER ARRIBA                                                 */
  /* ------------------------------------------------------------------ */
  function initTop() {
    var b = el("[data-top]");
    if (b) b.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------ */
  /* ARRANQUE                                                            */
  /* ------------------------------------------------------------------ */
  function boot() {
    renderHeader();
    renderHero();
    renderMarquee();
    renderManifiesto();
    renderTienda();
    renderProceso();
    renderMesa();
    renderContacto();
    renderFooter();

    initSplash();
    initHeader();
    initForm();
    initTop();
    initReveal();
    initCart();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();
