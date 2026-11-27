
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1', STORAGE_CHECK_KEY = 'pdd_culture_checks_v1';
 var TITLE_ZH = '拼多多控股 PDD Holdings (PDD) 企业文化与组织架构深度研究报告 | 数据中心';
 var TITLE_EN = 'PDD Holdings (PDD) Corporate Culture & Org Architecture Deep Dive | Research Hub';
 var state = { theme: 'light', lang: 'zh', ch1View: 'viewA', activePillar: 0, radarSeries: { pdd: true, aapl: true, mform: true }, peerFilter: 'all', peerQuery: '', sim: { principal: 10000, years: 10, priceCagr: 11.0, drip: true, preset: 'p1' }, checks: [true, true, true, false, false, false] };
 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function isEn() { return state.lang === 'en'; }
 function showToast(msg) { var el = document.getElementById('muiSnackbar'); if (!el) return; el.textContent = msg; el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 2200); }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return { isDark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)', pillBg: dark ? 'rgba(9,13,22,0.88)' : 'rgba(255,255,255,0.94)', pillBorder: dark ? 'rgba(51,153,255,0.28)' : 'rgba(0,115,230,0.24)', trackBg: dark ? 'rgba(148,163,184,0.10)' : 'rgba(15,25,36,0.06)', hoverBand: dark ? 'rgba(51,153,255,0.08)' : 'rgba(0,115,230,0.05)', c1: dark ? '#3399FF' : '#0073E6', c2: dark ? '#22C55E' : '#16A34A', c3: dark ? '#FFB74D' : '#D97706', c4: dark ? '#A78BFA' : '#7C3AED' };
 }

 var RICH_I18N = {
 lead: {
 zh: '为什么传统电商巨头动辄拥有 19 万至 60 万名员工，而<strong>拼多多（PDD Holdings, NASDAQ: PDD）</strong>仅凭 <strong>25,474 名全职员工</strong>（2025年 Form 20-F 披露）就创造出 <strong>RMB 4,318.5 亿（US$617.5 亿）</strong>营收与 <strong>RMB 978.4 亿</strong>净利润 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 20-F ↗</a>？答案在于创始人黄峥源自段永平体系的<strong>“本分（Benfen）”</strong>价值观，以及极度克制的<strong>“原子化扁平组织”</strong>：公司内部不设 VP/SVP 显性官僚头衔，全员以花名（如陈磊“土豆”、赵佳臻“冬枣”）相称；一线项目组以“小分队”形式围绕核心指标（GMV/转化率/百亿补贴）展开<strong>内部赛马</strong>，将全部精力聚焦于消费者“多实惠、多乐趣”的本质需求，从而在 2026 Q3 交出营收 RMB 1,083.4 亿、净利 RMB 295.4 亿与 RMB 4,554 亿现金的惊人答卷 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 财报 ↗</a>。',
 en: 'While legacy e-commerce giants employ 190k–600k+ staff, <strong>PDD Holdings (NASDAQ: PDD)</strong> generated <strong>RMB 431.85B (US$61.75B)</strong> in revenue and <strong>RMB 97.84B</strong> in net profit with just <strong>25,474 FTEs</strong> per its FY2025 Form 20-F <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 20-F ↗</a>. The secret lies in founder Colin Huang’s <strong>"Benfen"</strong> creed and an <strong>atomic flat organization</strong>: eliminating VP titles, using casual nicknames, and running internal tiger-team horse races—yielding RMB 108.34B revenue, RMB 29.54B profit, and RMB 455.4B cash in Q3 2026 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 Release ↗</a>.'
 }
 };
 var PILLAR_NOTES_ZH = [
 '<strong>当前选中（01 本分 Benfen）：</strong>本分是拼多多最底层的筛选器——外界越喧嚣，内部越强调“做正确的事，把事情做正确”，2025–2026 主动让利千亿扶持商家正是本分长期主义的体现。',
 '<strong>当前选中（02 花名文化与去官僚）：</strong>没有层层审批的汇报 PPT，G&amp;A 管理费用率低至 1.54%，确保 25,474 名高密度人才把时间花在算法与供应链上。',
 '<strong>当前选中（03 内部赛马机制）：</strong>多多买菜与 Temu 均从内部小分队赛马中杀出，数据跑通即刻获得饱和资源倾斜，形成极强的跨周期自我颠覆力。',
 '<strong>当前选中（04 千亿扶持治理升级）：</strong>赵佳臻主导的“商保会”与雄安百万级“申诉优赔”标志着拼多多从草莽增长迈向成熟平台生态治理。'
 ];
 var PILLAR_NOTES_EN = [
 '<strong>Selected (01 Benfen):</strong> Benfen filters out external noise—anchoring PDD’s 2025–2026 RMB 100B merchant reinvestment on long-term platform health.',
 '<strong>Selected (02 Nickname Flatness):</strong> Zero PowerPoint hierarchy keeps G&amp;A at 1.54% of sales so 25,474 specialists stay close to code and merchants.',
 '<strong>Selected (03 Horse-Racing):</strong> Both Duoduo Grocery and Temu emerged from internal tiger-team races that earned instant company-wide scaling.',
 '<strong>Selected (04 Governance Evolution):</strong> Zhao Jiazhen’s Merchant Protection Committee and Xiong’an appeal center mark PDD’s maturation into balanced ecosystem stewardship.'
 ];

 var PEER_ROWS_ZH = [
 { cat: 'lean', bench: true, company: '研究基准：拼多多 (PDD)', leader: '陈磊 / 赵佳臻 (双联席董事长)', arch: '极简原子化扁平组织 + 内部赛马', creed: '本分 (Benfen) + 花名平级 + ROI 算法驱动', fte: '25,474人 · 人均创收 ¥16.95M', fin: 'FY25 ¥431.8B · Q3\'26 净利率 27.3% · ¥455.4B 现金' },
 { cat: 'lean', bench: false, company: '苹果 (Apple · AAPL)', leader: '约翰·特努斯 / 蒂姆·库克', arch: '职能制集权 + 全公司唯一损益表', creed: '专家领导专家 + DRI 单点问责', fte: '16.7万人 · 人均创收 $2.87M', fin: 'FY26 $478.8B · 综合毛利 48.8% · 净利 $132.2B' },
 { cat: 'lean', bench: false, company: '英伟达 (NVIDIA · NVDA)', leader: '黄仁勋 (Jensen Huang)', arch: '超扁平蛛网职能制 (~60直报)', creed: '无事业部墙 + Top-5 透明邮件', fte: '~4.2万人 · 人均创收 ~$5.14M', fin: 'FY26 $215.9B · GAAP 毛利 71.1%' },
 { cat: 'matrix', bench: false, company: '亚马逊 (Amazon · AMZN)', leader: '安迪·贾西 (Andy Jassy)', arch: '解耦 API + 双披萨自治团队', creed: 'Day 1 + 16条领导力准则', fte: '~155万人 (含全球履约网络)', fin: 'FY25 $716.9B · AWS 与广告双擎盈利' },
 { cat: 'matrix', bench: false, company: '阿里巴巴 (Alibaba · BABA)', leader: '吴泳铭 / 蔡崇信', arch: '多事业集团矩阵 (淘天/云/国际)', creed: '客户第一 + 用户为先 + AI 驱动', fte: '~19万人+', fin: '生态体量庞大，持续推进组织瘦身协同' }
 ];
 var PEER_ROWS_EN = [
 { cat: 'lean', bench: true, company: 'Benchmark: PDD Holdings (PDD)', leader: 'Lei Chen &amp; Jiazhen Zhao (Co-Chairmen)', arch: 'Atomic Flat Org + Internal Horse-Racing', creed: 'Benfen + Nickname Equality + Algo ROAS', fte: '25,474 FTEs · ¥16.95M Rev/FTE', fin: 'FY25 ¥431.8B · Q3\'26 27.3% NM · ¥455.4B Cash' },
 { cat: 'lean', bench: false, company: 'Apple (AAPL)', leader: 'John Ternus / Tim Cook', arch: 'Functional Org + Single Unified P&amp;L', creed: 'Experts Leading Experts + Single DRI', fte: '167k FTEs · $2.87M Rev/FTE', fin: 'FY26 $478.8B · 48.8% GM · $132.2B Net Inc' },
 { cat: 'lean', bench: false, company: 'NVIDIA (NVDA)', leader: 'Jensen Huang', arch: 'Ultra-Flat Functional (~60 Direct Reports)', creed: 'Zero BU Walls + Top-5 Emails', fte: '~42k FTEs · ~$5.14M Rev/FTE', fin: 'FY26 $215.9B · 71.1% GAAP GM' },
 { cat: 'matrix', bench: false, company: 'Amazon (AMZN)', leader: 'Andy Jassy', arch: 'API-Decoupled + Two-Pizza Teams', creed: 'Day 1 + 16 Leadership Principles', fte: '~1.55M (incl. Fulfillment)', fin: 'FY25 $716.9B · AWS &amp; Ads Profit Engines' },
 { cat: 'matrix', bench: false, company: 'Alibaba (BABA)', leader: 'Eddie Wu / Joe Tsai', arch: 'Multi-BG Matrix (Taobao/Cloud/AIDC)', creed: 'User First + AI-Driven Restructuring', fte: '~190k+ FTEs', fin: 'Massive GMV scale; streamlining BG complexity' }
 ];

 var CHECKLIST_ZH = [
 { tag: '本分定力', title: '1. 本分价值观测试：是否拒绝迎合短期华尔街叙事而坚守商业本质？', desc: '敢于在业绩巅峰主动推出“千亿扶持”让利商家、牺牲短期利润巩固十年供给护城河。' },
 { tag: '极简人效', title: '2. 原子化人效测试：G&amp;A 行政费用率是否严控在 2% 以内？', desc: '对标拼多多 25,474 名员工创造 ¥4,318 亿营收与 1.54% G&amp;A 费率的极致组织密度。' },
 { tag: '内部赛马', title: '3. 敏捷赛马测试：新业务能否通过小分队快速验证并饱和跟进？', desc: '检验公司是否具备在不膨胀总部编制的前提下孵化出多多买菜与 Temu 的组织弹性。' },
 { tag: '花名平级', title: '4. 去官僚化测试：内部沟通是否以数据 ROI 而非行政职级为准？', desc: '杜绝冗余 PPT 汇报与部门墙，确保一线运营直面转化率与用户留存核心指标。' },
 { tag: '治理平衡', title: '5. 商家生态平衡测试：能否从买家单边倾斜进化为双边共赢？', desc: '核查“商保会”与“申诉优赔”机制是否真正降低了优质产业带商家的经营摩擦。' },
 { tag: '资本纪律', title: '6. 轻资产现金测试：是否严守零重资产囤货与高自由现金流转化？', desc: 'CapEx 占营收比长期低于 0.5%，将经营利润高效沉淀为净现金堡垒。' }
 ];
 var CHECKLIST_EN = [
 { tag: 'Benfen', title: '1. Benfen Test: Does leadership prioritize long-term merchant/buyer value over Wall Street optics?', desc: 'Willingness to launch RMB 100B merchant support despite short-term margin compression.' },
 { tag: '1.5% G&A', title: '2. Atomic Efficiency Test: Is G&amp;A kept ultra-lean under 2% of revenue?', desc: 'Benchmarked against PDD’s 25,474 FTEs generating RMB 431.8B at 1.54% G&amp;A.' },
 { tag: 'Agility', title: '3. Horse-Racing Test: Can small tiger teams validate and scale new S-curves rapidly?', desc: 'Ability to incubate Duoduo Grocery and Temu without bloating HQ bureaucracy.' },
 { tag: 'Flatness', title: '4. Anti-Bureaucracy Test: Do live ROAS metrics override administrative titles?', desc: 'Zero PowerPoint culture; frontline teams optimize directly for conversion and retention.' },
 { tag: 'Ecosystem', title: '5. Merchant Balance Test: Are buyer-first rules balanced with seller protection?', desc: 'Tracking Merchant Protection Committee and daily million-scale appeal compensation.' },
 { tag: '0.27% CapEx', title: '6. Asset-Light Test: Does growth convert cleanly into unencumbered cash?', desc: 'CapEx <0.5% of sales, compounding cash &amp; investments to RMB 571.1B.' }
 ];

 function renderPeerTable() {
 var tb = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
 var src = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH, q = state.peerQuery.trim().toLowerCase();
 var f = src.filter(function (r, idx) {
 var okCat = state.peerFilter === 'all' || r.cat === state.peerFilter;
 if (!okCat) return false;
 if (!q) return true;
 var z = PEER_ROWS_ZH[idx], e = PEER_ROWS_EN[idx];
 return (z.company + z.leader + z.arch + z.creed + e.company + e.leader + e.arch + e.creed).toLowerCase().indexOf(q) !== -1;
 });
 badge.textContent = isEn() ? ('Showing ' + f.length + ' / ' + src.length + ' Peers') : ('显示 ' + f.length + ' / ' + src.length + ' 家标杆企业');
 tb.innerHTML = f.map(function (r) {
 return '<tr class="' + (r.bench ? 'benchmark-row' : '') + '"><td><strong>' + r.company + '</strong><br><span style="font-size:0.75rem;color:var(--text-muted);">' + r.leader + '</span></td><td>' + r.arch + '</td><td>' + r.creed + '</td><td class="mono">' + r.fte + '</td><td class="mono" style="color:var(--mui-primary-lighter);font-weight:700;">' + r.fin + '</td></tr>';
 }).join('');
 }

 function renderChecklist() {
 var c = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
 var list = isEn() ? CHECKLIST_EN : CHECKLIST_ZH, done = state.checks.filter(Boolean).length, pct = Math.round((done / list.length) * 100);
 chip.textContent = isEn() ? ('Verified ' + done + ' / ' + list.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + list.length + ' 项 (' + pct + '%)');
 bar.style.width = pct + '%';
 c.innerHTML = list.map(function (it, idx) {
 var chk = !!state.checks[idx];
 return '<label class="check-card ' + (chk ? 'checked' : '') + '"><input type="checkbox" data-check-input="' + idx + '" ' + (chk ? 'checked' : '') + ' /><div><div style="display:flex;justify-content:space-between;gap:6px;flex-wrap:wrap;"><span class="check-title">' + it.title + '</span><span class="mui-chip mono">' + it.tag + '</span></div><p class="check-desc">' + it.desc + '</p></div></label>';
 }).join('');
 }

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect(), w = Math.max(240, rect.width || 480), h = Math.max(160, rect.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return; var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }
 function drawSmoothLine(ctx, pts) { if (!pts.length) return; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); for (var i = 0; i < pts.length - 1; i++) { var xc = (pts[i].x + pts[i + 1].x) / 2; ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y); } }
 function drawValueBadge(ctx, text, cx, cy, fgColor, pal, maxW, maxH) {
 ctx.save(); ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; var tw = ctx.measureText(text).width + 9, th = 17;
 var bx = cx; if (maxW) bx = Math.max(tw / 2 + 4, Math.min(maxW - tw / 2 - 4, cx));
 var by = cy; if (maxH) by = Math.max(th / 2 + 2, Math.min(maxH - th / 2 - 2, cy));
 ctx.fillStyle = pal.pillBg; roundRect(ctx, bx - tw / 2, by - th / 2, tw, th, 5); ctx.fill(); ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, bx, by + 0.5); ctx.restore();
 }

 function drawCh1Chart() {
 var env = prepCanvas('chartCh1'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartCh1 = [];
 var pad = { top: 28, right: 20, bottom: 38, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.ch1View === 'viewA') {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', '9M\'26'], mkt = [102.7, 153.5, 197.9, 217.8, 167.4], txn = [27.8, 94.1, 195.9, 214.1, 159.5], maxY = 480;
 for (var g = 0; g <= 4; g++) { var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('¥' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4); }
 var slot = pw / yrs.length, bw = Math.min(44, slot * 0.54);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, h1 = (mkt[i] / maxY) * ph, h2 = (txn[i] / maxY) * ph, yt = pad.top + ph - h1 - h2;
 ctx.fillStyle = pal.c1; roundRect(ctx, cx - bw / 2, pad.top + ph - h1, bw, h1, 4); ctx.fill();
 ctx.fillStyle = pal.c2; roundRect(ctx, cx - bw / 2, yt, bw, h2, 4); ctx.fill();
 drawValueBadge(ctx, '¥' + (mkt[i] + txn[i]).toFixed(0) + 'B', cx, yt - 12, pal.c1, pal);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartCh1.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24, html: '<strong>' + y + '</strong><br/>Marketing: ¥' + mkt[i] + 'B<br/>Transaction: ¥' + txn[i] + 'B' });
 });
 } else {
 var yrsB = ['FY23', 'FY24', 'FY25', 'Q3\'26'], sm = [33.2, 28.3, 29.0, 23.3], rd = [4.4, 3.2, 3.8, 4.7], ga = [1.6, 1.9, 1.5, 1.5], maxB = 40;
 for (var k = 0; k <= 4; k++) { var kv = k * 10, ky = pad.top + ph - (kv / maxB) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(kv + '%', pad.left - 8, ky + 4); }
 var stepX = pw / (yrsB.length - 1);
 function plotR(arr, col, dy) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxB) * ph, v: v }; });
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill();
 if (idx === 0 || idx === arr.length - 1) drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y + dy, col, pal, w, h);
 });
 }
 plotR(sm, pal.c3, -14); plotR(rd, pal.c4, -15); plotR(ga, pal.c2, 14);
 yrsB.forEach(function (y, idx) { var px = pad.left + idx * stepX; ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(y, px, pad.top + ph + 20); hitRegions.chartCh1.push({ idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 24, html: '<strong>' + y + ' OpEx %</strong><br/>S&amp;M: ' + sm[idx] + '% · R&amp;D: ' + rd[idx] + '% · G&amp;A: ' + ga[idx] + '%' }); });
 }
 }

 function drawRadarChart() {
 var env = prepCanvas('chartRadar'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartRadar = [];
 var axes = en ? ['Benfen Focus', 'Flatness & Low G&A', 'Tiger-Team Speed', 'Rev / Employee', 'Cash Compounding'] : ['本分战略定力', '扁平低管理费', '内部赛马迭代', '人均创收密度', '轻资产现金复利'];
 var series = [
 { key: 'pdd', color: pal.c1, fill: 'rgba(51,153,255,0.24)', vals: [9.5, 9.8, 9.7, 9.6, 9.8] },
 { key: 'aapl', color: pal.c2, fill: 'rgba(34,197,94,0.16)', vals: [9.6, 8.8, 7.6, 9.8, 9.6] },
 { key: 'mform', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [6.4, 5.4, 6.2, 6.0, 6.5] }
 ];
 var cx = w / 2, cy = h / 2 + 10, r = Math.max(52, Math.min((w - 220) / 2, h * 0.34)), n = axes.length;
 for (var ring = 2; ring <= 10; ring += 2) {
 var rr = (ring / 10) * r; ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + (i * 2 * Math.PI) / n, px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
 ctx.closePath(); ctx.stroke();
 if (ring === 4 || ring === 8 || ring === 10) { ctx.fillStyle = pal.tick; ctx.font = '9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(String(ring), cx + 9, cy - rr + 3); }
 }
 axes.forEach(function (ax, i) {
 var a = -Math.PI / 2 + (i * 2 * Math.PI) / n, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
 var lx = Math.max(10, Math.min(w - 10, cx + Math.cos(a) * (r + 14))), ly = Math.max(12, Math.min(h - 12, cy + Math.sin(a) * (r + 14)));
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(a)) < 0.2 ? 'center' : (Math.cos(a) > 0 ? 'left' : 'right');
 ctx.fillText(ax, lx, ly);
 hitRegions.chartRadar.push({ idx: i, x: Math.min(x, lx) - 36, y: Math.min(y, ly) - 20, w: 72 + Math.abs(lx - x), h: 40, html: '<strong>' + ax + '</strong><br/>PDD: ' + series[0].vals[i] + ' · AAPL: ' + series[1].vals[i] });
 });
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + (i * 2 * Math.PI) / n, d = (s.vals[i] / 10) * r, px = cx + Math.cos(a) * d, py = cy + Math.sin(a) * d; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
 ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
 for (var j = 0; j < n; j++) { var aj = -Math.PI / 2 + (j * 2 * Math.PI) / n, dj = (s.vals[j] / 10) * r; ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(cx + Math.cos(aj) * dj, cy + Math.sin(aj) * dj, 3.2, 0, Math.PI * 2); ctx.fill(); }
 });
 }

 function drawHorizontalBars() {
 var env = prepCanvas('chartBars'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartBars = [];
 var items = [
 { label: en ? 'Q3\'26 Gross Margin' : 'Q3\'26 综合毛利率', val: 58.2, col: pal.c2 },
 { label: en ? 'Q3\'26 Operating Margin' : 'Q3\'26 营业利润率', val: 28.8, col: pal.c1 },
 { label: en ? 'Q3\'26 Net Margin' : 'Q3\'26 GAAP 净利率', val: 27.3, col: pal.c4 },
 { label: en ? 'Q3\'26 Sales & Mkt %' : 'Q3\'26 销售与营销费率', val: 23.3, col: pal.c3 },
 { label: en ? 'Q3\'26 R&D Intensity %' : 'Q3\'26 研发费用率', val: 4.67, col: pal.c4 },
 { label: en ? 'Q3\'26 G&A Admin %' : 'Q3\'26 行政管理费率 (极简)', val: 1.46, col: pal.c2 }
 ];
 var pad = { top: 12, right: 20, bottom: 24, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, rowH = ph / items.length, maxX = 68;
 items.forEach(function (it, i) {
 var top = pad.top + i * rowH, bw = Math.max(6, (it.val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.label, pad.left, top + 15);
 ctx.fillStyle = it.col; ctx.font = 'bold 11.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, top + 15);
 ctx.fillStyle = pal.trackBg; roundRect(ctx, pad.left, top + 22, pw, 13, 6); ctx.fill();
 ctx.fillStyle = it.col; roundRect(ctx, pad.left, top + 22, bw, 13, 6); ctx.fill();
 hitRegions.chartBars.push({ idx: i, x: pad.left, y: top, w: pw, h: rowH, html: '<strong>' + it.label + '</strong>: ' + it.val.toFixed(2) + '%' });
 });
 }

 function drawEpsComboChart() {
 var env = prepCanvas('chartEps'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'], netB = [31.5, 60.0, 112.4, 97.8, 102.0], gm = [75.9, 63.0, 60.9, 56.3, 58.2];
 var pad = { top: 28, right: 50, bottom: 40, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxN = 135, slot = pw / yrs.length, bw = Math.min(44, slot * 0.45), pts = [];
 for (var g = 0; g <= 4; g++) {
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('¥' + ((maxN / 4) * g).toFixed(0) + 'B', pad.left - 7, gy + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((40 + (45 / 4) * g).toFixed(0) + '%', pad.left + pw + 7, gy + 4);
 }
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, bh = (netB[i] / maxN) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; roundRect(ctx, cx - bw / 2, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('¥' + netB[i].toFixed(0) + 'B', cx, pad.top + ph - 10);
 pts.push({ x: cx, y: pad.top + ph - ((gm[i] - 40) / 45) * ph, v: gm[i] });
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartEps.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24, html: '<strong>' + y + '</strong><br/>Net Income: ¥' + netB[i] + 'B<br/>Gross Margin: ' + gm[i] + '%' });
 });
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt) { ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill(); drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 14, pal.c2, pal, w, h); });
 }

 function drawSimChart() {
 var env = prepCanvas('chartSim'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years, r1 = state.sim.priceCagr / 100, r2 = (state.sim.priceCagr + (state.sim.drip ? 4.5 : 0)) / 100;
 var s1 = [], s2 = []; for (var y = 0; y <= yrs; y++) { s1.push(p * Math.pow(1 + r1, y)); s2.push(p * Math.pow(1 + r2, y)); }
 var maxV = Math.max(s2[yrs], p * 1.2) * 1.14, pad = { top: 22, right: 26, bottom: 26, left: 60 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, stepX = pw / yrs;
 for (var sg = 0; sg <= 2; sg++) {
 var sgv = (maxV / 2) * sg, sgy = pad.top + ph - (sg / 2) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sgy); ctx.lineTo(pad.left + pw, sgy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + (sgv >= 1000 ? (sgv / 1000).toFixed(0) + 'k' : Math.round(sgv)), pad.left - 7, sgy + 3);
 }
 var pts1 = s1.map(function (v, i) { return { x: pad.left + i * stepX, y: pad.top + ph - (v / maxV) * ph }; });
 var pts2 = s2.map(function (v, i) { return { x: pad.left + i * stepX, y: pad.top + ph - (v / maxV) * ph }; });
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.6; drawSmoothLine(ctx, pts1); ctx.stroke(); ctx.restore();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts2); ctx.stroke();
 drawValueBadge(ctx, '$' + (s2[yrs] / 1000).toFixed(1) + 'k', pts2[yrs].x, pts2[yrs].y - 13, pal.c1, pal, w, h);
 for (var t = 0; t <= yrs; t++) {
 if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) { ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('Y' + t, pts2[t].x, pad.top + ph + 16); }
 hitRegions.chartSim.push({ idx: t, x: pts2[t].x - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 20, html: '<strong>Year ' + t + '</strong><br/>Total: $' + Math.round(s2[t]).toLocaleString() + '<br/>Base: $' + Math.round(s1[t]).toLocaleString() });
 }
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr, rate = (cagr + (state.sim.drip ? 4.5 : 0)) / 100;
 var endV = p * Math.pow(1 + rate, yrs), midY = Math.max(1, Math.floor(yrs / 2)), midV = p * Math.pow(1 + rate, midY);
 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = '$' + Math.round(endV).toLocaleString('en-US');
 document.getElementById('simMoicVal').textContent = (endV / p).toFixed(2) + 'x · ' + (rate * 100).toFixed(1) + '%';
 document.getElementById('simNetGainVal').textContent = '$' + Math.round(endV - p).toLocaleString('en-US');
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midY + ' Midpoint') : ('第 ' + midY + ' 年中期节点');
 document.getElementById('simMidVal').textContent = '$' + Math.round(midV).toLocaleString('en-US');
 drawSimChart();
 }

 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }
 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl && sd) { sl.setAttribute('aria-pressed', String(state.theme === 'light')); sd.setAttribute('aria-pressed', String(state.theme === 'dark')); }
 renderAllCharts(); if (!silent) showToast(isEn() ? (state.theme === 'dark' ? 'Dark Mode' : 'Light Mode') : (state.theme === 'dark' ? '已切换深色模式' : '已切换浅色模式'));
 }
 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh'; var en = isEn();
 document.documentElement.lang = en ? 'en' : 'zh-CN'; document.title = en ? TITLE_EN : TITLE_ZH;
 document.getElementById('langZhBtn').classList.toggle('active', !en); document.getElementById('langEnBtn').classList.toggle('active', en);
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) { var v = el.getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh'); if (v !== null) { if (v.indexOf('<span') !== -1) el.innerHTML = v; else el.textContent = v; } });
 document.querySelectorAll('[data-i18n-rich]').forEach(function (el) { var rk = el.getAttribute('data-i18n-rich'); if (RICH_I18N[rk]) el.innerHTML = en ? RICH_I18N[rk].en : RICH_I18N[rk].zh; });
 document.querySelectorAll('[data-i18n-ph-zh]').forEach(function (el) { el.setAttribute('placeholder', el.getAttribute(en ? 'data-i18n-ph-en' : 'data-i18n-ph-zh')); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>';
 renderPeerTable(); renderChecklist(); updateSimulatorUI(); renderAllCharts();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 function wireTip(cid, fn) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip'); if (!c || !tip) return;
 c.addEventListener('mousemove', function (e) {
 var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, arr = hitRegions[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) { var rg = arr[i]; if (x >= rg.x && x <= rg.x + rg.w && y >= rg.y && y <= rg.y + rg.h) { hit = rg; break; } }
 if (hit) { tip.innerHTML = hit.html; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 305, Math.max(12, e.clientX + 14)) + 'px'; tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, e.clientY - 28)) + 'px'; } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(function (id) { wireTip(id); });

 document.querySelectorAll('[data-ch1-view]').forEach(function (b) { b.addEventListener('click', function () { state.ch1View = b.getAttribute('data-ch1-view'); document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA'); document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB'); drawCh1Chart(); }); });
 document.querySelectorAll('[data-pillar]').forEach(function (b) { b.addEventListener('click', function () { state.activePillar = parseInt(b.getAttribute('data-pillar'), 10) || 0; document.querySelectorAll('[data-pillar]').forEach(function (x) { x.classList.toggle('active', x === b); }); document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>'; }); });
 document.querySelectorAll('[data-radar-key]').forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-radar-key'); state.radarSeries[k] = !state.radarSeries[k]; if (!state.radarSeries.pdd && !state.radarSeries.aapl && !state.radarSeries.mform) state.radarSeries[k] = true; b.classList.toggle('muted', !state.radarSeries[k]); drawRadarChart(); }); });
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 document.querySelectorAll('[data-peer-filter]').forEach(function (b) { b.addEventListener('click', function () { state.peerFilter = b.getAttribute('data-peer-filter'); document.querySelectorAll('[data-peer-filter]').forEach(function (x) { x.classList.toggle('active', x === b); }); renderPeerTable(); }); });

 var pS = document.getElementById('simPrincipalSlider'), yS = document.getElementById('simYearsSlider'), cS = document.getElementById('simCagrSlider'), dT = document.getElementById('simDripToggle');
 pS.addEventListener('input', function () { state.sim.principal = parseFloat(this.value); updateSimulatorUI(); });
 yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10); updateSimulatorUI(); });
 cS.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value); updateSimulatorUI(); });
 dT.addEventListener('change', function () { state.sim.drip = this.checked; updateSimulatorUI(); });
 var PRESETS = { p1: { p: 10000, y: 10, c: 11.0, d: true }, p2: { p: 10000, y: 5, c: 28.0, d: false }, p3: { p: 10000, y: 10, c: 6.5, d: true } };
 document.querySelectorAll('[data-preset]').forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-preset'), cfg = PRESETS[k]; state.sim = { principal: cfg.p, years: cfg.y, priceCagr: cfg.c, drip: cfg.d, preset: k }; pS.value = cfg.p; yS.value = cfg.y; cS.value = cfg.c; dT.checked = cfg.d; document.querySelectorAll('[data-preset]').forEach(function (x) { x.classList.toggle('active', x === b); }); updateSimulatorUI(); }); });

 document.getElementById('checklistContainer').addEventListener('change', function (e) { var inp = e.target.closest('[data-check-input]'); if (!inp) return; state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = inp.checked; try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {} renderChecklist(); });
 document.getElementById('checkAllBtn').addEventListener('click', function () { state.checks = [true, true, true, true, true, true]; try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (e) {} renderChecklist(); });
 document.getElementById('resetCheckBtn').addEventListener('click', function () { state.checks = [true, true, true, false, false, false]; try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (e) {} renderChecklist(); });

 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 var QIDX = [{ s: 'sec-00', t: '00 执行摘要与核心指标' }, { s: 'sec-01', t: '01 原子化组织与双核协同' }, { s: 'sec-02', t: '02 四大文化支柱与雷达' }, { s: 'sec-03', t: '03 全球巨头文化横向对比' }, { s: 'sec-04', t: '04 极简人效与现金复利' }, { s: 'sec-05', t: '05 三代演进与四大战役' }, { s: 'sec-06', t: '06 拼多多文化核查清单' }, { s: 'sec-07', t: '07 数据来源与监管索引' }];
 qIn.addEventListener('focus', function () { qPop.innerHTML = QIDX.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.s + '"><span class="quick-jump-item-title">' + x.t + '</span></button>'; }).join(''); qPop.classList.add('open'); });
 qIn.addEventListener('input', function () { var kw = qIn.value.toLowerCase(); qPop.innerHTML = QIDX.filter(function (x) { return x.t.toLowerCase().indexOf(kw) !== -1; }).map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.s + '"><span class="quick-jump-item-title">' + x.t + '</span></button>'; }).join(''); qPop.classList.add('open'); });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; document.querySelector(jb.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () { if (window.innerWidth < 1120) { var op = sb.classList.toggle('open'); bd.classList.toggle('open', op); } else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(renderAllCharts, 60); } });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 window.addEventListener('scroll', function () { var bar = document.getElementById('readingProgressBar'), dh = document.documentElement.scrollHeight - window.innerHeight; if (bar) bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });

 document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () { var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }); var url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'PDD_Corporate_Culture_Analysis.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(url); }, 1500); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });

 try {
 var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null'); if (Array.isArray(sc) && sc.length === 6) state.checks = sc;
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) { applyLang('zh', true); }
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(renderAllCharts, 90); });
 window.addEventListener('load', renderAllCharts);
 if (typeof ResizeObserver !== 'undefined') { var _ro = new ResizeObserver(function () { clearTimeout(window._rt); window._rt = setTimeout(renderAllCharts, 60); }); document.querySelectorAll('.canvas-stage,.canvas-stage-tall,.canvas-stage-bars,.canvas-stage-sim').forEach(function (b) { _ro.observe(b); }); }
 })();
 