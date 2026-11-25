
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_AUDIT_KEY = 'ant_culture_bp_audit_v1';

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
 text: dark ? '#F3F6F9' : '#0F172A',
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
 if (item.classList.contains('active')) window.scrollTo({ top: 0, behavior: 'smooth' });
 else showToast('同套独立网页文件：' + fn + '（请在已下载的四件套中打开）');
 }
 });
 }
 document.querySelectorAll('[data-suite-jump]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 showToast('Anthropic 深度研究四件套 · 第 04 篇：企业文化与组织操作系统');
 });
 });

 // C0: Interactive Topology Switcher
 var topoSwitch = document.getElementById('topoSwitch');
 if (topoSwitch) {
 topoSwitch.addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var mode = b.getAttribute('data-topo');
 var bs = topoSwitch.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var stage = document.getElementById('topoStage');
 if (mode === 'ant') {
 stage.innerHTML =
 '<div class="cc-topo-hub mono">PBC 公益法人 × LTBT (Class T 过半董事) × Founders LLC (Class F 50.1%)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>Dario (CEO 科研核)</b>仅对接核心科研与幕僚长，专注缩放与安全架构</div>' +
 '<div class="cc-spoke"><b>Daniela (总裁运营核)</b>统合 CTO / CPO / CFO 与 1.19万家企业大客交付</div>' +
 '<div class="cc-spoke"><b>Jared Kaplan (RSO)</b>首席科学官兼安全刹闸官，执行 ASL-3/4 硬阈值</div>' +
 '<div class="cc-spoke"><b>Chris Olah &amp; Leike</b>机械可解释性白盒测绘 + 超级对齐科学攻关</div>' +
 '<div class="cc-spoke"><b>Anthropic Labs</b>Krieger &amp; Mann 极速孵化 Claude Code 与 Mythos</div>' +
 '<div class="cc-spoke"><b>Class N 战略股东池</b>Google/AWS/NVDA 提供千亿算力但 0% 投票权</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：7位联创近六年 0 人流失，研究与商业双速狂飙，Q3 单季营收冲上 $16.96B 且安全口碑全行业第一</div>';
 } else {
 stage.innerHTML =
 '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">脆弱对照：非营利套壳封顶利润架构 或 传统大厂多级审批科层</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>董事会定位撕裂</b>纯学术非营利董事与千亿商业估值诉求直接对撞</div>' +
 '<div class="cc-spoke silo"><b>安全团队边缘化</b>商业抢跑压力下被抽干算力配额，引发骨干集体辞职</div>' +
 '<div class="cc-spoke silo"><b>单一云巨头锁死</b>独家绑定单一云股东，丧失异构芯片议价与多云分发权</div>' +
 '<div class="cc-spoke silo"><b>CEO 行政过载</b>最高科学家陷于融资公关与人事内耗，偏离底层技术细节</div>' +
 '<div class="cc-spoke silo"><b>存量业务掣肘</b>大厂内部担心 AI 冲击既有高毛利搜索广告，投鼠忌器</div>' +
 '<div class="cc-spoke silo"><b>事后合规补丁</b>缺乏事前 RSP 硬阈值，模型上线引发安全事故后仓促召回</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：要么爆发宫斗导致核心联创分崩离析，要么沦为官僚机构错失 Claude Code 级原生应用爆发</div>';
 }
 });
 }

 // C1: 2x2 Quadrant Selector + Compute/Research Bandwidth Dial
 var QUADS = [
 {
 badge: 'Q1 · SCALING LAWS × CONSTITUTIONAL AI',
 title: '物理学家实证文化：把“安全对齐”变成可预测、可缩放的数学公式',
 desc: '在 Anthropic，安全从不靠拍脑袋写敏感词黑名单，而是由缩放定律原创团队用“AI 宪法原则”引导模型自我生成批判与修正样本（RLAIF），使模型越聪明、理解伦理边界的泛化能力越强。',
 alloc: [50, 24, 15, 11]
 },
 {
 badge: 'Q2 · MECHANISTIC INTERPRETABILITY',
 title: '白盒神经元显微术：人类第一次真正看懂大模型“脑子里在想什么”',
 desc: 'Chris Olah 团队证明，通过提取单义性特征（Monosemanticity），工程师不仅能观察 Claude 如何规划代码架构，还能直接识别潜在的欺骗或危险生物知识激活回路，为高危企业场景提供底层可验证性。',
 alloc: [40, 32, 14, 14]
 },
 {
 badge: 'Q3 · RSP v3.0 & DUAL-TRACK SAFEGUARDS',
 title: '事前红线熔断与同权重双轨制：既守住人类底线，又释放顶级生产力',
 desc: '当 2026 年 Mythos 级模型展现出极强的自动化漏洞挖掘能力时，RSP 框架没有一刀切扼杀创新，而是分流出内置实时拦截回退的 Fable 5.2（超 95% 正常会话零干扰）与面向 50+ 防御机构的 Mythos 5.2。',
 alloc: [42, 20, 16, 22]
 },
 {
 badge: 'Q4 · ANTHROPIC LABS & 80% PHILANTHROPY',
 title: '极客内部自用孵化（Dogfooding）+ 无私公心凝聚世界级大脑',
 desc: 'Mike Krieger 与 Ben Mann 领衔的 Anthropic Labs 专门捕捉研究员内部自造的高频神器（如最初运行在终端里的 Claude Code）并迅速推向全球市场；而联创 80% 裸捐誓言与 5% 公益基金让顶尖学者甘愿长期并肩作战。',
 alloc: [38, 18, 32, 12]
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
 var ids = [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]];
 ids.forEach(function (pair) {
 document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
 document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
 });
 });
 }

 // C2: 3-Stage Evolution Scrubber
 var ERAS = [
 {
 badge: 'STAGE I · 2021–2023.08 · ACADEMIC SAFETY SPINOUT',
 title: '创世潜伏期：七君子集体出走，宁可错失首发风头也要先把“宪法”立稳',
 desc: '2021 年 1 月注册为特拉华州公益公司（PBC），获得 Jaan Tallinn、Dustin Moskovitz 等 A 轮 $1.24亿支持。团队保持极度扁平的学术研讨会氛围，2022 年练成初代 Claude 后主动克制不发，全力攻克 Constitutional AI 与机械可解释性底座。',
 kpis: [['7 / 7 联创', 'GPT-3 与缩放定律核心班底'], ['PBC 法人', '首日即确立公益与商业双目标'], ['2023.03', 'Claude 1 经过充分红队后首发'], ['$41M', 'FY2023 商业化首年试水营收']]
 },
 {
 badge: 'STAGE II · 2023.09–2025.12 · LTBT CHARTER & HYPER-SCALE',
 title: '制度立宪与破局期：设立 LTBT 独立信托，凭 Claude 3.5 与 Claude Code 征服开发者',
 desc: '2023 年 9 月正式运转 Long-Term Benefit Trust 与首版 RSP，同时引入亚马逊与谷歌双云战略资本却保持模型中立。2024 年引入前 Instagram 联创 Mike Krieger 任 CPO、前 Airbnb 财务高管 Krishna Rao 任 CFO，2025 年发布 Claude 4 与 Claude Code，全年营收跃升逾 10 倍至 $45.9亿。',
 kpis: [['$0.39B → $4.59B', 'FY24 至 FY25 营收暴涨 +1,088%'], ['ASL-3 激活', '2025.05 随 Opus 4 落地高阶防护'], ['~2,300 人', '2025 年末精锐团队规模'], ['MCP 开源', '确立全球 Agent 上下文连接标准']]
 },
 {
 badge: 'STAGE III · 2026+ · LABS SPLIT & $1.5T PUBLIC CONSTITUTION',
 title: '2026 重组与 IPO 定型：把“0到1前沿冒险”与“1到100企业稳态”彻底分轨',
 desc: '迈入 2026 年，面对年化数百亿美元企业订单洪峰，Daniela 与 Dario 果断推进组织升级：由 Mike Krieger 与 Ben Mann 组建独立的 Anthropic Labs 专攻前沿原生应用与受控安全实验（Project Glasswing），提拔 Ami Vora 出任 CPO 联手 CTO Rahul Patil 夯实云平台，并以五层股权结构成功登陆纳斯达克（ANT）。',
 kpis: [['$67.8B', 'Q3 2026 年化确认营收'], ['$12.8M / 人', '按 Q3 年化测算极致人效'], ['50.1%', 'Class F 单一股锁定投票权'], ['22 款新模型', '18个月高频高质量交付']]
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

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.eView === 'revemp') {
 var yrs = ['2023', '2024', '2025.09', '2025末', '26.09 TTM', "Q3'26年化"];
 var revEmp = [0.10, 0.37, 1.40, 2.00, 6.66, 12.80];
 var maxV = 14.5;
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
 ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 人均创收', body: '每位全职员工创造营收 $' + revEmp[i].toFixed(2) + 'M' });
 });
 } else {
 var lyrs = ['FY2024', 'FY2025', '9M 2025', '9M 2026'];
 var rdPct = [589.4, 138.2, 141.2, 57.9];
 var gaPct = [45.6, 24.5, 13.7, 11.5];
 var maxF = 620;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxF / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
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
 ctx.fillText(v.toFixed(1) + '%', px, py - 8);
 hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: lyrs[idx] + ' · ' + name, body: '占同期总营收比例: ' + v.toFixed(1) + '% (S-1/A 附注8)' });
 });
 }
 lyrs.forEach(function (lb, idx) {
 var px = pad.left + (idx / (lyrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 plot(rdPct, pal.violet, '研发费用率 R&D %');
 plot(gaPct, pal.green, '一般及行政管理费率 G&A %');
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
 { name: 'NVIDIA (扁平算力)', emp: 7.21, gm: 74.7, col: pal.violet },
 { name: 'Anthropic (TTM口径)', emp: 6.66, gm: 83.6, col: pal.blue },
 { name: 'Meta (黑客开源)', emp: 3.26, gm: 81.0, col: pal.green },
 { name: 'Apple (单一P&L)', emp: 2.87, gm: 48.8, col: pal.amber },
 { name: 'Microsoft (事业部)', emp: 1.49, gm: 67.9, col: pal.blue }
 ];
 var isEmp = (state.gView === 'emp');
 var maxX = isEmp ? 8.2 : 95;
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
 hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: 'TTM人均创收 $' + p.emp.toFixed(2) + 'M · 综合毛利率 ' + p.gm.toFixed(1) + '%' });
 });
 }

 // C4: Safety-Velocity Tension Simulator + Mini Canvas
 var entropySeries = [62, 82, 95, 91, 78];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['2%裸奔', '10%浅对齐', '22%(ANT)', '35%重审查', '45%僵化'];
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
 var safe = parseInt(document.getElementById('rngSafe').value, 10);
 var cls = parseInt(document.getElementById('rngCls').value, 10);
 var hire = parseInt(document.getElementById('rngHire').value, 10);
 document.getElementById('valSafe').textContent = safe + '%' + (safe >= 16 && safe <= 28 ? ' (黄金平衡区)' : safe < 16 ? ' (事故高危区)' : ' (过度消耗区)');
 document.getElementById('valCls').textContent = cls + '%';
 document.getElementById('valHire').textContent = hire + '%';

 // Enterprise trust drops sharply if safety compute < 15%; velocity drops if > 32% or classifier false-positives (low cls)
 var trust = Math.max(30, Math.min(99, Math.round(52 + safe * 2.2 - Math.max(0, safe - 28) * 0.8 + (cls - 80) * 0.4)));
 var vel = Math.max(35, Math.min(98, Math.round(86 + (cls - 85) * 0.9 - Math.abs(safe - 20) * 0.85 - Math.max(0, hire - 150) * 0.12)));
 var density = Math.max(40, Math.min(98, Math.round(96 - Math.max(0, hire - 80) * 0.18 + (safe >= 15 ? 4 : -10))));

 document.getElementById('outTrust').textContent = trust + ' / 100';
 document.getElementById('outVel').textContent = vel + ' / 100';
 document.getElementById('outDensity').textContent = density + ' / 100';

 entropySeries = [2, 10, 22, 35, 45].map(function (s) {
 var tr = Math.min(99, 52 + s * 2.2 - Math.max(0, s - 28) * 0.8);
 var vl = Math.min(98, 86 + (cls - 85) * 0.7 - Math.abs(s - 20) * 0.95);
 return Math.max(30, Math.min(98, (tr * 0.52 + vl * 0.48)));
 });
 drawEntropyCanvas();
 }
 ['rngSafe', 'rngCls', 'rngHire'].forEach(function (id) {
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
 { id: 'sec-c0', t: 'C0 五层股权与 LTBT 独立信托拓扑沙盘', s: 'PBC公益法人 · Class F 50.1% · 对比混合套壳治理暗礁' },
 { id: 'sec-c1', t: 'C1 四大文化底层代码与算力罗盘', s: 'Constitutional AI · 机械可解释性 · RSP硬阈值 · Labs自用孵化' },
 { id: 'sec-c2', t: 'C2 三阶组织演进时间轴 (2021–2026+)', s: '从 7 人分道到 5,300 人纳斯达克上市 · 年化人效 $12.8M' },
 { id: 'sec-c3', t: 'C3 全球 AI 机构基因光谱对比', s: 'Anthropic vs OpenAI / DeepMind / NVIDIA / Meta' },
 { id: 'sec-c4', t: 'C4 安全-速度张力推演器与宪章六律体检', s: '最优安全算力配比验证 · 6项上市后治理持久化核查' }
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

 // Sidebar Toggle, Export, Print & 6-Law Audit Persistence
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
 a.download = 'Anthropic_企业文化与组织操作系统.html';
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

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]');
 var done = 0;
 for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
 var chip = document.getElementById('auditScoreChip');
 if (chip) chip.textContent = '宪章自检核验：' + done + ' / ' + boxes.length + ' 项';
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
 showToast(chk.checked ? '已勾选该治理护城河指标' : '已取消勾选');
 });
 });
 refreshAuditChip();
 } catch (e) {}

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
 updateEntropySim();
 drawAll();
 })();
 