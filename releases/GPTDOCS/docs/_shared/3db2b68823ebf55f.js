
    (function () {
      try {
        var t = window.localStorage.getItem('mui_portal_theme_v4');
        if (t) t = String(t).replace(/^"|"$/g, '');
        if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
        var l = window.localStorage.getItem('mui_portal_lang_v1');
        if (l) l = String(l).replace(/^"|"$/g, '');
        if (l === 'en' || l === 'zh') {
          document.documentElement.setAttribute('data-lang', l);
          document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'zh-CN');
        }
      } catch (e) {}
    })();
  