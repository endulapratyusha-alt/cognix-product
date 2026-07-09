const homeHref = "../index.html";
const pmmPage = "../pmm.html";
const startupHref = "startups.html";
const designPartnerHref = "mailto:hello@cognix.ai?subject=Startup%20PMM%20design%20partner";

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function iconSvg(name) {
  const icons = {
    blocks: `<svg viewBox="0 0 24 24"><path d="M4 14h7v6H4v-6Z"/><path d="M13 14h7v6h-7v-6Z"/><path d="M8.5 4h7v6h-7V4Z"/><path d="m8.5 10-2 4"/><path d="m15.5 10 2 4"/></svg>`,
    brain: `<svg viewBox="0 0 24 24"><path d="M9 5a3 3 0 0 0-5 2.2 3 3 0 0 0 1.1 5.7A3.5 3.5 0 0 0 9 19V5Z"/><path d="M15 5a3 3 0 0 1 5 2.2 3 3 0 0 1-1.1 5.7A3.5 3.5 0 0 1 15 19V5Z"/><path d="M9 8H7"/><path d="M15 8h2"/><path d="M9 13H6.5"/><path d="M15 13h2.5"/></svg>`,
    chart: `<svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-7"/></svg>`,
    check: `<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>`,
    compass: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="m15.5 8.5-2.2 5-4.8 2 2.2-5 4.8-2Z"/></svg>`,
    doc: `<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h5"/></svg>`,
    globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M4 12h16"/><path d="M12 4a12 12 0 0 1 0 16"/><path d="M12 4a12 12 0 0 0 0 16"/></svg>`,
    heart: `<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>`,
    layers: `<svg viewBox="0 0 24 24"><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4"/><path d="m4 17 8 4 8-4"/></svg>`,
    loop: `<svg viewBox="0 0 24 24"><path d="M17 7h-6a5 5 0 0 0 0 10h1"/><path d="m15 4 3 3-3 3"/><path d="M7 17h6a5 5 0 0 0 0-10h-1"/><path d="m9 20-3-3 3-3"/></svg>`,
    network: `<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M11 7 6 16"/><path d="m13 7 5 9"/><path d="M7.5 18h9"/></svg>`,
    path: `<svg viewBox="0 0 24 24"><path d="M5 19c4 0 4-4 8-4s4-4 6-4"/><path d="M5 19h4"/><path d="M15 5h4v4"/><path d="m14 10 5-5"/></svg>`,
    rocket: `<svg viewBox="0 0 24 24"><path d="M13 4c3.5.4 5.6 2.5 6 6l-6.8 6.8-5-5L13 4Z"/><path d="M7 12 4 15l5 1"/><path d="m12 17 1 5 3-3"/><circle cx="14.5" cy="8.5" r="1.5"/></svg>`,
    spark: `<svg viewBox="0 0 24 24"><path d="m12 3 2 6 6 3-6 3-2 6-2-6-6-3 6-3 2-6Z"/></svg>`,
    target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v4"/><path d="M22 12h-4"/><path d="M12 22v-4"/><path d="M2 12h4"/></svg>`,
    user: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4-6 8-6s6.5 2 8 6"/></svg>`,
    users: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c1-4 3-6 6-6s5 2 6 6"/><path d="M14 15c3 0 5 1.7 6 5"/></svg>`
  };

  return (icons[name] || icons.spark).replace(
    "<svg ",
    '<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" '
  );
}

function logo() {
  return `
    <a class="brand" href="${homeHref}" aria-label="Cognix homepage">
      <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
      <span class="brand-copy">
        <strong>COGNIX</strong>
        <small>Cognition OS</small>
      </span>
    </a>`;
}

function dropdown(label, columns) {
  return `
    <div class="nav-item has-menu">
      <button type="button" aria-expanded="false">${label}<span class="chevron" aria-hidden="true"></span></button>
      <div class="nav-menu" role="menu">
        <div class="menu-grid" style="--columns:${columns.length}">
          ${columns.map((column) => `
            <div>
              ${column.title ? `<p>${esc(column.title)}</p>` : ""}
              ${column.items.map((item) => item.disabled
                ? `<span class="menu-link disabled" aria-disabled="true">${esc(item.label)}</span>`
                : `<a href="${item.href}">${esc(item.label)}</a>`).join("")}
            </div>`).join("")}
        </div>
      </div>
    </div>`;
}

function nav() {
  return `
    <header class="site-header">
      <nav class="nav-shell" aria-label="Primary navigation">
        ${logo()}
        <div class="nav-links">
          <a href="${homeHref}">Home</a>
          ${dropdown("Solutions", [
            { title: "By segment", items: [
              { label: "Startups", href: startupHref },
              { label: "Mid-market", href: `${homeHref}#stage-strip` },
              { label: "Enterprise", href: `${homeHref}#stage-strip` }
            ] },
            { title: "By team", items: [
              { label: "For product marketing", href: pmmPage },
              { label: "For CMOs", href: `${homeHref}#teams` },
              { label: "For sales enablement", href: `${homeHref}#teams` },
              { label: "For RevOps", href: `${homeHref}#teams` }
            ] },
            { title: "By use case", items: [
              { label: "Narrative drift", href: `${homeHref}#why-now` },
              { label: "Launch readiness", href: pmmPage },
              { label: "Enablement gaps", href: `${homeHref}#technology` },
              { label: "Pipeline quality risk", href: `${homeHref}#why-now` }
            ] }
          ])}
          ${dropdown("Products", [
            { title: "", items: [
              { label: "Cognix PMM", href: pmmPage },
              { label: "Cognix Enablement (coming soon)", disabled: true },
              { label: "Cognix Revenue (coming soon)", disabled: true },
              { label: "Cognix Customer Success (coming soon)", disabled: true },
              { label: "Cognix RevOps (coming soon)", disabled: true }
            ] }
          ])}
          ${dropdown("Resources", [
            { title: "Explore", items: [
              { label: "How Cognix works", href: "#how-cognix-works" },
              { label: "PMM building blocks", href: "#ecosystem" },
              { label: "Expert guidance", href: "#expert-guidance" }
            ] }
          ])}
          <a href="${homeHref}#design-partner">About us</a>
        </div>
        <a class="btn btn-primary nav-cta" href="${designPartnerHref}">Start building your PMM function</a>
        <button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      </nav>
      <div class="mobile-panel" hidden>
        <a href="${homeHref}">Home</a>
        <a href="${startupHref}">Startups</a>
        <a href="${pmmPage}">Cognix PMM</a>
        <a href="#research-path">Research path</a>
        <a href="#ecosystem">PMM building blocks</a>
        <a href="#expert-guidance">Expert guidance</a>
        <a href="${designPartnerHref}">Start building your PMM function</a>
      </div>
    </header>`;
}

function sectionLabel(text) {
  return `<p class="section-label">${esc(text)}</p>`;
}

function iconWrap(name) {
  return `<span class="icon-wrap" aria-hidden="true">${iconSvg(name)}</span>`;
}

function heroHub() {
  const inputs = [
    ["Founder & leadership", ["Vision", "Origin story", "Priorities"], "users"],
    ["Sales", ["Pipeline", "Objections", "Win / loss"], "chart"],
    ["Product", ["Roadmap", "Capabilities", "Differentiators"], "layers"],
    ["Customers", ["Pain", "Outcomes", "Buying triggers"], "heart"],
    ["Market", ["Competitors", "Trends", "Alternatives"], "globe"]
  ];
  const cognition = ["What you know", "What is missing", "What conflicts", "Who to involve", "What to do next"];
  const outcomes = [
    ["Strategic clarity", "Clear priorities and focus", "target"],
    ["Stronger influence", "Align leaders and teams", "network"],
    ["Measurable impact", "Connect work to business results", "chart"],
    ["Career growth", "Build reputation and advance", "user"]
  ];

  return `
    <div class="hub-visual" aria-label="PMM intelligence hub connecting business inputs to cognition and outcomes">
      <div class="hub-panel input-panel">
        ${inputs.map(([title, items, icon], index) => `
          <article class="hub-card input-card" style="--i:${index}">
            ${iconWrap(icon)}
            <div>
              <strong>${esc(title)}</strong>
              ${items.map((item) => `<span>${esc(item)}</span>`).join("")}
            </div>
          </article>`).join("")}
      </div>
      <div class="hub-center">
        <div class="hub-heading">
          <strong>Your PMM Intelligence Hub</strong>
          <span>One strategic view across the business.</span>
        </div>
        <div class="operator-node">
          <span class="operator-portrait" aria-hidden="true"><i></i></span>
          <strong>You</strong>
          <small>PMM operator</small>
        </div>
        <div class="cognition-layer">
          <strong>Cognix Intelligence</strong>
          ${cognition.map((item) => `<span>${iconSvg("spark")}${esc(item)}</span>`).join("")}
        </div>
      </div>
      <div class="hub-panel outcome-panel">
        ${outcomes.map(([title, copy, icon], index) => `
          <article class="hub-card outcome-card" style="--i:${index + 5}">
            ${iconWrap(icon)}
            <div><strong>${esc(title)}</strong><span>${esc(copy)}</span></div>
          </article>`).join("")}
      </div>
      <span class="hub-line line-a" aria-hidden="true"></span>
      <span class="hub-line line-b" aria-hidden="true"></span>
      <span class="hub-line line-c" aria-hidden="true"></span>
      <span class="hub-line line-d" aria-hidden="true"></span>
    </div>`;
}

function hero() {
  return `
    <section class="hero-section">
      <div class="shell hero-grid">
        <div class="hero-copy">
          ${sectionLabel("For solo PMMs & lean GTM teams")}
          <h1>Build the PMM function your company actually needs.</h1>
          <p>Cognix helps solo PMMs and lean teams turn scattered company knowledge into a structured product marketing system, so you know what to research, what to build, who to involve and what to do next.</p>
          <div class="value-points" aria-label="Startup PMM value points">
            ${["Know what to do next", "Reduce trial and error", "Prove your strategic impact"].map((item) => `<span>${iconSvg("check")}${esc(item)}</span>`).join("")}
          </div>
          <div class="hero-actions">
            <a class="btn btn-primary btn-large" data-primary-cta href="${designPartnerHref}">Start building your PMM function</a>
            <a class="btn btn-secondary btn-large" href="#how-cognix-works">${iconSvg("path")}See how Cognix works</a>
          </div>
          <p class="supporting-note">Built from real conversations with solo PMMs navigating startup chaos.</p>
        </div>
        ${heroHub()}
      </div>
    </section>`;
}

function painSection() {
  const pains = [
    ["Scattered information", "Knowledge is everywhere and nowhere.", "network"],
    ["Unclear priorities", "Too much to do. No clear sequence.", "doc"],
    ["Too many deliverables", "Constant requests before the strategy is ready.", "clock"],
    ["No strategic partner", "Big decisions with no one to pressure-test them.", "user"],
    ["Hard to prove impact", "The work happens, but its business value remains unclear.", "chart"],
    ["Loops left open", "Work gets started but never connected to outcomes.", "loop"]
  ];
  return `
    <section class="section white-section" id="reality">
      <div class="shell">
        <div class="section-intro">
          <h2>You were hired to build the function. Nobody gave you the operating system.</h2>
          <p>Startup PMMs are expected to understand the customer, support Sales, influence Product, build positioning and prepare launches, often without a mentor, complete context or clear priorities.</p>
        </div>
        <div class="card-grid six">
          ${pains.map(([title, copy, icon]) => `
            <article class="info-card compact">
              ${iconWrap(icon)}
              <h3>${esc(title)}</h3>
              <p>${esc(copy)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function researchSection() {
  const tracks = [
    ["Founder", ["Vision", "Origin story", "Strategic priorities", "Success criteria"], "users"],
    ["Sales", ["Sales cycle", "ACV", "Pipeline", "Objections", "Win/loss", "Buying patterns"], "chart"],
    ["Product", ["Capabilities", "Roadmap", "Use cases", "Differentiators", "Product limits"], "layers"],
    ["Customers", ["Pain", "Outcomes", "Buying triggers", "Alternatives", "Customer language"], "heart"],
    ["Market", ["Competitors", "Trends", "Category shifts", "Strategic opportunities"], "globe"]
  ];
  return `
    <section class="section" id="research-path">
      <div class="shell split-section">
        <div>
          ${sectionLabel("Start with the business, not the deliverables")}
          <h2>Build on truth, not assumptions.</h2>
          <p class="lead">Cognix guides you to gather the right evidence from the right people, so your strategy is credible and your work moves the business forward.</p>
          <a class="btn btn-secondary" href="${designPartnerHref}">Explore the research path</a>
        </div>
        <div class="track-panel">
          <div class="track-grid">
            ${tracks.map(([title, items, icon]) => `
              <article class="track-card">
                ${iconWrap(icon)}
                <h3>${esc(title)}</h3>
                <p>${esc(items.join(", "))}</p>
              </article>`).join("")}
          </div>
          <div class="intelligence-banner">
            ${iconSvg("spark")}
            <strong>Cognix tells you who to speak with, what to ask and what evidence you need next.</strong>
          </div>
        </div>
      </div>
    </section>`;
}

function ecosystemSection() {
  const blocks = [
    ["ICP & segmentation", "Define who you serve and why.", "target"],
    ["Positioning", "Create a clear and ownable point of view.", "compass"],
    ["Messaging", "Build language that buyers and teams can use consistently.", "doc"],
    ["Sales narrative", "Equip Sales with a story grounded in buyer reality.", "users"],
    ["Competitive intelligence", "Know where you stand and where you can win.", "globe"],
    ["Enablement assets", "Build only what Sales actually needs.", "layers"],
    ["Measurement", "Track outcomes, not output volume.", "chart"],
    ["Operating rhythm", "Establish cadence, ownership and decision flow.", "clock"]
  ];
  return `
    <section class="section white-section" id="ecosystem">
      <div class="shell split-section">
        <div>
          ${sectionLabel("Build your PMM ecosystem")}
          <h2>Create the foundational system that drives everything forward.</h2>
          <p class="lead">From positioning to enablement, Cognix helps you build the right components in the right sequence for your stage.</p>
          <a class="btn btn-secondary" href="#growth-path">See all PMM building blocks</a>
        </div>
        <div class="building-grid">
          ${blocks.map(([title, copy, icon]) => `
            <article class="building-card">
              ${iconWrap(icon)}
              <h3>${esc(title)}</h3>
              <p>${esc(copy)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function growthSection() {
  const stages = [
    ["Startup", "Build the foundation", ["Discover the business and market truth", "Build core positioning and messaging", "Equip Sales for early deals", "Prepare first repeatable launches", "Create early measurement"], "Clarity, alignment and first wins", "rocket"],
    ["Mid-stage", "Scale the function", ["Build repeatable launch systems", "Scale Sales enablement", "Strengthen cross-functional workflows", "Measure impact", "Improve consistency"], "Consistency, efficiency and impact", "chart"],
    ["Enterprise", "Connect the ecosystem", ["Align multiple products and segments", "Govern messaging and enablement", "Connect organizational signals", "Support revenue intelligence", "Continuously optimize"], "Scale, influence and growth", "blocks"]
  ];
  return `
    <section class="section" id="growth-path">
      <div class="shell">
        <div class="section-intro">
          <h2>Grow with your company, from startup to enterprise.</h2>
        </div>
        <div class="stage-path">
          ${stages.map(([title, label, items, outcome, icon], index) => `
            <article class="stage-card">
              ${iconWrap(icon)}
              <h3>${esc(title)}</h3>
              <strong>${esc(label)}</strong>
              <ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
              <p>${esc(outcome)}</p>
            </article>
            ${index < stages.length - 1 ? `<span class="stage-arrow" aria-hidden="true">&rarr;</span>` : ""}`).join("")}
        </div>
      </div>
    </section>`;
}

function closedLoopSection() {
  const cards = [
    ["Impact tracking", "See what your PMM work influenced.", "target"],
    ["Launch outcomes", "Compare intended outcomes with actual results.", "rocket"],
    ["Asset adoption", "Understand what Sales uses and ignores.", "doc"],
    ["Open loops", "Find research, messaging, enablement or launch work that never connected to action.", "loop"],
    ["Next best action", "Know what to fix, improve or prioritize next.", "path"]
  ];
  const loop = ["Before work", "Intended outcome", "Actual result", "Learning", "Next action"];
  return `
    <section class="section white-section" id="how-cognix-works">
      <div class="shell split-section">
        <div>
          ${sectionLabel("Already built the basics?")}
          <h2>Prove what works. Close the loops.</h2>
          <p class="lead">Cognix connects your work to outcomes, identifies where the system is breaking and guides the next strategic correction.</p>
          <p class="muted-note">Assess launch predictability before execution, then compare the prediction with post-launch outcomes to improve the next cycle.</p>
        </div>
        <div>
          <div class="card-grid five">
            ${cards.map(([title, copy, icon]) => `
              <article class="info-card compact">
                ${iconWrap(icon)}
                <h3>${esc(title)}</h3>
                <p>${esc(copy)}</p>
              </article>`).join("")}
          </div>
          <div class="loop-diagram" aria-label="Closed loop PMM workflow">
            ${loop.map((item, index) => `
              <span>${esc(item)}</span>${index < loop.length - 1 ? `<i aria-hidden="true">&rarr;</i>` : ""}`).join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function differenceSection() {
  const rows = [
    ["Certifications", "Teach what PMM is", "Guide what to do next inside your company"],
    ["AI tools", "Generate content and outputs", "Build intelligence and guide next actions"],
    ["Templates", "Generic and static", "Contextual and adaptive to company stage"],
    ["Consultants", "Episodic advice", "Persistent structured operating support"],
    ["Disconnected systems", "Fragmented data and insights", "One connected PMM intelligence view"],
    ["Reports", "Explain what happened", "Guide what to do next"]
  ];
  return `
    <section class="section comparison-section" id="why-different">
      <div class="shell comparison-layout">
        <div>
          ${sectionLabel("Why Cognix is different")}
          <h2>Not another tool. A strategic operating system for PMMs.</h2>
        </div>
        <div class="comparison-table" role="table" aria-label="Traditional PMM support compared with Cognix">
          <div class="comparison-row header" role="row">
            <span role="columnheader">Category</span>
            <span role="columnheader">Traditional approach</span>
            <span role="columnheader">Cognix</span>
          </div>
          ${rows.map((row) => `
            <div class="comparison-row" role="row">
              ${row.map((cell) => `<span role="cell">${esc(cell)}</span>`).join("")}
            </div>`).join("")}
        </div>
      </div>
    </section>`;
}

function expertSection() {
  const benefits = [
    "Pressure-test important decisions",
    "Prioritize what moves the needle",
    "Navigate founders and cross-functional stakeholders",
    "Build executive influence",
    "Connect PMM work to measurable outcomes",
    "Grow your strategic judgment and career"
  ];
  return `
    <section class="section expert-section" id="expert-guidance">
      <div class="shell expert-grid">
        <div class="expert-mark" aria-hidden="true">${iconSvg("users")}</div>
        <div>
          <h2>Need a strategic second brain?</h2>
          <p>Add one hour of weekly CMO-level guidance to review priorities, decisions and roadblocks while Cognix helps you execute between sessions.</p>
          <a class="btn btn-secondary" href="${designPartnerHref}">Explore expert guidance</a>
        </div>
        <div class="benefit-list">
          ${benefits.map((item) => `<span>${iconSvg("check")}${esc(item)}</span>`).join("")}
        </div>
      </div>
    </section>`;
}

function finalCta() {
  return `
    <section class="final-cta" id="final-cta">
      <div class="shell">
        <h2>Build the function. Prove the impact. Grow the ecosystem.</h2>
        <p>Start with the company you have today. Cognix guides you toward the PMM system you will need tomorrow.</p>
        <div class="hero-actions center">
          <a class="btn btn-primary btn-large" href="${designPartnerHref}">Start building your PMM function</a>
          <a class="btn btn-secondary btn-large" href="${designPartnerHref}">Become a design partner</a>
        </div>
      </div>
    </section>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="shell footer-grid">
        ${logo()}
        <div>
          <a href="${homeHref}#design-partner">About</a>
          <a href="#how-cognix-works">Resources</a>
          <a href="mailto:hello@cognix.ai">Contact</a>
          <a href="#final-cta">Privacy</a>
        </div>
      </div>
    </footer>`;
}

function bindNavigation() {
  const toggle = document.querySelector(".mobile-toggle");
  const panel = document.querySelector(".mobile-panel");
  toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
  });

  panel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      document.body.classList.remove("menu-open");
    });
  });
}

function render() {
  document.querySelector("#app").innerHTML = `
    <div class="site-shell">
      ${nav()}
      <main>
        ${hero()}
        ${painSection()}
        ${researchSection()}
        ${ecosystemSection()}
        ${growthSection()}
        ${closedLoopSection()}
        ${differenceSection()}
        ${expertSection()}
        ${finalCta()}
      </main>
      ${footer()}
    </div>`;
  bindNavigation();
}

render();
