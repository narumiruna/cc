# Claude Code 初學者架構教學

A multi-depth tutorial site for the internal architecture of [Claude Code](https://claude.ai/code), written in Traditional Chinese (台灣正體中文).

## Live Site

Visit the tutorial at **https://narumiruna.github.io/cc/**

## Overview

This site walks through Claude Code's architecture through grouped modules and topic chapters, each following a consistent six-section template:

| Section | Purpose |
|---|---|
| **90 秒總覽** | One-paragraph overview to build a mental model quickly |
| **執行路徑** | Flowcharts and pseudocode tracing the core logic |
| **關鍵決策** | Key branch points and design choices in the source code |
| **替代方案取捨** | Trade-off analysis between design alternatives |
| **失敗路徑** | Common error scenarios and recovery mechanisms |
| **實作驗證** | Actionable checklists to verify understanding |

Content is written for progressive depth: start from fundamentals, then execution paths, then trade-offs and failure modes.

## Chapters

| # | Title | Topic |
|---|---|---|
| 1 | 快速起步 | Bird's-eye view of core modules and their relationships |
| 2 | 啟動流程 | CLI entry point to interactive mode boot sequence |
| 3 | 指令系統 | Slash command registration, parsing, and dispatch |
| 18 | Skills 機制（Special Topic） | Skill loading, discovery, invocation paths, and permission boundaries |
| 4 | 工具系統 | Tool contract, assembly, and permission gating |
| 5 | 回合引擎 | Full turn lifecycle from submit to completion |
| 6 | 服務與 MCP | External service integration via Model Context Protocol |
| 7 | 狀態與任務 | State machine patterns and task queue management |
| 8 | 模式與權限 | Permission modes and tool-call security decisions |
| 9 | 記憶系統 | Session, Durable, and Team memory layers |
| 10 | 代理與擴充 | Sub-agent delegation and MCP extension loading |

## Repository Structure

```
.
├── index.html           # Home page and chapter navigation hub
├── pages/               # Chapter pages (including the Skills mechanism chapter)
├── assets/
│   ├── site.css         # Shared stylesheet
│   └── site.js          # Shared scripts (depth-tab toggling, Mermaid, etc.)
├── docs/                # Governance and architecture reference documents
├── src/                 # TypeScript source used as reference material
├── scripts/             # Utility automation scripts
└── raw/                 # Archived source articles
```

## Contributing

1. Web pages (`index.html` and `pages/*.html`) MUST be written in **台灣正體中文**.
2. Markdown documents in `docs/` are written in English.
3. Keep each file focused on one responsibility; avoid duplicating content across files.
4. Follow commit message conventions: `<type>: <short description>` (e.g., `docs: add failure-path examples to chapter 5`).

See [AGENTS.md](AGENTS.md) for full contributor guidelines.
