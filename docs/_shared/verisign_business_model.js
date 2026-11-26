
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'vrsn_bm_stress_v1';

 var TITLE_ZH = '威瑞信 VeriSign, Inc. (VRSN) 商业模式架构深度拆解 | 数据中心';
 var TITLE_EN = 'VeriSign, Inc. (VRSN) Business Model Architecture Deep Dive | Research Hub';

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
 zh: '威瑞信（VeriSign, Inc., NASDAQ: VRSN）是互联网物理层最隐蔽、却利润率最高的基础设施守门人：公司凭借与 ICANN 签署的排他性注册局协议，独家运营全球商业互联网基石 <strong>.com 与 .net 顶级域</strong>，并运行全球 13 台互联网根服务器中的 2 台（A 根与 J 根）及根区维护职能 <a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">FY25 年报公报 ↗</a>。它不设消费端销售团队，而是通过 GoDaddy 等上千家注册商向全球 <strong>1.825 亿个 .com/.net 域名</strong>按年先收款后确认收入 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 SEC 8-K ↗</a>：FY2025 仅凭 <strong>928 名员工</strong>与 <strong>$2,280 万极低资本开支（营收占比 1.4%）</strong>，即创收 <strong>$16.57 亿</strong>、营业利润 <strong>$11.21 亿（67.7% 营业利润率）</strong> 与 <strong>$10.68 亿自由现金流（净利转化率 129.4%）</strong>，并将超额现金悉数注入股本注销与分红，令巴菲特旗下伯克希尔长期重仓持有 <strong>592 万股（6.6%）</strong> <a class="cite-link" href="https://www.quantisnow.com/insight/amendment-sec-form-schedule-13ga-filed-by-berkshire-hathaway-inc-6795273" target="_blank" rel="noopener noreferrer">SEC 13G/A ↗</a>。',
 en: 'VeriSign, Inc. (NASDAQ: VRSN) is the internet’s quietest, highest-margin infrastructure gatekeeper: under exclusive ICANN registry agreements, it operates the <strong>.com and .net top-level domains</strong>, two of the 13 global root servers (A &amp; J), and the Root Zone Maintainer function <a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">FY25 Release ↗</a>. With zero retail sales force, it bills 1,000+ registrars upfront for <strong>182.5M .com/.net domains</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 SEC 8-K ↗</a>: in FY2025, just <strong>928 employees</strong> and <strong>$22.8M CapEx (1.4% of sales)</strong> produced <strong>$1.657B revenue</strong>, <strong>$1.121B operating income (67.7% OpM)</strong>, and <strong>$1.068B FCF (129.4% net income conversion)</strong>—funding relentless share buybacks and a <strong>5.92M-share (6.6%) Berkshire Hathaway</strong> stake <a class="cite-link" href="https://www.quantisnow.com/insight/amendment-sec-form-schedule-13ga-filed-by-berkshire-hathaway-inc-6795273" target="_blank" rel="noopener noreferrer">SEC 13G/A ↗</a>.'
 },
 m2_caption: {
 zh: '数据来源：<a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">VeriSign FY2025 财报 ↗</a> 与 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 SEC 8-K ↗</a>。注意威瑞信极罕见的财务特征：<strong>自由现金流（$1,068.3M）常年高于 GAAP 净利润（$825.7M）</strong>（转化率高达 129.4%），源于预收多年期域名注册费带来的递延收入净流入与极轻资本开支。',
 en: 'Sources: <a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">VeriSign FY2025 Release ↗</a> &amp; <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 SEC 8-K ↗</a>. Remarkably, <strong>Free Cash Flow ($1,068.3M) consistently exceeds GAAP Net Income ($825.7M)</strong> (129.4% conversion) due to multi-year prepaid deferred revenue and ultra-low CapEx.'
 },
 m3_caption: {
 zh: '行业数据基准：<a class="cite-link" href="https://blog.verisign.com/domain-names/q3-2026-domain-name-industry-brief-quarterly-report/" target="_blank" rel="noopener noreferrer">Q3 2026 DNIB 行业简报 ↗</a>。全球域名总注册量达 4.116 亿个，威瑞信 .com/.net 占约 44.3% 基数，却因无营销补贴与超高毛利率攫取全球域名注册局逾 75% 的营业利润池。',
 en: 'Industry Benchmark: <a class="cite-link" href="https://blog.verisign.com/domain-names/q3-2026-domain-name-industry-brief-quarterly-report/" target="_blank" rel="noopener noreferrer">Q3 2026 DNIB Report ↗</a>. Out of 411.6M global domains, VeriSign’s .com/.net hold ~44.3% unit share yet capture &gt;75% of global registry operating profits.'
 },
 m4_caption: {
 zh: '资本配置奇迹：截至 Q3 2026，威瑞信账面递延收入高达 <strong>$1,463.3M</strong>（其中短期 $1,094.4M、长期 $368.9M），总资产仅 $1,280.1M 却支撑 $1.76B 营收；因累计回购金额远超留存收益，账面呈现 <strong>-$(2,284.7)M 负股东权益</strong>，摊薄股本由 2013 年约 1.55 亿股缩减至 Q3 2026 的 <strong>8,980 万股</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 资产负债表 ↗</a>。',
 en: 'Capital Miracle: As of Q3 2026, deferred revenue reached <strong>$1,463.3M</strong> ($1,094.4M current, $368.9M long-term) on just $1,280.1M total assets. Cumulative buybacks created <strong>-$(2,284.7)M stockholders’ deficit</strong> while shrinking shares outstanding from ~155M (2013) to <strong>89.8M in Q3 2026</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 Balance Sheet ↗</a>.'
 },
 s1_body: {
 zh: '威瑞信的 .com 提价权直接受制于 ICANN 协议与美国商务部 NTIA 合作协议（现行周期至 2030 年，允许后四年每年最高提价 7%）<a class="cite-link" href="https://domainnamewire.com/2024/11/27/verisign-inks-com-contract-extension-with-icann/" target="_blank" rel="noopener noreferrer">ICANN 续约记录 ↗</a>。若消费者倡导组织或监管机构在 2030 年压低提价上限，利润增速将回归纯域名量增（3%–6%）。',
 en: 'VeriSign’s .com pricing power is governed by ICANN and US DOC/NTIA agreements (current cycle runs through 2030 with up to 7% annual hikes in the final four years) <a class="cite-link" href="https://domainnamewire.com/2024/11/27/verisign-inks-com-contract-extension-with-icann/" target="_blank" rel="noopener noreferrer">ICANN Extension ↗</a>. Tighter caps post-2030 would normalize profit growth toward unit volume (3%–6%).'
 },
 s3_body: {
 zh: '威瑞信在 Q3 2026 8-K 风险披露中明确新增“自主 AI 代理与量子计算进展”挑战 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 8-K ↗</a>；FY2026 CapEx 指引由 $22.8M 升至 $55M–$65M，正反映基础设施升级与抗量子/抗 DDoS 扩容投入。',
 en: 'In Q3 2026 8-K risk factors, VeriSign explicitly flagged "autonomous AI agents" and "advances in quantum computing" <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 8-K ↗</a>; FY26 CapEx guidance of $55M–$65M (up from $22.8M) reflects hardware refresh and security hardening.'
 }
 };

 var LENSES = [
 {
 formulaZh: '年经常性收入 = 1.825亿存量域名 × (75.2% 续费率 + 每年 4,000万+ 新注) × $10.97 批发年费 | 销售团队 ≈ 0 人',
 formulaEn: 'Recurring Revenue = 182.5M Base × (75.2% Renewal + 40M+ Gross Adds) × $10.97 Wholesale Fee | Retail Sales Force ≈ 0',
 bodyZh: '几乎所有 SaaS 公司都要把 30%–45% 营收烧在销售与获客上，而威瑞信只需守在互联网根解析层，由 GoDaddy、Namecheap、阿里云等上千家注册商在前端帮它免费获客。<strong>每个域名本质上是一笔数字土地的年度地租</strong>。',
 bodyEn: 'Most SaaS firms spend 30%–45% of revenue on sales &amp; marketing; VeriSign lets 1,000+ registrars (GoDaddy, Namecheap, Alibaba Cloud) acquire customers for free while collecting <strong>an annual digital land tax</strong> at the root.'
 },
 {
 formulaZh: '88.2% 综合毛利率 → 每新增 $1.00 提价收入，仅需 $0.00 边际服务器成本 → 营业利润率稳定在 67%–68%',
 formulaEn: '88.2% Gross Margin → Every $1.00 Price Hike Incurs ~$0.00 Marginal Cost → 67%–68% Operating Margin',
 bodyZh: '全球每天约 8,000 亿次 DNS 解析请求均摊在高度自动化的集群上，边际解析成本趋近于零。因此，2026 年 11 月 .com 批发价从 $10.26 涨至 $10.97（+$0.71/域）几乎 <strong>100% 直接转化为税前营业利润</strong>。',
 bodyEn: 'Handling ~800B daily DNS queries on automated clusters means near-zero marginal cost per domain. Consequently, the Nov 2026 .com hike from $10.26 to $10.97 (+$0.71/domain) flows <strong>nearly 100% to operating income</strong>.'
 },
 {
 formulaZh: 'FCF ($1,068M) &gt; 净利润 ($826M) → 递延收入 $1,463M (无息预收) → 回购注销股本至 89.8M + 季度分红 $0.81',
 formulaEn: 'FCF ($1,068M) &gt; Net Income ($826M) → $1,463M Prepaid Float → Shares Retired to 89.8M + $0.81/sh Dividend',
 bodyZh: '用户注册 1–10 年域名必须预付全款，造就 $14.63 亿递延收入无息浮存金。管理层将 100%+ 自由现金流通过回购（FY25 $8.59亿，9M26 $6.20亿）与股息（$0.81/季）返还股东，形成罕见的<strong>“负股东权益+高EPS复利”</strong>结构。',
 bodyEn: 'Registrants prepay 1–10 years upfront, generating $1.46B in interest-free deferred revenue float. Returning 100%+ of FCF via buybacks ($859M in FY25, $620M in 9M26) and dividends ($0.81/qtr) drives <strong>negative-equity EPS compounding</strong>.'
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
 badge: 'NODE 01 · ICANN FRANCHISE & ROOT SERVER AUTHORITY',
 titleZh: 'ICANN 排他性特许经营权与 29 年+ 100% 零宕机公信力',
 titleEn: 'Exclusive ICANN Franchise & 29+ Years of 100% Availability',
 descZh: '威瑞信与 ICANN 及美国商务部签署的 .com 注册局协议具备“推定续约权”（Presumptive Renewal），只要保持极高技术标准即可无限期延续。截至 2026 年，威瑞信已连续超过 29 年保持 .com/.net DNS 解析 100% 连续可用性，这种零失误纪录是任何新竞争者无法跨越的信任壁垒。',
 descEn: 'VeriSign’s .com Registry Agreement with ICANN carries presumptive renewal as long as strict SLA standards are met. Extending 100% DNS availability for .com and .net past 29 years creates an unassailable reliability moat.',
 formulaZh: '护城河传导：100% 连续解析纪录 + A/J 根服务器运营权 → 法定推定续约权 → 全球商业互联网不可替代单点底座',
 formulaEn: 'Moat Flow: 29+ Yrs 100% Uptime + A/J Root Servers → Presumptive Contract Renewal → Irreplaceable Commercial DNS Spine',
 kpisZh: [['29年+', '.com/.net 100%连续可用性'], ['~8,000亿次', '日均全球 DNS 查询解析量'], ['2 / 13台', '运营全球互联网根服务器 (A/J)'], ['2030年', '现行 .com 合同周期锁定期']],
 kpisEn: [['29+ Years', '100% .com/.net DNS Availability'], ['~800B/day', 'Global DNS Queries Resolved'], ['2 of 13', 'Global Internet Root Servers (A/J)'], ['2030', 'Current .com Contract Term']]
 },
 {
 badge: 'NODE 02 · B2B2C REGISTRAR DISTRIBUTION',
 titleZh: '千家注册商零成本分销网络：自己不养零售销售军团',
 titleEn: '1,000+ Registrar Distribution Mesh: Zero Retail Sales Overhead',
 descZh: '威瑞信不直接向中小企业售卖域名，而是充当“上游批发水厂”，对接 GoDaddy、Namecheap、Cloudflare、阿里云等逾千家 ICANN 认证注册商。所有客户获取、客服工单与营销投放均由注册商承担，使威瑞信仅需 928 名员工即可撬动 $17.6亿 年营收。',
 descEn: 'VeriSign acts purely as an upstream wholesale registry for 1,000+ ICANN-accredited registrars (GoDaddy, Namecheap, Cloudflare, Alibaba). Registrars absorb all CAC and customer support, letting 928 FTEs run a $1.76B franchise.',
 formulaZh: '商业传导：下游注册商免费获客 + 捆绑建站/邮箱销售 → Q3 2026 新注创 1,310 万个纪录 · 存量达 1.825 亿个',
 formulaEn: 'Value Flow: Registrars Fund CAC + Bundle SaaS → Record 13.1M Q3 2026 New Adds · 182.5M Total Base',
 kpisZh: [['182.5M', 'Q3 2026 .com/.net 总基数'], ['13.1M', 'Q3 2026 单季新注册量 (+23.6%)'], ['928人', '全球总员工数 (人效 ~$1.89M)'], ['0人', '消费级零售直销团队编制']],
 kpisEn: [['182.5M', 'Q3 2026 .com/.net Domain Base'], ['13.1M', 'Q3 2026 New Registrations (+23.6%)'], ['928 FTEs', 'Total Workforce (~$1.89M Rev/FTE)'], ['Zero', 'Retail Direct-to-Consumer Sales']]
 },
 {
 badge: 'NODE 03 · CONTRACTED PRICING POWER',
 titleZh: '制度化提价周期：.com 年增 7% 与 .net 年增 10% 的纯利印钞机',
 titleEn: 'Contracted Price Escalators: 7% .com & 10% .net Margin Drop-Through',
 descZh: '根据 ICANN 2020 修订协议，每个六年周期的后四年允许 .com 每年提价最高 7%。2026 年 11 月 1 日首轮提价已正式落地（$10.26 → $10.97），2027–2029 年仍有三次最高 7% 的提价窗口（终值有望达 ~$13.42）；同时 .net 已公告 2027 年 3 月起提价 10% 至 $12.00。',
 descEn: 'Under the 2020 ICANN amendment, .com allows up to 7% annual hikes in the last four years of each 6-year cycle. Round 1 hit Nov 1, 2026 ($10.26 → $10.97) with 3 more hikes through 2029 (~$13.42); .net rises 10% to $12.00 in Mar 2027.',
 formulaZh: '商业传导：1.825亿基数 × $0.71 提价 = 年化新增 ~$1.2亿+ 纯营业利润（几乎无增量成本）',
 formulaEn: 'Value Flow: 182.5M Base × $0.71 Hike ≈ +$120M+ Annualized Operating Profit at Near-Zero Incremental Cost',
 kpisZh: [['$10.97', '2026.11.01 生效 .com 批发价'], ['~$13.42', '2029–2030E .com 理论上限'], ['$12.00', '2027.03.01 生效 .net 批发价'], ['67.7%', 'FY2025 全年营业利润率']],
 kpisEn: [['$10.97', '.com Wholesale Price (Nov 1, 2026)'], ['~$13.42', '2029–2030E .com Contract Cap'], ['$12.00', '.net Wholesale Price (Mar 1, 2027)'], ['67.7%', 'FY2025 Operating Margin']]
 },
 {
 badge: 'NODE 04 · NEGATIVE WORKING CAPITAL FLOAT',
 titleZh: '1–10 年预收账款：$14.63 亿递延收入铸就零成本永续浮存金',
 titleEn: 'Prepaid Deferred Revenue: $1.46B Interest-Free Perpetual Float',
 descZh: '域名注册商必须预付 1 至 10 年的批发注册费后方可在根区生效，威瑞信则按服务期间逐月摊销确认收入。这使资产负债表常年沉淀逾 $14.6 亿递延收入（相当于全年营收的 83%），经营现金流转化率远超 100%（FY25 FCF 占净利 129.4%）。',
 descEn: 'Registrars prepay 1–10 years upfront before zone activation while revenue amortizes ratably. This creates $1,463.3M in deferred revenue (~83% of annual sales), driving FCF conversion above 100% (129.4% of net income in FY25).',
 formulaZh: '商业传导：预收 1–10 年现金 → $14.63亿无息递延负债 → FY25 FCF $10.68亿 > GAAP 净利润 $8.26亿',
 formulaEn: 'Value Flow: 1–10Y Upfront Cash → $1,463.3M Zero-Cost Float → FY25 FCF $1,068.3M > Net Income $825.7M',
 kpisZh: [['$1,463.3M', 'Q3 2026 账面递延收入总额'], ['129.4%', 'FY25 FCF / GAAP 净利润转化率'], ['-$2,285M', 'Q3 2026 负股东权益（极致资本返还）'], ['1.4%', 'FY25 CapEx / 营收资本强度']],
 kpisEn: [['$1,463.3M', 'Q3 2026 Total Deferred Revenue'], ['129.4%', 'FY25 FCF / Net Income Conversion'], ['-$2,285M', 'Q3 2026 Stockholders’ Deficit'], ['1.4%', 'FY25 CapEx / Revenue Intensity']]
 },
 {
 badge: 'NODE 05 · SHARE CANNIBALIZATION & DIVIDEND',
 titleZh: '十三年回购注销超四成股本 + $0.81 季度现金分红双轮回馈',
 titleEn: '13-Year Share Cannibalization + $0.81 Quarterly Dividend Engine',
 descZh: '威瑞信管理层严守资本纪律，拒绝高溢价跨界并购（过去十年清理了全部非核心安全服务），把每年超 10 亿美元自由现金流全部用于二级市场回购注销股票（流通股由 2013 年 ~1.55 亿股降至 Q3 2026 的 8,980 万股），并在 2026 年将季度股息上调至 $0.81/股。',
 descEn: 'Management shuns empire-building M&A, channeling $1B+ annual FCF into relentless share retirement (shrinking shares from ~155M in 2013 to 89.8M in Q3 2026) alongside a $0.81/share quarterly cash dividend.',
 formulaZh: '商业传导：$10.68亿 FCF → 每年回购注销 ~3%–4% 股本 + 股息 → EPS 增速长期显著跑赢营收增速',
 formulaEn: 'Value Flow: $1,068M FCF → ~3%–4% Annual Share Retirement + Dividends → EPS Growth Outpaces Top-Line',
 kpisZh: [['89.8M股', 'Q3 2026 期末普通股流通量'], ['$1.36B', 'Q3 2026 期末剩余回购授权额度'], ['$0.81/季', '2026年上调后季度现金股息'], ['6.6%', '伯克希尔哈撒韦持股比例 (5.92M股)']],
 kpisEn: [['89.8M', 'Q3 2026 Ending Shares Outstanding'], ['$1.36B', 'Remaining Buyback Authorization'], ['$0.81/qtr', '2026 Quarterly Cash Dividend'], ['6.6%', 'Berkshire Hathaway Stake (5.92M)']]
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
 ['域名阶段特征', '首年新注册域名 (如初创/营销站)', 'Q3 2026 单季新增 1,310 万个'],
 ['年度续费率水平', '~50% – 55%', '部分测试/投机域名首年后弃用'],
 ['单域名批发年费', '$10.97 / 年 (2026.11+)', '占企业 IT 预算不足千分之一'],
 ['10年预期累计毛利', '~$32', '过滤后留存者自动晋级为高粘性底座']
 ],
 statsEn: [
 ['Cohort Profile', 'First-Year New Domains', 'Record 13.1M new adds in Q3 2026'],
 ['Year-1 Renewal Rate', '~50% – 55%', 'Speculative/campaign domains churn early'],
 ['Annual Wholesale Fee', '$10.97 / yr (Nov 2026+)', 'Negligible fraction of SMB IT spend'],
 ['10Y Expected Gross Profit', '~$32', 'Survivors graduate to near-zero churn']
 ],
 noteZh: '<strong>首年筛选漏斗：</strong>新注册域名虽然第一年存在约 45%–50% 的自然淘汰，但威瑞信无需为此承担任何营销费用；一旦该域名绑定了企业官网、SSL 证书与员工邮箱，便瞬间进入几乎永不流失的成熟层。',
 noteEn: '<strong>Year-1 Filter Funnel:</strong> While ~45%–50% of brand-new domains drop after Year 1, VeriSign pays $0 CAC for them. Once tied to a live website and corporate email, survivors lock in permanently.'
 },
 core: {
 statsZh: [
 ['域名阶段特征', '已续费 ≥2 年成熟企业域名', '承载企业官网、OA 与企业邮箱'],
 ['年度续费率水平', '85% – 92%+', '整体混合续费率稳定在 75.2%'],
 ['价格弹性特征', '极度刚性（几乎零敏感）', '涨价 $0.71/年 ≈ 每天 0.2 美分'],
 ['10年预期累计毛利', '~$96', '随法定 7% 年提价阶梯持续膨胀']
 ],
 statsEn: [
 ['Cohort Profile', '2+ Year Mature Business Domains', 'Powers corporate web & email MX records'],
 ['Annual Renewal Rate', '85% – 92%+', 'Blended portfolio renewal steady at 75.2%'],
 ['Price Elasticity', 'Near-Zero Elasticity', '+$0.71/yr hike ≈ 0.2 cents per day'],
 ['10Y Expected Gross Profit', '~$96', 'Compounds with contracted 7% escalators']
 ],
 noteZh: '<strong>商业锁定棘轮效应（Ratchet Effect）：</strong>更换一个成熟企业的 .com 主域名意味着重印名片、重构 SEO 权重、全员更换邮箱并承担客户失联风险。<strong>为了省下每年 $10.97 的续费而放弃 .com 在商业上绝无可能</strong>，造就全球最稳固的经常性收入。',
 noteEn: '<strong>The Switching Ratchet:</strong> Changing an established .com means losing SEO equity, breaking every employee email, and confusing customers. <strong>No business risks brand disruption to save $10.97/year</strong>—making renewals near-mandatory.'
 },
 ultra: {
 statsZh: [
 ['域名阶段特征', '头部企业/科技巨头防御矩阵', '单家常批量持有 500–5,000+ 域名'],
 ['年度续费率水平', '>98%', '常采用 5–10 年期一次性预付锁定'],
 ['潜在增值服务延展', '.web 优先保护 + Verisign Informed™', '2027.01 优先期天然转化买家'],
 ['10年单域累计毛利', '$118+ (含多年度预收)', '高度确定的永续企业级现金流']
 ],
 statsEn: [
 ['Cohort Profile', 'Enterprise Brand / AI Portfolios', 'Often hold 500–5,000+ defensive names'],
 ['Annual Renewal Rate', '>98%', 'Frequently prepaid on 5–10 year terms'],
 ['2027 Upsell Synergy', '.web Priority + Verisign Informed™', 'Natural Jan 2027 .web priority buyers'],
 ['10Y Expected Gross Profit', '$118+ (Multi-Yr Prepaid)', 'Utility-grade institutional cash flow']
 ],
 noteZh: '<strong>品牌防御矩阵与 .web 天然红利：</strong>全球 500 强与 AI 独角兽不仅保护核心 .com，还将在 2027 年 1 月 12 日开启的 <strong>.web 优先注册期</strong>批量抢注匹配域名以防商标抢注，为威瑞信带来高确定性的首波高毛利增量。',
 noteEn: '<strong>Defensive Brand Portfolios &amp; .web Upside:</strong> Fortune 500s and AI firms protect core .coms and will be natural buyers during the <strong>Jan 12, 2027 .web Priority Access window</strong> to safeguard trademarks.'
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
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'FY25 P&amp;L Bridge ($M): Revenue → Gross Profit → OpInc → Net → FCF' : 'FY25 价值转化桥 ($M)：营收 → 毛利 → 营业利润 → 净利 → FCF') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.profitSeries.svc ? '' : ' muted') + '" data-p-series="svc"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Gross Margin (%)' : '综合毛利率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.tot ? '' : ' muted') + '" data-p-series="tot"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Operating Margin (%)' : '营业利润率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.profitSeries.prd ? '' : ' muted') + '" data-p-series="prd"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'FCF Margin (%)' : '自由现金流率 (%)') + '</span></button>';
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
 '<button type="button" class="legend-pill' + (state.cohortSeries.ultra ? '' : ' muted') + '" data-c-series="ultra"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Enterprise Portfolio' : '头部品牌防御域名') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.core ? '' : ' muted') + '" data-c-series="core"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Mature Business .com' : '成熟企业官网域名') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.cohortSeries.solo ? '' : ' muted') + '" data-c-series="solo"><span class="legend-dot" style="background:var(--mui-warning-main);"></span><span>' + (en ? 'Year-1 New Cohort' : '首年新注册域名') + '</span></button>';
 } else {
 leg.innerHTML =
 '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Light Bar: Global Domain Share (%)' : '浅色柱：全球域名基数份额 (%)') + '</span>' +
 '<span class="mui-chip mui-chip-success mono">' + (en ? 'Solid Bar: Est. Registry Profit Share (%)' : '深色柱：全球注册局营业利润份额 (%)') + '</span>';
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
 var pad = { top: 28, right: 20, bottom: 42, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: en ? 'Revenue' : '总营收', val: 1656.6, base: 0, col: pal.blue, tip: en ? 'FY25 Total Revenue: $1,656.6M (+6.4% YoY)' : 'FY2025 全年总营收: $1,656.6M (+6.4% YoY)' },
 { lbl: en ? '-Cost/OpEx' : '-成本与费用', val: 535.6, base: 1121.0, col: pal.amber, tip: en ? 'Cost of Rev ($196.3M) + R&D ($103.6M) + SG&A ($235.7M) = $535.6M' : '营业成本 $196.3M + 研发 $103.6M + 销管 $235.7M = $535.6M' },
 { lbl: en ? 'Op Income' : '营业利润', val: 1121.0, base: 0, col: pal.violet, tip: en ? 'FY25 Operating Income: $1,121.0M (67.7% Op Margin)' : 'FY2025 营业利润: $1,121.0M (营业利润率高达 67.7%)' },
 { lbl: en ? 'Net Income' : 'GAAP净利', val: 825.7, base: 0, col: pal.blue, tip: en ? 'FY25 GAAP Net Income: $825.7M ($8.81 Diluted EPS)' : 'FY2025 GAAP 净利润: $825.7M (稀释 EPS $8.81)' },
 { lbl: en ? 'Op Cash Flow' : '经营现金流', val: 1091.1, base: 0, col: pal.green, tip: en ? 'FY25 Operating Cash Flow: $1,091.1M (+$80.2M Deferred Rev inflow)' : 'FY2025 经营现金流: $1,091.1M (含 $80.2M 递延收入净流入)' },
 { lbl: en ? 'Free Cash' : '自由现金流', val: 1068.3, base: 0, col: pal.green, tip: en ? 'FY25 FCF: $1,068.3M after just $22.8M CapEx (129.4% of Net Income)' : 'FY2025 自由现金流: $1,068.3M (CapEx 仅 $22.8M，净利转化率 129.4%)' }
 ];
 var maxV = 1850;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'M', pad.left - 8, gy + 4);
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
 drawValueBadge(ctx, '$' + s.val.toFixed(0) + 'M', cx, yTop - 12, s.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(s.lbl, cx, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ idx: i, x: pad.left + i * slotW, y: pad.top, w: slotW, h: ph + 26, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', '9M26'];
 var gmArr = [85.6, 86.2, 86.9, 87.7, 88.2, 88.6];
 var opmArr = [65.3, 66.2, 67.0, 67.9, 67.7, 67.8];
 var fcfArr = [58.7, 56.4, 54.6, 56.2, 64.5, 56.5];
 var minM = 45, maxM = 95;
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
 title: y + (en ? ' Margin Profile' : ' 三率表现'),
 body: (en ? 'GM: ' : '毛利率: ') + gmArr[idx] + '% · ' + (en ? 'OpM: ' : '营业利润率: ') + opmArr[idx] + '% · ' + (en ? 'FCF Margin: ' : 'FCF率: ') + fcfArr[idx] + '%'
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
 if (state.profitSeries.svc) plotLine(gmArr, pal.green, 'rgba(22, 163, 74, 0.16)');
 if (state.profitSeries.tot) plotLine(opmArr, pal.violet, 'rgba(124, 58, 237, 0.14)');
 if (state.profitSeries.prd) plotLine(fcfArr, pal.blue, 'rgba(0, 115, 230, 0.14)');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 24, bottom: 42, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = en ? ['Y1', 'Y3', 'Y5', 'Y7', 'Y10'] : ['第1年', '第3年', '第5年', '第7年', '第10年'];
 var solo = [9.7, 17.5, 23.0, 27.5, 32.0];
 var core = [9.7, 29.5, 49.0, 71.0, 96.0];
 var ultra = [10.0, 32.5, 56.0, 84.0, 118.0];
 var maxL = 132;
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
 title: lb + (en ? ' Cumulative Domain Gross Profit' : ' 单域名累计毛利'),
 body: (en ? 'Enterprise: $' : '头部品牌: $') + ultra[idx] + ' · ' + (en ? 'Mature: $' : '成熟官网: $') + core[idx] + ' · ' + (en ? 'Y1 New: $' : '首年新域: $') + solo[idx]
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
 if (idx === 4 || isHov) drawValueBadge(ctx, '$' + pt.v.toFixed(0), idx === 4 ? pt.x - 14 : pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.cohortSeries.ultra) drawCurve(ultra, pal.violet, 'rgba(124, 58, 237, 0.18)');
 if (state.cohortSeries.core) drawCurve(core, pal.blue, 'rgba(0, 115, 230, 0.16)');
 if (state.cohortSeries.solo) drawCurve(solo, pal.amber, 'rgba(217, 119, 6, 0.14)');
 } else {
 var vendors = [
 { name: 'VeriSign (.com/.net)', unit: 44.3, prof: 76.0, col: pal.blue },
 { name: en ? 'ccTLDs (Country)' : '国家顶级域 ccTLDs', unit: 37.5, prof: 15.0, col: pal.green },
 { name: en ? 'Other nTLDs' : '其他新通用顶级域', unit: 18.2, prof: 9.0, col: pal.amber }
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
 body: en ? ('Global Domain Base ~' + v.unit + '% vs. Est. Registry Profit Share ~' + v.prof + '%') : ('全球域名份额 ~' + v.unit + '% vs 全球注册局营业利润占比 ~' + v.prof + '%')
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
 var yrs = ['FY13', 'FY16', 'FY19', 'FY21', 'FY23', 'FY24', 'FY25', 'Q3 26'];
 var sh = [155.0, 128.0, 118.5, 112.0, 103.5, 98.2, 93.8, 89.8];
 var maxS = 170;
 for (var g = 0; g <= 4; g++) {
 var sv = (maxS / 4) * g, sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(sv.toFixed(0) + 'M', pad.left - 8, sy + 4);
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
 ctx.fillText(sh[i].toFixed(1) + 'M', cx, yTop - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: y + (en ? ' Diluted / Ending Shares' : ' 股本规模'),
 body: sh[i].toFixed(1) + (en ? 'M shares (-' : 'M 股（较 FY13 累计缩减 ') + ((1 - sh[i] / 155.0) * 100).toFixed(1) + (en ? '% vs. FY13)' : '%）')
 });
 });
 } else {
 var items = [
 { name: 'VeriSign (VRSN)', ratio: 83.2, col: pal.green, tip: en ? 'Q3 2026 Deferred Revenue $1,463.3M = ~83% of FY26E annual revenue (prepaid 1–10Y)' : 'Q3 2026 递延收入 $1,463.3M ≈ 全年营收的 83%，全部为无息预收浮存金' },
 { name: 'Microsoft (MSFT)', ratio: 26.0, col: pal.blue, tip: en ? 'Enterprise cloud & M365 unearned revenue ~26% of sales' : '企业云与 M365 递延收入约占年营收 26%' },
 { name: 'Adobe (ADBE)', ratio: 28.5, col: pal.violet, tip: en ? 'Creative Cloud annual SaaS subscriptions billed upfront' : 'Creative Cloud 年付 SaaS 订阅预收约 28.5%' },
 { name: 'GoDaddy (GDDY)', ratio: 65.0, col: pal.amber, tip: en ? 'Retail domain & hosting prepayments ~65% of sales' : '下游域名及建站预收账款约占年营收 65%' }
 ];
 var rowH = ph / items.length;
 items.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 22, barLen = (it.ratio / 100) * (pw * 0.72);
 if (state.hover.capitalCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill();
 }
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left + 80, cy - bh / 2, pw * 0.72, bh, 5); ctx.fill();
 ctx.fillStyle = it.col;
 roundRect(ctx, pad.left + 80, cy - bh / 2, barLen, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(it.name, pad.left + 72, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(it.ratio.toFixed(1) + '%', pad.left + 86 + barLen, cy + 4);
 hitRegions.capitalCanvas.push({ idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH, title: it.name + (en ? ' Deferred Rev / Sales' : ' 递延收入/营收比'), body: it.tip });
 });
 }
 }

 var simData = { eps: [9.42, 10.9, 12.6, 14.6, 16.9, 19.45], rev: [1758, 1952, 2163, 2392, 2641, 2870] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.simMiniCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var arr = simData.eps;
 var maxE = Math.max(22, Math.ceil(Math.max.apply(null, arr) * 1.15));
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
 body: (en ? 'Diluted EPS: $' : '摊薄 EPS: $') + pt.v.toFixed(2) + (en ? ' · Est. Revenue: $' : ' · 推演营收: $') + (simData.rev[i] / 1000).toFixed(2) + 'B'
 });
 });
 }

 function runSimulator() {
 var gCore = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
 var addNew = parseFloat(document.getElementById('inpProdCagr').value);
 var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblSvcCagr').textContent = (gCore * 100).toFixed(1) + '%';
 document.getElementById('lblProdCagr').textContent = '$' + addNew.toFixed(0) + 'M';
 document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

 var rev = 1758.0, opInc = 1190.0, shares = 89.8;
 var epsArr = [9.42], revArr = [1758.0];
 for (var y = 1; y <= 5; y++) {
 var coreInc = rev * gCore;
 rev = rev + coreInc + addNew;
 opInc = opInc + coreInc * 0.92 + addNew * 0.72;
 shares = shares * (1 - buy);
 var netInc = (opInc - 50) * 0.77;
 epsArr.push(netInc / shares);
 revArr.push(rev);
 }
 var fy31OpM = (opInc / rev) * 100;
 var fy31Eps = epsArr[5];
 var epsCagr = (Math.pow(fy31Eps / 9.42, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '$' + (rev / 1000).toFixed(2) + 'B';
 document.getElementById('simGmOut').textContent = fy31OpM.toFixed(1) + '%';
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

 var PRESETS = { bear: { s: 4.5, p: 10, b: 2.0 }, base: { s: 8.5, p: 45, b: 3.2 }, bull: { s: 10.5, p: 90, b: 4.0 } };
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
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '928人管理 182.5M 域名 · 67.7% 营业利润率 · $1.46B 浮存' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: 'ICANN特许 → 注册商分销 → 提价权 → 预收浮存 → 缩股' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与收费拆解', s: '.com $10.97 · .net $12.00 · .web · Verisign Informed' },
 { id: 'mod-cohort', t: 'M3 域名留存棘轮与单客 LTV', s: '75.2% 混合续费率 · 10年单域毛利累积 · 利润池垄断度' },
 { id: 'mod-capital', t: 'M4 负所有者权益与缩股推演器', s: '89.8M 流通股 · 5年 EPS 复利交互模拟' },
 { id: 'mod-matrix', t: 'M5 六大科技/收费站对标与压测', s: 'VRSN vs GDDY / NET / V / MCO / MSCI' }
 ];
 var QUICK_EN = [
 { id: 'mod-deck', t: 'M0 Command Deck & Economic Formula', s: '928 FTEs · 182.5M Domains · 67.7% OpM · $1.46B Float' },
 { id: 'mod-pipeline', t: 'M1 5-Node Value-Chain Pipeline', s: 'ICANN Franchise → Registrars → Escalators → Float → Buybacks' },
 { id: 'mod-profit-pool', t: 'M2 Profit Pool Waterfall & Stack', s: '.com $10.97 · .net $12.00 · .web · Verisign Informed' },
 { id: 'mod-cohort', t: 'M3 Domain Ratchet & Cohort LTV', s: '75.2% Renewal · 10Y Domain Gross Profit · Profit Capture' },
 { id: 'mod-capital', t: 'M4 Negative Equity & EPS Compounder', s: '89.8M Shares · 5-Year Interactive Simulator' },
 { id: 'mod-matrix', t: 'M5 Peer Matrix & Stress Audit', s: 'VRSN vs. GDDY / NET / V / MCO / MSCI' }
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
 