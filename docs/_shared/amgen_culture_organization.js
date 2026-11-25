
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1', STORAGE_CHECK_KEY = 'mui_amgn_culture_checks_v1';
 var state = { lang: 'zh', theme: 'dark', ch1View: 'viewA', activePillar: 0, radarSeries: { amgn: true, lly: true, pharma: true }, peerFilter: 'all', peerQuery: '', sim: { principal: 10000, years: 14, priceCagr: 11.2, drip: true, preset: 'p1' }, checks: [true, true, true, false, false, false] };
 var hitRegions = { chartCh1: [], chartRadar: [], chartSim: [] };

 function showToast(m) { var el = document.getElementById('muiSnackbar'); if (!el) return; el.textContent = m; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 2200); }
 function getPalette() {
 var d = state.theme === 'dark';
 return { isDark: d, grid: d ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)', tick: d ? '#94A3B8' : '#475569', text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', pillBg: d ? 'rgba(9,13,22,0.88)' : 'rgba(255,255,255,0.94)', c1: d ? '#3399FF' : '#0073E6', c2: d ? '#22C55E' : '#16A34A', c3: d ? '#FFB74D' : '#D97706' };
 }
 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var l = document.getElementById('sideThemeLightBtn'), d = document.getElementById('sideThemeDarkBtn');
 if (l && d) { l.classList.toggle('active', state.theme === 'light'); d.classList.toggle('active', state.theme === 'dark'); }
 renderAllCharts(); if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }
 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh'; document.documentElement.setAttribute('lang', state.lang === 'en' ? 'en' : 'zh-CN');
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh'); document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) { var v = el.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (v !== null) el.textContent = v; });
 renderPeerTable(); renderChecklist(); renderAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var PEER_ROWS = [
 { category: 'biotech', benchmark: true, company: '研究基准：安进 (Amgen · AMGN)', leader: 'Robert Bradway (CEO) / Jay Bradner (R&D)', positioning: 'deCODE 人类遗传学 + 四大科室 + 生物类似药', culture: 'To Serve Patients · 以科学为本 · 质量一票否决', headcount: '31,500 FTEs · $1.17M 人均创收', margins: 'FY25 $36.8B (26E ~$39.3B) · 47.3% NG-OPM', verdict: '最均衡的独立生物技术蓝筹：多引擎抵御专利悬崖，兼具高股息复利与 MariTide 大期权。' },
 { category: 'pharma', benchmark: false, company: '礼来 (Eli Lilly · LLY)', leader: 'David Ricks (CEO)', positioning: '代谢/GLP-1 双靶点 + 神经退行性阿尔茨海默', culture: '高风险高赔率押注 + 极致商业化扩张', headcount: '~47,000+ FTEs · $1.73M 人均创收', margins: 'FY25 $65.2B (+45%) · 26.4% 净利率', verdict: '当前全球增长最猛的医药市值王者，但 Mounjaro/Zepbound 占营收高达 56%，单品集中度远高于安进。' },
 { category: 'biotech', benchmark: false, company: '再生元 (Regeneron · REGN)', leader: 'Leonard Schleifer &amp; George Yancopoulos', positioning: 'VelociGene 小鼠抗体平台 + 科学家创始人治企', culture: '“科学家说了算”的极致学术氛围', headcount: '15,410 FTEs (2025)', margins: '高毛利眼科与自免双核驱动', verdict: '同为原生 Biotech 典范，但安进规模逾其两倍且已凭 Pavblu 正面抢占再生元 Eylea 份额。' },
 { category: 'pharma', benchmark: false, company: '艾伯维 (AbbVie · ABBV)', leader: 'Robert Michael (CEO)', positioning: '自免迭代 (Skyrizi/Rinvoq) + 医美神经', culture: '商业执行铁军 + 大型并购整合', headcount: '~55,000+ FTEs', margins: 'FY25 $61.2B · ~70% GM', verdict: '成功穿越 Humira 悬崖的标杆，与安进收购 Horizon 后平滑过渡 Prolia/Xgeva 路径高度可比。' }
 ];
 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge'); if (!tbody) return;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = PEER_ROWS.filter(function (r) {
 if (state.peerFilter !== 'all' && r.category !== state.peerFilter) return false;
 return !q || (r.company + r.leader + r.positioning + r.culture + r.verdict).toLowerCase().indexOf(q) !== -1;
 });
 if (badge) badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆药企';
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '"><td><strong style="color:var(--text-primary);display:block;">' + r.company + '</strong><span style="font-size:0.75rem;color:var(--text-muted);">' + r.leader + '</span></td><td>' + r.positioning + '</td><td>' + r.culture + '</td><td class="mono" style="font-size:0.78rem;">' + r.headcount + '</td><td class="mono" style="font-size:0.78rem;color:var(--mui-primary-lighter);font-weight:700;">' + r.margins + '</td><td>' + r.verdict + '</td></tr>';
 }).join('');
 }

 var CHECKLIST_ITEMS = [
 { tag: '科学因果', title: '1. “以科学为本”测试：靶点立项是否具备人类遗传学因果验证？', desc: '核查管线是否依托真实人群基因组数据（如 deCODE），而非盲目跟风热门靶点拥挤内卷。' },
 { tag: '质量红线', title: '2. 质量一票否决测试：商业竞速是否严守生产与临床伦理底线？', desc: '检验“Compete Intensely”是否与“Ensure Quality”并行，确保无菌生物制剂零重大合规瑕疵。' },
 { tag: '平台抗周期', title: '3. 多引擎抗悬崖测试：是否拥有 10 款以上十亿美元级跨科室品种？', desc: '评估单品专利到期时，其余板块的处方销量增长能否自然填补缺口。' },
 { tag: '快速止损', title: '4. 研发纪律测试：管理层能否果断砍掉劣势临床项目？', desc: '观察是否及时终止性价比低的早研分子（如 AMG 513），将资金集中投向高胜率 III 期。' },
 { tag: '产能自给', title: '5. 生物制造护城河测试：是否掌握自主规模化原液与自动化灌装？', desc: '评估重磅减重与双抗放量时，是否拥有本土可控供应链而非受制于外部 CDMO。' },
 { tag: '股东回报', title: '6. 资本配置测试：并购后能否迅速去杠杆并保持长期股息递增？', desc: '核查自由现金流转化率及连续分红纪录（安进连续 14 年上调季度股息）。' }
 ];
 function renderChecklist() {
 var c = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar'); if (!c) return;
 var done = state.checks.filter(Boolean).length, pct = Math.round((done / CHECKLIST_ITEMS.length) * 100);
 if (chip) chip.textContent = '已核查 ' + done + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)';
 if (bar) bar.style.width = pct + '%';
 c.innerHTML = CHECKLIST_ITEMS.map(function (it, idx) {
 return '<label class="check-card ' + (state.checks[idx] ? 'checked' : '') + '"><input type="checkbox" data-check-input="' + idx + '" ' + (state.checks[idx] ? 'checked' : '') + ' /><div style="flex:1;"><div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + it.title + '</span><span class="mui-chip mono">' + it.tag + '</span></div><p class="check-desc">' + it.desc + '</p></div></label>';
 }).join('');
 }

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c || !c.parentElement) return null;
 var r = c.parentElement.getBoundingClientRect(), w = Math.max(240, Math.floor(r.width)), h = Math.max(170, Math.floor(r.height)), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) { var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }

 function drawCh1Chart() {
 var env = prepCanvas('chartCh1'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E(中值)'];
 if (state.ch1View === 'viewA') {
 var rev = [26.32, 28.19, 33.42, 36.75, 39.30], maxY = 45, slot = pw / yrs.length, bw = Math.min(44, slot * 0.54);
 for (var g = 0; g <= 4; g++) { var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4); }
 yrs.forEach(function (y, i) { var x = pad.left + i * slot + (slot - bw) / 2, bh = (rev[i] / maxY) * ph, yt = pad.top + ph - bh; ctx.fillStyle = i >= 3 ? pal.c2 : pal.c1; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill(); ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + rev[i].toFixed(1) + 'B', x + bw / 2, yt - 6); ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20); });
 } else {
 var emp = [25.2, 26.7, 28.0, 31.5, 32.0], maxE = 38, slot2 = pw / yrs.length, bw2 = Math.min(44, slot2 * 0.54);
 for (var k = 0; k <= 4; k++) { var kv = (maxE / 4) * k, ky = pad.top + ph - (k / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(kv.toFixed(0) + 'k', pad.left - 8, ky + 4); }
 yrs.forEach(function (y, i) { var x = pad.left + i * slot2 + (slot2 - bw2) / 2, bh = (emp[i] / maxE) * ph, yt = pad.top + ph - bh; ctx.fillStyle = pal.c1; roundRect(ctx, x, yt, bw2, bh, 6); ctx.fill(); ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(emp[i].toFixed(1) + 'k', x + bw2 / 2, yt - 6); ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(y, x + bw2 / 2, pad.top + ph + 20); });
 }
 }

 function drawRadarChart() {
 var env = prepCanvas('chartRadar'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var axes = ['人类遗传学底座', '质量与制造壁垒', '多科室抗悬崖', '并购整合纪律', '高股息现金回报'];
 var series = [
 { key: 'amgn', color: '#3399FF', fill: 'rgba(51,153,255,0.22)', vals: [9.7, 9.5, 9.3, 9.0, 9.4] },
 { key: 'lly', color: '#22C55E', fill: 'rgba(34,197,94,0.16)', vals: [8.4, 8.6, 7.2, 8.5, 6.8] },
 { key: 'pharma', color: '#FFB74D', fill: 'rgba(255,183,77,0.14)', vals: [6.8, 7.8, 7.4, 6.5, 7.6] }
 ];
 var cx = w / 2, cy = h / 2 + 8, radius = Math.max(60, Math.min((w - 190) / 2, h * 0.35)), total = axes.length;
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < total; i++) { var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total, px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
 ctx.closePath(); ctx.stroke();
 }
 axes.forEach(function (ax, a) {
 var ang = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius); ctx.stroke();
 var lx = cx + Math.cos(ang) * (radius + 14), ly = cy + Math.sin(ang) * (radius + 14);
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = Math.abs(Math.cos(ang)) < 0.2 ? 'center' : (Math.cos(ang) > 0 ? 'left' : 'right'); ctx.fillText(ax, lx, ly);
 });
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 s.vals.forEach(function (v, idx) { var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total, d = (v / 10) * radius, vx = cx + Math.cos(th) * d, vy = cy + Math.sin(th) * d; if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy); });
 ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.2; ctx.stroke();
 });
 }

 function drawSimChart() {
 var env = prepCanvas('chartSim'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var p = state.sim.principal, yrs = state.sim.years, totalRate = (state.sim.priceCagr + (state.sim.drip ? 2.9 : 0)) / 100;
 var series = []; for (var y = 0; y <= yrs; y++) series.push(p * Math.pow(1 + totalRate, y));
 var maxV = Math.max(series[yrs], p * 1.2) * 1.08, pad = { top: 20, right: 18, bottom: 26, left: 56 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 series.forEach(function (v, i) { var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr, totalRate = (cagr + (state.sim.drip ? 2.9 : 0)) / 100;
 var endV = p * Math.pow(1 + totalRate, yrs), midY = Math.max(1, Math.floor(yrs / 2)), midV = p * Math.pow(1 + totalRate, midY);
 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString();
 document.getElementById('simYearsLabel').textContent = yrs + ' 年';
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = '$' + Math.round(endV).toLocaleString();
 document.getElementById('simMoicVal').textContent = (endV / p).toFixed(2) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = '$' + Math.round(endV - p).toLocaleString();
 document.getElementById('simMidLabel').textContent = '第 ' + midY + ' 年中期节点';
 document.getElementById('simMidVal').textContent = '$' + Math.round(midV).toLocaleString();
 document.querySelectorAll('[data-preset]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-preset') === state.sim.preset); });
 drawSimChart();
 }
 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawSimChart(); }

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 以科学为本）：</strong>安进内部招聘与晋升极度看重“用严谨实验与客观数据说话”，依托 deCODE 200+ PB 基因组数据库与 SAB 外部专家评审，确保研发资源精准聚焦高胜率靶点。',
 '<strong>当前选中支柱解读（02 质量与伦理不可妥协）：</strong>任何商业时间表都不得凌驾于临床安全性与生物制药无菌质控标准之上，这是安进赢得全球医生与 FDA 长期信任的基石。',
 '<strong>当前选中支柱解读（03 激烈竞争与快速止损）：</strong>“Compete Intensely and Win”既体现在斥资 $278亿 并购 Horizon 抢占罕见病高地，也体现在 2026 年果断关停劣势减重分子 AMG 513 聚焦 MariTide。',
 '<strong>当前选中支柱解读（04 团队协作与人才关怀）：</strong>通过福布斯认可的家庭友好福利与每年 2.4 万+小时志愿服务，保持全球 31,500 名员工的高科研留存与跨部门协同凝聚力。'
 ];
 document.getElementById('pillarStack').addEventListener('click', function (e) {
 var card = e.target.closest('[data-pillar]'); if (!card) return;
 state.activePillar = parseInt(card.getAttribute('data-pillar'), 10) || 0;
 document.querySelectorAll('[data-pillar]').forEach(function (c, idx) { c.classList.toggle('active', idx === state.activePillar); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + PILLAR_NOTES[state.activePillar] + '</div>';
 });
 document.getElementById('radarLegend').addEventListener('click', function (e) {
 var p = e.target.closest('[data-radar-key]'); if (!p) return;
 var k = p.getAttribute('data-radar-key'); state.radarSeries[k] = !state.radarSeries[k];
 if (!state.radarSeries.amgn && !state.radarSeries.lly && !state.radarSeries.pharma) state.radarSeries[k] = true;
 p.classList.toggle('muted', !state.radarSeries[k]); drawRadarChart();
 });
 document.querySelectorAll('[data-ch1-view]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.ch1View = b.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-collapse-target]').forEach(function (b) {
 b.addEventListener('click', function () { var p = document.getElementById(b.getAttribute('data-collapse-target')); if (p) p.classList.toggle('open'); });
 });
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 document.querySelectorAll('[data-peer-filter]').forEach(function (b) {
 b.addEventListener('click', function () { state.peerFilter = b.getAttribute('data-peer-filter'); document.querySelectorAll('[data-peer-filter]').forEach(function (x) { x.classList.toggle('active', x === b); }); renderPeerTable(); });
 });

 var PRESETS = { p1: { p: 10000, y: 14, c: 11.2, d: true }, p2: { p: 10000, y: 10, c: 24.5, d: false }, p3: { p: 10000, y: 10, c: 9.5, d: true } };
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var pr = PRESETS[b.getAttribute('data-preset')]; if (!pr) return;
 state.sim = { principal: pr.p, years: pr.y, priceCagr: pr.c, drip: pr.d, preset: b.getAttribute('data-preset') };
 document.getElementById('simPrincipalSlider').value = pr.p; document.getElementById('simYearsSlider').value = pr.y; document.getElementById('simCagrSlider').value = pr.c; document.getElementById('simDripToggle').checked = pr.d;
 updateSimulatorUI();
 });
 });
 ['simPrincipalSlider', 'simYearsSlider', 'simCagrSlider', 'simDripToggle'].forEach(function (id) {
 document.getElementById(id).addEventListener('input', function () {
 state.sim.principal = parseFloat(document.getElementById('simPrincipalSlider').value);
 state.sim.years = parseInt(document.getElementById('simYearsSlider').value, 10);
 state.sim.priceCagr = parseFloat(document.getElementById('simCagrSlider').value);
 state.sim.drip = document.getElementById('simDripToggle').checked;
 state.sim.preset = ''; updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]'); if (!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () { state.checks = [true, true, true, true, true, true]; try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (e) {} renderChecklist(); showToast('已勾选全部 6 项指标'); });
 document.getElementById('resetCheckBtn').addEventListener('click', function () { state.checks = [true, true, true, false, false, false]; try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (e) {} renderChecklist(); showToast('已重置清单'); });

 var QUICK_JUMP = [
 { sec: 'sec-00', t: '00 执行摘要与核心指标', s: 'To Serve Patients · 31,500 FTEs · $39.3B 指引' },
 { sec: 'sec-01', t: '01 科学权威协同与治理底座', s: 'Bradway × Jay Bradner × SAB 外部科学顾问团' },
 { sec: 'sec-02', t: '02 四大文化支柱与雷达画像', s: 'Be Science-Based · Ensure Quality · Compete · Teams' },
 { sec: 'sec-03', t: '03 全球药企文化横向对比', s: 'AMGN vs Eli Lilly vs Regeneron vs AbbVie' },
 { sec: 'sec-04', t: '04 全栈红利与复利推演', s: '连续 14 年股息递增交互式复利模拟器' },
 { sec: 'sec-05', t: '05 三代演进与四大战役复盘', s: 'Rathmann → Sharer → Bradway 46年生物制药史' },
 { sec: 'sec-06', t: '06 安进文化法则核查清单', s: '6 项生物医药组织力诊断与持久化评分' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 var q = (kw || '').trim().toLowerCase();
 var m = QUICK_JUMP.filter(function (x) { return !q || (x.t + x.s).toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump-sec="' + x.sec + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 qIn.addEventListener('focus', function () { renderQ(qIn.value); }); qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) { var b = e.target.closest('[data-jump-sec]'); if (!b) return; var el = document.getElementById(b.getAttribute('data-jump-sec')); if (el) el.scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
 else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });
 window.addEventListener('scroll', function () {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }, { passive: true });

 try {
 var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
 if (Array.isArray(sc) && sc.length === 6) state.checks = sc.map(Boolean);
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLanguage((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { var n = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(n, false); try { localStorage.setItem(STORAGE_THEME_KEY, n); } catch (e) {} });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Amgen_Corporate_Culture_Analysis.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出独立网页 Amgen_Corporate_Culture_Analysis.html');
 });
 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); try { localStorage.setItem(STORAGE_LANG_KEY, 'zh'); } catch (e) {} });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); try { localStorage.setItem(STORAGE_LANG_KEY, 'en'); } catch (e) {} });
 window.addEventListener('resize', renderAllCharts);
 renderPeerTable(); renderChecklist(); updateSimulatorUI(); renderAllCharts();
 })();
 