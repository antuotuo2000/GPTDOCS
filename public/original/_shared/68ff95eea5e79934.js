
    (function () {
      try {
        var theme = window.localStorage.getItem('mui_portal_theme_v4');
        theme = (theme || '').replace(/^"|"$/g, '');
        if (theme === 'dark' || theme === 'light') {
          document.documentElement.setAttribute('data-theme', theme);
        }
        if (window.localStorage.getItem('mui_portal_sidebar_collapsed_v1') === '1') {
          document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        }
      } catch (e) {}
    })();
  