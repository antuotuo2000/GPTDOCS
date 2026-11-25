
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', fView: 'cost', sView: 'cpn', mult: 26 };
 var hits = { futureCanvas: [], stackCanvas: [] };

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
 if (sl) sl.classList.toggle('active', state.theme === 'light');
 if (sd) sd.classList.toggle('active', state.theme === 'dark');
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至清晰浅色模式');
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

 // Suite Hub Filter & Notification
 var hub = document.getElementById('companySubfolderHub');
 if (hub) {
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
 var item = e.target.closest('[data-suite-doc]');
 if (item && !item.classList.contains('active')) {
 showToast('请在本次交付的四份网页附件中打开：《' + item.getAttribute('data-suite-doc') + '》');
 }
 });
 }

 // F0: 3-Horizon Radar Switcher
 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 基础设施闭环与法规红利期 (2026–2027)',
 title: 'Arc 2027 转向 PoS 机构质押 × Tazapay 并表 × GENIUS 联邦新规生效',
 items: [
 '<strong>Arc 主网 PoS 升级：</strong>100亿创世 ARC 代币于 2027 年启动机构验证者权益证明（PoS）与隐私合规模块。',
 '<strong>Tazapay 完成交割（2027E）：</strong>直接并入 $25B+ 亚太/拉美跨境 B2B 流水，与 CPN 现有 $41.3B 形成逾 $66B+ 结算底盘。',
 '<strong>OCC 信托银行与 GENIUS 实施：</strong>确立 USDC 在美国联邦法律下的非证券支付稳定币地位，激活传统商业银行大规模接入。'
 ],
 prob: '兑现确定性：极高 (85%–90%)',
 impact: '非利差其他收入锚：$310M–$550M/年'
 },
 {
 badge: 'HORIZON 2 · 企业 ERP 渗透与分润率拐点期 (2028–2029)',
 title: 'SAP 生态企业财资自动化 × CPN 破 $2,000亿 × 平台直存突破 28%',
 items: [
 '<strong>SAP 全球供应链结算：</strong>借 Tereina 原生集成，跨国企业供应商应付账款直接通过 USDC/EURC 7×24 秒级自动清分。',
 '<strong>渠道议价结构性反转：</strong>银行、PSP 与企业直存规模扩张，推动综合分润成本率由 ~60% 压降至 ~52% 以下。',
 '<strong>StableFX 链上即时外汇：</strong>打通 USDC、EURC 与新兴市场合规本币稳定币原子级 PvP（券款对付）零结算风险换汇。'
 ],
 prob: '兑现确定性：中高 (75%)',
 impact: '增量净留存 RLDC：+$1.2B–$1.8B/年'
 },
 {
 badge: 'HORIZON 3 · AI 智能体经济与链上资本市场奇点 (2030–2032)',
 title: '数十亿 AI Agent 自治微支付标准 × 主权国家全链经济体普及',
 items: [
 '<strong>机器间高频微支付（M2M）：</strong>AI 智能体通过 Circle Agent Stack 与可编程钱包按毫秒调用算力、数据与电商服务并即时结算。',
 '<strong>链上资本市场统一抵押品：</strong>USYC 代币化国债与 USDC 在 Arc 链上承载万亿美元级回购、衍生品与 RWA 实时清算。',
 '<strong>主权级数字底座：</strong>继百慕大打造全球首个全链上国家经济体后，更多中小主权国家直接采用 Circle 合规金融栈。'
 ],
 prob: '兑现确定性：远期高赔率期权 (55%–65%)',
 impact: '远期增量 RLDC 空间：+$2.5B+/年'
 }
 ];
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 hzTabs.querySelectorAll('.ft-hz-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
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
 badge: 'ENGINE 01 · ARC LAYER-1 BLOCKCHAIN ("ECONOMIC OS FOR THE INTERNET")',
 title: 'Arc 公链主网：专为机构级合规、0.5秒确定性结算与稳定币原生 Gas 打造',
 desc: '早期通用公链往往面临 Gas 费以高波动代币计价、缺乏机构隐私保护与区块重组不确定性三大痛点。Circle 于 2026 年 9 月 16 日正式发布 Arc 公共主网（测试网累计超 1.66 亿笔交易、日均 230 万笔、近 100% 在线率），由全球核心金融机构担任创始验证者节点，直接使用 USDC 支付稳定可预测的手续费，并在 Q3 创下 $1.818 亿 ARC 代币预售收入确认（总预售协议约 $2.422 亿）。',
 formula: '商业空间：将原本流向外部 L1/L2 的结算价值沉淀至自有主网 + 2027 PoS 质押治理 + 企业级隐私结算专区订阅',
 gauges: [['0.5 秒', '确定性交易终局确认时延'], ['100+ 家', '主网首日机构与生态建设者'], ['1,200+ 个', 'Arc 开发者已构建项目数'], ['100亿 枚', 'ARC 创世供应量 (2027 PoS)']]
 },
 {
 badge: 'ENGINE 02 · CIRCLE PAYMENTS NETWORK (CPN) & TAZAPAY ACQUISITION',
 title: 'CPN + Tazapay：用合规稳定币走廊重构全球 $190万亿 跨境 B2B 清算网',
 desc: '2025 年 5 月推出的 CPN 不直接持有沉淀对手方风险，而是作为合规编排与实时清算网络，连接全球发起行、收单 PSP 与本地法币出金通道。截至 Q3 2026，CPN 入驻金融机构达 205 家（另有数百家中大型机构在审），年化结算量飙升超 15 倍至 $413 亿；叠加拟 $4 亿全股票收购的新加坡 Tazapay（年化 $250 亿+ 流水、60+ 银行伙伴、覆盖 100+ 市场且 60% 已含稳定币），直接补齐亚太与拉美最后一公里牌照与收付轨道。',
 formula: '变现公式：跨境 B2B 结算总额 (TPV) × ~15–25bps 综合网络与编排费率（100% 免疫美联储降息周期）',
 gauges: [['$41.3B', 'Q3\'26 CPN 年化结算额 (>15x)'], ['205 家', '已入驻全球银行与支付机构'], ['$25B+ TPV', 'Tazapay 带来增量跨境流水'], ['100+ 市场', '合并后全球本地法币出入金覆盖']]
 },
 {
 badge: 'ENGINE 03 · AGENTIC ECONOMY STACK & SAP CLOUD ERP INTEGRATION',
 title: 'AI 代理支付底座：当数十亿智能体自动采购与结算，USDC 是唯一原生货币',
 desc: '首席产品技术官 Nikhil Chandhok 主导构建了 Circle Agent Stack、MPC 可编程钱包（Programmable Wallets）与免学新语言的智能合约模板库（Circle Contracts）。2026 年 10 月，SAP 支持的企业金融平台 Tereina 宣布与 Circle 深度合作，将代理式稳定币支付（Agentic Payments）直接嵌入承载全球 84% 商业流水的 SAP Cloud ERP 企业工作流中。',
 formula: '变现公式：企业级可编程钱包 API 调用/托管订阅费 + 企业内部及供应链即时结算沉淀的高毛利平台直存 USDC',
 gauges: [['84% 商业额', 'SAP 全球企业生态渗透切口'], ['MPC 钱包', '免助记词企业级权限分片托管'], ['7×24 自动', 'AI 智能体毫秒级可编程合约清算'], ['Intuit 合作', '覆盖中小型企业财税与薪资分发']]
 },
 {
 badge: 'ENGINE 04 · CCTP, CIRCLE GATEWAY & XRESERVE INTEROPERABILITY',
 title: '全链流动性大一统：终结第三方跨链桥割裂与黑客被盗顽疾',
 desc: '传统锁定封装式（Lock-and-Mint）跨链桥不仅割裂流动性，更是加密史上数十亿美元黑客攻击的重灾区。Circle 通过三大基建彻底统一多链体验：① 原生销毁铸造协议 CCTP（已占全行业跨链桥交易量约 47%–50%）；② Circle Gateway 实现无需预先跨链或垫资的亚秒级统一 USDC 余额调用；③ 2025 年 11 月推出订阅制 xReserve，允许新兴公链发行与 USDC 1:1 互通的原生生态稳定币。',
 formula: '变现公式：CCTP 极速跨链费 + xReserve 公链团队年度许可订阅费 + 巩固 USDC 79% 链上交易量垄断地位',
 gauges: [['~47–50%', 'CCTP 占全市场跨链桥交易份额'], ['30+ 公链', '原生 USDC 发行网络覆盖'], ['<1 秒', 'Circle Gateway 跨链统一余额调用'], ['订阅收费', 'xReserve 面向新兴公链商业模式']]
 },
 {
 badge: 'ENGINE 05 · USYC TOKENIZED TREASURY & EURC MULTI-CURRENCY SUITE',
 title: 'USYC + EURC：用“生息链上美债 + 合规数字欧元”卡位机构全天候财资',
 desc: '针对量化机构、衍生品交易所（及 Polymarket 等预测市场）对链上生息合格抵押品的迫切需求，Circle 收购 Hashnote 并重磅升级 USYC 代币化货币市场基金（2025 年末达 $15 亿，单季环比暴增 +111%），支持与 USDC 近乎即时互转；同时受益于欧盟 MiCA 落地排挤不合规竞品，EURC 欧元稳定币年末流通量同比暴涨 +284% 至 €3.1 亿以上。',
 formula: '变现公式：USYC 资产管理费（无外部交易所 50% 分成盘剥）+ 欧元区储备收益与 StableFX 链上外汇点差',
 gauges: [['$1.5B+', 'USYC 代币化货币市场基金规模'], ['+111% QoQ', 'USYC 重启后单季环比爆发增速'], ['+284% YoY', 'EURC 欧元稳定币同比高增长'], ['T+0 互转', '无息支付币与生息抵押品无缝切换']]
 },
 {
 badge: 'ENGINE 06 · SOVEREIGN ONCHAIN ECONOMIES & GLOBAL CONSUMER RAILS',
 title: '全球超级应用与主权上链：Visa 180国商业化、三星钱包与百慕大国家工程',
 desc: '2026 年 Circle 的主流金融渗透全面跨越试点阶段：Visa 将 Visa Direct 稳定币预注资正式推向商业化部署（支持 180+ 国家近实时跨境下发）；Samsung Wallet 为美国 Galaxy 手机用户开通 USDC 跨境直汇 60+ 国本地银行账户；百慕大政府更宣布在 Circle 数字资产基建支持下建设全球首个“全链上国家经济体（Fully Onchain National Economy）”。',
 formula: '战略复利：超级入口带来低成本增量流通盘，支撑管理层重申“多周期年化 40% USDC 流通量复合增长”指引',
 gauges: [['180+ 国家', 'Visa Direct 商业化稳定币清算覆盖'], ['60+ 国家', 'Samsung Wallet 手机跨境直汇'], ['40% CAGR', '官方多周期 USDC 流通量增长指引'], ['首个主权国', '百慕大全链上国家经济体标杆']]
 }
 ];
 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 rail.querySelectorAll('.ft-rail-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
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
 var pad = { top: 28, right: 20, bottom: 42, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'cost') {
 var rails = [
 { name: '传统跨境汇款均值', bps: 620, col: pal.red, tip: '世界银行统计全球零售/中小微跨境汇款平均综合成本逾 6% (600bps+)，耗时 T+2 至 T+5' },
 { name: '商业银行代理行电汇', bps: 240, col: pal.amber, tip: 'SWIFT 多级代理行中转手续费 + 隐性外汇点差 + 预注资资金占用约 180–300bps' },
 { name: '传统跨境卡组织收单', bps: 195, col: pal.violet, tip: '跨境刷卡交换费 + 货币转换费合计约 150–250bps' },
 { name: '金融科技闭环专线', bps: 65, col: pal.blue, tip: 'Wise 等点对点资金池对冲模式，费率约 45–85bps' },
 { name: 'Circle CPN + Arc', bps: 20, col: pal.green, tip: '链上 7×24 实时原子结算，综合网络编排费率仅约 ~20bps（节省 85%–95% 摩擦成本）' }
 ];
 var maxBps = 680;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxBps / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + 'bp', pad.left - 8, gy + 4);
 }
 var slot = pw / rails.length, bw = Math.min(44, slot * 0.56);
 rails.forEach(function (r, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (r.bps / maxBps) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = r.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(r.bps + 'bp', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '10.5px sans-serif';
 ctx.fillText(r.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: r.name, body: r.tip });
 });
 } else {
 var steps = [
 { lbl: 'FY25基准RLDC', v: 1.08, b: 0, col: pal.blue, tip: 'FY2025 实际扣除分润后净收入 RLDC: $1,083M ($1.08B)' },
 { lbl: '+USDC规模扩张', v: 2.15, b: 1.08, col: pal.green, tip: 'USDC 流通盘复合增长带来的增量净储备留存收益 +$2.15B' },
 { lbl: '+直存提留存率', v: 0.72, b: 3.23, col: pal.violet, tip: '平台直存与银行多元渠道将净储备留存率推升带来的利润释放 +$0.72B' },
 { lbl: '+CPN/Tazapay', v: 0.68, b: 3.95, col: pal.amber, tip: 'CPN 与 Tazapay 跨境 B2B 清算网络贡献零分润手续费 +$0.68B' },
 { lbl: '+Arc/AI/USYC', v: 0.64, b: 4.63, col: pal.green, tip: 'Arc 公链生态、CCTP/xReserve 跨链订阅、USYC 资管与 AI 代理钱包 +$0.64B' },
 { lbl: '2032E蓝图', v: 5.27, b: 0, col: pal.blue, tip: '2032E 远期 RLDC 净收入蓝图: ~$5.27B（非利差与直存高毛利占比超 60%）' }
 ];
 var maxV = 5.8;
 for (var k = 0; k <= 4; k++) {
 var kv = ((maxV / 4) * k).toFixed(1), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxV) * ph;
 var yb = pad.top + ph - (s.b / maxV) * ph;
 var bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(2) + 'B', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
 ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawStackCanvas() {
 var env = prepCanvas('stackCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.stackCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.sView === 'cpn') {
 var pts = [
 { lbl: "26.02 披露", v: 5.7, col: pal.blue, tip: '2026年2月（上线9个月）：55家金融机构入驻，年化 TPV $5.7B' },
 { lbl: "Q3'26 实际", v: 41.3, col: pal.green, tip: 'Q3 2026 实际：205家金融机构入驻，年化 TPV 飙升逾 15 倍至 $41.3B' },
 { lbl: '2027E(含并购)', v: 95.0, col: pal.violet, tip: '预计 2027 年完成并购 Tazapay ($25B+ TPV) 叠加内生增长达 ~$95B' },
 { lbl: '2028E', v: 145.0, col: pal.blue, tip: 'SAP ERP 与拉美/亚太企业走廊规模化放量预计达 ~$145B' },
 { lbl: '2030E', v: 250.0, col: pal.green, tip: '2030E 冲击 $250B+ 机构跨境 B2B 结算规模' }
 ];
 var maxT = 280;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxT / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / pts.length, bw = Math.min(44, slot * 0.54);
 pts.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (p.v / maxT) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.v.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(p.lbl, x + bw / 2, pad.top + ph + 20);
 hits.stackCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.lbl + ' CPN 年化结算规模', body: p.tip });
 });
 } else {
 var yrs = ['FY24', 'FY25', 'FY26E指引', '2028E', '2030E'];
 var rldcArr = [39.3, 39.4, 42.7, 48.5, 54.0];
 var platShare = [8.5, 11.1, 18.5, 25.0, 32.0];
 var minP = 0, maxP = 65;
 for (var m = 0; m <= 4; m++) {
 var mv = Math.round((maxP / 4) * m), my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv + '%', pad.left - 8, my + 4);
 }
 function plotM(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - ((v - minP) / (maxP - minP)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - ((v - minP) / (maxP - minP)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 8);
 hits.stackCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: label + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotM(rldcArr, pal.green, '综合 RLDC 净留存利润率');
 plotM(platShare, pal.violet, '平台直存 USDC 日均权重');
 }
 }

 // F4: Interactive 2030 Optionality Builder + Mini Canvas
 var OPT_DATA = {
 cpn: { rldc: 0.45, eb: 0.36, nonRate: 0.45 },
 custody: { rldc: 0.62, eb: 0.56, nonRate: 0.0 },
 arc: { rldc: 0.34, eb: 0.28, nonRate: 0.34 },
 tmmf: { rldc: 0.26, eb: 0.20, nonRate: 0.26 },
 agent: { rldc: 0.58, eb: 0.49, nonRate: 0.58 }
 };
 var miniVals = [12.7, 40.3, 75.0];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['当前市值参考', '2030纯储备盘', '2030含勾选期权'];
 var maxV = Math.max(40, Math.ceil(Math.max.apply(null, miniVals) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniVals.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }

 function recalcOptionality() {
 // Baseline organic 2030E core reserve business (~$250B USDC * 3.1% yield * 38% net reserve = $2.95B RLDC - $0.50B base other/opex -> $2.45B RLDC, $1.38B EBITDA)
 var baseRldc = 2.45, baseEb = 1.38, baseNonRate = 0.26, netCash30 = 4.2;
 var addRldc = 0, addEb = 0, addNonRate = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRldc += d.rldc; addEb += d.eb; addNonRate += d.nonRate; }
 }
 });
 var totRldc = baseRldc + addRldc;
 var totEb = baseEb + addEb;
 var nonRatePct = ((baseNonRate + addNonRate) / totRldc) * 100;
 var baseMcap = baseEb * state.mult + netCash30;
 var totMcap = totEb * state.mult + netCash30;

 document.getElementById('optRldcOut').textContent = '$' + totRldc.toFixed(2) + 'B';
 document.getElementById('optEbOut').textContent = '$' + totEb.toFixed(2) + 'B';
 document.getElementById('optNonRateOut').textContent = nonRatePct.toFixed(1) + '%';
 document.getElementById('optValOut').textContent = '$' + totMcap.toFixed(1) + 'B';

 miniVals = [12.7, baseMcap, totMcap];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 chk.addEventListener('change', recalcOptionality);
 });
 var multTabs = document.getElementById('multTabs');
 if (multTabs) {
 multTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-mult]');
 if (!b) return;
 state.mult = parseInt(b.getAttribute('data-mult'), 10) || 26;
 multTabs.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
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
 g.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawStackCanvas);

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
 tip.style.left = Math.min(window.innerWidth - 300, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['futureCanvas', 'stackCanvas'].forEach(bindTip);

 function drawAll() {
 drawFutureCanvas();
 drawStackCanvas();
 drawOptMiniCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS = [
 { id: 'sec-f0', t: 'F0 全栈金融平台宣言与三阶时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Arc L1主网 · CPN+Tazapay · AI Agent栈 · CCTP/Gateway · USYC/EURC' },
 { id: 'sec-f2', t: 'F2 跨境清算费率降维与 2032E 收入桥', s: '20bps 链上秒结对比 240bps 电汇 · 迈向 $5.27B RLDC 阶梯' },
 { id: 'sec-f3', t: 'F3 四层垂直整合栈与利润率爬坡', s: 'CPN 冲击 $250B+ TPV · 常态化 RLDC 利润率向 54% 跃升' },
 { id: 'sec-f4', t: 'F4 2030 全栈平台估值期权组装器', s: '自由开关五大新业务期权与 EV/EBITDA 倍数测算目标市值' }
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
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var t = btn.getAttribute('data-portal-theme');
 applyTheme(t, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, t); } catch (err) {}
 });
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
 