
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'pen', pe: 32, hzIdx: 0, engIdx: 0 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg;
 bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2200);
 }

 function downloadSelfHtml() {
 try {
 var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var a = document.createElement('a');
 a.href = url;
 a.download = '微软未来十年（2026–2032）战略图谱.html';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
 showToast(state.lang === 'en' ? 'Downloaded standalone HTML file' : '已开始下载独立网页：微软未来十年（2026–2032）战略图谱.html');
 } catch (e) {
 showToast('导出失败，请使用浏览器保存网页功能');
 }
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

 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) {
 ic.innerHTML = state.theme === 'dark'
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 var sl = document.getElementById('sideThemeLightBtn');
 var sd = document.getElementById('sideThemeDarkBtn');
 if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
 if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色外观' : '已切换至清晰浅色外观');
 }

 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 算力爆发与智能体落地期 (2026–2027)',
 enBadge: 'HORIZON 1 · AZURE ACCELERATION & AGENT 365 GA (2026–2027)',
 zhT: 'Azure 冲击 48%–50% 超高增速 × Agent 365 全面商用 × Cobalt 200 规模上云',
 enT: 'Azure 48%–50% Surge × Agent 365 Enterprise Rollout × Cobalt 200 GA',
 zhItems: [
 '<strong>Azure 千亿基数再提速：</strong>随着新增吉瓦级算力机房并网，Q1 FY27 Azure 增长 48%，Q2 指引固定汇率增速达 49%–50%。',
 '<strong>Ignite 2026 智能体全家桶：</strong>Agent 365、Work IQ 与 Dynamics 365 内嵌智能体打通 CRM/ERP 跨系统闭环执行。',
 '<strong>Xbox 新统帅与组织瘦身：</strong>CoreAI 出身的 Asha Sharma 重塑游戏盈利纪律；6万人自愿离职计划（VEO）压缩层级释放利润率。'
 ],
 enItems: [
 '<strong>Azure Accelerating at $133B+ Scale:</strong> Q1 FY27 Azure surged +48% YoY with Q2 guided at 49%–50% CC as new capacity comes online.',
 '<strong>Ignite 2026 Agentic Stack:</strong> Agent 365, Work IQ, and Dynamics 365 embedded agents automate multi-step CRM/ERP workflows.',
 '<strong>Leaner Execution:</strong> Xbox CEO Asha Sharma sharpens gaming ROI while flattening management layers drives ~50% operating margins.'
 ],
 zhP: '兑现确定性：极高 (90%+)', enP: 'Conviction: Very High (90%+)',
 zhI: '年化增量营收池：+$65B–$95B', enI: 'Annual Incremental Pool: +$65B–$95B'
 },
 {
 badge: 'HORIZON 2 · 自研硅片放量与现金流收获期 (2028–2029)',
 enBadge: 'HORIZON 2 · CUSTOM SILICON & FCF HARVEST (2028–2029)',
 zhT: 'Maia 200/300 接管高频推理 × CapEx 强度高位回落 × 自由现金流二次井喷',
 enT: 'Maia 200/300 Inference Takeover × Moderating CapEx Intensity × FCF Inflection',
 zhItems: [
 '<strong>推理成本断崖下降：</strong>自研 Maia 与 Cobalt 芯片承担超四成内部 Copilot 与标准推理负载，修复 Microsoft Cloud 毛利率。',
 '<strong>数字员工预算渗透：</strong>全球财富 500 强普遍形成“1名员工调度 5–10 个专职 Agent”常态，按量 Token 收入反超席位收入增量。',
 '<strong>CapEx 占收比回归稳态：</strong>前期长寿命机房外壳建成投产，资本开支/营收比由 ~35% 向 ~20%–23% 回落，FCF 爆发式释放。'
 ],
 enItems: [
 '<strong>Inference Margin Recovery:</strong> Custom Maia & Cobalt chips handle >40% of internal Copilot & standard inference, lifting cloud gross margins.',
 '<strong>Metered Digital Labor:</strong> Enterprises standardize on human-plus-agent teams, making consumption growth outpace seat additions.',
 '<strong>CapEx Intensity Normalization:</strong> As long-lived datacenter shells fill out, CapEx/revenue moderates toward ~20%–23%, unlocking massive FCF.'
 ],
 zhP: '兑现确定性：中高 (78%)', enP: 'Conviction: High (78%)',
 zhI: '年化增量营收池：+$130B–$180B', enI: 'Annual Incremental Pool: +$130B–$180B'
 },
 {
 badge: 'HORIZON 3 · 工业超算与拓扑量子奇点期 (2030–2032)',
 enBadge: 'HORIZON 3 · AUTONOMOUS ENTERPRISE & QUANTUM ERA (2030–2032)',
 zhT: 'Majorana 拓扑量子云商用 × Microsoft Discovery 科学研发范式革命',
 enT: 'Majorana Topological Quantum Cloud × Microsoft Discovery R&D Revolution',
 zhItems: [
 '<strong>百万量子比特路线兑现：</strong>基于拓扑导体的容错量子处理器与 Azure AI 超算混合编排，攻克固氮催化、固态电池与新药分子模拟。',
 '<strong>核能与零碳算力护城河：</strong>三哩岛核电重启（2028 并网）及小型模块化反应堆（SMR）/聚变购电协议构筑竞争对手难以复制的清洁电力壁垒。',
 '<strong>直至 2032 的双保险 IP 池：</strong>无论外部 AGI 由谁率先突破，微软同时握有自研 MAI 超级智能团队与 OpenAI 直至 2032 年完整模型 IP。'
 ],
 enItems: [
 '<strong>Fault-Tolerant Quantum + AI Hybrid:</strong> Topological qubits co-process chemistry, materials, and drug discovery simulations on Azure.',
 '<strong>Nuclear & Clean Power Moat:</strong> Dedicated nuclear PPAs and SMRs secure multi-gigawatt carbon-free baseload power.',
 '<strong>Dual Superintelligence Hedge:</strong> Combines in-house MAI frontier models with OpenAI IP rights locked through 2032.'
 ],
 zhP: '兑现确定性：远期高赔率期权 (50%–60%)', enP: 'Conviction: Strategic Option (50%–60%)',
 zhI: '年化增量营收池：+$220B+', enI: 'Annual Incremental Pool: +$220B+'
 }
 ];

 var ENGINES = [
 {
 badge: 'ENGINE 01 · AGENT 365 & WORK IQ ENTERPRISE CONTROL PLANE',
 zhT: 'Microsoft Agent 365 × Work IQ：从“聊天副驾驶”跨入“可审计的企业数字劳动力”',
 enT: 'Microsoft Agent 365 × Work IQ: From Chat Assistant to Auditable Digital Labor',
 zhD: '第一阶段生成式 AI 只是帮员工写邮件总结（M365 Copilot 已突破 3,000 万付费席位）；而在 Ignite 2026 发布的第二阶段，Charles Lamanna 领衔推出的 Agent 365 联合 Work IQ 组织上下文层，让销售、财务、供应链与 IT 运维智能体直接在后台跨 Dynamics 365、SharePoint、ServiceNow 与 SAP 异步完成多步工作流，并由 Entra 统一赋予每个 Agent 独立身份与零信任权限围栏。',
 enD: 'Building on >30M paid M365 Copilot seats, Ignite 2026 introduced Agent 365 and Work IQ—enabling persistent autonomous agents across Dynamics 365, SharePoint, and third-party ERPs with full Entra identity governance.',
 zhF: '变现双轮：(1) M365 Copilot 席位向 4亿存量商业用户纵深渗透 + (2) Copilot Studio / Agent 365 按任务与消息消耗计费（毛利率 ~75%+）',
 enF: 'Monetization: (1) Per-seat Copilot expansion across 400M+ M365 users + (2) Metered Agent 365 / Copilot Studio autonomous task execution',
 gauges: [['30M+ 席位', 'M365 Copilot 已验证付费底座', 'Verified M365 Copilot Seats'], ['Work IQ', '跨邮件/会议/ERP组织记忆图谱', 'Enterprise Context Graph'], ['Agent 365', '企业多智能体身份治理中心', 'Agent Governance Control Plane'], ['2026–2029', '企业商业化放量黄金窗口', 'Primary Monetization Window']]
 },
 {
 badge: 'ENGINE 02 · AZURE MULTI-MODEL FOUNDRY & $678B RPO',
 zhT: 'Azure AI Foundry × Fabric：坐拥 $6,780亿 履约合同的模型中立超级电网',
 enT: 'Azure AI Foundry × Fabric: Model-Neutral Cloud Grid Backed by $678B RPO',
 zhD: 'Q1 FY27 Azure 单季营收高达 $331.7亿（+48% YoY）。通过 Microsoft Foundry，企业无需绑定单一模型，即可在同一套安全合规 API 下自由调用 OpenAI、Anthropic Claude、Meta Llama 及微软自研 MAI 模型，并无缝连接高速增长的 Microsoft Fabric 统一数据湖——数据在哪里，AI 推理消耗就留在哪里。',
 enD: 'With Q1 FY27 Azure revenue surging +48% YoY to $33.17B, Microsoft Foundry lets enterprises route across OpenAI, Anthropic, Llama, and MAI models directly atop unified Microsoft Fabric data estates.',
 zhF: '利润传导：$678B 已签约商业 RPO (含 $250B OpenAI 增量承诺) 按 2–4 年履约节奏持续释放为高确定性云收入',
 enF: 'Monetization: $678B contracted commercial RPO (+$250B OpenAI Azure pact) converting steadily into high-utilization cloud revenue',
 gauges: [['$33.17B', 'Q1 FY27 单季 Azure 美元营收', 'Q1 FY27 Standalone Azure Rev'], ['+48% YoY', '千亿体量上惊人加速增长', 'Accelerating YoY Growth'], ['$678B', 'FY26 末已签约商业 RPO', 'FY26-End Commercial RPO'], ['1,800+ 模型', 'Foundry 模型目录生态广度', 'Models in Azure Foundry']]
 },
 {
 badge: 'ENGINE 03 · MAIA 200 (3NM) & COBALT 200 SILICON AUTONOMY',
 zhT: '自研云双芯破局：用台积电 3nm Maia 200 与 Arm Cobalt 200 夺回云毛利率定价权',
 enT: 'Custom Cloud Silicon: TSMC 3nm Maia 200 & Arm Cobalt 200 Reclaiming Cloud Gross Margin',
 zhD: '面对外部 GPU 采购高溢价对云毛利的挤压，微软双管齐下：2026 年 1 月发布的 Maia 200 集成超 1,400 亿晶体管，专为 FP4/FP8 超大规模推理与强化学习后训练优化，每瓦特 Token 产出提升 1.7 倍；2026 年 11 月全面商用的 Cobalt 200 基于 Arm CSS V3 架构重构通用计算性价比，直接压降内部服务与外部云租户底层 BOM 成本。',
 enD: 'Maia 200 (3nm, 140B+ transistors, 1.7x tokens/watt in FP4/FP8) and Cobalt 200 (Arm CSS V3, GA Nov 2026) systematically lower TCO per token across Copilot and Azure workloads.',
 zhF: '利润传导：内部推理与通用算力向自研双芯迁移 → 预计中期修复 Microsoft Cloud 毛利率 +250–400bps',
 enF: 'Margin Accretion: Shifting internal Copilot & core compute to Maia/Cobalt defends and expands Cloud gross margins by +250–400bps',
 gauges: [['3nm · 140B+', 'Maia 200 先进制程晶体管规模', 'Maia 200 Transistor Count'], ['1.7x 提效', 'Maia 200 每瓦特 Token 推理比', 'Maia 200 Tokens/Watt Gain'], ['Cobalt 200 GA', '2026.11 全面商用上云', 'Cobalt 200 General Availability'], ['+$10B–$15B', '2030E 年化软硬协同节流潜力', 'Est. 2030E Annual TCO Savings']]
 },
 {
 badge: 'ENGINE 04 · SECURE FUTURE INITIATIVE (SFI) & CYBER AGENTS',
 zhT: '10,000 人安全军团与 Security Copilot：把“智能体时代最大痛点”变成最强捆绑包',
 enT: '10,000-Engineer SFI & Security Copilot: Turning Enterprise Agent Risk into Moat',
 zhD: '当企业部署成千上万自主 AI 智能体时，最大的恐惧是数据泄露与权限失控。在新任安全统帅 Hayete Gallot 带领下，微软逾万人安全工程团队将零信任防护（Entra + Defender + Purview + Sentinel）直接嵌入 Windows 内核与 Agent 365，使微软成为全球唯一能同时提供“生产力底座 + 算力 + 原生智能体安防”的供应商。',
 enD: 'Led by EVP Hayete Gallot across 10,000 security engineers, Microsoft embeds Entra, Defender, Purview, and Security Copilot directly into Windows and Agent 365 to secure autonomous enterprise fleets.',
 zhF: '变现逻辑：E5 安全套件渗透率提升 + Security Copilot 按计算单元（SCU）弹性计费',
 enF: 'Monetization: E5 security suite attach rate + metered Security Copilot compute units (SCUs)',
 gauges: [['10,000+ 人', '专职安全研发工程军团规模', 'Dedicated Security Engineers'], ['全员 KPI 挂钩', 'SFI 安全考核一票否决机制', 'Comp-Linked SFI Mandate'], ['65万亿+/日', '全球每日实时威胁信号感知量', 'Daily Threat Signals Analyzed'], ['~$25B+', '安全板块独立估算年化营收级', 'Estimated Annual Security Run-Rate']]
 },
 {
 badge: 'ENGINE 05 · GITHUB COPILOT & COREAI DEVELOPER FACTORY',
 zhT: 'GitHub + VS Code + CoreAI：垄断全球软件工程师的“AI 原生开发工作台”',
 enT: 'GitHub + VS Code + CoreAI: Owning the Global AI Software Factory',
 zhD: '由前 Meta 工程统帅 Jay Parikh 掌舵的 CoreAI 部门，将 GitHub（超 1.5 亿开发者）、VS Code 与 Azure AI 工具链整合为端到端“智能体软件工厂”。从代码自动补全进化为自主修复 Bug、编写测试并触发 Azure 部署的异步 Coding Agent，直接把全球每一家企业的软件工程团队转化为 Azure 算力的天然上游漏斗。',
 enD: 'Under EVP Jay Parikh, CoreAI unifies GitHub, VS Code, and Azure Foundry into an end-to-end agentic software factory—turning developer workflows directly into downstream Azure cloud deployments.',
 zhF: '变现逻辑：GitHub Copilot Pro/Enterprise 席位高增 + 异步 Coding Agent 云端沙盒算力消耗',
 enF: 'Monetization: GitHub Copilot Enterprise seats + cloud-hosted asynchronous coding agent compute minutes',
 gauges: [['CoreAI 整合', 'Jay Parikh 统管开发者与平台栈', 'Unified CoreAI Platform Org'], ['#1 市场份额', 'AI 辅助软件工程绝对领跑者', 'Category-Leading Coding AI'], ['多模型自选', '支持 Claude / GPT / o系列切换', 'Multi-Model Developer Choice'], ['天然漏斗', '开发即默认一键部署至 Azure', 'Seamless Azure Deployment Funnel']]
 },
 {
 badge: 'ENGINE 06 · MAJORANA 1 TOPOLOGICAL QUANTUM & DISCOVERY',
 zhT: 'Majorana 1 × Microsoft Discovery：瞄准物理与化学模拟极限的二十年长线王牌',
 enT: 'Majorana 1 × Microsoft Discovery: Topological Quantum & Scientific Supercomputing',
 zhD: '由资深高管 Jason Zander 统领的 Microsoft Discovery & Quantum 团队，一方面用科学智能体平台将新材料研发周期从数年缩短至数天，另一方面凭借历时近二十年攻关的砷化铟-铝“拓扑导体（Topoconductor）”推出 Majorana 1 量子芯片，天然具备硬件级抗噪纠错优势，剑指单芯片容纳百万量子比特的工业实用化终局。',
 enD: 'Led by EVP Jason Zander, Microsoft pairs its Microsoft Discovery scientific AI platform with Majorana 1—the world\'s first topological-core quantum processor architected to scale to one million qubits on a single chip.',
 zhF: '战略定位：研发费用已在当期全额费用化，一旦容错量子云率先突破，将开辟零竞争对手的工业模拟高毛利新大陆',
 enF: 'Strategic Option: Fully expensed inside current R&D; unlocks an unassailable moat in chemical, material, and pharma simulation post-2030',
 gauges: [['Majorana 1', '全球首款拓扑核心量子处理器', 'First Topological Quantum Chip'], ['DARPA US2QC', '入选美国防部实用量子终选阶段', 'Selected for DARPA Final Phase'], ['100万 Qubits', '单晶圆可扩展架构设计目标', 'Single-Chip Scaling Target'], ['2030–2033', '工业级容错量子混合云窗口', 'Commercial Hybrid Quantum Window']]
 }
 ];

 function renderHorizon() {
 var hz = HORIZONS[state.hzIdx] || HORIZONS[0];
 var en = state.lang === 'en';
 document.getElementById('hzBadge').textContent = en ? hz.enBadge : hz.badge;
 document.getElementById('hzTitle').textContent = en ? hz.enT : hz.zhT;
 var items = en ? hz.enItems : hz.zhItems;
 document.getElementById('hzList').innerHTML = items.map(function (t) {
 return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
 }).join('');
 document.getElementById('hzProb').textContent = en ? hz.enP : hz.zhP;
 document.getElementById('hzImpact').textContent = en ? hz.enI : hz.zhI;
 }

 function renderEngine() {
 var eg = ENGINES[state.engIdx] || ENGINES[0];
 var en = state.lang === 'en';
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').textContent = en ? eg.enT : eg.zhT;
 document.getElementById('engDesc').textContent = en ? eg.enD : eg.zhD;
 document.getElementById('engFormula').textContent = en ? eg.enF : eg.zhF;
 document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
 return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + (en ? g[2] : g[1]) + '</span></div>';
 }).join('');
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
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
 state.hzIdx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 var bs = this.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderHorizon();
 });

 document.getElementById('engineRail').addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 state.engIdx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 var bs = this.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderEngine();
 });

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
 var jump = item.getAttribute('data-suite-jump');
 var msg = item.getAttribute('data-suite-msg');
 if (jump) {
 var el = document.querySelector(jump);
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 } else if (msg) {
 showToast(msg);
 }
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
 { name: 'Microsoft', cap: 115.9, fcf: 67.0, tip: 'FY26 现金 CapEx $115.95B，依托 $182.9B OCF 仍净赚 $67.0B 正向自由现金流（且有 $678B RPO 背书）' },
 { name: 'Amazon', cap: 125.0, fcf: 18.0, tip: 'AWS 与电商履约双线重资本开支，自由现金流阶段性显著收窄' },
 { name: 'Alphabet', cap: 85.0, fcf: 62.0, tip: 'TPU 与数据中心高强度扩张，依赖搜索广告现金流支撑' },
 { name: 'Meta', cap: 70.0, fcf: 42.0, tip: '开源模型与社交推荐算力集群投入，无外部公有云直接出租回血' },
 { name: 'Apple', cap: 9.0, fcf: 136.1, tip: '端侧推理轻资产路线：全年 CapEx 仅 $9.0B，FCF 高达 $136.1B' }
 ];
 var maxC = 145;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = 22;
 peers.forEach(function (p, i) {
 var cx = pad.left + i * slot + slot / 2;
 var ch = Math.max(5, (p.cap / maxC) * ph), fh = Math.max(5, (p.fcf / maxC) * ph);
 ctx.fillStyle = i === 0 ? pal.blue : pal.amber;
 roundRect(ctx, cx - bw - 3, pad.top + ph - ch, bw, ch, 5); ctx.fill();
 ctx.fillStyle = pal.green;
 roundRect(ctx, cx + 3, pad.top + ph - fh, bw, fh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.cap.toFixed(0), cx - bw / 2 - 3, pad.top + ph - ch - 5);
 ctx.fillText('$' + p.fcf.toFixed(0), cx + bw / 2 + 3, pad.top + ph - fh - 5);
 ctx.fillStyle = i === 0 ? pal.blue : pal.sub; ctx.font = (i === 0 ? 'bold ' : '600 ') + '11px sans-serif';
 ctx.fillText(p.name, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: p.name + ' (左:CapEx / 右:FCF)', body: p.tip });
 });
 } else {
 var steps = [
 { lbl: 'FY26基准', v: 331.8, b: 0, col: pal.blue, tip: 'FY2026 实际总营收: $331.84B' },
 { lbl: '+Azure算力/数据', v: 185.0, b: 331.8, col: pal.green, tip: '$678B RPO 释放与企业核心云/Fabric/Foundry 推理贡献 +$185B' },
 { lbl: '+Copilot/Agent', v: 88.0, b: 516.8, col: pal.violet, tip: 'M365 Copilot 席位扩容与 Agent 365 按量数字员工税贡献 +$88B' },
 { lbl: '+安全/GitHub', v: 46.0, b: 604.8, col: pal.amber, tip: '零信任安全整合、Security Copilot 与 CoreAI 开发者平台贡献 +$46B' },
 { lbl: '+行业云/量子/游戏', v: 35.0, b: 650.8, col: pal.green, tip: '医疗/金融行业云、Discovery 科学平台与跨端游戏贡献 +$35B' },
 { lbl: 'FY32E蓝图', v: 685.8, b: 0, col: pal.blue, tip: 'FY2032E 远期营收蓝图: ~$686B（较 FY26 翻倍以上）' }
 ];
 var maxB = 760;
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
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
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
 var yrs = ['2024 (Gen1)', '2025', '2026 (200系)', '2027E', '2028E', '2030E'];

 if (state.sView === 'pen') {
 var maiaPen = [4, 10, 22, 34, 44, 55];
 var cobPen = [8, 18, 32, 46, 56, 65];
 for (var g = 0; g <= 4; g++) {
 var gv = g * 20, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 function plotP(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 80) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 80) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 2 || idx === 5) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v + '%', px, py - 8);
 }
 hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '预计占新增对应工作负载算力比重约 ' + v + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / 5) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotP(cobPen, pal.blue, 'Cobalt Arm CPU 新增通用算力占比');
 plotP(maiaPen, pal.violet, 'Maia 加速器 内部及标准推理占比');
 } else {
 var saved = [0.5, 1.4, 3.2, 6.4, 9.8, 13.5];
 var maxS = 15.5;
 for (var m = 0; m <= 3; m++) {
 var mv = (m * 5).toFixed(0), my = pad.top + ph - ((m * 5) / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (saved[i] / maxS) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + saved[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 自研硅片年化 TCO 节省', body: '预计全年节省外部芯片采购溢价与机房能耗约 $' + saved[i].toFixed(1) + 'B' });
 });
 }
 }

 // F4: Interactive 2030 Optionality Builder
 var OPT_DATA = {
 agent: { rev: 52, net: 26.5 },
 azure: { rev: 95, net: 34.2 },
 silicon: { rev: 0, net: 9.2 },
 sec: { rev: 22, net: 11.4 },
 quantum: { rev: 28, net: 12.0 }
 };
 var miniCaps = [3.60, 4.49, 7.10];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = state.lang === 'en';
 var pad = { top: 22, right: 18, bottom: 24, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Current (~$3.6T)', '2030 Base', '2030 + Options'] : ['当前市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(8.5, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
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
 // Baseline organic FY2030E (core cloud/M365 compounding ex-major incremental agent/silicon breakthroughs; ~7.32B shares)
 var baseRev = 450.0, baseNet = 140.5, sh2030 = 7.32;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addNet += d.net; }
 }
 });
 var totRev = baseRev + addRev;
 var totNet = baseNet + addNet;
 var eps = totNet / sh2030;
 var mcapT = (totNet * state.pe) / 1000;
 var baseMcapT = (baseNet * state.pe) / 1000;

 document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

 miniCaps = [3.60, baseMcapT, mcapT];
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
 tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
 tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
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
 { id: 'sec-f0', t: 'F0 双核新政与三阶战略时间窗雷达', s: 'Agents & Infra 新分部 · 2026–2032 近程/中程/远期路线图' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Agent 365 · Azure Foundry · Maia/Cobalt · SFI安全 · CoreAI · 拓扑量子' },
 { id: 'sec-f2', t: 'F2 算力基建收获期与 2032 营收桥', s: '$115.9B CapEx vs $67.0B 正 FCF · 迈向 $686B 营收阶梯' },
 { id: 'sec-f3', t: 'F3 自研云硅片与量子主权路线图', s: 'Maia 200 (3nm) + Cobalt 200 (GA) + Majorana 1 拓扑导体' },
 { id: 'sec-f4', t: 'F4 2030 冲击 $7万亿市值期权组装器', s: '自由开关五大新业务期权与估值倍数实时测算 EPS' }
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
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var root = document.documentElement;
 var collapsed = root.getAttribute('data-sidebar-collapsed') !== '1';
 if (collapsed) root.setAttribute('data-sidebar-collapsed', '1');
 else root.removeAttribute('data-sidebar-collapsed');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, collapsed ? '1' : '0'); } catch (err) {}
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

 
 
 
 
 
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

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 