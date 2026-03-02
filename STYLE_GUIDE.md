# Navexa Docs Style Guide

This guide defines how to write docs pages in this project so they remain clear for students and practical for engineers.

## 1) Audience and tone

- Primary audience: students and early-career developers.
- Use direct, simple language.
- Avoid unexplained jargon and long paragraphs.
- Explain why each step exists, not only what to type.

## 2) Required page structure

Every page should include these sections (in order):

1. What you'll build
2. Prerequisites
3. Step-by-step
4. Why this matters
5. Common mistakes
6. Try it
7. Next steps

## 3) Step-by-step writing rules

- Keep steps short and action-oriented.
- One clear goal per step.
- Prefer 5-20 line snippets over full-file dumps.
- Place code inside the specific step it supports.
- Use absolute paths in examples when path confusion is likely.

## 4) Code snippet standards

- Snippets must be runnable with minimal edits.
- Use realistic values and placeholders (e.g. `/absolute/path/file.pdf`).
- Show expected output/checks when useful.
- Keep variable names descriptive and stable across steps.

## 5) "Why this matters" standards

- Connect the action to reliability, cost, quality, or maintainability.
- Use concrete outcomes.
- Avoid generic motivation text.

## 6) Common mistakes standards

Each mistake entry must include:
- the mistake (short, specific)
- the fix (one clear corrective action)

## 7) Try-it tasks

- Give 2-3 hands-on checks.
- Tasks should verify understanding, not repeat copy/paste.
- Encourage comparison runs (e.g. `no-llm` vs `llm`).

## 8) Links and references

- Link only to high-signal references.
- Prefer official docs and source repositories.
- Avoid link spam.

## 9) Content maintenance

When APIs change:
- update snippet first,
- then update explanation,
- then update related troubleshooting notes.

## 10) Visual consistency

- Keep headings concise.
- Keep bullet lists flat and scannable.
- Keep examples and callouts consistent across pages.
