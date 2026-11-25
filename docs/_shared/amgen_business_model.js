
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'amgn_bm_stress_v1';
 var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'prod', kView: 'debt' };
 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: dark ? '#3399FF' : '#0073E6', blueSoft: dark ? 'rgba(51,153,255,0.24)' : 'rgba(0,115,230,0.16)', green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706', violet: dark ? '#A78BFA' : '#7C3AED', red: dark ? '#FF6B6B' : '#DC2626' };
 }
 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var lb = document.getElementById('sideThemeLightBtn'), db = document.getElementById('sideThemeDarkBtn');
 if (lb) lb.setAttribute('aria-pressed', state.theme === 'light');
 if (db) db.setAttribute('aria-pressed', state.theme === 'dark');
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }
 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh'); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en'); }
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
 var val = el.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) { if (val.indexOf('<span') !== -1) el.innerHTML = val; else el.textContent = val; }
 });
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var LENSES = [
 { formula: '研发 ROI = 人类遗传学靶点验证胜率 (~2x+) × 生成生物学蛋白设计提速 ÷ 全球多中心 III 期临床边际成本', body: '传统药企靠海量盲筛化合物赌运气，临床 II/III 期折戟率极高；安进通过 deCODE genetics 对数十万人群进行全基因组测序，在人体“自然实验”中直接验证基因突变与疾病因果关系（如 PCSK9 与 Repatha、Lp(a) 与 Olpasiran），大幅提高大分子与多特异性抗体管线成功率。' },
 { formula: '营收韧性 = 核心增量6大引擎 (+27%~+191% 放量) + 生物类似药 ($3B+ 防御盾) - 专利到期药自然侵蚀', body: '9M 2026 面临 Prolia/Xgeva 生物类似药侵蚀与 Enbrel IRA 降价双重逆风，但安进凭全公司 10% 的处方销量增长仍录得 +8% 总营收增长。17 款年化十亿美元以上产品形成“多引擎接力”，避免把命运押注于单一爆款。' },
 { formula: '股东回报 = 47.3% Non-GAAP 营业利润率 × 强劲 FCF ($8.6B/9M) → 并购后高速去杠杆 + 连续14年股息递增', body: '生物大分子发酵与灌流工艺壁垒极高，使安进稳居行业顶级毛利率（~70.8% GAAP / ~80.7% Non-GAAP）。在 $278亿 收购 Horizon 后，管理层严守财务纪律暂停大额回购，优先将现金流用于降债并连续 14 年提高股息。' }
 ];
 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]'); if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 lensTabs.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });

 var NODES = [
 { badge: 'NODE 01 · DECODE GENETICS & CAUSAL TARGETS', title: '人类遗传学导航：用百万级真实人群基因组代替“盲人摸象式”药物筛选', desc: '2012 年收购冰岛 deCODE genetics 是安进研发范式的分水岭。借助涵盖数百万人群的深层基因组与多组学数据库（超 200 PB 数据）以及 NVIDIA DGX SuperPOD “Freyja” 超算集群，安进科学家能在立项前验证特定基因变异对人体长期表型的因果影响，从而将宝贵的 III 期临床资金精准投向 Repatha、Evenity 与 Olpasiran 等高胜率靶点。', formula: '商业传导：遗传学验证靶点进临床胜率显著高于行业均值 → 降低单款重磅新药全周期隐性试错成本', kpis: [['200+ PB', 'deCODE 人类多组学数据底座'], ['$7.3B', 'FY2025 全年研发投入'], ['21.4%', 'Q3 2026 R&D 占产品营收比'], ['1,700万', '全球年度受惠患者总数']] },
 { badge: 'NODE 02 · MULTISPECIFICS & GENERATIVE BIOLOGY', title: '多特异性工程平台：BiTE 双抗与抗体肽偶联体构筑分子结构代差', desc: '从全球首款双特异性 T 细胞衔接器（BiTE）Blincyto 到突破小细胞肺癌生存期瓶颈的 DLL3 靶向药 Imdelltra（Q3 26 +128%），再到把 GLP-1 激动与 GIPR 拮抗融合在同一抗体分子上的长效减重药 MariTide，安进依靠蛋白质工程与 AI 生成生物学打造出“竞争对手极难模仿”的复杂分子架构。', formula: '商业传导：复杂大分子结构兼具高临床壁垒与超长专利护城河 → 支撑 80%+ Non-GAAP 毛利率', kpis: [['+128%', 'Imdelltra Q3 2026 同比增速'], ['4–6次/年', 'MariTide 目标长效给药频率'], ['10+ III期', 'MariTide 全球多适应症临床'], ['BiTE平台', '实体瘤与自免跨界拓展']] },
 { badge: 'NODE 03 · U.S. BIOMANUFACTURING FORTRESS', title: '北美本土生物制造网络：高良品率与连续灌流工艺降低仿制威胁', desc: '不同于纯轻资产外包型 Biotech，安进深谙大分子药物“工艺即产品”。2025–2026 年在加州千橡市 ($600M 创新中心)、北卡罗来纳 ($1.0B)、俄亥俄 ($900M) 与波多黎各 ($650M) 大规模扩建自动化与机器人赋能的生物原液产线，确保重磅药全球不断供并拉低单位制造成本。', formula: '商业传导：规模化生物制造压低 Non-GAAP COGS 至产品营收 19.3% → 顺畅承接 MariTide 未来千万级产能需求', kpis: [['$31.5亿+', '近期美国本土新建/扩产规划'], ['19.3%', 'Q3 26 Non-GAAP 营业成本率'], ['$2.6B', 'FY2026 全年 CapEx 指引'], ['>99%', '全球核心生物药零断供率']] },
 { badge: 'NODE 04 · FOUR THERAPEUTIC PILLARS + BIOSIMILARS', title: '四大治疗领域商业闭环 + 生物类似药“以攻代守”现金盾', desc: '商业化覆盖普药心血管（Repatha/Evenity）、肿瘤（Imdelltra/Blincyto）、炎症（Tezspire/Otezla）与罕见病（Tepezza/Uplizna/Krystexxa）四大科室；更精妙的是安进同时运营业内领先的生物类似药矩阵（Pavblu 仿制 Eylea 单季 $300M），收割竞争对手专利到期红利反哺自身创新管线。', formula: '商业传导：17 款年化 >$1B 重磅药 + $3B+ 生物类似药 → 消除单品断崖风险', kpis: [['17 款', 'Q3 26 年化超 $1B 重磅药'], ['+191%', 'Uplizna Q3 26 同比暴涨'], ['+41%', 'Pavblu (Eylea 仿制药) 增速'], ['17%', 'Q3 26 极高效率 SG&A 费率']] },
 { badge: 'NODE 05 · DELEVERAGING & DIVIDEND ARISTOCRACY', title: '千亿并购消化期：优先现金偿债 + 连续 14 年股息稳健复利', desc: '2023 年斥资 $278亿 收购 Horizon Therapeutics 后，安进展现出大型蓝筹罕见的资本自律：2026 Q2–Q3 连续零回购股票，将 $86.2亿（9M26）自由现金流优先用于积累现金至 $132亿、压缩债务至 $540亿，同时坚持连续 14 年上调股息（2026 年支付季度股息 $2.52/股，+6%）。', formula: '商业传导：9M26 FCF $8.62B (+20.7%) → 净债务稳步降至 $40.8B，为 2027+ 重启大额回购蓄力', kpis: [['$8.62B', '9M 2026 自由现金流'], ['$40.8B', '9/30/26 净债务（较年底降 $4.7B）'], ['14 年', '连续年度股息上调记录'], ['$2.52/季', '2026 Q3 季度现金分红']] }
 ];
 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]'); if (!btn) return;
 var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
 pTrack.querySelectorAll('.bm-node-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
 var nd = NODES[idx];
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = nd.title;
 document.getElementById('nodeDesc').textContent = nd.desc;
 document.getElementById('nodeFormula').textContent = nd.formula;
 document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) { return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
 });

 var tierFilter = document.getElementById('tierFilter');
 if (tierFilter) tierFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]'); if (!b) return;
 var cat = b.getAttribute('data-tcat');
 tierFilter.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.querySelectorAll('#tierList [data-tier]').forEach(function (c) { c.style.display = (cat === 'all' || c.getAttribute('data-tier') === cat) ? '' : 'none'; });
 });

 var COHORTS = {
 core: { stats: [['代表核心品种', 'Repatha·Evenity·Tezspire·Imdelltra·Uplizna·Blincyto', '均处于专利长保护期'], ['Q3 2026 合计单季营收', '$3,727M', '占全公司产品营收 37.7%'], ['同比销量增长动能', '+27% ~ +191%', '9M 26 集团销量整体 +10%'], ['长周期峰值潜力', '$20B+ / 年', '尚未计入 MariTide 与 Olpasiran']], note: '<strong>以量补价与新陈代谢飞轮：</strong>面对 2026 年 Prolia (-45%) 与 Xgeva (-47%) 生物类似药冲击及 IRA 医保谈判降价，安进 9M 2026 依然凭借 <strong>+10% 的强劲处方销量增长</strong>实现产品营收净增 +7%。' },
 biosim: { stats: [['代表仿制品种', 'Pavblu (Eylea)·Amjevita·Mvasi·Wezlana·Kanjinti', '全球高难度大分子仿制'], ['2025 全年板块营收', '$3.0B (+43% YoY)', '2024 年为 $2.1B'], ['Q3 26 头号引擎 Pavblu', '$300M (+41%)', '销量暴涨 +71% 对冲降价'], ['后续重磅在审管线', 'ABP 206 & ABP 234', '分别对标 Opdivo 与 Keytruda']], note: '<strong>攻守兼备的仿制药盾牌：</strong>安进是全球极少数既拥有顶尖原研抗体研发能力、又大规模盈利性运营生物类似药（Biosimilars）的药企，把竞争对手的专利悬崖转化为自身稳定现金流。' },
 mature: { stats: [['代表承压品种', 'Prolia · Xgeva · Enbrel · Otezla', '处于 LOE 或 IRA 谈判期'], ['Q3 2026 单季表现', 'Prolia -45% · Xgeva -47%', 'Enbrel +5% · Otezla -18%'], ['成熟基石产品 (Aranesp等)', '$606M (+14%)', '现金流极其丰厚且营销费率极低'], ['管理层应对策略', '控费稳利 + 新药对冲', 'Q3 26 Non-GAAP 营业利润率仍达 47.3%']], note: '<strong>有序现金收割：</strong>即使面对地舒单抗（Prolia/Xgeva）生物类似药入局，安进通过精细化渠道管理及降低老药推广费用（Q3 SG&A 同比下降 2%），保障了集团整体利润率不降反升。' }
 };
 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]'); if (!b) return;
 var k = b.getAttribute('data-cohort');
 cohortTabs.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var c = COHORTS[k] || COHORTS.core;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + (idx > 0 ? ' mono' : '') + '"' + (idx === 0 ? ' style="font-size:0.88rem;"' : '') + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = c.note;
 });

 var peerFilter = document.getElementById('peerFilter');
 if (peerFilter) peerFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pcat]'); if (!b) return;
 var cat = b.getAttribute('data-pcat');
 peerFilter.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.querySelectorAll('#peerTable tbody tr').forEach(function (r) {
 var rc = r.getAttribute('data-row-cat') || '';
 r.style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 });
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect();
 var w = Math.max(260, r.width || 500), h = Math.max(140, r.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: '总营收', val: 36.75, base: 0, col: pal.blue, tip: 'FY2025 全年总营收: $36.75B (+10.0% YoY)' },
 { lbl: 'GAAP毛利', val: 26.01, base: 0, col: pal.green, tip: 'FY2025 GAAP 毛利额: $26.01B (毛利率 70.8%)' },
 { lbl: '研发投入', val: 6.97, base: 19.04, col: pal.violet, tip: 'FY2025 GAAP 研发费用: $6.97B (含战略项目约 $7.3B)' },
 { lbl: '营业利润', val: 9.08, base: 0, col: pal.blue, tip: 'FY2025 GAAP 营业利润: $9.08B (营业利润率 24.7%，含 Horizon 摊销)' },
 { lbl: 'GAAP净利', val: 7.71, base: 0, col: pal.amber, tip: 'FY2025 GAAP 净利润: $7.71B (+88.5% YoY，净利率 21.0%)' },
 { lbl: '自由现金流', val: 8.10, base: 0, col: pal.green, tip: 'FY2025 自由现金流: $8.10B (9M 2026 已达 $8.62B)' }
 ];
 var maxV = 42;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph, yBot = pad.top + ph - (s.base / maxV) * ph, bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col; roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(2) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', '9M26'];
 var gm = [75.6, 70.2, 66.4, 70.8, 71.3];
 var ngOpm = [51.2, 49.4, 46.8, 47.0, 47.1];
 var minM = 40, maxM = 85;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 function plotL(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 4) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 4) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 8);
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / 4) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotL(gm, pal.green, 'GAAP 毛利率');
 plotL(ngOpm, pal.blue, 'Non-GAAP 营业利润率');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'prod') {
 var prods = [
 { n: 'Repatha', v: 1085, yoy: '+37%', col: pal.green },
 { n: 'Evenity', v: 751, yoy: '+39%', col: pal.blue },
 { n: 'Prolia', v: 632, yoy: '-45%', col: pal.red },
 { n: 'Enbrel', v: 611, yoy: '+5%', col: pal.amber },
 { n: 'Tezspire', v: 538, yoy: '+43%', col: pal.blue },
 { n: 'Tepezza', v: 526, yoy: '-6%', col: pal.violet },
 { n: 'Blincyto', v: 496, yoy: '+27%', col: pal.green },
 { n: 'Uplizna', v: 451, yoy: '+191%', col: pal.green },
 { n: 'Imdelltra', v: 406, yoy: '+128%', col: pal.violet }
 ];
 var maxP = 1200;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxP / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'M', pad.left - 7, gy + 4);
 }
 var slot = pw / prods.length, bw = Math.min(34, slot * 0.58);
 prods.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (p.v / maxP) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = p.col; roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(p.yoy, x + bw / 2, yt - 5);
 ctx.fillStyle = pal.sub; ctx.font = '600 9.5px sans-serif';
 ctx.fillText(p.n, x + bw / 2, pad.top + ph + 18);
 hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.n + ' (Q3 2026)', body: '单季营收 $' + p.v + 'M · 同比增速 ' + p.yoy });
 });
 } else {
 var peers = [
 { n: 'Amgen (NG-OPM)', v: 47.3, col: pal.green },
 { n: 'Eli Lilly (Net)', v: 26.4, col: pal.blue },
 { n: 'AbbVie (EBITDA)', v: 28.0, col: pal.violet },
 { n: 'Amgen (GAAP-OPM)', v: 37.5, col: pal.amber }
 ];
 var maxM = 55, slot2 = pw / peers.length, bw2 = Math.min(48, slot2 * 0.55);
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxM / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot2 + (slot2 - bw2) / 2, bh = (p.v / maxM) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = p.col; roundRect(ctx, x, yt, bw2, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(p.v.toFixed(1) + '%', x + bw2 / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(p.n, x + bw2 / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw2, h: bh, title: p.n, body: '利润率指标: ' + p.v.toFixed(1) + '%' });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'debt') {
 var pts = [
 { lbl: '2023年底(并购后)', debt: 64.6, cash: 10.9 },
 { lbl: '2024年底', debt: 60.1, cash: 12.0 },
 { lbl: '2025年底', debt: 54.6, cash: 9.1 },
 { lbl: '2026年9月', debt: 54.0, cash: 13.2 }
 ];
 var maxD = 72, slot = pw / pts.length, bw = 28;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxD / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 pts.forEach(function (p, i) {
 var cx = pad.left + i * slot + slot / 2;
 var dh = (p.debt / maxD) * ph, ch = (p.cash / maxD) * ph;
 ctx.fillStyle = pal.amber; roundRect(ctx, cx - bw - 3, pad.top + ph - dh, bw, dh, 5); ctx.fill();
 ctx.fillStyle = pal.green; roundRect(ctx, cx + 3, pad.top + ph - ch, bw, ch, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.debt.toFixed(1) + 'B', cx - bw / 2 - 3, pad.top + ph - dh - 5);
 ctx.fillText('$' + p.cash.toFixed(1) + 'B', cx + bw / 2 + 3, pad.top + ph - ch - 5);
 ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
 ctx.fillText(p.lbl, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: cx - bw - 4, y: pad.top, w: bw * 2 + 8, h: ph, title: p.lbl, body: '总债务 $' + p.debt.toFixed(1) + 'B vs 现金 $' + p.cash.toFixed(1) + 'B（净债务 $' + (p.debt - p.cash).toFixed(1) + 'B）' });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', '9M26'];
 var fcf = [8.8, 10.4, 10.4, 8.1, 8.62];
 var div = [4.2, 4.5, 4.8, 5.1, 4.1];
 var maxF = 12, slot2 = pw / yrs.length, bw2 = 24;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxF / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv.toFixed(0) + 'B', pad.left - 8, ky + 4);
 }
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot2 + slot2 / 2;
 var fh = (fcf[i] / maxF) * ph, dh = (div[i] / maxF) * ph;
 ctx.fillStyle = pal.blue; roundRect(ctx, cx - bw2 - 3, pad.top + ph - fh, bw2, fh, 5); ctx.fill();
 ctx.fillStyle = pal.green; roundRect(ctx, cx + 3, pad.top + ph - dh, bw2, dh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + fcf[i].toFixed(1) + 'B', cx - bw2 / 2 - 3, pad.top + ph - fh - 5);
 ctx.fillText('$' + div[i].toFixed(1) + 'B', cx + bw2 / 2 + 3, pad.top + ph - dh - 5);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: cx - bw2 - 4, y: pad.top, w: bw2 * 2 + 8, h: ph, title: y, body: '自由现金流 $' + fcf[i].toFixed(1) + 'B · 现金分红支出 $' + div[i].toFixed(1) + 'B' });
 });
 }
 }

 var simArr = [23.3, 25.6, 28.2, 31.1, 34.3, 37.8];
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 44 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var maxE = Math.max(45, Math.ceil(Math.max.apply(null, simArr) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 simArr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 simArr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gR = parseFloat(document.getElementById('inpRevCagr').value) / 100;
 var opmEnd = parseFloat(document.getElementById('inpOpm').value) / 100;
 var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblRevCagr').textContent = (gR * 100).toFixed(1) + '%';
 document.getElementById('lblOpm').textContent = (opmEnd * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

 var rev = 39.3, shares = 0.546, baseEps = 23.30, opmStart = 0.473;
 var arr = [baseEps];
 for (var y = 1; y <= 5; y++) {
 rev *= (1 + gR);
 shares *= (1 - buy);
 var opm = opmStart + (opmEnd - opmStart) * (y / 5);
 var opInc = rev * opm;
 var netInc = (opInc - 1.8) * 0.84;
 arr.push(netInc / shares);
 }
 var fy31Op = rev * opmEnd;
 var epsCagr = (Math.pow(arr[5] / baseEps, 0.2) - 1) * 100;
 document.getElementById('simRevOut').textContent = '$' + rev.toFixed(1) + 'B';
 document.getElementById('simOpOut').textContent = '$' + fy31Op.toFixed(1) + 'B';
 document.getElementById('simEpsOut').textContent = '$' + arr[5].toFixed(2);
 document.getElementById('simCagrOut').textContent = (epsCagr >= 0 ? '+' : '') + epsCagr.toFixed(1) + '%';
 simArr = arr;
 drawSimMiniCanvas();
 }
 ['inpRevCagr', 'inpOpm', 'inpBuyRate'].forEach(function (id) { var el = document.getElementById(id); if (el) el.addEventListener('input', runSimulator); });
 var PRESETS = { bear: { r: 3.5, o: 43.0, b: 0.8 }, base: { r: 7.5, o: 48.5, b: 1.6 }, bull: { r: 11.5, o: 51.5, b: 2.2 } };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]'); if (!b) return;
 var pr = PRESETS[b.getAttribute('data-preset')] || PRESETS.base;
 simPresets.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.getElementById('inpRevCagr').value = pr.r; document.getElementById('inpOpm').value = pr.o; document.getElementById('inpBuyRate').value = pr.b;
 runSimulator();
 });

 function bindChartTab(gid, attr, skey, fn) {
 var g = document.getElementById(gid); if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[skey] = b.getAttribute(attr);
 g.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 fn();
 });
 }
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 function bindHoverTooltip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var list = hitRegions[cid] || [], hit = null;
 for (var i = 0; i < list.length; i++) { var rg = list[i]; if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; } }
 if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
 else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);
 function drawAllCharts() { drawProfitCanvas(); drawCohortCanvas(); drawCapitalCanvas(); drawSimMiniCanvas(); }

 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$38.9B–$39.7B 指引 · 47.3% Non-GAAP 营业利润率 · 17款十亿美元药' },
 { id: 'mod-pipeline', t: 'M1 五阶生物制药价值传导沙盘', s: 'deCODE遗传学 → BiTE/MariTide → 北美制造 → 四大矩阵 → 去杠杆复利' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四大板块拆解', s: 'FY2025 $36.75B P&L 瀑布流 · 普药/罕见病/肿瘤/自免与仿制盾' },
 { id: 'mod-cohort', t: 'M3 新旧动能接棒与放量曲线', s: 'Repatha +37% · Uplizna +191% · Imdelltra +128% 对冲 Prolia 下滑' },
 { id: 'mod-capital', t: 'M4 并购去杠杆与股息复利推演器', s: '净债务降至 $40.8B · 连续 14 年股息递增 · 5年 EPS 情景模拟' },
 { id: 'mod-matrix', t: 'M5 全球药企对标与三大风险压测', s: 'AMGN vs LLY / ABBV / REGN / NVO · LOE / MariTide III期 / 债务压测' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 if (!qPop) return;
 var q = (kw || '').trim().toLowerCase();
 var m = QUICK_ITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 if (qIn && qPop) {
 qIn.addEventListener('focus', function () { renderQ(qIn.value); });
 qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; var el = document.querySelector(jb.getAttribute('data-jump')); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 }
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAllCharts, 60); }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) { var dh = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }
 }, { passive: true });

 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk'); chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () { savedChk[k] = chk.checked; try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {} showToast(chk.checked ? '已加入季度跟踪清单' : '已取消跟踪标记'); });
 });
 } catch (e) {}

 try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true); } catch (e) {}
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Amgen_Business_Model_Analysis.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出独立网页 Amgen_Business_Model_Analysis.html');
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });
 var rt = null; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAllCharts, 90); });
 runSimulator(); drawAllCharts();
 })();
 