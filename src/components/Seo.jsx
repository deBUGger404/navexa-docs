import { useEffect } from "react";
import { DEFAULT_IMAGE, SITE_URL } from "../lib/seo";

function upsertMeta(selector, attributes, content) {
  let meta = document.head.querySelector(selector);
  if (!meta) {
    meta = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => meta.setAttribute(key, value));
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function upsertStructuredData(structuredData) {
  const existing = document.head.querySelector('script[data-seo="structured-data"]');

  if (!structuredData) {
    if (existing) existing.remove();
    return;
  }

  const script = existing || document.createElement("script");
  script.setAttribute("type", "application/ld+json");
  script.setAttribute("data-seo", "structured-data");
  script.textContent = JSON.stringify(structuredData);

  if (!existing) {
    document.head.appendChild(script);
  }
}

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index, follow",
  structuredData,
}) {
  useEffect(() => {
    const canonicalUrl = new URL(path.replace(/^\//, ""), `${SITE_URL}/`).toString();

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[name="robots"]', { name: "robots" }, robots);
    upsertMeta(
      'meta[name="googlebot"]',
      { name: "googlebot" },
      `${robots}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
    );
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, type);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, image);
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, "Navexa Docs");
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, image);
    upsertLink("canonical", canonicalUrl);
    upsertStructuredData(structuredData);
  }, [description, image, path, robots, structuredData, title, type]);

  return null;
}
