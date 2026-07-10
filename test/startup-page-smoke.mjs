import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(rootDir, "src/app.js"), "utf8");
const startupHtml = fs.readFileSync(path.join(rootDir, "solutions/startups.html"), "utf8");
const startupSource = fs.readFileSync(path.join(rootDir, "src/startup-page.js"), "utf8");
const startupStyles = fs.readFileSync(path.join(rootDir, "styles/startup-page.css"), "utf8");
const viteConfig = fs.readFileSync(path.join(rootDir, "vite.config.js"), "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function countOccurrences(value, needle) {
  return (String(value).match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
}

assert(appSource.includes('{ label: "Startups", href: "solutions/startups.html" }'), "Solutions dropdown Startups link should point to the startup PMM page.");
assert(appSource.includes('["Startups", "Find clarity. Build GTM foundation.", "solutions/startups.html", true]'), "Homepage startup segment card should point to the startup PMM page.");
assert(appSource.includes('class="${active ? "stage-link" : ""}"'), "Homepage startup segment card should render as a full-card link.");
assert(appSource.includes('aria-label="Open Cognix for Startup PMMs"'), "Homepage startup segment card needs an accessible label.");

assert(startupHtml.includes("<title>Cognix for Startup PMMs | Build and Scale the PMM Function</title>"), "Startup page should have the requested page title.");
assert(startupHtml.includes('content="Cognix helps solo PMMs and lean GTM teams research the business'), "Startup page should have the requested meta description.");
assert(startupHtml.includes("../src/startup-page.js"), "Startup route should load its page script.");
assert(startupHtml.includes('window.location.protocol === "file:"'), "Startup route should support direct file:// preview.");

assert(startupSource.includes("Build the PMM function your company actually needs."), "Startup page hero headline missing.");
assert(startupSource.includes("Your PMM Intelligence Hub"), "Startup page PMM intelligence hub missing.");
assert(startupSource.includes("Start building your PMM function"), "Startup page primary CTA text missing.");
assert(startupSource.includes("data-primary-cta"), "Startup page primary CTA should be easy to target.");
assert(startupSource.includes("Assess launch predictability before execution"), "Launch predictability should appear downstream in the closed-loop section.");
assert(countOccurrences(startupSource, "Launch predictability") === 0, "Launch predictability should not dominate headings or hero copy.");
assert(!startupSource.match(/Tapistro|SpringWorks|PMA|ProductLed|RevGenius|GTM Partners|trusted by|backed by/i), "Startup page should not contain unsupported endorsement claims.");

assert(!startupStyles.includes("@import url(\"./styles.css"), "Startup page should not rely on nested CSS imports for the base stylesheet.");
assert(startupStyles.includes(".site-header") && startupStyles.includes(".hub-visual"), "Startup stylesheet should include base Cognix styles and startup-specific styles.");
assert(startupStyles.includes("focus-visible") || fs.readFileSync(path.join(rootDir, "styles/styles.css"), "utf8").includes("focus-visible"), "Links and buttons should have visible focus styles.");
assert(viteConfig.includes('startupPmm: "solutions/startups.html"'), "Vite build should include the startup page entry.");

console.log("Startup page smoke checks passed.");
