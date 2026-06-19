import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productAppPath = path.join(rootDir, "src/product-app.js");
const productSource = fs.readFileSync(productAppPath, "utf8")
  .replace(/\nrender\(\);\s*$/, "\nObject.assign(globalThis, { state, setLaunchMode, sortIntake, diagnoseLaunch, resultScreen, runManualRecheck, displayFractureTitle });");

const storage = new Map();
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
    getItem(key) {
      return storage.get(key) || null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
    removeItem(key) {
      storage.delete(key);
    },
    clear() {
      storage.clear();
    }
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
  CSS: { escape: String },
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

const validationStates = new Set([
  "Fixed",
  "Partially fixed",
  "Still exposed",
  "New risk introduced",
  "Cleared",
  "Needs another pass"
]);

const scenarios = [
  {
    id: "clean-aligned",
    name: "Clean aligned launch input",
    input: [
      "Strategy:",
      "TrustFlow helps RevOps leaders walk into pipeline review with one trusted view of stalled handoffs, owner gaps, and forecast-risk accounts.",
      "",
      "Campaign/page execution:",
      "Homepage hero: Stop walking into pipeline reviews with numbers nobody trusts. Subheadline: TrustFlow shows stalled handoffs, owner gaps, and forecast-risk accounts before the forecast call. CTA: Pressure-test your next pipeline review.",
      "",
      "Sales reality:",
      "Sales will open with pipeline-review trust and ask where forecast confidence breaks across Salesforce, CS, and support handoffs.",
      "",
      "Proof:",
      "Beta customer found 18 stalled handoffs before pipeline review and improved forecast confidence before the executive revenue meeting.",
      "",
      "Business metrics:",
      "Launch spend: $35,000. Demo target: 30. Average opportunity value: $55,000."
    ].join("\n"),
    expect: {
      noOverDiagnosis: true,
      riskIncludes: ["reinforce", "same buyer pain"],
      kpiMatches: /qualified demo|pipeline|campaign/i,
      decisionMatches: /proceed|monitor|ready/i,
      receiptIncludes: ["pipeline reviews", "18 stalled handoffs"]
    }
  },
  {
    id: "mild-contradiction",
    name: "Mild GTM contradiction",
    input: [
      "Strategy:",
      "LedgerIQ should help finance leaders find invoice exceptions before they become month-end backlog.",
      "",
      "Campaign/page execution:",
      "Homepage hero: AI-powered invoice intelligence for modern finance teams. CTA: Find invoice exception leakage.",
      "",
      "Sales reality:",
      "Sales says finance buyers respond when we talk about month-end risk and delayed payment caused by unresolved invoice exceptions.",
      "",
      "Proof:",
      "Pilot team reduced AP exception review time from 5 days to 2 days.",
      "",
      "Business metrics:",
      "Demo target: 25. Average opportunity value: $40,000."
    ].join("\n"),
    expect: {
      riskIncludes: ["buyer pain", "positioning"],
      kpiMatches: /demo|finance|campaign/i,
      decisionMatches: /fix|controlled|spend|scale/i,
      receiptIncludes: ["invoice exceptions", "5 days to 2 days"]
    }
  },
  {
    id: "founder-category-override",
    name: "Founder/category override",
    input: [
      "Strategy:",
      "Founder wants SignalDesk to launch as the AI revenue operating system for every customer-facing team.",
      "",
      "Campaign/page execution:",
      "Homepage hero: AI revenue operating system for every customer-facing team. CTA: Learn more.",
      "",
      "Sales reality:",
      "Do not lead with AI revenue operating system. Prospects ask what that means. Best-performing sales hook: Catch renewal risk before it becomes churn.",
      "",
      "Proof:",
      "Customer quote: We had all the data. We just did not see the risk until the renewal was already in trouble. Pilot customers identified risk signals 30 days earlier.",
      "",
      "Business metrics:",
      "Launch spend: $20,000. Demo target: 40. Average opportunity value: $50,000."
    ].join("\n"),
    expect: {
      riskIncludes: ["Founder/category language", "field-tested"],
      kpiMatches: /qualified demo/i,
      decisionMatches: /pause|hold|fix/i,
      receiptIncludes: ["AI revenue operating system", "Catch renewal risk"],
      fixIncludes: ["hidden renewal risk", "AI revenue operating system"]
    }
  },
  {
    id: "proof-gap",
    name: "Proof gap",
    input: [
      "Strategy:",
      "DealPulse helps sales leaders find deals that will slip before the forecast call.",
      "",
      "Campaign/page execution:",
      "Homepage hero: Find the deals that will slip before your forecast call. CTA: Pressure-test your forecast risk.",
      "",
      "Sales reality:",
      "Sales says buyers believe the pain, but ask for proof that the model predicts slipping deals better than their current forecast review.",
      "",
      "Proof:",
      "Customer proof is not approved yet. No customer metric, before-after result, or case study can be used on the launch page.",
      "",
      "Business metrics:",
      "Demo target: 35. Average opportunity value: $72,000."
    ].join("\n"),
    expect: {
      riskIncludes: ["proof", "claim"],
      kpiMatches: /demo|pipeline/i,
      decisionMatches: /fix|spend|scale|proof/i,
      receiptIncludes: ["No customer metric", "buyers believe the pain"],
      fixIncludes: ["proof"]
    }
  },
  {
    id: "sales-objection-conflict",
    name: "Sales objection conflict",
    input: [
      "Strategy:",
      "FlowPilot helps operations leaders find the handoff that is slowing down workflow before approvals stall.",
      "",
      "Campaign/page execution:",
      "Homepage hero: AI workflow automation for modern operations teams. CTA: See where approvals get stuck.",
      "",
      "Sales reality:",
      "Sales objection: We do not need another dashboard. We need to know whether approvals, ownership, missing data, or follow-up is the bottleneck.",
      "",
      "Proof:",
      "A pilot customer cut approval cycles from 5 days to 2 days after finding ownership gaps.",
      "",
      "Business metrics:",
      "Launch spend: $42,000. Demo target: 28."
    ].join("\n"),
    expect: {
      riskIncludes: ["workflow", "operations", "urgency"],
      kpiMatches: /demo|campaign/i,
      decisionMatches: /fix|spend|scale/i,
      receiptIncludes: ["We do not need another dashboard", "5 days to 2 days"],
      fixIncludes: ["sales"]
    }
  },
  {
    id: "budget-exposure",
    name: "Budget exposure scenario",
    input: [
      "Strategy:",
      "LaunchLens helps CMOs protect launch-to-pipeline conversion before campaign spend scales.",
      "",
      "Campaign/page execution:",
      "Homepage hero: AI-powered launch intelligence for modern product marketing teams. CTA: Learn more.",
      "",
      "Sales reality:",
      "Sales says the page sounds interesting but does not create urgency for qualified demo requests.",
      "",
      "Proof:",
      "Pilot PMM team caught buyer-facing dilution before paid spend launched.",
      "",
      "Business metrics:",
      "Launch spend: $80,000. Demo target: 60. Average opportunity value: $45,000. Pipeline target: $900,000."
    ].join("\n"),
    expect: {
      riskIncludes: ["generic", "AI"],
      kpiMatches: /qualified demo|campaign/i,
      decisionMatches: /fix|spend|scale/i,
      commercialIncludes: ["$80K", "exposed", "conversion"],
      receiptIncludes: ["Launch spend", "Learn more"]
    }
  },
  {
    id: "messy-launch-dump",
    name: "Messy launch dump",
    input: [
      "Founder note: make RenewalRadar sound bigger, like the AI revenue operating system for customer teams.",
      "PMM concern: buyers care about hidden renewal risk, not the category.",
      "Homepage draft: AI customer health intelligence for modern CS teams. CTA is Book a demo.",
      "Sales feedback: prospects ask why health scores missed the risk. Best opener is Find hidden renewal risk.",
      "Customer quote: We saw the account turn red too late. Pilot customers found risk signals 30 days earlier.",
      "Launch goal: 30 qualified demos from CS leaders. Launch spend: $24,000."
    ].join("\n"),
    expect: {
      riskIncludes: ["renewal", "category"],
      kpiMatches: /qualified demo/i,
      decisionMatches: /pause|fix|spend/i,
      receiptIncludes: ["AI revenue operating system", "Find hidden renewal risk"],
      fixIncludes: ["renewal"]
    }
  },
  {
    id: "false-positive-trap",
    name: "False positive trap",
    input: [
      "Strategy:",
      "OpsClear helps operations leaders find stuck approvals before workflow delays hit customer commitments.",
      "",
      "Campaign/page execution:",
      "Homepage hero: Find stuck approvals before workflow delays hit customer commitments. CTA: Book an approvals workflow review.",
      "",
      "Sales reality:",
      "Sales says the wording is plain but accurate, and buyers understand stuck approvals and ownership gaps immediately.",
      "",
      "Proof:",
      "Customer cut approval cycle time from 5 days to 2 days after finding ownership gaps.",
      "",
      "Business metrics:",
      "Demo target: 20. Average opportunity value: $35,000."
    ].join("\n"),
    expect: {
      noOverDiagnosis: true,
      riskIncludes: ["same buyer pain"],
      kpiMatches: /demo|campaign|pipeline/i,
      decisionMatches: /proceed|monitor|ready/i,
      receiptIncludes: ["wording is plain but accurate", "5 days to 2 days"]
    }
  },
  {
    id: "multi-risk-hierarchy",
    name: "Multi-risk hierarchy",
    input: [
      "Strategy:",
      "Founder says launch the AI revenue operating system. PMM says the sharper launch is hidden renewal risk before churn.",
      "",
      "Campaign/page execution:",
      "Homepage hero: AI revenue operating system for every customer-facing team. CTA: Learn more.",
      "",
      "Sales reality:",
      "Sales says do not lead with AI revenue operating system because buyers ask what that means. Lead with hidden churn signals and renewal risk.",
      "",
      "Proof:",
      "Proof is thin: one anecdotal pilot quote exists, but no approved metric yet.",
      "",
      "Business metrics:",
      "Launch spend: $60,000. Demo target: 50. Average opportunity value: $80,000."
    ].join("\n"),
    expect: {
      riskIncludes: ["Founder/category", "field-tested"],
      kpiMatches: /qualified demo/i,
      decisionMatches: /pause|hold|fix/i,
      receiptIncludes: ["AI revenue operating system", "hidden churn signals"],
      fixIncludes: ["category", "renewal"]
    }
  },
  {
    id: "recheck-validation",
    name: "Recheck/validation pass",
    input: [
      "Strategy:",
      "Founder wants SignalDesk to launch as the AI revenue operating system for every customer-facing team.",
      "",
      "Campaign/page execution:",
      "Homepage hero: AI revenue operating system for every customer-facing team. CTA: Learn more.",
      "",
      "Sales reality:",
      "Do not lead with AI revenue operating system. Prospects ask what that means. Best-performing sales hook: Catch renewal risk before it becomes churn.",
      "",
      "Proof:",
      "Pilot customers identified risk signals 30 days earlier.",
      "",
      "Business metrics:",
      "Launch spend: $20,000. Demo target: 40. Average opportunity value: $50,000."
    ].join("\n"),
    recheckInputs: {
      hero: "Catch renewal risk before it becomes churn.",
      cta: "Find hidden renewal risk.",
      salesTalkTrack: "Open with Catch renewal risk before it becomes churn, then explain SignalDesk after the buyer accepts the urgency.",
      campaignCopy: "Catch renewal risk before it becomes churn. Find hidden churn signals before the renewal is already in trouble.",
      founderPost: "Catch renewal risk before it becomes churn. SignalDesk helps teams spot hidden customer risk before the renewal is already in trouble.",
      salesDeck: "Hidden renewal risk opener.",
      outboundCopy: "Catch renewal risk before it becomes churn."
    },
    expect: {
      riskIncludes: ["Founder/category", "field-tested"],
      kpiMatches: /qualified demo/i,
      decisionMatches: /pause|hold|fix/i,
      validationMatches: /Cleared|Fixed/i,
      receiptIncludes: ["AI revenue operating system", "Catch renewal risk"],
      fixIncludes: ["renewal"]
    }
  }
];

function runScenario(scenario) {
  storage.clear();
  context.setLaunchMode("pre");
  context.state.signals = {};
  context.state.intakeDump = scenario.input;
  context.state.recheckResult = null;
  context.state.recheckInputs = {};
  context.state.diagnosis = null;
  context.sortIntake();
  const diagnosis = context.diagnoseLaunch();
  context.state.diagnosis = diagnosis;
  const html = context.resultScreen();
  const exposure = diagnosis.commercialExposure || {};
  const judgment = exposure.fractureJudgment || {};
  const brief = exposure.executiveExposureBrief || "";
  let recheck = null;
  if (scenario.recheckInputs) {
    context.state.recheckInputs = { ...scenario.recheckInputs };
    recheck = context.runManualRecheck(diagnosis);
  }

  const output = {
    diagnosis,
    exposure,
    judgment,
    html,
    brief,
    recheck
  };
  const failures = [];
  const notes = [];
  const haystack = JSON.stringify(output);
  const risk = judgment.fracture || exposure.primaryContradiction || "";
  const kpi = exposure.kpiAtRisk || "";
  const commercial = judgment.commercialRisk || exposure.riskMechanism || "";
  const decision = decisionFromBrief(brief) || exposure.executiveDecision || "";
  const fixPath = judgment.fixPath || "";
  const ownerActions = exposure.ownerActionMatrix || [];
  const assetFixes = exposure.assetLevelFixes || [];
  const receipts = exposure.sourceReceipts || [];
  const receiptText = receipts.map((item) => item.receipt).filter(Boolean).join("\n");
  const validation = recheck?.status || exposure.alertLifecycle?.status || "";

  assertIncludes(failures, scenario.expect.riskIncludes, risk, "primary launch risk");
  assertRegex(failures, scenario.expect.kpiMatches, kpi, "KPI at risk");
  assertTruthy(failures, commercial, "commercial implication");
  assertCommercialConnection(failures, commercial, exposure, scenario);
  assertRegex(failures, scenario.expect.decisionMatches, decision, "launch decision");
  assertTruthy(failures, fixPath, "primary fix path");
  assertActionGrade(failures, fixPath, "primary fix path");
  assertOwnerActions(failures, ownerActions);
  assertAssetFixes(failures, assetFixes);
  assertReceipts(failures, receipts, scenario.expect.receiptIncludes);
  if (scenario.expect.commercialIncludes) assertIncludes(failures, scenario.expect.commercialIncludes, haystack, "commercial exposure");
  if (scenario.expect.fixIncludes) assertIncludes(failures, scenario.expect.fixIncludes, `${fixPath}\n${assetFixes.map((item) => item.fix).join("\n")}`, "fix recommendations");
  if (scenario.recheckInputs) {
    assertRegex(failures, scenario.expect.validationMatches, validation, "validation state");
    if (!validationStates.has(validation)) failures.push(`validation state "${validation}" is not in allowed states`);
  }
  if (scenario.expect.noOverDiagnosis) {
    const decisionText = `${decision} ${risk} ${commercial}`.toLowerCase();
    if (/pause spend|launch hold|commercial exposure detected|major fracture/i.test(decisionText) || ["High", "Medium to high"].includes(diagnosis.riskLabel)) {
      failures.push("over-diagnosed clean or false-positive-trap input");
      notes.push("Overreacted: clean/aligned input received a high-risk or pause-style read.");
    }
  }

  const genericItems = genericFixes([fixPath, ...assetFixes.map((item) => item.fix), ...ownerActions.map((item) => item.actionRequired)]);
  if (genericItems.length) notes.push(`Generic output: ${genericItems.join(" | ")}`);
  const weakActions = weakActionGrade([fixPath, ...assetFixes.map((item) => item.fix)]);
  if (weakActions.length) notes.push(`Not action-grade: ${weakActions.join(" | ")}`);
  if (!receiptText || scenario.expect.receiptIncludes?.some((phrase) => !receiptText.toLowerCase().includes(phrase.toLowerCase()))) {
    notes.push("Receipt concern: expected input receipt was missing or not preserved verbatim enough.");
  }
  if (scenario.id === "multi-risk-hierarchy" && !/Founder\/category|Founder\/category language|field-tested/i.test(risk)) {
    notes.push("Underreacted: multi-risk case did not prioritize founder/category override as dominant.");
  }

  return {
    id: scenario.id,
    name: scenario.name,
    pass: failures.length === 0,
    risk: truncate(risk, 110),
    kpi,
    commercial: truncate(commercial, 120),
    decision,
    fixPath: truncate(fixPath, 120),
    owners: ownerActions.map((item) => item.owner).join(", "),
    assets: assetFixes.map((item) => item.asset).join(", "),
    receipts: receipts.filter((item) => item.receipt).length,
    validation,
    failures,
    notes,
    debug: {
      riskLabel: diagnosis.riskLabel,
      score: diagnosis.predictabilityScore,
      dominant: context.displayFractureTitle?.(diagnosis.dominantFractures?.[0]?.title || "", diagnosis) || diagnosis.dominantFractures?.[0]?.title || "",
      brief: truncate(brief, 500)
    }
  };
}

function decisionFromBrief(brief) {
  const match = String(brief || "").match(/Decision:\s*\n([^\n]+)/i);
  return match?.[1]?.trim() || "";
}

function assertTruthy(failures, value, label) {
  if (!String(value || "").trim()) failures.push(`${label} missing`);
}

function assertRegex(failures, pattern, value, label) {
  if (!pattern) return;
  if (!pattern.test(String(value || ""))) failures.push(`${label} "${value}" did not match ${pattern}`);
}

function assertIncludes(failures, phrases, value, label) {
  if (!phrases) return;
  const text = String(value || "").toLowerCase();
  const missing = phrases.filter((phrase) => !text.includes(String(phrase).toLowerCase()));
  if (missing.length) failures.push(`${label} missing ${missing.join(", ")}`);
}

function assertCommercialConnection(failures, commercial, exposure, scenario) {
  const text = `${commercial} ${exposure.commercialExposure || ""} ${exposure.scenarioExposureModel || ""}`.toLowerCase();
  if (!/(budget|spend|conversion|pipeline|sales|executive|confidence|demo|renewal|revenue|attribution)/i.test(text)) {
    failures.push("commercial implication does not connect to budget, conversion, pipeline, sales confusion, or executive confidence");
  }
  if (scenario.id === "budget-exposure" && !/\$80k|\$80,000|80,000|80k/i.test(text)) {
    failures.push("budget exposure scenario did not use the submitted budget");
  }
}

function assertActionGrade(failures, value, label) {
  const text = String(value || "");
  if (!/(rewrite|replace|move|lead with|update|place|sequence|instrument|use|request|remove|give sales|open with)/i.test(text)) {
    failures.push(`${label} is not action-grade`);
  }
}

function assertOwnerActions(failures, ownerActions) {
  if (!Array.isArray(ownerActions) || ownerActions.length < 4) {
    failures.push("owner actions missing or incomplete");
    return;
  }
  const required = ["owner", "status", "actionRequired", "verbatimSourceReceipt", "kpiTargetMetric", "assetToRevise"];
  ownerActions.forEach((item, index) => {
    const missing = required.filter((key) => !String(item[key] || "").trim());
    if (missing.length) failures.push(`owner action ${index + 1} missing ${missing.join(", ")}`);
    assertActionGrade(failures, item.actionRequired, `owner action ${index + 1}`);
  });
}

function assertAssetFixes(failures, fixes) {
  if (!Array.isArray(fixes) || fixes.length < 4) {
    failures.push("asset-level fixes missing or incomplete");
    return;
  }
  const requiredAssets = /(hero|CTA|campaign|sales|proof|founder|memo|homepage)/i;
  fixes.forEach((item, index) => {
    if (!String(item.asset || "").trim() || !String(item.fix || "").trim()) failures.push(`asset fix ${index + 1} missing asset or fix`);
    if (!requiredAssets.test(`${item.asset} ${item.fix}`)) failures.push(`asset fix ${index + 1} does not name a launch asset`);
    assertActionGrade(failures, item.fix, `asset fix ${index + 1}`);
  });
}

function assertReceipts(failures, receipts, expectedPhrases = []) {
  if (!Array.isArray(receipts) || receipts.filter((item) => item.receipt).length < 3) {
    failures.push("evidence receipts missing or too thin");
    return;
  }
  const text = receipts.map((item) => item.receipt).join("\n").toLowerCase();
  const missing = expectedPhrases.filter((phrase) => !text.includes(String(phrase).toLowerCase()));
  if (missing.length) failures.push(`receipts missing ${missing.join(", ")}`);
}

function genericFixes(items) {
  return items
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .filter((item) => /^(address|improve|align|clarify|optimize|fix|update the (?:message|copy))\b/i.test(item) && item.length < 120)
    .slice(0, 5);
}

function weakActionGrade(items) {
  return items
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .filter((item) => !/(hero|CTA|campaign|sales|talk track|proof|founder|memo|headline|page|asset|dashboard|launch|copy|email|outbound)/i.test(item))
    .slice(0, 5);
}

function truncate(value, max) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 3)}...` : text;
}

const results = scenarios.map(runScenario);

console.log("\nLaunch protection hard-test results");
console.table(results.map((result) => ({
  Test: result.name,
  Pass: result.pass ? "PASS" : "FAIL",
  Risk: result.risk,
  KPI: result.kpi,
  Decision: result.decision,
  Receipts: result.receipts,
  Validation: result.validation || "n/a"
})));

const failures = results.filter((result) => !result.pass);
if (failures.length) {
  console.error("\nFailures");
  failures.forEach((result) => {
    console.error(`- ${result.name}: ${result.failures.join("; ")}`);
    console.error(`  Debug: ${JSON.stringify(result.debug)}`);
  });
}

const notes = results.filter((result) => result.notes.length);
if (notes.length) {
  console.log("\nProduct judgment notes");
  notes.forEach((result) => {
    console.log(`- ${result.name}: ${result.notes.join("; ")}`);
  });
}

console.log(`\n${results.length - failures.length}/${results.length} launch protection hard tests passed.`);

if (failures.length) process.exit(1);
