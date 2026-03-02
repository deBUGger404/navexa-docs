function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreText(text, query) {
  if (!text || !query) return Number.POSITIVE_INFINITY;
  const normalizedText = normalize(text);
  const normalizedQuery = normalize(query);

  if (!normalizedText || !normalizedQuery) return Number.POSITIVE_INFINITY;

  const wholeIndex = normalizedText.indexOf(normalizedQuery);
  if (wholeIndex >= 0) {
    return wholeIndex * 0.2;
  }

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);
  if (!queryTokens.length) return Number.POSITIVE_INFINITY;

  let matchedCount = 0;
  let positionPenalty = 0;

  for (const token of queryTokens) {
    const tokenIndex = normalizedText.indexOf(token);
    if (tokenIndex >= 0) {
      matchedCount += 1;
      positionPenalty += tokenIndex;
    }
  }

  if (!matchedCount) return Number.POSITIVE_INFINITY;

  const coverage = matchedCount / queryTokens.length;
  const missingPenalty = (1 - coverage) * 100;
  return missingPenalty + positionPenalty / Math.max(1, matchedCount);
}

export function fuzzySearchDocuments(documents, query, limit = 14) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return documents.slice(0, limit).map((doc) => ({
      item: doc,
      score: 0,
      matchValue: doc.description || doc.title || ""
    }));
  }

  const ranked = [];

  for (const doc of documents) {
    const pool = [
      doc.title,
      doc.description,
      doc.category,
      ...(doc.headings || []),
      doc.text
    ];

    let bestScore = Number.POSITIVE_INFINITY;
    let bestValue = "";

    for (const value of pool) {
      const current = scoreText(value, normalizedQuery);
      if (current < bestScore) {
        bestScore = current;
        bestValue = value || "";
      }
    }

    if (Number.isFinite(bestScore)) {
      ranked.push({
        item: doc,
        score: bestScore,
        matchValue: bestValue
      });
    }
  }

  ranked.sort((a, b) => a.score - b.score);
  return ranked.slice(0, limit);
}
