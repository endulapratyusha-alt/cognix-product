import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturePath = path.join(rootDir, "test/fixtures/messy-dump-hard-tests.json");
const productAppPath = path.join(rootDir, "src/product-app.js");

const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const productSource = fs.readFileSync(productAppPath, "utf8")
  .replace(/\nrender\(\);\s*$/, "\nObject.assign(globalThis, { state, setLaunchMode, sortIntake, diagnoseLaunch, resultScreen, displayFractureTitle });");

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

function runCase(test) {
  storage.clear();
  context.setLaunchMode("pre");
  context.state.signals = {};
  context.state.intakeDump = test.input;
  context.state.diagnosis = null;
  context.sortIntake();
  const diagnosis = context.diagnoseLaunch();
  context.state.diagnosis = diagnosis;
  const html = context.resultScreen();
  const expected = test.expected || {};
  const dominant = diagnosis.paused
    ? ""
    : context.displayFractureTitle(diagnosis.dominantFractures?.[0]?.title || "", diagnosis);
  const architecture = diagnosis.outputArchitecture || {};
  const haystack = JSON.stringify({
    diagnosis,
    architecture,
    html
  });
  const visibleHaystack = JSON.stringify({
    dominant,
    architecture,
    html,
    actions: diagnosis.actions || []
  });
  const failures = [];
  const didPause = Boolean(diagnosis.paused);
  if (didPause !== test.shouldPause) failures.push(`pause ${didPause} !== ${test.shouldPause}`);
  if (expected.product && diagnosis.extractedConcepts?.product !== expected.product) failures.push(`product "${diagnosis.extractedConcepts?.product}" !== "${expected.product}"`);
  if (expected.domain && diagnosis.domain?.id !== expected.domain) failures.push(`domain "${diagnosis.domain?.id}" !== "${expected.domain}"`);
  if (expected.dominantIncludes && dominant !== expected.dominantIncludes) failures.push(`dominant "${dominant}" !== "${expected.dominantIncludes}"`);
  if (expected.dominantIncludesOneOf && !expected.dominantIncludesOneOf.includes(dominant)) failures.push(`dominant "${dominant}" not in allowed set`);
  const buyerPressure = diagnosis.strategicMatrix?.buyer_pressure?.value || "";
  if (expected.buyerPressureIncludes && !expected.buyerPressureIncludes.every((phrase) => buyerPressure.toLowerCase().includes(phrase.toLowerCase()))) {
    failures.push(`buyer pressure "${buyerPressure}" missing ${expected.buyerPressureIncludes.join(", ")}`);
  }
  const downstream = diagnosis.strategicMatrix?.public_dilution?.value || diagnosis.strategicMatrix?.current_headline?.value || "";
  if (expected.downstreamIncludes && !downstream.includes(expected.downstreamIncludes)) failures.push(`downstream "${downstream}" missing "${expected.downstreamIncludes}"`);
  const currentCta = diagnosis.strategicMatrix?.current_cta?.value || "";
  if (expected.cta && currentCta !== expected.cta) failures.push(`CTA "${currentCta}" !== "${expected.cta}"`);
  const suggestedCta = architecture.ctaPanel?.sayThis || "";
  if (expected.suggestedCta && suggestedCta !== expected.suggestedCta) failures.push(`CTA fix "${suggestedCta}" !== "${expected.suggestedCta}"`);
  const rewrite = architecture.rewritePanel?.sayThis || "";
  if (expected.rewrite && rewrite !== expected.rewrite) failures.push(`rewrite "${rewrite}" !== "${expected.rewrite}"`);
  if (expected.commercialIncludes) {
    const missingCommercial = expected.commercialIncludes.filter((phrase) => !haystack.includes(phrase));
    if (missingCommercial.length) failures.push(`commercial missing ${missingCommercial.join(", ")}`);
  }
  if (expected.mustInclude) {
    const missingRequired = expected.mustInclude.filter((phrase) => !visibleHaystack.toLowerCase().includes(phrase.toLowerCase()));
    if (missingRequired.length) failures.push(`required output missing ${missingRequired.join(", ")}`);
  }
  if (expected.forbidden) {
    const leaked = expected.forbidden.filter((phrase) => visibleHaystack.toLowerCase().includes(phrase.toLowerCase()));
    if (leaked.length) failures.push(`wrong-domain language leaked: ${leaked.join(", ")}`);
  }
  if (test.shouldPause) {
    if (html.includes(["Download", "story", "drift", "PDF"].join(" "))) failures.push("Legacy PDF export visible while paused");
    if (diagnosis.outputArchitecture) failures.push("full output architecture generated while paused");
    if (!/Cognix PMM needs more evidence before calling a story gap/i.test(html)) failures.push("pause state title missing");
  } else if (!html.includes("Launch decision brief")) {
    failures.push("Launch decision brief missing for valid launch risk");
  } else if (html.includes(["Download", "story", "drift", "PDF"].join(" "))) {
    failures.push("Legacy PDF-first export is still visible for valid exposure alert");
  }
  if (!test.shouldPause) {
    const exposure = diagnosis.commercialExposure || {};
    const requiredExposureFields = [
      "status",
      "kpiAtRisk",
      "commercialExposure",
      "scenarioExposureModel",
      "primaryContradiction",
      "confidenceLevel",
      "executiveDecision",
      "sourceReceipts",
      "ownerActionMatrix",
      "alertLifecycle",
      "executiveExposureBrief"
    ];
    const missingExposureFields = requiredExposureFields.filter((field) => !exposure[field]);
    if (missingExposureFields.length) failures.push(`commercial exposure fields missing: ${missingExposureFields.join(", ")}`);
    if (!Array.isArray(exposure.sourceReceipts) || exposure.sourceReceipts.length < 5) failures.push("source-isolated receipts missing");
    if (!Array.isArray(exposure.ownerActionMatrix) || exposure.ownerActionMatrix.length < 5) failures.push("owner action matrix incomplete");
    if (exposure.alertLifecycle?.status !== "Launch risk found") failures.push(`alert lifecycle status "${exposure.alertLifecycle?.status}" !== "Launch risk found"`);
    if (!html.includes("Recheck revised launch assets")) failures.push("manual recheck workflow missing");
    ["Commercial implication", "Exact fixes", "What it could cost", "Suggested owner + approval path"].forEach((section) => {
      if (!html.includes(section)) failures.push(`${section} section missing`);
    });
  }
  return {
    test: test.name,
    shouldPause: test.shouldPause,
    didPause,
    score: diagnosis.predictabilityScore ?? "paused",
    risk: diagnosis.riskLabel || "paused",
    dominant,
    product: diagnosis.extractedConcepts?.product || "",
    buyerPressureQuality: buyerPressure ? "detected" : "missing",
    commercialExtraction: expected.commercialIncludes?.every((phrase) => haystack.includes(phrase)) ? "complete" : test.shouldPause ? "n/a" : "incomplete",
    ctaExtraction: expected.cta ? `${currentCta} -> ${suggestedCta}` : "n/a",
    pass: failures.length === 0,
    failures,
    details: {
      product: diagnosis.extractedConcepts?.product,
      domain: diagnosis.domain?.id,
      buyerPressure,
      upstream: diagnosis.strategicMatrix?.internal_strategic_insight?.value || "",
      downstream,
      currentCta,
      suggestedCta,
      rewrite,
      commercial: diagnosis.outputArchitecture?.commercialPanel?.headline || diagnosis.strategicMatrix?.commercial_stake?.value || "",
      html
    }
  };
}

function printTable(results) {
  console.table(results.map((result) => ({
    Test: result.test,
    "Should pause?": result.shouldPause ? "yes" : "no",
    "Did pause?": result.didPause ? "yes" : "no",
    Score: String(result.score),
    Risk: result.risk,
    "Dominant fracture": result.dominant,
    Product: result.product,
    "Buyer pressure": result.buyerPressureQuality,
    Commercial: result.commercialExtraction,
    CTA: result.ctaExtraction,
    Result: result.pass ? "PASS" : "FAIL"
  })));
}

const results = fixture.tests.map(runCase);
printTable(results);

const failures = results.filter((result) => !result.pass);
if (failures.length) {
  console.error("\nMessy-dump hard suite failures:");
  failures.forEach((failure) => {
    console.error(`- ${failure.test}: ${failure.failures.join("; ")}`);
    console.error(JSON.stringify(failure.details, null, 2));
  });
  process.exit(1);
}

console.log(`\n${results.length}/${results.length} messy-dump hard tests passed.`);
