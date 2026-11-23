/* A separate search lens keeps the existing five destinations intact. */
(() => {
  const dock = document.querySelector('.m-bottom-dock-wrap');
  if (!dock) return;
  const search = document.createElement('button');
  search.type = 'button';
  search.className = 'm-dock-search';
  search.setAttribute('aria-label', '搜索 / Search');
  search.innerHTML = '<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><circle cx="10.8" cy="10.8" r="7.2"/><path d="m16.2 16.2 4.2 4.2"/></svg>';
  search.addEventListener('click', () => {
    const input = document.getElementById('globalSearchInput');
    if (!input) return;
    input.scrollIntoView({ block: 'center', behavior: 'instant' });
    input.focus({ preventScroll: true });
  });
  dock.append(search);
})();
