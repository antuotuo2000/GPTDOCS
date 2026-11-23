
    (function () {
      try {
        var rawT = window.localStorage.getItem('mui_portal_theme_v4');
        var t = rawT ? String(rawT).replace(/^"|"$/g, '') : 'light';
        document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
      } catch (e) {}
    })();
  