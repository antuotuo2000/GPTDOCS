
 (function () {
  'use strict';

  var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
  var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
  var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

  var state = { theme: 'dark', lang: 'zh', hz: 0, eng: 0, fView: 'bridge', sView: 'robots', mult: 22 };
  var hits = { futureCanvas: [], siliconCanvas: [] };

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
    violet: dark ? '#A78BFA' : '#7C3AED',
    green: dark ? '#22C55E' : '#16A34A',
    amber: dark ? '#FFB74D' : '#D97706',
    red: dark ? '#FF6B6B' : '#DC2626'
   };
  }

  var F0_LEAD = {
   zh: '跨越年营收 <strong>CHF 30亿</strong>里程碑后，昂跑于 2026 年 5 月 1 日完成关键治理升级：联合创始人 <strong>David Allemann 与 Caspar Coppetti 正式重掌联席 CEO</strong>，前戴森（Dyson）18 年运营老将 <strong>Scott Maguire 升任总裁兼 COO</strong> 统管研发、制造至全球商业化全价值链，前皇家阿霍德 CFO <strong>Frank Sluis 接掌财务大印</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1858985/000095010326004606/dp244091_ex9901.htm" target="_blank" rel="noopener noreferrer">SEC 治理重构公报 ↗</a>。 2026 年 9 月 22 日苏黎世投资者日上，新班底首次抛出面向<strong>“运动阶层（Movement Class——将运动视为身份认同而非工具的新世代）”</strong>的十年破局路线图：对内以 <strong>Surreal™ 超临界发泡</strong>全系换代核心跑鞋，并以韩国釜山 <strong>32 台全自动 LightSpray™ 机械臂</strong>（2026 产能暴增 30 倍）开启无胶近岸制鞋革命 <a class="cite-link" href="https://www.sgieurope.com/manufacture/on-opens-korea-robot-factory-to-cut-supply-chain-risk/119753.article" target="_blank" rel="noopener noreferrer">釜山机械臂工厂 ↗</a>；对外以 <strong>“Win with Her” 女性全身服饰</strong>、<strong>约 180 家品牌旗舰中心</strong>及携手<strong>姆巴佩与亨利进军足球、高尔夫</strong>打开第二、第三增长极，锚定 2029 年净营收 <strong>≥CHF 5.6B（约 $70亿美元）</strong>、毛利率 <strong>≥65%</strong> 与首轮 <strong>$10亿股票回购</strong> <a class="cite-link" href="https://investors.on-running.com/news/news-details/2026/On-Enters-Next-Chapter-Unveils-Strategy-to-Redefine-What-a-Sportswear-Brand-Can-Be-Alongside-2029-Financial-Targets/default.aspx" target="_blank" rel="noopener noreferrer">2026 投资者日公报 ↗</a>。',
   en: 'After crossing <strong>CHF 3.0B</strong> in annual sales, On unified its leadership on May 1, 2026: Co-Founders <strong>David Allemann and Caspar Coppetti returned as Co-CEOs</strong>, 18-year Dyson veteran <strong>Scott Maguire became President &amp; COO</strong> overseeing the entire value chain, and <strong>Frank Sluis joined as CFO</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1858985/000095010326004606/dp244091_ex9901.htm" target="_blank" rel="noopener noreferrer">SEC Leadership Filing ↗</a>. At its Sept 22, 2026 Zurich Investor Day, On unveiled its roadmap for the global <strong>"Movement Class"</strong>: refreshing every major running franchise with <strong>Surreal™ superfoams</strong>, scaling <strong>32 automated LightSpray™ robots near Busan</strong> (30x capacity jump in 2026) <a class="cite-link" href="https://www.sgieurope.com/manufacture/on-opens-korea-robot-factory-to-cut-supply-chain-risk/119753.article" target="_blank" rel="noopener noreferrer">Busan Robotics ↗</a>, accelerating <strong>"Win with Her" apparel</strong> across <strong>~180 retail Brand Hubs</strong>, and entering <strong>Football (with Kylian Mbappé &amp; Thierry Henry) and Golf (1H27)</strong>—targeting <strong>≥CHF 5.6B (~$7B)</strong> in 2029 sales, <strong>≥65% GM</strong>, <strong>≥22% Adj. EBITDA</strong>, and a <strong>$1.0B buyback</strong> <a class="cite-link" href="https://investors.on-running.com/news/news-details/2026/On-Enters-Next-Chapter-Unveils-Strategy-to-Redefine-What-a-Sportswear-Brand-Can-Be-Alongside-2029-Financial-Targets/default.aspx" target="_blank" rel="noopener noreferrer">Investor Day 2026 ↗</a>.'
  };

  var HORIZONS = [
   {
    badgeZh: 'HORIZON 1 · 最大产品换代潮兑现期 (2026–2027)',
    badgeEn: 'HORIZON 1 · HIGH-CONVICTION REFRESH CYCLE (2026–2027)',
    titleZh: '核心跑鞋史上最大更新周期 × 釜山30倍产能释放 × 高尔夫首秀',
    titleEn: 'Biggest Running Franchise Refresh × Busan 30x Robotics × Golf Launch',
    itemsZh: [
     '<strong>Surreal™ 全系换血：</strong>Cloudsurfer 3 预售售罄率翻 4 倍、2027 春夏订单翻倍，带动全系跑鞋升级。',
     '<strong>釜山 LightSpray 商业化：</strong>32 台机械臂满产输出 LightSpray Cloudmonster 3 Hyper ($280)。',
     '<strong>新运动破冰：</strong>2026 官宣姆巴佩与亨利足球战略，2027 上半年正式发售高尔夫鞋服产品线。'
    ],
    itemsEn: [
     '<strong>Surreal™ Superfoam Rollout:</strong> Cloudsurfer 3 achieved >4x pre-launch sell-through and 2x SS27 orders.',
     '<strong>Busan LightSpray Ramp:</strong> 32 automated robots scale LightSpray Cloudmonster 3 Hyper ($280) 30-fold.',
     '<strong>New Sports Entry:</strong> Football partnership with Mbappé & Henry live; Golf footwear & apparel launching 1H 2027.'
    ],
    probZh: '兑现确定性：极高 (90%+)', probEn: 'Conviction: Very High (90%+)',
    impZh: '年营收跨度：CHF 3.5B → 4.3B', impEn: 'Sales Scale: CHF 3.5B → 4.3B'
   },
   {
    badgeZh: 'HORIZON 2 · 投资者日 56亿瑞郎收官期 (2028–2029)',
    badgeEn: 'HORIZON 2 · INVESTOR DAY COMPOUNDING TARGET (2028–2029)',
    titleZh: '约 180 家全球旗舰中心落成 × 服饰冲击 3 倍体量 × 欧美近岸机械臂投产',
    titleEn: '~180 Global Brand Hubs × 3x Apparel Scale × Americas/EU LightSpray Plants',
    itemsZh: [
     '<strong>2029 财务里程碑：</strong>净营收突破 ≥CHF 5.6B（近 $70亿美元），基础毛利率稳居 ≥65%，Adj. EBITDA ≥22%+。',
     '<strong>渠道与回购共振：</strong>自营门店扩至 ~180 家推动 DTC 逼近 50%，并执行完毕首轮 $10亿美元股票回购。',
     '<strong>欧美近岸喷织工厂：</strong>在美洲与欧洲落子新一代 LightSpray 自动化产线，实现本地快反与零关税直供。'
    ],
    itemsEn: [
     '<strong>2029 Financial Targets:</strong> Net sales ≥CHF 5.6B (~$7B), gross margin ≥65.0%, and Adj. EBITDA margin ≥22.0%+.',
     '<strong>DTC & Capital Return:</strong> ~180 owned retail hubs push DTC near 50% while executing the $1.0B Class A buyback.',
     '<strong>Western Nearshoring:</strong> First Americas and European LightSpray robotic plants come online for local fulfillment.'
    ],
    probZh: '兑现确定性：中高 (80%)', probEn: 'Conviction: High (80%)',
    impZh: '年营收跨度：CHF 5.0B → 5.8B+', impEn: 'Sales Scale: CHF 5.0B → 5.8B+'
   },
   {
    badgeZh: 'HORIZON 3 · 多运动科技高奢帝国奇点 (2030–2032)',
    badgeEn: 'HORIZON 3 · MULTI-SPORT TECH-LUXURY EMPIRE (2030–2032)',
    titleZh: '足球/网球/高尔夫全面收割 × LightSpray 跨入服饰与定制 × 循环材料闭环',
    titleEn: 'Football/Tennis/Golf Scale × LightSpray Custom Fit & Apparel × Circularity',
    itemsZh: [
     '<strong>多运动全面结果：</strong>足球战靴与高尔夫复刻网球 THE ROGER（61% CAGR）增长轨迹，打开百亿级新市场。',
     '<strong>按脚型 3D 即时喷织：</strong>旗舰店内或区域中心基于足部扫描实现个性化张力分区 LightSpray 定制鞋面。',
     '<strong>CleanCloud® 零碳闭环：</strong>碳排放合成泡棉与无胶单材料鞋身规模化商用，构筑欧美环保法规终极壁垒。'
    ],
    itemsEn: [
     '<strong>Multi-Sport Scale:</strong> Football boots and Golf mirror THE ROGER\'s 61% CAGR across massive global TAMs.',
     '<strong>Bespoke Zonal Spraying:</strong> Foot-scan-driven zonal tension LightSpray customization in flagship hubs.',
     '<strong>CleanCloud® Circular Moat:</strong> Carbon-captured foams and glue-free mono-material recycling at industrial scale.'
    ],
    probZh: '兑现确定性：远期高赔率期权 (55%–65%)', probEn: 'Conviction: Long-Term Optionality (55%–65%)',
    impZh: '远期营收蓝图：CHF 7.5B – 8.5B+', impEn: '2032E Blueprint: CHF 7.5B – 8.5B+'
   }
  ];

  var ENGINES = [
   {
    badge: 'ENGINE 01 · BIGGEST RUNNING INNOVATION CYCLE IN ON HISTORY',
    zhT: '苏黎世泡棉能力中心爆发：Surreal™ 与 Helion™ HF 重塑全系路跑矩阵',
    enT: 'Zurich Foam Competence Center: Surreal™ & Helion™ HF Refresh Every Run Franchise',
    zhD: '在 2026 投资者日上，联席 CEO David Allemann 宣布启动昂跑创立以来最大规模跑鞋换代周期——不再只靠单一镂空形态，而是将自研超临界发泡化学配方（Surreal™ 与 Helion™ HF）与有限元结构力学深度结合。打头阵的 Cloudsurfer 3 在专业跑店预售即创下超 4 倍售罄速度、2027 春夏期货订单翻倍；Cloudmonster 3 家族与破纽马纪录的 Cloudboom Strike 2 紧随其后，牢牢锁死严肃跑者基本盘。',
    enD: 'At the 2026 Investor Day, Co-CEO David Allemann kicked off the largest running innovation cycle in On\'s history—combining proprietary supercritical foams (Surreal™ and Helion™ HF) with structural engineering. Lead launch Cloudsurfer 3 posted >4x pre-launch sell-through and 2x SS27 wholesale orders, followed by Cloudmonster 3 and NYC Marathon winner Cloudboom Strike 2.',
    zhF: '变现双轮：(1) 专业跑店订单翻倍确立技术公信力 + (2) 高性能 Hyper / Max 子型号推动平均售价（ASP）持续上移至 $180–$310',
    enF: 'Monetization: (1) 2x specialty run orders reinforce performance credibility + (2) Hyper / Max tiers lift ASP to $180–$310',
    gZh: [['>4.0x', 'Cloudsurfer 3 首发售罄速度'], ['2.0x', 'SS27 专业跑店期货订单增幅'], ['76.2%', 'Cloudboom Strike 2 能量回馈率'], ['2026–2028', '全系主力跑鞋换代放量窗口']],
    gEn: [['>4.0x', 'Cloudsurfer 3 Pre-Launch Sell-Out'], ['2.0x', 'SS27 Run-Specialty Order Lift'], ['76.2%', 'Cloudboom Strike 2 Energy Return'], ['2026–2028', 'Full Running Lineup Refresh Window']]
   },
   {
    badge: 'ENGINE 02 · LIGHTSPRAY™ AUTOMATED NEARSHORING NETWORK',
    zhT: 'LightSpray™ 机器人智造网：从苏黎世 4 台到釜山 32 台，重塑百年制鞋供应链',
    enT: 'LightSpray™ Robotic Network: From 4 Robots in Zurich to 32 in Busan & Global Nearshoring',
    zhD: '制鞋业过去五十年只能追逐廉价劳动力从日韩迁往中国、越南与印尼。昂跑在巴黎奥运亮剑后迅速推进工业化：2025年7月苏黎世首厂（4台机械臂）投产，2026年2月韩国釜山第二厂（32台全自动机械臂，日产约1,000双）上线，2026年内产能暴增30倍。下一步昂跑将在美洲与欧洲本土直接部署机械臂工厂，把约200道鞋面工序缩减为3分钟无胶喷织。',
    enD: 'For fifty years footwear manufacturing chased low-wage labor across Asia. After unveiling LightSpray™ at the Paris Olympics, On opened its 4-robot Zurich plant (July 2025) and its 32-robot Busan facility in South Korea (Feb 2026, ~1,000 pairs/day), scaling capacity 30x in 2026—with Americas and European nearshore factories planned next.',
    zhF: '利润传导：无模具鞋带胶水损耗 + 欧美本地近岸免除高额进口关税 + 支撑 $280–$310 科技超跑高毛利',
    enF: 'Margin Impact: Zero glue/lace assembly waste + nearshore tariff mitigation + $280–$310 flagship pricing power',
    gZh: [['36 台在役', '苏黎世 4 台 + 韩国釜山 32 台'], ['30x 扩产', '2026 全球喷织鞋面产能跃升'], ['8 个部件', '整鞋无胶水极简组装结构'], ['美洲 + 欧洲', '下一阶段近岸工厂落子目标']],
    gEn: [['36 Robots', '4 in Zurich + 32 in Busan'], ['30x Capacity', '2026 Global LightSpray Expansion'], ['8 Total Parts', 'Glue-Free Seamless Construction'], ['Americas + EU', 'Next Nearshore Plant Locations']]
   },
   {
    badge: 'ENGINE 03 · "WIN WITH HER" TOE-TO-HEAD APPAREL BREAKOUT',
    zhT: '“Win with Her” 女性全身服饰革命：全公司增速第一的第二增长曲线',
    enT: '"Win with Her" Toe-to-Head Apparel: Fastest-Growing Category & Margin Accretive Engine',
    zhD: '四年前服饰在昂跑仅是边缘尝试，如今已成为增速最快的战略支柱：FY25 服饰净营收大增 +75.5% CC 至 CHF 169.9M，9M 2026 再增 +49.3% CC 达 CHF 179.0M（Q3 单季 +38.7% 至 CHF 69.5M）。通过签约全球文化偶像 Zendaya 联合设计运动生活胶囊系列，以及由前博柏利/拉夫劳伦数字高管 Alice Delahunt 出任首席消费者官（CCO），昂跑正将直营店打造为高端女性衣橱首选。',
    enD: 'Just an emerging idea four years ago, Apparel is now On\'s fastest-growing engine: FY25 sales jumped +75.5% CC to CHF 169.9M, and 9M 2026 surged +49.3% CC to CHF 179.0M (+38.7% in Q3). Powered by Zendaya co-created drops and >60% DTC mix, On targets ~3x apparel scale by 2029.',
    zhF: '变现逻辑：超 60% 服饰通过自营 DTC 销售（高毛利）+ 单店坪效与客单件数（UPT）双向跃升',
    enF: 'Monetization: >60% sold through high-margin owned DTC channels + higher flagship units-per-transaction (UPT)',
    gZh: [['+75.5% CC', 'FY2025 服饰净营收固定汇率增速'], ['+49.3% CC', '9M 2026 服饰延续爆发增长'], ['>60% DTC', '服饰自营官网与门店销售占比'], ['>20% 占比', '深圳等标杆旗舰店服饰销售权重']],
    gEn: [['+75.5% CC', 'FY2025 Apparel Constant-Currency Growth'], ['+49.3% CC', '9M 2026 Apparel Momentum'], ['>60% DTC', 'Apparel Share Sold via Owned Channels'], ['>20% Mix', 'Apparel Share in Flagship Brand Hubs']]
   },
   {
    badge: 'ENGINE 04 · APAC HYPERGROWTH & ~180 GLOBAL BRAND HUBS',
    zhT: '亚太翻倍增长极 + 全球 ~180 家旗舰店：把高净值商圈变成品牌圣殿',
    enT: 'APAC Hypergrowth + ~180 Global Brand Hubs: Owning Prime Urban Retail Theatres',
    zhD: '在首任首席全球市场官（CGMO）Rebecca Cai 带领下，昂跑亚太业务过去数年暴增 6 倍：FY25 亚太净营收首破 CHF 511.1M（+106.7% CC），Q3 2026 再增 +31.9% CC 达 CHF 189.9M，中国、日本与韩国全价排队抢购。同时全球自营门店在 Q3 2026 新开 10 家后逼近 100 家，未来三年将精选扩至约 180 家大面积城市旗舰店。',
    enD: 'Under Chief Global Markets Officer Rebecca Cai (who scaled APAC 6x), FY25 Asia-Pacific sales topped CHF 511.1M (+106.7% CC) and grew +31.9% CC in Q3 2026 to CHF 189.9M across China, Japan, and South Korea. Owned stores are closing in on 100 doors (+10 in Q3) and scaling toward ~180 prime urban Brand Hubs by 2029.',
    zhF: '变现逻辑：大店模式全面陈列鞋服全品类 + 推动全集团 DTC 营收占比由 42.2% 稳步迈向 50%',
    enF: 'Monetization: Larger-format stores unlock full apparel storytelling + lift company DTC mix from 42.2% toward 50%',
    gZh: [['CHF 511.1M', 'FY25 亚太营收 (+106.7% CC 翻倍)'], ['~100 → ~180家', '2026–2029 自营旗舰门店规划'], ['42.2% → ~50%', 'DTC 直营渠道营收占比演进'], ['6.0x 增长', 'Rebecca Cai 任内亚太业务扩张倍数']],
    gEn: [['CHF 511.1M', 'FY25 APAC Sales (+106.7% CC)'], ['~100 → ~180', '2026–2029 Owned Store Target'], ['42.2% → ~50%', 'DTC Channel Mix Trajectory'], ['6.0x Expansion', 'APAC Scaling Under CGMO Rebecca Cai']]
   },
   {
    badge: 'ENGINE 05 · FOOTBALL (MBAPPÉ & HENRY) & GOLF EXPANSION',
    zhT: '复刻费德勒网球神话：携姆巴佩与亨利杀入全球第一大运动——足球与高尔夫',
    enT: 'Replicating THE ROGER Playbook: Entering Football (Mbappé & Henry) & Golf (1H27)',
    zhD: '昂跑在网球赛场用事实证明了“瑞士工程 + 传奇共创”的威力（THE ROGER 自 2021 年起年复合增长 61%，签约女单世界第一 Świątek 与新星 Shelton）。2026 年昂跑重磅官宣与足坛超巨基利安·姆巴佩（股权级长期合作）及蒂埃里·亨利联手进军足球，创下品牌史上最高全球浏览量纪录；同时将于 2027 年上半年正式进军高净值人群云集的高尔夫品类。',
    enD: 'Having proven its category-entry formula in Tennis (61% CAGR for THE ROGER since 2021; World #1 Iga Świątek & Ben Shelton), On announced its entry into Football alongside Kylian Mbappé and Thierry Henry—generating the most-seen brand moment in On\'s history—while preparing a H1 2027 launch into high-LTV Golf.',
    zhF: '战略定位：切入全球受众最广的足球市场吸引 Z 世代粉丝 + 切入高客单价高尔夫市场收割超高净值人群',
    enF: 'Strategic Logic: Football unlocks massive Gen-Z global cultural reach + Golf captures ultra-high-LTV country-club demographics',
    gZh: [['61% CAGR', '网球先行标杆 THE ROGER 年复合增速'], ['史上最高曝光', '2026 姆巴佩+亨利足球官宣声量'], ['2027 上半年', '高尔夫鞋服产品线正式商用时间'], ['Z世代翻倍', 'Q3 2026 线上 24 岁以下买家同比翻番']],
    gEn: [['61% CAGR', 'THE ROGER Tennis Franchise Benchmark'], ['#1 Brand Moment', 'Mbappé + Henry Football Unveiling'], ['1H 2027', 'Official Golf Category Commercial Launch'], ['2x U24 Buyers', 'Q3 2026 Online Under-24 Customer Surge']]
   },
   {
    badge: 'ENGINE 06 · LIFESTYLE SNEAKERS & LOEWE LUXURY HALO',
    zhT: 'Cloudtilt × LOEWE 奢侈品势能辐射：掌握时尚与机能的定义权',
    enT: 'Cloudtilt × LOEWE Luxury Halo: Owning the Intersection of Performance & High Fashion',
    zhD: '将 CloudTec Phase™ 跑鞋缓震平移至街头生活场景的 Cloudtilt ($170–$200)，已成为全球球鞋专门店增速最快的系列之一（亚太销量超原计划 4 倍）；而与 LVMH 旗下西班牙皮具世家 LOEWE 连续十季推出的 $590–$890 联名鞋服（曾登顶 Lyst 全球第 1 热门单品），让昂跑在奢侈品买手店享有传统运动品牌难以企及的身份溢价。',
    enD: 'Translating CloudTec Phase™ running tech to the street, Cloudtilt ($170–$200) has become one of the industry\'s fastest-growing sneaker franchises (>4x APAC plan), while 10 consecutive drops of $590–$890 On × LOEWE luxury capsules (Lyst #1 hottest product globally) anchor unrivaled luxury pricing power.',
    zhF: '变现逻辑：高奢联名抬升品牌价格天花板 ($890) → 反哺 $170–$200 大众主线潮鞋零折扣热销',
    enF: 'Monetization: $590–$890 LOEWE halo elevates brand ceiling → Drives full-price velocity on $170–$200 inline sneakers',
    gZh: [['$590–$890', 'On × LOEWE 高奢联名定价天花板'], ['Lyst 全球第1', '联名系列登顶全球时尚热门单品榜'], ['+190%', 'Cloudtilt 球鞋专门店渠道爆发增速'], ['60% <34岁', 'Moon × Zendaya 女性年轻买家占比']],
    gEn: [['$590–$890', 'On × LOEWE Luxury Capsule Price Band'], ['Lyst #1 Global', 'Ranked #1 Hottest Fashion Product'], ['+190%', 'Cloudtilt Sneaker Specialty Surge'], ['60% Under-34', 'Young Female Share on Moon × Zendaya']]
   }
  ];

  function renderHorizon() {
   var hz = HORIZONS[state.hz] || HORIZONS[0];
   document.getElementById('hzBadge').textContent = isEn() ? hz.badgeEn : hz.badgeZh;
   document.getElementById('hzTitle').textContent = isEn() ? hz.titleEn : hz.titleZh;
   var items = isEn() ? hz.itemsEn : hz.itemsZh;
   document.getElementById('hzList').innerHTML = items.map(function (t) {
    return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
   }).join('');
   document.getElementById('hzProb').textContent = isEn() ? hz.probEn : hz.probZh;
   document.getElementById('hzImpact').textContent = isEn() ? hz.impEn : hz.impZh;
  }

  function renderEngine() {
   var eg = ENGINES[state.eng] || ENGINES[0];
   document.getElementById('engBadge').textContent = eg.badge;
   document.getElementById('engTitle').textContent = isEn() ? eg.enT : eg.zhT;
   document.getElementById('engDesc').textContent = isEn() ? eg.enD : eg.zhD;
   document.getElementById('engFormula').textContent = isEn() ? eg.enF : eg.zhF;
   var gs = isEn() ? eg.gEn : eg.gZh;
   document.getElementById('engGauges').innerHTML = gs.map(function (g) {
    return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
   }).join('');
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
   drawAll();
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
   document.getElementById('f0Lead').innerHTML = isEn() ? F0_LEAD.en : F0_LEAD.zh;
   var qIn = document.getElementById('quickJumpInput');
   if (qIn) qIn.placeholder = isEn() ? 'Jump to engine or 2030 lab…' : '检索未来引擎或2030估值…';
   renderHorizon();
   renderEngine();
   drawAll();
   if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文视图');
  }

  document.getElementById('hzTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-hz]');
   if (!b) return;
   state.hz = parseInt(b.getAttribute('data-hz'), 10) || 0;
   var bs = this.querySelectorAll('.ft-hz-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
   renderHorizon();
  });

  document.getElementById('engineRail').addEventListener('click', function (e) {
   var b = e.target.closest('[data-eng]');
   if (!b) return;
   state.eng = parseInt(b.getAttribute('data-eng'), 10) || 0;
   var bs = this.querySelectorAll('.ft-rail-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
   renderEngine();
  });

  // Suite Hub Filter & Safe Sibling Click Handler
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
     if (item.getAttribute('data-self-doc') === '1') window.scrollTo({ top: 0, behavior: 'smooth' });
     else showToast(isEn() ? ('Companion file in 4-page suite: ' + item.getAttribute('data-sibling-doc')) : ('请打开同套交付网页：《' + item.getAttribute('data-sibling-doc') + '》'));
    }
   });
  }
  document.querySelector('[data-scroll-top="1"]').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // High-DPI Retina Canvas Engine
  function prepCanvas(id) {
   var c = document.getElementById(id);
   if (!c) return null;
   var rect = c.getBoundingClientRect();
   var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
   var dpr = Math.min(window.devicePixelRatio || 1, 2);
   c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
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

  function drawFutureCanvas() {
   var env = prepCanvas('futureCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hits.futureCanvas = [];
   var pad = { top: 28, right: 20, bottom: 42, left: 54 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

   if (state.fView === 'bridge') {
    var steps = [
     { lbl: isEn() ? 'FY25 Base' : 'FY25基准', v: 3.01, b: 0, col: pal.blue, tip: 'FY2025 Audited Net Sales: CHF 3.01B' },
     { lbl: isEn() ? '+Core Run' : '+路跑换代', v: 1.75, b: 3.01, col: pal.green, tip: 'Core Run & Trail Surreal™ refresh adds +CHF 1.75B through 2032E' },
     { lbl: isEn() ? '+Sneaker' : '+街头潮鞋', v: 1.25, b: 4.76, col: pal.violet, tip: 'Cloudtilt, Cloud 6 & LOEWE lifestyle expansion adds +CHF 1.25B' },
     { lbl: isEn() ? '+Apparel' : '+全身服饰', v: 1.15, b: 6.01, col: pal.amber, tip: 'Win with Her apparel scaling across ~180–220 Brand Hubs adds +CHF 1.15B' },
     { lbl: isEn() ? '+New Sports' : '+足球/高球', v: 1.04, b: 7.16, col: pal.green, tip: 'Tennis, Football (Mbappé) & Golf (1H27) add +CHF 1.04B' },
     { lbl: isEn() ? 'FY32E Target' : 'FY32E蓝图', v: 8.20, b: 0, col: pal.blue, tip: 'FY2032E Multi-Sport Tech-Luxury Blueprint: ~CHF 8.20B (~$9.5B USD)' }
    ];
    var maxB = 9.2;
    for (var k = 0; k <= 4; k++) {
     var kv = ((maxB / 4) * k).toFixed(1), ky = pad.top + ph - (k / 4) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(kv + 'B', pad.left - 7, ky + 4);
    }
    var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
    steps.forEach(function (s, i) {
     var x = pad.left + i * sW + (sW - bW) / 2;
     var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
     var yb = pad.top + ph - (s.b / maxB) * ph;
     var bh = Math.max(5, yb - yt);
     ctx.fillStyle = s.col;
     roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText((s.b > 0 ? '+' : '') + s.v.toFixed(2) + 'B', x + bW / 2, yt - 6);
     ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
     ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
     hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl + ' (CHF)', body: s.tip });
    });
   } else {
    var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E*', 'FY29E Target'];
    var eb = [13.5, 15.5, 16.7, 18.8, 19.8, 22.5];
    var maxE = 26;
    for (var g = 0; g <= 4; g++) {
     var gv = Math.round((maxE / 4) * g), gy = pad.top + ph - (g / 4) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(gv + '%', pad.left - 8, gy + 4);
    }
    var slot = pw / yrs.length, bw = Math.min(44, slot * 0.56);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot + (slot - bw) / 2;
     var bh = (eb[i] / maxE) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
     roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(eb[i].toFixed(1) + '%', x + bw / 2, yt - 6);
     ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
     ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
     hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' Adj. EBITDA Margin', body: 'Underlying Adjusted EBITDA Margin: ' + eb[i].toFixed(1) + '% (Q3\'26 already reached 21.9%)' });
    });
   }
  }

  function drawSiliconCanvas() {
   var env = prepCanvas('siliconCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hits.siliconCanvas = [];
   var pad = { top: 28, right: 22, bottom: 40, left: 54 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

   if (state.sView === 'robots') {
    var yrs = ['2025 (苏黎世)', '2026 (釜山投产)', '2027E', '2028E (欧美厂)', '2029E', '2030E'];
    var yrsEn = ['2025 (Zurich)', '2026 (Busan)', '2027E', '2028E (US/EU)', '2029E', '2030E'];
    var bots = [4, 36, 72, 140, 220, 320];
    var maxR = 360;
    for (var m = 0; m <= 3; m++) {
     var mv = m * 120, my = pad.top + ph - (mv / maxR) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(mv, pad.left - 8, my + 4);
    }
    var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot + (slot - bw) / 2;
     var bh = Math.max(6, (bots[i] / maxR) * ph), yt = pad.top + ph - bh;
     ctx.fillStyle = i <= 1 ? pal.blue : pal.violet;
     if (i >= 3) ctx.fillStyle = pal.green;
     roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(bots[i] + (isEn() ? '' : '台'), x + bw / 2, yt - 6);
     ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
     ctx.fillText(isEn() ? yrsEn[i] : y, x + bw / 2, pad.top + ph + 20);
     hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: (isEn() ? yrsEn[i] : y), body: (i <= 1 ? 'Verified active robots: ' : 'Projected global nearshore robot fleet: ') + bots[i] });
    });
   } else {
    var metrics = [
     { lbl: isEn() ? 'Assembly Steps (200 → 1)' : '鞋面制造工序 (200道 → 1道)', leg: 100, ls: 2 },
     { lbl: isEn() ? 'Upper Carbon Footprint (-75%)' : '鞋面碳排放强度 (-75%)', leg: 100, ls: 25 },
     { lbl: isEn() ? 'Total Shoe Parts (~35 → 8)' : '整鞋零配件数量 (~35个 → 8个)', leg: 100, ls: 23 },
     { lbl: isEn() ? 'Upper Weight (~95g → 30g)' : '单只鞋面重量 (~95g → 30g)', leg: 100, ls: 32 }
    ];
    var rowH = ph / metrics.length;
    metrics.forEach(function (mt, idx) {
     var cy = pad.top + idx * rowH + rowH / 2;
     ctx.fillStyle = pal.sub; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
     ctx.fillText(mt.lbl, pad.left, cy - 9);
     ctx.fillStyle = 'rgba(148,163,184,0.28)';
     roundRect(ctx, pad.left, cy - 4, pw * 0.84, 9, 4); ctx.fill();
     ctx.fillStyle = pal.green;
     roundRect(ctx, pad.left, cy + 8, Math.max(8, (mt.ls / 100) * pw * 0.84), 10, 4); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace';
     ctx.fillText('LightSpray: ' + mt.ls + '%', pad.left + (mt.ls / 100) * pw * 0.84 + 8, cy + 17);
     hits.siliconCanvas.push({ x: pad.left, y: cy - 16, w: pw, h: 36, title: mt.lbl, body: 'Legacy Footwear = 100% baseline vs LightSpray = ' + mt.ls + '% of baseline' });
    });
   }
  }

  // F4: Interactive 2030 Optionality Builder
  var OPT_DATA = {
   apparel: { rev: 0.78, eb: 0.195 },
   apac: { rev: 0.92, eb: 0.230 },
   dtc: { rev: 0.64, eb: 0.190 },
   ls: { rev: 0.35, eb: 0.105 },
   sports: { rev: 0.68, eb: 0.155 }
  };
  var miniCaps = [10.0, 22.8, 38.0];

  function drawOptMiniCanvas() {
   var env = prepCanvas('optMiniCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   var pad = { top: 22, right: 18, bottom: 24, left: 48 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var lbls = isEn() ? ['Current Cap', '2030 Core Run', '2030 w/ Options'] : ['当前基准', '2030基础盘', '2030含期权'];
   var maxV = Math.max(42, Math.ceil(Math.max.apply(null, miniCaps) * 1.16));
   ctx.strokeStyle = pal.grid;
   ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
   var slot = pw / 3, bw = Math.min(54, slot * 0.5);
   miniCaps.forEach(function (v, i) {
    var x = pad.left + i * slot + (slot - bw) / 2;
    var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
    ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
    roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
    ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
    ctx.fillText('CHF ' + v.toFixed(1) + 'B', x + bw / 2, yt - 6);
    ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
    ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
   });
  }

  function recalcOptionality() {
   var baseRev = 4.25, baseEb = 0.91, netCash2030 = 2.15; // CHF Billions
   var addRev = 0, addEb = 0;
   document.querySelectorAll('[data-opt]').forEach(function (chk) {
    if (chk.checked) {
     var d = OPT_DATA[chk.getAttribute('data-opt')];
     if (d) { addRev += d.rev; addEb += d.eb; }
    }
   });
   var totRev = baseRev + addRev;
   var totEb = baseEb + addEb;
   var ebMargin = (totEb / totRev) * 100;
   var eqValChf = totEb * state.mult + netCash2030;
   var baseEqChf = baseEb * state.mult + netCash2030;
   var eqValUsd = Math.round(eqValChf * 1.15);

   document.getElementById('optRevOut').textContent = 'CHF ' + totRev.toFixed(2) + 'B';
   document.getElementById('optEbOut').textContent = 'CHF ' + totEb.toFixed(2) + 'B';
   document.getElementById('optMarginOut').textContent = ebMargin.toFixed(1) + '%';
   document.getElementById('optCapOut').textContent = 'CHF ' + eqValChf.toFixed(1) + 'B (~$' + eqValUsd + 'B)';

   miniCaps = [10.0, baseEqChf, eqValChf];
   drawOptMiniCanvas();
  }

  document.querySelectorAll('[data-opt]').forEach(function (chk) {
   chk.addEventListener('change', recalcOptionality);
  });
  document.getElementById('peTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-mult]');
   if (!b) return;
   state.mult = parseInt(b.getAttribute('data-mult'), 10) || 22;
   var bs = this.querySelectorAll('.mui-seg-btn');
   for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
   recalcOptionality();
  });

  function bindSeg(gid, attr, skey, fn) {
   var g = document.getElementById(gid);
   if (!g) return;
   g.addEventListener('click', function (e) {
    var b = e.target.closest('[' + attr + ']');
    if (!b) return;
    state[skey] = b.getAttribute(attr);
    var bs = g.querySelectorAll('.mui-seg-btn');
    for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
    fn();
   });
  }
  bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
  bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

  function bindTip(cid) {
   var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
   if (!c || !tip) return;
   c.addEventListener('mousemove', function (ev) {
    var r = c.getBoundingClientRect();
    var mx = ev.clientX - r.left, my = ev.clientY - r.top;
    var arr = hits[cid] || [], hit = null;
    for (var i = 0; i < arr.length; i++) {
     var rg = arr[i];
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
  ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

  function drawAll() {
   drawFutureCanvas();
   drawSiliconCanvas();
   drawOptMiniCanvas();
  }

  // Quick Jump ⌘K
  var QITEMS = [
   { id: 'sec-f0', t: 'F0 双创始人联席CEO新政与三阶时间窗', s: '2026–2032 近程/中程/远期三大兑现阶段与 2029 CHF 5.6B 目标' },
   { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Surreal跑鞋换代 · LightSpray · Win with Her服饰 · 亚太 · 姆巴佩足球' },
   { id: 'sec-f2', t: 'F2 反共识全价纪律与 2032 营收阶梯桥', s: '迈向 CHF 8.2B 营收阶梯 · Adj. EBITDA 利润率突破 22%+' },
   { id: 'sec-f3', t: 'F3 材料与机器人智造主权路线图', s: '苏黎世4台 + 釜山32台机械臂 · 200道工序压缩为3分钟喷织' },
   { id: 'sec-f4', t: 'F4 2030 目标市值期权组装实验室', s: '自由开关五大新业务期权与 EBITDA 倍数实时测算股权价值' }
  ];
  var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
  function renderQ(kw) {
   var q = (kw || '').trim().toLowerCase();
   var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
   qPop.innerHTML = m.map(function (x) {
    return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
   }).join('');
   qPop.classList.toggle('open', m.length > 0);
  }
  qIn.addEventListener('focus', function () { renderQ(qIn.value); });
  qIn.addEventListener('input', function () { renderQ(qIn.value); });
  qPop.addEventListener('click', function (e) {
   var jb = e.target.closest('[data-jump]');
   if (!jb) return;
   var target = document.querySelector(jb.getAttribute('data-jump'));
   if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
   qPop.classList.remove('open');
  });
  document.addEventListener('click', function (e) {
   if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open');
  });
  document.addEventListener('keydown', function (e) {
   if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
   if (e.key === 'Escape') { qPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
  });

  // Sidebar, Export & Print
  var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
  sbBtn.addEventListener('click', function () {
   if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
   else {
    var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
    if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
    else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
    try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
    setTimeout(drawAll, 60);
   }
  });
  bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

  
  

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
   var dh = document.documentElement.scrollHeight - window.innerHeight;
   bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
  }, { passive: true });

  try {
   if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
   applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
   applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
  } catch (e) {}

  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
  recalcOptionality();
  drawAll();
 })();
 