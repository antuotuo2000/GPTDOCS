
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_AUDIT_KEY = 'spcx_culture_bp_audit_v1';

 var state = { theme: 'dark', lang: 'zh', quad: 0, era: 2, eView: 'revemp', gView: 'emp' };
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

 // C0: Interactive Topology Switcher
 document.getElementById('topoSwitch').addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var mode = b.getAttribute('data-topo');
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var stage = document.getElementById('topoStage');
 if (mode === 'spacex') {
 stage.innerHTML =
 '<div class="cc-topo-hub mono">Musk (首席工程师) × Shotwell (总裁/COO) · 车间驻场直通</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>推进 RE (猛禽/梅林)</b>自铸高温合金涡轮泵，试车台数小时反馈改图</div>' +
 '<div class="cc-spoke"><b>箭体结构 RE (Starbase)</b>30X 不锈钢露天自动卷焊，砍掉着陆腿交发射塔夹取</div>' +
 '<div class="cc-spoke"><b>航电与飞控软件 RE</b>三冗余工业级芯片替代天价抗辐射古董芯片</div>' +
 '<div class="cc-spoke"><b>星链产线 RE (Bastrop)</b>自研相控阵 ASIC 与激光器，周产 60+ 颗整星</div>' +
 '<div class="cc-spoke"><b>发射周转团队 (Pad)</b>165发/年流水线，单助推器 37次复用极速检修</div>' +
 '<div class="cc-spoke"><b>SpaceXSI (Grok+Cursor)</b>1.7GW 算力集群 + 开发者代码闭环反哺飞控与轨道AI</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：白痴指数贴近物理原材料底线，猎鹰内部发射边际成本降至 ~$1,500万，星舰 15 发即攻克二级飞船陆地捕获</div>';
 } else {
 stage.innerHTML =
 '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统军工主承包商总部 · 成本加成 (Cost-Plus) + 跨州政治选区分包</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>一级发动机分包商</b>沿用数十年前老图纸，单台引擎报价数千万美元</div>' +
 '<div class="cc-spoke silo"><b>二级阀门/机电供应商</b>三级转包层层加价 30%，单个阀门售价超 $10万</div>' +
 '<div class="cc-spoke silo"><b>独立软件外包院所</b>与硬件产线物理隔离，接口变更需数月委员会审批</div>' +
 '<div class="cc-spoke silo"><b>无复用一次性设计</b>每次发射将整枚数亿美元火箭扔进大海以维持续订</div>' +
 '<div class="cc-spoke silo"><b>纸面合规审查团</b>数千页文档验收替代真机试飞，惧怕任何试验失败</div>' +
 '<div class="cc-spoke silo"><b>固定价转型休克</b>一旦改签固定总价（如 Starliner）即爆发十亿级超支亏损</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">恶果：典型的老牌航天困局——激励机制奖励延期与复杂化，每公斤入轨成本长期锁死在 $14,000–$50,000+</div>';
 }
 });

 // C1: 2x2 Quadrant Selector + Engineering Bandwidth Dial
 var QUADS = [
 {
 badge: "Q1 · MUSK'S 5-STEP ENGINEERING ALGORITHM",
 title: '五步法顺序铁律：绝不在第 1、2 步完成前跳到自动化',
 desc: '马斯克总结出制造业最大的陷阱就是“把本该删掉的愚蠢工序高度自动化”。在猛禽引擎从 V1 进化到 V3 的过程中，团队砍掉了超过三分之二的外部法兰接口与冗余传感器，推力大幅提升而制造成本腰斩。',
 alloc: [42, 33, 15, 10]
 },
 {
 badge: 'Q2 · IDIOT INDEX & AUTOMOTIVE SUPPLY VELOCITY',
 title: '白痴指数审判：把神秘的“宇航级溢价”打回基础物理学原形',
 desc: '当无线电供应商开价 $10万、碳纤维厂商开价 $130/kg 时，SpaceX 工程师直接核算铝锭、不锈钢卷板与消费级 FPGA 芯片成本，亲手搭建洁净室与冲压焊装线，使星链卫星和相控阵终端实现消费电子级平价量产。',
 alloc: [35, 40, 13, 12]
 },
 {
 badge: 'Q3 · RESPONSIBLE ENGINEER & SKIP-LEVEL ACCESS',
 title: '责任工程师（RE）单点负责：没有“质量部背锅”，只有端到端主人翁',
 desc: '在 SpaceX，如果一枚阀门在发射台读数异常，站在控制台前拍板排障的就是当初画下这张图纸并盯完试车的同一位年轻 RE。跨部门沟通严禁通过双方经理绕圈，极大消灭了信息失真与官僚延迟。',
 alloc: [28, 45, 18, 9]
 },
 {
 badge: 'Q4 · DUAL-CORE STEWARDSHIP (MUSK × SHOTWELL)',
 title: '马斯克 × 肖特维尔：硅谷商业史上最稳固的“梦想家+实干统帅”组合',
 desc: '正如苹果曾有乔布斯与库克，SpaceX 自 2002 年起便拥有马斯克与肖特维尔的黄金双核：马斯克把技术指标推向物理极限，肖特维尔则把每一次疯狂突破转化为全球航司、五角大楼与 1,360 万家庭信赖的现金牛。',
 alloc: [30, 28, 25, 17]
 }
 ];
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]');
 if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 state.quad = idx;
 var cs = this.querySelectorAll('.cc-quad-card');
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

 // C2: 3-Era Scrubber
 var ERAS = [
 {
 badge: 'ERA I · 2002–2012 · GARAGE REBEL & SURVIVAL',
 title: '车库海盗求生期：从夸贾林三连败绝境到商业飞船首接国际空间站',
 desc: '面对波音与洛马合资的 ULA 垄断，几百名年轻工程师在太平洋孤岛顶着盐雾腐蚀抢修火箭。2008 年猎鹰 1 号第 4 发绝境入轨后，SpaceX 迅速将经验复用于九机并联猎鹰 9 号与货运龙飞船，奠定了“垂直自造 + 固定总价”的生存基因。',
 kpis: [['$100M 起步', '马斯克倾注全部早期自有资金'], ['第 4 发成功', '2008.09.28 猎鹰1号生死线入轨'], ['$1.6B 合同', 'Shotwell 赢下 NASA 救命货运大单'], ['>80% 自制', '早期被迫自研梅林引擎与航电']]
 },
 {
 badge: 'ERA II · 2013–2025 · REUSABILITY & STARLINK MONOPOLY',
 title: '复用霸权扩张期：把一级火箭回收变成日常，在轨点亮万颗星链印钞机',
 desc: '2015 年底攻克轨道火箭垂直回收后，猎鹰 9 号发射频次从每年十余发飙升至 2025 年的 165 发全胜。公司果断将内部廉价运力倾注于星链全球组网，于 2024 年将总部迁往得州 Starbase 死磕不锈钢星舰，将一级市场要约估值推至 $8,000亿。',
 kpis: [['165 发/年', '2025 全年猎鹰系列 100% 任务成功'], ['11,100+ 颗', '全球最大低轨光学激光卫星星座'], ['$18.67B', 'FY2025 S-1 披露全年总营收'], ['$800B 估值', '2025.12 上市前末轮内部要约估值']]
 },
 {
 badge: 'ERA III · 2026+ · PUBLIC SPACE-CONNECTIVITY-SI GIANT',
 title: '2026 史诗级合体：把火箭制造的物理极限纪律注入超级智能（SI）',
 desc: '2026 年成为 SpaceX 组织边界彻底重构的分水岭：2 月吸收合并 xAI，4 月调派原星链工程副总裁 Michael Nicolls 挂帅 SpaceXAI 整肃交付节奏，6 月以 $135/股 完成人类史上最大规模 IPO（募资 $862.5亿），8 月全股票并购 AI 编程龙头 Cursor，11 月星舰 Flight 15 实现发射塔捕获轨道返回飞船。',
 kpis: [['$58.3B', 'Q3 2026 年化总营收运行率'], ['$2.58M / 人', '22,621 名员工超高年化人效'], ['86.6%', 'B类股投票权锁死长期工程路线'], ['Flight 15', '二级轨道飞船首次陆地筷子捕获']]
 }
 ];
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 state.era = idx;
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

 // Suite Hub Filter & Navigation
 
 

 // Canvas Helpers
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
 var yrs = ['2018', '2021', '2023', '2024', '2025(S-1)', 'Q3 26年化'];
 var revEmp = [0.32, 0.42, 0.76, 0.90, 1.03, 2.58];
 var maxV = 2.9;
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
 ctx.fillStyle = i === 5 ? pal.green : (i >= 3 ? pal.violet : pal.blue);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 人均年创收', body: '每位员工年化创收 $' + revEmp[i].toFixed(2) + 'M（星链规模效应与 SI 算力并表共同放大）' });
 });
 } else {
 var ryrs = ['2018', '2020', '2022', '2024', '2025', '2026.08'];
 var maxReuse = [3, 7, 15, 24, 31, 37];
 var maxR = 42;
 for (var k = 0; k <= 3; k++) {
 var kv = k * 14, ky = pad.top + ph - (kv / maxR) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '次', pad.left - 8, ky + 4);
 }
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 maxReuse.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxR) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 maxReuse.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxR) * ph;
 ctx.fillStyle = idx === 5 ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4.4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v + '次', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(ryrs[idx], px, pad.top + ph + 20);
 hits.eraCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: ryrs[idx] + ' 助推器复用寿命', body: '单枚猎鹰 9 号 Block 5 助推器最高飞行纪录达 ' + v + ' 次（远超最初设计的 10 次目标）' });
 });
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.genomeCanvas = [];
 var pad = { top: 24, right: 48, bottom: 26, left: 128 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 var peers = [
 { name: 'NVIDIA (扁平芯片)', emp: 5.14, mfg: 5, col: pal.violet },
 { name: 'Apple (单一P&L)', emp: 2.87, mfg: 12, col: pal.blue },
 { name: 'SpaceX (自造全栈)', emp: 2.58, mfg: 82, col: pal.green },
 { name: 'Tesla (超级工厂)', emp: 0.70, mfg: 72, col: pal.amber },
 { name: 'Lockheed (军工总包)', emp: 0.61, mfg: 35, col: pal.blue },
 { name: 'Boeing (多层分包)', emp: 0.49, mfg: 28, col: pal.red }
 ];
 var isEmp = (state.gView === 'emp');
 var maxX = isEmp ? 5.8 : 100;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.mfg;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 20, bl = Math.max(8, (val / maxX) * pw);
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = idx === 2 ? pal.green : pal.sub;
 ctx.font = (idx === 2 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : ('~' + val + '%'), pad.left + bl + 7, cy + 4);
 hits.genomeCanvas.push({ x: pad.left, y: cy - 12, w: pw, h: 24, title: p.name, body: '年化人效 $' + p.emp.toFixed(2) + 'M/人 · 自有工厂硬件制造内化度约 ~' + p.mfg + '%' });
 });
 }

 // C4: Bureaucracy & Idiot-Index Entropy Simulator
 var entropySeries = [96, 92, 74, 52, 31];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['15%外包(SPCX)', '30%外包', '50%外包', '70%外包', '85%(老军工)'];
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
 ctx.fillStyle = i === 0 ? pal.green : pal.violet;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(Math.round(v), px, py - 7);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
 ctx.fillText(lbls[i], px, pad.top + ph + 15);
 });
 }

 function updateEntropySim() {
 var outPct = parseInt(document.getElementById('rngOut').value, 10);
 var lay = parseInt(document.getElementById('rngLay').value, 10);
 var delPct = parseInt(document.getElementById('rngDel').value, 10);

 document.getElementById('valOut').textContent = outPct + '%' + (outPct <= 25 ? ' (SpaceX自造区)' : outPct <= 55 ? ' (混合分包)' : ' (传统转包泥潭)');
 document.getElementById('valLay').textContent = lay + ' 层' + (lay <= 5 ? ' (超扁平)' : lay <= 9 ? ' (矩阵化)' : ' (金字塔官僚)');
 document.getElementById('valDel').textContent = delPct + '%';

 var velocity = Math.max(15, Math.min(99, Math.round(92 - (outPct - 18) * 0.65 - (lay - 4) * 4.2 + (delPct - 75) * 0.35)));
 var idiotIdx = Math.max(1.6, (1.8 + (outPct / 18) * 1.4 + (lay - 3) * 0.85 - (delPct / 100) * 1.3)).toFixed(1);
 var costSave = Math.max(5, Math.min(92, Math.round(94 - idiotIdx * 3.4)));

 document.getElementById('outVelocity').textContent = velocity + ' / 100';
 document.getElementById('outIdiot').textContent = idiotIdx + 'x';
 document.getElementById('outCostSave').textContent = '-' + costSave + '%';

 entropySeries = [15, 30, 50, 70, 85].map(function (o) {
 return Math.max(15, Math.min(99, 92 - (o - 18) * 0.72 - (lay - 4) * 3.8 + (delPct - 75) * 0.3));
 });
 drawEntropyCanvas();
 }
 ['rngOut', 'rngLay', 'rngDel'].forEach(function (id) {
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
 tip.style.left = Math.min(window.innerWidth - 305, ev.clientX + 14) + 'px';
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
 if (sl) sl.setAttribute('aria-pressed', state.theme === 'light' ? 'true' : 'false');
 if (sd) sd.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh' ? 'true' : 'false'); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en' ? 'true' : 'false'); }
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

 // Quick Jump ⌘K
 var QITEMS = [
 { id: 'sec-c0', t: 'C0 零转包拓扑与军工成本加成悖论', s: '扁平 RE + >80%自造 vs 传统 Cost-Plus 分包对比沙盘' },
 { id: 'sec-c1', t: 'C1 四大文化代码与五步算法罗盘', s: '五步工程算法 · 白痴指数 · 责任工程师 RE · 双核统御' },
 { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (2002–2026+)', s: '夸贾林求生 / 复用与星链 / $86.3B 上市与太空AI合体' },
 { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱对比', s: 'SpaceX vs Apple / NVIDIA / Tesla / 波音洛马对照' },
 { id: 'sec-c4', t: 'C4 白痴指数熵增模拟器与六律体检', s: '外包率与层级压力测试 · 6项上市后防退化持久化清单' }
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
 