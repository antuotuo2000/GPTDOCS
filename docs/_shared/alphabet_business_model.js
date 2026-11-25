
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_STRESS_KEY = 'googl_bm_stress_v1';

      var state = {
        theme: 'dark',
        lang: 'zh',
        lensIdx: 0,
        nodeIdx: 0,
        cohortKey: 'prosumer',
        pView: 'waterfall',
        cView: 'ltv',
        kView: 'capex'
      };

      var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

      function showToast(msg) {
        var bar = document.getElementById('muiSnackbar');
        if (!bar) return;
        bar.textContent = msg;
        bar.classList.add('show');
        clearTimeout(bar._t);
        bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2200);
      }

      function getPalette() {
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
          dark: dark,
          text: dark ? '#F3F6F9' : '#0F1924',
          sub: dark ? '#B2BAC2' : '#334155',
          tick: dark ? '#94A3B8' : '#475569',
          grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
          blue: dark ? '#3399FF' : '#0073E6',
          blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.16)',
          green: dark ? '#22C55E' : '#16A34A',
          amber: dark ? '#FFB74D' : '#D97706',
          violet: dark ? '#A78BFA' : '#7C3AED',
          red: dark ? '#FF6B6B' : '#DC2626'
        };
      }

      var HERO_LEAD = {
        zh: '如果说苹果是“向消费者卖高溢价硬件门票、再收生态过路费”，谷歌（Alphabet Inc.）则代表人类商业史上另一极终极范式——<strong>对全球数十亿消费者完全免费提供数字水电煤，向全球数千万商户与企业征收“商业意图税”与“AI算力税”</strong>。第一重引擎依托 Search、Chrome（68.8% 份额）、Android（30亿+ 终端）、YouTube、Maps、Gmail 与 Google Play 构建起全球<strong>91.1% 搜索份额</strong>，在 FY2025 首破 <strong>$4,028.4亿总营收</strong>（其中广告 <strong>$2,946.9亿</strong>，扣除 20.3% 流量获取成本 TAC 后净享近 80% 广告留存） <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/googexhibit991q42025.htm" target="_blank" rel="noopener noreferrer">FY25 8-K ↗</a> <a class="cite-link" href="https://sqmagazine.co.uk/google-ads-statistics/" target="_blank" rel="noopener noreferrer">SQ Ads 统计 ↗</a>；第二重引擎在 2026 年迎来历史性奇点：<strong>Google Cloud 单季营收翻倍暴增 +103% 至 $307.1亿（年化超 $1,228亿，营业利润率跃升至 36.2%，在手积压订单 RPO 高达 $5,608亿）</strong>，推动 Q3 2026 集团单季营收达 <strong>$1,275.8亿（+25% YoY，年化破 $5,100亿）</strong> <a class="cite-link" href="https://www.nextgcomm.com/financials-google-q3-earnings-results-2026-analysis/" target="_blank" rel="noopener noreferrer">Q3\'26 10-Q 拆解 ↗</a>；第三重引擎则将每年超 $1,796亿 经营现金流加上千亿级多元债权/股权融资（含伯克希尔 $100亿 定向入股），饱和注入 <strong>2026 全年 $1,950亿–$2,050亿 AI 算力基建与自研 TPU 8t/8i 系统</strong>，构筑全栈不可复制的重资本算力壁垒 <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2026/" target="_blank" rel="noopener noreferrer">CEO Q3 致辞 ↗</a>。',
        en: 'Whereas Apple sells luxury hardware tickets to fund a digital tollbooth, <strong>Alphabet Inc. (NASDAQ: GOOGL)</strong> embodies the opposite apex archetype: <strong>providing free digital utilities to billions of consumers while taxing global commercial intent and enterprise AI compute</strong>. Engine 1 spans Search, Chrome (68.8% share), Android (3B+ devices), YouTube, Maps, Gmail, and Play—commanding <strong>91.1% global search share</strong> and driving FY2025 revenue past <strong>$402.84B</strong> ($294.69B in ads, retaining ~80% net of 20.3% TAC) <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/googexhibit991q42025.htm" target="_blank" rel="noopener noreferrer">FY25 8-K ↗</a> <a class="cite-link" href="https://sqmagazine.co.uk/google-ads-statistics/" target="_blank" rel="noopener noreferrer">SQ Ads Stats ↗</a>. Engine 2 hit a historic inflection in Q3 2026: <strong>Google Cloud surged +103% YoY to $30.71B ($122.8B+ run rate, 36.2% operating margin, $560.8B backlog)</strong>, lifting Q3 consolidated revenue +25% YoY to <strong>$127.58B (&gt;$510B run rate)</strong> <a class="cite-link" href="https://www.nextgcomm.com/financials-google-q3-earnings-results-2026-analysis/" target="_blank" rel="noopener noreferrer">Q3\'26 10-Q Brief ↗</a>. Engine 3 redeploys $179.6B TTM operating cash flow plus multi-currency debt &amp; Berkshire\'s $10B equity placement into <strong>$195B–$205B of 2026 AI CapEx and custom TPU 8t/8i systems</strong> <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2026/" target="_blank" rel="noopener noreferrer">CEO Q3 Remarks ↗</a>.'
      };

      var LENSES = [
        {
          zhF: '广告净毛利池 = [全球查询量 × 商业意图率 × 付费点击率 × 实时竞价 CPC ($5.42均值)] × (1 - 20.0% TAC 渠道分成)',
          enF: 'Net Ad Profit Pool = [Global Queries × Commercial Intent × Paid CTR × Auction CPC ($5.42 avg)] × (1 - 20.0% TAC)',
          zhB: '不同于社交平台靠“打断用户刷视频”推送展示广告，谷歌搜索与 AI Mode 捕捉的是用户<strong>主动表达购买或决策意图的黄金一秒</strong>（平均转化率高达 8.18%）。广义第二价格与 AI Max 拍卖机制让全球广告主自动相互竞价，把商户的超额利润精准转化为 Google Services 高达 <strong>40.7% 的分部营业利润率</strong>。',
          enB: 'Unlike social feeds that interrupt passive scrolling, Google Search and AI Mode capture the <strong>exact second a user declares commercial intent</strong> (8.18% average conversion rate). Real-time second-price and AI Max auctions pit millions of advertisers against each other, converting merchant surplus into a <strong>40.7% Google Services operating margin</strong>.'
        },
        {
          zhF: '企业云与算力飞轮 = $560.8B 合同积压 × [Gemini Enterprise 席位扩张 + 自研 TPU 8t/8i 系统外售] → 36.2% 营业利润率',
          enF: 'Cloud & Silicon Flywheel = $560.8B RPO × [Gemini Enterprise Seats + External TPU 8t/8i Systems] → 36.2% Op Margin',
          zhB: '过去市场曾质疑云计算是低毛利苦生意，但 Q3 2026 Google Cloud 以 <strong>$307.1亿单季营收（+103% YoY）与 $111亿营业利润（利润率较去年同期暴增 12.5 个百分点至 36.2%）</strong>彻底证伪：自研 TPU 规避了昂贵的“英伟达税”，并开始作为整机柜系统向 Anthropic、Apple、Oracle 等百余家客户直接创收。',
          enB: 'Google Cloud shattered low-margin cloud skepticism in Q3 2026, doubling revenue <strong>+103% YoY to $30.71B with $11.1B in operating income (margin up +1,250 bps YoY to 36.2%)</strong>. Custom TPUs bypass external GPU markups while generating direct system-sale revenue across 100+ customers including Anthropic and Apple.'
        },
        {
          zhF: '跨周期现金流转换：短期自由现金流承压 (2026E CapEx ~$200B) → 锁定 40年数据中心电力与 $567.7B 确定性订单回款',
          enF: 'Intertemporal Arbitrage: Near-Term FCF Compression (~$200B CapEx) → Locks 40-Yr Power/Sites & $567.7B Contracted Backlog',
          zhB: '与苹果“把端侧芯片成本转嫁给购机消费者”相反，谷歌选择亲自扛下 <strong>$1,950–$2,050亿 年度 AI 基建洪峰</strong>（65% 为直接创收服务器、35% 为 40年寿命数据中心与核聚变/绿电资产）。短期 FCF 虽被压缩，却筑起初创公司永远无法跨越的物理算力与能源高墙。',
          enB: 'In stark contrast to Apple\'s asset-light device model, Alphabet is front-loading <strong>$195B–$205B in 2026 CapEx</strong> (65% 6-yr servers/TPUs, 35% 40-yr data centers &amp; Intersect power assets)—trading temporary FCF compression for an unassailable compute moat.'
        }
      ];

      var NODES = [
        {
          badge: 'NODE 01 · SEVEN 2B+ USER PORTALS & DISTRIBUTION LOCK',
          zhT: '自有系统（Chrome + Android）与付费默认入口（Safari TAC）双保险锁死全球流量',
          enT: 'Owned OS/Browser (Android + Chrome) + Paid Safari Default (TAC) Lock Global Traffic',
          zhD: '谷歌的底层商业智慧是用开源 Android（覆盖超 30 亿活跃设备）和免费 Chrome 浏览器（全球 68.8% 份额）把超过三分之二的互联网请求保留在免过路费的自有管道内；对剩余最赚钱的 iOS 高净值人群，则通过每年向苹果及 OEM 支付约 $599 亿流量获取成本（TAC）租下默认搜索框。随自有入口与直连 Gemini App（月活破 10 亿）占比提升，Q3 2026 综合 TAC 率已稳步压降至 20.0%。',
          enD: 'Google keeps over two-thirds of web traffic inside zero-TAC owned funnels via Android (3B+ active devices) and Chrome (68.8% browser share), while paying ~$59.9B/yr in Traffic Acquisition Costs (TAC) to secure default placement on iOS Safari and OEMs. Direct Gemini App habits (1B+ MAU) helped trim Q3 2026 TAC rate to 20.0%.',
          zhF: '商业传导：Chrome/Android 自有零分成入口 + 非排他默认分发协议 → 守住全球 91.1% 搜索份额并将综合 TAC 率控制在 20.0%',
          enF: 'Flow: Owned Chrome/Android funnels + default placements → 91.1% global search share at a controlled 20.0% TAC rate',
          kpis: [['91.1%', '全球搜索引擎份额', 'Global Search Share'], ['20.0%', 'Q3 2026 综合 TAC 率', 'Q3 2026 TAC Rate'], ['7 款', '20亿+月活免费超级入口', '2B+ MAU Products'], ['10亿+', 'Gemini App 月活跃用户', 'Gemini App MAUs']]
        },
        {
          badge: 'NODE 02 · MILLISECOND INTENT AUCTION & AI MAX',
          zhT: 'AI Overviews + AI Mode 扩容查询边界：量升价稳的实时竞价印钞机',
          enT: 'AI Overviews & AI Mode Expand Query Volume: Real-Time Intent Auction Engine',
          zhD: '面对生成式 AI 冲击，谷歌将 Gemini 直接嵌入搜索顶部（AI Overviews 覆盖超 25 亿用户）并推出多模态 AI Mode（查询长度增至 3 倍，每月超 500 亿次视觉搜索），推动 Q3 2026 总查询量创五年最快增速。广告侧通过 AI Max 与 Performance Max 自动生成 15 亿+ 创意素材，实现付费点击量同比增长 +8%~+13%，单季搜索收入达 $633.5亿。',
          enD: 'Embedding Gemini into Search (2.5B+ AI Overviews users; 50B+ monthly visual searches; 3x longer AI Mode prompts) drove the fastest query growth in five years in Q3 2026. AI Max generated 1.5B+ ad assets, lifting paid clicks +8% YoY and Search revenue to $63.35B/quarter.',
          zhF: '商业传导：多模态 AI 激发增量长尾商业提问 → AI Max 精准匹配转化 (均值 8.18%) → FY25 搜索净入 $2,245.3亿',
          enF: 'Flow: Multimodal AI expands upper-funnel queries → AI Max 8.18% conversion → $63.35B Q3 Search revenue (+12% YoY)',
          kpis: [['$63.35B', 'Q3 2026 搜索及其他营收', 'Q3 Search Revenue'], ['+8% / +4%', 'Q3 付费点击 / CPC 增速', 'Paid Clicks / CPC YoY'], ['8.18%', '搜索广告跨行业平均转化率', 'Avg Search Conv. Rate'], ['50B+/月', 'Google Lens 视觉多模态搜索', 'Monthly Visual Searches']]
        },
        {
          badge: 'NODE 03 · YOUTUBE LIVING-ROOM & SUBSCRIPTION FLYWHEEL',
          zhT: 'YouTube 双引擎飞轮：零内容赌博风险的流媒体之王（年营收破 $600亿）',
          enT: 'YouTube Dual Engine: Zero-Content-Risk Streaming Leader (>$60B Annual Run Rate)',
          zhD: '不同于奈飞和迪士尼每年斥资百亿赌自制剧爆款，YouTube 依靠与全球 300 万+ 创作者共享 55% 广告分成，每天自动获得超 2,000 万条新增视频。如今 YouTube 稳坐美国电视大屏流媒体时长冠军（客厅大屏贡献超 1/3 广告额），同时 YouTube Music & Premium 突破 1.5 亿订户，叠加 Amazon 视频带货联盟，形成“广告+订阅+电商”三栖印钞机。',
          enD: 'Unlike Netflix\'s upfront studio slate risk, YouTube shares 55% of ad revenue with 3M+ creators to fuel 20M+ daily video uploads. Now #1 in U.S. TV streaming watch time (>1/3 of YouTube ad dollars from connected TVs) with 150M+ Music & Premium subscribers, YouTube surpasses $60B/yr.',
          zhF: '商业传导：55% 创作者分成驱动日均 2,000万条上传 → 霸占客厅电视第一时长 → 广告 ($404亿) + 订阅破 $600亿/年',
          enF: 'Flow: 55% creator rev-share → #1 U.S. TV watch time → >$60B combined annual YouTube Ads + Subscriptions',
          kpis: [['>$60B', 'YouTube 广告+订阅年总营收', 'YouTube Annual Total'], ['150M+', 'YouTube Music & Premium 订户', 'YT Premium Subscribers'], ['350M+', 'Google 全系消费付费订阅数', 'Total Consumer Subs'], ['#1 时长', '全美客厅流媒体电视收视份额', 'U.S. Streaming TV Rank']]
        },
        {
          badge: 'NODE 04 · GOOGLE CLOUD, WIZ CYBER & TPU SYSTEM SALES',
          zhT: 'Google Cloud 狂飙 +103%：从追赶者蜕变为“模型+安全+自研TPU整机”全栈赢家',
          enT: 'Google Cloud Doubles (+103% YoY): Full-Stack Models + Wiz Cyber + External TPU Systems',
          zhD: 'Thomas Kurian 统领的 Google Cloud 在 Q3 2026 实现单季营收 $307.1亿（同比翻倍 +103%）、营业利润 $111亿（利润率 36.2%）。三大胜负手合龙：(1) Gemini 4 Carbon 领跑企业 Agent，已售出超 1 亿知识工作席位；(2) 2026 年 3 月以 $295亿 净现金完成收购云安全龙头 Wiz；(3) 自研 TPU 8t/8i 不仅内用，更作为整机系统向 Anthropic、Apple、Oracle 等百余家客户直接出售。',
          enD: 'Google Cloud hit $30.71B in Q3 2026 (+103% YoY) with $11.1B operating profit (36.2% margin), powered by 100M+ AI seats sold, the $29.5B Wiz cloud-security acquisition (closed Mar 2026), and direct TPU 8t/8i system sales to 100+ customers including Anthropic and Apple.',
          zhF: '商业传导：$5,608亿 云积压订单 + TPU 系统级交付 + Wiz 多云安全 → 贡献集团 Q3 达 62% 的净增营收',
          enF: 'Flow: $560.8B Cloud RPO + TPU system deliveries + Wiz cyber → 62% of Alphabet\'s Q3 incremental revenue',
          kpis: [['$30.71B', 'Q3 2026 Cloud 营收 (+103%)', 'Q3 Cloud Revenue'], ['36.2%', 'Q3 Cloud 分部营业利润率', 'Q3 Cloud Op Margin'], ['$560.8B', 'Google Cloud 剩余履约积压订单', 'Cloud Backlog (RPO)'], ['$29.5B', '2026.03 完成收购 Wiz 净对价', 'Wiz Net Cash Deal']]
        },
        {
          badge: 'NODE 05 · HEAVY AI CAPEX, CAPITAL ALLOCATION & PHYSICAL AI BETS',
          zhT: '万亿资产负债表重配：以短期负自由现金流换取未来十年算力与无人驾驶垄断',
          enT: '$1T Balance Sheet Pivot: Deploying $200B CapEx & Scaling Waymo Physical AI',
          zhD: '截至 2026Q3 末，Alphabet 总资产突破 $1.003万亿，手握 $2,651亿 现金及有价证券（含 $752亿 SpaceX 股权），并在 2026 年通过多币种债券（$808亿）、普通股与可转优先股及伯克希尔 $100亿 私募构筑超级资金池，全力支撑全年 $1,950–$2,050亿 CapEx 及 $59亿 收购绿电开发商 Intersect；同时 Waymo 累积超 3 亿全无人驾驶英里，在 15 座美国大城开启商业化规模扩张。',
          enD: 'Crossing $1.003T in total assets with $265.1B in cash & marketable securities (including $75.2B in SpaceX) plus $10B from Berkshire Hathaway, Alphabet is funding $195–$205B in 2026 AI CapEx, the $5.9B Intersect clean-power acquisition, and Waymo\'s 300M+ autonomous miles across 15 U.S. cities.',
          zhF: '商业传导：$1,796亿 TTM 经营现金流 + 战略融资 → 饱和锁定数据中心电力与 TPU 库存 → 2027–2029 算力收获期释放',
          enF: 'Flow: $179.6B TTM OCF + strategic capital → locks power, sites & TPU inventory → 2027–2029 monetization ramp',
          kpis: [['$1.003T', '2026Q3 末集团总资产规模', 'Total Assets (Sep 2026)'], ['$195–205B', '2026 全年资本开支官方指引', '2026 CapEx Guidance'], ['300M+ 英里', 'Waymo 全无人驾驶累计里程', 'Waymo Autonomous Miles'], ['$0.22/股', '季度普通股现金分红持续派发', 'Quarterly Cash Dividend']]
        }
      ];

      var COHORTS = {
        free: {
          zhS: [
            ['典型产品组合', 'Chrome + Search + 免费 YouTube', '零付费门槛，由广告主买单'],
            ['年均流失率', '~6.5%', 'AI 聊天工具存在局部问答分流'],
            ['年度广告净 ARPU', '~$84 / 年 (全球均值)', '北美地区单用户超 $260/年'],
            ['5年累计净毛利 LTV', '$420', '边际服务器履约成本极低']
          ],
          enS: [
            ['Product Bundle', 'Chrome + Search + Free YouTube', 'Zero user fee; merchant-funded'],
            ['Annual Churn', '~6.5%', 'Partial query competition from AI chatbots'],
            ['Annual Net Ad ARPU', '~$84 / yr (Global Avg)', '>$260/yr in North America'],
            ['5Y Cumulative Profit LTV', '$420', 'Near-zero marginal serving cost']
          ],
          zhN: '<strong>大众免费流量底座：</strong>超过 40 亿全球互联网用户无需花一分钱即可享用搜索、地图导航与海量视频，其每一次商业点击都在实时竞价池中变现，构成谷歌每年近 $3,000亿 广告现金牛的广阔分母。',
          enN: '<strong>Global Free Attention Funnel:</strong> Over 4B users access Search, Maps, and YouTube for free, generating nearly $300B/yr in high-margin auction ad revenue.'
        },
        prosumer: {
          zhS: [
            ['典型产品组合', 'Search + YouTube Premium + Google One AI Pro', '照片库 9万亿+ 资产与 Gmail 深度锁死'],
            ['年均生态流失率', '~3.5%', '邮箱身份与云端相册迁移摩擦极高'],
            ['年度综合 ARPU (广告+订阅)', '$420 / 年', '$19.99/月 AI Pro + 搜索广告净变现'],
            ['5年累计单客净毛利 LTV', '$1,520', '约为纯免费广告用户的 3.6 倍']
          ],
          enS: [
            ['Product Bundle', 'Search + YT Premium + Google One AI Pro', '9T+ Photos & Gmail identity lock-in'],
            ['Annual Churn', '~3.5%', 'High switching friction on cloud storage'],
            ['Annual Blended ARPU', '$420 / yr', '$19.99/mo AI Pro + net Search ad value'],
            ['5Y Cumulative Profit LTV', '$1,520', '3.6x LTV vs. ad-only free user']
          ],
          zhN: '<strong>数据与工作流复利锁死（Data Gravity Lock-In）：</strong>个人用户在 Google Photos 沉淀逾十年家庭影像、以 Gmail 作为全网数字通行证；而在 B 端，Q3 2026 财报披露<strong>早期采用 Gemini Enterprise 的企业客户一年内云支出翻了 4 倍以上</strong>，BigQuery 数据湖 + Wiz 安全底座使跨云迁移成本高不可攀。',
          enN: '<strong>Data Gravity Lock-In:</strong> Consumers store decades of memories in Google Photos (150M+ Google One &amp; 150M+ YT Premium subs), while early enterprise Gemini adopters more than quadrupled annual spend.'
        },
        enterprise: {
          zhS: [
            ['典型企业栈组合', 'GCP + BigQuery + Gemini Enterprise + Wiz + TPU', '覆盖近 90% 财富 100 强企业'],
            ['净金额留存与扩张率', '> 140% NRR (AI客户 >4x)', 'Q3 25 采纳 Gemini 客户次年支出翻4倍+'],
            ['大客户年均合同额 (ACV)', '$12M – $250M+ / 年', '2,600+ 家客户年消耗超 1,000亿 Tokens'],
            ['积压合同履约可见度', '$560.8B 总 RPO', '>55% 将在未来 24 个月内确认为营收']
          ],
          enS: [
            ['Enterprise Stack', 'GCP + BigQuery + Gemini + Wiz + TPU', '~90% of Fortune 100 on Gemini Enterprise'],
            ['Net Dollar Expansion', '> 140% NRR (AI >4x)', 'Q3\'25 Gemini cohort quadrupled spend YoY'],
            ['Enterprise ACV Range', '$12M – $250M+ / yr', '2,600+ customers using 100B+ tokens'],
            ['Contracted Visibility', '$560.8B Cloud RPO', '>55% recognized within 24 months']
          ],
          zhN: '<strong>企业级全栈算力飞轮：</strong>一旦跨国银行（如法国巴黎银行 6.5 万席位）或电信巨头（德国电信 40+ 核心系统上云）将数据仓库迁入 BigQuery 并部署 Wiz 多云安全与 Gemini Agent，Google Cloud 便成为其不可卸载的企业级数字大脑。',
          enN: '<strong>Enterprise AI Compounding:</strong> Once Fortune 500 enterprises unify petabyte lakes on BigQuery, secure multi-cloud workloads via Wiz, and deploy Gemini Agents, Cloud becomes sticky mission-critical infrastructure.'
        }
      };

      function renderLens() {
        var l = LENSES[state.lensIdx] || LENSES[0];
        document.getElementById('lensFormula').textContent = state.lang === 'en' ? l.enF : l.zhF;
        document.getElementById('lensBody').innerHTML = state.lang === 'en' ? l.enB : l.zhB;
      }

      function renderNode() {
        var nd = NODES[state.nodeIdx] || NODES[0];
        document.getElementById('nodeBadge').textContent = nd.badge;
        document.getElementById('nodeTitle').textContent = state.lang === 'en' ? nd.enT : nd.zhT;
        document.getElementById('nodeDesc').textContent = state.lang === 'en' ? nd.enD : nd.zhD;
        document.getElementById('nodeFormula').textContent = state.lang === 'en' ? nd.enF : nd.zhF;
        document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
          return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + (state.lang === 'en' ? k[2] : k[1]) + '</span></div>';
        }).join('');
      }

      function renderCohort() {
        var c = COHORTS[state.cohortKey] || COHORTS.prosumer;
        var arr = state.lang === 'en' ? c.enS : c.zhS;
        document.getElementById('cohortMetrics').innerHTML = arr.map(function (s, idx) {
          var isMono = idx > 0 ? ' mono' : '';
          var fz = idx === 0 ? ' style="font-size:0.90rem;"' : '';
          return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
        }).join('');
        document.getElementById('cohortNote').innerHTML = state.lang === 'en' ? c.enN : c.zhN;
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
        if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
        if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
        drawAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式');
      }

      function applyLang(lang, silent) {
        state.lang = (lang === 'en') ? 'en' : 'zh';
        document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
        var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
        if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
        if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
        var lead = document.getElementById('heroLeadText');
        if (lead) lead.innerHTML = HERO_LEAD[state.lang];
        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
          if (val !== null) {
            if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
            else nodes[i].textContent = val;
          }
        }
        renderLens();
        renderNode();
        renderCohort();
        drawAllCharts();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      // Event Wiring
      document.getElementById('lensTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-lens]');
        if (!b) return;
        state.lensIdx = parseInt(b.getAttribute('data-lens'), 10) || 0;
        var all = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
        renderLens();
      });

      document.getElementById('pipelineTrack').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-node]');
        if (!btn) return;
        state.nodeIdx = parseInt(btn.getAttribute('data-node'), 10) || 0;
        var bs = this.querySelectorAll('.bm-node-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
        renderNode();
      });

      document.getElementById('tierFilter').addEventListener('click', function (e) {
        var b = e.target.closest('[data-tcat]');
        if (!b) return;
        var cat = b.getAttribute('data-tcat');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var cards = document.querySelectorAll('#tierList [data-tier]');
        for (var j = 0; j < cards.length; j++) {
          cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
        }
      });

      document.getElementById('cohortTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-cohort]');
        if (!b) return;
        state.cohortKey = b.getAttribute('data-cohort');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        renderCohort();
      });

      document.getElementById('peerFilter').addEventListener('click', function (e) {
        var b = e.target.closest('[data-pcat]');
        if (!b) return;
        var cat = b.getAttribute('data-pcat');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var rows = document.querySelectorAll('#peerTable tbody tr');
        for (var j = 0; j < rows.length; j++) {
          var rc = rows[j].getAttribute('data-row-cat') || '';
          rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
        }
      });

      // Sidebar Suite Hub Filter & Toast
      var hub = document.getElementById('companySubfolderHub');
      if (hub) {
        hub.addEventListener('click', function (e) {
          var pill = e.target.closest('[data-co-cat]');
          if (pill) {
            var cat = pill.getAttribute('data-co-cat');
            var ps = hub.querySelectorAll('[data-co-cat]');
            for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === pill);
            var its = hub.querySelectorAll('[data-co-item-cat]');
            for (var j = 0; j < its.length; j++) {
              its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
            }
            return;
          }
          var item = e.target.closest('.co-hub-item');
          if (item) {
            var jp = item.getAttribute('data-suite-jump');
            var ts = item.getAttribute('data-suite-toast');
            if (jp) {
              var el = document.querySelector(jp);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (ts) {
              showToast(ts);
            }
          }
        });
      }

      // High-DPI Retina Canvas Engine
      function prepCanvas(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(260, rect.width || 500);
        var h = Math.max(140, rect.height || 280);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        var ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { c: c, ctx: ctx, w: w, h: h };
      }

      function roundRect(ctx, x, y, w, h, r) {
        var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
        ctx.beginPath();
        ctx.moveTo(x + rr, y);
        ctx.arcTo(x + w, y, x + w, y + h, rr);
        ctx.arcTo(x + w, y + h, x, y + h, rr);
        ctx.arcTo(x, y + h, x, y, rr);
        ctx.arcTo(x, y, x + w, y, rr);
        ctx.closePath();
      }

      function drawProfitCanvas() {
        var env = prepCanvas('profitCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.profitCanvas = [];
        var pad = { top: 28, right: 20, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.pView === 'waterfall') {
          var en = state.lang === 'en';
          var steps = [
            { lbl: en ? 'Services' : 'Services营收', val: 376.3, base: 0, col: pal.blue, tip: 'TTM Q3\'26 Google Services 营收: $376.3B (搜索、YouTube、Android/Play 与消费订阅)' },
            { lbl: en ? '+Cloud' : '+Cloud营收', val: 93.2, base: 376.3, col: pal.green, tip: 'TTM Q3\'26 Google Cloud 营收: +$93.2B (Q3单季年化已达 $122.8B)，推升 TTM 总营收至 $471.1B' },
            { lbl: en ? 'Gross Prof' : '=综合毛利', val: 281.2, base: 0, col: pal.violet, tip: 'TTM 综合毛利额约 $281.2B (综合毛利率 ~59.7%，已扣除 TAC 与数据中心成本)' },
            { lbl: en ? 'Op Income' : '营业利润', val: 157.0, base: 0, col: pal.blue, tip: 'TTM 营业利润: $156.98B (营业利润率 33.3%)' },
            { lbl: en ? 'Op Cash' : '经营现金流', val: 179.6, base: 0, col: pal.amber, tip: 'TTM 经营活动现金流 (OCF): $179.6B (强大的内生造血机器)' },
            { lbl: en ? 'TTM FCF' : '自由现金流', val: 19.7, base: 0, col: pal.red, tip: '扣除 TTM $159.8B 巨额 AI 基建 CapEx 后，TTM 自由现金流阶段性压缩至 $19.7B' }
          ];
          var maxV = 520;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
          }
          var slotW = pw / steps.length, barW = Math.min(46, slotW * 0.58);
          steps.forEach(function (s, i) {
            var x = pad.left + i * slotW + (slotW - barW) / 2;
            var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
            var yBot = pad.top + ph - (s.base / maxV) * ph;
            var bh = Math.max(5, yBot - yTop);
            ctx.fillStyle = s.col;
            roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
            hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
          });
        } else {
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26'];
          var svcOpm = [39.0, 34.8, 35.2, 39.8, 40.7, 40.7];
          var cldOpm = [-4.6, -11.3, 5.2, 14.2, 24.0, 36.2];
          var minM = -15, maxM = 48;
          for (var m = 0; m <= 4; m++) {
            var mv = minM + ((maxM - minM) / 4) * m;
            var my = pad.top + ph - (m / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
          }
          function plotLine(arr, col, name) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (yrs.length - 1)) * pw;
              var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (yrs.length - 1)) * pw;
              var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 0 || idx === yrs.length - 1 || idx === 2) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText(v.toFixed(1) + '%', px, py - 9);
              }
              hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
            });
          }
          yrs.forEach(function (y, idx) {
            var px = pad.left + (idx / (yrs.length - 1)) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(y, px, pad.top + ph + 20);
          });
          plotLine(svcOpm, pal.blue, 'Google Services 营业利润率');
          plotLine(cldOpm, pal.green, 'Google Cloud 营业利润率 (规模效应爆发)');
        }
      }

      function drawCohortCanvas() {
        var env = prepCanvas('cohortCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.cohortCanvas = [];
        var pad = { top: 28, right: 22, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.cView === 'ltv') {
          var xLbls = ['Y1 初始上云', 'Y2 数据入湖', 'Y3 接入Gemini', 'Y4 部署Agent', 'Y5 全栈+TPU'];
          var aiEnt = [100, 165, 310, 460, 620];
          var stdEnt = [100, 122, 148, 175, 205];
          var maxL = 680;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxL / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(gv.toFixed(0) + 'x%', pad.left - 8, gy + 4);
          }
          function drawCurve(arr, col, label) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 4 || idx === 2) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText((v / 100).toFixed(1) + 'x', px, py - 8);
              }
              hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '首年支出基准指数: ' + v + '% (' + (v / 100).toFixed(2) + '倍)' });
            });
          }
          xLbls.forEach(function (lb, idx) {
            var px = pad.left + (idx / 4) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(lb, px, pad.top + ph + 20);
          });
          drawCurve(aiEnt, pal.green, '采纳 Gemini Enterprise + Wiz 全栈企业客户');
          drawCurve(stdEnt, pal.blue, '传统仅使用基础 IaaS 存储/虚拟机客户');
        } else {
          var platforms = [
            { name: 'Google Ads (FY25)', rev: 294.7, col: pal.blue, tip: 'FY2025 谷歌广告总收入 $294.69B（Search $224.5B + YouTube $40.4B + Network $29.8B），全球第一' },
            { name: 'Meta Platforms', rev: 196.0, col: pal.violet, tip: 'FY2025 Meta 社交广告收入约 $196B，位居全球第二' },
            { name: 'Amazon Ads', rev: 69.0, col: pal.amber, tip: 'FY2025 亚马逊零售站内与 Prime Video 广告约 $69B' }
          ];
          var maxR = 330;
          for (var k = 0; k <= 3; k++) {
            var kv = k * 100, ky = pad.top + ph - (kv / maxR) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
          }
          var slot = pw / platforms.length, bw = Math.min(58, slot * 0.5);
          platforms.forEach(function (p, idx) {
            var x = pad.left + idx * slot + (slot - bw) / 2;
            var bh = (p.rev / maxR) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = p.col;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + p.rev.toFixed(1) + 'B', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
            ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
            hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name, body: p.tip });
          });
        }
      }

      function drawCapitalCanvas() {
        var env = prepCanvas('capitalCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.capitalCanvas = [];
        var pad = { top: 28, right: 20, bottom: 42, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.kView === 'capex') {
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
          var ocf = [91.7, 91.5, 101.7, 125.3, 164.7, 182.0];
          var cap = [24.6, 31.5, 32.3, 52.5, 91.4, 200.0];
          var maxC = 220;
          for (var g = 0; g <= 4; g++) {
            var cv = (maxC / 4) * g, cy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, cy); ctx.lineTo(pad.left + pw, cy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + cv.toFixed(0) + 'B', pad.left - 8, cy + 4);
          }
          var slot = pw / yrs.length, bw = Math.min(22, slot * 0.34);
          yrs.forEach(function (y, i) {
            var cx = pad.left + i * slot + slot / 2;
            var h1 = (ocf[i] / maxC) * ph, h2 = (cap[i] / maxC) * ph;
            ctx.fillStyle = pal.blue;
            roundRect(ctx, cx - bw - 2, pad.top + ph - h1, bw, h1, 4); ctx.fill();
            ctx.fillStyle = i === 5 ? pal.amber : pal.green;
            roundRect(ctx, cx + 2, pad.top + ph - h2, bw, h2, 4); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + Math.round(cap[i]) + 'B', cx + bw / 2 + 2, pad.top + ph - h2 - 5);
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
            ctx.fillText(y, cx, pad.top + ph + 20);
            var fcf = (ocf[i] - cap[i]).toFixed(1);
            hitRegions.capitalCanvas.push({ x: cx - bw - 4, y: pad.top, w: bw * 2 + 8, h: ph, title: y + ' 现金流与算力投入', body: '经营现金流 $' + ocf[i] + 'B vs 资本开支 $' + cap[i] + 'B → 自由现金流 $' + fcf + 'B' });
          });
        } else {
          var tranches = [
            { name: '美元与六币种高级债券', val: 80.8, col: pal.blue, tip: '2026 年发行 $45.0B 美元债与 $35.8B 英镑/欧元/瑞郎/加元/日元/澳元债（最长至 2126 年百年债）' },
            { name: '公开普通股增发 (6月)', val: 20.5, col: pal.green, tip: '2026 年 6 月发行 2,900 万股 A 类与 2,900 万股 C 类普通股净募资 $20.5B' },
            { name: '6.25% 强制可转优先股', val: 19.0, col: pal.violet, tip: '2026 年 6 月发行优先股净募资 $19.0B，并配 $1.0B 看涨期权上限对冲稀释' },
            { name: 'ATM 市场计划已售份额', val: 12.4, col: pal.amber, tip: '$40B ATM 计划中已执行 $12.4B（主要用于员工股权税款净结算）' },
            { name: '伯克希尔定向私募入股', val: 10.0, col: pal.red, tip: '2026 年 6 月伯克希尔·哈撒韦关联实体斥资 $10.0B 认购 A/C 类股战略背书' }
          ];
          var maxT = 92;
          var rH = ph / tranches.length;
          tranches.forEach(function (t, idx) {
            var cy = pad.top + idx * rH + rH / 2;
            var bh = 20, bl = (t.val / maxT) * (pw * 0.62);
            var bx = pad.left + pw * 0.34;
            ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
            ctx.fillText(t.name, bx - 10, cy + 4);
            ctx.fillStyle = t.col;
            roundRect(ctx, bx, cy - bh / 2, bl, bh, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
            ctx.fillText('$' + t.val.toFixed(1) + 'B', bx + bl + 7, cy + 4);
            hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: t.name, body: t.tip });
          });
        }
      }

      // Interactive 5-Year Cloud & FCF Recovery Simulator
      var simSeries = [19.7, -25, 22, 78, 132, 182];
      function drawSimMiniCanvas() {
        var env = prepCanvas('simMiniCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 24, right: 18, bottom: 26, left: 48 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var yrs = ['TTM26', '27E', '28E', '29E', '30E', '31E'];
        var minV = Math.min(-45, Math.min.apply(null, simSeries) - 10);
        var maxV = Math.max(210, Math.max.apply(null, simSeries) * 1.15);
        var zeroY = pad.top + ph - ((0 - minV) / (maxV - minV)) * ph;
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke();
        ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
        simSeries.forEach(function (v, i) {
          var px = pad.left + (i / 5) * pw;
          var py = pad.top + ph - ((v - minV) / (maxV - minV)) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        simSeries.forEach(function (v, i) {
          var px = pad.left + (i / 5) * pw;
          var py = pad.top + ph - ((v - minV) / (maxV - minV)) * ph;
          ctx.fillStyle = v < 0 ? pal.red : pal.green;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText((v < 0 ? '-' : '') + '$' + Math.abs(Math.round(v)) + 'B', px, py - 8);
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
          ctx.fillText(yrs[i], px, pad.top + ph + 16);
        });
      }

      function runSimulator() {
        var gC = parseFloat(document.getElementById('inpCloudCagr').value) / 100;
        var gS = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
        var termCap = parseFloat(document.getElementById('inpCapexRatio').value) / 100;
        document.getElementById('lblCloudCagr').textContent = (gC * 100).toFixed(1) + '%';
        document.getElementById('lblSvcCagr').textContent = (gS * 100).toFixed(1) + '%';
        document.getElementById('lblCapexRatio').textContent = (termCap * 100).toFixed(1) + '%';

        // 2026 annualized base: Services ~$385B, Cloud ~$112B, Other ~$1.5B -> ~$498.5B
        var svc = 385.0, cld = 112.0, shares = 12.35;
        var capRates = [0.40, 0.37, 0.30, 0.24, 0.205, termCap];
        var fcfArr = [19.7];
        var opm31 = 33.0, eps31 = 18.0, rev31 = 800;
        for (var y = 1; y <= 5; y++) {
          svc *= (1 + gS);
          cld *= (1 + gC);
          var totRev = svc + cld + 2.5;
          var opInc = svc * 0.408 + cld * 0.375 - 36.0;
          var netInc = opInc * 0.81;
          var ocf = netInc + totRev * 0.085;
          var capex = totRev * capRates[y];
          var fcf = ocf - capex;
          fcfArr.push(fcf);
          if (y >= 4 && fcf > 40) shares *= 0.985;
          if (y === 5) {
            rev31 = totRev;
            opm31 = (opInc / totRev) * 100;
            eps31 = netInc / shares;
          }
        }
        document.getElementById('simRevOut').textContent = '$' + Math.round(rev31) + 'B';
        document.getElementById('simOpmOut').textContent = opm31.toFixed(1) + '%';
        document.getElementById('simFcfOut').textContent = '$' + Math.round(fcfArr[5]) + 'B';
        document.getElementById('simEpsOut').textContent = '$' + eps31.toFixed(2);
        simSeries = fcfArr;
        drawSimMiniCanvas();
      }

      ['inpCloudCagr', 'inpSvcCagr', 'inpCapexRatio'].forEach(function (id) {
        document.getElementById(id).addEventListener('input', runSimulator);
      });

      var PRESETS = {
        bear: { c: 19, s: 6.5, r: 23 },
        base: { c: 26, s: 9.5, r: 18 },
        bull: { c: 33, s: 12.0, r: 15 }
      };
      document.getElementById('simPresets').addEventListener('click', function (e) {
        var b = e.target.closest('[data-preset]');
        if (!b) return;
        var k = b.getAttribute('data-preset');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var pr = PRESETS[k] || PRESETS.base;
        document.getElementById('inpCloudCagr').value = pr.c;
        document.getElementById('inpSvcCagr').value = pr.s;
        document.getElementById('inpCapexRatio').value = pr.r;
        runSimulator();
      });

      function bindChartTab(groupId, attr, stateKey, drawFn) {
        var g = document.getElementById(groupId);
        if (!g) return;
        g.addEventListener('click', function (e) {
          var b = e.target.closest('[' + attr + ']');
          if (!b) return;
          state[stateKey] = b.getAttribute(attr);
          var bs = g.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          drawFn();
        });
      }
      bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
      bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
      bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

      function bindHoverTooltip(canvasId) {
        var c = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
        if (!c || !tip) return;
        c.addEventListener('mousemove', function (ev) {
          var r = c.getBoundingClientRect();
          var mx = ev.clientX - r.left, my = ev.clientY - r.top;
          var list = hitRegions[canvasId] || [], hit = null;
          for (var i = 0; i < list.length; i++) {
            var rg = list[i];
            if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
          }
          if (hit) {
            tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
            tip.style.display = 'block';
            tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
            tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
          } else {
            tip.style.display = 'none';
          }
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

      function drawAllCharts() {
        drawProfitCanvas();
        drawCohortCanvas();
        drawCapitalCanvas();
        drawSimMiniCanvas();
      }

      // Quick Jump Search (⌘K)
      var QUICK_ITEMS = [
        { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'Q3 $127.6B 营收 (+25%) · Cloud +103% · 意图拍卖公式' },
        { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '7大入口 → 意图竞价 → YouTube双轮 → Cloud/TPU → $200B基建' },
        { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四大变现柱', s: 'TTM $179.6B OCF · Cloud 营业利润率跃升至 36.2%' },
        { id: 'mod-cohort', t: 'M3 三级客户分层与全球广告格局', s: 'Gemini 企业客户支出翻 4 倍+ · $294.7B 全球第一广告盘' },
        { id: 'mod-capital', t: 'M4 $2,000亿 AI 资本周期与 FCF 反转模拟', s: '伯克希尔 $10B 私募入股 · 2027–2031 现金流收获推演' },
        { id: 'mod-matrix', t: 'M5 六大科技巨头范式矩阵与监管压测', s: 'GOOGL vs AAPL / MSFT / META / AMZN / NVDA 及 DOJ 救济' }
      ];
      var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQuick(q) {
        if (!qPop) return;
        var kw = (q || '').trim().toLowerCase();
        var matched = QUICK_ITEMS.filter(function (it) {
          return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1;
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
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (qInput) qInput.focus();
        }
      });

      // Sidebar Toggle, Export & Print
      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
      sbBtn.addEventListener('click', function () {
        if (window.innerWidth >= 1024) {
          var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
          if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
          else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
          try { localStorage.setItem('mui_portal_sidebar_collapsed_v1', col ? '0' : '1'); } catch (e) {}
          setTimeout(drawAllCharts, 60);
        } else {
          var open = sb.classList.toggle('open');
          bd.classList.toggle('open', open);
        }
      });
      bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

      
      
      

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
            showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
          });
        });
      } catch (e) {}

      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {}

      document.getElementById('appbarThemeBtn').addEventListener('click', function () {
        var nxt = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nxt, false);
        try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
      });
      document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
        var lb = e.target.closest('[data-lang]');
        if (!lb) return;
        var nl = lb.getAttribute('data-lang');
        applyLang(nl, false);
        try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
      });

      var resizeTimer = null;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawAllCharts, 90);
      });

      runSimulator();
      drawAllCharts();
    })();
  