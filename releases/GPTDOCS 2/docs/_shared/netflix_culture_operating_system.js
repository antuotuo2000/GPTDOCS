
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_DENSITY_KEY = 'mui_clarity_density_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_AUDIT_KEY = 'nflx_culture_bp_audit_v1';

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
 var sL = document.getElementById('sideLightBtn'), sD = document.getElementById('sideDarkBtn');
 if (sL) sL.classList.toggle('active', state.theme === 'light');
 if (sD) sD.classList.toggle('active', state.theme === 'dark');
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深空暗色模式' : '已切换至清晰浅色模式');
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

 function applyDensity(d) {
 var mode = d === 'compact' ? 'compact' : 'comfort';
 document.body.setAttribute('data-density', mode);
 var bs = document.querySelectorAll('[data-density-btn]');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i].getAttribute('data-density-btn') === mode);
 try { localStorage.setItem(STORAGE_DENSITY_KEY, mode); } catch (e) {}
 drawAll();
 }

 // Suite Hub Filter
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
 var item = e.target.closest('.co-hub-item');
 if (item) {
 var jump = item.getAttribute('data-suite-jump');
 var msg = item.getAttribute('data-suite-toast');
 if (jump) {
 var el = document.querySelector(jump);
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 } else if (msg) {
 showToast(msg);
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
 var bs = topoSwitch.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var stage = document.getElementById('topoStage');
 if (mode === 'nflx') {
 stage.innerHTML =
 '<div class="cc-topo-hub mono">联席 CEO (Sarandos × Peters) 设定北极星战略情景与总预算池</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>CCO 全球内容统帅</b>Peter Rice · 对齐全球大片/直播资源分配情景</div>' +
 '<div class="cc-spoke"><b>本土制片知情船长</b>首尔/孟买/马德里总监无需层层签字直接买断爆款</div>' +
 '<div class="cc-spoke"><b>CPTO 产品技术栈</b>Elizabeth Stone · 算法、UI 与 InterPositive AI 一体化</div>' +
 '<div class="cc-spoke"><b>Ads Suite 船长</b>Amy Reinhard · 快速迭代 DAI 动态插播与 DSP 归因</div>' +
 '<div class="cc-spoke"><b>全员搜集异议机制</b>重大赌注强制公开征求反对意见（Farming for Dissent）</div>' +
 '<div class="cc-spoke"><b>阳光复盘 (Sunshine)</b>押错剧集不追责惩罚，但必须向全公司公开复盘教训</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：《怪奇物语》《鱿鱼游戏》《KPop Demon Hunters》等非共识神作免遭委员会阉割，全球同步引爆</div>';
 } else {
 stage.innerHTML =
 '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统传媒控股集团总部 · 层层绿灯委员会与渠道地盘保护</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>院线发行事业部</b>死守 45–90 天院线独占窗口，阻挠流媒体同步上线</div>' +
 '<div class="cc-spoke silo"><b>有线电视网事业部</b>为保传统收视费与广告，把最优质剧集截留在老频道</div>' +
 '<div class="cc-spoke silo"><b>绿灯审批委员会</b>十余名高管投票求稳，砍掉一切反套路原创，只拍续集翻拍</div>' +
 '<div class="cc-spoke silo"><b>海外区域发行商</b>无立项权，甚至将自家剧集分国别卖给外部平台割裂体验</div>' +
 '<div class="cc-spoke silo"><b>外包广告与CDN</b>技术栈外包导致高昂分成损耗与大促直播卡顿</div>' +
 '<div class="cc-spoke silo"><b>KPI 年终奖博弈</b>各部门年初压低目标、年底突击花预算保编制</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：典型的传统好莱坞困境——层层规避个人责任，最终流媒体连年亏损或被迫贱卖并购</div>';
 }
 });
 }

 // C1: 2x2 Quadrant Selector + Context Dial
 var QUADS = [
 {
 badge: 'Q1 · DREAM TEAM & KEEPER TEST',
 title: '留任测试铁律：为什么高管把 35%+ 精力花在校准“冠军阵容”？',
 desc: '奈飞认为，管理者的首要职责不是盯着员工每天几点打卡，而是确保球场上每一位队友都是你愿意拼尽全力挽留的顶级高手。一旦阵容出现短板，哪怕其人品温良、工作勤恳，也必须支付优厚遣散费换上更适配新阶段的球员（如 2026Q4 主动瘦身千岗向 AI 与直播集中）。',
 alloc: [36, 42, 18, 4]
 },
 {
 badge: 'Q2 · INFORMED CAPTAINS & DISSENT',
 title: '知情船长制：既消灭委员会和稀泥，又防止独断专行盲区',
 desc: '当奈飞决定是否斥资 $5.87 亿收购 InterPositive AI 或签下 NFL 感恩节赛事时，绝不搞“少数服从多数”投票，而是明确唯一一位知情船长。船长必须先撰写共享备忘录，邀请法务、财务、工程与内容同事在文档上实名打分并发表尖锐异议，充分消化后再独自拍板。',
 alloc: [46, 24, 25, 5]
 },
 {
 badge: 'Q3 · ZERO VACATION & EXPENSE RULES',
 title: '自由与责任对称：撤掉审批围栏的前提是“情景极度清晰”',
 desc: '之所以没有员工敢在零报销审批下肆意挥霍，是因为每位主管都清晰同步了部门成本效率情景，且财务团队定期开展事后抽查审计——一旦有人违背“以奈飞最大利益行事”底线滥用信任，将立即被公开清退。用极少数事后追责替代针对全员的事前繁琐设防。',
 alloc: [48, 30, 18, 4]
 },
 {
 badge: 'Q4 · 360° CANDOR & SUNSHINING',
 title: '极度坦诚与“晒太阳”：把失误从个人污点转化为全公司的公共资产',
 desc: '在传统企业，高管搞砸一个项目会本能地掩盖数据；而在奈飞，越是高级别船长押错大预算剧集或产品改版，越要站在全体会议聚光灯下“晒太阳（Sunshine it）”，坦诚拆解自己当初错判了哪条假设——坦诚认错反而赢得更高信任。',
 alloc: [34, 26, 35, 5]
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

 // C2: 3-Era Leadership Scrubber
 var ERAS = [
 {
 badge: 'ERA I · 1997–2012 · HASTINGS & MCCORD FOUNDING',
 title: '哈斯廷斯与麦考德奠基期：从 2001 泡沫裁员中提炼出《自由与责任》圣经',
 desc: '2001 年春季裁撤三分之一员工后留下的高密度精英团队逆势击溃拥有 9,000 家门店的百视达，并在 2007 年当 DVD 业务如日中天时毅然上线流媒体自革其命。2009 年公开发布的 125 页文化 PPT 被 Facebook COO 桑德伯格誉为“硅谷史上最重要的一份文件”。',
 kpis: [['$0 → $3.6B', '从邮寄红信封成长为北美流媒体先锋'], ['125页 PPT', '2009 首次向全世界开源奈飞文化密码'], ['0 天上限', '率先在上市公司废除带薪休假审批制'], ['自废 DVD', '主动拆分并颠覆自身高利润现金牛']]
 },
 {
 badge: 'ERA II · 2013–2022 · GLOBAL ORIGINALS & LOCAL CAPTAINS',
 title: '哈斯廷斯 × 萨兰多斯扩张期：百亿自制豪赌与跨文化《不拘一格》输出',
 desc: '从 2013 年首部原创剧《纸牌屋》打破电视网垄断，到 2016 年一夜点亮全球 130 多个国家，奈飞面临最严峻挑战：“硅谷式直率与分权能否在亚洲、欧洲和拉美奏效？”通过本土化调适 4A 反馈并赋予海外总监直接绿灯权，成功孵化《纸牌屋》《怪奇物语》《纸钞屋》与《鱿鱼游戏》。',
 kpis: [['$4.4B → $31.6B', '十年间全球总营收暴涨逾 7 倍'], ['190+ 国家', '建成人类史上首张全球同步电视网'], ['2.31亿户', '2022 年底奠定全球最大付费流媒体底座'], ['本土绿灯权', '非英语剧集反向风靡欧美主流市场']]
 },
 {
 badge: 'ERA III · 2023–2026+ · SARANDOS × PETERS CO-CEO MATURITY',
 title: '萨兰多斯 × 彼得斯双统帅时代：打破旧信条、精准区别“好流程与坏流程”',
 desc: '2023 年初 Greg Peters 与 Ted Sarandos 搭档联席 CEO 后，带领奈飞打赢流媒体史上最漂亮的翻身仗：推翻“不碰广告、不管借号”历史包袱，建成 2.5 亿月活自研广告栈；2024 年发布精炼版文化备忘录；2026 年 6 月创始人 Reed Hastings 平稳卸任董事，同年提拔 Elizabeth Stone 任 CPTO、引入 Peter Rice 任 CCO，营业利润率冲上 34.6% 巅峰。',
 kpis: [['$51.1B', 'FY2026E 全年营收指引 (+13%)'], ['$3.19M / 人', '~1.6万全职员工超高人效'], ['31.5% (Q3 34.6%)', '行业断层第一营业利润率'], ['+$2.8B 违约金', '理性弃追 WBD 尽显资本定力']]
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
 var yrs = ['2018', '2020', '2022', '2023', '2025', '2026E'];
 var revEmp = [2.22, 2.66, 2.47, 2.59, 2.82, 3.19];
 var maxV = 3.6;
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
 ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 人均年创收', body: '每位全职员工年创收 $' + revEmp[i].toFixed(2) + 'M（高人才密度梦之队效率）' });
 });
 } else {
 var lyrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var rdB = [2.71, 2.68, 2.93, 3.40, 4.05];
 var fcfB = [1.62, 6.93, 6.92, 9.46, 12.00];
 var maxF = 13.5;
 for (var k = 0; k <= 3; k++) {
 var kv = (k * 4.5).toFixed(1), ky = pad.top + ph - ((k * 4.5) / maxF) * ph;
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
 hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: lyrs[idx] + ' · ' + name, body: '$' + v.toFixed(2) + 'B' });
 });
 }
 lyrs.forEach(function (lb, idx) {
 var px = pad.left + (idx / (lyrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 plot(fcfB, pal.green, '年度自由现金流 FCF');
 plot(rdB, pal.violet, '产品与技术研发投入 Tech & Dev');
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
 { name: 'NVIDIA (全栈扁平)', emp: 5.14, om: 62.0, col: pal.violet },
 { name: 'Netflix (梦之队分权)', emp: 3.19, om: 31.5, col: pal.green },
 { name: 'Apple (单一P&L集权)', emp: 2.87, om: 33.0, col: pal.blue },
 { name: 'Spotify (敏捷小队)', emp: 2.66, om: 15.5, col: pal.amber },
 { name: 'Disney (事业部矩阵)', emp: 0.42, om: 10.0, col: pal.red }
 ];
 var isEmp = (state.gView === 'emp');
 var maxX = isEmp ? 5.8 : 70;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.om;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 22, bl = Math.max(6, (val / maxX) * pw);
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (idx === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
 hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '人均创收 ~$' + p.emp.toFixed(2) + 'M · 对标营业利润率 ' + p.om.toFixed(1) + '%' });
 });
 }

 // C4: Talent-Density vs Process Entropy Simulator
 var entropySeries = [94, 88, 76, 61, 44];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['10%审批(奈飞)', '25%轻流程', '45%常规', '65%繁琐', '85%官僚墙'];
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
 ctx.fillStyle = i === 0 ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(Math.round(v), px, py - 7);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
 ctx.fillText(lbls[i], px, pad.top + ph + 15);
 });
 }

 function updateEntropySim() {
 var den = parseInt(document.getElementById('rngDen').value, 10);
 var can = parseInt(document.getElementById('rngCan').value, 10);
 var proc = parseInt(document.getElementById('rngProc').value, 10);
 document.getElementById('valDen').textContent = den + '%' + (den >= 85 ? ' (冠军队)' : den >= 65 ? ' (普通大厂)' : ' (稀释警报)');
 document.getElementById('valCan').textContent = can + '%';
 document.getElementById('valProc').textContent = proc + '%' + (proc <= 20 ? ' (极简)' : proc <= 50 ? ' (适中)' : ' (官僚化)');

 // Hastings-Meyer formula: When density & candor are high, low process maximizes innovation; when density is low & process is low, chaos spikes!
 var chaosRisk = Math.max(4, Math.min(88, Math.round((100 - den) * 0.85 + (100 - can) * 0.45 - proc * 0.40)));
 var innov = Math.max(18, Math.min(99, Math.round(den * 0.65 + can * 0.35 - proc * 0.52 - Math.max(0, chaosRisk - 25) * 0.5)));
 var retain = Math.max(20, Math.min(98, Math.round(den * 0.55 + can * 0.35 - proc * 0.60 + 14)));

 document.getElementById('outInnov').textContent = innov + ' / 100';
 document.getElementById('outRetain').textContent = retain + ' / 100';
 var chaosEl = document.getElementById('outChaos');
 chaosEl.textContent = (chaosRisk <= 20 ? '低风险 (' : chaosRisk <= 45 ? '中度摩擦 (' : '失控警报 (') + chaosRisk + '%)';
 chaosEl.style.color = chaosRisk <= 20 ? 'var(--mui-success-text)' : (chaosRisk <= 45 ? 'var(--mui-warning-text)' : 'var(--mui-error-text)');

 entropySeries = [14, 25, 45, 65, 85].map(function (p) {
 var cr = Math.max(4, Math.min(88, (100 - den) * 0.85 + (100 - can) * 0.45 - p * 0.40));
 return Math.max(18, Math.min(99, den * 0.65 + can * 0.35 - p * 0.52 - Math.max(0, cr - 25) * 0.5));
 });
 drawEntropyCanvas();
 }
 ['rngDen', 'rngCan', 'rngProc'].forEach(function (id) {
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
 { id: 'sec-c0', t: 'C0 知情船长拓扑与自由责任悖论', s: '情景赋能 vs 传统好莱坞绿灯委员会对比沙盘' },
 { id: 'sec-c1', t: 'C1 四大文化底层代码与情景领导力罗盘', s: '留任测试 · 知情船长 · 零休假报销 · 阳光复盘 Sunshining' },
 { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1997–2026+)', s: '哈斯廷斯奠基 / 全球原创 / 双CEO与Rice新政 · 人效 $3.19M' },
 { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱与镜像双绝', s: '奈飞透明分权 vs 苹果集权保密 vs 迪士尼 IP 家族矩阵' },
 { id: 'sec-c4', t: 'C4 人才密度 vs 流程官僚模拟器与六律体检', s: '《不拘一格》熵增压力测试 · 6项文化健康度持久化核查' }
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

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
 setTimeout(drawAll, 60);
 } else {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 
 
 

 var dg = document.getElementById('densityGroup');
 if (dg) {
 dg.addEventListener('click', function (e) {
 var b = e.target.closest('[data-density-btn]');
 if (b) applyDensity(b.getAttribute('data-density-btn'));
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
 var boxes = document.querySelectorAll('[data-cchk]');
 var done = 0;
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
 if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 var initD = localStorage.getItem(STORAGE_DENSITY_KEY);
 if (initD) applyDensity(initD);
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
 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
 if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 updateEntropySim();
 drawAll();
 })();
 