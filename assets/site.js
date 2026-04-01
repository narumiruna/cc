(function () {
  /* ── Active nav link ── */
  var links = document.querySelectorAll('.top-nav a[data-page]');
  var current = document.body.getAttribute('data-page');
  links.forEach(function (link) {
    if (link.getAttribute('data-page') === current) {
      link.classList.add('active');
    }
  });

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
