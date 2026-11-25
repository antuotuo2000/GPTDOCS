
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_AUDIT_KEY = 'tsla_culture_bp_audit_v1';

 var state = { theme: 'dark', lang: 'zh', eView: 'rd', gView: 'prof' };
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
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 // Subfolder Hub Safe Switcher
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
 if (code === '04') {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 showToast('当前正在阅读 04/04：特斯拉组织操作系统图谱');
 } else {
 showToast('请在对话附件卡片中点开第 ' + code + '/04 篇独立网页查看或下载');
 }
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
 topoSwitch.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 var stage = document.getElementById('topoStage');
 if (mode === 'tesla') {
 stage.innerHTML =
 '<div class="cc-topo-hub mono">CEO &amp; 总工程师 (Elon Musk) · 直插全公司当下最大限制因子</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>AI &amp; Optimus VP</b>Ashok Elluswamy · 车与机器人共用单一端到端模型</div>' +
 '<div class="cc-spoke"><b>全球汽车 SVP</b>Tom Zhu 朱晓彤 · 四大超级工厂 40秒下线节拍拉通</div>' +
 '<div class="cc-spoke"><b>车辆工程 VP</b>Lars Moravy · 冲压压铸与车身设计同桌办公</div>' +
 '<div class="cc-spoke"><b>能源与锂精炼</b>CEO 直抓 · 4680 电芯与逆变器无损外溢至 Megapack</div>' +
 '<div class="cc-spoke"><b>首席设计 Studio</b>Franz · 造型直接向风阻物理极限与制造良率负责</div>' +
 '<div class="cc-spoke"><b>财务与直营中枢</b>Vaibhav Taneja · 官网统一定价零经销商摩擦</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：1周内完成全车 OTA 固件推送，46天拆改旗舰 S/X 产线切换为百万台 Optimus 机器人基地</div>';
 } else {
 stage.innerHTML =
 '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统车企行政总部 · COO + 多品牌事业部总裁 + 采购委员会层层审批</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>150+ 外部黑盒 ECU</b>博世/大陆/采埃孚各自加密固件，整车厂无权改代码</div>' +
 '<div class="cc-spoke silo"><b>燃油车事业部诸侯</b>守护内燃机售后配件暴利，暗中抵制纯电平台预算</div>' +
 '<div class="cc-spoke silo"><b>软件子公司孤岛</b>脱离底盘硬件闭门造车，车机卡顿延期数年难产</div>' +
 '<div class="cc-spoke silo"><b>7级金字塔汇报链</b>一线工程师改一颗螺栓需跨部门走数月变更签批单</div>' +
 '<div class="cc-spoke silo"><b>特许经销商利益墙</b>州法律保护经销商加价截留，抗拒透明官网直营</div>' +
 '<div class="cc-spoke silo"><b>匿名合规免责文化</b>“按三十年前旧规章办”无人敢担责删减冗余零件</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：数百亿美元电动车转型投入泥牛入海，最终被迫大幅计提资产减值并退守燃油皮卡</div>';
 }
 });
 }

 // C1: 2x2 Quadrant Selector + Bandwidth Dial
 var QUADS = [
 {
 badge: 'Q1 · FIRST PRINCIPLES & IDIOT INDEX',
 title: '第一性原理破局态：把 80% 脑力砸向物理极限与砍除供应商溢价',
 desc: '当航空与汽车供应商对一个阀门或电池包报价数万美元时，特斯拉工程师直接购买现货铝锭、铜材与电芯拆解称重，一旦发现采购价是原材料物理成本的 5–10 倍（高白痴指数），立即内部立项自研重构。',
 alloc: [45, 30, 15, 10]
 },
 {
 badge: 'Q2 · THE 5-STEP ENGINEERING ALGORITHM',
 title: '五步算法清剿态：逼迫每位需求提出者具名担责，先删够 10% 再说',
 desc: 'Model 3 电池车间曾因“声学部门要求”和“消防部门要求”贴满拖慢产线的玻璃纤维垫。马斯克当场把两部门负责人叫到产线对质，发现竟无人说清物理必要性，当场徒手撕掉垫片，产能瞬间翻倍。',
 alloc: [55, 18, 17, 10]
 },
 {
 badge: 'Q3 · SKIP-LEVEL & SURGE DEBUGGING',
 title: '驻厂闪电会战态：全公司最高算力与人才瞬间向单一限制因子坍缩',
 desc: '没有常设 COO 的好处是信息零失真：无论是奥斯汀 4680 干法电极压延粘辊，还是 Robotaxi 无保护左转犹豫，CEO 与核心 VP 直接驻场每日复盘，跨部门调配全球顶尖工程师 24 小时轮班攻克。',
 alloc: [28, 22, 38, 12]
 },
 {
 badge: 'Q4 · ALL-HANDS EQUITY & $0-SALARY BET',
 title: '主人翁对齐态：用长期期权淘汰官僚混子，锁定十年物理 AI 远征',
 desc: '在特斯拉工作强度极高（平均司龄 3.7 年），但留下的硬核骨干与产线技师通过股票增值获得了远超传统制造业的财富回报；2025 CEO 激励方案更将解锁门槛设在史无前例的 $2T–$8.5T 市值与 $400B EBITDA。',
 alloc: [30, 28, 22, 20]
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
 [['Q', q.alloc[0]], ['P', q.alloc[1]], ['A', q.alloc[2]], ['M', q.alloc[3]]].forEach(function (p) {
 document.getElementById('pct' + p[0]).textContent = p[1] + '%';
 document.getElementById('bar' + p[0]).style.width = p[1] + '%';
 });
 });
 }

 // C2: 3-Era Scrubber
 var ERAS = [
 {
 badge: 'STAGE I · 2008–2018 · SURVIVAL & PRODUCTION HELL',
 title: '求生与炼狱期：从 2008 平安夜融资绝境到“五步工程算法”淬火成型',
 desc: '早年以硅谷软件思维重新发明汽车电子架构（Model S 首发整车 OTA）；但在 2017–2018 Model 3 扩产中曾犯下“过早盲目全自动化”重错，马斯克驻守弗里蒙特车间拆掉冗余机器人、搭起帐篷产线死里逃生，由此凝练出传世的五步工程算法。',
 kpis: [['1,417 → 48,817', '2011–2018 员工规模扩张'], ['5,000台/周', '2018年中冲破 Model 3 生死线'], ['整车 OTA', '领先传统车企整整十年'], ['五步算法', '从自动化挫败中痛定思痛诞生']]
 },
 {
 badge: 'STAGE II · 2019–2024 · GIGA SHANGHAI & GLOBAL SCALE',
 title: '超级工厂闪电战期：上海速度重塑全球制造标杆与 2024 反熵增瘦身',
 desc: '2019 年上海超级工厂创造“当年荒地动工、当年交付客户”的工业奇迹，朱晓彤团队淬炼出的高密度集群供应链与 9,000 吨一体压铸随后赋能柏林与得州工厂；当 2023 年编制膨胀至 14.05 万人时，2024 年果断精简 10.5% 防止大公司官僚化。',
 kpis: [['$24.6B → $97.7B', '5年总营收暴涨近 4 倍'], ['180.9万辆', 'Model Y 登顶全球全品类销冠'], ['-10.5% 精简', '2024 主动裁撤 1.48 万冗余岗'], ['+$36.6B 现金', '从濒临断流蜕变为现金巨兽']]
 },
 {
 badge: 'STAGE III · 2025–2026+ · PHYSICAL AI CONVERGENCE',
 title: '物理 AI 统合期（2025–2026+）：把整车厂重塑为自动驾驶与通用机器人母体',
 desc: '经历 2024 年组织瘦身后，特斯拉在 2025–2026 年全面转向“构建极度丰饶的世界”：由 Ashok Elluswamy 统合 Autopilot 与 Optimus 机器人研发，关停弗里蒙特 Model S/X 腾出百万台机器人车间，建成得州超 220MW Cortex 超算，并以 2025 CEO 绩效奖励锚定十年远征。',
 kpis: [['>$103.6B', 'TTM 营收连续两季破千亿'], ['134,785人', '精干编制支撑车/储/机三栖作战'], ['+69% YoY', 'Q3\'26 研发猛增至 $2.76B'], ['6条新产线', 'Cybercab/Semi/Optimus/MP3齐发']]
 }
 ];
 var eraTabs = document.getElementById('eraTabs');
 if (eraTabs) {
 eraTabs.addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 eraTabs.querySelectorAll('.cc-era-tab').forEach(function (el) { el.classList.toggle('active', el === t); });
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

 if (state.eView === 'rd') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26年化'];
 var rd = [2.59, 3.08, 3.97, 4.54, 6.41, 11.04];
 var maxV = 12.5;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (rd[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 5 ? pal.green : (i === 4 ? pal.violet : pal.blue);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + rd[i].toFixed(2) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 研发投入', body: '$' + rd[i].toFixed(2) + 'B（跨整车、AI5硅片、Cortex超算与Optimus共享复用）' });
 });
 } else {
 var fyrs = ['2021', '2022', '2023', '2024', '2025', 'Q3\'26'];
 var fleetM = [2.3, 3.7, 5.5, 7.3, 8.9, 10.2];
 var maxF = 11.5;
 for (var k = 0; k <= 4; k++) {
 var kv = ((maxF / 4) * k).toFixed(1), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + 'M', pad.left - 8, ky + 4);
 }
 ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
 fleetM.forEach(function (v, idx) {
 var px = pad.left + (idx / (fyrs.length - 1)) * pw, py = pad.top + ph - (v / maxF) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 fleetM.forEach(function (v, idx) {
 var px = pad.left + (idx / (fyrs.length - 1)) * pw, py = pad.top + ph - (v / maxF) * ph;
 ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(px, py, 4.4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + 'M', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(fyrs[idx], px, pad.top + ph + 20);
 hits.eraCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: fyrs[idx] + ' 累计交付车队', body: v.toFixed(1) + 'M 辆（构成全球最大真实道路视频训练网）' });
 });
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.genomeCanvas = [];
 var pad = { top: 24, right: 54, bottom: 26, left: 122 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 var peers = [
 { name: 'Toyota (精益混动)', prof: 78.0, gm: 20.2, col: pal.amber },
 { name: 'Tesla (超扁平全栈)', prof: 28.1, gm: 19.6, col: pal.blue },
 { name: 'GM (北美皮卡盘)', prof: 17.3, gm: 12.4, col: pal.violet },
 { name: 'BYD (百万垂直铁军)', prof: 5.3, gm: 18.5, col: pal.green }
 ];
 if (state.gView === 'gm') {
 peers = [
 { name: 'NVIDIA (算力全栈)', prof: 2850, gm: 71.1, col: pal.violet },
 { name: 'Apple (单一P&L)', prof: 791, gm: 48.8, col: pal.blue },
 { name: 'Tesla 储能分部', prof: 95, gm: 33.1, col: pal.green },
 { name: 'Tesla 综合 (Q3\'26)', prof: 28.1, gm: 19.6, col: pal.blue },
 { name: 'BYD 综合 (9M\'26)', prof: 5.3, gm: 18.5, col: pal.amber }
 ];
 }
 var isProf = (state.gView === 'prof');
 var maxX = isProf ? 90 : 80;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isProf ? p.prof : p.gm;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (p.name.indexOf('Tesla') !== -1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isProf ? ('$' + val.toFixed(1) + 'K') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
 hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: isProf ? ('单名员工年创净利 ~$' + val.toFixed(1) + 'K') : ('毛利率 ' + val.toFixed(1) + '%') });
 });
 }

 // C4: Entropy Simulator
 var entropySeries = [96, 94, 78, 58, 39];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['10%外包', '15%(特斯拉)', '40%外包', '65%外包', '85%(传统车企)'];
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
 ctx.fillStyle = i === 1 ? pal.green : pal.violet;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(Math.round(v), px, py - 7);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
 ctx.fillText(lbls[i], px, pad.top + ph + 15);
 });
 }

 function updateEntropySim() {
 var out = parseInt(document.getElementById('rngOut').value, 10);
 var lay = parseInt(document.getElementById('rngLay').value, 10);
 var del = parseInt(document.getElementById('rngDel').value, 10);
 document.getElementById('valOut').textContent = out + '%' + (out <= 25 ? ' (全栈自研区)' : out <= 55 ? ' (混合妥协)' : ' (供应商黑盒锁死)');
 document.getElementById('valLay').textContent = lay + ' 层' + (lay <= 3 ? ' (越级直通)' : lay <= 5 ? ' (中度科层)' : ' (官僚泥潭)');
 document.getElementById('valDel').textContent = del + '%';

 var ota = Math.max(18, Math.min(99, Math.round(104 - out * 0.65 - (lay - 2) * 5.2 + (del - 60) * 0.25)));
 var cadence = Math.max(20, Math.min(99, Math.round(98 - (lay - 2) * 7.5 - out * 0.35 + (del - 60) * 0.35)));
 var bomDiff = (-28 + out * 0.36 + (90 - del) * 0.16).toFixed(1);

 document.getElementById('outOta').textContent = ota + ' / 100';
 document.getElementById('outBom').textContent = (bomDiff > 0 ? '+' : '') + bomDiff + '%';
 document.getElementById('outCadence').textContent = cadence + ' / 100';

 entropySeries = [10, 15, 40, 65, 85].map(function (o) {
 return Math.max(18, Math.min(99, 104 - o * 0.65 - (lay - 2) * 5.2 + (del - 60) * 0.25));
 });
 drawEntropyCanvas();
 }
 ['rngOut', 'rngLay', 'rngDel'].forEach(function (id) {
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
 g.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
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
 tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
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
 { id: 'sec-c0', t: 'C0 无COO越级拓扑与车企悖论', s: '特斯拉全栈越级网 vs 传统车企 150+ 黑盒 ECU 科层墙' },
 { id: 'sec-c1', t: 'C1 四大文化底层代码与算法罗盘', s: '白痴指数 · 五步工程算法 · 越级沟通 · 零底薪对赌' },
 { id: 'sec-c2', t: 'C2 三阶段治理演进时间轴 (2008–2026+)', s: '量产炼狱 → 上海速度 → 物理 AI 与研发冲上 $11B 年化' },
 { id: 'sec-c3', t: 'C3 巨头组织基因光谱与阴阳对照', s: 'Tesla vs 丰田 / 苹果 / 比亚迪 / 英伟达 单人净利对决' },
 { id: 'sec-c4', t: 'C4 白痴指数熵增模拟与六律体检', s: '外包与科层损耗推演器 · 6 项组织健康持久化自检表' }
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

 // Sidebar Toggle & Mobile Drawer
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
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
 sb.querySelectorAll('.mui-nav-link').forEach(function (l) {
 l.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 });
 }

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]'), done = 0;
 boxes.forEach(function (b) { if (b.checked) done++; });
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

 // Theme, Lang, Export & Print
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

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 updateEntropySim();
 drawAll();
 })();
 