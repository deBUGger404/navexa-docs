# Navexa Docs

OpenAI-inspired documentation UI for the Navexa library, implemented with React + Vite.

## Features

- Multipage docs routes (`/docs/:slug`)
- Full-height 3-column docs layout (left nav, content, right TOC)
- Sticky and collapsible sidebar with mobile drawer
- Active "On this page" heading tracking while scrolling
- Global `Ctrl/Cmd + K` search modal with fuzzy matching
- Bottom-only next/previous pager (appears near page bottom)
- Student-friendly page structure for each topic
- Public product imagery cards on overview

## Run locally

```bash
cd /home/rakesh/ds_project/navexa-doc
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Routes

- `/` -> redirects to `/docs/overview`
- `/docs/:slug` -> one page per docs section
- `*` -> redirects to `/docs/overview`

## Project structure

- `src/content/navexaDocs.js`
  - source-of-truth for page metadata/content
  - page order controls next/previous flow
- `src/components`
  - layout, sidebar, TOC rail, search, pager, code block
- `src/pages/DocsPage.jsx`
  - renders one docs page from content model
- `src/hooks/useBottomSentinel.js`
  - toggles pager visibility near bottom
- `src/styles.css`
  - complete visual system and responsive layout

## Add a new docs page

1. Add a new section object in `src/content/navexaDocs.js` with:
- `id`, `category`, `title`, `description`
- `whatYouBuild`, `prerequisites`, `steps`
- `whyThisMatters`, `commonMistakes`, `tryIt`, `nextSteps`

2. Keep `id` URL-safe and unique.

3. Place the section in the correct array order.
- This automatically updates sidebar ordering and next/previous navigation.

4. Add focused, small code snippets in `steps[].code`.

5. Run and verify:

```bash
npm run dev
```

## Search behavior

Search indexes all docs pages from `src/content/navexaDocs.js` and matches by:
- title
- description
- headings
- category
- full page text fields

Open search with:
- `Ctrl + K` (Windows/Linux)
- `Cmd + K` (macOS)

## Writing standard

See `STYLE_GUIDE.md` for the student-friendly writing contract used by this docs site.
