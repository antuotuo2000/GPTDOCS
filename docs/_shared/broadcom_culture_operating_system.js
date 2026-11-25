
 (function () {
 'use strict';
 var state = { theme: 'dark', eView: 'revemp', gView: 'emp' };
 var hits = { eraCanvas: [], genomeCanvas: [] };
 function showToast(m) { var b = document.getElementById('muiSnackbar'); b.textContent = m; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 1800); }
 function pal() {
 var d = document.documentElement.getAttribute('data-theme') === 'dark';
 return { text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', tick: d ? '#94A3B8' : '#475569', grid: d ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: d ? '#3399FF' : '#0073E6', green: d ? '#22C55E' : '#16A34A', violet: d ? '#A78BFA' : '#7C3AED', amber: d ? '#FFB74D' : '#D97706' };
 }
 function prep(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(260, r.width || 480), h = Math.max(135, r.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function rr(ctx, x, y, w, h, r) { var rad = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.arcTo(x + w, y, x + w, y + h, rad); ctx.arcTo(x + w, y + h, x, y + h, rad); ctx.arcTo(x, y + h, x, y, rad); ctx.arcTo(x, y, x + w, y, rad); ctx.closePath(); }

 document.getElementById('topoSwitch').addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]'); if (!b) return;
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var s = document.getElementById('topoStage');
 if (b.getAttribute('data-topo') === 'avgo') {
 s.innerHTML = '<div class="cc-topo-hub mono">CEO (Hock Tan) × 中央资本配置与并购外科中心 (4位直报核心)</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>定制 XPU 事业部</b>独立 P&amp;L · 锁定 Google/Meta 多年合约</div><div class="cc-spoke"><b>核心交换芯片部</b>Tomahawk 6 (102.4T) · 60%+ 营业利润</div><div class="cc-spoke"><b>VMware VCF 部</b>订阅制改造 · 18个月利润率翻倍至70%</div><div class="cc-spoke"><b>光互连 DSP 部</b>200G/400G SerDes · 行业物理层垄断</div><div class="cc-spoke"><b>无线与存储部</b>FBAR 滤波器 + RAID · 现金奶牛供血</div><div class="cc-spoke"><b>CA / Symantec</b>大型机与安全 · 零冗余 SG&amp;A 高利润</div></div><div class="cc-topo-outcome">结果：每条业务线利润透明可审计，不达标即裁撤/出售；中央集权收割 46.2% FCF 用于还债、派息与下一次并购</div>';
 } else {
 s.innerHTML = '<div class="cc-topo-hub mono">CEO (John Ternus) × CFO 唯一全公司损益表 (Single Unified P&amp;L)</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>Apple Silicon</b>芯片架构跨 iPhone/Mac/iPad 无偿共享</div><div class="cc-spoke silo"><b>Software OS</b>六大同源操作系统共享内核与 AI</div><div class="cc-spoke silo"><b>Hardware Eng</b>不背部门利润考核，一切服从体验</div><div class="cc-spoke silo"><b>Industrial Design</b>拥有全局美学与体验一票否决权</div><div class="cc-spoke silo"><b>Services 生态</b>零内耗预装服务，收割 76.2% 毛利</div><div class="cc-spoke silo"><b>全球供应链</b>-58天负现金转换周期 + 540 直营店</div></div><div class="cc-topo-outcome">对比洞察：苹果靠“1张表”消除消费生态体验割裂；博通靠“24张表”剔除 B2B 平庸业务，殊途同归</div>';
 }
 });

 var QUADS = [
 { b: 'Q1 · #1/#2 FRANCHISE DISCIPLINE', t: '博通资本与组织精力分配罗盘（特许垄断筛选）', d: '与追求“普惠创新”的科技公司不同，博通将绝大部分资源集中于高壁垒核心研发、去杠杆还债与大客户联合工程，把行政与营销摩擦压缩至物理极限。', a: [52, 30, 16, 2] },
 { b: 'Q2 · 24 FEDERATED BU P&LS', t: '24 事业部独立 P&L：透明利润核算与费用控制', d: '每位事业部总经理直接背负本分部的毛利与直属研发费用责任，避免亏损或低增速部门躲在大公司总账下“搭便车”。', a: [48, 28, 22, 2] },
 { b: 'Q3 · 18-MONTH M&A SURGERY', t: '并购外科手术：砍掉冗余 SG&amp;A，释放 46% 自由现金流', d: '收购 VMware 后迅速削减重复职能与低效渠道，将 8,000+ 产品简化为 VCF 核心套件，18 个月内使营业利润率翻倍至 ~70%。', a: [40, 42, 16, 2] },
 { b: 'Q4 · 96% VARIABLE EQUITY &amp; 2030 PSU', t: '长期股权强绑定：Hock Tan 2030 $120B AI 军令状', d: '96% CEO 目标薪酬为绩效股票单元，要求 2028–2030 年 AI 营收达到 $90B–$120B 方可全额解锁，与长期股东利益完全捆绑。', a: [55, 25, 18, 2] }
 ];
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var c = e.target.closest('[data-quad]'); if (!c) return;
 var q = QUADS[parseInt(c.getAttribute('data-quad'), 10)];
 this.querySelectorAll('.cc-quad-card').forEach(function (x) { x.classList.toggle('active', x === c); });
 document.getElementById('dialBadge').textContent = q.b; document.getElementById('dialTitle').textContent = q.t; document.getElementById('dialDesc').textContent = q.d;
 for (var i = 0; i < 4; i++) { document.getElementById('p' + (i + 1)).textContent = q.a[i] + '%'; document.getElementById('b' + (i + 1)).style.width = q.a[i] + '%'; }
 });

 var ERAS = [
 { b: 'ERA I · 2006–2015 · AVAGO LBO DISCIPLINE', t: 'Avago 淬炼期：从惠普/安捷伦分拆，确立特许芯片铁律', d: '2006 年陈福阳出任 CEO，砍掉无差异化消费器件，专注 FBAR 射频、光纤通信与企业存储，并相继收购 CyOptics 与 LSI，为日后百亿级并购打下组织模板。', k: [['~$2B → $6.8B', '专注高壁垒模拟与存储'], ['#1/#2 铁律', '剥离非核心低毛利业务'], ['2009 IPO', '开启连续 15 年派息之路'], ['LSI 并购', '奠定数据中心存储控制器']] },
 { b: 'ERA II · 2016–2023 · BROADCOM &amp; INFRA SOFTWARE', t: '蛇吞象更名博通 &amp; 横扫 CA / Symantec 企业基础设施软件', d: '2016 年以 $370亿 并购博通公司并改名 Broadcom；高通收购受阻后迅速转向基础设施软件，相继整合 Brocade、CA Technologies 与 Symantec 企业安全，验证“芯片+软件”双引擎抗周期模型。', k: [['$37B 并购', '拿下以太网交换机霸权'], ['CA + Symantec', '切入大型机与企业安全'], ['~40% CAGR', '长期复利遥遥领先费城半导'], ['2022–2023', '布局 Google TPU AI 早期放量']] },
 { b: 'ERA III · 2023–2030+ · VMWARE VCF &amp; AI XPU', t: '双引擎超级周期：3.5D 定制 AI 芯片 × 102.4T 网络 × VMware 年金', d: '完成 $690亿 VMware 并购后，博通并未放慢步伐，反而借长期深耕 Google TPU 的经验全面收割全球超大规模云巨头定制 XPU 与开放以太网红利，Q3 FY26 单季营收冲上 $29.59B，Non-GAAP 营业利润率高达 67.9%。', k: [['~$105.9B', 'FY26E 隐含全年营收'], ['~$3.21M', 'FY26E 隐含人均创收'], ['67.9%', 'Q3 Non-GAAP 营业利润率'], ['$120B AI', 'Hock Tan FY30 PSU 最高目标']] }
 ];
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]'); if (!t) return;
 var er = ERAS[parseInt(t.getAttribute('data-era'), 10)];
 this.querySelectorAll('.cc-era-tab').forEach(function (x) { x.classList.toggle('active', x === t); });
 document.getElementById('eraBadge').textContent = er.b; document.getElementById('eraTitle').textContent = er.t; document.getElementById('eraDesc').textContent = er.d;
 document.getElementById('eraKpis').innerHTML = er.k.map(function (x) { return '<div class="cc-era-kpi"><b class="mono">' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
 });

 function drawEra() {
 var e = prep('eraCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal();
 var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var vals = state.eView === 'revemp' ? [1.66, 1.79, 1.39, 1.94, 3.21] : [16.3, 17.6, 19.4, 26.9, 47.5];
 var maxV = state.eView === 'revemp' ? 3.6 : 55;
 for (var g = 0; g <= 4; g++) { var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(state.eView === 'revemp' ? 1 : 0) + (state.eView === 'revemp' ? 'M' : 'B'), pad.left - 8, gy + 4); }
 var sw = pw / 5, bw = Math.min(42, sw * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sw + (sw - bw) / 2, bh = (vals[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 4 ? p.green : p.blue; rr(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + vals[i].toFixed(state.eView === 'revemp' ? 2 : 1) + (state.eView === 'revemp' ? 'M' : 'B'), x + bw / 2, yt - 6);
 ctx.fillStyle = p.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 });
 }

 function drawGenome() {
 var e = prep('genomeCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal();
 var pad = { top: 20, right: 44, bottom: 24, left: 122 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var ps = [
 { n: 'NVIDIA (扁平全栈)', emp: 5.14, opm: 62.0, c: p.violet },
 { n: 'Broadcom (24BU联邦)', emp: 3.21, opm: 67.9, c: p.green },
 { n: 'Apple (单一P&L)', emp: 2.87, opm: 33.0, c: p.blue },
 { n: 'Microsoft (事业部)', emp: 1.49, opm: 45.0, c: p.amber }
 ];
 var isEmp = state.gView === 'emp', maxX = isEmp ? 5.8 : 75, rh = ph / ps.length;
 ps.forEach(function (x, i) {
 var v = isEmp ? x.emp : x.opm, cy = pad.top + i * rh + rh / 2, bh = 22, bl = (v / maxX) * pw;
 ctx.fillStyle = p.grid; rr(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = x.c; rr(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = p.sub; ctx.font = (i === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(x.n, pad.left - 10, cy + 4);
 ctx.fillStyle = p.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(isEmp ? ('$' + v.toFixed(2) + 'M') : (v.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
 });
 }

 var entSeries = [67.5, 63.0, 56.0, 48.0, 41.0];
 function drawEntropy() {
 var e = prep('entropyCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal();
 var pad = { top: 18, right: 18, bottom: 24, left: 40 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbs = ['0%拖累', '5%(博通)', '15%', '30%', '45%臃肿'];
 ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = p.violet; ctx.lineWidth = 2.5; ctx.beginPath();
 entSeries.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 80) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 entSeries.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 80) * ph; ctx.fillStyle = i === 1 ? p.green : p.violet; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = p.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(v.toFixed(0) + '%', px, py - 7); ctx.fillStyle = p.tick; ctx.fillText(lbs[i], px, pad.top + ph + 15); });
 }
 function updEnt() {
 var drag = parseInt(document.getElementById('rDrag').value, 10), sga = parseFloat(document.getElementById('rSga').value), moat = parseInt(document.getElementById('rMoat').value, 10);
 document.getElementById('vDrag').textContent = drag + '%' + (drag <= 10 ? ' (极简纯净)' : ' (冗余拖累)');
 document.getElementById('vSga').textContent = sga.toFixed(1) + '%';
 document.getElementById('vMoat').textContent = moat + '%';
 var op = Math.max(25, Math.min(72, 68 - drag * 0.35 - (sga - 2.0) * 0.9 + (moat - 88) * 0.15));
 var fcf = Math.max(15, op * 0.68), yrs = (2.0 * (46 / fcf)).toFixed(1);
 document.getElementById('oOp').textContent = op.toFixed(1) + '%';
 document.getElementById('oFcf').textContent = fcf.toFixed(1) + '%';
 document.getElementById('oDelev').textContent = yrs + ' 年';
 entSeries = [0, 5, 15, 30, 45].map(function (d) { return Math.max(25, Math.min(72, 68 - d * 0.35 - (sga - 2.0) * 0.9 + (moat - 88) * 0.15)); });
 drawEntropy();
 }
 ['rDrag', 'rSga', 'rMoat'].forEach(function (id) { document.getElementById(id).addEventListener('input', updEnt); });

 document.getElementById('eChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-eview]'); if (!b) return; state.eView = b.getAttribute('data-eview'); this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); drawEra(); });
 document.getElementById('gChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-gview]'); if (!b) return; state.gView = b.getAttribute('data-gview'); this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); drawGenome(); });

 function refreshAudit() {
 var boxes = document.querySelectorAll('[data-cchk]'), d = 0;
 boxes.forEach(function (x) { if (x.checked) d++; });
 document.getElementById('auditScoreChip').textContent = '自检核验：' + d + ' / ' + boxes.length + ' 项';
 }
 document.querySelectorAll('[data-cchk]').forEach(function (c) { c.addEventListener('change', refreshAudit); });

 function drawAll() { drawEra(); drawGenome(); drawEntropy(); }
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth < 1024) { var o = document.getElementById('muiSidebar').classList.toggle('open'); document.getElementById('drawerBackdrop').classList.toggle('open', o); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.getElementById('muiSidebar').classList.remove('open'); this.classList.remove('open'); });
 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });
 function setTheme(t) { state.theme = t; document.documentElement.setAttribute('data-theme', t); drawAll(); }
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { setTheme(state.theme === 'dark' ? 'light' : 'dark'); showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至浅色模式'); });
 document.getElementById('sideLightBtn')?.addEventListener('click', function () { setTheme('light'); });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { setTheme('dark'); });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lang]'); if (!b) return;
 var l = b.getAttribute('data-lang');
 document.getElementById('langZhBtn').classList.toggle('active', l === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', l === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) { var v = el.getAttribute(l === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (v) { if (v.indexOf('<span') !== -1) el.innerHTML = v; else el.textContent = v; } });
 });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Broadcom_Corporate_Culture_Blueprint.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出 Broadcom_Corporate_Culture_Blueprint.html');
 });
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 90); });
 updEnt(); drawAll();
 })();
 