/* Shared article ranking for the home page and report headers. */
(() => {
  if (window.ReportSearch) return;
  const root = new URL('../', document.currentScript.src);
  const tokenize = value => String(value || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  function prepare(item, corpus) {
    item._titleHay = [item.title, item.titleEn, item.name, item.company, item.companyLabel, item.ticker, item.sector].join(' ').toLowerCase();
    item._headingHay = (item.headings || []).concat(item.headingsEn || []).join(' ').toLowerCase();
    item._summaryHay = [item.summary, item.summaryEn].join(' ').toLowerCase();
    item._ftHay = String(corpus?.[item.id] || corpus?.[item.relPath] || '').toLowerCase();
    return item;
  }
  function scoreItem(item, tokens) {
    if (!tokens.length) return 1;
    let total = 0;
    for (const token of tokens) {
      let score = 0;
      if (String(item.ticker || '').toLowerCase() === token || String(item.company || '').toLowerCase() === token) score += 140;
      if (item._titleHay.includes(token)) score += 55;
      if (item._headingHay.includes(token)) score += 25;
      if (item._summaryHay.includes(token)) score += 14;
      if (item._ftHay?.includes(token)) score += 7;
      if (!score) return 0;
      total += score;
    }
    return total;
  }
  window.ReportSearch = { tokenize, prepare, scoreItem };

  function start() {
    const input = document.querySelector('.mui-appbar #quickJumpInput');
    const panel = document.getElementById('quickJumpPopover');
    if (!input || !panel) return;
    panel.classList.add('article-search-results');
    panel.setAttribute('role', 'listbox');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', panel.id);
    const english = () => document.documentElement.lang.startsWith('en') || document.documentElement.dataset.lang === 'en';
    const escape = value => String(value || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const requests = new Map();
    let files, generation = 0, timer, selected = -1;
    function load(src) {
      if (!requests.has(src)) requests.set(src, new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = new URL(src, root).href;
        script.onload = resolve;
        script.onerror = () => { requests.delete(src); script.remove(); reject(new Error('Search data unavailable')); };
        document.head.append(script);
      }));
      return requests.get(src);
    }
    function labels() {
      const zh = '搜索全站文章、代码或关键词…';
      const en = 'Search all articles, tickers or keywords…';
      input.placeholder = english() ? en : zh;
      input.setAttribute('aria-label', english() ? 'Search all research articles' : '搜索全站研究文章');
      input.dataset.phZh = zh;
      input.dataset.phEn = en;
      input.dataset.ariaZh = '搜索全站研究文章';
      input.dataset.ariaEn = 'Search all research articles';
    }
    function close() {
      clearTimeout(timer);
      generation++;
      panel.classList.remove('open');
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }
    function open() {
      panel.classList.add('open');
      input.setAttribute('aria-expanded', 'true');
    }
    function refreshCorpus() {
      files.forEach(item => prepare(item, window.DOCS_FULLTEXT));
    }
    async function render() {
      const current = ++generation;
      open();
      if (!files) panel.innerHTML = '<div class="article-search-status">' + (english() ? 'Loading articles…' : '正在加载文章…') + '</div>';
      try {
        if (!window.DOCS_CATALOG) await load('_shared/58a52ed5bd3e6ae8.js');
        if (!files) {
          files = window.DOCS_CATALOG.files.filter(item => !item.isPortalIndex && item.fileType === 'HTML' && item.relPath !== 'index.html');
          refreshCorpus();
        }
        if (current !== generation) return;
        const tokens = tokenize(input.value);
        if (tokens.length && !window.DOCS_FULLTEXT) {
          load('search_index.js').then(() => {
            refreshCorpus();
            if (document.activeElement === input && panel.classList.contains('open')) render();
          }).catch(() => {});
        }
        const matches = files.map(item => ({ item, score: scoreItem(item, tokens) }))
          .filter(result => result.score > 0)
          .sort((a, b) => b.score - a.score || String(b.item.modifiedTime).localeCompare(String(a.item.modifiedTime)));
        selected = -1;
        input.removeAttribute('aria-activedescendant');
        panel.innerHTML = '<div class="article-search-status" role="status">' +
          (tokens.length ? (english() ? matches.length + ' articles' : '找到 ' + matches.length + ' 篇文章') : (english() ? 'Recent articles' : '最近更新的文章')) + '</div>' +
          matches.slice(0, 12).map(({ item }, index) => '<a id="article-result-' + index + '" class="article-search-result" role="option" aria-selected="false" href="' + escape(new URL(item.relPath, root).href) + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="article-search-meta">' + escape(item.ticker || item.company) + ' · ' + escape(item.companyLabel || item.company) + '</span>' +
            '<strong>' + escape(english() ? item.titleEn || item.title : item.title) + '</strong></a>').join('') +
          (!matches.length ? '<div class="article-search-status">' + (english() ? 'Try a company name or another keyword.' : '试试公司名、股票代码或其他关键词。') + '</div>' : '') +
          '<a class="article-search-all" href="' + escape(new URL('index.html?q=' + encodeURIComponent(input.value), root).href) + '" target="_blank" rel="noopener noreferrer">' + (english() ? 'View all results on home ↗' : '在首页查看全部结果 ↗') + '</a>';
      } catch {
        if (current === generation) panel.innerHTML = '<div class="article-search-status">' + (english() ? 'Unable to load articles. Focus here to retry.' : '文章加载失败，重新点击搜索框可重试。') + '</div>';
      }
    }
    // Capture keeps legacy chapter-jump handlers from receiving these events.
    document.addEventListener('focus', event => {
      if (event.target !== input) return;
      event.stopImmediatePropagation();
      render();
    }, true);
    document.addEventListener('input', event => {
      if (event.target !== input) return;
      event.stopImmediatePropagation();
      clearTimeout(timer);
      timer = setTimeout(render, 120);
    }, true);
    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (!input.getClientRects().length) return;
        event.preventDefault(); event.stopImmediatePropagation(); input.focus(); render(); return;
      }
      if (event.target !== input) return;
      event.stopImmediatePropagation();
      if (event.isComposing) return;
      const results = [...panel.querySelectorAll('.article-search-result')];
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!results.length) return;
        selected = (selected + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
        results.forEach((node, index) => node.setAttribute('aria-selected', String(index === selected)));
        input.setAttribute('aria-activedescendant', results[selected].id);
        results[selected].scrollIntoView({ block: 'nearest' });
      } else if (event.key === 'Enter') {
        event.preventDefault();
        (results[Math.max(0, selected)] || panel.querySelector('.article-search-all'))?.click();
      }
    }, true);
    document.addEventListener('click', event => { if (!event.target.closest('.quick-search-wrap')) close(); });
    matchMedia('(max-width:1023px)').addEventListener('change', event => { if (event.matches) close(); });
    new MutationObserver(() => { labels(); if (panel.classList.contains('open')) render(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'data-lang'] });
    labels();
    input.setAttribute('aria-expanded', 'false');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
