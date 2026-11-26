
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_AUDIT_KEY = 'aapl_culture_bp_audit_v1';

 var TITLE_ZH = '苹果企业文化与组织操作系统图谱：单一损益表、专家治企与三代传承 | 数据中心';
 var TITLE_EN = 'Apple Organizational OS & Culture Blueprint: Single P&L, Experts & 3-Era Legacy | Research Hub';

 var state = {
 theme: 'dark',
 lang: 'zh',
 topoMode: 'apple',
 activeQuad: 0,
 activeEra: 2,
 eView: 'revemp',
 gView: 'emp',
 eraSeries: { fcf: true, rd: true },
 hover: { eraCanvas: -1, genomeCanvas: -1, entropyCanvas: -1 }
 };
 var hits = { eraCanvas: [], genomeCanvas: [], entropyCanvas: [] };

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
 green: dark ? '#22C55E' : '#16A34A',
 violet: dark ? '#A78BFA' : '#7C3AED',
 amber: dark ? '#FFB74D' : '#D97706',
 red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 c0_lead: {
 zh: '几乎所有跨过百亿美元营收门槛的现代跨国企业，都会自然演化为按产品线切割的<strong>“事业部总经理制（Multi-Division P&amp;L）”</strong>。但 1997 年史蒂夫·乔布斯重返濒临破产的苹果时，在<strong>同一天内解雇了全部事业部总经理</strong>，把整家公司合并进<strong>唯一一张损益表（Single P&amp;L）</strong>，并重构为按专业能力划分的<strong>职能制组织（Functional Organization）</strong> <a class="cite-link" href="https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf" target="_blank" rel="noopener noreferrer">HBR · Podolny &amp; Hansen ↗</a>。 令人震撼的是，即便今天苹果营收高达 <strong>$4,788.3亿</strong>、全职员工达 <strong>16.7万人</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">FY26 Q4 财报 ↗</a>，iPhone、Mac 或 AirPods 依然没有各自独立的财务损益表——全公司只有 CFO 掌握唯一一张财务报表，从制度根源上消灭了大企业“部门本位主义”与内部转移定价内耗。',
 en: 'Virtually every modern enterprise crossing $10B in sales fragments into product-line <strong>“Multi-Division P&amp;Ls.”</strong> Yet upon returning to a near-bankrupt Apple in 1997, Steve Jobs <strong>fired every business-unit general manager in a single day</strong>, consolidated the firm into a <strong>Single Company-Wide P&amp;L</strong>, and rebuilt it as a <strong>Functional Organization</strong> <a class="cite-link" href="https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf" target="_blank" rel="noopener noreferrer">HBR · Podolny &amp; Hansen ↗</a>. Remarkably, even at <strong>$478.83B</strong> in revenue and <strong>167,000 FTEs</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">FY26 Q4 Release ↗</a>, iPhone, Mac, and AirPods still have no standalone P&amp;Ls—only the CFO holds one master ledger, eliminating turf wars and transfer-pricing friction.'
 },
 c0_quote: {
 zh: '<strong>核心制度洞察（Joel Podolny · 前 Apple University 院长）：</strong>“将决策权赋予最有专业深度的人（Experts Leading Experts），而不是最懂看财务报表的通才总经理；当硬件、芯片、软件与工业设计不为各自部门利润率争抢地盘时，跨部门激烈辩论的唯一裁判标准就只剩下用户体验本身。” <a class="cite-link" href="https://store.hbr.org/product/how-apple-is-organized-for-innovation/R2006F" target="_blank" rel="noopener noreferrer">HBR R2006F ↗</a>',
 en: '<strong>Institutional Insight (Joel Podolny · Former Dean, Apple University):</strong> “Assign decision rights to those with the deepest domain expertise (Experts Leading Experts), not generalist GMs chasing unit P&amp;Ls. When silicon, hardware, software, and design never fight over divisional margins, the sole arbiter of cross-functional debate is end-user experience.” <a class="cite-link" href="https://store.hbr.org/product/how-apple-is-organized-for-innovation/R2006F" target="_blank" rel="noopener noreferrer">HBR R2006F ↗</a>'
 },
 c2_note: {
 zh: '注：尽管员工数从 1997 年不足万人增至 16.7 万人（含零售店团队），人均创收仍高达 <strong>$287万美元</strong>；若剔除直营零售店编制、仅按研发与总部人员测算，核心工程人效超过 $500万/人 <a class="cite-link" href="https://fortune.com/article/how-apple-works-inside-the-worlds-biggest-startup/" target="_blank" rel="noopener noreferrer">Fortune 深度调查 ↗</a>。',
 en: 'Note: Despite scaling from under 10k employees in 1997 to 167k FTEs (including Retail), revenue per employee reached <strong>$2.87M</strong>; excluding store staff, core corporate &amp; R&amp;D productivity exceeds $5.0M per employee <a class="cite-link" href="https://fortune.com/article/how-apple-works-inside-the-worlds-biggest-startup/" target="_blank" rel="noopener noreferrer">Fortune Investigation ↗</a>.'
 },
 c3_note: {
 zh: '观察结论：坚持<strong>“无事业部割据 + 软硬全栈耦合”</strong>的两大科技巨头——<strong>NVIDIA</strong>（黄仁勋约 60 名高管扁平直报）与 <strong>Apple</strong>（单一 P&amp;L 职能集权）——双双创下硬科技领域最高的人均创收与现金流利润率。',
 en: 'Key Takeaway: Both tech giants that reject divisional silos in favor of <strong>full-stack functional integration</strong>—<strong>NVIDIA</strong> (~60 direct reports to Jensen Huang) and <strong>Apple</strong> (Single-P&amp;L functional org)—lead hard tech in revenue per employee and cash margin.'
 }
 };

 function renderTopo(mode) {
 state.topoMode = mode === 'legacy' ? 'legacy' : 'apple';
 var stage = document.getElementById('topoStage');
 if (!stage) return;
 var en = isEn();
 if (state.topoMode === 'apple') {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono">CEO (John Ternus) × CFO Single Enterprise P&amp;L Pool ($478.8B)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>Silicon SVP</b>Johny Srouji · A/M/C chips shared freely across all devices</div>' +
 '<div class="cc-spoke"><b>Software SVP</b>Craig Federighi · 6 OS platforms sharing core &amp; edge AI</div>' +
 '<div class="cc-spoke"><b>Hardware Eng.</b>Unified camera, acoustics &amp; enclosure R&amp;D across lines</div>' +
 '<div class="cc-spoke"><b>Industrial Design</b>Squircle &amp; HI craft hold global design veto power</div>' +
 '<div class="cc-spoke"><b>Services SVP</b>Eddy Cue · Zero-friction iCloud / Pay / Music integration</div>' +
 '<div class="cc-spoke"><b>Ops &amp; Retail</b>Sabih Khan · Unified wafer locks + 540 zero-discount stores</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">Outcome: Camera teams share algorithms freely, Mac &amp; iPhone interlock via Continuity, and new icons dare to cannibalize legacy lines (iPhone → iPod).</div>'
 : '<div class="cc-topo-hub mono">CEO (John Ternus) × CFO 唯一损益表池 ($478.8B)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>芯片技术 SVP</b>Johny Srouji · A/M/C 硅片跨全品类无偿共享</div>' +
 '<div class="cc-spoke"><b>软件工程 SVP</b>Craig Federighi · 6大OS共享内核与端侧 AI</div>' +
 '<div class="cc-spoke"><b>硬件工程 SVP</b>全系结构/声学/光学相机模组统一攻坚</div>' +
 '<div class="cc-spoke"><b>工业与人机设计</b>Squircle 曲率与交互规范全局一票否决权</div>' +
 '<div class="cc-spoke"><b>服务生态 SVP</b>Eddy Cue · 零内耗预装 iCloud / Pay / Music</div>' +
 '<div class="cc-spoke"><b>全球运营/零售</b>Sabih Khan · 统一采购锁产能 + 540店零折扣</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：相机团队不为自身利润惜售算法，Mac 主动配合 iPhone 连续互通，新品敢于自我革命（iPhone 吞噬 iPod）</div>';
 } else {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">Legacy Holding HQ · Each BU GM Carries Independent KPIs &amp; Bonus Pool</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>Phone BU GM</b>Maintains duplicate silicon/OS teams; refuses to subsidize tablets</div>' +
 '<div class="cc-spoke silo"><b>PC BU GM</b>Guards legacy ports; resists deep cross-device OS integration</div>' +
 '<div class="cc-spoke silo"><b>Audio / Imaging</b>Hoards flagship sensors to protect standalone unit margin</div>' +
 '<div class="cc-spoke silo"><b>Cloud / Content</b>Charges steep internal transfer fees for preloads</div>' +
 '<div class="cc-spoke silo"><b>Regional Sales</b>Discounts aggressively to hit quarterly quotas, eroding ASP</div>' +
 '<div class="cc-spoke silo"><b>Split Sourcing</b>Fragmented orders lose wafer &amp; memory allocation leverage</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">Failure Mode (Classic Sony / Nokia Trap): Every division optimizes its local P&amp;L while losing the cross-device ecosystem war.</div>'
 : '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统集团控股总部 · 各事业部总经理背负独立 KPI 与奖金池</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>手机事业部 GM</b>独自养一套芯片/OS团队，拒绝补贴平板部门</div>' +
 '<div class="cc-spoke silo"><b>PC 电脑事业部 GM</b>死守旧接口标准，抗拒与手机底层打通</div>' +
 '<div class="cc-spoke silo"><b>音频/相机事业部</b>担心影响高端单品毛利，拒绝下放旗舰传感器</div>' +
 '<div class="cc-spoke silo"><b>云与内容事业部</b>内部结算高额渠道分成，预装谈判旷日持久</div>' +
 '<div class="cc-spoke silo"><b>区域销售诸侯</b>为冲季度返点各自打折，破坏全球高端定价体系</div>' +
 '<div class="cc-spoke silo"><b>采购各自为政</b>订单分散丧失对晶圆厂与存储厂的首发包产议价权</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：典型的昔日索尼/诺基亚困境——每个部门都在最大化局部报表，最终输掉跨终端系统级体验战</div>';
 }
 }

 var QUADS = [
 {
 badge: 'Q1 · EXPERTS LEADING EXPERTS (HBR)',
 titleZh: '专家治企三大硬指标：深度专业 × 细节沉浸 × 协同辩论',
 titleEn: 'Three Pillars of Expert Leadership: Depth × Detail Immersion × Collaborative Debate',
 descZh: '在苹果，600 多名硬件相机专家归属于同一个相机硬件副总裁，而非散落在 iPhone、iPad 或 Mac 事业部。高管不仅要懂方向，更要懂底层物理约束（如双摄人像景深算法或超椭圆连续曲率），才能在跨部门辩论中做出专业裁决。',
 descEn: 'At Apple, 600+ camera hardware specialists report to one Camera VP rather than separate iPhone or Mac divisions. Leaders must grasp physical constraints—from computational depth algorithms to Squircle curvature—to arbitrate cross-functional debates.',
 alloc: [45, 25, 18, 12]
 },
 {
 badge: 'Q2 · DRI ACCOUNTABILITY & TOP 100',
 titleZh: 'DRI 直接责任人铁律：消灭大公司最致命的“集体免责”',
 titleEn: 'Single DRI Rule: Eliminating Diffused Committee Responsibility',
 descZh: '《财富》杂志披露，苹果内部流传一句格言：“永远不存在没有单点负责人的项目。”当年 MobileMe 首秀失利，乔布斯当场更换 DRI 并重组团队，最终锻造出支撑超 15 亿付费订阅的 iCloud 云底座。',
 descEn: 'As Fortune documented, Apple lives by the maxim that no project exists without one named owner. After MobileMe stumbled, Jobs replaced the DRI on the spot and rebuilt the team—forging iCloud into a 1.5B+ paid-subscription backbone.',
 alloc: [38, 22, 15, 25]
 },
 {
 badge: 'Q3 · RADICAL FOCUS & SECRECY',
 titleZh: '残酷减法：对 99 个好点子说“不”，只把全部算力砸向 1 个神作',
 titleEn: 'Radical Subtraction: Saying No to 99 Good Ideas to Perfect 1 Icon',
 descZh: '1997 年苹果产品线杂乱无章，乔布斯在白板上画出“消费/专业 × 台式/便携” 2×2 四格表，砍掉 70% 项目。即便在万亿市值阶段，苹果依然果断关停缺乏护城河闭环的整车制造，将数千名工程师火速转入端侧生成式 AI。',
 descEn: 'In 1997, Jobs drew a 2×2 Consumer/Pro × Desktop/Portable grid and axed 70% of Apple’s lineup. Even at multi-trillion scale, Apple canceled Project Titan EV and redeployed thousands of engineers into edge AI.',
 alloc: [50, 28, 12, 10]
 },
 {
 badge: 'Q4 · APPLE UNIVERSITY CODIFICATION',
 titleZh: 'Apple University：把创始人的直觉转化为可传承的组织教材',
 titleEn: 'Apple University: Codifying Founder Intuition into Institutional Curriculum',
 descZh: '毕加索画《公牛》从第一版繁复写实到第十一版仅余寥寥数笔却神韵毕现——苹果大学以此训练每一代新晋总监：伟大的工程不是堆砌参数，而是替用户消化全部底层复杂度，只留下最直觉的交互。',
 descEn: 'Picasso’s 11-plate Bull progression—from anatomical realism to a few essential lines—trains every new Apple director: great engineering absorbs complexity under the hood so the user experiences effortless simplicity.',
 alloc: [25, 30, 30, 15]
 }
 ];

 function renderQuad(idx) {
 state.activeQuad = idx;
 var q = QUADS[idx] || QUADS[0];
 var en = isEn();
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = en ? q.titleEn : q.titleZh;
 document.getElementById('dialDesc').textContent = en ? q.descEn : q.descZh;
 [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (pair) {
 document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
 document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
 });
 }

 var ERAS = [
 {
 badge: 'ERA I · 1997–2011 · STEVE JOBS REFOUNDING',
 titleZh: '乔布斯重塑期：一日废除事业部诸侯，用“海盗精神”拯救濒死苹果',
 titleEn: 'Jobs Reset Era: Abolishing BU Fiefdoms in One Day to Save a Dying Icon',
 descZh: '1997 年回归时苹果距破产仅 90 天。乔布斯一天内裁撤全部事业部总经理、确立唯一损益表职能制，用 2×2 矩阵砍掉 70% 冗余型号，建立工业设计至高话语权、DRI 问责制与 Top 100 峰会，接连引爆 iMac、iPod、iTunes、iPhone、App Store 与 iPad 六大物种革命。',
 descEn: '90 days from insolvency in 1997, Jobs terminated all BU GMs in one day, unified Apple under a single P&L, cut 70% of SKUs via a 2×2 grid, instituted DRI & Top 100 retreats, and launched Apple University—igniting iMac, iPod, iTunes, iPhone, App Store, and iPad.',
 kpisZh: [['$7.1B → $108B', '14年营收暴增逾 15 倍'], ['2×2 四象限', '砍掉 70% 亏损杂乱产品线'], ['2008 创立', 'Apple University 制度化传承'], ['单一 P&L', '彻底终结内部部门利润墙']],
 kpisEn: [['$7.1B → $108B', '>15x Revenue Growth in 14 Years'], ['2×2 Matrix', 'Axed 70% of Loss-Making SKUs'], ['Founded 2008', 'Apple University Institutionalized'], ['Single P&L', 'Ended Internal Margin Walls']]
 },
 {
 badge: 'ERA II · 2011–2026.08 · TIM COOK SCALING SYMPHONY',
 titleZh: '库克扩张期：在十倍规模上升级“审慎领导力”，打造自研芯片与服务双帝国',
 titleEn: 'Cook Scaling Era: Discretionary Leadership at 10x Scale, Apple Silicon & Services',
 descZh: '外界曾质疑职能制无法支撑十万人级巨舰，库克却在保持单一损益表不变的前提下，推动 SVP 团队践行“审慎领导力”，完成苹果史上最硬核的 Apple Silicon（A/M 系列）全系自研切换，孵化出 Apple Watch 与 AirPods 两大百亿级新品类，并将高毛利服务业务推过千亿美元大关。',
 descEn: 'Skeptics doubted functional orgs could scale past 100k employees, yet Cook preserved the Single P&L while evolving Discretionary Leadership—executing the Apple Silicon transition, scaling Watch & AirPods, and building a $123B+ Services engine.',
 kpisZh: [['$108B → $479B', '营收再翻 4.4 倍登顶全球'], ['-58天 CCC', '全球极致供应链零库存艺术'], ['>25亿台', '全球活跃安装设备底座'], ['>$7,300亿', '累计股票回购重塑股东回报']],
 kpisEn: [['$108B → $479B', '4.4x Revenue Expansion'], ['-58 Days CCC', 'Negative Working Capital Mastery'], ['>2.5B Devices', 'Global Active Installed Base'], ['>$730B', 'Cumulative Share Buybacks']]
 },
 {
 badge: 'ERA III · 2026.09+ · JOHN TERNUS PRODUCT ENGINEERING ERA',
 titleZh: '约翰·特努斯时代（库克转任执行董事长）：老兵回归产品工程第一性原理',
 titleEn: 'John Ternus Era (Cook as Exec Chair): Hardware Veteran Returns to First Principles',
 descZh: '在库克掌舵 15 年将苹果推上 $5万亿市值后，深耕苹果硬件工程逾二十年、主导过 iPad、Mac 向 Apple Silicon 迁移及 iPhone 架构重构的 John Ternus 接任 CEO。这一交接本身就是“专家领导专家”文化的最高加冕：在端侧 Siri AI、折叠机 iPhone Duo 与触控 Mac 破局的关键十年，最高决策权交还给最懂工程细节的产品统帅。',
 descEn: 'After Cook steered Apple to ~$5T over 15 years, 25-year hardware engineering chief John Ternus—architect of iPad, Apple Silicon Mac, and iPhone transitions—became CEO. It is the ultimate validation of “experts leading experts” for the Edge Siri AI, foldable iPhone Duo, and Touch Mac decade.',
 kpisZh: [['$478.83B', 'FY2026 历史新高总营收'], ['$2.87M / 人', '16.7万全职员工超高人效'], ['48.8%', '全栈自研推升综合毛利率'], ['6大OS + AI', '端侧隐私大模型深度耦合']],
 kpisEn: [['$478.83B', 'Record FY2026 Net Sales'], ['$2.87M / FTE', '167k FTE Productivity Peak'], ['48.8%', 'Full-Stack Gross Margin'], ['6 OS + AI', 'On-Device Privacy AI Coupling']]
 }
 ];

 function renderEra(idx) {
 state.activeEra = idx;
 var er = ERAS[idx] || ERAS[2];
 var en = isEn();
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = en ? er.titleEn : er.titleZh;
 document.getElementById('eraDesc').textContent = en ? er.descEn : er.descZh;
 var kpis = en ? er.kpisEn : er.kpisZh;
 document.getElementById('eraKpis').innerHTML = kpis.map(function (k) {
 return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
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

 renderTopo(state.topoMode);
 renderQuad(state.activeQuad);
 renderEra(state.activeEra);
 updateEntropySim();
 refreshAuditChip();
 renderEraLegend();
 drawAll();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 // C0 Topology Switcher
 var topoSwitch = document.getElementById('topoSwitch');
 if (topoSwitch) {
 topoSwitch.addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var bs = topoSwitch.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderTopo(b.getAttribute('data-topo'));
 });
 }

 // C1 Quadrant Selector
 var quadGrid = document.getElementById('quadGrid');
 if (quadGrid) {
 quadGrid.addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]');
 if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 var cs = quadGrid.querySelectorAll('.cc-quad-card');
 for (var i = 0; i < cs.length; i++) cs[i].classList.toggle('active', cs[i] === card);
 renderQuad(idx);
 });
 }

 // C2 Era Scrubber
 var eraTabs = document.getElementById('eraTabs');
 if (eraTabs) {
 eraTabs.addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 var ts = eraTabs.querySelectorAll('.cc-era-tab');
 for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('active', ts[i] === t);
 renderEra(idx);
 });
 }

 // High-DPI Retina Canvas Helpers
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
 ctx.strokeStyle = pal.pillBorder;
 ctx.lineWidth = 1;
 ctx.stroke();
 ctx.fillStyle = fgColor;
 ctx.textAlign = 'center';
 ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function renderEraLegend() {
 var leg = document.getElementById('eraLegend');
 if (!leg) return;
 var en = isEn();
 if (state.eView === 'revemp') {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Bars: Annual Revenue per FTE ($M · 1997–2026)' : '柱状图：全职员工人均年创收 ($M · 1997–2026)') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.eraSeries.fcf ? '' : ' muted') + '" data-era-series="fcf"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Free Cash Flow ($B)' : '年度自由现金流 FCF ($B)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.eraSeries.rd ? '' : ' muted') + '" data-era-series="rd"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Shared Functional R&amp;D ($B)' : '全栈共享研发投入 R&amp;D ($B)') + '</span></button>';
 }
 }

 var eraLegendEl = document.getElementById('eraLegend');
 if (eraLegendEl) {
 eraLegendEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-era-series]');
 if (!b) return;
 var k = b.getAttribute('data-era-series');
 state.eraSeries[k] = !state.eraSeries[k];
 if (!state.eraSeries.fcf && !state.eraSeries.rd) state.eraSeries[k] = true;
 renderEraLegend();
 drawEraCanvas();
 });
 }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.eView === 'revemp') {
 var yrs = ['1997', '2005', '2011', '2016', '2021', '2026'];
 var revEmp = [0.70, 0.94, 1.79, 1.86, 2.37, 2.87];
 var maxV = 3.25;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(42, slot * 0.56);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2;
 var x = cx - bw / 2;
 var bh = (revEmp[i] / maxV) * ph, yt = pad.top + ph - bh;
 if (state.hover.eraCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 var grad = ctx.createLinearGradient(0, yt, 0, pad.top + ph);
 if (i === 5) { grad.addColorStop(0, '#34D399'); grad.addColorStop(1, pal.green); }
 else if (i >= 4) { grad.addColorStop(0, '#A78BFA'); grad.addColorStop(1, pal.violet); }
 else { grad.addColorStop(0, '#3399FF'); grad.addColorStop(1, pal.blue); }
 ctx.fillStyle = grad;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.eraCanvas === i) {
 ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke();
 }
 drawValueBadge(ctx, '$' + revEmp[i].toFixed(2) + 'M', cx, yt - 12, i === 5 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hits.eraCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 28,
 title: 'FY' + y + (en ? ' Revenue per Employee' : ' 人均创收'),
 body: en
 ? ('$' + revEmp[i].toFixed(2) + 'M / FTE (Single P&L eliminates middle-office bloat)')
 : ('每位全职员工年创收 $' + revEmp[i].toFixed(2) + 'M（单一损益表无冗余中后台内耗）')
 });
 });
 } else {
 var lyrs = ['FY18', 'FY20', 'FY22', 'FY24', 'FY26'];
 var rdB = [14.2, 18.8, 26.3, 31.4, 35.6];
 var fcfB = [64.1, 73.4, 111.4, 108.8, 136.1];
 var maxF = 152;
 for (var k = 0; k <= 3; k++) {
 var kv = k * 50, ky = pad.top + ph - (kv / maxF) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var stepX = pw / (lyrs.length - 1);
 lyrs.forEach(function (lb, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.eraCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.3;
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 hits.eraCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: lb + (en ? ' · Shared R&D Leverage' : ' · 研发杠杆转化'),
 body: (en ? 'FCF: $' + fcfB[idx] + 'B · Shared R&D: $' + rdB[idx] + 'B (FCF/R&D = ' + (fcfB[idx] / rdB[idx]).toFixed(1) + 'x)'
 : '自由现金流 $' + fcfB[idx] + 'B · 共享研发 $' + rdB[idx] + 'B (FCF/R&D = ' + (fcfB[idx] / rdB[idx]).toFixed(1) + '倍)')
 });
 });

 function plot(arr, col, fillTop, name) {
 var pts = arr.map(function (v, idx) {
 return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxF) * ph, v: v };
 });
 ctx.save();
 drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph);
 ctx.lineTo(pts[0].x, pad.top + ph);
 ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)');
 ctx.fillStyle = ag; ctx.fill();
 ctx.restore();

 ctx.strokeStyle = col; ctx.lineWidth = 2.8;
 drawSmoothLine(ctx, pts); ctx.stroke();

 pts.forEach(function (pt, idx) {
 var isHov = state.hover.eraCanvas === idx;
 if (isHov) {
 ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill();
 }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.8 : 3.8, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '$' + pt.v + 'B', pt.x, pt.y - 14, col, pal);
 });
 }
 if (state.eraSeries.fcf) plot(fcfB, pal.green, 'rgba(22, 163, 74, 0.22)', en ? 'Free Cash Flow' : '自由现金流 FCF');
 if (state.eraSeries.rd) plot(rdB, pal.blue, 'rgba(0, 115, 230, 0.20)', en ? 'Shared R&D' : '共享研发 R&D');
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.genomeCanvas = [];
 var pad = { top: 20, right: 54, bottom: 24, left: en ? 142 : 124 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 var peers = [
 { name: en ? 'NVIDIA (Flat)' : 'NVIDIA (职能扁平)', emp: 5.14, gm: 74.5, col: pal.violet },
 { name: en ? 'Apple (Single P&L)' : 'Apple (单一P&L)', emp: 2.87, gm: 48.8, col: pal.blue },
 { name: en ? 'Meta (Flat Hacker)' : 'Meta (黑客扁平)', emp: 2.42, gm: 81.5, col: pal.green },
 { name: en ? 'Alphabet (Guilds)' : 'Alphabet (工程行会)', emp: 1.92, gm: 58.2, col: pal.amber },
 { name: en ? 'Microsoft (M-Form)' : 'Microsoft (事业部)', emp: 1.49, gm: 69.0, col: pal.blue }
 ];
 var isEmp = (state.gView === 'emp');
 var maxX = isEmp ? 5.8 : 90;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.gm;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, bl = (val / maxX) * pw;
 if (state.hover.genomeCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill();
 }
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 var bg = ctx.createLinearGradient(pad.left, 0, pad.left + bl, 0);
 bg.addColorStop(0, p.col); bg.addColorStop(1, p.col);
 ctx.fillStyle = bg;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = idx === 1 ? pal.blue : pal.sub;
 ctx.font = (idx === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 8, cy + 4);
 hits.genomeCanvas.push({
 idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH,
 title: p.name,
 body: en
 ? ('Rev/Employee: $' + p.emp.toFixed(2) + 'M · Gross Margin: ' + p.gm.toFixed(1) + '%')
 : ('人均创收 $' + p.emp.toFixed(2) + 'M · 综合毛利率 ' + p.gm.toFixed(1) + '%')
 });
 });
 }

 var entropySeries = [93, 88, 82, 74, 65];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.entropyCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en
 ? ['15 SKUs', '30 (Apple)', '60 SKUs', '90 SKUs', '120 (Sprawl)']
 : ['15款SKU', '30款(苹果)', '60款', '90款', '120款(机海)'];
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

 var pts = entropySeries.map(function (v, i) {
 return { x: pad.left + (i / 4) * pw, y: pad.top + ph - (v / 100) * ph, v: v };
 });

 ctx.save();
 drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph);
 ctx.lineTo(pts[0].x, pad.top + ph);
 ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, 'rgba(124, 58, 237, 0.25)');
 ag.addColorStop(1, 'rgba(124, 58, 237, 0.01)');
 ctx.fillStyle = ag; ctx.fill();
 ctx.restore();

 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();

 var slot = pw / 4;
 pts.forEach(function (pt, i) {
 var isHov = state.hover.entropyCanvas === i;
 if (isHov) {
 ctx.save(); ctx.strokeStyle = pal.violet; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(pt.x, pad.top); ctx.lineTo(pt.x, pad.top + ph); ctx.stroke(); ctx.restore();
 ctx.fillStyle = 'rgba(124, 58, 237, 0.22)'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill();
 }
 ctx.fillStyle = i === 1 ? pal.green : pal.violet;
 ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 5.2 : 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, String(Math.round(pt.v)), pt.x, pt.y - 13, i === 1 ? pal.green : pal.violet, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lbls[i], pt.x, pad.top + ph + 16);
 hits.entropyCanvas.push({
 idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 title: lbls[i],
 body: en
 ? ('Projected Functional Synergy Score: ' + Math.round(pt.v) + ' / 100')
 : ('推演软硬芯协同效率分：' + Math.round(pt.v) + ' / 100')
 });
 });
 }

 function updateEntropySim() {
 var skus = parseInt(document.getElementById('rngSkus').value, 10);
 var exp = parseInt(document.getElementById('rngExp').value, 10);
 var lag = parseInt(document.getElementById('rngLag').value, 10);
 var en = isEn();
 document.getElementById('valSkus').textContent = en
 ? (skus + ' SKUs' + (skus <= 35 ? ' (Minimalist)' : skus <= 70 ? ' (Bloat Alert)' : ' (Sprawl)'))
 : (skus + ' 款' + (skus <= 35 ? ' (极简区)' : skus <= 70 ? ' (膨胀警戒)' : ' (机海失控)'));
 document.getElementById('valExp').textContent = exp + '%';
 document.getElementById('valLag').textContent = lag + (en ? (lag <= 25 ? '% (Low)' : '% (High)') : (lag <= 25 ? '% (低摩擦)' : '% (高摩擦)'));

 var skuPenalty = Math.max(0, (skus - 25) * 0.42);
 var expBonus = (exp - 50) * 0.48;
 var synergy = Math.max(25, Math.min(99, Math.round(80 + expBonus - skuPenalty * 0.7 - (lag - 18) * 0.35)));
 var velocity = Math.max(20, Math.min(98, Math.round(94 - skuPenalty * 0.85 - (lag - 15) * 0.55 + (exp - 70) * 0.2)));
 var gmPrem = Math.max(-2.0, ((synergy - 50) * 0.27)).toFixed(1);

 document.getElementById('outSynergy').textContent = synergy + ' / 100';
 document.getElementById('outVelocity').textContent = velocity + ' / 100';
 document.getElementById('outGmPrem').textContent = (gmPrem >= 0 ? '+' : '') + gmPrem + 'pp';

 entropySeries = [15, 30, 60, 90, 120].map(function (s) {
 var sp = Math.max(0, (s - 25) * 0.45);
 return Math.max(22, Math.min(99, 80 + expBonus - sp - (lag - 18) * 0.35));
 });
 drawEntropyCanvas();
 }
 ['rngSkus', 'rngExp', 'rngLag'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', updateEntropySim);
 });

 function bindSegChart(gid, attr, skey, fn) {
 var g = document.getElementById(gid);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 if (gid === 'eChartTabs') renderEraLegend();
 fn();
 });
 }
 bindSegChart('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
 bindSegChart('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);

 function bindTooltip(cid, redrawFn) {
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
 if (state.hover[cid] !== nextIdx) {
 state.hover[cid] = nextIdx;
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
 if (state.hover[cid] !== -1) { state.hover[cid] = -1; redrawFn(); }
 tip.style.display = 'none';
 });
 }
 bindTooltip('eraCanvas', drawEraCanvas);
 bindTooltip('genomeCanvas', drawGenomeCanvas);
 bindTooltip('entropyCanvas', drawEntropyCanvas);

 function drawAll() {
 drawEraCanvas();
 drawGenomeCanvas();
 drawEntropyCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS_ZH = [
 { id: 'sec-c0', t: 'C0 单一损益表拓扑与初创悖论', s: '1997一日裁撤事业部GM · 职能制 vs 事业部诸侯对比沙盘' },
 { id: 'sec-c1', t: 'C1 四大文化基因与审慎领导力罗盘', s: '专家领导专家 · Squircle圆角 · DRI问责 · 苹果大学毕加索公牛' },
 { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1997–2026+)', s: '乔布斯 / 库克 / 约翰·特努斯 · 人均创收跃迁至 $2.87M' },
 { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱对比', s: 'Apple vs NVIDIA / 微软 / 亚马逊 / 伯克希尔阴阳两极对照' },
 { id: 'sec-c4', t: 'C4 组织熵增模拟器与苹果六律体检', s: 'SKU 复杂度压力测试 · 6项组织健康度持久化核查清单' }
 ];
 var QITEMS_EN = [
 { id: 'sec-c0', t: 'C0 Single-P&L Topology & Startup Paradox', s: '1997 Single-Day GM Reset · Functional vs. Siloed BU Sandbox' },
 { id: 'sec-c1', t: 'C1 4 Cultural Codes & Discretionary Dial', s: 'Experts Leading Experts · Squircle · DRI · Apple University' },
 { id: 'sec-c2', t: 'C2 Three-Era Governance Timeline (1997–2026+)', s: 'Jobs / Cook / John Ternus · $2.87M Rev/Employee Leap' },
 { id: 'sec-c3', t: 'C3 Mega-Cap Cultural Genome Arena', s: 'Apple vs. NVIDIA / Microsoft / Amazon / Berkshire' },
 { id: 'sec-c4', t: 'C4 Scaling Bottleneck & 6-Law Audit', s: 'SKU Sprawl Simulator · 6-Point Organizational Durability Audit' }
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

 // Mobile Drawer, Scroll Progress & 6-Law Audit Persistence
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
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]');
 var done = 0;
 for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
 var chip = document.getElementById('auditScoreChip');
 if (chip) {
 chip.textContent = isEn()
 ? ('Culture Audit: ' + done + ' / ' + boxes.length)
 : ('文化自检核验：' + done + ' / ' + boxes.length + ' 项');
 }
 }
 try {
 var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (chk) {
 var k = chk.getAttribute('data-cchk');
 chk.checked = !!savedA[k];
 chk.addEventListener('change', function () {
 savedA[k] = chk.checked;
 try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {}
 refreshAuditChip();
 showToast(isEn() ? (chk.checked ? 'Added to culture audit' : 'Removed from audit') : (chk.checked ? '已勾选该组织护城河指标' : '已取消勾选'));
 });
 });
 } catch (e) {}

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
 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
 if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 })();
 