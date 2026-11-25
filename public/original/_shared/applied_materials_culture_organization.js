
 (function () {
  'use strict';
  var STORAGE_THEME_KEY = 'amat_portal_theme_v1', STORAGE_LANG_KEY = 'amat_portal_lang_v1', STORAGE_CHECK_KEY = 'amat_culture_checks_v1';
  var state = { lang: 'zh', theme: 'dark', ch1View: 'viewA', activePillar: 0, radarSeries: { amat: true, asml: true, lrcx: true }, peerFilter: 'all', peerQuery: '', sim: { principal: 10000, years: 13, priceCagr: 24.0, drip: true, preset: 'p1' }, checks: [true, true, true, false, false, false] };
  var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };

  var PILLAR_NOTES = [
   '<strong>当前选中支柱解读（01 最受客户信赖伙伴）：</strong>据 Form 10-K，应用材料的核心战略即“Inflection-Focused Innovation”——在台积电、三星或美光量产前多年即介入协同定义工艺配方，这种信任壁垒远超单一设备报价竞争 <a class="cite-link" href="https://ir.appliedmaterials.com/static-files/af687923-06c7-4b43-a7a5-45750717f3ca" target="_blank" rel="noopener noreferrer">Form 10-K ↗</a>。',
   '<strong>当前选中支柱解读（02 必胜团队与 70/20/10 赋能）：</strong>Applied Global University 统筹全球技术与领导力培养，并率先利用 AI 仿真与 AR/VR 设备培训现场服务工程师，缩短复杂机台上手周期。',
   '<strong>当前选中支柱解读（03 责任、合规与 Net Zero 2040）：</strong>坚持 SEMI 与 RBA 供应链伦理，并通过 Net Zero 2040 纲领帮助晶圆厂客户降低单位芯片制造能耗。',
   '<strong>当前选中支柱解读（04 世界级执行绩效）：</strong>过去 41 个财年中 39 年实现盈利，FY26 GAAP 毛利率站上 50.0%，Non-GAAP EPS 跃升 +36.8% 至 $12.89。'
  ];
  var PEER_ROWS = [
   { category: 'wfe', benchmark: true, company: '研究基准：应用材料 (AMAT)', leader: 'Gary Dickerson / Brice Hill', positioning: '最全前道设备矩阵 + AGS 服务 + EPIC 协同中心', culture: '拐点聚焦创新 · Applied Global U (70/20/10)', headcount: '41,500 FTE · $830K/人', margins: 'FY26 $34.45B · 50.0% GM · $10.09B 净利', verdict: '平台协同广度无人能及，80% WFE 增量精准命中核心工具箱。' },
   { category: 'wfe', benchmark: false, company: 'ASML (ASML)', leader: 'Christophe Fouquet', positioning: 'EUV / High-NA EUV 光刻机全球 100% 独占', culture: '开放式联合研发 (Carl Zeiss 等深度绑定)', headcount: '~44,000+ FTE', margins: '毛利率 ~51%–53% · 市值 ~$580B', verdict: '单点物理极限壁垒最高，与 AMAT 量测及前道工艺形成强互补。' },
   { category: 'wfe', benchmark: false, company: 'Lam Research (LRCX)', leader: 'Tim Archer', positioning: '刻蚀与原子层沉积（存储强项）', culture: '专注深耕存储与介质刻蚀工艺敏捷文化', headcount: '~18,000+ FTE', margins: 'FY26 $23.2B · 50.6% GM', verdict: 'NAND 刻蚀龙头；AMAT 则在逻辑 GAA 外延与 3D DRAM 导体刻蚀占优。' },
   { category: 'compute', benchmark: false, company: 'NVIDIA (NVDA)', leader: 'Jensen Huang', positioning: 'AI GPU + CUDA 全栈算力平台', culture: '超扁平职能制 + 光速执行', headcount: '~42,000 FTE · ~$5.14M/人', margins: 'FY26 $215.9B · 71.1% GM', verdict: '下游 AI 算力需求总引擎，直接拉动 AMAT 的 GAA 与 HBM 设备需求。' }
  ];
  var CHECKLIST_ITEMS = [
   { tag: '拐点卡位', title: '1. “拐点聚焦”测试：研发是否提前 3–5 年锁定下一代架构配方？', desc: '核查是否围绕 GAA、BSPDN、HBM 等材料工程高壁垒拐点重仓投入（FY26 研发占 12.1%）。' },
   { tag: '平台协同', title: '2. 跨设备集成测试：能否打破单机孤岛交付多腔体集成方案 (IMS)？', desc: '评估公司是否整合沉积、外延、CMP 与量测形成难以替代的工艺平台。' },
   { tag: '客户共创', title: '3. 生态共创测试：是否具备 EPIC 级别的产业链联合研发机制？', desc: '检验是否将晶圆厂、材料商与高校拉入同一平台并行缩短商业化周期。' },
   { tag: '人才赋能', title: '4. 70/20/10 培养测试：是否拥有系统化的现场工程师复制体系？', desc: '核查 Applied Global University 与 AI/AR/VR 培训能否支撑全球同步扩产。' },
   { tag: '装机年金', title: '5. 抗周期底仓测试：服务合约续约率是否高于 90%？', desc: '对标 AGS $6.90B 营收与 30.5% Q4 利润率，验证服务是否平滑硬件周期。' },
   { tag: '资本纪律', title: '6. 股东回馈测试：是否坚持高比例自由现金流回购与分红？', desc: '核查 80–100% FCF 回馈承诺与 EPS 长期复合增速。' }
  ];

  function showToast(msg) { var el = document.getElementById('muiSnackbar'); el.textContent = msg; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 2400); }
  function applyTheme(t, silent) {
   state.theme = t === 'dark' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
   document.getElementById('sideThemeDarkBtn').classList.toggle('active', state.theme === 'dark'); document.getElementById('sideThemeLightBtn').classList.toggle('active', state.theme === 'light');
   renderAllCharts(); if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至浅色模式');
  }
  function applyLang(lang, silent) {
   state.lang = lang === 'en' ? 'en' : 'zh'; document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
   document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh'); document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
   document.querySelectorAll('[data-i18n-zh]').forEach(function (n) { var v = n.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (v !== null) { if (v.indexOf('<span') !== -1) n.innerHTML = v; else n.textContent = v; } });
   renderAllCharts(); if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
  }

  function renderPeerTable() {
   var tbody = document.getElementById('peerTableBody'), q = state.peerQuery.trim().toLowerCase();
   var filtered = PEER_ROWS.filter(function (r) { return (state.peerFilter === 'all' || r.category === state.peerFilter) && (!q || (r.company + r.leader + r.positioning + r.culture + r.verdict).toLowerCase().indexOf(q) !== -1); });
   document.getElementById('peerCountBadge').textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
   tbody.innerHTML = filtered.map(function (r) {
    return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '"><td><strong>' + r.company + '</strong><br><span style="font-size:0.76rem;color:var(--text-muted);">' + r.leader + '</span></td><td>' + r.positioning + '</td><td>' + r.culture + '</td><td class="mono">' + r.headcount + '</td><td class="mono" style="color:var(--mui-primary-lighter);font-weight:700;">' + r.margins + '</td><td>' + r.verdict + '</td></tr>';
   }).join('');
  }

  function renderChecklist() {
   var c = document.getElementById('checklistContainer'), done = state.checks.filter(Boolean).length, pct = Math.round((done / CHECKLIST_ITEMS.length) * 100);
   document.getElementById('checklistScoreChip').textContent = '已核查 ' + done + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)';
   document.getElementById('checklistProgressBar').style.width = pct + '%';
   c.innerHTML = CHECKLIST_ITEMS.map(function (it, idx) {
    var ck = !!state.checks[idx];
    return '<label class="check-card ' + (ck ? 'checked' : '') + '"><input type="checkbox" data-check-input="' + idx + '" ' + (ck ? 'checked' : '') + ' /><div><div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + it.title + '</span><span class="mui-chip mono">' + it.tag + '</span></div><p class="check-desc">' + it.desc + '</p></div></label>';
   }).join('');
  }

  function getPalette() {
   var dark = state.theme === 'dark';
   return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)', c1: dark ? '#3399FF' : '#0073E6', c2: dark ? '#22C55E' : '#16A34A', c3: dark ? '#FFB74D' : '#D97706', c4: dark ? '#A78BFA' : '#7C3AED' };
  }
  function prepCanvas(id) {
   var c = document.getElementById(id); if (!c || !c.parentElement) return null;
   var r = c.parentElement.getBoundingClientRect(), w = Math.max(240, Math.floor(r.width)), h = Math.max(170, Math.floor(r.height)), dpr = Math.min(window.devicePixelRatio || 1, 2);
   c.width = w * dpr; c.height = h * dpr; var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
   return { ctx: ctx, w: w, h: h };
  }
  function roundRect(ctx, x, y, w, h, r) { var rr = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }

  function drawCh1Chart() {
   var env = prepCanvas('chartCh1'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartCh1 = [];
   var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   if (state.ch1View === 'viewA') {
    var segs = ['Semiconductor Systems', 'Applied Global Services', 'Other / Display'], fy25 = [21.44, 5.74, 1.19], fy26 = [26.14, 6.90, 1.40], maxY = 30;
    for (var g = 0; g <= 3; g++) { var gv = g * 10, gy = pad.top + ph - (gv / maxY) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4); }
    var slot = pw / 3, bw = Math.min(40, slot * 0.28);
    segs.forEach(function (s, i) {
     var cx = pad.left + i * slot + slot / 2;
     [[fy25[i], pal.c1, -bw - 4], [fy26[i], pal.c2, 4]].forEach(function (b) {
      var bh = (b[0] / maxY) * ph, yt = pad.top + ph - bh;
      ctx.fillStyle = b[1]; roundRect(ctx, cx + b[2], yt, bw, bh, 5); ctx.fill();
      ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + b[0].toFixed(2) + 'B', cx + b[2] + bw / 2, yt - 6);
     });
     ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.fillText(s, cx, pad.top + ph + 20);
     hitRegions.chartCh1.push({ x: cx - bw * 1.5, y: pad.top, w: bw * 3, h: ph, html: '<strong>' + s + '</strong><br/>FY25: $' + fy25[i].toFixed(2) + 'B → FY26: $' + fy26[i].toFixed(2) + 'B' });
    });
   } else {
    var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26'], rev = [25.79, 26.52, 27.18, 28.37, 34.45], maxR = 40;
    for (var k = 0; k <= 4; k++) { var kv = k * 10, ky = pad.top + ph - (kv / maxR) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4); }
    var slot2 = pw / 5, bw2 = Math.min(44, slot2 * 0.5);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot2 + (slot2 - bw2) / 2, bh = (rev[i] / maxR) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = i === 4 ? pal.c2 : pal.c1; roundRect(ctx, x, yt, bw2, bh, 5); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + rev[i].toFixed(2) + 'B', x + bw2 / 2, yt - 6);
     ctx.fillStyle = pal.tick; ctx.fillText(y, x + bw2 / 2, pad.top + ph + 20);
     hitRegions.chartCh1.push({ x: x, y: yt, w: bw2, h: bh, html: '<strong>' + y + ' 总营收</strong><br/>$' + rev[i].toFixed(2) + 'B' });
    });
   }
  }

  function drawRadarChart() {
   var env = prepCanvas('chartRadar'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartRadar = [];
   var axes = ['全栈工艺广度', '客户共创深度', '服务年金粘性', '全球制造协同', '研发转化效率'], cx = w / 2, cy = h / 2 + 8, radius = Math.max(62, Math.min((w - 200) / 2, h * 0.35));
   var series = [
    { key: 'amat', color: pal.c1, fill: 'rgba(51,153,255,0.24)', vals: [9.8, 9.6, 9.4, 9.5, 9.2] },
    { key: 'asml', color: pal.c2, fill: 'rgba(34,197,94,0.16)', vals: [6.5, 9.8, 9.5, 8.8, 9.6] },
    { key: 'lrcx', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [7.6, 8.6, 9.2, 8.7, 9.3] }
   ];
   for (var ring = 2; ring <= 10; ring += 2) {
    var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.beginPath();
    for (var i = 0; i < 5; i++) { var ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5, px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
    ctx.closePath(); ctx.stroke();
   }
   for (var a = 0; a < 5; a++) {
    var ang2 = -Math.PI / 2 + (a * 2 * Math.PI) / 5, ax = cx + Math.cos(ang2) * radius, ay = cy + Math.sin(ang2) * radius;
    ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
    ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = Math.abs(Math.cos(ang2)) < 0.2 ? 'center' : (Math.cos(ang2) > 0 ? 'left' : 'right');
    ctx.fillText(axes[a], cx + Math.cos(ang2) * (radius + 14), cy + Math.sin(ang2) * (radius + 15));
   }
   series.forEach(function (s) {
    if (!state.radarSeries[s.key]) return;
    ctx.beginPath();
    s.vals.forEach(function (v, idx) { var th = -Math.PI / 2 + (idx * 2 * Math.PI) / 5, d = (v / 10) * radius, vx = cx + Math.cos(th) * d, vy = cy + Math.sin(th) * d; if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy); });
    ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
   });
  }

  function drawHorizontalBars() {
   var env = prepCanvas('chartBars'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartBars = [];
   var items = [
    { lbl: 'Semiconductor Systems 毛利率 (FY26)', v: 54.9, c: pal.c2 },
    { lbl: 'AMAT 全集团 GAAP 综合毛利率 (FY26)', v: 50.0, c: pal.c1 },
    { lbl: 'Applied Global Services 毛利率 (FY26)', v: 35.0, c: pal.c4 },
    { lbl: 'AMAT 全集团 GAAP 营业利润率 (FY26)', v: 32.2, c: pal.c1 },
    { lbl: '研发投入占总营收比重 (R&D / Rev)', v: 12.1, c: pal.c4 },
    { lbl: '销管费用占总营收比重 (SG&A / Rev)', v: 4.9, c: pal.c3 }
   ];
   var pad = { top: 12, right: 20, bottom: 24, left: 20 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, rowH = ph / items.length;
   items.forEach(function (it, i) {
    var top = pad.top + i * rowH, bw = (it.v / 62) * pw;
    ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.lbl, pad.left, top + 16);
    ctx.fillStyle = it.c; ctx.font = 'bold 12px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(it.v.toFixed(1) + '%', pad.left + pw, top + 16);
    ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, top + 24, pw, 13, 6); ctx.fill();
    ctx.fillStyle = it.c; roundRect(ctx, pad.left, top + 24, bw, 13, 6); ctx.fill();
    hitRegions.chartBars.push({ x: pad.left, y: top, w: pw, h: rowH, html: '<strong>' + it.lbl + '</strong><br/>' + it.v.toFixed(1) + '%' });
   });
  }

  function drawEpsComboChart() {
   var env = prepCanvas('chartEps'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartEps = [];
   var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26'], net = [6.53, 6.86, 7.18, 7.00, 10.09], gm = [46.5, 46.7, 47.5, 48.7, 50.0];
   var pad = { top: 26, right: 50, bottom: 40, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, slot = pw / 5, bw = Math.min(44, slot * 0.45);
   for (var g = 0; g <= 3; g++) { var gy = pad.top + ph - (g / 3) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); }
   var pts = [];
   yrs.forEach(function (y, i) {
    var cx = pad.left + i * slot + slot / 2, bh = (net[i] / 12) * ph, yt = pad.top + ph - bh;
    ctx.fillStyle = i === 4 ? pal.c2 : pal.c1; roundRect(ctx, cx - bw / 2, yt, bw, bh, 5); ctx.fill();
    ctx.fillStyle = '#FFF'; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + net[i].toFixed(2) + 'B', cx, yt + 16);
    ctx.fillStyle = pal.text; ctx.fillText(y, cx, pad.top + ph + 20);
    pts.push({ x: cx, y: pad.top + ph - ((gm[i] - 44) / 7) * ph, gm: gm[i] });
    hitRegions.chartEps.push({ x: cx - slot / 2, y: pad.top, w: slot, h: ph, html: '<strong>' + y + '</strong><br/>GAAP 净利: $' + net[i].toFixed(2) + 'B<br/>GAAP 毛利率: ' + gm[i].toFixed(1) + '%' });
   });
   ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
   pts.forEach(function (p, i) { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }); ctx.stroke();
   pts.forEach(function (p) { ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.fillText(p.gm.toFixed(1) + '%', p.x, p.y - 9); });
  }

  function drawSimChart() {
   var env = prepCanvas('chartSim'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   var p = state.sim.principal, yrs = state.sim.years, r0 = state.sim.priceCagr / 100, r1 = (state.sim.priceCagr + (state.sim.drip ? 2.5 : 0)) / 100;
   var arr = []; for (var y = 0; y <= yrs; y++) arr.push(p * Math.pow(1 + r1, y));
   var maxV = arr[yrs] * 1.08, pad = { top: 18, right: 18, bottom: 24, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
   ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.5; ctx.beginPath();
   arr.forEach(function (v, i) { var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
   ctx.stroke();
  }
  function updateSimulatorUI() {
   var p = state.sim.principal, yrs = state.sim.years, totRate = (state.sim.priceCagr + (state.sim.drip ? 2.5 : 0)) / 100;
   var endV = p * Math.pow(1 + totRate, yrs), midY = Math.max(1, Math.floor(yrs / 2)), midV = p * Math.pow(1 + totRate, midY);
   document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString();
   document.getElementById('simYearsLabel').textContent = yrs + ' 年';
   document.getElementById('simCagrLabel').textContent = state.sim.priceCagr.toFixed(1) + '%';
   document.getElementById('simEndingVal').textContent = '$' + Math.round(endV).toLocaleString();
   document.getElementById('simMoicVal').textContent = (endV / p).toFixed(2) + 'x · ' + (totRate * 100).toFixed(2) + '%';
   document.getElementById('simNetGainVal').textContent = '$' + Math.round(endV - p).toLocaleString();
   document.getElementById('simMidLabel').textContent = '第 ' + midY + ' 年中期资产节点';
   document.getElementById('simMidVal').textContent = '$' + Math.round(midV).toLocaleString();
   drawSimChart();
  }
  function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

  function init() {
   try { var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null'); if (Array.isArray(sc) && sc.length === 6) state.checks = sc; } catch (e) {}
   renderPeerTable(); renderChecklist(); updateSimulatorUI(); renderAllCharts();

   document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
    if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
    else { document.documentElement.toggleAttribute('data-sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
   });
   document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });
   document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
   document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
   document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
   document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
   document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });
   document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
   document.getElementById('sideExportBtn')?.addEventListener('click', function () {
    var url = URL.createObjectURL(new Blob(['<!doctype html>\n', document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
    var a = document.createElement('a'); a.href = url; a.download = 'Applied_Materials_Corporate_Culture_Analysis.html'; a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500); showToast('已导出独立网页文件');
   });

   document.querySelectorAll('[data-ch1-view]').forEach(function (b) {
    b.addEventListener('click', function () { state.ch1View = this.getAttribute('data-ch1-view'); document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA'); document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB'); drawCh1Chart(); });
   });
   document.querySelectorAll('[data-collapse-target]').forEach(function (b) {
    b.addEventListener('click', function () { document.getElementById(this.getAttribute('data-collapse-target')).classList.toggle('open'); });
   });
   document.querySelectorAll('[data-pillar]').forEach(function (b) {
    b.addEventListener('click', function () {
     var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0; state.activePillar = idx;
     document.querySelectorAll('[data-pillar]').forEach(function (c, i) { c.classList.toggle('active', i === idx); });
     document.getElementById('pillarFocusNote').innerHTML = '<div>' + PILLAR_NOTES[idx] + '</div>';
    });
   });
   document.querySelectorAll('[data-radar-key]').forEach(function (b) {
    b.addEventListener('click', function () { var k = this.getAttribute('data-radar-key'); state.radarSeries[k] = !state.radarSeries[k]; this.classList.toggle('muted', !state.radarSeries[k]); drawRadarChart(); });
   });
   document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
   document.querySelectorAll('[data-peer-filter]').forEach(function (b) {
    b.addEventListener('click', function () { state.peerFilter = this.getAttribute('data-peer-filter'); document.querySelectorAll('[data-peer-filter]').forEach(function (x) { x.classList.toggle('active', x === b); }); renderPeerTable(); });
   });

   var PRESETS = { p1: { p: 10000, y: 13, c: 24.0, d: true }, p2: { p: 10000, y: 10, c: 12.5, d: true }, p3: { p: 10000, y: 10, c: 8.0, d: true } };
   document.querySelectorAll('[data-preset]').forEach(function (b) {
    b.addEventListener('click', function () {
     var pr = PRESETS[this.getAttribute('data-preset')]; if (!pr) return;
     state.sim.principal = pr.p; state.sim.years = pr.y; state.sim.priceCagr = pr.c; state.sim.drip = pr.d;
     document.querySelectorAll('[data-preset]').forEach(function (x) { x.classList.toggle('active', x === b); });
     document.getElementById('simPrincipalSlider').value = pr.p; document.getElementById('simYearsSlider').value = pr.y; document.getElementById('simCagrSlider').value = pr.c; document.getElementById('simDripToggle').checked = pr.d;
     updateSimulatorUI();
    });
   });
   document.getElementById('simPrincipalSlider').addEventListener('input', function () { state.sim.principal = parseFloat(this.value); updateSimulatorUI(); });
   document.getElementById('simYearsSlider').addEventListener('input', function () { state.sim.years = parseInt(this.value, 10); updateSimulatorUI(); });
   document.getElementById('simCagrSlider').addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value); updateSimulatorUI(); });
   document.getElementById('simDripToggle').addEventListener('change', function () { state.sim.drip = this.checked; updateSimulatorUI(); });

   document.getElementById('checklistContainer').addEventListener('change', function (e) {
    var inp = e.target.closest('[data-check-input]'); if (!inp) return;
    state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = inp.checked;
    try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
    renderChecklist();
   });
   document.getElementById('checkAllBtn').addEventListener('click', function () { state.checks = [true, true, true, true, true, true]; renderChecklist(); showToast('已全部勾选'); });
   document.getElementById('resetCheckBtn').addEventListener('click', function () { state.checks = [true, true, true, false, false, false]; renderChecklist(); showToast('已重置清单'); });

   window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });
   window.addEventListener('resize', function () { setTimeout(renderAllCharts, 80); });
  }
  init();
 })();
 