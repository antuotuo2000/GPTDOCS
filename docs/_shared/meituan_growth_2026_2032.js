
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

 var TITLE_ZH = '美团 2026–2032 未来战略与新增长曲线观测站 | 数据中心';
 var TITLE_EN = 'Meituan 2026–2032 Strategic Horizon & Growth Observatory | Research Hub';

 var state = {
 theme: 'light',
 lang: 'zh',
 activeHz: 0,
 activeEng: 0,
 fView: 'capex',
 sView: 'pen',
 pe: 18,
 silSeries: { mod: true, wf: true },
 hover: { futureCanvas: -1, siliconCanvas: -1, optMiniCanvas: -1 }
 };
 var hits = { futureCanvas: [], siliconCanvas: [], optMiniCanvas: [] };

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
 violet: dark ? '#A78BFA' : '#7C3AED',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 f0_lead: {
 zh: '走过 2025 年补贴大战的至暗时刻，王兴在 2026 年 3 月管理沟通会及财报电话会上正式定调：<strong>“坚决反对低质量内卷，主动‘去登味’重塑扁平组织，把 AI 视作一次‘物种级跃迁’”</strong> <a class="cite-link" href="https://finance.biggo.com/news/3RfY6pwBrdTHlKtCQnUc" target="_blank" rel="noopener noreferrer">2026 战略定调 ↗</a>。 当国内外云巨头每年砸下数千亿元追逐算力军备竞赛时，美团拒绝成为单纯烧钱的“Token 工厂”，而是将 <strong>LongCat-2.5（1.6万亿参数多模态 MoE）</strong> <a class="cite-link" href="https://technode.com/2026/11/02/meituan-launches-longcat-2-5-multimodal-ai-model-for-extended-coding-tasks/" target="_blank" rel="noopener noreferrer">LongCat-2.5 发布 ↗</a>、<strong>小团/小美双轨 Agent</strong> 与 <strong>90万+ 无人机订单 / 550万+ 无人车订单</strong>的真实履约场景深度咬合；同时海外品牌 <strong>Keeta</strong> 已在 2026 年 7 月实现沙特盈利并向巴西 32 城扩张 <a class="cite-link" href="https://eu.36kr.com/en/p/3993841325849352" target="_blank" rel="noopener noreferrer">Keeta 沙特盈利 ↗</a>，国内小象超市（68城）联合并购而来的叮咚买菜加速构筑生鲜零售第二曲线。',
 en: 'Emerging from 2025\'s brutal subsidy war, CEO Wang Xing set a decisive 2026 course: <strong>"Firmly oppose low-quality involution, flatten hierarchy (reducing \'Deng flavor\'), and treat AI as a species-level leap"</strong> <a class="cite-link" href="https://finance.biggo.com/news/3RfY6pwBrdTHlKtCQnUc" target="_blank" rel="noopener noreferrer">2026 Pivot ↗</a>. Rather than burning billions as a generic "token factory," Meituan pairs <strong>LongCat-2.5 (1.6T multimodal MoE)</strong> <a class="cite-link" href="https://technode.com/2026/11/02/meituan-launches-longcat-2-5-multimodal-ai-model-for-extended-coding-tasks/" target="_blank" rel="noopener noreferrer">LongCat-2.5 ↗</a> and <strong>Xiao Tuan / Xiao Mei Agents</strong> with <strong>900k+ drone</strong> and <strong>5.5M+ autonomous vehicle orders</strong>; meanwhile, <strong>Keeta</strong> turned profitable in Saudi Arabia in July 2026 and expanded to 32 Brazilian cities <a class="cite-link" href="https://eu.36kr.com/en/p/3993841325849352" target="_blank" rel="noopener noreferrer">Keeta Profitable ↗</a>.'
 },
 f2_caption: {
 zh: '战略反差：国内阿里/腾讯/百度三大云巨头 2026H1 合计 CapEx 飙升至逾 ¥2,080亿（自由现金流一度转负），而美团全年 CapEx 仅 <strong>¥132.7亿（占营收 ~3.6%）</strong>，将核心资源集中在 <strong>¥260亿+ 级软件/物理 AI 研发</strong>与真实履约场景闭环，避免陷入重资产 GPU 折旧泥潭。',
 en: 'Strategic Contrast: Alibaba, Tencent, and Baidu spent ¥208B in H1 2026 CapEx alone (pushing combined FCF negative), whereas Meituan kept annual CapEx at <strong>¥13.27B (~3.6% of sales)</strong>—concentrating <strong>¥26B+ R&amp;D</strong> on Physical AI and real-world fulfillment.'
 },
 f3_m5: {
 zh: '累计商业订单已突破 <strong>90万单</strong>（70+ 航线覆盖深圳/香港/迪拜），M-Drone 4L 搭载禾赛固态雷达可覆盖 97% 城市复杂场景 <a class="cite-link" href="https://finance.biggo.com/news/zSD9Xp4BaoGGrU-I0DM2" target="_blank" rel="noopener noreferrer">无人机里程碑 ↗</a>。',
 en: 'Surpassed <strong>900,000 commercial orders</strong> (70+ routes across Shenzhen/HK/Dubai); M-Drone 4L with Hesai LiDAR covers 97% of urban scenarios <a class="cite-link" href="https://finance.biggo.com/news/zSD9Xp4BaoGGrU-I0DM2" target="_blank" rel="noopener noreferrer">Drone Milestone ↗</a>.'
 },
 f3_c1x: {
 zh: '截至 2025 年底累计完成 <strong>550万+ 室外全场景订单</strong>，自动驾驶里程突破 <strong>1,900万公里</strong>，高峰期人机协同缓解运力波峰 <a class="cite-link" href="https://www.coherentmarketinsights.com/industry-reports/autonomous-delivery-vehicles-market" target="_blank" rel="noopener noreferrer">无人车数据 ↗</a>。',
 en: 'Completed <strong>5.5M+ outdoor autonomous orders</strong> and <strong>19M+ km</strong> driven by end-2025, blending with human riders at peak hours <a class="cite-link" href="https://www.coherentmarketinsights.com/industry-reports/autonomous-delivery-vehicles-market" target="_blank" rel="noopener noreferrer">AV Data ↗</a>.'
 },
 f3_n1: {
 zh: '2026 年 11 月发布 <strong>LongCat-2.5</strong>（1.6万亿总参数/48B 激活），专攻长程代码、视觉理解与多步自主 Agent 任务 <a class="cite-link" href="https://www.opensourceforu.com/2026/11/meituan-longcat-2-5-ai-model/" target="_blank" rel="noopener noreferrer">LongCat-2.5 ↗</a>。',
 en: 'Released <strong>LongCat-2.5</strong> in Nov 2026 (1.6T total / 48B active MoE) for extended coding, vision, and multi-step agent tasks <a class="cite-link" href="https://www.opensourceforu.com/2026/11/meituan-longcat-2-5-ai-model/" target="_blank" rel="noopener noreferrer">LongCat-2.5 ↗</a>.'
 },
 f3_caption: {
 zh: '商业验证：Keeta 仅用 22 个月即在沙特实现盈利（2026 年 7 月），圣保罗法院打破竞对排他协议后巴西一口气扩至 32 城、下载破千万 <a class="cite-link" href="https://www.bastillepost.com/global/article/6229785-keeta-expands-brazil-coverage-to-32-cities-with-21-new-launches-reaching-10-million-app-downloads" target="_blank" rel="noopener noreferrer">巴西32城扩张 ↗</a>；中东与拉美高客单价恰可反哺无人履约商业化。',
 en: 'Commercial Proof: Keeta hit profitability in Saudi Arabia in 22 months (Jul 2026) and scaled to 32 Brazilian cities (10M+ downloads) <a class="cite-link" href="https://www.bastillepost.com/global/article/6229785-keeta-expands-brazil-coverage-to-32-cities-with-21-new-launches-reaching-10-million-app-downloads" target="_blank" rel="noopener noreferrer">Brazil Expansion ↗</a>—high overseas AOVs help fund autonomous rollout.'
 }
 };

 var HORIZONS = [
 {
 badge: 'HORIZON 1 · PROFIT REPAIR & RETAIL CONSOLIDATION (2026–2027)',
 badgeZh: 'HORIZON 1 · 盈利修复与前置仓并购整合期 (2026–2027)',
 titleZh: '外卖单均 UE 修复 × 叮咚买菜整合 × Keeta 海湾国家盈利闭环',
 titleEn: 'Delivery UE Repair × Dingdong Integration × Keeta GCC Breakeven',
 itemsZh: [
 '<strong>国内利润强修复：</strong>补贴战降温推动 Q2 2026 迅速扭亏（净利 ¥22亿），2027 年外卖 UE 有望重回 ¥1.0–¥1.2/单稳态。',
 '<strong>小象+叮咚双仓共振：</strong>整合 $7.17亿 收购的叮咚买菜华东供应链，小象超市加速下沉至 68 城+ 并探索线下实体大店。',
 '<strong>Keeta 中东筑底：</strong>继香港稳定盈利、沙特 2026 年 7 月盈利后，卡塔尔与阿联酋进入单量爬坡收窄亏损通道。'
 ],
 itemsEn: [
 '<strong>Domestic Profit Rebound:</strong> Easing subsidy wars drove Q2 2026 profitability (¥2.2B net), paving the way toward ¥1.0–¥1.2/order UE in 2027.',
 '<strong>Xiaoxiang + Dingdong Synergy:</strong> Integrating $717M Dingdong Fresh strengthens East China sourcing as Xiaoxiang scales across 68+ cities.',
 '<strong>Keeta Middle East Base:</strong> Following HK and Saudi (Jul 2026) profitability, Qatar and UAE enter scale-efficiency phase.'
 ],
 probZh: '兑现确定性：极高 (85%+)', probEn: 'Conviction: Very High (85%+)',
 impactZh: '年化增量营收池：+¥90B–¥130B', impactEn: 'Incremental Pool: +¥90B–¥130B/yr'
 },
 {
 badge: 'HORIZON 2 · GLOBAL SCALE & PHYSICAL AI MONETIZATION (2028–2029)',
 badgeZh: 'HORIZON 2 · 海外盈亏平衡与物理 AI 变现期 (2028–2029)',
 titleZh: '巴西 32 城规模效应 × 闪购冲刺 5,000 亿 GMV × ToA 代理结算',
 titleEn: 'Brazil 32-City Scale × ¥500B Instashop GMV × ToA Agent Monetization',
 itemsZh: [
 '<strong>巴西避锋突围见效：</strong>避开圣保罗核心红海，深耕米纳斯吉拉斯等二线城市群，推动 Keeta 拉美板块迈过盈亏平衡线。',
 '<strong>闪购万物到家扩利：</strong>美团闪购通过“Product NEXT”深度绑定品牌商，3C/医药/酒水高客单进一步摊薄骑手社保固定成本。',
 '<strong>小美/小团全面渗透：</strong>C 端语音直达下单与 B 端“数字员工”SaaS 订阅开启直接软件增值收费。'
 ],
 itemsEn: [
 '<strong>Brazil Mid-Tier Strategy:</strong> Targeting underserved mid-tier cities drives Keeta LatAm toward operating breakeven.',
 '<strong>Instashop Scale Leverage:</strong> High-AOV 3C, pharmacy, and alcohol orders offset rider insurance costs across the shared fleet.',
 '<strong>Xiao Mei &amp; Merchant SaaS:</strong> Voice-to-order AI agents and Digital Employee tools unlock high-margin software monetization.'
 ],
 probZh: '兑现确定性：中高 (70%)', probEn: 'Conviction: High (70%)',
 impactZh: '年化增量营收池：+¥160B–¥220B', impactEn: 'Incremental Pool: +¥160B–¥220B/yr'
 },
 {
 badge: 'HORIZON 3 · AUTONOMOUS LOGISTICS & EMBODIED RETAIL (2030–2032)',
 badgeZh: 'HORIZON 3 · 低空无人履约与具身智能奇点期 (2030–2032)',
 titleZh: '百万级无人机/无人车日常化 × 具身机器人药房仓配 × 硬科技收获',
 titleEn: 'Million-Scale Drone/AV Grid × Embodied Pharmacy Sorting × Tech Harvest',
 itemsZh: [
 '<strong>无人履约成本拐点：</strong>M-Drone 4L 与无人车承担夜间、高校园区及跨江跨海高溢价/低密度配送，显著压低单均履约费。',
 '<strong>具身智能落地履约：</strong>宇树科技等被投企业机器人已在美团合作药房实现 24 小时自动分拣，向闪电仓前置分拣全面复制。',
 '<strong>硬科技战投池变现：</strong>智谱 AI、宇树科技、月之暗面等独角兽陆续上市或分红，反哺美团持续回购注销股本。'
 ],
 itemsEn: [
 '<strong>Autonomous Cost Inflection:</strong> M-Drone 4L and AVs absorb night, campus, and hard-to-reach orders, structurally lowering delivery cost.',
 '<strong>Embodied AI Warehousing:</strong> Unitree robots deployed in partner pharmacies for 24/7 sorting expand into Lightning Warehouses.',
 '<strong>Tech Portfolio Harvest:</strong> IPOs and monetization across Zhipu AI, Unitree, and Moonshot fund accelerated share buybacks.'
 ],
 probZh: '兑现确定性：远期期权 (50%)', probEn: 'Conviction: Optionality (50%)',
 impactZh: '年化增量利润池：+¥25B–¥40B+', impactEn: 'Incremental Profit: +¥25B–¥40B+/yr'
 }
 ];

 function renderHorizon(idx) {
 state.activeHz = idx;
 var hz = HORIZONS[idx] || HORIZONS[0];
 var en = isEn();
 document.getElementById('hzBadge').textContent = en ? hz.badge : hz.badgeZh;
 document.getElementById('hzTitle').textContent = en ? hz.titleEn : hz.titleZh;
 var items = en ? hz.itemsEn : hz.itemsZh;
 document.getElementById('hzList').innerHTML = items.map(function (t) {
 return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
 }).join('');
 document.getElementById('hzProb').textContent = en ? hz.probEn : hz.probZh;
 document.getElementById('hzImpact').textContent = en ? hz.impactEn : hz.impactZh;
 }

 var ENGINES = [
 {
 badge: 'ENGINE 01 · PHYSICAL AI & DUAL-TRACK AGENT GATEWAY',
 titleZh: 'Physical AI 基础设施：LongCat-2.5 基座 × 小团/小美双轨 Agent × 腾讯元宝 ToA 联动',
 titleEn: 'Physical AI Infra: LongCat-2.5 × Xiao Tuan/Xiao Mei × Tencent Yuanbao ToA',
 descZh: '2026 年美团成立独立 AI 转型部门向王莆中汇报，并确立“消费端双轨 + 生态开放”打法：App 内嵌“小团”负责复杂比价、凑单与健康问诊，独立应用“小美”实现一句话语音直达下单，同时封装“跑腿 Skill”接入腾讯元宝等外部大模型对话入口（ToA）。无论流量入口在何处，只要涉及线下物理世界履约，结算终局均回流美团。',
 descEn: 'In 2026 Meituan formed a dedicated AI Transformation Dept under Wang Puzhong with a dual-track C-end strategy: in-app Xiao Tuan handles complex price comparison and health queries, standalone Xiao Mei executes voice-to-order tasks, and Errand Skill plugs into Tencent Yuanbao (ToA) so external AI traffic still settles on Meituan\'s grid.',
 formulaZh: '变现双轮：(1) AI 智能推荐提升广告 ROI 与下单转化率 + (2) B 端“智掌柜/数字员工”商户 SaaS 增收 + 内部研发降本',
 formulaEn: 'Dual Monetization: (1) Higher ad ROI &amp; order conversion + (2) B-end Smart Shopkeeper SaaS &amp; internal R&amp;D leverage',
 gaugesZh: [['1.6T 参数', 'LongCat-2.5 多模态 MoE 模型'], ['95%+ 代码', 'CatPaw 内部 AI 编程渗透率'], ['ToA 开放', '小美接入腾讯元宝超级入口'], ['¥260亿+', '年化研发投入筑牢物理 AI 底座']],
 gaugesEn: [['1.6T Params', 'LongCat-2.5 Multimodal MoE'], ['95%+ Code', 'Internal CatPaw AI Adoption'], ['ToA Open', 'Xiao Mei Inside Tencent Yuanbao'], ['¥26B+ R&amp;D', 'Annual Tech Spend Anchoring Moat']]
 },
 {
 badge: 'ENGINE 02 · KEETA GLOBAL FOOD & INSTANT DELIVERY',
 titleZh: 'Keeta 出海第二曲线：22个月攻克沙特盈利，借反垄断东风加速巴西 32 城',
 titleEn: 'Keeta Global: Saudi Profitability in 22 Months &amp; 32-City Brazil Surge',
 descZh: '面对国内餐饮外卖饱和，美团把经过 9,000 万日单锤炼的超脑调度系统输出至高客单价海外市场：香港稳居第一且持续盈利；沙特 2024 年 9 月上线后仅用 22 个月即在 2026 年 7 月实现单月盈利；随后同步切入卡塔尔与阿联酋冲击本地龙头 Talabat，并在圣保罗法院推翻竞对排他协议后迅速将巴西覆盖扩至 32 座城市。',
 descEn: 'Exporting its 90M-order/day dispatch tech to high-AOV overseas markets: Keeta is #1 and profitable in Hong Kong, turned profitable in Saudi Arabia in July 2026 (22 months post-launch), is challenging Talabat in Qatar/UAE, and expanded to 32 Brazilian cities after courts struck down rival exclusivity.',
 formulaZh: '海外盈利逻辑：海外外卖客单价与佣金抽成远高于国内（2x–3x），一旦突破骑手网格临界密度，单均利润弹性极高',
 formulaEn: 'Overseas Economics: 2x–3x higher AOV and take-rates abroad yield superior unit profit once courier density crosses threshold',
 gaugesZh: [['22个月', '沙特上线至实现盈利耗时 (2026.07)'], ['32座城', '2026.10 巴西覆盖城市数 (10M+下载)'], ['R$56亿', '巴西市场中长期战略投入规划'], ['#1 香港', '首个境外市场已实现稳定盈利']],
 gaugesEn: [['22 Mos', 'Saudi Launch to Profitability (Jul 26)'], ['32 Cities', 'Brazil Footprint (10M+ Downloads)'], ['R$5.6B', 'Brazil Multi-Year Investment Plan'], ['#1 in HK', 'First Overseas Market Sustainably Profitable']]
 },
 {
 badge: 'ENGINE 03 · XIAOXIANG SUPERMARKET + DINGDONG FRESH',
 titleZh: '自营生鲜零售整合：小象超市（68城）+ $7.17亿并购叮咚买菜构筑供应链壁垒',
 titleEn: '1P Grocery Consolidation: Xiaoxiang (68 Cities) + $717M Dingdong Acquisition',
 descZh: '经历美团优选战略收缩后，美团将资源全力倾注于确定性更高的“前置仓即时生鲜”：小象超市已从 20 城（2025年中）跃升至 68 城（2026 Q2），并开设线下实体大店；2026 年 2 月更斥资 $7.17亿 收购叮咚买菜，直接囊括其华东高密度前置仓网与百余个农业直采基地，联手“歪马送酒”与自有品牌重塑生鲜毛利结构。',
 descEn: 'After scaling back Meituan Select, Meituan concentrated capital on front-warehouse grocery: Xiaoxiang expanded from 20 cities (mid-2025) to 68 cities (Q2 2026) plus offline stores, while the $717M Feb 2026 Dingdong acquisition secured dense East China supply chains and private-label scale.',
 formulaZh: '变现逻辑：合并采购议价权 + 产地直采降损耗 + 高毛利自有品牌（Private Label）推动自营零售净利率转正',
 formulaEn: 'Monetization: Combined procurement scale + direct farm sourcing + high-GM private labels drive 1P grocery profitability',
 gaugesZh: [['68城', 'Q2 2026 小象超市覆盖城市规模'], ['$7.17亿', '2026.02 收购叮咚买菜全部股权'], ['1,000+仓', '前置仓高密度30分钟极速履约'], ['25% YoY', 'Q2 2026 新业务板块营收加速']],
 gaugesEn: [['68 Cities', 'Q2 2026 Xiaoxiang City Coverage'], ['$717M', 'Feb 2026 Dingdong Fresh Buyout'], ['1,000+ Hubs', '30-Min Front-Warehouse Grid'], ['25% YoY', 'Q2 2026 New Initiatives Growth']]
 },
 {
 badge: 'ENGINE 04 · INSTASHOPPING & LIGHTNING WAREHOUSES',
 titleZh: '美团闪购“万物到家”：轻资产平台模式复刻 1,000万+ 日单非餐帝国',
 titleEn: 'Meituan Instashopping: Asset-Light 3P Platform Scaling 10M+ Daily Non-Food Orders',
 descZh: '不同于小象超市的自营重资产，美团闪购采用纯平台模式赋能数百万线下商超、药店、3C 门店及前置“闪电仓”，在 2026 年推出“Product NEXT”计划赋能第三方商家选品研发。闪购日订单已超 1,000 万单，年 GMV 迈向 ¥3,500亿–¥5,000亿区间，且高客单价（手机/数码/美妆/酒水）能完美填补下午与夜间骑手闲置运力。',
 descEn: 'Unlike 1P Xiaoxiang, 3P Instashopping empowers millions of pharmacies, electronics stores, and Lightning Warehouses (plus the Sep 2026 "Product NEXT" program). Processing 10M+ daily orders toward ¥350B–¥500B GMV, high-AOV non-food fills off-peak courier capacity.',
 formulaZh: '变现逻辑：不承担库存与重资产折旧，坐收技术服务佣金 + 品牌商家竞价广告费，同时拉高骑手全天人效',
 formulaEn: 'Monetization: Zero inventory risk—collects 3P commissions &amp; brand ads while boosting full-day courier utilization',
 gaugesZh: [['1,000万+', '美团闪购日均非餐履约单量'], ['¥3,500亿+', '年度交易 GMV 迈向五千亿级'], ['零库存风险', '纯平台与闪电仓轻资产高速复制'], ['15分钟达', '歪马送酒等垂类800+直营门店']],
 gaugesEn: [['10M+ / day', 'Daily Non-Food Instashop Orders'], ['¥350B+', 'Annual GMV Scaling Toward ¥500B'], ['Zero Inventory', 'Asset-Light 3P Lightning Warehouses'], ['15-Min Wine', 'Waima 800+ Direct Alcohol Outlets']]
 },
 {
 badge: 'ENGINE 05 · M-DRONE 4L & AUTONOMOUS FLEET',
 titleZh: '地空一体无人履约：90万+无人机单量与 1,900万公里无人车构筑终局成本护城河',
 titleEn: 'Air-Ground Autonomy: 900k+ Drone Orders &amp; 19M+ km AVs Redefining Fulfillment Cost',
 descZh: '随着骑手职业伤害保障与社保全面落地，长期人工履约成本呈刚性上升。美团自 2017 年起由毛一年带队深耕无人机（直报王兴），至 2026 年 5 月商业无人机订单突破 90 万单（M-Drone 4L 覆盖 97% 城市复杂场景并落地香港与迪拜），室外无人车累计完成 550 万+ 订单，形成“空中无人机+地面无人车+人类骑手”的混合立体运力网。',
 descEn: 'As rider social insurance raises fixed labor costs, autonomous delivery becomes vital. Direct-to-CEO drone ops surpassed 900k commercial orders by May 2026 (M-Drone 4L covers 97% of urban sites across Shenzhen, HK &amp; Dubai), alongside 5.5M+ outdoor AV orders.',
 formulaZh: '经济拐点：低空航线常态化 + 无人车夜班/园区接驳 → 将高人力成本区块的履约成本压低 30%–50%',
 formulaEn: 'Cost Inflection: Routine drone corridors + AV campus/night shuttles cut fulfillment cost by 30%–50% in high-wage zones',
 gaugesZh: [['90万+单', '截至 2026.05 商业无人机累计单量'], ['97%场景', 'M-Drone 4L 悬停索降城市适配率'], ['550万+单', '室外全场景无人配送车累计订单'], ['1,900万km', '真实城市复杂路况自动驾驶里程']],
 gaugesEn: [['900k+ Orders', 'Commercial Drone Orders (May 26)'], ['97% Urban', 'M-Drone 4L Winch Scenario Coverage'], ['5.5M+ Orders', 'Outdoor Autonomous Vehicle Deliveries'], ['19M+ km', 'Real-World Urban Autonomous Mileage']]
 },
 {
 badge: 'ENGINE 06 · ¥77.3B HARD-TECH EQUITY & EMBODIED ROBOTICS',
 titleZh: '硬科技产业投资飞轮：以 2,800 县区真实场景孵化 ¥773亿 独角兽股权矩阵',
 titleEn: 'Hard-Tech Equity Flywheel: ¥77.3B Portfolio Powered by Real-World Scenarios',
 descZh: '美团战投与龙珠资本过去 8 年围绕大模型、具身智能、激光雷达与智能汽车投资 40+ 家硬科技公司（含 28 家独角兽、7 家已上市），截至 2026 Q2 投资组合公允价值高达 ¥773 亿。核心逻辑不是纯财务套利，而是“场景换股权”：宇树机器人已进驻美团合作药房 24 小时分拣药品，禾赛雷达直接搭载于美团无人机与无人车。',
 descEn: 'Over 8 years, Meituan and LongZhu Capital backed 40+ hard-tech firms (28 unicorns, 7 listed) worth ¥77.3B by Q2 2026. Beyond capital, Meituan offers real-world testing grounds: Unitree robots sort meds 24/7 in partner pharmacies, and Hesai LiDAR powers Meituan drones.',
 formulaZh: '生态反哺：美团庞大线下场景加速被投企业商业化（如宇树 73 天极速过会科创板），被投企业股权增值反哺美团估值安全垫',
 formulaEn: 'Ecosystem Loop: Meituan\'s grid accelerates portfolio commercialization (e.g., Unitree\'s 73-day STAR IPO review) &amp; boosts NAV',
 gaugesZh: [['¥773亿', 'Q2 2026 投资组合账面公允价值'], ['40+家 / 28独角兽', '大模型/具身智能/芯片/智驾全覆盖'], ['9.65% 宇树', '第一大外部股东（药房分拣已商用）'], ['~4% 智谱 + 12.7% 理想', 'Q1 2026 单季录得 ¥76亿 公允增值']],
 gaugesEn: [['¥77.3B', 'Q2 2026 Portfolio Fair Value'], ['40+ / 28 Unicorns', 'AI, Robotics, Chips &amp; EV Coverage'], ['9.65% Unitree', 'Largest External Holder (Live in Pharmacies)'], ['Zhipu + Li Auto', '¥7.6B Q1 Fair-Value Gain on Zhipu']]
 }
 ];

 function renderEngine(idx) {
 state.activeEng = idx;
 var eg = ENGINES[idx] || ENGINES[0];
 var en = isEn();
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').innerHTML = en ? eg.titleEn : eg.titleZh;
 document.getElementById('engDesc').textContent = en ? eg.descEn : eg.descZh;
 document.getElementById('engFormula').innerHTML = en ? eg.formulaEn : eg.formulaZh;
 var gs = en ? eg.gaugesEn : eg.gaugesZh;
 document.getElementById('engGauges').innerHTML = gs.map(function (g) {
 return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
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
 var sl = document.getElementById('sideThemeLightBtn'), sd = document.getElementById('sideThemeDarkBtn');
 if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
 if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
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
 if (val.indexOf('<span') !== -1 || val.indexOf('&') !== -1) nodes[i].innerHTML = val;
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

 renderHorizon(state.activeHz);
 renderEngine(state.activeEng);
 renderFutureLegend();
 renderSiliconLegend();
 drawAll();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var bs = hzTabs.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderHorizon(parseInt(b.getAttribute('data-hz'), 10) || 0);
 });
 }

 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 var bs = rail.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderEngine(parseInt(b.getAttribute('data-eng'), 10) || 0);
 });
 }

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
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function renderFutureLegend() {
 var leg = document.getElementById('futureLegend');
 if (!leg) return;
 var en = isEn();
 if (state.fView === 'capex') {
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'Meituan CapEx ¥13.3B (3.6% of Sales) vs. Hyperscaler AI Cloud CapEx' : '美团 CapEx 仅 ¥13.3B (3.6% 营收占比) vs 云巨头重资产算力军备竞赛') + '</span>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'FY2025 (¥364.9B) → FY2032E (~¥785B) Multi-Horizon Bridge' : 'FY2025 (¥364.9B) → FY2032E (~¥785B) 多曲线营收增量阶梯') + '</span>';
 }
 }

 function renderSiliconLegend() {
 var leg = document.getElementById('siliconLegend');
 if (!leg) return;
 var en = isEn();
 if (state.sView === 'pen') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.silSeries.mod ? '' : ' muted') + '" data-sil-series="mod"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Autonomous Vehicles (M Orders)' : '室外无人车累计单量 (百万单)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.silSeries.wf ? '' : ' muted') + '" data-sil-series="wf"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Commercial Drones (M Orders)' : '商业无人机累计单量 (百万单)') + '</span></button>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'Keeta Global Revenue Scaling Trajectory (¥B)' : 'Keeta 海外外卖与即时零售营收爬坡推演 (¥B)') + '</span>';
 }
 }

 var silLegEl = document.getElementById('siliconLegend');
 if (silLegEl) {
 silLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-sil-series]');
 if (!b) return;
 var k = b.getAttribute('data-sil-series');
 state.silSeries[k] = !state.silSeries[k];
 if (!state.silSeries.mod && !state.silSeries.wf) state.silSeries[k] = true;
 renderSiliconLegend();
 drawSiliconCanvas();
 });
 }

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var peers = [
 { name: en ? 'BAT (H1 26 Sum)' : '阿里/腾讯/百度(H1)', cap: 208.0, col: pal.amber, tip: en ? 'Rhodium Group: Alibaba, Tencent &amp; Baidu combined H1 2026 CapEx reached ¥208B, pushing combined FCF negative (-¥16B)' : '荣鼎咨询数据：三大国内云巨头仅 2026H1 资本开支已达 ¥2,080亿，合计 FCF 一度转负' },
 { name: en ? 'ByteDance (Est)' : '字节跳动 (AI)', cap: 160.0, col: pal.violet, tip: en ? 'Aggressive AI training &amp; GPU cluster buildout across Doubao &amp; cloud' : '豆包与算力集群高强度资本开支投入' },
 { name: en ? 'Meituan R&D' : '美团 FY25 研发', cap: 26.0, col: pal.blue, tip: en ? 'FY2025 R&amp;D ¥26.0B (+23% YoY): LongCat-2.5, drones, AVs &amp; dispatch AI' : 'FY2025 全年研发费用 ¥260亿 (+23% YoY)，聚焦物理世界 AI 与无人机' },
 { name: en ? 'Meituan CapEx' : '美团 CapEx', cap: 13.3, col: pal.green, tip: en ? 'FY2025 CapEx just ¥13.27B (~3.6% of sales)—refusing the heavy-asset token-factory trap' : 'FY2025 全年 CapEx 仅 ¥132.7亿（占营收 ~3.6%），坚持轻资产物理 AI 路线' }
 ];
 var maxC = 230;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(48, slot * 0.54);
 peers.forEach(function (p, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 if (state.hover.futureCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.futureCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + p.cap.toFixed(1) + 'B', cx, yt - 12, p.col, pal);
 ctx.fillStyle = i >= 2 ? pal.green : pal.sub; ctx.font = (i >= 2 ? 'bold ' : '600 ') + '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(p.name, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: p.name, body: p.tip });
 });
 } else {
 var steps = [
 { lbl: en ? 'FY25 Base' : 'FY25基准', v: 364.9, b: 0, col: pal.blue, tip: en ? 'FY2025 Actual Revenue: ¥364.9B (+8.1% YoY)' : 'FY2025 实际总营收: ¥364.9B (+8.1% YoY)' },
 { lbl: en ? '+Core CLC' : '+核心本地修复', v: 135.0, b: 364.9, col: pal.green, tip: en ? 'Organic delivery recovery, In-Store &amp; Hotel growth: +¥135B' : '外卖稳态增长、到店酒旅与广告自然复利贡献 +¥135B' },
 { lbl: en ? '+Instashop' : '+闪购/小象叮咚', v: 145.0, b: 499.9, col: pal.violet, tip: en ? 'Instashopping + Xiaoxiang 68 cities + Dingdong Fresh: +¥145B' : '美团闪购、小象超市68城与叮咚买菜整合贡献 +¥145B' },
 { lbl: en ? '+Keeta' : '+Keeta出海', v: 98.0, b: 644.9, col: pal.amber, tip: en ? 'Keeta across GCC (Saudi/Qatar/UAE) &amp; LatAm (Brazil): +¥98B' : 'Keeta 中东海湾国家与巴西拉美市场贡献 +¥98B' },
 { lbl: en ? '+AI/Auto' : '+物理AI与SaaS', v: 42.0, b: 742.9, col: pal.green, tip: en ? 'Physical AI ToA, Merchant SaaS &amp; Autonomous Logistics: +¥42B' : 'Physical AI、商户SaaS与无人履约对外输出贡献 +¥42B' },
 { lbl: en ? 'FY32E Target' : 'FY32E蓝图', v: 784.9, b: 0, col: pal.blue, tip: en ? 'FY2032E Horizon Target: ~¥785B diversified local &amp; global commerce' : 'FY2032E 远期营收蓝图: ~¥785B 全球本地零售与物理AI底座' }
 ];
 var maxB = 860;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var cx = pad.left + i * sW + sW / 2, x = cx - bW / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
 var yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 if (state.hover.futureCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * sW + 3, pad.top, sW - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 if (state.hover.futureCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, (s.b > 0 ? '+' : '') + '¥' + s.v.toFixed(0) + 'B', cx, yt - 12, s.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(s.lbl, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * sW, y: pad.top, w: sW, h: ph + 26, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E'];

 if (state.sView === 'pen') {
 var avOrders = [5.5, 9.2, 16.0, 28.0, 46.0, 72.0];
 var drOrders = [0.78, 1.35, 2.8, 5.6, 10.5, 18.0];
 var maxP = 80;
 for (var g = 0; g <= 4; g++) {
 var gv = g * 20, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + 'M', pad.left - 8, gy + 4);
 }
 var stepX = pw / 5;
 yrs.forEach(function (y, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.siliconCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: y + (en ? ' Autonomous Fulfillment' : ' 无人履约累计单量'),
 body: (en ? 'AVs: ' : '无人车累计: ') + avOrders[idx].toFixed(1) + 'M · ' + (en ? 'Drones: ' : '无人机累计: ') + drOrders[idx].toFixed(2) + 'M'
 });
 });
 function plotP(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxP) * ph, v: v }; });
 ctx.save(); drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)');
 ctx.fillStyle = ag; ctx.fill(); ctx.restore();
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.siliconCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.6 : 3.6, 0, Math.PI * 2); ctx.fill();
 if (idx === 0 || idx === 5 || isHov) drawValueBadge(ctx, pt.v.toFixed(1) + 'M', pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.silSeries.mod) plotP(avOrders, pal.blue, 'rgba(0, 115, 230, 0.18)');
 if (state.silSeries.wf) plotP(drOrders, pal.violet, 'rgba(124, 58, 237, 0.16)');
 } else {
 var kRev = [6.8, 16.5, 31.0, 48.0, 64.0, 82.0];
 var maxS = 95;
 for (var m = 0; m <= 3; m++) {
 var mv = m * 30, my = pad.top + ph - (mv / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + mv + 'B', pad.left - 8, my + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = (kRev[i] / maxS) * ph, yt = pad.top + ph - bh;
 if (state.hover.siliconCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.siliconCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + kRev[i].toFixed(1) + 'B', cx, yt - 12, i >= 3 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: y + (en ? ' Keeta Overseas Revenue' : ' Keeta 海外营收推演'),
 body: (en ? 'Estimated annual overseas revenue across HK, GCC &amp; LatAm: ~¥' : '香港、海湾国家及拉美海外营收估算: ~¥') + kRev[i].toFixed(1) + 'B'
 });
 });
 }
 }

 var OPT_DATA = { clc: { rev: 28, net: 22.0 }, keeta: { rev: 75, net: 4.5 }, retail: { rev: 95, net: 6.2 }, ai: { rev: 28, net: 5.8 }, eq: { rev: 0, net: 4.2 } };
 var miniCaps = [0.37, 0.48, 1.16];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.optMiniCanvas = [];
 var pad = { top: 24, right: 18, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Current Cap', '2030 Base', '2030 + Options'] : ['当前市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(1.6, Math.ceil(Math.max.apply(null, miniCaps) * 1.2 * 10) / 10);
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 if (state.hover.optMiniCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 4, pad.top, slot - 8, ph, 7); ctx.fill();
 }
 var col = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 ctx.fillStyle = col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.optMiniCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + v.toFixed(2) + 'T', cx, yt - 12, col, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lbls[i], cx, pad.top + ph + 16);
 hits.optMiniCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24,
 title: lbls[i],
 body: (en ? 'Implied Market Cap at ' + state.pe + 'x P/E: ¥' : state.pe + 'x P/E 隐含市值: ¥') + v.toFixed(2) + 'T'
 });
 });
 }

 function recalcOptionality() {
 var baseRev = 442.0, baseNet = 26.0, sh2030 = 5.70;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addNet += d.net; }
 }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var eps = totNet / sh2030;
 var mcapT = (totNet * state.pe) / 1000;
 var baseMcapT = (baseNet * state.pe) / 1000;

 document.getElementById('optRevOut').textContent = '¥' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '¥' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '¥' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '¥' + mcapT.toFixed(2) + 'T';

 miniCaps = [0.37, baseMcapT, mcapT];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 18;
 var bs = peTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 recalcOptionality();
 });
 }

 function bindSeg(gid, attr, skey, fn) {
 var g = document.getElementById(gid);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 if (gid === 'fChartTabs') renderFutureLegend();
 if (gid === 'sChartTabs') renderSiliconLegend();
 fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid, redrawFn) {
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
 c.addEventListener('touchstart', function (ev) { if (ev.touches[0]) handlePtr(ev.touches[0].clientX, ev.touches[0].clientY); }, { passive: true });
 c.addEventListener('touchmove', function (ev) { if (ev.touches[0]) handlePtr(ev.touches[0].clientX, ev.touches[0].clientY); }, { passive: true });
 c.addEventListener('mouseleave', function () {
 if (state.hover[cid] !== -1) { state.hover[cid] = -1; redrawFn(); }
 tip.style.display = 'none';
 });
 }
 bindTip('futureCanvas', drawFutureCanvas);
 bindTip('siliconCanvas', drawSiliconCanvas);
 bindTip('optMiniCanvas', drawOptMiniCanvas);

 function drawAll() {
 drawFutureCanvas();
 drawSiliconCanvas();
 drawOptMiniCanvas();
 }

 var QITEMS_ZH = [
 { id: 'sec-f0', t: 'F0 物理AI宣言与三阶战略时间窗', s: '2026–2032 近程修复/中程放量/远期奇点三阶段' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Physical AI · Keeta · 小象+叮咚 · 闪购 · 无人机 · 战投' },
 { id: 'sec-f2', t: 'F2 研发纪律与 2032 营收阶梯桥', s: '美团 ¥13.3B CapEx 对比云巨头千亿投入 · 迈向 ¥785B' },
 { id: 'sec-f3', t: 'F3 地空无人履约与自研 AI 矩阵', s: 'M-Drone 4L 90万单 · 无人车 550万单 · LongCat-2.5' },
 { id: 'sec-f4', t: 'F4 2030 万亿市值期权组装实验室', s: '自由开关五大新业务期权与估值倍数实时测算 EPS' }
 ];
 var QITEMS_EN = [
 { id: 'sec-f0', t: 'F0 Physical AI & 3-Horizon S-Curve Radar', s: '2026–2032 Near / Mid / Long-Term Catalysts & Conviction' },
 { id: 'sec-f1', t: 'F1 Six Future Growth Engines Explorer', s: 'Physical AI · Keeta · Xiaoxiang+Dingdong · Instashop · Drones · Equity' },
 { id: 'sec-f2', t: 'F2 Anti-Consensus AI CapEx & 2032 Bridge', s: 'Meituan ¥13.3B CapEx vs. Hyperscalers · Bridge to ~¥785B' },
 { id: 'sec-f3', t: 'F3 Air-Ground Autonomy & Keeta Scaling', s: '900k+ Drone Orders · 5.5M+ AV Orders · LongCat-2.5' },
 { id: 'sec-f4', t: 'F4 2030 ¥1T+ Market Cap Optionality Builder', s: 'Toggle 5 Growth Catalysts & P/E Multiples Live' }
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

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 setTimeout(drawAll, 60);
 } else {
 var open = sb.classList.toggle('open'); bd.classList.toggle('open', open);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 document.getElementById('sideThemeLightBtn').addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideThemeDarkBtn').addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n', document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var link = document.createElement('a');
 link.href = url; link.download = 'Meituan_Future_Horizon_2030_Blueprint.html';
 document.body.appendChild(link); link.click(); document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast(isEn() ? 'Exported Meituan_Future_Horizon_2030_Blueprint.html' : '已导出独立网页 Meituan_Future_Horizon_2030_Blueprint.html');
 });

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {
 applyLang('zh', true);
 }

 var tBtn = document.getElementById('appbarThemeBtn');
 if (tBtn) {
 tBtn.addEventListener('click', function () {
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

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 