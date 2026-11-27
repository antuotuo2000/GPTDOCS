
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'meituan_bm_stress_v1';

 var TITLE_ZH = '美团 Meituan (03690.HK) 商业模式架构深度拆解 | 数据中心';
 var TITLE_EN = 'Meituan (03690.HK) Business Model Architecture Deep Dive | Research Hub';

 var state = {
 theme: 'light',
 lang: 'zh',
 activeLens: 0,
 activeNode: 0,
 activeCohort: 'core',
 pView: 'waterfall',
 cView: 'ltv',
 kView: 'shares',
 profitSeries: { rev: true, clc: true, net: true },
 cohortSeries: { ultra: true, core: true, solo: true },
 hover: { profitCanvas: -1, cohortCanvas: -1, capitalCanvas: -1, simMiniCanvas: -1 }
 };

 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [], simMiniCanvas: [] };

 function isEn() { return state.lang === 'en'; }

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg;
 bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }

 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark,
 text: dark ? '#F3F6F9' : '#0F1924',
 sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569',
 grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
 hoverBand: dark ? 'rgba(51, 153, 255, 0.09)' : 'rgba(0, 115, 230, 0.06)',
 pillBg: dark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
 pillBorder: dark ? 'rgba(51, 153, 255, 0.34)' : 'rgba(0, 115, 230, 0.25)',
 blue: dark ? '#3399FF' : '#0073E6',
 blueSoft: dark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.18)',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED',
 red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 m0_lead: {
 zh: '市场常在补贴战期间误将美团视作“赚辛苦钱的送餐苦力”，但其底层经济模型实为一套<strong>三层金字塔飞轮</strong>：第一层（高频流量底座）以峰值超 <strong>9,000 万单/日</strong>的餐饮外卖与超 <strong>1,000 万单/日</strong>的美团闪购织就覆盖全国 2,800+ 县区的即时配送网，锁定 <strong>7.7 亿年度交易用户</strong>与 <strong>1,450 万活跃商户</strong> <a class="cite-link" href="https://nazymaltbridge.substack.com/p/meituan-the-company-that-wins-wars" target="_blank" rel="noopener noreferrer">Altbridge 深度拆解 ↗</a>；第二层（高毛利变现层）以接近零边际获客成本将外卖高频流量导流至<strong>到店、酒店及旅游业务（毛利率约 87%）</strong>与线上营销广告，在常态年份（FY2024）支撑核心本地商业斩获 <strong>¥524亿 营业利润</strong>；第三层（跨周期扩张与战投期权）依托 <strong>¥1,683亿 现金及短期理财储备</strong>顶住 2025 年行业百亿级补贴内卷后，于 <strong>2026 年 Q2 迅速扭亏实现 ¥22亿 净利润（营收 ¥1,046.4亿，+14.4% YoY）</strong> <a class="cite-link" href="https://quartr.com/companies/meituan_14642" target="_blank" rel="noopener noreferrer">Q2 2026 业绩摘要 ↗</a>，同时旗下 <strong>Keeta</strong> 在香港与沙特实现盈利，并手握估值逾 <strong>¥773亿</strong> 的硬科技与大模型股权组合。',
 en: 'During subsidy wars, markets often mislabel Meituan as a low-margin courier operator, yet its engine is a <strong>three-tier compounding pyramid</strong>: Tier 1 (Traffic Grid) processes <strong>90M+ peak daily food orders</strong> and <strong>10M+ Instashop orders/day</strong> across 2,800+ counties, locking in <strong>770M annual users</strong> and <strong>14.5M active merchants</strong> <a class="cite-link" href="https://nazymaltbridge.substack.com/p/meituan-the-company-that-wins-wars" target="_blank" rel="noopener noreferrer">Altbridge Analysis ↗</a>; Tier 2 (Monetization Layer) cross-sells traffic at near-zero CAC into <strong>In-Store, Hotel &amp; Travel (~87% GM)</strong> and merchant ads, yielding <strong>¥52.4B CLC operating profit in FY24</strong>; Tier 3 (Resilience &amp; Optionality) leverages <strong>¥168.3B in cash</strong> to outlast 2025\'s subsidy war, swinging back to <strong>¥2.2B Q2 2026 net profit (¥104.64B rev, +14.4% YoY)</strong> <a class="cite-link" href="https://quartr.com/companies/meituan_14642" target="_blank" rel="noopener noreferrer">Q2 2026 Summary ↗</a> while <strong>Keeta</strong> turns profitable in HK &amp; Saudi alongside a <strong>¥77.3B</strong> hard-tech equity portfolio.'
 },
 m2_caption: {
 zh: '数据来源：<a class="cite-link" href="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0424/2026042400179.pdf" target="_blank" rel="noopener noreferrer">美团 2025 年报 ↗</a> 与 <a class="cite-link" href="https://finance.biggo.com/news/9ebdaaa8-d39e-4e84-b4ce-c1853a837251" target="_blank" rel="noopener noreferrer">Q2 2026 财报解析 ↗</a>。2025 年外卖补贴战曾导致核心本地商业由 FY24 盈利 ¥524亿 骤降至亏损 -¥69亿；随着理性回归与履约提效，<strong>Q2 2026 核心本地商业单季迅速恢复 ¥57亿 营业利润（7.9% 利润率）</strong>，新业务亏损率收窄至 -5.3%。',
 en: 'Sources: <a class="cite-link" href="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0424/2026042400179.pdf" target="_blank" rel="noopener noreferrer">2025 Annual Report ↗</a> &amp; <a class="cite-link" href="https://finance.biggo.com/news/9ebdaaa8-d39e-4e84-b4ce-c1853a837251" target="_blank" rel="noopener noreferrer">Q2 2026 Review ↗</a>. After 2025\'s subsidy war swung CLC from +¥52.4B (FY24) to -¥6.9B, <strong>Q2 2026 CLC rebounded to ¥5.7B operating profit (7.9% margin)</strong> while New Initiatives loss narrowed to -5.3%.'
 },
 m3_caption: {
 zh: '竞争压力测试验证：<a class="cite-link" href="https://nazymaltbridge.substack.com/p/meituan-the-company-that-wins-wars" target="_blank" rel="noopener noreferrer">2025 补贴战复盘 ↗</a> 显示，即便竞争对手在“1元咖啡”等低客单补贴上烧掉数百亿元，美团依然死守 <strong>60%+ 整体 GTV 份额</strong>，并在 <strong>客单价 &gt;¥30 的真实盈利订单中保持 70%+ 统治力</strong>。',
 en: 'Battle-Tested Moat: <a class="cite-link" href="https://nazymaltbridge.substack.com/p/meituan-the-company-that-wins-wars" target="_blank" rel="noopener noreferrer">2025 War Post-Mortem ↗</a> shows that even as rivals burned tens of billions on 1-yuan coffee subsidies, Meituan defended <strong>60%+ overall GTV share</strong> and <strong>70%+ share of orders above ¥30</strong>.'
 },
 m4_caption: {
 zh: '隐形资产重估：截至 2026 Q2，美团手握 <strong>¥1,047亿现金 + ¥636亿短期理财（合计 ¥1,683亿）</strong>，此外龙珠资本与战投部过去 8 年布局大模型、具身智能与智驾等 40+ 家硬科技企业（28 家独角兽），投资组合公允价值高达 <strong>¥773亿</strong>（含智谱 AI ~3.86%–4.27%、宇树科技 9.65%、理想汽车 12.73%、月之暗面及禾赛科技） <a class="cite-link" href="https://www.moomoo.com/community/feed/a-guide-to-meituan-down-86-is-it-still-expensive-116876842238358" target="_blank" rel="noopener noreferrer">硬科技持仓盘点 ↗</a>。',
 en: 'Hidden Balance Sheet Power: As of Q2 2026, Meituan holds <strong>¥104.7B cash + ¥63.6B short-term treasury investments (¥168.3B total)</strong>, plus a <strong>¥77.3B investment portfolio</strong> across 40+ hard-tech firms (28 unicorns, incl. Zhipu AI, Unitree 9.65%, Li Auto 12.73%, Moonshot AI &amp; Hesai) <a class="cite-link" href="https://www.moomoo.com/community/feed/a-guide-to-meituan-down-86-is-it-still-expensive-116876842238358" target="_blank" rel="noopener noreferrer">Portfolio Breakdown ↗</a>.'
 },
 s1_body: {
 zh: '2025 年阿里（淘宝闪购）与京东外卖发起百亿级补贴攻势，三方合计烧钱约 ¥800亿–¥1,000亿，导致美团 2025 全年净亏损 ¥234亿。但 2026 Q2 美团已迅速扭亏（净利 ¥22亿），花旗预计 Q3 2026 外卖营业利润率仍仅 ~1.1%（约 ¥0.08/单），恢复至历史 ¥1.2–¥1.4/单稳态仍需 3–4 个季度观察 <a class="cite-link" href="https://news.futunn.com/en/post/1005555783/one-chart-preview-meituan-s-q3-earnings-report-due-friday" target="_blank" rel="noopener noreferrer">Q3 2026 前瞻 ↗</a>。',
 en: 'In 2025, Alibaba and JD burned an estimated ¥80B–¥100B combined in delivery subsidies, pushing Meituan to a ¥23.4B net loss. While Q2 2026 returned to ¥2.2B profit, Citi estimates Q3 2026 delivery margin at just ~1.1% (¥0.08/order), needing 3–4 quarters to normalize toward ¥1.2–¥1.4/order <a class="cite-link" href="https://news.futunn.com/en/post/1005555783/one-chart-preview-meituan-s-q3-earnings-report-due-friday" target="_blank" rel="noopener noreferrer">Q3 Preview ↗</a>.'
 },
 s3_body: {
 zh: '为守住即时零售货盘，美团于 2026 年 2 月斥资 <strong>$7.17亿 收购叮咚买菜</strong> 并把小象超市扩至 68 城及尝试线下大店 <a class="cite-link" href="https://vino-joy.com/2026/02/23/chinas-instant-retail-giant-meituan-buys-dingdong-fresh-for-717-million/" target="_blank" rel="noopener noreferrer">叮咚收购公告 ↗</a>。相比轻资产抽成平台，生鲜自营仓折旧与损耗要求更严格的库存周转与自有品牌（Private Label）毛利爬坡。',
 en: 'To secure grocery supply chains, Meituan bought <strong>Dingdong Fresh for $717M in Feb 2026</strong> and expanded Xiaoxiang to 68 cities <a class="cite-link" href="https://vino-joy.com/2026/02/23/chinas-instant-retail-giant-meituan-buys-dingdong-fresh-for-717-million/" target="_blank" rel="noopener noreferrer">Dingdong Deal ↗</a>. Self-operated warehousing requires tight inventory turn and private-label margin expansion.'
 }
 };

 var LENSES = [
 {
 formulaZh: '平台真实盈利 = 外卖高频低毛利获客 (UE ¥1.2/单) + 零CAC交叉导流 × [到店酒旅 (~87% GM) + 商户竞价广告 (~90% GM)]',
 formulaEn: 'True Platform Profit = High-Freq Delivery Funnel (UE ¥1.2/order) + $0 CAC Cross-Sell × [In-Store/Hotel (~87% GM) + Ads (~90% GM)]',
 bodyZh: '孤立看外卖配送，美团只赚微薄的“单均一块钱”履约调度费；但正是这日均数千万次的刚需打开动作，让美团以<strong>近乎为零的获客成本</strong>向 7.7 亿用户分发到店团购、酒店预订与医美门票，这才是美团常态年份利润率远超海外纯外卖平台（DoorDash）的根本秘密。',
 bodyEn: 'Viewed in isolation, food delivery earns ~¥1/order; yet those tens of millions of daily app opens feed 770M users at <strong>near-zero CAC</strong> into In-Store dining, hotels, and leisure (~87% GM)—explaining why Meituan structurally out-earns pure-play peers like DoorDash.'
 },
 {
 formulaZh: '单均配送成本 ↓ = 实时超脑调度算法 × (餐饮外卖午晚高峰 + 美团闪购全时段非餐订单 + 无人机/无人车夜间补位)',
 formulaEn: 'Unit Delivery Cost ↓ = Super-Brain AI Dispatch × (Meal Peaks + Off-Peak Instashop Non-Food + Drones/AVs)',
 bodyZh: '骑手履约网络的固定运力如果只送一日三餐，下午茶与夜间时段存在大量闲置。美团将<strong>美团闪购（日均超千万单非餐即时零售）</strong>叠加到同一批骑手背篓中，直接摊薄了全网单均履约成本，形成“单量越密→派单越顺→成本越低→价格越有竞争力”的不可逆规模飞轮。',
 bodyEn: 'A courier grid serving only lunch and dinner sits idle off-peak. Layering <strong>Meituan Instashop (10M+ daily non-food orders)</strong> onto the exact same rider fleet boosts order density, lowers per-order delivery cost, and reinforces a self-compounding scale moat.'
 },
 {
 formulaZh: '抗周期资本底盘 = 负营运资本上游浮存金 + ¥1,683亿现金储备 + ¥773亿硬科技股权池（大模型/具身智能/智驾）',
 formulaEn: 'Anti-Cycle Capital = Negative Working Capital Float + ¥168.3B Cash War Chest + ¥77.3B Hard-Tech Equity Portfolio',
 bodyZh: '消费者下单即刻支付现金，美团按周期结算给商户与骑手，天然形成负营运资本现金浮存；叠加 ¥1,683 亿巨额现金储备与早期重仓智谱 AI、宇树科技、理想汽车、月之暗面带来的逾 ¥650 亿未实现增值，美团拥有全行业最厚的“打持久战”资产负债表。',
 bodyEn: 'Upfront consumer payments paired with periodic merchant settlement create negative working capital float. Combined with ¥168.3B cash and ¥65B+ unrealized gains across Zhipu AI, Unitree, Li Auto, and Moonshot, Meituan holds an unmatched balance sheet for attrition wars.'
 }
 ];

 function renderLens(idx) {
 state.activeLens = idx;
 var l = LENSES[idx] || LENSES[0];
 var en = isEn();
 document.getElementById('lensFormula').textContent = en ? l.formulaEn : l.formulaZh;
 document.getElementById('lensBody').innerHTML = en ? l.bodyEn : l.bodyZh;
 }

 var NODES = [
 {
 badge: 'NODE 01 · SUPER-BRAIN ON-DEMAND DISPATCH GRID',
 titleZh: '超脑即时配送网络：覆盖 2,800+ 县区的物理世界实时调度中枢',
 titleEn: 'Super-Brain Dispatch Grid: Real-Time Fulfillment Across 2,800+ Counties',
 descZh: '美团自研“超脑”实时配送系统每天调度数百万骑手在城市毛细血管中完成千万级路径规划（平均 30 分钟送达）。即便在 2025 年外卖补贴大战中，美团依然维持 60%+ 整体 GTV 份额与 70%+ 高客单（&gt;¥30）订单占比，证明补贴可以买来短期“1元咖啡”流量，却买不走复杂高峰期履约确定性。',
 descEn: 'Meituan\'s Super-Brain algorithm routes millions of riders across 2,800+ counties for ~30-minute delivery. Even during 2025\'s fierce subsidy war, Meituan held 60%+ overall GTV and 70%+ of orders &gt;¥30—proving subsidies cannot replicate peak-hour fulfillment reliability.',
 formulaZh: '商业传导：高密度订单池 → 骑手单均配送成本行业最低 → 30分钟极速体验锁定高端用户留存',
 formulaEn: 'Value Flow: Dense order pool → lowest per-order rider cost → 30-min reliability locks in high-AOV users',
 kpisZh: [['9,000万+', '餐饮外卖峰值日单量'], ['60%+ / 70%+', '整体 GTV 份额 / &gt;¥30订单占比'], ['2,800+县区', '全国无缝履约覆盖密度'], ['~¥1.2–1.4', '常态年份单均外卖营业利润']],
 kpisEn: [['90M+', 'Peak Daily Food Orders'], ['60%+ / 70%+', 'GTV Share / &gt;¥30 Order Share'], ['2,800+ Counties', 'Nationwide Dispatch Density'], ['~¥1.2–1.4', 'Normalized Delivery UE/Order']]
 },
 {
 badge: 'NODE 02 · HIGH-TO-LOW FREQUENCY CROSS-SELL FUNNEL',
 titleZh: '高频带低频：用每天都要点的外卖，免费养活低频高利润的到店与酒旅',
 titleEn: 'High-to-Low Funnel: Daily Delivery Feeds Low-Freq High-Margin In-Store &amp; Travel',
 descZh: '传统 OTA（携程）或垂类团购平台必须不断在外部渠道购买昂贵流量以唤醒低频消费，而美团凭借高频外卖带来的天然日活（7.7亿年交易用户），直接在 App 首页、神会员通兑体系及“小团”AI 助手中完成向餐厅堂食、KTV/医美与酒店预订的低成本交叉转化。',
 descEn: 'Pure-play OTAs must repeatedly buy expensive external traffic for infrequent trips; Meituan leverages daily delivery opens from 770M annual users to cross-sell dine-in vouchers, leisure, and hotels inside one app at near-zero marginal CAC.',
 formulaZh: '商业传导：外卖高频唤醒 App → “神会员”跨场景通兑券 → 零外部买量费转化高毛利到店/酒旅交易',
 formulaEn: 'Value Flow: Daily delivery opens → Shenhuiyuan cross-category vouchers → $0 external CAC conversion into In-Store/Hotel',
 kpisZh: [['7.7亿', '年度活跃交易用户规模'], ['1,450万', '平台活跃本地生活商户'], ['近 ¥0', '到店业务边际流量获取成本'], ['双栖协同', '跨品类消费频次倍增']],
 kpisEn: [['770M', 'Annual Transacting Users'], ['14.5M', 'Active Local Merchants'], ['~$0', 'Marginal CAC for In-Store Cross-Sell'], ['2x+ Freq', 'Multi-Category User Engagement']]
 },
 {
 badge: 'NODE 03 · 87% GROSS MARGIN MONETIZATION ENGINE',
 titleZh: '到店酒旅与竞价广告：撑起集团核心利润池的“印钞层”',
 titleEn: 'In-Store, Hotel &amp; Ads: The ~87% Gross Margin Monetization Engine',
 descZh: '到店餐饮、休闲娱乐、医美及酒店间夜预订几乎不产生重资产物流与骑手履约成本，毛利率高达约 87%；叠加面向 1,450 万商户的线上营销竞价广告（FY24 年入 ¥492.4亿），共同构成美团在 FY2024 斩获 ¥524亿 核心本地商业营业利润的压舱石。',
 descEn: 'Dine-in vouchers, local services, and hotel bookings incur virtually no courier cost, generating ~87% gross margin. Paired with ¥49.24B in high-margin merchant ads (FY24), this layer anchored ¥52.4B in FY24 CLC operating profit.',
 formulaZh: '商业传导：商户线上曝光竞争 → 竞价广告费 (~90% GM) + 到店佣金 (~87% GM) → 对冲外卖微利并补贴新业务',
 formulaEn: 'Value Flow: Merchant competition → CPC Ads (~90% GM) + In-Store Commissions (~87% GM) → funds New Initiatives',
 kpisZh: [['~87%', '到店及酒旅业务综合毛利率'], ['¥492.4亿', 'FY24 线上营销广告净收入'], ['¥524亿', 'FY24 核心本地商业营业利润'], ['¥57亿', 'Q2 2026 核心商业单季利润修复']],
 kpisEn: [['~87%', 'In-Store &amp; Hotel Gross Margin'], ['¥49.24B', 'FY24 Online Marketing Revenue'], ['¥52.4B', 'FY24 CLC Operating Profit'], ['¥5.7B', 'Q2 2026 CLC Profit Rebound']]
 },
 {
 badge: 'NODE 04 · EVERYTHING NOW: INSTASHOPPING + XIAOXIANG + DINGDONG',
 titleZh: '万物到家：美团闪购（平台）+ 小象超市（自营）+ 叮咚买菜整合',
 titleEn: 'Everything Now: Instashopping (3P) + Xiaoxiang (1P) + Dingdong Fresh',
 descZh: '美团把外卖“30分钟送达”心智从餐饮复制到 3C 数码、医药、酒水与生鲜日百：平台模式“美团闪购”日单突破千万、年 GMV 迈向 ¥3,500亿+；自营模式“小象超市”2026 Q2 扩至 68 城，并于 2026 年 2 月以 $7.17亿 收购叮咚买菜补强华东前置仓与生鲜直采供应链。',
 descEn: 'Extending 30-min delivery beyond meals to electronics, pharmacy, and groceries: 3P Instashopping exceeds 10M daily orders (¥350B+ GMV), while 1P Xiaoxiang reached 68 cities in Q2 2026 alongside the $717M Dingdong Fresh acquisition.',
 formulaZh: '商业传导：平台闪电仓轻资产扩张 + 小象/叮咚产地直采自有品牌 → 抢占传统商超与远场电商份额',
 formulaEn: 'Value Flow: 3P Lightning Warehouses + 1P Xiaoxiang/Dingdong direct sourcing → captures offline &amp; legacy e-commerce share',
 kpisZh: [['1,000万+', '美团闪购日均非餐订单'], ['68城', 'Q2 2026 小象超市覆盖城市数'], ['$7.17亿', '2026.02 收购叮咚买菜对价'], ['25.0% YoY', 'Q2 2026 新业务营收增速 (¥331亿)']],
 kpisEn: [['10M+', 'Instashopping Daily Non-Food Orders'], ['68 Cities', 'Q2 2026 Xiaoxiang Coverage'], ['$717M', 'Feb 2026 Dingdong Acquisition'], ['25.0% YoY', 'Q2 2026 New Initiatives Growth']]
 },
 {
 badge: 'NODE 05 · FLOAT, BUYBACKS & HARD-TECH OPTIONALITY',
 titleZh: '负营运资本浮存、灵活回购与 ¥773亿 硬科技战略股权池',
 titleEn: 'Negative Float, Disciplined Buybacks &amp; ¥77.3B Hard-Tech Equity',
 descZh: '借助海量交易沉淀的应付商户款与预付资金，美团常年享有负营运资本红利；2026 Q2 账面现金及短融储备达 ¥1,683亿，支持其在 2026 年重启大规模股份回购注销（单季多次斥资数亿至数十亿港元注销 B 类股）。更独特的是，美团过去 8 年通过战投与龙珠资本重仓智谱 AI、宇树科技、理想汽车与月之暗面，形成 ¥773亿 隐形科技期权。',
 descEn: 'Merchant payables and user prepayments create structural negative working capital. With ¥168.3B cash in Q2 2026, Meituan resumed Class B share cancellations while holding a ¥77.3B hard-tech portfolio across Zhipu AI, Unitree, Li Auto, and Moonshot.',
 formulaZh: '商业传导：负账期现金沉淀 → 对冲周期性价格战 + 低位回购注销缩股 + 产业场景换硬科技一级股权增值',
 formulaEn: 'Value Flow: Negative CCC cash → outlasts price wars + accretive buybacks + real-world scenarios for hard-tech equity gains',
 kpisZh: [['¥1,683亿', 'Q2 2026 现金及短期理财储备'], ['¥773亿', 'Q2 2026 投资组合公允价值'], ['40+家', '硬科技/大模型被投企业 (28独角兽)'], ['HK$5.2B+', '2026 上半年重启股份回购力度']],
 kpisEn: [['¥168.3B', 'Q2 2026 Cash &amp; Treasury Inv.'], ['¥77.3B', 'Q2 2026 Investment Portfolio'], ['40+ Firms', 'Hard-Tech &amp; AI Stakes (28 Unicorns)'], ['HK$5.2B+', '2026 Resumed Share Repurchases']]
 }
 ];

 function renderNode(idx) {
 state.activeNode = idx;
 var nd = NODES[idx] || NODES[0];
 var en = isEn();
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = en ? nd.titleEn : nd.titleZh;
 document.getElementById('nodeDesc').textContent = en ? nd.descEn : nd.descZh;
 document.getElementById('nodeFormula').textContent = en ? nd.formulaEn : nd.formulaZh;
 var kpis = en ? nd.kpisEn : nd.kpisZh;
 document.getElementById('nodeKpis').innerHTML = kpis.map(function (k) {
 return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 }

 var COHORTS = {
 solo: {
 statsZh: [
 ['典型消费行为', '仅点工作餐外卖 (低客单)', '对满减红包高度敏感'],
 ['年度留存与防流失力', '~76% (易受补贴分流)', '1元补贴战中波动较大'],
 ['平台年均毛利贡献', '~¥180 / 年', '仅依赖外卖单均微薄利润'],
 ['5年累计单客毛利 LTV', '¥760', '缺乏高毛利到店/酒旅二次变现']
 ],
 statsEn: [
 ['Typical Behavior', 'Meal-Only Delivery (Low AOV)', 'Highly sensitive to subsidies'],
 ['Annual Retention', '~76% (Subsidy-elastic)', 'Vulnerable to 1-yuan promo wars'],
 ['Annual Gross Profit', '~¥180 / yr', 'Thin delivery UE only'],
 ['5-Year Gross Profit LTV', '¥760', 'No In-Store/Hotel cross-sell']
 ],
 noteZh: '<strong>纯外卖单层客群局限：</strong>如果用户仅在美团点 15–20 元快餐外卖，在遭遇对手百亿补贴袭击时留存防御成本高；美团的核心运营动作就是通过“神会员”将其引导至高客单餐饮、医药闪购与周末堂食。',
 noteEn: '<strong>Solo Delivery Limit:</strong> Users who only order ¥15–20 meals are costly to defend during promo wars. Meituan uses Shenhuiyuan memberships to migrate them into high-AOV Instashop and weekend dine-in.'
 },
 core: {
 statsZh: [
 ['典型消费行为', '外卖 + 到店堂食 + 休闲娱乐', '跨场景高频联动'],
 ['年度留存与防流失力', '~93% (高真实意图粘性)', '点评榜单+即时履约双重绑定'],
 ['平台年均毛利贡献', '~¥540 / 年', '到店 ~87% 高毛利大幅拉升利润'],
 ['5年累计单客毛利 LTV', '¥2,480', '约为纯外卖客群的 3.3 倍']
 ],
 statsEn: [
 ['Typical Behavior', 'Delivery + Dine-In + Leisure', 'Cross-scene habit loop'],
 ['Annual Retention', '~93% (High Intent Lock)', 'Dianping reviews + 30-min grid'],
 ['Annual Gross Profit', '~¥540 / yr', '~87% GM In-Store boosts margin'],
 ['5-Year Gross Profit LTV', '¥2,480', '~3.3x Solo Delivery cohort LTV']
 ],
 noteZh: '<strong>交叉引流质变点：</strong>当用户把大众点评“必吃榜”找店决策与美团外卖履约结合后，即便竞争对手在咖啡奶茶上撒币，用户依然回到美团完成 &gt;¥30 真实正餐与周末聚餐消费——这正是 2025 补贴战中美团守住 <strong>70%+ 高客单份额</strong>的根源。',
 noteEn: '<strong>Cross-Sell Inflection:</strong> Combining Dianping discovery with Meituan delivery means users return for &gt;¥30 meals and weekend dining even when rivals subsidize cheap drinks—driving Meituan\'s <strong>70%+ high-AOV share</strong>.'
 },
 ultra: {
 statsZh: [
 ['典型消费行为', '外卖 + 闪购医药/3C + 小象超市 + 酒旅', '全生活半径一站式托付'],
 ['年度留存与防流失力', '&gt;97% (家庭刚需锁死)', '习惯“30分钟万物到家”不可逆'],
 ['平台年均毛利贡献', '~¥1,180+ / 年', '生鲜复购 + 高星酒店 + 闪购'],
 ['5年累计单客毛利 LTV', '¥5,650+', '约为纯外卖客群的 7.4 倍']
 ],
 statsEn: [
 ['Typical Behavior', 'Delivery + Instashop + Xiaoxiang + Travel', 'Full urban lifestyle OS'],
 ['Annual Retention', '&gt;97% (Household Habit)', 'Irreversible 30-min convenience'],
 ['Annual Gross Profit', '~¥1,180+ / yr', 'Grocery repeat + Travel + 3C'],
 ['5-Year Gross Profit LTV', '¥5,650+', '~7.4x Solo Delivery cohort LTV']
 ],
 noteZh: '<strong>全场景家庭年金层：</strong>从深夜急用买药、3C 应急充电线到小象超市一日三餐生鲜买菜与假日酒店预订，美团成为家庭城市生活的“水电煤操作系统”，单客全生命周期毛利跃升至 ¥5,650+ 级别。',
 noteEn: '<strong>Household Annuity Tier:</strong> From late-night medicine and urgent electronics to daily Xiaoxiang groceries and hotel stays, Meituan becomes an indispensable urban utility with ¥5,650+ 5-year LTV.'
 }
 };

 function renderCohort(key) {
 state.activeCohort = key || 'core';
 var c = COHORTS[state.activeCohort] || COHORTS.core;
 var en = isEn();
 var stats = en ? c.statsEn : c.statsZh;
 document.getElementById('cohortMetrics').innerHTML = stats.map(function (s, idx) {
 var isMono = idx > 0 ? ' mono' : '';
 var fz = idx === 0 ? ' style="font-size:0.90rem;"' : '';
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = en ? c.noteEn : c.noteZh;
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
 var sl = document.getElementById('sideThemeLightBtn'), sd = document.getElementById('sideThemeDarkBtn');
 if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
 if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
 drawAllCharts();
 if (!silent) showToast(isEn() ? (state.theme === 'dark' ? 'Switched to Dark Blueprint' : 'Switched to Light Mode') : (state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式'));
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.lang = en ? 'en' : 'zh-CN';
 document.title = en ? TITLE_EN : TITLE_ZH;
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', !en); zhB.setAttribute('aria-pressed', String(!en)); }
 if (enB) { enB.classList.toggle('active', en); enB.setAttribute('aria-pressed', String(en)); }

 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
 else nodes[i].textContent = val;
 }
 }
 var richNodes = document.querySelectorAll('[data-i18n-rich]');
 for (var r = 0; r < richNodes.length; r++) {
 var rk = richNodes[r].getAttribute('data-i18n-rich');
 if (RICH_I18N[rk]) richNodes[r].innerHTML = en ? RICH_I18N[rk].en : RICH_I18N[rk].zh;
 }
 var phNodes = document.querySelectorAll('[data-i18n-ph-zh]');
 for (var p = 0; p < phNodes.length; p++) {
 phNodes[p].setAttribute('placeholder', phNodes[p].getAttribute(en ? 'data-i18n-ph-en' : 'data-i18n-ph-zh'));
 }
 var ariaNodes = document.querySelectorAll('[data-i18n-aria-zh]');
 for (var a = 0; a < ariaNodes.length; a++) {
 ariaNodes[a].setAttribute('aria-label', ariaNodes[a].getAttribute(en ? 'data-i18n-aria-en' : 'data-i18n-aria-zh'));
 }
 var titleNodes = document.querySelectorAll('[data-i18n-title-zh]');
 for (var t = 0; t < titleNodes.length; t++) {
 titleNodes[t].setAttribute('title', titleNodes[t].getAttribute(en ? 'data-i18n-title-en' : 'data-i18n-title-zh'));
 }

 renderLens(state.activeLens);
 renderNode(state.activeNode);
 renderCohort(state.activeCohort);
 renderProfitLegend();
 renderCohortLegend();
 drawAllCharts();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) {
 lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 var all = lensTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
 renderLens(parseInt(b.getAttribute('data-lens'), 10) || 0);
 });
 }

 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) {
 pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
 var bs = pTrack.querySelectorAll('.bm-node-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
 renderNode(parseInt(btn.getAttribute('data-node'), 10) || 0);
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

 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) {
 cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]');
 if (!b) return;
 var bs = cohortTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderCohort(b.getAttribute('data-cohort'));
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
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }

 function roundRect(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath();
 ctx.moveTo(x + rr, y);
 ctx.arcTo(x + w, y, x + w, y + h, rr);
 ctx.arcTo(x + w, y + h, x, y + h, rr);
 ctx.arcTo(x, y + h, x, y, rr);
 ctx.arcTo(x, y, x + w, y, rr);
 ctx.closePath();
 }

 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return;
 ctx.beginPath();
 ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) {
 var xc = (pts[i].x + pts[i + 1].x) / 2;
 ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
 }
 }

 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save();
 ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 var tw = ctx.measureText(text).width + 10;
 var th = 17;
 ctx.fillStyle = pal.pillBg;
 roundRect(ctx, cx - tw / 2, cy - th / 2, tw, th, 5);
 ctx.fill();
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function renderProfitLegend() {
 var leg = document.getElementById('profitLegend');
 if (!leg) return;
 var en = isEn();
 if (state.pView === 'waterfall') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.profitSeries.rev ? '' : ' muted') + '" data-p-series="rev"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Total Revenue (¥B)' : '集团总营收 (¥B)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.clc ? '' : ' muted') + '" data-p-series="clc"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'CLC Op Profit (¥B)' : '核心本地营业利润 (¥B)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.net ? '' : ' muted') + '" data-p-series="net"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'GAAP Net Profit (¥B)' : 'GAAP 净利润 (¥B)') + '</span></button>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'Quarterly Turnaround (¥B): Q3 25 (-18.6B) → Q1 26 (-6.8B) → Q2 26 (+2.2B) → Q3 26E' : '季度 V 型扭亏轨迹 (¥B)：25Q3 (-18.6B) → 26Q1 (-6.8B) → 26Q2 (+2.2B)') + '</span>';
 }
 }

 var pLegEl = document.getElementById('profitLegend');
 if (pLegEl) {
 pLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-p-series]');
 if (!b) return;
 var k = b.getAttribute('data-p-series');
 state.profitSeries[k] = !state.profitSeries[k];
 if (!state.profitSeries.rev && !state.profitSeries.clc && !state.profitSeries.net) state.profitSeries[k] = true;
 renderProfitLegend();
 drawProfitCanvas();
 });
 }

 function renderCohortLegend() {
 var leg = document.getElementById('cohortLegend');
 if (!leg) return;
 var en = isEn();
 if (state.cView === 'ltv') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.cohortSeries.ultra ? '' : ' muted') + '" data-c-series="ultra"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Full Household' : '神会员全家桶家庭') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.core ? '' : ' muted') + '" data-c-series="core"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Delivery + In-Store Duo' : '外卖+到店双栖户') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.solo ? '' : ' muted') + '" data-c-series="solo"><span class="legend-dot" style="background:var(--mui-warning-main);"></span><span>' + (en ? 'Delivery-Only' : '纯外卖低客单户') + '</span></button>';
 } else {
 leg.innerHTML =
 '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Light Bar: Overall GTV Share (%)' : '浅色柱：整体外卖 GTV 份额 (%)') + '</span>' +
 '<span class="mui-chip mui-chip-success mono">' + (en ? 'Solid Bar: >¥30 High-Value Order Share (%)' : '深色柱：客单价 >¥30 真实盈利单份额 (%)') + '</span>';
 }
 }

 var cLegEl = document.getElementById('cohortLegend');
 if (cLegEl) {
 cLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-c-series]');
 if (!b) return;
 var k = b.getAttribute('data-c-series');
 state.cohortSeries[k] = !state.cohortSeries[k];
 if (!state.cohortSeries.ultra && !state.cohortSeries.core && !state.cohortSeries.solo) state.cohortSeries[k] = true;
 renderCohortLegend();
 drawCohortCanvas();
 });
 }

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var yrs = ['FY2022', 'FY2023', 'FY2024', 'FY2025'];
 var rev = [220.0, 276.7, 337.6, 364.9];
 var clc = [29.5, 38.7, 52.4, -6.9];
 var net = [-6.7, 13.9, 35.8, -23.4];
 var minV = -40, maxV = 400;
 for (var g = 0; g <= 4; g++) {
 var gv = minV + ((maxV - minV) / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv.toFixed(0) + 'B', pad.left - 6, gy + 4);
 }
 var zeroY = pad.top + ph - ((0 - minV) / (maxV - minV)) * ph;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke();

 var slot = pw / yrs.length, bw = Math.min(26, slot * 0.22);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2;
 if (state.hover.profitCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 function drawBar(val, offset, col) {
 var yVal = pad.top + ph - ((val - minV) / (maxV - minV)) * ph;
 var yt = Math.min(yVal, zeroY), bh = Math.max(4, Math.abs(zeroY - yVal));
 ctx.fillStyle = val < 0 ? pal.red : col;
 roundRect(ctx, cx + offset - bw / 2, yt, bw, bh, 4); ctx.fill();
 drawValueBadge(ctx, (val >= 0 ? '' : '-') + '¥' + Math.abs(val).toFixed(0) + 'B', cx + offset, val >= 0 ? yt - 11 : yt + bh + 11, val < 0 ? pal.red : col, pal);
 }
 if (state.profitSeries.rev) drawBar(rev[i], -bw - 4, pal.blue);
 if (state.profitSeries.clc) drawBar(clc[i], 0, pal.green);
 if (state.profitSeries.net) drawBar(net[i], bw + 4, pal.violet);

 ctx.fillStyle = pal.sub; ctx.font = '700 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.profitCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: y + (en ? ' Financial Cycle' : ' 财务周期表现'),
 body: (en ? 'Rev: ¥' : '总营收: ¥') + rev[i] + 'B · ' + (en ? 'CLC Op: ¥' : '核心本地利润: ¥') + clc[i] + 'B · ' + (en ? 'GAAP Net: ¥' : 'GAAP净利: ¥') + net[i] + 'B'
 });
 });
 } else {
 var qs = ['25Q3', '25Q4', '26Q1', '26Q2', '26Q3E'];
 var qRev = [95.5, 97.6, 91.0, 104.6, 113.1];
 var qNet = [-18.6, -5.2, -6.8, 2.2, 0.7];
 var minQ = -25, maxQ = 130;
 for (var k = 0; k <= 4; k++) {
 var kv = minQ + ((maxQ - minQ) / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + kv.toFixed(0) + 'B', pad.left - 6, ky + 4);
 }
 var zY = pad.top + ph - ((0 - minQ) / (maxQ - minQ)) * ph;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(pad.left, zY); ctx.lineTo(pad.left + pw, zY); ctx.stroke();

 var qSlot = pw / qs.length, qBw = Math.min(34, qSlot * 0.36);
 qs.forEach(function (q, i) {
 var cx = pad.left + i * qSlot + qSlot / 2;
 if (state.hover.profitCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * qSlot + 3, pad.top, qSlot - 6, ph, 7); ctx.fill();
 }
 var ry = pad.top + ph - ((qRev[i] - minQ) / (maxQ - minQ)) * ph;
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - qBw - 2, ry, qBw, zY - ry, 5); ctx.fill();
 drawValueBadge(ctx, '¥' + qRev[i].toFixed(1) + 'B', cx - qBw / 2 - 2, ry - 11, pal.blue, pal);

 var ny = pad.top + ph - ((qNet[i] - minQ) / (maxQ - minQ)) * ph;
 var nyt = Math.min(ny, zY), nbh = Math.max(4, Math.abs(zY - ny));
 ctx.fillStyle = qNet[i] >= 0 ? pal.green : pal.red;
 roundRect(ctx, cx + 2, nyt, qBw, nbh, 5); ctx.fill();
 drawValueBadge(ctx, (qNet[i] >= 0 ? '+' : '-') + '¥' + Math.abs(qNet[i]).toFixed(1) + 'B', cx + qBw / 2 + 2, qNet[i] >= 0 ? nyt - 11 : nyt + nbh + 11, qNet[i] >= 0 ? pal.green : pal.red, pal);

 ctx.fillStyle = pal.sub; ctx.font = '700 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(q, cx, pad.top + ph + 20);
 hitRegions.profitCanvas.push({
 idx: i, x: pad.left + i * qSlot, y: pad.top, w: qSlot, h: ph + 26,
 title: q + (en ? ' Turnaround' : ' 季度业绩轨迹'),
 body: (en ? 'Revenue: ¥' : '单季营收: ¥') + qRev[i].toFixed(1) + 'B · ' + (en ? 'Net Profit/Loss: ¥' : '净利润/亏损: ¥') + qNet[i].toFixed(1) + 'B'
 });
 });
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 24, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = en ? ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] : ['首年 Y1', '第2年 Y2', '第3年 Y3', '第4年 Y4', '第5年 Y5'];
 var solo = [180, 340, 490, 630, 760];
 var core = [540, 1040, 1530, 2010, 2480];
 var ultra = [1180, 2310, 3440, 4560, 5650];
 var maxL = 6200;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv.toFixed(0), pad.left - 8, gy + 4);
 }
 var stepX = pw / (xLbls.length - 1);
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.cohortCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: lb + (en ? ' Cumulative Gross Profit LTV' : ' 累计单客毛利 LTV'),
 body: (en ? 'Household: ¥' : '全家桶: ¥') + ultra[idx] + ' · ' + (en ? 'Duo: ¥' : '双栖户: ¥') + core[idx] + ' · ' + (en ? 'Solo: ¥' : '纯外卖: ¥') + solo[idx]
 });
 });
 function drawCurve(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxL) * ph, v: v }; });
 ctx.save(); drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)');
 ctx.fillStyle = ag; ctx.fill(); ctx.restore();
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.cohortCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.6 : 3.6, 0, Math.PI * 2); ctx.fill();
 if (idx === 4 || isHov) drawValueBadge(ctx, '¥' + pt.v, idx === 4 ? pt.x - 18 : pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.cohortSeries.ultra) drawCurve(ultra, pal.violet, 'rgba(124, 58, 237, 0.18)');
 if (state.cohortSeries.core) drawCurve(core, pal.blue, 'rgba(0, 115, 230, 0.16)');
 if (state.cohortSeries.solo) drawCurve(solo, pal.amber, 'rgba(217, 119, 6, 0.14)');
 } else {
 var vendors = [
 { name: en ? 'Meituan' : '美团外卖', gtv: 63.0, high: 72.0, col: pal.blue },
 { name: en ? 'Taobao/Ele.me' : '淘宝闪购/饿了么', gtv: 29.0, high: 22.0, col: pal.amber },
 { name: en ? 'JD Delivery' : '京东外卖', gtv: 8.0, high: 6.0, col: pal.red }
 ];
 var slot = pw / vendors.length;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 25, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 vendors.forEach(function (v, idx) {
 var cx = pad.left + idx * slot + slot / 2, bw = Math.min(36, slot * 0.28);
 var uh = (v.gtv / 100) * ph, prh = (v.high / 100) * ph;
 if (state.hover.cohortCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + idx * slot + 4, pad.top, slot - 8, ph, 7); ctx.fill();
 }
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 4, pad.top + ph - uh, bw, uh, 5); ctx.fill();
 ctx.fillStyle = v.col;
 roundRect(ctx, cx + 4, pad.top + ph - prh, bw, prh, 5); ctx.fill();
 drawValueBadge(ctx, v.gtv + '%', cx - bw / 2 - 4, pad.top + ph - uh - 12, pal.sub, pal);
 drawValueBadge(ctx, v.high + '%', cx + bw / 2 + 4, pad.top + ph - prh - 12, v.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 idx: idx, x: pad.left + idx * slot, y: pad.top, w: slot, h: ph + 26,
 title: v.name,
 body: en ? ('Overall GTV Share ~' + v.gtv + '% vs. >¥30 Order Share ~' + v.high + '%') : ('整体 GTV 份额 ~' + v.gtv + '% vs 客单价>¥30订单份额 ~' + v.high + '%')
 });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'shares') {
 var items = [
 { lbl: en ? 'Cash & Equiv' : '现金及等价物', val: 104.7, col: pal.blue, tip: en ? 'Q2 2026 Cash & cash equivalents: ¥104.7B' : 'Q2 2026 账面现金及等价物: ¥104.7B' },
 { lbl: en ? 'Treasury Inv.' : '短期理财存款', val: 63.6, col: pal.green, tip: en ? 'Q2 2026 Short-term treasury investments: ¥63.6B (Total Cash ¥168.3B)' : 'Q2 2026 短期理财及存款: ¥63.6B（现金储备合计 ¥168.3B）' },
 { lbl: en ? 'Tech Equity' : '硬科技战投池', val: 77.3, col: pal.violet, tip: en ? 'Fair value of 40+ tech investments (Zhipu AI, Unitree, Li Auto, Moonshot): ¥77.3B' : '40+ 硬科技与大模型股权组合公允价值: ¥77.3B（含智谱/宇树/理想/月之暗面）' },
 { lbl: en ? 'FY25 R&D' : 'FY25 研发投入', val: 26.0, col: pal.amber, tip: en ? 'FY2025 R&D hit record ¥26.0B (+23% YoY), betting on Physical AI &amp; drones' : 'FY2025 全年研发投入创纪录达 ¥26.0B (+23% YoY)，重点投向 AI 与无人机' }
 ];
 var maxS = 125;
 for (var g = 0; g <= 4; g++) {
 var sv = (maxS / 4) * g, sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + sv.toFixed(0) + 'B', pad.left - 6, sy + 4);
 }
 var slot = pw / items.length, bw = Math.min(48, slot * 0.54);
 items.forEach(function (it, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = (it.val / maxS) * ph, yTop = pad.top + ph - bh;
 if (state.hover.capitalCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = it.col;
 roundRect(ctx, x, yTop, bw, bh, 6); ctx.fill();
 if (state.hover.capitalCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + it.val.toFixed(1) + 'B', cx, yTop - 12, it.col, pal);
 ctx.fillStyle = pal.tick; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(it.lbl, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: it.lbl, body: it.tip });
 });
 } else {
 var peers = [
 { name: 'Meituan (3690.HK)', ccc: -28, col: pal.green, tip: en ? 'Upfront user payment + periodic merchant settlement = ~-28d negative float' : '用户下单即刻收款 + 商户定期结算 = 约 -28天负现金转换周期浮存金' },
 { name: 'Alibaba (9988.HK)', ccc: -18, col: pal.blue, tip: en ? 'Marketplace escrow &amp; merchant payables yield negative CCC' : '平台担保交易及商家账期形成负营运资本' },
 { name: 'DoorDash (DASH)', ccc: -12, col: pal.violet, tip: en ? 'Pure delivery marketplace float' : '北美纯外卖平台周转账期' },
 { name: 'JD.com (9618.HK)', ccc: 14, col: pal.amber, tip: en ? '1P self-operated warehousing carries physical inventory days' : '自营仓储重资产模式需承担存货周转天数' }
 ];
 var zeroX = pad.left + pw * 0.45;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(zeroX, pad.top); ctx.lineTo(zeroX, pad.top + ph); ctx.stroke();
 var rowH = ph / peers.length;
 peers.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 22, scale = (pw * 0.42) / 35;
 var barLen = Math.abs(it.ccc) * scale, bx = it.ccc < 0 ? (zeroX - barLen) : zeroX;
 if (state.hover.capitalCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill();
 }
 ctx.fillStyle = it.col;
 roundRect(ctx, bx, cy - bh / 2, barLen, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
 ctx.textAlign = it.ccc < 0 ? 'right' : 'left';
 ctx.fillText((it.ccc > 0 ? '+' : '') + it.ccc + (en ? ' d' : ' 天'), it.ccc < 0 ? bx - 6 : bx + barLen + 6, cy + 4);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.name, pad.left, cy - 15);
 hitRegions.capitalCanvas.push({ idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH, title: it.name + ' CCC', body: it.tip });
 });
 }
 }

 var simData = { eps: [3.2, 5.8, 7.9, 10.1, 12.3], rev: [418, 466, 520, 580, 680] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.simMiniCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2027E', '2028E', '2029E', '2030E', '2031E'];
 var arr = simData.eps;
 var maxE = Math.max(15, Math.ceil(Math.max.apply(null, arr) * 1.15));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

 var pts = arr.map(function (v, i) {
 return { x: pad.left + (i / 4) * pw, y: pad.top + ph - (v / maxE) * ph, v: v };
 });

 ctx.save(); drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, 'rgba(0, 115, 230, 0.24)'); ag.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
 ctx.fillStyle = ag; ctx.fill(); ctx.restore();

 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();

 var slot = pw / 4;
 pts.forEach(function (pt, i) {
 var isHov = state.hover.simMiniCanvas === i;
 if (isHov) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(pt.x, pad.top); ctx.lineTo(pt.x, pad.top + ph); ctx.stroke(); ctx.restore();
 ctx.fillStyle = 'rgba(0, 115, 230, 0.20)'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill();
 }
 ctx.fillStyle = (i === 4) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 5.2 : 4, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '¥' + pt.v.toFixed(2), pt.x, pt.y - 13, (i === 4) ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(yrs[i], pt.x, pad.top + ph + 16);
 hitRegions.simMiniCanvas.push({
 idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 title: yrs[i] + (en ? ' Projected EPS' : ' 推演 EPS'),
 body: (en ? 'Adj. EPS: ¥' : '经调整 EPS: ¥') + pt.v.toFixed(2) + (en ? ' · Est. Revenue: ¥' : ' · 推演营收: ¥') + Math.round(simData.rev[i]) + 'B'
 });
 });
 }

 function runSimulator() {
 var clcOpm = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
 var gRev = parseFloat(document.getElementById('inpProdCagr').value) / 100;
 var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblSvcCagr').textContent = (clcOpm * 100).toFixed(1) + '%';
 document.getElementById('lblProdCagr').textContent = (gRev * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

 var rev = 395.0, shares = 6.17;
 var epsArr = [], revArr = [];
 for (var y = 1; y <= 5; y++) {
 rev *= (1 + gRev);
 shares *= (1 - buy);
 var clcShare = 0.68;
 var newBizMargin = -0.04 + y * 0.012;
 var blendedMargin = clcShare * (clcOpm * (0.55 + y * 0.09)) + (1 - clcShare) * newBizMargin - 0.02;
 var netInc = Math.max(8.0, rev * blendedMargin);
 epsArr.push(netInc / shares);
 revArr.push(rev);
 }
 var fy31Rev = revArr[4];
 var fy31Net = epsArr[4] * shares;
 var fy31Eps = epsArr[4];
 var mcapT = (fy31Net * 18) / 1000;

 document.getElementById('simRevOut').textContent = '¥' + Math.round(fy31Rev) + 'B';
 document.getElementById('simGmOut').textContent = '¥' + fy31Net.toFixed(1) + 'B';
 document.getElementById('simEpsOut').textContent = '¥' + fy31Eps.toFixed(2);
 document.getElementById('simCagrOut').textContent = '¥' + mcapT.toFixed(2) + 'T';
 simData.eps = epsArr;
 simData.rev = revArr;
 drawSimMiniCanvas();
 }

 ['inpSvcCagr', 'inpProdCagr', 'inpBuyRate'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = { bear: { s: 11.5, p: 6.5, b: 1.0 }, base: { s: 16.5, p: 11.5, b: 2.0 }, bull: { s: 20.0, p: 15.0, b: 3.0 } };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpSvcCagr').value = pr.s;
 document.getElementById('inpProdCagr').value = pr.p;
 document.getElementById('inpBuyRate').value = pr.b;
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
 if (groupId === 'pChartTabs') renderProfitLegend();
 if (groupId === 'cChartTabs') renderCohortLegend();
 drawFn();
 });
 }
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 function bindHoverTooltip(canvasId, redrawFn) {
 var c = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 function handlePtr(clientX, clientY) {
 var r = c.getBoundingClientRect();
 var mx = clientX - r.left, my = clientY - r.top;
 var list = hitRegions[canvasId] || [], hit = null;
 for (var i = 0; i < list.length; i++) {
 var rg = list[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 var nextIdx = hit ? hit.idx : -1;
 if (state.hover[canvasId] !== nextIdx) { state.hover[canvasId] = nextIdx; redrawFn(); }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 305, Math.max(12, clientX + 14)) + 'px';
 tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, clientY - 28)) + 'px';
 } else { tip.style.display = 'none'; }
 }
 c.addEventListener('mousemove', function (ev) { handlePtr(ev.clientX, ev.clientY); });
 c.addEventListener('touchstart', function (ev) { if (ev.touches[0]) handlePtr(ev.touches[0].clientX, ev.touches[0].clientY); }, { passive: true });
 c.addEventListener('touchmove', function (ev) { if (ev.touches[0]) handlePtr(ev.touches[0].clientX, ev.touches[0].clientY); }, { passive: true });
 c.addEventListener('mouseleave', function () {
 if (state.hover[canvasId] !== -1) { state.hover[canvasId] = -1; redrawFn(); }
 tip.style.display = 'none';
 });
 }
 bindHoverTooltip('profitCanvas', drawProfitCanvas);
 bindHoverTooltip('cohortCanvas', drawCohortCanvas);
 bindHoverTooltip('capitalCanvas', drawCapitalCanvas);
 bindHoverTooltip('simMiniCanvas', drawSimMiniCanvas);

 function drawAllCharts() {
 drawProfitCanvas();
 drawCohortCanvas();
 drawCapitalCanvas();
 drawSimMiniCanvas();
 }

 var QUICK_ZH = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'Q2 2026 ¥104.6B 营收 · ¥1,683亿现金 · 高频带低频漏斗' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '超脑调度 → 跨品类导流 → 87%毛利到店 → 闪购/小象 → 战投' },
 { id: 'mod-profit-pool', t: 'M2 利润池周期与四层收入拆解', s: 'FY22–Q2 2026 盈利V型修复 · 广告/佣金/配送/自营' },
 { id: 'mod-cohort', t: 'M3 交叉引流棘轮与单客 LTV', s: '纯外卖 vs 双栖户 vs 全家桶 · 70%+ 高客单份额防守' },
 { id: 'mod-capital', t: 'M4 现金堡垒、战投股权与复利推演', s: '¥1,683亿现金 · ¥773亿硬科技股权 · FY31 盈利模拟' },
 { id: 'mod-matrix', t: 'M5 海内外巨头对标矩阵与风险压测', s: '美团 vs 阿里/京东/抖音/DoorDash/Uber' }
 ];
 var QUICK_EN = [
 { id: 'mod-deck', t: 'M0 Command Deck & Economic Formula', s: 'Q2 2026 ¥104.6B Rev · ¥168.3B Cash · High-to-Low Funnel' },
 { id: 'mod-pipeline', t: 'M1 5-Node Value-Chain Pipeline', s: 'Dispatch → Cross-Sell → 87% GM In-Store → Instashop → Equity' },
 { id: 'mod-profit-pool', t: 'M2 Profit Cycle & 4-Tier Revenue Stack', s: 'FY22–Q2 2026 V-Turnaround · Ads/Commissions/Delivery/1P' },
 { id: 'mod-cohort', t: 'M3 Cross-Sell Ratchet & Cohort LTV', s: 'Solo vs. Duo vs. Household · 70%+ High-AOV Defense' },
 { id: 'mod-capital', t: 'M4 Cash Fortress, Hard-Tech &amp; Simulator', s: '¥168.3B Cash · ¥77.3B Portfolio · FY31 Compounder' },
 { id: 'mod-matrix', t: 'M5 Peer Matrix & Stress Audit', s: 'Meituan vs. Alibaba/JD/Douyin/DoorDash/Uber' }
 ];
 var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQuick(q) {
 if (!qPop) return;
 var kw = (q || '').trim().toLowerCase();
 var src = isEn() ? QUICK_EN : QUICK_ZH;
 var matched = src.filter(function (it, idx) {
 var z = QUICK_ZH[idx], e = QUICK_EN[idx];
 return !kw || (z.t + ' ' + z.s + ' ' + e.t + ' ' + e.s).toLowerCase().indexOf(kw) !== -1;
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
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qInput) qInput.focus(); }
 });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 setTimeout(drawAllCharts, 60);
 } else {
 var open = sb.classList.toggle('open'); bd.classList.toggle('open', open);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 document.getElementById('sideThemeLightBtn').addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideThemeDarkBtn').addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n', document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var link = document.createElement('a');
 link.href = url; link.download = 'Meituan_Business_Model_Analysis.html';
 document.body.appendChild(link); link.click(); document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast(isEn() ? 'Exported Meituan_Business_Model_Analysis.html' : '已导出独立网页 Meituan_Business_Model_Analysis.html');
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
 showToast(isEn() ? (chk.checked ? 'Added to quarterly watchlist' : 'Removed from watchlist') : (chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记'));
 });
 });
 } catch (e) {}

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {
 applyLang('zh', true);
 }

 var themeBtn = document.getElementById('appbarThemeBtn');
 if (themeBtn) {
 themeBtn.addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark';
 applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 }
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (!lb) return;
 var nl = lb.getAttribute('data-lang');
 applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var resizeTimer = null;
 window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawAllCharts, 90); });
 runSimulator();
 drawAllCharts();
 })();
 