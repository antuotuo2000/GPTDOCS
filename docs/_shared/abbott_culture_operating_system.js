
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_AUDIT_KEY = 'abt_culture_bp_audit_v1';
 var state = { theme: 'dark', eView: 'rev', gView: 'gm' };
 function showToast(msg) { var b = document.getElementById('muiSnackbar'); if (!b) return; b.textContent = msg; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 2000); }
 function getPalette() { var d = document.documentElement.getAttribute('data-theme') === 'dark'; return { text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', tick: d ? '#94A3B8' : '#475569', grid: d ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: d ? '#3399FF' : '#0073E6', green: d ? '#22C55E' : '#16A34A', violet: d ? '#A78BFA' : '#7C3AED', amber: d ? '#FFB74D' : '#D97706' }; }
 function applyTheme(t, silent) { state.theme = t === 'dark' ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme); drawAll(); if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式'); }

 document.getElementById('topoSwitch').addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]'); if (!b) return;
 document.querySelectorAll('[data-topo]').forEach(function (x) { x.classList.toggle('active', x === b); });
 var stage = document.getElementById('topoStage');
 if (b.getAttribute('data-topo') === 'abbott') {
 stage.innerHTML = '<div class="cc-topo-hub mono">CEO (Robert B. Ford) × 总部资本重塑 + 160国渠道 + QA/RA 法规底座</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>医疗器械集团</b>Lisa Earnhardt · Libre/PFA/心脏独立深耕</div><div class="cc-spoke"><b>诊断与肿瘤集团</b>Alinity + Exact Sciences 共享全球检验渠道</div><div class="cc-spoke"><b>成熟药品 EPD</b>Daniel Salvadori · 100% 聚焦新兴市场</div><div class="cc-spoke"><b>营养品 (拟分拆)</b>2027 年底前独立上市释放各自潜力</div><div class="cc-spoke"><b>质量与临床法规</b>跨部门复用 FDA/CE 审批经验与合规红线</div><div class="cc-spoke"><b>危机战时机制</b>紧急抽调跨部门资源打赢 BinaxNOW 等硬仗</div></div><div class="cc-topo-outcome">结果：既有专业小分队的临床敏捷度，又享有 160 国渠道复用与跨越百年的资本新陈代谢能力</div>';
 } else {
 stage.innerHTML = '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统僵化大型药企 · 各自守着到期专利药摇钱树</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>专利悬崖焦虑</b>过度依赖单一重磅炸弹药，不敢自我革命</div><div class="cc-spoke silo"><b>渠道壁垒森严</b>并购来的新创公司被大企业官僚流程拖垮</div><div class="cc-spoke silo"><b>低速资产不舍</b>因贪恋营收规模拒绝剥离低毛利消费品板块</div></div><div class="cc-topo-outcome warn">恶果：增速失速、估值长期受多元折价压制</div>';
 }
 });

 var QUADS = [
 { badge: 'Q1 · CLINICAL RIGOR & QUALITY GATE', title: '集团高管精力分配：临床管线 × 质量合规 × 资本配置 × 商业化', desc: '雅培质量与合规团队拥有独立一票否决权，2026 年密集获批 Libre Duo、TactiFlex Duo 与 SimpleScreen CRC。', alloc: [35, 25, 20, 20] },
 { badge: 'Q2 · CRISIS AGILITY (BINAXNOW)', title: '战时跨界动员：4亿+份快检背后的组织弹性', desc: '2020 年 Robert Ford 跨部门调集科学家与产线，数月内实现海量 BinaxNOW 交付，展现联邦制下的应急协同力。', alloc: [30, 20, 15, 35] },
 { badge: 'Q3 · PORTFOLIO RESET & DISCIPLINE', title: '冷酷的自我剪枝：2013 艾伯维与 2027 营养品分拆', desc: '管理层始终把长期 ROIC 置于规模虚荣之上，通过免税分拆与 $230 亿战略并购持续重塑增长引擎。', alloc: [25, 15, 40, 20] },
 { badge: 'Q4 · PEOPLE & STEM BENCH', title: '138 年人文关怀与内部工程师/管理者长周期培养', desc: '包括 CEO Robert Ford 在内的核心高管均在雅培内部轮岗深耕 15–25 年以上，文化传承高度连贯。', alloc: [30, 25, 20, 25] }
 ];
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]'); if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 document.querySelectorAll('.cc-quad-card').forEach(function (c, i) { c.classList.toggle('active', i === idx); });
 var q = QUADS[idx];
 document.getElementById('dialBadge').textContent = q.badge; document.getElementById('dialTitle').textContent = q.title; document.getElementById('dialDesc').textContent = q.desc;
 [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (p) {
 document.getElementById('pct' + p[0]).textContent = p[1] + '%'; document.getElementById('bar' + p[0]).style.width = p[1] + '%';
 });
 });

 var ERAS = [
 { badge: 'ERA I · 1999–2012 · MILES WHITE GLOBAL EXPANSION', title: 'Miles White 整合期：全球化扩张奠定四象限底座', desc: '1999 年起执掌雅培 21 年，通过一系列精准并购与国际化布局，建立起诊断、器械、营养品与品牌药四足鼎立的全球商业帝国。', kpis: [['160+ 国', '全球商业化网络成形'], ['54年基石', '股息王纪录持续延展'], ['多元对冲', '平滑单一医药研发波动'], ['2013 转折', '酝酿艾伯维历史性分拆']] },
 { badge: 'ERA II · 2013–2020 · ABBVIE SPIN & ST. JUDE M&A', title: '分拆艾伯维 & 收购圣犹达：全面押注医疗器械与诊断', desc: '2013 年分拆专利药 AbbVie 后，雅培集中火力以逾 $250 亿收购 St. Jude Medical 与 Alere，确立心血管器械与床旁诊断霸主地位。', kpis: [['AbbVie 分拆', '释放千亿创新药独立价值'], ['St. Jude', '补齐电生理与结构性心脏'], ['Libre 初代', '颠覆糖尿病指尖采血'], ['低波动', '彻底告别药企专利悬崖']] },
 { badge: 'ERA III · 2020–2026+ · ROBERT FORD MEDTECH & ONCOLOGY', title: 'Robert B. Ford 时代：生物穿戴 + 肿瘤诊断重塑“新雅培”', desc: '2026 年 3 月以 $230 亿收购 Exact Sciences 切入肿瘤早筛，10 月宣布 2027 年底前免税分拆 $85 亿营养品业务，蜕变为纯粹医疗科技与诊断巨擘。', kpis: [['$44.33B', 'FY2025 总营收 (Q3\'26 +14.5%)'], ['54 年', '连续上调股息纪录'], ['$23.0B', 'Exact Sciences 肿瘤诊断并购'], ['~$42.0B', '2027 分拆营养后纯粹新雅培']] }
 ];
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]'); if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 document.querySelectorAll('.cc-era-tab').forEach(function (x, i) { x.classList.toggle('active', i === idx); });
 var er = ERAS[idx];
 document.getElementById('eraBadge').textContent = er.badge; document.getElementById('eraTitle').textContent = er.title; document.getElementById('eraDesc').textContent = er.desc;
 document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) { return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
 });

 function prepCanvas(id) { var c = document.getElementById(id); if (!c) return null; var r = c.getBoundingClientRect(), w = Math.max(260, r.width || 480), h = Math.max(135, r.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h); return { ctx: ctx, w: w, h: h }; }
 function roundRect(ctx, x, y, w, h, r) { var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), pad = { top: 28, right: 20, bottom: 38, left: 48 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'], arr = state.eView === 'rev' ? [43.65, 40.11, 41.95, 44.33, 50.50] : [21.3, 16.2, 16.3, 18.2, 19.0], maxV = state.eView === 'rev' ? 56 : 25;
 var sl = pw / yrs.length, bw = Math.min(40, sl * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sl + (sl - bw) / 2, bh = (arr[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(state.eView === 'rev' ? ('$' + arr[i].toFixed(1) + 'B') : (arr[i].toFixed(1) + '%'), x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 18);
 });
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), pad = { top: 20, right: 44, bottom: 20, left: 118 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var peers = [{ n: 'Boston Sci (BSX)', gm: 70.0, rev: 20.0, c: pal.violet }, { n: 'Medtronic (MDT)', gm: 65.0, rev: 34.0, c: pal.blue }, { n: 'Stryker (SYK)', gm: 64.0, rev: 24.0, c: pal.amber }, { n: 'Danaher (DHR)', gm: 59.0, rev: 24.0, c: pal.green }, { n: 'Abbott (ABT)', gm: 56.7, rev: 44.3, c: pal.blue }];
 var isGm = state.gView === 'gm', maxX = isGm ? 80 : 50, rowH = ph / peers.length;
 peers.forEach(function (p, i) {
 var val = isGm ? p.gm : p.rev, cy = pad.top + i * rowH + rowH / 2, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - 10, pw, 20, 5); ctx.fill();
 ctx.fillStyle = p.c; roundRect(ctx, pad.left, cy - 10, bl, 20, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(p.n, pad.left - 8, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(isGm ? (val.toFixed(1) + '%') : ('$' + val.toFixed(1) + 'B'), pad.left + bl + 6, cy + 4);
 });
 }

 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), pad = { top: 18, right: 18, bottom: 22, left: 32 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var sk = parseInt(document.getElementById('rngSkus').value, 10), ex = parseInt(document.getElementById('rngExp').value, 10), lg = parseInt(document.getElementById('rngLag').value, 10);
 var syn = Math.round(sk * 0.38 + ex * 0.34 + lg * 0.28);
 document.getElementById('valSkus').textContent = sk + '%'; document.getElementById('valExp').textContent = ex + '%'; document.getElementById('valLag').textContent = lg + '%';
 document.getElementById('outSynergy').textContent = syn + ' / 100';
 document.getElementById('outVelocity').textContent = '+' + (4.5 + (syn - 50) * 0.1).toFixed(1) + '%';
 document.getElementById('outGmPrem').textContent = Math.round(18 + (syn - 50) * 0.22) + 'x+';
 var pts = [65, 74, 82, syn, Math.min(98, syn + 5)];
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
 pts.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 pts.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph; ctx.fillStyle = i === 3 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill(); });
 }
 ['rngSkus', 'rngExp', 'rngLag'].forEach(function (id) { document.getElementById(id).addEventListener('input', drawEntropyCanvas); });
 document.getElementById('eChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-eview]'); if (!b) return; state.eView = b.getAttribute('data-eview'); document.querySelectorAll('[data-eview]').forEach(function (x) { x.classList.toggle('active', x === b); }); drawEraCanvas(); });
 document.getElementById('gChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-gview]'); if (!b) return; state.gView = b.getAttribute('data-gview'); document.querySelectorAll('[data-gview]').forEach(function (x) { x.classList.toggle('active', x === b); }); drawGenomeCanvas(); });

 function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {} });
 document.querySelectorAll('[data-portal-theme]').forEach(function (b) { b.addEventListener('click', function () { applyTheme(b.getAttribute('data-portal-theme'), false); try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {} }); });
 document.getElementById('exportHtmlBtn')?.addEventListener('click', function () { var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' })); var a = document.createElement('a'); a.href = url; a.download = 'Abbott_Corporate_Culture_Blueprint.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(url); }, 1500); });
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () { if (window.innerWidth < 1024) { document.getElementById('muiSidebar').classList.toggle('open'); document.getElementById('drawerBackdrop').classList.toggle('open'); } });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.getElementById('muiSidebar').classList.remove('open'); document.getElementById('drawerBackdrop').classList.remove('open'); });
 window.addEventListener('scroll', function () { var d = document.documentElement; document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / Math.max(1, d.scrollHeight - window.innerHeight)) * 100) + '%'; }, { passive: true });
 function refreshAudit() { var boxes = document.querySelectorAll('[data-cchk]'), done = 0; boxes.forEach(function (b) { if (b.checked) done++; }); document.getElementById('auditScoreChip').textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项'; }
 document.querySelectorAll('[data-cchk]').forEach(function (b) { b.addEventListener('change', refreshAudit); });
 
 function applyLanguage(lang) {
   var zh = lang !== 'en';
   document.documentElement.lang = zh ? 'zh-CN' : 'en';
   var bZh = document.getElementById('langZhBtn'), bEn = document.getElementById('langEnBtn');
   if (bZh) bZh.classList.toggle('active', zh);
   if (bEn) bEn.classList.toggle('active', !zh);
   var q = document.getElementById('quickJumpInput');
   if (q) q.placeholder = zh ? '检索文化法则或高管…' : 'Search culture rules or execs…';
 }
 ['langZhBtn', 'langEnBtn'].forEach(function (id) {
   var el = document.getElementById(id);
   if (el) el.addEventListener('click', function () { applyLanguage(el.getAttribute('data-lang')); });
 });

 try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); } catch (e) {}
 window.addEventListener('resize', function () { setTimeout(drawAll, 80); });
 drawAll();
 })();
 