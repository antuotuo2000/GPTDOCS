
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'ant_bm_stress_v1';

 var state = {
 theme: 'dark',
 lang: 'zh',
 pView: 'waterfall',
 cView: 'ltv',
 kView: 'commit'
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
 text: dark ? '#F3F6F9' : '#0F172A',
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
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色外观' : '已切换至清晰浅色外观');
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
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 // Suite Hub Filter & Safe Toast Navigation
 var hub = document.getElementById('companySubfolderHub');
 if (hub) {
 hub.addEventListener('click', function (e) {
 var pill = e.target.closest('[data-co-cat]');
 if (pill) {
 var cat = pill.getAttribute('data-co-cat');
 var ps = hub.querySelectorAll('[data-co-cat]');
 for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === pill);
 var items = hub.querySelectorAll('[data-co-item-cat]');
 for (var j = 0; j < items.length; j++) {
 items[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || items[j].getAttribute('data-co-item-cat') === cat));
 }
 return;
 }
 var item = e.target.closest('[data-suite-file]');
 if (item) {
 var fn = item.getAttribute('data-suite-file');
 if (item.classList.contains('active')) {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 } else {
 showToast('同套独立网页文件：' + fn + '（请在已下载的四件套中打开）');
 }
 }
 });
 }
 document.querySelectorAll('[data-suite-jump]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 showToast('Anthropic 深度研究四件套 · 第 01 篇：商业模式解构');
 });
 });

 // 1. Command Deck 3-Lens Switcher
 var LENSES = [
 {
 formula: '单企业年化净留存 (~900% NRR) = 初始试点席位 × [工程师全员渗透 × Agent 自主多步循环 Token 乘数 (15x–40x)]',
 body: '传统 SaaS 按人头收费，员工不扩编收入就见顶（NRR 通常 110%–125%）；而 Anthropic 79% 营收来自按量 Token 消耗——当企业从“人类手动提问”升级为 <strong>Claude Code / Fable 5.2 数小时自主长程 Agent 编程与测试循环</strong>，同一名工程师背后的 API 调用量呈指数级裂变，造就软件史上罕见的 ~900% 净留存率。'
 },
 {
 formula: '推导推理毛利率 (85.5%) = 1 - 推理直接履约成本 ($4.81B / $33.24B = 14.5%) | 前沿预训练归入 R&D ($19.24B = 57.9%)',
 body: '市场常混淆“模型训练投入”与“推理服务毛利”。S-1/A 附注 8 揭示：一旦前沿模型训练完成（计入研发费用），每服务 1 美元客户 API 调用的直接算力履约成本仅 <strong>14.5 美分（毛利率高达 85.5%）</strong>——随着营收基数跨过 $678亿年化门槛，固定预训练成本正被极速摊薄。'
 },
 {
 formula: '9M 自由现金流 (+$5.64B) = 经营现金流 (+$6.57B) - 自建设备 CapEx ($0.93B, 仅占收 2.8%) | 多云长期租约对冲折旧风险',
 body: '与斥资数百亿美元自买土地建厂的重资产路线相反，Anthropic 通过 $8,954亿多年期租约调动 Google TPU、AWS Trainium、Broadcom 与 SpaceXAI 集群，不仅把固定资产 CapEx 压在 <strong>2.8%</strong>，还利用多家云与芯片巨头的交叉持股竞价锁住了全行业最低梯队的单 Token 成本。'
 }
 ];
 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) {
 lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 var all = lensTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });
 }

 // 2. Horizontal 5-Node Value-Chain Pipeline Inspector
 var NODES = [
 {
 badge: 'NODE 01 · HETEROGENEOUS MULTI-SILICON ARCHITECTURE',
 title: '三芯异构编译器栈：全球唯一同时大规模跑通 TPU、Trainium 与英伟达 GPU 的前沿实验室',
 desc: '大多数 AI 实验室被单一云厂商或单一 GPU 架构深度绑定，而联合创始人 Tom Brown 与 Sam McCandlish 构建了硬件无关的底层训练与推理抽象层，将总额 $895.4B 的远期算力契约分散布局于 Google Cloud TPU（最低消费 $121.3B）、Broadcom 定制算力租赁（$161.2B）、Amazon AWS Trainium（$110.0B）及 SpaceXAI / Nscale / Lambda 的英伟达集群，大幅压低百万 Token 推理成本。',
 formula: '商业传导：异构算力调度消除单点溢价 → 每美元算力产出营收由 Q1\'25 的 0.40x 飙升至 Q2\'26 的 2.08x（Q3 含短期峰值扩容仍达 1.72x）',
 kpis: [['85.5%', '9M 2026 推导推理毛利率'], ['$895.4B', '多年期多云算力锁价储备'], ['2.08x', 'Q2\'26 每美元总算力创收比'], ['2.8%', '自持物业设备 CapEx / 营收比']]
 },
 {
 badge: 'NODE 02 · 4-CLASS MODEL LADDER & DUAL-TRACK SAFETY',
 title: '四档模型矩阵（Haiku / Sonnet / Opus / Fable&Mythos）：高频迭代收割全光谱工作负载',
 desc: '从 2025 年 5 月至 2026 年 11 月，Anthropic 18 个月密集交付 22 款模型，全系标配 100万上下文窗口：Haiku 5.5 ($0.10/$0.50) 承接海量路由与子代理，Sonnet 5.5 ($2/$10) 制霸日常编码（Terminal-Bench 4.0 达 70.6%），Opus 5.5 ($4/$20) 主打深度复杂任务，顶层 Fable 5.2 / Mythos 5.2 ($8/$40) 则开辟双轨制——大众安全版与经核验机构专享网络安全/生物科研版。',
 formula: '商业传导：半年内发布的新模型贡献 Q3 2026 超过 80% 营收 → 快速迭代让客户始终留在高附加值前沿层而非商品化旧模型',
 kpis: [['22款', '18个月密集交付前沿模型数'], ['>80%', '近6个月新模型占 Q3 营收比重'], ['64.6分', 'Fable 5.2 领跑 AA 智能指数 v5'], ['1M上下文', '全系四档模型统一标准窗口']]
 },
 {
 badge: 'NODE 03 · MCP OPEN STANDARD & CLAUDE CODE WORKFLOW LOCK-IN',
 title: 'MCP 协议总线 + Claude Code 终端原生代理：从“卖模型 API”升维至“接管企业生产流水线”',
 desc: '如果仅提供聊天框或裸 API，客户随时可以修改一行代码切换竞品。Anthropic 一方面开源 Model Context Protocol (MCP)，使数万家企业按 Claude 标准打通内部数据库、代码仓与 SaaS 工具；另一方面以 Claude Code 与 Computer Use（OSWorld 2.1 高达 89.3%）深入软件工程全生命周期，沉淀企业专属 CLAUDE.md 规范与多代理编排。',
 formula: '商业传导：协议标准制定权 + 代码库深度上下文沉淀 → 将单次 API 调用转化为高转换成本的“全天候数字员工”',
 kpis: [['89.3%', 'Fable 5.2 OSWorld 电脑操控得分'], ['70.6%', 'Sonnet 5.5 Terminal-Bench 4.0'], ['~$15B+', '2026夏 Claude Code 追踪年化率'], ['MCP标准', '全行业通用 Agent 上下文连接器']]
 },
 {
 badge: 'NODE 04 · CLOUD MARKETPLACE FRICTIONLESS GTM & DUAL BILLING',
 title: '44% 云市场免审批直通车 + 79% 按量/21% 订阅双引擎变现',
 desc: '借助 AWS Bedrock 与 Google Cloud Vertex AI 深度集成，全球大型企业可直接扣减既有云承诺额度采购 Claude，省去长达 6–12 个月的供应商准入谈判，支撑 Anthropic 仅凭约 5,300 名员工便撬动 $678亿年化营收；同时销售与渠道分成费率从 Q1 2026 的 22% 迅速下降至 Q3 2026 的 14%。',
 formula: '商业传导：云巨头渠道借力冷启动 + 直连平台沉淀高毛利留存 → 销售费率两季度骤降 800bps 至 14%',
 kpis: [['44%', '9M 2026 经云市场实现营收占比'], ['14%', 'Q3 2026 销售与渠道合作费率'], ['$12.8M', '按 Q3 年化测算人均创收额'], ['71% / 29%', '美国本土 vs 国际市场营收占比']]
 },
 {
 badge: 'NODE 05 · ~900% NRR COMPOUNDING & CASH FLOW INFLECTION',
 title: '~900% 净收入留存率与正向现金流拐点：预收 RPO 与规模效应释放',
 desc: '截至 2026 年 9 月底，Anthropic 拥有逾 11,900 家年付超 $10万企业客户（贡献 74% TTM 营收）及逾 1,900 家百万美元大客，剩余履约义务（RPO）达 $138亿（约 75% 在 12 个月内确认为收入）。9M 2026 经营现金流强势转正至 +$65.7亿，叠加 IPO 与同步私募募资 $1,073亿及账上原有 $1,318亿现金储备，构筑起逾 $2,300亿现金护城河。',
 formula: '商业传导：~900% NRR 存量裂变 + 85.5% 推理毛利摊薄研发 → Q3 Non-GAAP 调整后净利润达 +$31.7亿',
 kpis: [['~900%', '截至 2026.09 净收入留存率'], ['$13.8B', '已签约剩余履约义务 (RPO)'], ['+$6.57B', '9M 2026 经营活动现金净流入'], ['$131.8B', 'IPO 前账面现金及短期投资']]
 }
 ];
 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) {
 pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
 var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
 var bs = pTrack.querySelectorAll('.bm-node-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
 var nd = NODES[idx];
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = nd.title;
 document.getElementById('nodeDesc').textContent = nd.desc;
 document.getElementById('nodeFormula').textContent = nd.formula;
 document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
 return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 });
 }

 // 3. Tier Filter & Cohort Switcher & Peer Filter
 var tierFilter = document.getElementById('tierFilter');
 if (tierFilter) {
 tierFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]');
 if (!b) return;
 var cat = b.getAttribute('data-tcat');
 var bs = tierFilter.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var cards = document.querySelectorAll('#tierList [data-tier]');
 for (var j = 0; j < cards.length; j++) {
 cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
 }
 });
 }

 var COHORTS = {
 smb: {
 stats: [
 ['活跃用户与中小客群', '~4,000万 账户', '个人 Pro/Max/Ultra 及初创开发者'],
 ['贡献 TTM 营收比重', '26% (~$9.2B)', '零销售人力自助刷卡转化'],
 ['主力消费套餐阶梯', '$20 → $100 → $200/月', '2026 新增 Ultra 档位承接高频编码客'],
 ['生态战略角色', '自下而上渗透火种', '工程师个人自费试用后反向推动公司采购']
 ],
 note: '<strong>自下而上（PLG）研发渗透漏斗：</strong>约 4,000 万开发者与知识工作者通过 Free / Pro ($20) / Max ($100) / Ultra ($200) 养成每日在终端运行 Claude Code 的肌肉记忆，随后倒逼所在企业签署十万至百万美元级企业协议。'
 },
 ent: {
 stats: [
 ['活跃客户规模 (截至 2026.09)', '11,900+ 家', '占 TTM 总营收高达 74% ($26.1B)'],
 ['净收入留存率 (S-1 口径 NRR)', '~900%', '单客次年支出平均扩张约 9 倍'],
 ['户均年化贡献 (TTM ARPU)', '~$2.19M / 家', 'Claude Code + 生产环境 API 并发'],
 ['销售与渠道费率趋势', '22% → 14%', 'Q1\'26 至 Q3\'26 获客费率快速摊薄']
 ],
 note: '<strong>MCP 开放标准 + 系统提示词棘轮（Protocol Lock-In）：</strong>Anthropic 开源的 <strong>Model Context Protocol (MCP)</strong> 已成为企业连接内部数据库、GitHub、Slack 与 ERP 的事实通用总线；一旦企业围绕 Claude 100万上下文窗口与工具调用规范完成生产流水线校准，切换底层模型的重构成本极高。'
 },
 whale: {
 stats: [
 ['百万美元级巨鲸大客', '1,900+ 家', '涵盖全球头部科技、金融、制药与软件企业'],
 ['前五大客户营收占比', '~25% (9M 2026)', 'AI 原生 IDE、全球云软件巨头深度内嵌'],
 ['安全特许专享层', 'Mythos 5.2 / Glasswing', '50+ 顶级机构获批无阉割网安与生物能力'],
 ['签约合同锁定期 (RPO)', '$13.8B 履约储备', '多年期最低消费承诺保障底盘确定性']
 ],
 note: '<strong>战略巨鲸共创壁垒：</strong>对于年消耗数千万乃至上亿美元的超级客户，Anthropic 不仅提供定制吞吐预留（Provisioned Throughput）与零数据留存协议，更通过 Project Glasswing 开放顶级安全防御模型 Mythos，形成排他性技术同盟。'
 }
 };
 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) {
 cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]');
 if (!b) return;
 var key = b.getAttribute('data-cohort');
 var bs = cohortTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var c = COHORTS[key] || COHORTS.ent;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s) {
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val mono">' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = c.note;
 });
 }

 var peerFilter = document.getElementById('peerFilter');
 if (peerFilter) {
 peerFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pcat]');
 if (!b) return;
 var cat = b.getAttribute('data-pcat');
 var bs = peerFilter.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var rows = document.querySelectorAll('#peerTable tbody tr');
 for (var j = 0; j < rows.length; j++) {
 var rc = rows[j].getAttribute('data-row-cat') || '';
 rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 }
 });
 }

 // 4. High-DPI Retina Canvas Engine
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
 var pad = { top: 28, right: 20, bottom: 44, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: 'Q3总营收', val: 16.96, col: pal.blue, tip: 'Q3 2026 确认总营收: $16.96B (+1,127% YoY, +46.7% QoQ)' },
 { lbl: '推导毛利', val: 14.53, col: pal.green, tip: '扣除推理直接履约成本后推导毛利约 $14.53B (推导毛利率高达 85.7%)' },
 { lbl: '总算力支出', val: 9.86, col: pal.violet, tip: 'Q3 训练+推理总算力支出 $9.86B (占收 58.1%，含 $5.0B 高价短期突发扩容算力)' },
 { lbl: '调整后营利', val: 2.46, col: pal.green, tip: 'Q3 Non-GAAP 调整后营业利润 +$2.46B (利润率 15.0%，剔除 SBC 与 $2.0B 非现金配捐)' },
 { lbl: '调整后净利', val: 3.17, col: pal.amber, tip: 'Q3 Non-GAAP 调整后净利润 +$3.17B (叠加 $1.25B 账面现金利息收入)' },
 { lbl: '非现金重估', val: 21.94, col: pal.red, tip: '可转债与 SAFE 因估值暴涨产生的非现金账面重估亏损 -$21.94B（导致 GAAP 净亏 -$23.29B，零现金流出）' }
 ];
 var maxV = 25;
 for (var g = 0; g <= 5; g++) {
 var gv = g * 5;
 var gy = pad.top + ph - (g / 5) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length;
 var barW = Math.min(46, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var bh = Math.max(5, (s.val / maxV) * ph);
 var yTop = pad.top + ph - bh;
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6);
 ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 var prefix = (i === 5) ? '-$' : '$';
 ctx.fillText(prefix + s.val.toFixed(2) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var qs = ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var revs = [0.38, 0.79, 1.38, 2.04, 4.73, 11.56, 16.96];
 var compPct = [247, 176, 149, 145, 72, 48, 58];
 var maxR = 20;
 for (var m = 0; m <= 4; m++) {
 var mv = m * 5;
 var my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
 }
 var sW = pw / qs.length, bW = Math.min(34, sW * 0.52);
 qs.forEach(function (q, idx) {
 var bx = pad.left + idx * sW + (sW - bW) / 2;
 var bh = Math.max(4, (revs[idx] / maxR) * ph);
 var by = pad.top + ph - bh;
 ctx.fillStyle = idx >= 5 ? pal.green : pal.blue;
 roundRect(ctx, bx, by, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revs[idx].toFixed(2) + 'B', bx + bW / 2, by - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(q, bx + bW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({
 x: bx, y: pad.top, w: bW, h: ph,
 title: q + ' 营收与算力效率',
 body: '季度营收 $' + revs[idx].toFixed(2) + 'B · 总算力占营收比: ' + compPct[idx] + '%'
 });
 });
 // Overlay Compute % of Revenue Line (scaled 0-260%)
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.4; ctx.beginPath();
 compPct.forEach(function (cp, idx) {
 var px = pad.left + idx * sW + sW / 2;
 var py = pad.top + ph - (cp / 260) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 compPct.forEach(function (cp, idx) {
 var px = pad.left + idx * sW + sW / 2;
 var py = pad.top + ph - (cp / 260) * ph;
 ctx.fillStyle = pal.violet; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 if (idx === 0 || idx === 5 || idx === 6) {
 ctx.fillStyle = pal.violet; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('算力' + cp + '%', px, py - 9);
 }
 });
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 24, bottom: 42, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = ['签约基准 M0', '第6个月 M6', '第12个月 Y1 (~900%)', '第18个月 M18', '第24个月 Y2'];
 var antCurve = [1.0, 3.4, 9.0, 14.5, 21.0];
 var snowCurve = [1.0, 1.12, 1.27, 1.42, 1.58];
 var saasCurve = [1.0, 1.05, 1.12, 1.18, 1.25];
 var maxL = 24;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv.toFixed(0) + 'x', pad.left - 8, gy + 4);
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
 if (idx === 2 || idx === 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + 'x', px, py - 9);
 }
 hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '相对于首期签约消费额扩张倍数: ' + v.toFixed(2) + 'x' });
 });
 }
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 drawCurve(antCurve, pal.blue, 'Anthropic 企业客群 (~900% NRR)');
 drawCurve(snowCurve, pal.green, '顶级按量数据云标杆 (~127% NRR)');
 drawCurve(saasCurve, pal.amber, '传统席位制 SaaS (~112% NRR)');
 } else {
 var splits = [
 { name: '按量计费 vs 订阅', a: 79.0, b: 21.0, la: '79% 按量API', lb: '21% 订阅', colA: pal.blue, colB: pal.green, tip: '9M 2026: 按量计费 $26.3B (79%) vs 订阅制 $6.9B (21%)' },
 { name: '大客户 vs 长尾客', a: 74.0, b: 26.0, la: '74% >$100K大客', lb: '26% <$100K', colA: pal.violet, colB: pal.amber, tip: 'TTM 口径: 11,900+ 大客贡献 $26.1B (74%) vs ~4,000万中小客贡献 26%' },
 { name: '直连平台 vs 云市场', a: 56.0, b: 44.0, la: '56% 官方直连', lb: '44% AWS/GCP', colA: pal.blue, colB: pal.green, tip: '9M 2026: 官方直连 56% vs 云厂商市场 44%（较 6M 的 48% 进一步去中介化）' }
 ];
 var slot = pw / splits.length;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 25;
 var ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 splits.forEach(function (v, idx) {
 var cx = pad.left + idx * slot + slot / 2;
 var bw = 34;
 var ah = (v.a / 100) * ph, bh2 = (v.b / 100) * ph;
 ctx.fillStyle = v.colA;
 roundRect(ctx, cx - bw - 4, pad.top + ph - ah, bw, ah, 5); ctx.fill();
 ctx.fillStyle = v.colB;
 roundRect(ctx, cx + 4, pad.top + ph - bh2, bw, bh2, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.a + '%', cx - bw / 2 - 4, pad.top + ph - ah - 6);
 ctx.fillText(v.b + '%', cx + bw / 2 + 4, pad.top + ph - bh2 - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: v.name, body: v.tip });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 26, right: 44, bottom: 38, left: 108 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'commit') {
 var suppliers = [
 { name: 'Broadcom 算力租约', val: 161.2, col: pal.violet, tip: '2026 定制基础设施租赁协议约 $161.2B（不含利息，部分已转让至 SPV 融资实体）' },
 { name: 'Google Cloud TPU', val: 121.3, col: pal.blue, tip: '2026.04–2033.07 最低消费 $121.3B（另含 2028–2031 预估 $125B–$150B 额外 TPU 弹性）' },
 { name: 'SpaceXAI 集群', val: 120.5, col: pal.amber, tip: '截至 2029 年最高 $120.5B 算力合作（接入英伟达 GPU 超算集群）' },
 { name: 'Amazon AWS', val: 110.0, col: pal.green, tip: '2026.05–2036.04 十年期至少 $110.0B AWS Trainium 与云服务采购承诺' },
 { name: 'Microsoft 云协议', val: 44.9, col: pal.blue, tip: '2026.11–2033.06 至少 $44.9B 云与算力合作协议' },
 { name: 'Nscale + Lambda', val: 85.9, col: pal.violet, tip: 'Nscale 最高 $44.6B + Lambda 约 $41.3B 高性能 GPU 算力租赁' }
 ];
 var maxS = 180;
 var rowH = ph / suppliers.length;
 suppliers.forEach(function (sp, idx) {
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 18, bl = (sp.val / maxS) * pw;
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = sp.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(sp.name, pad.left - 8, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText('$' + sp.val.toFixed(1) + 'B', pad.left + bl + 6, cy + 4);
 hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 12, w: pw, h: 24, title: sp.name, body: sp.tip });
 });
 } else {
 var pad2 = { top: 28, right: 20, bottom: 40, left: 52 };
 var pw2 = w - pad2.left - pad2.right, ph2 = h - pad2.top - pad2.bottom;
 var qtrs = ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var roi = [0.40, 0.57, 0.67, 0.69, 1.40, 2.08, 1.72];
 var maxRoi = 2.4;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxRoi / 4) * g;
 var gy = pad2.top + ph2 - (g / 4) * ph2;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad2.left, gy); ctx.lineTo(pad2.left + pw2, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv.toFixed(1) + 'x', pad2.left - 8, gy + 4);
 }
 var slot = pw2 / qtrs.length, bw = Math.min(36, slot * 0.54);
 qtrs.forEach(function (q, i) {
 var x = pad2.left + i * slot + (slot - bw) / 2;
 var bh = (roi[i] / maxRoi) * ph2;
 var yTop = pad2.top + ph2 - bh;
 ctx.fillStyle = roi[i] >= 1.0 ? pal.green : pal.amber;
 roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(roi[i].toFixed(2) + 'x', x + bw / 2, yTop - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(q, x + bw / 2, pad2.top + ph2 + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yTop, w: bw, h: bh, title: q + ' 算力创收倍数', body: '每投入 $1 总算力（训练+推理）产出的当季营收 = $' + roi[i].toFixed(2) });
 });
 }
 }

 // 5. Interactive 3-Year Revenue, Compute Margin & Valuation Simulator
 var simData = { rev: [67.8, 98.3, 142.6, 206.7] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ["Q3'26年化", '2027E', '2028E', '2029E'];
 var arr = simData.rev;
 var maxE = Math.max(120, Math.ceil(Math.max.apply(null, arr) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 3) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 3) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 3) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + Math.round(v) + 'B', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gR = parseFloat(document.getElementById('inpRevCagr').value) / 100;
 var compPct = parseFloat(document.getElementById('inpCompPct').value);
 var evMult = parseFloat(document.getElementById('inpEvMult').value);
 document.getElementById('lblRevCagr').textContent = (gR * 100).toFixed(1) + '%';
 document.getElementById('lblCompPct').textContent = compPct.toFixed(1) + '%';
 document.getElementById('lblEvMult').textContent = evMult.toFixed(1) + 'x';

 var baseRev = 67.84; // Q3 2026 annualized ($16.96B * 4)
 var revArr = [baseRev];
 var cur = baseRev;
 for (var y = 1; y <= 3; y++) {
 cur *= (1 + gR);
 revArr.push(cur);
 }
 // Non-compute cash opex scales from ~27% in Q3'26 toward ~30% (cash staff + S&M + G&A)
 var adjOpMargin = Math.max(-10, 100 - compPct - 30.0);
 var estFcf = cur * Math.max(-0.15, (adjOpMargin - 3.0) / 100);
 // Net cash post-IPO ~$238B ($131.8B pre-IPO + ~$106B net IPO & concurrent placement)
 var impliedEquityT = ((cur * evMult) + 180) / 1000;

 document.getElementById('simRevOut').textContent = '$' + cur.toFixed(1) + 'B';
 document.getElementById('simOpOut').textContent = adjOpMargin.toFixed(1) + '%';
 document.getElementById('simFcfOut').textContent = (estFcf >= 0 ? '$' : '-$') + Math.abs(estFcf).toFixed(1) + 'B';
 document.getElementById('simMcapOut').textContent = '$' + impliedEquityT.toFixed(2) + 'T';
 simData.rev = revArr;
 drawSimMiniCanvas();
 }

 ['inpRevCagr', 'inpCompPct', 'inpEvMult'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { r: 20.0, c: 54, m: 7.0 },
 base: { r: 45.0, c: 42, m: 11.0 },
 bull: { r: 75.0, c: 35, m: 15.0 }
 };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpRevCagr').value = pr.r;
 document.getElementById('inpCompPct').value = pr.c;
 document.getElementById('inpEvMult').value = pr.m;
 runSimulator();
 });
 }

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
 tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
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

 // Quick Jump Search (⌘K)
 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '9M $33.24B 营收 · 85.5% 推导毛利 · ~900% NRR' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '三芯异构算力 → 四档模型 → MCP锁死 → 云市场 → 现金流' },
 { id: 'mod-profit-pool', t: 'M2 损益瀑布流与四层收费站', s: 'Q3 $16.96B 营收 · 调整后营利 $2.46B vs 非现金重估解析' },
 { id: 'mod-cohort', t: 'M3 900% NRR 棘轮与大客经济', s: '11,900+ 超十万美元企业大客贡献 74% 营收' },
 { id: 'mod-capital', t: 'M4 $895.4B 算力契约与复利推演', s: 'Broadcom/Google/AWS/SpaceXAI 布局与 2029E 估值模拟' },
 { id: 'mod-matrix', t: 'M5 六大巨头范式对标与 S-1 压测', s: 'ANT vs OpenAI / NVDA / PLTR / MSFT / GOOGL' }
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

 // Sidebar Toggle, Export, Print & Scroll Progress
 var sbBtn = document.getElementById('sidebarToggleBtn');
 var sb = document.getElementById('muiSidebar');
 var bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
 setTimeout(drawAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () {
 sb.classList.remove('open');
 bd.classList.remove('open');
 });
 }

 document.querySelectorAll('#muiSidebar .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () {
 sb.classList.remove('open');
 bd.classList.remove('open');
 });
 });

 document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var t = btn.getAttribute('data-portal-theme');
 applyTheme(t, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, t); } catch (e) {}
 });
 });

 var expBtn = document.getElementById('exportHtmlBtn');
 if (expBtn) {
 expBtn.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a');
 a.href = url;
 a.download = 'Anthropic_商业模式解构.html';
 a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
 showToast('已导出 HTML 文件');
 });
 }
 var prtBtn = document.getElementById('printPdfBtn');
 if (prtBtn) prtBtn.addEventListener('click', function () { window.print(); });

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
 var initT = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
 applyTheme(initT, true);
 var initL = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
 applyLang(initL, true);
 } catch (e) {}

 var themeBtn = document.getElementById('appbarThemeBtn');
 if (themeBtn) {
 themeBtn.addEventListener('click', function () {
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

 var resizeTimer = null;
 window.addEventListener('resize', function () {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(drawAllCharts, 90);
 });

 runSimulator();
 drawAllCharts();
 })();
 