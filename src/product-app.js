const fractureMapTypes = [
  {
    id: "launch",
    title: "Launch Fracture Map",
    description: "Interpret whether a launch story, proof, and field motion will convert beyond awareness."
  },
  {
    id: "messaging",
    title: "Messaging Fracture Map",
    description: "Find where positioning, buyer pain, proof, and differentiation are drifting apart."
  },
  {
    id: "enablement",
    title: "Sales enablement Fracture Map",
    description: "See whether reps have the story, objections, and business case needed to advance deals."
  },
  {
    id: "competitive",
    title: "Competitive Fracture Map",
    description: "Understand whether competitive material changes buying criteria or only defends feature claims."
  },
  {
    id: "pipeline",
    title: "Pipeline narrative Fracture Map",
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

const bucketDefinitions = [
  {
    id: "launch-brief",
    title: "Launch docs",
    description: "Launch briefs, rollout plans, campaign goals, KPI targets",
    keywords: ["launch", "rollout", "release", "campaign", "goal", "kpi", "pipeline"]
  },
  {
    id: "messaging-doc",
    title: "Messaging and positioning",
    description: "Positioning docs, homepage copy, category narrative, ICP notes",
    keywords: ["messaging", "positioning", "homepage", "category", "narrative", "icp", "buyer"]
  },
  {
    id: "sales-deck",
    title: "Sales narrative",
    description: "Sales decks, discovery talk tracks, objection handling, business case",
    keywords: ["sales", "deck", "discovery", "objection", "rep", "business case", "enablement"]
  },
  {
    id: "competitive-notes",
    title: "Competitive intel",
    description: "Battlecards, competitor notes, pricing pressure, win loss themes",
    keywords: ["competitor", "competitive", "battlecard", "pricing", "vendor", "criteria"]
  },
  {
    id: "customer-feedback",
    title: "Customer feedback",
    description: "Customer quotes, confusion notes, interviews, advisory feedback",
    keywords: ["customer", "prospect", "buyer said", "feedback", "confusion", "interview"]
  },
  {
    id: "sales-call-notes",
    title: "Sales call notes",
    description: "Gong notes, call summaries, stalled deals, qualification concerns",
    keywords: ["gong", "call", "demo", "qualified", "opportunity", "deal", "stage"]
  },
  {
    id: "team-feedback",
    title: "Team feedback",
    description: "Slack threads, PMM notes, RevOps feedback, leadership concerns",
    keywords: ["slack", "team", "pmm", "revops", "leadership", "field", "internal"]
  },
  {
    id: "pipeline-notes",
    title: "Campaign and pipeline",
    description: "Campaign results, pipeline notes, conversion concerns, forecast commentary",
    keywords: ["pipeline", "conversion", "forecast", "campaign", "revenue", "qualified demos"]
  }
];

const linkSamples = [
  {
    match: ["launch", "brief", "release"],
    title: "Launch link",
    text: "Linked launch brief says the release is expected to create awareness and influence pipeline, but the story emphasizes product capability more than buyer urgency."
  },
  {
    match: ["deck", "sales", "enablement"],
    title: "Sales asset link",
    text: "Linked sales deck introduces product inputs and features, but discovery guidance does not connect the story to business pain, objection handling, or business case creation."
  },
  {
    match: ["competitive", "battlecard", "competitor"],
    title: "Competitive link",
    text: "Linked competitive notes position other vendors as activity products, but the material does not help reps shift buying criteria or reframe the decision."
  },
  {
    match: ["customer", "feedback", "win", "loss"],
    title: "Customer signal link",
    text: "Linked customer feedback shows buyers understand the product category unevenly and ask whether the motion is for launch planning, enablement review, or pipeline inspection."
  },
  {
    match: ["slack", "team", "internal"],
    title: "Team feedback link",
    text: "Linked team discussion shows sales and PMM using different language for the same launch motion, creating interpretation variance before field rollout."
  },
  {
    match: ["crm", "pipeline", "campaign"],
    title: "Pipeline link",
    text: "Linked pipeline notes show strong activity signals, but qualification comments suggest weak buyer urgency and inconsistent narrative adoption."
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
  ["Define one narrative hierarchy", "Establish the primary story, supporting proof, and category frame."],
  ["Lock the launch operating story", "Use one approved narrative across website, deck, enablement, and field rollout."],
  ["Run a fast contradiction scan", "Identify where competing stories are spreading across GTM surfaces."]
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
    "competitive-notes": "Competitors are positioned as activity products. Notes explain where Cognix is different, but do not help reps change buying criteria.",
    "sales-call-notes": "Buyer asked whether this is for launch planning, enablement review, or pipeline inspection. Rep returned to product capability instead of business pain."
  },
  intakeDump: "",
  linkInput: "",
  attachedLinks: [],
  attachedFiles: [],
  sortMessage: "5 sample signals sorted into 5 buckets.",
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
          <strong>${esc(fractureMapTypes.find((item) => item.id === state.selectedType)?.title || "New Fracture Map")}</strong>
        </div>
        <button class="ghost-button" type="button" data-action="reset">Start another GTM Fracture Map</button>
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
  const labels = ["Create map", "Add signals", "Set KPI", "Generate map", "Aha result"];
  return `
    <aside class="progress-rail" aria-label="Fracture Map progress">
      ${labels.map((label, index) => `
        <button class="rail-step ${index === state.step ? "active" : ""} ${index < state.step ? "done" : ""}" type="button" data-jump="${index}" ${index > state.step ? "disabled" : ""}>
          <span>${index + 1}</span>
          <strong>${esc(label)}</strong>
        </button>`).join("")}
    </aside>`;
}

function renderCurrentStep() {
  if (state.step === 0) return createFractureMapScreen();
  if (state.step === 1) return addSignalsScreen();
  if (state.step === 2) return setKpiScreen();
  if (state.step === 3) return runFractureMapScreen();
  return resultScreen();
}

function createFractureMapScreen() {
  return `
    <div class="stage-header">
      <span class="eyebrow">New GTM Fracture Map</span>
      <h1>What GTM motion should Cognix interpret?</h1>
      <p>Choose the commercial motion Cognix should interpret. The beta starts with realistic sample inputs so the GTM breakpoints appear fast.</p>
    </div>
    <div class="option-grid">
      ${fractureMapTypes.map((item) => `
        <button class="option-card ${state.selectedType === item.id ? "selected" : ""}" type="button" data-type="${esc(item.id)}">
          <span></span>
          <h2>${esc(item.title)}</h2>
          <p>${esc(item.description)}</p>
        </button>`).join("")}
    </div>
    ${stageActions({ next: "Continue to signals" })}`;
}

function addSignalsScreen() {
  const attachedCount = state.attachedFiles.length;
  const linkCount = state.attachedLinks.length;
  const sortedCount = Object.values(state.signals).filter(Boolean).length;
  return `
    <div class="stage-header">
      <span class="eyebrow">Signal intake</span>
      <h1>Add the signals Cognix should interpret.</h1>
      <p>Drop files, attach docs, or paste a messy GTM dump. Cognix reads and sorts the material into interpretation buckets before generating the GTM Fracture Map.</p>
    </div>

    <div class="intake-console" data-drop-zone>
      <div class="drop-zone">
        <span>Open signal intake</span>
        <h2>Drop files, paste links, or attach GTM material.</h2>
        <p>Launch docs, sales notes, competitive intel, customer feedback, Slack threads, campaign goals.</p>
        <div class="intake-actions">
          <label class="primary-button file-button" for="signal-files">Attach files</label>
          <button class="ghost-button" type="button" data-action="sort-signals">Sort into buckets</button>
          <button class="ghost-button" type="button" data-action="load-sample-signals">Load sample dump</button>
        </div>
        <input id="signal-files" class="file-input" type="file" multiple data-file-input />
      </div>

      <div class="intake-right">
        <label class="link-space">
          <span>Paste live links</span>
          <div class="link-row">
            <input type="url" data-link-input value="${esc(state.linkInput)}" placeholder="https://docs.google.com/... or https://notion.so/..." />
            <button class="primary-button" type="button" data-action="ingest-link">Read link</button>
          </div>
          <small>Beta simulation: Cognix interprets the link title and URL pattern, then sorts it into the right signal bucket.</small>
        </label>
        <label class="dump-space">
          <span>Blank dump space</span>
          <textarea data-intake-dump placeholder="Paste messy notes, copied docs, Slack snippets, call summaries, or campaign commentary here. Cognix will sort the material before scoring risk.">${esc(state.intakeDump)}</textarea>
        </label>
      </div>
    </div>

    <div class="intake-status">
      <span>${attachedCount} files attached</span>
      <span>${linkCount} links interpreted</span>
      <span>${sortedCount} buckets with signal content</span>
      <strong>${esc(state.sortMessage)}</strong>
    </div>

    ${linkCount ? `
      <div class="link-list">
        ${state.attachedLinks.map((link) => `
          <span>${esc(link.title)} · ${esc(link.url)}</span>
        `).join("")}
      </div>` : ""}

    <div class="bucket-board">
      ${bucketDefinitions.map((bucket) => bucketCard(bucket)).join("")}
    </div>
    ${stageActions({ back: "Back", next: "Continue to KPI" })}`;
}

function bucketCard(bucket) {
  const content = state.signals[bucket.id] || "";
  const attached = state.attachedFiles.filter((file) => file.bucketId === bucket.id);
  const preview = content ? truncate(content, 170) : "Waiting for a matching signal.";

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
      <textarea data-bucket="${esc(bucket.id)}" aria-label="${esc(bucket.title)} bucket">${esc(content)}</textarea>
    </article>`;
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
    ${stageActions({ back: "Back", next: "Generate your GTM Fracture Map" })}`;
}

function runFractureMapScreen() {
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
          <strong>5 GTM signals interpreted</strong>
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
        <div class="digest-fracture">
          <span>Primary fracture</span>
          <h2>Your GTM story is fracturing across positioning, sales interpretation, and enablement.</h2>
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
          <span>Next GTM decisions</span>
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
          <span class="eyebrow">Signal intelligence</span>
          <h1>GTM Fracture Map</h1>
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
        <button type="button" data-result-action="Generated Executive Signal Brief">Generate Executive Signal Brief</button>
        <button type="button" data-result-action="Created sales narrative fix">Create sales narrative fix</button>
        <button type="button" data-result-action="Export prepared">Export GTM Fracture Map</button>
        <button type="button" data-action="reset">Start another GTM Fracture Map</button>
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

  document.querySelectorAll("[data-bucket]").forEach((input) => {
    input.addEventListener("input", () => {
      state.signals[input.dataset.bucket] = input.value;
    });
  });

  document.querySelector("[data-intake-dump]")?.addEventListener("input", (event) => {
    state.intakeDump = event.target.value;
  });

  document.querySelector("[data-link-input]")?.addEventListener("input", (event) => {
    state.linkInput = event.target.value;
  });

  document.querySelector("[data-action='ingest-link']")?.addEventListener("click", () => {
    ingestLink();
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
    render();
  });

  document.querySelector("[data-action='load-sample-signals']")?.addEventListener("click", () => {
    loadSampleDump();
    sortIntake();
    render();
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

function loadSampleDump() {
  state.intakeDump = [
    "Launch brief: Q3 release goal is $500K influenced pipeline. Campaign is built around awareness and product capability.",
    "Website hero draft: Cognix helps teams understand GTM performance, but the buyer pain is not explicit.",
    "Sales deck: Reps get feature slides and input examples, but discovery does not connect to business urgency.",
    "Competitive notes: Competitors are framed as activity products. Battlecard does not shift buying criteria.",
    "Customer feedback: Buyer asked whether this is for launch planning, enablement review, or pipeline inspection.",
    "Slack thread: Sales wants clearer objection handling before campaign launch."
  ].join("\n\n");
}

function ingestLink() {
  const url = state.linkInput.trim();
  if (!url) {
    state.sortMessage = "Paste a GTM link first.";
    render();
    return;
  }

  const sample = sampleFromLink(url);
  const bucketId = inferBucket(`${url}\n${sample.text}`);
  const linkRecord = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    url,
    title: sample.title,
    bucketId
  };

  state.attachedLinks.push(linkRecord);
  appendSignal(bucketId, `Link: ${sample.title}\nSource: ${url}\n${sample.text}`);
  state.linkInput = "";
  state.sortMessage = `1 link interpreted and sorted into ${bucketDefinitions.find((bucket) => bucket.id === bucketId)?.title || "a GTM bucket"}.`;
  render();
}

function sampleFromLink(url) {
  const lower = url.toLowerCase();
  return linkSamples.find((sample) => sample.match.some((keyword) => lower.includes(keyword))) || {
    title: "GTM signal link",
    text: "Linked GTM material contains signal evidence for Cognix to interpret. The beta simulation sorts this source by URL and surrounding context, then adds it to the closest bucket."
  };
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
    appendSignal(bucketId, `File: ${file.name}\n${text || "Attached file ready for review."}`);
  }
  state.sortMessage = `${files.length} file${files.length === 1 ? "" : "s"} attached and sorted.`;
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
    .split(/\n{2,}|(?=Launch brief:|Website hero|Sales deck:|Competitive notes:|Customer feedback:|Slack thread:|Gong notes:|Campaign notes:)/i)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  chunks.forEach((chunk) => {
    appendSignal(inferBucket(chunk), chunk);
  });

  state.sortMessage = chunks.length
    ? `${chunks.length} pasted signal${chunks.length === 1 ? "" : "s"} sorted into GTM buckets.`
    : "No new pasted signals to sort yet.";
}

function inferBucket(text) {
  const lower = String(text || "").toLowerCase();
  const scored = bucketDefinitions.map((bucket) => ({
    id: bucket.id,
    score: bucket.keywords.reduce((total, keyword) => total + (lower.includes(keyword) ? 1 : 0), 0)
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.score > 0 ? scored[0].id : "team-feedback";
}

function appendSignal(bucketId, text) {
  const current = state.signals[bucketId] || "";
  const normalized = text.trim();
  if (!normalized || current.includes(normalized)) return;
  state.signals[bucketId] = current ? `${current}\n\n${normalized}` : normalized;
}

function truncate(value, max) {
  const text = String(value || "").replace(/\\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3).trim()}...` : text;
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
