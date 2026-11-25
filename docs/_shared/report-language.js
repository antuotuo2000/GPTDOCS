(() => {
  const root = document.documentElement;
  if (!root.hasAttribute('data-report-language')) return;
  const preference = 'mui_portal_lang_v1';
  const hasPartialTranslation = root.dataset.reportLanguage === 'partial';

  function syncLanguage(lang) {
    root.lang = lang === 'en' ? 'en' : 'zh-CN';
    root.dataset.lang = lang;
    for (const button of document.querySelectorAll('#langSwitchGroup [data-lang]')) {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    if (!hasPartialTranslation) return;
    for (const node of document.querySelectorAll('[data-report-text-en]')) {
      node.textContent = lang === 'en' ? node.dataset.reportTextEn : node.dataset.reportTextZh;
    }
    document.querySelector('[data-report-language-note]').hidden = lang !== 'en';
  }

  function selectLanguage(lang) {
    syncLanguage(lang);
    try { localStorage.setItem(preference, lang); } catch {}
  }

  function start() {
    const group = document.getElementById('langSwitchGroup');
    if (!group) return;
    group.addEventListener('click', event => {
      const lang = event.target.closest('[data-lang]')?.dataset.lang;
      if (lang === 'zh' || lang === 'en') queueMicrotask(() => selectLanguage(lang));
    });
    let saved = null;
    try { saved = localStorage.getItem(preference)?.replace(/^"|"$/g, ''); } catch {}
    if (saved === 'en' || saved === 'zh') group.querySelector(`[data-lang="${saved}"]`)?.click();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
