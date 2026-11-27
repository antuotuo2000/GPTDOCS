
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'pdd_mui_theme_v1';
 var STORAGE_LANG_KEY = 'pdd_mui_lang_v1';
 var STORAGE_STRESS_KEY = 'pdd_bm_stress_v1';
 var STORAGE_SIDEBAR_KEY = 'pdd_sidebar_collapsed_v1';

 var TITLE_ZH = '拼多多 PDD Holdings (PDD) Q3 2026 财报与商业模式深度拆解 | 数据中心';
 var TITLE_EN = 'PDD Holdings (PDD) Q3 2026 Earnings & Business Model Deep Dive | Research Hub';

 var state = {
 theme: 'light',
 lang: 'zh',
 activeLens: 0,
 activeNode: 0,
 activeCohort: 'dom',
 pView: 'waterfall',
 cView: 'scissors',
 kView: 'cash',
 profitSeries: { oms: true, ts: true },
 cohortSeries: { sm: true, opm: true },
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
 zh: '2026 年 11 月 19 日拼多多披露 Q3 财报，呈现典型的<strong>“营收承压、利润强韧”分化格局</strong>：单季总营收 <strong>RMB 1,083.4亿元（同比 +0.1%）</strong>，不及市场一致预期，核心症结在于受欧美小包关税与 Temu 半托管模式切换影响，<strong>交易服务收入同比下滑 11.7% 至 RMB 485.2亿</strong>；但国内主站基本盘极其稳健，<strong>在线营销服务收入逆势同比增长 12.1% 至 RMB 598.2亿</strong> <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 官方财报 ↗</a>。更关键的是，公司主动收缩销售及营销费用 <strong>16.6% 至 RMB 253.0亿</strong>（营销费用率降至 23.3%，同比压降 4.7pct），推动 GAAP 营业利润大增 <strong>24.5% 至 RMB 311.6亿（OPM 28.8%）</strong>，Non-GAAP 净利润 <strong>RMB 310.2亿</strong>大幅超越预期（~280亿），叠加账面 <strong>RMB 4,554亿（$679亿）现金及短投</strong>，财报当日股价大涨逾 11%。',
 en: 'Reported Nov 19, 2026, PDD’s Q3 2026 results revealed a sharp <strong>top-line pause vs. bottom-line surge</strong>: total revenue was flat at <strong>RMB 108.34B (+0.1% YoY)</strong>, missing consensus as <strong>transaction services fell 11.7% YoY to RMB 48.52B</strong> under EU/US tariff and Temu semi-managed transition pressure. Yet domestic monetization remained resilient, with <strong>online marketing services growing +12.1% YoY to RMB 59.82B</strong> <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 Release ↗</a>. Crucially, cutting S&amp;M spend by <strong>16.6% YoY to RMB 25.30B</strong> (23.3% ratio, -4.7ppts YoY) lifted GAAP operating profit <strong>+24.5% YoY to RMB 31.16B (28.8% OPM)</strong> and Non-GAAP net income to <strong>RMB 31.02B</strong>, backed by <strong>RMB 455.4B ($67.9B) in cash &amp; ST investments</strong>.'
 },
 m2_caption: {
 zh: '数据来源：<a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">PDD Q3 2026 财报 ↗</a>。注意 Q3 2026 现金流含金量：<strong>经营性现金流（¥430.2亿）高于 GAAP 净利润（¥295.4亿）1.46 倍</strong>，核心源于应付商家款（¥1,119.7亿）与商家保证金（¥189.0亿）构成的负营运资本沉淀。',
 en: 'Source: <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">PDD Q3 2026 Release ↗</a>. Note cash quality: <strong>Operating Cash Flow (RMB 43.02B) is 1.46x GAAP Net Income (RMB 29.54B)</strong>, powered by negative working capital from RMB 111.97B payable to merchants.'
 },
 m3_caption: {
 zh: '历史与季度口径汇总自 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">FY2025 Form 20-F ↗</a> 及 2025–2026 各季 Form 6-K。观察剪刀差拐点：Q1 2026 营销费率 31.8% 对应 OPM 18.4%；至 Q3 2026 营销费率压降至 23.3%，OPM 迅速弹升至 <strong>28.8%</strong>。',
 en: 'Historical data from <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">FY2025 Form 20-F ↗</a> and 2025–2026 Form 6-K filings. Notice the margin inflection: as S&amp;M ratio compressed from 31.8% in Q1 2026 to 23.3% in Q3 2026, GAAP OPM jumped from 18.4% to <strong>28.8%</strong>.'
 },
 m4_caption: {
 zh: '截至 2026-09-30 资产负债表：现金及等价物 ¥1,255.2亿 + 短期投资 ¥3,298.6亿 = <strong>¥4,553.8亿（$679亿）</strong>，若加计受限现金 ¥822.0亿及长期定期存单/债券 ¥1,157.5亿，广义现金类资产达 <strong>¥6,533.3亿（$974亿）</strong>，且资产负债表上<strong>零长期金融借款</strong> <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 资产负债表 ↗</a>。',
 en: 'Balance sheet as of Sep 30, 2026: Cash &amp; equiv RMB 125.52B + ST investments RMB 329.86B = <strong>RMB 455.38B ($67.9B)</strong>; adding restricted cash (RMB 82.20B) and non-current deposits/debt (RMB 115.75B) brings total liquidity to <strong>RMB 653.33B ($97.4B)</strong> with <strong>zero financial debt</strong> <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 Balance Sheet ↗</a>.'
 },
 s1_body: {
 zh: '欧盟自 2026 年 7 月起对小额包裹征收每件 €3 关税、11 月再增 €2 处理费；Sensor Tower 监测显示 Temu 10 月全球 MAU 同比下滑 19%（欧盟下滑 30%–40%），直接导致 Q3 交易服务收入同比跌 11.7% <a class="cite-link" href="https://news.futunn.com/en/post/1005291283/more-headwinds-ahead-decline-in-temu-s-monthly-active-users" target="_blank" rel="noopener noreferrer">行业追踪 ↗</a>。Temu 正加速转向欧洲本地仓/半托管模式，短期压低佣金流水，但可规避直邮关税并提升广告变现。',
 en: 'The EU imposed a €3 tariff per low-value parcel in July 2026 plus a €2 handling fee in November; Sensor Tower shows Temu’s Oct global MAU fell 19% YoY (EU down 30%–40%), dragging Q3 TS revenue -11.7% <a class="cite-link" href="https://news.futunn.com/en/post/1005291283/more-headwinds-ahead-decline-in-temu-s-monthly-active-users" target="_blank" rel="noopener noreferrer">Tracker ↗</a>. Temu’s shift to semi-managed local warehouses lowers TS take-rate near-term but mitigates tariffs.'
 },
 s3_body: {
 zh: 'Q3 末现金及短期投资达 ¥4,554亿（约 $679亿，占总市值逾一半），但现金流量表显示融资活动现金流仍几乎为零——既无分红也无回购，且 Q3 利息与投资净收益同比降至 ¥53.9亿（去年同期 ¥85.7亿）。华尔街在 SOTP 估值中普遍对账面净现金给予 50% 折价，使得拼多多远期 P/E 长期徘徊在 ~7x <a class="cite-link" href="https://hk-official.cmbi.info/upload/33268740-63aa-40c0-9a32-bde60f2f4397.pdf" target="_blank" rel="noopener noreferrer">投行 SOTP 拆解 ↗</a>。',
 en: 'Cash &amp; ST investments reached RMB 455.4B ($67.9B, &gt;50% of market cap), yet financing cash flow remains near zero—no dividends or buybacks—while net interest income fell to RMB 5.39B (vs. 8.57B). Street SOTP models typically apply a 50% discount to net cash, leaving PDD at ~7x forward P/E <a class="cite-link" href="https://hk-official.cmbi.info/upload/33268740-63aa-40c0-9a32-bde60f2f4397.pdf" target="_blank" rel="noopener noreferrer">CMBI SOTP ↗</a>.'
 }
 };

 var LENSES = [
 {
 formulaZh: 'Q3 总营收 (¥1,083.4亿, +0.1%) = 在线营销 (¥598.2亿, +12.1%) + 交易服务 (¥485.2亿, -11.7%)',
 formulaEn: 'Q3 Revenue (¥108.34B, +0.1%) = Online Marketing (¥59.82B, +12.1%) + Transaction Services (¥48.52B, -11.7%)',
 bodyZh: '这是 2024 年以来首次出现“广告营收增速 (+12.1%) 显著跑赢交易服务 (-11.7%)”的剪刀差：国内主站借助全站推广工具与消费性价比趋势保持双位数广告增长；而 Temu 在欧美关税新政下主动从全托管切换至本地仓半托管，导致交易佣金收入短期收缩、部分变现重新流向站内广告。',
 bodyEn: 'For the first time since 2024, ad growth (+12.1%) sharply outperformed transaction services (-11.7%): domestic Pinduoduo monetized value-seeking demand via Whole-Site Promotion ads, while Temu’s shift to semi-managed local fulfillment compressed gross transaction fee recognition.'
 },
 {
 formulaZh: '营业利润暴增 (+24.5% 至 ¥311.6亿) = 毛利率提升 (+1.5pct 至 58.2%) + 营销费率大降 (-4.7pct 至 23.3%)',
 formulaEn: 'Operating Profit Surge (+24.5% to ¥31.16B) = GM Expansion (+1.5ppts to 58.2%) + S&amp;M Ratio Cut (-4.7ppts to 23.3%)',
 bodyZh: '市场此前担忧“千亿扶持”会永久性吞噬利润率，但 Q3 证明拼多多拥有极强的费用调节阀：销售费用同比减少 50.3 亿元，在研发投入逆势大增 16.8% 至 50.6 亿元的前提下，Non-GAAP 营业利润率仍冲上 30.1%。',
 bodyEn: 'Contrary to fears that the RMB 100B Merchant Support program would permanently crush margins, PDD cut S&amp;M by RMB 5.03B while lifting R&amp;D +16.8% YoY to RMB 5.06B—proving strong earnings elasticity at a 30.1% Non-GAAP OPM.'
 },
 {
 formulaZh: '企业价值锚点 = 总市值 (~$1,180亿) - 现金及短投 ($679亿) - 长期定存资产 ($173亿) → 主业隐含估值仅 ~3x–4x 营业利润',
 formulaEn: 'EV Anchor = Market Cap (~$118B) - Cash &amp; ST Inv ($67.9B) - LT Deposits ($17.3B) → Implied Core EV/OP ~3x–4x',
 bodyZh: '账面广义现金类资产高达 RMB 6,533亿且零有息负债，单季经营现金流 ¥430.2亿。但由于公司坚持“不分红、不回购、重仓供应链”，资本市场对账面现金施加了巨额折价——一旦未来开启资本回报或 Temu 半托管跑通，估值修复弹性极大。',
 bodyEn: 'With RMB 653.3B in total liquidity, zero debt, and RMB 43.0B quarterly OCF, PDD’s core business trades at an implied ~3–4x operating profit—priced for skepticism over zero capital returns and Temu tariff friction.'
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
 badge: 'NODE 01 · 100B SUPPORT & SUPPLY-CHAIN DEEPENING',
 titleZh: '千亿扶持“新十年高质量发展”一周年：从商家减负转向全产业链数智化',
 titleEn: '100B Support Program Year 1: Shifting to Full Supply-Chain Digitization',
 descZh: '2026 Q3 是拼多多“新十年高质量发展”战略推进满一周年。管理层将“千亿扶持”从早期的技术服务费退返、偏远地区包邮兜底，纵深推进至产业带研发数据中心与“三年再造拼多多”自营品牌合作。Q3 研发费用大增 16.8% 至 RMB 50.6亿，固定资产净额由年初 13.1亿增至 63.5亿。',
 descEn: 'Marking one year of its "High-Quality Development" strategy, PDD extended its RMB 100B support beyond fee rebates into industrial-belt data centers and 1P brand partnerships. R&amp;D rose 16.8% YoY to RMB 5.06B while net PP&amp;E climbed from RMB 1.31B to 6.35B.',
 formulaZh: '商业传导：产业带白牌数智升级 + 售后兜底降低商家损耗 → 提升平台优质供给密度与用户复购率',
 formulaEn: 'Value Flow: Industrial-belt digitization + after-sales support → higher quality supply density &amp; buyer retention',
 kpisZh: [['¥50.6亿', 'Q3 研发费用 (+16.8% YoY)'], ['¥140.4亿', '9M 2026 累计研发 (+22.1%)'], ['¥63.5亿', '期末固定资产净额 (年初 ¥13.1亿)'], ['2,000万+', 'Q3 西藏抗震救灾现金捐赠']],
 kpisEn: [['¥5.06B', 'Q3 R&amp;D Expense (+16.8% YoY)'], ['¥14.04B', '9M 2026 R&amp;D (+22.1% YoY)'], ['¥6.35B', 'Net PP&amp;E (vs. ¥1.31B Dec 25)'], ['¥20M', 'Q3 Tibet Disaster Relief Donations']]
 },
 {
 badge: 'NODE 02 · S&M DISCIPLINE & ALGO TRAFFIC EFFICIENCY',
 titleZh: '主动控费：销售及营销费用同比大降 16.6%，费率创近年新低 23.3%',
 titleEn: 'S&amp;M Discipline: Marketing Spend Cut 16.6% YoY to 23.3% Ratio',
 descZh: '面对海外关税波动与国内消费环境，拼多多在 Q3 展现出极强的ROI纪律：销售及营销费用从去年同期的 RMB 303.2亿压降至 253.0亿，单季节省逾 50 亿元；营销费用率从 28.0% 降至 23.3%（较 Q1 2026 的 31.8% 骤降 8.5 个百分点），证明国内百亿补贴与日常流量已形成高复购心智惯性。',
 descEn: 'Facing overseas tariff uncertainty, PDD exercised strict ROI discipline: S&amp;M spend dropped from RMB 30.32B to 25.30B (-16.6% YoY), compressing the S&amp;M ratio from 28.0% to 23.3% (-8.5ppts vs. Q1 2026), proving strong organic mindshare retention.',
 formulaZh: '商业传导：百亿补贴心智固化 + 海外买量主动收缩 → 营销费率 -4.7pct → 直接释放 RMB 50亿+ 营业利润弹性',
 formulaEn: 'Value Flow: Organic mindshare + disciplined overseas UA → -4.7ppts S&amp;M ratio → RMB 5B+ OP expansion',
 kpisZh: [['¥253.0亿', 'Q3 销售与营销费用 (-16.6%)'], ['23.3%', 'Q3 营销费用率 (同比 -4.7pct)'], ['¥319.3亿', 'Q3 总营业费用 (-12.3% YoY)'], ['28.8%', 'Q3 GAAP 营业利润率 (+5.7pct)']],
 kpisEn: [['¥25.30B', 'Q3 S&amp;M Expense (-16.6% YoY)'], ['23.3%', 'Q3 S&amp;M Ratio (-4.7ppts YoY)'], ['¥31.93B', 'Total OpEx (-12.3% YoY)'], ['28.8%', 'GAAP Operating Margin (+5.7ppts)']]
 },
 {
 badge: 'NODE 03 · ONLINE MARKETING SERVICES (OMS) ENGINE',
 titleZh: '在线营销收入 ¥598.2亿 (+12.1%)：高毛利广告基本盘重回第一大引擎',
 titleEn: 'Online Marketing (¥59.82B, +12.1%): High-Margin Ad Engine Reclaims #1 Share',
 descZh: 'Q3 在线营销服务及其他收入同比增长 12.1% 至 RMB 598.2亿（占总营收 55.2%，超越预期约 6%）。一方面受益于国内全站推广（ROI 确定性竞价）提升商家货币化效率；另一方面 Temu 半托管商家在本地仓模式下更依赖站内付费推广获取曝光，将部分佣金转化为高毛利广告收入。',
 descEn: 'OMS revenue grew 12.1% YoY to RMB 59.82B (55.2% of total sales, ~6% above consensus), powered by domestic Whole-Site Promotion ROI tools and Temu semi-managed merchants shifting spend toward sponsored ad placements.',
 formulaZh: '商业传导：高活跃买家池 × 全站推广算法竞价 → OMS 占总营收升至 55.2% → 驱动综合毛利率升至 58.2%',
 formulaEn: 'Value Flow: High buyer liquidity × algorithmic ad bidding → OMS reaches 55.2% mix → lifts GM to 58.2%',
 kpisZh: [['¥598.2亿', 'Q3 在线营销收入 (+12.1% YoY)'], ['55.2%', '占 Q3 总营收比重 (重回第一)'], ['58.2%', 'Q3 集团综合毛利率 (+1.5pct)'], ['¥1,673.9亿', '9M 2026 累计在线营销 (+6.1%)']],
 kpisEn: [['¥59.82B', 'Q3 OMS Revenue (+12.1% YoY)'], ['55.2%', 'Share of Q3 Total Revenue'], ['58.2%', 'Consolidated Gross Margin (+1.5ppts)'], ['¥167.39B', '9M 2026 OMS Revenue (+6.1%)']]
 },
 {
 badge: 'NODE 04 · TRANSACTION SERVICES & TEMU SEMI-MANAGED PIVOT',
 titleZh: '交易服务 ¥485.2亿 (-11.7%)：关税逆风与半托管模式切换的阵痛期',
 titleEn: 'Transaction Services (¥48.52B, -11.7%): Tariff &amp; Semi-Managed Transition',
 descZh: 'Q3 交易服务收入同比下滑 11.7% 至 RMB 485.2亿（环比 Q2 的 547.4亿亦回落 11.4%）。核心原因在于美国及欧盟（2026年7月起征 €3 小包关税）收紧直邮免税政策，Temu 加速引导商家转向海外本地仓“半托管”模式，降低了单笔全托管履约与佣金收入确认口径。',
 descEn: 'Transaction services fell 11.7% YoY to RMB 48.52B (-11.4% QoQ vs. 54.74B in Q2). Tightening US/EU de minimis rules (including the EU’s July 2026 €3 parcel tariff) accelerated Temu’s pivot toward local semi-managed fulfillment, reducing gross fee recognition.',
 formulaZh: '商业传导：直邮小包关税壁垒 → 全托管转半托管本地仓 → 交易服务收入短期承压，但履约成本同步下降 3.4%',
 formulaEn: 'Value Flow: De minimis tariffs → full-to-semi-managed shift → lower TS revenue, offset by -3.4% cost of revenues',
 kpisZh: [['¥485.2亿', 'Q3 交易服务收入 (-11.7% YoY)'], ['44.8%', '占 Q3 总营收比重'], ['¥452.4亿', 'Q3 营业成本 (同比降 3.4%)'], ['¥1,595.4亿', '9M 2026 累计交易服务 (+6.2%)']],
 kpisEn: [['¥48.52B', 'Q3 TS Revenue (-11.7% YoY)'], ['44.8%', 'Share of Q3 Total Revenue'], ['¥45.24B', 'Cost of Revenues (-3.4% YoY)'], ['¥159.54B', '9M 2026 TS Revenue (+6.2%)']]
 },
 {
 badge: 'NODE 05 · NEGATIVE WORKING CAPITAL & RMB 455.4B CASH VAULT',
 titleZh: '负营运资本机器 + 零有息负债：单季造血 ¥430亿，现金及短投达 ¥4,554亿',
 titleEn: 'Negative Working Capital + Zero Debt: ¥43.0B Q3 OCF &amp; ¥455.4B Cash Vault',
 descZh: '截至 2026 年 9 月 30 日，拼多多现金、现金等价物及短期投资高达 RMB 4,553.8亿（$679亿），另有受限现金 822.0亿及长期定存/债券 1,157.5亿。凭借 1,119.7亿应付商家款与 189.0亿商家保证金，公司几乎无需自有资金垫付周转，Q3 单季经营性现金流达 430.2亿元。',
 descEn: 'As of Sep 30, 2026, PDD held RMB 455.38B ($67.9B) in cash &amp; ST investments, plus RMB 82.20B restricted cash and RMB 115.75B non-current deposits/debt. Backed by RMB 111.97B merchant payables and zero financial debt, Q3 OCF reached RMB 43.02B.',
 formulaZh: '商业传导：先收买家货款后结商家账期 → Q3 OCF ¥430.2亿 (净利 1.46 倍) → 零债务现金堡垒筑底估值下限',
 formulaEn: 'Value Flow: Buyer prepayment before merchant settlement → ¥43.02B Q3 OCF (1.46x NI) → Fortress balance sheet',
 kpisZh: [['¥4,553.8亿', '现金、等价物及短期投资 ($67.9B)'], ['¥6,533.3亿', '含受限现金及长期定存广义现金'], ['¥430.2亿', 'Q3 经营性现金流 (净利 1.46x)'], ['¥0', '长短期有息金融借款']],
 kpisEn: [['¥455.38B', 'Cash &amp; ST Investments ($67.9B)'], ['¥653.33B', 'Total Liquidity incl. Restricted/LT'], ['¥43.02B', 'Q3 Operating Cash Flow (1.46x NI)'], ['¥0', 'Financial Debt on Balance Sheet']]
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
 dom: {
 statsZh: [
 ['板块定位', '拼多多国内主站 (核心利润牛)', '贡献绝大部分营业利润与自由现金流'],
 ['核心变现来源', '在线营销服务 +12.1% YoY', 'Q3 单季录得 RMB 598.2亿（含少量海外广告）'],
 ['投行 SOTP 估值参考', '$92.2 / ADS (10x 26E PE)', '招银国际测算 2026E 主站营业利润 ¥1,163亿'],
 ['核心竞争优势', '性价比心智 + 千亿扶持供应链', '在消费分级背景下持续吸纳品牌与白牌预算']
 ],
 statsEn: [
 ['Segment Role', 'Pinduoduo Main App (Core Cash Cow)', 'Generates vast majority of OP &amp; FCF'],
 ['Primary Monetization', 'Online Marketing +12.1% YoY', 'Q3 OMS reached RMB 59.82B'],
 ['Street SOTP Anchor', '$92.2 / ADS (10x 26E PE)', 'CMBI est. 2026E main app OP RMB 116.3B'],
 ['Core Moat', 'Value Mindshare + 100B Support', 'Captures both branded &amp; white-label ad budgets']
 ],
 noteZh: '<strong>国内主站基本盘稳如磐石：</strong>尽管国内电商存量竞争白热化（阿里加码即时零售、京东发力外卖），拼多多通过“千亿扶持”稳定商家生态、减少无序内卷，使主站广告收入在 Q3 逆势加速至 +12.1%，依然是全集团最具确定性的印钞机 <a class="cite-link" href="https://hk-official.cmbi.info/upload/33268740-63aa-40c0-9a32-bde60f2f4397.pdf" target="_blank" rel="noopener noreferrer">招银国际研报 ↗</a>。',
 noteEn: '<strong>Domestic Core Resilience:</strong> Amid fierce domestic rivalry, PDD’s RMB 100B merchant support stabilized its seller base and lifted Q3 OMS growth to +12.1% YoY—remaining the group’s highest-certainty profit engine <a class="cite-link" href="https://hk-official.cmbi.info/upload/33268740-63aa-40c0-9a32-bde60f2f4397.pdf" target="_blank" rel="noopener noreferrer">CMBI Note ↗</a>.'
 },
 temu: {
 statsZh: [
 ['板块定位', 'Temu 全球跨境平台 (战略调整期)', '正从直邮全托管转向本地仓半托管'],
 ['Q3 压力信号', '交易服务 -11.7% YoY / MAU -19%', '欧盟 €3+€2 关税冲击直邮小包流量'],
 ['投行 SOTP 估值参考', '$17.6 / ADS (1.0x 26E PS)', '市场已几乎按微利/平价期权计价'],
 ['战略破局点', '本地合规仓 + 欧洲/拉美多元化', '减少对单一关税通道依赖，广告化变现']
 ],
 statsEn: [
 ['Segment Role', 'Temu Global (Strategic Transition)', 'Pivoting from full-managed to local semi-managed'],
 ['Q3 Pressure Points', 'TS -11.7% YoY / Oct MAU -19%', 'EU €3+€2 parcel tariffs hit cross-border volume'],
 ['Street SOTP Anchor', '$17.6 / ADS (1.0x 26E PS)', 'Priced conservatively near option value'],
 ['Strategic Pivot', 'Local Warehouses &amp; Compliance', 'Reduces tariff exposure &amp; shifts revenue to ads']
 ],
 noteZh: '<strong>Temu 的“换挡阵痛”：</strong>Q3 财报最受关注的变量正是交易服务下滑 11.7%。随着欧盟 7 月落地 €3 小包税、11 月加收 €2 处理费，Temu 主动收缩低效海外投放并推进半托管本地仓建设，短期牺牲了账面 GMV 与佣金流速，但显著改善了集团整体亏损拖累与合规韧性。',
 noteEn: '<strong>Temu’s Transition Pain:</strong> The -11.7% YoY drop in transaction services reflects EU €3/€2 parcel fees and Temu’s deliberate pullback in overseas ad burn while onboarding local semi-managed warehouses—trading near-term top-line speed for better unit compliance.'
 },
 grocery: {
 statsZh: [
 ['板块定位', '多多买菜 + “三年再造”自营品牌', '高频生鲜网格仓与产业带深度直连'],
 ['基础设施投入', '固定资产净额跃升至 ¥63.5亿', '较 2025 年末 ¥13.1亿增长近 3.9 倍'],
 ['投行 SOTP 估值参考', '$3.6 / ADS (1.0x 26E PS)', '作为高频流量入口与农研落地场景'],
 ['长期战略意义', '农业数智化与品牌化跃迁', '打通“制造能力 → 全球品牌”链路']
 ],
 statsEn: [
 ['Segment Role', 'Duoduo Grocery + 1P Brand Initiative', 'High-frequency grid warehouses &amp; C2M'],
 ['CapEx Step-Up', 'Net PP&amp;E rose to RMB 6.35B', 'Up ~3.9x from RMB 1.31B at end-2025'],
 ['Street SOTP Anchor', '$3.6 / ADS (1.0x 26E PS)', 'High-frequency retention &amp; agri-tech anchor'],
 ['Long-Term Goal', 'Supply-Chain &amp; Brand Upgrade', 'Transforming factory capacity into global brands']
 ],
 noteZh: '<strong>“重仓供应链”的新十年底座：</strong>联席 CEO 陈磊与赵佳臻在 Q3 财报中反复强调“在供应链上下笨功夫”。多多买菜已沉淀出覆盖全国的冷链网格仓体系，而“三年再造拼多多”正联合产业带商家试水自营品牌业务，为下一个十年筑造跨周期的实物供应链壁垒。',
 noteEn: '<strong>Heavy Supply-Chain Bet:</strong> Co-CEOs Lei Chen and Jiazhen Zhao emphasized long-term supply-chain investments in Q3—leveraging Duoduo Grocery’s fulfillment grid and scaling 1P brand collaborations with industrial-belt manufacturers.'
 }
 };

 function renderCohort(key) {
 state.activeCohort = key || 'dom';
 var c = COHORTS[state.activeCohort] || COHORTS.dom;
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
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Q3 2026 P&amp;L Bridge (RMB B): OMS + TS → Gross Profit → OP → Net Income → OCF' : 'Q3 2026 价值转化桥 (RMB 亿)：在线营销 + 交易服务 → 毛利 → 营业利润 → 净利 → 经营现金流') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.profitSeries.oms ? '' : ' muted') + '" data-p-series="oms"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Online Marketing (RMB B)' : '在线营销收入 (RMB B)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.ts ? '' : ' muted') + '" data-p-series="ts"><span class="legend-dot" style="background:var(--mui-warning-main);"></span><span>' + (en ? 'Transaction Services (RMB B)' : '交易服务收入 (RMB B)') + '</span></button>';
 }
 }

 var pLegEl = document.getElementById('profitLegend');
 if (pLegEl) {
 pLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-p-series]');
 if (!b) return;
 var k = b.getAttribute('data-p-series');
 state.profitSeries[k] = !state.profitSeries[k];
 if (!state.profitSeries.oms && !state.profitSeries.ts) state.profitSeries[k] = true;
 renderProfitLegend();
 drawProfitCanvas();
 });
 }

 function renderCohortLegend() {
 var leg = document.getElementById('cohortLegend');
 if (!leg) return;
 var en = isEn();
 if (state.cView === 'scissors') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.cohortSeries.sm ? '' : ' muted') + '" data-c-series="sm"><span class="legend-dot" style="background:var(--mui-warning-main);"></span><span>' + (en ? 'S&amp;M Expense Ratio (%)' : '销售与营销费用率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.opm ? '' : ' muted') + '" data-c-series="opm"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'GAAP Operating Margin (%)' : 'GAAP 营业利润率 (%)') + '</span></button>';
 } else {
 leg.innerHTML =
 '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Bars: Annual Revenue (RMB B)' : '柱体：年度/TTM 总营收 (RMB B)') + '</span>' +
 '<span class="mui-chip mui-chip-success mono">' + (en ? 'Line: Net Income (RMB B)' : '折线：年度/TTM 净利润 (RMB B)') + '</span>';
 }
 }

 var cLegEl = document.getElementById('cohortLegend');
 if (cLegEl) {
 cLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-c-series]');
 if (!b) return;
 var k = b.getAttribute('data-c-series');
 state.cohortSeries[k] = !state.cohortSeries[k];
 if (!state.cohortSeries.sm && !state.cohortSeries.opm) state.cohortSeries[k] = true;
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
 { lbl: en ? 'OMS Ads' : '在线营销', val: 59.82, base: 0, col: pal.blue, tip: en ? 'Q3 2026 Online Marketing Services: RMB 59.82B (+12.1% YoY, 55.2% of revenue)' : 'Q3 2026 在线营销服务及其他: ¥598.2亿 (同比 +12.1%，占总营收 55.2%)' },
 { lbl: en ? '+Trans. Svc' : '+交易服务', val: 48.52, base: 59.82, col: pal.amber, tip: en ? 'Q3 2026 Transaction Services: RMB 48.52B (-11.7% YoY), lifting total sales to RMB 108.34B' : 'Q3 2026 交易服务收入: ¥485.2亿 (同比 -11.7%)，合计总营收 ¥1,083.4亿' },
 { lbl: en ? 'Gross Profit' : '=总毛利', val: 63.10, base: 0, col: pal.violet, tip: en ? 'Q3 2026 Gross Profit: RMB 63.10B (58.2% GM, +1.5ppts YoY)' : 'Q3 2026 毛利额: ¥631.0亿 (毛利率 58.2%，同比 +1.5pct)' },
 { lbl: en ? 'Op Profit' : '营业利润', val: 31.16, base: 0, col: pal.blue, tip: en ? 'Q3 2026 GAAP Operating Profit: RMB 31.16B (+24.5% YoY, 28.8% OPM; Non-GAAP 30.1%)' : 'Q3 2026 GAAP 营业利润: ¥311.6亿 (同比 +24.5%，OPM 28.8%；Non-GAAP 30.1%)' },
 { lbl: en ? 'Net Income' : 'GAAP净利', val: 29.54, base: 0, col: pal.green, tip: en ? 'Q3 2026 GAAP Net Income: RMB 29.54B (+0.7% YoY); Non-GAAP RMB 31.02B' : 'Q3 2026 GAAP 归母净利润: ¥295.4亿 (+0.7% YoY)；Non-GAAP 净利 ¥310.2亿' },
 { lbl: en ? 'Op Cash Flow' : '经营现金流', val: 43.02, base: 0, col: pal.green, tip: en ? 'Q3 2026 Operating Cash Flow: RMB 43.02B (1.46x GAAP Net Income)' : 'Q3 2026 经营性现金流: ¥430.2亿 (约为 GAAP 净利润的 1.46 倍)' }
 ];
 var maxV = 122;
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
 var bh = Math.max(4, yBot - yTop);
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
 var qs = ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'];
 var oms = [48.72, 55.70, 53.35, 60.00, 49.94, 57.60, 59.82];
 var ts = [46.95, 48.30, 54.93, 63.91, 56.29, 54.70, 48.52];
 var minM = 40, maxM = 70;
 for (var m = 0; m <= 3; m++) {
 var mv = minM + ((maxM - minM) / 3) * m, my = pad.top + ph - (m / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + mv.toFixed(0) + 'B', pad.left - 8, my + 4);
 }
 var stepX = pw / (qs.length - 1);
 qs.forEach(function (q, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.profitCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(q, px, pad.top + ph + 20);
 hitRegions.profitCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: q + (en ? ' Revenue Engines' : ' 双引擎营收'),
 body: (en ? 'Online Marketing: ¥' : '在线营销: ¥') + oms[idx].toFixed(2) + 'B · ' + (en ? 'Transaction Svc: ¥' : '交易服务: ¥') + ts[idx].toFixed(2) + 'B'
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
 if (idx === qs.length - 1 || idx === 0 || isHov) {
 drawValueBadge(ctx, '¥' + pt.v.toFixed(1) + 'B', pt.x, pt.y - 13, col, pal);
 }
 });
 }
 if (state.profitSeries.oms) plotLine(oms, pal.blue, 'rgba(0, 115, 230, 0.16)');
 if (state.profitSeries.ts) plotLine(ts, pal.amber, 'rgba(217, 119, 6, 0.14)');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 24, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'scissors') {
 var qs = ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'];
 var smArr = [34.9, 26.2, 28.0, 26.0, 31.8, 26.4, 23.3];
 var opmArr = [16.8, 24.8, 23.1, 22.4, 18.4, 24.7, 28.8];
 var minP = 10, maxP = 40;
 for (var g = 0; g <= 3; g++) {
 var gv = minP + ((maxP - minP) / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv.toFixed(0) + '%', pad.left - 8, gy + 4);
 }
 var stepX = pw / (qs.length - 1);
 qs.forEach(function (lb, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.cohortCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: lb + (en ? ' Margin Scissors' : ' 费率与利润率'),
 body: (en ? 'S&amp;M Ratio: ' : '营销费率: ') + smArr[idx] + '% · ' + (en ? 'GAAP OPM: ' : '营业利润率: ') + opmArr[idx] + '%'
 });
 });
 function drawCurve(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - ((v - minP) / (maxP - minP)) * ph, v: v }; });
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
 if (idx === 0 || idx === qs.length - 1 || isHov) drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.cohortSeries.sm) drawCurve(smArr, pal.amber, 'rgba(217, 119, 6, 0.14)');
 if (state.cohortSeries.opm) drawCurve(opmArr, pal.green, 'rgba(22, 163, 74, 0.16)');
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'TTM Q3 26'];
 var rev = [130.56, 247.64, 393.84, 431.85, 450.84];
 var ni = [31.54, 60.03, 112.44, 97.84, 93.81];
 var maxR = 500;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxR / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + kv.toFixed(0) + 'B', pad.left - 8, ky + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.48);
 var pts = [];
 yrs.forEach(function (y, idx) {
 var cx = pad.left + idx * slot + slot / 2;
 var rh = (rev[idx] / maxR) * ph;
 if (state.hover.cohortCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + idx * slot + 4, pad.top, slot - 8, ph, 7); ctx.fill();
 }
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw / 2, pad.top + ph - rh, bw, rh, 6); ctx.fill();
 drawValueBadge(ctx, '¥' + rev[idx].toFixed(0) + 'B', cx, pad.top + ph - rh - 12, pal.blue, pal);
 pts.push({ x: cx, y: pad.top + ph - (ni[idx] / maxR) * ph, v: ni[idx] });
 ctx.fillStyle = pal.sub; ctx.font = '600 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 idx: idx, x: pad.left + idx * slot, y: pad.top, w: slot, h: ph + 26,
 title: y,
 body: (en ? 'Revenue: ¥' : '总营收: ¥') + rev[idx].toFixed(1) + 'B · ' + (en ? 'Net Income: ¥' : '净利润: ¥') + ni[idx].toFixed(1) + 'B'
 });
 });
 ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 2 || idx === 4 || state.hover.cohortCanvas === idx) {
 drawValueBadge(ctx, '¥' + pt.v.toFixed(0) + 'B', pt.x, pt.y - 12, pal.green, pal);
 }
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'cash') {
 var cats = [
 { lbl: en ? 'Cash & Equiv' : '现金及等价物', val: 125.52, col: pal.blue, tip: en ? 'Unrestricted Cash & Equivalents: RMB 125.52B ($18.72B)' : '现金及现金等价物: ¥1,255.2亿 ($187.2亿)' },
 { lbl: en ? 'ST Investments' : '短期投资', val: 329.86, col: pal.green, tip: en ? 'Short-term Investments (Deposits & Wealth Products): RMB 329.86B ($49.20B)' : '短期投资 (定期存款及理财): ¥3,298.6亿 ($492.0亿)' },
 { lbl: en ? 'Restricted' : '受限现金', val: 82.20, col: pal.amber, tip: en ? 'Restricted Cash (Merchant/Escrow): RMB 82.20B ($12.26B)' : '受限现金: ¥822.0亿 ($122.6亿)' },
 { lbl: en ? 'LT Deposits' : '长期存单/债', val: 115.75, col: pal.violet, tip: en ? 'Non-Current Time Deposits & Debt Securities: RMB 115.75B ($17.26B)' : '其他非流动资产 (长期定存/持至到期债券): ¥1,157.5亿 ($172.6亿)' },
 { lbl: en ? 'Fin. Debt' : '有息负债', val: 0.0, col: pal.red, tip: en ? 'Zero Short-Term or Long-Term Financial Debt on Balance Sheet' : '资产负债表上长短期有息金融借款为 ¥0' }
 ];
 var maxC = 380;
 for (var g = 0; g <= 4; g++) {
 var cv = (maxC / 4) * g, cy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, cy); ctx.lineTo(pad.left + pw, cy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + cv.toFixed(0) + 'B', pad.left - 8, cy + 4);
 }
 var slot = pw / cats.length, bw = Math.min(44, slot * 0.56);
 cats.forEach(function (it, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = Math.max(3, (it.val / maxC) * ph), yTop = pad.top + ph - bh;
 if (state.hover.capitalCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = it.col;
 roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
 drawValueBadge(ctx, '¥' + it.val.toFixed(1) + 'B', cx, yTop - 12, it.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(it.lbl, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: it.lbl, body: it.tip });
 });
 } else {
 var peers = [
 { name: 'PDD (Q3 26 GAAP)', opm: 28.8, col: pal.green, tip: en ? 'PDD Q3 2026 GAAP Operating Margin: 28.8% (Non-GAAP 30.1%)' : '拼多多 Q3 2026 GAAP 营业利润率 28.8% (Non-GAAP 30.1%)' },
 { name: 'Alibaba (Adj. EBITDA)', opm: 14.5, col: pal.blue, tip: en ? 'Alibaba Group Q2 FY27 Adjusted EBITDA Margin: 14.5% (Heavy AI CapEx)' : '阿里巴巴集团 Adj. EBITDA 利润率 14.5% (AI 资本开支承压)' },
 { name: 'MercadoLibre (Q3 26)', opm: 6.3, col: pal.amber, tip: en ? 'MercadoLibre Q3 2026 Operating Margin: 6.3% (Logistics &amp; Credit Provisions)' : 'MercadoLibre Q3 2026 营业利润率 6.3% (物流与信贷拨备投入)' },
 { name: 'JD.com (Q3 26)', opm: 1.7, col: pal.violet, tip: en ? 'JD.com Q3 2026 Group Operating Margin: 1.7% (JD Retail 5.8%)' : '京东集团 Q3 2026 营业利润率 1.7% (京东零售 5.8%)' }
 ];
 var rowH = ph / peers.length;
 peers.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 22, barLen = (it.opm / 34) * (pw * 0.72);
 if (state.hover.capitalCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill();
 }
 ctx.fillStyle = it.col;
 roundRect(ctx, pad.left, cy - bh / 2, barLen, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(it.opm.toFixed(1) + '%', pad.left + barLen + 8, cy + 4);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(it.name, pad.left, cy - 15);
 hitRegions.capitalCanvas.push({ idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH, title: it.name, body: it.tip });
 });
 }
 }

 var simData = { ni: [93.8, 108, 122, 137, 153], rev: [450.8, 484, 520, 559, 600] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.simMiniCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['TTM 26', '2027E', '2028E', '2029E', '2030E'];
 var arr = simData.ni;
 var maxE = Math.max(180, Math.ceil(Math.max.apply(null, arr) * 1.15));
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
 drawValueBadge(ctx, '¥' + pt.v.toFixed(0) + 'B', pt.x, pt.y - 13, (i === 4) ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(yrs[i], pt.x, pad.top + ph + 16);
 hitRegions.simMiniCanvas.push({
 idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 title: yrs[i] + (en ? ' Projected Net Income' : ' 推演净利润'),
 body: (en ? 'Net Income: ¥' : '推演净利: ¥') + pt.v.toFixed(1) + 'B · ' + (en ? 'Revenue: ¥' : '总营收: ¥') + Math.round(simData.rev[i]) + 'B'
 });
 });
 }

 function runSimulator() {
 var gO = parseFloat(document.getElementById('inpOmsCagr').value) / 100;
 var gT = parseFloat(document.getElementById('inpTsCagr').value) / 100;
 var sm = parseFloat(document.getElementById('inpSmRatio').value) / 100;
 document.getElementById('lblOmsCagr').textContent = (gO * 100).toFixed(1) + '%';
 document.getElementById('lblTsCagr').textContent = (gT * 100).toFixed(1) + '%';
 document.getElementById('lblSmRatio').textContent = (sm * 100).toFixed(1) + '%';

 var oms = 227.40, ts = 223.44;
 var niArr = [93.81], revArr = [450.84];
 var opmEnd = 0.27;
 for (var y = 1; y <= 4; y++) {
 oms *= (1 + gO); ts *= (1 + gT);
 var rev = oms + ts;
 var gm = 0.58;
 var opexRatio = sm + 0.062;
 opmEnd = Math.max(0.08, gm - opexRatio);
 var ni = rev * opmEnd * 0.945;
 niArr.push(ni);
 revArr.push(rev);
 }
 var endRev = revArr[4];
 var endNi = niArr[4];
 var mcapRmb = 580.0;
 var impliedPe = endNi > 1 ? (mcapRmb / endNi) : 99;

 document.getElementById('simRevOut').textContent = '¥' + Math.round(endRev) + 'B';
 document.getElementById('simOpmOut').textContent = (opmEnd * 100).toFixed(1) + '%';
 document.getElementById('simNiOut').textContent = '¥' + Math.round(endNi) + 'B';
 document.getElementById('simPeOut').textContent = impliedPe.toFixed(1) + 'x';
 simData.ni = niArr;
 simData.rev = revArr;
 drawSimMiniCanvas();
 }

 ['inpOmsCagr', 'inpTsCagr', 'inpSmRatio'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = { bear: { o: 5.0, t: -4.0, s: 28.0 }, base: { o: 10.0, t: 4.0, s: 25.0 }, bull: { o: 14.0, t: 10.0, s: 23.0 } };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpOmsCagr').value = pr.o;
 document.getElementById('inpTsCagr').value = pr.t;
 document.getElementById('inpSmRatio').value = pr.s;
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
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '¥1,083.4亿营收 · 58.2% 毛利率 · 营业利润 +24.5%' },
 { id: 'mod-pipeline', t: 'M1 五阶价值链传导沙盘', s: '千亿扶持 → 控费 23.3% → 广告 +12.1% → 半托管 → ¥4,554亿现金' },
 { id: 'mod-profit-pool', t: 'M2 Q3 利润瀑布与双引擎拆解', s: 'OMS ¥598.2亿 vs 交易服务 ¥485.2亿 · OCF ¥430.2亿' },
 { id: 'mod-cohort', t: 'M3 三大业务板块与剪刀差', s: '国内主站 vs Temu vs 多多买菜 · 7季度费率剪刀差' },
 { id: 'mod-capital', t: 'M4 现金堡垒与盈利推演器', s: '¥6,533亿广义现金 · 2027–2030E 交互模拟器' },
 { id: 'mod-matrix', t: 'M5 电商巨头对标与风险压测', s: 'PDD vs BABA / JD / AMZN / MELI / SE' }
 ];
 var QUICK_EN = [
 { id: 'mod-deck', t: 'M0 Command Deck &amp; Formula', s: '¥108.34B Rev · 58.2% GM · +24.5% OP Beat' },
 { id: 'mod-pipeline', t: 'M1 5-Node Value-Chain Pipeline', s: '100B Support → 23.3% S&amp;M → +12.1% Ads → Temu → ¥455.4B Cash' },
 { id: 'mod-profit-pool', t: 'M2 Q3 P&amp;L Waterfall &amp; Engines', s: 'OMS ¥59.82B vs. TS ¥48.52B · OCF ¥43.02B' },
 { id: 'mod-cohort', t: 'M3 3-Pillar Segments &amp; Scissors', s: 'Main App vs. Temu vs. Grocery · 7Q Margin Curve' },
 { id: 'mod-capital', t: 'M4 Cash Fortress &amp; Simulator', s: '¥653.3B Liquidity · 2027–2030E Interactive Lab' },
 { id: 'mod-matrix', t: 'M5 E-Commerce Matrix &amp; Stress Audit', s: 'PDD vs. BABA / JD / AMZN / MELI / SE' }
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
 if (e.key === 'Escape') {
 var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sb) sb.classList.remove('open');
 if (bd) bd.classList.remove('open');
 if (qPop) qPop.classList.remove('open');
 }
 });

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
 setTimeout(drawAllCharts, 60);
 }
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

 // Sidebar Reading & Export Tools
 var sideLight = document.getElementById('sideThemeLightBtn'), sideDark = document.getElementById('sideThemeDarkBtn');
 if (sideLight) sideLight.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 if (sideDark) sideDark.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });

 var exportBtn = document.getElementById('exportHtmlBtn');
 if (exportBtn) {
 exportBtn.addEventListener('click', function () {
 var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'PDD_Q3_2026_Earnings_Analysis.html';
 link.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
 showToast(isEn() ? 'Exported HTML report' : '已导出独立 HTML 报告');
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
 showToast(isEn() ? (chk.checked ? 'Added to quarterly watchlist' : 'Removed from watchlist') : (chk.checked ? '已加入季度重点跟踪' : '已取消跟踪标记'));
 });
 });
 } catch (e) {}

 try {
 if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
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
 