import { runDiagnostic, normalizeSignals } from "./diagnostic-engine.js";

export const ONTOLOGY_TYPES = [
  "ICP",
  "buyer_pain",
  "messaging",
  "positioning",
  "value_prop",
  "proof_point",
  "competitor",
  "objection",
  "launch",
  "enablement_theme",
  "channel",
  "stakeholder_role",
  "commercial_offer",
  "strategic_goal"
];

const STRATEGIC_SURFACES = [
  "Website copy",
  "Positioning document",
  "Launch plan",
  "Sales deck",
  "Enablement asset",
  "Battlecard",
  "Sales call notes",
  "Customer feedback",
  "Win loss notes",
  "Competitor messaging"
];

const NARRATIVE_MODELS = {
  "Founder narrative": ["founder", "operator", "advisor", "credibility", "vision", "expert"],
  "Enterprise narrative": ["enterprise", "governance", "security", "scale", "standardize", "stakeholder"],
  "AI-native category narrative": ["ai-native", "category", "operating model", "gtm stack", "cognition", "agent"],
  "Operational efficiency narrative": ["efficiency", "save time", "workflow", "automation", "productivity", "manual"],
  "Transformation narrative": ["transformation", "modernize", "future", "strategic", "change", "new way"],
  "Commercial performance narrative": ["pipeline", "revenue", "conversion", "win rate", "sales cycle", "roi"]
};

const EXTRACTION_TERMS = {
  buyer_references: ["vp marketing", "cmo", "head of product marketing", "pmm", "product marketer", "gtm leader", "revops", "enablement", "sales", "founder", "ceo", "buyer", "prospect"],
  icp_references: ["early-stage", "series a", "series b", "b2b saas", "startup", "mid-market", "enterprise", "growth-stage"],
  value_propositions: ["helps", "reduce", "increase", "improve", "accelerate", "detect", "diagnose", "align", "clarify", "turn", "make"],
  commercial_offers: ["free founding access", "first audit free", "founding access", "package", "offer", "trial", "demo", "subscription", "workspace", "platform", "consulting", "workshop", "onboarding"],
  proof_points: ["case study", "customer", "roi", "proof", "benchmark", "result", "evidence", "research-backed", "founder credibility", "%"],
  competitor_references: ["seismic", "highspot", "gong", "klue", "consultancy", "agency", "chatgpt", "copilot", "enablement platform", "competitor", "alternative"],
  ambiguity_signals: ["unclear", "confusing", "ambiguous", "whether", "or", "not understand", "different from", "fragmentation", "drift", "inconsistent"],
  generic_ai_language: ["unlock", "leverage ai", "transform", "revolutionize", "streamline", "supercharge", "game-changing", "seamless", "productivity", "efficiency", "future of", "modernize"]
};

const EXTRACTORS = {
  ICP: {
    "Early-stage B2B SaaS": ["early-stage", "series a", "series b", "b2b saas", "startup"],
    "Modern GTM teams": ["gtm team", "marketing", "sales", "enablement", "revops"],
    "PMM leaders": ["pmm", "product marketing", "head of product marketing"]
  },
  buyer_pain: {
    "Narrative fragmentation": ["fragmentation", "drift", "inconsistent", "misalignment"],
    "Buyer confusion": ["confusion", "unclear", "ambiguous", "do not understand"],
    "Reactive enablement": ["reactive", "content graveyard", "not using", "rep adoption"],
    "Pipeline conversion risk": ["pipeline", "conversion", "win rate", "lost deal"]
  },
  messaging: {
    "GTM fracture readout": ["gtm fracture", "cognix readout", "leadership decision", "revenue risk"],
    "AI-native GTM operating model": ["ai-native", "operating model", "gtm stack"],
    "PMM narrative engine": ["narrative engine", "pmm narrative", "diagnose your gtm"],
    "Strategic GTM consultancy": ["consultancy", "advisory", "framework", "workshop"],
    "GTM diagnostic software": ["diagnostic studio", "diagnostic workspace", "workspace", "software", "platform"],
    "Reporting aid": ["reporting aid", "better reports", "summaries", "summary"]
  },
  positioning: {
    "GTM fracture system": ["gtm fracture", "gtm drift", "positioning-to-execution", "receipts"],
    "GTM readout workflow": ["readout", "evidence trail", "leadership decision"],
    "GTM evidence layer": ["evidence trail", "receipts", "interpretation layer", "relational intelligence"],
    "PMM advisory brand": ["the pmm", "product marketing mantra", "consultancy"],
    "AI platform": ["ai platform", "ai-native platform", "software platform"],
    "Reporting aid": ["reporting aid", "reports", "summary"]
  },
  value_prop: {
    "Detect fragmentation before pipeline loss": ["detect", "fragmentation", "pipeline"],
    "Turn GTM signals into priorities": ["signals", "priorities", "what to fix first"],
    "Make sales narrative usable": ["rep", "talk track", "sales usability", "enablement"]
  },
  proof_point: {
    "Community expertise": ["community", "pmm community", "research-backed"],
    "Customer evidence": ["case study", "customer", "roi", "proof", "%"],
    "Founder credibility": ["founder", "operator", "advisor", "expert"]
  },
  competitor: {
    "Consultancies": ["agency", "consultancy", "advisor"],
    "Enablement platforms": ["enablement platform", "seismic", "highspot", "content platform"],
    "ChatGPT-style tools": ["chatbot", "copilot", "ai writing", "content generator"]
  },
  objection: {
    "Is this software or service": ["software or service", "consultancy or platform", "ambiguous"],
    "Unclear business outcome": ["business outcome", "roi", "why now", "budget"],
    "Too PMM-specific": ["only pmm", "for pmms", "product marketing only"]
  },
  launch: {
    "AI-Native GTM Stack launch": ["ai-native gtm stack", "launch", "category wedge"],
    "GTM fracture detection beta": ["beta", "free founding access", "gtm fracture detection"]
  },
  enablement_theme: {
    "Field narrative consistency": ["talk track", "rep", "battlecard", "objection"],
    "Launch readiness": ["launch readiness", "rollout", "owner", "handoff"]
  },
  channel: {
    "Homepage": ["homepage", "website", "hero"],
    "Sales narrative": ["sales deck", "sales call", "ae"],
    "Founder narrative": ["founder", "vision", "thought leadership"],
    "Launch narrative": ["launch plan", "announcement"]
  },
  stakeholder_role: {
    "PMM": ["pmm", "product marketing"],
    "Enablement": ["enablement"],
    "Sales": ["sales", "rep", "ae", "cro"],
    "Founder": ["founder", "ceo"],
    "GTM leadership": ["gtm leader", "revops", "cmo", "vp marketing"]
  },
  commercial_offer: {
    "Free founding access": ["free founding access", "first audit free", "founding access"],
    "Diagnostic workspace": ["diagnostic workspace", "studio", "workspace"],
    "Consulting engagement": ["workshop", "advisory", "consulting", "consultancy"]
  },
  strategic_goal: {
    "Create a new category": ["category", "category-defining", "continuous gtm drift"],
    "Prevent pipeline loss": ["pipeline loss", "conversion", "pipeline risk"],
    "Bind GTM story to receipts": ["shared view", "receipts", "gtm fracture"]
  }
};

export function runCognition(project, signals, previousMemory = [], options = {}) {
  const bundle = normalizeSignals(project, signals);
  const signalExtractions = bundle.signals.map((signal) => extractSignalCognition(signal, project));
  bundle.signal_extractions = signalExtractions;
  const ontology = buildOntology(bundle, previousMemory);
  const relationships = buildOntologyRelationships(ontology, bundle);
  const contradictions = detectOntologyContradictions(ontology, relationships, bundle);
  const propagation = mapPropagation(ontology, bundle);
  const causalModel = buildCausalReasoning(ontology, relationships, contradictions, propagation, bundle);
  const narrativeGravity = modelNarrativeGravity(bundle, previousMemory);
  const organizationalPropagation = analyzeOrganizationalPropagation(ontology, propagation, bundle, narrativeGravity);
  const temporalCognition = buildTemporalCognition(bundle, ontology, contradictions, previousMemory);
  const pressureModel = modelStrategicPressure(contradictions, propagation, narrativeGravity, organizationalPropagation);
  const scenarioSimulations = simulateScenarios(causalModel, narrativeGravity, pressureModel, propagation);
  const insightHierarchy = buildInsightHierarchy(contradictions, propagation, causalModel, narrativeGravity, pressureModel, temporalCognition);
  const insightFeed = buildInsightFeed(ontology, contradictions, propagation, previousMemory, causalModel, narrativeGravity, temporalCognition);
  const priorities = rankPriorities(contradictions, propagation, ontology, insightHierarchy);
  const diagnostic = runDiagnostic(project, signals, options);
  const memoryEntry = {
    id: `memory-${Date.now()}`,
    created_at: new Date().toISOString(),
    summary: insightHierarchy[0]?.finding || insightFeed[0]?.insight || diagnostic.top_diagnosis,
    ontology_counts: countBy(ontology.objects, "type"),
    contradictions: contradictions.map((item) => item.title),
    dominant_narratives: narrativeGravity.dominant_narratives.map((item) => item.narrative),
    strategic_pressure: pressureModel.pressures.slice(0, 3).map((item) => item.tension),
    dominant_entities: ontology.objects.slice(0, 6).map((object) => object.name)
  };

  return {
    cognition_version: "0.3",
    engine: options.engineLabel || "rule-based",
    ai_unavailable: Boolean(options.aiUnavailable),
    generated_at: new Date().toISOString(),
    signal_extractions: signalExtractions,
    ontology,
    relationship_map: relationships,
    contradictions,
    causal_model: causalModel,
    narrative_gravity: narrativeGravity,
    propagation_map: propagation,
    organizational_propagation: organizationalPropagation,
    temporal_cognition: temporalCognition,
    strategic_pressure_model: pressureModel,
    scenario_simulations: scenarioSimulations,
    insight_hierarchy: insightHierarchy,
    insight_feed: insightFeed,
    priority_engine: priorities,
    strategic_risk_layer: priorities.filter((item) => item.risk_level === "High"),
    memory: [...previousMemory, memoryEntry].slice(-12),
    report: diagnostic,
    ...diagnostic
  };
}

export function buildOntology(bundle, previousMemory = []) {
  const objects = [];
  for (const signal of bundle.signals) {
    for (const type of ONTOLOGY_TYPES) {
      const extractor = EXTRACTORS[type];
      for (const [name, terms] of Object.entries(extractor)) {
        const matches = terms.filter((term) => signal.text.toLowerCase().includes(term));
        if (!matches.length) continue;
        const existing = objects.find((object) => object.type === type && object.name === name);
        const sourceReference = {
          signal_id: signal.id,
          signal_title: signal.title,
          signal_type: signal.signal_type,
          evidence: excerpt(signal.text, matches[0])
        };
        if (existing) {
          existing.source_references.push(sourceReference);
          existing.appears_in.push(signal.signal_type);
          existing.confidence = Math.min(0.96, existing.confidence + 0.08);
        } else {
          objects.push({
            id: slug(`${type}-${name}`),
            type,
            name,
            confidence: confidenceFor(matches.length, signal),
            source_references: [sourceReference],
            relationships: [],
            timestamps: {
              first_seen: signal.created_at,
              last_seen: signal.created_at,
              updated_at: new Date().toISOString()
            },
            evolution_history: previousMemory.filter((entry) => entry.dominant_entities?.includes(name)).map((entry) => ({
              memory_id: entry.id,
              seen_at: entry.created_at,
              note: entry.summary
            })),
            appears_in: [signal.signal_type],
            missing_in: []
          });
        }
      }
    }
  }

  for (const object of objects) {
    object.appears_in = [...new Set(object.appears_in)];
    object.missing_in = bundle.metadata.signal_types.filter((type) => !object.appears_in.includes(type));
  }

  return {
    objects: objects.sort((a, b) => b.confidence - a.confidence),
    by_type: groupBy(objects, "type"),
    memory_used: previousMemory.length
  };
}

function buildOntologyRelationships(ontology, bundle) {
  const relationships = [];
  const objects = ontology.objects;
  for (const a of objects) {
    for (const b of objects) {
      if (a.id === b.id) continue;
      const sharedSources = a.source_references.filter((source) => b.source_references.some((other) => other.signal_id === source.signal_id));
      if (sharedSources.length) {
        relationships.push({
          id: slug(`${a.id}-${b.id}`),
          from: a.id,
          to: b.id,
          type: relationshipType(a, b),
          confidence: Math.min(0.95, 0.5 + sharedSources.length * 0.15),
          source_references: sharedSources,
          interpretation: `${a.name} and ${b.name} co-occur in ${sharedSources.map((source) => source.signal_title).join(", ")}.`
        });
      }
    }
  }

  return {
    nodes: objects.map((object) => ({
      id: object.id,
      label: object.name,
      type: object.type,
      confidence: object.confidence
    })),
    edges: relationships.slice(0, 80),
    signal_coverage: bundle.metadata.signal_types.map((type) => ({
      signal_type: type,
      entities: objects.filter((object) => object.appears_in.includes(type)).length
    }))
  };
}

function detectOntologyContradictions(ontology, relationships, bundle) {
  const contradictions = [];
  const byType = ontology.by_type;
  addConflict(contradictions, byType.positioning, "Positioning fragmentation", "Multiple positioning systems are active at once, creating uncertainty about whether the company is a GTM fracture readout, launch review workflow, reporting aid, or software product.", "High");
  addConflict(contradictions, byType.messaging, "Messaging system conflict", "Messaging objects are not converging into one hierarchy; they create parallel narratives instead of propagation.", "High");
  addConflict(contradictions, byType.commercial_offer, "Commercial offer ambiguity", "The ontology contains multiple offer shapes, which can blur monetization and buying path.", "High");
  addConflict(contradictions, byType.ICP, "ICP fragmentation", "ICP references do not propagate evenly across sales, homepage, and founder narrative surfaces.", "Medium");

  const service = ontology.objects.find((object) => object.name === "Strategic GTM consultancy" || object.name === "Consulting engagement");
  const software = ontology.objects.find((object) => object.name === "GTM diagnostic software" || object.name === "Diagnostic workspace");
  if (service && software) {
    contradictions.push({
      title: "Service vs software ambiguity",
      severity: "High",
      interpretation: "The ontology contains both consultancy/service framing and software/workspace framing. This creates commercial ambiguity between advisory motion, framework company, and emerging SaaS platform.",
      business_consequence: consequenceFor("Service vs software ambiguity"),
      evidence: [
        evidenceLine(service),
        evidenceLine(software)
      ],
      affected_objects: [service.id, software.id]
    });
  }

  const thoughtLeadership = ontology.objects.find((object) => object.name === "AI-Native GTM Stack launch" || object.name === "AI-native GTM operating model");
  const offer = ontology.objects.find((object) => object.type === "commercial_offer");
  if (thoughtLeadership && offer && !shareSignal(thoughtLeadership, offer)) {
    contradictions.push({
      title: "Thought leadership not connected to commercial offer",
      severity: "Medium",
      interpretation: "The strongest category narrative appears disconnected from the packaged offer, weakening conversion from belief to buying action.",
      business_consequence: consequenceFor("Thought leadership not connected to commercial offer"),
      evidence: [evidenceLine(thoughtLeadership), evidenceLine(offer)],
      affected_objects: [thoughtLeadership.id, offer.id]
    });
  }

  for (const object of ontology.objects.filter((item) => item.missing_in.length >= Math.max(2, bundle.metadata.signal_types.length - 1))) {
    contradictions.push({
      title: `${object.name} has weak GTM propagation`,
      severity: object.type === "value_prop" || object.type === "positioning" ? "High" : "Medium",
      interpretation: `${object.name} appears in ${object.appears_in.join(", ")} but is missing from ${object.missing_in.join(", ")}.`,
      business_consequence: consequenceFor("weak GTM propagation", object),
      evidence: [evidenceLine(object)],
      affected_objects: [object.id]
    });
  }

  for (const extraction of bundle.signal_extractions || []) {
    if (extraction.ai_generated_language_indicators.length) {
      contradictions.push({
        title: "Generic AI language weakening strategic specificity",
        severity: extraction.signal_title.toLowerCase().includes("ai-generated") ? "High" : "Medium",
        interpretation: `${extraction.signal_title} contains generic or unsupported AI language that may sound polished without increasing buyer clarity.`,
        business_consequence: "Buyer trust may weaken because transformation language is not anchored in a concrete claim, proof point, or commercial motion.",
        evidence: extraction.ai_generated_language_indicators.map((item) => `${extraction.signal_title}: ${item}`),
        affected_objects: [],
        contributing_signals: [signalRef(extraction)]
      });
    }
    for (const candidate of extraction.contradiction_candidates) {
      contradictions.push({
        title: candidate.title,
        severity: candidate.severity,
        interpretation: candidate.interpretation,
        business_consequence: candidate.business_consequence,
        evidence: candidate.evidence,
        affected_objects: [],
        contributing_signals: [signalRef(extraction)]
      });
    }
  }

  return contradictions
    .map(enrichContradiction)
    .sort((a, b) => contradictionScore(b) - contradictionScore(a))
    .slice(0, 12);
}

function mapPropagation(ontology, bundle) {
  return ontology.objects
    .filter((object) => ["positioning", "messaging", "value_prop", "ICP", "commercial_offer"].includes(object.type))
    .map((object) => ({
      object_id: object.id,
      object: object.name,
      type: object.type,
      appears_in: object.appears_in,
      missing_in: object.missing_in,
      propagation_score: Math.round((object.appears_in.length / Math.max(1, bundle.metadata.signal_types.length)) * 100),
      decay_points: STRATEGIC_SURFACES.filter((surface) => bundle.metadata.signal_types.includes(surface) && !object.appears_in.includes(surface)),
      interpretation: object.missing_in.length
        ? `${object.name} has not propagated into ${object.missing_in.join(", ")}.`
        : `${object.name} is broadly propagated across supplied GTM signals.`
    }))
    .sort((a, b) => a.propagation_score - b.propagation_score);
}

function buildCausalReasoning(ontology, relationships, contradictions, propagation, bundle) {
  const causes = [];
  const relationshipEdges = relationships.edges || [];
  const fragmentedObjects = propagation.filter((item) => item.propagation_score < 60);
  const highContradictions = contradictions.filter((item) => item.severity === "High");

  if (highContradictions.some((item) => item.title.includes("Positioning") || item.title.includes("Messaging"))) {
    causes.push(cause(
      "Parallel strategic frames are being treated as interchangeable",
      "Different surfaces are carrying different controlling ideas, so teams can select the story that fits their immediate work instead of inheriting one shared narrative hierarchy.",
      "Positioning fragmentation, sales interpretation variance, and weaker category recall.",
      highContradictions.filter((item) => item.title.includes("Positioning") || item.title.includes("Messaging")).flatMap((item) => item.evidence || []).slice(0, 3)
    ));
  }

  if (highContradictions.some((item) => item.title.includes("Commercial") || item.title.includes("software"))) {
    causes.push(cause(
      "The offer architecture has not resolved the buying motion",
      "Consulting, product, diagnostic workspace, and category language are all present before the system names which motion is primary.",
      "Budget ownership, packaging expectations, and buyer confidence are likely to diverge across deals.",
      highContradictions.filter((item) => item.title.includes("Commercial") || item.title.includes("software")).flatMap((item) => item.evidence || []).slice(0, 3)
    ));
  }

  if (fragmentedObjects.length) {
    causes.push(cause(
      "Strategic ideas are not surviving channel transfer",
      "Core objects appear in some materials but disappear before they reach field or buyer-facing surfaces.",
      "Enablement will need to reinterpret strategy locally, increasing execution drift and lowering message consistency.",
      fragmentedObjects.slice(0, 3).map((item) => `${item.object} is missing from ${item.missing_in.join(", ")}.`)
    ));
  }

  const reinforcing = relationshipEdges
    .filter((edge) => edge.type !== "reinforces_or_competes")
    .slice(0, 8)
    .map((edge) => ({
      from: labelFor(ontology, edge.from),
      to: labelFor(ontology, edge.to),
      relationship: edge.type,
      effect: "reinforces",
      interpretation: edge.interpretation
    }));

  const weakening = contradictions.slice(0, 8).map((item) => ({
    signal: item.title,
    effect: "weakens",
    weakens: item.affected_objects?.map((id) => labelFor(ontology, id)).filter(Boolean) || [],
    interpretation: item.interpretation,
    downstream_consequence: item.business_consequence || consequenceFor(item.title)
  }));

  return {
    primary_causes: causes.length ? causes : [cause(
      "The system has too few connected signals to infer a deep causal chain",
      "Cognix can see the current GTM objects, but needs more cross-surface evidence to distinguish true cause from local inconsistency.",
      "The organization may overfit strategy to a partial view of the GTM system.",
      bundle.signals.slice(0, 2).map((signal) => `${signal.title} is currently part of the evidence base.`)
    )],
    reinforcing_signals: reinforcing,
    weakening_signals: weakening,
    downstream_consequences: dedupe([
      ...contradictions.map((item) => item.business_consequence || consequenceFor(item.title)),
      ...causes.map((item) => item.downstream_consequence)
    ]).slice(0, 6),
    next_break_likely: nextBreakLikely(contradictions, propagation)
  };
}

function modelNarrativeGravity(bundle, previousMemory) {
  const narratives = Object.entries(NARRATIVE_MODELS).map(([narrative, terms]) => {
    const matchingSignals = bundle.signals.filter((signal) => hasAny(signal.text, terms));
    const signalTypes = [...new Set(matchingSignals.map((signal) => signal.signal_type))];
    const score = Math.round((matchingSignals.length * 22) + (signalTypes.length * 12) + (matchingSignals.some((signal) => signal.metadata.has_commercial_focus) ? 10 : 0));
    return {
      narrative,
      gravity_score: Math.min(100, score),
      appears_in: signalTypes,
      missing_in: bundle.metadata.signal_types.filter((type) => !signalTypes.includes(type)),
      evidence: matchingSignals.slice(0, 3).map((signal) => `${signal.title} carries ${narrative.toLowerCase()}.`),
      state: score >= 70 ? "dominant" : score >= 38 ? "competing" : matchingSignals.length ? "weakening" : "absent"
    };
  }).sort((a, b) => b.gravity_score - a.gravity_score);

  const active = narratives.filter((item) => item.gravity_score > 0);
  const dominant = active.filter((item) => item.state === "dominant").slice(0, 3);
  const competing = active.filter((item) => item.state === "competing").slice(0, 4);
  const weakening = active.filter((item) => item.state === "weakening");
  const fragmented = active.filter((item) => item.appears_in.length > 0 && item.missing_in.length >= Math.max(2, bundle.metadata.signal_types.length - 1));
  const historicalNarratives = dedupe(previousMemory.flatMap((entry) => entry.dominant_narratives || []));

  return {
    narratives,
    dominant_narratives: dominant.length ? dominant : active.slice(0, 1),
    competing_narratives: competing,
    weakening_narratives: weakening,
    fragmented_propagation: fragmented,
    historical_narratives_no_longer_dominant: historicalNarratives.filter((name) => !dominant.some((item) => item.narrative === name)),
    interpretation: active.length
      ? `${active[0].narrative} currently has the strongest narrative gravity, but ${fragmented.length} active narratives show fragmented propagation.`
      : "No strong narrative gravity is visible yet; the organization may be operating from asset-level claims instead of a shared strategic story."
  };
}

function analyzeOrganizationalPropagation(ontology, propagation, bundle, narrativeGravity) {
  const narrativeRows = narrativeGravity.narratives.filter((item) => item.gravity_score > 0).map((item) => propagationRow(item.narrative, "narrative", item.appears_in, item.missing_in, bundle));
  const objectRows = propagation.slice(0, 10).map((item) => propagationRow(item.object, item.type, item.appears_in, item.missing_in, bundle));
  const decay = [...narrativeRows, ...objectRows]
    .filter((item) => item.decay_detected)
    .sort((a, b) => a.propagation_score - b.propagation_score);
  const reinterpretation = detectReinterpretation(bundle);

  return {
    surface_order: STRATEGIC_SURFACES.filter((surface) => bundle.metadata.signal_types.includes(surface)),
    pathways: [...narrativeRows, ...objectRows].slice(0, 16),
    propagation_decay: decay.slice(0, 8),
    reinterpretation,
    narrative_mutation: reinterpretation.filter((item) => item.mutation_risk !== "Low"),
    execution_drift: decay.slice(0, 4).map((item) => ({
      object: item.object,
      drift_point: item.missing_in[0],
      interpretation: `${item.object} is not reaching ${item.missing_in[0]}, which makes local team reinterpretation more likely.`,
      consequence: "Field teams may preserve the vocabulary while changing the strategic meaning."
    }))
  };
}

function buildTemporalCognition(bundle, ontology, contradictions, previousMemory) {
  const ordered = [...bundle.signals].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const timeline = ordered.map((signal, index) => ({
    sequence: index + 1,
    date: signal.created_at,
    signal: signal.title,
    surface: signal.signal_type,
    frames: signal.metadata.frames,
    categories: signal.metadata.categories,
    audiences: signal.metadata.audiences
  }));
  const shifts = [];
  for (let i = 1; i < timeline.length; i += 1) {
    const before = timeline[i - 1];
    const after = timeline[i];
    if (first(before.frames) !== first(after.frames) || first(before.categories) !== first(after.categories) || first(before.audiences) !== first(after.audiences)) {
      shifts.push({
        from_signal: before.signal,
        to_signal: after.signal,
        shift: `${first(before.frames) || "general"} / ${first(before.categories) || "unclear"} to ${first(after.frames) || "general"} / ${first(after.categories) || "unclear"}`,
        interpretation: "A newer surface changes the strategic center of gravity instead of extending the previous one."
      });
    }
  }

  const objections = ontology.by_type?.objection || [];
  return {
    timeline,
    narrative_evolution: shifts.slice(0, 6),
    positioning_shifts: shifts.filter((item) => item.shift.includes("software") || item.shift.includes("service") || item.shift.includes("intelligence")).slice(0, 4),
    buyer_objection_evolution: objections.map((item) => ({
      objection: item.name,
      first_seen: item.timestamps.first_seen,
      last_seen: item.timestamps.last_seen,
      interpretation: `${item.name} is now part of organizational memory and should be treated as a strategy signal, not an isolated sales objection.`
    })),
    launch_trajectory: bundle.grouped_signals["Launch plan"]?.map((signal) => ({
      signal: signal.title,
      trajectory: signal.metadata.has_execution_detail && signal.metadata.has_commercial_focus ? "field-ready" : "fragile",
      interpretation: signal.metadata.has_execution_detail
        ? "Launch contains activation detail."
        : "Launch story exists, but execution translation is under-specified."
    })) || [],
    strategic_drift_over_time: previousMemory.length
      ? compareWithMemory(contradictions, previousMemory)
      : shifts.slice(0, 3).map((item) => `${item.to_signal} changes strategic emphasis from the previous signal.`),
    memory_state: previousMemory.length
      ? `Cognix is comparing this run with ${previousMemory.length} prior memory snapshots.`
      : "This is the first memory snapshot; GTM fracture evidence will deepen as future runs accumulate."
  };
}

function modelStrategicPressure(contradictions, propagation, narrativeGravity, organizationalPropagation) {
  const pressures = [];
  if (contradictions.some((item) => item.title.includes("Service") || item.title.includes("Commercial"))) {
    pressures.push(pressure(
      "Monetization model pressure",
      "Leadership, marketing, and sales may be carrying different assumptions about whether the company is selling software, advisory work, or a guided diagnostic motion.",
      "High",
      "Buying motion, packaging, and qualification criteria are likely to diverge."
    ));
  }
  if (narrativeGravity.competing_narratives.length >= 2) {
    pressures.push(pressure(
      "Narrative authority pressure",
      `${narrativeGravity.competing_narratives.map((item) => item.narrative).slice(0, 3).join(", ")} are competing for control of the GTM story.`,
      "High",
      "Teams may optimize their local story while weakening shared category clarity."
    ));
  }
  if (organizationalPropagation.propagation_decay.length) {
    pressures.push(pressure(
      "Alignment pressure decay",
      "Strategic language is not consistently reaching every execution surface.",
      "Medium",
      "Enablement and sales will fill the gaps with local interpretations."
    ));
  }
  if (propagation.some((item) => item.type === "ICP" && item.propagation_score < 60)) {
    pressures.push(pressure(
      "ICP assumption split",
      "The intended buyer is visible in some places but not sufficiently present across the operating system.",
      "Medium",
      "Qualification, objection handling, and conversion paths may pull toward different buyers."
    ));
  }

  return {
    pressures,
    weakening_alignment_points: propagation.filter((item) => item.propagation_score < 50).map((item) => ({
      object: item.object,
      missing_in: item.missing_in,
      implication: `${item.object} is losing force before it reaches ${item.missing_in.join(", ")}.`
    })).slice(0, 8),
    conflicting_assumptions: pressures.map((item) => item.tension),
    interpretation: pressures.length
      ? `${pressures[0].tension} is the strongest inferred GTM tension.`
      : "No strong internal GTM pressure was inferred from the current signal set."
  };
}

function simulateScenarios(causalModel, narrativeGravity, pressureModel, propagation) {
  const topNarrative = narrativeGravity.dominant_narratives[0]?.narrative || "current narrative";
  const mainPressure = pressureModel.pressures[0]?.tension || "existing strategic ambiguity";
  const weakPropagation = propagation[0];
  const nextBreak = causalModel.next_break_likely || "buyer clarity weakens";
  return [
    {
      scenario: "Reposition around active GTM fracture evidence",
      likely_narrative_impact: `Strengthens ${topNarrative} if the new category claim is tied to buyer pain, proof, and commercial packaging before ${nextBreak}.`,
      organizational_friction: mainPressure.includes("Monetization") ? "Medium-high until packaging and sales qualification are rewritten." : "Medium.",
      enablement_implications: "Requires one approved narrative hierarchy, objections, talk track, and examples by surface.",
      competitive_overlap: "Reduces overlap with generic enablement or consulting if Cognix owns continuous GTM memory and causal diagnosis.",
      buyer_clarity_change: "Likely improves buyer clarity if the offer names the buying motion explicitly."
    },
    {
      scenario: "Shift ICP toward enterprise GTM leadership",
      likely_narrative_impact: "Increases enterprise narrative pressure and requires proof, governance, and multi-stakeholder language.",
      organizational_friction: "High if founder-led advisory and PMM-specific language remain dominant.",
      enablement_implications: "Sales needs enterprise qualification, economic buyer mapping, and objection handling around scale and trust.",
      competitive_overlap: "More overlap with enterprise enablement, RevOps, and intelligence platforms.",
      buyer_clarity_change: "Improves executive relevance but can weaken PMM resonance if not carefully tiered."
    },
    {
      scenario: "Launch a diagnostic workspace with guided onboarding",
      likely_narrative_impact: "Bridges software and advisory narratives by making the hybrid motion intentional rather than accidental.",
      organizational_friction: "Medium because teams must stop describing the offer as either pure service or pure SaaS.",
      enablement_implications: "Requires packaging language, implementation boundaries, success milestones, and buying expectation scripts.",
      competitive_overlap: "Differentiates against generic dashboards if causal memory and strategic consequence modeling are explicit.",
      buyer_clarity_change: "Likely improves clarity by making the first purchase path concrete."
    },
    {
      scenario: `Propagate ${weakPropagation?.object || "the primary narrative"} into missing channels`,
      likely_narrative_impact: weakPropagation ? `Strengthens organizational memory by moving ${weakPropagation.object} into ${weakPropagation.missing_in.join(", ")}.` : "Strengthens recall by making one narrative travel further.",
      organizational_friction: "Low-medium; requires disciplined edits more than a new strategy.",
      enablement_implications: "Update field assets and launch materials before creating net-new content.",
      competitive_overlap: "Improves distinctiveness only if propagation carries contrast and proof, not just vocabulary.",
      buyer_clarity_change: "Improves clarity by reducing channel-to-channel interpretation variance."
    }
  ];
}

function buildInsightHierarchy(contradictions, propagation, causalModel, narrativeGravity, pressureModel, temporalCognition) {
  const items = [];
  for (const contradiction of contradictions) {
    items.push(hierarchicalInsight(
      hierarchyClassFor(contradiction.title),
      contradiction.severity,
      contradiction.title,
      contradiction.interpretation,
      contradiction.business_consequence || consequenceFor(contradiction.title),
      contradiction.evidence
    ));
  }
  for (const causeItem of causalModel.primary_causes.slice(0, 4)) {
    items.push(hierarchicalInsight(
      "Narrative instability",
      "High",
      causeItem.cause,
      causeItem.why,
      causeItem.downstream_consequence,
      causeItem.evidence
    ));
  }
  for (const narrative of narrativeGravity.fragmented_propagation.slice(0, 4)) {
    items.push(hierarchicalInsight(
      "Narrative instability",
      narrative.gravity_score >= 60 ? "High" : "Medium",
      `${narrative.narrative} is fragmented in propagation`,
      `${narrative.narrative} appears in ${narrative.appears_in.join(", ")} but is absent from ${narrative.missing_in.join(", ")}.`,
      "A narrative can become familiar internally while remaining incoherent to buyers and field teams.",
      narrative.evidence
    ));
  }
  for (const pressureItem of pressureModel.pressures.slice(0, 4)) {
    items.push(hierarchicalInsight(
      pressureItem.tension.includes("Monetization") ? "Monetization confusion" : "Execution breakdowns",
      pressureItem.severity,
      pressureItem.tension,
      pressureItem.interpretation,
      pressureItem.consequence,
      []
    ));
  }
  for (const shift of temporalCognition.positioning_shifts.slice(0, 3)) {
    items.push(hierarchicalInsight(
      "Launch fragility",
      "Medium",
      `Positioning shift from ${shift.from_signal} to ${shift.to_signal}`,
      shift.interpretation,
      "New launches may accumulate strategic changes faster than the organization can operationalize them.",
      [shift.shift]
    ));
  }

  return items
    .sort((a, b) => hierarchyWeight(b) - hierarchyWeight(a))
    .slice(0, 12);
}

function buildInsightFeed(ontology, contradictions, propagation, previousMemory, causalModel, narrativeGravity, temporalCognition) {
  const insights = contradictions.slice(0, 6).map((item) => ({
    id: slug(`insight-${item.title}`),
    type: "contradiction",
    severity: item.severity,
    insight: item.interpretation,
    business_consequence: item.business_consequence || consequenceFor(item.title),
    evidence: item.evidence,
    created_at: new Date().toISOString()
  }));

  for (const item of causalModel.primary_causes.slice(0, 3)) {
    insights.push({
      id: slug(`cause-${item.cause}`),
      type: "causal reasoning",
      severity: "High",
      insight: `${item.cause}: ${item.why}`,
      business_consequence: item.downstream_consequence,
      evidence: item.evidence,
      created_at: new Date().toISOString()
    });
  }

  for (const item of narrativeGravity.fragmented_propagation.slice(0, 3)) {
    insights.push({
      id: slug(`narrative-${item.narrative}`),
      type: "narrative gravity",
      severity: item.gravity_score > 60 ? "High" : "Medium",
      insight: `${item.narrative} has gravity but fragmented propagation.`,
      business_consequence: "The organization may believe the story is aligned because the narrative exists, while buyers experience it unevenly across channels.",
      evidence: item.evidence,
      created_at: new Date().toISOString()
    });
  }

  for (const item of propagation.slice(0, 4)) {
    insights.push({
      id: slug(`propagation-${item.object}`),
      type: "propagation",
      severity: item.propagation_score < 35 ? "High" : "Medium",
      insight: item.interpretation,
      business_consequence: consequenceFor("weak GTM propagation", item),
      evidence: [`Appears in ${item.appears_in.join(", ") || "no core surfaces"}; missing in ${item.missing_in.join(", ") || "none"}.`],
      created_at: new Date().toISOString()
    });
  }

  if (temporalCognition.narrative_evolution.length) {
    insights.push({
      id: slug(`temporal-${temporalCognition.narrative_evolution[0].to_signal}`),
      type: "temporal GTM fracture",
      severity: "Medium",
      insight: temporalCognition.narrative_evolution[0].interpretation,
      business_consequence: "Positioning can drift as new materials launch faster than organizational memory is updated.",
      evidence: [temporalCognition.narrative_evolution[0].shift],
      created_at: new Date().toISOString()
    });
  }

  if (previousMemory.length) {
    insights.push({
      id: `memory-${Date.now()}`,
      type: "memory",
      severity: "Medium",
      insight: `Cognix compared this run against ${previousMemory.length} prior memory snapshots and preserved recurring contradictions for trend analysis.`,
      business_consequence: "Recurring contradictions become operating-system defects, not one-off messaging issues.",
      evidence: previousMemory.slice(-3).map((entry) => entry.summary),
      created_at: new Date().toISOString()
    });
  }

  return insights;
}

function rankPriorities(contradictions, propagation, ontology, insightHierarchy) {
  const priorities = [];
  for (const item of contradictions) {
    priorities.push({
      priority: item.title,
      risk_level: item.severity,
      why_now: item.interpretation,
      consequence: item.business_consequence || consequenceFor(item.title),
      intervention: interventionFor(item.title),
      evidence: item.evidence,
      insight_class: hierarchyClassFor(item.title),
      score: item.severity === "High" ? 90 : 70
    });
  }
  for (const item of propagation.filter((entry) => entry.propagation_score < 50).slice(0, 4)) {
    priorities.push({
      priority: `Propagate ${item.object}`,
      risk_level: item.propagation_score < 30 ? "High" : "Medium",
      why_now: item.interpretation,
      consequence: consequenceFor("weak GTM propagation", item),
      intervention: `Update ${item.missing_in.join(", ")} so ${item.object} appears consistently in the GTM system.`,
      evidence: [`${item.object} propagation score is ${item.propagation_score}.`],
      insight_class: "Execution breakdowns",
      score: 100 - item.propagation_score
    });
  }
  for (const item of insightHierarchy.slice(0, 3)) {
    if (priorities.some((priority) => priority.priority === item.finding)) continue;
    priorities.push({
      priority: item.finding,
      risk_level: item.severity,
      why_now: item.interpretation,
      consequence: item.business_consequence,
      intervention: "Resolve the underlying strategic assumption before producing more GTM assets.",
      evidence: item.evidence,
      insight_class: item.class,
      score: hierarchyWeight(item)
    });
  }
  return priorities.sort((a, b) => b.score - a.score).slice(0, 8);
}

function extractSignalCognition(signal, project = {}) {
  const text = signal.text || `${signal.title || ""}. ${signal.content || ""}. ${signal.notes || ""}`;
  const lower = text.toLowerCase();
  const categories = signal.metadata?.categories || [];
  const frames = signal.metadata?.frames || [];
  const extraction = {
    signal_id: signal.id,
    signal_title: signal.title,
    signal_type: signal.signal_type,
    narrative_claims: signal.metadata?.claims?.length ? signal.metadata.claims.slice(0, 6) : extractSentences(text, EXTRACTION_TERMS.value_propositions, 6),
    buyer_references: matchedTerms(lower, EXTRACTION_TERMS.buyer_references),
    icp_references: dedupe([...matchedTerms(lower, EXTRACTION_TERMS.icp_references), project.primary_buyer].filter(Boolean)),
    value_propositions: extractSentences(text, EXTRACTION_TERMS.value_propositions, 5),
    commercial_offers: extractSentences(text, EXTRACTION_TERMS.commercial_offers, 5),
    proof_points: extractSentences(text, EXTRACTION_TERMS.proof_points, 5),
    ai_generated_language_indicators: [],
    competitor_references: matchedTerms(lower, EXTRACTION_TERMS.competitor_references),
    ambiguity_signals: extractSentences(text, EXTRACTION_TERMS.ambiguity_signals, 5),
    contradiction_candidates: []
  };

  const genericLanguage = matchedTerms(lower, EXTRACTION_TERMS.generic_ai_language);
  if (genericLanguage.length) extraction.ai_generated_language_indicators.push(`generic AI language: ${genericLanguage.join(", ")}`);
  if (frames.includes("transformation") && !signal.metadata?.has_proof) extraction.ai_generated_language_indicators.push("unsupported transformation claims");
  if (frames.includes("productivity") && !signal.metadata?.has_commercial_focus) extraction.ai_generated_language_indicators.push("vague productivity framing");
  if (categories.length > 1) extraction.ai_generated_language_indicators.push(`inconsistent category claims: ${categories.join(", ")}`);

  if (categories.includes("service") && categories.includes("software")) {
    extraction.contradiction_candidates.push(signalContradiction(
      "Service vs software ambiguity inside one signal",
      "High",
      `${signal.title} uses both service and software category language without naming the primary buying motion.`,
      "Sales interpretation variance is likely to increase because reps can frame the offer as advisory, product, or hybrid depending on the conversation.",
      [`${signal.title} carries category signals: ${categories.join(", ")}.`]
    ));
  }
  if (extraction.buyer_references.length > 2) {
    extraction.contradiction_candidates.push(signalContradiction(
      "Buyer audience split inside one signal",
      "Medium",
      `${signal.title} points to multiple buyers or internal audiences without clarifying who owns the decision.`,
      "Qualification paths and objection handling may fragment across PMM, marketing, sales, and GTM leadership.",
      [`${signal.title} references: ${extraction.buyer_references.join(", ")}.`]
    ));
  }
  if (extraction.ambiguity_signals.length && !extraction.proof_points.length) {
    extraction.contradiction_candidates.push(signalContradiction(
      "Ambiguous claim lacks proof support",
      "Medium",
      `${signal.title} introduces ambiguity or buyer confusion without enough proof to stabilize interpretation.`,
      "Buyer clarity weakens because the signal asks the audience to resolve strategic uncertainty themselves.",
      extraction.ambiguity_signals.slice(0, 2)
    ));
  }

  return extraction;
}

function signalContradiction(title, severity, interpretation, businessConsequence, evidence) {
  return { title, severity, interpretation, business_consequence: businessConsequence, evidence };
}

function enrichContradiction(contradiction) {
  const rootCause = rootCauseFor(contradiction);
  const downstream = contradiction.business_consequence || consequenceFor(contradiction.title);
  return {
    ...contradiction,
    root_cause: rootCause,
    contributing_signals: contradiction.contributing_signals || signalRefsFromEvidence(contradiction.evidence),
    downstream_consequence: downstream,
    next_break_likely: nextBreakFromText(`${contradiction.title} ${contradiction.interpretation} ${downstream}`)
  };
}

function contradictionScore(item) {
  const severity = item.severity === "High" ? 100 : item.severity === "Medium" ? 70 : 40;
  const evidenceWeight = Math.min(24, (item.evidence?.length || 0) * 6);
  const specificity = item.contributing_signals?.length ? 12 : 0;
  const title = item.title || "";
  const strategicWeight = title.includes("Positioning")
    ? 25
    : title.includes("Commercial") || title.includes("software")
      ? 15
      : title.includes("Messaging")
        ? 10
        : title.includes("AI")
          ? 5
          : 0;
  const aiPenalty = title.includes("AI") && item.severity !== "High" ? 35 : 0;
  return severity + evidenceWeight + specificity + strategicWeight - aiPenalty;
}

function rootCauseFor(item) {
  const text = `${item.title || ""} ${item.interpretation || ""}`.toLowerCase();
  if (text.includes("positioning") || text.includes("messaging") || text.includes("narrative")) return "Multiple strategic frames are competing without one hierarchy.";
  if (text.includes("software") || text.includes("commercial") || text.includes("offer")) return "The commercial motion has not been named as the hierarchy for every GTM surface.";
  if (text.includes("buyer") || text.includes("icp") || text.includes("audience")) return "The primary buyer and secondary audiences are not separated in the GTM memory.";
  if (text.includes("ai") || text.includes("generic") || text.includes("proof")) return "Generic AI claims are outrunning specific proof, category definition, and buyer language.";
  if (text.includes("propagation")) return "A strategic object is present locally but has not survived transfer across operating surfaces.";
  return "The signal set contains competing strategic assumptions that have not been reconciled.";
}

function nextBreakLikely(contradictions, propagation, narrativeGravity = {}, pressureModel = {}) {
  const text = [
    contradictions[0]?.title,
    contradictions[0]?.interpretation,
    propagation[0]?.object,
    narrativeGravity.fragmented_propagation?.[0]?.narrative,
    pressureModel.pressures?.[0]?.tension
  ].filter(Boolean).join(" ");
  return nextBreakFromText(text);
}

function nextBreakFromText(text = "") {
  const normalized = text.toLowerCase();
  if (normalized.includes("commercial") || normalized.includes("software") || normalized.includes("offer")) return "sales interpretation variance increases";
  if (normalized.includes("buyer") || normalized.includes("icp") || normalized.includes("audience")) return "buyer clarity weakens";
  if (normalized.includes("launch")) return "launch narrative fragments";
  if (normalized.includes("category") || normalized.includes("positioning")) return "category positioning becomes harder to defend";
  return "buyer clarity weakens";
}

function contributingSignalsForObjects(objects = []) {
  const refs = [];
  for (const object of objects) {
    for (const source of object.source_references || []) {
      refs.push({ signal_id: source.signal_id, signal_title: source.signal_title, signal_type: source.signal_type });
    }
  }
  return uniqueSignalRefs(refs);
}

function signalRefsFromEvidence(evidence = []) {
  return evidence.map((line) => {
    const match = String(line).match(/appears in ([^:]+):/);
    return match ? { signal_title: match[1] } : null;
  }).filter(Boolean);
}

function signalRef(extraction) {
  return { signal_id: extraction.signal_id, signal_title: extraction.signal_title, signal_type: extraction.signal_type };
}

function uniqueSignalRefs(refs = []) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = ref.signal_id || ref.signal_title;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function addConflict(contradictions, objects = [], title, interpretation, severity) {
  if (objects.length <= 1) return;
  contradictions.push({
    title,
    severity,
    interpretation,
    business_consequence: consequenceFor(title),
    evidence: conflictEvidence(objects),
    affected_objects: objects.slice(0, 4).map((object) => object.id),
    contributing_signals: contributingSignalsForObjects(objects)
  });
}

function conflictEvidence(objects = []) {
  const refs = uniqueSignalRefs(objects.flatMap((object) => object.source_references || []));
  if (refs.length > 1) {
    return refs.slice(0, 4).map((source) => `${source.signal_title || source.signal_type}: "${source.evidence || "This source carries one side of the contradiction."}"`);
  }
  return objects.slice(0, 4).map(evidenceLine);
}

function relationshipType(a, b) {
  if (a.type === b.type) return "reinforces_or_competes";
  if (a.type === "commercial_offer" || b.type === "commercial_offer") return "commercializes";
  if (a.type === "ICP" || b.type === "ICP") return "targets";
  if (a.type === "positioning" || b.type === "positioning") return "frames";
  return "relates_to";
}

function interventionFor(title) {
  if (title.includes("software")) return "Decide the commercial category and rewrite offers, homepage, and sales narrative around one buying motion.";
  if (title.includes("Commercial")) return "Package the primary offer with buyer, outcome, scope, and conversion path.";
  if (title.includes("Positioning")) return "Create a positioning hierarchy: category claim, primary buyer, core promise, proof, and field activation.";
  if (title.includes("Messaging")) return "Turn parallel messages into one message architecture with approved adaptations by channel.";
  if (title.includes("ICP")) return "Select one primary ICP for the next GTM motion and propagate it into every core signal.";
  return "Resolve the contradiction using the cited source signals and rerun GTM fracture detection.";
}

function consequenceFor(title, object = {}) {
  if (title.includes("Service") || title.includes("software")) return "Commercial ambiguity is likely to increase deal qualification variance, packaging confusion, and executive hesitation.";
  if (title.includes("Commercial")) return "Monetization confusion is likely to slow conversion because buyers cannot easily map the story to budget, urgency, and purchase path.";
  if (title.includes("Positioning")) return "Positioning fragmentation is likely to increase enterprise sales interpretation variance and reduce category clarity.";
  if (title.includes("Messaging")) return "Messaging conflict is likely to create inconsistent buyer recall and make enablement assets harder to adopt.";
  if (title.includes("ICP")) return "ICP fragmentation is likely to weaken targeting, qualification, and objection handling across the funnel.";
  if (title.includes("weak GTM propagation")) return `${object.object || object.name || "The strategic object"} may become an internal idea that does not reliably reach buyer-facing execution.`;
  if (title.includes("Thought leadership")) return "Thought leadership may create attention without conversion if the belief system is not connected to a concrete offer.";
  return "The organization is likely to experience more local reinterpretation, slower execution, and weaker buyer clarity until this is resolved.";
}

function cause(causeName, why, downstreamConsequence, evidence) {
  return {
    cause: causeName,
    root_cause: causeName,
    why,
    downstream_consequence: downstreamConsequence,
    next_break_likely: nextBreakFromText(downstreamConsequence),
    evidence: (evidence || []).filter(Boolean)
  };
}

function pressure(tension, interpretation, severity, consequence) {
  return { tension, interpretation, severity, consequence };
}

function hierarchicalInsight(insightClass, severity, finding, interpretation, businessConsequence, evidence = []) {
  return {
    class: insightClass,
    severity,
    finding,
    interpretation,
    business_consequence: businessConsequence,
    evidence: evidence.filter(Boolean)
  };
}

function hierarchyClassFor(title = "") {
  if (title.includes("Service") || title.includes("Commercial")) return "Monetization confusion";
  if (title.includes("Positioning") || title.includes("Messaging") || title.includes("narrative")) return "Narrative instability";
  if (title.includes("ICP")) return "Existential strategic risks";
  if (title.includes("launch") || title.includes("Launch")) return "Launch fragility";
  if (title.includes("Competitor") || title.includes("Differentiation")) return "Competitive exposure";
  return "Execution breakdowns";
}

function hierarchyWeight(item) {
  const classWeight = {
    "Existential strategic risks": 50,
    "Narrative instability": 45,
    "Monetization confusion": 42,
    "Launch fragility": 34,
    "Competitive exposure": 30,
    "Execution breakdowns": 26
  }[item.class] || 20;
  const severityWeight = item.severity === "High" ? 40 : item.severity === "Medium" ? 24 : 10;
  return classWeight + severityWeight;
}

function propagationRow(object, type, appearsIn, missingIn, bundle) {
  const score = Math.round((appearsIn.length / Math.max(1, bundle.metadata.signal_types.length)) * 100);
  return {
    object,
    type,
    appears_in: appearsIn,
    missing_in: missingIn,
    propagation_score: score,
    decay_detected: missingIn.length > 0 && appearsIn.length > 0,
    interpretation: missingIn.length
      ? `${object} travels through ${appearsIn.join(", ")} but decays before ${missingIn.join(", ")}.`
      : `${object} reaches every supplied organizational surface.`
  };
}

function detectReinterpretation(bundle) {
  return bundle.signals.map((signal) => {
    const frameCount = signal.metadata.frames.length;
    const categoryCount = signal.metadata.categories.length;
    const audienceCount = signal.metadata.audiences.length;
    const mutationScore = frameCount + categoryCount + audienceCount;
    return {
      signal: signal.title,
      surface: signal.signal_type,
      mutation_risk: mutationScore >= 5 ? "High" : mutationScore >= 3 ? "Medium" : "Low",
      interpretation: mutationScore >= 3
        ? `${signal.title} carries multiple frames, categories, or audiences and may be reinterpreting the core narrative for its local context.`
        : `${signal.title} does not show strong reinterpretation pressure.`
    };
  });
}

function compareWithMemory(contradictions, previousMemory) {
  const current = contradictions.map((item) => item.title);
  const recurring = dedupe(previousMemory.flatMap((entry) => entry.contradictions || [])).filter((title) => current.includes(title));
  if (recurring.length) return recurring.map((title) => `${title} has recurred across memory snapshots.`);
  return ["Current contradictions differ from prior memory, suggesting drift has changed shape rather than disappeared."];
}

function evidenceLine(object) {
  const source = object.source_references[0];
  return `${object.name} appears in ${source.signal_title}: "${source.evidence}"`;
}

function shareSignal(a, b) {
  return a.source_references.some((source) => b.source_references.some((other) => other.signal_id === source.signal_id));
}

function labelFor(ontology, id) {
  return ontology.objects.find((object) => object.id === id)?.name || id;
}

function first(values = []) {
  return values[0] || "";
}

function dedupe(values) {
  return [...new Set(values.filter(Boolean))];
}

function confidenceFor(matchCount, signal) {
  return Math.min(0.95, 0.52 + matchCount * 0.1 + Math.min(0.2, signal.text.length / 1200));
}

function excerpt(text, term) {
  const lower = text.toLowerCase();
  const index = lower.indexOf(term.toLowerCase());
  if (index < 0) return text.slice(0, 160);
  return text.slice(Math.max(0, index - 70), Math.min(text.length, index + term.length + 90)).trim();
}

function matchedTerms(lowerText, terms = []) {
  return dedupe(terms.filter((term) => lowerText.includes(term)));
}

function extractSentences(text = "", terms = [], limit = 4) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const matches = [];
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    if (terms.some((term) => lower.includes(term))) matches.push(sentence);
  }
  return dedupe(matches).slice(0, limit);
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    groups[item[key]] ||= [];
    groups[item[key]].push(item);
    return groups;
  }, {});
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    counts[item[key]] = (counts[item[key]] || 0) + 1;
    return counts;
  }, {});
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function hasAny(text, terms) {
  const lower = String(text || "").toLowerCase();
  return terms.some((term) => lower.includes(term));
}
