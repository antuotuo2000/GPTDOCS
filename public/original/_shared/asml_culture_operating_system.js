
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_AUDIT_KEY = 'asml_culture_bp_audit_v1';
 var state = { theme: 'dark', eView: 'revemp', gView: 'emp' };

 function showToast(msg) { var b = document.getElementById('muiSnackbar'); if (!b) return; b.textContent = msg; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 2000); }
 function getPalette() {
 var d = document.documentElement.getAttribute('data-theme') === 'dark';
 return { dark: d, text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', tick: d ? '#94A3B8' : '#475569', grid: d ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: d ? '#3399FF' : '#0073E6', green: d ? '#22C55E' : '#16A34A', violet: d ? '#A78BFA' : '#7C3AED', amber: d ? '#FFB74D' : '#D97706' };
 }
 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }

 var topoSwitch = document.getElementById('topoSwitch');
 if (topoSwitch) {
 topoSwitch.addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]'); if (!b) return;
 var mode = b.getAttribute('data-topo');
 topoSwitch.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var stage = document.getElementById('topoStage');
 if (mode === 'asml') {
 stage.innerHTML = '<div class="cc-topo-hub mono">Veldhoven 总装架构中枢 (44,000+ FTE · 143 国籍)</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>Carl Zeiss SMT</b>德国奥伯科亨 · 持股24.9%锁定原子级光学</div><div class="cc-spoke"><b>Cymer (全资)</b>美国圣地亚哥 · 掌控 13.5nm LPP 锡滴光源</div><div class="cc-spoke"><b>TRUMPF 激光</b>德国迪琴根 · 联合研发高功率 CO2 驱动激光</div><div class="cc-spoke"><b>Brainport 集群</b>荷兰本地数百家精密机电伙伴实时共研</div><div class="cc-spoke"><b>Brion + HMI</b>计算光刻软件与多电子束量测闭环控制</div><div class="cc-spoke"><b>客户共投联盟</b>TSMC / Intel / Samsung 共担研发与预付</div></div><div class="cc-topo-outcome">结果：聚合全球各细分物理领域隐形冠军，以 35.5% 超高 ROIC 攻克 20 年 EUV 死亡谷</div>';
 } else {
 stage.innerHTML = '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">封闭重资产自研工厂 · 试图内部包揽全部物理学科</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>自建光学研磨厂</b>研发周期数十年，折旧极重且良率爬坡慢</div><div class="cc-spoke silo"><b>封闭激光实验室</b>无法吸收外部精密激光巨头积累</div><div class="cc-spoke silo"><b>重资产机加车间</b>固定成本高企，半导体周期下行期剧烈亏损</div><div class="cc-spoke silo"><b>单一客户孤岛</b>缺乏三大晶圆厂联合出资共担早期风险</div><div class="cc-spoke silo"><b>行政层级冗长</b>跨学科沟通隔阂，157nm 路线错误难及时纠偏</div><div class="cc-spoke silo"><b>资本效率低下</b>ROIC 长期受重资产折旧拖累</div></div><div class="cc-topo-outcome warn">恶果：典型的传统重工业陷阱——错失 193nm 浸没式与 EUV 窗口期（昔日竞争对手困局）</div>';
 }
 });
 }

 var QUADS = [
 { badge: 'Q1 · RADICAL ENGINEERING CANDOR', title: '跨学科集成领导力：系统架构 × 物理攻坚 × 生态外交', desc: '在 ASML，高级工程领导者不能只管内部团队，必须把大量精力投入到与蔡司光学、美国光源及下游晶圆厂的技术对齐与坦诚辩论中。', alloc: [40, 30, 18, 12] },
 { badge: 'Q2 · OPEN ECOSYSTEM COLLABORATION', title: '无边界共研协作：把 5,000 家伙伴变成同一条战壕的盟友', desc: '通过联合实验台、知识产权共享协议与驻厂协同，让德国光学、美国激光与荷兰精密机械实现纳米级无缝咬合。', alloc: [28, 44, 16, 12] },
 { badge: 'Q3 · CARE & TALENT RETENTION', title: '高安全感文化：用尊重与长假留住 143 国籍顶尖物理学家', desc: '40 天带薪年假、13 薪以及 2026 年高管薪酬直接挂钩员工满意度，确保十万人级生态扩张不迷失人文关怀。', alloc: [25, 25, 38, 12] },
 { badge: 'Q4 · SYSTEM ARCHITECT FOCUS', title: '战略聚焦与敏捷精简：只做系统架构与核心软件控制', desc: '2026 年 1 月果断精简 IT 与管理冗余层级，把 €47 亿年度研发弹药精准投向 High-NA 量产与 12 英寸大掩膜标准。', alloc: [42, 24, 14, 20] }
 ];
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]'); if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 document.querySelectorAll('[data-quad]').forEach(function (x) { x.classList.toggle('active', x === card); });
 var q = QUADS[idx];
 document.getElementById('dialBadge').textContent = q.badge; document.getElementById('dialTitle').textContent = q.title; document.getElementById('dialDesc').textContent = q.desc;
 [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (p) {
 document.getElementById('pct' + p[0]).textContent = p[1] + '%'; document.getElementById('bar' + p[0]).style.width = p[1] + '%';
 });
 });

 var ERAS = [
 { badge: 'ERA I · 1984–2012 · FOUNDING & IMMERSION UPSET', title: '从漏雨棚屋到反超尼康：倾听外部科学家，豪赌 193nm 浸没式', desc: '1984 年从飞利浦与 ASM 分拆时仅几十名员工。2000 年代初大胆采纳台积电林本坚的浸没式水镜头构想，一举把全球光刻机市占率从 ~35% 拉升至 >80%。', kpis: [['1984 年', '埃因霍温漏雨棚屋创立'], ['~35%→>80%', '浸没式 DUV 逆袭市占率'], ['2007 收购', 'Brion 开启计算光刻时代'], ['开放基因', '不闭门造车，广纳全球英才']] },
 { badge: 'ERA II · 2013–2024.04 · WENNINK & VAN DEN BRINK', title: '黄金双核与二十年 EUV 死亡谷突破：用客户共投锁定物理垄断', desc: 'CEO 温宁克（资本外交）与 CTO 范登布林克（技术铁腕）搭档，2012 年获 Intel/TSMC/Samsung €52.3亿共投、2013 年 €19.5亿收购 Cymer、2016 年 €10亿入股蔡司 SMT 24.9%，于 2019 年终成 EUV 唯一霸主。', kpis: [['€52.3B/1.38B', '三大客户联合注资共研'], ['€19.5B', '2013 年全资收购光源 Cymer'], ['24.9% 股权', '2016 年锁定德国蔡司光学'], ['100% 垄断', '2019 年 EUV 正式高量产']] },
 { badge: 'ERA III · 2024.04+ · CHRISTOPHE FOUQUET ERA', title: '傅克礼时代：在 AI 算力狂潮中兼具“扩产魄力”与“生态温度”', desc: '2024 年 4 月接棒的 Christophe Fouquet 推动 2026 全年营收指引跃升至 €440亿–€450亿并冲刺 2028 年 110+ 台 EUV；同时入股 Mistral AI、精简 IT 层级，并将高管薪酬绑定员工满意度。', kpis: [['€44–45B', '2026 全年上调后营收指引'], ['57.5%', '2026 Q3 创纪录毛利率'], ['44,000+', '143 国籍全球全职工程师'], ['15–16 周', 'EUV 单机组装周期大幅压缩']] }
 ];
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]'); if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 document.querySelectorAll('[data-era]').forEach(function (x) { x.classList.toggle('active', x === t); });
 var er = ERAS[idx];
 document.getElementById('eraBadge').textContent = er.badge; document.getElementById('eraTitle').textContent = er.title; document.getElementById('eraDesc').textContent = er.desc;
 document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) { return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(260, r.width || 480), h = Math.max(135, r.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function rr(ctx, x, y, w, h, r) { var rad = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.arcTo(x + w, y, x + w, y + h, rad); ctx.arcTo(x + w, y + h, x, y + h, rad); ctx.arcTo(x, y + h, x, y, rad); ctx.arcTo(x, y, x + w, y, rad); ctx.closePath(); }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), pad = { top: 28, right: 20, bottom: 40, left: 50 }, pw = w - 70, ph = h - 68;
 if (state.eView === 'revemp') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', '2026E'], v = [18.6, 21.2, 27.6, 28.3, 32.7, 44.5], sl = pw / yrs.length, bw = Math.min(40, sl * 0.56);
 for (var g = 0; g <= 4; g++) { var gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); }
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sl + (sl - bw) / 2, bh = (v[i] / 50) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 5 ? pal.green : pal.blue; rr(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('€' + v[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 });
 } else {
 var lyrs = ['FY23', 'FY24', 'FY25'], fcf = [3.2, 9.5, 10.6], rd = [4.0, 4.3, 4.7], sl2 = pw / 3, bw2 = 34;
 lyrs.forEach(function (y, i) {
 var cx = pad.left + i * sl2 + sl2 / 2, bh1 = (rd[i] / 12) * ph, bh2 = (fcf[i] / 12) * ph;
 ctx.fillStyle = pal.blue; rr(ctx, cx - bw2 - 3, pad.top + ph - bh1, bw2, bh1, 5); ctx.fill();
 ctx.fillStyle = pal.green; rr(ctx, cx + 3, pad.top + ph - bh2, bw2, bh2, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('€' + rd[i] + 'B', cx - bw2 / 2 - 3, pad.top + ph - bh1 - 6);
 ctx.fillText('€' + fcf[i] + 'B', cx + bw2 / 2 + 3, pad.top + ph - bh2 - 6);
 ctx.fillStyle = pal.tick; ctx.fillText(y + ' (研发 vs FCF)', cx, pad.top + ph + 20);
 });
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), pad = { top: 24, right: 44, bottom: 26, left: 120 }, pw = w - pad.left - pad.right, ph = h - 50;
 var peers = [
 { n: 'ASML (生态编排)', rd: 14.4, gm: 52.8, c: pal.blue },
 { n: 'NVIDIA (扁平算力)', rd: 10.5, gm: 71.1, c: pal.violet },
 { n: 'AMAT (设备平台)', rd: 12.0, gm: 47.5, c: pal.amber },
 { n: 'Apple (封闭全栈)', rd: 9.6, gm: 48.8, c: pal.green },
 { n: 'TSMC (重资产代工)', rd: 7.5, gm: 56.5, c: pal.blue }
 ];
 var isRd = state.gView === 'emp', maxX = isRd ? 18 : 80, rowH = ph / peers.length;
 peers.forEach(function (p, i) {
 var val = isRd ? p.rd : p.gm, cy = pad.top + i * rowH + rowH / 2, bh = 22, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid; rr(ctx, pad.left, cy - 11, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.c; rr(ctx, pad.left, cy - 11, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (i === 0 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(p.n, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(val.toFixed(1) + '%', pad.left + bl + 7, cy + 4);
 });
 }

 var entSeries = [94, 88, 80, 70, 58];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), pad = { top: 20, right: 18, bottom: 24, left: 38 }, pw = w - 56, ph = h - 44;
 var lbls = ['理想协同', '当前ASML', '轻微摩擦', '蔡司受限', '孤岛割裂'];
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
 entSeries.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 entSeries.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
 ctx.fillStyle = i === 1 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(Math.round(v), px, py - 7);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.fillText(lbls[i], px, pad.top + ph + 15);
 });
 }

 function updateEntropySim() {
 var al = parseInt(document.getElementById('rngAlign').value, 10), opt = parseInt(document.getElementById('rngOpt').value, 10), ch = parseInt(document.getElementById('rngChal').value, 10);
 document.getElementById('valAlign').textContent = al + '%';
 document.getElementById('valOpt').textContent = opt + '%' + (opt <= 30 ? ' (可控)' : opt <= 55 ? ' (交期紧张)' : ' (严重瓶颈)');
 document.getElementById('valChal').textContent = ch + '%';
 var syn = Math.max(30, Math.min(99, Math.round(al * 0.55 + ch * 0.45 - (opt - 20) * 0.35)));
 var lead = Math.max(14, Math.min(32, Math.round(14 + (opt - 15) * 0.18 + (100 - al) * 0.15)));
 var gm = Math.max(48.0, Math.min(60.5, (50 + syn * 0.08 - opt * 0.04))).toFixed(1);
 document.getElementById('outSynergy').textContent = syn + ' / 100';
 document.getElementById('outLead').textContent = lead + ' 周';
 document.getElementById('outGm').textContent = gm + '%';
 entSeries = [98, syn, Math.max(40, syn - 10), Math.max(30, syn - 22), Math.max(20, syn - 34)];
 drawEntropyCanvas();
 }
 ['rngAlign', 'rngOpt', 'rngChal'].forEach(function (id) { document.getElementById(id).addEventListener('input', updateEntropySim); });

 function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }

 document.querySelectorAll('[data-eview]').forEach(function (b) { b.addEventListener('click', function () { state.eView = this.getAttribute('data-eview'); document.querySelectorAll('[data-eview]').forEach(function (x) { x.classList.toggle('active', x === b); }); drawEraCanvas(); }); });
 document.querySelectorAll('[data-gview]').forEach(function (b) { b.addEventListener('click', function () { state.gView = this.getAttribute('data-gview'); document.querySelectorAll('[data-gview]').forEach(function (x) { x.classList.toggle('active', x === b); }); drawGenomeCanvas(); }); });

 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {} });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'ASML_Corporate_Culture_Blueprint.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出独立网页 ASML_Corporate_Culture_Blueprint.html');
 });

 try {
 var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (chk) {
 var k = chk.getAttribute('data-cchk'); chk.checked = !!savedA[k];
 chk.addEventListener('change', function () {
 savedA[k] = chk.checked; try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (e) {}
 var boxes = document.querySelectorAll('[data-cchk]'), done = 0; boxes.forEach(function (x) { if (x.checked) done++; });
 document.getElementById('auditScoreChip').textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项';
 });
 });
 } catch (e) {}

 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 updateEntropySim();
 drawAll();
 window.addEventListener('resize', function () { setTimeout(drawAll, 80); });
 
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
   sbBtn.addEventListener('click', function () {
     if (window.innerWidth < 1024) { var o = sb.classList.toggle('open'); bd.classList.toggle('open', o); }
   });
   bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 var lg = document.getElementById('langSwitchGroup');
 if (lg) {
   lg.addEventListener('click', function (e) {
     var b = e.target.closest('[data-lang]'); if (!b) return;
     var l = b.getAttribute('data-lang');
     document.getElementById('langZhBtn').classList.toggle('active', l === 'zh');
     document.getElementById('langEnBtn').classList.toggle('active', l === 'en');
     showToast(l === 'en' ? 'English labels active on key headers' : '已切换为中文视图');
   });
 }

 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });
 })();
 