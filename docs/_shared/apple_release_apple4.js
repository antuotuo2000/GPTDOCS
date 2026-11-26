
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'aapl_bm_stress_v1';

 var TITLE_ZH = '苹果公司 Apple Inc. (AAPL) 商业模式架构深度拆解 | 数据中心';
 var TITLE_EN = 'Apple Inc. (AAPL) Business Model Architecture Deep Dive | Research Hub';

 var state = {
 theme: 'dark',
 lang: 'zh',
 activeLens: 0,
 activeNode: 0,
 activeCohort: 'core',
 pView: 'waterfall',
 cView: 'ltv',
 kView: 'shares',
 profitSeries: { svc: true, tot: true, prd: true },
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
 zh: '市场常误将苹果视作依赖爆款周期的“消费电子硬件商”，但其底层经济模型实为一台<strong>三阶嵌套现金流机器</strong>：第一阶以自研 A/M 系列芯片与错峰旗舰矩阵（iPhone 18 Pro / iPhone Duo 折叠机）攫取全球高端手机逾 80% 营业利润池，不仅零补贴获客，反而赚取 <strong>$3,555亿 硬件营收（39.3% 毛利率）</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">Q4 FY26 财报 ↗</a>；第二阶依托跨 6 大操作系统的连续互通机制，在 <strong>25 亿+ 活跃存量设备</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/01/apple-reports-first-quarter-results/" target="_blank" rel="noopener noreferrer">Q1 FY26 公告 ↗</a> 上以接近零边际获客成本征收 <strong>$1,233亿 服务收入（76.2% 超高毛利率）</strong>；第三阶凭借对上下游账期的绝对统治（负营运资本）与仅 <strong>1.9% 的轻资产 CapEx 强度</strong>，将全年 <strong>$1,361亿 自由现金流</strong>持续注入股票回购注销（累计缩股近 45%），驱动每股价值穿越硬件周期持续复利。',
 en: 'Wall Street often mislabels Apple as a cyclical hardware maker, yet its economic engine is a <strong>three-stage nested cash machine</strong>: Stage 1 captures &gt;80% of global smartphone operating profit via custom A/M silicon and staggered flagships (iPhone 18 Pro / foldable iPhone Duo), earning <strong>$355.5B in hardware revenue (39.3% GM)</strong> at negative CAC <a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">Q4 FY26 Release ↗</a>; Stage 2 monetizes <strong>2.5B+ active devices</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/01/apple-reports-first-quarter-results/" target="_blank" rel="noopener noreferrer">Q1 FY26 Release ↗</a> across 6 OS platforms with <strong>$123.3B in Services (76.2% GM)</strong>; Stage 3 pairs -58d negative working capital and <strong>1.9% CapEx intensity</strong> to channel <strong>$136.1B in FCF</strong> into share retirement (~45% cumulative reduction).'
 },
 m2_caption: {
 zh: '数据来源：<a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">Apple FY2026 Q4 财报 ↗</a> 与 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm" target="_blank" rel="noopener noreferrer">SEC Form 10-K ↗</a>。注意苹果最独特的财务异象：<strong>自由现金流（$136.1B）高于 GAAP 净利润（$132.2B）</strong>，源于折旧摊销、股权激励回加及负营运资本贡献，而全年资本开支仅 $9.0B。',
 en: 'Sources: <a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">Apple FY2026 Q4 Release ↗</a> &amp; <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm" target="_blank" rel="noopener noreferrer">SEC Form 10-K ↗</a>. Notably, <strong>Free Cash Flow ($136.1B) exceeds GAAP Net Income ($132.2B)</strong> thanks to D&amp;A, SBC add-backs, negative working capital, and lean $9.0B CapEx.'
 },
 m3_caption: {
 zh: '行业对标参考：<a class="cite-link" href="https://counterpointresearch.com/en/insights/apple-iphone-market-share" target="_blank" rel="noopener noreferrer">Counterpoint 全球份额追踪 ↗</a> 与 <a class="cite-link" href="https://counterpointresearch.com/cn/reports/apple-iphone-18-launch-pro-model-strategy" target="_blank" rel="noopener noreferrer">iPhone 18 Pro 错峰策略研报 ↗</a>。苹果以约 ~20% 的出货量拿走全球智能手机行业超过 80% 的营业利润。',
 en: 'Industry Benchmarks: <a class="cite-link" href="https://counterpointresearch.com/en/insights/apple-iphone-market-share" target="_blank" rel="noopener noreferrer">Counterpoint Share Tracker ↗</a> &amp; <a class="cite-link" href="https://counterpointresearch.com/cn/reports/apple-iphone-18-launch-pro-model-strategy" target="_blank" rel="noopener noreferrer">iPhone 18 Pro Strategy ↗</a>. Apple captures over 80% of global smartphone operating profits from ~20% unit share.'
 },
 m4_caption: {
 zh: '资本效率底座：仅约 8–9 天极速存货周转（DSO ~28天 + DIO ~9天 - DPO ~95天 ≈ <strong>-58天 CCC</strong>），意味着供应商无息垫资支撑苹果日常运转；自 FY2013 以来累计回购逾 $7,300亿，摊薄股本由 ~263亿股缩减至 FY26 的 <strong>145.3亿股</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/04/apple-reports-second-quarter-results/" target="_blank" rel="noopener noreferrer">Q2 FY26 $100B 回购公告 ↗</a>。',
 en: 'Capital Efficiency Base: ~8–9 inventory days (DSO ~28d + DIO ~9d - DPO ~95d ≈ <strong>-58d CCC</strong>) means suppliers fund daily operations interest-free; $730B+ in cumulative buybacks since FY13 shrank diluted shares from ~26.3B to <strong>14.53B in FY26</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/04/apple-reports-second-quarter-results/" target="_blank" rel="noopener noreferrer">Q2 FY26 $100B Buyback ↗</a>.'
 },
 s1_body: {
 zh: '欧盟《数字市场法案》(DMA) 要求开放第三方应用商店与外部支付，美国司法部 (DOJ) 亦针对围墙花园提起诉讼。但即使全球 App Store 综合抽成率被迫下调 400bps，由于欧盟仅占 App Store 营收约 7%–8% 且核心条款以“核心技术费”对冲，测算对集团整体营业利润冲击可控在 <strong>3%–5% 区间</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm" target="_blank" rel="noopener noreferrer">10-K 法律风险披露 ↗</a>。',
 en: 'The EU Digital Markets Act (DMA) mandates third-party stores and external payments, while the US DOJ challenges walled-garden policies. Yet with the EU at only ~7%–8% of App Store revenue and Core Technology Fees offsetting cuts, a 400bps global fee compression impacts total operating income by just <strong>3%–5%</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm" target="_blank" rel="noopener noreferrer">10-K Legal Disclosures ↗</a>.'
 },
 s3_body: {
 zh: 'AI 服务器抢占产能推高 DRAM/NAND 价格，同时 FY26Q3 曾受惠于 $0.11/股 关税退税一次性增厚 <a class="cite-link" href="https://www.apple.com/newsroom/2026/07/apple-reports-third-quarter-results/" target="_blank" rel="noopener noreferrer">Q3 FY26 财报 ↗</a>。苹果的对冲手段是<strong>高毛利存储阶梯定价</strong>（256GB→1TB 溢价毛利率超 80%）与错峰首发高单价 iPhone Duo / 18 Pro 抬升 ASP <a class="cite-link" href="https://counterpointresearch.com/cn/insights/iphone-17-series-outpaces-previous-series-first-year-revenue-over-170-billion-dollars" target="_blank" rel="noopener noreferrer">Counterpoint 追踪 ↗</a>。',
 en: 'AI server demand inflates DRAM/NAND costs while tariff shifts create quarterly noise <a class="cite-link" href="https://www.apple.com/newsroom/2026/07/apple-reports-third-quarter-results/" target="_blank" rel="noopener noreferrer">Q3 FY26 Release ↗</a>. Apple offsets BOM inflation via <strong>high-margin storage tiering</strong> (&gt;80% GM on 256GB→1TB upgrades) and staggered Pro / iPhone Duo launches <a class="cite-link" href="https://counterpointresearch.com/cn/insights/iphone-17-series-outpaces-previous-series-first-year-revenue-over-170-billion-dollars" target="_blank" rel="noopener noreferrer">Counterpoint ↗</a>.'
 }
 };

 var LENSES = [
 {
 formulaZh: '单用户全周期毛利 LTV = 首购硬件毛利 ($380+) + ∑ [存续年限 × 多端服务 ARPU × 76.2% 毛利率] - $0 边际获客费',
 formulaEn: 'User Lifetime Gross Profit = Initial Hardware GP ($380+) + ∑ [Tenure × Multi-Device ARPU × 76.2% GM] - $0 Marginal CAC',
 bodyZh: '传统互联网平台必须每年烧掉数百亿美元买量（CAC）才能维持活跃用户，而苹果每一次卖出 iPhone 或 Mac 都是<strong>“带毛利的逆向获客”</strong>——消费者自己付费跨入围墙花园，一旦绑定 Apple ID、iCloud 照片库与 AirPods/Watch，跨生态迁移摩擦便呈指数级上升。',
 bodyEn: 'Traditional platforms burn tens of billions on CAC just to retain users; every iPhone or Mac sale is <strong>“reverse acquisition at a 39% gross profit.”</strong> Once locked into Apple ID, iCloud Photos, and Watch/AirPods, switching friction rises exponentially.'
 },
 {
 formulaZh: '综合毛利率扩张 (48.8%) = 硬件毛利率 (39.3% × 74.2%权重) + 服务毛利率 (76.2% × 25.8%权重) → 服务占总毛利池达 40.2%',
 formulaEn: 'Consolidated GM (48.8%) = Products (39.3% × 74.2% wt) + Services (76.2% × 25.8% wt) → Services = 40.2% of Gross Profit',
 bodyZh: '服务业务毛利率（76.2%）几乎是硬件业务（39.3%）的两倍。这意味着即使硬件出货量在宏观逆风期仅温和增长，只要 25 亿存量设备上的付费订阅数（&gt;15亿）保持双位数渗透，<strong>全集团毛利率与营业利润率就会呈现结构性上移</strong>。',
 bodyEn: 'Services gross margin (76.2%) is nearly double Products (39.3%). Even if hardware unit growth moderates, double-digit paid subscription expansion (&gt;1.5B subs) across 2.5B active devices structurally lifts <strong>consolidated gross and operating margins</strong>.'
 },
 {
 formulaZh: '每股收益增速 (+20.4%) = 净利润增速 (+18.0%) ÷ (1 - 年均回购注销股本率) | 营运资本占用 = -58 天 (上游免息浮存)',
 formulaEn: 'EPS Growth (+20.4%) = Net Income Growth (+18.0%) ÷ (1 - Annual Share Retirement Rate) | CCC = -58 Days (Supplier Float)',
 bodyZh: '苹果以约 9 天极速库存周转配合 ~95 天应付账款账期，实现<strong>“先收消费者的钱、3个月后再付供应商货款”</strong>的类保险浮存金机制；叠加仅 1.9% 的极低 CapEx，每年超千亿美元自由现金流近乎 100% 用于回购注销股票与分红。',
 bodyEn: 'With ~9 inventory days and ~95 payable days, Apple collects cash from consumers three months before paying suppliers—an insurance-like float. Paired with 1.9% CapEx, ~$136B in FCF flows directly into share retirement and dividends.'
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
 badge: 'NODE 01 · APPLE SILICON VERTICAL INTEGRATION',
 titleZh: '自研芯片（A / M / C / S 系列）：把高通与英特尔的利润直接内化为苹果毛利',
 titleEn: 'Custom Silicon (A / M / C / S Series): Internalizing Intel & Qualcomm Margins',
 descZh: 'Johny Srouji 领衔的硬件技术团队通过统一架构研发 A 系列移动芯片、M 系列桌面芯片与自研基带/连接芯片，彻底剥离了对外购 x86 处理器与高端第三方 SoC 的双重毛利盘剥。在台积电先进制程包下首发产能的同时，统一内存架构（UMA）让端侧 Siri AI 推理无需高昂云端 GPU 资本开支即可在本地高效运行。',
 descEn: 'Johny Srouji’s silicon team builds A-series mobile, M-series desktop, and custom wireless chips on one unified architecture—eliminating third-party SoC markups while Unified Memory Architecture runs on-device Siri AI without cloud GPU CapEx.',
 formulaZh: '商业传导：芯片自研节省 BOM 溢价 + 极致能效比差异化 → 支撑硬件毛利率稳居 39.3% 历史高位（远超安卓阵营 12%–18%）',
 formulaEn: 'Value Flow: Eliminating merchant chip markups + unmatched perf/watt → sustains 39.3% Products GM (vs. 12%–18% Android peers)',
 kpisZh: [['39.3%', 'FY2026 硬件综合毛利率'], ['100%', 'Mac / iPad / iPhone 自研 SoC 覆盖'], ['单颗省~$100+', '规避外部芯片商毛利抽成'], ['1.9%', '全集团 CapEx / 营收轻资产比']],
 kpisEn: [['39.3%', 'FY2026 Products Gross Margin'], ['100%', 'In-House SoC Across Core Lines'], ['~$100+/unit', 'Merchant Silicon Markup Saved'], ['1.9%', 'CapEx / Revenue Intensity']]
 },
 {
 badge: 'NODE 02 · STAGGERED LAUNCH & DECOY PRICING LADDER',
 titleZh: '错峰旗舰周期与存储阶梯定价：教科书级的消费者剩余提取术',
 titleEn: 'Staggered Flagships & Storage Tiering: Textbook Surplus Extraction',
 descZh: '2026 秋季苹果率先发布超高端折叠机 iPhone Duo 与 iPhone 18 Pro / Pro Max，并将标准版延后错峰上市，成功引导核心换机人群向 $1,099–$1,999 价格带迁移。同时，128GB→256GB→1TB 的闪存容量阶梯加价（每级加收 $100–$200，而 NAND 边际成本仅十余美元）贡献了极高的隐性硬件边际毛利。',
 descEn: 'Launching foldable iPhone Duo and iPhone 18 Pro ahead of base models steers upgraders into the $1,099–$1,999 tier, while NAND storage tiers ($100–$200 step-ups for ~$15 marginal flash cost) generate >80% incremental margin.',
 formulaZh: '商业传导：Pro/Fold 首发定锚 + 存储容量阶梯高毛利加价 → 驱动 FY26 iPhone 营收大涨 +21.2% 至 $2,541.0亿',
 formulaEn: 'Value Flow: Pro/Fold anchoring + high-margin storage tiers → drove FY26 iPhone revenue +21.2% YoY to $254.10B',
 kpisZh: [['$254.1B', 'FY2026 iPhone 净营收 (+21.2%)'], ['53.1%', 'iPhone 占集团总营收比重'], ['>80%', '大容量闪存升级包边际毛利率'], ['540+家', '全球 Apple Store 直营零折扣控价']],
 kpisEn: [['$254.1B', 'FY2026 iPhone Net Sales (+21.2%)'], ['53.1%', 'Share of Total Enterprise Revenue'], ['>80%', 'Marginal GM on Storage Upgrades'], ['540+', 'Direct Apple Stores Holding ASP']]
 },
 {
 badge: 'NODE 03 · 6-OS CONTINUITY & SWITCHING-COST MOAT',
 titleZh: '六大操作系统无缝接力：让每一次增购硬件都把围墙筑高一层',
 titleEn: 'Six-OS Continuity: Every Additional Device Raises the Switching Wall',
 descZh: 'iOS、macOS、iPadOS、watchOS、visionOS 与 tvOS 共享同一套 Apple ID、iCloud 密钥串、通用剪贴板、AirDrop 与查找（Find My）网络。单品的竞争对手或许能在摄像头或屏幕参数上局部追平，但无法复刻跨手机、电脑、手表、耳机的系统级协同体验。',
 descEn: 'iOS, macOS, iPadOS, watchOS, visionOS, and tvOS share one Apple ID, iCloud Keychain, Universal Clipboard, AirDrop, and Find My mesh. Rivals can match single-device specs, never cross-device ecosystem continuity.',
 formulaZh: '商业传导：单设备满意 → 增购 Watch/AirPods/Mac → 跨系统迁移沉没成本指数级飙升 → 锁定 >92% 换机留存率',
 formulaEn: 'Value Flow: Single-device delight → Watch/AirPods/Mac add-ons → exponential switching cost → >92% upgrade retention',
 kpisZh: [['2.5B+', '全球活跃安装设备底座'], ['6大OS', '端到端封闭软硬协同栈'], ['<2%', '三件套以上家庭用户年流失率'], ['$105.4B', 'Mac + iPad + 穿戴辅件合计年营收']],
 kpisEn: [['2.5B+', 'Active Installed Devices'], ['6 OS Platforms', 'End-to-End Integrated Stack'], ['<2%/yr', '3+ Device Household Churn'], ['$105.4B', 'Mac + iPad + Wearables Annual Sales']]
 },
 {
 badge: 'NODE 04 · ZERO-CAC DIGITAL TOLLBOOTH',
 titleZh: '服务业务收费站：躺在 25 亿台终端上收“数字商业地产租金”',
 titleEn: 'Services Tollbooth: Collecting Digital Real-Estate Rent on 2.5B Devices',
 descZh: '一旦 25 亿台硬件铺入全球高净值消费者口袋，苹果无需多花一分钱获客广告费，即可在开机向导、系统设置与锁屏界面完成原生触达：从 Safari 默认搜索分成、App Store 内购佣金，到 iCloud+ 容量订阅与 Apple Pay 刷卡分润，构建出年入 $1,233亿、毛利率高达 76.2% 的超级现金牛。',
 descEn: 'With 2.5B devices in high-income hands, Apple monetizes setup screens and OS defaults at near-zero CAC—from Safari ISA licensing and App Store fees to iCloud+ and Apple Pay—generating $123.3B at 76.2% gross margin.',
 formulaZh: '商业传导：25亿终端 × 零获客成本自然转化 → $1,233亿 服务营收 × 76.2% 毛利率 = 贡献集团 $940亿 毛利额（占比 40.2%）',
 formulaEn: 'Value Flow: 2.5B devices × $0 CAC → $123.3B Services × 76.2% GM = $94.0B Gross Profit (40.2% of Apple total)',
 kpisZh: [['$123.3B', 'FY2026 服务业务总营收 (+13%)'], ['76.2%', 'FY2026 服务分部毛利率'], ['1.5B+', '全球活跃付费订阅账户份数'], ['40.2%', '服务对苹果总毛利池贡献度']],
 kpisEn: [['$123.3B', 'FY2026 Services Revenue (+13%)'], ['76.2%', 'FY2026 Services Gross Margin'], ['1.5B+', 'Active Paid Subscriptions'], ['40.2%', 'Share of Total Company Gross Profit']]
 },
 {
 badge: 'NODE 05 · NEGATIVE WORKING CAPITAL & SHARE CANNIBALIZATION',
 titleZh: '负营运资本浮存金 + 持续注销股本：巴菲特最推崇的资本配置范本',
 titleEn: 'Negative Working Capital + Share Cannibalization: Capital Allocation Gold Standard',
 descZh: '依托直营渠道现款现货与对全球果链约 95 天的应付账期，苹果常年保持约 -58 天的负现金转换周期（CCC），扩张期不仅不垫资反而净吸纳上游现金。管理层拒绝盲目并购扩张，将每年逾千亿美元自由现金流持续用于二级市场回购注销股票，使留存股东在公司中的权益占比每年自动增厚。',
 descEn: 'Collecting cash upfront while paying suppliers in ~95 days yields a -58d Cash Conversion Cycle—growth generates cash rather than consuming it. Management avoids empire-building M&A, retiring shares relentlessly with $136B FCF.',
 formulaZh: '商业传导：$1,361亿 FCF (103% 净利转化) → FY26 回购 $864亿 + 分红 → 摊薄 EPS 增速 (+20.4%) 持续跑赢净利润增速 (+18.0%)',
 formulaEn: 'Value Flow: $136.1B FCF (103% conversion) → $86.4B buybacks + dividends → EPS (+20.4%) outpaces Net Income (+18.0%)',
 kpisZh: [['-58天', '现金转换周期 (上游无息浮存)'], ['$136.1B', 'FY2026 年度自由现金流 (+38%)'], ['-44.8%', 'FY13–FY26 累计注销摊薄股本'], ['$100B', '2026 Q2 董事会新增回购授权']],
 kpisEn: [['-58 Days', 'Cash Conversion Cycle (Float)'], ['$136.1B', 'FY2026 Free Cash Flow (+38%)'], ['-44.8%', 'FY13–FY26 Share Count Retired'], ['$100B', 'Q2 FY26 New Buyback Authorization']]
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
 ['典型设备组合', '单台标准版 iPhone', '价格敏感度相对较高'],
 ['年均生态退订/流失率', '~11.5%', '换机时存在安卓旗舰分流可能'],
 ['年度服务贡献 ARPU', '$52 / 年', '基础 iCloud 50GB + 少量内购'],
 ['5年累计单客毛利 LTV', '$685', '主要依赖首购与二次换机硬件毛利']
 ],
 statsEn: [
 ['Typical Hardware Mix', 'Single Base iPhone', 'Higher price elasticity'],
 ['Annual Ecosystem Churn', '~11.5%', 'Exposed to Android flagship switching'],
 ['Annual Services ARPU', '$52 / yr', 'Base 50GB iCloud + modest IAPs'],
 ['5-Year Gross Profit LTV', '$685', 'Driven primarily by hardware upgrades']
 ],
 noteZh: '<strong>单机入门层特征：</strong>单台 iPhone 用户虽然已贡献可观的首购硬件毛利（~$340+）与默认搜索流量价值，但尚未形成跨硬件物理锁定，苹果零售店与系统弹窗的核心任务正是引导其配齐 AirPods 或开通 iCloud+。',
 noteEn: '<strong>Solo Tier Dynamics:</strong> A standalone iPhone buyer already delivers ~$340+ upfront hardware profit and search licensing value, but lacks peripheral lock-in—making AirPods and iCloud+ the primary upsell hooks.'
 },
 core: {
 statsZh: [
 ['典型设备组合', 'iPhone Pro + Watch + AirPods', '配件毛利与换机同步锁定'],
 ['年均生态退订/流失率', '~2.8%', '留存率 >97%（行业极值）'],
 ['年度服务贡献 ARPU', '$168 / 年', 'iCloud+ / Care+ / App 内购'],
 ['5年累计单客毛利 LTV', '$1,640', '约为单机入门户的 2.4 倍']
 ],
 statsEn: [
 ['Typical Hardware Mix', 'iPhone Pro + Watch + AirPods', 'Accessory GP + synchronized upgrades'],
 ['Annual Ecosystem Churn', '~2.8%', '>97% retention (industry peak)'],
 ['Annual Services ARPU', '$168 / yr', 'iCloud+ / Care+ / App Store IAPs'],
 ['5-Year Gross Profit LTV', '$1,640', '~2.4x Solo iPhone cohort LTV']
 ],
 noteZh: '<strong>单向棘轮效应（Ratchet Effect）：</strong>当用户为 iPhone 配齐 Apple Watch 与 AirPods 后，因为 Watch 仅兼容 iOS 且健康圆环、交通卡与音频无缝切换深度绑定，下一次换机放弃 iPhone 意味着<strong>外设资产瞬间报废</strong>——硬件辅件反过来成了主机的续费保险单 <a class="cite-link" href="https://www.reconanalytics.com/62-of-base-iphone-18-buyers-interested-in-switching-to-more-expensive-pro-pro-max-or-fold-models/" target="_blank" rel="noopener noreferrer">Recon 换机调研 ↗</a>。',
 noteEn: '<strong>The Ratchet Effect:</strong> Once a user pairs Apple Watch and AirPods with an iPhone, Watch’s iOS exclusivity and seamless audio/health ties mean leaving iOS <strong>renders peripherals obsolete</strong>—accessories act as an insurance policy on iPhone renewals <a class="cite-link" href="https://www.reconanalytics.com/62-of-base-iphone-18-buyers-interested-in-switching-to-more-expensive-pro-pro-max-or-fold-models/" target="_blank" rel="noopener noreferrer">Recon Survey ↗</a>.'
 },
 ultra: {
 statsZh: [
 ['典型设备组合', 'iPhone Duo/Pro + Mac + iPad + Watch + AirPods', '全场景工作流与家庭相册锁死'],
 ['年均生态退订/流失率', '< 1.2%', '近乎终身年金型现金流客户'],
 ['年度服务贡献 ARPU', '$340+ / 年', 'Apple One Premier + 2TB iCloud + Care+'],
 ['5年累计单客毛利 LTV', '$3,480+', '5年服务毛利贡献反超单次手机毛利']
 ],
 statsEn: [
 ['Typical Hardware Mix', 'iPhone Duo/Pro + Mac + iPad + Watch + AirPods', 'Full workflow & Family Sharing lock-in'],
 ['Annual Ecosystem Churn', '< 1.2%', 'Near-perpetual annuity customer'],
 ['Annual Services ARPU', '$340+ / yr', 'Apple One Premier + 2TB iCloud + Care+'],
 ['5-Year Gross Profit LTV', '$3,480+', '5Y Services GP exceeds hardware GP']
 ],
 noteZh: '<strong>超级全家桶年金层：</strong>家庭共享（Family Sharing）将配偶、父母与子女的相册、订阅与查找网络织成一张熟人关系网，脱离生态等同于“数字搬家”，使该客群的现金流确定性堪比公用事业收费站。',
 noteEn: '<strong>Super Household Annuity:</strong> Family Sharing binds spouses, parents, and kids into shared photo libraries, subscriptions, and Find My—turning exit into a painful “digital move” with utility-like cash-flow certainty.'
 }
 };

 function renderCohort(key) {
 state.activeCohort = key || 'core';
 var c = COHORTS[state.activeCohort] || COHORTS.core;
 var en = isEn();
 var stats = en ? c.statsEn : c.statsZh;
 document.getElementById('cohortMetrics').innerHTML = stats.map(function (s, idx) {
 var isMono = idx > 0 ? ' mono' : '';
 var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
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

 // Event bindings
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

 // High-DPI Canvas Helpers
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
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'FY26 P&amp;L Bridge ($B): Revenue → Gross Profit → Operating → Net → FCF' : 'FY26 价值转化桥 ($B)：营收 → 毛利 → 营业利润 → 净利 → FCF') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.profitSeries.svc ? '' : ' muted') + '" data-p-series="svc"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Services GM (%)' : '服务毛利率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.tot ? '' : ' muted') + '" data-p-series="tot"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Consolidated GM (%)' : '综合毛利率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.prd ? '' : ' muted') + '" data-p-series="prd"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Products GM (%)' : '硬件毛利率 (%)') + '</span></button>';
 }
 }

 var pLegEl = document.getElementById('profitLegend');
 if (pLegEl) {
 pLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-p-series]');
 if (!b) return;
 var k = b.getAttribute('data-p-series');
 state.profitSeries[k] = !state.profitSeries[k];
 if (!state.profitSeries.svc && !state.profitSeries.tot && !state.profitSeries.prd) state.profitSeries[k] = true;
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
 '<button type="button" class="legend-pill' + (state.cohortSeries.ultra ? '' : ' muted') + '" data-c-series="ultra"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Super Household (5+)' : '重度全家桶 (5台+)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.core ? '' : ' muted') + '" data-c-series="core"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Core Trio (3 Devs)' : '核心生态三件套 (3台)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.solo ? '' : ' muted') + '" data-c-series="solo"><span class="legend-dot" style="background:var(--mui-warning-main);"></span><span>' + (en ? 'Solo iPhone (1 Dev)' : '单机入门户 (1台)') + '</span></button>';
 } else {
 leg.innerHTML =
 '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Light Bar: Global Unit Share (%)' : '浅色柱：全球销量份额 (%)') + '</span>' +
 '<span class="mui-chip mui-chip-success mono">' + (en ? 'Solid Bar: Global Smartphone Operating Profit Share (%)' : '深色柱：全球手机营业利润池份额 (%)') + '</span>';
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
 var steps = [
 { lbl: en ? 'Hardware' : '硬件营收', val: 355.5, base: 0, col: pal.blue, tip: en ? 'FY26 Products Sales: $355.5B (iPhone $254.1B + Mac $37.9B + Wearables $35.6B + iPad $27.9B)' : 'FY2026 硬件净营收: $355.5B (iPhone $254.1B + Mac $37.9B + 穿戴 $35.6B + iPad $27.9B)' },
 { lbl: en ? '+Services' : '+服务营收', val: 123.3, base: 355.5, col: pal.green, tip: en ? 'FY26 Services Sales: +$123.3B (+13.0% YoY), lifting total sales to $478.83B' : 'FY2026 服务净营收: +$123.3B (+13.0% YoY)，推升总营收至 $478.83B' },
 { lbl: en ? 'Gross Profit' : '=总毛利', val: 233.7, base: 0, col: pal.violet, tip: en ? 'FY26 Gross Profit: $233.7B (48.8% GM = Products $139.7B + Services $94.0B)' : 'FY2026 综合毛利额: $233.7B (综合毛利率 48.8% = 硬件 $139.7B + 服务 $94.0B)' },
 { lbl: en ? 'Op Income' : '营业利润', val: 162.4, base: 0, col: pal.blue, tip: en ? 'Operating Income after R&D & lean SG&A: ~$162.4B (~33.9% OpM)' : '扣除研发与 SG&A 费用后营业利润约 ~$162.4B (营业利润率 ~33.9%)' },
 { lbl: en ? 'Net Income' : 'GAAP净利', val: 132.2, base: 0, col: pal.amber, tip: en ? 'FY26 GAAP Net Income: $132.18B (+18.0% YoY), 27.6% net margin' : 'FY2026 GAAP 净利润: $132.18B (+18.0% YoY)，净利率 27.6%' },
 { lbl: en ? 'Free Cash' : '自由现金流', val: 136.1, base: 0, col: pal.green, tip: en ? 'FY26 Free Cash Flow: $136.1B (+38% YoY), 103.0% conversion (CapEx only $9.0B)' : 'FY2026 自由现金流: $136.1B (+38% YoY)，FCF/净利转化率高达 103.0% (CapEx 仅 $9.0B)' }
 ];
 var maxV = 520;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var cx = pad.left + i * slotW + slotW / 2;
 var x = cx - barW / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(4, yBot - yTop);
 if (state.hover.profitCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slotW + 3, pad.top, slotW - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 if (state.hover.profitCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '$' + s.val.toFixed(1) + 'B', cx, yTop - 12, s.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(s.lbl, cx, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ idx: i, x: pad.left + i * slotW, y: pad.top, w: slotW, h: ph + 26, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
 var gmSvc = [69.7, 71.7, 70.8, 73.9, 75.1, 76.2];
 var gmTot = [41.8, 43.3, 44.1, 46.2, 46.9, 48.8];
 var gmPrd = [35.3, 36.3, 36.5, 37.2, 37.5, 39.3];
 var minM = 25, maxM = 85;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 var stepX = pw / (yrs.length - 1);
 yrs.forEach(function (y, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.profitCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 hitRegions.profitCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: y + (en ? ' Gross Margin Scissors' : ' 毛利率剪刀差'),
 body: (en ? 'Services: ' : '服务: ') + gmSvc[idx] + '% · ' + (en ? 'Total: ' : '综合: ') + gmTot[idx] + '% · ' + (en ? 'Products: ' : '硬件: ') + gmPrd[idx] + '%'
 });
 });
 function plotLine(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) {
 return { x: pad.left + idx * stepX, y: pad.top + ph - ((v - minM) / (maxM - minM)) * ph, v: v };
 });
 ctx.save();
 drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph);
 ctx.lineTo(pts[0].x, pad.top + ph);
 ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)');
 ctx.fillStyle = ag; ctx.fill(); ctx.restore();

 ctx.strokeStyle = col; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();

 pts.forEach(function (pt, idx) {
 var isHov = state.hover.profitCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.6 : 3.6, 0, Math.PI * 2); ctx.fill();
 if (idx === yrs.length - 1 || idx === 0 || isHov) {
 drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 13, col, pal);
 }
 });
 }
 if (state.profitSeries.svc) plotLine(gmSvc, pal.green, 'rgba(22, 163, 74, 0.16)');
 if (state.profitSeries.tot) plotLine(gmTot, pal.violet, 'rgba(124, 58, 237, 0.14)');
 if (state.profitSeries.prd) plotLine(gmPrd, pal.blue, 'rgba(0, 115, 230, 0.14)');
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
 var solo = [365, 405, 445, 635, 685];
 var core = [620, 790, 980, 1420, 1640];
 var ultra = [1280, 1690, 2120, 2960, 3480];
 var maxL = 3800;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0), pad.left - 8, gy + 4);
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
 body: (en ? '5+ Dev: $' : '5台+全家桶: $') + ultra[idx] + ' · ' + (en ? '3-Dev Trio: $' : '3台核心户: $') + core[idx] + ' · ' + (en ? 'Solo: $' : '单机户: $') + solo[idx]
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
 if (idx === 4 || isHov) drawValueBadge(ctx, '$' + pt.v, idx === 4 ? pt.x - 16 : pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.cohortSeries.ultra) drawCurve(ultra, pal.violet, 'rgba(124, 58, 237, 0.18)');
 if (state.cohortSeries.core) drawCurve(core, pal.blue, 'rgba(0, 115, 230, 0.16)');
 if (state.cohortSeries.solo) drawCurve(solo, pal.amber, 'rgba(217, 119, 6, 0.14)');
 } else {
 var vendors = [
 { name: 'Apple (iPhone)', unit: 20.5, prof: 83.0, col: pal.blue },
 { name: 'Samsung', unit: 19.0, prof: 12.5, col: pal.green },
 { name: en ? 'Xiaomi & Other Android' : 'Xiaomi / 其他安卓OEM', unit: 60.5, prof: 4.5, col: pal.amber }
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
 var uh = (v.unit / 100) * ph, prh = (v.prof / 100) * ph;
 if (state.hover.cohortCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + idx * slot + 4, pad.top, slot - 8, ph, 7); ctx.fill();
 }
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 4, pad.top + ph - uh, bw, uh, 5); ctx.fill();
 ctx.fillStyle = v.col;
 roundRect(ctx, cx + 4, pad.top + ph - prh, bw, prh, 5); ctx.fill();
 drawValueBadge(ctx, v.unit + '%', cx - bw / 2 - 4, pad.top + ph - uh - 12, pal.sub, pal);
 drawValueBadge(ctx, v.prof + '%', cx + bw / 2 + 4, pad.top + ph - prh - 12, v.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 idx: idx, x: pad.left + idx * slot, y: pad.top, w: slot, h: ph + 26,
 title: v.name,
 body: en ? ('Global Unit Share ~' + v.unit + '% vs. Operating Profit Share ~' + v.prof + '%') : ('全球销量份额 ~' + v.unit + '% vs 全球营业利润池占比 ~' + v.prof + '%')
 });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'shares') {
 var yrs = ['FY13', 'FY15', 'FY17', 'FY19', 'FY21', 'FY23', 'FY25', 'FY26'];
 var sh = [26.3, 23.2, 20.8, 18.4, 16.9, 15.8, 14.9, 14.53];
 var maxS = 28;
 for (var g = 0; g <= 4; g++) {
 var sv = (maxS / 4) * g, sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(sv.toFixed(0) + 'B', pad.left - 8, sy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(36, slot * 0.56);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = (sh[i] / maxS) * ph, yTop = pad.top + ph - bh;
 if (state.hover.capitalCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = (i === yrs.length - 1) ? pal.green : pal.blue;
 roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
 if (state.hover.capitalCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(sh[i].toFixed(1) + 'B', cx, yTop - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: y + (en ? ' Split-Adjusted Diluted Shares' : ' 拆股调整后摊薄股本'),
 body: sh[i].toFixed(2) + (en ? 'B shares (-' : 'B 股（较 FY13 累计缩减 ') + ((1 - sh[i] / 26.3) * 100).toFixed(1) + (en ? '% vs. FY13)' : '%）')
 });
 });
 } else {
 var items = [
 { name: 'Apple (AAPL)', ccc: -58, col: pal.green, tip: en ? 'DIO ~9d + DSO ~28d - DPO ~95d = -58d (supplier interest-free float)' : 'DIO ~9天 + DSO ~28天 - DPO ~95天 = -58天（上游供应商免息浮存金）' },
 { name: 'Costco (COST)', ccc: -4, col: pal.blue, tip: en ? 'High-velocity retail: inventory sells before supplier invoices come due' : '快周转零售标杆：库存未付账款即已完成终端现款销售' },
 { name: en ? 'Samsung' : 'Samsung 电子', ccc: 72, col: pal.amber, tip: en ? 'Heavy fab & display inventory requires substantial working capital' : '重晶圆与面板制造库存，需垫付大量营运资金' },
 { name: 'NVIDIA (NVDA)', ccc: 85, col: pal.violet, tip: en ? 'Rapid AI scaling requires TSMC CoWoS & HBM capacity prepayments' : '高速扩张期需预付台积电 CoWoS 与 HBM 存储产能账款' }
 ];
 var zeroX = pad.left + pw * 0.44;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(zeroX, pad.top); ctx.lineTo(zeroX, pad.top + ph); ctx.stroke();
 var rowH = ph / items.length;
 items.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 22, scale = (pw * 0.5) / 100;
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

 var simData = { eps: [8.98, 9.9, 10.9, 12.1, 13.3, 14.7], rev: [478.8, 515, 554, 596, 640, 686] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.simMiniCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var arr = simData.eps;
 var maxE = Math.max(18, Math.ceil(Math.max.apply(null, arr) * 1.15));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

 var pts = arr.map(function (v, i) {
 return { x: pad.left + (i / 5) * pw, y: pad.top + ph - (v / maxE) * ph, v: v };
 });

 ctx.save(); drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, 'rgba(0, 115, 230, 0.24)'); ag.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
 ctx.fillStyle = ag; ctx.fill(); ctx.restore();

 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();

 var slot = pw / 5;
 pts.forEach(function (pt, i) {
 var isHov = state.hover.simMiniCanvas === i;
 if (isHov) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(pt.x, pad.top); ctx.lineTo(pt.x, pad.top + ph); ctx.stroke(); ctx.restore();
 ctx.fillStyle = 'rgba(0, 115, 230, 0.20)'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill();
 }
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 5.2 : 4, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '$' + pt.v.toFixed(2), pt.x, pt.y - 13, (i === 5) ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(yrs[i], pt.x, pad.top + ph + 16);
 hitRegions.simMiniCanvas.push({
 idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 title: yrs[i] + (en ? ' Projected EPS' : ' 推演 EPS'),
 body: (en ? 'Diluted EPS: $' : '摊薄 EPS: $') + pt.v.toFixed(2) + (en ? ' · Est. Revenue: $' : ' · 推演营收: $') + Math.round(simData.rev[i]) + 'B'
 });
 });
 }

 function runSimulator() {
 var gS = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
 var gP = parseFloat(document.getElementById('inpProdCagr').value) / 100;
 var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblSvcCagr').textContent = (gS * 100).toFixed(1) + '%';
 document.getElementById('lblProdCagr').textContent = (gP * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

 var prod = 355.54, svc = 123.30, shares = 14.53;
 var baseGp = prod * 0.393 + svc * 0.762;
 var epsArr = [8.98], revArr = [478.83];
 for (var y = 1; y <= 5; y++) {
 prod *= (1 + gP); svc *= (1 + gS); shares *= (1 - buy);
 var gp = prod * 0.393 + svc * 0.765;
 var netInc = 132.18 * (gp / baseGp);
 epsArr.push(netInc / shares);
 revArr.push(prod + svc);
 }
 var fy31Rev = prod + svc;
 var fy31Gm = ((prod * 0.393 + svc * 0.765) / fy31Rev) * 100;
 var fy31Eps = epsArr[5];
 var epsCagr = (Math.pow(fy31Eps / 8.98, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '$' + Math.round(fy31Rev) + 'B';
 document.getElementById('simGmOut').textContent = fy31Gm.toFixed(1) + '%';
 document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
 document.getElementById('simCagrOut').textContent = (epsCagr >= 0 ? '+' : '') + epsCagr.toFixed(1) + '%';
 simData.eps = epsArr;
 simData.rev = revArr;
 drawSimMiniCanvas();
 }

 ['inpSvcCagr', 'inpProdCagr', 'inpBuyRate'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = { bear: { s: 7.5, p: 1.5, b: 1.8 }, base: { s: 12.5, p: 5.5, b: 2.4 }, bull: { s: 15.5, p: 8.5, b: 3.0 } };
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
 if (state.hover[canvasId] !== nextIdx) {
 state.hover[canvasId] = nextIdx;
 redrawFn();
 }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 305, Math.max(12, clientX + 14)) + 'px';
 tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, clientY - 28)) + 'px';
 } else {
 tip.style.display = 'none';
 }
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
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$478.83B 营收 · 48.8% 毛利率 · 负获客成本漏斗' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '自研芯片 → 错峰定价 → 6大OS锁死 → 服务税 → 缩股' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与服务拆解', s: '$123.3B 服务营收 · 76.2% 毛利率 · 贡献 40.2% 毛利' },
 { id: 'mod-cohort', t: 'M3 多设备棘轮效应与单客 LTV', s: '1台 vs 3台 vs 5台全家桶留存率与 83% 手机利润份额' },
 { id: 'mod-capital', t: 'M4 -58天负营运资本与缩股推演器', s: '13年注销 44.8% 股本 · 5年 EPS 复利交互模拟' },
 { id: 'mod-matrix', t: 'M5 六大科技巨头商业范式对标与压测', s: 'AAPL vs MSFT / GOOGL / NVDA / COST / Samsung' }
 ];
 var QUICK_EN = [
 { id: 'mod-deck', t: 'M0 Command Deck & Economic Formula', s: '$478.83B Sales · 48.8% GM · Negative-CAC Funnel' },
 { id: 'mod-pipeline', t: 'M1 5-Node Value-Chain Pipeline', s: 'Silicon → Staggered Pricing → 6-OS Lock-In → Tollbooth → Buybacks' },
 { id: 'mod-profit-pool', t: 'M2 Profit Pool Waterfall & Services Stack', s: '$123.3B Services · 76.2% GM · 40.2% of Total Gross Profit' },
 { id: 'mod-cohort', t: 'M3 Multi-Device Ratchet & Cohort LTV', s: '1 vs. 3 vs. 5+ Devices Retention & 83% Smartphone Profit Share' },
 { id: 'mod-capital', t: 'M4 -58d Negative CCC & EPS Compounder', s: '44.8% Share Count Reduction · 5-Year Interactive Simulator' },
 { id: 'mod-matrix', t: 'M5 Mega-Cap Peer Matrix & Stress Audit', s: 'AAPL vs. MSFT / GOOGL / NVDA / COST / Samsung' }
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
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
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
 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
 if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
 });

 var resizeTimer = null;
 window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawAllCharts, 90); });
 runSimulator();
 drawAllCharts();
 })();
 