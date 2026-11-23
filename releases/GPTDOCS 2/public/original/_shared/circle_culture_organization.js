
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_crcl_culture_checks_v1';

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 高诚信与正门透明）：</strong>Allaire 在招股书与 2026 股东信中反复指出，货币网络没有“先破坏再道歉”的特权——正是十余年如一日的正门合规，让 Circle 在《GENIUS 法案》时代自动成为美国主流银行与跨国 ERP 的默认合规接口 <a class="cite-link" href="https://d18rn0p25nwr6d.cloudfront.net/CIK-0001876042/3924f49b-d901-4a89-813a-3ef657a68045.pdf" target="_blank" rel="noopener noreferrer">2026 Proxy 使命价值观 ↗</a>。',
 '<strong>当前选中支柱解读（02 多方共赢与市场中立）：</strong>不自营散户投机交易所、不偏袒单一公链，使 USDC 得以在 30+ 条竞争性区块链上原生通行，并先后赢得 Coinbase、币安（$1亿战略入股）及 Visa 的共同力推 <a class="cite-link" href="https://www.businesswire.com/news/home/20261104960710/en/Circle-Reports-Third-Quarter-2026-Results" target="_blank" rel="noopener noreferrer">Q3 2026 生态公告 ↗</a>。',
 '<strong>当前选中支柱解读（03 卓越追求与平台化抽象）：</strong>通过 Circle Gateway 亚秒级跨链统一余额、MPC 免助记词企业钱包与 CPN Managed Payments，将复杂的链上 Gas 与桥接细节彻底封装在云端 API 之后 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1876042/000187604226000062/crcl-20251231.htm" target="_blank" rel="noopener noreferrer">FY25 10-K 技术栈 ↗</a>。',
 '<strong>当前选中支柱解读（04 清醒审慎与危机极限抗压）：</strong>经历 2023 年 SVB 危机洗礼后，Circle 将约 88% 储备锚定于贝莱德管理的 SEC 2a-7 纯美债货币基金，并清零全部有息可转债、手握 $27.2亿 自有流动性现金。'
 ];

 var PEER_ROWS = [
 {
 category: 'crypto',
 benchmark: true,
 company: '研究基准：Circle Internet Group (NYSE: CRCL)',
 leader: 'Jeremy Allaire (CEO) · Heath Tarbert (总裁)',
 positioning: '全球正门合规 + 贝莱德 88% 国债托管 + 纽交所上市公众治理',
 culture: '高诚信透明 + 协议级市场中立 + 30% Class B 投票权封顶',
 headcount: '~1,045–1,100人 · TTM 人均创收 ~$2.90M',
 margins: 'TTM 收入 $30.3亿 · Q3 RLDC 率 52.4% · EBITDA/RLDC 70%',
 verdict: '机构级链上金融标准制定者：唯一兼具美欧全牌照、79% 链上交易量份额与 Arc/CPN 全栈清算网的上市公司。',
 sourceLabel: 'SEC FY25 10-K / Q3 8-K',
 sourceUrl: 'https://www.businesswire.com/news/home/20261104960710/en/Circle-Reports-Third-Quarter-2026-Results'
 },
 {
 category: 'crypto',
 benchmark: false,
 company: 'Tether Holdings (USDT · 私人离岸)',
 leader: 'Paolo Ardoino (CEO) · Giancarlo Devasini',
 positioning: '萨尔瓦多离岸总部 + 规避美国/欧盟 MiCA 严苛银行级监管',
 culture: '百人极简特种兵 + 零渠道分润独享利差 + 新兴市场草根渗透',
 headcount: '~150–200人 · 人类商业史极致人均创利极值',
 margins: '零交易所分润，毛利率 >95%，配置美债+黄金+比特币',
 verdict: '离岸高利差现金机器：在发展中国家灰市与散户点对点汇款占优，但因合规受限难以进入美国银行、SAP ERP 与机构清结算核心层。',
 sourceLabel: 'Artemis Stablecoin Comp',
 sourceUrl: 'https://research.artemis.ai/p/circle-internet-group-crcl'
 },
 {
 category: 'crypto',
 benchmark: false,
 company: 'Coinbase Global (NASDAQ: COIN)',
 leader: 'Brian Armstrong (联合创始人兼 CEO)',
 positioning: '美国合规加密超级入口 + Base L2 + 现货 ETF 核心托管商',
 culture: 'Mission-Focused 去政治化聚焦 + 交易经纪与链上生态双轮驱动',
 headcount: '~3,700–4,200人 · 高弹性周期性人效',
 margins: '综合毛利率 ~85% · 2025 年分走 Circle 总储备收入约 51% ($13.5亿)',
 verdict: '最亲密的战友与分润博弈方：Coinbase 需要 USDC 留住链上生态，Circle 则通过拓展币安、银行与自有平台直存平衡其议价权。',
 sourceLabel: 'Coinbase / Circle 10-K',
 sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1876042/000187604226000062/crcl-20251231.htm'
 },
 {
 category: 'fintech',
 benchmark: false,
 company: 'Stripe (+ Bridge 稳定币网关)',
 leader: 'Patrick & John Collison',
 positioning: '全球互联网商户收单霸主 + $11亿收购 Bridge 布局稳定币 API',
 culture: '硅谷极致开发者文档美学 + 长线基础设施复利文化',
 headcount: '~8,000+ 人 · 工程与企业销售并重',
 margins: '万亿美元级 TPV，净收单留存率 ~30–40bps',
 verdict: '应用层收单王者：Stripe 强在电商结账最后一公里，而底层跨链稳定币流动性仍高度接入并放大 USDC 网络效应。',
 sourceLabel: 'Circle Industry Report',
 sourceUrl: 'https://www.circle.com/pressroom/from-stablecoins-to-infrastructure-circle-charts-the-rise-of-the-internet-financial-system-2026-report'
 },
 {
 category: 'fintech',
 benchmark: false,
 company: 'Visa Inc. (NYSE: V)',
 leader: 'Ryan McInerney (CEO)',
 positioning: '覆盖 200+ 国家与 40亿+ 张卡的全球四方清算网络霸主',
 culture: '零信贷风险网络中立 + 99.999% 金融级高可用纪律',
 headcount: '~31,000+ 人 · 人均创收 ~$1.2M',
 margins: '营业利润率高达 ~67%，纯正交易基点收费机',
 verdict: 'Circle 的终局镜像与合作盟友：Visa Direct 已在 180+ 国商业化部署 USDC 预注资结算；Circle 正是在公链上复刻“下一代可编程 Visa”。',
 sourceLabel: 'Q3 2026 Visa Direct 部署',
 sourceUrl: 'https://www.businesswire.com/news/home/20261104960710/en/Circle-Reports-Third-Quarter-2026-Results'
 }
 ];

 var CHECKLIST_ITEMS = [
 {
 tag: '正门牌照壁垒',
 title: '1. “正门监管”测试：是否在美欧亚核心司法辖区持有最高等级原生牌照？',
 desc: '核查企业是否主动拥抱《GENIUS 法案》、OCC 国民信托银行、欧盟 MiCA 等法定框架，而非依赖随时可能被封堵的离岸灰色通道。'
 },
 {
 tag: '100% 破产隔离',
 title: '2. 储备纯度测试：客户储备资产是否 100% 破产隔离且零杠杆信贷挪用？',
 desc: '对标 Circle Reserve Fund（贝莱德管理 88% 纯短债 + 12% GSIB 现金 + 四大月审），确认极端挤兑下具备 T+0 全额刚性兑付能力。'
 },
 {
 tag: '协议中立不争利',
 title: '3. 市场中立测试：是否严守底座边界、不自营高冲突业务与下游客户抢生意？',
 desc: '正如 Circle 剥离 Poloniex 交易所并原生支持 30+ 公链，唯有绝对中立才能让互相竞争的银行、交易所与 ERP 共同采用同一套货币标准。'
 },
 {
 tag: '直存与非利差引擎',
 title: '4. 分润脱敏测试：平台直存占比与非利差结算收入是否呈季度结构性上升？',
 desc: '跟踪平台内托管 USDC 权重（Q3\'26 达 18.1%）及 CPN/Arc/CCTP 等抗降息手续费收入占比，验证毛利率自主权持续增强。'
 },
 {
 tag: '~$2.90M 人效锚',
 title: '5. 千人精兵纪律测试：收入翻倍扩张时是否保持极简编制与高 EBITDA 转化率？',
 desc: '对标 Q3\'26 主动精简 5% 冗余岗位、实现 70% 经调整 EBITDA/RLDC 利润率，拒绝顺周期盲目堆砌人力。'
 },
 {
 tag: '30% 票权硬上限',
 title: '6. 公众治理制衡测试：管理层权力是否受透明董事会与投票权上限制度约束？',
 desc: '核查同股不同权架构是否设有合理封顶（如 Circle Class B 设 30% 总票权硬上限），兼顾创始人长期战略定力与外部机构股东保护。'
 }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: 'TTM $3.03B 收入 · ~$2.90M 人均创收 · 79% 链上交易量份额' },
 { sec: 'sec-01', title: '01 双螺旋架构与千人超高人效', sub: 'Allaire × Tarbert × Chandhok · 六年 197 倍收入跃迁图' },
 { sec: 'sec-02', title: '02 四大文化支柱与五维雷达', sub: '高诚信正门合规 · 协议中立 · SVB 72h 极限兑付 · 雷达图' },
 { sec: 'sec-03', title: '03 全球金融与加密巨头文化对比', sub: 'Circle vs Tether vs Coinbase vs Stripe vs Visa 实时筛选表' },
 { sec: 'sec-04', title: '04 经营杠杆释放与复利推演器', sub: 'EBITDA 跃升曲线 · 跨周期平台复利交互模拟器' },
 { sec: 'sec-05', title: '05 三幕组织演进与四大生死战', sub: '首张 BitLicense · 剥离交易所 · SVB 淬火 · 纽交所敲钟与 Arc' },
 { sec: 'sec-06', title: '06 Circle 文化法则核查清单', sub: '6 项金融基础设施组织诊断与本地持久化评分' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC 10-K/8-K/S-1/DEF 14A 官方一手文件索引' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 6, priceCagr: 22.0, drip: true },
 p2: { principal: 10000, years: 5, priceCagr: 38.0, drip: false },
 p3: { principal: 10000, years: 10, priceCagr: 14.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { crcl: true, usdt: true, swift: true },
 peerFilter: 'all',
 peerQuery: '',
 epsSeries: { eps: true, oci: true },
 sim: { principal: 10000, years: 6, priceCagr: 22.0, drip: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
 function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

 var toastTimer = null;
 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg;
 el.classList.add('show');
 clearTimeout(toastTimer);
 toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2500);
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIcon = document.getElementById('appbarThemeIcon');
 if (abIcon) {
 abIcon.innerHTML = state.theme === 'dark'
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 
 
 safeSet(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色护眼模式' : '已切换至清晰浅色模式');
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (node) {
 var val = node.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) node.innerHTML = val;
 else node.textContent = val;
 }
 });
 safeSet(STORAGE_LANG_KEY, state.lang);
 renderAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换至中文视图');
 }

 // Suite Hub Filter & Notification
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

 function escapeHtml(str) {
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 }
 function highlightMatch(text, query) {
 var safe = escapeHtml(text);
 if (!query) return safe;
 var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody');
 var badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = PEER_ROWS.filter(function (row) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var hay = (row.company + ' ' + row.leader + ' ' + row.positioning + ' ' + row.culture + ' ' + row.verdict).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 if (badge) badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配记录，请尝试其他关键词或重置筛选。</td></tr>';
 return;
 }
 var rawQ = state.peerQuery.trim();
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
 '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
 '<td>' + highlightMatch(r.positioning, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.culture, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.headcount, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.margins, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
 '</tr>';
 }).join('');
 }

 function formatCurrency(val) {
 if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
 var boost = state.sim.drip ? 4.5 : 0.0;
 var totalRate = (cagr + boost) / 100;
 var endingValue = p * Math.pow(1 + totalRate, yrs);
 var moic = endingValue / p;
 var netGain = endingValue - p;
 var midYear = Math.max(1, Math.floor(yrs / 2));
 var midValue = p * Math.pow(1 + totalRate, midYear);

 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + ' 年';
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
 document.getElementById('simMoicVal').textContent = moic.toFixed(2) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = formatCurrency(netGain);
 document.getElementById('simMidLabel').textContent = '第 ' + midYear + ' 年中期节点价值';
 document.getElementById('simMidVal').textContent = formatCurrency(midValue);

 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.classList.toggle('active', b.getAttribute('data-preset') === state.sim.preset);
 });
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 if (!container) return;
 var doneCount = state.checks.filter(Boolean).length;
 var pct = Math.round((doneCount / CHECKLIST_ITEMS.length) * 100);
 if (chip) chip.textContent = '已核查 ' + doneCount + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)';
 if (bar) bar.style.width = pct + '%';
 container.innerHTML = CHECKLIST_ITEMS.map(function (item, idx) {
 var isChecked = !!state.checks[idx];
 return '<label class="check-card ' + (isChecked ? 'checked' : '') + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
 '<div style="flex:1;">' +
 '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
 '<span class="check-title">' + escapeHtml(item.title) + '</span>' +
 '<span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
 '</div>' +
 '<p class="check-desc">' + escapeHtml(item.desc) + '</p>' +
 '</div></label>';
 }).join('');
 }

 // High-DPI Retina Canvas Charts
 function getPalette() {
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
 tick: isDark ? '#94A3B8' : '#475569',
 text: isDark ? '#F3F6F9' : '#0F1924',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: isDark ? '#3399FF' : '#0073E6',
 c2: isDark ? '#22C55E' : '#16A34A',
 c3: isDark ? '#FFB74D' : '#D97706',
 c4: isDark ? '#A78BFA' : '#7C3AED'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var rect = canvas.parentElement.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width || 500));
 var h = Math.max(170, Math.floor(rect.height || 300));
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 canvas.width = Math.floor(w * dpr);
 canvas.height = Math.floor(h * dpr);
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h - rad);
 ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
 ctx.lineTo(x + rad, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.closePath();
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var titleEl = document.getElementById('ch1ChartTitle');
 var subEl = document.getElementById('ch1ChartSub');
 var metaEl = document.getElementById('ch1AxisMeta');

 if (state.ch1View === 'viewA') {
 titleEl.textContent = "FY2020–TTM Q3'26 总营收与储备收入跨越 197 倍跃升轨迹（$M · SEC S-1 & 10-K/10-Q）";
 subEl.textContent = "从 2020 年 $15.4M 起步，跨越 2023 硅谷银行压力测试，跃升至 FY25 $2,746.6M 与 TTM $3,030.6M 历史峰值";
 metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 蓝色：储备利息收入 Reserve Income ($M)</span><span style="color:var(--chart-c2);">■ 绿色：非利差平台与网络其他收入 Other Revenue ($M)</span>';

 var pad = { top: 28, right: 20, bottom: 38, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25', "TTM Q3'26"];
 var resInc = [4.0, 28.0, 735.8, 1430.6, 1661.1, 2636.8, 2711.3];
 var othRev = [11.4, 56.9, 36.2, 19.9, 15.2, 109.8, 319.3];
 var maxY = 3300;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'M', pad.left - 8, gy + 4);
 }
 var step = pw / yrs.length, bw = Math.min(42, step * 0.54);
 yrs.forEach(function (y, i) {
 var cx = pad.left + step * (i + 0.5), x = cx - bw / 2;
 var rVal = state.ch1Series.s1 ? resInc[i] : 0;
 var oVal = state.ch1Series.s2 ? othRev[i] : 0;
 var tot = rVal + oVal;
 var hR = (rVal / maxY) * ph, hO = (oVal / maxY) * ph;
 if (hR > 0) {
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, x, pad.top + ph - hR, bw, hR, 4); ctx.fill();
 }
 if (hO > 0) {
 ctx.fillStyle = pal.c2;
 roundRectPath(ctx, x, pad.top + ph - hR - hO, bw, Math.max(3, hO), 4); ctx.fill();
 }
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + (tot >= 1000 ? (tot / 1000).toFixed(2) + 'B' : tot.toFixed(0) + 'M'), cx, pad.top + ph - hR - hO - 7);
 ctx.fillStyle = pal.tick; ctx.font = '600 11px "IBM Plex Mono", sans-serif';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartCh1.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
 html: '<strong>' + y + ' 收入拆解</strong><br/>• 储备收入：<strong>$' + resInc[i].toFixed(1) + 'M</strong><br/>• 平台与网络其他收入：<strong>$' + othRev[i].toFixed(1) + 'M</strong><br/>• 合计总收入：<strong>$' + (resInc[i] + othRev[i]).toFixed(1) + 'M</strong>'
 });
 });
 } else {
 titleEl.textContent = "FY2022–Q3'26 极简团队规模（人）vs 人均年化创收跃迁（$M/人）";
 subEl.textContent = "拒绝顺周期人海扩张，Q3'26 主动实施约 5% 组织精简后，TTM 人均创收冲上 ~$2.90M 行业塔尖";
 metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 左轴：员工总人数 Headcount</span><span style="color:var(--chart-c2);">● 右轴：人均创收 Revenue / FTE ($M)</span>';

 var padB = { top: 28, right: 54, bottom: 38, left: 52 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var pLbls = ['FY22', 'FY23', 'FY24(IPO前)', 'FY25(10-K)', "Q3'26(精简后)"];
 var ftes = [920, 890, 900, 1100, 1045];
 var revEmp = [0.84, 1.63, 1.86, 2.50, 2.90];
 var maxFte = 1600, maxRev = 3.4;
 for (var j = 0; j <= 4; j++) {
 var r = j / 4, gyB = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, gyB); ctx.lineTo(padB.left + pwB, gyB); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(Math.round(maxFte * r), padB.left - 8, gyB + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText('$' + (maxRev * r).toFixed(2) + 'M', padB.left + pwB + 8, gyB + 4);
 }
 var stepB = pwB / pLbls.length, bwB = Math.min(40, stepB * 0.44);
 var pts = [];
 pLbls.forEach(function (lb, k) {
 var cx = padB.left + stepB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bh = (ftes[k] / maxFte) * phB, by = padB.top + phB - bh;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, cx - bwB / 2, by, bwB, bh, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(ftes[k] + '人', cx, by + 16);
 }
 var ly = padB.top + phB - (revEmp[k] / maxRev) * phB;
 pts.push({ x: cx, y: ly, v: revEmp[k] });
 ctx.fillStyle = pal.tick; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, cx, padB.top + phB + 20);
 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
 html: '<strong>' + lb + '</strong><br/>• 团队人数：<strong>~' + ftes[k] + ' 人</strong><br/>• 人均年创收：<strong>$' + revEmp[k].toFixed(2) + 'M / 人</strong>'
 });
 });
 if (state.ch1Series.s2) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
 ctx.stroke();
 pts.forEach(function (pt) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + pt.v.toFixed(2) + 'M', pt.x, pt.y - 9);
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = ['主权监管合规度', '储备审计透明度', '跨链开发者生态', '单兵软件人效', '公众治理制衡'];
 var series = [
 { key: 'crcl', name: 'Circle (CRCL)', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.9, 9.6, 9.3, 9.4] },
 { key: 'usdt', name: 'Tether (USDT)', color: pal.c2, fill: 'rgba(34, 197, 94, 0.14)', vals: [4.2, 5.0, 7.8, 9.9, 3.8] },
 { key: 'swift', name: '传统代理行网络', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [9.5, 8.2, 3.2, 4.5, 8.0] }
 ];
 var cx = w / 2, cy = h / 2 + 6;
 var radius = Math.max(62, Math.min((w - 190) / 2, h * 0.35));
 var total = axes.length;
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
 var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.closePath(); ctx.stroke();
 }
 for (var a = 0; a < total; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 34, y: Math.min(ay, ly) - 20, w: 70 + Math.abs(lx - ax), h: 40,
 html: '<strong>' + axes[a] + '</strong><br/>• Circle: <strong>' + series[0].vals[a] + '</strong> | Tether: <strong>' + series[1].vals[a] + '</strong> | 传统代理行: <strong>' + series[2].vals[a] + '</strong>'
 });
 }
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
 var vx = cx + Math.cos(th) * ((s.vals[idx] / 10) * radius);
 var vy = cy + Math.sin(th) * ((s.vals[idx] / 10) * radius);
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill();
 ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { label: '贝莱德 Circle Reserve Fund 纯国债托管占比', val: 88.0, col: '#16A34A', sub: '~$64.7B / $73.6B 隔离储备', note: 'SEC 注册 2a-7 政府货币市场基金托管，彻底隔离商业银行挤兑风险' },
 { label: 'USDC 占全球稳定币链上真实交易量份额 (Q3\'26)', val: 79.0, col: '#0073E6', sub: '单季 $13.9T (+49% YoY)', note: '智能合约、DeFi、CCTP 与机构支付首选合规数字美元' },
 { label: 'Q3 2026 经调整 EBITDA / RLDC 经营转化率', val: 70.0, col: '#2563EB', sub: '$316.7M / $453.3M', note: '千人精兵平台架构带来的超高边际利润释放能力' },
 { label: 'Q3 2026 扣除分润后净留存利润率 (RLDC Margin)', val: 52.4, col: '#7C3AED', sub: '同比大幅跃升 +1,291bps', note: 'Arc 代币预售收入确认与分润下降共同推升净留存率' },
 { label: '创始人 Class B 类别总投票权制度硬上限', val: 30.0, col: '#D97706', sub: 'Allaire 实际持 23.9% 投票权', note: '罕见的创始人主动限权设计，契合全球金融基础设施公众监管要求' },
 { label: 'Circle 平台内直存 USDC 日均加权占比 (Q3\'26)', val: 18.1, col: '#0284C7', sub: '期末 $13.9B (+462bps YoY)', note: '零外部渠道分润的核心高毛利增长极' }
 ];
 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var maxX = 100, rowH = ph / items.length;
 for (var g = 0; g <= 4; g++) {
 var gx = pad.left + (g / 4) * pw;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText((g * 25) + '%', gx, pad.top + ph + 18);
 }
 items.forEach(function (it, i) {
 var rt = pad.top + rowH * i;
 var ly = rt + rowH * 0.35, by = rt + rowH * 0.52, bh = Math.min(15, rowH * 0.26);
 var bw = (it.val / maxX) * pw;
 ctx.fillStyle = pal.text; ctx.font = '600 12px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.label, pad.left, ly);
 ctx.fillStyle = it.col; ctx.font = '800 12px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, ly);
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, by, pw, bh, bh / 2); ctx.fill();
 ctx.fillStyle = it.col; roundRectPath(ctx, pad.left, by, bw, bh, bh / 2); ctx.fill();
 hitRegions.chartBars.push({
 idx: i, x: pad.left, y: rt, w: pw, h: rowH,
 html: '<strong>' + it.label + ': ' + it.val.toFixed(1) + '%</strong><br/>• 明细：' + it.sub + '<br/>• 解读：' + it.note
 });
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var yrs = ['FY2022', 'FY2023', 'FY2024', 'FY2025', "TTM Q3'26"];
 var ebM = [95.0, 268.0, 284.9, 582.2, 787.5];
 var rldcPct = [37.8, 39.1, 39.3, 39.4, 43.9];
 var pad = { top: 26, right: 50, bottom: 38, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var maxE = 900, minM = 30, maxM = 50;
 for (var g = 0; g <= 4; g++) {
 var r = g / 4, gy = pad.top + ph - r * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText('$' + Math.round(maxE * r) + 'M', pad.left - 8, gy + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText((minM + r * (maxM - minM)).toFixed(1) + '%', pad.left + pw + 8, gy + 4);
 }
 var step = pw / yrs.length, bw = Math.min(44, step * 0.44);
 var pts = [];
 yrs.forEach(function (y, i) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = (ebM[i] / maxE) * ph, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; roundRectPath(ctx, cx - bw / 2, by, bw, bh, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + ebM[i].toFixed(0) + 'M', cx, by + 16);
 }
 var ly = pad.top + ph - ((rldcPct[i] - minM) / (maxM - minM)) * ph;
 pts.push({ x: cx, y: ly, v: rldcPct[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
 html: '<strong>' + y + '</strong><br/>• 经调整 EBITDA：<strong>$' + ebM[i].toFixed(1) + 'M</strong><br/>• 综合 RLDC 利润率：<strong>' + rldcPct[i].toFixed(1) + '%</strong>'
 });
 });
 if (state.epsSeries.oci) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
 ctx.stroke();
 pts.forEach(function (pt) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(pt.v.toFixed(1) + '%', pt.x, pt.y - 9);
 });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years;
 var baseR = state.sim.priceCagr / 100;
 var totR = (state.sim.priceCagr + (state.sim.drip ? 4.5 : 0)) / 100;
 var totS = [], baseS = [];
 for (var y = 0; y <= yrs; y++) {
 totS.push(p * Math.pow(1 + totR, y));
 baseS.push(p * Math.pow(1 + baseR, y));
 }
 var maxVal = Math.max(totS[yrs], baseS[yrs], p * 1.2) * 1.1;
 var pad = { top: 20, right: 20, bottom: 26, left: 58 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 7, gy + 4);
 }
 var stepX = pw / yrs;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var px = pad.left + stepX * i, py = pad.top + ph - (baseS[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.stroke(); ctx.restore();

 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 for (var k = 0; k <= yrs; k++) {
 var tx = pad.left + stepX * k, ty = pad.top + ph - (totS[k] / maxVal) * ph;
 if (k === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
 if (k === 0 || k === Math.floor(yrs / 2) || k === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + k, tx, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({
 idx: k, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22,
 html: '<strong>第 ' + k + ' 年模拟价值</strong><br/>• 含 CPN/Arc 平台增厚：<strong>' + formatCurrency(totS[k]) + '</strong><br/>• 纯储备内生基准：<strong>' + formatCurrency(baseS[k]) + '</strong>'
 });
 }
 ctx.stroke();
 }

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawHorizontalBars();
 drawEpsComboChart();
 drawSimChart();
 }

 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 canvas.addEventListener('mousemove', function (e) {
 var rect = canvas.getBoundingClientRect();
 var x = e.clientX - rect.left, y = e.clientY - rect.top;
 var regions = hitRegions[canvasId] || [], matched = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
 }
 if (matched) {
 tip.innerHTML = matched.html;
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 300, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }

 // Init & Listeners
 var savedT = (safeGet(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
 var savedL = (safeGet(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
 var savedC = safeGet(STORAGE_CHECK_KEY);
 if (savedC) {
 try {
 var parsed = JSON.parse(savedC);
 if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) state.checks = parsed.map(Boolean);
 } catch (e) {}
 }

 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 applyTheme(savedT, true);
 applyLanguage(savedL, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 
 

 
 

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth <= 1120) {
 var op = sb.classList.toggle('open');
 bd.classList.toggle('open', op);
 } else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 safeSet(STORAGE_SIDEBAR_KEY, col ? '0' : '1');
 setTimeout(renderAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

 var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase();
 var list = QUICK_JUMP_INDEX.filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
 jumpPop.innerHTML = list.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
 }).join('');
 jumpPop.classList.toggle('open', list.length > 0);
 }
 jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
 jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
 jumpPop.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-jump-sec]');
 if (!btn) return;
 var el = document.getElementById(btn.getAttribute('data-jump-sec'));
 if (el) el.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
 if (e.key === 'Escape') { jumpPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
 });

 document.querySelectorAll('[data-ch1-view]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.ch1View = b.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-ch1-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = b.getAttribute('data-ch1-series');
 state.ch1Series[k] = !state.ch1Series[k];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[k] = true;
 b.classList.toggle('muted', !state.ch1Series[k]);
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-collapse-target]').forEach(function (b) {
 b.addEventListener('click', function () {
 var panel = document.getElementById(b.getAttribute('data-collapse-target'));
 if (!panel) return;
 var open = panel.classList.toggle('open');
 b.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
 });
 });
 document.querySelectorAll('[data-pillar]').forEach(function (card) {
 card.addEventListener('click', function () {
 var idx = parseInt(card.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 document.querySelectorAll('[data-pillar]').forEach(function (c, k) { c.classList.toggle('active', k === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + PILLAR_NOTES[idx] + '</div>';
 drawRadarChart();
 });
 });
 document.querySelectorAll('[data-radar-key]').forEach(function (p) {
 p.addEventListener('click', function () {
 var k = p.getAttribute('data-radar-key');
 state.radarSeries[k] = !state.radarSeries[k];
 if (!state.radarSeries.crcl && !state.radarSeries.usdt && !state.radarSeries.swift) state.radarSeries[k] = true;
 p.classList.toggle('muted', !state.radarSeries[k]);
 drawRadarChart();
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

 document.querySelectorAll('[data-eps-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = b.getAttribute('data-eps-series');
 state.epsSeries[k] = !state.epsSeries[k];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[k] = true;
 b.classList.toggle('muted', !state.epsSeries[k]);
 drawEpsComboChart();
 });
 });

 var pS = document.getElementById('simPrincipalSlider'), yS = document.getElementById('simYearsSlider'), cS = document.getElementById('simCagrSlider'), dT = document.getElementById('simDripToggle');
 pS.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 6; state.sim.preset = ''; updateSimulatorUI(); });
 cS.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
 dT.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var key = b.getAttribute('data-preset'), cfg = PRESETS[key];
 if (!cfg) return;
 state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = key;
 pS.value = String(cfg.principal); yS.value = String(cfg.years); cS.value = String(cfg.priceCagr); dT.checked = cfg.drip;
 updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]');
 if (!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
 safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast('已勾选全部 6 项核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast('已恢复默认基准状态 (50%)');
 });

 window.addEventListener('scroll', function () {
 var docEl = document.documentElement;
 var maxS = Math.max(1, docEl.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxS) * 100) + '%';
 }, { passive: true });

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);
 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 70); });
 })();
 