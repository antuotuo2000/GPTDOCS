
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_AUDIT_KEY = 'msft_culture_bp_audit_v1';

 var state = { theme: 'dark', lang: 'zh', eView: 'revemp', gView: 'opm' };
 var hits = { eraCanvas: [], genomeCanvas: [] };

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
 a.download = '微软企业文化与组织操作系统.html';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
 showToast(state.lang === 'en' ? 'Downloaded standalone HTML file' : '已开始下载独立网页：微软企业文化与组织操作系统.html');
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
 var sl = document.getElementById('sideThemeLightBtn');
 var sd = document.getElementById('sideThemeDarkBtn');
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

 // C0: Topology Switcher
 document.getElementById('topoSwitch').addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var mode = b.getAttribute('data-topo');
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var stage = document.getElementById('topoStage');
 if (mode === 'nadella') {
 stage.innerHTML =
 '<div class="cc-topo-hub mono">Nadella (首席技术统帅 · 35人工程圈) × Althoff (商业 CEO · 全球一张总账单)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>Cloud + AI (Guthrie)</b>Azure 同构算力、Fabric 与 Maia/Cobalt 芯片</div>' +
 '<div class="cc-spoke"><b>CoreAI (Parikh)</b>GitHub + VS Code + Foundry 智能体开发工厂</div>' +
 '<div class="cc-spoke"><b>Copilot &amp; Apps</b>Lamanna + Roslansky 周站会拉通 Office/Agent 365</div>' +
 '<div class="cc-spoke"><b>Microsoft AI</b>Mustafa Suleyman 自研 MAI 前沿模型与消费入口</div>' +
 '<div class="cc-spoke"><b>Security (Gallot)</b>10,000人零信任工程 + 全员薪酬一票否决</div>' +
 '<div class="cc-spoke"><b>Discovery &amp; Xbox</b>Majorana 1 拓扑量子 + Asha Sharma 游戏纪律</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：一次底层模型或芯片突破，24小时内同步赋能 GitHub、Office、Dynamics 与安全全线，Q1 FY27 营业利润率冲上 49.8%</div>';
 } else {
 stage.innerHTML =
 '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">2000–2013 旧体制：五大业务藩王各自卫冕 + Stack Ranking 强制淘汰配额</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>Windows 事业部霸权</b>任何不绑定 Windows 的平板/手机构想一律枪毙</div>' +
 '<div class="cc-spoke silo"><b>Office 独立王国</b>长期抵触登陆 iPhone/iPad，错失早期移动红利</div>' +
 '<div class="cc-spoke silo"><b>Server &amp; Tools</b>视 Linux 开源为“癌症”，排斥异构开发者生态</div>' +
 '<div class="cc-spoke silo"><b>Online 在线部门</b>年亏数十亿却与企业销售体系各自为战</div>' +
 '<div class="cc-spoke silo"><b>移动与诺基亚并购</b>$76亿商誉减值惨剧，软硬团队文化水火不容</div>' +
 '<div class="cc-spoke silo"><b>强制正态排名恶果</b>A级高手拒绝同组共事，全员耗费精力写周报邀功</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：尽管营收增长，但错失移动互联网与云原生先机，市盈率一度跌至 ~10x 的“价值陷阱”</div>';
 }
 });

 // C1: 2x2 Quadrant Selector
 var QUADS = [
 {
 badge: 'Q1 · THREE-CIRCLE IMPACT EVALUATION',
 title: '为什么“三问考核法”能把 22 万工程师拧成一股绳？',
 desc: '在旧时代，Office 工程师如果花时间帮 Azure 团队做适配，在部门正态分布排名中就会吃亏；而在现行三维绩效评估下，“复用他人底层平台 + 输出自身能力助推兄弟部门”直接决定晋升至 Principal / Partner 级别的核心权重，从激励源头拆除了部门墙。',
 alloc: [45, 25, 20, 10]
 },
 {
 badge: 'Q2 · RETIRING SLT & DUAL-CORE SPLIT',
 title: '退役旧 SLT 与商业 CEO 分治：把 CEO 重新变回“首席产品经理”',
 desc: '当员工突破 22 万人，传统层层汇报会让 AI 决策慢如蜗牛。纳德拉将全球销售、市场与商业运营全权交予商业 CEO Judson Althoff，取消冗长的旧 SLT 例会，改为每周亲自与 Copilot 三人组及 35 人工程领袖圈直接过指标、调模型。',
 alloc: [55, 20, 15, 10]
 },
 {
 badge: 'Q3 · SECURE FUTURE INITIATIVE (SFI)',
 title: '安全一票否决权：唯一写进全公司 22.3 万人奖金公式的硬红线',
 desc: '在 Agentic AI 时代，企业最怕自主智能体越权泄密。微软不仅投入 10,000 名专职安全工程师重构身份密钥体系，更在公司治理层面明确：任何团队若未达到 SFI 零信任安全基线，即便营收超标也将直接扣减绩效激励。',
 alloc: [30, 20, 40, 10]
 },
 {
 badge: 'Q4 · MODEL-NEUTRAL PRAGMATISM',
 title: '治愈“非我发明症”：既做OpenAI大股东，也欢迎Anthropic与自研MAI同台竞技',
 desc: '微软深刻吸取了当年死守 IE 浏览器与 Windows Mobile 的教训：在 AI 时代，Azure Foundry 向全球所有顶尖模型敞开怀抱，同时让 Mustafa Suleyman 秘密锤炼高性价比自研 MAI 模型——永远不把帝国命运押在单一外部伙伴身上。',
 alloc: [40, 35, 15, 10]
 }
 ];
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]');
 if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 var cs = this.querySelectorAll('.cc-quad-card');
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

 // C2: 3-Era Leadership Scrubber
 var ERAS = [
 {
 badge: 'ERA I · 1975–2000 · BILL GATES PC OS STANDARD',
 title: '盖茨缔造期：极客精英文化与软件平台授权商业模式的鼻祖',
 desc: '比尔·盖茨与保罗·艾伦在个人电脑黎明期洞察到“硬件终将商品化，唯有操作系统与开发工具链掌握标准定价权”。早期微软以极其犀利的直接技术质询（Gates Review）著称，缔造了超过 85% 毛利率的 Windows + Office 双垄断帝国。',
 kpis: [['$0 → $23.0B', '25年奠定全球软件第一帝国'], ['>90% 份额', '全球桌面 PC 操作系统统治率'], ['开发者生态', 'Win32 API 构筑百万软件护城河'], ['平台范式', '确立零边际成本软件授权模型']]
 },
 {
 badge: 'ERA II · 2000–2014.01 · STEVE BALLMER ENTERPRISE & SILOS',
 title: '鲍尔默守成期：B2B 营收翻三倍，却因部门藩篱与强制排名痛失移动浪潮',
 desc: '鲍尔默建立了强大的企业级协议（EA）销售机器并孵化了 Server 与早期云种子，将年营收从 $230亿 推升至 $778亿；但“一切功能必须服务于卖更多 Windows”的教条与残酷的内部 Stack Ranking，导致顶尖人才流失、移动与搜索屡战屡败。',
 kpis: [['$23B → $78B', '企业级业务稳健扩张逾 3 倍'], ['Stack Ranking', '2013年底终被废除的内耗制度'], ['$7.6B 减值', '诺基亚手机硬件并购惨痛学费'], ['~10x P/E', '资本市场一度将其视作夕阳股']]
 },
 {
 badge: 'ERA III · 2014.02–2026+ · SATYA NADELLA CLOUD & AGENTIC ERA',
 title: '纳德拉时代（2014–2026+）：既治愈大公司内斗，又警惕温水煮青蛙',
 desc: '纳德拉前十年靠同理心与成长型思维拆除了 Windows 围墙，让微软市值飙升逾十倍；进入 2025–2026 年，面对 AI 竞速，他果断退役旧 SLT、设立商业 CEO 分担日常业务，并将财报重整为 Agents & Infra，使 FY26 营收达 $3,318亿、Q1 FY27 营业利润率创下 49.8% 历史极值。',
 kpis: [['$86.8B → $331.8B', 'FY14→FY26 营收扩张 3.8 倍'], ['$1.49M / 人', 'FY26 22.3万全职员工创收新高'], ['49.8%', 'Q1 FY27 历史最高营业利润率'], ['$678B RPO', '企业级云与 AI 长期锁单池']]
 }
 ];
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 var ts = this.querySelectorAll('.cc-era-tab');
 for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('active', ts[i] === t);
 var er = ERAS[idx];
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = er.title;
 document.getElementById('eraDesc').textContent = er.desc;
 document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) {
 return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 });

 var hub = document.getElementById('companySubfolderHub');
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
 } else if (msg) showToast(msg);
 }
 });

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
 var yrs = ['2014', '2017', '2020', '2022', '2024', '2026'];
 var revEmp = [0.68, 0.78, 0.88, 0.90, 1.08, 1.49];
 var maxV = 1.70;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(2) + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (revEmp[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 4 ? pal.violet : pal.blue;
 if (i === 5) ctx.fillStyle = pal.green;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText('FY' + y.slice(2), x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: 'FY' + y + ' 人均创收', body: '每位全职员工年创收 $' + revEmp[i].toFixed(2) + 'M（较纳德拉接任初期翻倍以上）' });
 });
 } else {
 var lyrs = ['FY18', 'FY20', 'FY22', 'FY24', 'FY26'];
 var rdB = [14.7, 19.3, 24.5, 29.5, 35.6];
 var ocfB = [43.9, 60.7, 89.0, 118.5, 182.9];
 var maxF = 200;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 50, ky = pad.top + ph - (kv / maxF) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 function plot(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (lyrs.length - 1)) * pw, py = pad.top + ph - (v / maxF) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (lyrs.length - 1)) * pw, py = pad.top + ph - (v / maxF) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1) + 'B', px, py - 8);
 hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: lyrs[idx] + ' · ' + name, body: '$' + v.toFixed(1) + 'B（跨栈统一平台放大研发投资回报率）' });
 });
 }
 lyrs.forEach(function (lb, idx) {
 var px = pad.left + (idx / (lyrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 plot(ocfB, pal.green, '年度经营现金流 OCF');
 plot(rdB, pal.blue, '统一研发池投入 R&D');
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
 { name: 'NVIDIA (扁平全栈)', emp: 5.14, opm: 62.0, col: pal.violet },
 { name: 'Microsoft (双核跨栈)', emp: 1.49, opm: 46.8, col: pal.blue },
 { name: 'Meta (黑客敏捷)', emp: 2.42, opm: 41.5, col: pal.green },
 { name: 'Apple (单一P&L)', emp: 2.87, opm: 33.9, col: pal.amber },
 { name: 'Alphabet (控股研究)', emp: 1.92, opm: 33.0, col: pal.blue }
 ];
 var isOpm = (state.gView === 'opm');
 var maxX = isOpm ? 70 : 5.8;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isOpm ? p.opm : p.emp;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (idx === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isOpm ? (val.toFixed(1) + '%') : ('$' + val.toFixed(2) + 'M'), pad.left + bl + 7, cy + 4);
 hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '全年营业利润率 ' + p.opm.toFixed(1) + '% (MSFT Q1 FY27 达 49.8%) · 人均创收 $' + p.emp.toFixed(2) + 'M' });
 });
 }

 // C4: De-Layering & AI Velocity Simulator
 var entropySeries = [94, 90, 81, 70, 56];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['4层(初创)', '6层(2026新)', '8层', '10层(旧SLT)', '12层(僵化)'];
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
 var layers = parseInt(document.getElementById('rngLayers').value, 10);
 var aiPen = parseInt(document.getElementById('rngAiPen').value, 10);
 var reuse = parseInt(document.getElementById('rngReuse').value, 10);
 document.getElementById('valLayers').textContent = layers + ' 层' + (layers <= 6 ? ' (扁平敏捷)' : layers <= 9 ? ' (常规大厂)' : ' (官僚淤塞)');
 document.getElementById('valAiPen').textContent = aiPen + '%';
 document.getElementById('valReuse').textContent = reuse + '%';

 var layerPenalty = Math.max(0, (layers - 4) * 5.2);
 var aiBoost = (aiPen - 50) * 0.42;
 var reuseBoost = (reuse - 50) * 0.35;
 var velocity = Math.max(25, Math.min(99, Math.round(78 - layerPenalty + aiBoost + reuseBoost)));
 var revEmp = Math.max(0.85, (1.15 + (aiPen / 100) * 0.38 + (reuse / 100) * 0.25 - (layers - 6) * 0.04)).toFixed(2);
 var opm = Math.max(36.0, Math.min(54.5, (42.5 + (aiPen - 50) * 0.09 + (reuse - 50) * 0.08 - (layers - 6) * 0.85))).toFixed(1);

 document.getElementById('outVelocity').textContent = velocity + ' / 100';
 document.getElementById('outRevEmp').textContent = '$' + revEmp + 'M';
 document.getElementById('outOpm').textContent = opm + '%';

 entropySeries = [4, 6, 8, 10, 12].map(function (lv) {
 return Math.max(22, Math.min(99, 78 - Math.max(0, (lv - 4) * 5.2) + aiBoost + reuseBoost));
 });
 drawEntropyCanvas();
 }
 ['rngLayers', 'rngAiPen', 'rngReuse'].forEach(function (id) {
 document.getElementById(id).addEventListener('input', updateEntropySim);
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
 { id: 'sec-c0', t: 'C0 单一公司拓扑与双核分治沙盘', s: '现行双核跨栈架构 vs 鲍尔默旧时代王国割据对比' },
 { id: 'sec-c1', t: 'C1 四大文化底层代码与带宽罗盘', s: '三问考核法 · 退役旧SLT · SFI薪酬挂钩 · 多模型实用主义' },
 { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1975–2026+)', s: '盖茨 / 鲍尔默 / 纳德拉 · 人均创收跃迁至 $1.49M' },
 { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱与阴阳辩证', s: '微软 vs 苹果 / 亚马逊 / 谷歌 营业利润率与哲学对照' },
 { id: 'sec-c4', t: 'C4 22万人去官僚化推演器与六律体检', s: '管理层级压缩模拟 · 6项组织健康度持久化核查清单' }
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
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
 if (e.key === 'Escape') {
 qPop.classList.remove('open');
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

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]');
 var done = 0;
 for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
 document.getElementById('auditScoreChip').textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项';
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

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 updateEntropySim();
 drawAll();
 })();
 