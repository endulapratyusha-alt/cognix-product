const productsMenu = [
  {
    heading: "Product",
    items: [
      ["Cognix readout", "Turn fragmented GTM signals into a leadership-ready diagnosis."],
      ["Fragmentation detection", "Find where strategy, messaging, sales narrative, proof, offers, and AI drafts diverge."],
      ["Revenue risk mapping", "See which GTM contradictions may create pipeline, conversion, cycle, handoff, or churn risk."],
      ["Executive reports", "Share decisions, owners, urgency, evidence, and expected GTM impact."]
    ]
  },
  {
    heading: "Use cases",
    items: [
      ["AI-generated narrative drift", "Detect unsupported or inconsistent claims in AI-created GTM content."],
      ["Positioning fragmentation", "Find when the company is being positioned as multiple things at once."],
      ["Sales interpretation variance", "See where field talk tracks and enablement translate the story differently."],
      ["Launch coherence risk", "Analyze whether launch strategy, proof, ICP, and sales materials are aligned before rollout."]
    ]
  },
  {
    heading: "Outputs",
    items: [
      ["Active contradiction", "The GTM issue leadership needs to understand first."],
      ["Root cause", "Why the contradiction emerged and where it is spreading."],
      ["Evidence trail", "The signals behind the diagnosis."],
      ["Recommended decision", "What leadership should fix first and who should own it."]
    ]
  }
];

const solutionsMenu = [
  {
    heading: "By team",
    items: [
      ["For founders", "See whether the original market thesis is surviving translation."],
      ["For CMOs", "Understand why narrative, demand, and sales alignment are drifting."],
      ["For product marketing", "Detect positioning fragmentation, proof gaps, launch risk, and buyer confusion."],
      ["For RevOps", "See the interpretation issues behind pipeline quality and forecast noise."],
      ["For enablement", "Understand whether the field is being trained on the right story and proof."]
    ]
  },
  {
    heading: "By moment",
    items: [
      ["Before a launch", "Catch coherence risk before market rollout."],
      ["Before execution scales", "Decide what should change before the wrong story spreads."],
      ["Before a board update", "Create a clear executive readout on GTM drift and revenue exposure."]
    ]
  },
  {
    heading: "By risk",
    items: [
      ["Buyer clarity", "Find when ICP, pain, promise, and proof stop reinforcing each other."],
      ["Pipeline quality", "Connect GTM fragmentation to quality, qualification, and conversion risk."],
      ["Sales cycle risk", "Identify where unclear narrative or proof can slow buying decisions."],
      ["Churn exposure", "See expectation gaps before customer teams inherit them."]
    ]
  }
];

const simpleMenus = {
  customers: ["Design partners", "Beta cohort", "Use cases", "Customer stories, coming soon"],
  resources: ["Revenue cognition manifesto", "GTM fragmentation report", "Blog", "Research library", "Founder notes", "Guides"],
  company: ["About Cognix", "Why now", "Category POV", "Careers, coming soon", "Contact"]
};

const signalInputs = ["Strategy docs", "Sales calls", "Launch plans", "Website copy", "Customer feedback", "Win loss notes", "RevOps reports", "Enablement assets", "AI drafts"];
const outputs = ["Contradiction", "Root cause", "Evidence trail", "Revenue risk", "What breaks next", "Decision brief"];

const whatCards = [
  ["Detect fragmentation", "Find where strategy, messaging, sales narrative, buyer definition, proof, offers, and AI-generated content are no longer aligned."],
  ["Explain the cause", "Separate symptoms from root cause. Cognix shows why the contradiction emerged, which signals created it, and where it is spreading."],
  ["Map revenue risk", "Understand how GTM fragmentation can create pipeline quality issues, sales interpretation variance, longer cycles, handoff gaps, churn risk, or weak conversion."],
  ["Recommend the decision", "Get an executive cognition brief that explains what leadership should fix first, who should own it, and what impact to expect."]
];

const readInputs = [
  "Website copy",
  "Sales decks",
  "Launch plans",
  "Positioning docs",
  "Customer feedback",
  "Win loss notes",
  "RevOps observations",
  "Enablement assets",
  "AI-generated GTM drafts",
  "Competitive messaging",
  "Founder strategy notes"
];

const readOutputs = [
  "Active GTM contradiction",
  "Root cause",
  "Evidence trail",
  "Revenue risk",
  "Affected team",
  "Affected funnel stage",
  "What breaks next",
  "Recommended leadership decision",
  "Shareable executive report"
];

const comparisonLeft = [
  "Capture more signals",
  "Generate more content",
  "Track pipeline data",
  "Manage enablement assets",
  "Monitor competitors",
  "Run workflows"
];

const comparisonRight = [
  "Understand what those signals mean",
  "Detect when content drifts from strategy",
  "Explain which GTM contradictions may create revenue risk",
  "See whether enablement is reinforcing the right story",
  "Understand how competitive pressure is changing your positioning",
  "Decide what should change before execution scales the wrong story"
];

const useCases = [
  ["AI-generated narrative drift", "Detect when AI-created sales, marketing, and enablement content starts introducing generic, unsupported, or inconsistent claims."],
  ["Positioning fragmentation", "Find when the company is being positioned as multiple things at once, such as platform, service, workflow tool, operating layer, or transformation solution."],
  ["Sales interpretation variance", "See where sales talk tracks, customer conversations, and enablement assets are translating the GTM story differently from leadership or marketing."],
  ["Launch coherence risk", "Analyze whether launch strategy, website copy, sales materials, proof points, ICP, and customer-facing narrative are aligned before market rollout."],
  ["Revenue-risk explanation", "Connect GTM fragmentation to pipeline quality, conversion risk, sales cycle risk, handoff gaps, forecast confidence, or churn exposure."]
];

const audienceCards = [
  ["Founders", "See whether your original market thesis is surviving translation across website, sales, product, customer feedback, and AI-generated GTM content."],
  ["CMOs and marketing leaders", "Understand why narrative, demand, sales alignment, and board-ready GTM clarity are drifting before pipeline quality suffers."],
  ["Product marketing leaders", "Detect positioning fragmentation, proof gaps, launch risk, buyer confusion, and sales narrative variance with evidence."],
  ["RevOps leaders", "See the GTM interpretation issues behind pipeline quality, qualification inconsistency, handoff gaps, and forecast noise."],
  ["Enablement leaders", "Understand whether the field is being trained on the right story, the right buyer, the right proof, and the right commercial motion."]
];

const steps = [
  ["Add company context", "Tell Cognix who you sell to, what motion you run, what market you are in, and what GTM question you want answered."],
  ["Paste GTM signals", "Add website copy, sales notes, launch docs, customer feedback, AI-generated drafts, RevOps observations, or enablement snippets."],
  ["Run cognition", "Cognix extracts claims, buyers, proof, offers, objections, ambiguity signals, contradictions, and revenue-risk clues."],
  ["Review the diagnosis", "See the active contradiction, root cause, evidence, affected teams, revenue risk, and what breaks next."],
  ["Share the executive report", "Export or share a leadership-ready readout with recommended decisions, owners, urgency, and expected GTM impact."]
];

const pricingCards = [
  ["Free readout", "$0", "Run your first GTM fragmentation readout.", ["1 workspace", "5 GTM signals", "1 cognition run", "Basic evidence trail", "Limited report"], "Run free readout"],
  ["Starter beta", "$99/month", "For founders and solo GTM leaders.", ["1 workspace", "25 signals per month", "10 cognition runs per month", "3 saved reports", "30-day memory", "Manual inputs"], "Start beta"],
  ["Team beta", "$249/month", "For small GTM teams.", ["3 workspaces", "100 signals per month", "50 cognition runs per month", "10 saved reports", "90-day memory", "Scenario simulations", "3 users", "Shareable reports"], "Start team beta"],
  ["Custom", "Talk to us", "For larger teams or guided beta support.", ["Higher signal volume", "Guided onboarding", "Custom report format", "Priority support"], "Talk to us"]
];

const esc = (value = "") => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function menuColumn(column) {
  return `
    <div class="mega-column">
      <p>${esc(column.heading)}</p>
      ${column.items.map(([title, description, href]) => `
        <a class="mega-link" href="${href || `#${slug(title)}`}">
          <span class="menu-icon"></span>
          <span><strong>${esc(title)}</strong><small>${esc(description)}</small></span>
        </a>`).join("")}
    </div>`;
}

function simpleMenu(name, items) {
  return `
    <div class="simple-menu" data-menu-panel="${name}">
      ${items.map((item) => `<a href="#${slug(item)}">${esc(item)}</a>`).join("")}
    </div>`;
}

function cardGrid(items, className = "") {
  return items.map(([title, body], index) => `
    <article class="insight-card ${className}" style="--i:${index}">
      <span class="card-rule"></span>
      <h3>${esc(title)}</h3>
      <p>${esc(body)}</p>
    </article>`).join("");
}

function listBlock(title, items) {
  return `
    <div class="list-block">
      <h3>${esc(title)}</h3>
      <div class="pill-grid">
        ${items.map((item) => `<span>${esc(item)}</span>`).join("")}
      </div>
    </div>`;
}

function cognitionVisual() {
  return `
    <div class="cognition-visual" aria-label="Fragmented GTM signals flowing into a Cognix readout">
      <div class="visual-grid visual-grid-left">
        ${signalInputs.map((item, index) => `<span style="--i:${index}">${esc(item)}</span>`).join("")}
      </div>
      <div class="cognition-core">
        <span>GTM signals</span>
        <strong>Cognix</strong>
        <small>readout</small>
      </div>
      <div class="visual-grid visual-grid-right">
        ${outputs.map((item, index) => `<span style="--i:${index}">${esc(item)}</span>`).join("")}
      </div>
      <svg viewBox="0 0 840 520" role="presentation" aria-hidden="true">
        <defs>
          <linearGradient id="signalLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#3448FF" stop-opacity="0.1" />
            <stop offset="0.48" stop-color="#3448FF" stop-opacity="0.72" />
            <stop offset="1" stop-color="#6E5BFF" stop-opacity="0.18" />
          </linearGradient>
        </defs>
        <path d="M135 72 C280 86 302 216 420 260 C302 302 270 438 135 446" />
        <path d="M135 145 C266 150 312 226 420 260 C306 272 262 348 135 374" />
        <path d="M135 220 C266 220 316 244 420 260 C310 286 258 300 135 302" />
        <path d="M705 92 C596 114 550 210 420 260 C556 296 592 390 705 428" />
        <path d="M705 170 C594 178 548 232 420 260 C550 278 594 326 705 354" />
        <path d="M705 246 C590 246 548 252 420 260 C548 266 590 278 705 286" />
      </svg>
    </div>`;
}

function pricingGrid() {
  return pricingCards.map(([title, price, body, includes, cta]) => `
    <article class="pricing-card">
      <h3>${esc(title)}</h3>
      <strong>${esc(price)}</strong>
      <p>${esc(body)}</p>
      <ul>
        ${includes.map((item) => `<li>${esc(item)}</li>`).join("")}
      </ul>
      <a class="btn btn-secondary" href="#beta">${esc(cta)}</a>
    </article>`).join("");
}

function render() {
  document.querySelector("#app").innerHTML = `
    <div class="site-shell">
      <header class="site-header">
        <div class="nav-bar">
          <a class="brand" href="#top" aria-label="Cognix home">
            <span class="brand-mark"><i></i></span>
            <span>Cognix</span>
          </a>
          <button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
          <nav class="nav-links" aria-label="Primary navigation">
            <div class="nav-item">
              <button type="button" data-menu="products">Product</button>
              <div class="mega-menu" data-menu-panel="products">${productsMenu.map(menuColumn).join("")}</div>
            </div>
            <div class="nav-item">
              <button type="button" data-menu="solutions">Solutions</button>
              <div class="mega-menu" data-menu-panel="solutions">${solutionsMenu.map(menuColumn).join("")}</div>
            </div>
            ${Object.entries(simpleMenus).map(([name, items]) => `
              <div class="nav-item">
                <button type="button" data-menu="${name}">${name[0].toUpperCase()}${name.slice(1)}</button>
                ${simpleMenu(name, items)}
              </div>`).join("")}
          </nav>
          <div class="nav-actions">
            <a class="login-link" href="product.html">Open product</a>
            <a class="btn btn-primary" href="#beta">Run free readout</a>
          </div>
        </div>
      </header>

      <main id="top">
        <section class="hero-section section">
          <div class="hero-copy">
            <p class="eyebrow">Revenue cognition for AI-era GTM teams</p>
            <h1>Detect GTM fragmentation before it becomes revenue risk.</h1>
            <p class="subheadline">Cognix reads strategy, sales, marketing, RevOps, customer, market, and AI-generated GTM signals to show where GTM truth is breaking, why it matters, and what leadership should fix first.</p>
            <p class="supporting">Built for GTM teams where positioning, buyer clarity, sales execution, and revenue decisions cannot afford to drift.</p>
            <div class="hero-actions">
              <a class="btn btn-primary btn-large" href="#beta">Run your first Cognix readout</a>
              <a class="btn btn-secondary btn-large" href="#how-it-works">See how it works</a>
            </div>
            <div class="hero-proof">
              <span>No integrations required to start.</span>
              <span>Paste 3 to 5 GTM signals.</span>
              <span>See where your GTM story is fragmenting.</span>
            </div>
          </div>
          ${cognitionVisual()}
        </section>

        <section class="section category-section">
          <div class="section-header centered">
            <p class="eyebrow">Category</p>
            <h2>Revenue cognition infrastructure for AI-era GTM teams.</h2>
            <p>Cognix turns fragmented GTM signals into trusted leadership decisions. It reads strategy, sales, marketing, RevOps, customer, market, and AI-generated signals to show where GTM truth is breaking, why it matters, what will break next, and what leadership should fix first.</p>
          </div>
          <div class="three-up">
            ${cardGrid([
              ["See the drift", "Detect where the company is no longer operating from one coherent GTM story."],
              ["Understand the risk", "Connect fragmented interpretation to buyer confusion, weak conversion, sales variance, and forecast noise."],
              ["Decide what changes", "Give leadership a clear view of the first decision that will restore GTM coherence."]
            ], "category-card")}
          </div>
        </section>

        <section class="problem-section dark-band">
          <div class="section split-section">
            <div>
              <p class="eyebrow">Problem</p>
              <h2>Your GTM truth is fragmenting faster than your team can see it.</h2>
              <p>Modern GTM teams are surrounded by signals.</p>
              <p>Sales calls. CRM notes. Launch plans. Website copy. Customer feedback. Win loss themes. Enablement assets. RevOps reports. AI-generated drafts. Leadership strategy docs.</p>
              <p>Each system captures a piece of the truth. But none of them tells leadership whether the company is still operating from one coherent GTM story.</p>
            </div>
            <div class="question-panel">
              <ul>
                <li>Leadership says one thing.</li>
                <li>Marketing turns it into another.</li>
                <li>Sales adapts it in the field.</li>
                <li>Enablement trains a simplified version.</li>
                <li>RevOps sees the symptoms in pipeline.</li>
                <li>Customer teams inherit the expectation gap.</li>
                <li>AI tools generate even more versions at scale.</li>
              </ul>
              <p>By the time the story reaches the buyer, the company may be selling multiple versions of itself.</p>
              <strong>The risk is not lack of data. The risk is fragmented interpretation.</strong>
            </div>
          </div>
        </section>

        <section class="section product-section" id="cognix-readout">
          <div class="section-header">
            <p class="eyebrow">What Cognix does</p>
            <h2>Cognix turns scattered GTM signals into one leadership-ready view of what is breaking.</h2>
          </div>
          <div class="four-up">${cardGrid(whatCards, "product-card")}</div>
        </section>

        <section class="audit-section" id="readout-preview">
          <div class="section audit-shell">
            <div class="audit-copy">
              <p class="eyebrow">Product readout preview</p>
              <h2>From messy GTM inputs to a clear executive decision.</h2>
              <p>Cognix found positioning fragmentation across 5 GTM signals.</p>
              <p>The company is using platform, advisory, AI transformation, and workflow narratives interchangeably. The root cause is that the commercial motion has not been clearly defined across marketing, sales, and launch materials.</p>
              <p>If unresolved, sales interpretation variance will increase, buyer clarity will weaken, and pipeline quality may become harder to explain.</p>
              <p><strong>Recommended move:</strong> create a positioning hierarchy with one category claim, one primary buyer, one core promise, one proof system, and one field activation motion.</p>
            </div>
            <div class="audit-lists">
              ${listBlock("Signals Cognix can read", readInputs)}
              ${listBlock("What Cognix returns", readOutputs)}
            </div>
          </div>
        </section>

        <section class="section differentiation-section">
          <div class="section-header centered">
            <p class="eyebrow">Differentiation</p>
            <h2>Not another dashboard. Not another AI summary. Cognix is built for GTM judgment.</h2>
            <p>Dashboards show what happened. Copilots generate more output. Workflow tools help teams execute. Cognix answers a different question: Is the GTM system still making sense?</p>
            <p>It does not just summarize assets. It interprets the relationships between them. Cognix detects when narratives compete, when proof does not support the claim, when sales and marketing translate strategy differently, when AI-generated content drifts from the intended story, and when a GTM issue is likely to become a revenue issue.</p>
          </div>
          <div class="comparison-grid">
            ${listBlock("Other tools help you", comparisonLeft)}
            ${listBlock("Cognix helps you", comparisonRight)}
          </div>
        </section>

        <section class="why-now dark-band">
          <div class="section split-section">
            <div>
              <p class="eyebrow">Why now</p>
              <h2>AI has made GTM fragmentation harder to see and easier to scale.</h2>
            </div>
            <div>
              <p>Every GTM team is using AI. AI drafts campaigns, summarizes calls, writes enablement, generates sales emails, produces competitive analysis, creates launch content, rewrites messaging, and builds reports.</p>
              <p>The problem is not that AI creates content. The problem is that every team can now generate local intelligence without a shared system for strategic coherence.</p>
              <p>Leadership may not see the drift until it shows up as weak conversion, inconsistent qualification, longer sales cycles, or churn risk.</p>
              <p>Cognix gives AI-era GTM teams a way to govern meaning, not just produce more output.</p>
            </div>
          </div>
        </section>

        <section class="section use-case-section">
          <div class="section-header">
            <p class="eyebrow">Use cases</p>
            <h2>Where Cognix creates value first</h2>
          </div>
          <div class="product-grid">${cardGrid(useCases, "solution-card")}</div>
        </section>

        <section class="section" id="who-it-is-for">
          <div class="section-header">
            <p class="eyebrow">Who it is for</p>
            <h2>Built for GTM leaders who need clarity across the system.</h2>
          </div>
          <div class="solution-grid">${cardGrid(audienceCards, "solution-card")}</div>
        </section>

        <section class="section stage-section" id="how-it-works">
          <div class="section-header centered">
            <p class="eyebrow">How it works</p>
            <h2>Run a Cognix readout in minutes.</h2>
          </div>
          <div class="five-step-grid">${cardGrid(steps, "stage-card")}</div>
        </section>

        <section class="pricing-section" id="pricing">
          <div class="section">
            <div class="section-header centered">
              <p class="eyebrow">Pricing</p>
              <h2>Start with a free GTM fragmentation readout.</h2>
              <p>Cognix is built for product-led adoption. Start free, run your first readout, and upgrade when you need memory, reports, more signals, and team access.</p>
            </div>
            <div class="pricing-grid">${pricingGrid()}</div>
          </div>
        </section>

        <section class="final-cta" id="beta">
          <div class="section final-cta-inner">
            <p class="eyebrow">Get started</p>
            <h2>Find the GTM contradiction before your buyers do.</h2>
            <p>Start with a free Cognix readout. Paste a few GTM signals and see where your story, buyer, proof, offer, and execution path are starting to fragment.</p>
            <div class="hero-actions">
              <a class="btn btn-primary btn-large" href="mailto:founders@cognix.ai?subject=Cognix readout">Run your first Cognix readout</a>
            </div>
          </div>
        </section>
      </main>
    </div>`;

  bindNavigation();
}

function bindNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("mobile-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll("[data-menu]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".nav-item");
      if (window.matchMedia("(max-width: 900px)").matches) {
        item.classList.toggle("open");
      }
    });
  });

  nav.addEventListener("mouseleave", () => {
    document.querySelectorAll(".nav-item.open").forEach((item) => item.classList.remove("open"));
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", () => {
      header.classList.remove("mobile-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

render();
