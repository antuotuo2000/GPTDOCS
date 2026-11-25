
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_adea_theme_v1', STORAGE_LANG_KEY = 'mui_adea_lang_v1', STORAGE_AUDIT_KEY = 'adea_culture_bp_audit_v1';
 var state = { theme: 'dark', lang: 'zh', eView: 'patents', gView: 'emp' };
 var hits = { eraCanvas: [], genomeCanvas: [] };

 function showToast(m) { var b = document.getElementById('muiSnackbar'); b.textContent = m; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 2000); }
 function getPalette() {
 var d = document.documentElement.getAttribute('data-theme') === 'dark';
 return { d: d, text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', tick: d ? '#94A3B8' : '#475569', grid: d ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)', blue: d ? '#3399FF' : '#0073E6', green: d ? '#22C55E' : '#16A34A', violet: d ? '#A78BFA' : '#7C3AED', amber: d ? '#FFB74D' : '#D97706' };
 }
 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换深色模式' : '已切换浅色模式');
 }
 function applyLang(l, silent) {
 state.lang = l === 'en' ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (n) {
 var v = n.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (v !== null) { if (v.indexOf('<span') !== -1) n.innerHTML = v; else n.textContent = v; }
 });
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换中文');
 }

 document.getElementById('topoSwitch').addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]'); if (!b) return;
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var st = document.getElementById('topoStage');
 if (b.getAttribute('data-topo') === 'adeia') {
 st.innerHTML = '<div class="cc-topo-hub mono">CEO (Dipti Vachani) × 150人纯专利智库 ($443.4M 营收 · 0.41% CapEx)</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>CTO &amp; 半导体研发</b>Serhad Doken / Craig Mitchell · DBI 混合键合与散热发明</div><div class="cc-spoke"><b>CIPO &amp; 专利工程</b>Joseph Guiliano · 14,250+ 全球专利布局与拆解取证</div><div class="cc-spoke"><b>CRO 商业授权</b>Dr. Mark Kokes · 半导体/OTT/电商长约谈判</div><div class="cc-spoke"><b>CLO 法律威慑</b>Kevin Tanji · 联邦法院与 ITC 维权兜底</div><div class="cc-spoke"><b>Corp Dev &amp; 战略</b>Jarl Berntzen / Bill Thomas · 补强专利收购</div><div class="cc-spoke"><b>CFO 资本配置</b>Keith Jones · 降债至 $386.5M + $140M 回购</div></div><div class="cc-topo-outcome">结果：全员无任何制造/库存包袱，研发、法律与授权无缝咬合，人均创收 $2.96M、FCF 转化率高达 35.2%</div>';
 } else {
 st.innerHTML = '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">2022 分拆前：Xperi 硬件产品 + IP 授权混业控股体</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>硬件产品线</b>消费电子与车载软件研发重投入，毛利率偏低</div><div class="cc-spoke silo"><b>IP 授权业务</b>高利润现金流长期被用于补贴硬件业务扩张</div><div class="cc-spoke silo"><b>估值体系混乱</b>硬件低估值倍数严重拖累高毛利专利资产定价</div><div class="cc-spoke silo"><b>客户利益冲突</b>做终端产品容易在供应链授权谈判中引发客户戒心</div><div class="cc-spoke silo"><b>资源分散</b>管理层带宽被供应链与零售交付大量占用</div><div class="cc-spoke silo"><b>资本配置低效</b>难以形成独立的纯 IP 降债与回购闭环</div></div><div class="cc-topo-outcome warn">痛点：2022.10 果断分拆剥离 Xperi Inc.，才彻底释放出 Adeia 的纯专利高现金流基因</div>';
 }
 });

 var QUADS = [
 { badge: 'Q1 · INVENTION INCUBATOR MODEL', title: '研发与专利资产工程：把科学家时间转化为 20 年复利资产', desc: '在纯 IP 组织中，研发不是成本中心，而是直接生产“可收费金融资产”的核心印钞机。Adeia 每年投入约 15% 营收进行原研与专利申请，同时保留部分资金收购互补性专利。', a: [45, 25, 20, 10] },
 { badge: 'Q2 · NEGOTIATE FIRST ETHOS', title: '友好协商与长约续期：平滑现金流的基石', desc: '绝大部分收入来自多年度商业续约（如 Charter、TCL、Micron），团队花大量精力做产业路线图协同与技术转移，确保续约平稳落地。', a: [25, 20, 45, 10] },
 { badge: 'Q3 · LITIGATION BACKSTOP', title: '联邦诉讼威慑：保护守法被许可方的公平底线', desc: '当未授权巨头长期侵权且拒绝合理报价时，法务团队携带精确权利要求比对表果断出击（如 Disney 与 AMD 案），最终均以高价值多年期许可收官。', a: [20, 35, 20, 25] },
 { badge: 'Q4 · PAY-FOR-PERFORMANCE', title: '150人高绩效闭环：强股权激励锁定核心智力资本', desc: '通过 60% 业绩挂钩 PSU、禁止对冲质押与严格追回条款，将 150 名精锐的利益与股东每股自由现金流增长高度绑定。', a: [35, 25, 25, 15] }
 ];
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var c = e.target.closest('[data-quad]'); if (!c) return;
 var idx = parseInt(c.getAttribute('data-quad'), 10) || 0;
 this.querySelectorAll('.cc-quad-card').forEach(function (x) { x.classList.toggle('active', x === c); });
 var q = QUADS[idx];
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = q.title;
 document.getElementById('dialDesc').textContent = q.desc;
 [['Own', q.a[0]], ['Learn', q.a[1]], ['Teach', q.a[2]], ['Del', q.a[3]]].forEach(function (p) {
 document.getElementById('pct' + p[0]).textContent = p[1] + '%';
 document.getElementById('bar' + p[0]).style.width = p[1] + '%';
 });
 });

 var ERAS = [
 { badge: 'ERA I · 1990–2022.09 · TESSERA / TIVO ROOTS', title: '混业积淀期：锻造 9,500 项底层专利，但深陷估值折价', desc: 'Tessera 开创半导体芯片级封装与 DBI 混合键合，TiVo/Rovi 奠基电视交互发现专利，但在 Xperi 控股体系内与低毛利产品线捆绑，市场长期给予折价。', k: [['9,500 项', '2022 分拆时初始专利资产'], ['30年+', 'Tessera 封装与媒体技术沉淀'], ['混业折价', '硬件业务掩盖高毛利 IP 价值'], ['2022.10', '免税剥离 Xperi 独立上市']] },
 { badge: 'ERA II · 2022.10–2026.09 · PAUL E. DAVIS ERA', title: '独立重塑期：专利池扩容 45%，攻克 Disney 与 AMD 里程碑', desc: 'Paul Davis 率领 150 人纯 IP 团队完成独立化运作，3 年内将专利资产从 9,500 项扩充至 14,250+ 项，偿债逾 $2.1 亿获 S&P 升至 BB，并签下 Disney 与 AMD 标志性大单。', k: [['14,250+', '专利资产扩容近 50%'], ['-$214.9M', '24–26Q3 累计偿还债务'], ['Disney/AMD', '两大行业里程碑签约'], ['$443.4M', 'FY2025 营收跃升 +17.9%']] },
 { badge: 'ERA III · 2026.10+ · DIPTI VACHANI ERA', title: 'Dipti Vachani 时代：把 Arm 的生态协作哲学注入纯专利机器', desc: '在 Paul Davis 成功完成分拆过渡、降债逾两亿美元并攻克 AMD 之后，董事会精准引入在 Arm 执掌汽车业务 8 年的 Dipti Vachani，剑指 $600M 营收与汽车/AI 散热新蓝海。', k: [['$600M 目标', '$400M 媒体 + $200M 半导体'], ['$2.96M / 人', '150名精锐超高人均创收'], ['14,250+', '2026 持续扩容全球专利库'], ['S&P BB', '2026.04 信用评级正式上调']] }
 ];
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]'); if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 this.querySelectorAll('.cc-era-tab').forEach(function (x) { x.classList.toggle('active', x === t); });
 var er = ERAS[idx];
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = er.title;
 document.getElementById('eraDesc').textContent = er.desc;
 document.getElementById('eraKpis').innerHTML = er.k.map(function (x) { return '<div class="cc-era-kpi"><b class="mono">' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(260, r.width || 480), h = Math.max(135, r.height || 260);
 var dpr = Math.min(window.devicePixelRatio || 1, 2); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - 72, ph = h - 68;
 if (state.eView === 'patents') {
 var yrs = ['2022分拆', '2023', '2024', '2025', '2026'], pat = [9500, 10800, 12150, 13750, 14250], maxV = 16000;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText((gv / 1000).toFixed(0) + 'k', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (pat[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText((pat[i] / 1000).toFixed(2) + 'k', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 专利资产', body: pat[i].toLocaleString() + ' 项全球专利及申请' });
 });
 } else {
 var fy = ['FY22', 'FY23', 'FY24', 'FY25'], fcf = [170.5, 148.9, 210.6, 156.3], maxF = 240;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxF / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv + 'M', pad.left - 8, ky + 4);
 }
 var slotB = pw / fy.length, bwB = Math.min(40, slotB * 0.5);
 fy.forEach(function (y, i) {
 var x = pad.left + i * slotB + (slotB - bwB) / 2, bh = (fcf[i] / maxF) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = pal.green; roundRect(ctx, x, yt, bwB, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + fcf[i] + 'M', x + bwB / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.fillText(y, x + bwB / 2, pad.top + ph + 20);
 hits.eraCanvas.push({ x: x, y: yt, w: bwB, h: bh, title: y + ' 自由现金流', body: '$' + fcf[i] + 'M（持续偿债与分红底座）' });
 });
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.genomeCanvas = [];
 var pad = { top: 20, right: 44, bottom: 20, left: 118 }, pw = w - 162, ph = h - 40;
 var peers = [
 { n: 'NVIDIA (算力扁平)', emp: 5.14, cap: 2.50, col: pal.violet },
 { n: 'Adeia (150人纯IP)', emp: 2.96, cap: 0.41, col: pal.green },
 { n: 'Apple (单一P&L)', emp: 2.87, cap: 1.89, col: pal.blue },
 { n: 'InterDigital (SEP)', emp: 1.85, cap: 0.80, col: pal.amber },
 { n: 'Arm (架构IP)', emp: 0.55, cap: 4.00, col: pal.blue }
 ];
 var isEmp = state.gView === 'emp', maxX = isEmp ? 5.8 : 5.0, rowH = ph / peers.length;
 peers.forEach(function (p, i) {
 var v = isEmp ? p.emp : p.cap, cy = pad.top + i * rowH + rowH / 2, bh = 20, bl = Math.max(8, (v / maxX) * pw);
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (i === 1 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(p.n, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(isEmp ? ('$' + v.toFixed(2) + 'M') : (v.toFixed(2) + '%'), pad.left + bl + 7, cy + 4);
 hits.genomeCanvas.push({ x: pad.left, y: cy - 12, w: pw, h: 24, title: p.n, body: '人均创收 $' + p.emp.toFixed(2) + 'M · CapEx 强度 ' + p.cap.toFixed(2) + '%' });
 });
 }

 var entSeries = [82, 85, 88, 91, 94];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 }, pw = w - 56, ph = h - 44;
 var lbls = ['2026', '2027E', '2028E', '2029E', '2030E'];
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
 entSeries.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 entSeries.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
 ctx.fillStyle = i === 4 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(Math.round(v), px, py - 7);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.fillText(lbls[i], px, pad.top + ph + 15);
 });
 }
 function updateStressSim() {
 var hb = parseInt(document.getElementById('rngHb').value, 10), neg = parseInt(document.getElementById('rngNeg').value, 10), lit = parseInt(document.getElementById('rngLit').value, 10);
 document.getElementById('valHb').textContent = hb + '%'; document.getElementById('valNeg').textContent = neg + '%'; document.getElementById('valLit').textContent = lit + '%';
 var ebitda = Math.max(42, Math.min(72, 58 + (hb - 40) * 0.12 + (neg - 75) * 0.15 - (lit - 6) * 0.9)).toFixed(1);
 var rpo = Math.round(450 + hb * 1.4 + neg * 0.8 - lit * 4);
 var score = Math.max(45, Math.min(98, Math.round(68 + (hb - 40) * 0.25 + (neg - 70) * 0.4 - (lit - 6) * 1.2)));
 document.getElementById('outEbitda').textContent = ebitda + '%';
 document.getElementById('outRpo').textContent = '$' + rpo + 'M';
 document.getElementById('outScore').textContent = score + ' / 100';
 entSeries = [0.75, 0.82, 0.89, 0.95, 1.0].map(function (m) { return Math.min(99, score * m); });
 drawEntropyCanvas();
 }
 ['rngHb', 'rngNeg', 'rngLit'].forEach(function (id) { document.getElementById(id).addEventListener('input', updateStressSim); });

 document.getElementById('eChartTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-eview]'); if (!b) return;
 state.eView = b.getAttribute('data-eview');
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 drawEraCanvas();
 });
 document.getElementById('gChartTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-gview]'); if (!b) return;
 state.gView = b.getAttribute('data-gview');
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 drawGenomeCanvas();
 });

 ['eraCanvas', 'genomeCanvas'].forEach(function (cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, hit = null;
 (hits[cid] || []).forEach(function (rg) { if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) hit = rg; });
 if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
 else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 });

 function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }
 function refreshAuditChip() {
 var bs = document.querySelectorAll('[data-cchk]'), d = 0;
 for (var i = 0; i < bs.length; i++) if (bs[i].checked) d++;
 document.getElementById('auditScoreChip').textContent = '文化自检核验：' + d + ' / ' + bs.length + ' 项';
 }
 try {
 var sv = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (c) {
 var k = c.getAttribute('data-cchk'); c.checked = !!sv[k];
 c.addEventListener('change', function () { sv[k] = c.checked; try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(sv)); } catch (e) {} refreshAuditChip(); });
 });
 refreshAuditChip();
 } catch (e) {}

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth < 1024) { var o = document.getElementById('muiSidebar').classList.toggle('open'); document.getElementById('drawerBackdrop').classList.toggle('open', o); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') === '1'; if (c) document.documentElement.removeAttribute('data-sidebar-collapsed'); else document.documentElement.setAttribute('data-sidebar-collapsed', '1'); setTimeout(drawAll, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.getElementById('muiSidebar').classList.remove('open'); this.classList.remove('open'); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {} });
 document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'Adeia_Corporate_Culture_Blueprint.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500); showToast('已导出 Adeia_Corporate_Culture_Blueprint.html');
 });

 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 var QITEMS = [{ id: 'sec-c0', t: 'C0 纯IP分拆拓扑与百人悖论', d: '150人智库 · $2.96M/人' }, { id: 'sec-c1', t: 'C1 四大文化代码与资源罗盘', d: '原创发明 · 协商优先 · 诉讼兜底' }, { id: 'sec-c2', t: 'C2 三代治理演进时间轴', d: 'Tessera/TiVo → Paul Davis → Dipti Vachani' }, { id: 'sec-c3', t: 'C3 全球 IP 巨头基因光谱', d: 'ADEA vs ARM / AAPL / IDCC' }, { id: 'sec-c4', t: 'C4 专利压力模拟与六律体检', d: '混合键合渗透率 · 6项自检' }];
 qIn.addEventListener('focus', function () { qPop.innerHTML = QITEMS.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.d + '</span></button>'; }).join(''); qPop.classList.add('open'); });
 qPop.addEventListener('click', function (e) { var b = e.target.closest('[data-jump]'); if (b) { document.querySelector(b.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); } });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? (window.scrollY / dh) * 100 : 0) + '%'; }, { passive: true });
 window.addEventListener('resize', drawAll);
 updateStressSim(); drawAll();
 })();
 