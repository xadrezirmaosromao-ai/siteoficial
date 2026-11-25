(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ───────── Utilidades ───────── */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;
  const isMobile = () => matchMedia("(max-width: 767px)").matches;
  const pad = (n) => String(n).padStart(2, "0");
  const brl2 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const brl0 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0, minimumFractionDigits: 0 });
  const money = (v) => brl2.format(v).replace(/\u00a0/g, " ");
  const money0 = (v) => brl0.format(v).replace(/\u00a0/g, " ");
  const hojeLocal = () => { const d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
  const fmtData = (s) => { const [y, m, d] = s.split("-"); return d + "/" + m + "/" + y; };
  const fmtDM = (s) => { const [, m, d] = s.split("-"); return d + "/" + m; };
  const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const DIAS_CURTO = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const diaSemana = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d).getDay(); };
  const onVisible = (el, cb, opts) => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { cb(); io.disconnect(); } }), opts || { threshold: 0.25 });
    io.observe(el);
  };

  /* ───────── Ícones inline ───────── */
  const ICON = {
    check: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    trophy: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    wa: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>',
    google: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.945 11a9 9 0 1 1-3.284-5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z"/></svg>',
  };

  /* ───────── Contato ───────── */
  const WA_NUM = "5535920010728";
  const MSG = {
    geral: "Olá! Vim pelo site da Academia de Xadrez Irmãos Romão e gostaria de mais informações.",
    aulaExperimental: "Olá! Vim pelo site e quero agendar uma aula experimental.",
    indicacao: "Olá! Sou aluno da academia e quero indicar um amigo.",
    campeonatos: "Olá! Quero ser avisado quando abrirem as inscrições do Caxambu Chess Open 2027.",
    planoAnual: "Olá! Tenho interesse no plano anual 2027 do Caxambu Chess Open (4 edições com 10% de desconto).",
    inaugural: "Olá! Tenho uma dúvida sobre o Caxambu Chess Open de 5 de dezembro.",
    plano: (nome, periodo) => "Olá! Vim pelo site e quero garantir minha vaga no plano " + nome + " (" + periodo + ") para as turmas de fevereiro.",
    inscricao: "Olá! Vim pelo site e quero me inscrever nas aulas de xadrez que começam em fevereiro de 2027.",
  };
  const linkWA = (m) => "https://wa.me/" + WA_NUM + (m ? "?text=" + encodeURIComponent(m) : "");
  const LINKS = {
    instagram: "https://www.instagram.com/xadrezirmaosromao/",
    youtube: "https://www.youtube.com/@XadrezIrm%C3%A3osRom%C3%A3o",
    youtubeSub: "https://www.youtube.com/@XadrezIrm%C3%A3osRom%C3%A3o?sub_confirmation=1",
    google: "https://maps.app.goo.gl/GxZbDHAhUqFVFSRv6",
    biblioteca: "https://drive.google.com/drive/folders/12pyRmcZJxTuOllHGYCyGIGVICS8_la6z?usp=drive_link",
  };
  $$("[data-wa]").forEach((a) => (a.href = linkWA(MSG[a.dataset.wa])));
  $$("[data-href]").forEach((a) => (a.href = LINKS[a.dataset.href]));
  $$("[data-icon]").forEach((s) => (s.outerHTML = ICON[s.dataset.icon]));
  $$("[data-stars]").forEach((s) => (s.innerHTML = ICON.star.repeat(5)));
  $("#year").textContent = new Date().getFullYear();

  /* ───────── Dados ───────── */
  const LOTE_VAL = [40, 50, 60];
  const L27 = (p) => p.map(([a, b], i) => ({ a: a, b: b, v: LOTE_VAL[i] }));
  const FORM_URL = "https://forms.gle/2MthJgvoeAySeCqv5";
  const MAP_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Ginásio Poliesportivo Jorge Curi, Av. Barão do Rio Branco, Caxambu MG");
  const ETAPAS = [
    { ano: 2026, inaugural: true, mes: "Dezembro", data: "2026-12-05", hora: "08:00", edicao: "Edição Inaugural", glyph: "\u265C", art: "linear-gradient(160deg,#009bff 0%,#004aad 42%,#07182f 100%)", gc: "#ffffff",
      lotes: [{ a: "2026-10-01", b: "2026-11-18", v: 35 }, { a: "2026-11-19", b: "2026-12-03", v: 45 }] },
    { ano: 2027, mes: "Março", data: "2027-03-13", edicao: "Edição Dom Pedro", glyph: "\u265A", art: "linear-gradient(160deg,#0b3a82 0%,#07182f 72%)", gc: "#ffffff",
      lotes: L27([["2027-01-01", "2027-01-31"], ["2027-02-01", "2027-02-28"], ["2027-03-01", "2027-03-11"]]) },
    { ano: 2027, mes: "Junho", data: "2027-06-12", edicao: "Edição Dona Leopoldina", glyph: "\u265B", art: "linear-gradient(160deg,#004aad 0%,#000 78%)", gc: "#009bff",
      lotes: L27([["2027-04-01", "2027-04-30"], ["2027-05-01", "2027-05-31"], ["2027-06-01", "2027-06-10"]]) },
    { ano: 2027, mes: "Setembro", data: "2027-09-11", edicao: "Edição Princesa Isabel", glyph: "\u265D", art: "linear-gradient(160deg,#0a5fcf 0%,#07182f 75%)", gc: "#ffffff",
      lotes: L27([["2027-07-01", "2027-07-31"], ["2027-08-01", "2027-08-31"], ["2027-09-01", "2027-09-09"]]) },
    { ano: 2027, mes: "Dezembro", data: "2027-12-11", edicao: "Edição Duque de Saxe", glyph: "\u265E", art: "linear-gradient(160deg,#1b2f52 0%,#000 75%)", gc: "#009bff",
      lotes: L27([["2027-10-01", "2027-10-31"], ["2027-11-01", "2027-11-30"], ["2027-12-01", "2027-12-09"]]) },
  ];
  const ETAPAS27 = ETAPAS.filter((e) => e.ano === 2027);
  const getLoteVigente = (et, h) => { for (let i = 0; i < et.lotes.length; i++) { const l = et.lotes[i]; if (h >= l.a && h <= l.b) return { n: i + 1, val: l.v, ate: l.b }; } return null; };
  const getStatus = (et, h) => {
    if (h < et.lotes[0].a) return { t: "Inscrições abrem em " + fmtData(et.lotes[0].a) };
    const l = getLoteVigente(et, h);
    if (l) return { t: l.n + "º lote, " + money(l.val), live: true };
    if (h < et.data) return { t: "Inscrições encerradas" };
    if (h === et.data) return { t: "É hoje!", live: true };
    return { t: "Edição realizada" };
  };
  const getProximaEtapa = (h, list) => (list || ETAPAS).find((e) => e.data >= h) || null;
  const inicioMs = (et) => new Date(et.data + "T" + (et.hora || "00:00") + ":00-03:00").getTime();
  $$("[data-form]").forEach((a) => (a.href = FORM_URL));
  $$("[data-map]").forEach((a) => (a.href = MAP_URL));
  const dataLonga = (s) => DIAS[diaSemana(s)] + ", " + fmtData(s);

  const VIDEOS = [
    { id: "Nsl4Ym172pw", t: "Aprenda tudo sobre a defesa Índia do Rei (Aula #079)", img: "/assets/img/video-1.webp" },
    { id: "NVRxGoIp3XQ", t: "Aprenda a abertura Ruy Lopez completa: variante fechada (Aula #001)", img: "/assets/img/video-2.webp" },
    { id: "hlTniN2MGtA", t: "Início da defesa da Índia do Rei (Aula #080)", img: "/assets/img/video-3.webp" },
    { id: "2F9Ak6JgSDY", t: "Quando devemos atacar na ala do rei (Aula #081)", img: "/assets/img/video-4.webp" },
    { id: "2snH2_9iR5U", t: "O Gambito do Rei que chocou o mundo", img: "/assets/img/video-5.webp" },
    { id: "LCwL_9C7h2s", t: "Como atacar seu adversário na Índia do Rei (Aula #082)", img: "/assets/img/video-6.webp" },
  ];
  const watch = (id) => "https://www.youtube.com/watch?v=" + id;

  /* ───────── Rotas ───────── */
  const MODE = document.documentElement.dataset.mode === "pages" ? "pages" : "spa";
  const PATHS = { inicio: "/", campeonatos: "/campeonatos/", aulas: "/aulas/", "conteudo-gratuito": "/conteudo-gratuito/", privacidade: "/privacidade/", termos: "/termos/" };
  const ROUTES = Object.keys(PATHS);
  const pathKey = (href) => { for (const k of ROUTES) if (href === PATHS[k]) return k; return null; };
  const linkTo = (k) => (MODE === "spa" ? "#" + k : PATHS[k]);
  const TITLES = { inicio: "Academia de Xadrez Irmãos Romão", campeonatos: "Caxambu Chess Open | Irmãos Romão", aulas: "Aulas de xadrez online | Irmãos Romão", "conteudo-gratuito": "Conteúdo gratuito | Irmãos Romão", privacidade: "Política de privacidade | Irmãos Romão", termos: "Termos de uso | Irmãos Romão" };
  const hooks = {};
  let current = MODE === "pages" ? document.body.dataset.page : null, pendingAnchor = null, booted = false;
  if (MODE === "spa") $$("a[href]").forEach((a) => { const k = pathKey(a.getAttribute("href")); if (k) a.setAttribute("href", "#" + k); });
  const lamp = $("#lamp");
  function moveLamp() {
    const a = $('.nav-item[data-route="' + current + '"]');
    if (!a) { lamp.style.opacity = "0"; return; }
    lamp.style.opacity = "1";
    lamp.style.width = a.offsetWidth + "px";
    lamp.style.transform = "translateX(" + (a.offsetLeft) + "px)";
  }
  function markNav() {
    $$(".nav-item").forEach((a) => { const on = a.dataset.route === current; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"); });
    moveLamp();
  }
  function show(route) {
    if (!ROUTES.includes(route)) route = "inicio";
    const changed = route !== current;
    current = route;
    $$(".view").forEach((v) => { const on = v.dataset.view === route; v.classList.toggle("active", on); v.hidden = !on; });
    document.title = TITLES[route];
    markNav();
    if (changed && booted) {
      $("#route-live").textContent = "Página " + TITLES[route];
      const h1 = $('.view[data-view="' + route + '"] h1');
      if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
    }
    if (hooks[route]) hooks[route]();
    if (pendingAnchor) { const el = document.getElementById(pendingAnchor); pendingAnchor = null; if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" })); }
    else if (changed) window.scrollTo({ top: 0, behavior: "auto" });
  }
  if (MODE === "spa") window.addEventListener("hashchange", () => show(location.hash.slice(1)));
  window.addEventListener("resize", moveLamp);
  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-goto]");
    if (g) {
      const [r, anchor] = g.dataset.goto.split(":");
      if (r === current) { const el = document.getElementById(anchor); if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
      else if (MODE === "spa") { pendingAnchor = anchor; location.hash = r; }
      else location.href = PATHS[r] + (anchor ? "#" + anchor : "");
    }
    const s = e.target.closest("[data-scroll]");
    if (s) { const el = document.getElementById(s.dataset.scroll); if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); }
  });

  /* ───────── Hero ───────── */
  (function hero() {
    if (!$("#hero-title")) return;
    const h1 = $("#hero-title");
    h1.setAttribute("aria-label", "Academia de Xadrez Irmãos Romão");
    let wi = 0;
    $$(".line", h1).forEach((line, li) => {
      const words = line.textContent.trim().split(/\s+/);
      line.setAttribute("aria-hidden", "true");
      line.innerHTML = words.map((w) => {
        const letters = Array.from(w.normalize("NFC"));
        const html = letters.map((ch, ci) => '<span class="l" style="animation-delay:' + (0.15 + wi * 0.1 + ci * 0.03 + li * 0.12).toFixed(2) + 's">' + ch + "</span>").join("");
        wi++;
        return '<span class="w">' + html + "</span>";
      }).join(" ");
    });

    const heroEl = h1.closest(".hero"), t0 = performance.now();
    const fontsOk = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
    fontsOk.then(() => setTimeout(() => heroEl.classList.add("go"), Math.max(0, 500 - (performance.now() - t0))));
    const box = $("#hero-paths");
    const svgFor = (p) => {
      let paths = "";
      for (let i = 0; i < 36; i++) {
        const d = "M-" + (380 - i * 5 * p) + " -" + (189 + i * 6) + "C-" + (380 - i * 5 * p) + " -" + (189 + i * 6) + " -" + (312 - i * 5 * p) + " " + (216 - i * 6) + " " + (152 - i * 5 * p) + " " + (343 - i * 6) + "C" + (616 - i * 5 * p) + " " + (470 - i * 6) + " " + (684 - i * 5 * p) + " " + (875 - i * 6) + " " + (684 - i * 5 * p) + " " + (875 - i * 6);
        paths += '<path d="' + d + '" fill="none" stroke="#1d63c9" stroke-width="' + (0.5 + i * 0.03).toFixed(2) + '" stroke-opacity="' + Math.min(0.9, 0.08 + i * 0.024).toFixed(3) + '"/>';
      }
      return "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 696 316" preserveAspectRatio="xMidYMid slice">' + paths + "</svg>");
    };
    box.innerHTML = '<img class="hp hp-a" alt="" src="' + svgFor(1) + '"><img class="hp hp-b" alt="" src="' + svgFor(-1) + '">';
  })();

  /* ───────── Números ───────── */
  (function stats() {
    const els = $$("[data-count]");
    if (!els.length) return;
    onVisible($(".stats"), () => {
      els.forEach((el) => {
        const to = Number(el.dataset.count), dec = Number(el.dataset.decimals || 0);
        const fmt = (v) => v.toFixed(dec).replace(".", ",");
        if (reduced) { el.textContent = fmt(to); return; }
        const t0 = performance.now(), dur = 1300;
        const step = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(to * e); if (k < 1) requestAnimationFrame(step); };
        el.textContent = fmt(0);
        requestAnimationFrame(step);
      });
    });
  })();

  /* ───────── Linha do tempo ───────── */
  $$(".reveal-seq").forEach((el) => {
    $$(".tl-item", el).forEach((it, i) => (it.style.transitionDelay = i * 0.08 + "s"));
    onVisible(el, () => el.classList.add("in"), { threshold: 0.15 });
  });

  /* ───────── Tabuleiro animado: Ruy Lopez, Ataque Marshall ───────── */
  (function board() {
    if (!$("#board-sqs")) return;
    const sqs = $("#board-sqs"), layer = $("#board-pcs");
    const G = { k: "\u265A", q: "\u265B", r: "\u265C", b: "\u265D", n: "\u265E", p: "\u265F" };
    const START = ["rnbqkbnr", "pppppppp", "........", "........", "........", "........", "PPPPPPPP", "RNBQKBNR"];
    // 1.e4 e5 2.Cf3 Cc6 3.Bb5 a6 4.Ba4 Cf6 5.O-O Be7 6.Te1 b5 7.Bb3 O-O 8.c3 d5 9.exd5 Cxd5 10.Cxe5 Cxe5 11.Txe5 c6
    const MOVES = [["e2", "e4"], ["e7", "e5"], ["g1", "f3"], ["b8", "c6"], ["f1", "b5"], ["a7", "a6"], ["b5", "a4"], ["g8", "f6"],
      ["e1", "g1", "h1", "f1"], ["f8", "e7"], ["f1", "e1"], ["b7", "b5"], ["a4", "b3"], ["e8", "g8", "h8", "f8"],
      ["c2", "c3"], ["d7", "d5"], ["e4", "d5"], ["f6", "d5"], ["f3", "e5"], ["c6", "e5"], ["e1", "e5"], ["c7", "c6"]];
    let html = "";
    for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) html += '<div class="sq ' + ((r + f) % 2 === 0 ? "l" : "d") + '" data-s="' + "abcdefgh"[f] + (8 - r) + '"></div>';
    sqs.innerHTML = html;
    const at = {};
    const pos = (el, s) => { el.style.left = (s.charCodeAt(0) - 97) * 12.5 + "%"; el.style.top = (8 - Number(s[1])) * 12.5 + "%"; };
    function setup() {
      layer.innerHTML = "";
      for (const k in at) delete at[k];
      START.forEach((row, r) => Array.from(row).forEach((c, f) => {
        if (c === ".") return;
        const el = document.createElement("span");
        const white = c === c.toUpperCase();
        el.className = "pc " + (white ? "w" : "b");
        el.textContent = G[c.toLowerCase()] + "\uFE0E";
        const s = "abcdefgh"[f] + (8 - r);
        pos(el, s); layer.appendChild(el); at[s] = el;
      }));
      $$(".sq.hl", sqs).forEach((q) => q.classList.remove("hl"));
    }
    function slide(from, to) {
      const el = at[from]; if (!el) return;
      const cap = at[to];
      if (cap) { cap.classList.add("gone"); setTimeout(() => cap.remove(), 400); }
      delete at[from]; at[to] = el;
      el.classList.add("moving"); pos(el, to);
      setTimeout(() => el.classList.remove("moving"), 520);
    }
    function play(m) {
      $$(".sq.hl", sqs).forEach((q) => q.classList.remove("hl"));
      slide(m[0], m[1]);
      if (m[2]) slide(m[2], m[3]);
      [m[0], m[1]].forEach((s) => { const q = $('.sq[data-s="' + s + '"]', sqs); if (q) q.classList.add("hl"); });
    }
    setup();
    if (reduced) { MOVES.forEach((m) => { slide(m[0], m[1]); if (m[2]) slide(m[2], m[3]); }); $$(".pc", layer).forEach((p) => p.classList.remove("moving")); return; }
    let i = 0, seen = false, timer = null;
    function tick() {
      if (!seen) { timer = setTimeout(tick, 400); return; }
      if (i < MOVES.length) { play(MOVES[i++]); timer = setTimeout(tick, 1100); return; }
      timer = setTimeout(() => {
        layer.style.opacity = "0";
        setTimeout(() => { setup(); i = 0; layer.style.opacity = "1"; timer = setTimeout(tick, 900); }, 550);
      }, 2800);
    }
    new IntersectionObserver((es) => es.forEach((e) => (seen = e.isIntersecting)), { threshold: 0.35 }).observe($("#board"));
    timer = setTimeout(tick, 600);
  })();

  /* ───────── Carrossel dos irmãos ───────── */
  (function people() {
    if (!$("#people")) return;
    const wrap = $("#people");
    const slides = $$(".person-slide", wrap);
    let cur = 0, sx = null;
    function go(dir) {
      const next = (cur + dir + slides.length) % slides.length;
      if (next === cur) return;
      const out = slides[cur], inn = slides[next];
      out.style.setProperty("--dx", -28 * dir + "px");
      inn.style.transition = "none"; inn.style.setProperty("--dx", 28 * dir + "px"); void inn.offsetWidth; inn.style.transition = "";
      out.classList.remove("on"); out.setAttribute("aria-hidden", "true");
      inn.classList.add("on"); inn.removeAttribute("aria-hidden");
      cur = next;
    }
    wrap.addEventListener("click", (e) => { const b = e.target.closest("[data-pdir]"); if (b) { go(Number(b.dataset.pdir)); const nb = $('.person-slide.on [data-pdir="' + b.dataset.pdir + '"]', wrap); if (nb && document.activeElement === b) nb.focus(); } });
    wrap.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") { go(-1); e.preventDefault(); } if (e.key === "ArrowRight") { go(1); e.preventDefault(); } });
    wrap.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") sx = e.clientX; });
    wrap.addEventListener("pointerup", (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); });
  })();

  /* ───────── Vídeos ───────── */
  (function videos() {
    if ($("#thumb-fan")) $("#thumb-fan").innerHTML = VIDEOS.slice(0, 3).map((v) => '<a href="' + watch(v.id) + '" target="_blank" rel="noopener noreferrer" aria-label="' + v.t + '"><img src="' + v.img + '" alt="" loading="lazy"></a>').join("");
    if (!$("#vgrid")) return;
    const fv = VIDEOS[0];
    const fvEl = $("#fv");
    fvEl.href = watch(fv.id);
    fvEl.setAttribute("aria-label", "Assistir no YouTube: " + fv.t);
    fvEl.innerHTML = '<img src="' + fv.img + '" alt=""><span class="play">' + ICON.play + "</span>";
    $("#fv-title").textContent = fv.t;
    $("#fv-link").href = watch(fv.id);
    $("#vgrid").innerHTML = VIDEOS.map((v) => '<a class="vcard" href="' + watch(v.id) + '" target="_blank" rel="noopener noreferrer"><div class="vthumb"><img src="' + v.img + '" alt="" loading="lazy"><span class="mini-play">' + ICON.play + '</span></div><div class="vtitle">' + v.t + "</div></a>").join("");
    const wk = [["D"], ["S"], ["T", "12h"], ["Q"], ["Q", "12h"], ["S"], ["S", "15h"]];
    const nomes = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    $("#week").innerHTML = wk.map((d, i) => '<div class="wd' + (d[1] ? " on" : "") + '" aria-label="' + nomes[i] + (d[1] ? ", vídeo novo às " + d[1] : "") + '">' + d[0] + "<small>" + (d[1] || "") + "</small></div>").join("");
  })();

  /* ───────── Próxima edição (Início) ───────── */
  (function nextCard() {
    if (!$("#next-card")) return;
    const h = hojeLocal();
    const et = getProximaEtapa(h);
    const el = $("#next-card");
    if (!et) { el.innerHTML = '<div class="ev">Caxambu Chess Open</div><div class="ed">Temporada 2027 encerrada</div>'; return; }
    const ms = inicioMs(et) - Date.now();
    const dias = Math.max(0, Math.floor(ms / 86400000));
    el.innerHTML = '<div class="ev">Próxima edição do Caxambu Chess Open</div><div class="ed">' + et.edicao + '</div><div class="dt">' + dataLonga(et.data) + "</div>" +
      (et.data === h ? '<div class="next-days"><b>É hoje!</b></div>' : '<div class="next-days"><b>' + dias + "</b><span>" + (dias === 1 ? "dia" : "dias") + "</span></div>");
  })();

  /* ───────── Contagem regressiva ───────── */
  (function countdown() {
    if (!$("#cd-label")) return;
    const label = "A PRÓXIMA EDIÇÃO COMEÇA EM";
    const lab = $("#cd-label");
    lab.innerHTML = Array.from(label).map((c) => (c === " " ? "<span> </span>" : "<span>" + c + "</span>")).join("");
    const letters = $$("span", lab).filter((s) => s.textContent.trim());
    if (!reduced) setInterval(() => {
      if (current !== "campeonatos") return;
      letters.forEach((s) => s.classList.remove("on"));
      const n = 2 + Math.round(Math.random());
      for (let i = 0; i < n; i++) letters[Math.floor(Math.random() * letters.length)].classList.add("on");
    }, 2500);

    const body = $("#cd-body"), edEl = $("#cd-ed"), sr = $("#cd-sr");
    const UNITS = [["DIAS", ""], ["HORAS", "alt"], ["MINUTOS", ""], ["SEGUNDOS", "alt"]];
    const targetsCache = {};
    let PCOLOR = (getComputedStyle(document.documentElement).getPropertyValue("--particle") || "#e9eef5").trim();
    document.addEventListener("themechange", () => {
      PCOLOR = (getComputedStyle(document.documentElement).getPropertyValue("--particle") || "#e9eef5").trim();
      digits.forEach((d) => (d.dirty = true));
      if (visible) { rafOn = false; kick(); }
    });
    let cfg = null, groups = [], visible = false, timer = null, rafOn = false, mode = null, lastMobile = null;
    const digits = [];

    function config() { return isMobile() ? { w: 44, h: 66, step: 3, ps: 2 } : { w: 72, h: 108, step: 4, ps: 2.2 }; }
    function targetsFor(c) {
      const key = c.w + "x" + c.h;
      if (targetsCache[key]) return targetsCache[key];
      const cv = document.createElement("canvas"); cv.width = c.w; cv.height = c.h;
      const x = cv.getContext("2d");
      const out = {};
      for (let d = 0; d < 10; d++) {
        x.clearRect(0, 0, c.w, c.h);
        x.fillStyle = "#fff"; x.textAlign = "center"; x.textBaseline = "middle";
        x.font = '700 ' + Math.round(c.h * 1.02) + 'px "JetBrains Mono", ui-monospace, monospace';
        x.fillText(String(d), c.w / 2, c.h * 0.54);
        const img = x.getImageData(0, 0, c.w, c.h).data, pts = [];
        for (let yy = c.step / 2; yy < c.h; yy += c.step) for (let xx = c.step / 2; xx < c.w; xx += c.step) {
          if (img[(Math.floor(yy) * c.w + Math.floor(xx)) * 4 + 3] > 120) pts.push({ x: xx, y: yy });
        }
        out[d] = pts;
      }
      return (targetsCache[key] = out);
    }
    function Digit(canvas, c, T) {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = c.w * dpr; canvas.height = c.h * dpr; canvas.style.width = c.w + "px"; canvas.style.height = c.h + "px";
      const ctx = canvas.getContext("2d"); ctx.scale(dpr, dpr);
      this.ctx = ctx; this.c = c; this.T = T; this.d = null; this.p = []; this.phase = "idle"; this.dirty = true;
    }
    Digit.prototype.set = function (d, instant) {
      if (d === this.d) return;
      const tgt = this.T[d];
      this.d = d;
      if (instant || reduced || !this.p.length) {
        this.p = tgt.map((q) => { const a0 = 0.45 + Math.random() * 0.45; return { x: q.x, y: q.y, a0: a0, a: a0 }; });
        this.phase = "idle"; this.dirty = true; return;
      }
      this.p.forEach((q) => { q.vx = Math.random() * 3 - 1.5; q.vy = Math.random() * 2.5 - 2; q.as = q.a; });
      this.phase = "sub"; this.t0 = performance.now(); this.next = tgt;
    };
    Digit.prototype.update = function (now, k) {
      if (this.phase === "sub") {
        const t = Math.min(1, (now - this.t0) / 350);
        this.p.forEach((q) => { q.x += q.vx * k + (Math.random() - 0.5) * 0.6; q.y += q.vy * k + (Math.random() - 0.5) * 0.6; q.a = q.as * (1 - 0.78 * t); });
        if (t >= 1) {
          const tg = this.next.slice();
          for (let i = tg.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const tmp = tg[i]; tg[i] = tg[j]; tg[j] = tmp; }
          while (this.p.length < tg.length) { const src = this.p[Math.floor(Math.random() * this.p.length)] || { x: this.c.w / 2, y: this.c.h / 2 }; this.p.push({ x: src.x + (Math.random() - 0.5) * 8, y: src.y + (Math.random() - 0.5) * 8, a: 0, a0: 0.45 + Math.random() * 0.45 }); }
          this.p.forEach((q, i) => {
            q.sx = q.x; q.sy = q.y; q.as = q.a;
            if (i < tg.length) { q.tx = tg[i].x; q.ty = tg[i].y; q.die = false; } else { q.tx = q.x; q.ty = q.y; q.die = true; }
          });
          this.phase = "con"; this.t1 = now;
        }
      } else if (this.phase === "con") {
        const t = Math.min(1, (now - this.t1) / 500), e = 1 - Math.pow(1 - t, 3);
        this.p.forEach((q) => { q.x = q.sx + (q.tx - q.sx) * e; q.y = q.sy + (q.ty - q.sy) * e; q.a = q.die ? q.as * (1 - e) : q.as + (q.a0 - q.as) * e; });
        if (t >= 1) { this.p = this.p.filter((q) => !q.die); this.p.forEach((q) => { q.x = q.tx; q.y = q.ty; q.a = q.a0; }); this.phase = "idle"; }
      }
      if (this.phase !== "idle" || this.dirty) { this.draw(); this.dirty = false; }
      return this.phase !== "idle";
    };
    Digit.prototype.draw = function () {
      const ctx = this.ctx, c = this.c, s = c.ps;
      ctx.clearRect(0, 0, c.w, c.h);
      ctx.fillStyle = PCOLOR;
      this.p.forEach((q) => { ctx.globalAlpha = Math.max(0, Math.min(1, q.a)); ctx.fillRect(q.x - s / 2, q.y - s / 2, s, s); });
      ctx.globalAlpha = 1;
    };
    let lastT = 0;
    function loop(now) {
      const k = lastT ? Math.min(3, (now - lastT) / 16.67) : 1; lastT = now;
      let busy = false;
      digits.forEach((d) => { if (d.update(now, k)) busy = true; });
      if (busy && visible) requestAnimationFrame(loop); else { rafOn = false; lastT = 0; }
    }
    function kick() { if (!rafOn && visible) { rafOn = true; requestAnimationFrame(loop); } }

    function build(n) {
      body.innerHTML = "";
      digits.length = 0; groups = [];
      lastMobile = isMobile();
      if (mode === "text") {
        const wrap = document.createElement("div"); wrap.className = "cd-groups";
        UNITS.forEach((u) => { const g = document.createElement("div"); g.className = "cd-group"; g.innerHTML = '<div class="cd-text" aria-hidden="true">00</div><div class="cd-unit ' + u[1] + '">' + u[0] + "</div>"; wrap.appendChild(g); groups.push({ el: g, text: g.firstChild }); });
        body.appendChild(wrap); return;
      }
      cfg = config();
      const T = targetsFor(cfg);
      const wrap = document.createElement("div"); wrap.className = "cd-groups";
      UNITS.forEach((u, gi) => {
        const g = document.createElement("div"); g.className = "cd-group";
        const ds = document.createElement("div"); ds.className = "cd-digits"; ds.setAttribute("aria-hidden", "true");
        const count = gi === 0 ? Math.max(2, String(n.d).length) : 2;
        const list = [];
        for (let i = 0; i < count; i++) { const cv = document.createElement("canvas"); ds.appendChild(cv); const dg = new Digit(cv, cfg, T); list.push(dg); digits.push(dg); }
        g.appendChild(ds);
        const un = document.createElement("div"); un.className = "cd-unit " + u[1]; un.textContent = u[0]; g.appendChild(un);
        wrap.appendChild(g); groups.push({ el: g, digits: list });
      });
      body.appendChild(wrap);
    }
    function parts() {
      const h = hojeLocal();
      const et = getProximaEtapa(h);
      if (!et) return { end: true };
      if (et.data === h) return { today: true, et: et };
      let ms = inicioMs(et) - Date.now();
      if (ms < 0) ms = 0;
      const s = Math.floor(ms / 1000);
      return { et: et, d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    }
    function render(instant) {
      const n = parts();
      if (n.end || n.today) {
        mode = "msg";
        body.innerHTML = n.end ? '<div class="cd-today">Temporada 2027 encerrada.</div>' : '<div class="cd-today">É hoje!</div>';
        lab.style.visibility = n.end ? "hidden" : "visible";
        edEl.innerHTML = n.today ? "<b>" + n.et.edicao + "</b>, Caxambu Chess Open" : "";
        sr.textContent = n.end ? "Temporada 2027 encerrada." : "A " + n.et.edicao + " é hoje.";
        return;
      }
      if (mode === "msg" || mode === null) { mode = reduced ? "text" : "canvas"; build(n); instant = true; }
      const vals = [n.d, n.h, n.m, n.s];
      if (mode === "text") {
        groups.forEach((g, i) => (g.text.textContent = pad(vals[i])));
      } else {
        const dStr = String(n.d).padStart(2, "0");
        if (groups[0].digits.length !== dStr.length || lastMobile !== isMobile()) { build(n); instant = true; }
        vals.forEach((v, gi) => {
          const str = gi === 0 ? String(v).padStart(groups[0].digits.length, "0") : pad(v);
          Array.from(str).forEach((ch, i) => groups[gi].digits[i].set(Number(ch), instant));
        });
        kick();
      }
      edEl.innerHTML = "<b>" + n.et.edicao + "</b>, " + dataLonga(n.et.data) + (n.et.hora ? ", credenciamento às " + Number(n.et.hora.slice(0, 2)) + "h" : "");
      sr.textContent = "Faltam " + n.d + " dias, " + n.h + " horas e " + n.m + " minutos para a " + n.et.edicao + ", em " + dataLonga(n.et.data) + ".";
    }
    function tick() {
      clearTimeout(timer);
      if (!visible) return;
      render(false);
      timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 8);
    }
    const ready = (document.fonts && document.fonts.load) ? Promise.race([document.fonts.load('700 100px "JetBrains Mono"'), new Promise((r) => setTimeout(r, 1500))]) : Promise.resolve();
    ready.then(() => {
      render(true);
      new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting && !document.hidden; if (visible) { render(true); tick(); } })).observe($("#countdown"));
      document.addEventListener("visibilitychange", () => { visible = !document.hidden && current === "campeonatos"; if (visible) { render(true); tick(); } });
      let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (mode === "canvas" && lastMobile !== isMobile()) { mode = null; render(true); } }, 200); });
    });
  })();

  /* ───────── Painel da edição selecionada ───────── */
  const renderEdition = (function () {
    const box = $("#ed-panel");
    if (!box) return () => {};
    let curTab = "geral", shownIdx = null;
    const ico = (n) => '<i data-lucide="' + n + '"></i>';
    const tbc = '<span class="tbc">A confirmar</span>';
    const fact = (i, l, v, s) => '<div class="fact">' + ico(i) + '<span class="fl">' + l + "</span><b>" + v + "</b>" + (s ? "<small>" + s + "</small>" : "") + "</div>";
    const waAviso = (et) => linkWA("Olá! Quero ser avisado quando abrirem as inscrições da " + et.edicao + " do Caxambu Chess Open 2027.");
    function head(et, h) {
      const st = getStatus(et, h), lv = getLoteVigente(et, h), first = et.lotes[0];
      let price = "", btns = "";
      if (lv) price = "<small>" + lv.n + "º lote, até " + fmtDM(lv.ate) + "</small><b>" + money(lv.val) + "</b>";
      else if (h < first.a) price = "<small>a partir de</small><b>" + money(first.v) + "</b>";
      if (et.inaugural) {
        if (lv) btns = '<a class="btn btn-primary" href="' + FORM_URL + '" target="_blank" rel="noopener noreferrer">Fazer inscrição</a>';
        if (h <= et.data) btns += '<a class="btn btn-outline" href="' + linkWA(MSG.inaugural) + '" target="_blank" rel="noopener noreferrer">' + ICON.wa + "Tirar dúvidas</a>";
      } else if (h <= et.data) {
        btns = '<a class="btn btn-primary" href="' + waAviso(et) + '" target="_blank" rel="noopener noreferrer">' + ICON.wa + "Quero ser avisado</a>";
      }
      return '<header class="ed-head"><div class="ed-id"><p class="ed-ev">Caxambu Chess Open</p><h2 class="ed-name">' + et.edicao + "</h2>" +
        '<p class="ed-meta">' + dataLonga(et.data) + (et.inaugural ? ", Ginásio Poliesportivo Jorge Curi" : "") + "</p>" +
        '<span class="status-pill' + (st.live ? " live" : "") + '">' + (lv ? "Inscrições abertas" : st.t) + "</span></div>" +
        '<div class="ed-cta">' + (price ? '<div class="ed-price">' + price + "</div>" : "") + (btns ? '<div class="ed-btns">' + btns + "</div>" : "") + "</div></header>";
    }
    function timeline(et, h) {
      const segs = et.lotes.map((l, i) => {
        const past = h > l.b, on = h >= l.a && h <= l.b;
        let fill = past ? 100 : 0;
        if (on) { const d0 = new Date(l.a + "T12:00:00"), d1 = new Date(l.b + "T12:00:00"), dh = new Date(h + "T12:00:00"); fill = Math.max(6, Math.round(((dh - d0) / Math.max(1, d1 - d0)) * 100)); }
        return '<div class="lt-seg' + (past ? " past" : on ? " on" : "") + '"><div class="lt-bar"><span style="width:' + fill + '%"></span></div>' +
          '<div class="lt-n">' + (i + 1) + 'º lote</div><div class="lt-v">' + money(l.v) + '</div><div class="lt-d">' + fmtDM(l.a) + " a " + fmtDM(l.b) + "</div>" +
          '<span class="lt-st">' + (on ? "Vigente" : past ? "Encerrado" : "Em breve") + "</span></div>";
      }).join("");
      return '<div class="lt">' + segs + '<div class="lt-seg lt-end' + (h >= et.data ? " past" : "") + '"><div class="lt-bar"><span style="width:' + (h >= et.data ? 100 : 0) + '%"></span></div>' +
        '<div class="lt-n">' + ICON.trophy + "Dia do evento</div><div class=\"lt-v\">" + fmtDM(et.data) + '</div><div class="lt-d">' + DIAS[diaSemana(et.data)] + "</div></div></div>";
    }
    const T = {
      geral(et, h) {
        if (et.inaugural) return '<p class="ed-lead">Torneio de xadrez rápido válido para rating FIDE e CBX, com premiação em dinheiro na categoria Geral e medalhas para Sub18, Sub14 e Sub10.</p><div class="facts-grid">' +
          fact("calendar-days", "Data", "Sábado, 05/12/2026", "Credenciamento às 8h") +
          fact("map-pin", "Local", "Ginásio Poliesportivo Jorge Curi", 'Av. Barão do Rio Branco, 2-470, Caxambu (MG). Estacionamento em frente. <a class="link" href="' + MAP_URL + '" target="_blank" rel="noopener noreferrer">Ver no mapa</a>') +
          fact("swords", "Formato", "Sistema Suíço, 6 rodadas", "Torneio único, todas as categorias jogando juntas") +
          fact("timer", "Ritmo de jogo", "10 min + 5 s por lance", "Xadrez rápido") +
          fact("chart-line", "Rating", "Válido para FIDE e CBX", "Ritmo rápido") +
          fact("users", "Vagas", "Limite de 100 atletas", "Valor único para todas as categorias") +
          fact("id-card", "Requisito", "Cadastro na CBX", "Não é exigida anuidade em dia") +
          fact("package", "Material", "Leve tabuleiro, peças e relógio", "Em bom estado; a organização não garante equipamento para todas as mesas") + "</div>";
        return '<p class="ed-lead">Os detalhes desta edição serão divulgados em breve. Por enquanto, estas são as informações confirmadas.</p><div class="facts-grid">' +
          fact("calendar-days", "Data", dataLonga(et.data).replace(/^./, (c) => c.toUpperCase()), "") +
          fact("ticket", "Inscrição", money(et.lotes[0].v) + " a " + money(et.lotes[et.lotes.length - 1].v), "Por lote, conforme a data da inscrição") +
          fact("users", "Vagas", "Sem limite de inscrições", "Em nenhum lote") +
          fact("map-pin", "Local", tbc, "") + fact("swords", "Formato e ritmo", tbc, "") +
          fact("medal", "Categorias e premiação", tbc, "") + fact("file-text", "Regulamento", tbc, "") +
          fact("clipboard-list", "Como se inscrever", tbc, "") + "</div>";
      },
      inscricao(et, h) {
        let html = '<h3 class="ed-sub">Lotes de inscrição</h3>' + timeline(et, h);
        if (et.inaugural) {
          html += '<h3 class="ed-sub">Como se inscrever</h3><ol class="steps3">' +
            '<li class="card"><span class="step-num">1</span><div><h4>Preencha o formulário</h4><p>Envie seus dados pelo formulário de inscrição.</p><a class="link small" href="' + FORM_URL + '" target="_blank" rel="noopener noreferrer">Abrir formulário</a></div></li>' +
            '<li class="card"><span class="step-num">2</span><div><h4>Confirme pelo WhatsApp</h4><p>Entramos em contato pelo WhatsApp para confirmar a sua inscrição.</p></div></li>' +
            '<li class="card"><span class="step-num">3</span><div><h4>Pague por Pix</h4><p>Enviamos a chave Pix pelo WhatsApp para você concluir a inscrição.</p></div></li></ol>' +
            '<p class="muted small" style="margin-top:14px">As inscrições encerram em 03/12/2026 ou quando o torneio atingir 100 atletas, o que ocorrer primeiro. Cadastro na CBX obrigatório.</p>';
        } else {
          const lv = getLoteVigente(et, h);
          html += '<div class="plan-hint">' + ICON.trophy + '<p><b>Vai jogar mais de uma edição?</b> Com o plano anual, as quatro edições de 2027 saem por R$ 36,00 cada, com 10% de desconto.</p><button class="btn btn-outline" data-scroll="plano-anual">Ver plano anual</button></div>' +
            '<p class="muted small" style="margin-top:16px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">Como se inscrever ' + tbc + " Sem limite de vagas em nenhum lote.</p>";
        }
        return html;
      },
      programacao() {
        const P = [["08:00", "Credenciamento"], ["09:00", "1ª rodada"], ["10:00", "2ª rodada"], ["11:00", "3ª rodada"], ["12:00", "Pausa para o almoço, até 13h", "pause"], ["13:00", "4ª rodada"], ["14:00", "5ª rodada"], ["15:00", "6ª rodada"], ["16:00", "Cerimônia de premiação", "end"]];
        return '<ol class="sched sched-row">' + P.map((p) => '<li class="' + (p[2] || "") + '"><b>' + p[0] + "</b><span>" + p[1] + "</span></li>").join("") + "</ol>";
      },
      premiacao() {
        return '<div class="prize main on-dark"><div class="prize-head">' + ico("trophy") + '<b>Geral</b><small>todos os atletas</small></div><p>Troféu para o campeão e medalhas do 1º ao 10º lugar.</p>' +
          '<div class="money"><span><small>1º lugar</small>R$ 100,00</span><span><small>2º lugar</small>R$ 70,00</span><span><small>3º lugar</small>R$ 50,00</span></div></div>' +
          '<div class="prize-row">' + [["Sub18", "2008"], ["Sub14", "2012"], ["Sub10", "2016"]].map((c) => '<div class="prize"><div class="prize-head">' + ico("medal") + "<b>" + c[0] + "</b></div><p>Medalhas para 1º, 2º e 3º</p><small>Nascidos em " + c[1] + " ou depois</small></div>").join("") + "</div>" +
          '<p class="faint small" style="margin-top:12px">Todos disputam um único torneio suíço: as categorias de base apenas dividem a premiação, definida pela classificação final. A premiação é cumulativa, e a idade segue o modelo da CBX (ano de nascimento).</p>';
      },
      regras() {
        return '<div class="rules"><ul>' +
          "<li><b>W.O.:</b> 10 minutos, contados a partir do anúncio do início da rodada pela arbitragem.</li>" +
          "<li><b>Atraso:</b> quem faltar à 1ª rodada ou chegar atrasado pode jogar a partir da 2ª rodada.</li>" +
          "<li><b>Bye:</b> vale 1 ponto, solicitado ou não.</li>" +
          "<li><b>Aparelhos eletrônicos:</b> é proibido usar ou portar celular ou outro aparelho no salão de jogos, sob pena de perda da partida.</li>" +
          "<li><b>Salão de jogos:</b> depois do início da rodada, só permanecem no local os atletas que ainda estão jogando.</li>" +
          "<li><b>Desempate, nesta ordem:</b> confronto direto; Buchholz com corte do pior resultado; Buchholz sem corte; número de vitórias; partidas com as peças pretas; sorteio.</li></ul>" +
          '<p class="faint small" style="margin-top:14px">Valem as Leis do Xadrez da FIDE (xadrez rápido) e os regulamentos da CBX. Arbitragem principal: Toninho Martins, Árbitro Nacional.</p></div>';
      },
    };
    const TABS_INAUG = [["geral", "Visão geral"], ["inscricao", "Inscrição"], ["programacao", "Programação"], ["premiacao", "Premiação"], ["regras", "Regras"]];
    const TABS_27 = [["geral", "Visão geral"], ["inscricao", "Inscrição"]];
    let current = null;
    function icons() { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } }); }
    function body() {
      const h = hojeLocal();
      const b = $("#ed-body", box);
      b.innerHTML = T[curTab](current, h);
      icons();
    }
    function draw(et) {
      const h = hojeLocal();
      const tabs = et.inaugural ? TABS_INAUG : TABS_27;
      if (!tabs.some((t) => t[0] === curTab)) curTab = "geral";
      box.innerHTML = head(et, h) +
        '<div class="ed-tabs" role="tablist" aria-label="Informações da edição">' + tabs.map((t) => '<button role="tab" id="tab-' + t[0] + '" aria-controls="ed-body" aria-selected="' + (t[0] === curTab) + '" tabindex="' + (t[0] === curTab ? 0 : -1) + '" data-tab="' + t[0] + '">' + t[1] + "</button>").join("") + "</div>" +
        '<div class="ed-body" id="ed-body" role="tabpanel" aria-labelledby="tab-' + curTab + '"></div>';
      body();
    }
    box.addEventListener("click", (e) => {
      const t = e.target.closest("[data-tab]");
      if (!t || t.dataset.tab === curTab) return;
      curTab = t.dataset.tab;
      if (t.scrollIntoView) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest", inline: "center" });
      $$("[data-tab]", box).forEach((x) => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; });
      const b = $("#ed-body", box);
      b.setAttribute("aria-labelledby", "tab-" + curTab);
      if (reduced) { body(); return; }
      b.style.opacity = "0";
      setTimeout(() => { body(); b.style.opacity = "1"; }, 160);
    });
    box.addEventListener("keydown", (e) => {
      const t = e.target.closest("[data-tab]");
      if (!t || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
      const all = $$("[data-tab]", box), i = all.indexOf(t), n = all[(i + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length];
      n.focus(); n.click(); e.preventDefault();
    });
    return function (i) {
      if (i === shownIdx) return;
      shownIdx = i; current = ETAPAS[i];
      if (reduced || !box.innerHTML) { draw(current); return; }
      box.style.opacity = "0"; box.style.transform = "translateY(8px)";
      setTimeout(() => { draw(current); box.style.opacity = "1"; box.style.transform = "none"; }, 180);
    };
  })();

  /* ───────── Carrossel em leque ───────── */
  (function fan() {
    if (!$("#fan")) return;
    const fanEl = $("#fan"), dotsEl = $("#fan-dots"), prev = $("#fan-prev"), next = $("#fan-next");
    const h = hojeLocal();
    const prox = getProximaEtapa(h);
    let active = prox ? ETAPAS.indexOf(prox) : ETAPAS.length - 1, hovered = null, entered = reduced, dragX = null, dragged = false;
    fanEl.innerHTML = ETAPAS.map((et, i) => {
      const st = getStatus(et, h);
      return '<button class="fan-card on-dark" data-i="' + i + '" aria-label="' + et.edicao + ", " + dataLonga(et.data) + '">' +
        '<span class="fan-art" style="background:' + et.art + '"><span class="fan-glyph" style="color:' + et.gc + '" aria-hidden="true">' + et.glyph + "\uFE0E</span></span>" +
        '<span class="fan-shade"></span><span class="fan-body"><span class="fan-ev" style="display:block">Caxambu Chess Open</span><span class="fan-ed" style="display:block">' + et.edicao + '</span><span class="fan-dt" style="display:block">' + dataLonga(et.data) + '</span><span class="status' + (st.live ? " live" : "") + '">' + st.t + "</span></span></button>";
    }).join("");
    dotsEl.innerHTML = ETAPAS.map((et, i) => '<button aria-label="Ir para a ' + et.edicao + '" data-i="' + i + '"></button>').join("");
    const cards = $$(".fan-card", fanEl);
    function layout() {
      const mob = isMobile();
      cards.forEach((c, i) => {
        const off = i - active, ab = Math.abs(off);
        let dx = off * (mob ? 120 : 150), rot = off * 8, y = ab * 18, sc = 1 - ab * 0.06, z = 100 - ab;
        if (off === 0) { rot = 0; sc = 1.05; y = -8; }
        if (hovered !== null && canHover && !mob) {
          if (i === hovered) { rot = 0; sc = 1.1; y = -18; z = 200; }
          else dx += i < hovered ? -70 : 70;
        }
        const hide = mob && ab > 1;
        c.style.zIndex = z;
        c.classList.toggle("hovered", i === hovered);
        if (!entered) { c.style.transform = "translateX(" + dx + "px) translateY(" + y + "px) rotate(" + rot + "deg) scale(1.35)"; c.style.opacity = "0"; c.style.filter = "blur(8px)"; return; }
        c.style.transform = "translateX(" + dx + "px) translateY(" + y + "px) rotate(" + rot + "deg) scale(" + sc + ")";
        c.style.opacity = hide ? "0" : "1";
        c.style.filter = "none";
        c.style.pointerEvents = hide ? "none" : "auto";
        c.tabIndex = hide ? -1 : 0;
      });
      $$("button", dotsEl).forEach((d, i) => { d.classList.toggle("on", i === active); d.setAttribute("aria-current", i === active ? "true" : "false"); });
      prev.disabled = active === 0; next.disabled = active === ETAPAS.length - 1;
    }
    function details() { renderEdition(active); }
    function go(i) { active = Math.max(0, Math.min(ETAPAS.length - 1, i)); hovered = null; layout(); details(); }
    cards.forEach((c, i) => {
      c.addEventListener("click", () => { if (dragged) { dragged = false; return; } if (i !== active) go(i); });
      if (canHover) { c.addEventListener("mouseenter", () => { hovered = i; layout(); }); c.addEventListener("mouseleave", () => { hovered = null; layout(); }); }
    });
    $$("button", dotsEl).forEach((d) => d.addEventListener("click", () => go(Number(d.dataset.i))));
    prev.addEventListener("click", () => go(active - 1));
    next.addEventListener("click", () => go(active + 1));
    fanEl.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") { go(active - 1); e.preventDefault(); } if (e.key === "ArrowRight") { go(active + 1); e.preventDefault(); } });
    fanEl.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") dragX = e.clientX; });
    fanEl.addEventListener("pointerup", (e) => { if (dragX === null) return; const dx = e.clientX - dragX; dragX = null; if (Math.abs(dx) > 50) { dragged = true; go(active + (dx < 0 ? 1 : -1)); setTimeout(() => (dragged = false), 50); } });
    fanEl.addEventListener("pointercancel", () => (dragX = null));
    window.addEventListener("resize", layout);
    layout(); details();
    hooks.campeonatos = () => {
      if (!entered) {
        onVisible(fanEl, () => {
          cards.forEach((c, i) => (c.style.transitionDelay = Math.abs(i - active) * 0.08 + "s"));
          requestAnimationFrame(() => { entered = true; layout(); setTimeout(() => cards.forEach((c) => (c.style.transitionDelay = "")), 1200); });
        }, { threshold: 0.3 });
      }
    };
  })();

  /* ───────── Patrocinadores ───────── */
  (function patrocinadores() {
    if (!$("#marquee-track")) return;
    const SP = [
      { n: "ReTook Cosméticos", img: "/assets/img/sp-retook.webp", bg: "#241e20" },
      { n: "CCAA", img: "/assets/img/sp-ccaa.webp", bg: "#029cdc" },
      { n: "Educacional", img: "/assets/img/sp-educacional.webp", bg: "#ffffff" },
      { n: "ELO Acessórios", img: "/assets/img/sp-elo.webp", bg: "#ffffff" },
    ];
    const tile = (s, hidden) => '<div class="sp-tile" style="background:' + s.bg + '"' + (hidden ? ' aria-hidden="true"' : "") + '><img src="' + s.img + '" alt="' + (hidden ? "" : s.n) + '" loading="lazy"></div>';
    const track = $("#marquee-track"), mq = $("#marquee");
    if (reduced) { track.innerHTML = SP.map((s) => tile(s, false)).join(""); }
    else {
      let group = "";
      for (let r = 0; r < 3; r++) group += SP.map((s) => tile(s, r > 0)).join("");
      track.innerHTML = group + group.replace(/alt="[^"]*"/g, 'alt=""').replace(/<div class="sp-tile" style="([^"]*)">/g, '<div class="sp-tile" style="$1" aria-hidden="true">');
    }
    track.addEventListener("mouseover", (e) => { if (e.target.closest(".sp-tile")) mq.classList.add("paused"); });
    track.addEventListener("mouseout", (e) => { const t = e.target.closest(".sp-tile"); if (t && !t.contains(e.relatedTarget)) mq.classList.remove("paused"); });
    const title = $("#sp-title");
    title.setAttribute("aria-label", title.textContent);
    title.innerHTML = title.textContent.split(" ").map((w, i) => '<span class="bw" aria-hidden="true" style="transition-delay:' + i * 0.08 + 's">' + w + "</span>").join(" ");
    const sec = $("#patrocinadores");
    if (reduced) { title.classList.add("in"); sec.classList.add("in"); }
    else onVisible(sec, () => { title.classList.add("in"); sec.classList.add("in"); }, { threshold: 0.2 });
  })();

  /* ───────── Perguntas frequentes ───────── */
  $$(".faq-item").forEach((it) => {
    const q = $(".faq-q", it);
    q.addEventListener("click", () => {
      const open = !it.classList.contains("open");
      $$(".faq-item").forEach((o) => { o.classList.remove("open"); $(".faq-q", o).setAttribute("aria-expanded", "false"); });
      if (open) { it.classList.add("open"); q.setAttribute("aria-expanded", "true"); }
    });
  });

  /* ───────── Planos das aulas ───────── */
  (function planos() {
    if (!$("#plans")) return;
    const P = {
      turma: { mensal: [120, 120, 0, 185, 125], trimestral: [114, 342, 18, 407, 347], anual: [108, 1296, 144, 1361, 1301] },
      particular: { mensal: [220, 220, 0, 285, 175], trimestral: [209, 627, 33, 692, 582], anual: [198, 2376, 264, 2441, 2331] },
    };
    const NOME_PER = { mensal: "mensal", trimestral: "trimestral", anual: "anual" };
    const wrap = $("#plans");
    const card = (key, nome, feat) =>
      '<article class="plan' + (feat ? " feat" : "") + '" data-plan="' + key + '">' +
      (feat ? '<span class="plan-badge">' + ICON.star + "Recomendado</span>" : key === "exp" ? '<span class="plan-badge opt">Opcional</span>' : "") +
      '<div class="plan-name">' + nome + '</div><div class="plan-price"><span class="n" data-n></span><span class="p" data-p></span></div>' +
      '<div class="plan-sub" data-sub></div><ul data-list></ul><hr><a class="btn btn-block ' + (feat ? "btn-primary" : "btn-outline") + '" target="_blank" rel="noopener noreferrer" data-btn></a><p class="plan-foot" data-foot></p></article>';
    wrap.innerHTML = card("exp", "AULA EXPERIMENTAL", false) + card("turma", "TURMA", true) + card("particular", "PARTICULAR", false);
    const shown = {};
    function tween(el, key, to) {
      const from = shown[key] == null ? to : shown[key];
      shown[key] = to;
      if (reduced || from === to) { el.textContent = money0(to); return; }
      const t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 500), e = 1 - Math.pow(1 - k, 3); el.textContent = money0(Math.round(from + (to - from) * e)); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    const li = (t) => "<li>" + ICON.check + "<span>" + t + "</span></li>";
    function render(per) {
      $$(".plan", wrap).forEach((c) => {
        const key = c.dataset.plan;
        const n = $("[data-n]", c), p = $("[data-p]", c), sub = $("[data-sub]", c), list = $("[data-list]", c), btn = $("[data-btn]", c), foot = $("[data-foot]", c);
        if (key === "exp") {
          tween(n, key, 50); p.textContent = "/ aula"; sub.textContent = "pagamento único";
          list.innerHTML = ["Uma aula avulsa", "Conheça a metodologia antes de escolher um plano", "Totalmente opcional"].map(li).join("");
          btn.textContent = "Agendar aula experimental"; btn.href = linkWA(MSG.aulaExperimental);
          foot.textContent = "A aula experimental é facultativa. Você pode começar direto por um dos planos.";
          return;
        }
        const d = P[key][per];
        tween(n, key, d[0]); p.textContent = "/ mês";
        sub.textContent = per === "mensal" ? "cobrado mensalmente" : per === "trimestral" ? money(d[1]) + " a cada 3 meses, economia de " + money(d[2]) : money(d[1]) + " por ano, economia de " + money(d[2]);
        const items = [key === "turma" ? "Aulas em turma" : "Aulas individuais", "Duas aulas por semana", "Grupo no WhatsApp", "Material de estudo", "Diagnóstico inicial", "Acompanhamento trimestral da evolução"];
        if (per !== "mensal") items.push("Plano de estudo em casa em janeiro, julho e dezembro");
        list.innerHTML = items.map(li).join("");
        const nome = key === "turma" ? "Turma" : "Particular";
        btn.textContent = "Garantir minha vaga"; btn.href = linkWA(MSG.plano(nome, NOME_PER[per]));
        foot.textContent = "";
      });
    }
    const seg = $("#seg"), thumb = $("#seg-thumb");
    const btns = $$("button", seg);
    function moveThumb() { const b = $("button.on", seg); if (!b || !b.offsetWidth) return; thumb.style.width = b.offsetWidth + "px"; thumb.style.transform = "translateX(" + (b.offsetLeft - 4) + "px)"; thumb.style.left = "4px"; }
    btns.forEach((b) => b.addEventListener("click", () => {
      if (b.classList.contains("on")) return;
      btns.forEach((o) => { o.classList.toggle("on", o === b); o.setAttribute("aria-checked", o === b ? "true" : "false"); });
      moveThumb(); render(b.dataset.period);
      if (b.dataset.period !== "mensal" && !reduced && window.confetti) {
        const r = b.getBoundingClientRect();
        window.confetti({ particleCount: 50, spread: 60, origin: { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight }, colors: ["#009BFF", "#004AAD", "#FFFFFF"], ticks: 200, gravity: 1.2, decay: 0.94, startVelocity: 30, shapes: ["circle"] });
      }
    }));
    seg.addEventListener("keydown", (e) => {
      const i = btns.findIndex((b) => b.classList.contains("on"));
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const j = (i + (e.key === "ArrowRight" ? 1 : -1) + btns.length) % btns.length; btns[j].click(); btns[j].focus(); e.preventDefault(); }
    });
    render("mensal");
    window.addEventListener("resize", moveThumb);
    const prevHook = hooks.aulas;
    hooks.aulas = () => {
      if (prevHook) prevHook();
      requestAnimationFrame(moveThumb);
      onVisible(wrap, () => { wrap.classList.remove("pre-in"); wrap.classList.add("in"); }, { threshold: 0.2 });
    };
  })();

  /* ───────── Calendário letivo ───────── */
  (function calendario() {
    if (!$("#cal-grid")) return;
    const ESP = {};
    [
      ["2027-02-08", "Carnaval (segunda-feira)", "fer"],
      ["2027-03-26", "Paixão de Cristo", "nac"], ["2027-04-21", "Tiradentes", "nac"],
      ["2027-05-27", "Corpus Christi", "mun"],
      ["2027-09-07", "Independência do Brasil", "nac"], ["2027-09-16", "Aniversário de Caxambu", "mun"],
      ["2027-10-12", "Nossa Senhora Aparecida", "nac"],
      ["2027-11-02", "Finados", "nac"], ["2027-11-15", "Proclamação da República", "nac"],
    ].forEach(([d, n, t]) => (ESP[d] = { nome: n, tipo: t }));
    ETAPAS27.forEach((e) => (ESP[e.data] = { nome: "Caxambu Chess Open, " + e.edicao, tipo: "camp", ed: e.edicao }));
    const KIND = { nac: ["Feriado nacional", "var(--blue)"], mun: ["Feriado municipal", "transparent;box-shadow:inset 0 0 0 2px var(--blue)"], fer: ["Feriado", "transparent;box-shadow:inset 0 0 0 2px var(--blue)"], camp: ["Campeonato", "var(--electric)"] };
    const REC = [0, 6, 11];
    const h = hojeLocal(), y = Number(h.slice(0, 4));
    let m = y === 2027 ? Number(h.slice(5, 7)) - 1 : y < 2027 ? 0 : 11;
    const grid = $("#cal-grid"), vp = $("#cal-viewport"), pop = $("#popover"), popBody = $("#pop-body"), arrow = $("#pop-arrow");
    const quick = $("#cal-quick");
    quick.innerHTML = MESES.map((mn, i) => {
      const has = ETAPAS27.some((e) => Number(e.data.slice(5, 7)) - 1 === i);
      return '<button data-m="' + i + '" aria-label="' + mn + '" class="' + (REC.includes(i) ? "rec " : "") + (has ? "has" : "") + '">' + mn[0] + "</button>";
    }).join("");
    function render(dir) {
      hide(true);
      const first = new Date(2027, m, 1).getDay(), nd = new Date(2027, m + 1, 0).getDate();
      const rec = REC.includes(m);
      let html = "";
      for (let c = 0; c < 42; c++) {
        const d = c - first + 1;
        if (d < 1 || d > nd) { html += '<div class="day empty"></div>'; continue; }
        const ds = "2027-" + pad(m + 1) + "-" + pad(d), sp = ESP[ds];
        const cls = "day" + (rec ? " rec" : "") + (sp ? " " + sp.tipo : "") + (ds === h ? " today" : "");
        if (sp) html += '<button class="' + cls + '" data-d="' + ds + '" aria-label="' + d + " de " + MESES[m].toLowerCase() + ": " + KIND[sp.tipo][0] + ", " + sp.nome + '">' + d + (sp.tipo === "camp" ? ICON.trophy : "") + "</button>";
        else html += '<div class="' + cls + '">' + d + "</div>";
      }
      grid.innerHTML = html;
      if (dir && grid.animate) grid.animate(reduced ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: "translateX(" + dir * 40 + "px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 250, easing: "ease-out" });
      $("#cal-month").textContent = MESES[m] + " 2027";
      const st = $("#cal-status"); st.textContent = rec ? "Sem aulas (recesso)" : "Com aulas"; st.classList.toggle("rec", rec);
      $("#cal-prev").disabled = m === 0; $("#cal-next").disabled = m === 11;
      $$("button", quick).forEach((b, i) => b.classList.toggle("on", i === m));
      const ml = $("#month-list");
      const items = Object.keys(ESP).filter((k) => Number(k.slice(5, 7)) - 1 === m).sort();
      let lis = rec ? '<li><i class="sw rec"></i>Sem aulas neste mês (recesso).</li>' : "";
      lis += items.map((k) => { const sp = ESP[k]; return '<li><i class="sw ' + sp.tipo + '"></i><b>' + fmtDM(k) + ", " + DIAS_CURTO[diaSemana(k)] + "</b> " + sp.nome + ' <span class="kind">' + KIND[sp.tipo][0] + "</span></li>"; }).join("");
      if (!lis) lis = '<li class="muted">Nenhum feriado ou evento neste mês.</li>';
      ml.innerHTML = "<h4>Neste mês</h4><ul>" + lis + "</ul>";
    }
    function go(nm) { if (nm < 0 || nm > 11 || nm === m) return; const dir = nm > m ? 1 : -1; m = nm; render(dir); }
    $("#cal-prev").addEventListener("click", () => go(m - 1));
    $("#cal-next").addEventListener("click", () => go(m + 1));
    quick.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) go(Number(b.dataset.m)); });
    $("#cal").addEventListener("keydown", (e) => { if (e.target.closest(".cal-quick")) return; if (e.key === "ArrowLeft") { go(m - 1); e.preventDefault(); } if (e.key === "ArrowRight") { go(m + 1); e.preventDefault(); } if (e.key === "Escape") hide(true); });
    let sx = null;
    vp.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") sx = e.clientX; });
    vp.addEventListener("pointerup", (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(m + (dx < 0 ? 1 : -1)); });

    let openFor = null, tShow = null, tHide = null, lastShow = 0;
    function content(ds) {
      const sp = ESP[ds], k = KIND[sp.tipo];
      let note = sp.tipo === "camp"
        ? "Caxambu Chess Open, " + dataLonga(ds) + '. <a href="' + linkTo("campeonatos") + '">Ver detalhes</a><br><span class="faint" style="font-size:.7rem">*Data sujeita a alterações.</span>'
        : "Não há aula neste dia.";
      return '<div class="pop-kind"><i style="background:' + k[1] + '"></i>' + k[0] + '</div><div class="pop-name">' + (sp.ed || sp.nome) + '</div><div class="pop-note">' + note + "</div>";
    }
    function showFor(btn) {
      clearTimeout(tHide);
      openFor = btn; lastShow = performance.now();
      popBody.innerHTML = content(btn.dataset.d);
      pop.classList.remove("below");
      pop.style.left = "0px"; pop.style.top = "0px";
      pop.classList.add("show");
      const r = btn.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
      let left = Math.max(8, Math.min(innerWidth - pw - 8, r.left + r.width / 2 - pw / 2));
      let top = r.top - ph - 12;
      if (top < 12) { top = r.bottom + 12; pop.classList.add("below"); }
      pop.style.left = left + "px"; pop.style.top = top + "px";
      arrow.style.left = Math.max(10, Math.min(pw - 22, r.left + r.width / 2 - left - 6)) + "px";
    }
    function hide(now) {
      clearTimeout(tShow);
      if (now) { pop.classList.remove("show"); openFor = null; return; }
      clearTimeout(tHide);
      tHide = setTimeout(() => { pop.classList.remove("show"); openFor = null; }, 140);
    }
    grid.addEventListener("pointerover", (e) => { const b = e.target.closest("button.day"); if (!b || e.pointerType !== "mouse") return; clearTimeout(tShow); tShow = setTimeout(() => showFor(b), 100); });
    grid.addEventListener("pointerout", (e) => { const b = e.target.closest("button.day"); if (!b || e.pointerType !== "mouse") return; if (b.contains(e.relatedTarget)) return; clearTimeout(tShow); hide(false); });
    grid.addEventListener("click", (e) => { const b = e.target.closest("button.day"); if (!b) return; if (openFor === b && !canHover && performance.now() - lastShow > 400) hide(true); else showFor(b); });
    grid.addEventListener("focusin", (e) => { const b = e.target.closest("button.day"); if (b) showFor(b); });
    grid.addEventListener("focusout", (e) => { if (!pop.contains(e.relatedTarget)) hide(false); });
    pop.addEventListener("pointerenter", () => clearTimeout(tHide));
    pop.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") hide(false); });
    pop.addEventListener("click", (e) => { if (e.target.closest("a")) hide(true); });
    document.addEventListener("pointerdown", (e) => { if (openFor && !pop.contains(e.target) && !e.target.closest("button.day")) hide(true); });
    window.addEventListener("scroll", () => openFor && hide(true), { passive: true });
    window.addEventListener("resize", () => openFor && hide(true));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(true); });
    render(0);
  })();


  /* ───────── Tema claro / escuro ───────── */
  (function theme() {
    const root = document.documentElement;
    const btn = $("#ttg");
    const knob = $(".ttg-knob", btn), iSun = $(".i-sun", btn), iMoon = $(".i-moon", btn), kSun = $(".k-sun", btn), kMoon = $(".k-moon", btn);
    const meta = document.querySelector('meta[name="theme-color"]');
    let pressed = false, drag = null, didDrag = false;
    const isDark = () => root.getAttribute("data-theme") !== "light";
    function paint() {
      const p = drag !== null ? drag : isDark() ? 1 : 0;
      const mix = (a, b) => Math.round(a + (b - a) * p);
      btn.style.backgroundColor = "rgb(" + mix(233, 7) + "," + mix(238, 24) + "," + mix(245, 47) + ")";
      btn.style.boxShadow = p > 0.5 ? "inset 0 1px 2px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.12)" : "inset 0 1px 2px rgba(0,0,0,.08), 0 0 0 1px rgba(7,24,47,.08)";
      btn.style.transition = drag !== null ? "none" : "background-color .3s cubic-bezier(.25,1,.5,1), box-shadow .3s ease";
      const travel = btn.clientWidth - knob.offsetWidth - 6;
      knob.style.transform = "translateX(" + p * travel + "px) scale(" + (pressed ? 1.24 : 1) + "," + (pressed ? 1.3 : 1) + ")";
      knob.style.transition = drag !== null ? "transform .12s cubic-bezier(.2,.9,.3,1), background-color .14s ease, box-shadow .14s ease" : "transform .34s cubic-bezier(.32,1.35,.55,1), background-color .22s ease, box-shadow .22s ease";
      knob.style.backgroundColor = pressed ? "rgba(255,255,255,.04)" : p > 0.5 ? "#0f2e5e" : "#ffffff";
      const lens = pressed ? "url(#ttg-lens) contrast(1.06)" : "none";
      knob.style.backdropFilter = lens; knob.style.webkitBackdropFilter = lens;
      knob.style.boxShadow = pressed
        ? [p > 0.5 ? "0 0 0 1px rgba(255,255,255,.28)" : "0 0 0 1px rgba(0,0,0,.18)", "inset 0 1.5px 1.5px rgba(255,255,255,.95)", "inset 0 -1.5px 1.5px rgba(255,255,255,.65)", "inset 2px 0 2px rgba(255,255,255,.45)", "inset -2px 0 2px rgba(255,255,255,.45)"].join(",")
        : p > 0.5 ? "0 1px 4px rgba(0,0,0,.4), inset 0 1px .5px rgba(255,255,255,.15)" : "0 1px 4px rgba(0,0,0,.12), 0 0 0 .5px rgba(0,0,0,.04)";
      iSun.style.color = p > 0.5 ? "#7d8aa0" : "#f59e0b"; iSun.style.opacity = p > 0.5 ? 0.6 : 0; iSun.style.transform = "scale(" + (p > 0.5 ? 0.9 : 0.75) + ")";
      iMoon.style.color = p > 0.5 ? "#e4e4e7" : "#7d8aa0"; iMoon.style.opacity = p > 0.5 ? 0 : 0.65; iMoon.style.transform = "scale(" + (p > 0.5 ? 0.75 : 0.9) + ")";
      kSun.style.opacity = p > 0.5 ? 0 : 1; kSun.style.transform = "rotate(" + p * 90 + "deg) scale(" + (p > 0.5 ? 0.5 : 1) + ")";
      kMoon.style.opacity = p > 0.5 ? 1 : 0; kMoon.style.transform = "rotate(" + (p - 1) * 90 + "deg) scale(" + (p > 0.5 ? 1 : 0.5) + ")";
      btn.setAttribute("aria-checked", isDark() ? "true" : "false");
    }
    function setTheme(t) {
      if ((t === "dark") === isDark() && root.hasAttribute("data-theme")) { paint(); return; }
      if (!reduced) { root.classList.add("theme-anim"); setTimeout(() => root.classList.remove("theme-anim"), 450); }
      root.setAttribute("data-theme", t);
      try { localStorage.setItem("ir-theme", t); } catch (e) {}
      if (meta) meta.setAttribute("content", t === "dark" ? "#000000" : "#ffffff");
      paint();
      document.dispatchEvent(new Event("themechange"));
    }
    btn.addEventListener("pointerdown", (e) => { btn.setPointerCapture(e.pointerId); pressed = true; didDrag = false; paint(); });
    btn.addEventListener("pointermove", (e) => {
      if (!pressed) return;
      didDrag = true;
      const r = btn.getBoundingClientRect(), half = knob.offsetWidth / 2 + 3;
      drag = Math.min(1, Math.max(0, (e.clientX - r.left - half) / Math.max(1, r.width - half * 2)));
      paint();
    });
    const end = () => {
      if (!pressed) return;
      pressed = false;
      const nextDark = didDrag && drag !== null ? drag >= 0.5 : !isDark();
      drag = null;
      setTheme(nextDark ? "dark" : "light");
    };
    btn.addEventListener("pointerup", end);
    btn.addEventListener("pointercancel", end);
    btn.addEventListener("click", (e) => { if (e.detail === 0) setTheme(isDark() ? "light" : "dark"); });
    if (meta) meta.setAttribute("content", isDark() ? "#000000" : "#ffffff");
    paint();
    window.addEventListener("resize", paint);
  })();

  /* ───────── WhatsApp flutuante ───────── */
  setTimeout(() => $("#wa-float").classList.add("show"), 1000);
  (function waHide() {
    const fab = $("#wa-float");
    let lastY = window.scrollY, ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) > 6) { fab.classList.toggle("away", y > lastY && y > 200); lastY = y; }
        ticking = false;
      });
    }, { passive: true });
  })();

  /* ───────── Faixa de aviso no topo ───────── */
  (function topbar() {
    const bar = $("#topbar"), text = $("#tb-text"), cta = $("#tb-cta");
    const h = hojeLocal(), inaug = ETAPAS.find((e) => e.inaugural);
    const fim = inaug.lotes[inaug.lotes.length - 1].b;
    let msg = null;
    const dm = (s) => Number(s.slice(8, 10)) + "/" + Number(s.slice(5, 7));
    if (h <= fim) msg = { k: "cco-inscricoes", t: "Caxambu Chess Open, sábado, 5/12, em Caxambu. Inscrições até " + dm(fim) + ".", s: "Chess Open 5/12: inscrições até " + dm(fim) + ".", c: "Inscreva-se", go: "campeonatos:edicao" };
    else if (h < inaug.data) msg = { k: "cco-semana", t: "Inscrições encerradas. Nos vemos no sábado, 5/12, no Ginásio Poliesportivo Jorge Curi.", s: "Chess Open: nos vemos no sábado, 5/12.", c: "Ver programação", go: "campeonatos:edicao" };
    else if (h === inaug.data) msg = { k: "cco-hoje", t: "É hoje! Caxambu Chess Open, credenciamento às 8h no Ginásio Poliesportivo Jorge Curi.", s: "É hoje! Chess Open, credenciamento às 8h.", c: "Ver programação", go: "campeonatos:edicao" };
    else if (h < "2027-02-01") msg = { k: "aulas-fev", t: "Inscrições abertas para as turmas de fevereiro de 2027.", s: "Inscrições abertas para fevereiro.", c: "Quero me inscrever", go: "aulas:planos" };
    if (!msg) return;
    try { if (localStorage.getItem("ir-bar") === msg.k) return; } catch (e) {}
    text.innerHTML = '<span class="tb-l"></span><span class="tb-s"></span>';
    $(".tb-l", text).textContent = msg.t; $(".tb-s", text).textContent = msg.s; cta.textContent = msg.c; cta.dataset.goto = msg.go;
    bar.hidden = false; document.body.classList.add("has-bar");
    const setH = () => document.documentElement.style.setProperty("--bar-h", bar.offsetHeight + "px");
    setH(); window.addEventListener("resize", setH);
    $("#tb-x").addEventListener("click", () => {
      bar.hidden = true; document.body.classList.remove("has-bar");
      document.documentElement.style.setProperty("--bar-h", "0px");
      try { localStorage.setItem("ir-bar", msg.k); } catch (e) {}
    });
  })();

  /* ───────── Analytics (Vercel): cliques no WhatsApp ───────── */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="https://wa.me/"]');
    if (a && window.va) window.va("event", { name: "WhatsApp", data: { origem: (a.dataset.wa || "plano") + "@" + current } });
  });

  /* ───────── Início ───────── */
  if (window.lucide && window.lucide.createIcons) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  if (MODE === "spa") show((location.hash || "#inicio").slice(1));
  else {
    markNav();
    if (hooks[current]) hooks[current]();
    if (location.hash.length > 1) setTimeout(() => { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView({ behavior: "auto" }); }, 350);
  }
  booted = true;
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveLamp);
})();
