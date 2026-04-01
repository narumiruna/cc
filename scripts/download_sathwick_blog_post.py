# /// script
# requires-python = ">=3.14"
# dependencies = [
#     "httpx>=0.28.1",
#     "markdownify>=1.2.2",
# ]
# ///
from pathlib import Path

import httpx
from markdownify import markdownify as md


def main() -> None:
    resp = httpx.get("https://sathwick.xyz/blog/claude-code.html")
    resp.raise_for_status()

    markdown = md(resp.text)

    f = Path("raw/sathwick_claude-code.md")
    f.parent.mkdir(exist_ok=True)
    f.write_text(markdown, encoding="utf-8")


if __name__ == "__main__":
    main()
