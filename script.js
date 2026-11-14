/* =========================================================
   ADOR — CONFIG (edit contact info here only)
   ========================================================= */
const ADOR_CONFIG = {
  contact: {
    whatsapp: { number: "8801791001177", url: "https://wa.me/8801791001177" },
    email: "mustakimador17@gmail.com",
    linkedin: "https://www.linkedin.com/in/siratal-mustakim-ador-0717b9314/",
    instagram: "https://www.instagram.com/mustakimador7/",
    facebook: "https://www.facebook.com/daredevil.charlie"
  }
};

const ACCENT = { Excel: "#3DDC84", SQL: "#4DA3FF", Python: "#F5C518" };

/* =========================================================
   CATALOG — 6 Excel + 6 SQL + 4 Python
   [id, name, category, type, subject, price, description]
   ========================================================= */
const RAW = [
  ["excel-beginner", "Excel Beginner", "Beginner", "individual", "Excel", 99, "Excel learning material for beginners."],
  ["excel-formula-workbook", "Excel Formula Workbook", "Practical Skills", "individual", "Excel", 249, "Practical formula practice material."],
  ["excel-phase-1", "Excel Phase 1", "Intermediate", "individual", "Excel", 149, "Intermediate-level Excel learning material (Phase 1)."],
  ["excel-advanced", "Excel Advanced", "Advanced", "individual", "Excel", 149, "Advanced-level Excel learning material."],
  ["excel-phase-2", "Excel Phase 2", "Advanced", "individual", "Excel", 199, "Advanced-level Excel learning material (Phase 2)."],
  ["excel-complete", "Excel Complete Collection", "Complete", "bundle", "Excel", 650, "The complete Excel learning package, from beginner to advanced."],

  ["sql-basic-pdf", "Basic_SQL_learning PDF", "Beginner", "individual", "SQL", 199, "Basic SQL learning PDF for beginners."],
  ["mysql-retail-setup", "MySQL Retail Analytics Setup", "Beginner", "individual", "SQL", 149, "Practical database setup for the Retail Analytics practice database."],
  ["mysql-retail-seed-data", "MySQL Retail Analytics Seed Data", "Practical Learner", "individual", "SQL", 149, "Seed data resources for Retail Analytics practice."],
  ["mysql-advanced-projects", "MySQL Advanced Business Projects", "Advanced Learner", "individual", "SQL", 299, "Advanced business projects for MySQL practice."],
  ["mysql-practice-solutions", "MySQL Complete Practice Solutions", "Solution Seeker", "individual", "SQL", 199, "Solutions for the MySQL practice exercises."],
  ["sql-complete-bundle", "SQL for Aspirants – Complete Bundle (4 Files + PDF Handbook)", "Complete Course", "bundle", "SQL", 499, "The complete SQL bundle: 4 files plus a PDF handbook."],

  ["python-fundamentals", "Python Fundamentals (Modules 01–08)", "Beginner", "individual", "Python", 399, "Python fundamentals covering Modules 01–08."],
  ["python-data-analysis", "Python for Data Analysis (Modules 09–13)", "Data Analyst", "individual", "Python", 399, "Python for data analysis covering Modules 09–13."],
  ["python-business-analysis", "Python for Business Analysis (Modules 09–14)", "Business Analyst", "individual", "Python", 699, "Python for business analysis covering Modules 09–14."],
  ["python-complete", "Python for Data & Business Analysts (All 14 Modules)", "Complete", "bundle", "Python", 999, "The complete Python package: all 14 modules."]
];

const MODULE_RANGE = {
  "python-fundamentals": [1, 8], "python-data-analysis": [9, 13],
  "python-business-analysis": [9, 14], "python-complete": [1, 14]
};

const COVER_BY_SUBJECT = {
  Excel: "assets/covers/excel.png",
  SQL: "assets/covers/sql.png",
  Python: "assets/covers/python.png"
};

/* Which individual products make up each complete collection */
const BUNDLE_OF = {
  "excel-complete": ["excel-beginner", "excel-formula-workbook", "excel-phase-1", "excel-advanced", "excel-phase-2"],
  "sql-complete-bundle": ["sql-basic-pdf", "mysql-retail-setup", "mysql-retail-seed-data", "mysql-advanced-projects", "mysql-practice-solutions"],
  "python-complete": ["python-fundamentals", "python-business-analysis"]
};

const BEST_FOR = {
  "Beginner": "Learners starting from the basics",
  "Practical Skills": "Learners who want hands-on practice",
  "Intermediate": "Learners who know the basics and want to go further",
  "Advanced": "Learners ready for advanced topics",
  "Practical Learner": "Learners practising on the Retail Analytics database",
  "Advanced Learner": "Learners ready for advanced business projects",
  "Solution Seeker": "Learners who want solutions to check their practice",
  "Data Analyst": "Aspiring data analysts",
  "Business Analyst": "Aspiring business analysts",
  "Complete": "Learners who want the full path in one package",
  "Complete Course": "Learners who want the full path in one package"
};

/* What each complete collection includes (from the cover artwork) */
const INCLUDES = {
  Excel: ["Structured learning materials", "Formula practice exercises", "Hands-on spreadsheet tasks", "Tables, charts & dashboard practice"],
  SQL: ["Structured SQL study materials", "Dedicated PDF handbook", "Practical SQL exercises", "Ready-to-execute SQL code"],
  Python: ["Organized learning resources", "Practical coding exercises", "Practice & check files", "Solutions and README documentation"]
};

const PRODUCTS = RAW.map(([id, name, category, type, subject, price, description]) => {
  const r = MODULE_RANGE[id];
  return {
    id, name, category, type, subject, price, description,
    accent: ACCENT[subject],
    image: COVER_BY_SUBJECT[subject],
    modules: r ? Array.from({ length: r[1] - r[0] + 1 }, (_, i) => "Module " + String(r[0] + i).padStart(2, "0")) : null
  };
});

/* =========================================================
   DISCOUNT POLICY — manual confirmation, one tier, no stacking
   ========================================================= */
const DISCOUNTS = [
  { label: "Regular Price", pct: 0, reason: "Standard product price" },
  { label: "First-Time Customer", pct: 5, reason: "First-time customer" },
  { label: "Returning Customer", pct: 10, reason: "Returning customer" },
  { label: "Special Promotion", pct: 15, reason: "Promotional offer, subject to the relevant promotion" },
  { label: "Bulk Purchase", pct: 20, reason: "Bulk purchase, confirmed by ADOR" }
];
const finalPrice = (base, pct) => Math.round(base - (base * pct) / 100);

/* =========================================================
   APPLICATION
   ========================================================= */
(function () {
  "use strict";

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const C = ADOR_CONFIG.contact;
  const money = (n) => "৳" + n;
  const EXT = 'target="_blank" rel="noopener noreferrer"';

  const NAV = [["#home", "Home"], ["#about", "About"], ["#portfolio", "Portfolio"], ["#courses", "Courses"], ["#contact", "Contact"]];
  const CHANNELS = [
    { id: "whatsapp", icon: "WA", name: "WhatsApp", desc: "Fastest for orders" },
    { id: "instagram", icon: "IG", name: "Instagram", desc: "Message on Instagram" },
    { id: "linkedin", icon: "in", name: "LinkedIn", desc: "Message on LinkedIn" }
  ];

  /* ---------- header & footer ---------- */
  $("#site-header").innerHTML = `
    <header class="site-header"><div class="wrap bar">
      <a class="brand" href="#home" aria-label="ADOR home">ADOR</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
      <nav id="nav" aria-label="Main navigation">
        ${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}
        <a class="btn btn-primary" href="#courses">Browse Courses</a>
      </nav>
    </div></header>`;

  $("#site-footer").innerHTML = `
    <footer class="site-footer"><div class="wrap foot">
      <div><strong>ADOR</strong><p>Turning knowledge into practical solutions through business, data and technology.</p></div>
      <div class="foot-links">
        <a data-contact="linkedin" ${EXT}>LinkedIn</a><a data-contact="instagram" ${EXT}>Instagram</a>
        <a data-contact="facebook" ${EXT}>Facebook</a><a data-contact="whatsapp" ${EXT}>WhatsApp</a><a data-contact="email">Email</a>
      </div>
      <small>© ${new Date().getFullYear()} ADOR. Siratal Mustakim Ador.</small>
    </div></footer>`;

  /* ---------- contact wiring ---------- */
  function wireContacts() {
    $$("[data-contact]").forEach((el) => {
      const key = el.dataset.contact;
      const small = el.dataset.show ? $("small", el) : null;
      if (key === "email") { el.href = "mailto:" + C.email; if (small) small.textContent = C.email; }
      else if (key === "whatsapp") { el.href = C.whatsapp.url; if (small) small.textContent = "+" + C.whatsapp.number; }
      else if (C[key]) el.href = C[key];
    });
  }

  /* ---------- mobile nav ---------- */
  const menuBtn = $(".menu-btn"), nav = $("#nav");
  const closeNav = () => { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); };
  menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", String(nav.classList.toggle("open"))));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeNav(); });

  /* ---------- order dialog (manual ordering) ---------- */
  const dialog = document.createElement("dialog");
  dialog.className = "order-dialog";
  dialog.setAttribute("aria-labelledby", "order-title");
  document.body.appendChild(dialog);

  function openOrder(p) {
    if (!p) return;
    const msg = `Hello ADOR, I am interested in purchasing ${p.name}. The listed price is ৳${p.price}. Please share the ordering and payment details. I would also like to know whether I qualify for any available discount.`;
    const urls = { whatsapp: C.whatsapp.url + "?text=" + encodeURIComponent(msg), instagram: C.instagram, linkedin: C.linkedin };
    dialog.innerHTML = `
      <h2 id="order-title">Order: ${p.name}</h2>
      <p><strong>Regular price: ${money(p.price)}</strong></p>
      <p>Choose a channel to contact ADOR. ADOR confirms the final price and any eligible discount before payment, and delivers the product manually.</p>
      <ul class="channels">${CHANNELS.map((c) => `
        <li><a class="channel" href="${urls[c.id]}" ${EXT}><span class="ico">${c.icon}</span>
        <span><strong>${c.name}</strong><br><small>${c.desc}</small></span></a></li>`).join("")}
      </ul>
      <p class="note">Instagram and LinkedIn do not prefill messages. Mention <strong>${p.name}</strong> when you write.</p>
      <button class="btn" type="button" id="close-dialog">Close</button>`;
    $("#close-dialog", dialog).addEventListener("click", () => dialog.close());
    dialog.showModal();
  }
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-order]");
    if (b) openOrder(PRODUCTS.find((p) => p.id === b.dataset.order));
  });

  /* ---------- product visuals & cards ---------- */
  const coverHTML = (p) => `<div class="thumb" style="--accent:${p.accent}"><img class="cover-img" src="${p.image}" alt="${p.subject} collection cover" loading="lazy"><span class="tag">${p.type === "bundle" ? "Complete" : p.category}</span></div>`;

  function card(p) {
    const bundle = p.type === "bundle";
    return `
      <article class="card ${bundle ? "featured" : ""}" style="--accent:${p.accent}">
        ${coverHTML(p)}
        <div class="card-body">
          <p class="eyebrow">${p.subject} · ${p.category}${bundle ? '<span class="badge">COMPLETE</span>' : ""}</p>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p class="price">${money(p.price)}</p>
          <div class="row">
            <a class="btn" href="#product-${p.id}">View Details</a>
            <button class="btn btn-primary" type="button" data-order="${p.id}">Order Now</button>
          </div>
        </div>
      </article>`;
  }

  const bundles = PRODUCTS.filter((p) => p.type === "bundle");
  $("#featured-products").innerHTML = bundles.map(card).join("");
  $("#collections").innerHTML = bundles.map(card).join("");

  /* hero thumbnails + marquee */
  $("#hero-strip").innerHTML = bundles.map((p) =>
    `<a href="#product-${p.id}" aria-label="${p.name}"><img src="${p.image}" alt=""></a>`).join("");
  const words = ["Excel", "SQL", "Python", "Power BI", "Data Analysis", "Business Intelligence", "Data Visualization", "Business Analysis"];
  const run = words.map((w) => `<span>${w}</span>`).join("");
  $("#marquee").innerHTML = run + run;

  /* discount table */
  $("#discount-table").innerHTML = DISCOUNTS.map((d) => `
    <tr><td><strong>${d.label}</strong></td><td>${d.pct}%</td><td>${d.reason}</td><td>${money(finalPrice(100, d.pct))}</td></tr>`).join("");

  /* ---------- store: search, filter, sort ---------- */
  const GROUPS = ["Excel", "SQL", "Python"];
  const grid = $("#store-grid"), chips = $("#chips"), search = $("#search"), sort = $("#sort");
  let active = "All";

  chips.innerHTML = ["All", ...GROUPS, "Complete Collections"].map((c) =>
    `<button class="chip" type="button" aria-pressed="${c === "All"}" data-category="${c}">${c}</button>`).join("");

  function renderStore() {
    const q = search.value.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCat = active === "All" || (active === "Complete Collections" ? p.type === "bundle" : p.subject === active);
      return inCat && [p.name, p.description, p.category, p.subject].join(" ").toLowerCase().includes(q);
    });
    if (sort.value === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort.value === "price") list.sort((a, b) => a.price - b.price);

    if (!list.length) { grid.innerHTML = `<p class="empty">No products match your search. Try another keyword or category.</p>`; return; }

    grid.innerHTML = sort.value
      ? list.map(card).join("")
      : GROUPS.map((g) => {
          const items = list.filter((p) => p.subject === g);
          return items.length ? `<h3 class="group" style="--accent:${ACCENT[g]}">${g}</h3>${items.map(card).join("")}` : "";
        }).join("");
  }

  chips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-category]");
    if (!b) return;
    active = b.dataset.category;
    $$(".chip", chips).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    renderStore();
  });
  search.addEventListener("input", renderStore);
  sort.addEventListener("change", renderStore);
  renderStore();

  /* ---------- product detail ---------- */
  const detail = $("#product-detail");
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  function renderProduct(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) {
      document.title = "Product Not Found — ADOR";
      detail.innerHTML = `<h1 class="h1-sm">Product not found</h1><p class="empty">The requested product could not be found.</p><a class="btn btn-primary" href="#courses">Back to Courses</a>`;
      return;
    }
    document.title = `${p.name} — ADOR`;
    detail.style.setProperty("--accent", p.accent);
    const bundle = p.type === "bundle";
    const byId = (i) => PRODUCTS.find((x) => x.id === i);

    /* bundle value comparison */
    let value = "";
    if (bundle) {
      const parts = BUNDLE_OF[p.id].map(byId);
      const total = parts.reduce((s, x) => s + x.price, 0);
      value = `<section class="wide"><h2>Bundle value</h2>
        <p class="compare">Bought separately: <s>${money(total)}</s> &nbsp; Complete collection: <strong>${money(p.price)}</strong> &nbsp; <span class="save">Save ${money(total - p.price)}</span></p>
        <ul>${parts.map((x) => `<li><a href="#product-${x.id}">${x.name}</a> — ${money(x.price)}</li>`).join("")}</ul></section>`;
    } else {
      const parent = PRODUCTS.find((b) => BUNDLE_OF[b.id] && BUNDLE_OF[b.id].includes(p.id)) ||
        (p.subject === "Python" ? byId("python-complete") : null);
      if (parent) value = `<section class="wide"><h2>Also available in the complete collection</h2>
        <p class="compare"><a href="#product-${parent.id}"><strong>${parent.name}</strong></a> — ${money(parent.price)}</p>
        <p class="note">The complete collection covers the full learning path in one package and costs less than buying the parts separately.</p></section>`;
    }

    const facts = [
      [money(p.price), "REGULAR PRICE"],
      [p.subject, "SUBJECT"],
      [bundle ? "Complete" : p.category, "LEVEL / TYPE"],
      ...(p.modules ? [[p.modules.length + " modules", "CONTENT"]] : []),
      ["Digital", "FORMAT"],
      ["Manual", "DELIVERY BY ADOR"]
    ];

    detail.innerHTML = `
      <div class="detail-head">
        ${coverHTML(p)}
        <div>
          <p class="eyebrow">${p.subject} · ${p.category}${bundle ? '<span class="badge">COMPLETE</span>' : ""}</p>
          <h1 class="h1-sm">${p.name}</h1>
          <p class="lead">${p.description}</p>
          <div class="facts">${facts.map(([v, l]) => `<div class="fact"><b>${v}</b><span>${l}</span></div>`).join("")}</div>
          <div class="row">
            <button class="btn btn-primary" type="button" data-order="${p.id}">Order Now — ${money(p.price)}</button>
            <a class="btn" href="#courses">All Products</a>
          </div>
        </div>
      </div>

      <div class="detail-grid">
        <section><h2>Best for</h2><p>${BEST_FOR[p.category] || "Independent learners"}.</p>
          <p class="note">Self-paced digital learning material. Practise at your own speed.</p></section>
        ${bundle ? `<section><h2>What's included</h2>${list(INCLUDES[p.subject])}</section>` : ""}
        ${p.modules ? `<section><h2>Modules covered</h2>${list(p.modules)}</section>` : ""}
        <section><h2>How to order</h2><ol>
          <li>Click Order Now and choose WhatsApp, Instagram or LinkedIn.</li>
          <li>ADOR confirms the final price and any eligible discount.</li>
          <li>Complete payment manually.</li>
          <li>ADOR delivers the product manually.</li>
        </ol></section>
        ${value}
        <section class="wide"><h2>Pricing &amp; discounts</h2>
          <p class="note">Regular price is ${money(p.price)}. Discounts are never automatic: ADOR confirms your tier before payment, and only one tier applies per order.</p>
          <div class="table-wrap"><table>
            <thead><tr><th>Tier</th><th>Discount</th><th>Your price</th></tr></thead>
            <tbody>${DISCOUNTS.map((d) => `<tr><td>${d.label}</td><td>${d.pct}%</td><td><strong>${money(finalPrice(p.price, d.pct))}</strong></td></tr>`).join("")}</tbody>
          </table></div>
          <a href="#discounts-link" data-goto="discounts">Read the full discount policy</a>
        </section>
      </div>`;
  }

  /* discount link inside product pages: go to courses, then scroll */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-goto]");
    if (!a) return;
    e.preventDefault();
    location.hash = "#courses";
    setTimeout(() => document.getElementById(a.dataset.goto)?.scrollIntoView({ behavior: "smooth" }), 80);
  });

  /* ---------- hash router ---------- */
  const TITLES = {
    home: "ADOR — Business, Data & Technology", about: "About — ADOR", portfolio: "Portfolio — ADOR",
    courses: "Courses & Digital Store — ADOR", contact: "Contact — ADOR"
  };

  function route() {
    let hash = location.hash.slice(1) || "home";
    let view = hash;
    if (hash.startsWith("product-")) { view = "product"; renderProduct(hash.slice(8)); }
    else if (!TITLES[hash]) { hash = view = "home"; }

    $$(".view").forEach((v) => { v.hidden = v.dataset.view !== view; });
    $$("#nav a[href^='#']").forEach((l) => {
      const dest = l.getAttribute("href").slice(1);
      if (dest === (view === "product" ? "courses" : hash)) l.setAttribute("aria-current", "page");
      else l.removeAttribute("aria-current");
    });
    if (TITLES[hash]) document.title = TITLES[hash];
    closeNav();
    wireContacts();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  wireContacts();
  window.addEventListener("hashchange", route);
  route();
})();
