/* One persistent viewport preference for the home page and every report. */
(() => {
  const key = 'portal-device-mode-v1';
  const modes = ['wide', 'phone', 'ipad'];
  const labels = { wide: '宽屏', phone: '手机窄屏', ipad: 'iPad Pro 13″' };
  // The 13-inch iPad Pro uses a 1032 CSS pixel viewport in portrait at 2×.
  const widths = { phone: 430, ipad: 1032 };
  let mode = 'wide';
  try { const saved = localStorage.getItem(key); if (modes.includes(saved)) mode = saved; } catch {}
  let mirroredTop = -1;
  let shell, frame, spacer, currentUrl = location.href;
  const embedded = window.top !== window;
  if (embedded) document.documentElement.dataset.previewFrame = '1';
  function label() {
    const button = document.getElementById('simWidthBtn');
    if (!button) return;
    button.textContent = labels[mode] + ' ▾';
    button.title = '显示模式：' + labels[mode] + '；点击切换为' + labels[modes[(modes.indexOf(mode) + 1) % modes.length]];
    button.setAttribute('aria-label', button.title);
    button.classList.toggle('active', mode !== 'wide');
  }
  function apply(next) {
    if (!modes.includes(next)) return;
    mode = next;
    try { localStorage.setItem(key, mode); } catch {}
    label();
    if (embedded) return;
    if (mode === 'wide' || innerWidth < 1024) {
      if (shell) { location.replace(currentUrl); }
      return;
    }
    if (!shell) {
      shell = document.createElement('div'); shell.id = 'devicePreviewShell';
      frame = document.createElement('iframe');
      frame.title = '网站设备宽度预览'; frame.src = currentUrl;
      spacer = document.createElement('div');
      spacer.className = 'device-preview-spacer'; spacer.setAttribute('aria-hidden', 'true');
      shell.append(frame, spacer); document.body.append(shell);
      shell.addEventListener('scroll', () => {
        if (Math.abs(shell.scrollTop - mirroredTop) <= 1) return;
        frame.contentWindow.postMessage({ type: 'portal-preview-scroll', top: shell.scrollTop }, '*');
      }, { passive: true });
      document.body.classList.add('device-preview-host');
      frame.addEventListener('load', () => frame.contentWindow.postMessage({ type: 'portal-device-mode', mode }, '*'));
    }
    frame.style.width = widths[mode] + 'px';
    frame.contentWindow.postMessage({ type: 'portal-device-mode', mode }, '*');
  }
  function start() {
    const button = document.getElementById('simWidthBtn');
    if (button) {
      button.classList.add('device-mode-button');
      button.removeAttribute('aria-pressed');
      button.addEventListener('click', () => {
        const next = modes[(modes.indexOf(mode) + 1) % modes.length];
        if (embedded) parent.postMessage({ type: 'portal-device-select', mode: next }, '*');
        else apply(next);
      });
      label();
    }
    if (embedded) {
      const announce = () => parent.postMessage({ type: 'portal-device-ready', url: location.href }, '*');
      announce(); window.addEventListener('hashchange', announce);
      let queued = false;
      const reportScroll = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          parent.postMessage({ type: 'portal-preview-metrics', top: scrollY,
            height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) }, '*');
        });
      };
      window.addEventListener('scroll', reportScroll, { passive: true });
      window.addEventListener('resize', reportScroll);
      new ResizeObserver(reportScroll).observe(document.body);
      reportScroll();
    } else apply(mode);
  }
  window.addEventListener('message', event => {
    const data = event.data;
    if (!data || typeof data !== 'object') return;
    if (embedded && event.source === parent && data.type === 'portal-device-mode' && modes.includes(data.mode)) {
      mode = data.mode; label();
    } else if (embedded && event.source === parent && data.type === 'portal-preview-scroll' && Number.isFinite(data.top)) {
      if (Math.abs(scrollY - data.top) > 1) scrollTo({ top: data.top, behavior: 'instant' });
    } else if (frame && event.source === frame.contentWindow) {
      if (data.type === 'portal-preview-metrics' && Number.isFinite(data.height) && Number.isFinite(data.top)) {
        spacer.style.height = Math.max(shell.clientHeight, data.height) + 'px';
        if (Math.abs(shell.scrollTop - data.top) > 1) {
          mirroredTop = data.top;
          shell.scrollTop = data.top;
        }
      }
      if (data.type === 'portal-device-select') apply(data.mode);
      if (data.type === 'portal-device-ready') {
        try {
          const url = new URL(data.url);
          if (url.origin === location.origin && ['http:', 'https:', 'file:'].includes(url.protocol)) {
            currentUrl = url.href;
            try { history.replaceState(null, '', currentUrl); } catch {}
          }
        } catch {}
        frame.contentWindow.postMessage({ type: 'portal-device-mode', mode }, '*');
      }
    }
  });
  window.addEventListener('storage', event => { if (event.key === key) apply(event.newValue || 'wide'); });
  window.addEventListener('resize', () => {
    if (innerWidth >= 1024 && mode !== 'wide' && !embedded && !shell) apply(mode);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
