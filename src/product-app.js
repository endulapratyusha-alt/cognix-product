import { runCognition } from "../lib/cognix/cognition-engine.js";
import { SIGNAL_TYPES } from "../lib/cognix/diagnostic-engine.js";
import { isSupabaseConfigured, supabase } from "./supabaseClient.js";

const storageKey = "cognix.cognition.mvp.v6";
const state = {
  projects: [],
  activeProjectId: null,
  mode: "local",
  session: null,
  loading: false,
  analysisStage: "",
  error: "",
  storageWarning: ""
};

const sampleProject = {
  id: "sample-project",
  company_name: "Cognix demo company",
  project_name: "GTM fragmentation readout",
  diagnostic_type: "Fragmentation readout",
  company_stage: "Founder-led emerging SaaS",
  primary_buyer: "GTM leadership",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  signals: [
    {
      id: "sample-website",
      project_id: "sample-project",
      signal_type: "Website copy",
      title: "Founder strategy note",
      content: "Cognix is a revenue cognition system for AI-era GTM teams. It protects strategic coherence by detecting GTM fragmentation before it becomes revenue risk and turning scattered signals into leadership decisions.",
      notes: "Founder narrative and intended category claim.",
      created_at: new Date().toISOString()
    },
    {
      id: "sample-sales-deck",
      project_id: "sample-project",
      signal_type: "Positioning document",
      title: "Website hero draft",
      content: "Run a Cognix readout to find GTM contradictions in minutes. Paste GTM signals, get an evidence trail, and see the revenue risk before teams create more sales and marketing content.",
      notes: "Public website copy for the first product workflow.",
      created_at: new Date().toISOString()
    },
    {
      id: "sample-launch-plan",
      project_id: "sample-project",
      signal_type: "Sales deck",
      title: "Sales talk track",
      content: "Position Cognix as a diagnostic workspace for GTM teams. Lead with a practical analysis of messaging, buyer clarity, sales narrative, and enablement gaps so prospects understand the first use case quickly.",
      notes: "Field narrative for discovery calls.",
      created_at: new Date().toISOString()
    },
    {
      id: "sample-win-loss",
      project_id: "sample-project",
      signal_type: "Customer feedback",
      title: "Prospect confusion notes",
      content: "A VP Marketing prospect asked whether Cognix is strategic infrastructure, a diagnostic workspace, a reporting aid, or an enablement review tool. They liked the revenue cognition framing but did not understand the first use case or buying motion.",
      notes: "Sales call notes from beta discovery.",
      created_at: new Date().toISOString()
    },
    {
      id: "sample-enable",
      project_id: "sample-project",
      signal_type: "Enablement asset",
      title: "Beta sales talk track",
      content: "Use Cognix as a reporting aid for founders, CMOs, PMM, RevOps, enablement, and GTM leadership. Reps should promise better reports, cleaner summaries, and faster alignment, then mention revenue risk and leadership decision later.",
      notes: "Internal enablement.",
      created_at: new Date().toISOString()
    },
    {
      id: "sample-revops",
      project_id: "sample-project",
      signal_type: "Pipeline review notes",
      title: "RevOps pipeline review",
      content: "Pipeline review notes show inconsistent qualification around whether Cognix is a strategic leadership system, a diagnostic workspace, or a reporting aid. RevOps flagged weaker first-call conversion, longer sales cycles in founder-led accounts, and lower forecast confidence because opportunity notes describe different buyer promises.",
      notes: "RevOps signal connecting GTM interpretation variance to pipeline quality and forecast confidence risk.",
      created_at: new Date().toISOString()
    }
  ],
  reports: [],
  memory: []
};

const demoSignals = [
  {
    signal_type: "Positioning document",
    title: "Leadership strategy statement",
    content: "Leadership is preparing the launch around revenue cognition infrastructure for AI-era GTM teams. The product is described as a way to detect GTM fragmentation before it becomes revenue risk.",
    notes: "Adds the intended strategic claim leadership wants the market to understand."
  },
  {
    signal_type: "Website copy",
    title: "Launch homepage draft",
    content: "Turn scattered GTM signals into a leadership-ready readout. Paste a few signals and see where your story, buyer, proof, offer, and execution path are starting to fragment.",
    notes: "Introduces a productivity story that competes with the strategic transformation claim."
  },
  {
    signal_type: "Sales deck",
    title: "Sales enablement snippet",
    content: "Position the product as a reporting aid for marketing, sales, RevOps, and customer teams. Reps should lead with faster summaries and cleaner internal updates instead of leadership judgment.",
    notes: "Shows how the field may reinterpret the category into reporting."
  },
  {
    signal_type: "Forecast commentary",
    title: "RevOps forecast commentary",
    content: "Forecast commentary shows pipeline quality concerns in opportunities where sales notes describe Cognix as faster reporting instead of revenue cognition. Stage conversion is weaker when the buyer cannot tell whether the purchase is for ongoing GTM governance or a one-off readout.",
    notes: "Adds RevOps evidence that narrative drift is becoming forecast confidence and stage conversion risk."
  },
  {
    signal_type: "Customer feedback",
    title: "Buyer feedback from discovery call",
    content: "A VP Marketing buyer said the category is clear at the leadership level but the first workflow is still unclear. They asked whether this is for launch review, board prep, pipeline quality, or ongoing GTM governance.",
    notes: "Turns buyer confusion into evidence, not anecdote."
  },
  {
    signal_type: "Enablement asset",
    title: "AI-generated enablement draft",
    content: "Use Cognix to summarize GTM content, accelerate team alignment, and create better reports. The draft does not explain fragmentation, evidence, root cause, revenue risk, or the leadership decision the buyer receives.",
    notes: "Shows how generic AI output can amplify narrative drift."
  }
];

const $ = (selector) => document.querySelector(selector);
const esc = (value = "") => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

async function init() {
  if (isSupabaseConfigured && state.mode === "supabase") {
    const { data } = await supabase.auth.getSession();
    state.session = data.session;
    supabase.auth.onAuthStateChange((_event, session) => {
      state.session = session;
      loadAndRender();
    });
  }
  await loadAndRender();
}

async function loadAndRender() {
  state.loading = true;
  renderShell();
  try {
    state.projects = state.mode === "supabase" && state.session ? await loadSupabaseProjects() : loadLocalProjects();
    state.loading = false;
    renderShell();
  } catch (error) {
    state.loading = false;
    state.error = error.message;
    renderShell();
  }
}

function loadLocalProjects() {
  clearLegacyLocalStorage();
  const saved = readStorageItem(storageKey);
  if (!saved) {
    const seeded = withSampleCognition(cloneSampleProject());
    saveLocalProjectPayload([seeded]);
    return [seeded];
  }
  try {
    const projects = JSON.parse(saved).projects || [sampleProject];
    return projects.map((project) => project.id === "sample-project" ? withSampleCognition(project) : project);
  } catch {
    return [withSampleCognition(cloneSampleProject())];
  }
}

function saveLocalProjects() {
  saveLocalProjectPayload(state.projects);
}

function saveLocalProjectPayload(projects) {
  state.storageWarning = "";
  const compactProjects = projects.map(compactProjectForStorage);
  if (writeStorageItem(storageKey, JSON.stringify({ projects: compactProjects }))) return;

  clearLegacyLocalStorage();
  const minimalProjects = compactProjects.map((project) => ({
    ...project,
    reports: project.reports.slice(0, 1),
    memory: project.memory.slice(-2),
    signals: project.signals.slice(-5).map((signal) => ({
      ...signal,
      content: truncateText(signal.content, 180),
      notes: truncateText(signal.notes, 120)
    }))
  }));

  if (!writeStorageItem(storageKey, JSON.stringify({ projects: minimalProjects }))) {
    state.storageWarning = "Memory storage limit reached. Current readout is still available. Clear saved memory to continue saving new runs.";
  }
}

function clearLegacyLocalStorage() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("cognix.cognition.mvp.") && key !== storageKey)
      .forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch {
          // Storage cleanup is best effort. Rendering should not depend on it.
        }
      });
  } catch {
    // Browsers can block localStorage access entirely in some privacy modes.
  }
}

function readStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function cloneSampleProject() {
  if (typeof structuredClone === "function") return structuredClone(sampleProject);
  return JSON.parse(JSON.stringify(sampleProject));
}

function truncateText(value = "", max = 240) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3).trim()}...` : text;
}

function compactProjectForStorage(project) {
  return {
    ...project,
    demo_step: project.demo_step || 0,
    signals: (project.signals || []).slice(-8).map((signal) => ({
      id: signal.id,
      project_id: signal.project_id,
      signal_type: signal.signal_type,
      title: signal.title,
      content: truncateText(signal.content, 320),
      notes: truncateText(signal.notes, 160),
      created_at: signal.created_at
    })),
    reports: (project.reports || []).slice(0, 5).map(compactReportForStorage),
    memory: (project.memory || []).slice(-5).map((entry) => ({
      id: entry.id,
      created_at: entry.created_at,
      summary: truncateText(entry.summary, 180),
      contradictions: (entry.contradictions || []).slice(0, 3).map((item) => typeof item === "string" ? truncateText(item, 160) : item),
      dominant_narratives: (entry.dominant_narratives || []).slice(0, 3),
      strategic_pressure: (entry.strategic_pressure || []).slice(0, 2),
      dominant_entities: (entry.dominant_entities || []).slice(0, 4)
    }))
  };
}

function compactReportForStorage(report) {
  return {
    cognition_version: report.cognition_version,
    engine: report.engine,
    ai_unavailable: report.ai_unavailable,
    generated_at: report.generated_at,
    contradictions: (report.contradictions || []).slice(0, 8).map(compactContradiction),
    causal_model: {
      primary_causes: (report.causal_model?.primary_causes || []).slice(0, 4),
      downstream_consequences: (report.causal_model?.downstream_consequences || []).slice(0, 5),
      next_break_likely: report.causal_model?.next_break_likely
    },
    ontology: {
      objects: (report.ontology?.objects || []).slice(0, 30).map((object) => ({
        id: object.id,
        type: object.type,
        name: object.name,
        confidence: object.confidence,
        appears_in: object.appears_in,
        missing_in: object.missing_in,
        source_references: (object.source_references || []).slice(0, 2)
      }))
    },
    relationship_map: {
      edges: (report.relationship_map?.edges || []).slice(0, 30),
      signal_coverage: report.relationship_map?.signal_coverage || []
    },
    propagation_map: (report.propagation_map || []).slice(0, 10),
    organizational_propagation: {
      pathways: (report.organizational_propagation?.pathways || []).slice(0, 10),
      propagation_decay: (report.organizational_propagation?.propagation_decay || []).slice(0, 6)
    },
    narrative_gravity: {
      narratives: (report.narrative_gravity?.narratives || []).slice(0, 6),
      dominant_narratives: (report.narrative_gravity?.dominant_narratives || []).slice(0, 3),
      competing_narratives: (report.narrative_gravity?.competing_narratives || []).slice(0, 3),
      fragmented_propagation: (report.narrative_gravity?.fragmented_propagation || []).slice(0, 3)
    },
    strategic_pressure_model: {
      pressures: (report.strategic_pressure_model?.pressures || []).slice(0, 5)
    },
    scenario_simulations: (report.scenario_simulations || []).slice(0, 4),
    priority_engine: (report.priority_engine || []).slice(0, 5),
    top_diagnosis: report.top_diagnosis,
    evidence: (report.evidence || []).slice(0, 8),
    recommendations: (report.recommendations || []).slice(0, 5)
  };
}

function compactContradiction(contradiction) {
  return {
    title: contradiction.title,
    severity: contradiction.severity,
    interpretation: contradiction.interpretation,
    business_consequence: contradiction.business_consequence,
    evidence: (contradiction.evidence || []).slice(0, 5),
    affected_objects: (contradiction.affected_objects || []).slice(0, 5),
    contributing_signals: (contradiction.contributing_signals || []).slice(0, 5),
    root_cause: contradiction.root_cause,
    downstream_consequence: contradiction.downstream_consequence,
    next_break_likely: contradiction.next_break_likely
  };
}

function withSampleCognition(project) {
  if (!project?.signals?.length || project.reports?.length) return project;
  const report = runCognition(project, project.signals, project.memory || [], { engineLabel: "rule-based", aiUnavailable: true });
  project.reports = [report];
  project.memory = report.memory || [];
  project.updated_at = new Date().toISOString();
  return project;
}

async function loadSupabaseProjects() {
  const { data: projects, error } = await supabase
    .from("diagnostic_projects")
    .select("*,companies(*)")
    .order("updated_at", { ascending: false });
  if (error) throw error;

  const hydrated = [];
  for (const project of projects || []) {
    const { data: signals, error: signalsError } = await supabase.from("signals").select("*").eq("project_id", project.id).order("created_at", { ascending: true });
    if (signalsError) throw signalsError;
    const { data: reports, error: reportsError } = await supabase.from("reports").select("*").eq("project_id", project.id).order("created_at", { ascending: false });
    if (reportsError) throw reportsError;
    hydrated.push(fromSupabaseProject(project, signals || [], reports || []));
  }
  return hydrated;
}

function fromSupabaseProject(project, signals, reports) {
  return {
    id: project.id,
    company_name: project.companies?.name || project.company_name || "",
    project_name: project.name || project.project_name,
    diagnostic_type: project.diagnostic_type || project.primary_motion,
    company_stage: project.company_stage || project.companies?.stage || "",
    primary_buyer: project.primary_buyer || "",
    created_at: project.created_at,
    updated_at: project.updated_at,
    signals: signals.map((signal) => ({
      id: signal.id,
      project_id: signal.project_id,
      signal_type: signal.signal_type,
      title: signal.title,
      content: signal.content || "",
      notes: signal.notes || "",
      created_at: signal.created_at
    })),
    reports: reports.map((report) => report.raw_output || report)
  };
}

function renderShell() {
  const active = getActiveProject();
  $("#app").innerHTML = `
    <div class="site-shell">
      <header class="nav">
        <div class="nav-inner">
          <a class="brand" href="product.html"><span class="mark"></span><span>Cognix</span></a>
          <nav class="nav-links demo-nav">
            <span class="trust-pill">Local deterministic inference</span>
            <a class="btn" href="index.html">Website</a>
          </nav>
        </div>
      </header>
      <main class="demo-layout">
        <section class="workspace">
          ${state.loading ? loadingView(state.analysisStage) : state.error ? errorView(state.error) : mainView(active)}
        </section>
      </main>
    </div>`;
  bindEvents();
}

function mainView(active) {
  if (state.mode === "supabase" && !state.session) return authView();
  if (!state.projects.length) return emptyView("No projects yet", "Create a diagnostic project to begin.");
  if (!active) return emptyView("Select a project", "Choose a project from the left rail or create a new one.");
  return projectView(active);
}

function authView() {
  return `
    <section class="report-panel">
      <div class="eyebrow">Supabase Auth</div>
      <h2>Sign in to use Supabase-backed persistence.</h2>
      <p class="muted">Local engine mode works without keys. Supabase mode requires configured environment keys and a user session.</p>
      <form id="auth-form" class="compact-form">
        <div class="field"><label>Email</label><input name="email" type="email" required /></div>
        <div class="field"><label>Password</label><input name="password" type="password" minlength="6" required /></div>
        <div class="button-row">
          <button class="btn primary" type="submit" data-auth="signin">Sign in</button>
          <button class="btn" type="button" data-auth="signup">Create account</button>
        </div>
        <p class="form-message" id="auth-message"></p>
      </form>
    </section>`;
}

function projectView(project) {
  const latestReport = project.reports[0];
  const previousReport = project.reports[1];
  return `
    <div class="workspace-head demo-head">
      <div>
        <div class="eyebrow">Product readout · ${esc(project.company_name)} · ${esc(project.company_stage)}</div>
        <h2>Cognix detects GTM fragmentation before it becomes revenue risk.</h2>
        <p class="muted">Add messy GTM signals. Cognix identifies the active contradiction, shows evidence, explains revenue risk, recommends the leadership decision, and saves the run as memory.</p>
      </div>
      <div class="button-row">
        <button class="btn" data-action="seed-sample">Reset sample</button>
        <button class="btn primary" data-action="run-analysis" ${project.signals.length ? "" : "disabled"}>Run new analysis</button>
      </div>
    </div>
    ${latestReport ? canonicalDemoView(latestReport, previousReport, project) : emptyView("No cognition run yet", "Run analysis to generate the Cognix readout.")}`;
}

function canonicalDemoView(report, previousReport, project) {
  const contradiction = primaryContradiction(report);
  const brief = executiveBriefData(report, contradiction);
  const readout = cognixReadout(project, report, contradiction, brief);
  return `
    ${readoutView(readout)}
    ${activeContradictionView(contradiction)}
    ${evidenceTrailView(contradiction)}
    ${revenueRiskView(readout)}
    ${leadershipDecisionView(readout)}
    ${memorySnapshotView(project, report, previousReport, readout)}
    ${causalChainView(readout)}
    ${revOpsUseCaseView(readout)}
    ${executiveBriefView(report, readout)}
    ${cognitionChangedView(report, previousReport)}
    ${signalWorkspace(project)}
    ${connectedMapView(report, project)}
    ${propagationPathwaysView(report)}
    ${narrativePressureView(report)}
    ${scenarioSimulationsView(report)}`;
}

function trustNotice(report) {
  if (!(report.engine === "rule-based" || report.ai_unavailable)) return "";
  return `<div class="trust-notice"><strong>Local deterministic inference active.</strong><span> OpenAI inference optional.</span></div>`;
}

function readoutView(readout) {
  return `
    <section class="demo-section readout-section">
      <div>
        <span class="tag">Cognix readout</span>
        <h2>${esc(readout.headline)}</h2>
        <p class="readout-lede">${esc(readout.summary)}</p>
        <div class="readout-flow" aria-label="Cognix reasoning flow">
          ${["Signal", "Contradiction", "Evidence", "Root cause", "Revenue risk", "Leadership decision"].map((item) => `<span>${esc(item)}</span>`).join("")}
        </div>
        <div class="decision-callout">
          <span>Recommended leadership decision</span>
          <strong>${esc(readout.recommendedDecision)}</strong>
        </div>
        ${storageNotice()}
        ${trustNotice({ engine: "rule-based", ai_unavailable: true })}
      </div>
      <div class="readout-grid">
        ${readoutItem("What Cognix analyzed", readout.analyzed)}
        ${readoutItem("What it found", readout.found)}
        ${readoutItem("Why it matters", readout.revenueRisk)}
        ${readoutItem("What leadership should do next", readout.next)}
      </div>
    </section>`;
}

function storageNotice() {
  if (!state.storageWarning) return "";
  return `
    <div class="storage-notice">
      <strong>${esc(state.storageWarning)}</strong>
      <button class="btn" type="button" data-action="clear-memory">Clear saved memory</button>
    </div>`;
}

function readoutItem(label, value) {
  return `<article class="readout-item"><span>${esc(label)}</span><strong>${esc(value)}</strong></article>`;
}

function activeContradictionView(contradiction) {
  const normalized = normalizeContradiction(contradiction);
  return `
    <section class="demo-section contradiction-section">
      <div>
        <span class="tag">Active contradiction</span>
        <h2>${esc(normalized.name)}</h2>
        <p>${esc(normalized.plainEnglish)}</p>
        <div class="contradiction-detail-grid">
          ${readoutItem("Plain-English meaning", normalized.meaning)}
          ${readoutItem("Root cause", normalized.rootCause)}
          ${readoutItem("Revenue risk", normalized.revenueRisk)}
          ${readoutItem("Recommended decision", normalized.recommendedDecision)}
        </div>
      </div>
      <aside>
        <span>Source evidence</span>
        ${(normalized.evidence || []).slice(0, 3).map((item) => `<strong>${esc(item)}</strong>`).join("")}
      </aside>
    </section>`;
}

function causalChainView(readout) {
  return `
    <section class="demo-section causal-section">
      <div class="section-title">
        <span class="tag">Causal reasoning</span>
        <h2>Signal to leadership decision</h2>
        <p class="muted">Cognix shows the business chain, not just a summary of the inputs.</p>
      </div>
      <div class="causal-chain">
        ${readout.chain.map(([label, value]) => `<article><span>${esc(label)}</span><strong>${esc(value)}</strong></article>`).join("")}
      </div>
    </section>`;
}

function executiveBriefView(report, readout) {
  const risks = executiveRiskRows(report, readout).slice(0, 3);
  return `
    <section class="demo-section executive-section">
      <div class="section-title">
        <span class="tag">Executive view</span>
        <h2>Leadership decision brief</h2>
        <p class="muted">A founder, CMO, PMM leader, RevOps leader, or enablement leader should be able to scan this and know what to fix first.</p>
      </div>
      <div class="executive-risk-grid">
        ${risks.map((risk, index) => `
          <article class="executive-risk-card">
            <span>Risk ${index + 1}</span>
            <h3>${esc(risk.name)}</h3>
            <dl>
              <div><dt>Root cause</dt><dd>${esc(risk.rootCause)}</dd></div>
              <div><dt>Business consequence</dt><dd>${esc(risk.businessConsequence)}</dd></div>
              <div><dt>Revenue risk</dt><dd>${esc(risk.revenueRisk)}</dd></div>
              <div><dt>Affected team</dt><dd>${esc(risk.affectedTeam)}</dd></div>
              <div><dt>Affected funnel stage</dt><dd>${esc(risk.affectedFunnelStage)}</dd></div>
              <div><dt>Recommended leadership decision</dt><dd>${esc(risk.recommendedDecision)}</dd></div>
              <div><dt>Owner</dt><dd>${esc(risk.owner)}</dd></div>
              <div><dt>Urgency</dt><dd>${esc(risk.urgency)}</dd></div>
            </dl>
          </article>`).join("")}
      </div>
    </section>`;
}

function memorySnapshotView(project, report, previousReport, readout) {
  const memoryRows = cognitionMemoryRows(project, report, previousReport, readout);
  return `
    <section class="demo-section memory-section">
      <div class="section-title">
        <span class="tag">Persistent memory</span>
        <h2>Saved cognition runs</h2>
        <p class="muted">Each run preserves the diagnosis, risk, contradiction, root cause, revenue risk, and recommended decision so the next signal can change the interpretation.</p>
      </div>
      ${state.storageWarning ? storageNotice() : ""}
      <div class="memory-grid">
        ${memoryRows.map((row) => `
          <article class="memory-card">
            <span>${esc(row.label)}</span>
            <h3>${esc(row.diagnosis)}</h3>
            <p>${esc(row.changed)}</p>
            <dl>
              <div><dt>Inputs</dt><dd>${esc(row.inputs)}</dd></div>
              <div><dt>Risk score</dt><dd>${esc(row.riskScore)}</dd></div>
              <div><dt>Active contradiction</dt><dd>${esc(row.contradiction)}</dd></div>
              <div><dt>Root cause</dt><dd>${esc(row.rootCause)}</dd></div>
              <div><dt>Revenue risk</dt><dd>${esc(row.revenueRisk)}</dd></div>
              <div><dt>Recommended decision</dt><dd>${esc(row.recommendedDecision)}</dd></div>
              <div><dt>What changed</dt><dd>${esc(row.changed)}</dd></div>
            </dl>
          </article>`).join("")}
      </div>
    </section>`;
}

function cognitionChangedView(report, previousReport) {
  const current = primaryContradiction(report);
  const previous = previousReport ? primaryContradiction(previousReport) : null;
  const currentBrief = executiveBriefData(report, current);
  const previousBrief = previous ? executiveBriefData(previousReport, previous) : null;
  const currentRisk = riskScore(current);
  const previousRisk = previous ? riskScore(previous) : Math.max(20, currentRisk - 18);
  const change = cognitionChangeSummary(report, previousReport);
  return `
    <section class="demo-section">
      <div class="section-title">
        <span class="tag">Cognition changed</span>
        <h2>${previousReport ? "Before and after the latest signal" : "Baseline cognition state"}</h2>
        <p class="muted">${esc(change)}</p>
      </div>
      <div class="change-grid">
        ${changeItem("Active contradiction", previous?.title || "No prior contradiction", current.title)}
        ${changeItem("Risk score", previousRisk, currentRisk)}
        ${changeItem("Root cause", previousBrief?.rootCause || "Baseline forming", currentBrief.rootCause)}
        ${changeItem("Leadership decision", previousBrief?.recommendedDecision || "Wait for cross-signal evidence", currentBrief.recommendedDecision)}
      </div>
    </section>`;
}

function changeItem(label, before, after) {
  return `<article class="change-item"><span>${esc(label)}</span><div><small>Before</small><strong>${esc(before)}</strong></div><div><small>After</small><strong>${esc(after)}</strong></div></article>`;
}

function evidenceTrailView(contradiction) {
  const rows = evidenceTrailRows(contradiction).slice(0, 5);
  return `
    <section class="demo-section">
      <div class="section-title">
        <span class="tag">Evidence trail</span>
        <h2>Why Cognix reached this conclusion</h2>
        <p class="muted">Every diagnosis is tied back to the GTM signals that caused it.</p>
      </div>
      <div class="evidence-grid">
        ${rows.map((row) => `
          <article class="evidence-card">
            <span>${esc(row.source)} · ${esc(row.type)}</span>
            <strong>${esc(row.claim)}</strong>
            <p>${esc(row.why)}</p>
            <dl class="evidence-meta">
              <div><dt>Diagnosis role</dt><dd>${esc(row.role)}</dd></div>
              <div><dt>Confidence</dt><dd>${esc(row.confidence)}</dd></div>
            </dl>
          </article>`).join("")}
      </div>
    </section>`;
}

function revenueRiskView(readout) {
  const risks = [
    ["Affected team", readout.affectedTeam],
    ["Affected funnel stage", readout.affectedFunnelStage],
    ["Expected GTM impact", readout.expectedImpact],
    ["What breaks next", readout.whatBreaksNext]
  ];
  return `
    <section class="demo-section revenue-risk-section">
      <div class="section-title">
        <span class="tag">Revenue-risk explanation</span>
        <h2>This is not just messaging inconsistency.</h2>
        <p class="muted">${esc(readout.revenueRisk)}</p>
      </div>
      <div class="risk-explanation-grid">
        ${risks.map(([label, value]) => readoutItem(label, value)).join("")}
      </div>
    </section>`;
}

function leadershipDecisionView(readout) {
  return `
    <section class="demo-section leadership-decision-section">
      <div>
        <span class="tag">Recommended leadership decision</span>
        <h2>${esc(readout.recommendedDecision)}</h2>
        <p class="muted">Cognix recommends a decision leadership can own, not a generic request to polish copy.</p>
      </div>
      <div class="decision-grid">
        ${readoutItem("Owner", readout.owner)}
        ${readoutItem("Urgency", readout.urgency)}
        ${readoutItem("Expected impact", readout.expectedImpact)}
        ${readoutItem("First action", readout.firstAction)}
      </div>
    </section>`;
}

function revOpsUseCaseView(readout) {
  const signals = [
    "Pasted CRM notes",
    "Pipeline review notes",
    "Forecast commentary",
    "Stage conversion observations",
    "Qualification themes",
    "Sales-to-CS handoff notes",
    "Attribution concerns",
    "Deal review notes"
  ];
  const risks = revenueRiskSet(readout);
  return `
    <section class="demo-section revops-use-case-section">
      <div class="section-title">
        <span class="tag">RevOps use case</span>
        <h2>Find the GTM issues behind pipeline noise.</h2>
        <p class="muted">Cognix supports RevOps by explaining why GTM signals are fragmenting into revenue risk. It does not replace RevOps systems.</p>
      </div>
      <div class="revops-grid">
        <article>
          <span>RevOps signals Cognix can read</span>
          <ul>${signals.map((signal) => `<li>${esc(signal)}</li>`).join("")}</ul>
        </article>
        <article>
          <span>Revenue risks Cognix explains</span>
          <ul>${risks.map((risk) => `<li>${esc(risk)}</li>`).join("")}</ul>
        </article>
        <article>
          <span>Current readout connection</span>
          <strong>${esc(readout.revenueRisk)}</strong>
          <p>${esc(readout.whatBreaksNext)}</p>
        </article>
      </div>
    </section>`;
}

function connectedMapView(report, project) {
  return `
    <section class="demo-section map-section">
      <div class="section-title">
        <span class="tag">Connected cognition map</span>
        <h2>Active GTM objects and relationships</h2>
        <p class="muted">This visual is secondary. It shows how the system connects signals, GTM objects, risks, and recommended action.</p>
      </div>
      ${ontologyPreview(report, project)}
    </section>`;
}

function propagationPathwaysView(report) {
  const pathways = report.organizational_propagation?.pathways?.length
    ? report.organizational_propagation.pathways
    : report.propagation_map || [];
  return `
    <section class="demo-section">
      <div class="section-title">
        <span class="tag">Propagation pathways</span>
        <h2>Where the contradiction spreads</h2>
      </div>
      <div class="pathway-grid">
        ${pathways.slice(0, 6).map((item) => `
          <article class="pathway-card">
            <strong>${esc(item.object || item.narrative || item.type || "GTM pathway")}</strong>
            <p>${esc(item.interpretation || `${item.object || "This signal"} is unevenly propagated across GTM surfaces.`)}</p>
            <span>${esc(item.propagation_score != null ? `${item.propagation_score}% propagated` : "Propagation tracked")}</span>
          </article>`).join("")}
      </div>
    </section>`;
}

function narrativePressureView(report) {
  const narratives = (report.narrative_gravity?.narratives || []).filter((item) => item.gravity_score > 0).slice(0, 4);
  const pressures = (report.strategic_pressure_model?.pressures || []).slice(0, 4);
  return `
    <section class="demo-section split-demo">
      <div>
        <span class="tag">Narrative gravity</span>
        <h2>Which story is pulling the GTM system</h2>
        <div class="gravity-list">
          ${narratives.map((item) => `<article style="--score:${item.gravity_score}%"><strong>${esc(item.narrative)}</strong><span>${esc(item.state)} · ${item.gravity_score}</span></article>`).join("") || "<p class='muted'>No strong narrative gravity detected yet.</p>"}
        </div>
      </div>
      <div>
        <span class="tag">Pressure fields</span>
        <h2>Where the business feels the risk</h2>
        <div class="pressure-list">
          ${pressures.map((item) => `<article><strong>${esc(item.tension)}</strong><p>${esc(item.interpretation)}</p><span>${esc(item.severity)}</span></article>`).join("") || "<p class='muted'>No strong pressure field detected yet.</p>"}
        </div>
      </div>
    </section>`;
}

function scenarioSimulationsView(report) {
  const scenarios = report.scenario_simulations || [];
  return `
    <section class="demo-section">
      <div class="section-title">
        <span class="tag">Scenario simulations</span>
        <h2>Leadership moves and expected GTM impact</h2>
      </div>
      <div class="scenario-grid">
        ${scenarios.slice(0, 3).map((item) => `
          <article class="scenario-card">
            <strong>${esc(item.scenario)}</strong>
            <p>${esc(item.likely_narrative_impact)}</p>
            <span>${esc(item.buyer_clarity_change)}</span>
          </article>`).join("") || "<p class='muted'>Scenario simulations appear after Cognix has enough signal evidence.</p>"}
      </div>
    </section>`;
}

function signalWorkspace(project) {
  const nextDemoSignal = demoSignals[(project.demo_step || 0) % demoSignals.length];
  return `
    <section class="demo-section ingestion-section">
      <div class="section-title">
        <span class="tag">Signal ingestion workspace</span>
        <h2>Add memory and rerun cognition</h2>
      </div>
      <div class="demo-signal-row">
        <div>
          <strong>Next demo signal: ${esc(nextDemoSignal.title)}</strong>
          <p>${esc(nextDemoSignal.notes)}</p>
        </div>
        <button class="btn blue" type="button" data-action="add-demo-signal">Add demo signal</button>
      </div>
      <div class="grid-2">
        <section class="report-panel flat-panel">
          <h3>Add custom signal</h3>
          ${signalForm()}
        </section>
        <section class="report-panel flat-panel">
          <h3>Active signals</h3>
          ${project.signals.length ? project.signals.map(signalCard).join("") : emptyView("No signals yet", "Add website copy, sales deck notes, launch plans, or customer feedback.")}
        </section>
      </div>
    </section>`;
}

function ontologyPreview(report, project) {
  const objects = report?.ontology?.objects || sampleOntologyObjects(project);
  const edges = report?.relationship_map?.edges || [];
  const sourceNodes = pickOntologyNodes(objects, ["ICP", "messaging", "positioning", "launch", "sales"], 4, [
    { name: "Website narrative", type: "Messaging" },
    { name: "Sales motion", type: "Sales" },
    { name: "Launch claim", type: "Positioning" },
    { name: "Customer feedback", type: "Market signal" }
  ]);
  const outputNodes = pickOntologyNodes(objects, ["risk", "commercial_offer", "proof_point", "competitor", "recommended_action"], 4, [
    { name: "Narrative drift", type: "Risk" },
    { name: "Commercial ambiguity", type: "Risk" },
    { name: "Buyer confusion", type: "Market risk" },
    { name: "Priority intervention", type: "Action" }
  ]);
  return `
    <section class="report-panel ontology-preview">
      <div class="workspace-head">
        <div>
          <span class="tag">Connected map</span>
          <h2>GTM cognition map</h2>
          <p class="muted">${objects.length} GTM objects · ${edges.length || Math.max(6, project.signals.length * 2)} relationships</p>
        </div>
        <small>${report?.ontology ? "Generated from active signals" : "Preview from active signals"}</small>
      </div>
      <div class="ontology-network">
        <div class="network-column">
          <span>GTM signals</span>
          ${sourceNodes.map(networkNode).join("")}
        </div>
        <div class="network-core">
          <svg viewBox="0 0 320 260" aria-hidden="true">
            <path d="M12 46 C84 46 88 130 154 130"></path>
            <path d="M12 100 C78 100 91 130 154 130"></path>
            <path d="M12 154 C78 154 91 130 154 130"></path>
            <path d="M12 208 C84 208 88 130 154 130"></path>
            <path d="M166 130 C232 130 236 46 308 46"></path>
            <path d="M166 130 C232 130 242 100 308 100"></path>
            <path d="M166 130 C232 130 242 154 308 154"></path>
            <path d="M166 130 C232 130 236 208 308 208"></path>
          </svg>
          <div class="core-orbit"></div>
          <div class="core-node">
            <span>Cognition readout</span>
            <strong>Cognix</strong>
            <small>Interprets meaning, risk, and action</small>
          </div>
        </div>
        <div class="network-column output">
          <span>Decisions</span>
          ${outputNodes.map(networkNode).join("")}
        </div>
      </div>
    </section>`;
}

function networkNode(object) {
  return `
    <button class="network-node" title="${esc(object.source_references?.[0]?.evidence || object.type || "GTM object")}">
      <strong>${esc(object.name)}</strong>
      <small>${esc(String(object.type || "signal").replaceAll("_", " "))}</small>
    </button>`;
}

function pickOntologyNodes(objects, types, limit, fallback) {
  const normalized = types.map((type) => type.toLowerCase());
  const picked = objects
    .filter((object) => normalized.some((type) => String(object.type || "").toLowerCase().includes(type)))
    .slice(0, limit);
  return picked.length ? picked : fallback.slice(0, limit);
}

function sampleOntologyObjects(project) {
  const base = [
    { name: "Website narrative", type: "messaging" },
    { name: "Sales motion", type: "sales" },
    { name: "Launch claim", type: "positioning" },
    { name: "Cognix", type: "cognition_layer" },
    { name: "Buyer confusion", type: "risk" },
    { name: "Commercial offer", type: "offer" },
    { name: "Executive decision", type: "recommended_action" }
  ];
  return project.signals?.length ? base : base.slice(0, 4);
}

function signalForm() {
  return `
    <form id="signal-form">
      <div class="field"><label>Signal type</label><select name="signal_type">${SIGNAL_TYPES.map((type) => `<option>${type}</option>`).join("")}</select></div>
      <div class="field"><label>Title</label><input name="title" required placeholder="Homepage hero, Q3 sales deck, win/loss notes..." /></div>
      <div class="field"><label>Content</label><textarea name="content" required></textarea></div>
      <div class="field"><label>Notes</label><textarea name="notes" placeholder="Context, source, owner, date, deal stage..."></textarea></div>
      <button class="btn primary" type="submit">Save signal</button>
    </form>`;
}

function newProjectForm() {
  return `
    <section class="report-panel">
      <div class="eyebrow">Project creation</div>
      <h2>Create readout project</h2>
      <form id="project-form" class="form-grid">
        <div>
          <div class="field"><label>Company name</label><input name="company_name" required /></div>
          <div class="field"><label>Project name</label><input name="project_name" required /></div>
          <div class="field"><label>Readout focus</label><input name="diagnostic_type" required placeholder="Narrative drift readout" /></div>
        </div>
        <div>
          <div class="field"><label>Company stage</label><input name="company_stage" required placeholder="Series B" /></div>
          <div class="field"><label>Primary buyer</label><input name="primary_buyer" required placeholder="VP Marketing" /></div>
          <button class="btn primary" type="submit">Create project</button>
        </div>
      </form>
    </section>`;
}

function signalCard(signal) {
  return `
    <article class="signal-row">
      <div><strong>${esc(signal.title)}</strong><br><span class="muted">${esc(signal.signal_type)} · ${new Date(signal.created_at).toLocaleString()}</span></div>
      <button class="btn" data-delete-signal="${signal.id}">Delete</button>
    </article>`;
}

function primaryContradiction(report) {
  const contradictions = report.contradictions || report.strategic_fragmentation_risks || [];
  return contradictions.find((item) => item.severity === "High") || contradictions[0] || {
    title: report.top_diagnosis || "GTM fragmentation emerging",
    severity: "Medium",
    interpretation: report.executive_summary || "Cognix is detecting early evidence that GTM signals are not carrying one shared interpretation.",
    business_consequence: "Leadership will need to resolve the GTM story before teams turn local interpretation into pipeline risk.",
    evidence: report.evidence?.map((item) => `${item.signal}: ${item.finding}`) || []
  };
}

function normalizeContradiction(contradiction = {}, report = {}) {
  const brief = executiveBriefData(report, contradiction);
  const evidence = contradiction.evidence?.length
    ? contradiction.evidence
    : contradiction.contributing_signals?.map((signal) => `${signal.signal_title || signal.signal_type}: contributed to the contradiction.`) || [];
  return {
    name: contradiction.title || "GTM fragmentation",
    plainEnglish: plainEnglishContradiction(contradiction),
    meaning: contradiction.interpretation || "GTM surfaces are no longer translating one shared strategic story.",
    evidence,
    rootCause: brief.rootCause,
    businessConsequence: brief.businessConsequence,
    revenueRisk: revenueRiskFor(contradiction.title, brief.businessConsequence),
    affectedTeam: affectedTeamFor(contradiction.title),
    affectedFunnelStage: affectedFunnelStageFor(contradiction.title),
    whatBreaksNext: brief.whatBreaksNext,
    recommendedDecision: brief.recommendedDecision,
    firstAction: brief.firstAction,
    owner: brief.owner,
    urgency: brief.urgency,
    expectedImpact: brief.expectedImpact
  };
}

function cognixReadout(project, report, contradiction, brief) {
  const evidenceCount = (contradiction.evidence || []).length;
  const normalized = normalizeContradiction(contradiction, report);
  const signalTypes = unique(project.signals.map((signal) => signal.signal_type));
  return {
    headline: `Cognix analyzed ${project.signals.length} GTM signals and found one major instability: ${normalized.name.toLowerCase()}.`,
    summary: normalized.plainEnglish,
    analyzed: `${project.signals.length} GTM signals across ${signalTypes.length} surfaces: ${signalTypes.join(", ")}.`,
    found: normalized.businessConsequence,
    rootCause: normalized.rootCause,
    businessConsequence: normalized.businessConsequence,
    revenueRisk: normalized.revenueRisk,
    next: brief.nextIntervention,
    evidence: `${evidenceCount || "Multiple"} evidence point${evidenceCount === 1 ? "" : "s"} tied to source signals.`,
    activeContradiction: normalized.name,
    affectedTeam: normalized.affectedTeam,
    affectedFunnelStage: normalized.affectedFunnelStage,
    whatBreaksNext: normalized.whatBreaksNext,
    recommendedDecision: normalized.recommendedDecision,
    firstAction: normalized.firstAction,
    owner: normalized.owner,
    urgency: normalized.urgency,
    expectedImpact: normalized.expectedImpact,
    chain: [
      ["Signal", `${project.signals.length} messy GTM signals across ${signalTypes.join(", ")}.`],
      ["Contradiction", normalized.name],
      ["Root cause", normalized.rootCause],
      ["Business consequence", normalized.businessConsequence],
      ["Revenue risk", normalized.revenueRisk],
      ["Recommended decision", normalized.recommendedDecision]
    ]
  };
}

function executiveBriefData(report, contradiction) {
  const priority = report.priority_engine?.[0] || {};
  const cause = report.causal_model?.primary_causes?.[0] || {};
  return {
    primaryInstability: contradiction.title || "GTM fragmentation",
    rootCause: contradiction.root_cause || cause.cause || cause.root_cause || "Parallel strategic frames are being treated as interchangeable.",
    businessConsequence: contradiction.business_consequence || cause.downstream_consequence || "Buyer clarity, sales interpretation, and leadership confidence are likely to diverge.",
    recommendedDecision: decisionFor(contradiction.title),
    nextIntervention: priority.intervention || "Create one narrative hierarchy and apply it across website, sales, launch, and enablement surfaces.",
    firstAction: firstActionFor(contradiction.title),
    owner: ownerFor(contradiction.title),
    urgency: contradiction.severity === "High" ? "Resolve before the next launch or field rollout." : "Resolve before creating more GTM assets.",
    expectedImpact: impactFor(contradiction.title),
    whatBreaksNext: contradiction.next_break_likely || report.causal_model?.next_break_likely || "buyer clarity weakens and sales interpretation variance increases."
  };
}

function executiveRiskRows(report, readout) {
  const contradictions = report.contradictions?.length ? report.contradictions : [primaryContradiction(report)];
  return contradictions.map((contradiction) => {
    const normalized = normalizeContradiction(contradiction, report);
    return {
      name: normalized.name,
      rootCause: normalized.rootCause,
      businessConsequence: normalized.businessConsequence,
      revenueRisk: normalized.revenueRisk,
      affectedTeam: normalized.affectedTeam,
      affectedFunnelStage: normalized.affectedFunnelStage,
      recommendedDecision: normalized.recommendedDecision,
      urgency: normalized.urgency,
      owner: normalized.owner,
      expectedImpact: normalized.expectedImpact
    };
  }).concat([{
    name: readout.activeContradiction,
    rootCause: readout.rootCause,
    businessConsequence: readout.businessConsequence,
    revenueRisk: readout.revenueRisk,
    affectedTeam: readout.affectedTeam,
    affectedFunnelStage: readout.affectedFunnelStage,
    recommendedDecision: readout.recommendedDecision,
    urgency: readout.urgency,
    owner: readout.owner,
    expectedImpact: readout.expectedImpact
  }]).filter((item, index, rows) => rows.findIndex((row) => row.name === item.name) === index);
}

function cognitionMemoryRows(project, report, previousReport, readout) {
  const reports = (project.reports?.length ? project.reports : [report]).slice(0, 5);
  return reports.map((savedReport, index) => {
    const contradiction = index === 0 ? primaryContradiction(report) : primaryContradiction(savedReport);
    const brief = index === 0 ? { ...readout, rootCause: readout.rootCause } : executiveBriefData(savedReport, contradiction);
    const prior = reports[index + 1] ? primaryContradiction(reports[index + 1]) : null;
    const currentRisk = riskScore(contradiction);
    const previousRisk = prior ? riskScore(prior) : Math.max(20, currentRisk - 14);
    const changeDirection = currentRisk > previousRisk ? "increased" : currentRisk < previousRisk ? "decreased" : "stayed the same";
    const latestSignal = project.signals[Math.max(0, project.signals.length - 1 - index)];
    return {
      label: `Run ${reports.length - index} · ${formatDate(savedReport.generated_at)}`,
      inputs: `${Math.max(1, project.signals.length - index)} signals used`,
      diagnosis: contradiction.title || readout.activeContradiction,
      riskScore: currentRisk,
      contradiction: contradiction.title || readout.activeContradiction,
      rootCause: brief.rootCause || readout.rootCause,
      revenueRisk: revenueRiskFor(contradiction.title, brief.businessConsequence || readout.businessConsequence),
      recommendedDecision: brief.recommendedDecision || readout.recommendedDecision,
      changed: index === 0
        ? cognitionChangeSummary(report, previousReport, latestSignal, changeDirection, previousRisk, currentRisk)
        : "Previous diagnosis preserved as memory for comparison."
    };
  });
}

function cognitionChangeSummary(report, previousReport, latestSignal = null, changeDirection = "", previousRisk = "", currentRisk = "") {
  const current = primaryContradiction(report);
  if (!previousReport) return "Add a new signal below to show how Cognix updates the diagnosis from memory.";
  const previous = primaryContradiction(previousReport);
  const signalLabel = latestSignal?.title || "the latest signal";
  if (previous.title !== current.title) {
    return `Cognition changed because ${signalLabel} shifted the active contradiction from ${previous.title.toLowerCase()} to ${current.title.toLowerCase()}. Risk ${changeDirection} from ${previousRisk} to ${currentRisk}.`;
  }
  return `Cognition changed because ${signalLabel} introduced new evidence into the same contradiction. Risk ${changeDirection} from ${previousRisk} to ${currentRisk}.`;
}

function evidenceTrailRows(contradiction) {
  const refs = contradiction.contributing_signals || [];
  const evidence = contradiction.evidence || [];
  if (refs.length) {
    return refs.map((ref, index) => ({
      source: ref.signal_title || ref.signal_type || "GTM signal",
      type: ref.signal_type || "GTM signal",
      claim: cleanEvidenceClaim(evidence[index] || evidence[0] || contradiction.title),
      why: whyEvidenceMatters(contradiction.title),
      role: evidenceRoleFor(contradiction.title, index),
      confidence: confidenceFor(contradiction.severity, index)
    }));
  }
  return evidence.map((line, index) => ({
    source: signalTitleFromEvidence(line) || "Evidence",
    type: signalTypeFromEvidence(line) || "GTM signal",
    claim: cleanEvidenceClaim(line),
    why: whyEvidenceMatters(contradiction.title),
    role: evidenceRoleFor(contradiction.title, index),
    confidence: confidenceFor(contradiction.severity, index)
  }));
}

function cleanEvidenceClaim(line = "") {
  const quoted = String(line).match(/"([^"]+)"/)?.[1];
  const claim = quoted || String(line).replace(/^[^:]+:\s*/, "");
  return claim.length > 150 ? `${claim.slice(0, 147).trim()}...` : claim;
}

function signalTitleFromEvidence(line = "") {
  return String(line).match(/^([^:]+):/)?.[1] || "";
}

function signalTypeFromEvidence(line = "") {
  const source = signalTitleFromEvidence(line).toLowerCase();
  if (source.includes("pipeline") || source.includes("forecast") || source.includes("crm") || source.includes("revops")) return "RevOps signal";
  if (source.includes("website")) return "Website copy";
  if (source.includes("sales") || source.includes("deck")) return "Sales deck";
  if (source.includes("enable")) return "Enablement asset";
  if (source.includes("customer") || source.includes("prospect")) return "Customer feedback";
  if (source.includes("launch")) return "Launch plan";
  if (source.includes("founder") || source.includes("strategy")) return "Strategy note";
  return "";
}

function evidenceRoleFor(title = "", index = 0) {
  if (index === 0) return "Supports the diagnosis";
  if (title.includes("Positioning") && index % 2 === 1) return "Contradicts the intended category claim";
  if (title.includes("AI")) return "Shows narrative drift from generated content";
  return index % 2 ? "Contradicts the diagnosis boundary" : "Supports the diagnosis";
}

function confidenceFor(severity = "", index = 0) {
  if (String(severity).toLowerCase().includes("high")) return index > 2 ? "Medium-high" : "High";
  if (String(severity).toLowerCase().includes("medium")) return "Medium";
  return "Directional";
}

function whyEvidenceMatters(title = "") {
  if (title.includes("Commercial") || title.includes("software") || title.includes("Service")) return "It changes how the offer is bought, priced, qualified, or explained.";
  if (title.includes("Positioning") || title.includes("Messaging")) return "It proves the market-facing story is carrying more than one controlling frame.";
  if (title.includes("AI")) return "It adds output without enough proof or category discipline.";
  return "It supports the active contradiction Cognix is asking leadership to resolve.";
}

function plainEnglishContradiction(contradiction = {}) {
  const title = contradiction.title || "";
  const evidence = (contradiction.evidence || []).map(cleanEvidenceClaim).filter(Boolean).slice(0, 3);
  if (title.includes("Positioning")) {
    return "The company is telling multiple versions of its story at once. One surface frames Cognix as revenue cognition, another as a readout workflow, another as a diagnostic workspace, and another as a reporting aid. This makes the product harder to understand and easier for sales to reinterpret.";
  }
  if (title.includes("Messaging")) {
    return "Different GTM surfaces are carrying different buyer promises. The buyer may hear the same product described in several ways before they understand the central claim.";
  }
  if (title.includes("ICP")) {
    return "The signals point to different primary buyers. That makes it harder for marketing, sales, and enablement to know which buyer problem should lead the story.";
  }
  if (title.includes("Commercial") || title.includes("software") || title.includes("Service")) {
    return "The offer is being described through competing buying motions. Buyers may not know whether they are evaluating a product, a workflow, guided support, or a strategic system.";
  }
  if (title.includes("AI") || title.includes("Generic")) {
    return "AI-generated language is adding polished claims without enough proof, buyer specificity, or strategic discipline. The content may sound complete while weakening the intended story.";
  }
  if (evidence.length) return `${contradiction.interpretation || "Cognix found a GTM contradiction."} Evidence: ${evidence.join(" ")}`;
  return contradiction.interpretation || "Cognix found a GTM contradiction that leadership should resolve before execution scales it.";
}

function revenueRiskFor(title = "", consequence = "") {
  const text = `${title} ${consequence}`.toLowerCase();
  if (text.includes("forecast")) return "Forecast confidence risk because opportunity notes are carrying different buyer promises and qualification logic.";
  if (text.includes("handoff")) return "Sales-to-CS handoff risk because the expectation sold in discovery may not match the delivery narrative inherited post-sale.";
  if (text.includes("stage")) return "Stage conversion risk because buyers are not receiving one coherent reason to advance.";
  if (text.includes("positioning") || text.includes("category")) return "Pipeline quality and stage conversion risk because buyers cannot quickly understand what the company is or why it matters.";
  if (text.includes("icp") || text.includes("buyer") || text.includes("audience")) return "Weaker pipeline quality because campaigns, qualification, and sales conversations may attract or advance different buyers.";
  if (text.includes("commercial") || text.includes("software") || text.includes("offer") || text.includes("service")) return "Longer sales cycles and lower forecast confidence because budget owner, purchase path, and packaging expectations are unclear.";
  if (text.includes("proof") || text.includes("ai") || text.includes("generic")) return "Lower buyer trust and weaker conversion because claims are not anchored in evidence the buyer can believe.";
  if (text.includes("conversion")) return "Interest may fail to become qualified pipeline because the next action and business outcome are unclear.";
  return "Sales cycle risk, forecast confidence risk, and weaker pipeline quality if execution scales the wrong story.";
}

function affectedTeamFor(title = "") {
  if (title.includes("ICP")) return "Marketing and Sales";
  if (title.includes("Commercial") || title.includes("software") || title.includes("Service")) return "Founder, Sales, and RevOps";
  if (title.includes("Positioning") || title.includes("Messaging")) return "Founder, PMM, Sales, and RevOps";
  if (title.includes("AI") || title.includes("Generic")) return "Marketing and Enablement";
  if (title.includes("Execution")) return "Enablement and Sales";
  return "Founder, Marketing, PMM, Sales, and RevOps";
}

function affectedFunnelStageFor(title = "") {
  if (title.includes("ICP")) return "Targeting, qualification, and discovery";
  if (title.includes("Commercial") || title.includes("software") || title.includes("Service")) return "Discovery, business case, and procurement";
  if (title.includes("AI") || title.includes("Generic")) return "Awareness, consideration, and sales enablement";
  if (title.includes("Conversion")) return "Website conversion and handoff to sales";
  return "Awareness, first call, and qualification";
}

function formatDate(value) {
  if (!value) return "current run";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function riskScore(contradiction = {}) {
  const severity = String(contradiction.severity || "").toLowerCase();
  if (severity.includes("high")) return 84;
  if (severity.includes("medium")) return 62;
  return 38;
}

function decisionFor(title = "") {
  if (title.includes("Commercial") || title.includes("Service") || title.includes("software")) return "Choose the primary commercial motion and make every secondary motion explicit.";
  if (title.includes("AI")) return "Replace generic AI claims with specific buyer pain, proof, and category language.";
  if (title.includes("ICP")) return "Choose the primary buyer and subordinate secondary audiences.";
    return "Create one narrative hierarchy and make it the operating reference across GTM.";
}

function firstActionFor(title = "") {
  if (title.includes("Commercial") || title.includes("Service") || title.includes("software")) return "Decide whether the first buying motion is product-led, guided, or strategic advisory, then update sales qualification against that motion.";
  if (title.includes("AI")) return "Audit AI-generated GTM drafts against the approved buyer, proof, and category claim before they reach the field.";
  if (title.includes("ICP")) return "Name the primary buyer and rewrite discovery, campaign targeting, and enablement around that buyer first.";
  return "Lock one primary category claim, one buyer, one core promise, and one proof system before scaling more campaigns or enablement.";
}

function ownerFor(title = "") {
  if (title.includes("Commercial") || title.includes("Service")) return "GTM leadership with PMM";
  if (title.includes("AI")) return "PMM with Enablement";
  if (title.includes("ICP")) return "Marketing and Sales leadership";
  return "PMM and GTM leadership";
}

function impactFor(title = "") {
  if (title.includes("Commercial") || title.includes("Service")) return "Cleaner qualification, packaging expectations, and executive confidence.";
  if (title.includes("AI")) return "Higher trust in claims and less generic category noise.";
  if (title.includes("ICP")) return "Sharper targeting, stronger objection handling, and less buyer confusion.";
  return "Stronger category clarity, lower sales interpretation variance, and cleaner pipeline review conversations.";
}

function revenueRiskSet(readout = {}) {
  const base = [
    "Pipeline quality risk",
    "Stage conversion risk",
    "Sales cycle risk",
    "Forecast confidence risk",
    "Handoff risk",
    "Churn or expansion risk"
  ];
  const active = String(readout.revenueRisk || "").toLowerCase();
  return base.map((risk) => {
    const keyword = risk.split(" ")[0].toLowerCase();
    return active.includes(keyword) ? `${risk} · active in this readout` : risk;
  });
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function scoreLine(label, value) {
  return `<div class="score-line"><div><span>${label}</span><strong>${value}</strong></div><div class="bar"><span style="width:${value}%"></span></div></div>`;
}

function scoreTile(label, value) {
  const score = Number.isFinite(Number(value)) ? Number(value) : 0;
  return `<div class="score-tile"><small>${esc(label)}</small><strong>${score}</strong><div class="bar"><span style="width:${score}%"></span></div></div>`;
}

function loadingView(stage = "") {
  const stages = [
    "Reading GTM signals",
    "Mapping entity relationships",
    "Detecting strategic contradictions",
    "Updating GTM memory",
    "Ranking priority interventions"
  ];
  const activeStage = stage || "Loading product state";
  return `
    <div class="state-card analysis-loading">
      <div class="loader"></div>
      <h2>${esc(activeStage)}</h2>
      <div class="analysis-steps">
        ${stages.map((item) => `<div class="${item === activeStage ? "active" : stages.indexOf(item) < stages.indexOf(activeStage) ? "done" : ""}">${esc(item)}</div>`).join("")}
      </div>
    </div>`;
}

function errorView(message) {
  return `<div class="state-card error"><h2>Error</h2><p>${esc(message)}</p></div>`;
}

function emptyView(title, message) {
  return `<div class="state-card"><h2>${esc(title)}</h2><p class="muted">${esc(message)}</p></div>`;
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0] || null;
}

async function createProject(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const project = {
    id: uid("project"),
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    signals: [],
    reports: []
  };

  if (state.mode === "supabase" && state.session) {
    const company = await createSupabaseCompany(project);
    const { data: saved, error } = await supabase.from("diagnostic_projects").insert({
      id: project.id,
      owner_id: state.session.user.id,
      company_id: company.id,
      name: project.project_name,
      diagnostic_type: project.diagnostic_type,
      company_stage: project.company_stage,
      primary_buyer: project.primary_buyer,
      primary_motion: project.diagnostic_type,
      status: "draft"
    }).select().single();
    if (error) throw error;
    project.id = saved.id;
  }

  state.projects.unshift(project);
  state.activeProjectId = project.id;
  if (state.mode === "local") saveLocalProjects();
}

async function createSupabaseCompany(project) {
  const { data, error } = await supabase.from("companies").insert({
    owner_id: state.session.user.id,
    name: project.company_name,
    stage: project.company_stage
  }).select().single();
  if (error) throw error;
  return data;
}

async function addSignal(project, form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const signal = {
    id: uid("signal"),
    project_id: project.id,
    signal_type: data.signal_type,
    title: data.title,
    content: data.content,
    notes: data.notes,
    created_at: new Date().toISOString()
  };

  if (state.mode === "supabase" && state.session) {
    const { data: saved, error } = await supabase.from("signals").insert({
      ...signal,
      owner_id: state.session.user.id
    }).select().single();
    if (error) throw error;
    signal.id = saved.id;
  }

  project.signals.push(signal);
  project.updated_at = new Date().toISOString();
  if (state.mode === "local") saveLocalProjects();
}

async function runProjectAnalysis(project) {
  let report;
  if (state.mode === "supabase" && state.session) {
    const response = await fetch("api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.session.access_token}`
      },
      body: JSON.stringify({ projectId: project.id })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Analysis failed.");
    report = payload.report;
  } else {
    report = runCognition(project, project.signals, project.memory || [], { engineLabel: "rule-based", aiUnavailable: true });
  }

  project.reports.unshift(report);
  project.memory = report.memory || project.memory || [];
  project.updated_at = new Date().toISOString();
  if (state.mode === "local") saveLocalProjects();
}

async function runAnalysisPipeline(project) {
  const stages = [
    "Reading GTM signals",
    "Mapping entity relationships",
    "Detecting strategic contradictions",
    "Updating GTM memory",
    "Ranking priority interventions"
  ];
  for (const stage of stages) {
    state.analysisStage = stage;
    state.loading = true;
    renderShell();
    await wait(450);
  }
  await runProjectAnalysis(project);
}

async function addDemoSignal(project) {
  const next = demoSignals[(project.demo_step || 0) % demoSignals.length];
  project.signals.push({
    id: uid("demo-signal"),
    project_id: project.id,
    signal_type: next.signal_type,
    title: next.title,
    content: next.content,
    notes: next.notes,
    created_at: new Date().toISOString()
  });
  project.demo_step = (project.demo_step || 0) + 1;
  project.updated_at = new Date().toISOString();
  await runProjectAnalysis(project);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function bindEvents() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.mode = button.dataset.mode;
      state.error = "";
      await loadAndRender();
    });
  });

  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeProjectId = button.dataset.project;
      renderShell();
    });
  });

  $("[data-action='new-project']")?.addEventListener("click", () => {
    $(".workspace").innerHTML = newProjectForm();
    bindEvents();
  });

  $("[data-action='seed-sample']")?.addEventListener("click", () => {
    state.projects = [withSampleCognition(cloneSampleProject())];
    state.activeProjectId = "sample-project";
    saveLocalProjects();
    renderShell();
  });

  $("[data-action='clear-memory']")?.addEventListener("click", () => {
    const project = getActiveProject();
    if (project) {
      project.reports = project.reports.slice(0, 1);
      project.memory = [];
      project.updated_at = new Date().toISOString();
    }
    state.storageWarning = "";
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Clearing saved memory is best effort.
    }
    saveLocalProjects();
    renderShell();
  });

  $("[data-action='run-analysis']")?.addEventListener("click", async () => {
    const project = getActiveProject();
    state.loading = true;
    state.analysisStage = "Mapping signal relationships";
    renderShell();
    try {
      await runAnalysisPipeline(project);
      state.loading = false;
      state.analysisStage = "";
      renderShell();
    } catch (error) {
      state.loading = false;
      state.analysisStage = "";
      state.error = error.message;
      renderShell();
    }
  });

  $("[data-action='add-demo-signal']")?.addEventListener("click", async () => {
    const project = getActiveProject();
    state.loading = true;
    state.analysisStage = "Updating GTM memory";
    renderShell();
    try {
      await addDemoSignal(project);
      state.loading = false;
      state.analysisStage = "";
      renderShell();
    } catch (error) {
      state.loading = false;
      state.analysisStage = "";
      state.error = error.message;
      renderShell();
    }
  });

  document.querySelectorAll("[data-delete-signal]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = getActiveProject();
      project.signals = project.signals.filter((signal) => signal.id !== button.dataset.deleteSignal);
      saveLocalProjects();
      renderShell();
    });
  });

  $("#project-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await createProject(event.currentTarget);
      renderShell();
    } catch (error) {
      state.error = error.message;
      renderShell();
    }
  });

  $("#signal-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await addSignal(getActiveProject(), event.currentTarget);
      renderShell();
    } catch (error) {
      state.error = error.message;
      renderShell();
    }
  });

  $("#auth-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const { error } = await supabase.auth.signInWithPassword(data);
    $("#auth-message").textContent = error ? error.message : "Signed in.";
  });

  $("[data-auth='signup']")?.addEventListener("click", async () => {
    const data = Object.fromEntries(new FormData($("#auth-form")).entries());
    const { error } = await supabase.auth.signUp(data);
    $("#auth-message").textContent = error ? error.message : "Account created. Check email confirmation settings.";
  });

  $("[data-action='signout']")?.addEventListener("click", async () => {
    await supabase.auth.signOut();
    state.session = null;
    renderShell();
  });
}

init();
