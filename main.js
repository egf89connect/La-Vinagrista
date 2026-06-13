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
  /* RENDER · COLECCIÓN (slides)                                         */
  /* ------------------------------------------------------------------ */
  // Trazo SVG decorativo que enmarca la botella
  var FRAME_SVG = '<svg class="slide__svg" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M40 20 C10 40 20 90 30 140 C40 200 30 250 100 262 C170 250 160 200 170 140 C180 90 190 40 160 20 C120 6 80 6 40 20 Z"/></svg>';

  function renderColeccion() {
    var pista = el("[data-pista]");
    if (!pista || !DATA.coleccion) return;
    pista.innerHTML = DATA.coleccion.map(function (b, i) {
      var idx = String(i + 1).padStart(2, "0");
      var disp = !!b.disponible;
      return '' +
        '<article class="slide" style="--bloque:' + esc(b.color) + ';--acento:' + esc(b.acento) + '">' +
          '<div class="slide__fondo"></div>' +
          '<div class="slide__media">' +
            FRAME_SVG +
            '<img class="slide__botella" src="' + esc(b.imagen) + '" alt="Botella ' + esc(b.nombre) + '" data-cursor="tastar">' +
          '</div>' +
          '<div class="slide__info">' +
            '<div class="slide__idx" data-reveal>' + idx + ' / 04</div>' +
            '<h3 class="slide__nombre display" data-reveal data-reveal-d="1">' + esc(b.nombre) + '</h3>' +
            '<div class="slide__base" data-reveal data-reveal-d="1">' + esc(b.base) + '</div>' +
            '<p class="slide__notas" data-reveal data-reveal-d="2">“' + esc(b.notas) + '”</p>' +
            '<p class="slide__maridaje" data-reveal data-reveal-d="2"><b>Maridaje:</b> ' + esc(b.maridaje) + '</p>' +
            '<div class="slide__compra" data-reveal data-reveal-d="3">' +
              '<span class="slide__precio">' + esc(b.precio || "") + '</span>' +
              '<button class="btn btn--comanda" type="button" data-disponible="' + disp + '" data-cursor="' + (disp ? "tastar" : "proximamente") + '" ' + (disp ? "" : "disabled") + '>' +
                '<span class="btn__punto"></span>' + (disp ? "Añadir a Comanda" : "Añadir a Comanda") +
                '<span class="badge">Próximamente</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join("");
    els(".slide__botella", pista).forEach(fallback);
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
  /* COLECCIÓN · scroll horizontal con pin (desktop) / nativo (móvil)    */
  /* ------------------------------------------------------------------ */
  function initPin() {
    var pin = el("[data-pin]");
    var pista = el("[data-pista]");
    var sticky = el(".pin__sticky", pin);
    if (!pin || !pista) return;
    var slides = els(".slide", pista);

    // Móvil / sin puntero fino / reduce → scroll horizontal nativo
    var usePin = !coarse && !reduce && window.innerWidth > 760;

    function setActiveByCenter() {
      var cx = window.innerWidth / 2;
      var best = null, bestD = Infinity;
      slides.forEach(function (s) {
        var r = s.getBoundingClientRect();
        var d = Math.abs((r.left + r.width / 2) - cx);
        if (d < bestD) { bestD = d; best = s; }
      });
      slides.forEach(function (s) { s.classList.toggle("activa", s === best); });
    }

    if (!usePin) {
      pin.classList.add("sin-pin");
      // activar el centrado por scroll nativo
      if (slides[0]) slides[0].classList.add("activa");
      pista.addEventListener("scroll", function () { requestAnimationFrame(setActiveByCenter); }, { passive: true });
      window.addEventListener("resize", setActiveByCenter);
      setActiveByCenter();
      return;
    }

    // PIN: altura de la sección = (nº slides) * 100vh para "scrollar" en horizontal
    function layout() {
      var vw = window.innerWidth;
      var total = slides.length * vw;       // ancho total de la pista
      var scrollDist = total - vw;          // distancia horizontal a recorrer
      pin.style.height = (scrollDist + window.innerHeight) + "px";
      onScroll();
    }
    function onScroll() {
      var rect = pin.getBoundingClientRect();
      var scrollDist = (slides.length - 1) * window.innerWidth;
      var progress = clamp(-rect.top / (pin.offsetHeight - window.innerHeight), 0, 1);
      pista.style.transform = "translate3d(" + (-progress * scrollDist) + "px,0,0)";
      setActiveByCenter();
    }
    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    window.addEventListener("scroll", function () { requestAnimationFrame(onScroll); }, { passive: true });
    window.addEventListener("resize", layout);
    // recalcular cuando carguen las botellas
    window.addEventListener("load", layout);
    layout();

    // Permitir navegar con rueda horizontal/teclado dentro de la sección (mejora trackpad)
    // (el pin ya convierte scroll vertical en horizontal, no necesita lógica extra)
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
    renderColeccion();
    renderProceso();
    renderMesa();
    renderContacto();
    renderFooter();

    initSplash();
    initHeader();
    initForm();
    initTop();
    initReveal();
    initPin();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();
