
    (function () {
      try {
        var savedTheme = window.localStorage.getItem('mui_report_theme_v1');
        var theme = savedTheme ? String(savedTheme).replace(/^"|"$/g, '') : '';
        if (theme === 'dark' || theme === 'light') {
          document.documentElement.setAttribute('data-theme', theme);
        }
        var savedDens = window.localStorage.getItem('mui_report_density_v1');
        var dens = savedDens ? String(savedDens).replace(/^"|"$/g, '') : '';
        if (dens === 'compact') {
          document.documentElement.setAttribute('data-density', 'compact');
        }
      } catch (e) {}
    })();
  