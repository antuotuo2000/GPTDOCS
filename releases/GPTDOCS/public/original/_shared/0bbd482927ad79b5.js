
    (function () {
      try {
        var rawT = window.localStorage.getItem('mui_portal_theme_v4');
        var t = rawT ? String(rawT).replace(/^"|"$/g, '') : '';
        if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
        var rawL = window.localStorage.getItem('mui_portal_lang_v1');
        var l = rawL ? String(rawL).replace(/^"|"$/g, '') : '';
        if (l === 'zh' || l === 'en') {
          document.documentElement.setAttribute('data-lang', l);
          document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'zh-CN');
        }
      } catch (e) {}
    })();
  