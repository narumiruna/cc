# Website Structure Record

This document records the current structure of the tutorial website so future updates can stay consistent.

## Scope

- Public tutorial pages only (`index.html` and `pages/*.html`)
- Shared styling and behavior assets under `assets/`
- Navigation and page-level structure contracts

## Directory Layout

- `index.html`: landing page and chapter index
- `pages/*.html`: chapter pages (one topic per page)
- `assets/site.css`: CSS entrypoint that imports layered style files
- `assets/styles/tokens.css`: design tokens, theme variables, base element defaults
- `assets/styles/layout.css`: shell, header, grid, main flow, responsive layout
- `assets/styles/components.css`: reusable UI components and content presentation styles
- `assets/site.js`: shared client behavior (top navigation rendering, active link, theme toggle, Mermaid loading)

## Page Structure Contract

Each page MUST follow this baseline structure:

1. `<body data-page="...">` with a stable page key (`home`, `01`, `02`, ...)
2. `.shell` as the page container
3. `.header` with title row and `.top-nav`
4. Main content area (`<main>` or section blocks depending on page role)
5. Shared script include (`assets/site.js` or `../assets/site.js`)

## Navigation Contract

- `.top-nav` is rendered from a single source of truth in `assets/site.js` (`NAV_ITEMS`).
- Individual HTML pages SHOULD keep an empty or placeholder `.top-nav` container rather than hardcoding links.
- Active state is derived from `body[data-page]` and applied by script.
- Path prefix is determined automatically:
  - landing page uses `index.html` / `pages/*`
  - chapter pages use `../index.html` / sibling chapter paths

## Styling Architecture

Styles are layered to keep responsibility boundaries explicit:

1. `tokens.css`: theme variables and global primitives
2. `layout.css`: page-level layout and responsive structure
3. `components.css`: cards, tables, code blocks, TOC, tags, and chapter UI elements

`assets/site.css` MUST stay a thin composition layer so style files can evolve independently.

## Maintenance Rules

- When adding a new chapter page:
  - assign a new `data-page` key,
  - add one `NAV_ITEMS` entry in `assets/site.js`,
  - follow the existing chapter template structure.
- Do not duplicate full navigation markup across pages.
- Keep website-structure updates in this file whenever layout contracts or shared asset boundaries change.
