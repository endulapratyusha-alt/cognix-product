export const SIGNAL_TYPES = [
  "Website copy",
  "Positioning document",
  "Sales deck",
  "Enablement asset",
  "Launch plan",
  "Battlecard",
  "Win loss notes",
  "Sales call notes",
  "CRM notes",
  "Pipeline review notes",
  "Forecast commentary",
  "Stage conversion observations",
  "Qualification themes",
  "Sales-to-CS handoff notes",
  "Attribution concerns",
  "Deal review notes",
  "Customer feedback",
  "Competitor messaging"
];

const FRAME_TERMS = {
  automation: ["automation", "automate", "workflow", "manual work", "process"],
  productivity: ["productivity", "efficiency", "save time", "faster", "speed", "hours"],
  transformation: ["transformation", "ai-native", "platform", "modernize", "future"],
  revenue: ["pipeline", "revenue", "conversion", "win rate", "growth", "forecast", "stage", "qualification", "handoff", "churn", "expansion"],
  risk: ["risk", "compliance", "governance", "security", "trust"],
  insight: ["insight", "intelligence", "visibility", "analytics", "diagnose"]
};

const CATEGORY_TERMS = {
  software: ["software", "platform", "app", "product", "dashboard", "workspace", "system"],
  service: ["service", "consulting", "advisory", "done for you", "implementation", "agency"],
  ai: ["ai", "agent", "model", "copilot", "automation"],
  enablement: ["enablement", "training", "content", "asset", "readiness"],
  intelligence: ["intelligence", "diagnostic", "analysis", "signal", "insight"]
};

const AUDIENCE_TERMS = {
  pmm: ["pmm", "product marketer", "product marketing"],
  marketing: ["marketing", "cmo", "vp marketing", "demand"],
  sales: ["sales", "rep", "ae", "cro", "revenue"],
  revops: ["revops", "operations", "gtm leadership", "forecast", "pipeline review", "stage conversion", "qualification"],
  founder: ["founder", "ceo", "leadership"],
  customer_success: ["customer success", "cs", "post-sale"]
};

const PROOF_TERMS = ["case study", "customer", "roi", "%", "proof", "benchmark", "result", "evidence", "example"];
const URGENCY_TERMS = ["now", "urgent", "before", "today", "market shift", "why now", "risk", "deadline", "planning season"];
const ICP_TERMS = ["series", "b2b", "saas", "enterprise", "mid-market", "startup", "growth-stage", "50", "500"];
const COMMERCIAL_TERMS = ["pipeline", "revenue", "conversion", "win rate", "retention", "expansion", "pricing", "budget", "paid", "roi", "sales cycle", "forecast", "stage conversion", "qualification", "handoff", "churn"];
const DIFFERENTIATION_TERMS = ["different", "unlike", "versus", "vs", "alternative", "status quo", "competitor", "why us", "better than"];
const EXECUTION_TERMS = ["owner", "handoff", "rep", "talk track", "objection", "launch date", "enablement", "training", "rollout", "follow-up"];
const CONVERSION_TERMS = ["cta", "demo", "trial", "request", "contact", "signup", "book", "next step", "conversion"];

export function normalizeSignals(project, signals) {
  const normalizedSignals = (signals || []).map((signal, index) => {
    const content = clean(signal.content || "");
    const notes = clean(signal.notes || "");
    const title = signal.title || `${signal.signal_type || "Signal"} ${index + 1}`;
    const signal_type = SIGNAL_TYPES.includes(signal.signal_type) ? signal.signal_type : "Website copy";
    const text = clean(`${title}. ${content}. ${notes}`);
    return {
      id: signal.id || `signal-${index + 1}`,
      project_id: signal.project_id || project.id,
      signal_type,
      title,
      content,
      notes,
      created_at: signal.created_at || new Date().toISOString(),
      text,
      metadata: {
        word_count: text ? text.split(/\s+/).length : 0,
        frames: detect(FRAME_TERMS, text),
        categories: detect(CATEGORY_TERMS, text),
        audiences: detect(AUDIENCE_TERMS, text),
        claims: extractClaims(text),
        has_proof: hasAny(text, PROOF_TERMS),
        has_urgency: hasAny(text, URGENCY_TERMS),
        has_icp: hasAny(text, ICP_TERMS) || Boolean(project.primary_buyer),
        has_commercial_focus: hasAny(text, COMMERCIAL_TERMS),
        has_differentiation: hasAny(text, DIFFERENTIATION_TERMS),
        has_execution_detail: hasAny(text, EXECUTION_TERMS),
        has_conversion_path: hasAny(text, CONVERSION_TERMS)
      }
    };
  });

  return {
    project: {
      id: project.id,
      company_name: project.company_name,
      project_name: project.project_name || project.name,
      diagnostic_type: project.diagnostic_type,
      company_stage: project.company_stage,
      primary_buyer: project.primary_buyer
    },
    metadata: {
      signal_count: normalizedSignals.length,
      signal_types: [...new Set(normalizedSignals.map((signal) => signal.signal_type))],
      generated_at: new Date().toISOString()
    },
    grouped_signals: groupBy(normalizedSignals, "signal_type"),
    relationship_map: buildRelationshipMap(normalizedSignals),
    signals: normalizedSignals
  };
}

export function runDiagnostic(project, signals, options = {}) {
  const bundle = normalizeSignals(project, signals);
  if (!bundle.signals.length) throw new Error("At least one signal is required to run a diagnostic.");

  const findings = detectCrossSignalFindings(bundle);
  const risks = findings.risks.length ? findings.risks : [lowConfidenceRisk(bundle.signals[0])];
  const scores = scoreCoherence(bundle, risks);
  const strengths = detectStrengths(bundle);
  const recommendations = buildRecommendedPriorities(risks, bundle);

  return {
    engine: options.engineLabel || "rule-based",
    ai_unavailable: Boolean(options.aiUnavailable),
    generated_at: new Date().toISOString(),
    executive_summary: buildExecutiveSummary(project, risks, scores, options),
    overall_score: scores.overall,
    narrative_coherence_score: scores.narrative_coherence,
    narrative_drift_score: scores.narrative_coherence,
    buyer_clarity_score: scores.buyer_clarity,
    differentiation_score: scores.differentiation,
    commercial_focus_score: scores.commercial_focus,
    sales_usability_score: scores.execution_alignment,
    launch_readiness_score: scores.launch_readiness,
    top_diagnosis: risks[0].risk,
    diagnosis: buildDiagnosis(risks, bundle),
    strategic_strengths: strengths,
    strategic_fragmentation_risks: risks,
    risks,
    evidence: findings.evidence,
    recommendations,
    recommended_priorities: recommendations,
    fix_first: recommendations[0]?.action || "Add more varied GTM signals and rerun the diagnostic.",
    normalized_bundle: bundle
  };
}

function detectCrossSignalFindings(bundle) {
  const risks = [];
  const evidence = [];
  const signals = bundle.signals;
  const map = bundle.relationship_map;

  for (const signal of signals) {
    evidence.push({ signal: signal.title, finding: signalFinding(signal) });
  }

  if (map.frame_conflicts.length) {
    risks.push(risk(
      "Narrative drift",
      "High",
      "Core materials are leading with different value frames, so buyers and reps may not retain one clear reason to care.",
      map.frame_conflicts.slice(0, 4).map((item) => `${item.signal.title} leads with ${item.frame}.`)
    ));
  }

  if (map.category_conflicts.service && map.category_conflicts.software) {
    risks.push(risk(
      "Service vs software ambiguity",
      "High",
      "The GTM story blurs whether the company is selling a scalable product, an advisory service, or an AI-enabled implementation motion.",
      [
        `${map.category_conflicts.software.title} uses software/platform language.`,
        `${map.category_conflicts.service.title} uses service/advisory language.`
      ]
    ));
  }

  if (map.audience_conflicts.length > 1) {
    risks.push(risk(
      "ICP ambiguity",
      "High",
      "Different assets appear to aim at different internal buyers, which can fragment targeting, sales qualification, and conversion paths.",
      map.audience_conflicts.slice(0, 4).map((item) => `${item.signal.title} points toward ${item.audience}.`)
    ));
  }

  const commercialWeak = signals.filter((signal) => !signal.metadata.has_commercial_focus);
  if (commercialWeak.length / signals.length >= 0.5) {
    risks.push(risk(
      "Commercial wedge weakness",
      "High",
      "The GTM system does not consistently connect the narrative to revenue, pipeline, conversion, ROI, budget, or buying urgency.",
      commercialWeak.slice(0, 3).map((signal) => `${signal.title} lacks a clear commercial outcome or monetization path.`)
    ));
  }

  const conversionWeak = signals.filter((signal) => ["Website copy", "Launch plan", "Sales deck"].includes(signal.signal_type) && !signal.metadata.has_conversion_path);
  if (conversionWeak.length) {
    risks.push(risk(
      "Weak conversion flow",
      "Medium",
      "High-intent GTM surfaces should tell the buyer what to do next; otherwise strategic interest may not become pipeline.",
      conversionWeak.slice(0, 3).map((signal) => `${signal.title} does not make the next conversion step explicit.`)
    ));
  }

  const differentiationWeak = signals.filter((signal) => ["Website copy", "Sales deck", "Battlecard", "Competitor messaging"].includes(signal.signal_type) && !signal.metadata.has_differentiation);
  if (differentiationWeak.length >= 2) {
    risks.push(risk(
      "Differentiation weakness",
      "High",
      "The materials describe value but do not consistently create contrast against competitors, alternatives, or the status quo.",
      differentiationWeak.slice(0, 4).map((signal) => `${signal.title} does not establish a clear why-us contrast.`)
    ));
  }

  const proofWeak = signals.filter((signal) => !signal.metadata.has_proof);
  if (proofWeak.length / signals.length >= 0.5) {
    risks.push(risk(
      "Buyer confusion from unsupported claims",
      "Medium",
      "The story makes promises without enough proof, which forces buyers to infer credibility on their own.",
      proofWeak.slice(0, 3).map((signal) => `${signal.title} makes claims without customer evidence, metrics, or examples.`)
    ));
  }

  const executionWeak = signals.filter((signal) => ["Launch plan", "Enablement asset", "Sales deck", "Battlecard"].includes(signal.signal_type) && !signal.metadata.has_execution_detail);
  if (executionWeak.length) {
    risks.push(risk(
      "Execution alignment issue",
      "Medium",
      "Strategy is less likely to reach the field if launch and sales materials do not specify owners, talk tracks, objections, rollout, or handoff behavior.",
      executionWeak.slice(0, 4).map((signal) => `${signal.title} lacks execution detail for field activation.`)
    ));
  }

  if (map.claim_conflicts.length) {
    risks.push(risk(
      "Strategic contradiction",
      "High",
      "Different assets are making claims that can pull the buyer toward different interpretations of the product and its strategic role.",
      map.claim_conflicts.slice(0, 4).map((pair) => `${pair.a.title} says "${pair.a.claim}" while ${pair.b.title} says "${pair.b.claim}".`)
    ));
  }

  return { risks: dedupeRisks(risks), evidence };
}

function buildRelationshipMap(signals) {
  const frame_conflicts = [];
  const audience_conflicts = [];
  const category_conflicts = {};
  const claim_conflicts = [];

  for (const signal of signals) {
    const primaryFrame = signal.metadata.frames[0];
    if (primaryFrame) frame_conflicts.push({ signal, frame: primaryFrame });
    const primaryAudience = signal.metadata.audiences[0];
    if (primaryAudience) audience_conflicts.push({ signal, audience: primaryAudience });
    if (signal.metadata.categories.includes("software") && !category_conflicts.software) category_conflicts.software = signal;
    if (signal.metadata.categories.includes("service") && !category_conflicts.service) category_conflicts.service = signal;
  }

  const claims = signals.flatMap((signal) => signal.metadata.claims.map((claim) => ({ signal, claim, frame: signal.metadata.frames[0] || "general" })));
  for (let i = 0; i < claims.length; i += 1) {
    for (let j = i + 1; j < claims.length; j += 1) {
      if (claims[i].signal.id !== claims[j].signal.id && claims[i].frame !== claims[j].frame && claims[i].frame !== "general" && claims[j].frame !== "general") {
        claim_conflicts.push({ a: { title: claims[i].signal.title, claim: claims[i].claim }, b: { title: claims[j].signal.title, claim: claims[j].claim } });
      }
    }
  }

  return {
    frame_conflicts: hasMultipleValues(frame_conflicts.map((item) => item.frame)) ? frame_conflicts : [],
    audience_conflicts: hasMultipleValues(audience_conflicts.map((item) => item.audience)) ? audience_conflicts : [],
    category_conflicts,
    claim_conflicts
  };
}

function scoreCoherence(bundle, risks) {
  const signals = bundle.signals;
  const penalty = (names) => risks.filter((riskItem) => names.includes(riskItem.risk)).reduce((sum, riskItem) => sum + severityPenalty(riskItem.severity), 0);
  const narrative = 90 - penalty(["Narrative drift", "Positioning inconsistency", "Strategic contradiction", "Service vs software ambiguity"]);
  const buyer = presenceScore(signals, (signal) => signal.metadata.has_icp) - penalty(["ICP ambiguity", "Buyer confusion from unsupported claims"]) / 2;
  const differentiation = presenceScore(signals, (signal) => signal.metadata.has_differentiation) - penalty(["Differentiation weakness"]) / 2;
  const commercial = presenceScore(signals, (signal) => signal.metadata.has_commercial_focus) - penalty(["Commercial wedge weakness", "Unclear monetization path", "Weak conversion flow"]) / 2;
  const execution = presenceScore(signals, (signal) => signal.metadata.has_execution_detail) - penalty(["Execution alignment issue"]) / 2;
  const launchSignals = signals.filter((signal) => signal.signal_type === "Launch plan");
  const launch = launchSignals.length ? presenceScore(launchSignals, (signal) => signal.metadata.has_urgency && signal.metadata.has_commercial_focus && signal.metadata.has_execution_detail) : 62;
  const overall = average([narrative, buyer, differentiation, commercial, execution, launch]);
  return {
    overall: clamp(overall),
    narrative_coherence: clamp(narrative),
    buyer_clarity: clamp(buyer),
    differentiation: clamp(differentiation),
    commercial_focus: clamp(commercial),
    execution_alignment: clamp(execution),
    launch_readiness: clamp(launch)
  };
}

function detectStrengths(bundle) {
  const strengths = [];
  if (bundle.signals.some((signal) => signal.metadata.has_commercial_focus)) strengths.push("At least one signal connects the GTM story to pipeline, revenue, conversion, or productivity.");
  if (bundle.signals.some((signal) => signal.metadata.has_urgency)) strengths.push("The materials contain some why-now language that can be sharpened into urgency.");
  if (bundle.metadata.signal_types.length >= 4) strengths.push("The project includes multiple GTM surfaces, which gives the diagnosis meaningful cross-signal coverage.");
  if (bundle.signals.some((signal) => signal.metadata.has_differentiation)) strengths.push("There is some competitive or status-quo contrast present that can be made more consistent.");
  return strengths.length ? strengths : ["The team has begun centralizing GTM signals, which gives Cognix enough surface area to look for GTM fractures."];
}

function buildRecommendedPriorities(risks) {
  const recommendations = risks.slice(0, 5).map((riskItem) => {
    const map = {
      "Narrative drift": ["PMM", "Use the conflicting evidence to choose one controlling narrative, then rewrite website, sales, and launch materials around the same buyer tension, outcome, and proof.", "Creates one field-ready story instead of parallel narratives."],
      "ICP ambiguity": ["RevOps", "Define the primary buyer, segment, and qualification context, then update every core GTM surface to name that audience consistently.", "Improves targeting, conversion quality, and sales qualification."],
      "Commercial wedge weakness": ["Leadership", "Anchor the read to the commercial risk already present in the source signals: pipeline risk, conversion lift, sales consistency, launch success, or competitive win rate.", "Makes the product easier to buy, fund, and prioritize."],
      "Weak conversion flow": ["Marketing", "Replace the weak conversion step with a buyer-action CTA tied to the cited pain, proof, or commercial risk.", "Reduces interest-to-opportunity leakage."],
      "Differentiation weakness": ["PMM", "Build a why-us/why-not-status-quo contrast with proof and objection handling for the top competitive alternatives.", "Increases buyer confidence and rep consistency in competitive deals."],
      "Service vs software ambiguity": ["Leadership", "Decide whether Cognix is sold as software, a diagnostic service, or software plus guided onboarding, then make the packaging explicit.", "Removes buying confusion and clarifies monetization path."],
      "Execution alignment issue": ["Enablement", "Translate the source-backed story into talk tracks, objections, handoffs, launch owners, and rep usage moments.", "Turns strategy into field behavior."],
      "Strategic contradiction": ["PMM", "Resolve contradictory claims by naming the two conflicting receipts, choosing the primary promise, and binding secondary proof to it.", "Prevents buyers from hearing competing explanations of the product."]
    };
    const [owner, action, expected_impact] = map[riskItem.risk] || ["PMM", `Address ${riskItem.risk.toLowerCase()} using the cited evidence.`, "Reduces GTM fragmentation."];
    return { action, owner, priority: riskItem.severity, expected_impact };
  });
  return recommendations.length ? recommendations : [{
    action: "Add more signals across website, positioning, sales, launch, enablement, customer, and competitor surfaces, then rerun GTM fracture detection.",
    owner: "PMM",
    priority: "Medium",
    expected_impact: "Improves cross-signal confidence."
  }];
}

function buildDiagnosis(risks, bundle) {
  return `Cognix compared ${bundle.metadata.signal_count} signals across ${bundle.metadata.signal_types.join(", ")} and found the primary GTM fracture risk in ${risks[0].risk.toLowerCase()}. This is a cross-signal diagnosis with receipts, not an asset summary.`;
}

function buildExecutiveSummary(project, risks, scores, options) {
  const prefix = options.aiUnavailable ? "Rule-based diagnostic generated because AI analysis is unavailable. " : "";
  return `${prefix}${project.company_name || "This company"} has an overall GTM story strength score of ${scores.overall}. The strongest issue is ${risks[0].risk.toLowerCase()}, supported by evidence across submitted GTM signals. Fixing this first should improve buyer clarity, field consistency, and conversion focus before the team creates more assets.`;
}

function signalFinding(signal) {
  const m = signal.metadata;
  const strengths = [
    m.frames.length ? `frame: ${m.frames.join(", ")}` : "",
    m.audiences.length ? `audience: ${m.audiences.join(", ")}` : "",
    m.categories.length ? `category: ${m.categories.join(", ")}` : "",
    m.has_commercial_focus ? "commercial connection present" : "",
    m.has_differentiation ? "differentiation present" : ""
  ].filter(Boolean);
  const gaps = [
    !m.has_proof ? "proof weak" : "",
    !m.has_conversion_path ? "conversion path unclear" : "",
    !m.has_execution_detail ? "execution detail weak" : "",
    !m.has_icp ? "ICP unclear" : ""
  ].filter(Boolean);
  return `${strengths.join("; ") || "few clear strategic anchors"}; ${gaps.join("; ") || "few obvious gaps"}.`;
}

function risk(riskName, severity, why_it_matters, evidence) {
  return { risk: riskName, severity, why_it_matters, evidence: evidence.filter(Boolean) };
}

function lowConfidenceRisk(signal) {
  return risk("GTM story evidence gap", "Low", "There are not enough varied GTM signals to make a high-confidence cross-signal diagnosis.", [`${signal.title} is the only evidence source currently available.`]);
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function hasAny(text, terms) {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function detect(dictionary, text) {
  return Object.entries(dictionary).filter(([, terms]) => hasAny(text, terms)).map(([key]) => key);
}

function extractClaims(text) {
  return clean(text).split(/(?<=[.!?])\s+/).filter((sentence) => sentence.length > 38).slice(0, 4);
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    groups[item[key]] ||= [];
    groups[item[key]].push(item);
    return groups;
  }, {});
}

function hasMultipleValues(values) {
  return new Set(values.filter(Boolean)).size > 1;
}

function presenceScore(signals, predicate) {
  if (!signals.length) return 0;
  return 35 + (signals.filter(predicate).length / signals.length) * 65;
}

function severityPenalty(severity) {
  return severity === "High" ? 22 : severity === "Medium" ? 14 : 8;
}

function dedupeRisks(risks) {
  const seen = new Set();
  return risks.filter((riskItem) => {
    if (seen.has(riskItem.risk)) return false;
    seen.add(riskItem.risk);
    return riskItem.evidence.length;
  });
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
