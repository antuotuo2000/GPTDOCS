/* Shared report article search, header and sidebar behavior. */
(() => {
  const script = document.createElement('script');
  script.src = new URL('./article-search.js', document.currentScript.src).href;
  document.head.append(script);
})();
(() => {
  const root = document.documentElement;
  const key = 'mui_portal_sidebar_collapsed_v1';
  const desktop = matchMedia('(min-width:1024px)');
  const button = () => document.querySelector('.mui-appbar :is(#sidebarToggleBtn,#drawerToggleBtn)');
  function sync() {
    const control = button();
    if (!control) return;
    control.setAttribute('aria-controls', 'muiSidebar');
    control.setAttribute('aria-expanded', String(desktop.matches
      ? root.getAttribute('data-sidebar-collapsed') !== '1'
      : document.body.classList.contains('portal-detail-drawer')));
    const english = root.lang === 'en';
    document.querySelectorAll('.portal-menu-text').forEach(node => {
      const label = node.getAttribute(english ? 'data-portal-en' : 'data-portal-zh');
      if (label && node.textContent !== label) node.textContent = label;
    });
  }
  function close() { document.body.classList.remove('portal-detail-drawer'); sync(); }
  try { root.toggleAttribute('data-sidebar-collapsed', localStorage.getItem(key) === '1'); }
  catch { /* Navigation remains usable without storage. */ }
  if (root.hasAttribute('data-sidebar-collapsed')) root.setAttribute('data-sidebar-collapsed', '1');
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('.mui-appbar :is(#sidebarToggleBtn,#drawerToggleBtn)')) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (desktop.matches) {
        const collapsed = root.getAttribute('data-sidebar-collapsed') !== '1';
        if (collapsed) root.setAttribute('data-sidebar-collapsed', '1');
        else root.removeAttribute('data-sidebar-collapsed');
        try { localStorage.setItem(key, collapsed ? '1' : '0'); } catch { /* Optional preference. */ }
        window.dispatchEvent(new Event('resize'));
      } else document.body.classList.toggle('portal-detail-drawer');
      sync();
    } else if (event.target.closest('#portalDetailBackdrop,#muiSidebar .mui-nav-link')) close();
  }, true);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  desktop.addEventListener('change', close);
  window.addEventListener('storage', event => {
    if (event.key !== key) return;
    if (event.newValue === '1') root.setAttribute('data-sidebar-collapsed', '1');
    else root.removeAttribute('data-sidebar-collapsed');
    sync();
  });
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['lang','data-theme','data-sidebar-collapsed'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, { once: true });
  sync();
})();

/* Keep process-card tags, titles and descriptions aligned after content switches. */
(() => {
  function start() {
    const scope = document.querySelector('.main-content');
    if (!scope) return;
    let pending = false;
    function schedule() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        for (const grid of scope.querySelectorAll('.arch-nodes')) {
          const measure = selector => Math.ceil(Math.max(0, ...[...grid.querySelectorAll(selector)].map(node => {
            const previous = node.style.getPropertyValue('min-height');
            const priority = node.style.getPropertyPriority('min-height');
            node.style.setProperty('min-height', '0px', 'important');
            const height = node.getBoundingClientRect().height;
            if (previous) node.style.setProperty('min-height', previous, priority);
            else node.style.removeProperty('min-height');
            return height;
          })));
          grid.style.setProperty('--arch-tag-height', `${measure('.arch-node-tag')}px`);
          grid.style.setProperty('--arch-name-height', `${measure('.arch-node-name')}px`);
        }
      });
    }
    new MutationObserver(schedule).observe(scope, { childList: true, characterData: true, subtree: true });
    new ResizeObserver(schedule).observe(scope);
    document.fonts.ready.then(schedule);
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();

/* Equal columns are sized by the longest title, never by the secondary line. */
(() => {
  function start() {
    const grid = document.querySelector('#ipHubSwitcher .ip-pill-grid');
    if (!grid) return;
    let pending = false;
    function schedule() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const cards = [...grid.querySelectorAll('.ip-pill-btn')].filter(card => card.getClientRects().length);
        if (!cards.length) return;
        const icons = cards.map(card => card.querySelector('.ip-pill-mono')).filter(Boolean);
        const iconWidth = Math.ceil(Math.max(28, ...icons.map(icon => Math.max(icon.scrollWidth + 2, icon.getBoundingClientRect().width))));
        grid.style.setProperty('--topic-icon-width', `${iconWidth}px`);
        const titleWidth = Math.ceil(Math.max(0, ...cards.map(card => {
          const title = card.querySelector('.ip-pill-name');
          if (!title) return 0;
          const range = document.createRange();
          range.selectNodeContents(title);
          return range.getBoundingClientRect().width;
        })));
        grid.style.setProperty('--topic-text-width', `${titleWidth}px`);
        let minimum = 0;
        for (const card of cards) {
          const title = card.querySelector('.ip-pill-name');
          if (!title) continue;
          const icon = card.querySelector('.ip-pill-mono');
          const style = getComputedStyle(card);
          const chrome = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
            + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
            + (icon ? icon.getBoundingClientRect().width + (parseFloat(style.columnGap) || 0) : 0);
          minimum = Math.max(minimum, titleWidth + chrome + 2);
        }
        const gridStyle = getComputedStyle(grid);
        const gap = parseFloat(gridStyle.columnGap) || 8;
        const available = grid.clientWidth - parseFloat(gridStyle.paddingLeft) - parseFloat(gridStyle.paddingRight);
        const columns = Math.max(1, Math.min(6, Math.floor((available + gap) / (minimum + gap))));
        grid.style.setProperty('--topic-columns', String(columns));
        grid.style.setProperty('--topic-min-width', `${Math.ceil(minimum)}px`);
      });
    }
    new ResizeObserver(schedule).observe(grid);
    new MutationObserver(schedule).observe(grid, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    document.fonts.ready.then(schedule);
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
