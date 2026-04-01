# Website Structure Record

This document records the current structure of the tutorial website so future updates can stay consistent.

## Scope

- Public tutorial pages only (`index.html` and `pages/*.html`)
- Shared styling and behavior assets under `assets/`
- Navigation and page-level structure contracts

## Directory Layout

- `index.html`: landing page and chapter index
- `pages/*.html`: chapter pages (one topic per page)
- Current chapter set includes `pages/architecture-overview.html` as the architecture overview tab.
- Current chapter set includes `pages/unreleased-features.html` as the "source-code radar" page for potentially unreleased capabilities.
- Current chapter set includes `pages/commands-catalog.html` for the built-in command catalog.
- Current chapter set includes `pages/tools-catalog.html` for the built-in tool catalog.
- Current chapter set includes `pages/ops-cheatsheet.html` for one-line command/tool purpose and risk lookup.
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

## Chapter Page Template Checklist

Every new file under `pages/*.html` SHOULD include the following blocks in order:

1. `<header class="header">` with title, subtitle, `.top-nav`, and `.toc-local`
2. `<main>` containing chapter sections by progressive depth:
   - `#tldr` (L1/L2 summary)
   - `#runtime-path` (execution path and flow)
   - `#decisions` (design decisions)
   - `#tradeoffs` (alternatives and tradeoffs)
   - `#failure-modes` (failure paths and protections)
   - `#implementation` (validation checklist)
3. `<div class="pager">` for previous/next page navigation
4. Shared script include with the correct relative path

## Progressive Depth Contract

Tutorial pages MUST preserve progressive depth progression.

- L1 MUST prioritize quick orientation and vocabulary.
- L2 MUST explain executable paths, state transitions, and practical reasoning.
- L3 MUST focus on tradeoffs, boundary conditions, and failure analysis.
- New content SHOULD not jump directly into L3 topics before L1 framing appears on the same page.

## Asset and Path Rules

- Root page uses `assets/*` paths.
- Chapter pages use `../assets/*` paths.
- `site.js` is the only place allowed to own global nav link paths.
- Component-level styling MUST be added in `assets/styles/components.css` unless it changes global layout or token definitions.

## Verification Checklist for Website Structure Changes

When changing structure, verify at minimum:

1. `body[data-page]` exists and maps to one `NAV_ITEMS` entry.
2. `.top-nav` renders expected links on both `index.html` and `pages/*.html`.
3. Active nav state matches the current page key.
4. Code blocks keep readable foreground/background contrast.
5. Mobile layout (<= 760px) collapses grids without overflow.
6. Mermaid diagrams still load only when `.mermaid` exists.

## Documentation Update Policy

- Structural changes to navigation, page contracts, or style layering MUST update this file in the same change set.
- If a change updates repository-wide architecture documentation, keep `docs/CODEBASE_STRUCTURE.md` aligned by adding or updating the website-reference section.
