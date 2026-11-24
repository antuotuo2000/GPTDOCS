
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var DOC_TITLE_ZH = '苹果公司 Apple Inc. (AAPL) 企业文化与组织架构深度研究报告 | 数据中心';
    var DOC_TITLE_EN = 'Apple Inc. (AAPL) Corporate Culture & Organizational Architecture Deep Dive | Research Hub';

    var I18N_RICH_LIST = [
      {"key": "aapl_r00", "match_zh": "苹果公司 Apple Inc. 企业文化与组织架构深度研究报告：", "zh": "苹果公司 Apple Inc. 企业文化与组织架构深度研究报告：<span class=\"gradient-accent\">专家统治、零部门墙全栈协同与“世界最大初创企业”的创新法则</span>", "en": "Apple Inc. Corporate Culture &amp; Organizational Architecture Deep Dive: <span class=\"gradient-accent\">Experts Leading Experts, Zero-Silo Single P&amp;L &amp; Rules of the \"World's Biggest Startup\"</span>"},
      {"key": "aapl_r01", "match_zh": "为什么几乎所有跨入千亿美元营收规模的巨头", "zh": "为什么几乎所有跨入千亿美元营收规模的巨头都会裂变为各自算账的独立事业部（M-Form），唯独<strong>苹果公司（Apple Inc., NASDAQ: AAPL）</strong>能在近半万亿美元营收体量下依然保持浑然一体的产品灵魂？答案深植于 1997 年史蒂夫·乔布斯回归后单日废除全部产品事业部总经理、沿用至今的<strong>“按专业职能高度集权（Functional Organization）+ 全公司唯一一张损益表（Single P&amp;L）”</strong>架构 <a class=\"cite-link\" href=\"https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">HBR · Podolny &amp; Hansen ↗</a>。 在苹果内部，没有“iPhone 事业部总裁”或“Mac 利润中心”，决策权严格对齐专业深度——由顶尖专家管理专家，每项任务明确唯一署名的<strong>直接责任人（DRI）</strong>，消除了内部转移定价与跨部门抢利内耗 <a class=\"cite-link\" href=\"https://fortune.com/article/how-apple-works-inside-the-worlds-biggest-startup/\" target=\"_blank\" rel=\"noopener noreferrer\">Fortune Inside Apple ↗</a>。 据 2026 年 11 月披露的 FY2026 财报及 Form 10-K，苹果仅凭约 <strong>167,000 名全职员工</strong>（同比仅微增 <strong>+0.6%</strong>，其中工程研发人员占比高达 <strong>41%</strong>） <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/320193/000032019326000026/aapl-20260926.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC FY26 10-K ↗</a> <a class=\"cite-link\" href=\"https://sqmagazine.co.uk/how-many-people-work-at-apple/\" target=\"_blank\" rel=\"noopener noreferrer\">SQ Magazine ↗</a>， 创下全年净营收 <strong>$4,788.34 亿（+15.1% YoY）</strong>、全年综合毛利率 <strong>48.8%</strong>（服务毛利率达 <strong>76.2%</strong>）、GAAP 净利润 <strong>$1,321.75 亿</strong>及人均创收 <strong>$2.87M</strong> 的历史最高纪录 <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/320193/000032019326000024/a8-kex991q4202609262026.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC Q4/FY26 8-K ↗</a>。 2026 年 9 月 1 日，深耕苹果 25 年的硬件工程统帅 <strong>约翰·特努斯（John Ternus）</strong>正式接替转任执行董事长的蒂姆·库克（Tim Cook）出任 CEO，携折叠屏 iPhone Duo、iPhone 18 Pro 与触控 Mac 开启第三代“工程师治企”新纪元 <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/\" target=\"_blank\" rel=\"noopener noreferrer\">Apple CEO Succession ↗</a>。", "en": "Why does virtually every enterprise crossing $100B in sales fragment into autonomous business-unit fiefdoms (M-Form), while <strong>Apple Inc. (NASDAQ: AAPL)</strong> preserves a singular product soul at nearly half a trillion dollars in annual revenue? The answer traces to Steve Jobs's 1997 return, when he abolished all product-line general managers in a single day and established Apple's enduring <strong>\"Functional Organization + Single Company-Wide P&amp;L\"</strong> <a class=\"cite-link\" href=\"https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">HBR · Podolny &amp; Hansen ↗</a>. Inside Apple, there is no \"President of iPhone\" or \"Mac Profit Center\"—decision rights follow domain mastery as <em>experts lead experts</em>, and every deliverable names a single <strong>Directly Responsible Individual (DRI)</strong>, eliminating transfer-pricing turf wars <a class=\"cite-link\" href=\"https://fortune.com/article/how-apple-works-inside-the-worlds-biggest-startup/\" target=\"_blank\" rel=\"noopener noreferrer\">Fortune Inside Apple ↗</a>. Per its November 2026 FY2026 Form 10-K and earnings release, Apple employed <strong>~167,000 FTEs</strong> (up just <strong>+0.6% YoY</strong>, with <strong>41%</strong> in engineering R&amp;D) <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/320193/000032019326000026/aapl-20260926.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC FY26 10-K ↗</a> <a class=\"cite-link\" href=\"https://sqmagazine.co.uk/how-many-people-work-at-apple/\" target=\"_blank\" rel=\"noopener noreferrer\">SQ Magazine ↗</a>, delivering all-time record net sales of <strong>$478.83B (+15.1% YoY)</strong>, consolidated gross margin of <strong>48.8%</strong> (Services at <strong>76.2%</strong>), GAAP net income of <strong>$132.18B</strong>, and <strong>$2.87M</strong> in revenue per employee <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/320193/000032019326000024/a8-kex991q4202609262026.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC Q4/FY26 8-K ↗</a>. On September 1, 2026, 25-year hardware engineering chief <strong>John Ternus</strong> succeeded Tim Cook (now Executive Chairman) as CEO, ushering in a third generation of engineer-led stewardship alongside foldable iPhone Duo, iPhone 18 Pro, and Touch Mac <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/\" target=\"_blank\" rel=\"noopener noreferrer\">Apple CEO Succession ↗</a>."},
      {"key": "aapl_r02", "match_zh": "16.7 万名全职员工（较 FY25 仅增", "zh": "16.7 万名全职员工（较 FY25 仅增 1,000 人）人均创收达 $287 万、人均净利 $79.1 万，显著高于 FY11 ($1.79M) <a class=\"cite-link\" href=\"https://bullfincher.io/companies/apple/number-of-employees\" target=\"_blank\" rel=\"noopener noreferrer\">Bullfincher 10-K ↗</a>。", "en": "167,000 FTEs (+1,000 vs. FY25) generate $2.87M in revenue and $791K in GAAP net profit per employee—far above FY11 ($1.79M) <a class=\"cite-link\" href=\"https://bullfincher.io/companies/apple/number-of-employees\" target=\"_blank\" rel=\"noopener noreferrer\">Bullfincher 10-K ↗</a>."},
      {"key": "aapl_r03", "match_zh": "FY26 总净营收同比增长 +15.1%", "zh": "FY26 总净营收同比增长 +15.1% 至 $4,788.34 亿（iPhone $2,541.0 亿、服务 $1,233.0 亿），稀释 EPS 增 20.4% 至 $8.98 <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/320193/000032019326000024/a8-kex991q4202609262026.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC FY26 8-K ↗</a>。", "en": "FY26 net sales jumped +15.1% YoY to $478.83B (iPhone $254.10B, Services $123.30B), lifting diluted EPS +20.4% to $8.98 <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/320193/000032019326000024/a8-kex991q4202609262026.htm\" target=\"_blank\" rel=\"noopener noreferrer\">SEC FY26 8-K ↗</a>."},
      {"key": "aapl_r04", "match_zh": "Apple Silicon 全线自研与高粘性服务", "zh": "Apple Silicon 全线自研与高粘性服务推动全年综合毛利率由 FY22 的 43.3% 跃升至 FY26 的 48.8%（Q4 单季 47.9%） <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/\" target=\"_blank\" rel=\"noopener noreferrer\">Q4 FY26 Release ↗</a>。", "en": "Custom Apple Silicon and high-margin Services expanded full-year gross margin from 43.3% (FY22) to 48.8% in FY26 (47.9% in Q4) <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/\" target=\"_blank\" rel=\"noopener noreferrer\">Q4 FY26 Release ↗</a>."},
      {"key": "aapl_r05", "match_zh": "全球超 25 亿台活跃设备与 540 家", "zh": "全球超 25 亿台活跃设备与 540 家 Apple Store 同享一套系统底座；FY26 研发投入飙升 +32.5% 至 $457.65 亿 <a class=\"cite-link\" href=\"https://9to5mac.com/2026/01/29/apple-reveals-it-has-2-5-billion-active-devices-around-the-world/\" target=\"_blank\" rel=\"noopener noreferrer\">2.5B Devices ↗</a>。", "en": ">2.5B active devices and 540 Apple Stores run on one unified OS foundation; FY26 R&amp;D rose +32.5% YoY to $45.77B <a class=\"cite-link\" href=\"https://9to5mac.com/2026/01/29/apple-reveals-it-has-2-5-billion-active-devices-around-the-world/\" target=\"_blank\" rel=\"noopener noreferrer\">2.5B Devices ↗</a>."}
    ];

    var I18N_TEXT_PAIRS = [
      ["数据中心", "Research Hub"],
      ["苹果公司 (Apple) 企业文化与组织架构研报", "Apple Corporate Culture & Org Report"],
      ["苹果企业文化研报", "Apple Culture Monograph"],
      ["组织形态与损益表", "Org & P&L Model"],
      ["职能制 · 单一 P&L", "Functional · Single P&L"],
      ["FY26 全职编制 / 人效", "FY26 FTEs / Rev per FTE"],
      ["16.7万人 · $2.87M", "167k FTE · $2.87M"],
      ["FY26 综合毛利 / 服务毛利", "FY26 Total / Services GM"],
      ["核心研究章节 (00 – 07)", "Report Chapters (00 – 07)"],
      ["执行摘要与核心指标", "Executive Summary & KPIs"],
      ["职能制架构与单一P&L协同", "Functional Org & Single P&L"],
      ["四大文化支柱与创新护城河", "4 Cultural Pillars & Moat"],
      ["全球科技巨头文化横向对比", "Global Big Tech Peer Matrix"],
      ["全栈红利、利润率与复利推演", "Full-Stack Margins & Flywheel"],
      ["三代演进与四大战役复盘", "3-Era Evolution & Case Studies"],
      ["苹果文化法则核查清单", "Org Diagnostic Checklist"],
      ["数据来源与监管核验索引", "Primary Filings & Sources"],
      ["阅读与导出工具", "Reading & Export Tools"],
      ["浅色外观", "Light"],
      ["深色外观", "Dark"],
      ["导出 HTML", "Export HTML"],
      ["打印 / PDF", "Print / PDF"],
      ["全部标杆企业", "All Peers"],
      ["职能集权与全栈派", "Functional & Full-Stack"],
      ["分权自治与事业部派", "Divisional & Decentralized"],
      ["全部勾选", "Check All"],
      ["重置清单", "Reset"]
    ];

    var PILLAR_NOTES = [
      '<strong>当前选中支柱解读（01 专家领导专家）：</strong>苹果大学院长 Joel Podolny 指出，苹果要求各级管理者具备“深厚领域专业知识 + 向下深入三层细节 + 跨职能协作辩论”三大特质；2026 年 9 月硬件统帅 John Ternus 出任 CEO 正是这一基因的延续 <a class="cite-link" href="https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf" target="_blank" rel="noopener noreferrer">HBR Paper ↗</a>。',
      '<strong>当前选中支柱解读（02 DRI 直接责任人制）：</strong>在苹果内部不存在权责模糊的协调委员会，每一项功能模块、每一次供应链良率攻关在会议纪要上都只写唯一一位 DRI 的名字，消灭跨部门扯皮 <a class="cite-link" href="https://fortune.com/article/how-apple-works-inside-the-worlds-biggest-startup/" target="_blank" rel="noopener noreferrer">Fortune Inside Apple ↗</a>。',
      '<strong>当前选中支柱解读（03 Apple University 与极简减法）：</strong>通过毕加索《公牛》11 版石版画课程向管理者灌输“删繁就简”哲学，每年砍掉大量平庸产品构想，以极精简旗舰矩阵撬动 FY26 $4,788.3 亿总营收 <a class="cite-link" href="https://www.bestcollegereviews.org/apple-university/" target="_blank" rel="noopener noreferrer">Apple University ↗</a>。',
      '<strong>当前选中支柱解读（04 ANPP 流程与十年秘密深潜）：</strong>依托严密的 ANPP 里程碑与物理隔离保密制度，苹果在 FY26 将研发投入大幅拉升 +32.5% 至 $457.7 亿，集中攻坚自研芯片、iPhone Duo 折叠形态与全新 Siri AI <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/320193/000032019326000024/a8-kex991q4202609262026.htm" target="_blank" rel="noopener noreferrer">SEC FY26 8-K ↗</a>。'
    ];

    var PILLAR_NOTES_EN = [
      '<strong>Selected Pillar (01 · Experts Leading Experts):</strong> Apple University Dean Joel Podolny notes leaders must combine deep domain expertise, immersion three levels down into detail, and collaborative debate—exemplified by Hardware Chief John Ternus becoming CEO in Sep 2026 <a class="cite-link" href="https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf" target="_blank" rel="noopener noreferrer">HBR Paper ↗</a>.',
      '<strong>Selected Pillar (02 · Single DRI Ownership):</strong> Apple bans diffused standing committees; every hardware feature, firmware module, and supply-chain ramp names one Directly Responsible Individual (DRI) <a class="cite-link" href="https://fortune.com/article/how-apple-works-inside-the-worlds-biggest-startup/" target="_blank" rel="noopener noreferrer">Fortune Inside Apple ↗</a>.',
      '<strong>Selected Pillar (03 · Apple University &amp; Radical Focus):</strong> Picasso\'s 11-state <em>Bull</em> lithograph curriculum trains leaders to eliminate clutter and mediocre SKUs—enabling a focused lineup to generate $478.83B in FY26 sales <a class="cite-link" href="https://www.bestcollegereviews.org/apple-university/" target="_blank" rel="noopener noreferrer">Apple University ↗</a>.',
      '<strong>Selected Pillar (04 · ANPP &amp; Multi-Year Stealth R&amp;D):</strong> Protected by ANPP milestones and compartmentalization, Apple boosted FY26 R&amp;D +32.5% YoY to $45.77B across custom silicon, foldable iPhone Duo, and Siri AI <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/320193/000032019326000024/a8-kex991q4202609262026.htm" target="_blank" rel="noopener noreferrer">SEC FY26 8-K ↗</a>.'
    ];

    var PEER_ROWS = [
      {
        category: 'functional', benchmark: true,
        company: '研究基准：苹果公司 (Apple · AAPL)', leader: '乔布斯 / 库克 / 约翰·特努斯 (2026.09+)',
        positioning: '职能制集权 (Functional Org) + 全公司唯一损益表 (Single P&L)',
        culture: '专家领导专家 + DRI 直接责任人 + Apple University 极简审美',
        headcount: '16.7万人 (41%工程) · 人均创收 $2.87M',
        margins: 'FY26 营收 $4,788亿 · 综合毛利 48.8% (服务 76.2%) · 净利 $1,322亿',
        verdict: '软硬芯服全栈协同标杆：取消事业部利润墙，以极少 SKU 打造全球最高粘性生态（>25亿活跃设备）与 $1,361亿年度自由现金流。',
        sourceLabel: 'SEC FY26 10-K / HBR', sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
      },
      {
        category: 'functional', benchmark: false,
        company: '英伟达 (NVIDIA · NVDA)', leader: '黄仁勋 (Jensen Huang)',
        positioning: '超扁平职能网络 + ~60名高管直报 CEO + 单一全栈算力平台',
        culture: '无事业部割据 + Top-5 邮件全透明信息流 + 光速执行哲学',
        headcount: '~4.2万人 (研发占 ~74%) · 人均创收 ~$5.14M',
        margins: 'FY26 营收 $2,159亿 · GAAP 毛利率 71.1% · 净利 $1,201亿',
        verdict: '最接近苹果的硬科技同盟：同样拒绝独立事业部 P&L、坚持芯片与 CUDA 软件全栈耦合，但英伟达强调全员信息透明，而苹果实行严格物理保密。',
        sourceLabel: 'NVIDIA FY26 Stats', sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
      },
      {
        category: 'divisional', benchmark: false,
        company: '微软 (Microsoft · MSFT)', leader: '萨提亚·纳德拉 (Satya Nadella)',
        positioning: '三大业务板块事业部矩阵 (智能云 Azure / 生产力 M365 / 个人计算)',
        culture: '成长型思维 (Growth Mindset) + 事业部 P&L 协同 + 开放生态',
        headcount: '~22.3万人 (研发 7.7万人) · 人均创收 ~$1.49M',
        margins: 'FY26 营收 $3,318亿 · 企业云与软件高营业利润率驱动',
        verdict: '企业级软件广度霸主：纳德拉重塑跨事业部协作打赢云与企业 AI 战役，但在消费硬件端难以复制苹果单一损益表下的工业设计统一性。',
        sourceLabel: 'MSFT FY26 10-K Data', sourceUrl: 'https://bebop.ai/companies/largest-tech-companies'
      },
      {
        category: 'divisional', benchmark: false,
        company: '亚马逊 (Amazon · AMZN)', leader: '贝索斯 / 安迪·贾西 (Andy Jassy)',
        positioning: '解耦 API 契约化服务 + 数千支“双披萨自治小队 (Two-Pizza Teams)”',
        culture: '永远的 Day 1 + 16条领导力准则 + 六页纸叙事备忘录',
        headcount: '~155万+ (含全球仓储物流履约网络)',
        margins: 'FY25 营收 $7,169亿 · AWS 云基建与高毛利广告双擎盈利',
        verdict: '分布式并行试错机器：双披萨分权架构极度适合电商与云服务横向扩张试错，而苹果职能集权则专为打磨零容错软硬一体精品而生。',
        sourceLabel: 'Amazon 2025 AR', sourceUrl: 'https://s2.q4cdn.com/299287126/files/doc_financials/2026/ar/Amazon-2025-Annual-Report.pdf'
      },
      {
        category: 'divisional', benchmark: false,
        company: '伯克希尔·哈撒韦 (Berkshire · BRK.B)', leader: '巴菲特 / 芒格 / 格雷格·阿贝尔 (Greg Abel)',
        positioning: '奥马哈 27 人极简总部 + 60+ 独立子公司极端分权联邦',
        culture: '经营权接近 100% 下放自治 + 浮存金与资本配置权绝对集中',
        headcount: '~38.8万人 · 集团总部仅 27 人',
        margins: '跨保险、铁路、能源与消费品的永续现金复利综合体',
        verdict: '集权与分权的哲学双子星：伯克希尔管异质百业靠“子公司零干预”，苹果造同源生态靠“跨职能 100% 咬合”——巴菲特却长期将苹果列为核心重仓。',
        sourceLabel: 'Berkshire AR', sourceUrl: 'https://www.berkshirehathaway.com/2025ar/2025ar.pdf'
      }
    ];

    var PEER_ROWS_EN = [
      {
        category: 'functional', benchmark: true,
        company: 'Benchmark: Apple Inc. (AAPL)', leader: 'Jobs / Cook / John Ternus (Sep 2026+)',
        positioning: 'Functional Organization + Single Company-Wide P&L',
        culture: 'Experts Leading Experts + Single DRI + Apple University simplicity',
        headcount: '167,000 FTE (41% Eng) · $2.87M Rev / FTE',
        margins: 'FY26 Sales $478.8B · 48.8% GM (Services 76.2%) · Net Inc $132.2B',
        verdict: 'Full-stack gold standard: zero unit P&L silos unlock seamless hardware-silicon-OS synergy across >2.5B active devices and $136.1B FCF.',
        sourceLabel: 'SEC FY26 10-K / HBR', sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
      },
      {
        category: 'functional', benchmark: false,
        company: 'NVIDIA (NVDA)', leader: 'Jensen Huang',
        positioning: 'Ultra-flat functional network + ~60 direct reports + unified AI stack',
        culture: 'No business-unit silos + Top-5 email transparency + speed-of-light execution',
        headcount: '~42,000 FTE (~74% R&D) · ~$5.14M Rev / FTE',
        margins: 'FY26 Sales $215.9B · 71.1% GAAP GM · Net Inc $120.1B',
        verdict: 'Closest hard-tech cousin: likewise rejects divisional P&Ls for full-stack silicon + CUDA integration, favoring open info flow vs. Apple secrecy.',
        sourceLabel: 'NVIDIA FY26 Stats', sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
      },
      {
        category: 'divisional', benchmark: false,
        company: 'Microsoft (MSFT)', leader: 'Satya Nadella',
        positioning: 'Three major business segments (Intelligent Cloud / Productivity / Personal Computing)',
        culture: 'Growth Mindset + cross-division enterprise cloud & AI platform synergy',
        headcount: '~223,000 FTE (77k R&D) · ~$1.49M Rev / FTE',
        margins: 'FY26 Sales $331.8B · High enterprise cloud & software operating margins',
        verdict: 'Enterprise software powerhouse: excels across diverse B2B software verticals, though divisional boundaries limit Apple-style consumer hardware craft.',
        sourceLabel: 'MSFT FY26 10-K Data', sourceUrl: 'https://bebop.ai/companies/largest-tech-companies'
      },
      {
        category: 'divisional', benchmark: false,
        company: 'Amazon (AMZN)', leader: 'Jeff Bezos / Andy Jassy',
        positioning: 'Decoupled API service architecture + thousands of Two-Pizza Teams',
        culture: 'Day 1 mentality + 16 Leadership Principles + 6-Pager narrative memos',
        headcount: '~1.55M+ (including global fulfillment network)',
        margins: 'FY25 Sales $716.9B · AWS cloud & high-margin advertising profit engines',
        verdict: 'Decentralized experimentation engine: Two-Pizza autonomy thrives on rapid parallel bets, whereas Apple centralizes to perfect a few flagship icons.',
        sourceLabel: 'Amazon 2025 AR', sourceUrl: 'https://s2.q4cdn.com/299287126/files/doc_financials/2026/ar/Amazon-2025-Annual-Report.pdf'
      },
      {
        category: 'divisional', benchmark: false,
        company: 'Berkshire Hathaway (BRK.B)', leader: 'Buffett / Munger / Greg Abel',
        positioning: '27-person Omaha HQ + 60+ autonomous operating subsidiaries',
        culture: 'Near-100% operating decentralization + centralized float & capital allocation',
        headcount: '~388,000 FTE · Only 27 at parent HQ',
        margins: 'Perpetual cash-compounding federation across insurance, rail, energy & retail',
        verdict: 'Philosophical mirror image: Berkshire decentralizes unrelated businesses while Apple unifies one ecosystem—yet Buffett made Apple a core holding.',
        sourceLabel: 'Berkshire AR', sourceUrl: 'https://www.berkshirehathaway.com/2025ar/2025ar.pdf'
      }
    ];

    var CHECKLIST_ITEMS = [
      { tag: '专家决策权', title: '1. “专家领导专家”测试：拍板者是否掌握向下三层的技术细节？', desc: '核查核心部门主管是否为本领域一线技术/设计权威（如硬件专家 Ternus、芯片专家 Srouji），而非仅看财务报表的行政通才。' },
      { tag: '单一 P&L 协同', title: '2. 零部门利润墙测试：软硬件团队是否免于内部结算与抢利内耗？', desc: '观察底层芯片、系统算法与工业设计团队能否为提升整体体验无私共享研发成果，而非因独立事业部考核各自为政。' },
      { tag: 'DRI 唯一问责', title: '3. DRI 直接责任人测试：每个关键交付节点旁是否只写一个名字？', desc: '检验项目看板与会议纪要是否彻底杜绝“多部门联合负责”，确保每项特性与供应链节点均有唯一可拍板、可追责的 DRI。' },
      { tag: '《公牛》极简力', title: '4. 战略减法与聚焦测试：管理层是否有勇气砍掉 90% 伪机会与冗余 SKU？', desc: '面对诱人风口或百亿沉没成本（如造车项目），管理层能否果断止损，将顶尖研发带宽集中于极少数能做到全球第一的旗舰产品。' },
      { tag: '$2.87M 人效锚', title: '5. 招聘克制与人才密度测试：人均创收是否随规模持续跃升？', desc: '对标苹果 41% 工程研发占比与 FY26 仅 +0.6% 的极低净增员率，检验企业是否靠 A 级人才密度而非盲目堆人头驱动增长。' },
      { tag: '76.2% 服务毛利', title: '6. 软硬服生态粘性测试：硬件存量底座能否自然生长出高毛利服务现金流？', desc: '核查硬件用户留存率是否足以衍生出高毛利、高复购的订阅与服务飞轮，并转化为持续回馈股东的千亿级自由现金流。' }
    ];

    var CHECKLIST_ITEMS_EN = [
      { tag: 'Domain Mastery', title: '1. "Experts Leading Experts" Test: Do decision-makers master details three levels down?', desc: 'Verify whether core engineering and product leaders are world-class domain authorities (like Ternus in hardware, Srouji in silicon) rather than generalist managers.' },
      { tag: 'Single P&L Synergy', title: '2. Zero Profit-Wall Test: Are hardware and software teams free from transfer-pricing turf wars?', desc: 'Assess whether silicon, OS, and design teams share breakthroughs seamlessly for overall UX rather than optimizing isolated divisional P&Ls.' },
      { tag: 'Single DRI', title: '3. DRI Accountability Test: Does every critical deliverable carry a single named owner?', desc: 'Check project trackers and review notes to ensure zero "joint committee ownership" ambiguity—every milestone has one accountable DRI.' },
      { tag: 'Picasso Subtraction', title: '4. Strategic Focus Test: Does leadership have the courage to kill 90% of distractions & sunk costs?', desc: 'Facing hype cycles or multi-billion sunk costs (like Project Titan), can leadership decisively cut losses and focus A-players on category-defining flagships?' },
      { tag: '$2.87M / FTE', title: '5. Hiring Restraint & Talent Density Test: Is revenue per employee compounding with scale?', desc: 'Benchmarked against Apple\'s 41% engineering mix and +0.6% FY26 FTE growth, is growth driven by A-player leverage rather than headcount bloat?' },
      { tag: '76.2% Services GM', title: '6. Ecosystem Flywheel Test: Does hardware retention naturally spawn high-margin recurring services?', desc: 'Verify whether installed-base loyalty generates high-margin recurring services cash flow and disciplined capital return to shareholders.' }
    ];

    var QUICK_JUMP_INDEX = [
      { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '$478.8B 营收 · $2.87M 人均创收 · 48.8% 综合毛利率' },
      { sec: 'sec-01', title: '01 职能制架构与单一 P&L 协同', sub: 'John Ternus 履新 CEO · 五大生态营收与人效双视图图表' },
      { sec: 'sec-02', title: '02 四大文化支柱与创新护城河', sub: '专家领导专家 · DRI 问责 · Apple University · 五维雷达图' },
      { sec: 'sec-03', title: '03 全球科技巨头文化横向对比', sub: 'Apple vs NVIDIA vs Microsoft vs Amazon vs Berkshire' },
      { sec: 'sec-04', title: '04 全栈红利、利润率与复利推演', sub: 'FY22–FY26 净利与毛利率双升 · 跨代文化复利推演器' },
      { sec: 'sec-05', title: '05 三代演进与四大战役复盘', sub: '1997 一日废藩 · Apple Silicon 换心 · 2026.09 特努斯接棒' },
      { sec: 'sec-06', title: '06 苹果文化法则核查清单', sub: '6 项全栈创新组织诊断与本地持久化评分' },
      { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC FY26 10-K/8-K · Apple Newsroom · HBR 权威信源' }
    ];

    var QUICK_JUMP_EN = [
      { sec: 'sec-00', title: '00 Executive Summary & KPIs', sub: '$478.8B Sales · $2.87M Rev/FTE · 48.8% Gross Margin' },
      { sec: 'sec-01', title: '01 Functional Org & Single P&L', sub: 'John Ternus CEO · 5-Segment Sales & Productivity Charts' },
      { sec: 'sec-02', title: '02 Four Cultural Pillars & Moat', sub: 'Experts Leading Experts · DRI · Apple University · 5-Axis Radar' },
      { sec: 'sec-03', title: '03 Global Big Tech Peer Matrix', sub: 'Apple vs. NVIDIA vs. Microsoft vs. Amazon vs. Berkshire' },
      { sec: 'sec-04', title: '04 Full-Stack Margins & Flywheel', sub: 'FY22–FY26 Profit & GM Expansion · Multi-Era Simulator' },
      { sec: 'sec-05', title: '05 Three-Era Evolution & Battles', sub: '1997 Reset · Apple Silicon · Sep 2026 Ternus Succession' },
      { sec: 'sec-06', title: '06 Apple Culture Checklist', sub: '6-Point Full-Stack Org Diagnostic (Saved Locally)' },
      { sec: 'sec-07', title: '07 Primary Filings & Sources', sub: 'SEC FY26 10-K/8-K · Apple Newsroom · HBR Monograph' }
    ];

    var STORAGE_CHECK_KEY = 'mui_aapl_culture_checks_v1';
    var PRESETS = {
      p1: { principal: 10000, years: 15, priceCagr: 21.5, drip: true },
      p2: { principal: 10000, years: 14, priceCagr: 39.3, drip: false },
      p3: { principal: 10000, years: 10, priceCagr: 11.5, drip: true }
    };

    var state = {
      lang: 'zh',
      theme: 'dark',
      ch1View: 'viewA',
      activePillar: 0,
      radarSeries: { aapl: true, nvda: true, mform: true },
      peerFilter: 'all',
      peerQuery: '',
      sim: { principal: 10000, years: 15, priceCagr: 21.5, drip: true, preset: 'p1' },
      checks: [true, true, true, false, false, false],
      ch1Series: { s1: true, s2: true },
      epsSeries: { eps: true, oci: true }
    };

    function safeGetStorage(key) { try { return window.localStorage.getItem(key); } catch (err) { return null; } }
    function safeSetStorage(key, val) { try { window.localStorage.setItem(key, val); } catch (err) {} }
    function isEn() { return state.lang === 'en'; }

    var toastTimer = null;
    function showToast(message) {
      var el = document.getElementById('muiSnackbar');
      if (!el) return;
      el.textContent = message;
      el.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
    }

    var _zhToEnText = {}, _enToZhText = {};
    for (var _ti = 0; _ti < I18N_TEXT_PAIRS.length; _ti++) {
      _zhToEnText[I18N_TEXT_PAIRS[_ti][0]] = I18N_TEXT_PAIRS[_ti][1];
      _enToZhText[I18N_TEXT_PAIRS[_ti][1]] = I18N_TEXT_PAIRS[_ti][0];
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
          ? 'FY2025 vs. FY2026 Net Sales Across Five Product & Service Ecosystems ($B · SEC 10-K)'
          : 'FY2025 vs FY2026 五大生态产品线净营收协同跃升（$B · SEC Form 10-K）';
        subEl.textContent = isEn()
          ? 'Single P&L synergy drove all-time records in iPhone ($254.10B, +21.2%), Services ($123.30B, +13.0%), and Mac ($37.93B, +12.5%)'
          : '单一损益表消除部门墙：iPhone ($254.10B, +21.2%)、Services ($123.30B, +13.0%) 与 Mac ($37.93B, +12.5%) 齐创纪录';
      } else {
        titleEl.textContent = isEn()
          ? 'FY2021–FY2026 Disciplined FTE Headcount (k) vs. Revenue per Employee ($M · 10-K)'
          : 'FY2021–FY2026 招聘克制（千人）vs 人均创收跃迁（$M · Form 10-K）';
        subEl.textContent = isEn()
          ? 'Four-year FTE headcount held nearly flat (164k → 167k) while revenue per employee surged to a record $2.87M in FY26'
          : '四年间全职员工稳定在 16.4万–16.7万人区间，FY26 人均年创收跃升至创纪录的 $2.87M';
      }
    }

    function syncCollapseButtonsText() {
      var btns = document.querySelectorAll('[data-collapse-target]');
      for (var i = 0; i < btns.length; i++) {
        var pid = btns[i].getAttribute('data-collapse-target');
        var panel = document.getElementById(pid);
        var isOpen = panel && panel.classList.contains('open');
        if (isEn()) {
          btns[i].innerHTML = isOpen ? '<span>Hide Execution Mechanics</span> <span>⌃</span>' : '<span>Show Execution Mechanics</span> <span>⌄</span>';
        } else {
          btns[i].innerHTML = isOpen ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
        }
      }
    }

    function applyLanguage(lang, silent) {
      bindRichBlocksOnce();
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
      var dynNavSpans = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
      for (var dn = 0; dn < dynNavSpans.length; dn++) {
        dynNavSpans[dn].textContent = en ? dynNavSpans[dn].getAttribute('data-i18n-en') : dynNavSpans[dn].getAttribute('data-i18n-zh');
      }
      var richNodes = document.querySelectorAll('[data-i18n-rich]');
      for (var r = 0; r < richNodes.length; r++) {
        var rk = richNodes[r].getAttribute('data-i18n-rich');
        var rEntry = _richMapByKey[rk];
        if (rEntry) richNodes[r].innerHTML = en ? rEntry.en : rEntry.zh;
      }

      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      var tNode;
      while ((tNode = walker.nextNode())) {
        var pEl = tNode.parentElement;
        if (!pEl) continue;
        var tag = pEl.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE') continue;
        if (pEl.closest('#langSwitchGroup') || pEl.closest('[data-i18n-rich]') || pEl.closest('#pillarFocusNote')) continue;
        var raw = tNode.nodeValue || '';
        var trimmed = raw.replace(/\s+/g, ' ').trim();
        if (!trimmed) continue;
        var mapped = en ? _zhToEnText[trimmed] : _enToZhText[trimmed];
        if (mapped) {
          var leadMatch = raw.match(/^\s*/);
          var trailMatch = raw.match(/\s*$/);
          tNode.nodeValue = (leadMatch ? leadMatch[0] : '') + mapped + (trailMatch ? trailMatch[0] : '');
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
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
      }
      var sDarkBtn = document.getElementById('sideThemeDarkBtn');
      var sLightBtn = document.getElementById('sideThemeLightBtn');
      if (sDarkBtn && sLightBtn) {
        sDarkBtn.classList.toggle('active', state.theme === 'dark');
        sLightBtn.classList.toggle('active', state.theme === 'light');
      }
      safeSetStorage(STORAGE_THEME_KEY, state.theme);
      renderAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? '已切换至深色高对比模式' : '已切换至 MUI 浅色清晰模式');
    }

    function escapeHtml(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function highlightMatch(text, query) {
      var safe = escapeHtml(text);
      if (!query) return safe;
      var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var re = new RegExp('(' + escapedQ + ')', 'gi');
      return safe.replace(re, '<mark class="hl">$1</mark>');
    }

    function renderPeerTable() {
      var tbody = document.getElementById('peerTableBody');
      var badge = document.getElementById('peerCountBadge');
      if (!tbody) return;

      var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS;
      var q = state.peerQuery.trim().toLowerCase();
      var filtered = activeRows.filter(function (row, idx) {
        var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
        if (!catOk) return false;
        if (!q) return true;
        var zhR = PEER_ROWS[idx] || row;
        var enR = PEER_ROWS_EN[idx] || row;
        var hay = (zhR.company + ' ' + zhR.leader + ' ' + zhR.positioning + ' ' + zhR.culture + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.leader + ' ' + enR.positioning).toLowerCase();
        return hay.indexOf(q) !== -1;
      });

      if (badge) {
        badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆企业');
      }

      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching benchmark companies found.' : '未找到匹配的标杆企业记录，请尝试其他关键词或重置筛选。') + '</td></tr>';
        return;
      }

      var rawQ = state.peerQuery.trim();
      tbody.innerHTML = filtered.map(function (r) {
        return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
          '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.75rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
          '<td>' + highlightMatch(r.positioning, rawQ) + '</td>' +
          '<td>' + highlightMatch(r.culture, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.headcount, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.margins, rawQ) + '</td>' +
          '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
        '</tr>';
      }).join('');
    }

    function formatCurrency(val) {
      if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
      return '$' + Math.round(val).toLocaleString('en-US');
    }

    function updateSimulatorUI() {
      var p = state.sim.principal;
      var yrs = state.sim.years;
      var cagr = state.sim.priceCagr;
      var dripRate = state.sim.drip ? 2.2 : 0.0;
      var totalRate = (cagr + dripRate) / 100;

      var endingValue = p * Math.pow(1 + totalRate, yrs);
      var moic = endingValue / p;
      var netGain = endingValue - p;
      var midYear = Math.max(1, Math.floor(yrs / 2));
      var midValue = p * Math.pow(1 + totalRate, midYear);

      document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
      document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
      document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';

      document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
      document.getElementById('simMoicVal').textContent = (moic >= 100 ? moic.toFixed(1) : moic.toFixed(2)) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
      document.getElementById('simNetGainVal').textContent = formatCurrency(netGain);
      document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint Value') : ('第 ' + midYear + ' 年中期资产节点');
      document.getElementById('simMidVal').textContent = formatCurrency(midValue);

      var presetBtns = document.querySelectorAll('[data-preset]');
      for (var i = 0; i < presetBtns.length; i++) {
        presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
      }
      drawSimChart();
    }

    function renderChecklist() {
      var container = document.getElementById('checklistContainer');
      var chip = document.getElementById('checklistScoreChip');
      var bar = document.getElementById('checklistProgressBar');
      if (!container) return;

      var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
      var doneCount = state.checks.filter(Boolean).length;
      var pct = Math.round((doneCount / itemsList.length) * 100);
      if (chip) chip.textContent = isEn() ? ('Verified ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
      if (bar) bar.style.width = pct + '%';

      container.innerHTML = itemsList.map(function (item, idx) {
        var isChecked = !!state.checks[idx];
        return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
          '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
          '<div style="flex:1;">' +
            '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:6px;">' +
              '<span class="check-title">' + escapeHtml(item.title) + '</span>' +
              '<span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
            '</div>' +
            '<p class="check-desc">' + escapeHtml(item.desc) + '</p>' +
          '</div>' +
        '</label>';
      }).join('');
    }

    /* High-DPI Retina Chart Engine */
    var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
    var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

    function getPalette() {
      var cs = getComputedStyle(document.documentElement);
      var isDark = state.theme === 'dark';
      return {
        isDark: isDark,
        grid: cs.getPropertyValue('--chart-grid').trim() || (isDark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)'),
        tick: cs.getPropertyValue('--chart-tick').trim() || '#64748B',
        text: cs.getPropertyValue('--text-primary').trim() || '#0F172A',
        sub: cs.getPropertyValue('--text-secondary').trim() || '#334155',
        pillBg: isDark ? 'rgba(8, 14, 26, 0.90)' : 'rgba(255, 255, 255, 0.96)',
        pillBorder: isDark ? 'rgba(56, 189, 248, 0.30)' : 'rgba(0, 115, 230, 0.24)',
        trackBg: isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(15, 23, 42, 0.06)',
        hoverBand: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(0, 115, 230, 0.05)',
        c1: cs.getPropertyValue('--chart-c1').trim() || '#0073E6',
        c2: cs.getPropertyValue('--chart-c2').trim() || '#16A34A',
        c3: cs.getPropertyValue('--chart-c3').trim() || '#D97706',
        c4: cs.getPropertyValue('--chart-c4').trim() || '#7C3AED'
      };
    }

    function prepareCanvas(id) {
      var canvas = document.getElementById(id);
      if (!canvas || !canvas.parentElement) return null;
      var stage = canvas.parentElement;
      var rect = stage.getBoundingClientRect();
      var w = Math.max(240, Math.floor(rect.width - 16));
      var h = Math.max(170, Math.floor(rect.height - 16));
      var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
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

    function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
      ctx.save();
      ctx.font = '700 10.5px "IBM Plex Mono", system-ui, sans-serif';
      var tw = ctx.measureText(text).width + 9;
      var th = 17;
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

    function drawCh1Chart() {
      var env = prepareCanvas('chartCh1');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartCh1 = [];

      var metaEl = document.getElementById('ch1AxisMeta');
      var leg1 = document.getElementById('ch1Leg1');
      var leg2 = document.getElementById('ch1Leg2');

      if (state.ch1View === 'viewA') {
        if (metaEl) metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 蓝色：FY2025 分业务净营收 ($B)</span><span style="color:var(--chart-c2);">■ 绿色：FY2026 分业务净营收 ($B · 总计 $478.83B)</span>';
        if (leg1) leg1.textContent = 'FY2025 分业务净营收 ($B · 合计 $416.16B)';
        if (leg2) leg2.textContent = 'FY2026 分业务净营收 ($B · 合计 $478.83B)';

        var padA = { top: 28, right: 18, bottom: 42, left: 50 };
        var pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
        var labelsA = ['iPhone', 'Services', 'Mac', 'Wearables', 'iPad'];
        var subA = ['+21.2% YoY', '+13.0% YoY', '+12.5% YoY', '-0.3% YoY', '-0.3% YoY'];
        var fy25 = [209.59, 109.16, 33.71, 35.69, 28.02];
        var fy26 = [254.10, 123.30, 37.93, 35.58, 27.93];
        var maxY = 280.0;

        for (var g = 0; g <= 4; g++) {
          var val = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
          ctx.fillText('$' + val.toFixed(0) + 'B', padA.left - 8, gy);
        }

        var stepA = pwA / labelsA.length;
        var barW = Math.min(38, Math.max(14, stepA * 0.27));
        for (var i = 0; i < labelsA.length; i++) {
          var cx = padA.left + stepA * (i + 0.5);
          if (hoverState.chartCh1 === i) {
            ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padA.left + stepA * i + 4, padA.top, stepA - 8, phA, 8); ctx.fill();
          }
          var y1 = padA.top + phA - (fy25[i] / maxY) * phA;
          var y2 = padA.top + phA - (fy26[i] / maxY) * phA;
          if (state.ch1Series.s1) {
            var h1 = (fy25[i] / maxY) * phA, x1 = state.ch1Series.s2 ? (cx - barW - 3) : (cx - barW / 2);
            ctx.fillStyle = pal.c1; topRoundedBar(ctx, x1, y1, barW, h1, 5); ctx.fill();
          }
          if (state.ch1Series.s2) {
            var h2 = (fy26[i] / maxY) * phA, x2 = state.ch1Series.s1 ? (cx + 3) : (cx - barW / 2);
            ctx.fillStyle = pal.c2; topRoundedBar(ctx, x2, y2, barW, h2, 5); ctx.fill();
            drawValueBadge(ctx, '$' + fy26[i].toFixed(1) + 'B', cx, Math.min(y1, y2) - 12, pal.c2, pal);
          }
          ctx.fillStyle = pal.text; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
          ctx.fillText(labelsA[i], cx, padA.top + phA + 18);
          ctx.fillStyle = subA[i].indexOf('+') === 0 ? pal.c2 : pal.tick; ctx.font = '600 10px "IBM Plex Mono", sans-serif';
          ctx.fillText(subA[i], cx, padA.top + phA + 33);
          hitRegions.chartCh1.push({
            idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 36,
            html: '<strong>' + labelsA[i] + ' 净营收对比</strong><br/>• FY2025：<strong>$' + fy25[i].toFixed(2) + 'B</strong><br/>• FY2026：<strong>$' + fy26[i].toFixed(2) + 'B</strong> (' + subA[i] + ')'
          });
        }
      } else {
        if (metaEl) metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 左轴：全职员工人数 (千人 · 高度克制)</span><span style="color:var(--chart-c2);">● 右轴：人均年创收 ($M/人)</span>';
        if (leg1) leg1.textContent = '全职员工人数 Full-Time Equivalents (左轴 · 千人)';
        if (leg2) leg2.textContent = '人均年创收 Revenue per Employee (右轴 · $M)';

        var padB = { top: 28, right: 54, bottom: 38, left: 48 };
        var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
        var labelsB = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
        var empK = [154.0, 164.0, 161.0, 164.0, 166.0, 167.0];
        var revM = [2.38, 2.40, 2.38, 2.38, 2.51, 2.87];
        var maxEmp = 320.0, minRev = 1.60, maxRev = 3.10;

        for (var j = 0; j <= 4; j++) {
          var r = j / 4, yGrid = padB.top + phB - r * phB;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yGrid); ctx.lineTo(padB.left + pwB, yGrid); ctx.stroke();
          ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
          ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText((maxEmp * r).toFixed(0) + 'k', padB.left - 7, yGrid);
          ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText('$' + (minRev + r * (maxRev - minRev)).toFixed(2) + 'M', padB.left + pwB + 7, yGrid);
        }

        var stepB = pwB / labelsB.length, bWidth = Math.min(38, stepB * 0.44), pts = [];
        for (var k = 0; k < labelsB.length; k++) {
          var centerX = padB.left + stepB * (k + 0.5);
          if (state.ch1Series.s1) {
            var bH = (empK[k] / maxEmp) * phB, bX = centerX - bWidth / 2, bY = padB.top + phB - bH;
            ctx.fillStyle = pal.c1; topRoundedBar(ctx, bX, bY, bWidth, bH, 5); ctx.fill();
            ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
            ctx.fillText(empK[k].toFixed(0) + 'k', centerX, bY + 15);
          }
          var lY = padB.top + phB - ((revM[k] - minRev) / (maxRev - minRev)) * phB;
          pts.push({ x: centerX, y: lY, rev: revM[k] });
          ctx.fillStyle = k === 5 ? pal.text : pal.tick; ctx.font = (k === 5 ? '700 ' : '600 ') + '11.5px system-ui, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(labelsB[k], centerX, padB.top + phB + 22);
          hitRegions.chartCh1.push({
            idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
            html: '<strong>' + labelsB[k] + '</strong><br/>• 全职员工：<strong>' + Math.round(empK[k] * 1000).toLocaleString() + ' 人</strong><br/>• 人均创收：<strong>$' + revM[k].toFixed(2) + 'M</strong>'
          });
        }
        if (state.ch1Series.s2) {
          drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke();
          for (var n = 0; n < pts.length; n++) {
            ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 5.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 3.8, 0, Math.PI * 2); ctx.fill();
            drawValueBadge(ctx, '$' + pts[n].rev.toFixed(2) + 'M', pts[n].x, pts[n].y - 16, pal.c2, pal);
          }
        }
      }
    }

    function drawRadarChart() {
      var env = prepareCanvas('chartRadar');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartRadar = [];

      var axes = isEn() ? ['Stack Synergy', 'Expert Depth', 'Design Focus', 'Discipline', 'Margin & FCF'] : ['跨部门全栈协同', '专家技术话语权', 'SKU极简聚焦度', '供应链与保密纪律', '生态高毛利转化'];
      var pillarAxisMap = [1, 0, 2, 3];
      var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];
      var series = [
        { key: 'aapl', color: pal.c1, fill: 'rgba(0, 115, 230, 0.20)', vals: [9.8, 9.7, 9.6, 9.5, 9.4] },
        { key: 'nvda', color: pal.c2, fill: 'rgba(22, 163, 74, 0.14)', vals: [9.4, 9.8, 8.9, 8.8, 9.7] },
        { key: 'mform', color: pal.c3, fill: 'rgba(217, 119, 6, 0.13)', vals: [5.8, 6.4, 5.2, 7.2, 6.8] }
      ];

      var cx = w / 2, cy = h / 2 + 8;
      var sidePad = w < 420 ? 86 : 108;
      var radius = Math.max(66, Math.min((w - sidePad * 2) / 2, h * 0.36));
      var total = axes.length;

      for (var ring = 2; ring <= 10; ring += 2) {
        var r = (ring / 10) * radius;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1;
        ctx.beginPath();
        for (var i = 0; i < total; i++) {
          var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
          var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      }

      for (var a = 0; a < total; a++) {
        var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
        var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
        var isHi = a === highlightedAxis;
        ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.8 : 1;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();

        var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
        ctx.fillStyle = isHi ? pal.c1 : pal.text;
        ctx.font = (isHi ? '800 ' : '600 ') + '11.5px system-ui, sans-serif'; ctx.textBaseline = 'middle';
        if (Math.abs(Math.cos(angle)) < 0.2) ctx.textAlign = 'center';
        else if (Math.cos(angle) > 0) ctx.textAlign = 'left';
        else ctx.textAlign = 'right';
        ctx.fillText(axes[a], lx, ly);

        hitRegions.chartRadar.push({
          idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
          html: '<strong>' + axes[a] + '</strong><br/>• 苹果 (AAPL)：<strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>• 英伟达 (NVDA)：<strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>• 多事业部巨头：<strong>' + series[2].vals[a].toFixed(1) + '</strong>'
        });
      }

      for (var s = 0; s < series.length; s++) {
        var item = series[s];
        if (!state.radarSeries[item.key]) continue;
        ctx.beginPath();
        for (var idx = 0; idx < total; idx++) {
          var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
          var dist = (item.vals[idx] / 10) * radius;
          var vx = cx + Math.cos(theta) * dist, vy = cy + Math.sin(theta) * dist;
          if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
        }
        ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
      }
    }

    function drawHorizontalBars() {
      var env = prepareCanvas('chartBars');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartBars = [];

      var items = [
        { label: 'Services 服务生态全年毛利率 (FY26)', val: 76.2, cStart: '#34D399', cEnd: '#16A34A', sub: '$93,943M / $123,301M', note: '25亿+活跃设备高粘性闭环驱动，贡献全公司 40.2% 总毛利' },
        { label: 'Apple 全集团全年综合毛利率 (FY26)', val: 48.8, cStart: '#38BDF8', cEnd: '#0073E6', sub: '$233,602M / $478,834M', note: '自研 Apple Silicon 降本增效与服务占比共振，创公司史最高全年毛利率' },
        { label: 'Products 硬件产品全年毛利率 (FY26)', val: 39.3, cStart: '#60A5FA', cEnd: '#2563EB', sub: '$139,659M / $355,533M (+2.5pp)', note: 'iPhone Duo / 18 Pro 与自研芯片协同拉动硬件毛利率扩张' },
        { label: 'Apple 全集团全年营业利润率 (FY26)', val: 33.0, cStart: '#38BDF8', cEnd: '#0284C7', sub: '营业利润 $158,063M (+18.8%)', note: 'SG&A 费率压缩至仅 6.22%，凸显无事业部冗余层级的管理高效率' },
        { label: '全公司工程与研发技术人才占比', val: 41.0, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '~68,000+ 名研发工程师', note: '专家领导专家文化基石：工程技术岗占比近乎商业管理岗 (15%) 的 2.7 倍' },
        { label: '全公司商业与综合管理岗位占比', val: 15.0, cStart: '#FBBF24', cEnd: '#D97706', sub: '极简非行政化组织层级', note: '杜绝冗余事业部中层通才，确保一线专业团队贴近产品决策' }
      ];

      var pad = { top: 8, right: 16, bottom: 24, left: 16 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 85;

      for (var g = 0; g <= 4; g++) {
        var xVal = Math.round((maxX / 4) * g), gx = pad.left + (xVal / maxX) * pw;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif';
        ctx.textAlign = g === 0 ? 'left' : (g === 4 ? 'right' : 'center'); ctx.fillText(xVal + '%', gx, pad.top + ph + 17);
      }

      var rowH = ph / items.length;
      var targetX = pad.left + (45 / maxX) * pw;
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(targetX, pad.top + 4); ctx.lineTo(targetX, pad.top + rowH * 4 - 4); ctx.stroke(); ctx.restore();

      for (var i = 0; i < items.length; i++) {
        var rowTop = pad.top + rowH * i;
        var labelY = rowTop + Math.max(15, rowH * 0.36);
        var barY = rowTop + Math.max(22, rowH * 0.52);
        var barH = Math.min(14, Math.max(10, rowH * 0.24));
        var bw = Math.max(8, (items[i].val / maxX) * pw);

        ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(items[i].label, pad.left, labelY);

        var valStr = items[i].val.toFixed(1) + '%';
        ctx.font = '800 12.5px "IBM Plex Mono", sans-serif';
        ctx.fillStyle = pal.isDark ? items[i].cStart : items[i].cEnd; ctx.textAlign = 'right';
        ctx.fillText(valStr, pad.left + pw, labelY);

        if (w >= 540) {
          var valW = ctx.measureText(valStr).width + 10;
          ctx.font = '500 11px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.tick;
          ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
        }

        ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
        var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
        barGrad.addColorStop(0, items[i].cStart); barGrad.addColorStop(1, items[i].cEnd);
        ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();

        hitRegions.chartBars.push({
          idx: i, x: pad.left, y: rowTop, w: pw, h: rowH,
          html: '<strong>' + items[i].label + '：' + items[i].val.toFixed(1) + '%</strong><br/>• ' + items[i].note
        });
      }
    }

    function drawEpsComboChart() {
      var env = prepareCanvas('chartEps');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartEps = [];

      var years = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
      var subYears = ['(M2起步)', '(全线自研)', '(欧盟税项)', '(+19.5% YoY)', '(历史最高)'];
      var netB = [99.80, 97.00, 93.74, 112.01, 132.18];
      var gmPct = [43.3, 44.1, 46.2, 46.9, 48.8];

      var pad = { top: 26, right: 52, bottom: 42, left: 50 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var minNet = 60.0, maxNet = 175.0, minGm = 39.0, maxGm = 50.5;

      for (var g = 0; g <= 4; g++) {
        var ratio = g / 4, gy = pad.top + ph - ratio * ph;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
        ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('$' + (minNet + ratio * (maxNet - minNet)).toFixed(0) + 'B', pad.left - 7, gy);
        ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minGm + ratio * (maxGm - minGm)).toFixed(1) + '%', pad.left + pw + 7, gy);
      }

      var targetY = pad.top + ph - ((45.0 - minGm) / (maxGm - minGm)) * ph;
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pad.left, targetY); ctx.lineTo(pad.left + pw, targetY); ctx.stroke(); ctx.restore();

      var step = pw / years.length, barW = Math.min(46, Math.max(24, step * 0.42)), linePts = [];
      for (var i = 0; i < years.length; i++) {
        var cx = pad.left + step * (i + 0.5);
        if (state.epsSeries.eps) {
          var bh = ((netB[i] - minNet) / (maxNet - minNet)) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
          ctx.fillStyle = pal.c1; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
          ctx.fillText('$' + netB[i].toFixed(1) + 'B', cx, by + 17);
        }
        var oy = pad.top + ph - ((gmPct[i] - minGm) / (maxGm - minGm)) * ph;
        linePts.push({ x: cx, y: oy, gm: gmPct[i] });
        ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(years[i], cx, pad.top + ph + 18);
        ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif';
        ctx.fillText(subYears[i], cx, pad.top + ph + 32);

        hitRegions.chartEps.push({
          idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
          html: '<strong>' + years[i] + ' ' + subYears[i] + '</strong><br/>• GAAP 净利：<strong>$' + netB[i].toFixed(2) + 'B</strong><br/>• 综合毛利率：<strong>' + gmPct[i].toFixed(1) + '%</strong>'
        });
      }

      if (state.epsSeries.oci) {
        drawSmoothLine(ctx, linePts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke();
        for (var m = 0; m < linePts.length; m++) {
          ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 5.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 3.8, 0, Math.PI * 2); ctx.fill();
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
      var priceRate = state.sim.priceCagr / 100;
      var totalRate = (state.sim.priceCagr + (state.sim.drip ? 2.2 : 0)) / 100;
      var totalSeries = [], priceOnlySeries = [];
      for (var y = 0; y <= yrs; y++) {
        totalSeries.push(p * Math.pow(1 + totalRate, y));
        priceOnlySeries.push(p * Math.pow(1 + priceRate, y));
      }

      var maxVal = Math.max(totalSeries[yrs], priceOnlySeries[yrs], p * 1.2) * 1.08;
      var pad = { top: 18, right: 18, bottom: 26, left: 58 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      for (var g = 0; g <= 3; g++) {
        var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        var labelStr = v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k');
        ctx.fillText(labelStr, pad.left - 7, gy);
      }

      var stepX = pw / yrs;
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (var i = 0; i <= yrs; i++) {
        var px = pad.left + stepX * i, py = pad.top + ph - (priceOnlySeries[i] / maxVal) * ph;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.restore();

      var totalPts = [];
      for (var k = 0; k <= yrs; k++) totalPts.push({ x: pad.left + stepX * k, y: pad.top + ph - (totalSeries[k] / maxVal) * ph });

      ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
      for (var m = 0; m < totalPts.length; m++) {
        if (m === 0) ctx.moveTo(totalPts[m].x, totalPts[m].y); else ctx.lineTo(totalPts[m].x, totalPts[m].y);
      }
      ctx.stroke();

      for (var t = 0; t <= yrs; t++) {
        var tx = totalPts[t].x;
        if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) {
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
          ctx.fillText('Y' + t, tx, pad.top + ph + 17);
        }
        hitRegions.chartSim.push({
          idx: t, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22,
          html: '<strong>第 ' + t + ' 年资产</strong><br/>• 含回购与分红：<strong>' + formatCurrency(totalSeries[t]) + '</strong><br/>• 纯内生基准：<strong>' + formatCurrency(priceOnlySeries[t]) + '</strong>'
        });
      }
    }

    function renderAllCharts() {
      drawCh1Chart();
      drawRadarChart();
      drawHorizontalBars();
      drawEpsComboChart();
      drawSimChart();
    }

    function wireCanvasTooltip(canvasId) {
      var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
      if (!canvas || !tip) return;
      canvas.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left - 8, y = e.clientY - rect.top - 8;
        var regions = hitRegions[canvasId] || [], matched = null;
        for (var i = 0; i < regions.length; i++) {
          var r = regions[i];
          if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
        }
        if (matched) {
          tip.innerHTML = matched.html;
          tip.style.display = 'block';
          tip.style.left = Math.min(window.innerWidth - 290, Math.max(12, e.clientX + 14)) + 'px';
          tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
        } else {
          tip.style.display = 'none';
        }
      });
      canvas.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
    }

    function exportStandaloneHtml() {
      var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
      var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'Apple_Corporate_Culture_Analysis.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast('已导出独立网页 Apple_Corporate_Culture_Analysis.html');
    }

    function init() {
      var rawTheme = safeGetStorage(STORAGE_THEME_KEY);
      var savedTheme = rawTheme ? String(rawTheme).replace(/^"|"$/g, '') : '';
      if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;

      var rawLang = safeGetStorage(STORAGE_LANG_KEY);
      var savedLang = rawLang ? String(rawLang).replace(/^"|"$/g, '') : '';
      if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;

      var savedChecks = safeGetStorage(STORAGE_CHECK_KEY);
      if (savedChecks) {
        try {
          var parsed = JSON.parse(savedChecks);
          if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) state.checks = parsed.map(Boolean);
        } catch (e) {}
      }

      applyTheme(state.theme, true);
      applyLanguage(state.lang, true);

      document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
      document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
      document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
      document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
      document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
      document.getElementById('sideExportBtn')?.addEventListener('click', exportStandaloneHtml);
      document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

      window.addEventListener('storage', function (ev) {
        if (ev.key === STORAGE_THEME_KEY && ev.newValue) {
          var nt = String(ev.newValue).replace(/^"|"$/g, '');
          if ((nt === 'light' || nt === 'dark') && nt !== state.theme) applyTheme(nt, true);
        } else if (ev.key === STORAGE_LANG_KEY && ev.newValue) {
          var nl = String(ev.newValue).replace(/^"|"$/g, '');
          if ((nl === 'zh' || nl === 'en') && nl !== state.lang) applyLanguage(nl, true);
        }
      });

      var jumpInput = document.getElementById('quickJumpInput');
      var jumpPop = document.getElementById('quickJumpPopover');
      function renderJumpList(q) {
        var kw = (q || '').trim().toLowerCase();
        var activeJump = isEn() ? QUICK_JUMP_EN : QUICK_JUMP_INDEX;
        var list = activeJump.filter(function (item, idx) {
          var zhIt = QUICK_JUMP_INDEX[idx] || item;
          return !kw || (zhIt.title + ' ' + zhIt.sub + ' ' + item.title + ' ' + item.sub).toLowerCase().indexOf(kw) !== -1;
        });
        jumpPop.innerHTML = list.map(function (item) {
          return '<button type="button" class="quick-jump-item" data-jump-sec="' + item.sec + '"><span class="quick-jump-item-title">' + escapeHtml(item.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(item.sub) + '</span></button>';
        }).join('');
        jumpPop.classList.toggle('open', list.length > 0);
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
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open');
      });
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
      });

      var ch1Btns = document.querySelectorAll('[data-ch1-view]');
      for (var c = 0; c < ch1Btns.length; c++) {
        ch1Btns[c].addEventListener('click', function () {
          state.ch1View = this.getAttribute('data-ch1-view');
          document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
          document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
          syncCh1HeaderText();
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
          if (!state.radarSeries.aapl && !state.radarSeries.nvda && !state.radarSeries.mform) state.radarSeries[key] = true;
          this.classList.toggle('muted', !state.radarSeries[key]);
          drawRadarChart();
        });
      }

      document.getElementById('peerSearchInput').addEventListener('input', function () {
        state.peerQuery = this.value;
        renderPeerTable();
      });
      var peerFilterBtns = document.querySelectorAll('[data-peer-filter]');
      for (var pf = 0; pf < peerFilterBtns.length; pf++) {
        peerFilterBtns[pf].addEventListener('click', function () {
          state.peerFilter = this.getAttribute('data-peer-filter');
          for (var x = 0; x < peerFilterBtns.length; x++) peerFilterBtns[x].classList.toggle('active', peerFilterBtns[x] === this);
          renderPeerTable();
        });
      }

      var pSlider = document.getElementById('simPrincipalSlider');
      var ySlider = document.getElementById('simYearsSlider');
      var cSlider = document.getElementById('simCagrSlider');
      var dToggle = document.getElementById('simDripToggle');
      pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
      ySlider.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 15; state.sim.preset = ''; updateSimulatorUI(); });
      cSlider.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
      dToggle.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });

      var presetBtns = document.querySelectorAll('[data-preset]');
      for (var pb = 0; pb < presetBtns.length; pb++) {
        presetBtns[pb].addEventListener('click', function () {
          var key = this.getAttribute('data-preset');
          var cfg = PRESETS[key];
          if (!cfg) return;
          state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = key;
          pSlider.value = String(cfg.principal); ySlider.value = String(cfg.years); cSlider.value = String(cfg.priceCagr); dToggle.checked = cfg.drip;
          updateSimulatorUI();
        });
      }

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
        showToast('已勾选全部 6 项苹果企业文化核查指标');
      });
      document.getElementById('resetCheckBtn').addEventListener('click', function () {
        state.checks = [true, true, true, false, false, false];
        safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
        renderChecklist();
        showToast('核查清单已恢复默认基准状态 (50%)');
      });

      var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
      window.addEventListener('scroll', function () {
        var docEl = document.documentElement;
        var maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
        document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxScroll) * 100) + '%';
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        var secObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.id;
              for (var i = 0; i < tocLinks.length; i++) tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === id);
            }
          });
        }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
        for (var s = 0; s <= 7; s++) {
          var secNode = document.getElementById('sec-0' + s);
          if (secNode) secObserver.observe(secNode);
        }
      }

      ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);

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
      function scheduleRedraw() { clearTimeout(resizeTimer); resizeTimer = setTimeout(renderAllCharts, 60); }
      window.addEventListener('resize', scheduleRedraw);
      if ('ResizeObserver' in window) {
        var mainEl = document.querySelector('.main-content');
        if (mainEl) new ResizeObserver(scheduleRedraw).observe(mainEl);
      }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();
  