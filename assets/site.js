(function () {
  var NAV_ITEMS = [
    { page: 'home', label: '首頁', href: 'index.html' },
    { page: 'g00', label: '架構總覽', href: 'pages/group-architecture.html' },
    { page: 'g01', label: '啟動流程', href: 'pages/group-startup.html' },
    { page: 'g02', label: '指令系統', href: 'pages/group-command-system.html' },
    { page: 'g03', label: '工具系統', href: 'pages/group-tool-system.html' },
    { page: 'g04', label: '回合引擎', href: 'pages/group-query-engine.html' },
    { page: 'g05', label: 'MCP 與服務', href: 'pages/group-services-mcp.html' },
    { page: 'g06', label: '狀態與任務', href: 'pages/group-state-tasks.html' },
    { page: 'g07', label: '模式與權限', href: 'pages/group-permissions-modes.html' },
    { page: 'g08', label: '記憶系統', href: 'pages/group-memory-system.html' },
    { page: 'g09', label: '代理與擴充', href: 'pages/group-agent-extension.html' },
    { page: 'g10', label: '提示系統', href: 'pages/group-prompt-system.html' },
    { page: 'g11', label: 'Hooks 與自動化', href: 'pages/group-hooks-automation.html' },
    { page: 'g12', label: '終端 UI', href: 'pages/group-terminal-ui.html' },
    { page: 'g13', label: '雷達與觀測', href: 'pages/group-radar.html' }
  ];

  var GROUP_TO_CHILDREN = {
    g00: ['00'],
    g01: ['01', '02'],
    g02: ['03', '15'],
    g03: ['04', '16', '17'],
    g04: ['05'],
    g05: ['06'],
    g06: ['07'],
    g07: ['08'],
    g08: ['09'],
    g09: ['10'],
    g10: ['11'],
    g11: ['12'],
    g12: ['13'],
    g13: ['14']
  };

  var CHILD_TO_GROUP = {
    '00': 'g00',
    '01': 'g01',
    '02': 'g01',
    '03': 'g02',
    '15': 'g02',
    '04': 'g03',
    '16': 'g03',
    '17': 'g03',
    '05': 'g04',
    '06': 'g05',
    '07': 'g06',
    '08': 'g07',
    '09': 'g08',
    '10': 'g09',
    '11': 'g10',
    '12': 'g11',
    '13': 'g12',
    '14': 'g13'
  };

  var PAGE_META = {
    '00': { label: '架構總覽', href: 'pages/architecture-overview.html' },
    '01': { label: '快速起步', href: 'pages/quickstart.html' },
    '02': { label: '啟動流程', href: 'pages/runtime-entry.html' },
    '03': { label: '指令系統', href: 'pages/command-system.html' },
    '04': { label: '工具系統：能力怎麼被公開', href: 'pages/tool-system.html' },
    '05': { label: '回合引擎', href: 'pages/query-engine.html' },
    '06': { label: 'MCP 與服務', href: 'pages/services-mcp.html' },
    '07': { label: '狀態與任務', href: 'pages/state-tasks.html' },
    '08': { label: '模式與權限', href: 'pages/permissions-modes.html' },
    '09': { label: '記憶系統', href: 'pages/memory-system.html' },
    '10': { label: '代理與擴充', href: 'pages/agent-and-extension.html' },
    '11': { label: '提示系統', href: 'pages/prompt-system.html' },
    '12': { label: 'Hooks 與自動化', href: 'pages/hooks-automation.html' },
    '13': { label: '終端 UI', href: 'pages/terminal-ui.html' },
    '14': { label: '未開放功能雷達', href: 'pages/unreleased-features.html' },
    '15': { label: '內建 Commands', href: 'pages/commands-catalog.html' },
    '16': { label: '內建 Tools', href: 'pages/tools-catalog.html' },
    '17': { label: '操作速查表', href: 'pages/ops-cheatsheet.html' }
  };

  function getCurrentPage() {
    return document.body.getAttribute('data-page');
  }

  function getNavActivePage(current) {
    if (current === 'home') {
      return 'home';
    }
    if (current && current.indexOf('g') === 0) {
      return current;
    }
    return CHILD_TO_GROUP[current] || current;
  }

  function getPrefix(current) {
    return current === 'home' ? '' : '../';
  }

  function renderTopNav() {
    var nav = document.querySelector('.top-nav');
    if (!nav) {
      return;
    }

    var current = getCurrentPage();
    var active = getNavActivePage(current);
    var prefix = getPrefix(current);
    nav.innerHTML = NAV_ITEMS.map(function (item) {
      var cls = item.page === active ? ' class="active"' : '';
      return '<a data-page="' + item.page + '" href="' + prefix + item.href + '"' + cls + '>' + item.label + '</a>';
    }).join('');
  }

  function renderBreadcrumb() {
    var current = getCurrentPage();
    var header;
    var toc;
    if (!current || current === 'home' || current.indexOf('g') === 0) {
      return;
    }

    var container = document.querySelector('.breadcrumb');
    if (!container) {
      header = document.querySelector('.header');
      if (!header) {
        return;
      }
      container = document.createElement('nav');
      container.className = 'breadcrumb';
      container.setAttribute('aria-label', '麵包屑導覽');
      toc = header.querySelector('.toc-local');
      if (toc) {
        header.insertBefore(container, toc);
      } else {
        header.appendChild(container);
      }
    }

    var groupKey = CHILD_TO_GROUP[current];
    var groupMeta = NAV_ITEMS.find(function (item) {
      return item.page === groupKey;
    });
    var pageMeta = PAGE_META[current];

    if (!groupMeta || !pageMeta) {
      return;
    }

    container.innerHTML = [
      '<a href="../index.html">首頁</a>',
      '<span class="breadcrumb-sep">/</span>',
      '<a href="../' + groupMeta.href + '">' + groupMeta.label + '</a>',
      '<span class="breadcrumb-sep">/</span>',
      '<span class="current">' + pageMeta.label + '</span>'
    ].join('');
  }

  function renderPager() {
    var current = getCurrentPage();
    var prevMeta;
    var nextMeta;
    if (!current || current === 'home' || current.indexOf('g') === 0) {
      return;
    }

    var pager = document.querySelector('.pager');
    if (!pager) {
      return;
    }

    var groupKey = CHILD_TO_GROUP[current];
    var groupMeta = NAV_ITEMS.find(function (item) {
      return item.page === groupKey;
    });
    var siblings = GROUP_TO_CHILDREN[groupKey] || [];
    var index = siblings.indexOf(current);

    if (!groupMeta || index < 0) {
      return;
    }

    var left;
    var right;
    if (index > 0) {
      prevMeta = PAGE_META[siblings[index - 1]];
      left = '<a href="' + prevMeta.href.replace('pages/', '') + '"><span>← 上一頁：' + prevMeta.label + '</span></a>';
    } else {
      left = '<a href="' + groupMeta.href.replace('pages/', '') + '"><span>← 回群組：' + groupMeta.label + '</span></a>';
    }

    if (index < siblings.length - 1) {
      nextMeta = PAGE_META[siblings[index + 1]];
      right = '<a href="' + nextMeta.href.replace('pages/', '') + '"><span>下一頁：' + nextMeta.label + ' →</span></a>';
    } else {
      right = '<a href="' + groupMeta.href.replace('pages/', '') + '"><span>回群組：' + groupMeta.label + ' →</span></a>';
    }

    pager.innerHTML = left + right;
  }

  renderTopNav();
  renderBreadcrumb();
  renderPager();

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
