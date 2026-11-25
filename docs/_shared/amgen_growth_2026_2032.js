
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'rd', pe: 20 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

 function showToast(msg) { var bar = document.getElementById('muiSnackbar'); if (!bar) return; bar.textContent = msg; bar.classList.add('show'); clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000); }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: dark ? '#3399FF' : '#0073E6', violet: dark ? '#A78BFA' : '#7C3AED', green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706', red: dark ? '#FF6B6B' : '#DC2626' };
 }
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
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh'); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en'); }
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
 var val = el.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) { if (val.indexOf('<span') !== -1) el.innerHTML = val; else el.textContent = val; }
 });
 drawAll(); if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var HORIZONS = [
 { badge: 'HORIZON 1 · 商业化放量与临床读数密集期 (2026–2027)', title: 'Repatha/Tezspire 扩适应症 × Imdelltra 一线推进 × MariTide III期读数', items: ['<strong>Imdelltra 跃迁一线：</strong>DeLLphi-305 (1L SCLC 维持) 降低死亡风险 58%，开启十亿美元级一线市场扩容。', '<strong>自免与仿制双收：</strong>Dazodalibep (干燥综合征 OASIZ-301) 与 Tezspire (EoE) 递交上市；ABP 206 (Opdivo 仿制药) 冲刺获批。', '<strong>MARITIME 首波数据：</strong>MariTide 慢性体重管理 III 期核心数据陆续揭晓，决定百亿美元减重期权估值重估。'], prob: '兑现确定性：高 (85%+)', impact: '年化增量营收池：+$6B–$9B' },
 { badge: 'HORIZON 2 · 重磅新药放量与仿制收获期 (2028–2029)', title: 'MariTide 全球铺量 × Olpasiran 心血管结局 × Keytruda 仿制接棒', items: ['<strong>MariTide 长效商业化：</strong>凭借每 8 周/每季维持给药优势切入肥胖、HFpEF 心衰与 OSA 蓝海，本土新建工厂同步满产。', '<strong>Olpasiran Lp(a) 破局：</strong>OCEAN(a)-Outcomes III 期若成功，将与 Repatha 构成心血管降脂双壁。', '<strong>PD-1 仿制药放量：</strong>ABP 206 与 ABP 234 (Keytruda 仿制药) 承接全球最大肿瘤免疫专利到期红利。'], prob: '兑现确定性：中高 (70%)', impact: '年化增量营收池：+$15B–$22B' },
 { badge: 'HORIZON 3 · AI 生成生物学全面工业化 (2030–2032)', title: 'Xaluritamig 实体瘤集群 × 生成式蛋白药物管线井喷', items: ['<strong>实体瘤 BiTE 霸主：</strong>Xaluritamig (STEAP1 前列腺癌) 与新一代多特异性偶联体全面商业化。', '<strong>AI 设计分子进 III 期：</strong>deCODE + Freyja 超算集群从头设计的蛋白药物批量进入后期临床，研发周期压缩 30%+。', '<strong>去杠杆完成重启回购：</strong>Horizon 债务消化完毕，千亿市值级别充沛自由现金流全面回馈股东。'], prob: '兑现确定性：远期期权 (50%–60%)', impact: '年化增量营收池：+$25B+' }
 ];
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]'); if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 hzTabs.querySelectorAll('.ft-hz-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var hz = HORIZONS[idx];
 document.getElementById('hzBadge').textContent = hz.badge; document.getElementById('hzTitle').textContent = hz.title;
 document.getElementById('hzList').innerHTML = hz.items.map(function (t) { return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>'; }).join('');
 document.getElementById('hzProb').textContent = hz.prob; document.getElementById('hzImpact').textContent = hz.impact;
 });

 var ENGINES = [
 { badge: 'ENGINE 01 · MARITIDE (AMG 133) ANTIBODY-PEPTIDE CONJUGATE', title: 'MariTide：用“抗体骨架 + 双重靶点调控”破解 GLP-1 停药痛点', desc: '现有周制剂 GLP-1 面临高昂的真实世界停药率。安进将 GLP-1 受体激动肽与 GIPR 拮抗单抗共价偶联，使 MariTide 在 II 期实现高达 ~20% 的平均减重幅度，且半衰期支持每月一次起始、后续过渡到每 8 周或每季度一次维持（全年仅需 4–6 针）。目前 MARITIME 项目已全面铺开体重管理、T2D、心血管结局、心衰、OSA 及换药维持等十余项 III 期研究。', formula: '差异化抓手：4–6 针/年超长给药间隔 + 针对周制剂停药人群的 SWITCH 转换临床 + 美国本土扩产保供', gauges: [['~20%', 'II期无糖尿病组平均减重'], ['4–6 针/年', '目标长效维持给药频率'], ['10+ 项', 'MARITIME 全球 III 期'], ['2027–2028', '商业化上市与放量主窗口']] },
 { badge: 'ENGINE 02 · BITE SOLID TUMOR PLATFORM (IMDELLTRA & AMG 509)', title: 'BiTE 双抗实体瘤革命：从血液瘤走向小细胞肺癌与前列腺癌', desc: '双特异性 T 细胞衔接器（BiTE）曾长期受限于实体瘤微环境。安进凭借 Imdelltra (DLL3 BiTE) 在 DeLLphi-305 一线小细胞肺癌维持治疗中实现死亡风险大降 58%（同步发表于 NEJM），并在 Q3 2026 实现营收暴涨 +128% 至 $406M；紧随其后的 STEAP1 靶向双抗 Xaluritamig (AMG 509) 正开展 XALute 与 XALience 两项前列腺癌 III 期临床。', formula: '商业逻辑：单抗/ADC 之后的新一代免疫衔接疗法，兼顾皮下制剂便捷化（DeLLphi-315）以扩大门诊渗透', gauges: [['-58% 死亡', 'DeLLphi-305 1L SCLC 风险比'], ['+128% YoY', 'Imdelltra Q3 2026 增速'], ['37.9 个月', 'DeLLphi-303 1L 中位 OS'], ['Xaluritamig', 'STEAP1 前列腺癌两项 III 期']] },
 { badge: 'ENGINE 03 · OLPASIRAN (AMG 890) LP(A) SIRNA', title: '心血管基因精准打击：Olpasiran 攻克不可控遗传风险因子 Lp(a)', desc: '全球约 20% 人群携带高脂蛋白(a) [Lp(a)]，这是由基因决定、无法通过饮食运动或传统他汀药物降低的心血管独立杀手。Olpasiran 是一款潜在同类最佳（Best-in-Class）小干扰 RNA（siRNA），II 期临床实现高达 95% 的 Lp(a) 降幅且支持超低频给药，目前正推进 OCEAN(a)-Outcomes（二级预防）与 OCEAN(a)-PreEvent（一级预防）等三项 III 期研究。', formula: '协同飞轮：Olpasiran (Lp(a)) + Repatha (LDL-C，VESALIUS-CV 降全因死亡 20%) = 心血管全栈统治力', gauges: [['-95% Lp(a)', 'II 期临床最大降幅实测'], ['3 项 III 期', 'OCEAN(a) 一级/二级预防'], ['全球 20%', '潜在高 Lp(a) 遗传风险人群'], ['$3B–$5B', '2030+ 峰值销售潜力区间']] },
 { badge: 'ENGINE 04 · AUTOIMMUNE & RARE DISEASE EXPANSION', title: '自免与罕见病双轮扩圈：Dazodalibep、Daxdilimab 与 Tezspire', desc: '除 Horizon 带来的 Uplizna（Q3 26 +191%）与 Krystexxa（+31%）外，安进自主与合作管线迎来密集丰收：CD40L 抑制剂 Dazodalibep 在干燥综合征（Sjögren\'s）III 期 OASIZ-301 达到主要终点；ILT7 靶向药 Daxdilimab 在盘状红斑狼疮 II 期表现优异拟推 III 期；Tezspire 则在嗜酸性粒细胞食管炎（EoE）III 期达标并拓展 COPD。', formula: '战略定位：在 Enbrel 面临 IRA 降价背景下，以新一代高精准自免大单品完成利润接棒', gauges: [['OASIZ-301', '干燥综合征 III 期成功达标'], ['68.9%', 'Tezspire EoE 24周组织学缓解'], ['+191% YoY', 'Uplizna Q3 2026 暴涨'], ['COPD III 期', 'Tezspire 潜在重磅大适应症']] },
 { badge: 'ENGINE 05 · NEXT-WAVE BIOSIMILARS (ABP 206 & ABP 234)', title: 'PD-1 超级专利悬崖收割机：瞄准 Opdivo 与 Keytruda 全球市场', desc: '生物类似药板块 2025 年营收已跳升至 $30亿（Pavblu 2026 Q3 单季达 $300M, +41%）。展望 2027–2030 年，全球销售额超 $350亿 的 PD-1 免疫检查点抑制剂将陆续迎来专利到期。安进对标 Opdivo 的 ABP 206 上市申请（BLA）已获 FDA 受理，对标 Keytruda 的 ABP 234 在两项关键临床中均达到全部主要与次要终点。', formula: '盈利逻辑：复用现有肿瘤商业团队与生物原液工厂，以极低边际研发与推广费用收割高确定性现金流', gauges: [['ABP 206', 'Opdivo 仿制药 BLA 已获受理'], ['ABP 234', 'Keytruda 仿制药双终点达标'], ['$3.0B+', 'FY2025 仿制药板块年化规模'], ['+71% 销量', 'Pavblu Q3 26 放量验证渠道力']] },
 { badge: 'ENGINE 06 · GENERATIVE BIOLOGY & AI FACTORY', title: '生成生物学 AI 工厂：deCODE 多组学 + NVIDIA Freyja 重塑研发曲线', desc: '传统生物药发现需要数轮漫长湿实验试错。安进在雷克雅未克 deCODE 部署 NVIDIA DGX SuperPOD “Freyja” 超级计算机，基于超 200 PB 人类基因组与蛋白组数据训练生成式蛋白设计模型，在计算机内预先模拟数百万种分子结构与免疫原性，将靶点到临床候选分子的周期显著缩短。', formula: '远期复利：不仅服务单款药物，而是系统性提升整个 2030 年代管线的分子成药率与迭代速度', gauges: [['200+ PB', 'deCODE 人类多组学数据底座'], ['Freyja', 'NVIDIA DGX SuperPOD 算力集群'], ['$200M 中心', '印度海得拉巴 AI 与数据研发枢纽'], ['20,000 人', '全公司部署生成式 AI 协同办公']] }
 ];
 var rail = document.getElementById('engineRail');
 if (rail) rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]'); if (!b) return;
 var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 rail.querySelectorAll('.ft-rail-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var eg = ENGINES[idx];
 document.getElementById('engBadge').textContent = eg.badge; document.getElementById('engTitle').textContent = eg.title;
 document.getElementById('engDesc').textContent = eg.desc; document.getElementById('engFormula').textContent = eg.formula;
 document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) { return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>'; }).join('');
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(260, r.width || 480), h = Math.max(135, r.height || 260);
 var dpr = Math.min(window.devicePixelRatio || 1, 2); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var sites = [
 { name: '北卡罗来纳原液', cap: 1000, col: pal.green, tip: 'Holly Springs 生物原液制造基地扩建投资 $1.0B' },
 { name: '俄亥俄智能灌装', cap: 900, col: pal.blue, tip: '俄亥俄州 AI 驱动自动化无菌制造基地投资 $900M' },
 { name: '波多黎各基地', cap: 650, col: pal.violet, tip: '波多黎各核心生物制剂产能升级投资 $650M' },
 { name: '千橡市研发中心', cap: 600, col: pal.amber, tip: '加州总部新建科学与创新中心投资 $600M' },
 { name: '海得拉巴 AI中心', cap: 200, col: pal.blue, tip: '印度海得拉巴 AI 与数据科学中心投资 $200M' }
 ];
 var maxC = 1150;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / sites.length, bw = Math.min(44, slot * 0.56);
 sites.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.cap + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name, body: p.tip });
 });
 } else {
 var steps = [
 { lbl: 'FY25基准', v: 36.8, b: 0, col: pal.blue, tip: 'FY2025 实际总营收: $36.75B' },
 { lbl: '+存量增长线', v: 7.2, b: 36.8, col: pal.green, tip: 'Repatha、Evenity、Tezspire、Uplizna 等持续放量贡献 +$7.2B' },
 { lbl: '-LOE/IRA侵蚀', v: 4.5, b: 39.5, col: pal.red, tip: 'Prolia/Xgeva 仿制药及 Enbrel IRA 降价拖累 -$4.5B' },
 { lbl: '+MariTide期权', v: 10.5, b: 39.5, col: pal.violet, tip: 'MariTide 长效减重与心血管/OSA 适应症放量 +$10.5B' },
 { lbl: '+BiTE/Olpasiran', v: 11.2, b: 50.0, col: pal.amber, tip: 'Imdelltra/Xaluritamig 双抗、Olpasiran 与新仿制药 +$11.2B' },
 { lbl: 'FY32E蓝图', v: 61.2, b: 0, col: pal.green, tip: 'FY2032E 远期营收蓝图: ~$61.2B' }
 ];
 var maxB = 68;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2, yt = pad.top + ph - ((s.b + s.v) / maxB) * ph, yb = pad.top + ph - (s.b / maxB) * ph, bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col; roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((i === 2 ? '-' : (s.b > 0 ? '+' : '')) + '$' + s.v.toFixed(1) + 'B', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.sView === 'rd') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var rd = [4.8, 4.4, 4.8, 6.0, 7.3, 7.9];
 var maxR = 9.0, slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 for (var g = 0; g <= 3; g++) {
 var gv = g * 3, gy = pad.top + ph - (gv / maxR) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (rd[i] / maxR) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 4 ? pal.violet : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + rd[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 年度研发投入', body: '全年研发投入约 $' + rd[i].toFixed(1) + 'B（9M 2026 已达 $5.70B，+11% YoY）' });
 });
 } else {
 var engs = [
 { n: 'MariTide', v: 12.0, col: pal.green },
 { n: 'BiTE 双抗', v: 6.5, col: pal.violet },
 { n: 'PD-1 仿制', v: 5.0, col: pal.blue },
 { n: 'Olpasiran', v: 4.0, col: pal.amber },
 { n: '自免新管线', v: 3.5, col: pal.blue }
 ];
 var maxT = 14, slot2 = pw / engs.length, bw2 = Math.min(44, slot2 * 0.56);
 for (var k = 0; k <= 3; k++) {
 var kv = Math.round((maxT / 3) * k), ky = pad.top + ph - (kv / maxT) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 engs.forEach(function (e, i) {
 var x = pad.left + i * slot2 + (slot2 - bw2) / 2, bh = (e.v / maxT) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = e.col; roundRect(ctx, x, yt, bw2, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + e.v.toFixed(1) + 'B', x + bw2 / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(e.n, x + bw2 / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw2, h: bh, title: e.n + ' 峰值潜力中值', body: '2030+ 年化峰值销售潜能测算中值约 $' + e.v.toFixed(1) + 'B' });
 });
 }
 }

 var OPT_DATA = { maritide: { rev: 9.5, net: 3.9 }, bite: { rev: 5.2, net: 2.1 }, olp: { rev: 3.4, net: 1.4 }, auto: { rev: 3.1, net: 1.2 }, biosim: { rev: 3.8, net: 1.3 } };
 var miniCaps = [235, 290, 448];
 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前参考市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(550, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + Math.round(v) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }
 function recalcOptionality() {
 var baseRev = 37.2, baseNet = 13.8, sh2030 = 0.520;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) { if (chk.checked) { var d = OPT_DATA[chk.getAttribute('data-opt')]; if (d) { addRev += d.rev; addNet += d.net; } } });
 var totRev = baseRev + addRev, totNet = baseNet + addNet, eps = totNet / sh2030, mcapB = totNet * state.pe, baseMcapB = baseNet * state.pe;
 document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(1) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + Math.round(mcapB) + 'B';
 miniCaps = [235, baseMcapB, mcapB]; drawOptMiniCanvas();
 }
 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]'); if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 20;
 peTabs.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 recalcOptionality();
 });

 function bindSeg(gid, attr, skey, fn) {
 var g = document.getElementById(gid); if (!g) return;
 g.addEventListener('click', function (e) { var b = e.target.closest('[' + attr + ']'); if (!b) return; state[skey] = b.getAttribute(attr); g.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); fn(); });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip'); if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) { var rg = arr[i]; if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; } }
 if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
 else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['futureCanvas', 'siliconCanvas'].forEach(bindTip);
 function drawAll() { drawFutureCanvas(); drawSiliconCanvas(); drawOptMiniCanvas(); }

 var QITEMS = [
 { id: 'sec-f0', t: 'F0 战略宣言与三阶时间窗雷达', s: 'MariTide × BiTE 实体瘤 × deCODE AI 三大增长极' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'MariTide · Imdelltra/509 · Olpasiran · 自免 · PD-1 仿制 · AI' },
 { id: 'sec-f2', t: 'F2 美国本土生物制造扩产与 2032 营收桥', s: '逾 $31.5亿 自动化生物工厂 · 迈向 $61B+ 营收路径' },
 { id: 'sec-f3', t: 'F3 生成生物学 AI 工厂矩阵', s: 'deCODE 200PB + NVIDIA Freyja SuperPOD · 研发攀升至 $7.9B' },
 { id: 'sec-f4', t: 'F4 2030 $600亿营收期权组装器', s: '自由开关五大重磅管线期权与 P/E 倍数测算目标市值' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 if (!qPop) return; var q = (kw || '').trim().toLowerCase();
 var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 if (qIn && qPop) {
 qIn.addEventListener('focus', function () { renderQ(qIn.value); }); qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; var target = document.querySelector(jb.getAttribute('data-jump')); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 }
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) { var dh = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }
 }, { passive: true });

 try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true); } catch (e) {}
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Amgen_Future_Horizon_2030_Blueprint.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出独立网页 Amgen_Future_Horizon_2030_Blueprint.html');
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });
 var rt = null; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality(); drawAll();
 })();
 