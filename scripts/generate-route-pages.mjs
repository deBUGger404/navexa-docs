import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getFirstChildSection, sections } from "../src/content/navexaDocs.js";
import { buildPageMeta, DEFAULT_IMAGE, getSiteStructuredData, SITE_URL } from "../src/lib/seo.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");
const distDir = join(repoRoot, "dist");
const newline = String.fromCharCode(10);
const baseHtml = await readFile(join(distDir, "index.html"), "utf8");
const assetLines = baseHtml
  .split(newline)
  .map((line) => line.trim())
  .filter((line) => line.includes('/navexa-docs/assets/'));

const siteStructuredData = getSiteStructuredData();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRoutePage(meta) {
  const lines = [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `    <title>${escapeHtml(meta.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(meta.description)}" />`,
    '    <meta name="robots" content="index, follow" />',
    '    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    `    <link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />`,
    `    <link rel="icon" type="image/x-icon" href="${SITE_URL}/favicon.ico" />`,
    `    <meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `    <meta property="og:type" content="${escapeHtml(meta.type)}" />`,
    `    <meta property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />`,
    '    <meta property="og:site_name" content="Navexa Docs" />',
    `    <meta property="og:image" content="${DEFAULT_IMAGE}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `    <meta name="twitter:image" content="${DEFAULT_IMAGE}" />`,
    `    <script type="application/ld+json">${JSON.stringify(siteStructuredData)}</script>`,
    `    <script type="application/ld+json">${JSON.stringify(meta.structuredData)}</script>`,
    ...assetLines.map((line) => `    ${line}`),
    '  </head>',
    '  <body>',
    '    <noscript>',
    '      <main>',
    `        <h1>${escapeHtml(meta.title)}</h1>`,
    `        <p>${escapeHtml(meta.description)}</p>`,
    '      </main>',
    '    </noscript>',
    '    <div id="root"></div>',
    '  </body>',
    '</html>',
    '',
  ];

  return lines.join(newline);
}

const routeEntries = [];
const overviewSection = sections.find((section) => section.id === "overview");
if (overviewSection) {
  routeEntries.push({ outputSegments: ["docs"], meta: buildPageMeta(overviewSection) });
}

for (const section of sections) {
  if (section.groupOnly) {
    const firstChild = getFirstChildSection(section.id);
    if (!firstChild) continue;
    routeEntries.push({
      outputSegments: ["docs", section.id],
      meta: buildPageMeta(firstChild),
    });
    continue;
  }

  routeEntries.push({
    outputSegments: ["docs", section.id],
    meta: buildPageMeta(section),
  });
}

for (const entry of routeEntries) {
  const outputDir = join(distDir, ...entry.outputSegments);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), renderRoutePage(entry.meta), "utf8");
}

console.log(`Generated ${routeEntries.length} static route pages.`);
