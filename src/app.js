const signalNodes = [
  "Customer calls",
  "Sales notes",
  "Win/loss",
  "CRM notes",
  "Slack threads",
  "Product usage",
  "Competitive intel",
  "Support themes",
  "Website messaging",
  "Launch docs",
  "Enablement content",
  "AI-generated GTM work"
];

const interpretationNodes = [
  "Signal interpretation",
  "Narrative drift",
  "Contradiction detection",
  "ICP confusion",
  "Sales interpretation variance",
  "Enablement mismatch",
  "Customer expectation gap",
  "GTM fracture scoring",
  "Revenue execution risk"
];

const decisionNodes = [
  "GTM Fracture Map",
  "Executive Signal Brief",
  "Next GTM decisions",
  "Contradiction scan",
  "Narrative hierarchy",
  "Pipeline quality risk",
  "Leadership decision path"
];

const complexityCards = [
  {
    title: "AI output is expanding",
    body: "More campaigns, notes, drafts, transcripts, and enablement artifacts are created every week."
  },
  {
    title: "Interpretation debt is rising",
    body: "Teams need to know which GTM signals matter, where they conflict, and what they imply for execution."
  },
  {
    title: "Revenue risk appears late",
    body: "Narrative drift, enablement mismatch, ICP confusion, and customer expectation gaps become expensive after the motion scales."
  }
];

const layers = [
  {
    title: "Signal layer",
    body: "Customer calls, sales feedback, CRM notes, win/loss, product usage, support themes, competitive intel, campaigns, website messaging, launch docs, and AI-generated GTM content.",
    items: ["Customer truth", "Field feedback", "Market pressure", "Launch work"]
  },
  {
    title: "Interpretation layer",
    body: "Cognix detects contradictions, narrative drift, weak signal confidence, ICP confusion, sales interpretation variance, enablement mismatch, and GTM handoff gaps.",
    items: ["Signal interpretation", "Contradiction detection", "Narrative drift", "Fracture scoring"]
  },
  {
    title: "Decision layer",
    body: "Cognix produces a GTM Fracture Map, Executive Signal Brief, next GTM decisions, contradiction scan, and revenue execution risk.",
    items: ["Primary fracture", "Evidence trail", "Decision path", "Execution risk"]
  }
];

const firstRunSteps = [
  {
    title: "Add 3 to 5 GTM signals",
    body: "Use call notes, launch messaging, win/loss snippets, sales feedback, competitive notes, or customer feedback."
  },
  {
    title: "Run Cognix analysis",
    body: "Cognix interprets contradictions, drift, signal confidence, and GTM fracture patterns."
  },
  {
    title: "Generate your GTM Fracture Map",
    body: "See the primary fracture, supporting evidence, revenue execution risk, and next GTM decisions."
  }
];

const audiences = [
  ["Founders", "See where your market story is drifting before you scale the wrong narrative."],
  ["First marketers", "Turn scattered GTM feedback into sharper positioning, launch, and enablement decisions."],
  ["PMM leaders", "Detect narrative drift, sales interpretation variance, and enablement gaps before they hit pipeline."],
  ["RevOps leaders", "Understand where GTM interpretation breaks before it becomes forecast, funnel, or handoff risk."]
];

const pricingPlans = [
  {
    title: "Free map",
    price: "$0",
    description: "For trying Cognix on one GTM motion.",
    items: ["1 limited GTM Fracture Map", "Sample revenue-risk score", "Top GTM breakpoints", "Limited recommendation"],
    cta: "Generate your GTM Fracture Map"
  },
  {
    title: "Starter beta",
    price: "$99/month",
    description: "For founders, first marketers, and solo PMMs.",
    items: ["5 GTM Fracture Maps", "Saved projects", "Revenue execution risk", "Evidence trail", "Executive Signal Brief export"],
    cta: "Start beta",
    featured: true
  },
  {
    title: "Team beta",
    price: "$249/month",
    description: "For PMM teams working with sales and enablement.",
    items: ["20 GTM Fracture Maps", "Team workspace", "Shareable Signal Briefs", "Messaging, launch, competitive, and enablement maps", "Priority beta access"],
    cta: "Start team beta"
  },
  {
    title: "Design partner",
    price: "Custom",
    description: "For GTM teams shaping the cognition layer.",
    items: ["Custom workflows", "Founder access", "Roadmap influence", "Advanced signal interpretation"],
    cta: "Apply as design partner"
  }
];

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function nav() {
  return `
    <header class="site-header">
      <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand" href="index.html" aria-label="Cognix homepage">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>Cognix</span>
        </a>
        <div class="nav-links">
          <a href="#cognition-map">Map</a>
          <a href="#layers">Interpretation</a>
          <a href="#first-run">First run</a>
          <a href="#audience">Teams</a>
        </div>
        <a class="btn btn-primary nav-cta" href="product.html">Generate your GTM Fracture Map</a>
      </nav>
    </header>`;
}

function nodeList(items, type = "") {
  return items.map((item, index) => `
    <span class="map-node ${type}" style="--i:${index}">
      <i></i>
      ${esc(item)}
    </span>`).join("");
}

function cognitionMap({ large = false } = {}) {
  return `
    <section class="cognition-map ${large ? "large-map" : ""}" aria-label="The GTM cognition map">
      <div class="map-topline">
        <span>The GTM cognition map</span>
        <strong>${large ? "Three-zone interpretation system" : "Signals interpreted across the GTM system"}</strong>
      </div>
      <div class="map-stage">
        <div class="map-zone signal-zone">
          <div class="zone-label">
            <span>${large ? "1. Signals" : "Fragmented GTM signals"}</span>
            <small>Raw GTM evidence</small>
          </div>
          <div class="node-grid signal-grid">
            ${nodeList(signalNodes, "signal-node")}
          </div>
        </div>

        <div class="map-zone interpretation-zone">
          <div class="signal-lines" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="zone-label">
            <span>${large ? "2. Interpretation" : "Cognix interpretation layer"}</span>
            <small>GTM cognition layer</small>
          </div>
          <div class="cognix-core">
            <b>Cognix</b>
            <strong>Market signal truth</strong>
            <p>Interprets GTM fragmentation before the wrong motion gets scaled.</p>
          </div>
          <div class="orbit-nodes">
            ${nodeList(interpretationNodes, "interpretation-node")}
          </div>
        </div>

        <div class="map-zone decision-zone">
          <div class="zone-label">
            <span>${large ? "3. Decisions" : "Leadership outputs"}</span>
            <small>Coherent action path</small>
          </div>
          <div class="node-grid decision-grid">
            ${nodeList(decisionNodes, "decision-node")}
          </div>
        </div>
      </div>
    </section>`;
}

function hero() {
  return `
    <section class="hero-section">
      <div class="hero-shell">
        <div class="hero-copy">
          <p class="eyebrow">GTM cognition for the AI era</p>
          <h1>AI made GTM faster. Cognix makes it coherent.</h1>
          <p class="hero-subcopy">Cognix interprets customer, sales, market, product, and AI-generated GTM signals to reveal where your strategy, story, and execution are fracturing before the wrong motion gets scaled.</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-large" href="product.html">Generate your GTM Fracture Map</a>
            <a class="btn btn-secondary btn-large" href="#cognition-map">Explore the cognition map</a>
          </div>
        </div>
        ${cognitionMap()}
        <p class="map-caption">From scattered AI output and GTM signals to one leadership-ready view of what is breaking, why it matters, and what to fix first.</p>
      </div>
    </section>`;
}

function sectionIntro(label, title, body = "", subtitle = "") {
  return `
    <div class="section-intro">
      ${label ? `<p class="section-kicker">${esc(label)}</p>` : ""}
      <h2>${esc(title)}</h2>
      ${subtitle ? `<p class="section-subtitle">${esc(subtitle)}</p>` : ""}
      ${body ? `<p>${esc(body)}</p>` : ""}
    </div>`;
}

function mapSection() {
  return `
    <section class="section map-section" id="cognition-map">
      <div class="shell">
        ${sectionIntro(
          "The GTM cognition map",
          "A new interpretation layer for AI-era GTM.",
          "AI tools generate more campaigns, summaries, notes, decks, and enablement every week. Cognix connects those outputs to customer, sales, market, and product signals so teams can see where GTM coherence is breaking before revenue risk shows up."
        )}
        ${cognitionMap({ large: true })}
      </div>
    </section>`;
}

function complexitySection() {
  return `
    <section class="section complexity-section">
      <div class="shell">
        ${sectionIntro("", "AI did not remove GTM complexity. It multiplied it.")}
        <div class="complexity-system">
          <div class="output-stream" aria-hidden="true">
            <span>Campaigns</span>
            <span>Summaries</span>
            <span>Calls</span>
            <span>Decks</span>
            <span>Notes</span>
            <span>Assets</span>
          </div>
          <div class="complexity-line" aria-hidden="true">
            <i></i><i></i><i></i>
          </div>
          <div class="complexity-card-row">
            ${complexityCards.map((card) => `
              <article class="calm-card">
                <h3>${esc(card.title)}</h3>
                <p>${esc(card.body)}</p>
              </article>`).join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function layersSection() {
  return `
    <section class="section layers-section" id="layers">
      <div class="shell">
        ${sectionIntro("", "What Cognix interprets")}
        <div class="interpretation-plane">
          <div class="plane-rail" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          ${layers.map((layer, index) => `
            <article class="layer-card">
              <div class="layer-number">0${index + 1}</div>
              <div class="layer-copy">
                <h3>${esc(layer.title)}</h3>
                <p>${esc(layer.body)}</p>
              </div>
              <div class="layer-pills">
                ${layer.items.map((item) => `<span>${esc(item)}</span>`).join("")}
              </div>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function firstRunSection() {
  return `
    <section class="section first-run-section" id="first-run">
      <div class="shell">
        ${sectionIntro(
          "",
          "Your first Cognix run",
          "",
          "Paste a small set of GTM signals. Cognix turns them into an executive-ready view of what is fracturing and what to fix first."
        )}
        <div class="run-track">
          ${firstRunSteps.map((step, index) => `
            <article>
              <span>${index + 1}</span>
              <h3>${esc(step.title)}</h3>
              <p>${esc(step.body)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function audienceSection() {
  return `
    <section class="section audience-section" id="audience">
      <div class="shell">
        ${sectionIntro("", "Built before messy GTM scale becomes expensive.")}
        <div class="audience-grid">
          ${audiences.map(([title, body]) => `
            <article class="audience-card">
              <h3>${esc(title)}</h3>
              <p>${esc(body)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function pricingSection() {
  return `
    <section class="section pricing-section" id="pricing">
      <div class="shell">
        ${sectionIntro(
          "",
          "Start with one GTM Fracture Map. Expand when Cognix shows what your team could not see."
        )}
        <div class="pricing-grid">
          ${pricingPlans.map((plan) => `
            <article class="pricing-card ${plan.featured ? "featured" : ""}">
              ${plan.featured ? `<span class="plan-pill">Beta favorite</span>` : ""}
              <h3>${esc(plan.title)}</h3>
              <strong>${esc(plan.price)}</strong>
              <p>${esc(plan.description)}</p>
              <ul>
                ${plan.items.map((item) => `<li>${esc(item)}</li>`).join("")}
              </ul>
              <a class="btn ${plan.featured ? "btn-primary" : "btn-secondary"}" href="product.html">${esc(plan.cta)}</a>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function finalCta() {
  return `
    <section class="final-cta">
      <div class="shell final-cta-card">
        <p class="section-kicker">Leadership decision path</p>
        <h2>Don’t scale GTM noise.</h2>
        <p>Generate a GTM Fracture Map and see where your story, signals, and execution are drifting apart.</p>
        <a class="btn btn-primary btn-large" href="product.html">Generate your GTM Fracture Map</a>
      </div>
    </section>`;
}

function render() {
  document.querySelector("#app").innerHTML = `
    <div class="site-shell">
      ${nav()}
      <main>
        ${hero()}
        ${mapSection()}
        ${complexitySection()}
        ${layersSection()}
        ${firstRunSection()}
        ${audienceSection()}
        ${pricingSection()}
        ${finalCta()}
      </main>
    </div>`;
}

render();
