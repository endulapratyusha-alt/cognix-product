import { createClient } from "@supabase/supabase-js";
import { runDiagnostic } from "../lib/cognix/diagnostic-engine.js";
import { runCognition } from "../lib/cognix/cognition-engine.js";

const scoreKeys = [
  "overall_score",
  "narrative_coherence_score",
  "buyer_clarity_score",
  "differentiation_score",
  "commercial_focus_score"
];

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const projectId = request.body?.projectId;
  if (!projectId) {
    response.status(400).json({ error: "projectId is required." });
    return;
  }

  try {
    const db = getSupabaseServerClient();
    const user = await getRequestUser(db, request);
    const project = await fetchProject(db, projectId, user.id);
    const signals = await fetchSignals(db, projectId, user.id);
    if (!signals.length) {
      response.status(400).json({ error: "Add at least one signal before running analysis." });
      return;
    }

    const { data: run, error: runError } = await db.from("analysis_runs").insert({
      project_id: projectId,
      owner_id: user.id,
      status: "running",
      model: process.env.OPENAI_API_KEY ? process.env.OPENAI_MODEL || "gpt-4.1-mini" : "local-rule-engine",
      started_at: new Date().toISOString()
    }).select().single();
    if (runError) throw runError;

    let report;
    try {
      report = process.env.OPENAI_API_KEY
        ? await runOpenAIDiagnostic(project, signals)
        : runCognition(project, signals, [], { engineLabel: "rule-based", aiUnavailable: true });
    } catch (error) {
      report = runCognition(project, signals, [], { engineLabel: "rule-based", aiUnavailable: true });
      report.ai_error = error.message;
    }

    validateReport(report);

    const { data: savedReport, error: reportError } = await db.from("reports").insert({
      project_id: projectId,
      owner_id: user.id,
      analysis_run_id: run.id,
      coherence_score: report.overall_score,
      narrative_drift_score: report.narrative_coherence_score || report.narrative_drift_score,
      buyer_clarity_score: report.buyer_clarity_score,
      differentiation_score: report.differentiation_score,
      sales_usability_score: report.sales_usability_score || report.commercial_focus_score,
      launch_readiness_score: report.launch_readiness_score,
      top_diagnosis: report.top_diagnosis,
      summary: report.executive_summary,
      evidence: report.evidence,
      fix_first: report.fix_first,
      raw_output: report
    }).select().single();
    if (reportError) throw reportError;

    await db.from("analysis_runs").update({
      status: "completed",
      completed_at: new Date().toISOString()
    }).eq("id", run.id);

    await db.from("diagnostic_projects").update({
      status: "report_ready",
      coherence_score: report.overall_score,
      last_error: null
    }).eq("id", projectId);

    response.status(200).json({ report: savedReport.raw_output });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server credentials are not configured.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

async function getRequestUser(db, request) {
  const token = (request.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) throw new Error("Missing bearer token.");
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) throw new Error("Invalid session.");
  return data.user;
}

async function fetchProject(db, projectId, ownerId) {
  const { data, error } = await db
    .from("diagnostic_projects")
    .select("*,companies(*)")
    .eq("id", projectId)
    .eq("owner_id", ownerId)
    .single();
  if (error || !data) throw new Error("Project not found.");
  return {
    id: data.id,
    company_name: data.companies?.name || "",
    project_name: data.name,
    diagnostic_type: data.diagnostic_type || data.primary_motion,
    company_stage: data.company_stage || data.companies?.stage || "",
    primary_buyer: data.primary_buyer || ""
  };
}

async function fetchSignals(db, projectId, ownerId) {
  const { data, error } = await db
    .from("signals")
    .select("id,project_id,signal_type,title,content,notes,created_at")
    .eq("project_id", projectId)
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

async function runOpenAIDiagnostic(project, signals) {
  const local = runCognition(project, signals, [], { engineLabel: "rule-based" });
  const prompt = [
    "You are Cognix GTM Diagnostic Studio.",
    "Use the deterministic local diagnostic below as a baseline, then improve the diagnosis using the raw project and signal data.",
    "Return strict JSON only matching this shape:",
    JSON.stringify({
      cognition_version: "string",
      signal_extractions: [{
        signal_id: "string",
        signal_title: "string",
        signal_type: "string",
        narrative_claims: [],
        buyer_references: [],
        icp_references: [],
        value_propositions: [],
        commercial_offers: [],
        proof_points: [],
        ai_generated_language_indicators: [],
        competitor_references: [],
        ambiguity_signals: [],
        contradiction_candidates: []
      }],
      ontology: { objects: [] },
      relationship_map: { nodes: [], edges: [] },
      contradictions: [{ title: "string", severity: "High | Medium | Low", interpretation: "string", business_consequence: "string", evidence: [], root_cause: "string", contributing_signals: [], downstream_consequence: "string", next_break_likely: "string" }],
      causal_model: { primary_causes: [], reinforcing_signals: [], weakening_signals: [], downstream_consequences: [], next_break_likely: "string" },
      narrative_gravity: { narratives: [], dominant_narratives: [], competing_narratives: [], weakening_narratives: [], fragmented_propagation: [] },
      propagation_map: [],
      organizational_propagation: { pathways: [], propagation_decay: [], reinterpretation: [], narrative_mutation: [], execution_drift: [] },
      temporal_cognition: { timeline: [], narrative_evolution: [], positioning_shifts: [], buyer_objection_evolution: [], launch_trajectory: [], strategic_drift_over_time: [] },
      strategic_pressure_model: { pressures: [], weakening_alignment_points: [], conflicting_assumptions: [] },
      scenario_simulations: [],
      insight_hierarchy: [],
      insight_feed: [],
      priority_engine: [],
      executive_summary: "string",
      overall_score: 0,
      narrative_drift_score: 0,
      narrative_coherence_score: 0,
      buyer_clarity_score: 0,
      differentiation_score: 0,
      commercial_focus_score: 0,
      sales_usability_score: 0,
      launch_readiness_score: 0,
      top_diagnosis: "string",
      risks: [{ risk: "string", severity: "High | Medium | Low", why_it_matters: "string", evidence: ["specific signal evidence"] }],
      evidence: [{ signal: "signal title", finding: "string" }],
      recommendations: [{ action: "string", owner: "PMM | Enablement | Sales | Marketing | Product | RevOps | Leadership", priority: "High | Medium | Low", expected_impact: "string" }],
      fix_first: "string"
    }),
    "First extract structured cognition objects for every signal, then update the same cognition state schema used by the local baseline.",
    "Every contradiction and risk must include at least one evidence item tied to a submitted signal, plus root_cause, contributing_signals, downstream_consequence, and next_break_likely.",
    "Flag AI artifact language when content contains generic AI language, unsupported transformation claims, vague productivity framing, or inconsistent category claims.",
    "Every major finding, hierarchy item, and priority must include likely business consequences.",
    "Act as an active strategic cognition system: infer causes, tensions, temporal drift, narrative gravity, organizational propagation, and future scenario impacts. Do not behave like a flat analytics summary.",
    JSON.stringify({ project, signals, local_baseline: local })
  ].join("\n\n");

  const completion = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: prompt,
      temperature: 0.2
    })
  });

  if (!completion.ok) throw new Error(`OpenAI failed: ${(await completion.text()).slice(0, 500)}`);
  const payload = await completion.json();
  const text = payload.output_text || payload.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n") || "";
  const report = JSON.parse(text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, ""));
  Object.assign(report, {
    engine: "openai",
    signal_extractions: report.signal_extractions?.length ? report.signal_extractions : local.signal_extractions,
    contradictions: report.contradictions?.length ? report.contradictions : local.contradictions,
    causal_model: report.causal_model?.primary_causes?.length ? report.causal_model : local.causal_model,
    narrative_gravity: report.narrative_gravity?.narratives?.length ? report.narrative_gravity : local.narrative_gravity,
    propagation_map: report.propagation_map?.length ? report.propagation_map : local.propagation_map,
    organizational_propagation: report.organizational_propagation?.pathways?.length ? report.organizational_propagation : local.organizational_propagation,
    temporal_cognition: report.temporal_cognition?.timeline?.length ? report.temporal_cognition : local.temporal_cognition,
    strategic_pressure_model: report.strategic_pressure_model?.pressures ? report.strategic_pressure_model : local.strategic_pressure_model,
    scenario_simulations: report.scenario_simulations?.length ? report.scenario_simulations : local.scenario_simulations,
    insight_hierarchy: report.insight_hierarchy?.length ? report.insight_hierarchy : local.insight_hierarchy,
    insight_feed: report.insight_feed?.length ? report.insight_feed : local.insight_feed,
    priority_engine: report.priority_engine?.length ? report.priority_engine : local.priority_engine,
    memory: report.memory?.length ? report.memory : local.memory
  });
  if (!report.ontology || !report.relationship_map || !report.insight_feed) {
    return { ...local, engine: "openai-assisted", ai_note: "OpenAI output was incomplete, so Cognix preserved the local ontology cognition run." };
  }
  return report;
}

function validateReport(report) {
  for (const key of scoreKeys) {
    if (!Number.isFinite(Number(report[key]))) throw new Error(`${key} is missing or invalid.`);
  }
  if (!report.executive_summary || !report.top_diagnosis || !report.fix_first) throw new Error("Report is missing required narrative fields.");
  const risks = report.strategic_fragmentation_risks || report.risks;
  if (!Array.isArray(risks) || !risks.length) throw new Error("Report must include risks.");
  for (const risk of risks) {
    if (!risk.evidence?.length) throw new Error(`Risk "${risk.risk}" is missing evidence.`);
  }
  if (!Array.isArray(report.evidence) || !report.evidence.length) throw new Error("Report must include evidence.");
  const recommendations = report.recommended_priorities || report.recommendations;
  if (!Array.isArray(recommendations) || !recommendations.length) throw new Error("Report must include recommendations.");
}
