
 (function () {
 'use strict';

 /* ======================================================================
 1. Grounded SEC 13F-HR (2026-09-30 · CIK 0001759760) & ADV Datasets
 ====================================================================== */
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_CHECK_KEY = 'mui_duan_holdings_checks_v1';

 var DOC_TITLE_ZH = '段永平 (H&H International Investment) 2026Q3 持仓全景深度研报 | 数据中心';
 var DOC_TITLE_EN = 'Duan Yongping (H&H International Investment) Q3 2026 13F Portfolio & Strategy Deep Dive | Research Hub';

 /* Exact SEC Form 13F-HR Q3 2026 Total Value: $17,190,742,843 */
 var TOTAL_13F_USD = 17190742843;

 /* All 16 Active Holdings + 3 Q3 Exited Holdings from SEC Filings 0001759760-26-000008 & 0001759760-26-000007 */
 var HOLDINGS_ALL = [
 { rank: 1, sym: 'AAPL', nameZh: '苹果公司', nameEn: 'Apple Inc.', cusip: '037833100', sector: 'tech', shares: 21202403, valUsd: 7060824247, price: 333.02, deltaShares: -5896304, chgPct: -21.76, action: 'down', exited: false, heldSince: '2018 Q4', noteZh: '头号压舱石(41.1%) · 高位备兑减持589.6万股', noteEn: '#1 Core Anchor (41.1%) · Trimmed 5.90M sh', url: 'https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio' },
 { rank: 2, sym: 'BRK.B', nameZh: '伯克希尔·哈撒韦 B', nameEn: 'Berkshire Hathaway Inc. Cl B', cusip: '084670702', sector: 'fin', shares: 8356796, valUsd: 4161266568, price: 497.95, deltaShares: -872900, chgPct: -9.46, action: 'down', exited: false, heldSince: '2018 Q4', noteZh: '第二基石(24.2%) · 准现金复利防御底座', noteEn: '#2 Fortress Core (24.2%) · Trimmed 872.9k sh', url: 'https://dataroma.com/m/holdings.php?m=HH' },
 { rank: 3, sym: 'PDD', nameZh: '拼多多控股', nameEn: 'PDD Holdings Inc.', cusip: '722304102', sector: 'cons', shares: 27990859, valUsd: 2181607550, price: 77.94, deltaShares: 2968765, chgPct: 11.86, action: 'up', exited: false, heldSince: '2024 Q1', noteZh: '跃居第三重仓 · Q3加仓296.9万股(+11.9%)', noteEn: '#3 Conviction Core · Added +2.97M sh (+11.9%)', url: 'https://valuesider.com/guru/duan-yongping-h-h-international-investment/buys-sells' },
 { rank: 4, sym: 'TSLA', nameZh: '特斯拉', nameEn: 'Tesla Inc.', cusip: '88160R101', sector: 'cons', shares: 4080000, valUsd: 1447624800, price: 354.81, deltaShares: 699600, chgPct: 20.70, action: 'up', exited: false, heldSince: '2026 Q1', noteZh: '2026建仓重注 · Q3趁回调大加69.96万股', noteEn: '2026 Major Entry · Added +699.6k sh (+20.7%)', url: 'https://valuesider.com/guru/duan-yongping-h-h-international-investment/buys-sells' },
 { rank: 5, sym: 'OXY', nameZh: '西方石油', nameEn: 'Occidental Petroleum Corp.', cusip: '674599105', sector: 'ind', shares: 10261500, valUsd: 567666180, price: 55.32, deltaShares: 0, chgPct: 0, action: 'hold', exited: false, heldSince: '2023 Q4', noteZh: '跟随巴菲特能源仓 · 1,026.15万股锁仓未动', noteEn: 'Coattail Energy Stake · 10.26M sh Unchanged', url: 'https://dataroma.com/m/holdings.php?m=HH' },
 { rank: 6, sym: 'NVDA', nameZh: '英伟达', nameEn: 'NVIDIA Corp.', cusip: '67066G104', sector: 'tech', shares: 2319475, valUsd: 529721701, price: 228.38, deltaShares: -3961200, chgPct: -63.07, action: 'down', exited: false, heldSince: '2025 Q1', noteZh: 'Q3高位大减63.1%(含被Call走) · 避开Q4暴跌', noteEn: 'Cut -63.1% (-3.96M sh) Near Peak Before Q4 Drop', url: 'https://m.cyzone.cn/article/854248.html' },
 { rank: 7, sym: 'GOOG', nameZh: '谷歌 Alphabet (C类)', nameEn: 'Alphabet Inc. Class C', cusip: '02079K107', sector: 'tech', shares: 1151700, valUsd: 392430258, price: 340.74, deltaShares: -816900, chgPct: -41.50, action: 'down', exited: false, heldSince: '2018 Q4', noteZh: '八年老仓 · Q3高位兑现81.69万股(-41.5%)', noteEn: '8-Yr Tech Core · Trimmed 816.9k sh (-41.5%)', url: 'https://valuesider.com/guru/duan-yongping-h-h-international-investment/buys-sells' },
 { rank: 8, sym: 'MSFT', nameZh: '微软公司', nameEn: 'Microsoft Corp.', cusip: '594918104', sector: 'tech', shares: 694100, valUsd: 356003890, price: 512.90, deltaShares: -60000, chgPct: -7.96, action: 'down', exited: false, heldSince: '2025 Q1', noteZh: '企业云与AI底座 · Q3微幅减持6.0万股', noteEn: 'Cloud & AI Anchor · Trimmed 60k sh (-8.0%)', url: 'https://dataroma.com/m/holdings.php?m=HH' },
 { rank: 9, sym: 'DIS', nameZh: '华特迪士尼', nameEn: 'The Walt Disney Co.', cusip: '254687106', sector: 'med', shares: 1706600, valUsd: 179022340, price: 104.90, deltaShares: 0, chgPct: 0, action: 'hold', exited: false, heldSince: '2020 Q1', noteZh: '全球主题乐园与百年IP · 170.66万股锁仓', noteEn: 'Global IP & Parks Moat · 1.71M sh Unchanged', url: 'https://dataroma.com/m/holdings.php?m=HH' },
 { rank: 10, sym: 'UNH', nameZh: '联合健康集团', nameEn: 'UnitedHealth Group Inc.', cusip: '91324P102', sector: 'med', shares: 399600, valUsd: 146685168, price: 367.08, deltaShares: 0, chgPct: 0, action: 'hold', exited: false, heldSince: '2026 Q1', noteZh: '2026Q1抄底商保龙头 · 39.96万股锁仓', noteEn: 'Managed Care Leader · 399.6k sh Unchanged', url: 'https://dataroma.com/m/holdings.php?m=HH' },
 { rank: 11, sym: 'CRDO', nameZh: 'Credo 高速互联', nameEn: 'Credo Technology Group Holding', cusip: 'G25457105', sector: 'tech', shares: 601300, valUsd: 117127227, price: 194.79, deltaShares: -99900, chgPct: -14.25, action: 'down', exited: false, heldSince: '2025 Q4', noteZh: 'AI数据中心高速连接芯片 · Q3减持9.99万股', noteEn: 'AI Interconnects · Trimmed 99.9k sh (-14.3%)', url: 'https://valuesider.com/guru/duan-yongping-h-h-international-investment/buys-sells' },
 { rank: 12, sym: 'SPCX', nameZh: 'SpaceX 太空探索', nameEn: 'Space Exploration Technologies Cl A', cusip: '84615Q103', sector: 'ind', shares: 199900, valUsd: 30156914, price: 150.86, deltaShares: 199900, chgPct: 9999, action: 'up', exited: false, heldSince: '2026 Q3', noteZh: 'Q3唯一新进建仓 · 二季度上市后首买19.99万股', noteEn: 'Only Q3 New Buy · 199.9k sh Post-Listing Entry', url: 'https://news.futunn.com/en/post/1004717755/li-lu-and-duan-yongping-continued-to-increase-their-pdd' },
 { rank: 13, sym: 'PLTR', nameZh: 'Palantir 大数据', nameEn: 'Palantir Technologies Inc.', cusip: '69608A108', sector: 'tech', shares: 60000, valUsd: 11223000, price: 187.05, deltaShares: 0, chgPct: 0, action: 'hold', exited: false, heldSince: '2026 Q1', noteZh: '企业级AI决策软件观察仓 · 6万股锁仓', noteEn: 'Enterprise AI Radar Line · 60k sh Unchanged', url: 'https://www.chartloom.com/c/superinvestors/duan-yongping' },
 { rank: 14, sym: 'SNPS', nameZh: '新思科技', nameEn: 'Synopsys Inc.', cusip: '871607107', sector: 'tech', shares: 10000, valUsd: 4349000, price: 434.90, deltaShares: 0, chgPct: 0, action: 'hold', exited: false, heldSince: '2026 Q1', noteZh: '全球EDA芯片设计软件双寡头 · 1万股锁仓', noteEn: 'EDA Semiconductor Duopoly · 10k sh Unchanged', url: 'https://www.chartloom.com/c/superinvestors/duan-yongping' },
 { rank: 15, sym: 'SNOW', nameZh: 'Snowflake 云数仓', nameEn: 'Snowflake Inc.', cusip: '833445109', sector: 'tech', shares: 10000, valUsd: 3396000, price: 339.60, deltaShares: 0, chgPct: 0, action: 'hold', exited: false, heldSince: '2025 Q4', noteZh: '云原生数据仓库观察仓 · 1万股锁仓', noteEn: 'Cloud Data Platform Radar · 10k sh Unchanged', url: 'https://www.chartloom.com/c/superinvestors/duan-yongping' },
 { rank: 16, sym: 'TEM', nameZh: 'Tempus AI 精准医疗', nameEn: 'Tempus AI Inc.', cusip: '88023B103', sector: 'med', shares: 20000, valUsd: 1638000, price: 81.90, deltaShares: 0, chgPct: 0, action: 'hold', exited: false, heldSince: '2026 Q1', noteZh: '肿瘤基因组与医疗AI观察仓 · 2万股锁仓', noteEn: 'Oncology & Bio-AI Radar · 20k sh Unchanged', url: 'https://www.chartloom.com/c/superinvestors/duan-yongping' },
 { rank: 17, sym: 'BABA', nameZh: '阿里巴巴 (Q3清仓)', nameEn: 'Alibaba Group Holding Ltd (Exited)', cusip: '01609W102', sector: 'cons', shares: 0, valUsd: 0, prevValUsd: 28928372, price: 95.98, deltaShares: -301400, chgPct: -100.0, action: 'exit', exited: true, heldSince: '2026 Q2', noteZh: 'Q3全数清仓 -30.14万股(原Q2市值$28.93M)', noteEn: 'Sold Out -301,400 ADS in Q3 (Was $28.93M in Q2)', url: 'https://news.futunn.com/en/post/1004728231/china-s-buffett-duan-yongping-s-q3-us-equity-holdings' },
 { rank: 18, sym: 'CRCL', nameZh: 'Circle 稳定币 (Q3清仓)', nameEn: 'Circle Internet Group Inc. (Exited)', cusip: '172573107', sector: 'fin', shares: 0, valUsd: 0, prevValUsd: 12526000, price: 62.63, deltaShares: -200000, chgPct: -100.0, action: 'exit', exited: true, heldSince: '2026 Q1', noteZh: 'Q3全数清仓 -20.0万股(原Q2市值$12.53M)', noteEn: 'Sold Out -200,000 sh in Q3 (Was $12.53M in Q2)', url: 'https://news.futunn.com/en/post/1004728231/china-s-buffett-duan-yongping-s-q3-us-equity-holdings' },
 { rank: 19, sym: 'INOD', nameZh: 'Innodata (Q3清仓)', nameEn: 'Innodata Inc. (Exited)', cusip: '457642205', sector: 'tech', shares: 0, valUsd: 0, prevValUsd: 755800, price: 75.58, deltaShares: -10000, chgPct: -100.0, action: 'exit', exited: true, heldSince: '2026 Q1', noteZh: 'Q3全数清仓 -1.0万股(原Q2市值$0.76M)', noteEn: 'Sold Out -10,000 sh in Q3 (Was $0.76M in Q2)', url: 'https://news.futunn.com/en/post/1004728231/china-s-buffett-duan-yongping-s-q3-us-equity-holdings' }
 ];

 var SECTOR_META = {
 tech: { zh: '科技生态与AI算力', en: 'Tech & AI Ecosystem', chip: 'mui-chip-primary', cStart: '#3399FF', cEnd: '#0073E6' },
 fin: { zh: '多元金融控股底座', en: 'Financial Fortress', chip: 'mui-chip-warning', cStart: '#FBBF24', cEnd: '#D97706' },
 cons: { zh: '全球电商与智能出行', en: 'E-Commerce & EV', chip: 'mui-chip-success', cStart: '#34D399', cEnd: '#16A34A' },
 ind: { zh: '传统能源与商业航天', en: 'Energy & Aerospace', chip: 'mui-chip-violet', cStart: '#A78BFA', cEnd: '#7C3AED' },
 med: { zh: '传媒IP与医疗健康', en: 'Media IP & Healthcare', chip: '', cStart: '#38BDF8', cEnd: '#0284C7' }
 };

 var RICH_BLOCKS = {
 hero_h1: {
 zh: '段永平 (H&amp;H International Investment) 2026Q3 持仓全景深度研报：<span class="gradient-accent">$171.9亿美股核心重仓、63%减持英伟达的期权真相与“买股票就是买公司”</span>',
 en: 'Duan Yongping (H&amp;H International Investment) Q3 2026 Portfolio Deep Dive: <span class="gradient-accent">$17.19B 13F Core, The Option Mechanics Behind NVIDIA\'s 63% Cut &amp; Business-Owner Investing</span>'
 },
 hero_lead: {
 zh: '根据步步高、OPPO 与 vivo 幕后缔造者<strong>段永平（雪球 ID“大道无形我有型”）</strong>执掌的投资机构 <strong>H&amp;H International Investment, LLC</strong>（SEC CIK <code>0001759760</code>）于 <strong>2026 年 11 月 16 日</strong>向美国证监会提交的最新 Form 13F-HR 报告（截至 2026 年 9 月 30 日，档案号 <code>0001759760-26-000008</code>），其美股公开多头组合共持有 <strong>16 只证券</strong>，总申报市值为 <strong>$171.91 亿美元（$17,190,742,843）</strong>，较 2026Q2（18 只，$191.01 亿）环比回落 <strong>-10.00%</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1759760/000175976026000008/0001759760-26-000008-index.htm" target="_blank" rel="noopener noreferrer">SEC 13F-HR ↗</a> <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">Valuesider Q3 ↗</a>。本季组合延续惊人的头部集中度：<strong>苹果（41.07% / $70.61 亿）与伯克希尔·哈撒韦 B 股（24.21% / $41.61 亿）</strong>稳居前两大重仓，合计占比达 <strong>65.28%</strong>；叠加逆势加仓的<strong>拼多多（+11.86% 至 $21.82 亿 / 12.69%）</strong>、<strong>特斯拉（+20.70% 至 $14.48 亿 / 8.42%）</strong>以及锁仓未动的<strong>西方石油（$5.68 亿 / 3.30%）</strong>，前五大重仓囊括了整份美股组合的 <strong>89.69%</strong>（前十大更高达 <strong>99.02%</strong>） <a class="cite-link" href="https://dataroma.com/m/holdings.php?m=HH" target="_blank" rel="noopener noreferrer">Dataroma 13F ↗</a>。与此同时，H&amp;H 在 Q3 高位大砍 <strong>英伟达（-63.07% 至 231.95 万股）</strong>、减持谷歌 C 类股（-41.50%）与苹果（-21.76%），清仓阿里巴巴、Circle 与 Innodata，并首次建仓商业航天龙头 <strong>SpaceX（19.99 万股 / $3,016 万）</strong>；结合其高达 <strong>$255.0 亿美元</strong>的 Form ADV 管理总规模（含未体现在 13F 中的期权保证金现金美债池）以及 A 股<strong>贵州茅台</strong>、港股<strong>腾讯控股与泡泡玛特</strong>的公开操作，方可还原段永平跨中美三地、正股与期权协同的完整投资版图 <a class="cite-link" href="https://aum13f.com/firm/h-h-international-investment-llc" target="_blank" rel="noopener noreferrer">Form ADV $25.5B ↗</a> <a class="cite-link" href="https://m.cyzone.cn/article/854248.html" target="_blank" rel="noopener noreferrer">期权压力测试 ↗</a>。',
 en: 'According to the Q3 2026 Form 13F-HR filed on <strong>November 16, 2026</strong> by <strong>H&amp;H International Investment, LLC</strong> (SEC CIK <code>0001759760</code>; Accession <code>0001759760-26-000008</code>)—the Palo Alto investment firm managed by BBK/OPPO/vivo founder <strong>Duan Yongping</strong>—its U.S.-listed equity portfolio holds <strong>16 positions</strong> valued at <strong>$17.19B ($17,190,742,843)</strong> as of September 30, 2026, down <strong>-10.00%</strong> QoQ from $19.10B across 18 stocks <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1759760/000175976026000008/0001759760-26-000008-index.htm" target="_blank" rel="noopener noreferrer">SEC 13F-HR ↗</a> <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">Valuesider Q3 ↗</a>. Portfolio concentration remains extraordinary: <strong>Apple (41.07% / $7.06B) and Berkshire Hathaway Class B (24.21% / $4.16B)</strong> make up <strong>65.28%</strong>, while conviction additions in <strong>PDD Holdings (+11.86% to $2.18B / 12.69%)</strong> and <strong>Tesla (+20.70% to $1.45B / 8.42%)</strong> plus unchanged <strong>Occidental Petroleum ($568M / 3.30%)</strong> lift the top five to <strong>89.69%</strong> (and top ten to <strong>99.02%</strong>) <a class="cite-link" href="https://dataroma.com/m/holdings.php?m=HH" target="_blank" rel="noopener noreferrer">Dataroma 13F ↗</a>. In Q3, H&amp;H slashed <strong>NVIDIA by -63.07%</strong> near peak prices, trimmed Alphabet (-41.50%) and Apple (-21.76%), exited Alibaba, Circle, and Innodata, and initiated newly listed <strong>SpaceX (199.9k sh / $30.16M)</strong>. Combining H&amp;H\'s <strong>$25.50B Form ADV regulatory AUM</strong> (reflecting cash/T-bill collateral for puts) with Duan\'s personal core holdings in <strong>Kweichow Moutai, Tencent, and Pop Mart</strong> reveals his complete cross-border compounding engine <a class="cite-link" href="https://aum13f.com/firm/h-h-international-investment-llc" target="_blank" rel="noopener noreferrer">Form ADV $25.5B ↗</a> <a class="cite-link" href="https://m.cyzone.cn/article/854248.html" target="_blank" rel="noopener noreferrer">Option Mechanics ↗</a>.'
 },
 kpi_desc_1: {
 zh: '精确申报值 $17,190,742,843（共 16 只美股正股，无看涨/看跌期权多头行），较 Q2（$19.10B）兑现回落约 $19.1 亿 <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">Valuesider ↗</a>。',
 en: 'Exact SEC total of $17,190,742,843 across 16 common-stock lines (zero long option lines), down -$1.91B from Q2\'s $19.10B <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">Valuesider ↗</a>.'
 },
 kpi_desc_2: {
 zh: 'CRD #292451 备案总规模 $25,499,731,823，超出 13F 约 $83.1 亿系现金/短债期权保证金与非美证券储备 <a class="cite-link" href="https://www.quiverquant.com/institutions/H&H%20International%20Investment,%20LLC/" target="_blank" rel="noopener noreferrer">QuiverQuant ADV ↗</a>。',
 en: 'CRD #292451 reports $25,499,731,823 total AUM—the ~$8.31B gap above 13F reflects cash/T-bill collateral for puts &amp; non-U.S. assets <a class="cite-link" href="https://www.quiverquant.com/institutions/H&H%20International%20Investment,%20LLC/" target="_blank" rel="noopener noreferrer">QuiverQuant ADV ↗</a>.'
 },
 kpi_desc_3: {
 zh: 'AAPL（41.07%）与 BRK.B（24.21%）合共 $112.22 亿，叠加 PDD、TSLA、OXY 前五合计达 $154.19 亿（前十占 99.02%） <a class="cite-link" href="https://gurutrack.ai/guru/duan-yongping" target="_blank" rel="noopener noreferrer">GuruTrack ↗</a>。',
 en: 'AAPL (41.07%) + BRK.B (24.21%) = $11.22B; adding PDD, TSLA &amp; OXY brings the top 5 to $15.42B (top 10 = 99.02%) <a class="cite-link" href="https://gurutrack.ai/guru/duan-yongping" target="_blank" rel="noopener noreferrer">GuruTrack ↗</a>.'
 },
 kpi_desc_4: {
 zh: '新进 SpaceX（$30.2M），增持 PDD 与 TSLA，减持 NVDA/GOOG/AAPL 等 6 票，清仓阿里、Circle 与 Innodata <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/buys-sells" target="_blank" rel="noopener noreferrer">Q3 Buys &amp; Sells ↗</a>。',
 en: '1 new buy (SPCX $30.2M), 2 additions (PDD, TSLA), 6 trims (NVDA, GOOG, AAPL, BRK.B, CRDO, MSFT), and 3 full exits <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/buys-sells" target="_blank" rel="noopener noreferrer">Q3 Buys &amp; Sells ↗</a>.'
 },
 reconcile_alert: {
 zh: '<strong>为什么 H&amp;H 的 Form ADV 备案总规模（$255.0 亿）比 Q3 13F 市值（$171.9 亿）高出逾 $83 亿美元？</strong> —— 根据美国 SEC 规则，Form 13F 仅统计季度末持有的美股多头证券及买入期权（Long Put/Call），<strong>完全不披露卖出看跌/看涨期权（Short Put / Covered Call）、美元现金、短期美国国债以及港股/A股等非美本土上市股票</strong> <a class="cite-link" href="https://whalewisdom.com/filer/hamph-international-investment-llc" target="_blank" rel="noopener noreferrer">WhaleWisdom ADV ↗</a>。当苹果、英伟达等重仓股在三季度因备兑看涨期权行权“被 Call 走”转化为现金美债时，13F 表内市值随之缩水 -$19.1 亿，但真实净资产并未流失，而是沉淀为随时准备在四季度回调中重新接货的现金担保池。',
 en: '<strong>Why does H&amp;H\'s Form ADV report $25.50B in AUM compared with $17.19B in Form 13F?</strong> — Under SEC rules, Form 13F captures only U.S.-listed long equities and purchased options; it <strong>completely excludes short put/call options (Sell Put / Covered Call), cash, U.S. Treasury bills, and non-U.S. shares (HKEx / A-shares)</strong> <a class="cite-link" href="https://whalewisdom.com/filer/hamph-international-investment-llc" target="_blank" rel="noopener noreferrer">WhaleWisdom ADV ↗</a>. When shares of Apple or NVIDIA are called away via covered calls into cash/T-bills, 13F equity value shrinks (-$1.91B QoQ) while total fund equity stays intact as cash-secured put firepower.'
 },
 matrix_body_1: {
 zh: '段永平自 2011 年起个人重仓苹果，H&amp;H 自 2018Q4 首次披露 13F 以来始终将其列为第一大持仓。2026Q3 末持有 <strong>21,202,403 股</strong>（期末单价 $333.02，市值 <strong>$7,060,824,247</strong>），季度内顺势减持 589.63 万股（-21.76%），但仍占据美股组合逾四成权重 <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">AAPL 41.07% ↗</a>。',
 en: 'Duan first bought Apple heavily in 2011, and AAPL has ranked #1 in every H&amp;H 13F since Q4 2018. At Q3 2026 end, H&amp;H held <strong>21,202,403 shares</strong> ($333.02/sh; <strong>$7,060,824,247</strong>) after trimming 5.90M shares (-21.76%), retaining a commanding 41.07% weight <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">AAPL 41.07% ↗</a>.'
 },
 matrix_body_2: {
 zh: '2006 年以 $62.01 万拍下巴菲特午餐后，伯克希尔便成为段永平的精神与资产双重基石。Q3 末持有 <strong>8,356,796 股</strong>（市值 <strong>$4,161,266,568</strong>，微调 -9.46%），与西方石油（1,026.15 万股 / $5.68 亿，一股未动）构成“巴菲特系”底仓 <a class="cite-link" href="https://dataroma.com/m/holdings.php?m=HH" target="_blank" rel="noopener noreferrer">BRK.B &amp; OXY ↗</a>。',
 en: 'Ever since winning Warren Buffett\'s charity lunch in 2006, Berkshire has anchored Duan\'s portfolio. H&amp;H ended Q3 with <strong>8,356,796 Class B shares</strong> (<strong>$4,161,266,568</strong>, -9.46% QoQ), paired with an unchanged 10.26M-share ($568M) stake in Occidental Petroleum <a class="cite-link" href="https://dataroma.com/m/holdings.php?m=HH" target="_blank" rel="noopener noreferrer">BRK.B &amp; OXY ↗</a>.'
 },
 matrix_body_3: {
 zh: 'Q3 段永平在全面清仓 30.14 万股阿里巴巴（BABA）的同时，将中概股火力彻底聚焦于<strong>拼多多（增持 +296.88 万股 / +11.86% 至 2,799.09 万股）</strong>，并趁特斯拉单季回调 -15.6% 之机<strong>加仓 +69.96 万股（+20.70% 至 408.0 万股）</strong>，同时新买 <strong>SpaceX 19.99 万股（$3,016 万）</strong> <a class="cite-link" href="https://finance.ifeng.com/c/8y881dXF0W6" target="_blank" rel="noopener noreferrer">凤凰财经调仓拆解 ↗</a>。',
 en: 'While liquidating all 301.4k Alibaba ADS, H&amp;H concentrated Chinese e-commerce exposure into <strong>PDD (+2.97M sh / +11.86% to 27.99M sh)</strong>, bought into Tesla\'s -15.6% Q3 pullback (<strong>+699.6k sh / +20.70% to 4.08M sh</strong>), and opened a <strong>199.9k-share ($30.2M) stake in SpaceX</strong> <a class="cite-link" href="https://finance.ifeng.com/c/8y881dXF0W6" target="_blank" rel="noopener noreferrer">Ifeng Finance ↗</a>.'
 },
 matrix_body_4: {
 zh: 'H&amp;H 曾于 2025Q4–2026Q1 将英伟达猛增 23 倍至 1,384.38 万股（$24 亿），随后在 2026Q2（降至 628.07 万股）与 2026Q3（再减 396.12 万股至 <strong>2,319,475 股 / $5.30 亿</strong>）连续高位收缩，精准避开四季度黄仁勋离职风波引发的 -31.6% 暴跌 <a class="cite-link" href="https://news.sina.com.cn/c/2026-11-18/doc-inizaitv5297125.shtml" target="_blank" rel="noopener noreferrer">新浪财经 11-18 ↗</a>。',
 en: 'After scaling NVIDIA 23x to 13.84M shares ($2.4B) by Q1 2026, H&amp;H cut the stake in Q2 (to 6.28M) and Q3 (by -63.07% to <strong>2,319,475 shares / $529.7M</strong>) near all-time highs—sidestepping Q4\'s -31.6% plunge amid Jensen Huang\'s CEO exit <a class="cite-link" href="https://news.sina.com.cn/c/2026-11-18/doc-inizaitv5297125.shtml" target="_blank" rel="noopener noreferrer">Sina News 11-18 ↗</a>.'
 },
 pros_card: {
 zh: '<strong>1. 企业家级商业直觉：</strong>三十年一线制造业、品牌营销与渠道管理功底，使其能穿透短期财报噪音，精准识别苹果、茅台、腾讯与拼多多的文化基因与十年自由现金流。<br/><strong>2. 零赎回压力与极简组织：</strong>2 人团队管理逾 $255 亿长线自有与超高净值资金，无需迎合季度排名，敢于在拼多多、特斯拉与茅台逆风期连续左侧加码。<br/><strong>3. 无杠杆现金担保期权：</strong>只对真正想长期持有的公司卖 Put，把市场高波动转化为源源不断的现金流补贴。',
 en: '<strong>1. Operator Business Acumen:</strong> Three decades of consumer-electronics manufacturing and brand building provide unmatched insight into Apple, Moutai, Tencent, and PDD.<br/><strong>2. Permanent Capital &amp; 2-Person Focus:</strong> Zero retail redemption pressure allows patient contrarian accumulation during drawdowns.<br/><strong>3. Unleveraged Option Yield:</strong> Writing 100% cash-secured puts monetizes volatility on high-conviction targets.'
 },
 cons_card: {
 zh: '<strong>1. 期权行权引发的“假看空/假长持”错觉：</strong>如阿里巴巴（30.14万股仅驻留一季即清仓）常源于卖 Put 到期被动接盘后再被 Call 走，而英伟达减持 63% 亦含大量备兑看涨期权被动交割。<br/><strong>2. 观察仓与重仓天壤之别：</strong>第 11–16 名（CRDO、SPCX、PLTR、SNPS、SNOW、TEM）合计仅占组合 <strong>0.99%</strong>，属于学习跟踪仓，切勿当作重仓信号梭哈。<br/><strong>3. 遗漏茅台与腾讯两大支柱：</strong>A 股茅台与港股腾讯不入美股 13F，单看美股会严重低估其大中华消费与互联网权重。',
 en: '<strong>1. Option Exercise Illusions:</strong> Brief appearances like Alibaba (301.4k sh held 1 quarter) or sharp cuts like NVIDIA (-63%) often reflect put assignments and covered-call exercises rather than directional flips.<br/><strong>2. Tiny Radar Sleeves:</strong> Positions #11–#16 (CRDO, SPCX, PLTR, SNPS, SNOW, TEM) total just <strong>0.99%</strong> combined.<br/><strong>3. Missing Moutai &amp; Tencent:</strong> A-share Moutai and HKEx Tencent never appear in SEC 13F filings.'
 },
 timeline_1: {
 zh: '2026Q1 H&amp;H 将英伟达推升至 1,384.38 万股（$24 亿，占 12.07%），并新进特斯拉、联合健康、Tempus AI 等使 13F 总值冲上 $200 亿美元高点；4–5 月段永平精读泡泡玛特创始人王宁《因为独特》并探店调研，撤回“不投”成见，将港股中国神华换仓并通过卖 Put 大举布局泡泡玛特 <a class="cite-link" href="https://www.shobserver.com/staticsg/res/html/web/newsDetail.html?id=1108572&sid=11" target="_blank" rel="noopener noreferrer">上观新闻：神华换泡泡玛特 ↗</a>。',
 en: 'In Q1 2026, H&amp;H lifted NVIDIA to 13.84M shares ($2.4B / 12.07%) and added Tesla, UnitedHealth &amp; Tempus AI as 13F value hit $20.0B. In Apr–May, after reading Pop Mart founder Wang Ning\'s interviews and visiting stores, Duan swapped China Shenhua H-shares into Pop Mart via cash-secured puts <a class="cite-link" href="https://www.shobserver.com/staticsg/res/html/web/newsDetail.html?id=1108572&sid=11" target="_blank" rel="noopener noreferrer">Shobserver: Pop Mart Pivot ↗</a>.'
 },
 timeline_2: {
 zh: 'Q2–Q3 趁英伟达冲向历史高位（10月初触及 $243.37），通过正股调节与备兑看涨期权交割将其从 1,384 万股连续降至 628 万股再降至 231.9 万股，同步加仓拼多多（至 2,799 万股）、特斯拉（至 408 万股）并新进二季度刚上市的 SpaceX（19.99 万股）；9 月 28 日以 1,230.85 元/股再买 3 万股贵州茅台（耗资 3,692.54 万元，完成年内第三次加仓） <a class="cite-link" href="https://wap.eastmoney.com/a/202609293886430964.html" target="_blank" rel="noopener noreferrer">东方财富：三加茅台 ↗</a>。',
 en: 'Across Q2–Q3, as NVIDIA climbed toward its $243.37 peak, H&amp;H reduced NVDA from 13.84M to 6.28M and then 2.32M shares while boosting PDD (27.99M sh), Tesla (4.08M sh), and initiating newly listed SpaceX (199.9k sh). On Sep 28, Duan bought 30,000 Moutai shares at ¥1,230.85 (¥36.93M, his 3rd 2026 addition) <a class="cite-link" href="https://wap.eastmoney.com/a/202609293886430964.html" target="_blank" rel="noopener noreferrer">Eastmoney: 3rd Moutai Buy ↗</a>.'
 },
 timeline_3: {
 zh: '10 月初晒单卖出 2,000 张腾讯 2026-10-29 到期、行权价 420 港元认沽期权（收权利金 208 万港元，对应承接 20 万股 / 8,400 万港元资金）；11 月中旬面对黄仁勋卸任风波及英伟达逾 30% 回撤，段永平公开表态“不想急着逃”，直言将买回部分此前被 Call 走的股份并当天卖出英伟达 Put <a class="cite-link" href="https://www.hk01.com/%E8%B2%A1%E7%B6%93%E5%BF%AB%E8%A8%8A/60397757/%E4%B8%AD%E5%9C%8B%E5%B7%B4%E8%8F%B2%E7%89%B9-%E9%A8%B0%E8%A8%8A%E5%8F%88%E8%B7%8C%E4%BA%86-%E6%AE%B5%E6%B0%B8%E5%B9%B3-%E5%85%88%E8%B3%A3%E9%BB%9Eput%E5%90%A7-%E6%94%B6208%E8%90%AC%E6%9C%9F%E6%AC%8A%E9%87%91" target="_blank" rel="noopener noreferrer">香港01：卖腾讯Put ↗</a>。',
 en: 'In early October, Duan sold 2,000 Tencent HK$420 Oct 29 put contracts (collecting HK$2.08M premium on HK$84M notional). In mid-November, amid NVIDIA\'s >30% post-CEO-exit slide, he stated he "doesn\'t want to flee in a hurry" and sold puts to re-acquire called-away shares <a class="cite-link" href="https://www.hk01.com/%E8%B2%A1%E7%B6%93%E5%BF%AB%E8%A8%8A/60397757/%E4%B8%AD%E5%9C%8B%E5%B7%B4%E8%8F%B2%E7%89%B9-%E9%A8%B0%E8%A8%8A%E5%8F%88%E8%B7%8C%E4%BA%86-%E6%AE%B5%E6%B0%B8%E5%B9%B3-%E5%85%88%E8%B3%A3%E9%BB%9Eput%E5%90%A7-%E6%94%B6208%E8%90%AC%E6%9C%9F%E6%AC%8A%E9%87%91" target="_blank" rel="noopener noreferrer">HK01: Tencent Puts ↗</a>.'
 },
 non13f_1: {
 zh: '自 2012 年 180 元附近重仓建仓至今一股未卖，并将每年巨额分红持续复投。2026 年 2 月（~1,474元）、5 月（~1,371元）及 9 月 28 日（1,230.85元买3万股）连续逆势加码，视其 ~4% 股息率对比 1.67% 十年期国债具备极高确定性溢价 <a class="cite-link" href="https://wap.eastmoney.com/a/202609293886430964.html" target="_blank" rel="noopener noreferrer">茅台加仓路径 ↗</a>。',
 en: 'Held untouched since ~¥180/sh in 2012 with dividends continually reinvested. Publicly added 3 times in 2026—Feb (~¥1,474), May (~¥1,371), and Sep 28 (30k shares @ ¥1,230.85)—citing its ~4% dividend yield vs. 1.67% 10Y Chinese government bonds <a class="cite-link" href="https://wap.eastmoney.com/a/202609293886430964.html" target="_blank" rel="noopener noreferrer">Moutai Additions ↗</a>.'
 },
 non13f_2: {
 zh: '早期持有美股 ADR（TCEHY，不属 SEC 13F 清单）后逐步集中于港股 0700.HK。2026 年 10 月腾讯跌破 420 港元之际，段永平果断卖出 2,000 张 420 港元认沽期权（承接 20 万股），直言“买腾讯肯定比存银行好” <a class="cite-link" href="https://finance.sina.com.cn/roll/2026-10-07/doc-iniumivx4772572.shtml" target="_blank" rel="noopener noreferrer">新浪：布局腾讯 ↗</a>。',
 en: 'Held via HKEx 0700.HK and OTC ADR TCEHY (both exempt from Form 13F). In Oct 2026, as Tencent dipped below HK$420, Duan wrote 2,000 HK$420 put contracts (backing 200k shares), remarking that owning Tencent handily beats bank deposits <a class="cite-link" href="https://finance.sina.com.cn/roll/2026-10-07/doc-iniumivx4772572.shtml" target="_blank" rel="noopener noreferrer">Sina: Tencent Trade ↗</a>.'
 },
 non13f_3: {
 zh: '展现了段永平罕见的公开自我修正：2026 年 1 月尚担忧潮玩“万一过两年大家不要了”，3–4 月实地探店并深读王宁访谈后推翻旧见，趁股价自高点腰斩之际把神华港股换成泡泡玛特并连续卖 Put 收租 <a class="cite-link" href="https://www.moomoo.com/hans/community/feed/duan-yongping-sells-off-225-000-put-options-decoding-the-116408150654981" target="_blank" rel="noopener noreferrer">Moomoo 期权解析 ↗</a>。',
 en: 'A textbook display of intellectual honesty: skeptical in Jan 2026, Duan studied Wang Ning\'s system and visited stores in Mar–Apr, retracted his earlier skepticism, and rotated China Shenhua H-shares into Pop Mart via cash-secured puts after a 50% drawdown <a class="cite-link" href="https://www.moomoo.com/hans/community/feed/duan-yongping-sells-off-225-000-put-options-decoding-the-116408150654981" target="_blank" rel="noopener noreferrer">Moomoo Put Breakdown ↗</a>.'
 },
 non13f_4: {
 zh: '第 11–16 位持仓合计市值约 $1.68 亿美元（占 13F 仅 0.99%），涵盖数据中心高速连接芯片 Credo（$1.17 亿）、新上市商业航天霸主 SpaceX（$3,016 万）及 Palantir、新思科技、Snowflake、Tempus AI，承担前沿产业跟踪触角职能 <a class="cite-link" href="https://www.chnfund.com/article/ARd1ad8345-911c-80dc-7d50-3a24fa120aac" target="_blank" rel="noopener noreferrer">中国基金报 16只全览 ↗</a>。',
 en: 'Positions #11–#16 total ~$167.9M (just 0.99% of 13F), spanning AI interconnect leader Credo ($117.1M), newly listed SpaceX ($30.2M), Palantir ($11.2M), Synopsys ($4.35M), Snowflake ($3.40M), and Tempus AI ($1.64M) <a class="cite-link" href="https://www.chnfund.com/article/ARd1ad8345-911c-80dc-7d50-3a24fa120aac" target="_blank" rel="noopener noreferrer">China Fund News ↗</a>.'
 }
 };

 var PILLAR_NOTES = [
 {
 zh: '<strong>当前选中支柱解读（01 “三好公司”与超集中重仓）：</strong>2026Q3 前两大重仓（AAPL 41.07% + BRK.B 24.21%）占 65.28%，前五大（+PDD、TSLA、OXY）达 89.69%，前十大更高达 99.02% <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">Valuesider 99% Top-10 ↗</a>。',
 en: '<strong>Selected Pillar (01 · Ultra-Concentrated Compounders):</strong> Top 2 holdings (AAPL 41.07% + BRK.B 24.21%) represent 65.28%, Top 5 hit 89.69%, and Top 10 command 99.02% of H&amp;H\'s 13F book <a class="cite-link" href="https://valuesider.com/guru/duan-yongping-h-h-international-investment/portfolio" target="_blank" rel="noopener noreferrer">Valuesider 99% Top-10 ↗</a>.'
 },
 {
 zh: '<strong>当前选中支柱解读（02 “不对的事情不做”清单）：</strong>H&amp;H 从不使用保证金杠杆或裸卖空；对不再契合长期逻辑的阿里巴巴（30.14万股）与 Circle（20万股）在 Q3 干净利落一键清零 <a class="cite-link" href="https://news.futunn.com/en/post/1004728231/china-s-buffett-duan-yongping-s-q3-us-equity-holdings" target="_blank" rel="noopener noreferrer">Q3 清仓纪律 ↗</a>。',
 en: '<strong>Selected Pillar (02 · Stop-Doing List &amp; Zero Leverage):</strong> H&amp;H avoids margin debt and naked shorts entirely, cleanly liquidating non-core positions like Alibaba (301.4k ADS) and Circle (200k sh) in Q3 <a class="cite-link" href="https://news.futunn.com/en/post/1004728231/china-s-buffett-duan-yongping-s-q3-us-equity-holdings" target="_blank" rel="noopener noreferrer">Q3 Exits ↗</a>.'
 },
 {
 zh: '<strong>当前选中支柱解读（03 “无处可去”机会成本锚）：</strong>茅台在 2600 元未卖、1230 元继续买，核心在于对比十年期国债（1.67%）与银行存款后，优质现金牛的长期折现回报依然胜出 <a class="cite-link" href="https://wap.eastmoney.com/a/202609293886430964.html" target="_blank" rel="noopener noreferrer">机会成本逻辑 ↗</a>。',
 en: '<strong>Selected Pillar (03 · Opportunity-Cost Anchor):</strong> Holding Moutai across cycles and adding at ¥1,230.85 stems from comparing its ~4% growing yield against 1.67% 10Y bonds—cost basis never dictates action <a class="cite-link" href="https://wap.eastmoney.com/a/202609293886430964.html" target="_blank" rel="noopener noreferrer">Opportunity Cost ↗</a>.'
 },
 {
 zh: '<strong>当前选中支柱解读（04 卖 Put“保险公司”期权增强）：</strong>Form ADV 披露的 $255 亿总规模与 $171.9 亿 13F 之间逾 $83 亿差额，正是支撑段永平高频滚动卖出腾讯、苹果、泡泡玛特与英伟达认沽期权的足额现金池 <a class="cite-link" href="https://aum13f.com/firm/h-h-international-investment-llc" target="_blank" rel="noopener noreferrer">ADV $25.5B ↗</a>。',
 en: '<strong>Selected Pillar (04 · Cash-Secured Put Flywheel):</strong> The ~$8.31B reserve between H&amp;H\'s $25.50B Form ADV AUM and $17.19B 13F equities backs cash-secured puts across Tencent, Apple, Pop Mart, and NVIDIA <a class="cite-link" href="https://aum13f.com/firm/h-h-international-investment-llc" target="_blank" rel="noopener noreferrer">ADV $25.5B ↗</a>.'
 }
 ];

 var CHECKLIST_ITEMS = [
 {
 tagZh: '识别期权交割', tagEn: 'Option Assignment Check',
 titleZh: '1. 区分主动看空与期权“被 Call 走”：是否误读了减持信号？',
 titleEn: '1. Separate Bearish Selling from Covered-Call Exercises: Was it called away?',
 descZh: '例如 2026Q3 英伟达减持 63.1% 与苹果减持 21.8%，很大一部分源于高位备兑看涨期权（Buy-Write）到期被动交割，而非彻底看空基本面。',
 descEn: 'H&H\'s -63.1% NVDA and -21.8% AAPL Q3 reductions largely reflect covered calls being exercised into strength rather than fundamental abandonment.'
 },
 {
 tagZh: '权重决定信度', tagEn: 'Position Sizing Filter',
 titleZh: '2. 区分 40% 身家重仓与 0.05% 观察仓：是否把试探仓当成重注？',
 titleEn: '2. Distinguish 40% Core Bets from 0.05% Radar Lines: How big is the weight?',
 descZh: '前五大持仓占 89.69%，而第 11–16 名（CRDO、SPCX、PLTR、SNPS、SNOW、TEM）合计不足 1%，盲目重仓跟买尾部观察仓风险极高。',
 descEn: 'Top 5 positions make up 89.69%, whereas #11–#16 (CRDO, SPCX, PLTR, SNPS, SNOW, TEM) total just 0.99%—never ape tiny radar lines blindly.'
 },
 {
 tagZh: '还原 ADV 现金池', tagEn: '$8.3B Cash Buffer',
 titleZh: '3. 纳入 Form ADV $255 亿分母：是否预留了充足现金安全垫？',
 titleEn: '3. Account for the $25.5B Form ADV Denominator: Do you hold cash reserves?',
 descZh: 'H&H 除 $171.9 亿美股外仍有逾 $83 亿现金短债与非美资产用于担保卖 Put，切忌用满仓甚至融资杠杆去模仿其无杠杆组合。',
 descEn: 'H&H holds ~$8.3B outside its $17.19B 13F book to collateralize cash-secured puts—never replicate an unleveraged portfolio using margin debt.'
 },
 {
 tagZh: '跨市场三足鼎立', tagEn: 'Cross-Border Triad',
 titleZh: '4. 补齐 A 股与港股拼图：是否看见了 13F 之外的茅台与腾讯？',
 titleEn: '4. Include Non-13F Pillars: Did you factor in Moutai &amp; Tencent?',
 descZh: '段永平真正的压舱石是“苹果 + 贵州茅台 + 腾讯控股 + 伯克希尔”，脱离茅台与腾讯只看 13F 会导致行业与地域分布认知失真。',
 descEn: 'Duan\'s true foundation spans Apple, Kweichow Moutai, Tencent, and Berkshire; reading Form 13F alone misses his massive Greater China core.'
 },
 {
 tagZh: '45天披露时滞', tagEn: '45-Day Filing Lag',
 titleZh: '5. 核查季末后价格与动态：季末至今股价是否已发生剧变？',
 titleEn: '5. Check Post-Quarter Price Swings: How much moved during the 45-day lag?',
 descZh: '如英伟达在 9 月 30 日（$228.38）至 11 月 16 日披露日已暴跌逾 31%，段永平已从 Q3 的高位兑现转为 11 月中旬卖出 Put 准备接回。',
 descEn: 'Between Sep 30 ($228.38) and Nov 16, NVDA fell >31%—flipping Duan from Q3 call exercises to selling downside puts in mid-November.'
 },
 {
 tagZh: '十年商业模式', tagEn: '10-Year Moat Test',
 titleZh: '6. 自问“十年后这家公司还在不在”：是否真正看懂生意与文化？',
 titleEn: '6. Pass the 10-Year Business Owner Test: Do you understand the moat?',
 descZh: '“如果你不懂一家公司十年后的样子，跌 50% 你一定拿不住”——抄代码容易，抄对企业文化与商业模式的底层笃定才是核心。',
 descEn: 'Without independent conviction in 10-year free cash flows and corporate culture, a routine 30%–50% drawdown will shake out copycat holders.'
 }
 ];

 var QUICK_JUMP_ITEMS = [
 { sec: 'sec-00', zhTitle: '00 执行摘要与核心指标', enTitle: '00 Executive Summary & KPIs', zhSub: '$17.19B 13F 市值 · $25.50B ADV 总规模 · 前五占 89.7%', enSub: '$17.19B 13F · $25.50B ADV AUM · 89.7% Top-5' },
 { sec: 'sec-01', zhTitle: '01 全球版图架构与前十大重仓', enTitle: '01 Global Blueprint & Top 10 Holdings', zhSub: 'AAPL $7.06B · BRK.B $4.16B · PDD $2.18B · TSLA $1.45B', enSub: 'AAPL $7.06B · BRK.B $4.16B · PDD $2.18B · TSLA $1.45B' },
 { sec: 'sec-02', zhTitle: '02 四大“大道”哲学与风格雷达', enTitle: '02 Four Philosophy Pillars & Radar', zhSub: '三好公司 · Stop-Doing 清单 · 机会成本锚 · 卖 Put 飞轮', enSub: '3 Rights · Stop-Doing List · Opportunity Cost · Put Yield' },
 { sec: 'sec-03', zhTitle: '03 全部 16+3 只 SEC 13F 持仓总表', enTitle: '03 Complete 16+3 Stock 13F DataGrid', zhSub: '支持检索 AAPL/PDD/NVDA/SPCX、并入3只清仓股与导出 CSV', enSub: 'Search AAPL/PDD/NVDA/SPCX, toggle 3 exits & export CSV' },
 { sec: 'sec-04', zhTitle: '04 Q3 调仓归因与卖 Put 复利器', enTitle: '04 Q3 Trade Moves & Sell-Put Simulator', zhSub: '加码 TSLA/PDD/SPCX vs 减持 NVDA/AAPL · 期权增强模拟', enSub: 'Added TSLA/PDD/SPCX vs Trimmed NVDA/AAPL · Put Simulator' },
 { sec: 'sec-05', zhTitle: '05 茅台/腾讯隐形仓与言行纪事', enTitle: '05 Moutai, Tencent, Pop Mart & 2026 Log', zhSub: '三加茅台 · 神华换泡泡玛特 · 卖2000张腾讯Put · 回应NVDA', enSub: '3x Moutai Buys · Pop Mart Pivot · 2,000 Tencent Puts' },
 { sec: 'sec-06', zhTitle: '06 段永平 13F 抄作业核查清单', enTitle: '06 13F Coattail Due-Diligence Checklist', zhSub: '6 项机构级穿透风控自测（进度自动保存在本地）', enSub: '6-Point Coattail Risk Checklist (Saved Locally)' },
 { sec: 'sec-07', zhTitle: '07 数据来源与 SEC 监管核验索引', enTitle: '07 Primary SEC EDGAR & Media Sources', zhSub: '13F-HR (0001759760-26-000008) · Form ADV · 权威实录', enSub: 'Form 13F-HR · Form ADV · Verified Disclosures' }
 ];

 var SIM_PRESETS = {
 p1: { principal: 100000, years: 15, cashWeight: 33, eqCagr: 14.0, optionBoost: true },
 p2: { principal: 100000, years: 20, cashWeight: 15, eqCagr: 14.5, optionBoost: true },
 p3: { principal: 100000, years: 25, cashWeight: 20, eqCagr: 15.5, optionBoost: true }
 };

 var state = {
 lang: 'zh',
 theme: 'light',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { hh: true, brk: true, sp500: true },
 holdAction: 'all',
 holdSector: 'all',
 holdSort: 'weight_desc',
 holdQuery: '',
 showExits: false,
 sim: { principal: 100000, years: 15, cashWeight: 33, eqCagr: 14.0, optionBoost: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 function isEn() {
 return state.lang === 'en';
 }

 function safeGetStorage(key) {
 try {
 return window.localStorage.getItem(key);
 } catch (err) {
 return null;
 }
 }

 function safeSetStorage(key, val) {
 try {
 window.localStorage.setItem(key, val);
 } catch (err) {
 /* Ignore sandboxed storage restrictions */
 }
 }

 var toastTimer = null;
 function showToast(message) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = message;
 el.classList.add('show');
 if (toastTimer) clearTimeout(toastTimer);
 toastTimer = setTimeout(function () {
 el.classList.remove('show');
 }, 2800);
 }

 function escapeHtml(str) {
 return String(str)
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;');
 }

 function highlightMatch(text, query) {
 var safe = escapeHtml(text);
 if (!query) return safe;
 var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 var re = new RegExp('(' + escapedQ + ')', 'gi');
 return safe.replace(re, '<mark class="hl">$1</mark>');
 }

 /* ======================================================================
 2. Bilingual (中文 | EN) & Theme Synchronization
 ====================================================================== */
 function syncCh1HeaderText() {
 var titleEl = document.getElementById('ch1ChartTitle');
 var subEl = document.getElementById('ch1ChartSub');
 var leg1 = document.getElementById('ch1Leg1');
 var leg2 = document.getElementById('ch1Leg2');
 var metaEl = document.getElementById('ch1AxisMeta');
 if (!titleEl || !subEl) return;

 if (state.ch1View === 'viewA') {
 titleEl.textContent = isEn()
 ? 'Q3 2026 H&H Top 10 U.S. Holdings by Market Value & Portfolio Share ($B · 99.02% of Total)'
 : '2026Q3 段永平 H&H 前十大美股重仓市值与权重分布（$B · 占组合 99.02%）';
 subEl.textContent = isEn()
 ? 'Top 10 positions total $17.02B (99.02% of 13F)—led by Apple (41.07%), Berkshire B (24.21%), PDD (12.69%), and Tesla (8.42%)'
 : '前十大重仓合计 $170.23 亿美元（占 13F 高达 99.02%），苹果单票占 41.07%，拼多多与特斯拉获逆势增持';
 if (leg1) leg1.textContent = isEn() ? 'Trimmed / Unchanged Core ($B)' : '减持/锁仓核心重仓 ($B)';
 if (leg2) leg2.textContent = isEn() ? 'Q3 Conviction Additions ($B · PDD / TSLA)' : 'Q3 逆势加仓标的 ($B · PDD / TSLA)';
 if (metaEl) {
 metaEl.innerHTML = isEn()
 ? '<span style="color:var(--chart-c1);">■ Left Axis: Sep 30, 2026 Market Value ($B)</span><span style="color:var(--text-muted);">Hover any bar for exact shares, % weight &amp; Q3 share change</span>'
 : '<span style="color:var(--chart-c1);">■ 左轴：2026-09-30 持仓市值 ($B)</span><span style="color:var(--text-muted);">悬停柱体查看精确股数、占 13F 权重与 Q3 变动幅度</span>';
 }
 } else {
 titleEl.textContent = isEn()
 ? '2025Q3–2026Q3 Evolution: H&H SEC 13F Portfolio Value ($B) vs. Active Stock Count'
 : '2025Q3–2026Q3 历季演进：H&H 美股 13F 总市值 ($B) 与持仓股票数量变化';
 subEl.textContent = isEn()
 ? 'Portfolio expanded from $14.68B (11 stocks) in 25Q3 to $20.00B (19 stocks) in 26Q1 before harvesting AI gains to $17.19B (16 stocks) in 26Q3'
 : '组合从 25Q3 的 $146.8 亿（11只）扩张至 26Q1 峰值 $200.0 亿（19只），随后连续两季高位兑现算力回落至 $171.9 亿（16只）';
 if (leg1) leg1.textContent = isEn() ? '13F U.S. Equity Value ($B)' : '13F 美股持仓总市值 ($B)';
 if (leg2) leg2.textContent = isEn() ? 'Disclosed Stock Count (Positions)' : '期末在持股票数量 (只)';
 if (metaEl) {
 metaEl.innerHTML = isEn()
 ? '<span style="color:var(--chart-c1);">■ Bars: 13F Portfolio Value ($B)</span><span style="color:var(--chart-c2);">● Line: Active Stock Count (11 → 19 → 16)</span>'
 : '<span style="color:var(--chart-c1);">■ 柱体：13F 美股组合总市值 ($B)</span><span style="color:var(--chart-c2);">● 折线：期末披露在持股票数（11只 → 19只 → 16只）</span>';
 }
 }
 }

 function syncCollapseButtonsText() {
 var btns = document.querySelectorAll('[data-collapse-target]');
 for (var i = 0; i < btns.length; i++) {
 var pid = btns[i].getAttribute('data-collapse-target');
 var panel = document.getElementById(pid);
 var isOpen = panel && panel.classList.contains('open');
 if (isEn()) {
 btns[i].innerHTML = isOpen ? '<span>Hide Investment Thesis</span> <span>⌃</span>' : '<span>Show Investment Thesis</span> <span>⌄</span>';
 } else {
 btns[i].innerHTML = isOpen ? '<span>收起持仓逻辑细节</span> <span>⌃</span>' : '<span>展开持仓逻辑细节</span> <span>⌄</span>';
 }
 }
 }

 function syncExitsButtonText() {
 var txt = document.getElementById('toggleExitsText');
 var btn = document.getElementById('toggleExitsBtn');
 if (!txt || !btn) return;
 var effectiveExits = state.showExits || state.holdAction === 'exit';
 btn.setAttribute('aria-pressed', effectiveExits ? 'true' : 'false');
 btn.classList.toggle('mui-btn-primary', effectiveExits);
 if (effectiveExits) {
 txt.textContent = isEn()
 ? 'Showing All 19 Lines Incl. 3 Q3 Exits (Click for 16 Active Only)'
 : '当前：已并入 BABA/CRCL/INOD 清仓记录（共19行 · 点击仅看16只在持）';
 } else {
 txt.textContent = isEn()
 ? 'Showing 16 Active Lines (Click to Include 3 Q3 Exits)'
 : '当前：16只在持标的（点击并入 BABA/CRCL/INOD 清仓记录）';
 }
 }

 function renderPillarNote() {
 var el = document.getElementById('pillarFocusNote');
 if (!el) return;
 var item = PILLAR_NOTES[state.activePillar] || PILLAR_NOTES[0];
 el.innerHTML = '<div>' + (isEn() ? item.en : item.zh) + '</div>';
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.documentElement.setAttribute('data-lang', state.lang);
 document.title = en ? DOC_TITLE_EN : DOC_TITLE_ZH;

 var zhBtn = document.getElementById('langZhBtn');
 var enBtn = document.getElementById('langEnBtn');
 if (zhBtn && enBtn) {
 zhBtn.classList.toggle('active', !en);
 enBtn.classList.toggle('active', en);
 zhBtn.setAttribute('aria-pressed', !en ? 'true' : 'false');
 enBtn.setAttribute('aria-pressed', en ? 'true' : 'false');
 }

 var textEls = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
 for (var i = 0; i < textEls.length; i++) {
 textEls[i].textContent = en ? textEls[i].getAttribute('data-i18n-en') : textEls[i].getAttribute('data-i18n-zh');
 }

 var richEls = document.querySelectorAll('[data-rich-key]');
 for (var r = 0; r < richEls.length; r++) {
 var rk = richEls[r].getAttribute('data-rich-key');
 if (RICH_BLOCKS[rk]) {
 richEls[r].innerHTML = en ? RICH_BLOCKS[rk].en : RICH_BLOCKS[rk].zh;
 }
 }

 var phEls = document.querySelectorAll('[data-placeholder-zh][data-placeholder-en]');
 for (var p = 0; p < phEls.length; p++) {
 phEls[p].setAttribute('placeholder', en ? phEls[p].getAttribute('data-placeholder-en') : phEls[p].getAttribute('data-placeholder-zh'));
 }

 var titleEls = document.querySelectorAll('[data-title-zh][data-title-en]');
 for (var t = 0; t < titleEls.length; t++) {
 var tVal = en ? titleEls[t].getAttribute('data-title-en') : titleEls[t].getAttribute('data-title-zh');
 titleEls[t].setAttribute('title', tVal);
 titleEls[t].setAttribute('aria-label', tVal);
 }

 syncCh1HeaderText();
 syncCollapseButtonsText();
 syncExitsButtonText();
 renderPillarNote();
 renderHoldingsTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 safeSetStorage(STORAGE_LANG_KEY, state.lang);

 if (!silent) {
 showToast(en ? 'Switched to English Research Edition' : '已切换至中文持仓全景研报视图');
 }
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIconEl = document.getElementById('appbarThemeIcon');
 if (abIconEl) {
 abIconEl.innerHTML = state.theme === 'dark'
 ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0-1.41.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L7.05 18.36z"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 var sDarkBtn = document.getElementById('sideThemeDarkBtn');
 var sLightBtn = document.getElementById('sideThemeLightBtn');
 if (sDarkBtn && sLightBtn) {
 void 0;
 void 0;
 }
 safeSetStorage(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) {
 showToast(state.theme === 'dark'
 ? (isEn() ? 'Switched to MUI Dark Obsidian Theme' : '已切换至 MUI 深海黑曜石护眼模式')
 : (isEn() ? 'Switched to MUI Crisp Light Theme' : '已切换至 MUI 浅色明亮阅读模式'));
 }
 }

 function toggleSidebar() {
 if (window.innerWidth <= 1120) {
 document.body.classList.toggle('drawer-open');
 } else {
 document.body.classList.toggle('sidebar-collapsed');
 setTimeout(renderAllCharts, 60);
 }
 }

 function closeMobileDrawer() {
 document.body.classList.remove('drawer-open');
 }

 /* ======================================================================
 3. Complete 16+3 Stock 13F DataGrid (Filter, Toggle Exits, Sort, CSV)
 ====================================================================== */
 function getWorkingHoldingsDataset() {
 var includeExits = state.showExits || state.holdAction === 'exit' || state.holdQuery.trim().length > 0;
 return HOLDINGS_ALL.filter(function (item) {
 return includeExits ? true : !item.exited;
 });
 }

 function formatValueUsd(valUsd) {
 if (valUsd === 0) return '$0.00M';
 if (valUsd >= 1000000000) {
 return '$' + (valUsd / 1000000000).toFixed(2) + 'B';
 }
 return '$' + (valUsd / 1000000).toFixed(2) + 'M';
 }

 function renderHoldingsTable() {
 var tbody = document.getElementById('holdingsTableBody');
 var chip = document.getElementById('holdingsSummaryChip');
 if (!tbody) return;

 syncExitsButtonText();
 var baseList = getWorkingHoldingsDataset();
 var q = state.holdQuery.trim().toLowerCase();

 var filtered = baseList.filter(function (row) {
 if (state.holdAction === 'all' && !state.showExits && !q && row.exited) return false;
 if (state.holdAction !== 'all' && row.action !== state.holdAction) return false;
 if (state.holdSector !== 'all' && row.sector !== state.holdSector) return false;
 if (!q) return true;
 var secMeta = SECTOR_META[row.sector] || { zh: '', en: '' };
 var hay = (row.sym + ' ' + row.nameZh + ' ' + row.nameEn + ' ' + row.cusip + ' ' + secMeta.zh + ' ' + secMeta.en + ' ' + row.noteZh + ' ' + row.noteEn).toLowerCase();
 return hay.indexOf(q) !== -1;
 });

 filtered.sort(function (a, b) {
 if (state.holdSort === 'chg_desc') return b.chgPct - a.chgPct || b.valUsd - a.valUsd;
 if (state.holdSort === 'chg_asc') return a.chgPct - b.chgPct || b.valUsd - a.valUsd;
 if (state.holdSort === 'shares_desc') return b.shares - a.shares || b.valUsd - a.valUsd;
 return b.valUsd - a.valUsd || a.rank - b.rank;
 });

 var sumValUsd = 0;
 for (var i = 0; i < filtered.length; i++) sumValUsd += filtered[i].valUsd;
 var sumPct = (sumValUsd / TOTAL_13F_USD) * 100;

 if (chip) {
 chip.textContent = isEn()
 ? ('Showing ' + filtered.length + ' / ' + baseList.length + ' · $' + (sumValUsd / 1000000000).toFixed(2) + 'B (' + sumPct.toFixed(1) + '%)')
 : ('显示 ' + filtered.length + ' / ' + baseList.length + ' 项 · $' + (sumValUsd / 1000000000).toFixed(2) + 'B (' + sumPct.toFixed(1) + '%)');
 }

 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:28px;">' +
 (isEn() ? 'No holdings match the active filter. Try clearing the search box or switching tabs.' : '未找到匹配的持仓标的，请清空搜索词或切换上方筛选标签。') +
 '</td></tr>';
 return;
 }

 var rawQ = state.holdQuery.trim();
 tbody.innerHTML = filtered.map(function (r) {
 var wt = (r.valUsd / TOTAL_13F_USD) * 100;
 var barPct = r.exited ? 0 : Math.min(100, Math.max(2, (wt / 41.1) * 100));
 var sec = SECTOR_META[r.sector] || SECTOR_META.tech;
 var secLabel = isEn() ? sec.en : sec.zh;

 var changeBadge = '';
 if (r.exited) {
 changeBadge = '<span class="mui-chip mui-chip-error mono">' + (isEn() ? 'SOLD OUT (-100% · ' : '清仓 (-100% · ') + r.deltaShares.toLocaleString('en-US') + ')</span>';
 } else if (r.chgPct >= 9000) {
 changeBadge = '<span class="mui-chip mui-chip-primary mono">' + (isEn() ? 'NEW · +' : '新进 · +') + r.shares.toLocaleString('en-US') + '</span>';
 } else if (r.deltaShares > 0) {
 changeBadge = '<span class="mui-chip mui-chip-success mono">+' + r.chgPct.toFixed(2) + '% (+' + r.deltaShares.toLocaleString('en-US') + ')</span>';
 } else if (r.deltaShares < 0) {
 changeBadge = '<span class="mui-chip mui-chip-warning mono">' + r.chgPct.toFixed(2) + '% (' + r.deltaShares.toLocaleString('en-US') + ')</span>';
 } else {
 changeBadge = '<span class="mui-chip mono">' + (isEn() ? 'Unchanged (0%)' : '锁仓未动 (0%)') + '</span>';
 }

 var primaryName = isEn() ? r.nameEn : r.nameZh;
 var secondaryName = isEn() ? r.nameZh : r.nameEn;
 var noteText = isEn() ? r.noteEn : r.noteZh;
 var rowClass = r.exited ? 'exit-row' : (r.rank <= 5 ? 'top5-row' : '');

 return '<tr class="' + rowClass + '">' +
 '<td class="mono" style="font-weight:700;color:var(--text-muted);">' + (r.exited ? 'EX' : String(r.rank).padStart(2, '0')) + '</td>' +
 '<td>' +
 '<div style="display:flex;align-items:center;gap:8px;">' +
 '<span class="ticker-badge mono">' + highlightMatch(r.sym, rawQ) + '</span>' +
 '<div>' +
 '<strong style="color:var(--text-primary);display:block;font-size:0.84rem;">' + highlightMatch(primaryName, rawQ) + '</strong>' +
 '<span class="mono" style="font-size:0.72rem;color:var(--text-muted);">' + highlightMatch(secondaryName, rawQ) + ' · CUSIP ' + highlightMatch(r.cusip, rawQ) + '</span>' +
 '</div>' +
 '</div>' +
 '</td>' +
 '<td><span class="mui-chip ' + sec.chip + '">' + highlightMatch(secLabel, rawQ) + '</span></td>' +
 '<td class="num-col mono" style="color:var(--text-primary);font-weight:600;">' + r.shares.toLocaleString('en-US') + '</td>' +
 '<td class="num-col mono" style="color:var(--mui-primary-lighter);font-weight:800;">' + formatValueUsd(r.valUsd) + '</td>' +
 '<td class="num-col mono">' +
 '<div class="weight-cell-wrap">' +
 '<span style="font-weight:700;color:var(--text-primary);">' + (r.exited ? '0.00%' : wt.toFixed(2) + '%') + '</span>' +
 '<div class="weight-mini-track"><div class="weight-mini-fill" style="width:' + barPct.toFixed(1) + '%;"></div></div>' +
 '</div>' +
 '</td>' +
 '<td class="num-col">' + changeBadge + '</td>' +
 '<td style="font-size:0.78rem;">' + highlightMatch(noteText, rawQ) + ' <a class="cite-link" href="' + r.url + '" target="_blank" rel="noopener noreferrer">13F ↗</a></td>' +
 '</tr>';
 }).join('');
 }

 function exportHoldingsCsv() {
 var nl = String.fromCharCode(10);
 var header = 'Rank,Symbol,Company_CN,Company_EN,CUSIP,Sector,Shares_2026Q3,Reported_Price_USD,Value_USD,Portfolio_Weight_Pct,Q3_Share_Delta,Q3_Change_Pct,Status';
 var lines = [header];
 for (var i = 0; i < HOLDINGS_ALL.length; i++) {
 var r = HOLDINGS_ALL[i];
 var wt = ((r.valUsd / TOTAL_13F_USD) * 100).toFixed(4);
 var chgStr = r.exited ? '-100.00%' : (r.chgPct >= 9000 ? 'NEW' : r.chgPct.toFixed(2) + '%');
 lines.push([
 r.exited ? 'EXITED' : r.rank,
 '"' + r.sym + '"',
 '"' + r.nameZh + '"',
 '"' + r.nameEn.replace(/"/g, '""') + '"',
 '"' + r.cusip + '"',
 r.sector,
 r.shares,
 r.price.toFixed(2),
 r.valUsd,
 wt,
 r.deltaShares,
 chgStr,
 r.exited ? 'EXITED_Q3' : 'ACTIVE_Q3'
 ].join(','));
 }
 var csvContent = '\uFEFF' + lines.join(nl);
 var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'DuanYongping_HH_2026Q3_13F_Holdings.csv';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast(isEn() ? 'Exported CSV: DuanYongping_HH_2026Q3_13F_Holdings.csv' : '已导出持仓明细表 DuanYongping_HH_2026Q3_13F_Holdings.csv');
 }

 /* ======================================================================
 4. Option-Enhanced Compounding Simulator
 ====================================================================== */
 function formatCurrency(val) {
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function getSimRates() {
 var cashW = state.sim.cashWeight / 100;
 var eqW = 1 - cashW;
 var tBillYield = 0.042;
 var putOverlayOnCash = state.sim.optionBoost ? 0.065 : 0.0;
 var eqRate = state.sim.eqCagr / 100;
 var activeRate = eqW * eqRate + cashW * (tBillYield + putOverlayOnCash);
 var baseNoPutRate = eqW * eqRate + cashW * tBillYield;
 return { activeRate: activeRate, baseRate: baseNoPutRate };
 }

 function updateSimulatorUI() {
 var p = state.sim.principal;
 var yrs = state.sim.years;
 var rates = getSimRates();

 var endingVal = p * Math.pow(1 + rates.activeRate, yrs);
 var baseEnd = p * Math.pow(1 + rates.baseRate, yrs);
 var moic = endingVal / p;
 var alpha = endingVal - baseEnd;
 var midYear = Math.max(1, Math.floor(yrs / 2));
 var midVal = p * Math.pow(1 + rates.activeRate, midYear);

 document.getElementById('simPrincipalLabel').textContent = formatCurrency(p);
 document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
 document.getElementById('simCashLabel').textContent = state.sim.cashWeight + '% (' + (100 - state.sim.cashWeight) + '% ' + (isEn() ? 'Eq' : '正股') + ')';
 document.getElementById('simEqCagrLabel').textContent = state.sim.eqCagr.toFixed(1) + '%';

 document.getElementById('simEndingVal').textContent = formatCurrency(endingVal);
 document.getElementById('simMoicVal').textContent = moic.toFixed(2) + 'x · ' + (rates.activeRate * 100).toFixed(2) + '%';
 document.getElementById('simAlphaVal').textContent = (alpha >= 0 ? '+' : '') + formatCurrency(alpha);
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint Wealth') : ('第 ' + midYear + ' 年中期资产节点');
 document.getElementById('simMidVal').textContent = formatCurrency(midVal);

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < presetBtns.length; i++) {
 presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
 }

 drawSimChart();
 }

 /* ======================================================================
 5. Interactive Checklist
 ====================================================================== */
 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 if (!container) return;

 var doneCount = state.checks.filter(Boolean).length;
 var pct = Math.round((doneCount / CHECKLIST_ITEMS.length) * 100);
 if (chip) {
 chip.textContent = isEn()
 ? ('Verified ' + doneCount + ' / ' + CHECKLIST_ITEMS.length + ' (' + pct + '%)')
 : ('已核查 ' + doneCount + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)');
 }
 if (bar) {
 bar.style.width = pct + '%';
 }

 container.innerHTML = CHECKLIST_ITEMS.map(function (item, idx) {
 var isChecked = !!state.checks[idx];
 var title = isEn() ? item.titleEn : item.titleZh;
 var tag = isEn() ? item.tagEn : item.tagZh;
 var desc = isEn() ? item.descEn : item.descZh;
 return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
 '<div style="flex:1;">' +
 '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
 '<span class="check-title">' + title + '</span>' +
 '<span class="mui-chip mono">' + escapeHtml(tag) + '</span>' +
 '</div>' +
 '<p class="check-desc">' + escapeHtml(desc) + '</p>' +
 '</div>' +
 '</label>';
 }).join('');
 }

 /* ======================================================================
 6. Built-In High-DPI MUI X Charts Engine (5 Interactive Canvases)
 ====================================================================== */
 var hitRegions = {
 chartCh1: [],
 chartRadar: [],
 chartBars: [],
 chartTrades: [],
 chartSim: []
 };

 var hoverState = {
 chartCh1: -1,
 chartRadar: -1,
 chartBars: -1,
 chartTrades: -1,
 chartSim: -1
 };

 function getPalette() {
 var cs = getComputedStyle(document.documentElement);
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: cs.getPropertyValue('--chart-grid').trim() || (isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)'),
 tick: cs.getPropertyValue('--chart-tick').trim() || '#94A3B8',
 text: cs.getPropertyValue('--text-primary').trim() || '#F3F6F9',
 sub: cs.getPropertyValue('--text-secondary').trim() || '#B2BAC2',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.30)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: cs.getPropertyValue('--chart-c1').trim() || '#3399FF',
 c2: cs.getPropertyValue('--chart-c2').trim() || '#22C55E',
 c3: cs.getPropertyValue('--chart-c3').trim() || '#FFB74D',
 c4: cs.getPropertyValue('--chart-c4').trim() || '#A78BFA',
 c5: cs.getPropertyValue('--chart-c5').trim() || '#FF6B6B'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var stage = canvas.parentElement;
 var rect = stage.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width));
 var h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 canvas.style.width = w + 'px';
 canvas.style.height = h + 'px';
 var targetW = Math.floor(w * dpr);
 var targetH = Math.floor(h * dpr);
 if (canvas.width !== targetW) canvas.width = targetW;
 if (canvas.height !== targetH) canvas.height = targetH;
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h, canvas: canvas };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var radius = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + radius, y);
 ctx.lineTo(x + w - radius, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
 ctx.lineTo(x + w, y + h - radius);
 ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
 ctx.lineTo(x + radius, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
 ctx.lineTo(x, y + radius);
 ctx.quadraticCurveTo(x, y, x + radius, y);
 ctx.closePath();
 }

 function topRoundedBar(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h);
 ctx.beginPath();
 ctx.moveTo(x, y + h);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h);
 ctx.closePath();
 }

 function bottomRoundedBar(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h);
 ctx.beginPath();
 ctx.moveTo(x, y);
 ctx.lineTo(x + w, y);
 ctx.lineTo(x + w, y + h - rad);
 ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
 ctx.lineTo(x + rad, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
 ctx.closePath();
 }

 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save();
 ctx.font = '700 10.5px "IBM Plex Mono", system-ui, sans-serif';
 var tw = ctx.measureText(text).width + 9;
 var th = 18;
 var bx = cx - tw / 2;
 var by = cy - th / 2;
 ctx.fillStyle = pal.pillBg;
 roundRectPath(ctx, bx, by, tw, th, 5);
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

 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return;
 ctx.beginPath();
 ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) {
 var xc = (pts[i].x + pts[i + 1].x) / 2;
 ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
 }
 }

 /* Chart 1: View A (Top 10 Holdings) vs View B (5-Quarter 13F Value & Stock Count) */
 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartCh1 = [];

 if (state.ch1View === 'viewA') {
 var top10 = [
 { sym: 'AAPL', zh: '苹果公司', en: 'Apple', valB: 7.06, wt: 41.07, sh: '21,202,403 (-21.8%)', added: false },
 { sym: 'BRK.B', zh: '伯克希尔B', en: 'Berkshire B', valB: 4.16, wt: 24.21, sh: '8,356,796 (-9.5%)', added: false },
 { sym: 'PDD', zh: '拼多多', en: 'PDD Holdings', valB: 2.18, wt: 12.69, sh: '27,990,859 (+11.9%)', added: true },
 { sym: 'TSLA', zh: '特斯拉', en: 'Tesla', valB: 1.45, wt: 8.42, sh: '4,080,000 (+20.7%)', added: true },
 { sym: 'OXY', zh: '西方石油', en: 'Occidental', valB: 0.57, wt: 3.30, sh: '10,261,500 (0%)', added: false },
 { sym: 'NVDA', zh: '英伟达', en: 'NVIDIA', valB: 0.53, wt: 3.08, sh: '2,319,475 (-63.1%)', added: false },
 { sym: 'GOOG', zh: '谷歌C类', en: 'Alphabet C', valB: 0.39, wt: 2.28, sh: '1,151,700 (-41.5%)', added: false },
 { sym: 'MSFT', zh: '微软', en: 'Microsoft', valB: 0.36, wt: 2.07, sh: '694,100 (-8.0%)', added: false },
 { sym: 'DIS', zh: '迪士尼', en: 'Disney', valB: 0.18, wt: 1.04, sh: '1,706,600 (0%)', added: false },
 { sym: 'UNH', zh: '联合健康', en: 'UnitedHealth', valB: 0.15, wt: 0.85, sh: '399,600 (0%)', added: false }
 ];

 var pad = { top: 28, right: 16, bottom: 46, left: 50 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;
 var maxY = 8.0;

 for (var g = 0; g <= 4; g++) {
 var yVal = (maxY / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(pad.left, gy);
 ctx.lineTo(pad.left + pw, gy);
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'right';
 ctx.textBaseline = 'middle';
 ctx.fillText('$' + yVal.toFixed(0) + 'B', pad.left - 7, gy);
 }

 var step = pw / top10.length;
 var barW = Math.min(44, Math.max(16, step * 0.56));

 for (var i = 0; i < top10.length; i++) {
 var item = top10[i];
 var showBar = item.added ? state.ch1Series.s2 : state.ch1Series.s1;
 var cx = pad.left + step * (i + 0.5);

 if (hoverState.chartCh1 === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, pad.left + step * i + 2, pad.top, step - 4, ph, 6);
 ctx.fill();
 }

 if (showBar) {
 var bh = Math.max(5, (item.valB / maxY) * ph);
 var bx = cx - barW / 2;
 var by = pad.top + ph - bh;
 var grad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
 if (item.added) {
 grad.addColorStop(0, '#34D399');
 grad.addColorStop(1, '#16A34A');
 } else {
 grad.addColorStop(0, '#3399FF');
 grad.addColorStop(1, '#0066CC');
 }
 ctx.fillStyle = grad;
 topRoundedBar(ctx, bx, by, barW, bh, 6);
 ctx.fill();

 if (w >= 640 || i < 5 || i === 9) {
 var lbl = item.valB >= 1.0 ? ('$' + item.valB.toFixed(2) + 'B') : ('$' + Math.round(item.valB * 1000) + 'M');
 drawValueBadge(ctx, lbl, cx, by - 12, item.added ? pal.c2 : pal.c1, pal);
 }
 }

 ctx.fillStyle = pal.text;
 ctx.font = '700 ' + (w < 560 ? '9.5px' : '11px') + ' "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(item.sym, cx, pad.top + ph + 18);

 if (w >= 540) {
 ctx.fillStyle = pal.tick;
 ctx.font = '10px system-ui, sans-serif';
 ctx.fillText(item.wt.toFixed(1) + '%', cx, pad.top + ph + 33);
 }

 hitRegions.chartCh1.push({
 idx: i,
 x: pad.left + step * i, y: pad.top, w: step, h: ph + 38,
 html: isEn()
 ? ('<strong>#' + (i + 1) + ' ' + item.en + ' (' + item.sym + ')</strong><br/>• 13F Value: <strong>$' + item.valB.toFixed(2) + 'B</strong> (' + item.wt.toFixed(2) + '%)<br/>• Shares: ' + item.sh)
 : ('<strong>第 ' + (i + 1) + ' 大重仓：' + item.zh + ' (' + item.sym + ')</strong><br/>• 申报市值：<strong>$' + item.valB.toFixed(2) + 'B</strong>（占 13F ' + item.wt.toFixed(2) + '%）<br/>• 期末股数：' + item.sh)
 });
 }
 } else {
 /* View B: 5-Quarter Verified Evolution (2025Q3–2026Q3) */
 var qLabels = ['25Q3', '25Q4', '26Q1', '26Q2', '26Q3'];
 var val13F = [14.68, 17.49, 20.00, 19.10, 17.19];
 var stockCount = [11, 14, 19, 18, 16];

 var padB = { top: 28, right: 44, bottom: 40, left: 50 };
 var pwB = w - padB.left - padB.right;
 var phB = h - padB.top - padB.bottom;
 var minV = 10.0, maxV = 23.0;
 var minC = 8, maxC = 22;

 for (var j = 0; j <= 4; j++) {
 var r = j / 4;
 var yg = padB.top + phB - r * phB;
 var vTick = minV + r * (maxV - minV);
 var cTick = Math.round(minC + r * (maxC - minC));
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(padB.left, yg);
 ctx.lineTo(padB.left + pwB, yg);
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'right';
 ctx.textBaseline = 'middle';
 ctx.fillText('$' + vTick.toFixed(1) + 'B', padB.left - 7, yg);

 ctx.textAlign = 'left';
 ctx.fillText(cTick + (isEn() ? ' sh' : '只'), padB.left + pwB + 7, yg);
 }

 var stepB = pwB / qLabels.length;
 var bW = Math.min(42, Math.max(22, stepB * 0.44));
 var pts = [];

 for (var k = 0; k < qLabels.length; k++) {
 var cxB = padB.left + stepB * (k + 0.5);
 if (hoverState.chartCh1 === k) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, padB.left + stepB * k + 3, padB.top, stepB - 6, phB, 6);
 ctx.fill();
 }

 if (state.ch1Series.s1) {
 var barH = ((val13F[k] - minV) / (maxV - minV)) * phB;
 var barX = cxB - bW / 2;
 var barY = padB.top + phB - barH;
 var gBar = ctx.createLinearGradient(0, barY, 0, padB.top + phB);
 gBar.addColorStop(0, '#3399FF');
 gBar.addColorStop(1, '#0066CC');
 ctx.fillStyle = gBar;
 topRoundedBar(ctx, barX, barY, bW, barH, 5);
 ctx.fill();

 ctx.fillStyle = '#FFFFFF';
 ctx.font = '700 10px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 if (barH > 22) ctx.fillText('$' + val13F[k].toFixed(1) + 'B', cxB, barY + 15);
 }

 var ly = padB.top + phB - ((stockCount[k] - minC) / (maxC - minC)) * phB;
 pts.push({ x: cxB, y: ly, cnt: stockCount[k] });

 ctx.fillStyle = k === qLabels.length - 1 ? pal.text : pal.tick;
 ctx.font = (k === qLabels.length - 1 ? '800 ' : '600 ') + '11.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(qLabels[k], cxB, padB.top + phB + 22);

 hitRegions.chartCh1.push({
 idx: k,
 x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
 html: isEn()
 ? ('<strong>20' + qLabels[k] + ' SEC 13F Snapshot</strong><br/>• 13F Portfolio Value: <strong>$' + val13F[k].toFixed(2) + 'B</strong><br/>• Active Stock Positions: <strong>' + stockCount[k] + ' securities</strong>')
 : ('<strong>20' + qLabels[k] + ' 季度 13F 快照</strong><br/>• 13F 申报总市值：<strong>$' + val13F[k].toFixed(2) + 'B</strong><br/>• 期末在持股票数：<strong>' + stockCount[k] + ' 只</strong>')
 });
 }

 if (state.ch1Series.s2) {
 ctx.save();
 drawSmoothLine(ctx, pts);
 ctx.strokeStyle = pal.c2;
 ctx.lineWidth = 2.8;
 ctx.stroke();
 ctx.restore();

 for (var n = 0; n < pts.length; n++) {
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath();
 ctx.arc(pts[n].x, pts[n].y, 5.8, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = pal.c2;
 ctx.beginPath();
 ctx.arc(pts[n].x, pts[n].y, 4, 0, Math.PI * 2);
 ctx.fill();
 drawValueBadge(ctx, pts[n].cnt + (isEn() ? ' pos' : '只'), pts[n].x, pts[n].y - 15, pal.c2, pal);
 }
 }
 }
 }

 /* Chart 2: 5-Axis Philosophy Radar */
 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartRadar = [];

 var axes = isEn()
 ? ['Top-5 Focus (89.7%)', 'Zero-Margin Discipline', 'Opportunity-Cost Anchor', 'Option Yield Overlay', 'Cross-Border Tech/Consumer']
 : ['头部重仓集中度', '零杠杆本分风控', '机会成本定力', '期权收租增强力', '跨中美生态洞察'];
 var pillarAxisMap = [0, 1, 2, 3];
 var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];

 var series = [
 { key: 'hh', name: isEn() ? 'Duan Yongping (H&H)' : '段永平 (H&H)', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.6, 9.5, 9.7, 9.6] },
 { key: 'brk', name: isEn() ? 'Berkshire (BRK)' : '伯克希尔 (BRK)', color: pal.c2, fill: 'rgba(34, 197, 94, 0.14)', vals: [8.8, 9.9, 9.6, 6.2, 7.8] },
 { key: 'sp500', name: isEn() ? 'S&P 500' : '标普 500 基准', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [5.5, 7.0, 6.5, 2.0, 6.0] }
 ];

 var cx = w / 2;
 var cy = h / 2 + 8;
 var sidePad = w < 420 ? 86 : 106;
 var radius = Math.max(60, Math.min((w - sidePad * 2) / 2, h * 0.35));
 var total = axes.length;

 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = ring === 10 ? 1.3 : 1;
 ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
 var px = cx + Math.cos(ang) * r;
 var py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py);
 else ctx.lineTo(px, py);
 }
 ctx.closePath();
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '600 9.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'left';
 ctx.textBaseline = 'middle';
 ctx.fillText(String(ring), cx + 4, cy - r);
 }

 for (var a = 0; a < total; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 var ax = cx + Math.cos(angle) * radius;
 var ay = cy + Math.sin(angle) * radius;
 var isHi = a === highlightedAxis;

 ctx.strokeStyle = isHi ? pal.c1 : pal.grid;
 ctx.lineWidth = isHi ? 1.8 : 1;
 ctx.beginPath();
 ctx.moveTo(cx, cy);
 ctx.lineTo(ax, ay);
 ctx.stroke();

 var lx = cx + Math.cos(angle) * (radius + 14);
 var ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = isHi ? pal.c1 : pal.text;
 ctx.font = (isHi ? '800 ' : '600 ') + (w < 420 ? '10.5px' : '11.5px') + ' system-ui, sans-serif';
 ctx.textBaseline = 'middle';
 if (Math.abs(Math.cos(angle)) < 0.2) ctx.textAlign = 'center';
 else if (Math.cos(angle) > 0) ctx.textAlign = 'left';
 else ctx.textAlign = 'right';
 ctx.fillText(axes[a], lx, ly);

 hitRegions.chartRadar.push({
 idx: a,
 x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
 html: '<strong>' + axes[a] + ' (10pt Scale)</strong><br/>' +
 '• ' + series[0].name + ': <strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>' +
 '• ' + series[1].name + ': <strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>' +
 '• ' + series[2].name + ': <strong>' + series[2].vals[a].toFixed(1) + '</strong>'
 });
 }

 for (var s = 0; s < series.length; s++) {
 var item = series[s];
 if (!state.radarSeries[item.key]) continue;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
 var dist = (item.vals[idx] / 10) * radius;
 var vx = cx + Math.cos(theta) * dist;
 var vy = cy + Math.sin(theta) * dist;
 if (idx === 0) ctx.moveTo(vx, vy);
 else ctx.lineTo(vx, vy);
 }
 ctx.closePath();
 ctx.fillStyle = item.fill;
 ctx.fill();
 ctx.strokeStyle = item.color;
 ctx.lineWidth = 2.4;
 ctx.stroke();

 for (var pIdx = 0; pIdx < total; pIdx++) {
 var pTheta = -Math.PI / 2 + (pIdx * 2 * Math.PI) / total;
 var pDist = (item.vals[pIdx] / 10) * radius;
 var pX = cx + Math.cos(pTheta) * pDist;
 var pY = cy + Math.sin(pTheta) * pDist;
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath();
 ctx.arc(pX, pY, 5.2, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = item.color;
 ctx.beginPath();
 ctx.arc(pX, pY, 3.6, 0, Math.PI * 2);
 ctx.fill();
 }
 }
 }

 /* Chart 3: Sector Allocation Horizontal Bars (Aggregated from Active 16 Holdings) */
 function drawSectorBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartBars = [];

 var sectorOrder = ['tech', 'fin', 'cons', 'ind', 'med'];
 var totals = { tech: 0, fin: 0, cons: 0, ind: 0, med: 0 };
 var counts = { tech: 0, fin: 0, cons: 0, ind: 0, med: 0 };
 for (var r = 0; r < HOLDINGS_ALL.length; r++) {
 if (HOLDINGS_ALL[r].exited) continue;
 var sc = HOLDINGS_ALL[r].sector;
 totals[sc] += HOLDINGS_ALL[r].valUsd;
 counts[sc] += 1;
 }

 var topNames = {
 tech: 'AAPL ($7.06B), NVDA ($530M), GOOG ($392M), MSFT ($356M), CRDO ($117M), PLTR/SNPS/SNOW',
 fin: 'BRK.B ($4.16B · 8,356,796 sh)',
 cons: 'PDD ($2.18B · 27.99M sh), TSLA ($1.45B · 4.08M sh)',
 ind: 'OXY ($567.7M · 10.26M sh), SPCX ($30.2M · 199.9k sh)',
 med: 'DIS ($179.0M · 1.71M sh), UNH ($146.7M · 399.6k sh), TEM ($1.6M)'
 };

 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;
 var maxX = 55;

 for (var g = 0; g <= 5; g++) {
 var xVal = g * 11;
 var gx = pad.left + (xVal / maxX) * pw;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(gx, pad.top);
 ctx.lineTo(gx, pad.top + ph);
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = g === 0 ? 'left' : (g === 5 ? 'right' : 'center');
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
 }

 var rowH = ph / sectorOrder.length;
 for (var i = 0; i < sectorOrder.length; i++) {
 var key = sectorOrder[i];
 var meta = SECTOR_META[key];
 var valB = totals[key] / 1000000000;
 var pct = (totals[key] / TOTAL_13F_USD) * 100;
 var rowTop = pad.top + rowH * i;

 if (hoverState.chartBars === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, pad.left - 6, rowTop + 2, pw + 12, rowH - 4, 8);
 ctx.fill();
 }

 var labelY = rowTop + Math.max(16, rowH * 0.36);
 var barY = rowTop + Math.max(24, rowH * 0.52);
 var barH = Math.min(16, Math.max(11, rowH * 0.25));
 var bw = Math.max(8, (pct / maxX) * pw);

 var titleText = (isEn() ? meta.en : meta.zh) + ' (' + counts[key] + (isEn() ? ' stocks)' : ' 只标的)');
 ctx.fillStyle = pal.text;
 ctx.font = '600 ' + (w < 460 ? '11px' : '12.5px') + ' system-ui, sans-serif';
 ctx.textAlign = 'left';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(titleText, pad.left, labelY);

 var valStr = pct.toFixed(2) + '%';
 ctx.font = '800 12.5px "IBM Plex Mono", sans-serif';
 ctx.fillStyle = pal.isDark ? meta.cStart : meta.cEnd;
 ctx.textAlign = 'right';
 ctx.fillText(valStr, pad.left + pw, labelY);

 if (w >= 540) {
 var valW = ctx.measureText(valStr).width + 10;
 ctx.font = '500 11px "IBM Plex Mono", system-ui, sans-serif';
 ctx.fillStyle = pal.tick;
 ctx.fillText('$' + valB.toFixed(2) + 'B · ' + topNames[key].split(',')[0], pad.left + pw - valW, labelY);
 }

 ctx.fillStyle = pal.trackBg;
 roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2);
 ctx.fill();

 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
 barGrad.addColorStop(0, meta.cStart);
 barGrad.addColorStop(1, meta.cEnd);
 ctx.fillStyle = barGrad;
 roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2);
 ctx.fill();

 hitRegions.chartBars.push({
 idx: i,
 x: pad.left, y: rowTop, w: pw, h: rowH,
 html: '<strong>' + (isEn() ? meta.en : meta.zh) + ': $' + valB.toFixed(2) + 'B (' + pct.toFixed(2) + '%)</strong><br/>• ' +
 (isEn() ? 'Holdings: ' : '板块构成：') + topNames[key]
 });
 }
 }

 /* Chart 4: Diverging Q3 2026 Trade Attribution Chart ($M) */
 function drawTradesChart() {
 var env = prepareCanvas('chartTrades');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartTrades = [];

 var moves = [
 { sym: 'TSLA', zh: '特斯拉', en: 'Tesla', valM: 248, pct: '+20.70% (+699.6k sh)' },
 { sym: 'PDD', zh: '拼多多', en: 'PDD Holdings', valM: 231, pct: '+11.86% (+2.97M sh)' },
 { sym: 'SPCX', zh: 'SpaceX', en: 'SpaceX Cl A', valM: 30, pct: 'NEW (+199.9k sh)' },
 { sym: 'CRCL', zh: 'Circle(清仓)', en: 'Circle (Exited)', valM: -13, pct: '-100% (-200k sh)' },
 { sym: 'CRDO', zh: 'Credo互联', en: 'Credo Tech', valM: -19, pct: '-14.25% (-99.9k sh)' },
 { sym: 'BABA', zh: '阿里巴巴(清仓)', en: 'Alibaba (Exited)', valM: -29, pct: '-100% (-301.4k sh)' },
 { sym: 'MSFT', zh: '微软', en: 'Microsoft', valM: -31, pct: '-7.96% (-60k sh)' },
 { sym: 'GOOG', zh: '谷歌C类', en: 'Alphabet Cl C', valM: -278, pct: '-41.50% (-816.9k sh)' },
 { sym: 'BRK.B', zh: '伯克希尔B', en: 'Berkshire Cl B', valM: -435, pct: '-9.46% (-872.9k sh)' },
 { sym: 'NVDA', zh: '英伟达', en: 'NVIDIA', valM: -905, pct: '-63.07% (-3.96M sh)' },
 { sym: 'AAPL', zh: '苹果公司', en: 'Apple', valM: -1964, pct: '-21.76% (-5.90M sh)' }
 ];

 var pad = { top: 24, right: 14, bottom: 38, left: 58 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;
 var maxPos = 600, maxNeg = 2150;
 var range = maxPos + maxNeg;
 var zeroY = pad.top + (maxPos / range) * ph;

 var gridVals = [400, 0, -500, -1000, -1500, -2000];
 for (var g = 0; g < gridVals.length; g++) {
 var gv = gridVals[g];
 var gy = zeroY - (gv / range) * ph;
 ctx.strokeStyle = gv === 0 ? pal.text : pal.grid;
 ctx.lineWidth = gv === 0 ? 1.3 : 1;
 ctx.beginPath();
 ctx.moveTo(pad.left, gy);
 ctx.lineTo(pad.left + pw, gy);
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '10px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'right';
 ctx.textBaseline = 'middle';
 ctx.fillText((gv > 0 ? '+$' : (gv < 0 ? '-$' : '$')) + Math.abs(gv) + 'M', pad.left - 7, gy);
 }

 var step = pw / moves.length;
 var barW = Math.min(38, Math.max(14, step * 0.54));

 for (var i = 0; i < moves.length; i++) {
 var m = moves[i];
 var cx = pad.left + step * (i + 0.5);

 if (hoverState.chartTrades === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, pad.left + step * i + 2, pad.top, step - 4, ph, 6);
 ctx.fill();
 }

 var bh = Math.max(5, (Math.abs(m.valM) / range) * ph);
 var bx = cx - barW / 2;

 if (m.valM >= 0) {
 var by = zeroY - bh;
 var gUp = ctx.createLinearGradient(0, by, 0, zeroY);
 gUp.addColorStop(0, '#34D399');
 gUp.addColorStop(1, '#16A34A');
 ctx.fillStyle = gUp;
 topRoundedBar(ctx, bx, by, barW, bh, 5);
 ctx.fill();
 if (w >= 620 || m.valM >= 150) {
 drawValueBadge(ctx, '+$' + m.valM + 'M', cx, by - 12, pal.c2, pal);
 }
 } else {
 var gDn = ctx.createLinearGradient(0, zeroY, 0, zeroY + bh);
 gDn.addColorStop(0, '#F87171');
 gDn.addColorStop(1, '#DC2626');
 ctx.fillStyle = gDn;
 bottomRoundedBar(ctx, bx, zeroY, barW, bh, 5);
 ctx.fill();
 if (w >= 660 || Math.abs(m.valM) >= 250) {
 drawValueBadge(ctx, '-$' + Math.abs(m.valM) + 'M', cx, Math.min(pad.top + ph - 8, zeroY + bh + 13), pal.c5, pal);
 }
 }

 ctx.fillStyle = pal.text;
 ctx.font = '700 ' + (w < 540 ? '9px' : '10.5px') + ' "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(m.sym, cx, pad.top + ph + 20);

 hitRegions.chartTrades.push({
 idx: i,
 x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
 html: '<strong>' + (isEn() ? m.en : m.zh) + ' (' + m.sym + ')</strong><br/>• ' +
 (isEn() ? 'Q3 Share Activity: ' : 'Q3 股数动作：') + '<strong>' + m.pct + '</strong><br/>• ' +
 (isEn() ? 'Implied Value Delta: ' : '期末价隐含调仓额：') + '<strong>' + (m.valM >= 0 ? '+$' : '-$') + Math.abs(m.valM) + 'M</strong>'
 });
 }
 }

 /* Chart 5: Option-Enhanced Compounding Simulator Dual-Curve Chart */
 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartSim = [];

 var p = state.sim.principal;
 var yrs = state.sim.years;
 var rates = getSimRates();

 var activeSeries = [];
 var baseSeries = [];
 for (var y = 0; y <= yrs; y++) {
 activeSeries.push(p * Math.pow(1 + rates.activeRate, y));
 baseSeries.push(p * Math.pow(1 + rates.baseRate, y));
 }

 var maxVal = Math.max(activeSeries[yrs], baseSeries[yrs], p * 1.2) * 1.08;
 var pad = { top: 20, right: 20, bottom: 28, left: 62 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g;
 var gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(pad.left, gy);
 ctx.lineTo(pad.left + pw, gy);
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'right';
 ctx.textBaseline = 'middle';
 var labelStr = v >= 1000000 ? ('$' + (v / 1000000).toFixed(2) + 'M') : ('$' + Math.round(v / 1000) + 'k');
 ctx.fillText(labelStr, pad.left - 7, gy);
 }

 var stepX = pw / yrs;

 /* Unenhanced baseline dashed curve */
 ctx.save();
 ctx.setLineDash([4, 4]);
 ctx.strokeStyle = pal.tick;
 ctx.lineWidth = 1.7;
 ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var px = pad.left + (i / yrs) * pw;
 var py = pad.top + ph - (baseSeries[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py);
 else ctx.lineTo(px, py);
 }
 ctx.stroke();
 ctx.restore();

 /* Option-enhanced compounding curve + area fill */
 ctx.beginPath();
 for (var j = 0; j <= yrs; j++) {
 var tx = pad.left + (j / yrs) * pw;
 var ty = pad.top + ph - (activeSeries[j] / maxVal) * ph;
 if (j === 0) ctx.moveTo(tx, ty);
 else ctx.lineTo(tx, ty);

 var diff = activeSeries[j] - baseSeries[j];
 hitRegions.chartSim.push({
 idx: j,
 x: tx - Math.max(6, stepX * 0.5), y: pad.top, w: Math.max(12, stepX), h: ph + 24,
 html: isEn()
 ? ('<strong>Year ' + j + ' Strategy Wealth</strong><br/>• Core + Sell-Put Overlay: <strong>' + formatCurrency(activeSeries[j]) + '</strong><br/>• Unenhanced Baseline: ' + formatCurrency(baseSeries[j]) + '<br/>• Put Premium Gain: <strong style="color:#22C55E;">+' + formatCurrency(diff) + '</strong>')
 : ('<strong>第 ' + j + ' 年复利资产对比</strong><br/>• 正股 + 卖 Put 增强总值：<strong>' + formatCurrency(activeSeries[j]) + '</strong><br/>• 不做期权增强基准：' + formatCurrency(baseSeries[j]) + '<br/>• 期权权利金多赚贡献：<strong style="color:#22C55E;">+' + formatCurrency(diff) + '</strong>')
 });
 }
 ctx.strokeStyle = pal.c1;
 ctx.lineWidth = 2.8;
 ctx.stroke();

 ctx.lineTo(pad.left + pw, pad.top + ph);
 ctx.lineTo(pad.left, pad.top + ph);
 ctx.closePath();
 var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 grad.addColorStop(0, 'rgba(0, 115, 230, 0.30)');
 grad.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
 ctx.fillStyle = grad;
 ctx.fill();

 var midYr = Math.max(1, Math.floor(yrs / 2));
 if (hoverState.chartSim >= 0 && hoverState.chartSim <= yrs) {
 var hi = hoverState.chartSim;
 var hx = pad.left + (hi / yrs) * pw;
 var hy1 = pad.top + ph - (activeSeries[hi] / maxVal) * ph;
 var hy2 = pad.top + ph - (baseSeries[hi] / maxVal) * ph;
 ctx.save();
 ctx.setLineDash([3, 3]);
 ctx.strokeStyle = pal.c1;
 ctx.lineWidth = 1.2;
 ctx.beginPath();
 ctx.moveTo(hx, pad.top);
 ctx.lineTo(hx, pad.top + ph);
 ctx.stroke();
 ctx.restore();

 ctx.fillStyle = pal.tick;
 ctx.beginPath();
 ctx.arc(hx, hy2, 4, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = pal.c1;
 ctx.beginPath();
 ctx.arc(hx, hy1, 5.5, 0, Math.PI * 2);
 ctx.fill();
 }

 var keyYears = [0, midYr, yrs];
 for (var ky = 0; ky < keyYears.length; ky++) {
 var yrIdx = keyYears[ky];
 var kx = pad.left + (yrIdx / yrs) * pw;
 var kyY = pad.top + ph - (activeSeries[yrIdx] / maxVal) * ph;
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath();
 ctx.arc(kx, kyY, 5, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = pal.c1;
 ctx.beginPath();
 ctx.arc(kx, kyY, 3.5, 0, Math.PI * 2);
 ctx.fill();
 }

 var endX = pad.left + pw;
 var endY = pad.top + ph - (activeSeries[yrs] / maxVal) * ph;
 drawValueBadge(ctx, formatCurrency(activeSeries[yrs]), Math.min(w - 48, endX - 28), Math.max(pad.top + 12, endY - 14), pal.c1, pal);

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'alphabetic';
 ctx.textAlign = 'left';
 ctx.fillText(isEn() ? 'Year 0' : '第 0 年', pad.left, pad.top + ph + 19);
 ctx.textAlign = 'center';
 ctx.fillText((isEn() ? ('Year ' + midYr) : ('第 ' + midYr + ' 年')) + ' (' + formatCurrency(activeSeries[midYr]) + ')', pad.left + (midYr / yrs) * pw, pad.top + ph + 19);
 ctx.textAlign = 'right';
 ctx.fillText(isEn() ? ('Year ' + yrs) : ('第 ' + yrs + ' 年'), pad.left + pw, pad.top + ph + 19);
 }

 var redrawMap = {
 chartCh1: drawCh1Chart,
 chartRadar: drawRadarChart,
 chartBars: drawSectorBars,
 chartTrades: drawTradesChart,
 chartSim: drawSimChart
 };

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawSectorBars();
 drawTradesChart();
 drawSimChart();
 }

 /* ======================================================================
 7. Hover & Touch Tooltips + Standalone HTML Export
 ====================================================================== */
 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;

 function handlePointer(clientX, clientY) {
 var rect = canvas.getBoundingClientRect();
 var mx = clientX - rect.left;
 var my = clientY - rect.top;
 var regions = hitRegions[canvasId] || [];
 var found = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
 found = r;
 break;
 }
 }
 var nextIdx = found && typeof found.idx === 'number' ? found.idx : -1;
 if (hoverState[canvasId] !== nextIdx) {
 hoverState[canvasId] = nextIdx;
 if (redrawMap[canvasId]) redrawMap[canvasId]();
 }
 if (found) {
 tip.innerHTML = found.html;
 tip.style.display = 'block';
 var tipW = tip.offsetWidth || 260;
 var tipH = tip.offsetHeight || 74;
 var leftPos = clientX + 14;
 if (leftPos + tipW > window.innerWidth - 12) {
 leftPos = Math.max(12, clientX - tipW - 14);
 }
 var topPos = Math.max(12, Math.min(window.innerHeight - tipH - 12, clientY - 18));
 tip.style.left = leftPos + 'px';
 tip.style.top = topPos + 'px';
 } else {
 tip.style.display = 'none';
 }
 }

 canvas.addEventListener('mousemove', function (e) {
 handlePointer(e.clientX, e.clientY);
 });

 canvas.addEventListener('touchstart', function (e) {
 if (e.touches && e.touches[0]) {
 handlePointer(e.touches[0].clientX, e.touches[0].clientY);
 }
 }, { passive: true });

 canvas.addEventListener('mouseleave', function () {
 if (hoverState[canvasId] !== -1) {
 hoverState[canvasId] = -1;
 if (redrawMap[canvasId]) redrawMap[canvasId]();
 }
 tip.style.display = 'none';
 });
 }

 function exportStandaloneHtml() {
 var doctype = '<!DOCTYPE html>' + String.fromCharCode(10);
 var htmlContent = doctype + document.documentElement.outerHTML;
 var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'DuanYongping_HH_Portfolio_2026Q3.html';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast(isEn() ? 'Exported standalone page: DuanYongping_HH_Portfolio_2026Q3.html' : '已导出独立网页 DuanYongping_HH_Portfolio_2026Q3.html');
 }

 /* ======================================================================
 8. Event Wiring & Initialization
 ====================================================================== */
 function init() {
 var rawTheme = safeGetStorage(STORAGE_THEME_KEY);
 var savedTheme = rawTheme ? String(rawTheme).replace(/^"|"$/g, '') : '';
 if (savedTheme === 'light' || savedTheme === 'dark') {
 state.theme = savedTheme;
 }
 var rawLang = safeGetStorage(STORAGE_LANG_KEY);
 var savedLang = rawLang ? String(rawLang).replace(/^"|"$/g, '') : '';
 if (savedLang === 'zh' || savedLang === 'en') {
 state.lang = savedLang;
 }

 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) {
 var nt = String(ev.newValue).replace(/^"|"$/g, '');
 if ((nt === 'light' || nt === 'dark') && nt !== state.theme) applyTheme(nt, true);
 } else if (ev.key === STORAGE_LANG_KEY && ev.newValue) {
 var nl = String(ev.newValue).replace(/^"|"$/g, '');
 if ((nl === 'zh' || nl === 'en') && nl !== state.lang) applyLanguage(nl, true);
 }
 });

 var savedChecks = safeGetStorage(STORAGE_CHECK_KEY);
 if (savedChecks) {
 try {
 var parsed = JSON.parse(savedChecks);
 if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) {
 state.checks = parsed.map(Boolean);
 }
 } catch (e) {
 /* Ignore malformed check array */
 }
 }

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 applyTheme(state.theme === 'dark' ? 'light' : 'dark', false);
 });

 document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
 document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
 void 0;
 void 0;
 void 0;
 void 0;
 document.getElementById('exportCsvBtn').addEventListener('click', exportHoldingsCsv);

 var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
 for (var t = 0; t < tocLinks.length; t++) {
 tocLinks[t].addEventListener('click', closeMobileDrawer);
 }

 /* Quick Jump Search (Cmd/Ctrl+K) — Jumps to Chapters OR Filters Ticker Directly */
 var jumpInput = document.getElementById('quickJumpInput');
 var jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase();
 var htmlItems = [];

 var matchedSecs = QUICK_JUMP_ITEMS.filter(function (it) {
 return !kw || (it.zhTitle + ' ' + it.enTitle + ' ' + it.zhSub + ' ' + it.enSub).toLowerCase().indexOf(kw) !== -1;
 });
 for (var i = 0; i < matchedSecs.length; i++) {
 var it = matchedSecs[i];
 htmlItems.push(
 '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '">' +
 '<span class="quick-jump-item-title">' + escapeHtml(isEn() ? it.enTitle : it.zhTitle) + '</span>' +
 '<span class="quick-jump-item-sub">' + escapeHtml(isEn() ? it.enSub : it.zhSub) + '</span>' +
 '</button>'
 );
 }

 if (kw) {
 var matchedStocks = HOLDINGS_ALL.filter(function (h) {
 return (h.sym + ' ' + h.nameZh + ' ' + h.nameEn + ' ' + h.cusip).toLowerCase().indexOf(kw) !== -1;
 }).slice(0, 6);
 for (var s = 0; s < matchedStocks.length; s++) {
 var st = matchedStocks[s];
 htmlItems.push(
 '<button type="button" class="quick-jump-item" data-jump-ticker="' + escapeHtml(st.sym) + '">' +
 '<span class="quick-jump-item-title">[' + escapeHtml(st.sym) + '] ' + escapeHtml(isEn() ? st.nameEn : st.nameZh) + '</span>' +
 '<span class="quick-jump-item-sub">' + (st.exited ? 'Exited Q3' : formatValueUsd(st.valUsd) + ' · ' + st.shares.toLocaleString('en-US') + ' sh') + '</span>' +
 '</button>'
 );
 }
 }

 if (!htmlItems.length) {
 jumpPop.innerHTML = '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">' + (isEn() ? 'No matching section or ticker' : '未匹配到章节或持仓代码') + '</div>';
 } else {
 jumpPop.innerHTML = htmlItems.join('');
 }
 jumpPop.classList.add('open');
 }

 jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
 jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
 jumpPop.addEventListener('click', function (e) {
 var secBtn = e.target.closest('[data-jump-sec]');
 if (secBtn) {
 var targetEl = document.getElementById(secBtn.getAttribute('data-jump-sec'));
 if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 return;
 }
 var tkBtn = e.target.closest('[data-jump-ticker]');
 if (tkBtn) {
 var sym = tkBtn.getAttribute('data-jump-ticker');
 state.holdAction = 'all';
 state.holdSector = 'all';
 state.holdQuery = sym;
 document.getElementById('holdingSearchInput').value = sym;
 var actBtns = document.querySelectorAll('[data-hold-action]');
 for (var a = 0; a < actBtns.length; a++) actBtns[a].classList.toggle('active', actBtns[a].getAttribute('data-hold-action') === 'all');
 var secBtns = document.querySelectorAll('[data-hold-sector]');
 for (var b = 0; b < secBtns.length; b++) secBtns[b].classList.toggle('active', secBtns[b].getAttribute('data-hold-sector') === 'all');
 renderHoldingsTable();
 var tblSec = document.getElementById('sec-03');
 if (tblSec) tblSec.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 }
 });
 document.addEventListener('click', function (e) {
 if (!e.target.closest('.quick-search-wrap')) {
 jumpPop.classList.remove('open');
 }
 });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
 e.preventDefault();
 jumpInput.focus();
 } else if (e.key === 'Escape') {
 jumpPop.classList.remove('open');
 closeMobileDrawer();
 }
 });

 /* Ch 01 View Switch & Legend Pills */
 var ch1Btns = document.querySelectorAll('[data-ch1-view]');
 for (var c = 0; c < ch1Btns.length; c++) {
 ch1Btns[c].addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 hoverState.chartCh1 = -1;
 syncCh1HeaderText();
 drawCh1Chart();
 });
 }

 var ch1SeriesBtns = document.querySelectorAll('[data-ch1-series]');
 for (var cs = 0; cs < ch1SeriesBtns.length; cs++) {
 ch1SeriesBtns[cs].addEventListener('click', function () {
 var sk = this.getAttribute('data-ch1-series');
 state.ch1Series[sk] = !state.ch1Series[sk];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
 this.classList.toggle('muted', !state.ch1Series[sk]);
 drawCh1Chart();
 });
 }

 var collapseBtns = document.querySelectorAll('[data-collapse-target]');
 for (var m = 0; m < collapseBtns.length; m++) {
 collapseBtns[m].addEventListener('click', function () {
 var panel = document.getElementById(this.getAttribute('data-collapse-target'));
 if (panel) panel.classList.toggle('open');
 syncCollapseButtonsText();
 });
 }

 /* Ch 02 Pillars & Radar Legend */
 var pillarCards = document.querySelectorAll('[data-pillar]');
 for (var p = 0; p < pillarCards.length; p++) {
 pillarCards[p].addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 for (var k = 0; k < pillarCards.length; k++) {
 pillarCards[k].classList.toggle('active', k === idx);
 }
 renderPillarNote();
 drawRadarChart();
 });
 }

 var radarPills = document.querySelectorAll('[data-radar-key]');
 for (var r = 0; r < radarPills.length; r++) {
 radarPills[r].addEventListener('click', function () {
 var key = this.getAttribute('data-radar-key');
 state.radarSeries[key] = !state.radarSeries[key];
 if (!state.radarSeries.hh && !state.radarSeries.brk && !state.radarSeries.sp500) {
 state.radarSeries[key] = true;
 }
 this.classList.toggle('muted', !state.radarSeries[key]);
 drawRadarChart();
 });
 }

 /* Ch 03 16+3 Stock DataGrid Controls */
 document.getElementById('holdingSearchInput').addEventListener('input', function () {
 state.holdQuery = this.value;
 renderHoldingsTable();
 });

 var holdActionBtns = document.querySelectorAll('[data-hold-action]');
 for (var ha = 0; ha < holdActionBtns.length; ha++) {
 holdActionBtns[ha].addEventListener('click', function () {
 state.holdAction = this.getAttribute('data-hold-action');
 for (var x = 0; x < holdActionBtns.length; x++) {
 holdActionBtns[x].classList.toggle('active', holdActionBtns[x] === this);
 }
 renderHoldingsTable();
 });
 }

 var holdSectorBtns = document.querySelectorAll('[data-hold-sector]');
 for (var hs = 0; hs < holdSectorBtns.length; hs++) {
 holdSectorBtns[hs].addEventListener('click', function () {
 state.holdSector = this.getAttribute('data-hold-sector');
 for (var x = 0; x < holdSectorBtns.length; x++) {
 holdSectorBtns[x].classList.toggle('active', holdSectorBtns[x] === this);
 }
 renderHoldingsTable();
 });
 }

 document.getElementById('holdingSortSelect').addEventListener('change', function () {
 state.holdSort = this.value;
 renderHoldingsTable();
 });

 document.getElementById('toggleExitsBtn').addEventListener('click', function () {
 state.showExits = !state.showExits;
 if (!state.showExits && state.holdAction === 'exit') {
 state.holdAction = 'all';
 for (var x = 0; x < holdActionBtns.length; x++) {
 holdActionBtns[x].classList.toggle('active', holdActionBtns[x].getAttribute('data-hold-action') === 'all');
 }
 }
 renderHoldingsTable();
 showToast(state.showExits
 ? (isEn() ? 'Included 3 Q3 exited positions (BABA, CRCL, INOD)' : '已并入 BABA、CRCL、INOD 三只本季清仓记录')
 : (isEn() ? 'Filtered to 16 active Q3 holdings' : '已切换为 16 只期末在持证券视图'));
 });

 /* Ch 04 Sell-Put Compounding Simulator Controls */
 var pSlider = document.getElementById('simPrincipalSlider');
 var ySlider = document.getElementById('simYearsSlider');
 var cashSlider = document.getElementById('simCashSlider');
 var eqSlider = document.getElementById('simEqCagrSlider');
 var optToggle = document.getElementById('simOptionToggle');

 pSlider.addEventListener('input', function () {
 state.sim.principal = parseFloat(this.value) || 100000;
 state.sim.preset = '';
 updateSimulatorUI();
 });
 ySlider.addEventListener('input', function () {
 state.sim.years = parseInt(this.value, 10) || 15;
 state.sim.preset = '';
 updateSimulatorUI();
 });
 cashSlider.addEventListener('input', function () {
 state.sim.cashWeight = parseInt(this.value, 10) || 33;
 state.sim.preset = '';
 updateSimulatorUI();
 });
 eqSlider.addEventListener('input', function () {
 state.sim.eqCagr = parseFloat(this.value) || 14.0;
 state.sim.preset = '';
 updateSimulatorUI();
 });
 optToggle.addEventListener('change', function () {
 state.sim.optionBoost = !!this.checked;
 updateSimulatorUI();
 });

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var pb = 0; pb < presetBtns.length; pb++) {
 presetBtns[pb].addEventListener('click', function () {
 var key = this.getAttribute('data-preset');
 var cfg = SIM_PRESETS[key];
 if (!cfg) return;
 state.sim.principal = cfg.principal;
 state.sim.years = cfg.years;
 state.sim.cashWeight = cfg.cashWeight;
 state.sim.eqCagr = cfg.eqCagr;
 state.sim.optionBoost = cfg.optionBoost;
 state.sim.preset = key;
 pSlider.value = String(cfg.principal);
 ySlider.value = String(cfg.years);
 cashSlider.value = String(cfg.cashWeight);
 eqSlider.value = String(cfg.eqCagr);
 optToggle.checked = cfg.optionBoost;
 updateSimulatorUI();
 });
 }

 /* Ch 06 Checklist Controls */
 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var input = e.target.closest('[data-check-input]');
 if (!input) return;
 var idx = parseInt(input.getAttribute('data-check-input'), 10);
 state.checks[idx] = !!input.checked;
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast(isEn() ? 'Completed all 6 13F due-diligence checks' : '已完成全部 6 项段永平 13F 穿透核查');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast(isEn() ? 'Reset checklist to baseline (50%)' : '核查清单已恢复默认基准状态 (50%)');
 });

 /* Reading Progress & Scroll-Spy */
 function updateScrollProgress() {
 var docEl = document.documentElement;
 var scrollTop = window.scrollY || docEl.scrollTop || 0;
 var maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
 var pct = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
 document.getElementById('readingProgressBar').style.width = pct + '%';
 }
 window.addEventListener('scroll', updateScrollProgress, { passive: true });
 updateScrollProgress();

 if ('IntersectionObserver' in window) {
 var secObserver = new IntersectionObserver(function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 var id = entry.target.id;
 for (var i = 0; i < tocLinks.length; i++) {
 tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === id);
 }
 }
 });
 }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });

 for (var s = 0; s <= 7; s++) {
 var secNode = document.getElementById('sec-0' + s);
 if (secNode) secObserver.observe(secNode);
 }
 }

 wireCanvasTooltip('chartCh1');
 wireCanvasTooltip('chartRadar');
 wireCanvasTooltip('chartBars');
 wireCanvasTooltip('chartTrades');
 wireCanvasTooltip('chartSim');

 var resizeTimer = null;
 function scheduleRedraw() {
 if (resizeTimer) clearTimeout(resizeTimer);
 resizeTimer = setTimeout(renderAllCharts, 60);
 }
 window.addEventListener('resize', scheduleRedraw);
 if ('ResizeObserver' in window) {
 var mainEl = document.querySelector('.main-content');
 if (mainEl) {
 var ro = new ResizeObserver(scheduleRedraw);
 ro.observe(mainEl);
 }
 }
 }

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', init);
 } else {
 init();
 }
 })();
 