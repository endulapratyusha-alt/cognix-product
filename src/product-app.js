const readoutTypes = [
  {
    id: "launch",
    title: "Launch risk readout",
    description: "Diagnose whether a launch story, proof, and field motion will convert beyond awareness."
  },
  {
    id: "messaging",
    title: "Messaging risk readout",
    description: "Find where positioning, buyer pain, proof, and differentiation are drifting apart."
  },
  {
    id: "enablement",
    title: "Sales enablement risk readout",
    description: "See whether reps have the story, objections, and business case needed to advance deals."
  },
  {
    id: "competitive",
    title: "Competitive risk readout",
    description: "Understand whether competitive material changes buying criteria or only defends feature claims."
  },
  {
    id: "pipeline",
    title: "Pipeline narrative readout",
    description: "Connect pipeline quality signals to the narrative and buyer urgency issues underneath."
  }
];

const signalInputs = [
  {
    id: "launch-brief",
    title: "Launch brief",
    placeholder: "Paste the launch goal, audience, story, proof points, and rollout plan."
  },
  {
    id: "messaging-doc",
    title: "Messaging doc",
    placeholder: "Paste positioning, category language, homepage copy, or narrative hierarchy."
  },
  {
    id: "sales-deck",
    title: "Sales deck",
    placeholder: "Paste the sales narrative, discovery flow, business case, or objection slides."
  },
  {
    id: "competitive-notes",
    title: "Competitive notes",
    placeholder: "Paste competitor claims, battlecard notes, pricing pressure, or deal feedback."
  },
  {
    id: "customer-feedback",
    title: "Customer feedback",
    placeholder: "Paste customer quotes, win loss notes, advisory board feedback, or support themes."
  },
  {
    id: "sales-call-notes",
    title: "Sales call notes",
    placeholder: "Paste Gong summaries, discovery notes, objections, or stalled opportunity themes."
  },
  {
    id: "team-feedback",
    title: "Slack or team feedback",
    placeholder: "Paste PMM, sales, RevOps, or leadership comments about confusion or gaps."
  },
  {
    id: "pipeline-notes",
    title: "Campaign or pipeline notes",
    placeholder: "Paste campaign results, pipeline notes, conversion concerns, or KPI commentary."
  }
];

const kpis = [
  "Pipeline created",
  "Qualified demos",
  "Win rate",
  "Sales adoption",
  "Expansion",
  "Activation",
  "Renewal risk",
  "Launch-sourced revenue"
];

const loadingSteps = [
  "Detecting GTM fragmentation",
  "Comparing narrative against buyer urgency",
  "Mapping enablement gaps to sales execution",
  "Identifying competitive risk",
  "Scoring revenue impact"
];

const evidenceTrail = [
  "Messaging emphasizes product capability, while sales notes show buyer confusion around business urgency.",
  "Competitive notes are defensive, but do not shift buying criteria.",
  "Sales deck does not connect launch story to discovery, objection handling, or business case creation."
];

const courseCorrections = [
  "Reframe the launch around buyer pain.",
  "Create a sales-ready narrative for discovery calls.",
  "Update objection handling.",
  "Add a competitive \"change the buying criteria\" section.",
  "Track sales adoption within 7 days."
];

const executiveImpacts = [
  ["Pipeline quality risk", "Buyers may not quickly understand why the company matters."],
  ["Sales interpretation variance", "Reps are likely retelling the story differently."],
  ["Category clarity decay", "Positioning is not consistently controlling the frame."],
  ["Launch readiness risk", "Field rollout may amplify confusion instead of alignment."]
];

const leadershipMoves = [
  ["Create one narrative hierarchy", "Establish the primary story, supporting proof, and category frame."],
  ["Lock the launch operating story", "Use one approved narrative across website, deck, enablement, and field rollout."],
  ["Run a fast contradiction audit", "Identify where competing stories are spreading across GTM surfaces."]
];

const digestEvidence = [
  ["Founder strategy note", "Sets the intended strategic story."],
  ["Website hero draft", "Shows a competing market promise."],
  ["Sales deck track", "Translates the story into a different field narrative."],
  ["Customer confusion notes", "Confirms buyers are not reading the frame cleanly."],
  ["Enablement asset", "Spreads feature explanation without deal advancement."]
];

const state = {
  step: 0,
  selectedType: "launch",
  selectedKpi: "Pipeline created",
  targetGoal: "$500K influenced pipeline",
  signals: {
    "launch-brief": "Launch goal is to create market awareness for the new release and show Cognix as a better way to understand GTM performance.",
    "messaging-doc": "The messaging focuses on signal interpretation, product capability, revenue cognition, and faster GTM alignment.",
    "sales-deck": "The sales deck explains features and inputs, but discovery guidance does not connect the launch story to buyer urgency or business case creation.",
    "competitive-notes": "Competitors are positioned as reporting and activity products. Notes explain where Cognix is different, but do not help reps change buying criteria.",
    "sales-call-notes": "Buyer asked whether this is for launch planning, enablement review, or pipeline inspection. Rep returned to product capability instead of business pain."
  },
  loadingIndex: 0,
  actionMessage: ""
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
          <span>Revenue cognition workspace</span>
          <strong>${esc(readoutTypes.find((item) => item.id === state.selectedType)?.title || "New readout")}</strong>
        </div>
        <button class="ghost-button" type="button" data-action="reset">Start another readout</button>
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
  const labels = ["Create readout", "Add signals", "Set KPI", "Run readout", "Aha result"];
  return `
    <aside class="progress-rail" aria-label="Readout progress">
      ${labels.map((label, index) => `
        <button class="rail-step ${index === state.step ? "active" : ""} ${index < state.step ? "done" : ""}" type="button" data-jump="${index}" ${index > state.step ? "disabled" : ""}>
          <span>${index + 1}</span>
          <strong>${esc(label)}</strong>
        </button>`).join("")}
    </aside>`;
}

function renderCurrentStep() {
  if (state.step === 0) return createReadoutScreen();
  if (state.step === 1) return addSignalsScreen();
  if (state.step === 2) return setKpiScreen();
  if (state.step === 3) return runReadoutScreen();
  return resultScreen();
}

function createReadoutScreen() {
  return `
    <div class="stage-header">
      <span class="eyebrow">New readout</span>
      <h1>What GTM motion do you want to diagnose?</h1>
      <p>Choose the commercial motion Cognix should interpret. The beta starts with realistic sample inputs so the GTM breakpoints appear fast.</p>
    </div>
    <div class="option-grid">
      ${readoutTypes.map((item) => `
        <button class="option-card ${state.selectedType === item.id ? "selected" : ""}" type="button" data-type="${esc(item.id)}">
          <span></span>
          <h2>${esc(item.title)}</h2>
          <p>${esc(item.description)}</p>
        </button>`).join("")}
    </div>
    ${stageActions({ next: "Continue to signals" })}`;
}

function addSignalsScreen() {
  return `
    <div class="stage-header">
      <span class="eyebrow">Signal intake</span>
      <h1>Add the signals Cognix should interpret.</h1>
      <p>Paste real GTM material or use the prefilled examples. Cognix reads each signal for messaging drift, evidence trails, and revenue-risk clues.</p>
    </div>
    <div class="signal-input-grid">
      ${signalInputs.map((signal) => `
        <label class="signal-input-card" for="${esc(signal.id)}">
          <span>${esc(signal.title)}</span>
          <textarea id="${esc(signal.id)}" data-signal="${esc(signal.id)}" placeholder="${esc(signal.placeholder)}">${esc(state.signals[signal.id] || "")}</textarea>
          <small>${state.signals[signal.id] ? "Signal attached" : "Paste text or simulate upload"}</small>
        </label>`).join("")}
    </div>
    ${stageActions({ back: "Back", next: "Continue to KPI" })}`;
}

function setKpiScreen() {
  return `
    <div class="stage-header compact">
      <span class="eyebrow">Revenue outcome</span>
      <h1>What revenue outcome is this motion supposed to influence?</h1>
      <p>Cognix scores GTM risk against the outcome the motion is expected to move, not against surface activity.</p>
    </div>
    <div class="kpi-layout">
      <div class="kpi-grid">
        ${kpis.map((kpi) => `
          <button class="kpi-pill ${state.selectedKpi === kpi ? "selected" : ""}" type="button" data-kpi="${esc(kpi)}">${esc(kpi)}</button>`).join("")}
      </div>
      <label class="goal-card">
        <span>Target number or goal</span>
        <input type="text" data-goal value="${esc(state.targetGoal)}" placeholder="$500K influenced pipeline" />
        <small>Examples: $500K influenced pipeline, 150 qualified demos, 20% higher sales adoption</small>
      </label>
    </div>
    ${stageActions({ back: "Back", next: "Run the readout" })}`;
}

function runReadoutScreen() {
  return `
    <div class="analysis-shell">
      <div class="analysis-core">
        <div class="analysis-ring" aria-hidden="true">
          <span>${Math.min((state.loadingIndex + 1) * 20, 100)}%</span>
        </div>
        <div>
          <span class="eyebrow">Revenue cognition</span>
          <h1>Reading GTM signals against revenue risk.</h1>
          <p>Cognix is comparing the selected motion, pasted signals, and KPI target to identify GTM breakpoints before revenue shows the miss.</p>
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

function executiveDigest() {
  return `
    <section class="executive-digest" aria-label="Executive digest">
      <div class="digest-topline">
        <span>Executive digest</span>
        <div>
          <b>Confidence</b>
          <strong>High confidence</strong>
        </div>
        <div>
          <b>Scan</b>
          <strong>5 GTM surfaces</strong>
        </div>
      </div>

      <div class="digest-hero">
        <aside class="digest-score-card">
          <div class="digest-gauge" aria-label="Revenue execution risk score 84, high">
            <span>84</span>
          </div>
          <div>
            <span>Revenue execution risk</span>
            <strong>High</strong>
          </div>
        </aside>
        <div class="digest-diagnosis">
          <span>One-line diagnosis</span>
          <h2>GTM narrative fragmentation is increasing revenue execution risk.</h2>
          <p>Multiple strategic stories are competing across website, positioning, sales, and enablement.</p>
        </div>
      </div>

      <div class="impact-strip">
        ${executiveImpacts.map(([title, body]) => `
          <article>
            <span>${esc(title)}</span>
            <p>${esc(body)}</p>
          </article>`).join("")}
      </div>

      <div class="leadership-block">
        <div class="digest-section-head">
          <span>Leadership moves</span>
          <strong>What leadership should do next</strong>
        </div>
        <div class="leadership-grid">
          ${leadershipMoves.map(([title, body]) => `
            <article>
              <h3>${esc(title)}</h3>
              <p>${esc(body)}</p>
            </article>`).join("")}
        </div>
      </div>

      <div class="belief-strip">
        <div class="digest-section-head">
          <span>Why Cognix believes this</span>
          <strong>Evidence trail</strong>
        </div>
        <div class="belief-grid">
          ${digestEvidence.map(([source, body]) => `
            <article>
              <b>${esc(source)}</b>
              <p>${esc(body)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function resultScreen() {
  return `
    <div class="result-command">
      ${executiveDigest()}
      <section class="result-hero">
        <div>
          <span class="eyebrow">Aha result</span>
          <h1>GTM risk readout</h1>
          <p>This launch is likely to create awareness, but weakly convert into qualified pipeline.</p>
        </div>
        <div class="score-command">
          <div class="score-orbit" aria-label="Revenue-risk score 72 percent">
            <span>72%</span>
          </div>
          <strong>Revenue-risk score</strong>
        </div>
      </section>

      <section class="risk-map">
        <div class="map-node input">Messaging signals</div>
        <div class="map-line line-a"></div>
        <div class="map-node center">Revenue cognition layer</div>
        <div class="map-line line-b"></div>
        <div class="map-node output">Qualified pipeline risk</div>
      </section>

      <section class="result-grid">
        <article class="result-card primary">
          <span>Primary breakpoint</span>
          <h2>Sales narrative does not map to buyer urgency.</h2>
        </article>
        <article class="result-card">
          <span>Secondary breakpoint</span>
          <h3>Competitive differentiation is unclear.</h3>
        </article>
        <article class="result-card">
          <span>Third breakpoint</span>
          <h3>Enablement assets explain features, but do not help reps advance deals.</h3>
        </article>
        <article class="result-card implication">
          <span>Revenue implication</span>
          <h3>High activity, weak qualified pipeline conversion.</h3>
        </article>
      </section>

      <section class="deep-grid">
        <article class="board-card">
          <span>Evidence trail</span>
          <ul>
            ${evidenceTrail.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </article>
        <article class="board-card correction">
          <span>Course correction</span>
          <ol>
            ${courseCorrections.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ol>
        </article>
      </section>

      <section class="action-console">
        <button type="button" data-result-action="Generated executive summary">Generate executive summary</button>
        <button type="button" data-result-action="Created sales narrative fix">Create sales narrative fix</button>
        <button type="button" data-result-action="Export prepared">Export readout</button>
        <button type="button" data-action="reset">Start another readout</button>
      </section>
      ${state.actionMessage ? `<div class="toast">${esc(state.actionMessage)}</div>` : ""}
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
  document.querySelectorAll("[data-type]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedType = button.dataset.type;
      render();
    });
  });

  document.querySelectorAll("[data-signal]").forEach((input) => {
    input.addEventListener("input", () => {
      state.signals[input.dataset.signal] = input.value;
    });
  });

  document.querySelectorAll("[data-kpi]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedKpi = button.dataset.kpi;
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
      state.step = 0;
      state.loadingIndex = 0;
      state.actionMessage = "";
      render();
    });
  });

  document.querySelectorAll("[data-result-action]").forEach((button) => {
    button.addEventListener("click", () => {
      state.actionMessage = `${button.dataset.resultAction}. Beta action simulated.`;
      render();
    });
  });
}

function startAnalysis() {
  state.step = 3;
  state.loadingIndex = 0;
  render();

  loadingSteps.forEach((_step, index) => {
    window.setTimeout(() => {
      state.loadingIndex = index;
      render();
    }, index * 520);
  });

  window.setTimeout(() => {
    state.step = 4;
    state.loadingIndex = loadingSteps.length;
    render();
  }, loadingSteps.length * 520 + 420);
}

render();
