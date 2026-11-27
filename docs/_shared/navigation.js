/* Shared report article search, header and sidebar behavior. */
(() => {
  const script = document.createElement('script');
  script.src = new URL('./article-search.js', document.currentScript.src).href;
  document.head.append(script);
})();
(() => {
  const root = document.documentElement;
  const home = new URL('../index.html', document.currentScript.src).href;
  const key = 'mui_portal_sidebar_collapsed_v1';
  const desktop = matchMedia('(min-width:1024px)');
  const button = () => document.querySelector('.mui-appbar :is(#sidebarToggleBtn,#drawerToggleBtn)');
  function prepareMenus() {
    const control = button();
    if (control) {
      control.innerHTML = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>';
    }
    const crumbs = document.querySelector('.mui-appbar :is(.breadcrumbs,.appbar-breadcrumb)');
    if (crumbs) {
      // Retain the old elements and IDs for report engines that still update them.
      for (const item of crumbs.children) {
        if (!item.matches('.crumb-current,.appbar-breadcrumb-cur')) item.classList.add('report-old-crumb');
      }
      const link = document.createElement('a');
      link.className = 'report-home-crumb';
      link.href = home;
      link.innerHTML = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5.2L9.5 9.5v8.3L2 13.5V5.2zm20 0L14.5 9.5v8.3L22 13.5V5.2zM12 2L4.6 6.2 12 10.4l7.4-4.2L12 2z"/></svg><span class="portal-menu-text" data-portal-zh="数据中心" data-portal-en="Research Hub">数据中心</span>';
      crumbs.prepend(link);
    }
    document.querySelectorAll('#muiSidebar .toc-list').forEach(list => {
      list.classList.add('mui-nav-list');
      list.querySelectorAll('.toc-link').forEach(link => link.classList.add('mui-nav-link'));
      list.querySelectorAll('.toc-num').forEach(number => number.classList.add('nav-idx'));
    });
    sync();
  }
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
    } else if (event.target.closest('#portalDetailBackdrop,#muiSidebar :is(.mui-nav-link,.toc-link)')) close();
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !document.body.classList.contains('portal-detail-drawer')) return;
    close();
    button()?.focus();
  });
  desktop.addEventListener('change', close);
  window.addEventListener('storage', event => {
    if (event.key !== key) return;
    if (event.newValue === '1') root.setAttribute('data-sidebar-collapsed', '1');
    else root.removeAttribute('data-sidebar-collapsed');
    sync();
  });
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['lang','data-theme','data-sidebar-collapsed'] });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prepareMenus, { once: true });
  else prepareMenus();
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
        for (const icon of icons) {
          const chinesePair = /^\p{Script=Han}{2}$/u.test(icon.textContent.trim());
          if (icon.classList.contains('topic-icon-han') !== chinesePair) icon.classList.toggle('topic-icon-han', chinesePair);
        }
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

/* Older mobile browsers may still zoom on a second tap over plain content. */
(() => {
  let start, previous;
  const mobile = () => innerWidth < 1024 || matchMedia('(pointer: coarse)').matches;
  document.addEventListener('touchstart', event => {
    if (!mobile() || event.touches.length !== 1) { start = previous = null; return; }
    const touch = event.touches[0];
    start = { x: touch.clientX, y: touch.clientY, time: performance.now() };
  }, { passive: true });
  document.addEventListener('touchmove', event => {
    if (!start) return;
    const touch = event.touches[0];
    if (event.touches.length !== 1 || Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 12) {
      start = previous = null;
    }
  }, { passive: true });
  document.addEventListener('touchend', event => {
    if (!start || event.touches.length || performance.now() - start.time > 300) {
      start = previous = null; return;
    }
    const tap = start; start = null;
    const repeat = previous && tap.time - previous.time < 320 && Math.hypot(tap.x - previous.x, tap.y - previous.y) < 24;
    previous = tap;
    // Controls keep their native clicks, focus and editing behavior.
    const interactive = event.target instanceof Element && event.target.closest('a,button,input,textarea,select,label,[role="button"],[contenteditable]');
    if (repeat && !interactive && event.cancelable) event.preventDefault();
  }, { passive: false });
  document.addEventListener('dblclick', event => {
    if (mobile() && event.cancelable) event.preventDefault();
  }, { passive: false });
})();

/* Align blueprint lines through card boundaries without fixed-background seams. */
(() => {
  function start() {
    const main=document.querySelector('main');
    if(!main)return;
    const sidebar=document.querySelector('.mui-sidebar');
    const selector='.mui-paper,.hero-card,.chart-card,.ip-hub-banner,.arch-blueprint,.bm-lens-panel,.bm-panel,.bm-subpanel,.bm-canvas-box,.ft-panel,.cc-panel,.ip-panel,.section-card,.research-card,.analysis-card,.product-card,.content-card,.executive-card,.cc-hero-shell,.bm-thesis-deck,.bm-telemetry-ledger,.ft-manifesto,.ft-horizon-radar,.ft-val-board';
    let queued=false;
    function schedule(){
      if(queued)return;queued=true;
      requestAnimationFrame(()=>{
        queued=false;
        for(const panel of [...main.querySelectorAll(selector),...document.querySelectorAll('.mui-sidebar .sidebar-card')]){
          if(!panel.getClientRects().length)continue;
          const style=getComputedStyle(panel);
          if(!style.backgroundImage.includes('linear-gradient')||!style.backgroundImage.includes('1px'))continue;
          const rect=panel.getBoundingClientRect();
          if(!panel.classList.contains('report-grid-surface'))panel.classList.add('report-grid-surface');
          panel.style.setProperty('--report-grid-x',`${-(rect.left+scrollX)}px`);
          panel.style.setProperty('--report-grid-y',`${-(rect.top+scrollY)}px`);
        }
      });
    }
    new ResizeObserver(schedule).observe(main);
    new MutationObserver(schedule).observe(main,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','hidden','open']});
    if(sidebar){
      new ResizeObserver(schedule).observe(sidebar);
      new MutationObserver(schedule).observe(sidebar,{childList:true,subtree:true,characterData:true});
      sidebar.addEventListener('transitionend',schedule);
      sidebar.addEventListener('scroll',schedule,{passive:true});
    }
    window.addEventListener('resize',schedule);
    document.fonts.ready.then(schedule);
    schedule();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
