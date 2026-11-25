
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'tsla_bm_stress_v1';

 var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'ltv', kView: 'cash' };
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
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深空暗色模式' : '已切换至 MUI 清晰浅色模式');
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

 // Subfolder Hub Filter & Safe Suite Notice (No Auto-Scroll on Load!)
 var hubEl = document.getElementById('companySubfolderHub');
 if (hubEl) {
 hubEl.addEventListener('click', function (e) {
 var catBtn = e.target.closest('[data-co-cat]');
 if (catBtn) {
 var cat = catBtn.getAttribute('data-co-cat');
 hubEl.querySelectorAll('[data-co-cat]').forEach(function (b) { b.classList.toggle('active', b === catBtn); });
 hubEl.querySelectorAll('[data-co-item-cat]').forEach(function (it) {
 it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat));
 });
 return;
 }
 var jumpBtn = e.target.closest('[data-suite-jump]');
 if (jumpBtn) {
 var code = jumpBtn.getAttribute('data-suite-jump');
 if (code === '01') {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 showToast('当前正在阅读 01/04：特斯拉商业模式解构');
 } else {
 showToast('请在对话附件卡片中点开第 ' + code + '/04 篇独立网页查看或下载');
 }
 }
 });
 }

 // 1. Command Deck 3-Lens Switcher
 var LENSES = [
 {
 formula: '单车全生命周期毛利 LTV = 首购整车毛利 (~$7,200) + FSD 月度订阅 ($99/月 × 85%+边际毛利) + NACS 超充/动态车险 + 免费贡献 500年/日影子训练视频',
 body: '传统车企把车批发给 4S 经销商那一刻商业关系即告终结（还需让渡 8%–12% 渠道价差与每年数十亿美元传统广告费），而特斯拉每交付一辆 Model Y 都是<strong>“带硬件毛利的移动数据采集终端与软件宿主”</strong>——车主买单硬件折旧的同时，实时向 Cortex 超算反哺长尾路况数据。'
 },
 {
 formula: '综合毛利上移驱动 = 汽车底座 (Q3\'26 18.1% 剔除积分毛利) + Megapack 储能爆发 (33.1% 毛利率) + 服务扭亏转盈 (15.9% 毛利率 / $7.34亿单季毛利)',
 body: '过去空头认为降价会永久摧毁特斯拉毛利率，却忽视了非整车高毛利曲线的陡峭抬升：2025 年能源储能毛利已达 $38.0亿（29.8% GM），2026Q3 更冲上 <strong>33.1% 历史最高毛利率</strong>，叠加 174 万 FSD 月度订阅户持续摊薄固定研发，构建起强劲的第二利润支柱。'
 },
 {
 formula: '自筹重基建公式 = TTM 经营现金流 ($18.71B) + 账上现金 ($45.45B) + 递延收入浮存金 ($7.06B) + 负向应收应付敞口 (DSO 17天 - DPO 61天 = -44天)',
 body: '转型物理 AI 需要建设超 220MW 的得州 Cortex 超算中心及 Cybercab、Semi、Optimus、Megapack 3 六条全新产线（2026 CapEx &gt;$200亿）。得益于直营现款收车与供应链 61 天账期，特斯拉在<strong>追索权债务仅 $300万美元（近乎零有息负担）</strong>的状态下全额内生造血推进世纪豪赌。'
 }
 ];
 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) {
 lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 lensTabs.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });
 }

 // 2. 5-Node Value-Chain Pipeline Inspector
 var NODES = [
 {
 badge: 'NODE 01 · FIRST-PRINCIPLES VERTICAL MANUFACTURING',
 title: '“制造机器的机器”：把传统车企外包给 Tier-1 的黑盒利润全部内化重构',
 desc: '传统车企将逾 70% 零部件与控制器外包给博世、大陆等一级供应商，导致每辆车背负超过 150 个孤立 ECU 与层层供应商加价。特斯拉自研区域控制器（48V 架构）、电驱逆变器、热泵八通阀、奥斯汀干法正负极 4680 电芯乃至北美首座锂辉石直炼氢氧化锂精炼厂（30 GWh），用超大型一体化压铸（Giga Press）将后底板 70 余个冲压焊接件合为一铸，奠定 Cybercab 单英里成本压降至 $0.30 以下的物理底座。',
 formula: '商业传导：自研三电/电子架构 + 一体化压铸 + 本土锂精炼抗关税 → 支撑 Q3\'26 剔除积分汽车毛利率逆势回升至 18.1%',
 kpis: [['18.1%', 'Q3\'26 汽车毛利率(不含积分)'], ['40 GWh', '德州 4680 干法电极电芯产能'], ['30 GWh', '北美自建氢氧化锂精炼产能'], ['>225万台', '全球四大整车超级工厂年产能']]
 },
 {
 badge: 'NODE 02 · ZERO-DEALER DTC & HERO SKU CONCENTRATION',
 title: '零经销商官网直营 + 极简爆款策略：单一 Model 3/Y 平台吃透全球供应链规模极限',
 desc: '当传统车企同时维护 40–60 款冗余车型并在特许经销商渠道沉淀 70 天以上库存时，特斯拉以 Model 3 与 Model Y（含焕新版 Juniper 与 6 座版 Model Y L）贡献了 96.9% 的乘用车交付量（Q3\'26 48.65万辆中占 47.82万辆），单品采购量级直逼 iPhone；配合全球 1,553 家自营门店线上统一定价与零传统广告投放，将 SG&A 费率牢牢锁在 ~6% 低位。',
 formula: '商业传导：极简大单品摊薄模具研发 + 官网直营砍掉 10% 经销商截留 → 全年库存周转仅 15 天，回款 DSO 仅 17 天',
 kpis: [['96.9%', 'Model 3/Y 占总交付量绝对权重'], ['15 天', 'FY25 全球新车库存供应天数'], ['1,553 家', '全球自营体验与服务中心'], ['$0 返点', '100% 官网透明直营无经销商层']]
 },
 {
 badge: 'NODE 03 · SAE J3400 (NACS) & TELEMATICS INSURANCE',
 title: '基础设施反客为主：把超充与售后网络从“卖车配套”升级为“全行业过路费”',
 desc: '早期市场诟病自建超充站与直营钣喷中心拖累重资产利润率；然而当特斯拉超充桩突破 84,465 根并以 99.9% 在线率一统北美充电标准（SAE J3400 NACS）后，几乎所有主流车企均排队接入并向特斯拉缴纳充电服务费。叠加覆盖多州的 Tesla Insurance 动态车险与移动上门维修，服务板块从昔日亏损跃升为单季贡献 $7.34亿毛利的利润引擎。',
 formula: '商业传导：8,904 座超充站跨品牌收费 + 存量千万车队维保车险 → Q3\'26 服务及其他营收大涨 +33% 至 $46.1亿（毛利率 15.9%）',
 kpis: [['84,465 根', '全球 Supercharger 超充连接器'], ['$4.61B', 'Q3\'26 服务及其他单季营收 (+33%)'], ['$734M', 'Q3\'26 服务业务创纪录毛利额'], ['15.9%', 'Q3\'26 服务及其他毛利率新高']]
 },
 {
 badge: 'NODE 04 · FSD PURE SUBSCRIPTION & CYBERCAB ROBOTAXI',
 title: '端到端神经网络变现：从 $99/月 SaaS 经常性订阅迈向无人驾驶出行抽成',
 desc: '依托全球千万级车队回传的极端长尾视频与得州 Cortex 超算训练，FSD V14 端到端大模型实现“车位到车位”全场景辅助驾驶，并在北美实现逾 75% 的新车附着率及欧洲 9 国落地。2026 年特斯拉果断取消买断选项、全面切换至月度订阅制，激活 174 万付费订阅用户；同时无安全员 Robotaxi 与内置 Grok 语音智能体的 Cybercab 已在奥斯汀开启商业化运营。',
 formula: '商业传导：174万订阅户 × $99/月高毛利 ARR + 奥斯汀/达拉斯 Robotaxi 无人车队（目标成本 <$0.30/英里）打开十倍估值空间',
 kpis: [['174 万户', 'Q3\'26 活跃付费 FSD 订阅用户'], ['>75%', '北美成熟市场新车 FSD 附着率'], ['~200万英里', 'Robotaxi 累计无安全员运营里程'], ['$7.06B', '账面递延收入预收蓄水池']]
 },
 {
 badge: 'NODE 05 · MEGAPACK UTILITY STORAGE & VIRTUAL POWER PLANT',
 title: '被严重低估的隐形冠军：Megapack 与 Autobidder 构建全球高毛利 AI 电网底座',
 desc: 'AI 超算中心耗电激增与风光新能源并网波动，使电网级巨型储能成为全球电力基建最紧缺环节。特斯拉加州拉斯拉普与上海两座 40 GWh 储能超级工厂全速运转，2025 年储能装机飙升 +49% 至 46.7 GWh，2026 年休斯顿 50 GWh 基地投产新一代 Megapack 3（~5MWh）与 20MWh Megablock；户用端超 100 万台 Powerwall 组成虚拟电厂（VPP），累计为家庭节省逾 $10亿电费。',
 formula: '商业传导：规模化电芯集采 + 工厂预制降本 + Autobidder 算法竞价套利 → 驱动 Q3\'26 储能毛利率冲上惊人的 33.1%',
 kpis: [['46.7 GWh', 'FY2025 储能部署规模 (+49% YoY)'], ['33.1%', 'Q3\'26 能源发电与储能毛利率'], ['$12.77B', 'FY2025 能源板块营收 (+27%)'], ['>100 万台', '全球 Powerwall 虚拟电厂终端底座']]
 }
 ];
 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) {
 pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
 var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
 pTrack.querySelectorAll('.bm-node-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
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

 // 3. Tier Filter, Cohort Switcher & Peer Table Filter
 var tierFilter = document.getElementById('tierFilter');
 if (tierFilter) {
 tierFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]');
 if (!b) return;
 var cat = b.getAttribute('data-tcat');
 tierFilter.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 document.querySelectorAll('#tierList [data-tier]').forEach(function (c) {
 c.style.display = (cat === 'all' || c.getAttribute('data-tier') === cat) ? '' : 'none';
 });
 });
 }

 var COHORTS = {
 solo: {
 stats: [
 ['典型资产配置', '单台标准续航 Model 3 / Y', '零广告直营获客、贡献影子路况数据'],
 ['FSD 开启保费对冲效应', '$0 (未订阅 FSD)', '随时可通过手机 App 一键按月订阅激活'],
 ['年均经常性软件与服务收入', '$420 / 年', '节假日超充补能 + 基础滤芯轮胎维保'],
 ['5年累计单客毛利 LTV', '$7,600', '主要来自首购整车毛利 (~$7,200) 与超充']
 ],
 note: '<strong>沉睡期权（Latent Software Option）：</strong>即便入门车主购车时未选购任何软件，每一辆出厂的特斯拉都已标配 AI4 推理算力与环视摄像头——硬件预埋让后续激活 $99/月 FSD 订阅的边际交付成本严格为零。'
 },
 fsd: {
 stats: [
 ['典型资产配置', 'Model Y + FSD 订阅 + 车险/超充', '北美超 75% 新车交付即激活 FSD'],
 ['FSD 开启保费对冲效应', '-$35~-$90/月', '按 FSD 安全里程返还车险折扣'],
 ['年均经常性软件与服务收入', '$2,180 / 年', '$99×12 FSD + 高级车载娱乐 + 超充/维保'],
 ['5年累计单客毛利 LTV', '$14,850', '约为纯卖车一次性毛利的 2.05 倍']
 ],
 note: '<strong>保险×FSD 飞轮死锁（Telematics Flywheel）：</strong>特斯拉在得州、加州、佛州等地打通了“开启 FSD 里程越高 → 事故率越低 → 次月 Tesla Insurance 保费越便宜”的闭环，甚至可直接抵消 $99/月 FSD 订阅费，令传统车企根本无法模仿。'
 },
 home: {
 stats: [
 ['典型资产配置', '双车(Model Y+Cybertruck) + Powerwall 3 + 光伏 + FSD', '家庭发储充用与出行全闭环'],
 ['虚拟电厂 (VPP) 年均售电收益', '+$600~$1,200/年', '电网尖峰时段自动放电返利'],
 ['年均经常性软件与能源生态贡献', '$3,850+ / 年', '双车 FSD 订阅 + 车险 + VPP 电力调度分成'],
 ['5年累计单客毛利 LTV', '$26,400+', '品牌换购忠诚度超 94%，脱离成本极高']
 ],
 note: '<strong>全屋能源操作系统的终极粘性：</strong>当家庭屋顶光伏、车库 Powerwall 3（支持 11.5kW 双向供电 Powershare）与特斯拉汽车共用同一个 Tesla App 智能错峰充放电时，换购其他品牌电车将破坏整套家庭微电网协同。'
 }
 };
 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) {
 cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]');
 if (!b) return;
 var key = b.getAttribute('data-cohort');
 cohortTabs.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 var c = COHORTS[key] || COHORTS.fsd;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
 var isMono = idx > 0 ? ' mono' : '';
 var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
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
 peerFilter.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 document.querySelectorAll('#peerTable tbody tr').forEach(function (r) {
 var rc = r.getAttribute('data-row-cat') || '';
 r.style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 });
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
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: '汽车营收', val: 69.5, base: 0, col: pal.blue, tip: 'FY2025 汽车总营收: $69.53B (含 $1.99B 碳积分与 $1.71B 租赁)' },
 { lbl: '+储能营收', val: 12.8, base: 69.5, col: pal.green, tip: 'FY2025 能源发电与储能: +$12.77B (+26.6% YoY，部署 46.7 GWh)' },
 { lbl: '+服务营收', val: 12.5, base: 82.3, col: pal.violet, tip: 'FY2025 服务及其他: +$12.53B (+18.9% YoY)，推升总营收至 $94.83B' },
 { lbl: '=总毛利', val: 17.1, base: 0, col: pal.blue, tip: 'FY2025 GAAP 总毛利: $17.09B (综合毛利率 18.0%；Q3\'26 升至 19.6%)' },
 { lbl: '经营现金流', val: 14.7, base: 0, col: pal.amber, tip: 'FY2025 经营活动现金流 OCF: $14.75B (TTM Q3\'26 跃升至 $18.71B)' },
 { lbl: '自由现金流', val: 6.2, base: 0, col: pal.green, tip: 'FY2025 自由现金流 FCF: $6.22B (+74% YoY，扣除 $8.53B CapEx 后净剩)' }
 ];
 var maxV = 105;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'Q4\'25', 'Q3\'26'];
 var gmEng = [7.4, 18.9, 26.2, 29.8, 28.6, 33.1];
 var gmTot = [25.6, 18.2, 17.9, 18.0, 20.1, 19.6];
 var gmSvc = [3.8, 5.9, 5.8, 7.4, 8.8, 15.9];
 var minM = 0, maxM = 38;
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
 if (idx === yrs.length - 1 || idx === 0) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 }
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotLine(gmEng, pal.green, '能源与储能毛利率 Energy GM');
 plotLine(gmTot, pal.blue, '集团综合毛利率 Consolidated GM');
 plotLine(gmSvc, pal.violet, '服务与超充毛利率 Services GM');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 22, bottom: 42, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = ['首年 Y1', '第2年 Y2', '第3年 Y3', '第4年 Y4', '第5年 Y5'];
 var solo = [7200, 7300, 7400, 7500, 7600];
 var fsd = [8650, 10200, 11750, 13300, 14850];
 var home = [14200, 17250, 20300, 23350, 26400];
 var maxL = 29000;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + (gv / 1000).toFixed(1) + 'K', pad.left - 8, gy + 4);
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
 ctx.fillText('$' + v.toLocaleString(), px - 6, py - 8);
 }
 hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '累计单户毛利 LTV: $' + v.toLocaleString() });
 });
 }
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 drawCurve(home, pal.violet, '光储充+FSD全栈家庭');
 drawCurve(fsd, pal.blue, 'FSD订阅+超充核心户');
 drawCurve(solo, pal.amber, '纯硬件单车户');
 } else {
 var oems = [
 { name: 'Tesla (官网直营)', days: 15, col: pal.green, tip: 'FY2025 全球新车库存仅 15 天供应量（Q3\'25 仅 10 天），无经销商积压' },
 { name: 'Toyota (精益标杆)', days: 34, col: pal.blue, tip: 'TPS 精益周转领先传统车企，但仍需维持全球区域经销商库存缓冲' },
 { name: 'BYD (直营+经销)', days: 46, col: pal.violet, tip: '多品牌矩阵下渠道库存约 1.5 个月，周转快于欧美传统车企' },
 { name: '北美传统车企均值', days: 76, col: pal.amber, tip: '底特律三大车企特许经销商院内普遍压库 65–85 天，需高额贴息促销' }
 ];
 var maxD = 90;
 for (var k = 0; k <= 3; k++) {
 var kv = k * 30, ky = pad.top + ph - (kv / maxD) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '天', pad.left - 8, ky + 4);
 }
 var slot = pw / oems.length, bw = Math.min(48, slot * 0.54);
 oems.forEach(function (o, idx) {
 var x = pad.left + idx * slot + (slot - bw) / 2;
 var bh = (o.days / maxD) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = o.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(o.days + ' 天', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(o.name, x + bw / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: o.name, body: o.tip });
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

 if (state.kView === 'cash') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26'];
 var cash = [17.71, 22.19, 29.09, 36.56, 44.06, 45.45];
 var maxC = 52;
 for (var g = 0; g <= 4; g++) {
 var cv = (maxC / 4) * g, cy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, cy); ctx.lineTo(pad.left + pw, cy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + cv.toFixed(0) + 'B', pad.left - 8, cy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (cash[i] / maxC) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = (i === yrs.length - 1) ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + cash[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 现金及短期投资储备', body: '$' + cash[i].toFixed(2) + 'B（较 FY21 净增 +$' + (cash[i] - 17.71).toFixed(2) + 'B）' });
 });
 } else {
 var items = [
 { name: 'AR/AP 应收应付净敞口', val: -44, col: pal.green, tip: 'FY2025 应收周转 DSO 17天 - 应付账期 DPO 61天 = -44天（先收车主全款，两个月后再结供应商货款）' },
 { name: '新车终端库存天数', val: 15, col: pal.blue, tip: 'FY2025 全球新车库存仅 15 天，营运资金占用极低' },
 { name: '应付供应商账期 (DPO)', val: 61, col: pal.violet, tip: '凭借庞大单品采购规模享有 61 天平均应付账期 ($13.37B 应付账款)' },
 { name: '传统车企经销商库存周期', val: 76, col: pal.amber, tip: '传统车企渠道库存积压高企，需金融子公司巨额信贷支撑' }
 ];
 var zeroX = pad.left + pw * 0.38;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(zeroX, pad.top); ctx.lineTo(zeroX, pad.top + ph); ctx.stroke();
 var rowH = ph / items.length;
 items.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, scale = (pw * 0.52) / 85;
 var barLen = Math.abs(it.val) * scale;
 var bx = it.val < 0 ? (zeroX - barLen) : zeroX;
 ctx.fillStyle = it.col;
 roundRect(ctx, bx, cy - bh / 2, barLen, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
 ctx.textAlign = it.val < 0 ? 'right' : 'left';
 ctx.fillText((it.val > 0 ? '+' : '') + it.val + ' 天', it.val < 0 ? bx - 6 : bx + barLen + 6, cy + 4);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.name, pad.left, cy - 15);
 hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 20, w: pw, h: 40, title: it.name, body: it.tip });
 });
 }
 }

 // 5. Interactive 5-Year Physical AI & Energy Compounding Simulator
 var simData = { eps: [1.66, 2.35, 3.45, 4.95, 6.90, 9.45] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 44 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY25', '27E', '28E', '29E', '30E', '31E'];
 var arr = simData.eps;
 var maxE = Math.max(8, Math.ceil(Math.max.apply(null, arr) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gAi = parseFloat(document.getElementById('inpAiCagr').value) / 100;
 var gEng = parseFloat(document.getElementById('inpEngCagr').value) / 100;
 var gAuto = parseFloat(document.getElementById('inpAutoCagr').value) / 100;
 document.getElementById('lblAiCagr').textContent = (gAi * 100).toFixed(1) + '%';
 document.getElementById('lblEngCagr').textContent = (gEng * 100).toFixed(1) + '%';
 document.getElementById('lblAutoCagr').textContent = (gAuto * 100).toFixed(1) + '%';

 var autoRev = 67.5, engSvcRev = 25.3, aiRev = 2.0, shares = 3.55;
 var epsArr = [1.66];
 var lastRev = 94.83, lastGp = 17.09, lastEbitda = 14.60;
 for (var y = 1; y <= 5; y++) {
 autoRev *= (1 + gAuto);
 engSvcRev *= (1 + gEng);
 aiRev *= (1 + gAi);
 var gp = autoRev * 0.195 + engSvcRev * 0.275 + aiRev * 0.80;
 var totRev = autoRev + engSvcRev + aiRev;
 var opex = 11.5 * Math.pow(1.09, y);
 var ebitda = Math.max(8, gp - opex + 7.5 + y * 1.1);
 var nonGaapNet = Math.max(3.5, (gp - opex) * 0.82 + 1.2);
 epsArr.push(nonGaapNet / shares);
 lastRev = totRev; lastGp = gp; lastEbitda = ebitda;
 }
 var gmPct = (lastGp / lastRev) * 100;
 document.getElementById('simRevOut').textContent = '$' + Math.round(lastRev) + 'B';
 document.getElementById('simGmOut').textContent = gmPct.toFixed(1) + '%';
 document.getElementById('simEbitdaOut').textContent = '$' + lastEbitda.toFixed(1) + 'B';
 document.getElementById('simEpsOut').textContent = '$' + epsArr[5].toFixed(2);
 simData.eps = epsArr;
 drawSimMiniCanvas();
 }

 ['inpAiCagr', 'inpEngCagr', 'inpAutoCagr'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { ai: 18, eng: 15, auto: 4 },
 base: { ai: 38, eng: 24, auto: 12 },
 bull: { ai: 58, eng: 32, auto: 18 }
 };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 simPresets.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpAiCagr').value = pr.ai;
 document.getElementById('inpEngCagr').value = pr.eng;
 document.getElementById('inpAutoCagr').value = pr.auto;
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
 g.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
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
 { id: 'mod-deck', t: 'M0 双栏指挥舱与三透镜公式', s: 'TTM >$103.6B 营收 · 19.6% Q3毛利率 · 影子数据飞轮' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '一体化压铸 → 直营DTC → NACS超充 → FSD订阅 → Megapack' },
 { id: 'mod-profit-pool', t: 'M2 现金流瀑布与高毛利引擎', s: '储能 33.1% 毛利率 · 服务毛利 $734M · 经营现金流 $18.7B' },
 { id: 'mod-cohort', t: 'M3 光储充FSD棘轮与单客 LTV', s: '单车 vs FSD订阅户 vs 全屋能源户 · 15天极速库存周转' },
 { id: 'mod-capital', t: 'M4 $454.5亿现金池与AI复利推演器', s: '-44天应收应付净敞口 · 2026–2031E 三引擎模拟器' },
 { id: 'mod-matrix', t: 'M5 全球车企/科技矩阵与风险压测', s: 'TSLA vs BYD / Toyota / GM / NVDA / AAPL 及三大风险核查' }
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

 // Sidebar Collapse & Mobile Drawer
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
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
 sb.querySelectorAll('.mui-nav-link').forEach(function (l) {
 l.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 });
 }

 // Scroll Progress & Active Section Highlight
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

 // Theme, Lang, Export & Print Buttons
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

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 var resizeTimer = null;
 window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawAllCharts, 90); });
 runSimulator();
 drawAllCharts();
 })();
 