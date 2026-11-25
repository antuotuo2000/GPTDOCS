
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_adea_theme_v1', STORAGE_LANG_KEY = 'mui_adea_lang_v1', STORAGE_CHECK_KEY = 'adea_culture_checks_v1';
 var state = { theme: 'dark', lang: 'zh', ch1View: 'viewA', activePillar: 0, radarSeries: { adea: true, arm: true, idcc: true }, peerFilter: 'all', peerQuery: '', sim: { principal: 10000, years: 5, priceCagr: 16.0, drip: true, preset: 'p1' }, checks: [true, true, true, false, false, false] };
 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };

 function showToast(m) { var el = document.getElementById('muiSnackbar'); el.textContent = m; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 2200); }
 function getPalette() {
 var dark = state.theme === 'dark';
 return { dark: dark, grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)', tick: dark ? '#94A3B8' : '#475569', text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', pillBg: dark ? 'rgba(9,13,22,0.88)' : 'rgba(255,255,255,0.94)', c1: dark ? '#3399FF' : '#0073E6', c2: dark ? '#22C55E' : '#16A34A', c3: dark ? '#FFB74D' : '#D97706', c4: dark ? '#A78BFA' : '#7C3AED' };
 }
 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 document.getElementById('sideThemeDarkBtn').classList.toggle('active', state.theme === 'dark');
 document.getElementById('sideThemeLightBtn').classList.toggle('active', state.theme === 'light');
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换深色模式' : '已切换浅色模式');
 }
 function applyLang(l, silent) {
 state.lang = l === 'en' ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (n) {
 var v = n.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (v !== null) n.textContent = v;
 });
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换中文');
 }

 var PEER_ROWS = [
 { cat: 'pure', bm: true, co: '研究基准：Adeia (ADEA)', ld: 'Paul Davis → Dipti Vachani (26.10+)', org: '150人纯发明授权平台（研发-法务-授权铁三角）', cul: '原创发明 + 协商优先/诉讼兜底 + 强绩效薪酬', emp: '150人 · $2.96M/人', mar: 'FY25 $443.4M · 62.6% Adj. EBITDA · 35.2% FCF率', verd: '人均创收比肩苹果，正在从有线电视现金牛向 AI 混合键合与 Arm 式生态合作转型。', url: 'https://analytics.stackrader.com/company/ADEA', lbl: '10-K' },
 { cat: 'pure', bm: false, co: 'Arm Holdings (ARM)', ld: 'Rene Haas', org: '全球化标准架构授权 + 开发者生态矩阵', cul: '行业事实标准定义 + 按颗芯片抽成版税', emp: '~8,300人 · ~$0.55M/人', mar: '~96% GM · ~42% Adj. Op Margin', verd: 'Vachani 原东家：生态护城河极深、几乎无诉讼摩擦，是 Adeia 未来生态化升级的学习标杆。', url: 'https://adeia.com/press-release/adeia-appoints-dipti-vachani-as-chief-executive-officer', lbl: 'Arm 背景' },
 { cat: 'pure', bm: false, co: 'InterDigital (IDCC)', ld: 'Liren Chen', org: '无线/视频标准必要专利 (SEP) 研发与授权', cul: '标准组织话语权 + 全球交叉许可与诉讼和解', emp: '~450人 · ~$1.8M+/人', mar: '~100% GM · ~55%+ EBITDA 率', verd: '与 ADEA 商业同构度最高：IDCC 主攻手机/无线 SEP，ADEA 主攻半导体封装与流媒体交互。', url: 'https://www.sec.gov/Archives/edgar/data/1405495/000140549526000045/ars2025.pdf', lbl: 'IDCC AR' },
 { cat: 'ecosys', bm: false, co: 'Apple (AAPL)', ld: 'Tim Cook → John Ternus', org: '职能制集权 + 全公司唯一损益表 (Single P&L)', cul: '专家领导专家 + DRI 问责 + 软硬芯服闭环', emp: '16.7万人 · $2.87M/人', mar: 'FY26 $478.8B · 48.8% GM (服务 76.2%)', verd: '两者代表轻资产人效的两种极致：苹果靠 25 亿终端闭环，Adeia 靠 1.4 万项上游底层专利。', url: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf', lbl: 'HBR' }
 ];
 function renderPeerTable() {
 var tb = document.getElementById('peerTableBody'), q = state.peerQuery.trim().toLowerCase();
 var rows = PEER_ROWS.filter(function (r) {
 return (state.peerFilter === 'all' || r.cat === state.peerFilter) && (!q || (r.co + r.ld + r.org + r.cul + r.verd).toLowerCase().indexOf(q) !== -1);
 });
 document.getElementById('peerCountBadge').textContent = '显示 ' + rows.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
 tb.innerHTML = rows.map(function (r) {
 return '<tr class="' + (r.bm ? 'benchmark-row' : '') + '"><td><strong>' + r.co + '</strong><br><span style="font-size:0.75rem;color:var(--text-muted);">' + r.ld + '</span></td><td>' + r.org + '</td><td>' + r.cul + '</td><td class="mono">' + r.emp + '</td><td class="mono" style="color:var(--mui-primary-lighter);font-weight:700;">' + r.mar + '</td><td>' + r.verd + ' <a class="cite-link" href="' + r.url + '" target="_blank">' + r.lbl + ' ↗</a></td></tr>';
 }).join('');
 }

 var CHECKLIST = [
 { tag: '研发原创度', title: '1. 真实发明底座测试：是否具备持续自研而非纯粹购买诉讼？', desc: '核查研发投入占比（Adeia FY25 为 15.2%）及专利资产内生扩容速度。' },
 { tag: '人效密度', title: '2. 极简精锐编制测试：人均创收与人均 FCF 是否居行业顶层？', desc: '对标 Adeia 150 人创收 $2.96M/人、CapEx 仅 0.41% 的轻资产效率。' },
 { tag: '协商纪律', title: '3. 协商优先、诉讼兜底测试：能否将法律威慑转化为多年期长约？', desc: '观察是否能像 Disney、AMD 案一样以多年期商业许可协议收官并形成 RPO 积压。' },
 { tag: '生态升级', title: '4. 生态化合作转型测试：Vachani 能否减少纯维权摩擦？', desc: '跟踪新任 CEO 是否能将 Arm 式前置生态合作导入混合键合与汽车客户。' },
 { tag: '去杠杆', title: '5. 现金流资本配置测试：FCF 是否优先降债并增厚股东权益？', desc: '核查定期贷款余额下降轨迹与 S&P 信用评级变化（2026.04 升至 BB）。' },
 { tag: '第二曲线', title: '6. 非 Pay-TV 接力测试：半导体与 OTT/电商能否跑赢有线衰退？', desc: '跟踪半导体季度营收向 $50M/季迈进及电商 10% 占比兑现情况。' }
 ];
 function renderChecklist() {
 var done = state.checks.filter(Boolean).length, pct = Math.round((done / CHECKLIST.length) * 100);
 document.getElementById('checklistScoreChip').textContent = '已核查 ' + done + ' / ' + CHECKLIST.length + ' 项 (' + pct + '%)';
 document.getElementById('checklistProgressBar').style.width = pct + '%';
 document.getElementById('checklistContainer').innerHTML = CHECKLIST.map(function (it, i) {
 return '<label class="check-card ' + (state.checks[i] ? 'checked' : '') + '"><input type="checkbox" data-check-input="' + i + '" ' + (state.checks[i] ? 'checked' : '') + ' /><div style="flex:1;"><div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + it.title + '</span><span class="mui-chip mono">' + it.tag + '</span></div><p class="check-desc">' + it.desc + '</p></div></label>';
 }).join('');
 }

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(240, r.width || 480), h = Math.max(170, r.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawCh1Chart() {
 var env = prepCanvas('chartCh1'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'];
 if (state.ch1View === 'viewA') {
 var rev = [391.2, 438.9, 388.8, 376.0, 443.4], fcf = [220.8, 170.5, 148.9, 210.6, 156.3], maxV = 480;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(34, slot * 0.3);
 yrs.forEach(function (y, i) {
 var cx = pad.left + slot * (i + 0.5);
 var h1 = (rev[i] / maxV) * ph, h2 = (fcf[i] / maxV) * ph;
 ctx.fillStyle = pal.c1; roundRect(ctx, cx - bw - 2, pad.top + ph - h1, bw, h1, 5); ctx.fill();
 ctx.fillStyle = pal.c2; roundRect(ctx, cx + 2, pad.top + ph - h2, bw, h2, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + rev[i].toFixed(0), cx - bw / 2 - 2, pad.top + ph - h1 - 5);
 ctx.fillText('$' + fcf[i].toFixed(0), cx + bw / 2 + 2, pad.top + ph - h2 - 5);
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartCh1.push({ x: pad.left + slot * i, y: pad.top, w: slot, h: ph + 25, html: '<strong>' + y + '</strong><br/>营收: $' + rev[i] + 'M · FCF: $' + fcf[i] + 'M' });
 });
 } else {
 var emp = [120, 120, 140, 150, 150], rpe = [3.26, 3.66, 2.78, 2.51, 2.96], maxE = 200;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxE / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(kv + '人', pad.left - 8, ky + 4);
 }
 var slotB = pw / yrs.length, bwB = Math.min(36, slotB * 0.42);
 yrs.forEach(function (y, i) {
 var cx = pad.left + slotB * (i + 0.5), bh = (emp[i] / maxE) * ph;
 ctx.fillStyle = pal.c1; roundRect(ctx, cx - bwB / 2, pad.top + ph - bh, bwB, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(emp[i] + '人 ($' + rpe[i] + 'M)', cx, pad.top + ph - bh - 7);
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartCh1.push({ x: pad.left + slotB * i, y: pad.top, w: slotB, h: ph + 25, html: '<strong>' + y + '</strong><br/>员工: ~' + emp[i] + '人 · 人均创收: $' + rpe[i] + 'M' });
 });
 }
 }

 function drawRadarChart() {
 var env = prepCanvas('chartRadar'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = ['人均创收密度', '轻资产利润率', '底层原创专利', '生态协作友好', '去杠杆纪律'];
 var series = [
 { k: 'adea', c: pal.c1, f: 'rgba(51,153,255,0.24)', v: [9.8, 9.7, 9.4, 7.6, 9.3] },
 { k: 'arm', c: pal.c2, f: 'rgba(34,197,94,0.16)', v: [6.8, 8.8, 9.8, 9.9, 8.5] },
 { k: 'idcc', c: pal.c3, f: 'rgba(255,183,77,0.14)', v: [8.6, 9.3, 9.0, 7.2, 8.4] }
 ];
 var cx = w / 2, cy = h / 2 + 8, rad = Math.max(60, Math.min((w - 200) / 2, h * 0.35));
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * rad; ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < 5; i++) { var a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; var x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
 ctx.closePath(); ctx.stroke();
 }
 for (var i = 0; i < 5; i++) {
 var a = -Math.PI / 2 + (i * 2 * Math.PI) / 5, ax = cx + Math.cos(a) * rad, ay = cy + Math.sin(a) * rad;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif';
 ctx.textAlign = Math.abs(Math.cos(a)) < 0.2 ? 'center' : (Math.cos(a) > 0 ? 'left' : 'right');
 ctx.fillText(axes[i], cx + Math.cos(a) * (rad + 14), cy + Math.sin(a) * (rad + 15));
 hitRegions.chartRadar.push({ x: cx + Math.cos(a) * rad - 30, y: cy + Math.sin(a) * rad - 20, w: 60, h: 40, html: '<strong>' + axes[i] + '</strong><br/>ADEA: ' + series[0].v[i] + ' | ARM: ' + series[1].v[i] + ' | IDCC: ' + series[2].v[i] });
 }
 series.forEach(function (s) {
 if (!state.radarSeries[s.k]) return;
 ctx.beginPath();
 s.v.forEach(function (val, idx) {
 var a = -Math.PI / 2 + (idx * 2 * Math.PI) / 5, d = (val / 10) * rad;
 if (idx === 0) ctx.moveTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d);
 else ctx.lineTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d);
 });
 ctx.closePath(); ctx.fillStyle = s.f; ctx.fill(); ctx.strokeStyle = s.c; ctx.lineWidth = 2.2; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepCanvas('chartBars'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { lbl: '纯 IP 业务毛利率 (无实物 BOM)', v: 99.5, col: pal.c2 },
 { lbl: 'FY2025 调整后 EBITDA 利润率', v: 62.6, col: pal.c1 },
 { lbl: 'FY2026E 调整后 EBITDA 中枢', v: 55.4, col: pal.c1 },
 { lbl: 'FY2025 GAAP 营业利润率', v: 39.5, col: pal.c4 },
 { lbl: 'FY2025 自由现金流利润率 (FCF)', v: 35.2, col: pal.c2 },
 { lbl: 'FY2025 研发费用占营收比 (R&D)', v: 15.2, col: pal.c3 }
 ];
 var pad = { top: 10, right: 20, bottom: 20, left: 20 }, pw = w - 40, ph = h - 30, rowH = ph / items.length;
 items.forEach(function (it, i) {
 var rt = pad.top + rowH * i, ly = rt + 18, by = rt + 24, bh = 13, bw = (it.v / 105) * pw;
 ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.lbl, pad.left, ly);
 ctx.fillStyle = it.col; ctx.font = 'bold 12px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(it.v.toFixed(1) + '%', pad.left + pw, ly);
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, by, pw, bh, 6); ctx.fill();
 ctx.fillStyle = it.col; roundRect(ctx, pad.left, by, bw, bh, 6); ctx.fill();
 hitRegions.chartBars.push({ x: pad.left, y: rt, w: pw, h: rowH, html: '<strong>' + it.lbl + '</strong>: ' + it.v.toFixed(1) + '%' });
 });
 }

 function drawEpsComboChart() {
 var env = prepCanvas('chartEps'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var yrs = ['FY23', 'FY24', 'FY25', 'FY26E中枢'], op = [136.2, 128.6, 175.0, 130.0], fcf = [148.9, 210.6, 156.3, 145.0];
 var pad = { top: 26, right: 20, bottom: 38, left: 52 }, pw = w - 72, ph = h - 64, maxV = 240;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(36, slot * 0.28);
 yrs.forEach(function (y, i) {
 var cx = pad.left + slot * (i + 0.5), h1 = (op[i] / maxV) * ph, h2 = (fcf[i] / maxV) * ph;
 ctx.fillStyle = pal.c1; roundRect(ctx, cx - bw - 2, pad.top + ph - h1, bw, h1, 5); ctx.fill();
 ctx.fillStyle = pal.c2; roundRect(ctx, cx + 2, pad.top + ph - h2, bw, h2, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + op[i].toFixed(0), cx - bw / 2 - 2, pad.top + ph - h1 - 5);
 ctx.fillText('$' + fcf[i].toFixed(0), cx + bw / 2 + 2, pad.top + ph - h2 - 5);
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartEps.push({ x: pad.left + slot * i, y: pad.top, w: slot, h: ph + 25, html: '<strong>' + y + '</strong><br/>营业利润: $' + op[i] + 'M · 自由现金流: $' + fcf[i] + 'M' });
 });
 }

 function drawSimChart() {
 var env = prepCanvas('chartSim'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var p = state.sim.principal, yrs = state.sim.years, br = state.sim.priceCagr / 100, tr = (state.sim.priceCagr + (state.sim.drip ? 3.5 : 0)) / 100;
 var tArr = [], bArr = [];
 for (var y = 0; y <= yrs; y++) { tArr.push(p * Math.pow(1 + tr, y)); bArr.push(p * Math.pow(1 + br, y)); }
 var maxV = tArr[yrs] * 1.1, pad = { top: 20, right: 20, bottom: 26, left: 56 }, pw = w - 76, ph = h - 46;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.5; ctx.beginPath();
 tArr.forEach(function (v, i) { var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.beginPath();
 bArr.forEach(function (v, i) { var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke(); ctx.setLineDash([]);
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, tr = (state.sim.priceCagr + (state.sim.drip ? 3.5 : 0)) / 100;
 var endV = p * Math.pow(1 + tr, yrs), midY = Math.max(1, Math.floor(yrs / 2)), midV = p * Math.pow(1 + tr, midY);
 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString();
 document.getElementById('simYearsLabel').textContent = yrs + ' 年';
 document.getElementById('simCagrLabel').textContent = state.sim.priceCagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = '$' + Math.round(endV).toLocaleString();
 document.getElementById('simMoicVal').textContent = (endV / p).toFixed(2) + 'x · ' + (tr * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = '$' + Math.round(endV - p).toLocaleString();
 document.getElementById('simMidLabel').textContent = '第 ' + midY + ' 年中期节点';
 document.getElementById('simMidVal').textContent = '$' + Math.round(midV).toLocaleString();
 drawSimChart();
 }

 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 原创发明先于商业变现）：</strong>正是因为具备真实工程研发能力（而非空壳专利池），Adeia 才能在 2026 年推出 RapidCool™ 液冷原型并与晶圆厂开展深度技术转移合作。',
 '<strong>当前选中支柱解读（02 协商优先，诉讼兜底）：</strong>2025 年 12 月与 Disney 和解、2026 年 3 月与 AMD 签约、2026 Q3 顺利续签 Charter 与 TCL，证明诉讼只是倒逼公平定价的护航手段。',
 '<strong>当前选中支柱解读（03 150人跨界敏捷协同）：</strong>极简编制让高层能直接把媒体内容发现专利横移至 RPX 电商联盟与 Fanatics，用零新增硬件成本开辟占营收 10% 的新蓝海。',
 '<strong>当前选中支柱解读（04 铁血去杠杆与资本纪律）：</strong>2024–2026 Q3 累计偿债 $2.15 亿，成功推动 S&amp;P 将公司信用评级由 BB- 升至 BB。'
 ];
 document.getElementById('pillarStack').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pillar]'); if (!b) return;
 var idx = parseInt(b.getAttribute('data-pillar'), 10) || 0; state.activePillar = idx;
 this.querySelectorAll('.pillar-card').forEach(function (c, i) { c.classList.toggle('active', i === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + PILLAR_NOTES[idx] + '</div>';
 });
 document.getElementById('radarLegend').addEventListener('click', function (e) {
 var b = e.target.closest('[data-radar-key]'); if (!b) return;
 var k = b.getAttribute('data-radar-key'); state.radarSeries[k] = !state.radarSeries[k]; b.classList.toggle('muted', !state.radarSeries[k]);
 drawRadarChart();
 });
 document.querySelectorAll('[data-ch1-view]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-collapse-target]').forEach(function (b) {
 b.addEventListener('click', function () { document.getElementById(this.getAttribute('data-collapse-target')).classList.toggle('open'); });
 });
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 document.querySelectorAll('[data-peer-filter]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 document.querySelectorAll('[data-peer-filter]').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderPeerTable();
 });
 });

 var pS = document.getElementById('simPrincipalSlider'), yS = document.getElementById('simYearsSlider'), cS = document.getElementById('simCagrSlider'), dT = document.getElementById('simDripToggle');
 pS.addEventListener('input', function () { state.sim.principal = parseFloat(this.value); updateSimulatorUI(); });
 yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10); updateSimulatorUI(); });
 cS.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value); updateSimulatorUI(); });
 dT.addEventListener('change', function () { state.sim.drip = this.checked; updateSimulatorUI(); });
 var PRESETS = { p1: { p: 10000, y: 5, c: 16.0, d: true }, p2: { p: 10000, y: 5, c: 24.0, d: true }, p3: { p: 10000, y: 5, c: 8.5, d: true } };
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var pr = PRESETS[this.getAttribute('data-preset')];
 document.querySelectorAll('[data-preset]').forEach(function (x) { x.classList.toggle('active', x === b); });
 state.sim = { principal: pr.p, years: pr.y, priceCagr: pr.c, drip: pr.d };
 pS.value = pr.p; yS.value = pr.y; cS.value = pr.c; dT.checked = pr.d; updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]'); if (!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = inp.checked;
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () { state.checks = [true, true, true, true, true, true]; renderChecklist(); });
 document.getElementById('resetCheckBtn').addEventListener('click', function () { state.checks = [true, true, true, false, false, false]; renderChecklist(); });

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps'].forEach(function (cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, hit = null;
 (hitRegions[cid] || []).forEach(function (rg) { if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) hit = rg; });
 if (hit) { tip.innerHTML = hit.html; tip.style.display = 'block'; tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 30)) + 'px'; }
 else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 });

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
 else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {} });
 document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'Adeia_Corporate_Culture_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500); showToast('已导出 Adeia_Corporate_Culture_Analysis.html');
 });

 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 var QIDX = [{ s: 'sec-00', t: '00 执行摘要与核心指标', d: '150 FTE · $2.96M/人' }, { s: 'sec-01', t: '01 150人研发-法务-授权铁三角', d: 'Dipti Vachani · 研发 $67.5M' }, { s: 'sec-02', t: '02 四大文化支柱', d: '协商优先 · 五维雷达图' }, { s: 'sec-03', t: '03 全球 IP 巨头对比', d: 'ADEA vs ARM / IDCC / AAPL' }, { s: 'sec-04', t: '04 运营杠杆与复利推演', d: '62.6% EBITDA · 复利模拟' }, { s: 'sec-05', t: '05 三代演进与四大战役', d: 'Disney / AMD / S&P BB' }, { s: 'sec-06', t: '06 Adeia 文化法则核查清单', d: '6项组织诊断自检' }];
 qIn.addEventListener('focus', function () { qPop.innerHTML = QIDX.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.s + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.d + '</span></button>'; }).join(''); qPop.classList.add('open'); });
 qPop.addEventListener('click', function (e) { var b = e.target.closest('[data-jump]'); if (b) { document.querySelector(b.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); } });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? (window.scrollY / dh) * 100 : 0) + '%'; }, { passive: true });
 window.addEventListener('resize', function () { renderAllCharts(); });

 renderPeerTable(); renderChecklist(); updateSimulatorUI(); renderAllCharts();
 })();
 