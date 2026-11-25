
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1', STORAGE_AUDIT_KEY = 'amgn_culture_bp_audit_v1';
 var state = { theme: 'dark', lang: 'zh', eView: 'revemp', gView: 'emp' };

 function showToast(msg) { var bar = document.getElementById('muiSnackbar'); if (!bar) return; bar.textContent = msg; bar.classList.add('show'); clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000); }
 function getPalette() { var dark = document.documentElement.getAttribute('data-theme') === 'dark'; return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: dark ? '#3399FF' : '#0073E6', green: dark ? '#22C55E' : '#16A34A', violet: dark ? '#A78BFA' : '#7C3AED', amber: dark ? '#FFB74D' : '#D97706' }; }
 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var lb = document.getElementById('sideThemeLightBtn'), db = document.getElementById('sideThemeDarkBtn');
 if (lb) lb.setAttribute('aria-pressed', state.theme === 'light'); if (db) db.setAttribute('aria-pressed', state.theme === 'dark');
 drawAll(); if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }
 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh'; document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh'); document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) { var val = el.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (val !== null) { if (val.indexOf('<span') !== -1) el.innerHTML = val; else el.textContent = val; } });
 drawAll(); if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 document.getElementById('topoSwitch').addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]'); if (!b) return;
 document.querySelectorAll('#topoSwitch .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var stage = document.getElementById('topoStage');
 if (b.getAttribute('data-topo') === 'amgen') {
 stage.innerHTML = '<div class="cc-topo-hub mono">CEO (Bradway) × 研发AI统帅 (Jay Bradner) × 外部 SAB 同行评议</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>deCODE 基因中枢</b>200+ PB 人类多组学先验验证靶点</div><div class="cc-spoke"><b>生成生物学/AI</b>Freyja 超算 + Sean Bruich 跨全管线赋能</div><div class="cc-spoke"><b>肥胖专班 (Sweeney)</b>MariTide 独立 EVP 统筹临床与产能</div><div class="cc-spoke"><b>全球生物制造</b>Arleen Paulino 统管美国本土扩产</div><div class="cc-spoke"><b>四大商业科室</b>普药/肿瘤/炎症/罕见病协同准入</div><div class="cc-spoke"><b>生物类似药部</b>以仿制大单品反哺原研现金流</div></div><div class="cc-topo-outcome">结果：靶点进临床胜率翻倍，劣势早研果断止损，17款重磅药接力跨越 Prolia/Xgeva 专利悬崖</div>';
 } else {
 stage.innerHTML = '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统臃肿药企 · 商业KPI压倒科学证据</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>盲筛立项</b>缺乏遗传学因果验证，II期临床折戟率高</div><div class="cc-spoke silo"><b>沉没成本绑架</b>明知数据平庸仍强推 III 期浪费数十亿</div><div class="cc-spoke silo"><b>研发制造脱节</b>临床分子难以放大生产，上市即断供</div><div class="cc-spoke silo"><b>单品依赖症</b>靠 1–2 款老药续命，LOE 到期即业绩塌方</div><div class="cc-spoke silo"><b>官僚层层审批</b>重大新赛道反应迟缓错失窗口</div><div class="cc-spoke silo"><b>忽视外部同行</b>闭门造车导致科学盲区</div></div><div class="cc-topo-outcome warn">恶果：高研发投入却产出寥寥，只能靠溢价救火式并购填补专利窟窿</div>';
 }
 });

 var QUADS = [
 { badge: 'Q1 · SCIENCE-BASED & SAB GOVERNANCE', title: '研发管理四象限资源配置：遗传学发现 × 后期临床 × AI × 制造', desc: '在“以科学为本”原则下，安进高管团队将绝大部分研发与资本带宽精准投向 III 期关键临床（MariTide/Olpasiran/BiTE）与底层遗传学平台。', alloc: [45, 25, 18, 12] },
 { badge: 'Q2 · QUALITY & PATIENT SAFETY', title: '质量优先资源配置：自动化质控 × 供应链冗余 × 伦理合规', desc: '在美国本土投入逾 $31.5亿 建设机器人与 AI 质控产线，确保生物大分子药物全球供应零断供、零重大质量缺陷。', alloc: [30, 15, 42, 13] },
 { badge: 'Q3 · COMPETE INTENSELY & KILL EARLY', title: '敏捷竞速资源配置：重磅专班 × 快速止损 × 商业准入', desc: '通过独立肥胖业务专班全速推进 MariTide 10+ 项 III 期，同时对劣势早研项目实行“Kill Early”快速出清。', alloc: [52, 20, 14, 14] },
 { badge: 'Q4 · WE IN I & TALENT EMPOWERMENT', title: '团队与 AI 赋能配置：科学家培育 × Copilot 提效 × 社区使命', desc: '向 20,000 名员工部署生成式 AI 办公助手，辅以育儿托儿福利与全球学徒制，维持 31,500 名员工的高科研留存。', alloc: [35, 32, 18, 15] }
 ];
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]'); if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 document.querySelectorAll('#quadGrid .cc-quad-card').forEach(function (c) { c.classList.toggle('active', c === card); });
 var q = QUADS[idx];
 document.getElementById('dialBadge').textContent = q.badge; document.getElementById('dialTitle').textContent = q.title; document.getElementById('dialDesc').textContent = q.desc;
 [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (p) { document.getElementById('pct' + p[0]).textContent = p[1] + '%'; document.getElementById('bar' + p[0]).style.width = p[1] + '%'; });
 });

 var ERAS = [
 { badge: 'ERA I · 1980–2000 · BIOTECH PIONEERING', title: 'George Rathmann & Gordon Binder：开创独立生物制药帝国', desc: '1980 年在加州千橡市创立安进，成功研发重组红细胞生成素 Epogen 与升白针 Neupogen，确立“To Serve Patients”使命与科学立企文化。', kpis: [['1980 创立', '千橡市生物技术摇篮'], ['Epogen', '全球首批重组蛋白重磅药'], ['Neupogen', '奠定肿瘤支持治疗基石'], ['独立成长', '拒绝被传统大药企吞并']] },
 { badge: 'ERA II · 2000–2012 · INDUSTRIAL SCALING', title: 'Kevin Sharer：收购 Immunex 与生物制造工业化飞跃', desc: '2002 年斥资 $16B 收购 Immunex 拿下 Enbrel，构建行业领先的大规模哺乳动物细胞发酵与灌流制造网络，推出 Prolia/Xgeva。', kpis: [['$16B 并购', '拿下超级自免重磅 Enbrel'], ['Prolia/Xgeva', '打造十亿美元骨健康支柱'], ['规模制造', '确立“工艺即产品”护城河'], ['道指成分股', '奠定蓝筹生物制药地位']] },
 { badge: 'ERA III · 2012–2026+ · GENETICS, RARE DISEASE & AI', title: 'Robert Bradway 时代：基因导航 + 罕见病并购 + AI 生成生物学', desc: '收购冰岛 deCODE 重构靶点发现；2023 年 $278亿 拿下 Horizon 补齐罕见病支柱；2025–2026 联手 NVIDIA 部署 Freyja 超算并全面推进 MariTide 减重与 BiTE 实体瘤双抗。', kpis: [['$39.3B', 'FY2026E 全年营收指引中值'], ['$1.17M / 人', '31,500 名员工超高人效'], ['47.3%', 'Q3 2026 Non-GAAP 营业利润率'], ['17 款', '年化销售额超 $10亿 重磅药']] }
 ];
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]'); if (!t) return;
 var er = ERAS[parseInt(t.getAttribute('data-era'), 10) || 0];
 document.querySelectorAll('#eraTabs .cc-era-tab').forEach(function (x) { x.classList.toggle('active', x === t); });
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
 function roundRect(ctx, x, y, w, h, r) { var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var vals = state.eView === 'revemp' ? [1.07, 1.04, 1.06, 1.19, 1.17, 1.23] : [4.8, 4.4, 4.8, 6.0, 7.3, 7.9];
 var maxV = state.eView === 'revemp' ? 1.4 : 9.0, slot = pw / yrs.length, bw = Math.min(38, slot * 0.54);
 for (var g = 0; g <= 3; g++) { var gv = (maxV / 3) * g, gy = pad.top + ph - (g / 3) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(state.eView === 'revemp' ? ('$' + gv.toFixed(2) + 'M') : ('$' + gv.toFixed(1) + 'B'), pad.left - 6, gy + 4); }
 yrs.forEach(function (y, i) { var x = pad.left + i * slot + (slot - bw) / 2, bh = (vals[i] / maxV) * ph, yt = pad.top + ph - bh; ctx.fillStyle = i >= 4 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill(); ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(state.eView === 'revemp' ? ('$' + vals[i].toFixed(2) + 'M') : ('$' + vals[i].toFixed(1) + 'B'), x + bw / 2, yt - 6); ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20); });
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 48, bottom: 20, left: 118 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var peers = [
 { name: 'Eli Lilly (LLY)', emp: 1.73, opm: 34.0, col: pal.green },
 { name: 'Amgen (AMGN)', emp: 1.17, opm: 47.3, col: pal.blue },
 { name: 'AbbVie (ABBV)', emp: 1.11, opm: 38.0, col: pal.violet },
 { name: 'Regeneron (REGN)', emp: 0.94, opm: 32.0, col: pal.amber }
 ];
 var isEmp = state.gView === 'emp', maxX = isEmp ? 2.0 : 55, rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.opm, cy = pad.top + idx * rowH + rowH / 2, bh = 22, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = (idx === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
 });
 }

 var entSeries = [65, 76, 86, 91, 94];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 20, right: 18, bottom: 24, left: 38 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['20%遗传', '45%', '75%(安进)', '85%', '95%'];
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
 entSeries.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 entSeries.forEach(function (v, i) { var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph; ctx.fillStyle = i === 2 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(Math.round(v), px, py - 7); ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.fillText(lbls[i], px, pad.top + ph + 15); });
 }
 function updateEntropySim() {
 var gen = parseInt(document.getElementById('rngGen').value, 10), kill = parseInt(document.getElementById('rngKill').value, 10), loe = parseInt(document.getElementById('rngLoe').value, 10);
 document.getElementById('valGen').textContent = gen + '%'; document.getElementById('valKill').textContent = kill + '%'; document.getElementById('valLoe').textContent = loe + '%' + (loe <= 25 ? ' (分散区)' : ' (单品集中)');
 var win = Math.max(30, Math.min(98, Math.round(48 + gen * 0.42 + kill * 0.08)));
 var res = Math.max(25, Math.min(98, Math.round(98 - (loe - 15) * 0.95 + kill * 0.06)));
 var opm = Math.max(32, (38 + (kill - 30) * 0.12 + (gen - 40) * 0.09)).toFixed(1);
 document.getElementById('outWin').textContent = win + ' / 100'; document.getElementById('outRes').textContent = res + ' / 100'; document.getElementById('outOpm').textContent = opm + '%';
 entSeries = [20, 45, 75, 85, 95].map(function (g) { return Math.min(98, 48 + g * 0.42 + kill * 0.08); });
 drawEntropyCanvas();
 }
 ['rngGen', 'rngKill', 'rngLoe'].forEach(function (id) { document.getElementById(id).addEventListener('input', updateEntropySim); });
 document.getElementById('eChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-eview]'); if (!b) return; state.eView = b.getAttribute('data-eview'); document.querySelectorAll('#eChartTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); drawEraCanvas(); });
 document.getElementById('gChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-gview]'); if (!b) return; state.gView = b.getAttribute('data-gview'); document.querySelectorAll('#gChartTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); drawGenomeCanvas(); });
 function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }

 var QITEMS = [
 { id: 'sec-c0', t: 'C0 科学中枢拓扑与双轨治理', s: 'To Serve Patients · SAB 外部科学顾问团 · 肥胖专班' },
 { id: 'sec-c1', t: 'C1 四大文化代码与研发罗盘', s: 'Be Science-Based · Ensure Quality · Compete · Teams' },
 { id: 'sec-c2', t: 'C2 三代掌舵演进时间轴', s: 'Rathmann → Sharer → Bradway 46年生物制药演进' },
 { id: 'sec-c3', t: 'C3 巨头药企组织基因光谱', s: 'AMGN vs Eli Lilly vs AbbVie vs Regeneron' },
 { id: 'sec-c4', t: 'C4 管线熵增模拟与六律体检', s: '遗传学靶点胜率模拟 · 6项组织健康度自检清单' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) { var q = (kw || '').trim().toLowerCase(); var m = QITEMS.filter(function (x) { return !q || (x.t + x.s).toLowerCase().indexOf(q) !== -1; }); qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join(''); qPop.classList.toggle('open', m.length > 0); }
 qIn.addEventListener('focus', function () { renderQ(qIn.value); }); qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; var t = document.querySelector(jb.getAttribute('data-jump')); if (t) t.scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth < 1024) { var o = document.getElementById('muiSidebar').classList.toggle('open'); document.getElementById('drawerBackdrop').classList.toggle('open', o); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.getElementById('muiSidebar').classList.remove('open'); document.getElementById('drawerBackdrop').classList.remove('open'); });
 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });

 function refreshAuditChip() { var bs = document.querySelectorAll('[data-cchk]'), d = 0; bs.forEach(function (x) { if (x.checked) d++; }); document.getElementById('auditScoreChip').textContent = '文化自检核验：' + d + ' / ' + bs.length + ' 项'; }
 try {
 var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (chk) { var k = chk.getAttribute('data-cchk'); chk.checked = !!savedA[k]; chk.addEventListener('change', function () { savedA[k] = chk.checked; try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {} refreshAuditChip(); showToast(chk.checked ? '已勾选该组织护城河指标' : '已取消勾选'); }); });
 refreshAuditChip();
 } catch (e) {}

 try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true); } catch (e) {}
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Amgen_Corporate_Culture_Blueprint.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出独立网页 Amgen_Corporate_Culture_Blueprint.html');
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });
 window.addEventListener('resize', drawAll);
 updateEntropySim(); drawAll();
 })();
 