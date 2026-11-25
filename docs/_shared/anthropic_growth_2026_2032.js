
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'pen', pe: 12 };
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
 text: dark ? '#F3F6F9' : '#0F172A',
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
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
 if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
 drawAll();
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
 drawAll();
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
 showToast('Anthropic 深度研究四件套 · 第 02 篇：未来十年战略图谱');
 });
 });

 // F0: 3-Horizon Radar Switcher
 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 高确定性业绩兑现期 (2026–2027)',
 title: 'Claude Code 企业全席位渗透 × Claude Security × 长协算力并网',
 items: [
 '<strong>软件工程全面代理化：</strong>Claude Code 与 Opus/Sonnet 5.5 从新锐科技公司向全球传统银行、制造与电信 IT 部门全面铺开。',
 '<strong>Claude Security 与 Glasswing 扩围：</strong>面向经核验企业开放 Mythos 5.2 自动化漏洞挖掘与补丁防御订阅。',
 '<strong>算力成本结构修复：</strong>Google TPU 与 AWS 多年期锁价集群分批交付，替换 Q3 昂贵的 $5.0B 短期突发算力。'
 ],
 prob: '兑现确定性：极高 (90%+)',
 impact: '目标年化营收带：$110B–$160B'
 },
 {
 badge: 'HORIZON 2 · 数字员工全面接管期 (2028–2029)',
 title: '跨软件虚拟同事 (Virtual Collaborators) × MCP 企业应用生态 × 定制硅片红利',
 items: [
 '<strong>白领长程自主同事：</strong>依托 Computer Use 与 Cowork，Claude 作为虚拟员工独立跨 ERP、CRM、电子表格执行多日项目闭环。',
 '<strong>Google 2028–2031 新一代 TPU 集群投产：</strong>额外 $1,250亿–$1,500亿高能效 TPU 算力与 Broadcom 定制基础设施全面拉升营业利润率。',
 '<strong>MCP 企业连接器生态网络效应：</strong>全球数万种企业软件原生内置 MCP Server，确立企业 Agent 事实路由标准。'
 ],
 prob: '兑现确定性：中高 (75%)',
 impact: '目标年化营收带：$200B–$280B'
 },
 {
 badge: 'HORIZON 3 · “压缩的21世纪”科学奇点期 (2030–2032)',
 title: '受控 AI 科研加速 × 靶点药物发现临床突破 × 物理世界具身大脑',
 items: [
 '<strong>生命科学与新材料发现分成：</strong>Mythos 生命科学特许计划深入临床前分子设计、基因编辑模拟与电池材料研发，切入里程碑专利分润。',
 '<strong>受人类监督的前沿研发加速：</strong>在 RSP 人类审批红线护航下，由 Claude 辅助设计下一代算法与芯片架构，压缩十年科研周期。',
 '<strong>通用机器人认知控制层：</strong>多模态空间推理与低延迟 Haiku/Sonnet 模型赋能工业与服务机器人决策中枢。'
 ],
 prob: '兑现确定性：远期高赔率期权 (50%–60%)',
 impact: '远期年化营收空间：$380B–$550B+'
 }
 ];
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 var bs = hzTabs.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var hz = HORIZONS[idx];
 document.getElementById('hzBadge').textContent = hz.badge;
 document.getElementById('hzTitle').textContent = hz.title;
 document.getElementById('hzList').innerHTML = hz.items.map(function (t) {
 return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
 }).join('');
 document.getElementById('hzProb').textContent = hz.prob;
 document.getElementById('hzImpact').textContent = hz.impact;
 });
 }

 // F1: 6-Engine Vertical Master-Detail Explorer
 var ENGINES = [
 {
 badge: 'ENGINE 01 · AUTONOMOUS SOFTWARE ENGINEERING & LEGACY MIGRATION',
 title: 'Claude Code × Opus 5.5 / Fable 5.2：接管全球 3,000 万开发者与万亿级遗留代码重构',
 desc: '软件工程是全球第一个被大模型彻底重构的万亿美元劳动力市场。Anthropic 凭借 Sonnet 5.5（Terminal-Bench 4.0 高达 70.6%）、Opus 5.5 与 Fable 5.2（100万上下文窗口 + 12.8万输出上限），让 Claude Code 不再只是“单行代码补全插件”，而是能连续自主运行数小时、跨数百个微服务文件完成架构迁移（如 COBOL/老旧 Java 升级）、自动化测试与 CI/CD 部署的全栈数字工程师。',
 formula: '变现双轮：(1) 企业研发团队 $100–$200/月 高端席位普及 + (2) 后台 24 小时自动化 CI/CD 与代码审查代理海量 Token 消耗',
 gauges: [['70.6%', 'Sonnet 5.5 Terminal-Bench 4.0'], ['1M / 128K', '全系上下文输入与超长输出窗口'], ['~$15B+', '2026夏 Claude Code 追踪 ARR'], ['30小时+', '长程复杂工程任务持续专注力']]
 },
 {
 badge: 'ENGINE 02 · COWORK & ENTERPRISE VIRTUAL COLLABORATORS',
 title: '从“对话框工具”进化为“虚拟同事（Virtual Collaborators）”：切入白领人力预算池',
 desc: '传统 IT 软件预算仅占全球 GDP 约 1%–2%，而金融投研、法律尽调、财务审计、供应链跟单与客户支持等白领薪酬支出高达数十万亿美元。由 Anthropic Labs（Mike Krieger 与 Ben Mann 领衔）孵化的 Cowork 工作台与多代理编排架构，让主代理（Fable/Opus）拆解目标并调度数十个廉价 Haiku 5.5 子代理（仅 $0.10/$0.50）并行完成复杂项目交付。',
 formula: '变现传导：不再争夺企业有限的 SaaS 许可费，而是直接按交付成果替代高昂的外部咨询与 BPO 人力外包开支',
 gauges: [['1846 Elo', 'Opus 5.5 GDPval 知识工作评测'], ['$200 / 月', '2026 新推 Claude Ultra 个人旗舰档'], ['主从子代理', 'Opus 统筹 + Haiku 5.5 极速并发'], ['~900% NRR', '企业部门间横向裂变扩张引擎']]
 },
 {
 badge: 'ENGINE 03 · CLAUDE SECURITY & PROJECT GLASSWING',
 title: '网络安全攻防不对称革命：以 Mythos 5.2 构筑国家级关键基础设施护盾',
 desc: '2026 年 4 月，Anthropic 发现前沿模型 Mythos 具备自动挖掘并利用复杂零日漏洞的惊人能力，遂果断拒绝公开裸卖，转而联合微软、英伟达等 50+ 核心机构发起 Project Glasswing，并在 S-1/A 中正式推出商业化新产品线 Claude Security——让经资质核验的防守方在黑客之前完成全代码库自动渗透测试与热补丁加固。',
 formula: '变现逻辑：极高安全准入门槛 + 零日漏洞防御刚需 → 高毛利企业安全年框订阅（切入 $2,500亿+ 全球网安市场）',
 gauges: [['50+ 顶级机构', 'Project Glasswing 首发防御联盟'], ['双轨同权重', 'Fable 大众安全 vs Mythos 核验专享'], ['自动分类回退', '大众端高危请求无缝切换安全模型'], ['Claude Security', 'S-1/A 新增独立企业安全产品线']]
 },
 {
 badge: 'ENGINE 04 · COMPUTER USE & MODEL CONTEXT PROTOCOL (MCP)',
 title: '后 API 时代的通用操作系统层：看得懂屏幕、点得动鼠标、连得通万物的 Agent 总线',
 desc: '现实企业中仍有大量老旧内网系统没有现代 API。Claude Fable 5.2 在 OSWorld 2.1 真实电脑桌面操控基准上拿下 89.3% 的统治级高分（像素级高分辨率视觉识别达 2,576px），叠加全行业广泛采纳的 MCP 开放连接器标准，使 Claude 能够像真人员工一样同时操作浏览器、终端与无 API 传统行业软件。',
 formula: '战略卡位：成为横跨 Windows / macOS / 云端沙盒的“元操作层（Meta-OS）”，全面升级并替代僵化的传统 RPA 脚本',
 gauges: [['89.3%', 'Fable 5.2 OSWorld 2.1 电脑操控分'], ['2,576 px', '高分辨 UI 界面像素级精准识别'], ['MCP 开放标准', '连接 IDE / 数据库 / SaaS 事实协议'], ['61.4%→89.3%', '一年内桌面自主操控成功率跃升']]
 },
 {
 badge: 'ENGINE 05 · MULTI-SILICON ROUTING & LONG-TERM COMPUTE COST CURVE',
 title: '算力经济学拐点：以 $895.4B 多云异构长协消除短期溢价，释放稳态 30%+ 营业利润率',
 desc: 'Q3 2026 Anthropic 因需求暴增被迫采购 $5.0B 高价短期算力，拖累当季算力占收比升至 58%。随着 2026–2030 年间 Google TPU ($121.3B + 远期 $150B)、Broadcom 定制租赁 ($161.2B) 与 AWS Trainium ($110.0B) 锁价集群规模并网，叠加提示词缓存（低至 $0.01–$0.20）与编译器优化，单位推理成本将持续陡峭下行。',
 formula: '利润率释放路径：总算力占收比由 58% 稳步向 35%–40% 收敛 → Non-GAAP 营业利润率由 15% 迈向 30%–35% 成熟软件区间',
 gauges: [['85.7%', 'Q3 2026 纯推理推导毛利率'], ['-75% 缓存价', 'Fable/Sonnet 提示词缓存大幅降本'], ['3大定制架构', 'TPU + Trainium + Broadcom 协同'], ['$213.8B 弹性', '远期算力合同内含可终止安全垫']]
 },
 {
 badge: 'ENGINE 06 · "MACHINES OF LOVING GRACE" — LIFE SCIENCES & ROBOTICS',
 title: 'Dario 十年终极愿景：把 21 世纪百年的生物医学与科学进步压缩进 5–10 年',
 desc: '正如 CEO Dario Amodei 在《仁爱的机器（Machines of Loving Grace）》与 S-1 愿景中所阐述，Anthropic 已启动生命科学核验计划（Life Sciences Verification Program），向顶尖制药实验室与科研院所开放 Mythos 5.2 级推理能力，攻关蛋白质设计、临床试验方案优化、神经科学可解释性与具身智能决策。',
 formula: '远期商业想象力：从“按 Token 卖算力”跃升为“新药靶点联合研发里程碑 + 科学发现知识产权共享”',
 gauges: [['Life Sciences', '官方独立高阶科研核验通道'], ['67.7%', 'Humanity\'s Last Exam 顶级科学推理'], ['机械可解释性', '反哺脑科学与复杂生物网络解析'], ['2030–2032+', '科学突破商业分润奇点窗口']]
 }
 ];
 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 var bs = rail.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var eg = ENGINES[idx];
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').textContent = eg.title;
 document.getElementById('engDesc').textContent = eg.desc;
 document.getElementById('engFormula').textContent = eg.formula;
 document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
 return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
 }).join('');
 });
 }

 // High-DPI Retina Canvas Engine
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
 { name: 'Meta', cap: 27.5, col: pal.red, tip: '自建超大规模 GPU 训练集群，固定资产 CapEx 占营收约 ~27%+' },
 { name: 'Microsoft', cap: 24.8, col: pal.blue, tip: '全球 Azure AI 数据中心重资产建设，CapEx 占营收约 ~25%' },
 { name: 'Oracle', cap: 22.0, col: pal.amber, tip: 'OCI 云基建重资本扩张（净负债 -$88.3B）' },
 { name: 'Alphabet', cap: 17.2, col: pal.violet, tip: '自研 TPU 与全球光纤数据中心重资产投入' },
 { name: 'Anthropic (ANT)', cap: 2.8, col: pal.green, tip: '9M 2026 自持物业设备 CapEx 仅 $0.93B（占收 2.8%），通过可调节多年期云与定制租赁轻装快跑' }
 ];
 var maxC = 32;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(p.cap.toFixed(1) + '%', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '10.5px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' 固定资产 CapEx/营收', body: p.tip });
 });
 } else {
 var steps = [
 { lbl: "Q3'26年化", v: 67.8, b: 0, col: pal.blue, tip: 'Q3 2026 实际年化营收基数: $67.8B ($16.96B × 4)' },
 { lbl: '+Code全渗透', v: 78.0, b: 67.8, col: pal.green, tip: 'Claude Code 渗透全球企业研发与遗留代码重构 +$78B' },
 { lbl: '+虚拟同事层', v: 96.0, b: 145.8, col: pal.violet, tip: 'Cowork 与 Computer Use 白领知识工作流自动化 +$96B' },
 { lbl: '+网安与政企', v: 42.0, b: 241.8, col: pal.amber, tip: 'Claude Security 与 Glasswing 特许安全订阅 +$42B' },
 { lbl: '+生命科学AI', v: 56.2, b: 283.8, col: pal.green, tip: '制药研发、机器人认知与全球新兴市场 API +$56.2B' },
 { lbl: '2032E蓝图', v: 340.0, b: 0, col: pal.blue, tip: '2032E 远期年化营收蓝图: ~$340B（企业数字劳动力基础设施龙头）' }
 ];
 var maxB = 380;
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
 var yrs = ['2024', '2025', '2026 (S-1)', '2027E', '2028E', '2030E'];

 if (state.sView === 'pen') {
 var asicShare = [28, 42, 54, 65, 74, 82];
 var ltContract = [35, 52, 67, 84, 92, 96];
 for (var g = 0; g <= 4; g++) {
 var gv = g * 25, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 function plotP(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 2 || idx === 5) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v + '%', px, py - 8);
 }
 hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '算力结构占比预计达 ' + v + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / 5) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotP(ltContract, pal.green, '多年期低价长协算力覆盖率');
 plotP(asicShare, pal.blue, 'TPU/Trainium/Broadcom 定制算力占比');
 } else {
 var mNames = ['Opus 4 (25.05)', 'Opus 4.5 (25.11)', 'Opus 5 (26.07)', 'Opus 5.5 (26.09)', '2028E 旗舰', '2030E 旗舰'];
 var prices = [75.0, 25.0, 25.0, 20.0, 10.0, 4.5];
 var maxP = 85;
 for (var m = 0; m <= 4; m++) {
 var mv = m * 20, my = pad.top + ph - (mv / maxP) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv, pad.left - 8, my + 4);
 }
 var slot = pw / mNames.length, bw = Math.min(40, slot * 0.54);
 mNames.forEach(function (nm, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (prices[i] / maxP) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i <= 3 ? pal.blue : pal.green;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + prices[i].toFixed(prices[i] < 10 ? 1 : 0), x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(nm, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: nm + ' 输出定价', body: '每百万输出 Token 官方 API 价格: $' + prices[i] + '（前四项为已发布真实价格）' });
 });
 }
 }

 // F4: Interactive 2030 Optionality Builder + Mini Canvas
 var OPT_DATA = {
 code: { rev: 55, op: 17.6 },
 cowork: { rev: 68, op: 20.4 },
 cyber: { rev: 26, op: 10.4 },
 asic: { rev: 0, op: 16.0 },
 bio: { rev: 48, op: 20.2 }
 };
 var miniCaps = [1.50, 1.82, 3.61];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['IPO发行估值', '2030基础盘', '2030含期权'];
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
 // Organic 2030E baseline from $67.8B Q3'26 run-rate (~18% organic core API growth -> $135B rev, $34.2B adj op profit, ~18.2B diluted shares by 2030)
 var baseRev = 135.0, baseOp = 34.2, fdShares2030 = 18.2;
 var netCashT = 0.20; // ~$200B net cash buffer
 var addRev = 0, addOp = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addOp += d.op; }
 }
 });
 var totRev = baseRev + addRev;
 var totOp = baseOp + addOp + (addRev === 0 && OPT_DATA.asic ? 0 : 0);
 // If ASIC cost savings checked, add extra margin boost on incremental rev
 var mcapT = ((totRev * state.pe) / 1000) + netCashT + (document.querySelector('[data-opt="asic"]').checked ? 0.19 : 0);
 var baseMcapT = ((baseRev * state.pe) / 1000) + netCashT;
 var sharePrice = (mcapT * 1000) / fdShares2030;

 document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totOp.toFixed(1) + 'B';
 document.getElementById('optPriceOut').textContent = '$' + sharePrice.toFixed(1);
 document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

 miniCaps = [1.50, baseMcapT, mcapT];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 chk.addEventListener('change', recalcOptionality);
 });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 12;
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
 { id: 'sec-f0', t: 'F0 后IPO新纪元与三阶战略时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Claude Code · Cowork虚拟同事 · Glasswing网安 · Computer Use · 三芯异构' },
 { id: 'sec-f2', t: 'F2 2.8% 轻固定资产纪律与 2032 营收桥', s: '对比云巨头 17%–28% CapEx · 迈向 $340B 营收阶梯' },
 { id: 'sec-f3', t: 'F3 四大异构算力支柱与 Token 降本曲线', s: 'TPU + Broadcom + Trainium + GPU · Opus输出价下降 73%' },
 { id: 'sec-f4', t: 'F4 2030 冲击 $4万亿市值期权组装器', s: '自由开关五大新业务期权与 EV/Sales 倍数实时测算股价' }
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

 // Sidebar Toggle, Export & Print
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
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
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 document.querySelectorAll('#muiSidebar .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
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
 a.download = 'Anthropic_未来十年战略图谱.html';
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
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

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
 recalcOptionality();
 drawAll();
 })();
 