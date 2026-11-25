
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'amzn_bm_stress_v1';

 var state = {
 theme: 'dark',
 lang: 'zh',
 pView: 'waterfall',
 cView: 'share',
 kView: 'ocf'
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
 blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.18)',
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
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色护眼模式' : '已切换至 MUI 浅色模式');
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

 

 // 1. Command Deck 3-Lens Switcher
 var LENSES = [
 {
 formula: '集团历史最高营业利润率 (13.9%) = 自营低价获客 (~0–3% 利润率) + 3P履约/Prime订阅 + 零售广告 (~70%+ 增量利润率) + AWS算力税 (38.7% OpM)',
 body: '苹果靠“39%毛利的旗舰硬件”逆向获客，亚马逊则靠<strong>“让利到底的自营零售 + 当日达物流”</strong>消灭竞争对手毛利空间；再把自身不得不建的仓库（FBA）、服务器（AWS）和货架注意力（Sponsored Ads）全部模块化拆解租给外部商户与全球企业，把固定成本黑洞逆转为高边际利润现金牛。'
 },
 {
 formula: '商家侧双重变现池 (FY25 ~$2,408亿) = 第三方卖家佣金与FBA费 ($1,721.6亿) + 闭环零售广告竞价 ($686.4亿；TTM Q3\'26 已升至 $780.1亿)',
 body: '独立卖家贡献了亚马逊全球商店 <strong>61%–62% 的付费售出件数</strong>。商家不仅自行承担存货备货风险并支付佣金与 FBA 履约费，为争夺黄金搜索位还需竞价购买 Sponsored Products 广告——这两项服务收入相加已超过亚马逊整个自营零售额。'
 },
 {
 formula: '营运资本浮存 (应付账款 $1,587亿 = 存货 $426亿 × 3.7倍) + TTM 经营现金流 ($1,683亿) → 全力支撑 ~$2,200亿 2026E AI/芯片/卫星重基建',
 body: '消费者刷卡即刻到账，而供应商账期长达百日以上，令亚马逊常年享有约 <strong>-43天负现金转换周期</strong>；管理层秉承 1997 股东信铁律，不粉饰短期会计指标，将暴涨 +29% 的经营现金流果断超前投入 30 年寿命数据中心与自研 Trainium 芯片集群。'
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

 // 2. Horizontal 5-Node Value-Chain Pipeline Inspector
 var NODES = [
 {
 badge: 'NODE 01 · EVERYDAY LOW PRICE & HIGH-FREQUENCY GROCERY',
 title: '自营零售（Online & Physical Stores $2,918亿）：战略性压低商品毛利，换取无敌选品与流量黑洞',
 desc: '亚马逊连续第 9 年被 Profitero 评为全美最低价零售商（线上均价较主流竞品低 14%）。自营业务（FY25 线上自营 $2,692.9亿 + 线下全食超市等 $225.6亿）并不追求单品暴利，而是通过把生鲜易腐品全面接入 2,300+ 城镇当日达网络，推动生鲜杂货总交易额突破 $1,500亿（稳居全美第二大杂货商），以生鲜每周复购带动全品类连带下单。',
 formula: '商业传导：极致低价 (-14%) + 6亿+ SKU 无限货架 + Rufus AI 导购（增量年销 ~$120亿） → 零外部买量锁定北美约 40% 电商份额',
 kpis: [['$269.3B', 'FY2025 自营线上商店净营收'], ['>$150B', '2025 生鲜杂货总销售额 (全美第2)'], ['-14%', '连续9年较全美大型零售商低价幅度'], ['~$12B', 'Rufus 购物Agent拉动年化增量销售']]
 },
 {
 badge: 'NODE 02 · REGIONALIZED ROBOTICS & PRIME HABIT LOCK-IN',
 title: '百万台仓储机器人 + 85+ 座当日达中心：用物理极速筑起无法复制的履约深沟',
 desc: '自 2023 年将全美履约网拆分为 8 大自给自足区域并部署超过 100 万台仓储机器人（Proteus / Sequoia 等）后，单件运输距离与履约成本显著下降。Q3 2026 单季为 Prime 会员当日或次日送达逾 15 亿件商品，20–30 分钟极速闪送 Amazon Now 已覆盖全球 450+ 城镇（订单量同比暴增 10 倍），将订阅年费收入推升至年化 $560亿 运行率。',
 formula: '商业传导：配送越快 → 购物车转化率越高 & Prime 退订率越低 → 摊薄单件固定折旧 → 进一步反哺更低售价',
 kpis: [['1,000,000+', '全球履约中心在役机器人规模'], ['1.5B+ 件', 'Q3 2026 单季当日/次日达包裹量'], ['$49.6B', 'FY2025 订阅服务净营收 (Q3 $14.0B)'], ['450+ 城', 'Amazon Now 超快闪送全球覆盖']]
 },
 {
 badge: 'NODE 03 · 3P MARKETPLACE & FBA INFRASTRUCTURE TAX',
 title: '第三方卖家服务（FY25 $1,721.6亿）：零存货跌价风险的全球第二大业务板块',
 desc: '亚马逊向数百万独立商家开放流量入口与 FBA（Fulfillment by Amazon）仓储干线配送网络。独立卖家在 Q3 2026 占全球付费售出件数的 61%，由于使用 FBA 才能获得高转化的 Prime 免邮徽章与 Buy Box 权重，商家心甘情愿将履约外包给亚马逊，使 3P 服务年营收超越 AWS 跃居集团第二大收入源。',
 formula: '商业传导：61% 第三方件数占比 × (销售佣金 + FBA仓储配送费) = $1,721.6亿 轻存货服务营收（Q3\'26 单季 $464.9亿）',
 kpis: [['$172.2B', 'FY2025 第三方卖家服务净营收'], ['61%', 'Q3 2026 第三方卖家付费件数占比'], ['>4.6B 件', '2025 美国独立卖家年售出商品数'], ['零存货减值', '第三方商品货权与滞销风险归属商家']]
 },
 {
 badge: 'NODE 04 · CLOSED-LOOP RETAIL MEDIA & PRIME VIDEO ADS',
 title: '广告收费站（TTM $780.1亿）：躺在万亿级真实收银台旁收“注意力过路费”',
 desc: '不同于社交媒体依赖模糊兴趣画像，亚马逊掌握“搜索词 → 加购 → 真实付款 → 复购周期”全闭环万亿级信号。2026 年推出的 Amazon Ads Agent 打通搜索赞助广告、展示广告与 Prime Video（NFL 周四夜赛场均 1,770万观众、NBA 全球转播）流媒体电视广告，成为驱动北美零售营业利润同比飙升 +82% 的核心利润池。',
 formula: '商业传导：闭环高转化率吸引品牌预算迁移 → TTM 广告营收达 $780.1亿（FY25 +22.1%） → 极高边际利润直接增厚零售 EBIT',
 kpis: [['$78.0B', 'TTM Q3 2026 广告服务累计营收'], ['+22.1%', 'FY2025 广告业务同比高速增长'], ['17.7M 观众', '2026 NFL 周四夜赛前6场场均收视'], ['8.2% TTM', '广告助推北美分部 TTM 营业利润率扩张']]
 },
 {
 badge: 'NODE 05 · AWS CLOUD, AGENTCORE & ANNAPURNA SILICON',
 title: 'AWS 与自研芯片帝国：重资本筑墙、收获 38.7% 营业利润率的数字电网',
 desc: 'AWS 在 Q3 2026 实现近五年最猛烈的 +39.3% 同比增长，单季营收达 $459.8亿（年化运行率 $1,840亿），单季营业利润高达 $177.7亿。底层胜负手在于全栈掌控：自研 Graviton5 CPU（Top 1000 客户 98% 采用）与 Trainium2/3 AI 芯片年化运行率已突破 $200亿（独立外售等价规模 ~$500亿），配合 Bedrock 与 AgentCore 承接全球企业级 Agent 爆发。',
 formula: '商业传导：自研 Trainium 省 30%–40% 推理成本 + 企业核心数据重力锁死 → TTM AWS 营业利润达 $610.2亿',
 kpis: [['$45.98B', 'Q3 2026 AWS 单季净营收 (+39.3%)'], ['38.7%', 'Q3 2026 AWS 分部营业利润率'], ['>$20B', 'Trainium+Graviton+Nitro 年化运行率'], ['~17x', 'Q3 2026 Bedrock Token 处理量同比倍增']]
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

 // 3. Tier Filter, Cohort Switcher & Peer Filter
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
 casual: {
 stats: [
 ['核心绑定触点', '免邮凑单低频比价客', '受运费门槛制约转化率较低'],
 ['次年续费留存率', '~52% 活跃复购', '易受其他促销电商分流'],
 ['年均平台消费 GMV', '~$550 / 年', '集中于大促与长尾标品购买'],
 ['5年单户综合经济贡献', '~$490', '仅贡献基础 3P 佣金与少量点击广告']
 ],
 note: '<strong>非会员漏斗层特征：</strong>非 Prime 顾客结账时面临免邮凑单门槛与较长配送预期，购物车放弃率显著高于会员；亚马逊通过结账页一键免费试用 Prime 与免费 Alexa+ 体验持续将其转化为年费会员。'
 },
 prime: {
 stats: [
 ['核心绑定触点', 'Prime 免邮 + Video + Alexa+', '年均替每位北美会员省 >$1,000'],
 ['次年续费留存率', '~93%–98%', '满两年会员留存逼近公用事业极值'],
 ['年均平台消费 GMV', '~$1,400+ / 年', '约为非 Prime 消费者的 2.5–3 倍'],
 ['5年单户综合经济贡献', '~$2,150', '年费 + 3P佣金分摊 + 高毛利广告变现']
 ],
 note: '<strong>履约速度棘轮效应（Speed & Frequency Ratchet）：</strong>安迪·贾西在 2025 致股东信披露，当配送承诺从隔日达压缩至<strong>当日达（85+ 座 SSD 中心）乃至 20 分钟闪送（Amazon Now）</strong>时，会员下单频率直接<strong>激增至原来的 3 倍</strong>；同时当日达生鲜易腐品销量暴增 40 倍以上。'
 },
 omni: {
 stats: [
 ['核心绑定触点', '当日达生鲜 + 20分钟闪送 + 3小时送药', '接管家庭冰箱、药箱与智能家居'],
 ['次年续费留存率', '> 98.5%', '全家庭日常生活动线深度锁死'],
 ['年均平台消费 GMV', '~$3,800+ / 年', '高频刚需消费反哺全品类连带购买'],
 ['5年单户综合经济贡献', '~$5,180+', '高频广告曝光 + 订阅 + 极低单票配送分摊']
 ],
 note: '<strong>全场景超级家庭层：</strong>当家庭同时使用当日达生鲜（覆盖 2,300+ 城）、Amazon Pharmacy 处方药 3 小时达（覆盖 350+ 城，复购客增 >50%）与 Alexa for Shopping 语音复购时，亚马逊便从“可选网购平台”升级为不可替代的“家庭生活水电煤”。'
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
 var c = COHORTS[key] || COHORTS.prime;
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
 { lbl: state.lang === 'en' ? 'Product Sales' : '自营商品营收', val: 296.3, base: 0, col: pal.blue, tip: 'FY2025 净商品销售额: $296.27B (占总营收 41.3%)' },
 { lbl: state.lang === 'en' ? '+Service Sales' : '+服务总营收', val: 420.7, base: 296.3, col: pal.green, tip: 'FY2025 净服务销售额: +$420.66B (3P $172.2B + AWS $128.7B + 广告 $68.6B + 订阅 $49.6B)，推升总营收至 $716.92B' },
 { lbl: state.lang === 'en' ? '=Gross Profit' : '=综合毛利额', val: 360.5, base: 0, col: pal.violet, tip: 'FY2025 综合毛利: $360.51B (综合毛利率突破 50.3%；Q3 2026 进一步升至 53.2%)' },
 { lbl: state.lang === 'en' ? 'Op Income' : '营业利润', val: 80.0, base: 0, col: pal.blue, tip: 'FY2025 营业利润: $79.98B (11.2% 利润率；TTM Q3 2026 已突破 $104.37B，Q3 单季利润率达 13.9%)' },
 { lbl: state.lang === 'en' ? 'GAAP Net' : 'GAAP净利', val: 77.7, base: 0, col: pal.amber, tip: 'FY2025 GAAP 净利润: $77.67B ($7.17 摊薄 EPS)' },
 { lbl: state.lang === 'en' ? 'Op Cash Flow' : '经营现金流', val: 139.5, base: 0, col: pal.green, tip: 'FY2025 经营现金流: $139.51B (+20% YoY；TTM Q3 2026 已达 $168.30B)' }
 ];
 var maxV = 780;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length;
 var barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6);
 ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', "Q3'26"];
 var gmTot = [42.0, 43.8, 47.0, 48.9, 50.3, 53.2];
 var opAws = [29.8, 28.5, 27.1, 37.0, 35.4, 38.7];
 var opTot = [5.3, 2.4, 6.4, 10.8, 11.2, 13.9];
 var minM = 0, maxM = 60;
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
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === yrs.length - 1 || idx === 0) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 }
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotLine(gmTot, pal.violet, '集团综合毛利率 Consolidated GM');
 plotLine(opAws, pal.green, 'AWS 分部营业利润率 AWS OpM');
 plotLine(opTot, pal.blue, '集团整体营业利润率 Consolidated OpM');
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
 var segs = [
 { name: state.lang === 'en' ? 'North America' : '北美分部 (NA)', rev: 55.9, prof: 31.1, col: pal.blue, tip: 'Q3 2026 北美营收 $112.85B (55.9%) vs 营业利润 $8.72B (31.1%，同比暴增 +82%)' },
 { name: state.lang === 'en' ? 'International' : '国际分部 (Intl)', rev: 21.3, prof: 5.6, col: pal.amber, tip: 'Q3 2026 国际营收 $43.11B (21.3%) vs 营业利润 $1.58B (5.6%，同比增长 +32%)' },
 { name: 'AWS Cloud & AI', rev: 22.8, prof: 63.3, col: pal.green, tip: 'Q3 2026 AWS 营收 $45.98B (22.8%) vs 营业利润 $17.77B (高达全集团 63.3%！)' }
 ];
 var slot = pw / segs.length;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 20;
 var ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 segs.forEach(function (v, idx) {
 var cx = pad.left + idx * slot + slot / 2;
 var bw = 34;
 var uh = (v.rev / 80) * ph, prh = (v.prof / 80) * ph;
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 4, pad.top + ph - uh, bw, uh, 5); ctx.fill();
 ctx.fillStyle = v.col;
 roundRect(ctx, cx + 4, pad.top + ph - prh, bw, prh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.rev.toFixed(1) + '%', cx - bw / 2 - 4, pad.top + ph - uh - 6);
 ctx.fillText(v.prof.toFixed(1) + '%', cx + bw / 2 + 4, pad.top + ph - prh - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: v.name, body: v.tip });
 });
 } else {
 var xLbls = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
 var casual = [105, 195, 290, 390, 490];
 var prime = [390, 795, 1225, 1680, 2150];
 var omni = [890, 1860, 2910, 4020, 5180];
 var maxL = 5600;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0), pad.left - 8, gy + 4);
 }
 function drawCurve(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 var py = pad.top + ph - (v / maxL) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 var py = pad.top + ph - (v / maxL) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + v, px - 6, py - 8);
 }
 hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '5年累计平台贡献预估: $' + v });
 });
 }
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 drawCurve(omni, pal.violet, '生鲜+闪送+医药全场景户');
 drawCurve(prime, pal.blue, '标准 Prime 会员家庭');
 drawCurve(casual, pal.amber, '非会员低频比价客');
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'ocf') {
 var qtrs = ["Q4'24", "Q2'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var ocf = [115.9, 121.1, 139.5, 148.5, 161.4, 168.3];
 var capex = [77.7, 103.0, 128.3, 147.3, 169.0, 210.7];
 var maxC = 230;
 for (var g = 0; g <= 4; g++) {
 var sv = (maxC / 4) * g;
 var sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + sv.toFixed(0) + 'B', pad.left - 8, sy + 4);
 }
 var slot = pw / qtrs.length, bw = Math.min(24, slot * 0.34);
 qtrs.forEach(function (q, i) {
 var cx = pad.left + i * slot + slot / 2;
 var hO = (ocf[i] / maxC) * ph, hK = (capex[i] / maxC) * ph;
 ctx.fillStyle = pal.green;
 roundRect(ctx, cx - bw - 2, pad.top + ph - hO, bw, hO, 4); ctx.fill();
 ctx.fillStyle = pal.amber;
 roundRect(ctx, cx + 2, pad.top + ph - hK, bw, hK, 4); ctx.fill();
 if (i === 0 || i === 2 || i === 5) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + ocf[i].toFixed(0) + 'B', cx - bw / 2 - 2, pad.top + ph - hO - 5);
 ctx.fillText('$' + capex[i].toFixed(0) + 'B', cx + bw / 2 + 2, pad.top + ph - hK - 5);
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(q, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({
 x: cx - bw - 4, y: pad.top, w: bw * 2 + 8, h: ph,
 title: q + ' 滚动12个月现金流与基建投入',
 body: 'TTM 经营现金流 $' + ocf[i].toFixed(1) + 'B vs 净资本开支 $' + capex[i].toFixed(1) + 'B → TTM FCF ' + (ocf[i] - capex[i] >= 0 ? '+$' : '-$') + Math.abs(ocf[i] - capex[i]).toFixed(1) + 'B'
 });
 });
 } else {
 var items = [
 { name: 'Apple (AAPL)', ccc: -58, col: pal.blue, tip: 'DIO ~9天 + DSO ~28天 - DPO ~95天 = -58天' },
 { name: 'Amazon (AMZN)', ccc: -43, col: pal.green, tip: 'FY25 DIO ~37天 + 综合DSO ~31天 - DPO ~111天 ≈ -43天（Q3\'26 应付账款 $1,587亿达存货 3.7 倍）' },
 { name: 'Costco (COST)', ccc: -4, col: pal.violet, tip: '高周转会员仓储零售，先收现款再结货款' },
 { name: 'Walmart (WMT)', ccc: 3, col: pal.amber, tip: '全美门店高频杂货周转，账期接近平衡 (+3天)' }
 ];
 var zeroX = pad.left + pw * 0.72;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(zeroX, pad.top); ctx.lineTo(zeroX, pad.top + ph); ctx.stroke();
 var rowH = ph / items.length;
 items.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22;
 var scale = (pw * 0.58) / 65;
 var barLen = Math.max(6, Math.abs(it.ccc) * scale);
 var bx = it.ccc < 0 ? (zeroX - barLen) : zeroX;
 ctx.fillStyle = it.col;
 roundRect(ctx, bx, cy - bh / 2, barLen, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
 ctx.textAlign = it.ccc < 0 ? 'right' : 'left';
 ctx.fillText((it.ccc > 0 ? '+' : '') + it.ccc + 'd', it.ccc < 0 ? bx - 6 : bx + barLen + 6, cy + 4);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.name, pad.left, cy - 15);
 hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 20, w: pw, h: 40, title: it.name + ' 现金转换周期', body: it.tip });
 });
 }
 }

 // 5. Interactive 5-Year Operating Income & FCF Simulator
 var simData = { op: [80.0, 112, 142, 175, 212, 254] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY25', '26E', '27E', '28E', '29E', '30E'];
 var arr = simData.op;
 var maxE = Math.max(220, Math.ceil(Math.max.apply(null, arr) * 1.15));
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
 ctx.fillText('$' + Math.round(v) + 'B', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gAws = parseFloat(document.getElementById('inpAwsCagr').value) / 100;
 var gRet = parseFloat(document.getElementById('inpRetCagr').value) / 100;
 var capRatio = parseFloat(document.getElementById('inpCapRatio').value) / 100;
 document.getElementById('lblAwsCagr').textContent = (gAws * 100).toFixed(1) + '%';
 document.getElementById('lblRetCagr').textContent = (gRet * 100).toFixed(1) + '%';
 document.getElementById('lblCapRatio').textContent = (capRatio * 100).toFixed(1) + '%';

 var awsRev = 128.73, retRev = 588.20;
 var opArr = [80.0];
 for (var y = 1; y <= 5; y++) {
 awsRev *= (1 + gAws);
 retRev *= (1 + gRet);
 var awsOp = awsRev * 0.375;
 var retMargin = 0.058 + 0.005 * y;
 var totOp = awsOp + retRev * retMargin;
 opArr.push(totOp);
 }
 var rev30 = awsRev + retRev;
 var op30 = opArr[5];
 var opm30 = (op30 / rev30) * 100;
 var estOcf30 = op30 * 1.29;
 var estFcf30 = estOcf30 - rev30 * capRatio;

 document.getElementById('simRevOut').textContent = '$' + Math.round(rev30) + 'B';
 document.getElementById('simOpOut').textContent = '$' + Math.round(op30) + 'B';
 document.getElementById('simOpmOut').textContent = opm30.toFixed(1) + '%';
 document.getElementById('simFcfOut').textContent = (estFcf30 >= 0 ? '$' : '-$') + Math.abs(Math.round(estFcf30)) + 'B';
 simData.op = opArr;
 drawSimMiniCanvas();
 }

 ['inpAwsCagr', 'inpRetCagr', 'inpCapRatio'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { a: 20, r: 6.5, c: 18.0 },
 base: { a: 28, r: 9.5, c: 14.0 },
 bull: { a: 34, r: 12.0, c: 11.5 }
 };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpAwsCagr').value = pr.a;
 document.getElementById('inpRetCagr').value = pr.r;
 document.getElementById('inpCapRatio').value = pr.c;
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
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 drawFn();
 });
 }
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 function bindHoverTooltip(canvasId) {
 var c = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect();
 var mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var list = hitRegions[canvasId] || [];
 var hit = null;
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
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'TTM $797.5B 营收 · Q3 13.9% 营业利润率 · 成本中心外溢公式' },
 { id: 'mod-pipeline', t: 'M1 五阶商业飞轮传导沙盘', s: '低价自营 → 百万机器人当日达 → 61%第三方卖家 → $78B广告 → AWS' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四大服务收费站', s: '服务占 Q3 营收 62.7% · 毛利率跃升至 53.2%' },
 { id: 'mod-cohort', t: 'M3 Prime 履约棘轮与分部利润剪刀差', s: 'AWS 占 22.8% 营收贡献 63.3% 营业利润 · 生鲜闪送频次翻3倍' },
 { id: 'mod-capital', t: 'M4 -43天负营运资本与 $2,200亿基建周期', s: '应付账款达存货 3.7 倍 · 2026–2030 营业利润与 FCF 推演' },
 { id: 'mod-matrix', t: 'M5 六大巨头商业范式对标与三大压测', s: 'AMZN vs AAPL / MSFT / GOOGL / WMT / COST' }
 ];
 var qInput = document.getElementById('quickJumpInput');
 var qPop = document.getElementById('quickJumpPopover');
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

 // Suite Hub Filter & Navigation (No auto-scroll bug, no broken local hrefs)
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
 var item = e.target.closest('.co-hub-item');
 if (item) {
 var jump = item.getAttribute('data-suite-jump');
 var docName = item.getAttribute('data-suite-Doc');
 if (jump) {
 var sec = document.querySelector(jump);
 if (sec) sec.scrollIntoView({ behavior: 'smooth' });
 } else if (docName) {
 showToast('请在配套四页式套件中打开《' + docName + '》');
 }
 }
 });
 }

 document.getElementById('crumbTopBtn').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
 

 // Sidebar Toggle & Drawer
 var sbBtn = document.getElementById('sidebarToggleBtn');
 var sb = document.getElementById('muiSidebar');
 var bd = document.getElementById('drawerBackdrop');
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

 // Scroll Progress & Active TOC
 var tocLinks = document.querySelectorAll('#tocList .mui-nav-link');
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var docH = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
 }
 }, { passive: true });
 if ('IntersectionObserver' in window) {
 var obs = new IntersectionObserver(function (entries) {
 entries.forEach(function (en) {
 if (en.isIntersecting) {
 var id = '#' + en.target.id;
 tocLinks.forEach(function (lk) { lk.classList.toggle('active', lk.getAttribute('href') === id); });
 }
 });
 }, { rootMargin: '-20% 0px -65% 0px' });
 ['mod-deck', 'mod-pipeline', 'mod-profit-pool', 'mod-cohort', 'mod-capital', 'mod-matrix'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) obs.observe(el);
 });
 }

 // Stress Checkboxes
 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk');
 chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () {
 savedChk[k] = chk.checked;
 try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
 showToast(chk.checked ? '已加入季度重点跟踪清单' : '已取消跟踪标记');
 });
 });
 } catch (e) {}

 // Export, Print, Theme & Lang Bindings
 
 
 
 
 

 try {
 var initT = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
 applyTheme(initT, true);
 var initL = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
 applyLang(initL, true);
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
 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
 if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
 });

 var resizeTimer = null;
 window.addEventListener('resize', function () {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(drawAllCharts, 80);
 });

 runSimulator();
 drawAllCharts();
 })();
 