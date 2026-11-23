
    (function () {
      document.documentElement.setAttribute('data-theme', 'dark');
      try {
        var rawT = window.localStorage.getItem('mui_portal_theme_v4');
        var t = rawT ? String(rawT).replace(/^"|"$/g, '') : 'dark';
        document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
      } catch (e) {}
    })();
