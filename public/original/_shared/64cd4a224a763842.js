
(function () {
  try {
    var t = (window.localStorage.getItem('mui_portal_theme_v4') || window.localStorage.getItem('mrvl_portal_theme_v1') || '').replace(/^"|"$/g, '');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    var l = (window.localStorage.getItem('mui_portal_lang_v1') || window.localStorage.getItem('mrvl_portal_lang_v1') || '').replace(/^"|"$/g, '');
    if (l === 'zh' || l === 'en') {
      document.documentElement.setAttribute('data-lang', l);
      document.documentElement.setAttribute('lang', l === 'en' ? 'en' : 'zh-CN');
    }
    if (window.localStorage.getItem('mrvl_portal_sidebar_v1') === '1') {
      document.documentElement.setAttribute('data-sidebar-collapsed', '1');
    }
  } catch (e) {}
})();
