(function () {
  var NAV_ITEMS = [
    { page: 'home', label: '首頁', href: 'index.html' },
    { page: '01', label: '快速起步', href: 'pages/quickstart.html' },
    { page: '02', label: '啟動流程', href: 'pages/runtime-entry.html' },
    { page: '03', label: '指令系統', href: 'pages/command-system.html' },
    { page: '04', label: '工具系統', href: 'pages/tool-system.html' },
    { page: '05', label: '回合引擎', href: 'pages/query-engine.html' },
    { page: '06', label: '服務與 MCP', href: 'pages/services-mcp.html' },
    { page: '07', label: '狀態與任務', href: 'pages/state-tasks.html' },
    { page: '08', label: '模式與權限', href: 'pages/permissions-modes.html' },
    { page: '09', label: '記憶系統', href: 'pages/memory-system.html' },
    { page: '10', label: '代理與擴充', href: 'pages/agent-and-extension.html' },
    { page: '11', label: '提示系統', href: 'pages/prompt-system.html' },
    { page: '12', label: 'Hooks 與自動化', href: 'pages/hooks-automation.html' },
    { page: '13', label: '終端 UI', href: 'pages/terminal-ui.html' },
    { page: '14', label: '未開放功能', href: 'pages/unreleased-features.html' }
  ];

  function renderTopNav() {
    var nav = document.querySelector('.top-nav');
    if (!nav) {
      return;
    }

    var current = document.body.getAttribute('data-page');
    var prefix = current === 'home' ? '' : '../';
    nav.innerHTML = NAV_ITEMS.map(function (item) {
      var cls = item.page === current ? ' class="active"' : '';
      return '<a data-page="' + item.page + '" href="' + prefix + item.href + '"' + cls + '>' + item.label + '</a>';
    }).join('');
  }

  renderTopNav();

  /* ── Theme toggle ── */
  var saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    function updateIcon() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.textContent = isDark ? '☀️' : '🌙';
      btn.setAttribute('aria-label', isDark ? '切換淺色模式' : '切換深色模式');
    }
    updateIcon();
    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon();
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        updateIcon();
      }
    });
  }

  /* ── Mermaid ── */
  if (!document.querySelector('.mermaid')) {
    return;
  }

  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
  script.async = true;
  script.onload = function () {
    if (window.mermaid) {
      window.mermaid.initialize({ startOnLoad: true, securityLevel: 'loose' });
    }
  };
  document.head.appendChild(script);
})();
