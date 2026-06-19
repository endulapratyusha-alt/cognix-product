const reviewHref = "product.html?access=free-audit";

const launchInputs = [
  ["Slack messages", "Team conversations", "slack-mark"],
  ["ChatGPT / Claude", "AI-generated content", "ai-mark"],
  ["Salesforce", "Deals and accounts", "crm-mark"],
  ["Gong", "Calls and meeting intel", "gong-mark"],
  ["Campaign copy", "Emails, ads, CTAs", "email-mark"],
  ["Landing page", "Web and LP content", "page-mark"],
  ["Proof points", "Case studies, data", "proof-mark"],
  ["Exec feedback", "Slack, docs, notes", "exec-mark"],
  ["Launch goal", "Pipeline, revenue", "goal-mark"]
];

const pmmProof = [
  ["Teams review GTM assets vertically. Customers experience them horizontally.", "Senior PMM"],
  ["Async approvals catch errors, not narrative drift.", "PMM leader"],
  ["Each asset looks fine on its own, but cumulative drift across 4-5 assets is huge by launch.", "PMM leader"],
  ["The hardest part is turning conflicting feedback into one clear decision.", "PMM leader"]
];

const sampleOutput = [
  ["Launch risk", "Narrative drift across 4 assets", "", "shield"],
  ["Evidence receipt", "Proof supports renewal-risk pain, but campaign copy leads with broad category language.", "", "doc"],
  ["Tradeoff", "Category vision may create executive interest. Renewal-risk pain may create stronger qualified demo intent.", "", "scale"],
  ["KPI at risk", "Qualified demo conversion", "", "bars"],
  ["Suggested owner + approval path", "PMM / GTM owner: Update CTA and campaign angle.|Sales / Enablement: Align talk track to renewal-risk pain.|Demand Gen / Growth: Pause broad category variant before spend scales.|Founder / C-suite: Approve category vs buyer-pain tradeoff.|Recheck: Run revised page, proof, and sales narrative before launch gate.", "Solo team? Cognix collapses this into one prioritized action list.", "users"],
  ["Decision", "Fix before spend scales", "", "target"]
];

const whyBullets = [
  "AI creates more content.",
  "People create more opinions.",
  "Launch systems drift.",
  "Pipeline pays the price."
];

const givesFlow = [
  ["The fracture", "Cognix shows where the story breaks.", "bolt"],
  ["The receipts", "Proof behind the diagnosis.", "doc"],
  ["The tradeoff", "What you gain and lose.", "scale"],
  ["KPI at risk", "What performance may suffer.", "bars"],
  ["Suggested owner + approval path", "Who fixes and who approves.", "users"],
  ["Recheck after fixes", "Validate before spend scales.", "refresh"]
];

const workflowSteps = [
  ["Bring the launch reality", "Upload your inputs from across the motion.", "doc"],
  ["Compare the full motion", "Cognix maps the story across every asset.", "network"],
  ["Show the fracture", "Gaps, conflicts, and evidence issues surface.", "target"],
  ["Recheck before spend scales", "Validate fixes before you scale the launch.", "check"]
];

const comparisonRows = [
  ["Understands your full launch", "One-off prompts", "Across the full motion"],
  ["Finds contradictions", "Not consistently", "Built to detect drift"],
  ["Shows what to do next", "You decide", "Clear actions and owners"],
  ["Before spend scales", "After it is live", "Before it becomes expensive"]
];

const messyInputs = [
  "Positioning",
  "ICP",
  "Campaign copy",
  "Sales narrative",
  "Proof",
  "Founder notes",
  "AI-generated variants",
  "Launch goals",
  "Budget or pipeline context"
];

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function iconSvg(name) {
  const icons = {
    bars: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V11"/><path d="M12 19V5"/><path d="M19 19V8"/><path d="M3 19h18"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14v10H8l-3 3V6Z"/><path d="M8 10h8"/><path d="M8 13h5"/></svg>`,
    check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`,
    doc: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v5h5"/><path d="M9 12h6"/><path d="M9 16h5"/></svg>`,
    network: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M11 7 6 16"/><path d="m13 7 5 9"/><path d="M7.5 18h9"/></svg>`,
    page: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/></svg>`,
    quote: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7H5v5h4v5H3v-7c0-2 1-3 3-3h3Z"/><path d="M21 7h-4v5h4v5h-6v-7c0-2 1-3 3-3h3Z"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 0 1-14 5"/><path d="M4 12a8 8 0 0 1 14-5"/><path d="M18 3v4h-4"/><path d="M6 21v-4h4"/></svg>`,
    scale: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18"/><path d="M5 7h14"/><path d="M7 7l-4 7h8L7 7Z"/><path d="m17 7-4 7h8l-4-7Z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></svg>`,
    slack: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v7"/><path d="M15 14v7"/><path d="M3 9h7"/><path d="M14 15h7"/><path d="M14 3h1a3 3 0 0 1 0 6h-1V3Z"/><path d="M10 21H9a3 3 0 0 1 0-6h1v6Z"/><path d="M3 10V9a3 3 0 0 1 6 0v1H3Z"/><path d="M21 14v1a3 3 0 0 1-6 0v-1h6Z"/></svg>`,
    spark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2 6 6 3-6 3-2 6-2-6-6-3 6-3 2-6Z"/><path d="m19 3 .8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8L19 3Z"/></svg>`,
    target: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v4"/><path d="M22 12h-4"/><path d="M12 22v-4"/><path d="M2 12h4"/></svg>`,
    user: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4-6 8-6s6.5 2 8 6"/></svg>`,
    users: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c1-4 3-6 6-6s5 2 6 6"/><path d="M14 15c3 0 5 1.7 6 5"/></svg>`
  };

  return (icons[name] || icons.doc).replace(
    "<svg ",
    '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9" '
  );
}

function nav() {
  return `
    <header class="site-header">
      <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand" href="index.html" aria-label="Cognix homepage">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>Cognix</span>
        </a>
        <div class="nav-links">
          <a href="#why-cognix">Why Cognix</a>
          <a href="#how-it-works">How it works</a>
          <a href="#sample-output">Sample output</a>
          <a href="#for-pmms">For PMMs</a>
        </div>
        <a class="btn btn-primary nav-cta" href="${reviewHref}">Bring a real launch</a>
      </nav>
    </header>`;
}

function heroVisual() {
  return `
    <div class="hero-visual hero-render-card" aria-label="Cognix Launch judgment visual">
      <img
        class="hero-render-image"
        src="assets/cognix-launch-judgment-render.png"
        alt="Launch inputs from Slack, ChatGPT / Claude, Salesforce, Gong, campaign copy, landing page, proof points, exec feedback, and launch goal flowing into Cognix Launch judgment."
      />
    </div>`;
}

function brandMark(name) {
  const marks = {
    "slack-mark": `
      <svg viewBox="0 0 32 32"><rect x="13" y="3" width="6" height="12" rx="3" fill="#36C5F0"/><rect x="13" y="17" width="6" height="12" rx="3" fill="#2EB67D"/><rect x="17" y="13" width="12" height="6" rx="3" fill="#ECB22E"/><rect x="3" y="13" width="12" height="6" rx="3" fill="#E01E5A"/><rect x="20" y="4" width="6" height="12" rx="3" transform="rotate(90 23 10)" fill="#2EB67D"/><rect x="6" y="16" width="6" height="12" rx="3" transform="rotate(90 9 22)" fill="#36C5F0"/></svg>`,
    "ai-mark": `
      <svg viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#13A37F"/><g fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7.2c3.2 0 4.7 2.1 4.7 4.1 2.8.8 4.1 2.6 3.4 5.2-.5 2-2.3 3.1-4.3 3.3-.8 2.6-2.5 4-5.1 3.6-2-.3-3.1-1.6-3.7-3.4-2.6-.7-4.1-2.5-3.5-5.1.4-2 1.8-3.2 3.7-3.7.8-2.5 2.3-4 4.8-4Z"/><path d="M11.4 11.2 16 14l4.5-2.6M11 20l.1-5.2 4.8-2.8M20.6 19.8 16 17l-4.6 2.8M20.8 11.7l-.1 5.1-4.8 2.9"/></g></svg>`,
    "crm-mark": `
      <svg viewBox="0 0 38 24"><path fill="#1F7BE0" d="M15.7 6.3A7 7 0 0 1 28 8.8a5.4 5.4 0 0 1 1.7 10.5H9.2A6.2 6.2 0 0 1 7.9 7.1a7 7 0 0 1 7.8-.8Z"/><text x="19" y="15.2" text-anchor="middle" fill="#fff" font-size="6.6" font-family="Arial, sans-serif" font-weight="700">sales</text></svg>`,
    "gong-mark": `
      <svg viewBox="0 0 32 32"><g fill="none" stroke="#7C3AED" stroke-width="3.2" stroke-linecap="round"><circle cx="16" cy="16" r="10"/><path d="M16 2v5M16 25v5M2 16h5M25 16h5M6.1 6.1l3.5 3.5M22.4 22.4l3.5 3.5M25.9 6.1l-3.5 3.5M9.6 22.4l-3.5 3.5"/></g></svg>`,
    "email-mark": `
      <svg viewBox="0 0 32 32"><rect x="4" y="8" width="24" height="16" rx="2" fill="none" stroke="#EC1A9B" stroke-width="2.5"/><path d="m5.5 10 10.5 8 10.5-8" fill="none" stroke="#EC1A9B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    "page-mark": `
      <svg viewBox="0 0 32 32"><rect x="7" y="6" width="18" height="20" rx="2" fill="none" stroke="#6D4DFF" stroke-width="2.4"/><path d="M10.5 11h11M10.5 15h7M10.5 19h10" stroke="#6D4DFF" stroke-width="2.2" stroke-linecap="round"/><path d="M20 20.5 23.5 17" stroke="#6D4DFF" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    "proof-mark": `
      <svg viewBox="0 0 32 32"><path d="M16 4 6.5 8v7.4c0 6.2 4 9.8 9.5 12.6 5.5-2.8 9.5-6.4 9.5-12.6V8L16 4Z" fill="none" stroke="#16A37B" stroke-width="2.6" stroke-linejoin="round"/><path d="m11.5 16 3 3 6-7" fill="none" stroke="#16A37B" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    "exec-mark": `
      <svg viewBox="0 0 32 32"><path d="M9 4h10l5 5v19H9V4Z" fill="none" stroke="#F59E0B" stroke-width="2.4" stroke-linejoin="round"/><path d="M19 4v6h6M12 15h10M12 20h10" stroke="#F59E0B" stroke-width="2.3" stroke-linecap="round"/></svg>`,
    "goal-mark": `
      <svg viewBox="0 0 32 32"><g fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"><circle cx="16" cy="16" r="10"/><circle cx="16" cy="16" r="5"/><path d="M23 9 28 4M24 4h4v4"/></g><circle cx="16" cy="16" r="2.2" fill="#2563EB"/></svg>`
  };

  return marks[name] || "";
}

function hero() {
  return `
    <section class="hero-section">
      <div class="hero-shell">
        <div class="hero-copy">
          <p class="eyebrow">Pre-beta launch protection for PMMs</p>
          <h1>AI did not solve launch alignment.<br><span>It accelerated the chaos.</span></h1>
          <p class="hero-subcopy">More AI. More content. More opinions.<br>The launch story still has to hold together, and no one is checking whether it does across the full GTM motion.</p>
          <p class="hero-detail">Cognix detects when positioning, ICP, campaign copy, sales narrative, proof, exec input, and AI-generated assets start contradicting each other before the market does.</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-large" href="${reviewHref}">Bring a real launch</a>
            <a class="btn btn-secondary btn-large" href="#sample-output">See sample output</a>
          </div>
          <p class="proof-note">Built from launch-alignment pain surfaced in a 54k-member PMM community.</p>
        </div>
        ${heroVisual()}
      </div>
    </section>`;
}

function quoteCard([quote, role], style = "plain") {
  return `
    <article class="quote-card ${style}">
      <div class="quote-icon" aria-hidden="true">${iconSvg("quote")}</div>
      <p>${esc(quote)}</p>
      <span>- ${esc(role)}</span>
    </article>`;
}

function pmmProofSection() {
  return `
    <section class="section proof-section" id="for-pmms">
      <div class="shell proof-market-layout">
        <div class="pmm-proof-panel">
          <div class="section-heading compact-left">
            <p class="section-kicker">For PMMs</p>
            <h2>PMMs are already saying it.</h2>
          </div>
          <div class="proof-grid pmm-grid">
            ${pmmProof.map((item) => quoteCard(item, "slack")).join("")}
          </div>
          <p class="section-footnote">From live PMM community conversations.</p>
        </div>
        <aside class="judgment-panel">
          <p>PMM market signal</p>
          <h2>AI compressed ramp.</h2>
          <h3>It did not replace craft, commercial instinct, or judgment.</h3>
          <span>That is the gap Cognix works inside.</span>
        </aside>
      </div>
    </section>`;
}

function hiddenProblemSection() {
  return `
    <section class="section hidden-problem-section" id="why-cognix">
      <div class="shell hidden-problem-panel">
        <div class="hidden-problem-copy">
          <p class="section-kicker">The hidden problem</p>
          <h2>AI made content horizontal.<br>Teams still review it vertically.</h2>
          <p>Every asset can be approved in its own lane.<br>But buyers experience one story across all of it.</p>
          <strong>That is where launch drift hides.</strong>
        </div>
        <div class="hidden-problem-visual" aria-label="Approved assets converge into one buyer story">
          <img
            src="assets/hidden-problem-approval-flow.png"
            alt="Positioning, campaign copy, sales decks, customer proof, and founder edits each get approved, but the buyer experiences one story."
          />
        </div>
      </div>
    </section>`;
}

function sampleFractureSection() {
  return `
    <section class="section sample-section" id="sample-output">
      <div class="shell">
        <div class="sample-card">
          <div class="sample-head">
            <p class="section-kicker">Sample output</p>
            <h2>This is your Launch Fracture Brief.</h2>
            <p>A decision-ready view of where your launch story breaks, why it matters, and what to fix before spend scales.</p>
          </div>
          <div class="sample-grid">
            ${sampleOutput.map(([label, body, badge, icon]) => {
              const content = body.includes("|")
                ? `<ul>${body.split("|").map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
                : `<p>${esc(body)}</p>`;
              return `
                <article class="sample-field ${label === "Decision" ? "decision-field" : ""}">
                  <span>${esc(label)}</span>
                  ${content}
                  ${badge ? `<b>${esc(badge)}</b>` : ""}
                  <i class="sample-icon" aria-hidden="true">${iconSvg(icon)}</i>
                </article>`;
            }).join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function whyCognixSection() {
  return `
    <section class="section why-section" id="why-it-matters">
      <div class="shell why-gives-layout">
        <div class="why-copy">
          <p class="section-kicker">Why it matters</p>
          <h2>By the time you find out, the spend is already gone.</h2>
          <ul class="clean-list">
            ${whyBullets.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
          <div class="time-visual" aria-hidden="true">
            <span></span>
            <i></i>
          </div>
        </div>
        <div class="gives-copy">
          <p class="section-kicker">What Cognix gives you</p>
          <div class="gives-grid">
            ${givesFlow.map(([item, body, icon]) => `
              <article class="give-card">
                <i class="icon-${esc(icon)}" aria-hidden="true">${iconSvg(icon)}</i>
                <span>${esc(item)}</span>
                <p>${esc(body)}</p>
              </article>`).join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function workflowSection() {
  return `
    <section class="section workflow-section" id="how-it-works">
      <div class="shell">
        <div class="section-heading">
          <p class="section-kicker">How it works</p>
          <h2>You bring the launch reality. Cognix finds where the story breaks.</h2>
        </div>
        <div class="workflow-grid">
          ${workflowSteps.map(([title, body, icon], index) => `
            <article class="workflow-card">
              <b>${index + 1}</b>
              <span class="icon-${esc(icon)}" aria-hidden="true">${iconSvg(icon)}</span>
              <h3>${esc(title)}</h3>
              <p>${esc(body)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function differentiationSection() {
  return `
    <section class="section differentiation-section">
      <div class="shell differentiation-layout">
        <div class="section-heading">
          <p class="section-kicker">Not another AI content tool</p>
          <h2>This is not another AI content tool.</h2>
          <p>We align the story. You lead the launch.</p>
        </div>
        <div class="comparison-table" role="table" aria-label="Prompt tools compared with Cognix">
          <div class="comparison-head" role="row">
            <span>What matters</span>
            <span>A prompt / AI tool</span>
            <span>Cognix</span>
          </div>
          ${comparisonRows.map(([matter, tool, cognix]) => `
            <div class="comparison-row" role="row">
              <span>${esc(matter)}</span>
              <span>${esc(tool)}</span>
              <span>${esc(cognix)}</span>
            </div>`).join("")}
        </div>
      </div>
    </section>`;
}

function finalCta() {
  return `
    <section class="final-cta">
      <div class="shell cta-panel">
        <div class="cta-copy">
          <p class="section-kicker">Not another AI content tool</p>
          <h2>This is not another AI content tool.</h2>
          <p>AI can generate more launch content. Cognix checks whether the full launch story still holds together across the buyer journey.</p>
        </div>
        <div class="cta-middle">
          <p>No polished deck required. Bring the messy launch reality.</p>
          <p>Cognix returns a Launch Fracture Brief showing where the story breaks and what to fix before spend scales.</p>
          <a class="btn btn-primary btn-large" href="${reviewHref}">Bring a real launch</a>
          <p class="privacy-note">Your inputs stay private. Always.</p>
          <p class="cta-reassurance">No sales pitch. Just a pressure test.</p>
        </div>
        <div class="cta-visual" aria-hidden="true">
          <div class="cta-brand-illustration">
            <span class="cta-orbit cta-orbit-wide"></span>
            <span class="cta-orbit cta-orbit-tight"></span>
            <span class="cta-orbit-dot cta-orbit-dot-one"></span>
            <span class="cta-orbit-dot cta-orbit-dot-two"></span>
            <div class="cta-platform cta-platform-back"></div>
            <div class="cta-platform cta-platform-front"></div>
            <div class="cta-mark-tile">
              <span class="brand-mark"></span>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function render() {
  document.querySelector("#app").innerHTML = `
    <div class="site-shell">
      ${nav()}
      <main>
        ${hero()}
        ${pmmProofSection()}
        ${hiddenProblemSection()}
        ${sampleFractureSection()}
        ${whyCognixSection()}
        ${workflowSection()}
        ${differentiationSection()}
        ${finalCta()}
      </main>
    </div>`;
}

render();
