const launchStages = [
  {
    id: "pre",
    title: "Analyze pre-launch risk",
    label: "Primary beta workflow",
    description: "Pressure-test whether your launch is likely to create demo intent before it goes live."
  },
  {
    id: "post",
    title: "Diagnose post-launch performance",
    label: "Secondary mode",
    description: "Find out why launch activity is not converting into demo requests or qualified pipeline."
  }
];

const previewMaps = [
  "Messaging fracture map",
  "Sales enablement fracture map",
  "Competitive fracture map",
  "Pipeline narrative fracture map"
];

const previewMessage = "This cognition map is being shaped with beta users. Start with the Launch conversion audit first.";

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
  "waiting for input",
  "no input",
  "no idea",
  "unknown",
  "placeholder"
]);

const bucketSets = {
  pre: [
    ["launch-message", "Launch message or positioning draft", "Announcement, positioning, headline, shipped capability, launch narrative", ["launch", "release", "announce", "feature", "capability", "shipped", "positioning", "headline"]],
    ["target-buyer", "Target buyer or ICP", "Buyer, segment, role, company stage, qualification context", ["buyer", "icp", "persona", "segment", "role", "cmo", "vp", "pmm", "mid-market", "enterprise", "startup"]],
    ["buyer-pain", "Buyer pain", "Problem, cost, broken workflow, trigger, why the buyer should care", ["pain", "problem", "manual", "slow", "risk", "cost", "waste", "miss", "confusion", "struggle", "broken"]],
    ["value-prop", "Value proposition", "Promise, outcome, business value, quantified impact", ["value", "helps", "reduce", "increase", "improve", "accelerate", "outcome", "benefit", "roi", "impact"]],
    ["campaign-copy", "Landing page or campaign copy", "Hero copy, paid/social/email copy, launch page sections", ["campaign", "landing", "homepage", "hero", "email", "ad", "page", "copy", "click"]],
    ["cta", "CTA", "Demo CTA, conversion ask, next step, form promise", ["cta", "demo", "request", "book", "schedule", "contact", "learn more", "next step", "trial"]],
    ["sales-talk-track", "Sales talk track", "Discovery script, rep talk track, launch FAQ, sales conversion support", ["sales", "rep", "ae", "talk track", "discovery", "demo", "enablement", "script"]],
    ["objections", "Objection notes", "Buyer pushback, status quo, timing, budget, pricing, packaging", ["objection", "already", "status quo", "budget", "pricing", "package", "packaging", "why now", "not urgent"]],
    ["competitive-framing", "Competitive framing", "Competitor claims, alternatives, why-us gaps, buying criteria", ["competitor", "competitive", "alternative", "versus", "vs", "unlike", "battlecard", "criteria"]],
    ["customer-proof", "Customer proof", "Customer quotes, metrics, proof points, examples, quantified pain", ["customer", "quote", "case study", "proof", "metric", "%", "result", "example", "saved", "reduced"]],
    ["launch-goal", "Planned launch goal", "PMM goal, demo request target, qualified demand target, conversion expectation", ["goal", "target", "demo requests", "qualified demand", "pipeline", "conversion", "launch-to-pipeline"]]
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
  "Reading launch signals",
  "Checking buyer urgency",
  "Inspecting the demo intent path",
  "Comparing sales feedback and objections",
  "Building the launch-to-pipeline verdict"
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
  diagnosis: null
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
          <span>Pre-launch risk analysis</span>
          <strong>Launch conversion audit</strong>
        </div>
        <button class="ghost-button" type="button" data-action="reset">Start another check</button>
      </header>

      <main class="workspace">
        ${state.step < 4 ? progressRail() : ""}
        <section class="stage ${state.step === 4 ? "result-stage" : ""}">
          ${renderCurrentStep()}
        </section>
      </main>
    </div>`;

  bindEvents();
}

function progressRail() {
  const labels = ["Choose stage", "Add signals", "Confirm KPI", "Run check", "Aha result"];
  return `
    <aside class="progress-rail" aria-label="Launch conversion audit progress">
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
      <span class="eyebrow">Launch conversion audit beta</span>
      <h1>What stage is your launch in?</h1>
      <p>Cognix pressure-tests launch-to-pipeline conversion, starting with whether your launch will create demo intent or just awareness.</p>
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
    ${stageActions({ next: state.launchMode === "pre" ? "Start Launch conversion audit" : "Start post-launch diagnosis" })}`;
}

function addSignalsScreen() {
  const buckets = activeBuckets();
  const attachedCount = state.attachedFiles.length;
  const sortedCount = meaningfulAreas().length;
  const pre = state.launchMode === "pre";
  return `
    <div class="stage-header">
      <span class="eyebrow">${pre ? "Pre-launch risk check" : "Post-launch performance diagnosis"}</span>
      <h1>${pre ? "Will this launch create demo intent, or just awareness?" : "Why did this launch create activity but not demo intent?"}</h1>
      <p>${pre ? "Paste the launch inputs you have before launch day. Cognix checks whether the message, proof, CTA, and sales conversion path are strong enough to create qualified demand." : "Paste performance, feedback, and conversion signals. Cognix checks why activity did not become demo intent or qualified pipeline."}</p>
    </div>

    <div class="intake-console" data-drop-zone>
      <div class="drop-zone">
        <span>${pre ? "Open pre-launch intake" : "Open post-launch intake"}</span>
        <h2>Paste messy launch notes or upload text files.</h2>
        <p>${pre ? "Cognix only uses pasted signals and uploaded text for now: positioning drafts, landing page copy, sales talk tracks, objections, proof, competitive framing, and launch goals." : "Cognix only uses pasted signals and uploaded text for now: campaign performance, demo request results, CRM notes, sales feedback, objections, reactions, and pipeline signals."}</p>
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
          <span>Messy launch dump</span>
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
        <strong>Cognix sorted your signals into these areas.</strong>
        <span>Add more context only where it helps the diagnosis.</span>
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
      <h1>${pre ? "Pressure-test launch-to-pipeline conversion before launch day." : "Diagnose the launch-to-pipeline performance gap."}</h1>
      <p>The first measurable beta signal is demo intent. Cognix checks whether launch activity is likely to become qualified demand.</p>
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
        <small>${pre ? "Example: create demo intent from launch traffic, generate qualified demand, reduce launch-to-pipeline risk." : "Example: high campaign engagement, low demo requests, weak landing page conversion, limited qualified pipeline."}</small>
      </label>
    </div>
    ${stageActions({ back: "Back", next: pre ? "Run pre-launch risk check" : "Run post-launch diagnosis" })}`;
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
          <span class="eyebrow">Launch conversion risk</span>
          <h1>Reading launch signals against demo intent.</h1>
          <p>Cognix is checking buyer urgency, CTA strength, proof, sales conversion path, objections, competitive framing, and launch-to-pipeline risk.</p>
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
  return `
    <section class="executive-digest" aria-label="${pre ? "Launch-to-pipeline risk" : "Launch-to-pipeline performance gap"}">
      <div class="digest-topline">
        <span>${pre ? "Launch conversion verdict" : "Launch performance verdict"}</span>
        <div>
          <b>Signal coverage</b>
          <strong>${esc(diagnosis.signalCoverage.label)}</strong>
        </div>
        <div>
          <b>Evidence areas</b>
          <strong>${diagnosis.coverage.count} of ${diagnosis.coverage.total} areas</strong>
        </div>
      </div>

      <div class="digest-hero">
        <div class="digest-fracture">
          <span>A. Launch conversion verdict</span>
          <h2>${esc(diagnosis.verdict)}</h2>
          <p>${esc(diagnosis.demoIntentRisk)}</p>
        </div>
        <aside class="digest-score-card verdict-card">
          <span>B. Demo intent risk</span>
          <strong>${esc(diagnosis.riskLabel)}</strong>
          <p>${esc(diagnosis.signalCoverage.note)}</p>
        </aside>
      </div>

      <div class="impact-strip">
        ${diagnosis.kpiDrivers.map((item) => `
          <article>
            <span>${esc(item.title)}</span>
            <p>${esc(item.body)}</p>
          </article>`).join("")}
      </div>

      <div class="belief-strip">
        <div class="digest-section-head">
          <span>Evidence from your signals</span>
          <strong>${diagnosis.evidence.length ? "Pulled from entered launch material" : "No strong evidence snippets found"}</strong>
        </div>
        <div class="belief-grid evidence-grid">
          ${diagnosis.evidence.map((item) => `
            <article>
              <b>${esc(item.source)}</b>
              <p>${esc(item.snippet)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function resultScreen() {
  const diagnosis = state.diagnosis || diagnoseLaunch();
  if (diagnosis.paused) return pausedResultScreen(diagnosis);
  const pre = diagnosis.mode === "pre";
  return `
    <div class="result-command">
      ${executiveDigest(diagnosis)}
      <section class="result-hero">
        <div>
          <span class="eyebrow">${pre ? "Pre-launch risk analysis" : "Post-launch performance diagnosis"}</span>
          <h1>${pre ? "Launch conversion audit" : "Launch conversion diagnosis"}</h1>
          <p>${esc(diagnosis.coreSentence)}</p>
        </div>
        <div class="score-command memo-command">
          <span>${esc(diagnosis.signalCoverage.label)}</span>
          <strong>Launch fracture map</strong>
        </div>
      </section>

      <section class="risk-map">
        <div class="map-node input">Messy GTM signals</div>
        <div class="map-line line-a"></div>
        <div class="map-node center">Fracture detection</div>
        <div class="map-line line-b"></div>
        <div class="map-node output">CMO-ready memo</div>
      </section>

      <section class="result-grid">
        <article class="result-card primary">
          <span>C. Causal diagnosis</span>
          <h2>${esc(diagnosis.causalDiagnosis)}</h2>
        </article>
        <article class="result-card">
          <span>E. Fracture pattern</span>
          <h2>${esc(diagnosis.pattern)}</h2>
        </article>
        <article class="result-card">
          <span>Buyer urgency</span>
          <h3>${esc(diagnosis.buyerUrgency)}</h3>
        </article>
        <article class="result-card">
          <span>Sales conversion path</span>
          <h3>${esc(diagnosis.salesPath)}</h3>
        </article>
        <article class="result-card implication">
          <span>F. GTM implication</span>
          <h3>${esc(diagnosis.implication)}</h3>
        </article>
      </section>

      <section class="deep-grid">
        <article class="board-card">
          <span>Signal coverage</span>
          <ul>
            ${diagnosis.coverage.notes.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="board-card correction">
          <span>G. ${pre ? "PMM action plan" : "PMM recovery plan"}</span>
          <ol>
            ${diagnosis.actions.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ol>
        </article>
      </section>

      <section class="rewrite-section">
        <div class="digest-section-head">
          <span>H. Before / after messaging rewrite</span>
          <strong>Pain-led launch message</strong>
        </div>
        <div class="rewrite-grid">
          <article>
            <span>Before</span>
            <p>${esc(diagnosis.beforeMessage)}</p>
          </article>
          <article>
            <span>After</span>
            <p>${esc(diagnosis.afterMessage)}</p>
          </article>
        </div>
      </section>

      <section class="memo-section">
        <div class="digest-section-head">
          <span>I. CMO-ready launch risk memo</span>
          <strong>J. Shareable artifact</strong>
        </div>
        <textarea class="memo-copy-block" readonly data-memo-copy>${esc(diagnosis.memo)}</textarea>
        <div class="action-console memo-actions">
          <button type="button" data-action="copy-memo">Copy memo</button>
          <button type="button" data-action="reset">Start another audit</button>
        </div>
      </section>
      ${state.actionMessage ? `<div class="toast">${esc(state.actionMessage)}</div>` : ""}
    </div>`;
}

function pausedResultScreen(diagnosis) {
  return `
    <div class="result-command paused-command">
      <section class="paused-hero" aria-label="Data deficiency">
        <div>
          <span class="eyebrow">Data deficiency</span>
          <h1>${esc(diagnosis.verdict)}</h1>
          <p>${esc(diagnosis.causalDiagnosis)}</p>
        </div>
        <aside class="paused-status">
          <span>Signal coverage</span>
          <strong>${esc(diagnosis.signalCoverage.label)}, ${diagnosis.coverage.count} of ${diagnosis.coverage.total} areas</strong>
          <small>Demo intent risk: ${esc(diagnosis.demoIntentRisk)}</small>
        </aside>
      </section>

      <section class="paused-grid">
        <article class="result-card">
          <span>Evidence</span>
          <h3>No evidence available yet because the audit does not have enough launch context.</h3>
        </article>
        <article class="result-card">
          <span>Before / after rewrite</span>
          <h3>Awaiting launch context. Add more signal coverage to unlock message direction.</h3>
        </article>
      </section>

      <section class="deep-grid">
        <article class="board-card correction">
          <span>PMM action plan</span>
          <ol>
            ${diagnosis.actions.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ol>
        </article>
        <article class="board-card">
          <span>Signal coverage</span>
          <ul>
            ${diagnosis.coverage.notes.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </article>
      </section>

      <section class="memo-section">
        <div class="digest-section-head">
          <span>CMO memo</span>
          <strong>Paused artifact</strong>
        </div>
        <textarea class="memo-copy-block paused-memo" readonly>${esc(diagnosis.memo)}</textarea>
        <div class="action-console memo-actions">
          <button type="button" data-action="add-signals">Add more signals</button>
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
      render();
    });
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
      state.actionMessage = "CMO-ready launch risk memo copied.";
    } catch (_error) {
      state.actionMessage = "Memo is ready to copy from the block.";
    }
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
  return text.length > max ? `${text.slice(0, max - 3).trim()}...` : text;
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
  const signals = Object.entries(state.signals)
    .map(([id, value]) => ({
      id,
      title: activeBuckets().find((bucket) => bucket.id === id)?.title || "Launch signal",
      text: String(value || "").trim()
    }))
    .filter((signal) => isMeaningfulSignalText(signal.text));
  const allText = signals.map((signal) => signal.text).join("\n").toLowerCase();
  const has = buildSignalFlags(signals, allText);
  const coverage = buildCoverage(signals, has);
  if (coverage.count < 3) return buildPausedDiagnosis(coverage);
  const fractures = buildFractures(has, allText);
  const rankedFractures = prioritizeFractures(fractures, has);
  const ranked = has.strongLaunch ? buildReadinessFindings(signals, has) : rankedFractures.length ? rankedFractures : [{
    title: "Limited launch signal coverage",
    body: "There is not enough launch evidence yet to isolate the launch-to-pipeline fracture.",
    action: "Add launch message, buyer pain, CTA, sales or objection signals, proof, and conversion signals before using this result with stakeholders.",
    evidence: firstAvailableEvidence(signals)
  }];
  const top = ranked[0];
  const riskScore = scoreRisk(ranked, coverage, has);
  const riskLabel = has.strongLaunch ? "Low" : riskScore >= 76 ? "High" : riskScore >= 56 ? "Medium-high" : riskScore >= 38 ? "Medium" : "Low-medium";
  const signalCoverage = computeSignalCoverage(coverage, has);
  const evidence = ranked.flatMap((fracture) => fracture.evidence).filter(Boolean).slice(0, 4);
  const fallbackEvidence = evidence.length ? evidence : firstAvailableEvidence(signals).slice(0, 4);
  const actions = unique(ranked.map((fracture) => fracture.action)).slice(0, has.strongLaunch ? 3 : 6);
  const pattern = ranked.slice(0, 4).map((fracture) => fracture.title).join(", ");
  const pre = state.launchMode === "pre";
  const nextMove = actions[0] || "Add sharper launch signals and rerun the map.";
  const causalDiagnosis = buildCausalDiagnosis(ranked, fallbackEvidence, has, pre);
  const beforeMessage = deriveBeforeMessage(signals);
  const afterMessage = buildPainLedRewrite(has, signals, beforeMessage);
  const verdict = `${riskLabel} launch-to-pipeline risk`;
  const demoIntentRisk = buildDemoIntentRisk(riskLabel, top, has, pre);
  const implication = buildBusinessImplication(riskLabel, top, has, pre);
  const memo = buildCmoMemo({
    verdict,
    demoIntentRisk,
    causalDiagnosis,
    evidence: fallbackEvidence,
    pattern,
    implication,
    actions,
    signalCoverage,
    afterMessage,
    strongLaunch: has.strongLaunch
  });

  return {
    mode: state.launchMode,
    riskScore,
    riskLabel,
    signalCoverage,
    coverage,
    evidence: fallbackEvidence,
    actions,
    pattern,
    scoreName: pre ? "Launch-to-pipeline risk" : "Performance gap",
    verdict,
    demoIntentRisk,
    causalDiagnosis,
    buyerUrgency: has.buyerPain && has.urgency ? "Buyer pain and urgency are present, but they need to be tied tightly to the demo ask." : "Buyer urgency is not strong enough to make demo action feel necessary.",
    salesPath: has.salesSignal ? "Sales or objection signals are present, so the correction can connect launch narrative to field conversion." : "Sales conversion path is thin, so the launch cannot yet prove reps can convert interest into qualified demand.",
    implication,
    beforeMessage,
    afterMessage,
    memo,
    coreSentence: has.strongLaunch
      ? "Signals entered by the PMM show a launch conversion path with clear ICP, pain, proof, urgency, CTA, and sales support. Cognix recommends carrying this message through consistently and monitoring handoff execution."
      : `Signals entered by the PMM were interpreted through the Launch fracture map: ${top.title.toLowerCase()} is creating ${riskLabel.toLowerCase()} risk to demo intent, so the next move is to ${nextMove.toLowerCase()}`,
    kpiDrivers: [
      { title: "Buyer urgency", body: has.urgency ? "Some urgency signal is present." : "Urgency is weak or missing." },
      { title: "Demo intent", body: has.strongCta ? "The CTA supports demo intent." : "The CTA is passive or unclear." },
      { title: "Sales conversion path", body: has.salesSignal ? "Sales or objection signals can guide the fix." : "Sales conversion support is missing." },
      { title: "Qualified demand", body: has.qualifiedDemand ? "Qualified demand is referenced." : "Qualified demand is not clearly connected to the launch." }
    ]
  };
}

function buildPausedDiagnosis(coverage) {
  const count = coverage.count;
  const signalCoverage = {
    label: "Low",
    note: `Low, ${count} of ${coverage.total} areas`
  };
  const causalDiagnosis = `Cognix needs at least 3 meaningful launch signals to generate a reliable Launch Conversion Audit. The current input only includes ${count} of ${coverage.total} signal areas, so the system cannot identify real fracture patterns without guessing.`;
  const actions = [
    "Add your launch message, positioning draft, or landing page copy.",
    "Add the target buyer or ICP and the buyer pain you want to activate.",
    "Add the CTA, sales feedback, competitive context, customer proof, or launch goal.",
    "Re-run the Launch Conversion Audit once at least 3 signal areas are populated."
  ];
  const memo = [
    "Subject: Launch Conversion Audit paused: missing GTM inputs",
    "",
    "Cognix paused the audit because signal coverage is too low to generate a reliable executive read. Add at least 3 meaningful launch signals to unlock the launch-to-pipeline risk verdict, evidence trail, PMM action plan, and CMO-ready memo."
  ].join("\n");

  return {
    paused: true,
    mode: state.launchMode,
    riskScore: null,
    riskLabel: "Undetermined",
    signalCoverage,
    coverage,
    evidence: [],
    actions,
    pattern: "Awaiting launch context",
    scoreName: "Launch-to-pipeline risk",
    verdict: "Audit paused: not enough launch signal",
    demoIntentRisk: "Undetermined",
    causalDiagnosis,
    buyerUrgency: "Awaiting input",
    salesPath: "Awaiting input",
    implication: "Awaiting input",
    beforeMessage: "Awaiting launch context.",
    afterMessage: "Awaiting launch context. Add more signal coverage to unlock message direction.",
    memo,
    coreSentence: causalDiagnosis,
    kpiDrivers: []
  };
}

function buildSignalFlags(signals, allText) {
  const area = (id) => signals.some((signal) => signal.id === id && isMeaningfulSignalText(signal.text));
  const ctaText = signals.find((signal) => signal.id === "cta")?.text.toLowerCase() || "";
  const objectionText = [
    signals.find((signal) => signal.id === "objections")?.text || "",
    signals.find((signal) => signal.id === "sales-talk-track")?.text || "",
    signals.find((signal) => signal.id === "sales-feedback")?.text || ""
  ].join("\n").toLowerCase();
  const explicitDemoCta = hasAny(ctaText, ["request a demo", "book a demo", "schedule a demo", "contact sales", "talk to sales"]);
  const passivePrimaryCta = hasAny(ctaText, ["primary cta is learn more", "primary cta: learn more", "cta is learn more"]);
  const meaning = interpretMeaning(allText);
  const hasObjectionSignal = area("objections") || meaning.whyNowObjection || hasAny(objectionText || allText, ["objection", "already", "budget", "pricing", "package", "not urgent", "why now", "later", "next quarter"]);
  const addressedObjection = hasObjectionSignal && hasAny(objectionText, ["response", "respond", "answer", "rebuttal", "faq", "we answer", "we handle", "we explain", "because", "proof", "talk track", "if prospects say"]);
  const competitiveClarity = !meaning.competitorOwnsPain && (!area("competitive-framing") || hasAny(allText, ["unlike", "different", "why us", "criteria", "better than", "shows the handoff risks", "threaten qualified demand"]));
  const clearIcp = area("target-buyer") || hasAny(allText, ["revops leaders", "pmm", "product marketing", "demand generation", "gtm leaders", "series b", "series c"]);
  const clearValueProp = area("value-prop") || hasAny(allText, ["helps", "protect", "reduce", "increase", "identify", "fix", "prevent"]);
  const salesSupport = area("sales-talk-track") || area("sales-feedback") || addressedObjection;
  const proofPresent = !meaning.proofGap && hasAny(allText, ["customer", "quote", "case study", "proof", "metric", "%", "result", "saved", "reduced", "increased"]);
  return {
    launchMessage: area("launch-message") || area("campaign-copy"),
    buyerPain: meaning.buyerPain || hasAny(allText, ["pain", "problem", "manual", "slow", "risk", "cost", "broken", "missed", "confusion", "struggle", "handoff", "stalled"]),
    weakBuyerPain: meaning.weakBuyerPain,
    urgency: meaning.urgency || hasAny(allText, ["urgent", "urgency", "now", "this quarter", "deadline", "delay", "wait", "too late", "before", "risk", "why now", "planning cycle"]),
    strongCta: explicitDemoCta && !passivePrimaryCta,
    passiveCta: meaning.passiveCta || hasAny(allText, ["learn more", "read more", "explore", "see more"]),
    proof: proofPresent,
    quantifiedImpact: hasAny(allText, ["%", "$", "hours", "days", "revenue", "pipeline", "cost", "roi", "qualified demand"]),
    salesSignal: area("sales-talk-track") || area("sales-feedback") || area("objections") || meaning.salesConfusion || hasAny(allText, ["sales", "rep", "ae", "field", "prospect", "discovery", "talk track", "objection"]),
    weakSalesPath: meaning.salesConfusion,
    competitive: area("competitive-framing") || area("competitive-feedback") || meaning.competitorOwnsPain || hasAny(allText, ["competitor", "competitive", "alternative", "versus", "vs", "battlecard"]),
    competitorOwnsPain: meaning.competitorOwnsPain,
    addressedObjection,
    objections: hasObjectionSignal && !addressedObjection,
    performance: area("demo-result") || area("campaign-engagement") || area("landing-conversion") || area("pipeline-signal") || hasAny(allText, ["click", "traffic", "conversion", "demo request", "requests", "flat", "ctr", "activity", "visits"]),
    activityNoIntent: meaning.activityNoIntent || (hasAny(allText, ["high engagement", "above benchmark", "traffic", "clicks", "visits", "activity"]) && hasAny(allText, ["flat", "low demo", "few demo", "did not", "not converting", "low conversion", "lag"])),
    weakDemoIntent: meaning.weakDemoIntent,
    featureHeavy: meaning.featureHeavy || hasAny(allText, ["feature", "dashboard", "automated", "filters", "timeline", "capability", "shipped", "release", "new"]),
    proofGap: meaning.proofGap,
    unclearIcp: !clearIcp && !hasAny(allText, ["buyer", "icp", "persona", "revops", "pmm", "vp", "cmo", "sales manager"]),
    qualifiedDemand: hasAny(allText, ["qualified demand", "qualified pipeline", "sales accepted", "opportunity", "pipeline"]),
    competitiveClarity,
    clearValueProp,
    salesSupport,
    strongLaunch: clearIcp && (meaning.buyerPain || hasAny(allText, ["handoff", "stalled", "missed pipeline", "pipeline risk"])) && clearValueProp && explicitDemoCta && !passivePrimaryCta && (meaning.urgency || hasAny(allText, ["before launch", "before launch day", "quarter-end", "planning"])) && proofPresent && competitiveClarity && salesSupport && !meaning.salesConfusion
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
  addFracture(fractures, has.featureHeavy && (!has.buyerPain || has.weakBuyerPain || has.weakDemoIntent), "Feature-heavy message", "The launch explains what is shipping before it makes the buyer pain costly.", "Rewrite the headline around buyer pain, not shipped capability.", ["feature", "dashboard", "capability", "shipped", "release", "business problem", "what it does", "mostly explain"]);
  addFracture(fractures, !has.buyerPain || has.weakBuyerPain, "Weak buyer pain", "The signals do not give buyers a sharp enough problem to recognize themselves.", "Add quantified pain that names what breaks when the buyer keeps the current workflow.", ["pain", "problem", "manual", "risk", "cost", "not fully defined", "visibility"]);
  addFracture(fractures, !has.urgency, "Unclear buyer urgency", "The launch does not make a strong case for why a buyer should act now.", "Add urgency proof that explains why buyers should act before launch momentum fades.", ["urgent", "urgency", "now", "wait", "why now", "this quarter"]);
  addFracture(fractures, !has.strongCta || has.passiveCta, "Passive CTA", "The conversion ask is not strong enough to turn launch interest into demo intent.", "Replace passive CTA language with a demo-intent CTA.", ["learn more", "demo", "request", "book", "cta"]);
  addFracture(fractures, !has.proof || has.proofGap, "Missing customer proof", "The launch asks buyers to believe the claim without enough proof or quantified pain.", "Add customer proof or quantified pain to the launch page.", ["customer", "proof", "metric", "quote", "result", "no proof"]);
  addFracture(fractures, has.unclearIcp, "Unclear ICP", "The launch does not clearly choose the buyer most likely to request a demo.", "Clarify the ICP and the buying trigger.", ["buyer", "icp", "persona", "segment", "role"]);
  addFracture(fractures, !has.salesSignal || has.weakSalesPath, "Weak sales conversion path", "Sales does not yet have a clear path from launch interest to a qualified demo conversation.", "Create a 3-line sales talk track that connects buyer pain, why now, and the demo ask.", ["sales", "rep", "talk track", "discovery", "prospect", "explain"]);
  addFracture(fractures, has.objections, "Unresolved objections", "Buyer pushback is visible and needs an explicit response before reps can convert interest.", "Add an objection response for why now.", ["objection", "already", "budget", "pricing", "why now"]);
  addFracture(fractures, has.competitive && (has.competitorOwnsPain || !hasAny(allText, ["unlike", "different", "why us", "criteria", "better than"])), "Competitive differentiation gap", "Competitive pressure is present, but the launch does not clearly change buying criteria.", "Add a why-us contrast that reframes the problem more sharply than competitors.", ["competitor", "competitive", "alternative", "criteria", "owns the pain"]);
  addFracture(fractures, !has.quantifiedImpact, "Missing quantified business impact", "The launch does not quantify why the problem is expensive enough to prioritize.", "Add customer proof or quantified pain tied to pipeline, time, cost, or revenue impact.", ["pipeline", "revenue", "cost", "roi", "%", "hours"]);
  addFracture(fractures, has.activityNoIntent, "Launch activity without qualified demand", "The launch created attention, but the signals show demo intent or qualified pipeline did not follow.", "Run a follow-up campaign around the pain, not the feature.", ["click", "traffic", "activity", "flat", "low demo", "not converting"]);
  addFracture(fractures, has.weakDemoIntent, "Weak demo intent", "The buyer may understand the product without seeing a reason to request a demo.", "Connect the message and CTA to the buying trigger that makes a demo worth booking now.", ["understand", "get what it does", "not asking", "no demos", "demo"]);
  return fractures;
}

function addFracture(fractures, condition, title, body, action, evidenceTerms) {
  if (!condition) return;
  fractures.push({ title, body, action, evidence: findEvidence(evidenceTerms) });
}

function prioritizeFractures(fractures, has) {
  if (!fractures.length) return [];
  const order = [];
  if (has.featureHeavy && (has.weakBuyerPain || !has.buyerPain)) order.push("Feature-heavy message", "Weak buyer pain");
  if (has.weakSalesPath) order.push("Weak sales conversion path");
  if (has.competitorOwnsPain) order.push("Competitive differentiation gap");
  if (has.passiveCta && has.buyerPain && !has.weakBuyerPain) order.push("Passive CTA");
  if (has.activityNoIntent) order.push("Launch activity without qualified demand");
  if (has.weakDemoIntent) order.push("Weak demo intent");
  order.push("Feature-heavy message", "Weak buyer pain", "Passive CTA", "Competitive differentiation gap", "Weak sales conversion path", "Unclear buyer urgency", "Unresolved objections", "Missing customer proof", "Missing quantified business impact", "Unclear ICP");

  return [...fractures].sort((a, b) => {
    const aIndex = order.indexOf(a.title);
    const bIndex = order.indexOf(b.title);
    return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex);
  });
}

function buildReadinessFindings(signals, has) {
  return [{
    title: "Launch conversion path is well supported",
    body: "The launch has clear ICP, buyer pain, proof, urgency, direct CTA, and sales or objection support.",
    action: "Carry the same pain-led message, proof, and demo CTA through launch page, campaign, and sales follow-through.",
    evidence: firstAvailableEvidence(signals).slice(0, 3)
  }, {
    title: has.addressedObjection ? "Objections are addressed" : "Monitor sales follow-through",
    body: has.addressedObjection ? "Buyer pushback appears to have a response path." : "The main watchout is keeping the sales path consistent after launch.",
    action: "Monitor demo quality and rep feedback during launch week.",
    evidence: findEvidence(["objection", "already", "reps explain", "talk track", "book a demo"]).slice(0, 2)
  }];
}

function buildCausalDiagnosis(fractures, evidence, has, pre) {
  const top = fractures[0];
  const second = fractures.find((item) => item.title !== top.title);
  const firstEvidence = evidence[0];
  const secondEvidence = evidence.find((item) => item.source !== firstEvidence?.source) || evidence[1];
  if (!top) return "Cognix needs more pasted or uploaded launch signals before it can explain the launch-to-pipeline risk.";

  if (has.strongLaunch) {
    return "The launch has the core conversion conditions Cognix expects before launch: a clear ICP, a concrete buyer pain, urgency, proof, a demo-intent CTA, and sales or objection support. The remaining work is execution consistency, not a major conversion-risk fix.";
  }

  const inputSignal = firstEvidence
    ? `${firstEvidence.source} says "${firstEvidence.snippet}"`
    : "The provided launch inputs are thin";
  const secondSignal = secondEvidence
    ? ` Another signal says "${secondEvidence.snippet}"`
    : "";
  const pairedFracture = second ? ` and ${second.title.toLowerCase()}` : "";

  if (top.title === "Passive CTA" && (has.weakDemoIntent || has.weakSalesPath)) {
    return `${inputSignal}.${secondSignal} Together, this points to ${top.title.toLowerCase()}${pairedFracture}: the launch may create interest, but buyers and reps do not have a clear path from awareness to a qualified demo conversation. PMM should make the demo ask explicit and tie it to the buying trigger.`;
  }

  if (top.title === "Launch activity without qualified demand" || has.activityNoIntent) {
    return `${inputSignal}.${secondSignal} That combination indicates activity without qualified demand: the launch is getting attention, but the message is not converting that attention into demo intent or pipeline movement. PMM should shift the follow-up from launch activity to buyer pain, proof, and the demo path.`;
  }

  if (top.title === "Feature-heavy message") {
    return `${inputSignal}.${secondSignal} Cognix detects a feature-heavy message${pairedFracture}: the launch explains what changed in the product before it makes the buyer problem expensive or urgent. That weakens launch-to-pipeline conversion because buyers can understand the release without feeling a reason to book time. PMM should reframe the message around pain, impact, and why now.`;
  }

  if (top.title === "Competitive differentiation gap") {
    return `${inputSignal}.${secondSignal} The competitive signal suggests the market may understand the problem through another frame. If Cognix does not make the pain and why-us contrast explicit, the launch can create awareness while competitors own the buying criteria. PMM should add a sharper contrast around the buyer problem and business impact.`;
  }

  if (top.title === "Missing customer proof") {
    return `${inputSignal}.${secondSignal} This creates a proof gap: the launch asks buyers to believe the claim without enough customer evidence or quantified pain. That weakens demo intent because buyers do not yet have confidence that the problem is expensive enough to prioritize. PMM should add proof before launch day.`;
  }

  if (top.title === "Weak sales conversion path") {
    return `${inputSignal}.${secondSignal} Cognix detects weak sales conversion path: the launch may create interest, but reps do not yet have a crisp way to turn that interest into a qualified demo conversation. PMM should create the pain-to-demo talk track and answer the why-now objection before launch day.`;
  }

  const mode = pre ? "Before launch" : "After launch";
  return `${inputSignal}.${secondSignal} ${mode}, this points to ${top.title.toLowerCase()}${pairedFracture}. It affects launch-to-pipeline conversion because the buyer does not have a clear enough reason to move from interest to a demo request. PMM should fix the highest-risk fracture before launch momentum is spent.`;
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
  if (!pre) return "Campaign engagement may look healthy, but pipeline conversion will likely lag unless the launch narrative is reframed around buyer pain and urgency.";
  if (top.title === "Feature-heavy message") return "If this ships as-is, buyers may understand the release but still lack a business reason to request a demo.";
  if (top.title === "Passive CTA") return "If the CTA remains passive, launch engagement may leak before it becomes demo requests.";
  if (top.title === "Competitive differentiation gap") return "If competitors own the pain frame, this launch may drive attention while another vendor shapes the buying criteria.";
  if (top.title === "Weak sales conversion path") return "If sales cannot explain the launch in pain-led terms, launch-sourced conversations may stay curious rather than qualified.";
  if (riskLabel === "High") return "If this ships as-is, the launch may generate engagement but demo requests may underperform because buyers do not have a clear reason to book time.";
  return "The launch can still convert, but PMM should tighten the highest-risk fracture before launch momentum is spent.";
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
    .filter((signal) => coreLaunchSignalIds.includes(signal.id) && isMeaningfulSignalText(signal.text))
    .map((signal) => signal.id);
  const missing = coreBuckets.filter((bucket) => !present.includes(bucket.id)).map((bucket) => bucket.title);
  const count = new Set(present).size;
  const total = coreLaunchSignalIds.length;
  const notes = [
    `${count} of ${total} launch signal areas have meaningful content.`,
    missing.length ? `Missing or thin areas: ${missing.slice(0, 5).join(", ")}.` : "All launch signal areas have content.",
    count >= 3 && has.launchMessage && has.buyerPain && (has.strongCta || has.passiveCta) && has.salesSignal
      ? "Core launch conversion signals are present."
      : "Core conversion signals are incomplete. Add launch message, buyer pain, CTA, and sales or objection signal."
  ];
  return { count, total, missing, notes };
}

function computeSignalCoverage(coverage, has) {
  if (coverage.count >= 7) return { label: "Strong", note: "Seven or more meaningful launch signal areas are present." };
  if (coverage.count >= 3) return { label: "Medium", note: "Three to six meaningful launch signal areas are present." };
  return { label: "Low", note: "Fewer than three meaningful launch signal areas are present." };
}

function deriveBeforeMessage(signals) {
  const preferred = signals.find((signal) => ["launch-message", "campaign-copy"].includes(signal.id)) || signals[0];
  if (!preferred) return "No launch message was provided.";
  return truncate(preferred.text.replace(/^(Launch message or positioning draft|Landing page or campaign copy|Launch page or campaign copy):\s*/i, ""), 260);
}

function buildPainLedRewrite(has, signals, beforeMessage) {
  const buyerSignal = signals.find((signal) => signal.id === "target-buyer")?.text || "";
  const painSignal = signals.find((signal) => signal.id === "buyer-pain")?.text || "";
  const valueSignal = signals.find((signal) => signal.id === "value-prop")?.text || "";
  const messageSignal = signals.find((signal) => signal.id === "launch-message")?.text || beforeMessage;
  const buyer = isMeaningfulSignalText(buyerSignal) && !has.unclearIcp
    ? extractBuyerValue(buyerSignal, "Awaiting input")
    : "Awaiting input";
  const pain = isMeaningfulSignalText(painSignal)
    ? extractPainValue(painSignal, "Awaiting input")
    : "Awaiting input";
  const product = extractProductName(messageSignal);
  const outcome = isMeaningfulSignalText(valueSignal)
    ? extractOutcomeValue(valueSignal, "Awaiting input")
    : "Awaiting input";
  const friction = extractStatusQuoFriction(signals, "Awaiting input");
  const cta = has.strongCta ? "Book a demo" : "Request a launch conversion audit";
  if (beforeMessage === "No launch message was provided.") {
    return `${cta} to show ${buyer} why ${pain} matters now and what to fix before launch day.`;
  }
  return `For ${stripTerminalPunctuation(buyer)} struggling with ${stripTerminalPunctuation(pain).toLowerCase()}, ${product} helps ${stripTerminalPunctuation(outcome).toLowerCase()} without ${stripTerminalPunctuation(friction).toLowerCase()}. ${cta}.`;
}

function buildCmoMemo({ verdict, demoIntentRisk, causalDiagnosis, evidence, pattern, implication, actions, signalCoverage, afterMessage, strongLaunch }) {
  const usefulEvidence = evidence.filter((item) => item.snippet && item.snippet.length > 8).slice(0, 3);
  const evidenceLines = usefulEvidence.length
    ? usefulEvidence.map((item) => `- ${item.source}: "${item.snippet}"`).join("\n")
    : "- Signal coverage is limited; Cognix needs more pasted launch inputs before this can be treated as a leadership-ready read.";
  const actionLines = actions.length
    ? actions.slice(0, 3).map((item) => `- ${sharpenAction(item)}`).join("\n")
    : "- Add launch message, buyer pain, CTA, sales path, objections, competitive framing, proof, and launch goal before final launch review.";
  const subject = strongLaunch
    ? "Subject: Launch conversion readiness looks supported"
    : `Subject: ${verdict} before launch`;
  const memo = [
    subject,
    "",
    `Verdict: ${strongLaunch ? "Proceed, with launch-week monitoring." : verdict + "."}`,
    `Demo intent: ${demoIntentRisk}`,
    "",
    `Why: ${tightenSentence(causalDiagnosis)}`,
    "",
    usefulEvidence.length ? "Evidence:" : "Evidence gap:",
    evidenceLines,
    "",
    `${strongLaunch ? "Readiness pattern" : "Dominant fracture"}: ${pattern}.`,
    `Business implication: ${implication}`,
    "",
    strongLaunch ? "Recommended launch-week controls:" : "Recommended fixes before launch:",
    actionLines,
    "",
    `Message direction: ${afterMessage}`,
    "",
    `Signal coverage: ${signalCoverage.label}. ${signalCoverage.note}`
  ];
  if (strongLaunch) {
    memo.push("", "Decision needed: Confirm launch readiness and keep PMM/Sales aligned on the same pain-led CTA during launch week.");
  } else if (verdict.toLowerCase().includes("high") || verdict.toLowerCase().includes("medium-high")) {
    memo.push("", "Decision needed: Ship as-is or pause for a focused conversion fix before launch day.");
  }
  return memo.join("\n");
}

function sharpenAction(action) {
  return String(action || "")
    .replace("Replace passive CTA language with a demo-intent CTA.", "Move the primary CTA from passive learning to a direct demo-intent ask.")
    .replace("Rewrite the headline around buyer pain, not shipped capability.", "Rewrite the lead message around the buyer pain and business cost, not the shipped capability.")
    .replace("Create a 3-line sales talk track that connects buyer pain, why now, and the demo ask.", "Give sales a 3-line talk track that connects pain, why now, and why to book a demo.")
    .replace("Add a why-us contrast that reframes the problem more sharply than competitors.", "Add a why-us contrast that makes the buyer pain and buying criteria sharper than the competitor frame.");
}

function tightenSentence(text) {
  return String(text || "")
    .replace(/Cognix detects /g, "")
    .replace(/PMM should /g, "Recommended fix: ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFieldValue(text, fallback) {
  const cleaned = String(text || "")
    .replace(/^(Launch message or positioning draft|Landing page copy|Landing page or campaign copy|Launch page or campaign copy|Target buyer or ICP|Buyer pain|Value proposition|CTA|Sales talk track|Objection notes|Competitive framing|Customer proof|Planned launch goal):\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned ? truncate(cleaned, 180) : fallback;
}

function extractBuyerValue(text, fallback) {
  const cleaned = extractFieldValue(text, "");
  if (!cleaned) return fallback;
  const roleMatch = cleaned.match(/(?:says\s+)?([^,.]+(?:leaders|managers|teams|buyers|PMMs|CMOs|operators|marketers))/i);
  return roleMatch ? roleMatch[1].replace(/^the draft says\s+/i, "").trim() : truncate(cleaned, 90);
}

function extractProductName(text) {
  const cleaned = extractFieldValue(text, "the launch");
  const launchMatch = cleaned.match(/(?:launching|launch|release|announcing)\s+([^,.;]+?)(?:,|\s+helps|\s+for|\s+with|$)/i);
  if (launchMatch?.[1]) return launchMatch[1].trim();
  return "this launch";
}

function extractPainValue(text, fallback) {
  const cleaned = extractFieldValue(text, "");
  if (!cleaned) return fallback;
  if (/not fully defined|not defined|unclear|weak|not quantified/i.test(cleaned)) {
    return "a buyer problem that is not yet specific or quantified";
  }
  return cleaned;
}

function extractOutcomeValue(text, fallback) {
  const cleaned = extractFieldValue(text, "");
  if (!cleaned) return fallback;
  const helpsMatch = cleaned.match(/helps? (.+?)(?:, but|\.|$)/i);
  if (helpsMatch?.[1]) return helpsMatch[1].trim().replace(/^(teams|revops|users|buyers)\s+/i, "");
  if (/visibility dashboard/i.test(cleaned)) return "make launch handoff risk visible before it turns into missed pipeline";
  return truncate(cleaned, 150);
}

function extractStatusQuoFriction(signals, fallback) {
  const objection = signals.find((signal) => signal.id === "objections")?.text || "";
  const cleaned = extractFieldValue(objection, "");
  const alreadyMatch = cleaned.match(/already (.+?)(?:\.|,| and | but |$)/i);
  if (alreadyMatch?.[1]) {
    const value = alreadyMatch[1].trim();
    if (/have a process/i.test(value)) return "relying on an existing manual process";
    if (/track this manually/i.test(value)) return "relying on manual tracking";
    return `relying on ${value}`;
  }
  return fallback;
}

function capitalizeFirst(text) {
  const value = String(text || "").trim();
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

function stripTerminalPunctuation(text) {
  return String(text || "").trim().replace(/[.!?]+$/, "");
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
  return truncate(String(text || "")
    .replace(/^(Launch message or positioning draft|Landing page copy|Landing page or campaign copy|Launch page or campaign copy|Target buyer or ICP|Buyer pain|Value proposition|CTA|Sales talk track|Objection notes|Competitive framing|Customer proof|Planned launch goal):\s*/i, "")
    .trim(), 210);
}

function isMeaningfulSignalText(value) {
  const normalized = normalizeSignalText(value);
  if (!normalized) return false;
  if (genericSignalResponses.has(normalized)) return false;
  if (/^(not sure|unsure|tbd|none|n\/a|na|coming soon|waiting for input|unknown)[.!?]*$/i.test(normalized)) return false;
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

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function uniqueEvidence(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.source}:${item.snippet}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

render();
