/* Movimento da landing, no padrão de apresentação do antigravity.google:
 *  1. campo de partículas radiais em anéis no hero, coloridas pelo ângulo, que giram e se afastam do cursor;
 *  2. título que entra palavra por palavra;
 *  3. blocos que se revelam ao rolar (fade + subida curta);
 *  4. números que contam até o valor;
 *  5. barra de progresso de rolagem.
 * Só opacity e transform (regra §17.4 do DS). Com prefers-reduced-motion tudo aparece pronto e o campo fica parado. */
(function () {
  "use strict";

  var raiz = document.documentElement;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* 2. Título palavra por palavra. O texto lido por leitor de tela continua inteiro no h1. */
  (function titulo() {
    var h1 = $("#hero-titulo");
    if (!h1 || h1.dataset.dividido) return;
    var texto = h1.textContent.trim();
    h1.setAttribute("aria-label", texto);
    h1.dataset.dividido = "1";
    h1.innerHTML = texto.split(/\s+/).map(function (p, i) {
      return '<span class="palavra" aria-hidden="true" style="--i:' + i + '"><span>' + p.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span></span>";
    }).join(" ");
  })();
  requestAnimationFrame(function () { raiz.classList.add("movimento"); });

  /* 3. Revelação ao rolar */
  (function revelar() {
    var alvos = [];
    function marcar(sel) {
      $$(sel).forEach(function (el, i) {
        if (el.dataset.rev) return;
        el.dataset.rev = "1";
        el.classList.add("rev");
        el.style.setProperty("--i", String(Math.min(i, 6)));
        alvos.push(el);
      });
    }
    marcar(".hero .eyebrow, .hero .subtitulo, .hero .acoes");
    marcar(".secao__cabeca");
    marcar(".numero");
    marcar("#o-que-e .cartao");
    marcar(".fluxo--macro");
    marcar(".segmentos, .painel-plugin");
    marcar(".barra");
    marcar("#skills-lista");
    marcar(".nota");
    if (reduz.matches || !("IntersectionObserver" in window)) {
      alvos.forEach(function (el) { el.classList.add("visivel"); });
      return;
    }
    var io = new IntersectionObserver(function (itens) {
      itens.forEach(function (it) {
        if (it.isIntersecting) { it.target.classList.add("visivel"); io.unobserve(it.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    alvos.forEach(function (el) { io.observe(el); });
  })();

  /* 4. Contagem dos números do hero */
  (function contar() {
    var dds = $$("#numeros dd");
    if (!dds.length || reduz.matches) return;
    var finais = dds.map(function (d) { return parseInt(d.textContent, 10); });
    dds.forEach(function (d) { d.textContent = "0"; });
    var inicio = null, dur = 1100;
    function quart(t) { return 1 - Math.pow(1 - t, 4); }
    function quadro(agora) {
      if (inicio === null) inicio = agora;
      var t = Math.min((agora - inicio) / dur, 1);
      dds.forEach(function (d, i) { d.textContent = String(Math.round(finais[i] * quart(t))); });
      if (t < 1) requestAnimationFrame(quadro);
    }
    setTimeout(function () { requestAnimationFrame(quadro); }, 500);
  })();

  /* 5. Barra de progresso de rolagem */
  (function progresso() {
    var barra = $("#progresso");
    if (!barra) return;
    var pend = false;
    function atualizar() {
      pend = false;
      var max = raiz.scrollHeight - innerHeight;
      barra.style.transform = "scaleX(" + (max > 0 ? Math.min(scrollY / max, 1) : 0) + ")";
    }
    addEventListener("scroll", function () { if (!pend) { pend = true; requestAnimationFrame(atualizar); } }, { passive: true });
    addEventListener("resize", atualizar);
    atualizar();
  })();

  /* 1. Campo de partículas do hero, no padrão do antigravity: traços curtos (cápsulas) radiais, em anéis
   * concêntricos ao redor do texto, com a cor mudando pelo ângulo (azul, violeta, rosa, vermelho, laranja, âmbar)
   * e uma poeira de pontos cinza ao fundo. Os anéis são circulares e esmaecem perto do texto, dos cartões e das bordas,
   * então nada cobre a leitura. As cores vêm dos tokens do DS (--blue-500 etc.). Os anéis giram devagar e se afastam do cursor. */
  (function campo() {
    var cv = $("#campo");
    var hero = $("#inicio");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var L = 0, A = 0, dpr = 1, ps = [], poeira = [], cores = [], cinza = "", rodando = false, visivel = true;
    var mouse = { x: -9999, y: -9999, ativo: false };
    var cx = 0, cy = 0, caixas = [];
    var GIRO = 0.035; /* rad/s */
    var TOKENS = ["--blue-500", "--violet-500", "--rose-400", "--red-500", "--orange-500", "--amber-400"];

    function rgb(valor) {
      var h = valor.trim().replace("#", "");
      if (h.length === 3) h = h.replace(/./g, "$&$&");
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    function ler() {
      var cs = getComputedStyle(raiz);
      cores = TOKENS.map(function (t) { return rgb(cs.getPropertyValue(t) || cs.getPropertyValue("--muted-foreground")); });
      cinza = cs.getPropertyValue("--muted-foreground").trim();
    }
    /* Cor pelo ângulo: gradiente cônico entre as seis cores, fechando o círculo */
    function corDoAngulo(ang) {
      var t = ((ang + Math.PI) / (2 * Math.PI)) * cores.length;
      var i = Math.floor(t) % cores.length, f = t - Math.floor(t), j = (i + 1) % cores.length;
      var a = cores[i], b = cores[j];
      return "rgb(" + Math.round(a[0] + (b[0] - a[0]) * f) + "," + Math.round(a[1] + (b[1] - a[1]) * f) + "," + Math.round(a[2] + (b[2] - a[2]) * f) + ")";
    }
    function medir() {
      var r = hero.getBoundingClientRect();
      L = r.width; A = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(L * dpr); cv.height = Math.round(A * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      semear();
    }
    function semear() {
      /* Centro no meio do texto. O anel é circular e começa perto do centro; as caixas do texto e dos cartões
       * ficam livres porque as partículas esmaecem perto delas (ver desenhar). */
      var t1 = $("#hero-titulo").getBoundingClientRect(), t2 = $(".hero .acoes").getBoundingClientRect(), hr = hero.getBoundingClientRect();
      var esq = Math.min(t1.left, t2.left), dir = Math.max(t1.right, t2.right);
      var sub = $(".hero .subtitulo");
      if (sub) { var s = sub.getBoundingClientRect(); esq = Math.min(esq, s.left); dir = Math.max(dir, s.right); }
      caixas = [[esq - hr.left - 24, t1.top - hr.top - 24, dir - hr.left + 24, t2.bottom - hr.top + 24]];
      var num = $("#numeros");
      if (num) { var n0 = num.getBoundingClientRect(); caixas.push([n0.left - hr.left - 16, n0.top - hr.top - 16, n0.right - hr.left + 16, n0.bottom - hr.top + 16]); }
      cx = L / 2; cy = (t1.top + t2.bottom) / 2 - hr.top;
      /* anel circular que contorna a caixa do título aos botões; faixa de 5 voltas, esmaece para fora */
      var nucleo = [esq - hr.left, t1.top - hr.top, dir - hr.left, t2.bottom - hr.top];
      var r0 = Math.hypot((nucleo[2] - nucleo[0]) / 2, (nucleo[3] - nucleo[1]) / 2) + 28;
      var rMax = r0 + Math.min(L, A) * 0.42;
      var passo = 34;
      ps = [];
      for (var r = r0, anel = 0; r < rMax; r += passo, anel++) {
        var n = Math.max(12, Math.round((2 * Math.PI * r) / (passo * 1.15)));
        var desloc = Math.random() * 6.283;
        for (var k = 0; k < n; k++) {
          var ang = desloc + (k / n) * 6.283 + (Math.random() - 0.5) * (6.283 / n) * 0.7;
          var raio = r + (Math.random() - 0.5) * passo * 0.5;
          var x = cx + Math.cos(ang) * raio, y = cy + Math.sin(ang) * raio;
          if (x < -12 || x > L + 12 || y < -12 || y > A + 12) {
            /* fora do quadro agora, mas pode girar para dentro: guarda só os que ficam perto da borda */
            if (Math.random() > 0.35) continue;
          }
          var fora = (r - r0) / (rMax - r0);
          if (Math.random() < fora * 0.8) continue; /* rareia para fora, como no halo de referência */
          ps.push({
            ang: ang, raio: raio, x: x, y: y,
            comp: 5 + Math.random() * 3 + (1 - fora) * 2,
            fase: Math.random() * 6.283,
            vel: 0.5 + Math.random() * 0.8,
            cor: corDoAngulo(ang),
            alfa: 0.8 + Math.random() * 0.2
          });
        }
      }
      poeira = [];
      var nd = Math.round(Math.min(160, Math.max(50, (L * A) / 7000)));
      for (var d = 0; d < nd; d++) poeira.push({ x: Math.random() * L, y: Math.random() * A, r: 0.6 + Math.random() * 0.8, a: 0.3 + Math.random() * 0.3 });
    }
    /* 0 dentro das caixas e nas bordas do hero, 1 longe delas; transição de 44 px */
    function esmaece(x, y) {
      var f = Math.min(1, Math.min(x, L - x, y, A - y) / 44 + 0.15);
      for (var b = 0; b < caixas.length; b++) {
        var c = caixas[b];
        var dx = Math.max(c[0] - x, 0, x - c[2]), dy = Math.max(c[1] - y, 0, y - c[3]);
        f = Math.min(f, Math.hypot(dx, dy) / 44);
      }
      return Math.max(0, f);
    }
    function desenhar(t) {
      ctx.clearRect(0, 0, L, A);
      var seg = reduz.matches ? 0 : t / 1000;
      ctx.fillStyle = cinza;
      for (var q = 0; q < poeira.length; q++) {
        var d = poeira[q];
        ctx.globalAlpha = d.a;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      }
      ctx.lineCap = "round"; ctx.lineWidth = 2.2;
      var alcance = 120;
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        var ang = p.ang + GIRO * seg;
        var raio = p.raio + Math.sin(seg * p.vel + p.fase) * 5;
        var cos = Math.cos(ang), sen = Math.sin(ang);
        var tx = cx + cos * raio, ty = cy + sen * raio;
        if (mouse.ativo) {
          var dx = tx - mouse.x, dy = ty - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < alcance && dist > 0.1) { var f = 1 - dist / alcance; tx += (dx / dist) * f * 40; ty += (dy / dist) * f * 40; }
        }
        p.x += (tx - p.x) * 0.14; p.y += (ty - p.y) * 0.14;
        if (p.x < -10 || p.x > L + 10 || p.y < -10 || p.y > A + 10) continue;
        var fade = esmaece(p.x, p.y);
        if (fade <= 0.02) continue;
        ctx.globalAlpha = p.alfa * fade; ctx.strokeStyle = p.cor;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + cos * p.comp, p.y + sen * p.comp);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    function laco(t) {
      if (!rodando) return;
      desenhar(t);
      requestAnimationFrame(laco);
    }
    function iniciar() { if (!rodando && visivel && !reduz.matches && !document.hidden) { rodando = true; requestAnimationFrame(laco); } }
    function parar() { rodando = false; }

    ler();
    /* espera o título dividir em palavras e a fonte assentar antes de medir a caixa do texto */
    function pronto() { medir(); desenhar(0); iniciar(); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(pronto); else pronto();
    hero.addEventListener("pointermove", function (ev) {
      var r = hero.getBoundingClientRect();
      mouse.x = ev.clientX - r.left; mouse.y = ev.clientY - r.top; mouse.ativo = true;
    });
    hero.addEventListener("pointerleave", function () { mouse.ativo = false; });
    if (typeof ResizeObserver === "function") new ResizeObserver(function () { medir(); desenhar(0); }).observe(hero);
    else addEventListener("resize", function () { medir(); desenhar(0); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (it) { visivel = it[0].isIntersecting; if (visivel) iniciar(); else parar(); }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) parar(); else iniciar(); });
    if (reduz.addEventListener) reduz.addEventListener("change", function () { if (reduz.matches) { parar(); desenhar(0); } else iniciar(); });
    var escuro = raiz.classList.contains("dark");
    new MutationObserver(function () {
      var agora = raiz.classList.contains("dark");
      if (agora === escuro) return;
      escuro = agora; ler(); semear(); desenhar(0);
    }).observe(raiz, { attributes: true, attributeFilter: ["class"] });
  })();
})();
