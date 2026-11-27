
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'pdd_bm_stress_v1';
 var TITLE_ZH = '拼多多 PDD Holdings (PDD) 商业模式架构深度拆解 | 数据中心';
 var TITLE_EN = 'PDD Holdings (PDD) Business Model Architecture Deep Dive | Research Hub';

 var state = {
 theme: 'light', lang: 'zh', activeLens: 0, activeNode: 0, activeCohort: 'core',
 pView: 'waterfall', cView: 'ltv', kView: 'cash',
 profitSeries: { gm: true, opm: true, nm: true },
 cohortSeries: { temu: true, core: true, casual: true },
 hover: { profitCanvas: -1, cohortCanvas: -1, capitalCanvas: -1, simMiniCanvas: -1 }
 };
 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [], simMiniCanvas: [] };

 function isEn() { return state.lang === 'en'; }
 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar'); if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)',
 hoverBand: dark ? 'rgba(51,153,255,0.09)' : 'rgba(0,115,230,0.06)',
 pillBg: dark ? 'rgba(9,13,22,0.90)' : 'rgba(255,255,255,0.95)',
 pillBorder: dark ? 'rgba(51,153,255,0.34)' : 'rgba(0,115,230,0.25)',
 blue: dark ? '#3399FF' : '#0073E6', blueSoft: dark ? 'rgba(51,153,255,0.28)' : 'rgba(0,115,230,0.18)',
 green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED', red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 m0_lead: {
 zh: '传统货架电商按“人找货”逻辑分配曝光，而<strong>拼多多（PDD Holdings, NASDAQ: PDD）</strong>重构了“货找人”的 <strong>C2M 确定性分发机器</strong>：通过社交拼团、百亿补贴与极简“千人千面”瀑布流将零散消费聚沙成塔，直连 <strong>1,680 万活跃商家</strong>与产业带源头工厂 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 Form 20-F ↗</a>。FY2025 公司总营收达 <strong>RMB 4,318.5 亿（US$617.5 亿）</strong>，其中在线营销服务（RMB 2,177.8 亿）与交易服务（RMB 2,140.6 亿）形成均衡双轮 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-fourth-quarter-2025-and-fiscal-year-2025/" target="_blank" rel="noopener noreferrer">FY25 财报 ↗</a>。2026 年第三季度，在“千亿扶持”让利商家与海外半托管转型下，公司实现营收 <strong>RMB 1,083.4 亿</strong>、营业利润大增至 <strong>RMB 311.6 亿（营业利润率 28.8%）</strong>、净利润 <strong>RMB 295.4 亿</strong>，账面现金及短期投资攀升至 <strong>RMB 4,554 亿（US$679 亿）</strong> <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 财报 ↗</a>。',
 en: 'While legacy e-commerce relies on search-bar intent, <strong>PDD Holdings (NASDAQ: PDD)</strong> engineered a <strong>C2M algorithmic demand aggregator</strong>—pooling fragmented orders via social sharing, subsidies, and a cart-free discovery feed to connect directly with <strong>16.8M active merchants</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 Form 20-F ↗</a>. FY2025 revenue reached <strong>RMB 431.85B (US$61.75B)</strong> across balanced Online Marketing (RMB 217.78B) and Transaction Services (RMB 214.06B) <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-fourth-quarter-2025-and-fiscal-year-2025/" target="_blank" rel="noopener noreferrer">FY25 Release ↗</a>. In Q3 2026, amidst its RMB 100B Merchant Support program and Temu’s semi-managed pivot, PDD posted <strong>RMB 108.34B</strong> in revenue, <strong>RMB 31.16B</strong> in operating profit (<strong>28.8% OpM</strong>), <strong>RMB 29.54B</strong> net income, and <strong>RMB 455.4B (US$67.9B)</strong> in cash &amp; ST investments <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 Release ↗</a>.'
 },
 m2_caption: {
 zh: '数据来源：<a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-fourth-quarter-2025-and-fiscal-year-2025/" target="_blank" rel="noopener noreferrer">FY2025 财报 ↗</a> 与 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 财报 ↗</a>。2025 年受“千亿扶持”与履约成本影响毛利率阶段性下探至 56.3%，2026 Q3 随着营销费用同比大降 16.6% 及半托管占比提升，毛利率回升至 <strong>58.2%</strong>，营业利润率重返 <strong>28.8%</strong>。',
 en: 'Sources: <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-fourth-quarter-2025-and-fiscal-year-2025/" target="_blank" rel="noopener noreferrer">FY2025 Release ↗</a> &amp; <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 Release ↗</a>. After 2025 merchant rebates compressed GM to 56.3%, a 16.6% YoY cut in Q3’26 marketing spend and Temu’s semi-managed mix lifted GM back to <strong>58.2%</strong> and OpM to <strong>28.8%</strong>.'
 },
 m3_caption: {
 zh: '市场地位参考：据 <a class="cite-link" href="https://everythingmoney.com/blog/pdd-holdings-the-origin-the-business-model-and-the-numbers-5819" target="_blank" rel="noopener noreferrer">Euromonitor / USDA 报告 ↗</a>，拼多多已占据中国零售电商市场约 <strong>16.7% 份额</strong>（阿里 27.9%、京东 22.1%、抖音字节 21.3%），但以极简人员配置实现了远高于传统货架巨头的净利率（27.3%）。',
 en: 'Market Position: Per <a class="cite-link" href="https://everythingmoney.com/blog/pdd-holdings-the-origin-the-business-model-and-the-numbers-5819" target="_blank" rel="noopener noreferrer">Euromonitor / USDA ↗</a>, Pinduoduo holds ~<strong>16.7%</strong> of China retail e-commerce (Alibaba 27.9%, JD 22.1%, ByteDance 21.3%), yet achieves a far superior 27.3% net margin with lean headcount.'
 },
 m4_caption: {
 zh: '资本异象：截至 2026年9月30日，拼多多账面现金、受限资金及短期投资达 <strong>RMB 4,554亿 ($67.9B)</strong>，外加非流动定存与债券 <strong>RMB 1,157亿 ($17.3B)</strong>，合计流动性高达 <strong>RMB 5,711亿 ($85.2B)</strong>，而总市值仅约 $1,119亿——净现金占市值比重超过 <strong>60%</strong>，成为市场分歧（零分红零回购 vs 极低估值）的核心焦距 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3\'26 资产负债表 ↗</a>。',
 en: 'Capital Anomaly: As of Sep 30, 2026, cash &amp; ST investments hit <strong>RMB 455.4B ($67.9B)</strong> plus <strong>RMB 115.7B ($17.3B)</strong> in non-current deposits/debt—totaling <strong>RMB 571.1B ($85.2B)</strong> against a ~$111.9B market cap (&gt;60% net cash) <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3\'26 Balance Sheet ↗</a>.'
 },
 s1_body: {
 zh: '美国于 2025年8月29日取消 $800 以下非邮政小包免税；欧盟于 2026年5月对 Temu 处以 €2亿 DSA 罚款并自 2026年7月1日起对 €150 以下包裹征收每件 €3 关税 <a class="cite-link" href="https://ppc.land/temu-owner-pdd-cuts-marketing-spend-17-as-revenue-stalls/" target="_blank" rel="noopener noreferrer">贸易政策时间线 ↗</a>。Temu 通过强制切向海外仓“半托管/本对本”与削减 17% 营销费用对冲，使 26Q3 净利反超预期。',
 en: 'The US ended its $800 de minimis exemption on Aug 29, 2025; the EU fined Temu €200M under DSA in May 2026 and imposed a €3/item duty below €150 on Jul 1, 2026 <a class="cite-link" href="https://ppc.land/temu-owner-pdd-cuts-marketing-spend-17-as-revenue-stalls/" target="_blank" rel="noopener noreferrer">Trade Timeline ↗</a>. Temu countered by pivoting to local-warehouse semi-managed fulfillment and cutting marketing 17%, beating Q3’26 profit estimates.'
 }
 };

 var LENSES = [
 {
 formulaZh: '单品爆款毛利 = [C2M 算法集中派单 → 产线满载降本 25%+] × [全站推广 ROI 竞价抽成] - $0 自营库存减值',
 formulaEn: 'Hero-SKU Economics = [C2M Algo Demand Pooling → 25%+ Factory Cost Drop] × [Full-Site ROAS Ad Take] - $0 1P Inventory Risk',
 bodyZh: '不同于传统电商海量长尾 SKU 铺货，拼多多首页不设购物车，而是通过算法将千万级用户的同质化需求强行聚拢到少数高性价比爆款上，倒逼产业带工厂取消中间商层级、以销定产，平台坐收高毛利广告与交易服务费。',
 bodyEn: 'By removing the shopping cart bias and pooling millions of dispersed orders onto curated hero SKUs, PDD forces factories to bypass middlemen and produce to demand—capturing high-margin ad and transaction fees with zero inventory risk.'
 },
 {
 formulaZh: '双擎营收 = 在线营销服务 (Q3\'26 ¥59.8B, +12%) + 交易服务 (Q3\'26 ¥48.5B, -12%) → 综合毛利率回升至 58.2%',
 formulaEn: 'Dual Revenue = Online Marketing (Q3\'26 ¥59.8B, +12%) + Transaction Services (Q3\'26 ¥48.5B, -12%) → Gross Margin 58.2%',
 bodyZh: '当 Temu 主动从全托管（计入较高履约成本）转向半托管/本对本时，交易服务收入虽短期表观回落 12%，但同步剥离了高昂跨境空运履约成本，叠加主站高毛利“全站推广”广告双位数增长，推动营业利润率强势反弹至 28.8%。',
 bodyEn: 'As Temu shifts from full-managed to semi-managed local fulfillment, transaction revenue optically dipped 12% while shedding heavy air-freight costs—lifting Q3’26 operating margin back to 28.8% alongside +12% ad growth.'
 },
 {
 formulaZh: '净现金浮存 = 应付商家款 (¥112.0B) + 商家保证金 (¥18.9B) + 预收款 (¥4.4B) - 极微自营存货 (¥0)',
 formulaEn: 'Cash Float = Merchant Payables (¥112.0B) + Merchant Deposits (¥18.9B) + Deferred Rev (¥4.4B) - Zero 1P Inventory',
 bodyZh: '平台在买家确认收货前代管资金并留存商家保证金，形成天然负营运资本结构；FY25 仅用 RMB 11.5 亿（占营收 0.27%）的极低资本开支就撬动 RMB 1,058 亿自由现金流，使账面流动性滚雪球至 RMB 5,711 亿。',
 bodyEn: 'Holding buyer funds prior to settlement and merchant deposits creates structural negative working capital: FY25 needed just RMB 1.15B in CapEx (0.27% of sales) to generate RMB 105.8B in FCF, compounding total liquidity to RMB 571.1B.'
 }
 ];
 function renderLens(idx) {
 state.activeLens = idx; var l = LENSES[idx] || LENSES[0], en = isEn();
 document.getElementById('lensFormula').textContent = en ? l.formulaEn : l.formulaZh;
 document.getElementById('lensBody').innerHTML = en ? l.bodyEn : l.bodyZh;
 }

 var NODES = [
 {
 badge: 'NODE 01 · CART-FREE DISCOVERY & SOCIAL VIRALITY',
 titleZh: '去购物车化瀑布流 + 游戏化留存：把电商变成“逛街娱乐”',
 titleEn: 'Cart-Free Discovery Feed + Gamification: Turning Shopping Into Entertainment',
 descZh: '拼多多早期通过微信拼团实现近乎零成本裂变，并在 App 内取消传统“购物车比价”动线，采用“多多果园”等小游戏与单品极简瀑布流大幅拉长用户停留时长，把黄峥提出的“Costco + Disney”转化为极高转化率的流量底座。',
 descEn: 'PDD bypassed search-bar comparison by removing the default shopping cart, pairing WeChat viral group-buying with in-app games like Duo Duo Orchard to turn browsing into a high-conversion "Costco + Disney" discovery loop.',
 formulaZh: '流量传导：社交裂变降 CAC + 算法千人千面提升单品点击转化率 → 9亿+ 年活跃用户高频打开',
 formulaEn: 'Flow: Viral social sharing lowers CAC + algorithmic feed lifts SKU conversion → 900M+ annual active buyers',
 kpisZh: [['9亿+', '中国区年活跃买家规模'], ['1,680万', 'FY25 平台活跃商家数'], ['¥25.3B', 'Q3\'26 营销费同比降 16.6%'], ['Costco+Disney', '黄峥定义的核心产品隐喻']],
 kpisEn: [['900M+', 'China Annual Active Buyers'], ['16.8M', 'FY25 Active Merchants'], ['¥25.3B', 'Q3\'26 S&M Down -16.6% YoY'], ['Costco+Disney', 'Founder Core Product Metaphor']]
 },
 {
 badge: 'NODE 02 · C2M & AGRITECH SUPPLY CHAIN',
 titleZh: '农地云拼与 C2M 产销直连：消灭层层经销商加价',
 titleEn: 'Agritech Cloud-Pooling & C2M Factories: Deleting Middlemen Markups',
 descZh: '传统农产品与白牌商品经过 4–5 级批发商加价率往往超过 100%。拼多多通过“农地云拼”将分散的时令需求在云端聚合成确定性大单直达田间与产业带工厂，同时推出“新质商家扶持计划”引导工厂向品牌化升级。',
 descEn: 'Traditional produce and factory goods pass through 4–5 wholesale markups. PDD’s "Agritech Cloud-Pooling" aggregates fragmented orders directly to farms and industrial clusters, cutting waste and unlocking factory-direct pricing.',
 formulaZh: '价值创造：砍掉中间流通加价（30%–50%）→ 消费者得实惠 + 源头工厂保合理净利',
 formulaEn: 'Value Creation: Eliminates 30%–50% wholesale markups → lower retail prices + sustainable factory margins',
 kpisZh: [['¥1,000亿', '“千亿扶持”惠商生态投入'], ['180+项', '2026年平台精细化治理举措'], ['雄安中心', '日均百万级商家申诉优赔'], ['新拼姆', '2026年3月推出自有品牌计划']],
 kpisEn: [['RMB 100B', 'Merchant Ecosystem Support'], ['180+', '2026 Governance Initiatives'], ['1M+/day', 'Merchant Appeal Protection'], ['Xinpinmu', 'Mar 2026 Private-Label Initiative']]
 },
 {
 badge: 'NODE 03 · DUAL MONETIZATION ENGINE',
 titleZh: '全站推广广告 + 交易服务费：双轮驱动的超级货币化机器',
 titleEn: 'Full-Site Promotion Ads + Transaction Fees: Dual Monetization Engine',
 descZh: '平台在保持高性价比的同时，通过“全站推广”将自然流量与付费竞价融为一体，商家只需出价目标 ROI；叠加支付与交易佣金，推动 FY2025 营收突破 RMB 4,318 亿，且 Q3 2026 在线营销服务仍保持 +12% 稳健扩张。',
 descEn: 'PDD’s Full-Site Promotion unifies organic and paid traffic around merchant ROAS targets. Paired with transaction fees, FY2025 sales hit RMB 431.85B, with Q3 2026 online marketing still expanding +12% YoY to RMB 59.8B.',
 formulaZh: '变现传导：GMV 密度 × 商家竞争投产比 (全站推广) → 2026 Q3 营销收入 RMB 59.8B (+12% YoY)',
 formulaEn: 'Flow: GMV density × Merchant ROAS competition → Q3 2026 Marketing Revenue RMB 59.8B (+12% YoY)',
 kpisZh: [['¥217.8B', 'FY25 在线营销及广告营收'], ['¥214.1B', 'FY25 交易服务营收 (+9%)'], ['58.2%', 'Q3\'26 回升后的综合毛利率'], ['28.8%', 'Q3\'26 强韧营业利润率']],
 kpisEn: [['¥217.8B', 'FY25 Online Marketing Revenue'], ['¥214.1B', 'FY25 Transaction Services (+9%)'], ['58.2%', 'Q3\'26 Rebounded Gross Margin'], ['28.8%', 'Q3\'26 Operating Margin']]
 },
 {
 badge: 'NODE 04 · TEMU SEMI-MANAGED & LOCAL PIVOT',
 titleZh: 'Temu 全球化换挡：从跨境全托管直邮转向“半托管 / 本对本”',
 titleEn: 'Temu Global Pivot: From Cross-Border Direct to Semi-Managed Local Fulfillment',
 descZh: '面对美国取消 $800 小额免税及欧盟征收 €3 小包税，Temu 迅速收缩高空运成本的全托管直邮与海外广告投放（2026 Q3 集团营销费同比锐减 50 亿元），全面推进海外本土仓“半托管”与“本对本”模式以重塑合规与毛利。',
 descEn: 'Facing US de minimis repeal and EU €3 parcel duties, Temu pivoted rapidly toward local-warehouse semi-managed fulfillment and cut marketing spend by RMB 5B YoY in Q3’26—protecting margins and regulatory resilience.',
 formulaZh: '转型逻辑：本地备货半托管 → 免受空运关税冲击 + 拓展大家电/家居高客单品类 + 营销费率降至 23.3%',
 formulaEn: 'Pivot Logic: Local-warehouse fulfillment → bypasses air-freight tariffs + unlocks bulky high-ASP goods + cuts S&M to 23.3%',
 kpisZh: [['-16.6%', 'Q3\'26 集团销售费用同比降幅'], ['-12%', 'Q3\'26 交易收入主动结构性回调'], ['€200M', '2026.05 欧盟 DSA 罚款落地'], ['本地仓', '欧美日韩本对本商家加速入驻']],
 kpisEn: [['-16.6%', 'Q3\'26 S&M Spend Cut YoY'], ['-12%', 'Q3\'26 Transaction Mix Shift'], ['€200M', 'May 2026 EU DSA Fine Absorbed'], ['Local Warehouses', 'US/EU Local-to-Local Ramp']]
 },
 {
 badge: 'NODE 05 · ULTRA-LIGHT CAPEX & CASH FORTRESS',
 titleZh: '0.27% CapEx 强度与 ¥4,554亿现金堡垒：静待资本配置期权',
 titleEn: '0.27% CapEx Intensity & RMB 455.4B Cash Fortress: Pure Optionality',
 descZh: '由于不建自营仓库、不囤自营商品、不养重资产快递队伍，拼多多 FY25 全年资本开支仅 RMB 11.5 亿，却赚取 RMB 1,058 亿自由现金流。截至 2026 Q3 账面现金及各类投资合计 RMB 5,711 亿，零有息负债压力。',
 descEn: 'With zero 1P inventory and no owned parcel fleet, PDD spent just RMB 1.15B in FY25 CapEx to generate RMB 105.8B in FCF—building RMB 571.1B in total cash and investments by Q3 2026.',
 formulaZh: '财富沉淀：轻资产运营 + 商家应付浮存 (¥112B) → 净现金占当前市值超 60%，提供极强安全边际',
 formulaEn: 'Wealth Engine: Asset-light ops + merchant payables (¥112B) → Net cash >60% of ~$111.9B market cap',
 kpisZh: [['¥455.4B', 'Q3\'26 现金与短期投资 ($67.9B)'], ['¥115.7B', 'Q3\'26 长期定存及债券 ($17.3B)'], ['0.27%', 'FY25 资本开支占总营收比'], ['~8.6x', '2026年底市场给予的市盈率']],
 kpisEn: [['¥455.4B', 'Q3\'26 Cash &amp; ST Inv ($67.9B)'], ['¥115.7B', 'Q3\'26 LT Deposits &amp; Debt ($17.3B)'], ['0.27%', 'FY25 CapEx / Total Revenue'], ['~8.6x', 'Late-2026 Trailing P/E']]
 }
 ];
 function renderNode(idx) {
 state.activeNode = idx; var nd = NODES[idx] || NODES[0], en = isEn();
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
 casual: {
 statsZh: [['典型画像', '三四线高频日用/生鲜买家', '多多买菜 + 9.9包邮'], ['年均下单频次', '65+ 次 / 年', '极高粘性日常刚需'], ['年均单客营收贡献', '~¥280 / 年', '广告曝光 + 基础支付佣金'], ['5年累计毛利 LTV', '~¥820', '靠高频复购摊薄获客成本']],
 statsEn: [['Profile', 'Lower-Tier Daily &amp; Grocery Buyer', 'Duoduo Grocery + Value Staples'], ['Annual Order Freq', '65+ orders / yr', 'Daily-habit retention'], ['Annual Revenue / User', '~RMB 280 / yr', 'Ad impressions + base payment take'], ['5Y Gross Profit LTV', '~RMB 820', 'High frequency amortizes CAC']],
 noteZh: '<strong>流量基石层：</strong>高频生鲜与日用百货虽客单价不高，但将用户每日打开 App 的习惯彻底固化，使得主站无需再向外部购买昂贵流量。',
 noteEn: '<strong>Habit Foundation:</strong> High-frequency groceries and staples lock in daily app opens, eliminating external traffic re-acquisition costs.'
 },
 core: {
 statsZh: [['典型画像', '一二线“百亿补贴”中产家庭', '数码家电 + 美妆 + 农特产'], ['客单价与跨类目度', '中高客单 + 跨 6 个以上类目', '从日用向品牌标品渗透'], ['年均单客营收贡献', '~¥640 / 年', '品牌全站推广高 ROI 竞价'], ['5年累计毛利 LTV', '~¥1,980', '平台利润池的核心贡献群']],
 statsEn: [['Profile', 'Tier 1–2 Urban 10B-Subsidy Household', 'Electronics + Beauty + Fresh Produce'], ['Basket &amp; Breadth', 'Mid-High ASP + 6+ categories', 'Migrating from staples to brands'], ['Annual Revenue / User', '~RMB 640 / yr', 'High-ROAS brand ad bidding'], ['5Y Gross Profit LTV', '~RMB 1,980', 'Core driver of platform profit pool']],
 noteZh: '<strong>利润跃迁层：</strong>一旦一二线用户通过 iPhone、戴森或茅台等“百亿补贴”正品建立信任，其消费半径迅速扩散至家居、服饰与生鲜，单客货币化率翻倍。',
 noteEn: '<strong>Profit Expansion Tier:</strong> Once urban buyers trust authentic 10B-Subsidy electronics and liquor, spend expands across apparel and home—doubling per-user monetization.'
 },
 temu: {
 statsZh: [['典型画像', '欧美日韩 Temu 半托管复购客', '家居园艺 + 消费电子 + 服饰'], ['单均客单价 (AOV)', '$38 – $55+', '半托管推动大件高客单扩张'], ['履约模式转型', '本地仓 2–5 日达', '大幅降低退货率与跨境关税'], ['5年累计毛利 LTV', '~$290+ (¥2,000+)', '高客单弥补海外营销投入']],
 statsEn: [['Profile', 'US/EU/JP Temu Repeat Shopper', 'Home, Tools, Electronics &amp; Apparel'], ['Average Order Value', '$38 – $55+', 'Semi-managed unlocks bulky items'], ['Fulfillment Shift', '2–5 Day Local Warehouse', 'Cuts return rates &amp; tariff exposure'], ['5Y Gross Profit LTV', '~$290+ (RMB 2,000+)', 'Higher AOV offsets overseas CAC']],
 noteZh: '<strong>全球增量层：</strong>2026年 Temu 缩减低效买量后，留存下来的高复购本土仓用户贡献了更健康的单均边际贡献（Unit Economics），带动集团 Q3 净利超预期。',
 noteEn: '<strong>Global Incremental Tier:</strong> Following Q3’26 marketing discipline, retained local-warehouse repeat buyers deliver far healthier contribution margins.'
 }
 };
 function renderCohort(key) {
 state.activeCohort = key || 'core';
 var c = COHORTS[state.activeCohort] || COHORTS.core, en = isEn();
 var stats = en ? c.statsEn : c.statsZh;
 document.getElementById('cohortMetrics').innerHTML = stats.map(function (s, idx) {
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + (idx > 0 ? ' mono' : '') + '"' + (idx === 0 ? ' style="font-size:0.92rem;"' : '') + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
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
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl && sd) { sl.setAttribute('aria-pressed', String(state.theme === 'light')); sd.setAttribute('aria-pressed', String(state.theme === 'dark')); }
 drawAllCharts();
 if (!silent) showToast(isEn() ? (state.theme === 'dark' ? 'Dark Mode' : 'Light Mode') : (state.theme === 'dark' ? '已切换深色模式' : '已切换浅色模式'));
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.lang = en ? 'en' : 'zh-CN';
 document.title = en ? TITLE_EN : TITLE_ZH;
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', !en); zhB.setAttribute('aria-pressed', String(!en)); }
 if (enB) { enB.classList.toggle('active', en); enB.setAttribute('aria-pressed', String(en)); }
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
 var val = el.getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) { if (val.indexOf('<span') !== -1) el.innerHTML = val; else el.textContent = val; }
 });
 document.querySelectorAll('[data-i18n-rich]').forEach(function (el) {
 var rk = el.getAttribute('data-i18n-rich');
 if (RICH_I18N[rk]) el.innerHTML = en ? RICH_I18N[rk].en : RICH_I18N[rk].zh;
 });
 document.querySelectorAll('[data-i18n-ph-zh]').forEach(function (el) {
 el.setAttribute('placeholder', el.getAttribute(en ? 'data-i18n-ph-en' : 'data-i18n-ph-zh'));
 });
 renderLens(state.activeLens); renderNode(state.activeNode); renderCohort(state.activeCohort);
 renderProfitLegend(); renderCohortLegend(); drawAllCharts();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 document.getElementById('lensTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]'); if (!b) return;
 document.querySelectorAll('#lensTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderLens(parseInt(b.getAttribute('data-lens'), 10) || 0);
 });
 document.getElementById('pipelineTrack').addEventListener('click', function (e) {
 var b = e.target.closest('[data-node]'); if (!b) return;
 document.querySelectorAll('#pipelineTrack .bm-node-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderNode(parseInt(b.getAttribute('data-node'), 10) || 0);
 });
 document.getElementById('tierFilter').addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]'); if (!b) return;
 var cat = b.getAttribute('data-tcat');
 document.querySelectorAll('#tierFilter .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.querySelectorAll('#tierList [data-tier]').forEach(function (c) { c.style.display = (cat === 'all' || c.getAttribute('data-tier') === cat) ? '' : 'none'; });
 });
 document.getElementById('cohortTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]'); if (!b) return;
 document.querySelectorAll('#cohortTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderCohort(b.getAttribute('data-cohort'));
 });
 document.getElementById('peerFilter').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pcat]'); if (!b) return;
 var cat = b.getAttribute('data-pcat');
 document.querySelectorAll('#peerFilter .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.querySelectorAll('#peerTable tbody tr').forEach(function (r) {
 var rc = r.getAttribute('data-row-cat') || '';
 r.style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 });
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 500), h = Math.max(140, rect.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr);
 ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }
 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return;
 ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) {
 var xc = (pts[i].x + pts[i + 1].x) / 2;
 ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
 }
 }
 function drawValueBadge(ctx, text, cx, cy, fgColor, pal, maxW, maxH) {
 ctx.save(); ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 var tw = ctx.measureText(text).width + 10, th = 17;
 var bx = cx; if (maxW) bx = Math.max(tw / 2 + 4, Math.min(maxW - tw / 2 - 4, cx));
 var by = cy; if (maxH) by = Math.max(th / 2 + 2, Math.min(maxH - th / 2 - 2, cy));
 ctx.fillStyle = pal.pillBg; roundRect(ctx, bx - tw / 2, by - th / 2, tw, th, 5); ctx.fill();
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(text, bx, by + 0.5); ctx.restore();
 }

 function renderProfitLegend() {
 var leg = document.getElementById('profitLegend'); if (!leg) return;
 var en = isEn();
 if (state.pView === 'waterfall') {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'FY25 P&amp;L Bridge (RMB B): Marketing + Transaction → GP → OpInc → Net → FCF' : 'FY25 价值转化桥 (RMB B)：营销 + 交易 → 毛利 → 营业利润 → 净利 → FCF') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.profitSeries.gm ? '' : ' muted') + '" data-p-series="gm"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Gross Margin (%)' : '毛利率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.opm ? '' : ' muted') + '" data-p-series="opm"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Operating Margin (%)' : '营业利润率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.nm ? '' : ' muted') + '" data-p-series="nm"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Net Margin (%)' : '净利率 (%)') + '</span></button>';
 }
 }
 document.getElementById('profitLegend').addEventListener('click', function (e) {
 var b = e.target.closest('[data-p-series]'); if (!b) return;
 var k = b.getAttribute('data-p-series');
 state.profitSeries[k] = !state.profitSeries[k];
 if (!state.profitSeries.gm && !state.profitSeries.opm && !state.profitSeries.nm) state.profitSeries[k] = true;
 renderProfitLegend(); drawProfitCanvas();
 });

 function renderCohortLegend() {
 var leg = document.getElementById('cohortLegend'); if (!leg) return;
 var en = isEn();
 if (state.cView === 'ltv') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.cohortSeries.temu ? '' : ' muted') + '" data-c-series="temu"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Temu Global Repeat' : 'Temu 欧美复购客') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.core ? '' : ' muted') + '" data-c-series="core"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? '10B-Subsidy Urban' : '百亿补贴中产户') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.casual ? '' : ' muted') + '" data-c-series="casual"><span class="legend-dot" style="background:var(--mui-warning-main);"></span><span>' + (en ? 'Value Daily Buyer' : '下沉/高频刚需') + '</span></button>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'China Retail E-Commerce Value Share (Euromonitor / USDA)' : '中国零售电商市场份额分布 (Euromonitor / USDA 口径)') + '</span>';
 }
 }
 document.getElementById('cohortLegend').addEventListener('click', function (e) {
 var b = e.target.closest('[data-c-series]'); if (!b) return;
 var k = b.getAttribute('data-c-series');
 state.cohortSeries[k] = !state.cohortSeries[k];
 if (!state.cohortSeries.temu && !state.cohortSeries.core && !state.cohortSeries.casual) state.cohortSeries[k] = true;
 renderCohortLegend(); drawCohortCanvas();
 });

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: en ? 'Marketing' : '在线营销', val: 217.8, base: 0, col: pal.blue, tip: en ? 'FY25 Online Marketing & Others: RMB 217.8B (+10% YoY)' : 'FY2025 在线营销服务营收: RMB 217.8B (+10% YoY)' },
 { lbl: en ? '+Transaction' : '+交易服务', val: 214.1, base: 217.8, col: pal.green, tip: en ? 'FY25 Transaction Services: +RMB 214.1B (+9% YoY), Total Rev = RMB 431.85B' : 'FY2025 交易服务营收: +RMB 214.1B (+9% YoY)，合并总营收 RMB 431.85B' },
 { lbl: en ? 'Gross Profit' : '=总毛利', val: 243.0, base: 0, col: pal.violet, tip: en ? 'FY25 Gross Profit: RMB 243.0B (56.3% Gross Margin)' : 'FY2025 毛利额: RMB 243.0B (综合毛利率 56.3%)' },
 { lbl: en ? 'Op Income' : '营业利润', val: 94.6, base: 0, col: pal.blue, tip: en ? 'FY25 Operating Profit: RMB 94.6B after RMB 125.3B S&M & RMB 16.5B R&D' : 'FY2025 营业利润: RMB 94.6B（扣除营销 ¥125.3B 与研发 ¥16.5B）' },
 { lbl: en ? 'Net Income' : 'GAAP净利', val: 97.8, base: 0, col: pal.amber, tip: en ? 'FY25 GAAP Net Income: RMB 97.8B (22.7% Net Margin)' : 'FY2025 GAAP 净利润: RMB 97.8B (净利率 22.7%)' },
 { lbl: en ? 'Free Cash' : '自由现金流', val: 105.8, base: 0, col: pal.green, tip: en ? 'FY25 FCF: RMB 105.8B (OpCF RMB 106.9B - CapEx RMB 1.15B)' : 'FY2025 自由现金流: RMB 105.8B (经营现金流 ¥106.9B - CapEx 仅 ¥1.15B)' }
 ];
 var maxV = 470;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var cx = pad.left + i * slotW + slotW / 2, x = cx - barW / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph, yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(4, yBot - yTop);
 if (state.hover.profitCanvas === i) { ctx.fillStyle = pal.hoverBand; roundRect(ctx, pad.left + i * slotW + 3, pad.top, slotW - 6, ph, 7); ctx.fill(); }
 ctx.fillStyle = s.col; roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 if (state.hover.profitCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + s.val.toFixed(1) + 'B', cx, yTop - 12, s.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(s.lbl, cx, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ idx: i, x: pad.left + i * slotW, y: pad.top, w: slotW, h: ph + 26, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26'];
 var gm = [75.9, 63.0, 60.9, 56.3, 58.2];
 var opm = [23.3, 23.7, 27.5, 21.9, 28.8];
 var nm = [24.2, 24.2, 28.5, 22.7, 27.3];
 var minM = 15, maxM = 82;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 var stepX = pw / (yrs.length - 1);
 yrs.forEach(function (y, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.profitCanvas === idx) { ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore(); }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26, title: y + (en ? ' Margin Profile' : ' 利润率结构'), body: 'GM: ' + gm[idx] + '% · OpM: ' + opm[idx] + '% · NM: ' + nm[idx] + '%' });
 });
 function plotLine(arr, col, fillTop, badgeDy) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - ((v - minM) / (maxM - minM)) * ph, v: v }; });
 ctx.save(); drawSmoothLine(ctx, pts); ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph); ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = ag; ctx.fill(); ctx.restore();
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.profitCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.6 : 3.6, 0, Math.PI * 2); ctx.fill();
 if (idx === yrs.length - 1 || idx === 0 || isHov) drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y + badgeDy, col, pal, w, h);
 });
 }
 if (state.profitSeries.gm) plotLine(gm, pal.green, 'rgba(22, 163, 74, 0.16)', -14);
 if (state.profitSeries.opm) plotLine(opm, pal.blue, 'rgba(0, 115, 230, 0.14)', 15);
 if (state.profitSeries.nm) plotLine(nm, pal.violet, 'rgba(124, 58, 237, 0.14)', -14);
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 24, bottom: 42, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = en ? ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'] : ['首年 Y1', '第2年 Y2', '第3年 Y3', '第4年 Y4', '第5年 Y5'];
 var casual = [150, 310, 480, 650, 820], core = [360, 740, 1140, 1550, 1980], temu = [290, 680, 1100, 1540, 2020];
 var maxL = 2300;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv.toFixed(0), pad.left - 8, gy + 4);
 }
 var stepX = pw / 4;
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.cohortCanvas === idx) { ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore(); }
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(lb, px, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26, title: lb + ' LTV', body: 'Temu: ¥' + temu[idx] + ' · Core: ¥' + core[idx] + ' · Value: ¥' + casual[idx] });
 });
 function drawCurve(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxL) * ph, v: v }; });
 ctx.save(); drawSmoothLine(ctx, pts); ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph); ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = ag; ctx.fill(); ctx.restore();
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.cohortCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.6 : 3.6, 0, Math.PI * 2); ctx.fill();
 if (idx === 4 || isHov) drawValueBadge(ctx, '¥' + pt.v, idx === 4 ? pt.x - 16 : pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.cohortSeries.temu) drawCurve(temu, pal.violet, 'rgba(124, 58, 237, 0.18)');
 if (state.cohortSeries.core) drawCurve(core, pal.blue, 'rgba(0, 115, 230, 0.16)');
 if (state.cohortSeries.casual) drawCurve(casual, pal.amber, 'rgba(217, 119, 6, 0.14)');
 } else {
 var peers = [
 { name: 'Alibaba', share: 27.9, col: pal.amber },
 { name: 'JD.com', share: 22.1, col: pal.blue },
 { name: 'ByteDance (Douyin)', share: 21.3, col: pal.violet },
 { name: 'Pinduoduo (PDD)', share: 16.7, col: pal.green }
 ];
 var maxS = 35, slot = pw / peers.length, bw = Math.min(48, slot * 0.56);
 for (var k = 0; k <= 3; k++) {
 var kv = k * 10, ky = pad.top + ph - (kv / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 peers.forEach(function (p, i) {
 var cx = pad.left + i * slot + slot / 2, bh = (p.share / maxS) * ph, yt = pad.top + ph - bh;
 if (state.hover.cohortCanvas === i) { ctx.fillStyle = pal.hoverBand; roundRect(ctx, pad.left + i * slot + 4, pad.top, slot - 8, ph, 7); ctx.fill(); }
 ctx.fillStyle = p.col; roundRect(ctx, cx - bw / 2, yt, bw, bh, 6); ctx.fill();
 drawValueBadge(ctx, p.share + '%', cx, yt - 12, p.col, pal);
 ctx.fillStyle = i === 3 ? pal.green : pal.sub; ctx.font = (i === 3 ? 'bold ' : '600 ') + '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(p.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: p.name, body: (en ? 'China Retail E-Commerce Value Share (Euromonitor): ' : '中国零售电商市场份额 (Euromonitor 口径): ') + p.share + '%' });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'cash') {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'Q1\'26', 'Q2\'26', 'Q3\'26'];
 var cashB = [149.4, 217.2, 331.6, 422.3, 436.1, 456.4, 455.4];
 var maxC = 500, slot = pw / yrs.length, bw = Math.min(38, slot * 0.56);
 for (var g = 0; g <= 4; g++) {
 var gv = (maxC / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, bh = (cashB[i] / maxC) * ph, yt = pad.top + ph - bh;
 if (state.hover.capitalCanvas === i) { ctx.fillStyle = pal.hoverBand; roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill(); }
 ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
 roundRect(ctx, cx - bw / 2, yt, bw, bh, 5); ctx.fill();
 drawValueBadge(ctx, '¥' + cashB[i].toFixed(0) + 'B', cx, yt - 12, i >= 4 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: y + (en ? ' Cash &amp; ST Investments' : ' 现金及短期投资'), body: 'RMB ' + cashB[i].toFixed(1) + 'B' + (i === 6 ? (en ? ' (+RMB 115.7B LT deposits = RMB 571.1B)' : '（另含 ¥115.7B 非流动定存/债券，总计 ¥571.1B）') : '') });
 });
 } else {
 var items = [
 { name: en ? 'Short-Term Inv.' : '短期投资理财', val: 329.9, col: pal.blue },
 { name: en ? 'Cash & Restricted' : '现金+受限资金', val: 207.7, col: pal.green },
 { name: en ? 'LT Deposits/Debt' : '长期定存与债券', val: 115.7, col: pal.violet },
 { name: en ? 'Merchant Payables' : '应付商家货款', val: 112.0, col: pal.amber },
 { name: en ? 'Accrued + Deposits' : '应计费用+押金', val: 89.0, col: pal.red }
 ];
 var maxX = 360, lPad = 134, rPad = 62, barSpan = Math.max(80, w - lPad - rPad), rowH = ph / items.length;
 items.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 20, bl = (it.val / maxX) * barSpan;
 if (state.hover.capitalCanvas === idx) { ctx.fillStyle = pal.hoverBand; roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill(); }
 ctx.fillStyle = pal.grid; roundRect(ctx, lPad, cy - bh / 2, barSpan, bh, 5); ctx.fill();
 ctx.fillStyle = it.col; roundRect(ctx, lPad, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(it.name, lPad - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText('¥' + it.val.toFixed(1) + 'B', lPad + bl + 8, cy + 4);
 hitRegions.capitalCanvas.push({ idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH, title: it.name, body: 'Q3 2026 Balance Sheet: RMB ' + it.val.toFixed(1) + 'B' });
 });
 }
 }

 var simData = { net: [97.8, 110, 124, 140, 156, 174], rev: [431.8, 468, 507, 550, 596, 646] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.simMiniCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 46 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY25', 'FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E'];
 var arr = simData.net, maxE = Math.max(200, Math.ceil(Math.max.apply(null, arr) * 1.18));
 for (var sg = 0; sg <= 2; sg++) {
 var sgv = (maxE / 2) * sg, sgy = pad.top + ph - (sg / 2) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sgy); ctx.lineTo(pad.left + pw, sgy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + Math.round(sgv) + 'B', pad.left - 6, sgy + 3);
 }
 var pts = arr.map(function (v, i) { return { x: pad.left + (i / 5) * pw, y: pad.top + ph - (v / maxE) * ph, v: v }; });
 ctx.save(); drawSmoothLine(ctx, pts); ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph); ag.addColorStop(0, 'rgba(0,115,230,0.24)'); ag.addColorStop(1, 'rgba(0,115,230,0.01)'); ctx.fillStyle = ag; ctx.fill(); ctx.restore();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 var slot = pw / 5;
 pts.forEach(function (pt, i) {
 var isHov = state.hover.simMiniCanvas === i;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 5.2 : 4, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '¥' + pt.v.toFixed(0) + 'B', pt.x, pt.y - 13, (i === 5) ? pal.green : pal.blue, pal, w, h);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(yrs[i], pt.x, pad.top + ph + 16);
 hitRegions.simMiniCanvas.push({ idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24, title: yrs[i], body: (en ? 'Net Income: ¥' : '推演净利: ¥') + pt.v.toFixed(1) + 'B · Rev: ¥' + Math.round(simData.rev[i]) + 'B' });
 });
 }

 function runSimulator() {
 var gM = parseFloat(document.getElementById('inpMktCagr').value) / 100;
 var gT = parseFloat(document.getElementById('inpTxnCagr').value) / 100;
 var sm = parseFloat(document.getElementById('inpSmRatio').value) / 100;
 document.getElementById('lblMktCagr').textContent = (gM * 100).toFixed(1) + '%';
 document.getElementById('lblTxnCagr').textContent = (gT * 100).toFixed(1) + '%';
 document.getElementById('lblSmRatio').textContent = (sm * 100).toFixed(1) + '%';
 var mkt = 217.78, txn = 214.06, netArr = [97.84], revArr = [431.85];
 for (var y = 1; y <= 5; y++) {
 mkt *= (1 + gM); txn *= (1 + gT);
 var rv = mkt + txn, gm = 0.58;
 var op = rv * (gm - sm - 0.052);
 var ni = op * 0.93;
 netArr.push(ni); revArr.push(rv);
 }
 var fy31Rev = revArr[5], fy31Op = fy31Rev * (0.58 - sm - 0.052), fy31Net = netArr[5];
 var impliedPe = (111.9 * 6.7045) / Math.max(10, fy31Net);
 document.getElementById('simRevOut').textContent = '¥' + Math.round(fy31Rev) + 'B';
 document.getElementById('simOpOut').textContent = '¥' + Math.round(fy31Op) + 'B';
 document.getElementById('simNetOut').textContent = '¥' + Math.round(fy31Net) + 'B';
 document.getElementById('simPeOut').textContent = impliedPe.toFixed(1) + 'x';
 simData.net = netArr; simData.rev = revArr; drawSimMiniCanvas();
 }
 ['inpMktCagr', 'inpTxnCagr', 'inpSmRatio'].forEach(function (id) {
 var el = document.getElementById(id); if (el) el.addEventListener('input', runSimulator);
 });
 var PRESETS = { bear: { m: 5.0, t: -1.0, s: 29.0 }, base: { m: 10.0, t: 6.5, s: 24.5 }, bull: { m: 14.0, t: 10.5, s: 21.5 } };
 document.getElementById('simPresets').addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]'); if (!b) return;
 document.querySelectorAll('#simPresets .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var pr = PRESETS[b.getAttribute('data-preset')] || PRESETS.base;
 document.getElementById('inpMktCagr').value = pr.m; document.getElementById('inpTxnCagr').value = pr.t; document.getElementById('inpSmRatio').value = pr.s;
 runSimulator();
 });

 function bindChartTab(gid, attr, skey, fn) {
 var g = document.getElementById(gid); if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[skey] = b.getAttribute(attr);
 g.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 if (gid === 'pChartTabs') renderProfitLegend();
 if (gid === 'cChartTabs') renderCohortLegend();
 fn();
 });
 }
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 function bindHoverTooltip(cid, redrawFn) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip'); if (!c || !tip) return;
 function handlePtr(clientX, clientY) {
 var r = c.getBoundingClientRect(), mx = clientX - r.left, my = clientY - r.top;
 var list = hitRegions[cid] || [], hit = null;
 for (var i = 0; i < list.length; i++) { var rg = list[i]; if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; } }
 var nextIdx = hit ? hit.idx : -1;
 if (state.hover[cid] !== nextIdx) { state.hover[cid] = nextIdx; redrawFn(); }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 315, Math.max(12, clientX + 14)) + 'px';
 tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, clientY - 28)) + 'px';
 } else tip.style.display = 'none';
 }
 c.addEventListener('mousemove', function (ev) { handlePtr(ev.clientX, ev.clientY); });
 c.addEventListener('mouseleave', function () { if (state.hover[cid] !== -1) { state.hover[cid] = -1; redrawFn(); } tip.style.display = 'none'; });
 }
 bindHoverTooltip('profitCanvas', drawProfitCanvas); bindHoverTooltip('cohortCanvas', drawCohortCanvas);
 bindHoverTooltip('capitalCanvas', drawCapitalCanvas); bindHoverTooltip('simMiniCanvas', drawSimMiniCanvas);
 function drawAllCharts() { drawProfitCanvas(); drawCohortCanvas(); drawCapitalCanvas(); drawSimMiniCanvas(); }

 var QUICK_ZH = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '¥431.8B 营收 · 58.2% Q3毛利 · ¥455.4B 现金' },
 { id: 'mod-pipeline', t: 'M1 五阶价值链传导沙盘', s: '去购物车化 → C2M → 全站推广 → Temu半托管 → 浮存金' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与双擎拆解', s: '营销 ¥59.8B (+12%) + 交易 ¥48.5B (-12%)' },
 { id: 'mod-cohort', t: 'M3 三类客群复购与份额', s: '下沉刚需 / 百亿补贴中产 / Temu 复购客' },
 { id: 'mod-capital', t: 'M4 现金堡垒与5年推演器', s: '¥571.1B 总流动性 · 5年营收与 P/E 模拟' },
 { id: 'mod-matrix', t: 'M5 全球巨头对标与监管压测', s: 'PDD vs AMZN / BABA / JD / MELI / COST' }
 ];
 var QUICK_EN = [
 { id: 'mod-deck', t: 'M0 Command Deck & Formula', s: '¥431.8B Sales · 58.2% Q3 GM · ¥455.4B Cash' },
 { id: 'mod-pipeline', t: 'M1 5-Node Value Pipeline', s: 'Social → C2M → Dual Ads → Temu Pivot → Cash Float' },
 { id: 'mod-profit-pool', t: 'M2 Profit Waterfall & Engines', s: 'Marketing ¥59.8B (+12%) + Txn ¥48.5B (-12%)' },
 { id: 'mod-cohort', t: 'M3 Cohort LTV & Market Share', s: 'Value / Urban / Temu Repeat &amp; 16.7% Share' },
 { id: 'mod-capital', t: 'M4 Cash Fortress & 5Y Lab', s: '¥571.1B Liquidity · Interactive 5Y Simulator' },
 { id: 'mod-matrix', t: 'M5 Peer Matrix & Stress Audit', s: 'PDD vs AMZN / BABA / JD / MELI / COST' }
 ];
 var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQuick(q) {
 var kw = (q || '').trim().toLowerCase(), src = isEn() ? QUICK_EN : QUICK_ZH;
 var matched = src.filter(function (it, idx) {
 var z = QUICK_ZH[idx], e = QUICK_EN[idx];
 return !kw || (z.t + ' ' + z.s + ' ' + e.t + ' ' + e.s).toLowerCase().indexOf(kw) !== -1;
 });
 qPop.innerHTML = matched.map(function (it) { return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', matched.length > 0);
 }
 qInput.addEventListener('focus', function () { renderQuick(qInput.value); });
 qInput.addEventListener('input', function () { renderQuick(qInput.value); });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; document.querySelector(jb.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qInput.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAllCharts, 60); }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar'), docH = document.documentElement.scrollHeight - window.innerHeight;
 if (bar) bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
 }, { passive: true });

 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk'); chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () {
 savedChk[k] = chk.checked; try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
 showToast(isEn() ? (chk.checked ? 'Added to watchlist' : 'Removed') : (chk.checked ? '已加入季度跟踪清单' : '已取消跟踪'));
 });
 });
 } catch (e) {}

 document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'PDD_Business_Model_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) { applyLang('zh', true); }
 runSimulator(); drawAllCharts();
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(drawAllCharts, 90); });
 window.addEventListener('load', drawAllCharts);
 if (typeof ResizeObserver !== 'undefined') { var _ro = new ResizeObserver(function () { clearTimeout(window._rt); window._rt = setTimeout(drawAllCharts, 60); }); document.querySelectorAll('.bm-canvas-box').forEach(function (b) { _ro.observe(b); }); }
 })();
 