
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_CHECK_KEY = 'brk_culture_checklist_v1';
      var DOC_TITLE_ZH = '伯克希尔·哈撒韦 Berkshire Hathaway (BRK.B) 企业文化与治理架构深度研究报告 | 数据中心';
      var DOC_TITLE_EN = 'Berkshire Hathaway (BRK.B) Corporate Culture & Governance Deep Dive | Research Hub';

      var I18N_RICH_LIST = [{"key": "brk_r00", "match_zh": "伯克希尔·哈撒韦 Berkshire Hathaway 企业文化深度研究报告：", "zh": "伯克希尔·哈撒韦 Berkshire Hathaway 企业文化深度研究报告：<span class=\"gradient-accent\">无官僚分权联邦、声誉铁律与跨越六十年的制度化复利机器</span>", "en": "Berkshire Hathaway Corporate Culture Deep Dive: <span class=\"gradient-accent\">Bureaucracy-Free Federal Autonomy, Reputation Ironclad &amp; 60-Year Compounding Machine</span>"}, {"key": "brk_r01", "match_zh": "如果说史蒂夫·乔布斯以“端到端垂直集权”定义了消费科技的极限", "zh": "如果说史蒂夫·乔布斯以“端到端垂直集权”定义了消费科技的极限，那么沃伦·巴菲特（Warren Buffett）与查理·芒格（Charlie Munger）缔造的<strong>伯克希尔·哈撒韦（Berkshire Hathaway）</strong>则展示了另一种截然不同却同样封神的组织范式——<strong>“经营权极端下放（几乎接近放任不管）+ 资本配置权绝对集中”</strong>的无官僚联邦制 <a class=\"cite-link\" href=\"https://buffett.cnbc.com/video/1998/05/04/afternoon-session---1998-berkshire-hathaway-annual-meeting.html\" target=\"_blank\" rel=\"noopener noreferrer\">1998 股东大会实录 ↗</a>。 坐落于内布拉斯加州奥马哈的集团总部仅有 <a class=\"cite-link\" href=\"https://www.good-investing.net/berkshire-hathaway-annual-meeting/transcripts/2025-transcript/\" target=\"_blank\" rel=\"noopener noreferrer\">27 名员工 ↗</a>（无总部法务部、人力资源部、公关部或战略企划部），却统御着逾 60 家全资运营子公司与约 <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">38.78万–39.24万名员工 ↗</a>，在 2025 财年创造出 <a class=\"cite-link\" href=\"https://www.businesswire.com/news/home/20260228505745/en/Berkshire-Hathaway-Inc.-News-Release\" target=\"_blank\" rel=\"noopener noreferrer\">$3,714.44亿总营收 ↗</a> 与 <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/1067983/000119312526085801/d117283dex991.htm\" target=\"_blank\" rel=\"noopener noreferrer\">$444.86亿营业利润 ↗</a>（2024 年更达历史峰值 $474.37亿）。自 1965 年至 2025 年，伯克希尔以 <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/2025ar/2025ar.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">19.7% 年化复合收益率 ↗</a> 碾压标普 500 指数的 10.5%，并在 2026 年顺利完成由 <a class=\"cite-link\" href=\"https://myequityresearch.com/greg-abel-and-berkshire-hathaways-a-track-record-built-for-continuity-and-growth/\" target=\"_blank\" rel=\"noopener noreferrer\">格雷格·阿贝尔（Greg Abel）接任 CEO ↗</a>、霍华德·巴菲特出任非执行董事长守护文化的历史性交接。", "en": "If Steve Jobs defined consumer tech through end-to-end functional centralization, Warren Buffett and Charlie Munger's <strong>Berkshire Hathaway</strong> proved an equally iconic yet opposite model: <strong>Extreme Operational Decentralization + Absolute Capital-Allocation Centralization</strong> <a class=\"cite-link\" href=\"https://buffett.cnbc.com/video/1998/05/04/afternoon-session---1998-berkshire-hathaway-annual-meeting.html\" target=\"_blank\" rel=\"noopener noreferrer\">1998 AGM Archive ↗</a>. Its Omaha headquarters employs just <a class=\"cite-link\" href=\"https://www.good-investing.net/berkshire-hathaway-annual-meeting/transcripts/2025-transcript/\" target=\"_blank\" rel=\"noopener noreferrer\">27 people ↗</a> (no central legal, HR, PR, or strategy departments), yet oversees 60+ wholly owned subsidiaries and <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">~387.8k–392.4k employees ↗</a>, generating <a class=\"cite-link\" href=\"https://www.businesswire.com/news/home/20260228505745/en/Berkshire-Hathaway-Inc.-News-Release\" target=\"_blank\" rel=\"noopener noreferrer\">$371.44B in FY25 revenue ↗</a> and <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/1067983/000119312526085801/d117283dex991.htm\" target=\"_blank\" rel=\"noopener noreferrer\">$44.49B in operating earnings ↗</a> ($47.44B peak in FY24). From 1965 to 2025, Berkshire compounded at <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/2025ar/2025ar.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">19.7% CAGR ↗</a> vs. 10.5% for the S&amp;P 500, and in 2026 seamlessly transitioned to <a class=\"cite-link\" href=\"https://myequityresearch.com/greg-abel-and-berkshire-hathaways-a-track-record-built-for-continuity-and-growth/\" target=\"_blank\" rel=\"noopener noreferrer\">CEO Greg Abel ↗</a> with Howard Buffett as non-executive Chairman safeguarding its culture."}, {"key": "brk_r02", "match_zh": "1965–2025 年化超额收益达 +9.2 个百分点", "zh": "1965–2025 年化超额收益达 +9.2 个百分点；1964–2024 累计总回报高达 5,502,284% <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/2025ar/2025ar.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">2025 Annual Report ↗</a>。", "en": "+9.2pp annualized alpha over 1965–2025; 1964–2024 cumulative gain reached 5,502,284% <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/2025ar/2025ar.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">2025 Annual Report ↗</a>."}, {"key": "brk_r03", "match_zh": "总部仅 27 名员工却覆盖全集团", "zh": "总部仅 27 名员工却覆盖全集团 ~38.78万–39.24万名员工，彻底消灭大企业总部官僚主义内耗 <a class=\"cite-link\" href=\"https://www.good-investing.net/berkshire-hathaway-annual-meeting/transcripts/2025-transcript/\" target=\"_blank\" rel=\"noopener noreferrer\">2025 AGM Transcript ↗</a>。", "en": "Just 27 Omaha HQ staff oversee ~387.8k–392.4k field employees, eliminating conglomerate overhead bloat <a class=\"cite-link\" href=\"https://www.good-investing.net/berkshire-hathaway-annual-meeting/transcripts/2025-transcript/\" target=\"_blank\" rel=\"noopener noreferrer\">2025 AGM Transcript ↗</a>."}, {"key": "brk_r04", "match_zh": "剔除账面股票公允价值波动后", "zh": "剔除账面股票公允价值波动后，FY25 营业利润达 $444.86亿（FY24 为 $474.37亿，近五年均值 $375亿） <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/1067983/000119312526085801/d117283dex991.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC EX-99.1 ↗</a>。", "en": "Excluding unrealized equity noise, FY25 operating earnings hit $44.49B (FY24: $47.44B; 5-yr avg: $37.5B) <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/1067983/000119312526085801/d117283dex991.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC EX-99.1 ↗</a>."}, {"key": "brk_r05", "match_zh": "保险浮存金由 1970 年 $3,900万", "zh": "保险浮存金由 1970 年 $3,900万扩至 2025 年末 $1,760亿（2026Q3 达 $1,785亿） <a class=\"cite-link\" href=\"https://sec-api.io/insights/berkshire-hathaway-brk-b-q3-2026-earnings-analysis-geico-combined-ratio-91-4-vs-84-3-bnsf-19-3-9-6bn-q3-buybacks-in-greg-abel-s-first-year-as-ceo\" target=\"_blank\" rel=\"noopener noreferrer\">SEC-API Q3 26 ↗</a>；短期美债达 $3,367.35亿 <a class=\"cite-link\" href=\"https://www.stocktitan.net/sec-filings/BRK.A/10-q.html\" target=\"_blank\" rel=\"noopener noreferrer\">10-Q ↗</a>。", "en": "Float grew from $39M (1970) to $176B at YE25 ($178.5B at Q3 26) <a class=\"cite-link\" href=\"https://sec-api.io/insights/berkshire-hathaway-brk-b-q3-2026-earnings-analysis-geico-combined-ratio-91-4-vs-84-3-bnsf-19-3-9-6bn-q3-buybacks-in-greg-abel-s-first-year-as-ceo\" target=\"_blank\" rel=\"noopener noreferrer\">SEC-API Q3 26 ↗</a>; U.S. T-bills reached $336.74B <a class=\"cite-link\" href=\"https://www.stocktitan.net/sec-filings/BRK.A/10-q.html\" target=\"_blank\" rel=\"noopener noreferrer\">10-Q ↗</a>."}, {"key": "brk_r06", "match_zh": "查理·芒格曾总结：“我们把运营企业的权力", "zh": "查理·芒格曾总结：“我们把运营企业的权力下放到了<strong>几乎完全不管（just short of total abdication）</strong>的地步。”奥马哈总部从不要求子公司提交厚重年度预算，也不召开跨部门协调会 <a class=\"cite-link\" href=\"https://buffett.cnbc.com/video/1998/05/04/afternoon-session---1998-berkshire-hathaway-annual-meeting.html\" target=\"_blank\" rel=\"noopener noreferrer\">CNBC Archive ↗</a>。", "en": "Charlie Munger famously summed it up: Berkshire delegates operating authority \"just short of total abdication\"—requiring zero bloated budgets or cross-division committee meetings <a class=\"cite-link\" href=\"https://buffett.cnbc.com/video/1998/05/04/afternoon-session---1998-berkshire-hathaway-annual-meeting.html\" target=\"_blank\" rel=\"noopener noreferrer\">CNBC Archive ↗</a>."}, {"key": "brk_r07", "match_zh": "巴菲特明确划定边界：“我们集中管理资金", "zh": "巴菲特明确划定边界：“<strong>我们集中管理资金，除此之外几乎一切分权</strong>。”喜诗糖果、GEICO、BNSF 产生的超额现金零税收摩擦调配至全市场最优标的 <a class=\"cite-link\" href=\"https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/\" target=\"_blank\" rel=\"noopener noreferrer\">Governance Study ↗</a>。", "en": "Buffett drew a crisp line: \"We centralize capital; we decentralize almost everything else.\" Surplus FCF from See's, GEICO, and BNSF sweeps to Omaha tax-free for highest-return deployment <a class=\"cite-link\" href=\"https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/\" target=\"_blank\" rel=\"noopener noreferrer\">Governance Study ↗</a>."}, {"key": "brk_r08", "match_zh": "多数保险公司为抢保费规模容忍承保亏损", "zh": "多数保险公司为抢保费规模容忍承保亏损，而伯克希尔将“承保盈利高于保费规模”视为铁律 <a class=\"cite-link\" href=\"https://finmasters.com/warren-buffett-insurance-float/\" target=\"_blank\" rel=\"noopener noreferrer\">FinMasters ↗</a>，使 $1,760亿–$1,785亿浮存金在 2025 年倒赚 $72.58亿税后承保利润 <a class=\"cite-link\" href=\"https://agencychecklists.com/2026/03/02/berkshire-reports-lower-2025-operating-earnings-insurance-combined-ratio-at-87-1-80260/\" target=\"_blank\" rel=\"noopener noreferrer\">Agency Checklists ↗</a>。", "en": "While peers chase premium volume at underwriting losses, Berkshire enforces profit-first discipline <a class=\"cite-link\" href=\"https://finmasters.com/warren-buffett-insurance-float/\" target=\"_blank\" rel=\"noopener noreferrer\">FinMasters ↗</a>—turning $176B–$178.5B of float into +$7.26B of FY25 underwriting profit <a class=\"cite-link\" href=\"https://agencychecklists.com/2026/03/02/berkshire-reports-lower-2025-operating-earnings-insurance-combined-ratio-at-87-1-80260/\" target=\"_blank\" rel=\"noopener noreferrer\">Agency Checklists ↗</a>."}, {"key": "brk_r09", "match_zh": "2026年1月1日跨代传承：Greg Abel", "zh": "<strong>2026年1月1日跨代传承：Greg Abel (CEO) × Howard Buffett (董事长) × Warren Buffett (名誉董事长)</strong> —— 阿贝尔正式接任 CEO，96 岁的巴菲特于 2026 年 9 月 18 日改任名誉董事长，霍华德·巴菲特出任非执行董事长守护企业文化 <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun 2026 ↗</a>。", "en": "<strong>Jan 1, 2026 Generational Transition: Greg Abel (CEO) × Howard Buffett (Chairman) × Warren Buffett (Chairman Emeritus)</strong> — Abel assumed CEO duties on Jan 1, 2026, while Buffett transitioned to Chairman Emeritus on Sep 18 alongside non-executive Chair Howard Buffett <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun 2026 ↗</a>."}, {"key": "brk_r10", "match_zh": "由保险副董事长阿吉特·贾恩（Ajit Jain）与 GEICO", "zh": "由保险副董事长阿吉特·贾恩（Ajit Jain）与 GEICO 团队领衔，费率不足时宁可缩减保费也绝不写亏本保单 <a class=\"cite-link\" href=\"https://www.artemis.bm/news/reinsurance-capital-build-up-means-berkshire-hathaway-expects-to-write-less-premium-abel/\" target=\"_blank\" rel=\"noopener noreferrer\">Artemis ↗</a>。2025 年综合成本率低至 87.1%，创造 $72.58亿承保净利与 $125.13亿保险投资收益 <a class=\"cite-link\" href=\"https://agencychecklists.com/2026/03/02/berkshire-reports-lower-2025-operating-earnings-insurance-combined-ratio-at-87-1-80260/\" target=\"_blank\" rel=\"noopener noreferrer\">Agency Checklists ↗</a>。", "en": "Led by Vice Chair Ajit Jain and GEICO, underwriters walk away from underpriced policies <a class=\"cite-link\" href=\"https://www.artemis.bm/news/reinsurance-capital-build-up-means-berkshire-hathaway-expects-to-write-less-premium-abel/\" target=\"_blank\" rel=\"noopener noreferrer\">Artemis ↗</a>—achieving an 87.1% FY25 combined ratio, $7.26B underwriting profit, and $12.51B investment income <a class=\"cite-link\" href=\"https://agencychecklists.com/2026/03/02/berkshire-reports-lower-2025-operating-earnings-insurance-combined-ratio-at-87-1-80260/\" target=\"_blank\" rel=\"noopener noreferrer\">Agency Checklists ↗</a>."}, {"key": "brk_r11", "match_zh": "涵盖喜诗糖果、精密机件（PCC）、伊斯卡", "zh": "涵盖喜诗糖果、精密机件（PCC）、伊斯卡（IMC）、路博润、麦克莱恩与 Pilot 等约 70 家独立子公司 <a class=\"cite-link\" href=\"https://intrinsicvaluepershare.com/berkshire/msr/\" target=\"_blank\" rel=\"noopener noreferrer\">IVPS ↗</a>。2026 年初更斥资 $94亿收购 OxyChem 并于 7 月以 $68亿收购 Taylor Morrison <a class=\"cite-link\" href=\"https://www.stocktitan.net/sec-filings/BRK.A/10-q.html\" target=\"_blank\" rel=\"noopener noreferrer\">Stock Titan 10-Q ↗</a>。", "en": "Spans ~70 autonomous subsidiaries including See's Candies, PCC, IMC, Lubrizol, McLane, and Pilot <a class=\"cite-link\" href=\"https://intrinsicvaluepershare.com/berkshire/msr/\" target=\"_blank\" rel=\"noopener noreferrer\">IVPS ↗</a>—expanded in 2026 with $9.4B cash acquisition of OxyChem and $6.8B acquisition of Taylor Morrison <a class=\"cite-link\" href=\"https://www.stocktitan.net/sec-filings/BRK.A/10-q.html\" target=\"_blank\" rel=\"noopener noreferrer\">Stock Titan 10-Q ↗</a>."}, {"key": "brk_r12", "match_zh": "伯克希尔能源（BHE）自 2000 年被收购以来", "zh": "伯克希尔能源（BHE）自 2000 年被收购以来从未向母公司支付股息，全部留存收益用于电网与清洁能源投资；叠加 BNSF 铁路（FY25 $54.76亿，+8.8%），两大基建合计贡献 $94.55亿税后利润 <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/1067983/000119312526085801/d117283dex991.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC EX-99.1 ↗</a>。", "en": "BHE has retained 100% of earnings for grid &amp; clean-energy capex since 2000; paired with BNSF ($5.48B in FY25, +8.8%), both infrastructure pillars delivered $9.46B in combined after-tax earnings <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/1067983/000119312526085801/d117283dex991.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC EX-99.1 ↗</a>."}, {"key": "brk_r13", "match_zh": "重仓持有苹果（Apple）、美国运通（22.5%）", "zh": "重仓持有苹果（Apple）、美国运通（22.5%）、可口可乐、西方石油（26.7%）与日本五大商社 <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun ↗</a>；截至 2026Q3 持有 $3,367.35亿短期美债并在前 9 个月回购 $137.57亿库藏股 <a class=\"cite-link\" href=\"https://www.stocktitan.net/sec-filings/BRK.A/10-q.html\" target=\"_blank\" rel=\"noopener noreferrer\">SEC 10-Q ↗</a>。", "en": "Holds core stakes in Apple, Amex (22.5%), Coca-Cola, Occidental (26.7%), and Japan's trading houses <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun ↗</a>—backed by $336.74B in T-bills and $13.76B in 9M26 buybacks <a class=\"cite-link\" href=\"https://www.stocktitan.net/sec-filings/BRK.A/10-q.html\" target=\"_blank\" rel=\"noopener noreferrer\">SEC 10-Q ↗</a>."}, {"key": "brk_r14", "match_zh": "1. 商业史最成功的“去官僚化”大型组织实验：", "zh": "<strong>1. 商业史最成功的“去官僚化”大型组织实验：</strong>证明年营收超 $3,700亿的集团无需千人总部即可高效运转，大幅降低组织熵增 <a class=\"cite-link\" href=\"https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/\" target=\"_blank\" rel=\"noopener noreferrer\">Governance ↗</a>。<br/> <strong>2. 筛选长期主义股东的“双向选择”：</strong>不拆 A 股、不派息、不给季度指引，造就全球换手率最低的理性股东群体 <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/2009ar/2009ar.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">2009 AR ↗</a>。<br/> <strong>3. 跨越创始人周期的制度设计：</strong>阿贝尔掌管运营与资本配置，霍华德·巴菲特出任董事长专职守护文化 <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun ↗</a>。", "en": "<strong>1. Anti-Bureaucracy Proof at $370B+ Scale:</strong> Demonstrates 27 HQ staff can govern 390k employees without middle-management drag <a class=\"cite-link\" href=\"https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/\" target=\"_blank\" rel=\"noopener noreferrer\">Governance ↗</a>.<br/> <strong>2. Self-Selecting Partner Owners:</strong> No A-share splits, no dividends, and no EPS guidance attract the lowest-turnover shareholder base <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/2009ar/2009ar.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">2009 AR ↗</a>.<br/> <strong>3. Dual-Guardian Succession:</strong> Greg Abel drives capital allocation while Howard Buffett chairs the Board to protect culture <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun ↗</a>."}, {"key": "brk_r15", "match_zh": "1. “过度信任”偶发的监管滞后：", "zh": "<strong>1. “过度信任”偶发的监管滞后：</strong>高度放权且极少辞退高管的文化曾导致 GEICO Telematics 数字化滞后及 Pilot 过渡期利润下滑 <a class=\"cite-link\" href=\"https://www.forbes.com/sites/bill_stone/2026/03/01/berkshire-hathaway-q4-2025-buffetts-finale-abels-debut/\" target=\"_blank\" rel=\"noopener noreferrer\">Forbes ↗</a>。<br/> <strong>2. 子公司间缺乏横向协同：</strong>坚持完全独立意味着放弃集中采购与统一 IT 红利，直至阿贝尔时代才适度强化 ROIC 对标 <a class=\"cite-link\" href=\"https://www.inc.com/warren-buffett\" target=\"_blank\" rel=\"noopener noreferrer\">Inc. ↗</a>。<br/> <strong>3. $3,367亿现金的大数定律引力：</strong>总资产破 $1.3万亿后，能拨动指针的“大象级”收购标的愈发稀缺。", "en": "<strong>1. Occasional Oversight Lag:</strong> Reluctance to fire underperforming managers delayed GEICO telematics and clouded Pilot's transition <a class=\"cite-link\" href=\"https://www.forbes.com/sites/bill_stone/2026/03/01/berkshire-hathaway-q4-2025-buffetts-finale-abels-debut/\" target=\"_blank\" rel=\"noopener noreferrer\">Forbes ↗</a>.<br/> <strong>2. Foregone Cross-Unit Synergies:</strong> Complete subsidiary isolation skips shared procurement and IT scale until Abel's recent ROIC benchmarking <a class=\"cite-link\" href=\"https://www.inc.com/warren-buffett\" target=\"_blank\" rel=\"noopener noreferrer\">Inc. ↗</a>.<br/> <strong>3. Law of Large Numbers ($336.7B T-Bills):</strong> At $1.3T+ assets, elephant-sized deals that move the needle are increasingly scarce."}, {"key": "brk_r16", "match_zh": "1965 年巴菲特因意气用事控股濒死纺织厂", "zh": "1965 年巴菲特因意气用事控股濒死纺织厂；1967 年斥资 $860万收购 NICO 获得首批浮存金；1972 年在芒格力推下以 $2,500万买下喜诗糖果，彻底领悟“合理价格买伟大企业并完全放权”的文化密码 <a class=\"cite-link\" href=\"https://economistwritingeveryday.com/2023/03/07/warren-buffetts-secret-sauce-investing-the-insurance-float/\" target=\"_blank\" rel=\"noopener noreferrer\">Float History ↗</a>。", "en": "Taking control of a doomed textile mill in 1965, acquiring National Indemnity ($8.6M, 1967) for float, and buying See's Candies ($25M, 1972) with Munger forged Berkshire's pivot to wonderful businesses run autonomously <a class=\"cite-link\" href=\"https://economistwritingeveryday.com/2023/03/07/warren-buffetts-secret-sauce-investing-the-insurance-float/\" target=\"_blank\" rel=\"noopener noreferrer\">Float History ↗</a>."}, {"key": "brk_r17", "match_zh": "1983 年合并蓝筹印花时颁布《13条商业原则》", "zh": "1983 年合并蓝筹印花时颁布《13条商业原则》（1996 年升级为《股东手册》）；1991 年化解所罗门危机确立声誉铁律；全资并入 GEICO、Gen Re、BNSF 与 BHE，推向万亿美元市值 <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/owners.html\" target=\"_blank\" rel=\"noopener noreferrer\">Owner's Manual ↗</a>。", "en": "Codified the 13 Owner-Related Principles in 1983 (Owner's Manual, 1996), forged the reputation mandate in the 1991 Salomon rescue, and acquired GEICO, Gen Re, BNSF, and BHE into a $1T+ empire <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/owners.html\" target=\"_blank\" rel=\"noopener noreferrer\">Owner's Manual ↗</a>."}, {"key": "brk_r18", "match_zh": "2026 年 1 月 1 日格雷格·阿贝尔正式出任 CEO", "zh": "2026 年 1 月 1 日格雷格·阿贝尔正式出任 CEO，并在首封股东信中宣示坚定捍卫分权模式与承保纪律；2026 年 9 月 18 日巴菲特改任荣誉董事长、霍华德·巴菲特任董事长守护文化 <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun 2026 ↗</a>。", "en": "Greg Abel took over as CEO on Jan 1, 2026, reaffirming decentralization and underwriting rigor in his debut letter; on Sep 18, 2026 Buffett became Chairman Emeritus with Howard Buffett as Chairman <a class=\"cite-link\" href=\"https://www.quantumrun.com/consulting/berkshire-hathaway-statistics/\" target=\"_blank\" rel=\"noopener noreferrer\">Quantumrun 2026 ↗</a>."}, {"key": "brk_r19", "match_zh": "1993 年巴菲特用占伯克希尔 1.6% 的优质股份", "zh": "1993 年巴菲特用占伯克希尔 1.6% 的优质股份收购了很快失去竞争力的 Dexter Shoe，强化了《股东手册》第 10 条铁律：绝不用高估价值的自家股票换平庸资产，此后收购优先使用现金 <a class=\"cite-link\" href=\"https://www.fool.com/investing/2018/03/02/warren-buffetts-13-principles-for-berkshire-hathaw.aspx\" target=\"_blank\" rel=\"noopener noreferrer\">Motley Fool ↗</a>。", "en": "Trading 1.6% of Berkshire shares for Dexter Shoe in 1993 seared Principle #10 into Berkshire's DNA: never issue undervalued shares for mediocre businesses—favoring cash acquisitions ever since <a class=\"cite-link\" href=\"https://www.fool.com/investing/2018/03/02/warren-buffetts-13-principles-for-berkshire-hathaw.aspx\" target=\"_blank\" rel=\"noopener noreferrer\">Motley Fool ↗</a>."}, {"key": "brk_r20", "match_zh": "无论是 1991 年彻底清洗所罗门违规管理层", "zh": "无论是 1991 年彻底清洗所罗门违规管理层，还是 2011 年接班热门索科尔因路博润买股事件黯然离职，均向近 40 万员工证明：合规与体面高于一切财务贡献 <a class=\"cite-link\" href=\"https://buffettfanatic.com/essays/a-shred-of-reputation/\" target=\"_blank\" rel=\"noopener noreferrer\">Buffett Fanatic ↗</a>。", "en": "From purging Salomon's leadership in 1991 to David Sokol's 2011 departure over Lubrizol share purchases, Berkshire proved across ~400k employees that integrity outranks every dollar of profit <a class=\"cite-link\" href=\"https://buffettfanatic.com/essays/a-shred-of-reputation/\" target=\"_blank\" rel=\"noopener noreferrer\">Buffett Fanatic ↗</a>."}, {"key": "brk_r21", "match_zh": "面对早年 PCC 约百亿美元减值以及 2025 年", "zh": "面对早年 PCC 约百亿美元减值以及 2025 年对卡夫亨氏与西方石油计提的 $82.55亿税后非暂时性减值 <a class=\"cite-link\" href=\"https://news.futunn.com/en/post/69404787/berkshire-hathaway-s-q4-operating-profit-declined-nearly-30-year\" target=\"_blank\" rel=\"noopener noreferrer\">Futunn ↗</a>，管理层从不推诿于宏观环境，而是践行第 9 条用客观结果检验初心。", "en": "Whether facing the ~$10B PCC write-down or $8.26B in FY25 Kraft Heinz and Occidental impairments <a class=\"cite-link\" href=\"https://news.futunn.com/en/post/69404787/berkshire-hathaway-s-q4-operating-profit-declined-nearly-30-year\" target=\"_blank\" rel=\"noopener noreferrer\">Futunn ↗</a>, leadership never blames macro noise—owning mistakes candidly under Principle #9."}, {"key": "brk_r22", "match_zh": "针对巴菲特时代对落后子公司过于宽容的弱点", "zh": "针对巴菲特时代对落后子公司过于宽容的弱点（如 Pilot 过渡期混乱），阿贝尔在保持自治的前提下引入更清晰的 ROIC 与同行利润率对标纪律，推动 2025 年非保险实业营业利润逆势增长 +7% <a class=\"cite-link\" href=\"https://www.forbes.com/sites/bill_stone/2026/03/01/berkshire-hathaway-q4-2025-buffetts-finale-abels-debut/\" target=\"_blank\" rel=\"noopener noreferrer\">Forbes ↗</a>。", "en": "Addressing occasional leniency toward lagging subsidiaries (such as Pilot), Abel introduced sharper ROIC and peer-margin benchmarking while preserving autonomy—lifting FY25 non-insurance operating earnings +7% <a class=\"cite-link\" href=\"https://www.forbes.com/sites/bill_stone/2026/03/01/berkshire-hathaway-q4-2025-buffetts-finale-abels-debut/\" target=\"_blank\" rel=\"noopener noreferrer\">Forbes ↗</a>."}];
      var I18N_TEXT_PAIRS = [["数据中心", "Research Hub"], ["伯克希尔·哈撒韦 (BRK.B) 企业文化与治理架构研报", "Berkshire Corporate Culture & Governance Report"], ["伯克希尔企业文化研报", "Berkshire Culture Monograph"], ["合伙人精神 × 极端分权自治 × 零成本浮存金复利 · 巴菲特与芒格六十年治理圣经", "Partnership Ethos × Extreme Decentralization × Negative-Cost Float Compounding"], ["1965–2025 年化复利", "1965–2025 CAGR"], ["19.7% vs 标普 10.5%", "19.7% vs S&P 10.5%"], ["总部 vs 全集团员工", "HQ vs. Group Staff"], ["27人 / ~387,800人", "27 HQ / ~387.8k Staff"], ["浮存金与国债储备", "Float & T-Bill Fortress"], ["$178.5B · $336.7B", "$178.5B · $336.7B"], ["站点与关联导航", "Site & Related Reports"], ["返回数据中心首页", "Back to Research Hub"], ["核心研究章节 (00 – 07)", "Report Chapters (00 – 07)"], ["执行摘要与核心指标", "Executive Summary & KPIs"], ["文化架构与资本机器", "Cultural Architecture & Capital"], ["股东手册与四重护城河", "Owner's Manual & 4 Moats"], ["治理范式与同业横向对比", "Governance Peer Matrix"], ["文化复利与股东回报推演", "Compounding & Flywheel"], ["三幕演进与跨代传承复盘", "3-Act Evolution & Lessons"], ["伯克希尔文化核查清单", "Culture Diagnostic Checklist"], ["数据来源与监管核验索引", "Primary Filings & Sources"], ["阅读与导出工具", "Reading & Export Tools"], ["浅色外观", "Light"], ["深色外观", "Dark"], ["导出 HTML", "Export HTML"], ["打印 / PDF", "Print / PDF"], ["治理史定评：人类商业史最伟大的分权自治与复利操作系统", "Verdict: Business History's Greatest Decentralized Compounding Operating System"], ["研究横跨：巴菲特与芒格时代 (1965–2025) · 阿贝尔接棒新纪元 (2026+)", "Scope: Buffett & Munger Era (1965–2025) · Greg Abel Era (2026+)"], ["数据基准：2025 10-K / 2026Q3 10-Q", "Baseline: 2025 10-K / 2026Q3 10-Q"], ["CORE THESIS · 13条股东手册契约 × 27人总部极端分权 × 零成本保险浮存金 × 家族企业永久归宿", "CORE THESIS · 13 Owner Principles × 27-Person HQ Autonomy × Negative-Cost Float × Forever Home"], ["《股东手册》13条所有权原则", "13 Owner-Related Principles"], ["虽为公司形式，但秉持合伙人态度——管理层自掏真金白银持股，零股票期权激励，与股东利益 100% 绑定。", "Corporate in form, partnership in attitude—leaders invest personal cash in shares with zero option dilution."], ["所罗门兄弟“头版测试”声誉铁律", "Salomon 'Front-Page Test' Integrity"], ["为公司亏钱我能理解；但若损害公司哪怕一丝一毫的名誉，我将毫不留情（Ruthless）。", "'Lose money for the firm, and I will be understanding. Lose a shred of reputation, and I will be ruthless.'"], ["$1,785亿浮存金与 $3,367亿美债堡垒", "$178.5B Float & $336.7B T-Bills"], ["严守承保纪律（2025 综合成本率 87.1%）带来负成本长期资金池，叠加截至 2026Q3 达 $3,367.35亿短期美债储备。", "87.1% FY25 combined ratio yields negative-cost float alongside $336.74B in short-term U.S. T-bills."], ["60年长期复利神话 (1965–2025)", "60-Yr Compounding Record (1965–2025)"], ["标普 10.5%", "S&P 10.5%"], ["奥马哈极简总部杠杆比", "Omaha HQ Span of Control"], ["27 人", "27 Staff"], ["FY2025 营收与常态化营业利润", "FY2025 Revenue & Operating Earnings"], ["营收 $371.4B", "Rev $371.4B"], ["零成本浮存金与短期美债堡垒", "Zero-Cost Float & T-Bill Fortress"], ["美债 $336.7B", "T-Bills $336.7B"], ["一、 文化架构与资本机器：“日常经营极端分权 + 自由现金流中央统配”", "1. Cultural Architecture & Capital Machine: 'Extreme Operational Autonomy + Central Capital'"], ["不设总部中台、不强推内部协同、现金统一上缴奥马哈总账做跨行业最优再配置", "Zero HQ middle-office bloat, zero forced internal synergies, frictionless cash sweeps to Omaha"], ["FY25 营业利润 $44.49B · 2026Q3 总资产 $1.304万亿", "FY25 Op Earnings $44.49B · Q3 26 Assets $1.304T"], ["Berkshire Hathaway 联邦中枢（Omaha 3555 Farnam St · 27 人总部 · 唯一资本配置总账）", "Berkshire Hathaway Federal Hub (Omaha 3555 Farnam St · 27 HQ Staff · Unified Capital Ledger)"], ["2026 治理班底：Greg Abel (CEO) × Howard Buffett (董事长) × Ajit Jain (保险副董事长) × Warren Buffett (名誉董事长)", "2026 Governance Core: Greg Abel (CEO) × Howard Buffett (Chair) × Ajit Jain (Insurance Vice Chair) × Warren Buffett (Chair Emeritus)"], ["INSURANCE · 占 FY25 营业利润 44.4%", "INSURANCE · 44.4% OF FY25 OP EARN"], ["GEICO / BH Primary / BHRG：2025 综合成本率 87.1%，承保净利 $7.26B + 投资收益 $12.51B。", "GEICO / BH Primary / BHRG: 87.1% FY25 combined ratio, $7.26B underwriting + $12.51B inv income."], ["MSR · 占 FY25 营业利润 30.7%", "MSR · 30.7% OF FY25 OP EARN"], ["See's / PCC / IMC / McLane / Pilot：约 70 家自治实业贡献 $13.65B，2026 新增 OxyChem ($9.4B)。", "See's / PCC / IMC / McLane / Pilot: ~70 autonomous firms earn $13.65B; added OxyChem ($9.4B) in 2026."], ["RAIL & ENERGY · 占 FY25 营业利润 21.3%", "RAIL & ENERGY · 21.3% OF FY25 OP EARN"], ["BNSF ($5.48B, +8.8%) 与 BHE ($3.98B)：吸收巨额留存收益，跨十年基建长周期复利。", "BNSF ($5.48B, +8.8%) & BHE ($3.98B): multi-decade regulated infrastructure compounding sinks."], ["EQUITIES & T-BILLS · $6,360亿流动性", "EQUITIES & T-BILLS · $636B LIQUIDITY"], ["$336.74B 短期美债 + ~$299.3B 13F 重仓股（Apple, Amex 22.5%, Coke, OXY 26.7%）。", "$336.74B U.S. T-bills + ~$299.3B 13F equities (Apple, Amex 22.5%, Coke, OXY 26.7%)."], ["运营权极端下放（Just Short of Total Abdication）", "Extreme Operational Delegation (Just Short of Total Abdication)"], ["总部不设 HR、法务或公关企划，子公司独立决定经营、薪酬与客户服务，激发创始人级企业家精神。", "No central HR, legal, or PR; subsidiaries run operations independently, preserving founder ownership."], ["资本配置权绝对集中（Centralized Capital Allocation）", "Absolute Capital-Allocation Centralization"], ["自由现金流零税收摩擦汇入奥马哈总账，在美债、回购、二级股权与整宗收购间随时择优再投资。", "Surplus FCF sweeps to Omaha tax-free to allocate across T-bills, buybacks, equities, and M&A."], ["1. “接近放任不管”的子公司经营自主权", "1. Near-Total Subsidiary Operating Autonomy"], ["2. 无摩擦内部资本市场：现金统一上缴奥马哈", "2. Frictionless Internal Capital Market"], ["3. “旧约圣经式”承保纪律锻造免费杠杆", "3. 'Old Testament' Underwriting Discipline"], ["2026 治理交棒", "2026 SUCCESSION"], ["FY2024 vs FY2025 伯克希尔六大业务板块营业利润拆解（$B · SEC EX-99.1）", "FY2024 vs. FY2025 Operating Earnings by Segment ($B · SEC EX-99.1)"], ["制造/服务/零售 ($13.65B)、BNSF铁路 ($5.48B) 与能源 ($3.98B) 逆势增长，保险双引擎贡献 $19.77B", "MSR ($13.65B), BNSF ($5.48B) & BHE ($3.98B) expanded YoY; Insurance twin engines generated $19.77B"], ["视图A: 六大板块利润结构", "View A: 6-Segment Op Earnings"], ["视图B: 浮存金半世纪扩张", "View B: 1970–2026Q3 Float"], ["1. 保险承保宗教与负成本浮存金引擎（GEICO / BH Primary / BHRG）", "1. Insurance Underwriting Religion & Negative-Cost Float (GEICO / Primary / BHRG)"], ["承保+投资 $19.77B", "Underwriting+Inv $19.77B"], ["展开微观执行机制", "Show Execution Mechanics"], ["收起微观执行机制", "Hide Execution Mechanics"], ["全美财险法定盈余高达 $3,330亿，承保净利 $72.58亿叠加投资收益 $125.13亿构筑全球最强保险现金底座。", "Backed by ~$333B U.S. P/C statutory surplus, $7.26B underwriting profit + $12.51B investment income form an unmatched float fortress."], ["2. 制造、服务与零售自治集群（MSR ~70 家实业企业）", "2. Manufacturing, Service & Retailing Autonomous Cluster (~70 Firms)"], ["MSR 营业利润 $13.65B", "MSR Op Earnings $13.65B"], ["许多家族创始人套现后仍自愿坚守岗位——因为伯克希尔承诺永不转手倒卖、不派驻总部钦差。", "Founders stay on post-sale because Berkshire promises never to flip firms or parachute HQ overseers."], ["3. 北美铁路大动脉与公用事业电网（BNSF + BHE）", "3. North American Freight Rail & Utility Grid (BNSF + BHE)"], ["BNSF $5.48B + BHE $3.98B", "BNSF $5.48B + BHE $3.98B"], ["BHE 自 2000 年并购以来将 100% 利润留存再投电网现代化，免受华尔街季度分红压力束缚。", "BHE has retained 100% of earnings since 2000 for grid modernization—free from quarterly dividend pressure."], ["4. 股权合伙投资组合与反脆弱国债金库（Equity & T-Bills）", "4. Equity Partnership Portfolio & Anti-Fragile T-Bill Vault"], ["美债 $336.7B · 回购 $13.8B", "T-Bills $336.7B · Buybacks $13.8B"], ["当市场估值高企时纪律囤积 $3,367.35亿短期美债；当股价低于内在价值时果断出手（9M26 回购 $137.57亿），且严守 $300亿最低现金红线。", "Holds $336.74B in T-bills when valuations stretch; repurchased $13.76B in 9M26 while guarding a $30B cash floor."], ["二、 《股东手册》与四重文化护城河：为什么华尔街无法复制伯克希尔？", "2. Owner's Manual & Four Cultural Moats: Why Wall Street Cannot Replicate Berkshire"], ["点击左侧任一文化支柱卡片，联动查看《股东手册》铁律与三大治理模式五维对比雷达", "Click any pillar card on the left to inspect Berkshire's rules and 5-axis governance radar"], ["护城河定性：极宽 (Wide Moat · 制度信任壁垒 + 零代理成本 + 永久收购声誉)", "Moat Rating: Wide Moat (Trust Moat + Zero Agency Cost + Forever-Home Brand)"], ["01 · “自己吃自己做的饭”合伙人契约", "01 · 'Eat Your Own Cooking' Partnership Covenant"], ["零期权 · 自掏买股", "Zero Options · Skin in Game"], ["巴菲特家族逾 99% 净资产锁在伯克希尔股票中，新任 CEO 阿贝尔更在 2022 年自掏 $6,800万现金买入 168 股 A 类股，从根源消灭代理成本。", "Buffett keeps >99% of net worth in BRK stock, and CEO Greg Abel spent $68M of personal cash buying 168 Class A shares in 2022."], ["02 · 所罗门“头版测试”与声誉零容忍", "02 · Salomon 'Front-Page Test' & Zero Reputation Compromise"], ["高于一切财务利润", "Above All Profit"], ["巴菲特在 1991 年国会作证立下铁律：“为公司亏钱我能理解；损害公司哪怕一丝一毫的名誉，我将毫不留情。”要求决策必须经得起报纸头版检验。", "Established in 1991 Congress testimony: decisions must pass the 'local newspaper front-page test' for your own family to read."], ["03 · 家族企业的“大都会艺术博物馆”", "03 · 'Metropolitan Museum' Permanent Home for Founders"], ["第11条 · 永不转售", "Principle #11 · Never Flip"], ["《股东手册》第 11 条宣示只要产生合理现金流绝不出售好企业，成为珍视员工与品牌的家族企业对抗 PE 拆卖的唯一避风港。", "Principle #11 pledges never to sell good businesses—making Berkshire the sole refuge for founders wary of PE buyouts."], ["04 · 绝对坦诚披露与拒绝季度业绩指引", "04 · Radical Candor & Zero Quarterly EPS Guidance"], ["第12条 · 坦诚相告", "Principle #12 · Full Candor"], ["不设投资者关系部讨好分析师、周六上午发布财报供散户同步研读，并在年报主动剖析减值失误（如 2025 年坦承卡夫亨氏与西方石油 $82.55亿减值）。", "No IR spin, Saturday earnings releases for equal footing, and candid impairment disclosures ($8.26B in FY25)."], ["三大资本与企业集团治理文化五维对比雷达（10分制标杆评估）", "5-Axis Conglomerate & Capital Governance Radar (10-Point Scale)"], ["点击下方图例胶囊可单独开关对比曲线，悬停顶点查看各维度评分", "Click legend pills below to toggle peer curves; hover vertices for exact scores"], ["伯克希尔 (BRK · 分权联邦)", "Berkshire (BRK · Decentralized)"], ["华尔街私募并购 (PE Buyout)", "Wall Street PE Buyout"], ["传统工业多元集团 (GE式)", "Traditional Industrial (GE-Style)"], ["三、 组织与治理范式横向对比：五种顶级商业文化与承保纪律统治力", "3. Global Governance & Culture Peer Matrix: Five Iconic Archetypes"], ["支持按治理范式、代表人物（巴菲特 / 阿贝尔 / 莱纳德 / 韦尔奇 / 乔布斯）实时搜索筛选对比", "Filter or search in real time by governance archetype, leader, or financial mechanism"], ["全部治理范式", "All Paradigms"], ["资本配置与并购派", "Capital & M&A"], ["集权管控与工业派", "Centralized & Operating"], ["治理范式与代表人物", "Paradigm & Leaders"], ["总部规模与管控模式", "HQ Scale & Control"], ["资本来源与持有周期", "Capital & Holding Horizon"], ["高管薪酬与激励机制", "Executive Incentives"], ["标志性财务绩效", "Track Record & Scale"], ["与伯克希尔企业文化的深度对比评估", "Comparative Fit vs. Berkshire"], ["把承保纪律当宗教信仰：伯克希尔财险综合成本率（Combined Ratio %）多周期对比", "Underwriting as Religion: Multi-Cycle P/C Combined Ratio Comparison (%)"], ["低于 100% 即意味着浮存金为“负成本长钱”——2025 年 87.1% 意味着每收 $1 保费净赚 12.9 美分承保利润", "Below 100% means negative-cost float: 87.1% in FY25 equals 12.9 cents of underwriting profit per $1 of earned premium"], ["2025年 87.1% · 浮存金净赚 12.9% 承保利润率", "2025: 87.1% · +12.9% Underwriting Margin"], ["绿色/蓝色：伯克希尔 2025 年、5年/20年/10年实际综合成本率 (虚线为 100% 行业盈亏平衡红线)", "Green / Blue: Berkshire 2025, 5-Yr, 20-Yr & 10-Yr Combined Ratios (dashed = 100% breakeven line)"], ["四、 文化复利与股东回报推演：当“零总部内耗 + 零成本浮存金”运转六十年", "4. Cultural Compounding & Shareholder Returns: 60 Years of Zero Bloat + Free Float"], ["用财务硬指标验证企业文化：文化不是墙上的标语，而是穿越牛熊的 ROIC 与每股内在价值", "Validating culture via hard financial metrics: ROIC and per-share intrinsic value across market cycles"], ["1964–2024 总回报 +5,502,284%", "1964–2024 Gain +5,502,284%"], ["拒绝盲目冲保费规模，2025 全年净赚 $72.58亿税后承保利润，浮存金达 $1,760亿（2026Q3 $1,785亿）。", "Refusing volume-chasing generated $7.26B underwriting profit on $176B–$178.5B of float."], ["“永远不依赖陌生人的善意”——截至 2026Q3 持有 $3,367.35亿短期美债，总资产 $1.304万亿。", "'Never depend on the kindness of strangers'—$336.74B T-bills atop $1.304T total assets at Q3 2026."], ["奥马哈总部 27 人仅占全集团员工万分之零点七，省下每年数十亿美元总部冗余管理费。", "27 HQ staff (0.007% of workforce) saves billions annually in corporate overhead and consulting fees."], ["仅在市价低于保守内在价值时出手，2026 前三季度回购 $137.57亿直接增厚每股权益。", "Repurchased $13.76B in 9M26 strictly below conservative intrinsic value to boost per-share equity."], ["FY2021–FY2025 伯克希尔保险浮存金 ($B) vs 常态化营业利润 ($B) 双轮跃升曲线", "FY2021–FY2025 Insurance Float ($B) vs. Operating Earnings ($B) Trajectory"], ["柱状图（左轴）为集团常态化税后营业利润（剔除股市账面波动）；折线（右轴）为年末保险浮存金规模", "Bars (left axis): Operating Earnings ($B); Line (right axis): Year-End Insurance Float ($B)"], ["5年营业利润均值 $37.5B · 浮存金 +$29B", "5-Yr Avg $37.5B · Float +$29B"], ["■ 左轴：常态化营业利润 ($B)", "■ Left Axis: Operating Earnings ($B)"], ["● 右轴：保险浮存金规模 ($B)", "● Right Axis: Insurance Float ($B)"], ["常态化营业利润 (左轴 · $B)", "Operating Earnings (Left · $B)"], ["保险浮存金规模 (右轴 · $B)", "Insurance Float (Right · $B)"], ["--- 5年营业利润均值 $37.5B", "--- 5-Yr Avg Operating Earnings $37.5B"], ["伯克希尔合伙人文化与复利动态推演器", "Berkshire Snowball & Partnership Compounding Simulator"], ["叠加折价股票回购每股增厚 (+1.2%/年)", "Include Discounted Buyback Per-Share Boost (+1.2%/yr)"], ["映射低于内在价值回购注销股份带来的每股权益长期加速", "Models per-share compounding lift from intrinsic-value share retirements"], ["① 1965–2025 伯克希尔合伙复利率", "① 1965–2025 Berkshire 60-Yr Track Record"], ["30年 · 19.7% CAGR", "30Y · 19.7% CAGR"], ["② 1965–2025 标普500指数全收益基准", "② 1965–2025 S&P 500 Total Return Benchmark"], ["30年 · 10.5% CAGR", "30Y · 10.5% CAGR"], ["③ 2026+ 阿贝尔新纪元万亿体量稳健档", "③ 2026+ Greg Abel Era Mega-Cap Base"], ["20年 · 11.5% CAGR", "20Y · 11.5% CAGR"], ["初始投入本金 (USD)", "Initial Principal (USD)"], ["长期持有年限 (Years)", "Holding Horizon (Years)"], ["年化复合回报率 (CAGR %)", "Annualized Compound Growth (CAGR %)"], ["期末预计总资产市值", "Projected Terminal Value"], ["本金增值倍数 (MOIC) / 综合年化", "Total MOIC / Blended CAGR"], ["累计创造净资本利得", "Cumulative Net Capital Gain"], ["━ 含回购增厚总资产轨迹", "━ Total Wealth with Buyback Accretion"], ["- - 仅基准年化复合轨迹", "- - Base Compounding Trajectory Only"], ["悬停曲线可逐年对比“伯克希尔长期复利”与“基准增长”的指数级财富放大效应（可将年限滑块拉至 60 年查看完整传奇）。", "Hover along the curve to compare annual compounding; slide horizon up to 60 years to inspect the full 1965–2025 miracle."], ["正向文化遗产定评 (Enduring Cultural Moat)", "Enduring Cultural Moat"], ["客观局限与治理挑战反思 (Critical Lens)", "Critical Lens & Governance Tensions"], ["五、 三幕文化演进与跨代传承复盘：从濒死新英格兰纺织厂到不朽治理圣殿", "5. Three-Act Cultural Evolution & Governance Lessons: From Textile Mill to Eternal Sanctuary"], ["理解伯克希尔的关键：它并非天生完美，而是在芒格催化与一次次实战纠错中进化成形", "Berkshire was not born perfect—it evolved through Munger's catalysis and candid self-correction"], ["1965 纺织厂 → 2026 阿贝尔新纪元", "1965 Textile Mill → 2026 Abel Era"], ["第一幕 · 破茧与心智跃迁 (1965–1982) —— 告别烟蒂股 · 喜诗糖果顿悟", "Act I · Mental Leap (1965–1982) — Escaping Cigar Butts & See's Candies Epiphany"], ["1967 收购 NICO 获浮存金", "1967 NICO Float"], ["第二幕 · 法典化与帝国成型 (1983–2024) —— 13条股东手册与声誉铁律", "Act II · Codification & Empire (1983–2024) — 13 Principles & Salomon Mandate"], ["1983 颁布所有权原则", "1983 Principles"], ["第三幕 · 制度永续与新纪元 (2025–2026+) —— 阿贝尔掌舵与文化长青", "Act III · Institutional Continuity (2025–2026+) — Greg Abel Era"], ["2026.01.01 阿贝尔履新 CEO", "Jan 1, 2026 Abel CEO"], ["进化 01 · 1993 换股教训", "Lesson 01 · 1993 Share Swap"], ["德克斯特鞋业（Dexter Shoe）", "Dexter Shoe"], ["绝不轻易增发自家高价值股票去购买平庸资产", "Never Trade Undervalued Shares for Mediocre Assets"], ["进化 02 · 1991 & 2011 红线", "Lesson 02 · 1991 & 2011 Red Line"], ["声誉高于一切", "Reputation Above Profit"], ["所罗门兄弟与大卫·索科尔（Lubrizol）抢跑事件", "Salomon Crisis & David Sokol Lubrizol Departure"], ["进化 03 · 2020 & 2025 减值", "Lesson 03 · 2020 & 2025"], ["极致坦诚披露", "Radical Candor"], ["坦诚面对收购出价过高与商誉减值（PCC / KHC / OXY）", "Owning Overpayment & Impairments Candidly (PCC / KHC / OXY)"], ["进化 04 · 2026 运营新政", "Lesson 04 · 2026 Ops Rigor"], ["非保险营业利润 +7%", "Non-Ins Op Earn +7%"], ["阿贝尔对非保险运营纪律的适度升级（Pilot 整顿与 ROIC 对标）", "Abel's Sharp ROIC Benchmarking Without Sacrificing Autonomy"], ["法则一：", "Law 01:"], ["最好的管理是“选对热爱事业的正直之人，然后别碍事”——给自驱的经营者最大尊严与自主权。", "Pick honest, passionate operators and stay out of their way—trust is the lowest-cost driver of ROIC."], ["法则二：", "Law 02:"], ["区分“日常经营权”与“自由现金流再投资权”——经营权彻底下放，增量资本配置权集中于理性总舵手。", "Separate daily operating autonomy from incremental capital allocation—sweeping FCF to a rational hub."], ["法则三：", "Law 03:"], ["声誉与资产负债表冗余是穿越一切危机的终极护城河——手握 $3,367亿美债才能在危机中成为唯一买家。", "Reputation and a $336.7B T-bill fortress let you act as the buyer of last resort in every crisis."], ["六、 “伯克希尔文化法则”企业治理与投资评估交互式核查清单", "6. Interactive 'Berkshire Culture Laws' Governance & Investing Diagnostic Checklist"], ["可用于审视任何上市公司、控股集团或拟投资标的是否具备“伯克希尔式”健康的股东文化与治理基因（勾选状态自动本地保存）", "Evaluate whether any public company or holding group shares Berkshire's healthy governance DNA (saved locally)"], ["全部勾选", "Check All"], ["重置清单", "Reset"], ["数据来源与一手监管/年报核验索引（SEC EDGAR · Berkshire Annual Reports · Owner's Manual）", "Primary Regulatory Filings & Annual Reports Index (SEC EDGAR · Berkshire Hathaway)"], ["本深度报告所有财务、治理与历史指标均严格核验自美国证监会（SEC EDGAR）公开披露的 Berkshire Hathaway 2025 Annual Report、FY2025 Earnings Release (SEC EX-99.1)、Q3 2026 Form 10-Q、《股东手册》（An Owner's Manual）及历年奥马哈股东大会实录。报告内置的复利模拟器旨在复盘长期合伙制文化与资本配置增值规律，不构成任何具体证券买卖建议。", "All financial, governance, and historical figures are verified against SEC EDGAR filings (2025 Annual Report, FY25 EX-99.1, Q3 2026 10-Q), An Owner's Manual, and official AGM transcripts. For research purposes only; not investment advice."], ["FY2025 营业利润 $44.49B · 2026Q3 总资产突破 $1.304万亿", "FY2025 Operating Earnings $44.49B · Q3 2026 Total Assets Exceed $1.304T"], ["27人总部 · ~60+ 自治子公司", "27 HQ Staff · ~60+ Autonomous Subsidiaries"], ["Berkshire Hathaway 联邦中枢（Omaha 3555 Farnam St · 27 名总部成员 · 唯一资本配置总账）", "Berkshire Hathaway Federal Hub (3555 Farnam St, Omaha · 27 HQ Staff · Sole Capital Allocation Ledger)"], ["2026 治理交接：Greg Abel (CEO) × Howard Buffett (非执行董事长) × Ajit Jain (保险副董事长) × Warren Buffett (名誉董事长)", "2026 Governance Transition: Greg Abel (CEO) × Howard Buffett (Non-Exec Chair) × Ajit Jain (Vice Chair, Insurance) × Warren Buffett (Chairman Emeritus)"], ["2025 综合成本率 87.1%，承保净利 $7.26B + 投资收益 $12.51B，浮存金 $178.5B。", "2025 combined ratio 87.1%, underwriting profit $7.26B + investment income $12.51B, $178.5B float."], ["~70 家实业自治集群", "~70 Industrial Autonomous Cluster"], ["See's、PCC、IMC、McLane、Pilot 贡献 $13.65B；2026 新增 OxyChem ($9.4B) 与 Taylor Morrison ($6.8B)。", "See's, PCC, IMC, McLane, and Pilot contributed $13.65B; 2026 additions OxyChem ($9.4B) & Taylor Morrison ($6.8B)."], ["RAIL & ENERGY · 占 FY25 21.3%", "RAIL & ENERGY · 21.3% of FY25"], ["BNSF 铁路 & BHE 能源", "BNSF Railway & BHE Energy"], ["BNSF ($5.48B, +8.8%) + BHE ($3.98B) 合计贡献 $9.46B，BHE 自 2000 年 100% 留存再投。", "BNSF ($5.48B, +8.8%) + BHE ($3.98B) contributed $9.46B combined; BHE has retained 100% of earnings since 2000."], ["EQUITIES & T-BILLS · $636B 流动性", "EQUITIES & T-BILLS · $636B Liquidity"], ["13F 股权 + 美债金库", "13F Equities + T-Bill Fortress"], ["~$299.3B 13F 股权（Apple / Amex 22.5% / Coke / OXY 26.7%）+ $336.74B 短期美债。", "~$299.3B 13F equities (Apple / Amex 22.5% / Coke / OXY 26.7%) + $336.74B short-term U.S. T-bills."], ["“接近放任不管”的经营自主权（Just Short of Total Abdication）", "Operational Autonomy 'Just Short of Total Abdication'"], ["总部无 HR、无中央法务、无公关部，不要求子公司呈报厚重预算与跨部门协调会，让创始人灵魂永存。", "No central HR, legal, or PR at HQ; no heavy budgets or cross-division meetings, preserving founder spirit."], ["无摩擦内部资本市场（Centralized Capital Allocation）", "Frictionless Internal Capital Market (Centralized Capital Allocation)"], ["各子公司自由现金流零税负汇入奥马哈总账，在美债、折价回购（9M26 $13.76B）、股权与实体收购间比价调配。", "Subsidiary free cash flows flow tax-free into Omaha's ledger, allocated across T-bills, buybacks (9M26 $13.76B), equities, and acquisitions."], ["视图A：六大板块利润结构", "View A: 6-Segment Operating Earnings"], ["视图B：浮存金半世纪扩张", "View B: Half-Century Float Expansion"], ["巴菲特在 1991 年国会作证确立铁律：“为公司亏钱我能理解；损害公司哪怕一丝一毫的名誉，我将毫不留情。”要求决策必须经得起报纸头版检验。", "Buffett's 1991 Congressional rule: 'Lose money for the firm, and I will be understanding; lose a shred of reputation, and I will be ruthless.' Every decision must pass the front-page test."]];
      var I18N_ATTR_PAIRS = [["展开/收起章节目录", "Toggle Chapter Sidebar"], ["切换目录侧边栏", "Toggle Chapter Sidebar"], ["面包屑导航", "Breadcrumb Navigation"], ["检索章节或指标…", "Jump to chapter or KPI…"], ["快速跳转章节或指标", "Quick jump to chapter or metric"], ["研究章节目录与站点导航", "Report Chapters & Site Navigation"], ["站点导航与章节目录", "Site Links & Table of Contents"], ["外观模式切换", "Appearance Theme Switch"], ["阅读与导出工具", "Reading & Export Tools"], ["导出独立 HTML 文件 (.html)", "Export Standalone HTML File (.html)"], ["打印或导出 PDF 研报", "Print or Save Report as PDF"], ["第一章图表视图切换", "Chapter 01 Chart View Switch"], ["搜索范式 / 代表企业 / 机制关键词…", "Search paradigm, company, leader, or mechanism…"], ["筛选对比企业", "Filter benchmark peers"], ["标杆企业分类筛选", "Peer category filter"], ["治理范式与企业文化横向对比表", "Corporate Governance & Culture Comparative Matrix"], ["伯克希尔历史与前瞻复利预设周期", "Historical & Forward Compounding Presets"], ["核查完成度进度条", "Checklist Completion Progress"]];
      var PILLAR_NOTES = ["<strong>当前选中支柱解读（01 “自己吃自己做的饭”合伙人契约）：</strong>管理层主要身家来自真金白银买入的普通股，拒绝期权稀释与短期做账，从根源消灭代理成本 <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/owners.html\" target=\"_blank\" rel=\"noopener noreferrer\">Owner's Manual ↗</a>。", "<strong>当前选中支柱解读（02 所罗门“头版测试”声誉铁律）：</strong>巴菲特在 1991 年国会作证确立“赔钱可理解，损声誉绝不姑息”，这是 27 人奥马哈总部敢于对近 40 万员工高度放权的前提底座 <a class=\"cite-link\" href=\"https://www.businessinsider.com/jensen-huang-nvidia-ceo-warren-buffett-charlie-munger-memes-reputation-2026-11\" target=\"_blank\" rel=\"noopener noreferrer\">Business Insider ↗</a>。", "<strong>当前选中支柱解读（03 家族企业的“大都会艺术博物馆”）：</strong>《股东手册》第 11 条承诺永不转售优质企业，让创始人无需担心私募杠杆拆卖，赋予伯克希尔独一无二的零摩擦收购议价力 <a class=\"cite-link\" href=\"https://www.fool.com/investing/2018/03/02/warren-buffetts-13-principles-for-berkshire-hathaw.aspx\" target=\"_blank\" rel=\"noopener noreferrer\">Motley Fool ↗</a>。", "<strong>当前选中支柱解读（04 绝对坦诚披露与拒绝季度指引）：</strong>不设 IR 讨好分析师、周六上午发布财报供散户同步研读，并在年报主动复盘 $82.55亿减值教训，筛选出全球换手率最低的合伙型股东 <a class=\"cite-link\" href=\"https://news.futunn.com/en/post/69404787/berkshire-hathaway-s-q4-operating-profit-declined-nearly-30-year\" target=\"_blank\" rel=\"noopener noreferrer\">Futunn ↗</a>。"];
      var PILLAR_NOTES_EN = ["<strong>Selected Pillar (01 · Eat Your Own Cooking):</strong> Leadership holds personal wealth in common stock—zero option dilution—eliminating principal-agent conflicts at the root <a class=\"cite-link\" href=\"https://www.berkshirehathaway.com/owners.html\" target=\"_blank\" rel=\"noopener noreferrer\">Owner's Manual ↗</a>.", "<strong>Selected Pillar (02 · Front-Page Test Integrity):</strong> Forged in the 1991 Salomon rescue, zero tolerance for reputational harm is the moral prerequisite enabling 27 HQ staff to trust 390k employees <a class=\"cite-link\" href=\"https://www.businessinsider.com/jensen-huang-nvidia-ceo-warren-buffett-charlie-munger-memes-reputation-2026-11\" target=\"_blank\" rel=\"noopener noreferrer\">Business Insider ↗</a>.", "<strong>Selected Pillar (03 · Forever Home for Founders):</strong> Principle #11 pledges never to flip healthy businesses, giving Berkshire an unmatched edge with founders wary of private equity <a class=\"cite-link\" href=\"https://www.fool.com/investing/2018/03/02/warren-buffetts-13-principles-for-berkshire-hathaw.aspx\" target=\"_blank\" rel=\"noopener noreferrer\">Motley Fool ↗</a>.", "<strong>Selected Pillar (04 · Radical Candor &amp; Zero Guidance):</strong> Saturday filings for equal shareholder footing and candid impairment reviews ($8.26B in FY25) cultivate ultra-loyal partner owners <a class=\"cite-link\" href=\"https://news.futunn.com/en/post/69404787/berkshire-hathaway-s-q4-operating-profit-declined-nearly-30-year\" target=\"_blank\" rel=\"noopener noreferrer\">Futunn ↗</a>."];
      var PEER_ROWS = [{"category": "capital", "benchmark": true, "company": "研究基准：伯克希尔·哈撒韦", "leader": "巴菲特 / 芒格 / 阿贝尔", "positioning": "奥马哈 27人极简总部 · 极端分权自治", "culture": "$178.5B 浮存金 · 永久持有", "headcount": "零期权 + 可控 ROIC 挂钩", "margins": "60年 19.7% CAGR", "verdict": "分权复利终极标杆：靠无条件信任、声誉铁律与自由现金流集中配置，实现零总部官僚内耗与跨半世纪超额复利。", "sourceLabel": "2025 AR", "sourceUrl": "https://www.berkshirehathaway.com/2025ar/2025ar.pdf"}, {"category": "capital", "benchmark": false, "company": "华尔街 LBO 私募并购派", "leader": "Blackstone / KKR / Apollo", "positioning": "投行精英强介入 · 派驻高管重组降本", "culture": "高息债务杠杆 · 3–7年退出", "headcount": "2/20 提成 + 退出期权", "margins": "依赖 7%+ 高息债与估值倍数", "verdict": "“金融交易商” vs “永久家园”：PE 依赖高息负债且到期必须出售；伯克希尔使用负成本保险浮存金且承诺永不转卖。", "sourceLabel": "FinMasters", "sourceUrl": "https://finmasters.com/warren-buffett-insurance-float/"}, {"category": "capital", "benchmark": false, "company": "垂直软件并购联邦派", "leader": "Mark Leonard (Constellation / Danaher)", "positioning": "精简总部 + 标准化 ROIC/DBS 赋能", "culture": "经营现金流滚雪球 · 永久持有", "headcount": "奖金强制二级市场买股", "margins": "长期 ROIC > 25%", "verdict": "伯克希尔精神的最佳现代门徒：同样奉行分权自治、永久持有与高管买股，但比巴菲特更强调标准化运营手册与高频并购。", "sourceLabel": "Governance Study", "sourceUrl": "https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/"}, {"category": "operating", "benchmark": false, "company": "传统工业集权多元集团", "leader": "Jack Welch 时代通用电气 (GE)", "positioning": "数千人庞大总部 + 轮岗与预算强管控", "culture": "商业票据短融 · 频繁买进卖出", "headcount": "海量股票期权 + 10%末位淘汰", "margins": "追求平滑季度 EPS 最终分拆", "verdict": "巴菲特反复警示的反面教材：靠 GE Capital 短期高杠杆与迎合季度预期美化报表，最终在金融危机与债务重压下走向解体。", "sourceLabel": "Corporate Governance", "sourceUrl": "https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/"}, {"category": "operating", "benchmark": false, "company": "科技产品端到端集权派", "leader": "Steve Jobs / Tim Cook (Apple Inc.)", "positioning": "按职能高度集权 (Functional Org)", "culture": "内生软硬一体现金流 + 巨额回购", "headcount": "长期受限股 RSU + DRI责任制", "margins": "伯克希尔头号重仓股", "verdict": "集权造极品 vs 分权管百业：单一科技生态需要乔布斯式跨部门高度协同；而跨 60 个异质行业控股集团则必须依赖伯克希尔式分权。", "sourceLabel": "Gulf News", "sourceUrl": "https://gulfnews.com/business/markets/how-steve-jobs-and-tim-cook-turned-apple-into-a-48-trillion-giant-1.500664931"}];
      var PEER_ROWS_EN = [{"category": "capital", "benchmark": true, "company": "Benchmark: Berkshire Hathaway", "leader": "Buffett / Munger / Greg Abel", "positioning": "27-Person Omaha HQ · Extreme Decentralization", "culture": "$178.5B Float · Forever Ownership", "headcount": "Zero Options + ROIC Discipline", "margins": "60-Yr 19.7% CAGR", "verdict": "Gold standard of federal compounding: unconditional trust, reputation line, and centralized FCF allocation beat conglomerate bloat for 60 years.", "sourceLabel": "2025 AR", "sourceUrl": "https://www.berkshirehathaway.com/2025ar/2025ar.pdf"}, {"category": "capital", "benchmark": false, "company": "Wall Street LBO Private Equity", "leader": "Blackstone / KKR / Apollo", "positioning": "Active PE Restructuring · HQ Cost-Cutting", "culture": "High-Cost Debt · 3–7 Yr Exit Horizon", "headcount": "2/20 Carry + Exit Options", "margins": "Relies on 7%+ Debt & Exit Multiples", "verdict": "'Financial trader' vs. 'forever home': PE relies on costly debt and forced exits; Berkshire deploys negative-cost float with permanent holding.", "sourceLabel": "FinMasters", "sourceUrl": "https://finmasters.com/warren-buffett-insurance-float/"}, {"category": "capital", "benchmark": false, "company": "Vertical Software Serial Acquirers", "leader": "Mark Leonard (Constellation / Danaher)", "positioning": "Lean HQ + Standardized ROIC / DBS Playbook", "culture": "FCF Snowball · Permanent Holding", "headcount": "Mandatory Open-Market Share Buys", "margins": "Long-Term ROIC > 25%", "verdict": "Berkshire's finest modern disciple: shares decentralization, permanent ownership, and insider share buying with tighter playbooks for small M&A.", "sourceLabel": "Governance Study", "sourceUrl": "https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/"}, {"category": "operating", "benchmark": false, "company": "Traditional Industrial Conglomerate", "leader": "Jack Welch Era General Electric (GE)", "positioning": "Thousands at HQ · Rotation & Strict Budgets", "culture": "Commercial Paper · Frequent Buying/Selling", "headcount": "Heavy Stock Options + Rank-and-Yank", "margins": "Smoothed EPS → Eventual Breakup", "verdict": "Cautionary foil: GE Capital leverage and quarterly EPS smoothing masked fragility until financial stress forced a breakup.", "sourceLabel": "Corporate Governance", "sourceUrl": "https://pictureperfectportfolios.com/warren-buffetts-philosophy-and-views-on-corporate-governance/"}, {"category": "operating", "benchmark": false, "company": "End-to-End Functional Tech Giant", "leader": "Steve Jobs / Tim Cook (Apple Inc.)", "positioning": "Functional Organization + Single Unified P&L", "culture": "Organic Full-Stack Cash + Buybacks", "headcount": "Long-Term RSUs + Single DRI", "margins": "Berkshire's #1 Equity Holding", "verdict": "Centralization for one ecosystem vs. decentralization for 60 industries: Apple unifies UX via functional control; Berkshire scales diversity via autonomy.", "sourceLabel": "Gulf News", "sourceUrl": "https://gulfnews.com/business/markets/how-steve-jobs-and-tim-cook-turned-apple-into-a-48-trillion-giant-1.500664931"}];
      var CHECKLIST_ITEMS = [{"tag": "利益绑定锚", "title": "1. “自己吃自己做的饭”测试：高管是否用真金白银买股？", "desc": "检验核心管理层与董事的主要身家是否来自自己掏钱买入的普通股（如阿贝尔斥资 $6,800万买股），还是靠零成本期权旱涝保收。"}, {"tag": "反官僚壁垒", "title": "2. 总部臃肿度测试：总部非一线人员占比是否极度克制？", "desc": "对标奥马哈 27 人总部统管 38.8 万员工：若一家集团总部充斥着成千上万不生产也不销售产品的行政人员，其文化往往正在侵蚀股东回报。"}, {"tag": "声誉防火墙", "title": "3. “报纸头版测试”与报忧机制：坏消息能否第一时间直达？", "desc": "检验企业是否遵循巴菲特“我能处理坏消息，但讨厌坏消息发酵后再告诉我”的训诫，对任何损害客户与声誉的擦边球行为零容忍。"}, {"tag": "资本配置纪律", "title": "4. 每股内在价值优先：是否拒绝为了扩大规模而稀释老股东？", "desc": "核查管理层考核是否锚定“每股自由现金流与 ROIC”，而非为了满足个人虚荣心去进行高溢价并购或低价增发股票。"}, {"tag": "沟通诚信度", "title": "5. 财报坦诚度测试：年报是否直面失误而非粉饰 Non-GAAP？", "desc": "观察管理层在逆风期是否像巴菲特与阿贝尔一样坦率剖析经营短板与投资减值，并把真实股权激励成本计入费用。"}, {"tag": "反脆弱安全垫", "title": "6. 极端压力下的资产负债表堡垒：是否永不依赖短期借新还旧？", "desc": "对标伯克希尔 $300亿现金底线与 $3,367亿美债储备，检验企业在信贷冻结期能否独善其身并逆向抄底优质资产。"}];
      var CHECKLIST_ITEMS_EN = [{"tag": "Skin in the Game", "title": "1. 'Eat Your Own Cooking' Test: Do leaders buy stock with personal cash?", "desc": "Verify whether management holds real common shares purchased out-of-pocket (like Abel's $68M purchase) rather than risk-free option grants."}, {"tag": "Anti-Bureaucracy", "title": "2. HQ Bloat Test: Is headquarters staff ruthlessly lean vs. field workforce?", "desc": "Benchmarked against Omaha's 27 HQ staff overseeing ~388k workers—bloated corporate centers quietly tax shareholder returns."}, {"tag": "Reputation Wall", "title": "3. 'Front-Page Test' & Bad-News Speed: Do problems reach the top immediately?", "desc": "Confirm management follows Buffett's rule—'bad news early, zero tolerance for reputational shortcuts'—across every subsidiary."}, {"tag": "Capital Discipline", "title": "4. Per-Share Intrinsic Value Test: Does leadership refuse dilutive empire-building?", "desc": "Check whether incentives reward per-share FCF and ROIC rather than vanity M&A or issuing undervalued equity."}, {"tag": "Reporting Candor", "title": "5. Candid Disclosure Test: Do filings own mistakes rather than spinning Non-GAAP?", "desc": "Verify whether leaders transparently analyze operating shortfalls and impairments just like Buffett and Abel."}, {"tag": "Fortress Balance", "title": "6. Stress-Test Balance Sheet: Zero reliance on short-term debt rollovers?", "desc": "Benchmarked against Berkshire's $30B cash floor and $336.7B T-bills—can the firm play offense when credit markets freeze?"}];
      var QUICK_JUMP_INDEX = [{"sec": "sec-00", "title": "00 执行摘要与核心指标", "sub": "27人总部 · $1,785亿浮存金 · $3,367亿美债 · 19.7% 60年复利"}, {"sec": "sec-01", "title": "01 文化架构与资本机器", "sub": "FY24 vs FY25 六大板块营业利润 · 1970–2026Q3 浮存金扩张双视图"}, {"sec": "sec-02", "title": "02 股东手册与四重护城河", "sub": "13条原则 · 头版测试 · 永久家园 · 三大治理模式五维雷达"}, {"sec": "sec-03", "title": "03 治理范式与同业横向对比", "sub": "Berkshire vs LBO PE vs Constellation vs GE vs Apple + 承保成本率"}, {"sec": "sec-04", "title": "04 文化复利与股东回报推演", "sub": "FY21–FY25 浮存金与营业利润双升 · 滚雪球复利模拟器 (19.7% vs 10.5%)"}, {"sec": "sec-05", "title": "05 三幕演进与跨代传承复盘", "sub": "喜诗糖果顿悟 · 1991 所罗门 · 2026 阿贝尔接棒 + 四大实战进化"}, {"sec": "sec-06", "title": "06 伯克希尔文化核查清单", "sub": "6 项治理与投资评估核查（本地持久化）"}, {"sec": "sec-07", "title": "07 数据来源与监管核验索引", "sub": "2025 AR · SEC EX-99.1 · Q3 2026 10-Q · Owner's Manual"}];
      var QUICK_JUMP_EN = [{"sec": "sec-00", "title": "00 Executive Summary & KPIs", "sub": "27 HQ Staff · $178.5B Float · $336.7B T-Bills · 19.7% 60-Yr CAGR"}, {"sec": "sec-01", "title": "01 Cultural Architecture & Capital", "sub": "FY24 vs FY25 Segment Op Earnings & 1970–2026Q3 Float Charts"}, {"sec": "sec-02", "title": "02 Owner's Manual & 4 Moats", "sub": "13 Principles · Front-Page Test · Forever Home · 5-Axis Radar"}, {"sec": "sec-03", "title": "03 Governance Peer Matrix", "sub": "Berkshire vs PE vs Constellation vs GE vs Apple + Combined Ratio"}, {"sec": "sec-04", "title": "04 Compounding & Flywheel", "sub": "FY21–FY25 Float & Op Earnings · Snowball Simulator (19.7% vs 10.5%)"}, {"sec": "sec-05", "title": "05 3-Act Evolution & Lessons", "sub": "See's Candies · Dexter Shoe · Salomon/Sokol · 2026 Abel Transition"}, {"sec": "sec-06", "title": "06 Berkshire Culture Checklist", "sub": "6-Point Governance & Capital Discipline Diagnostic"}, {"sec": "sec-07", "title": "07 Primary Filings & Sources", "sub": "2025 AR · SEC EX-99.1 · Q3 2026 10-Q · Owner's Manual"}];

      var PRESETS = {
        p1: { principal: 10000, years: 30, priceCagr: 19.7, drip: false },
        p2: { principal: 10000, years: 30, priceCagr: 10.5, drip: false },
        p3: { principal: 10000, years: 20, priceCagr: 11.5, drip: false }
      };

      var state = {
        lang: 'zh',
        theme: 'light',
        ch1View: 'viewA',
        activePillar: 0,
        radarSeries: { brk: true, pe: true, ge: true },
        peerFilter: 'all',
        peerQuery: '',
        sim: { principal: 10000, years: 30, priceCagr: 19.7, drip: false, preset: 'p1' },
        checks: [true, true, true, false, false, false],
        ch1Series: { s1: true, s2: true },
        epsSeries: { eps: true, oci: true }
      };

      function safeGetStorage(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
      function safeSetStorage(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

      var toastTimer = null;
      function showToast(msg) {
        var el = document.getElementById('muiSnackbar');
        if (!el) return;
        el.textContent = msg; el.classList.add('show');
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
      for (var _ri = 0; _ri < I18N_RICH_LIST.length; _ri++) _richMapByKey[I18N_RICH_LIST[_ri].key] = I18N_RICH_LIST[_ri];

      function bindRichBlocksOnce() {
        var candidates = document.querySelectorAll('h1, p, div');
        for (var i = 0; i < candidates.length; i++) {
          var el = candidates[i];
          if (el.getAttribute('data-i18n-rich') || el.id === 'pillarFocusNote' || el.closest('#pillarFocusNote')) continue;
          var normTxt = (el.textContent || '').replace(/\s+/g, ' ').trim();
          for (var j = 0; j < I18N_RICH_LIST.length; j++) {
            if (normTxt.indexOf(I18N_RICH_LIST[j].match_zh) === 0 && el.children.length <= 25 && !el.querySelector('div, p, ul, table, canvas')) {
              el.setAttribute('data-i18n-rich', I18N_RICH_LIST[j].key);
              break;
            }
          }
        }
      }

      function syncCh1HeaderText() {
        var tEl = document.getElementById('biz-chart-title'), sEl = document.getElementById('biz-chart-sub');
        if (!tEl || !sEl) return;
        if (state.ch1View === 'viewA') {
          tEl.textContent = isEn() ? 'FY2024 vs. FY2025 Operating Earnings by Segment ($B · SEC EX-99.1)' : 'FY2024 vs FY2025 伯克希尔六大业务板块营业利润拆解（$B · SEC EX-99.1）';
          sEl.textContent = isEn() ? 'MSR ($13.65B), BNSF ($5.48B) & BHE ($3.98B) expanded YoY; Insurance twin engines generated $19.77B' : '制造/服务/零售 ($13.65B)、BNSF铁路 ($5.48B) 与能源 ($3.98B) 逆势增长，保险双引擎贡献 $19.77B';
        } else {
          tEl.textContent = isEn() ? '1970–2026Q3 Berkshire Insurance Float 8,000x Expansion ($B)' : '1970–2026Q3 伯克希尔保险浮存金 8,000倍扩张史（$B）';
          sEl.textContent = isEn() ? 'Grew from $39M in 1970 and $88B in 2015 to $176B at YE25 and $178.5B at Q3 2026' : '从 1970 年仅 $3,900万、2015 年 $880亿一路增长至 2025 年末 $1,760亿与 2026Q3 的 $1,785亿零成本长钱';
        }
      }

      function syncCollapseButtonsText() {
        document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
          var panel = document.getElementById(btn.getAttribute('data-collapse-target'));
          var isOpen = panel && panel.classList.contains('open');
          btn.innerHTML = isEn()
            ? (isOpen ? '<span>Hide Execution Mechanics</span> <span>⌃</span>' : '<span>Show Execution Mechanics</span> <span>⌄</span>')
            : (isOpen ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>');
        });
      }

      function applyLanguage(lang, silent) {
        bindRichBlocksOnce();
        state.lang = lang === 'en' ? 'en' : 'zh';
        var en = isEn();
        document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
        document.documentElement.setAttribute('data-lang', state.lang);
        document.title = en ? DOC_TITLE_EN : DOC_TITLE_ZH;

        var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
        if (zhB && enB) { zhB.classList.toggle('active', !en); enB.classList.toggle('active', en); zhB.setAttribute('aria-pressed', !en ? 'true' : 'false'); enB.setAttribute('aria-pressed', en ? 'true' : 'false'); }
        var lGrp = document.getElementById('langSwitchGroup');
        if (lGrp) lGrp.setAttribute('aria-label', en ? 'Language switcher' : '语言切换');
        var abThm = document.getElementById('appbarThemeBtn');
        if (abThm) { abThm.setAttribute('title', en ? 'Toggle Light / Dark theme' : '切换浅色 / 深色主题'); abThm.setAttribute('aria-label', en ? 'Toggle color theme' : '切换深浅色主题'); }
        document.querySelectorAll('[data-i18n-zh][data-i18n-en]').forEach(function (el) { el.textContent = en ? el.getAttribute('data-i18n-en') : el.getAttribute('data-i18n-zh'); });
        document.querySelectorAll('[data-i18n-rich]').forEach(function (el) {
          var e = _richMapByKey[el.getAttribute('data-i18n-rich')];
          if (e) el.innerHTML = en ? e.en : e.zh;
        });

        var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false), n;
        while ((n = w.nextNode())) {
          var p = n.parentElement;
          if (!p || p.tagName === 'SCRIPT' || p.tagName === 'STYLE' || p.closest('#langSwitchGroup') || p.closest('[data-i18n-rich]') || p.closest('#pillarFocusNote')) continue;
          var raw = n.nodeValue || '', trimmed = raw.replace(/\s+/g, ' ').trim();
          if (!trimmed) continue;
          var mapped = en ? _zhToEnText[trimmed] : _enToZhText[trimmed];
          if (mapped) {
            var lm = raw.match(/^\s*/), tm = raw.match(/\s*$/);
            n.nodeValue = (lm ? lm[0] : '') + mapped + (tm ? tm[0] : '');
          }
        }

        document.querySelectorAll('[placeholder], [title], [aria-label]').forEach(function (el) {
          if (el.closest('#langSwitchGroup')) return;
          ['placeholder', 'title', 'aria-label'].forEach(function (an) {
            var av = el.getAttribute(an);
            if (!av) return;
            var nv = en ? _zhToEnAttr[av] : _enToZhAttr[av];
            if (nv) el.setAttribute(an, nv);
          });
        });

        var pNote = document.getElementById('pillarFocusNote');
        if (pNote) pNote.innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES)[state.activePillar] + '</div>';
        syncCh1HeaderText(); syncCollapseButtonsText(); renderPeerTable(); renderChecklist(); updateSimulatorUI(); renderAllCharts();
        safeSetStorage(STORAGE_LANG_KEY, state.lang);
        if (!silent) showToast(en ? 'Switched to English Research Edition' : '已切换至中文深度研报视图');
      }

      function applyTheme(theme, silent) {
        state.theme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        var abIconEl = document.getElementById('appbarThemeIcon');
        if (abIconEl) abIconEl.innerHTML = (state.theme === 'dark')
          ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        var sDarkBtn = document.getElementById('sideThemeDarkBtn'), sLightBtn = document.getElementById('sideThemeLightBtn');
        if (sDarkBtn && sLightBtn) { void 0; void 0; }
        safeSetStorage(STORAGE_THEME_KEY, state.theme);
        renderAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Mode' : '已切换至 MUI 深海黑曜石护眼模式') : (isEn() ? 'Switched to Light Mode' : '已切换至 MUI 浅色明亮阅读模式'));
      }

      function toggleSidebar() {
        if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
        else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
      }
      function closeMobileDrawer() { document.body.classList.remove('drawer-open'); }
      function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
      function highlightMatch(t, q) {
        var s = escapeHtml(t); if (!q) return s;
        return s.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark class="hl">$1</mark>');
      }

      function renderPeerTable() {
        var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
        if (!tbody) return;
        var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS, q = state.peerQuery.trim().toLowerCase();
        var filtered = activeRows.filter(function (row, idx) {
          if (state.peerFilter !== 'all' && row.category !== state.peerFilter && !row.benchmark) return false;
          if (!q) return true;
          var zr = PEER_ROWS[idx] || row, er = PEER_ROWS_EN[idx] || row;
          return (zr.company + ' ' + zr.leader + ' ' + zr.positioning + ' ' + zr.culture + ' ' + zr.verdict + ' ' + er.company + ' ' + er.leader + ' ' + er.positioning + ' ' + er.culture + ' ' + er.verdict).toLowerCase().indexOf(q) !== -1;
        });
        if (badge) badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆企业');
        if (!filtered.length) {
          tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching governance paradigms found.' : '未找到匹配的治理范式记录，请尝试清空搜索词或切换分类标签。') + '</td></tr>';
          return;
        }
        var rawQ = state.peerQuery.trim();
        tbody.innerHTML = filtered.map(function (r) {
          return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
            '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
            '<td>' + highlightMatch(r.positioning, rawQ) + '</td>' +
            '<td>' + highlightMatch(r.culture, rawQ) + '</td>' +
            '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.headcount, rawQ) + '</td>' +
            '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.margins, rawQ) + '</td>' +
            '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td></tr>';
        }).join('');
      }

      function formatCurrency(val) {
        if (val >= 1000000000) return '$' + (val / 1000000000).toFixed(2) + 'B';
        if (val >= 1000000) return '$' + (val / 1000000).toFixed(2) + 'M';
        return '$' + Math.round(val).toLocaleString('en-US');
      }

      function updateSimulatorUI() {
        var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
        var totalRate = (cagr + (state.sim.drip ? 1.2 : 0.0)) / 100;
        var endingValue = p * Math.pow(1 + totalRate, yrs), moic = endingValue / p, midYear = Math.max(1, Math.floor(yrs / 2));
        document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
        document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
        document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
        document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
        document.getElementById('simMoicVal').textContent = (moic >= 100 ? moic.toFixed(1) : moic.toFixed(2)) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
        document.getElementById('simNetGainVal').textContent = formatCurrency(endingValue - p);
        document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint Value') : ('第 ' + midYear + ' 年中期资产节点');
        document.getElementById('simMidVal').textContent = formatCurrency(p * Math.pow(1 + totalRate, midYear));
        document.querySelectorAll('[data-preset]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-preset') === state.sim.preset); });
        drawSimChart();
      }

      function renderChecklist() {
        var container = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
        if (!container) return;
        var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS, doneCount = state.checks.filter(Boolean).length, pct = Math.round((doneCount / itemsList.length) * 100);
        if (chip) chip.textContent = isEn() ? ('Verified ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
        if (bar) bar.style.width = pct + '%';
        container.innerHTML = itemsList.map(function (item, idx) {
          var isChecked = !!state.checks[idx];
          return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
            '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
            '<div style="flex:1;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
            '<span class="check-title">' + escapeHtml(item.title) + '</span><span class="mui-chip mono">' + escapeHtml(item.tag) + '</span></div>' +
            '<p class="check-desc">' + escapeHtml(item.desc) + '</p></div></label>';
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
          hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
          c1: cs.getPropertyValue('--chart-c1').trim() || '#3399FF',
          c2: cs.getPropertyValue('--chart-c2').trim() || '#22C55E',
          c3: cs.getPropertyValue('--chart-c3').trim() || '#FFB74D',
          c4: cs.getPropertyValue('--chart-c4').trim() || '#A78BFA'
        };
      }

      function prepareCanvas(id) {
        var canvas = document.getElementById(id); if (!canvas || !canvas.parentElement) return null;
        var rect = canvas.parentElement.getBoundingClientRect(), w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
        var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        if (canvas.width !== Math.floor(w * dpr)) canvas.width = Math.floor(w * dpr);
        if (canvas.height !== Math.floor(h * dpr)) canvas.height = Math.floor(h * dpr);
        var ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
      }

      function roundRectPath(ctx, x, y, w, h, r) {
        if (w <= 0 || h <= 0) return;
        var rad = Math.min(r, w / 2, h / 2); ctx.beginPath();
        ctx.moveTo(x + rad, y); ctx.lineTo(x + w - rad, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
        ctx.lineTo(x + w, y + h - rad); ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
        ctx.lineTo(x + rad, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
        ctx.lineTo(x, y + rad); ctx.quadraticCurveTo(x, y, x + rad, y); ctx.closePath();
      }
      function topRoundedBar(ctx, x, y, w, h, r) {
        if (w <= 0 || h <= 0) return;
        var rad = Math.min(r, w / 2, h); ctx.beginPath();
        ctx.moveTo(x, y + h); ctx.lineTo(x, y + rad); ctx.quadraticCurveTo(x, y, x + rad, y);
        ctx.lineTo(x + w - rad, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h); ctx.closePath();
      }
      function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
        ctx.save(); ctx.font = '700 10.5px "IBM Plex Mono", system-ui, sans-serif';
        var tw = ctx.measureText(text).width + 9, th = 17;
        ctx.fillStyle = pal.pillBg; roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5); ctx.fill();
        ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, cx, cy + 0.5);
        ctx.restore();
      }
      function drawSmoothLine(ctx, pts) {
        if (!pts.length) return;
        ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
        for (var i = 0; i < pts.length - 1; i++) { var xc = (pts[i].x + pts[i + 1].x) / 2; ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y); }
      }

      function drawCh1Chart() {
        var env = prepareCanvas('chartCh1'); if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartCh1 = [];
        var metaEl = document.getElementById('ch1AxisMeta'), leg1 = document.getElementById('ch1Leg1'), leg2 = document.getElementById('ch1Leg2');

        if (state.ch1View === 'viewA') {
          if (metaEl) metaEl.innerHTML = isEn() ? '<span style="color:var(--chart-c1);">■ Blue: FY2024 Op Earnings ($B · $47.44B)</span><span style="color:var(--chart-c2);">■ Green: FY2025 Op Earnings ($B · $44.49B)</span>' : '<span style="color:var(--chart-c1);">■ 蓝色：FY2024 营业利润 ($B · 总计 $47.44B)</span><span style="color:var(--chart-c2);">■ 绿色：FY2025 营业利润 ($B · 总计 $44.49B)</span>';
          if (leg1) leg1.textContent = isEn() ? 'FY2024 Operating Earnings ($B · $47.44B)' : 'FY2024 营业利润 ($B · $47.44B)';
          if (leg2) leg2.textContent = isEn() ? 'FY2025 Operating Earnings ($B · $44.49B)' : 'FY2025 营业利润 ($B · $44.49B)';

          var padA = { top: 28, right: 18, bottom: 44, left: 48 }, pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
          var labelsA = isEn() ? ['MSR', 'Ins. Inv.', 'Underwriting', 'BNSF', 'BHE', 'Other'] : ['制造服务零售', '保险投资', '保险承保', 'BNSF 铁路', 'BHE 能源', '其他/集团'];
          var fy24 = [13.07, 13.67, 9.02, 5.03, 3.73, 2.91], fy25 = [13.65, 12.51, 7.26, 5.48, 3.98, 1.61], maxY = 16.0;
          for (var g = 0; g <= 4; g++) {
            var v = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
            ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillText('$' + v.toFixed(0) + 'B', padA.left - 8, gy);
          }
          var stepA = pwA / labelsA.length, barW = Math.min(34, Math.max(12, stepA * 0.27));
          for (var i = 0; i < labelsA.length; i++) {
            var cx = padA.left + stepA * (i + 0.5);
            if (hoverState.chartCh1 === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padA.left + stepA * i + 4, padA.top, stepA - 8, phA, 8); ctx.fill(); }
            var y1 = padA.top + phA - (fy24[i] / maxY) * phA, y2 = padA.top + phA - (fy25[i] / maxY) * phA;
            if (state.ch1Series.s1) {
              var x1 = state.ch1Series.s2 ? (cx - barW - 3) : (cx - barW / 2);
              ctx.fillStyle = pal.c1; topRoundedBar(ctx, x1, y1, barW, (fy24[i] / maxY) * phA, 5); ctx.fill();
              if (!state.ch1Series.s2 || w >= 680) drawValueBadge(ctx, '$' + fy24[i].toFixed(1) + 'B', x1 + barW / 2, y1 - 12, pal.c1, pal);
            }
            if (state.ch1Series.s2) {
              var x2 = state.ch1Series.s1 ? (cx + 3) : (cx - barW / 2);
              ctx.fillStyle = pal.c2; topRoundedBar(ctx, x2, y2, barW, (fy25[i] / maxY) * phA, 5); ctx.fill();
              drawValueBadge(ctx, '$' + fy25[i].toFixed(1) + 'B', state.ch1Series.s1 ? (x2 + barW / 2) : cx, Math.min(y1, y2) - 12, pal.c2, pal);
            }
            ctx.fillStyle = pal.text; ctx.font = '700 ' + (w < 460 ? '10px' : '11px') + ' system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(labelsA[i], cx, padA.top + phA + 20);
            hitRegions.chartCh1.push({ idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 30, html: '<strong>' + labelsA[i] + '</strong><br/>• FY24: <strong>$' + fy24[i].toFixed(2) + 'B</strong><br/>• FY25: <strong>$' + fy25[i].toFixed(2) + 'B</strong>' });
          }
        } else {
          if (metaEl) metaEl.innerHTML = isEn() ? '<span style="color:var(--chart-c2);">■ Insurance Float Expansion ($B · 1970 → Q3 2026)</span><span>8,000x Growth</span>' : '<span style="color:var(--chart-c2);">■ 保险浮存金规模 ($B · 1970 → 2026Q3)</span><span>增长逾 8,000 倍</span>';
          if (leg1) leg1.textContent = isEn() ? 'Historical Milestones' : '历史关键节点';
          if (leg2) leg2.textContent = isEn() ? 'Insurance Float ($B)' : '保险浮存金规模 ($B)';
          var padB = { top: 28, right: 20, bottom: 38, left: 48 }, pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
          var yrs = ['1970', '2015', '2021', '2022', '2023', '2024', '2025', '2026Q3'], flt = [0.039, 88.0, 147.0, 164.0, 169.0, 171.0, 176.0, 178.5], maxF = 200.0;
          for (var j = 0; j <= 4; j++) {
            var r = j / 4, yg = padB.top + phB - r * phB;
            ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padB.left, yg); ctx.lineTo(padB.left + pwB, yg); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.fillText('$' + (maxF * r).toFixed(0) + 'B', padB.left - 7, yg);
          }
          var stepB = pwB / yrs.length, bwB = Math.min(38, Math.max(16, stepB * 0.45));
          for (var k = 0; k < yrs.length; k++) {
            var cxB = padB.left + stepB * (k + 0.5), bhB = Math.max(3, (flt[k] / maxF) * phB), byB = padB.top + phB - bhB;
            ctx.fillStyle = k === 7 ? pal.c2 : pal.c1; topRoundedBar(ctx, cxB - bwB / 2, byB, bwB, bhB, 5); ctx.fill();
            drawValueBadge(ctx, flt[k] < 1 ? '$39M' : ('$' + flt[k].toFixed(0) + 'B'), cxB, byB - 12, k === 7 ? pal.c2 : pal.c1, pal);
            ctx.fillStyle = pal.text; ctx.font = '700 10.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(yrs[k], cxB, padB.top + phB + 22);
            hitRegions.chartCh1.push({ idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28, html: '<strong>' + yrs[k] + '</strong><br/>• Insurance Float: <strong>' + (flt[k] < 1 ? '$39M' : ('$' + flt[k].toFixed(1) + 'B')) + '</strong>' });
          }
        }
      }

      function drawRadarChart() {
        var env = prepareCanvas('chartRadar'); if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartRadar = [];
        var axes = isEn() ? ['Op Autonomy', 'HQ Efficiency', 'Insider Alignment', 'Forever Home', 'Balance Fortress'] : ['经营自主与信任', '总部反官僚人效', '利益长期绑定', '永久持有承诺', '反脆弱现金储备'];
        var hiAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : [2, 3, 3, 4][state.activePillar];
        var series = [
          { key: 'brk', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.9, 10.0, 9.8, 9.9, 10.0] },
          { key: 'pe', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [4.5, 6.2, 7.5, 2.5, 4.0] },
          { key: 'ge', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [4.0, 3.0, 5.2, 4.5, 5.0] }
        ];
        var cx = w / 2, cy = h / 2 + 8, sidePad = w < 420 ? 88 : 108, radius = Math.max(62, Math.min((w - sidePad * 2) / 2, h * 0.35)), total = axes.length;
        for (var ring = 2; ring <= 10; ring += 2) {
          var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1; ctx.beginPath();
          for (var i = 0; i < total; i++) { var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total; if (i === 0) ctx.moveTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r); else ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r); }
          ctx.closePath(); ctx.stroke();
        }
        for (var a = 0; a < total; a++) {
          var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total, ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius, isHi = a === hiAxis;
          ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.8 : 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
          var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
          ctx.fillStyle = isHi ? pal.c1 : pal.text; ctx.font = (isHi ? '800 ' : '600 ') + '11.5px system-ui, sans-serif'; ctx.textBaseline = 'middle';
          ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
          ctx.fillText(axes[a], lx, ly);
          hitRegions.chartRadar.push({ idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44, html: '<strong>' + axes[a] + '</strong><br/>• BRK: <strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>• PE: <strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>• GE: <strong>' + series[2].vals[a].toFixed(1) + '</strong>' });
        }
        for (var s = 0; s < series.length; s++) {
          var item = series[s]; if (!state.radarSeries[item.key]) continue;
          ctx.beginPath();
          for (var idx = 0; idx < total; idx++) { var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total, d = (item.vals[idx] / 10) * radius; if (idx === 0) ctx.moveTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d); else ctx.lineTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d); }
          ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
        }
      }

      function drawHorizontalBars() {
        var env = prepareCanvas('chartBars'); if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartBars = [];
        var items = isEn() ? [
          { label: 'Berkshire FY2025 P/C Combined Ratio (12.9% Profit)', val: 87.1, cStart: '#34D399', cEnd: '#16A34A', sub: 'Lowest Cost Float' },
          { label: 'Berkshire 5-Year Average Combined Ratio (90.7%)', val: 90.7, cStart: '#3399FF', cEnd: '#0073E6', sub: '9.3% Underwriting Margin' },
          { label: 'Berkshire 20-Year Average Combined Ratio (92.2%)', val: 92.2, cStart: '#60A5FA', cEnd: '#2563EB', sub: '20-Yr Disciplined Float' },
          { label: 'Berkshire 10-Year Average Combined Ratio (93.0%)', val: 93.0, cStart: '#38BDF8', cEnd: '#0284C7', sub: '7.0% Underwriting Margin' },
          { label: 'Industry Underwriting Breakeven Threshold (100.0%)', val: 100.0, cStart: '#FB7185', cEnd: '#E11D48', sub: 'Zero Underwriting Margin' }
        ] : [
          { label: '伯克希尔 2025 全年财险综合成本率 (承保净赚 12.9%)', val: 87.1, cStart: '#34D399', cEnd: '#16A34A', sub: '负成本浮存金' },
          { label: '伯克希尔近 5 年平均综合成本率 (Five-Year Avg)', val: 90.7, cStart: '#3399FF', cEnd: '#0073E6', sub: '承保利润率 9.3%' },
          { label: '伯克希尔近 20 年平均综合成本率 (Twenty-Year Avg)', val: 92.2, cStart: '#60A5FA', cEnd: '#2563EB', sub: '跨20年净赚 7.8%' },
          { label: '伯克希尔近 10 年平均综合成本率 (Ten-Year Avg)', val: 93.0, cStart: '#38BDF8', cEnd: '#0284C7', sub: '承保利润率 7.0%' },
          { label: '财险行业承保盈亏平衡红线 (Breakeven Threshold)', val: 100.0, cStart: '#FB7185', cEnd: '#E11D48', sub: '盈亏平衡线' }
        ];
        var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, minX = 75, maxX = 105;
        for (var g = 0; g <= 3; g++) {
          var xVal = minX + g * 10, gx = pad.left + ((xVal - minX) / (maxX - minX)) * pw;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = g === 0 ? 'left' : (g === 3 ? 'right' : 'center'); ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
        }
        var rowH = ph / items.length, beX = pad.left + ((100 - minX) / (maxX - minX)) * pw;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(beX, pad.top + 4); ctx.lineTo(beX, pad.top + ph); ctx.stroke(); ctx.restore();
        for (var i = 0; i < items.length; i++) {
          var rowTop = pad.top + rowH * i, labelY = rowTop + Math.max(15, rowH * 0.34), barY = rowTop + Math.max(22, rowH * 0.50), barH = Math.min(16, Math.max(11, rowH * 0.28));
          var bw = Math.max(8, ((items[i].val - minX) / (maxX - minX)) * pw);
          ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText(items[i].label, pad.left, labelY);
          ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? items[i].cStart : items[i].cEnd; ctx.textAlign = 'right'; ctx.fillText(items[i].val.toFixed(1) + '%', pad.left + pw, labelY);
          ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
          var bg = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0); bg.addColorStop(0, items[i].cStart); bg.addColorStop(1, items[i].cEnd);
          ctx.fillStyle = bg; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();
          hitRegions.chartBars.push({ idx: i, x: pad.left, y: rowTop, w: pw, h: rowH, html: '<strong>' + items[i].label + '</strong><br/>• Combined Ratio: <strong>' + items[i].val.toFixed(1) + '%</strong> (' + items[i].sub + ')' });
        }
      }

      function drawEpsComboChart() {
        var env = prepareCanvas('chartEps'); if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartEps = [];
        var years = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'], opB = [27.46, 30.85, 37.35, 47.44, 44.49], fltB = [147.0, 164.0, 169.0, 171.0, 176.0];
        var pad = { top: 26, right: 52, bottom: 44, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, minOp = 15, maxOp = 55, minFl = 130, maxFl = 190;
        for (var g = 0; g <= 4; g++) {
          var r = g / 4, gy = pad.top + ph - r * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
          ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('$' + (minOp + r * (maxOp - minOp)).toFixed(0) + 'B', pad.left - 7, gy);
          ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText('$' + (minFl + r * (maxFl - minFl)).toFixed(0) + 'B', pad.left + pw + 7, gy);
        }
        var avgY = pad.top + ph - ((37.5 - minOp) / (maxOp - minOp)) * ph;
        ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(pad.left, avgY); ctx.lineTo(pad.left + pw, avgY); ctx.stroke(); ctx.restore();
        var step = pw / years.length, barW = Math.min(46, Math.max(24, step * 0.42)), pts = [];
        for (var i = 0; i < years.length; i++) {
          var cx = pad.left + step * (i + 0.5);
          if (state.epsSeries.eps) {
            var bh = ((opB[i] - minOp) / (maxOp - minOp)) * ph, by = pad.top + ph - bh;
            ctx.fillStyle = pal.c1; topRoundedBar(ctx, cx - barW / 2, by, barW, bh, 6); ctx.fill();
            ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('$' + opB[i].toFixed(1) + 'B', cx, by + 17);
          }
          pts.push({ x: cx, y: pad.top + ph - ((fltB[i] - minFl) / (maxFl - minFl)) * ph, f: fltB[i] });
          ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(years[i], cx, pad.top + ph + 20);
          hitRegions.chartEps.push({ idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36, html: '<strong>' + years[i] + '</strong><br/>• Op Earnings: <strong>$' + opB[i].toFixed(2) + 'B</strong><br/>• Float: <strong>$' + fltB[i].toFixed(0) + 'B</strong>' });
        }
        if (state.epsSeries.oci) {
          ctx.save(); drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
          for (var m = 0; m < pts.length; m++) {
            ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[m].x, pts[m].y, 4.5, 0, Math.PI * 2); ctx.fill();
            drawValueBadge(ctx, '$' + pts[m].f.toFixed(0) + 'B', pts[m].x, pts[m].y - 16, pal.c2, pal);
          }
        }
      }

      function drawSimChart() {
        var env = prepareCanvas('chartSim'); if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartSim = [];
        var p = state.sim.principal, yrs = state.sim.years, priceRate = state.sim.priceCagr / 100, totalRate = (state.sim.priceCagr + (state.sim.drip ? 1.2 : 0)) / 100;
        var totalSeries = [], priceOnlySeries = [];
        for (var y = 0; y <= yrs; y++) { totalSeries.push(p * Math.pow(1 + totalRate, y)); priceOnlySeries.push(p * Math.pow(1 + priceRate, y)); }
        var maxVal = Math.max(totalSeries[yrs], priceOnlySeries[yrs], p * 1.2) * 1.08, pad = { top: 20, right: 20, bottom: 28, left: 60 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        for (var g = 0; g <= 3; g++) {
          var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
          ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 7, gy);
        }
        var stepX = pw / yrs;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
        for (var i = 0; i <= yrs; i++) { var px = pad.left + stepX * i, py = pad.top + ph - (priceOnlySeries[i] / maxVal) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
        ctx.stroke(); ctx.restore();
        var totalPts = [];
        for (var k = 0; k <= yrs; k++) totalPts.push({ x: pad.left + stepX * k, y: pad.top + ph - (totalSeries[k] / maxVal) * ph });
        ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
        for (var m = 0; m < totalPts.length; m++) { if (m === 0) ctx.moveTo(totalPts[m].x, totalPts[m].y); else ctx.lineTo(totalPts[m].x, totalPts[m].y); }
        ctx.stroke();
        for (var t = 0; t <= yrs; t++) {
          var tx = totalPts[t].x;
          if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) { ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('Y' + t, tx, pad.top + ph + 18); }
          hitRegions.chartSim.push({ idx: t, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22, html: '<strong>Year ' + t + '</strong><br/>• Total: <strong>' + formatCurrency(totalSeries[t]) + '</strong><br/>• Base: <strong>' + formatCurrency(priceOnlySeries[t]) + '</strong>' });
        }
      }

      function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

      function wireCanvasTooltip(canvasId) {
        var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip'); if (!canvas || !tip) return;
        var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
        function handlePointer(cx, cy) {
          var rect = canvas.getBoundingClientRect(), x = cx - rect.left, y = cy - rect.top, regions = hitRegions[canvasId] || [], matched = null;
          for (var i = 0; i < regions.length; i++) { var r = regions[i]; if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; } }
          var ni = matched ? matched.idx : -1;
          if (hoverState[canvasId] !== ni) { hoverState[canvasId] = ni; if (redrawMap[canvasId]) redrawMap[canvasId](); }
          if (matched) { tip.innerHTML = matched.html; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 285, Math.max(12, cx + 14)) + 'px'; tip.style.top = Math.max(12, cy - tip.offsetHeight - 12) + 'px'; }
          else tip.style.display = 'none';
        }
        canvas.addEventListener('mousemove', function (e) { handlePointer(e.clientX, e.clientY); });
        canvas.addEventListener('mouseleave', function () { hoverState[canvasId] = -1; if (redrawMap[canvasId]) redrawMap[canvasId](); tip.style.display = 'none'; });
      }

      function exportStandaloneHtml() {
        var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = 'Berkshire_Hathaway_Corporate_Culture_Analysis.html';
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        showToast(isEn() ? 'Exported standalone file: Berkshire_Hathaway_Corporate_Culture_Analysis.html' : '已导出独立网页 Berkshire_Hathaway_Corporate_Culture_Analysis.html');
      }

      function init() {
        var rawT = safeGetStorage(STORAGE_THEME_KEY), savedT = rawT ? String(rawT).replace(/^"|"$/g, '') : '';
        if (savedT === 'light' || savedT === 'dark') state.theme = savedT;
        var rawL = safeGetStorage(STORAGE_LANG_KEY), savedL = rawL ? String(rawL).replace(/^"|"$/g, '') : '';
        if (savedL === 'zh' || savedL === 'en') state.lang = savedL;
        var sc = safeGetStorage(STORAGE_CHECK_KEY);
        if (sc) { try { var p = JSON.parse(sc); if (Array.isArray(p) && p.length === CHECKLIST_ITEMS.length) state.checks = p.map(Boolean); } catch (e) {} }

        applyTheme(state.theme, true); applyLanguage(state.lang, true);
        document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
        document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
        document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
        document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
        document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
        void 0;
        void 0;
        void 0;
        void 0;

        window.addEventListener('storage', function (ev) {
          if (ev.key === STORAGE_THEME_KEY && ev.newValue) {
            var nt = String(ev.newValue).replace(/^"|"$/g, '');
            if ((nt === 'light' || nt === 'dark') && nt !== state.theme) applyTheme(nt, true);
          } else if (ev.key === STORAGE_LANG_KEY && ev.newValue) {
            var nl = String(ev.newValue).replace(/^"|"$/g, '');
            if ((nl === 'zh' || nl === 'en') && nl !== state.lang) applyLanguage(nl, true);
          }
        });

        var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
        for (var t = 0; t < tocLinks.length; t++) tocLinks[t].addEventListener('click', closeMobileDrawer);

        var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
        function renderJumpList(q) {
          var kw = (q || '').trim().toLowerCase(), activeJump = isEn() ? QUICK_JUMP_EN : QUICK_JUMP_INDEX;
          var list = activeJump.filter(function (item, idx) {
            var zi = QUICK_JUMP_INDEX[idx] || item, ei = QUICK_JUMP_EN[idx] || item;
            return !kw || (zi.title + ' ' + zi.sub + ' ' + ei.title + ' ' + ei.sub).toLowerCase().indexOf(kw) !== -1;
          });
          jumpPop.innerHTML = !list.length ? '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">' + (isEn() ? 'No matching section' : '未匹配到对应章节') + '</div>'
            : list.map(function (it) { return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>'; }).join('');
          jumpPop.classList.add('open');
        }
        jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
        jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
        jumpPop.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-jump-sec]'); if (!btn) return;
          var el = document.getElementById(btn.getAttribute('data-jump-sec')); if (el) el.scrollIntoView({ behavior: 'smooth' });
          jumpPop.classList.remove('open');
        });
        document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
        document.addEventListener('keydown', function (e) {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
          else if (e.key === 'Escape') { jumpPop.classList.remove('open'); closeMobileDrawer(); }
        });

        document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.ch1View = this.getAttribute('data-ch1-view');
            document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
            document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
            syncCh1HeaderText(); drawCh1Chart();
          });
        });
        document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
          btn.addEventListener('click', function () { var p = document.getElementById(this.getAttribute('data-collapse-target')); if (p) { p.classList.toggle('open'); syncCollapseButtonsText(); } });
        });
        document.querySelectorAll('[data-pillar]').forEach(function (card) {
          card.addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0; state.activePillar = idx;
            document.querySelectorAll('[data-pillar]').forEach(function (c, k) { c.classList.toggle('active', k === idx); });
            document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[idx] + '</div>';
            drawRadarChart();
          });
        });
        document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
          pill.addEventListener('click', function () {
            var key = this.getAttribute('data-radar-key'); state.radarSeries[key] = !state.radarSeries[key];
            if (!state.radarSeries.brk && !state.radarSeries.pe && !state.radarSeries.ge) state.radarSeries[key] = true;
            this.classList.toggle('muted', !state.radarSeries[key]); drawRadarChart();
          });
        });
        document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
        document.querySelectorAll('[data-peer-filter]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.peerFilter = this.getAttribute('data-peer-filter');
            document.querySelectorAll('[data-peer-filter]').forEach(function (b) { b.classList.toggle('active', b === btn); });
            renderPeerTable();
          });
        });

        var pSlider = document.getElementById('simPrincipalSlider'), ySlider = document.getElementById('simYearsSlider'), cSlider = document.getElementById('simCagrSlider'), dToggle = document.getElementById('simDripToggle');
        pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
        ySlider.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 30; state.sim.preset = ''; updateSimulatorUI(); });
        cSlider.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
        dToggle.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
        document.querySelectorAll('[data-preset]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var key = this.getAttribute('data-preset'), cfg = PRESETS[key]; if (!cfg) return;
            state.sim = { principal: cfg.principal, years: cfg.years, priceCagr: cfg.priceCagr, drip: cfg.drip, preset: key };
            pSlider.value = String(cfg.principal); ySlider.value = String(cfg.years); cSlider.value = String(cfg.priceCagr); dToggle.checked = cfg.drip;
            updateSimulatorUI();
          });
        });

        document.getElementById('checklistContainer').addEventListener('change', function (e) {
          var inp = e.target.closest('[data-check-input]'); if (!inp) return;
          state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
          safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
        });
        document.getElementById('checkAllBtn').addEventListener('click', function () {
          state.checks = [true, true, true, true, true, true]; safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
          showToast(isEn() ? 'Checked all 6 Berkshire organizational criteria' : '已勾选全部 6 项伯克希尔文化法则核查指标');
        });
        document.getElementById('resetCheckBtn').addEventListener('click', function () {
          state.checks = [true, true, true, false, false, false]; safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
          showToast(isEn() ? 'Checklist reset to default baseline (50%)' : '核查清单已恢复默认基准状态 (50%)');
        });

        window.addEventListener('scroll', function () {
          var docEl = document.documentElement, maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
          document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, ((window.scrollY || docEl.scrollTop || 0) / maxScroll) * 100)) + '%';
        }, { passive: true });

        if ('IntersectionObserver' in window) {
          var secObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) tocLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-sec') === entry.target.id); });
            });
          }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
          for (var s = 0; s <= 7; s++) { var sn = document.getElementById('sec-0' + s); if (sn) secObserver.observe(sn); }
        }

        ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);
        document.querySelectorAll('[data-ch1-series]').forEach(function (b) {
          b.addEventListener('click', function () {
            var sk = this.getAttribute('data-ch1-series'); state.ch1Series[sk] = !state.ch1Series[sk];
            if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
            this.classList.toggle('muted', !state.ch1Series[sk]); drawCh1Chart();
          });
        });
        document.querySelectorAll('[data-eps-series]').forEach(function (b) {
          b.addEventListener('click', function () {
            var ek = this.getAttribute('data-eps-series'); state.epsSeries[ek] = !state.epsSeries[ek];
            if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[ek] = true;
            this.classList.toggle('muted', !state.epsSeries[ek]); drawEpsComboChart();
          });
        });

        var resizeTimer = null;
        window.addEventListener('resize', function () { if (resizeTimer) clearTimeout(resizeTimer); resizeTimer = setTimeout(renderAllCharts, 60); });
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    })();
  