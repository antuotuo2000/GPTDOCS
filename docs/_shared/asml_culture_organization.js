
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1', STORAGE_CHECK_KEY = 'mui_asml_culture_checks_v1';
 var state = { lang: 'zh', theme: 'dark', ch1View: 'viewA', activePillar: 0, radarSeries: { asml: true, aapl: true, mform: true }, peerFilter: 'all', peerQuery: '', sim: { principal: 10000, years: 10, priceCagr: 24.5, drip: true, preset: 'p1' }, checks: [true, true, true, false, false, false] };
 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };

 function showToast(msg) { var el = document.getElementById('muiSnackbar'); if (!el) return; el.textContent = msg; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 2400); }
 function getPalette() {
 var d = state.theme === 'dark';
 return { isDark: d, grid: d ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)', tick: d ? '#94A3B8' : '#475569', text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', pillBg: d ? 'rgba(9,13,22,0.88)' : 'rgba(255,255,255,0.94)', c1: d ? '#3399FF' : '#0073E6', c2: d ? '#22C55E' : '#16A34A', c3: d ? '#FFB74D' : '#D97706', c4: d ? '#A78BFA' : '#7C3AED' };
 }
 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var sd = document.getElementById('sideThemeDarkBtn'), sl = document.getElementById('sideThemeLightBtn');
 if (sd && sl) { sd.classList.toggle('active', state.theme === 'dark'); sl.classList.toggle('active', state.theme === 'light'); }
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换深色模式' : '已切换浅色模式');
 }

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 Challenge 挑战现状）：</strong>在 ASML，前 CTO Martin van den Brink 曾以“近乎残酷的工程直率”闻名——当激光功率或套刻精度差 0.1 纳米时，团队不允许用 PPT 粉饰太平，而是立即跨学科拆解物理根因。',
 '<strong>当前选中支柱解读（02 Collaborate 开放协作）：</strong>ASML 不试图把 5,000 家供应商全买下来，而是派驻联合工程小组与蔡司、TRUMPF 共建实验台，实现跨国界无缝系统编排。',
 '<strong>当前选中支柱解读（03 Care 彼此关怀）：</strong>在荷兰总部提供 40 天带薪年假与 13 薪，2026 年 CEO Christophe Fouquet 更将高管薪酬与员工满意度直接绑定，守护研发安全感。',
 '<strong>当前选中支柱解读（04 Long-Term Grit 长期主义）：</strong>耗时 20 年、斥资超 €90 亿攻克 EUV 物理壁垒，成就今日不可替代的产业底座。'
 ];
 var PEER_ROWS = [
 { category: 'orch', benchmark: true, company: '研究基准：阿斯麦 (ASML)', leader: '傅克礼 (Christophe Fouquet)', positioning: '生态编排系统架构师 + 6人执行管委会', culture: 'Challenge, Collaborate, Care + 开放协同共研', headcount: '44,000+ FTE (143国籍)', margins: 'FY25 €32.7B (GM 52.8%) · Q3\'26 57.5%', verdict: '开放系统编排巅峰：通过资本与技术共研锁定全球最稀缺光学与光源，100% 垄断 EUV。' },
 { category: 'orch', benchmark: false, company: '苹果 (Apple · AAPL)', leader: '库克 / 约翰·特努斯 (2026.09+)', positioning: '职能制集权 + 全公司唯一损益表', culture: '专家领导专家 + DRI + 严格物理保密', headcount: '16.7万人 · 人均 $2.87M', margins: 'FY26 $478.8B · 综合毛利 48.8%', verdict: '封闭全栈消费品巅峰：与 ASML 的“开放共研”形成鲜明对比，苹果靠高度保密守住新品惊喜。' },
 { category: 'orch', benchmark: false, company: '英伟达 (NVIDIA · NVDA)', leader: '黄仁勋 (Jensen Huang)', positioning: '超扁平职能网 (~60人直报 CEO)', culture: 'Top-5 全透明邮件 + 光速全栈迭代', headcount: '~4.2万人 · 人均 ~$5.14M', margins: 'FY26 $215.9B · 毛利 71.1%', verdict: '算力生态同盟：与 ASML 一样依赖台积电制造，双方共同定义 AI 算力供给上限。' },
 { category: 'mfg', benchmark: false, company: '台积电 (TSMC · TSM)', leader: '魏哲家 (C.C. Wei)', positioning: '纯晶圆代工巨人 + 军事化良率纪律', culture: 'ICIC 诚信正直 + 客户绝对中立不竞争', headcount: '~7.7万人+', margins: '毛利率 ~56%–59%', verdict: 'ASML 最大客户兼战略盟友：曾参与 €52.3亿 EUV 共投，2026 Q3 委托 ASML 牵头 12 英寸掩膜联盟。' },
 { category: 'mfg', benchmark: false, company: '应用材料 (AMAT)', leader: 'Gary Dickerson', positioning: '多事业部半导体设备平台矩阵', culture: '跨沉积/刻蚀/封装的多元工程产品线', headcount: '~3.5万人+', margins: '毛利率 ~47%–48%', verdict: '多品类设备标杆：覆盖面广但每条赛道均面临强敌，缺乏 ASML 式的单一技术绝对垄断。' }
 ];
 var CHECKLIST_ITEMS = [
 { tag: '生态编排力', title: '1. 开放协同测试：能否在不自建全产业链的前提下锁死稀缺供应商？', desc: '核查是否通过战略参股、联合研发基金与共享技术路线图绑定核心卡脖子伙伴。' },
 { tag: 'Challenge 文化', title: '2. 工程直率测试：基层科学家能否当面质疑高管的物理与技术假设？', desc: '检验内部评审是否以物理事实与良率数据为准绳，而非服从行政职级。' },
 { tag: 'Care 与留才', title: '3. 长期安全感测试：薪酬与福利制度是否鼓励十年周期的冷板凳攻关？', desc: '评估核心科学家流失率以及管理层是否将员工满意度纳入考核。' },
 { tag: '客户共研绑定', title: '4. 利益共同体测试：下游核心客户是否愿意预付款甚至出资共担研发风险？', desc: '验证产品是否具备不可替代性，促使客户从“甲乙方博弈”转为“联合共投”。' },
 { tag: '全息软件护城河', title: '5. 软硬闭环测试：硬件设备是否耦合了高粘性的计算控制与量测软件？', desc: '防止沦为纯粹的金属机械组装厂，用算法与 20 年装机升级锁定客户。' },
 { tag: '组织敏捷度', title: '6. 反官僚测试：在高速扩张期能否主动精简管理与 IT 层级聚焦一线研发？', desc: '如 ASML 2026 年精简技术与 IT 架构，确保 €4.7B 研发投入精准流向核心突破。' }
 ];

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = PEER_ROWS.filter(function (r) {
 if (state.peerFilter !== 'all' && r.category !== state.peerFilter) return false;
 if (!q) return true;
 return (r.company + r.leader + r.positioning + r.culture + r.verdict).toLowerCase().indexOf(q) !== -1;
 });
 if (badge) badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '"><td><strong>' + r.company + '</strong><br/><span style="font-size:0.75rem;color:var(--text-muted);">' + r.leader + '</span></td><td>' + r.positioning + '</td><td>' + r.culture + '</td><td class="mono" style="font-size:0.78rem;">' + r.headcount + '</td><td class="mono" style="font-size:0.78rem;color:var(--mui-primary-lighter);font-weight:700;">' + r.margins + '</td><td>' + r.verdict + '</td></tr>';
 }).join('');
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

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c || !c.parentElement) return null;
 var r = c.parentElement.getBoundingClientRect(), w = Math.max(240, Math.floor(r.width)), h = Math.max(170, Math.floor(r.height)), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = w * dpr; c.height = h * dpr;
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function rr(ctx, x, y, w, h, r) { var rad = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.arcTo(x + w, y, x + w, y + h, rad); ctx.arcTo(x + w, y + h, x, y + h, rad); ctx.arcTo(x, y + h, x, y, rad); ctx.arcTo(x, y, x + w, y, rad); ctx.closePath(); }

 function drawCh1Chart() {
 var env = prepCanvas('chartCh1'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 28, right: 20, bottom: 40, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.ch1View === 'viewA') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', '2026E(指引)'];
 var rev = [18.61, 21.17, 27.56, 28.26, 32.67, 44.50];
 var maxY = 50;
 for (var g = 0; g <= 5; g++) {
 var gy = pad.top + ph - (g / 5) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('€' + (g * 10) + 'B', pad.left - 8, gy + 4);
 }
 var sl = pw / yrs.length, bw = Math.min(44, sl * 0.52);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sl + (sl - bw) / 2, bh = (rev[i] / maxY) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 5 ? pal.c2 : pal.c1; rr(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('€' + rev[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 });
 } else {
 var segs = [{ l: 'DUV 系统', v: 12.0, c: pal.c1 }, { l: 'EUV 系统', v: 11.6, c: pal.c4 }, { l: '装机管理 IBM', v: 8.19, c: pal.c2 }, { l: '量测与检测', v: 0.83, c: pal.c3 }];
 var sl2 = pw / segs.length, bw2 = Math.min(54, sl2 * 0.52), maxS = 14;
 for (var k = 0; k <= 4; k++) { var ky = pad.top + ph - (k / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); }
 segs.forEach(function (s, i) {
 var x = pad.left + i * sl2 + (sl2 - bw2) / 2, bh = (s.v / maxS) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = s.c; rr(ctx, x, yt, bw2, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('€' + s.v.toFixed(1) + 'B', x + bw2 / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(s.l, x + bw2 / 2, pad.top + ph + 20);
 });
 }
 }

 function drawRadarChart() {
 var env = prepCanvas('chartRadar'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var axes = ['生态共研编排', '工程直率辩论', '长期研发定力', '人才关怀留存', '物理垄断定价'];
 var series = [
 { key: 'asml', color: pal.c1, fill: 'rgba(51,153,255,0.24)', vals: [9.9, 9.5, 9.8, 9.4, 9.9] },
 { key: 'aapl', color: pal.c2, fill: 'rgba(34,197,94,0.16)', vals: [7.6, 9.2, 9.4, 8.6, 9.4] },
 { key: 'mform', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [6.5, 6.2, 6.8, 7.0, 6.5] }
 ];
 var cx = w / 2, cy = h / 2 + 8, rad = Math.max(60, Math.min((w - 190) / 2, h * 0.35));
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * rad; ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < 5; i++) { var a = -Math.PI / 2 + (i * 2 * Math.PI) / 5, px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
 ctx.closePath(); ctx.stroke();
 }
 for (var ax = 0; ax < 5; ax++) {
 var ang = -Math.PI / 2 + (ax * 2 * Math.PI) / 5;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad); ctx.stroke();
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = Math.abs(Math.cos(ang)) < 0.2 ? 'center' : (Math.cos(ang) > 0 ? 'left' : 'right');
 ctx.fillText(axes[ax], cx + Math.cos(ang) * (rad + 14), cy + Math.sin(ang) * (rad + 14));
 }
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 s.vals.forEach(function (v, idx) { var a = -Math.PI / 2 + (idx * 2 * Math.PI) / 5, d = (v / 10) * rad; if (idx === 0) ctx.moveTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d); else ctx.lineTo(cx + Math.cos(a) * d, cy + Math.sin(a) * d); });
 ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepCanvas('chartBars'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var items = [
 { l: 'Q3 2026 单季综合毛利率 (创历史新高)', v: 57.5, c: pal.c2 },
 { l: 'FY2025 全年综合毛利率 (US GAAP)', v: 52.8, c: pal.c1 },
 { l: 'FY2025 全年营业利润率 (Operating Margin)', v: 34.6, c: pal.c1 },
 { l: 'FY2025 全年 GAAP 净利润率 (€9.61B)', v: 29.4, c: pal.c4 },
 { l: 'FY2025 研发费用占营收比 (€4.7B)', v: 14.4, c: pal.c3 }
 ];
 var pad = { top: 12, right: 20, bottom: 20, left: 20 }, pw = w - 40, ph = h - 32, rowH = ph / items.length;
 items.forEach(function (it, i) {
 var rt = pad.top + i * rowH;
 ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.l, pad.left, rt + 18);
 ctx.fillStyle = it.c; ctx.font = 'bold 12px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(it.v.toFixed(1) + '%', pad.left + pw, rt + 18);
 ctx.fillStyle = pal.grid; rr(ctx, pad.left, rt + 26, pw, 14, 7); ctx.fill();
 ctx.fillStyle = it.c; rr(ctx, pad.left, rt + 26, (it.v / 65) * pw, 14, 7); ctx.fill();
 });
 }

 function drawEpsComboChart() {
 var env = prepCanvas('chartEps'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26(年化口径)'];
 var netB = [5.62, 7.84, 7.57, 9.61, 13.47];
 var gm = [50.5, 51.3, 51.3, 52.8, 57.5];
 var pad = { top: 28, right: 48, bottom: 40, left: 48 }, pw = w - 96, ph = h - 68, sl = pw / yrs.length, bw = Math.min(44, sl * 0.45);
 for (var g = 0; g <= 4; g++) { var gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); }
 var pts = [];
 yrs.forEach(function (y, i) {
 var cx = pad.left + sl * (i + 0.5), bh = (netB[i] / 16) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; rr(ctx, cx - bw / 2, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('€' + netB[i].toFixed(1) + 'B', cx, yt - 6);
 ctx.fillStyle = pal.tick; ctx.fillText(y, cx, pad.top + ph + 20);
 pts.push({ x: cx, y: pad.top + ph - ((gm[i] - 45) / 16) * ph, v: gm[i] });
 });
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (p, i) { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
 ctx.stroke();
 pts.forEach(function (p) { ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.2, 0, Math.PI * 2); ctx.fill(); });
 }

 function drawSimChart() {
 var env = prepCanvas('chartSim'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var p = state.sim.principal, yrs = state.sim.years, rBase = state.sim.priceCagr / 100, rTot = (state.sim.priceCagr + (state.sim.drip ? 2.0 : 0)) / 100;
 var tot = [], base = [];
 for (var y = 0; y <= yrs; y++) { tot.push(p * Math.pow(1 + rTot, y)); base.push(p * Math.pow(1 + rBase, y)); }
 var maxV = tot[yrs] * 1.1, pad = { top: 20, right: 20, bottom: 26, left: 55 }, pw = w - 75, ph = h - 46;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 tot.forEach(function (v, i) { var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (v / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 }

 function updateSim() {
 var p = state.sim.principal, yrs = state.sim.years, c = state.sim.priceCagr, rTot = (c + (state.sim.drip ? 2.0 : 0)) / 100;
 var endV = p * Math.pow(1 + rTot, yrs), midY = Math.max(1, Math.floor(yrs / 2)), midV = p * Math.pow(1 + rTot, midY);
 document.getElementById('simPrincipalLabel').textContent = '€' + Math.round(p).toLocaleString();
 document.getElementById('simYearsLabel').textContent = yrs + ' 年';
 document.getElementById('simCagrLabel').textContent = c.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = '€' + Math.round(endV).toLocaleString();
 document.getElementById('simMoicVal').textContent = (endV / p).toFixed(2) + 'x · ' + (rTot * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = '€' + Math.round(endV - p).toLocaleString();
 document.getElementById('simMidLabel').textContent = '第 ' + midY + ' 年中期资产节点';
 document.getElementById('simMidVal').textContent = '€' + Math.round(midV).toLocaleString();
 drawSimChart();
 }

 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

 document.addEventListener('DOMContentLoaded', function () {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 renderPeerTable(); renderChecklist(); updateSim(); renderAllCharts();

 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'ASML_Corporate_Culture_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出独立网页 ASML_Corporate_Culture_Analysis.html');
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
 b.addEventListener('click', function () { var el = document.getElementById(this.getAttribute('data-collapse-target')); if (el) el.classList.toggle('open'); });
 });
 document.querySelectorAll('[data-pillar]').forEach(function (b) {
 b.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0; state.activePillar = idx;
 document.querySelectorAll('[data-pillar]').forEach(function (x, i) { x.classList.toggle('active', i === idx); });
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

 document.getElementById('simPrincipalSlider').addEventListener('input', function () { state.sim.principal = parseFloat(this.value); updateSim(); });
 document.getElementById('simYearsSlider').addEventListener('input', function () { state.sim.years = parseInt(this.value, 10); updateSim(); });
 document.getElementById('simCagrSlider').addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value); updateSim(); });
 document.getElementById('simDripToggle').addEventListener('change', function () { state.sim.drip = this.checked; updateSim(); });
 var PRESETS = { p1: { p: 10000, y: 10, c: 24.5, d: true }, p2: { p: 10000, y: 13, c: 21.0, d: false }, p3: { p: 10000, y: 10, c: 14.0, d: true } };
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var pr = PRESETS[this.getAttribute('data-preset')];
 state.sim.principal = pr.p; state.sim.years = pr.y; state.sim.priceCagr = pr.c; state.sim.drip = pr.d;
 document.getElementById('simPrincipalSlider').value = pr.p; document.getElementById('simYearsSlider').value = pr.y;
 document.getElementById('simCagrSlider').value = pr.c; document.getElementById('simDripToggle').checked = pr.d;
 document.querySelectorAll('[data-preset]').forEach(function (x) { x.classList.toggle('active', x === b); });
 updateSim();
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

 
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
   sbBtn.addEventListener('click', function () {
     if (window.innerWidth < 1024) { var o = sb.classList.toggle('open'); bd.classList.toggle('open', o); }
   });
   bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 var lg = document.getElementById('langSwitchGroup');
 if (lg) {
   lg.addEventListener('click', function (e) {
     var b = e.target.closest('[data-lang]'); if (!b) return;
     var l = b.getAttribute('data-lang');
     document.getElementById('langZhBtn').classList.toggle('active', l === 'zh');
     document.getElementById('langEnBtn').classList.toggle('active', l === 'en');
     showToast(l === 'en' ? 'English labels active on key headers' : '已切换为中文视图');
   });
 }

 window.addEventListener('scroll', function () {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }, { passive: true });
 window.addEventListener('resize', function () { setTimeout(renderAllCharts, 80); });
 });
 })();
 