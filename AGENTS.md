# Repository Guidelines

## Project Structure & Module Organization
This repository is documentation-first with a supporting TypeScript code tree.

- `src/`: main runtime and feature implementation (CLI, tools, services, UI components, and shared utilities).
- `scripts/`: utility automation scripts (for example, article ingestion helpers).
- `raw/`: archived or source material used to derive maintained documentation.
- `docs/*.md`: governance and architecture references (modes, memory, design, structure).

Keep each document focused on one responsibility. Do not mix policy, architecture, and walkthrough content in the same file.

## Build, Test, and Development Commands
Use lightweight commands to keep changes scoped and verifiable.

- `git status`: check modified files before and after edits.
- `rg "<keyword>" docs/*.md`: locate terms quickly across documentation.
- `wc -w AGENTS.md`: confirm contributor-guide length targets.
- `uv run scripts/download_sathwick_blog_post.py`: refresh the raw source article used by this repo.

Only document commands that are valid in this repository today.

## Coding Style & Naming Conventions
Write all documentation in clear, standard English with concise, enforceable wording (`MUST`, `SHOULD`, `MUST NOT`) where rules are required.

- The web pages (`index.html` and `pages/*.html`) MUST be written in 台灣正體中文 (Traditional Chinese as used in Taiwan).
- Prefer short, descriptive headings.
- Use purpose-driven file names such as `MEMORY_MECHANISM.md`.
- Keep boundaries explicit: one file, one primary purpose.
- Avoid duplicating foundational rules across multiple documents.

## Testing & Validation Guidelines
For documentation-focused changes, validation is consistency-first:

- check for conflicts with related policy/design documents;
- ensure examples and command snippets are runnable as written;
- verify terminology stays consistent across files.

If future tasks add code or config, run project quality gates required by repository policy.

## Commit & Pull Request Guidelines
Follow existing history patterns with imperative, scoped messages (for example, `refactor: refine repository guidelines`).

- Keep one logical concern per commit.
- In PR descriptions, include: what changed, why it was needed, and how consistency was validated.
- Link related issues when applicable, and include screenshots only for UI-affecting changes.

## Gotcha

- `docs/GOTCHA.md` MUST NOT be assumed to be auto-loaded.
- The agent MUST first look for `docs/GOTCHA.md` (case-sensitive).
- If a GOTCHA file exists, the agent MUST read relevant entries and explicitly apply them in diagnosis and proposed fixes.
- If the agent makes a mistake during the task, the agent MUST create `docs/GOTCHA.md` first when it does not exist, then add or update a `docs/GOTCHA.md` entry in the same session; the entry MUST describe only **non-obvious, experience-derived pitfalls** that required debugging to understand.

## Taste

- `docs/TASTE.md` MUST NOT be assumed to be auto-loaded.
- The agent MUST first look for `docs/TASTE.md` (case-sensitive).
- If a TASTE file exists, the agent MUST read relevant entries and explicitly apply them in recommendations and implementations.
- If the user requests a preference that the agent did not anticipate, the agent MUST update `docs/TASTE.md` in the same turn.
- If an update to `docs/TASTE.md` is required and the file does not exist, the agent MUST create `docs/TASTE.md` first.
- Each `docs/TASTE.md` entry MUST capture exactly one reusable preference signal.
