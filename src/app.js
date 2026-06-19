const pmmPage = "pmm.html";

const signals = [
  "AI drafts from Claude, Gemini, ChatGPT",
  "Sales calls",
  "CRM",
  "Slack debates",
  "Launch briefs",
  "Customer feedback",
  "Landing pages",
  "Competitive intel",
  "Sales decks",
  "Enablement notes"
];

const engine = [
  ["Ingest", "Read messy launch reality"],
  ["Compare", "Bind signals against each other"],
  ["Detect", "Find story breaks"],
  ["Receipt", "Show the conflicting evidence"],
  ["Prioritize", "Name the drift that matters"],
  ["Recommend", "Give the PMM-safe fix"]
];

const outcomes = [
  ["Story drift exposed", "See where positioning, sales narrative, and execution split."],
  ["Receipts attached", "Every read points back to user-provided GTM evidence."],
  ["Commercial risk named", "Know what changes before the launch underperforms."],
  ["Sales narrative protected", "Catch drift before Sales improvises the wrong story."],
  ["PMM-safe next step", "Turn the contradiction into a fix PMM can defend."]
];

const risks = [
  ["Narrative drift compounds", "Your story changes across website, sales decks, campaigns, enablement, and customer conversations."],
  ["Sales interpretation splits", "Reps carry different versions of the message into the market."],
  ["Customer truth gets buried", "Signals from calls, feedback, support, and onboarding never make it back into the launch story."],
  ["AI output multiplies drift", "AI-generated drafts speed up production while the underlying GTM story quietly splits."],
  ["Pipeline quality drifts", "Low-fit demand and inconsistent execution show up as revenue risk."],
  ["Revenue risk appears late", "By the time metrics expose the problem, the fracture has already spread."]
];

const teams = [
  ["Product marketing", "Beta now", "GTM fractures, positioning-to-execution contradiction, launch risk, and receipts.", true],
  ["Marketing leadership / CMOs", "Coming soon", "Campaign contradictions, message-market fit, audience clarity, and commercial risk reads."],
  ["Sales enablement", "Coming soon", "Sales narrative drift, rep readiness, objection handling, and field execution clarity."],
  ["RevOps", "Coming soon", "Pipeline contradictions, handoff quality, forecast confidence, and revenue execution signals."]
];

const products = [
  ["Cognix PMM", "Active beta", "GTM fractures, launch risk, contradiction receipts, and PMM-safe fixes.", true],
  ["Cognix Enablement", "Coming soon", "Message adoption, rep readiness, behavior change, and enablement effectiveness."],
  ["Cognix Revenue", "Coming soon", "Pipeline intelligence, deal risk scoring, forecast confidence, and sales motion clarity."],
  ["Cognix Product", "Coming soon", "Customer signal synthesis, roadmap insights, feature-market fit, and launch impact."],
  ["Cognix Customer Success", "Coming soon", "Onboarding intelligence, health and expansion signals, churn risk detection, and voice of customer."],
  ["Cognix RevOps", "Coming soon", "Pipeline contradictions, handoff quality, tooling gaps, and forecast confidence."]
];

const identifies = [
  "Narrative drift",
  "Positioning-to-execution contradiction",
  "GTM fragmentation",
  "Sales narrative drift",
  "Revenue risk",
  "Customer expectation mismatch",
  "Sales interpretation variance",
  "Enablement mismatch"
];

const betaOutputs = [
  "Primary fracture",
  "Evidence-backed receipts",
  "Contradiction clusters",
  "GTM fracture detection",
  "Launch conversion risk",
  "Forwardable launch note",
  "Signal coverage",
  "Executive Signal Brief"
];

const designPartnerItems = [
  "Early access to Cognix PMM beta",
  "GTM Fracture Map workflow",
  "Executive Signal Brief",
  "Contradiction scan",
  "GTM fracture detection",
  "Revenue execution risk view",
  "PMM design partner feedback loop",
  "Roadmap influence",
  "Future workflow visibility"
];

const askCognixQuestions = [
  "Can we launch today?",
  "What will break if we launch now?",
  "What is the biggest revenue risk?",
  "What is sales saying that marketing is not saying?",
  "What proof should lead the campaign?",
  "Is the founder narrative helping or hurting conversion?",
  "What should PMM fix first?",
  "What should the CMO care about?",
  "What should sales say differently?",
  "How does this compare to our last launch?",
  "What did we learn from past launches?"
];

const askCognixSources = [
  "Website and campaign copy",
  "Sales calls",
  "CRM notes",
  "Slack/Teams",
  "Sales enablement content",
  "Customer proof",
  "Support tickets",
  "Product usage signals",
  "Win/loss notes",
  "Past launch performance",
  "Founder/leadership comments",
  "AI conversation exports"
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
        <small>GTM fractures</small>
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
              { label: "About us", href: "#founding-access" },
              { label: "Resources", href: "#final-cta" }
            ] }
          ])}
        </div>
        <a class="btn btn-primary nav-cta" href="#founding-access">Request founding PMM access</a>
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
        <a href="#founding-access">Request founding PMM access</a>
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
    ["Story", 23, 30],
    ["Launch", 69, 25],
    ["Signal confidence", 77, 45],
    ["Revenue risk", 67, 72],
    ["Receipts", 28, 68],
    ["Drift", 19, 51]
  ];
  return `
    <svg class="graph-svg" viewBox="0 0 100 100" role="img" aria-label="Animated GTM fracture graph">
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
        <strong>Messy GTM reality</strong>
        <span>Story drift graph</span>
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
          <span>Cognix contradiction engine</span>
          <strong>Find where the GTM story breaks with receipts</strong>
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
          ${sectionLabel("GTM fractures with receipts")}
          <h1>Cognix detects where your GTM story breaks before the market does.</h1>
          <p>Paste messy launch reality: launch briefs, sales decks, landing pages, Slack debates, enablement notes, sales objections, customer proof, or raw GTM docs. Cognix compares the signals, finds where positioning, sales narrative, and execution are drifting apart, and shows the contradiction with textual receipts.</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-large" href="#founding-access">Paste messy launch reality</a>
            <a class="btn btn-secondary btn-large" href="${pmmPage}">Explore product marketing beta</a>
          </div>
          <small>Now opening founding access for PMMs who want to catch story breaks before Sales improvises the wrong version and leadership asks why launch demand is soft.</small>
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
          ["Startups", "Catch the first story break before launch."],
          ["Mid-market", "Keep positioning and sales narrative from drifting apart."],
          ["Enterprise", "Find the contradiction before the market does."]
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
          <h2>The next GTM problem is not more content. It is fractured execution.</h2>
        </div>
        <div class="prose">
          <p>The first wave of AI gave every team more output: more campaigns, call notes, sales content, launch docs, customer summaries, and analysis.</p>
          <p>But faster output makes drift easier to miss. When every function generates faster but carries a slightly different story, teams start scaling contradictions.</p>
          <p>Marketing says one thing. Sales repeats another. Customers hear a third. Product sees signals too late. RevOps watches risk appear downstream.</p>
          <p><strong>Cognix is built to show where the GTM story breaks, which evidence proves it, and what PMMs should fix before the market feels the drift.</strong></p>
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
          <p>AI-generated work accelerates content creation. Without a receipt-backed way to compare launch reality, it also accelerates GTM fragmentation, inconsistent execution, and late-stage revenue risk.</p>
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
          ${sectionLabel("How Cognix reads drift")}
          <h2>One contradiction engine. Multiple GTM surfaces.</h2>
          <p>Cognix starts where market, revenue, product, and customer signals collide first: the PMM launch reality that has to survive execution.</p>
        </div>
        ${heroVisual()}
        <p class="center-note">Cognix compares the signals behind decisions, surfaces where the story is drifting, and turns fragmented context into a receipt-backed PMM action.</p>
      </div>
    </section>`;
}

function teamsSection() {
  return `
    <section class="section white-section" id="teams">
      <div class="shell">
        <div class="section-intro">
          ${sectionLabel("For teams")}
          <h2>Start where GTM fractures are already costing teams clarity.</h2>
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
          <h2>One contradiction engine, focused on specific GTM risks.</h2>
          <p>Each Cognix application compares the signals a team already works inside and names the story break that can change buyer perception or sales execution.</p>
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
          <h2>A preview of the contradiction engine we are building.</h2>
          <p>Cognix is being designed around signal comparison, evidence binding, and reasoning workflows. The first beta exposes one focused PMM surface while the broader direction points toward connected GTM signal ingestion.</p>
        </div>
        <div class="tech-visual">
          <div class="tech-panel">
            <h3>Signal inputs</h3>
            ${signals.map((signal) => `<span><i></i>${esc(signal)}</span>`).join("")}
          </div>
          <div class="tech-engine">
            <h3>Cognix contradiction engine</h3>
            <div class="tech-flow">
              <span>Signal inputs</span>
              <span>Contradiction engine</span>
              <span>Evidence memory</span>
              <span>Story drift graph</span>
              <span>Reasoning workflows</span>
              <span>PMM-safe decision</span>
              <span>Receipt-backed output</span>
            </div>
            ${cognitionGraph("tech")}
          </div>
          <div class="tech-panel">
            <h3>What Cognix identifies</h3>
            ${identifies.map((item) => `<span><i></i>${esc(item)}</span>`).join("")}
          </div>
          <div class="architecture-cards" id="integrations">
            <article>
              <strong>Connected GTM signal ingestion</strong>
              <p>Planned connectivity across the systems where GTM work happens: customer records, team notes, calls, docs, product signals, customer feedback, and market intelligence.</p>
            </article>
            <article>
              <strong>Evidence-backed interpretation</strong>
              <p>The architecture direction combines source-bound evidence, GTM fracture maps, reasoning workflows, and learning loops.</p>
            </article>
            <article>
              <strong>Future GTM drift layer</strong>
          <p>The long-term direction includes GTM contradiction detection, cross-functional signal comparison, execution correlation, and adaptive prioritization.</p>
            </article>
            <article>
              <strong>Ask Cognix</strong>
              <p>Upcoming strategic decision layer for asking launch, messaging, pipeline, and sales alignment questions against actual GTM evidence.</p>
            </article>
          </div>
        </div>
      </div>
    </section>`;
}

function askCognixSection() {
  return `
    <section class="section ask-cognix-section" id="ask-cognix">
      <div class="shell ask-cognix-shell">
        <div class="section-intro">
          ${sectionLabel("Roadmap layer")}
          <h2>Ask Cognix is the strategic decision layer for GTM teams.</h2>
          <p>Ask Cognix will let PMMs, CMOs, and revenue leaders ask launch, messaging, pipeline, and sales alignment questions against their actual GTM evidence. It is not a generic chatbot. It is the query layer on top of GTM fracture detection.</p>
        </div>
        <div class="ask-cognix-grid">
          <article class="ask-cognix-card ask-cognix-primary">
            ${pill("Upcoming capability")}
            <h3>Ask high-stakes launch questions against GTM evidence.</h3>
            <p>Answers will be based on signal sorting, launch memory, sales reality, customer proof, leadership narrative, and commercial risk.</p>
            <div class="answer-structure">
              ${["Direct answer", "Evidence", "Commercial implication", "Recommended action", "Confidence level"].map((item) => `<span>${esc(item)}</span>`).join("")}
            </div>
          </article>
          <article class="ask-cognix-card">
            <h3>Example questions</h3>
            <div class="question-list">
              ${askCognixQuestions.map((question) => `<span>${esc(question)}</span>`).join("")}
            </div>
          </article>
          <article class="ask-cognix-card">
            <h3>Signal sources over time</h3>
            <div class="source-list">
              ${askCognixSources.map((source) => `<span>${esc(source)}</span>`).join("")}
            </div>
          </article>
        </div>
        <div class="ask-example">
          <span>Example answer pattern</span>
          <p><strong>Question:</strong> Can we launch today?</p>
          <p><strong>Direct answer:</strong> Not yet. Launch readiness is 55%. Strong customer proof exists, but the current story leads with abstract category language while sales and customer evidence point to renewal-risk urgency.</p>
          <p><strong>Commercial implication:</strong> The launch may generate attention without enough qualified demo intent, weakening sales follow-up and launch attribution.</p>
          <p><strong>Recommended action:</strong> Lead with renewal risk, move proof near the CTA, and use category language only after buyer urgency is established.</p>
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
          <h2>The first live surface: product marketing fracture detection.</h2>
          <p class="lead">Product marketing is where the fracture becomes visible first. PMMs sit between market truth, product direction, sales execution, competitive pressure, and customer expectations, which makes them the natural starting point for Cognix.</p>
        </div>
        <article class="beta-card">
          ${pill("GTM Fracture Map", true)}
          <h3>The first active Cognix workflow.</h3>
          <p>Teams paste messy GTM signals. Cognix analyzes launch conversion risk, GTM contradictions, source receipts, signal coverage, and the executive read needed to decide what PMM changes before launch.</p>
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
    <section class="section design-section" id="founding-access">
      <div class="shell design-grid">
        <div>
          ${sectionLabel("Founding PMM access")}
          <h2>Run GTM fracture detection with Cognix.</h2>
          <p>We are inviting a small group of senior PMMs and GTM operators to pressure-test Cognix on real launch mess: internal strategy, buyer-facing copy, sales objections, proof gaps, and launch goals.</p>
          <p>Founding PMMs get early access to the first Cognix PMM surface, a direct feedback loop, and visibility into how the contradiction engine evolves across teams.</p>
          <div class="mini-grid">
            <article><strong>First GTM fracture run</strong><span>Paste messy launch reality and get a receipt-backed read.</span></article>
            <article><strong>Future workflow visibility</strong><span>See how connected GTM signal ingestion expands across functions.</span></article>
          </div>
        </div>
        <article class="pricing-card">
          <span>Founding PMM access</span>
          <div class="price"><strong>First read</strong><small>included</small></div>
          <p>Your first GTM fracture detection run is included during validation. Bring a messy launch, then tell us whether the contradiction, receipts, and PMM-safe fix match what is actually happening.</p>
          <div class="pricing-items">
            ${designPartnerItems.map((item) => `<p>${esc(item)}</p>`).join("")}
          </div>
          <a class="btn btn-primary btn-block" href="free-audit-access.html">Start GTM fracture detection</a>
          <small>Founding access for operators who want receipt-backed GTM fracture detection before launch.</small>
        </article>
      </div>
    </section>`;
}

function finalCta() {
  return `
    <section class="final-cta" id="final-cta">
      <div class="shell">
        <h2>Do not wait for a GTM fracture to become revenue risk.</h2>
        <p>Start with product marketing. See where your launch reality is drifting and help shape the receipt-backed layer for AI-era execution.</p>
        <a class="btn btn-primary btn-large" href="#founding-access">Request founding PMM access</a>
      </div>
    </section>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="shell footer-grid">
        ${logo()}
        <div>
          <a href="#founding-access">About</a>
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
        ${askCognixSection()}
        ${activeBetaSection()}
        ${designPartnerSection()}
        ${finalCta()}
      </main>
      ${footer()}
    </div>`;
  bindNavigation();
}

render();
