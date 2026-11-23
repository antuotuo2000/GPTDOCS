
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_amzn_culture_checks_v1';

 var PILLAR_NOTES_ZH = [
 '<strong>当前选中支柱解读（01 逆向工作法 PR/FAQ）：</strong>Kindle、AWS EC2、Prime、Echo 乃至 Amazon Leo 低轨卫星均诞生于数十易其稿的 1 页 PR + 5 页 FAQ 文档——在投入巨额工程资源前，先在纸面上经历最严苛的客户价值拷问 <a class="cite-link" href="https://andrewclark.co.uk/all-media/working-backwards" target="_blank" rel="noopener noreferrer">Working Backwards ↗</a>。',
 '<strong>当前选中支柱解读（02 六页纸叙事备忘录）：</strong>禁用 PPT 消除了“靠演讲口才蒙混过关”的可能。高管会开场 20 分钟全员静默逐字批注，让一线工程师的真知灼见与高管站在同一信息密度上交锋。',
 '<strong>当前选中支柱解读（03 16条准则与 Bar Raiser 抬杆人）：</strong>传统企业扩招至百万人时必然遭遇人才标准稀释；亚马逊用独立跨部门 Bar Raiser 的一票否决权建立反稀释防火墙，确保每一轮面试都围绕 16 条准则的行为证据展开。',
 '<strong>当前选中支柱解读（04 甘愿长期被误解与 Why 文化）：</strong>正如贾西在 2025 股东信回顾 2014 年高管层曾质疑 AWS CapEx 一样，亚马逊敢于承受 2026 年 ~$2,200亿 资本开支带来的短期负 FCF，换取 AI 时代的算力与电网主权。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Working Backwards PR/FAQ):</strong> Kindle, AWS EC2, Prime, Echo, and Amazon Leo all began as 1-page Press Releases and 5-page FAQs—testing customer delight rigorously on paper before committing engineering capital.',
 '<strong>Selected Pillar (02 · 6-Page Narrative Memos):</strong> Banning PowerPoint eliminates slide-deck theater. Every executive review opens with 15–20 minutes of silent study so clear causal reasoning wins over presentation charisma.',
 '<strong>Selected Pillar (03 · 16 LPs &amp; Bar Raiser Veto):</strong> Certified cross-team Bar Raisers hold an absolute hiring veto in every interview loop, ensuring each new hire raises the bar above 50% of current peers.',
 '<strong>Selected Pillar (04 · Willingness to Be Misunderstood):</strong> Just as AWS endured early FCF dilution to build a $184B run-rate powerhouse, Amazon willingly absorbs ~$220B in 2026 CapEx to secure multi-decade AI &amp; LEO returns.'
 ];

 var PEER_ROWS_ZH = [
 {
 category: 'decentralized',
 benchmark: true,
 company: '研究基准：亚马逊 (Amazon · AMZN)',
 leader: '杰夫·贝索斯 / 安迪·贾西 (Andy Jassy)',
 positioning: '解耦 API 服务化架构 + 数千支双披萨自治小队 + 单线程负责人',
 culture: '永远的 Day 1 + 16条领导力准则 + 六页纸备忘录 + 反官僚扁平化',
 headcount: '163.8万人 (含全球履约网) · Q3 G&A 仅 1.34%',
 margins: 'TTM 营收 $7,975亿 · Q3 毛利 53.2% · 创纪录营业利润率 13.9%',
 verdict: '横向孵化与基础设施外溢之王：用 API 契约消除协调税，从书店裂变出 $1,840亿年化 AWS 与 $780亿广告双印钞机。',
 sourceLabel: 'Q3 2026 Release / AR',
 sourceUrl: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/'
 },
 {
 category: 'functional',
 benchmark: false,
 company: '苹果公司 (Apple · AAPL)',
 leader: '乔布斯 / 库克 / 约翰·特努斯 (2026.09+)',
 positioning: '中心化专业职能制 (Functional Org) + 全公司唯一损益表 (Single P&L)',
 culture: '专家领导专家 + DRI 唯一问责 + Apple University 极简减法',
 headcount: '16.7万人 (41%工程研发) · 人均创收 $2.87M',
 margins: 'FY26 营收 $4,788亿 · 综合毛利 48.8% (服务 76.2%) · 净利 $1,322亿',
 verdict: '与亚马逊互为组织哲学镜像：苹果靠高度集权打磨不足 30 款软硬一体精品，亚马逊靠解耦分权驾驭 6 亿 SKU 与数百项云服务。',
 sourceLabel: 'HBR / SEC 10-K',
 sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
 },
 {
 category: 'functional',
 benchmark: false,
 company: '英伟达 (NVIDIA · NVDA)',
 leader: '黄仁勋 (Jensen Huang)',
 positioning: '超扁平蛛网职能制 (~60名高管直报CEO) + 全栈算力协同',
 culture: '零事业部藩篱 + Top-5 邮件全员透明广播 + 光速执行',
 headcount: '~4.2万人 · 极致研发密度',
 margins: 'GAAP 毛利率 ~71%–75% · AI 训练算力霸主',
 verdict: '聚焦单一算力赛道的极致穿透力；同时既是 AWS 重要合作伙伴，也是亚马逊自研 Trainium2/3/4 芯片直接对标的竞合对手。',
 sourceLabel: 'NVDA Stats',
 sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'decentralized',
 benchmark: false,
 company: '微软 (Microsoft · MSFT)',
 leader: '萨提亚·纳德拉 (Satya Nadella)',
 positioning: '三大业务集团事业部矩阵 (智能云 Azure / 生产力 / 个人计算)',
 culture: '成长型思维 (Growth Mindset) + 企业软件全捆绑协同',
 headcount: '~22.3万人 · B2B 直销铁军深厚',
 margins: '综合毛利率 ~69% · Azure 与 M365 双擎驱动',
 verdict: 'AWS 头号云端劲敌：微软擅长用 Office/企业协议向下捆绑软件，亚马逊则靠底层基础设施稳定性、自研芯片性价比与 Bedrock 模型中立胜出。',
 sourceLabel: 'Big Tech 10-K',
 sourceUrl: 'https://bebop.ai/companies/largest-tech-companies'
 },
 {
 category: 'decentralized',
 benchmark: false,
 company: '沃尔玛 (Walmart · WMT)',
 leader: '山姆·沃尔顿传统 / 董明伦 (Doug McMillon)',
 positioning: '全美 4,600+ 实体大卖场仓店一体 + 集中采购供应链',
 culture: '天天平价 (EDLP) + 门店运营纪律 + 零售媒体跟进转型',
 headcount: '~210万人 (全球第一大民营雇主)',
 margins: '综合毛利率 ~24.8% · 营业利润率 ~4.2%–4.5%',
 verdict: '亚马逊零售端最敬畏的线下对手：同奉行天天平价与节俭文化，但亚马逊多出了年赚超 $610亿营业利润的 AWS 技术引擎。',
 sourceLabel: 'MIT Sloan Case',
 sourceUrl: 'https://mitsloan.mit.edu/sites/default/files/2026-07/24-229.AmazonvsWalmart_0.pdf'
 }
 ];

 var PEER_ROWS_EN = [
 {
 category: 'decentralized',
 benchmark: true,
 company: 'Benchmark: Amazon.com (AMZN)',
 leader: 'Jeff Bezos / Andy Jassy',
 positioning: 'Decoupled API service architecture + Two-Pizza Teams + STLs',
 culture: 'Always Day 1 + 16 Leadership Principles + 6-Pagers + +15% IC ratio',
 headcount: '1.638M staff · Q3 G&A just 1.34% of sales',
 margins: 'TTM Sales $797.5B · Q3 GM 53.2% · Record 13.9% Op Margin',
 verdict: 'Ultimate horizontal incubator: API contracts eliminate coordination tax, spawning $184B run-rate AWS and $78B Ads alongside retail.',
 sourceLabel: 'Q3 2026 Release',
 sourceUrl: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/'
 },
 {
 category: 'functional',
 benchmark: false,
 company: 'Apple Inc. (AAPL)',
 leader: 'Jobs / Cook / John Ternus',
 positioning: 'Centralized Functional Organization + Single Company-Wide P&L',
 culture: 'Experts Leading Experts + Single DRI + Picasso subtraction',
 headcount: '167k FTE (41% Eng) · $2.87M Rev / FTE',
 margins: 'FY26 Sales $478.8B · 48.8% GM (Services 76.2%)',
 verdict: 'Philosophical mirror image: Apple centralizes to perfect <30 tightly coupled hardware icons; Amazon decentralizes to scale 600M+ SKUs & 200+ cloud services.',
 sourceLabel: 'HBR / SEC 10-K',
 sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
 },
 {
 category: 'functional',
 benchmark: false,
 company: 'NVIDIA (NVDA)',
 leader: 'Jensen Huang',
 positioning: 'Ultra-flat functional web (~60 direct reports) + unified CUDA stack',
 culture: 'Zero BU silos + Top-5 email transparency + speed-of-light execution',
 headcount: '~42k FTE · Ultra-high R&D density',
 margins: '~71%–75% GAAP Gross Margin',
 verdict: 'Key AWS partner and silicon benchmark as Amazon scales custom Trainium2/3/4 and Graviton5 above a $20B run rate.',
 sourceLabel: 'NVDA Stats',
 sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'decentralized',
 benchmark: false,
 company: 'Microsoft (MSFT)',
 leader: 'Satya Nadella',
 positioning: 'Three enterprise business segments (Cloud / Productivity / PC)',
 culture: 'Growth Mindset + enterprise software bundling',
 headcount: '~223k FTE',
 margins: '~69% Gross Margin · High enterprise cloud margins',
 verdict: 'Primary cloud rival: Microsoft bundles top-down SaaS suites, whereas AWS leads via infrastructure breadth, custom silicon, and Bedrock model choice.',
 sourceLabel: 'Big Tech 10-K',
 sourceUrl: 'https://bebop.ai/companies/largest-tech-companies'
 },
 {
 category: 'decentralized',
 benchmark: false,
 company: 'Walmart (WMT)',
 leader: 'Sam Walton Ethos / Doug McMillon',
 positioning: '4,600+ US supercenters omnichannel hub + centralized merchandising',
 culture: 'Everyday Low Prices (EDLP) + store discipline',
 headcount: '~2.1M associates worldwide',
 margins: '~24.8% Gross Margin · ~4.3% Operating Margin',
 verdict: 'Formidable grocery & EDLP peer, yet lacks Amazon\'s $61B+ TTM operating-profit AWS cloud engine.',
 sourceLabel: 'MIT Sloan Case',
 sourceUrl: 'https://mitsloan.mit.edu/sites/default/files/2026-07/24-229.AmazonvsWalmart_0.pdf'
 }
 ];

 var CHECKLIST_ITEMS_ZH = [
 {
 tag: 'PR/FAQ 逆向验证',
 title: '1. 逆向工作法测试：新项目立项前是否先写出了 1 页客户新闻稿？',
 desc: '检验团队是从真实客户痛点倒推技术需求，还是为了消耗现有部门预算、堆砌自嗨功能而盲目排期开发。'
 },
 {
 tag: '六页纸叙事深度',
 title: '2. 禁用 PPT 测试：核心战略评审是否采用完整逻辑的书面叙事文档？',
 desc: '核查管理层是否愿意在会前静默精读 15–20 分钟结构化长文与输入指标，让严密逻辑而非口才主导资源分配。'
 },
 {
 tag: '双披萨与 STL',
 title: '3. 单线程自治测试：关键创新是否交由 100% 专注的精干小队独立推进？',
 desc: '评估小团队能否通过标准 API 自主迭代（如 6 人 76 天交付 Bedrock Mantle），而无需陷入跨十几个部门的联席会签。'
 },
 {
 tag: '双向门极速授权',
 title: '4. 决策分级测试：可逆的“双向门”实验能否在 24–48 小时内一线拍板？',
 desc: '防止用审批不可逆重资产（单向门）的繁琐流程去卡死日常产品试错，并用“反官僚信箱”定期清理冗余规则。'
 },
 {
 tag: 'Bar Raiser 防稀释',
 title: '5. 招聘抬杆测试：是否有独立跨部门面试官握有招聘“一票否决权”？',
 desc: '确保急需用人时绝不降低录用水位线，每一位新入职成员都必须拉高团队整体均值。'
 },
 {
 tag: '成本中心外溢力',
 title: '6. 基建变现测试：公司重金投入的内部能力能否模块化对外商业收税？',
 desc: '对标亚马逊将内部仓库变为 FBA、内部 IT 变为 AWS、内部芯片变为 Trainium 的能力，检验资本开支的长期 ROIC 潜力。'
 }
 ];

 var CHECKLIST_ITEMS_EN = [
 {
 tag: 'PR/FAQ First',
 title: '1. Working Backwards Test: Does every new initiative start with a 1-Page Customer Press Release?',
 desc: 'Verify whether teams work backwards from sharp customer pain points rather than shipping inside-out org-chart features.'
 },
 {
 tag: '6-Pager Rigor',
 title: '2. Narrative Clarity Test: Do strategic reviews rely on silent reading of 6-page prose memos?',
 desc: 'Check whether leadership replaces bullet-point slide theater with complete prose arguments and auditable input metrics.'
 },
 {
 tag: 'Two-Pizza STL',
 title: '3. Single-Threaded Ownership Test: Are key bets owned by small, API-decoupled teams?',
 desc: 'Assess whether 6–10 person teams can ship breakthroughs (like Bedrock Mantle in 76 days) without cross-department gridlock.'
 },
 {
 tag: 'Two-Way Doors',
 title: '4. Decision Velocity Test: Are reversible Type-2 decisions delegated to frontline owners?',
 desc: 'Ensure heavy Type-1 governance is never misapplied to reversible daily experiments, backed by an active Bureaucracy Mailbox.'
 },
 {
 tag: 'Bar Raiser Veto',
 title: '5. Talent Bar Test: Does an independent Bar Raiser hold veto power in every hiring loop?',
 desc: 'Prevent hiring urgency from diluting talent density—every new hire must exceed 50% of current peers at level.'
 },
 {
 tag: 'Infra Spinout',
 title: '6. Cost-Center Externalization Test: Can internal infrastructure scale into external high-margin services?',
 desc: 'Benchmark whether heavy internal investments can follow the FBA / AWS / Trainium playbook to compound long-term ROIC.'
 }
 ];

 var QUICK_JUMP = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: 'TTM $797.5B 营收 · Q3 13.9% 营业利润率 · G&A 仅 1.34%' },
 { sec: 'sec-01', title: '01 API 解耦架构与双披萨自治', sub: 'S-Team 治理 · 六大业务营收与 163.8 万人人效图表' },
 { sec: 'sec-02', title: '02 四大文化支柱与制度机制', sub: 'PR/FAQ · 六页纸备忘录 · Bar Raiser · 五维文化雷达图' },
 { sec: 'sec-03', title: '03 全球科技巨头文化横向对比', sub: 'Amazon vs Apple vs NVIDIA vs Microsoft vs Walmart' },
 { sec: 'sec-04', title: '04 基建飞轮、利润率与复利推演', sub: 'FY22–TTM26 营业利润暴增 8.5 倍 · 跨周期复利推演器' },
 { sec: 'sec-05', title: '05 三幕演进与四大战役复盘', sub: '2002 API 法令 · Fire Phone→Alexa+ · 8大区域化与 Mantle' },
 { sec: 'sec-06', title: '06 Day 1 文化法则核查清单', sub: '6 项反官僚组织诊断与本地持久化评分' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC FY25 10-K · Q3 2026 季报 · Jassy 2025 致股东信' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 15, priceCagr: 28.5, drip: true },
 p2: { principal: 10000, years: 29, priceCagr: 26.0, drip: false },
 p3: { principal: 10000, years: 10, priceCagr: 13.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { amzn: true, aapl: true, mform: true },
 peerFilter: 'all',
 peerQuery: '',
 epsSeries: { eps: true, oci: true },
 sim: { principal: 10000, years: 15, priceCagr: 13.5, drip: true, preset: 'p3' },
 checks: [true, true, true, false, false, false]
 };

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function isEn() { return state.lang === 'en'; }

 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg;
 el.classList.add('show');
 clearTimeout(el._t);
 el._t = setTimeout(function () { el.classList.remove('show'); }, 2500);
 }

 function escapeHtml(str) {
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 }

 function highlightMatch(text, query) {
 var safe = escapeHtml(text);
 if (!query) return safe;
 var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) {
 ic.innerHTML = state.theme === 'dark'
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 
 
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色护眼模式' : '已切换至浅色清晰模式');
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 document.documentElement.lang = isEn() ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', !isEn());
 document.getElementById('langEnBtn').classList.toggle('active', isEn());
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var v = nodes[i].getAttribute(isEn() ? 'data-i18n-en' : 'data-i18n-zh');
 if (v !== null) {
 if (v.indexOf('<span') !== -1) nodes[i].innerHTML = v;
 else nodes[i].textContent = v;
 }
 }
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>';
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
 if (!silent) showToast(isEn() ? 'Switched to English Edition' : '已切换为中文深度研报');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody');
 var badge = document.getElementById('peerCountBadge');
 var rows = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = rows.filter(function (r, idx) {
 var catOk = state.peerFilter === 'all' || r.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var zh = PEER_ROWS_ZH[idx], en = PEER_ROWS_EN[idx];
 return (zh.company + ' ' + zh.leader + ' ' + zh.positioning + ' ' + zh.culture + ' ' + en.company + ' ' + en.leader + ' ' + en.culture).toLowerCase().indexOf(q) !== -1;
 });
 badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + rows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + rows.length + ' 家标杆企业');
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配的标杆企业，请调整搜索词。</td></tr>';
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

 function formatCurrency(val) {
 if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function updateSimulatorUI() {
 var p = state.sim.principal;
 var yrs = state.sim.years;
 var cagr = state.sim.priceCagr;
 var boost = state.sim.drip ? 3.0 : 0.0;
 var totalRate = (cagr + boost) / 100;
 var endingValue = p * Math.pow(1 + totalRate, yrs);
 var moic = endingValue / p;
 var midYear = Math.max(1, Math.floor(yrs / 2));
 var midValue = p * Math.pow(1 + totalRate, midYear);

 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
 document.getElementById('simMoicVal').textContent = (moic >= 100 ? moic.toFixed(1) : moic.toFixed(2)) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = formatCurrency(endingValue - p);
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint') : ('第 ' + midYear + ' 年中期资产节点');
 document.getElementById('simMidVal').textContent = formatCurrency(midValue);

 var pBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < pBtns.length; i++) pBtns[i].classList.toggle('active', pBtns[i].getAttribute('data-preset') === state.sim.preset);
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var list = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS_ZH;
 var done = state.checks.filter(Boolean).length;
 var pct = Math.round((done / list.length) * 100);
 document.getElementById('checklistScoreChip').textContent = isEn() ? ('Verified ' + done + ' / ' + list.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + list.length + ' 项 (' + pct + '%)');
 document.getElementById('checklistProgressBar').style.width = pct + '%';
 container.innerHTML = list.map(function (it, idx) {
 var ck = !!state.checks[idx];
 return '<label class="check-card ' + (ck ? 'checked' : '') + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (ck ? 'checked' : '') + ' />' +
 '<div style="flex:1;">' +
 '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
 '<span class="check-title">' + escapeHtml(it.title) + '</span>' +
 '<span class="mui-chip mono">' + escapeHtml(it.tag) + '</span>' +
 '</div><p class="check-desc">' + escapeHtml(it.desc) + '</p></div></label>';
 }).join('');
 }

 // High-DPI Canvas Engine
 function getPalette() {
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
 tick: isDark ? '#94A3B8' : '#475569',
 text: isDark ? '#F3F6F9' : '#0F1924',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: isDark ? '#3399FF' : '#0073E6',
 c2: isDark ? '#22C55E' : '#16A34A',
 c3: isDark ? '#FFB74D' : '#D97706',
 c4: isDark ? '#A78BFA' : '#7C3AED'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var rect = canvas.parentElement.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width));
 var h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 canvas.style.width = w + 'px';
 canvas.style.height = h + 'px';
 canvas.width = Math.floor(w * dpr);
 canvas.height = Math.floor(h * dpr);
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h - rad);
 ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
 ctx.lineTo(x + rad, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.closePath();
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];

 if (state.ch1View === 'viewA') {
 var padA = { top: 28, right: 18, bottom: 44, left: 52 };
 var pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
 var labelsA = ['Online 1P', '3P Seller', 'AWS Cloud', 'Advertising', 'Subscriptions', 'Physical'];
 var subA = ['+9% YoY', '+10% YoY', '+20% (Q3 +39%)', '+22% YoY', '+12% YoY', '+6% YoY'];
 var fy24 = [247.0, 156.1, 107.6, 56.2, 44.4, 21.2];
 var fy25 = [269.3, 172.2, 128.7, 68.6, 49.6, 22.6];
 var maxY = 300;

 for (var g = 0; g <= 4; g++) {
 var gv = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', padA.left - 7, gy + 4);
 }
 var stepA = pwA / labelsA.length;
 var barW = Math.min(30, Math.max(12, stepA * 0.28));
 for (var i = 0; i < labelsA.length; i++) {
 var cx = padA.left + stepA * (i + 0.5);
 if (hoverState.chartCh1 === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, padA.left + stepA * i + 3, padA.top, stepA - 6, phA, 6); ctx.fill();
 }
 if (state.ch1Series.s1) {
 var h1 = (fy24[i] / maxY) * phA, y1 = padA.top + phA - h1;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, state.ch1Series.s2 ? cx - barW - 2 : cx - barW / 2, y1, barW, h1, 4); ctx.fill();
 }
 if (state.ch1Series.s2) {
 var h2 = (fy25[i] / maxY) * phA, y2 = padA.top + phA - h2;
 ctx.fillStyle = pal.c2;
 roundRectPath(ctx, state.ch1Series.s1 ? cx + 2 : cx - barW / 2, y2, barW, h2, 4); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + fy25[i].toFixed(1) + 'B', cx, y2 - 6);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(labelsA[i], cx, padA.top + phA + 18);
 ctx.fillStyle = pal.c2; ctx.font = '600 9.5px "IBM Plex Mono", sans-serif';
 ctx.fillText(subA[i], cx, padA.top + phA + 33);
 hitRegions.chartCh1.push({
 idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 36,
 html: '<strong>' + labelsA[i] + ' 净营收对比</strong><br/>• FY2024: <strong>$' + fy24[i].toFixed(1) + 'B</strong><br/>• FY2025: <strong>$' + fy25[i].toFixed(1) + 'B</strong> (' + subA[i] + ')'
 });
 }
 } else {
 var padB = { top: 28, right: 54, bottom: 38, left: 50 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var yrsB = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', "TTM Q3'26"];
 var empM = [1.608, 1.541, 1.525, 1.556, 1.576, 1.638];
 var revK = [292, 334, 377, 410, 455, 487];
 var maxEmp = 2.2, minR = 220, maxR = 540;
 for (var j = 0; j <= 4; j++) {
 var r = j / 4, yg = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yg); ctx.lineTo(padB.left + pwB, yg); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText((maxEmp * r).toFixed(1) + 'M', padB.left - 7, yg + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText('$' + Math.round(minR + r * (maxR - minR)) + 'K', padB.left + pwB + 7, yg + 4);
 }
 var stepB = pwB / yrsB.length, bwB = Math.min(36, stepB * 0.44);
 var pts = [];
 for (var k = 0; k < yrsB.length; k++) {
 var cxB = padB.left + stepB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bhB = (empM[k] / maxEmp) * phB, byB = padB.top + phB - bhB;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, cxB - bwB / 2, byB, bwB, bhB, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(empM[k].toFixed(2) + 'M', cxB, byB + 15);
 }
 var lyB = padB.top + phB - ((revK[k] - minR) / (maxR - minR)) * phB;
 pts.push({ x: cxB, y: lyB, v: revK[k] });
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(yrsB[k], cxB, padB.top + phB + 20);
 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 26,
 html: '<strong>' + yrsB[k] + ' 编制与人效</strong><br/>• 员工总数：<strong>' + Math.round(empM[k] * 1000).toLocaleString() + ',000 人</strong><br/>• 人均创收：<strong>$' + revK[k] + 'K / 人</strong>'
 });
 }
 if (state.ch1Series.s2) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (p, idx) { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
 ctx.stroke();
 pts.forEach(function (p) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.v + 'K', p.x, p.y - 8);
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = isEn() ? ['API Autonomy', 'Written Rigor', 'Horizontal Incubation', 'Frugality & Ops', 'Long-Term CapEx Grit'] : ['API解耦自治度', '六页纸书面严谨度', '跨界新业务孵化力', '极致节俭与运营深潜', '长周期资本承受力'];
 var series = [
 { key: 'amzn', color: pal.c1, fill: 'rgba(51, 153, 255, 0.22)', vals: [9.8, 9.9, 9.8, 9.5, 9.7] },
 { key: 'aapl', color: pal.c2, fill: 'rgba(34, 197, 94, 0.14)', vals: [5.5, 8.2, 6.8, 9.2, 8.9] },
 { key: 'mform', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [6.2, 5.4, 5.6, 6.5, 5.8] }
 ];
 var cx = w / 2, cy = h / 2 + 6, radius = Math.max(60, Math.min((w - 190) / 2, h * 0.35));
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < 5; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
 var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.closePath(); ctx.stroke();
 }
 for (var a = 0; a < 5; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / 5;
 var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 14);
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 34, y: Math.min(ay, ly) - 20, w: 70 + Math.abs(lx - ax), h: 40,
 html: '<strong>' + axes[a] + '</strong><br/>• Amazon: <strong>' + series[0].vals[a] + '</strong> · Apple: <strong>' + series[1].vals[a] + '</strong> · 传统巨头: <strong>' + series[2].vals[a] + '</strong>'
 });
 }
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 for (var idx = 0; idx < 5; idx++) {
 var th = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
 var vx = cx + Math.cos(th) * (s.vals[idx] / 10) * radius, vy = cy + Math.sin(th) * (s.vals[idx] / 10) * radius;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { label: 'Q3 2026 净服务销售额占总营收比重 (Service Mix)', val: 62.7, col: pal.c2, sub: '$126.65B / $201.94B', note: 'AWS + 3P卖家服务 + 广告 + Prime订阅已成为亚马逊绝对主体' },
 { label: 'Q3 2026 全球第三方卖家付费件数占比 (3P Unit Share)', val: 61.0, col: pal.c4, sub: '独立商家承担存货并购买FBA与广告', note: '平台网络效应核心指标，常年稳居 60%–62% 高位' },
 { label: 'Q3 2026 全集团综合毛利率 (Consolidated Gross Margin)', val: 53.2, col: pal.c1, sub: '$107.37B / $201.94B', note: '服务与高毛利广告权重上升，推动综合毛利率突破 53%' },
 { label: 'Q3 2026 AWS 云计算分部营业利润率 (AWS Op Margin)', val: 38.7, col: pal.c2, sub: '$17.77B / $45.98B (+55% YoY)', note: '自研 Graviton/Trainium 芯片显著增厚云基础设施算力利润率' },
 { label: 'Q3 2026 技术与基础设施研发费率 (Tech & Infra % Sales)', val: 17.2, col: pal.c3, sub: '单季 $34.81B (FY25 全年 $108.52B)', note: '重兵投入 AI、机器人、AWS 基础服务与自动化算法' },
 { label: 'Q3 2026 一般及行政管理费率 (G&A % Sales · 节俭标杆)', val: 1.34, col: pal.c1, sub: '单季仅 $2.70B (-6.1% YoY)', note: '门板办公桌传统与 +15% 扁平化改革令总部行政开销压缩至极致' }
 ];
 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 75;
 var rowH = ph / items.length;
 for (var i = 0; i < items.length; i++) {
 var rt = pad.top + rowH * i;
 var ly = rt + Math.max(15, rowH * 0.35), by = rt + Math.max(22, rowH * 0.52), bh = 13;
 var bw = Math.max(6, (items[i].val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 12px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(items[i].label, pad.left, ly);
 ctx.fillStyle = items[i].col; ctx.font = '800 12px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(items[i].val.toFixed(2).replace(/\.00$/, '.0') + '%', pad.left + pw, ly);
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, by, pw, bh, 6); ctx.fill();
 ctx.fillStyle = items[i].col; roundRectPath(ctx, pad.left, by, bw, bh, 6); ctx.fill();
 hitRegions.chartBars.push({
 idx: i, x: pad.left, y: rt, w: pw, h: rowH,
 html: '<strong>' + items[i].label + ': ' + items[i].val + '%</strong><br/>• 明细：' + items[i].sub + '<br/>• 解读：' + items[i].note
 });
 }
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var years = ['FY2022', 'FY2023', 'FY2024', 'FY2025', "TTM Q3'26"];
 var opB = [12.25, 36.85, 68.59, 79.98, 104.37];
 var gmPct = [43.8, 47.0, 48.9, 50.3, 52.1];
 var pad = { top: 26, right: 50, bottom: 38, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var maxOp = 120, minGm = 40, maxGm = 55;
 for (var g = 0; g <= 4; g++) {
 var r = g / 4, gy = pad.top + ph - r * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText('$' + Math.round(maxOp * r) + 'B', pad.left - 7, gy + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText((minGm + r * (maxGm - minGm)).toFixed(1) + '%', pad.left + pw + 7, gy + 4);
 }
 var step = pw / years.length, barW = Math.min(44, step * 0.42), pts = [];
 for (var i = 0; i < years.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = (opB[i] / maxOp) * ph, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; roundRectPath(ctx, cx - barW / 2, by, barW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + opB[i].toFixed(1) + 'B', cx, by - 6);
 }
 var oy = pad.top + ph - ((gmPct[i] - minGm) / (maxGm - minGm)) * ph;
 pts.push({ x: cx, y: oy, gm: gmPct[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(years[i], cx, pad.top + ph + 20);
 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
 html: '<strong>' + years[i] + '</strong><br/>• 营业利润：<strong>$' + opB[i].toFixed(2) + 'B</strong><br/>• 综合毛利率：<strong>' + gmPct[i].toFixed(1) + '%</strong>'
 });
 }
 if (state.epsSeries.oci) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (p, idx) { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
 ctx.stroke();
 pts.forEach(function (p) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill();
 });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years;
 var baseR = state.sim.priceCagr / 100, totR = (state.sim.priceCagr + (state.sim.drip ? 3.0 : 0)) / 100;
 var totS = [], baseS = [];
 for (var y = 0; y <= yrs; y++) { totS.push(p * Math.pow(1 + totR, y)); baseS.push(p * Math.pow(1 + baseR, y)); }
 var maxVal = Math.max(totS[yrs], p * 1.2) * 1.08;
 var pad = { top: 18, right: 18, bottom: 26, left: 58 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 6, gy + 4);
 }
 var stepX = pw / yrs;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.6; ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var bx = pad.left + stepX * i, by = pad.top + ph - (baseS[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
 }
 ctx.stroke(); ctx.restore();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 for (var k = 0; k <= yrs; k++) {
 var tx = pad.left + stepX * k, ty = pad.top + ph - (totS[k] / maxVal) * ph;
 if (k === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
 if (k === 0 || k === Math.floor(yrs / 2) || k === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + k, tx, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({
 idx: k, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 20,
 html: '<strong>第 ' + k + ' 年资产预估</strong><br/>• 含新曲线外溢：<strong>' + formatCurrency(totS[k]) + '</strong><br/>• 基础主业增长：<strong>' + formatCurrency(baseS[k]) + '</strong>'
 });
 }
 ctx.stroke();
 }

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawHorizontalBars();
 drawEpsComboChart();
 drawSimChart();
 }

 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 canvas.addEventListener('mousemove', function (e) {
 var rect = canvas.getBoundingClientRect();
 var x = e.clientX - rect.left, y = e.clientY - rect.top;
 var regs = hitRegions[canvasId] || [], matched = null;
 for (var i = 0; i < regs.length; i++) {
 var r = regs[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
 }
 hoverState[canvasId] = matched ? matched.idx : -1;
 if (matched) {
 tip.innerHTML = matched.html;
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () { hoverState[canvasId] = -1; tip.style.display = 'none'; });
 }

 

 // Init Event Listeners
 try {
 var st = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
 if (st === 'dark' || st === 'light') state.theme = st;
 var sl = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
 if (sl === 'en' || sl === 'zh') state.lang = sl;
 var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
 if (Array.isArray(sc) && sc.length === 6) state.checks = sc.map(Boolean);
 } catch (e) {}

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 
 
 
 
 
 document.getElementById('crumbTopBtn').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
 

 // Sidebar & Suite Hub
 var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth <= 1120) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
 setTimeout(renderAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

 var hub = document.getElementById('companySubfolderHub');
 hub.addEventListener('click', function (e) {
 var pill = e.target.closest('[data-co-cat]');
 if (pill) {
 var cat = pill.getAttribute('data-co-cat');
 hub.querySelectorAll('[data-co-cat]').forEach(function (p) { p.classList.toggle('active', p === pill); });
 hub.querySelectorAll('[data-co-item-cat]').forEach(function (it) {
 it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat));
 });
 return;
 }
 var item = e.target.closest('.co-hub-item');
 if (item) {
 var j = item.getAttribute('data-suite-jump'), d = item.getAttribute('data-suite-Doc');
 if (j) document.querySelector(j).scrollIntoView({ behavior: 'smooth' });
 else if (d) showToast('请在配套四页式套件中打开《' + d + '》');
 }
 });

 // Quick Jump
 var jIn = document.getElementById('quickJumpInput'), jPop = document.getElementById('quickJumpPopover');
 function renderJump(q) {
 var kw = (q || '').trim().toLowerCase();
 var list = QUICK_JUMP.filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
 jPop.innerHTML = list.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
 }).join('');
 jPop.classList.toggle('open', list.length > 0);
 }
 jIn.addEventListener('focus', function () { renderJump(jIn.value); });
 jIn.addEventListener('input', function () { renderJump(jIn.value); });
 jPop.addEventListener('click', function (e) {
 var b = e.target.closest('[data-jump-sec]');
 if (!b) return;
 var sec = document.getElementById(b.getAttribute('data-jump-sec'));
 if (sec) sec.scrollIntoView({ behavior: 'smooth' });
 jPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jIn.focus(); }
 if (e.key === 'Escape') { jPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
 });

 // Ch1 Tabs & Collapse & Pillars & Radar Legend
 document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-ch1-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var k = this.getAttribute('data-ch1-series');
 state.ch1Series[k] = !state.ch1Series[k];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[k] = true;
 this.classList.toggle('muted', !state.ch1Series[k]);
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var p = document.getElementById(this.getAttribute('data-collapse-target'));
 var open = p.classList.toggle('open');
 this.innerHTML = open ? '<span>收起微观执行机制 ⌃</span>' : '<span>展开微观执行机制 ⌄</span>';
 });
 });
 document.querySelectorAll('[data-pillar]').forEach(function (card) {
 card.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 document.querySelectorAll('[data-pillar]').forEach(function (c, k) { c.classList.toggle('active', k === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[idx] + '</div>';
 drawRadarChart();
 });
 });
 document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
 pill.addEventListener('click', function () {
 var k = this.getAttribute('data-radar-key');
 state.radarSeries[k] = !state.radarSeries[k];
 if (!state.radarSeries.amzn && !state.radarSeries.aapl && !state.radarSeries.mform) state.radarSeries[k] = true;
 this.classList.toggle('muted', !state.radarSeries[k]);
 drawRadarChart();
 });
 });

 // Peer Search & Filter
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 document.querySelectorAll('[data-peer-filter]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 document.querySelectorAll('[data-peer-filter]').forEach(function (b) { b.classList.toggle('active', b === btn); });
 renderPeerTable();
 });
 });

 // EPS Legend & Simulator
 document.querySelectorAll('[data-eps-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var k = this.getAttribute('data-eps-series');
 state.epsSeries[k] = !state.epsSeries[k];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[k] = true;
 this.classList.toggle('muted', !state.epsSeries[k]);
 drawEpsComboChart();
 });
 });
 var pSl = document.getElementById('simPrincipalSlider'), ySl = document.getElementById('simYearsSlider'), cSl = document.getElementById('simCagrSlider'), dTg = document.getElementById('simDripToggle');
 pSl.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 ySl.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 15; state.sim.preset = ''; updateSimulatorUI(); });
 cSl.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 10; state.sim.preset = ''; updateSimulatorUI(); });
 dTg.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
 document.querySelectorAll('[data-preset]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var k = this.getAttribute('data-preset'), cfg = PRESETS[k];
 if (!cfg) return;
 state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = k;
 pSl.value = cfg.principal; ySl.value = cfg.years; cSl.value = cfg.priceCagr; dTg.checked = cfg.drip;
 updateSimulatorUI();
 });
 });

 // Checklist
 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]');
 if (!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist(); showToast('已勾选全部 6 项 Day 1 文化指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist(); showToast('核查清单已重置');
 });

 // Scroll Progress & IntersectionObserver
 window.addEventListener('scroll', function () {
 var maxS = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxS) * 100) + '%';
 }, { passive: true });
 var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
 if ('IntersectionObserver' in window) {
 var secObs = new IntersectionObserver(function (entries) {
 entries.forEach(function (en) {
 if (en.isIntersecting) {
 tocLinks.forEach(function (lk) { lk.classList.toggle('active', lk.getAttribute('data-sec') === en.target.id); });
 }
 });
 }, { rootMargin: '-18% 0px -68% 0px' });
 for (var s = 0; s <= 7; s++) {
 var node = document.getElementById('sec-0' + s);
 if (node) secObs.observe(node);
 }
 }

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);
 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 70); });
 renderAllCharts();
 })();
 