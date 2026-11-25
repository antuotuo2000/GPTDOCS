
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_AUDIT_KEY = 'crcl_culture_bp_audit_v1';

 var state = { theme: 'dark', lang: 'zh', eView: 'revemp', gView: 'emp' };
 var hits = { eraCanvas: [], genomeCanvas: [] };

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
 green: dark ? '#22C55E' : '#16A34A',
 violet: dark ? '#A78BFA' : '#7C3AED',
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

 // C0: Interactive Topology Switcher
 var topoSwitch = document.getElementById('topoSwitch');
 if (topoSwitch) {
 topoSwitch.addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var mode = b.getAttribute('data-topo');
 topoSwitch.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
 var stage = document.getElementById('topoStage');
 if (mode === 'circle') {
 stage.innerHTML =
 '<div class="cc-topo-hub mono">CEO (Allaire · 23.9%票权≤30%封顶) × 独立风险与审计委员会</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>总裁兼法务长</b>Heath Tarbert · OCC/GENIUS/MiCA 牌照先行开路</div>' +
 '<div class="cc-spoke"><b>产品技术长 CPTO</b>Nikhil Chandhok · Arc L1 / CPN / Gateway 统一栈</div>' +
 '<div class="cc-spoke"><b>独立储备隔离仓</b>贝莱德 88% 2a-7 美债基金 + 四大月度鉴证</div>' +
 '<div class="cc-spoke"><b>合规风控内嵌层</b>AML 链上实时追踪与智能合约黑名单风控同构</div>' +
 '<div class="cc-spoke"><b>开放多链中立层</b>30+ 公链一视同仁 · 零自营交易所利益冲突</div>' +
 '<div class="cc-spoke"><b>数字优先精兵团</b>12+ 国分布式高密度协作 · 人均创收 ~$2.90M</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：既有华尔街银行信任的 SOX 内控与破产隔离，又有硅谷 SaaS 公司 70% EBITDA 利润率的软件弹性</div>';
 } else {
 stage.innerHTML =
 '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">两种失衡极端：离岸无监管黑盒 vs 传统跨国银行烟囱诸侯</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>离岸黑盒发币模式</b>规避美欧牌照，储备混配高波动资产，遭 MiCA 清退</div>' +
 '<div class="cc-spoke silo"><b>既当裁判又开赌场</b>关联交易所挪用客户保证金（典型 FTX 式治理崩塌）</div>' +
 '<div class="cc-spoke silo"><b>传统银行国别诸侯</b>各国分行独立旧账本，跨国汇款内部清算耗时 T+3</div>' +
 '<div class="cc-spoke silo"><b>事后盖章合规部</b>合规与工程对立，一个简单 API 接口审批长达 18 个月</div>' +
 '<div class="cc-spoke silo"><b>万人后台人工对账</b>靠海量外包人力手工核验电报码，营业利润率被吞噬</div>' +
 '<div class="cc-spoke silo"><b>封闭排他联盟链</b>银行各自造局域网拒绝互通，最终沦为无人使用的鬼城</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：离岸草莽进不了主流跨国企业金库，传统银行造不出互联网级开放可编程协议</div>';
 }
 });
 }

 // C1: 2x2 Quadrant Selector + Bandwidth Dial
 var QUADS = [
 {
 badge: 'Q1 · FRONT-DOOR REGULATORY INTEGRITY',
 title: '正门合规护城河：把法务牌照与密码学工程焊死在同一张研发桌上',
 desc: '在传统金融机构中，合规部门往往是阻塞创新的官僚关卡；而在 Circle 内部，合规政策、协议研发、储备风控与全球机构生态按动态权重紧密协同，使《GENIUS 法案》与欧盟 MiCA 落地瞬间即转化为 Circle 独享的准入壁垒。',
 alloc: [40, 28, 20, 12]
 },
 {
 badge: 'Q2 · MULTISTAKEHOLDER & MARKET NEUTRALITY',
 title: '协议级市场中立：为什么互为死敌的巨头都愿意用 USDC 结算？',
 desc: '如果美元稳定币由某家交易所或某家电商巨头控制，竞争对手绝不敢把核心资金流交到对手账本上。Circle 剥离交易与借贷业务，只做中立协议底座，从而同时拿下 Coinbase、币安、Visa、SAP 与拉美银行联盟。',
 alloc: [38, 18, 32, 12]
 },
 {
 badge: 'Q3 · RADICAL SUBTRACTION & SVB GRIT',
 title: '战略断舍离与极限抗压：不贪牛市快钱，才能活成周期赢家',
 desc: '从主动剥离 Poloniex、放弃高泡沫 SPAC 估值，到 2023 年 SVB 危机周末 72 小时全透明化险为夷，再到 2026Q3 高增长期主动优化 5% 组织层级——每一次减法都让组织核心战斗力更锋利。',
 alloc: [46, 22, 16, 16]
 },
 {
 badge: 'Q4 · CAPPED VOTING & PUBLIC ACCOUNTABILITY',
 title: '30% 投票权封顶宪章：为全球数字货币底座量身定制的现代治理',
 desc: '当一家公司管理着 $739 亿准主权级流动性时，不受制约的个人独裁本身就是系统性风险。Circle 将创始人 Class B 股总表决权封顶于 30%，辅以独立董事主导的风险与审计委员会，树立了加密上市公司治理标杆。',
 alloc: [34, 26, 18, 22]
 }
 ];
 var quadGrid = document.getElementById('quadGrid');
 if (quadGrid) {
 quadGrid.addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]');
 if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 quadGrid.querySelectorAll('.cc-quad-card').forEach(function (c) { c.classList.toggle('active', c === card); });
 var q = QUADS[idx];
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = q.title;
 document.getElementById('dialDesc').textContent = q.desc;
 var ids = [['Proto', q.alloc[0]], ['Reg', q.alloc[1]], ['Eco', q.alloc[2]], ['Res', q.alloc[3]]];
 ids.forEach(function (pair) {
 document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
 document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
 });
 });
 }

 // C2: 3-Era Timeline Scrubber
 var ERAS = [
 {
 badge: 'ERA I · 2013–2017 · CRYPTO PIONEER & BITLICENSE #001',
 title: '探索与立规期：在比特币蛮荒时代率先敲开纽约与伦敦监管大门',
 desc: '2013 年 Jeremy Allaire 怀揣“让价值像电子邮件一样自由流转”的愿景在波士顿创立 Circle。尽管早期消费端支付 App 与加密交易业务受限于当时公链性能与资产波动，但团队于 2015 年拿下全球首张纽约 BitLicense、2016 年拿下英国 FCA 电子货币牌照，锻造出行业独树一帜的合规铁军。',
 kpis: [['001 号', '2015 全球首张纽约 BitLicense'], ['2016 获批', '英国首个加密电子货币机构牌照'], ['消费+交易', '早期多线试错积累监管经验'], ['协议觉醒', '孕育法币 1:1 锚定开放标准构想']]
 },
 {
 badge: 'ERA II · 2018–2024 · USDC FOCUS & SVB CRUCIBLE',
 title: '断舍离与淬火期：砍掉全部非核心业务，在黑天鹅风暴中铸就机构金身',
 desc: '2018 年发布 USDC 后，管理层毅然剥离 Poloniex 交易所、Circle Trade 与 SeedInvest，把全部工程与牌照资源聚焦于稳定币及开发者云平台；2023 年穿越硅谷银行 $33亿 冻结危机并将 88% 储备迁入贝莱德 Circle Reserve Fund，重签 Coinbase 协议收回多链治理权，营收由 $1,540万 狂飙至 $16.8亿。',
 kpis: [['$15M → $1.68B', '2020–2024 收入暴增逾 108 倍'], ['88% 贝莱德', 'SVB 后升级为 2a-7 国债基金托管'], ['30+ 公链', '收回治理权后原生多链高速铺开'], ['迁册特拉华', '2024.07 完成美国本土控股架构']]
 },
 {
 badge: 'ERA III · 2025–2026+ · NYSE IPO & ECONOMIC OS ERA',
 title: '纽交所上市与全栈跃迁期（2025–2026+）：用千人高密度组织重构全球清算网',
 desc: '2025 年 6 月登陆纽交所不仅为 Circle 带来 $5.83亿 净募资与超过 $27亿 企业流动性储备，更赋予其无与伦比的上市公司信用背书。在 Allaire、Tarbert 与 Chandhok 铁三角带领下，团队密集交付 CPN（$413亿 年化 TPV）、Arc L1 公链主网并签约并购 Tazapay；同时主动精简 5% 冗余岗位，将 TTM 人均创收推升至 ~$290 万美元。',
 kpis: [['$3.03B', 'TTM 总营收与储备收入'], ['~$2.90M / 人', '~1,045人精兵超高人效'], ['70.0%', 'Q3\'26 经调整 EBITDA / RLDC 率'], ['$13.9T / 季', '占全球稳定币链上交易额 79%']]
 }
 ];
 var eraTabs = document.getElementById('eraTabs');
 if (eraTabs) {
 eraTabs.addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 eraTabs.querySelectorAll('.cc-era-tab').forEach(function (tab) { tab.classList.toggle('active', tab === t); });
 var er = ERAS[idx];
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = er.title;
 document.getElementById('eraDesc').textContent = er.desc;
 document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) {
 return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 });
 }

 // High-DPI Retina Canvas Helpers
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

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.eView === 'revemp') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', "TTM Q3'26"];
 var revEmp = [0.14, 0.84, 1.63, 1.86, 2.50, 2.90];
 var maxV = 3.3;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(4, (revEmp[i] / maxV) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = i === 5 ? pal.green : (i >= 3 ? pal.violet : pal.blue);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 人均年创收', body: '每位全职员工创造收入 $' + revEmp[i].toFixed(2) + 'M' });
 });
 } else {
 var qtrs = ["Q4'24", "Q2'25", "Q3'25", "Q4'25", "Q3'26"];
 var volT = [3.4, 5.9, 9.3, 11.9, 13.9];
 var maxT = 16.0;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxT / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv.toFixed(0) + 'T', pad.left - 8, ky + 4);
 }
 ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
 volT.forEach(function (v, idx) {
 var px = pad.left + (idx / (qtrs.length - 1)) * pw, py = pad.top + ph - (v / maxT) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 volT.forEach(function (v, idx) {
 var px = pad.left + (idx / (qtrs.length - 1)) * pw, py = pad.top + ph - (v / maxT) * ph;
 ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1) + 'T', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(qtrs[idx], px, pad.top + ph + 20);
 hits.eraCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: qtrs[idx] + ' 链上交易额', body: '单季 USDC 链上结算量达 $' + v.toFixed(1) + '万亿美元' });
 });
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.genomeCanvas = [];
 var pad = { top: 24, right: 48, bottom: 26, left: 122 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 var peers = [
 { name: 'NVIDIA (全栈算力)', emp: 5.14, ebm: 62.0, col: pal.violet },
 { name: 'Circle (合规协议)', emp: 2.90, ebm: 70.0, col: pal.blue },
 { name: 'Apple (单一P&L)', emp: 2.87, ebm: 33.9, col: pal.green },
 { name: 'Coinbase (加密入口)', emp: 1.65, ebm: 44.0, col: pal.amber },
 { name: 'Visa (四方卡网)', emp: 1.20, ebm: 67.0, col: pal.blue }
 ];
 var isEmp = (state.gView === 'emp');
 var maxX = isEmp ? 5.8 : 80;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.ebm;
 var cy = pad.top + idx * rowH + rowH / 2, bh = 22;
 var bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (idx === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
 hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '人均创收 ~$' + p.emp.toFixed(2) + 'M · 核心经营/EBITDA利润率 ~' + p.ebm.toFixed(1) + '%' });
 });
 }

 // C4: Compliance-Velocity Simulator + Mini Canvas
 var entropySeries = [74, 86, 94, 91, 82];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['10链起步', '20链', '32链(当前)', '50链', '80链(过载)'];
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
 entropySeries.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 entropySeries.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
 ctx.fillStyle = i === 2 ? pal.green : pal.violet;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(Math.round(v), px, py - 7);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
 ctx.fillText(lbls[i], px, pad.top + ph + 15);
 });
 }

 function updateEntropySim() {
 var auto = parseInt(document.getElementById('rngAuto').value, 10);
 var rails = parseInt(document.getElementById('rngRails').value, 10);
 var neut = parseInt(document.getElementById('rngNeut').value, 10);

 document.getElementById('valAuto').textContent = auto + '%' + (auto >= 75 ? ' (高杠杆)' : ' (人工偏重)');
 document.getElementById('valRails').textContent = rails + ' 条主链';
 document.getElementById('valNeut').textContent = neut + '%';

 var railDrag = Math.max(0, (rails - 35) * 0.35);
 var trust = Math.max(45, Math.min(99, Math.round(62 + neut * 0.28 + auto * 0.12 - railDrag * 0.3)));
 var ship = Math.max(30, Math.min(98, Math.round(52 + auto * 0.48 - railDrag * 0.65)));
 var ebMargin = Math.max(32.0, Math.min(76.0, 38 + auto * 0.28 + (neut - 60) * 0.22 - railDrag * 0.25)).toFixed(1);

 document.getElementById('outTrust').textContent = trust + ' / 100';
 document.getElementById('outShip').textContent = ship + ' / 100';
 document.getElementById('outOpLev').textContent = ebMargin + '%';

 entropySeries = [10, 20, 32, 50, 80].map(function (r) {
 var netGain = Math.min(22, r * 0.55);
 var over = Math.max(0, (r - 36) * 0.48) * (1.15 - auto / 120);
 return Math.max(35, Math.min(98, 60 + netGain + (neut - 70) * 0.25 - over));
 });
 drawEntropyCanvas();
 }
 ['rngAuto', 'rngRails', 'rngNeut'].forEach(function (id) {
 document.getElementById(id).addEventListener('input', updateEntropySim);
 });

 function bindSegChart(gid, attr, skey, fn) {
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
 bindSegChart('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
 bindSegChart('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);

 function bindTooltip(cid) {
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
 tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['eraCanvas', 'genomeCanvas'].forEach(bindTooltip);

 function drawAll() {
 drawEraCanvas();
 drawGenomeCanvas();
 drawEntropyCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS = [
 { id: 'sec-c0', t: 'C0 双螺旋权力拓扑与正门悖论', s: '合规×协议单一栈对比离岸黑盒与传统银行割据' },
 { id: 'sec-c1', t: 'C1 四大文化底层代码与带宽罗盘', s: '正门合规一票否决 · 协议中立 · 断舍离 · 30%票权封顶' },
 { id: 'sec-c2', t: 'C2 三代治理进化时间轴 (2013–2026+)', s: '首张 BitLicense → SVB 淬火 → 纽交所上市与 ~$2.90M 人效' },
 { id: 'sec-c3', t: 'C3 全球金融与科技巨头组织基因光谱', s: 'Circle vs Tether / Apple / Visa / Coinbase 阴阳对照' },
 { id: 'sec-c4', t: 'C4 合规-速度平衡推演器与六律体检', s: '代码自动化率压力模拟 · 6项持久化治理自检表' }
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
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
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

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]'), done = 0;
 for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
 var chip = document.getElementById('auditScoreChip');
 if (chip) chip.textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项';
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
 showToast(chk.checked ? '已勾选该组织护城河指标' : '已取消勾选');
 });
 });
 refreshAuditChip();
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

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 updateEntropySim();
 drawAll();
 })();
 