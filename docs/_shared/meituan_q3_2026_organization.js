
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mt_q3_26_os_theme_v1';
 var STORAGE_LANG_KEY = 'mt_q3_26_os_lang_v1';
 var STORAGE_AUDIT_KEY = 'mt_q3_26_os_audit_v1';

 var TITLE_ZH = '美团 (03690.HK) 2026 Q3 财报深度解构与组织履约图谱 | 数据中心';
 var TITLE_EN = 'Meituan (03690.HK) Q3 2026 Earnings & Org OS Blueprint | Research Hub';

 var state = {
 theme: 'light',
 lang: 'zh',
 topoMode: 'apple',
 activeQuad: 0,
 activeEra: 2,
 eView: 'revemp',
 gView: 'emp',
 eraSeries: { fcf: true, rd: true },
 hover: { eraCanvas: -1, genomeCanvas: -1, entropyCanvas: -1 }
 };
 var hits = { eraCanvas: [], genomeCanvas: [], entropyCanvas: [] };

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
 green: dark ? '#22C55E' : '#16A34A',
 violet: dark ? '#A78BFA' : '#7C3AED',
 amber: dark ? '#FFB74D' : '#D97706',
 red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 c0_lead: {
 zh: '2026年11月27日盘后，美团披露截至9月30日止第三季度业绩：总营收达 <strong>1,155.56亿元</strong>（YoY +21.6%，QoQ +10.4%），超越一致预期（1,133.7亿元）及花旗预期（1,141.5亿元） <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">亿欧财报全拆解 ↗</a> <a class="cite-link" href="https://mlq.ai/news/meituan-stays-profitable-in-q3-as-revenue-rises-216-to-rmb1156-billion/" target="_blank" rel="noopener noreferrer">MLQ.ai 三期对照 ↗</a>。 在经历2025 Q3行业极端补贴战（单季经营亏损197.6亿元）后，核心本地商业营业利润强势修复至 <strong>57.0亿元（OPM 7.3%）</strong>，大幅跑赢市场一致预期的 41.5亿元（+37%）；集团经调整净利润 <strong>18.5亿元</strong>（同比扭亏超178亿元），略低于22亿一致预期主因未分配项目含股权激励及公司级AI大模型投入 <strong>16.5–17亿元</strong> <a class="cite-link" href="https://cn.investing.com/news/earnings/article-3689200" target="_blank" rel="noopener noreferrer">英为财情预期差 ↗</a>。',
 en: 'Released Nov 27, 2026: Meituan reported Q3 2026 revenue of <strong>RMB 115.56B</strong> (+21.6% YoY, +10.4% QoQ), beating consensus (RMB 113.37B) and Citi (RMB 114.15B) <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">Iyiou Breakdown ↗</a> <a class="cite-link" href="https://mlq.ai/news/meituan-stays-profitable-in-q3-as-revenue-rises-216-to-rmb1156-billion/" target="_blank" rel="noopener noreferrer">MLQ.ai Table ↗</a>. Rebounding from Q3 2025’s RMB 19.76B operating loss, Core Local Commerce OP reached <strong>RMB 5.70B (7.3% OPM)</strong>, +37% above RMB 4.15B consensus. Non-IFRS net profit was <strong>RMB 1.85B</strong> (vs -RMB 16.01B in Q3’25), reflecting <strong>RMB 1.65–1.70B</strong> in unallocated SBC and corporate AI investments <a class="cite-link" href="https://cn.investing.com/news/earnings/article-3689200" target="_blank" rel="noopener noreferrer">Investing.com CN ↗</a>.'
 },
 c0_quote: {
 zh: '<strong>核心制度与周期洞察：</strong>当行业单均补贴强度从 2025 Q3 峰值的 2.6–2.8 元回落至 2026 年 9 月的 1.3–1.4 元，决定终局胜负的不再是烧钱规模，而是<strong>7,300万日均单量下的分钟级履约网络密度（单均成本 ~¥6.5 vs 同业 ~¥6.9）</strong>与 <strong>4,000万+ 高阶会员生态</strong>。',
 en: '<strong>Institutional &amp; Cycle Insight:</strong> As industry subsidies cooled from RMB 2.6–2.8/order in Q3’25 to RMB 1.3–1.4 in Sep’26, long-term victory shifts from subsidy burn to <strong>~73M daily order fulfillment density (~¥6.5/order vs ~¥6.9 rivals)</strong> and <strong>40M+ high-tier members</strong>.'
 },
 c2_note: {
 zh: '注：2026 Q3 经调整 EBITDA 达 <strong>45.81亿元</strong>（4.0% 利润率，去年同期为 -148.4亿元），经营现金流净流入 <strong>48亿元</strong>，账面高流动性储备 <strong>1,575亿元</strong>。',
 en: 'Note: Q3 2026 Adjusted EBITDA reached <strong>RMB 4.58B</strong> (4.0% margin vs -RMB 14.84B in Q3’25), with <strong>RMB 4.8B</strong> operating cash inflow and <strong>RMB 157.5B</strong> total liquidity.'
 },
 c3_note: {
 zh: '第三方口径提示：据 36Kr / 易观 / 汇丰等机构 2026 年测算，美团凭借 ~7,300万日单密度将单均履约成本锁定在 <strong>~¥6.5</strong>，较主要竞对（~¥6.9）保持约 <strong>0.4元/单</strong> 的结构性成本壁垒。',
 en: 'Third-party estimate (36Kr / Analysys / HSBC): Meituan’s ~73M daily order density anchors fulfillment cost at <strong>~¥6.5/order</strong>, preserving a <strong>~¥0.40/order</strong> structural edge over peers (~¥6.9).'
 }
 };

 function renderTopo(mode) {
 state.topoMode = mode === 'legacy' ? 'legacy' : 'apple';
 var stage = document.getElementById('topoStage');
 if (!stage) return;
 var en = isEn();
 if (state.topoMode === 'apple') {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono">Meituan Super-Fulfillment Hub (Core ¥78.28B + New ¥37.27B)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>Delivery Grid</b>~73M daily orders · ~¥6.5/order cost edge</div>' +
 '<div class="cc-spoke"><b>Membership</b>40M+ high-tier members · 2,000+ brand co-ops</div>' +
 '<div class="cc-spoke"><b>1P &amp; Flash Warehouses</b>1P sales +75.8% YoY · Waima Songjiu</div>' +
 '<div class="cc-spoke"><b>Xiaoxiang Grocery</b>85 cities · mature cities profitable</div>' +
 '<div class="cc-spoke"><b>Keeta Global</b>Saudi Q3 profitable · Brazil 32 cities</div>' +
 '<div class="cc-spoke"><b>LongCat-2.5 &amp; Drones</b>CatPaw 2M+ merchants · 1.1M+ drone orders</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">Outcome: Core OP jumped to ¥5.70B (7.3% OPM), S&amp;M fell 20% YoY, and OCF reached +¥4.8B.</div>'
 : '<div class="cc-topo-hub mono">美团本地生活超级履约中枢（核心 ¥782.8亿 + 新业务 ¥372.7亿）</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>分钟级履约网</b>日均 ~7,300万单 · 单均成本 ~¥6.5 护城河</div>' +
 '<div class="cc-spoke"><b>高阶会员生态</b>4,000万+会员 · 2,000+品牌联名锁定AOV</div>' +
 '<div class="cc-spoke"><b>闪电仓与1P自营</b>核心商品销售 +75.8% · 歪马送酒放量</div>' +
 '<div class="cc-spoke"><b>小象超市网络</b>覆盖 85 城 · 成熟城市实现盈利</div>' +
 '<div class="cc-spoke"><b>Keeta 出海引擎</b>沙特 Q3 全季盈利 · 巴西覆盖 32 城</div>' +
 '<div class="cc-spoke"><b>LongCat-2.5 &amp; 无人机</b>CatPaw 服务200万+商家 · 无人机110万+单</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：核心 OP 修复至 ¥57.0亿（7.3% OPM），销售费用同比降 20%，单季经营现金流净流入 ¥48亿</div>';
 } else {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">Subsidy-War Trap: Chasing Low-AOV Volume Without Fulfillment Density</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>High Subsidy Burn</b>¥2.6–2.8/order subsidies erode unit economics</div>' +
 '<div class="cc-spoke silo"><b>Higher Unit Cost</b>~¥6.9/order fulfillment cost vs Meituan ~¥6.5</div>' +
 '<div class="cc-spoke silo"><b>Low-AOV Skew</b>Heavy tea/beverage subsidies fail to convert meals</div>' +
 '<div class="cc-spoke silo"><b>Heavy Losses</b>HSBC est. ~¥87B rival instant retail losses</div>' +
 '<div class="cc-spoke silo"><b>In-Store Silo</b>Content traffic lacks 30-min physical dispatch</div>' +
 '<div class="cc-spoke silo"><b>ROI Pullback</b>Q3’26 forced rationalization leaves UE gap</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">Failure Mode: Once subsidies halve to ¥1.35/order, lower-density networks lose both share and margin.</div>'
 : '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">补贴战陷阱：脱离履约密度的低客单流量内卷</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>高额补贴失血</b>峰值 ¥2.6–2.8/单补贴吞噬现金流</div>' +
 '<div class="cc-spoke silo"><b>履约成本劣势</b>单均履约 ~¥6.9，较美团高出约 0.4元/单</div>' +
 '<div class="cc-spoke silo"><b>低客单订单结构</b>补贴退坡后饮品低价单迅速流失</div>' +
 '<div class="cc-spoke silo"><b>巨额财务亏损</b>汇丰估阿里近场 25Q2–26Q1 累计亏 ~870亿</div>' +
 '<div class="cc-spoke silo"><b>缺乏履约闭环</b>纯内容到店平台难以切入30分钟即时达</div>' +
 '<div class="cc-spoke silo"><b>ROI 被迫收缩</b>26Q3 补贴减半后回归真实 UE 硬实力比拼</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：一旦补贴退坡至 ¥1.35/单，缺乏密度壁垒的平台同时丧失低价单量与盈利能力</div>';
 }
 }

 var QUADS = [
 {
 badge: 'Q1 · CORE LOCAL COMMERCE (¥78.28B · +16.8% YOY)',
 titleZh: '核心本地商业：营业利润 57.0 亿大超预期（预期 41.5 亿）',
 titleEn: 'Core Local Commerce: ¥5.70B OP (+37% Beat vs ¥4.15B Est)',
 descZh: '外卖客单价（AOV）同比回升，低价补贴订单占比下降。配送服务收入 288.7 亿（+25.3%）、商家服务 434.1 亿（+8.2%）、核心商品销售 42.6 亿（+75.8%），营业利润率达 7.3%。',
 descEn: 'Delivery AOV rebounded YoY as subsidized low-price orders fell. Delivery services +25.3% to ¥28.87B, Merchant services +8.2% to ¥43.41B, and 1P merchandise +75.8% to ¥4.26B, delivering 7.3% OPM.',
 labelsZh: ['销售成本占比 (集团)', '销售营销开支占比 (集团)', '研发开支占比 (集团)', '核心本地商业 OPM'],
 labelsEn: ['Cost of Sales / Rev', 'S&M Expenses / Rev', 'R&D Expenses / Rev', 'Core Local OPM'],
 alloc: [67.4, 23.4, 6.7, 7.3]
 },
 {
 badge: 'Q2 · COST & CASH FLOW DISCIPLINE (OCF +¥4.8B)',
 titleZh: '费用端全面优化：销售费用同比大降 20%，现金储备达 1,575 亿',
 titleEn: 'Cost Reset: S&M -20% YoY to ¥27.02B, Liquidity ¥157.5B',
 descZh: '销售及营销开支由 Q3 2025 的 338 亿元大幅压降至 270.2 亿元；销售成本率同比下降 6.6 个百分点至 67.4%。季末现金 1,041 亿 + 短期理财 534 亿合计 1,575 亿元。',
 descEn: 'S&M dropped from ¥33.8B in Q3’25 to ¥27.02B; cost of sales ratio improved 6.6 pct pts to 67.4%. Quarter-end liquidity reached ¥157.5B (¥104.1B cash + ¥53.4B short-term treasury).',
 labelsZh: ['销售成本率 (较Q3’25降6.6pct)', '销售费用率 (较Q3’25降12.2pct)', '经调整 EBITDA 率', '集团营业利润率'],
 labelsEn: ['Cost Ratio (-6.6pct YoY)', 'S&M Ratio (-12.2pct YoY)', 'Adj. EBITDA Margin', 'Group OPM'],
 alloc: [67.4, 23.4, 4.0, 2.4]
 },
 {
 badge: 'Q3 · NEW INITIATIVES & KEETA (¥37.27B · +32.9% YOY)',
 titleZh: '新业务减亏超预期：亏损收窄至 13.1 亿，沙特全季盈利',
 titleEn: 'New Initiatives: Loss Narrowed to -¥1.31B, Saudi Profitable',
 descZh: '新业务营收同比增长 32.9% 至 372.73 亿元，营业亏损率收窄至 -3.5%（Q2 为 -5.0%）。小象超市覆盖 85 城且成熟城市盈利；Keeta 沙特实现整个 Q3 盈利，巴西扩展至 32 城。',
 descEn: 'New Initiatives grew 32.9% YoY to ¥37.27B with OPM improving to -3.5% (vs -5.0% in Q2). Xiaoxiang reached 85 cities with mature cities profitable; Keeta turned profitable for full Q3 in Saudi Arabia.',
 labelsZh: ['新业务占总营收比重', '新业务营收同比增速', '新业务营业亏损率 (绝对值)', '核心1P商品销售增速'],
 labelsEn: ['New Init % of Rev', 'New Init YoY Growth', 'New Init Loss Margin', 'Core 1P Sales Growth'],
 alloc: [32.3, 32.9, 3.5, 75.8]
 },
 {
 badge: 'Q4 · AI, DRONES & HARD-TECH PORTFOLIO (>¥65B)',
 titleZh: 'LongCat-2.5 开源与未分配 AI 投入：着眼 2027 履约与商家提效',
 titleEn: 'LongCat-2.5 & Unallocated AI Spend: 2027 Efficiency Engine',
 descZh: '研发开支 77.2 亿元（+11.3%），叠加未分配项目 16.5–17 亿元（含股权激励及公司级 AI 基建）。CatPaw 服务超 200 万商家，无人机累计完单 110 万+，硬科技组合未实现价值超 650 亿。',
 descEn: 'R&D rose 11.3% YoY to ¥7.72B alongside ¥1.65–1.70B unallocated SBC & corporate AI spend. CatPaw serves 2M+ merchants, drones topped 1.1M orders, and hard-tech portfolio holds >¥65B unrealized value.',
 labelsZh: ['研发投入占营收比', '未分配支出占总营收比', '高阶会员生态渗透 (4,000万+)', '金融投资公允价值收益 (23亿)'],
 labelsEn: ['R&D % of Revenue', 'Unallocated % of Rev', 'High-Tier Member Scale', 'Investment Gains (¥2.3B)'],
 alloc: [6.7, 1.5, 40.0, 23.0]
 }
 ];

 function renderQuad(idx) {
 state.activeQuad = idx;
 var q = QUADS[idx] || QUADS[0];
 var en = isEn();
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = en ? q.titleEn : q.titleZh;
 document.getElementById('dialDesc').textContent = en ? q.descEn : q.descZh;
 var lbls = en ? q.labelsEn : q.labelsZh;
 ['Own', 'Learn', 'Teach', 'Del'].forEach(function (k, i) {
 document.getElementById('lbl' + k).textContent = lbls[i];
 document.getElementById('pct' + k).textContent = q.alloc[i].toFixed(1) + '%';
 document.getElementById('bar' + k).style.width = Math.min(100, q.alloc[i]) + '%';
 });
 }

 var ERAS = [
 {
 badge: 'PHASE I · 2025 Q3 – 2026 Q1 · PEAK SUBSIDY WAR',
 titleZh: '极端补贴战期：单均补贴 ¥2.6–2.8 压垮表观利润，但守住 50%+ GMV 底盘',
 titleEn: 'Peak Subsidy War: ¥2.6–2.8/Order Subsidies Compressed Margins, Defended >50% GMV',
 descZh: '2025 年 Q3 淘宝闪购与京东外卖高举高打补贴战，美团销售开支飙升至 338 亿元，核心本地商业录得 -140.7 亿元营业亏损、集团 Non-IFRS 净亏损 -160.1 亿元；2026 Q1 仍录得营业亏损 65 亿元，但履约网格未出现松动。',
 descEn: 'During Q3 2025’s peak subsidy war, S&M surged to ¥33.8B, pushing Core OP to -¥14.07B and Non-IFRS net loss to -¥16.01B (and -¥6.5B OP in Q1’26), yet Meituan defended its >50% GMV anchor.',
 kpisZh: [['¥950.6亿', '2025 Q3 营收规模'], ['-¥140.7亿', '2025 Q3 核心商业 OP'], ['-¥160.1亿', '2025 Q3 经调整净利'], ['¥338亿', '2025 Q3 销售营销开支']],
 kpisEn: [['¥95.06B', 'Q3 2025 Revenue'], ['-¥14.07B', 'Q3 2025 Core OP'], ['-¥16.01B', 'Q3 2025 Non-IFRS'], ['¥33.80B', 'Q3 2025 S&M Expense']]
 },
 {
 badge: 'PHASE II · 2026 Q2 · PROFITABILITY INFLECTION',
 titleZh: '盈利转正过渡期：单季营收首破千亿（1,046.4亿），核心 OP 修复至 56.7 亿',
 titleEn: 'Transition Quarter: First ¥100B+ Quarter (¥104.64B) & OP Flip to ¥2.69B',
 descZh: '2026 年 Q2 行业补贴强度边际退坡，美团单季营收同比增长 14.4% 至 1,046.4 亿元，核心本地商业营业利润率先转正至 56.7 亿元（7.9% OPM），集团 GAAP 净利润 21.6 亿元、Non-IFRS 净利 25.2 亿元，外卖单均 UE 修复至约 +0.16 元。',
 descEn: 'In Q2 2026, revenue rose 14.4% YoY to ¥104.64B as Core OP flipped to ¥5.67B (7.9% OPM), GAAP net profit hit ¥2.16B, Non-IFRS hit ¥2.52B, and delivery UE turned positive (~¥0.16/order).',
 kpisZh: [['¥1,046.4亿', '2026 Q2 营收 (+14.4%)'], ['¥56.7亿', '核心商业 OP (7.9% OPM)'], ['¥25.2亿', 'Q2 经调整净利润'], ['-¥17.4亿', 'Q2 新业务营业亏损 (-5.0%)']],
 kpisEn: [['¥104.64B', 'Q2 2026 Revenue (+14.4%)'], ['¥5.67B', 'Core OP (7.9% OPM)'], ['¥2.52B', 'Q2 Non-IFRS Net Profit'], ['-¥1.74B', 'Q2 New Init Loss (-5.0%)']]
 },
 {
 badge: 'PHASE III · 2026 Q3 · FULL INFLECTION & GLOBAL PROFIT',
 titleZh: '拐点全面确认期：营收 ¥1,155.6亿新高，核心利润 +37% 超预期，沙特盈利',
 titleEn: 'Q3 2026 Inflection: Record ¥115.56B Rev, Core OP Beat (+37%), Saudi Profitable',
 descZh: '今日披露的 Q3 2026 业绩确认行业进入理性竞争期：单均补贴降至 1.3–1.4 元、单均 UE 修复至 ~+0.40 元；核心本地商业 OP 达 57.0 亿，新业务亏损收窄至 13.1 亿（-3.5% OPM），Keeta 沙特实现全季盈利。',
 descEn: 'Q3 2026 confirms structural recovery: subsidies halved to ¥1.3–1.4/order, lifting delivery UE to ~+¥0.40. Core OP reached ¥5.70B, New Initiatives narrowed to -¥1.31B (-3.5% OPM), and Keeta Saudi turned profitable.',
 kpisZh: [['¥1,155.6亿', 'Q3 营收 (+21.6% YoY)'], ['¥57.0亿', '核心OP (大超预期 ¥41.5亿)'], ['¥18.5亿', 'Non-IFRS 净利 (含AI投入)'], ['¥1,575亿', '现金及短投储备']],
 kpisEn: [['¥115.56B', 'Q3 Revenue (+21.6% YoY)'], ['¥5.70B', 'Core OP (Beat ¥4.15B est)'], ['¥1.85B', 'Non-IFRS (incl. AI spend)'], ['¥157.5B', 'Cash & Short-Term Inv.']]
 }
 ];

 function renderEra(idx) {
 state.activeEra = idx;
 var er = ERAS[idx] || ERAS[2];
 var en = isEn();
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = en ? er.titleEn : er.titleZh;
 document.getElementById('eraDesc').textContent = en ? er.descEn : er.descZh;
 var kpis = en ? er.kpisEn : er.kpisZh;
 document.getElementById('eraKpis').innerHTML = kpis.map(function (k) {
 return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
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
 var lb = document.getElementById('sideThemeLightBtn'), db = document.getElementById('sideThemeDarkBtn');
 if (lb && db) {
 lb.setAttribute('aria-pressed', String(state.theme === 'light'));
 db.setAttribute('aria-pressed', String(state.theme === 'dark'));
 }
 drawAll();
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

 renderTopo(state.topoMode);
 renderQuad(state.activeQuad);
 renderEra(state.activeEra);
 updateEntropySim();
 refreshAuditChip();
 renderEraLegend();
 drawAll();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 // Switchers
 var topoSwitch = document.getElementById('topoSwitch');
 if (topoSwitch) {
 topoSwitch.addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var bs = topoSwitch.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderTopo(b.getAttribute('data-topo'));
 });
 }
 var quadGrid = document.getElementById('quadGrid');
 if (quadGrid) {
 quadGrid.addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]');
 if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 var cs = quadGrid.querySelectorAll('.cc-quad-card');
 for (var i = 0; i < cs.length; i++) cs[i].classList.toggle('active', cs[i] === card);
 renderQuad(idx);
 });
 }
 var eraTabs = document.getElementById('eraTabs');
 if (eraTabs) {
 eraTabs.addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 var ts = eraTabs.querySelectorAll('.cc-era-tab');
 for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('active', ts[i] === t);
 renderEra(idx);
 });
 }

 // Canvas Helpers
 function prepCanvas(id) {
 var c = document.getElementById(id);
 if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
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
 ctx.strokeStyle = pal.pillBorder;
 ctx.lineWidth = 1;
 ctx.stroke();
 ctx.fillStyle = fgColor;
 ctx.textAlign = 'center';
 ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function renderEraLegend() {
 var leg = document.getElementById('eraLegend');
 if (!leg) return;
 var en = isEn();
 if (state.eView === 'revemp') {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Bars: Quarterly Revenue (RMB B · Q3’24–Q3’26)' : '柱状图：美团季度总营收 (亿元 · 24Q3–26Q3)') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.eraSeries.fcf ? '' : ' muted') + '" data-era-series="fcf"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Core Local OP (RMB B)' : '核心本地商业 OP (亿元)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.eraSeries.rd ? '' : ' muted') + '" data-era-series="rd"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'GAAP Net Profit (RMB B)' : 'GAAP 净利润 (亿元)') + '</span></button>';
 }
 }
 var eraLegendEl = document.getElementById('eraLegend');
 if (eraLegendEl) {
 eraLegendEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-era-series]');
 if (!b) return;
 var k = b.getAttribute('data-era-series');
 state.eraSeries[k] = !state.eraSeries[k];
 if (!state.eraSeries.fcf && !state.eraSeries.rd) state.eraSeries[k] = true;
 renderEraLegend();
 drawEraCanvas();
 });
 }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['24Q3', '25Q2', '25Q3', '26Q1', '26Q2', '26Q3'];

 if (state.eView === 'revemp') {
 var revs = [93.6, 91.8, 95.1, 91.0, 104.6, 115.6];
 var maxV = 130;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + Math.round(gv) + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(42, slot * 0.56);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = (revs[i] / maxV) * ph, yt = pad.top + ph - bh;
 if (state.hover.eraCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 var grad = ctx.createLinearGradient(0, yt, 0, pad.top + ph);
 if (i === 5) { grad.addColorStop(0, '#34D399'); grad.addColorStop(1, pal.green); }
 else if (i === 2) { grad.addColorStop(0, '#FB7185'); grad.addColorStop(1, pal.red); }
 else { grad.addColorStop(0, '#3399FF'); grad.addColorStop(1, pal.blue); }
 ctx.fillStyle = grad;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 drawValueBadge(ctx, '¥' + revs[i].toFixed(1) + 'B', cx, yt - 12, i === 5 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hits.eraCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 28,
 title: y + (en ? ' Total Revenue' : ' 季度总营收'),
 body: en ? ('¥' + revs[i].toFixed(1) + 'B (' + (revs[i]*10).toFixed(0) + '亿元)') : ('人民币 ' + (revs[i]*10).toFixed(1) + ' 亿元')
 });
 });
 } else {
 var coreOp = [14.6, 3.7, -14.1, -3.8, 5.7, 5.7];
 var netP = [12.9, 0.4, -18.6, -6.8, 2.2, 2.1];
 var minV = -22, maxV = 18;
 var yOf = function(v){ return pad.top + (1 - (v - minV)/(maxV - minV)) * ph; };
 [-20, -10, 0, 10, 15].forEach(function (kv) {
 var ky = yOf(kv);
 ctx.strokeStyle = kv === 0 ? pal.blue : pal.grid;
 ctx.lineWidth = kv === 0 ? 1.4 : 1;
 ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText((kv>0?'+':'') + kv + 'B', pad.left - 8, ky + 4);
 });
 var stepX = pw / (yrs.length - 1);
 yrs.forEach(function (lb, idx) {
 var px = pad.left + idx * stepX;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 hits.eraCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: lb + (en ? ' Profitability' : ' 盈利表现'),
 body: (en ? 'Core OP: ' : '核心OP: ') + (coreOp[idx]*10).toFixed(1) + '亿 · GAAP净利: ' + (netP[idx]*10).toFixed(1) + '亿'
 });
 });
 function plot(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: yOf(v), v: v }; });
 ctx.strokeStyle = col; ctx.lineWidth = 2.8;
 drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, state.hover.eraCanvas === idx ? 4.8 : 3.8, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, (pt.v>0?'+':'') + pt.v.toFixed(1) + 'B', pt.x, pt.y - 14, col, pal);
 });
 }
 if (state.eraSeries.fcf) plot(coreOp, pal.green);
 if (state.eraSeries.rd) plot(netP, pal.blue);
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.genomeCanvas = [];
 var pad = { top: 20, right: 64, bottom: 24, left: en ? 156 : 138 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 var peers = [
 { name: en ? 'Meituan Instant' : '美团即时配送', emp: 73.0, gm: 6.50, col: pal.blue },
 { name: en ? 'Taobao Instant' : '淘宝闪购 (估)', emp: 50.0, gm: 6.90, col: pal.amber },
 { name: en ? 'JD Food Delivery' : '京东外卖 (估)', emp: 8.2, gm: 7.20, col: pal.red },
 { name: en ? 'Keeta Brazil (Riders/10k)' : 'Keeta 巴西骑手(万)', emp: 43.0, gm: 6.40, col: pal.green }
 ];
 var isEmp = (state.gView === 'emp');
 var maxX = isEmp ? 82 : 8.5;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.gm;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, bl = (val / maxX) * pw;
 if (state.hover.genomeCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill();
 }
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = idx === 0 ? pal.blue : pal.sub;
 ctx.font = (idx === 0 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isEmp ? (idx===3 ? val+'万' : val.toFixed(1) + 'M/d') : ('¥' + val.toFixed(2)), pad.left + bl + 8, cy + 4);
 hits.genomeCanvas.push({
 idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH,
 title: p.name,
 body: isEmp ? (idx===3 ? ('43万注册骑手 · 32城') : (val + 'M 日均单量估算')) : ('单均履约成本估算 ¥' + val.toFixed(2))
 });
 });
 }

 var entropySeries = [28, 36, 46, 57, 68];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.entropyCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 42 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Q+1', 'Q+2', 'Q+3', 'Q+4', 'Q+5'] : ['Q+1', 'Q+2', 'Q+3', 'Q+4', 'Q+5'];
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

 var maxY = 110;
 var pts = entropySeries.map(function (v, i) {
 return { x: pad.left + (i / 4) * pw, y: pad.top + ph - (Math.max(-10, Math.min(maxY, v)) / maxY) * ph, v: v };
 });

 ctx.save();
 drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph);
 ctx.lineTo(pts[0].x, pad.top + ph);
 ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, 'rgba(0, 115, 230, 0.24)');
 ag.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
 ctx.fillStyle = ag; ctx.fill();
 ctx.restore();

 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();

 var slot = pw / 4;
 pts.forEach(function (pt, i) {
 ctx.fillStyle = i === 4 ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(pt.x, pt.y, state.hover.entropyCanvas === i ? 5.2 : 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '¥' + Math.round(pt.v) + '亿', pt.x, pt.y - 13, i === 4 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lbls[i], pt.x, pad.top + ph + 16);
 hits.entropyCanvas.push({
 idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 title: lbls[i],
 body: (en ? 'Projected Core OP: ¥' : '推演单季核心 OP: ¥') + pt.v.toFixed(1) + '亿'
 });
 });
 }

 function updateEntropySim() {
 var sub = parseFloat(document.getElementById('rngSkus').value);
 var vol = parseInt(document.getElementById('rngExp').value, 10);
 var lev = parseInt(document.getElementById('rngLag').value, 10);
 var en = isEn();
 document.getElementById('valSkus').textContent = '¥' + sub.toFixed(2) + (sub <= 1.4 ? (en ? ' (Rational)' : ' (理性区)') : (en ? ' (War)' : ' (高补贴)'));
 document.getElementById('valExp').textContent = vol + 'M';
 document.getElementById('valLag').textContent = lev + '%';

 var ue = +(1.75 - sub + (vol - 70) * 0.012 + lev * 0.002).toFixed(2);
 var coreOp = +(30.5 + (vol * 1e6 * 91.25 * ue) / 1e8).toFixed(1);
 var newLoss = -13.1 * (1 - lev / 140);
 var grpOp = +(coreOp + newLoss - 15.5).toFixed(1);

 document.getElementById('outSynergy').textContent = (ue >= 0 ? '+¥' : '-¥') + Math.abs(ue).toFixed(2);
 document.getElementById('outVelocity').textContent = '¥' + coreOp.toFixed(1) + '亿';
 document.getElementById('outGmPrem').textContent = '¥' + grpOp.toFixed(1) + '亿';

 entropySeries = [1, 2, 3, 4, 5].map(function (q) {
 return Math.max(0, coreOp * (0.86 + q * 0.055 + (lev / 500)));
 });
 drawEntropyCanvas();
 }
 ['rngSkus', 'rngExp', 'rngLag'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', updateEntropySim);
 });

 function bindSegChart(gid, attr, skey, fn) {
 var g = document.getElementById(gid);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 if (gid === 'eChartTabs') renderEraLegend();
 fn();
 });
 }
 bindSegChart('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
 bindSegChart('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);

 function bindTooltip(cid, redrawFn) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 function handlePtr(clientX, clientY) {
 var r = c.getBoundingClientRect();
 var mx = clientX - r.left, my = clientY - r.top;
 var arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) {
 var rg = arr[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 var nextIdx = hit ? hit.idx : -1;
 if (state.hover[cid] !== nextIdx) { state.hover[cid] = nextIdx; redrawFn(); }
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
 c.addEventListener('mouseleave', function () {
 if (state.hover[cid] !== -1) { state.hover[cid] = -1; redrawFn(); }
 tip.style.display = 'none';
 });
 }
 bindTooltip('eraCanvas', drawEraCanvas);
 bindTooltip('genomeCanvas', drawGenomeCanvas);
 bindTooltip('entropyCanvas', drawEntropyCanvas);

 function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }

 // Quick Jump ⌘K
 var QITEMS_ZH = [
 { id: 'sec-c0', t: 'C0 业绩拐点与履约拓扑', s: '营收 1,155.56亿 (+21.6%) · 核心OP 57.0亿 · 拓扑沙盘' },
 { id: 'sec-c1', t: 'C1 四大增长引擎与损益罗盘', s: '核心商业 / 费用重构 / 小象85城&Keeta / LongCat-2.5 AI' },
 { id: 'sec-c2', t: 'C2 三阶段周期演进工作台', s: '2025 Q3 亏损承压 → 2026 Q2 转正 → 2026 Q3 拐点确认' },
 { id: 'sec-c3', t: 'C3 即时零售竞争光谱与对标', s: '美团 vs 淘宝闪购 vs 京东外卖 vs 抖音本地生活' },
 { id: 'sec-c4', t: 'C4 单均 UE 模拟器与六律核验', s: '单均补贴/单量弹性推演 · 6项财报持续性跟踪核查表' }
 ];
 var QITEMS_EN = [
 { id: 'sec-c0', t: 'C0 Inflection & Fulfillment Topology', s: 'Rev ¥115.56B (+21.6%) · Core OP ¥5.70B · Topology Sandbox' },
 { id: 'sec-c1', t: 'C1 4 Earnings Engines & P&L Dial', s: 'Core Local / S&M -20% / New Init & Keeta / LongCat-2.5 AI' },
 { id: 'sec-c2', t: 'C2 3-Phase Cycle Timeline', s: 'Q3’25 Trough → Q2’26 Flip → Q3’26 Inflection Confirmed' },
 { id: 'sec-c3', t: 'C3 Instant Commerce Competitive Genome', s: 'Meituan vs Taobao IC vs JD Food Delivery vs Douyin' },
 { id: 'sec-c4', t: 'C4 UE Simulator & 6-Law Audit', s: 'Interactive Subsidy/Volume Simulator · 6-Point Checklist' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 if (!qPop) return;
 var q = (kw || '').trim().toLowerCase();
 var src = isEn() ? QITEMS_EN : QITEMS_ZH;
 var m = src.filter(function (x, idx) {
 var z = QITEMS_ZH[idx], e = QITEMS_EN[idx];
 return !q || (z.t + ' ' + z.s + ' ' + e.t + ' ' + e.s).toLowerCase().indexOf(q) !== -1;
 });
 qPop.innerHTML = m.map(function (x) {
 return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
 }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 if (qIn && qPop) {
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
 }
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); }
 });

 // Sidebar Toggle & Scrollspy
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 var secs = document.querySelectorAll('main > section[id]');
 var links = document.querySelectorAll('.mui-nav-link');
 var cur = secs.length ? secs[0].id : '';
 for (var i = 0; i < secs.length; i++) {
 if (secs[i].getBoundingClientRect().top <= 130) cur = secs[i].id;
 }
 for (var j = 0; j < links.length; j++) {
 links[j].classList.toggle('active', links[j].getAttribute('href') === '#' + cur);
 }
 }, { passive: true });

 // Export HTML & Print
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 if (qPop) qPop.classList.remove('open');
 var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a');
 a.href = url;
 a.download = 'Meituan_Q3_2026_Org_OS_Blueprint.html';
 document.body.appendChild(a);
 a.click();
 a.remove();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
 showToast(isEn() ? 'Exported standalone HTML' : '已导出独立 HTML 报告');
 });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

 // Audit Checklist Persistence
 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]');
 var done = 0;
 for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
 var chip = document.getElementById('auditScoreChip');
 if (chip) {
 chip.textContent = isEn() ? ('Moat Audit: ' + done + ' / ' + boxes.length) : ('护城河核验：' + done + ' / ' + boxes.length + ' 项');
 }
 }
 try {
 var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (chk) {
 var k = chk.getAttribute('data-cchk');
 chk.checked = !!savedA[k];
 chk.addEventListener('change', function () {
 savedA[k] = chk.checked;
 try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {}
 refreshAuditChip();
 showToast(isEn() ? (chk.checked ? 'Added to moat audit' : 'Removed from audit') : (chk.checked ? '已勾选该护城河核验项' : '已取消勾选'));
 });
 });
 } catch (e) {}

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {
 applyLang('zh', true);
 }

 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark';
 applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 document.getElementById('sideThemeLightBtn').addEventListener('click', function () {
 applyTheme('light', false);
 try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {}
 });
 document.getElementById('sideThemeDarkBtn').addEventListener('click', function () {
 applyTheme('dark', false);
 try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {}
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (!lb) return;
 var nl = lb.getAttribute('data-lang');
 applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 })();
 