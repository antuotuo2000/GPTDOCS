
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_AUDIT_KEY = 'meta_culture_bp_audit_v1';

 var state = { theme: 'dark', lang: 'zh', eView: 'revemp', gView: 'emp' };
 var hits = { eraCanvas: [], genomeCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg;
 bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2400);
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
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
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
 try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 function exportSelfHtml() {
 var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'Meta企业文化与组织操作系统.html';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
 showToast('已开始下载《Meta企业文化与组织操作系统.html》');
 }

 // Subfolder Hub
 var hubPills = document.getElementById('hubCatPills');
 if (hubPills) {
 hubPills.addEventListener('click', function (e) {
 var b = e.target.closest('[data-co-cat]');
 if (!b) return;
 var cat = b.getAttribute('data-co-cat');
 var bs = hubPills.querySelectorAll('.co-hub-pill');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var its = document.querySelectorAll('#hubItemList [data-co-item-cat]');
 for (var j = 0; j < its.length; j++) {
 its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
 }
 });
 }
 document.querySelectorAll('[data-nav-toast]').forEach(function (el) {
 el.addEventListener('click', function () { showToast(el.getAttribute('data-nav-toast')); });
 });

 // C0: Topology Switcher
 var topoSwitch = document.getElementById('topoSwitch');
 if (topoSwitch) {
 topoSwitch.addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var mode = b.getAttribute('data-topo');
 var bs = topoSwitch.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var stage = document.getElementById('topoStage');
 if (mode === 'wartime') {
 stage.innerHTML =
 '<div class="cc-topo-hub mono">Zuckerberg (60.8% 投票权) × 统一产品/算力指挥链 (66,775人)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>超级智能实验室 MSL</b>Alexandr Wang · 独立高薪特区直攻 Muse 前沿模型</div>' +
 '<div class="cc-spoke"><b>应用家族统一产品链</b>Chris Cox (CPO) · IG/FB/WA/Threads 共享推荐栈</div>' +
 '<div class="cc-spoke"><b>商业与全球变现中枢</b>Javier Olivan (COO) · Advantage+ 自动化广告变现</div>' +
 '<div class="cc-spoke"><b>应用AI工程与RL硬件</b>Andrew Bosworth (CTO) · 眼镜硬件 + 2026.03 应用AI工程</div>' +
 '<div class="cc-spoke"><b>吉瓦级算力与MTIA</b>Meta Compute + Broadcom · 33座数据中心统一调度</div>' +
 '<div class="cc-spoke"><b>基建资本与财务铁腕</b>Susan Li (CFO) + Dina Powell (总裁) · $140B 资本统筹</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：用较 2022 少 23% 的员工支撑翻倍的年化营收（Q3 年化 $258.4B），人均年化创收飙升至 $3.87M！</div>';
 } else {
 stage.innerHTML =
 '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">2020–2022 零利率盲目翻倍扩招期 · 86,482人官僚膨胀泥潭</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>经理套娃层级</b>“Managers managing managers” 层层汇报过滤真实问题</div>' +
 '<div class="cc-spoke silo"><b>人才囤积内卷</b>为防对手挖人盲目扩招，大量团队争抢边缘立项刷存在感</div>' +
 '<div class="cc-spoke silo"><b>元宇宙无约束烧钱</b>VR 虚拟社交脱离真实用户需求，R&D 一度反超营业利润</div>' +
 '<div class="cc-spoke silo"><b>全员远程松散协同</b>跨时区线上会议泛滥，硬件与大模型联调响应迟缓</div>' +
 '<div class="cc-spoke silo"><b>AI 算力碎片化</b>FAIR 学术导向与产品推荐工程脱节，错失首波聊天机器人节奏</div>' +
 '<div class="cc-spoke silo"><b>利润断崖式暴跌</b>FY2022 营收首现负增长，营业利润暴跌 -38% 至 $28.94B</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：人均创收跌至 $1.35M 谷底，股价回撤超 75%，直接触发 2023“效率之年”休克疗法</div>';
 }
 });
 }

 // C1: 2x2 Quadrant Selector
 var QUADS = [
 {
 badge: 'Q1 · FLATTER IS FASTER & IC DENSITY',
 title: '去中层化铁律：一线代码/实验执行 × 算力杠杆 × 残酷校准',
 desc: '在“大扁平化”改造后，Meta 要求基层与中层工程主管必须保持深入代码库与实验数据的实战能力（Hands-on Technical Depth），管理幅度从过去带 4–5 人拉宽至 8–12+ 人，使决策链条从 9–10 层压缩至 5–6 层。',
 alloc: [45, 30, 17, 8]
 },
 {
 badge: 'Q2 · PSC CALIBRATION SHARK TANK',
 title: 'PSC 绩效角斗场：只认线上可量化的北极星指标增量',
 desc: 'Meta 的绩效评估并非主管一人说了算，而是所有同级经理进入 Calibration 会议逐一拿线上 A/B 测试的时长、留存或广告转化增量（Impact）对质。2024–2026 年高达 15%–20% 的低分档硬性分布比例，时刻维持着极高的内部危机感。',
 alloc: [35, 38, 20, 7]
 },
 {
 badge: 'Q3 · FOUNDER CONTROL & CLASS C ARCHITECTURE',
 title: '硅谷最稳固的创始人控制权：十年豪赌无需看华尔街脸色',
 desc: '不同于苹果一股一票的公众公司治理，扎克伯格手握 60.8% 投票权，并通过 2026 年 10 月新设的无投票权 Class C 普通股与高管 2031 登月期权计划，构建起“创始人指明十年航向 + 核心重臣共享万亿级超额收益”的战车结构。',
 alloc: [40, 25, 25, 10]
 },
 {
 badge: 'Q4 · HACKER PRAGMATISM & ZERO SUNK-COST EGO',
 title: '黑客实用主义：今天拥抱开源造生态，明天闭源推 Muse 抢商业闭环',
 desc: 'Meta 从不把某一种技术教条神圣化：当落后时用开源 Llama 凝聚全球开发者生态压制对手定价权；当需要变现与冲刺超级智能时，果断重组 MSL、在 2026 年推出专有前沿模型 Muse Spark / Muse Wonder 与 $799 带屏眼镜。',
 alloc: [50, 28, 14, 8]
 }
 ];
 var quadGrid = document.getElementById('quadGrid');
 if (quadGrid) {
 quadGrid.addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]');
 if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 var cs = quadGrid.querySelectorAll('.cc-quad-card');
 for (var i = 0; i < cs.length; i++) cs[i].classList.toggle('active', cs[i] === card);
 var q = QUADS[idx];
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = q.title;
 document.getElementById('dialDesc').textContent = q.desc;
 [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (pair) {
 document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
 document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
 });
 });
 }

 // C2: 3-Era Timeline Scrubber
 var ERAS = [
 {
 badge: 'ERA I · 2004–2021 · HACKER HYPER-GROWTH & DUAL-CORE',
 title: '黑客马拉松扩张期：扎克伯格抓产品与并购，桑德伯格建全球广告帝国',
 desc: '以“Move Fast and Break Things”起家，夜间 Hackathon 孵化出点赞按钮、News Feed 与 Messenger；面对移动浪潮果断斥资 $10亿 收购 Instagram、$190亿 收购 WhatsApp，搭配 Sheryl Sandberg 搭建的全球自助竞价广告系统，将营收从 2010 年 $19.7亿 推升至 2021 年 $1,179.3亿。',
 kpis: [['$1.97B → $118B', '11年营收暴增近 60 倍'], ['IG + WhatsApp', '互联网史最成功双并购案'], ['Move Fast', '奠定代码与 A/B 实验高于职级传统'], ['71,970 人', '2021 年末员工规模与黄金利润率']]
 },
 {
 badge: 'ERA II · 2022–2024 · YEAR OF EFFICIENCY & GREAT FLATTENING',
 title: '“效率之年”大刮骨疗毒：砍掉 2.1 万膨胀编制，两年实现营业利润翻倍逆袭',
 desc: '2022 年受苹果 ATT 隐私限制、TikTok 冲击与疫情盲目扩招至 86,482 人拖累，营业利润暴跌 38%。扎克伯格于 2023 年初宣布“效率之年”，大刀阔斧裁员逾 2.1 万人（2023年末降至 67,317 人）、撤除多层中层经理、恢复每周线下坐班（RTO），并用 GPU 重构 Reels 与 Advantage+，使 2024 年营业利润飙升至 $693.8亿、净利润创下 $623.6亿 纪录。',
 kpis: [['86.5k → 67.3k', '一年果断精简 -22% 员工编制'], ['$28.9B → $69.4B', '两年间营业利润暴涨 2.4 倍'], ['2024 首派股息', '开启季度现金分红回报股东'], ['Reels 逆袭', '彻底扭转短视频时长流失危机']]
 },
 {
 badge: 'ERA III · 2025–2026+ · SUPERINTELLIGENCE WARTIME REGIME',
 title: '“砍人头换 GPU”的冷酷进化：6.68万精兵驾驭全球最大私有算力帝国',
 desc: '2025–2026 年，Meta 将组织重塑推向极致：一方面重金邀请 Alexandr Wang 执掌超级智能实验室（MSL）推出 Muse 家族前沿模型，由 Dina Powell McCormick 出任总裁统筹外部资本；另一方面于 2026 年 5 月再裁约 8,000 人使 Q3 编制降至 66,775 人（同比 -15%），把节省的人力开支全面置换为 $135B–$145B 的吉瓦级算力集群。',
 kpis: [['66,775 人', '2026Q3 总编制 (-15% YoY)'], ['$3.87M / 人', 'Q3 年化人均创收历史极值'], ['$135–145B', '2026 全年算力资本开支指引'], ['Class C 锁权', '2027.01 生效永久保障创始人主导']]
 }
 ];
 var eraTabs = document.getElementById('eraTabs');
 if (eraTabs) {
 eraTabs.addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 var ts = eraTabs.querySelectorAll('.cc-era-tab');
 for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('active', ts[i] === t);
 var er = ERAS[idx];
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = er.title;
 document.getElementById('eraDesc').textContent = er.desc;
 document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) {
 return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 });
 }

 // High-DPI Canvas Helpers
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
 var yrs = ['2021', '2022谷底', '2023精简', '2024', '2025', 'Q3 26年化'];
 var revEmp = [1.64, 1.35, 2.00, 2.22, 2.55, 3.87];
 var maxV = 4.3;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (revEmp[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 1 ? pal.red : (i === 5 ? pal.green : pal.blue);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 人均年化创收', body: '每位员工支撑年化营收 $' + revEmp[i].toFixed(2) + 'M（Q3 2026 员工总数降至 66,775 人）' });
 });
 } else {
 var lyrs = ['FY21', 'FY22交叉', 'FY23', 'FY24', 'FY25', '9M26年化'];
 var rdB = [24.7, 35.3, 38.5, 43.9, 57.4, 79.2];
 var opB = [46.8, 28.9, 46.8, 69.4, 83.3, 86.0]; // 9M26 ex-AG settlement annualized
 var maxF = 98;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxF / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 function plot(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxF) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxF) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 1 || idx >= 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1) + 'B', px, py - 8);
 }
 hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: lyrs[idx] + ' · ' + name, body: '$' + v.toFixed(1) + 'B' });
 });
 }
 lyrs.forEach(function (lb, idx) {
 var px = pad.left + (idx / 5) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 plot(opB, pal.green, '经调营业利润 Operating Income (9M26剔除一次性诉讼和解)');
 plot(rdB, pal.violet, '全集团研发费用 R&D (约占营收 29%–31%)');
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
 { name: 'NVIDIA (超扁平)', emp: 5.14, gm: 74.5, col: pal.violet },
 { name: 'Meta (6.68万精兵)', emp: 3.87, gm: 82.0, col: pal.blue },
 { name: 'Apple (单一P&L)', emp: 2.87, gm: 48.8, col: pal.green },
 { name: 'Alphabet (工程行会)', emp: 2.20, gm: 58.2, col: pal.amber },
 { name: 'Microsoft (事业部)', emp: 1.49, gm: 69.0, col: pal.blue }
 ];
 var isEmp = (state.gView === 'emp');
 var maxX = isEmp ? 5.8 : 92;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.gm;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (idx === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
 hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '最新年化人均创收 $' + p.emp.toFixed(2) + 'M · 综合毛利率 ' + p.gm.toFixed(1) + '%' });
 });
 }

 // C4: De-Layering Simulator
 var entropySeries = [95, 92, 81, 66, 48];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['4层极扁平', '5层(2026Meta)', '7层', '9层', '11层(2022套娃)'];
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.5; ctx.beginPath();
 entropySeries.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 entropySeries.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
 ctx.fillStyle = i === 1 ? pal.green : (i === 4 ? pal.red : pal.blue);
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(Math.round(v), px, py - 7);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
 ctx.fillText(lbls[i], px, pad.top + ph + 15);
 });
 }

 function updateEntropySim() {
 var layers = parseInt(document.getElementById('rngLayers').value, 10);
 var ic = parseInt(document.getElementById('rngIc').value, 10);
 var attr = parseInt(document.getElementById('rngAttr').value, 10);
 document.getElementById('valLayers').textContent = layers + ' 层' + (layers <= 6 ? ' (扁平战时区)' : layers <= 8 ? ' (官僚滋生)' : ' (套娃瘫痪)');
 document.getElementById('valIc').textContent = ic + '%';
 document.getElementById('valAttr').textContent = attr + '%';

 var ship = Math.max(20, Math.min(99, Math.round(98 - (layers - 4) * 6.8 + (ic - 75) * 0.65 - Math.max(0, attr - 25) * 0.55)));
 var revFte = Math.max(1.25, (2.10 + (ic - 60) * 0.068 - (layers - 5) * 0.22 - Math.max(0, attr - 30) * 0.02)).toFixed(2);
 var opSave = ((80 - layers * 4.2 + (ic - 70) * 0.35 - 55) * 0.9).toFixed(1);

 document.getElementById('outShip').textContent = ship + ' / 100';
 document.getElementById('outRevFte').textContent = '$' + revFte + 'M';
 document.getElementById('outOpSave').textContent = (opSave >= 0 ? '+' : '') + opSave + 'pp';

 entropySeries = [4, 5, 7, 9, 11].map(function (lv) {
 return Math.max(18, Math.min(99, 98 - (lv - 4) * 6.8 + (ic - 75) * 0.65 - Math.max(0, attr - 25) * 0.55));
 });
 drawEntropyCanvas();
 }
 ['rngLayers', 'rngIc', 'rngAttr'].forEach(function (id) {
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
 tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
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
 { id: 'sec-c0', t: 'C0 创始人绝对控盘与去中层拓扑沙盘', s: '60.8%投票权 + Class C · 2026战时扁平 vs 2022经理套娃' },
 { id: 'sec-c1', t: 'C1 四大文化底层代码与带宽罗盘', s: 'Flatter is Faster · PSC鲨鱼池校准 · 创始人锁权 · 实用主义' },
 { id: 'sec-c2', t: 'C2 三代战时体制演进 (2004–2026+)', s: '66,775人精兵创 $3.87M 年化人均创收奇迹' },
 { id: 'sec-c3', t: 'C3 全球科技巨头组织基因光谱', s: 'Meta vs 苹果 / NVIDIA / Alphabet / 微软横向对决' },
 { id: 'sec-c4', t: 'C4 去中层化效能模拟与组织六律自检', s: '汇报层级压力模拟 · 6项治理健康度持久化核查清单' }
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
 if (e.key === 'Escape') document.body.classList.remove('portal-detail-drawer');
 });

 // Sidebar, Export & Audit Persistence
 var sbBtn = document.getElementById('sidebarToggleBtn'), bd = document.getElementById('portalDetailBackdrop');
 if (sbBtn) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '1' : '0'); } catch (e) {}
 setTimeout(drawAll, 60);
 } else {
 document.body.classList.toggle('portal-detail-drawer');
 }
 });
 }
 if (bd) bd.addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 document.querySelectorAll('#muiSidebar .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 });
 document.querySelectorAll('[data-export-self]').forEach(function (btn) { btn.addEventListener('click', exportSelfHtml); });
 document.querySelectorAll('[data-set-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () { applyTheme(btn.getAttribute('data-set-theme'), false); });
 });
 var prBtn = document.getElementById('sidePrintBtn');
 if (prBtn) prBtn.addEventListener('click', function () { window.print(); });

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
 if (chip) chip.textContent = '组织六律核验：' + done + ' / ' + boxes.length + ' 项';
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
 applyTheme(state.theme === 'dark' ? 'light' : 'dark', false);
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (lb) applyLang(lb.getAttribute('data-lang'), false);
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 updateEntropySim();
 drawAll();
 })();
 