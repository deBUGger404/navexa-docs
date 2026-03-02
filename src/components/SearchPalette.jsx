import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchDocuments } from "../content/navexaDocs";
import { fuzzySearchDocuments } from "../lib/fuzzySearch";
import { ArrowUpDown, CornerDownLeft, FileText, Hash, Search, Sparkles, X } from "../lib/icons";

function snippetFromMatch(matchValue, fallback) {
  const normalized = String(matchValue || fallback || "")
    .replace(/\s+/g, " ")
    .trim();
  if (normalized.length <= 120) return normalized;
  return `${normalized.slice(0, 117)}...`;
}

export default function SearchPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const docs = useMemo(() => getSearchDocuments(), []);

  const results = useMemo(() => {
    const ranked = fuzzySearchDocuments(docs, query, 14);
    return ranked.map((result) => ({
      id: result.item.id,
      title: result.item.title,
      category: result.item.category,
      snippet: snippetFromMatch(result.matchValue, result.item.description),
      score: result.score
    }));
  }, [docs, query]);

  const groupedResults = useMemo(() => {
    const groups = new Map();
    for (const result of results) {
      if (!groups.has(result.category)) {
        groups.set(result.category, []);
      }
      groups.get(result.category).push(result);
    }
    return Array.from(groups.entries());
  }, [results]);

  useEffect(() => {
    if (!open) return undefined;

    setQuery("");
    setSelectedIndex(0);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!results.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selected = results[selectedIndex];
        if (!selected) return;
        navigate(`/docs/${selected.id}`);
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, onClose, open, results, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search documentation">
      <button className="search-overlay-backdrop" type="button" onClick={onClose} aria-label="Close search" />

      <section className="search-panel">
        <header className="search-panel-head">
          <h2>
            <Sparkles size={16} aria-hidden="true" />
            Search Navexa docs
          </h2>
          <button type="button" className="search-close-btn" onClick={onClose}>
            <X size={15} aria-hidden="true" />
            Close
          </button>
        </header>

        <label className="search-input-wrap" htmlFor="docs-search-input">
          <Search size={16} aria-hidden="true" />
          <input
            id="docs-search-input"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, topics, and APIs"
          />
        </label>

        <div className="search-results" role="listbox" aria-label="Search results">
          {groupedResults.length === 0 ? (
            <div className="search-empty">No results found.</div>
          ) : (
            groupedResults.map(([category, items]) => (
              <div key={category} className="search-group">
                <div className="search-group-title">{category}</div>
                <div className="search-group-list">
                  {items.map((item) => {
                    runningIndex += 1;
                    const isActive = runningIndex === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        className={`search-item ${isActive ? "is-active" : ""}`}
                        role="option"
                        aria-selected={isActive}
                        type="button"
                        onMouseEnter={() => setSelectedIndex(runningIndex)}
                        onClick={() => {
                          navigate(`/docs/${item.id}`);
                          onClose();
                        }}
                      >
                        <div className="search-item-head">
                          <span className="search-item-title">
                            <FileText size={14} aria-hidden="true" />
                            {item.title}
                          </span>
                          <span className="search-item-meta">
                            <Hash size={12} aria-hidden="true" />
                            {item.id}
                          </span>
                        </div>
                        <p>{item.snippet}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="search-panel-foot">
          <span>
            <ArrowUpDown size={14} aria-hidden="true" />
            Navigate
          </span>
          <span>
            <CornerDownLeft size={14} aria-hidden="true" />
            Open page
          </span>
          <span>
            <kbd>Esc</kbd> Close
          </span>
        </footer>
      </section>
    </div>
  );
}
