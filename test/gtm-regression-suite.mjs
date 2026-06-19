import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath = path.join(rootDir, "test/fixtures/gtm-regression-scenarios.json");
const productAppPath = path.join(rootDir, "src/product-app.js");

const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const productSource = fs.readFileSync(productAppPath, "utf8")
  .replace(/\nrender\(\);\s*$/, "\nObject.assign(globalThis, { state, setLaunchMode, sortIntake, diagnoseLaunch, runManualRecheck });");

const context = {
  console,
  window: {
    setTimeout() {},
    matchMedia() {
      return { matches: false };
    }
  },
  document: {
    querySelector() {
      return {
        innerHTML: "",
        addEventListener() {},
        querySelectorAll() {
          return [];
        }
      };
    },
    querySelectorAll() {
      return [];
    }
  },
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {}
  },
  navigator: {
    clipboard: {
      writeText() {
        return Promise.resolve();
      }
    }
  },
  Blob: function Blob() {},
  URL: {
    createObjectURL() {
      return "";
    },
    revokeObjectURL() {}
  },
  CSS: {
    escape: String
  },
  Date,
  Math,
  RegExp,
  Set,
  Map,
  Object,
  Array,
  String,
  Number,
  Boolean,
  JSON,
  Uint8Array
};

vm.createContext(context);
vm.runInContext(productSource, context, { filename: productAppPath });

function runScenario(scenario) {
  context.setLaunchMode(scenario.mode || "pre");
  context.state.signals = { ...(scenario.signals || {}) };
  context.state.intakeDump = "";
  context.state.diagnosis = null;

  const diagnosis = context.diagnoseLaunch();
  const expected = scenario.expected || {};
  const scorePass = diagnosis.predictabilityScore >= expected.scoreMin
    && diagnosis.predictabilityScore <= expected.scoreMax;
  const riskPass = diagnosis.riskLabel === expected.risk;
  const dominant = diagnosis.dominantFractures?.[0]?.title || "";
  const fracturePass = dominant === expected.dominantFracture;
  const evidenceHaystack = JSON.stringify({
    signals: scenario.signals,
    strategicMatrix: diagnosis.strategicMatrix,
    outputArchitecture: diagnosis.outputArchitecture,
    commercialImplication: diagnosis.commercialImplication,
    allText: diagnosis.allText
  });
  const missingEvidence = (scenario.requiredEvidence || [])
    .filter((phrase) => !evidenceHaystack.includes(phrase));
  const evidencePass = missingEvidence.length === 0;
  const pass = scorePass && riskPass && fracturePass && evidencePass;

  return {
    id: scenario.id,
    name: scenario.name,
    expectedScore: `${expected.scoreMin}-${expected.scoreMax}`,
    actualScore: diagnosis.predictabilityScore,
    expectedRisk: expected.risk,
    actualRisk: diagnosis.riskLabel,
    expectedFracture: expected.dominantFracture,
    actualFracture: dominant,
    missingEvidence,
    pass,
    failures: [
      scorePass ? null : `score ${diagnosis.predictabilityScore} outside ${expected.scoreMin}-${expected.scoreMax}`,
      riskPass ? null : `risk "${diagnosis.riskLabel}" !== "${expected.risk}"`,
      fracturePass ? null : `dominant fracture "${dominant}" !== "${expected.dominantFracture}"`,
      evidencePass ? null : `missing evidence: ${missingEvidence.join(", ")}`
    ].filter(Boolean)
  };
}

function printTable(results) {
  const rows = results.map((result) => ({
    Scenario: result.name,
    Expected: result.expectedScore,
    Score: String(result.actualScore),
    Risk: result.actualRisk,
    "Dominant fracture": result.actualFracture,
    Result: result.pass ? "PASS" : "FAIL"
  }));
  console.table(rows);
}

const results = fixture.scenarios.map(runScenario);
printTable(results);

const failures = results.filter((result) => !result.pass);
if (failures.length) {
  console.error("\nGTM regression failures:");
  failures.forEach((failure) => {
    console.error(`- ${failure.name}: ${failure.failures.join("; ")}`);
  });
  process.exit(1);
}

function assertExposureContract() {
  const contractFailures = [];
  const signalDeskInput = [
    "Product: SignalDesk",
    "Founder / CEO narrative:",
    "“AI revenue operating system”",
    "Sales feedback:",
    "Sales says buyers respond to: Catch renewal risk before it becomes churn.",
    "Customer proof:",
    "Customer quote: “We had all the data. We just did not see the risk until the renewal was already in trouble.”",
    "Landing page copy:",
    "AI revenue operating system",
    "CTA:",
    "Learn more"
  ].join("\n\n");

  context.setLaunchMode("pre");
  context.state.signals = {};
  context.state.intakeDump = signalDeskInput;
  context.state.selectedKpi = "";
  context.sortIntake?.();
  const signalDesk = context.diagnoseLaunch();
  const exposure = signalDesk.commercialExposure || {};
  const haystack = JSON.stringify(exposure);
  const required = [
    "Qualitative commercial exposure",
    "Qualified demo conversion",
    "Quantitative data missing from intake",
    "Launch spend not provided",
    "Demo target not provided",
    "Average opportunity value not provided",
    "Past launch benchmark not provided",
    "Leadership/category narrative is diluting sales-proven renewal-risk urgency.",
    "Medium-high: strong contradiction detected, but financial inputs are incomplete",
    "Fix before scale",
    "AI revenue operating system",
    "Learn more",
    "Catch renewal risk before it becomes churn.",
    "We had all the data. We just did not see the risk until the renewal was already in trouble.",
    "Suggested owner + approval path",
    "assetToRevise",
    "Launch decision brief"
  ];
  const missing = required.filter((phrase) => !haystack.includes(phrase));
  if (missing.length) contractFailures.push(`SignalDesk exposure contract missing: ${missing.join(", ")}`);
  if (exposure.alertLifecycle?.status !== "Launch risk found") contractFailures.push("alert lifecycle did not start Launch risk found");
  if (!Array.isArray(exposure.measurementPlan) || exposure.measurementPlan.length < 3 || exposure.measurementPlan.length > 6) contractFailures.push("measurement plan should contain 3 to 6 metrics");
  const judgment = exposure.fractureJudgment || {};
  const requiredJudgmentFields = ["fracture", "conflictingNodes", "receipts", "whereBreaks", "whoFeelsIt", "commercialRisk", "fixPath"];
  const missingJudgmentFields = requiredJudgmentFields.filter((field) => !judgment[field] || (Array.isArray(judgment[field]) && !judgment[field].length));
  if (missingJudgmentFields.length) contractFailures.push(`GTM fracture judgment missing: ${missingJudgmentFields.join(", ")}`);
  if (!/ vs /i.test(judgment.conflictingNodes || "")) contractFailures.push("GTM fracture judgment should name conflicting nodes");
  if (!/PMM|Sales|Demand Gen|Founder|RevOps|CS|Enablement|Exec/i.test(judgment.whoFeelsIt || "")) contractFailures.push("GTM fracture judgment should name who feels the break");
  if (!/conversion|pipeline|spend|buyer|sales|attribution|revenue|demo/i.test(judgment.commercialRisk || "")) contractFailures.push("GTM fracture judgment should name commercial risk");

  context.setLaunchMode("pre");
  context.state.signals = {
    "launch-message": "SignalForge is built to detect launch-to-pipeline risk before campaign spend goes live.",
    "target-buyer": "CMOs and VP Marketing leaders.",
    "buyer-pain": "CMOs risk spending budget on a launch story that does not convert into qualified demos.",
    "campaign-copy": "AI-powered launch intelligence for modern product marketing teams.",
    "cta": "Learn more.",
    "sales-talk-track": "Sales should lead with launch-to-pipeline risk.",
    "customer-proof": "Pilot teams caught buyer-facing dilution before paid spend launched.",
    "launch-goal": "Launch spend $20,000. Demo target 20. Average opportunity value $50,000. Pipeline target $500,000."
  };
  context.state.commercialInputs = {
    launchSpend: "$20,000",
    demoTarget: "20",
    averageOpportunityValue: "$50,000",
    pipelineTarget: "$500,000",
    averageDealSize: "",
    currentConversionRate: "",
    pastLaunchBenchmark: "",
    renewalValueAtRisk: "",
    targetAccountCount: "",
    campaignDuration: ""
  };
  const modeled = context.diagnoseLaunch().commercialExposure || {};
  if (!String(modeled.commercialExposure || "").includes("Campaign spend exposure")) contractFailures.push("campaign spend exposure label missing when launch spend is provided");
  if (String(modeled.commercialExposure || "").includes("pipeline / spend / renewal")) contractFailures.push("commercial exposure should not blend pipeline / spend / renewal types");
  if (!String(modeled.scenarioExposureModel || "").includes("launch spend is exposed to inefficient conversion")) contractFailures.push("modeled exposure scenario missing campaign spend range");
  if (!Array.isArray(modeled.sourceReceipts) || modeled.sourceReceipts.length !== 5) contractFailures.push("source-isolated ingestion receipt schema should include five surfaces");
  if (!Array.isArray(modeled.ownerActionMatrix) || !modeled.ownerActionMatrix.every((item) => item.owner && item.status && item.actionRequired && item.verbatimSourceReceipt && item.kpiTargetMetric && item.assetToRevise)) {
    contractFailures.push("owner action matrix rows missing required fields");
  }
  if (!Array.isArray(modeled.assetLevelFixes) || modeled.assetLevelFixes.length < 4) contractFailures.push("asset-level fixes missing");

  context.state.recheckInputs = {
    hero: "Catch renewal risk before it becomes churn.",
    cta: "Catch renewal risk before it becomes churn.",
    salesTalkTrack: "Catch renewal risk before it becomes churn.",
    campaignCopy: "Catch renewal risk before it becomes churn.",
    founderPost: "Catch renewal risk before it becomes churn.",
    salesDeck: "",
    outboundCopy: ""
  };
  const recheck = context.runManualRecheck?.(signalDesk);
  if (recheck?.status !== "Cleared") contractFailures.push(`manual recheck expected Cleared, got ${recheck?.status}`);

  return contractFailures;
}

function assertLaunchDecisionPathHardScenarios() {
  const cases = [
    {
      id: "solo-founder-override",
      path: "solo_exec_approval",
      input: "Company is launching an AI workflow automation product for RevOps teams.\nLaunch goal: Generate qualified demos from mid-market RevOps leaders.\nICP: Director of RevOps and VP Revenue Operations at B2B SaaS companies with 100-1000 employees.\nPositioning: AI-native operating layer for revenue teams to automate workflows, eliminate manual handoffs, and unlock predictable growth.\nCampaign copy: Your revenue team does not need another dashboard. It needs an AI teammate that automates every workflow.\nLanding page CTA: Read the AI transformation guide.\nSales narrative: Sales says prospects respond best when they hear: Your team is losing 10+ hours a week manually reconciling CRM, billing, and renewal data.\nProof: One customer reduced manual CRM cleanup by 35%. One customer saved 12 hours per week in RevOps workflows. No proof for predictable growth. No proof for automates every workflow.\nFounder feedback: Founder wants the launch to sound bigger and more category-defining: We should not lead with hours saved. We should lead with AI operating system for revenue.\nBudget: $18k paid campaign budget.",
      dominant: "Founder narrative override",
      required: ["category-vs-buyer-pain", "paid spend decision", "field-tested buyer pain", "Founder / C-suite"],
      forbidden: ["monetization upside vs customer trust"]
    },
    {
      id: "ic-security-approval",
      path: "ic_multi_level_approval",
      input: "Company is launching a new enterprise security add-on for collaboration software.\nLaunch goal: Drive pipeline from existing enterprise accounts.\nICP: CIO, Security Director, and IT Admin at enterprise companies.\nPositioning: Enterprise-grade AI security controls for modern collaboration.\nCampaign copy: Give every employee the freedom to collaborate with AI, safely.\nLanding page CTA: Explore the security guide.\nSales narrative: Enterprise AEs say the strongest buyer pain is compliance risk, audit exposure, and lack of visibility into AI usage.\nProof: Security team has audit-log proof. Customer quote is from IT admin, not CIO. No business proof tied to risk reduction, audit readiness, or compliance cost.\nExec feedback: VP wants to keep the message broad and innovation-focused because it supports company-level AI narrative.\nApproval reality: Junior PMM owns the draft but cannot change CTA, landing page, or sales narrative without Director PMM, Security Product Lead, Sales Enablement, and VP Marketing approval.",
      dominant: "Innovation narrative competes with compliance urgency",
      required: ["IC PMM prepares", "Prepare the Launch Fracture Brief", "Product / Security validates", "Sales Enablement validates", "AI innovation narrative or enterprise compliance pipeline"],
      forbidden: ["IC PMM changes", "IC PMM fixes launch"]
    },
    {
      id: "cross-functional-churn-expansion",
      path: "pmm_cross_functional",
      input: "Company is launching a customer success analytics product.\nLaunch goal: Create $500k influenced pipeline this quarter.\nICP: VP Customer Success and Chief Customer Officer at SaaS companies.\nPositioning: Predict churn before it happens with AI-powered customer health intelligence.\nCampaign copy: Turn customer signals into expansion revenue.\nLanding page CTA: Download the customer health benchmark report.\nSales narrative: Sales team says buyers care most about preventing surprise churn and board-level retention pressure.\nProof: Case study proves 18% reduction in churn risk. No expansion revenue proof. Benchmark report is not ready. Customer quote mentions retention, not expansion.\nDemand Gen plan: Running LinkedIn ads to CCOs with expansion revenue angle.\nSales Enablement: Talk track is still based on churn prevention.",
      dominant: "Expansion story conflicts with churn proof",
      required: ["churn-vs-expansion narrative", "Revise the expansion ad variant", "churn-prevention talk track", "churn vs expansion tradeoff"],
      forbidden: ["hidden renewal-risk urgency"]
    },
    {
      id: "director-platform-wedge",
      path: "director_head_pmm",
      input: "Company has three simultaneous launches under one platform story: AI insights dashboard, Workflow automation module, Enterprise governance add-on.\nLaunch goal: Support a platform repositioning and generate enterprise pipeline.\nICP: CRO, COO, RevOps leader, and IT/security stakeholder.\nPositioning: One AI platform to unify revenue operations.\nCampaign copy: Replace disconnected revenue tools with one AI operating system.\nSales narrative: Sales is still selling module-level pain: Dashboard: visibility into pipeline health. Automation: reduce manual handoffs. Governance: control AI risk.\nProof: Dashboard has strong proof. Automation has moderate proof. Governance has weak proof. No proof for one AI platform.\nExec feedback: CEO wants platform story. CRO wants pipeline now. Product wants all three modules featured equally. Sales wants one focused wedge.",
      dominant: "Platform narrative outruns module proof",
      required: ["Director PMM", "platform-vs-wedge launch architecture", "PMM owners", "CRO / CMO / CEO", "one platform story or sequence wedge-led motions"],
      forbidden: ["PMM / GTM owner"]
    },
    {
      id: "messy-pricing-trust",
      path: "messy_unknown",
      input: "Company is launching a pricing and packaging change with AI usage-based pricing.\nLaunch goal: Increase expansion revenue without increasing churn.\nICP: Existing customers, finance buyers, admins, and product champions.\nPositioning: Flexible AI pricing that grows with your usage.\nCampaign copy: Only pay for the AI value you use.\nLanding page CTA: See pricing options.\nSales narrative: CS and Sales warn that customers are worried about surprise bills and budget predictability.\nProof: No customer proof yet. Internal model shows expansion upside. No churn-risk proof. Support team has early objections around billing confusion.\nExec feedback: CEO wants aggressive AI monetization story. CFO wants margin protection. CS wants safer messaging. Sales wants objection handling before customer emails go out.",
      dominant: "Pricing trust risk",
      required: ["Suggested Pricing narrative", "Suggested Billing clarity", "Suggested Customer risk", "CEO / CFO / CMO", "monetization upside vs customer trust"],
      forbidden: ["Ownership is clear"]
    },
    {
      id: "low-fracture-proof-caveat",
      path: "solo_exec_approval",
      input: "Company launching a small feature improvement for onboarding analytics.\nLaunch goal: Improve feature adoption among existing customers.\nICP: Customer success managers and product operations teams.\nPositioning: See where new users drop off during onboarding.\nCampaign copy: Find onboarding friction before it becomes churn risk.\nLanding page CTA: Watch product walkthrough.\nSales narrative: CS says customers ask for visibility into onboarding drop-off points.\nProof: Product analytics shows drop-off reporting. Early beta customer reduced onboarding escalations by 12%. No revenue proof yet.\nExec feedback: CMO agrees with the adoption-focused story.",
      dominant: "Light proof caveat",
      risk: "Low",
      required: ["Proceed with proof caveat", "light proof caveat", "Recheck is optional", "Feature adoption"],
      forbidden: ["Pause spend scale"]
    }
  ];

  const failures = [];
  for (const item of cases) {
    context.setLaunchMode("pre");
    context.state.signals = {};
    context.state.intakeDump = item.input;
    context.state.launchDecisionPath = item.path;
    context.state.selectedKpi = "";
    context.state.diagnosis = null;
    context.sortIntake?.();
    const diagnosis = context.diagnoseLaunch();
    const exposure = diagnosis.commercialExposure || {};
    const haystack = JSON.stringify({ diagnosis, exposure });
    const dominant = diagnosis.dominantFractures?.[0]?.title || "";
    if (dominant !== item.dominant) failures.push(`${item.id}: dominant "${dominant}" !== "${item.dominant}"`);
    if (item.risk && diagnosis.riskLabel !== item.risk) failures.push(`${item.id}: risk "${diagnosis.riskLabel}" !== "${item.risk}"`);
    const missing = item.required.filter((phrase) => !haystack.includes(phrase));
    if (missing.length) failures.push(`${item.id}: missing ${missing.join(", ")}`);
    const leaked = item.forbidden.filter((phrase) => haystack.includes(phrase));
    if (leaked.length) failures.push(`${item.id}: forbidden ${leaked.join(", ")}`);
  }
  return failures;
}

const exposureContractFailures = assertExposureContract();
if (exposureContractFailures.length) {
  console.error("\nCommercial exposure contract failures:");
  exposureContractFailures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const launchDecisionPathFailures = assertLaunchDecisionPathHardScenarios();
if (launchDecisionPathFailures.length) {
  console.error("\nLaunch Decision Path hard-scenario failures:");
  launchDecisionPathFailures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`\n${results.length}/${results.length} Cognix GTM regression scenarios passed.`);
