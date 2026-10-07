import { access, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const publicDir = join(root, "public");

console.log("Running site verification tests...");

// Check core files
const essentialFiles = [
  "index.html",
  "site.css",
  "site.js",
  "manifest.json",
  "assets/hero-hospitality.webp",
  "assets/inquiry-planning.webp",
  "assets/signal-mark.svg",
  "assets/logo-mark.png"
];

for (const file of essentialFiles) {
  const filePath = join(publicDir, file);
  try {
    await access(filePath);
    console.log(`  ✓ Found public/${file}`);
  } catch {
    console.error(`  ✗ Missing essential file: public/${file}`);
    process.exit(1);
  }
}

// Check index.html contents
const html = await readFile(join(publicDir, "index.html"), "utf-8");
const checks = [
  { name: "DOCTYPE declaration", test: html.includes("<!doctype html>") || html.includes("<!DOCTYPE html>") },
  { name: "Viewport meta tag", test: html.includes('name="viewport"') },
  { name: "Page title", test: html.includes("<title>") },
  { name: "CSS stylesheet link", test: html.includes('href="/site.css"') || html.includes('href="site.css"') },
  { name: "JavaScript link", test: html.includes('src="/site.js"') || html.includes('src="site.js"') },
  { name: "Juba local context", test: html.includes("Juba") && html.includes("South Sudan") },
  { name: "Inquiry form", test: html.includes('id="inquiry-form"') }
];

let failed = 0;
for (const check of checks) {
  if (check.test) {
    console.log(`  ✓ ${check.name}`);
  } else {
    console.error(`  ✗ Test failed: ${check.name}`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`\n${failed} checks failed.`);
  process.exit(1);
}

console.log("\nAll verification tests passed successfully!");
