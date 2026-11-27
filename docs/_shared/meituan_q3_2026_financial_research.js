
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_CHECK_KEY = 'meituan_q3_2026_checks_v1';
 var DOC_TITLE_ZH = '美团 Meituan (3690.HK) 2026年Q3财报深度研究报告 | 数据中心';
 var DOC_TITLE_EN = 'Meituan (3690.HK) Q3 2026 Earnings Deep Dive Report | Research Hub';

 var I18N_RICH_LIST = [
 {
 key: 'mt_r00',
 match_zh: '美团 Meituan (3690.HK) 2026年Q3财报深度研究报告：',
 zh: '美团 Meituan (3690.HK) 2026年Q3财报深度研究报告：<span class="gradient-accent">外卖拐点确立、核心盈利强修复与AI科技零售新周期</span>',
 en: 'Meituan (3690.HK) Q3 2026 Earnings Deep Dive: <span class="gradient-accent">Delivery Inflection, Core Profit Swing &amp; AI-Driven Tech Retail</span>'
 },
 {
 key: 'mt_r01',
 match_zh: '北京时间 2026 年 11 月 27 日',
 zh: '北京时间 2026 年 11 月 27 日，美团正式发布 2026 年第三季度业绩报告。面对过去一年多激烈的外卖与即时零售补贴战，三季报给出了明确的产业转折信号：随着夏季促销旺季后行业补贴更趋理性、低价内卷订单占比收缩及平均客单价同比明显回升，<strong>“外卖行业迎来拐点”</strong> <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">美团官方三季报 ↗</a>。 2026 Q3 美团实现营业总收入 <strong>1,155.56 亿元</strong>（同比 +21.6%，环比 +10.4%，超出市场一致预期 1,133.7 亿元）；毛利润跃升 52.2% 至 <strong>376.84 亿元</strong>（综合毛利率 <strong>32.61%</strong>，同比大增 6.57 个百分点） <a class="cite-link" href="https://www.ithome.com/1/033/545.htm" target="_blank" rel="noopener noreferrer">IT之家财报汇总 ↗</a>。 盈利层面，核心本地商业分部经营利润录得 <strong>57.04 亿元</strong>（经营利润率 7.3%），较去年同期亏损 141.07 亿元大幅反转近 200 亿元，远超机构一致预期（41.5 亿元）；新业务营收大增 32.9% 至 <strong>372.73 亿元</strong>，亏损环比收窄至 <strong>13.12 亿元</strong> <a class="cite-link" href="https://mlq.ai/news/meituan-stays-profitable-in-q3-as-revenue-rises-216-to-rmb1156-billion/" target="_blank" rel="noopener noreferrer">MLQ 英文财报对照 ↗</a>。 受销售费用（270.2 亿元）高于预期及剔除 23 亿元金融投资公允价值收益影响，经调整净利润录得 <strong>18.50 亿元</strong>（归母净利润 20.71 亿元），略低于市场一致预期（22.0 亿元） <a class="cite-link" href="https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285" target="_blank" rel="noopener noreferrer">BigGo 预期差 ↗</a>。',
 en: 'On November 27, 2026, Meituan (3690.HK) released its Q3 2026 financial results, signaling a decisive turn after over a year of intense delivery subsidy wars: as post-summer subsidies grew rational, low-priced order mix shrank, and AOV rebounded meaningfully YoY, <strong>China\'s food delivery industry reached an inflection point</strong> <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">Official Release ↗</a>. Q3 revenue accelerated to <strong>¥115.56B</strong> (+21.6% YoY, +10.4% QoQ; beating ¥113.37B consensus), while gross profit jumped 52.2% YoY to <strong>¥37.68B</strong> (<strong>32.61%</strong> GM, +6.57ppt YoY) <a class="cite-link" href="https://www.ithome.com/1/033/545.htm" target="_blank" rel="noopener noreferrer">Financial Summary ↗</a>. Core Local Commerce operating profit swung nearly ¥20B from a ¥14.07B loss a year ago to <strong>¥5.70B (7.3% OPM)</strong>, beating consensus (¥4.15B); New Initiatives grew 32.9% YoY to <strong>¥37.27B</strong> with losses narrowing QoQ to <strong>-¥1.31B</strong> <a class="cite-link" href="https://mlq.ai/news/meituan-stays-profitable-in-q3-as-revenue-rises-216-to-rmb1156-billion/" target="_blank" rel="noopener noreferrer">MLQ Analysis ↗</a>. Higher S&amp;M (¥27.02B vs. ¥25.31B est.) and the exclusion of ¥2.3B fair value gains left Adjusted Net Profit at <strong>¥1.85B</strong> (GAAP ¥2.07B), slightly below ¥2.20B consensus <a class="cite-link" href="https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285" target="_blank" rel="noopener noreferrer">Variance ↗</a>.'
 }
 ];

 var I18N_TEXT_PAIRS = [
 ["数据中心", "Research Hub"],
 ["美团 (3690.HK) 2026 Q3 财报深度研报", "Meituan (3690.HK) Q3 2026 Earnings Report"],
 ["美团 Q3 财报深度研报", "Meituan Q3 2026 Report"],
 ["外卖行业迎拐点 × 核心商业减亏近200亿 × 闪购自营爆发 × 小象/Keeta与LongCat-2.5 AI闭环", "Delivery Inflection × ~¥20B CLC Swing × Instashopping Surge × Keeta & LongCat-2.5 AI"],
 ["Q3 营业总收入", "Q3 Total Revenue"],
 ["核心商业 / 新业务", "CLC / New Biz Op."],
 ["经调整净利 / 现金", "Adj. NP / Cash Pile"],
 ["核心研究章节 (00 – 07)", "Report Chapters (00 – 07)"],
 ["执行摘要与核心指标", "Executive Summary & KPIs"],
 ["业务矩阵与AI科技中台", "Business Matrix & AI Stack"],
 ["四大战略支柱与护城河", "4 Strategic Pillars & Moat"],
 ["本地生活巨头横向对比", "Local Commerce Peer Matrix"],
 ["预期差与2027盈利推演", "Variance & 2027E Simulator"],
 ["周期演进与四大战役复盘", "Cycle Evolution & Battles"],
 ["Q4与2027财报核查清单", "Q4 & 2027 Watchlist"],
 ["官方公告与信源索引", "Filings & Sources Index"],
 ["阅读与导出工具", "Reading & Export Tools"],
 ["浅色外观", "Light"],
 ["深色外观", "Dark"],
 ["导出 HTML", "Export HTML"],
 ["打印 / PDF", "Print / PDF"],
 ["财报定调：外卖行业迎拐点 · 核心商业全面扭亏", "Verdict: Delivery Inflection · Core Local Commerce Returns to Profit"],
 ["报告期：2026 Q3 (截至 2026-09-30) · 披露日：2026-11-27", "Period: Q3 2026 (Ended Sept 30, 2026) · Released: Nov 27, 2026"],
 ["HKEX: 3690.HK · 营收 Beat / 毛利 Beat", "HKEX: 3690.HK · Revenue & Gross Profit Beat"],
 ["外卖行业拐点与 UE 强修复", "Delivery Inflection & UE Recovery"],
 ["闪购自营爆发与 Keeta 沙特盈利", "Instashopping 1P Surge & Keeta Saudi Profit"],
 ["1,575 亿现金堡垒与 AI 开源落地", "¥157.5B Cash Fortress & Open-Source AI"],
 ["综合毛利率 (Gross Margin)", "Consolidated Gross Margin"],
 ["核心本地商业经营利润", "Core Local Commerce Op. Profit"],
 ["广义现金储备 & 研发投入", "Total Liquidity & Q3 R&D"],
 ["一、双轮业务矩阵与 AI 科技中台：美团如何在 Q3 实现“增长提速 + 盈利反转”？", "1. Dual-Engine Matrix & AI Tech Stack: Accelerating Growth + Profit Reversal in Q3"],
 ["核心本地商业（782.8亿）稳固利润盘 × 新业务（372.7亿）加速减亏 × 骑手与大模型双底座赋能", "Core Local Commerce (¥78.28B) Profit Anchor × New Initiatives (¥37.27B) Narrowing × Rider & AI Backbone"],
 ["视图A: 分部季度营收对比", "View A: Segment Revenue Mix"],
 ["视图B: 核心商业利润反转", "View B: CLC Profit Swing"],
 ["二、美团 Q3 财报映射的四大护城河支柱与五维竞争力雷达", "2. Four Strategic Moat Pillars & 5-Axis Competitive Radar"],
 ["三、海内外本地生活与即时零售巨头对比：补贴退潮后的格局重塑", "3. Global & Domestic Local Commerce Peer Matrix: Post-Subsidy Landscape"],
 ["全部对标平台", "All Peers"],
 ["国内本地生活/电商", "China Rivals"],
 ["海外即时配送", "Global Delivery"],
 ["四、预期差深度复盘与 2027E 盈利修复推演：为什么营收大超预期而净利微逊？", "4. Consensus Variance & 2027E Recovery Simulator: Why Top-Line Beat While Adj. NP Slightly Missed"],
 ["五、2025–2026 周期反转演进与四大核心战役复盘", "5. 2025–2026 Cycle Turnaround & Four Landmark Battles"],
 ["六、美团 2026 Q4 及 2027 财报跟踪交互式核查清单", "6. Interactive Q4 2026 & 2027 Earnings Watchlist"],
 ["全部勾选", "Check All"],
 ["重置清单", "Reset"],
 ["数据来源与一手财报/财经核验索引（2026年11月27日披露）", "Verified Primary Releases & Financial Sources (Released Nov 27, 2026)"]
 ];

 var I18N_ATTR_PAIRS = [
 ["检索章节或指标…", "Jump to chapter or KPI…"],
 ["搜索平台、业务品牌 (闪购 / 盒马 / 抖省省 / DoorDash)…", "Search platform, brand (Instashopping / Boxma / DoorDash)…"],
 ["导出独立 HTML 文件 (.html)", "Export Standalone HTML File (.html)"],
 ["打印或导出 PDF 研报", "Print or Save Report as PDF"]
 ];

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 即时履约网络）：</strong>外卖与闪购共享同一张全国骑手调度网，使美团在非餐即时零售（酒水/医药/日百）扩张时无需从零搭建运力，边际履约成本显著低于纯电商对手 <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">三季报原文 ↗</a>。',
 '<strong>当前选中支柱解读（02 到店到家协同）：</strong>4,000万+ 高等级会员与 2,000+ 联合品牌构建了强大的跨品类交叉销售飞轮，使高毛利到店酒旅与高成长闪购能够共用同一个流量池 <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">会员生态 ↗</a>。',
 '<strong>当前选中支柱解读（03 全链路 AI 渗透）：</strong>Q3 研发投入 77.2 亿元（+11.3%），自研 1.6T 参数 LongCat-2.5 正式开源，B端“妙手”已服务超 200 万商家，推动 AI 从工具走向经营闭环 <a class="cite-link" href="https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6" target="_blank" rel="noopener noreferrer">AI 落地进展 ↗</a>。',
 '<strong>当前选中支柱解读（04 生态治理与骑手保障）：</strong>骑手新职伤险与养老保险补贴落地全国，叠加“繁盛计划”赋能 22 万家餐饮小店，以可持续生态换取长期监管与社会稳健度 <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">社会责任 ↗</a>。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Delivery Density):</strong> Food delivery and Instashopping share one nationwide rider dispatch mesh, letting Meituan scale 1P liquor/pharma at far lower marginal fulfillment cost than pure e-commerce rivals <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">Official Release ↗</a>.',
 '<strong>Selected Pillar (02 · VIP Flywheel):</strong> 40M+ higher-tier members and 2,000+ co-branded memberships create a cross-category flywheel linking high-margin in-store &amp; hotel with rapid Instashopping growth <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">Ecosystem ↗</a>.',
 '<strong>Selected Pillar (03 · Full-Stack AI):</strong> ¥7.72B Q3 R&amp;D (+11.3% YoY) powers open-source 1.6T LongCat-2.5 and merchant AI workbench CatPaw (&gt;2M merchants), automating store ops end-to-end <a class="cite-link" href="https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6" target="_blank" rel="noopener noreferrer">AI Progress ↗</a>.',
 '<strong>Selected Pillar (04 · Ecosystem Trust):</strong> Nationwide rider injury/pension subsidies plus the Prosperity Plan supporting 220k+ small restaurants fortify long-term regulatory and supply stability <a class="cite-link" href="https://www.meituan.com/news/NN261127296001055" target="_blank" rel="noopener noreferrer">ESG &amp; Governance ↗</a>.'
 ];

 var PEER_ROWS = [
 {
 category: 'cn', benchmark: true,
 company: '研究基准：美团 (Meituan · 3690.HK)',
 leader: '王兴 (CEO) / 陈少晖 (CFO)',
 positioning: '中国本地生活与即时零售绝对龙头 + Keeta 海外扩张',
 culture: '高密度骑手调度网 + 到店到家双轮 + LongCat-2.5 AI 赋能',
 headcount: 'Q3 营收 ¥1,155.6亿 (+21.6%) · 毛利率 32.61%',
 margins: '核心商业 OPM 7.3% · 现金储备 ¥1,575.3亿',
 verdict: '外卖 GTV 份额 &gt;60%，Q3 核心商业同比减亏近 200 亿确立拐点；需跟踪 Q4 冬季骑手成本与销售费用控制。',
 sourceLabel: 'Q3 2026 公告',
 sourceUrl: 'https://www.meituan.com/news/NN261127296001055'
 },
 {
 category: 'global', benchmark: false,
 company: 'DoorDash (NASDAQ: DASH)',
 leader: 'Tony Xu',
 positioning: '北美即时配送垄断龙头 + DashPass 会员 + 非餐零售',
 culture: '轻资产算法调度 + 高客单价与高广告变现率',
 headcount: 'Q3 2026 毛利率 ~51.9% · 净利率 ~6.2%',
 margins: '经营利润率 ~5.25% (TTM 5.46%)',
 verdict: '北美单均客单价与抽成率远高于国内，但同样在 Q4 面临冬季骑手成本季节性上行压力。',
 sourceLabel: 'Macrotrends / IR',
 sourceUrl: 'https://www.macrotrends.net/stocks/charts/DASH/doordash/operating-margin'
 },
 {
 category: 'cn', benchmark: false,
 company: '阿里巴巴 · 淘宝闪购 / 盒马',
 leader: '吴泳铭',
 positioning: '远场电商流量反哺即时零售 + 盒马前置仓网格',
 culture: '大淘宝流量分发 + 仓店一体供应链体系',
 headcount: '集团毛利率 ~38%–40% · 盒马华东新增28前置仓',
 margins: '双雄格局头号外卖对手',
 verdict: '2026 夏季补贴战后正回归 ROI 理性，但盒马前置仓在华东加密直攻美团小象超市。',
 sourceLabel: '行业竞争追踪',
 sourceUrl: 'https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285'
 },
 {
 category: 'cn', benchmark: false,
 company: '京东 · 京东本地生活',
 leader: '许冉',
 positioning: '自营供应链 + 达达即时配送网络',
 culture: '重资产仓配履约 + 3C/医药/酒水自营品质心智',
 headcount: '集团毛利率 ~15%–16% · 转向供应链盈利战',
 margins: '集团 OPM ~3%–4%',
 verdict: '从纯补贴转向供应链盈利，在 3C 与高客单酒水具优势，但在高频餐饮外卖密度上明显弱于美团。',
 sourceLabel: '行业动态',
 sourceUrl: 'https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285'
 },
 {
 category: 'cn', benchmark: false,
 company: '字节跳动 · 抖音本地生活',
 leader: '未上市',
 positioning: '短视频/直播内容种草 + 独立 App“抖省省”',
 culture: '算法内容分发 + 脉冲式团购核销',
 headcount: '抖省省日活快速爬坡至 2,000万级',
 margins: '高毛利内容广告生态',
 verdict: '在到店餐饮与酒旅团购端持续分流，倒逼美团以“神抢手/繁盛计划/4,000万+会员”稳固搜索心智。',
 sourceLabel: '到店竞争观察',
 sourceUrl: 'https://kuku.baidu.com/landing/tscp_doc/280ad73241c7e9b33c5b0390c1c22aaa'
 }
 ];

 var PEER_ROWS_EN = [
 {
 category: 'cn', benchmark: true,
 company: 'Benchmark: Meituan (3690.HK)',
 leader: 'Wang Xing (CEO) / Chen Shaohui (CFO)',
 positioning: 'China Local Commerce &amp; Instant Retail Leader + Keeta Global',
 culture: 'High-Density Rider Mesh + Delivery/In-Store + LongCat-2.5 AI',
 headcount: 'Q3 Rev ¥115.56B (+21.6%) · GM 32.61%',
 margins: 'CLC OPM 7.3% · Liquidity ¥157.53B',
 verdict: '&gt;60% delivery GTV share; ~¥20B YoY CLC swing confirms inflection; watch Q4 winter rider costs &amp; S&amp;M ratio.',
 sourceLabel: 'Q3 2026 Release',
 sourceUrl: 'https://www.meituan.com/news/NN261127296001055'
 },
 {
 category: 'global', benchmark: false,
 company: 'DoorDash (NASDAQ: DASH)',
 leader: 'Tony Xu',
 positioning: 'U.S. On-Demand Delivery Leader + DashPass + Non-Restaurant',
 culture: 'Asset-light dispatch + high US AOV &amp; ad take-rate',
 headcount: 'Q3 2026 GM ~51.9% · Net Margin ~6.2%',
 margins: 'Operating Margin ~5.25% (TTM 5.46%)',
 verdict: 'Higher US AOV &amp; take-rate, while facing similar seasonal Q4 dasher cost headwinds.',
 sourceLabel: 'Macrotrends / IR',
 sourceUrl: 'https://www.macrotrends.net/stocks/charts/DASH/doordash/operating-margin'
 },
 {
 category: 'cn', benchmark: false,
 company: 'Alibaba · Taobao Instant / Boxma',
 leader: 'Eddie Wu',
 positioning: 'E-Commerce Traffic + Boxma Front-Warehouse Grocery',
 culture: 'Taobao traffic funnel + integrated store-warehouse retail',
 headcount: 'Group GM ~38%–40% · Boxma expanding front-warehouses',
 margins: 'Primary delivery duopoly rival',
 verdict: 'Post-summer delivery subsidies rationalized, while Boxma competes directly against Xiaoxiang Supermarket.',
 sourceLabel: 'Competition',
 sourceUrl: 'https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285'
 },
 {
 category: 'cn', benchmark: false,
 company: 'JD.com · Local Services',
 leader: 'Sandy Xu',
 positioning: '1P Supply Chain + Dada On-Demand Network',
 culture: 'Heavy fulfillment + 3C/pharma/liquor 1P quality',
 headcount: 'Group GM ~15%–16% · Shifting to supply-chain profit',
 margins: 'Group OPM ~3%–4%',
 verdict: 'Strong in 3C &amp; liquor supply chain, but lacks Meituan\'s high-frequency restaurant order density.',
 sourceLabel: 'Industry Note',
 sourceUrl: 'https://finance.biggo.com.tw/news/19622ed2-f603-4d3a-b22d-e0ba4d107285'
 },
 {
 category: 'cn', benchmark: false,
 company: 'ByteDance · Douyin Local Life',
 leader: 'Private',
 positioning: 'Short-Video Discovery + Standalone Group-Buying App',
 culture: 'Content-driven impulse vouchers',
 headcount: 'Rapid DAU scaling in group-buying tools',
 margins: 'High-margin content ad engine',
 verdict: 'Pressures high-margin in-store vouchers; Meituan defends via search intent, 40M+ VIPs, and merchant SaaS.',
 sourceLabel: 'In-Store Rivalry',
 sourceUrl: 'https://kuku.baidu.com/landing/tscp_doc/280ad73241c7e9b33c5b0390c1c22aaa'
 }
 ];

 var CHECKLIST_ITEMS = [
 { tag: '费用率收敛', title: '1. Q4 销售及营销费用率能否由 23.4% 回落至 21% 以下？', desc: 'Q3 销售费用 270.2 亿高于预期（253.1 亿）是经调整净利微逊共识的主因，需观察淡季补贴退坡是否兑现。' },
 { tag: '冬季 UE 韧性', title: '2. Q4 冬季骑手成本与社保落地后，核心商业 OPM 能否守住 7%？', desc: '机构提示冬季天气与全国骑手职业伤害/养老补贴可能阶段性抬升单均履约成本，需核验客单价提升能否对冲。' },
 { tag: '闪购阿尔法', title: '3. 美团闪购自营商品（+75.8%）能否维持 50%+ 高增速？', desc: '跟踪“歪马送酒”、“品牌官旗闪电仓”与 24h 药房在低线城市的单均贡献与高客单渗透率。' },
 { tag: '新业务减亏', title: '4. 新业务亏损能否进一步收窄至单季 10 亿元以内？', desc: '核查小象超市成熟城市盈利扩散与 Keeta 沙特盈利后，巴西 32 城扩张的资本开支纪律。' },
 { tag: '到店护城河', title: '5. 面对抖音“抖省省”与阿里，到店酒旅利润率是否企稳？', desc: '跟踪 4,000 万+ 高等级会员留存率与“妙手”AI 工作台对中小商家的绑定深度。' },
 { tag: '资产质量', title: '6. 剔除非经营性公允价值收益后的内生经营利润占比提升？', desc: 'Q3 含 23 亿投资公允价值收益（OCI 另有 -122 亿波动），后续需更聚焦经调整核心经营利润的内生增速。' }
 ];

 var CHECKLIST_ITEMS_EN = [
 { tag: 'S&M Discipline', title: '1. Can S&M ratio compress from 23.4% below 21% in Q4 2026?', desc: 'Higher S&M (¥27.02B vs. ¥25.31B est.) caused the minor Adj. Net Profit miss; verify post-summer promo normalization.' },
 { tag: 'Winter Rider UE', title: '2. Does CLC operating margin hold ~7% amid winter rider costs?', desc: 'Monitor whether higher AOV and paid express tiers offset seasonal cold-weather and nationwide rider social security subsidies.' },
 { tag: 'Instashopping', title: '3. Can 1P Instashopping (+75.8% YoY) sustain 50%+ growth?', desc: 'Track Waima liquor warehouses, Brand Flagship Lightning Stores, and 24h pharmacies scaling into lower-tier cities.' },
 { tag: 'New Biz Loss', title: '4. Can New Initiatives quarterly loss narrow below ¥1.0B?', desc: 'Verify Xiaoxiang mature-city profit expansion and Keeta Brazil (32 cities) spend discipline following Saudi profitability.' },
 { tag: 'In-Store Moat', title: '5. Do in-store & hotel margins hold against Douyin & Alibaba?', desc: 'Track 40M+ higher-tier VIP retention and CatPaw AI merchant workbench stickiness.' },
 { tag: 'Earnings Quality', title: '6. Is ex-fair-value organic operating profit expanding steadily?', desc: 'Q3 included ¥2.3B fair value gains (plus -¥12.2B OCI swing); prioritize core operational profit growth.' }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '¥1,155.6亿营收 (+21.6%) · 毛利32.61% · 核心商业¥57.04亿' },
 { sec: 'sec-01', title: '01 业务矩阵与AI科技中台', sub: '配送+25.3% / 闪购+75.8% / 小象85城 / LongCat-2.5开源' },
 { sec: 'sec-02', title: '02 四大战略支柱与护城河', sub: '履约网络 · 4,000万+会员 · 妙手200万商家 · 五维雷达图' },
 { sec: 'sec-03', title: '03 本地生活巨头横向对比', sub: '美团 vs DoorDash / 淘宝闪购 / 京东 / 抖音本地生活' },
 { sec: 'sec-04', title: '04 预期差与2027盈利推演', sub: '销售费用¥270.2亿预期差 · 交互式2027E修复模拟器' },
 { sec: 'sec-05', title: '05 周期演进与四大战役复盘', sub: '25Q3补贴谷底 → 26Q2转正 → 26Q3拐点确立' },
 { sec: 'sec-06', title: '06 Q4与2027财报核查清单', sub: '6项关键跟踪指标与本地持久化评分' },
 { sec: 'sec-07', title: '07 官方公告与信源索引', sub: '美团官方三季报 · IT之家 · 亿欧 · MLQ · BigGo' }
 ];

 var QUICK_JUMP_EN = [
 { sec: 'sec-00', title: '00 Executive Summary & KPIs', sub: '¥115.56B Rev (+21.6%) · 32.61% GM · ¥5.70B CLC Op. Profit' },
 { sec: 'sec-01', title: '01 Business Matrix & AI Stack', sub: 'Delivery +25.3% / 1P +75.8% / Xiaoxiang 85 Cities / LongCat-2.5' },
 { sec: 'sec-02', title: '02 Four Moat Pillars & Radar', sub: 'Rider Mesh · 40M+ VIPs · CatPaw 2M+ · 5-Axis Radar' },
 { sec: 'sec-03', title: '03 Local Commerce Peer Matrix', sub: 'Meituan vs. DoorDash / Alibaba / JD / Douyin' },
 { sec: 'sec-04', title: '04 Variance & 2027E Simulator', sub: 'S&M ¥27.02B Variance · Interactive 2027E Recovery Simulator' },
 { sec: 'sec-05', title: '05 Cycle Evolution & Battles', sub: 'Q3 25 Trough → Q2 26 Turn → Q3 26 Inflection' },
 { sec: 'sec-06', title: '06 Q4 & 2027 Watchlist', sub: '6-Point Interactive Tracking Checklist (Saved Locally)' },
 { sec: 'sec-07', title: '07 Filings & Sources Index', sub: 'Meituan Official Release · MLQ · BigGo · Stockstar' }
 ];

 var PRESETS = {
 p1: { principal: 15.0, years: 10.5, priceCagr: -2.0, drip: true },
 p2: { principal: 20.0, years: 14.5, priceCagr: 0.0, drip: true },
 p3: { principal: 8.0, years: 5.5, priceCagr: -4.5, drip: false }
 };

 var state = {
 lang: 'zh',
 theme: 'light',
 ch1View: 'viewA',
 activePillar: 0,
 radarSeries: { mo: true, pmi: true, ko: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 15.0, years: 10.5, priceCagr: -2.0, drip: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 function safeGetStorage(key) { try { return window.localStorage.getItem(key); } catch (err) { return null; } }
 function safeSetStorage(key, val) { try { window.localStorage.setItem(key, val); } catch (err) {} }

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
 for (var _ri = 0; _ri < I18N_RICH_LIST.length; _ri++) _richMapByKey[I18N_RICH_LIST[_ri].key] = I18N_RICH_LIST[_ri];

 function bindRichBlocksOnce() {
 var candidates = document.querySelectorAll('h1, p, div');
 for (var i = 0; i < candidates.length; i++) {
 var el = candidates[i];
 if (el.getAttribute('data-i18n-rich') || el.id === 'pillarFocusNote' || el.closest('#pillarFocusNote')) continue;
 var normTxt = (el.textContent || '').replace(/\s+/g, ' ').trim();
 for (var j = 0; j < I18N_RICH_LIST.length; j++) {
 var item = I18N_RICH_LIST[j];
 if (normTxt.indexOf(item.match_zh) === 0 && !el.querySelector('div, p, ul, table, canvas')) {
 el.setAttribute('data-i18n-rich', item.key);
 break;
 }
 }
 }
 }

 function syncCh1HeaderText() {
 var titleEl = document.getElementById('ch1ChartTitle'), subEl = document.getElementById('ch1ChartSub');
 if (!titleEl || !subEl) return;
 if (state.ch1View === 'viewA') {
 titleEl.textContent = isEn() ? 'Q3 2025–Q3 2026 Quarterly Revenue Mix (Core Local vs. New Initiatives · ¥B)' : 'Q3 2025–Q3 2026 分季度营收结构（核心本地商业 vs 新业务 · ¥B）';
 subEl.textContent = isEn() ? 'Q3 2026 revenue accelerated to ¥115.56B (+21.6% YoY), with New Initiatives at 32.3% share' : '2026 Q3 营收跃升至 ¥1,155.6亿 (+21.6% YoY)，新业务占比提升至 32.3%';
 } else {
 titleEl.textContent = isEn() ? 'Q3 2025–Q3 2026 Core Local Commerce Operating Profit Swing (¥B) & Margin (%)' : 'Q3 2025–Q3 2026 核心本地商业经营利润反转 (¥B) 与利润率 (%)';
 subEl.textContent = isEn() ? 'Swung nearly ¥20B YoY from -¥14.07B (-21.0% OPM) to +¥5.70B (+7.3% OPM)' : '核心商业从去年同期亏损 ¥141.1亿 (-21.0%) 强力反转为盈利 ¥57.0亿 (+7.3%)';
 }
 }

 function syncCollapseButtonsText() {
 var btns = document.querySelectorAll('[data-collapse-target]');
 for (var i = 0; i < btns.length; i++) {
 var panel = document.getElementById(btns[i].getAttribute('data-collapse-target'));
 var isOpen = panel && panel.classList.contains('open');
 btns[i].innerHTML = isEn()
 ? (isOpen ? '<span>Hide Execution Mechanics</span> <span>⌃</span>' : '<span>Show Execution Mechanics</span> <span>⌄</span>')
 : (isOpen ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>');
 }
 }

 function applyLanguage(lang, silent) {
 bindRichBlocksOnce();
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.title = en ? DOC_TITLE_EN : DOC_TITLE_ZH;
 var zhBtn = document.getElementById('langZhBtn'), enBtn = document.getElementById('langEnBtn');
 if (zhBtn && enBtn) {
 zhBtn.classList.toggle('active', !en); enBtn.classList.toggle('active', en);
 zhBtn.setAttribute('aria-pressed', String(!en)); enBtn.setAttribute('aria-pressed', String(en));
 }
 var richNodes = document.querySelectorAll('[data-i18n-rich]');
 for (var r = 0; r < richNodes.length; r++) {
 var rEntry = _richMapByKey[richNodes[r].getAttribute('data-i18n-rich')];
 if (rEntry) richNodes[r].innerHTML = en ? rEntry.en : rEntry.zh;
 }
 var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false), tNode;
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
 ['placeholder', 'title', 'aria-label'].forEach(function (an) {
 for (var a = 0; a < allEls.length; a++) {
 if (allEls[a].closest('#langSwitchGroup')) continue;
 var av = allEls[a].getAttribute(an);
 if (av) {
 var nxt = en ? _zhToEnAttr[av] : _enToZhAttr[av];
 if (nxt) allEls[a].setAttribute(an, nxt);
 }
 }
 });
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
 if (abIconEl) abIconEl.innerHTML = (state.theme === 'dark')
 ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
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
 var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
 return safe.replace(re, '<mark class="hl">$1</mark>');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = activeRows.filter(function (row, idx) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var zhR = PEER_ROWS[idx] || row, enR = PEER_ROWS_EN[idx] || row;
 return (zhR.company + ' ' + zhR.leader + ' ' + zhR.positioning + ' ' + zhR.culture + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.positioning + ' ' + enR.verdict).toLowerCase().indexOf(q) !== -1;
 });
 if (badge) badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家对标平台');
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching peers found.' : '未找到匹配的对标平台，请重置筛选条件。') + '</td></tr>';
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
 '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
 '</tr>';
 }).join('');
 }

 function updateSimulatorUI() {
 var clcG = state.sim.principal / 100;
 var clcOpm = state.sim.years / 100;
 var newLoss = state.sim.priceCagr / 100;
 var aiBonus = state.sim.drip ? 0.015 : 0.0;

 var clc27 = 313.13 * (1 + clcG);
 var new27 = 149.09 * 1.22;
 var rev27 = clc27 + new27;
 var clcOp27 = clc27 * (clcOpm + aiBonus);
 var newOp27 = new27 * (newLoss + (state.sim.drip ? 0.005 : 0));
 var unalloc = -6.6;
 var grpOp27 = clcOp27 + newOp27 + unalloc;
 var grpOpm27 = (grpOp27 / rev27) * 100;

 document.getElementById('simPrincipalLabel').textContent = state.sim.principal.toFixed(1) + '%';
 document.getElementById('simYearsLabel').textContent = state.sim.years.toFixed(1) + '%';
 document.getElementById('simCagrLabel').textContent = (state.sim.priceCagr >= 0 ? '+' : '') + state.sim.priceCagr.toFixed(1) + '%';

 document.getElementById('simEndingVal').textContent = '¥' + Math.round(rev27) + 'B';
 document.getElementById('simMoicVal').textContent = '¥' + Math.round(clcOp27) + 'B · ' + grpOpm27.toFixed(1) + '%';
 document.getElementById('simNetGainVal').textContent = (grpOp27 >= 0 ? '¥' : '-¥') + Math.abs(Math.round(grpOp27)) + 'B';
 document.getElementById('simMidVal').textContent = (newOp27 >= 0 ? '+¥' : '-¥') + Math.abs(Math.round(newOp27)) + 'B';

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < presetBtns.length; i++) presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
 if (!container) return;
 var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
 var doneCount = state.checks.filter(Boolean).length;
 var pct = Math.round((doneCount / itemsList.length) * 100);
 if (chip) chip.textContent = isEn() ? ('Tracked ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
 if (bar) bar.style.width = pct + '%';
 container.innerHTML = itemsList.map(function (item, idx) {
 var isChecked = !!state.checks[idx];
 return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
 '<div style="flex:1;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
 '<span class="check-title">' + escapeHtml(item.title) + '</span><span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
 '</div><p class="check-desc">' + escapeHtml(item.desc) + '</p></div></label>';
 }).join('');
 }

 state.ch1Series = { s1: true, s2: true };
 state.epsSeries = { eps: true, oci: true };
 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function getPalette() {
 var cs = getComputedStyle(document.documentElement), isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: cs.getPropertyValue('--chart-grid').trim() || (isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)'),
 tick: cs.getPropertyValue('--chart-tick').trim() || '#94A3B8',
 text: cs.getPropertyValue('--text-primary').trim() || '#F3F6F9',
 sub: cs.getPropertyValue('--text-secondary').trim() || '#B2BAC2',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.88)' : 'rgba(255, 255, 255, 0.94)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: cs.getPropertyValue('--chart-c1').trim() || '#3399FF',
 c2: cs.getPropertyValue('--chart-c2').trim() || '#22C55E',
 c3: cs.getPropertyValue('--chart-c3').trim() || '#FFB74D',
 c4: cs.getPropertyValue('--chart-c4').trim() || '#A78BFA',
 red: isDark ? '#FF6B6B' : '#DC2626'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var rect = canvas.parentElement.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
 canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h, canvas: canvas };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var radius = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + radius, y); ctx.lineTo(x + w - radius, y); ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
 ctx.lineTo(x + w, y + h - radius); ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
 ctx.lineTo(x + radius, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
 ctx.lineTo(x, y + radius); ctx.quadraticCurveTo(x, y, x + radius, y); ctx.closePath();
 }

 function topRoundedBar(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h);
 ctx.beginPath();
 ctx.moveTo(x, y + h); ctx.lineTo(x, y + rad); ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.lineTo(x + w - rad, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h); ctx.closePath();
 }

 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save();
 ctx.font = '700 11px "IBM Plex Mono", system-ui, sans-serif';
 var tw = ctx.measureText(text).width + 10, th = 18;
 ctx.fillStyle = pal.pillBg;
 roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5); ctx.fill();
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
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartCh1 = [];
 var metaEl = document.getElementById('ch1AxisMeta'), leg1 = document.getElementById('ch1Leg1'), leg2 = document.getElementById('ch1Leg2');

 if (state.ch1View === 'viewA') {
 if (metaEl) metaEl.innerHTML = en ? '<span style="color:var(--chart-c1);">■ Left Axis: Segment Revenue (¥B)</span><span style="color:var(--text-muted);">Q3 2026 Total Revenue ¥115.56B (+21.6% YoY)</span>' : '<span style="color:var(--chart-c1);">■ 左轴：分部季度营收 (¥B 人民币十亿元)</span><span style="color:var(--text-muted);">2026 Q3 总营收 ¥1,155.6亿 (新业务占比 32.3%)</span>';
 if (leg1) leg1.textContent = en ? 'Core Local Commerce Revenue (¥B)' : '核心本地商业营收 (¥B)';
 if (leg2) leg2.textContent = en ? 'New Initiatives Revenue (¥B)' : '新业务营收 (¥B)';

 var padA = { top: 26, right: 20, bottom: 44, left: 50 };
 var pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
 var labelsA = ['Q3 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
 var clcRev = [67.01, 64.06, 71.53, 78.28];
 var newRev = [28.05, 26.94, 33.11, 37.27];
 var totals = [95.06, 91.00, 104.64, 115.56];
 var maxY = 90.0;

 for (var g = 0; g <= 4; g++) {
 var val = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText('¥' + val.toFixed(0) + 'B', padA.left - 8, gy);
 }
 var stepA = pwA / labelsA.length, barW = Math.min(46, Math.max(22, stepA * 0.27));
 for (var i = 0; i < labelsA.length; i++) {
 var cx = padA.left + stepA * (i + 0.5);
 if (hoverState.chartCh1 === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padA.left + stepA * i + 6, padA.top, stepA - 12, phA, 8); ctx.fill(); }
 if (state.ch1Series.s1) {
 var h1 = (clcRev[i] / maxY) * phA, x1 = state.ch1Series.s2 ? (cx - barW - 4) : (cx - barW / 2), y1 = padA.top + phA - h1;
 var g1 = ctx.createLinearGradient(0, y1, 0, padA.top + phA); g1.addColorStop(0, '#3399FF'); g1.addColorStop(1, '#0066CC');
 ctx.fillStyle = g1; topRoundedBar(ctx, x1, y1, barW, h1, 6); ctx.fill();
 drawValueBadge(ctx, '¥' + clcRev[i].toFixed(1) + 'B', x1 + barW / 2, y1 - 12, pal.c1, pal);
 }
 if (state.ch1Series.s2) {
 var h2 = (newRev[i] / maxY) * phA, x2 = state.ch1Series.s1 ? (cx + 4) : (cx - barW / 2), y2 = padA.top + phA - h2;
 var g2 = ctx.createLinearGradient(0, y2, 0, padA.top + phA); g2.addColorStop(0, '#34D399'); g2.addColorStop(1, '#16A34A');
 ctx.fillStyle = g2; topRoundedBar(ctx, x2, y2, barW, h2, 6); ctx.fill();
 drawValueBadge(ctx, '¥' + newRev[i].toFixed(1) + 'B', x2 + barW / 2, y2 - 12, pal.c2, pal);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(labelsA[i], cx, padA.top + phA + 20);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.fillText((en ? 'Total ¥' : '总营收 ¥') + totals[i].toFixed(1) + 'B', cx, padA.top + phA + 35);
 hitRegions.chartCh1.push({
 idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 36,
 html: '<strong>' + labelsA[i] + '</strong><br/>• ' + (en ? 'CLC: ' : '核心商业: ') + '¥' + clcRev[i].toFixed(2) + 'B<br/>• ' + (en ? 'New Biz: ' : '新业务: ') + '¥' + newRev[i].toFixed(2) + 'B<br/>• ' + (en ? 'Total: ' : '合计: ') + '¥' + totals[i].toFixed(2) + 'B'
 });
 }
 } else {
 if (metaEl) metaEl.innerHTML = en ? '<span style="color:var(--chart-c1);">■ Left Axis: CLC Operating Profit (¥B)</span><span style="color:var(--chart-c2);">● Right Axis: CLC OPM (%)</span>' : '<span style="color:var(--chart-c1);">■ 左轴：核心商业经营利润 (¥B)</span><span style="color:var(--chart-c2);">● 右轴：核心商业利润率 (%)</span>';
 if (leg1) leg1.textContent = en ? 'CLC Operating Profit (¥B)' : '核心本地商业经营利润 (¥B)';
 if (leg2) leg2.textContent = en ? 'CLC Operating Margin (%)' : '核心本地商业经营利润率 (%)';

 var padB = { top: 28, right: 50, bottom: 38, left: 50 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var labelsB = ['Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
 var clcOp = [-14.07, -10.00, -2.03, 5.67, 5.70];
 var clcOpm = [-21.0, -14.8, -3.2, 7.9, 7.3];
 var minOp = -18, maxOp = 10, minM = -26, maxM = 14;

 for (var j = 0; j <= 4; j++) {
 var r = j / 4, yGrid = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yGrid); ctx.lineTo(padB.left + pwB, yGrid); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('¥' + (minOp + r * (maxOp - minOp)).toFixed(0) + 'B', padB.left - 7, yGrid);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minM + r * (maxM - minM)).toFixed(0) + '%', padB.left + pwB + 7, yGrid);
 }
 var zY = padB.top + phB - ((0 - minOp) / (maxOp - minOp)) * phB;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(padB.left, zY); ctx.lineTo(padB.left + pwB, zY); ctx.stroke();

 var stepB = pwB / labelsB.length, bW = Math.min(38, stepB * 0.44), pts = [];
 for (var k = 0; k < labelsB.length; k++) {
 var cxB = padB.left + stepB * (k + 0.5);
 if (hoverState.chartCh1 === k) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padB.left + stepB * k + 3, padB.top, stepB - 6, phB, 6); ctx.fill(); }
 if (state.ch1Series.s1) {
 var vy = padB.top + phB - ((clcOp[k] - minOp) / (maxOp - minOp)) * phB;
 var by = clcOp[k] >= 0 ? vy : zY, bh = Math.max(4, Math.abs(vy - zY));
 ctx.fillStyle = clcOp[k] >= 0 ? pal.c1 : pal.red;
 roundRectPath(ctx, cxB - bW / 2, by, bW, bh, 5); ctx.fill();
 }
 var ly = padB.top + phB - ((clcOpm[k] - minM) / (maxM - minM)) * phB;
 pts.push({ x: cxB, y: ly, opm: clcOpm[k] });
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(labelsB[k], cxB, padB.top + phB + 22);
 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
 html: '<strong>' + labelsB[k] + '</strong><br/>• ' + (en ? 'CLC Op. Profit: ' : '核心商业利润: ') + '¥' + clcOp[k].toFixed(2) + 'B<br/>• ' + (en ? 'CLC OPM: ' : '利润率: ') + clcOpm[k].toFixed(1) + '%'
 });
 }
 if (state.ch1Series.s2) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt) {
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 3.8, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, pt.opm.toFixed(1) + '%', pt.x, pt.y - 14, pal.c2, pal);
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartRadar = [];
 var axes = en ? ['Rider Density', 'In-Store & VIP', '1P Instashopping', 'AI & R&D Stack', 'Global / New Biz'] : ['履约调度密度', '到店酒旅与会员', '即时零售闪购', 'AI与无人机科技', '海外与新业务'];
 var pillarAxisMap = [0, 1, 3, 2], highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];
 var series = [
 { key: 'mo', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.6, 8.9, 9.2, 9.1, 8.2] },
 { key: 'pmi', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [8.4, 4.5, 8.0, 8.2, 7.8] },
 { key: 'ko', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [7.6, 8.6, 8.1, 8.5, 6.8] }
 ];
 var cx = w / 2, cy = h / 2 + 8, sidePad = w < 420 ? 86 : 104, radius = Math.max(62, Math.min((w - sidePad * 2) / 2, h * 0.35)), total = axes.length;

 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1; ctx.beginPath();
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
 ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.8 : 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = isHi ? pal.c1 : pal.text; ctx.font = (isHi ? '800 ' : '600 ') + (w < 420 ? '10.5px' : '11.5px') + ' system-ui, sans-serif'; ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
 html: '<strong>' + axes[a] + '</strong><br/>• Meituan: ' + series[0].vals[a] + '<br/>• DoorDash: ' + series[1].vals[a] + '<br/>• Rivals: ' + series[2].vals[a]
 });
 }
 series.forEach(function (item) {
 if (!state.radarSeries[item.key]) return;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total, dist = (item.vals[idx] / 10) * radius;
 if (idx === 0) ctx.moveTo(cx + Math.cos(theta) * dist, cy + Math.sin(theta) * dist);
 else ctx.lineTo(cx + Math.cos(theta) * dist, cy + Math.sin(theta) * dist);
 }
 ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartBars = [];
 var items = en ? [
 { label: 'Consolidated Gross Margin (Q3 2026)', val: 32.61, cStart: '#34D399', cEnd: '#16A34A', sub: '¥37.68B / ¥115.56B (+6.57ppt)', note: 'Rationalized delivery subsidies and higher AOV' },
 { label: 'Core Local Commerce Operating Margin (Q3 2026)', val: 7.30, cStart: '#3399FF', cEnd: '#0073E6', sub: '¥5.70B / ¥78.28B (vs. -21.0%)', note: 'Swung nearly ¥20B YoY; beat consensus' },
 { label: 'Group Operating Margin (Q3 2026)', val: 2.37, cStart: '#60A5FA', cEnd: '#2563EB', sub: '¥2.74B / ¥115.56B', note: 'Returned to GAAP operating profit' },
 { label: 'Core Local Commerce Revenue Share (Q3 2026)', val: 67.74, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '¥78.28B / ¥115.56B (+16.8%)', note: 'Delivery +25.3%, 1P Goods +75.8%' },
 { label: 'New Initiatives Revenue Share (Q3 2026)', val: 32.26, cStart: '#FBBF24', cEnd: '#D97706', sub: '¥37.27B / ¥115.56B (+32.9%)', note: 'Xiaoxiang 85 cities & Keeta Saudi profit' },
 { label: 'Selling & Marketing / Revenue Ratio (Q3 2026)', val: 23.38, cStart: '#38BDF8', cEnd: '#0284C7', sub: '¥27.02B (down from 35.6% YoY)', note: 'R&D ratio at 6.68% (¥7.72B)' }
 ] : [
 { label: '全集团综合毛利率 Gross Margin (Q3 2026)', val: 32.61, cStart: '#34D399', cEnd: '#16A34A', sub: '¥376.84亿 / ¥1,155.56亿 (+6.57ppt)', note: '外卖补贴理性化叠加客单价回升带动毛利大涨' },
 { label: '核心本地商业经营利润率 CLC OPM (Q3 2026)', val: 7.30, cStart: '#3399FF', cEnd: '#0073E6', sub: '¥57.04亿 / ¥782.82亿 (去年 -21.0%)', note: '同比减亏近200亿元，大幅超越市场预期' },
 { label: '集团整体经营利润率 Group OPM (Q3 2026)', val: 2.37, cStart: '#60A5FA', cEnd: '#2563EB', sub: '¥27.41亿 / ¥1,155.56亿', note: '含23亿公允价值收益，同比实现全面扭亏' },
 { label: '核心本地商业占总营收比重 CLC Mix (Q3 2026)', val: 67.74, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '¥782.82亿 (+16.8% YoY)', note: '配送+25.3%、自营商品+75.8%' },
 { label: '新业务占总营收比重 New Biz Mix (Q3 2026)', val: 32.26, cStart: '#FBBF24', cEnd: '#D97706', sub: '¥372.73亿 (+32.9% YoY)', note: '小象超市85城与Keeta沙特盈利拉动' },
 { label: '销售及营销费用率 S&M / Revenue (Q3 2026)', val: 23.38, cStart: '#38BDF8', cEnd: '#0284C7', sub: '¥270.20亿 (去年同期占 35.6%)', note: '同比大幅压降，研发费用率 6.68% (¥77.2亿)' }
 ];

 var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 80;
 for (var g = 0; g <= 4; g++) {
 var xVal = g * 20, gx = pad.left + (xVal / maxX) * pw;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = g === 0 ? 'left' : (g === 4 ? 'right' : 'center');
 ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
 }
 var rowH = ph / items.length;
 items.forEach(function (it, i) {
 var rowTop = pad.top + rowH * i;
 if (hoverState.chartBars === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left - 6, rowTop + 2, pw + 12, rowH - 4, 8); ctx.fill(); }
 var labelY = rowTop + Math.max(15, rowH * 0.34), barY = rowTop + Math.max(22, rowH * 0.50), barH = Math.min(15, Math.max(11, rowH * 0.26));
 var bw = Math.max(8, (it.val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 ' + (w < 460 ? '11px' : '12px') + ' system-ui, sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.label, pad.left, labelY);
 var valStr = it.val.toFixed(1) + '%';
 ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? it.cStart : it.cEnd; ctx.textAlign = 'right';
 ctx.fillText(valStr, pad.left + pw, labelY);
 if (w >= 560) {
 var valW = ctx.measureText(valStr).width + 10;
 ctx.font = '500 11px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.tick;
 ctx.fillText(it.sub, pad.left + pw - valW, labelY);
 }
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0); barGrad.addColorStop(0, it.cStart); barGrad.addColorStop(1, it.cEnd);
 ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();
 hitRegions.chartBars.push({ idx: i, x: pad.left, y: rowTop, w: pw, h: rowH, html: '<strong>' + it.label + ': ' + it.val.toFixed(2) + '%</strong><br/>• ' + it.sub + '<br/>• ' + it.note });
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartEps = [];
 var qtrs = ['Q3 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026', '2027E Q3'];
 var rev = [95.06, 91.00, 104.64, 115.56, 135.50];
 var opm = [-21.0, -3.2, 7.9, 7.3, 10.5];
 var pad = { top: 26, right: 50, bottom: 44, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var minR = 60, maxR = 150, minO = -25, maxO = 15;

 for (var g = 0; g <= 4; g++) {
 var ratio = g / 4, gy = pad.top + ph - ratio * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('¥' + (minR + ratio * (maxR - minR)).toFixed(0) + 'B', pad.left - 7, gy);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minO + ratio * (maxO - minO)).toFixed(0) + '%', pad.left + pw + 7, gy);
 }
 var zeroY = pad.top + ph - ((0 - minO) / (maxO - minO)) * ph;
 ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke(); ctx.restore();

 var step = pw / qtrs.length, barW = Math.min(46, step * 0.42), pts = [];
 qtrs.forEach(function (q, i) {
 var cx = pad.left + step * (i + 0.5);
 if (hoverState.chartEps === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 6); ctx.fill(); }
 if (state.epsSeries.eps) {
 var bh = ((rev[i] - minR) / (maxR - minR)) * ph, by = pad.top + ph - bh;
 var gE = ctx.createLinearGradient(0, by, 0, pad.top + ph);
 gE.addColorStop(0, i === 4 ? '#66B2FF' : '#3399FF'); gE.addColorStop(1, i === 4 ? '#1985F1' : '#0066CC');
 ctx.fillStyle = gE; topRoundedBar(ctx, cx - barW / 2, by, barW, bh, 6); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('¥' + rev[i].toFixed(0) + 'B', cx, by + 16);
 }
 pts.push({ x: cx, y: pad.top + ph - ((opm[i] - minO) / (maxO - minO)) * ph, v: opm[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(q, cx, pad.top + ph + 20);
 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 30,
 html: '<strong>' + q + '</strong><br/>• ' + (en ? 'Revenue: ' : '营收: ') + '¥' + rev[i].toFixed(2) + 'B<br/>• ' + (en ? 'CLC OPM: ' : '核心商业OPM: ') + opm[i].toFixed(1) + '%'
 });
 });
 if (state.epsSeries.oci) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt) {
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 3.8, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 15, pal.c2, pal);
 });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartSim = [];
 var clcG = state.sim.principal / 100, clcOpm = state.sim.years / 100, newLoss = state.sim.priceCagr / 100;
 var clc27 = 313.13 * (1 + clcG), new27 = 149.09 * 1.22, unalloc = -6.6;
 var baseTargetQ = (clc27 * clcOpm + new27 * newLoss + unalloc) / 4;
 var bonusTargetQ = (clc27 * (clcOpm + (state.sim.drip ? 0.015 : 0)) + new27 * (newLoss + (state.sim.drip ? 0.005 : 0)) + unalloc) / 4;

 var qtrs = ['Q3 26', 'Q4 26E', 'Q1 27E', 'Q2 27E', 'Q3 27E'];
 var baseArr = [], bonusArr = [];
 for (var i = 0; i < 5; i++) {
 baseArr.push(2.74 + (baseTargetQ - 2.74) * (i / 4));
 bonusArr.push(2.74 + (bonusTargetQ - 2.74) * (i / 4));
 }
 var maxVal = Math.max(12, Math.max.apply(null, bonusArr) * 1.18), minVal = Math.min(0, Math.min.apply(null, baseArr) - 2);
 var pad = { top: 20, right: 20, bottom: 28, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = minVal + ((maxVal - minVal) / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText('¥' + v.toFixed(0) + 'B', pad.left - 7, gy);
 }

 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.7; ctx.beginPath();
 for (var j = 0; j < 5; j++) {
 var px = pad.left + (j / 4) * pw, py = pad.top + ph - ((baseArr[j] - minVal) / (maxVal - minVal)) * ph;
 if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.stroke(); ctx.restore();

 var pts = bonusArr.map(function (v, idx) {
 return { x: pad.left + (idx / 4) * pw, y: pad.top + ph - ((v - minVal) / (maxVal - minVal)) * ph, v: v };
 });
 ctx.save(); drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[4].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph); ag.addColorStop(0, 'rgba(0, 115, 230, 0.28)'); ag.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
 ctx.fillStyle = ag; ctx.fill(); ctx.restore();

 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 var slot = pw / 4;
 pts.forEach(function (pt, idx) {
 ctx.fillStyle = pal.c1; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 4 || idx === 0) drawValueBadge(ctx, '¥' + pt.v.toFixed(1) + 'B', idx === 4 ? Math.min(w - 36, pt.x - 16) : pt.x + 14, pt.y - 13, pal.c1, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(qtrs[idx], pt.x, pad.top + ph + 19);
 hitRegions.chartSim.push({
 idx: idx, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 html: '<strong>' + qtrs[idx] + '</strong><br/>• ' + (en ? 'With AI/Scale: ' : '含提效路径: ') + '¥' + pt.v.toFixed(2) + 'B<br/>• ' + (en ? 'Base Path: ' : '基础路径: ') + '¥' + baseArr[idx].toFixed(2) + 'B'
 });
 });
 }

 var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 function handlePointer(clientX, clientY) {
 var rect = canvas.getBoundingClientRect(), mx = clientX - rect.left, my = clientY - rect.top;
 var regions = hitRegions[canvasId] || [], found = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { found = r; break; }
 }
 var nextIdx = found && typeof found.idx === 'number' ? found.idx : -1;
 if (hoverState[canvasId] !== nextIdx) { hoverState[canvasId] = nextIdx; if (redrawMap[canvasId]) redrawMap[canvasId](); }
 if (found) {
 tip.innerHTML = found.html; tip.style.display = 'block';
 var tipW = tip.offsetWidth || 250, tipH = tip.offsetHeight || 72;
 tip.style.left = (clientX + 14 + tipW > window.innerWidth - 12 ? Math.max(12, clientX - tipW - 14) : clientX + 14) + 'px';
 tip.style.top = Math.max(12, Math.min(window.innerHeight - tipH - 12, clientY - 18)) + 'px';
 } else tip.style.display = 'none';
 }
 canvas.addEventListener('mousemove', function (e) { handlePointer(e.clientX, e.clientY); });
 canvas.addEventListener('touchstart', function (e) { if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
 canvas.addEventListener('mouseleave', function () { if (hoverState[canvasId] !== -1) { hoverState[canvasId] = -1; if (redrawMap[canvasId]) redrawMap[canvasId](); } tip.style.display = 'none'; });
 }

 function exportStandaloneHtml() {
 var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var url = URL.createObjectURL(new Blob([htmlContent], { type: 'text/html;charset=utf-8' }));
 var link = document.createElement('a');
 link.href = url; link.download = 'Meituan_Q3_2026_Earnings_Report.html';
 document.body.appendChild(link); link.click(); document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast(isEn() ? 'Exported Meituan_Q3_2026_Earnings_Report.html' : '已导出独立网页 Meituan_Q3_2026_Earnings_Report.html');
 }

 function init() {
 var rawTheme = safeGetStorage(STORAGE_THEME_KEY), savedTheme = rawTheme ? String(rawTheme).replace(/^"|"$/g, '') : '';
 if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
 var rawLang = safeGetStorage(STORAGE_LANG_KEY), savedLang = rawLang ? String(rawLang).replace(/^"|"$/g, '') : '';
 if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;
 var savedChecks = safeGetStorage(STORAGE_CHECK_KEY);
 if (savedChecks) {
 try { var parsed = JSON.parse(savedChecks); if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) state.checks = parsed.map(Boolean); } catch (e) {}
 }

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
 }).join('') : '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">未匹配到对应章节</div>';
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

 document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 syncCh1HeaderText(); drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var panel = document.getElementById(this.getAttribute('data-collapse-target'));
 if (panel) { panel.classList.toggle('open'); syncCollapseButtonsText(); }
 });
 });
 var pillarCards = document.querySelectorAll('[data-pillar]');
 pillarCards.forEach(function (btn) {
 btn.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0; state.activePillar = idx;
 pillarCards.forEach(function (c, k) { c.classList.toggle('active', k === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[idx] + '</div>';
 drawRadarChart();
 });
 });
 document.querySelectorAll('[data-radar-key]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var key = this.getAttribute('data-radar-key'); state.radarSeries[key] = !state.radarSeries[key];
 if (!state.radarSeries.mo && !state.radarSeries.pmi && !state.radarSeries.ko) state.radarSeries[key] = true;
 this.classList.toggle('muted', !state.radarSeries[key]); drawRadarChart();
 });
 });

 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 var peerFilterBtns = document.querySelectorAll('[data-peer-filter]');
 peerFilterBtns.forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 peerFilterBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
 renderPeerTable();
 });
 });

 var pSlider = document.getElementById('simPrincipalSlider'), ySlider = document.getElementById('simYearsSlider'), cSlider = document.getElementById('simCagrSlider'), dToggle = document.getElementById('simDripToggle');
 pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 15; state.sim.preset = ''; updateSimulatorUI(); });
 ySlider.addEventListener('input', function () { state.sim.years = parseFloat(this.value) || 10.5; state.sim.preset = ''; updateSimulatorUI(); });
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
 var input = e.target.closest('[data-check-input]');
 if (!input) return;
 state.checks[parseInt(input.getAttribute('data-check-input'), 10)] = !!input.checked;
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true]; safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
 showToast(isEn() ? 'Checked all 6 watchlist criteria' : '已勾选全部 6 项财报跟踪核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false]; safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
 showToast(isEn() ? 'Checklist reset to baseline (50%)' : '核查清单已恢复默认基准状态 (50%)');
 });

 window.addEventListener('scroll', function () {
 var docEl = document.documentElement, maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, ((window.scrollY || docEl.scrollTop || 0) / maxScroll) * 100)) + '%';
 }, { passive: true });

 if ('IntersectionObserver' in window) {
 var secObserver = new IntersectionObserver(function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 for (var i = 0; i < tocLinks.length; i++) tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === entry.target.id);
 }
 });
 }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
 for (var s = 0; s <= 7; s++) { var secNode = document.getElementById('sec-0' + s); if (secNode) secObserver.observe(secNode); }
 }

 wireCanvasTooltip('chartCh1'); wireCanvasTooltip('chartRadar'); wireCanvasTooltip('chartBars'); wireCanvasTooltip('chartEps'); wireCanvasTooltip('chartSim');

 document.querySelectorAll('[data-ch1-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var sk = this.getAttribute('data-ch1-series'); state.ch1Series[sk] = !state.ch1Series[sk];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
 this.classList.toggle('muted', !state.ch1Series[sk]); drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-eps-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var ek = this.getAttribute('data-eps-series'); state.epsSeries[ek] = !state.epsSeries[ek];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[ek] = true;
 this.classList.toggle('muted', !state.epsSeries[ek]); drawEpsComboChart();
 });
 });

 var resizeTimer = null;
 window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(renderAllCharts, 60); });
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 