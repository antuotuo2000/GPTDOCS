
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', hz: 0, eng: 0, fView: 'capex', sView: 'gw', pe: 32 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

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
 violet: dark ? '#A78BFA' : '#7C3AED',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var HORIZONS = {
 zh: [
 {
 badge: 'HORIZON 1 · 高确定性工程兑现期 (2026–2027)',
 title: '星舰一二级同发双捕获 × 星链 V3 批产 × 全美手机直连商用',
 items: [
 '<strong>星舰全复用闭环：</strong>继 Flight 15 捕获 Ship 42 后，攻克单次任务一二级双筷子捕获与在轨低温推进剂转移（Orbital Refueling）。',
 '<strong>Starlink V3 规模换代：</strong>每发星舰投送数十颗 Tbps 级 V3 大卫星，推动星链订户突破 2,200 万并完成 EchoStar/800MHz 频谱过户。',
 '<strong>StarMind 轨道算力首发：</strong>搭载 Nvidia 芯片的首批轨道 AI 试验星于 2027Q4 升空，地面 SI 装机迈向 3.5GW+。'
 ],
 prob: '兑现确定性：极高 (85%+)',
 impact: '年化增量营收池：+$30B–$48B'
 },
 {
 badge: 'HORIZON 2 · 太空算力与移动运营商放量期 (2028–2029)',
 title: 'StarMind 轨道 AI 数据中心成网 × 全球手机直连漫游 × 无人登月验证',
 items: [
 '<strong>轨道 AI 算力规模化：</strong>2028 年起星舰高密度部署 250kW 级太阳同步轨道 AI 算力星，承接地面电网受限的推理洪峰。',
 '<strong>Starlink Mobile 颠覆传统电信：</strong>融合卫星 2GHz 与地面 800MHz 频谱，为全球主流智能手机提供室内外无缝数据语音服务。',
 '<strong>Artemis 登月与火星无人探路：</strong>兑现 NASA 载人登月舱（HLS）在轨加注任务，并趁火星冲日窗口发射首批无人货运星舰。'
 ],
 prob: '兑现确定性：中高 (70%)',
 impact: '年化增量营收池：+$75B–$115B'
 },
 {
 badge: 'HORIZON 3 · 多行星与吉瓦级天基文明奇点期 (2030–2032)',
 title: '多吉瓦太空超算网络 × 月球常驻科考物流 × 载人火星探险启航',
 items: [
 '<strong>太空新增算力超越地面：</strong>轨道太阳能 AI 星座迈向数万颗级规模，构建环绕地球的零水耗、全天候天基超级智能网。',
 '<strong>太空工业与深空干线：</strong>以 <$150/kg 极低入轨成本催生商业空间站、太空制药晶圆与地月常态化重型货运班列。',
 '<strong>多行星物种愿景落地：</strong>在无人货运星舰验证火星地表就地制取推进剂（ISRU）后，启动人类首次载人火星航行窗口。'
 ],
 prob: '兑现确定性：远期高赔率期权 (50%)',
 impact: '年化增量营收池：+$150B+'
 }
 ],
 en: [
 {
 badge: 'HORIZON 1 · HIGH-CONVICTION EXECUTION (2026–2027)',
 title: 'Dual Booster+Ship Catch × Starlink V3 Ramp × U.S. Direct-to-Cell Launch',
 items: [
 '<strong>Full Starship Reusability:</strong> Following Flight 15\'s Ship 42 tower catch, demonstrate dual chopsticks recovery and cryogenic orbital refueling.',
 '<strong>Starlink V3 & Spectrum Close:</strong> Deploy Tbps-class V3 satellites via Starship, surpass 22M subscribers, and close EchoStar 2GHz + Grain 800MHz spectrum.',
 '<strong>Initial StarMind Deployment:</strong> Launch initial Nvidia-powered orbital AI compute satellites in Q4 2027 while scaling terrestrial SI past 3.5GW.'
 ],
 prob: 'Conviction: Very High (85%+)',
 impact: 'Incremental Annual Revenue: +$30B–$48B'
 },
 {
 badge: 'HORIZON 2 · ORBITAL AI & MOBILE CARRIER SCALE (2028–2029)',
 title: 'StarMind Orbital Compute Mesh × Global Handset Carrier × Lunar HLS',
 items: [
 '<strong>Orbital Data Centers at Scale:</strong> High-cadence Starship flights deploy 250kW sun-synchronous AI satellites in 2028, bypassing terrestrial power queues.',
 '<strong>Starlink Mobile Carrier Disruption:</strong> Combine 2GHz space beams with 800MHz indoor spectrum to deliver full voice/data to unmodified phones.',
 '<strong>Artemis HLS & Uncrewed Mars Windows:</strong> Execute NASA Artemis lunar landings and dispatch initial uncrewed Starship cargo missions to Mars.'
 ],
 prob: 'Conviction: Medium-High (70%)',
 impact: 'Incremental Annual Revenue: +$75B–$115B'
 },
 {
 badge: 'HORIZON 3 · MULTIPLANETARY & MULTI-GW SPACE AI (2030–2032)',
 title: 'Multi-GW Orbital Superintelligence × Cislunar Economy × Crewed Mars',
 items: [
 '<strong>Space Compute Surpasses Terrestrial Additions:</strong> Scale tens of thousands of solar-powered AI compute nodes in sun-synchronous orbit.',
 '<strong>Cislunar Heavy Freight:</strong> Sub-$150/kg orbit economics unlock commercial space stations, orbital manufacturing, and permanent lunar base supply.',
 '<strong>Crewed Mars Architecture:</strong> Validate Mars in-situ propellant production (ISRU) and open early crewed interplanetary transport.'
 ],
 prob: 'Conviction: Long-Term Asymmetric Option (50%)',
 impact: 'Incremental Annual Revenue: +$150B+'
 }
 ]
 };

 var ENGINES = {
 zh: [
 {
 badge: 'ENGINE 01 · STARSHIP FULL REUSABILITY & ORBITAL REFUELING',
 title: '星舰（Starship V3）全复用闭环：把人类进入太空的边际成本再砍一个数量级',
 desc: '猎鹰 9 号仅复用了约占箭体成本 70% 的一级助推器与整流罩，每次仍需报废数千万美元的二级火箭；而星舰是人类历史上首款一二级 100% 全复用超重型运载系统。2026 年 11 月 14 日 Flight 15 成功用发射塔机械臂捕获轨道级再入的 Ship 42，验证了免着陆腿减重与发射台原位快速周转路线。一旦星舰 V3（单发近地轨道运力 150–200 吨+）跑通一天多发，SpaceX 每年送入轨道的载荷吨位将从数千吨跃升至十万吨级。',
 formula: '物理乘数：单发运力提升 ~10x（对比猎鹰9）× 二级零报废全复用 = 独占星链 V3 巨型卫星与百万颗太空 AI 算力节点的唯一运输船票',
 gauges: [['Flight 15', '2026.11 首现轨道飞船机械臂捕获'], ['150–200t', 'Starship V3 近地轨道复用运力目标'], ['~$3M–$5M', '远期单次发射推进剂与周转边际成本'], ['400 发/4年', '管理层规划星舰四年累计发射节奏']]
 },
 {
 badge: 'ENGINE 02 · STARMIND ORBITAL SOLAR AI DATA CENTERS',
 title: 'StarMind 轨道 AI 数据中心：向 FCC 申报百万颗卫星，用太空阳光破解地球电荒',
 desc: '2026 年 1 月 SpaceX 向 FCC 提交重磅申请，并于 5 月 S-1 招股书中正式确认将于 2027Q4 启动、2028 年规模化部署轨道 AI 计算卫星（StarMind）。每颗下一代卫星规划高达 250kW 太阳翼发电能力并搭载定制高算力 AI 芯片，运行于晨昏太阳同步轨道（几乎永不进入地球阴影），通过真空深空辐射排热，并由激光链路将推理 Token 毫秒级投送回地面用户。',
 formula: '套利公式：太空 0 电费/0 水耗/0 电网排队 + 星舰内部地板价发射成本 = 改写全球 AI 推理基础设施边际成本曲线',
 gauges: [['100万颗', '2026.01 FCC 申报远期轨道算力上限'], ['250 kW', '下一代大功率太阳能卫星单星电功率'], ['2028 放量', 'S-1 明确轨道算力商业规模化节点'], ['0 电网排队', '彻底绕开地面 5–7 年变压器并网瓶颈']]
 },
 {
 badge: 'ENGINE 03 · STARLINK MOBILE & DUAL-BAND SPECTRUM',
 title: 'Starlink Mobile 全球手机直连：从“农村宽带补充”升级为“全球无死角移动运营商”',
 desc: '早期星链必须安装锅盖天线，受限于家庭屋顶与车载场景；通过与 T-Mobile 等多国运营商合作直连（Direct-to-Cell），并重金锁定 EchoStar $196亿 2GHz S波段卫星频谱与 2026 年 10 月收购的 Grain 全美 800MHz 低频段，SpaceX 构建起“高空卫星广域覆盖 + 低频段室内穿墙”的完整移动通信网，直接面向全球数十亿存量普通手机收费。',
 formula: '变现双轮：(1) 全球运营商批发漫游分成 + (2) 自有频谱高溢价全覆盖移动套餐（毛利率 >70%）',
 gauges: [['$19.6B', '协议收购 EchoStar 2GHz 核心频谱'], ['800 MHz', '2026.10 补齐室内穿墙黄金低频段'], ['无需换手机', '存量 LTE/5G 智能手机原生直连'], ['80亿人口', 'Shotwell 锚定的全球潜在覆盖基数']]
 },
 {
 badge: 'ENGINE 04 · SPACEX SI: GROK × CURSOR × 1.7GW+ SUPERCLUSTERS',
 title: 'SpaceXSI 软件与基础设施：以 $600亿 Cursor 卡位全球 AI 自动编程最高频入口',
 desc: '2026 年合并 xAI 并收购 AI 编程霸主 Cursor（并表仅半季即创收 $6.08亿）绝非财务拼凑：Cursor 掌握全球数百万顶尖工程师的实时代码演进与调试上下文，为 Grok 基座大模型提供了最稀缺的高质量强化学习闭环；同时 1.7GW 已装机超算集群（及 Apollo $400亿租赁扩容）向超大企业客户提供算力与智能体平台服务，Q3 单季收入已达 $75.6亿。',
 formula: '飞轮闭环：Cursor 独家开发者数据 → 训练最强代码/工程推理模型 Grok → 反哺星舰/星链自研软件并对外变现',
 gauges: [['$7.56B/季', 'Q3 2026 SI 跃居第一大营收分部'], ['$608M', 'Cursor 2026.08.14 并表后半季收入'], ['1.7 GW', '截至 Q3 2026 已投产 GPU 算力规模'], ['$40B 租赁', '2026.10 签署 Apollo GPU 算力扩容']]
 },
 {
 badge: 'ENGINE 05 · STARSHIELD & PROLIFERATED DEFENSE CONSTELLATIONS',
 title: 'Starshield（星盾）与主权天基防务：重构现代大国分布式太空安全底座',
 desc: '传统数亿美元一颗的大型高轨军用侦察/通信卫星在反卫星武器面前极其脆弱。SpaceX 依托每周 60+ 颗商业化卫星产线，为美国太空军、国家侦察局（NRO）及盟国定制成百上千颗低轨分布式加密遥感、导弹跟踪（如美军新型天基防御架构）与抗干扰战术通信网，正逐步切走传统军工五巨头最肥美的天基预算。',
 formula: '竞争代差：批产成本低 70% + 发射交付快 4 倍 + 激光组网高抗毁性 → 锁定多年期高利润主权订单',
 gauges: [['$2.13B/季', 'Q3 2026 政企与政府连接收入 (+91%)'], ['NSSL 主力', '猎鹰9/重型猎鹰包揽高机密军用发射'], ['抗毁网格', '百颗级低轨分布式节点替代单颗大星'], ['高续约粘性', '国家级安全基础设施零替代风险']]
 },
 {
 badge: 'ENGINE 06 · ARTEMIS HLS LUNAR LANDER & MARS INTERPLANETARY',
 title: '地月经济圈与火星殖民：把人类推向多行星物种的终极创立使命',
 desc: 'SpaceX 在 S-1 开篇直言公司存在的终极理由：“我们不希望人类重蹈恐龙灭绝的覆辙。”通过 NASA 阿尔忒弥斯（Artemis）数十亿美元载人登月舱（Starship HLS）合同打磨在轨低温甲烷/液氧加注与深空生命保障系统，SpaceX 不仅包揽重返月球的核心干线运输，更在为每 26 个月一次的地球-火星发射窗口储备百吨级星际运力。',
 formula: '战略定位：以 NASA 政府登月合同补贴深空前沿研发 → 孵化本世纪下半叶地月资源开发与火星城市基建',
 gauges: [['Artemis HLS', 'NASA 选定载人重返月球着陆器平台'], ['在轨加注', '深空百吨级载荷跨引力井核心钥匙'], ['26个月/次', '地火霍曼转移轨道批量发射窗口'], ['$28.5T TAM', 'S-1 锚定天地算力与太空经济总空间']]
 }
 ],
 en: [
 {
 badge: 'ENGINE 01 · STARSHIP FULL REUSABILITY & ORBITAL REFUELING',
 title: 'Starship V3 Full Reusability: Cutting Access-to-Orbit Marginal Cost by Another Order of Magnitude',
 desc: 'Falcon 9 reuses its booster and fairings (~70% of vehicle cost) while expending its upper stage; Starship is history\'s first 100% fully reusable super-heavy system. On Nov 14, 2026, Flight 15 caught the returning orbital Ship 42 with Starbase\'s Mechazilla chopsticks, validating legless weight savings and rapid pad turnaround toward 150–200t+ V3 orbital payloads.',
 formula: 'Physics multiplier: ~10x payload per flight vs Falcon 9 × zero upper-stage expendability = exclusive carrier for Starlink V3 & StarMind AI',
 gauges: [['Flight 15', 'Nov 2026 first orbital Ship tower catch'], ['150–200t', 'Starship V3 reusable LEO payload target'], ['~$3M–$5M', 'Long-term marginal propellant/ops target'], ['400 / 4Yrs', 'Management 4-year Starship flight target']]
 },
 {
 badge: 'ENGINE 02 · STARMIND ORBITAL SOLAR AI DATA CENTERS',
 title: 'StarMind Orbital AI Compute: 1M-Satellite FCC Filing Bypassing Terrestrial Power Bottlenecks',
 desc: 'Following its Jan 2026 FCC filing for up to 1M orbital AI data-center satellites, SpaceX\'s May 2026 S-1 confirmed plans to launch AI-compute satellites starting Q4 2027 and scaling in 2028. Operating in dawn-dusk sun-synchronous orbits with 250kW solar arrays and vacuum radiative cooling, StarMind beams low-latency inference back via optical lasers.',
 formula: 'Arbitrage equation: 24/7 space solar + zero water cooling + internal Starship lift = structural cost & speed advantage over grid-locked clouds',
 gauges: [['Up to 1M', 'Jan 2026 FCC orbital AI constellation cap'], ['250 kW', 'Next-gen solar satellite bus power target'], ['2028 Scale', 'S-1 target for commercial orbital AI scale'], ['Zero Grid Lag', 'Bypasses 5–7 yr utility transformer queues']]
 },
 {
 badge: 'ENGINE 03 · STARLINK MOBILE & DUAL-BAND SPECTRUM',
 title: 'Starlink Mobile Direct-to-Cell: Evolving from Rural Dish Broadband into a Global Wireless Carrier',
 desc: 'Combining T-Mobile and international MNO partnerships with its $19.6B EchoStar 2GHz spectrum agreement and Oct 2026 Grain nationwide 800MHz indoor-penetrating spectrum acquisition, SpaceX is building a hybrid space-terrestrial wireless network serving billions of unmodified LTE/5G smartphones globally.',
 formula: 'Dual monetization: (1) Global MNO wholesale roaming share + (2) High-margin direct Starlink Mobile all-coverage plans (>70% GM)',
 gauges: [['$19.6B', 'Pending EchoStar 2GHz spectrum purchase'], ['800 MHz', 'Oct 2026 indoor-penetrating low-band deal'], ['Unmodified', 'Works directly with standard smartphones'], ['8B People', 'Global addressable handset population']]
 },
 {
 badge: 'ENGINE 04 · SPACEX SI: GROK × CURSOR × 1.7GW+ SUPERCLUSTERS',
 title: 'SpaceXSI Stack: Owning the Developer Coding Moat ($60B Cursor) & Multi-GW Compute',
 desc: 'Merging xAI (Feb 2026) and acquiring AI coding leader Cursor for ~$60B (Aug 2026, adding $608M revenue in ~6 weeks) pairs real-time software engineering telemetry with Grok frontier models and 1.7GW of installed GPU compute (backed by a ~$40B Apollo GPU lease commitment)—generating $7.56B in Q3 2026 revenue.',
 formula: 'Flywheel: Cursor real-world coding workflows → superior Grok reasoning/coding models → enterprise SaaS & SI cloud monetization',
 gauges: [['$7.56B/qtr', 'Q3 2026 SI became #1 revenue segment'], ['$608M', 'Cursor partial-Q3 revenue post-Aug 14'], ['1.7 GW', 'Installed nameplate GPU compute (Q3 26)'], ['~$40B Lease', 'Oct 2026 Apollo GPU expansion commitment']]
 },
 {
 badge: 'ENGINE 05 · STARSHIELD & PROLIFERATED DEFENSE CONSTELLATIONS',
 title: 'Starshield Sovereign Defense: Proliferated LEO Architecture for Tracking & Secure Comms',
 desc: 'Replacing vulnerable billion-dollar GEO defense satellites, Starshield leverages SpaceX\'s 60+/week satellite assembly line and optical inter-satellite links to deploy resilient proliferated LEO sensing, missile-tracking, and encrypted battle-management networks for the U.S. Space Force, NRO, and allied governments.',
 formula: 'Competitive edge: 70% lower unit bus cost + 4x faster launch deployment + mesh resilience → multi-year sovereign backlog',
 gauges: [['$2.13B/qtr', 'Q3 2026 Enterprise & Gov Starlink (+91%)'], ['NSSL Prime', 'Falcon 9/Heavy lead classified launches'], ['Mesh Resilience', 'Proliferated LEO beats exquisite GEO'], ['Sovereign Lock', 'Mission-critical multi-year defense contracts']]
 },
 {
 badge: 'ENGINE 06 · ARTEMIS HLS LUNAR LANDER & MARS INTERPLANETARY',
 title: 'Cislunar Economy & Mars Colonization: Backing Humanity\'s Multiplanetary Insurance Policy',
 desc: 'SpaceX\'s S-1 states its foundational mission succinctly: "We do not want humans to have the same fate as dinosaurs." NASA\'s multi-billion-dollar Artemis Human Landing System (HLS) contracts co-fund orbital cryogenic refueling and deep-space life support—paving the highway for lunar bases and Mars cargo windows.',
 formula: 'Strategic logic: NASA HLS milestones co-fund deep-space R&D → unlocking cislunar logistics & interplanetary civilization transport',
 gauges: [['Artemis HLS', 'Selected NASA crewed lunar lander'], ['Orbital Refuel', 'Key to 100t+ deep-space payload delivery'], ['26-Mo Sync', 'Earth-Mars Hohmann transfer launch windows'], ['$28.5T TAM', 'S-1 total space, connectivity & AI market']]
 }
 ]
 };

 function renderHorizon() {
 var arr = HORIZONS[state.lang] || HORIZONS.zh;
 var hz = arr[state.hz] || arr[0];
 document.getElementById('hzBadge').textContent = hz.badge;
 document.getElementById('hzTitle').textContent = hz.title;
 document.getElementById('hzList').innerHTML = hz.items.map(function (t) {
 return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
 }).join('');
 document.getElementById('hzProb').textContent = hz.prob;
 document.getElementById('hzImpact').textContent = hz.impact;
 }

 function renderEngine() {
 var arr = ENGINES[state.lang] || ENGINES.zh;
 var eg = arr[state.eng] || arr[0];
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').textContent = eg.title;
 document.getElementById('engDesc').textContent = eg.desc;
 document.getElementById('engFormula').textContent = eg.formula;
 document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
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
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl) sl.setAttribute('aria-pressed', state.theme === 'light' ? 'true' : 'false');
 if (sd) sd.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
 drawAll();
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
 renderHorizon();
 renderEngine();
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 document.getElementById('hzTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 state.hz = parseInt(b.getAttribute('data-hz'), 10) || 0;
 var bs = this.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderHorizon();
 });

 document.getElementById('engineRail').addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 state.eng = parseInt(b.getAttribute('data-eng'), 10) || 0;
 var bs = this.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderEngine();
 });

 // Suite Hub Filter & Navigation
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
 

 function prepCanvas(id) {
 var c = document.getElementById(id);
 if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
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

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var peers = [
 { name: 'Amazon', cap: 105.0, col: pal.amber, tip: 'AWS 与地面数据中心重度扩张，受制于北美电网排队' },
 { name: 'Microsoft', cap: 88.0, col: pal.blue, tip: '全球地面 AI 超算资本开支高位运行' },
 { name: 'Alphabet', cap: 76.0, col: pal.violet, tip: 'TPU 集群与云基础设施地面投入' },
 { name: 'SpaceX (9M年化)', cap: 64.1, col: pal.green, tip: '9M26 实际 CapEx $48.07B（年化 ~$64.1B；Q3单季 $19.59B），唯一兼具地面超算与星舰太空算力通道' },
 { name: 'Tesla (26E指引)', cap: 20.0, col: pal.red, tip: '2026 年 10 月更新全年 CapEx 指引约 ~$20B（AI 算力、电池与 Terafab）' }
 ];
 var maxC = 120;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.cap.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 3 ? pal.green : pal.sub; ctx.font = (i === 3 ? 'bold ' : '600 ') + '10.5px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name, body: p.tip });
 });
 } else {
 var steps = [
 { lbl: '2025基准', v: 18.7, b: 0, col: pal.blue, tip: 'FY2025 S-1 实际营收: $18.67B (星链 $11.39B + 航天 $4.09B + AI $3.20B)' },
 { lbl: '+26年跃迁', v: 39.6, b: 18.7, col: pal.violet, tip: 'Q3 2026 年化运行率达 $58.3B (+$39.6B 净增，SI 与星链双轮爆发)' },
 { lbl: '+宽带/星盾', v: 44.0, b: 58.3, col: pal.green, tip: '星链 V3 全球宽带、航空海事与 Starshield 国防扩张贡献 +$44B' },
 { lbl: '+手机直连', v: 35.0, b: 102.3, col: pal.amber, tip: 'EchoStar 2GHz + 800MHz Starlink Mobile 全球直连贡献 +$35B' },
 { lbl: '+轨道AI/Cursor', v: 78.0, b: 137.3, col: pal.violet, tip: 'StarMind 轨道数据中心 (2028+) 与 Cursor/Grok 生态贡献 +$78B' },
 { lbl: '2032E蓝图', v: 215.3, b: 0, col: pal.green, tip: '2032E 远期营收蓝图: ~$215B+（横跨连接、轨道算力与深空物流）' }
 ];
 var maxB = 240;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
 var yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
 ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['Q3 25A', 'Q3 26A', '2027E', '2028E(轨道)', '2029E', '2030E'];

 if (state.sView === 'gw') {
 var terrGw = [0.6, 1.7, 3.2, 4.5, 5.5, 6.5];
 var orbGw = [0.0, 0.0, 0.1, 1.2, 3.8, 8.5];
 var maxG = 16.0;
 for (var g = 0; g <= 4; g++) {
 var gv = g * 4, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + 'GW', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(38, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var hT = (terrGw[i] / maxG) * ph, hO = (orbGw[i] / maxG) * ph;
 var yT = pad.top + ph - hT, yO = yT - hO;
 ctx.fillStyle = pal.blue;
 roundRect(ctx, x, yT, bw, Math.max(3, hT), 4); ctx.fill();
 if (orbGw[i] > 0) {
 ctx.fillStyle = pal.violet;
 roundRect(ctx, x, yO, bw, Math.max(3, hO), 4); ctx.fill();
 }
 var tot = terrGw[i] + orbGw[i];
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(tot.toFixed(1) + 'GW', x + bw / 2, (orbGw[i] > 0 ? yO : yT) - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: orbGw[i] > 0 ? yO : yT, w: bw, h: hT + hO, title: y + ' AI 算力底座', body: '地面装机 ' + terrGw[i].toFixed(1) + ' GW + StarMind 轨道算力 ' + orbGw[i].toFixed(1) + ' GW (Q3 25/26 为 10-Q 实际值)' });
 });
 } else {
 var subs = [7.2, 13.6, 22.0, 34.0, 48.0, 65.0];
 var maxS = 72;
 for (var m = 0; m <= 3; m++) {
 var mv = m * 24, my = pad.top + ph - (mv / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv + 'M', pad.left - 8, my + 4);
 }
 ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
 subs.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxS) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 subs.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxS) * ph;
 ctx.fillStyle = idx <= 1 ? pal.blue : pal.green;
 ctx.beginPath(); ctx.arc(px, py, 4.4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + 'M', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[idx], px, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: yrs[idx] + ' 星链订户', body: v.toFixed(1) + 'M 活跃订户（Q3 25A 7.2M 与 Q3 26A 13.6M 为 10-Q 披露值）' });
 });
 }
 }

 // F4: Interactive 2030 Optionality Builder
 var OPT_DATA = {
 d2c: { rev: 28, ebitda: 18.2 },
 starmind: { rev: 46, ebitda: 26.7 },
 cursor: { rev: 32, ebitda: 17.6 },
 shield: { rev: 19, ebitda: 9.5 },
 mars: { rev: 25, ebitda: 11.0 }
 };
 var miniCaps = [1.90, 1.58, 3.88];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = state.lang === 'en' ? ['Nov 2026 Cap', '2030 Core Only', '2030 + Options'] : ['当前市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(4.5, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2) + 'T', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }

 function recalcOptionality() {
 // Core organic 2030E base (existing residential/enterprise Starlink + core Falcon/Starship + existing SI contracts): $90B Rev, $47.8B EBITDA, +$51.8B net cash
 var baseRev = 90.0, baseEb = 47.8, netCashB = 51.8;
 var addRev = 0, addEb = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addEb += d.ebitda; }
 }
 });
 var totRev = baseRev + addRev;
 var totEb = baseEb + addEb;
 var ebMargin = (totEb / totRev) * 100;
 var mcapT = (totEb * state.pe + netCashB) / 1000;
 var baseMcapT = (baseEb * state.pe + netCashB) / 1000;

 document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totEb.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = ebMargin.toFixed(1) + '%';
 document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

 miniCaps = [1.90, baseMcapT, mcapT];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 chk.addEventListener('change', recalcOptionality);
 });
 document.getElementById('peTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 32;
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 recalcOptionality();
 });

 function bindSeg(gid, attr, skey, fn) {
 var g = document.getElementById(gid);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect();
 var mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) {
 var rg = arr[i];
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
 ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

 function drawAll() {
 drawFutureCanvas();
 drawSiliconCanvas();
 drawOptMiniCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS = [
 { id: 'sec-f0', t: 'F0 Flight 15 奇点与三阶战略时间窗', s: '2026–2032 近程/中程/远期三大兑现阶段与 $28.5T TAM' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: '星舰全复用 · StarMind轨道AI · 手机直连 · Cursor/Grok · 星盾 · 登月火星' },
 { id: 'sec-f2', t: 'F2 太空算力套利与 2032 营收阶梯桥', s: '年化 $64B CapEx 对标云巨头 · $18.7B→$215B 营收桥' },
 { id: 'sec-f3', t: 'F3 猛禽3、V3卫星与双频谱合围路线图', s: '1.7GW→15GW 地面+轨道算力爬坡与 6,500万订户推演' },
 { id: 'sec-f4', t: 'F4 2030 冲击 $5万亿+市值期权组装器', s: '自由开关五大新业务期权与 EV/EBITDA 倍数实时测算' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 if (!qPop) return;
 var q = (kw || '').trim().toLowerCase();
 var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
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
 if (e.key === 'Escape') {
 if (qPop) qPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
 setTimeout(drawAll, 60);
 } else {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

 
 
 

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

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 