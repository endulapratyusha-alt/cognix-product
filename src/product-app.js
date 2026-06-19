const launchStages = [
  {
    id: "pre",
    title: "Story gap detection",
    label: "Primary beta workflow",
    description: "Find where launch strategy, buyer-facing copy, proof, and sales reality stop lining up before activation."
  },
  {
    id: "post",
    title: "Post-launch story check",
    label: "Secondary mode",
    description: "Find where buyer-facing execution is diluting launch outcomes after activity begins."
  }
];

const previewMaps = [
  "Launch risk found",
  "Receipts",
  "Suggested owner + approval path",
  "Recheck revised launch assets"
];

const previewMessage = "Cognix PMM is being shaped with beta users. Start by finding the launch risk first.";

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
const synthesisGuardrailNotice = "Cognix diagnostic notice: static extraction ledger active";

const bucketSets = {
  pre: [
    ["launch-message", "Launch message or positioning draft", "Paste the launch narrative, messaging framework, or positioning direction your team is planning to take to market.", ["launch", "release", "announce", "feature", "capability", "shipped", "positioning", "headline"]],
    ["target-buyer", "Target buyer or ICP", "Paste the buyer, segment, persona, company stage, trigger, or account profile this launch is meant to convert.", ["buyer", "icp", "persona", "segment", "role", "cmo", "vp", "pmm", "mid-market", "enterprise", "startup"]],
    ["buyer-pain", "Buyer pain", "Paste the pain your buyer actually feels before they care about this launch. Include urgency, business impact, or internal pressure if available.", ["pain", "problem", "manual", "slow", "risk", "cost", "waste", "miss", "confusion", "struggle", "broken"]],
    ["value-prop", "Buyer outcome / why now", "Paste the reason this launch matters now, what changes for the buyer, and what pressure makes inaction costly.", ["value", "helps", "reduce", "increase", "improve", "accelerate", "outcome", "benefit", "roi", "impact"]],
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
  "Qualified demo requests",
  "Qualified demo conversion",
  "Launch-sourced opportunities",
  "Pipeline influenced",
  "Campaign spend efficiency",
  "Trial conversion",
  "Expansion pipeline",
  "Renewal protection",
  "Churn reduction",
  "Demo-to-opportunity conversion",
  "Sales enablement adoption",
  "Competitive displacement",
  "Category awareness",
  "Other"
];

const commercialInputFields = [
  { id: "launchSpend", label: "Launch spend", placeholder: "$20,000" },
  { id: "demoTarget", label: "Demo target", placeholder: "40" },
  { id: "pipelineTarget", label: "Pipeline target", placeholder: "$500,000" },
  { id: "averageDealSize", label: "Average deal size", placeholder: "$50,000" },
  { id: "averageOpportunityValue", label: "Average opportunity value", placeholder: "$50,000" },
  { id: "currentConversionRate", label: "Current conversion rate", placeholder: "3.5%" },
  { id: "pastLaunchBenchmark", label: "Past launch benchmark", placeholder: "28 demos" },
  { id: "renewalValueAtRisk", label: "Renewal value at risk", placeholder: "$250,000" },
  { id: "targetAccountCount", label: "Target account count", placeholder: "300" },
  { id: "campaignDuration", label: "Campaign horizon days", placeholder: "45 days" }
];

const launchDecisionPathOptions = [
  {
    id: "solo_exec_approval",
    title: "Solo execution, exec approval",
    description: "I do most of the work, but founder/CMO/C-suite approves key calls."
  },
  {
    id: "ic_multi_level_approval",
    title: "IC PMM, multi-level approval",
    description: "I recommend changes, but directors/leaders approve."
  },
  {
    id: "pmm_cross_functional",
    title: "PMM-led cross-functional team",
    description: "PMM coordinates marketing, sales, enablement, product, and exec stakeholders."
  },
  {
    id: "director_head_pmm",
    title: "Director / Head of PMM",
    description: "I assign workstreams and need decision visibility across teams."
  },
  {
    id: "messy_unknown",
    title: "Messy / not sure",
    description: "Ownership is unclear or changes by launch."
  }
];

const loadingSteps = [
  "Sorting launch signals into GTM inputs",
  "Checking launch risks with receipts",
  "Identifying KPI at risk",
  "Estimating what the gap could cost",
  "Creating fix status and approval path"
];

const sourceSurfaces = [
  {
    id: "strategy",
    title: "Strategy",
    examples: "Launch goal, ICP, positioning, category narrative.",
    bucketIds: ["launch-message", "target-buyer", "buyer-pain", "value-prop"]
  },
  {
    id: "execution",
    title: "Campaign/page execution",
    examples: "Landing page, CTA, campaign copy, ad copy, email copy.",
    bucketIds: ["campaign-copy", "cta", "competitive-framing"]
  },
  {
    id: "field",
    title: "Sales reality",
    examples: "Objections, talk track, sales notes, call feedback.",
    bucketIds: ["sales-talk-track", "objections", "sales-feedback", "crm-notes", "pipeline-signal"]
  },
  {
    id: "proof",
    title: "Proof",
    examples: "Customer proof, metrics, case studies, business outcomes.",
    bucketIds: ["customer-proof", "prospect-reactions"]
  },
  {
    id: "metrics",
    title: "Launch economics",
    examples: "Budget, demo target, pipeline target, conversion benchmark.",
    bucketIds: ["launch-goal", "demo-result", "campaign-engagement", "landing-conversion", "pipeline-signal"]
  }
];

const recheckAssetFields = [
  { id: "hero", label: "Revised hero copy" },
  { id: "cta", label: "Revised CTA" },
  { id: "salesTalkTrack", label: "Revised sales talk track" },
  { id: "campaignCopy", label: "Revised campaign copy" },
  { id: "founderPost", label: "Revised founder / executive post" },
  { id: "salesDeck", label: "Revised sales deck snippet" },
  { id: "outboundCopy", label: "Revised outbound copy" }
];

const state = {
  step: 0,
  launchMode: "pre",
  previewMap: "",
  selectedKpi: "",
  launchDecisionPath: "solo_exec_approval",
  workspaceName: "Cognix PMM workspace",
  motionName: "",
  targetGoal: "Protect qualified GTM conversion before spend scales",
  commercialInputs: Object.fromEntries(commercialInputFields.map((field) => [field.id, ""])),
  recheckInputs: Object.fromEntries(recheckAssetFields.map((field) => [field.id, ""])),
  recheckResult: null,
  signals: {},
  intakeDump: "",
  attachedFiles: [],
  sortMessage: "No launch signals sorted yet.",
  loadingIndex: 0,
  actionMessage: "",
  diagnosis: null,
  selectedSignal: "",
  showBuyerCopy: false,
  hasAnalyzedSignals: false,
  inputMode: "full",
  pendingFocus: "",
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
          <span>Cognix PMM</span>
          <strong>Find launch story gaps before pipeline waste.</strong>
        </div>
        <button class="ghost-button" type="button" data-action="reset">New workspace</button>
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
  applyPendingFocus();
}

function progressRail() {
  const labels = [
    "Launch inputs",
    "Risk check",
    "Evidence trail",
    "Fix plan",
    "Decision brief"
  ];
  const activeStep = state.step === 0 && state.hasAnalyzedSignals ? 1 : state.step;
  return `
    <aside class="progress-rail" aria-label="Cognix PMM workflow">
      ${labels.map((label, index) => `
        <button class="rail-step ${index === activeStep ? "active" : ""} ${index < activeStep ? "done" : ""}" type="button" data-jump="${index}" ${index > activeStep ? "disabled" : ""}>
          <span>${index + 1}</span>
          <strong>${esc(label)}</strong>
        </button>`).join("")}
    </aside>`;
}

function renderCurrentStep() {
  if (state.step === 0) return exposureOnboardingScreen();
  if (state.step === 1) return addSignalsScreen();
  if (state.step === 2) return runFractureMapScreen();
  return resultScreen();
}

function exposureOnboardingScreen() {
  return `
    <section class="exposure-onboarding">
      <div class="exposure-onboarding-hero">
        <span class="eyebrow">Cognix PMM</span>
        <h1>Find what may break before you launch.</h1>
        <p>Compare GTM inputs or paste a messy launch dump. Cognix PMM identifies launch risks, shows the receipts, and gives you the exact fixes to make before spend scales.</p>
        <div class="commercial-risk-signal">Built to protect campaign spend, qualified demo conversion, and launch confidence.</div>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-action="go-add-inputs">Check launch risk</button>
          <button class="ghost-button" type="button" data-action="load-signaldesk-sample">Load sample</button>
        </div>
      </div>

      <div class="input-mode-grid">
        <article>
          <span>Asset check</span>
          <h2>Check two launch assets</h2>
          <p>Use this when you want to test whether two GTM pieces are aligned before launch.</p>
          <ul>
            <li>Positioning vs CTA</li>
            <li>ICP vs proof</li>
            <li>Launch goal vs campaign copy</li>
            <li>Sales objection vs homepage story</li>
          </ul>
          <button class="ghost-button" type="button" data-action="open-compare-inputs">Check two assets</button>
        </article>
        <article>
          <span>Launch scan</span>
          <h2>Scan a messy launch dump</h2>
          <p>Use this when launch reality is scattered across founder notes, sales feedback, page drafts, proof, metrics, and campaign copy.</p>
          <ul>
            <li>Slack debates</li>
            <li>Founder comments</li>
            <li>Sales feedback</li>
            <li>Landing page drafts</li>
            <li>Launch notes</li>
            <li>Metrics</li>
          </ul>
          <button class="ghost-button" type="button" data-action="open-messy-dump">Scan launch dump</button>
        </article>
      </div>

      <div class="minimal-workspace-setup" aria-label="Workspace setup">
        <label>
          <span>Workspace name</span>
          <input type="text" data-workspace-name value="${esc(state.workspaceName)}" placeholder="Cognix PMM workspace" />
        </label>
        <label>
          <span>Launch / campaign / GTM motion name</span>
          <input type="text" data-motion-name value="${esc(state.motionName)}" placeholder="SignalDesk renewal-risk launch" />
        </label>
        <label>
          <span>Primary KPI</span>
          <select data-primary-kpi-inline>
            <option value="">Infer from source receipts</option>
            ${launchKpis.map((kpi) => `<option value="${esc(kpi)}" ${kpi === state.selectedKpi ? "selected" : ""}>${esc(kpi)}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>Launch goal</span>
          <input type="text" data-goal-inline value="${esc(state.targetGoal)}" placeholder="Protect qualified demo conversion before spend scales" />
        </label>
      </div>

      <div class="outcome-preview">
        ${[
          ["Launch risk found", "Detect the fracture before activation."],
          ["Evidence trail", "See the exact lines causing risk."],
          ["Exact fixes", "Know what to change and who owns it."],
          ["Recheck assets", "Validate revised copy against the original risk."],
          ["Launch decision brief", "Send a clear decision to leadership."]
        ].map(([item, description]) => `
          <article>
            <span>${esc(item)}</span>
            <p>${esc(description)}</p>
          </article>`).join("")}
      </div>
    </section>`;
}

function stageScreen() {
  return `
    <div class="stage-header">
      <span class="eyebrow">GTM fracture detection beta</span>
      <h1>Find where your GTM story breaks before the market does.</h1>
      <p>Cognix compares launch goal, ICP, buyer pain, positioning, proof, objections, CTA, and sales narrative to detect contradictions before pipeline exposes them.</p>
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
    ${stageActions({ next: state.launchMode === "pre" ? "Start GTM fracture detection" : "Start GTM contradiction detection" })}`;
}

function addSignalsScreen() {
  const buckets = activeBuckets();
  const attachedCount = state.attachedFiles.length;
  const sortedCount = meaningfulAreas().length;
  const selectedBucket = buckets.find((bucket) => bucket.id === state.selectedSignal);
  const coverage = signalCoverageStats(buckets);
  const isMessyMode = state.inputMode === "messy";
  const hasSortedMessyDump = isMessyMode && state.hasAnalyzedSignals;
  const isStructuredMode = !isMessyMode;
  const headline = isMessyMode
    ? hasSortedMessyDump ? "Review sorted launch inputs" : "Add launch inputs"
    : "Add launch inputs";
  const eyebrow = isMessyMode ? "Messy launch dump" : "Add launch inputs";
  const description = isMessyMode
    ? "Paste the scattered launch reality first. Cognix PMM will sort it into GTM inputs before finding launch risk."
    : "Cognix PMM compares your launch goal, buyer, CTA, proof, sales feedback, and business context to find story gaps before they become pipeline waste.";
  return `
    <section class="signals-context-board" data-drop-zone>
      <div class="stage-header intake-hero">
        <span class="eyebrow">${esc(eyebrow)}</span>
        <h1>${esc(headline)}</h1>
        <p>${esc(description)}</p>
      </div>

      ${isMessyMode ? messyDumpInputCard() : ""}

      ${isStructuredMode || hasSortedMessyDump ? `
      <div class="signals-workspace-layout ${hasSortedMessyDump ? "sorted-inputs-layout" : ""}">
        <div class="signals-main-zone">
          <div class="surface-section-head">
            <div>
              <span>${hasSortedMessyDump ? "Sorted GTM inputs" : "GTM inputs"}</span>
              <h2>${hasSortedMessyDump ? "Sorted GTM inputs" : "GTM inputs"}</h2>
            </div>
            <p>${hasSortedMessyDump
              ? "Review the auto-sorted strategy, execution, field reality, proof, and launch economics before running the launch-risk check."
              : "Separate the launch inputs so Cognix PMM can compare strategy, buyer-facing execution, sales reality, proof, and launch economics."}</p>
          </div>
          ${state.inputMode === "compare" ? compareInputsPanel() : ""}
          ${sourceSurfaceWorkspace()}
        </div>
        ${signalEvidencePanel({ buckets, coverage })}
      </div>` : ""}

      ${isStructuredMode ? messyDumpInputCard({ compact: true }) : ""}

      ${businessContextPanel()}

      ${launchDecisionPathPanel()}

      ${state.hasAnalyzedSignals ? postAnalysisSignalMap({ buckets, attachedCount, sortedCount, coverage }) : ""}

      <div class="stage-actions board-run-actions">
        <button class="ghost-button" type="button" data-action="back">Back</button>
        ${isStructuredMode || hasSortedMessyDump ? `<button class="primary-button" type="button" data-action="find-gap">Find launch risk</button>` : ""}
      </div>

      ${selectedBucket ? signalSharpenerDrawer(selectedBucket) : ""}
    </section>`;
}

function messyDumpInputCard({ compact = false } = {}) {
  return `
    <div class="command-card messy-dump-card ${compact ? "secondary-dump-card" : "primary-dump-card"}">
      <label class="command-input">
        <span>Have a messy launch dump?</span>
        <small>Paste founder comments, Slack debates, launch notes, page copy, CTAs, sales feedback, proof points, or metrics. Cognix PMM will sort the dump into GTM inputs before finding launch risk.</small>
        <textarea data-intake-dump placeholder="Paste messy launch dump here. Cognix PMM will sort before finding launch risk.">${esc(state.intakeDump)}</textarea>
      </label>
      <div class="command-actions">
        <button class="primary-button" type="button" data-action="sort-signals">Auto-sort launch inputs</button>
        <button class="ghost-button" type="button" data-action="load-sample-signals">Load sample</button>
        <button class="ghost-button" type="button" data-action="toggle-buyer-copy">${state.showBuyerCopy ? "Hide exact buyer-facing copy" : "Add exact buyer-facing copy"}</button>
        <label class="text-button file-button" for="signal-files">Attach files</label>
      </div>
      <p class="command-reassurance">Cognix PMM sorts the dump into GTM inputs before the launch-risk check. It compares launch inputs against each other, not in isolation.</p>
      ${state.hasAnalyzedSignals && state.sortMessage ? `<p class="sort-confirmation">${esc(state.sortMessage)}</p>` : ""}
      <input id="signal-files" class="file-input" type="file" multiple data-file-input />
    </div>`;
}

function businessContextPanel() {
  return `
    <section class="business-context-panel">
      <div class="commercial-context-head">
        <div>
          <span>Commercial context</span>
          <h2>Launch economics</h2>
        </div>
        <p>Optional. These numbers help Cognix PMM estimate what the story gap could cost if it ships unfixed.</p>
      </div>
      <div class="commercial-input-grid" aria-label="Optional commercial context">
        ${commercialInputFields.map((field) => `
          <label>
            <span>${esc(field.label)}</span>
            <input type="text" data-commercial-input="${esc(field.id)}" value="${esc(state.commercialInputs[field.id] || "")}" placeholder="${esc(field.placeholder)}" inputmode="decimal" />
          </label>`).join("")}
      </div>
    </section>`;
}

function launchDecisionPathPanel() {
  return `
    <section class="launch-decision-path-panel" aria-label="Launch decision path">
      <div class="commercial-context-head">
        <div>
          <span>Launch decision path</span>
          <h2>How does this launch get decided?</h2>
        </div>
        <p>This helps Cognix PMM shape the owner and approval path in the Launch Fracture Brief.</p>
      </div>
      <div class="launch-decision-path-grid">
        ${launchDecisionPathOptions.map((option) => `
          <label class="decision-path-option ${state.launchDecisionPath === option.id ? "selected" : ""}">
            <input type="radio" name="launch-decision-path" value="${esc(option.id)}" ${state.launchDecisionPath === option.id ? "checked" : ""} data-launch-decision-path />
            <span>${esc(option.title)}</span>
            <p>${esc(option.description)}</p>
          </label>`).join("")}
      </div>
    </section>`;
}

function compareInputsPanel() {
  return `
    <section class="compare-inputs-panel" aria-label="Compare two launch inputs">
      <div class="surface-section-head compact">
        <div>
          <span>Compare two inputs</span>
          <h2>Test one launch asset against another.</h2>
        </div>
        <p>Paste two inputs, then run Cognix PMM against the same story-gap engine.</p>
      </div>
      <div class="compare-input-grid">
        <label>
          <span>Input 1</span>
          <small>Example: positioning, ICP, launch goal, or sales objection.</small>
          <textarea data-compare-input="left" placeholder="Paste the first launch input.">${esc(state.signals["launch-message"] || "")}</textarea>
        </label>
        <label>
          <span>Input 2</span>
          <small>Example: CTA, proof, campaign copy, or homepage story.</small>
          <textarea data-compare-input="right" placeholder="Paste the second launch input.">${esc(state.signals["campaign-copy"] || state.signals.cta || "")}</textarea>
        </label>
      </div>
    </section>`;
}

function signalEvidencePanel({ buckets, coverage }) {
  const required = [
    ["Launch goal", ["launch-goal"]],
    ["Buyer or ICP", ["target-buyer"]],
    ["CTA", ["cta"]],
    ["Sales objection or field feedback", ["sales-talk-track", "objections", "sales-feedback"]],
    ["Proof or metric", ["customer-proof", "launch-goal", "demo-result"]]
  ];
  const completion = required.map(([label, ids]) => {
    const added = ids.some((id) => {
      const bucket = buckets.find((item) => item.id === id) || { id };
      return isFilledSignalBucket(bucket);
    });
    return { label, added };
  });
  const strength = completion.filter((item) => item.added).length;
  const strengthLabel = strength >= 4 ? "Strong" : strength >= 3 ? "Usable" : strength >= 2 ? "Partial" : "Needs evidence";
  return `
    <aside class="signal-evidence-panel" aria-label="What Cognix PMM needs">
      <div class="panel-kicker">What Cognix PMM needs</div>
      <h2>A real story gap needs more than one input.</h2>
      <p>Add enough evidence for Cognix PMM to compare what the launch says, what buyers see, what sales hears, and what revenue depends on.</p>
      <div class="evidence-checklist">
        ${completion.map((item) => `
          <div class="${item.added ? "added" : ""}">
            <i aria-hidden="true"></i>
            <span>${esc(item.label)}</span>
            <b>${item.added ? "Added" : "Needed"}</b>
          </div>`).join("")}
      </div>
      <div class="signal-strength-card">
        <span>Evidence strength</span>
        <strong>${esc(strengthLabel)}</strong>
        <p>${coverage.found} of ${coverage.total} launch inputs have usable evidence.</p>
      </div>
      <div class="why-cognix-card">
        <span>Why this matters</span>
        <p>ChatGPT can critique a page. Cognix PMM compares launch inputs against each other to find the contradiction that can waste launch spend.</p>
      </div>
    </aside>`;
}

function postAnalysisSignalMap({ buckets, attachedCount, sortedCount, coverage }) {
  const found = buckets.filter((bucket) => isFilledSignalBucket(bucket));
  const needed = neededNextSignalBuckets(buckets);
  const optional = buckets.filter((bucket) => ["sales-talk-track", "objections", "competitive-framing"].includes(bucket.id) && !isFilledSignalBucket(bucket));
  return `
    <section class="post-analysis-map" aria-label="Signal map">
      <div class="post-map-head">
        <div>
          <strong>Signal map</strong>
          <span>Cognix PMM split the messy paste into the inputs needed to compare internal strategy against buyer-facing execution.</span>
        </div>
        <em>${coverage.found} of ${coverage.total} surfaces detected</em>
      </div>
      <div class="post-map-sections">
        <article>
          <span>Found</span>
          <div class="signal-pill-row">
            ${found.length ? found.map((bucket) => signalPill(bucket, "found")).join("") : `<small>Cognix will map signals after it has enough context.</small>`}
          </div>
        </article>
        <article>
          <span>Needed next</span>
          <div class="signal-pill-row">
            ${needed.map((bucket) => signalPill(bucket, "needed")).join("")}
          </div>
        </article>
        <article>
          <span>Optional</span>
          <div class="signal-pill-row">
            ${optional.map((bucket) => signalPill(bucket, "optional")).join("")}
          </div>
        </article>
      </div>
      ${sortedCount < 3 ? insufficientSignalCard() : `
        <div class="post-map-ready">
          <p>${esc(state.sortMessage || `${attachedCount} files attached`)}</p>
        </div>`}
    </section>`;
}

function sourceSurfaceWorkspace() {
  return `
    <section class="source-surface-workspace" aria-label="GTM launch inputs">
      ${sourceSurfaces.map((surface) => {
        const content = sourceSurfaceText(surface);
        const status = content ? "Added" : surface.id === "strategy" || surface.id === "execution" || surface.id === "field" ? "Required for receipts" : "Empty";
        const shortTitle = surface.title.replace(/ surface$/i, "");
        return `
          <article class="source-surface-card ${content ? "filled" : ""}">
            <div class="surface-card-top">
              <div>
                <span>${esc(shortTitle)}</span>
                <small>${esc(surface.examples)}</small>
              </div>
              <em>${esc(status)}</em>
            </div>
            <textarea data-source-surface="${esc(surface.id)}" placeholder="Add ${esc(shortTitle.toLowerCase())} here.">${esc(content)}</textarea>
          </article>`;
      }).join("")}
    </section>`;
}

function sourceSurfaceText(surface) {
  return surface.bucketIds
    .map((id) => state.signals[id])
    .filter((value, index, array) => value && array.indexOf(value) === index)
    .join("\n\n");
}

function applySourceSurfaceText(surfaceId, value) {
  const surface = sourceSurfaces.find((item) => item.id === surfaceId);
  if (!surface) return;
  const target = surface.bucketIds[0];
  state.signals[target] = value;
  state.diagnosis = null;
}

function insufficientSignalCard() {
  return `
    <section class="insufficient-signal-card">
      <div class="insufficient-copy">
        <span>More evidence needed</span>
        <h2>Cognix PMM needs more evidence before calling a story gap.</h2>
        <p>We do not guess from one weak signal. Add at least two launch inputs so Cognix PMM can compare your goal, buyer, CTA, proof, and sales reality.</p>
      </div>
      <div class="insufficient-grid">
        <article>
          <span>Evidence found</span>
          <strong>${meaningfulAreas().length || 0} launch inputs</strong>
        </article>
        <article>
          <span>Needed</span>
          <strong>Add launch goal, buyer, CTA, proof, or sales feedback.</strong>
        </article>
      </div>
      <div class="paused-next-actions">
        <button class="primary-button" type="button" data-action="add-more-context">Add more evidence</button>
        <button class="ghost-button" type="button" data-action="load-sample-signals">Load sample</button>
      </div>
    </section>`;
}

function signalPill(bucket, stateLabel) {
  return `
    <button class="analysis-signal-pill ${esc(stateLabel)}" type="button" data-signal-focus="${esc(bucket.id)}">
      <i aria-hidden="true"></i>
      <strong>${esc(signalSurfaceLabel(bucket.id, bucket.title))}</strong>
    </button>`;
}

function isFilledSignalBucket(bucket) {
  return isMeaningfulSignalText(state.signals[bucket.id]) || (bucket.id === "cta" && isMeaningfulShortSignal({ id: bucket.id, text: state.signals[bucket.id] || "" }));
}

function neededNextSignalBuckets(buckets) {
  const priority = ["launch-message", "buyer-pain", "target-buyer", "customer-proof", "cta", "launch-goal"];
  return priority
    .map((id) => buckets.find((bucket) => bucket.id === id))
    .filter((bucket) => bucket && !isFilledSignalBucket(bucket))
    .slice(0, 3);
}

function missingSignalTitles() {
  return activeBuckets()
    .filter((bucket) => !isMeaningfulSignalText(state.signals[bucket.id]) && !(bucket.id === "cta" && isMeaningfulShortSignal({ id: bucket.id, text: state.signals[bucket.id] || "" })))
    .map((bucket) => bucket.title);
}

function bestNextSignals() {
  return ["Internal strategy note", "Buyer pain", "CTA or proof"];
}

function signalSharpenerDrawer(bucket) {
  const content = state.signals[bucket.id] || "";
  const attached = state.attachedFiles.filter((file) => file.bucketId === bucket.id);
  return `
    <aside class="signal-drawer ${content || attached.length ? "filled" : ""}" aria-label="Sharpen signal">
      <div class="bucket-head">
        <span>Sharpen this signal</span>
        <button class="icon-button" type="button" data-action="close-signal-drawer" aria-label="Close signal drawer">×</button>
        <strong>${attached.length + (content ? 1 : 0)}</strong>
      </div>
      <h3>Sharpen ${esc(signalSurfaceLabel(bucket.id, bucket.title).toLowerCase())}</h3>
      <p>${esc(bucket.description)}</p>
      ${attached.length ? `
        <div class="attached-list">
          ${attached.map((file) => `<small>${esc(file.name)}</small>`).join("")}
        </div>` : ""}
      <textarea data-bucket="${esc(bucket.id)}" aria-label="${esc(bucket.title)} signal area">${esc(content)}</textarea>
      <button class="ghost-button" type="button" data-action="save-signal">Save signal</button>
    </aside>`;
}

function signalCoverageMap(buckets = activeBuckets()) {
  return `
    <div class="signal-map" aria-label="Ingested Signal Coverage map">
      ${buckets.map((bucket) => {
        const filled = isMeaningfulSignalText(state.signals[bucket.id]) || (bucket.id === "cta" && isMeaningfulShortSignal({ id: bucket.id, text: state.signals[bucket.id] || "" }));
        const optional = ["competitive-framing", "objections"].includes(bucket.id);
        const stateLabel = filled ? "found" : optional ? "optional" : "needed";
        return `
          <button class="signal-map-node ${filled ? "filled" : optional ? "optional" : ""} ${state.selectedSignal === bucket.id ? "selected" : ""}" type="button" data-signal-focus="${esc(bucket.id)}">
            <i aria-hidden="true"></i>
            <strong>${esc(signalSurfaceLabel(bucket.id, bucket.title))}</strong>
            <span>${stateLabel}</span>
          </button>`;
      }).join("")}
    </div>`;
}

function signalCoverageStats(buckets = activeBuckets()) {
  const found = buckets.filter((bucket) => isMeaningfulSignalText(state.signals[bucket.id]) || (bucket.id === "cta" && isMeaningfulShortSignal({ id: bucket.id, text: state.signals[bucket.id] || "" }))).length;
  return { found, total: buckets.length };
}

function signalSurfaceLabel(id, fallback) {
  const labels = {
    "launch-message": "Internal strategy",
    "target-buyer": "Buyer",
    "buyer-pain": "Buyer pain",
    "value-prop": "Why now",
    "campaign-copy": "Buyer-facing copy",
    cta: "CTA",
    "sales-talk-track": "Sales narrative",
    objections: "Objections",
    "competitive-framing": "Competition",
    "customer-proof": "Proof",
    "launch-goal": "Launch goal"
  };
  return labels[id] || fallback;
}

function previewMapsBlock() {
  return `
    <div class="preview-map-block">
      <div class="digest-section-head">
        <span>Future fracture maps</span>
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
      <h1>${pre ? "Find the risk before launch spend goes live." : "Validate the launch-to-pipeline risk."}</h1>
      <p>Cognix PMM connects the launch signal to KPI risk, what it could cost, the fix path, and the metrics to watch after launch.</p>
    </div>
    <div class="kpi-layout">
      <label class="goal-card kpi-select-card">
        <span>Primary KPI</span>
        <select data-primary-kpi>
          <option value="">Infer from launch goal and pasted signals</option>
          ${launchKpis.map((kpi) => `<option value="${esc(kpi)}" ${kpi === state.selectedKpi ? "selected" : ""}>${esc(kpi)}</option>`).join("")}
        </select>
        <small>Choose the KPI if it is known. If not, Cognix infers the KPI at risk from the goal, buyer evidence, and GTM signals.</small>
      </label>
      <label class="goal-card">
        <span>${pre ? "Pre-launch goal" : "Post-launch result"}</span>
        <input type="text" data-goal value="${esc(state.targetGoal)}" placeholder="${esc(pre ? "Pressure-test demo intent before launch day" : "Understand why engagement did not become demo requests")}" />
        <small>${pre ? "Example: protect demo intent, keep sales narrative and buyer-facing copy from drifting apart, reduce qualified pipeline risk." : "Example: high campaign engagement, low demo requests, buyer-facing dilution, limited qualified pipeline."}</small>
      </label>
    </div>
    <div class="commercial-input-grid" aria-label="Optional commercial context">
      ${commercialInputFields.map((field) => `
        <label>
          <span>${esc(field.label)}</span>
          <input type="text" data-commercial-input="${esc(field.id)}" value="${esc(state.commercialInputs[field.id] || "")}" placeholder="${esc(field.placeholder)}" inputmode="decimal" />
        </label>`).join("")}
    </div>
    ${stageActions({ back: "Back", next: "Find the gap" })}`;
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
          <span class="eyebrow">Cognix PMM</span>
          <h1>Comparing launch inputs for story gaps.</h1>
          <p>Cognix PMM is isolating strategy, campaign/page execution, sales reality, proof, and launch economics before generating receipts, the suggested owner + approval path, and the recheck path.</p>
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
  const commercialLabel = diagnosis.riskLabel === "Low" ? "Launch alignment" : "What breaks if this ships";
  return `
    <section class="executive-digest decision-brief" aria-label="Executive decision brief">
      <div class="digest-topline">
          <span>Launch decision brief</span>
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
          <span>Launch decision</span>
          <h2>${esc(brief.readinessVerdict)}</h2>
          <p>${esc(brief.decisionLine)}</p>
        </div>
        <aside class="digest-score-card verdict-card">
          <span>Diagnostic score</span>
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

      <p class="score-definition">Diagnostic score is supporting context. The primary output is the story gap, receipts, what breaks if it ships, and the PMM fix path.</p>
    </section>`;
}

function compactScoreStrip(diagnosis) {
  const scoreRead = buildLaunchPredictabilityRead(diagnosis);
  const exposure = buildCommercialExposure(diagnosis);
  return `
    <section class="compact-score-strip launch-predictability-strip" aria-label="Launch predictability readout">
      <article class="score-primary">
        <span>Diagnostic score</span>
        <strong>${diagnosis.predictabilityScore}%</strong>
      </article>
      <article>
        <span>Readiness context</span>
        <strong>${esc(scoreRead.readinessBand)}</strong>
      </article>
      <article class="compact-verdict">
        <span>Decision</span>
        <strong>${esc(scoreRead.executiveDecision)}</strong>
      </article>
      <article>
        <span>KPI at risk</span>
        <strong>${esc(exposure.kpiAtRisk)}</strong>
      </article>
      <article>
        <span>Estimated exposure</span>
        <strong>${esc(truncate(exposure.estimatedExposure, 96))}</strong>
      </article>
      <article class="compact-fracture">
        <span>Primary drag</span>
        <strong>${esc(scoreRead.primaryDrag)}</strong>
      </article>
      <div class="score-explain score-meaning">
        <span>Diagnostic meaning</span>
        <p>${esc(scoreRead.scoreMeaning)}</p>
      </div>
      <div class="score-explain score-lift">
        <span>Fix path</span>
        <p>${esc(scoreRead.scoreLiftPath)}</p>
      </div>
    </section>`;
}

function commercialExposureSection(diagnosis) {
  const exposure = buildCommercialExposure(diagnosis);
  return `
    <section class="decision-section commercial-exposure-section">
      <div class="digest-section-head">
        <span>What it could cost</span>
        <strong>${esc(exposure.kpiAtRisk)}</strong>
      </div>
      <div class="commercial-exposure-grid">
        <article>
          <span>KPI at risk</span>
          <p>${esc(exposure.kpiAtRisk)}</p>
        </article>
        <article>
          <span>Risk mechanism</span>
          <p>${esc(exposure.riskMechanism)}</p>
        </article>
        <article>
          <span>Known numbers</span>
          <ul>${exposure.knownNumbers.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        </article>
        <article>
          <span>Missing numbers</span>
          <ul>${exposure.missingNumbers.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        </article>
        <article class="commercial-exposure-wide">
          <span>Estimated exposure</span>
          <p>${esc(exposure.estimatedExposure)}</p>
        </article>
        <article>
          <span>Confidence level</span>
          <p>${esc(exposure.confidenceLevel)}</p>
        </article>
      </div>
      <article class="measurement-plan-card">
        <span>Measurement plan</span>
        <ul>${exposure.measurementPlan.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      </article>
    </section>`;
}

function scoreRingMarkup(score) {
  const value = Math.max(0, Math.min(100, Number(score) || 0));
  return `
    <div class="score-ring-wrap">
      <div class="digest-gauge score-ring" style="--risk-deg:${value * 3.6}deg" aria-label="Diagnostic score ${value}%">
        <span>${value}%</span>
      </div>
      <div>
        <strong>Diagnostic score</strong>
        <small>GTM story strength for qualified demand.</small>
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
  const scoreRead = buildLaunchPredictabilityRead(diagnosis);
  return {
    readinessVerdict: scoreRead.executiveDecision,
    decisionLine: scoreRead.scoreMeaning,
    primaryAction: primaryActionBeforeLaunch(diagnosis)
  };
}

function launchReadinessVerdict(diagnosis) {
  return buildLaunchPredictabilityRead(diagnosis).executiveDecision;
}

function buildCmoDecisionLine(diagnosis) {
  return buildLaunchPredictabilityRead(diagnosis).executiveDecision;
}

function readinessBandForScore(score) {
  if (score >= 90) return {
    readinessBand: "Launch-ready",
    executiveDecision: "Scale with confidence",
    bandMeaning: "Clear buyer pain, strong ICP, differentiated message, proof near CTA, strong conversion path, and sales-ready narrative."
  };
  if (score >= 75) return {
    readinessBand: "Mostly ready",
    executiveDecision: "Fix minor gaps, then activate",
    bandMeaning: "Strong story with minor proof, CTA, or sales alignment fixes."
  };
  if (score >= 60) return {
    readinessBand: "Fix before scale",
    executiveDecision: "Fix before scale",
    bandMeaning: "Good ingredients, but visible GTM risk. Buyer evidence exists, but the story, CTA, proof placement, or sales path may weaken conversion."
  };
  if (score >= 45) return {
    readinessBand: "High-risk launch",
    executiveDecision: "Re-anchor before launch",
    bandMeaning: "Buyer evidence may exist, but market-facing execution is abstract, generic, or misaligned with sales/customer reality."
  };
  return {
    readinessBand: "Do not launch",
    executiveDecision: "Rework before launch",
    bandMeaning: "Story is not clear enough to support pipeline, sales confidence, or executive credibility."
  };
}

function primaryDragLabel(diagnosis) {
  if (diagnosis.has?.founderNarrativeOverride) return "Leadership-to-buyer evidence gap";
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) return "Execution consistency";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return "Activity-to-demo intent gap";
  if (diagnosis.has?.strongProofWeakConversionPath || diagnosis.has?.passiveCta) return "Conversion path drag";
  if (diagnosis.has?.genericAiPositioning) return "Generic category drag";
  if (diagnosis.has?.buyerMessageMismatch) return "Buyer-message mismatch";
  if (diagnosis.has?.proofBuriedMissingPublic || diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification) return "Proof-to-conversion gap";
  if (diagnosis.has?.weakSalesPath) return "Sales narrative gap";
  return primaryFractureLabel(diagnosis);
}

function buildLaunchPredictabilityRead(diagnosis) {
  const band = readinessBandForScore(diagnosis.predictabilityScore);
  if (diagnosis.has?.founderNarrativeOverride) {
    return {
      ...band,
      executiveDecision: "Fix before scale",
      primaryDrag: "Leadership-to-buyer evidence gap",
      scoreMeaning: "Sales and customer proof are pointing to renewal risk. The launch story is being pulled toward broader category language before the buyer understands the commercial pain.",
      scoreLiftPath: "Lead with “Catch renewal risk before it becomes churn,” move proof close to the CTA, and use “AI revenue operating system” as the strategic frame after buyer urgency is established."
    };
  }
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return {
      ...band,
      primaryDrag: "Execution consistency",
      scoreMeaning: "The GTM story is carrying clear buyer pain, proof, CTA, and sales alignment. The launch is ready to test if teams preserve the same narrative across channels.",
      scoreLiftPath: "Keep the hero, proof, CTA, campaign, and sales follow-up anchored to the same buyer pain and qualification path."
    };
  }
  if (diagnosis.has?.genericAiPositioning) {
    return {
      ...band,
      primaryDrag: primaryDragLabel(diagnosis),
      scoreMeaning: "Buyer evidence exists, but the market-facing story is leaning on broad AI/category language before the buyer sees the operational or commercial pain.",
      scoreLiftPath: "Move the specific buyer pain into the hero, place proof near the CTA, and give sales the same problem-first talk track before scaling launch motion."
    };
  }
  if (diagnosis.has?.strongProofWeakConversionPath || diagnosis.has?.passiveCta) {
    return {
      ...band,
      primaryDrag: primaryDragLabel(diagnosis),
      scoreMeaning: "The launch has usable buyer evidence, but the conversion path is not turning that evidence into a strong qualified next step.",
      scoreLiftPath: "Tie the CTA to the buyer’s urgent risk, place proof closer to the decision point, and make the sales follow-up carry the same proof-backed ask."
    };
  }
  if (diagnosis.has?.launchMotionActivityWeakConversion) {
    return {
      ...band,
      primaryDrag: primaryDragLabel(diagnosis),
      scoreMeaning: "The launch can generate activity, but the story is not sharp enough to predict qualified demo intent.",
      scoreLiftPath: "Narrow the buyer, sharpen the pain, add credible proof, and replace passive education with a qualified-demand CTA."
    };
  }
  return {
    ...band,
    primaryDrag: primaryDragLabel(diagnosis),
    scoreMeaning: band.bandMeaning,
    scoreLiftPath: primaryActionBeforeLaunch(diagnosis)
  };
}

function commercialContextText(diagnosis) {
  return `${diagnosis.allText || ""} ${state.targetGoal || ""}`;
}

function inferKpiAtRisk(diagnosis) {
  const selected = String(state.selectedKpi || "").trim();
  if (selected) {
    if (/qualified demo requests/i.test(selected)) return "Qualified demo conversion";
    return selected;
  }
  if (/ai revenue operating system/i.test(commercialContextText(diagnosis)) && /renewal risk|churn/i.test(commercialContextText(diagnosis))) {
    return "Qualified demo conversion";
  }
  if (diagnosis.has?.founderNarrativeOverride) return "Qualified demo conversion";
  const text = commercialContextText(diagnosis).toLowerCase();
  if (diagnosis.has?.lightProofCaveat || /feature adoption|onboarding analytics|product walkthrough/.test(text)) return "Feature adoption";
  if (/qualified\s+demo|demo\s+request|demo\s+intent|demo\s+target/.test(text)) return "Qualified demo conversion";
  if (/launch-sourced|sourced opportunit/.test(text)) return "Launch-sourced opportunities";
  if (/pipeline/.test(text)) return "Pipeline influenced";
  if (/renewal|retention/.test(text)) return "Renewal protection";
  if (/churn/.test(text)) return "Churn reduction";
  if (/expansion|upsell|cross-sell/.test(text)) return "Expansion pipeline";
  if (/trial/.test(text)) return "Trial conversion";
  if (/awareness|category/.test(text)) return "Category awareness";
  if (/campaign|conversion/.test(text)) return "Campaign conversion";
  if (/enablement|sales adoption|talk track/.test(text)) return "Sales enablement adoption";
  if (/competitive|displacement|competitor/.test(text)) return "Competitive displacement";
  return "Qualified demo conversion";
}

function parseCommercialNumber(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const match = raw.match(/(\d+(?:,\d{3})*(?:\.\d+)?)(?:\s*([KkMm]))?/);
  if (!match) return null;
  const base = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(base)) return null;
  const suffix = match[2]?.toLowerCase();
  if (suffix === "m") return base * 1000000;
  if (suffix === "k") return base * 1000;
  return base;
}

function formatCommercialMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  if (number >= 1000000) {
    const formatted = number / 1000000;
    return `$${formatted % 1 ? formatted.toFixed(1) : formatted.toFixed(0)}M`;
  }
  if (number >= 1000) return `$${Math.round(number).toLocaleString("en-US")}`;
  return `$${Math.round(number).toLocaleString("en-US")}`;
}

function formatCompactMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  if (number >= 1000000) {
    const formatted = number / 1000000;
    return `$${formatted % 1 ? formatted.toFixed(1) : formatted.toFixed(0)}M`;
  }
  if (number >= 1000) {
    const formatted = number / 1000;
    return `$${formatted % 1 ? formatted.toFixed(1) : formatted.toFixed(0)}K`;
  }
  return `$${Math.round(number).toLocaleString("en-US")}`;
}

function commercialInputValue(id) {
  return String(state.commercialInputs?.[id] || "").trim();
}

function commercialNumberFromInput(id, fallback = "") {
  return parseCommercialNumber(commercialInputValue(id)) ?? parseCommercialNumber(fallback);
}

function buildCommercialNumberContext(diagnosis) {
  const text = commercialContextText(diagnosis);
  const extractedBudget = extractBudgetAmount([{ text }]);
  const extractedDemoTarget = extractDemoTarget(text);
  const extractedPipeline = extractCommercialRange(text);
  const extractedAcv = extractAcvAmount(text);
  const averageDealFallback = /\baverage deal size\b|\bdeal size\b/i.test(text) ? extractedAcv : "";
  const renewalValueFallback = /\brenewal value at risk\b|\brenewal risk value\b|\brenewal exposure\b/i.test(text) ? extractedAcv : "";
  const numbers = {
    launchSpend: commercialNumberFromInput("launchSpend", extractedBudget),
    demoTarget: commercialNumberFromInput("demoTarget", extractedDemoTarget),
    pipelineTarget: commercialNumberFromInput("pipelineTarget", extractedPipeline),
    averageDealSize: commercialNumberFromInput("averageDealSize", averageDealFallback),
    averageOpportunityValue: commercialNumberFromInput("averageOpportunityValue", extractedAcv),
    currentConversionRate: commercialInputValue("currentConversionRate"),
    pastLaunchBenchmark: commercialInputValue("pastLaunchBenchmark"),
    renewalValueAtRisk: commercialNumberFromInput("renewalValueAtRisk", renewalValueFallback),
    targetAccountCount: commercialNumberFromInput("targetAccountCount"),
    campaignDuration: commercialInputValue("campaignDuration")
  };
  const labels = [
    numbers.launchSpend ? `Launch spend: ${formatCommercialMoney(numbers.launchSpend)}` : "",
    numbers.demoTarget ? `Demo target: ${Math.round(numbers.demoTarget).toLocaleString("en-US")}` : "",
    numbers.pipelineTarget ? `Pipeline target: ${formatCommercialMoney(numbers.pipelineTarget)}` : "",
    numbers.averageDealSize ? `Average deal size: ${formatCommercialMoney(numbers.averageDealSize)}` : "",
    numbers.averageOpportunityValue ? `Average opportunity value: ${formatCommercialMoney(numbers.averageOpportunityValue)}` : "",
    numbers.currentConversionRate ? `Current conversion rate: ${numbers.currentConversionRate}` : "",
    numbers.pastLaunchBenchmark ? `Past launch benchmark: ${numbers.pastLaunchBenchmark}` : "",
    numbers.renewalValueAtRisk ? `Renewal value at risk: ${formatCommercialMoney(numbers.renewalValueAtRisk)}` : "",
    numbers.targetAccountCount ? `Target account count: ${Math.round(numbers.targetAccountCount).toLocaleString("en-US")}` : "",
    numbers.campaignDuration ? `Campaign duration: ${numbers.campaignDuration}` : ""
  ].filter(Boolean);
  return { ...numbers, labels };
}

function commercialRiskMechanism(diagnosis) {
  if (diagnosis.has?.founderNarrativeOverride) {
    return "Leadership-to-buyer evidence gap may reduce qualified demo intent because the market-facing story leads with abstract category language before the buyer understands the commercial pain.";
  }
  if (diagnosis.has?.passiveCta) {
    return "Passive CTA may reduce conversion from interest to qualified action.";
  }
  if (diagnosis.has?.strongProofWeakConversionPath || diagnosis.has?.proofBuriedMissingPublic || diagnosis.has?.proofGap) {
    return "Proof exists, but it is not close enough to the CTA to support buyer urgency.";
  }
  if (diagnosis.has?.weakSalesPath || diagnosis.has?.buyerMessageMismatch) {
    return "Sales may need to translate the message manually, weakening follow-up consistency and attribution.";
  }
  if (diagnosis.has?.strongLaunch) {
    return "The main commercial risk is execution drift after handoff. Keep the same proof-backed buyer path across campaign, sales, and follow-up.";
  }
  return "The launch story may create attention without enough KPI-specific buyer urgency to convert into qualified action.";
}

function missingCommercialNumbers(numbers, kpiAtRisk) {
  const missing = [];
  if (!numbers.launchSpend) missing.push("Launch spend");
  if (!numbers.demoTarget && /demo|opportunit|pipeline|campaign/i.test(kpiAtRisk)) missing.push("Demo target");
  if (!numbers.averageOpportunityValue && /demo|opportunit|pipeline|campaign/i.test(kpiAtRisk)) missing.push("Average opportunity value");
  if (!numbers.renewalValueAtRisk && /renewal|churn|retention/i.test(kpiAtRisk)) missing.push("Renewal value at risk");
  if (!numbers.pastLaunchBenchmark) missing.push("Past launch benchmark");
  return missing.slice(0, 5);
}

function severityForDiagnosis(diagnosis) {
  if (diagnosis.has?.founderNarrativeOverride || diagnosis.riskLabel === "High" || diagnosis.predictabilityScore < 50) return "High";
  if (diagnosis.riskLabel === "Medium to high" || diagnosis.predictabilityScore < 65) return "Medium";
  if (diagnosis.riskLabel === "Medium" || diagnosis.predictabilityScore < 80) return "Medium";
  return "Low";
}

function severityWeightRange(severity) {
  const ranges = {
    Low: [0.1, 0.2],
    Medium: [0.25, 0.4],
    High: [0.45, 0.65],
    Critical: [0.7, 0.9]
  };
  return ranges[severity] || ranges.Medium;
}

function buildCommercialExposureModel(numbers, diagnosis, kpiAtRisk) {
  const severity = severityForDiagnosis(diagnosis);
  const [lowWeight, highWeight] = severityWeightRange(severity);
  const modeled = [];
  const providedLabels = numbers.labels || [];
  if (!providedLabels.length) {
    return {
      complete: false,
      label: "Qualitative commercial exposure",
      summary: "Quantitative data missing from intake. Based on the detected launch risk, qualified demo conversion, campaign efficiency, or pipeline quality may be exposed if this ships without correction.",
      scenario: "Quantitative data missing from intake. Based on the detected launch risk, qualified demo conversion, campaign efficiency, or pipeline quality may be exposed if this ships without correction.",
      severity,
      exposureType: "qualitative"
    };
  }
  const scenarioBasis = `Scenario model based on provided ${providedLabels.map((item) => item.split(":")[0].trim().toLowerCase()).join(" and ")}.`;
  if (numbers.launchSpend) {
    const low = numbers.launchSpend * lowWeight;
    const high = numbers.launchSpend * highWeight;
    return {
      complete: true,
      label: "Campaign spend exposure",
      summary: `Campaign spend exposure: ${formatCompactMoney(low)} to ${formatCompactMoney(high)} of the ${formatCompactMoney(numbers.launchSpend)} launch spend is exposed to inefficient conversion.`,
      scenario: `${scenarioBasis} ${formatCompactMoney(low)} to ${formatCompactMoney(high)} of the ${formatCompactMoney(numbers.launchSpend)} launch spend is exposed to inefficient conversion based on ${severity.toLowerCase()} drift severity.`,
      severity,
      exposureType: "campaign_spend"
    };
  }
  if (numbers.demoTarget && numbers.averageOpportunityValue) {
    const lowMiss = Math.max(1, Math.round(numbers.demoTarget * Math.min(0.08, lowWeight / 3)));
    const highMiss = Math.max(lowMiss + 1, Math.round(numbers.demoTarget * Math.min(0.14, highWeight / 3)));
    modeled.push({
      type: "Potential pipeline exposure",
      low: lowMiss * numbers.averageOpportunityValue,
      high: highMiss * numbers.averageOpportunityValue,
      line: `${formatCommercialMoney(lowMiss * numbers.averageOpportunityValue)} to ${formatCommercialMoney(highMiss * numbers.averageOpportunityValue)} potential pipeline exposure if ${lowMiss} to ${highMiss} qualified opportunities are missed.`
    });
  }
  if (numbers.pipelineTarget) {
    modeled.push({
      type: "Potential pipeline exposure",
      low: numbers.pipelineTarget * lowWeight,
      high: numbers.pipelineTarget * highWeight,
      line: `${formatCommercialMoney(numbers.pipelineTarget * lowWeight)} to ${formatCommercialMoney(numbers.pipelineTarget * highWeight)} potential pipeline exposure based on pipeline target and ${severity.toLowerCase()} drift severity.`
    });
  }
  if (numbers.renewalValueAtRisk) {
    modeled.push({
      type: "Potential renewal exposure",
      low: numbers.renewalValueAtRisk * lowWeight,
      high: numbers.renewalValueAtRisk * highWeight,
      line: `${formatCommercialMoney(numbers.renewalValueAtRisk * lowWeight)} to ${formatCommercialMoney(numbers.renewalValueAtRisk * highWeight)} potential renewal exposure based on renewal value at risk and ${severity.toLowerCase()} drift severity.`
    });
  }
  if (modeled.length) {
    const primary = modeled[0];
    return {
      complete: true,
      label: primary.type,
      summary: `${primary.type}: ${primary.line}`,
      scenario: `${scenarioBasis} ${primary.line}`,
      severity,
      exposureType: primary.type
    };
  }
  return {
    complete: false,
    label: "Qualitative commercial exposure",
    summary: "Quantitative data incomplete. Based on the detected launch risk, qualified demo conversion, campaign efficiency, or pipeline quality may be exposed if this ships without correction.",
    scenario: `${scenarioBasis} Quantitative data is incomplete, so Cognix is not estimating dollar exposure. Qualified demo conversion, campaign efficiency, or pipeline quality may be exposed if this ships without correction.`,
    severity
  };
}

function commercialExposureConfidence(numbers) {
  const strongInputs = [
    numbers.launchSpend,
    numbers.demoTarget,
    numbers.averageOpportunityValue,
    numbers.renewalValueAtRisk,
    numbers.pipelineTarget
  ].filter(Boolean).length;
  if (strongInputs >= 2) return "Medium-high";
  if (strongInputs === 1 || numbers.currentConversionRate || numbers.pastLaunchBenchmark) return "Medium";
  return "Low until commercial inputs are added";
}

function exposureConfidence(diagnosis, numbers) {
  const surfaceCount = buildSourceReceipts(diagnosis).filter((item) => item.receipt).length;
  const financialInputs = [numbers.launchSpend, numbers.demoTarget, numbers.averageOpportunityValue, numbers.pipelineTarget, numbers.renewalValueAtRisk].filter(Boolean).length;
  if (surfaceCount >= 4 && financialInputs >= 2) return "High: multiple source surfaces confirm the same contradiction";
  if (surfaceCount >= 3 && financialInputs < 2) return "Medium-high: strong contradiction detected, but financial inputs are incomplete";
  if (surfaceCount >= 2) return "Medium: meaningful evidence, but limited source coverage or missing metrics";
  return "Low: limited source coverage or weak KPI context";
}

function commercialExposureStatus(diagnosis, model) {
  if (diagnosis.riskLabel === "Low" && diagnosis.predictabilityScore >= 85) return "No material exposure detected";
  if (!model.complete) return diagnosis.has?.founderNarrativeOverride || diagnosis.riskLabel !== "Low" ? "Commercial exposure likely" : "Exposure not fully quantified";
  return diagnosis.riskLabel === "High" || diagnosis.has?.founderNarrativeOverride ? "Commercial exposure detected" : "Commercial exposure likely";
}

function executiveDecisionForExposure(diagnosis, model) {
  if (diagnosis.riskLabel === "Low" && model.complete) return "Ready to scale";
  if (diagnosis.has?.founderNarrativeOverride || diagnosis.riskLabel === "High") return "Fix before scale";
  if (!model.complete) return "Fix before scale";
  if (diagnosis.riskLabel === "Medium to high") return "Launch with controlled spend";
  return "Rework before activation";
}

function buildMeasurementPlan(diagnosis, kpiAtRisk) {
  const kpi = String(kpiAtRisk || "").toLowerCase();
  let metrics = [];
  if (/renewal|churn|retention/.test(kpi)) {
    metrics = ["Renewal risk conversations created", "Sales talk track adoption", "CTA conversion rate", "Qualified demo rate", "Win/loss reason frequency"];
  } else if (/pipeline|opportunit/.test(kpi)) {
    metrics = ["Launch-sourced opportunity creation", "Pipeline influenced", "Qualified demo rate", "Demo quality by persona", "Sales talk track adoption"];
  } else if (/trial/.test(kpi)) {
    metrics = ["Trial conversion", "CTA conversion rate", "Qualified demo rate", "Win/loss reason frequency"];
  } else if (/awareness|category|campaign/.test(kpi)) {
    metrics = ["Campaign conversion", "CTA conversion rate", "Qualified demo rate", "Sales-reported objection rate"];
  } else {
    metrics = ["CTA conversion rate", "Qualified demo rate", "Launch-sourced opportunity creation", "Demo quality by persona", "Sales-reported objection rate"];
  }
  if (diagnosis.has?.founderNarrativeOverride || diagnosis.has?.weakSalesPath) metrics.push("Sales talk track adoption");
  if (diagnosis.has?.proofBuriedMissingPublic || diagnosis.has?.strongProofWeakConversionPath) metrics.push("Win/loss reason frequency");
  return [...new Set(metrics)].slice(0, 6);
}

function receiptObject(surface, receipt, source) {
  return {
    surface,
    receipt: cleanReceipt(receipt, surface),
    source
  };
}

function cleanReceipt(value, surface = "") {
  const stripped = stripReceiptSourcePrefix(value);
  if (/proof/i.test(surface)) return cleanProofReceipt(stripped);
  if (/field/i.test(surface) && /\b(?:Catch renewal risk before it becomes churn|Find hidden renewal risk)\b/i.test(stripped)) return truncate(stripped, 320).trim();
  if (/field/i.test(surface)) return preserveCompleteSentences(stripped, 2, 260).trim();
  if (/execution/i.test(surface)) return cleanExecutionReceipt(stripped);
  return preserveCompleteSentences(cleanConceptPhrase(stripped, 320), 2, 260)
    .replace(/^["“]|["”]$/g, "")
    .trim();
}

function stripReceiptSourcePrefix(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .replace(/^\s*(?:strategy\s*\/\s*leadership|strategy|leadership|execution surface|execution|field reality|proof surface|customer proof|proof|business metrics|metrics)\s*:\s*/i, "")
    .replace(/^\s*(?:cta|current cta|primary cta)\s*:\s*/i, "")
    .replace(/\n\s*(?:strategy\s*\/\s*leadership|strategy|leadership|execution surface|execution|field reality|proof surface|customer proof|proof|business metrics|metrics|cta|current cta|primary cta)\s*:\s*/gi, "\n")
    .replace(/^["'“‘]+|["”’']+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanExecutionReceipt(value) {
  const stripped = stripReceiptSourcePrefix(value);
  const cta = extractCurrentCtaPhrase(stripped) || stripped.replace(/^\s*(?:cta|current cta|primary cta)\s*:\s*/i, "");
  return preserveCompleteSentences(cleanConceptPhrase(cta, 160), 1, 120).replace(/\.$/, "").trim();
}

function cleanProofReceipt(value) {
  const stripped = stripReceiptSourcePrefix(value);
  const quote = extractCustomerQuote(stripped);
  const proof = quote || cleanProofPhrase(stripped);
  return preserveCompleteSentences(proof || stripped, 2, 320).trim();
}

function localSlug(value) {
  return String(value || "exposure")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "exposure";
}

function buildSourceReceipts(diagnosis) {
  const collision = diagnosis.outputArchitecture?.collision || buildVerbatimCollision(diagnosis);
  const rawStrategy = signalTextForReceipt(diagnosis, "launch-message");
  const rawExecution = signalTextForReceipt(diagnosis, "campaign-copy") || signalTextForReceipt(diagnosis, "cta");
  const rawField = signalTextForReceipt(diagnosis, "sales-talk-track")
    || signalTextForReceipt(diagnosis, "objections")
    || signalTextForReceipt(diagnosis, "sales-feedback");
  const strategy = selectStrategyReceipt(rawStrategy)
    || extractFounderNarrativeSignal(diagnosis)
    || matrixSourcePhrase(diagnosis, "internal_strategic_insight")
    || matrixValue(diagnosis, "internal_strategic_insight")
    || collision.upstream;
  const execution = selectExecutionReceipt(rawExecution)
    || matrixValue(diagnosis, "current_cta")
    || matrixSourcePhrase(diagnosis, "current_cta")
    || matrixValue(diagnosis, "public_dilution")
    || matrixValue(diagnosis, "current_headline")
    || collision.downstream;
  const field = selectFieldRealityReceipt(rawField)
    || extractSalesCustomerRealitySignal(diagnosis)
    || matrixValue(diagnosis, "buyer_pressure")
    || matrixSourcePhrase(diagnosis, "buyer_pressure");
  const proof = matrixValue(diagnosis, "proof_signal") || matrixSourcePhrase(diagnosis, "proof_signal");
  const metrics = buildCommercialNumberContext(diagnosis).labels.join("; ");
  return [
    receiptObject("Strategy surface", strategy, "Strategy / leadership"),
    receiptObject("Execution surface", execution, "Execution surface"),
    receiptObject("Field reality", field, "Field reality"),
    receiptObject("Proof surface", proof, "Proof surface"),
    receiptObject("Business metrics", metrics, "Business metrics")
  ];
}

function signalTextForReceipt(diagnosis, id) {
  return diagnosis.signals?.find((signal) => signal.id === id)?.text || "";
}

function selectStrategyReceipt(text) {
  const value = stripReceiptSourcePrefix(text);
  const sentences = splitIntoSignalSentences(value);
  const aiOs = sentences.find((sentence) => /\bAI revenue operating system\b/i.test(sentence));
  if (aiOs) return preserveCompleteSentences(aiOs, 1, 220);
  const strategic = sentences.find((sentence) => /\b(?:helps|protect|reduce|identify|find|catch|stop|pressure-test|pipeline reviews?|renewal risk|invoice exceptions?|handoff|forecast risk|workflow|approvals?)\b/i.test(sentence));
  return strategic ? preserveCompleteSentences(strategic, 1, 240) : "";
}

function selectExecutionReceipt(text) {
  const value = stripReceiptSourcePrefix(text);
  const heroLine = value.match(/\b(?:Homepage hero|Hero|Headline)\s*:\s*([^\n]+?)(?:\n|$)/i);
  const ctaLine = value.match(/\bCTA\s*:\s*([^\n.]+\.?)/i);
  if (ctaLine?.[1] && heroLine?.[1]) return `${preserveCompleteSentences(heroLine[1], 1, 180)} CTA: ${cleanExecutionReceipt(ctaLine[1])}`.trim();
  if (ctaLine?.[1]) return cleanExecutionReceipt(ctaLine[1]);
  if (heroLine?.[1]) return preserveCompleteSentences(heroLine[1], 1, 180);
  const subjectLine = value.match(/\b(?:Campaign email subject|Email subject|Subject)\s*:\s*([^\n]+?)(?:\n|$)/i);
  if (subjectLine?.[1]) return preserveCompleteSentences(subjectLine[1], 1, 180);
  const strongest = splitIntoSignalSentences(value).find((sentence) => /\bAI revenue operating system\b|\bAI operating layer\b|\bLearn more\b/i.test(sentence));
  return strongest ? cleanExecutionReceipt(strongest) : "";
}

function selectFieldRealityReceipt(text) {
  const rawValue = String(text || "");
  const rawHook = rawValue.match(/\b(?:(?:Best-performing sales hook|Best opener)\s*(?:is|:)\s*)?(?:Catch renewal risk before it becomes churn|Find hidden renewal risk)\.?/i)?.[0]
    || rawValue.match(/\b(?:Catch renewal risk before it becomes churn|Find hidden renewal risk)\.?/i)?.[0];
  const value = stripReceiptSourcePrefix(text);
  if (!value) return "";
  const confusion = value.match(/\bDo not lead with AI revenue operating system\.?\s*Prospects ask what that means\.?/i);
  const hook = value.match(/\b(?:(?:Best-performing sales hook|Best opener)\s*(?:is|:)\s*)?(?:Catch renewal risk before it becomes churn|Find hidden renewal risk)\.?/i);
  const renewalHook = hook?.[0] || rawHook || value.match(/\b(?:Catch renewal risk before it becomes churn|Find hidden renewal risk)\.?/i)?.[0];
  if (confusion?.[0] && renewalHook) {
    return `${confusion[0]} ${stripReceiptSourcePrefix(renewalHook).replace(/^(?:Best-performing sales hook|Best opener)\s*(?:is|:)\s*/i, "").trim()}`.trim();
  }
  const salesObjection = splitIntoSignalSentences(value).find((sentence) => hasPattern(sentence, [
    /\bbuyers? (?:do not|don't|cannot|can't) understand\b/i,
    /\b(?:sales|reps?|aes?) (?:says?|say|said).*(?:not landing|does not land|doesn't land|different language)\b/i,
    /\b(?:sales )?objection\b/i,
    /\bbuyers? ask ["']?why (?:now|this)["']?/i,
    /\bwe do not need another dashboard\b/i,
    /\bbuyers? (?:ask|asks|believe).*\bproof\b/i
  ]));
  if (salesObjection) return preserveCompleteSentences(salesObjection, 2, 280);
  if (confusion?.[0]) return preserveCompleteSentences(confusion[0], 2, 220);
  if (renewalHook) return stripReceiptSourcePrefix(renewalHook).replace(/^(?:Best-performing sales hook|Best opener)\s*(?:is|:)\s*/i, "").trim();
  const strongest = splitIntoSignalSentences(value).find((sentence) => /\brenewal risk\b|\bchurn\b|\bpipeline reviews?\b|\bforecast confidence\b|\bwording is plain but accurate\b|\bapproval cycles?\b|\bprospects ask\b|\bobjection\b/i.test(sentence));
  return strongest ? preserveCompleteSentences(strongest, 1, 220) : "";
}

function receiptFor(receipts, surface) {
  return receipts.find((item) => item.surface === surface)?.receipt || "";
}

function buildPrimaryContradiction(diagnosis, receipts) {
  if (diagnosis.has?.alignedLaunch && !diagnosis.has?.explicitProofGap && !diagnosis.has?.salesObjectionConflict) {
    return "No major source-verified launch risk detected.";
  }
  if (diagnosis.has?.lightProofCaveat) return "The launch is directionally aligned; the remaining issue is a light proof caveat before broader scale.";
  if (diagnosis.has?.pricingTrustRisk) return "AI pricing monetization is outrunning billing clarity, customer trust, and churn-risk handling.";
  if (diagnosis.has?.platformWedgeConflict) return "The platform narrative is outrunning module-level proof, buyer focus, and sales wedge clarity.";
  if (diagnosis.has?.churnExpansionSplit) return "Expansion-revenue messaging is splitting from churn-prevention proof and sales reality.";
  if (diagnosis.has?.securityComplianceSplit) return "Broad AI innovation narrative is competing with enterprise compliance urgency.";
  if (diagnosis.has?.salesObjectionConflict) return "Sales reality is contradicting the launch story buyers see before the demo.";
  if (diagnosis.has?.founderNarrativeOverride) return "Leadership/category narrative is diluting sales-proven renewal-risk urgency.";
  if (diagnosis.has?.explicitProofGap) return "The launch claim is outrunning the proof buyers need before they trust the business outcome.";
  const strategy = receiptFor(receipts, "Strategy surface") || "strategy";
  const field = receiptFor(receipts, "Field reality") || "";
  if (/ai revenue operating system|category leadership|operating system/i.test(strategy) && /renewal risk|churn/i.test(field)) {
    return "Leadership/category narrative is diluting sales-proven renewal-risk urgency.";
  }
  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath) return "Execution CTA is diluting proof-backed buyer urgency.";
  if (diagnosis.has?.buyerMessageMismatch) return "Buyer-facing execution is diluting the selected buyer's commercial priority.";
  if (diagnosis.has?.genericAiPositioning) return "Generic category narrative is diluting the source-verified buyer urgency.";
  const execution = receiptFor(receipts, "Execution surface") || "execution";
  if (diagnosis.riskLabel === "Low") return "No material source-verified contradiction detected.";
  return `${trimCollisionPhrase(strategy)} is not fully carried by ${trimCollisionPhrase(execution)}.`;
}

function buildGtmFractureJudgment(diagnosis, receipts, exposure = {}) {
  const strategy = receiptFor(receipts, "Strategy surface");
  const execution = receiptFor(receipts, "Execution surface");
  const field = receiptFor(receipts, "Field reality");
  const proof = receiptFor(receipts, "Proof surface");
  const metrics = receiptFor(receipts, "Business metrics");
  const kpi = exposure.kpiAtRisk || inferKpiAtRisk(diagnosis);
  const aligned = diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch || diagnosis.has?.alignedLaunch;

  const base = {
    title: aligned ? "No major GTM fracture detected" : primaryFractureLabel(diagnosis),
    fracture: exposure.primaryContradiction || buildPrimaryContradiction(diagnosis, receipts),
    receipts: [strategy, execution, field, proof].filter(Boolean).slice(0, 4),
    whereBreaks: "Landing page, campaign, sales narrative, and launch goal.",
    whoFeelsIt: "PMM, Sales leadership, Demand Gen, and RevOps.",
    commercialRisk: exposure.riskMechanism || commercialRiskMechanism(diagnosis),
    fixPath: buildPmmFixPath(diagnosis, receipts, kpi),
    conflictingNodes: inferConflictingNodes(diagnosis, receipts),
    isAligned: aligned
  };

  if (aligned) {
    return {
      ...base,
      fracture: "The submitted GTM inputs reinforce the same buyer pain, proof path, CTA, and sales story.",
      whereBreaks: "No primary break detected. Watch for handoff drift across campaign, sales follow-up, and enablement.",
      whoFeelsIt: "PMM and Sales leadership own consistency after launch handoff.",
      commercialRisk: "Residual risk is execution drift over time: campaign, sales follow-up, or enablement may stop carrying the same proof-backed buyer path.",
      fixPath: "Update the launch goal, homepage hero, proof block, CTA, and sales talk track to keep the same buyer pain visible through early campaign and sales feedback."
    };
  }

  if (diagnosis.has?.salesObjectionConflict) {
    return {
      ...base,
      title: "Sales objection vs launch story",
      fracture: diagnosis.has?.operationsWorkflow
        ? "Sales objection shows workflow and operations urgency that the launch story must answer before buyers trust the demo path."
        : "Sales reality explicitly contradicts the homepage, campaign, founder narrative, or category story.",
      whereBreaks: "Homepage hero, campaign angle, sales opener, objection handling, and demo handoff.",
      whoFeelsIt: "PMM, Sales leadership, Demand Gen, and RevOps.",
      commercialRisk: "Buyers can understand the words but still reject the frame, creating demo conversion risk, sales confusion, and weaker pipeline quality.",
      fixPath: `Rewrite the homepage and sales opener around the field receipt: "${field || "the sales objection"}". Keep the CTA tied to ${kpi} and give reps the exact objection response before spend scales.`
    };
  }

  if (diagnosis.has?.explicitProofGap) {
    return {
      ...base,
      title: "Claim vs proof",
      fracture: "The launch makes a business-impact claim before customer proof is approved, specific, or strong enough to support buyer trust.",
      whereBreaks: "Homepage proof block, campaign claim, sales follow-up, and executive decision memo.",
      whoFeelsIt: "PMM, Sales leadership, Demand Gen, and the exec team.",
      commercialRisk: "Enterprise buyers may believe the pain but delay action because the launch cannot prove the promised revenue, pipeline, conversion, churn, or risk outcome.",
      fixPath: `Add one proof point tied to ${kpi}: a customer metric, before-after result, case study, or approved quote. Place it beside the claim and CTA before scaling paid launch spend.`
    };
  }

  if (hasAlignedCoreGtmWithResidualRisk(diagnosis)) {
    return {
      ...base,
      title: "Aligned GTM story with residual proof-placement risk",
      fracture: "The launch goal, ICP, buyer pain, CTA, proof, and sales story are mostly reinforcing the same buyer action.",
      whereBreaks: "No primary break detected. Residual risk is whether the proof stays close enough to the claim and CTA across campaign and sales follow-up.",
      whoFeelsIt: "PMM and Sales leadership.",
      commercialRisk: "Commercial risk is limited to proof placement and handoff consistency; Cognix should not treat this as a major fracture.",
      fixPath: `Update the proof block so ${proof || "the strongest proof"} sits directly beside the homepage claim and CTA, then recheck early sales feedback for any buyer confusion.`
    };
  }

  if (diagnosis.has?.founderNarrativeOverride) {
    return {
      ...base,
      title: "Founder narrative vs field reality",
      fracture: "Founder/category language is outrunning field-tested renewal-risk buyer pain.",
      whereBreaks: "Founder narrative, landing page hero, campaign copy, and sales talk track.",
      whoFeelsIt: "PMM, Founder / CEO, Sales leadership, and Customer Success.",
      commercialRisk: "Sales may need to translate the category story themselves, lowering qualified demo intent and making launch attribution harder to defend.",
      fixPath: "Lead with hidden renewal risk in the hero, CTA, and sales talk track. Use 'AI revenue operating system' only after buyer urgency is established."
    };
  }

  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath || /CTA/i.test(base.title)) {
    return {
      ...base,
      title: "Launch goal vs CTA",
      fracture: diagnosis.has?.genericAiPositioning
        ? "Generic AI positioning and an education-only CTA are weakening qualified demo intent."
        : "The launch goal asks for qualified demand, but the CTA is education-only.",
      whereBreaks: "Landing page CTA, campaign follow-up, demand gen, and sales handoff.",
      whoFeelsIt: "PMM, Demand Gen, Sales leadership, and RevOps.",
      commercialRisk: "Launch engagement can leak before it becomes qualified demo conversion, wasting spend and weakening attribution.",
      fixPath: `Replace ${execution || "the current CTA"} with a buyer-action CTA tied to the proof or pain. Make the next step a risk readout, demo, or diagnostic request connected to ${kpi}.`
    };
  }

  if (diagnosis.has?.buyerMessageMismatch || /buyer.*misaligned/i.test(base.title)) {
    return {
      ...base,
      title: "ICP vs message",
      fracture: "The named ICP and the market-facing message are pulling toward different buyer priorities.",
      whereBreaks: "ICP definition, landing page, campaign targeting, proof selection, and sales qualification.",
      whoFeelsIt: "PMM, Demand Gen, Sales leadership, and RevOps.",
      commercialRisk: "The launch can attract the wrong curiosity, create buyer confusion, and make sales qualification inconsistent.",
      fixPath: "Rewrite the hero, proof block, and first sales question around the selected buyer's business trigger. Remove proof or claims that point to a different buyer."
    };
  }

  if (diagnosis.has?.genericAiPositioning || diagnosis.has?.categoryAbstraction) {
    return {
      ...base,
      title: "Buyer pain vs positioning",
      fracture: "The buyer pain is concrete, but the positioning leads with broad AI/category language.",
      whereBreaks: "Landing page hero, campaign promise, executive story, and sales narrative.",
      whoFeelsIt: "PMM, Founder / CEO, Sales leadership, and Demand Gen.",
      commercialRisk: "Buyers may understand the category without feeling the business reason to act now, lowering demo quality and campaign efficiency.",
      fixPath: "Move the concrete buyer pain above the category claim. Put proof near the CTA and give sales the same problem-first talk track."
    };
  }

  if (diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification || diagnosis.has?.proofBuriedMissingPublic) {
    return {
      ...base,
      title: "Claim vs proof",
      fracture: "The story asks for buyer belief before the proof makes the business case concrete.",
      whereBreaks: "Landing page proof block, campaign claim, sales follow-up, and executive story.",
      whoFeelsIt: "PMM, Sales leadership, Demand Gen, and the exec team.",
      commercialRisk: "Enterprise buyers may stay interested but delay action because the claim is not tied to a metric, customer quote, or business outcome.",
      fixPath: `Move the strongest proof point next to the core claim and CTA. Tie it to ${kpi} instead of adding more generic proof.`
    };
  }

  return {
    ...base,
    fracture: base.fracture || "Two GTM surfaces are not reinforcing the same buyer action.",
    fixPath: base.fixPath
  };
}

function hasAlignedCoreGtmWithResidualRisk(diagnosis) {
  const has = diagnosis.has || {};
  if (has.alignedLaunch) return true;
  return Boolean(
    has.buyerPain
    && has.clearValueProp
    && has.strongCta
    && (has.quantifiedProof || has.quantifiedImpact)
    && has.salesSignal
    && !has.founderNarrativeOverride
    && !has.buyerMessageMismatch
    && !has.genericAiPositioning
    && !has.passiveCta
    && !has.launchMotionActivityWeakConversion
    && !has.weakSalesPath
  );
}

function inferConflictingNodes(diagnosis, receipts) {
  if (diagnosis.has?.salesObjectionConflict) return "Sales objection vs launch story";
  if (diagnosis.has?.explicitProofGap) return "Claim vs proof";
  if (diagnosis.has?.founderNarrativeOverride) return "Founder narrative vs field reality";
  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath) return "Launch goal / proof vs CTA";
  if (diagnosis.has?.buyerMessageMismatch) return "ICP vs market-facing message";
  if (diagnosis.has?.genericAiPositioning || diagnosis.has?.categoryAbstraction) return "Buyer pain vs positioning";
  if (diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification || diagnosis.has?.proofBuriedMissingPublic) return "Claim vs proof";
  if (diagnosis.has?.weakSalesPath) return "Campaign story vs sales narrative";
  const strategy = receiptFor(receipts, "Strategy surface") ? "Strategy" : "Launch goal";
  const execution = receiptFor(receipts, "Execution surface") ? "Execution" : "CTA";
  return `${strategy} vs ${execution}`;
}

function buildPmmFixPath(diagnosis, receipts, kpiAtRisk) {
  const field = receiptFor(receipts, "Field reality");
  const proof = receiptFor(receipts, "Proof surface");
  const execution = receiptFor(receipts, "Execution surface");
  if (diagnosis.has?.salesObjectionConflict) return `Sales talk track: open with "${field || "the buyer objection"}", then rewrite the hero and campaign angle so sales no longer has to translate the launch story. Target metric: ${kpiAtRisk}.`;
  if (diagnosis.has?.explicitProofGap) return `Proof block: add an approved customer metric, before-after result, case study, or quote tied to ${kpiAtRisk}; place it beside the core claim and CTA before spend scales.`;
  if (diagnosis.has?.founderNarrativeOverride) return "Lead with hidden renewal risk in the hero, CTA, and sales talk track. Use 'AI revenue operating system' only after buyer urgency is established.";
  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath) return "Replace the education-only CTA with a buyer-action next step tied to the strongest proof or pain.";
  if (diagnosis.has?.buyerMessageMismatch) return "Choose one buyer for the launch page, proof, campaign targeting, and sales opener; remove claims that point to a different buyer.";
  if (diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification || diagnosis.has?.proofBuriedMissingPublic) return "Place quantified proof beside the claim and CTA so the buyer sees evidence before the ask.";
  if (diagnosis.has?.genericAiPositioning || diagnosis.has?.categoryAbstraction) return "Move the concrete buyer pain into the headline and first sales line before any broad AI/category claim.";
  return primaryActionBeforeLaunch(diagnosis);
}

function buildOwnerActionMatrix(diagnosis, receipts, kpiAtRisk) {
  const strategy = receiptFor(receipts, "Strategy surface") || "strategy signal missing";
  const execution = receiptFor(receipts, "Execution surface") || "execution signal missing";
  const field = receiptFor(receipts, "Field reality") || "field signal missing";
  const proof = receiptFor(receipts, "Proof surface") || "proof signal missing";
  const metric = metricForOwnerAction(kpiAtRisk);
  const renewal = /renewal|churn|cs|customer health/i.test(`${diagnosis.allText} ${kpiAtRisk}`);
  const buyerUrgency = renewal ? "renewal-risk urgency" : "buyer urgency";
  return [
    {
      owner: "PMM",
      status: "Fix required",
      actionRequired: pmmOwnerAction(diagnosis, buyerUrgency),
      verbatimSourceReceipt: field,
      kpiTargetMetric: metric,
      assetToRevise: "Homepage hero, CTA, campaign angle, launch decision memo"
    },
    {
      owner: "CMO",
      status: "Decision required",
      actionRequired: cmoOwnerAction(diagnosis, buyerUrgency),
      verbatimSourceReceipt: proof || strategy,
      kpiTargetMetric: "Campaign spend efficiency and qualified demo rate",
      assetToRevise: "Campaign brief and approval note"
    },
    {
      owner: "Sales",
      status: "Fix required",
      actionRequired: salesOwnerAction(diagnosis, renewal),
      verbatimSourceReceipt: field,
      kpiTargetMetric: "Sales talk track adoption and demo-to-opportunity conversion",
      assetToRevise: "Sales talk track and first-call opener"
    },
    {
      owner: "RevOps",
      status: "Tracking required",
      actionRequired: "Instrument revised CTA conversion, demo quality, objection tags, source attribution, and validation status so the launch can be judged against the KPI at risk.",
      verbatimSourceReceipt: receiptFor(receipts, "Business metrics") || "Financial context not provided",
      kpiTargetMetric: "Pipeline attribution accuracy and launch-sourced opportunities",
      assetToRevise: "Launch measurement dashboard"
    },
    {
      owner: "Founder",
      status: diagnosis.has?.founderNarrativeOverride ? "Correction required" : "Alignment required",
      actionRequired: founderOwnerAction(diagnosis, buyerUrgency),
      verbatimSourceReceipt: strategy,
      kpiTargetMetric: "Executive narrative consistency and qualified demo conversion",
      assetToRevise: "Founder narrative, launch post, keynote or internal launch note"
    }
  ];
}

function pmmOwnerAction(diagnosis, buyerUrgency) {
  if (diagnosis.has?.salesObjectionConflict) {
    return "Homepage hero + campaign angle: replace the abstract launch frame with the exact field objection and its resolved buyer pain. Suggested direction: open with what buyers say they need to know, then make the CTA a risk readout or demo tied to qualified conversion.";
  }
  if (diagnosis.has?.explicitProofGap) {
    return "Homepage hero + proof block: place an approved metric, before-after result, case study, or customer quote beside the business-impact claim before paid spend scales. Suggested direction: prove the promised revenue, pipeline, conversion, churn, or risk outcome before the CTA.";
  }
  if (diagnosis.has?.founderNarrativeOverride) {
    return "Rewrite the launch hierarchy so hidden renewal-risk urgency appears before any AI revenue operating system or category language.";
  }
  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath) {
    return "Move the strongest proof and buyer pain above the CTA, then replace passive learning with a buyer-action next step.";
  }
  if (diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification || diagnosis.has?.proofBuriedMissingPublic) {
    return "Place quantified proof directly beside the primary claim and CTA so the launch does not ask buyers to believe before it proves.";
  }
  return `Update the homepage hero, proof block, CTA, and campaign angle around ${buyerUrgency} before spend scales.`;
}

function cmoOwnerAction(diagnosis, buyerUrgency) {
  if (diagnosis.has?.salesObjectionConflict) {
    return "Update the campaign approval note so scale waits until PMM and Sales agree on the objection-led story, the homepage hero, and the first-call opener. Target metric: qualified demo conversion and sales-accepted pipeline.";
  }
  if (diagnosis.has?.explicitProofGap) {
    return "Update the campaign approval note to hold broad spend until the launch page carries approved proof for the claim buyers are being asked to believe. Target metric: demo conversion, pipeline quality, and executive confidence.";
  }
  if (diagnosis.has?.founderNarrativeOverride) {
    return "Campaign brief: approve launch spend only after category ambition is sequenced below hidden renewal-risk urgency and proof in the homepage hero, CTA, and sales talk track.";
  }
  return `Campaign brief: require the campaign, homepage hero, CTA, and sales talk track to lead with ${buyerUrgency}, then use category or AI language only after the buyer problem and proof are clear.`;
}

function salesOwnerAction(diagnosis, renewal) {
  if (diagnosis.has?.churnExpansionSplit) {
    return "Align the sales talk track to churn prevention and board-level retention pressure until leadership approves expansion revenue as the primary claim.";
  }
  if (diagnosis.has?.salesObjectionConflict) {
    return "Sales talk track: open with the buyer objection from the receipt, then answer it with the concrete operational pain and proof before introducing product or category language.";
  }
  if (diagnosis.has?.explicitProofGap) {
    return "Sales talk track: add the approved proof line reps can use when buyers ask for evidence, and tag calls where the proof gap still blocks conversion.";
  }
  if (diagnosis.has?.founderNarrativeOverride || renewal) {
    return "Update the sales talk track to lead with hidden renewal-risk urgency before introducing category or AI revenue operating system language.";
  }
  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath) {
    return "Update the sales opener so reps connect the proof to the buyer's risk before asking for the next step.";
  }
  return "Update the sales talk track so reps do not need to translate the campaign story into buyer urgency themselves.";
}

function founderOwnerAction(diagnosis, buyerUrgency) {
  if (diagnosis.has?.salesObjectionConflict) {
    return "Founder narrative: stop amplifying the category frame until it answers the field objection; use executive language to make the buyer's operational risk obvious first.";
  }
  if (diagnosis.has?.explicitProofGap) {
    return "Founder narrative: remove revenue, pipeline, conversion, churn, or risk claims that cannot be backed by approved customer evidence in the launch decision brief.";
  }
  if (diagnosis.has?.founderNarrativeOverride) {
    return "Founder narrative asset: move the category claim below the field-tested pain; use the launch post and internal memo to amplify hidden renewal risk, not replace it.";
  }
  return `Founder launch post: update founder and executive launch language so it stays anchored to ${buyerUrgency} before expanding into the broader category claim.`;
}

function metricForOwnerAction(kpiAtRisk) {
  if (/renewal|churn/i.test(kpiAtRisk)) return "Renewal-risk conversations created and qualified demo rate";
  if (/demo/i.test(kpiAtRisk)) return "Hero CTA conversion rate and qualified demo rate";
  if (/pipeline|opportunit/i.test(kpiAtRisk)) return "Launch-sourced opportunities and pipeline influenced";
  if (/campaign|spend/i.test(kpiAtRisk)) return "Campaign spend efficiency and CTA conversion rate";
  return `${kpiAtRisk} movement`;
}

function buildAlertLifecycle(diagnosis, status, kpiAtRisk, receipts, primaryAction) {
  const validationStatus = state.recheckResult?.status || "Launch risk found";
  return {
    alertId: `GTM-${localSlug(state.motionName || detectAuditedLaunch(diagnosis) || "exposure").slice(0, 18).toUpperCase()}-001`,
    status: validationStatus,
    owner: primaryAction?.owner || "Product Marketing",
    actionRequired: primaryAction?.actionRequired || primaryActionBeforeLaunch(diagnosis),
    kpiAtRisk,
    sourceReceipts: receipts,
    commercialExposureStatus: status,
    manualRecheckTriggerInput: "Upload revised hero, CTA, sales talk track, founder post, campaign copy, sales deck snippet, and outbound copy.",
    lastCheckedTimestamp: state.recheckResult?.checkedAt || "",
    supportedStatuses: ["Launch risk found", "Fix required", "Fixed", "Partially fixed", "Still exposed", "New risk introduced", "Safe to launch", "Needs another pass"]
  };
}

function selectedLaunchDecisionPath() {
  const ids = new Set(launchDecisionPathOptions.map((option) => option.id));
  return ids.has(state.launchDecisionPath) ? state.launchDecisionPath : "solo_exec_approval";
}

function decisionPathOptionLabel(path = selectedLaunchDecisionPath()) {
  return launchDecisionPathOptions.find((option) => option.id === path)?.title || "Solo execution, exec approval";
}

function actionForOwner(ownerActions, owner) {
  const ownerPattern = new RegExp(`\\b${owner}\\b`, "i");
  return ownerActions.find((item) => ownerPattern.test(item.owner || ""))?.actionRequired || "";
}

function launchDecisionContext(diagnosis, ownerActions = []) {
  const text = String(diagnosis.allText || "").toLowerCase();
  const top = diagnosis.dominantFractures?.[0]?.title || "";
  const has = diagnosis.has || {};
  const kpi = inferKpiAtRisk(diagnosis);
  const context = {
    type: "default",
    kpi,
    pmmAction: actionForOwner(ownerActions, "PMM") || primaryActionBeforeLaunch(diagnosis),
    salesAction: actionForOwner(ownerActions, "Sales") || "Validate whether the revised story handles the field objection and supports conversion.",
    cmoAction: actionForOwner(ownerActions, "CMO") || "Approve the final launch story, proof level, CTA, and campaign scale decision.",
    founderAction: actionForOwner(ownerActions, "Founder") || "Approve the strategic tradeoff before executive amplification or spend scale.",
    revopsAction: actionForOwner(ownerActions, "RevOps") || "Track CTA conversion, demo quality, objection rate, source attribution, and validation status.",
    decisionNeeded: `Do we fix the ${kpi} risk before spend scales or proceed with the current launch story?`
  };

  if (has.lightProofCaveat || /onboarding analytics|feature adoption|watch product walkthrough|adoption-focused/.test(text)) {
    return {
      ...context,
      type: "light_proof_caveat",
      decisionNeeded: "Do we proceed with the adoption-focused story while adding a light proof caveat before broader scale?",
      pmmAction: "Add a proof caveat beside the onboarding/adoption claim and keep the walkthrough CTA tied to feature adoption.",
      cmoAction: "Approve the light proof claim language if the launch expands beyond existing-customer adoption.",
      founderAction: "Approve claim language only if the feature story moves into broader revenue or churn messaging.",
      salesAction: "Have CS or Sales confirm the walkthrough and proof caveat match what existing customers ask about.",
      revopsAction: "Monitor adoption, walkthrough engagement, and onboarding escalation movement after launch."
    };
  }
  if (has.pricingTrustRisk || /pricing|packaging|usage-based|surprise bills|budget predictability|billing confusion/.test(text)) {
    return {
      ...context,
      type: "pricing_trust",
      decisionNeeded: "Do we prioritize AI monetization upside or customer trust protection?",
      pmmAction: "Clarify the pricing narrative around value, predictability, and customer control before customer-facing rollout.",
      salesAction: "Prepare Sales / CS objection handling for surprise bills, budget predictability, billing confusion, and expansion-risk questions.",
      cmoAction: "Approve pricing-page and customer-email language that protects trust while supporting expansion.",
      founderAction: "CEO / CFO / CMO align on monetization upside vs customer trust risk before broad rollout.",
      revopsAction: "Track expansion, churn-risk signals, support objections, and billing-confusion tags after launch."
    };
  }
  if (has.platformWedgeConflict || /three simultaneous launches|platform story|module-level|one ai platform|platform repositioning|wedge/.test(text)) {
    return {
      ...context,
      type: "platform_wedge",
      decisionNeeded: "Do we launch one platform story or sequence wedge-led motions?",
      pmmAction: "Decide the platform-vs-wedge launch architecture and define how each module maps to buyer pain and proof.",
      salesAction: "Create wedge-specific talk tracks so Sales can lead with the module pain buyers already understand.",
      cmoAction: "Approve whether campaign execution uses one platform story or segmented wedge motions.",
      founderAction: "CRO / CMO / CEO approve the platform narrative tradeoff against near-term pipeline priority.",
      revopsAction: "Give leadership visibility into module proof strength, buyer priority, pipeline source, and launch sequencing."
    };
  }
  if (has.churnExpansionSplit || /expansion revenue|churn prevention|surprise churn|retention pressure|benchmark report/.test(text)) {
    return {
      ...context,
      type: "churn_expansion",
      decisionNeeded: "Do we lead with churn prevention or expansion revenue for this launch?",
      pmmAction: "Resolve the churn-vs-expansion narrative and align proof, CTA, page copy, and launch story to one buyer promise.",
      salesAction: "Align enablement around the churn-prevention talk track Sales says buyers already care about.",
      cmoAction: "Approve the churn vs expansion tradeoff before campaign spend scales.",
      founderAction: "VP Marketing / CMO approve whether expansion stays a secondary outcome or becomes the primary claim.",
      revopsAction: "Measure influenced pipeline, CTA conversion, ad variant quality, and retention/churn objection patterns."
    };
  }
  if (has.securityComplianceSplit || /security|compliance|audit|cio|security director|audit-log|ai innovation/.test(text)) {
    return {
      ...context,
      type: "security_compliance",
      decisionNeeded: "Do we optimize this launch for AI innovation narrative or enterprise compliance pipeline?",
      pmmAction: "Prepare the Launch Fracture Brief, evidence receipts, CTA recommendation, proof-gap summary, and decision memo for approval.",
      salesAction: "Request Sales Enablement validation that the talk track handles compliance risk, audit exposure, and visibility objections.",
      cmoAction: "Director PMM approves the messaging tradeoff; VP Marketing / CMO makes the final innovation-vs-compliance narrative call.",
      founderAction: "Exec sponsor approves whether broad AI innovation language can stay primary or must follow compliance urgency.",
      revopsAction: "Demand Gen validates the CTA and spend path against enterprise pipeline quality."
    };
  }
  if (has.founderNarrativeOverride || /founder feedback|founder wants|sound bigger|category-defining|operating system for revenue|category vs buyer/.test(text)) {
    return {
      ...context,
      type: "founder_category",
      decisionNeeded: "Do we lead with broad category language or the field-tested buyer pain that drives demo intent?",
      pmmAction: "Revise CTA, campaign angle, proof placement, and sales narrative draft around the field-tested buyer pain.",
      salesAction: "Validate that the revised sales narrative opens with the field-tested pain before category language.",
      cmoAction: "Approve the category-vs-buyer-pain tradeoff and paid spend decision before spend scales.",
      founderAction: "Founder / C-suite approves whether category vision leads the launch or follows the buyer pain and proof.",
      revopsAction: "Track qualified demo conversion, objection rate, and paid-spend efficiency after the revised angle ships."
    };
  }
  if (/proof/i.test(top)) {
    return {
      ...context,
      type: "proof_gap",
      decisionNeeded: `Do we narrow the claim to approved proof before risking ${kpi}?`
    };
  }
  return context;
}

function buildApprovalPathItems(diagnosis, ownerActions = []) {
  const context = launchDecisionContext(diagnosis, ownerActions);
  const pmm = context.pmmAction;
  const cmo = context.cmoAction;
  const sales = context.salesAction;
  const revops = context.revopsAction;
  const founder = context.founderAction;
  const path = selectedLaunchDecisionPath();
  const suggested = path === "messy_unknown" ? "Suggested " : "";

  const groups = {
    solo_exec_approval: [
      ["PMM / GTM owner", pmm],
      ["Founder / CMO / C-suite approval", founder || cmo],
      ["Spend decision", cmo],
      ["Decision needed", context.decisionNeeded],
      ["Recheck", context.type === "light_proof_caveat" ? "Recheck is optional now; rerun before broader campaign scale." : "Run the revised page, proof, CTA, and sales narrative before spend scales."]
    ],
    ic_multi_level_approval: [
      ["IC PMM prepares", pmm],
      ["Director / CMO approves", cmo],
      ["Product / Security validates", context.type === "security_compliance" ? "Validate audit-log, compliance, and technical proof before the claim is approved." : "Validate the product, proof, and technical claims before the recommendation is escalated."],
      ["Sales Enablement validates", sales],
      ["Demand Gen validates", revops],
      ["Decision needed", context.decisionNeeded],
      ["Recheck", "Run revised page, proof, campaign, and sales narrative before launch gate."]
    ],
    pmm_cross_functional: [
      ["PMM", pmm],
      ["Demand Gen / Growth", context.type === "churn_expansion" ? "Revise the expansion ad variant and CTA path until they match the approved churn/retention narrative." : "Revise campaign angle, CTA path, and spend guardrails around the approved narrative."],
      ["Sales Enablement", sales],
      ["Sales leader", "Confirm reps can use the revised talk track without translating the launch story themselves."],
      ["CMO / VP Marketing", cmo],
      ["Decision needed", context.decisionNeeded],
      ["Recheck", "Validate page, campaign, and talk track before launch."]
    ],
    director_head_pmm: [
      ["Director PMM", pmm],
      ["PMM owners", context.type === "platform_wedge" ? "Map each module to its buyer pain, proof strength, CTA, and sales wedge." : "Assign each launch surface to a PMM owner with proof, CTA, and decision status."],
      ["Demand Gen / Growth workstream", context.type === "platform_wedge" ? "Avoid one-size-fits-all campaign execution until the platform vs wedge architecture is approved." : "Own campaign variant changes, spend guardrails, and conversion readout timing."],
      ["Sales / Enablement workstream", sales],
      ["Leadership decision visibility", founder || cmo],
      ["Measurement visibility", revops],
      ["Decision needed", context.decisionNeeded]
    ],
    messy_unknown: messyApprovalPathItems(context)
  };

  return (groups[path] || groups.solo_exec_approval).map(([owner, action]) => ({
    owner: `${suggested}${owner}`.replace(/^Suggested Suggested /, "Suggested "),
    action
  }));
}

function messyApprovalPathItems(context) {
  if (context.type === "pricing_trust") {
    return [
      ["Suggested Pricing narrative", "PMM / Marketing clarifies the value story, usage language, and customer-control promise."],
      ["Suggested Billing clarity", "Product / Finance validates billing predictability, margin guardrails, and customer-facing pricing detail."],
      ["Suggested Customer risk", "CS leader validates churn, trust, and rollout exposure before customer emails go out."],
      ["Suggested Objection handling", context.salesAction],
      ["Suggested Exec decision", context.founderAction],
      ["Suggested Decision needed", context.decisionNeeded],
      ["Suggested Recheck", "Validate customer email, pricing page, Sales/CS talk track, and billing FAQ before rollout."]
    ];
  }
  if (context.type === "security_compliance") {
    return [
      ["Suggested Compliance proof", "PMM and Security gather audit, compliance, and visibility receipts."],
      ["Suggested Security validation", "Product / Security validates the proof before the claim is approved."],
      ["Suggested Sales enablement", context.salesAction],
      ["Suggested Exec narrative", context.founderAction],
      ["Suggested Decision needed", context.decisionNeeded]
    ];
  }
  if (context.type === "platform_wedge") {
    return [
      ["Suggested Launch architecture", context.pmmAction],
      ["Suggested Module proof", "PMM owners map proof strength and buyer pain by module."],
      ["Suggested Sales wedge", context.salesAction],
      ["Suggested Exec priority", context.founderAction],
      ["Suggested Decision needed", context.decisionNeeded]
    ];
  }
  if (context.type === "churn_expansion") {
    return [
      ["Suggested Retention narrative", context.pmmAction],
      ["Suggested CS validation", "CS validates retention, churn, and customer-risk language."],
      ["Suggested Proof", "PMM confirms proof supports the chosen retention or expansion claim."],
      ["Suggested Sales / CS objection handling", context.salesAction],
      ["Suggested Decision needed", context.decisionNeeded]
    ];
  }
  return [
    ["Suggested PMM / GTM owner", context.pmmAction],
    ["Suggested Sales / Enablement", context.salesAction],
    ["Suggested Demand Gen / Growth", "Pause or adjust the broad variant before spend scales."],
    ["Suggested Founder / C-suite approval", context.founderAction || context.cmoAction],
    ["Suggested Decision needed", context.decisionNeeded],
    ["Suggested recheck", "Run revised page, proof, and sales narrative before launch gate."]
  ];
}

function decisionPathNote() {
  if (selectedLaunchDecisionPath() === "messy_unknown") return "Ownership is unclear, so Cognix labels the workstreams and likely approvals as suggested.";
  if (selectedLaunchDecisionPath() === "solo_exec_approval") return "Solo team? Cognix collapses this into one prioritized action list.";
  return "";
}

function buildForwardableExecutiveExposureBrief(diagnosis, exposure) {
  const receipts = exposure.sourceReceipts || buildSourceReceipts(diagnosis);
  const owner = exposure.ownerActionMatrix || [];
  const approvalPath = exposure.approvalPath || buildApprovalPathItems(diagnosis, owner);
  const judgment = exposure.fractureJudgment || buildGtmFractureJudgment(diagnosis, receipts, exposure);
  const decision = briefDecisionLabel(diagnosis);
  const why = buildBriefWhy(diagnosis, receipts, exposure, judgment);
  const cost = formatScenarioCost(exposure);
  const validation = state.recheckResult?.status || "Needs another pass";
  const fixes = exposure.assetLevelFixes || buildAssetLevelFixes(diagnosis, receipts, exposure);
  const decisionNeeded = exposure.decisionNeeded || launchDecisionContext(diagnosis, owner).decisionNeeded;
  return [
    "Launch decision brief",
    "",
    "Launch risk:",
    conciseStoryGap(judgment.fracture),
    "",
    "Commercial implication:",
    why,
    "",
    "KPI at risk:",
    exposure.kpiAtRisk,
    "",
    "Decision:",
    decision,
    "",
    "Decision needed:",
    decisionNeeded,
    "",
    "What it could cost:",
    cost,
    "",
    "Required fixes:",
    ...fixes.slice(0, 5).map((item) => `- ${item.asset}: ${item.fix}`),
    "",
    "Suggested owner + approval path:",
    ...approvalPath.slice(0, 5).map((item) => `- ${item.owner}: ${item.action}`),
    "",
    "Validation status:",
    validation,
    "",
    "Receipts:",
    `- Founder narrative: "${receiptFor(receipts, "Strategy surface") || "Not provided"}"`,
    `- Landing page: "${receiptFor(receipts, "Execution surface") || "Not provided"}"`,
    `- Sales feedback: "${receiptFor(receipts, "Field reality") || "Not provided"}"`,
    `- Proof: "${receiptFor(receipts, "Proof surface") || "Not provided"}"`
  ].join("\n");
}

function launchDecisionLabel(diagnosis) {
  if (diagnosis.has?.lightProofCaveat) return "Proceed with proof caveat";
  if (diagnosis.riskLabel === "Low" || diagnosis.has?.strongLaunch || diagnosis.has?.alignedLaunch) return "Proceed, monitor proof gap";
  if (diagnosis.riskLabel === "Critical") return "Launch hold recommended";
  if (diagnosis.riskLabel === "High" || diagnosis.riskLabel === "Medium to high" || diagnosis.has?.founderNarrativeOverride) return "Pause spend scale";
  return "Fix before spend scales";
}

function briefDecisionLabel(diagnosis) {
  const label = launchDecisionLabel(diagnosis);
  if (label === "Fix before spend scales" && diagnosis.has?.founderNarrativeOverride) return "Pause spend scale.";
  return label.endsWith(".") ? label : `${label}.`;
}

function conciseStoryGap(value) {
  return String(value || "")
    .replace("the field-tested buyer pain", "field-tested renewal-risk pain")
    .trim();
}

function buildBriefWhy(diagnosis, receipts, exposure, judgment) {
  if (diagnosis.has?.salesObjectionConflict) {
    return "Sales reality explicitly contradicts the launch story, so the launch risks demo conversion, sales confusion, and pipeline quality unless the homepage, campaign, and talk track answer the field objection.";
  }
  if (diagnosis.has?.explicitProofGap) {
    return "Buyers are being asked to believe a business-impact claim before approved proof is visible, creating proof trust, demo conversion, and executive confidence risk.";
  }
  if (diagnosis.has?.alignedLaunch) {
    return "The strategy, buyer pain, proof, CTA, and sales narrative point to the same buyer action and business outcome; remaining risk is launch handoff drift, not a major GTM fracture.";
  }
  if (diagnosis.has?.founderNarrativeOverride) {
    return "The launch goal depends on qualified demos, but the page leads with broad “AI revenue operating system” language while sales says buyers respond to hidden renewal risk.";
  }
  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath) {
    return `The launch goal depends on ${exposure.kpiAtRisk}, but the CTA stays education-only while proof shows a stronger buyer reason to act.`;
  }
  return `${judgment.conflictingNodes} are not reinforcing the same buyer action.`;
}

function briefOwnerAction(item, diagnosis) {
  const owner = ownerBriefLabel(item.owner);
  if (owner === "PMM") return diagnosis.has?.founderNarrativeOverride
    ? "Re-anchor hero, CTA, and talk track around hidden renewal risk."
    : item.actionRequired;
  if (owner === "CMO") return "Use category language only after buyer pain is established.";
  if (owner === "Sales") return diagnosis.has?.founderNarrativeOverride
    ? "Standardize the renewal-risk talk track."
    : item.actionRequired;
  if (owner === "RevOps") return "Track qualified demo conversion and objection rate by source.";
  if (owner === "Founder") return "Use category language only after buyer pain is established.";
  return item.actionRequired;
}

function ownerBriefLabel(owner) {
  return String(owner || "")
    .replace("Product Marketing", "PMM")
    .replace("CMO / Marketing leadership", "CMO")
    .replace("Sales leadership", "Sales")
    .replace("Founder / CEO", "Founder");
}

function buildAssetLevelFixes(diagnosis, receipts, exposure = {}) {
  const rewrite = diagnosis.outputArchitecture?.rewritePanel?.sayThis || buildContextualRewriteHeadline(diagnosis);
  const cta = diagnosis.outputArchitecture?.ctaPanel?.sayThis || buildBuyerSpecificCta(diagnosis);
  const proof = receiptFor(receipts, "Proof surface") || bestProofLine(diagnosis);
  const field = receiptFor(receipts, "Field reality") || "the field-tested buyer pain";
  const execution = receiptFor(receipts, "Execution surface");
  const category = trimFounderNarrativePhrase(extractFounderNarrativeSignal(diagnosis) || "AI/category language");
  const kpi = exposure.kpiAtRisk || inferKpiAtRisk(diagnosis);
  const fix = ({ asset, wrong, receipt, correction, phrase = "", metric = kpi, owner = "PMM" }) => ({
    asset,
    fix: [
      `What is structurally wrong: ${wrong}`,
      `Source receipt causing the issue: "${receipt || "Not provided"}"`,
      `Required correction: ${correction}`,
      phrase ? `Optional source-backed phrase: "${phrase}"` : "Optional source-backed phrase: none until the receipt supports it.",
      `Target metric: ${metric}.`,
      `Owner: ${owner}.`
    ].join(" ")
  });
  if (diagnosis.has?.salesObjectionConflict) {
    return [
      fix({ asset: "Homepage hero", wrong: "The hero is not answering the field objection before product or category language.", receipt: field, correction: "Lead with the objection and resolved buyer pain, then introduce product language.", phrase: field, metric: kpi }),
      fix({ asset: "CTA", wrong: "The CTA does not turn the objection into a buyer-action next step.", receipt: execution || field, correction: "Use a CTA that asks the buyer to inspect or resolve the specific objection path.", phrase: cta, metric: "qualified demo conversion" }),
      fix({ asset: "Sales talk track", wrong: "Sales would still need to translate the launch story manually.", receipt: field, correction: "Open with the objection, answer it with the concrete pain, then introduce product language.", phrase: field, metric: "demo-to-opportunity conversion", owner: "Sales" }),
      fix({ asset: "Proof block", wrong: "Proof is not placed where it resolves the objection.", receipt: proof, correction: "Place the proof line beside the hero and in the sales deck where the objection is handled.", metric: "pipeline quality" }),
      fix({ asset: "Launch decision memo", wrong: "The decision memo does not identify sales objection conflict as the dominant launch risk.", receipt: field, correction: "Update the memo to document the dominant risk, revised hero/CTA/talk-track owners, and recheck requirement before spend scales.", metric: kpi })
    ];
  }
  if (diagnosis.has?.explicitProofGap) {
    return [
      fix({ asset: "Homepage hero", wrong: "The page asks buyers to believe a business-impact claim before approved evidence is visible.", receipt: proof || field, correction: "Place approved customer evidence immediately under the claim and before the CTA.", metric: kpi }),
      fix({ asset: "CTA", wrong: "The CTA asks for action before the proof block supports the claim.", receipt: execution || proof, correction: "Replace the CTA sequencing so the next step appears only after evidence tied to the claim is visible.", phrase: cta, metric: "qualified demo conversion" }),
      fix({ asset: "Proof block", wrong: "The proof does not support the revenue, pipeline, churn, risk, or conversion impact being claimed.", receipt: proof || "proof missing", correction: "Do not claim revenue, pipeline, churn, risk reduction, or conversion impact unless approved proof is tied to that outcome.", metric: "executive confidence and pipeline quality", owner: "CMO" }),
      fix({ asset: "Sales talk track", wrong: "Reps do not have an approved proof line for buyer evidence requests.", receipt: field, correction: "Add the approved proof line and tag calls where proof still blocks trust.", metric: "demo-to-opportunity conversion", owner: "Sales" }),
      fix({ asset: "Launch decision memo", wrong: "The memo does not record proof as the launch blocker.", receipt: proof || field, correction: "Update the memo to name the proof owner and keep validation in Needs another pass until approved evidence is added.", metric: kpi })
    ];
  }
  if (diagnosis.has?.founderNarrativeOverride) {
    return [
      fix({ asset: "Homepage hero", wrong: "Category language is appearing before the field-tested buyer pain.", receipt: field, correction: `Move the field-tested buyer pain above the category claim. Introduce "${category}" only after buyer urgency is established.`, phrase: field, metric: kpi }),
      fix({ asset: "CTA", wrong: "The next step is not semantically tied to the dominant renewal-risk pain.", receipt: field, correction: "Replace the CTA with a renewal-risk review or equivalent buyer-action tied to the field receipt.", phrase: cta, metric: kpi }),
      fix({ asset: "Campaign angle", wrong: "Campaign copy lets category ambition outrun buyer urgency.", receipt: field, correction: "Open with hidden renewal-risk urgency, then use category framing as the second-order explanation.", phrase: field, metric: kpi }),
      fix({ asset: "Sales talk track", wrong: "Sales would still need to translate the category story into buyer pain.", receipt: field, correction: "Open with hidden renewal risk and use the category claim only after the buyer accepts the urgency.", phrase: field, metric: "demo-to-opportunity conversion", owner: "Sales" }),
      fix({ asset: "Proof block", wrong: "Proof is not explicitly tied to the renewal-risk claim and CTA.", receipt: proof, correction: "Place proof beside the claim and CTA and tie it to demo conversion or renewal-risk urgency.", metric: kpi }),
      fix({ asset: "Founder narrative", wrong: "Founder/category language is overriding the field-tested pain.", receipt: category, correction: "Sequence category language as the strategic frame only after the launch explains the buyer pain sales is already seeing.", phrase: field, metric: "executive narrative consistency" }),
      fix({ asset: "Launch decision memo", wrong: "Spend approval is not gated on revised hierarchy across launch assets.", receipt: field, correction: "Update the memo to document that spend pauses until hero, CTA, campaign copy, sales talk track, and founder language all lead with renewal-risk urgency.", metric: kpi })
    ];
  }
  if (diagnosis.has?.passiveCta || diagnosis.has?.strongProofWeakConversionPath) {
    return [
      fix({ asset: "Homepage hero", wrong: "The claim and proof are not setting up a qualified buyer action.", receipt: proof || field, correction: "Move buyer pain and proof above the CTA before product capability language.", metric: kpi }),
      fix({ asset: "CTA", wrong: "The CTA is passive or disconnected from the KPI at risk.", receipt: execution || field, correction: "Replace passive learning with a buyer-action next step tied to the strongest proof or pain.", phrase: cta, metric: kpi }),
      fix({ asset: "Campaign angle", wrong: "Campaign copy optimizes for education clicks instead of qualified action.", receipt: field || execution, correction: "Lead with the risk a qualified buyer wants resolved now.", metric: kpi }),
      fix({ asset: "Sales talk track", wrong: "The sales opener does not connect proof to buyer risk before the demo ask.", receipt: proof || field, correction: "Give sales one opener that links proof to buyer risk before the demo ask.", metric: "demo-to-opportunity conversion", owner: "Sales" }),
      fix({ asset: "Proof block", wrong: "Proof is not close enough to the CTA to support buyer action.", receipt: proof, correction: "Move the strongest proof next to the CTA.", metric: kpi }),
      fix({ asset: "Launch decision memo", wrong: "The launch decision is not gated on a buyer-action CTA.", receipt: execution || field, correction: "Update the memo to proceed only after the revised CTA asks for buyer action, not passive learning.", metric: kpi })
    ];
  }
  if (diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification || diagnosis.has?.proofBuriedMissingPublic) {
    return [
      fix({ asset: "Homepage hero", wrong: "The hero claim is not supported by quantified proof in the first proof block.", receipt: proof || execution, correction: "Use the claim only if quantified proof appears within the first proof block.", phrase: rewrite, metric: kpi }),
      fix({ asset: "CTA", wrong: "The CTA appears before the buyer has evidence.", receipt: execution || proof, correction: "Place proof before the CTA and use the CTA only after evidence supports the ask.", phrase: cta, metric: kpi }),
      fix({ asset: "Proof block", wrong: "Proof is missing, buried, or not quantified against the KPI.", receipt: proof || "proof missing", correction: `Request a customer metric, quote, before-after result, or renewal/pipeline impact proof tied to ${kpi}.`, metric: kpi }),
      fix({ asset: "Sales talk track", wrong: "Sales may create its own evidence story.", receipt: proof || field, correction: "Give sales the approved proof line and the objection it resolves.", metric: "demo-to-opportunity conversion", owner: "Sales" }),
      fix({ asset: "Launch decision memo", wrong: "Spend is not gated on proof visibility.", receipt: proof || execution, correction: "Update the memo to hold broad spend until proof is visible beside the claim and CTA.", metric: kpi })
    ];
  }
  return [
    fix({ asset: "Homepage hero", wrong: "The hero may lead with broad category, AI, or platform language before buyer urgency.", receipt: field || execution, correction: "Lead with source-backed buyer pain before broad category, AI, or platform language.", phrase: rewrite, metric: kpi }),
    fix({ asset: "CTA", wrong: "The primary action may not map clearly to the KPI at risk.", receipt: execution || field, correction: "Use a primary action that maps directly to the launch KPI.", phrase: cta, metric: kpi }),
    fix({ asset: "Campaign angle", wrong: "Campaign copy may not explain the buyer risk before product capability.", receipt: field, correction: "Lead with the buyer risk, then explain product capability as the resolution path.", metric: kpi }),
    fix({ asset: "Sales talk track", wrong: "Sales may need to translate the launch story manually.", receipt: field || proof, correction: "Update the first-call opener to mirror the hero, proof, and CTA.", metric: "sales talk track adoption", owner: "Sales" }),
    fix({ asset: "Launch decision memo", wrong: "The launch decision does not yet bind KPI, owners, receipts, and validation state.", receipt: receiptFor(receipts, "Business metrics") || field, correction: "Update the launch decision, KPI at risk, required fixes, owners, receipts, and validation status before spend scales.", metric: kpi })
  ];
}

function runManualRecheck(diagnosis) {
  const original = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const contradiction = original.primaryContradiction || "";
  const receipts = original.sourceReceipts || buildSourceReceipts(diagnosis);
  const originalReceipt = receiptFor(receipts, "Field reality") || receiptFor(receipts, "Proof surface") || receiptFor(receipts, "Execution surface") || receiptFor(receipts, "Strategy surface") || "the original source receipt";
  const urgency = founderOverrideLeadMessage(diagnosis);
  const category = extractFounderNarrativeSignal(diagnosis);
  const anyInput = Object.values(state.recheckInputs).some((value) => String(value || "").trim());
  const checks = [
    { id: "hero", label: "Hero", value: state.recheckInputs.hero, required: urgency, avoid: category },
    { id: "cta", label: "CTA", value: state.recheckInputs.cta, required: urgency, avoid: "Learn more" },
    { id: "salesTalkTrack", label: "Sales talk track", value: state.recheckInputs.salesTalkTrack, required: urgency, avoid: "" },
    { id: "campaignCopy", label: "Campaign copy", value: state.recheckInputs.campaignCopy, required: urgency, avoid: category },
    { id: "founderPost", label: "Founder post", value: state.recheckInputs.founderPost, required: urgency, avoid: category }
  ].map((item) => {
    const value = String(item.value || "");
    const requiredWords = normalizeOverlapText(item.required).split(" ").filter((word) => word.length > 4).slice(0, 5);
    const requiredHit = requiredWords.length ? requiredWords.some((word) => normalizeOverlapText(value).includes(word)) : value.trim().length > 12;
    const avoidHit = item.avoid && normalizeOverlapText(value).includes(normalizeOverlapText(item.avoid));
    return {
      label: item.label,
      fixed: Boolean(value.trim()) && requiredHit && !avoidHit
    };
  });
  const evaluated = anyInput ? checks : checks.map((item) => ({ ...item, fixed: false }));
  const fixedCount = evaluated.filter((item) => item.fixed).length;
  const allText = Object.values(state.recheckInputs).join("\n");
  const normalizedAll = normalizeOverlapText(allText);
  const categoryStillLeads = category && normalizedAll.includes(normalizeOverlapText(category)) && !normalizedAll.includes(normalizeOverlapText(urgency));
  const status = !anyInput
    ? "Needs another pass"
    : categoryStillLeads
      ? "New risk introduced"
      : fixedCount >= 4
        ? "Cleared"
        : fixedCount >= 2
          ? "Partially fixed"
          : fixedCount >= 1
            ? "Still exposed"
            : "Needs another pass";
  const remaining = evaluated.filter((item) => !item.fixed).map((item) => item.label);
  const changed = evaluated.filter((item) => item.fixed).map((item) => item.label).join(", ") || "No revised surfaces";
  const reason = status === "Cleared"
    ? `What changed: ${changed} now carry the buyer pain from the original receipt. Original risk resolved: "${contradiction}". Original receipt resolved: "${originalReceipt}". Remaining risk: none detected in the revised assets submitted. Launch decision: safe to proceed, with normal monitoring for proof placement and early sales feedback.`
    : status === "New risk introduced"
      ? `New risk introduced: the revision still lets category or off-path language outrun the buyer urgency. Compare against the original launch risk "${contradiction}" and receipt "${originalReceipt}".`
      : `${status === "Partially fixed" ? "Partially fixed" : "Still exposed"}: ${remaining.join(", ") || "Revised assets"} still need another pass against the original launch risk "${contradiction}" and receipt "${originalReceipt}". Fixed surfaces must carry the same buyer action, proof, and owner actions before validation can clear.`;
  return {
    status,
    surfaceChecks: evaluated,
    reason,
    checkedAt: new Date().toISOString()
  };
}

function buildCommercialExposure(diagnosis) {
  const kpiAtRisk = inferKpiAtRisk(diagnosis);
  const numbers = buildCommercialNumberContext(diagnosis);
  const missing = missingCommercialNumbers(numbers, kpiAtRisk);
  const model = buildCommercialExposureModel(numbers, diagnosis, kpiAtRisk);
  const sourceReceipts = buildSourceReceipts(diagnosis);
  const primaryContradiction = buildPrimaryContradiction(diagnosis, sourceReceipts);
  const status = commercialExposureStatus(diagnosis, model);
  const ownerActionMatrix = buildOwnerActionMatrix(diagnosis, sourceReceipts, kpiAtRisk);
  const launchDecisionPath = selectedLaunchDecisionPath();
  const approvalPath = buildApprovalPathItems(diagnosis, ownerActionMatrix);
  const decisionNeeded = launchDecisionContext(diagnosis, ownerActionMatrix).decisionNeeded;
  const assetLevelFixes = buildAssetLevelFixes(diagnosis, sourceReceipts, { kpiAtRisk });
  const measurementPlan = buildMeasurementPlan(diagnosis, kpiAtRisk);
  const alertLifecycle = buildAlertLifecycle(diagnosis, status, kpiAtRisk, sourceReceipts, ownerActionMatrix[0]);
  const exposure = {
    status,
    kpiAtRisk,
    riskMechanism: commercialRiskMechanism(diagnosis),
    knownNumbers: numbers.labels.length ? numbers.labels : ["No commercial numbers provided"],
    missingNumbers: missing.length ? missing : ["No critical exposure inputs missing"],
    missingFinancialContextConstraints: missing.length ? missing.map((item) => `${item} not provided`) : ["No critical exposure inputs missing"],
    exposureLabel: model.label,
    estimatedExposure: model.summary,
    commercialExposure: model.summary,
    scenarioExposureModel: model.scenario,
    primaryContradiction,
    confidenceLevel: exposureConfidence(diagnosis, numbers),
    executiveDecision: executiveDecisionForExposure(diagnosis, model),
    measurementPlan,
    sourceReceipts,
    launch_decision_path: launchDecisionPath,
    launchDecisionPath,
    decisionNeeded,
    approvalPath,
    ownerActionMatrix,
    assetLevelFixes,
    alertLifecycle
  };
  exposure.fractureJudgment = buildGtmFractureJudgment(diagnosis, sourceReceipts, exposure);
  exposure.executiveExposureBrief = buildForwardableExecutiveExposureBrief(diagnosis, exposure);
  return {
    ...exposure,
    confidence: exposure.confidenceLevel
  };
}

function legacyBuildCmoDecisionLine(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return "Approve campaign testing, but require PMM and Sales to preserve the same buyer-pain, proof, CTA, and objection handling across every channel.";
  }
  if (diagnosis.has?.genericAiPositioning || diagnosis.has?.commercialStakesMissingFromPage || diagnosis.has?.proofBuriedMissingPublic || diagnosis.has?.genericDemoCtaForRisk) {
    return "Do not approve full campaign spend until buyer-facing copy, CTA, proof placement, sales talk track, and campaign follow-up all carry the same qualified-pipeline story.";
  }
  if (diagnosis.has?.buyerMessageMismatch) {
    return "Do not approve campaign spend until the public page speaks to the selected buyer's commercial priorities and buying criteria.";
  }
  if (diagnosis.has?.strongProofWeakConversionPath) {
    return "Change the CTA from passive education to a specific risk readout or demo offer before scaling the campaign.";
  }
  if (diagnosis.has?.launchMotionActivityWeakConversion) {
    return "Hold spend until the launch has a buyer-specific conversion path that can turn attention into qualified demo intent.";
  }
  if (diagnosis.has?.proofMayWeakenLateStageConversion) {
    return "Approve a focused test only after quantified proof is placed close enough to the claim and CTA to support buyer belief.";
  }
  return "Approve a focused GTM fracture detection pass so buyer-facing copy, CTA, proof placement, sales talk track, and campaign follow-up carry the same receipts before spend goes live.";
}

function primaryActionBeforeLaunch(diagnosis) {
  return cleanActionItems(diagnosis.actions || diagnosis.recommendedFixes || [])[0] || "Use the cited internal strategy and buyer-facing copy receipts to bind the launch message, proof, CTA, and sales follow-up to the same story before spend goes live.";
}

function buildCmoRead(diagnosis) {
  const exposure = buildCommercialExposure(diagnosis);
  const spendClause = exposure.knownNumbers.some((item) => /^Launch spend:/i.test(item))
    ? " If launch spend is planned, the risk is inefficient conversion, not lack of activity."
    : ` Exact exposure is still limited by missing inputs: ${exposure.missingNumbers.join(", ")}.`;
  if (diagnosis.has?.founderNarrativeOverride) {
    return {
      headline: "Revenue risk is coming from story dilution, not signal quality.",
      revenueRisk: `Strong buyer evidence exists, but the current market story may not convert that evidence into ${exposure.kpiAtRisk.toLowerCase()}.${spendClause}`,
      why: "If the launch leads with abstract AI category language, the team may generate attention without enough renewal-risk urgency. That can weaken demo quality, sales follow-up, pipeline attribution, and marketing's credibility with revenue leadership.",
      departmentRisk: "Sales may translate the story themselves, creating inconsistent follow-up and weaker launch attribution.",
      action: "Sequence the story. Lead with renewal risk. Use category language only after the buyer understands the problem."
    };
  }
  const primary = primaryFractureLabel(diagnosis);
  return {
    headline: diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch
      ? "Launch execution is ready to test against revenue signals."
      : "Launch predictability is constrained by GTM story transmission.",
    revenueRisk: diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch
      ? `The GTM story has enough buyer pain, proof, CTA clarity, and sales alignment to support ${exposure.kpiAtRisk.toLowerCase()}.`
      : `The primary drag is ${formatFractureLabel(primary)}. The launch can create interest while ${exposure.kpiAtRisk.toLowerCase()}, sales confidence, or attribution stays weaker than the strategy requires.${spendClause}`,
    why: diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch
      ? "Consistent execution should make campaign learning cleaner and sales follow-up easier to connect to qualified demand."
      : "If this ships unchanged, marketing can look active without creating enough revenue-sharp buyer urgency.",
    departmentRisk: diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch
      ? "The main department risk is drift after handoff. Sales, demand gen, and leadership need to use the same buyer-pain proof path."
      : "Sales may compensate with its own version of the story, which weakens message consistency and makes launch attribution harder to defend.",
    action: primaryActionBeforeLaunch(diagnosis)
  };
}

function extractExecutiveLeadMessage(diagnosis) {
  const text = String(diagnosis?.allText || "");
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const explicit = text.match(/\bCatch renewal risk before it becomes churn\.?/i)
    || text.match(/\bFind the deals that will slip before your forecast call\.?/i)
    || text.match(/\bFind invoice exceptions before they become month-end backlog\.?/i)
    || text.match(/\bFind the handoff that is slowing down your workflow\.?/i);
  if (explicit?.[0]) return sentenceWithPeriod(explicit[0]);
  const buyerPressure = matrixValue(diagnosis, "buyer_pressure") || "";
  if (buyerPressure) return sentenceWithPeriod(preserveCompleteSentences(buyerPressure, 1, 120));
  const byDomain = {
    cs: "Catch renewal risk before it becomes churn.",
    sales: "Find the deals that will slip before your forecast call.",
    finance: "Find invoice exceptions before they become month-end backlog.",
    operations: "See where approvals get stuck.",
    revops: "Find the pipeline number leadership can trust.",
    marketing: diagnosis.outputArchitecture?.rewritePanel?.sayThis || "Protect launch-to-pipeline intent before spend scales."
  };
  return byDomain[domain] || byDomain.marketing;
}

function founderOverrideLeadMessage(diagnosis) {
  return extractExecutiveLeadMessage(diagnosis);
}

function buildExecutiveStrategicFrame(diagnosis) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "The product");
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const frames = {
    cs: `${product} becomes the intelligence layer that helps revenue teams act on customer risk before it becomes revenue loss.`,
    sales: `${product} becomes the intelligence layer that helps sales teams act on deal risk before it becomes forecast miss.`,
    finance: `${product} becomes the intelligence layer that helps finance teams act on exception risk before it becomes close risk.`,
    operations: `${product} becomes the operating layer that helps teams act on stuck work before it becomes execution drag.`,
    revops: `${product} becomes the intelligence layer that helps revenue teams turn cross-system pipeline signals into trusted decisions.`,
    marketing: `${product} becomes the GTM intelligence layer that helps teams protect launch intent before market execution dilutes it.`
  };
  return frames[domain] || frames.marketing;
}

function cmoReadSection(diagnosis) {
  const read = buildCmoRead(diagnosis);
  return `
      <section class="decision-section cmo-read-section">
        <div class="digest-section-head">
          <span>CMO read</span>
          <strong>${esc(read.headline)}</strong>
        </div>
        <div class="cmo-read-grid">
          <article>
            <span>Revenue risk</span>
            <p>${esc(read.revenueRisk)}</p>
          </article>
          <article>
            <span>Why it matters</span>
            <p>${esc(read.why)}</p>
          </article>
          <article>
            <span>Department risk</span>
            <p>${esc(read.departmentRisk)}</p>
          </article>
          <article>
            <span>Executive action</span>
            <p>${esc(read.action)}</p>
          </article>
        </div>
      </section>`;
}

function primaryFractureLabel(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) return "No major fracture detected";
  return displayFractureTitle(diagnosis.dominantFractures?.[0]?.title || diagnosis.pattern || "Launch conversion risk", diagnosis);
}

function secondaryFractureLabels(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return diagnosis.secondaryFractures?.length
      ? diagnosis.secondaryFractures.map((item) => displayFractureTitle(item.title, diagnosis))
      : ["Execution consistency across landing page, outbound, webinar, and sales follow-up"];
  }
  const items = (diagnosis.secondaryFractures || []).map((item) => item.title).filter(isRealFractureTitle).map((title) => displayFractureTitle(title, diagnosis));
  return items.length ? items : ["No additional fracture detected beyond the primary risk."];
}

function displayFractureTitle(title, diagnosis = null) {
  if (title === "Generic AI positioning weakens CMO-level demo intent" && diagnosis) {
    return genericAiDisplayTitleForDomain(diagnosis.domain || classifyLaunchDomain(diagnosis.signals || [], diagnosis.allText || ""));
  }
  const map = {
    "Generic AI positioning weakens CMO-level demo intent": "Generic AI positioning weakens CMO-level demo intent",
    "Proof is strong but CTA and conversion path are weak": "Proof is strong but CTA and conversion path are weak",
    "Proof gap may weaken late-stage demo conversion": "Proof gap may weaken late-stage demo conversion",
    "Weak buyer pain": "Missing buyer urgency signal",
    "Weak sales conversion path": "Sales story mismatch",
    "Weak connection between launch activity and qualified pipeline": "Launch activity is not connected to qualified pipeline",
    "Weak demo intent": "Buyer interest is not converting into demo intent",
    "Feature-heavy message": "Feature-heavy execution dilutes buyer urgency",
    "AI-generated message inconsistency": "Cross-surface message inconsistency"
  };
  return map[title] || title;
}

function genericAiDisplayTitleForDomain(domain) {
  const id = domain?.id || "marketing";
  if (id === "revops") return "Generic AI/revenue intelligence positioning weakens RevOps demo intent";
  if (id === "sales") return "Generic AI/deal intelligence positioning weakens sales leadership demo intent";
  if (id === "cs") return "Generic AI/customer health positioning weakens renewal-risk urgency";
  if (id === "finance") return "Generic AI/invoice intelligence positioning weakens finance buyer urgency";
  if (id === "operations") return "Generic AI/workflow automation positioning weakens operations buyer urgency";
  return "Generic AI positioning weakens CMO-level demo intent";
}

function isRevOpsPipelineReviewScenario(diagnosis) {
  const text = `${diagnosis?.allText || ""} ${diagnosis?.extractedConcepts?.icp || ""}`;
  return /\brevops\b/i.test(text) && /\bpipeline reviews?|forecast confidence|salesforce|gong|clari|numbers nobody trusts\b/i.test(text) && !/\bcmo\b/i.test(text);
}

function isDealForecastScenario(diagnosis) {
  const text = `${diagnosis?.allText || ""} ${diagnosis?.extractedConcepts?.product || ""}`;
  return /\bdealpulse\b|\bforecast calls?\b|\bdeals? (?:that )?(?:will )?slip|\bslipping deals?\b|\bforecast risk\b/i.test(text) && !/\bcmo\b/i.test(text);
}

function classifyLaunchDomain(signals = [], allText = "") {
  const text = `${allText || ""} ${signals.map((signal) => signal.text || "").join(" ")}`.toLowerCase();
  const score = {
    marketing: countDomainHits(text, ["cmo", "vp marketing", "pmm", "product marketing", "campaign", "launch story", "qualified demos", "launch-to-pipeline", "paid spend"]),
    revops: countDomainHits(text, ["revops", "cro", "pipeline review", "forecast accuracy", "salesforce", "gong", "clari", "pipeline trust", "numbers nobody trusts"]),
    sales: countDomainHits(text, ["vp sales", "sales leaders", "deal risk", "forecast call", "commit deals", "slipping deals", "dealpulse", "executive intervention", "forecast risk"]),
    cs: countDomainHits(text, ["vp customer success", "vp cs", "cs ops", "csm", "renewal", "churn", "health score", "adoption", "qbr", "gainsight", "customer health"]),
    finance: countDomainHits(text, ["controller", "vp finance", "ap director", "invoice", "erp", "month-end", "month end", "po mismatch", "payment risk", "close risk", "exceptioniq"]),
    operations: countDomainHits(text, ["operations leaders", "business systems", "workflow", "approval", "approvals", "handoff", "handoffs", "bottleneck", "ownership", "flowpilot"])
  };
  if (/\bdealpulse\b|\bforecast calls?\b|\bdeals? (?:that )?(?:will )?slip|\bslipping deals?\b|\bforecast risk\b/i.test(text)) return { id: "sales", label: "Sales / deal risk", score: score.sales };
  if (score.cs > 0) return { id: "cs", label: "Customer success / renewal", score: score.cs };
  if (score.finance > 0) return { id: "finance", label: "Finance / AP", score: score.finance };
  if (score.operations > 0 && score.operations >= score.marketing) return { id: "operations", label: "Operations / workflow", score: score.operations };
  if (score.sales > 0 && score.sales >= score.revops) return { id: "sales", label: "Sales / deal risk", score: score.sales };
  if (score.revops > 0) return { id: "revops", label: "RevOps / pipeline review", score: score.revops };
  return { id: "marketing", label: "Marketing / PMM launch", score: score.marketing };
}

function countDomainHits(text, terms) {
  return terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0);
}

function buildWhyNotHigher(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return ["The remaining risk is execution consistency across launch channels.", "Sales follow-up must preserve the same buyer-pain proof and CTA.", "Campaign learning should confirm the message holds outside the controlled launch inputs."];
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
  return amount ? `${amount} launch investment signal detected` : "Add launch investment, demo target, or pipeline goal to quantify risk.";
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
      { label: commercialWhyLabel(diagnosis), value: commercialWhyValue(diagnosis) }
    ];
  }
  return [
    { label: "Likely budget risk", value: diagnosis.riskLabel === "Low" ? "Lower, assuming execution stays consistent." : "Campaign spend may be used to discover a message that should be tightened before launch." },
    { label: "Likely pipeline risk", value: diagnosis.demoIntentRisk || "Qualified demo conversion may lag launch activity." },
    { label: "Data missing to quantify impact", value: "Add launch spend, target demo volume, demo-to-opportunity rate, ACV, and expected ARR influence." }
  ];
}

function commercialWhyLabel(diagnosis) {
  const id = diagnosis?.domain?.id || diagnosis?.has?.domain || "marketing";
  if (id === "revops") return "Why it matters to RevOps";
  if (id === "sales") return "Why it matters to Sales leadership";
  if (id === "cs") return "Why it matters to CS";
  if (id === "finance") return "Why it matters to Finance/AP";
  if (id === "operations") return "Why it matters to Operations";
  return "Why it matters to the CMO";
}

function commercialWhyValue(diagnosis) {
  const id = diagnosis?.domain?.id || diagnosis?.has?.domain || "marketing";
  if (id === "sales") return "Spend should not scale until the message, proof, CTA, and sales follow-up can convert attention into forecast-risk conversations.";
  if (id === "cs") return "Spend should not scale until the message, proof, CTA, and sales follow-up can convert attention into renewal-risk conversations.";
  if (id === "finance") return "Spend should not scale until the message, proof, CTA, and sales follow-up can convert attention into finance/AP urgency.";
  if (id === "operations") return "Spend should not scale until the message, proof, CTA, and sales follow-up can convert attention into workflow-risk urgency.";
  if (id === "revops") return "Spend should not scale until the message, proof, CTA, and sales follow-up can convert attention into pipeline-review trust.";
  return "Spend should not scale until the message, proof, CTA, and sales follow-up can convert attention into qualified pipeline.";
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
  const actions = domainNativeActionItems(diagnosis, cleanActionItems(diagnosis.actions || []));
  return {
    fixBeforeLaunch: (actions.length ? actions : [primaryActionBeforeLaunch(diagnosis)]).slice(0, 5),
    monitorDuringLaunch: buildLaunchWeekIndicators(diagnosis),
    feedBackToSales: buildSalesFeedbackActions(diagnosis)
  };
}

function buildLaunchWeekIndicators(diagnosis) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const byDomain = {
    sales: ["Forecast-risk conversation quality by sales leader persona", "CTA click-to-forecast-risk readout conversion", "Sales-reported slipping-deal objections"],
    revops: ["Pipeline-review conversation quality by RevOps persona", "CTA click-to-pipeline-review readout conversion", "Sales-reported forecast-confidence objections"],
    cs: ["Renewal-risk conversation quality by CS persona", "CTA click-to-hidden-risk readout conversion", "Sales-reported health-score objections"],
    finance: ["Finance/AP demo quality by buyer role", "CTA click-to-invoice-exception readout conversion", "Sales-reported ERP or AP automation objections"],
    operations: ["Operations demo quality by workflow owner", "CTA click-to-handoff-risk readout conversion", "Sales-reported workflow automation objections"],
    marketing: ["Qualified demo request quality by target buyer", "CTA click-to-demo conversion", "Sales-reported objection patterns"]
  };
  const indicators = [...(byDomain[domain] || byDomain.marketing)];
  if (diagnosis.has?.commercialStakesMissingFromPage || diagnosis.has?.genericAiPositioning) indicators.push("Paid campaign spend efficiency by message variant");
  if (diagnosis.has?.proofGap || diagnosis.has?.proofNeedsQuantification) indicators.push("Proof-related hesitation in demo conversations");
  return indicators.slice(0, 4);
}

function buildSalesFeedbackActions(diagnosis) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const actionsByDomain = {
    sales: ["Give sales the revised forecast-risk narrative and primary slipping-deal proof point.", "Ask reps which forecast or deal-risk objection appears before buyers agree to a next step."],
    revops: ["Give sales the revised pipeline-review trust narrative and primary cross-system proof point.", "Ask reps which forecast-confidence objection appears before buyers agree to a next step."],
    cs: ["Give sales the revised renewal-risk narrative and primary health-score contradiction proof point.", "Ask reps which renewal, churn, or health-score objection appears before buyers agree to a next step."],
    finance: ["Give sales the revised invoice-exception narrative and primary AP proof point.", "Ask reps which ERP, AP automation, or month-end objection appears before buyers agree to a next step."],
    operations: ["Give sales the revised handoff-bottleneck narrative and primary workflow proof point.", "Ask reps which workflow, approval, or ownership objection appears before buyers agree to a next step."],
    marketing: ["Give sales the revised buyer-pain narrative and primary proof point.", "Ask reps which objection appears before buyers agree to a next step."]
  };
  const actions = [...(actionsByDomain[domain] || actionsByDomain.marketing)];
  if (diagnosis.has?.buyerMessageMismatch) actions.push("Have sales test whether the revised story matches the selected buyer's decision criteria.");
  else actions.push("Have sales report whether the CTA creates urgency or only education.");
  return actions;
}

function domainNativeActionItems(diagnosis, actions) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const replacements = {
    sales: {
      "Move the strongest proof point into the page section closest to the pain and CTA.": "Move forecast-risk proof, slipping-deal evidence, or executive-intervention proof next to the headline and CTA.",
      "Add an objection response for why now.": "Add an objection response for why forecast risk must be resolved before the next forecast call.",
      "Move the primary CTA from passive learning to a direct demo-intent ask.": "Move the CTA from passive learning to a forecast-risk readout."
    },
    revops: {
      "Move the strongest proof point into the page section closest to the pain and CTA.": "Move pipeline-review trust proof or cross-system contradiction evidence next to the headline and CTA.",
      "Add an objection response for why now.": "Add an objection response for why pipeline-review trust matters before the next executive revenue meeting.",
      "Move the primary CTA from passive learning to a direct demo-intent ask.": "Move the CTA from passive learning to a pipeline-review risk readout."
    },
    cs: {
      "Move the strongest proof point into the page section closest to the pain and CTA.": "Move hidden renewal-risk proof, churn-prevention evidence, or health-score contradiction proof next to the headline and CTA.",
      "Add an objection response for why now.": "Add an objection response for why renewal risk must be surfaced before the account turns red.",
      "Move the primary CTA from passive learning to a direct demo-intent ask.": "Move the CTA from passive learning to a hidden renewal-risk readout."
    },
    finance: {
      "Move the strongest proof point into the page section closest to the pain and CTA.": "Move invoice-exception proof, backlog reduction, or AP-hour savings next to the headline and CTA.",
      "Add an objection response for why now.": "Add an objection response for why invoice exceptions need attention before month-end close.",
      "Move the primary CTA from passive learning to a direct demo-intent ask.": "Move the CTA from passive learning to an invoice-exception leakage readout."
    },
    operations: {
      "Move the strongest proof point into the page section closest to the pain and CTA.": "Move handoff-bottleneck proof, approval-cycle evidence, or workflow-delay metrics next to the headline and CTA.",
      "Add an objection response for why now.": "Add an objection response for why handoff delays need attention before the next workflow cycle.",
      "Move the primary CTA from passive learning to a direct demo-intent ask.": "Move the CTA from passive learning to a handoff-bottleneck readout.",
      "Resolve the broad-positioning concern before using the message in paid or sales-led launch motions.": "Resolve the generic workflow-automation positioning before using the message in paid or sales-led launch motions.",
      "Quantify the pain with time, pipeline, cost, decision risk, or launch impact.": "Quantify the workflow pain with approval cycle time, stalled request rate, ownership gaps, or hours saved."
    }
  };
  const map = replacements[domain] || {};
  return actions.map((item) => map[item] || item);
}

function logicTrackingBullets(diagnosis, mode = "rewrite") {
  const items = logicTrackingItems(diagnosis, mode);
  return `
    <div class="logic-track-list">
      <b>Used:</b>
      <ul>
        ${items.map(({ label, value, quote = true }) => `<li><span>${esc(label)}:</span> ${quote ? `“${esc(trimCollisionPhrase(value))}”` : esc(value)}</li>`).join("")}
      </ul>
    </div>`;
}

function logicTrackingItems(diagnosis, mode = "rewrite") {
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  const commercial = formattedCommercialKpis(diagnosis).map((item) => item.value).join("; ");
  const replaced = mode === "cta"
    ? architecture.ctaPanel.instead
    : (matrixSourcePhrase(diagnosis, "public_dilution") || matrixValue(diagnosis, "public_dilution") || matrixValue(diagnosis, "current_headline"));
  const rewriteLogic = mode === "cta"
    ? "This repair replaces passive curiosity with a qualified buyer action."
    : "This repair replaces capability framing with the buyer's actual business risk.";
  return [
    { label: "Internal insight", value: matrixSourcePhrase(diagnosis, "internal_strategic_insight") || matrixValue(diagnosis, "internal_strategic_insight") || matrixValue(diagnosis, "internal_insight") },
    { label: "Buyer pressure", value: matrixSourcePhrase(diagnosis, "buyer_pressure") || matrixValue(diagnosis, "buyer_pressure") },
    { label: "Buyer-facing phrase replaced", value: replaced },
    { label: "Commercial stake", value: commercial },
    { label: "Rewrite logic", value: rewriteLogic, quote: false }
  ].filter((item) => item.value);
}

function compactCoherenceLines(diagnosis, architecture) {
  const collision = architecture.collision || {};
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return [
      "No major GTM contradiction detected.",
      "Internal strategy and buyer-facing execution carry the same strategic thread.",
      "Primary watchout: keep buyer pain, proof, CTA, and objection handling consistent across launch surfaces."
    ];
  }
  const meta = collisionDisplayMeta(collision, diagnosis);
  const lines = [];
  if (collision.upstream) lines.push(`${meta.leftLabel}: ${collision.upstream}`);
  if (collision.downstream) lines.push(`${meta.rightLabel}: ${collision.downstream}`);
  const risk = architecture.commercialPanel?.label === "Commercial risk"
    ? "What breaks if this ships: execution may create activity without enough qualified buyer intent."
    : "Cognix PMM read: the strongest evidence sits in the collision below.";
  lines.push(risk);
  return lines.slice(0, 4);
}

function coherenceReadMarkup(diagnosis, architecture) {
  return `
    <div class="coherence-read-lines">
      ${compactCoherenceLines(diagnosis, architecture).map((line) => `<p>${esc(line)}</p>`).join("")}
    </div>`;
}

function commercialMetricStrip(diagnosis) {
  const kpis = formattedCommercialKpis(diagnosis);
  const valueFor = (label) => kpis.find((item) => item.label === label)?.value || "Not provided";
  return `
    <div class="commercial-kpi-strip">
      <article>
        <span>Launch investment</span>
        <strong>${esc(valueFor("Launch investment"))}</strong>
      </article>
      <article>
        <span>Demo target</span>
        <strong>${esc(valueFor("Demo target"))}</strong>
      </article>
      <article>
        <span>ARR / pipeline influence</span>
        <strong>${esc(valueFor("ARR influence at risk"))}</strong>
      </article>
    </div>`;
}

function signalSortingSection(diagnosis) {
  const sorting = diagnosis.signalSorting || buildSignalSorting(diagnosis.signals || [], diagnosis.allText || "");
  const groups = sorting.groups.length ? sorting.groups : ["No reliable signal group detected"];
  return `
      <section class="decision-section signal-sorting-section">
        <div class="digest-section-head">
          <span>Signal sorting</span>
          <strong>Surface map before diagnosis</strong>
        </div>
        <div class="signal-sorting-grid">
          <article>
            <span>Detected document type</span>
            <strong>${esc(sorting.documentType)}</strong>
          </article>
          <article>
            <span>Buyer-facing copy confidence</span>
            <strong>${esc(sorting.buyerFacingCopyConfidence)}</strong>
            <p>${esc(sorting.confidenceReason)}</p>
          </article>
        </div>
        <div class="signal-group-list" aria-label="Signal groups detected">
          ${groups.map((group) => `<span>${esc(group)}</span>`).join("")}
        </div>
        <p class="signal-sorting-rule">${esc(sorting.diagnosisRule)}</p>
      </section>`;
}

function isConversionGapCollision(diagnosis) {
  const architecture = diagnosis.outputArchitecture || diagnosis;
  return architecture?.collision?.type === "passive_cta_vs_urgency";
}

function diagnosisReadHeading(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) return "GTM story is aligned";
  return isConversionGapCollision(diagnosis) ? "Conversion gap detected" : "GTM contradiction detected";
}

function diagnosisReadLabel(diagnosis) {
  return isConversionGapCollision(diagnosis) ? "Conversion gap" : "Story gap with receipts";
}

function diagnosisPdfSubtitle(diagnosis) {
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) return "Strategic story evidence";
  return isConversionGapCollision(diagnosis) ? "Conversion gap evidence before interpretation" : "Contradiction evidence before interpretation";
}

function commercialExposureAlertSection(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  return `
    <section class="commercial-alert-hero" aria-label="Launch risk found">
      <div>
        <span>Launch risk found</span>
        <h1>${esc(exposure.primaryContradiction)}</h1>
        <p>${esc(exposure.primaryContradiction)}</p>
      </div>
      <div class="alert-hero-grid">
        <article>
          <span>KPI at risk</span>
          <strong>${esc(exposure.kpiAtRisk)}</strong>
        </article>
        <article>
          <span>What it could cost</span>
          <strong>${esc(exposure.commercialExposure)}</strong>
        </article>
        <article>
          <span>Confidence</span>
          <strong>${esc(exposure.confidenceLevel)}</strong>
        </article>
        <article>
          <span>Decision</span>
          <strong>${esc(launchDecisionLabel(diagnosis))}</strong>
        </article>
      </div>
      <div class="scenario-model">
        <span>${esc(exposure.exposureLabel)}</span>
        <p>${esc(exposure.scenarioExposureModel)}</p>
      </div>
      <div class="missing-context">
        <span>Missing financial context constraints</span>
        <ul>${exposure.missingFinancialContextConstraints.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      </div>
    </section>`;
}

function sourceVerifiedReceiptsSection(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  return `
    <section class="decision-section receipts-section">
      <div class="digest-section-head">
        <span>Receipts</span>
        <strong>Exact lines causing the break</strong>
      </div>
      <div class="receipt-grid">
        ${exposure.sourceReceipts.map((item) => `
          <article>
            <span>${esc(item.surface)}</span>
            <p>${item.receipt ? `“${esc(item.receipt)}”` : "Not provided"}</p>
          </article>`).join("")}
      </div>
    </section>`;
}

function ownerActionMatrixSection(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const approvalPath = exposure.approvalPath || buildApprovalPathItems(diagnosis, exposure.ownerActionMatrix || []);
  const note = decisionPathNote();
  return `
    <section class="decision-section owner-action-section">
      <div class="digest-section-head">
        <span>Suggested owner + approval path</span>
        <strong>${esc(decisionPathOptionLabel(exposure.launch_decision_path || exposure.launchDecisionPath))}</strong>
      </div>
      <div class="owner-action-grid">
        ${approvalPath.map((item) => `
          <article>
            <span>${esc(item.owner)}</span>
            <p>${esc(item.action)}</p>
          </article>`).join("")}
      </div>
      ${note ? `<p class="decision-path-note">${esc(note)}</p>` : ""}
    </section>`;
}

function alertLifecycleSection(diagnosis) {
  const alert = (diagnosis.commercialExposure || buildCommercialExposure(diagnosis)).alertLifecycle;
  const statuses = ["Launch risk found", "Fix required", "Fixed", "Validation pass", "Recheck revised launch assets"];
  const statusActive = (label) => {
    if (label === "Recheck revised launch assets") return ["Safe to launch", "Still exposed", "Partially fixed", "New risk introduced", "Needs another pass"].includes(alert.status);
    return label === alert.status;
  };
  return `
    <section class="decision-section lifecycle-section">
      <div class="digest-section-head">
        <span>Fix status</span>
        <strong>${esc(alert.status)}</strong>
      </div>
      <div class="alert-object-grid">
        <article><span>Alert ID</span><p>${esc(alert.alertId)}</p></article>
        <article><span>Owner</span><p>${esc(alert.owner)}</p></article>
        <article><span>KPI at risk</span><p>${esc(alert.kpiAtRisk)}</p></article>
        <article><span>Launch risk status</span><p>${esc(alert.commercialExposureStatus)}</p></article>
        <article class="alert-object-wide"><span>Action required</span><p>${esc(alert.actionRequired)}</p></article>
        <article class="alert-object-wide"><span>Manual recheck trigger input</span><p>${esc(alert.manualRecheckTriggerInput)}</p></article>
        ${alert.lastCheckedTimestamp ? `<article><span>Last checked</span><p>${esc(alert.lastCheckedTimestamp)}</p></article>` : ""}
      </div>
      <div class="lifecycle-path" aria-label="Launch risk fix status">
        ${statuses.map((status, index) => `<span class="${statusActive(status) ? "active" : index === 0 ? "done" : ""}">${esc(status)}</span>`).join("")}
      </div>
    </section>`;
}

function manualRecheckSection(diagnosis) {
  const result = state.recheckResult;
  return `
    <section class="decision-section recheck-section">
      <div class="digest-section-head">
        <span>Validation pass</span>
        <strong>Recheck revised launch assets</strong>
      </div>
      <div class="recheck-grid">
        ${recheckAssetFields.map((field) => `
          <label>
            <span>${esc(field.label)}</span>
            <textarea data-recheck-input="${esc(field.id)}" placeholder="${esc(field.label)}">${esc(state.recheckInputs[field.id] || "")}</textarea>
          </label>`).join("")}
      </div>
      <div class="action-console memo-actions">
        <button type="button" data-action="trigger-recheck">Recheck revised launch assets</button>
      </div>
      ${result ? `
        <article class="recheck-result">
          <span>Result: ${esc(result.status)}</span>
          <div>${result.surfaceChecks.map((item) => `<p>${esc(item.label)} fixed: ${item.fixed ? "Yes" : "No"}</p>`).join("")}</div>
          <p><b>Reason:</b> ${esc(result.reason)}</p>
        </article>` : ""}
    </section>`;
}

function measurementPlanSection(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  return `
    <section class="decision-section measurement-section">
      <div class="digest-section-head">
        <span>Measurement path</span>
        <strong>Measurement Plan</strong>
      </div>
      <ul class="measurement-list">${exposure.measurementPlan.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
    </section>`;
}

function forwardableExecutiveBriefSection(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  return `
    <section class="memo-section executive-exposure-brief">
      <div class="digest-section-head">
        <span>Launch decision brief</span>
        <strong>Plain-text leadership note</strong>
      </div>
      <div class="memo-copy-block memo-card" data-exposure-brief tabindex="0">${esc(stripBriefDisplayTitle(exposure.executiveExposureBrief))}</div>
      <div class="action-console memo-actions">
        <button type="button" data-action="copy-exposure-brief">Copy Launch Decision Brief</button>
      </div>
    </section>`;
}

function stripBriefDisplayTitle(brief) {
  return String(brief || "").replace(/^(Forwardable Executive Exposure Brief|Launch decision brief)\s*\n+/i, "").trim();
}

function boardLeftRail(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const connected = state.motionName || detectAuditedLaunch(diagnosis) || "GTM workspace";
  return `
    <aside class="board-left-rail" aria-label="Cognix PMM navigation">
      <div class="board-brand">
        <span class="brand-mark" aria-hidden="true"></span>
        <strong>Cognix PMM</strong>
      </div>
      <nav>
        <button class="active" type="button">Workspace</button>
        <button type="button">Launch inputs</button>
        <button type="button">History</button>
        <button type="button">Settings</button>
      </nav>
      <div class="rail-section">
        <span>Launch inputs</span>
        ${["Strategy", "Campaign/page execution", "Sales reality", "Proof", "Launch economics", "Messy launch dump"].map((item) => `<p>${esc(item)}</p>`).join("")}
      </div>
      <div class="rail-status-card">
        <strong>${esc(connected)} inputs reviewed</strong>
        <span>All submitted GTM inputs reviewed</span>
      </div>
    </aside>`;
}

function boardExposureHero(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const judgment = exposure.fractureJudgment || buildGtmFractureJudgment(diagnosis, exposure.sourceReceipts || [], exposure);
  return `
    <section class="board-exposure-hero" aria-label="Story gap found">
      <div class="board-panel-head">
        <span>Story gap found</span>
        <strong>Cognix PMM found a contradiction between your launch inputs.</strong>
      </div>
      <div class="fracture-judgment">
        <span>The launch assumption that may break</span>
        <h1>${esc(judgment.fracture)}</h1>
        <p><b>Compared inputs:</b> ${esc(comparedInputsLabel(judgment, exposure))}</p>
      </div>
    </section>`;
}

function comparedInputsLabel(judgment, exposure) {
  if (/founder|category|leadership/i.test(judgment.title || judgment.fracture || "")) return "Founder narrative vs field reality";
  if (/proof/i.test(judgment.title || judgment.fracture || "")) return "Launch claim vs proof";
  if (/sales objection|sales reality/i.test(judgment.title || judgment.fracture || "")) return "Sales reality vs launch story";
  if (/CTA|conversion/i.test(judgment.title || judgment.fracture || "")) return "Launch goal vs CTA";
  const receipts = (exposure.sourceReceipts || []).filter((item) => item.surface !== "Business metrics");
  if (receipts.length >= 2) return `${receipts[0].surface.replace(/ surface$/i, "")} vs ${receipts[1].surface.replace(/ surface$/i, "")}`;
  return "Submitted GTM inputs";
}

function hasMissingFinancialContext(exposure) {
  return (exposure.missingFinancialContextConstraints || []).some((item) => !/No critical/i.test(item));
}

function boardResultSummary(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const judgment = exposure.fractureJudgment || buildGtmFractureJudgment(diagnosis, exposure.sourceReceipts || [], exposure);
  return `
    <section class="board-result-summary">
      <article>
        <span>KPI at risk</span>
        <p>${esc(exposure.kpiAtRisk)}</p>
      </article>
      <article>
        <span>What it could cost</span>
        <p>${esc(formatScenarioCost(exposure))}</p>
      </article>
      <article>
        <span>Missing financial context constraints</span>
        <p>${esc((exposure.missingFinancialContextConstraints || exposure.missingNumbers || ["No critical exposure inputs missing"]).join(", "))}</p>
      </article>
      <article>
        <span>${esc(exposure.exposureLabel || "Commercial exposure")}</span>
        <p>${esc(exposure.scenarioExposureModel || exposure.estimatedExposure || "Add launch economics to estimate potential exposure.")}</p>
      </article>
      <article>
        <span>Story gap with receipts</span>
        <p>${esc(exposure.primaryContradiction || judgment.fracture)}</p>
      </article>
      <article>
        <span>Where the story breaks</span>
        <p>${esc(judgment.whereBreaks)}</p>
      </article>
      <article>
        <span>Who feels it</span>
        <p>${esc(judgment.whoFeelsIt)}</p>
      </article>
      <article>
        <span>What breaks if this ships</span>
        <p>${esc(judgment.commercialRisk)}</p>
      </article>
      <article class="wide">
        <span>PMM fix path</span>
        <p>${esc(judgment.fixPath)}</p>
      </article>
      <article>
        <span>Confidence</span>
        <p>${esc(exposure.confidenceLevel || exposure.confidence || "Medium: source receipts support this read")}</p>
      </article>
      <article>
        <span>Launch decision</span>
        <p class="decision-danger">${esc(briefDecisionLabel(diagnosis).replace(/\.$/, ""))}</p>
      </article>
    </section>`;
}

function formatScenarioCost(exposure) {
  const summary = String(exposure.commercialExposure || exposure.estimatedExposure || "").trim();
  const scenario = String(exposure.scenarioExposureModel || "").trim();
  if (exposure.exposureType === "qualitative" || /Quantitative data missing from intake/i.test(summary)) {
    return summary || "Quantitative data missing from intake. Based on the detected launch risk, qualified demo conversion, campaign efficiency, or pipeline quality may be exposed if this ships without correction.";
  }
  const campaign = summary.match(/^Campaign spend exposure:\s*(.+?)\s+is exposed to inefficient conversion\.?$/i);
  if (campaign?.[1]) return `Scenario model: ${campaign[1]} may be exposed to inefficient conversion.`;
  const pipeline = summary.match(/^Potential pipeline exposure:\s*(.+)$/i);
  if (pipeline?.[1]) return `Scenario model: ${pipeline[1]}`;
  const renewal = summary.match(/^Renewal exposure:\s*(.+)$/i);
  if (renewal?.[1]) return `Scenario model: ${renewal[1]}`;
  if (/conditional estimate/i.test(scenario)) return `Scenario model: ${scenario.replace(/^Conditional estimate\.\s*/i, "")}`;
  return summary ? `Scenario model: ${summary.replace(/^Exposure not fully quantified\.?\s*/i, "")}` : "Scenario model: Add launch economics to estimate potential exposure.";
}

function financialContextUsed(exposure) {
  const labels = (exposure.knownNumbers || [])
    .filter((item) => item && !/No commercial numbers/i.test(item))
    .map((item) => item.split(":")[0].trim())
    .filter(Boolean);
  return labels.length ? labels.join(", ") : "";
}

function boardReceiptsPanel(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const receiptIcon = {
    "Strategy surface": "ST",
    "Execution surface": "EX",
    "Field reality": "FR",
    "Proof surface": "PR"
  };
  return `
    <section class="board-receipts-panel" aria-label="Evidence trail">
      <div class="board-panel-head">
        <span>Receipts</span>
        <strong>Exact lines causing the break</strong>
      </div>
      <div class="receipt-lanes">
        ${exposure.sourceReceipts.filter((item) => item.surface !== "Business metrics").map((item) => `
          <article>
            <i>${esc(receiptIcon[item.surface] || "GT")}</i>
            <span>${esc(item.surface)}</span>
            <p>“${esc(item.receipt || "Not provided")}”</p>
          </article>`).join("")}
      </div>
    </section>`;
}

function boardOwnerActionMatrix(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const approvalPath = exposure.approvalPath || buildApprovalPathItems(diagnosis, exposure.ownerActionMatrix || []);
  const note = decisionPathNote();
  return `
    <section class="board-side-panel owner-matrix-board">
      <div class="board-panel-head">
        <span>Suggested owner + approval path</span>
        <strong>${esc(decisionPathOptionLabel(exposure.launch_decision_path || exposure.launchDecisionPath))}</strong>
      </div>
      <div class="owner-board-list">
        ${approvalPath.map((item) => `
          <article>
            <div>
              <b>${esc(item.owner)}</b>
              <em>Approval path</em>
            </div>
            <p>${esc(item.action)}</p>
          </article>`).join("")}
      </div>
      ${note ? `<p class="decision-path-note">${esc(note)}</p>` : ""}
    </section>`;
}

function boardAssetFixes(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  return `
    <section class="board-side-panel asset-fixes-board">
      <div class="board-panel-head">
        <span>Exact fixes</span>
        <strong>Asset-level changes before launch</strong>
      </div>
      <div class="asset-fix-list">
        ${(exposure.assetLevelFixes || []).map((item) => `
          <article>
            <span>${esc(item.asset)}</span>
            <p>${esc(item.fix)}</p>
          </article>`).join("")}
      </div>
    </section>`;
}

function boardLifecycleCard(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const alert = exposure.alertLifecycle;
  const currentStatus = normalizeLifecycleStatus(alert.status);
  const statuses = ["Launch risk found", "Fix required", "Validation pass", currentStatus === "Cleared" ? "Cleared" : currentStatus];
  return `
    <section class="board-side-panel lifecycle-board ${currentStatus === "Cleared" ? "cleared" : ""}">
      <div class="board-panel-head">
        <span>Fix status</span>
        <strong>Status: ${esc(currentStatus)}</strong>
      </div>
      <div class="board-lifecycle-path">
        ${statuses.map((status, index) => `<span class="${index === statuses.length - 1 ? "active" : ""}">${esc(status)}</span>`).join("")}
      </div>
      <button class="primary-button" type="button" data-action="trigger-recheck">Recheck revised launch assets</button>
    </section>`;
}

function normalizeLifecycleStatus(status) {
  if (/safe to launch|fixed/i.test(String(status || ""))) return "Cleared";
  return status || "Launch risk found";
}

function boardManualRecheckCard(diagnosis) {
  const result = state.recheckResult;
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  const alert = exposure.alertLifecycle;
  const currentStatus = normalizeLifecycleStatus(result?.status || alert.status || "Needs another pass");
  const statuses = ["Launch risk found", "Fix required", "Validation pass", currentStatus];
  return `
    <section class="board-side-panel recheck-board ${currentStatus === "Cleared" ? "cleared" : ""}">
      <div class="board-panel-head">
        <span>Recheck revised launch assets</span>
        <strong>Paste revised assets to validate against the original launch risk and approval path.</strong>
      </div>
      <div class="recheck-status-strip">
        <small>Current status: ${esc(alert.status)}</small>
        <div class="board-lifecycle-path compact">
          ${statuses.map((status, index) => `<span class="${index === 0 ? "active" : ""}">${esc(status)}</span>`).join("")}
        </div>
      </div>
      <details>
        <summary>Open recheck panel</summary>
        <div class="recheck-grid compact-recheck-grid">
          ${recheckAssetFields.map((field) => `
            <label>
              <span>${esc(field.label)}</span>
              <textarea data-recheck-input="${esc(field.id)}" placeholder="Paste revised asset">${esc(state.recheckInputs[field.id] || "")}</textarea>
            </label>`).join("")}
        </div>
      </details>
      ${result ? `<p class="recheck-status ${currentStatus === "Cleared" ? "cleared" : ""}">Result: ${esc(currentStatus)}</p>` : ""}
      ${result ? `<p class="recheck-reason">${esc(result.reason)}</p>` : ""}
    </section>`;
}

function boardExecutiveBriefCard(diagnosis) {
  const exposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  return `
    <section class="board-side-panel brief-board board-brief-wide">
      <div class="board-panel-head">
        <span>Launch decision brief</span>
        <strong>Plain-text leadership note</strong>
      </div>
      <pre>${esc(stripBriefDisplayTitle(exposure.executiveExposureBrief))}</pre>
      <button type="button" data-action="copy-exposure-brief">Copy Plain-Text Launch Note</button>
    </section>`;
}

function boardDiagnosticsDrawer(diagnosis, architecture) {
  return `
    <details class="diagnostics-drawer">
      <summary>More detail</summary>
      ${signalSortingSection(diagnosis)}
      <section class="decision-section why-score-section">
        <div class="digest-section-head">
          <span>${esc(diagnosisReadLabel(diagnosis).replace("Story gap with receipts", "Launch risk with receipts"))}</span>
          <strong>${esc(diagnosisReadHeading(diagnosis))}</strong>
        </div>
        ${coherenceReadMarkup(diagnosis, architecture)}
        ${verbatimCollisionCard(diagnosis)}
      </section>
      <section class="decision-section">
        <div class="digest-section-head">
          <span>Exact fixes</span>
          <strong>Collapsed repair detail</strong>
        </div>
        <div class="rewrite-grid">
          <article><span>Suggested headline</span><p>“${esc(architecture.rewritePanel.sayThis)}”</p></article>
          <article><span>Suggested CTA</span><p>“${esc(architecture.ctaPanel.sayThis)}”</p></article>
        </div>
      </section>
      <section class="decision-section ask-cognix-roadmap">
        <div class="digest-section-head">
          <span>Ask Cognix</span>
          <strong>Future query layer</strong>
        </div>
        <p class="ask-cognix-lead">Future query layer on top of story gaps, receipts, approval paths, and recheck history.</p>
      </section>
    </details>`;
}

function resultScreen() {
  const diagnosis = state.diagnosis || diagnoseLaunch();
  if (diagnosis.paused) return pausedResultScreen(diagnosis);
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  diagnosis.commercialExposure = diagnosis.commercialExposure || buildCommercialExposure(diagnosis);
  return `
    <div class="gtm-exposure-board">
      ${boardLeftRail(diagnosis)}
      <main class="board-main">
        ${boardExposureHero(diagnosis)}
        ${boardResultSummary(diagnosis)}
        ${boardReceiptsPanel(diagnosis)}
        ${boardDiagnosticsDrawer(diagnosis, architecture)}
      </main>
      <aside class="board-right-rail">
        ${boardOwnerActionMatrix(diagnosis)}
        ${boardLifecycleCard(diagnosis)}
        ${boardManualRecheckCard(diagnosis)}
        ${boardExecutiveBriefCard(diagnosis)}
      </aside>
      ${state.actionMessage ? `<div class="toast">${esc(state.actionMessage)}</div>` : ""}
    </div>`;
}

function askCognixRoadmapSection() {
  const questions = [
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
  const sources = [
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
  const answerParts = ["Direct answer", "Evidence", "Commercial implication", "Recommended action", "Confidence level"];
  return `
      <section class="decision-section ask-cognix-roadmap">
        <div class="digest-section-head">
          <span>Future query layer</span>
          <strong>Ask Cognix</strong>
        </div>
        <p class="ask-cognix-lead">Ask Cognix is the future query layer on top of story gaps, receipts, approval paths, and recheck history. The core product proactively finds the gap, so users do not need to know the perfect question to ask.</p>
        <div class="ask-cognix-result-grid">
          <article>
            <span>Example questions</span>
            <div>${questions.map((question) => `<b>${esc(question)}</b>`).join("")}</div>
          </article>
          <article>
            <span>Answer structure</span>
            <div>${answerParts.map((part) => `<b>${esc(part)}</b>`).join("")}</div>
            <p>Every answer resolves into a direct decision, the evidence behind it, the commercial implication, the recommended action, and a confidence level.</p>
          </article>
          <article>
            <span>Signal sources over time</span>
            <div>${sources.map((source) => `<b>${esc(source)}</b>`).join("")}</div>
          </article>
        </div>
        <div class="ask-cognix-example">
          <span>Example</span>
          <p><strong>Question:</strong> Can we launch today?</p>
          <p><strong>Answer:</strong> Not yet. A story gap is likely. Strong customer proof exists, but the current story leads with abstract category language while sales and customer evidence point to renewal-risk urgency.</p>
          <p><strong>Evidence:</strong> Sales feedback shows buyers respond to “Catch renewal risk before it becomes churn.” Customer proof shows risk was discovered too late. The current CTA is still too passive.</p>
          <p><strong>Commercial implication:</strong> The launch may generate attention without enough qualified demo intent, weakening sales follow-up and launch attribution.</p>
          <p><strong>Recommended action:</strong> Lead with renewal risk, move proof near the CTA, and use category language only after buyer urgency is established.</p>
        </div>
        <p class="ask-cognix-positioning">Ask Cognix is not the core beta workflow. It is the future interface for querying receipts, fix status, approval paths, measurement paths, and recheck history after Cognix PMM has already found the gap.</p>
      </section>`;
}

function saveBaselineModal() {
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="baseline-modal" role="dialog" aria-modal="true" aria-labelledby="baseline-title">
        <span class="eyebrow">Free founding access</span>
        <h2 id="baseline-title">Save your launch baseline</h2>
        <p>You’ve completed your first Cognix GTM fracture detection run. Saved launch baselines and launch-week rechecks are part of free founding access during validation.</p>
        <p>Your access is free during validation. In return, we ask for a 15-minute feedback session after your first read so we can understand where Cognix matched your launch reality, where it missed context, and what follow-up signal checks would be most useful.</p>
        <div class="action-console memo-actions">
          <a class="primary-button" href="mailto:hello@cognix.ai?subject=Free%20founding%20access">Request free founding access</a>
          <button type="button" data-action="close-baseline">Continue without saving</button>
        </div>
      </section>
    </div>`;
}

function verbatimCollisionCard(diagnosis) {
  const collision = diagnosis.outputArchitecture?.collision || buildVerbatimCollision(diagnosis);
  if (!collision.upstream && !collision.downstream) return "";
  const meta = collisionDisplayMeta(collision, diagnosis);
  return `
    <div class="collision-card" aria-label="${esc(meta.title)}">
      <div class="collision-card-head">
        <span>${esc(meta.badge)}</span>
        <strong>${esc(meta.label)}</strong>
      </div>
      <div class="collision-grid">
        <article>
          <span>${esc(meta.leftLabel)}</span>
          <small>Source: ${esc(collision.upstreamSource || meta.leftSourceFallback)}</small>
          <p>“${esc(collision.upstream || "Missing upstream signal")}”</p>
        </article>
        <div class="collision-vs">VS</div>
        <article>
          <span>${esc(meta.rightLabel)}</span>
          <small>Source: ${esc(collision.downstreamSource || meta.rightSourceFallback)}</small>
          <p>“${esc(collision.downstream || "Missing downstream signal")}”</p>
        </article>
      </div>
      <div class="collision-read">
        <span>Cognix read</span>
        <p>${esc(collision.read)}</p>
      </div>
    </div>`;
}

function pausedResultScreen(diagnosis) {
  const foundAreas = diagnosis.sharedAreas.length ? diagnosis.sharedAreas : meaningfulAreas().map((item) => signalSurfaceLabel(item.id, item.title));
  const foundList = foundAreas.length ? foundAreas : ["No reliable launch surfaces found yet"];
  const nextSignals = diagnosis.nextSignals?.length ? diagnosis.nextSignals : unique([
    "Internal strategy note",
    foundAreas.some((item) => /buyer|ICP/i.test(item)) ? "Buyer pain" : "Buyer pain or ICP",
    foundAreas.some((item) => /CTA|proof|goal/i.test(item)) ? "Launch goal" : "CTA, proof, or launch goal"
  ]);
  return `
    <div class="result-command paused-command">
      <section class="paused-next-card" aria-label="Read paused">
        <div class="paused-next-copy">
          <h1>Cognix PMM needs more evidence before calling a story gap.</h1>
          <p>${esc(diagnosis.causalDiagnosis || "We do not guess from one weak signal. Add at least two launch inputs so Cognix PMM can compare your goal, buyer, CTA, proof, and sales reality.")}</p>
        </div>
        <div class="paused-snapshot">
          <article>
            <span>Evidence found</span>
            <ul>
              ${foundList.map((item) => `<li>${esc(item)}</li>`).join("")}
            </ul>
          </article>
          <article>
            <span>Needed</span>
            <ul>
              ${nextSignals.map((item) => `<li>${esc(item)}</li>`).join("")}
            </ul>
          </article>
        </div>
        <div class="paused-next-actions">
          <button class="primary-button" type="button" data-action="add-signals">Add more evidence</button>
          <button class="ghost-button" type="button" data-action="load-sample-signals">Load sample</button>
        </div>
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

  document.querySelectorAll("[data-signal-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSignal = button.dataset.signalFocus;
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
    state.hasAnalyzedSignals = false;
    state.selectedSignal = "";
  });

  document.querySelector("[data-page-copy]")?.addEventListener("input", (event) => {
    state.signals["campaign-copy"] = event.target.value;
    state.diagnosis = null;
  });

  document.querySelectorAll("[data-source-surface]").forEach((input) => {
    input.addEventListener("input", () => {
      applySourceSurfaceText(input.dataset.sourceSurface, input.value);
      state.hasAnalyzedSignals = true;
      state.diagnosis = null;
    });
  });

  document.querySelectorAll("[data-compare-input]").forEach((input) => {
    input.addEventListener("input", () => {
      applyCompareInput(input.dataset.compareInput, input.value);
      state.hasAnalyzedSignals = true;
      state.diagnosis = null;
    });
  });

  document.querySelector("[data-workspace-name]")?.addEventListener("input", (event) => {
    state.workspaceName = event.target.value;
    state.diagnosis = null;
  });

  document.querySelector("[data-motion-name]")?.addEventListener("input", (event) => {
    state.motionName = event.target.value;
    state.diagnosis = null;
  });

  document.querySelector("[data-primary-kpi-inline]")?.addEventListener("change", (event) => {
    state.selectedKpi = event.target.value;
    state.diagnosis = null;
  });

  document.querySelector("[data-goal-inline]")?.addEventListener("input", (event) => {
    state.targetGoal = event.target.value;
    state.diagnosis = null;
  });

  document.querySelector("[data-action='toggle-buyer-copy']")?.addEventListener("click", () => {
    state.showBuyerCopy = !state.showBuyerCopy;
    render();
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
    const dump = document.querySelector("[data-intake-dump]");
    if (dump) state.intakeDump = dump.value;
    sortIntake();
    state.selectedSignal = "";
    state.hasAnalyzedSignals = true;
    state.diagnosis = null;
    render();
  });

  document.querySelector("[data-action='add-more-context']")?.addEventListener("click", () => {
    state.hasAnalyzedSignals = false;
    state.selectedSignal = "";
    render();
  });

  document.querySelector("[data-action='save-signal']")?.addEventListener("click", () => {
    state.actionMessage = "Signal saved for Cognix PMM.";
    render();
  });

  document.querySelector("[data-action='close-signal-drawer']")?.addEventListener("click", () => {
    state.selectedSignal = "";
    render();
  });

  document.querySelector("[data-action='load-sample-signals']")?.addEventListener("click", () => {
    loadSampleDump();
    sortIntake();
    state.selectedSignal = "";
    state.hasAnalyzedSignals = true;
    state.diagnosis = null;
    render();
  });

  document.querySelector("[data-action='load-signaldesk-sample']")?.addEventListener("click", () => {
    loadSignalDeskSample();
    state.step = 1;
    state.hasAnalyzedSignals = true;
    state.diagnosis = null;
    render();
  });

  document.querySelector("[data-primary-kpi]")?.addEventListener("change", (event) => {
    state.selectedKpi = event.target.value;
    state.diagnosis = null;
  });

  document.querySelector("[data-goal]")?.addEventListener("input", (event) => {
    state.targetGoal = event.target.value;
    state.diagnosis = null;
  });

  document.querySelectorAll("[data-commercial-input]").forEach((input) => {
    input.addEventListener("input", () => {
      state.commercialInputs[input.dataset.commercialInput] = input.value;
      state.diagnosis = null;
    });
  });

  document.querySelectorAll("[data-launch-decision-path]").forEach((input) => {
    input.addEventListener("change", () => {
      state.launchDecisionPath = input.value;
      state.diagnosis = null;
      render();
    });
  });

  document.querySelectorAll("[data-recheck-input]").forEach((input) => {
    input.addEventListener("input", () => {
      state.recheckInputs[input.dataset.recheckInput] = input.value;
      state.recheckResult = null;
    });
  });

  document.querySelector("[data-action='trigger-recheck']")?.addEventListener("click", () => {
    const diagnosis = state.diagnosis || diagnoseLaunch();
    state.recheckResult = runManualRecheck(diagnosis);
    if (state.diagnosis?.commercialExposure?.alertLifecycle) {
      state.diagnosis.commercialExposure.alertLifecycle.status = state.recheckResult.status;
      state.diagnosis.commercialExposure.alertLifecycle.lastCheckedTimestamp = new Date().toISOString();
      state.diagnosis.commercialExposure.executiveExposureBrief = buildForwardableExecutiveExposureBrief(state.diagnosis, state.diagnosis.commercialExposure);
    }
    state.actionMessage = `Validation pass: ${state.recheckResult.status}.`;
    render();
  });

  document.querySelectorAll("[data-action='go-add-inputs']").forEach((button) => {
    button.addEventListener("click", () => {
      goToAddInputs({ mode: "messy", focus: "messy-dump" });
    });
  });

  document.querySelectorAll("[data-action='open-messy-dump']").forEach((button) => {
    button.addEventListener("click", () => {
      goToAddInputs({ mode: "messy", focus: "messy-dump" });
    });
  });

  document.querySelectorAll("[data-action='open-compare-inputs']").forEach((button) => {
    button.addEventListener("click", () => {
      goToAddInputs({ mode: "compare", focus: "compare-left" });
    });
  });

  document.querySelectorAll("[data-action='find-gap'], [data-action='next']").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "find-gap") {
        syncVisibleInputs();
        startAnalysis();
        return;
      }
    if (state.step === 1) {
      syncVisibleInputs();
      startAnalysis();
      return;
    }
    state.step = Math.min(state.step + 1, 4);
    render();
    });
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
    state.step = 0;
    state.actionMessage = "";
    render();
  });

  document.querySelector("[data-action='copy-memo']")?.addEventListener("click", async () => {
    const memoElement = document.querySelector("[data-memo-copy]");
    const memo = memoElement?.value || memoElement?.textContent || "";
    try {
      await navigator.clipboard.writeText(memo);
      state.actionMessage = "Executive alignment note copied.";
    } catch (_error) {
      state.actionMessage = "Brief is ready to copy from the block.";
    }
    render();
  });

  document.querySelector("[data-action='copy-exposure-brief']")?.addEventListener("click", async () => {
    const diagnosis = state.diagnosis || diagnoseLaunch();
    const brief = diagnosis.commercialExposure?.executiveExposureBrief || buildForwardableExecutiveExposureBrief(diagnosis, buildCommercialExposure(diagnosis));
    try {
      await navigator.clipboard.writeText(brief);
      state.actionMessage = "Plain-text launch note copied.";
    } catch (_error) {
      state.actionMessage = "Brief is ready to copy from the block.";
    }
    render();
  });

  document.querySelector("[data-action='download-pdf']")?.addEventListener("click", () => {
    const diagnosis = state.diagnosis || diagnoseLaunch();
    if (diagnosis.paused) {
      state.actionMessage = "Add more evidence to unlock the launch decision brief.";
      render();
      return;
    }
    downloadAuditPdf(diagnosis);
    state.actionMessage = "Story drift PDF downloaded.";
    render();
  });

}

function goToAddInputs(options = {}) {
  state.step = 1;
  state.inputMode = ["compare", "messy"].includes(options.mode) ? options.mode : "full";
  state.pendingFocus = options.focus || "";
  state.actionMessage = "";
  render();
}

function applyPendingFocus() {
  if (!state.pendingFocus) return;
  const target = state.pendingFocus === "messy-dump"
    ? document.querySelector("[data-intake-dump]")
    : state.pendingFocus === "compare-left"
      ? document.querySelector("[data-compare-input='left']")
      : null;
  state.pendingFocus = "";
  if (!target) return;
  target.scrollIntoView?.({ behavior: "smooth", block: "center" });
  target.focus?.();
}

function syncVisibleInputs() {
  const dump = document.querySelector("[data-intake-dump]");
  if (dump) state.intakeDump = dump.value;
  document.querySelectorAll("[data-source-surface]").forEach((input) => {
    applySourceSurfaceText(input.dataset.sourceSurface, input.value);
  });
  document.querySelectorAll("[data-compare-input]").forEach((input) => {
    applyCompareInput(input.dataset.compareInput, input.value);
  });
  document.querySelectorAll("[data-commercial-input]").forEach((input) => {
    state.commercialInputs[input.dataset.commercialInput] = input.value;
  });
  const decisionPath = document.querySelector("[data-launch-decision-path]:checked");
  if (decisionPath) state.launchDecisionPath = decisionPath.value;
}

function applyCompareInput(side, value) {
  if (side === "left") {
    state.signals["launch-message"] = value;
    return;
  }
  const target = isCurrentOrSuggestedCtaSignal(value) ? "cta" : "campaign-copy";
  state.signals[target] = value;
}

function setLaunchMode(mode) {
  state.launchMode = mode === "post" ? "post" : "pre";
  state.previewMap = "";
  state.selectedKpi = "";
  state.launchDecisionPath = "solo_exec_approval";
  state.workspaceName = "Cognix PMM workspace";
  state.motionName = "";
  state.targetGoal = state.launchMode === "pre"
    ? "Protect qualified GTM conversion before spend scales"
    : "Understand which GTM execution gap is diluting conversion";
  state.commercialInputs = Object.fromEntries(commercialInputFields.map((field) => [field.id, ""]));
  state.recheckInputs = Object.fromEntries(recheckAssetFields.map((field) => [field.id, ""]));
  state.recheckResult = null;
  state.signals = {};
  state.intakeDump = "";
  state.attachedFiles = [];
  state.sortMessage = "No launch signals sorted yet.";
  state.loadingIndex = 0;
  state.actionMessage = "";
  state.diagnosis = null;
  state.selectedSignal = "";
  state.showBuyerCopy = false;
  state.hasAnalyzedSignals = false;
  state.inputMode = "full";
  state.pendingFocus = "";
  state.baselineModalOpen = false;
}

function loadSampleDump() {
  state.intakeDump = state.launchMode === "pre" ? [
    "Launch message or positioning draft: Internal launch strategy says Workflow Pulse should help RevOps leaders walk into pipeline review with one trusted view of stalled handoffs, owner gaps, and forecast-risk accounts.",
    "Target buyer or ICP: Primary buyer is VP RevOps at mid-market SaaS companies with messy Salesforce, CS, and support handoffs before quarter-end pipeline review.",
    "Buyer pain: RevOps leaders get blamed when pipeline numbers do not match across systems. The launch brief says the pain is not workflow visibility; it is leadership trust before forecast calls.",
    "Buyer outcome / why now: The product should make pipeline-risk handoffs visible early enough for RevOps to fix the story before Sales explains the number differently in forecast review.",
    "Landing page or campaign copy: See every workflow signal in one AI dashboard. Automate handoff alerts, filter activity, and learn more about the new timeline.",
    "CTA: Primary CTA is Learn more. The demo request button is lower on the page and does not mention pipeline review, forecast trust, or handoff risk.",
    "Sales talk track: Sales is preparing to describe Workflow Pulse as an AI productivity dashboard for busy operations teams because that is what the page says.",
    "Objection notes: Prospects already track handoffs in spreadsheets and ask why this needs a new workflow. Sales does not yet have the answer tied to forecast-call blame.",
    "Competitive framing: Competitor copy leads with missed revenue handoffs and stalled deals. Our copy leads with dashboard flexibility.",
    "Customer proof: Beta customer found 18 stalled handoffs before pipeline review, but the page does not use that proof near the headline or CTA.",
    "Planned launch goal: PMM goal is 40 qualified RevOps demos from launch traffic, not awareness. Campaign budget is $65k and Sales is worried low-quality demos will create internal blame."
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

function loadSignalDeskSample() {
  state.workspaceName = "Cognix PMM workspace";
  state.motionName = "SignalDesk";
  state.selectedKpi = "Qualified demo conversion";
  state.targetGoal = "Protect qualified demo conversion before spend scales";
  state.signals = {
    "launch-message": [
      "Founder wants the launch to sound bigger and more category-defining.",
      "SignalDesk is the AI revenue operating system for every customer-facing team.",
      "CEO says we should sound like infrastructure, not a customer success tool."
    ].join("\n"),
    "campaign-copy": [
      "Homepage hero: AI revenue operating system for every customer-facing team.",
      "Subheadline: Turn every customer signal into revenue action.",
      "CTA: Learn more.",
      "Campaign email subject: Meet the AI operating layer for modern revenue teams."
    ].join("\n"),
    "sales-talk-track": [
      "Do not lead with AI revenue operating system. Prospects ask what that means.",
      "Best-performing sales hook: Catch renewal risk before it becomes churn.",
      "Buyers react when we talk about churn signals buried in support tickets, usage drops no one catches, and renewal risk discovered too late."
    ].join("\n"),
    "customer-proof": [
      "We had all the data. We just did not see the risk until the renewal was already in trouble.",
      "One account team saved a $180K renewal after spotting a product usage drop and unresolved support pattern.",
      "Pilot customers identified risk signals 30 days earlier."
    ].join("\n"),
    "launch-goal": [
      "Launch spend: $20,000",
      "Demo target: 40",
      "Average opportunity value: $50,000",
      "Campaign horizon: 30 days"
    ].join("\n")
  };
  state.commercialInputs = {
    ...Object.fromEntries(commercialInputFields.map((field) => [field.id, ""])),
    launchSpend: "$20,000",
    demoTarget: "40",
    averageOpportunityValue: "$50,000",
    campaignDuration: "30 days"
  };
  state.intakeDump = Object.entries({
    Strategy: state.signals["launch-message"],
    Execution: state.signals["campaign-copy"],
    "Field reality": state.signals["sales-talk-track"],
    Proof: state.signals["customer-proof"],
    "Business metrics": state.signals["launch-goal"]
  }).map(([label, value]) => `${label}:\n${value}`).join("\n\n");
  state.attachedFiles = [];
  state.sortMessage = "SignalDesk sample loaded into source-isolated surfaces.";
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
  const dump = String(state.intakeDump || "");
  const surfaceParse = parseSourceSurfaceDump(dump);
  Object.entries(surfaceParse.signals).forEach(([bucketId, value]) => {
    if (value) state.signals[bucketId] = value;
  });
  Object.entries(surfaceParse.commercialInputs).forEach(([id, value]) => {
    if (value) state.commercialInputs[id] = value;
  });

  const chunks = dump
    .split(/\n{2,}|(?=^\s*(?:Company:|Product:|Internal GTM strategy:|Internal launch strategy:|Launch message|Positioning:|Strategy:|Launch page|Target buyer|Buyer pressure:|Buyer pain|Value proposition|Buyer-facing landing page headline:|Landing page|CTA:|Sales talk|Sales feedback|Demo request|Campaign engagement|Landing page conversion|CRM notes|Objection|Competitive|Customer|Prospect|Early pipeline|Pre-launch goal:|Planned launch goal|Launch investment:|Demo target:|ARR influence at risk:|Success metric:|Pre-launch decision:))/gim)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  if (surfaceParse.structuredCount < 2) {
    chunks.forEach((chunk) => appendSignal(inferBucket(chunk), chunk));
  }
  const sortedAreas = meaningfulAreas().length;
  state.sortMessage = sortedAreas
    ? "Launch inputs sorted."
    : "No new pasted launch signals to sort yet.";
}

function parseSourceSurfaceDump(dump) {
  const text = String(dump || "").replace(/\r\n/g, "\n");
  const surfaceLabels = [
    { key: "strategy", bucketId: "launch-message", names: ["Strategy", "Strategy surface", "Strategy / leadership", "Founder / CEO narrative", "Founder narrative", "Leadership"], structuredNames: ["Strategy", "Strategy surface", "Strategy / leadership"] },
    { key: "execution", bucketId: "campaign-copy", names: ["Campaign/page execution", "Campaign page execution", "Execution", "Execution surface", "Website copy", "Landing page copy", "Homepage", "Campaign copy"], structuredNames: ["Campaign/page execution", "Campaign page execution", "Execution", "Execution surface"] },
    { key: "field", bucketId: "sales-talk-track", names: ["Sales reality", "Field reality", "Sales feedback", "Field", "Sales talk track"], structuredNames: ["Sales reality", "Field reality"] },
    { key: "proof", bucketId: "customer-proof", names: ["Proof", "Proof surface", "Customer proof", "Customer quote"], structuredNames: ["Proof", "Proof surface"] },
    { key: "metrics", bucketId: "launch-goal", names: ["Launch economics", "Business metrics", "Metrics", "Commercial context"], structuredNames: ["Launch economics", "Business metrics"] }
  ];
  const labelAlternatives = surfaceLabels.flatMap((surface) => surface.names.map((name) => ({ ...surface, name })));
  const labelRegex = new RegExp(`^\\s*(${labelAlternatives.map((item) => escapeRegex(item.name)).join("|")})\\s*:\\s*`, "gim");
  const matches = [...text.matchAll(labelRegex)];
  const signals = {};
  const commercialInputs = {};
  const structuredMatches = new Set();

  matches.forEach((match, index) => {
    const label = labelAlternatives.find((item) => item.name.toLowerCase() === match[1].toLowerCase());
    if (!label) return;
    if ((label.structuredNames || []).some((name) => name.toLowerCase() === match[1].toLowerCase())) structuredMatches.add(label.key);
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? text.length;
    const value = text.slice(start, end).trim();
    if (!value) return;
    signals[label.bucketId] = signals[label.bucketId] ? `${signals[label.bucketId]}\n\n${value}` : value;
    if (label.key === "execution") {
      const cta = extractLabeledLine(value, "CTA");
      if (cta) signals.cta = cta;
    }
    if (label.key === "metrics") Object.assign(commercialInputs, parseCommercialInputsFromText(value));
  });

  return { signals, commercialInputs, structuredCount: structuredMatches.size };
}

function extractLabeledLine(text, label) {
  const pattern = new RegExp(`^\\s*${escapeRegex(label)}\\s*:\\s*([^\\n]+)`, "im");
  return String(text || "").match(pattern)?.[1]?.trim() || "";
}

function parseCommercialInputsFromText(text) {
  const value = String(text || "");
  const fieldPatterns = [
    ["launchSpend", /\bLaunch spend\s*:\s*([^\n]+)/i],
    ["demoTarget", /\bDemo target\s*:\s*([^\n]+)/i],
    ["pipelineTarget", /\bPipeline target\s*:\s*([^\n]+)/i],
    ["averageDealSize", /\bAverage deal size\s*:\s*([^\n]+)/i],
    ["averageOpportunityValue", /\bAverage opportunity value\s*:\s*([^\n]+)/i],
    ["currentConversionRate", /\bCurrent conversion rate\s*:\s*([^\n]+)/i],
    ["pastLaunchBenchmark", /\bPast launch benchmark\s*:\s*([^\n]+)/i],
    ["renewalValueAtRisk", /\bRenewal value at risk\s*:\s*([^\n]+)/i],
    ["targetAccountCount", /\bTarget account count\s*:\s*([^\n]+)/i],
    ["campaignDuration", /\b(?:Campaign horizon|Campaign horizon days|Campaign duration)\s*:\s*([^\n]+)/i]
  ];
  return Object.fromEntries(fieldPatterns
    .map(([id, pattern]) => [id, value.match(pattern)?.[1]?.trim() || ""])
    .filter(([, fieldValue]) => fieldValue));
}

function escapeRegex(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function inferBucket(text) {
  const lower = String(text || "").toLowerCase();
  if (isObjectionLikeSignal(lower) && activeBuckets().some((bucket) => bucket.id === "objections")) return "objections";
  const directLabels = activeBuckets().map((bucket) => [bucket.title.toLowerCase(), bucket.id]);
  const aliases = [
    ["company", "value-prop"],
    ["product", "value-prop"],
    ["internal gtm strategy", "launch-message"],
    ["internal launch strategy", "launch-message"],
    ["positioning draft", "launch-message"],
    ["positioning", "launch-message"],
    ["strategy surface", "launch-message"],
    ["strategy", "launch-message"],
    ["campaign/page execution", "campaign-copy"],
    ["campaign page execution", "campaign-copy"],
    ["execution surface", "campaign-copy"],
    ["execution", "campaign-copy"],
    ["sales reality", "sales-talk-track"],
    ["field reality", "sales-talk-track"],
    ["proof surface", "customer-proof"],
    ["proof", "customer-proof"],
    ["launch economics", "launch-goal"],
    ["business metrics", "launch-goal"],
    ["buyer pressure", "buyer-pain"],
    ["icp", "target-buyer"],
    ["buyer-facing landing page headline", "campaign-copy"],
    ["launch page", state.launchMode === "pre" ? "campaign-copy" : "campaign-copy"],
    ["demo request result", "demo-result"],
    ["campaign engagement", "campaign-engagement"],
    ["landing page conversion", "landing-conversion"],
    ["sales talk", "sales-talk-track"],
    ["pre-launch goal", "launch-goal"],
    ["planned launch goal", "launch-goal"],
    ["launch investment", "launch-goal"],
    ["demo target", "launch-goal"],
    ["arr influence at risk", "launch-goal"],
    ["success metric", "launch-goal"],
    ["pre-launch decision", "launch-goal"],
    ["competitive feedback", "competitive-feedback"],
    ["competitive framing", "competitive-framing"],
    ["customer or prospect reactions", "prospect-reactions"],
    ["early pipeline", "pipeline-signal"]
  ];
  const direct = [...directLabels, ...aliases].find(([label]) => lower.startsWith(label) || lower.startsWith(`${label}:`));
  if (direct && activeBuckets().some((bucket) => bucket.id === direct[1])) return direct[1];
  const inferred = inferUnlabeledPrelaunchBucket(text);
  if (inferred && activeBuckets().some((bucket) => bucket.id === inferred)) return inferred;

  const scored = activeBuckets().map((bucket) => ({
    id: bucket.id,
    score: bucket.keywords.reduce((total, keyword) => total + (lower.includes(keyword) ? 1 : 0), 0)
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].id : activeBuckets()[0].id;
}

function inferUnlabeledPrelaunchBucket(text) {
  const value = String(text || "").trim();
  const lower = value.toLowerCase();
  if (state.launchMode !== "pre" || !value) return "";
  if (isCommercialSignal(lower)) return "launch-goal";
  if (isCurrentOrSuggestedCtaSignal(value)) return "cta";
  if (isPublicCopySignal(value)) return "campaign-copy";
  if (isProofSignal(lower)) return "customer-proof";
  if (isBuyerPressureSignal(lower)) return "buyer-pain";
  if (isStrategicThesisSignal(lower)) return "launch-message";
  if (isIcpSignal(lower)) return "target-buyer";
  return "";
}

function isIcpSignal(text) {
  return hasPattern(text, [
    /\b(the people (?:we think )?(?:who )?care most|people who care most)\b/,
    /\btarget buyer\b/,
    /\bicp\b/,
    /\bseries [b-d]\s*(?:to|-)\s*series [b-d]\b/,
    /\b\d{2,4}\s*(?:to|-)\s*\d{2,4}\s+employees\b/,
    /\b\d{2,4}\s*(?:to|-)\s*\d{1,3},?\d{3}\s+employees\b/,
    /\bthe buyer is\b/,
    /\bthe audience is\b/,
    /\bthe buyers? we care about most\b/,
    /\baudiences? is\b/,
    /\bsecondary\s*:\s*(?:cros?|cfos?|finance|revops|marketing)/,
    /\brevops leaders?\b.*\b(?:series|employees|secondary|cro|finance)\b/,
    /\bcontrollers?,\s*vp finance,\s*and\s*ap directors?\b/,
    /\bvp customer success|vp cs|cs ops|account management leaders?\b/,
    /\boperations leaders?\s+and\s+business systems teams?\b/
  ]);
}

function isBuyerPressureSignal(text) {
  return hasPattern(text, [
    /\bnobody agrees on which deals are real\b/,
    /\b(?:the )?pain is\b/,
    /\bright now (?:the )?pain\b/,
    /\bteams lose\b/,
    /\bforced to\b/,
    /\beveryone shows up with\b/,
    /\bnumbers nobody trusts\b/,
    /\bslightly different answer\b/,
    /\bboard issue\b/,
    /\bforecast accuracy\b/,
    /\bpipeline number they do not fully trust\b/,
    /\bquietly losing momentum\b/,
    /\bforecast call turns into a debate\b/,
    /\bdeals are slipping\b/,
    /\bneed executive attention\b/,
    /\bkeeps finding\b.*\btoo late\b/,
    /\bby the time\b.*\btoo late\b/,
    /\bhealth scores?\b.*\bmiss/i,
    /\bquiet churn\b/,
    /\bstopped using key workflows\b/,
    /\bchampion has gone quiet\b/,
    /\bsupport tickets are increasing\b/,
    /\bkeeps piling up\b/,
    /\binvoice exceptions\b.*\b(?:before close|month-end|month end|payment|po mismatch|delay)\b/,
    /\bdoes not know which\b/,
    /\bwork gets stuck\b/,
    /\bunclear whether\b/,
    /\bnobody knows whether\b/,
    /\bbottleneck\b.*\b(?:approvals|ownership|missing data|follow-up|handoff)\b/,
    /\bpipeline reviews?\b.*\b(?:different|conflicting|trust|numbers|salesforce|gong|clari|spreadsheet|finance)\b/
  ]);
}

function isPmmConcernSignal(text) {
  return hasPattern(text, [
    /\bpmm\s+(?:concern|thinks|is worried|wants)\b/,
    /\bi['’]?m worried it sounds\b/,
    /\bthis sounds polished\b/,
    /\bmaybe\b/,
    /\bi wonder\b/,
    /\bit is not wrong\b/,
    /\bthe sharper angle is probably\b/
  ]);
}

function isStrategicThesisSignal(text) {
  return hasPattern(text, [
    /\bsupposed to help\b/,
    /\bhelps\s+(?:revenue teams?|revops|sales|gtm|marketing|finance|buyers?)\b/,
    /\bstronger idea is\b/,
    /\bstronger idea\b/,
    /\bsharper story is\b/,
    /\bsharper story might be\b/,
    /\bsharper angle is\b/,
    /\bsharper angle is probably\b/,
    /\bprobably\s*:\s*find\b/,
    /\bstrongest moment is\b/,
    /\bbest demo moment is\b/,
    /\bdoes not replace\b.*\bit\b/,
    /\bwalk into pipeline reviews?\b.*\b(?:truth|trust|confidence)\b/,
    /\bfind the renewal risks\b/,
    /\bfind invoice exceptions\b/,
    /\bfind the handoff\b/,
    /\bfind the deals that will slip\b/
  ]) && !isIcpSignal(text);
}

function isPublicCopySignal(text) {
  return hasPattern(text, [
    /\bcurrent homepage headline says\b/,
    /\bcurrent (?:page|homepage|landing page) says\b/,
    /\bhomepage currently says\b/,
    /\bhomepage headline today is\b/,
    /\bhomepage headline says\b/,
    /\bcurrent headline\b/,
    /\bpage copy says\b/,
    /\bheadline says\b/,
    /\bAI-powered revenue intelligence\b/i,
    /\bAI-powered launch intelligence\b/i,
    /\bAI-powered deal intelligence\b/i,
    /\bAI-powered customer health intelligence\b/i,
    /\bAI-powered invoice intelligence\b/i,
    /\bAI workflow automation\b/i,
    /\bAI-powered workflow intelligence\b/i
  ]);
}

function isBuyerFacingSurfaceSignal(text) {
  const value = String(text || "");
  if (!value.trim()) return false;
  if (isInternalPlanningNote(value)) return hasExplicitBuyerFacingCopyMarker(value);
  return hasBuyerFacingSurfaceMarker(value) || isPublicCopySignal(value) || isCurrentOrSuggestedCtaSignal(value);
}

function hasBuyerFacingSurfaceMarker(text) {
  return hasPattern(String(text || "").toLowerCase(), [
    /\b(?:landing page|launch page|homepage|page copy|web copy|site copy|campaign copy|ad copy|email copy|outbound copy|hero|headline|h1|subhead|subject line|sales script|sales talk track|talk track|enablement copy)\b/,
    /\b(?:current|draft|proposed|new)\s+(?:headline|copy|cta|page|campaign|email|ad)\b/,
    /\b(?:headline|copy|page|homepage|landing page|campaign|email|ad)\s+(?:says|reads|leads with|will say|should say)\b/,
    /\b(?:primary )?cta\b/,
    /\b(?:book|request|schedule|get|start|run)\s+(?:a\s+)?(?:demo|readout|audit|assessment|trial)\b/
  ]);
}

function hasExplicitBuyerFacingCopyMarker(text) {
  return hasPattern(String(text || "").toLowerCase(), [
    /\b(?:headline|copy|page|homepage|landing page|campaign|email|ad)\s+(?:says|reads|leads with|will say|should say)\b/,
    /\b(?:current|draft|proposed|new)\s+(?:headline|copy|cta)\s*(?:is|:)\b/,
    /\b(?:headline|hero|h1|subject line|primary cta|cta)\s*:\s*["“]?[^"\n]{8,}/,
    /\b(?:book|request|schedule|get|start|run)\s+(?:a\s+)?(?:demo|readout|audit|assessment|trial)\b/
  ]);
}

function isInternalPlanningNote(text) {
  return hasPattern(String(text || "").toLowerCase(), [
    /\bneed to get (?:this|it)\b/,
    /\bready for next week\b/,
    /\bfor next week\b/,
    /\bwe need to\b/,
    /\bneed to\b.*\b(?:ready|prepare|finish|align|decide|ship|launch)\b/,
    /\bnot sure\b/,
    /\bpmm concern\b/,
    /\bi['’]?m worried\b/,
    /\bfounder (?:said|comment|feedback|note)\b/,
    /\binternal (?:note|planning|discussion|debate|strategy)\b/
  ]);
}

function isCurrentOrSuggestedCtaSignal(text) {
  return hasPattern(text, [
    /\bcurrent CTA is\b/i,
    /\bCTA is\b/i,
    /\bprimary CTA\b/i,
    /\bbook a demo\b/i,
    /\bpressure-test your next pipeline review\b/i,
    /\bmaybe better\b/i,
    /\bmaybe it should be\b/i,
    /\bcta today\b/i,
    /\bcurrent cta\b/i
  ]);
}

function isProofSignal(text) {
  return hasPattern(text, [
    /\breduced\b.*\b(?:hours?|minutes?)\b/,
    /\bfrom\s+\d+(?:\.\d+)?\s*(?:hours?|days?|%)\s+to\s+\d+/,
    /\bchief of staff for pipeline reviews\b/,
    /\bcaught a stalled\b/,
    /\bat-risk\b/,
    /\breduced\b.*\b\d+%/,
    /\bsaved\s+\d+\s+ap hours\b/,
    /\bhidden renewal-risk accounts\b/,
    /\benterprise deals\b/,
    /\bbeta\b.*\b(?:result|team|customer)\b/,
    /\bcustomer proof\b/
  ]);
}

function isCommercialSignal(text) {
  return hasPattern(text, [
    /\blaunch budget\b/,
    /\baverage contract value\b/,
    /\bACV\b/i,
    /\bopportunit(?:y|ies) risk\b/,
    /\bserious opportunities\b/,
    /\bstrong cs buyer conversations\b/,
    /\bstrong buyer conversations\b/,
    /\breal opportunities\b/,
    /\bqualified demo requests\b/,
    /\bdemo target\b/,
    /\blaunch push\b/,
    /\bacv\b/,
    /\baverage renewal value\b/
  ]) || /(?:\$|USD\s*)\s?\d/.test(text);
}

function isCommercialOnlyPhrase(text) {
  const value = String(text || "").toLowerCase();
  if (!value) return false;
  const commercial = hasPattern(value, [
    /\blaunch budget\b/,
    /\baverage contract value\b/,
    /\bacv\b/,
    /\bcommercial assumptions\b/,
    /\bqualified demo requests?\b/,
    /\bopportunities? at risk\b/,
    /\bserious opportunities\b/
  ]) || /(?:\$|usd\s*)\s?\d/.test(value);
  const pressure = isBuyerPressureSignal(value);
  return commercial && !pressure;
}

function buildSignalSorting(signals = [], allText = "") {
  const text = `${signals.map((signal) => signal.text).join("\n")}\n${allText || ""}`;
  const lower = text.toLowerCase();
  const hasGroup = (label) => signalSortingGroupDetected(label, signals, lower);
  const groups = [
    "Internal planning notes",
    "Founder comments",
    "Sales feedback",
    "Buyer pain",
    "Positioning options",
    "Buyer-facing draft copy",
    "CTA options",
    "Proof points",
    "Competitive notes",
    "Launch channels",
    "PMM concern"
  ].filter(hasGroup);
  const buyerFacingCopyConfidence = classifyBuyerFacingCopyConfidence(signals, lower);
  return {
    documentType: detectSignalDocumentType(signals, lower, groups, buyerFacingCopyConfidence),
    groups,
    buyerFacingCopyConfidence,
    confidenceReason: buyerFacingCopyConfidenceReason(buyerFacingCopyConfidence),
    diagnosisRule: "Cognix treats buyer-facing copy, CTA, campaign, landing page, email, ad, and sales-facing copy as market-facing evidence. Internal planning notes, founder comments, sales feedback, and PMM concerns stay internal unless they are clearly written as market-facing copy."
  };
}

function signalSortingGroupDetected(label, signals, lower) {
  const hasSignal = (id) => signals.some((signal) => signal.id === id && isMeaningfulSignalText(signal.text));
  const hasSurface = signals.some((signal) => ["campaign-copy", "cta", "sales-talk-track"].includes(signal.id) && isBuyerFacingSurfaceSignal(signal.text));
  const checks = {
    "Internal planning notes": hasSignal("launch-message") || hasPattern(lower, [/\binternal\b/, /\bplanning\b/, /\bneed to get\b/, /\bready for next week\b/, /\bwe need to\b/, /\bpre-launch decision\b/]),
    "Founder comments": hasPattern(lower, [/\bfounder\b/, /\bceo\b.*\b(?:said|wants|thinks)\b/, /\bfounder feedback\b/, /\bfounder narrative\b/]),
    "Sales feedback": hasSignal("sales-feedback") || hasSignal("sales-talk-track") || hasPattern(lower, [/\bsales feedback\b/, /\brep feedback\b/, /\bae\b/, /\bsales says\b/, /\bfield narrative\b/, /\bobjection\b/]),
    "Buyer pain": hasSignal("buyer-pain") || isBuyerPressureSignal(lower),
    "Positioning options": hasPattern(lower, [/\bpositioning\b/, /\bmessage option\b/, /\boption [abc]\b/, /\bangle\b/, /\bnarrative\b/, /\bstory might be\b/]),
    "Buyer-facing draft copy": hasSurface || hasPattern(lower, [/\blanding page\b/, /\bpage copy\b/, /\bcampaign copy\b/, /\bhomepage headline\b/, /\bhero\b/, /\bad copy\b/, /\bemail copy\b/]),
    "CTA options": hasSignal("cta") || hasPattern(lower, [/\bcta\b/, /\bbook a demo\b/, /\brequest a demo\b/, /\bget (?:the|a)\b.*\breadout\b/, /\brun (?:the|a)\b.*\baudit\b/]),
    "Proof points": hasSignal("customer-proof") || isProofSignal(lower),
    "Competitive notes": hasSignal("competitive-framing") || hasSignal("competitive-feedback") || hasPattern(lower, [/\bcompetitor\b/, /\bcompetitive\b/, /\bversus\b/, /\bvs\.\b/, /\balternative\b/]),
    "Launch channels": hasPattern(lower, [/\bpaid\b/, /\bemail\b/, /\bwebinar\b/, /\bsocial\b/, /\blinkedin\b/, /\blaunch channel\b/, /\bcampaign\b/, /\bretargeting\b/]),
    "PMM concern": isPmmConcernSignal(lower) || hasPattern(lower, [/\bpmm concern\b/, /\bpmm thinks\b/, /\bpmm is worried\b/, /\bpmm wants\b/, /\bi['’]?m worried\b/, /\bthis may sound\b/, /\btoo broad\b/, /\btoo generic\b/])
  };
  return Boolean(checks[label]);
}

function classifyBuyerFacingCopyConfidence(signals, lower) {
  const campaignText = signals.find((signal) => signal.id === "campaign-copy")?.text || "";
  const surfaceSignals = signals.filter((signal) => ["campaign-copy", "cta", "sales-talk-track"].includes(signal.id) && isBuyerFacingSurfaceSignal(signal.text));
  const hasClearSurface = surfaceSignals.some((signal) => hasBuyerFacingSurfaceMarker(signal.text) && !isInternalPlanningNote(signal.text));
  const hasMixedDraft = isMeaningfulSignalText(campaignText) && (isInternalPlanningNote(campaignText) || hasPattern(lower, [/\bdraft\b/, /\boption\b/, /\bmaybe\b/, /\brough\b/, /\bmixed\b/]));
  if (hasClearSurface && !hasMixedDraft) return "High";
  if (hasClearSurface || hasMixedDraft || hasPattern(lower, [/\bdraft messaging\b/, /\bmessage option\b/, /\bheadline option\b/])) return "Medium";
  return "Low";
}

function buyerFacingCopyConfidenceReason(confidence) {
  if (confidence === "High") return "Clear landing page, campaign, email, ad, CTA, or sales-facing copy is present.";
  if (confidence === "Medium") return "Draft messaging is present, but it is mixed with internal notes or options.";
  return "Mostly internal signal. There is not enough final buyer-facing copy to treat the page message as firm.";
}

function detectSignalDocumentType(signals, lower, groups, confidence) {
  const hasSignal = (id) => signals.some((signal) => signal.id === id && isMeaningfulSignalText(signal.text));
  if (groups.length >= 5) return "Messy pre-launch planning dump";
  if (confidence === "High" && hasPattern(lower, [/\blanding page\b/, /\bhomepage\b/, /\bhero\b/, /\bpage copy\b/])) return "Landing page draft";
  if (hasPattern(lower, [/\bfounder\b/, /\bfounder narrative\b/])) return "Founder narrative feedback";
  if (hasSignal("sales-feedback") || hasPattern(lower, [/\bsales feedback\b/, /\brep feedback\b/, /\bsales says\b/])) return "Sales feedback notes";
  if (hasPattern(lower, [/\bpositioning brief\b/, /\bpositioning\b/, /\bmessage option\b/])) return "Positioning brief";
  if (hasPattern(lower, [/\blaunch planning\b/, /\bpre-launch\b/, /\bready for next week\b/, /\blaunch channels\b/])) return "Launch planning notes";
  return groups.length > 2 ? "Mixed GTM input" : "Launch planning notes";
}

function isObjectionLikeSignal(text) {
  return hasPattern(text, [
    /\bwe already use\b/,
    /\bwe already have\b/,
    /\bwhy not use\b/,
    /\bhow is this different from\b/,
    /\bisn['’]?t this just\b/,
    /\bdo we need this if\b/,
    /\bresponse\s*:/,
    /\bobjection\s*:/
  ]);
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
  state.step = 2;
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
  const trustGate = evaluateAuditTrustGate(diagnostic);
  if (!trustGate.safe) return buildPausedDiagnosis(diagnostic.coverage, diagnostic, trustGate);
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

function evaluateAuditTrustGate(diagnostic) {
  const coverage = diagnostic.coverage || { count: 0 };
  if (coverage.count < 3) return { safe: false, reason: "low_coverage" };
  const anchors = auditTrustAnchors(diagnostic);
  const anchorCount = Object.values(anchors).filter(Boolean).length;
  const hasBaseline = anchors.upstreamStrategy || anchors.buyerPain;
  const weakPublicOnly = diagnostic.has?.genericAiPositioning
    && diagnostic.has?.passiveCta
    && !anchors.upstreamStrategy
    && !anchors.buyerPain
    && anchorCount < 2;
  const placeholderRisk = !diagnostic.strategicMatrix?.buyer_pressure?.value
    && !diagnostic.strategicMatrix?.internal_strategic_insight?.value
    && anchorCount < 2;
  if (weakPublicOnly || placeholderRisk || !hasBaseline && anchorCount < 2) {
    return { safe: false, reason: "insufficient_strategy_baseline", anchors };
  }
  return { safe: true, reason: "safe", anchors };
}

function auditTrustAnchors(diagnostic) {
  const signals = diagnostic.signals || [];
  const signalText = (id) => signals.find((signal) => signal.id === id)?.text || "";
  const hasSignal = (id) => isMeaningfulSignalText(signalText(id)) || isMeaningfulShortSignal({ id, text: signalText(id) });
  const allText = diagnostic.allText || "";
  return {
    clearIcp: hasSignal("target-buyer") && !diagnostic.has?.unclearIcp && !isVagueBuyerSignal(signalText("target-buyer")),
    buyerPain: hasSignal("buyer-pain") && Boolean(diagnostic.strategicMatrix?.buyer_pressure?.value) && !diagnostic.has?.weakBuyerPain,
    upstreamStrategy: hasReliableUpstreamStrategy(signalText("launch-message"), signalText("value-prop")),
    proof: hasSignal("customer-proof") && diagnostic.has?.proof,
    salesNarrative: hasSignal("sales-talk-track") || hasSignal("sales-feedback"),
    objections: hasSignal("objections"),
    launchGoal: hasSignal("launch-goal"),
    commercialStakes: formattedCommercialKpisFromText(allText).length > 0
  };
}

function hasReliableUpstreamStrategy(...values) {
  const text = values.filter(Boolean).join(" ");
  if (!isMeaningfulSignalText(text)) return false;
  if (extractLabeledValue(text, ["Internal GTM strategy", "Internal launch strategy", "Strategy", "Positioning"])) return true;
  return hasPattern(text.toLowerCase(), [
    /\bit is supposed to help\b/,
    /\bsupposed to help\b/,
    /\bhelps\s+(?:sales leaders?|revenue teams?|revops|cmos?|buyers?|teams?)\s+(?:find|detect|protect|prevent|stop|walk|identify|diagnose|pressure-test)\b/,
    /\bbuilt to\s+(?:find|detect|protect|prevent|stop|identify|diagnose|pressure-test)\b/,
    /\bthe sharper story might be\b/,
    /\bthe idea came from\b.*\b(?:pain|forecast|pipeline|review|budget|risk)\b/,
    /\bthe best demo moment is\b/
  ]);
}

function isVagueBuyerSignal(text) {
  const value = String(text || "").toLowerCase();
  return !value || /^(?:revenue|gtm|modern|business|operations|workflow)?\s*teams?\.?$/.test(value.trim());
}

function isMeaningfulShortSignal(signal) {
  if (signal.id !== "cta") return false;
  const normalized = normalizeSignalText(signal.text);
  if (!normalized || genericSignalResponses.has(normalized)) return false;
  return normalized.length >= 4 && !/^(none|n\/a|na|tbd|unknown)$/i.test(normalized);
}

function buildDiagnosticPass(signals) {
  const allText = [state.intakeDump || "", signals.map((signal) => signal.text).join("\n")].filter(Boolean).join("\n");
  const has = buildSignalFlags(signals, allText);
  const signalSorting = buildSignalSorting(signals, allText);
  const domain = classifyLaunchDomain(signals, allText);
  has.domain = domain.id;
  has.revopsPipelineReview = domain.id === "revops";
  has.dealForecastRisk = domain.id === "sales";
  has.customerSuccessRenewal = domain.id === "cs";
  has.financeAp = domain.id === "finance";
  has.operationsWorkflow = domain.id === "operations";
  const extractedConcepts = extractDiagnosticConcepts(signals, has);
  const strategicMatrix = extractStrategicTranslationMatrix(signals, has, extractedConcepts, signalSorting);
  const coverage = buildCoverage(signals, has);
  const fractures = coverage.count < 3 ? [] : buildFractures(has, allText);
  const rankedFractures = prioritizeFractures(fractures, has);
  const diagnosticFindings = (has.strongLaunch || has.alignedLaunch) && (!rankedFractures.length || rankedFractures.every(isWatchoutFracture)) ? buildReadinessFindings(signals, has) : rankedFractures.length ? rankedFractures : [{
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
  const verdict = `${riskLabel} ${riskFrameForDomain(domain.id)}`;
  const demoIntentRisk = buildDemoIntentRisk(riskLabel, top, has, pre);
  const implication = buildBusinessImplication(riskLabel, top, has, pre);

  return {
    mode: state.launchMode,
    signals,
    allText,
    has,
    coverage,
    signalCoverage,
    signalSorting,
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
    strategicMatrix,
    domain
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
  const outputArchitecture = buildEvidenceBoundOutputArchitecture(diagnostic);
  const commercialExposure = buildCommercialExposure({ ...diagnostic, outputArchitecture });
  const nextMove = diagnostic.recommendedFixes[0] || "use the cited receipts to fix the highest-risk GTM fracture before launch day.";
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
    signalSorting: diagnostic.signalSorting,
    coverage: diagnostic.coverage,
    evidence: diagnostic.evidenceSnippets,
    actions: diagnostic.recommendedFixes,
    pattern: diagnostic.pattern,
    dominantFractures: diagnostic.dominantFractures,
    secondaryFractures: diagnostic.secondaryFractures,
    allFractures: diagnostic.allFractures,
    domain: diagnostic.domain,
    extractedConcepts: diagnostic.extractedConcepts,
    strategicMatrix: diagnostic.strategicMatrix,
    outputArchitecture,
    commercialExposure,
    scoreName: pre ? scoreNameForDomain(diagnostic.domain?.id) : "Performance gap",
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
      : `Signals entered by the PMM point to ${formatFractureLabel(top.title)} as the dominant ${riskFrameForDomain(diagnostic.domain?.id)}. The next move is to ${nextMove.toLowerCase()}`,
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

function riskFrameForDomain(domainId) {
  if (domainId === "revops") return "pipeline-review conversion risk";
  if (domainId === "sales") return "forecast-risk conversion risk";
  if (domainId === "cs") return "renewal-risk urgency";
  if (domainId === "finance") return "finance buyer urgency risk";
  if (domainId === "operations") return "operations buyer urgency risk";
  return "launch-to-pipeline risk";
}

function scoreNameForDomain(domainId) {
  if (domainId === "revops") return "Pipeline-review risk";
  if (domainId === "sales") return "Forecast-risk conversion";
  if (domainId === "cs") return "Renewal-risk urgency";
  if (domainId === "finance") return "Finance buyer urgency";
  if (domainId === "operations") return "Operations buyer urgency";
  return "Launch-to-pipeline risk";
}

function extractDiagnosticConcepts(signals, has) {
  const buyerSignal = signals.find((signal) => signal.id === "target-buyer")?.text || "";
  const painSignal = signals.find((signal) => signal.id === "buyer-pain")?.text || "";
  const valueSignal = signals.find((signal) => signal.id === "value-prop")?.text || "";
  const messageSignal = signals.find((signal) => signal.id === "launch-message")?.text || "";
  const ctaSignal = signals.find((signal) => signal.id === "cta")?.text || "";
  const combined = [state.intakeDump || "", signals.map((signal) => signal.text).join(" ")].filter(Boolean).join(" ");
  const isCognix = /cognix/i.test(combined);
  const explicitProduct = extractExplicitProductName([...signals, { text: state.intakeDump || "" }]);

  return {
    icp: isMeaningfulSignalText(buyerSignal) && !has.unclearIcp
      ? extractBuyerValue(buyerSignal, "PMMs launching in fast-moving GTM teams")
      : inferBuyerFromSignals(signals, has),
    buyerPain: isMeaningfulSignalText(painSignal)
      ? extractPainValue(painSignal, "fragmented launch signals without shared interpretation")
      : inferPainFromSignals(has),
    product: isCognix ? "Cognix" : explicitProduct || bestProductName(combined, valueSignal, messageSignal, signals.find((signal) => signal.id === "campaign-copy")?.text || ""),
    businessOutcome: isMeaningfulSignalText(valueSignal)
      ? extractOutcomeValue(valueSignal, "diagnose whether the launch will create qualified demand or just activity")
      : inferOutcomeFromSignals(has),
    mechanism: isCognix
      ? "interpreting launch signals across messaging, ICP, CTA, sales feedback, proof, and competitive pressure"
      : inferProductMechanism(signals, has),
    statusQuo: inferStatusQuoFromSignals(has),
    ctaAction: extractCtaAction(ctaSignal, has),
    launchAudited: cleanConceptPhrase(messageSignal, 90) || (isCognix ? "Cognix GTM fracture detection" : "the launch")
  };
}

function extractStrategicTranslationMatrix(signals, has, concepts, signalSorting = null) {
  const getSignal = (id) => signals.find((signal) => signal.id === id)?.text || "";
  const fromSignal = (id, value, fallback = "", sourceOverride = "") => {
    const source = getSignal(id);
    const cleanValue = cleanConceptPhrase(value || source, 180);
    const sourcePhrase = cleanConceptPhrase(sourceOverride || source, 220);
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
  const salesFeedback = getSignal("sales-feedback");
  const rawInput = state.intakeDump || "";
  const commercialText = [goal, buyerPain, valueProp, launchMessage].join(" ");
  const salesSurface = getSignal("sales-talk-track");
  const downstreamSurface = selectDownstreamMarketSurface(campaign, cta, salesSurface, signalSorting);
  const currentHeadline = extractHeadlinePhrase(downstreamSurface);
  const dilution = extractPublicDilutionPhrase(downstreamSurface);
  const commercialStake = extractCommercialStake(commercialText);
  const buyerPressure = normalizeDomainBuyerPressure(
    extractBuyerPressure(buyerPain, goal, commercialStake, [rawInput, campaign, launchMessage, valueProp, salesFeedback, proof].join("\n")),
    has.domain,
    [rawInput, launchMessage, buyerPain, valueProp, campaign, salesFeedback, proof, goal].join("\n")
  );
  const rawInternalInsight = extractInternalInsight(launchMessage, buyerPain, valueProp);
  const domainInsight = extractDomainStrategicInsight(concepts.product, has.domain, [launchMessage, buyerPain, valueProp, campaign, proof, goal, buyer].join("\n"));
  const internalInsight = domainInsight && (has.domain !== "marketing" || !rawInternalInsight || unsafeInternalInsightForDomain(rawInternalInsight.value, has.domain))
    ? domainInsight
    : rawInternalInsight;
  const currentCta = extractCurrentCtaPhrase(cta);
  const fieldRisk = inferFieldRisk(concepts.product, dilution || currentHeadline, internalInsight, buyerPressure, has);

  return {
    buyer: fromSignal("target-buyer", concepts.icp),
    buyer_pressure: buyerPressure ? { value: normalizeAcronyms(buyerPressure.value), source_phrase: buyerPressure.source_phrase } : null,
    internal_insight: internalInsight ? { value: normalizeAcronyms(internalInsight.value), source_phrase: internalInsight.source_phrase } : null,
    internal_strategic_insight: internalInsight ? { value: normalizeAcronyms(internalInsight.value), source_phrase: internalInsight.source_phrase } : null,
    public_dilution: dilution ? { value: normalizeAcronyms(dilution.value), source_phrase: dilution.source_phrase } : null,
    field_risk: fieldRisk ? { value: normalizeAcronyms(fieldRisk), source_phrase: dilution?.source_phrase || currentHeadline?.source_phrase || "" } : null,
    proof_signal: extractProofSignal(proof),
    current_headline: currentHeadline ? { value: normalizeAcronyms(currentHeadline.value), source_phrase: currentHeadline.source_phrase } : null,
    current_cta: fromSignal("cta", currentCta || cta, "", cta),
    commercial_stake: commercialStake ? { value: normalizeAcronyms(commercialStake.value), source_phrase: commercialStake.source_phrase } : null
  };
}

function extractProofSignal(proofText) {
  const quote = extractCustomerQuote(proofText);
  const value = quote || cleanProofPhrase(proofText);
  return value ? { value: normalizeAcronyms(value), source_phrase: normalizeAcronyms(value) } : null;
}

function extractCustomerQuote(text) {
  const raw = String(text || "");
  if (!raw.trim()) return "";
  const normalized = raw.replace(/\r/g, "").trim();
  const labeledQuoted = normalized.match(/(?:customer quote|quote|customer said|prospect said)\s*:\s*["'“‘]([^"”’]+)["”’]/i);
  const quoteMatch = labeledQuoted
    || normalized.match(/(?:customer quote|quote|customer said|prospect said)\s*:\s*["'“‘]?([\s\S]+?)(?:["”’]\s*$|\n{2,}|$)/i)
    || normalized.match(/["“‘]([^"”’]+(?:[.!?][^"”’]+){0,2})["”’]/);
  const candidate = quoteMatch?.[1] || "";
  return cleanQuotedProof(candidate);
}

function cleanQuotedProof(value) {
  const cleaned = String(value || "")
    .replace(/^["'“‘]+|["”’']+$/g, "")
    .replace(/["”’']+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "";
  return preserveCompleteSentences(cleaned, 2, 260);
}

function cleanProofPhrase(value) {
  const cleaned = String(value || "")
    .replace(/^\s*(?:proof surface|customer proof|proof|customer quote|quote|customer said|prospect said)\s*:\s*/i, "")
    .replace(/^["'“‘]+|["”’']+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return preserveCompleteSentences(cleaned, 2, 320);
}

function preserveCompleteSentences(value, maxSentences = 2, maxChars = 260) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  const sentences = text.match(/[^.!?]+[.!?]+(?:["”’])?/g) || [];
  if (sentences.length) {
    const picked = sentences.slice(0, maxSentences).join(" ").replace(/\s+/g, " ").trim();
    if (picked.length <= maxChars) return picked;
    const withinLimit = [];
    for (const sentence of sentences.slice(0, maxSentences)) {
      const next = [...withinLimit, sentence.trim()].join(" ").trim();
      if (next.length > maxChars) break;
      withinLimit.push(sentence.trim());
    }
    if (withinLimit.length) return withinLimit.join(" ");
  }
  if (text.length <= maxChars) return text;
  const clipped = text.slice(0, maxChars).replace(/\s+\S*$/, "").replace(/[,:;/-]+$/, "").trim();
  return clipped;
}

function selectDownstreamMarketSurface(campaignCopy, ctaCopy, salesCopy, signalSorting = null) {
  const candidates = [campaignCopy, ctaCopy, salesCopy]
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  const qualified = candidates.find((value) => isBuyerFacingSurfaceSignal(value));
  if (!qualified) return "";
  if (signalSorting?.buyerFacingCopyConfidence === "Low" && !hasBuyerFacingSurfaceMarker(qualified)) return "";
  return qualified;
}

function extractHeadlinePhrase(text) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  const raw = String(text || "");
  if (!value) return null;
  if (!isBuyerFacingSurfaceSignal(value)) return null;
  const says = value.match(/(?:current\s+)?(?:homepage|landing page|page)?\s*headline\s+says\s+["“]([^"”]{8,140})["”]/i)
    || value.match(/current\s+(?:page|homepage|landing page)\s+says\s+["“]([^"”]{8,140})["”]/i);
  const multiline = raw.match(/(?:homepage currently says|homepage headline today is|homepage headline says|right now the homepage headline says|current headline|headline says)\s*:?\s*\n+\s*([^.\n]{8,160})/i)
    || raw.match(/(?:page copy says|page says)\s*:?\s*\n+\s*([^.\n]{8,160})/i);
  const labeled = value.match(/(?:headline|hero|h1|landing page|campaign copy)\s*:\s*["“]?([^"”\n.]{8,140})/i);
  const candidate = says?.[1] || multiline?.[1] || labeled?.[1] || value.split(/\n|(?<=[.!?])\s+/).find(Boolean) || value;
  const cleaned = cleanConceptPhrase(candidate.replace(/^["“]|["”]$/g, ""), 150);
  return cleaned ? { value: cleaned, source_phrase: cleaned } : null;
}

function extractPublicDilutionPhrase(text) {
  const value = String(text || "");
  if (!isBuyerFacingSurfaceSignal(value)) return null;
  const quoted = value.match(/(?:headline|page|homepage|copy)\s+says\s+["“]([^"”]{8,120})["”]/i) || value.match(/["“]([^"”]{8,120})["”]/);
  const genericMatch = value.match(/\bAI-powered [^.,"”\n]{8,90}|\bAI workflow automation [^.,"”\n]{8,90}|\bmodern [^.,"”\n]{8,90}|\bunlock [^.,"”\n]{8,90}|\bintelligent automation[^.,"”\n]*/i);
  const candidate = genericMatch?.[0] || quoted?.[1] || "";
  const cleaned = cleanConceptPhrase(candidate, 130);
  return cleaned ? { value: cleaned, source_phrase: cleaned } : null;
}

function extractCommercialStake(text) {
  const pieces = formattedCommercialKpisFromText(text).map((item) => item.value);
  if (!pieces.length) return null;
  return { value: pieces.join("; "), source_phrase: pieces.join("; ") };
}

function extractBuyerPressure(painText, goalText, commercialStake, campaignText = "") {
  const explicit = extractLabeledValue(`${painText}\n${campaignText}\n${goalText}`, [
    "Buyer pressure",
    "Pre-launch goal",
    "Success metric",
    "Pre-launch decision",
    "Commercial assumptions"
  ]);
  if (explicit && !isCommercialOnlyPhrase(explicit)) {
    return { value: cleanConceptPhrase(explicit, 180), source_phrase: cleanConceptPhrase(explicit, 220) };
  }
  const pressureSource = [
    selectBuyerPressureSentence(removeCommercialFragments(painText)) || cleanConceptPhrase(removeCommercialFragments(painText), 240),
    selectBuyerPressureSentence(removeCommercialFragments(campaignText)),
    selectBuyerPressureSentence(removeCommercialFragments(goalText))
  ]
    .filter((item) => item && !isIcpSignal(item.toLowerCase()) && !isPmmConcernSignal(item.toLowerCase()) && !isCommercialOnlyPhrase(item))
    .filter(Boolean);
  const value = cleanConceptPhrase(pressureSource[0] || "", 260);
  if (!value) return null;
  return { value, source_phrase: pressureSource.join("; ") };
}

function normalizeDomainBuyerPressure(pressure, domainId, text) {
  const value = String(text || "");
  if (domainId === "cs" && /\bcatch renewal risk before it becomes churn\b/i.test(value)) {
    const salesLine = value.match(/\bCatch renewal risk before it becomes churn\.?/i)?.[0] || "Catch renewal risk before it becomes churn.";
    const quote = extractCustomerQuote(value);
    const cleaned = cleanConceptPhrase([salesLine, quote].filter(Boolean).join(" "), 260);
    return { value: cleaned, source_phrase: cleaned };
  }
  if (domainId === "cs" && /\b(?:keep|keeps) finding renewal risk too late\b/i.test(value)) {
    const sentence = splitIntoSignalSentences(value).find((item) => /\b(?:keep|keeps) finding renewal risk too late\b/i.test(item));
    const cleaned = cleanConceptPhrase(sentence || "CSMs keep finding renewal risk too late.", 220);
    return { value: cleaned, source_phrase: cleaned };
  }
  if (domainId === "operations" && /\bwork gets stuck between handoffs\b/i.test(value)) {
    const bottleneck = splitIntoSignalSentences(value).find((item) => /\bbottleneck\b/i.test(item));
    const cleaned = cleanConceptPhrase(`Work gets stuck between handoffs, and ${bottleneck || "nobody knows whether the bottleneck is approvals, ownership, missing data, or follow-up."}`, 240);
    return { value: cleaned, source_phrase: cleaned };
  }
  return pressure;
}

function extractInternalInsight(launchMessage, buyerPain, valueProp) {
  const explicit = extractLabeledValue(`${launchMessage}\n${valueProp}`, [
    "Internal GTM strategy",
    "Internal launch strategy",
    "Launch message or positioning draft",
    "Positioning",
    "Strategy"
  ]);
  if (explicit) {
    const cleanedExplicit = cleanConceptPhrase(explicit, 180);
    return cleanedExplicit ? { value: cleanedExplicit, source_phrase: cleanedExplicit } : null;
  }
  const strategic = [launchMessage, valueProp, buyerPain].map(selectStrategicThesisSentence).find(Boolean);
  const source = strategic || [launchMessage, valueProp, buyerPain].find((item) => isMeaningfulSignalText(item) && !isIcpSignal(String(item).toLowerCase()));
  const product = bestProductName(launchMessage, valueProp, buyerPain);
  const cleaned = cleanStrategicInsightPhrase(cleanConceptPhrase(source, 220), product);
  return cleaned ? { value: cleaned, source_phrase: cleaned } : null;
}

function cleanStrategicInsightPhrase(text, product = "") {
  const value = cleanConceptPhrase(text, 220);
  if (!value) return "";
  const productName = product && product !== "this launch" && product !== "the launch" ? product : "";
  if (productName && /^it is supposed to help\b/i.test(value)) {
    return normalizeAcronyms(value.replace(/^it is supposed to help\b/i, `${productName} helps`));
  }
  if (productName && /^helps\s+/i.test(value)) {
    return normalizeAcronyms(`${productName} ${value}`);
  }
  return normalizeAcronyms(value);
}

function selectBuyerPressureSentence(text) {
  const sentences = splitIntoSignalSentences(text);
  const match = sentences
    .filter((sentence) => isBuyerPressureSignal(sentence.toLowerCase()))
    .sort((a, b) => buyerPressureSentenceScore(b) - buyerPressureSentenceScore(a))[0];
  return match ? cleanBuyerPressureSentence(match) : "";
}

function buyerPressureSentenceScore(sentence) {
  const text = String(sentence || "").toLowerCase();
  let score = 0;
  if (/\bthe problem is\b|\bthe pain is\b|\bthe real pain is\b/.test(text)) score += 14;
  if (/\bpipeline number they do not fully trust\b/.test(text)) score += 12;
  if (/\bquietly losing momentum\b/.test(text)) score += 10;
  if (/\bforecast calls?\b/.test(text)) score += 8;
  if (/\bdeals? (?:are )?slipping\b/.test(text)) score += 8;
  if (/\bneed executive attention\b/.test(text)) score += 6;
  if (/\bsales leaders?\b|\brevops\b|\bcros?\b/.test(text)) score += 4;
  if (/\bsalesforce|gong|clari|spreadsheets|campaign reports|finance inputs\b/.test(text)) score += 4;
  if (/\brenewal risk|health score|quiet churn|champion|support tickets|qbr|too late\b/.test(text)) score += 10;
  if (/\binvoice exceptions?|month-end|month end|payment|po mismatch|before close|backlog\b/.test(text)) score += 10;
  if (/\bwork gets stuck|handoffs?|bottleneck|approvals?|ownership|missing data\b/.test(text)) score += 10;
  if (isPmmConcernSignal(text) || isIcpSignal(text)) score -= 20;
  score += Math.min(String(sentence || "").split(/\s+/).length, 34) / 10;
  return score;
}

function selectStrategicThesisSentence(text) {
  const sentences = splitIntoSignalSentences(text);
  const match = sentences
    .filter((sentence) => isStrategicThesisSignal(sentence.toLowerCase()) && !isPmmConcernSignal(sentence.toLowerCase()))
    .sort((a, b) => strategicThesisSentenceScore(b) - strategicThesisSentenceScore(a))[0];
  return match ? cleanStrategicThesisSentence(match) : "";
}

function strategicThesisSentenceScore(sentence) {
  const text = String(sentence || "").toLowerCase();
  let score = 0;
  if (/\bsupposed to help\b/.test(text)) score += 12;
  if (/\bsharper story\b|\bsharper angle\b|\bstronger idea\b/.test(text)) score += 10;
  if (/\bhelps\b.*\b(?:find|spot|identify|walk|pressure-test)\b/.test(text)) score += 8;
  if (/\bforecast call|pipeline review|renewal risk|invoice exceptions?|handoff\b/.test(text)) score += 8;
  if (/\bhomepage|page copy|current headline|current cta|commercial assumptions\b/.test(text)) score -= 18;
  if (isIcpSignal(text) || isPmmConcernSignal(text) || isCommercialOnlyPhrase(text)) score -= 20;
  return score + Math.min(String(sentence || "").split(/\s+/).length, 28) / 10;
}

function cleanBuyerPressureSentence(text) {
  return cleanConceptPhrase(text, 260)
    .replace(/^(?:right now\s+)?(?:the\s+)?pain is(?:\s+that)?\s+/i, "")
    .replace(/^buyer pressure\s*:\s*/i, "")
    .trim();
}

function cleanStrategicThesisSentence(text) {
  return cleanConceptPhrase(text, 220)
    .replace(/^(?:the\s+)?strategic thesis is(?:\s+that)?\s+/i, "")
    .replace(/^(?:the\s+)?stronger idea is(?:\s+that)?\s+/i, "")
    .replace(/^it is supposed to help\s+/i, "helps ")
    .replace(/\bNovaOps AI helps\b/g, "NovaOps helps")
    .trim();
}

function splitIntoSignalSentences(text) {
  return String(text || "")
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+|;\s+|\s+-\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
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
    collision: buildVerbatimCollision(diagnostic),
    coherenceRead: buildStrategyToMarketCoherenceRead(diagnostic),
    commercialPanel: buildCommercialRiskPanel(diagnostic),
    rewritePanel: buildInsteadSayThisPanel(diagnostic),
    ctaPanel: buildSpecificCtaPanel(diagnostic),
    resourceBrief: buildStrategicAlignmentBrief(diagnostic)
  };
}

function buildEvidenceBoundOutputArchitecture(diagnostic) {
  const architecture = buildStrategicOutputArchitecture(diagnostic);
  return synthesisNeedsStaticLedger(diagnostic, architecture)
    ? buildStaticExtractionArchitecture(diagnostic)
    : architecture;
}

function matrixValue(diagnosis, key) {
  return diagnosis.strategicMatrix?.[key]?.value || "";
}

function matrixSourcePhrase(diagnosis, key) {
  return diagnosis.strategicMatrix?.[key]?.source_phrase || "";
}

function matrixSourceLabel(key) {
  const labels = {
    buyer: "Target buyer or ICP",
    buyer_pressure: "Buyer pain / planned launch goal",
    internal_insight: "Launch message / buyer pain / product outcome",
    internal_strategic_insight: "Launch message / buyer pain / product outcome",
    public_dilution: "Landing page or campaign copy",
    proof_signal: "Customer proof",
    current_headline: "Landing page or campaign copy",
    current_cta: "CTA",
    commercial_stake: "Planned launch goal"
  };
  return labels[key] || "Launch signal";
}

function buildVerbatimCollision(diagnosis) {
  const upstream = matrixSourcePhrase(diagnosis, "internal_strategic_insight") || matrixValue(diagnosis, "internal_strategic_insight") || matrixValue(diagnosis, "internal_insight");
  const downstream = matrixSourcePhrase(diagnosis, "public_dilution") || matrixValue(diagnosis, "public_dilution") || matrixValue(diagnosis, "current_headline");
  const pressure = displayBuyerPressurePhrase(diagnosis, matrixValue(diagnosis, "buyer_pressure") || diagnosis.extractedConcepts?.buyerPain || "the strategic pressure");
  const dilution = matrixValue(diagnosis, "public_dilution") || matrixValue(diagnosis, "current_headline") || "the buyer-facing phrase";
  const selected = selectStoryDriftCollision(diagnosis, { upstream, downstream, pressure, dilution });
  const read = isStrongAlignedLaunch(diagnosis)
    ? "The internal strategy and buyer-facing execution carry the same core strategic thread."
    : selected.read || domainNativeCollisionRead(diagnosis, selected.upstream || pressure, selected.downstream || dilution, selected.type);
  return {
    type: selected.type || "story_drift",
    upstream: selected.type === "founder_narrative_override" ? trimFounderNarrativePhrase(selected.upstream || upstream) : trimCollisionPhrase(selected.upstream || upstream),
    upstreamSource: selected.upstreamSource || matrixSourceLabel("internal_strategic_insight"),
    downstream: selected.type === "founder_narrative_override"
      ? trimFounderRealityPhrase(selected.downstream || downstream)
      : selected.type === "passive_cta_vs_urgency" ? trimProofBackedUrgency(selected.downstream || downstream) : trimCollisionPhrase(selected.downstream || downstream),
    downstreamSource: selected.downstreamSource || matrixSourceLabel(downstream === matrixValue(diagnosis, "current_headline") ? "current_headline" : "public_dilution"),
    read
  };
}

function trimProofBackedUrgency(value) {
  const cleaned = cleanQuotedProof(value) || cleanProofPhrase(value) || cleanConceptPhrase(value, 260);
  return preserveCompleteSentences(cleaned, 2, 260);
}

function collisionDisplayMeta(collision = {}, diagnosis = null) {
  const type = collision.type || "story_drift";
  if (type === "passive_cta_vs_urgency") {
    return {
      title: "Conversion gap detected",
      badge: "Conversion gap detected",
      label: "CTA / proof gap",
      leftLabel: "Passive CTA",
      rightLabel: "Proof-backed buyer urgency",
      leftSourceFallback: "CTA",
      rightSourceFallback: "Customer proof / buyer pain"
    };
  }
  if (type === "founder_narrative_override") {
    return {
      title: "Founder narrative override",
      badge: "Founder narrative override",
      label: "Category drift with receipts",
      leftLabel: "Founder / CEO narrative",
      rightLabel: "Sales / customer reality",
      leftSourceFallback: "Founder / CEO narrative",
      rightSourceFallback: "Sales feedback / customer proof"
    };
  }
  if (type === "weak specificity" || type === "underdeveloped CTA" || type === "proof placement gap" || type === "insufficient urgency") {
    return {
      title: "Messaging gap detected",
      badge: "Messaging gap detected",
      label: type,
      leftLabel: "Current buyer-facing phrase",
      rightLabel: "Buyer urgency / proof",
      leftSourceFallback: "Buyer-facing copy",
      rightSourceFallback: "Buyer pain / proof"
    };
  }
  const aligned = diagnosis && isStrongAlignedLaunch(diagnosis);
  return {
    title: aligned ? "Strategic story confirmed" : "Logic collision detected",
    badge: aligned ? "Strategic story confirmed" : "Logic collision detected",
    label: aligned ? "Story signal confirmed" : "Mirror with receipts",
    leftLabel: aligned ? "Upstream strategy signal" : "Upstream strategy asset",
    rightLabel: aligned ? "Buyer-facing execution signal" : "Downstream market surface",
    leftSourceFallback: "Internal strategy signal",
    rightSourceFallback: "Buyer-facing execution signal"
  };
}

function selectStoryDriftCollision(diagnosis, candidates) {
  const currentCta = matrixValue(diagnosis, "current_cta");
  const proof = matrixValue(diagnosis, "proof_signal") || matrixSourcePhrase(diagnosis, "proof_signal");
  if (diagnosis.has?.founderNarrativeOverride) {
    const founderNarrative = extractFounderNarrativeSignal(diagnosis) || candidates.upstream;
    const salesReality = extractSalesCustomerRealitySignal(diagnosis) || proof || candidates.pressure;
    return {
      type: "founder_narrative_override",
      upstream: founderNarrative,
      upstreamSource: "Founder / CEO narrative",
      downstream: salesReality,
      downstreamSource: "Sales / customer reality"
    };
  }
  const aligned = phrasesDirectionallyAligned(candidates.downstream, candidates.pressure, diagnosis);
  if (isAbstractFounderCategoryLanguage(candidates.upstream) && hasConcreteBuyerPain(candidates.pressure)) {
    return {
      type: "abstract_category_vs_pain",
      upstream: candidates.upstream,
      upstreamSource: matrixSourceLabel("internal_strategic_insight"),
      downstream: candidates.pressure,
      downstreamSource: matrixSourceLabel("buyer_pressure")
    };
  }
  if (aligned) {
    if (diagnosis.has?.passiveCta && currentCta) {
      return {
        type: "passive_cta_vs_urgency",
        upstream: currentCta,
        upstreamSource: matrixSourceLabel("current_cta"),
        downstream: proof || candidates.pressure,
        downstreamSource: proof ? matrixSourceLabel("proof_signal") : matrixSourceLabel("buyer_pressure"),
        read: conversionGapRead(diagnosis, proof || candidates.pressure)
      };
    }
    return {
      type: aligned,
      upstream: candidates.downstream,
      upstreamSource: matrixSourceLabel("public_dilution"),
      downstream: proof || candidates.pressure,
      downstreamSource: proof ? matrixSourceLabel("proof_signal") : matrixSourceLabel("buyer_pressure"),
      read: alignedSurfaceRead(diagnosis, candidates.downstream, currentCta, proof || candidates.pressure)
    };
  }
  if (shouldUseConversionGapCollision(diagnosis) && currentCta && (proof || candidates.pressure)) {
    return {
      type: "passive_cta_vs_urgency",
      upstream: currentCta,
      upstreamSource: matrixSourceLabel("current_cta"),
      downstream: proof || candidates.pressure,
      downstreamSource: proof ? matrixSourceLabel("proof_signal") : matrixSourceLabel("buyer_pressure")
    };
  }
  return {
    type: "story_drift",
    upstream: candidates.upstream,
    upstreamSource: matrixSourceLabel("internal_strategic_insight"),
    downstream: candidates.downstream,
    downstreamSource: matrixSourceLabel(candidates.downstream === matrixValue(diagnosis, "current_headline") ? "current_headline" : "public_dilution")
  };
}

function shouldUseConversionGapCollision(diagnosis) {
  const top = diagnosis.dominantFractures?.[0]?.title || "";
  return diagnosis.has?.passiveCta && [
    "Passive CTA",
    "CTA can be more demo-intent driven",
    "CTA is not carrying launch-risk intent",
    "Proof is strong but CTA and conversion path are weak",
    "Proof gap may weaken late-stage demo conversion"
  ].includes(top);
}

function conversionGapRead(diagnosis, evidence) {
  const preserved = trimProofBackedUrgency(evidence);
  const urgentSignal = lowerProofDisplayPhrase(preserved || evidence, "the buyer urgency");
  if ((diagnosis.domain?.id || diagnosis.has?.domain) === "operations") {
    return `The issue is not story contradiction. The issue is that the CTA does not carry the urgency already present in the customer proof: ${urgentSignal}`;
  }
  return `The issue is not story contradiction. The issue is that the CTA does not carry the urgency already present in the proof or buyer pain: ${urgentSignal}`;
}

function lowerProofDisplayPhrase(value, fallback) {
  const preserved = trimProofBackedUrgency(value);
  if (!preserved) return fallback;
  const lowered = preserved.charAt(0).toLowerCase() + preserved.slice(1);
  return lowered.replace(/([.!?])\.+$/g, "$1");
}

function isAbstractFounderCategoryLanguage(value) {
  return hasPattern(String(value || "").toLowerCase(), [
    /\bai operating infrastructure\b/,
    /\boperating infrastructure\b/,
    /\bai[- ]powered .*platform\b/,
    /\bworkflow automation platform\b/,
    /\bintelligence layer\b/,
    /\bcognitive layer\b/,
    /\bmodern .*infrastructure\b/
  ]);
}

function hasConcreteBuyerPain(value) {
  return hasPattern(String(value || "").toLowerCase(), [
    /\bapprovals? get stuck\b/,
    /\bwork gets stuck\b/,
    /\bownership gaps?\b/,
    /\bmanual follow-ups?\b/,
    /\bapproval cycles?\b/,
    /\bfrom\s+\d+\s+days?\s+to\s+\d+\s+days?\b/,
    /\bforecast calls?\b/,
    /\brenewal risk\b/,
    /\binvoice exceptions?\b/,
    /\bmonth-end\b/
  ]);
}

function hasFounderCategoryPressure(value) {
  return hasPattern(value, [
    /\b(founder|ceo|leadership)\b.*\b(ai revenue operating system|ai operating system|operating layer|operating infrastructure|infrastructure|platform for every team|category leadership|sound bigger|not a cs tool|not tactical)\b/,
    /\b(ai revenue operating system|ai operating system|operating layer|operating infrastructure|platform for every team|category leadership)\b/,
    /\bsound bigger\b/,
    /\bnot a cs tool\b/,
    /\bnot tactical\b/
  ]);
}

function hasPracticalBuyerRealityPull(value) {
  return hasPattern(value, [
    /\bsales\s+(?:says|feedback|wants|hears|is hearing)\b/,
    /\bpmm\s+(?:concern|thinks|is worried|wants)\b/,
    /\bcustomer\s+(?:quote|proof|said|says)\b/,
    /\bcatch renewal risk\b/,
    /\bbefore it becomes churn\b/,
    /\bwe had all the data\b/,
    /\bjust did not see the risk\b/,
    /\brenewal was already in trouble\b/,
    /\bapprovals? get stuck\b/,
    /\bapproval cycles?\b/
  ]);
}

function extractFounderNarrativeSignal(diagnosis) {
  const text = String(diagnosis?.allText || "");
  const quoted = text.match(/(?:founder|ceo|leadership)[^:\n]{0,60}:\s*["“]([^"”]+)["”]/i)
    || text.match(/(?:founder|ceo|leadership)[^.\n]{0,120}["“]([^"”]+)["”]/i);
  if (quoted?.[1]) return trimFounderNarrativePhrase(quoted[1]);
  const categoryLine = text.match(/(?:^|\n)\s*(?:founder\s*\/\s*ceo narrative|founder narrative|ceo narrative|leadership narrative)\s*:\s*([^\n]+)/i);
  if (categoryLine?.[1]) return trimFounderNarrativePhrase(categoryLine[1]);
  const categoryPhrase = text.match(/\bThe AI revenue operating system for every customer-facing team\.?/i)
    || text.match(/\bAI revenue operating system for every customer-facing team\.?/i)
    || text.match(/\bAI operating system for [^.!\n]+[.!]?/i)
    || text.match(/\bAI operating infrastructure for [^.!\n]+[.!]?/i);
  return categoryPhrase?.[0] ? trimFounderNarrativePhrase(categoryPhrase[0]) : "";
}

function extractSalesCustomerRealitySignal(diagnosis) {
  const text = String(diagnosis?.allText || "");
  const parts = [];
  const salesLine = text.match(/(?:^|\n)\s*(?:sales feedback|sales says|sales)\s*:\s*([^\n]+)/i);
  const renewalLine = text.match(/\bCatch renewal risk before it becomes churn\.?/i);
  const quote = extractCustomerQuote(text);
  const pilotProof = text.match(/\bPilot customers? identified risk signals? \d+\s+days? earlier\.?/i)
    || text.match(/\b(?:One|Another|\d+)?\s*(?:pilot|beta|customer)[^.?!\n]*(?:identified|found|reduced|cut|saved|detected)[^.?!\n]*[.!?]/i);
  if (salesLine?.[1]) parts.push(trimFounderRealityPhrase(salesLine[1]));
  else if (renewalLine?.[0]) parts.push(trimFounderRealityPhrase(renewalLine[0]));
  if (quote) parts.push(quote);
  if (pilotProof?.[0]) parts.push(trimFounderRealityPhrase(pilotProof[0]));
  const joined = parts.filter(Boolean).join(" ");
  return trimFounderRealityPhrase(joined || matrixValue(diagnosis, "buyer_pressure") || matrixValue(diagnosis, "proof_signal"));
}

function trimFounderNarrativePhrase(value) {
  const cleaned = cleanConceptPhrase(value, 260);
  return preserveCompleteSentences(cleaned, 1, 220) || limitWords(cleaned, 22);
}

function trimFounderRealityPhrase(value) {
  const cleaned = String(value || "")
    .replace(/^\s*(?:sales feedback|sales says|sales|customer proof|proof|customer quote|quote|customer said|prospect said)\s*:\s*/i, "")
    .replace(/^\s*sales says buyers respond to\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return preserveCompleteSentences(cleaned || cleanProofPhrase(value) || cleanConceptPhrase(value, 420), 4, 420);
}

function phrasesDirectionallyAligned(left, right, diagnosis = null) {
  const a = normalizeOverlapText(left);
  const b = normalizeOverlapText(right);
  if (!a || !b) return "";
  const domain = diagnosis?.domain?.id || diagnosis?.has?.domain || "";
  if (domain === "operations") {
    const opsTerms = ["workflow", "handoff", "handoffs", "bottleneck", "bottlenecks", "approval", "approvals", "ownership", "follow up", "followup"];
    const aHits = opsTerms.filter((term) => a.includes(term));
    const bHits = opsTerms.filter((term) => b.includes(term));
    if (aHits.length && bHits.length && !/\bai\b|\bautomation\b|\bplatform\b|\binfrastructure\b/.test(a)) return "weak specificity";
  }
  const shared = a.split(" ").filter((word) => word.length > 4 && b.includes(word));
  if (shared.length >= 2 && !/\bai\b|\bautomation\b|\bplatform\b|\bmodern\b|\bintelligence\b/.test(a)) return "weak specificity";
  return "";
}

function alignedSurfaceRead(diagnosis, surface, currentCta, evidence) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const surfacePhrase = trimCollisionPhrase(surface || "The stronger message");
  if (domain === "operations") {
    return `${surfacePhrase} is directionally stronger than ${trimCollisionPhrase(currentCta || "a passive CTA")}, but it still needs sharper proof and buyer urgency around stuck approvals, ownership gaps, and manual follow-ups.`;
  }
  return `${surfacePhrase} is directionally aligned with the buyer problem, so Cognix does not treat it as a contradiction. The remaining gap is ${storyDriftGapLabel(diagnosis)}: ${trimCollisionPhrase(evidence || "the proof, urgency, or conversion path needs to carry more weight")}.`;
}

function storyDriftGapLabel(diagnosis) {
  if (diagnosis.has?.founderNarrativeOverride) return "Founder narrative override";
  if (diagnosis.has?.strongProofWeakConversionPath || diagnosis.has?.passiveCta) return "underdeveloped CTA";
  if (diagnosis.has?.proofBuriedMissingPublic || diagnosis.has?.proofGap) return "proof placement gap";
  if (diagnosis.has?.weakBuyerPain) return "needs sharper buyer pain";
  if (!diagnosis.has?.urgency) return "insufficient urgency";
  return "weak specificity";
}

function isStrongAlignedLaunch(diagnosis) {
  return (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch)
    && /^No major fracture detected$/i.test(diagnosis.dominantFractures?.[0]?.title || "");
}

function trimCollisionPhrase(value) {
  const cleaned = cleanConceptPhrase(value, 180);
  return limitWords(cleaned, 24);
}

function buildStrategyToMarketCoherenceRead(diagnosis) {
  const matrix = diagnosis.strategicMatrix || {};
  const internalInsight = cleanSentencePhrase(matrix.internal_insight?.value);
  const buyerPressure = displayBuyerPressurePhrase(diagnosis, matrix.buyer_pressure?.value);
  const dilution = matrix.public_dilution?.value || matrix.current_headline?.value;
  if (diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch) {
    return "Cognix does not detect a major GTM story break. The PMM workspace, buyer-facing copy, proof, CTA, and sales narrative appear to carry the same core strategic thread. The primary watchout is execution consistency: keep the same buyer pain, proof, CTA, and objection handling visible across landing page, outbound, webinar, and sales follow-up.";
  }
  if (!internalInsight && !buyerPressure && !dilution) {
    return "Cognix does not yet detect enough strategic signal to confirm launch readiness. The current input does not clearly establish the buyer pressure, proof standard, CTA, or conversion path. Before spend goes live, the team should add the upstream story baseline so downstream teams have something concrete to carry into market.";
  }
  const insightPhrase = cleanSentencePhrase(polishStrategicThesisPhrase(diagnosis, cleanDirectionConcept(internalInsight, "the buyer problem")));
  const pressurePhrase = displayBuyerPressurePhrase(diagnosis, cleanReadablePressurePhrase(buyerPressure, "the buyer pressure"));
  return domainNativeCoherenceRead(diagnosis, insightPhrase, pressurePhrase, dilution);
}

function domainNativeCoherenceRead(diagnosis, insightPhrase, pressurePhrase, dilution) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "This launch");
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const downstream = dilution ? `"${dilution}"` : "a generic buyer-facing message";
  if (phrasesDirectionallyAligned(dilution, pressurePhrase, diagnosis)) {
    if (domain === "operations") {
      return `${product} has an operations story that is directionally aligned with the real buyer pain. The gap is not a contradiction; it is specificity and conversion strength. ${trimCollisionPhrase(dilution)} is stronger than a passive CTA, but it still needs sharper proof and buyer urgency around stuck approvals, ownership gaps, and manual follow-ups.`;
    }
    return `${product} has a buyer-facing message that is directionally aligned with the internal strategy. The remaining gap is ${storyDriftGapLabel(diagnosis)}, not a story contradiction. The page should carry the proof, urgency, and conversion path with more precision.`;
  }
  const openings = {
    sales: `${product} is internally about forecast-call risk, but the public page sells generic deal intelligence.`,
    revops: `${product} is internally about pipeline-review trust, but the public page sells generic revenue intelligence.`,
    cs: `${product} is built around hidden renewal risk, but the page makes it sound like another customer health dashboard.`,
    finance: `${product} is positioned internally around invoice exceptions before month-end backlog, but the page leads with generic invoice intelligence.`,
    operations: `${product} is about finding handoff bottlenecks, but the page presents it as broad workflow automation.`,
    marketing: `${product} is internally about protecting launch-to-pipeline intent, but the public page leads with a broader AI category frame.`
  };
  const consequence = {
    sales: "That weakens sales leadership urgency because the buyer hears software category before forecast-call risk.",
    revops: "That weakens RevOps urgency because the buyer hears software category before pipeline-review trust.",
    cs: "That weakens CS urgency because the buyer hears customer-health category before hidden renewal risk.",
    finance: "That weakens finance/AP urgency because the buyer hears invoice-AI category before month-end operating risk.",
    operations: "That weakens operations urgency because the buyer hears workflow automation before the handoff bottleneck.",
    marketing: "That weakens CMO-level demo intent because the buyer hears AI category before launch-to-pipeline risk."
  };
  return [
    openings[domain] || openings.marketing,
    `The internal thesis is: ${sentenceWithPeriod(insightPhrase)}`,
    `The buyer pressure is: ${sentenceWithPeriod(pressurePhrase)}`,
    `The downstream surface leads with ${downstream}.`,
    consequence[domain] || consequence.marketing
  ].join(" ");
}

function domainNativeCollisionRead(diagnosis, pressure, dilution, type = "story_drift") {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const cleanPressure = lowerDisplayPhrase(pressure, "the strategic pressure");
  const copy = `"${dilution}"`;
  if (type === "founder_narrative_override") {
    return "The primary risk is not that the CTA is weak. The primary risk is that leadership is pulling the launch toward abstract category language while sales and customer proof point to renewal-risk urgency. Secondary gap: Passive CTA does not convert the renewal-risk urgency into a qualified next step.";
  }
  if (type === "abstract_category_vs_pain") {
    return `The founder/category narrative leads with ${cleanPressure}, while the buyer signal is concrete: ${copy}. That is the GTM fracture: the market will feel the operational pain before it values the category.`;
  }
  if (type === "passive_cta_vs_urgency") {
    const urgentSignal = lowerDisplayPhrase(dilution, "the buyer urgency");
    if (domain === "operations") return `The issue is not story contradiction. The issue is that the CTA does not carry the urgency already present in the customer proof: ${urgentSignal}.`;
    return `The issue is not story contradiction. The issue is that the CTA does not carry the urgency already present in the proof or buyer pain: ${urgentSignal}.`;
  }
  if (domain === "sales") return `The strategy points to forecast-call risk: ${cleanPressure}. The page leads with ${copy}, which moves the buyer from deal risk to generic AI capability.`;
  if (domain === "revops") return `The strategy points to pipeline-review trust: ${cleanPressure}. The page leads with ${copy}, which moves the buyer from forecast confidence to generic revenue intelligence.`;
  if (domain === "cs") return `The strategy points to hidden renewal risk: ${cleanPressure}. The page leads with ${copy}, which moves the buyer from churn prevention to generic customer health.`;
  if (domain === "finance") return `The strategy points to invoice-exception risk: ${cleanPressure}. The page leads with ${copy}, which moves the buyer from month-end urgency to generic invoice intelligence.`;
  if (domain === "operations") return `The strategy points to handoff bottlenecks: ${cleanPressure}. The page leads with ${copy}, which moves the buyer from workflow delay to generic automation.`;
  return `The internal strategy points to ${cleanPressure}, while the buyer-facing copy leads with ${copy}. That meaning shift can move the buyer from business urgency to generic capability.`;
}

function buildCommercialRiskPanel(diagnosis) {
  const spend = extractBudgetAmount(diagnosis.signals || []);
  const demoTarget = extractDemoTarget(diagnosis.allText || "");
  const arrRisk = extractCommercialRange(diagnosis.allText || "");
  const kpis = formattedCommercialKpis(diagnosis);
  const launchInvestment = kpis.find((item) => /^Launch /.test(item.label))?.value;
  const demoTargetLabel = kpis.find((item) => item.label === "Demo target")?.value;
  const arrRiskLabel = kpis.find((item) => item.label === "ARR influence at risk")?.value;
  const opportunityRiskLabel = kpis.find((item) => item.label === "Opportunity risk")?.value;
  const acvLabel = kpis.find((item) => item.label === "ACV")?.value;
  if (diagnosis.predictabilityScore >= 90 || diagnosis.riskLabel === "Low") {
    return {
      label: "Commercial readiness",
      headline: "Launch shows strong commercial readiness",
      body: "The launch shows strong commercial readiness. The buyer pain, proof, CTA, and sales narrative are carrying the same strategic thread, which lowers the risk of turning spend into low-quality activity."
    };
  }
  if (spend || demoTarget || arrRisk || opportunityRiskLabel || acvLabel) {
    const spendClause = launchInvestment ? `leadership is deploying a ${launchInvestment}` : "leadership is deploying launch budget";
    const targetClause = demoTargetLabel ? ` to secure a ${demoTargetLabel}` : "";
    const atRisk = [arrRiskLabel, opportunityRiskLabel, acvLabel].filter(Boolean);
    const arrClause = atRisk.length ? `, putting ${atRisk.join(" and ")}` : "";
    return {
      label: "Commercial risk",
      headline: kpis.map((item) => item.value).join(" | ") || "Commercial stakes detected",
      body: domainCommercialRiskBody(diagnosis, spendClause, targetClause, arrClause)
    };
  }
  return {
    label: "Commercial risk",
    headline: "Add launch investment, demo target, or pipeline goal to quantify risk.",
    body: domainCommercialFallbackBody(diagnosis)
  };
}

function domainCommercialRiskBody(diagnosis, spendClause, targetClause, arrClause) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const suffix = `${arrClause}${domainCommercialEnding(domain)}`;
  const lead = `Because ${spendClause}${targetClause}, this execution-layer contradiction`;
  const downstream = matrixValue(diagnosis, "public_dilution") || matrixValue(diagnosis, "current_headline");
  const buyerPressure = matrixValue(diagnosis, "buyer_pressure") || diagnosis.extractedConcepts?.buyerPain;
  if (domain === "sales") {
    return `${lead} risks turning a forecast-risk launch into generic revenue-AI interest. If shipped as-is, sales leadership demo quality may drop${suffix}`;
  }
  if (domain === "revops") {
    return `${lead} risks turning a pipeline-review trust story into generic revenue-intelligence interest. If shipped as-is, RevOps demo quality may drop${suffix}`;
  }
  if (domain === "cs") {
    return `${lead} risks turning a renewal-risk story into generic customer-health interest. If shipped as-is, CS buyer urgency may drop${suffix}`;
  }
  if (domain === "finance") {
    return `${lead} risks turning an invoice-exception and month-end risk story into generic finance-AI interest. If shipped as-is, finance/AP buyer urgency may drop${suffix}`;
  }
  if (domain === "operations") {
    if (phrasesDirectionallyAligned(downstream, buyerPressure, diagnosis)) {
      const alignedSuffix = arrClause ? `${arrClause} before the workflow-risk message reaches operations buyers.` : " before the workflow-risk message reaches operations buyers.";
      return `Because ${spendClause}${targetClause}, the commercial risk is not a false story collision. The page is directionally aligned, but CTA specificity, proof placement, and operations urgency still need to carry stuck approvals, ownership gaps, and manual follow-ups${alignedSuffix}`;
    }
    return `${lead} risks turning a handoff-bottleneck story into generic workflow-automation interest. If shipped as-is, operations buyer urgency may drop${suffix}`;
  }
  return `${lead} risks turning an intended launch-to-pipeline story into a superficial awareness campaign. If shipped as-is, qualified demo conversion may drop${suffix}`;
}

function domainCommercialEnding(domain) {
  if (domain === "sales") return " before the forecast-risk campaign reaches sales leaders.";
  if (domain === "revops") return " before the pipeline-review message reaches RevOps buyers.";
  if (domain === "cs") return " before the renewal-risk message reaches CS buyers.";
  if (domain === "finance") return " before finance buyers dismiss it as generic invoice AI.";
  if (domain === "operations") return " before operations buyers treat it as another workflow automation tool.";
  return " before campaign spend goes live.";
}

function domainCommercialFallbackBody(diagnosis) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  if (domain === "sales") return "This execution gap may not show up as a copy problem. It is more likely to show up as weaker forecast-risk urgency, lower sales leadership demo quality, or sales follow-up that cannot connect slipping deals to the next action.";
  if (domain === "revops") return "This execution gap may not show up as a copy problem. It is more likely to show up as weaker pipeline-review urgency, lower RevOps demo quality, or sales follow-up that cannot connect cross-system contradiction to the next action.";
  if (domain === "cs") return "This execution gap may not show up as a copy problem. It is more likely to show up as weaker renewal-risk urgency, lower CS demo quality, or sales follow-up that cannot connect health-score contradiction to the next action.";
  if (domain === "finance") return "This execution gap may not show up as a copy problem. It is more likely to show up as weaker finance/AP urgency, lower demo quality, or sales follow-up that cannot connect invoice exceptions to month-end risk.";
  if (domain === "operations") return "This execution gap may not show up as a copy problem. It is more likely to show up as weaker operations urgency, lower demo quality, or sales follow-up that cannot connect handoff bottlenecks to workflow delay.";
  return "This execution gap may not show up as a copy problem. It is more likely to show up as lower demo quality, weaker sales follow-up, unclear buyer urgency, or campaign activity that does not convert into qualified pipeline.";
}

function polishStrategicThesisPhrase(diagnosis, phrase) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "");
  const buyer = cleanBuyerNoun(matrixValue(diagnosis, "buyer") || diagnosis.extractedConcepts?.icp || "");
  if (product && buyer && /\bis built to\b/i.test(phrase)) {
    return normalizeAcronyms(phrase.replace(new RegExp(`^${escapeRegExp(product)}\\s+is built to\\s+`, "i"), `${product} helps ${buyer} `).replace(/\blaunch story that will break\b/i, "launch story most likely to break"));
  }
  return normalizeAcronyms(phrase);
}

function cleanSentencePhrase(value) {
  return stripTerminalPunctuation(cleanConceptPhrase(value, 260)).trim();
}

function sentenceWithPeriod(value) {
  const cleaned = cleanSentencePhrase(value);
  return cleaned ? `${cleaned}.` : "";
}

function polishBuyerPressurePhrase(diagnosis, phrase) {
  const launchRisk = /launch-to-pipeline|qualified demos?|demo target|campaign budget|launch story|demo intent/i.test(`${diagnosis.allText || ""} ${phrase}`);
  if (launchRisk && /\bdoes not convert into qualified demos\b/i.test(phrase) && !/\bcreates activity but does not convert/i.test(phrase)) {
    return phrase.replace(/\bdoes not convert into qualified demos\b/i, "creates activity but does not convert into qualified demos");
  }
  return phrase;
}

function cleanReadablePressurePhrase(value, fallback) {
  const cleaned = cleanConceptPhrase(value, 240);
  return cleaned || fallback;
}

function cleanBuyerNoun(value) {
  const cleaned = cleanConceptPhrase(value, 80)
    .replace(/\s+and\s+VP Marketing leaders.*$/i, "")
    .replace(/\s+at\s+.*$/i, "")
    .replace(/\s+leaders?$/i, "s")
    .trim();
  if (/^CMOs?$/i.test(cleaned)) return "CMOs";
  if (/^CFOs?$/i.test(cleaned)) return "CFOs";
  return cleaned || "buyers";
}

function buildInsteadSayThisPanel(diagnosis) {
  const instead = matrixValue(diagnosis, "current_headline") || matrixValue(diagnosis, "public_dilution") || diagnosis.beforeMessage;
  const dilution = matrixValue(diagnosis, "public_dilution") || instead;
  const buyerPressure = displayBuyerPressurePhrase(diagnosis, matrixValue(diagnosis, "buyer_pressure") || diagnosis.extractedConcepts?.buyerPain || "the buyer pressure");
  const internalSource = matrixSourcePhrase(diagnosis, "internal_strategic_insight") || matrixSourcePhrase(diagnosis, "buyer_pressure");
  const publicSource = matrixSourcePhrase(diagnosis, "public_dilution") || matrixSourcePhrase(diagnosis, "current_headline");
  const sayThis = diagnosis.has?.founderNarrativeOverride ? founderOverrideLeadMessage(diagnosis) : buildContextualRewriteHeadline(diagnosis);
  return {
    instead,
    sayThis,
    why: `This adjustment removes the generic "${dilution}" framing and anchors the launch story directly on ${lowerDisplayPhrase(buyerPressure, "the buyer pressure")} before introducing product capabilities.`,
    logicTracking: `This rewrite uses ${sourcePhraseForLogic(internalSource || buyerPressure)} from ${matrixSourceLabel(internalSource ? "internal_strategic_insight" : "buyer_pressure")} and replaces ${sourcePhraseForLogic(publicSource || dilution)} from ${matrixSourceLabel(publicSource ? "public_dilution" : "current_headline")}. ${domainRewriteLogicLine(diagnosis)}`
  };
}

function displayBuyerPressurePhrase(diagnosis, phrase) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const text = `${diagnosis.allText || ""} ${phrase || ""}`;
  if (domain === "sales" && /pipeline number they do not fully trust/i.test(text)) return "sales leaders walk into forecast calls with a pipeline number they do not fully trust";
  if (domain === "cs" && /renewal risk too late/i.test(text)) return "CSMs keep finding renewal risk too late";
  if (domain === "finance" && /invoice exceptions/i.test(text)) return "invoice exceptions keep piling up before close, and the team cannot tell which issues will delay payment or create month-end risk";
  if (domain === "operations" && /work gets stuck between handoffs|bottleneck/i.test(text)) return "work gets stuck between handoffs because teams cannot tell whether approvals, ownership, missing data, or follow-up is the bottleneck";
  if (domain === "revops" && /pipeline reviews?|numbers nobody trusts|slightly different answer/i.test(text)) return "pipeline reviews have conflicting numbers across systems, so RevOps cannot walk in with one trusted version of the truth";
  const cleaned = cleanConceptPhrase(phrase, 240)
    .replace(/^(?:the\s+)?(?:real\s+)?pain is(?:\s+that)?\s+/i, "")
    .replace(/^the idea is simple:\s*/i, "")
    .replace(/^buyer pressure\s*:\s*/i, "")
    .replace(/^work gets stuck between handoffs,\s+and\s+the pain is that\s+/i, "work gets stuck between handoffs because ")
    .replace(/^work gets stuck between handoffs,\s+and\s+/i, "work gets stuck between handoffs because ")
    .trim();
  return polishBuyerPressurePhrase(diagnosis, cleaned || "the buyer pressure");
}

function domainRewriteLogicLine(diagnosis) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  if (domain === "sales") return "It moves forecast-call risk ahead of generic AI capability.";
  if (domain === "revops") return "It moves pipeline-review trust ahead of generic revenue-intelligence capability.";
  if (domain === "cs") return "It moves hidden renewal risk ahead of generic customer-health capability.";
  if (domain === "finance") return "It moves invoice-exception risk ahead of generic invoice-intelligence capability.";
  if (domain === "operations") return "It moves the handoff bottleneck ahead of generic workflow-automation capability.";
  return "It surfaces the buyer's actual pressure before the page introduces product capability.";
}

function buildContextualRewriteHeadline(diagnosis) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "This launch");
  const text = diagnosis.allText || "";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return "Turn launch activity into qualified demo intent.";
  if (/forecast calls?|deals? (?:that )?(?:will )?slip|slipping deals?|forecast risk|dealpulse/i.test(text)) return "Find the deals that will slip before your forecast call.";
  if (/pipeline reviews?|numbers nobody trusts|forecast confidence|pipeline trust/i.test(text)) return "Stop walking into pipeline reviews with numbers nobody trusts.";
  if (/audit|SOC 2|compliance|evidence|control gaps/i.test(text)) return "Find the evidence gaps that could delay audit readiness.";
  if (/\binvoice\b|\binvoices\b|\bexception\b|\bexceptions\b|\bAP\b|\bbacklog\b/i.test(text)) return "Find invoice exceptions before they become month-end backlog.";
  if (/renewal|churn|adoption|customer risk|health score/i.test(text)) return "Find the renewal risks your health score missed.";
  if (/workflow|handoffs?|bottleneck|operations leaders|business systems/i.test(text)) return "Find the handoff that is slowing down your workflow.";
  if (diagnosis.has?.buyerMessageMismatch || /spend leakage|approval control|margin protection/i.test(text)) return "Find the spend leakage finance cannot afford to miss.";
  if (/launch intelligence|launch story|campaign budget|CMO|qualified demos/i.test(text)) return "Find the launch story that will break before your campaign budget goes live.";
  const pressure = lowerDirectionConcept(matrixValue(diagnosis, "buyer_pressure") || diagnosis.extractedConcepts?.buyerPain, "the risk buyers need to resolve");
  return product === "This launch"
    ? `Make ${pressure} visible before buyers default to the status quo.`
    : `${product} makes ${pressure} visible before buyers default to the status quo.`;
}

function buildSpecificCtaPanel(diagnosis) {
  const current = matrixValue(diagnosis, "current_cta") || "No primary CTA provided";
  const suggested = extractSuggestedCtaPhrase(diagnosis.signals?.find((signal) => signal.id === "cta")?.text || diagnosis.allText || "");
  const strong = diagnosis.has?.strongCta && !suggested && !diagnosis.has?.genericDemoCtaForRisk && !diagnosis.has?.genericAiPositioning && !diagnosis.has?.passiveCta;
  const updated = selectCtaRecommendation(diagnosis, suggested, strong ? current : buildBuyerSpecificCta(diagnosis));
  const pressure = displayBuyerPressurePhrase(diagnosis, matrixSourcePhrase(diagnosis, "buyer_pressure") || matrixValue(diagnosis, "buyer_pressure")) || matrixSourcePhrase(diagnosis, "proof_signal") || matrixValue(diagnosis, "proof_signal") || matrixValue(diagnosis, "commercial_stake");
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "The product");
  const invoiceProofCtaLogic = diagnosis.has?.strongProofWeakConversionPath && diagnosis.has?.financeAp && /\binvoice|exception|AP|backlog/i.test(diagnosis.allText || "")
    ? `${product} has strong proof: ${sourcePhraseForLogic(matrixValue(diagnosis, "proof_signal") || matrixSourcePhrase(diagnosis, "proof_signal"))}. But ${sourcePhraseForLogic(current)} asks for generic curiosity instead of converting that proof into a buyer action. The replacement CTA ties the next step to invoice exception leakage and AP backlog risk.`
    : "";
  return {
    isStrong: strong,
    instead: current,
    sayThis: updated,
    why: strong
      ? `The current CTA is specific enough to support a buyer action because it names a concrete next step instead of generic curiosity.`
      : invoiceProofCtaLogic || "The current CTA asks for generic curiosity. The updated CTA replaces the passive step with a buyer-specific next action.",
    logicTracking: strong
      ? `The current CTA uses ${sourcePhraseForLogic(current)} from ${matrixSourceLabel("current_cta")} and already names a concrete buyer action.`
      : invoiceProofCtaLogic || `The current CTA uses ${sourcePhraseForLogic(current)} from ${matrixSourceLabel("current_cta")}. The replacement uses ${sourcePhraseForLogic(pressure || "the detected buyer pressure")} to create a buyer-specific next step.`
  };
}

function selectCtaRecommendation(diagnosis, suggested, fallback) {
  const rewrite = buildContextualRewriteHeadline(diagnosis);
  if (suggested && !phrasesDirectionallyAligned(suggested, rewrite, diagnosis)) return suggested;
  if (suggested && normalizeOverlapText(suggested) !== normalizeOverlapText(rewrite)) return suggested;
  return fallback;
}

function sourcePhraseForLogic(value) {
  const phrase = trimCollisionPhrase(value);
  return phrase ? `"${phrase}"` : "the extracted signal";
}

function buildBuyerSpecificCta(diagnosis) {
  const text = diagnosis.allText || "";
  const fieldAndProofText = [
    signalTextForReceipt(diagnosis, "sales-talk-track"),
    signalTextForReceipt(diagnosis, "sales-feedback"),
    signalTextForReceipt(diagnosis, "objections"),
    signalTextForReceipt(diagnosis, "customer-proof"),
    receiptFor(diagnosis.commercialExposure?.sourceReceipts || [], "Field reality"),
    receiptFor(diagnosis.commercialExposure?.sourceReceipts || [], "Proof surface")
  ].filter(Boolean).join("\n");
  const renewalRiskCtaContext = diagnosis.has?.customerSuccessRenewal
    || diagnosis.has?.founderNarrativeOverride && /renewal|churn|health score|customer risk|hidden risk/i.test(`${text}\n${fieldAndProofText}`)
    || /renewal risk|renewal-risk|hidden renewal|hidden churn|churn signals?|health score missed|before it becomes churn|quiet churn/i.test(`${text}\n${fieldAndProofText}`);
  if (renewalRiskCtaContext) {
    if (/review|book|demo target|qualified demos?/i.test(text)) return "Book a renewal risk review";
    if (/where|hiding|hidden/i.test(fieldAndProofText)) return "See where renewal risk is hiding";
    if (/before it becomes churn|churn/i.test(fieldAndProofText)) return "Assess renewal risk before it becomes churn";
    return "Find hidden renewal risk";
  }
  if (/forecast calls?|deals? (?:that )?(?:will )?slip|slipping deals?|forecast risk|dealpulse/i.test(text)) return "Pressure-test your forecast risk";
  if (/pipeline reviews?|pipeline trust|forecast confidence/i.test(text)) return "Pressure-test your next pipeline review";
  if (/\binvoice\b|\binvoices\b|\bexception\b|\bexceptions\b|\bAP\b|\bbacklog\b/i.test(text)) return "Find your invoice exception leakage";
  if (/from\s+5\s+days?\s+to\s+2\s+days?|cut approval cycles? from 5 days to 2/i.test(text)) return "See how teams cut approval cycles from 5 days to 2";
  if (/approvals? get stuck|stuck approvals?|finance approval|legal review/i.test(text)) return "See where approvals get stuck";
  if (/workflow|handoffs?|bottleneck|operations leaders|business systems/i.test(text)) return "Book a workflow bottleneck review";
  if (diagnosis.has?.launchMotionActivityWeakConversion) return "Run a qualified-demo intent readout";
  if (/spend leakage|approval|CFO|finance/i.test(text)) return "Assess spend leakage before another approval cycle";
  if (/audit|SOC 2|compliance|evidence/i.test(text)) return "Find the audit evidence gaps";
  return "Run a launch-to-pipeline risk readout";
}

function buildStrategicAlignmentBrief(diagnosis) {
  const product = normalizeAcronyms(diagnosis.extractedConcepts?.product || detectAuditedLaunch(diagnosis) || "Audited launch");
  if (diagnosis.has?.founderNarrativeOverride) return buildFounderOverrideAlignmentBrief(diagnosis, product);
  const buyerPressure = displayBuyerPressurePhrase(diagnosis, matrixValue(diagnosis, "buyer_pressure") || "the buyer pressure this launch is meant to address");
  const internalInsight = cleanSentencePhrase(polishStrategicThesisPhrase(diagnosis, matrixValue(diagnosis, "internal_insight") || "the internal strategic insight"));
  const dilution = matrixValue(diagnosis, "public_dilution") || matrixValue(diagnosis, "current_headline") || "the current buyer-facing message";
  const kpis = formattedCommercialKpis(diagnosis);
  const protectValues = kpis.filter((item) => item.label !== "Demo target").map((item) => item.value);
  const strong = diagnosis.predictabilityScore >= 90 || diagnosis.has?.strongLaunch;
  const middleHeading = strong ? "The execution watchout:" : "The strategy mismatch:";
  const foundation = strong
    ? `Strategy and execution are carrying the same thread around ${lowerDirectionConcept(buyerPressure, "the buyer pressure")}.`
    : domainBriefFoundation(diagnosis, product, internalInsight, buyerPressure, dilution);
  const middleBody = strong
    ? `Keep the same buyer pain, proof, CTA, and objection handling visible across every execution surface so the launch does not get diluted downstream.`
    : domainBriefMismatch(diagnosis, product, buyerPressure, dilution);
  const remediationBody = strong
    ? "Recommend preserving the current strategic thread across the main hero hook, CTA, proof placement, field talk track, and follow-up motion so cross-functional interpretation stays consistent as the launch moves into market."
    : domainBriefRemediation(diagnosis, protectValues);
  return [
    `Subject: Pre-launch cross-functional alignment window requested: ${product}`,
    "",
    "The GTM fracture detection run:",
    foundation,
    "",
    middleHeading,
    middleBody,
    "",
    "Remediation action:",
    remediationBody
  ].join("\n");
}

function buildFounderOverrideAlignmentBrief(diagnosis, product) {
  const leadMessage = founderOverrideLeadMessage(diagnosis);
  const categoryFrame = trimFounderNarrativePhrase(extractFounderNarrativeSignal(diagnosis) || matrixValue(diagnosis, "current_headline") || matrixValue(diagnosis, "public_dilution") || "AI revenue operating system");
  return [
    `Subject: Pre-launch cross-functional alignment window requested: ${product}`,
    "",
    "The GTM fracture detection run:",
    `${product} has a strong buyer-backed wedge: ${lowerDisplayPhrase(leadMessage, "catch renewal risk before it becomes churn")}. Sales feedback and customer proof both point to practical renewal-risk urgency.`,
    "",
    "The strategy mismatch:",
    `Leadership is pushing the launch toward "${categoryFrame}", which may sound more strategic internally but makes the buyer work harder to understand the urgent problem. The gap is not a lack of messaging options. The gap is that leadership ambition is pulling the launch away from the strongest buyer evidence.`,
    "",
    "Remediation action:",
    "Sequence the story. Lead with renewal risk, then use the AI revenue operating system language as the strategic frame after the buyer understands the problem."
  ].join("\n");
}

function domainBriefFoundation(diagnosis, product, internalInsight, buyerPressure, dilution) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const pressure = lowerDisplayPhrase(buyerPressure, "the buyer pressure");
  const page = dilution ? `"${dilution}"` : "a broader buyer-facing frame";
  if (domain === "sales") return `${product} has the right internal wedge: ${internalInsight}. The live page needs to carry this pressure: ${pressure}. Buyers currently see ${page}.`;
  if (domain === "revops") return `${product} has the right internal wedge: ${internalInsight}. The live page needs to carry this pressure: ${pressure}. Buyers currently see ${page}.`;
  if (domain === "cs") return `${product} has the right internal wedge: ${internalInsight}. The live page needs to carry this pressure: ${pressure}. Buyers currently see ${page}.`;
  if (domain === "finance") return `${product} has the right internal wedge: ${internalInsight}. The live page needs to carry this pressure: ${pressure}. Buyers currently see ${page}.`;
  if (domain === "operations") return `${product} has the right internal wedge: ${internalInsight}. The live page needs to carry this pressure: ${pressure}. Buyers currently see ${page}.`;
  return `${product} has a credible launch-to-pipeline strategy: ${internalInsight}. The live page needs to carry this pressure: ${pressure}. Buyers currently see ${page}.`;
}

function domainBriefMismatch(diagnosis, product, buyerPressure, dilution) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const pressure = lowerDisplayPhrase(buyerPressure, "the buyer pressure");
  const page = dilution ? `"${dilution}"` : "the current buyer-facing message";
  if (phrasesDirectionallyAligned(dilution, buyerPressure, diagnosis)) {
    if (domain === "operations") return `Right now, ${page} is directionally aligned with the operations pain. The remaining gap is not category drift; it is specificity, proof placement, and urgency around ${pressure}.`;
    return `Right now, ${page} is directionally aligned with the buyer pressure. The remaining gap is ${storyDriftGapLabel(diagnosis)}, not a full story contradiction.`;
  }
  if (domain === "sales") return `Right now, ${page} makes ${product} easier to classify as deal-intelligence software than as a forecast-risk readout. That is the dilution: sales leaders may understand the category without feeling the forecast-call pressure.`;
  if (domain === "revops") return `Right now, ${page} makes ${product} easier to classify as revenue intelligence than as a pipeline-review trust readout. That is the dilution: RevOps may understand the category without feeling the cross-system contradiction.`;
  if (domain === "cs") return `Right now, ${page} makes ${product} easier to classify as customer-health software than as a hidden renewal-risk readout. That is the dilution: CS buyers may understand the category without feeling the renewal urgency.`;
  if (domain === "finance") return `Right now, ${page} makes ${product} easier to classify as invoice intelligence than as a month-end exception-risk readout. That is the dilution: finance buyers may understand the category without feeling the close risk.`;
  if (domain === "operations") return `Right now, ${page} makes ${product} easier to classify as workflow automation than as a handoff-bottleneck readout. That is the dilution: operations buyers may understand the category without feeling the workflow delay.`;
  return `Right now, ${page} makes ${product} easier to classify as generic AI software than as a launch-to-pipeline risk readout. That is the dilution: buyers may understand the category without feeling ${pressure}.`;
}

function domainBriefRemediation(diagnosis, protectValues) {
  const domain = diagnosis.domain?.id || diagnosis.has?.domain || "marketing";
  const protect = protectValues.length ? `To protect ${protectValues.join(" and ")}, ` : "";
  const dilution = matrixValue(diagnosis, "public_dilution") || matrixValue(diagnosis, "current_headline");
  const buyerPressure = matrixValue(diagnosis, "buyer_pressure") || diagnosis.extractedConcepts?.buyerPain;
  if (domain === "sales") return `${protect}align the hero, proof, CTA, and sales talk track around forecast risk before the campaign reaches sales leaders.`;
  if (domain === "revops") return `${protect}align the hero, proof, CTA, and sales talk track around pipeline-review trust before the message reaches RevOps buyers.`;
  if (domain === "cs") return `${protect}align the hero, proof, CTA, and sales talk track around hidden renewal risk before the message reaches CS buyers.`;
  if (domain === "finance") return `${protect}align the hero, proof, CTA, and sales talk track around invoice exceptions before finance buyers dismiss it as generic invoice AI.`;
  if (domain === "operations" && phrasesDirectionallyAligned(dilution, buyerPressure, diagnosis)) return `${protect}tighten proof placement, CTA specificity, and sales follow-up around stuck approvals, ownership gaps, and manual follow-ups.`;
  if (domain === "operations") return `${protect}align the hero, proof, CTA, and sales talk track around handoff bottlenecks before operations buyers treat it as another workflow automation tool.`;
  return `${protect}align the hero, proof, CTA, and sales talk track around launch-to-pipeline risk before campaign spend scales.`;
}

function synthesizeWhy(diagnostic) {
  const top = diagnostic.dominantFractures[0]?.title || "Limited launch signal coverage";
  const secondary = diagnostic.secondaryFractures[0]?.title;
  const concepts = diagnostic.extractedConcepts;
  const preface = diagnostic.mode === "pre" ? "before launch day" : "before the next conversion push";
  const secondaryClause = secondary ? ` ${sentenceForSecondaryFracture(secondary)}` : "";

  if (diagnostic.has.strongLaunch) {
    return "The launch has the core conversion conditions Cognix expects: a clear ICP, concrete pain, urgency, proof, a direct conversion path, and sales support. The remaining risk is execution consistency, not a major strategy correction. Keep the same buyer-pain, proof, and CTA aligned across launch page, campaign, and sales follow-through.";
  }

  if (top === "Passive CTA") {
    return `The PMM workspace shows a credible strategic foundation, but the conversion path is too passive for ${riskFrameForDomain(diagnostic.domain?.id)}.${secondaryClause} That matters because buyers may understand ${concepts.product} without seeing a clear reason to take a qualified next step. Protect the strategy by moving the ask from passive learning to a direct, pain-tied risk readout or demo action ${preface}.`;
  }

  if (top === "Competitive differentiation gap") {
    return `The launch is entering a market where the buyer pain can be framed by alternatives before ${concepts.product} owns it.${secondaryClause} That creates qualified pipeline risk because the page can create awareness while another frame shapes urgency and buying criteria. Protect the strategy by sharpening the why-us contrast around the business cost, the buyer trigger, and the reason to act ${preface}.`;
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
    return `The launch has credible proof and a clear buyer pain, but the CTA does not translate interest into the next buyer action.${secondaryClause} The evidence can create belief, but a passive education ask leaves buyers without a specific risk readout or demo path. Turn the proof into a sharper conversion offer before scaling the campaign.`;
  }

  if (top === "Proof gap may weaken late-stage demo conversion") {
    return diagnostic.has.customerSuccessRenewal
      ? `The launch has a strong ICP, clear buyer pain, and a specific CTA, so it can create renewal-risk urgency.${secondaryClause} The remaining risk is buyer belief: the proof is directionally useful but not yet quantified enough to carry late-stage confidence. Add concrete renewal, churn, adoption, or account-risk evidence before scaling the launch.`
      : `The launch has a strong ICP, clear buyer pain, and a specific CTA, so it can create demo intent.${secondaryClause} The remaining risk is buyer belief: the proof is directionally useful but not yet quantified enough to carry late-stage confidence. Add concrete proof before scaling the launch.`;
  }

  if (top === "Target buyer and message are misaligned") {
    return `Cognix detects buyer-facing dilution: the selected buyer is CFO, but the buyer-facing copy speaks to generic team productivity.${secondaryClause} The page does not connect TeamFlow AI to financial control, margin protection, forecast accuracy, spend leakage, or the operating metrics finance leaders are judged on. Rewrite the execution layer around the CFO's commercial risk before asking this motion to create qualified demos.`;
  }

  if (top === "Feature-heavy message") {
    return `The launch has a real product story, but the current buyer-facing message still leads with capability before making the buyer's operational risk urgent.${secondaryClause} The result is a CTA conversion gap: buyers can understand what changed without feeling enough pressure to request a demo or risk readout. Move the story from explanation to urgency by making the cost of the unresolved pain concrete ${preface}.`;
  }

  if (top === "Weak buyer pain" || top === "Unclear buyer urgency") {
    return `The launch points at a meaningful buyer problem, but Cognix does not yet detect enough strategic signal to confirm urgency.${secondaryClause} That matters because ${riskFrameForDomain(diagnostic.domain?.id)} depends on urgency, not just comprehension. Make the cost of waiting more concrete and connect the pain directly to the primary CTA ${preface}.`;
  }

  if (top === "Weak sales conversion path") {
    return `The launch can create interest while sales still carries a thinner story into qualified conversations.${secondaryClause} That matters because launch momentum leaks when reps cannot connect the buyer pain, why now, and the next step in one clear motion. Give sales a pain-to-demo talk track and a response to the why-now objection ${preface}.`;
  }

  return `Cognix detects ${formatFractureLabel(top)} as the main ${riskFrameForDomain(diagnostic.domain?.id)}.${secondaryClause} The issue is not whether the launch has activity; it is whether the execution surfaces transmit enough urgency, trust, and conversion clarity to move buyers from interest to a qualified next step. Protect launch momentum by addressing the highest-risk drift point before spend scales.`;
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
  const cta = cleanDirectionConcept(concepts.ctaAction, "Run GTM fracture detection before spend goes live");
  const candidate = `For ${icp} facing ${pain}, ${product} helps ${outcome} by ${mechanism}. Instead of ${statusQuo}, ${stripTerminalPunctuation(cta)}.`;

  if (!unsafeMessageDirection(candidate, diagnostic)) return normalizeAcronyms(candidate);
  return buildStaticExtractionLedgerText(diagnostic);
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

function synthesisNeedsStaticLedger(diagnosis, architecture) {
  const text = [
    architecture.coherenceRead,
    architecture.commercialPanel?.body,
    architecture.rewritePanel?.sayThis,
    architecture.rewritePanel?.logicTracking,
    architecture.ctaPanel?.sayThis,
    architecture.ctaPanel?.logicTracking,
    architecture.resourceBrief
  ].join("\n");
  const phrasePattern = (...parts) => new RegExp(parts.join(""), "i");
  const banned = [
    phrasePattern("For PMMs ", "launching in ", "fast", "-moving"),
    phrasePattern("Cognix helps ", "protect ", "launch", " strategy"),
    /\[[a-z_ ]+\]/i,
    /\bundefined\b/i,
    phrasePattern("\\bconsumer", "-facing\\b"),
    phrasePattern("\\bCTA ", "vector\\b"),
    phrasePattern("\\bun", "-skippable next decision\\b"),
    phrasePattern("\\$49", "\\/month"),
    phrasePattern("\\byour messaging is ", "weak\\b"),
    phrasePattern("\\byour launch is ", "broken\\b"),
    phrasePattern("\\byour strategy ", "failed\\b"),
    phrasePattern("\\bbad ", "positioning\\b"),
    phrasePattern("\\bfailed ", "launch\\b"),
    phrasePattern("\\breframe around ", "pain\\b"),
    phrasePattern("\\bmake the buyer problem ", "urgent\\b"),
    phrasePattern("\\bfocus on cost of ", "inaction\\b"),
    phrasePattern("\\bclarify ", "differentiation\\b"),
    phrasePattern("\\bstrengthen the value ", "proposition\\b"),
    phrasePattern("\\boptimize the ", "narrative\\b"),
    phrasePattern("\\balign sales and ", "marketing\\b")
  ];
  const rewrite = architecture.rewritePanel?.sayThis || "";
  const hasRewriteEvidence = Boolean(matrixSourcePhrase(diagnosis, "internal_strategic_insight") || matrixSourcePhrase(diagnosis, "buyer_pressure") || matrixSourcePhrase(diagnosis, "proof_signal"));
  return banned.some((pattern) => pattern.test(text)) || (rewrite && !hasRewriteEvidence && !diagnosis.has?.strongLaunch);
}

function buildStaticExtractionArchitecture(diagnosis) {
  const ledger = buildStaticExtractionLedgerText(diagnosis);
  const cta = matrixValue(diagnosis, "current_cta") || "Missing CTA";
  return {
    staticLedgerActive: true,
    collision: buildVerbatimCollision(diagnosis),
    coherenceRead: ledger,
    commercialPanel: {
      label: "Static extraction ledger",
      headline: synthesisGuardrailNotice,
      body: "The natural language engine triggered a quality guardrail. Cognix is showing verified evidence instead of unsupported prose."
    },
    rewritePanel: {
      instead: matrixValue(diagnosis, "current_headline") || matrixValue(diagnosis, "public_dilution") || "Missing buyer-facing execution signal",
      sayThis: "No rewrite generated until Cognix can bind the recommendation to source evidence.",
      why: "Static extraction ledger active.",
      logicTracking: "No rewrite was generated because the synthesis guardrail requires extracted source phrases for every recommendation."
    },
    ctaPanel: {
      isStrong: false,
      instead: cta,
      sayThis: "No CTA rewrite generated until Cognix can bind the recommendation to source evidence.",
      why: "Static extraction ledger active.",
      logicTracking: `Current CTA evidence: ${sourcePhraseForLogic(cta)}. No replacement was generated without enough supporting buyer pressure, proof, or commercial stake.`
    },
    resourceBrief: ledger
  };
}

function buildStaticExtractionLedgerText(diagnosis) {
  const buyer = matrixValue(diagnosis, "buyer") || "Not detected";
  const commercialLines = formattedCommercialKpis(diagnosis).map((item) => `${item.label}: ${item.ledgerValue || item.value}`);
  const upstream = matrixSourcePhrase(diagnosis, "internal_strategic_insight") || matrixValue(diagnosis, "internal_strategic_insight") || "Missing upstream signal";
  const downstream = matrixSourcePhrase(diagnosis, "public_dilution") || matrixValue(diagnosis, "public_dilution") || matrixSourcePhrase(diagnosis, "current_headline") || "Missing downstream signal";
  const cta = matrixValue(diagnosis, "current_cta") || "Missing CTA";
  const proof = matrixValue(diagnosis, "proof_signal") || "Missing proof";
  return [
    `[${synthesisGuardrailNotice}]`,
    "",
    "The natural language engine triggered a quality guardrail. To preserve trust, Cognix is showing the verified evidence trail instead of generating unsupported prose.",
    "",
    `Target buyer detected: ${buyer}`,
    "Target commercial KPI:",
    ...(commercialLines.length ? commercialLines : ["Not detected"]),
    `Internal strategy signal: "${trimCollisionPhrase(upstream)}"`,
    `Buyer-facing execution signal: "${trimCollisionPhrase(downstream)}"`,
    `CTA detected: "${trimCollisionPhrase(cta)}"`,
    `Proof detected: "${trimCollisionPhrase(proof)}"`,
    "",
    "Mismatch detected: The buyer-facing execution does not carry the core nouns, urgency, proof, or commercial stakes found in the internal strategy signal.",
    "",
    "What to add next: Add the missing buyer-facing copy, internal strategy note, proof point, or launch goal so Cognix can compare strategy against execution without guessing."
  ].join("\n");
}

function cleanDirectionConcept(value, fallback, max = 120) {
  const cleaned = cleanConceptPhrase(value, max)
    .replace(/^(Primary buyer|Buyer pain|Value proposition|Launch message|Target buyer|ICP)\s*:\s*/i, "")
    .replace(/\bpMMs\b/g, "PMMs")
    .replace(/\bcognix\b/g, "Cognix")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned && !looksLikeRawDump(cleaned) ? stripTerminalPunctuation(cleaned) : fallback;
}

function lowerDirectionConcept(value, fallback) {
  const cleaned = cleanDirectionConcept(value, fallback);
  if (/^(PMMs|CSMs|ICP|CTA|GTM|AI)\b/.test(cleaned)) return cleaned;
  return normalizeAcronyms(cleaned.charAt(0).toLowerCase() + cleaned.slice(1));
}

function lowerDisplayPhrase(value, fallback) {
  const cleaned = cleanSentencePhrase(value) || fallback;
  if (/^(PMMs|CSMs|ICP|CTA|GTM|AI)\b/.test(cleaned)) return normalizeAcronyms(cleaned);
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
    `${foundationLine} Cognix reads this launch at ${diagnostic.predictabilityScore}% Launch Predictability, with a ${diagnostic.verdict}. The score measures whether the GTM story is likely to create qualified demand; it is not a revenue forecast. The executive question is whether the launch will create qualified pipeline, not just awareness. Decision line: ${decision}`,
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
  const scoreRead = buildLaunchPredictabilityRead(diagnosis);
  const exposure = buildCommercialExposure(diagnosis);
  const primaryAction = primaryActionBeforeLaunch(diagnosis);
  const summary = [
    `Launch audited: ${detectAuditedLaunch(diagnosis)}`,
    `Launch Predictability Score: ${diagnosis.predictabilityScore}%`,
    `Readiness band: ${scoreRead.readinessBand}`,
    `Executive decision: ${scoreRead.executiveDecision}`,
    `KPI at risk: ${exposure.kpiAtRisk}`,
    `Estimated exposure: ${exposure.estimatedExposure}`,
    `Missing numbers: ${exposure.missingNumbers.join(", ")}`,
    `Measurement plan: ${exposure.measurementPlan.join(", ")}`,
    `Primary drag: ${scoreRead.primaryDrag}`,
    `Commercial read: ${architecture.commercialPanel.headline}`,
    `Primary rewrite: ${architecture.rewritePanel?.sayThis || "No rewrite generated"}`,
    `CTA action: ${architecture.ctaPanel?.sayThis || "No CTA action generated"}`,
    `Next PMM action: ${primaryAction}`
  ];
  return summary;
}

function compareWithPreviousAudit(diagnostic) {
  const previous = readPreviousAudit();
  const currentProduct = detectAuditedLaunch(diagnostic);
  if (!previous) {
    return {
      hasPrevious: false,
      movementLabel: "First completed read in this session",
      improved: [],
      holdingBack: [],
      newRisks: []
    };
  }
  if (previous.product && currentProduct && previous.product !== currentProduct) {
    return {
      hasPrevious: false,
      movementLabel: "First completed read for this launch",
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
  return `${delta > 0 ? "+" : ""}${delta} points since previous read`;
}

function buildImprovementNotes(resolved, diagnostic) {
  const notes = resolved.map((title) => `${title} appears resolved in this read.`);
  if (diagnostic.has.strongCta && !diagnostic.has.passiveCta) notes.push("CTA now supports a clearer demo-intent or risk readout request.");
  if (diagnostic.has.buyerPain && !diagnostic.has.weakBuyerPain) notes.push("Buyer pain is more urgent.");
  if (diagnostic.has.competitiveClarity && diagnostic.has.competitive) notes.push("Competitive differentiation is stronger.");
  if (diagnostic.has.proof && !diagnostic.has.proofGap) notes.push("Proof or validation signal improved.");
  if (diagnostic.predictabilityScore >= 60) notes.push("Demo-intent framing is stronger.");
  return unique(notes).slice(0, 4);
}

function buildHoldingBackNotes(remaining, diagnostic) {
  const notes = remaining.map((title) => holdingBackSentence(title));
  if (!diagnostic.has.proof || diagnostic.has.proofGap) notes.push("Proof is still early or qualitative.");
  if (diagnostic.has.proof && !diagnostic.has.quantifiedProof) notes.push("More quantified customer evidence would improve predictability.");
  if (diagnostic.has.objections) notes.push("Objections are visible but not fully addressed.");
  if (!diagnostic.has.strongCta || diagnostic.has.passiveCta) notes.push("The CTA still needs a stronger conversion path.");
  if (diagnostic.has.weakBuyerPain || !diagnostic.has.urgency) notes.push("Buyer urgency could be tied more directly to pipeline, cost, time, or decision risk.");
  if (diagnostic.coverage.count >= 3 && diagnostic.coverage.count <= 6) notes.push(`Score improved, but predictability is capped because only ${diagnostic.coverage.count} of ${diagnostic.coverage.total} signal areas were provided.`);
  return unique(notes).slice(0, 5);
}

function holdingBackSentence(title) {
  const value = String(title || "");
  const map = {
    "Proof is strong but CTA and conversion path are weak": "CTA and conversion path remain the biggest drag on GTM story strength.",
    "Passive CTA": "The CTA remains too passive to convert buyer interest into a qualified next step.",
    "Proof gap may weaken late-stage demo conversion": "Proof depth remains the biggest risk to late-stage buyer confidence.",
    "Proof exists but is not placed early enough on the page": "Proof placement is still weakening the conversion path.",
    "Generic AI/workflow automation positioning weakens operations buyer urgency": "Operations urgency is still diluted by generic workflow-automation framing.",
    "Generic AI positioning weakens CMO-level demo intent": "Generic AI framing is still weakening demo intent.",
    "Public-facing message does not carry the internal strategy": "The public-facing message still does not carry the internal strategic insight.",
    "Weak buyer pain": "Buyer pain still needs sharper business consequence.",
    "Unquantified buyer pain": "Buyer pain still needs stronger quantification.",
    "Weak sales conversion path": "Sales follow-up still needs a clearer conversion path."
  };
  return map[value] || `${value.replace(/\.$/, "")} remains a drag on GTM story strength.`;
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

function extractDomainStrategicInsight(product, domainId, text) {
  const name = normalizeAcronyms(product || "");
  const value = String(text || "");
  if (!name || name === "this launch" || name === "the launch") return null;
  if (domainId === "sales" && /forecast calls?|deals? (?:that )?(?:will )?slip|slipping deals?|forecast risk/i.test(value)) {
    return { value: `${name} helps sales leaders and RevOps teams find deals that will slip before the forecast call.`, source_phrase: "Find the deals that will slip before your forecast call." };
  }
  if (domainId === "revops" && /pipeline reviews?|numbers nobody trusts|forecast confidence|pipeline trust/i.test(value)) {
    return { value: `${name} helps revenue teams walk into pipeline reviews with a version of truth everyone can trust.`, source_phrase: "walk into pipeline reviews with a version of truth everyone can trust" };
  }
  if (domainId === "cs" && /renewal|churn|health score|customer health|qbr|adoption/i.test(value)) {
    return { value: `${name} helps CS teams find renewal risks their health score missed.`, source_phrase: "Find the renewal risks your health score missed." };
  }
  if (domainId === "finance" && /invoice|exception|month-end|month end|ap teams?|payment|close/i.test(value)) {
    return { value: `${name} helps finance and AP teams find invoice exceptions before they become month-end backlog.`, source_phrase: "Find invoice exceptions before they become month-end backlog." };
  }
  if (domainId === "operations" && /workflow|handoff|handoffs|bottleneck|approval|ownership/i.test(value)) {
    return { value: `${name} helps operations teams find the handoff slowing down their workflow.`, source_phrase: "Find the handoff that is slowing down your workflow." };
  }
  return null;
}

function unsafeInternalInsightForDomain(value, domainId) {
  const text = String(value || "").toLowerCase();
  if (!text) return true;
  if (/\b(homepage|headline|page copy|current cta|commercial assumptions|launch budget|average contract value|launch goal|best demo moment)\b/.test(text)) return true;
  if (isIcpSignal(text) || isPmmConcernSignal(text) || isCommercialOnlyPhrase(text)) return true;
  if (domainId === "sales" && !/forecast|deal|slip|pipeline|revops|sales/i.test(text)) return true;
  if (domainId === "cs" && !/renewal|churn|health score|customer|cs|account/i.test(text)) return true;
  if (domainId === "finance" && !/invoice|exception|month-end|ap|finance|payment|close/i.test(text)) return true;
  if (domainId === "operations" && !/workflow|handoff|bottleneck|operations|approval|ownership/i.test(text)) return true;
  return false;
}

function rememberCompletedAudit(diagnostic) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(previousAuditStorageKey, JSON.stringify({
      product: detectAuditedLaunch(diagnostic),
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

function buildPausedDiagnosis(coverage, diagnostic = null, trustGate = null) {
  const count = coverage.count;
  const signalCoverage = {
    label: "Low",
    note: `${count} of 3 required signals complete. ${count} of ${coverage.total} total launch signal areas detected.`
  };
  const causalDiagnosis = trustGate?.reason === "insufficient_strategy_baseline"
    ? "Cognix can read the buyer-facing copy and CTA, but it needs an upstream strategy baseline and buyer pressure to compare strategy against execution."
    : `Cognix does not yet detect enough strategic signal to confirm launch readiness. You have added ${count} of 3 required signals so far.`;
  const actions = [
    "Add at least 3 meaningful launch signal areas.",
    "Re-run GTM fracture detection once at least 3 signal areas are populated."
  ];
  const missingSet = new Set(coverage.missing);
  const nextSignals = trustGate?.reason === "insufficient_strategy_baseline"
    ? ["Internal strategy note", "Buyer pain or ICP", "Proof, sales feedback, or launch goal"]
    : [
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
  const foundAreas = buildPausedFoundSignals(diagnostic, coverage);
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
      title: "Executive alignment note",
      body: "Unlocks once Cognix can generate a reliable receipt-backed read."
    }
  ];

  return {
    paused: true,
    mode: state.launchMode,
    riskScore: null,
    riskLabel: "Undetermined",
    signalCoverage,
    signalSorting: diagnostic?.signalSorting || buildSignalSorting(diagnostic?.signals || collectMeaningfulSignals(), diagnostic?.allText || ""),
    coverage,
    sharedAreas: foundAreas,
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
    commercialImplication: "Awaiting enough launch context to estimate commercial risk.",
    beforeMessage: "Awaiting launch context.",
    afterMessage: "Awaiting launch context. Add more signal coverage to unlock message direction.",
    memo: "",
    coreSentence: causalDiagnosis,
    kpiDrivers: []
  };
}

function buildPausedFoundSignals(diagnostic, coverage) {
  if (!diagnostic) return coverage.presentTitles || [];
  const found = [];
  const headline = diagnostic.strategicMatrix?.public_dilution?.value || diagnostic.strategicMatrix?.current_headline?.value;
  const cta = diagnostic.strategicMatrix?.current_cta?.value;
  if (headline) found.push(`Buyer-facing copy: ${headline}`);
  if (cta) found.push(`CTA: ${cta}`);
  if (!found.length) return coverage.presentTitles || [];
  return found;
}

function buildSignalFlags(signals, allText) {
  const area = (id) => signals.some((signal) => signal.id === id && isMeaningfulSignalText(signal.text));
  const rawCampaignText = signals.find((signal) => signal.id === "campaign-copy")?.text || "";
  const rawCtaText = signals.find((signal) => signal.id === "cta")?.text || rawCampaignText;
  const ctaText = (extractCurrentCtaPhrase(rawCtaText) || rawCtaText).toLowerCase();
  const painText = signals.find((signal) => signal.id === "buyer-pain")?.text.toLowerCase() || "";
  const buyerText = signals.find((signal) => signal.id === "target-buyer")?.text.toLowerCase() || "";
  const messageText = signals.find((signal) => signal.id === "launch-message")?.text.toLowerCase() || "";
  const valueText = signals.find((signal) => signal.id === "value-prop")?.text.toLowerCase() || "";
  const campaignText = rawCampaignText.toLowerCase();
  const objectionText = [
    signals.find((signal) => signal.id === "objections")?.text || "",
    signals.find((signal) => signal.id === "sales-talk-track")?.text || "",
    signals.find((signal) => signal.id === "sales-feedback")?.text || ""
  ].join("\n").toLowerCase();
  const explicitDemoCta = hasAny(ctaText, ["request a demo", "book a demo", "schedule a demo", "contact sales", "talk to sales", "diagnose", "assess", "request a review", "book a review", "risk review", "workflow review", "approvals workflow review", "schedule a launch review", "pressure-test", "find hidden", "hidden renewal risk", "see your hidden", "see where pipeline is exposed", "see where approvals get stuck", "identify risk", "identify hidden churn risk", "request an audit", "request a launch conversion audit", "run a launch conversion audit", "get your first audit free", "start free audit", "launch conversion audit"]);
  const passivePrimaryCta = hasAny(ctaText, ["primary cta is learn more", "primary cta: learn more", "cta is learn more"]);
  const meaning = interpretMeaning(allText);
  const hasObjectionSignal = area("objections") || meaning.whyNowObjection || hasAny(objectionText || allText, ["objection", "already", "budget", "pricing", "package", "not urgent", "why now", "later", "next quarter"]);
  const addressedObjection = hasObjectionSignal && hasAny(objectionText, ["response", "respond", "answer", "rebuttal", "faq", "we answer", "we handle", "we explain", "explain", "explains", "because", "proof", "talk track", "if prospects say", "no."]);
  const competitiveClarity = !meaning.competitorOwnsPain && (!area("competitive-framing") || hasAny(allText, ["unlike", "different", "why us", "criteria", "better than", "not a", "not another", "replacement", "does not replace", "interprets", "shows the handoff risks", "threaten qualified demand"]));
  const clearIcp = area("target-buyer") || hasAny(allText, ["revops leaders", "pmm", "product marketing", "demand generation", "gtm leaders", "operations leaders", "sales leaders", "finance leaders", "cs leaders", "series b", "series c", "vp cs", "customer success", "ap directors", "finance operations", "cfo", "finance leaders", "ciso", "compliance leaders"]);
  const clearValueProp = area("value-prop") || hasAny(allText, ["helps", "protect", "reduce", "increase", "identify", "fix", "prevent"]);
  const salesSupport = area("sales-talk-track") || area("sales-feedback") || addressedObjection;
  const proofText = signals.find((signal) => signal.id === "customer-proof")?.text.toLowerCase() || "";
  const lightProofCaveat = hasPattern(allText, [
    /\bfeature adoption\b/i,
    /\bonboarding analytics\b/i,
    /\bexisting customers?\b/i,
    /\bwatch product walkthrough\b/i
  ]) && hasPattern(proofText, [
    /\breduced onboarding escalations by \d+/i,
    /\bproduct analytics shows drop-off reporting\b/i,
    /\bno revenue proof yet\b/i
  ]);
  const explicitProofConcern = !lightProofCaveat && hasPattern(`${proofText}\n${objectionText}\n${allText}`, [
    /\bbuyers? ask(?:s)? for proof\b/i,
    /\bproof (?:is )?(?:missing|not approved|not ready|unavailable|weak)\b/i,
    /\bno customer proof\b/i,
    /\bno customer metric\b/i,
    /\bno metric\b/i,
    /\bno case study\b/i,
    /\bproof does not support the claim\b/i,
    /\benterprise buyers? need evidence\b/i,
    /\bsales needs? customer examples\b/i,
    /\bask for proof that\b/i
  ]);
  const explicitNoProof = !lightProofCaveat && hasPattern(proofText, [
    /\bno customer proof\b/,
    /\bno (?!quantified\b)[a-z]+ proof\b/,
    /\bno proof\b/,
    /\bproof (is )?(not ready|missing|unavailable)\b/,
    /\bwithout customer proof\b/,
    /\bproof (?:is )?not approved\b/,
    /\bno customer metric\b/,
    /\bno case study\b/
  ]);
  const proofPresent = !explicitNoProof && (area("customer-proof") || hasAny(allText, ["customer", "quote", "case study", "proof", "testimonial", "validation", "beta", "metric", "%", "result", "saved", "reduced", "increased"]));
  const quantifiedProof = /[%$]|\b\d+(?:\.\d+)?(?:\s*(?:hours?|days?|weeks?))?\b|\b(saved|reduced|increased|case study)\b/i.test(proofText);
  const proofNeedsQuantification = proofPresent && !quantifiedProof;
  const aiMessageInconsistency = hasAny(allText, ["chatgpt", "claude", "gemini", "copilot", "ai-generated", "ai generated"]) && hasAny(allText, ["scattered", "inconsistent", "fragmented", "misalignment", "notion", "slack", "shared interpretation"]);
  const categoryAbstraction = hasAny(allText, ["cognitive layer", "gtm cognition", "ai-era", "ai era", "platform", "architecture", "category"]) && !meaning.urgency && !hasAny(allText, ["not a cs platform replacement", "not a dashboard", "platform replacement"]);
  const quantifiedPain = /[%$]|\b\d+(?:\.\d+)?(?:\s*(?:hours?|days?|weeks?))?\b|\b(cost|revenue|pipeline impact|lost pipeline|time saved|risk reduction)\b/i.test(painText);
  const specificOperationalPain = hasAny(`${painText}\n${messageText}\n${campaignText}\n${objectionText}`, ["salesforce", "gong", "clari", "attribution", "spreadsheets", "pipeline reviews", "which number leadership should trust", "what action the gtm team should take", "churn risk", "adoption has already dropped", "executive sponsors", "renewal conversations", "expansion revenue", "customer risk", "renewal risk", "invoice exceptions", "backlog", "manual resolution", "stuck approvals", "workflow delays", "ownership gaps", "approval cycle", "approval cycles"]);
  const genericPain = hasAny(painText, ["manual work", "disconnected processes", "too much time", "move faster", "productivity"]) && !hasAny(painText, ["cost", "expensive", "revenue", "pipeline", "arr", "risk", "audit", "delay", "lost", "wasted budget"]);
  const publicCopy = campaignText || messageText;
  const buyerFacingPageCopy = isMeaningfulSignalText(campaignText) ? campaignText : publicCopy;
  const publicMeaning = interpretMeaning(publicCopy);
  const revopsPipelineReview = /\brevops\b/i.test(allText) && /\bpipeline reviews?|forecast confidence|salesforce|gong|clari|numbers nobody trusts\b/i.test(allText) && !/\bcmo\b/i.test(allText);
  const dealForecastRisk = /\bdealpulse\b|\bforecast calls?\b|\bdeals? (?:that )?(?:will )?slip|\bslipping deals?\b|\bforecast risk\b/i.test(allText) && !/\bcmo\b/i.test(allText);
  const genericAiPositioning = hasPattern(publicCopy, [
    /\bai-powered launch intelligence\b/,
    /\bai-powered revenue intelligence\b/,
    /\bai-powered deal intelligence\b/,
    /\bai-powered customer health intelligence\b/,
    /\bai-powered invoice intelligence\b/,
    /\bai workflow automation\b/,
    /\bai-powered workflow intelligence\b/,
    /\blaunch with confidence\b/,
    /\bmodern gtm teams?\b/,
    /\bmove faster\b/,
    /\bsmarter decisions?\b/,
    /\bai-powered\b.*\b(platform|intelligence|solution)\b/,
    /\bmodern\b.*\bplatform\b/
  ]);
  const renewalOutcome = hasAny(allText, ["renewal risk", "hidden renewal", "churn", "expansion pipeline", "customer risk", "renewal-risk"]);
  const pipelineOutcome = hasAny(allText, ["pipeline review", "forecast risk", "forecast confidence", "qualified pipeline", "pipeline risk", "launch-to-pipeline", "launch to pipeline"]);
  const financeOutcome = hasAny(allText, ["invoice exception", "month-end", "ap exception", "finance leaders", "payment risk"]);
  const workflowOutcome = hasAny(allText, ["handoff", "approval", "workflow", "ownership gaps", "bottleneck"]);
  const alignedOutcome = renewalOutcome || pipelineOutcome || financeOutcome || workflowOutcome;
  const alignedBuyerActionCta = hasAny(ctaText, [
    "book a demo",
    "request a demo",
    "schedule a demo",
    "request a review",
    "book a review",
    "risk review",
    "workflow review",
    "approvals workflow review",
    "renewal-risk review",
    "renewal risk review",
    "assess risk",
    "schedule a launch review",
    "see where pipeline is exposed",
    "identify hidden churn risk",
    "find hidden renewal risk",
    "catch renewal risk",
    "pressure-test",
    "find invoice exception",
    "see where approvals get stuck"
  ]);
  const educationalCta = hasAny(ctaText, ["download", "guide", "ebook", "whitepaper", "learn more", "read the guide"]);
  const launchGoalWantsDemo = hasAny(allText, ["book enterprise demos", "book renewal-risk demos", "demo target", "demo requests", "qualified demos", "qualified pipeline", "launch-to-pipeline"]);
  const ctaLaunchGoalMismatch = launchGoalWantsDemo && educationalCta && !alignedBuyerActionCta;
  const semanticAlignment = alignedOutcome && alignedBuyerActionCta && clearIcp && (meaning.buyerPain || specificOperationalPain) && clearValueProp;
  const riskPain = hasAny(allText, ["budget risk", "launch risk", "pipeline risk", "qualified pipeline", "arr", "roi", "investment", "demo conversion"]);
  const plainDemoCta = hasAny(ctaText, ["book a demo", "request a demo", "schedule a demo"]);
  let genericDemoCtaForRisk = plainDemoCta && riskPain && !semanticAlignment && !hasAny(ctaText, ["risk", "pipeline", "launch", "budget", "audit", "diagnos"]);
  const cfoBuyer = /\bcfos?\b|chief financial|finance leaders?\b/.test(buyerText);
  const publicSpeaksFinanceControl = /\bcfos?\b|finance|financial control|margin|forecast|forecast accuracy|spend leakage|budget leakage|vendor sprawl|spend visibility|procurement|departmental forecasts?|approval visibility\b/i.test(publicCopy);
  const genericTeamProductivityCopy = /\b(work smarter|every team|collaborate|productivity|intelligent workspace|automate tasks|workflow automation|cross-functional workflows?|business workflows?)\b/i.test(publicCopy);
  const executivePmmMismatch = !genericAiPositioning && /\bcmo|chief marketing|executive|board\b/.test(buyerText) && /\bpmm|product marketing|productivity|workflow|templates?|drafts?|launch checklist/i.test(publicCopy) && !/\bcmo|pipeline|arr|budget|roi|commercial\b/.test(publicCopy);
  const buyerMessageMismatch = executivePmmMismatch || (cfoBuyer && genericTeamProductivityCopy && !publicSpeaksFinanceControl);
  const commercialStakesPresent = /(?:\$|USD\s*)\s?\d|arr|investment|budget|pipeline value|revenue influence|launch spend|media spend/i.test(allText);
  genericDemoCtaForRisk = genericDemoCtaForRisk || (plainDemoCta && commercialStakesPresent && !semanticAlignment && !hasAny(ctaText, ["risk", "pipeline", "launch", "budget", "audit", "diagnos"]));
  const commercialStakesInPublicCopy = /(?:\$|USD\s*)\s?\d|arr|investment|budget|pipeline value|revenue influence|launch spend|media spend|roi/i.test(publicCopy);
  const commercialStakesMissingFromPage = commercialStakesPresent && !commercialStakesInPublicCopy && !semanticAlignment;
  const proofInPublicCopy = /beta customer|customer proof|customer quote|case study|testimonial|validation|result|saved|reduced|increased|improved|beta team|\d+(?:\.\d+)?%/.test(campaignText || messageText);
  const proofBuriedMissingPublic = proofPresent && !proofInPublicCopy && !semanticAlignment && !hasAny(campaignText, ["trusted", "trust", "risk", "review", "renewal", "audit", "exception", "backlog", "evidence gap"]);
  const categoryReachedMarketSurface = hasFounderCategoryPressure(publicCopy);
  const leadershipCategoryPressure = hasPattern(allText, [
    /\b(?:founder|ceo|leadership)\b.*\b(?:wants|push|pull|override|category leadership|sound bigger|not a cs tool|not tactical)\b/,
    /\bcategory language hides\b/
  ]);
  const founderNarrativeOverride = hasFounderCategoryPressure(allText) && (categoryReachedMarketSurface || leadershipCategoryPressure) && (hasPracticalBuyerRealityPull(allText) || salesSupport || isPmmConcernSignal(allText));
  const pricingTrustRisk = hasPattern(allText, [
    /\bpricing\b.*\b(?:usage-based|packaging|billing|surprise bills?|budget predictability)\b/i,
    /\bsurprise bills?\b/i,
    /\bbilling confusion\b/i,
    /\bmonetization\b.*\btrust\b/i
  ]);
  const platformWedgeConflict = hasPattern(allText, [
    /\bthree simultaneous launches\b/i,
    /\bplatform story\b/i,
    /\bmodule-level pain\b/i,
    /\bone ai platform\b/i,
    /\bplatform repositioning\b/i,
    /\bsales wants one focused wedge\b/i
  ]);
  const churnExpansionSplit = hasPattern(allText, [
    /\bexpansion revenue\b.*\b(?:churn|retention)\b/i,
    /\bchurn prevention\b.*\bexpansion\b/i,
    /\bno expansion revenue proof\b/i,
    /\bbenchmark report is not ready\b/i
  ]);
  const securityComplianceSplit = hasPattern(allText, [
    /\benterprise security\b/i,
    /\bcompliance risk\b/i,
    /\baudit exposure\b/i,
    /\baudit-log proof\b/i,
    /\binnovation-focused\b/i
  ]);
  const weakPipelineConnection = hasAny(allText, ["awareness", "activity", "traffic", "launch activity", "engagement"]) && !hasAny(publicCopy, ["qualified pipeline", "qualified demand", "demo conversion", "pipeline quality", "sales accepted", "arr"]);
  const competitiveText = signals.find((signal) => signal.id === "competitive-framing")?.text.toLowerCase() || "";
  const internalStrategyText = `${messageText}\n${painText}\n${valueText}\n${objectionText}\n${competitiveText}\n${proofText}`;
  const internalHasSharpStrategy = hasAny(internalStrategyText, ["internal launch strategy", "audit delays", "last-minute evidence", "last-minute evidence gaps", "missing evidence", "control gaps", "audit readiness", "audit readiness gaps", "audit review", "formal review", "expensive audit", "pre-audit intelligence", "delayed soc 2", "reduce audit preparation"]);
  const publicCarriesSharpStrategy = hasAny(buyerFacingPageCopy, ["audit delays", "last-minute evidence gaps", "evidence gaps", "missing evidence", "control gaps", "audit readiness gaps", "audit review", "formal review", "expensive audit", "pass audits faster", "pre-audit intelligence", "delayed soc 2", "qualified demos", "qualified pipeline", "pipeline risk", "budget risk"]);
  const internalStrategyMissingPublic = internalHasSharpStrategy && !publicCarriesSharpStrategy;
  const passiveCta = passivePrimaryCta || ctaLaunchGoalMismatch || (!explicitDemoCta && (meaning.passiveCta || hasAny(ctaText, ["learn more", "read more", "explore", "see more", "start your free trial", "free trial"])));
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
  const proofMayWeakenLateStageConversion = !genericAiPositioning && proofPresent && proofNeedsQuantification && clearIcp && (meaning.buyerPain || specificOperationalPain) && explicitDemoCta && competitiveClarity;
  const strongProofWeakConversionPath = quantifiedProof && clearIcp && (meaning.buyerPain || specificOperationalPain) && passiveCta && hasAny(allText, ["qualified demos", "demo requests", "qualified pipeline"]);
  const contradictoryBroadPositioning = hasPattern(allText, [
    /positioning.*(too broad|broad|generic|unclear)/,
    /too broad.*(positioning|message|copy)/,
    /message.*(too broad|generic|not specific)/
  ]);
  const salesObjectionConflict = hasPattern(objectionText, [
    /\bbuyers? (?:do not|don't|cannot|can't) understand what (?:this|it) solves\b/i,
    /\b(?:reps?|aes?|sales) (?:say|says|said).*(?:story|message|positioning).*(?:not landing|does not land|doesn't land)\b/i,
    /\bsales (?:is )?leading with different language\b/i,
    /\bcalls? show (?:a )?different pain than (?:the )?homepage\b/i,
    /\bobjections? contradict(?:s)? (?:the )?campaign story\b/i,
    /\bbuyers? ask ["']?why (?:now|this)["']?/i,
    /\bwe do not need another dashboard\b/i
  ]);
  const alignedLaunch = semanticAlignment
    && !salesObjectionConflict
    && !explicitProofConcern
    && !proofNeedsQuantification
    && !founderNarrativeOverride
    && !buyerMessageMismatch
    && !passiveCta
    && !genericAiPositioning
    && !contradictoryBroadPositioning;
  return {
    launchMessage: area("launch-message") || area("campaign-copy"),
    buyerPain: meaning.buyerPain || hasAny(allText, ["pain", "problem", "manual", "slow", "risk", "cost", "broken", "missed", "confusion", "struggle", "handoff", "stalled"]),
    weakBuyerPain: (!meaning.buyerPain && meaning.weakBuyerPain) || genericPain,
    unquantifiedBuyerPain: (meaning.buyerPain || genericPain || hasAny(painText, ["pain", "problem", "risk", "struggle", "short on", "not short", "scattered", "misalignment"])) && !quantifiedPain && !specificOperationalPain,
    urgency: meaning.urgency || hasAny(allText, ["urgent", "urgency", "now", "this quarter", "deadline", "delay", "wait", "too late", "before", "risk", "why now", "planning cycle"]),
    strongCta: explicitDemoCta && !passivePrimaryCta,
    passiveCta,
    ctaCouldBeSharper: explicitDemoCta && !hasAny(ctaText, ["request a demo", "book a demo", "schedule a demo", "contact sales", "talk to sales", "diagnose", "pressure-test", "find hidden", "hidden renewal risk", "risk", "pipeline", "budget", "audit"]),
    alignedBuyerAction: semanticAlignment,
    alignedLaunch,
    ctaLaunchGoalMismatch,
    proof: proofPresent,
    quantifiedProof,
    quantifiedImpact: /[%$]|\b\d+(?:\.\d+)?(?:\s*(?:hours?|days?|weeks?))?\b|\b(revenue|cost|roi|pipeline impact|lost pipeline|time saved|risk reduction)\b/i.test(allText),
    salesSignal: area("sales-talk-track") || area("sales-feedback") || area("objections") || meaning.salesConfusion || hasAny(allText, ["sales", "rep", "ae", "field", "prospect", "discovery", "talk track", "objection"]),
    weakSalesPath: meaning.salesConfusion && !salesObjectionConflict,
    salesObjectionConflict,
    competitive: area("competitive-framing") || area("competitive-feedback") || meaning.competitorOwnsPain || hasAny(allText, ["competitor", "competitive", "alternative", "versus", "vs", "battlecard"]),
    competitorOwnsPain: meaning.competitorOwnsPain,
    aiMessageInconsistency,
    categoryAbstraction,
    genericAiPositioning,
    founderNarrativeOverride,
    revopsPipelineReview,
    dealForecastRisk,
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
    proofGap: explicitNoProof || explicitProofConcern || (!proofPresent && meaning.proofGap),
    explicitProofGap: explicitProofConcern || explicitNoProof,
    lightProofCaveat,
    pricingTrustRisk,
    platformWedgeConflict,
    churnExpansionSplit,
    securityComplianceSplit,
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
  addFracture(fractures, has.lightProofCaveat, "Light proof caveat", "The launch story is directionally aligned for an existing-customer adoption motion; the remaining issue is claim precision, not a major GTM fracture.", "Proceed with the adoption-focused story, add a proof caveat, and recheck only before broader campaign scale.", ["onboarding analytics", "feature adoption", "product walkthrough", "reduced onboarding escalations"]);
  addFracture(fractures, has.pricingTrustRisk, "Pricing trust risk", "The pricing launch has monetization upside, but customer trust, billing clarity, and churn-risk objections are not yet resolved.", "Clarify pricing value, billing predictability, customer risk, and Sales/CS objection handling before rollout.", ["pricing", "usage-based", "surprise bills", "budget predictability", "billing confusion"]);
  addFracture(fractures, has.platformWedgeConflict, "Platform narrative outruns module proof", "The platform story is larger than the proof and sales motion available for each module, creating architecture and pipeline-priority risk.", "Decide whether to launch one platform story or sequence wedge-led motions with module-specific proof and talk tracks.", ["platform story", "module-level pain", "one AI platform", "focused wedge", "platform repositioning"]);
  addFracture(fractures, has.churnExpansionSplit, "Expansion story conflicts with churn proof", "Campaign and demand gen are pushing expansion revenue while proof and Sales reality support churn prevention and retention pressure.", "Resolve the churn vs expansion narrative before spend scales, then align ads, CTA, proof, and enablement to the approved angle.", ["expansion revenue", "churn", "retention", "benchmark report", "18% reduction"]);
  addFracture(fractures, has.securityComplianceSplit, "Innovation narrative competes with compliance urgency", "The launch wants broad AI innovation language, but enterprise buyers and Sales evidence point to compliance risk, audit exposure, and AI-usage visibility.", "Escalate a decision on innovation narrative vs compliance pipeline, then validate proof with Product/Security and Sales Enablement.", ["compliance risk", "audit exposure", "audit-log", "security", "innovation"]);
  addFracture(fractures, has.salesObjectionConflict, "Sales objection conflicts with launch story", "Sales reality explicitly contradicts the story buyers see on the homepage, campaign, founder narrative, or category frame.", "Rewrite the homepage hero, campaign angle, and sales talk track around the objection buyers are actually voicing; give reps the exact response before spend scales.", ["buyers do not understand", "sales says", "not landing", "different language", "We do not need another dashboard", "why now", "why this", "prospects ask"]);
  addFracture(fractures, has.explicitProofGap, "Proof gap blocks buyer trust", "The launch promises business impact, but explicit input says proof is missing, not approved, unsupported, or needed by buyers before they will trust the claim.", proofGapActionForScenario(allText), ["buyers ask for proof", "proof is missing", "proof not approved", "No customer metric", "no case study", "sales needs customer examples", "enterprise buyers need evidence"]);
  addFracture(fractures, has.founderNarrativeOverride, "Founder narrative override", "Founder/CEO direction is pulling the launch toward abstract category language while sales, PMM, or customer proof points to concrete buyer pain.", "Re-anchor the launch on the practical buyer pain before using category language in the headline, CTA, sales talk track, or leadership memo.", ["founder", "ceo", "ai operating system", "operating layer", "infrastructure", "platform for every team", "category leadership", "sound bigger", "not a cs tool", "not tactical", "customer quote", "renewal risk", "churn", "sales says", "pmm"]);
  addFracture(fractures, has.launchMotionActivityWeakConversion, "Launch motion creates activity but not qualified demo intent", "The launch has channels and activity targets, but weak buyer pain, weak proof, and a generic CTA make it unlikely to convert attention into qualified pipeline.", "Anchor the launch on the specific buyer pain, add credible proof, and replace the generic CTA with a qualified demo-intent action.", ["impressions", "landing page visits", "learn more", "no customer proof", "manual work", "demo requests"]);
  addFracture(fractures, has.strongProofWeakConversionPath, "Proof is strong but CTA and conversion path are weak", "The launch has credible proof and clear buyer pain, but the CTA fails to translate interest into the next buyer action.", "Change the CTA from passive education to a specific risk readout or demo offer tied to the proven business result.", ["52%", "38%", "420", "learn more", "see how it works", "qualified demos"]);
  addFracture(fractures, has.proofMayWeakenLateStageConversion, "Proof gap may weaken late-stage demo conversion", "The launch has a strong ICP, clear pain, and a specific CTA, but quantified proof is still thin enough to create buyer belief risk late in the demo journey.", proofGapActionForScenario(allText), ["founding users", "no quantified", "pilot", "three accounts", "customer proof"]);
  addFracture(fractures, has.internalStrategyMissingPublic, "Public-facing message does not carry the internal strategy", "The team has the right strategic insight internally, but the landing page does not expose the commercial pain, buyer urgency, proof, or differentiated CTA.", "Rewrite the public page so the internal strategy is visible in the headline, proof placement, CTA, and sales follow-up narrative.", ["internal launch strategy", "audit delays", "control gaps", "audit readiness", "book a demo"]);
  addFracture(fractures, has.genericAiPositioning, "Generic AI positioning weakens CMO-level demo intent", genericAiFractureBody(has), genericAiFractureAction(has), ["ai-powered", "revenue intelligence", "launch with confidence", "modern gtm", "move faster", "smarter decisions"]);
  addFracture(fractures, has.featureHeavy && (!has.buyerPain || has.weakBuyerPain || has.weakDemoIntent), "Feature-heavy message", "The launch explains what is shipping before it makes the buyer pain costly.", "Rewrite the headline around buyer pain, not shipped capability.", ["feature", "dashboard", "capability", "shipped", "release", "business problem", "what it does", "mostly explain"]);
  addFracture(fractures, !has.buyerPain || has.weakBuyerPain, "Weak buyer pain", "The signals do not give buyers a sharp enough problem to recognize themselves.", "Add quantified pain that names what breaks when the buyer keeps the current workflow.", ["pain", "problem", "manual", "risk", "cost", "not fully defined", "visibility"]);
  addFracture(fractures, has.unquantifiedBuyerPain, "Unquantified buyer pain", "The buyer pain is visible, but the message does not yet make the cost or urgency concrete enough.", "Quantify the pain with time, pipeline, cost, decision risk, or launch impact.", ["pain", "problem", "risk", "cost", "not quantified", "business impact"]);
  addFracture(fractures, !has.urgency, "Unclear buyer urgency", "The launch does not make a strong case for why a buyer should act now.", "Add urgency proof that explains why buyers should act before launch momentum fades.", ["urgent", "urgency", "now", "wait", "why now", "this quarter"]);
  addFracture(fractures, !has.strongCta || has.passiveCta, "Passive CTA", "The conversion ask is not strong enough to turn launch interest into demo intent.", "Replace passive CTA language with a demo-intent CTA.", ["learn more", "demo", "request", "book", "cta"]);
  addFracture(fractures, has.ctaCouldBeSharper, "CTA is not carrying launch-risk intent", "The CTA gives buyers a next step, but it does not convert the detected launch risk into a qualified demo or readout request.", "Rewrite the CTA around the launch risk the buyer needs to resolve before launch day.", ["audit", "cta", "launch conversion audit", "first audit free"]);
  addFracture(fractures, has.ctaLaunchGoalMismatch || has.genericDemoCtaForRisk || ((has.bookDemoCta || hasAny(allText, ["book a demo", "request a demo", "schedule a demo"])) && has.commercialStakesMissingFromPage), "CTA does not connect to launch budget risk", "The CTA asks for a funnel behavior that does not match the launch goal or commercial risk.", ctaBudgetRiskAction(has), ["book a demo", "request a demo", "download guide", "pipeline risk", "budget risk", "launch risk"]);
  addFracture(fractures, has.buyerMessageMismatch, "Target buyer and message are misaligned", "The selected buyer has financial or executive concerns, but the public message reads like generic team productivity software.", "Rewrite the page around the buyer's financial control, margin protection, forecast accuracy, spend leakage, pipeline, budget, or launch ROI concerns.", ["cfo", "finance", "productivity", "workflow", "spend leakage", "forecast"]);
  addFracture(fractures, has.commercialStakesMissingFromPage, "Commercial stakes are present internally but missing from public-facing message", "Commercial stakes appear in the launch notes, but the buyer-facing copy does not carry them into the buyer narrative.", commercialStakesAction(has), ["arr", "investment", "budget", "pipeline", "revenue"]);
  addFracture(fractures, !has.proof || has.proofGap, "Missing customer proof", "The launch asks buyers to believe the claim without enough proof or quantified pain.", "Add customer proof or quantified pain to the launch page.", ["customer", "proof", "metric", "quote", "result", "no proof"]);
  addFracture(fractures, has.proofBuriedMissingPublic, "Proof exists but is not placed early enough on the page", "Customer proof exists in the inputs, but it is not visible enough in the launch page message to support conversion.", "Move the strongest proof point into the page section closest to the pain and CTA.", ["customer", "proof", "quote", "testimonial", "result"]);
  addFracture(fractures, has.proofNeedsQuantification, "Proof needs quantification", "Customer validation is present, but it needs a metric or concrete result to carry executive trust.", "Quantify customer proof with time saved, pipeline impact, risk reduction, or a specific before-after result.", ["customer", "proof", "quote", "validation", "metric", "result"]);
  addFracture(fractures, has.unclearIcp, "Unclear ICP", "The launch does not clearly choose the buyer most likely to request a demo.", "Name the ICP and the buying trigger.", ["buyer", "icp", "persona", "segment", "role"]);
  addFracture(fractures, !has.salesSignal || has.weakSalesPath, "Weak sales conversion path", "Sales does not yet have a clear path from launch interest to a qualified demo conversation.", "Create a 3-line sales talk track that connects buyer pain, why now, and the demo ask.", ["sales", "rep", "talk track", "discovery", "prospect", "explain"]);
  addFracture(fractures, has.objections, "Unresolved objections", "Buyer pushback is visible and needs an explicit response before reps can convert interest.", "Add an objection response for why now.", ["objection", "already", "budget", "pricing", "why now"]);
  addFracture(fractures, has.competitive && (has.competitorOwnsPain || !has.competitiveClarity), "Competitive differentiation gap", "Competitive pressure is present, but the launch does not clearly change buying criteria.", "Add a why-us contrast that makes the buyer problem and buying criteria sharper than the competitor frame.", ["competitor", "competitive", "alternative", "criteria", "owns the pain"]);
  addFracture(fractures, !has.quantifiedImpact, "Missing quantified business impact", "The launch does not quantify why the problem is expensive enough to prioritize.", "Add customer proof or quantified pain tied to pipeline, time, cost, or revenue impact.", ["pipeline", "revenue", "cost", "roi", "%", "hours"]);
  addFracture(fractures, state.launchMode !== "pre" && has.activityNoIntent, "Launch activity without qualified demand", "The launch created attention, but the signals show demo intent or qualified pipeline did not follow.", "Run a follow-up campaign around the pain, not the feature.", ["click", "traffic", "activity", "flat", "low demo", "not converting"]);
  addFracture(fractures, has.weakPipelineConnection, "Weak connection between launch activity and qualified pipeline", "The launch may create activity or awareness without making the path to qualified pipeline concrete.", weakPipelineAction(has), ["awareness", "activity", "qualified pipeline", "qualified demand", "demo conversion"]);
  addFracture(fractures, has.contradictoryBroadPositioning, "Contradictory evidence flags broad positioning risk", "The launch inputs include warnings that positioning may be too broad, so the risk cannot be treated as low.", "Resolve the broad-positioning concern before using the message in paid or sales-led launch motions.", ["too broad", "generic", "positioning", "message"]);
  addFracture(fractures, has.weakDemoIntent, "Weak demo intent", "The buyer may understand the product without seeing a reason to request a demo.", "Connect the message and CTA to the buying trigger that makes a demo worth booking now.", ["understand", "get what it does", "not asking", "no demos", "demo"]);
  addFracture(fractures, has.aiMessageInconsistency, "AI-generated message inconsistency", "AI-generated GTM inputs are present, but the launch needs a clearer shared interpretation layer.", "Turn scattered AI-generated launch inputs into one buyer-pain story, CTA, proof path, and sales narrative.", ["ai-generated", "chatgpt", "claude", "gemini", "copilot", "shared interpretation", "scattered"]);
  addFracture(fractures, has.categoryAbstraction, "Category abstraction without buyer urgency", "The launch leans on category language before making the buyer urgency concrete.", "Replace category language with the buyer pain, business cost, and source receipt that explain why to act before launch day.", ["cognitive layer", "gtm cognition", "platform", "architecture", "category"]);
  return fractures;
}

function genericAiFractureBody(has) {
  if (has.dealForecastRisk) {
    return "The buyer-facing message leans on generic AI/deal intelligence language before proving why sales leaders and RevOps should care about forecast risk, slipping deals, and pipeline trust.";
  }
  if (has.customerSuccessRenewal) {
    return "The buyer-facing message leans on generic AI/customer health language before proving why CS leaders should care about renewal risk, churn prevention, health-score contradiction, and adoption risk.";
  }
  if (has.financeAp) {
    return "The buyer-facing message leans on generic AI/invoice intelligence language before proving why finance and AP leaders should care about invoice exceptions, month-end backlog, payment risk, and close risk.";
  }
  if (has.operationsWorkflow) {
    return "The buyer-facing message leans on generic AI/workflow automation language before proving why operations leaders should care about handoff bottlenecks, approval leakage, and ownership gaps.";
  }
  return has.revopsPipelineReview
    ? "The buyer-facing message leans on generic AI/revenue intelligence language before proving why RevOps leaders should care about pipeline-review trust, forecast confidence, and cross-system revenue contradiction."
    : "The buyer-facing message leans on generic AI/category language before proving why a CMO should care about pipeline risk.";
}

function genericAiFractureAction(has) {
  if (has.dealForecastRisk) {
    return "Rewrite the buyer-facing message around forecast risk, slipping deals, pipeline trust, forecast-call urgency, sales leadership demo intent, and RevOps/CRO urgency.";
  }
  if (has.customerSuccessRenewal) {
    return "Rewrite the buyer-facing message around renewal risk, churn prevention, health-score contradiction, adoption risk, and CS leader urgency.";
  }
  if (has.financeAp) {
    return "Rewrite the buyer-facing message around invoice exceptions, month-end backlog, AP hours, payment risk, and close risk.";
  }
  if (has.operationsWorkflow) {
    return "Rewrite the buyer-facing message around handoff bottlenecks, workflow delays, approval leakage, ownership gaps, and operations buyer urgency.";
  }
  return has.revopsPipelineReview
    ? "Rewrite the buyer-facing message around pipeline-review trust, RevOps leader urgency, executive-ready revenue decisions, forecast confidence, and the cross-system pipeline contradiction."
    : "Rewrite the buyer-facing message around CMO-level launch risk, qualified pipeline, and commercial stakes.";
}

function commercialStakesAction(has) {
  if (has.dealForecastRisk) {
    return "Move launch budget, ACV, opportunity risk, demo target, or forecast-risk proof closer to the hero and CTA.";
  }
  if (has.customerSuccessRenewal) {
    return "Move launch budget, renewal value, hidden renewal-risk proof, demo target, or churn-prevention evidence closer to the hero and CTA.";
  }
  if (has.financeAp) {
    return "Move launch budget, ACV, invoice-exception proof, AP-hour savings, or opportunity risk closer to the hero and CTA.";
  }
  if (has.operationsWorkflow) {
    return "Move launch budget, ACV, handoff-bottleneck proof, approval-cycle savings, or opportunity risk closer to the hero and CTA.";
  }
  return has.revopsPipelineReview
    ? "Move launch budget, ACV, opportunity risk, demo target, or pipeline-review proof closer to the hero and CTA."
    : "Move launch investment, demo target, ARR influence, or demo conversion proof closer to the hero and CTA.";
}

function ctaBudgetRiskAction(has) {
  if (has.dealForecastRisk) return "Tie the demo ask to forecast risk and slipping-deal urgency.";
  if (has.revopsPipelineReview) return "Tie the demo ask to pipeline-review trust and forecast-confidence risk.";
  if (has.customerSuccessRenewal) return "Tie the demo ask to hidden renewal risk and health-score contradiction.";
  if (has.financeAp) return "Tie the demo ask to invoice exception leakage and month-end close risk.";
  if (has.operationsWorkflow) return "Tie the demo ask to the handoff bottleneck or approval leakage the buyer needs to resolve.";
  return "Tie the demo ask to launch-to-pipeline risk.";
}

function weakPipelineAction(has) {
  if (has.dealForecastRisk) return "Give sales a talk track that connects forecast risk, slipping deals, pipeline trust, and qualified demo conversion.";
  if (has.revopsPipelineReview) return "Give sales a talk track that connects pipeline-review trust, cross-system contradiction, and qualified demo conversion.";
  if (has.customerSuccessRenewal) return "Give sales a talk track that connects health-score contradiction, hidden renewal risk, and churn prevention.";
  if (has.financeAp) return "Give sales a talk track that connects invoice exceptions, payment risk, month-end backlog, and AP-hour savings.";
  if (has.operationsWorkflow) return "Give sales a talk track that connects handoff bottlenecks, approval leakage, workflow delays, and ownership gaps.";
  return "Give sales a talk track that connects launch story, campaign spend, and qualified demo conversion.";
}

function addFracture(fractures, condition, title, body, action, evidenceTerms) {
  if (!condition) return;
  fractures.push({ title, body, action, evidence: findEvidence(evidenceTerms) });
}

function proofGapActionForScenario(text) {
  return hasRenewalContext(text)
    ? "Add quantified renewal, churn, expansion, or account-risk proof near the claim and CTA so buyers believe the outcome before sales follow-up."
    : "Add quantified customer proof near the claim and CTA so buyers believe the outcome before sales follow-up.";
}

function hasRenewalContext(text) {
  return /\b(renewal|churn|customer success|customer health|adoption|expansion|account risk|account-risk|CS)\b/i.test(String(text || ""));
}

function isWatchoutFracture(fracture) {
  return ["CTA can be more demo-intent driven", "Proof needs quantification", "Light proof caveat"].includes(fracture?.title);
}

function prioritizeFractures(fractures, has) {
  if (!fractures.length) return [];
  const order = [];
  if (has.lightProofCaveat) order.push("Light proof caveat");
  if (has.pricingTrustRisk) order.push("Pricing trust risk");
  if (has.platformWedgeConflict) order.push("Platform narrative outruns module proof");
  if (has.churnExpansionSplit) order.push("Expansion story conflicts with churn proof");
  if (has.securityComplianceSplit) order.push("Innovation narrative competes with compliance urgency");
  if (has.founderNarrativeOverride) order.push("Founder narrative override");
  if (has.salesObjectionConflict) order.push("Sales objection conflicts with launch story");
  if (has.launchMotionActivityWeakConversion) order.push("Launch motion creates activity but not qualified demo intent");
  if (has.explicitProofGap && !has.launchMotionActivityWeakConversion) order.push("Proof gap blocks buyer trust");
  if (has.founderNarrativeOverride) order.push("Founder narrative override");
  if (has.genericAiPositioning) order.push("Generic AI positioning weakens CMO-level demo intent");
  if (has.passiveCta && (has.alignedBuyerAction || has.operationsWorkflow && !has.genericAiPositioning)) order.push("Passive CTA");
  if (has.strongProofWeakConversionPath) order.push("Proof is strong but CTA and conversion path are weak");
  if (has.ctaLaunchGoalMismatch || has.launchMotionActivityWeakConversion) order.push("CTA does not connect to launch budget risk", "Launch motion creates activity but not qualified demo intent");
  order.push("Target buyer and message are misaligned");
  if (has.proofMayWeakenLateStageConversion) order.push("Proof gap may weaken late-stage demo conversion");
  if (has.featureHeavy && (has.weakBuyerPain || !has.buyerPain)) order.push("Feature-heavy message", "Weak buyer pain");
  if (has.weakSalesPath) order.push("Weak sales conversion path");
  if (has.competitorOwnsPain) order.push("Competitive differentiation gap");
  if (has.passiveCta && has.buyerPain && !has.weakBuyerPain) order.push("Passive CTA");
  if (state.launchMode !== "pre" && has.activityNoIntent) order.push("Launch activity without qualified demand");
  if (has.weakDemoIntent) order.push("Weak demo intent");
  order.push("Sales objection conflicts with launch story", "Proof gap blocks buyer trust", "Founder narrative override", "Public-facing message does not carry the internal strategy", "Generic AI positioning weakens CMO-level demo intent", "Target buyer and message are misaligned", "CTA does not connect to launch budget risk", "Commercial stakes are present internally but missing from public-facing message", "Proof exists but is not placed early enough on the page", "Weak connection between launch activity and qualified pipeline", "Contradictory evidence flags broad positioning risk", "Unquantified buyer pain", "Proof needs quantification", "CTA can be more demo-intent driven", "Feature-heavy message", "Weak buyer pain", "Passive CTA", "Competitive differentiation gap", "AI-generated message inconsistency", "Category abstraction without buyer urgency", "Weak sales conversion path", "Unclear buyer urgency", "Unresolved objections", "Missing customer proof", "Missing quantified business impact", "Unclear ICP");

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
    action: "Carry the same buyer-pain, proof, and demo CTA through launch page, campaign, and sales follow-through.",
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
  if (riskLabel === "High") return "This launch can create awareness while demo intent stays at risk because buyers do not yet have a clear reason to act.";
  if (top.title === "Passive CTA") return "Demo intent depends on tightening the conversion path, especially the CTA and sales follow-through.";
  if (top.title === "Competitive differentiation gap") return "Demo intent is vulnerable if competitors own the buyer pain or buying criteria more clearly than this launch.";
  if (top.title === "Weak sales conversion path") return "Demo intent depends on whether sales can turn launch interest into a confident qualified conversation.";
  return "Demo intent has some support, but the highest-risk fracture should be fixed before launch day.";
}

function buildBusinessImplication(riskLabel, top, has, pre) {
  if (has.strongLaunch) return "If the team carries this message, proof, CTA, and sales path through consistently, the launch is positioned to create qualified demand rather than only awareness.";
  if (!pre) return "Campaign engagement may look healthy, but pipeline conversion will likely lag unless the launch narrative carries the buyer pain and urgency.";
  if (top.title === "Feature-heavy message") return "If the execution layer stays capability-led, buyers may understand the release but still lack a business reason to request a demo.";
  if (top.title === "Launch motion creates activity but not qualified demo intent") return "The launch can generate impressions, visits, and general interest while buyer pain, proof transmission, and CTA specificity remain too weak to convert attention into qualified pipeline.";
  if (top.title === "Proof is strong but CTA and conversion path are weak") return domainBusinessImplication(has, "proofCta");
  if (top.title === "Proof gap may weaken late-stage demo conversion") return domainBusinessImplication(has, "proofGap");
  if (top.title === "Public-facing message does not carry the internal strategy") return "The PMM workspace shows a credible strategic foundation. The risk is that downstream execution surfaces are not transmitting that strategy clearly enough before spend goes live.";
  if (top.title === "Generic AI positioning weakens CMO-level demo intent") return domainBusinessImplication(has, "genericAi");
  if (top.title === "Commercial stakes are present internally but missing from public-facing message") return domainBusinessImplication(has, "commercial");
  if (top.title === "Target buyer and message are misaligned") return "The selected buyer is CFO, but the copy speaks to generic team productivity and does not connect to financial control, margin protection, forecast accuracy, or spend leakage.";
  if (top.title === "Passive CTA") return "If the CTA remains passive, launch engagement may leak before it becomes demo requests.";
  if (top.title === "Competitive differentiation gap") return "If competitors own the pain frame, this launch may drive attention while another vendor shapes the buying criteria.";
  if (top.title === "Weak sales conversion path") return "If sales cannot explain the launch in buyer-pain terms, launch-sourced conversations may stay curious rather than qualified.";
  if (riskLabel === "High") return "If spend goes live before the execution gap is addressed, the launch can generate engagement while qualified demo requests underperform.";
  return "The launch can still convert, but the highest-risk drift point should be tightened before launch momentum is spent.";
}

function domainBusinessImplication(has, kind) {
  const domain = has.domain || "marketing";
  const map = {
    revops: {
      proofCta: "The launch has credible proof and clear buyer pain, but the CTA fails to convert interest into a pipeline-review trust conversation.",
      proofGap: "The launch has clear RevOps pain and a specific CTA. The remaining risk is buyer belief: proof needs to make forecast confidence and cross-system pipeline contradiction more concrete.",
      genericAi: "The launch can create awareness and curiosity while the current buyer-facing message remains too generic to convert RevOps leaders into qualified pipeline-review demos.",
      commercial: "The launch can create interest while RevOps demo conversion stays at risk if the public page does not carry the budget, ACV, opportunity, or forecast-confidence stakes already visible in the launch notes."
    },
    sales: {
      proofCta: "The launch has credible proof and clear buyer pain, but the CTA fails to translate interest into a forecast-risk or slipping-deal conversation.",
      proofGap: "The launch has clear sales leadership pain and a specific CTA. The remaining risk is buyer belief: proof needs to make forecast risk and slipping deals more concrete.",
      genericAi: "The launch can create awareness and curiosity while the current buyer-facing message remains too generic to convert sales leaders into forecast-risk demos.",
      commercial: "The launch can create interest while sales leadership demo conversion stays at risk if the public page does not carry the budget, ACV, opportunity, or forecast-risk stakes already visible in the launch notes."
    },
    cs: {
      proofCta: "The launch has credible renewal-risk proof, but the CTA fails to turn that belief into a hidden-risk or health-score contradiction conversation.",
      proofGap: "The launch has clear CS pain and a specific CTA. The remaining risk is buyer belief: proof needs to make renewal risk, churn prevention, or health-score contradiction more concrete.",
      genericAi: "The launch can create awareness and curiosity while the current buyer-facing message remains too generic to convert CS leaders into renewal-risk conversations.",
      commercial: "The launch can create interest while CS buyer urgency stays at risk if the public page does not carry renewal value, churn, account-risk, or demo stakes already visible in the launch notes."
    },
    finance: {
      proofCta: "The launch has credible AP proof, but the CTA fails to turn that belief into an invoice-exception or month-end risk conversation.",
      proofGap: "The launch has clear finance pain and a specific CTA. The remaining risk is buyer belief: proof needs to make invoice exceptions, payment risk, or AP-hour savings more concrete.",
      genericAi: "The launch can create awareness and curiosity while the current buyer-facing message remains too generic to convert finance and AP leaders into invoice-exception conversations.",
      commercial: "The launch can create interest while finance buyer urgency stays at risk if the public page does not carry budget, ACV, AP-hour, payment-risk, or month-end stakes already visible in the launch notes."
    },
    operations: {
      proofCta: "The launch has credible operations proof, but the CTA fails to turn that belief into a handoff-bottleneck or approval-leakage conversation.",
      proofGap: "The launch has clear operations pain and a specific CTA. The remaining risk is buyer belief: proof needs to make handoff delays, ownership gaps, or approval-cycle savings more concrete.",
      genericAi: "The launch can create awareness and curiosity while the current buyer-facing message remains too generic to convert operations leaders into workflow-risk conversations.",
      commercial: "The launch can create interest while operations buyer urgency stays at risk if the public page does not carry budget, ACV, handoff, approval-cycle, or opportunity stakes already visible in the launch notes."
    }
  };
  const fallback = {
    proofCta: "The launch has credible proof and a clear buyer pain, but the CTA fails to translate interest into the next buyer action. The CMO should change the CTA from passive education to a specific risk readout or demo offer.",
    proofGap: "The launch has a strong ICP, clear pain, and a specific CTA. It may create demo intent, but the CMO should watch whether buyers believe the claim because quantified proof is thin.",
    genericAi: "The launch can create awareness and curiosity while the current buyer-facing message remains too generic to convert CMOs into qualified demos.",
    commercial: "The launch can create interest while qualified demo conversion stays at risk if the public page does not carry the budget, pipeline, or ARR stakes already visible in the launch notes."
  };
  return (map[domain] || fallback)[kind] || fallback[kind];
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
  const opportunityRisk = extractOpportunityRisk(diagnostic.allText);
  const acv = extractAcvAmount(diagnostic.allText);
  if (amount && (opportunityRisk || acv)) {
    const demoTarget = extractDemoTarget(diagnostic.allText);
    const demoClause = demoTarget ? ` against a ${normalizeDemoTargetNumber(demoTarget)} qualified demo target` : "";
    const opportunityClause = opportunityRisk ? ` If strategy dilution weakens demo quality, ${opportunityRisk} could remain exposed` : " If strategy dilution weakens demo quality, serious opportunities could remain exposed";
    const acvClause = acv ? ` at roughly ${acv} ACV` : "";
    return `The launch has ${amount} of spend and internal effort at risk${demoClause}.${opportunityClause}${acvClause}.`;
  }
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
    return `The buyer-pain gap may force the team to spend more campaign budget testing for urgency that should be clear before launch. If the launch needs a ${spendRef} to find the buyer-pain, proof, and CTA thread, sharpening the problem now can reduce wasted test spend and redirect budget into demand gen, retargeting, growth, or another launch motion.`;
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
  const explicit = joined.match(/(?:launch investment|launch budget|total launch (?:investment at risk|spend)|launch spend|campaign budget|media spend|budget)\s*(?:is around|is roughly|is|around|roughly|:)?\s*((?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?)/i);
  if (explicit?.[1]) return explicit[1].replace(/\s+/g, " ").trim();
  const labeledInline = joined.match(/((?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?)\s*(?:launch investment|launch budget|launch spend|campaign budget|media spend|budget|spend|launch push)/i);
  if (labeledInline?.[1]) return labeledInline[1].replace(/\s+/g, " ").trim();
  const match = joined.match(/\b\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)\s?(?:budget|spend|test|media|campaign)/);
  return match ? match[0].replace(/\s+/g, " ").trim() : "";
}

function extractBudgetKind(text) {
  const value = Array.isArray(text) ? text.map((signal) => signal.text).join(" ") : String(text || "");
  if (/\blaunch investment\b/i.test(value)) return "launch investment";
  if (/\blaunch budget\b|\bcampaign budget\b|\bmedia spend\b|\blaunch push\b|\bbudget\b/i.test(value)) return "launch budget";
  return "launch investment";
}

function extractDemoTarget(text) {
  const value = String(text || "");
  const explicit = value.match(/demo target\s*:\s*(\d+(?:,\d{3})*)\s*(?:qualified\s+)?(?:demos?|demo requests?)?/i);
  if (explicit?.[1]) return `${explicit[1]} qualified demos`;
  const requestTarget = value.match(/\b(\d+(?:,\d{3})*)\s+qualified demo requests?\b/i);
  if (requestTarget?.[1]) return `${requestTarget[1]} qualified demos`;
  const labeledInline = value.match(/\b(\d+(?:,\d{3})*)\s+(?:qualified\s+)?(?:demos?|demo requests?)\s+(?:target|goal)\b/i);
  if (labeledInline?.[1]) return `${labeledInline[1]} qualified demos`;
  const goalMatch = value.match(/(?:generate|get|want)\s+(\d+(?:,\d{3})*)\s+(?:qualified\s+)?(?:demos?|demo requests?)\b/i);
  if (goalMatch?.[1]) return `${goalMatch[1]} qualified demos`;
  return "";
}

function extractCommercialRange(text) {
  const value = String(text || "");
  const arrImpactMatch = value.match(/(?:arr influence at risk|potential arr impact|arr at risk|pipeline influence at risk)\s*:\s*((?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?\s*(?:-|to|and)\s*(?:\$|USD\s*)?\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?)/i);
  if (arrImpactMatch?.[1]) return arrImpactMatch[1].replace(/\s+/g, " ").replace(/\s*-\s*/, " to ").trim();
  const rangeMatch = value.match(/((?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?\s*(?:-|to|and)\s*(?:\$|USD\s*)?\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?)\s*(?:ARR influence at risk|ARR at risk|pipeline influence at risk)/i);
  if (rangeMatch?.[1]) return rangeMatch[1].replace(/\s+/g, " ").replace(/\s*-\s*/, " to ").trim();
  return "";
}

function extractAcvAmount(text) {
  const value = String(text || "");
  const explicit = value.match(/(?:average opportunity value|average contract value|average deal size|average renewal value|ACV)\s*(?:is around|is roughly|is|around|roughly|:)?\s*((?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?)/i);
  if (explicit?.[1]) return explicit[1].replace(/\s+/g, " ").trim();
  return "";
}

function extractAcvKind(text) {
  const value = String(text || "");
  if (/\baverage opportunity value\b/i.test(value)) return "average opportunity value";
  if (/\baverage deal size\b/i.test(value)) return "average deal size";
  return /\baverage renewal value\b/i.test(value) ? "average renewal value" : "ACV";
}

function extractOpportunityRisk(text) {
  const value = String(text || "");
  const explicit = value.match(/(?:opportunity risk|opportunities at risk)\s*(?:is|:)?\s*(\d+(?:,\d{3})*\s*(?:-|to|and)\s*\d+(?:,\d{3})*)\s+(?:serious\s+)?opportunities/i);
  if (explicit?.[1]) return `${explicit[1].replace(/\s*-\s*/, " to ")} opportunities at risk`;
  const missConversations = value.match(/\b(?:miss|lose)\s+(\d+(?:,\d{3})*\s*(?:-|to|and)\s*\d+(?:,\d{3})*)\s+(?:strong\s+)?(?:cs\s+)?buyer conversations/i);
  if (missConversations?.[1]) return `${missConversations[1].replace(/\s*-\s*/, " to ")} buyer conversations at risk`;
  const lose = value.match(/\b(?:lose|risk|put|puts|could lose|may lose|probably lose|could miss|may miss)\s+(\d+(?:,\d{3})*\s*(?:-|to|and)\s*\d+(?:,\d{3})*)\s+(?:serious\s+|strong\s+|real\s+)?(?:finance\s+)?opportunities/i);
  if (lose?.[1]) {
    const label = /\bfinance\s+opportunities/i.test(lose[0]) ? "finance opportunities at risk" : "opportunities at risk";
    return `${lose[1].replace(/\s*-\s*/, " to ")} ${label}`;
  }
  return "";
}

function formattedCommercialKpis(diagnosis) {
  return formattedCommercialKpisFromText(`${diagnosis.allText || ""} ${state.targetGoal || ""}`);
}

function formattedCommercialKpisFromText(text) {
  const value = String(text || "");
  const launchInvestment = extractBudgetAmount([{ text: value }]);
  const budgetKind = extractBudgetKind(value);
  const demoTarget = extractDemoTarget(value);
  const arrRisk = extractCommercialRange(value);
  const acv = extractAcvAmount(value);
  const acvKind = extractAcvKind(value);
  const opportunityRisk = extractOpportunityRisk(value);
  return [
    launchInvestment ? { label: budgetKind === "launch budget" ? "Launch budget" : "Launch investment", value: `${launchInvestment} ${budgetKind}`, ledgerValue: launchInvestment } : null,
    acv ? { label: acvKind === "average renewal value" ? "Average renewal value" : "ACV", value: `${acv} ${acvKind}`, ledgerValue: acv } : null,
    opportunityRisk ? { label: "Opportunity risk", value: opportunityRisk, ledgerValue: opportunityRisk } : null,
    demoTarget ? { label: "Demo target", value: `${normalizeDemoTargetNumber(demoTarget)} qualified demo target`, ledgerValue: normalizeDemoTargetLabel(demoTarget) } : null,
    arrRisk ? { label: "ARR influence at risk", value: `${arrRisk} ARR influence at risk`, ledgerValue: arrRisk } : null
  ].filter(Boolean);
}

function normalizeDemoTargetLabel(value) {
  const cleaned = String(value || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  if (/qualified demos?$/i.test(cleaned)) return cleaned.replace(/qualified demo$/i, "qualified demos");
  const number = cleaned.match(/\d+(?:,\d{3})*/)?.[0];
  return number ? `${number} qualified demos` : cleaned;
}

function normalizeDemoTargetNumber(value) {
  return String(value || "").match(/\d+(?:,\d{3})*/)?.[0] || String(value || "").replace(/\s+/g, " ").trim();
}

function removeCommercialFragments(text) {
  return String(text || "")
    .replace(/(?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?\s*(?:-|to|and)\s*(?:\$|USD\s*)?\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?(?:\s+ARR influence at risk)?/gi, "")
    .replace(/(?:\$|USD\s*)\s?\d+(?:,\d{3})*(?:\.\d+)?\s?(?:K|k|M|m)?(?:\s+launch investment|\s+budget|\s+spend)?/gi, "")
    .replace(/\b\d+(?:,\d{3})*\s+(?:qualified\s+)?(?:demos?|demo requests?|meetings?|opportunities?)(?:\s+target)?/gi, "")
    .replace(/\s*;\s*/g, "; ")
    .replace(/(?:^|; )\s*(?:ARR influence at risk|launch investment|demo target)\s*(?=;|$)/gi, "")
    .replace(/\s+/g, " ")
    .replace(/^[;,\s]+|[;,\s]+$/g, "")
    .trim();
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

function extractLabeledValue(text, labels) {
  const value = String(text || "");
  for (const label of labels) {
    const escaped = escapeRegExp(label);
    const match = value.match(new RegExp(`(?:^|\\n)\\s*${escaped}\\s*:\\s*([^\\n]+(?:\\n(?!\\s*[A-Z][A-Za-z -]{1,60}\\s*:).+)*)`, "i"));
    if (match?.[1]) return match[1].replace(/\s+/g, " ").trim();
  }
  return "";
}

function extractExplicitProductName(signals) {
  const combined = signals.map((signal) => signal.text).join("\n");
  const directProduct = combined.match(/(?:^|\n)\s*Product\s*:\s*([^\n]+)/i);
  if (directProduct?.[1] && isReliableLaunchName(directProduct[1].trim())) return normalizeAcronyms(directProduct[1].trim());
  const product = extractLabeledValue(combined, ["Product"]);
  const cleanedProduct = cleanConceptPhrase(product, 64);
  if (cleanedProduct && isReliableLaunchName(cleanedProduct)) return normalizeAcronyms(cleanedProduct);
  const productName = extractProductName(product);
  if (productName && productName !== "this launch" && productName !== "the launch" && isReliableLaunchName(productName)) return productName;
  const standaloneTopLine = combined.split(/\n/).slice(0, 6).map((line) => line.trim()).find((line) => /^[A-Z][A-Za-z0-9&.\-]{2,40}$/.test(line) && isReliableLaunchName(line));
  if (standaloneTopLine) return normalizeAcronyms(standaloneTopLine);
  const company = extractLabeledValue(combined, ["Company"]);
  if (company && isReliableLaunchName(company)) return company;
  return "";
}

function extractBuyerValue(text, fallback) {
  const cleaned = extractFieldValue(text, "");
  if (!cleaned) return fallback;
  const roleMatch = cleaned.match(/(?:says\s+)?([^,.]+(?:leaders|managers|teams|buyers|PMMs|PMM teams|CMOs|operators|marketers))/i);
  const buyer = roleMatch ? roleMatch[1].replace(/^the draft says\s+/i, "").trim() : cleaned;
  return cleanConceptPhrase(buyer, 90) || fallback;
}

function extractProductName(text) {
  const raw = String(text || "").replace(/\s+/g, " ").trim();
  const rawCalledAiMatch = raw.match(/\bproduct called\s+([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\b/i)
    || raw.match(/\bcalled\s+([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\b/i);
  if (rawCalledAiMatch?.[1]) return normalizeAcronyms(rawCalledAiMatch[1]);
  const rawAnywhereAiNameMatch = raw.match(/\b([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\b/);
  if (rawAnywhereAiNameMatch?.[1] && isReliableLaunchName(rawAnywhereAiNameMatch[1])) return normalizeAcronyms(rawAnywhereAiNameMatch[1]);
  const rawLaunchingMatch = raw.match(/\b(?:launching|launch for|copy for|for)\s+([A-Z][A-Za-z0-9.-]{2,40}(?:AI|IQ|Radar|Pilot|Pulse)?)\b/);
  if (rawLaunchingMatch?.[1] && isReliableLaunchName(rawLaunchingMatch[1])) return normalizeAcronyms(rawLaunchingMatch[1]);
  const rawHelpsMatch = raw.match(/\b([A-Z][A-Za-z0-9.-]{2,40}(?:AI|IQ|Radar|Pilot|Pulse)?)\s+helps\b/);
  if (rawHelpsMatch?.[1] && isReliableLaunchName(rawHelpsMatch[1])) return normalizeAcronyms(rawHelpsMatch[1]);
  const rawProductLike = raw.match(/\b([A-Z][A-Za-z0-9.-]{2,40}(?:AI|IQ|Radar|Pilot|Pulse))\b/);
  if (rawProductLike?.[1] && isReliableLaunchName(rawProductLike[1])) return normalizeAcronyms(rawProductLike[1]);
  const cleaned = extractFieldValue(text, "the launch");
  if (/cognix/i.test(cleaned)) return "Cognix";
  const calledAiMatch = cleaned.match(/\bproduct called\s+([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\b/i)
    || cleaned.match(/\bcalled\s+([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\b/i);
  if (calledAiMatch?.[1]) return normalizeAcronyms(calledAiMatch[1]);
  const anywhereAiNameMatch = cleaned.match(/\b([A-Z][A-Za-z0-9.-]{2,40}\s+AI)\b/);
  if (anywhereAiNameMatch?.[1] && isReliableLaunchName(anywhereAiNameMatch[1])) return anywhereAiNameMatch[1];
  const namedLaunchMatch = cleaned.match(/^([A-Z][A-Za-z0-9.-]{2,40})\s+is\s+(?:launching|announcing|releasing)\b/);
  if (namedLaunchMatch?.[1]) return namedLaunchMatch[1];
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
  const cleaned = extractCurrentCtaPhrase(text) || extractFieldValue(text, "");
  if (has.strongCta && /demo/i.test(cleaned)) return "book a demo tied to the buying trigger";
  if (/audit|risk|diagnos/i.test(cleaned)) return "run the launch conversion audit before launch day";
  return "run a launch conversion audit before launch day";
}

function extractCurrentCtaPhrase(text) {
  const raw = String(text || "");
  const value = raw.replace(/\s+/g, " ").trim();
  if (!value) return "";
  const directLine = raw.match(/(?:^|\n)\s*(?:current\s+CTA|CTA today|primary CTA|CTA)\s*:\s*\n?\s*([^\n]+)/i);
  if (directLine?.[1] && !/^possible\s+CTAs?\b/i.test(directLine[1].trim())) return cleanCtaPhrase(directLine[1]);
  const multilineKnown = raw.match(/\b(?:current CTA|CTA today|CTA)\s*(?:is)?\s*:?\s*\n+\s*(Book a demo|Request a demo|Schedule a demo|Contact sales|Learn more|See how it works)\b/i);
  if (multilineKnown?.[1]) return cleanCtaPhrase(multilineKnown[1]);
  const knownCurrent = value.match(/\bcurrent CTA is\s*:?\s*(Book a demo|Request a demo|Schedule a demo|Contact sales|Learn more|See how it works)\b/i)
    || value.match(/\bCTA is\s*:?\s*(Book a demo|Request a demo|Schedule a demo|Contact sales|Learn more|See how it works)\b/i)
    || value.match(/\bprimary CTA\s*(?:is|:)\s*(Book a demo|Request a demo|Schedule a demo|Contact sales|Learn more|See how it works)\b/i);
  if (knownCurrent?.[1]) return cleanCtaPhrase(knownCurrent[1]);
  const quotedCurrent = value.match(/\bcurrent CTA is\s+["“]([^"”]{3,80})["”]/i)
    || value.match(/\bCTA is\s+["“]([^"”]{3,80})["”]/i)
    || value.match(/\bprimary CTA\s*(?:is|:)\s+["“]([^"”]{3,80})["”]/i);
  if (quotedCurrent?.[1]) return cleanCtaPhrase(quotedCurrent[1]);
  const plainCurrent = value.match(/\bcurrent CTA is\s+([^.!?]{3,80})/i)
    || value.match(/\bCTA is\s+([^.!?]{3,80})/i)
    || value.match(/\bprimary CTA\s*(?:is|:)\s+([^.!?]{3,80})/i);
  if (plainCurrent?.[1]) return cleanCtaPhrase(plainCurrent[1]);
  const known = value.match(/\b(Book a demo|Request a demo|Schedule a demo|Contact sales|Learn more|See how it works)\b/i);
  return known?.[1] ? cleanCtaPhrase(known[1]) : "";
}

function extractSuggestedCtaPhrase(text) {
  const raw = String(text || "");
  const value = raw.replace(/\s+/g, " ").trim();
  if (!value) return "";
  const multilineSuggested = raw.match(/\b(?:maybe better|maybe it should be|maybe the CTA should be more specific,?\s*like|suggested CTA|better CTA|stronger CTA)\s*:?\s*\n+\s*([^.\n]{5,120})/i);
  if (multilineSuggested?.[1]) return cleanCtaPhrase(multilineSuggested[1]);
  const quotedSuggested = value.match(/\b(?:suggested CTA|better CTA|stronger CTA|like|try|say this|should be)\s*(?:is|:)?\s*["“]([^"”]{5,90})["”]/i);
  if (quotedSuggested?.[1]) return cleanCtaPhrase(quotedSuggested[1]);
  const unquotedSuggested = value.match(/\b(?:suggested CTA|better CTA|stronger CTA|like|try|say this|should be)\s*(?:is|:)?\s*(Pressure-test [^.?!]{5,90})/i);
  if (unquotedSuggested?.[1]) return cleanCtaPhrase(unquotedSuggested[1]);
  const known = value.match(/\bPressure-test your next pipeline review\b/i)
    || value.match(/\bPressure-test your forecast risk\b/i)
    || value.match(/\bFind hidden renewal risk\b/i)
    || value.match(/\bFind your invoice exception leakage\b/i)
    || value.match(/\bFind the handoff that is slowing down your workflow\b/i);
  return known?.[0] ? cleanCtaPhrase(known[0]) : "";
}

function cleanCtaPhrase(text) {
  return cleanConceptPhrase(text, 90)
    .replace(/^(maybe|but|and|or|like)\s+/i, "")
    .replace(/\s*(?:maybe that.+|but .+|that.+)$/i, "")
    .replace(/^["“]|["”]$/g, "")
    .replace(/[.!?]+$/g, "")
    .trim();
}

function cleanConceptPhrase(text, max = 120) {
  const labelPattern = /^(Company|Product|Founder\s*\/\s*CEO narrative|Founder narrative|CEO narrative|Leadership narrative|Internal GTM strategy|Internal launch strategy|Launch message(?: or positioning draft)?|Positioning|Strategy|Launch page|Buyer-facing landing page headline|Landing page(?: copy| or campaign copy)?|Campaign copy|Primary buyer|Target buyer(?: or ICP)?|ICP|Buyer pressure|Buyer pain|Value proposition|CTA|Sales talk track|Sales feedback|Objection notes?|Competitive framing|Customer proof|Pre-launch goal|Planned launch goal|Launch investment|Demo target|ARR influence at risk|Success metric|Pre-launch decision|Commercial assumptions|PMM concern|PMM thinks|PMM is worried|PMM wants)\s*:\s*/i;
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
    .replace(/\bcsm(s)?\b/gi, "CSM$1")
    .replace(/\bcSMs\b/g, "CSMs")
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
  subtract("Sales objection conflicts with launch story", 15);
  subtract("Proof gap blocks buyer trust", 14);
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
  subtract("Founder narrative override", 14);
  subtract("Pricing trust risk", 11);
  subtract("Platform narrative outruns module proof", 14);
  subtract("Expansion story conflicts with churn proof", 10);
  subtract("Innovation narrative competes with compliance urgency", 10);
  subtract("Light proof caveat", 2);

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
  if (has.alignedLaunch) score += 14;

  const hasMeaningfulOffsets = !has.unclearIcp
    && has.buyerPain
    && has.strongCta
    && has.proof
    && has.salesSignal
    && has.competitiveClarity
    && coverage.count >= 7;
  if (!has.strongLaunch && !has.alignedLaunch && titles.size) {
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
  if (has.founderNarrativeOverride) {
    score = Math.min(score, 58);
    score = Math.max(score, 52);
  }
  if (has.salesObjectionConflict) {
    score = Math.min(score, 58);
    score = Math.max(score, 48);
  }
  if (has.explicitProofGap) {
    score = Math.min(score, 62);
    score = Math.max(score, 50);
  }
  if ((has.genericAiPositioning || has.categoryAbstraction) && (has.weakBuyerPain || has.unclearIcp) && (has.passiveCta || !has.strongCta) && (!has.proof || has.proofGap || has.proofNeedsQuantification)) {
    score = Math.min(score, 52);
    score = Math.max(score, 40);
  }
  const hasImprovedCoreSignals = coverage.count >= 4
    && !has.unclearIcp
    && has.buyerPain
    && has.strongCta
    && !has.passiveCta;
  if (hasImprovedCoreSignals && !has.strongLaunch && !has.alignedLaunch) {
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
  if (has.founderNarrativeOverride) {
    score = Math.min(score, 58);
    score = Math.max(score, 52);
  }
  if (has.pricingTrustRisk) {
    score = Math.min(score, 58);
    score = Math.max(score, 50);
  }
  if (has.platformWedgeConflict) {
    score = Math.min(score, 56);
    score = Math.max(score, 48);
  }
  if (has.churnExpansionSplit || has.securityComplianceSplit) {
    score = Math.min(score, 64);
    score = Math.max(score, 56);
  }
  if (has.lightProofCaveat) {
    score = Math.min(score, 86);
    score = Math.max(score, 82);
  }
  if (has.alignedLaunch && !has.salesObjectionConflict && !has.explicitProofGap) {
    score = Math.max(score, 88);
  }
  const realFractureCount = [...titles].filter(isRealFractureTitle).length;
  if ((has.strongLaunch || has.alignedLaunch) && !realFractureCount) {
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
  const quote = extractCustomerQuote(text);
  if (quote) return normalizeAcronyms(quote);
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
  const auditType = pre ? "GTM fracture detection" : "Post-launch GTM contradiction detection";
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  const memorySummary = memoryReadySummary(diagnosis);
  const brief = buildExecutiveDecisionBrief(diagnosis);
  const actionPlan = splitPmmActionPlan(diagnosis);
  const pages = createPdfReportPages();

  // Page 1: Executive decision brief
  pdfReportHeader(pages, {
    title: "Cognix GTM Story Drift Read",
    timestamp: formatGeneratedTimestamp(generatedAt),
    auditType,
    kpi: inferKpiAtRisk(diagnosis),
    goal: state.targetGoal || "Not specified"
  });
  pdfExecutiveBrief(pages, diagnosis, brief, architecture);

  // Page 2: CMO read
  addPdfReportPage(pages);
  pdfCmoReadPage(pages, diagnosis);

  // Page 3: Signal sorting
  addPdfReportPage(pages);
  pdfSignalSortingPage(pages, diagnosis);

  // Page 4: GTM contradiction with receipts
  addPdfReportPage(pages);
  pdfPageHeading(pages, diagnosisReadLabel(diagnosis), diagnosisPdfSubtitle(diagnosis));
  pdfCollisionCard(pages, diagnosis, architecture, { hero: true });
  pdfSectionCard(pages, "Contradiction with receipts", [architecture.coherenceRead], { featured: true });
  pdfSectionCard(pages, diagnosis.predictabilityScore >= 90 ? "Primary watchout" : "Dominant contradiction", [primaryFractureLabel(diagnosis), ...secondaryFractureLabels(diagnosis).slice(0, 2)], { list: true });

  // Page 5: Commercial risk or commercial readiness
  addPdfReportPage(pages);
  pdfPageHeading(pages, architecture.commercialPanel.label, architecture.commercialPanel.headline);
  pdfCardGrid(pages, [
    { title: "Score", body: `${diagnosis.predictabilityScore}% Launch Predictability` },
    { title: "Risk", body: diagnosis.verdict },
    { title: "Coverage", body: `${diagnosis.signalCoverage.label}, ${diagnosis.coverage.count} of ${diagnosis.coverage.total} signal areas.` }
  ]);
  pdfSectionCard(pages, architecture.commercialPanel.label, [architecture.commercialPanel.body], { featured: true });
  pdfSectionCard(pages, "Buyer / sales execution impact", [commercialWhyValue(diagnosis)], { featured: true });

  // Page 6: Instead of / Say this + Specific CTA fix
  addPdfReportPage(pages);
  pdfPageHeading(pages, "Instead of / Say this", "Buyer-facing rewrite and CTA fix");
  pdfSectionCard(pages, "Instead of", [`"${architecture.rewritePanel.instead}"`]);
  pdfSectionCard(pages, "Say this", [`"${architecture.rewritePanel.sayThis}"`], { featured: true });
  pdfSectionCard(pages, "Specific CTA fix", [
    `Instead of: "${architecture.ctaPanel.instead}"`,
    `Say this: "${architecture.ctaPanel.sayThis}"`
  ], { featured: true });

  // Page 7: Executive alignment note
  addPdfReportPage(pages);
  pdfPageHeading(pages, "Executive alignment note", "Executive-ready PMM action");
  pdfSectionCard(pages, "Executive alignment note", architecture.resourceBrief.split(/\n+/).filter(Boolean), { featured: true });

  // Page 8: PMM action plan
  addPdfReportPage(pages);
  pdfPageHeading(pages, "PMM action plan", "What to fix, monitor, and feed back to sales");
  pdfSectionCard(pages, "Fix before launch", actionPlan.fixBeforeLaunch, { list: true });
  pdfSectionCard(pages, "Monitor during launch week", actionPlan.monitorDuringLaunch, { list: true });
  pdfSectionCard(pages, "Feed back to sales", actionPlan.feedBackToSales, { list: true });

  // Page 9: Score movement
  addPdfReportPage(pages);
  pdfPageHeading(pages, "Score movement", "What changed since the prior baseline");
  if (diagnosis.iterationComparison?.hasPrevious) {
    pdfSectionCard(pages, "Score movement", buildPdfIterationLines(diagnosis.iterationComparison), { list: true, featured: true });
  } else {
    pdfSectionCard(pages, "Score movement", ["No prior saved launch baseline detected for this workspace."], { featured: true });
  }

  // Page 10: Appendix-style memory summary
  addPdfReportPage(pages);
  pdfPageHeading(pages, "Appendix", "Memory-ready summary");
  pdfSectionCard(pages, "Memory-ready summary", memorySummary, { list: true, featured: true });

  return serializeBrandedPdf(pages.pages, pages.width, pages.height);
}

function pdfCmoReadPage(report, diagnosis) {
  const read = buildCmoRead(diagnosis);
  pdfPageHeading(report, "CMO read", read.headline);
  pdfSectionCard(report, "Revenue risk", [read.revenueRisk], { featured: true });
  pdfSectionCard(report, "Why it matters", [read.why]);
  pdfSectionCard(report, "Department risk", [read.departmentRisk]);
  pdfSectionCard(report, "Executive action", [read.action], { featured: true });
}

function buildPdfIterationLines(comparison) {
  return [
    comparison.movementLabel,
    ...comparison.improved.map((item) => `What improved: ${item}`),
    ...comparison.holdingBack.map((item) => `Still holding score back: ${item}`),
    ...comparison.newRisks.map((item) => `New risk: ${item}`)
  ];
}

function pdfSignalSortingPage(report, diagnosis) {
  const sorting = diagnosis.signalSorting || buildSignalSorting(diagnosis.signals || [], diagnosis.allText || "");
  const groups = sorting.groups.length ? sorting.groups : ["No reliable signal group detected"];
  pdfPageHeading(report, "Signal sorting", "Pre-diagnosis surface map");
  pdfCardGrid(report, [
    { title: "Detected document type", body: sorting.documentType },
    { title: "Buyer-facing copy confidence", body: sorting.buyerFacingCopyConfidence },
    { title: "Read discipline", body: sorting.confidenceReason }
  ]);
  pdfSectionCard(report, "Signal groups detected", groups, { list: true, featured: true });
  pdfSectionCard(report, "Diagnosis rule", [sorting.diagnosisRule], { featured: true });
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
  pdfWrappedText(report, "Measures whether the GTM story is likely to create qualified demand. It is not a revenue forecast.", x + 145, y + 80, 330, 10, "#aebed5", 13);
  pdfText(report, diagnosis.verdict, x + 145, y + 36, 14, "F2", "#8fc7ff");
  report.y -= 170;
}

function pdfExecutiveBrief(report, diagnosis, brief, architecture) {
  const scoreRead = buildLaunchPredictabilityRead(diagnosis);
  const exposure = buildCommercialExposure(diagnosis);
  pdfEnsureSpace(report, 500);
  const x = report.margin;
  let y = report.y - 174;
  pdfCard(report, x, y, 532, 162, { fill: "#0d1b2e", stroke: "#3c5f88" });
  pdfText(report, "Launch Predictability Score", x + 18, y + 126, 10, "F2", "#8fc7ff");
  pdfText(report, `${diagnosis.predictabilityScore}%`, x + 18, y + 90, 32, "F2", "#ffffff");
  pdfText(report, "Readiness band", x + 150, y + 126, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, scoreRead.readinessBand, x + 150, y + 106, 116, 12, "#ffffff", 14);
  pdfText(report, "Executive decision", x + 290, y + 126, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, scoreRead.executiveDecision, x + 290, y + 106, 116, 12, "#ffffff", 14);
  pdfText(report, "KPI at risk", x + 420, y + 126, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, exposure.kpiAtRisk, x + 420, y + 106, 92, 10, "#ffffff", 12);
  pdfText(report, "Estimated exposure", x + 150, y + 58, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, truncate(exposure.estimatedExposure, 132), x + 150, y + 40, 248, 8.3, "#d8e4f4", 10);
  pdfText(report, "Primary drag", x + 420, y + 58, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, scoreRead.primaryDrag, x + 420, y + 40, 92, 9.2, "#ffffff", 11);
  report.y -= 180;

  pdfSectionCard(report, "Score meaning", [scoreRead.scoreMeaning], { featured: true });
  pdfSectionCard(report, "Score lift path", [scoreRead.scoreLiftPath], { featured: true });
  pdfSectionCard(report, "Commercial exposure", [
    `KPI at risk: ${exposure.kpiAtRisk}`,
    `Risk mechanism: ${exposure.riskMechanism}`,
    `Known numbers: ${exposure.knownNumbers.join("; ")}`,
    `Missing numbers: ${exposure.missingNumbers.join("; ")}`,
    `Estimated exposure: ${exposure.estimatedExposure}`,
    `Confidence level: ${exposure.confidenceLevel}`,
    `Measurement plan: ${exposure.measurementPlan.join("; ")}`
  ], { list: true, featured: true });

  y = report.y - 126;
  pdfCard(report, x, y, 532, 114, { fill: "#10223a", stroke: "#263a57" });
  pdfText(report, architecture.commercialPanel.label, x + 18, y + 84, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, architecture.commercialPanel.headline, x + 18, y + 64, 206, 10.5, "#ffffff", 13);
  pdfWrappedText(report, truncate(architecture.commercialPanel.body, 210), x + 18, y + 33, 224, 8.5, "#d8e4f4", 10.5);
  pdfText(report, "Primary action", x + 278, y + 84, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, truncate(brief.primaryAction, 190), x + 278, y + 64, 222, 10, "#ffffff", 13);
  report.y -= 132;

  pdfMiniCollisionPreview(report, diagnosis, architecture);
}

function pdfMiniCollisionPreview(report, diagnosis, architecture) {
  const collision = architecture.collision || {};
  const meta = collisionDisplayMeta(collision, diagnosis);
  pdfSectionCard(report, meta.title === "Strategic story confirmed" ? "Mini story preview" : meta.title, [
    `${meta.leftLabel}: "${collision.upstream || "Missing upstream signal"}"`,
    `${meta.rightLabel}: "${collision.downstream || "Missing downstream signal"}"`,
    collision.read || "No contradiction available."
  ], { featured: true });
}

function pdfCollisionCard(report, diagnosis, architecture, options = {}) {
  const collision = architecture.collision || {};
  const meta = collisionDisplayMeta(collision, diagnosis);
  const title = meta.title;
  const height = options.hero ? 218 : 178;
  pdfEnsureSpace(report, height + 18);
  const x = report.margin;
  const y = report.y - height;
  pdfCard(report, x, y, 532, height, { fill: "#10223a", stroke: "#4a6f9f" });
  pdfText(report, title, x + 18, y + height - 26, 14, "F2", "#8fc7ff");
  pdfText(report, meta.leftLabel, x + 18, y + height - 54, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, `"${collision.upstream || "Missing upstream signal"}"`, x + 18, y + height - 72, 224, 9.6, "#ffffff", 12);
  pdfText(report, "VS", x + 260, y + height - 82, 13, "F2", "#8fc7ff");
  pdfText(report, meta.rightLabel, x + 292, y + height - 54, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, `"${collision.downstream || "Missing downstream signal"}"`, x + 292, y + height - 72, 202, 9.6, "#ffffff", 12);
  pdfFillRect(report, x + 18, y + 22, 496, 56, "#0d1b2e");
  pdfStrokeRect(report, x + 18, y + 22, 496, 56, "#263a57", 0.8);
  pdfText(report, "Cognix read", x + 32, y + 56, 9, "F2", "#8fc7ff");
  pdfWrappedText(report, truncate(collision.read || "No contradiction available.", 210), x + 32, y + 39, 468, 8.8, "#e6eef8", 11);
  report.y -= height + 18;
}

function pdfLogicTrackingLines(diagnosis, mode = "rewrite") {
  return logicTrackingItems(diagnosis, mode).map((item) => {
    const value = item.quote === false ? item.value : `"${trimCollisionPhrase(item.value)}"`;
    return `${item.label}: ${value}`;
  });
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
  const auditType = pre ? "GTM fracture detection" : "Post-launch GTM contradiction detection";
  const launchAudited = detectAuditedLaunch(diagnosis);
  const architecture = diagnosis.outputArchitecture || buildStrategicOutputArchitecture(diagnosis);
  const sorting = diagnosis.signalSorting || buildSignalSorting(diagnosis.signals || [], diagnosis.allText || "");
  const scoreRead = buildLaunchPredictabilityRead(diagnosis);
  const exposure = buildCommercialExposure(diagnosis);
  const cmoRead = buildCmoRead(diagnosis);
  const memorySummary = [
    `Launch read: ${launchAudited}`,
    `Launch Predictability Score: ${diagnosis.predictabilityScore}%`,
    `Readiness band: ${scoreRead.readinessBand}`,
    `Executive decision: ${scoreRead.executiveDecision}`,
    `KPI at risk: ${exposure.kpiAtRisk}`,
    `Estimated exposure: ${exposure.estimatedExposure}`,
    `Missing numbers: ${exposure.missingNumbers.join(", ")}`,
    `Measurement plan: ${exposure.measurementPlan.join(", ")}`,
    `Primary drag: ${scoreRead.primaryDrag}`,
    `Commercial risk: ${architecture.commercialPanel.body}`,
    `Primary rewrite: ${architecture.rewritePanel?.sayThis || "No rewrite generated"}`,
    `CTA action: ${architecture.ctaPanel?.sayThis || "No CTA action generated"}`,
    `Next PMM action: ${primaryActionBeforeLaunch(diagnosis)}`
  ];

  return [
    { type: "title", text: "Cognix" },
    { type: "heading", text: "Cognix GTM fracture detection" },
    { type: "meta", text: formatGeneratedTimestamp(generatedAt) },
    { type: "space" },
    { type: "section", text: "Read context" },
    { type: "body", text: `Read type: ${auditType}` },
    { type: "body", text: `KPI: ${exposure.kpiAtRisk}` },
    { type: "body", text: `Goal: ${state.targetGoal || "Not specified"}` },
    { type: "body", text: `Launch Predictability Score: ${diagnosis.predictabilityScore}%` },
    { type: "body", text: `Readiness band: ${scoreRead.readinessBand}` },
    { type: "body", text: `Executive decision: ${scoreRead.executiveDecision}` },
    { type: "body", text: `Primary drag: ${scoreRead.primaryDrag}` },
    { type: "body", text: `Score meaning: ${scoreRead.scoreMeaning}` },
    { type: "body", text: `Score lift path: ${scoreRead.scoreLiftPath}` },
    { type: "space" },
    { type: "section", text: "Commercial exposure" },
    { type: "body", text: `KPI at risk: ${exposure.kpiAtRisk}` },
    { type: "body", text: `Risk mechanism: ${exposure.riskMechanism}` },
    { type: "body", text: `Known numbers: ${exposure.knownNumbers.join("; ")}` },
    { type: "body", text: `Missing numbers: ${exposure.missingNumbers.join("; ")}` },
    { type: "body", text: `Estimated exposure: ${exposure.estimatedExposure}` },
    { type: "body", text: `Confidence level: ${exposure.confidenceLevel}` },
    ...pdfListItems(exposure.measurementPlan.map((item) => `Measurement: ${item}`)),
    { type: "space" },
    { type: "section", text: "Launch signal coverage" },
    { type: "body", text: `Signal coverage: ${diagnosis.signalCoverage.label}. ${diagnosis.signalCoverage.note}` },
    { type: "space" },
    { type: "section", text: "Evidence from launch signals" },
    ...pdfListItems(diagnosis.evidence.map((item) => `${item.source}: ${item.snippet}`)),
    { type: "space" },
    { type: "section", text: "CMO read" },
    { type: "body", text: cmoRead.headline },
    { type: "body", text: `Revenue risk: ${cmoRead.revenueRisk}` },
    { type: "body", text: `Why it matters: ${cmoRead.why}` },
    { type: "body", text: `Department risk: ${cmoRead.departmentRisk}` },
    { type: "body", text: `Executive action: ${cmoRead.action}` },
    { type: "space" },
    { type: "section", text: "Signal sorting" },
    { type: "body", text: `Detected document type: ${sorting.documentType}` },
    { type: "body", text: `Buyer-facing copy confidence: ${sorting.buyerFacingCopyConfidence}. ${sorting.confidenceReason}` },
    ...pdfListItems((sorting.groups || []).map((item) => `Signal group: ${item}`)),
    { type: "body", text: sorting.diagnosisRule },
    { type: "space" },
    { type: "section", text: "Contradiction with receipts" },
    { type: "body", text: architecture.coherenceRead },
    { type: "space" },
    { type: "section", text: diagnosis.riskLabel === "Low" ? "Commercial readiness" : "Commercial risk" },
    { type: "body", text: architecture.commercialPanel.body },
    { type: "section", text: "Buyer / sales execution impact" },
    { type: "body", text: commercialWhyValue(diagnosis) },
    { type: "space" },
    { type: "section", text: "PMM action plan" },
    ...pdfListItems(diagnosis.actions.map(sharpenAction)),
    { type: "space" },
    { type: "section", text: "Instead of / Say this" },
    { type: "body", text: `Instead of: ${architecture.rewritePanel.instead}` },
    { type: "body", text: `Say this: ${architecture.rewritePanel.sayThis}` },
    { type: "space" },
    { type: "section", text: "Executive alignment note" },
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
  const extracted = diagnosis.extractedConcepts?.product;
  if (extracted && extracted !== "this launch" && extracted !== "the launch" && isReliableLaunchName(extracted)) return extracted;
  const productName = extractProductName(diagnosis.beforeMessage);
  if (productName && productName !== "this launch" && productName !== "the launch" && isReliableLaunchName(productName)) return productName;
  const message = diagnosis.beforeMessage || "";
  if (/cognix/i.test(message)) return "GTM Story Drift Read";
  return "Current launch concept";
}

function isReliableLaunchName(value) {
  const name = String(value || "").trim();
  if (!name || name.length < 3 || name.length > 64) return false;
  if (/^the ai$/i.test(name)) return false;
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
  return `cognix-story-drift-read-${year}-${month}-${day}-${hours}${minutes}.pdf`;
}

render();
