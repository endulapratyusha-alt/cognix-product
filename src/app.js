const riskCards = [
  {
    title: "Messaging drift",
    signal: "Launch deck frames the release around capability while the website promises revenue-risk decisions.",
    risk: "Buyers cannot tell what category to place the product in.",
    action: "Anchor every launch asset to one revenue-risk promise."
  },
  {
    title: "Sales narrative gaps",
    signal: "Gong notes show reps leading with automation instead of buyer urgency.",
    risk: "High activity produces weak qualified pipeline conversion.",
    action: "Update objection handling around missed warning signs."
  },
  {
    title: "Competitive risk",
    signal: "Competitive intel points to buying criteria, but sales decks still compare feature lists.",
    risk: "The team is fighting the wrong frame in late-stage deals.",
    action: "Rebuild the battlecard around interpretation, not workflow."
  },
  {
    title: "Launch KPI misalignment",
    signal: "Campaign reporting rewards volume while launch goals depend on sales confidence.",
    risk: "Leadership sees motion before it sees conversion weakness.",
    action: "Track narrative adoption beside pipeline quality."
  }
];

const breakpoints = [
  "Sales narrative does not map to buyer urgency",
  "Launch proof points support activity, not conversion confidence",
  "Competitive story is framed around features instead of revenue risk"
];

const evidence = [
  ["Gong", "6 of 9 calls led with efficiency language before pain recognition"],
  ["Launch doc", "Primary claim varies across PMM brief, homepage, and sales deck"],
  ["CRM notes", "Qualified opportunities mention urgency only after discovery"],
  ["Slack", "Sales asks for new objection handling two weeks after launch kickoff"]
];

const pricingCards = [
  {
    title: "Free readout",
    price: "$0",
    bestFor: "Trying Cognix on one GTM motion",
    items: ["1 limited GTM risk readout", "Sample revenue-risk score", "Top 3 GTM breakpoints", "Limited course correction", "Shareable preview"],
    cta: "Run free readout"
  },
  {
    title: "Starter beta",
    price: "$99/month",
    bestFor: "Solo PMMs, founders, and lean GTM teams",
    items: ["5 full GTM risk readouts per month", "3 saved projects", "Revenue-risk scoring", "Evidence trail", "Course correction plan", "Exportable executive summary"],
    cta: "Start beta",
    featured: true
  },
  {
    title: "Team beta",
    price: "$249/month",
    bestFor: "PMM teams working with sales and enablement",
    items: ["20 GTM risk readouts per month", "Team workspace", "Saved projects", "Messaging, launch, competitive, and enablement readouts", "Shareable executive reports", "Priority beta access"],
    cta: "Start team beta"
  },
  {
    title: "Design partner",
    price: "Custom",
    bestFor: "Series A to C GTM teams shaping the roadmap",
    items: ["Custom readout workflows", "Live feedback sessions", "Roadmap influence", "Advanced signal analysis", "Founder access"],
    cta: "Apply as design partner"
  }
];

const valueCards = [
  "Find launch risk before launch day",
  "Turn messaging gaps into revenue decisions",
  "Show sales where the story is breaking",
  "Tie PMM work to pipeline, conversion, and sales confidence",
  "Create executive-ready GTM readouts"
];

const heroSignals = ["Launch brief", "Sales deck", "Gong notes", "Competitive notes", "Customer feedback"];

const demoSteps = [
  {
    title: "Add signals",
    items: ["Launch docs", "Sales notes", "Competitive intel", "Customer feedback", "Slack threads", "Campaign goals"],
    artifactLabel: "Signals attached",
    artifactValue: "6 sources",
    artifactDetail: "Cognix reads the motion from the documents and conversations already shaping GTM execution."
  },
  {
    title: "Detect breakpoints",
    items: ["Messaging drift", "Sales narrative gaps", "ICP mismatch", "Enablement weakness", "Competitive confusion"],
    artifactLabel: "GTM breakpoints",
    artifactValue: "5 found",
    artifactDetail: "The readout separates surface noise from the breaks most likely to affect buyer urgency."
  },
  {
    title: "Score revenue risk",
    items: ["Pipeline risk", "Conversion risk", "Sales adoption risk", "Launch KPI risk"],
    artifactLabel: "Revenue-risk score",
    artifactValue: "72%",
    artifactDetail: "Risk is mapped to the revenue outcome the motion is supposed to influence."
  },
  {
    title: "Course correct",
    items: ["Fix the narrative", "Update enablement", "Sharpen competitive story", "Align to KPI"],
    artifactLabel: "Course correction",
    artifactValue: "4 moves",
    artifactDetail: "The readout turns evidence into next actions for PMM, sales, and leadership."
  }
];

const signupDiagnoses = [
  "Launch",
  "Messaging",
  "Sales enablement",
  "Competitive positioning",
  "Pipeline narrative",
  "Other"
];

const state = {
  betaSubmitted: false,
  activeDemoStep: 0
};

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function productPreview() {
  return `
    <aside class="product-preview" aria-label="Cognix product preview">
      <div class="signal-flow" aria-hidden="true">
        <div class="signal-column">
          ${heroSignals.map((signal) => `<span>${esc(signal)}</span>`).join("")}
        </div>
        <div class="flow-lines">
          <i></i><i></i><i></i><i></i>
        </div>
        <div class="readout-chip">Readout</div>
      </div>
      <div class="preview-topline">
        <span>GTM risk readout</span>
        <span>Launch narrative</span>
      </div>
      <div class="score-row">
        <div>
          <p>Revenue-risk score</p>
          <strong>72%</strong>
        </div>
        <div class="score-ring" aria-hidden="true"><span></span></div>
      </div>
      <div class="preview-stack">
        <article>
          <span>GTM breakpoint</span>
          <strong>Sales narrative does not map to buyer urgency</strong>
        </article>
        <article>
          <span>Revenue implication</span>
          <strong>High activity, weak qualified pipeline conversion</strong>
        </article>
        <article>
          <span>Course correction</span>
          <strong>Reframe launch narrative around buyer pain and update objection handling</strong>
        </article>
      </div>
    </aside>`;
}

function signalCard({ title, signal, risk, action }) {
  return `
    <article class="signal-card">
      <div class="card-icon" aria-hidden="true"></div>
      <h3>${esc(title)}</h3>
      <dl>
        <div>
          <dt>Signal</dt>
          <dd>${esc(signal)}</dd>
        </div>
        <div>
          <dt>Risk</dt>
          <dd>${esc(risk)}</dd>
        </div>
        <div>
          <dt>Action</dt>
          <dd>${esc(action)}</dd>
        </div>
      </dl>
    </article>`;
}

function riskReadout() {
  return `
    <div class="readout-ui" aria-label="GTM risk readout mockup">
      <div class="readout-header">
        <div>
          <span class="ui-label">GTM risk readout</span>
          <h3>Spring launch narrative</h3>
        </div>
        <span class="status-pill">Decision needed</span>
      </div>
      <div class="readout-grid">
        <section class="readout-score">
          <span>Revenue-risk score</span>
          <strong>72%</strong>
          <div class="meter"><i></i></div>
          <p>Risk is concentrated in sales narrative adoption and proof alignment.</p>
        </section>
        <section class="readout-panel">
          <span class="ui-label">Top 3 GTM breakpoints</span>
          <ol>
            ${breakpoints.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ol>
        </section>
        <section class="readout-panel evidence-panel">
          <span class="ui-label">Evidence trail</span>
          <div class="evidence-list">
            ${evidence.map(([source, detail]) => `
              <div>
                <b>${esc(source)}</b>
                <p>${esc(detail)}</p>
              </div>`).join("")}
          </div>
        </section>
        <section class="readout-panel implication-panel">
          <span class="ui-label">Revenue implication</span>
          <p>High engagement is masking weak qualified pipeline conversion. Sales is generating activity, but the story is not creating enough buyer urgency to move serious opportunities forward.</p>
        </section>
        <section class="readout-panel correction-panel">
          <span class="ui-label">Course correction</span>
          <p>Reframe the launch around the missed-warning-sign narrative, rebuild the first-call story around buyer pain, and update objection handling before the next campaign wave.</p>
        </section>
      </div>
    </div>`;
}

function demoReadoutCard() {
  const step = demoSteps[state.activeDemoStep] || demoSteps[0];
  return `
    <aside class="demo-readout-card" aria-live="polite">
      <div class="demo-card-header">
        <span>GTM risk readout</span>
        <strong>${esc(step.title)}</strong>
      </div>
      <div class="demo-score-band">
        <span>${esc(step.artifactLabel)}</span>
        <strong>${esc(step.artifactValue)}</strong>
      </div>
      <p>${esc(step.artifactDetail)}</p>
      <div class="demo-mini-map" aria-hidden="true">
        <i></i><i></i><i></i>
        <b></b>
      </div>
    </aside>`;
}

function demoSection() {
  return `
    <section class="demo-section" id="how-readout-works">
      <div class="section demo-shell">
        <div class="section-header centered">
          <span class="section-kicker">Product demo</span>
          <h2>How a GTM risk readout works</h2>
        </div>
        <div class="demo-flow">
          <div class="demo-steps" role="list">
            ${demoSteps.map((step, index) => `
              <button class="demo-step ${index === state.activeDemoStep ? "active" : ""}" type="button" role="listitem" data-demo-step="${index}">
                <span>${index + 1}</span>
                <strong>${esc(step.title)}</strong>
                <small>${step.items.map((item) => esc(item)).join(", ")}</small>
              </button>`).join("")}
          </div>
          ${demoReadoutCard()}
        </div>
        <p class="demo-closing">Cognix does not give you more GTM noise.<br>It tells you which signal matters, why it threatens revenue, and what to fix next.</p>
      </div>
    </section>`;
}

function pricingCard(card) {
  return `
    <article class="pricing-card ${card.featured ? "featured" : ""}">
      ${card.featured ? `<span class="plan-badge">Best beta entry</span>` : ""}
      <h3>${esc(card.title)}</h3>
      <strong>${esc(card.price)}</strong>
      <p><b>Best for:</b> ${esc(card.bestFor)}</p>
      <ul>
        ${card.items.map((item) => `<li>${esc(item)}</li>`).join("")}
      </ul>
      <a class="btn ${card.featured ? "btn-primary" : "btn-secondary"}" href="#beta-signup">${esc(card.cta)}</a>
    </article>`;
}

function valueGrid() {
  return valueCards.map((item, index) => `
    <article class="value-card">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${esc(item)}</h3>
    </article>`).join("");
}

function betaSignup() {
  if (state.betaSubmitted) {
    return `
      <div class="signup-confirmation" role="status">
        <span class="section-kicker">Beta request</span>
        <h2>Your beta request is in.</h2>
        <p>Next step: run your first GTM risk readout.</p>
        <a class="btn btn-primary btn-large" href="product.html">Run the product flow</a>
      </div>`;
  }

  return `
    <form class="signup-form" id="beta-form">
      <div class="field">
        <label for="beta-name">Name</label>
        <input id="beta-name" name="name" type="text" autocomplete="name" required />
      </div>
      <div class="field">
        <label for="beta-email">Work email</label>
        <input id="beta-email" name="email" type="text" inputmode="email" autocomplete="email" required />
      </div>
      <div class="field">
        <label for="beta-company">Company</label>
        <input id="beta-company" name="company" type="text" autocomplete="organization" required />
      </div>
      <div class="field">
        <label for="beta-role">Role</label>
        <input id="beta-role" name="role" type="text" autocomplete="organization-title" required />
      </div>
      <div class="field full">
        <label for="beta-diagnose">What do you want to diagnose?</label>
        <select id="beta-diagnose" name="diagnose" required>
          ${signupDiagnoses.map((item) => `<option>${esc(item)}</option>`).join("")}
        </select>
      </div>
      <button class="btn btn-primary btn-large full" type="submit">Request beta access</button>
    </form>`;
}

function render() {
  document.querySelector("#app").innerHTML = `
    <div class="site-shell">
      <header class="site-header">
        <nav class="nav-bar" aria-label="Primary navigation">
          <a class="brand" href="#top" aria-label="Cognix home">
            <span class="brand-mark" aria-hidden="true"></span>
            <span>Cognix</span>
          </a>
          <button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false">
            <span></span>
            <span></span>
          </button>
          <div class="nav-links">
            <a href="#product">Product</a>
            <a href="#readout">Readout</a>
            <a href="#why-now">Why now</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div class="nav-actions">
            <a class="text-link" href="product.html">See the product</a>
            <a class="btn btn-primary" href="#beta-signup">Run a free GTM risk readout</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section class="hero-section">
          <div class="hero-inner">
            <div class="hero-copy">
              <p class="eyebrow">Revenue cognition for PMM and GTM leaders</p>
              <h1>Know why your GTM motion is missing before revenue does.</h1>
              <p class="subheadline">Cognix turns messaging, launch, enablement, competitive, and customer signals into a GTM risk readout that shows where pipeline, conversion, and sales confidence are exposed.</p>
              <div class="hero-actions">
                <a class="btn btn-primary btn-large" href="#beta-signup">Run a free GTM risk readout</a>
                <a class="btn btn-secondary btn-large" href="product.html">See the product</a>
              </div>
              <p class="hero-microcopy">Built for launches, messaging updates, enablement motions, competitive campaigns, and pipeline narratives.</p>
            </div>
            ${productPreview()}
          </div>
        </section>

        <section class="section problem-section">
          <div class="section-kicker">The problem</div>
          <div class="split">
            <h2>Your GTM team is not short on signals. It is short on interpretation.</h2>
            <div class="problem-copy">
              <p>Your CRM says one thing.<br>Sales calls say another.<br>Campaigns show activity.<br>Slack shows confusion.<br>Customers expose gaps.<br>Leadership wants answers.</p>
              <p>By the time everyone agrees something is broken, the launch is already underperforming.</p>
            </div>
          </div>
        </section>

        <section class="section product-section" id="product">
          <div class="section-header">
            <span class="section-kicker">Signal interpretation</span>
            <h2>Cognix shows where GTM is breaking and what it means for revenue.</h2>
            <p>Each readout connects scattered signals to GTM breakpoints, evidence trails, and course correction.</p>
          </div>
          <div class="signal-grid">
            ${riskCards.map(signalCard).join("")}
          </div>
        </section>

        ${demoSection()}

        <section class="readout-section" id="readout">
          <div class="section">
            <div class="section-header centered">
              <span class="section-kicker">Revenue cognition</span>
              <h2>See the risk before the miss.</h2>
            </div>
            ${riskReadout()}
          </div>
        </section>

        <section class="section why-section" id="why-now">
          <div class="split">
            <h2>Modern GTM teams create more signals than they can interpret.</h2>
            <div class="why-copy">
              <p>More summaries do not explain why pipeline is slowing.</p>
              <p>More reporting views do not show why sales is not using the story.</p>
              <p>More content does not tell PMM teams which narrative will convert.</p>
              <p>Cognix gives teams the missing interpretation layer: GTM signals translated into revenue decisions.</p>
            </div>
          </div>
        </section>

        <section class="pricing-section" id="pricing">
          <div class="section">
            <div class="section-header">
              <span class="section-kicker">Pricing</span>
              <h2>Start with one readout. Expand when Cognix finds what your team could not see.</h2>
              <p>Run a free GTM risk readout. Upgrade when you need more readouts, saved projects, team collaboration, and executive-ready reports.</p>
              <p class="pricing-note">The beta is priced to land quickly, prove revenue value, and expand when GTM leaders see the breakpoints their team missed.</p>
            </div>
            <div class="pricing-grid">
              ${pricingCards.map(pricingCard).join("")}
            </div>
          </div>
        </section>

        <section class="section value-section">
          <div class="section-header centered">
            <span class="section-kicker">Why teams pay for Cognix</span>
            <h2>PMM work becomes easier to fund when it is tied to revenue risk.</h2>
          </div>
          <div class="value-grid">${valueGrid()}</div>
        </section>

        <section class="final-cta" id="beta-signup">
          <div class="signup-shell">
            <div class="signup-copy">
              <span class="section-kicker">Request beta access</span>
              <h2>Before your next launch misses, run the readout.</h2>
              <p>Cognix turns scattered GTM signals into revenue-risk decisions. Tell us what you want to diagnose and we will route you to the right beta path.</p>
            </div>
            ${betaSignup()}
          </div>
        </section>
      </main>
    </div>`;

  bindNavigation();
}

function bindNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".mobile-toggle");

  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("mobile-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-links a, .nav-actions a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("mobile-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelector("#beta-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.betaSubmitted = true;
    render();
    document.querySelector("#beta-signup")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll("[data-demo-step]").forEach((button) => {
    const setActiveStep = () => {
      state.activeDemoStep = Number(button.dataset.demoStep);
      render();
    };

    button.addEventListener("mouseenter", setActiveStep);
    button.addEventListener("focus", setActiveStep);
    button.addEventListener("click", setActiveStep);
  });
}

render();
