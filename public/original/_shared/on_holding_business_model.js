
 (function () {
  'use strict';

  var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
  var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
  var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
  var STORAGE_STRESS_KEY = 'onon_bm_stress_v1';

  var state = {
   theme: 'dark',
   lang: 'zh',
   lens: 0,
   node: 0,
   cohort: 'core',
   pView: 'waterfall',
   cView: 'ltv',
   kView: 'cash'
  };

  var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

  function isEn() { return state.lang === 'en'; }

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
    text: dark ? '#F3F6F9' : '#0F172A',
    sub: dark ? '#B2BAC2' : '#334155',
    tick: dark ? '#94A3B8' : '#475569',
    grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
    blue: dark ? '#3399FF' : '#0073E6',
    blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.16)',
    green: dark ? '#22C55E' : '#16A34A',
    amber: dark ? '#FFB74D' : '#D97706',
    violet: dark ? '#A78BFA' : '#7C3AED',
    red: dark ? '#FF6B6B' : '#DC2626'
   };
  }

  var HERO_LEAD = {
   zh: '华尔街曾将<strong>昂跑（On Holding AG, NYSE: ONON）</strong>简单视作又一个受潮流周期摆布的新锐跑鞋品牌，但其真实经济底座实为一台<strong>“瑞士工程专利 + 奢侈品配额控价”耦合的复利引擎</strong>：第一层在苏黎世 On Labs 构建高辨识度物理专利壁垒（<strong>CloudTec® / Helion™ / Surreal™ 超临界发泡与 LightSpray™ 3分钟机械臂喷织</strong>），在全行业陷入打折清库泥潭时逆势坚守全价纪律，推动 FY2025 净营收首破 <strong>CHF 3,014.0M（+35.6% 固定汇率）</strong> <a class="cite-link" href="https://investors.on-running.com/news/news-details/2026/On-Announces-Fourth-Quarter-and-Full-Year-Results-and-the-Filing-of-its-Annual-Report-on-Form-20-F-for-2025/default.aspx" target="_blank" rel="noopener noreferrer">FY25 20-F 财报 ↗</a>，并于 Q3 2026 创下单季 <strong>CHF 931.4M</strong> 与<strong>66.9% 基础毛利率（报告毛利率 72.6%）</strong>的全球运动鞋服最高纪录 <a class="cite-link" href="https://press.on-running.com/on-reports-results-for-the-third-quarter-and-nine-month-period-ended-september-30-2026" target="_blank" rel="noopener noreferrer">Q3\'26 财报 ↗</a>；第二层借 <strong>DTC 直营占比升至 42.2%</strong> 与高毛利全身服饰（9M26 <strong>+49.3% CC</strong>）打开单客生命周期价值；第三层凭仅 <strong>2.6% 的轻资产 CapEx 强度</strong>积累 <strong>CHF 1,339.0M 零有息负债净现金</strong>，于 2026 年 9 月投资者日宣布首轮 <strong>$10亿美元股票回购授权</strong> <a class="cite-link" href="https://investors.on-running.com/news/news-details/2026/On-Enters-Next-Chapter-Unveils-Strategy-to-Redefine-What-a-Sportswear-Brand-Can-Be-Alongside-2029-Financial-Targets/default.aspx" target="_blank" rel="noopener noreferrer">2026 投资者日 ↗</a>。',
   en: 'Wall Street once viewed <strong>On Holding AG (NYSE: ONON)</strong> as just another trend-driven running label, yet its underlying engine combines <strong>Swiss engineering patents with luxury-grade allocation scarcity</strong>: First, On Labs in Zurich builds unmistakable physical IP (<strong>CloudTec®, Helion™ / Surreal™ superfoams, and 3-minute LightSpray™ robotic uppers</strong>), holding full price in a promotional market to propel FY2025 net sales past <strong>CHF 3,014.0M (+35.6% CC)</strong> <a class="cite-link" href="https://investors.on-running.com/news/news-details/2026/On-Announces-Fourth-Quarter-and-Full-Year-Results-and-the-Filing-of-its-Annual-Report-on-Form-20-F-for-2025/default.aspx" target="_blank" rel="noopener noreferrer">FY25 20-F ↗</a> and setting Q3 2026 records of <strong>CHF 931.4M</strong> and <strong>66.9% underlying gross margin (72.6% reported)</strong>—#1 in global sportswear <a class="cite-link" href="https://press.on-running.com/on-reports-results-for-the-third-quarter-and-nine-month-period-ended-september-30-2026" target="_blank" rel="noopener noreferrer">Q3\'26 Release ↗</a>; Second, expanding <strong>DTC mix to 42.2%</strong> alongside toe-to-head Apparel (9M26 <strong>+49.3% CC</strong>) multiplies customer LTV; Third, <strong>2.6% CapEx intensity</strong> built a <strong>CHF 1,339.0M debt-free cash fortress</strong>, backing an inaugural <strong>$1.0B share buyback</strong> <a class="cite-link" href="https://investors.on-running.com/news/news-details/2026/On-Enters-Next-Chapter-Unveils-Strategy-to-Redefine-What-a-Sportswear-Brand-Can-Be-Alongside-2029-Financial-Targets/default.aspx" target="_blank" rel="noopener noreferrer">Investor Day 2026 ↗</a>.'
  };

  var LENSES = [
   {
    zhF: '核心毛利池 (66.9% 基础GM) = 旗舰定价权 ($160–$310 ASP) × 行业最高全价成交率 - 主动控货拒绝尾货倾销折损',
    enF: 'Gross Profit Pool (66.9% Underlying GM) = Flagship Pricing ($160–$310 ASP) × Industry-Best Full-Price Realization - Zero Channel Stuffing',
    zhB: '正如 CFO Frank Sluis 在 Q3 2026 财报中所言：<strong>“在昂跑，高端（Premium）不是修饰词，而是财务运转机制本身。”</strong>当 2026Q2 北美运动市场陷入恶性促销战时，昂跑主动克制对批发商压货（Hold Back Sell-in），宁可牺牲短期批发冲量也绝不损伤全价体系，换来 Q3 创历史纪录的 66.9% 基础毛利率。',
    enB: 'As CFO Frank Sluis stated in Q3 2026: <strong>"Premium is not the adjective in our financial model—it is the mechanism."</strong> When North American sportswear turned promotional in Q2 2026, On deliberately held back wholesale sell-in to protect inventory health, resulting in an all-time record 66.9% underlying gross margin in Q3.'
   },
   {
    zhF: '综合毛利率结构跃迁 (62.8% → 66.9%) = 批发稳态高毛利 (57.8%权重) + DTC直营爆发 (42.2%权重 · 零售全价毛利 >74%)',
    enF: 'Margin Mix Accretion (62.8% → 66.9%) = Curated Wholesale (57.8% Share) + High-Margin DTC Flagships & E-Com (42.2% Share · >74% Retail GM)',
    zhB: '每当一双 $180 跑鞋或一件技术夹克从精选批发商转向昂跑自营官网或全球近 100 家直营旗舰店成交，昂跑即可直接内化约 15–20 个百分点的渠道零售价差；叠加规模化海运与采购议价红利，使<strong>营收扩张与利润率扩张在昂跑同步发生</strong>。',
    enB: 'Every pair of $180 shoes or technical jacket sold via on.com or On\'s ~100 flagship brand hubs captures 15–20 percentage points of retail margin markup directly, allowing top-line expansion and gross-margin expansion to compound simultaneously.'
   },
   {
    zhF: '自由现金流转化 = 21.9% 基础 Adj. EBITDA 率 - 2.6% 轻资产 CapEx → 零有息负债 CHF 13.39亿现金 + $10亿 Class A 回购',
    enF: 'Cash Compounding = 21.9% Underlying Adj. EBITDA - 2.6% CapEx Intensity → CHF 1.34B Zero-Debt Cash + $1.0B Class A Share Repurchase',
    zhB: '昂跑在保持 20%+ 固定汇率高增长的同时，年度资本开支仅占营收 2.6%（FY25 CapEx CHF 78.6M）。充沛的造血能力使其现金储备突破 CHF 13.39亿且零银行负债，在创立第 16 年正式跨入<strong>“高增长自筹资金 + 多余现金回购注销回馈股东”</strong>的成熟复利阶段。',
    enB: 'Even while compounding net sales above 20% CC, annual CapEx consumes only 2.6% of revenue (CHF 78.6M in FY25). Surpassing CHF 1.34B in debt-free cash enabled On to authorize its first-ever $1.0B Class A share buyback through 2029.'
   }
  ];

  var NODES = [
   {
    badge: 'NODE 01 · ON LABS ZURICH MATERIAL & STRUCTURAL IP',
    zhT: '苏黎世实验室（CloudTec® / CloudTec Phase™ / Surreal™）：一眼可辨的工程护城河',
    enT: 'On Labs Zurich (CloudTec® / CloudTec Phase™ / Surreal™): Visibly Distinct Swiss IP',
    zhD: '昂跑将苏黎世 17 层全球总部逾 30% 的空间划归生物力学、高分子化学与机器人实验室。不同于传统品牌依赖公模外观微调，昂跑通过镂空云模块物理形变专利（CloudTec®）、有限元计算机优化的多米诺缓震（CloudTec Phase™）及全新 Surreal™ 超临界发泡材料（首发于 Cloudsurfer 3），让跑者在上脚第一秒和街头十米外即可识别，直接支撑 $160–$310 的行业最高主力价格带。',
    enD: 'Over 30% of On\'s 17-story Zurich headquarters is dedicated to biomechanics, polymer chemistry, and robotics labs. Proprietary hollow CloudTec® pods, FEA-optimized CloudTec Phase™, and new Surreal™ supercritical foam (debuting in Cloudsurfer 3) deliver instant visual recognition and step-in feel—supporting an industry-high $160–$310 price corridor.',
    zhF: '商业传导：专利结构视觉辨识度 + 实验室实测能量回馈 → 无需降价引流即可收获自然口碑复购（品牌全球认知度逼近 30%）',
    enF: 'Value Capture: Patented visual silhouette + lab-proven energy return → Organic word-of-mouth velocity at full price (~30% global awareness)',
    kpisZh: [['>30%', '苏黎世总部大楼研发实验面积占比'], ['$160–$310', '核心跑鞋与 LightSpray 旗舰定价带'], ['66.9%', 'Q3 2026 剔除退税后基础毛利率'], ['90+ 国', '全球高端专业跑店与直营网络覆盖']],
    kpisEn: [['>30%', 'Zurich HQ Floor Space Dedicated to Labs'], ['$160–$310', 'Core Running & LightSpray Flagship ASP'], ['66.9%', 'Q3 2026 Underlying Gross Margin'], ['90+ Countries', 'Global Run-Specialty & DTC Footprint']]
   },
   {
    badge: 'NODE 02 · LIGHTSPRAY™ ROBOTIC NEARSHORING REVOLUTION',
    zhT: 'LightSpray™ 3分钟一体喷织：把传统 200 道制鞋工序压缩为 1 道机械臂程序',
    enT: 'LightSpray™ 3-Min Robotic Spraying: Compressing 200 Shoe Steps into One Sequence',
    zhD: '传统运动鞋面需跨越数家亚洲代工厂经历纺纱、织造、裁剪、缝纫与胶水粘合等约 200 道人工工序；昂跑独创的 LightSpray™ 机械臂在 3 分钟内将 1.5 公里热塑性长丝直接喷织在鞋楦上，制成仅重 30 克的无接缝、无鞋带、无胶水一体鞋面（全鞋仅 8 个部件，鞋面碳排骤降 75%）。继 2025 年苏黎世 4 台机械臂首厂投产后，2026 年 2 月韩国釜山 32 台全自动机械臂工厂正式投运，年内产能激增 30 倍。',
    enD: 'Traditional shoe uppers span ~200 manual cutting, sewing, and gluing steps across multiple factories. On\'s LightSpray™ robot sprays 1.5 km of filament onto a mold in 3 minutes to form a 30g seamless, glue-free upper (8 total shoe parts, -75% upper CO₂). Following Zurich\'s 4-robot plant (2025), On opened a 32-robot automated factory near Busan, South Korea in Feb 2026—expanding LightSpray capacity 30-fold.',
    zhF: '商业传导：程序化复制无惧高人工成本 → 解锁欧美近岸制造规避关税风险 + 支撑 $280–$310 超高端科技溢价',
    enF: 'Value Capture: Programmable robotics decouples labor cost → Unlocks Americas/EU nearshoring against tariffs + commands $280–$310 ASP',
    kpisZh: [['3 分钟 / 30g', '1.5公里长丝一体喷织无胶超轻鞋面'], ['36 台机械臂', '苏黎世 4 台 + 韩国釜山 32 台在役'], ['30x 产能跃升', '2026 年全球自动化喷织产能扩张倍数'], ['-75% 碳排放', '相比传统裁剪缝制鞋面减碳幅度']],
    kpisEn: [['3 Min / 30g', '1.5km Single-Filament Glue-Free Upper'], ['36 Robots', '4 in Zurich HQ + 32 in Busan Plant'], ['30x Scale-Up', '2026 Global LightSpray Capacity Jump'], ['-75% CO₂', 'Upper Carbon Reduction vs Legacy Cut-Sew']]
   },
   {
    badge: 'NODE 03 · PODIUM CREDIBILITY & CO-ENTREPRENEUR EQUITY',
    zhT: '大满贯领奖台实证 + 股权合伙人制：用运动员真实战绩替代烧钱流量广告',
    enT: 'Grand Slam & Marathon Podiums + Equity Partnerships Over Paid Ad Spend',
    zhD: '昂跑拒绝传统运动品牌动辄数亿美元的铺天盖地硬广，而是首创“共同创业者（Co-Entrepreneur）”股权绑定：2019 年罗杰·费德勒入股约 3% 并深度参与研发 THE ROGER 系列（2021 年以来净营收年复合增长 61%）；马拉松名将 Hellen Obiri 穿 LightSpray 战靴刷新纽约马拉松赛道纪录，Q3 2026 后昂跑更首次包揽纽约马拉松男女双领奖台，并携姆巴佩（股权合作）与亨利引爆品牌史上最高曝光时刻。',
    enD: 'Instead of brute-force ad buying, On pioneered equity Co-Entrepreneurships: Roger Federer (~3% stake) co-developed THE ROGER franchise (61% CAGR since 2021); Hellen Obiri broke the NYC Marathon course record in LightSpray, On achieved double NYC Marathon podiums in 2026, and Kylian Mbappé + Thierry Henry catalyzed the most-viewed brand moment in On\'s history.',
    zhF: '商业传导：奥运与大满贯真实夺冠背书 → 专业跑圈与网球/足球意见领袖自发种草 → 极低获客折让率',
    enF: 'Value Capture: Authentic championship victories → Run-club & court tastemaker advocacy → High organic customer acquisition',
    kpisZh: [['~3% 股权共创', '费德勒深度参与研发而非纯挂名代言'], ['2:19:51 破纪录', 'Obiri 穿 LightSpray 夺冠刷新纽马纪录'], ['男女双领奖台', '2026 纽约大满贯马拉松历史性突破'], ['姆巴佩 + 亨利', '创品牌史上最高全球社交媒体触达']],
    kpisEn: [['~3% Equity', 'Federer Co-Entrepreneur Lab Partnership'], ['2:19:51 Record', 'Obiri NYC Marathon Course Record in LS'], ['Double Podium', 'Historic Men\'s & Women\'s NYC Marathon'], ['Mbappé + Henry', 'Most-Viewed Brand Launch in On History']]
   },
   {
    badge: 'NODE 04 · CURATED WHOLESALE & HIGH-PRODUCTIVITY DTC HUBS',
    zhT: '精选批发门禁与旗舰店剧场：宁可主动压降发货，绝不向折扣渠道妥协',
    enT: 'Selective Wholesale Gatekeeping & Flagship Brand Hubs: Zero Compromise on Price',
    zhD: '昂跑对全球批发网点实行严格的准入审批与配额管理（重点深耕专业跑店与高端百货如 Nordstrom、Selfridges），在 2026Q2 行业大促潮中果断克制美国批发端发货以保护终端正价率。与此同时，全球近 100 家自营品牌旗舰店（如巴黎香街、东京银座、深圳万象天地）以美术馆级空间呈现全系鞋服，驱动 Q3 2026 DTC 净营收大涨 +25.0% 至 CHF 393.3M（占比升至 42.2%）。',
    enD: 'On enforces strict wholesale door curation and allocation—deliberately holding back US Q2 2026 sell-in to protect full-price sell-out. Meanwhile, nearly 100 owned retail Brand Hubs (Paris, Tokyo, NYC, Shenzhen) showcase full toe-to-head assortments, driving Q3 2026 DTC sales +25.0% YoY to CHF 393.3M (42.2% of total sales).',
    zhF: '商业传导：批发端严控供给造就最高正价率 + 自营 DTC 占比迈向 50% → 驱动基础毛利率站上 66.9% 峰值',
    enF: 'Value Capture: Wholesale scarcity discipline + DTC marching toward 50% mix → Propels underlying gross margin to 66.9%',
    kpisZh: [['42.2%', 'Q3 2026 DTC 直营渠道营收占比 (+260bps)'], ['CHF 393.3M', 'Q3 2026 单季 DTC 营收 (+25.0% YoY)'], ['~100 → ~180家', '未来三年全球高坪效自营门店扩张路径'], ['+106.7% CC', 'FY2025 亚太区净营收固定汇率爆发增速']],
    kpisEn: [['42.2%', 'Q3 2026 DTC Revenue Share (+260bps YoY)'], ['CHF 393.3M', 'Q3 2026 Quarterly DTC Sales (+25.0%)'], ['~100 → ~180', '3-Year Owned Retail Brand Hub Target'], ['+106.7% CC', 'FY2025 APAC Constant-Currency Surge']]
   },
   {
    badge: 'NODE 05 · TOE-TO-HEAD EXPANSION & SHAREHOLDER COMPOUNDING',
    zhT: '全身服饰破局与高质量复利器：从 30亿迈向 56亿+ 瑞郎并开启 $10亿回购',
    enT: 'Toe-to-Head Apparel Scaling & Capital Return: Marching to CHF 5.6B+ & $1B Buyback',
    zhD: '过去运动鞋新贵往往困于单一鞋履品类，而昂跑通过“Win with Her”女性战略与 Zendaya 合作系列成功撕开高毛利服饰缺口：9M 2026 服饰净营收达 CHF 179.0M（+49.3% CC，已超 2025 全年）。随着规模跨过 CHF 30亿拐点，SG&A 经营杠杆加速释放，2026 投资者日正式确立 2029 年净营收 ≥CHF 5.6B（约 $7B）、Adjusted EBITDA 率 ≥22% 及首轮 $10亿美元股票回购目标。',
    enD: 'Breaking the footwear-only ceiling, On\'s "Win with Her" strategy and Zendaya collections drove 9M 2026 apparel sales +49.3% CC to CHF 179.0M (already topping full-year 2025). With SG&A leverage kicking in past CHF 3B scale, On\'s 2026 Investor Day set 2029 targets of ≥CHF 5.6B sales, ≥22% Adj. EBITDA margin, and an inaugural $1.0B Class A buyback.',
    zhF: '商业传导：服饰连带率翻倍 + SG&A 规模摊薄 → 2026–2029E Adjusted EBITDA 年复合增速超 +20%',
    enF: 'Value Capture: Apparel cross-sell + SG&A scale leverage → >20% Adjusted EBITDA CAGR through 2029 + $1B share retirement',
    kpisZh: [['CHF 179.0M', '9M 2026 服饰营收 (+49.3% CC 超去年全年)'], ['≥CHF 5.6B', '2029 净营收目标（折合近 $70亿美元）'], ['≥22.0%+', '2029 Adjusted EBITDA 利润率承诺目标'], ['USD 1.0B', '至 2029 年底首轮 Class A 股票回购授权']],
    kpisEn: [['CHF 179.0M', '9M 2026 Apparel Sales (+49.3% CC)'], ['≥CHF 5.6B', '2029 Net Sales Target (~$7.0B USD)'], ['≥22.0%+', '2029 Adjusted EBITDA Margin Target'], ['USD 1.0B', 'Inaugural Class A Buyback Through 2029']]
   }
  ];

  var COHORTS = {
   solo: {
    statsZh: [['典型购置组合', '单双 Cloud 6 / Cloudrunner 3', '多经由精选跑店或百货首购'], ['全价购买比例', '~86%', '极少参与黑五深度打折'], ['年均客单贡献 (CHF)', 'CHF 165 / 年', '约 12–14 个月复购周期'], ['5年累计单客毛利 LTV', 'CHF 510', '贡献稳健批发/电商基础毛利']],
    statsEn: [['Typical Basket', 'Single Cloud 6 / Cloudrunner 3', 'Acquired via run-specialty or web'], ['Full-Price Share', '~86%', 'Minimal holiday markdown exposure'], ['Annual Spend (CHF)', 'CHF 165 / yr', '~12–14 month replacement cycle'], ['5Y Gross Profit LTV', 'CHF 510', 'High-margin entry funnel cohort']],
    noteZh: '<strong>路跑入门层特征：</strong>消费者往往因膝盖缓震需求或朋友推荐购入第一双 Cloud 系列，一旦习惯瑞士云模块落地缓震脚感与免系带系统，下次换鞋回归率显著高于行业均值。',
    noteEn: '<strong>Entry Runner Cohort:</strong> Customers typically enter via run-specialty fitting or peer referral; once accustomed to CloudTec® cushioning and speed-lacing comfort, repeat retention markedly exceeds footwear averages.'
   },
   core: {
    statsZh: [['典型购置组合', 'Cloudsurfer 3 + Cloudtilt', '跑步机能向日常办公室自然溢出'], ['全价购买比例', '> 90%', '行业最低促销折让率'], ['年均客单贡献 (CHF)', 'CHF 410 / 年', '跑鞋 500–800km 物理磨损自然复购'], ['5年累计单客毛利 LTV', 'CHF 1,280', '约为单双批发买家的 2.5 倍']],
    statsEn: [['Typical Basket', 'Cloudsurfer 3 + Cloudtilt', 'Run performance spills into daily wear'], ['Full-Price Share', '> 90%', 'Lowest promotional share in industry'], ['Annual Spend (CHF)', 'CHF 410 / yr', '500–800km outsole wear cycle'], ['5Y Gross Profit LTV', 'CHF 1,280', '~2.5x wholesale single-pair buyer']],
    noteZh: '<strong>物理耗材复购 × 社交身份棘轮（Movement Class Identity）：</strong>跑鞋中底泡棉在 500–800 公里后存在刚性物理衰减，天然具备类似“软件订阅”的年度复购属性；而日常通勤鞋 Cloudtilt 的加入直接令年客单价翻倍 <a class="cite-link" href="https://stockanalysis.com/stocks/onon/transcripts/748336-investor-day-2026/" target="_blank" rel="noopener noreferrer">2026 投资者日实录 ↗</a>。',
    noteEn: '<strong>Consumable Midsole + Lifestyle Spillover:</strong> Running midsoles physically compress after 500–800 km, creating subscription-like annual replacement, while adding an all-day Cloudtilt sneaker doubles annual spend <a class="cite-link" href="https://stockanalysis.com/stocks/onon/transcripts/748336-investor-day-2026/" target="_blank" rel="noopener noreferrer">Investor Day 2026 ↗</a>.'
   },
   ultra: {
    statsZh: [['典型购置组合', 'LightSpray 超跑 + ROGER + 全套服饰', '直营旗舰店沉浸式全品类买家'], ['全价购买比例', '~96%+', '限量联名与首发科技零折扣抢购'], ['年均客单贡献 (CHF)', 'CHF 860+ / 年', '覆盖跑步、网球、旅行与功能外套'], ['5年累计单客毛利 LTV', 'CHF 2,890+', '超 65% 交易发生于高毛利自营 DTC']],
    statsEn: [['Typical Basket', 'LightSpray + THE ROGER + Apparel', 'Flagship multi-category loyalist'], ['Full-Price Share', '~96%+', 'Zero-discount limited & tech drops'], ['Annual Spend (CHF)', 'CHF 860+ / yr', 'Spans run, court, travel & outerwear'], ['5Y Gross Profit LTV', 'CHF 2,890+', '>65% transacted via owned DTC']],
    noteZh: '<strong>全身穿搭超级客群（Toe-to-Head）：</strong>在深圳、巴黎、纽约等自营旗舰店中，服饰销售占比已突破 20%（THE ROGER 网球客群更创下全公司第 1 的客户 LTV），验证了昂跑从“鞋履专家”升维至“高奢运动生活方式品牌”的巨大单客弹性。',
    noteEn: '<strong>Flagship Toe-to-Head Super-Fans:</strong> In flagship stores like Shenzhen and Paris, apparel exceeds 20% of sales while THE ROGER franchise ranks #1 in customer LTV across On—proving massive multi-category expansion upside.'
   }
  };

  function renderLens() {
   var l = LENSES[state.lens] || LENSES[0];
   document.getElementById('lensFormula').textContent = isEn() ? l.enF : l.zhF;
   document.getElementById('lensBody').innerHTML = isEn() ? l.enB : l.zhB;
  }

  function renderNode() {
   var nd = NODES[state.node] || NODES[0];
   document.getElementById('nodeBadge').textContent = nd.badge;
   document.getElementById('nodeTitle').textContent = isEn() ? nd.enT : nd.zhT;
   document.getElementById('nodeDesc').textContent = isEn() ? nd.enD : nd.zhD;
   document.getElementById('nodeFormula').textContent = isEn() ? nd.enF : nd.zhF;
   var kpis = isEn() ? nd.kpisEn : nd.kpisZh;
   document.getElementById('nodeKpis').innerHTML = kpis.map(function (k) {
    return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
   }).join('');
  }

  function renderCohort() {
   var c = COHORTS[state.cohort] || COHORTS.core;
   var stats = isEn() ? c.statsEn : c.statsZh;
   document.getElementById('cohortMetrics').innerHTML = stats.map(function (s, idx) {
    var isMono = idx > 0 ? ' mono' : '';
    var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
    return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
   }).join('');
   document.getElementById('cohortNote').innerHTML = isEn() ? c.noteEn : c.noteZh;
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
   if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Mode' : '已切换至深空暗色模式') : (isEn() ? 'Switched to Light Mode' : '已切换至清晰浅色模式'));
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
   var leadEl = document.getElementById('heroLeadText');
   if (leadEl) leadEl.innerHTML = isEn() ? HERO_LEAD.en : HERO_LEAD.zh;
   var qIn = document.getElementById('quickJumpInput');
   if (qIn) qIn.placeholder = isEn() ? 'Jump to module or metric…' : '检索模块或财务指标…';
   renderLens();
   renderNode();
   renderCohort();
   drawAllCharts();
   if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文视图');
  }

  // Interactive Event Listeners
  document.getElementById('lensTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-lens]');
   if (!b) return;
   state.lens = parseInt(b.getAttribute('data-lens'), 10) || 0;
   var all = this.querySelectorAll('.mui-seg-btn');
   for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
   renderLens();
  });

  document.getElementById('pipelineTrack').addEventListener('click', function (e) {
   var btn = e.target.closest('[data-node]');
   if (!btn) return;
   state.node = parseInt(btn.getAttribute('data-node'), 10) || 0;
   var bs = this.querySelectorAll('.bm-node-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
   renderNode();
  });

  document.getElementById('tierFilter').addEventListener('click', function (e) {
   var b = e.target.closest('[data-tcat]');
   if (!b) return;
   var cat = b.getAttribute('data-tcat');
   var bs = this.querySelectorAll('.mui-seg-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
   var cards = document.querySelectorAll('#tierList [data-tier]');
   for (var j = 0; j < cards.length; j++) {
    cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
   }
  });

  document.getElementById('cohortTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-cohort]');
   if (!b) return;
   state.cohort = b.getAttribute('data-cohort');
   var bs = this.querySelectorAll('.mui-seg-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
   renderCohort();
  });

  document.getElementById('peerFilter').addEventListener('click', function (e) {
   var b = e.target.closest('[data-pcat]');
   if (!b) return;
   var cat = b.getAttribute('data-pcat');
   var bs = this.querySelectorAll('.mui-seg-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
   var rows = document.querySelectorAll('#peerTable tbody tr');
   for (var j = 0; j < rows.length; j++) {
    var rc = rows[j].getAttribute('data-row-cat') || '';
    rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
   }
  });

  // Suite Hub Filter & Safe Sibling Click Handler (Zero Auto-Scroll on Load)
  var hub = document.getElementById('companySubfolderHub');
  if (hub) {
   hub.addEventListener('click', function (e) {
    var pill = e.target.closest('[data-co-cat]');
    if (pill) {
     var cat = pill.getAttribute('data-co-cat');
     var ps = hub.querySelectorAll('[data-co-cat]');
     for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === pill);
     var its = hub.querySelectorAll('[data-co-item-cat]');
     for (var j = 0; j < its.length; j++) {
      its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
     }
     return;
    }
    var item = e.target.closest('[data-sibling-doc]');
    if (item) {
     if (item.getAttribute('data-self-doc') === '1') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
     } else {
      var fname = item.getAttribute('data-sibling-doc');
      showToast(isEn() ? ('Companion file in 4-page suite: ' + fname) : ('请打开同套交付网页：《' + fname + '》'));
     }
    }
   });
  }

  document.querySelector('[data-scroll-top="1"]').addEventListener('click', function () {
   window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // High-DPI Retina Canvas Engine
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
   var pad = { top: 28, right: 20, bottom: 42, left: 56 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

   if (state.pView === 'waterfall') {
    var steps = [
     { lbl: isEn() ? 'Wholesale' : '精选批发', val: 1753.4, base: 0, col: pal.blue, tip: 'FY2025 Wholesale Net Sales: CHF 1,753.4M (+32.6% CC · 58.2% share)' },
     { lbl: isEn() ? '+DTC Sales' : '+DTC直营', val: 1260.5, base: 1753.4, col: pal.green, tip: 'FY2025 DTC Net Sales: +CHF 1,260.5M (+39.9% CC) → Total CHF 3,014.0M' },
     { lbl: isEn() ? '=Gross Profit' : '=总毛利', val: 1893.6, base: 0, col: pal.violet, tip: 'FY2025 Gross Profit: CHF 1,893.6M (+34.7% YoY · 62.8% Gross Margin)' },
     { lbl: isEn() ? 'Adj. EBITDA' : 'Adj.EBITDA', val: 567.0, base: 0, col: pal.green, tip: 'FY2025 Adjusted EBITDA: CHF 567.0M (+46.3% YoY · 18.8% Margin)' },
     { lbl: isEn() ? 'Op. Result' : '营业利润', val: 377.0, base: 0, col: pal.blue, tip: 'FY2025 Operating Result (EBIT): CHF 377.0M (+78.2% YoY · 12.5% Margin)' },
     { lbl: isEn() ? 'Free Cash' : '自由现金流', val: 280.9, base: 0, col: pal.amber, tip: 'FY2025 FCF: CHF 280.9M (OCF CHF 359.5M - CapEx CHF 78.6M; Q3\'26 single-quarter OCF reached CHF 413.3M)' }
    ];
    var maxV = 3300;
    for (var g = 0; g <= 4; g++) {
     var gv = Math.round((maxV / 4) * g);
     var gy = pad.top + ph - (g / 4) * ph;
     ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
     ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(gv + 'M', pad.left - 7, gy + 4);
    }
    var slotW = pw / steps.length;
    var barW = Math.min(46, slotW * 0.58);
    steps.forEach(function (s, i) {
     var x = pad.left + i * slotW + (slotW - barW) / 2;
     var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
     var yBot = pad.top + ph - (s.base / maxV) * ph;
     var bh = Math.max(5, yBot - yTop);
     ctx.fillStyle = s.col;
     roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(Math.round(s.val) + 'M', x + barW / 2, yTop - 6);
     ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
     ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
     hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl + ' (CHF)', body: s.tip });
    });
   } else {
    var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', "Q3'26*"];
    var gmArr = [59.4, 56.0, 59.6, 60.6, 62.8, 66.9];
    var dtcArr = [38.1, 36.4, 37.5, 40.7, 41.8, 42.2];
    var ebArr = [13.3, 13.5, 15.5, 16.7, 18.8, 21.9];
    var minM = 10, maxM = 72;
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
       ctx.fillText(v.toFixed(1) + '%', px, py - 8);
      }
      hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
     });
    }
    yrs.forEach(function (y, idx) {
     var px = pad.left + (idx / (yrs.length - 1)) * pw;
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(y, px, pad.top + ph + 20);
    });
    plotLine(gmArr, pal.green, isEn() ? 'Underlying Gross Margin' : '基础毛利率 Gross Margin');
    plotLine(dtcArr, pal.violet, isEn() ? 'DTC Revenue Share' : 'DTC 直营营收占比');
    plotLine(ebArr, pal.blue, isEn() ? 'Underlying Adj. EBITDA Margin' : '基础 Adj. EBITDA 利润率');
   }
  }

  function drawCohortCanvas() {
   var env = prepCanvas('cohortCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hitRegions.cohortCanvas = [];
   var pad = { top: 28, right: 24, bottom: 42, left: 56 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

   if (state.cView === 'ltv') {
    var xLbls = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
    var solo = [105, 205, 308, 410, 510];
    var core = [255, 510, 765, 1020, 1280];
    var ultra = [560, 1140, 1720, 2300, 2890];
    var maxL = 3200;
    for (var g = 0; g <= 4; g++) {
     var gv = (maxL / 4) * g;
     var gy = pad.top + ph - (g / 4) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText('CHF ' + gv.toFixed(0), pad.left - 6, gy + 4);
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
       ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
       ctx.fillText('CHF ' + v, px - 6, py - 8);
      }
      hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '5Y Cumulative Gross Profit: CHF ' + v });
     });
    }
    xLbls.forEach(function (lb, idx) {
     var px = pad.left + (idx / (xLbls.length - 1)) * pw;
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(lb, px, pad.top + ph + 20);
    });
    drawCurve(ultra, pal.violet, isEn() ? 'Flagship Toe-to-Head' : '全身穿搭超级客群');
    drawCurve(core, pal.blue, isEn() ? 'Run + Sneaker Dual' : '跑训+通勤双栖客群');
    drawCurve(solo, pal.amber, isEn() ? 'Single-Pair Entry' : '单双跑鞋入门客群');
   } else {
    var peers = [
     { name: "On (Q3'26*)", gm: 66.9, col: pal.green, tip: 'On Q3 2026 underlying GM: 66.9% (72.6% reported; FY25 full-year 62.8%)' },
     { name: 'Birkenstock', gm: 59.1, col: pal.blue, tip: 'Birkenstock FY25 & Q3 FY26 Gross Margin: 59.1%' },
     { name: 'Lululemon', gm: 58.5, col: pal.violet, tip: 'Lululemon FY24–FY25 Gross Margin: ~58.5%–59.2%' },
     { name: 'Deckers (HOKA)', gm: 57.0, col: pal.blue, tip: 'Deckers Brands FY26 Gross Margin: ~57.0% (Q4 57.6%)' },
     { name: 'Nike (FY26)', gm: 42.9, col: pal.amber, tip: 'Nike FY2026 Form 10-K Gross Margin: 42.9%' }
    ];
    var maxG = 75;
    for (var k = 0; k <= 3; k++) {
     var kv = k * 25;
     var ky = pad.top + ph - (kv / maxG) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(kv + '%', pad.left - 8, ky + 4);
    }
    var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
    peers.forEach(function (p, i) {
     var x = pad.left + i * slot + (slot - bw) / 2;
     var bh = (p.gm / maxG) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = p.col;
     roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(p.gm.toFixed(1) + '%', x + bw / 2, yt - 6);
     ctx.fillStyle = i === 0 ? pal.green : pal.sub; ctx.font = (i === 0 ? 'bold ' : '600 ') + '10.5px sans-serif';
     ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
     hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name, body: p.tip });
    });
   }
  }

  function drawCapitalCanvas() {
   var env = prepCanvas('capitalCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hitRegions.capitalCanvas = [];
   var pad = { top: 28, right: 20, bottom: 42, left: 56 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

   if (state.kView === 'cash') {
    var yrs = ['FY22', 'FY23', 'FY24', 'FY25', "Q3'26"];
    var cash = [371.0, 494.6, 924.3, 1019.9, 1339.0];
    var maxC = 1500;
    for (var g = 0; g <= 3; g++) {
     var cv = g * 500;
     var cy = pad.top + ph - (cv / maxC) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, cy); ctx.lineTo(pad.left + pw, cy); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(cv + 'M', pad.left - 7, cy + 4);
    }
    var slot = pw / yrs.length, bw = Math.min(44, slot * 0.56);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot + (slot - bw) / 2;
     var bh = (cash[i] / maxC) * ph, yTop = pad.top + ph - bh;
     ctx.fillStyle = (i === yrs.length - 1) ? pal.green : pal.blue;
     roundRect(ctx, x, yTop, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(cash[i].toFixed(0) + 'M', x + bw / 2, yTop - 6);
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
     ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
     hitRegions.capitalCanvas.push({ x: x, y: yTop, w: bw, h: bh, title: y + ' Cash & Equivalents', body: 'CHF ' + cash[i].toFixed(1) + 'M (Zero drawn financial debt)' });
    });
   } else {
    var regs = [
     { name: 'Americas (CHF 1,740.1M)', cc: 23.4, col: pal.blue, tip: 'FY25 Americas Net Sales: CHF 1,740.1M (+23.4% CC · 57.7% of total)' },
     { name: 'EMEA (CHF 762.7M)', cc: 34.7, col: pal.violet, tip: 'FY25 EMEA Net Sales: CHF 762.7M (+34.7% CC · Q3\'26 topped CHF 251.4M)' },
     { name: 'Asia-Pacific (CHF 511.1M)', cc: 106.7, col: pal.green, tip: 'FY25 APAC Net Sales: CHF 511.1M (+106.7% CC — more than doubled YoY!)' },
     { name: 'Apparel Category (CHF 169.9M)', cc: 75.5, col: pal.amber, tip: 'FY25 Apparel Net Sales: CHF 169.9M (+75.5% CC; 9M26 +49.3% CC to CHF 179.0M)' }
    ];
    var rowH = ph / regs.length;
    var maxG = 120;
    regs.forEach(function (it, idx) {
     var cy2 = pad.top + idx * rowH + rowH / 2;
     var bh2 = 22;
     var barLen = (it.cc / maxG) * (pw * 0.82);
     ctx.fillStyle = it.col;
     roundRect(ctx, pad.left, cy2 - 2, barLen, bh2, 5); ctx.fill();
     ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
     ctx.fillText(it.name, pad.left, cy2 - 8);
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
     ctx.fillText('+' + it.cc.toFixed(1) + '% CC', pad.left + barLen + 8, cy2 + 13);
     hitRegions.capitalCanvas.push({ x: pad.left, y: cy2 - 18, w: pw, h: 42, title: it.name, body: it.tip });
    });
   }
  }

  // Interactive 5Y Compounder Simulator
  var simData = { ebPerSh: [1.62, 2.04, 2.52, 3.12, 3.82, 4.46] };
  function drawSimMiniCanvas() {
   var env = prepCanvas('simMiniCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   var pad = { top: 22, right: 18, bottom: 26, left: 48 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var yrs = ['FY25', 'FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E'];
   var arr = simData.ebPerSh;
   var maxE = Math.max(4.5, Math.ceil(Math.max.apply(null, arr) * 1.18));
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
    ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
    ctx.fillText('CHF ' + v.toFixed(2), px, py - 8);
    ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.fillText(yrs[i], px, pad.top + ph + 16);
   });
  }

  function runSimulator() {
   var gDtc = parseFloat(document.getElementById('inpDtcCagr').value) / 100;
   var gWhs = parseFloat(document.getElementById('inpWhsCagr').value) / 100;
   var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
   document.getElementById('lblDtcCagr').textContent = (gDtc * 100).toFixed(1) + '%';
   document.getElementById('lblWhsCagr').textContent = (gWhs * 100).toFixed(1) + '%';
   document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

   var whs = 1.7534, dtc = 1.2605, sh = 334.0; // CHF Billions, diluted economic share eq (M)
   var baseEbPerSh = 0.567 / 0.334; // CHF 1.70/sh
   var arr = [baseEbPerSh];
   for (var y = 1; y <= 5; y++) {
    whs *= (1 + gWhs);
    dtc *= (1 + gDtc);
    sh *= (1 - buy);
    var tot = whs + dtc;
    var dtcMix = dtc / tot;
    var ebMargin = Math.min(0.248, 0.188 + (dtcMix - 0.418) * 0.32 + y * 0.005);
    var eb = tot * ebMargin * 1000; // CHF M
    arr.push(eb / sh);
   }
   var fy30Rev = whs + dtc;
   var fy30DtcMix = (dtc / fy30Rev) * 100;
   var fy30EbMargin = Math.min(0.248, 0.188 + (dtc / fy30Rev - 0.418) * 0.32 + 0.025);
   var fy30Eb = fy30Rev * fy30EbMargin;
   var cagr = (Math.pow(arr[5] / arr[0], 0.2) - 1) * 100;

   document.getElementById('simRevOut').textContent = 'CHF ' + fy30Rev.toFixed(2) + 'B';
   document.getElementById('simDtcOut').textContent = fy30DtcMix.toFixed(1) + '%';
   document.getElementById('simEbitdaOut').textContent = 'CHF ' + fy30Eb.toFixed(2) + 'B';
   document.getElementById('simCagrOut').textContent = (cagr >= 0 ? '+' : '') + cagr.toFixed(1) + '%';
   simData.ebPerSh = arr;
   drawSimMiniCanvas();
  }

  ['inpDtcCagr', 'inpWhsCagr', 'inpBuyRate'].forEach(function (id) {
   document.getElementById(id).addEventListener('input', runSimulator);
  });

  var PRESETS = {
   bear: { d: 15.0, w: 7.5, b: 1.0 },
   base: { d: 23.0, w: 13.5, b: 1.8 },
   bull: { d: 28.0, w: 17.5, b: 2.5 }
  };
  document.getElementById('simPresets').addEventListener('click', function (e) {
   var b = e.target.closest('[data-preset]');
   if (!b) return;
   var k = b.getAttribute('data-preset');
   var bs = this.querySelectorAll('.mui-seg-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
   var pr = PRESETS[k] || PRESETS.base;
   document.getElementById('inpDtcCagr').value = pr.d;
   document.getElementById('inpWhsCagr').value = pr.w;
   document.getElementById('inpBuyRate').value = pr.b;
   runSimulator();
  });

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
     tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
     tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
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

  // Quick Jump ⌘K
  var QUICK_ITEMS = [
   { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'CHF 3,014M 营收 · Q3\'26 66.9% 基础毛利率 · 全价控货漏斗' },
   { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '苏黎世专利 → LightSpray 3分钟喷织 → 领奖台 → 全价DTC → 回购' },
   { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与产品矩阵', s: 'CHF 567M Adj. EBITDA · 路跑/网球/LOEWE/服饰四层价格带' },
   { id: 'mod-cohort', t: 'M3 全身穿搭棘轮与单客 LTV', s: '跑鞋耗材复购 + 服饰扩圈 · 66.9% 毛利率领跑全球运动行业' },
   { id: 'mod-capital', t: 'M4 CHF 13.39亿净现金与复利器', s: '零有息负债 · 2.6% CapEx · $10亿回购与 2030 模拟推演' },
   { id: 'mod-matrix', t: 'M5 运动巨头对标与三大风险压测', s: 'ONON vs Deckers(HOKA) / Lululemon / Birkenstock / Nike' }
  ];
  var qInput = document.getElementById('quickJumpInput');
  var qPop = document.getElementById('quickJumpPopover');
  function renderQuick(q) {
   var kw = (q || '').trim().toLowerCase();
   var matched = QUICK_ITEMS.filter(function (it) {
    return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1;
   });
   qPop.innerHTML = matched.map(function (it) {
    return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
   }).join('');
   qPop.classList.toggle('open', matched.length > 0);
  }
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
  document.addEventListener('keydown', function (e) {
   if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qInput.focus(); }
   if (e.key === 'Escape') { qPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
  });

  // Sidebar Toggle, Export HTML & Print
  var sbBtn = document.getElementById('sidebarToggleBtn');
  var sb = document.getElementById('muiSidebar');
  var bd = document.getElementById('drawerBackdrop');
  sbBtn.addEventListener('click', function () {
   if (window.innerWidth < 1024) {
    var open = sb.classList.toggle('open');
    bd.classList.toggle('open', open);
   } else {
    var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
    if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
    else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
    try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
    setTimeout(drawAllCharts, 60);
   }
  });
  bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

  
  

  // Theme & Language Controls
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

  window.addEventListener('scroll', function () {
   var bar = document.getElementById('readingProgressBar');
   var docH = document.documentElement.scrollHeight - window.innerHeight;
   bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
  }, { passive: true });

  // Stress Checkboxes Persistence
  try {
   var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
   document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
    var k = chk.getAttribute('data-stress-chk');
    chk.checked = !!savedChk[k];
    chk.addEventListener('change', function () {
     savedChk[k] = chk.checked;
     try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
     showToast(chk.checked ? (isEn() ? 'Added to quarterly watchlist' : '已加入重点跟踪清单') : (isEn() ? 'Removed from watchlist' : '已取消跟踪标记'));
    });
   });
  } catch (e) {}

  try {
   if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
   applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
   applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
  } catch (e) {}

  var resizeTimer = null;
  window.addEventListener('resize', function () {
   clearTimeout(resizeTimer);
   resizeTimer = setTimeout(drawAllCharts, 90);
  });

  runSimulator();
  drawAllCharts();
 })();
 