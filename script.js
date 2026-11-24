/* ==================================================================
   COSMIC portfolio — v3
   PART 1  Your content (edit freely)
   PART 2  Project visuals (small generated SVG pictures)
   PART 3  Render content into the page
   PART 4  Interactions: filters, raw→real slider, journey, music, booking
   PART 5  Build engine: rulers + cursor agents that build the page
   ================================================================== */

/* ============================ PART 1: CONTENT ============================ */

const CONFIG = {
  email: "ankitbajpeyy1@gmail.com",       // e.g. "ankit@example.com"
  whatsapp: "",    // digits with country code, e.g. "919876543210"
  instagram: "https://www.instagram.com/_ankit_bajpayee_",   // e.g. "https://www.instagram.com/your_handle"
  linkedin: "https://www.linkedin.com/in/ankit-bajpeyee-3a72b331a",    // e.g. "https://www.linkedin.com/in/your-name"
  calendly: "",    // optional booking link (Calendly / Cal.com)
  github: "https://github.com/COSMIC-2318",
  fiverr: "https://www.fiverr.com/ankit_2318",
};

const BUILD = {
  enabled: true,     // false = show the page instantly
  agents: 18,        // builder cursors on desktop (phones use half)
  tour: true,        // after "Open Visit", scroll the page automatically while it builds
  seconds: 50,       // the whole page is built and scrolled to the end in this time (song is 56 s)
  backToTop: true,   // after the build, glide back to the top so the visitor can read from the start
};

// group: quant | ml | data. visual: which generated picture to draw. feature: big card.
const PROJECTS = [
  { title: "DOM Trade", group: "quant", visual: "dom", feature: true, tag: "FLAGSHIP · QUANT",
    text: "Regime-aware prediction research system for NSE stocks: order-book features, GMM regimes, an online ensemble, and a C++ backtest engine.",
    meta: "Python · C++ · Online learning", year: "2026", note: "85.04% ensemble accuracy in backtest vs 41.15% naive; not live returns.", link: "" },
  { title: "Quant Research Pipeline", group: "quant", visual: "factors", tag: "QUANT · INDIQUANT",
    text: "12 factors on 5 Nifty large-caps with a mini long-short backtester.",
    meta: "Python · yfinance", year: "2026", note: "Small universe; a research exercise.", link: "https://github.com/COSMIC-2318" },
  { title: "Live Tick Feature Engine", group: "data", visual: "heat", tag: "DATA · LIVE",
    text: "Angel One SmartAPI WebSocket ticks → 63 features per tick, stored in Parquet.",
    meta: "Python · WebSocket · Parquet", year: "2026", link: "" },
  { title: "S.E.N.T.I.N.E.L.", group: "ml", visual: "graph", tag: "ML · MULTIMODAL",
    text: "Fake-news detection across text and images: RoBERTa + CLIP, a RAG verifier, HGT and a LLaMA-3 adjudicator.",
    meta: "RoBERTa · CLIP · RAG", year: "2026", note: "Final-year prototype; I led design and integration.", link: "https://github.com/COSMIC-2318/SENTINEL" },
  { title: "PhishSense", group: "ml", visual: "shap", tag: "ML · EXPLAINABLE",
    text: "Phishing email detection that explains each decision with SHAP.",
    meta: "LinearSVC · SHAP · Streamlit", year: "2026", link: "" },
  { title: "Personalised News Summaries", group: "ml", visual: "doc", tag: "ML · RESEARCH",
    text: "BART summaries that adapt to reader feedback. IEEE CIS internship.",
    meta: "BART · Feedback learning", year: "2025", link: "" },
  { title: "Spam & Stress Models", group: "data", visual: "scatter", tag: "DATA · SCALE",
    text: "Spam detection on ~140k emails (DistilBERT) and stress prediction on ~300k sensor rows.",
    meta: "DistilBERT · Colab", year: "2025", link: "" },
];

const LOGOS = [
  ["IndiQuant", "QUANT RESEARCH INTERN"],
  ["IEEE CIS", "RESEARCH INTERN"],
  ["MSME · GoI", "DATA ANALYTICS CERT."],
  ["B.C. Roy Engg.", "B.TECH CSE (AI & ML)"],
];

const NUMBERS = [
  ["DOM Trade · ensemble accuracy", "Backtest, vs a 41.15% naive baseline", "85.04%"],
  ["DOM Trade · mean inference", "Per prediction, C++ engine", "315µs"],
  ["PhishSense · accuracy", "Held-out test split", "95.94%"],
  ["Feature engine · live features", "Computed per tick from a broker WebSocket", "63"],
  ["Factor research · net Sharpe", "3-month momentum after costs; small universe", "0.65"],
];

const TOOLKIT = ["Python", "C++", "SQL", "PostgreSQL", "TimescaleDB", "Kafka", "Parquet", "Excel", "LaTeX", "Git"];

const PROCESS = [
  ["The data", "Collect and clean: market ticks, CSVs, APIs. Most of the work hides here."],
  ["The features", "Turn raw rows into signals a model can actually learn from."],
  ["The model", "Start simple. Add complexity only when the data earns it."],
  ["The test", "Walk-forward, out-of-sample, against an honest baseline. Then ship."],
];

const TIMELINE = [
  ["AUTUMN 2026", "Associate Quantitative Research Intern", "IndiQuant Pvt Ltd · remote",
    "Remote cohort of 12. Built a 12-factor research pipeline and a long-short backtester, researched Indian broker WebSockets and NSE data, and led the intern reward-model design (Reward Formula v1.0 spec)."],
  ["ONGOING", "Independent builder", "DOM Trade · live tick feature engine",
    "Building a regime-aware NSE prediction system end to end: 46 microstructure features, Gaussian-mixture regimes, an online ensemble with drift detection, and a C++ backtest engine."],
  ["JAN – FEB 2026", "Data Analytics Certificate", "MSME E-SDP · Government of India",
    "Government skill development programme in data analytics."],
  ["JUN – AUG 2025", "Research Intern", "IEEE CIS · remote",
    "Personalised news summarisation with BART that adapts to reader feedback, plus a Streamlit reading portal."],
  ["AUG 2027", "B.Tech CSE (AI & ML)", "Dr. B.C. Roy Engineering College, Durgapur",
    "Final year. Member of the IEEE CIS student chapter."],
];

const WINS = [
  ["Built a C++ backtest engine", "DOM Trade"],
  ["85% backtest accuracy vs a 41% baseline", "DOM Trade"],
  ["Led the intern reward-model design", "IndiQuant"],
  ["Government data analytics certificate", "MSME E-SDP"],
  ["7 projects built end to end", "2025 – 2026"],
];

/* ============================ PART 2: VISUALS ============================ */
const RED = "#e8202f", BLUE = "#2f8cff", GREY = "#3a3a46", INK = "#f6f6f7";
const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const svg = (body, vb = "0 0 400 250") => `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg>`;
const gridBg = `<defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#1c1c24" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)"/>`;

const VISUALS = {
  dom() {
    const r = rng(7); let o = gridBg, p = 130, line = "";
    o += `<rect x="0" y="0" width="150" height="250" fill="rgba(255,255,255,.025)"/><rect x="150" y="0" width="120" height="250" fill="rgba(232,32,47,.10)"/><rect x="270" y="0" width="130" height="250" fill="rgba(255,255,255,.025)"/>`;
    o += `<text x="10" y="22" fill="#6e6e79" font-family="JetBrains Mono" font-size="9">REGIME · CALM</text><text x="158" y="22" fill="${RED}" font-family="JetBrains Mono" font-size="9">REGIME · VOLATILE</text><text x="278" y="22" fill="#6e6e79" font-family="JetBrains Mono" font-size="9">REGIME · CALM</text>`;
    for (let i = 0; i < 38; i++) {
      const vol = i > 14 && i < 27 ? 16 : 6, x = 10 + i * 10, o1 = p, c = p + (r() - .5) * vol * 2;
      const hi = Math.min(o1, c) - r() * vol, lo = Math.max(o1, c) + r() * vol, up = c < o1;
      o += `<line x1="${x}" x2="${x}" y1="${hi}" y2="${lo}" stroke="${up ? INK : RED}" stroke-width="1"/><rect x="${x - 3}" y="${Math.min(o1, c)}" width="6" height="${Math.max(2, Math.abs(c - o1))}" fill="${up ? INK : RED}"/>`;
      line += `${i ? "L" : "M"}${x} ${c + 34}`; p = Math.max(60, Math.min(190, c));
    }
    o += `<path d="${line}" fill="none" stroke="${BLUE}" stroke-width="1.5" stroke-dasharray="3 3"/><text x="300" y="236" fill="${BLUE}" font-family="JetBrains Mono" font-size="9">ensemble ŷ</text>`;
    return svg(o);
  },
  factors() {
    const r = rng(11), names = ["MOM3", "MOM6", "VAL", "SIZE", "VOL", "RSI", "QUAL", "LIQ", "REV", "BETA", "SKEW", "TRND"];
    let o = gridBg + `<line x1="20" x2="390" y1="150" y2="150" stroke="#2f2f39"/>`;
    names.forEach((n, i) => {
      const v = i === 0 ? 90 : (r() - .45) * 110, x = 26 + i * 30, top = v > 0 ? 150 - v : 150;
      o += `<rect x="${x}" y="${top}" width="20" height="${Math.abs(v)}" rx="2" fill="${i === 0 ? RED : GREY}"/><text x="${x + 10}" y="232" text-anchor="middle" fill="${i === 0 ? RED : "#6e6e79"}" font-family="JetBrains Mono" font-size="8">${n}</text>`;
    });
    return svg(o + `<text x="384" y="40" text-anchor="end" fill="${INK}" font-family="Inter" font-weight="800" font-size="14">Sharpe 0.65</text><text x="384" y="56" text-anchor="end" fill="#6e6e79" font-family="JetBrains Mono" font-size="9">3M MOMENTUM · NET</text>`);
  },
  heat() {
    const r = rng(5); let o = gridBg;
    for (let y = 0; y < 7; y++) for (let x = 0; x < 9; x++) {
      const v = r(), c = v > .78 ? RED : v > .5 ? "#5a1a22" : v > .25 ? "#26262f" : "#18181f";
      o += `<rect x="${110 + x * 30}" y="${30 + y * 28}" width="26" height="24" rx="3" fill="${c}"/>`;
    }
    for (let i = 0; i < 14; i++) o += `<circle cx="${20 + r() * 70}" cy="${30 + i * 14}" r="${2 + r() * 2}" fill="${i % 3 ? GREY : BLUE}"/>`;
    return svg(o + `<path d="M84 125H102M96 119l6 6-6 6" fill="none" stroke="${RED}" stroke-width="2"/><text x="110" y="236" fill="#6e6e79" font-family="JetBrains Mono" font-size="9">63 FEATURES / TICK</text>`);
  },
  graph() {
    const r = rng(3), n = []; let o = gridBg;
    for (let i = 0; i < 16; i++) n.push([40 + r() * 320, 30 + r() * 190]);
    n.forEach((a, i) => { const b = n[(i * 5 + 3) % n.length]; o += `<line x1="${a[0]}" y1="${a[1]}" x2="200" y2="125" stroke="#2a2a33"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#23232b"/>`; });
    n.forEach((a, i) => (o += `<circle cx="${a[0]}" cy="${a[1]}" r="${i % 4 ? 4 : 6}" fill="${i % 4 ? GREY : BLUE}"/>`));
    return svg(o + `<circle cx="200" cy="125" r="16" fill="${RED}"/><circle cx="200" cy="125" r="26" fill="none" stroke="${RED}" stroke-opacity=".4"/><text x="200" y="129" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="9" font-weight="700">LLM</text>`);
  },
  shap() {
    let o = gridBg + `<rect x="30" y="40" width="130" height="90" rx="6" fill="none" stroke="${INK}" stroke-width="2"/><path d="M30 44l65 46 65-46" fill="none" stroke="${INK}" stroke-width="2"/><text x="30" y="160" fill="${RED}" font-family="Inter" font-weight="800" font-size="16">PHISHING</text><text x="30" y="176" fill="#6e6e79" font-family="JetBrains Mono" font-size="9">p = 0.97</text>`;
    [["urgent", 90, 1], ["verify acct", 70, 1], ["link mismatch", 58, 1], ["!!!", 34, 1], ["greeting", -30, 0], ["known sender", -44, 0]].forEach(([t, v, red], i) => {
      const y = 40 + i * 30, x = v > 0 ? 290 : 290 + v;
      o += `<text x="282" y="${y + 13}" text-anchor="end" fill="#a9a9b3" font-family="JetBrains Mono" font-size="9">${t}</text><rect x="${x}" y="${y}" width="${Math.abs(v)}" height="18" rx="2" fill="${red ? RED : BLUE}"/>`;
    });
    return svg(o);
  },
  doc() {
    const r = rng(9); let o = gridBg + `<rect x="60" y="24" width="280" height="202" rx="8" fill="#101015" stroke="#2f2f39"/>`;
    for (let i = 0; i < 9; i++) { const w = 120 + r() * 120, y = 50 + i * 19; o += `<rect x="80" y="${y}" width="${w}" height="7" rx="3" fill="${GREY}"/>`; if (i === 2 || i === 5) o += `<rect x="${80 + w * .3}" y="${y - 3}" width="${w * .45}" height="13" rx="3" fill="${RED}" opacity=".85"/>`; }
    return svg(o + `<text x="80" y="42" fill="${INK}" font-family="Inter" font-weight="800" font-size="11">Your summary · adapted to you</text>`);
  },
  scatter() {
    const r = rng(21); let o = gridBg;
    for (let i = 0; i < 70; i++) { const red = i % 2, cx = red ? 270 + (r() - .5) * 140 : 130 + (r() - .5) * 140, cy = red ? 90 + (r() - .5) * 110 : 160 + (r() - .5) * 110; o += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="${red ? RED : GREY}"/>`; }
    return svg(o + `<path d="M120 20 L300 230" stroke="${BLUE}" stroke-width="1.5" stroke-dasharray="4 4"/>`);
  },
};

/* ============================ PART 3: RENDER ============================ */
(() => {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  $("#work-grid").innerHTML = PROJECTS.map((p, i) => `
    <article class="work${p.feature ? " feature" : ""}" data-group="${p.group}">
      <div class="media"><span class="chip-tag${p.feature ? " red-tag" : ""}">${esc(p.tag)}</span>${(VISUALS[p.visual] || VISUALS.dom)()}</div>
      <div class="work-meta">
        <span class="work-num">${String(i + 1).padStart(2, "0")}</span>
        <div><span class="work-year">${esc(p.meta)} / ${esc(p.year)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>
      </div>
      ${p.note ? `<p class="work-note">${esc(p.note)}</p>` : ""}
      ${p.link ? `<a class="work-link" href="${esc(p.link)}" target="_blank" rel="noopener">VIEW CODE ↗</a>` : ""}
    </article>`).join("");
  $("#work-count").textContent = PROJECTS.length;

  $("#logo-row").innerHTML = LOGOS.map(([n, s]) => `<li>${esc(n)}<small>${esc(s)}</small></li>`).join("");
  $("#num-list").innerHTML = NUMBERS.map(([t, d, v], i) => `<li><span class="idx">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div><span class="val">${esc(v)}</span></li>`).join("");
  $("#chips").innerHTML = TOOLKIT.map((t) => `<span>${esc(t)}</span>`).join("");
  $("#process").innerHTML = PROCESS.map(([t, d], i) => `<li><span class="pn">0${i + 1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join("");
  $("#timeline").innerHTML = TIMELINE.map(([w, t, s, d], i) => `
    <li><button type="button" class="tl-btn" aria-expanded="false" aria-controls="tl${i}">
      <span class="tl-when">${esc(w)}</span><span><h3>${esc(t)}</h3><p>${esc(s)}</p></span><span class="tl-plus" aria-hidden="true">+</span></button>
      <div class="tl-body" id="tl${i}"><div><p>${esc(d)}</p></div></div></li>`).join("");
  $("#wins").innerHTML = WINS.map(([t, s], i) => `<li><span>0${i + 1}</span><div>${esc(t)}<small>${esc(s)}</small></div></li>`).join("");

  const ICON = {
    mail: '<path d="M3 6h18v12H3z M3 7l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2"/>',
    wa: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
    ig: '<rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/>',
    in: '<rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10v6M8 7.5v.1M12 16v-6M12 12.5c0-1.5 1-2.5 2.2-2.5S16 11 16 12.5V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>',
    gh: '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.6a5 5 0 0 0-1.4-3.6 4.7 4.7 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C5.8 1.1 4.7 1.4 4.7 1.4a4.7 4.7 0 0 0-.1 3.6A5 5 0 0 0 3.2 8.6c0 5.1 3.1 6.3 6.1 6.6a3 3 0 0 0-.9 2.3V21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    fv: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 17v-6h4M10 11V9.5A1.5 1.5 0 0 1 11.5 8H13" fill="none" stroke="currentColor" stroke-width="2"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 10h16M9 3v4M15 3v4" stroke="currentColor" stroke-width="2"/>',
  };
  const contacts = [
    ["mail", "EMAIL", CONFIG.email, CONFIG.email && "mailto:" + CONFIG.email],
    ["wa", "WHATSAPP", CONFIG.whatsapp && "+" + CONFIG.whatsapp, CONFIG.whatsapp && "https://wa.me/" + CONFIG.whatsapp],
    ["cal", "BOOK A SLOT", CONFIG.calendly && "Pick a time", CONFIG.calendly],
    ["ig", "INSTAGRAM", CONFIG.instagram && CONFIG.instagram.replace(/^https?:\/\/(www\.)?/, ""), CONFIG.instagram],
    ["in", "LINKEDIN", CONFIG.linkedin && "Connect", CONFIG.linkedin],
    ["gh", "GITHUB", "COSMIC-2318", CONFIG.github],
    ["fv", "FIVERR", "ankit_2318", CONFIG.fiverr],
  ].filter((c) => c[3]);
  $("#contact-list").innerHTML = contacts.map(([ic, l, v, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[ic]}</svg></span><span><small>${l}</small><b>${esc(v)}</b></span><span class="arr" aria-hidden="true">↗</span></a></li>`).join("");
  $("#year").textContent = new Date().getFullYear();
})();

/* ============================ PART 4: INTERACTIONS ============================ */
(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  /* --- work filters --- */
  $$(".filter").forEach((b) => b.addEventListener("click", () => {
    $$(".filter").forEach((x) => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-selected", on); });
    const f = b.dataset.f;
    $$(".work").forEach((w) => w.classList.toggle("hide", f !== "all" && w.dataset.group !== f));
  }));

  /* --- raw → real slider --- */
  const r = rng(42), syms = ["NIFTY-FUT", "RELIANCE", "HDFCBANK", "INFY", "TCS"];
  let px = 24812.35, lines = [];
  for (let i = 0; i < 60; i++) {
    px += (r() - .5) * 6; const side = r() > .5, ms = String(Math.floor(r() * 999)).padStart(3, "0");
    lines.push(`09:15:${String(1 + Math.floor(i / 3)).padStart(2, "0")}.${ms}  ${syms[i % 5].padEnd(9)}  <span class="${side ? "b" : "s"}">${side ? "B" : "S"}</span>  ${px.toFixed(2)}  x${String(25 * (1 + Math.floor(r() * 8))).padStart(4)}  bid ${(px - .25).toFixed(2)} ask ${(px + .05).toFixed(2)}`);
  }
  $("#cmp-raw").innerHTML = lines.join("\n");
  const cmp = $("#compare"), range = $("#cmp-range"), s = $("#cmp-svg");
  const setPos = () => cmp.style.setProperty("--pos", range.value + "%");
  range.addEventListener("input", setPos); setPos();
  const drawReal = () => {
    const W = s.clientWidth, H = s.clientHeight; if (!W) return;
    s.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const rr = rng(8), n = 80, pad = 30, top = 40, bot = H - 70, xs = (i) => pad + (i / (n - 1)) * (W - pad * 2);
    let p = 0.5, pts = [];
    for (let i = 0; i < n; i++) { const v = i > 30 && i < 56 ? .07 : .025; p = Math.min(.95, Math.max(.05, p + (rr() - .48) * v)); pts.push(p); }
    const y = (v) => bot - v * (bot - top);
    let o = `<rect x="${xs(30)}" y="0" width="${xs(56) - xs(30)}" height="${H}" fill="rgba(232,32,47,.12)"/>`;
    o += `<text x="${pad}" y="26" fill="#6e6e79" font-family="JetBrains Mono" font-size="10">REGIME · CALM</text><text x="${xs(31)}" y="26" fill="${RED}" font-family="JetBrains Mono" font-size="10">REGIME · VOLATILE</text>`;
    for (let k = 1; k < 4; k++) o += `<line x1="${pad}" x2="${W - pad}" y1="${top + k * (bot - top) / 4}" y2="${top + k * (bot - top) / 4}" stroke="#1d1d25"/>`;
    o += `<path d="${pts.map((v, i) => `${i ? "L" : "M"}${xs(i).toFixed(1)} ${y(v).toFixed(1)}`).join("")}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    [12, 26, 38, 47, 63, 72].forEach((i, k) => { const up = k % 2 === 0; o += `<path d="M${xs(i)} ${y(pts[i]) + (up ? 16 : -16)} l-5 ${up ? 8 : -8} h10z" fill="${up ? "#3ddc84" : RED}"/>`; });
    const cell = (W - pad * 2) / 40;
    for (let k = 0; k < 40; k++) for (let j = 0; j < 3; j++) { const v = rr(); o += `<rect x="${pad + k * cell}" y="${H - 54 + j * 12}" width="${cell - 2}" height="10" rx="2" fill="${v > .8 ? RED : v > .5 ? "#4a1820" : "#1c1c24"}"/>`; }
    o += `<text x="${W - pad}" y="${H - 60}" text-anchor="end" fill="#6e6e79" font-family="JetBrains Mono" font-size="10">FEATURES (3 OF 46)</text>`;
    o += `<rect x="${W - pad - 150}" y="${top - 4}" width="150" height="26" rx="4" fill="${RED}"/><text x="${W - pad - 75}" y="${top + 13}" text-anchor="middle" fill="#fff" font-family="JetBrains Mono" font-size="11" font-weight="700">SIGNAL ↑  p = 0.71</text>`;
    s.innerHTML = o;
  };
  const roS = new ResizeObserver(drawReal); roS.observe(s);

  /* --- journey accordion --- */
  $$(".tl-btn").forEach((b) => b.addEventListener("click", () => {
    const li = b.parentElement, open = !li.classList.contains("open");
    li.classList.toggle("open", open); b.setAttribute("aria-expanded", open);
  }));

  /* --- music --- */
  const audio = $("#music"), btns = $$(".js-music");
  let fadeT, userMuted = false;
  try { userMuted = localStorage.getItem("cosmic-music") === "off"; } catch (e) {}
  const setUI = (on) => btns.forEach((b) => {
    b.classList.toggle("playing", on); b.setAttribute("aria-pressed", on);
    b.setAttribute("aria-label", on ? "Pause background music" : "Play background music");
    const l = b.querySelector(".sound-label"); if (l) l.textContent = on ? "Sound on" : "Sound off";
  });
  const fadeTo = (target, done) => {
    clearInterval(fadeT);
    fadeT = setInterval(() => {
      const v = audio.volume + (target > audio.volume ? .05 : -.05);
      if ((target > audio.volume && v >= target) || (target <= audio.volume && v <= target)) { audio.volume = target; clearInterval(fadeT); done && done(); }
      else audio.volume = Math.max(0, Math.min(1, v));
    }, 40);
  };
  audio.loop = false;
  audio.addEventListener("ended", () => { setUI(false); audio.currentTime = 0; });   // plays once, then the buttons show "off"
  const play = () => { audio.volume = 0; audio.play().then(() => { setUI(true); fadeTo(.55); }).catch(() => setUI(false)); };
  const pause = () => fadeTo(0, () => { audio.pause(); setUI(false); });
  btns.forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const on = audio.paused; on ? play() : pause();
    try { localStorage.setItem("cosmic-music", on ? "on" : "off"); } catch (err) {}
  }));
  // The "Open Visit" button starts the music (a click is what browsers need to allow sound).
  window.cosmicMusic = {
    play: () => { if (audio.paused) play(); },
    pause: () => { if (!audio.paused) { audio.pause(); setUI(false); } },
    playing: () => !audio.paused,
  };

  /* --- booking dialog --- */
  const dlg = $("#book"), err = $("#f-error"), status = $("#f-status"), date = $("#f-date");
  const d = new Date(); d.setDate(d.getDate() + 2);
  date.value = d.toISOString().slice(0, 10); date.min = new Date().toISOString().slice(0, 10);
  $$(".js-book").forEach((b) => b.addEventListener("click", () => { status.textContent = ""; dlg.showModal(); }));
  $("#book-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

  const sendBtns = [];
  if (CONFIG.email) sendBtns.push(["email", "Send by email", "btn btn-red"]);
  if (CONFIG.whatsapp) sendBtns.push(["wa", "Send on WhatsApp", CONFIG.email ? "btn btn-ghost" : "btn btn-red"]);
  sendBtns.push(["copy", "Copy message", sendBtns.length ? "btn btn-ghost" : "btn btn-red"]);
  $("#send-btns").innerHTML = sendBtns.map(([k, t, c]) => `<button type="button" class="${c}" data-send="${k}">${t}</button>`).join("");

  const message = () => {
    const v = (id) => $(id).value.trim();
    if (!v("#f-name") || !v("#f-email") || !v("#f-msg")) { err.textContent = "Please add your name, email and a short note."; return null; }
    err.textContent = "";
    const kind = $('input[name="kind"]:checked').value;
    const when = v("#f-date") ? new Date(v("#f-date") + "T12:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "Flexible";
    return { subject: `${kind} request from ${v("#f-name")}`, body: `Hi Cosmic,\n\n${kind} request from ${v("#f-name")} (${v("#f-email")}).\nPreferred: ${when}, ${v("#f-time")} IST.\n\n${v("#f-msg")}\n\nThanks!` };
  };
  $("#send-btns").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-send]"); if (!b) return;
    const m = message(); if (!m) return;
    if (b.dataset.send === "email") { location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.body)}`; status.textContent = "Your email app should open with the message ready."; }
    else if (b.dataset.send === "wa") { window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(m.body)}`, "_blank", "noopener"); status.textContent = "WhatsApp opened with your message."; }
    else { try { await navigator.clipboard.writeText(m.body); status.textContent = "Message copied. Paste it into any of the contact links."; } catch (x) { status.textContent = "Couldn't copy automatically; please select and copy your note."; } }
  });
})();

/* ============================ PART 5: BUILD ENGINE ============================
   After "Open Visit":
   1. The music starts and a 50-second clock starts with it (BUILD.seconds).
   2. The page scrolls itself in ONE continuous, constant-speed glide to the bottom.
   3. 18 cursor agents build every layer as it comes on screen, at a calm steady
      pace: fly to it, draw a wireframe with its size (rulers highlight it), then
      type, wipe or fade it in. Free agents scout ahead where the next parts appear.
   4. At 50 s everything is built; the agents gather on the last card and fade,
      then the page glides back to the top (BUILD.backToTop).
   Scroll yourself and the tour pauses (building continues as you scroll);
   "Tour ▶" in the dock resumes it.
   ============================================================================ */
(() => {
  const $ = (s) => document.querySelector(s);
  const body = document.body;

  const SELECTOR = [
    ".nav", ".hero-word", ".hero-photo", ".hero-role", ".hello", ".hero-name", ".hero-lead", ".hero-btns .btn", ".hero-side",
    ".reel-bar", ".eyebrow", ".h-big", ".h-cond", ".sec-count", ".filters", ".work", ".logos-label", ".logo-row li",
    ".laurel", ".num-left > p.dim", ".num-list li", ".raw-text > p", ".compare", ".about-intro", ".edu-item", ".label",
    ".chips", ".process li", ".quote-card", ".timeline li", ".wins li", ".contact-grid > div > p.dim", ".contact-grid .btn",
    ".contact-list li", ".feel-card", ".footer-in > *",
  ].join(",");
  const COLORS = ["#e8202f", "#2f8cff", "#ffd60a", "#30d158", "#bf5af2", "#ff9f0a", "#64d2ff", "#ff375f", "#ffffff"];

  const layerBox = $("#build-layer"), dock = $("#dock");
  const ui = { agents: $("#dock-agents"), done: $("#dock-done"), total: $("#dock-total"), bar: $("#dock-bar"), status: $("#dock-status"), dots: $("#dock-dots") };
  const rx = $("#rx-hi"), ry = $("#ry-hi"), pauseBtn = $("#dock-pause");
  let layers = [], agents = [], done = 0, running = false, paused = false, runId = 0, io;
  let speed = 1;                      // >1 when a screen is behind schedule
  let tourOn = false, tourId = 0;     // auto-scroll state

  /* ---- a clock that stops while paused, so the 50 s plan stays in sync ---- */
  const clock = { t0: 0, pausedAt: 0, pausedTotal: 0,
    start() { this.t0 = performance.now(); this.pausedTotal = 0; this.pausedAt = 0; },
    pause() { if (!this.pausedAt) this.pausedAt = performance.now(); },
    resume() { if (this.pausedAt) { this.pausedTotal += performance.now() - this.pausedAt; this.pausedAt = 0; } },
    now() { return (this.pausedAt || performance.now()) - this.t0 - this.pausedTotal; } };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const wait = async (ms) => { const end = clock.now() + ms; while (clock.now() < end) await sleep(Math.min(100, end - clock.now() + 1)); };
  const S = (ms) => sleep(ms / speed);

  /* ---- rulers ---- */
  const drawRulers = () => {
    let a = "", b = "";
    for (let x = 0; x < innerWidth; x += 100) a += `<span style="left:${x}px">${x}</span>`;
    for (let y = 100; y < innerHeight; y += 100) b += `<span style="top:${y}px">${y}</span>`;
    $("#rx-nums").innerHTML = a; $("#ry-nums").innerHTML = b;
  };
  drawRulers(); addEventListener("resize", drawRulers);
  const markRulers = (r) => { rx.style.left = Math.max(0, r.left - 18) + "px"; rx.style.width = r.width + "px"; ry.style.top = Math.max(0, r.top) + "px"; ry.style.height = r.height + "px"; };

  const status = (t) => (ui.status.textContent = t);
  const updateDock = () => { ui.done.textContent = done; ui.bar.style.width = (layers.length ? (done / layers.length) * 100 : 0) + "%"; };

  const collect = () => [...new Set(document.querySelectorAll(SELECTOR))]
    .filter((el) => !el.closest("#dock, dialog, #gate"))
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
    .map((el) => {
      const t = el.textContent.trim();
      const textOnly = el.children.length === 0 && t.length > 1 && t.length <= 60 && !/^(BUTTON|A)$/.test(el.tagName);
      const mode = textOnly ? "type" : /^(P|H1|H2|H3|SPAN)$/.test(el.tagName) ? "wipe" : "box";
      return { el, mode, state: "waiting", text: el.textContent };
    });

  const show = (L) => {
    L.el.classList.remove("wipe", "go", "typing", "caret");
    L.el.style.minWidth = "";
    if (L.mode === "type") L.el.textContent = L.text;
    L.el.classList.add("built");
    if (L.state !== "built") { L.state = "built"; done++; }
  };

  /* ---- agents ---- */
  const cursor = (c) => `<svg viewBox="0 0 24 24"><path d="M3 2l18 8-7.5 2.2L10 20z" fill="${c}" stroke="#000" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
  const makeAgents = (n) => {
    agents.forEach((a) => a.node.remove());
    agents = Array.from({ length: n }, (_, i) => {
      const node = document.createElement("div");
      node.className = "agent"; node.innerHTML = cursor(COLORS[i % COLORS.length]);
      layerBox.appendChild(node);
      return { node, color: COLORS[i % COLORS.length], x: 0, y: 0 };
    });
    ui.agents.textContent = n;
    ui.dots.innerHTML = agents.slice(0, 6).map((a) => `<i style="background:${a.color}"></i>`).join("");
  };
  const move = (a, x, y, ms = 400) => { a.x = x; a.y = y; a.node.style.transitionDuration = ms / speed + "ms"; a.node.style.transform = `translate(${x}px,${y}px)`; };

  const build = async (a, L, id) => {
    const el = L.el, r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) { show(L); return; }
    const x = r.left + scrollX, y = r.top + scrollY;
    // calm, steady pace (no rushing): fly, draw the frame, then reveal
    const fly = Math.min(800, 320 + Math.hypot(x - a.x, y - a.y) * .35);
    move(a, x - 4, y - 4, fly); await S(fly); if (id !== runId) return;

    const w = document.createElement("div");
    w.className = "wire" + (agents.indexOf(a) % 3 === 0 ? " red" : "");
    w.style.left = x + "px"; w.style.top = y + "px";
    w.style.transitionDuration = 700 / speed + "ms";
    w.innerHTML = `<b>${Math.round(r.width)} × ${Math.round(r.height)}</b>`;
    layerBox.appendChild(w); w.offsetWidth;
    w.style.width = r.width + "px"; w.style.height = r.height + "px";
    markRulers(el.getBoundingClientRect());
    move(a, x + Math.min(r.width, innerWidth) - 6, y + Math.min(r.height, 600) - 6, 700);
    await S(720); if (id !== runId) { w.remove(); return; }

    if (L.mode === "type") {
      el.style.minWidth = r.width + "px"; el.textContent = ""; el.classList.add("typing", "caret");
      move(a, x + 2, y + r.height / 2, 300);
      const t = L.text, step = Math.max(28, Math.min(70, 1100 / t.length));
      for (let i = 1; i <= t.length; i++) { if (id !== runId) return; while (paused) await sleep(120); el.textContent = t.slice(0, i); await S(step); }
    } else if (L.mode === "wipe") {
      el.style.transitionDuration = 900 / speed + "ms";
      el.classList.add("wipe"); el.offsetWidth; el.classList.add("go");
      move(a, x + Math.min(r.width, innerWidth) - 6, y + r.height / 2, 900); await S(920);
      el.style.transitionDuration = "";
    } else { el.classList.add("built"); await S(450); }
    if (id !== runId) return;
    show(L); updateDock();
    w.classList.add("fade"); setTimeout(() => w.remove(), 350);
  };

  const work = async (a, id) => {
    while (id === runId && running) {
      while (paused) await sleep(150);
      // anything that already scrolled past the top unbuilt simply appears (no one is looking there)
      layers.forEach((l) => { if ((l.state === "eligible" || l.state === "waiting") && l.el.getBoundingClientRect().bottom < 0) { show(l); updateDock(); } });
      const L = layers.find((l) => l.state === "eligible");
      if (!L) {
        if (done >= layers.length) return;
        // no job: scout ahead in the lower part of the screen, where the next things will appear
        move(a, scrollX + 40 + Math.random() * (innerWidth - 80), scrollY + innerHeight * (.45 + Math.random() * .5), 800);
        if (!tourOn && !layers.some((l) => l.state === "claimed")) status("Building as you scroll…");
        await sleep(600 + Math.random() * 400); continue;
      }
      L.state = "claimed";
      await build(a, L, id);
    }
  };

  /* ---- intro swarm (~1.5 s) ---- */
  const intro = async (id) => {
    status("Scanning page…");
    const cx = scrollX + innerWidth / 2, cy = scrollY + innerHeight / 2;
    agents.forEach((a) => move(a, cx + (Math.random() - .5) * 30, cy + (Math.random() - .5) * 30, 0));
    for (let k = 0; k < 4; k++) {
      agents.forEach((a, i) => { const ang = (i / agents.length) * Math.PI * 2 + k * .9, rad = 60 + Math.random() * 120; move(a, cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad * .7, 380); });
      await wait(380); if (id !== runId) return;
    }
  };

  /* ---- the tour: ONE continuous scroll at constant speed, top → bottom ----
     Starts after the intro, reaches the bottom 4 s before the deadline (the last
     screen finishes there), with a short soft start and soft stop. */
  const soft = (k, a = .05) => (k <= 0 ? 0 : k >= 1 ? 1 : k < a ? (k * k) / (2 * a * (1 - a)) : k > 1 - a ? 1 - ((1 - k) ** 2) / (2 * a * (1 - a)) : (k - a / 2) / (1 - a));
  const tour = (id, tid) => {
    const fromY = scrollY, t0 = clock.now();
    const tEnd = Math.max(t0 + 8000, BUILD.seconds * 1000 - 4000);
    status("Building…");
    const step = () => {
      if (tid !== tourId || !tourOn || id !== runId) return;
      const maxY = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      const k = (clock.now() - t0) / (tEnd - t0);
      if (!paused) scrollTo({ top: fromY + (maxY - fromY) * soft(k), behavior: "instant" });
      if (k < 1) requestAnimationFrame(step); else { tourOn = false; $("#dock-tour").hidden = true; status("Final touches…"); }
    };
    requestAnimationFrame(step);
  };

  const stopTour = (why) => {
    if (!tourOn) return;
    tourOn = false; tourId++;
    $("#dock-tour").textContent = "Tour ▶"; $("#dock-tour").hidden = false;
    if (why) status(why);
  };
  const startTour = () => {
    if (!running) return;
    tourOn = true; tourId++;
    $("#dock-tour").textContent = "Tour ❚❚"; $("#dock-tour").hidden = false;
    tour(runId, tourId);
  };
  // the visitor scrolls on their own → the tour steps aside
  const userScroll = (e) => {
    if (!tourOn) return;
    if (e.type === "keydown" && !["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(e.key)) return;
    stopTour("Tour paused · building as you scroll");
  };
  addEventListener("wheel", userScroll, { passive: true });
  addEventListener("touchmove", userScroll, { passive: true });
  addEventListener("keydown", userScroll);

  /* ---- smooth scroll back to the top at the end ---- */
  const glideTop = (ms) => new Promise((res) => {
    const from = scrollY, t0 = performance.now();
    const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let cancelled = false;
    const cancel = () => { cancelled = true; };
    addEventListener("wheel", cancel, { once: true, passive: true }); addEventListener("touchstart", cancel, { once: true, passive: true });
    const step = (now) => {
      if (cancelled) return res();
      const k = Math.min(1, (now - t0) / ms);
      scrollTo({ top: from * (1 - ease(k)), behavior: "instant" });
      k < 1 ? requestAnimationFrame(step) : res();
    };
    requestAnimationFrame(step);
  });

  /* ---- finish: agents gather on the last card, fade, then the page returns to the top ---- */
  const finish = async (fromTour) => {
    if (!running) return;
    running = false; stopTour(); speed = 1;
    $("#dock-tour").hidden = true;
    status("Build complete"); body.classList.remove("building");
    dock.classList.add("done");
    layerBox.querySelectorAll(".wire").forEach((w) => w.remove());
    const card = $(".feel-card"), r = card && card.getBoundingClientRect();
    if (r && r.top < innerHeight && r.bottom > 0) {
      agents.forEach((a, i) => move(a, r.left + scrollX + 30 + Math.random() * (r.width - 60), r.top + scrollY + 40 + Math.random() * (r.height - 80), 700 + i * 20));
      await sleep(1500);
    }
    agents.forEach((a) => (a.node.style.opacity = "0"));
    if (fromTour && BUILD.backToTop && scrollY > 0) { await sleep(400); status("Back to the top · scroll to explore"); await glideTop(2600); }
    status("Build complete · scroll to explore");
    setTimeout(() => dock.classList.add("mini"), 2500);
  };
  // ends when everything is built — or at the deadline, when the rest appears at once
  const watch = async (id, toured) => {
    const deadline = BUILD.seconds * 1000;
    while (id === runId && done < layers.length && !(toured && clock.now() >= deadline)) await sleep(200);
    if (id !== runId) return;
    if (done < layers.length) { layers.forEach((l) => { if (l.state !== "built") show(l); }); updateDock(); }
    // when touring, keep the music-timed ending: finish at the deadline, not earlier
    while (toured && id === runId && clock.now() < deadline - 1500) await sleep(200);
    if (id === runId) finish(toured);
  };

  const start = async () => {
    runId++; const id = runId;
    running = true; paused = false; done = 0; speed = 1;
    body.classList.add("building"); body.classList.remove("enter");
    dock.classList.remove("done", "mini"); pauseBtn.textContent = "❚❚";
    layerBox.querySelectorAll(".wire").forEach((w) => w.remove());
    layers.forEach((L) => { if (L.mode === "type") L.el.textContent = L.text; });
    layers = collect();
    layers.forEach((L) => { L.el.classList.remove("built", "wipe", "go", "typing", "caret"); L.el.classList.add("L"); });
    ui.total.textContent = layers.length; updateDock();
    makeAgents(innerWidth < 640 ? Math.ceil(BUILD.agents / 2) : BUILD.agents);
    agents.forEach((a) => (a.node.style.opacity = "1"));
    if (io) io.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const L = layers.find((l) => l.el === e.target);
      if (L && L.state === "waiting") L.state = "eligible";
      io.unobserve(e.target);
    }), { rootMargin: "0px 0px -6% 0px" });
    clock.start();
    await intro(id); if (id !== runId) return;
    layers.forEach((L) => io.observe(L.el));
    agents.forEach((a) => work(a, id));
    watch(id, BUILD.tour);
    if (BUILD.tour) startTour();
  };

  const skip = () => { runId++; stopTour(); layers.forEach(show); updateDock(); finish(false); dock.classList.add("mini"); };

  /* ---- dock buttons ---- */
  const tourBtn = document.createElement("button");
  tourBtn.type = "button"; tourBtn.id = "dock-tour"; tourBtn.className = "dock-btn"; tourBtn.hidden = true;
  pauseBtn.before(tourBtn);
  tourBtn.addEventListener("click", () => (tourOn ? stopTour("Tour paused") : startTour()));
  $("#dock-skip").addEventListener("click", skip);
  $("#dock-replay").addEventListener("click", () => { tourOn = false; tourId++; scrollTo({ top: 0, behavior: "instant" }); window.cosmicMusic && window.cosmicMusic.play(); start(); });
  pauseBtn.addEventListener("click", () => {
    if (!running) return;
    paused = !paused;
    paused ? clock.pause() : clock.resume();
    paused ? window.cosmicMusic && window.cosmicMusic.pause() : window.cosmicMusic && window.cosmicMusic.play();
    pauseBtn.textContent = paused ? "▶" : "❚❚"; status(paused ? "Paused" : "Building…");
  });
  // in-page links during a build: show everything so the target is there
  document.addEventListener("click", (e) => { const a = e.target.closest('a[href^="#"]'); if (a && running && a.getAttribute("href").length > 1 && !a.closest(".hero")) skip(); });

  /* ---- the gate: nothing happens until "Open Visit" ---- */
  const gate = $("#gate");
  const showStatic = () => {
    layers = collect(); ui.total.textContent = layers.length; done = layers.length; updateDock();
    status("Build complete"); dock.classList.add("done", "mini"); body.classList.add("enter");
  };
  const closeGate = () => { gate.classList.add("out"); setTimeout(() => { body.classList.remove("gated"); gate.remove(); }, 650); };
  const open = () => {
    if (gate.classList.contains("out")) return;
    document.documentElement.classList.add("force-motion");   // the visitor asked for the show
    window.cosmicMusic && window.cosmicMusic.play();
    if (BUILD.enabled) { body.classList.add("building"); start(); } else showStatic();
    closeGate();
  };
  $("#gate-year").textContent = new Date().getFullYear();
  $("#gate-open").addEventListener("click", open);
  $("#gate-skip").addEventListener("click", () => { showStatic(); closeGate(); });
  addEventListener("keydown", (e) => { if (e.key === "Enter" && body.classList.contains("gated") && document.activeElement !== $("#gate-skip")) { e.preventDefault(); open(); } });
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  body.classList.add("gated");
  scrollTo(0, 0);
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => $("#gate-open").focus({ preventScroll: true }));
})();
