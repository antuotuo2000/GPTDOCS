
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_CHECK_KEY = 'mui_abt_culture_checks_v1';

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 临床循证与患者生命敬畏）：</strong>医疗器械容错率为零。雅培 2026 年连续拿下 Libre Duo、TactiFlex Duo、SimpleScreen CRC 等重磅 FDA 批文，正是长期临床循证文化的集中兑现。',
 '<strong>当前选中支柱解读（02 战时跨界动员力）：</strong>2020 年 Robert Ford 紧急抽调跨部门科学家与产线交付逾 4 亿份 BinaxNOW 快检，证明雅培在平时的专业分工之下拥有极强的应急协同弹性。',
 '<strong>当前选中支柱解读（03 自我革新的分拆魄力）：</strong>从 2013 年分拆艾伯维到 2026 年宣布分拆 $85 亿营养品，雅培管理层始终把“长期资本回报率”置于“帝国规模虚荣”之上。',
 '<strong>当前选中支柱解读（04 人文关怀与多元 STEM 梯队）：</strong>138 年雇主品牌与完善的员工关怀体系，确保了高壁垒研发科学家与全球商业化团队的长期稳定传承。'
 ];

 var PEER_ROWS = [
 { category: 'diversified', benchmark: true, company: '研究基准：雅培 (Abbott · ABT)', leader: 'Miles White / Robert B. Ford', positioning: '四象限联邦 + 2027 聚焦器械/诊断/EPD', culture: '临床循证 + 战时动员 + 敢于分拆进化', headcount: '12.2万人 (分拆后10.6万) · 160+国', margins: 'FY25 $44.3B · Adj. GM 56.7% · 54年股息王', verdict: '兼顾高成长 MedTech 创新与稳健现金流分红的常青树标杆。', sourceLabel: 'SEC Q3 2026', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1800/000162828026066601/abt-2026q3xexhibitx991.htm' },
 { category: 'diversified', benchmark: false, company: '丹纳赫 (Danaher · DHR)', leader: 'Rainer Blair', positioning: 'DBS 精益运营体系 + 并购驱动生命科学平台', culture: '极致 Kaizen 持续改善 + 赋能并购标的', headcount: '~6.3万人 · 全球生命科学龙头', margins: '~$24B+ 营收 · ~59% 毛利率', verdict: '强于“并购后精益运营榨取利润”，雅培则更强于内部原创重磅单品（Libre）与分拆孵化。', sourceLabel: 'Peer Data', sourceUrl: 'https://businessquant.com/metrics/mmed/gross-profit' },
 { category: 'diversified', benchmark: false, company: '美敦力 (Medtronic · MDT)', leader: 'Geoff Martha', positioning: '全球综合器械巨头 + 2026 分拆 MiniMed', culture: '工程驱动 + 投资组合简化（剥离糖尿病）', headcount: '~9.5万人 · 全球院内主渠道', margins: '~$34B+ 营收 · ~65% 毛利率', verdict: '同样在 2026 年做减法（分拆糖尿病），而雅培则保留高增长 Libre 并做加法拿下 Exact Sciences。', sourceLabel: 'MedDeviceGuide', sourceUrl: 'https://meddeviceguide.com/blog/top-medical-device-companies-2026-revenue-rankings-guide' },
 { category: 'focused', benchmark: false, company: '波士顿科学 (Boston Scientific · BSX)', leader: 'Mike Mahoney', positioning: '纯血高成长介入心血管与电生理', culture: '激进创新 + 专科医生深度绑定', headcount: '~5万人 · 心血管介入聚焦', margins: '~$20B 营收 · ~70%+ 毛利率', verdict: '赛道极度聚焦带来高估值溢价，雅培正通过 Volt PFA 与分拆营养品向其估值倍数靠拢。', sourceLabel: 'Market Data', sourceUrl: 'https://www.clearadmit.com/livewire/' },
 { category: 'focused', benchmark: false, company: '史赛克 (Stryker · SYK)', leader: 'Kevin Lobo', positioning: '骨科手术机器人 (MAKO) + 医疗外科', culture: '强销售执行力 + 机器人生态锁定', headcount: '~5.2万人 · 骨科与门诊中心', margins: '~$24B+ 营收 · ~64% 毛利率', verdict: '骨科机器人耗材飞轮与雅培 Alinity/EnSite X 院内锁死逻辑异曲同工。', sourceLabel: 'MedDeviceGuide', sourceUrl: 'https://meddeviceguide.com/blog/top-medical-device-companies-2026-revenue-rankings-guide' }
 ];

 var CHECKLIST_ITEMS = [
 { tag: '临床循证', title: '1. 临床数据与监管铁律测试：新品是否具备不可替代的 FDA/CE 壁垒？', desc: '核查核心产品是否经过严谨多中心临床试验背书（如 Libre Duo、Volt PFA、TriClip）。' },
 { tag: '耗材飞轮', title: '2. 剃须刀+耗材复购测试：装机后能否持续产生高毛利经常性消耗？', desc: '检验是否存在 14 天一换的传感器、一次性手术导管或封闭试剂盒锁定。' },
 { tag: '组合进化', title: '3. 自我新陈代谢测试：管理层是否有魄力分拆成熟资产、并购高成长赛道？', desc: '对标 2013 分拆艾伯维与 2026 并购 Exact + 分拆营养品，拒绝沉溺帝国规模虚荣。' },
 { tag: '渠道复用', title: '4. 全球商业化杠杆测试：新产品能否瞬间接入既有国际网络放量？', desc: '检验总部是否具备 160+ 国医保准入与医院渠道能力为并购标的赋能。' },
 { tag: '危机敏捷', title: '5. 战时跨界动员测试：极端需求下能否快速重构研发与供应链？', desc: '考察组织在突发公共卫生事件或供应链冲击下的跨部门协同响应速度。' },
 { tag: '股息纪律', title: '6. 现金流与股东回报测试：经营现金流能否长期覆盖研发与分红增长？', desc: '对标连续 54 年上调股息的股息王纪录，检验盈利含金量。' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 13, priceCagr: 11.5, drip: true },
 p2: { principal: 10000, years: 10, priceCagr: 10.5, drip: true },
 p3: { principal: 10000, years: 20, priceCagr: 7.5, drip: true }
 };

 var state = { lang: 'zh', theme: 'dark', ch1View: 'viewA', activePillar: 0, radarSeries: { abt: true, dhr: true, legacy: true }, peerFilter: 'all', peerQuery: '', sim: { principal: 10000, years: 13, priceCagr: 11.5, drip: true, preset: 'p1' }, checks: [true, true, true, false, false, false] };
 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };

 function showToast(msg) {
 var el = document.getElementById('muiSnackbar'); if (!el) return;
 el.textContent = msg; el.classList.add('show');
 clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 2400);
 }
 function getPalette() {
 var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
 return { isDark: isDark, grid: isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)', tick: isDark ? '#94A3B8' : '#475569', text: isDark ? '#F3F6F9' : '#0F1924', sub: isDark ? '#B2BAC2' : '#334155', pillBg: isDark ? 'rgba(9,13,22,0.88)' : 'rgba(255,255,255,0.94)', c1: '#3399FF', c2: '#22C55E', c3: '#FFB74D', c4: '#A78BFA' };
 }
 function prepareCanvas(id) {
 var c = document.getElementById(id); if (!c || !c.parentElement) return null;
 var r = c.parentElement.getBoundingClientRect(), w = Math.max(240, Math.floor(r.width)), h = Math.max(170, Math.floor(r.height)), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h, canvas: c };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.ch1View === 'viewA') {
 var lbls = ['医疗器械', '诊断业务', '营养品(拟分拆)', '成熟药品 EPD'];
 var fy25 = [21.39, 8.94, 8.45, 5.54];
 var maxY = 24;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var sl = pw / lbls.length, bw = Math.min(54, sl * 0.48);
 lbls.forEach(function (lb, i) {
 var x = pad.left + i * sl + (sl - bw) / 2, bh = (fy25[i] / maxY) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 0 ? pal.c1 : (i === 1 ? pal.c4 : (i === 2 ? pal.c3 : pal.c2));
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + fy25[i].toFixed(2) + 'B', x + bw / 2, yt - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.fillText(lb, x + bw / 2, pad.top + ph + 20);
 hitRegions.chartCh1.push({ x: x, y: yt, w: bw, h: bh, html: '<strong>' + lb + '</strong><br/>FY2025 净营收: $' + fy25[i].toFixed(2) + 'B' });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26(年化)'];
 var opm = [21.3, 16.2, 16.3, 18.2, 19.0];
 var maxO = 25;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxO / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(kv.toFixed(0) + '%', pad.left - 8, ky + 4);
 }
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 opm.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / maxO) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 opm.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / maxO) * ph;
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.fillText(yrs[i], px, pad.top + ph + 20);
 hitRegions.chartCh1.push({ x: px - 14, y: py - 14, w: 28, h: 28, html: '<strong>' + yrs[i] + '</strong><br/>GAAP 营业利润率: ' + v.toFixed(1) + '%' });
 });
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = ['临床循证壁垒', '危机战时敏捷', '并购分拆魄力', '160国渠道复用', '股东股息纪律'];
 var series = [
 { key: 'abt', color: pal.c1, fill: 'rgba(51,153,255,0.22)', vals: [9.5, 9.2, 9.6, 9.5, 9.8] },
 { key: 'dhr', color: pal.c2, fill: 'rgba(34,197,94,0.16)', vals: [8.8, 8.2, 9.7, 8.6, 7.2] },
 { key: 'legacy', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [8.9, 6.2, 6.4, 8.4, 8.0] }
 ];
 var cx = w / 2, cy = h / 2 + 6, radius = Math.max(60, Math.min(w * 0.3, h * 0.34)), total = 5;
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total, px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.closePath(); ctx.stroke();
 }
 axes.forEach(function (ax, a) {
 var ang = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius); ctx.stroke();
 var lx = cx + Math.cos(ang) * (radius + 16), ly = cy + Math.sin(ang) * (radius + 16);
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = Math.abs(Math.cos(ang)) < 0.2 ? 'center' : (Math.cos(ang) > 0 ? 'left' : 'right');
 ctx.fillText(ax, lx, ly);
 });
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 s.vals.forEach(function (v, idx) {
 var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total, d = (v / 10) * radius;
 if (idx === 0) ctx.moveTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d); else ctx.lineTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d);
 });
 ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.2; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var items = [
 { label: 'FY2025 经调整综合毛利率 (Adj. GM)', val: 56.7, col: pal.c1 },
 { label: 'Q3 2026 诊断板块报告增速 (含 Exact Sciences)', val: 46.7, col: pal.c4 },
 { label: 'FY2025 医疗器械占总营收比重', val: 48.2, col: pal.c2 },
 { label: 'FY2025 GAAP 营业利润率 (Operating Margin)', val: 18.2, col: pal.c1 },
 { label: 'FY2025 Diabetes Care 糖尿病护理增速', val: 17.5, col: pal.c2 },
 { label: '9M 2026 电生理 Electrophysiology 增速', val: 15.2, col: pal.c3 }
 ];
 var pad = { top: 10, right: 24, bottom: 24, left: 20 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, rowH = ph / items.length;
 items.forEach(function (it, i) {
 var ry = pad.top + i * rowH, bw = (it.val / 65) * pw;
 ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.label, pad.left, ry + 16);
 ctx.fillStyle = it.col; ctx.font = 'bold 11.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, ry + 16);
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, ry + 24, pw, 12, 6); ctx.fill();
 ctx.fillStyle = it.col; roundRect(ctx, pad.left, ry + 24, bw, 12, 6); ctx.fill();
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var yrs = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026E'];
 var revB = [43.65, 40.11, 41.95, 44.33, 50.50];
 var pad = { top: 28, right: 24, bottom: 40, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxR = 56;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxR / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var sl = pw / yrs.length, bw = Math.min(46, sl * 0.48);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sl + (sl - bw) / 2, bh = (revB[i] / maxR) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.c2 : pal.c1;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + revB[i].toFixed(1) + 'B', x + bw / 2, yt - 7);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 });
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var p = state.sim.principal, yrs = state.sim.years, priceR = state.sim.priceCagr / 100, totR = (state.sim.priceCagr + (state.sim.drip ? 2.4 : 0)) / 100;
 var totArr = [], prArr = [];
 for (var y = 0; y <= yrs; y++) { totArr.push(p * Math.pow(1 + totR, y)); prArr.push(p * Math.pow(1 + priceR, y)); }
 var maxV = Math.max(totArr[yrs], p * 1.2) * 1.08, pad = { top: 18, right: 18, bottom: 24, left: 56 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 totArr.forEach(function (v, i) { var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.6; ctx.beginPath();
 prArr.forEach(function (v, i) { var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke(); ctx.setLineDash([]);
 }

 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }
 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = PEER_ROWS.filter(function (r) {
 return (state.peerFilter === 'all' || r.category === state.peerFilter) && (!q || (r.company + r.leader + r.positioning + r.culture + r.verdict).toLowerCase().indexOf(q) !== -1);
 });
 if (badge) badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '"><td><strong>' + r.company + '</strong><br/><span style="font-size:0.75rem;color:var(--text-muted);">' + r.leader + '</span></td><td>' + r.positioning + '</td><td>' + r.culture + '</td><td class="mono">' + r.headcount + '</td><td class="mono" style="color:var(--mui-primary-lighter);font-weight:700;">' + r.margins + '</td><td>' + r.verdict + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank">' + r.sourceLabel + ' ↗</a></td></tr>';
 }).join('');
 }
 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr, totR = (cagr + (state.sim.drip ? 2.4 : 0)) / 100;
 var endV = p * Math.pow(1 + totR, yrs), midY = Math.max(1, Math.floor(yrs / 2)), midV = p * Math.pow(1 + totR, midY);
 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString();
 document.getElementById('simYearsLabel').textContent = yrs + ' 年';
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = '$' + Math.round(endV).toLocaleString();
 document.getElementById('simMoicVal').textContent = (endV / p).toFixed(2) + 'x · ' + (totR * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = '$' + Math.round(endV - p).toLocaleString();
 document.getElementById('simMidLabel').textContent = '第 ' + midY + ' 年中期资产节点';
 document.getElementById('simMidVal').textContent = '$' + Math.round(midV).toLocaleString();
 document.querySelectorAll('[data-preset]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-preset') === state.sim.preset); });
 drawSimChart();
 }
 function renderChecklist() {
 var c = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
 if (!c) return;
 var done = state.checks.filter(Boolean).length, pct = Math.round((done / CHECKLIST_ITEMS.length) * 100);
 if (chip) chip.textContent = '已核查 ' + done + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)';
 if (bar) bar.style.width = pct + '%';
 c.innerHTML = CHECKLIST_ITEMS.map(function (it, idx) {
 var chk = !!state.checks[idx];
 return '<label class="check-card ' + (chk ? 'checked' : '') + '"><input type="checkbox" data-check-input="' + idx + '" ' + (chk ? 'checked' : '') + ' /><div style="flex:1;"><div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + it.title + '</span><span class="mui-chip mono">' + it.tag + '</span></div><p class="check-desc">' + it.desc + '</p></div></label>';
 }).join('');
 }

 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var sD = document.getElementById('sideThemeDarkBtn'), sL = document.getElementById('sideThemeLightBtn');
 if (sD && sL) { sD.classList.toggle('active', state.theme === 'dark'); sL.classList.toggle('active', state.theme === 'light'); }
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式');
 }

 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
 else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });

 document.querySelectorAll('[data-ch1-view]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.ch1View = b.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-pillar]').forEach(function (b) {
 b.addEventListener('click', function () {
 var idx = parseInt(b.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 document.querySelectorAll('[data-pillar]').forEach(function (x, i) { x.classList.toggle('active', i === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + PILLAR_NOTES[idx] + '</div>';
 });
 });
 document.querySelectorAll('[data-radar-key]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = b.getAttribute('data-radar-key'); state.radarSeries[k] = !state.radarSeries[k];
 b.classList.toggle('muted', !state.radarSeries[k]); drawRadarChart();
 });
 });
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 document.querySelectorAll('[data-peer-filter]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.peerFilter = b.getAttribute('data-peer-filter');
 document.querySelectorAll('[data-peer-filter]').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderPeerTable();
 });
 });
 ['simPrincipalSlider', 'simYearsSlider', 'simCagrSlider'].forEach(function (id, idx) {
 document.getElementById(id).addEventListener('input', function () {
 if (idx === 0) state.sim.principal = parseFloat(this.value);
 if (idx === 1) state.sim.years = parseInt(this.value, 10);
 if (idx === 2) state.sim.priceCagr = parseFloat(this.value);
 state.sim.preset = ''; updateSimulatorUI();
 });
 });
 document.getElementById('simDripToggle').addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var cfg = PRESETS[b.getAttribute('data-preset')]; if (!cfg) return;
 state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = b.getAttribute('data-preset');
 document.getElementById('simPrincipalSlider').value = cfg.principal;
 document.getElementById('simYearsSlider').value = cfg.years;
 document.getElementById('simCagrSlider').value = cfg.priceCagr;
 document.getElementById('simDripToggle').checked = cfg.drip;
 updateSimulatorUI();
 });
 });
 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]'); if (!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () { state.checks = [true, true, true, true, true, true]; renderChecklist(); showToast('已全部勾选'); });
 document.getElementById('resetCheckBtn').addEventListener('click', function () { state.checks = [true, true, true, false, false, false]; renderChecklist(); showToast('已重置清单'); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'Abbott_Corporate_Culture_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 window.addEventListener('scroll', function () {
 var d = document.documentElement, pct = Math.min(100, Math.max(0, (window.scrollY / Math.max(1, d.scrollHeight - window.innerHeight)) * 100));
 document.getElementById('readingProgressBar').style.width = pct + '%';
 }, { passive: true });
 window.addEventListener('resize', function () { setTimeout(renderAllCharts, 60); });

 
 function applyLanguage(lang) {
   var zh = lang !== 'en';
   document.documentElement.lang = zh ? 'zh-CN' : 'en';
   var bZh = document.getElementById('langZhBtn'), bEn = document.getElementById('langEnBtn');
   if (bZh) bZh.classList.toggle('active', zh);
   if (bEn) bEn.classList.toggle('active', !zh);
   var q = document.getElementById('quickJumpInput');
   if (q) q.placeholder = zh ? '检索章节或指标…' : 'Search sections or KPIs…';
   if (typeof showToast === 'function') showToast(zh ? '已切换至中文视图' : 'Switched to English UI chrome (EN)');
 }
 ['langZhBtn', 'langEnBtn'].forEach(function (id) {
   var el = document.getElementById(id);
   if (el) el.addEventListener('click', function () { applyLanguage(el.getAttribute('data-lang')); });
 });

 try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); } catch (e) {}
 renderPeerTable(); renderChecklist(); updateSimulatorUI(); renderAllCharts();
 })();
 