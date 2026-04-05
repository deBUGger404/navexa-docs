export const SITE_URL = "https://debugger404.github.io/navexa-docs";
export const DEFAULT_IMAGE = `${SITE_URL}/image1.png`;
export const DEFAULT_DESCRIPTION =
  "Navexa Docs for installing, indexing, parsing, and retrieving structured document trees from PDFs.";

function buildStructuredData({ isOverview, title, description, canonicalUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": isOverview ? "WebPage" : "TechArticle",
    name: title,
    headline: title,
    description,
    url: canonicalUrl,
    image: DEFAULT_IMAGE,
    isPartOf: {
      "@type": "WebSite",
      name: "Navexa Docs",
      url: `${SITE_URL}/`,
    },
    about: [
      "PDF document processing",
      "Structured document trees",
      "RAG pipelines",
      "Reasoning retrieval",
    ],
    ...(isOverview
      ? {}
      : {
          mainEntityOfPage: canonicalUrl,
        }),
  };
}

export function buildPageMeta(section) {
  const isOverview = section.id === "overview";
  const path = isOverview ? "/docs/overview" : `/docs/${section.id}`;
  const title = isOverview
    ? "Navexa Docs | PDF Document Processing Library"
    : `${section.title} | Navexa Docs`;
  const description = section.description || DEFAULT_DESCRIPTION;
  const type = isOverview ? "website" : "article";
  const canonicalUrl = new URL(path.replace(/^\//, ""), `${SITE_URL}/`).toString();

  return {
    title,
    description,
    path,
    type,
    image: DEFAULT_IMAGE,
    canonicalUrl,
    structuredData: buildStructuredData({
      isOverview,
      title,
      description,
      canonicalUrl,
    }),
  };
}

export function getSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Navexa Docs",
        url: `${SITE_URL}/`,
        description:
          "Documentation for Navexa covering PDF document processing, structured indexing, reasoning retrieval, parser configuration, transcript workflows, and grounded RAG pipelines.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Navexa",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        url: `${SITE_URL}/`,
        description:
          "Navexa is a PDF document processing library for building structured document trees, hierarchy-aware retrieval workflows, and grounded RAG pipelines.",
        sameAs: [
          "https://github.com/deBUGger404/navexa",
          "https://pypi.org/project/navexa/",
        ],
      },
    ],
  };
}
