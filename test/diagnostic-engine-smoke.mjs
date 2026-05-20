import { runDiagnostic } from "../lib/cognix/diagnostic-engine.js";

const project = {
  id: "test-project",
  company_name: "Northstar AI",
  project_name: "AI Platform Launch Diagnostic",
  diagnostic_type: "Launch coherence audit",
  company_stage: "Series B",
  primary_buyer: "VP Marketing"
};

const signals = [
  {
    id: "website",
    project_id: project.id,
    signal_type: "Website copy",
    title: "Homepage hero",
    content: "Automate manual GTM workflows with an AI-native platform for fast-growing B2B SaaS teams.",
    notes: "Public homepage",
    created_at: new Date().toISOString()
  },
  {
    id: "sales-deck",
    project_id: project.id,
    signal_type: "Sales deck",
    title: "Sales deck opener",
    content: "Save reps hours every week and improve sales productivity with guided workflows and faster follow-up.",
    notes: "Used by AEs",
    created_at: new Date().toISOString()
  },
  {
    id: "launch-plan",
    project_id: project.id,
    signal_type: "Launch plan",
    title: "Q3 launch plan",
    content: "Launch the AI transformation narrative for Series B SaaS companies before planning season. Goal is pipeline conversion and urgency around why now.",
    notes: "Leadership approved",
    created_at: new Date().toISOString()
  },
  {
    id: "competitor",
    project_id: project.id,
    signal_type: "Competitor messaging",
    title: "Competitor notes",
    content: "Competitor claims workflow automation and productivity. Buyer asked why we are different versus the status quo.",
    notes: "From win/loss review",
    created_at: new Date().toISOString()
  }
];

const report = runDiagnostic(project, signals, { engineLabel: "rule-based", aiUnavailable: true });

const failures = [];
for (const key of [
  "overall_score",
  "narrative_drift_score",
  "buyer_clarity_score",
  "differentiation_score",
  "sales_usability_score",
  "launch_readiness_score"
]) {
  if (!Number.isFinite(report[key])) failures.push(`${key} missing`);
}
if (!report.risks?.length) failures.push("risks missing");
if (!report.evidence?.length) failures.push("evidence missing");
if (!report.recommendations?.length) failures.push("recommendations missing");
if (report.risks?.some((risk) => !risk.evidence?.length)) failures.push("risk without evidence");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  top_diagnosis: report.top_diagnosis,
  overall_score: report.overall_score,
  risks: report.risks.length,
  evidence: report.evidence.length,
  recommendations: report.recommendations.length,
  fix_first: report.fix_first
}, null, 2));
