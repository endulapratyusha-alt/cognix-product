const launchStages = [
  {
    id: "pre",
    title: "Pre-launch coherence audit",
    label: "Primary beta workflow",
    description: "Check whether launch strategy is being transmitted clearly across buyer-facing copy, proof, CTA, and sales narrative."
  },
  {
    id: "post",
    title: "Post-launch narrative drift check",
    label: "Secondary mode",
    description: "Find where buyer-facing execution drifted from the intended strategy after launch activity began."
  }
];

const previewMaps = [
  "Messaging fracture map",
  "Sales enablement fracture map",
  "Competitive fracture map",
  "Pipeline narrative fracture map"
];

const previewMessage = "This cognition map is being shaped with beta users. Start with the pre-launch coherence audit first.";

const coreLaunchSignalIds = [
  "launch-message",
  "target-buyer",
  "buyer-pain",
  "value-prop",
  "campaign-copy",
  "cta",
  "sales-talk-track",
  "objections",
  "competitive-framing",
  "customer-proof",
  "launch-goal"
];

const genericSignalResponses = new Set([
  "not sure",
  "unsure",
  "tbd",
  "to be determined",
  "none",
  "n/a",
  "na",
  "coming soon",
  "need to add",
  "waiting for input",
  "awaiting input",
  "no input",
  "no idea",
  "unknown",
  "placeholder"
]);

const previousAuditStorageKey = "cognix:last-completed-launch-audit";
const fallbackMessageDirection = "For PMMs launching in fast-moving GTM teams, Cognix helps protect launch strategy before it gets diluted across buyer-facing copy, CTA, proof, sales narrative, and commercial goals. Instead of letting execution surfaces drift, run the pre-launch coherence audit before spend goes live and get a Launch Predictability Score, evidence trail, PMM action plan, and strategic alignment brief.";

const bucketSets = {
  pre: [
    ["launch-message", "Launch message or positioning draft", "Paste the launch narrative, messaging framework, or positioning direction your team is planning to take to market.", ["launch", "release", "announce", "feature", "capability", "shipped", "positioning", "headline"]],
    ["target-buyer", "Target buyer or ICP", "Paste the buyer, segment, persona, company stage, trigger, or account profile this launch is meant to convert.", ["buyer", "icp", "persona", "segment", "role", "cmo", "vp", "pmm", "mid-market", "enterprise", "startup"]],
    ["buyer-pain", "Buyer pain", "Paste the pain your buyer actually feels before they care about this launch. Include urgency, business impact, or internal pressure if available.", ["pain", "problem", "manual", "slow", "risk", "cost", "waste", "miss", "confusion", "struggle", "broken"]],
    ["value-prop", "Value proposition", "Paste the clearest explanation of why this product matters now and what changes for the buyer.", ["value", "helps", "reduce", "increase", "improve", "accelerate", "outcome", "benefit", "roi", "impact"]],
    ["campaign-copy", "Landing page or campaign copy", "Paste the buyer-facing copy buyers will actually see.", ["campaign", "landing", "homepage", "hero", "email", "ad", "page", "copy", "click"]],
    ["cta", "CTA", "Paste the next action you are asking the buyer to take.", ["cta", "demo", "request", "book", "schedule", "contact", "learn more", "next step", "trial"]],
    ["sales-talk-track", "Sales talk track", "Paste the talk track, Slack notes, enablement copy, or field narrative sales is likely to use.", ["sales", "rep", "ae", "talk track", "discovery", "demo", "enablement", "script"]],
    ["objections", "Objection notes", "Paste known objections, sales pushback, buyer confusion, or competitive concerns.", ["objection", "already", "status quo", "budget", "pricing", "package", "packaging", "why now", "not urgent"]],
    ["competitive-framing", "Competitive framing", "Paste how you explain what this is, what it is not, and why it is different.", ["competitor", "competitive", "alternative", "versus", "vs", "unlike", "battlecard", "criteria"]],
    ["customer-proof", "Customer proof", "Paste customer quotes, beta feedback, quantified outcomes, design-partner proof, or note if proof is not available yet.", ["customer", "quote", "case study", "proof", "metric", "%", "result", "example", "saved", "reduced"]],
    ["launch-goal", "Planned launch goal", "Paste the launch KPI, demo goal, pipeline target, campaign budget, ACV, or conversion assumptions if available.", ["goal", "target", "demo requests", "qualified demand", "pipeline", "conversion", "launch-to-pipeline"]]
  ],
  post: [
    ["campaign-copy", "Launch page or campaign copy", "Hero copy, launch page, paid/social/email copy", ["campaign", "landing", "homepage", "hero", "email", "ad", "page", "copy"]],
    ["demo-result", "Demo request result", "Demo requests, form fills, demo conversion, qualified demand result", ["demo request", "demo requests", "form", "conversion", "qualified demand", "pipeline", "result"]],
    ["campaign-engagement", "Campaign engagement", "Clicks, traffic, opens, CTR, social engagement, launch activity", ["click", "traffic", "open", "ctr", "engagement", "activity", "views", "visits"]],
    ["landing-conversion", "Landing page conversion", "Page conversion, form starts, CTA clicks, drop-off notes", ["landing", "conversion", "form", "cta", "drop", "bounce", "learn more"]],
    ["sales-feedback", "Sales feedback", "Rep feedback, discovery notes, prospect reactions, field concerns", ["sales", "rep", "ae", "field", "prospect", "discovery", "urgency", "talk track"]],
    ["crm-notes", "CRM notes", "Opportunity notes, qualification comments, pipeline quality, source notes", ["crm", "opportunity", "qualified", "pipeline", "stage", "source", "deal"]],
    ["objections", "Objections", "Buyer pushback, status quo, timing, budget, pricing, packaging", ["objection", "already", "status quo", "budget", "pricing", "package", "why now", "not urgent"]],
    ["competitive-feedback", "Competitive feedback", "Competitor pressure, alternative framing, why-us gaps", ["competitor", "competitive", "alternative", "versus", "vs", "battlecard", "criteria"]],
    ["prospect-reactions", "Customer or prospect reactions", "Customer feedback, prospect replies, confusion, proof gaps", ["customer", "prospect", "reaction", "feedback", "confusion", "quote", "proof"]],
    ["pipeline-signal", "Early pipeline signal", "Pipeline quality, meeting quality, conversion trend, handoff signal", ["pipeline", "qualified", "meeting", "handoff", "sales accepted", "conversion", "lag"]]
  ]
};

const bucketDefinitions = Object.fromEntries(
  Object.entries(bucketSets).map(([mode, rows]) => [
    mode,
    rows.map(([id, title, description, keywords]) => ({ id, title, description, keywords }))
  ])
);

const launchKpis = [
  { label: "Demo intent", active: true },
  { label: "Demo requests", active: true },
  { label: "Launch-to-pipeline conversion", active: true },
  { label: "Qualified demand", active: false },
  { label: "Pipeline created", active: false },
  { label: "Launch-sourced revenue", active: false }
];

const loadingSteps = [
  "Reading launch strategy signals",
  "Checking buyer-facing dilution",
  "Inspecting the CTA conversion gap",
  "Comparing sales narrative and objections",
  "Building the resource alignment brief"
];

const state = {
  step: 0,
  launchMode: "pre",
  previewMap: "",
  selectedKpi: "Demo intent",
  targetGoal: "Pressure-test demo intent before launch day",
  signals: {},
  intakeDump: "",
  attachedFiles: [],
  sortMessage: "No launch signals sorted yet.",
  loadingIndex: 0,
  actionMessage: "",
  diagnosis: null,
  baselineModalOpen: false
};

const app = document.querySelector("#app");
const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function render() {
  app.innerHTML = `
    <div class="product-shell">
      <header class="topbar">
        <a class="brand" href="index.html" aria-label="Cognix home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>Cognix</span>
        </a>
        <div class="topbar-center">
          <span>Pre-launch coherence audit</span>
          <strong>Protect launch strategy before market dilution</strong>
        </div>
        <button class="ghost-button" type="button" data-action="reset">Start another check</button>
      </header>

      <main class="workspace">
        ${state.step < 4 ? progressRail() : ""}
        <section class="stage ${state.step === 4 ? "result-stage" : ""}">
          ${renderCurrentStep()}
        </section>
      </main>
      ${state.baselineModalOpen ? saveBaselineModal() : ""}
    </div>`;

  bindEvents();
}

function progressRail() {
  const labels = [
    "Pre-launch coherence audit, active",
    "Save launch baseline, alpha access",
    "Launch-week signal check, coming next",
    "Post-launch narrative drift check, coming next",
    "Connected signal monitoring, roadmap"
  ];
  return `
    <aside class="progress-rail" aria-label="Cognix product roadmap">
      ${labels.map((label, index) => `
        <button class="rail-step ${index === state.step ? "active" : ""} ${index < state.step ? "done" : ""}" type="button" data-jump="${index}" ${index > state.step ? "disabled" : ""}>
          <span>${index + 1}</span>
          <strong>${esc(label)}</strong>
        </button>`).join("")}
    </aside>`;
}

function renderCurrentStep() {
  if (state.step === 0) return stageScreen();
  if (state.step === 1) return addSignalsScreen();
  if (state.step === 2) return setKpiScreen();
  if (state.step === 3) return runFractureMapScreen();
  return resultScreen();
}

function stageScreen() {
  return `
    <div class="stage-header">
      <span class="eyebrow">Pre-launch coherence audit beta</span>
      <h1>Protect your launch strategy before it gets diluted in market.</h1>
      <p>Cognix compares your launch strategy against buyer-facing copy, sales talk tracks, proof, CTA, and commercial goals to detect where cross-functional drift may weaken qualified pipeline.</p>
    </div>
    <div class="option-grid stage-choice-grid">
      ${launchStages.map((item) => `
        <button class="option-card stage-option ${state.launchMode === item.id ? "selected" : ""}" type="button" data-stage="${esc(item.id)}">
          <span></span>
          <div class="option-meta">${esc(item.label)}</div>
          <h2>${esc(item.title)}</h2>
          <p>${esc(item.description)}</p>
        </button>`).join("")}
    </div>
    ${stageActions({ next: state.launchMode === "pre" ? "Start pre-launch coherence audit" : "Start narrative drift diagnosis" })}`;
}

function addSignalsScreen() {
  const buckets = activeBuckets();
  const attachedCount = state.attachedFiles.length;
  const sortedCount = meaningfulAreas().length;
  const pre = state.launchMode === "pre";
  return `
    <div class="stage-header">
      <span class="eyebrow">${pre ? "Pre-launch coherence audit" : "Post-launch narrative drift diagnosis"}</span>
      <h1>${pre ? "Where could strategy dilute before buyers see it?" : "Where did launch execution drift from strategy?"}</h1>
      <p>${pre ? "Paste the launch inputs you have before launch day. Cognix checks whether buyer-facing copy, proof, CTA, and sales narrative transmit the strategy clearly enough to create qualified demand." : "Paste performance, feedback, and conversion signals. Cognix checks where buyer-facing execution drifted from the intended launch strategy."}</p>
    </div>

    <div class="intake-console" data-drop-zone>
      <div class="drop-zone">
        <span>${pre ? "Open pre-launch intake" : "Open post-launch intake"}</span>
        <h2>Paste launch context or upload text files.</h2>
        <p>${pre ? "Cognix only uses pasted signals and uploaded text for now: launch strategy, buyer-facing copy, sales narrative, objections, proof, competitive framing, CTA, and commercial goals." : "Cognix only uses pasted signals and uploaded text for now: campaign performance, demo request results, sales feedback, objections, reactions, and pipeline signals."}</p>
        <div class="intake-actions">
          <label class="primary-button file-button" for="signal-files">Attach files</label>
          <button class="ghost-button" type="button" data-action="sort-signals">Sort launch signals</button>
          <button class="ghost-button" type="button" data-action="load-sample-signals">${pre ? "Load pre-launch sample" : "Load post-launch sample"}</button>
        </div>
        <input id="signal-files" class="file-input" type="file" multiple data-file-input />
      </div>

      <div class="intake-right">
        <label class="link-space">
          <span>Paste page copy</span>
          <textarea data-page-copy placeholder="Paste landing page, campaign, or launch page copy here. Cognix does not read links yet.">${esc(state.signals["campaign-copy"] || "")}</textarea>
          <small>For now, pasted text and uploaded text files are the only evidence sources used in the audit.</small>
        </label>
        <label class="dump-space">
          <span>Launch signal dump</span>
          <textarea data-intake-dump placeholder="${esc(pre ? "Paste launch message, ICP, buyer pain, CTA, sales talk track, objections, competitive framing, proof, and launch goal." : "Paste launch performance, demo request results, campaign engagement, sales feedback, CRM notes, objections, competitive feedback, reactions, and pipeline signals.")}">${esc(state.intakeDump)}</textarea>
        </label>
      </div>
    </div>

    <div class="intake-status">
      <span>${attachedCount} files attached</span>
      <span>${sortedCount} launch signal areas present</span>
      <strong>${esc(state.sortMessage)}</strong>
    </div>

    <div class="bucket-board launch-bucket-board">
      <div class="bucket-board-note">
        <strong>Cognix sorted your launch signals into these surfaces.</strong>
        <span>Add context where the strategy, buyer-facing copy, proof, CTA, or sales narrative may diverge.</span>
      </div>
      ${buckets.map((bucket) => bucketCard(bucket)).join("")}
    </div>
    ${previewMapsBlock()}
    ${stageActions({ back: "Back", next: "Confirm launch-to-pipeline KPI" })}`;
}

function bucketCard(bucket) {
  const content = state.signals[bucket.id] || "";
  const attached = state.attachedFiles.filter((file) => file.bucketId === bucket.id);
  const preview = content ? truncate(content, 170) : "Waiting for this launch signal.";

  return `
    <article class="bucket-card ${content || attached.length ? "filled" : ""}">
      <div class="bucket-head">
        <span>${esc(bucket.title)}</span>
        <strong>${attached.length + (content ? 1 : 0)}</strong>
      </div>
      <p>${esc(bucket.description)}</p>
      <div class="bucket-preview">${esc(preview)}</div>
      ${attached.length ? `
        <div class="attached-list">
          ${attached.map((file) => `<small>${esc(file.name)}</small>`).join("")}
        </div>` : ""}
      <textarea data-bucket="${esc(bucket.id)}" aria-label="${esc(bucket.title)} signal area">${esc(content)}</textarea>
    </article>`;
}

function previewMapsBlock() {
  return `
    <div class="preview-map-block">
      <div class="digest-section-head">
        <span>Future cognition maps</span>
        <strong>Preview only</strong>
      </div>
      <div class="preview-map-grid">
        ${previewMaps.map((title) => `
          <button class="preview-map-card" type="button" data-preview-map="${esc(title)}">
            <span>Preview</span>
            <strong>${esc(title)}</strong>
          </button>`).join("")}
      </div>
      ${state.previewMap ? `<div class="beta-note"><strong>${esc(state.previewMap)}</strong><p>${esc(previewMessage)}</p></div>` : ""}
    </div>`;
}

function setKpiScreen() {
  const pre = state.launchMode === "pre";
  return `
    <div class="stage-header compact">
      <span class="eyebrow">Business outcome</span>
      <h1>${pre ? "Pressure-test launch coherence before spend goes live." : "Diagnose the launch-to-pipeline narrative drift."}</h1>
      <p>The first measurable beta signal is demo intent. Cognix checks whether launch execution can preserve the strategy clearly enough to create qualified demand.</p>
    </div>
    <div class="kpi-layout">
      <div class="kpi-grid">
        ${launchKpis.map((kpi) => `
          <button class="kpi-pill ${kpi.label === state.selectedKpi ? "selected" : ""} ${kpi.active ? "" : "disabled"}" type="button" data-kpi="${esc(kpi.label)}" ${kpi.active ? "" : "disabled"}>
            <span>${esc(kpi.label)}</span>
            ${kpi.active ? "<small>Beta signal</small>" : "<small>Coming soon</small>"}
          </button>`).join("")}
      </div>
      <label class="goal-card">
        <span>${pre ? "Pre-launch goal" : "Post-launch result"}</span>
        <input type="text" data-goal value="${esc(state.targetGoal)}" placeholder="${esc(pre ? "Pressure-test demo intent before launch day" : "Understand why engagement did not become demo requests")}" />
        <small>${pre ? "Example: protect demo intent, preserve strategy across execution surfaces, reduce qualified pipeline risk." : "Example: high campaign engagement, low demo requests, buyer-facing dilution, limited qualified pipeline."}</small>
      </label>
    </div>
    ${stageActions({ back: "Back", next: pre ? "Run pre-launch coherence audit" : "Run narrative drift diagnosis" })}`;
}

function runFractureMapScreen() {
  const percent = Math.min((state.loadingIndex + 1) * 20, 100);
  return `
    <div class="analysis-shell">
      <div class="analysis-core">
        <div class="analysis-ring" aria-hidden="true">
          <span>${percent}%</span>
        </div>
        <div>
          <span class="eyebrow">Launch coherence analysis</span>
          <h1>Reading strategy against execution surfaces.</h1>
          <p>Cognix is checking buyer urgency, CTA conversion gap, proof transmission, sales narrative drift, objections, competitive framing, and qualified pipeline risk.</p>
        </div>
      </div>
      <div class="analysis-steps">
        ${loadingSteps.map((step, index) => `
          <div class="analysis-step ${index < state.loadingIndex ? "done" : ""} ${index === state.loadingIndex ? "active" : ""}">
            <span>${index + 1}</span>
            <strong>${esc(step)}</strong>
          </div>`).join("")}
      </div>
    </div>`;
}

function executiveDigest(diagnosis) {
  const pre = diagnosis.mode === "pre";
  const brief = buildExecutiveDecisionBrief(diagnosis);
  const fractureLabel = primaryFractureLabel(diagnosis);
  const commercialLabel = diagnosis.riskLabel === "Low" ? "Commercial readiness" : "Commercial risk";
  return `
    <section class="executive-digest decision-brief" aria-label="Executive decision brief">
      <div class="digest-topline">
        <span>Executive decision brief</span>
        <div>
          <b>Score</b>
          <strong>${diagnosis.predictabilityScore}%</strong>
        </div>
        <div>
          <b>Risk</b>
          <strong>${esc(diagnosis.verdict)}</strong>
        </div>
        <div>
          <b>Coverage</b>
          <strong>${esc(diagnosis.signalCoverage.label)}, ${diagnosis.coverage.count} of ${diagnosis.coverage.total}</strong>
        </div>
      </div>

      <div class="digest-hero">
        <div class="digest-fracture">
          <span>Launch readiness verdict</span>
          <h2>${esc(brief.readinessVerdict)}</h2>
          <p>${esc(brief.decisionLine)}</p>
        </div>
        <aside class="digest-score-card verdict-card">
          <span>Launch Predictability Score</span>
          ${scoreRingMarkup(diagnosis.predictabilityScore)}
        </aside>
      </div>

      <div class="decision-grid">
        <article>
          <span>${diagnosis.predictabilityScore >= 90 ? "Launch strength" : "Dominant fracture"}</span>
          <p>${esc(fractureLabel)}</p>
        </article>
        <article class="commercial-callout">
          <span>${commercialLabel}</span>
          <p>${esc(diagnosis.commercialImplication)}</p>
        </article>
        <article>
          <span>Primary action before launch</span>
          <p>${esc(brief.primaryAction)}</p>
        </article>
      </div>

      <p class="score-definition">Launch Predictability Score measures launch signal coherence for creating qualified demand. It is not a revenue forecast.</p>
    </section>`;
}

function scoreRingMarkup(score) {
  const value = Math.max(0, Math.min(100, Number(score) || 0));
  return `
    <div class="score-ring-wrap">
      <div class="digest-gauge score-ring" style="--risk-deg:${value * 3.6}deg" aria-label="Launch Predictability Score ${value}%">
        <span>${value}%</span>
      </div>
      <div>
        <strong>Launch Predictability Score</strong>
        <small>Launch signal coherence for qualified demand.</small>
      </div>
    </div>`;
}

function scoreMovementPanel(diagnosis) {
  const comparison = diagnosis.iterationComparison;
  if (!comparison?.hasPrevious) return "";
  return `
    <div class="belief-strip">
      <div class="digest-section-head">
        <span>Score movement</span>
        <strong>${esc(comparison.movementLabel)}</strong>
      </div>
      <div class="belief-grid evidence-grid">
        <article>
          <b>What improved</b>
          <ul>
            ${comparison.improved.length ? comparison.improved.map((item) => `<li>${esc(item)}</li>`).join("") : "<li>No resolved fractures detected yet.</li>"}
          </ul>
        </article>
        <article>
          <b>Still holding score back</b>
          <ul>
            ${comparison.holdingBack.length ? comparison.holdingBack.map((item) => `<li>${esc(item)}</li>`).join("") : "<li>No major blockers detected in this pass.</li>"}
          </ul>
        </article>
        <article>
          <b>New risks</b>
          <ul>
            ${comparison.newRisks.length ? comparison.newRisks.map((item) => `<li>${esc(item)}</li>`).join("") : "<li>No new fractures detected.</li>"}
          </ul>
        </article>
      </div>
    </div>`;
}

function buildExecutiveDecisionBrief(diagnosis) {
  return {
    readinessVerdict: launchReadinessVerdict(diagnosis),
    decisionLine: buildCmoDecisionLine(diagnosis),
    primaryAction: primaryActionBeforeLaunch(diagnosis)
  };
}

function launchReadinessVerdict(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) return "Approve for campaign testing with execution guardrails.";
  if (diagnosis.riskLabel === "High") return "Do not approve launch spend yet.";
  if (diagnosis.riskLabel === "Medium to high") return "Do not approve full campaign spend yet.";
  if (diagnosis.riskLabel === "Medium") return "Approve only after the alignment fix is made.";
  return "Approve for campaign testing.";
}

function buildCmoDecisionLine(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return "Approve campaign testing, but require PMM and Sales to preserve the same pain-led message, proof, CTA, and objection handling across every channel.";
  }
  if (diagnosis.has?.genericAiPositioning || diagnosis.has?.commercialStakesMissingFromPage || diagnosis.has?.proofBuriedMissingPublic || diagnosis.has?.genericDemoCtaForRisk) {
    return "Do not approve full campaign spend until a focused pre-launch alignment pass aligns buyer-facing copy, CTA, proof placement, sales talk track, and campaign follow-up around qualified pipeline risk.";
  }
  if (diagnosis.has?.buyerMessageMismatch) {
    return "Do not approve campaign spend until the public page speaks to the selected buyer's commercial priorities and buying criteria.";
  }
  if (diagnosis.has?.strongProofWeakConversionPath) {
    return "Change the CTA from passive education to a specific risk, audit, readout, or demo offer before scaling the campaign.";
  }
  if (diagnosis.has?.launchMotionActivityWeakConversion) {
    return "Hold spend until the launch has a pain-led conversion path that can turn attention into qualified demo intent.";
  }
  if (diagnosis.has?.proofMayWeakenLateStageConversion) {
    return "Approve a focused test only after quantified proof is placed close enough to the claim and CTA to support buyer belief.";
  }
  return "Approve a focused pre-launch alignment pass to align buyer-facing copy, CTA, proof placement, sales talk track, and campaign follow-up before spend goes live.";
}

function primaryActionBeforeLaunch(diagnosis) {
  return cleanActionItems(diagnosis.actions || diagnosis.recommendedFixes || [])[0] || "Tighten the launch message, proof, CTA, and sales follow-up before spend goes live.";
}

function primaryFractureLabel(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) return "No major fracture detected";
  return displayFractureTitle(diagnosis.dominantFractures?.[0]?.title || diagnosis.pattern || "Launch conversion risk");
}

function secondaryFractureLabels(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return diagnosis.secondaryFractures?.length
      ? diagnosis.secondaryFractures.map((item) => displayFractureTitle(item.title))
      : ["Execution consistency across landing page, outbound, webinar, and sales follow-up"];
  }
  const items = (diagnosis.secondaryFractures || []).map((item) => item.title).filter(isRealFractureTitle).map(displayFractureTitle);
  return items.length ? items : ["No additional fracture detected beyond the primary risk."];
}

function displayFractureTitle(title) {
  const map = {
    "Generic AI positioning weakens CMO-level demo intent": "Generic AI positioning weakens CMO-level demo intent",
    "Proof is strong but CTA and conversion path are weak": "Proof is strong but CTA and conversion path are weak",
    "Proof gap may weaken late-stage demo conversion": "Proof gap may weaken late-stage demo conversion",
    "Weak buyer pain": "Missing buyer urgency signal",
    "Weak sales conversion path": "Sales narrative drift",
    "Weak connection between launch activity and qualified pipeline": "Launch activity is not connected to qualified pipeline",
    "Weak demo intent": "Buyer interest is not converting into demo intent",
    "Feature-heavy message": "Feature-heavy execution dilutes buyer urgency",
    "AI-generated message inconsistency": "Cross-surface message inconsistency"
  };
  return map[title] || title;
}

function buildWhyNotHigher(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return ["The remaining risk is execution consistency across launch channels.", "Sales follow-up must preserve the same pain-led proof and CTA.", "Campaign learning should confirm the message holds outside the controlled launch inputs."];
  }
  const mapped = (diagnosis.allFractures || []).filter((item) => isRealFractureTitle(item.title)).slice(0, 3).map((item) => sentenceForScoreDrag(item.title));
  return unique(mapped).length ? unique(mapped) : ["The highest-risk drift point still reduces conversion readiness.", "The launch needs stronger evidence that attention will become qualified demand.", "The CTA, proof, or sales path still needs to carry more commercial urgency."];
}

function buildWhyNotLower(diagnosis) {
  const notes = [];
  if (!diagnosis.has?.unclearIcp) notes.push("The target buyer is clear.");
  if (diagnosis.has?.buyerPain && !diagnosis.has?.weakBuyerPain) notes.push("The buyer pain is present and specific enough to diagnose.");
  if (diagnosis.has?.quantifiedImpact || diagnosis.has?.quantifiedProof) notes.push("There is quantified impact or proof in the launch signals.");
  if (diagnosis.has?.strongCta && !diagnosis.has?.passiveCta) notes.push("The CTA gives buyers a more specific next step.");
  if (diagnosis.has?.salesSignal) notes.push("Sales or objection signals are present, so the fix can carry into follow-up.");
  if (diagnosis.has?.competitiveClarity) notes.push("Competitive framing gives the team a clearer why-us path.");
  if (diagnosis.coverage?.count >= 7) notes.push("Signal coverage is strong; the score reflects signal quality, not missing context.");
  return notes.slice(0, 4).length ? notes.slice(0, 4) : ["There is enough signal coverage to diagnose the launch reliably.", "Some core launch inputs are present, so the issue is fixable before spend goes live."];
}

function sentenceForScoreDrag(title) {
  const map = {
    "Generic AI positioning weakens CMO-level demo intent": "The buyer-facing headline still relies on category language instead of commercial stakes.",
    "CTA does not connect to launch budget risk": "The CTA does not connect to launch budget or pipeline risk.",
    "Commercial stakes are present internally but missing from public-facing message": "Commercial stakes are present internally but not visible enough in the page copy.",
    "Proof exists but is not placed early enough on the page": "Proof exists, but it is not placed close enough to the claim and CTA.",
    "Target buyer and message are misaligned": "The message does not speak to the selected buyer's commercial priorities.",
    "Proof is strong but CTA and conversion path are weak": "The proof is credible, but the CTA does not turn belief into the next buyer action.",
    "Proof gap may weaken late-stage demo conversion": "The launch needs more quantified proof to protect late-stage buyer confidence.",
    "Launch motion creates activity but not qualified demo intent": "The launch motion can create activity without a strong enough path to qualified demos.",
    "Passive CTA": "The CTA is still oriented toward education rather than qualified action.",
    "Weak buyer pain": "Buyer urgency needs more commercial signal.",
    "Unquantified buyer pain": "The buyer pain needs more concrete cost, time, pipeline, or decision risk."
  };
  return map[title] || `${formatFractureLabel(title)} still holds the score back.`;
}

function commercialPanelHeadline(diagnosis) {
  if (diagnosis.riskLabel === "Low") return "Budget risk is lower if execution stays consistent.";
  const amount = extractBudgetAmount(diagnosis.signals || []);
  return amount ? `${amount} launch investment signal detected` : "Commercial impact is not fully quantified yet";
}

function buildCommercialRiskMetrics(diagnosis) {
  const amount = extractBudgetAmount(diagnosis.signals || []);
  const demoDrop = extractDemoDrop(diagnosis.allText || "");
  const opportunityDrop = extractOpportunityDrop(diagnosis.allText || "");
  const commercialRange = extractCommercialRange(diagnosis.allText || "");
  if (amount || demoDrop || opportunityDrop || commercialRange) {
    return [
      { label: "Launch investment at risk", value: amount || "Not specified" },
      { label: "Demo shortfall", value: demoDrop || "Not quantified" },
      { label: "Opportunity shortfall", value: opportunityDrop || "Not quantified" },
      { label: "ARR or pipeline influence at risk", value: commercialRange || "Not quantified" },
      { label: "Why it matters to the CMO", value: "Spend should not scale until the message, proof, CTA, and sales follow-up can convert attention into qualified pipeline." }
    ];
  }
  return [
    { label: "Likely budget risk", value: diagnosis.riskLabel === "Low" ? "Lower, assuming execution stays consistent." : "Campaign spend may be used to discover a message that should be tightened before launch." },
    { label: "Likely pipeline risk", value: diagnosis.demoIntentRisk || "Qualified demo conversion may lag launch activity." },
    { label: "Data missing to quantify impact", value: "Add launch spend, target demo volume, demo-to-opportunity rate, ACV, and expected ARR influence." }
  ];
}

function buildMessageDirectionReason(diagnosis) {
  if (diagnosis.has?.strongProofWeakConversionPath) return "It uses credible proof as the bridge from interest to a specific buyer action.";
  if (diagnosis.has?.buyerMessageMismatch) return "It moves the story from generic productivity to the buyer's financial control and decision criteria.";
  if (diagnosis.has?.genericAiPositioning) return "It replaces category language with the commercial risk the buyer is trying to avoid.";
  if (diagnosis.has?.proofMayWeakenLateStageConversion || diagnosis.has?.proofBuriedMissingPublic) return "It places proof closer to the buyer pain and conversion ask so the claim feels more believable.";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return "It turns awareness-oriented copy into a path toward qualified demo intent.";
  return "It connects buyer pain, proof, CTA, and sales follow-up into one conversion story.";
}

function buildRecommendedLaunchRewrite(diagnosis) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || "This launch");
  const pain = stripTerminalPunctuation(cleanDirectionConcept(diagnosis.extractedConcepts?.buyerPain, "the buyer risk that makes action urgent"));
  const proof = bestProofLine(diagnosis);
  return {
    Headline: buildRewriteHeadline(diagnosis, product, pain),
    Subheadline: `${product} should make the cost of ${lowerDirectionConcept(pain, "the buyer problem")} concrete, then explain how the product helps the target buyer act before that risk becomes pipeline, revenue, budget, or operational damage.`,
    "Proof block": proof,
    CTA: buildRewriteCta(diagnosis),
    "Sales follow-up line": buildSalesFollowUpLine(diagnosis, product)
  };
}

function buildRewriteHeadline(diagnosis, product, pain) {
  if (diagnosis.has?.buyerMessageMismatch) return "Control the finance risk hidden inside cross-functional workflows.";
  if (diagnosis.has?.strongProofWeakConversionPath) return "Turn proven operational savings into a clearer next step.";
  if (diagnosis.has?.proofMayWeakenLateStageConversion) return "Find the account risk before it becomes revenue risk.";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return "Move from launch activity to qualified demo intent.";
  if (diagnosis.has?.genericAiPositioning) return "Know whether this launch will create qualified pipeline before spend scales.";
  return `${product}: make ${lowerDirectionConcept(pain, "the buyer risk")} impossible to ignore.`;
}

function bestProofLine(diagnosis) {
  const proofSignal = diagnosis.signals?.find((signal) => signal.id === "customer-proof")?.text || "";
  const cleaned = cleanConceptPhrase(proofSignal, 180);
  if (diagnosis.has?.quantifiedProof && cleaned) return cleaned;
  if (cleaned) return `${cleaned} Add the strongest quantified result next to the claim and CTA.`;
  return "Add the strongest customer metric, quote, or before-after result next to the primary claim and CTA.";
}

function buildRewriteCta(diagnosis) {
  if (diagnosis.has?.strongProofWeakConversionPath) return "Get the exception risk readout.";
  if (diagnosis.has?.buyerMessageMismatch) return "Assess finance workflow risk.";
  if (diagnosis.has?.proofMayWeakenLateStageConversion) return "Find hidden renewal risk.";
  if (diagnosis.has?.genericAiPositioning || diagnosis.has?.commercialStakesMissingFromPage) return "Pressure-test launch-to-pipeline risk.";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return "Get a qualified-demand readiness readout.";
  return "Request the risk readout.";
}

function buildSalesFollowUpLine(diagnosis, product) {
  if (diagnosis.has?.buyerMessageMismatch) return `${product} should be framed around the finance risk the CFO already owns: spend leakage, forecast accuracy, margin protection, and approval control.`;
  if (diagnosis.has?.strongProofWeakConversionPath) return "Lead with the proof, then ask whether the buyer wants to find the same risk or savings opportunity in their own workflow.";
  if (diagnosis.has?.proofMayWeakenLateStageConversion) return "Use the early proof carefully and ask which renewal or account-risk signal the buyer trusts most today.";
  return "Connect the buyer pain, the proof point, the business risk, and the CTA in one follow-up motion.";
}

function splitPmmActionPlan(diagnosis) {
  const actions = cleanActionItems(diagnosis.actions || []);
  return {
    fixBeforeLaunch: (actions.length ? actions : [primaryActionBeforeLaunch(diagnosis)]).slice(0, 3),
    monitorDuringLaunch: buildLaunchWeekIndicators(diagnosis),
    feedBackToSales: buildSalesFeedbackActions(diagnosis)
  };
}

function buildLaunchWeekIndicators(diagnosis) {
  const indicators = ["Qualified demo request quality by target buyer", "CTA click-to-demo conversion", "Sales-reported objection patterns"];
  if (diagnosis.has?.commercialStakesMissingFromPage || diagnosis.has?.genericAiPositioning) indicators.push("Paid campaign spend efficiency by message variant");
  if (diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification) indicators.push("Proof-related hesitation in demo conversations");
  return indicators.slice(0, 4);
}

function buildSalesFeedbackActions(diagnosis) {
  const actions = ["Give sales the revised pain-led narrative and primary proof point.", "Ask reps which objection appears before buyers agree to a next step."];
  if (diagnosis.has?.buyerMessageMismatch) actions.push("Have sales test whether the revised story matches the selected buyer's decision criteria.");
  else actions.push("Have sales report whether the CTA creates urgency or only education.");
  return actions;
}

function resultScreen() {
  const diagnosis = state.diagnosis || diagnoseLaunch();
  if (diagnosis.paused) return pausedResultScreen(diagnosis);
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  const actionPlan = splitPmmActionPlan(diagnosis);
  return `
    <div class="result-command">
      ${executiveDigest(diagnosis)}

      ${scoreMovementPanel(diagnosis)}

      <section class="decision-section why-score-section">
        <div class="digest-section-head">
          <span>Strategy-to-market coherence read</span>
          <strong>${diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch ? "Strategy-to-market coherence is strong" : "Execution-layer contradiction detected"}</strong>
        </div>
        <p>${esc(architecture.coherenceRead)}</p>
      </section>

      <section class="decision-section commercial-risk-panel">
        <div class="digest-section-head">
          <span>${esc(architecture.commercialPanel.label)}</span>
          <strong>${esc(architecture.commercialPanel.headline)}</strong>
        </div>
        <p>${esc(architecture.commercialPanel.body)}</p>
      </section>

      <section class="decision-section">
        <div class="digest-section-head">
          <span>Instead of / Say this</span>
          <strong>Buyer-facing rewrite</strong>
        </div>
        <div class="rewrite-grid">
          <article>
            <span>Instead of</span>
            <p>“${esc(architecture.rewritePanel.instead)}”</p>
          </article>
          <article>
            <span>Say this</span>
            <p>“${esc(architecture.rewritePanel.sayThis)}”</p>
          </article>
        </div>
        <article class="board-card">
          <span>Why it works</span>
          <p>${esc(architecture.rewritePanel.why)}</p>
        </article>
      </section>

      <section class="rewrite-section decision-section">
        <div class="digest-section-head">
          <span>Specific CTA fix</span>
          <strong>${architecture.ctaPanel.isStrong ? "CTA is carrying the buyer action" : "Replace passive next step"}</strong>
        </div>
        <div class="rewrite-grid">
          <article>
            <span>Instead of</span>
            <p>“${esc(architecture.ctaPanel.instead)}”</p>
          </article>
          <article>
            <span>Say this</span>
            <p>“${esc(architecture.ctaPanel.sayThis)}”</p>
          </article>
        </div>
        <article class="board-card">
          <span>Why it works</span>
          <p>${esc(architecture.ctaPanel.why)}</p>
        </article>
      </section>

      <section class="memo-section">
        <div class="digest-section-head">
          <span>Strategic alignment & resource brief</span>
          <strong>Copy, download, or forward</strong>
        </div>
        <textarea class="memo-copy-block" readonly data-memo-copy>${esc(architecture.resourceBrief)}</textarea>
        <div class="action-console memo-actions">
          <button type="button" data-action="copy-memo">Copy brief</button>
          <button type="button" data-action="download-pdf">Download audit PDF</button>
          <button type="button" data-action="save-baseline">Save launch baseline</button>
          <button type="button" data-action="reset">Start another audit</button>
        </div>
      </section>

      <section class="deep-grid action-plan-grid">
        <article class="board-card correction">
          <span>Fix before launch</span>
          <ol>${actionPlan.fixBeforeLaunch.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
        </article>
        <article class="board-card">
          <span>Monitor during launch week</span>
          <ol>${actionPlan.monitorDuringLaunch.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
        </article>
        <article class="board-card">
          <span>Feed back to sales</span>
          <ol>${actionPlan.feedBackToSales.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
        </article>
      </section>

      <section class="decision-section memory-summary-section">
        <div class="digest-section-head">
          <span>Memory-ready summary</span>
          <strong>Context for future launch planning</strong>
        </div>
        <ul>
          ${memoryReadySummary(diagnosis).map((item) => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </section>
      ${state.actionMessage ? `<div class="toast">${esc(state.actionMessage)}</div>` : ""}
    </div>`;
}

function saveBaselineModal() {
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="baseline-modal" role="dialog" aria-modal="true" aria-labelledby="baseline-title">
        <span class="eyebrow">Design Partner Lab</span>
        <h2 id="baseline-title">Save your launch baseline</h2>
        <p>You’ve completed your first Cognix diagnostic. To unlock saved launch baselines and launch-week drift checks during this alpha, join the Design Partner Lab.</p>
        <p>Your access is free during validation. In return, we ask for a 15-minute feedback session after your first audit so we can understand where Cognix matched your launch reality, where it missed context, and what follow-up signal checks would be most useful.</p>
        <div class="action-console memo-actions">
          <a class="primary-button" href="mailto:hello@cognix.ai?subject=Design%20Partner%20Lab%20access">Request design partner access</a>
          <button type="button" data-action="close-baseline">Continue without saving</button>
        </div>
      </section>
    </div>`;
}

function pausedResultScreen(diagnosis) {
  const sharedText = diagnosis.sharedAreas.length
    ? `You have shared: ${diagnosis.sharedAreas.map((item) => esc(item)).join(", ")}`
    : "No meaningful launch signals detected yet.";
  const inferText = diagnosis.coverage.count === 1
    ? "Cognix can read the signal you provided, but it does not yet have enough context to determine whether buyer-facing execution is carrying the PMM strategy or diluting it."
    : "Cognix can identify early launch context, but it still needs more signal to connect strategy, buyer pain, proof, CTA, and commercial risk safely.";
  return `
    <div class="result-command paused-command">
      <section class="paused-hero" aria-label="Audit paused">
        <div>
          <span class="status-badge">Initial signal read</span>
          <h1>Not enough launch signal to diagnose the contradiction yet.</h1>
          <p>${esc(inferText)}</p>
          <p>What Cognix cannot safely diagnose yet: buyer pressure, proof standard, CTA quality, conversion path, or whether the buyer-facing page is diluting the internal strategy.</p>
          <p>You have added ${diagnosis.coverage.count} of 3 required signals so far.</p>
        </div>
        <aside class="paused-status">
          <span>Signal coverage</span>
          <strong>${diagnosis.coverage.count} of 3 required signals complete</strong>
          <small>${diagnosis.coverage.count} of ${diagnosis.coverage.total} total launch signal areas detected</small>
        </aside>
      </section>

      <section class="deep-grid">
        <article class="board-card">
          <span>Signal coverage</span>
          <p>${sharedText}</p>
        </article>
        <article class="board-card correction">
          <span>What to add next</span>
          <p>Add buyer pain, target ICP, buyer-facing copy, CTA, sales feedback, proof, or launch goal to unlock the strategy-to-market coherence read.</p>
          <ol>
            ${diagnosis.nextSignals.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ol>
        </article>
      </section>

      <section class="locked-output-grid" aria-label="Locked outputs">
        ${diagnosis.lockedOutputs.map((item) => `
          <article class="locked-output-card">
            <span>${esc(item.title)}</span>
            <p>${esc(item.body)}</p>
          </article>`).join("")}
      </section>

      <section class="paused-action">
        <div class="action-console memo-actions">
          <button type="button" disabled>Download audit PDF</button>
          <button type="button" data-action="add-signals">Add more signals</button>
        </div>
        <p>Add more signals to unlock the audit PDF.</p>
      </section>
    </div>`;
}

function stageActions({ back, next }) {
  return `
    <div class="stage-actions">
      ${back ? `<button class="ghost-button" type="button" data-action="back">${esc(back)}</button>` : `<span></span>`}
      <button class="primary-button" type="button" data-action="next">${esc(next)}</button>
    </div>`;
}

function bindEvents() {
  document.querySelectorAll("[data-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      setLaunchMode(button.dataset.stage);
      render();
    });
  });

  document.querySelectorAll("[data-preview-map]").forEach((button) => {
    button.addEventListener("click", () => {
      state.previewMap = button.dataset.previewMap;
      render();
    });
  });

  document.querySelectorAll("[data-bucket]").forEach((input) => {
    input.addEventListener("input", () => {
      state.signals[input.dataset.bucket] = input.value;
      state.diagnosis = null;
    });
  });

  document.querySelector("[data-intake-dump]")?.addEventListener("input", (event) => {
    state.intakeDump = event.target.value;
  });

  document.querySelector("[data-page-copy]")?.addEventListener("input", (event) => {
    state.signals["campaign-copy"] = event.target.value;
    state.diagnosis = null;
  });

  document.querySelector("[data-file-input]")?.addEventListener("change", async (event) => {
    await ingestFiles(Array.from(event.target.files || []));
  });

  const dropZone = document.querySelector("[data-drop-zone]");
  dropZone?.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });
  dropZone?.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragging");
  });
  dropZone?.addEventListener("drop", async (event) => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
    await ingestFiles(Array.from(event.dataTransfer?.files || []));
  });

  document.querySelector("[data-action='sort-signals']")?.addEventListener("click", () => {
    sortIntake();
    state.diagnosis = null;
    render();
  });

  document.querySelector("[data-action='load-sample-signals']")?.addEventListener("click", () => {
    loadSampleDump();
    sortIntake();
    state.diagnosis = null;
    render();
  });

  document.querySelectorAll("[data-kpi]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      state.selectedKpi = button.dataset.kpi;
      state.diagnosis = null;
      render();
    });
  });

  document.querySelector("[data-goal]")?.addEventListener("input", (event) => {
    state.targetGoal = event.target.value;
  });

  document.querySelector("[data-action='next']")?.addEventListener("click", () => {
    if (state.step === 2) {
      startAnalysis();
      return;
    }
    state.step = Math.min(state.step + 1, 4);
    render();
  });

  document.querySelector("[data-action='back']")?.addEventListener("click", () => {
    state.step = Math.max(state.step - 1, 0);
    render();
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      state.step = Number(button.dataset.jump);
      render();
    });
  });

  document.querySelectorAll("[data-action='reset']").forEach((button) => {
    button.addEventListener("click", () => {
      setLaunchMode("pre");
      state.step = 0;
      state.baselineModalOpen = false;
      render();
    });
  });

  document.querySelector("[data-action='save-baseline']")?.addEventListener("click", () => {
    state.baselineModalOpen = true;
    render();
  });

  document.querySelector("[data-action='close-baseline']")?.addEventListener("click", () => {
    state.baselineModalOpen = false;
    render();
  });

  document.querySelector("[data-action='add-signals']")?.addEventListener("click", () => {
    state.step = 1;
    state.actionMessage = "";
    render();
  });

  document.querySelector("[data-action='copy-memo']")?.addEventListener("click", async () => {
    const memo = document.querySelector("[data-memo-copy]")?.value || "";
    try {
      await navigator.clipboard.writeText(memo);
      state.actionMessage = "Strategic alignment brief copied.";
    } catch (_error) {
      state.actionMessage = "Brief is ready to copy from the block.";
    }
    render();
  });

  document.querySelector("[data-action='download-pdf']")?.addEventListener("click", () => {
    const diagnosis = state.diagnosis || diagnoseLaunch();
    if (diagnosis.paused) {
      state.actionMessage = "Add more signals to unlock the audit PDF.";
      render();
      return;
    }
    downloadAuditPdf(diagnosis);
    state.actionMessage = "Audit PDF downloaded.";
    render();
  });

}

function setLaunchMode(mode) {
  state.launchMode = mode === "post" ? "post" : "pre";
  state.previewMap = "";
  state.selectedKpi = "Demo intent";
  state.targetGoal = state.launchMode === "pre"
    ? "Pressure-test demo intent before launch day"
    : "Understand why launch activity did not become demo requests";
  state.signals = {};
  state.intakeDump = "";
  state.attachedFiles = [];
  state.sortMessage = "No launch signals sorted yet.";
  state.loadingIndex = 0;
  state.actionMessage = "";
  state.diagnosis = null;
  state.baselineModalOpen = false;
}

function loadSampleDump() {
  state.intakeDump = state.launchMode === "pre" ? [
    "Launch message or positioning draft: We are launching Workflow Pulse, a new AI dashboard with automated alerts, flexible filters, and a redesigned activity timeline.",
    "Target buyer or ICP: The draft says RevOps leaders, sales managers, and operations teams, but it does not choose one primary buyer.",
    "Buyer pain: Teams lose time chasing handoffs, but the copy does not quantify the cost or explain why this matters before next quarter.",
    "Value proposition: The product helps teams see workflow signals in one place, but the business impact is not tied to pipeline, revenue, or qualified demand.",
    "Landing page or campaign copy: See every workflow signal in one place. Learn more about the new dashboard.",
    "CTA: Primary CTA is Learn more. The demo request button is lower on the page.",
    "Sales talk track: Sales is unsure how to explain why a prospect should book a demo now instead of waiting until the next planning cycle.",
    "Objection notes: Prospects may say they already track handoffs in spreadsheets and ask why this needs a new workflow now.",
    "Competitive framing: Competitor copy leads with missed revenue handoffs and stalled deals. Our copy leads with dashboard flexibility.",
    "Customer proof: One beta customer said the product helped catch stalled handoffs earlier, but the page does not include the quote or a metric.",
    "Planned launch goal: PMM goal is to drive demo requests from launch traffic and create qualified demand, not just awareness."
  ].join("\n\n") : [
    "Launch page or campaign copy: The page led with the new dashboard, automated alerts, and flexible filters. Primary CTA was Learn more.",
    "Demo request result: Demo requests were nearly flat after launch week and did not match the traffic spike.",
    "Campaign engagement: Email clicks and LinkedIn engagement were above benchmark, and launch page visits increased.",
    "Landing page conversion: CTA clicks were low. Visitors read the page but did not move to request a demo.",
    "Sales feedback: Reps said prospects understood the feature but did not feel urgency to book time.",
    "CRM notes: The few sourced meetings were early curiosity, not qualified demand or active pipeline.",
    "Objections: Prospects said they already manage handoffs in spreadsheets and asked why they should change now.",
    "Competitive feedback: Competitor framed the problem around missed revenue moments and stalled deals more sharply than our launch.",
    "Customer or prospect reactions: Prospects liked the concept but asked for proof that the problem is expensive enough to prioritize.",
    "Early pipeline signal: Launch activity looked healthy, but sales accepted pipeline did not increase."
  ].join("\n\n");
}

async function ingestFiles(files) {
  for (const file of files) {
    const text = await readFileAsText(file);
    const bucketId = inferBucket(`${file.name}\n${text}`);
    state.attachedFiles.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: file.name,
      bucketId,
      size: file.size,
      text: text || `${file.name} attached for interpretation.`
    });
    appendSignal(bucketId, `File: ${file.name}\n${text || "Attached file ready for launch review."}`);
  }
  state.sortMessage = `${files.length} file${files.length === 1 ? "" : "s"} attached and sorted into launch areas.`;
  state.diagnosis = null;
  render();
}

function readFileAsText(file) {
  return new Promise((resolve) => {
    if (!file || file.size > 2_000_000) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => resolve("");
    reader.readAsText(file);
  });
}

function sortIntake() {
  const chunks = state.intakeDump
    .split(/\n{2,}|(?=Launch message|Launch page|Target buyer|Buyer pain|Value proposition|Landing page|CTA:|Sales talk|Sales feedback|Demo request|Campaign engagement|Landing page conversion|CRM notes|Objection|Competitive|Customer|Prospect|Early pipeline|Planned launch goal)/i)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  chunks.forEach((chunk) => appendSignal(inferBucket(chunk), chunk));
  state.sortMessage = chunks.length
    ? `${chunks.length} pasted launch signal${chunks.length === 1 ? "" : "s"} sorted into launch areas.`
    : "No new pasted launch signals to sort yet.";
}

function inferBucket(text) {
  const lower = String(text || "").toLowerCase();
  const directLabels = activeBuckets().map((bucket) => [bucket.title.toLowerCase(), bucket.id]);
  const aliases = [
    ["positioning draft", "launch-message"],
    ["launch page", state.launchMode === "pre" ? "campaign-copy" : "campaign-copy"],
    ["demo request result", "demo-result"],
    ["campaign engagement", "campaign-engagement"],
    ["landing page conversion", "landing-conversion"],
    ["sales talk", "sales-talk-track"],
    ["planned launch goal", "launch-goal"],
    ["competitive feedback", "competitive-feedback"],
    ["competitive framing", "competitive-framing"],
    ["customer or prospect reactions", "prospect-reactions"],
    ["early pipeline", "pipeline-signal"]
  ];
  const direct = [...directLabels, ...aliases].find(([label]) => lower.startsWith(label) || lower.startsWith(`${label}:`));
  if (direct && activeBuckets().some((bucket) => bucket.id === direct[1])) return direct[1];

  const scored = activeBuckets().map((bucket) => ({
    id: bucket.id,
    score: bucket.keywords.reduce((total, keyword) => total + (lower.includes(keyword) ? 1 : 0), 0)
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].id : activeBuckets()[0].id;
}

function appendSignal(bucketId, text) {
  const current = state.signals[bucketId] || "";
  const normalized = text.trim();
  if (!normalized || current.includes(normalized)) return;
  state.signals[bucketId] = current ? `${current}\n\n${normalized}` : normalized;
}

function truncate(value, max) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const sliced = text.slice(0, max - 3).trim();
  const clean = sliced.replace(/\s+\S{1,18}$/, "").replace(/[,:;/-]+$/, "").trim();
  return `${clean || sliced}...`;
}

function startAnalysis() {
  state.step = 3;
  state.loadingIndex = 0;
  state.diagnosis = diagnoseLaunch();
  render();

  loadingSteps.forEach((_step, index) => {
    window.setTimeout(() => {
      state.loadingIndex = index;
      render();
    }, index * 420);
  });

  window.setTimeout(() => {
    state.step = 4;
    state.loadingIndex = loadingSteps.length;
    render();
  }, loadingSteps.length * 420 + 360);
}

function diagnoseLaunch() {
  const signals = collectMeaningfulSignals();
  const diagnostic = buildDiagnosticPass(signals);
  if (diagnostic.coverage.count < 3) return buildPausedDiagnosis(diagnostic.coverage);
  return synthesizeExecutiveResult(diagnostic);
}

function collectMeaningfulSignals() {
  return Object.entries(state.signals)
    .map(([id, value]) => ({
      id,
      title: activeBuckets().find((bucket) => bucket.id === id)?.title || "Launch signal",
      text: String(value || "").trim()
    }))
    .filter((signal) => isMeaningfulSignalText(signal.text) || isMeaningfulShortSignal(signal));
}

function isMeaningfulShortSignal(signal) {
  if (signal.id !== "cta") return false;
  const normalized = normalizeSignalText(signal.text);
  if (!normalized || genericSignalResponses.has(normalized)) return false;
  return normalized.length >= 4 && !/^(none|n\/a|na|tbd|unknown)$/i.test(normalized);
}

function buildDiagnosticPass(signals) {
  const allText = signals.map((signal) => signal.text).join("\n").toLowerCase();
  const has = buildSignalFlags(signals, allText);
  const extractedConcepts = extractDiagnosticConcepts(signals, has);
  const strategicMatrix = extractStrategicTranslationMatrix(signals, has, extractedConcepts);
  const coverage = buildCoverage(signals, has);
  const fractures = coverage.count < 3 ? [] : buildFractures(has, allText);
  const rankedFractures = prioritizeFractures(fractures, has);
  const diagnosticFindings = has.strongLaunch && (!rankedFractures.length || rankedFractures.every(isWatchoutFracture)) ? buildReadinessFindings(signals, has) : rankedFractures.length ? rankedFractures : [{
    title: "Limited launch signal coverage",
    body: "There is not enough launch evidence yet to isolate the launch-to-pipeline fracture.",
    action: "Add launch message, buyer pain, CTA, sales or objection signals, proof, and conversion signals before using this result with stakeholders.",
    evidence: firstAvailableEvidence(signals)
  }];
  const predictabilityScore = scorePredictability(diagnosticFindings, coverage, has);
  let riskLabel = riskLabelFromPredictability(predictabilityScore);
  if (has.launchMotionActivityWeakConversion && predictabilityScore <= 55) riskLabel = "High";
  if (has.buyerMessageMismatch && predictabilityScore <= 48) riskLabel = "High";
  const top = diagnosticFindings[0];
  const signalCoverage = computeSignalCoverage(coverage, has);
  const evidence = diagnosticFindings.flatMap((fracture) => fracture.evidence).filter(Boolean).slice(0, 4);
  const fallbackEvidence = cleanEvidenceItems(evidence.length ? evidence : firstAvailableEvidence(signals).slice(0, 4)).slice(0, 4);
  const actions = cleanActionItems(unique(diagnosticFindings.map((fracture) => fracture.action))).slice(0, has.strongLaunch ? 3 : 6);
  const pattern = diagnosticFindings.slice(0, 5).map((fracture) => fracture.title).join(", ");
  const pre = state.launchMode === "pre";
  const verdict = `${riskLabel} launch-to-pipeline risk`;
  const demoIntentRisk = buildDemoIntentRisk(riskLabel, top, has, pre);
  const implication = buildBusinessImplication(riskLabel, top, has, pre);

  return {
    mode: state.launchMode,
    signals,
    allText,
    has,
    coverage,
    signalCoverage,
    meaningfulAreas: coverage.presentTitles,
    predictabilityScore,
    riskScore: predictabilityScore,
    riskLevel: riskLabel,
    riskLabel,
    verdict,
    demoIntentRisk,
    dominantFractures: diagnosticFindings.slice(0, 1),
    secondaryFractures: diagnosticFindings.slice(1, 5),
    allFractures: diagnosticFindings,
    causalCenter: identifyCausalCenter(diagnosticFindings, has),
    evidenceSnippets: fallbackEvidence,
    businessImplication: implication,
    recommendedFixes: actions,
    pattern,
    extractedConcepts,
    strategicMatrix
  };
}

function synthesizeExecutiveResult(diagnostic) {
  const top = diagnostic.dominantFractures[0];
  const pre = diagnostic.mode === "pre";
  const beforeMessage = deriveBeforeMessage(diagnostic.signals);
  const causalDiagnosis = synthesizeWhy(diagnostic);
  const afterMessage = synthesizeMessageDirection(diagnostic);
  const commercialImplication = buildCommercialImplication(diagnostic);
  const iterationComparison = compareWithPreviousAudit(diagnostic);
  const memo = synthesizeCmoMemo(diagnostic, causalDiagnosis, afterMessage, commercialImplication);
  const outputArchitecture = buildStrategicOutputArchitecture(diagnostic);
  const nextMove = diagnostic.recommendedFixes[0] || "tighten the highest-risk launch fracture before launch day.";
  rememberCompletedAudit(diagnostic);

  return {
    mode: diagnostic.mode,
    signals: diagnostic.signals,
    allText: diagnostic.allText,
    has: diagnostic.has,
    riskScore: diagnostic.riskScore,
    predictabilityScore: diagnostic.predictabilityScore,
    riskLabel: diagnostic.riskLevel,
    signalCoverage: diagnostic.signalCoverage,
    coverage: diagnostic.coverage,
    evidence: diagnostic.evidenceSnippets,
    actions: diagnostic.recommendedFixes,
    pattern: diagnostic.pattern,
    dominantFractures: diagnostic.dominantFractures,
    secondaryFractures: diagnostic.secondaryFractures,
    allFractures: diagnostic.allFractures,
    extractedConcepts: diagnostic.extractedConcepts,
    strategicMatrix: diagnostic.strategicMatrix,
    outputArchitecture,
    scoreName: pre ? "Launch-to-pipeline risk" : "Performance gap",
    verdict: diagnostic.verdict,
    demoIntentRisk: diagnostic.demoIntentRisk,
    causalDiagnosis,
    buyerUrgency: diagnostic.has.buyerPain && diagnostic.has.urgency ? "Buyer pain and urgency are present, but they need to be tied tightly to the demo ask." : "Buyer urgency is not strong enough to make demo action feel necessary.",
    salesPath: diagnostic.has.salesSignal ? "Sales or objection signals are present, so the correction can connect launch narrative to field conversion." : "Sales conversion path is thin, so the launch cannot yet prove reps can convert interest into qualified demand.",
    implication: diagnostic.businessImplication,
    commercialImplication,
    beforeMessage,
    afterMessage,
    memo,
    iterationComparison,
    coreSentence: diagnostic.has.strongLaunch
      ? "Signals entered by the PMM show a launch conversion path with clear ICP, pain, proof, urgency, CTA, and sales support. Cognix recommends carrying this message through consistently and monitoring handoff execution."
      : `Signals entered by the PMM point to ${formatFractureLabel(top.title)} as the dominant launch-to-pipeline risk. The next move is to ${nextMove.toLowerCase()}`,
    kpiDrivers: [
      { title: "Buyer urgency", body: diagnostic.has.urgency ? "Some urgency signal is present." : "Urgency needs more strategic signal." },
      { title: "Demo intent", body: diagnostic.has.strongCta ? "The CTA supports demo intent." : "The CTA is passive or unclear." },
      { title: "Sales conversion path", body: diagnostic.has.salesSignal ? "Sales or objection signals can guide the fix." : "Sales conversion support is missing." },
      { title: "Qualified demand", body: diagnostic.has.qualifiedDemand ? "Qualified demand is referenced." : "Qualified demand is not clearly connected to the launch." }
    ]
  };
}

function identifyCausalCenter(fractures, has) {
  const top = fractures[0]?.title || "Limited launch signal coverage";
  if (has.passiveCta) return "conversion path";
  if (has.competitorOwnsPain) return "competitive positioning";
  if (top === "Missing customer proof" || has.proofGap) return "proof and trust";
  if (has.featureHeavy || top === "Feature-heavy message") return "message urgency";
  if (has.weakSalesPath) return "sales conversion path";
  if (top === "Weak buyer pain" || has.weakBuyerPain) return "buyer pain urgency";
  return "launch-to-pipeline conversion";
}

function extractDiagnosticConcepts(signals, has) {
  const buyerSignal = signals.find((signal) => signal.id === "target-buyer")?.text || "";
  const painSignal = signals.find((signal) => signal.id === "buyer-pain")?.text || "";
  const valueSignal = signals.find((signal) => signal.id === "value-prop")?.text || "";
  const messageSignal = signals.find((signal) => signal.id === "launch-message")?.text || "";
  const ctaSignal = signals.find((signal) => signal.id === "cta")?.text || "";
  const combined = signals.map((signal) => signal.text).join(" ");
  const isCognix = /cognix/i.test(combined);

  return {
    icp: isMeaningfulSignalText(buyerSignal) && !has.unclearIcp
      ? extractBuyerValue(buyerSignal, "PMMs launching in fast-moving GTM teams")
      : inferBuyerFromSignals(signals, has),
    buyerPain: isMeaningfulSignalText(painSignal)
      ? extractPainValue(painSignal, "fragmented launch signals without shared interpretation")
      : inferPainFromSignals(has),
    product: isCognix ? "Cognix" : bestProductName(valueSignal, messageSignal, signals.find((signal) => signal.id === "campaign-copy")?.text || "", combined),
    businessOutcome: isMeaningfulSignalText(valueSignal)
      ? extractOutcomeValue(valueSignal, "diagnose whether the launch will create qualified demand or just activity")
      : inferOutcomeFromSignals(has),
    mechanism: isCognix
      ? "interpreting launch signals across messaging, ICP, CTA, sales feedback, proof, and competitive pressure"
      : inferProductMechanism(signals, has),
    statusQuo: inferStatusQuoFromSignals(has),
    ctaAction: extractCtaAction(ctaSignal, has),
    launchAudited: cleanConceptPhrase(messageSignal, 90) || (isCognix ? "Cognix pre-launch coherence audit" : "the launch")
  };
}

function extractStrategicTranslationMatrix(signals, has, concepts) {
  const getSignal = (id) => signals.find((signal) => signal.id === id)?.text || "";
  const fromSignal = (id, value, fallback = "") => {
    const source = getSignal(id);
    const cleanValue = cleanConceptPhrase(value || source, 180);
    const sourcePhrase = cleanConceptPhrase(source, 220);
    return cleanValue ? { value: normalizeAcronyms(cleanValue), source_phrase: sourcePhrase || fallback || cleanValue } : null;
  };
  const campaign = getSignal("campaign-copy");
  const launchMessage = getSignal("launch-message");
  const buyerPain = getSignal("buyer-pain");
  const valueProp = getSignal("value-prop");
  const goal = getSignal("launch-goal");
  const proof = getSignal("customer-proof");
  const cta = getSignal("cta");
  const buyer = getSignal("target-buyer");
  const commercialText = [goal, buyerPain, valueProp, launchMessage].join(" ");
  const currentHeadline = extractHeadlinePhrase(campaign || launchMessage);
  const dilution = extractPublicDilutionPhrase(campaign || launchMessage);
  const commercialStake = extractCommercialStake(commercialText);
  const buyerPressure = extractBuyerPressure(buyerPain, goal, commercialStake);
  const internalInsight = extractInternalInsight(launchMessage, buyerPain, valueProp);
  const fieldRisk = inferFieldRisk(concepts.product, dilution || currentHeadline, internalInsight, buyerPressure, has);

  return {
    buyer: fromSignal("target-buyer", concepts.icp),
    buyer_pressure: buyerPressure ? { value: normalizeAcronyms(buyerPressure.value), source_phrase: buyerPressure.source_phrase } : null,
    internal_insight: internalInsight ? { value: normalizeAcronyms(internalInsight.value), source_phrase: internalInsight.source_phrase } : null,
    public_dilution: dilution ? { value: normalizeAcronyms(dilution.value), source_phrase: dilution.source_phrase } : null,
    field_risk: fieldRisk ? { value: normalizeAcronyms(fieldRisk), source_phrase: dilution?.source_phrase || currentHeadline?.source_phrase || "" } : null,
    proof_signal: fromSignal("customer-proof", proof),
    current_headline: currentHeadline ? { value: normalizeAcronyms(currentHeadline.value), source_phrase: currentHeadline.source_phrase } : null,
    current_cta: fromSignal("cta", cta),
    commercial_stake: commercialStake ? { value: normalizeAcronyms(commercialStake.value), source_phrase: commercialStake.source_phrase } : null
  };
}

function extractHeadlinePhrase(text) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  if (!value) return null;
  const labeled = value.match(/(?:headline|hero|h1|landing page|campaign copy)\s*:\s*["“]?([^"”\n.]{8,140})/i);
  const candidate = labeled?.[1] || value.split(/\n|(?<=[.!?])\s+/).find(Boolean) || value;
  const cleaned = cleanConceptPhrase(candidate.replace(/^["“]|["”]$/g, ""), 150);
  return cleaned ? { value: cleaned, source_phrase: cleaned } : null;
}

function extractPublicDilutionPhrase(text) {
  const value = String(text || "");
  const quoted = value.match(/["“]([^"”]{8,120})["”]/);
  const genericMatch = value.match(/\bAI-powered [^.,"”\n]{8,90}|\bmodern [^.,"”\n]{8,90}|\bunlock [^.,"”\n]{8,90}|\bintelligent automation[^.,"”\n]*/i);
  const candidate = genericMatch?.[0] || quoted?.[1] || extractHeadlinePhrase(value)?.value || "";
  const cleaned = cleanConceptPhrase(candidate, 130);
  return cleaned ? { value: cleaned, source_phrase: cleaned } : null;
}

function extractCommercialStake(text) {
  const pieces = unique([
    extractBudgetAmount([{ text }]),
    extractDemoTarget(text),
    extractCommercialRange(text)
  ]).filter(Boolean);
  if (!pieces.length) return null;
  return { value: pieces.join("; "), source_phrase: pieces.join("; ") };
}

function extractBuyerPressure(painText, goalText, commercialStake) {
  const pressureSource = [painText, goalText].map((item) => cleanConceptPhrase(item, 160)).filter(Boolean);
  const commercial = commercialStake?.value || "";
  const value = cleanConceptPhrase([pressureSource[0], commercial].filter(Boolean).join(" and "), 180);
  if (!value) return null;
  return { value, source_phrase: pressureSource.concat(commercial ? [commercial] : []).join("; ") };
}

function extractInternalInsight(launchMessage, buyerPain, valueProp) {
  const source = [launchMessage, buyerPain, valueProp].find((item) => isMeaningfulSignalText(item));
  const cleaned = cleanConceptPhrase(source, 180);
  return cleaned ? { value: cleaned, source_phrase: cleaned } : null;
}

function inferFieldRisk(product, dilution, internalInsight, buyerPressure, has) {
  const productName = normalizeAcronyms(product || "this launch");
  if (has.buyerMessageMismatch) return `Buyers may map ${productName} to generic productivity software instead of the commercial pressure they own.`;
  if (has.proofMayWeakenLateStageConversion) return `Buyers may understand the pain but hesitate later if proof does not support the claim.`;
  if (has.strongProofWeakConversionPath) return `Buyers may believe the proof but stop at education because the next action is not specific enough.`;
  if (dilution) return `Buyers may classify ${productName} by the phrase "${dilution}" instead of the business pressure behind the launch.`;
  if (internalInsight || buyerPressure) return `Sales and buyers may carry a thinner version of the strategy than the PMM workspace contains.`;
  return "";
}

function buildStrategicOutputArchitecture(diagnostic) {
  return {
    coherenceRead: buildStrategyToMarketCoherenceRead(diagnostic),
    commercialPanel: buildCommercialRiskPanel(diagnostic),
    rewritePanel: buildInsteadSayThisPanel(diagnostic),
    ctaPanel: buildSpecificCtaPanel(diagnostic),
    resourceBrief: buildStrategicAlignmentBrief(diagnostic)
  };
}

function matrixValue(diagnosis, key) {
  return diagnosis.strategicMatrix?.[key]?.value || "";
}

function buildStrategyToMarketCoherenceRead(diagnosis) {
  const matrix = diagnosis.strategicMatrix || {};
  const internalInsight = finishStrategicPhrase(matrix.internal_insight?.value);
  const buyerPressure = finishStrategicPhrase(matrix.buyer_pressure?.value);
  const dilution = matrix.public_dilution?.value || matrix.current_headline?.value;
  const productType = /dashboard/i.test(dilution || diagnosis.allText) ? "another standard tool, dashboard, or category lookalike" : "another standard tool or category lookalike";
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return "Cognix does not detect a major strategy-to-market mismatch. The PMM workspace, buyer-facing copy, proof, CTA, and sales narrative appear to carry the same core strategic thread. The primary watchout is execution consistency: keep the same buyer pain, proof, CTA, and objection handling visible across landing page, outbound, webinar, and sales follow-up.";
  }
  if (!internalInsight && !buyerPressure && !dilution) {
    return "Cognix does not yet detect enough strategic signal to confirm launch readiness. The current input does not clearly establish the buyer pressure, proof standard, CTA, or conversion path. Before spend goes live, the team should clarify the strategic baseline so downstream teams have something concrete to carry into market.";
  }
  const insightPhrase = finishStrategicPhrase(cleanDirectionConcept(internalInsight, "the buyer problem"));
  const pressurePhrase = finishStrategicPhrase(lowerDirectionConcept(buyerPressure, "the buyer pressure"));
  const foundation = internalInsight
    ? `The PMM workspace anchors a clear strategic insight regarding ${insightPhrase}${buyerPressure ? ` to address ${pressurePhrase}` : ""}.`
    : `The PMM workspace contains some strategic signal${buyerPressure ? ` around ${lowerDirectionConcept(buyerPressure, "the buyer pressure")}` : ""}, but the buyer-facing execution needs a clearer through-line.`;
  const dilutionLine = dilution
    ? `However, the buyer-facing copy under-indexes on this urgency by leading with "${dilution}".`
    : "However, the buyer-facing copy does not yet make that urgency visible enough for the selected buyer.";
  return `Cognix identified a strategic mismatch between your internal GTM strategy and your buyer-facing execution. ${foundation} ${dilutionLine} This execution gap makes it harder for the right buyer to understand why they should act now, shifting their attention from a core business problem to a generic software capability. This leaves the product vulnerable to being dismissed as ${productType}.`;
}

function buildCommercialRiskPanel(diagnosis) {
  const spend = extractBudgetAmount(diagnosis.signals || []);
  const demoTarget = extractDemoTarget(diagnosis.allText || "");
  const arrRisk = extractCommercialRange(diagnosis.allText || "");
  if (diagnosis.predictabilityScore >= 90 || diagnosis.riskLabel === "Low") {
    return {
      label: "Commercial readiness",
      headline: "Launch shows strong commercial readiness",
      body: "The launch shows strong commercial readiness. The buyer pain, proof, CTA, and sales narrative are carrying the same strategic thread, which lowers the risk of turning spend into low-quality activity."
    };
  }
  if (spend || demoTarget || arrRisk) {
    const spendClause = spend ? `leadership is deploying a ${spend} budget` : "leadership is deploying launch budget";
    const targetClause = demoTarget ? ` to secure a target of ${demoTarget}` : "";
    const arrClause = arrRisk ? `, putting ${arrRisk} in jeopardy before media spend goes live` : "";
    return {
      label: "Commercial risk",
      headline: [spend, demoTarget, arrRisk].filter(Boolean).join(" | ") || "Commercial stakes detected",
      body: `Because ${spendClause}${targetClause}, this execution-layer contradiction risks turning an intended pipeline motion into a superficial awareness campaign. If shipped as-is, qualified demo conversion may drop${arrClause}.`
    };
  }
  return {
    label: "Commercial risk",
    headline: "Commercial impact is not fully quantified yet",
    body: "This execution gap may not show up as a copy problem. It is more likely to show up as lower demo quality, weaker sales follow-up, unclear buyer urgency, or campaign activity that does not convert into qualified pipeline."
  };
}

function buildInsteadSayThisPanel(diagnosis) {
  const instead = matrixValue(diagnosis, "current_headline") || matrixValue(diagnosis, "public_dilution") || diagnosis.beforeMessage;
  const dilution = matrixValue(diagnosis, "public_dilution") || instead;
  const buyerPressure = finishStrategicPhrase(matrixValue(diagnosis, "buyer_pressure") || diagnosis.extractedConcepts?.buyerPain || "the buyer pressure");
  const sayThis = buildContextualRewriteHeadline(diagnosis);
  return {
    instead,
    sayThis,
    why: `This adjustment removes the generic "${dilution}" framing and anchors the launch story directly on ${finishStrategicPhrase(lowerDirectionConcept(buyerPressure, "the buyer pressure"))} before introducing product capabilities.`
  };
}

function buildContextualRewriteHeadline(diagnosis) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "This launch");
  const text = diagnosis.allText || "";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return `${product}: turn launch activity into qualified demo intent.`;
  if (/pipeline reviews?|numbers nobody trusts|forecast confidence|pipeline trust/i.test(text)) return `${product}: stop walking into pipeline reviews with numbers nobody trusts.`;
  if (/audit|SOC 2|compliance|evidence|control gaps/i.test(text)) return `${product}: find the evidence gaps that could delay audit readiness.`;
  if (/\binvoice\b|\binvoices\b|\bexception\b|\bexceptions\b|\bAP\b|\bbacklog\b/i.test(text)) return `${product}: find the invoice exceptions slowing down AP before they become backlog.`;
  if (/renewal|churn|adoption|customer risk/i.test(text)) return `${product}: find account risk before it turns into renewal risk.`;
  if (diagnosis.has?.buyerMessageMismatch || /spend leakage|approval control|margin protection/i.test(text)) return `${product}: find the spend leakage finance cannot afford to miss.`;
  if (/launch intelligence|launch story|campaign budget|CMO|qualified demos/i.test(text)) return `${product}: find the launch story that will break before your campaign budget goes live.`;
  const pressure = lowerDirectionConcept(matrixValue(diagnosis, "buyer_pressure") || diagnosis.extractedConcepts?.buyerPain, "the risk buyers need to resolve");
  return `${product}: make ${pressure} visible before buyers default to the status quo.`;
}

function buildSpecificCtaPanel(diagnosis) {
  const current = matrixValue(diagnosis, "current_cta") || "No primary CTA provided";
  const strong = diagnosis.has?.strongCta && !diagnosis.has?.genericDemoCtaForRisk && !diagnosis.has?.passiveCta;
  const updated = strong ? current : buildBuyerSpecificCta(diagnosis);
  return {
    isStrong: strong,
    instead: current,
    sayThis: updated,
    why: strong
      ? `The current CTA is specific enough to support a buyer action because it names a concrete next step instead of generic curiosity.`
      : "The current CTA asks for generic curiosity. The updated CTA replaces the passive step with a buyer-specific next action."
  };
}

function buildBuyerSpecificCta(diagnosis) {
  const text = diagnosis.allText || "";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return "Run a qualified-demo intent readout";
  if (/pipeline reviews?|pipeline trust|forecast confidence/i.test(text)) return "Pressure-test your next pipeline review";
  if (/\binvoice\b|\binvoices\b|\bexception\b|\bexceptions\b|\bAP\b|\bbacklog\b/i.test(text)) return "Find your invoice exception leakage";
  if (/spend leakage|approval|CFO|finance/i.test(text)) return "Assess spend leakage before another approval cycle";
  if (/audit|SOC 2|compliance|evidence/i.test(text)) return "Find the audit evidence gaps";
  if (/renewal|churn|adoption|customer risk/i.test(text)) return "Find hidden renewal risk";
  return "Run a launch-to-pipeline risk readout";
}

function buildStrategicAlignmentBrief(diagnosis) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "Audited launch");
  const buyerPressure = finishStrategicPhrase(matrixValue(diagnosis, "buyer_pressure") || "the buyer pressure this launch is meant to address");
  const internalInsight = finishStrategicPhrase(matrixValue(diagnosis, "internal_insight") || "the internal strategic insight");
  const dilution = matrixValue(diagnosis, "public_dilution") || matrixValue(diagnosis, "current_headline") || "the current buyer-facing message";
  const spend = extractBudgetAmount(diagnosis.signals || []);
  const arrRisk = extractCommercialRange(diagnosis.allText || "");
  const protectClause = spend || arrRisk
    ? `To protect ${[spend, arrRisk].filter(Boolean).join(" and ")}, recommend approving a focused pre-launch alignment pass to update the main hero hook, replace the passive CTA with a buyer-specific next step, and synchronize the field talk track before spend goes live.`
    : "Recommend approving a focused pre-launch alignment pass to update the main hero hook, replace the passive CTA with a buyer-specific next step, and synchronize the field talk track before spend goes live.";
  const strong = diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch;
  const foundation = diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch
    ? `The internal GTM workspace and buyer-facing execution are carrying a coherent strategic thread around ${finishStrategicPhrase(lowerDirectionConcept(buyerPressure, "the buyer pressure"))}.`
    : `The internal GTM workspace has anchored a credible strategic foundation targeting ${finishStrategicPhrase(lowerDirectionConcept(buyerPressure, "the buyer pressure"))}.`;
  const middleHeading = strong ? "The execution watchout:" : "The strategy mismatch:";
  const middleBody = strong
    ? `Our internal tracks and buyer-facing copy are aligned around ${finishStrategicPhrase(lowerDirectionConcept(internalInsight, "the strategic thread"))}. The primary watchout is consistency: keep the same buyer pain, proof, CTA, and objection handling visible across every execution surface so the launch does not get diluted downstream.`
    : `Our internal tracks are optimized around ${finishStrategicPhrase(lowerDirectionConcept(internalInsight, "the internal strategic insight"))}, but our current buyer-facing copy under-indexes on urgency by leading with "${dilution}". This makes it harder for the right buyer to understand why they should act now, putting demo quality and pipeline conversion targets at risk.`;
  const remediationBody = strong
    ? "Recommend preserving the current strategic thread across the main hero hook, CTA, proof placement, field talk track, and follow-up motion so cross-functional interpretation stays consistent as the launch moves into market."
    : protectClause;
  return [
    `Subject: Pre-launch cross-functional alignment window requested: ${product}`,
    "",
    "The coherence read:",
    `${foundation} The near-term conversion risk is not the PMM's positioning strategy; it is cross-functional dilution across buyer-facing execution surfaces.`,
    "",
    middleHeading,
    middleBody,
    "",
    "Remediation action:",
    remediationBody
  ].join("\n");
}

function synthesizeWhy(diagnostic) {
  const top = diagnostic.dominantFractures[0]?.title || "Limited launch signal coverage";
  const secondary = diagnostic.secondaryFractures[0]?.title;
  const concepts = diagnostic.extractedConcepts;
  const preface = diagnostic.mode === "pre" ? "before launch day" : "before the next conversion push";
  const secondaryClause = secondary ? ` ${sentenceForSecondaryFracture(secondary)}` : "";

  if (diagnostic.has.strongLaunch) {
    return "The launch has the core conversion conditions Cognix expects: a clear ICP, concrete pain, urgency, proof, a direct conversion path, and sales support. The remaining risk is execution consistency, not a major strategy correction. Keep the same pain-led message, proof, and CTA aligned across launch page, campaign, and sales follow-through.";
  }

  if (top === "Passive CTA") {
    return `The PMM workspace shows a credible strategic foundation, but the conversion path is too passive for launch-to-pipeline pressure.${secondaryClause} That matters because buyers may understand ${concepts.product} without seeing a clear reason to take a qualified next step. Protect the strategy by moving the ask from passive learning to a direct, pain-tied audit or demo action ${preface}.`;
  }

  if (top === "Competitive differentiation gap") {
    return `The launch is entering a market where the buyer pain can be framed by alternatives before ${concepts.product} owns it.${secondaryClause} That creates qualified pipeline risk because the page may create awareness while another frame shapes urgency and buying criteria. Protect the strategy by sharpening the why-us contrast around the business cost, the buyer trigger, and the reason to act ${preface}.`;
  }

  if (top === "Missing customer proof") {
    return `The launch asks buyers to believe an important claim before it gives them enough proof that the problem is costly or urgent.${secondaryClause} That creates a proof transmission gap between message clarity and demo intent. Add customer evidence, quantified pain, or a concrete proof point before asking the launch to convert into qualified demand.`;
  }

  if (top === "Public-facing message does not carry the internal strategy") {
    return `The team has the right strategic insight internally, but the buyer-facing page does not carry it.${secondaryClause} The landing page keeps the story at a generic category level instead of exposing the commercial pain, buyer urgency, proof, and differentiated CTA that exist in the planning inputs. That means the launch can look aligned in docs and still fail in market.`;
  }

  if (top === "Launch motion creates activity but not qualified demo intent") {
    return `The launch has enough channel motion to create attention, but the conversion path is not transmitting enough strategic signal to turn that attention into qualified demos.${secondaryClause} Buyer pain is broad, proof transmission is thin, and the CTA asks for learning instead of a committed next step. Protect spend by tightening the pain, proof, and demo-intent ask before putting more campaign budget behind the motion.`;
  }

  if (top === "Proof is strong but CTA and conversion path are weak") {
    return `The launch has credible proof and a clear buyer pain, but the CTA does not translate interest into the next buyer action.${secondaryClause} The evidence can create belief, but a passive education ask leaves buyers without a specific risk, audit, readout, or demo path. Turn the proof into a sharper conversion offer before scaling the campaign.`;
  }

  if (top === "Proof gap may weaken late-stage demo conversion") {
    return `The launch has a strong ICP, clear buyer pain, and a specific CTA, so it can create demo intent.${secondaryClause} The remaining risk is buyer belief: the proof is directionally useful but not yet quantified enough to carry late-stage confidence. Add concrete renewal, churn, expansion, or account-risk evidence before asking the CMO to scale the launch.`;
  }

  if (top === "Target buyer and message are misaligned") {
    return `Cognix detects buyer-facing dilution: the selected buyer is CFO, but the buyer-facing copy speaks to generic team productivity.${secondaryClause} The page does not connect TeamFlow AI to financial control, margin protection, forecast accuracy, spend leakage, or the operating metrics finance leaders are judged on. Rewrite the execution layer around the CFO's commercial risk before asking this motion to create qualified demos.`;
  }

  if (top === "Feature-heavy message") {
    return `The launch has a real product story, but the current buyer-facing message still leads with capability before making the buyer's operational risk urgent.${secondaryClause} The result is a CTA conversion gap: buyers can understand what changed without feeling enough pressure to request a demo or audit. Move the story from explanation to urgency by making the cost of the unresolved pain concrete ${preface}.`;
  }

  if (top === "Weak buyer pain" || top === "Unclear buyer urgency") {
    return `The launch points at a meaningful buyer problem, but Cognix does not yet detect enough strategic signal to confirm urgency.${secondaryClause} That matters because launch-to-pipeline conversion depends on urgency, not just comprehension. Make the cost of waiting more concrete and connect the pain directly to the primary CTA ${preface}.`;
  }

  if (top === "Weak sales conversion path") {
    return `The launch may create interest, but the sales narrative is not yet carrying the strategy clearly enough into qualified conversations.${secondaryClause} That matters because launch momentum leaks when reps cannot connect the buyer pain, why now, and the next step in one clear motion. Give sales a pain-to-demo talk track and a response to the why-now objection ${preface}.`;
  }

  return `Cognix detects ${formatFractureLabel(top)} as the main launch-to-pipeline risk.${secondaryClause} The issue is not whether the launch has activity; it is whether the execution surfaces transmit enough urgency, trust, and conversion clarity to move buyers from interest to a qualified next step. Protect launch momentum by addressing the highest-risk drift point before spend scales.`;
}

function sentenceForSecondaryFracture(title) {
  if (title === "Passive CTA") return "The CTA also needs to work harder as a conversion path, not just a learning path.";
  if (title === "Missing customer proof") return "Proof is also thin, which makes the claim harder to prioritize.";
  if (title === "Competitive differentiation gap") return "Competitive framing also needs to make the buying criteria sharper.";
  if (title === "Weak buyer pain" || title === "Unclear buyer urgency") return "Buyer urgency also needs to become more concrete.";
  if (title === "Weak sales conversion path") return "Sales also needs a clearer bridge from launch interest to a qualified conversation.";
  return `The secondary risk is ${formatFractureLabel(title)}.`;
}

function synthesizeMessageDirection(diagnostic) {
  const concepts = diagnostic.extractedConcepts;
  const icp = cleanDirectionConcept(concepts.icp, "PMMs launching in fast-moving AI-era GTM teams");
  const pain = lowerDirectionConcept(concepts.buyerPain, "scattered launch signals, AI-generated GTM output, and inconsistent interpretation across sales, marketing, product, and leadership");
  const product = concepts.product || "Cognix";
  const outcome = lowerDirectionConcept(removeLeadingProduct(concepts.businessOutcome, product), "diagnose whether a launch will create qualified demand or just activity");
  const mechanism = lowerDirectionConcept(removeLeadingProduct(concepts.mechanism, product), "interpreting launch signals across messaging, ICP, CTA, sales feedback, proof, and competitive pressure");
  const statusQuo = lowerDirectionConcept(concepts.statusQuo, "relying on another AI-generated draft");
  const cta = cleanDirectionConcept(concepts.ctaAction, "Run the pre-launch coherence audit before spend goes live");
  const candidate = `For ${icp} facing ${pain}, ${product} helps ${outcome} by ${mechanism}. Instead of ${statusQuo}, ${stripTerminalPunctuation(cta)}.`;

  if (!unsafeMessageDirection(candidate, diagnostic)) return normalizeAcronyms(candidate);
  return /cognix/i.test(product) ? fallbackMessageDirection : fallbackAuditedMessageDirection(diagnostic);
}

function fallbackAuditedMessageDirection(diagnostic) {
  const concepts = diagnostic.extractedConcepts;
  const product = normalizeAcronyms(stripTerminalPunctuation(String(concepts.product || "").trim())) || "This launch";
  const buyer = cleanDirectionConcept(concepts.icp, "the target buyer");
  const commercialFrame = diagnostic.has.genericAiPositioning || diagnostic.has.buyerMessageMismatch || /cmo/i.test(buyer)
    ? "the commercial risk behind the launch"
    : "the buyer problem behind the launch";
  return normalizeAcronyms(`${product} should lead with ${commercialFrame}: why the current workflow threatens qualified pipeline, demo conversion, budget efficiency, or launch ROI. The page should make that risk concrete, place proof next to the claim, and turn the CTA into a risk-based next step instead of a generic product demo.`);
}

function cleanDirectionConcept(value, fallback) {
  const cleaned = cleanConceptPhrase(value, 120)
    .replace(/^(Primary buyer|Buyer pain|Value proposition|Launch message|Target buyer|ICP)\s*:\s*/i, "")
    .replace(/\bpMMs\b/g, "PMMs")
    .replace(/\bcognix\b/g, "Cognix")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned && !looksLikeRawDump(cleaned) ? stripTerminalPunctuation(cleaned) : fallback;
}

function lowerDirectionConcept(value, fallback) {
  const cleaned = cleanDirectionConcept(value, fallback);
  if (/^(PMMs|ICP|CTA|GTM|AI)\b/.test(cleaned)) return cleaned;
  return normalizeAcronyms(cleaned.charAt(0).toLowerCase() + cleaned.slice(1));
}

function removeLeadingProduct(value, product) {
  const productPattern = new RegExp(`^${escapeRegExp(product)}\\s+(helps?|interprets?|diagnoses?)\\s+`, "i");
  return String(value || "").replace(productPattern, (match) => match.toLowerCase().includes("helps") ? "" : "");
}

function unsafeMessageDirection(message, diagnostic) {
  const lower = String(message || "").toLowerCase();
  const buyerPainSegment = extractFacingSegment(message);
  const unsafePatterns = [
    /primary buyer\s*:/i,
    /buyer pain\s*:/i,
    /value proposition\s*:/i,
    /launch message\s*:/i,
    /for senior PMMs facing AI tools help/i,
    /facing AI tools help/i,
    /facing PMMs are not/i,
    /facing pMMs/i,
    /Cognix helps launch signals/i,
    /helps launch signals against/i,
    /helps [^.]*against each other/i,
    /but teams,/i,
    /\bpMMs\b/,
    /cognix helps cognix/i,
    /helps cognix interprets/i,
    /helps cognix diagnose/i,
    /claude,\s*g\b/i,
    /\bundefined\b/i,
    /\bawaiting input\b/i,
    /\bcMOs\b/
  ];
  if (unsafePatterns.some((pattern) => pattern.test(message))) return true;
  if (/Cognix helps (?!diagnose|identify|interpret|pressure-test|find|PMMs find)\b/i.test(message)) return true;
  if (buyerPainSegment && buyerPainSegment.split(/\s+/).filter(Boolean).length > 18) return true;
  if (buyerPainSegment && /[.!?]|,/.test(buyerPainSegment)) return true;
  if (/cognix[^.]{0,40}cognix/i.test(message)) return true;
  if (message.split(/[.!?]\s+/).some((sentence) => looksLikeRawDump(sentence))) return true;
  return hasLongRawOverlap(message, diagnostic.signals, 25) || lower.includes("helps  by");
}

function extractFacingSegment(message) {
  const match = String(message || "").match(/\bfacing\s+(.+?),\s+(?:Cognix|[A-Z][A-Za-z0-9.-]*(?:\s+AI)?)\s+helps\b/i);
  return match?.[1]?.trim() || "";
}

function hasLongRawOverlap(message, signals, maxWords) {
  const target = normalizeOverlapText(message);
  if (!target) return false;
  return signals.some((signal) => {
    const words = normalizeOverlapText(signal.text).split(" ").filter(Boolean);
    if (words.length < maxWords) return false;
    for (let index = 0; index <= words.length - maxWords; index += 1) {
      if (target.includes(words.slice(index, index + maxWords).join(" "))) return true;
    }
    return false;
  });
}

function synthesizeCmoMemo(diagnostic, causalDiagnosis, messageDirection, commercialImplication) {
  const usefulEvidence = cleanEvidenceItems(diagnostic.evidenceSnippets).filter((item) => item.snippet && item.snippet.length > 8).slice(0, 3);
  const evidenceLines = usefulEvidence.length
    ? usefulEvidence.map((item) => `- ${outputEvidenceSource(item.source)}: "${item.snippet}"`).join("\n")
    : "- Evidence is still limited; add more launch signals before treating this as a final leadership read.";
  const cleanedFixes = cleanActionItems(diagnostic.recommendedFixes);
  const actionLines = cleanedFixes.length
    ? cleanedFixes.slice(0, 4).map((item) => `- ${item}`).join("\n")
    : "- Tighten the launch message, proof, CTA, and sales conversion path before launch review.";
  const dominant = primaryFractureLabel(diagnostic);
  const decision = buildCmoDecisionLine(diagnostic);
  const rewrite = buildRecommendedLaunchRewrite(diagnostic);
  const whyHigher = buildWhyNotHigher(diagnostic).map((item) => `- ${item}`).join("\n");
  const whyLower = buildWhyNotLower(diagnostic).map((item) => `- ${item}`).join("\n");
  const indicators = buildLaunchWeekIndicators(diagnostic).map((item) => `- ${item}`).join("\n");
  const commercialMetrics = buildCommercialRiskMetrics(diagnostic).map((item) => `- ${item.label}: ${item.value}`).join("\n");
  const foundationLine = diagnostic.riskLevel === "Low"
    ? "The PMM workspace shows a coherent strategic foundation. The main leadership job is to protect execution consistency as the launch moves through campaign, sales, and follow-up surfaces."
    : "The PMM workspace shows a credible strategic foundation where signal exists. The risk is that downstream execution surfaces are not transmitting that strategy clearly enough before spend goes live.";

  return [
    `Subject: ${launchReadinessVerdict(diagnostic)}`,
    `Launch readiness verdict: ${launchReadinessVerdict(diagnostic)}`,
    "",
    "1. Executive summary",
    `${foundationLine} Cognix reads this launch at ${diagnostic.predictabilityScore}% Launch Predictability, with a ${diagnostic.verdict}. The score measures launch signal coherence for qualified demand; it is not a revenue forecast. The executive question is whether the launch will create qualified pipeline, not just awareness. Decision line: ${decision}`,
    "",
    "2. Commercial risk",
    `${commercialImplication}\n${commercialMetrics}`,
    "",
    "3. Why the score is not higher",
    whyHigher,
    "",
    "4. Why the score is not lower",
    whyLower,
    "",
    "5. What must change before spend goes live",
    `Primary drift point: ${dominant}\n${causalDiagnosis}\n\nRecommended message direction: ${messageDirection}\n\nRecommended launch rewrite:\n- Headline: ${rewrite.Headline}\n- Subheadline: ${rewrite.Subheadline}\n- Proof block: ${rewrite["Proof block"]}\n- CTA: ${rewrite.CTA}\n- Sales follow-up line: ${rewrite["Sales follow-up line"]}\n\nPMM and Sales actions:\n${actionLines}`,
    "",
    "6. Launch-week indicators to monitor",
    indicators,
    "",
    "Evidence from launch signals:",
    evidenceLines,
    "",
    "7. Final decision recommendation",
    `${decision} ${diagnostic.businessImplication}`
  ].join("\n");
}

function memoryReadySummary(diagnosis) {
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  return [
    `Launch audited: ${detectAuditedLaunch(diagnosis)}`,
    `Strategy-to-market read: ${diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch ? "No major fracture detected; execution consistency is the primary watchout." : architecture.coherenceRead}`,
    `Commercial implication: ${architecture.commercialPanel.body}`,
    `Buyer-facing rewrite: ${architecture.rewritePanel.sayThis}`,
    `CTA action: ${architecture.ctaPanel.sayThis}`
  ];
}

function compareWithPreviousAudit(diagnostic) {
  const previous = readPreviousAudit();
  if (!previous) {
    return {
      hasPrevious: false,
      movementLabel: "First completed audit in this session",
      improved: [],
      holdingBack: [],
      newRisks: []
    };
  }

  const currentFractures = diagnostic.allFractures.map((fracture) => fracture.title).filter(isRealFractureTitle);
  const previousFractures = (previous.fractures || []).filter(isRealFractureTitle);
  const resolved = previousFractures.filter((title) => !currentFractures.includes(title));
  const remaining = currentFractures.filter((title) => previousFractures.includes(title));
  const newRisks = currentFractures.filter((title) => !previousFractures.includes(title));
  const delta = diagnostic.predictabilityScore - Number(previous.predictabilityScore || 0);

  return {
    hasPrevious: true,
    previousScore: previous.predictabilityScore,
    currentScore: diagnostic.predictabilityScore,
    delta,
    movementLabel: scoreMovementLabel(delta),
    improved: buildImprovementNotes(resolved, diagnostic),
    holdingBack: buildHoldingBackNotes(remaining, diagnostic),
    newRisks: newRisks.map((title) => `${title} appeared as a new risk.`).slice(0, 3)
  };
}

function isRealFractureTitle(title) {
  return !/^No major fracture detected$/i.test(title || "") && !/^Primary watchout:/i.test(title || "");
}

function scoreMovementLabel(delta) {
  if (Math.abs(delta) < 2) return "No meaningful score change";
  return `${delta > 0 ? "+" : ""}${delta} points since previous audit`;
}

function buildImprovementNotes(resolved, diagnostic) {
  const notes = resolved.map((title) => `${title} appears resolved in this audit.`);
  if (diagnostic.has.strongCta && !diagnostic.has.passiveCta) notes.push("CTA now supports a clearer demo-intent or audit request.");
  if (diagnostic.has.buyerPain && !diagnostic.has.weakBuyerPain) notes.push("Buyer pain is more urgent.");
  if (diagnostic.has.competitiveClarity && diagnostic.has.competitive) notes.push("Competitive differentiation is stronger.");
  if (diagnostic.has.proof && !diagnostic.has.proofGap) notes.push("Proof or validation signal improved.");
  if (diagnostic.predictabilityScore >= 60) notes.push("Demo-intent framing is stronger.");
  return unique(notes).slice(0, 4);
}

function buildHoldingBackNotes(remaining, diagnostic) {
  const notes = remaining.map((title) => `${title} is still holding back launch signal coherence.`);
  if (!diagnostic.has.proof || diagnostic.has.proofGap) notes.push("Proof is still early or qualitative.");
  if (diagnostic.has.proof && !diagnostic.has.quantifiedProof) notes.push("More quantified customer evidence would improve predictability.");
  if (diagnostic.has.objections) notes.push("Objections are visible but not fully addressed.");
  if (!diagnostic.has.strongCta || diagnostic.has.passiveCta) notes.push("The CTA still needs a stronger conversion path.");
  if (diagnostic.has.weakBuyerPain || !diagnostic.has.urgency) notes.push("Buyer urgency could be tied more directly to pipeline, cost, time, or decision risk.");
  if (diagnostic.coverage.count >= 3 && diagnostic.coverage.count <= 6) notes.push(`Score improved, but predictability is capped because only ${diagnostic.coverage.count} of ${diagnostic.coverage.total} signal areas were provided.`);
  return unique(notes).slice(0, 5);
}

function readPreviousAudit() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const raw = window.localStorage.getItem(previousAuditStorageKey);
    return raw ? JSON.parse(raw) : null;
  } catch (_error) {
    return null;
  }
}

function rememberCompletedAudit(diagnostic) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(previousAuditStorageKey, JSON.stringify({
      predictabilityScore: diagnostic.predictabilityScore,
      riskLevel: diagnostic.riskLevel,
      fractures: diagnostic.allFractures.map((fracture) => fracture.title).filter(isRealFractureTitle),
      coverageCount: diagnostic.coverage.count,
      savedAt: new Date().toISOString()
    }));
  } catch (_error) {
    // Local iteration memory is helpful, but the audit should still run without storage.
  }
}

function buildPausedDiagnosis(coverage) {
  const count = coverage.count;
  const signalCoverage = {
    label: "Low",
    note: `${count} of 3 required signals complete. ${count} of ${coverage.total} total launch signal areas detected.`
  };
  const causalDiagnosis = `Cognix does not yet detect enough strategic signal to confirm launch readiness. You have added ${count} of 3 required signals so far.`;
  const actions = [
    "Add at least 3 meaningful launch signal areas.",
    "Re-run the pre-launch coherence audit once at least 3 signal areas are populated."
  ];
  const missingSet = new Set(coverage.missing);
  const nextSignals = [
    "Launch message or positioning draft",
    "Target buyer or ICP",
    "Buyer pain",
    "CTA",
    "Sales feedback or objection notes",
    "Competitive framing",
    "Customer proof",
    "Planned launch goal"
  ].filter((item) => {
    if (item === "Sales feedback or objection notes") {
      return missingSet.has("Sales talk track") || missingSet.has("Objection notes");
    }
    return missingSet.has(item);
  });
  const lockedOutputs = [
    {
      title: "Launch-to-pipeline risk verdict",
      body: "Unlocks once at least 3 signal areas are covered."
    },
    {
      title: "Before / after message direction",
      body: "Locked until Cognix has enough launch context."
    },
    {
      title: "Strategic alignment & resource brief",
      body: "Unlocks once Cognix can generate a reliable executive read."
    }
  ];

  return {
    paused: true,
    mode: state.launchMode,
    riskScore: null,
    riskLabel: "Undetermined",
    signalCoverage,
    coverage,
    sharedAreas: coverage.presentTitles,
    evidence: [],
    actions,
    nextSignals,
    lockedOutputs,
    pattern: "Awaiting launch context",
    scoreName: "Launch-to-pipeline risk",
    verdict: "Not enough launch signal to diagnose reliably.",
    demoIntentRisk: "Undetermined",
    causalDiagnosis,
    buyerUrgency: "Awaiting input",
    salesPath: "Awaiting input",
    implication: "Awaiting input",
    commercialImplication: "Awaiting enough launch context to estimate commercial implications.",
    beforeMessage: "Awaiting launch context.",
    afterMessage: "Awaiting launch context. Add more signal coverage to unlock message direction.",
    memo: "",
    coreSentence: causalDiagnosis,
    kpiDrivers: []
  };
}

function buildSignalFlags(signals, allText) {
  const area = (id) => signals.some((signal) => signal.id === id && isMeaningfulSignalText(signal.text));
  const ctaText = signals.find((signal) => signal.id === "cta")?.text.toLowerCase() || "";
  const painText = signals.find((signal) => signal.id === "buyer-pain")?.text.toLowerCase() || "";
  const buyerText = signals.find((signal) => signal.id === "target-buyer")?.text.toLowerCase() || "";
  const messageText = signals.find((signal) => signal.id === "launch-message")?.text.toLowerCase() || "";
  const valueText = signals.find((signal) => signal.id === "value-prop")?.text.toLowerCase() || "";
  const campaignText = signals.find((signal) => signal.id === "campaign-copy")?.text.toLowerCase() || "";
  const objectionText = [
    signals.find((signal) => signal.id === "objections")?.text || "",
    signals.find((signal) => signal.id === "sales-talk-track")?.text || "",
    signals.find((signal) => signal.id === "sales-feedback")?.text || ""
  ].join("\n").toLowerCase();
  const explicitDemoCta = hasAny(ctaText, ["request a demo", "book a demo", "schedule a demo", "contact sales", "talk to sales", "diagnose", "assess", "pressure-test", "find hidden", "hidden renewal risk", "see your hidden", "identify risk", "request an audit", "request a launch conversion audit", "run a launch conversion audit", "get your first audit free", "start free audit", "launch conversion audit"]);
  const passivePrimaryCta = hasAny(ctaText, ["primary cta is learn more", "primary cta: learn more", "cta is learn more"]);
  const meaning = interpretMeaning(allText);
  const hasObjectionSignal = area("objections") || meaning.whyNowObjection || hasAny(objectionText || allText, ["objection", "already", "budget", "pricing", "package", "not urgent", "why now", "later", "next quarter"]);
  const addressedObjection = hasObjectionSignal && hasAny(objectionText, ["response", "respond", "answer", "rebuttal", "faq", "we answer", "we handle", "we explain", "explain", "explains", "because", "proof", "talk track", "if prospects say", "no."]);
  const competitiveClarity = !meaning.competitorOwnsPain && (!area("competitive-framing") || hasAny(allText, ["unlike", "different", "why us", "criteria", "better than", "not a", "not another", "replacement", "does not replace", "interprets", "shows the handoff risks", "threaten qualified demand"]));
  const clearIcp = area("target-buyer") || hasAny(allText, ["revops leaders", "pmm", "product marketing", "demand generation", "gtm leaders", "series b", "series c", "vp cs", "customer success", "ap directors", "finance operations", "cfo", "finance leaders", "ciso", "compliance leaders"]);
  const clearValueProp = area("value-prop") || hasAny(allText, ["helps", "protect", "reduce", "increase", "identify", "fix", "prevent"]);
  const salesSupport = area("sales-talk-track") || area("sales-feedback") || addressedObjection;
  const proofText = signals.find((signal) => signal.id === "customer-proof")?.text.toLowerCase() || "";
  const explicitNoProof = hasPattern(proofText, [
    /\bno customer proof\b/,
    /\bno (?!quantified\b)[a-z]+ proof\b/,
    /\bno proof\b/,
    /\bproof (is )?(not ready|missing|unavailable)\b/,
    /\bwithout customer proof\b/
  ]);
  const proofPresent = !explicitNoProof && (area("customer-proof") || hasAny(allText, ["customer", "quote", "case study", "proof", "testimonial", "validation", "beta", "metric", "%", "result", "saved", "reduced", "increased"]));
  const quantifiedProof = /[%$]|\b\d+(?:\.\d+)?(?:\s*(?:hours?|days?|weeks?))?\b|\b(saved|reduced|increased|case study)\b/i.test(proofText);
  const proofNeedsQuantification = proofPresent && !quantifiedProof;
  const aiMessageInconsistency = hasAny(allText, ["chatgpt", "claude", "gemini", "copilot", "ai-generated", "ai generated"]) && hasAny(allText, ["scattered", "inconsistent", "fragmented", "misalignment", "notion", "slack", "shared interpretation"]);
  const categoryAbstraction = hasAny(allText, ["cognitive layer", "gtm cognition", "ai-era", "ai era", "platform", "architecture", "category"]) && !meaning.urgency && !hasAny(allText, ["not a cs platform replacement", "not a dashboard", "platform replacement"]);
  const quantifiedPain = /[%$]|\b\d+(?:\.\d+)?(?:\s*(?:hours?|days?|weeks?))?\b|\b(cost|revenue|pipeline impact|lost pipeline|time saved|risk reduction)\b/i.test(painText);
  const specificOperationalPain = hasAny(painText, ["salesforce", "gong", "clari", "attribution", "spreadsheets", "pipeline reviews", "which number leadership should trust", "what action the gtm team should take", "churn risk", "adoption has already dropped", "executive sponsors", "renewal conversations", "expansion revenue", "customer risk", "renewal risk", "invoice exceptions", "backlog", "manual resolution"]);
  const genericPain = hasAny(painText, ["manual work", "disconnected processes", "too much time", "move faster", "productivity"]) && !hasAny(painText, ["cost", "expensive", "revenue", "pipeline", "arr", "risk", "audit", "delay", "lost", "wasted budget"]);
  const publicCopy = campaignText || messageText;
  const buyerFacingPageCopy = isMeaningfulSignalText(campaignText) ? campaignText : publicCopy;
  const publicMeaning = interpretMeaning(publicCopy);
  const genericAiPositioning = hasPattern(publicCopy, [
    /\bai-powered launch intelligence\b/,
    /\blaunch with confidence\b/,
    /\bmodern gtm teams?\b/,
    /\bmove faster\b/,
    /\bsmarter decisions?\b/,
    /\bai-powered\b.*\b(platform|intelligence|solution)\b/,
    /\bmodern\b.*\bplatform\b/
  ]);
  const riskPain = hasAny(allText, ["budget risk", "launch risk", "pipeline risk", "qualified pipeline", "arr", "roi", "investment", "demo conversion"]);
  const plainDemoCta = hasAny(ctaText, ["book a demo", "request a demo", "schedule a demo"]);
  let genericDemoCtaForRisk = plainDemoCta && riskPain && !hasAny(ctaText, ["risk", "pipeline", "launch", "budget", "audit", "diagnos"]);
  const cfoBuyer = /\bcfos?\b|chief financial|finance leaders?\b/.test(buyerText);
  const publicSpeaksFinanceControl = /\bcfos?\b|finance|financial control|margin|forecast|forecast accuracy|spend leakage|budget leakage|vendor sprawl|spend visibility|procurement|departmental forecasts?|approval visibility\b/i.test(publicCopy);
  const genericTeamProductivityCopy = /\b(work smarter|every team|collaborate|productivity|intelligent workspace|automate tasks|workflow automation|cross-functional workflows?|business workflows?)\b/i.test(publicCopy);
  const executivePmmMismatch = !genericAiPositioning && /\bcmo|chief marketing|executive|board\b/.test(buyerText) && /\bpmm|product marketing|productivity|workflow|templates?|drafts?|launch checklist/i.test(publicCopy) && !/\bcmo|pipeline|arr|budget|roi|commercial\b/.test(publicCopy);
  const buyerMessageMismatch = executivePmmMismatch || (cfoBuyer && genericTeamProductivityCopy && !publicSpeaksFinanceControl);
  const commercialStakesPresent = /(?:\$|USD\s*)\s?\d|arr|investment|budget|pipeline value|revenue influence|launch spend|media spend/i.test(allText);
  genericDemoCtaForRisk = genericDemoCtaForRisk || (plainDemoCta && commercialStakesPresent && !hasAny(ctaText, ["risk", "pipeline", "launch", "budget", "audit", "diagnos"]));
  const commercialStakesInPublicCopy = /(?:\$|USD\s*)\s?\d|arr|investment|budget|pipeline value|revenue influence|launch spend|media spend|roi/i.test(publicCopy);
  const commercialStakesMissingFromPage = commercialStakesPresent && !commercialStakesInPublicCopy;
  const proofInPublicCopy = /beta customer|customer proof|customer quote|case study|testimonial|validation|result|saved|reduced|increased|improved|beta team|\d+(?:\.\d+)?%/.test(campaignText || messageText);
  const proofBuriedMissingPublic = proofPresent && !proofInPublicCopy && !hasAny(campaignText, ["trusted", "trust", "risk", "review", "renewal", "audit", "exception", "backlog", "evidence gap"]);
  const weakPipelineConnection = hasAny(allText, ["awareness", "activity", "traffic", "launch activity", "engagement"]) && !hasAny(publicCopy, ["qualified pipeline", "qualified demand", "demo conversion", "pipeline quality", "sales accepted", "arr"]);
  const competitiveText = signals.find((signal) => signal.id === "competitive-framing")?.text.toLowerCase() || "";
  const internalStrategyText = `${messageText}\n${painText}\n${valueText}\n${objectionText}\n${competitiveText}\n${proofText}`;
  const internalHasSharpStrategy = hasAny(internalStrategyText, ["internal launch strategy", "audit delays", "last-minute evidence", "last-minute evidence gaps", "missing evidence", "control gaps", "audit readiness", "audit readiness gaps", "audit review", "formal review", "expensive audit", "pre-audit intelligence", "delayed soc 2", "reduce audit preparation"]);
  const publicCarriesSharpStrategy = hasAny(buyerFacingPageCopy, ["audit delays", "last-minute evidence gaps", "evidence gaps", "missing evidence", "control gaps", "audit readiness gaps", "audit review", "formal review", "expensive audit", "pass audits faster", "pre-audit intelligence", "delayed soc 2", "qualified demos", "qualified pipeline", "pipeline risk", "budget risk"]);
  const internalStrategyMissingPublic = internalHasSharpStrategy && !publicCarriesSharpStrategy;
  const passiveCta = passivePrimaryCta || (!explicitDemoCta && (meaning.passiveCta || hasAny(ctaText, ["learn more", "read more", "explore", "see more", "start your free trial", "free trial"])));
  const awarenessActivityGoal = hasAny(allText, ["impressions", "landing page visits", "page visits", "traffic", "clicks", "awareness", "engagement"]) && hasAny(allText, ["demo request", "demo requests", "qualified demos", "qualified pipeline"]);
  const broadAudience = hasPattern(buyerText, [
    /operations leaders?.*gtm leaders?.*finance leaders?/,
    /business teams?/,
    /every team/
  ]) || hasPattern(allText, [
    /many use cases across/,
    /sales, marketing, operations, finance/,
    /every team/
  ]);
  const launchMotionActivityWeakConversion = awarenessActivityGoal && (passiveCta || !explicitDemoCta) && (genericPain || !meaning.urgency) && (explicitNoProof || !proofPresent || proofNeedsQuantification || broadAudience);
  const proofMayWeakenLateStageConversion = proofPresent && proofNeedsQuantification && clearIcp && (meaning.buyerPain || specificOperationalPain) && explicitDemoCta && competitiveClarity;
  const strongProofWeakConversionPath = quantifiedProof && clearIcp && (meaning.buyerPain || specificOperationalPain) && passiveCta && hasAny(allText, ["qualified demos", "demo requests", "qualified pipeline"]);
  const contradictoryBroadPositioning = hasPattern(allText, [
    /positioning.*(too broad|broad|generic|unclear)/,
    /too broad.*(positioning|message|copy)/,
    /message.*(too broad|generic|not specific)/
  ]);
  return {
    launchMessage: area("launch-message") || area("campaign-copy"),
    buyerPain: meaning.buyerPain || hasAny(allText, ["pain", "problem", "manual", "slow", "risk", "cost", "broken", "missed", "confusion", "struggle", "handoff", "stalled"]),
    weakBuyerPain: (!meaning.buyerPain && meaning.weakBuyerPain) || genericPain,
    unquantifiedBuyerPain: (meaning.buyerPain || genericPain || hasAny(painText, ["pain", "problem", "risk", "struggle", "short on", "not short", "scattered", "misalignment"])) && !quantifiedPain && !specificOperationalPain,
    urgency: meaning.urgency || hasAny(allText, ["urgent", "urgency", "now", "this quarter", "deadline", "delay", "wait", "too late", "before", "risk", "why now", "planning cycle"]),
    strongCta: explicitDemoCta && !passivePrimaryCta,
    passiveCta,
    ctaCouldBeSharper: explicitDemoCta && !hasAny(ctaText, ["request a demo", "book a demo", "schedule a demo", "contact sales", "talk to sales", "diagnose", "pressure-test", "find hidden", "hidden renewal risk", "risk", "pipeline", "budget", "audit"]),
    proof: proofPresent,
    quantifiedProof,
    quantifiedImpact: /[%$]|\b\d+(?:\.\d+)?(?:\s*(?:hours?|days?|weeks?))?\b|\b(revenue|cost|roi|pipeline impact|lost pipeline|time saved|risk reduction)\b/i.test(allText),
    salesSignal: area("sales-talk-track") || area("sales-feedback") || area("objections") || meaning.salesConfusion || hasAny(allText, ["sales", "rep", "ae", "field", "prospect", "discovery", "talk track", "objection"]),
    weakSalesPath: meaning.salesConfusion,
    competitive: area("competitive-framing") || area("competitive-feedback") || meaning.competitorOwnsPain || hasAny(allText, ["competitor", "competitive", "alternative", "versus", "vs", "battlecard"]),
    competitorOwnsPain: meaning.competitorOwnsPain,
    aiMessageInconsistency,
    categoryAbstraction,
    genericAiPositioning,
    bookDemoCta: plainDemoCta,
    genericDemoCtaForRisk,
    buyerMessageMismatch,
    internalStrategyMissingPublic,
    commercialStakesMissingFromPage,
    proofBuriedMissingPublic,
    weakPipelineConnection,
    contradictoryBroadPositioning,
    launchMotionActivityWeakConversion,
    proofMayWeakenLateStageConversion,
    strongProofWeakConversionPath,
    addressedObjection,
    objections: hasObjectionSignal && !addressedObjection,
    performance: area("demo-result") || area("campaign-engagement") || area("landing-conversion") || area("pipeline-signal") || hasAny(allText, ["click", "traffic", "conversion", "demo request", "requests", "flat", "ctr", "activity", "visits"]),
    activityNoIntent: meaning.activityNoIntent || (hasAny(allText, ["high engagement", "above benchmark", "traffic", "clicks", "visits", "activity"]) && hasAny(allText, ["flat", "low demo", "few demo", "did not", "not converting", "low conversion", "lag"])),
    weakDemoIntent: publicMeaning.weakDemoIntent,
    featureHeavy: meaning.featureHeavy || hasAny(allText, ["feature", "dashboard", "automated", "filters", "timeline", "capability", "shipped", "release", "new"]),
    proofGap: explicitNoProof || (!proofPresent && meaning.proofGap),
    proofNeedsQuantification,
    unclearIcp: !clearIcp && !hasAny(allText, ["buyer", "icp", "persona", "revops", "pmm", "vp", "cmo", "sales manager"]),
    qualifiedDemand: hasAny(allText, ["qualified demand", "qualified pipeline", "sales accepted", "opportunity", "pipeline"]),
    competitiveClarity,
    clearValueProp,
    salesSupport,
    strongLaunch: clearIcp && (meaning.buyerPain || hasAny(allText, ["handoff", "stalled", "missed pipeline", "pipeline risk"])) && clearValueProp && explicitDemoCta && !passivePrimaryCta && (meaning.urgency || hasAny(allText, ["before launch", "before launch day", "quarter-end", "planning"])) && quantifiedProof && competitiveClarity && salesSupport && !meaning.salesConfusion && !meaning.weakBuyerPain && !genericAiPositioning && !genericDemoCtaForRisk && !buyerMessageMismatch && !commercialStakesMissingFromPage && !proofBuriedMissingPublic && !weakPipelineConnection && !contradictoryBroadPositioning
  };
}

function interpretMeaning(text) {
  return {
    weakDemoIntent: hasPattern(text, [
      /get(s)? what it does.*(not|n't|no|without).*(demo|meeting|book|ask)/,
      /understand(s|ing)? (the )?(product|feature|it).*(not|n't|no).*(demo|meeting|book|ask)/,
      /(interest|curiosity|awareness).*(not|n't|without).*(demo|meeting|pipeline|qualified)/
    ]),
    activityNoIntent: hasPattern(text, [
      /(lots|strong|high|healthy|above benchmark).*(clicks|traffic|engagement|visits).*(no|low|few|flat|without).*(meetings|demos|demo requests|pipeline)/,
      /(clicks|traffic|engagement|visits).*(but|and).*(no|low|few|flat).*(meetings|demos|demo requests|pipeline)/,
      /activity.*(not|did not|doesn't|without).*(qualified demand|pipeline|demo intent)/
    ]),
    salesConfusion: hasPattern(text, [
      /sales.*(asking|unsure|unclear|struggling).*(explain|position|talk|say)/,
      /(reps|aes|sales).*(do not|don't|cannot|can't|need).*(explain|talk track|discovery|why now)/,
      /how to explain it/
    ]),
    competitorOwnsPain: hasPattern(text, [
      /competitor.*(owns|frames|leads with).*(pain|problem|urgency|business problem)/,
      /(alternative|competitor).*(sharper|better).*(pain|problem|why now|business impact)/,
      /our copy.*(feature|capability).*(competitor|alternative).*(pain|problem|revenue)/
    ]),
    featureHeavy: hasPattern(text, [
      /(explain|explains|lead with|leads with).*(feature|capability|dashboard|release).*(not|instead of|rather than).*(business problem|buyer pain|pain)/,
      /(feature|capability|dashboard).*(not|without).*(business problem|buyer pain|pain|outcome)/,
      /what (is|we are) shipping.*(not|without).*(why|pain|problem|outcome)/,
      /(mostly|mainly).*(explain|lead with).*(dashboard|feature|capability)/
    ]),
    weakBuyerPain: hasPattern(text, [
      /(pain|problem).*(not fully defined|not defined|unclear|thin|weak)/,
      /(pain|problem).*(not|without).*(quantified|specific|sharp)/,
      /(better visibility|visibility).*(not|without).*(cost|urgency|business impact)/
    ]),
    proofGap: hasPattern(text, [
      /(no|missing|without|lack|lacks).*(proof|customer proof|case study|quote|metric)/,
      /proof.*(not|isn't|is not).*(included|ready|available)/,
      /(ask|asks).*(believe|trust).*(without|with no).*(proof|metric|customer)/
    ]),
    passiveCta: hasPattern(text, [
      /cta.*learn more/,
      /primary cta.*learn more/,
      /demo.*(lower|buried|secondary)/
    ]),
    whyNowObjection: hasPattern(text, [
      /(not urgent|later|next quarter|next planning cycle|wait)/,
      /(already|status quo).*(process|spreadsheet|workflow|tool)/,
      /why (now|change)/
    ]),
    urgency: hasPattern(text, [
      /(before|by|ahead of).*(launch|planning|quarter|deadline)/,
      /(risk|cost|lost|missed|stalled).*(if|when|because).*(wait|delay|later|status quo)/,
      /(why now|act now|urgent|urgency)/
    ]),
    buyerPain: hasPattern(text, [
      /(struggling|struggle|lose time|waste time|miss|missed|stalled|broken).*(handoff|workflow|pipeline|deal|process)/,
      /(problem|pain|cost|risk).*(buyer|team|prospect|customer)/,
      /(manual|spreadsheet|slow).*(process|workflow|handoff|tracking)/
    ])
  };
}

function buildFractures(has, allText) {
  const fractures = [];
  addFracture(fractures, has.launchMotionActivityWeakConversion, "Launch motion creates activity but not qualified demo intent", "The launch has channels and activity targets, but weak buyer pain, weak proof, and a generic CTA make it unlikely to convert attention into qualified pipeline.", "Anchor the launch on the specific buyer pain, add credible proof, and replace the generic CTA with a qualified demo-intent action.", ["impressions", "landing page visits", "learn more", "no customer proof", "manual work", "demo requests"]);
  addFracture(fractures, has.strongProofWeakConversionPath, "Proof is strong but CTA and conversion path are weak", "The launch has credible proof and clear buyer pain, but the CTA fails to translate interest into the next buyer action.", "Change the CTA from passive education to a specific risk, audit, readout, or demo offer tied to the proven business result.", ["52%", "38%", "420", "learn more", "see how it works", "qualified demos"]);
  addFracture(fractures, has.proofMayWeakenLateStageConversion, "Proof gap may weaken late-stage demo conversion", "The launch has a strong ICP, clear pain, and a specific CTA, but quantified proof is still thin enough to create buyer belief risk late in the demo journey.", "Add quantified renewal, churn, expansion, or account-risk proof near the claim and CTA so buyers believe the outcome before sales follow-up.", ["design partners", "no quantified", "pilot", "three accounts", "customer proof"]);
  addFracture(fractures, has.internalStrategyMissingPublic, "Public-facing message does not carry the internal strategy", "The team has the right strategic insight internally, but the landing page does not expose the commercial pain, buyer urgency, proof, or differentiated CTA.", "Rewrite the public page so the internal strategy is visible in the headline, proof placement, CTA, and sales follow-up narrative.", ["internal launch strategy", "audit delays", "control gaps", "audit readiness", "book a demo"]);
  addFracture(fractures, has.genericAiPositioning, "Generic AI positioning weakens CMO-level demo intent", "The buyer-facing message leans on generic AI/category language before proving why a CMO should care about pipeline risk.", "Rewrite the buyer-facing message around CMO-level launch risk, qualified pipeline, and commercial stakes.", ["ai-powered", "launch with confidence", "modern gtm", "move faster", "smarter decisions"]);
  addFracture(fractures, has.featureHeavy && (!has.buyerPain || has.weakBuyerPain || has.weakDemoIntent), "Feature-heavy message", "The launch explains what is shipping before it makes the buyer pain costly.", "Rewrite the headline around buyer pain, not shipped capability.", ["feature", "dashboard", "capability", "shipped", "release", "business problem", "what it does", "mostly explain"]);
  addFracture(fractures, !has.buyerPain || has.weakBuyerPain, "Weak buyer pain", "The signals do not give buyers a sharp enough problem to recognize themselves.", "Add quantified pain that names what breaks when the buyer keeps the current workflow.", ["pain", "problem", "manual", "risk", "cost", "not fully defined", "visibility"]);
  addFracture(fractures, has.unquantifiedBuyerPain, "Unquantified buyer pain", "The buyer pain is visible, but the message does not yet make the cost or urgency concrete enough.", "Quantify the pain with time, pipeline, cost, decision risk, or launch impact.", ["pain", "problem", "risk", "cost", "not quantified", "business impact"]);
  addFracture(fractures, !has.urgency, "Unclear buyer urgency", "The launch does not make a strong case for why a buyer should act now.", "Add urgency proof that explains why buyers should act before launch momentum fades.", ["urgent", "urgency", "now", "wait", "why now", "this quarter"]);
  addFracture(fractures, !has.strongCta || has.passiveCta, "Passive CTA", "The conversion ask is not strong enough to turn launch interest into demo intent.", "Replace passive CTA language with a demo-intent CTA.", ["learn more", "demo", "request", "book", "cta"]);
  addFracture(fractures, has.ctaCouldBeSharper, "CTA can be more demo-intent driven", "The CTA gives buyers a clear next step, but it could tie the audit request more directly to demo intent or launch risk.", "Sharpen the CTA around the launch risk the buyer needs to resolve before launch day.", ["audit", "cta", "launch conversion audit", "first audit free"]);
  addFracture(fractures, has.genericDemoCtaForRisk || ((has.bookDemoCta || hasAny(allText, ["book a demo", "request a demo", "schedule a demo"])) && has.commercialStakesMissingFromPage), "CTA does not connect to launch budget risk", "The CTA asks for a demo without connecting the action to budget, launch, or pipeline risk.", "Tie the demo ask to the commercial risk the buyer needs to resolve.", ["book a demo", "request a demo", "pipeline risk", "budget risk", "launch risk"]);
  addFracture(fractures, has.buyerMessageMismatch, "Target buyer and message are misaligned", "The selected buyer has financial or executive concerns, but the public message reads like generic team productivity software.", "Rewrite the page around the buyer's financial control, margin protection, forecast accuracy, spend leakage, pipeline, budget, or launch ROI concerns.", ["cfo", "finance", "productivity", "workflow", "spend leakage", "forecast"]);
  addFracture(fractures, has.commercialStakesMissingFromPage, "Commercial stakes are present internally but missing from public-facing message", "Commercial stakes appear in the launch notes, but the buyer-facing copy does not carry them into the buyer narrative.", "Move launch investment, pipeline risk, ARR influence, or demo conversion stakes into the page copy.", ["arr", "investment", "budget", "pipeline", "revenue"]);
  addFracture(fractures, !has.proof || has.proofGap, "Missing customer proof", "The launch asks buyers to believe the claim without enough proof or quantified pain.", "Add customer proof or quantified pain to the launch page.", ["customer", "proof", "metric", "quote", "result", "no proof"]);
  addFracture(fractures, has.proofBuriedMissingPublic, "Proof exists but is not placed early enough on the page", "Customer proof exists in the inputs, but it is not visible enough in the launch page message to support conversion.", "Move the strongest proof point into the page section closest to the pain and CTA.", ["customer", "proof", "quote", "testimonial", "result"]);
  addFracture(fractures, has.proofNeedsQuantification, "Proof needs quantification", "Customer validation is present, but it needs a metric or concrete result to carry executive trust.", "Quantify customer proof with time saved, pipeline impact, risk reduction, or a specific before-after result.", ["customer", "proof", "quote", "validation", "metric", "result"]);
  addFracture(fractures, has.unclearIcp, "Unclear ICP", "The launch does not clearly choose the buyer most likely to request a demo.", "Name the ICP and the buying trigger.", ["buyer", "icp", "persona", "segment", "role"]);
  addFracture(fractures, !has.salesSignal || has.weakSalesPath, "Weak sales conversion path", "Sales does not yet have a clear path from launch interest to a qualified demo conversation.", "Create a 3-line sales talk track that connects buyer pain, why now, and the demo ask.", ["sales", "rep", "talk track", "discovery", "prospect", "explain"]);
  addFracture(fractures, has.objections, "Unresolved objections", "Buyer pushback is visible and needs an explicit response before reps can convert interest.", "Add an objection response for why now.", ["objection", "already", "budget", "pricing", "why now"]);
  addFracture(fractures, has.competitive && (has.competitorOwnsPain || !has.competitiveClarity), "Competitive differentiation gap", "Competitive pressure is present, but the launch does not clearly change buying criteria.", "Add a why-us contrast that makes the buyer problem and buying criteria sharper than the competitor frame.", ["competitor", "competitive", "alternative", "criteria", "owns the pain"]);
  addFracture(fractures, !has.quantifiedImpact, "Missing quantified business impact", "The launch does not quantify why the problem is expensive enough to prioritize.", "Add customer proof or quantified pain tied to pipeline, time, cost, or revenue impact.", ["pipeline", "revenue", "cost", "roi", "%", "hours"]);
  addFracture(fractures, state.launchMode !== "pre" && has.activityNoIntent, "Launch activity without qualified demand", "The launch created attention, but the signals show demo intent or qualified pipeline did not follow.", "Run a follow-up campaign around the pain, not the feature.", ["click", "traffic", "activity", "flat", "low demo", "not converting"]);
  addFracture(fractures, has.weakPipelineConnection, "Weak connection between launch activity and qualified pipeline", "The launch may create activity or awareness without making the path to qualified pipeline concrete.", "Connect launch activity, CTA, and sales follow-through to qualified demo conversion.", ["awareness", "activity", "qualified pipeline", "qualified demand", "demo conversion"]);
  addFracture(fractures, has.contradictoryBroadPositioning, "Contradictory evidence flags broad positioning risk", "The launch inputs include warnings that positioning may be too broad, so the risk cannot be treated as low.", "Resolve the broad-positioning concern before using the message in paid or sales-led launch motions.", ["too broad", "generic", "positioning", "message"]);
  addFracture(fractures, has.weakDemoIntent, "Weak demo intent", "The buyer may understand the product without seeing a reason to request a demo.", "Connect the message and CTA to the buying trigger that makes a demo worth booking now.", ["understand", "get what it does", "not asking", "no demos", "demo"]);
  addFracture(fractures, has.aiMessageInconsistency, "AI-generated message inconsistency", "AI-generated GTM inputs are present, but the launch needs a clearer shared interpretation layer.", "Turn scattered AI-generated launch inputs into one pain-led story, CTA, proof path, and sales narrative.", ["ai-generated", "chatgpt", "claude", "gemini", "copilot", "shared interpretation", "scattered"]);
  addFracture(fractures, has.categoryAbstraction, "Category abstraction without buyer urgency", "The launch leans on category language before making the buyer urgency concrete.", "Translate category language into buyer pain, business cost, and a reason to act before launch day.", ["cognitive layer", "gtm cognition", "platform", "architecture", "category"]);
  return fractures;
}

function addFracture(fractures, condition, title, body, action, evidenceTerms) {
  if (!condition) return;
  fractures.push({ title, body, action, evidence: findEvidence(evidenceTerms) });
}

function isWatchoutFracture(fracture) {
  return ["CTA can be more demo-intent driven", "Proof needs quantification"].includes(fracture?.title);
}

function prioritizeFractures(fractures, has) {
  if (!fractures.length) return [];
  const order = [];
  if (has.launchMotionActivityWeakConversion) order.push("Launch motion creates activity but not qualified demo intent");
  if (has.strongProofWeakConversionPath) order.push("Proof is strong but CTA and conversion path are weak");
  if (has.proofMayWeakenLateStageConversion) order.push("Proof gap may weaken late-stage demo conversion");
  if (has.featureHeavy && (has.weakBuyerPain || !has.buyerPain)) order.push("Feature-heavy message", "Weak buyer pain");
  if (has.weakSalesPath) order.push("Weak sales conversion path");
  if (has.competitorOwnsPain) order.push("Competitive differentiation gap");
  if (has.passiveCta && has.buyerPain && !has.weakBuyerPain) order.push("Passive CTA");
  if (state.launchMode !== "pre" && has.activityNoIntent) order.push("Launch activity without qualified demand");
  if (has.weakDemoIntent) order.push("Weak demo intent");
  order.push("Public-facing message does not carry the internal strategy", "Target buyer and message are misaligned", "Generic AI positioning weakens CMO-level demo intent", "CTA does not connect to launch budget risk", "Commercial stakes are present internally but missing from public-facing message", "Proof exists but is not placed early enough on the page", "Weak connection between launch activity and qualified pipeline", "Contradictory evidence flags broad positioning risk", "Unquantified buyer pain", "Proof needs quantification", "CTA can be more demo-intent driven", "Feature-heavy message", "Weak buyer pain", "Passive CTA", "Competitive differentiation gap", "AI-generated message inconsistency", "Category abstraction without buyer urgency", "Weak sales conversion path", "Unclear buyer urgency", "Unresolved objections", "Missing customer proof", "Missing quantified business impact", "Unclear ICP");

  return [...fractures].sort((a, b) => {
    const aIndex = order.indexOf(a.title);
    const bIndex = order.indexOf(b.title);
    return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex);
  });
}

function buildReadinessFindings(signals, has) {
  return [{
    title: "No major fracture detected",
    body: "The launch has clear ICP, buyer pain, proof, urgency, direct CTA, and sales or objection support.",
    action: "Carry the same pain-led message, proof, and demo CTA through launch page, campaign, and sales follow-through.",
    evidence: firstAvailableEvidence(signals).slice(0, 3)
  }, {
    title: has.addressedObjection ? "Primary watchout: keep objection handling visible" : "Primary watchout: monitor sales follow-through",
    body: has.addressedObjection ? "Buyer pushback appears to have a response path." : "The main watchout is keeping the sales path consistent after launch.",
    action: "Monitor demo quality and rep feedback during launch week.",
    evidence: findEvidence(["objection", "already", "reps explain", "talk track", "book a demo"]).slice(0, 2)
  }];
}

function formatFractureLabel(title) {
  return String(title || "")
    .replace(/\bcta\b/ig, "CTA")
    .replace(/^./, (letter) => letter.toLowerCase());
}

function buildDemoIntentRisk(riskLabel, top, has, pre) {
  if (!pre) return riskLabel === "Low"
    ? "Demo intent appears reasonably supported by the available post-launch signals."
    : "Demo intent is underperforming relative to launch activity and needs a conversion-path diagnosis.";
  if (has.strongLaunch) return "Demo intent looks reasonably supported by clear pain, proof, urgency, and a direct conversion path.";
  if (riskLabel === "High") return "This launch may create awareness, but demo intent is at risk because buyers do not yet have a clear reason to act.";
  if (top.title === "Passive CTA") return "Demo intent depends on tightening the conversion path, especially the CTA and sales follow-through.";
  if (top.title === "Competitive differentiation gap") return "Demo intent is vulnerable if competitors own the buyer pain or buying criteria more clearly than this launch.";
  if (top.title === "Weak sales conversion path") return "Demo intent depends on whether sales can turn launch interest into a confident qualified conversation.";
  return "Demo intent has some support, but the highest-risk fracture should be fixed before launch day.";
}

function buildBusinessImplication(riskLabel, top, has, pre) {
  if (has.strongLaunch) return "If the team carries this message, proof, CTA, and sales path through consistently, the launch is positioned to create qualified demand rather than only awareness.";
  if (!pre) return "Campaign engagement may look healthy, but pipeline conversion will likely lag unless the launch narrative carries the buyer pain and urgency.";
  if (top.title === "Feature-heavy message") return "If the execution layer stays capability-led, buyers may understand the release but still lack a business reason to request a demo.";
  if (top.title === "Launch motion creates activity but not qualified demo intent") return "The launch may generate impressions, visits, and general interest, but buyer pain, proof transmission, and CTA specificity are not yet strong enough to convert attention into qualified pipeline.";
  if (top.title === "Proof is strong but CTA and conversion path are weak") return "The launch has credible proof and a clear buyer pain, but the CTA fails to translate interest into the next buyer action. The CMO should change the CTA from passive education to a specific risk, audit, readout, or demo offer.";
  if (top.title === "Proof gap may weaken late-stage demo conversion") return "The launch has a strong ICP, clear pain, and a specific CTA. It may create demo intent, but the CMO should watch whether buyers believe the claim because quantified proof is thin.";
  if (top.title === "Public-facing message does not carry the internal strategy") return "The PMM workspace shows a credible strategic foundation. The risk is that downstream execution surfaces are not transmitting that strategy clearly enough before spend goes live.";
  if (top.title === "Generic AI positioning weakens CMO-level demo intent") return "The launch may create awareness and curiosity, but the current buyer-facing message is too generic to reliably convert CMOs into qualified demos.";
  if (top.title === "Commercial stakes are present internally but missing from public-facing message") return "The launch may create interest, but qualified demo conversion is at risk if the public page does not carry the budget, pipeline, or ARR stakes already visible in the launch notes.";
  if (top.title === "Target buyer and message are misaligned") return "The selected buyer is CFO, but the copy speaks to generic team productivity and does not connect to financial control, margin protection, forecast accuracy, or spend leakage.";
  if (top.title === "Passive CTA") return "If the CTA remains passive, launch engagement may leak before it becomes demo requests.";
  if (top.title === "Competitive differentiation gap") return "If competitors own the pain frame, this launch may drive attention while another vendor shapes the buying criteria.";
  if (top.title === "Weak sales conversion path") return "If sales cannot explain the launch in pain-led terms, launch-sourced conversations may stay curious rather than qualified.";
  if (riskLabel === "High") return "If spend goes live before the execution gap is addressed, the launch may generate engagement while qualified demo requests underperform.";
  return "The launch can still convert, but the highest-risk drift point should be tightened before launch momentum is spent.";
}

function buildCommercialImplication(diagnostic) {
  const topTitles = diagnostic.allFractures.map((fracture) => fracture.title);
  const amount = extractBudgetAmount(diagnostic.signals);
  const commercialRange = extractCommercialRange(diagnostic.allText);
  const budgetRef = amount ? `${amount} campaign test` : "campaign test";
  const spendRef = amount ? `${amount} campaign test` : "paid campaign test";
  const paidTrafficRef = amount ? `${amount} campaign test budget` : "paid traffic";
  const hasTitle = (title) => topTitles.includes(title);

  const demoDrop = extractDemoDrop(diagnostic.allText);
  const opportunityDrop = extractOpportunityDrop(diagnostic.allText);
  if (amount && commercialRange) {
    const demoClause = demoDrop ? ` If strategy dilution reduces qualified demo volume ${demoDrop},` : " If strategy dilution reduces qualified demo volume,";
    const opportunityClause = opportunityDrop ? ` the campaign may lose ${opportunityDrop} expected opportunities and` : " the campaign may lose expected opportunities and";
    return `The launch has ${amount} of spend and internal effort at risk.${demoClause}${opportunityClause} put roughly ${commercialRange} in potential ARR influence at risk.`;
  }

  if (hasTitle("Launch motion creates activity but not qualified demo intent")) {
    return `The launch has channels and activity, but buyer pain, proof transmission, and CTA specificity are not yet strong enough to convert attention into qualified pipeline. Tightening the conversion story before spending ${amount ? `${amount} in launch budget` : "launch budget"} can reduce wasted media spend and protect budget for demand gen, retargeting, growth, or a stronger follow-up launch motion.`;
  }
  if (hasTitle("Public-facing message does not carry the internal strategy")) {
    return `The launch may spend campaign budget testing a page that hides the real buyer urgency already present in the planning inputs. Pulling the audit-delay risk, proof, and differentiated CTA into the public page can improve demo conversion efficiency and preserve launch budget for demand gen, retargeting, growth, or the next launch motion.`;
  }
  if (hasTitle("Passive CTA") || hasTitle("CTA can be more demo-intent driven")) {
    return `The CTA risk can make ${paidTrafficRef} less efficient because clicks may not convert into demo intent. Tightening the action path before launch can reduce wasted media spend, improve demo conversion efficiency, and free launch budget for follow-up demand gen, retargeting, growth, or the next launch motion.`;
  }
  if (hasTitle("Weak buyer pain") || hasTitle("Unquantified buyer pain") || hasTitle("Unclear buyer urgency")) {
    return `The buyer-pain gap may force the team to spend more campaign budget testing for urgency that should be clear before launch. If the launch needs a ${spendRef} to find the pain-led message, sharpening the problem now can reduce wasted test spend and redirect budget into demand gen, retargeting, growth, or another launch motion.`;
  }
  if (hasTitle("Missing customer proof") || hasTitle("Proof needs quantification") || hasTitle("Missing quantified business impact")) {
    return `The proof transmission gap can lower conversion confidence and make the team spend more on nurture, retargeting, or repeated message tests to compensate for missing strategic signal. Adding quantified proof before launch can improve campaign efficiency and preserve ${amount ? `${amount} launch budget` : "launch budget"} for demand gen or the next growth motion.`;
  }
  if (hasTitle("Competitive differentiation gap")) {
    return `The differentiation gap can waste ${amount ? `${amount} campaign spend` : "campaign spend"} educating buyers who still compare the launch to generic alternatives. Clearer contrast before launch can improve paid campaign efficiency, reduce low-signal A/B testing cycles, and redirect saved budget into retargeting, demand gen, or the next launch motion.`;
  }
  if (hasTitle("AI-generated message inconsistency")) {
    return `AI-generated message inconsistency can fragment campaign variants and make audience learning less reliable. Consolidating the launch story before spending ${amount ? amount : "media budget"} against multiple versions can reduce wasted testing cost, improve conversion efficiency, and preserve budget for follow-up demand gen or growth programs.`;
  }
  if (diagnostic.riskLevel === "Low") {
    return "The launch signal is commercially efficient enough to carry into campaign testing, as long as PMM keeps the pain, proof, CTA, and sales follow-through consistent. Budget risk is lower because the team is not relying on paid tests to discover the core message after launch.";
  }
  return `The dominant execution gap may force the team to use campaign spend to learn what the launch strategy should have transmitted before launch. Tightening the drift point first can reduce wasted ${budgetRef} budget, improve demo conversion efficiency, and free spend for demand gen, retargeting, growth, or the next launch motion.`;
}

function extractBudgetAmount(signals) {
  const joined = `${signals.map((signal) => signal.text).join(" ")} ${state.targetGoal || ""}`;
  const totalMatch = joined.match(/total launch (?:investment at risk|spend)\s*:\s*((?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?)/i);
  if (totalMatch?.[1]) return totalMatch[1].replace(/\s+/g, " ").trim();
  const match = joined.match(/(?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?|\b\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)\s?(?:budget|spend|test|media|campaign)/);
  return match ? match[0].replace(/\s+/g, " ").trim() : "";
}

function extractDemoTarget(text) {
  const value = String(text || "");
  const qualifiedMatch = value.match(/\b\d+(?:,\d{3})*\s+(?:qualified\s+)?(?:demos?|demo requests?|meetings?|opportunities?)\b/i);
  if (qualifiedMatch) return qualifiedMatch[0].replace(/\s+/g, " ").trim();
  const targetMatch = value.match(/(?:demo|pipeline|opportunity|meeting)\s+target\s*:?\s*(\d+(?:,\d{3})*)/i);
  return targetMatch?.[1] ? `${targetMatch[1]} demo target` : "";
}

function extractCommercialRange(text) {
  const value = String(text || "");
  const arrImpactMatch = value.match(/potential arr impact\s*:\s*((?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?\s*(?:-|to|and)\s*(?:\$|USD\s*)?\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?)/i);
  if (arrImpactMatch?.[1]) return arrImpactMatch[1].replace(/\s+/g, " ").replace(/\s*-\s*/, " to ").trim();
  const rangeMatch = value.match(/(?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?\s*(?:-|to|and)\s*(?:\$|USD\s*)?\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?/);
  if (rangeMatch) return rangeMatch[0].replace(/\s+/g, " ").replace(/\s*-\s*/, " to ").trim();
  return "";
}

function extractDemoDrop(text) {
  const match = String(text || "").match(/(?:only\s+)?(\d+)\s+qualified demos?\s+instead of\s+(\d+)/i);
  return match ? `from ${match[2]} to ${match[1]}` : "";
}

function extractOpportunityDrop(text) {
  const match = String(text || "").match(/(?:only\s+)?(\d+)\s+to\s+(\d+)\s+opportunities\s+instead of\s+(\d+)/i);
  if (match) {
    const lostLow = Number(match[3]) - Number(match[2]);
    const lostHigh = Number(match[3]) - Number(match[1]);
    return `${lostLow} to ${lostHigh}`;
  }
  return "";
}

function findEvidence(terms) {
  const signals = Object.entries(state.signals)
    .map(([id, value]) => ({
      source: activeBuckets().find((bucket) => bucket.id === id)?.title || "Launch signal",
      text: String(value || "").trim()
    }))
    .filter((signal) => isMeaningfulSignalText(signal.text));
  const matches = signals
    .map((signal) => {
      const term = terms.find((item) => signal.text.toLowerCase().includes(item));
      return term ? { source: signal.source, snippet: excerpt(signal.text, term) } : null;
    })
    .filter(Boolean);
  return uniqueEvidence(prioritizeEvidence(matches, terms)).slice(0, 2);
}

function firstAvailableEvidence(signals) {
  return signals.slice(0, 4).map((signal) => ({ source: signal.title, snippet: cleanEvidenceSnippet(signal.text) }));
}

function prioritizeEvidence(matches, terms) {
  const joined = terms.join(" ");
  return [...matches].sort((a, b) => evidenceScore(b, joined) - evidenceScore(a, joined));
}

function evidenceScore(item, termText) {
  let score = 0;
  const source = item.source.toLowerCase();
  const snippet = item.snippet.toLowerCase();
  if (termText.includes("sales") && source.includes("sales")) score += 8;
  if (termText.includes("competitor") && source.includes("competitive")) score += 8;
  if (termText.includes("cta") && source.includes("cta")) score += 8;
  if (termText.includes("pain") && source.includes("pain")) score += 8;
  if (snippet.includes("asking how to explain") || snippet.includes("unsure what to say")) score += 6;
  if (snippet.includes("learn more")) score += 5;
  if (snippet.includes("competitor owns")) score += 5;
  return score;
}

function buildCoverage(signals, has) {
  const coreBuckets = bucketDefinitions.pre.filter((bucket) => coreLaunchSignalIds.includes(bucket.id));
  const present = signals
    .filter((signal) => coreLaunchSignalIds.includes(signal.id) && (isMeaningfulSignalText(signal.text) || isMeaningfulShortSignal(signal)))
    .map((signal) => signal.id);
  const presentTitles = coreBuckets
    .filter((bucket) => present.includes(bucket.id))
    .map((bucket) => bucket.title);
  const missing = coreBuckets.filter((bucket) => !present.includes(bucket.id)).map((bucket) => bucket.title);
  const count = new Set(present).size;
  const total = coreLaunchSignalIds.length;
  const notes = [
    `${count} of ${total} launch signal areas have meaningful content.`,
    missing.length ? `Missing or thin areas: ${missing.slice(0, 5).join(", ")}.` : "All launch signal areas have content.",
    count >= 7
      ? "Signal coverage is strong. The remaining risk comes from signal quality and conversion strength, not missing inputs."
      : count >= 3 && has.launchMessage && has.buyerPain && (has.strongCta || has.passiveCta) && has.salesSignal
      ? "Core launch conversion signals are present."
      : "Core conversion signals are incomplete. Add launch message, buyer pain, CTA, and sales or objection signal."
  ];
  return { count, total, missing, presentTitles, notes };
}

function computeSignalCoverage(coverage, has) {
  if (coverage.count >= 7) return { label: "Strong", note: "Seven or more meaningful launch signal areas are present." };
  if (coverage.count >= 3) return { label: "Medium", note: "Three to six meaningful launch signal areas are present." };
  return { label: "Low", note: "Fewer than three meaningful launch signal areas are present." };
}

function deriveBeforeMessage(signals) {
  const preferred = signals.find((signal) => ["launch-message", "campaign-copy"].includes(signal.id)) || signals[0];
  if (!preferred) return "No launch message was provided.";
  return cleanConceptPhrase(preferred.text, 260);
}

function sharpenAction(action) {
  return String(action || "")
    .replace("Replace passive CTA language with a demo-intent CTA.", "Move the primary CTA from passive learning to a direct demo-intent ask.")
    .replace("Rewrite the headline around buyer pain, not shipped capability.", "Rewrite the lead message around the buyer pain and business cost, not the shipped capability.")
    .replace("Create a 3-line sales talk track that connects buyer pain, why now, and the demo ask.", "Give sales a 3-line talk track that connects pain, why now, and why to book a demo.");
}

function cleanActionItems(actions) {
  const sharpened = (actions || []).map(sharpenAction).map(normalizeAcronyms).filter(Boolean);
  const hasStrongerProofAction = sharpened.some((item) => /customer proof or quantified pain tied to pipeline, time, cost, or revenue impact/i.test(item));
  return unique(sharpened.filter((item) => {
    if (hasStrongerProofAction && /^Add customer proof or quantified pain to the launch page\.$/i.test(item)) return false;
    if (hasStrongerProofAction && /^Quantify customer proof with time saved, pipeline impact, risk reduction/i.test(item)) return false;
    return true;
  }));
}

function extractFieldValue(text, fallback) {
  const cleaned = cleanConceptPhrase(text, 180);
  return cleaned || fallback;
}

function extractBuyerValue(text, fallback) {
  const cleaned = extractFieldValue(text, "");
  if (!cleaned) return fallback;
  const roleMatch = cleaned.match(/(?:says\s+)?([^,.]+(?:leaders|managers|teams|buyers|PMMs|PMM teams|CMOs|operators|marketers))/i);
  const buyer = roleMatch ? roleMatch[1].replace(/^the draft says\s+/i, "").trim() : cleaned;
  return cleanConceptPhrase(buyer, 90) || fallback;
}

function extractProductName(text) {
  const cleaned = extractFieldValue(text, "the launch");
  if (/cognix/i.test(cleaned)) return "Cognix";
  const anywhereAiNameMatch = cleaned.match(/\b([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\b/);
  if (anywhereAiNameMatch?.[1]) return anywhereAiNameMatch[1];
  const aiNameMatch = cleaned.match(/^([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\s+(?:is|helps|shows|turns|gives|provides|detects|diagnoses)\b/);
  if (aiNameMatch?.[1]) return aiNameMatch[1];
  const introMatch = cleaned.match(/^([A-Z][A-Za-z0-9.-]{2,40})\s+(?:is|helps|shows|turns|gives|provides|detects|diagnoses)\b/);
  if (introMatch?.[1]) return introMatch[1];
  const launchMatch = cleaned.match(/(?:launching|launch|release|announcing)\s+([^,.;]+?)(?:,|\s+helps|\s+for|\s+with|$)/i);
  if (launchMatch?.[1]) return cleanConceptPhrase(launchMatch[1], 48) || "this launch";
  return "this launch";
}

function bestProductName(...values) {
  for (const value of values) {
    const product = extractProductName(value);
    if (product && product !== "this launch" && product !== "the launch") return product;
  }
  return "this launch";
}

function extractPainValue(text, fallback) {
  const cleaned = extractFieldValue(text, "");
  if (!cleaned) return fallback;
  if (/not fully defined|not defined|unclear|weak|not quantified/i.test(cleaned)) {
    return "a buyer problem that is not yet specific or quantified";
  }
  if (/shared interpretation|scattered|notion|slack|chatgpt|claude|gemini/i.test(cleaned)) {
    return "messy AI-era GTM output without shared interpretation";
  }
  return cleanConceptPhrase(cleaned, 120) || fallback;
}

function extractOutcomeValue(text, fallback) {
  const cleaned = extractFieldValue(text, "");
  if (!cleaned) return fallback;
  const helpsMatch = cleaned.match(/helps? (.+?)(?:, but|\.|$)/i);
  if (helpsMatch?.[1]) {
    const outcome = helpsMatch[1]
      .split(/\s+by\s+/i)[0]
      .trim()
      .replace(/^(teams|revops|users|buyers|pmms|product marketing leaders)\s+/i, "");
    return cleanConceptPhrase(outcome, 110) || fallback;
  }
  if (/visibility dashboard/i.test(cleaned)) return "make launch handoff risk visible before it turns into missed pipeline";
  if (/qualified demand|pipeline|demo intent|launch-to-pipeline/i.test(cleaned)) return "diagnose whether the launch will create qualified demand or just activity";
  return cleanConceptPhrase(cleaned, 120) || fallback;
}

function extractStatusQuoFriction(signals, fallback) {
  const objection = signals.find((signal) => signal.id === "objections")?.text || "";
  const cleaned = extractFieldValue(objection, "");
  const alreadyMatch = cleaned.match(/already (.+?)(?:\.|,| and | but |$)/i);
  if (alreadyMatch?.[1]) {
    const value = alreadyMatch[1].trim();
    if (/have a process/i.test(value)) return "relying on an existing manual process";
    if (/track this manually/i.test(value)) return "relying on manual tracking";
    return `relying on ${cleanConceptPhrase(value, 80)}`;
  }
  return fallback;
}

function inferBuyerFromSignals(signals, has) {
  const combined = signals.map((signal) => signal.text).join(" ");
  if (/pmm|product marketing/i.test(combined)) return "PMMs launching in fast-moving GTM teams";
  if (/revops/i.test(combined)) return "RevOps leaders";
  if (/cmo|gtm leader/i.test(combined)) return "GTM leaders";
  return has.unclearIcp ? "launch teams with unclear ICP pressure" : "GTM teams preparing for launch";
}

function inferPainFromSignals(has) {
  if (has.featureHeavy && has.weakBuyerPain) return "a message that explains product capability before making the buyer pain urgent";
  if (has.passiveCta) return "launch interest that does not turn into a clear demo path";
  if (has.proofGap) return "claims that need stronger proof before buyers will prioritize them";
  if (has.weakSalesPath) return "sales narrative gaps that weaken qualified demo conversations";
  return "messy launch signals and unclear conversion risk";
}

function inferOutcomeFromSignals(has) {
  if (has.activityNoIntent) return "turn launch attention into qualified demand";
  if (has.proofGap) return "make the launch risk credible enough for buyers to act";
  return "diagnose whether the launch will create qualified demand or just activity";
}

function inferProductMechanism(signals, has) {
  const combined = signals.map((signal) => signal.text).join(" ");
  if (/cognix/i.test(combined)) {
    return "interpreting launch signals across messaging, ICP, CTA, sales feedback, proof, and competitive pressure";
  }
  if (has.weakSalesPath) return "connecting buyer pain, CTA, and sales follow-through into one conversion path";
  if (has.proofGap) return "turning weak claims into evidence-backed launch fixes";
  return "turning the dominant GTM fracture into a focused PMM action plan";
}

function inferStatusQuoFromSignals(has) {
  if (has.passiveCta) return "asking buyers to learn more and hoping interest becomes pipeline";
  if (has.featureHeavy) return "leading with product capability and category language";
  if (has.proofGap) return "asking buyers to trust an unproven launch claim";
  return "shipping with scattered signals and unresolved launch risk";
}

function extractCtaAction(text, has) {
  const cleaned = extractFieldValue(text, "");
  if (has.strongCta && /demo/i.test(cleaned)) return "book a demo tied to the buying trigger";
  if (/audit|risk|diagnos/i.test(cleaned)) return "run the launch conversion audit before launch day";
  return "run a launch conversion audit before launch day";
}

function cleanConceptPhrase(text, max = 120) {
  const labelPattern = /^(Launch message(?: or positioning draft)?|Launch page|Landing page(?: copy| or campaign copy)?|Campaign copy|Primary buyer|Target buyer(?: or ICP)?|ICP|Buyer pain|Value proposition|CTA|Sales talk track|Sales feedback|Objection notes?|Competitive framing|Customer proof|Planned launch goal)\s*:\s*/i;
  let cleaned = String(text || "")
    .replace(labelPattern, "")
    .replace(/\b(chatgpt|claude|gemini|copilot)\s*,\s*[a-z]$/i, "$1")
    .replace(/\s+/g, " ")
    .replace(/\b(.{10,80}?)\b(?:\s+\1\b)+/gi, "$1")
    .trim();
  cleaned = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .find((sentence) => !looksLikeRawDump(sentence)) || cleaned;
  cleaned = cleaned
    .replace(/^[,.;:\-\s]+|[,.;:\-\s]+$/g, "")
    .replace(/\s+\S{1,2}$/g, "")
    .trim();
  return truncate(cleaned, max);
}

function looksLikeRawDump(text) {
  const value = String(text || "").trim();
  if (!value) return true;
  const words = value.split(/\s+/);
  const lowercaseWords = words.filter((word) => /^[a-z][a-z'-]*[,.]?$/.test(word));
  return words.length > 22 && lowercaseWords.length / words.length > 0.82;
}

function lowerConcept(text) {
  const cleaned = stripTerminalPunctuation(cleanConceptPhrase(text, 130));
  if (!cleaned) return "unclear launch risk";
  return cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
}

function finishStrategicPhrase(text) {
  return normalizeAcronyms(String(text || "")
    .replace(/\s+\b(?:from|with|without|into|against|across|around|before|after|because|while|but|and|or|of|to|for|by|a|an|the)\b$/i, "")
    .replace(/\s+that creates$/i, "")
    .replace(/\s+before$/i, "")
    .replace(/[,:;/-]+$/g, "")
    .trim());
}

function capitalizeFirst(text) {
  const value = String(text || "").trim();
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

function stripTerminalPunctuation(text) {
  return String(text || "").trim().replace(/[.!?]+$/, "");
}

function normalizeAcronyms(text) {
  return String(text || "")
    .replace(/\bcta\b/gi, "CTA")
    .replace(/\bicp\b/gi, "ICP")
    .replace(/\bpmm\b/gi, "PMM")
    .replace(/\bpmm(s)\b/gi, "PMM$1")
    .replace(/\bgtm\b/gi, "GTM")
    .replace(/\bcmo\b/gi, "CMO")
    .replace(/\bcMOs\b/g, "CMOs")
    .replace(/\bai\b/gi, "AI");
}

function scorePredictability(fractures, coverage, has) {
  let score = 70;
  const titles = new Set(fractures.map((fracture) => fracture.title));
  const subtract = (title, value) => {
    if (titles.has(title)) score -= value;
  };

  const messageRiskTitles = ["Feature-heavy message", "Weak buyer pain", "Unquantified buyer pain", "Category abstraction without buyer urgency", "AI-generated message inconsistency"];
  const messageRiskCount = messageRiskTitles.filter((title) => titles.has(title)).length;
  if (titles.has("Feature-heavy message")) score -= has.buyerPain ? 8 : 12;
  if (titles.has("Weak buyer pain")) score -= 14;
  if (titles.has("Unquantified buyer pain")) score -= 8;
  subtract("Passive CTA", 12);
  subtract("CTA can be more demo-intent driven", 5);
  subtract("Missing customer proof", 13);
  subtract("Proof gap may weaken late-stage demo conversion", 4);
  subtract("Proof is strong but CTA and conversion path are weak", 6);
  subtract("Proof needs quantification", 7);
  subtract("Competitive differentiation gap", 11);
  subtract("Weak sales conversion path", 11);
  subtract("Unresolved objections", 10);
  subtract("Unclear ICP", 16);
  subtract("AI-generated message inconsistency", 7);
  subtract("Category abstraction without buyer urgency", 8);
  subtract("Missing quantified business impact", 8);
  subtract("Weak demo intent", 9);
  subtract("Launch activity without qualified demand", 10);
  subtract("Launch motion creates activity but not qualified demo intent", 14);
  subtract("Unclear buyer urgency", 10);
  subtract("Public-facing message does not carry the internal strategy", 10);
  subtract("Generic AI positioning weakens CMO-level demo intent", 12);
  subtract("CTA does not connect to launch budget risk", 7);
  subtract("Target buyer and message are misaligned", 16);
  subtract("Commercial stakes are present internally but missing from public-facing message", 9);
  subtract("Proof exists but is not placed early enough on the page", 8);
  subtract("Weak connection between launch activity and qualified pipeline", 8);
  subtract("Contradictory evidence flags broad positioning risk", 8);

  if (messageRiskCount > 1 && has.buyerPain) score += Math.min(8, (messageRiskCount - 1) * 4);
  if (!has.unclearIcp) score += 11;
  if (has.buyerPain && !has.weakBuyerPain) score += has.unquantifiedBuyerPain ? 6 : 9;
  if (has.strongCta && !has.passiveCta) score += 8;
  if (has.proof && !has.proofGap) score += has.quantifiedProof ? 9 : 6;
  if (has.quantifiedProof) score += 4;
  if (has.salesSignal) score += 5;
  if (has.competitive && has.competitiveClarity) score += 5;
  if (has.addressedObjection) score += 7;
  if (has.qualifiedDemand) score += 5;
  if (coverage.count >= 7) score += 4;
  if (coverage.count === coverage.total) score += 3;
  if (has.strongLaunch) score += 8;

  const hasMeaningfulOffsets = !has.unclearIcp
    && has.buyerPain
    && has.strongCta
    && has.proof
    && has.salesSignal
    && has.competitiveClarity
    && coverage.count >= 7;
  if (!has.strongLaunch && titles.size) {
    if (has.proofNeedsQuantification || has.ctaCouldBeSharper || has.aiMessageInconsistency || has.unquantifiedBuyerPain || has.internalStrategyMissingPublic || has.genericAiPositioning || has.genericDemoCtaForRisk || has.buyerMessageMismatch || has.commercialStakesMissingFromPage || has.proofBuriedMissingPublic || has.weakPipelineConnection || has.contradictoryBroadPositioning) {
      score = Math.min(score, 68);
    }
    if (has.featureHeavy || has.categoryAbstraction) {
      score = Math.min(score, hasMeaningfulOffsets ? 66 : 60);
    }
    if (titles.has("Missing customer proof") || titles.has("Weak buyer pain") || titles.has("Passive CTA")) {
      score = Math.min(score, hasMeaningfulOffsets ? 62 : 55);
    }
    if (hasMeaningfulOffsets) score = Math.max(score, 58);
  }
  const hasImprovedCoreSignals = coverage.count >= 4
    && !has.unclearIcp
    && has.buyerPain
    && has.strongCta
    && !has.passiveCta;
  if (hasImprovedCoreSignals && !has.strongLaunch) {
    score = Math.max(score, 65);
    score = Math.min(score, 72);
  }
  const fullCoverageQualityRisk = coverage.count >= 7
    && (has.internalStrategyMissingPublic || has.genericAiPositioning || has.genericDemoCtaForRisk || has.buyerMessageMismatch || has.commercialStakesMissingFromPage || has.proofBuriedMissingPublic || has.weakPipelineConnection || has.contradictoryBroadPositioning);
  if (fullCoverageQualityRisk) {
    score = Math.min(score, 68);
    score = Math.max(score, 60);
  }
  if (has.buyerMessageMismatch) {
    score = Math.min(score, 48);
    score = Math.max(score, 35);
  }
  if (has.internalStrategyMissingPublic) {
    score = Math.min(score, 62);
    score = Math.max(score, 50);
  }
  if (has.proofMayWeakenLateStageConversion) {
    score = Math.min(score, 78);
    score = Math.max(score, 68);
  }
  if (has.strongProofWeakConversionPath) {
    score = Math.min(score, 75);
    score = Math.max(score, 65);
  }
  if (has.launchMotionActivityWeakConversion) {
    score = Math.min(score, 55);
    score = Math.max(score, 42);
  }
  const realFractureCount = [...titles].filter(isRealFractureTitle).length;
  if (has.strongLaunch && !realFractureCount) {
    score = Math.min(score, 95);
    score = Math.max(score, 88);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function riskLabelFromPredictability(score) {
  if (score >= 80) return "Low";
  if (score >= 60) return "Medium";
  if (score >= 40) return "Medium to high";
  return "High";
}

function scoreRisk(fractures, coverage, has) {
  let score = 30 + Math.min(fractures.length * 7, 42);
  if (!has.buyerPain) score += 8;
  if (!has.urgency) score += 8;
  if (!has.strongCta || has.passiveCta) score += 8;
  if (!has.proof) score += 5;
  if (!has.quantifiedImpact) score += 4;
  if (has.activityNoIntent) score += 7;
  if (coverage.count < 3) score -= 10;
  return Math.max(18, Math.min(92, score));
}

function activeBuckets() {
  return bucketDefinitions[state.launchMode] || bucketDefinitions.pre;
}

function meaningfulAreas() {
  return activeBuckets().filter((bucket) => isMeaningfulSignalText(state.signals[bucket.id]));
}

function excerpt(text, term) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  const index = normalized.toLowerCase().indexOf(String(term || "").toLowerCase());
  if (index < 0) return truncate(normalized, 210);
  const sentences = normalized.split(/(?<=[.!?])\s+/);
  const sentence = sentences.find((item) => item.toLowerCase().includes(String(term || "").toLowerCase()));
  if (sentence) return cleanEvidenceSnippet(sentence);
  const start = Math.max(0, index - 70);
  const end = Math.min(normalized.length, index + 140);
  return cleanEvidenceSnippet(`${start > 0 ? "..." : ""}${normalized.slice(start, end).trim()}${end < normalized.length ? "..." : ""}`);
}

function cleanEvidenceSnippet(text) {
  const cleaned = cleanConceptPhrase(text, 180)
    .replace(/^\.{3}\s*|\s*\.{3}$/g, "")
    .trim();
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  const completeSentence = sentences.find((sentence) => sentence.split(/\s+/).length <= 24);
  const candidate = completeSentence || cleaned;
  const words = candidate.split(/\s+/).filter(Boolean);
  if (words.length <= 22) return normalizeAcronyms(finishEvidencePhrase(candidate));
  const clipped = words.slice(0, 18).join(" ");
  return normalizeAcronyms(finishEvidencePhrase(clipped));
}

function finishEvidencePhrase(text) {
  let cleaned = String(text || "")
    .replace(/\s+\b(?:from|with|without|into|against|across|around|before|after|because|while|but|and|or|of|to|for|by|a|an|the)\b$/i, "")
    .replace(/[,;:\-/\s]+$/g, "")
    .trim();
  if (!cleaned) return "";
  if (/[.!?]$/.test(cleaned)) return cleaned;
  return `${cleaned}.`;
}

function isMeaningfulSignalText(value) {
  const normalized = normalizeSignalText(value);
  if (!normalized) return false;
  if (genericSignalResponses.has(normalized)) return false;
  if (/^(not sure|unsure|tbd|none|n\/a|na|coming soon|need to add|waiting for input|awaiting input|unknown)[.!?]*$/i.test(normalized)) return false;
  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length <= 3 && words.every((word) => genericSignalResponses.has(word) || ["no", "not", "sure", "input", "later"].includes(word))) return false;
  return normalized.length >= 12 || words.length >= 4;
}

function normalizeSignalText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/[.?!]+$/g, "");
}

function hasAny(text, terms) {
  const lower = String(text || "").toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function hasPattern(text, patterns) {
  const lower = String(text || "").toLowerCase();
  return patterns.some((pattern) => pattern.test(lower));
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeOverlapText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9%$]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function limitWords(text, maxWords) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  const clipped = words.slice(0, maxWords).join(" ").replace(/[,:;/-]+$/, "").trim();
  return `${clipped}...`;
}

function uniqueEvidence(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = normalizeOverlapText(`${item.source}:${item.snippet}`).slice(0, 120);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function cleanEvidenceItems(items) {
  return uniqueEvidence(items.map((item) => ({
    source: normalizeAcronyms(item.source),
    snippet: cleanEvidenceSnippet(item.snippet)
  })).filter((item) => item.snippet));
}

function outputEvidenceSource(source) {
  const value = normalizeAcronyms(source);
  if (/^Buyer pain$/i.test(value)) return "Pain signal";
  return value;
}

function downloadAuditPdf(diagnosis) {
  const generatedAt = new Date();
  const pdfBytes = buildBrandedAuditPdf(diagnosis, generatedAt);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = auditPdfFilename(generatedAt);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildBrandedAuditPdf(diagnosis, generatedAt) {
  const pre = diagnosis.mode === "pre";
  const auditType = pre ? "Pre-launch coherence audit" : "Post-launch narrative drift diagnosis";
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  const memorySummary = memoryReadySummary(diagnosis);
  const brief = buildExecutiveDecisionBrief(diagnosis);
  const actionPlan = splitPmmActionPlan(diagnosis);
  const pages = createPdfReportPages();

  // Page 1: Executive decision brief
  pdfReportHeader(pages, {
    title: "Cognix Launch Conversion Audit",
    timestamp: formatGeneratedTimestamp(generatedAt),
    auditType,
    kpi: state.selectedKpi || "Demo intent",
    goal: state.targetGoal || "Not specified"
  });
  pdfExecutiveBrief(pages, diagnosis, brief);

  // Page 2: Strategy-to-market coherence read
  addPdfReportPage(pages);
  pdfPageHeading(pages, "Strategy-to-market coherence read", `${diagnosis.predictabilityScore}% Launch Predictability`);
  pdfSectionCard(pages, "Coherence read", [architecture.coherenceRead], { featured: true });
  pdfSectionCard(pages, diagnosis.predictabilityScore >= 90 ? "Primary watchout" : "Dominant contradiction", [primaryFractureLabel(diagnosis), ...secondaryFractureLabels(diagnosis).slice(0, 2)], { list: true });
  pdfSectionCard(pages, "Evidence from launch signals", cleanEvidenceItems(diagnosis.evidence).map((item) => `${outputEvidenceSource(item.source)}: "${item.snippet}"`), { list: true });

  // Page 3: Commercial risk or commercial readiness
  addPdfReportPage(pages);
  pdfPageHeading(pages, architecture.commercialPanel.label, architecture.commercialPanel.headline);
  pdfCardGrid(pages, [
    { title: "Score", body: `${diagnosis.predictabilityScore}% Launch Predictability` },
    { title: "Risk", body: diagnosis.verdict },
    { title: "Coverage", body: `${diagnosis.signalCoverage.label}, ${diagnosis.coverage.count} of ${diagnosis.coverage.total} signal areas.` }
  ]);
  pdfSectionCard(pages, architecture.commercialPanel.label, [architecture.commercialPanel.body], { featured: true });

  // Page 4: Instead of / Say this + Specific CTA fix
  addPdfReportPage(pages);
  pdfPageHeading(pages, "Instead of / Say this", "Buyer-facing rewrite and CTA fix");
  pdfSectionCard(pages, "Instead of", [`"${architecture.rewritePanel.instead}"`]);
  pdfSectionCard(pages, "Say this", [`"${architecture.rewritePanel.sayThis}"`], { featured: true });
  pdfSectionCard(pages, "Why it works", [architecture.rewritePanel.why]);
  pdfSectionCard(pages, "Specific CTA fix", [
    `Instead of: "${architecture.ctaPanel.instead}"`,
    `Say this: "${architecture.ctaPanel.sayThis}"`,
    architecture.ctaPanel.why
  ], { featured: true });

  // Page 5: Strategic alignment & resource brief
  addPdfReportPage(pages);
  pdfPageHeading(pages, "Strategic alignment & resource brief", "Forwardable executive note");
  pdfSectionCard(pages, "Strategic alignment & resource brief", architecture.resourceBrief.split(/\n+/).filter(Boolean), { featured: true });

  // Page 6: PMM action plan + memory-ready summary
  addPdfReportPage(pages);
  pdfPageHeading(pages, "PMM action plan", "What to fix, monitor, and feed back to sales");
  pdfSectionCard(pages, "Fix before launch", actionPlan.fixBeforeLaunch, { list: true });
  pdfSectionCard(pages, "Monitor during launch week", actionPlan.monitorDuringLaunch, { list: true });
  pdfSectionCard(pages, "Feed back to sales", actionPlan.feedBackToSales, { list: true });
  if (diagnosis.iterationComparison?.hasPrevious) {
    pdfSectionCard(pages, "Score movement", buildPdfIterationLines(diagnosis.iterationComparison), { list: true, featured: true });
  }
  pdfSectionCard(pages, "Memory-ready summary", memorySummary, { list: true, featured: true });

  return serializeBrandedPdf(pages.pages, pages.width, pages.height);
}

function buildPdfIterationLines(comparison) {
  return [
    comparison.movementLabel,
    ...comparison.improved.map((item) => `What improved: ${item}`),
    ...comparison.holdingBack.map((item) => `Still holding score back: ${item}`),
    ...comparison.newRisks.map((item) => `New risk: ${item}`)
  ];
}

function createPdfReportPages() {
  const report = {
    width: 612,
    height: 792,
    margin: 40,
    y: 0,
    pages: [],
    current: null
  };
  addPdfReportPage(report);
  return report;
}

function addPdfReportPage(report) {
  report.current = [];
  report.pages.push(report.current);
  report.y = report.height - report.margin;
  pdfFillRect(report, 0, 0, report.width, report.height, "#08111f");
  pdfFillRect(report, 0, report.height - 160, report.width, 160, "#0f1f34");
  pdfStrokeLine(report, report.margin, report.height - 160, report.width - report.margin, report.height - 160, "#26364d", 1);
}

function pdfEnsureSpace(report, height) {
  if (report.y - height < report.margin) addPdfReportPage(report);
}

function pdfReportHeader(report, { title, timestamp, auditType, kpi, goal }) {
  pdfText(report, "COGNIX", report.margin, report.y, 13, "F2", "#dfe9ff");
  pdfText(report, title, report.margin, report.y - 30, 24, "F2", "#ffffff");
  pdfText(report, timestamp, report.margin, report.y - 52, 10, "F1", "#9fb0c8");
  pdfBadge(report, auditType, report.margin, report.y - 86, 250);
  pdfBadge(report, `KPI: ${kpi}`, report.margin + 268, report.y - 86, 264);
  pdfFillRect(report, report.margin, report.y - 132, 532, 34, "#162a43");
  pdfStrokeRect(report, report.margin, report.y - 132, 532, 34, "#304866", 0.8);
  pdfText(report, "Goal", report.margin + 12, report.y - 111, 8, "F2", "#8fc7ff");
  pdfWrappedText(report, goal, report.margin + 54, report.y - 111, 462, 8.5, "#d8e4f4", 10);
  report.y -= 176;
}

function pdfHeroScore(report, diagnosis) {
  pdfEnsureSpace(report, 164);
  const x = report.margin;
  const y = report.y - 154;
  pdfCard(report, x, y, 532, 150, { fill: "#0d1b2e", stroke: "#263a57" });
  pdfScoreRing(report, x + 75, y + 76, 48, diagnosis.predictabilityScore);
  pdfText(report, `${diagnosis.predictabilityScore}%`, x + 52, y + 70, 23, "F2", "#ffffff");
  pdfText(report, "Launch Predictability Score", x + 145, y + 102, 17, "F2", "#ffffff");
  pdfWrappedText(report, "Measures launch signal coherence for creating qualified demand. It is not a revenue forecast.", x + 145, y + 80, 330, 10, "#aebed5", 13);
  pdfText(report, diagnosis.verdict, x + 145, y + 36, 14, "F2", "#8fc7ff");
  report.y -= 170;
}

function pdfExecutiveBrief(report, diagnosis, brief) {
  pdfEnsureSpace(report, 330);
  const x = report.margin;
  let y = report.y - 142;
  pdfCard(report, x, y, 532, 128, { fill: "#0d1b2e", stroke: "#3c5f88" });
  pdfText(report, "Launch readiness verdict", x + 18, y + 96, 10, "F2", "#8fc7ff");
  pdfWrappedText(report, brief.readinessVerdict, x + 18, y + 72, 315, 19, "#ffffff", 22);
  pdfWrappedText(report, brief.decisionLine, x + 18, y + 28, 315, 9.5, "#d8e4f4", 12);
  pdfScoreRing(report, x + 438, y + 68, 42, diagnosis.predictabilityScore);
  pdfText(report, `${diagnosis.predictabilityScore}%`, x + 418, y + 63, 20, "F2", "#ffffff");
  pdfText(report, "Launch Predictability", x + 372, y + 20, 9, "F2", "#8fc7ff");
  report.y -= 150;

  y = report.y - 148;
  pdfCard(report, x, y, 532, 136, { fill: "#10223a", stroke: "#263a57" });
  pdfText(report, "Risk", x + 18, y + 104, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, diagnosis.verdict, x + 18, y + 84, 146, 12, "#ffffff", 15);
  pdfText(report, diagnosis.predictabilityScore >= 90 ? "Launch strength" : "Dominant fracture", x + 196, y + 104, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, primaryFractureLabel(diagnosis), x + 196, y + 84, 300, 11, "#ffffff", 14);
  pdfText(report, diagnosis.riskLabel === "Low" ? "Commercial readiness" : "Commercial risk", x + 18, y + 48, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, diagnosis.commercialImplication, x + 18, y + 29, 478, 8.6, "#d8e4f4", 11);
  report.y -= 158;

  pdfSectionCard(report, "Primary action before launch", [brief.primaryAction], { featured: true });
}

function pdfPageHeading(report, title, subtitle) {
  pdfText(report, "COGNIX", report.margin, report.y, 11, "F2", "#dfe9ff");
  pdfText(report, title, report.margin, report.y - 30, 22, "F2", "#ffffff");
  if (subtitle) pdfWrappedText(report, subtitle, report.margin, report.y - 52, 500, 10, "#9fb0c8", 12);
  report.y -= 82;
}

function pdfCardGrid(report, cards) {
  pdfEnsureSpace(report, 118);
  const gap = 12;
  const width = (532 - gap * 2) / 3;
  const y = report.y - 104;
  cards.forEach((card, index) => {
    const x = report.margin + index * (width + gap);
    pdfCard(report, x, y, width, 100, { fill: "#0d1b2e", stroke: "#263a57" });
    pdfText(report, card.title, x + 14, y + 74, 9, "F2", "#8fc7ff");
    pdfWrappedText(report, card.body, x + 14, y + 55, width - 28, 9, "#e8eef8", 12);
  });
  report.y -= 120;
}

function pdfSectionCard(report, title, paragraphs, options = {}) {
  const content = paragraphs.filter(Boolean);
  const lines = [];
  content.forEach((paragraph) => {
    const prefix = options.list ? "- " : "";
    lines.push(...wrapPdfText(`${prefix}${paragraph}`, options.list ? 84 : 88));
    lines.push("");
  });
  if (lines[lines.length - 1] === "") lines.pop();
  const height = Math.max(78, 44 + lines.length * 12);
  pdfEnsureSpace(report, height + 18);
  const y = report.y - height;
  pdfCard(report, report.margin, y, 532, height, {
    fill: options.featured ? "#10223a" : "#0d1b2e",
    stroke: options.featured ? "#3c5f88" : "#263a57"
  });
  pdfText(report, title, report.margin + 18, y + height - 24, 12, "F2", "#8fc7ff");
  let lineY = y + height - 44;
  lines.forEach((line) => {
    if (!line) {
      lineY -= 7;
      return;
    }
    pdfText(report, line, report.margin + 18, lineY, 9.5, "F1", "#e6eef8");
    lineY -= 12;
  });
  report.y -= height + 18;
}

function pdfCard(report, x, y, width, height, { fill, stroke }) {
  pdfFillRect(report, x, y, width, height, fill);
  pdfStrokeRect(report, x, y, width, height, stroke, 1);
}

function pdfBadge(report, text, x, y, width) {
  pdfFillRect(report, x, y, width, 24, "#162a43");
  pdfStrokeRect(report, x, y, width, 24, "#304866", 0.8);
  pdfWrappedText(report, text, x + 9, y + 15, width - 18, 7.8, "#c8d6e8", 10);
}

function pdfScoreRing(report, cx, cy, radius, score) {
  const segments = 90;
  const filled = Math.round((Math.max(0, Math.min(100, score)) / 100) * segments);
  for (let index = 0; index < segments; index += 1) {
    const start = (-90 + (index / segments) * 360) * Math.PI / 180;
    const end = (-90 + ((index + 0.72) / segments) * 360) * Math.PI / 180;
    const color = index < filled ? "#8fc7ff" : "#263a57";
    pdfStrokeLine(
      report,
      cx + Math.cos(start) * radius,
      cy + Math.sin(start) * radius,
      cx + Math.cos(end) * radius,
      cy + Math.sin(end) * radius,
      color,
      7
    );
  }
  pdfFillCircleApprox(report, cx, cy, radius - 18, "#0d1b2e");
}

function pdfWrappedText(report, text, x, y, width, size, color, leading = 12) {
  const maxChars = Math.max(18, Math.floor(width / (size * 0.48)));
  wrapPdfText(text, maxChars).forEach((line, index) => {
    pdfText(report, line, x, y - index * leading, size, "F1", color);
  });
}

function pdfText(report, text, x, y, size, font, color) {
  report.current.push(`BT ${pdfColor(color, "fill")} /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(normalizeAcronyms(text))}) Tj ET`);
}

function pdfFillRect(report, x, y, width, height, color) {
  report.current.push(`${pdfColor(color, "fill")} ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re f`);
}

function pdfStrokeRect(report, x, y, width, height, color, lineWidth) {
  report.current.push(`${pdfColor(color, "stroke")} ${lineWidth} w ${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re S`);
}

function pdfStrokeLine(report, x1, y1, x2, y2, color, lineWidth) {
  report.current.push(`${pdfColor(color, "stroke")} 1 J ${lineWidth} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
}

function pdfFillCircleApprox(report, cx, cy, radius, color) {
  const points = Array.from({ length: 48 }, (_item, index) => {
    const angle = (index / 48) * Math.PI * 2;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  });
  const path = points.map(([x, y], index) => `${x.toFixed(2)} ${y.toFixed(2)} ${index ? "l" : "m"}`).join(" ");
  report.current.push(`${pdfColor(color, "fill")} ${path} h f`);
}

function pdfColor(hex, type) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} ${type === "stroke" ? "RG" : "rg"}`;
}

function serializeBrandedPdf(pages, pageWidth, pageHeight) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pages.map((_page, index) => `${3 + index * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`
  ];
  pages.forEach((commands, index) => {
    const pageObjectNumber = 3 + index * 2;
    const contentObjectNumber = pageObjectNumber + 1;
    const stream = commands.join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents ${contentObjectNumber} 0 R >>`);
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });
  return serializePdfObjects(objects);
}

function buildAuditPdfText(diagnosis, generatedAt) {
  const pre = diagnosis.mode === "pre";
  const auditType = pre ? "Pre-launch risk analysis" : "Post-launch diagnosis";
  const launchAudited = detectAuditedLaunch(diagnosis);
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  const memorySummary = [
    `Launch audited: ${launchAudited}`,
    `Strategy-to-market read: ${architecture.coherenceRead}`,
    `Commercial implication: ${architecture.commercialPanel.body}`,
    `Buyer-facing rewrite: ${architecture.rewritePanel.sayThis}`,
    `CTA action: ${architecture.ctaPanel.sayThis}`
  ];

  return [
    { type: "title", text: "Cognix" },
    { type: "heading", text: "Cognix pre-launch coherence audit" },
    { type: "meta", text: formatGeneratedTimestamp(generatedAt) },
    { type: "space" },
    { type: "section", text: "Audit context" },
    { type: "body", text: `Audit type: ${auditType}` },
    { type: "body", text: `KPI: ${state.selectedKpi || "Demo intent"}` },
    { type: "body", text: `Goal: ${state.targetGoal || "Not specified"}` },
    { type: "body", text: `Launch Predictability Score: ${diagnosis.predictabilityScore}%` },
    { type: "body", text: `Signal coverage: ${diagnosis.signalCoverage.label}. ${diagnosis.signalCoverage.note}` },
    { type: "space" },
    { type: "section", text: "Launch conversion verdict" },
    { type: "body", text: diagnosis.verdict },
    { type: "body", text: `Demo intent risk: ${diagnosis.demoIntentRisk}` },
    { type: "body", text: `Dominant contradiction: ${diagnosis.pattern}` },
    { type: "space" },
    { type: "section", text: "Evidence from launch signals" },
    ...pdfListItems(diagnosis.evidence.map((item) => `${item.source}: ${item.snippet}`)),
    { type: "space" },
    { type: "section", text: "Strategy-to-market coherence read" },
    { type: "body", text: architecture.coherenceRead },
    { type: "space" },
    { type: "section", text: diagnosis.riskLabel === "Low" ? "Commercial readiness" : "Commercial risk" },
    { type: "body", text: architecture.commercialPanel.body },
    { type: "space" },
    { type: "section", text: "PMM action plan" },
    ...pdfListItems(diagnosis.actions.map(sharpenAction)),
    { type: "space" },
    { type: "section", text: "Instead of / Say this" },
    { type: "body", text: `Instead of: ${architecture.rewritePanel.instead}` },
    { type: "body", text: `Say this: ${architecture.rewritePanel.sayThis}` },
    { type: "space" },
    { type: "section", text: "Strategic alignment & resource brief" },
    { type: "body", text: architecture.resourceBrief },
    { type: "space" },
    { type: "section", text: "Memory-ready summary" },
    ...pdfListItems(memorySummary)
  ];
}

function pdfListItems(items) {
  const values = items.filter(Boolean);
  return values.length
    ? values.map((text) => ({ type: "bullet", text }))
    : [{ type: "body", text: "No evidence available." }];
}

function buildTextPdf(blocks) {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 54;
  const bottomMargin = 54;
  const maxWidth = 78;
  const pages = [];
  let page = [];
  let y = pageHeight - margin;

  const addLine = (text, options = {}) => {
    const size = options.size || 10;
    const leading = options.leading || size + 5;
    if (y - leading < bottomMargin) {
      pages.push(page);
      page = [];
      y = pageHeight - margin;
    }
    page.push({ text, x: options.x || margin, y, size, font: options.font || "F1" });
    y -= leading;
  };

  blocks.forEach((block) => {
    if (block.type === "space") {
      y -= 8;
      return;
    }

    const options = pdfTextOptions(block.type);
    const prefix = block.type === "bullet" ? "- " : "";
    const indent = block.type === "bullet" ? 14 : 0;
    const text = String(block.text || "");
    const paragraphs = text.split(/\n+/).map((item) => item.trim()).filter(Boolean);

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const wrapped = wrapPdfText(`${paragraphIndex === 0 ? prefix : ""}${paragraph}`, options.maxChars || maxWidth);
      wrapped.forEach((line, lineIndex) => {
        addLine(line, {
          x: margin + (lineIndex > 0 && block.type === "bullet" ? indent : 0),
          size: options.size,
          leading: options.leading,
          font: options.font
        });
      });
      if (block.type === "section" || block.type === "heading") y -= 3;
    });
  });
  if (page.length) pages.push(page);

  return serializePdf(pages, pageWidth, pageHeight);
}

function pdfTextOptions(type) {
  if (type === "title") return { size: 14, leading: 20, font: "F2", maxChars: 60 };
  if (type === "heading") return { size: 18, leading: 26, font: "F2", maxChars: 52 };
  if (type === "section") return { size: 12, leading: 20, font: "F2", maxChars: 68 };
  if (type === "meta") return { size: 10, leading: 16, font: "F1", maxChars: 78 };
  if (type === "bullet") return { size: 10, leading: 15, font: "F1", maxChars: 76 };
  return { size: 10, leading: 15, font: "F1", maxChars: 82 };
}

function wrapPdfText(text, maxChars) {
  const words = String(text || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function serializePdf(pages, pageWidth, pageHeight) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pages.map((_page, index) => `${3 + index * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`
  ];

  pages.forEach((lines, index) => {
    const pageObjectNumber = 3 + index * 2;
    const contentObjectNumber = pageObjectNumber + 1;
    const stream = [
      "BT",
      ...lines.map((line) => `/${line.font} ${line.size} Tf 1 0 0 1 ${line.x} ${line.y} Tm (${escapePdfText(line.text)}) Tj`),
      "ET"
    ].join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents ${contentObjectNumber} 0 R >>`);
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });
  return serializePdfObjects(objects);
}

function serializePdfObjects(objects) {
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Uint8Array([...pdf].map((char) => char.charCodeAt(0)));
}

function escapePdfText(text) {
  return String(text || "")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function detectAuditedLaunch(diagnosis) {
  const productName = extractProductName(diagnosis.beforeMessage);
  if (productName && productName !== "this launch" && productName !== "the launch" && isReliableLaunchName(productName)) return productName;
  const message = diagnosis.beforeMessage || "";
  if (/cognix/i.test(message)) return "Launch Conversion Audit";
  return "Current launch concept";
}

function isReliableLaunchName(value) {
  const name = String(value || "").trim();
  if (!name || name.length < 3 || name.length > 64) return false;
  if (/^(faster|soon|current|this|the|launch|release|feature|product|message|page|copy)\b/i.test(name)) return false;
  if (name.split(/\s+/).length > 6) return false;
  return /^[A-Z0-9][A-Za-z0-9&.\- ]+$/.test(name);
}

function formatGeneratedTimestamp(date) {
  const month = date.toLocaleString(undefined, { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `Generated ${month} ${day}, ${year} at ${hours}:${minutes} ${suffix}`;
}

function auditPdfFilename(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `cognix-launch-conversion-audit-${year}-${month}-${day}-${hours}${minutes}.pdf`;
}

render();
