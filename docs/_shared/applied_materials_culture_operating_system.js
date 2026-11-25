
 (function () {
  'use strict';
  var STORAGE_THEME_KEY = 'amat_portal_theme_v1', STORAGE_LANG_KEY = 'amat_portal_lang_v1', STORAGE_AUDIT_KEY = 'amat_culture_bp_audit_v1';
  var state = { theme: 'dark', lang: 'zh', eView: 'rd', gView: 'gm' }, hits = { eraCanvas: [], genomeCanvas: [] };

  function showToast(msg) { var bar = document.getElementById('muiSnackbar'); bar.textContent = msg; bar.classList.add('show'); clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000); }
  function getPalette() {
   var dark = document.documentElement.getAttribute('data-theme') === 'dark';
   return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: dark ? '#3399FF' : '#0073E6', green: dark ? '#22C55E' : '#16A34A', violet: dark ? '#A78BFA' : '#7C3AED', amber: dark ? '#FFB74D' : '#D97706' };
  }
  function applyTheme(t, silent) {
   state.theme = (t === 'dark') ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
   var ic = document.getElementById('appbarThemeIcon');
   if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
   drawAll(); if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
  }
  function applyLang(lang, silent) {
   state.lang = (lang === 'en') ? 'en' : 'zh'; document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
   document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh'); document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
   document.querySelectorAll('[data-i18n-zh]').forEach(function (n) { var v = n.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (v !== null) { if (v.indexOf('<span') !== -1) n.innerHTML = v; else n.textContent = v; } });
   drawAll(); if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
  }

  document.getElementById('topoSwitch').addEventListener('click', function (e) {
   var b = e.target.closest('[data-topo]'); if (!b) return;
   var mode = b.getAttribute('data-topo');
   document.querySelectorAll('#topoSwitch .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   var stage = document.getElementById('topoStage');
   if (mode === 'amat') {
    stage.innerHTML = '<div class="cc-topo-hub mono">EPIC 协同中枢 × Semiconductor Products Group ($26.14B)</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>外延/沉积组</b>原子层薄膜与选择性外延直接对接真空集成腔体</div><div class="cc-spoke"><b>CMP/注入组</b>背面供电减薄抛光与掺杂工艺同步联合调优</div><div class="cc-spoke"><b>eBeam 量测组</b>VeritySEM 20 实时反馈线宽缺陷闭环纠偏</div><div class="cc-spoke"><b>Besi 混合键合</b>前道清洗沉积 + 3D 键合无缝衔接</div><div class="cc-spoke"><b>客户联合团队</b>TSMC / Intel / 三星 / 美光科学家同楼并行</div><div class="cc-spoke"><b>AGS 驻场军团</b>200+ 全球网点用 AI/VR 将配方快速复制到量产</div></div><div class="cc-topo-outcome">结果：材料—设备—工艺并行研发提速 2 倍，提前 3–5 年锁死晶圆厂量产标准配方 (POR)</div>';
   } else {
    stage.innerHTML = '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统半导体设备模式 · 互不联通的单点设备商</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>独立沉积厂商</b>只优化单机薄膜厚度，不顾下游界面氧化</div><div class="cc-spoke silo"><b>独立封装厂商</b>缺乏前道清洗与晶圆减薄工艺协同能力</div><div class="cc-spoke silo"><b>串联式研发</b>晶圆厂需分别对接十余家厂商逐一试错</div></div><div class="cc-topo-outcome warn">痛点：2nm GAA 与 HBM 良率爬坡周期被拉长数倍，试错成本呈指数级飙升</div>';
   }
  });

  var QUADS = [
   { badge: 'Q1 · INFLECTION-FOCUSED RESOURCE ALLOCATION', title: '“拐点聚焦”资源权重：重仓前沿材料，严控行政冗余', desc: '应用材料每年将逾 12% 的营收投入研发与工程（$4.18B），而销管费用（SG&A）仅占 4.9%。同时通过 Applied Global University 的 70/20/10 模型，将一线现场服务经验直接反哺下一代设备设计。', alloc: [48, 27, 17, 8] },
   { badge: 'Q2 · EPIC PARALLEL CO-INNOVATION', title: 'EPIC 生态共创权重：用并行实验室缩短一半商业化周期', desc: '通过把台积电、Intel、三星、SK 海力士、美光等 15 家伙伴拉入同一座硅谷洁净室，把串联摸索改为并联共创，目标至 2030 年额外夺取 +2% 全球 WFE 市场份额。', alloc: [42, 36, 14, 8] },
   { badge: 'Q3 · APPLIED GLOBAL UNIVERSITY (70/20/10)', title: 'Applied Global University：用 AI 与 VR 快速复制顶尖现场工程师', desc: '面对全球 41,500 名员工的快速扩张（FY26 新增 5,000 人），公司依托 70% 在岗实战、20% 社交协作与 10% AR/VR 仿真培训，确保新加坡与美台新厂保持统一良率标准。', alloc: [30, 28, 34, 8] },
   { badge: 'Q4 · RESPONSIBILITY, COMPLIANCE & NET ZERO 2040', title: '全球合规铁律与 Net Zero 2040 绿色半导体路线图', desc: '在支付 $253M BIS 合规和解金后全面升级贸易合规体系，同时推进 Net Zero 2040 纲领，协助晶圆厂客户降低单位算力的制造能耗与碳排放。', alloc: [35, 25, 18, 22] }
  ];
  document.getElementById('quadGrid').addEventListener('click', function (e) {
   var card = e.target.closest('[data-quad]'); if (!card) return;
   var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
   document.querySelectorAll('#quadGrid .cc-quad-card').forEach(function (c) { c.classList.toggle('active', c === card); });
   var q = QUADS[idx];
   document.getElementById('dialBadge').textContent = q.badge; document.getElementById('dialTitle').textContent = q.title; document.getElementById('dialDesc').textContent = q.desc;
   [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (p) {
    document.getElementById('pct' + p[0]).textContent = p[1] + '%'; document.getElementById('bar' + p[0]).style.width = p[1] + '%';
   });
  });

  var ERAS = [
   { badge: 'ERA I · 1976–2003 · JAMES C. MORGAN', title: '詹姆斯·摩根时代：27年缔造硅谷设备之王与亚洲本地化网络', desc: 'Morgan 自 1976 年出任 CEO 长达 27 年，首创半导体设备业“逆周期研发投入”与“贴近亚洲客户本地化支持”模式，把应用材料打造成全球最大晶圆设备供应商。', kpis: [['27 年任期', '硅谷最长青的硬科技统帅之一'], ['全球 #1', '率先布局日本/台湾/韩国市场'], ['逆周期研发', '下行期坚持不砍核心研发'], ['文化基石', 'Most Valued Partner 价值观确立']] },
   { badge: 'ERA II · 2003–2013 · MIKE SPLINTER', title: '迈克·斯普林特时代：$4.9B 收购 Varian 与跨界整合试炼', desc: '曾任 Intel 高管的 Splinter 推动了大规模制造全球化（新加坡枢纽），并在 2011 年以 $49亿 收购离子注入龙头 Varian Semiconductor，虽经历太阳能多元化阵痛，却为 AMAT 带来了关键接班人 Gary Dickerson。', kpis: [['$4.9B 并购', '2011 年收购 Varian 半导体'], ['新加坡枢纽', '全球分布式制造网络成型'], ['AGS 扩容', '确立全球装机服务独立板块'], ['人才交接', '引入 Gary Dickerson 执掌帅印']] },
   { badge: 'ERA III · 2013–2026+ · GARY DICKERSON', title: '加里·迪克森时代：从多元包袱回归半导体核心，将毛利率推上 50.0% 巅峰', desc: '原 Varian Semiconductor CEO Gary Dickerson 于 2013 年接掌帅印后，果断剥离低毛利能源/太阳能包袱，确立“Inflection-Focused Innovation”文化与 PPACt 价值框架，推动营收从不足百亿跃升至 FY26 的 $344.5亿，并主导投资 $50亿 建设 EPIC 中心锁定未来十年。', kpis: [['$34.45B', 'FY2026 历史新高总营收'], ['50.0%', 'FY2026 GAAP 综合毛利率'], ['$10.09B', 'FY2026 GAAP 净利润 (+44.2%)'], ['15 家伙伴', 'EPIC 协同研发联盟揭幕']] }
  ];
  document.getElementById('eraTabs').addEventListener('click', function (e) {
   var t = e.target.closest('[data-era]'); if (!t) return;
   var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
   document.querySelectorAll('#eraTabs .cc-era-tab').forEach(function (btn) { btn.classList.toggle('active', btn === t); });
   var er = ERAS[idx];
   document.getElementById('eraBadge').textContent = er.badge; document.getElementById('eraTitle').textContent = er.title; document.getElementById('eraDesc').textContent = er.desc;
   document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) { return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
  });

  function prepCanvas(id) {
   var c = document.getElementById(id); if (!c) return null;
   var rect = c.getBoundingClientRect(), w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2);
   c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
   var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
   return { c: c, ctx: ctx, w: w, h: h };
  }
  function roundRect(ctx, x, y, w, h, r) { var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }

  function drawEraCanvas() {
   var env = prepCanvas('eraCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hits.eraCanvas = [];
   var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
   if (state.eView === 'rd') {
    var rd = [2.77, 3.10, 3.23, 3.57, 4.18], net = [6.53, 6.86, 7.18, 7.00, 10.09], maxF = 11.5;
    for (var k = 0; k <= 3; k++) { var kv = Math.round((maxF / 3) * k), ky = pad.top + ph - (kv / maxF) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4); }
    function plot(arr, col, name) {
     ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
     arr.forEach(function (v, idx) { var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxF) * ph; if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
     ctx.stroke();
     arr.forEach(function (v, idx) {
      var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxF) * ph;
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + v.toFixed(2) + 'B', px, py - 8);
      hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: '$' + v.toFixed(2) + 'B' });
     });
    }
    yrs.forEach(function (lb, idx) { var px = pad.left + (idx / 4) * pw; ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(lb, px, pad.top + ph + 20); });
    plot(net, pal.green, 'GAAP 净利润'); plot(rd, pal.blue, '研发与工程投入 R&D');
   } else {
    var rev = [25.79, 26.52, 27.18, 28.37, 34.45], maxV = 40;
    for (var g = 0; g <= 4; g++) { var gv = g * 10, gy = pad.top + ph - (gv / maxV) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4); }
    var slot = pw / 5, bw = Math.min(40, slot * 0.56);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot + (slot - bw) / 2, bh = (rev[i] / maxV) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = i === 4 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + rev[i].toFixed(2) + 'B', x + bw / 2, yt - 6);
     ctx.fillStyle = pal.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
     hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 总营收', body: '$' + rev[i].toFixed(2) + 'B' });
    });
   }
  }

  function drawGenomeCanvas() {
   var env = prepCanvas('genomeCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hits.genomeCanvas = [];
   var pad = { top: 24, right: 44, bottom: 26, left: 118 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var peers = [{ name: 'KLA (检测垄断)', gm: 61.5, rd: 12.8, col: pal.violet }, { name: 'ASML (EUV 光刻)', gm: 52.0, rd: 14.5, col: pal.green }, { name: 'Lam Research (刻蚀)', gm: 50.6, rd: 10.3, col: pal.amber }, { name: 'Applied Materials', gm: 50.0, rd: 12.1, col: pal.blue }];
   var isGm = (state.gView === 'gm'), maxX = isGm ? 72 : 18, rowH = ph / peers.length;
   peers.forEach(function (p, idx) {
    var val = isGm ? p.gm : p.rd, cy = pad.top + idx * rowH + rowH / 2, bh = 22, bl = (val / maxX) * pw;
    ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
    ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
    ctx.fillStyle = pal.sub; ctx.font = (idx === 3 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(p.name, pad.left - 10, cy + 4);
    ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(val.toFixed(1) + '%', pad.left + bl + 7, cy + 4);
    hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '毛利率 ' + p.gm.toFixed(1) + '% · 研发占比 ' + p.rd.toFixed(1) + '%' });
   });
  }

  var entSeries = [74, 82, 88, 91, 95];
  function drawEntropyCanvas() {
   var env = prepCanvas('entropyCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   var pad = { top: 20, right: 18, bottom: 24, left: 38 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var lbls = ['单机孤岛', '双腔协同', 'IMS集成', 'EPIC共创', '全栈闭环'];
   ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
   ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
   entSeries.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }); ctx.stroke();
   entSeries.forEach(function (v, i) {
    var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
    ctx.fillStyle = i === 3 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(Math.round(v), px, py - 7);
    ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.fillText(lbls[i], px, pad.top + ph + 15);
   });
  }
  function updateEntropySim() {
   var f = parseInt(document.getElementById('rngSkus').value, 10), e = parseInt(document.getElementById('rngExp').value, 10), l = parseInt(document.getElementById('rngLag').value, 10);
   document.getElementById('valSkus').textContent = f + '%'; document.getElementById('valExp').textContent = e + '%'; document.getElementById('valLag').textContent = l + '%';
   var syn = Math.round(f * 0.4 + e * 0.35 + l * 0.25), vel = (1 + (e - 40) * 0.02).toFixed(1), gm = (44 + syn * 0.072).toFixed(1);
   document.getElementById('outSynergy').textContent = syn + ' / 100'; document.getElementById('outVelocity').textContent = vel + 'x'; document.getElementById('outGmPrem').textContent = gm + '%';
   entSeries = [Math.max(40, syn - 20), Math.max(50, syn - 10), syn - 3, syn, Math.min(99, syn + 4)]; drawEntropyCanvas();
  }
  ['rngSkus', 'rngExp', 'rngLag'].forEach(function (id) { document.getElementById(id).addEventListener('input', updateEntropySim); });

  function bindSegChart(gid, attr, skey, fn) {
   document.getElementById(gid).addEventListener('click', function (e) {
    var b = e.target.closest('[' + attr + ']'); if (!b) return;
    state[skey] = b.getAttribute(attr);
    document.querySelectorAll('#' + gid + ' .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
    fn();
   });
  }
  bindSegChart('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
  bindSegChart('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);
  ['eraCanvas', 'genomeCanvas'].forEach(function (cid) {
   var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
   c.addEventListener('mousemove', function (ev) {
    var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, arr = hits[cid] || [], hit = null;
    for (var i = 0; i < arr.length; i++) { if (mx >= arr[i].x && mx <= arr[i].x + arr[i].w && my >= arr[i].y && my <= arr[i].y + arr[i].h) { hit = arr[i]; break; } }
    if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
    else tip.style.display = 'none';
   });
   c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
  });
  function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }

  var QITEMS = [
   { id: 'sec-c0', t: 'C0 跨工艺协同拓扑沙盘', s: 'EPIC 协同中枢 vs 单点设备孤岛对比' },
   { id: 'sec-c1', t: 'C1 四大文化基因与人才罗盘', s: '拐点聚焦 · EPIC 并行 · AGU 70/20/10' },
   { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1976–2026+)', s: 'Morgan / Splinter / Dickerson · $34.45B 营收' },
   { id: 'sec-c3', t: 'C3 全球半导体设备组织基因光谱', s: 'AMAT vs ASML / Lam Research / KLA' },
   { id: 'sec-c4', t: 'C4 协同复杂度模拟器与六律体检', s: 'IMS 协同度压力测试 · 6项组织健康度核查' }
  ];
  var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
  function renderQ(kw) {
   var q = (kw || '').trim().toLowerCase(), m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
   qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
   qPop.classList.toggle('open', m.length > 0);
  }
  qIn.addEventListener('focus', function () { renderQ(qIn.value); });
  qIn.addEventListener('input', function () { renderQ(qIn.value); });
  qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; document.querySelector(jb.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth', block: 'start' }); qPop.classList.remove('open'); });
  document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

  var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
  sbBtn.addEventListener('click', function () {
   if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
   else { document.documentElement.toggleAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
  });
  bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
  window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });

  function refreshAuditChip() { var boxes = document.querySelectorAll('[data-cchk]'), done = 0; for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++; document.getElementById('auditScoreChip').textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项'; }
  try {
   var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
   document.querySelectorAll('[data-cchk]').forEach(function (chk) { var k = chk.getAttribute('data-cchk'); chk.checked = !!savedA[k]; chk.addEventListener('change', function () { savedA[k] = chk.checked; try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {} refreshAuditChip(); showToast(chk.checked ? '已勾选该组织护城河指标' : '已取消勾选'); }); });
   refreshAuditChip();
  } catch (e) {}

  document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
  document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
  document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
  document.getElementById('sideExportBtn')?.addEventListener('click', function () {
   var url = URL.createObjectURL(new Blob(['<!doctype html>\n', document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
   var a = document.createElement('a'); a.href = url; a.download = 'Applied_Materials_Corporate_Culture_Blueprint.html'; a.click();
   setTimeout(function () { URL.revokeObjectURL(url); }, 1500); showToast('已导出独立网页文件');
  });

  try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true); } catch (e) {}
  document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
  document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });
  var rt = null; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
  updateEntropySim(); drawAll();
 })();
 