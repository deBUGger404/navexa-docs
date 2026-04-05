import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { sections } from "../src/content/navexaDocs.js";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(scriptDir, "..");
const siteUrl = "https://debugger404.github.io/navexa-docs";
const lastmod = new Date().toISOString().slice(0, 10);
const newline = String.fromCharCode(10);

const urls = sections
  .filter((section) => !section.groupOnly)
  .map((section) => `${siteUrl}/docs/${section.id}`);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.flatMap((url) => [
    '  <url>',
    `    <loc>${url}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${url.endsWith("/docs/overview") ? "1.0" : "0.8"}</priority>`,
    '  </url>',
  ]),
  '</urlset>',
  '',
].join(newline);

await writeFile(join(repoRoot, "public", "sitemap.xml"), xml, "utf8");
console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
