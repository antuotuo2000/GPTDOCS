
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'msft_bm_stress_v1';

 var state = {
 theme: 'dark',
 lang: 'zh',
 pView: 'waterfall',
 cView: 'ltv',
 kView: 'rpo',
 lensIdx: 0,
 nodeIdx: 0,
 cohortKey: 'e5'
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

 function downloadSelfHtml() {
 try {
 var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var a = document.createElement('a');
 a.href = url;
 a.download = '微软公司商业模式解构.html';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
 showToast(state.lang === 'en' ? 'Downloaded standalone HTML file' : '已开始下载独立网页：微软公司商业模式解构.html');
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
 blueSoft: dark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.18)',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED',
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
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色外观' : '已切换至清晰浅色外观');
 }

 var LENSES = [
 {
 zhF: '企业客户终身净值 = 存量席位数 × [E3 ($36) → E5 ($57) → M365 Copilot (+$30) → Agent 365 按量消耗] × ~98%+ 企业续约底座',
 enF: 'Enterprise LTV = Seats × [E3 ($36) → E5 ($57) → M365 Copilot (+$30) → Agent 365 Metered Usage] × ~98%+ Gross Retention',
 zhB: '独立 SaaS 厂商每卖出一款安全、协作或 AI 工具都要支付高昂销售佣金；而微软通过企业级协议（Enterprise Agreement）将 Teams、Defender 安全与 Copilot 打包进同一张 IT 采购账单，实现<strong>“无需新增获客成本的原地 ARPU 翻倍”</strong>。',
 enB: 'Point SaaS vendors spend 35%–50% of revenue on S&M to win enterprise logos; Microsoft bundles Teams, Defender Security, and Copilot onto existing Enterprise Agreements—doubling per-seat ARPU at near-zero incremental customer acquisition cost.'
 },
 {
 zhF: '营业利润率逆势创纪录 (FY26 46.8% / Q1 FY27 49.8%) = 67.9% 综合毛利率 - 21.1% 极低期间费用率 (人员缩减 -2.2% 对冲 AI 折旧)',
 enF: 'Record Op Margin (46.8% FY26 / 49.8% Q1 FY27) = 67.9% Gross Margin - 21.1% Lean OpEx Ratio (-2.2% FTE Reduction Offsets AI D&A)',
 zhB: '外界曾担忧千亿美元 GPU 折旧会压垮微软利润率，但实战表明：内部率先用 GitHub Copilot 与自动化运维冻结行政与销售扩编（FY26 销售费率降至 8.0%），<strong>经营杠杆扩张幅度完全跑赢了云基础设施折旧增幅</strong>。',
 enB: 'Wall Street feared $115.9B in CapEx depreciation would crush margins, yet internal AI productivity let Microsoft trim headcount by 5,000 while growing revenue 18%—compressing S&M to 8.0% of sales and expanding operating margins to ~50%.'
 },
 {
 zhF: '确定性现金转换：$678B 已签约商业 RPO (2.0x 年营收) + $75.7B 账面递延预收款 → 驱动 $182.9B OCF 自筹算力扩建并净剩 $67.0B FCF',
 enF: 'Contracted Cash Visibility: $678B Commercial RPO (2.0x Annual Sales) + $75.7B Unearned Revenue Float → $182.9B OCF Self-Funds CapEx',
 zhB: '不同于消费互联网先烧钱买流量再赌变现，微软的数据中心扩建锚定在<strong>长达数年期、不可随意撤销的企业级云承诺合同（RPO）</strong>之上，且企业按年预付的 $757亿递延收入构成了庞大的无息运营浮存金。',
 enB: 'Unlike speculative consumer AI spend, Microsoft builds datacenters against $678B in binding multi-year enterprise commitments and $75.7B in upfront unearned revenue float—funding $115.9B CapEx entirely from operating cash flow.'
 }
 ];

 var NODES = [
 {
 badge: 'NODE 01 · ENTERPRISE IDENTITY & WORKFLOW MONOPOLY',
 zhT: 'Entra ID + Windows + Office + GitHub：卡住全球企业“人、代码与权限”的咽喉',
 enT: 'Entra ID + Windows + Office + GitHub: Owning Enterprise Identity, Code & Context',
 zhD: '正如苹果用 Apple ID 锁住个人消费者，微软用 Microsoft Entra（原 Azure AD）、Exchange 邮件树、SharePoint 文档库与 GitHub 代码库锁住了全球几乎所有跨国企业的组织架构与权限图谱（Microsoft Graph / Work IQ）。企业替换单一聊天或网盘工具或许可行，但剥离整套身份认证、安全合规与文档协同底座无异于“在线更换企业中枢神经系统”。',
 enD: 'Just as Apple locks consumers in via Apple ID, Microsoft anchors enterprises through Microsoft Entra identity, Exchange, SharePoint, and GitHub repositories—forming the irreplaceable Work IQ organizational context graph.',
 zhF: '商业传导：Entra 身份主权 + 零边际分发渠道（Teams / Defender 捆绑） → 令独立垂直 SaaS 竞争对手极难突破微软企业协议护城河',
 enF: 'Value Capture: Entra Identity Root + Zero-CAC Enterprise Bundling → Insurmountable switching costs vs. point SaaS rivals',
 kpis: [['$214.4B', 'FY2026 Microsoft Cloud 营收', 'FY26 Microsoft Cloud Rev'], ['64.6%', '云业务占集团总营收比重', 'Cloud Share of Total Rev'], ['8.0%', 'FY26 销售与营销费率', 'FY26 S&M % of Revenue'], ['$35.6B', 'FY26 全栈共享研发池', 'FY26 Shared R&D Pool']]
 },
 {
 badge: 'NODE 02 · E3 → E5 → COPILOT SEAT PRICING LADDER',
 zhT: '生产力现金牛（PBP $1,400亿）：高达 59.9% 营业利润率的席位阶梯提价术',
 enT: 'Productivity Cash Engine ($140.0B PBP): 59.9% Operating Margin Seat Ladder',
 zhD: '微软在存量企业席位上设计了精妙的四级单价跃迁：从基础 Office 365 迁云，到包含高级威胁防护与语音分析的 E5 套件（$57/月），再到加购 $30/人/月的 Microsoft 365 Copilot（FY26 末突破 3,000 万付费席位）。每一级升级几乎无需额外履约人力，直接沉淀为近 60% 的超高分部营业利润率。',
 enD: 'Microsoft compounds per-user monetization across four rungs—Office Cloud migration, E3 ($36), E5 security/analytics ($57), and M365 Copilot (+$30, >30M paid seats)—driving a 59.9% PBP operating margin ($83.88B operating income).',
 zhF: '商业传导：席位基数微增 (+5%–6%) × E5/Copilot 渗透提拉 ARPU → FY26 PBP 贡献 $838.8亿 营业利润（占全公司 54.0%）',
 enF: 'Value Capture: Seat Base Growth × E5/Copilot ARPU Expansion → $83.88B FY26 PBP Operating Income (54.0% of Total)',
 kpis: [['$140.0B', 'FY26 PBP 分部营收 (+16%)', 'FY26 PBP Revenue (+16%)'], ['59.9%', 'FY26 PBP 分部营业利润率', 'FY26 PBP Operating Margin'], ['30M+ 席位', 'M365 Copilot 付费企业席位', 'M365 Copilot Paid Seats'], ['+17% YoY', 'Q1 FY27 M365 商业云增速', 'Q1 FY27 M365 Comm. Growth']]
 },
 {
 badge: 'NODE 03 · AZURE FUNGIBLE GLOBAL AI COMPUTE FLEET',
 zhT: 'Azure 超算电网（Q1 年化 $1,327亿）：可跨训练、推理与传统云动态调度的同构资产',
 enT: 'Azure Compute Grid ($132.7B Run-Rate): Fungible Global AI & Hybrid Fleet',
 zhD: '纳德拉与 Scott Guthrie 坚持将全球 60+ 云区域建设为“同构可互换算力舰队（Fungible Fleet）”，结合自研 Maia 200 推理芯片与 Cobalt 200 Arm CPU，确保每一兆瓦电力与每一张加速卡既能服务大模型推理，也能承接 SQL/Cosmos DB 与混合云迁移，推动 Q1 FY27 Azure 营收同比暴涨 48% 至单季 $331.7亿。',
 enD: 'Built as a globally fungible fleet across 60+ regions pairing NVIDIA GPUs with custom Maia 200 and Cobalt 200 silicon, Azure accelerated to +48% YoY growth ($33.17B quarterly revenue) in Q1 FY27.',
 zhF: '商业传导：企业核心系统上云带入数据引力 → 就近调用 Azure AI Foundry 推理 → 算力利用率维持高位',
 enF: 'Value Capture: Core Cloud Data Gravity → Co-located Azure AI Inference → High Fleet Utilization',
 kpis: [['$33.17B', 'Q1 FY27 单季 Azure 营收', 'Q1 FY27 Quarterly Azure Rev'], ['+48% YoY', 'Q1 FY27 Azure 加速增长率', 'Q1 FY27 Azure YoY Growth'], ['$100B+', 'FY26 Azure 全年首破千亿美元', 'FY26 Azure Topped $100B'], ['1.7x', 'Maia 200 每瓦特 Token 效率', 'Maia 200 Tokens/Watt Gain']]
 },
 {
 badge: 'NODE 04 · MULTI-MODEL FOUNDRY & AGENT 365 GOVERNANCE',
 zhT: '模型中立超级超市 + Agent 365 管控台：把“Token 消耗”升级为“数字员工税”',
 enT: 'Multi-Model Foundry + Agent 365 Control Plane: Taxing Digital Labor',
 zhD: '2026 年 4 月修订 OpenAI 协议后，微软既保留 OpenAI 直至 2032 年的模型 IP 授权，又在 Microsoft Foundry 中开放 Anthropic Claude、Meta Llama 及自研 MAI 模型供客户按成本/场景路由；并在 Ignite 2026 推出 Agent 365，让企业 IT 像管理真人雇员一样为数百万 AI 智能体分配身份、权限与审计策略并按量付费。',
 enD: 'Retaining OpenAI IP through 2032 while hosting Anthropic, Llama, and in-house MAI models in Foundry, Microsoft launched Agent 365 at Ignite 2026 to govern, secure, and monetize enterprise AI agents.',
 zhF: '商业传导：人头席位天花板突破 → 每个白领席位衍生 N 个 24小时运转的按 Token/任务计费智能体',
 enF: 'Value Capture: Breaking Seat Ceilings → Human Seat + Metered Autonomous Agent Consumption',
 kpis: [['$76.80B', 'Q1 FY27 Agents & Infra 营收', 'Q1 FY27 Agents & Infra Rev'], ['52.8%', 'Q1 Agents & Infra 营业利润率', 'Q1 Agents & Infra Op Margin'], ['2032年', 'OpenAI 核心模型 IP 授权锁定期', 'OpenAI IP Rights Horizon'], ['27% 股权', '持有 OpenAI PBC 重组后权益', 'Equity Stake in OpenAI PBC']]
 },
 {
 badge: 'NODE 05 · $678B RPO RESERVOIR & SELF-FUNDED COMPOUNDING',
 zhT: '$6,780亿 RPO 合同水库 + $757亿 预收浮存：唯一无需净举债即能狂飙基建的现金流巨兽',
 enT: '$678B Contracted RPO + $75.7B Unearned Float: Self-Funded AI Compounding',
 zhD: '企业客户签署数年期云承诺合同并按年预付订阅费，使微软账面常年躺着 $757.1亿 递延收入（Unearned Revenue）与高达 $6,780亿 的商业剩余履约义务。这让微软在 FY26 投入 $1,159.5亿 现金资本开支后，依然产出 $669.9亿 自由现金流，并从容派发 $264.5亿 股息与执行 $222.7亿 股票回购。',
 enD: 'Multi-year enterprise commitments ($678B RPO) and upfront annual billings ($75.7B unearned revenue) generate $182.9B in operating cash flow—fully covering $115.9B CapEx while returning $48.7B in dividends and buybacks.',
 zhF: '商业传导：$1,829亿 经营现金流 - $1,159亿 现金 CapEx = $670亿 正向 FCF → 兼顾算力霸权与每股分红连涨',
 enF: 'Value Capture: $182.9B OCF - $115.9B CapEx = $67.0B Positive FCF → Simultaneous AI Scale & Capital Return',
 kpis: [['$678B', 'FY26 末商业 RPO (+84% YoY)', 'FY26-End Comm. RPO (+84%)'], ['$75.7B', '账面预收递延收入浮存金', 'Balance Sheet Unearned Rev'], ['$67.0B', 'FY26 正向自由现金流', 'FY26 Positive Free Cash Flow'], ['$48.7B', 'FY26 分红 + 回购股东总回报', 'FY26 Dividends + Buybacks']]
 }
 ];

 var COHORTS = {
 e3: {
 zhS: [
 ['典型订阅组合', 'Office 桌面 + Exchange + Teams 基础版', '企业数字化办公入场券'],
 ['标杆目录单价 (每席位/月)', '$36 / 月', '年化单席位合同额 $432'],
 ['企业净留存与续约韧性', '~95%', '文档格式与协作习惯基础锁定'],
 ['千人规模企业 5年累计毛利', '$1.68M', '部分客户仍需外采第三方安全工具']
 ],
 enS: [
 ['Typical Bundle', 'Office Apps + Exchange + Core Teams', 'Foundational enterprise seat'],
 ['List Price (Per User / Mo)', '$36 / mo', '$432 annualized per seat'],
 ['Enterprise Gross Retention', '~95%', 'Document & workflow stickiness'],
 ['5Y 1,000-Seat Gross Profit', '$1.68M', 'Often paired with 3P security tools']
 ],
 zhN: '<strong>基础协同层特征：</strong>M365 E3 完成了从买断制 Office 向云端订阅年金的跃迁，但在该层级企业往往仍额外采购第三方安全与 BI 软件——这正是微软商业销售团队推进“E5 TCO 整合包”的最大金矿。',
 enN: '<strong>Standard E3 Layer:</strong> Converts perpetual Office licenses into recurring cloud annuities while creating the natural upsell runway to consolidate third-party security and BI spend into E5.'
 },
 e5: {
 zhS: [
 ['典型订阅组合', 'Office + Teams + Defender + Power BI', '替代 5–8 家独立第三方安全/BI工具'],
 ['标杆目录单价 (每席位/月)', '$57 / 月', '较 E3 ($36) 提价 +58%'],
 ['企业净留存与续约韧性', '>98%', '安全合规与身份策略深度锁死'],
 ['千人规模企业 5年累计毛利', '$2.74M', '边际交付毛利率 ~80%']
 ],
 enS: [
 ['Typical Bundle', 'Office + Teams + Defender + Power BI', 'Consolidates 5–8 point security/BI vendors'],
 ['List Price (Per User / Mo)', '$57 / mo', '+58% ARPU uplift over E3 ($36)'],
 ['Enterprise Gross Retention', '>98%', 'Identity & security policy lock-in'],
 ['5Y 1,000-Seat Gross Profit', '$2.74M', '~80% marginal software gross margin']
 ],
 zhN: '<strong>“CIO 总拥有成本（TCO）套利”棘轮效应：</strong>当企业从 E3 升级至 E5 时，虽然向微软多付 $21/人/月，但可一次性退订外部独立的终端杀毒、单点登录、云访问安全与数据分析软件（合计往往超 $45/月）——<strong>客户省了总预算，微软却吃下了全量钱包份额</strong>。',
 enN: '<strong>CIO TCO Consolidation Ratchet:</strong> Upgrading from E3 to E5 adds $21/user/mo for Microsoft while allowing CIOs to retire $45+/mo of fragmented third-party endpoint, identity, and BI tools.'
 },
 ai: {
 zhS: [
 ['典型订阅组合', 'M365 E5 + Copilot ($30) + Agent 365 消耗', '人类席位费 + 数字智能体按量计费'],
 ['综合等效单价 (每席位/月)', '$95–$120+ / 月', '较基础 E3 实现 2.6x–3.3x 扩容'],
 ['企业净留存与生态粘性', '>99%', '组织记忆库 Work IQ 与业务流深度耦合'],
 ['千人规模企业 5年累计毛利', '$4.45M+', '打开万亿美元级白领生产力预算池']
 ],
 enS: [
 ['Typical Bundle', 'M365 E5 + Copilot ($30) + Agent 365 Metered', 'Human seat fee + autonomous agent usage'],
 ['Blended Monthly ARPU', '$95–$120+ / mo', '2.6x–3.3x expansion over base E3'],
 ['Enterprise Retention', '>99%', 'Work IQ institutional memory lock-in'],
 ['5Y 1,000-Seat Gross Profit', '$4.45M+', 'Taps into enterprise labor budgets']
 ],
 zhN: '<strong>从“IT 软件预算”跨入“人力资源预算”：</strong>一旦企业在 E5 之上部署 M365 Copilot（已超 3,000 万席位）与 Agent 365 销售/财务/IT 智能体，微软赚取的不再只是占 GDP 3% 的软件工具费，而是直接分享全球白领知识工作的效率红利。',
 enN: '<strong>Crossing from IT Spend to Labor Spend:</strong> Layering M365 Copilot (>30M seats) and metered Agent 365 workflows onto E5 expands Microsoft\'s addressable market from IT software budgets into knowledge-worker productivity.'
 }
 };

 function renderLens() {
 var l = LENSES[state.lensIdx] || LENSES[0];
 var en = state.lang === 'en';
 document.getElementById('lensFormula').textContent = en ? l.enF : l.zhF;
 document.getElementById('lensBody').innerHTML = en ? l.enB : l.zhB;
 }

 function renderNode() {
 var nd = NODES[state.nodeIdx] || NODES[0];
 var en = state.lang === 'en';
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = en ? nd.enT : nd.zhT;
 document.getElementById('nodeDesc').textContent = en ? nd.enD : nd.zhD;
 document.getElementById('nodeFormula').textContent = en ? nd.enF : nd.zhF;
 document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
 return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + (en ? k[2] : k[1]) + '</span></div>';
 }).join('');
 }

 function renderCohort() {
 var c = COHORTS[state.cohortKey] || COHORTS.e5;
 var en = state.lang === 'en';
 var arr = en ? c.enS : c.zhS;
 document.getElementById('cohortMetrics').innerHTML = arr.map(function (s, idx) {
 var isMono = idx > 0 ? ' mono' : '';
 var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = en ? c.enN : c.zhN;
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn');
 var enB = document.getElementById('langEnBtn');
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
 renderLens();
 renderNode();
 renderCohort();
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 // Bind interactive tabs
 document.getElementById('lensTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 state.lensIdx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
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

 // Suite hub filter & feedback
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

 // High-DPI Retina Canvas Helpers
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
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = state.lang === 'en';
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: en ? 'Svc & Cloud' : '云与服务', val: 267.1, base: 0, col: pal.blue, tip: 'FY2026 Service & Other: $267.14B (80.5% 营收占比, 毛利率 64.7%)' },
 { lbl: en ? '+Product' : '+软件/硬件', val: 64.7, base: 267.1, col: pal.violet, tip: 'FY2026 Product 营收: +$64.70B (毛利率 81.3%) → 总营收 $331.84B' },
 { lbl: en ? '=Gross Profit' : '=综合毛利', val: 225.5, base: 0, col: pal.green, tip: 'FY2026 综合毛利额: $225.47B (综合毛利率 67.9%)' },
 { lbl: en ? 'Op Income' : '营业利润', val: 155.2, base: 0, col: pal.blue, tip: 'FY2026 营业利润: $155.24B (+20.8% YoY, 营业利润率 46.8%)' },
 { lbl: en ? 'Op Cash Flow' : '经营现金流', val: 182.9, base: 0, col: pal.amber, tip: 'FY2026 经营现金流 OCF: $182.94B (+34.4% YoY, 含预收递延与折旧回加)' },
 { lbl: en ? 'Free Cash Flow' : '自由现金流', val: 67.0, base: 0, col: pal.green, tip: '扣除 $115.95B 现金 CapEx 后正向自由现金流仍达 $66.99B' }
 ];
 var maxV = 365;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxV / 4) * g);
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length;
 var barW = Math.min(46, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6);
 ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26', 'Q1 FY27'];
 var gmTot = [68.4, 68.9, 69.8, 68.8, 67.9, 67.8];
 var opmTot = [42.1, 41.8, 44.6, 45.6, 46.8, 49.8];
 var minM = 35, maxM = 76;
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
 if (idx === yrs.length - 1 || idx === 0 || idx === 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 }
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotLine(gmTot, pal.blue, en ? 'Consolidated Gross Margin' : '集团综合毛利率');
 plotLine(opmTot, pal.green, en ? 'Operating Margin' : '集团营业利润率');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = state.lang === 'en';
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 22, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
 var e3 = [0.33, 0.66, 1.00, 1.34, 1.68];
 var e5 = [0.53, 1.07, 1.62, 2.18, 2.74];
 var ai = [0.82, 1.68, 2.58, 3.50, 4.45];
 var maxL = 5.0;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'M', pad.left - 8, gy + 4);
 }
 function drawCurve(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 var py = pad.top + ph - (v / maxL) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 var py = pad.top + ph - (v / maxL) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + v.toFixed(2) + 'M', px - 6, py - 8);
 }
 hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '千席累计软件毛利: $' + v.toFixed(2) + 'M' });
 });
 }
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 drawCurve(ai, pal.violet, 'E5 + Copilot + Agent 365');
 drawCurve(e5, pal.blue, 'M365 E5 安全全栈套包');
 drawCurve(e3, pal.amber, 'M365 E3 基础套件');
 } else {
 var segs = [
 { name: 'PBP (FY26 生产力)', rev: 42.2, prof: 54.0, col: pal.green },
 { name: 'Intelligent Cloud (FY26)', rev: 41.5, prof: 36.7, col: pal.blue },
 { name: 'Agents & Infra (Q1 FY27新)', rev: 83.2, prof: 88.3, col: pal.violet }
 ];
 var slot = pw / segs.length;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 25;
 var ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 segs.forEach(function (v, idx) {
 var cx = pad.left + idx * slot + slot / 2;
 var bw = 32;
 var uh = (v.rev / 100) * ph, prh = (v.prof / 100) * ph;
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 4, pad.top + ph - uh, bw, uh, 5); ctx.fill();
 ctx.fillStyle = v.col;
 roundRect(ctx, cx + 4, pad.top + ph - prh, bw, prh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.rev + '%', cx - bw / 2 - 4, pad.top + ph - uh - 6);
 ctx.fillText(v.prof + '%', cx + bw / 2 + 4, pad.top + ph - prh - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: v.name, body: '营收占比 ' + v.rev + '% vs 营业利润贡献占比 ' + v.prof + '%' });
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

 if (state.kView === 'rpo') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26', 'Q1 FY27'];
 var rpo = [141, 189, 224, 269, 368, 678, 677];
 var maxR = 760;
 for (var g = 0; g <= 4; g++) {
 var sv = Math.round((maxR / 4) * g);
 var sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + sv + 'B', pad.left - 8, sy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(38, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (rpo[i] / maxR) * ph;
 var yTop = pad.top + ph - bh;
 ctx.fillStyle = (i >= 5) ? pal.green : pal.blue;
 roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + rpo[i] + 'B', x + bw / 2, yTop - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yTop, w: bw, h: bh, title: y + ' 商业 RPO 履约积压', body: '已签约未确认商业合同余额达 $' + rpo[i] + 'B' });
 });
 } else {
 var cyrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
 var ocf = [89.0, 87.6, 118.5, 136.2, 182.9];
 var cap = [23.9, 28.1, 44.5, 64.6, 115.9];
 var maxC = 200;
 for (var m = 0; m <= 4; m++) {
 var mv = m * 50, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
 }
 var sl = pw / cyrs.length;
 cyrs.forEach(function (y, idx) {
 var cx = pad.left + idx * sl + sl / 2, bW = 24;
 var oh = (ocf[idx] / maxC) * ph, ch = (cap[idx] / maxC) * ph;
 ctx.fillStyle = pal.blue;
 roundRect(ctx, cx - bW - 3, pad.top + ph - oh, bW, oh, 4); ctx.fill();
 ctx.fillStyle = pal.amber;
 roundRect(ctx, cx + 3, pad.top + ph - ch, bW, ch, 4); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + ocf[idx].toFixed(0), cx - bW / 2 - 3, pad.top + ph - oh - 5);
 ctx.fillText('$' + cap[idx].toFixed(0), cx + bW / 2 + 3, pad.top + ph - ch - 5);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: cx - bW - 5, y: pad.top, w: bW * 2 + 10, h: ph, title: y + ' 现金流自筹能力', body: '经营现金流 $' + ocf[idx] + 'B vs 现金 CapEx $' + cap[idx] + 'B → 正向自由现金流 $' + (ocf[idx] - cap[idx]).toFixed(1) + 'B' });
 });
 }
 }

 // 5-Year EPS & FCF Simulator
 var simData = { eps: [17.95, 20.6, 23.8, 27.5, 31.8, 36.8] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var arr = simData.eps;
 var maxE = Math.max(28, Math.ceil(Math.max.apply(null, arr) * 1.15));
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
 ctx.fillText('$' + v.toFixed(1), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gC = parseFloat(document.getElementById('inpCloudCagr').value) / 100;
 var gD = parseFloat(document.getElementById('inpDevCagr').value) / 100;
 var capPct = parseFloat(document.getElementById('inpCapexPct').value) / 100;
 document.getElementById('lblCloudCagr').textContent = (gC * 100).toFixed(1) + '%';
 document.getElementById('lblDevCagr').textContent = (gD * 100).toFixed(1) + '%';
 document.getElementById('lblCapexPct').textContent = (capPct * 100).toFixed(1) + '%';

 // FY26 base aligned to Agents & Infra (~82% = $272.1B) + Devices & Consumer (~18% = $59.7B) = $331.84B; diluted shares 7.453B
 var revAI = 272.1, revDC = 59.74, shares = 7.453;
 var epsArr = [17.95];
 for (var y = 1; y <= 5; y++) {
 revAI *= (1 + gC);
 revDC *= (1 + gD);
 shares *= 0.996; // ~0.4% annual net share cannibalization
 var totR = revAI + revDC;
 var depDrag = Math.max(0, (capPct - 0.22) * 0.28);
 var netMargin = Math.max(0.32, 0.392 - depDrag);
 var netInc = totR * netMargin;
 epsArr.push(netInc / shares);
 }
 var fy31Rev = revAI + revDC;
 var fy31Ocf = fy31Rev * 0.525;
 var fy31Fcf = Math.max(20, fy31Ocf - fy31Rev * capPct);
 var fy31Eps = epsArr[5];
 var epsCagr = (Math.pow(fy31Eps / 17.95, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '$' + Math.round(fy31Rev) + 'B';
 document.getElementById('simFcfOut').textContent = '$' + Math.round(fy31Fcf) + 'B';
 document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
 document.getElementById('simCagrOut').textContent = (epsCagr >= 0 ? '+' : '') + epsCagr.toFixed(1) + '%';
 simData.eps = epsArr;
 drawSimMiniCanvas();
 }

 ['inpCloudCagr', 'inpDevCagr', 'inpCapexPct'].forEach(function (id) {
 document.getElementById(id).addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { c: 13.5, d: -1.0, cap: 28 },
 base: { c: 18.5, d: 2.5, cap: 22 },
 bull: { c: 22.5, d: 5.0, cap: 19 }
 };
 document.getElementById('simPresets').addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpCloudCagr').value = pr.c;
 document.getElementById('inpDevCagr').value = pr.d;
 document.getElementById('inpCapexPct').value = pr.cap;
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
 var c = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect();
 var mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var list = hitRegions[canvasId] || [];
 var hit = null;
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

 // Quick Jump (⌘K)
 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$331.84B FY26 营收 · Q1 FY27 营业利润率 49.8% · 席位阶梯透镜' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: 'Entra 身份 → E5/Copilot 提价 → Azure 同构云 → Agent 365 → RPO' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与云栈拆解', s: 'Q1 FY27 Azure $33.17B (+48%) · Agents & Infra 占比 83.2%' },
 { id: 'mod-cohort', t: 'M3 席位提价棘轮与单企 LTV', s: 'E3 ($36) vs E5 ($57) vs Copilot+Agent 千席 5年毛利对比' },
 { id: 'mod-capital', t: 'M4 $678B RPO 浮存与复利推演器', s: '$182.9B OCF 全额覆盖 $115.9B CapEx · 5年 EPS 情景模拟' },
 { id: 'mod-matrix', t: 'M5 六大科技巨头范式对标与压测', s: 'MSFT vs AAPL / AMZN / GOOGL / NVDA / CRM 对比及三大风险核查' }
 ];
 var qInput = document.getElementById('quickJumpInput');
 var qPop = document.getElementById('quickJumpPopover');
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
 if (e.key === 'Escape') {
 if (qPop) qPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 // Sidebar Collapse & Mobile Drawer
 var sbBtn = document.getElementById('sidebarToggleBtn');
 var sb = document.getElementById('muiSidebar');
 var bd = document.getElementById('drawerBackdrop');
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
 setTimeout(drawAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () {
 sb.classList.remove('open');
 bd.classList.remove('open');
 });

 // Export & Print & Theme Controls
 
 
 
 
 
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
 showToast(chk.checked ? '已加入季度重点跟踪清单' : '已取消跟踪标记');
 });
 });
 } catch (e) {}

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 var resizeTimer = null;
 window.addEventListener('resize', function () {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(drawAllCharts, 90);
 });

 runSimulator();
 drawAllCharts();
 })();
 