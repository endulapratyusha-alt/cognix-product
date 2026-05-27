const pmmPage = "pmm.html";

const signals = [
  "Data from AI agents (Claude, Gemini, ChatGPT)",
  "Sales calls",
  "CRM",
  "Slack / Teams",
  "Product usage",
  "Customer feedback",
  "Marketing campaigns",
  "Competitive intel",
  "Documents",
  "Market signals"
];

const engine = [
  ["Ingest", "Collect signals"],
  ["Converge", "Unify context"],
  ["Interpret", "Reason across patterns"],
  ["Detect", "Find fractures"],
  ["Prioritize", "Rank what matters"],
  ["Recommend", "Turn insight into action"]
];

const outcomes = [
  ["Strategic clarity", "Right positioning, message, and GTM strategy."],
  ["Execution excellence", "Teams act from the same context."],
  ["Revenue impact", "Risk and upside surface before they appear late."],
  ["Team alignment", "Shared priorities across functions."],
  ["Continuous improvement", "A learning loop for what to fix next."]
];

const risks = [
  ["Narrative drift compounds", "Your story changes across website, sales decks, campaigns, enablement, and customer conversations."],
  ["Sales interpretation splits", "Reps carry different versions of the message into the market."],
  ["Customer truth gets buried", "Signals from calls, feedback, support, and onboarding never become shared intelligence."],
  ["AI output becomes inconsistent", "AI-generated work accelerates content creation without preserving strategic coherence."],
  ["Pipeline quality weakens", "Bad-fit demand and inconsistent execution show up as revenue risk."],
  ["Revenue risk appears late", "By the time metrics expose the problem, the fracture has already spread."]
];

const teams = [
  ["Product marketing", "Beta now", "Positioning intelligence, narrative drift detection, launch readiness, and market signal interpretation.", true],
  ["Marketing leadership / CMOs", "Coming soon", "Campaign coherence, message-market fit, audience clarity, and strategic decision support."],
  ["Sales enablement", "Coming soon", "Message adoption, rep readiness, behavior change, and field execution clarity."],
  ["RevOps", "Coming soon", "Pipeline intelligence, handoff quality, forecast confidence, and revenue execution signals."]
];

const products = [
  ["Cognix PMM", "Active beta", "GTM Fracture Map, narrative drift, launch readiness, market and CI insights.", true],
  ["Cognix Enablement", "Coming soon", "Message adoption, rep readiness, behavior change, and enablement effectiveness."],
  ["Cognix Revenue", "Coming soon", "Pipeline intelligence, deal risk scoring, forecast confidence, and sales motion clarity."],
  ["Cognix Product", "Coming soon", "Customer signal synthesis, roadmap insights, feature-market fit, and launch impact."],
  ["Cognix Customer Success", "Coming soon", "Onboarding intelligence, health and expansion signals, churn risk detection, and voice of customer."],
  ["Cognix RevOps", "Coming soon", "GTM process intelligence, handoff quality, tooling gaps, and operational alignment."]
];

const identifies = [
  "Narrative drift",
  "Contradictions across teams",
  "GTM fragmentation",
  "Execution gaps",
  "Revenue risk",
  "Customer expectation mismatch",
  "Sales interpretation variance",
  "Enablement mismatch"
];

const betaOutputs = [
  "Primary fracture",
  "Supporting evidence",
  "Contradiction clusters",
  "Narrative drift analysis",
  "Revenue execution risk",
  "Signal confidence",
  "Next GTM decisions",
  "Executive Signal Brief"
];

const designPartnerItems = [
  "Early access to Cognix PMM beta",
  "GTM Fracture Map workflow",
  "Executive Signal Brief",
  "Contradiction scan",
  "Narrative drift analysis",
  "Revenue execution risk view",
  "Direct feedback loop",
  "Roadmap influence",
  "Future platform visibility"
];

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function logo() {
  return `
    <a class="brand" href="index.html" aria-label="Cognix homepage">
      <span class="brand-mark" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
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
              ${column.items.map((item) => {
                if (item.disabled) {
                  return `<span class="menu-link disabled" aria-disabled="true">${esc(item.label)}</span>`;
                }
                return `<a href="${item.href || "#"}">${esc(item.label)}</a>`;
              }).join("")}
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
          <a class="active" href="index.html">Home</a>
          ${dropdown("Solutions", [
            { title: "By segment", items: [
              { label: "Startups", href: "#stage-strip" },
              { label: "Mid-market", href: "#stage-strip" },
              { label: "Enterprise", href: "#stage-strip" }
            ] },
            { title: "By team", items: [
              { label: "For product marketing", href: pmmPage },
              { label: "For CMOs", href: "#teams" },
              { label: "For sales enablement", href: "#teams" },
              { label: "For RevOps", href: "#teams" }
            ] },
            { title: "By use case", items: [
              { label: "Narrative drift", href: "#why-now" },
              { label: "Launch readiness", href: "#active-beta" },
              { label: "Enablement gaps", href: "#technology" },
              { label: "Pipeline quality risk", href: "#why-now" }
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
          ${dropdown("Platform", [
            { title: "Platform", items: [
              { label: "Technology", href: "#technology" },
              { label: "Integrations (coming soon)", href: "#integrations" }
            ] }
          ])}
          ${dropdown("About us", [
            { title: "Company", items: [
              { label: "About us", href: "#design-partner" },
              { label: "Resources", href: "#final-cta" }
            ] }
          ])}
        </div>
        <a class="btn btn-primary nav-cta" href="#design-partner">Become a design partner</a>
        <button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
      </nav>
      <div class="mobile-panel" hidden>
        <a href="index.html">Home</a>
        <a href="${pmmPage}">Cognix PMM</a>
        <span>Cognix Enablement (coming soon)</span>
        <span>Cognix Revenue (coming soon)</span>
        <span>Cognix Customer Success (coming soon)</span>
        <span>Cognix RevOps (coming soon)</span>
        <a href="#teams">Solutions</a>
        <a href="#applications">Products</a>
        <a href="#technology">Technology</a>
        <a href="#integrations">Integrations (coming soon)</a>
        <a href="#design-partner">Become a design partner</a>
      </div>
    </header>`;
}

function sectionLabel(text) {
  return `<p class="section-label">${esc(text)}</p>`;
}

function pill(text, active = false) {
  return `<span class="pill ${active ? "active" : ""}">${esc(text)}</span>`;
}

function graphSvg(id = "graph") {
  const center = [50, 50];
  const nodes = Array.from({ length: 96 }, (_, index) => {
    const angle = index * 2.399963 + (index % 5) * 0.07;
    const radius = 9 + ((index * 19) % 34);
    const x = center[0] + Math.cos(angle) * radius * 0.96;
    const y = center[1] + Math.sin(angle) * radius * 0.82;
    return [Number(x.toFixed(2)), Number(y.toFixed(2)), radius, index];
  });
  const branches = nodes
    .map((node, index) => [node, nodes[(index + 13) % nodes.length], index])
    .filter(([, , index]) => index % 3 === 0);
  const labels = [
    ["Narrative", 23, 30],
    ["Launch", 69, 25],
    ["Signal confidence", 77, 45],
    ["Revenue risk", 67, 72],
    ["Alignment", 28, 68],
    ["Drift", 19, 51]
  ];
  return `
    <svg class="graph-svg" viewBox="0 0 100 100" role="img" aria-label="Animated cognition graph">
      <defs>
        <linearGradient id="${id}-spoke" x1="0" x2="1">
          <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.08"/>
          <stop offset="52%" stop-color="#8b5cf6" stop-opacity="0.34"/>
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.16"/>
        </linearGradient>
        <radialGradient id="${id}-glow">
          <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.2"/>
          <stop offset="44%" stop-color="#6366f1" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle class="graph-aura" cx="50" cy="50" r="43" fill="url(#${id}-glow)"/>
      ${branches.map(([[x1, y1], [x2, y2], index]) => `
        <line class="graph-branch" style="--d:${index % 8}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />
      `).join("")}
      ${nodes.map(([x, y, radius, index]) => `
        <line class="graph-spoke ${index % 6 === 0 ? "active" : ""}" style="--d:${index % 10}" x1="50" y1="50" x2="${x}" y2="${y}" stroke="url(#${id}-spoke)" />
      `).join("")}
      <circle class="graph-center-glow" cx="50" cy="50" r="5.8" />
      <circle class="graph-center" cx="50" cy="50" r="2.8" />
      ${nodes.map(([x, y, radius, index]) => `
        <circle class="graph-node ${index % 7 === 0 ? "active" : ""} ${index % 13 === 0 ? "cyan" : ""}" style="--d:${index % 9}" cx="${x}" cy="${y}" r="${index % 11 === 0 ? 1.45 : index % 5 === 0 ? 1.08 : 0.72}" />
      `).join("")}
      ${labels.map(([label, x, y], index) => `
        <g class="graph-tag" style="--d:${index}">
          <rect x="${Number(x) - label.length * 1.55 - 2}" y="${Number(y) - 4.7}" width="${label.length * 3.1 + 4}" height="9.4" rx="3.8" />
          <text x="${x}" y="${Number(y) + 1.35}" text-anchor="middle">${esc(label)}</text>
        </g>
      `).join("")}
    </svg>`;
}

function cognitionGraph(id) {
  return `
    <div class="cognition-graph">
      <div class="graph-label">
        <strong>Organizational memory</strong>
        <span>Cognition graph</span>
      </div>
      ${graphSvg(id)}
    </div>`;
}

function heroVisual() {
  return `
    <div class="hero-visual" aria-label="Cognix signal convergence visual">
      <div class="flow-line left" aria-hidden="true"></div>
      <div class="flow-line right" aria-hidden="true"></div>
      <div class="visual-column signal-column">
        <h3>Signals in</h3>
        <div class="floating-list">
          ${signals.map((signal, index) => `<span style="--i:${index}"><i></i>${esc(signal)}</span>`).join("")}
        </div>
      </div>
      <div class="visual-center">
        <div class="engine-header">
          <span>Cognix cognitive engine</span>
          <strong>The interpretation layer behind decision intelligence</strong>
        </div>
        <div class="engine-steps">
          ${engine.map(([title, body], index) => `
            <div class="engine-step" style="--i:${index}">
              <b>${esc(title)}</b>
              <small>${esc(body)}</small>
            </div>`).join("")}
        </div>
        ${cognitionGraph("hero")}
      </div>
      <div class="visual-column output-column">
        <h3>Intelligence out</h3>
        <div class="outcome-list">
          ${outcomes.map(([title, copy], index) => `
            <article style="--i:${index}">
              <i></i>
              <div><strong>${esc(title)}</strong><span>${esc(copy)}</span></div>
            </article>`).join("")}
        </div>
      </div>
    </div>`;
}

function hero() {
  return `
    <section class="hero-section">
      <div class="shell hero-grid">
        <div class="hero-copy">
          ${sectionLabel("Cognition-as-a-Service (CAAS) for AI-era organizations")}
          <h1>The unified cognitive layer for modern organizations.</h1>
          <p>AI has made every function faster. But speed without shared interpretation creates a new operating risk: teams produce more, decide faster, and drift further apart. Cognix helps organizations interpret the signals behind the work so leaders can see where alignment is weakening and act before the risk becomes visible in the numbers.</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-large" href="#design-partner">Become a design partner</a>
            <a class="btn btn-secondary btn-large" href="${pmmPage}">Explore product marketing beta</a>
          </div>
          <small>Now opening early access for GTM leaders starting with product marketing.</small>
        </div>
        ${heroVisual()}
      </div>
    </section>`;
}

function stageStrip() {
  return `
    <section class="stage-strip" id="stage-strip" aria-label="Company stages">
      <div class="shell stage-grid">
        ${[
          ["Startups", "Find clarity. Build GTM foundation."],
          ["Mid-market", "Scale with alignment. Improve execution."],
          ["Enterprise", "Drive coherence across the organization."]
        ].map(([title, copy]) => `
          <article>
            <span></span>
            <div><strong>${esc(title)}</strong><p>${esc(copy)}</p></div>
          </article>`).join("")}
      </div>
    </section>`;
}

function shiftSection() {
  return `
    <section class="section shift-section">
      <div class="shell split-section">
        <div>
          ${sectionLabel("The shift")}
          <h2>The next AI problem is not generation. It is cognition.</h2>
        </div>
        <div class="prose">
          <p>The first wave of AI helped teams produce more campaigns, call notes, sales content, launch docs, customer summaries, and analysis.</p>
          <p>But more output does not create shared understanding. It creates interpretation debt.</p>
          <p>When every function generates faster but interprets differently, teams start scaling contradictions. Marketing says one thing. Sales repeats another. Customers hear a third. Product sees signals too late. RevOps watches risk appear downstream.</p>
          <p><strong>Cognix is built for the next phase of AI adoption: helping organizations understand what all their signals mean, where teams are drifting apart upstream and downstream, and what decision should happen next. Cognition orchestration across your GTM lifecycle.</strong></p>
        </div>
      </div>
    </section>`;
}

function whyNowSection() {
  return `
    <section class="section white-section" id="why-now">
      <div class="shell">
        <div class="section-intro">
          ${sectionLabel("Why this matters now")}
          <h2>The fracture shows up late. That is the danger.</h2>
        </div>
        <div class="card-grid three">
          ${risks.map(([title, copy], index) => `
            <article class="info-card" style="--i:${index}">
              <span class="card-icon"></span>
              <h3>${esc(title)}</h3>
              <p>${esc(copy)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function architectureSection() {
  return `
    <section class="section architecture-section">
      <div class="shell">
        <div class="section-intro">
          ${sectionLabel("The Cognix architecture")}
          <h2>One cognitive engine. Multiple business surfaces.</h2>
          <p>Cognix is built as a cognitive engine for business execution, starting with the function where market, revenue, product, and customer signals collide first.</p>
        </div>
        ${heroVisual()}
        <p class="center-note">Cognix connects the signals behind decisions, surfaces where interpretation is drifting, and turns fragmented context into actionable intelligence.</p>
      </div>
    </section>`;
}

function teamsSection() {
  return `
    <section class="section white-section" id="teams">
      <div class="shell">
        <div class="section-intro">
          ${sectionLabel("For teams")}
          <h2>Start where signal fragmentation is already costing teams clarity.</h2>
          <p>Product marketing is the first live Cognix surface because it sits at the intersection of market truth, product strategy, sales execution, customer understanding, and competitive pressure.</p>
        </div>
        <div class="card-grid four">
          ${teams.map(([title, status, copy, active]) => `
            <a class="info-card team-card ${active ? "active" : ""}" href="${active ? pmmPage : "#teams"}">
              <div class="card-top"><span class="card-icon"></span>${pill(status, active)}</div>
              <h3>${esc(title)}</h3>
              <p>${esc(copy)}</p>
            </a>`).join("")}
        </div>
        <p class="small-center">Early access begins with Product marketing teams.</p>
      </div>
    </section>`;
}

function productsSection() {
  return `
    <section class="section" id="applications">
      <div class="shell">
        <div class="section-intro">
          ${sectionLabel("Cognix applications")}
          <h2>One cognition engine, delivered through focused intelligence surfaces.</h2>
          <p>Each Cognix application applies the same cognitive engine to a specific team, decision type, and execution risk.</p>
        </div>
        <div class="card-grid three">
          ${products.map(([title, status, copy, active]) => {
            const content = `
              <div class="card-top"><span class="card-icon"></span>${pill(status, active)}</div>
              <h3>${esc(title)}</h3>
              <p>${esc(copy)}</p>`;
            return active
              ? `<a class="info-card product-card active" href="${pmmPage}">${content}</a>`
              : `<article class="info-card product-card soon" aria-disabled="true">${content}</article>`;
          }).join("")}
        </div>
      </div>
    </section>`;
}

function technologySection() {
  return `
    <section class="section white-section technology-section" id="technology">
      <div class="shell">
        <div class="section-intro">
          ${sectionLabel("Technology")}
          <h2>A preview of the cognition engine we are building.</h2>
          <p>Cognix is being designed around a technical foundation for signal convergence, organizational memory, cognition graphs, reasoning workflows, and decision intelligence. The first beta exposes one focused surface of that system, while the broader architecture shows what customers can expect as the platform matures.</p>
        </div>
        <div class="tech-visual">
          <div class="tech-panel">
            <h3>Signal inputs</h3>
            ${signals.map((signal) => `<span><i></i>${esc(signal)}</span>`).join("")}
          </div>
          <div class="tech-engine">
            <h3>Cognix cognitive engine</h3>
            <div class="tech-flow">
              <span>Signal inputs</span>
              <span>Cognitive engine</span>
              <span>Organizational memory</span>
              <span>Cognition graph</span>
              <span>Reasoning workflows</span>
              <span>Decision intelligence</span>
              <span>Intelligence outputs</span>
            </div>
            ${cognitionGraph("tech")}
          </div>
          <div class="tech-panel">
            <h3>What Cognix identifies</h3>
            ${identifies.map((item) => `<span><i></i>${esc(item)}</span>`).join("")}
          </div>
          <div class="architecture-cards" id="integrations">
            <article>
              <strong>1. Deep integration layer</strong>
              <p>Planned connectivity across the systems where work happens: CRM, Slack, calls, docs, product signals, customer feedback, and market intelligence.</p>
            </article>
            <article>
              <strong>2. Foundational cognitive infrastructure</strong>
              <p>The architecture direction combines organizational memory, signal convergence, cognition graphs, embedding models, reasoning workflows, and learning loops.</p>
            </article>
            <article>
              <strong>3. Proprietary cognition layer</strong>
              <p>The long-term technical vision includes narrative drift detection, cross-functional signal convergence, coherence scoring, behavioral execution correlation, and adaptive prioritization.</p>
            </article>
          </div>
        </div>
      </div>
    </section>`;
}

function activeBetaSection() {
  return `
    <section class="section active-beta-section" id="active-beta">
      <div class="shell split-section">
        <div>
          ${sectionLabel("Active beta")}
          <h2>The first live surface: product marketing cognition.</h2>
          <p class="lead">Product marketing is where the fracture becomes visible first. PMMs sit between market truth, product direction, sales execution, competitive pressure, and customer expectations, which makes them the natural starting point for Cognix.</p>
        </div>
        <article class="beta-card">
          ${pill("GTM Fracture Map", true)}
          <h3>The first active Cognix workflow.</h3>
          <p>Teams add a small set of GTM signals. Cognix analyzes contradiction, narrative drift, signal confidence, fracture patterns, and revenue execution risk.</p>
          <div class="check-grid">
            ${betaOutputs.map((item) => `<span>${esc(item)}</span>`).join("")}
          </div>
          <a class="btn btn-primary" href="${pmmPage}">Explore product marketing beta</a>
        </article>
      </div>
    </section>`;
}

function designPartnerSection() {
  return `
    <section class="section design-section" id="design-partner">
      <div class="shell design-grid">
        <div>
          ${sectionLabel("Design partner beta")}
          <h2>Shape the cognition layer for AI-era GTM before the category becomes obvious.</h2>
          <p>We are opening a limited design partner cohort for founders, first marketers, PMM leaders, and GTM operators who believe AI-era execution will need more than generation, dashboards, and scattered summaries.</p>
          <p>Design partners get early access to the first Cognix intelligence surface, direct influence on the product, and visibility into how the cognition engine evolves across teams.</p>
          <div class="mini-grid">
            <article><strong>Shape the roadmap</strong><span>Your feedback directly influences what Cognix becomes.</span></article>
            <article><strong>Future platform visibility</strong><span>See how the platform expands across every function.</span></article>
          </div>
        </div>
        <article class="pricing-card">
          <span>Design partner access</span>
          <div class="price"><strong>$99</strong><small>/ month</small></div>
          <div class="pricing-items">
            ${designPartnerItems.map((item) => `<p>${esc(item)}</p>`).join("")}
          </div>
          <a class="btn btn-primary btn-block" href="mailto:hello@cognix.ai?subject=Design%20partner%20beta">Apply to become a design partner</a>
          <small>Limited early cohort for operators who want to shape what comes next.</small>
        </article>
      </div>
    </section>`;
}

function finalCta() {
  return `
    <section class="final-cta" id="final-cta">
      <div class="shell">
        <h2>Do not wait for AI-driven GTM noise to become revenue risk.</h2>
        <p>Start with product marketing. See where your GTM signals are drifting and help shape the cognition layer for AI-era execution.</p>
        <a class="btn btn-primary btn-large" href="#design-partner">Become a design partner</a>
      </div>
    </section>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="shell footer-grid">
        ${logo()}
        <div>
          <a href="#design-partner">About</a>
          <a href="#final-cta">Resources</a>
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
        ${stageStrip()}
        ${shiftSection()}
        ${whyNowSection()}
        ${architectureSection()}
        ${teamsSection()}
        ${productsSection()}
        ${technologySection()}
        ${activeBetaSection()}
        ${designPartnerSection()}
        ${finalCta()}
      </main>
      ${footer()}
    </div>`;
  bindNavigation();
}

render();
