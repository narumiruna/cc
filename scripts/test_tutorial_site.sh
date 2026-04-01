#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PAGES=(
  "pages/01-quickstart.html"
  "pages/02-runtime-entry.html"
  "pages/03-command-system.html"
  "pages/04-tool-system.html"
  "pages/05-query-engine.html"
  "pages/06-services-mcp.html"
  "pages/07-state-tasks.html"
  "pages/08-permissions-modes.html"
  "pages/09-memory-system.html"
  "pages/10-agent-and-extension.html"
)

required_sections=(
  "你會學到什麼"
  "關鍵程式片段（節錄）"
  "Pseudo Code（白話流程）"
  "流程拆解"
  "常見誤解"
  "5 分鐘練習"
  "自我檢查清單"
)

core_mermaid_pages=(
  "pages/02-runtime-entry.html"
  "pages/04-tool-system.html"
  "pages/05-query-engine.html"
  "pages/06-services-mcp.html"
  "pages/08-permissions-modes.html"
)

require_file() {
  local path="$1"
  if [[ ! -f "$path" ]]; then
    echo "Missing file: $path" >&2
    exit 1
  fi
}

require_text() {
  local path="$1"
  local text="$2"
  if ! rg -Fq "$text" "$path"; then
    echo "Missing text '$text' in $path" >&2
    exit 1
  fi
}

require_file "index.html"
require_file "assets/site.css"
require_file "assets/site.js"

for page in "${PAGES[@]}"; do
  require_file "$page"
  require_text "$page" "../assets/site.css"
  require_text "$page" "../assets/site.js"
  require_text "$page" "pager"
  if rg -Fq "先看哪幾個檔案" "$page"; then
    echo "Disallowed section '先看哪幾個檔案' in $page" >&2
    exit 1
  fi
  for section in "${required_sections[@]}"; do
    require_text "$page" "$section"
  done
done

for page in "${core_mermaid_pages[@]}"; do
  require_text "$page" "class=\"mermaid\""
done

for page in "${PAGES[@]}"; do
  require_text "index.html" "$page"
done

echo "Tutorial site checks passed."
