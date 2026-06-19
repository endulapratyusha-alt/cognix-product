import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productAppPath = path.join(rootDir, "src/product-app.js");
const productSource = fs.readFileSync(productAppPath, "utf8")
  .replace(/\nrender\(\);\s*$/, "\nObject.assign(globalThis, { state, render, setLaunchMode, diagnoseLaunch, runManualRecheck, buildCommercialExposure });");

class FakeElement {
  constructor(attrs = {}, text = "") {
    this.attrs = attrs;
    this.textContent = text;
    this.value = attrs.value || text || "";
    this.listeners = {};
    this.dataset = {};
    Object.entries(attrs).forEach(([key, value]) => {
      if (!key.startsWith("data-")) return;
      const dataKey = key.slice(5).replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      this.dataset[dataKey] = value;
    });
    this.classList = { add() {}, remove() {} };
  }

  addEventListener(type, handler) {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(handler);
  }

  click() {
    this.dispatch("click");
  }

  input(value) {
    this.value = value;
    this.dispatch("input", { target: this });
  }

  dispatch(type, event = { target: this }) {
    (this.listeners[type] || []).forEach((handler) => handler(event));
  }

  focus() {
    fakeDocument.focused = this;
  }

  scrollIntoView() {
    fakeDocument.scrolled = this;
  }
}

class FakeApp extends FakeElement {
  set innerHTML(value) {
    this.html = String(value || "");
    fakeDocument.parse(this.html);
  }

  get innerHTML() {
    return this.html || "";
  }
}

const fakeDocument = {
  focused: null,
  scrolled: null,
  elements: [],
  app: null,
  parse(html) {
    this.elements = [];
    const attrPattern = /([a-zA-Z0-9:-]+)(?:="([^"]*)")?/g;
    const addElement = (tag, rawAttrs, text = "") => {
      const attrs = {};
      for (const match of rawAttrs.matchAll(attrPattern)) attrs[match[1]] = match[2] || "";
      this.elements.push(new FakeElement(attrs, text));
    };
    for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) addElement("button", match[1], stripTags(match[2]));
    for (const match of html.matchAll(/<textarea\b([^>]*)>([\s\S]*?)<\/textarea>/gi)) addElement("textarea", match[1], decode(match[2]));
    for (const match of html.matchAll(/<input\b([^>]*)>/gi)) addElement("input", match[1], "");
    for (const match of html.matchAll(/<select\b([^>]*)>/gi)) addElement("select", match[1], "");
  },
  querySelector(selector) {
    if (selector === "#app") return this.app;
    return this.querySelectorAll(selector)[0] || null;
  },
  querySelectorAll(selector) {
    return selector.split(",").flatMap((part) => this.querySimple(part.trim()));
  },
  querySimple(selector) {
    const dataMatch = selector.match(/^\[data-([^=\]]+)(?:=['"]?([^'"\]]+)['"]?)?\]$/);
    if (!dataMatch) return [];
    const attr = `data-${dataMatch[1]}`;
    const expected = dataMatch[2];
    return this.elements.filter((element) => {
      if (!(attr in element.attrs)) return false;
      return expected === undefined || element.attrs[attr] === expected;
    });
  }
};
fakeDocument.app = new FakeApp();

function stripTags(value) {
  return decode(String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function decode(value) {
  return String(value || "")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const context = {
  console,
  window: {
    setTimeout(handler) {
      handler();
      return 0;
    },
    matchMedia() {
      return { matches: false };
    }
  },
  document: fakeDocument,
  localStorage: {
    getItem() { return null; },
    setItem() {},
    removeItem() {},
    clear() {}
  },
  navigator: { clipboard: { writeText() { return Promise.resolve(); } } },
  Blob: function Blob() {},
  URL: { createObjectURL() { return ""; }, revokeObjectURL() {} },
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

const messySample = [
  "Strategy:",
  "Founder wants the launch to sound bigger and more category-defining.",
  "SignalDesk is the AI revenue operating system for every customer-facing team.",
  "CEO says we should sound like infrastructure, not a customer success tool.",
  "",
  "Campaign/page execution:",
  "Homepage hero: AI revenue operating system for every customer-facing team.",
  "Subheadline: Turn every customer signal into revenue action.",
  "CTA: Learn more.",
  "Campaign email subject: Meet the AI operating layer for modern revenue teams.",
  "",
  "Sales reality:",
  "Do not lead with AI revenue operating system. Prospects ask what that means.",
  "Best-performing sales hook: Catch renewal risk before it becomes churn.",
  "",
  "Proof:",
  "We had all the data. We just did not see the risk until the renewal was already in trouble.",
  "Pilot customers identified risk signals 30 days earlier.",
  "",
  "Launch economics:",
  "Launch spend: $20,000",
  "Demo target: 40",
  "Average opportunity value: $50,000",
  "Campaign horizon: 30 days"
].join("\n");

function requireElement(selector, label = selector) {
  const element = fakeDocument.querySelector(selector);
  if (!element) throw new Error(`${label} not found`);
  return element;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function countOccurrences(value, needle) {
  return (String(value || "").match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
}

context.render();
requireElement("[data-action='open-messy-dump']", "Paste messy dump button").click();
assert(context.state.step === 1, "Paste messy dump did not navigate to Add launch inputs");
assert(context.state.inputMode === "messy", "Paste messy dump did not preserve messy mode");
assert(fakeDocument.focused?.attrs["data-intake-dump"] !== undefined, "Paste messy dump did not focus the messy dump textarea");
assert(!fakeDocument.app.innerHTML.includes("source-surface-workspace"), "Messy mode showed structured GTM cards before auto-sort");
assert(!fakeDocument.app.innerHTML.includes("Sorted GTM inputs"), "Messy mode showed sorted inputs before auto-sort");
assert(countOccurrences(fakeDocument.app.innerHTML, "Auto-sort launch inputs") === 1, "Messy mode should show one auto-sort CTA before sorting");
assert(countOccurrences(fakeDocument.app.innerHTML, "Find launch risk") === 0, "Messy mode should not show launch-risk CTA before sorting");

const dump = requireElement("[data-intake-dump]", "messy dump textarea");
dump.input(messySample);
requireElement("[data-action='sort-signals']", "Auto-sort launch inputs button").click();
assert(context.state.signals["launch-message"]?.includes("AI revenue operating system"), "Auto-sort did not populate Strategy");
assert(context.state.signals["campaign-copy"]?.includes("Homepage hero"), "Auto-sort did not populate Campaign/page execution");
assert(context.state.signals["sales-talk-track"]?.includes("Do not lead"), "Auto-sort did not populate Sales reality");
assert(context.state.signals["customer-proof"]?.includes("We had all the data"), "Auto-sort did not populate Proof");
assert(context.state.signals["launch-goal"]?.includes("Launch spend"), "Auto-sort did not populate Launch economics");
assert(requireElement("[data-source-surface='strategy']", "visible Strategy textarea").value.includes("AI revenue operating system"), "Visible Strategy card did not populate");
assert(requireElement("[data-source-surface='execution']", "visible Campaign/page execution textarea").value.includes("Homepage hero"), "Visible Campaign/page execution card did not populate");
assert(requireElement("[data-source-surface='field']", "visible Sales reality textarea").value.includes("Do not lead"), "Visible Sales reality card did not populate");
assert(requireElement("[data-source-surface='proof']", "visible Proof textarea").value.includes("We had all the data"), "Visible Proof card did not populate");
assert(requireElement("[data-source-surface='metrics']", "visible Launch economics textarea").value.includes("Launch spend"), "Visible Launch economics card did not populate");
assert(requireElement("[data-intake-dump]", "messy dump textarea after sort").value.includes("Campaign/page execution:"), "Messy dump was not preserved after sorting");
assert(fakeDocument.app.innerHTML.includes("Launch inputs sorted."), "Sort confirmation did not render");
assert(fakeDocument.app.innerHTML.includes("Sorted GTM inputs"), "Sorted GTM inputs heading did not render after auto-sort");
assert(countOccurrences(fakeDocument.app.innerHTML, "Find launch risk") === 1, "Auto-sorted messy mode should show exactly one Find launch risk CTA");
assert(countOccurrences(fakeDocument.app.innerHTML, "Find the gap") === 0, "Auto-sorted messy mode should not show duplicate Find the gap CTA");

requireElement("[data-action='find-gap']", "Find launch risk button").click();
assert(context.state.step === 4, "Find the gap did not reach the result screen");
assert(fakeDocument.app.innerHTML.includes("Story gap found"), "Result screen did not render Story gap found");
assert(fakeDocument.app.innerHTML.includes("The launch assumption that may break"), "Result screen did not render the screenshot-format hero label");
assert(fakeDocument.app.innerHTML.includes("Story gap with receipts"), "Result screen did not render screenshot-format story gap card");
assert(fakeDocument.app.innerHTML.includes("Where the story breaks"), "Result screen did not render where-the-story-breaks card");
assert(fakeDocument.app.innerHTML.includes("Who feels it"), "Result screen did not render who-feels-it card");
assert(fakeDocument.app.innerHTML.includes("PMM fix path"), "Result screen did not render PMM fix path card");
assert(fakeDocument.app.innerHTML.includes("Fix status"), "Result screen did not render right-rail fix status");
assert(fakeDocument.app.innerHTML.includes("Plain-text leadership note"), "Result screen did not render screenshot-format leadership note label");
assert(fakeDocument.app.innerHTML.includes("board-right-rail"), "Result screen did not render the right rail");
assert(fakeDocument.app.innerHTML.includes("What it could cost"), "Result screen did not render commercial exposure");
assert(fakeDocument.app.innerHTML.includes("Launch decision brief"), "Result screen did not render launch decision brief");
assert(!fakeDocument.app.innerHTML.includes("Create task in Asana"), "Unfinished task placeholder rendered in result screen");

context.setLaunchMode("pre");
context.state.step = 0;
context.render();
requireElement("[data-action='open-compare-inputs']", "Compare inputs button").click();
assert(context.state.step === 1 && context.state.inputMode === "compare", "Compare inputs did not open compare mode");
assert(fakeDocument.querySelectorAll("[data-compare-input]").length === 2, "Compare mode did not render two textareas");
assert(fakeDocument.focused?.attrs["data-compare-input"] === "left", "Compare inputs did not focus the first textarea");

context.setLaunchMode("pre");
context.state.step = 0;
context.render();
requireElement("[data-action='go-add-inputs']", "Find the gap entry button").click();
assert(context.state.inputMode === "messy", "Main launch-risk CTA did not open messy-first mode");
assert(!fakeDocument.app.innerHTML.includes("source-surface-workspace"), "Main launch-risk CTA showed structured GTM cards before auto-sort");
assert(fakeDocument.app.innerHTML.includes("Have a messy launch dump?"), "Main launch-risk CTA did not show messy dump first");
context.state.inputMode = "full";
context.state.hasAnalyzedSignals = false;
context.render();
const sourceValues = {
  strategy: "SignalDesk is the AI revenue operating system for every customer-facing team.",
  execution: "Homepage hero: AI revenue operating system for every customer-facing team.\nCTA: Learn more.",
  field: "Do not lead with AI revenue operating system. Prospects ask what that means. Catch renewal risk before it becomes churn.",
  proof: "We had all the data. We just did not see the risk until the renewal was already in trouble.",
  metrics: "Launch spend: $20,000\nDemo target: 40\nAverage opportunity value: $50,000"
};
for (const [surface, value] of Object.entries(sourceValues)) {
  requireElement(`[data-source-surface='${surface}']`, `${surface} surface textarea`).input(value);
}
requireElement("[data-action='find-gap']", "manual Find the gap button").click();
assert(context.state.step === 4, "Manual source inputs did not reach the result screen");
assert(fakeDocument.app.innerHTML.includes("Story gap found"), "Manual source inputs did not render Story gap found");
assert(fakeDocument.app.innerHTML.includes("PMM fix path"), "Manual source inputs did not render PMM fix path");

context.setLaunchMode("pre");
context.state.signals = {
  "launch-message": "Founder wants SecureFlow to claim autonomous AI trust for modern enterprise security teams.",
  "campaign-copy": "Homepage hero: Autonomous AI trust for modern enterprise security teams.\nCTA: Learn more.",
  "sales-talk-track": "CISOs do not react strongly to AI trust layer. They ask for approved audit proof and concrete compliance evidence.",
  "customer-proof": "Proof is not approved yet. No customer metric or case study can support the trust claim."
};
context.state.commercialInputs = {};
let trustDiagnosis = context.diagnoseLaunch();
let trustExposure = context.buildCommercialExposure(trustDiagnosis);
let zeroFinancialText = [
  trustExposure.commercialExposure,
  trustExposure.scenarioExposureModel,
  trustExposure.executiveExposureBrief
].join("\n");
assert(zeroFinancialText.includes("Quantitative data missing from intake"), "Zero financial context did not show honest qualitative exposure");
assert(!/\$[\d,.]+/.test(zeroFinancialText), "Zero financial context produced invented dollar exposure");
assert((trustExposure.assetLevelFixes || []).every((item) => /What is structurally wrong:|Source receipt causing the issue:|Required correction:|Optional source-backed phrase:|Target metric:/.test(item.fix)), "Asset-level fixes are not structural repair criteria");

context.setLaunchMode("pre");
context.state.signals = {
  "launch-message": "Founder wants SecureFlow to claim autonomous AI trust for modern enterprise security teams.",
  "campaign-copy": "Homepage hero: Autonomous AI trust for modern enterprise security teams.\nCTA: Learn more.",
  "sales-talk-track": "CISOs do not react strongly to AI trust layer. They ask for approved audit proof and concrete compliance evidence.",
  "customer-proof": "We found missing audit evidence before the auditor asked for it.",
  "launch-goal": "Launch spend: $30,000"
};
trustDiagnosis = context.diagnoseLaunch();
trustExposure = context.buildCommercialExposure(trustDiagnosis);
assert(/Scenario model based on provided launch spend/i.test(trustExposure.scenarioExposureModel), "Partial financial context was not labeled as a provided-input scenario model");
assert(!/average opportunity value|pipeline target|conversion benchmark/i.test(trustExposure.scenarioExposureModel), "Partial financial context introduced unprovided financial assumptions");

context.setLaunchMode("pre");
context.state.signals = {
  "launch-message": sourceValues.strategy,
  "campaign-copy": sourceValues.execution,
  "sales-talk-track": sourceValues.field,
  "customer-proof": sourceValues.proof,
  "launch-goal": sourceValues.metrics
};
trustDiagnosis = context.diagnoseLaunch();
context.state.recheckInputs = {
  hero: "Catch renewal risk before it becomes churn.",
  cta: "Book a renewal risk review.",
  salesTalkTrack: "Open with Catch renewal risk before it becomes churn before introducing AI revenue operating system language.",
  campaignCopy: "Catch renewal risk before it becomes churn. Find hidden churn signals before renewal risk becomes visible too late.",
  founderPost: "Catch renewal risk before it becomes churn. SignalDesk helps teams spot hidden customer risk before renewal conversations.",
  salesDeck: "",
  outboundCopy: ""
};
let recheck = context.runManualRecheck(trustDiagnosis);
assert(recheck.status === "Cleared", `Expected recheck cleared state, got ${recheck.status}`);
assert(/What changed:|Original receipt resolved:|Remaining risk:|Launch decision:/i.test(recheck.reason), "Cleared recheck did not explain the validation change");
context.state.diagnosis = trustDiagnosis;
context.state.recheckResult = recheck;
trustDiagnosis.commercialExposure = context.buildCommercialExposure(trustDiagnosis);
context.state.step = 4;
context.render();
assert(fakeDocument.app.innerHTML.includes("Status: Cleared"), "Cleared lifecycle status was not visible");
assert(fakeDocument.app.innerHTML.includes("Result: Cleared"), "Cleared recheck result was not visible");

context.state.recheckInputs = {
  hero: "The AI revenue operating system for every customer-facing team.",
  cta: "Explore the platform.",
  salesTalkTrack: "Lead with AI revenue operating system.",
  campaignCopy: "",
  founderPost: "",
  salesDeck: "",
  outboundCopy: ""
};
recheck = context.runManualRecheck(trustDiagnosis);
assert(["Still exposed", "Partially fixed", "New risk introduced", "Needs another pass"].includes(recheck.status), `Expected unresolved recheck state, got ${recheck.status}`);
assert(/Still exposed|Partially fixed|New risk introduced|Needs another pass|original launch risk/i.test(recheck.reason), "Unresolved recheck did not explain remaining original risk");

console.log("Product interaction smoke test passed.");
