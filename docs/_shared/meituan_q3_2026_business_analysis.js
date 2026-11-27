
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'meituan_q3_26_stress_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var TITLE_ZH = '美团 Meituan (3690.HK) 2026 Q3 财报深度拆解 | 数据中心';
 var TITLE_EN = 'Meituan (3690.HK) Q3 2026 Earnings Deep Dive | Research Hub';

 var state = {
 theme: 'light',
 lang: 'zh',
 activeLens: 0,
 activeNode: 0,
 activeCohort: 'delivery',
 pView: 'waterfall',
 cView: 'swing',
 kView: 'cash',
 profitSeries: { clcOpm: true, gm: true, grpOpm: true },
 cohortSeries: { q326: true, q226: true, q325: true },
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
 zh: '2026年11月27日美团公布的三季报给出了清晰的产业信号：随着夏季补贴战降温、平均客单价同比明显回升及低价订单占比收缩，<strong>外卖行业正式迎来拐点</strong> <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">美团官方三季报 ↗</a>。公司单季实现总营收 <strong>1,155.56亿元（+21.6% YoY，+10.4% QoQ）</strong>，超越市场一致预期（1,133.7亿元）；核心本地商业经营利润修复至 <strong>57.04亿元（7.3% 经营利润率）</strong>，较去年同期亏损 141.07亿元大幅反转近 200 亿元 <a class="cite-link" href="https://www.ithome.com/1/033/545.htm" target="_blank" rel="noopener noreferrer">财报核心数据 ↗</a>。与此同时，新业务亏损环比收窄至 <strong>13.12亿元（亏损率 3.5%）</strong>，Keeta 在香港与沙特实现全季盈利。不过受暑期营销推广（销售费用 270.2亿元高于预期）及公允价值变动剔除影响，经调整净利润录得 <strong>18.50亿元</strong>（略低于市场一致预期 22.0亿元） <a class="cite-link" href="https://mlq.ai/news/meituan-stays-profitable-in-q3-as-revenue-rises-216-to-rmb1156-billion/" target="_blank" rel="noopener noreferrer">MLQ 财报摘要 ↗</a>，呈现出“<strong>营收与毛利强劲超预期、利润处于修复爬坡期</strong>”的典型拐点特征。',
 en: 'Meituan’s Q3 2026 results released on November 27, 2026 signal a decisive industry turn: as summer subsidy wars cooled, average order value rebounded meaningfully YoY, and low-priced orders shrank, <strong>China’s food delivery industry reached an inflection point</strong> <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">Official Release ↗</a>. Total revenue rose <strong>21.6% YoY (+10.4% QoQ) to ¥115.56B</strong>, beating consensus (¥113.37B). Core Local Commerce operating profit swung nearly ¥20B from a ¥14.07B loss a year ago to <strong>+¥5.70B (7.3% OPM)</strong> <a class="cite-link" href="https://www.ithome.com/1/033/545.htm" target="_blank" rel="noopener noreferrer">Financial Summary ↗</a>. New Initiatives losses narrowed QoQ to <strong>-¥1.31B (-3.5% margin)</strong> as Keeta achieved full-quarter profitability in Saudi Arabia. However, higher S&amp;M (¥27.02B vs. ¥25.31B est.) kept Adjusted Net Profit at <strong>¥1.85B</strong> (slightly below ¥2.20B consensus) <a class="cite-link" href="https://mlq.ai/news/meituan-stays-profitable-in-q3-as-revenue-rises-216-to-rmb1156-billion/" target="_blank" rel="noopener noreferrer">MLQ Analysis ↗</a>.'
 },
 m2_caption: {
 zh: '数据来源：<a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">美团 Q3 2026 业绩公告 ↗</a> 与 <a class="cite-link" href="https://finance.stockstar.com/IG2026112700033926.shtml" target="_blank" rel="noopener noreferrer">财务明细拆解 ↗</a>。Q3 经营利润 27.41亿元中包含金融投资公允价值变动收益 23亿元（Q2 为 5,480万元）及 10亿元其他收益；同时未分配项目亏损由 44.10亿元收窄至 <strong>16.52亿元</strong>（含股份支付 19.12亿元），体现总部降本与内生盈利双轨修复。',
 en: 'Sources: <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">Meituan Q3 2026 Release ↗</a> &amp; <a class="cite-link" href="https://finance.stockstar.com/IG2026112700033926.shtml" target="_blank" rel="noopener noreferrer">Financial Breakdown ↗</a>. Q3 operating profit (¥2.74B) included ¥2.3B fair value gains (vs. ¥54.8M in Q2) and ¥1.0B other gains, while unallocated losses narrowed from ¥4.41B to <strong>¥1.65B</strong> (incl. ¥1.91B SBC).'
 },
 m3_caption: {
 zh: '预期差提示：<a class="cite-link" href="https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285" target="_blank" rel="noopener noreferrer">BigGo 预期差分析 ↗</a>。Q3 总营收（1,155.6亿 vs 预期 1,133.7亿）、毛利（376.8亿 vs 预期 356.9亿）与核心商业经营利润（57.0亿 vs 预期 41.5亿）全面 Beat；但销售费用（270.2亿 vs 预期 253.1亿）偏高导致经调整净利（18.5亿）小幅低于共识（22.0亿）。',
 en: 'Consensus Variance: <a class="cite-link" href="https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285" target="_blank" rel="noopener noreferrer">BigGo Earnings Review ↗</a>. Revenue (¥115.6B vs. ¥113.4B), Gross Profit (¥37.7B vs. ¥35.7B), and CLC Operating Profit (¥5.70B vs. ¥4.15B) all beat consensus; higher S&amp;M (¥27.0B vs. ¥25.3B) drove the modest Adj. Net Profit miss (¥1.85B vs. ¥2.20B).'
 },
 m4_caption: {
 zh: '资产负债表安全边际：截至 2026年9月30日，美团持有现金及现金等价物 <strong>1,041.4亿元</strong> + 短期理财投资 <strong>533.8亿元</strong>，合计 <strong>1,575.3亿元</strong>；Q3 经营活动现金净流入 47.84亿元（高于期内净利），流动性极为充裕 <a class="cite-link" href="https://finance.stockstar.com/IG2026112700033926.shtml" target="_blank" rel="noopener noreferrer">现金与债务明细 ↗</a>。',
 en: 'Balance Sheet Fortress: As of Sept 30, 2026, Meituan held <strong>¥104.14B cash</strong> + <strong>¥53.38B short-term treasury investments</strong> (<strong>¥157.53B total</strong>), with ¥4.78B Q3 operating cash inflow exceeding GAAP net profit <a class="cite-link" href="https://finance.stockstar.com/IG2026112700033926.shtml" target="_blank" rel="noopener noreferrer">Cash &amp; Debt Details ↗</a>.'
 },
 s1_body: {
 zh: '虽然 Q3 外卖补贴趋理性，但销售及营销开支仍达 <strong>270.2亿元</strong>（高于市场一致预期的 253.1亿元），导致经调整净利润（18.5亿元）略低于预期。花旗等机构提醒，四季度气温下降叠加骑手社保/职业伤害保障全国落地，冬季运力补贴可能阶段性压制利润率 <a class="cite-link" href="https://digg.com/tech/nhn436ef" target="_blank" rel="noopener noreferrer">机构风险提示 ↗</a>。',
 en: 'Even as delivery subsidies rationalized, S&amp;M reached <strong>¥27.02B</strong> (above ¥25.31B consensus), trimming Adj. Net Profit to ¥1.85B. Citi flagged that Q4 colder weather plus nationwide rider injury/pension subsidies may seasonally pressure courier costs <a class="cite-link" href="https://digg.com/tech/nhn436ef" target="_blank" rel="noopener noreferrer">Street Commentary ↗</a>.'
 },
 s3_body: {
 zh: '截至9月30日，美团持有智谱 3.53%、宇树科技 6.85% 等股权，Q3 计入其他全面收益（OCI）的公允价值变动亏损达 <strong>122亿元</strong>（虽不影响当期损益表，但影响净资产）。同时 Keeta 在巴西已拓展至 32 座城市，需观察巴西前期投入是否会拖累新业务进一步减亏节奏 <a class="cite-link" href="https://finance.stockstar.com/IG2026112700033926.shtml" target="_blank" rel="noopener noreferrer">OCI 投资明细 ↗</a>。',
 en: 'Meituan holds 3.53% of Zhipu AI and 6.85% of Unitree Robotics, booking a <strong>¥12.2B fair value loss in OCI</strong> in Q3 (non-P&amp;L, impacts equity). Meanwhile, Keeta’s expansion to 32 Brazilian cities warrants tracking to ensure overseas spend does not stall New Initiatives loss narrowing <a class="cite-link" href="https://finance.stockstar.com/IG2026112700033926.shtml" target="_blank" rel="noopener noreferrer">OCI Disclosures ↗</a>.'
 }
 };

 var LENSES = [
 {
 formulaZh: '核心商业利润大反转 (+¥198.1亿 YoY) = 客单价回升 + 补贴扣减收窄 (配送+25.3%) + 综合毛利率跃升至 32.61% (+6.57ppt)',
 formulaEn: 'CLC Op. Profit Swing (+¥19.81B YoY) = AOV Rebound + Disciplined Subsidies (Delivery +25.3%) + Gross Margin 32.61% (+6.57ppt)',
 bodyZh: '2025年Q3是外卖补贴战最惨烈的谷底（核心商业单季亏损 141.1亿元）。2026年Q3在夏季旺季后行业补贴明显回归理性，美团外卖不仅守住 &gt;60% 份额，更通过“一对一急送”与“拼好饭/神抢手”分层运营拉升客单价，核心本地商业经营利润率从 -21.0% 修复至 <strong>7.3%</strong>，大超市场预期（41.5亿 vs 实际 57.0亿）。',
 bodyEn: 'Q3 2025 marked the trough of China’s delivery subsidy war (-¥14.07B CLC loss). In Q3 2026, post-summer subsidy discipline, rising AOV, and tiered fulfillment (“1-on-1 Express” &amp; “Pinhaofan”) lifted CLC operating profit to <strong>¥5.70B (7.3% OPM)</strong>—beating the ¥4.15B Street consensus.'
 },
 {
 formulaZh: '预期差拆解：营收 Beat (+¥21.9亿) + 毛利 Beat (+¥19.9亿) - 销售费用超支 (+¥17.1亿) → 经调整净利微逊 (-¥3.5亿)',
 formulaEn: 'Variance Bridge: Rev Beat (+¥2.19B) + GP Beat (+¥1.99B) - S&amp;M Overshoot (+¥1.71B) → Adj. NP Variance (-¥0.35B)',
 bodyZh: '为什么营收和核心利润双双 Beat，股价却出现波动？核心在于 Q3 销售及营销费用为 <strong>270.2亿元</strong>（高于预期的 253.1亿元），反映暑期旺季与到店防守仍有必要投入；同时 Q3 经营利润 27.4亿中包含 23亿金融投资公允价值收益（非经营性项目），剔除后经调整净利为 <strong>18.50亿元</strong>（环比 Q2 的 25.24亿小幅回落）。',
 bodyEn: 'Why did shares waver despite strong top-line and CLC beats? S&amp;M expenses hit <strong>¥27.02B</strong> (vs. ¥25.31B est.) on summer promotions and in-store defense, while ¥2.3B of operating profit came from non-operating fair value gains—leaving Non-IFRS Adjusted Net Profit at <strong>¥1.85B</strong> vs. ¥2.20B consensus.'
 },
 {
 formulaZh: '第二曲线减亏 (¥-13.1亿 / -3.5% OPM) + 科技底座 (¥77.2亿 R&amp;D · LongCat-2.5 1.6T开源 · 妙手服务 200万+商家)',
 formulaEn: 'New Biz Loss Narrowing (-¥1.31B / -3.5% OPM) + Tech Stack (¥7.72B R&amp;D · LongCat-2.5 1.6T · CatPaw &gt;2M Merchants)',
 bodyZh: '新业务营收飙升 <strong>+32.9% YoY 至 372.7亿元</strong>，小象超市已布局 85城并开出 9家线下门店，Keeta 在香港与沙特实现全季盈利并进军巴西 32城，亏损率同比收窄 1.1pct 至 3.5%。AI 方面，自研 1.6万亿参数 LongCat-2.5 开源，商家端“妙手”工作台覆盖超 200万商家，无人机累计完单超 110万笔。',
 bodyEn: 'New Initiatives revenue surged <strong>+32.9% YoY to ¥37.27B</strong>: Xiaoxiang Supermarket operates in 85 cities with 9 offline stores, and Keeta turned profitable in Saudi Arabia while expanding across 32 Brazilian cities. Meanwhile, 1.6T-param LongCat-2.5 was open-sourced and CatPaw serves &gt;2M merchants.'
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
 badge: 'NODE 01 · FOOD DELIVERY INFLECTION & UE',
 titleZh: '外卖行业迎拐点：客单价回升与低价订单收缩驱动 UE 修复',
 titleEn: 'Delivery Inflection: AOV Rebound & Lower Low-Price Mix Lift UE',
 descZh: '管理层在三季报中明确定调“外卖行业迎来拐点”：夏季促销旺季过后行业补贴更趋理性，平台低价内卷订单占比持续下降，平均客单价同比明显回升。叠加“一对一急送”付费履约拓展与“拼好饭/神抢手”精细化分层，配送服务收入同比大增 25.3% 至 288.74亿元，全集团毛利率同比跃升 6.57 个百分点至 32.61%。',
 descEn: 'Management declared an industry inflection point in Q3: post-summer subsidies grew rational, low-priced order mix shrank, and AOV rebounded meaningfully YoY. Combined with paid “1-on-1 Express” and Pinhaofan tiering, delivery services revenue jumped 25.3% YoY to ¥28.87B, lifting group gross margin +6.57ppt to 32.61%.',
 formulaZh: '价值传导：补贴退潮减少收入扣减 + AOV 回升 → 配送服务收入 +25.3% YoY → 集团毛利额同比暴增 +52.2% 至 ¥376.84亿',
 formulaEn: 'Value Flow: Lower contra-revenue subsidies + AOV rebound → Delivery Rev +25.3% YoY → Gross Profit surged +52.2% YoY to ¥37.68B',
 kpisZh: [['¥288.7亿', 'Q3 配送服务净收入 (+25.3%)'], ['32.61%', '集团毛利率 (+6.57pct YoY)'], ['>60%', '美团外卖 GTV 市场份额'], ['22万家', '年内累计赋能餐饮小店数']],
 kpisEn: [['¥28.87B', 'Q3 Delivery Services Rev (+25.3%)'], ['32.61%', 'Group Gross Margin (+6.57ppt YoY)'], ['>60%', 'Meituan Delivery GTV Share'], ['220k+', 'Small Restaurants Supported YTD']]
 },
 {
 badge: 'NODE 02 · CORE LOCAL COMMERCE & VIP LOCK-IN',
 titleZh: '核心本地商业：到店酒旅高质量增长，4,000万+高等级会员构筑护城河',
 titleEn: 'Core Local Commerce: In-Store Resilience & 40M+ VIP Ecosystem',
 descZh: '面对抖音等平台在到店团购上的竞争，美团以确定性搜索心智、“美团直订”排队点餐数字化工具及“繁盛计划”反哺守店商家，推动商家服务（佣金+在线营销）收入稳增 8.2% 至 434.07亿元。截至三季度末，美团高等级会员规模已突破 4,000万，并与超 2,000个品牌建立联合会员体系，大幅提升跨业务复购粘性。',
 descEn: 'Defending in-store share against Douyin, Meituan leveraged high-intent search, smart ordering SaaS, and the “Prosperity Plan” to grow Merchant Services +8.2% YoY to ¥43.41B. Higher-tier membership surpassed 40M users with 2,000+ brand co-memberships, anchoring cross-category retention.',
 formulaZh: '价值传导：4,000万+ 高阶会员 × 到家/到店交叉引流 → 核心本地商业经营利润 57.04亿元（同比减亏近 200亿元）',
 formulaEn: 'Value Flow: 40M+ VIPs × cross-category frequency → CLC Operating Profit ¥5.70B (nearly ¥20B YoY turnaround)',
 kpisZh: [['¥782.8亿', '核心本地商业 Q3 营收 (+16.8%)'], ['¥57.04亿', '核心商业经营利润 (vs -141.1亿)'], ['7.3%', '核心商业经营利润率 (Q2 7.9%)'], ['4,000万+', '高等级会员与2000+联合品牌']],
 kpisEn: [['¥78.28B', 'Q3 CLC Revenue (+16.8% YoY)'], ['¥5.70B', 'CLC Op. Profit (vs. -¥14.07B)'], ['7.3%', 'CLC Operating Margin (Q2: 7.9%)'], ['40M+', 'Higher-Tier VIPs & 2,000+ Brands']]
 },
 {
 badge: 'NODE 03 · INSTASHOPPING & 1P INFRASTRUCTURE',
 titleZh: '美团闪购与自营闪电仓：+75.8% 增速成核心商业最强阿尔法',
 titleEn: 'Meituan Instashopping: +75.8% 1P Merchandise Growth Engine',
 descZh: '即时零售正从“需求拉动”迈入“供给驱动”新阶段。Q3 核心本地商业中药品、酒类等自营商品销售收入飙升 75.8% 至 42.61亿元，成为增速最亮眼的子板块。“歪马送酒”专属履约基建与“品牌官旗闪电仓”助推节日礼赠与IP联名爆品放量，同时24小时药房服务已携手数百家连锁药企延伸至低线及偏远地区。',
 descEn: 'Instant retail is shifting into supply-driven growth. CLC 1P merchandise sales (pharma, liquor) surged +75.8% YoY to ¥4.26B—the fastest sub-line. Waima liquor delivery, Brand Flagship Lightning Warehouses, and 24-hour pharmacies in lower-tier cities drove higher repeat purchase frequency.',
 formulaZh: '价值传导：品牌闪电仓 + 歪马送酒专仓 + 24h药房下沉 → 老客复购率与频次双升 → 自营商品收入同比 +75.8%',
 formulaEn: 'Value Flow: Lightning Warehouses + Waima + 24h Pharmacies → higher repeat frequency → +75.8% YoY 1P sales',
 kpisZh: [['¥42.61亿', '核心商业自营商品销售 (+75.8%)'], ['24小时', '数百家连锁药房低线全天候履约'], ['官旗闪电仓', '品牌节日礼赠与IP联名直供'], ['歪马送酒', '酒水饮料专属前置仓高增速']],
 kpisEn: [['¥4.26B', 'CLC 1P Goods Sales (+75.8% YoY)'], ['24-Hour', 'Pharmacy Network in Lower Tiers'], ['Flash Stores', 'Brand Flagship Instant Warehouses'], ['Waima', 'Dedicated Liquor On-Demand Infra']]
 },
 {
 badge: 'NODE 04 · XIAOXIANG GROCERY & KEETA GLOBAL',
 titleZh: '新业务双轮驱动：小象超市 85 城成熟期盈利 + Keeta 沙特全季转盈',
 titleEn: 'New Initiatives: Xiaoxiang 85 Cities & Keeta Saudi Full-Quarter Profit',
 descZh: '新业务 Q3 营收 372.73亿元（+32.9% YoY），商品销售大增 48.6%，经营亏损环比由 Q2 的 17.4亿元进一步收窄至 13.12亿元（亏损率 3.5%）。国内“小象超市”已覆盖 85 座城市且成熟城市实现盈利转正，并在京杭深落地 9 家线下店配合社区店“快乐猴”；海外 Keeta 在香港与沙特阿拉伯先后实现盈利，巴西以圣保罗为核心拓展至 32 座城市。',
 descEn: 'New Initiatives revenue grew +32.9% YoY to ¥37.27B with loss narrowing QoQ from ¥1.74B to ¥1.31B (-3.5% margin). Xiaoxiang Supermarket operates in 85 cities (mature cities profitable) plus 9 offline stores and Happy Monkey. Overseas, Keeta achieved full-quarter profitability in Saudi Arabia and expanded to 32 Brazilian cities.',
 formulaZh: '价值传导：小象自有品牌占比提升 + Keeta 沙特/香港盈利造血 → 新业务亏损率同比收窄 1.1pct 至 -3.5%',
 formulaEn: 'Value Flow: Xiaoxiang private-label mix + Keeta HK/Saudi profitability → segment loss margin narrowed 1.1ppt to -3.5%',
 kpisZh: [['¥372.7亿', '新业务 Q3 营收 (+32.9% YoY)'], ['-3.5%', '新业务亏损率 (同比收窄 1.1pct)'], ['85城 / 9店', '小象超市在营城市与线下门店'], ['HK & 沙特盈利', 'Keeta 巴西已覆盖 32 座城市']],
 kpisEn: [['¥37.27B', 'New Initiatives Rev (+32.9% YoY)'], ['-3.5%', 'Loss Margin (+1.1ppt YoY)'], ['85 Cities / 9', 'Xiaoxiang Cities & Offline Stores'], ['32 Cities', 'Keeta Brazil (HK & Saudi Profitable)']]
 },
 {
 badge: 'NODE 05 · LONGCAT-2.5 AI & M-DRONE LOGISTICS',
 titleZh: '科技底座：1.6T LongCat-2.5 开源、“妙手”服务 200 万商家与无人机出海',
 titleEn: 'AI & Physical Tech: LongCat-2.5 Open-Source, CatPaw & M-Drone 4L',
 descZh: 'Q3 研发投入 77.2亿元（+11.3% YoY）。11月美团正式发布并开源 1.6万亿参数多模态大模型 LongCat-2.5；B 端 AI 工作台“妙手”（CatPaw）已服务超 200万商家，配合“手艺人 Agent”与“超级厨房”实现经营闭环；C 端 AI 管家“小团”国庆调用量较五一增长超 60%。物理世界方面，第四代 M-Drone 4L 无人机落地迪拜与阿斯塔纳，全球累计完单超 110万笔。',
 descEn: 'Q3 R&D reached ¥7.72B (+11.3% YoY). Meituan open-sourced its 1.6T-param LongCat-2.5 model in November; merchant AI workbench CatPaw serves 2M+ merchants alongside Handyman Agent and Super Kitchen; consumer AI XiaoTuan usage jumped 60%+ during National Day. M-Drone 4L debuted in Dubai/Astana with 1.1M+ cumulative orders.',
 formulaZh: '价值传导：LongCat-2.5 自研基座 → 妙手/小团提升供需匹配与人效 + M-Drone 4L 拓展低空履约边界',
 formulaEn: 'Value Flow: LongCat-2.5 foundation → CatPaw/XiaoTuan merchant & user ROI + M-Drone 4L low-altitude logistics',
 kpisZh: [['¥77.2亿', 'Q3 季度研发投入 (+11.3% YoY)'], ['1.6T 参数', 'LongCat-2.5 多模态大模型开源'], ['200万+商家', 'AI 工作台“妙手”(CatPaw) 覆盖'], ['110万+单', '美团无人机全球累计完单量']],
 kpisEn: [['¥7.72B', 'Q3 R&D Spend (+11.3% YoY)'], ['1.6T Params', 'LongCat-2.5 Open-Source Model'], ['2M+ Merchants', 'CatPaw AI Workbench Adoption'], ['1.1M+ Orders', 'Cumulative Global Drone Deliveries']]
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
 delivery: {
 statsZh: [
 ['Q3 配送服务净收入', '¥288.74亿', '同比 +25.3%（补贴扣减大幅收窄）'],
 ['行业竞争定调', '迎来拐点', '客单价同比回升，低价单收缩'],
 ['骑手生态保障', '全国落地', '新职伤险 + 养老补贴全覆盖'],
 ['市场份额防线', '>60% GTV', '巩固高频即时配送龙头地位']
 ],
 statsEn: [
 ['Q3 Delivery Net Rev', '¥28.87B', '+25.3% YoY (disciplined subsidies)'],
 ['Industry Regime', 'Inflection', 'AOV rebounding, low-price mix down'],
 ['Courier Welfare', 'Nationwide', 'Injury insurance & pension subsidies'],
 ['Market Share Moat', '>60% GTV', 'Defended core on-demand leadership']
 ],
 noteZh: '<strong>外卖 UE 修复核心逻辑：</strong>外卖业务不仅贡献了配送费，更承担了整个美团生态的“高频流量入口”角色。Q3 平均客单价回升叠加“一对一急送”等高附加值履约产品普及，使美团在不再打无底洞价格战的前提下稳住了 60%+ 的份额底盘。',
 noteEn: '<strong>Delivery UE Recovery Logic:</strong> Beyond delivery fees, food delivery acts as Meituan’s high-frequency acquisition funnel. Higher AOV and paid express tiers allowed Meituan to stabilize >60% GTV share without destructive subsidy burn.'
 },
 instore: {
 statsZh: [
 ['商家服务 (佣金+营销)', '¥434.07亿', '同比 +8.2%，到店酒旅高质量增长'],
 ['自营商品销售 (闪购)', '¥42.61亿', '同比 +75.8%（歪马/24h药店领跑）'],
 ['高等级会员底座', '4,000万+', '联合 2,000+ 品牌共建会员权益'],
 ['核心商业经营利润', '¥57.04亿', '经营利润率 7.3% (去年同期 -21.0%)']
 ],
 statsEn: [
 ['Merchant Services', '¥43.41B', '+8.2% YoY, resilient in-store/hotel'],
 ['1P Merchandise (Flash)', '¥4.26B', '+75.8% YoY (Waima & 24h pharma)'],
 ['Higher-Tier VIP Base', '40M+', '2,000+ co-branded memberships'],
 ['CLC Operating Profit', '¥5.70B', '7.3% OPM (vs. -21.0% in Q3 2025)']
 ],
 noteZh: '<strong>高毛利池与第二引擎：</strong>到店酒旅是美团最核心的高毛利现金牛，用来交叉补贴前置投入；而美团闪购（自营+平台）则在 Q3 展现出 +75.8% 的自营商品爆发力，正在把“送餐网络”复用到“万物30分钟达”的高客单品类上。',
 noteEn: '<strong>Profit Pool & Second Engine:</strong> In-store & hotel remains the core high-margin cash engine, while Instashopping (+75.8% 1P growth) monetizes the same rider mesh across higher-ticket categories like liquor, pharma, and electronics.'
 },
 overseas: {
 statsZh: [
 ['新业务 Q3 总营收', '¥372.73亿', '同比 +32.9%（商品销售 +48.6%）'],
 ['新业务经营亏损', '-¥13.12亿', '环比 Q2 (-17.4亿) 明显收窄'],
 ['小象超市覆盖版图', '85座城市', '成熟城市转正 + 9家线下实体店'],
 ['Keeta 海外商业化', '香港/沙特盈利', '巴西以圣保罗为中心拓展至32城']
 ],
 statsEn: [
 ['New Initiatives Rev', '¥37.27B', '+32.9% YoY (Goods sales +48.6%)'],
 ['Segment Op. Loss', '-¥1.31B', 'Narrowed from -¥1.74B in Q2 2026'],
 ['Xiaoxiang Grocery', '85 Cities', 'Mature cities profitable + 9 stores'],
 ['Keeta Global', 'HK & Saudi +', 'Brazil scaled to 32 cities (São Paulo)']
 ],
 noteZh: '<strong>从“烧钱换规模”转向“单城盈利验证”：</strong>小象超市通过自有品牌占比环比提升与客单价上移，在成熟城市跑通盈利模型；海外 Keeta 更是在进入沙特后实现整个 Q3 单季盈利，证明美团算法调度与履约运营模型具备跨国复制能力。',
 noteEn: '<strong>From Cash Burn to Unit Profitability:</strong> Xiaoxiang’s private-label mix and higher AOV turned mature cities profitable, while Keeta achieved full-quarter profitability in Saudi Arabia—validating global portability of Meituan’s dispatch stack.'
 }
 };

 function renderCohort(key) {
 state.activeCohort = key || 'delivery';
 var c = COHORTS[state.activeCohort] || COHORTS.delivery;
 var en = isEn();
 var stats = en ? c.statsEn : c.statsZh;
 document.getElementById('cohortMetrics').innerHTML = stats.map(function (s, idx) {
 var isMono = idx === 0 || idx === 3 ? ' mono' : '';
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '">' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
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
 var lb = document.getElementById('sideThemeLightBtn'), db = document.getElementById('sideThemeDarkBtn');
 if (lb) lb.setAttribute('aria-pressed', String(state.theme === 'light'));
 if (db) db.setAttribute('aria-pressed', String(state.theme === 'dark'));
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
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Q3 2026 P&amp;L Bridge (¥B): CLC + New Biz → Gross Profit → Op. Profit → Net → OCF' : 'Q3 2026 损益转化桥 (¥B)：核心商业 + 新业务 → 毛利 → 经营利润 → 净利 → 经营现金流') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.profitSeries.gm ? '' : ' muted') + '" data-p-series="gm"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Group Gross Margin (%)' : '集团毛利率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.clcOpm ? '' : ' muted') + '" data-p-series="clcOpm"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'CLC Operating Margin (%)' : '核心本地商业利润率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.grpOpm ? '' : ' muted') + '" data-p-series="grpOpm"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Group Operating Margin (%)' : '集团经营利润率 (%)') + '</span></button>';
 }
 }

 var pLegEl = document.getElementById('profitLegend');
 if (pLegEl) {
 pLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-p-series]');
 if (!b) return;
 var k = b.getAttribute('data-p-series');
 state.profitSeries[k] = !state.profitSeries[k];
 if (!state.profitSeries.gm && !state.profitSeries.clcOpm && !state.profitSeries.grpOpm) state.profitSeries[k] = true;
 renderProfitLegend();
 drawProfitCanvas();
 });
 }

 function renderCohortLegend() {
 var leg = document.getElementById('cohortLegend');
 if (!leg) return;
 var en = isEn();
 if (state.cView === 'swing') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.cohortSeries.q325 ? '' : ' muted') + '" data-c-series="q325"><span class="legend-dot" style="background:var(--mui-error-main);"></span><span>Q3 2025</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.q226 ? '' : ' muted') + '" data-c-series="q226"><span class="legend-dot" style="background:var(--mui-amber, #D97706);"></span><span>Q2 2026</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.q326 ? '' : ' muted') + '" data-c-series="q326"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>Q3 2026</span></button>';
 } else {
 leg.innerHTML =
 '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Light Bar: Street Consensus (¥B)' : '浅色柱：市场一致预期 (¥B)') + '</span>' +
 '<span class="mui-chip mui-chip-success mono">' + (en ? 'Solid Bar: Q3 2026 Actual (¥B)' : '深色柱：Q3 2026 实际披露 (¥B)') + '</span>';
 }
 }

 var cLegEl = document.getElementById('cohortLegend');
 if (cLegEl) {
 cLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-c-series]');
 if (!b) return;
 var k = b.getAttribute('data-c-series');
 state.cohortSeries[k] = !state.cohortSeries[k];
 if (!state.cohortSeries.q326 && !state.cohortSeries.q226 && !state.cohortSeries.q325) state.cohortSeries[k] = true;
 renderCohortLegend();
 drawCohortCanvas();
 });
 }

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: en ? 'Core Local' : '核心商业', val: 78.28, base: 0, col: pal.blue, tip: en ? 'Core Local Commerce Revenue: ¥78.28B (+16.8% YoY)' : '核心本地商业营收: ¥782.82亿 (+16.8% YoY)' },
 { lbl: en ? '+New Biz' : '+新业务', val: 37.27, base: 78.28, col: pal.green, tip: en ? 'New Initiatives Revenue: +¥37.27B (+32.9% YoY), lifting total to ¥115.56B' : '新业务营收: +¥372.73亿 (+32.9% YoY)，推升总营收至 ¥1,155.56亿' },
 { lbl: en ? 'Gross Profit' : '毛利额', val: 37.68, base: 0, col: pal.violet, tip: en ? 'Q3 Gross Profit: ¥37.68B (+52.2% YoY), Gross Margin 32.61%' : 'Q3 毛利额: ¥376.84亿 (+52.2% YoY)，毛利率 32.61%' },
 { lbl: en ? 'Op Profit' : '经营利润', val: 2.74, base: 0, col: pal.blue, tip: en ? 'Operating Profit: ¥2.74B (2.4% OPM vs -¥19.76B in Q3 25)' : '经营溢利: ¥27.41亿 (利润率 2.4%，去年同期亏损 ¥197.6亿)' },
 { lbl: en ? 'Adj. Net' : '经调整净利', val: 1.85, base: 0, col: pal.amber, tip: en ? 'Adjusted Net Profit: ¥1.85B (GAAP Net Profit ¥2.07B)' : '经调整净利润: ¥18.50亿 (期内归母净利 ¥20.71亿)' },
 { lbl: en ? 'Op. Cash' : '经营现金流', val: 4.78, base: 0, col: pal.green, tip: en ? 'Operating Cash Inflow: ¥4.78B, exceeding GAAP Net Profit' : '经营活动现金净流入: ¥47.84亿，高于期内净利润' }
 ];
 var maxV = 128;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var cx = pad.left + i * slotW + slotW / 2;
 var x = cx - barW / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(6, yBot - yTop);
 if (state.hover.profitCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slotW + 3, pad.top, slotW - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 if (state.hover.profitCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + s.val.toFixed(1) + 'B', cx, yTop - 12, s.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(s.lbl, cx, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ idx: i, x: pad.left + i * slotW, y: pad.top, w: slotW, h: ph + 26, title: s.lbl, body: s.tip });
 });
 } else {
 var qtrs = ['Q3 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
 var gmArr = [26.0, 29.8, 33.5, 32.6];
 var clcArr = [-21.0, -3.2, 7.9, 7.3];
 var grpArr = [-20.8, -7.1, 2.6, 2.4];
 var minM = -28, maxM = 40;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 var zeroY = pad.top + ph - ((0 - minM) / (maxM - minM)) * ph;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
 ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke(); ctx.setLineDash([]);

 var stepX = pw / (qtrs.length - 1);
 qtrs.forEach(function (q, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.profitCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(q, px, pad.top + ph + 20);
 hitRegions.profitCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: q + (en ? ' Margin Profile' : ' 利润率表现'),
 body: (en ? 'Group GM: ' : '毛利率: ') + gmArr[idx] + '% · ' + (en ? 'CLC OPM: ' : '核心商业OPM: ') + clcArr[idx] + '% · ' + (en ? 'Group OPM: ' : '集团OPM: ') + grpArr[idx] + '%'
 });
 });
 function plotLine(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) {
 return { x: pad.left + idx * stepX, y: pad.top + ph - ((v - minM) / (maxM - minM)) * ph, v: v };
 });
 ctx.strokeStyle = col; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.profitCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.6 : 3.6, 0, Math.PI * 2); ctx.fill();
 if (idx === 0 || idx === qtrs.length - 1 || isHov) {
 drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 13, col, pal);
 }
 });
 }
 if (state.profitSeries.gm) plotLine(gmArr, pal.green, 'rgba(22, 163, 74, 0.16)');
 if (state.profitSeries.clcOpm) plotLine(clcArr, pal.blue, 'rgba(0, 115, 230, 0.14)');
 if (state.profitSeries.grpOpm) plotLine(grpArr, pal.violet, 'rgba(124, 58, 237, 0.14)');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 24, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'swing') {
 var cats = [
 { lbl: en ? 'Core Local Op.' : '核心本地商业', q325: -14.07, q226: 5.67, q326: 5.70 },
 { lbl: en ? 'New Biz Op.' : '新业务经营', q325: -1.28, q226: -1.74, q326: -1.31 },
 { lbl: en ? 'Group Op.' : '集团经营利润', q325: -19.76, q226: 2.69, q326: 2.74 },
 { lbl: en ? 'Adj. Net' : '经调整净利润', q325: -16.01, q226: 2.52, q326: 1.85 }
 ];
 var minV = -22, maxV = 10;
 for (var g = 0; g <= 4; g++) {
 var gv = minV + ((maxV - minV) / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText((gv >= 0 ? '+' : '') + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var zY = pad.top + ph - ((0 - minV) / (maxV - minV)) * ph;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(pad.left, zY); ctx.lineTo(pad.left + pw, zY); ctx.stroke();

 var slot = pw / cats.length;
 cats.forEach(function (c, idx) {
 var activeKeys = [];
 if (state.cohortSeries.q325) activeKeys.push({ k: 'q325', v: c.q325, col: pal.red, name: 'Q3 25' });
 if (state.cohortSeries.q226) activeKeys.push({ k: 'q226', v: c.q226, col: pal.amber, name: 'Q2 26' });
 if (state.cohortSeries.q326) activeKeys.push({ k: 'q326', v: c.q326, col: pal.blue, name: 'Q3 26' });

 if (state.hover.cohortCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + idx * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 var bw = Math.min(22, (slot * 0.72) / Math.max(1, activeKeys.length));
 var totalW = bw * activeKeys.length + (activeKeys.length - 1) * 4;
 var startX = pad.left + idx * slot + (slot - totalW) / 2;

 activeKeys.forEach(function (ak, j) {
 var bx = startX + j * (bw + 4);
 var vy = pad.top + ph - ((ak.v - minV) / (maxV - minV)) * ph;
 var bh = Math.max(3, Math.abs(vy - zY));
 var by = ak.v >= 0 ? vy : zY;
 ctx.fillStyle = ak.col;
 roundRect(ctx, bx, by, bw, bh, 4); ctx.fill();
 if (ak.k === 'q326' || state.hover.cohortCanvas === idx) {
 drawValueBadge(ctx, (ak.v >= 0 ? '+' : '') + ak.v.toFixed(1), bx + bw / 2, ak.v >= 0 ? by - 11 : by + bh + 11, ak.col, pal);
 }
 });
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(c.lbl, pad.left + idx * slot + slot / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 idx: idx, x: pad.left + idx * slot, y: pad.top, w: slot, h: ph + 26,
 title: c.lbl + ' (¥B)',
 body: 'Q3 2025: ' + c.q325 + 'B · Q2 2026: ' + c.q226 + 'B · Q3 2026: ' + c.q326 + 'B'
 });
 });
 } else {
 var items = [
 { name: en ? 'Revenue' : '总营收', est: 113.37, act: 115.56, col: pal.green, tip: en ? 'Beat by +¥2.19B (+1.9%)' : '超市场预期 +21.9亿元 (+1.9%)' },
 { name: en ? 'Gross Profit' : '毛利额', est: 35.69, act: 37.68, col: pal.green, tip: en ? 'Beat by +¥1.99B (+5.6%)' : '超市场预期 +19.9亿元 (+5.6%)' },
 { name: en ? 'CLC Op. Profit' : '核心商业利润', est: 4.15, act: 5.70, col: pal.blue, tip: en ? 'Beat by +¥1.55B (+37.3%)' : '超市场预期 +15.5亿元 (+37.3%)' },
 { name: en ? 'S&M Expense' : '销售费用', est: 25.31, act: 27.02, col: pal.amber, tip: en ? 'Higher than est. by +¥1.71B' : '高于预期 +17.1亿元 (偏高)' },
 { name: en ? 'Adj. Net Profit' : '经调整净利', est: 2.20, act: 1.85, col: pal.red, tip: en ? 'Missed consensus by -¥0.35B' : '略低于预期 -3.5亿元' }
 ];
 var maxC = 128;
 var slotC = pw / items.length;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxC / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + kv.toFixed(0) + 'B', pad.left - 8, ky + 4);
 }
 items.forEach(function (it, idx) {
 var cx = pad.left + idx * slotC + slotC / 2, bw = Math.min(26, slotC * 0.28);
 var eh = Math.max(4, (it.est / maxC) * ph), ah = Math.max(4, (it.act / maxC) * ph);
 if (state.hover.cohortCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + idx * slotC + 3, pad.top, slotC - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 3, pad.top + ph - eh, bw, eh, 4); ctx.fill();
 ctx.fillStyle = it.col;
 roundRect(ctx, cx + 3, pad.top + ph - ah, bw, ah, 4); ctx.fill();
 drawValueBadge(ctx, it.act.toFixed(1), cx + bw / 2 + 3, pad.top + ph - ah - 12, it.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(it.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 idx: idx, x: pad.left + idx * slotC, y: pad.top, w: slotC, h: ph + 26,
 title: it.name,
 body: (en ? 'Consensus: ¥' : '市场预期: ¥') + it.est.toFixed(2) + 'B · ' + (en ? 'Actual: ¥' : '实际值: ¥') + it.act.toFixed(2) + 'B (' + it.tip + ')'
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

 if (state.kView === 'cash') {
 var bars = [
 { lbl: en ? 'Cash & Equiv.' : '现金及等价物', val: 104.14, col: pal.blue, tip: en ? 'Cash & cash equivalents: ¥104.14B as of Sept 30, 2026' : '现金及现金等价物: ¥1,041.43亿 (截至 2026-09-30)' },
 { lbl: en ? 'ST Treasury' : '短期理财投资', val: 53.38, col: pal.green, tip: en ? 'Short-term treasury investments: ¥53.38B' : '短期理财投资: ¥533.84亿' },
 { lbl: en ? 'Total Liquidity' : '广义现金总计', val: 157.53, col: pal.violet, tip: en ? 'Total Cash + ST Treasury: ¥157.53B (~¥1575亿)' : '广义现金及短期理财合计: ¥1,575.27亿' },
 { lbl: en ? 'Non-Curr Debt' : '非流动借款', val: 25.09, col: pal.amber, tip: en ? 'Non-current borrowings: ¥25.09B' : '非流动借款: ¥250.91亿' },
 { lbl: en ? 'Current Debt' : '流动借款', val: 8.66, col: pal.red, tip: en ? 'Current borrowings: ¥8.66B (notes payable dropped to ¥0.58B)' : '流动借款: ¥86.61亿 (应付票据流动部分降至 ¥5.84亿)' }
 ];
 var maxS = 175;
 for (var g = 0; g <= 4; g++) {
 var sv = (maxS / 4) * g, sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + sv.toFixed(0) + 'B', pad.left - 8, sy + 4);
 }
 var slot = pw / bars.length, bw = Math.min(44, slot * 0.56);
 bars.forEach(function (b, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = Math.max(5, (b.val / maxS) * ph), yTop = pad.top + ph - bh;
 if (state.hover.capitalCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = b.col;
 roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
 if (state.hover.capitalCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + b.val.toFixed(1) + 'B', cx, yTop - 12, b.col, pal);
 ctx.fillStyle = pal.tick; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(b.lbl, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: b.lbl, body: b.tip });
 });
 } else {
 var ratios = [
 { name: en ? 'Gross Margin (32.6%)' : 'Q3 综合毛利率 (32.6%)', pct: 32.61, col: pal.green, tip: en ? 'Up +6.57ppt YoY on rationalized delivery subsidies' : '同比提升 6.57 个百分点，受益于外卖补贴趋理性与客单价回升' },
 { name: en ? 'S&M / Revenue (23.4%)' : 'Q3 销售及营销费用率 (23.4%)', pct: 23.38, col: pal.amber, tip: en ? '¥27.02B S&M, down from ¥33.8B (35.6%) in Q3 2025' : '销售费用 ¥270.2亿，占比 23.4%（去年同期 338亿占 35.6%）' },
 { name: en ? 'R&D / Revenue (6.7%)' : 'Q3 研发费用率 (6.7%)', pct: 6.68, col: pal.blue, tip: en ? '¥7.72B R&D (+11.3% YoY) for LongCat-2.5 & CatPaw' : '研发费用 ¥77.2亿（同比 +11.3%），持续加码大模型与无人机' },
 { name: en ? 'Op. Margin (2.4%)' : 'Q3 经营利润率 (2.4%)', pct: 2.37, col: pal.violet, tip: en ? '¥2.74B operating profit (swung from -20.8% in Q3 2025)' : '经营利润 ¥27.41亿，较去年同期 -20.8% 实现大幅扭亏' }
 ];
 var rowH = ph / ratios.length;
 ratios.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 20, scale = (pw * 0.72) / 40;
 var barLen = Math.max(8, it.pct * scale), bx = pad.left;
 if (state.hover.capitalCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill();
 }
 ctx.fillStyle = it.col;
 roundRect(ctx, bx, cy - bh / 2 + 6, barLen, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(it.pct.toFixed(2) + '%', bx + barLen + 8, cy + 10);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(it.name, pad.left, cy - 11);
 hitRegions.capitalCanvas.push({ idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH, title: it.name, body: it.tip });
 });
 }
 }

 var simData = { op: [2.74, 5.2, 7.6, 10.1, 12.8], label: ['Q3 26', 'Q4 26E', 'Q1 27E', 'Q2 27E', 'Q3 27E'] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.simMiniCanvas = [];
 var pad = { top: 24, right: 24, bottom: 26, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var qtrs = simData.label, arr = simData.op;
 var minE = Math.min(0, Math.floor(Math.min.apply(null, arr) - 2));
 var maxE = Math.max(12, Math.ceil(Math.max.apply(null, arr) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

 var pts = arr.map(function (v, i) {
 return { x: pad.left + (i / 4) * pw, y: pad.top + ph - ((v - minE) / (maxE - minE)) * ph, v: v };
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
 ctx.fillStyle = (pt.v >= 0) ? ((i === 4) ? pal.green : pal.blue) : pal.red;
 ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 5.2 : 4, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '¥' + pt.v.toFixed(1) + 'B', pt.x, pt.y - 13, (pt.v >= 0) ? ((i === 4) ? pal.green : pal.blue) : pal.red, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(qtrs[i], pt.x, pad.top + ph + 16);
 hitRegions.simMiniCanvas.push({
 idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 title: qtrs[i] + (en ? ' Est. Group Op. Profit' : ' 推演单季经营利润'),
 body: (en ? 'Group Op. Profit: ¥' : '集团经营利润: ¥') + pt.v.toFixed(2) + 'B'
 });
 });
 }

 function runSimulator() {
 var clcG = parseFloat(document.getElementById('inpClcGrowth').value) / 100;
 var clcOpm = parseFloat(document.getElementById('inpClcOpm').value) / 100;
 var newLoss = parseFloat(document.getElementById('inpNewLoss').value) / 100;
 document.getElementById('lblClcGrowth').textContent = (clcG * 100).toFixed(1) + '%';
 document.getElementById('lblClcOpm').textContent = (clcOpm * 100).toFixed(1) + '%';
 document.getElementById('lblNewLoss').textContent = (newLoss >= 0 ? '+' : '') + (newLoss * 100).toFixed(1) + '%';

 // Annualized Q3 2026 base: CLC ¥78.28B * 4 = 313.1B, New Biz ¥37.27B * 4 = 149.1B, Unallocated ~ -6.6B/yr
 var clc27 = 313.13 * (1 + clcG);
 var new27 = 149.09 * 1.22; // moderated 22% new biz growth in 2027E
 var rev27 = clc27 + new27;
 var clcOp27 = clc27 * clcOpm;
 var newOp27 = new27 * newLoss;
 var unalloc27 = -6.6;
 var netOp27 = clcOp27 + newOp27 + unalloc27;
 var opm27 = (netOp27 / rev27) * 100;

 document.getElementById('simRevOut').textContent = '¥' + Math.round(rev27) + 'B';
 document.getElementById('simClcOpOut').textContent = '¥' + clcOp27.toFixed(1) + 'B';
 document.getElementById('simNetOpOut').textContent = (netOp27 >= 0 ? '¥' : '-¥') + Math.abs(netOp27).toFixed(1) + 'B';
 document.getElementById('simOpmOut').textContent = opm27.toFixed(1) + '%';

 var qTarget = netOp27 / 4;
 simData.op = [
 2.74,
 2.74 + (qTarget - 2.74) * 0.25,
 2.74 + (qTarget - 2.74) * 0.50,
 2.74 + (qTarget - 2.74) * 0.75,
 qTarget
 ];
 drawSimMiniCanvas();
 }

 ['inpClcGrowth', 'inpClcOpm', 'inpNewLoss'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = { bear: { g: 8.0, o: 4.5, n: -4.5 }, base: { g: 15.0, o: 10.5, n: -2.5 }, bull: { g: 20.0, o: 14.5, n: -0.5 } };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpClcGrowth').value = pr.g;
 document.getElementById('inpClcOpm').value = pr.o;
 document.getElementById('inpNewLoss').value = pr.n;
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
 tip.style.left = Math.min(window.innerWidth - 315, Math.max(12, clientX + 14)) + 'px';
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
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心定调', s: '¥115.56B 营收 (+21.6%) · 外卖迎拐点 · 同比扭亏为盈' },
 { id: 'mod-pipeline', t: 'M1 五阶经营飞轮传导沙盘', s: '外卖UE → 到店会员 → 闪购+75.8% → 小象/Keeta → LongCat-2.5' },
 { id: 'mod-profit-pool', t: 'M2 利润转化瀑布流与收入拆解', s: '毛利 ¥37.68B (32.61%) · 商家/配送/自营/新业务' },
 { id: 'mod-cohort', t: 'M3 分部反转与预期差对标', s: '核心商业 ¥5.70B · 营收毛利 Beat vs 经调整净利 ¥1.85B' },
 { id: 'mod-capital', t: 'M4 现金堡垒与 2027 盈利推演', s: '¥157.5B 现金储备 · 2027E 修复情景交互模拟器' },
 { id: 'mod-matrix', t: 'M5 本地生活竞对矩阵与压测', s: '美团 vs DoorDash / 淘宝闪购 / 京东 / 抖音本地生活' }
 ];
 var QUICK_EN = [
 { id: 'mod-deck', t: 'M0 Command Deck & Thesis', s: '¥115.56B Rev (+21.6%) · Delivery Inflection · Profit Swing' },
 { id: 'mod-pipeline', t: 'M1 5-Node Operating Pipeline', s: 'Delivery UE → In-Store VIP → Instashopping → Keeta → LongCat-2.5' },
 { id: 'mod-profit-pool', t: 'M2 P&L Waterfall & Revenue Mix', s: 'Gross Profit ¥37.68B (32.61%) · 4-Layer Breakdown' },
 { id: 'mod-cohort', t: 'M3 Segment Swing & Consensus', s: 'CLC ¥5.70B · Top-Line Beat vs. ¥1.85B Adj. Net Profit' },
 { id: 'mod-capital', t: 'M4 Cash Fortress & 2027 Lab', s: '¥157.5B Liquidity · Interactive 2027E Recovery Simulator' },
 { id: 'mod-matrix', t: 'M5 Peer Matrix & Risk Audit', s: 'Meituan vs. DoorDash / Alibaba / JD / Douyin' }
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

 // Sidebar Toggle (Desktop collapse + Mobile drawer)
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var collapsed = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (collapsed) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, collapsed ? '1' : '0'); } catch (e) {}
 setTimeout(drawAllCharts, 40);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 // Reading progress + Active TOC highlight
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var docH = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
 }
 var links = document.querySelectorAll('#tocList .mui-nav-link');
 var activeId = 'mod-deck';
 ['mod-deck', 'mod-pipeline', 'mod-profit-pool', 'mod-cohort', 'mod-capital', 'mod-matrix'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el && el.getBoundingClientRect().top <= 160) activeId = id;
 });
 for (var i = 0; i < links.length; i++) {
 links[i].classList.toggle('active', links[i].getAttribute('href') === '#' + activeId);
 }
 }, { passive: true });

 // Sidebar Theme, Export HTML, Print PDF
 document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var t = btn.getAttribute('data-portal-theme');
 applyTheme(t, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, t); } catch (e) {}
 });
 });
 var exportBtn = document.getElementById('exportHtmlBtn');
 if (exportBtn) {
 exportBtn.addEventListener('click', function () {
 try {
 var htmlStr = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var url = URL.createObjectURL(new Blob([htmlStr], { type: 'text/html;charset=utf-8' }));
 var link = document.createElement('a');
 link.href = url;
 link.download = 'Meituan_Q3_2026_Earnings_Analysis.html';
 link.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
 showToast(isEn() ? 'Exporting HTML report…' : '正在导出 HTML 报告…');
 } catch (e) {
 showToast(isEn() ? 'Export blocked in preview' : '当前预览环境不支持直接下载');
 }
 });
 }
 var printBtn = document.getElementById('printPdfBtn');
 if (printBtn) {
 printBtn.addEventListener('click', function () { window.print(); });
 }

 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk');
 chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () {
 savedChk[k] = chk.checked;
 try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
 showToast(isEn() ? (chk.checked ? 'Added to quarterly watchlist' : 'Removed from watchlist') : (chk.checked ? '已加入 Q4 重点跟踪清单' : '已取消跟踪标记'));
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
 