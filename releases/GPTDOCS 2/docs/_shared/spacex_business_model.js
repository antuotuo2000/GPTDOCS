
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'spcx_bm_stress_v1';

 var state = {
 theme: 'dark',
 lang: 'zh',
 lens: 0,
 node: 0,
 cohort: 'res',
 pView: 'waterfall',
 cView: 'share',
 kView: 'val'
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

 var LENSES = {
 zh: [
 {
 formula: '星座资本开支代差 = SpaceX 内部猎鹰复用边际成本 (~$15M/发) vs 外部对手商业火箭采购价 ($70M–$110M/发) → 节省 >75% 入轨 CapEx',
 body: '传统卫星运营商必须向火箭公司支付高昂商业溢价并排队等舱位，而 SpaceX 超过 <strong>70% 的猎鹰 9 号发射用于自家星链补网</strong>。火箭复用次数越多，外部客户分摊掉固定制造折旧后，SpaceX 给自己发射卫星与未来太空 AI 算力节点的边际成本就越趋近于推进剂与回收船燃料费。'
 },
 {
 formula: 'Q3 2026 星链营业利润 ($2,367M) = 营收 $5,248M × 45.1% 营业利润率 → 单季贡献全集团 84.8% 营业利润（Segment EBITDA 达 $3,499M）',
 body: '低轨宽带星座具有典型的<strong>“高前置沉没折旧、极低边际履约成本”</strong>属性。当星链跨越 500 万订户盈亏平衡线并飙升至 1,360 万消费户及数万架飞机/船队后，每一笔新增订阅费和高溢价政企流量都在以逾 65% 的增量 EBITDA 利润率源源不断造血。'
 },
 {
 formula: '天地算力飞轮 = $85.7B IPO 净募资 + $25B 长债 + 星链年化 ~$10B 营业利润 → 支撑 1.7GW 地面超算向 2028 轨道太阳能 AI 星座跃迁',
 body: '并入 xAI 与 Cursor 后，SpaceX 将商业版图从“连接地球”推向<strong>“总潜在市场 $28.5万亿 的天地一体超级智能”</strong>：地面算力集群受困于电网审批与水冷瓶颈，而 SpaceX 独握星舰百吨级入轨运力与星链激光骨干网，率先卡位太空近乎无限的日照能源与真空辐射散热。'
 }
 ],
 en: [
 {
 formula: 'Constellation CapEx Gap = SpaceX Internal Reused Falcon Marginal Cost (~$15M) vs Peer Launch Price ($70M–$110M) → >75% Orbit CapEx Saved',
 body: 'Legacy satellite operators pay steep third-party launch markups and wait years for manifest slots, whereas <strong>over 70% of Falcon 9 flights deploy SpaceX\'s own Starlink satellites</strong>. External commercial & defense missions amortize booster manufacturing, driving internal marginal orbit cost toward propellant and recovery operations.'
 },
 {
 formula: 'Q3 2026 Connectivity Op Income ($2,367M) = $5,248M Revenue × 45.1% Operating Margin → 84.8% of Consolidated Operating Profit',
 body: 'LEO broadband constellations exhibit classic <strong>high upfront sunk depreciation with ultra-low marginal delivery cost</strong>. Past breakeven and now at 13.6M consumer subscribers plus high-ARPU aviation, maritime, and Starshield defense fleets, incremental revenue converts into cash at >65% Segment Adjusted EBITDA margin.'
 },
 {
 formula: 'Space-SI Capital Flywheel = $85.7B Net IPO Proceeds + $25B Bonds + ~$10B/yr Starlink OpInc → Funding 1.7GW Compute & 2028 Orbital AI',
 body: 'Integrating xAI and Cursor expanded SpaceX into a <strong>$28.5T TAM Space-Connectivity-Super Intelligence architecture</strong>. While terrestrial hyperscalers hit power-grid queues, SpaceX uniquely owns Starship heavy lift and laser-linked satellite buses to deploy solar-powered orbital AI data centers starting late 2027–2028.'
 }
 ]
 };

 var NODES = {
 zh: [
 {
 badge: 'NODE 01 · FIRST-PRINCIPLES VERTICAL INTEGRATION',
 title: '用“白痴指数”清退传统军工分包溢价：超过 80% 推进、航电与相控阵天线内部自研自产',
 desc: '传统老牌军工航天（Old Space）实行层层转包的“成本加成（Cost-Plus）”分包体系，一个航空级阀门采购价动辄超过 10 万美元。SpaceX 用“成品价格 ÷ 原材料大宗商品成本（白痴指数）”逐一审视零件，内部自研自造梅林/猛禽发动机、飞行计算机、星链相控阵芯片与 30X 不锈钢箭体（约 $3/kg，替代 $130+/kg 的航空碳纤维），从源头砍掉外部供应商层层叠加的毛利盘剥。',
 formula: '商业传导：>80% 软硬自制率 + 消费电子/汽车级供应链改造 → 单颗星链卫星与单台猛禽引擎制造成本较行业低一个数量级',
 kpis: [['>80%', '火箭与卫星核心部件内部自制率'], ['~$3 / kg', '星舰 30X 不锈钢箭体材料成本'], ['60+ 颗/周', '星链卫星自动化流水线周产能'], ['22,621人', '全集团精干全职员工规模 (2026)']]
 },
 {
 badge: 'NODE 02 · 37x BOOSTER REUSE & FLIGHT 15 SHIP CATCH',
 title: '火箭航班化复用：从猎鹰 9 号 37 次复用纪录到星舰 Flight 15“筷子夹飞船”历史奇点',
 desc: '当全球所有竞争对手的一级助推器仍在每次发射后坠海报废（或刚起步验证回收）时，SpaceX 单枚猎鹰 9 号 Block 5 助推器已于 2026 年 8 月创下第 37 次发射回收纪录；2025 全年完成 165 次猎鹰发射（100%成功）。更颠覆的是，2026 年 11 月 14 日星舰第 15 次试飞成功部署 23 颗星链 V3 卫星，并首次用 Mechazilla 机械臂在陆地捕获轨道返回的二级飞船 Ship 42。',
 formula: '商业传导：外部商业/太空军高毛利发射 ($67M–$150M/次) 摊薄研发 → 内部星链发射享受极致边际成本套利',
 kpis: [['37 次', '单枚猎鹰9号一级助推器复用纪录'], ['165 发', '2025全年猎鹰系列发射 (100%成功)'], ['Flight 15', '2026.11 首现机械臂捕获轨道飞船'], ['>85%', 'SpaceX 占全球入轨有效载荷质量']]
 },
 {
 badge: 'NODE 03 · 11,100+ LASER MESH & SPECTRUM FORTRESS',
 title: '万颗低轨激光网格 + 天地双频谱墙：构筑后来者十年难以逾越的物理先发壁垒',
 desc: '截至 2026 年秋，星链在轨活跃卫星突破 11,100 颗，通过星间光学激光链路在太空组成低延迟光网，无需依赖地面站中转即可覆盖极地与深海。同时 SpaceX 豪掷 $196亿 收购 EchoStar 2GHz 卫星直连频谱，并于 2026 年 10 月收购 Grain 全美 800MHz 黄金穿墙低频段，完成从“屋顶锅盖天线”向“存量普通手机全覆盖（Starlink Mobile）”的频谱合围。',
 formula: '商业传导：ITU 低轨轨道倾角先占权 + 2GHz/800MHz 独占频谱 → 锁死全球天地一体移动通信底层通行证',
 kpis: [['~11,100+', '在轨活跃运行星链卫星总数'], ['164+ 国', '全球已开通商业服务国家与地区'], ['$19.6B', '协议收购 EchoStar 2GHz 频谱资产'], ['800 MHz', '2026.10 收购全美室内穿墙低频谱']]
 },
 {
 badge: 'NODE 04 · HIGH-MARGIN CONNECTIVITY CASH COW',
 title: '星链与星盾收费站：单季净赚 $23.7亿 营业利润、45.1% 利润率的超级现金牛',
 desc: '据 Q3 2026 10-Q 披露，Connectivity（星链）单季营收同比增长 69.5% 至 $52.48亿（9个月累计 $127.96亿），单季营业利润高达 $23.67亿，营业利润率达惊人的 45.1%，折旧前分部 Adjusted EBITDA 更达 $34.99亿（66.7% EBITDA 利润率）。消费端靠低价套餐快速扩圈至 1,360 万户，政企航空海事与美军 Starshield 则贡献高溢价增速。',
 formula: '商业传导：Q3 消费连接 ($3.12B) + 政企/国防连接 ($2.13B) - $1.54B 维护扩建 CapEx = 强劲净自由现金流造血',
 kpis: [['$5.25B', 'Q3 2026 星链连接分部单季营收'], ['45.1%', 'Q3 2026 星链分部营业利润率'], ['13.6M', '全球星链消费级活跃付费订户'], ['84.8%', '星链对集团 Q3 营业利润贡献占比']]
 },
 {
 badge: 'NODE 05 · SPACEX SI (XAI + CURSOR) & ORBITAL COMPUTE',
 title: '超级智能（SI）与太空算力闭环：地面 1.7GW 超算打底，剑指百万颗轨道 AI 卫星',
 desc: '2026 年吸收合并 xAI 与 $600亿并购 Cursor 后，重命名的 SI（Super Intelligence）分部在 Q3 跃居第一大营收来源（$75.60亿，同比暴增 9.3 倍），装机 GPU 算力达 1.7GW（同比翻近三倍）。更长远的杀手锏在于 S-1 与 FCC 申报的 StarMind 轨道数据中心：利用星舰廉价运力在晨昏太阳同步轨道部署 250kW 级太阳能 AI 卫星，绕开地球电网瓶颈。',
 formula: '商业传导：Cursor 开发者生态数据 ($608M/季) + Grok 大模型 + 1.7GW 算力出租 → 2028 开启太空轨道低成本推理集群',
 kpis: [['$7.56B', 'Q3 2026 SI 超级智能分部营收'], ['1.7 GW', '截至 2026.09 已装机 GPU 铭牌算力'], ['$608M', 'Cursor 并表仅半季贡献软件营收'], ['2028 年', 'S-1 规划轨道 AI 算力卫星规模部署']]
 }
 ],
 en: [
 {
 badge: 'NODE 01 · FIRST-PRINCIPLES VERTICAL INTEGRATION',
 title: 'Crushing the Aerospace "Idiot Index": >80% In-House Propulsion, Avionics & Phased-Array Silicon',
 desc: 'Legacy cost-plus contractors outsource across multi-tier subcontractors where basic flight valves cost >$100K. SpaceX evaluates every part via the "Idiot Index" (finished part cost vs. raw commodity cost), vertically integrating Merlin/Raptor engines, flight computers, Starlink custom ASICs, and ~$3/kg 30X stainless-steel Starship airframes in-house.',
 formula: 'Economic flow: >80% in-house vertical integration + automotive-grade supply velocity → 10x lower unit satellite & engine BOM cost',
 kpis: [['>80%', 'In-house rocket & satellite BOM share'], ['~$3 / kg', '30X stainless steel vs $130+/kg carbon'], ['60+ / wk', 'Automated Starlink factory cadence'], ['22,621', 'Total SpaceX FTE headcount (2026)']]
 },
 {
 badge: 'NODE 02 · 37x BOOSTER REUSE & FLIGHT 15 SHIP CATCH',
 title: 'Airline-Like Reusability: From 37-Flight Falcon Boosters to Starship Flight 15 Upper-Stage Tower Catch',
 desc: 'While rival boosters remain expendable or early in recovery trials, a single Falcon 9 Block 5 booster set a 37-flight reuse record in Aug 2026 after 165 Falcon launches in 2025 (100% success). On Nov 14, 2026, Starship Flight 15 deployed 23 Starlink V3 satellites and achieved history\'s first Mechazilla chopsticks catch of an orbital Ship (Ship 42).',
 formula: 'Economic flow: High-margin external commercial/NSSL flights amortize R&D → internal Starlink launches run at near-marginal cost',
 kpis: [['37 Flights', 'Single Falcon 9 booster reuse record'], ['165 Flights', '2025 Falcon launch record (100% success)'], ['Flight 15', 'First orbital Starship chopsticks catch'], ['>85%', 'Share of global mass launched to orbit']]
 },
 {
 badge: 'NODE 03 · 11,100+ LASER MESH & SPECTRUM FORTRESS',
 title: '11,100+ Laser-Linked Satellites + Dual-Band Spectrum Moat: Locking In Global Direct-to-Cell Rights',
 desc: 'With over 11,100 active satellites interconnected via optical space lasers, Starlink routes traffic across oceans and poles without ground stations. SpaceX paired this orbital mesh with a $19.6B EchoStar 2GHz spectrum agreement and an Oct 2026 Grain 800MHz nationwide indoor-penetrating spectrum deal to power ubiquitous Starlink Mobile.',
 formula: 'Economic flow: Priority ITU LEO orbital shells + 2GHz/800MHz mobile spectrum → unassailable space-to-handset regulatory moat',
 kpis: [['~11,100+', 'Active Starlink satellites in LEO'], ['164+ Markets', 'Countries & territories with live service'], ['$19.6B', 'Pending EchoStar 2GHz spectrum deal'], ['800 MHz', 'Oct 2026 low-band indoor U.S. spectrum']]
 },
 {
 badge: 'NODE 04 · HIGH-MARGIN CONNECTIVITY CASH COW',
 title: 'Starlink & Starshield Tollbooth: $2.37B Quarterly Operating Income at 45.1% Operating Margin',
 desc: 'Per the Q3 2026 Form 10-Q, Connectivity revenue jumped +69.5% YoY to $5.248B ($12.80B in 9M26), generating $2.367B in operating income (45.1% OPM) and $3.499B in Segment Adjusted EBITDA (66.7% margin). Consumer plans scaled to 13.6M subscribers while Enterprise aviation/maritime and Starshield surged +91% YoY.',
 formula: 'Economic flow: Q3 Consumer ($3.12B) + Enterprise/Gov ($2.13B) - $1.54B CapEx = Massive self-funding free cash flow engine',
 kpis: [['$5.25B', 'Q3 2026 Connectivity segment revenue'], ['45.1%', 'Q3 2026 Connectivity operating margin'], ['13.6M', 'Active consumer Starlink subscribers'], ['84.8%', 'Share of Q3 consolidated operating profit']]
 },
 {
 badge: 'NODE 05 · SPACEX SI (XAI + CURSOR) & ORBITAL COMPUTE',
 title: 'Super Intelligence (SI) & StarMind: 1.7GW Terrestrial GPU Superclusters Bridging to Orbital AI',
 desc: 'Following the Feb 2026 xAI merger and Aug 2026 $60B Cursor acquisition, SI became SpaceX\'s largest revenue segment in Q3 ($7.560B, up 9.3x YoY) backed by 1.7GW of installed GPU compute. Next, SpaceX\'s S-1 and FCC filings target launching solar-powered orbital AI compute satellites (StarMind) starting late 2027–2028.',
 formula: 'Economic flow: Cursor coding moat ($608M partial Q3) + Grok + 1.7GW SI cloud → 2028 zero-grid-bottleneck orbital AI compute',
 kpis: [['$7.56B', 'Q3 2026 SI segment revenue (9.3x YoY)'], ['1.7 GW', 'Installed nameplate GPU compute'], ['$608M', 'Cursor revenue in ~6 weeks post-close'], ['2028 Scale', 'Orbital AI compute satellite roadmap']]
 }
 ]
 };

 var COHORTS = {
 zh: {
 res: {
 stats: [
 ['终端形态与目标场景', 'Standard / Mini 相控阵天线', '覆盖 164+ 国家偏远与跨国漫游'],
 ['Q3 2026 月均 ARPU', '$69 / 月', '低价套餐下沉驱动订户同比 +89%'],
 ['单板块季度营收规模', '$3,121M / 季', '年化超 $125亿 经常性现金流'],
 ['5年单终端累计毛利 LTV', '~$3,150', '硬件补贴首年回本，后4年高纯利']
 ],
 note: '<strong>共享星座固定折旧杠杆：</strong>同一张由 11,100+ 颗激光星间链路卫星组成的全球轨道网格，白天飞越陆地服务家庭宽带，飞越大洋与极地原本闲置的波束容量则直接高价卖给跨洋民航客机、远洋货轮与美军机动部队——<strong>原本沉没的海洋上空算力与带宽实现了接近 100% 纯利变现</strong>。'
 },
 ent: {
 stats: [
 ['终端形态与目标场景', '航空机载双相控阵 / 远洋海事端', '美联航/卡塔尔航空/法荷航及商船队'],
 ['典型单终端月费区间', '$2,500–$25,000+/月', '约为普通家庭宽带户的 35–350 倍'],
 ['政企+国防单季营收', '$2,127M / 季 (+91%)', '占星链连接总收入比重升至 40.5%'],
 ['客户粘性与合约周期', '多年期机队锁定', '适航取证改装后几乎零退订率']
 ],
 note: '<strong>民航客舱与远洋海事爆发力：</strong>10-Q 明确将政企连接收入同比大涨 +91.4% 归功于<strong>商业客机激活量激增</strong>。传统地球静止轨道（GEO）机载 Wi-Fi 延迟超 600ms 且价格昂贵，星链低轨激光网提供 <35ms 居家级高速流媒体体验，形成降维替代。'
 },
 gov: {
 stats: [
 ['终端形态与目标场景', 'Starshield 军规加密通信与遥感星', '美国太空军 / NRO 天基侦察与盟国'],
 ['商业收费模式', '定制星座建造 + 托管服务年费', '摆脱传统军工低利润率，享专网溢价'],
 ['国防与主权收入确定性', '主权级刚需预算', '现代无人机与分布式指挥生命线'],
 ['协同发射壁垒', 'NSSL 国家安全发射主力', '猎鹰9/重型猎鹰包揽高机密入轨任务']
 ],
 note: '<strong>Starshield（星盾）主权护城河：</strong>基于星链验证成熟的商业卫星总线与光学星间激光链路，SpaceX 为美国国防部与情报机构快速批产高抗毁分布式低轨侦察与加密通信网，交付速度比传统洛马/波音快 3–5 倍。'
 }
 },
 en: {
 res: {
 stats: [
 ['Terminal & Use Case', 'Standard / Mini Phased Array', '164+ countries residential & roam'],
 ['Q3 2026 Monthly ARPU', '$69 / mo', 'Tiered plans drove +89% YoY sub growth'],
 ['Quarterly Segment Revenue', '$3,121M / qtr', '>$12.5B annualized recurring base'],
 ['5-Year Cumulative Gross LTV', '~$3,150', 'Hardware payback <1yr, 4yr high margin']
 ],
 note: '<strong>Shared Orbital Depreciation Leverage:</strong> The exact same 11,100+ laser-linked satellite mesh serving residential homes over land monetizes otherwise idle ocean and polar beam capacity via high-ARPU airliners, cruise ships, and defense fleets at near-100% incremental margin.'
 },
 ent: {
 stats: [
 ['Terminal & Use Case', 'Aero & Maritime Dual Arrays', 'Global airlines, cruise & cargo fleets'],
 ['Monthly Fleet ARPU Range', '$2,500–$25,000+/mo', '35x–350x residential ARPU per terminal'],
 ['Q3 Enterprise + Gov Revenue', '$2,127M / qtr (+91%)', 'Expanded to 40.5% of Connectivity sales'],
 ['Retention & Contract Moat', 'Multi-year fleet STC lock', 'Near-zero churn once airframes retrofit']
 ],
 note: '<strong>Commercial Aviation Inflection:</strong> SpaceX\'s Q3 2026 10-Q explicitly credits surging aircraft activations for driving Enterprise & Government connectivity revenue up +91.4% YoY—displacing high-latency legacy GEO cabin Wi-Fi with <35ms fiber-in-the-sky.'
 },
 gov: {
 stats: [
 ['Terminal & Use Case', 'Starshield Encrypted Bus & EO', 'U.S. Space Force, NRO & allied defense'],
 ['Monetization Structure', 'Dedicated constellation + service', 'High-margin sovereign recurring contracts'],
 ['Budget Resilience', 'Mission-critical sovereign', 'Backbone of resilient proliferated LEO'],
 ['Launch Synergy', 'NSSL National Security Prime', 'Falcon 9/Heavy dominate classified lift']]
 ,
 note: '<strong>Starshield Sovereign Moat:</strong> Leveraging commercial Starlink assembly lines (60+ satellites/week) and inter-satellite optical lasers, SpaceX builds proliferated defense constellations 3–5x faster and dramatically cheaper than legacy cost-plus primes.'
 }
 }
 };

 function renderLens() {
 var arr = LENSES[state.lang] || LENSES.zh;
 var item = arr[state.lens] || arr[0];
 document.getElementById('lensFormula').textContent = item.formula;
 document.getElementById('lensBody').innerHTML = item.body;
 }

 function renderNode() {
 var arr = NODES[state.lang] || NODES.zh;
 var nd = arr[state.node] || arr[0];
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = nd.title;
 document.getElementById('nodeDesc').textContent = nd.desc;
 document.getElementById('nodeFormula').textContent = nd.formula;
 document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
 return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 }

 function renderCohort() {
 var dict = COHORTS[state.lang] || COHORTS.zh;
 var c = dict[state.cohort] || dict.res;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
 var isMono = idx > 0 ? ' mono' : '';
 var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = c.note;
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
 if (sl) sl.setAttribute('aria-pressed', state.theme === 'light' ? 'true' : 'false');
 if (sd) sd.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh' ? 'true' : 'false'); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en' ? 'true' : 'false'); }
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

 // Event Listeners for Lens, Nodes, Tiers, Cohorts, Peer Filter
 document.getElementById('lensTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 state.lens = parseInt(b.getAttribute('data-lens'), 10) || 0;
 var all = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
 renderLens();
 });

 document.getElementById('pipelineTrack').addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
 state.node = parseInt(btn.getAttribute('data-node'), 10) || 0;
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
 state.cohort = b.getAttribute('data-cohort');
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

 // Suite Hub Category Filter & Safe Navigation
 var hubPills = document.getElementById('coHubPills');
 if (hubPills) {
 hubPills.addEventListener('click', function (e) {
 var b = e.target.closest('[data-co-cat]');
 if (!b) return;
 var cat = b.getAttribute('data-co-cat');
 var ps = hubPills.querySelectorAll('.co-hub-pill');
 for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === b);
 var items = document.querySelectorAll('#coHubList [data-co-item-cat]');
 for (var j = 0; j < items.length; j++) {
 items[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || items[j].getAttribute('data-co-item-cat') === cat));
 }
 });
 }
 

 // High-DPI Canvas Helpers
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
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var en = state.lang === 'en';

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: en ? 'Space' : '航天发射', val: 1.77, base: 0, col: pal.blue, tip: 'Q3 2026 Space (Launch): $1,767M (+6.1% YoY), 33 Falcon launches' },
 { lbl: en ? '+Starlink' : '+星链连接', val: 5.25, base: 1.77, col: pal.green, tip: 'Q3 2026 Connectivity (Starlink): +$5,248M (+69.5% YoY), 13.6M consumer subs' },
 { lbl: en ? '+SI (AI)' : '+超级智能SI', val: 7.56, base: 7.02, col: pal.violet, tip: 'Q3 2026 SI (Grok, Cloud, Cursor, X): +$7,560M (9.3x YoY), pushing total rev to $14.58B' },
 { lbl: en ? '=Total Rev' : '=Q3总营收', val: 14.58, base: 0, col: pal.blue, tip: 'Q3 2026 Consolidated Revenue: $14,575M (+161.4% YoY vs $5,576M)' },
 { lbl: en ? 'Op Income' : '营业利润', val: 2.79, base: 0, col: pal.amber, tip: 'Q3 2026 Operating Income: $2,791M (19.1% OPM = Starlink $2,367M + SI $431M - Space $7M)' },
 { lbl: en ? 'GAAP Net' : 'GAAP净利', val: 4.40, base: 0, col: pal.green, tip: 'Q3 2026 GAAP Net Income: $4,404M (includes $873M interest income & $561M TBC gain)' }
 ];
 var maxV = 16.5;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length;
 var barW = Math.min(46, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(2) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var segs = [
 { name: en ? 'Connectivity (Starlink)' : '星链连接 Connectivity', op: 2.37, capex: 1.54, tip: 'Q3 营业利润 $2.37B (45.1% OPM) vs 单季 CapEx $1.54B → 净现金贡献 +$0.83B+' },
 { name: en ? 'SI (Super Intelligence)' : '超级智能 SI (AI+Cursor)', op: 0.43, capex: 16.44, tip: 'Q3 营业利润 $0.43B (5.7% OPM) vs 单季数据中心 CapEx $16.44B (占集团 CapEx 83.9%)' },
 { name: en ? 'Space (Launch & Starship)' : '航天发射 Space', op: 0.01, capex: 1.61, tip: 'Q3 营业损益 -$7M (近乎盈亏平衡，内部消化星舰研发) vs 单季发射台/产线 CapEx $1.61B' }
 ];
 var maxC = 18.0;
 for (var m = 0; m <= 3; m++) {
 var mv = m * 6;
 var my = pad.top + ph - (mv / maxC) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
 }
 var sl = pw / segs.length;
 segs.forEach(function (sg, idx) {
 var cx = pad.left + idx * sl + sl / 2;
 var bw = 34;
 var hOp = Math.max(4, (sg.op / maxC) * ph);
 var hCx = Math.max(4, (sg.capex / maxC) * ph);
 ctx.fillStyle = pal.green;
 roundRect(ctx, cx - bw - 4, pad.top + ph - hOp, bw, hOp, 5); ctx.fill();
 ctx.fillStyle = pal.violet;
 roundRect(ctx, cx + 4, pad.top + ph - hCx, bw, hCx, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((idx === 2 ? '-$0.01B' : '$' + sg.op.toFixed(2) + 'B'), cx - bw / 2 - 4, pad.top + ph - hOp - 6);
 ctx.fillText('$' + sg.capex.toFixed(2) + 'B', cx + bw / 2 + 4, pad.top + ph - hCx - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(sg.name, cx, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: cx - bw - 8, y: pad.top, w: bw * 2 + 16, h: ph, title: sg.name, body: sg.tip });
 });
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 22, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var en = state.lang === 'en';

 if (state.cView === 'share') {
 var actors = [
 { name: 'SpaceX (Falcon+Starship)', flt: 58.0, mass: 86.5, col: pal.blue, tip: '发射次数占全球 ~58%，但入轨有效载荷总质量占全球高达 ~86.5%（高频复用大运力统治）' },
 { name: en ? 'China (CASC + Commercial)' : '中国航天 (长征+商业)', flt: 25.0, mass: 9.2, col: pal.amber, tip: '全球发射次数约 ~25%，入轨质量份额约 ~9.2%' },
 { name: en ? 'Rest of World (ULA/EU/RKLB)' : '美欧俄日印其余总和', flt: 17.0, mass: 4.3, col: pal.violet, tip: '包含 ULA、Rocket Lab、俄欧日印等全部其余发射商，入轨质量合计不足 5%' }
 ];
 for (var k = 0; k <= 4; k++) {
 var kv = k * 25, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 var slot = pw / actors.length;
 actors.forEach(function (v, idx) {
 var cx = pad.left + idx * slot + slot / 2, bw = 34;
 var fh = (v.flt / 100) * ph, mh = (v.mass / 100) * ph;
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 4, pad.top + ph - fh, bw, fh, 5); ctx.fill();
 ctx.fillStyle = v.col;
 roundRect(ctx, cx + 4, pad.top + ph - mh, bw, mh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.flt + '%', cx - bw / 2 - 4, pad.top + ph - fh - 6);
 ctx.fillText(v.mass + '%', cx + bw / 2 + 4, pad.top + ph - mh - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw - 8, y: pad.top, w: bw * 2 + 16, h: ph, title: v.name, body: v.tip });
 });
 } else {
 var qtrs = ['Q3 2025 (10-Q)', 'Q3 2026 (10-Q)'];
 var cons = [1.986, 3.121];
 var entg = [1.111, 2.127];
 var maxR = 6.0;
 for (var g = 0; g <= 3; g++) {
 var gv = g * 2, gy = pad.top + ph - (gv / maxR) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slQ = pw / 2;
 qtrs.forEach(function (q, i) {
 var cx = pad.left + i * slQ + slQ / 2, bw = 64;
 var h1 = (cons[i] / maxR) * ph, h2 = (entg[i] / maxR) * ph;
 var y1 = pad.top + ph - h1, y2 = y1 - h2;
 ctx.fillStyle = pal.blue;
 roundRect(ctx, cx - bw / 2, y1, bw, h1, 4); ctx.fill();
 ctx.fillStyle = pal.green;
 roundRect(ctx, cx - bw / 2, y2, bw, h2, 4); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((en ? 'Total $' : '合计 $') + (cons[i] + entg[i]).toFixed(2) + 'B', cx, y2 - 8);
 ctx.fillStyle = pal.sub; ctx.font = '700 11px sans-serif';
 ctx.fillText(q, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw / 2, y: y2, w: bw, h: h1 + h2, title: q + ' Connectivity', body: '消费级宽带 $' + cons[i].toFixed(2) + 'B + 政企/航空/国防 $' + entg[i].toFixed(2) + 'B' });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'val') {
 var pts = [
 { t: '2023.06', v: 150, note: '内部要约收购估值 ~$150B' },
 { t: '2024.06', v: 210, note: '要约价 $112/股，估值 ~$210B' },
 { t: '2024.12', v: 350, note: '星链盈利跃升，要约估值 ~$350B' },
 { t: '2025.07', v: 400, note: '要约估值 ~$400B，同步投资 xAI' },
 { t: '2025.12', v: 800, note: '上市前末轮要约估值跃升至 ~$800B' },
 { t: '2026.06 IPO', v: 1780, note: '纳斯达克 SPCX $135/股 IPO，募资 $86.25B，估值 $1.78T' },
 { t: '2026.11', v: 1900, note: 'Q3 财报与 Flight 15 期间二级市场市值 ~$1.90T (峰值 $1.98T)' }
 ];
 var maxV = 2150;
 for (var g = 0; g <= 4; g++) {
 var sv = Math.round((maxV / 4) * g), sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + sv + 'B', pad.left - 7, sy + 4);
 }
 var slot = pw / pts.length, bw = Math.min(36, slot * 0.58);
 pts.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(5, (p.v / maxV) * ph), yTop = pad.top + ph - bh;
 ctx.fillStyle = i >= 5 ? pal.green : pal.blue;
 roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(p.v >= 1000 ? ('$' + (p.v / 1000).toFixed(2) + 'T') : ('$' + p.v + 'B'), x + bw / 2, yTop - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(p.t, x + bw / 2, pad.top + ph + 19);
 hitRegions.capitalCanvas.push({ x: x, y: yTop, w: bw, h: bh, title: p.t, body: p.note });
 });
 } else {
 var rockets = [
 { name: 'NASA 航天飞机', cost: 54500, disp: '$54,500/kg', bar: 1.0, col: pal.red, tip: '半复用但翻修需数万人耗时数月，每公斤近地轨道成本逾 $5.4万' },
 { name: 'ULA 传统一次性火箭', cost: 14000, disp: '~$14,000/kg', bar: 0.42, col: pal.amber, tip: '传统军工成本加成火箭每公斤 LEO 报价超 $1.2万–$1.8万' },
 { name: 'Falcon 9 (37x复用内部)', cost: 1200, disp: '~$1,200/kg', bar: 0.16, col: pal.blue, tip: '外部商业报价 ~$2,800/kg，内部星链复用边际成本已打穿 ~$1,200/kg' },
 { name: 'Starship (全复用目标)', cost: 150, disp: '<$200/kg', bar: 0.06, col: pal.green, tip: '一二级全快速捕获复用成熟后，每公斤入轨边际成本向 $100–$200/kg 坍缩' }
 ];
 var rowH = ph / rockets.length;
 rockets.forEach(function (rk, idx) {
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, bl = Math.max(18, rk.bar * (pw * 0.72));
 ctx.fillStyle = rk.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(rk.disp, pad.left + bl + 8, cy + 4);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(rk.name, pad.left, cy - 15);
 hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 20, w: pw, h: 38, title: rk.name, body: rk.tip });
 });
 }
 }

 var simData = { op: [11.2, 17.5, 25.4, 35.0, 46.8, 60.5] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['26E年化', '27E', '28E', '29E', '30E', '31E'];
 var arr = simData.op;
 var maxE = Math.max(25, Math.ceil(Math.max.apply(null, arr) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1) + 'B', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gConn = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
 var gSi = parseFloat(document.getElementById('inpProdCagr').value) / 100;
 var siOpm = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblSvcCagr').textContent = (gConn * 100).toFixed(1) + '%';
 document.getElementById('lblProdCagr').textContent = (gSi * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = (siOpm * 100).toFixed(1) + '%';

 // Annualized Q3 2026 Run-Rate Base: Connectivity $21.0B, SI $30.2B, Space $7.1B = $58.3B
 var conn = 21.0, si = 30.2, spc = 7.1;
 var opArr = [11.16];
 for (var y = 1; y <= 5; y++) {
 conn *= (1 + gConn);
 si *= (1 + gSi);
 spc *= 1.12;
 var curSiM = 0.057 + ((siOpm - 0.057) * (y / 5));
 var opInc = conn * 0.48 + si * curSiM + spc * 0.14;
 opArr.push(opInc);
 }
 var totRev = conn + si + spc;
 var totOp = opArr[5];
 var opmPct = (totOp / totRev) * 100;
 var revCagr = (Math.pow(totRev / 58.3, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '$' + Math.round(totRev) + 'B';
 document.getElementById('simGmOut').textContent = opmPct.toFixed(1) + '%';
 document.getElementById('simEpsOut').textContent = '$' + totOp.toFixed(1) + 'B';
 document.getElementById('simCagrOut').textContent = '+' + revCagr.toFixed(1) + '%';
 simData.op = opArr;
 drawSimMiniCanvas();
 }

 ['inpSvcCagr', 'inpProdCagr', 'inpBuyRate'].forEach(function (id) {
 document.getElementById(id).addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { s: 18, p: 12, b: 10 },
 base: { s: 28, p: 26, b: 22 },
 bull: { s: 36, p: 35, b: 32 }
 };
 document.getElementById('simPresets').addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpSvcCagr').value = pr.s;
 document.getElementById('inpProdCagr').value = pr.p;
 document.getElementById('inpBuyRate').value = pr.b;
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
 tip.style.left = Math.min(window.innerWidth - 305, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
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

 // Quick Jump ⌘K
 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与三阶商业公式', s: 'Q3 $14.58B 营收 · 星链 45.1% 利润率 · $86.25B IPO' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '白痴指数自制 → 37次复用 → 万颗激光网 → 星链 → SI超算' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四大收费站', s: '星链贡献 84.8% 营业利润 vs SI 单季 $16.4B CapEx' },
 { id: 'mod-cohort', t: 'M3 星链分层客群经济与运力垄断', s: '1,360万消费户 vs 航空海事与星盾 · 占全球入轨质量 >85%' },
 { id: 'mod-capital', t: 'M4 估值跃迁史与五年复利推演器', s: '$150B→$1.90T 市值跃升 · 2026–2031 情景模拟器' },
 { id: 'mod-matrix', t: 'M5 六大巨头对标矩阵与三大压测', s: 'SPCX vs NVDA / LMT / BA / TSLA / RKLB 及 10-Q 风险' }
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
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qInput) qInput.focus(); }
 if (e.key === 'Escape') {
 if (qPop) qPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 // Sidebar Toggle & Export / Print
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
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
 