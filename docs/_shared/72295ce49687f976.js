
    (function () {
      try {
        var rawT = window.localStorage.getItem('nvda_portal_theme_v1');
        var t = rawT ? String(rawT).replace(/^"|"$/g, '') : '';
        if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
        var rawL = window.localStorage.getItem('nvda_portal_lang_v1');
        var l = rawL ? String(rawL).replace(/^"|"$/g, '') : '';
        if (l === 'zh' || l === 'en') {
          document.documentElement.setAttribute('data-lang', l);
          document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'zh-CN');
        }
        if (window.localStorage.getItem('nvda_sidebar_collapsed_v1') === '1') {
          document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        }
        var d = window.localStorage.getItem('nvda_density_v1');
        if (d === 'compact') {
          document.documentElement.setAttribute('data-density', 'compact');
        }
      } catch (e) {}
    })();
  