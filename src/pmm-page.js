const auditHref = "https://tally.so/r/A7jVd0";

const signalNodes = [
  "ChatGPT drafts",
  "Claude reviews",
  "Gemini research",
  "Copilot notes",
  "Notion launch briefs",
  "Sales feedback",
  "Launch copy",
  "Customer proof",
  "Competitive pressure",
  "Buyer pain",
  "Campaign CTA",
  "Launch goal"
];

const interpretationNodes = [
  "Signal interpretation",
  "Fracture detection",
  "Demo intent risk",
  "Buyer urgency gap",
  "CTA mismatch",
  "Proof transmission gap",
  "Sales narrative variance",
  "Launch-to-pipeline risk",
  "PMM action path"
];

const decisionNodes = [
  "Risk verdict",
  "Dominant fracture",
  "Evidence trail",
  "PMM action plan",
  "Before and after direction",
  "Resource alignment memo",
  "Launch decision"
];

const signalsIn = [
  "Launch message or positioning draft",
  "ICP and target buyer definition",
  "Buyer pain statement",
  "Campaign copy and CTA",
  "Sales talk track or objection notes",
  "Call summaries or sales notes",
  "Competitive framing",
  "Customer proof or testimonials",
  "Generated GTM drafts and launch notes",
  "Planned launch goal"
];

const cognixOut = [
  "Launch-to-pipeline risk verdict",
  "Demo intent risk",
  "Dominant GTM fracture",
  "Evidence from your signals",
  "PMM action plan",
  "Instead of / Say this rewrite",
  "Strategic alignment & resource brief"
];

const evidenceBullets = [
  "CTA says \"Learn more,\" which creates curiosity but not a clear demo path.",
  "Sales says prospects understand the feature but are not asking for demos.",
  "Customer proof is missing from the launch page."
];

const memoEvidence = [
  "Launch message: \"Automate repetitive RevOps tasks with AI workflows.\"",
  "CTA: \"Learn more,\" which creates curiosity but not a direct demo path.",
  "Sales feedback: \"Prospects understand the feature but are not asking for demos.\"",
  "Customer proof: No quantified proof point is included on the page."
];

const memoFixes = [
  "Replace the automation-led headline with the buyer's pipeline review risk.",
  "Replace \"Learn more\" with a CTA that invites a pipeline or workflow diagnosis.",
  "Add one customer proof point tied to time saved, leakage found, or reporting speed.",
  "Give sales a short \"why now\" talk track for status quo objections."
];

const comparisonRows = [
  ["A prompt summarizes your inputs.", "Cognix interprets contradictions across them."],
  ["A prompt gives you what you asked for.", "Cognix surfaces what you did not know to ask."],
  ["A prompt generates more copy.", "Cognix identifies the fracture that could hurt launch conversion."],
  ["A prompt gives you text.", "Cognix gives you a risk verdict, evidence trail, PMM action plan, and leadership-ready memo."]
];

const audiences = [
  ["Solo and founding PMMs", "Pressure-test launches when you do not have a full team reviewing every signal."],
  ["PMM leaders", "Get a leadership-ready view of launch conversion risk before pipeline questions start."],
  ["Fractional PMMs", "Use Cognix as a structured audit layer for client launches and GTM recommendations."],
  ["Mid-market PMMs", "Bring clarity across product, sales, marketing, and leadership before the launch motion scales."]
];

const spineItems = [
  "Signals",
  "Interpretation",
  "Fracture detection",
  "KPI risk",
  "Evidence",
  "Action",
  "Leadership-ready artifact"
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
          <span>COGNIX</span>
        </a>
        <div class="nav-links">
          <a href="#sample">Sample output</a>
          <a href="#difference">Why Cognix</a>
          <a href="#architecture">Architecture</a>
        </div>
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

function auditMap({ large = false } = {}) {
  return `
    <section class="cognition-map ${large ? "large-map" : ""}" aria-label="Cognix launch conversion architecture">
      <div class="map-topline">
        <span>${large ? "Operating spine" : "Live audit preview"}</span>
        <strong>${large ? "From launch signals to decision artifact" : "Launch-to-pipeline risk"}</strong>
      </div>
      <div class="map-stage">
        <div class="map-zone signal-zone">
          <div class="zone-label">
            <span>Messy GTM signals</span>
            <small>Launch inputs</small>
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
            <span>Interpretation</span>
            <small>GTM cognition layer</small>
          </div>
          <div class="cognix-core">
            <b>Cognix</b>
            <strong>Fracture detection</strong>
            <p>Interprets launch signals against each other to find conversion risk before launch day.</p>
          </div>
          <div class="orbit-nodes">
            ${nodeList(interpretationNodes, "interpretation-node")}
          </div>
        </div>

        <div class="map-zone decision-zone">
          <div class="zone-label">
            <span>PMM action</span>
            <small>Leadership-ready artifact</small>
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
          <p class="eyebrow">Pre-launch coherence audit for product marketers</p>
          <h1>Protect your launch strategy before it gets diluted in market.</h1>
          <p class="hero-subcopy">Cognix compares your launch strategy against buyer-facing copy, sales talk tracks, proof, CTA, and commercial goals to detect where cross-functional drift may weaken qualified pipeline.</p>
          <p class="hero-support">Senior PMMs already have strategy. Cognix helps protect that strategy as it moves through execution surfaces: buyer-facing copy, sales narrative, proof placement, CTA, competitive framing, and campaign follow-up.</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-large" href="${auditHref}">Get your first audit free</a>
            <a class="btn btn-secondary btn-large" href="#sample">See sample output first</a>
          </div>
          <p class="price-support">Your first audit is free during validation. Selected PMMs may run additional audits while we collect feedback on where Cognix matches launch reality and where it needs more context.</p>
        </div>
        ${liveAuditPreview()}
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

function liveAuditPreview() {
  return `
    <section class="cognition-map audit-preview" aria-label="Live audit preview">
      <div class="map-topline">
        <span>Live audit preview</span>
        <strong>Launch-to-pipeline risk</strong>
      </div>
      <div class="audit-preview-head">
        <p>This is what a Cognix pre-launch coherence audit produces. Your version is built from your own launch signals.</p>
        <span class="risk-pill">Medium-high</span>
      </div>
      <div class="audit-card-grid">
        <article class="calm-card audit-card">
          <p class="card-label">Dominant fracture</p>
          <h3>Feature-heavy execution with buyer urgency dilution</h3>
        </article>
        <article class="calm-card audit-card">
          <p class="card-label">Evidence</p>
          <ul>
            ${evidenceBullets.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="calm-card audit-card">
          <p class="card-label">PMM action</p>
          <p>Replace the automation-led headline with the buyer's pipeline review risk, replace passive CTA with a demo-intent CTA, and add one proof point before campaign copy is locked.</p>
        </article>
      </div>
    </section>`;
}

function buyerMomentSection() {
  return `
    <section class="section complexity-section">
      <div class="shell">
        ${sectionIntro(
          "The buyer moment",
          "Your launch has signals everywhere. They are not talking to each other."
        )}
        <div class="narrative-block narrative-block-plain">
          <p>Product ships faster. Marketing drafts faster. Sales asks for enablement faster. AI agents generate launch copy, call summaries, sales notes, and market research faster.</p>
          <p>But faster output does not create shared understanding. It creates interpretation debt: too many AI-generated GTM outputs, not enough shared understanding of what they mean.</p>
          <p>You are launching soon, and something feels off. The launch page is almost ready. The AI-generated copy looks polished. The team says the launch is on track. But sales is asking how to explain it, the CTA is passive, customer proof is thin, and leadership still expects pipeline.</p>
          <h3>Will this launch create qualified demand, or just activity?</h3>
        </div>
      </div>
    </section>`;
}

function inputOutputSection() {
  return `
    <section class="section layers-section">
      <div class="shell">
        ${sectionIntro(
          "What you paste, what you get",
          "Paste your launch signals. Get a verdict.",
          "",
          "This is not a summary. It is a diagnostic read on whether your launch has enough shared context to create qualified demand."
        )}
        <div class="io-grid">
          ${listCard("Signals in", signalsIn)}
          ${listCard("Cognix out", cognixOut)}
        </div>
      </div>
    </section>`;
}

function listCard(title, items) {
  return `
    <article class="layer-card list-card">
      <div class="layer-copy">
        <h3>${esc(title)}</h3>
        <ul>
          ${items.map((item) => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </div>
    </article>`;
}

function sampleOutputSection() {
  return `
    <section class="section map-section" id="sample">
      <div class="shell">
        ${sectionIntro(
          "Sample output",
          "A resource alignment memo, not another generic summary.",
          "Example scenario: Meridian is launching an AI workflow assistant for RevOps teams in 11 days. The launch page is feature-heavy, sales is unsure how to create urgency, and the CTA is \"Learn more.\" The memo turns scattered launch signals into a leadership-ready read on risk, evidence, and what needs to change before the launch is judged in pipeline."
        )}
        <article class="memo-card">
          ${memoField("Subject", "Pre-launch conversion risk for Meridian AI workflow assistant")}
          <div class="memo-risk-row">
            <span class="risk-pill">Medium-high launch-to-pipeline risk</span>
          </div>
          ${memoField("Demo intent", "Awareness is likely. Demo intent is not yet supported.")}
          ${memoField("Why", "The launch explains what Meridian ships, but it does not make the buyer pain urgent enough for RevOps leaders to book time before launch day.")}
          ${memoField("Dominant fracture", "Feature-heavy execution with buyer urgency dilution and a passive conversion path.")}
          ${memoList("Evidence from launch signals", memoEvidence)}
          ${memoNumberedList("Recommended fixes before launch", memoFixes)}
          ${memoField("Decision needed", "Align on whether this launch is meant to create awareness or qualified demand before final campaign copy is approved.")}
        </article>
        <div class="before-after-grid">
          <article class="calm-card message-card">
            <p class="card-label">Before Cognix</p>
            <p>Meridian helps RevOps teams automate repetitive tasks and improve productivity with AI workflows.</p>
          </article>
          <article class="calm-card message-card featured-message">
            <p class="card-label">After Cognix</p>
            <p class="signal-note">Evidence from the signals: sales says prospects understand the product but are not asking for demos. That is why the rewrite moves from automation capability to buyer urgency and a clearer demo path.</p>
            <h3>Already behind on forecast confidence? Meridian helps RevOps teams find the manual workflow gaps that slow pipeline decisions. See where your process is leaking demand before the next pipeline review.</h3>
          </article>
        </div>
      </div>
    </section>`;
}

function memoField(label, body) {
  return `
    <div class="memo-field">
      <p class="card-label">${esc(label)}</p>
      <p>${esc(body)}</p>
    </div>`;
}

function memoList(label, items) {
  return `
    <div class="memo-field">
      <p class="card-label">${esc(label)}</p>
      <ul>
        ${items.map((item) => `<li>${esc(item)}</li>`).join("")}
      </ul>
    </div>`;
}

function memoNumberedList(label, items) {
  return `
    <div class="memo-field">
      <p class="card-label">${esc(label)}</p>
      <ol>
        ${items.map((item) => `<li>${esc(item)}</li>`).join("")}
      </ol>
    </div>`;
}

function differenceSection() {
  return `
    <section class="section first-run-section" id="difference">
      <div class="shell">
        ${sectionIntro(
          "Why not just a prompt?",
          "A prompt generates. Cognix diagnoses.",
          "Smart PMMs already use Claude and ChatGPT for messaging reviews. Cognix is different because it interprets your signals against each other, not individually."
        )}
        <div class="narrative-block compact narrative-block-plain">
          <p>A prompt cannot detect that your ICP describes one buyer while your CTA attracts another. It cannot cross-reference what sales is hearing against what your landing page says. Cognix interprets your signals against each other. That contradiction is what a prompt misses. That is the fracture that kills demo intent.</p>
          <p>Cognix is a diagnostic engine, not a guessing machine. If your launch inputs are too thin, Cognix will pause the audit and tell you what context is missing instead of producing confident AI noise.</p>
        </div>
        <div class="comparison-table">
          ${comparisonRows.map(([prompt, cognix]) => `
            <div class="comparison-row">
              <p>${esc(prompt)}</p>
              <p>${esc(cognix)}</p>
            </div>`).join("")}
        </div>
      </div>
    </section>`;
}

function audienceSection() {
  return `
    <section class="section audience-section">
      <div class="shell">
        ${sectionIntro(
          "Who it is for",
          "Built for PMMs who launch in uncertainty and report to leadership in certainty."
        )}
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

function architectureSection() {
  return `
    <section class="section layers-section" id="architecture">
      <div class="shell">
        ${sectionIntro(
          "The bigger architecture",
          "AI made GTM faster. Cognix makes it coherent.",
          "The pre-launch coherence audit is the first surface of the Cognix GTM cognition architecture. Today, that architecture helps PMMs detect strategy dilution before launch day. Over time, the same interpretation layer expands into narrative drift, sales adoption, competitive pressure, pipeline quality, and enablement mismatch."
        )}
        ${auditMap({ large: true })}
        <div class="spine-block">
          <p class="section-kicker">Operating spine</p>
          <div class="spine-grid">
            ${spineItems.map((item) => `<span>${esc(item)}</span>`).join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function finalCta() {
  return `
    <section class="final-cta">
      <div class="shell final-cta-card">
        <p class="section-kicker">Before launch day</p>
        <h2>You will not know what is wrong with this launch until the pipeline review. By then, it is too late.</h2>
        <p>Your first audit is free during validation. Run it before final campaign copy is locked and see whether your launch is built to create qualified demand or just awareness.</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-large" href="${auditHref}">Get your first audit free</a>
          <a class="btn btn-secondary btn-large" href="#sample">See sample output first</a>
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
        ${buyerMomentSection()}
        ${inputOutputSection()}
        ${sampleOutputSection()}
        ${differenceSection()}
        ${audienceSection()}
        ${architectureSection()}
        ${finalCta()}
      </main>
    </div>`;
}

render();
