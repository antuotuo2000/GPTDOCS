
    (function () {
      var saved = null;
      try { saved = localStorage.getItem('mui_theme'); } catch (e) {}
      if (saved === 'dark' || saved === 'light') {
        document.documentElement.setAttribute('data-theme', saved);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      var savedDensity = null;
      try { savedDensity = localStorage.getItem('mui_density'); } catch (e) {}
      if (savedDensity === 'compact' || savedDensity === 'comfortable') {
        document.documentElement.setAttribute('data-density', savedDensity);
      }
    })();
  