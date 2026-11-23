
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'crcl_bm_stress_v1';

 var state = {
 theme: 'dark',
 lang: 'zh',
 pView: 'waterfall',
 cView: 'share',
 kView: 'ebitda'
 };

 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg;
 bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2200);
 }

 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark,
 text: dark ? '#F3F6F9' : '#0F1924',
 sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569',
 grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
 blue: dark ? '#3399FF' : '#0073E6',
 blueSoft: dark ? 'rgba(51, 153, 255, 0.26)' : 'rgba(0, 115, 230, 0.18)',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED',
 red: dark ? '#FF6B6B' : '#DC2626'
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
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl) sl.classList.toggle('active', state.theme === 'light');
 if (sd) sd.classList.toggle('active', state.theme === 'dark');
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至清晰浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
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

 // Suite Hub Category Filter & Sibling Notification (Zero Auto-Scroll)
 var hub = document.getElementById('companySubfolderHub');
 if (hub) {
 hub.addEventListener('click', function (e) {
 var pill = e.target.closest('[data-co-cat]');
 if (pill) {
 var cat = pill.getAttribute('data-co-cat');
 hub.querySelectorAll('[data-co-cat]').forEach(function (p) { p.classList.toggle('active', p === pill); });
 hub.querySelectorAll('[data-co-item-cat]').forEach(function (it) {
 it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat));
 });
 return;
 }
 var item = e.target.closest('[data-suite-doc]');
 if (item && !item.classList.contains('active')) {
 showToast('请在本次交付的四份网页附件中打开：《' + item.getAttribute('data-suite-doc') + '》');
 }
 });
 }

 // 1. Command Deck 3-Lens Switcher
 var LENSES = [
 {
 formula: '年度净留存收益 (RLDC) = [日均 USDC 流通量 ($73.3B) × 储备国债收益率 (3.54%) - 渠道分润成本] + 非利差网络与生态收入 ($207.3M/季)',
 body: '根据美国《GENIUS 法案》与欧盟 MiCA 法规，支付型稳定币<strong>法定禁止向持币散户直接派发利息</strong>。这使得 Circle 如同伯克希尔的保险浮存金机器：全球企业与用户在 30+ 条公链上沉淀的 $739 亿数字美元无需支付存款利息，100% 隔离储备所产生的短期美债收益由 Circle 与核心分发伙伴共享。'
 },
 {
 formula: '储备净留存率重构 = Circle 平台直存权重 (18.1% × ~100%留存) + 生态伙伴渠道权重 (81.9% × ~24%–45%留存) → 推动净留存稳步上移',
 body: '过去市场担忧 Coinbase 分走约一半总储备收入，但 Circle 正通过银行、Visa Direct、SAP 企业工作流与 Circle Mint 机构账户做大<strong>“平台直存 USDC（Q3 达 $139亿，+36% YoY）”</strong>——每迁移 10% 流通盘进入自家平台，即可直接增厚约 500–600bps 的综合净留存利润率。'
 },
 {
 formula: '经营利润弹性 (Q3 Adj. EBITDA $316.7M) = RLDC 净收入 ($453.3M) - 极简固定运营开支 ($138.8M) → 边际经营利润转化率高达 70.0%',
 body: '不同于重资产硬件商或数万人规模的传统银行，Circle 仅凭约 1,045–1,100 名精锐员工和 $2,115 万固定资产即可运转全球 $13.9 万亿季度链上结算；随着 <strong>CPN 跨境支付网（$41.3B TPV）与 Arc 公链</strong>放量，新增软件与结算费几乎直通利润表底线。'
 }
 ];
 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) {
 lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 lensTabs.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });
 }

 // 2. Horizontal 5-Node Value-Chain Pipeline Inspector
 var NODES = [
 {
 badge: 'NODE 01 · REGULATED FIAT ON/OFF-RAMP GATEWAY',
 title: '正门监管护城河（GENIUS 法案 + OCC 信托银行 + MiCA）：全球机构法币上链唯一首选通道',
 desc: '机构客户通过 Circle Mint 账户在 185+ 个国家和地区将美元、欧元实时 1:1 铸造为链上 USDC 与 EURC。依托美国联邦《GENIUS 法案》、OCC 国民信托银行有条件批文、纽约 BitLicense（2015 年首张）及欧盟法国 MiCA 电子货币机构牌照，Circle 自 2018 年以来已累计处理逾 $53.3 万亿美元的传统银行与公链跨轨资金流转。',
 formula: '商业传导：牌照合规垄断 → 零获客补贴吸引银行/PSP/跨国企业直接开立 Circle Mint → Q3\'26 单季铸币 $104B、赎回 $104B',
 kpis: [['185+ 国', '支持法币电汇铸造与赎回'], ['$53.3T+', '2018 以来累计法币-链上吞吐'], ['30+ 公链', '原生发行无需第三方包装桥'], ['7.3M 个', '持有 >$10 USDC 活跃有效钱包']]
 },
 {
 badge: 'NODE 02 · BLACKROCK 2A-7 TREASURY RESERVE ENGINE',
 title: '贝莱德托管 Circle Reserve Fund：100% 破产隔离与无信用杠杆的生息金库',
 desc: 'Circle 严禁将持币人资金用于信贷放贷或高风险套利。截至 Q3 2026 末，$735.75 亿隔离储备资产中约 88% 存放于由全球最大资管巨头贝莱德（BlackRock）专门管理的 SEC 注册 2a-7 政府货币市场基金（仅持有极短期美债与隔夜逆回购），其余约 12% 存放于全球系统重要性银行（GSIB）现金账户，每月接受四大会计师事务所独立鉴证。',
 formula: '商业传导：零存款付息成本 × 100% 高流动性美债配置 → FY25 创造 $26.37亿、Q3\'26 创造 $6.58亿 储备利息总池',
 kpis: [['$73.57B', 'Q3\'26 持币人隔离储备资产'], ['~88%', '贝莱德 Circle Reserve Fund 占比'], ['3.54%', 'Q3\'26 年化储备综合回报率'], ['100%+', '储备资产对流通负债足额覆盖']]
 },
 {
 badge: 'NODE 03 · DISTRIBUTION FLYWHEEL VS PLATFORM CUSTODY',
 title: '双层分发博弈：用伙伴分成换全球网络效应，用自有平台直存收回高毛利',
 desc: '为对抗离岸 USDT 的先发优势，Circle 与 Coinbase、Binance（续签 5 年战略合作并获 $1亿股权投资）等达成深度收入共享，使 USDC 触达超 6 亿终端钱包；与此同时，Circle 大力拓展企业与金融机构直存托管，推动平台内 USDC 日均占比同比跃升 462bps 至 18.1%（期末 $139亿），持续改善净储备利润率（Net Reserve Margin 升至 38%–39%）。',
 formula: '商业传导：外部伙伴铺开全球 79% 链上交易份额 + 自有平台直存免分润 → 驱动 Q3\'26 分润成本同比下降 8% 至 $4.12亿',
 kpis: [['18.1%', 'Q3\'26 平台直存日均权重 (+462bps)'], ['$13.9B', 'Circle 平台内托管 USDC (+36%)'], ['38.0%', 'Q3\'26 净储备留存率 (Net Reserve)'], ['$100M', '币安对 Circle 战略股权投资额']]
 },
 {
 badge: 'NODE 04 · CPN CROSS-BORDER RAILS & CCTP INTEROPERABILITY',
 title: '利率免疫第二引擎：Circle Payments Network (CPN) 与 CCTP 全链清算收费站',
 desc: '2025 年 5 月推出的 CPN 将全球银行、支付服务商（PSP）与企业财资接入链上实时美元清算网，仅一年多即吸引 205 家金融机构入驻，年化结算额飙升逾 15 倍至 $413 亿；配合拟 $4 亿股票收购的新加坡 Tazapay（年化 $250 亿+ 跨境交易量，覆盖 100+ 市场）及占据跨链桥近半壁江山的 CCTP / Circle Gateway，正式打通按交易额收取基点服务费的非利差商业闭环。',
 formula: '商业传导：$13.9T/季 链上真实流转 → CPN 跨境结算费 + CCTP/xReserve 跨链基础设施订阅 → 对冲降息周期波动',
 kpis: [['$41.3B', 'Q3\'26 CPN 年化结算额 (>15x YoY)'], ['205 家', '已签约入驻 CPN 的金融机构'], ['+$25B+', '拟并购 Tazapay 增量跨境流水'], ['~47–50%', 'CCTP 占全网跨链桥交易份额']]
 },
 {
 badge: 'NODE 05 · ARC ENTERPRISE LAYER-1 & OPERATING LEVERAGE',
 title: 'Arc 互联网经济操作系统：首家公开发行 Layer-1 网络的纽交所上市公司',
 desc: '2026 年 9 月 16 日，Circle 正式上线专为稳定币外汇、资本市场与 AI Agent 高频微支付打造的企业级 Layer-1 公链 Arc 主网（首发即汇聚 100+ 机构与生态伙伴、7.5 万名开发者与 1,200+ 应用，亚秒级终局确认，原生以 USDC 支付 Gas）。Q3 单季确认 $1.818 亿 ARC 代币预售收入，助推 RLDC 利润率冲上 52.4%，展现极致的软件平台经营杠杆。',
 formula: '商业传导：RLDC 净收入 ($453.3M) - 精简经调整运营费用 ($138.8M) → 单季经调整 EBITDA 暴涨 +85% 至 $316.7M（利润率 70%）',
 kpis: [['52.4%', 'Q3\'26 RLDC 净留存利润率'], ['70.0%', 'Q3\'26 经调整 EBITDA / RLDC 率'], ['$2.72B', '公司自有流动性现金 ($0 有息债)'], ['75,000+', 'Arc House 全球生态开发者规模']]
 }
 ];
 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) {
 pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
 var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
 pTrack.querySelectorAll('.bm-node-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
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

 // 3. Tier Filter, Cohort Switcher & Peer Filter
 var tierFilter = document.getElementById('tierFilter');
 if (tierFilter) {
 tierFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]');
 if (!b) return;
 var cat = b.getAttribute('data-tcat');
 tierFilter.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 document.querySelectorAll('#tierList [data-tier]').forEach(function (card) {
 card.style.display = (cat === 'all' || card.getAttribute('data-tier') === cat) ? '' : 'none';
 });
 });
 }

 var COHORTS = {
 exch: {
 stats: [
 ['典型持币场景与客群', '头部合规交易所现货与托管池', '2025年贡献最大存量流动性底座'],
 ['渠道分润让渡比例', '~50%–65%+', '平台内持币归属方优先分润 + 剩余池平分'],
 ['每 $10B 规模年化净留存 (3.54%利率)', '~$135M / 年', '早期冷启动获客必须支付的渠道过路费'],
 ['战略演进方向', '稳存量 · 降权重', '随非单一交易所生态扩张逐步摊薄占比']
 ],
 note: '<strong>头部交易所分润池特征：</strong>2025 年 Coinbase 分走约 $13.5 亿（占总储备收入约 51%），虽然压低了表观综合毛利率，但帮助 USDC 在北美与机构现货交易市场零广告费站稳合规第一宝座。'
 },
 global: {
 stats: [
 ['典型持币场景与客群', '全球区域银行 / 拉美亚太 PSP / 币安', '覆盖 180+ 国家跨境汇款与抗通胀美元储蓄'],
 ['渠道分润让渡比例', '~35%–50%', '新签阶梯协议议价权显著优于历史排他条款'],
 ['每 $10B 规模年化净留存 (3.54%利率)', '~$195M / 年', '兼具新兴市场高增速与更高净留存率'],
 ['代表性战略伙伴', 'Binance / Nubank / Allaria / Visa', '2026年9月币安续约5年并斥资$1亿入股Circle']
 ],
 note: '<strong>全球多元化伙伴池特征：</strong>随着越来越多商业银行、Samsung Wallet 与区域金融科技平台主动寻求接入合规美元，Circle 在新签渠道协议中掌握更优定价权，预计推动整体分润率由 ~60% 中枢趋势性下行。'
 },
 direct: {
 stats: [
 ['典型持币场景与客群', 'Circle Mint 机构户 / 跨国企业财资', 'Q3 期末直存 $13.9B (+36% YoY)'],
 ['渠道分润让渡比例', '~0% 分润', '摆脱外部交易所 50%+ 分成盘剥'],
 ['每 $10B 规模年化净留存 (3.54%利率)', '~$354M / 年', '约为第三方深度分润渠道的 2.6 倍'],
 ['日均加权流通占比演进', '18.1%', '较上年同期大幅提升 +462bps']
 ],
 note: '<strong>平台直存棘轮效应：</strong>每当跨国企业、SAP ERP 客户或金融机构直接在 Circle 平台托管与调度 USDC，Circle 不仅将近 100% 的储备美债收益留存在表内，还能无缝叠加 CPN 清算费与可编程钱包订阅费！'
 }
 };
 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) {
 cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]');
 if (!b) return;
 var key = b.getAttribute('data-cohort');
 cohortTabs.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 var c = COHORTS[key] || COHORTS.direct;
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
 peerFilter.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 document.querySelectorAll('#peerTable tbody tr').forEach(function (row) {
 var rc = row.getAttribute('data-row-cat') || '';
 row.style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 });
 });
 }

 // 4. High-DPI Retina Canvas Engine
 function prepCanvas(id) {
 var c = document.getElementById(id);
 if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 500);
 var h = Math.max(140, rect.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr);
 c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }

 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath();
 ctx.moveTo(x + rr, y);
 ctx.arcTo(x + w, y, x + w, y + h, rr);
 ctx.arcTo(x + w, y + h, x, y + h, rr);
 ctx.arcTo(x, y + h, x, y, rr);
 ctx.arcTo(x, y, x + w, y, rr);
 ctx.closePath();
 }

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: '储备生息', val: 657.6, base: 0, col: pal.blue, tip: 'Q3 2026 储备利息收入: $657.6M（日均 $73.3B USDC × 3.54% 回报率）' },
 { lbl: '+网络/其他', val: 207.3, base: 657.6, col: pal.green, tip: 'Q3 2026 其他收入: +$207.3M (+627% YoY，含 Arc 主网确认 $181.8M 及 CPN/订阅收入)，总收入达 $864.9M' },
 { lbl: '=RLDC净留存', val: 453.3, base: 0, col: pal.violet, tip: '扣除 $411.6M 渠道分润与交易成本后，RLDC 净留存达 $453.3M (+55% YoY)，RLDC 利润率高达 52.4%' },
 { lbl: '经调整EBITDA', val: 316.7, base: 0, col: pal.green, tip: '扣除 $138.8M 经调整运营费用后，Q3 经调整 EBITDA 达 $316.7M (+85% YoY，占 RLDC 高达 70.0%)' },
 { lbl: 'GAAP营业利润', val: 208.3, base: 0, col: pal.blue, tip: '扣除 $43.1M SBC 与折旧摊销后，GAAP 营业利润 $208.3M (+157% YoY)' },
 { lbl: 'GAAP净利润', val: 226.0, base: 0, col: pal.amber, tip: 'Q3 2026 持续经营 GAAP 净利润: $226.0M (+5% YoY)，净利率 26.1%，稀释 EPS $0.84' }
 ];
 var maxV = 950;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'M', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(46, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(4, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(0) + 'M', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var qtrs = ["Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var rldcM = [39.5, 40.1, 41.4, 41.2, 52.4];
 var netResM = [37.1, 37.2, 38.0, 38.6, 37.8];
 var platPct = [13.5, 17.8, 17.9, 18.0, 18.1];
 var minM = 10, maxM = 60;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m;
 var my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 function plotLine(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (qtrs.length - 1)) * pw;
 var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (qtrs.length - 1)) * pw;
 var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === qtrs.length - 1 || idx === 0) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 }
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: qtrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 qtrs.forEach(function (q, idx) {
 var px = pad.left + (idx / (qtrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(q, px, pad.top + ph + 20);
 });
 plotLine(rldcM, pal.green, 'RLDC 净留存利润率');
 plotLine(netResM, pal.blue, '净储备利润率 Net Reserve Margin');
 plotLine(platPct, pal.violet, 'Circle 平台直存日均权重');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 22, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'share') {
 var issuers = [
 { name: 'USDC (Circle)', stock: 27.0, vol: 79.0, col: pal.blue },
 { name: 'USDT (Tether)', stock: 68.0, vol: 18.5, col: pal.green },
 { name: '其他合规稳定币 (PYUSD等)', stock: 5.0, vol: 2.5, col: pal.amber }
 ];
 var slot = pw / issuers.length;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 25, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 issuers.forEach(function (v, idx) {
 var cx = pad.left + idx * slot + slot / 2, bw = 34;
 var sh = (v.stock / 100) * ph, vh = (v.vol / 100) * ph;
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 4, pad.top + ph - sh, bw, sh, 5); ctx.fill();
 ctx.fillStyle = v.col;
 roundRect(ctx, cx + 4, pad.top + ph - vh, bw, vh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.stock + '%', cx - bw / 2 - 4, pad.top + ph - sh - 6);
 ctx.fillText(v.vol + '%', cx + bw / 2 + 4, pad.top + ph - vh - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: v.name, body: '市值流通存量占比 ~' + v.stock + '% vs Q3 链上结算交易量占比 ~' + v.vol + '%' });
 });
 } else {
 var chans = [
 { lbl: '头部交易所分成池', v: 135, col: pal.amber, tip: '扣除平台优先分成与生态对半分成后，每 $10B USDC 年化净留存约 ~$135M' },
 { lbl: '新兴银行/PSP伙伴池', v: 195, col: pal.blue, tip: '新签全球商业银行与支付机构阶梯分成下，每 $10B USDC 年化净留存约 ~$195M' },
 { lbl: 'Circle 平台直存池', v: 354, col: pal.green, tip: 'Circle Mint 与企业直存零外部渠道分成，3.54% 利率下每 $10B 年化净留存达 ~$354M' }
 ];
 var maxC = 400;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxC / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'M', pad.left - 8, gy + 4);
 }
 var sW = pw / chans.length, bW = Math.min(56, sW * 0.48);
 chans.forEach(function (ch, idx) {
 var x = pad.left + idx * sW + (sW - bW) / 2;
 var bh = (ch.v / maxC) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = ch.col;
 roundRect(ctx, x, yt, bW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + ch.v + 'M', x + bW / 2, yt - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(ch.lbl, x + bW / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: x, y: yt, w: bW, h: bh, title: ch.lbl, body: ch.tip });
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

 if (state.kView === 'ebitda') {
 var qtrs = ["Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var eb = [171.5, 175.9, 151.4, 143.5, 316.7];
 var maxE = 360;
 for (var g = 0; g <= 4; g++) {
 var ev = (maxE / 4) * g, ey = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ey); ctx.lineTo(pad.left + pw, ey); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + ev.toFixed(0) + 'M', pad.left - 8, ey + 4);
 }
 var slot = pw / qtrs.length, bw = Math.min(44, slot * 0.54);
 qtrs.forEach(function (q, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (eb[i] / maxE) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = (i === 4) ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + eb[i].toFixed(1) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(q, x + bw / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: q + ' 经调整 EBITDA (新口径)', body: '$' + eb[i].toFixed(1) + 'M（Q3\'26 同比增长 +85%，占 RLDC 70%）' });
 });
 } else {
 var items = [
 { name: '贝莱德 Circle Reserve Fund (~88%)', val: 64.7, col: pal.blue, tip: 'SEC 注册 2a-7 政府货币基金，仅持有极短期美国国债与隔夜国债逆回购协议' },
 { name: '系统重要性银行隔离现金 (~12%)', val: 8.9, col: pal.green, tip: '存放于全球 GSIB 银行的持币人利益隔离现金账户 (FBO Accounts)，支撑 24/7 即时赎回' },
 { name: '公司自有流动性现金 ($2.72B)', val: 2.72, col: pal.violet, tip: '含 $1,700M 企业自由现金 + $1,016M 企业自持稳定币隔离现金，且有息可转债已降为 $0' }
 ];
 var maxR = 72;
 var rowH = ph / items.length;
 items.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 24;
 var bl = Math.max(12, (it.val / maxR) * (pw * 0.78));
 ctx.fillStyle = it.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText('$' + it.val.toFixed(2) + 'B', pad.left + bl + 8, cy + 4);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(it.name, pad.left, cy - 17);
 hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 22, w: pw, h: 42, title: it.name, body: it.tip });
 });
 }
 }

 // 5. Interactive 2026–2031E Rate × Float × Margin Simulator
 var simData = { eb: [0.79, 0.98, 1.38, 1.96, 2.82, 4.14] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2026E', '2027E', '2028E', '2029E', '2030E', '2031E'];
 var arr = simData.eb;
 var maxE = Math.max(2.0, Math.ceil(Math.max.apply(null, arr) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2) + 'B', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gFloat = parseFloat(document.getElementById('inpUsdcCagr').value) / 100;
 var rYield = parseFloat(document.getElementById('inpResYield').value) / 100;
 var netM = parseFloat(document.getElementById('inpNetMargin').value) / 100;

 document.getElementById('lblUsdcCagr').textContent = (gFloat * 100).toFixed(1) + '%';
 document.getElementById('lblResYield').textContent = (rYield * 100).toFixed(1) + '%';
 document.getElementById('lblNetMargin').textContent = (netM * 100).toFixed(1) + '%';

 var avgFloat = 74.0; // FY26E avg $B
 var otherRev = 0.32; // FY26E guidance midpoint $320M
 var opEx = 0.58; // FY26E adj opex midpoint $578M
 var ebArr = [0.78];

 for (var y = 1; y <= 5; y++) {
 avgFloat *= (1 + gFloat);
 otherRev *= (1 + 0.28 + gFloat * 0.15); // CPN + Arc + CCTP scaling
 opEx *= 1.13; // Disciplined 13% annual opex growth
 var resInc = avgFloat * rYield;
 var rldc = resInc * netM + otherRev * 0.90;
 var ebitda = Math.max(0.15, rldc - opEx);
 ebArr.push(ebitda);
 if (y === 5) {
 var totRev31 = resInc + otherRev;
 var rldcMargin31 = (rldc / Math.max(0.01, totRev31)) * 100;
 document.getElementById('simFloatOut').textContent = '$' + Math.round(avgFloat) + 'B';
 document.getElementById('simRldcOut').textContent = '$' + rldc.toFixed(2) + 'B';
 document.getElementById('simMarginOut').textContent = rldcMargin31.toFixed(1) + '%';
 document.getElementById('simEbitdaOut').textContent = '$' + ebitda.toFixed(2) + 'B';
 }
 }
 simData.eb = ebArr;
 drawSimMiniCanvas();
 }

 ['inpUsdcCagr', 'inpResYield', 'inpNetMargin'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { f: 22.5, r: 2.1, m: 39 },
 base: { f: 40.0, r: 3.2, m: 43 },
 bull: { f: 47.5, r: 3.8, m: 49 }
 };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 simPresets.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpUsdcCagr').value = pr.f;
 document.getElementById('inpResYield').value = pr.r;
 document.getElementById('inpNetMargin').value = pr.m;
 runSimulator();
 });
 }

 function bindChartTab(groupId, attr, stateKey, drawFn) {
 var g = document.getElementById(groupId);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[stateKey] = b.getAttribute(attr);
 g.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 drawFn();
 });
 }
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 function bindHoverTooltip(canvasId) {
 var c = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect();
 var mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var list = hitRegions[canvasId] || [], hit = null;
 for (var i = 0; i < list.length; i++) {
 var rg = list[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 300, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

 function drawAllCharts() {
 drawProfitCanvas();
 drawCohortCanvas();
 drawCapitalCanvas();
 drawSimMiniCanvas();
 }

 // Quick Jump Search (⌘K)
 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'TTM $3.03B 收入 · Q3 RLDC 利润率 52.4% · 三大透镜切换' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: 'Circle Mint → 贝莱德 88% 国债池 → 直存 18.1% → CPN → Arc' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四大引擎', s: 'Q3 $865M 营收 → $453M RLDC → $317M 经调整 EBITDA (70%)' },
 { id: 'mod-cohort', t: 'M3 渠道分润剪刀差与 79% 链上份额', s: '直存零分润 vs 交易所分润 · 27% 存量撬动 79% 链上交易额' },
 { id: 'mod-capital', t: 'M4 $73.6B 隔离储备与 5 年复利推演', s: '零有息债 · 利率×流通量×净留存率交互模拟器' },
 { id: 'mod-matrix', t: 'M5 全球支付与稳定币矩阵及三大压测', s: 'CRCL vs Tether / Visa / Stripe / Coinbase / PayPal' }
 ];
 var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQuick(q) {
 if (!qPop) return;
 var kw = (q || '').trim().toLowerCase();
 var matched = QUICK_ITEMS.filter(function (it) {
 return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1;
 });
 qPop.innerHTML = matched.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
 }).join('');
 qPop.classList.toggle('open', matched.length > 0);
 }
 if (qInput && qPop) {
 qInput.addEventListener('focus', function () { renderQuick(qInput.value); });
 qInput.addEventListener('input', function () { renderQuick(qInput.value); });
 qPop.addEventListener('click', function (e) {
 var jb = e.target.closest('[data-jump]');
 if (!jb) return;
 var el = document.querySelector(jb.getAttribute('data-jump'));
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) {
 if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open');
 });
 }
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
 e.preventDefault();
 if (qInput) qInput.focus();
 }
 if (e.key === 'Escape') {
 if (qPop) qPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 // Sidebar Toggle, Export & Print
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
 setTimeout(drawAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var t = btn.getAttribute('data-portal-theme');
 applyTheme(t, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, t); } catch (err) {}
 });
 });
 
 

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
 var k = chk.getAttribute('data-stress-chk');
 chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () {
 savedChk[k] = chk.checked;
 try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
 showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
 });
 });
 } catch (e) {}

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark';
 applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (!lb) return;
 var nl = lb.getAttribute('data-lang');
 applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var resizeTimer = null;
 window.addEventListener('resize', function () {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(drawAllCharts, 90);
 });

 runSimulator();
 drawAllCharts();
 })();
 