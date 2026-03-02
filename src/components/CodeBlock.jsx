import { Check, Copy } from "../lib/icons";
import { useMemo, useState } from "react";

const PYTHON_KEYWORDS = new Set([
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "False",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "None",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "True",
  "try",
  "while",
  "with",
  "yield"
]);

const PYTHON_BUILTINS = new Set([
  "print",
  "str",
  "int",
  "float",
  "dict",
  "list",
  "set",
  "tuple",
  "len",
  "range",
  "enumerate"
]);

const BASH_KEYWORDS = new Set([
  "if",
  "then",
  "else",
  "fi",
  "for",
  "do",
  "done",
  "case",
  "esac",
  "while",
  "in",
  "function",
  "export"
]);

const BASH_COMMANDS = new Set([
  "curl",
  "python",
  "python3",
  "pip",
  "pip3",
  "npm",
  "yarn",
  "pnpm",
  "node",
  "echo",
  "cat",
  "cd",
  "ls",
  "mkdir",
  "rm",
  "cp",
  "mv",
  "grep",
  "rg",
  "sed",
  "awk",
  "chmod",
  "chown",
  "source",
  "export",
  "env",
  "git",
  "navexa-index"
]);

function normalizeLanguage(language) {
  const raw = String(language || "").trim().toLowerCase();
  if (!raw) return "text";
  if (raw === "py") return "python";
  if (raw === "sh" || raw === "shell") return "bash";
  if (raw === "yml") return "yaml";
  return raw;
}

function tokenType(token, language, context = {}) {
  if (!token) return "plain";

  if (token.startsWith("#") || token.startsWith("//")) return "comment";
  if (token.startsWith("\"") || token.startsWith("'") || token.startsWith("`")) return "string";
  if (/^\d+(\.\d+)?$/.test(token)) return "number";
  if (language === "bash" && (/^\$[A-Za-z_][A-Za-z0-9_]*$/.test(token) || /^\$\{[^}]+\}$/.test(token))) {
    return "variable";
  }
  if (language === "bash" && /^--?[A-Za-z0-9_-]+$/.test(token)) return "option";
  if (language === "python" && /^@[A-Za-z_][A-Za-z0-9_]*$/.test(token)) return "builtin";

  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(token)) {
    if (language === "python") {
      if (context.prevWord === "def") return "function";
      if (PYTHON_KEYWORDS.has(token)) return "keyword";
      if (PYTHON_BUILTINS.has(token)) return "builtin";
      if (token === "self" || token === "cls") return "variable";
    }
    if (language === "bash") {
      if (BASH_KEYWORDS.has(token)) return "keyword";
      if (context.wordIndex === 0 || BASH_COMMANDS.has(token)) return "builtin";
    }
    if (language === "json" && ["true", "false", "null"].includes(token)) return "keyword";
  }

  if (/^[{}()[\].,:=+\-*/<>|!]+$/.test(token)) return "operator";
  return "plain";
}

function tokenizeLine(line, language) {
  const regex =
    /(\"(?:\\.|[^\"\\])*\"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|#.*$|\/\/.*$|\$[A-Za-z_][A-Za-z0-9_]*|\$\{[^}]+\}|--?[A-Za-z0-9_-]+|@[A-Za-z_][A-Za-z0-9_]*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|[{}()[\].,:=+\-*/<>|!]+)/g;
  const out = [];
  let lastIndex = 0;
  let match;
  let prevWord = "";
  let wordIndex = 0;

  while ((match = regex.exec(line)) !== null) {
    const start = match.index;
    const value = match[0];

    if (start > lastIndex) {
      out.push({ value: line.slice(lastIndex, start), type: "plain" });
    }

    const type = tokenType(value, language, { prevWord, wordIndex });
    out.push({ value, type });

    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) {
      prevWord = value;
      wordIndex += 1;
    } else if (/^\$[A-Za-z_][A-Za-z0-9_]*$/.test(value) || /^\$\{[^}]+\}$/.test(value)) {
      wordIndex += 1;
    }

    lastIndex = start + value.length;
  }

  if (lastIndex < line.length) {
    out.push({ value: line.slice(lastIndex), type: "plain" });
  }

  if (!out.length) {
    out.push({ value: " ", type: "plain" });
  }

  return out;
}

export default function CodeBlock({ title, language, code }) {
  const [copied, setCopied] = useState(false);
  const normalizedLanguage = normalizeLanguage(language);
  const lines = useMemo(() => String(code || "").replace(/\t/g, "  ").split("\n"), [code]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(code || ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (_err) {
      setCopied(false);
    }
  };

  return (
    <div className={`code-block lang-${normalizedLanguage}`}>
      <div className="code-head">
        <span>{title}</span>
        <div className="code-actions">
          <span className="code-lang">{normalizedLanguage}</span>
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            title={copied ? "Copied" : "Copy code"}
          >
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className="code-body" role="region" aria-label={`${title} code block`}>
        {lines.map((line, lineIndex) => (
          <div className="code-line" key={`${title}-${lineIndex}`}>
            <span className="code-line-no">{lineIndex + 1}</span>
            <span className="code-line-content">
              {tokenizeLine(line, normalizedLanguage).map((token, tokenIndex) => (
                <span key={`${lineIndex}-${tokenIndex}`} className={`tok tok-${token.type}`}>
                  {token.value}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
