
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_CHECK_KEY = 'mui_pdd_earnings_checks_v1';
 var DOC_TITLE_ZH = '拼多多 PDD Holdings (PDD) 2026年Q3及前三季度财报深度分析报告 | 数据中心';
 var DOC_TITLE_EN = 'PDD Holdings (NASDAQ: PDD) Q3 2026 & 9M 2026 Earnings Deep-Dive Report | Research Hub';

 var I18N_RICH_LIST = [
 {
 key: 'pdd_r00',
 match_zh: '拼多多 (PDD Holdings) 2026年Q3财报深度分析：',
 zh: '拼多多 (PDD Holdings) 2026年Q3财报深度分析：<span class="gradient-accent">增长换挡期的利润防御战、Temu 关税阵痛与 $852亿现金之谜</span>',
 en: 'PDD Holdings (NASDAQ: PDD) Q3 2026 Earnings Deep Dive: <span class="gradient-accent">Margin Defense Amid Zero Top-Line Growth, Temu Tariff Headwinds &amp; the $85.2B Cash Fortress</span>'
 },
 {
 key: 'pdd_r01',
 match_zh: '2026年11月19日，拼多多控股',
 zh: '2026年11月19日，<strong>拼多多控股（PDD Holdings Inc., NASDAQ: PDD）</strong>交出了一份极具戏剧性的三季报：单季总营收录得 <strong>RMB 1,083.41亿元</strong>（US$161.59亿），同比几乎零增长（<strong>+0.06% YoY</strong>，低于市场预期的 RMB 1,152亿），创上市以来最低增速 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">PDD Q3 2026 IR ↗</a>。 然而拆解结构发现，公司收入正经历剧烈的“一升一降”剪刀差：<strong>在线营销服务及其他收入</strong>同比增长 <strong>+12.1%</strong> 至 RMB 598.19亿，而以 Temu 跨境履约与佣金为主力的<strong>交易服务收入</strong>却同比骤降 <strong>-11.7%</strong>（减少 RMB 64.07亿）至 RMB 485.22亿。 面对外部关税与贸易规则剧变，管理层果断收缩投放——<strong>销售及营销费用同比大降 -16.6%</strong> 至 RMB 252.96亿（费率从 28.0% 压降至 <strong>23.3%</strong>），同时<strong>研发费用逆势大增 +16.8%</strong>（Non-GAAP +23.6%）至 RMB 50.59亿，一举推动 GAAP 营业利润同比飙升 <strong>+24.5%</strong> 至 <strong>RMB 311.64亿</strong>（Non-GAAP 营业利润率重返 <strong>30.1%</strong>），Non-GAAP 摊薄每 ADS 收益达 <strong>US$3.14</strong>，远超华尔街一致预期（US$2.77），刺激股价当日逆势暴涨 <strong>+11%</strong> <a class="cite-link" href="https://thelowdown.momentum.asia/full-transcript-of-pdd-holdings-q3-2026-earnings-call-qa-section/" target="_blank" rel="noopener noreferrer">Q3 Call Transcript ↗</a> <a class="cite-link" href="https://www.marketbeat.com/earnings/reports/2026-11-19-pinduoduo-inc-stock/" target="_blank" rel="noopener noreferrer">MarketBeat ↗</a>。 截至 2026年9月30日，拼多多账面现金、现金等价物及短期投资已滚雪球至 <strong>RMB 4,554亿（US$679亿）</strong>，叠加定期存款及债务证券等其他非流动资产 RMB 1,157亿，广义现金储备高达 <strong>RMB 5,711亿（约 US$852亿）</strong>——且仍保持零分红、零回购。',
 en: 'On November 19, 2026, <strong>PDD Holdings Inc. (NASDAQ: PDD)</strong> delivered a starkly bifurcated Q3 2026 report: total revenue stalled at <strong>RMB 108.34B</strong> (US$16.16B, up just <strong>+0.06% YoY</strong> and missing the RMB 115.2B consensus), marking its slowest top-line growth since IPO <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">PDD Q3 2026 IR ↗</a>. Beneath the flat headline, a sharp divergence emerged: <strong>Online Marketing Services &amp; Others</strong> rose <strong>+12.1% YoY</strong> to RMB 59.82B, while <strong>Transaction Services</strong> (including Temu fulfillment) fell <strong>-11.7% YoY</strong> (-RMB 6.41B) to RMB 48.52B. Facing shifting global tariffs, management slashed <strong>Sales &amp; Marketing expenses by -16.6% YoY</strong> to RMB 25.30B (23.3% of sales vs. 28.0% prior year) while lifting <strong>R&amp;D +16.8% YoY</strong> (+23.6% Non-GAAP) to RMB 5.06B—propelling GAAP operating profit up <strong>+24.5% YoY</strong> to <strong>RMB 31.16B</strong> (30.1% Non-GAAP margin) and Non-GAAP diluted EPADS to <strong>US$3.14</strong> (beating $2.77 consensus), sending shares up <strong>+11%</strong> <a class="cite-link" href="https://thelowdown.momentum.asia/full-transcript-of-pdd-holdings-q3-2026-earnings-call-qa-section/" target="_blank" rel="noopener noreferrer">Q3 Call Transcript ↗</a> <a class="cite-link" href="https://www.marketbeat.com/earnings/reports/2026-11-19-pinduoduo-inc-stock/" target="_blank" rel="noopener noreferrer">MarketBeat ↗</a>. Cash &amp; short-term investments reached <strong>RMB 455.4B (US$67.9B)</strong> plus RMB 115.7B in non-current deposits/debt securities—a <strong>RMB 571.1B (~US$85.2B)</strong> treasury fortress with zero dividends or buybacks.'
 },
 {
 key: 'pdd_r02',
 match_zh: '陈磊定调海外重资产履约转型',
 zh: '<strong>陈磊定调海外重资产履约转型，赵佳臻强调国内竞争未歇：</strong>在 11月19日电话会上，陈磊宣布将在主要海外市场构建<strong>“端到端全球履约网络（End-to-End Global Fulfillment Network）”</strong>，整合本地仓储与物流以帮助商家应对关税与监管不确定性；赵佳臻则指出国内虽即时零售补贴战有所缓和，但价格、品质与服务比拼依然白热化，没有平台会轻言退缩 <a class="cite-link" href="https://thelowdown.momentum.asia/full-transcript-of-pdd-holdings-q3-2026-earnings-call-qa-section/" target="_blank" rel="noopener noreferrer">Full Q&amp;A Transcript ↗</a>。',
 en: '<strong>Lei Chen Commits to Global Fulfillment Buildout; Jiazhen Zhao Sees Unrelenting Domestic Rivalry:</strong> On the Nov 19 call, Co-CEO Lei Chen outlined an <strong>"End-to-End Global Fulfillment Network"</strong> integrating local warehousing and logistics to buffer SMEs against tariff shifts, while Co-CEO Jiazhen Zhao emphasized that despite moderating quick-commerce subsidies, domestic price, quality, and service competition remains fierce <a class="cite-link" href="https://thelowdown.momentum.asia/full-transcript-of-pdd-holdings-q3-2026-earnings-call-qa-section/" target="_blank" rel="noopener noreferrer">Full Q&amp;A Transcript ↗</a>.'
 },
 {
 key: 'pdd_r03',
 match_zh: '1. 极强的费用调控能力：',
 zh: '<strong>1. 极强的费用调控能力：</strong>一旦管理层决定收敛营销买量（Q3 -16.6%），利润率瞬间反弹至 30% 量级，证明盈利底盘极其扎实。<br/><strong>2. 国内广告护城河稳固：</strong>在线营销服务加速至 +12.1%，未受消费降级或友商补贴战致命侵蚀。<br/><strong>3. 极高安全边际的现金垫：</strong>¥5,711亿现金及债券资产覆盖了约 77% 的美股市值，净现金估值处于历史极低水位。',
 en: '<strong>1. Extraordinary OpEx Agility:</strong> Dialing back S&amp;M (-16.6% YoY) instantly restored ~30% Non-GAAP operating margins, proving deep underlying unit economics.<br/><strong>2. Resilient Domestic Ad Monetization:</strong> Online marketing accelerated to +12.1% YoY despite intense domestic price wars.<br/><strong>3. Deep Balance Sheet Floor:</strong> RMB 571.1B (~$85.2B) in cash &amp; debt securities covers ~77% of market cap with zero bank debt.'
 },
 {
 key: 'pdd_r04',
 match_zh: '1. 营收增长引擎熄火风险：',
 zh: '<strong>1. 营收增长引擎熄火风险：</strong>Q3 营收同比仅 +0.06%，若交易服务（-11.7%）因关税与监管长期萎缩，单靠降费无法支撑长期市值扩张。<br/><strong>2. 海外重资产化拉低 ROE：</strong>陈磊提出自建端到端全球履约网，意味着未来 CapEx 与本地仓储运营成本将显著抬升。<br/><strong>3. 治理透明度与资本回报缺位：</strong>¥95亿营业外净损失缺乏明细拆解，且坐拥 $852亿流动性仍无任何回购/分红时间表 <a class="cite-link" href="https://open.spotify.com/episode/73yru14i8gwrgoY0W9vsub" target="_blank" rel="noopener noreferrer">Q2/Q3 Governance Note ↗</a>。',
 en: '<strong>1. Top-Line Stagnation Risk:</strong> At +0.06% YoY revenue growth, cost-cutting alone cannot drive sustained multiple expansion if Transaction Services (-11.7%) stays pressured.<br/><strong>2. CapEx Drag from Global Logistics:</strong> Building an end-to-end global fulfillment network introduces heavier local warehousing and operating costs.<br/><strong>3. Capital Allocation &amp; Disclosure Gap:</strong> RMB 9.5B in 9M26 non-operating "other loss, net" lacks granular disclosure, and zero buybacks/dividends perpetuate a governance discount <a class="cite-link" href="https://open.spotify.com/episode/73yru14i8gwrgoY0W9vsub" target="_blank" rel="noopener noreferrer">Q2/Q3 Governance Note ↗</a>.'
 }
 ];

 var I18N_TEXT_PAIRS = [
 ['数据中心', 'Research Hub'],
 ['拼多多 (PDD Holdings) 2026年Q3财报深度分析', 'PDD Holdings Q3 2026 Earnings Report'],
 ['拼多多财报深度研报', 'PDD Earnings Deep Dive'],
 ['营收增速归零 (+0.1%) × 营销大降 (-16.6%) 驱动营业利润 +24.5% × RMB 5,711亿现金堡垒', '0.1% Top-Line Stall × -16.6% S&M Cut Driving +24.5% Op Profit × RMB 571.1B Cash Fortress'],
 ['Q3 2026 营收 / 同比', 'Q3 2026 Rev / YoY'],
 ['Q3 营业利润 / 利润率', 'Q3 Op Profit / Margin'],
 ['广义现金储备 (含非流动)', 'Total Cash & Treasury'],
 ['核心研究章节 (00 – 07)', 'Report Chapters (00 – 07)'],
 ['执行摘要与核心指标', 'Executive Summary & KPIs'],
 ['双引擎分化与费用瘦身', 'Revenue Split & Cost Discipline'],
 ['四大战略支柱与护城河', '4 Strategic Pillars & Moat'],
 ['中美电商巨头横向对比', 'Global E-Commerce Peers'],
 ['现金堡垒与资本回报推演', 'Cash Fortress & Return Sim'],
 ['发展演进与关键战役复盘', 'Evolution & Key Battles'],
 ['拼多多财报质量核查清单', 'Earnings Quality Checklist'],
 ['数据来源与监管核验索引', 'Primary Filings & Sources'],
 ['阅读与导出工具', 'Reading & Export Tools'],
 ['浅色外观', 'Light'],
 ['深色外观', 'Dark'],
 ['导出 HTML', 'Export HTML'],
 ['打印 / PDF', 'Print / PDF'],
 ['财报定评：营收首次零增长 (+0.1%)，靠费用克制实现营业利润逆势大增 +24.5%', 'Verdict: Revenue Stalls at +0.1% YoY, Cost Discipline Drives +24.5% Op Profit Surge'],
 ['覆盖周期：Q1 2026 · Q2 2026 · Q3 2026 (2026.11.19 披露)', 'Scope: Q1 2026 · Q2 2026 · Q3 2026 (Released Nov 19, 2026)'],
 ['股价反应：财报日大涨 +11% ($86.00)', 'Market Reaction: +11% ($86.00)'],
 ['双引擎剪刀差 (+12.1% vs -11.7%)', 'Dual-Engine Divergence (+12.1% vs -11.7%)'],
 ['国内主站广告变现依然坚挺，在线营销收入同比增长 64.7亿；但受欧美小额包裹关税与贸易政策冲击，交易服务收入同比缩水 64.1亿，两者恰好抵消导致总营收持平。', 'Domestic ad monetization grew +RMB 6.47B YoY, while cross-border tariff headwinds cut Transaction Services by -RMB 6.41B—resulting in flat consolidated revenue.'],
 ['“节流”护盘利润 (+24.5% Op Profit)', 'OpEx Discipline Protects Margins (+24.5% Op Profit)'],
 ['Q3 营业成本下降 3.4%（毛利率升至 58.2%），营销费用砍掉 50.3亿（-16.6%），带动营业利润率从 23.1% 跃升至 28.8%。但 CFO 刘珺警告“单季费用率不可线性外推”。', 'Cost of revenues fell -3.4% (58.2% GM) and S&M dropped -RMB 5.03B (-16.6%), lifting operating margin to 28.8%—though CFO Jun Liu cautioned against extrapolating one quarter.'],
 ['RMB 5,711亿现金与“战略投资期”', 'RMB 571.1B Treasury & "Strategic Investment Phase"'],
 ['账面现金及理财超 5,700亿人民币且单季净流入经营现金 430亿，但管理层重申处于“千亿扶持”及海外端到端履约网重投入期，依然坚持零分红、零回购。', 'Despite RMB 571.1B in liquidity and RMB 43.0B Q3 operating cash flow, management remains committed to long-term supply-chain investment with zero buybacks or dividends.'],
 ['Q3 2026 总营收与增速', 'Q3 2026 Total Revenue'],
 ['Q3 营业利润与利润率', 'Q3 Operating Profit & Margin'],
 ['Q3 归母净利与 Non-GAAP', 'Q3 Net Income & Non-GAAP EPADS'],
 ['广义现金及债券投资组合', 'Total Cash & Debt Securities'],
 ['一、双引擎剧烈分化与费用瘦身：拆解 Q3“营收停滞、利润暴涨”的底层账本', '1. Dual-Engine Divergence & Cost Discipline: Inside Q3’s Flat Sales & Surging Profit'],
 ['国内主站广告变现韧性十足，海外 Temu 遭遇关税与半托管调整阵痛；营销费率骤降撑起 30.1% Non-GAAP 营业利润率', 'Resilient domestic ad monetization offsets Temu tariff drag, while a 470 bps S&M ratio cut lifts Non-GAAP operating margin to 30.1%'],
 ['拼多多控股 PDD Holdings 2026 Q3 财务引擎中枢（总营收 RMB 108.34B · 员工 ~25,474人 · 人均创收 ~¥1,695万/年）', 'PDD Holdings Q3 2026 Financial Engine (Revenue RMB 108.34B · ~25,474 FTEs · ~RMB 16.95M Rev/FTE)'],
 ['联席董事长 & 联席 CEO：陈磊（主抓全球供应链与合规）× 赵佳臻（主抓国内主站与商家生态）× 财务VP：刘珺', 'Co-Chairmen & Co-CEOs: Lei Chen (Global Supply Chain) × Jiazhen Zhao (Domestic Ecosystem) × VP Finance: Jun Liu'],
 ['在线营销服务及其他', 'Online Marketing Services & Others'],
 ['交易服务收入 (含 Temu)', 'Transaction Services (incl. Temu)'],
 ['营业成本 & 营销费用', 'Cost of Revenues & S&M Discipline'],
 ['研发费用 & 供应链基建', 'R&D & Supply-Chain Tech'],
 ['视图A: 分季度双引擎营收', 'View A: Quarterly Revenue Split'],
 ['视图B: Q3 成本与费用率拆解', 'View B: Q3 Cost & OpEx Ratios'],
 ['展开微观财务拆解', 'Show Financial Mechanics'],
 ['收起微观财务拆解', 'Hide Financial Mechanics'],
 ['二、四大战略支柱与护城河评估：极简人效、供给侧重塑与海外本地化突围', '2. Four Strategic Pillars & Moat Assessment: Lean Talent, Supply Upgrade & Global Localization'],
 ['点击左侧任一战略支柱卡片，联动查看拼多多当前核心竞争壁垒与五维竞争力雷达对比画像', 'Click any strategic pillar on the left to inspect PDD’s competitive moat and 5-axis peer radar'],
 ['全部电商标杆', 'All Peers'],
 ['中概核心电商', 'China E-Commerce'],
 ['全球零售与云巨头', 'Global Retail & Cloud'],
 ['四、RMB 5,711亿现金堡垒与资本回报推演：利润率轨迹及回购/分红释放潜力', '4. RMB 571.1B Cash Fortress & Capital Return Simulator: Margin Path & Buyback Upside'],
 ['全部勾选', 'Check All'],
 ['重置清单', 'Reset']
 ];

 var I18N_ATTR_PAIRS = [
 ['展开/收起章节目录', 'Toggle Chapter Sidebar'],
 ['切换目录侧边栏', 'Toggle Chapter Sidebar'],
 ['检索章节或指标…', 'Jump to chapter or KPI…'],
 ['外观模式切换', 'Appearance Theme Switch'],
 ['导出独立 HTML 文件 (.html)', 'Export Standalone HTML File (.html)'],
 ['打印或导出 PDF 研报', 'Print or Save Report as PDF'],
 ['搜索平台、指标 (营收 / 营业利润率 / AI云 / FCF / 关税)…', 'Search peer, metric (Revenue / Op Margin / AI Cloud / FCF)…']
 ];

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 国内主站现金牛）：</strong>Q3 2026 在线营销服务收入逆势加速至 +12.1%（RMB 598.2亿），证明在国内消费理性化趋势下，拼多多“省钱+高转化”的流量分发效率依然不可替代 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 IR ↗</a>。',
 '<strong>当前选中支柱解读（02 Temu 海外本地化）：</strong>随着欧盟 2026 年 7 月起对低价值跨境包裹征税，陈磊宣布在主要市场建设端到端本地履约与仓储网络，短期牺牲部分交易收入增速以换取长期合规壁垒 <a class="cite-link" href="https://finance.biggo.com/news/US_PDD_2026-11-19" target="_blank" rel="noopener noreferrer">Q3 Call Summary ↗</a>。',
 '<strong>当前选中支柱解读（03 千亿扶持与供给侧）：</strong>通过“申诉优赔”与偏远地区物流补贴，拼多多正在修复此前因“仅退款”引发的商家摩擦，并将研发费用同比提升 16.8% 至 ¥50.6亿以强化平台治理技术 <a class="cite-link" href="https://m.sohu.com/a/1105826731_115571" target="_blank" rel="noopener noreferrer">商家服务进展 ↗</a>。',
 '<strong>当前选中支柱解读（04 极简组织与现金悖论）：</strong>2025 年底仅 25,474 名全职员工便支撑起 ¥4,318亿年营收与 ¥5,711亿现金储备，但零回购、零分红政策也使市场对其治理透明度保持谨慎折价 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 Form 20-F ↗</a>。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Domestic Cash Cow):</strong> Online Marketing Services accelerated to +12.1% YoY (RMB 59.82B) in Q3 2026, confirming Pinduoduo’s unmatched merchant ROI amid value-conscious Chinese consumer demand <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 IR ↗</a>.',
 '<strong>Selected Pillar (02 · Temu Localization Pivot):</strong> With EU low-value parcel duties taking effect in July 2026, Co-CEO Lei Chen committed to building an end-to-end global fulfillment network—trading near-term transaction revenue for regulatory durability <a class="cite-link" href="https://finance.biggo.com/news/US_PDD_2026-11-19" target="_blank" rel="noopener noreferrer">Q3 Call Summary ↗</a>.',
 '<strong>Selected Pillar (03 · Supply-Chain Tech &amp; Merchant Relief):</strong> Fee rebates, rural delivery subsidies, and dispute-compensation programs are rebuilding merchant trust alongside a +16.8% YoY jump in Q3 R&amp;D to RMB 5.06B <a class="cite-link" href="https://m.sohu.com/a/1105826731_115571" target="_blank" rel="noopener noreferrer">Merchant Support ↗</a>.',
 '<strong>Selected Pillar (04 · Lean Headcount &amp; Capital Paradox):</strong> Just 25,474 FTEs (per 2025 20-F) power RMB 431.8B in annual sales and a RMB 571.1B cash fortress, yet zero buybacks or dividends leave PDD trading at a steep governance discount <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 Form 20-F ↗</a>.'
 ];

 var PEER_ROWS = [
 { category: 'china', benchmark: true, company: '研究基准：拼多多 (PDD Holdings · PDD)', leader: '陈磊 / 赵佳臻 (联席 CEO)', rev: '¥1,083.4亿 (+0.06% YoY)', engine: '在线营销 +12.1% (¥598亿) vs 交易服务 -11.7% (¥485亿)', op: '¥311.6亿 (+24.5%) · 28.8% 营业利润率', net: 'GAAP 净利 ¥295.4亿 (+0.7%) · OCF ¥430亿 · 现金 ¥5,711亿', verdict: '中概盈利与现金流之王：极简编制带来全行业最高利润率，但 Q3 营收失速与零回购考验估值天花板。', sourceLabel: 'PDD Q3 2026 IR', sourceUrl: 'https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/' },
 { category: 'china', benchmark: false, company: '阿里巴巴 (Alibaba · BABA)', leader: '蔡崇信 / 吴泳铭', rev: '¥2,715.2亿 (+10% YoY)', engine: 'AI 云与算力服务暴增 +53% YoY，重组聚焦电商与 AI 实验室', op: '盈利杠杆显著释放（Non-GAAP 净利 +92%）', net: 'GAAP 净利 ¥645亿 (+207%) · CapEx 大增 60% 致 FCF 转负', verdict: '重投 AI 云算力周期：云业务加速至 53% 重塑科技叙事，但高资本开支短期压制自由现金流，与拼多多轻资产形成鲜明对比。', sourceLabel: 'BABA Sep Qtr 2026', sourceUrl: 'https://www.businesswire.com/news/home/20261118898798/en/Alibaba-Group-Announces-September-Quarter-2026-Results-and-Interim-Results-for-the-Six-Months-Ended-September-30-2026' },
 { category: 'china', benchmark: false, company: '京东集团 (JD.com · JD)', leader: '许冉 (Sandy Xu)', rev: '¥3,096亿 (+3.5% YoY)', engine: '商品收入 +3.1% (¥2,330亿)，服务 +4.7%，京东零售毛利 20.1%', op: 'GAAP 营业利润 ¥52亿 · 京东零售利润率 5.8%', net: 'Non-GAAP 净利 ¥83亿 (+44%) · LTM FCF ¥190亿 · 现金 ¥2,150亿', verdict: '自营供应链稳健复苏：营销费用大降 26.2% 推动利润弹性释放，但自营重资产模式决定了其净利率 (2.7%) 远低于拼多多 (27.3%)。', sourceLabel: 'JD Q3 2026 IR', sourceUrl: 'https://ir.jd.com/news-releases/news-release-details/jdcom-announces-third-quarter-2026-results' },
 { category: 'global', benchmark: false, company: '亚马逊 (Amazon · AMZN)', leader: '安迪·贾西 (Andy Jassy)', rev: '$2,019.4亿 (+12% YoY)', engine: 'AWS 云计算飙升 +39.3% ($460亿)，北美零售 +6%，国际 +5%', op: '$280.8亿 (+61%) · 创纪录 13.9% 营业利润率', net: 'GAAP 净利 $206.9亿 (-2%) · 季内 CapEx $773亿致 LTM FCF -$424亿', verdict: '全球履约+AI基建巨兽：AWS 与自建物流护城河极深，但单季 $773亿 AI 资本开支令现金流承压，凸显拼多多高现金留存特性。', sourceLabel: 'AMZN Q3 2026 IR', sourceUrl: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/' }
 ];

 var PEER_ROWS_EN = [
 { category: 'china', benchmark: true, company: 'Benchmark: PDD Holdings (PDD)', leader: 'Lei Chen / Jiazhen Zhao (Co-CEOs)', rev: 'RMB 108.34B (+0.06% YoY)', engine: 'Online Mktg +12.1% (RMB 59.8B) vs. Tx Services -11.7% (RMB 48.5B)', op: 'RMB 31.16B (+24.5%) · 28.8% Op Margin', net: 'GAAP NI RMB 29.54B (+0.7%) · OCF RMB 43.0B · Treasury RMB 571.1B', verdict: 'Margin & Cash Leader: Unmatched operating efficiency and balance sheet, though flat Q3 sales and zero capital return cap valuation.', sourceLabel: 'PDD Q3 2026 IR', sourceUrl: 'https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/' },
 { category: 'china', benchmark: false, company: 'Alibaba Group (BABA)', leader: 'Joe Tsai / Eddie Wu', rev: 'RMB 271.52B (+10% YoY)', engine: 'AI Cloud surged +53% YoY; restructured into E-commerce, AI Cloud & Labs', op: 'Strong operating leverage (Non-GAAP NI +92% YoY)', net: 'GAAP NI RMB 64.5B (+207%) · CapEx +60% turned FCF negative', verdict: 'AI Cloud Re-rating: 53% cloud growth drives narrative upside, but heavy AI CapEx contrasts with PDD’s capital-light cash generation.', sourceLabel: 'BABA Sep Qtr 2026', sourceUrl: 'https://www.businesswire.com/news/home/20261118898798/en/Alibaba-Group-Announces-September-Quarter-2026-Results-and-Interim-Results-for-the-Six-Months-Ended-September-30-2026' },
 { category: 'china', benchmark: false, company: 'JD.com (JD)', leader: 'Sandy Xu (CEO)', rev: 'RMB 309.6B (+3.5% YoY)', engine: 'Product rev +3.1%, Services +4.7%; JD Retail record 20.1% GM', op: 'GAAP Op Profit RMB 5.2B · JD Retail margin 5.8%', net: 'Non-GAAP NI RMB 8.3B (+44%) · LTM FCF RMB 19B · Cash RMB 215B', verdict: '1P Supply Chain Recovery: -26.2% marketing cut boosted earnings, but 1P retail structurally yields 2.7% Non-GAAP net margin vs. PDD’s 28.6%.', sourceLabel: 'JD Q3 2026 IR', sourceUrl: 'https://ir.jd.com/news-releases/news-release-details/jdcom-announces-third-quarter-2026-results' },
 { category: 'global', benchmark: false, company: 'Amazon (AMZN)', leader: 'Andy Jassy (CEO)', rev: '$201.94B (+12% YoY)', engine: 'AWS surged +39.3% ($46.0B), North America +6%, International +5%', op: '$28.08B (+61%) · Record 13.9% Op Margin', net: 'GAAP NI $20.69B (-2%) · $77.3B Q3 CapEx pushed LTM FCF to -$42.4B', verdict: 'Global Fulfillment & AI Titan: Deepest logistics moat globally, yet massive $220B/yr AI CapEx turns trailing FCF negative.', sourceLabel: 'AMZN Q3 2026 IR', sourceUrl: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/' }
 ];

 var CHECKLIST_ITEMS = [
 { tag: '营收剪刀差', title: '1. 交易服务收入 (-11.7%) 何时止跌企稳？', desc: '追踪 Q4 2026 旺季交易服务同比增速，验证欧美关税冲击与 Temu 本地仓模式切换是否已度过最剧烈阵痛期。' },
 { tag: '国内基本盘', title: '2. 在线营销服务 (+12.1%) 能否维持双位数增长？', desc: '核查国内主站全站推广变现率在阿里、京东竞争下是否依然保持 10%+ 稳健扩张，守住集团高毛利底座。' },
 { tag: '费用纪律', title: '3. 营销费用率 (23.3%) 与利润率的可持续性？', desc: '鉴于 CFO 提醒单季费用率不可线性外推，需观察 Q4 大促季营销费率是否回升至 25%–28% 区间。' },
 { tag: '履约重资产化', title: '4. 海外“端到端履约网”对 CapEx 与毛利率的影响？', desc: '关注资产负债表固定资产（Q3 已由 ¥13亿升至 ¥63.5亿）及营业成本变化，评估本地化物流的投入产出比。' },
 { tag: '营业外透明度', title: '5. 9M26 高达 ¥95亿“其他净损失”的后续收敛情况？', desc: '核对 2026 年报（Form 20-F）附注中关于投资公允价值变动或营业外损失的详细拆解，消除财报黑盒疑虑。' },
 { tag: '资本配置', title: '6. ¥5,711亿广义现金何时开启首次回购或分红？', desc: '跟踪董事会是否宣布首次股票回购计划或现金派息，这是决定拼多多估值能否突破低市盈率陷阱的最核心催化剂。' }
 ];

 var CHECKLIST_ITEMS_EN = [
 { tag: 'Revenue Mix', title: '1. When Does Transaction Services (-11.7%) Stabilize?', desc: 'Track Q4 2026 holiday transaction revenue to confirm whether EU/US tariff shocks and Temu local-warehouse transitions have bottomed.' },
 { tag: 'Domestic Core', title: '2. Can Online Marketing (+12.1%) Sustain Double-Digit Growth?', desc: 'Monitor domestic ad monetization resilience amid Alibaba and JD rivalry to protect PDD’s ~58% consolidated gross margin.' },
 { tag: 'OpEx Discipline', title: '3. Is the 23.3% S&M Ratio Sustainable in Q4?', desc: 'Watch whether Q4 Singles’ Day promotions push S&M back toward 25%–28%, testing CFO Jun Liu’s caution on quarterly volatility.' },
 { tag: 'Global Logistics', title: '4. CapEx & Margin Drag from End-to-End Fulfillment?', desc: 'Monitor PP&E (up from RMB 1.3B to RMB 6.35B in 9M26) and cost of revenues as Temu builds local warehousing.' },
 { tag: 'Disclosure', title: '5. Granularity on 9M26 RMB 9.5B Non-Operating Loss?', desc: 'Check the upcoming FY2026 Form 20-F footnotes for details on non-operating fair value or other losses.' },
 { tag: 'Capital Return', title: '6. When Will the RMB 571.1B Treasury Unlock Buybacks or Dividends?', desc: 'Track any inaugural share repurchase or dividend authorization—the single biggest catalyst for valuation re-rating.' }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '¥1,083.4亿营收 (+0.1%) · ¥311.6亿营业利润 (+24.5%) · ¥5,711亿现金' },
 { sec: 'sec-01', title: '01 双引擎分化与费用瘦身', sub: '在线营销 +12.1% vs 交易服务 -11.7% · Q1–Q3 分季度与费用率图表' },
 { sec: 'sec-02', title: '02 四大战略支柱与护城河', sub: '国内现金牛 · Temu 本地化 · 千亿扶持 · 五维竞争力雷达图' },
 { sec: 'sec-03', title: '03 中美电商巨头横向对比', sub: '拼多多 vs 阿里巴巴 vs 京东 vs 亚马逊 Q3 2026 财报对比' },
 { sec: 'sec-04', title: '04 现金堡垒与资本回报推演', sub: 'FY24–Q3 26 利润轨迹 · ¥5,711亿现金回购/分红复利推演器' },
 { sec: 'sec-05', title: '05 发展演进与关键战役复盘', sub: '十年三阶段演进 · 欧盟关税大考 · 营销刹车 · 申诉优赔' },
 { sec: 'sec-06', title: '06 拼多多财报质量核查清单', sub: '6 项 Q4 跟踪与估值重估核心催化剂核查' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'PDD Q1–Q3 2026 公告 · SEC 20-F · 电话会纪要 · 同业财报' }
 ];

 var QUICK_JUMP_EN = [
 { sec: 'sec-00', title: '00 Executive Summary & KPIs', sub: 'RMB 108.3B Rev (+0.1%) · RMB 31.2B Op Profit (+24.5%) · RMB 571.1B Cash' },
 { sec: 'sec-01', title: '01 Revenue Split & Cost Discipline', sub: 'Online Mktg +12.1% vs. Tx Services -11.7% · Q1–Q3 & Cost Ratio Charts' },
 { sec: 'sec-02', title: '02 Four Strategic Pillars & Moat', sub: 'Domestic Cash Cow · Temu Localization · Merchant Relief · 5-Axis Radar' },
 { sec: 'sec-03', title: '03 Global E-Commerce Peers', sub: 'PDD vs. Alibaba vs. JD.com vs. Amazon Q3 2026 Comparison' },
 { sec: 'sec-04', title: '04 Cash Fortress & Return Simulator', sub: 'FY24–Q3 26 Margin Trajectory · Buyback/Dividend Upside Simulator' },
 { sec: 'sec-05', title: '05 Evolution & Key Battles', sub: '3-Era Evolution · EU Duties · S&M Reset · Merchant Relief' },
 { sec: 'sec-06', title: '06 Earnings Quality Checklist', sub: '6-Point Q4 Tracking & Re-Rating Catalysts (Saved Locally)' },
 { sec: 'sec-07', title: '07 Primary Filings & Sources', sub: 'PDD Q1–Q3 2026 Releases · SEC 20-F · Earnings Call · Peer Filings' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 10, priceCagr: 8.5, drip: true },
 p2: { principal: 10000, years: 10, priceCagr: 14.0, drip: true },
 p3: { principal: 10000, years: 10, priceCagr: 4.0, drip: false }
 };

 var state = {
 lang: 'zh',
 theme: 'light',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { pdd: true, baba: true, amzn: true },
 peerFilter: 'all',
 peerQuery: '',
 epsSeries: { eps: true, oci: true },
 sim: { principal: 10000, years: 10, priceCagr: 8.5, drip: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 function safeGetStorage(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
 function safeSetStorage(key, val) { try { window.localStorage.setItem(key, val); } catch (e) {} }

 var toastTimer = null;
 function showToast(message) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = message;
 el.classList.add('show');
 if (toastTimer) clearTimeout(toastTimer);
 toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2800);
 }

 function isEn() { return state.lang === 'en'; }

 var _zhToEnText = {}, _enToZhText = {};
 for (var _ti = 0; _ti < I18N_TEXT_PAIRS.length; _ti++) {
 _zhToEnText[I18N_TEXT_PAIRS[_ti][0]] = I18N_TEXT_PAIRS[_ti][1];
 _enToZhText[I18N_TEXT_PAIRS[_ti][1]] = I18N_TEXT_PAIRS[_ti][0];
 }
 var _zhToEnAttr = {}, _enToZhAttr = {};
 for (var _ai = 0; _ai < I18N_ATTR_PAIRS.length; _ai++) {
 _zhToEnAttr[I18N_ATTR_PAIRS[_ai][0]] = I18N_ATTR_PAIRS[_ai][1];
 _enToZhAttr[I18N_ATTR_PAIRS[_ai][1]] = I18N_ATTR_PAIRS[_ai][0];
 }
 var _richMapByKey = {};
 for (var _ri = 0; _ri < I18N_RICH_LIST.length; _ri++) {
 _richMapByKey[I18N_RICH_LIST[_ri].key] = I18N_RICH_LIST[_ri];
 }

 function bindRichBlocksOnce() {
 var candidates = document.querySelectorAll('h1, p, div');
 for (var i = 0; i < candidates.length; i++) {
 var el = candidates[i];
 if (el.getAttribute('data-i18n-rich')) continue;
 if (el.id === 'pillarFocusNote' || el.closest('#pillarFocusNote')) continue;
 var normTxt = (el.textContent || '').replace(/\s+/g, ' ').trim();
 for (var j = 0; j < I18N_RICH_LIST.length; j++) {
 var item = I18N_RICH_LIST[j];
 if (normTxt.indexOf(item.match_zh) === 0 && el.children.length <= 25) {
 if (!el.querySelector('div, p, ul, table, canvas')) {
 el.setAttribute('data-i18n-rich', item.key);
 break;
 }
 }
 }
 }
 }

 function syncCh1HeaderText() {
 var titleEl = document.getElementById('ch1ChartTitle');
 var subEl = document.getElementById('ch1ChartSub');
 if (!titleEl || !subEl) return;
 if (state.ch1View === 'viewA') {
 titleEl.textContent = isEn()
 ? '2026 Q1–Q3 Quarterly Revenue Split: Online Marketing vs. Transaction Services (RMB B)'
 : '2026年 Q1–Q3 分业务季度营收结构演变（¥B · 官方季报）';
 subEl.textContent = isEn()
 ? 'Online Marketing climbed steadily to RMB 59.82B (+12.1% YoY), while Transaction Services declined from RMB 56.30B (Q1) to RMB 48.52B (Q3, -11.7%)'
 : '在线营销服务稳步爬坡至 ¥598.2亿 (+12.1%)，交易服务则自 Q1 高点 ¥563.0亿连降两季至 ¥485.2亿 (-11.7%)';
 } else {
 titleEl.textContent = isEn()
 ? 'Q3 2025 vs. Q3 2026 Cost & Expense Ratio Bridge (% of Revenue)'
 : 'Q3 2025 vs Q3 2026 成本与三项费用占营收比率对比（%）';
 subEl.textContent = isEn()
 ? 'S&M ratio dropped 470 bps (28.0% → 23.3%) and Cost of Revenues fell 150 bps (43.3% → 41.8%), while R&D ratio rose +70 bps to 4.7%'
 : '营销费用率骤降 4.7pp（28.0% → 23.3%）、营业成本率降 1.5pp（43.3% → 41.8%），研发费用率逆势升至 4.7%';
 }
 }

 function syncCollapseButtonsText() {
 var btns = document.querySelectorAll('[data-collapse-target]');
 for (var i = 0; i < btns.length; i++) {
 var pid = btns[i].getAttribute('data-collapse-target');
 var panel = document.getElementById(pid);
 var isOpen = panel && panel.classList.contains('open');
 btns[i].innerHTML = isEn()
 ? (isOpen ? '<span>Hide Financial Mechanics</span> <span>⌃</span>' : '<span>Show Financial Mechanics</span> <span>⌄</span>')
 : (isOpen ? '<span>收起微观财务拆解</span> <span>⌃</span>' : '<span>展开微观财务拆解</span> <span>⌄</span>');
 }
 }

 function applyLanguage(lang, silent) {
 bindRichBlocksOnce();
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.documentElement.setAttribute('data-lang', state.lang);
 document.title = en ? DOC_TITLE_EN : DOC_TITLE_ZH;

 var zhBtn = document.getElementById('langZhBtn'), enBtn = document.getElementById('langEnBtn');
 if (zhBtn && enBtn) {
 zhBtn.classList.toggle('active', !en); enBtn.classList.toggle('active', en);
 zhBtn.setAttribute('aria-pressed', !en ? 'true' : 'false'); enBtn.setAttribute('aria-pressed', en ? 'true' : 'false');
 }

 var richNodes = document.querySelectorAll('[data-i18n-rich]');
 for (var r = 0; r < richNodes.length; r++) {
 var rEntry = _richMapByKey[richNodes[r].getAttribute('data-i18n-rich')];
 if (rEntry) richNodes[r].innerHTML = en ? rEntry.en : rEntry.zh;
 }

 var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
 var tNode;
 while ((tNode = walker.nextNode())) {
 var pEl = tNode.parentElement;
 if (!pEl || pEl.tagName === 'SCRIPT' || pEl.tagName === 'STYLE') continue;
 if (pEl.closest('#langSwitchGroup') || pEl.closest('[data-i18n-rich]') || pEl.closest('#pillarFocusNote')) continue;
 var raw = tNode.nodeValue || '', trimmed = raw.replace(/\s+/g, ' ').trim();
 if (!trimmed) continue;
 var mapped = en ? _zhToEnText[trimmed] : _enToZhText[trimmed];
 if (mapped) {
 var lead = raw.match(/^\s*/), trail = raw.match(/\s*$/);
 tNode.nodeValue = (lead ? lead[0] : '') + mapped + (trail ? trail[0] : '');
 }
 }

 var allEls = document.querySelectorAll('[placeholder], [title], [aria-label]');
 var attrNames = ['placeholder', 'title', 'aria-label'];
 for (var a = 0; a < allEls.length; a++) {
 if (allEls[a].closest('#langSwitchGroup')) continue;
 for (var k = 0; k < attrNames.length; k++) {
 var an = attrNames[k], av = allEls[a].getAttribute(an);
 if (!av) continue;
 var nextAv = en ? _zhToEnAttr[av] : _enToZhAttr[av];
 if (nextAv) allEls[a].setAttribute(an, nextAv);
 }
 }

 var pNote = document.getElementById('pillarFocusNote');
 if (pNote) pNote.innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES)[state.activePillar] + '</div>';
 syncCh1HeaderText();
 syncCollapseButtonsText();
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 safeSetStorage(STORAGE_LANG_KEY, state.lang);
 if (!silent) showToast(en ? 'Switched to English Research Edition' : '已切换至中文深度研报视图');
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIconEl = document.getElementById('appbarThemeIcon');
 if (abIconEl) {
 abIconEl.innerHTML = (state.theme === 'dark')
 ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 var sDarkBtn = document.getElementById('sideThemeDarkBtn'), sLightBtn = document.getElementById('sideThemeLightBtn');
 if (sDarkBtn && sLightBtn) {
 sDarkBtn.classList.toggle('active', state.theme === 'dark');
 sLightBtn.classList.toggle('active', state.theme === 'light');
 }
 safeSetStorage(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Mode' : '已切换至深海黑曜石护眼模式') : (isEn() ? 'Switched to Light Mode' : '已切换至浅色明亮阅读模式'));
 }

 function toggleSidebar() {
 if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
 else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
 }
 function closeMobileDrawer() { document.body.classList.remove('drawer-open'); }
 function escapeHtml(str) { return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
 function highlightMatch(text, query) {
 var safe = escapeHtml(text);
 if (!query) return safe;
 var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS, q = state.peerQuery.trim().toLowerCase();
 var filtered = activeRows.filter(function (row, idx) {
 if (state.peerFilter !== 'all' && row.category !== state.peerFilter) return false;
 if (!q) return true;
 var zhR = PEER_ROWS[idx] || row, enR = PEER_ROWS_EN[idx] || row;
 var hay = (zhR.company + ' ' + zhR.leader + ' ' + zhR.rev + ' ' + zhR.engine + ' ' + zhR.op + ' ' + zhR.net + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.rev + ' ' + enR.engine + ' ' + enR.verdict).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 if (badge) badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆企业');
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching peer records found.' : '未找到匹配的电商标杆企业记录，请更换关键词。') + '</td></tr>';
 return;
 }
 var rawQ = state.peerQuery.trim();
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
 '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
 '<td class="mono" style="font-size:0.79rem;font-weight:700;color:var(--mui-primary-lighter);">' + highlightMatch(r.rev, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.engine, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.op, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.net, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
 '</tr>';
 }).join('');
 }

 function formatCurrency(val) {
 if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
 var dripRate = state.sim.drip ? 4.5 : 0.0, totalRate = (cagr + dripRate) / 100;
 var endingValue = p * Math.pow(1 + totalRate, yrs), moic = endingValue / p, netGain = endingValue - p;
 var midYear = Math.max(1, Math.floor(yrs / 2)), midValue = p * Math.pow(1 + totalRate, midYear);

 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
 document.getElementById('simMoicVal').textContent = moic.toFixed(2) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = formatCurrency(netGain);
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint Value') : ('第 ' + midYear + ' 年中期资产节点');
 document.getElementById('simMidVal').textContent = formatCurrency(midValue);

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < presetBtns.length; i++) presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
 if (!container) return;
 var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
 var doneCount = state.checks.filter(Boolean).length, pct = Math.round((doneCount / itemsList.length) * 100);
 if (chip) chip.textContent = isEn() ? ('Verified ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
 if (bar) bar.style.width = pct + '%';

 container.innerHTML = itemsList.map(function (item, idx) {
 var isChecked = !!state.checks[idx];
 return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
 '<div style="flex:1;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + escapeHtml(item.title) + '</span><span class="mui-chip mono">' + escapeHtml(item.tag) + '</span></div><p class="check-desc">' + escapeHtml(item.desc) + '</p></div></label>';
 }).join('');
 }

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function getPalette() {
 var cs = getComputedStyle(document.documentElement), isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: cs.getPropertyValue('--chart-grid').trim() || (isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)'),
 tick: cs.getPropertyValue('--chart-tick').trim() || '#94A3B8',
 text: cs.getPropertyValue('--text-primary').trim() || '#F3F6F9',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.88)' : 'rgba(255, 255, 255, 0.94)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.08)' : 'rgba(0, 115, 230, 0.05)',
 c1: cs.getPropertyValue('--chart-c1').trim() || '#3399FF',
 c2: cs.getPropertyValue('--chart-c2').trim() || '#22C55E',
 c3: cs.getPropertyValue('--chart-c3').trim() || '#FFB74D',
 c4: cs.getPropertyValue('--chart-c4').trim() || '#A78BFA'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var rect = canvas.parentElement.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
 var tw = Math.floor(w * dpr), th = Math.floor(h * dpr);
 if (canvas.width !== tw) canvas.width = tw;
 if (canvas.height !== th) canvas.height = th;
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h / 2);
 ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h - rad);
 ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h); ctx.lineTo(x + rad, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - rad); ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y); ctx.closePath();
 }

 function topRoundedBar(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h);
 ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y); ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h); ctx.closePath();
 }

 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save();
 ctx.font = '700 10.5px "IBM Plex Mono", system-ui, sans-serif';
 var tw = ctx.measureText(text).width + 9, th = 17, bx = cx - tw / 2, by = cy - th / 2;
 ctx.fillStyle = pal.pillBg; roundRectPath(ctx, bx, by, tw, th, 5); ctx.fill();
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return;
 ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) {
 var xc = (pts[i].x + pts[i + 1].x) / 2;
 ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
 }
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var metaEl = document.getElementById('ch1AxisMeta'), leg1 = document.getElementById('ch1Leg1'), leg2 = document.getElementById('ch1Leg2');

 if (state.ch1View === 'viewA') {
 if (metaEl) metaEl.innerHTML = isEn() ? '<span style="color:var(--chart-c1);">■ Blue: Online Marketing (RMB B)</span><span style="color:var(--chart-c2);">■ Green: Transaction Services (RMB B)</span>' : '<span style="color:var(--chart-c1);">■ 蓝色：在线营销服务及其他 (¥B)</span><span style="color:var(--chart-c2);">■ 绿色：交易服务收入 (¥B)</span>';
 if (leg1) leg1.textContent = isEn() ? 'Online Marketing & Others (RMB B)' : '在线营销服务及其他 (Online Marketing · ¥B)';
 if (leg2) leg2.textContent = isEn() ? 'Transaction Services (RMB B)' : '交易服务收入 (Transaction Services · ¥B)';

 var padA = { top: 30, right: 18, bottom: 44, left: 52 }, pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
 var labelsA = ['Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
 var subA = ['+12% Total', '+11% Total', '+8.1% Total', '+0.1% Total'];
 var mktg = [60.01, 49.90, 57.60, 59.82];
 var tx = [63.90, 56.30, 54.70, 48.52];
 var maxY = 75.0;

 for (var g = 0; g <= 4; g++) {
 var val = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText('¥' + val.toFixed(0) + 'B', padA.left - 8, gy);
 }

 var stepA = pwA / labelsA.length, barW = Math.min(40, Math.max(16, stepA * 0.27));
 for (var i = 0; i < labelsA.length; i++) {
 var cx = padA.left + stepA * (i + 0.5), isHov = hoverState.chartCh1 === i;
 if (isHov) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padA.left + stepA * i + 4, padA.top, stepA - 8, phA, 8); ctx.fill(); }
 var y1 = padA.top + phA - (mktg[i] / maxY) * phA, y2 = padA.top + phA - (tx[i] / maxY) * phA;

 if (state.ch1Series.s1) {
 var h1 = (mktg[i] / maxY) * phA, x1 = state.ch1Series.s2 ? (cx - barW - 3) : (cx - barW / 2);
 var grad1 = ctx.createLinearGradient(0, y1, 0, padA.top + phA);
 grad1.addColorStop(0, '#3399FF'); grad1.addColorStop(1, '#0066CC');
 ctx.fillStyle = grad1; topRoundedBar(ctx, x1, y1, barW, h1, 5); ctx.fill();
 if (isHov) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.4; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + mktg[i].toFixed(1) + 'B', x1 + barW / 2, y1 - 12, pal.c1, pal);
 }
 if (state.ch1Series.s2) {
 var h2 = (tx[i] / maxY) * phA, x2 = state.ch1Series.s1 ? (cx + 3) : (cx - barW / 2);
 var grad2 = ctx.createLinearGradient(0, y2, 0, padA.top + phA);
 grad2.addColorStop(0, '#34D399'); grad2.addColorStop(1, '#16A34A');
 ctx.fillStyle = grad2; topRoundedBar(ctx, x2, y2, barW, h2, 5); ctx.fill();
 if (isHov) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.4; ctx.stroke(); }
 var b2Y = (state.ch1Series.s1 && Math.abs(y2 - y1) < 16) ? (y2 - 22) : (y2 - 12);
 drawValueBadge(ctx, '¥' + tx[i].toFixed(1) + 'B', x2 + barW / 2, b2Y, pal.c2, pal);
 }

 ctx.fillStyle = pal.text; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(labelsA[i], cx, padA.top + phA + 19);
 ctx.fillStyle = pal.tick; ctx.font = '600 10px "IBM Plex Mono", sans-serif';
 ctx.fillText(subA[i], cx, padA.top + phA + 34);

 hitRegions.chartCh1.push({
 idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 36,
 html: isEn()
 ? ('<strong>' + labelsA[i] + ' Revenue Split</strong><br/>• Online Marketing: <strong>RMB ' + mktg[i].toFixed(2) + 'B</strong><br/>• Transaction Services: <strong>RMB ' + tx[i].toFixed(2) + 'B</strong><br/>• Total Quarter Sales: <strong>RMB ' + (mktg[i] + tx[i]).toFixed(2) + 'B</strong>')
 : ('<strong>' + labelsA[i] + ' 分业务营收</strong><br/>• 在线营销服务：<strong>¥' + mktg[i].toFixed(2) + 'B</strong><br/>• 交易服务收入：<strong>¥' + tx[i].toFixed(2) + 'B</strong><br/>• 单季总营收：<strong>¥' + (mktg[i] + tx[i]).toFixed(2) + 'B</strong>')
 });
 }
 } else {
 if (metaEl) metaEl.innerHTML = isEn() ? '<span style="color:var(--chart-c1);">■ Blue: Q3 2025 (% of Revenue)</span><span style="color:var(--chart-c2);">■ Green: Q3 2026 (% of Revenue)</span>' : '<span style="color:var(--chart-c1);">■ 蓝色：Q3 2025 占营收比例 (%)</span><span style="color:var(--chart-c2);">■ 绿色：Q3 2026 占营收比例 (%)</span>';
 if (leg1) leg1.textContent = isEn() ? 'Q3 2025 Cost & Expense Ratios (%)' : 'Q3 2025 成本与费用率 (%)';
 if (leg2) leg2.textContent = isEn() ? 'Q3 2026 Cost & Expense Ratios (%)' : 'Q3 2026 成本与费用率 (%)';

 var padB = { top: 30, right: 18, bottom: 44, left: 48 }, pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var catsB = isEn() ? ['Cost of Rev', 'Sales & Mktg', 'R&D', 'G&A'] : ['营业成本率', '销售营销费率', '研发费用率', '管理费用率'];
 var r25 = [43.26, 28.01, 4.00, 1.62];
 var r26 = [41.76, 23.35, 4.67, 1.46];
 var maxR = 52.0;

 for (var j = 0; j <= 4; j++) {
 var rv = (maxR / 4) * j, gyB = padB.top + phB - (j / 4) * phB;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padB.left, gyB); ctx.lineTo(padB.left + pwB, gyB); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText(rv.toFixed(0) + '%', padB.left - 8, gyB);
 }

 var stepB = pwB / catsB.length, barWB = Math.min(40, Math.max(16, stepB * 0.27));
 for (var k = 0; k < catsB.length; k++) {
 var cxB = padB.left + stepB * (k + 0.5), isHovB = hoverState.chartCh1 === k;
 if (isHovB) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padB.left + stepB * k + 4, padB.top, stepB - 8, phB, 8); ctx.fill(); }
 var y25 = padB.top + phB - (r25[k] / maxR) * phB, y26 = padB.top + phB - (r26[k] / maxR) * phB;

 if (state.ch1Series.s1) {
 var h25 = (r25[k] / maxR) * phB, x25 = state.ch1Series.s2 ? (cxB - barWB - 3) : (cxB - barWB / 2);
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, x25, y25, barWB, h25, 5); ctx.fill();
 drawValueBadge(ctx, r25[k].toFixed(1) + '%', x25 + barWB / 2, y25 - 12, pal.c1, pal);
 }
 if (state.ch1Series.s2) {
 var h26 = (r26[k] / maxR) * phB, x26 = state.ch1Series.s1 ? (cxB + 3) : (cxB - barWB / 2);
 ctx.fillStyle = pal.c2; topRoundedBar(ctx, x26, y26, barWB, h26, 5); ctx.fill();
 var bY26 = (state.ch1Series.s1 && Math.abs(y26 - y25) < 16) ? (y26 - 22) : (y26 - 12);
 drawValueBadge(ctx, r26[k].toFixed(1) + '%', x26 + barWB / 2, bY26, pal.c2, pal);
 }

 ctx.fillStyle = pal.text; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(catsB[k], cxB, padB.top + phB + 22);

 var diff = r26[k] - r25[k];
 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 30,
 html: '<strong>' + catsB[k] + '</strong><br/>• Q3 2025: <strong>' + r25[k].toFixed(2) + '%</strong><br/>• Q3 2026: <strong>' + r26[k].toFixed(2) + '%</strong> (' + (diff >= 0 ? '+' : '') + diff.toFixed(2) + 'pp)'
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = isEn() ? ['Talent Efficiency', 'Operating Margin', 'Cash & Balance Sheet', 'Domestic Ad Moat', 'Global/Cloud Growth'] : ['人均人效密度', '营业利润率弹性', '现金储备厚度', '国内广告护城河', '全球/云增量韧性'];
 var pillarAxisMap = [3, 4, 1, 0], highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];

 var series = [
 { key: 'pdd', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.6, 9.7, 9.4, 7.2] },
 { key: 'baba', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [7.6, 7.2, 8.4, 8.6, 9.3] },
 { key: 'amzn', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [6.8, 7.8, 7.0, 8.8, 9.7] }
 ];

 var cx = w / 2, cy = h / 2 + 8, sidePad = w < 420 ? 86 : 108, radius = Math.max(62, Math.min((w - sidePad * 2) / 2, h * 0.35)), total = axes.length;
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1; ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total, px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.closePath(); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '600 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
 ctx.fillText(String(ring), cx + 4, cy - r);
 }

 for (var a = 0; a < total; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total, ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius, isHi = a === highlightedAxis;
 ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.9 : 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = isHi ? pal.c1 : pal.text; ctx.font = (isHi ? '800 ' : '600 ') + '11.5px system-ui, sans-serif'; ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);

 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
 html: isEn()
 ? ('<strong>' + axes[a] + '</strong><br/>• PDD: <strong>' + series[0].vals[a].toFixed(1) + '</strong> · BABA: <strong>' + series[1].vals[a].toFixed(1) + '</strong> · AMZN: <strong>' + series[2].vals[a].toFixed(1) + '</strong>')
 : ('<strong>' + axes[a] + ' (10分制)</strong><br/>• 拼多多：<strong>' + series[0].vals[a].toFixed(1) + '</strong> · 阿里：<strong>' + series[1].vals[a].toFixed(1) + '</strong> · 亚马逊：<strong>' + series[2].vals[a].toFixed(1) + '</strong>')
 });
 }

 for (var s = 0; s < series.length; s++) {
 var item = series[s];
 if (!state.radarSeries[item.key]) continue;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total, dist = (item.vals[idx] / 10) * radius;
 var vx = cx + Math.cos(theta) * dist, vy = cy + Math.sin(theta) * dist;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
 for (var pIdx = 0; pIdx < total; pIdx++) {
 var pTheta = -Math.PI / 2 + (pIdx * 2 * Math.PI) / total, pDist = (item.vals[pIdx] / 10) * radius;
 var pX = cx + Math.cos(pTheta) * pDist, pY = cy + Math.sin(pTheta) * pDist;
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pX, pY, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = item.color; ctx.beginPath(); ctx.arc(pX, pY, pIdx === highlightedAxis ? 4.4 : 3.5, 0, Math.PI * 2); ctx.fill();
 }
 }
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];

 var items = isEn() ? [
 { label: 'Q3 2026 Consolidated Gross Margin', val: 58.2, cStart: '#34D399', cEnd: '#16A34A', sub: 'RMB 63.10B / 108.34B (+1.5pp YoY)', note: 'Higher-margin ad mix lifted gross margin by 150 bps' },
 { label: 'Q3 2026 Non-GAAP Operating Margin', val: 30.1, cStart: '#3399FF', cEnd: '#0073E6', sub: 'RMB 32.64B (+20.5% YoY)', note: 'Returned above 30% on -16.6% S&M cut' },
 { label: 'Q3 2026 GAAP Operating Margin', val: 28.8, cStart: '#60A5FA', cEnd: '#2563EB', sub: 'RMB 31.16B (+5.7pp YoY)', note: 'Strongest operating margin rebound across 2026' },
 { label: 'Q3 2026 GAAP Net Profit Margin', val: 27.3, cStart: '#38BDF8', cEnd: '#0284C7', sub: 'RMB 29.54B (vs 27.1% prior yr)', note: 'Offset by lower interest income and higher tax rate (18.2%)' },
 { label: 'Q3 2026 Sales & Marketing Expense Ratio', val: 23.3, cStart: '#FBBF24', cEnd: '#D97706', sub: 'RMB 25.30B (-4.7pp YoY)', note: 'Primary driver of Q3 earnings beat' },
 { label: 'Q3 2026 R&D Expense Ratio', val: 4.7, cStart: '#A78BFA', cEnd: '#7C3AED', sub: 'RMB 5.06B (+0.7pp YoY)', note: 'Continued investment in logistics tech & governance' }
 ] : [
 { label: 'Q3 2026 集团综合毛利率 (Gross Margin)', val: 58.2, cStart: '#34D399', cEnd: '#16A34A', sub: '¥631.0亿 / ¥1,083.4亿 (+1.5pp)', note: '高毛利在线营销占比升至 55.2%，拉动毛利率同比扩张 150bps' },
 { label: 'Q3 2026 Non-GAAP 营业利润率', val: 30.1, cStart: '#3399FF', cEnd: '#0073E6', sub: '¥326.4亿 (+20.5% YoY)', note: '剔除股权激励 ¥14.8亿后重返 30% 以上高盈利区间' },
 { label: 'Q3 2026 GAAP 营业利润率 (Op Margin)', val: 28.8, cStart: '#60A5FA', cEnd: '#2563EB', sub: '¥311.6亿 (+5.7pp YoY)', note: '营销费率骤降释放巨大经营杠杆' },
 { label: 'Q3 2026 GAAP 归母净利率 (Net Margin)', val: 27.3, cStart: '#38BDF8', cEnd: '#0284C7', sub: '¥295.4亿 (vs 去年 27.1%)', note: '受净利息收入降 37% 及有效税率升至 18.2% 影响' },
 { label: 'Q3 2026 销售与营销费用率 (S&M Ratio)', val: 23.3, cStart: '#FBBF24', cEnd: '#D97706', sub: '¥253.0亿 (-4.7pp YoY)', note: '单季费用大减 ¥50.3亿，是盈利超预期的最大胜负手' },
 { label: 'Q3 2026 研发费用率 (R&D Ratio)', val: 4.7, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '¥50.6亿 (+0.7pp YoY)', note: '逆势加大供应链数字化与合规风控技术投入' }
 ];

 var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 68;
 for (var g = 0; g <= 4; g++) {
 var xVal = Math.round((maxX / 4) * g), gx = pad.left + (xVal / maxX) * pw;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = g === 0 ? 'left' : (g === 4 ? 'right' : 'center'); ctx.textBaseline = 'alphabetic';
 ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
 }
 var rowH = ph / items.length, targetX = pad.left + (25 / maxX) * pw;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(targetX, pad.top + 4); ctx.lineTo(targetX, pad.top + rowH * 4 - 4); ctx.stroke(); ctx.restore();

 for (var i = 0; i < items.length; i++) {
 var rowTop = pad.top + rowH * i;
 if (hoverState.chartBars === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left - 6, rowTop + 2, pw + 12, rowH - 4, 8); ctx.fill(); }
 var labelY = rowTop + Math.max(15, rowH * 0.34), barY = rowTop + Math.max(22, rowH * 0.50), barH = Math.min(15, Math.max(11, rowH * 0.26));
 var bw = Math.max(8, (items[i].val / maxX) * pw);

 ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(items[i].label, pad.left, labelY);
 var valStr = items[i].val.toFixed(1) + '%';
 ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? items[i].cStart : items[i].cEnd; ctx.textAlign = 'right';
 ctx.fillText(valStr, pad.left + pw, labelY);
 if (w >= 560) {
 var valW = ctx.measureText(valStr).width + 10;
 ctx.font = '500 11px "IBM Plex Mono", system-ui, sans-serif'; ctx.fillStyle = pal.tick;
 ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
 }
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
 barGrad.addColorStop(0, items[i].cStart); barGrad.addColorStop(1, items[i].cEnd);
 ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();

 hitRegions.chartBars.push({
 idx: i, x: pad.left, y: rowTop, w: pw, h: rowH,
 html: '<strong>' + items[i].label + ': ' + items[i].val.toFixed(1) + '%</strong><br/>• ' + items[i].sub + '<br/>• ' + items[i].note
 });
 }
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];

 var periods = ['FY2024', 'FY2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
 var subP = isEn() ? ['(Peak Yr)', '(Relief Phase)', '(Tx +20%)', '(Other Loss)', '(S&M Cut)'] : ['(利润峰值)', '(让利商家)', '(交易+20%)', '(营业外波动)', '(费控反弹)'];
 var netB = [112.43, 99.36, 12.50, 27.18, 29.54];
 var opMargin = [27.5, 21.9, 18.5, 24.7, 28.8];

 var pad = { top: 26, right: 50, bottom: 44, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var minNet = 0, maxNet = 130.0, minGm = 14.0, maxGm = 33.0;

 for (var g = 0; g <= 4; g++) {
 var ratio = g / 4, gy = pad.top + ph - ratio * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 var nTick = minNet + ratio * (maxNet - minNet), mTick = minGm + ratio * (maxGm - minGm);
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('¥' + nTick.toFixed(0) + 'B', pad.left - 7, gy);
 ctx.textAlign = 'left'; ctx.fillStyle = pal.c2; ctx.fillText(mTick.toFixed(1) + '%', pad.left + pw + 7, gy);
 }

 var targetY = pad.top + ph - ((25.0 - minGm) / (maxGm - minGm)) * ph;
 ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(pad.left, targetY); ctx.lineTo(pad.left + pw, targetY); ctx.stroke(); ctx.restore();

 var step = pw / periods.length, barW = Math.min(46, Math.max(24, step * 0.42)), linePts = [];
 for (var i = 0; i < periods.length; i++) {
 var cx = pad.left + step * (i + 0.5), isHov = hoverState.chartEps === i;
 if (isHov) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 6); ctx.fill(); }

 if (state.epsSeries.eps) {
 var bh = ((netB[i] - minNet) / (maxNet - minNet)) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
 var eGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
 eGrad.addColorStop(0, i === 4 ? '#66B2FF' : '#3399FF'); eGrad.addColorStop(1, '#0066CC');
 ctx.fillStyle = eGrad; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
 if (isHov) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 if (bh > 20) {
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText('¥' + netB[i].toFixed(1) + 'B', cx, by + 16);
 }
 }

 var oy = pad.top + ph - ((opMargin[i] - minGm) / (maxGm - minGm)) * ph;
 linePts.push({ x: cx, y: oy, gm: opMargin[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(periods[i], cx, pad.top + ph + 19);
 ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif'; ctx.fillText(subP[i], cx, pad.top + ph + 33);

 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
 html: '<strong>' + periods[i] + ' ' + subP[i] + '</strong><br/>• GAAP Net Income: <strong>¥' + netB[i].toFixed(2) + 'B</strong><br/>• GAAP Operating Margin: <strong>' + opMargin[i].toFixed(1) + '%</strong>'
 });
 }

 if (state.epsSeries.oci) {
 ctx.save(); drawSmoothLine(ctx, linePts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
 for (var m = 0; m < linePts.length; m++) {
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 6, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, linePts[m].gm.toFixed(1) + '%', linePts[m].x, linePts[m].y - 16, pal.c2, pal);
 }
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];

 var p = state.sim.principal, yrs = state.sim.years;
 var priceRate = state.sim.priceCagr / 100, totalRate = (state.sim.priceCagr + (state.sim.drip ? 4.5 : 0)) / 100;
 var totalSeries = [], priceOnlySeries = [];
 for (var y = 0; y <= yrs; y++) { totalSeries.push(p * Math.pow(1 + totalRate, y)); priceOnlySeries.push(p * Math.pow(1 + priceRate, y)); }

 var maxVal = Math.max(totalSeries[yrs], priceOnlySeries[yrs], p * 1.2) * 1.08;
 var pad = { top: 20, right: 20, bottom: 28, left: 60 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 7, gy);
 }

 var stepX = pw / yrs, basePts = [], totalPts = [];
 for (var k = 0; k <= yrs; k++) {
 basePts.push({ x: pad.left + stepX * k, y: pad.top + ph - (priceOnlySeries[k] / maxVal) * ph });
 totalPts.push({ x: pad.left + stepX * k, y: pad.top + ph - (totalSeries[k] / maxVal) * ph });
 }

 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; drawSmoothLine(ctx, basePts); ctx.stroke(); ctx.restore();
 ctx.save(); drawSmoothLine(ctx, totalPts); ctx.lineTo(totalPts[totalPts.length - 1].x, pad.top + ph); ctx.lineTo(totalPts[0].x, pad.top + ph); ctx.closePath();
 var areaGrad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 areaGrad.addColorStop(0, 'rgba(51, 153, 255, 0.30)'); areaGrad.addColorStop(1, 'rgba(51, 153, 255, 0.01)');
 ctx.fillStyle = areaGrad; ctx.fill(); ctx.restore();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; drawSmoothLine(ctx, totalPts); ctx.stroke();

 for (var t = 0; t <= yrs; t++) {
 var tx = totalPts[t].x;
 if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText('Y' + t, tx, pad.top + ph + 18);
 }
 if (hoverState.chartSim === t) {
 ctx.save(); ctx.strokeStyle = pal.c1; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(tx, pad.top); ctx.lineTo(tx, pad.top + ph); ctx.stroke(); ctx.restore();
 ctx.fillStyle = pal.c1; ctx.beginPath(); ctx.arc(tx, totalPts[t].y, 5, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, formatCurrency(totalSeries[t]), Math.min(pad.left + pw - 34, Math.max(pad.left + 34, tx)), Math.max(pad.top + 12, totalPts[t].y - 14), pal.c1, pal);
 }
 hitRegions.chartSim.push({
 idx: t, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22,
 html: isEn()
 ? ('<strong>Year ' + t + '</strong><br/>• With Buybacks/Divs: <strong>' + formatCurrency(totalSeries[t]) + '</strong><br/>• Base Growth Only: <strong>' + formatCurrency(priceOnlySeries[t]) + '</strong>')
 : ('<strong>第 ' + t + ' 年资产推演</strong><br/>• 含回购/分红释放：<strong>' + formatCurrency(totalSeries[t]) + '</strong><br/>• 仅内生盈利增长：<strong>' + formatCurrency(priceOnlySeries[t]) + '</strong>')
 });
 }
 }

 function renderAllCharts() {
 drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart();
 }

 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
 function handlePointer(clientX, clientY) {
 var rect = canvas.getBoundingClientRect(), x = clientX - rect.left, y = clientY - rect.top, regions = hitRegions[canvasId] || [], matched = null;
 for (var i = 0; i < regions.length; i++) { var r = regions[i]; if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; } }
 var nextIdx = matched ? matched.idx : -1;
 if (hoverState[canvasId] !== nextIdx) { hoverState[canvasId] = nextIdx; if (redrawMap[canvasId]) redrawMap[canvasId](); }
 if (matched) {
 tip.innerHTML = matched.html; tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 300, Math.max(12, clientX + 14)) + 'px';
 tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, clientY - tip.offsetHeight - 12)) + 'px';
 } else tip.style.display = 'none';
 }
 canvas.addEventListener('mousemove', function (e) { handlePointer(e.clientX, e.clientY); });
 canvas.addEventListener('touchstart', function (e) { if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
 canvas.addEventListener('mouseleave', function () { if (hoverState[canvasId] !== -1) { hoverState[canvasId] = -1; if (redrawMap[canvasId]) redrawMap[canvasId](); } tip.style.display = 'none'; });
 }

 function exportStandaloneHtml() {
 var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob), link = document.createElement('a');
 link.href = url; link.download = 'PDD_Q3_2026_Earnings_Analysis.html';
 document.body.appendChild(link); link.click(); document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast(isEn() ? 'Exported PDD_Q3_2026_Earnings_Analysis.html' : '已导出独立网页 PDD_Q3_2026_Earnings_Analysis.html');
 }

 function init() {
 var savedTheme = safeGetStorage(STORAGE_THEME_KEY);
 if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
 var savedLang = safeGetStorage(STORAGE_LANG_KEY);
 if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;
 var savedChecks = safeGetStorage(STORAGE_CHECK_KEY);
 if (savedChecks) { try { var parsed = JSON.parse(savedChecks); if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) state.checks = parsed.map(Boolean); } catch (e) {} }

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
 document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
 document.getElementById('sideThemeLightBtn').addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn').addEventListener('click', function () { applyTheme('dark', false); });
 document.getElementById('sideExportBtn')?.addEventListener('click', exportStandaloneHtml);
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

 var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
 for (var t = 0; t < tocLinks.length; t++) tocLinks[t].addEventListener('click', closeMobileDrawer);

 var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase(), activeJump = isEn() ? QUICK_JUMP_EN : QUICK_JUMP_INDEX;
 var list = activeJump.filter(function (item, idx) {
 var zhIt = QUICK_JUMP_INDEX[idx] || item, enIt = QUICK_JUMP_EN[idx] || item;
 return !kw || (zhIt.title + ' ' + zhIt.sub + ' ' + enIt.title + ' ' + enIt.sub).toLowerCase().indexOf(kw) !== -1;
 });
 jumpPop.innerHTML = list.length ? list.map(function (item) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + item.sec + '"><span class="quick-jump-item-title">' + escapeHtml(item.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(item.sub) + '</span></button>';
 }).join('') : '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">No match</div>';
 jumpPop.classList.add('open');
 }
 jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
 jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
 jumpPop.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-jump-sec]');
 if (!btn) return;
 var secEl = document.getElementById(btn.getAttribute('data-jump-sec'));
 if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
 else if (e.key === 'Escape') { jumpPop.classList.remove('open'); closeMobileDrawer(); }
 });

 var ch1Btns = document.querySelectorAll('[data-ch1-view]');
 for (var c = 0; c < ch1Btns.length; c++) {
 ch1Btns[c].addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 syncCh1HeaderText(); drawCh1Chart();
 });
 }

 var collapseBtns = document.querySelectorAll('[data-collapse-target]');
 for (var m = 0; m < collapseBtns.length; m++) {
 collapseBtns[m].addEventListener('click', function () {
 var panel = document.getElementById(this.getAttribute('data-collapse-target'));
 if (panel) { panel.classList.toggle('open'); syncCollapseButtonsText(); }
 });
 }

 var pillarCards = document.querySelectorAll('[data-pillar]');
 for (var p = 0; p < pillarCards.length; p++) {
 pillarCards[p].addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 for (var k = 0; k < pillarCards.length; k++) pillarCards[k].classList.toggle('active', k === idx);
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[idx] + '</div>';
 drawRadarChart();
 });
 }

 var radarPills = document.querySelectorAll('[data-radar-key]');
 for (var r = 0; r < radarPills.length; r++) {
 radarPills[r].addEventListener('click', function () {
 var key = this.getAttribute('data-radar-key');
 state.radarSeries[key] = !state.radarSeries[key];
 if (!state.radarSeries.pdd && !state.radarSeries.baba && !state.radarSeries.amzn) state.radarSeries[key] = true;
 this.classList.toggle('muted', !state.radarSeries[key]);
 drawRadarChart();
 });
 }

 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 var peerFilterBtns = document.querySelectorAll('[data-peer-filter]');
 for (var pf = 0; pf < peerFilterBtns.length; pf++) {
 peerFilterBtns[pf].addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 for (var x = 0; x < peerFilterBtns.length; x++) peerFilterBtns[x].classList.toggle('active', peerFilterBtns[x] === this);
 renderPeerTable();
 });
 }

 var pSlider = document.getElementById('simPrincipalSlider'), ySlider = document.getElementById('simYearsSlider');
 var cSlider = document.getElementById('simCagrSlider'), dToggle = document.getElementById('simDripToggle');
 pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 ySlider.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 10; state.sim.preset = ''; updateSimulatorUI(); });
 cSlider.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
 dToggle.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var pb = 0; pb < presetBtns.length; pb++) {
 presetBtns[pb].addEventListener('click', function () {
 var key = this.getAttribute('data-preset'), cfg = PRESETS[key];
 if (!cfg) return;
 state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = key;
 pSlider.value = String(cfg.principal); ySlider.value = String(cfg.years); cSlider.value = String(cfg.priceCagr); dToggle.checked = cfg.drip;
 updateSimulatorUI();
 });
 }

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var input = e.target.closest('[data-check-input]');
 if (!input) return;
 state.checks[parseInt(input.getAttribute('data-check-input'), 10)] = !!input.checked;
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast(isEn() ? 'Checked all 6 criteria' : '已勾选全部 6 项核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast(isEn() ? 'Reset to baseline (50%)' : '核查清单已恢复默认基准状态 (50%)');
 });

 function updateScrollProgress() {
 var docEl = document.documentElement, scrollTop = window.scrollY || docEl.scrollTop || 0;
 var maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) + '%';
 }
 window.addEventListener('scroll', updateScrollProgress, { passive: true });
 updateScrollProgress();

 if ('IntersectionObserver' in window) {
 var secObserver = new IntersectionObserver(function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 var id = entry.target.id;
 for (var i = 0; i < tocLinks.length; i++) tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === id);
 }
 });
 }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
 for (var s = 0; s <= 7; s++) { var sn = document.getElementById('sec-0' + s); if (sn) secObserver.observe(sn); }
 }

 wireCanvasTooltip('chartCh1'); wireCanvasTooltip('chartRadar'); wireCanvasTooltip('chartBars'); wireCanvasTooltip('chartEps'); wireCanvasTooltip('chartSim');

 var ch1SeriesBtns = document.querySelectorAll('[data-ch1-series]');
 for (var csIdx = 0; csIdx < ch1SeriesBtns.length; csIdx++) {
 ch1SeriesBtns[csIdx].addEventListener('click', function () {
 var sk = this.getAttribute('data-ch1-series');
 state.ch1Series[sk] = !state.ch1Series[sk];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
 this.classList.toggle('muted', !state.ch1Series[sk]);
 drawCh1Chart();
 });
 }

 var epsSeriesBtns = document.querySelectorAll('[data-eps-series]');
 for (var esIdx = 0; esIdx < epsSeriesBtns.length; esIdx++) {
 epsSeriesBtns[esIdx].addEventListener('click', function () {
 var ek = this.getAttribute('data-eps-series');
 state.epsSeries[ek] = !state.epsSeries[ek];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[ek] = true;
 this.classList.toggle('muted', !state.epsSeries[ek]);
 drawEpsComboChart();
 });
 }

 var resizeTimer = null;
 function scheduleRedraw() { if (resizeTimer) clearTimeout(resizeTimer); resizeTimer = setTimeout(renderAllCharts, 60); }
 window.addEventListener('resize', scheduleRedraw);
 if ('ResizeObserver' in window) { var mainEl = document.querySelector('.main-content'); if (mainEl) new ResizeObserver(scheduleRedraw).observe(mainEl); }
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 