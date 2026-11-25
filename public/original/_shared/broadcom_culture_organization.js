
 (function () {
 'use strict';
 var state = { theme: 'dark', ch1: 'A', pillar: 0, radar: { avgo: true, aapl: true, nvda: true }, pf: 'all', pq: '', sim: { p: 10000, y: 10, c: 34.0, d: true, pre: 'p1' }, chk: [true, true, true, false, false, false] };
 var hits = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 function showToast(m) { var b = document.getElementById('muiSnackbar'); b.textContent = m; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 2000); }
 function pal() {
 var d = document.documentElement.getAttribute('data-theme') === 'dark';
 return { d: d, text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', tick: d ? '#94A3B8' : '#475569', grid: d ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)', c1: d ? '#3399FF' : '#0073E6', c2: d ? '#22C55E' : '#16A34A', c3: d ? '#FFB74D' : '#D97706', c4: d ? '#A78BFA' : '#7C3AED', track: d ? 'rgba(148,163,184,0.12)' : 'rgba(15,25,36,0.06)' };
 }
 function prep(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(240, r.width || 480), h = Math.max(160, r.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function rr(ctx, x, y, w, h, r) { var rad = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.arcTo(x + w, y, x + w, y + h, rad); ctx.arcTo(x + w, y + h, x, y + h, rad); ctx.arcTo(x, y + h, x, y, rad); ctx.arcTo(x, y, x + w, y, rad); ctx.closePath(); }

 function drawCh1() {
 var e = prep('chartCh1'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.chartCh1 = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.ch1 === 'A') {
 var segs = ['Semiconductor Solutions', 'Infrastructure Software', 'Total Net Revenue'];
 var q25 = [9.17, 6.79, 15.95], q26 = [20.84, 8.75, 29.59], maxV = 34;
 for (var g = 0; g <= 4; g++) { var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4); }
 var sw = pw / 3, bw = Math.min(42, sw * 0.28);
 segs.forEach(function (s, i) {
 var cx = pad.left + sw * (i + 0.5), h1 = (q25[i] / maxV) * ph, h2 = (q26[i] / maxV) * ph;
 ctx.fillStyle = p.c1; rr(ctx, cx - bw - 4, pad.top + ph - h1, bw, h1, 5); ctx.fill();
 ctx.fillStyle = p.c2; rr(ctx, cx + 4, pad.top + ph - h2, bw, h2, 5); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + q25[i].toFixed(1) + 'B', cx - bw / 2 - 4, pad.top + ph - h1 - 6);
 ctx.fillText('$' + q26[i].toFixed(1) + 'B', cx + bw / 2 + 4, pad.top + ph - h2 - 6);
 ctx.fillStyle = p.sub; ctx.font = '600 11px sans-serif'; ctx.fillText(s, cx, pad.top + ph + 20);
 hits.chartCh1.push({ x: pad.left + sw * i, y: pad.top, w: sw, h: ph, t: s, b: 'Q3 FY25: $' + q25[i].toFixed(2) + 'B → Q3 FY26: $' + q26[i].toFixed(2) + 'B' });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24 (并购VMW)', 'FY25', 'FY26E'];
 var emp = [20, 20, 37, 33, 33], revEmp = [1.66, 1.79, 1.39, 1.94, 3.21], maxR = 3.6;
 for (var k = 0; k <= 4; k++) { var kv = (maxR / 4) * k, ky = pad.top + ph - (k / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv.toFixed(1) + 'M', pad.left - 8, ky + 4); }
 var sw2 = pw / 5, bw2 = Math.min(44, sw2 * 0.5);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sw2 + (sw2 - bw2) / 2, bh = (revEmp[i] / maxR) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 4 ? p.c2 : p.c1; rr(ctx, x, yt, bw2, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw2 / 2, yt - 6);
 ctx.fillStyle = p.tick; ctx.fillText(y + ' (' + emp[i] + 'k)', x + bw2 / 2, pad.top + ph + 20);
 hits.chartCh1.push({ x: x, y: yt, w: bw2, h: bh, t: y + ' 人效', b: emp[i] + ',000 员工 · 人均创收 $' + revEmp[i].toFixed(2) + 'M' });
 });
 }
 }

 function drawRadar() {
 var e = prep('chartRadar'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.chartRadar = [];
 var ax = ['成本与SG&A纪律', '并购整合速度', 'AI/芯片技术壁垒', '大客户锁定深度', '股东现金流回报'];
 var sr = [
 { k: 'avgo', n: '博通 Broadcom', c: p.c1, f: 'rgba(51,153,255,0.22)', v: [9.9, 9.9, 9.5, 9.4, 9.6] },
 { k: 'aapl', n: '苹果 Apple', c: p.c2, f: 'rgba(34,197,94,0.14)', v: [8.8, 6.5, 9.6, 9.7, 9.8] },
 { k: 'nvda', n: '英伟达 NVIDIA', c: p.c3, f: 'rgba(255,183,77,0.14)', v: [8.6, 7.2, 9.9, 9.6, 9.2] }
 ];
 var cx = w / 2, cy = h / 2 + 8, rad = Math.max(60, Math.min((w - 190) / 2, h * 0.35));
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * rad; ctx.strokeStyle = p.grid; ctx.beginPath();
 for (var i = 0; i < 5; i++) { var ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5, px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
 ctx.closePath(); ctx.stroke();
 }
 for (var a = 0; a < 5; a++) {
 var ang2 = -Math.PI / 2 + (a * 2 * Math.PI) / 5, x2 = cx + Math.cos(ang2) * rad, y2 = cy + Math.sin(ang2) * rad;
 ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x2, y2); ctx.stroke();
 ctx.fillStyle = p.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = Math.abs(Math.cos(ang2)) < 0.2 ? 'center' : (Math.cos(ang2) > 0 ? 'left' : 'right');
 ctx.fillText(ax[a], cx + Math.cos(ang2) * (rad + 14), cy + Math.sin(ang2) * (rad + 14));
 }
 sr.forEach(function (s) {
 if (!state.radar[s.k]) return;
 ctx.beginPath();
 s.v.forEach(function (val, idx) { var t = -Math.PI / 2 + (idx * 2 * Math.PI) / 5, d = (val / 10) * rad, vx = cx + Math.cos(t) * d, vy = cy + Math.sin(t) * d; if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy); });
 ctx.closePath(); ctx.fillStyle = s.f; ctx.fill(); ctx.strokeStyle = s.c; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawBars() {
 var e = prep('chartBars'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.chartBars = [];
 var items = [
 { l: 'Q3 Non-GAAP 综合毛利率 (Gross Margin)', v: 75.0, c: p.c2 },
 { l: 'Q3 Non-GAAP 营业利润率 (Operating Margin)', v: 67.9, c: p.c1 },
 { l: '全公司研发工程人才占比 (R&D Headcount)', v: 57.0, c: p.c4 },
 { l: 'Q3 自由现金流利润率 (FCF Margin)', v: 46.2, c: p.c2 },
 { l: 'Q3 Non-GAAP 销管费用率 (SG&A 极简极致)', v: 1.84, c: p.c3 }
 ];
 var pad = { top: 14, right: 24, bottom: 24, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, rowH = ph / items.length;
 items.forEach(function (it, i) {
 var ry = pad.top + i * rowH, ly = ry + rowH * 0.35, by = ry + rowH * 0.52, bh = 14, bw = Math.max(8, (it.v / 85) * pw);
 ctx.fillStyle = p.text; ctx.font = '600 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.l, pad.left, ly);
 ctx.fillStyle = it.c; ctx.font = '800 12px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(it.v.toFixed(it.v < 5 ? 2 : 1) + '%', pad.left + pw, ly);
 ctx.fillStyle = p.track; rr(ctx, pad.left, by, pw, bh, 7); ctx.fill();
 ctx.fillStyle = it.c; rr(ctx, pad.left, by, bw, bh, 7); ctx.fill();
 });
 }

 function drawEps() {
 var e = prep('chartEps'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.chartEps = [];
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'], rev = [33.2, 35.8, 51.6, 63.9, 105.9], om = [61.1, 61.8, 59.6, 65.7, 67.0];
 var pad = { top: 28, right: 50, bottom: 40, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxR = 120;
 for (var g = 0; g <= 4; g++) { var gv = (maxR / 4) * g, gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4); }
 var sw = pw / 5, bw = Math.min(44, sw * 0.45);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sw + (sw - bw) / 2, bh = (rev[i] / maxR) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 4 ? p.c2 : p.c1; rr(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + rev[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = p.tick; ctx.fillText(y + ' (' + om[i] + '%)', x + bw / 2, pad.top + ph + 20);
 });
 }

 function drawSim() {
 var e = prep('chartSim'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal();
 var pad = { top: 18, right: 18, bottom: 24, left: 56 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var pr = state.sim.p, yrs = state.sim.y, rt = (state.sim.c + (state.sim.d ? 2.0 : 0)) / 100, pts = [];
 for (var i = 0; i <= yrs; i++) pts.push(pr * Math.pow(1 + rt, i));
 var maxV = pts[yrs] * 1.08;
 ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = p.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (v, idx) { var px = pad.left + (idx / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 }
 function updateSim() {
 var p = state.sim.p, y = state.sim.y, r = (state.sim.c + (state.sim.d ? 2.0 : 0)) / 100, end = p * Math.pow(1 + r, y), midY = Math.floor(y / 2), mid = p * Math.pow(1 + r, midY);
 document.getElementById('simPOut').textContent = '$' + p.toLocaleString();
 document.getElementById('simYOut').textContent = y + ' 年';
 document.getElementById('simCOut').textContent = state.sim.c.toFixed(1) + '%';
 document.getElementById('simEnd').textContent = end >= 1e6 ? ('$' + (end / 1e6).toFixed(2) + 'M') : ('$' + Math.round(end).toLocaleString());
 document.getElementById('simMoic').textContent = (end / p).toFixed(2) + 'x · ' + (r * 100).toFixed(1) + '%';
 document.getElementById('simGain').textContent = (end - p) >= 1e6 ? ('$' + ((end - p) / 1e6).toFixed(2) + 'M') : ('$' + Math.round(end - p).toLocaleString());
 document.getElementById('simMidLbl').textContent = '第 ' + midY + ' 年中期资产';
 document.getElementById('simMid').textContent = '$' + Math.round(mid).toLocaleString();
 drawSim();
 }

 var PEERS = [
 { cat: 'fed', bm: true, c: 'Broadcom (AVGO)', l: 'Hock Tan (延任至2030)', s: '24个独立 P&L 事业部 + 中央资本手术', d: '#1/#2 特许垄断 + 18个月并购改造 + 1.8% SG&A', h: '3.3万人 (57%研发) · ~$3.21M(26E)', m: 'Q3 $29.6B · Non-GAAP OM 67.9% · FCF 46.2%', v: '成本与并购整合全球标杆，用硬件+软件双垄断收割现金流。' },
 { cat: 'func', bm: false, c: 'Apple (AAPL)', l: 'John Ternus (2026.09+)', s: '单一损益表 (Single P&L) 职能制', d: '专家领导专家 + DRI 问责 + 极端保密', h: '16.7万人 (41%工程) · $2.87M', m: 'FY26 $478.8B · 综合毛利 48.8%', v: '组织哲学与博通恰成镜像：苹果靠 1 张表协同消费生态，博通靠 24 张表压榨 B2B 利润。' },
 { cat: 'func', bm: false, c: 'NVIDIA (NVDA)', l: 'Jensen Huang', s: '超扁平蛛网职能制 (~60直报)', d: '无事业部割据 + Top-5 全透明邮件', h: '~4.2万人 · ~$5.14M', m: 'FY26 $215.9B · GAAP GM 71.1%', v: '与博通在 AI 算力/网络正面交锋：CUDA 通用封闭 vs 定制 XPU 开放以太网。' },
 { cat: 'fed', bm: false, c: 'Berkshire (BRK)', l: 'Buffett / Greg Abel', s: '27人总部 + 60+自治子公司', d: '经营权 100% 下放 + 资本权集中', h: '~38.8万人 · 总部27人', m: '永续现金复利综合体', v: '同样高度集权资本配置，但伯克希尔对子公司“买而不改”，博通“买后 18 个月动刀”。' },
 { cat: 'fed', bm: false, c: 'Microsoft (MSFT)', l: 'Satya Nadella', s: '三大业务集团事业部矩阵', d: '成长型思维 + 企业云生态结盟', h: '~22.3万人 · ~$1.49M', m: 'FY26 $331.8B · 高云软件利润率', v: '软件广度无敌，但面临千亿云基建折旧与较重的营销行政体系。' }
 ];
 function renderPeers() {
 var q = state.pq.trim().toLowerCase();
 var rows = PEERS.filter(function (x) { return (state.pf === 'all' || x.cat === state.pf) && (!q || (x.c + x.l + x.s + x.d + x.v).toLowerCase().indexOf(q) !== -1); });
 document.getElementById('peerCountBadge').textContent = '显示 ' + rows.length + ' / ' + PEERS.length + ' 家标杆企业';
 document.getElementById('peerTableBody').innerHTML = rows.map(function (r) {
 return '<tr class="' + (r.bm ? 'benchmark-row' : '') + '"><td><strong>' + r.c + '</strong><br><small style="color:var(--text-muted);">' + r.l + '</small></td><td>' + r.s + '</td><td>' + r.d + '</td><td class="mono">' + r.h + '</td><td class="mono" style="color:var(--mui-primary-lighter);font-weight:700;">' + r.m + '</td><td>' + r.v + '</td></tr>';
 }).join('');
 }

 var CHK = [
 { tag: '#1/#2 垄断律', t: '1. 特许经营权准入测试：是否只留细分赛道前两名？', d: '检验管理层是否敢于果断剥离低毛利、缺乏定价权的边缘产品线。' },
 { tag: '1.8% SG&A', t: '2. 反官僚费用纪律测试：SG&A 费率是否持续压低？', d: '核查 Non-GAAP SG&A 占营收比是否远低于行业均值，把资金留给研发与现金分红。' },
 { tag: '18个月手术', t: '3. 并购整合执行力测试：收购后营业利润率能否跃升？', d: '如 VMware 在 18 个月内从 <30% 跃升至 ~70%，检验并购不是堆营收而是提质增效。' },
 { tag: '57% 研发密度', t: '4. 工程师密度测试：研发人员占比是否过半？', d: '博通 ~3.3 万员工中 57% 为研发，确保核心竞争力源于 SerDes/DSP/软件硬核壁垒。' },
 { tag: '46% FCF 转化', t: '5. 轻资产去杠杆测试：自由现金流能否快速偿债？', d: '依托 Fabless 低 CapEx (1.8%) 快速消化并购债务并维持连续 15 年派息增长。' },
 { tag: '96% 浮动激励', t: '6. 利益对齐测试：CEO 与高管薪酬是否深度绑定长期目标？', d: '如 Hock Tan 2030 PSU 锁定 $90B/$120B AI 营收门槛，与长期股东利益一致。' }
 ];
 function renderChk() {
 var done = state.chk.filter(Boolean).length, pct = Math.round((done / 6) * 100);
 document.getElementById('checklistScoreChip').textContent = '已核查 ' + done + ' / 6 项 (' + pct + '%)';
 document.getElementById('checklistProgressBar').style.width = pct + '%';
 document.getElementById('checklistContainer').innerHTML = CHK.map(function (c, i) {
 return '<label class="check-card ' + (state.chk[i] ? 'checked' : '') + '"><input type="checkbox" data-ci="' + i + '" ' + (state.chk[i] ? 'checked' : '') + ' /><div><div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + c.t + '</span><span class="mui-chip mono">' + c.tag + '</span></div><p class="check-desc">' + c.d + '</p></div></label>';
 }).join('');
 }

 function drawAll() { drawCh1(); drawRadar(); drawBars(); drawEps(); drawSim(); }
 document.getElementById('ch1TabA').addEventListener('click', function () { state.ch1 = 'A'; this.classList.add('active'); document.getElementById('ch1TabB').classList.remove('active'); drawCh1(); });
 document.getElementById('ch1TabB').addEventListener('click', function () { state.ch1 = 'B'; this.classList.add('active'); document.getElementById('ch1TabA').classList.remove('active'); drawCh1(); });
 var PNOTES = [
 '<strong>当前选中支柱解读（01 聚焦专注法则）：</strong>TIME 2026 AI 人物专访指出，“极度专注（Obsessive Focus）”是 Hock Tan 统领博通从资本配置到定制 AI 芯片研发的唯一基石。',
 '<strong>当前选中支柱解读（02 24事业部独立P&amp;L）：</strong>SEC 2026 DEF 14A 披露各事业部总经理的考核与直属费用及分部利润直接挂钩，杜绝低效部门吸血高效部门。',
 '<strong>当前选中支柱解读（03 18个月并购手术）：</strong>VMware 收购后 18 个月内，博通砍掉冗余 SKU 并转向 VCF 全栈订阅，推动软件营业利润率从 &lt;30% 飙升至 ~70%。',
 '<strong>当前选中支柱解读（04 96% 浮动薪酬与极简 SG&amp;A）：</strong>Q3 FY26 Non-GAAP SG&amp;A 仅 $5.45亿（1.84% 营收比），Hock Tan 96% 薪酬绑定 2030 年 $90B–$120B AI 营收。'
 ];
 document.getElementById('pillarStack').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pillar]'); if (!b) return;
 var i = parseInt(b.getAttribute('data-pillar'), 10);
 this.querySelectorAll('.pillar-card').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.getElementById('pillarNote').innerHTML = '<div>' + PNOTES[i] + '</div>';
 });
 document.getElementById('radarLegend').addEventListener('click', function (e) {
 var b = e.target.closest('[data-rk]'); if (!b) return;
 var k = b.getAttribute('data-rk'); state.radar[k] = !state.radar[k]; b.classList.toggle('muted', !state.radar[k]); drawRadar();
 });
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.pq = this.value; renderPeers(); });
 document.querySelectorAll('[data-pf]').forEach(function (b) { b.addEventListener('click', function () { state.pf = this.getAttribute('data-pf'); document.querySelectorAll('[data-pf]').forEach(function (x) { x.classList.toggle('active', x === b); }); renderPeers(); }); });
 document.getElementById('simP').addEventListener('input', function () { state.sim.p = parseFloat(this.value); updateSim(); });
 document.getElementById('simY').addEventListener('input', function () { state.sim.y = parseInt(this.value, 10); updateSim(); });
 document.getElementById('simC').addEventListener('input', function () { state.sim.c = parseFloat(this.value); updateSim(); });
 document.getElementById('simDripToggle').addEventListener('change', function () { state.sim.d = this.checked; updateSim(); });
 var SPRE = { p1: [10000, 10, 34, true], p2: [10000, 20, 38, true], p3: [10000, 10, 15.5, true] };
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-preset'), v = SPRE[k];
 state.sim.p = v[0]; state.sim.y = v[1]; state.sim.c = v[2]; state.sim.d = v[3];
 document.getElementById('simP').value = v[0]; document.getElementById('simY').value = v[1]; document.getElementById('simC').value = v[2]; document.getElementById('simDripToggle').checked = v[3];
 document.querySelectorAll('[data-preset]').forEach(function (x) { x.classList.toggle('active', x === b); });
 updateSim();
 });
 });
 document.getElementById('checklistContainer').addEventListener('change', function (e) { var i = e.target.getAttribute('data-ci'); if (i !== null) { state.chk[parseInt(i, 10)] = e.target.checked; renderChk(); } });
 document.getElementById('checkAllBtn').addEventListener('click', function () { state.chk = [true, true, true, true, true, true]; renderChk(); });
 document.getElementById('resetCheckBtn').addEventListener('click', function () { state.chk = [true, true, true, false, false, false]; renderChk(); });

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth < 1024) { var o = document.getElementById('muiSidebar').classList.toggle('open'); document.getElementById('drawerBackdrop').classList.toggle('open', o); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.getElementById('muiSidebar').classList.remove('open'); this.classList.remove('open'); });
 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });
 function setTheme(t) { state.theme = t; document.documentElement.setAttribute('data-theme', t); drawAll(); }
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { setTheme(state.theme === 'dark' ? 'light' : 'dark'); showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至浅色模式'); });
 document.getElementById('sideLightBtn')?.addEventListener('click', function () { setTheme('light'); });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { setTheme('dark'); });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lang]'); if (!b) return;
 var l = b.getAttribute('data-lang');
 document.getElementById('langZhBtn').classList.toggle('active', l === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', l === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) { var v = el.getAttribute(l === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (v) { if (v.indexOf('<span') !== -1) el.innerHTML = v; else el.textContent = v; } });
 });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Broadcom_Corporate_Culture_Analysis.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出 Broadcom_Corporate_Culture_Analysis.html');
 });
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 90); });
 renderPeers(); renderChk(); updateSim(); drawAll();
 })();
 