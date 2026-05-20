import { runCognition } from "../lib/cognix/cognition-engine.js";

const project = {
  id: "the-pmm",
  company_name: "The PMM",
  project_name: "The PMM GTM Cognition Map",
  diagnostic_type: "Ontology cognition run",
  company_stage: "Founder-led emerging SaaS",
  primary_buyer: "Head of Product Marketing"
};

const signals = [
  {
    id: "homepage",
    project_id: project.id,
    signal_type: "Website copy",
    title: "The PMM homepage",
    content: "The PMM is a strategic product marketing consultancy helping early-stage B2B SaaS teams sharpen positioning, messaging, launches, and GTM strategy.",
    notes: "Homepage",
    created_at: new Date().toISOString()
  },
  {
    id: "stack",
    project_id: project.id,
    signal_type: "Positioning document",
    title: "AI-Native GTM Stack",
    content: "The AI-Native GTM Stack introduces a broader AI-native operating model for modern GTM teams and positions the company around GTM cognition.",
    notes: "Thought leadership",
    created_at: new Date().toISOString()
  },
  {
    id: "engine",
    project_id: project.id,
    signal_type: "Launch plan",
    title: "PMM Narrative Engine launch",
    content: "Launch the PMM Narrative Engine as a diagnostic workspace and software platform. Offer a paid beta design partner package.",
    notes: "Launch plan",
    created_at: new Date().toISOString()
  },
  {
    id: "feedback",
    project_id: project.id,
    signal_type: "Customer feedback",
    title: "Prospect confusion notes",
    content: "A VP Marketing prospect asked whether The PMM is a consultancy, a framework company, or a SaaS platform.",
    notes: "Discovery notes",
    created_at: new Date().toISOString()
  }
];

const cognition = runCognition(project, signals, [], { engineLabel: "rule-based", aiUnavailable: true });
const failures = [];
if (!cognition.ontology.objects.length) failures.push("ontology objects missing");
if (!cognition.relationship_map.edges.length) failures.push("relationships missing");
if (!cognition.contradictions.length) failures.push("contradictions missing");
if (!cognition.insight_feed.length) failures.push("insight feed missing");
if (!cognition.priority_engine.length) failures.push("priorities missing");
if (!cognition.memory.length) failures.push("memory missing");
if (!cognition.contradictions.every((item) => item.evidence?.length)) failures.push("contradiction without evidence");
if (!cognition.causal_model?.primary_causes?.length) failures.push("causal model missing");
if (!cognition.narrative_gravity?.narratives?.length) failures.push("narrative gravity missing");
if (!cognition.organizational_propagation?.pathways?.length) failures.push("organizational propagation missing");
if (!cognition.temporal_cognition?.timeline?.length) failures.push("temporal cognition missing");
if (!cognition.strategic_pressure_model?.pressures) failures.push("strategic pressure missing");
if (!cognition.scenario_simulations?.length) failures.push("scenario simulations missing");
if (!cognition.insight_hierarchy?.length) failures.push("insight hierarchy missing");
if (!cognition.priority_engine.every((item) => item.consequence)) failures.push("priority without consequence");
if (!cognition.signal_extractions?.length) failures.push("signal extractions missing");
if (!cognition.signal_extractions.every((item) => Array.isArray(item.narrative_claims) && Array.isArray(item.contradiction_candidates))) failures.push("signal extraction shape invalid");
if (!cognition.contradictions.every((item) => item.root_cause && item.downstream_consequence && item.next_break_likely)) failures.push("contradiction causal hierarchy missing");
if (!cognition.causal_model.next_break_likely) failures.push("what breaks next missing");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  ontology_objects: cognition.ontology.objects.length,
  relationships: cognition.relationship_map.edges.length,
  contradictions: cognition.contradictions.map((item) => item.title).slice(0, 5),
  dominant_narrative: cognition.narrative_gravity.dominant_narratives[0]?.narrative,
  primary_cause: cognition.causal_model.primary_causes[0]?.cause,
  top_priority: cognition.priority_engine[0].priority,
  memory: cognition.memory.length
}, null, 2));
