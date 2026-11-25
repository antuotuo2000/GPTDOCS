
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'abt_bm_stress_v1';

 var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'sub', kView: 'div' };
 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }

 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
 blue: dark ? '#3399FF' : '#0073E6', blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.16)',
 green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED', red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) {
 ic.innerHTML = state.theme === 'dark'
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh'); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en'); }
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
 else nodes[i].textContent = val;
 }
 }
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var LENSES = [
 {
 formula: '单患生命周期毛利 LTV = 院内装机/首配入口 (EnSite X / Alinity) + ∑ [年化 26 枚传感器或试剂消耗 × 60%+ 耗材毛利]',
 body: '与卖一台少一台的传统大型影像设备不同，雅培核心增量来自<strong>“每 14 天更换一枚的 Libre 传感器”</strong>、<strong>“每例房颤消融消耗的 Volt PFA 导管”</strong>以及<strong>“Alinity 流水线上的封闭试剂盒”</strong>。设备与医保准入一旦打通，患者与医院便转化为高频、可预测的年金式现金流。'
 },
 {
 formula: '新雅培聚焦公式 = 留存高增长主业 ($42B: 器械 + 肿瘤/核心诊断 + EPD) - 免税分拆低速营养品 ($8.5B) → 释放估值重估',
 body: '过去市场常因营养品业务的消费品属性与通胀成本波动，给予雅培“多元集团折价（Conglomerate Discount）”。2026 年 3 月并入高增速 Exact Sciences 肿瘤早筛、10 月宣布分拆营养品后，雅培正式对标纯血高估值 MedTech 巨头。'
 },
 {
 formula: '股东复利引擎 = $95.7亿经营现金流 → 连续 54 年上调股息 ($2.52/年) + 精准外延并购 + 稳健去杠杆',
 body: '凭借医疗刚需极低的周期波动性，雅培穿越半个多世纪周期连续 411 季派息。2013 年分拆艾伯维（AbbVie）证明了雅培管理层擅长“孵化—做大—分拆释放价值”的顶级资本配置能力。'
 }
 ];
 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) {
 lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 var all = lensTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });
 }

 var NODES = [
 {
 badge: 'NODE 01 · CLINICAL INNOVATION & REGULATORY MOAT',
 title: '底层微创传感器与临床循证：把高风险医疗器械转化为可规模复制的工业标准',
 desc: '雅培每年将近 $30亿–$35亿研发预算（Q3 2026 单季研发费用同比大增 20.1% 至 $9.20亿）精准投向具备代差优势的微创与生物穿戴技术：如 14 天免校准的 FreeStyle Libre 传感器、结合射频与脉冲电场（PFA）的 TactiFlex Duo 双能消融导管，以及全血 15 分钟出结果的 i-STAT TBI 脑震荡检测盒。',
 formula: '商业传导：FDA PMA/510(k) 审批壁垒 + 多中心临床数据背书 → 锁定临床医生处方习惯与医保报销目录',
 kpis: [['$2.94B', 'FY2025 全年研发投入 (6.6%)'], ['+20.1%', 'Q3 2026 研发加速 ($920M)'], ['56.7%', 'FY2025 经调整综合毛利率'], ['6+ 获批', '2026 年多项核心器械获 FDA/CE']]
 },
 {
 badge: 'NODE 02 · RAZOR-BLADE CONSUMABLE FLYWHEEL',
 title: '院内装机与居家耗材“剃须刀”飞轮：一次性铺设通道，长期收取高频耗材复购',
 desc: '无论是医院检验科的 Alinity 自动化诊断流水线、心内科的 EnSite X 三维标测系统，还是糖友手臂上的 FreeStyle Libre，雅培均通过高壁垒主机/系统锁定临床工作流，再靠高频消耗的试剂盒、一次性消融导管与 14 天更换一次的传感器实现高毛利持续放量。',
 formula: '商业传导：EnSite X / Alinity 装机 → 配套消耗 Volt PFA 导管 / 封闭试剂盒 / 26枚/年 Libre 传感器',
 kpis: [['$7.6B', 'FY2025 全球 CGM 传感器年销'], ['600万+', 'FreeStyle Libre 在用患者群'], ['+15.2%', '9M 2026 电生理业务营收增速'], ['封闭试剂', 'Alinity 流水线高粘性耗材锁定']]
 },
 {
 badge: 'NODE 03 · 160-COUNTRY COMMERCIAL & REIMBURSEMENT SCALE',
 title: '横跨 160+ 国的商业化与医保准入高速公路：让创新单品迅速全球放量',
 desc: '雅培拥有全球医疗行业最庞大、最均衡的国际化商业网络之一——FY2025 国际市场贡献 $272.02亿营收（占比高达 61.4%）。这一网络不仅支撑 EPD 品牌仿制药在新兴市场稳健增长，更成为 Exact Sciences（此前 97% 营收局限于美国）加速出海的超级放大器。',
 formula: '商业传导：美国原研/并购创新单品 → 接入雅培 160 国医保准入与医院渠道 → 释放全球规模经济',
 kpis: [['$27.20B', 'FY2025 国际市场营收 (61.4%)'], ['160+ 国', '全球商业化与分销网络覆盖'], ['+10.9%', 'Q3 2026 新兴市场 EPD 有机增速'], ['97%→全球', 'Exact Sciences 借船出海潜力']]
 },
 {
 badge: 'NODE 04 · CAPITAL REALLOCATION: ACQUIRE & SPIN-OFF',
 title: '逆周期并购与精准分拆：“买进高成长赛道的未来，送走成熟低速的过去”',
 desc: '雅培是华尔街最擅长通过资产组合重构创造超额收益的巨头之一：2013 年分拆艾伯维（AbbVie）成就两家千亿巨头；2017 年收购 St. Jude Medical 奠定心血管帝国；2026 年 3 月以 $230 亿拿下 Exact Sciences 补齐肿瘤早筛短板，10 月宣布分拆 $85 亿营养品，实现全周期新陈代谢。',
 formula: '商业传导：并购高增长肿瘤诊断 (+13.8% YoY) + 分拆成熟营养品 ($8.5B) → 结构性拔高集团长期成长中枢',
 kpis: [['$23.0B', 'Exact Sciences 并购企业价值'], ['$968M', 'Q3 2026 肿瘤诊断单季并表营收'], ['$8.5B', '2027 年底前拟免税分拆营养品'], ['~$42.0B', '分拆后纯粹新雅培营收底座']]
 },
 {
 badge: 'NODE 05 · 54-YEAR DIVIDEND KING COMPOUNDING',
 title: '连续 54 年上调股息的“股息王”：医疗刚需现金流穿越经济周期的终极兑现',
 desc: '自 1924 年以来，雅培已连续 411 个季度向股东派发现金股息，并连续 54 年每年上调股息（2026 年季度股息上调至 $0.63/股，年化 $2.52）。稳健的 $95.7 亿年度经营现金流支撑雅培在重金研发与并购的同时，始终保障股东真金白银的回报。',
 formula: '商业传导：医疗刚需抗周期现金流 ($9.57B OCF) → 54年股息王递增 + 并购后快速去杠杆',
 kpis: [['54 年', '连续年度股息增长 (股息王)'], ['411 季', '自 1924 年起连续季度派息'], ['$9.57B', 'FY2025 全年经营现金流'], ['$0.63/季', '2026 年最新季度股息 (+6.8%)']]
 }
 ];
 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) {
 pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
 var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
 var bs = pTrack.querySelectorAll('.bm-node-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
 var nd = NODES[idx];
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = nd.title;
 document.getElementById('nodeDesc').textContent = nd.desc;
 document.getElementById('nodeFormula').textContent = nd.formula;
 document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
 return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 });
 }

 var tierFilter = document.getElementById('tierFilter');
 if (tierFilter) {
 tierFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]');
 if (!b) return;
 var cat = b.getAttribute('data-tcat');
 var bs = tierFilter.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var cards = document.querySelectorAll('#tierList [data-tier]');
 for (var j = 0; j < cards.length; j++) {
 cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
 }
 });
 }

 var COHORTS = {
 otc: {
 stats: [
 ['核心消费端产品', 'Lingo / Libre Rio (OTC)', '无需医生处方即可电商直购'],
 ['目标受众规模', '数千万代谢健康人群', '健身、减脂与非胰岛素糖友'],
 ['订阅与复购模式', '月度传感器 + App 辅导', 'D2C 订阅制提升客单粘性'],
 ['战略定位价值', '破圈增长期权', '将专业医疗传感下沉至大众消费']
 ],
 note: '<strong>消费级生物穿戴破圈：</strong>Lingo 与 Libre Rio 于 2024 年获 FDA 批准免处方销售，复用了 FreeStyle Libre 的成熟传感器产线，将血糖波动监测转化为大众代谢健康与饮食反馈工具，显著摊薄研发与制造固定成本。'
 },
 cgm: {
 stats: [
 ['核心耗材与更换频率', 'Libre 3 / Duo · 14天/枚', '全年约需 26 枚生物传感器'],
 ['全球在用患者与渗透趋势', '600万+ 患者', '覆盖基础胰岛素及 2 型糖友'],
 ['年度单患营收贡献', '~$1,100–$1,400', '医保报销覆盖大幅降低自付摩擦'],
 ['5年单患累计毛利 LTV', '~$3,800+', '传感器规模化制造毛利率持续抬升']
 ],
 note: '<strong>数据与处方双向锁死效应：</strong>FreeStyle Libre 传感器通过蓝牙实时将血糖与酮体（Libre Duo）曲线同步至 LibreView 云端医生看板。患者无需扎手指且已习惯历史趋势图，主治医师则直接在系统内调阅报告——一旦进入报销与随访闭环，切换竞品成本极高。'
 },
 hosp: {
 stats: [
 ['院内核心装机底座', 'Alinity / EnSite X / Cologuard', '大型医院检验科与心内导管室'],
 ['高频配套耗材', '封闭试剂盒 / Volt PFA 导管', '按单次检测或单台手术消耗结算'],
 ['单家大型三甲医院年产值', '$500K–$2.5M+', '设备折旧期长达 7–10 年锁定'],
 ['客户年度留存率', '> 95%', '工作流与 HIS 系统深度集成']
 ],
 note: '<strong>医院基础设施级绑定：</strong>一旦医院检验科部署了 Alinity 生化免疫流水线，或电生理导管室标配 EnSite X 标测系统，后续多年内的检测试剂与消融导管消耗便成为高度可预测的经常性收入。'
 }
 };
 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) {
 cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]');
 if (!b) return;
 var key = b.getAttribute('data-cohort');
 var bs = cohortTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var c = COHORTS[key] || COHORTS.cgm;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
 var isMono = idx > 0 ? ' mono' : '';
 var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = c.note;
 });
 }

 var peerFilter = document.getElementById('peerFilter');
 if (peerFilter) {
 peerFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pcat]');
 if (!b) return;
 var cat = b.getAttribute('data-pcat');
 var bs = peerFilter.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var rows = document.querySelectorAll('#peerTable tbody tr');
 for (var j = 0; j < rows.length; j++) {
 var rc = rows[j].getAttribute('data-row-cat') || '';
 rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 }
 });
 }

 function prepCanvas(id) {
 var c = document.getElementById(id);
 if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 500), h = Math.max(140, rect.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr);
 ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: '医疗器械', val: 21.39, base: 0, col: pal.blue, tip: 'FY2025 医疗器械净营收: $21.39B (+12.6% YoY)，占总营收 48.2%' },
 { lbl: '+诊断', val: 8.94, base: 21.39, col: pal.violet, tip: 'FY2025 诊断业务净营收: $8.94B (2026并入 Exact Sciences 后大幅跃升)' },
 { lbl: '+营养/EPD', val: 13.99, base: 30.33, col: pal.amber, tip: 'FY2025 营养品 ($8.45B) + EPD ($5.54B) = $13.99B，合计总营收 $44.33B' },
 { lbl: 'Adj.毛利', val: 25.15, base: 0, col: pal.blue, tip: 'FY2025 经调整毛利: $25.15B (经调整毛利率 56.7%)' },
 { lbl: 'Adj.净利', val: 9.04, base: 0, col: pal.green, tip: 'FY2025 经调整净利润: $9.04B (+10.2% YoY，Adj. EPS $5.15)' },
 { lbl: '经营现金流', val: 9.57, base: 0, col: pal.green, tip: 'FY2025 经营现金流: $9.57B（连续 54 年股息增长底座）' }
 ];
 var maxV = 48;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(46, slotW * 0.56);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col; roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var gmArr = [56.2, 55.2, 55.4, 56.7, 57.4];
 var opmArr = [21.3, 16.2, 16.3, 18.2, 19.0];
 var minM = 10, maxM = 65;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 function plotL(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotL(gmArr, pal.green, '经调整/历史毛利率');
 plotL(opmArr, pal.blue, 'GAAP 营业利润率');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 26, right: 32, bottom: 38, left: 105 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'sub') {
 var subs = [
 { name: '糖尿病护理 ($8.0B)', gr: 17.5, col: pal.green },
 { name: '电生理 EP ($2.8B)', gr: 15.2, col: pal.blue },
 { name: '心衰 HF ($1.4B)', gr: 13.2, col: pal.violet },
 { name: '结构性心脏 ($2.5B)', gr: 12.3, col: pal.blue },
 { name: '心律管理 ($2.6B)', gr: 10.9, col: pal.amber },
 { name: '血管介入 ($3.0B)', gr: 5.6, col: pal.tick }
 ];
 var maxG = 22, rowH = ph / subs.length;
 subs.forEach(function (s, i) {
 var cy = pad.top + i * rowH + rowH / 2, bh = 18, bl = (s.gr / maxG) * pw;
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = s.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(s.name, pad.left - 8, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText('+' + s.gr.toFixed(1) + '%', pad.left + bl + 6, cy + 4);
 hitRegions.cohortCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: s.name, body: '报告/最新 9M26 同比增速 +' + s.gr.toFixed(1) + '%' });
 });
 } else {
 var geos = [
 { name: '全集团 (FY25)', us: 38.6, intl: 61.4 },
 { name: '医疗器械', us: 46.6, intl: 53.4 },
 { name: '诊断业务', us: 39.6, intl: 60.4 },
 { name: '成熟药品 EPD', us: 0.0, intl: 100.0 }
 ];
 var rH = ph / geos.length;
 geos.forEach(function (g, i) {
 var cy = pad.top + i * rH + rH / 2, bh = 22;
 var usW = (g.us / 100) * pw, inW = (g.intl / 100) * pw;
 if (usW > 0) { ctx.fillStyle = pal.blue; roundRect(ctx, pad.left, cy - bh / 2, usW, bh, 4); ctx.fill(); }
 ctx.fillStyle = pal.green; roundRect(ctx, pad.left + usW, cy - bh / 2, inW, bh, 4); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(g.name, pad.left - 8, cy + 4);
 ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 if (usW > 38) ctx.fillText('US ' + g.us.toFixed(0) + '%', pad.left + usW / 2, cy + 4);
 ctx.fillText('Intl ' + g.intl.toFixed(0) + '%', pad.left + usW + inW / 2, cy + 4);
 hitRegions.cohortCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: g.name, body: '美国占比 ' + g.us.toFixed(1) + '% vs 国际市场占比 ' + g.intl.toFixed(1) + '%' });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'div') {
 var yrs = ['2018', '2020', '2022', '2024', '2025', '2026'];
 var qdiv = [0.28, 0.36, 0.47, 0.55, 0.59, 0.63];
 var maxD = 0.72;
 for (var g = 0; g <= 3; g++) {
 var dv = (maxD / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + dv.toFixed(2), pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (qdiv[i] / maxD) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 5 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + qdiv[i].toFixed(2), x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 年季度现金股息', body: '每股季度派息 $' + qdiv[i].toFixed(2) + '（年化 $' + (qdiv[i] * 4).toFixed(2) + '）' });
 });
 } else {
 var bars = [
 { lbl: '原雅培(2026E)', rev: 50.5, col: pal.blue, tip: '含营养品及 Exact Sciences 全年并表估算约 $50.5B' },
 { lbl: '-分拆营养品', rev: 8.5, col: pal.amber, tip: '拟于 2027 年底前免税分拆独立上市的营养品业务（~$8.5B）' },
 { lbl: '=新雅培(2027E+)', rev: 42.0, col: pal.green, tip: '留存纯粹医疗器械 + 肿瘤/核心诊断 + 新兴市场 EPD（~$42.0B）' }
 ];
 var maxR = 56, sl = pw / 3, bw2 = Math.min(64, sl * 0.5);
 for (var k = 0; k <= 4; k++) {
 var kv = k * 14, ky = pad.top + ph - (kv / maxR) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 bars.forEach(function (b, i) {
 var x = pad.left + i * sl + (sl - bw2) / 2, bh = (b.rev / maxR) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = b.col; roundRect(ctx, x, yt, bw2, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + b.rev.toFixed(1) + 'B', x + bw2 / 2, yt - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(b.lbl, x + bw2 / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw2, h: bh, title: b.lbl, body: b.tip });
 });
 }
 }

 var simData = { eps: [5.52, 6.03, 6.58, 7.18, 7.83, 8.54] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 44 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var arr = simData.eps, maxE = Math.max(10, Math.ceil(Math.max.apply(null, arr) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gHigh = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
 var gCore = parseFloat(document.getElementById('inpProdCagr').value) / 100;
 var bps = parseFloat(document.getElementById('inpBuyRate').value);
 document.getElementById('lblSvcCagr').textContent = (gHigh * 100).toFixed(1) + '%';
 document.getElementById('lblProdCagr').textContent = (gCore * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = bps.toFixed(0) + ' bps';

 var medAndOnc = 27.5, coreDxEpd = 14.5, shares = 1.738, baseEps = 5.52;
 var epsArr = [baseEps];
 for (var y = 1; y <= 5; y++) {
 medAndOnc *= (1 + gHigh);
 coreDxEpd *= (1 + gCore);
 var rev = medAndOnc + coreDxEpd;
 var marginBoost = 1 + (bps * y) / 10000 / 0.21;
 var revGrowth = rev / 42.0;
 epsArr.push(baseEps * revGrowth * marginBoost);
 }
 var fy31Rev = medAndOnc + coreDxEpd;
 var fy31Gm = Math.min(64.5, 57.2 + (medAndOnc / fy31Rev - 0.65) * 18 + (bps * 5) / 250);
 var fy31Eps = epsArr[5];
 var epsCagr = (Math.pow(fy31Eps / baseEps, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '$' + fy31Rev.toFixed(1) + 'B';
 document.getElementById('simGmOut').textContent = fy31Gm.toFixed(1) + '%';
 document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
 document.getElementById('simCagrOut').textContent = '+' + epsCagr.toFixed(1) + '%';
 simData.eps = epsArr;
 drawSimMiniCanvas();
 }
 ['inpSvcCagr', 'inpProdCagr', 'inpBuyRate'].forEach(function (id) {
 var el = document.getElementById(id); if (el) el.addEventListener('input', runSimulator);
 });
 var PRESETS = { bear: { s: 6.5, p: 3.0, b: 20 }, base: { s: 10.5, p: 6.0, b: 60 }, bull: { s: 13.5, p: 8.0, b: 90 } };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]'); if (!b) return;
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[b.getAttribute('data-preset')] || PRESETS.base;
 document.getElementById('inpSvcCagr').value = pr.s;
 document.getElementById('inpProdCagr').value = pr.p;
 document.getElementById('inpBuyRate').value = pr.b;
 runSimulator();
 });
 }

 function bindChartTab(gid, attr, skey, fn) {
 var g = document.getElementById(gid); if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
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
 for (var i = 0; i < list.length; i++) {
 var rg = list[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
 } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

 function drawAllCharts() { drawProfitCanvas(); drawCohortCanvas(); drawCapitalCanvas(); drawSimMiniCanvas(); }

 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'FY25 $44.33B · Q3 2026 $13.01B · Exact Sciences + 营养品分拆' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '临床研发 → 耗材飞轮 → 160国网络 → 并购分拆 → 54年股息王' },
 { id: 'mod-profit-pool', t: 'M2 营收瀑布流与四大板块', s: '医疗器械 $21.39B · 诊断 $8.94B · EPD $5.54B · 拟分拆营养 $8.45B' },
 { id: 'mod-cohort', t: 'M3 生物穿戴耗材棘轮与 LTV', s: 'FreeStyle Libre 年耗 26 枚 · Lingo OTC · 医院 Alinity 封闭试剂' },
 { id: 'mod-capital', t: 'M4 54年股息王与新雅培 5 年推演', s: '连续 411 季派息 · 2027 分拆后 ~$42B 纯粹医疗科技估值重塑' },
 { id: 'mod-matrix', t: 'M5 全球医疗巨头对标与风险压测', s: 'ABT vs MDT / BSX / SYK / DXCM / DHR · NEC和解与整合追踪' }
 ];
 var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQuick(q) {
 if (!qPop) return;
 var kw = (q || '').trim().toLowerCase();
 var matched = QUICK_ITEMS.filter(function (it) { return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1; });
 qPop.innerHTML = matched.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
 }).join('');
 qPop.classList.toggle('open', matched.length > 0);
 }
 if (qInput && qPop) {
 qInput.addEventListener('focus', function () { renderQuick(qInput.value); });
 qInput.addEventListener('input', function () { renderQuick(qInput.value); });
 qPop.addEventListener('click', function (e) {
 var jb = e.target.closest('[data-jump]'); if (!jb) return;
 var el = document.querySelector(jb.getAttribute('data-jump')); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 }
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qInput) qInput.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else { document.body.classList.toggle('sidebar-collapsed'); }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var docH = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
 }
 }, { passive: true });

 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk'); chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () {
 savedChk[k] = chk.checked;
 try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
 showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
 });
 });
 } catch (e) {}

 document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var nt = btn.getAttribute('data-portal-theme');
 applyTheme(nt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nt); } catch (e) {}
 });
 });
 var exBtn = document.getElementById('exportHtmlBtn');
 if (exBtn) {
 exBtn.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'Abbott_Business_Model_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast('已导出独立网页 Abbott_Business_Model_Analysis.html');
 });
 }

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 var themeBtn = document.getElementById('appbarThemeBtn');
 if (themeBtn) {
 themeBtn.addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark';
 applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 }
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang');
 applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var resizeTimer = null;
 window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawAllCharts, 90); });
 runSimulator();
 drawAllCharts();
 })();
 