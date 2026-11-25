
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var state = { theme: 'dark', lang: 'zh', fView: 'bridge', sView: 'cgm', pe: 25 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar'); if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)', blue: dark ? '#3399FF' : '#0073E6', violet: dark ? '#A78BFA' : '#7C3AED', green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706', red: dark ? '#FF6B6B' : '#DC2626' };
 }
 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }
 function localize(zh, en) { return state.lang === "en" ? en : zh; }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh'); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en'); }
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) { if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val; else nodes[i].textContent = val; }
 }
 renderHorizon();
 renderEngine();
 document.getElementById("chartTooltip").style.display = "none";
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 组合重塑与新品爬坡期 (2026–2027)',
 title: 'Exact Sciences 并表协同 × 营养品分拆落地 × Volt PFA 放量',
 items: [
 '<strong>营养品分拆完成：</strong>2027 年底前完成 $8.5B 营养品免税分拆，留存 ~$42B 纯粹高毛利主体。',
 '<strong>电生理双能工具箱：</strong>Volt PFA 与 TactiFlex Duo（RF+PFA）双获批，抢占房颤消融高增长份额。',
 '<strong>Libre Duo 与 SimpleScreen：</strong>双模血糖酮体传感器与血检结直肠癌筛查美国商业化放量。'
 ],
 prob: '兑现确定性：极高 (90%+)', impact: '年化增量营收池：+$4.5B–$6.5B'
 },
 {
 badge: 'HORIZON 2 · 全球渠道套利与利润率扩张期 (2028–2029)',
 title: 'Cologuard 借船出海 160 国 × Aveir 双腔起搏普及 × Lingo 消费破圈',
 items: [
 '<strong>肿瘤早筛国际化：</strong>借助雅培海外检验科与 Alinity 平台，打破 Exact Sciences 97% 局限于美国的瓶颈。',
 '<strong>心血管微创普及：</strong>Aveir 无导线起搏器替代传统带线产品，TriClip 与 Amulet 360 加速国际放量。',
 '<strong>去杠杆与利息节省：</strong>凭借百亿美元级经营现金流快速削减并购债务，释放纯利弹性。'
 ],
 prob: '兑现确定性：中高 (75%)', impact: '年化增量营收池：+$9.0B–$12.5B'
 },
 {
 badge: 'HORIZON 3 · 多分析物生物穿戴奇点期 (2030–2032)',
 title: '通用生物穿戴平台（血糖/酮体/乳酸/酒精）× 液态活检早筛生态',
 items: [
 '<strong>多分析物消费医疗：</strong>单一皮下微针平台同时追踪多种代谢物，深度绑定数字健康订阅。',
 '<strong>MRD 微小残留病灶监测：</strong>Exact Sciences 肿瘤全周期检测覆盖从早筛到术后复发监测。',
 '<strong>纯血 MedTech 估值跃迁：</strong>新雅培营收迈向 $66B+，高毛利耗材与诊断占比突破 75%。'
 ],
 prob: '兑现确定性：远期期权 (50%–60%)', impact: '年化增量营收池：+$15B+'
 }
 ];
 var HORIZONS_EN = [
 { badge: 'Horizon 1 · Portfolio reshaping (2026–2027)', title: 'Exact Sciences integration, nutrition separation and Volt PFA adoption',
   items: ['Separate the $8.5B nutrition business by the end of 2027, leaving a core business of about $42B.', 'Scale the dual-energy electrophysiology portfolio with Volt PFA and TactiFlex Duo.', 'Expand US commercialization of Libre Duo and the SimpleScreen colorectal screening blood test.'],
   prob: 'Estimated confidence: 90%+', impact: 'Incremental annual revenue: +$4.5B–$6.5B' },
 { badge: 'Horizon 2 · Global distribution and margin expansion (2028–2029)', title: 'Cologuard goes global, Aveir expands and Lingo reaches consumers',
   items: ['Use Abbott’s Alinity and lab network to extend early cancer screening beyond the US, which accounts for 97% of Exact Sciences’ exposure.', 'Expand adoption of Aveir leadless pacing, TriClip and Amulet 360.', 'Use operating cash flow to reduce acquisition debt and interest costs.'],
   prob: 'Estimated confidence: 75%', impact: 'Incremental annual revenue: +$9.0B–$12.5B' },
 { badge: 'Horizon 3 · Multi-analyte wearables (2030–2032)', title: 'Multi-analyte wearables and liquid-biopsy screening',
   items: ['Use a single microneedle platform for multiple biomarkers and connect it to digital-health subscriptions.', 'Extend oncology testing from screening to post-surgery monitoring of minimal residual disease.', 'The scenario projects more than $66B in revenue and a greater than 75% share from high-margin consumables and diagnostics.'],
   prob: 'Estimated confidence: 50%–60%', impact: 'Incremental annual revenue: +$15B or more' }
 ];
 var horizonIndex = 0;
 var hzTabs = document.getElementById('hzTabs');
 function renderHorizon() {
   var hz = (state.lang === 'en' ? HORIZONS_EN : HORIZONS)[horizonIndex];
   document.getElementById('hzBadge').textContent = hz.badge;
   document.getElementById('hzTitle').textContent = hz.title;
   document.getElementById('hzList').innerHTML = hz.items.map(function (text) {
     return '<li><span class="ft-hz-dot"></span><span>' + text + '</span></li>';
   }).join('');
   document.getElementById('hzProb').textContent = hz.prob;
   document.getElementById('hzImpact').textContent = hz.impact;
 }
 hzTabs.addEventListener('click', function (event) {
   var button = event.target.closest('[data-hz]');
   if (!button) return;
   horizonIndex = Number(button.dataset.hz);
   hzTabs.querySelectorAll('.ft-hz-btn').forEach(function (tab) { tab.classList.toggle('active', tab === button); });
   renderHorizon();
 });

 var ENGINES = [
 {
 badge: 'ENGINE 01 · NEXT-GEN BIOWEARABLES (LIBRE DUO & LINGO)',
 title: '从连续血糖迈向多分析物生物穿戴：Libre Duo（血糖+酮体）与消费级 Lingo',
 desc: 'FreeStyle Libre 已是年销 $76 亿的全球第一大医疗器械单品，2026 年 8 月获 FDA 批准的 Libre Duo 成为全球首款同步连续监测血糖与酮体的双分析物生物穿戴传感器，精准解决 1 型与重症糖尿病酮症酸中毒（DKA）预警刚需；而免处方 Lingo 与 Libre Rio 则把传感器平台延伸至数千万非胰岛素 2 型糖友及追求代谢健康的大众消费人群。',
 formula: '变现双轮：(1) 非胰岛素 2 型糖友医保扩面放量 + (2) 多分析物传感器（血糖/酮体/乳酸）溢价与 D2C 订阅',
 gauges: [['$7.6B+', 'FY2025 全球 CGM 年营收'], ['2026.08', 'Libre Duo 获 FDA 批准'], ['OTC 免处方', 'Lingo / Rio 切入消费市场'], ['26 枚/年', '高频 14 天复购耗材飞轮']]
 },
 {
 badge: 'ENGINE 02 · EXACT SCIENCES CANCER DIAGNOSTICS',
 title: '$230亿并购重塑诊断板块：Cologuard、Oncotype DX 与 SimpleScreen 血液早筛',
 desc: '2026 年 3 月 23 日完成交割的 Exact Sciences 为雅培开辟了 $600 亿美国癌症筛查与精准肿瘤诊断新赛道，Q3 2026 单季已贡献 $9.68 亿营收（同比可比 +13.8%），加上 9 月刚上市的 FDA 获批血液结直肠癌筛查 SimpleScreen CRC，雅培正将其接入 160 国 Alinity 检验科网络。',
 formula: '变现双轮：美国 Cologuard 渗透率提升 + 借助雅培 160 国商业化渠道实现 0→1 国际放量',
 gauges: [['$968M', 'Q3 2026 肿瘤诊断单季营收'], ['+13.8%', 'Q3 2026 同比可比增速'], ['$60B', '美国肿瘤早筛潜在 TAM'], ['160 国', '雅培海外渠道出海放大器']]
 },
 {
 badge: 'ENGINE 03 · ELECTROPHYSIOLOGY DUAL-ENERGY TOOLBOX',
 title: '电生理“全能工具箱”：Volt PFA + TactiFlex Duo 射频/脉冲双模消融',
 desc: '房颤消融正从传统热消融全面转向更安全的脉冲电场消融（PFA）。雅培于 2025 年 12 月获批 Volt PFA、2026 年 9 月获批 TactiFlex Duo（同一导管兼顾射频与 PFA 能量），并与自家 EnSite X 三维标测系统无缝集成，破解竞品缺乏贴靠感知与实时可视化的痛点。',
 formula: '利润传导：EnSite X 标测装机定锚 → 一次性高毛利 Volt / TactiFlex Duo 导管按手术台次消耗',
 gauges: [['+15.2%', '9M 2026 电生理同比增速'], ['$2.52B', '9M 2026 电生理累计营收'], ['RF + PFA', 'TactiFlex Duo 独家双能切换'], ['EnSite X', '实时三维接触力标测生态']]
 },
 {
 badge: 'ENGINE 04 · STRUCTURAL HEART MINIMALLY INVASIVE',
 title: '结构性心脏病微创矩阵：TriClip 三尖瓣修复、Navitor TAVR 与 Amulet 360',
 desc: '开胸瓣膜置换手术正加速被微创导管介入替代。雅培手握全球领先的 MitraClip 二尖瓣修复、首个获批的 TriClip 三尖瓣经导管修复、Navitor 主动脉瓣以及 2026 年 8 月获 CE 认证的下一代左心耳封堵器 Amulet 360，持续享受老龄化刚需红利。',
 formula: '变现逻辑：高值介入耗材单价高（$2万–$3万美元/套）+ 拓展中低危适应症人群',
 gauges: [['$2.52B', 'FY2025 结构性心脏年营收'], ['TriClip', '三尖瓣微创修复蓝海独占'], ['Amulet 360', '2026.08 获 CE Mark 认证'], ['+13.5%', 'Q3 2026 国际市场可比增速']]
 },
 {
 badge: 'ENGINE 05 · LEADLESS CARDIAC RHYTHM (AVEIR)',
 title: '双腔无导线起搏器 Aveir：以 10% 起点冲击 $50亿传统起搏器存量替代',
 desc: '传统起搏器需要开胸埋入脉冲发生器并穿入经静脉电极导线，长期存在感染与导线断裂风险。雅培 Aveir 是全球首款实现心房-心室无线通讯的双腔无导线起搏器，目前在 $50 亿全球起搏器市场渗透率仅约 10%，正处于从 10% 向 30%+ 加速替代的黄金S曲线。',
 formula: '变现逻辑：无导线微创植入替代传统带线系统，显著提升单套起搏器 ASP 与毛利池',
 gauges: [['$5.0B', '全球心脏起搏器年化市场'], ['~10%', '当前无导线品类渗透率'], ['+12.1%', '9M 2026 心律管理增速'], ['双腔同步', 'Aveir DR 独家无线通讯']]
 },
 {
 badge: 'ENGINE 06 · EMERGING-MARKET BRANDED GENERICS (EPD)',
 title: '新兴市场品牌仿制药 EPD：避开欧美红海，连续五年 >7% 稳健复利',
 desc: '雅培刻意完全放弃美国与西欧低价仿制药市场，将成熟药品部门（EPD）100% 聚焦印度、拉美与东南亚等新兴市场。当地患者与医生愿为雅培百年品牌溢价买单，未来正通过引入生物类似药（Biosimilars）进一步延长增长跑道。',
 formula: '变现逻辑：100% 新兴市场中产医疗消费升级 + 轻研发品牌溢价（高现金流反哺器械研发）',
 gauges: [['$5.54B', 'FY2025 EPD 年营收 (100% 国际)'], ['+10.9%', 'Q3 2026 重点新兴市场增速'], ['连续 5 年', '年化有机增速稳超 7%'], ['生物类似药', '下一代新兴市场增量引擎']]
 }
 ];
 var ENGINES_EN = [
 ['From CGM to multi-analyte wearables', 'FreeStyle Libre generates $7.6B in annual sales. Libre Duo adds continuous ketone monitoring to glucose monitoring, and Lingo and Libre Rio extend the platform to consumers and people with non-insulin-treated type 2 diabetes.', 'Growth drivers: broader insurance coverage, premium sensors and consumer subscriptions.', [['$7.6B+', 'FY2025 global CGM revenue'], ['Aug 2026', 'Libre Duo FDA approval'], ['OTC', 'Lingo and Libre Rio'], ['26/year', '14-day sensor replacement cycle']]],
 ['Exact Sciences expands Abbott’s cancer-diagnostics portfolio', 'The $23B acquisition closed in March 2026. The business contributed $968M in Q3 2026, up 13.8% on a comparable basis. Abbott plans to distribute products including SimpleScreen through its Alinity network.', 'Growth drivers: more US Cologuard adoption and commercialization across 160 countries.', [['$968M', 'Q3 2026 oncology diagnostics revenue'], ['+13.8%', 'Q3 2026 comparable growth'], ['$60B', 'Potential US screening market'], ['160 countries', 'Abbott’s commercial network']]],
 ['Dual-energy electrophysiology: Volt PFA and TactiFlex Duo', 'Abbott’s Volt PFA and dual-energy TactiFlex Duo work with the EnSite X 3D mapping system, combining pulse field and radiofrequency ablation options.', 'Installed EnSite X systems drive recurring sales of disposable catheters.', [['+15.2%', '9M 2026 electrophysiology growth'], ['$2.52B', '9M 2026 electrophysiology revenue'], ['RF + PFA', 'Dual-energy TactiFlex Duo'], ['EnSite X', '3D mapping platform']]],
 ['Minimally invasive structural heart: TriClip, Navitor and Amulet 360', 'Abbott’s structural heart portfolio includes MitraClip for mitral repair, TriClip for tricuspid repair, Navitor for aortic replacement and Amulet 360 for left atrial appendage closure.', 'Revenue depends on device sales and wider indications for catheter-based intervention.', [['$2.52B', 'FY2025 structural heart revenue'], ['TriClip', 'Transcatheter tricuspid repair'], ['Amulet 360', 'CE mark in August 2026'], ['+13.5%', 'Q3 2026 international comparable growth']]],
 ['Aveir dual-chamber leadless pacing', 'Aveir links atrial and ventricular pacing without traditional transvenous leads. Leadless devices account for about 10% of a $5B global pacemaker market.', 'Growth depends on replacement of conventional pacemakers and adoption of higher-value leadless devices.', [['$5.0B', 'Global pacemaker market'], ['~10%', 'Leadless penetration'], ['+12.1%', '9M 2026 rhythm management growth'], ['Dual chamber', 'Aveir DR wireless communication']]],
 ['Established pharmaceuticals in emerging markets', 'Abbott focuses branded generics on emerging markets such as India, Latin America and Southeast Asia. Biosimilars are a potential source of additional growth.', 'An established brand and a relatively light research burden support cash generation.', [['$5.54B', 'FY2025 EPD revenue'], ['+10.9%', 'Q3 2026 key emerging market growth'], ['5 years', 'Organic growth above 7%'], ['Biosimilars', 'Potential future growth driver']]]
 ];
 var engineIndex = 0;
 var rail = document.getElementById('engineRail');
 function renderEngine() {
   var eg = ENGINES[engineIndex];
   var english = ENGINES_EN[engineIndex];
   document.getElementById('engBadge').textContent = eg.badge;
   document.getElementById('engTitle').textContent = localize(eg.title, english[0]);
   document.getElementById('engDesc').textContent = localize(eg.desc, english[1]);
   document.getElementById('engFormula').textContent = localize(eg.formula, english[2]);
   document.getElementById('engGauges').innerHTML = localize(eg.gauges, english[3]).map(function (gauge) {
     return '<div class="ft-gauge-card"><b class="mono">' + gauge[0] + '</b><span>' + gauge[1] + '</span></div>';
   }).join('');
 }
 rail.addEventListener('click', function (event) {
   var button = event.target.closest('[data-eng]');
   if (!button) return;
   engineIndex = Number(button.dataset.eng);
   rail.querySelectorAll('.ft-rail-btn').forEach(function (tab) { tab.classList.toggle('active', tab === button); });
   renderEngine();
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect();
 if (!rect.width || !rect.height) return null;
 var w = rect.width, h = rect.height;
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr);
 ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'bridge') {
 var steps = [
 { lbl: localize('2027新雅培', "2027 Abbott"), v: 42.0, b: 0, col: pal.blue, tip: localize('分拆 $8.5B 营养品后的纯粹“新雅培”基准底座: ~$42.0B', "Base revenue after the $8.5B nutrition separation: ~$42.0B.") },
 { lbl: localize('+CGM穿戴', "+CGM"), v: 7.2, b: 42.0, col: pal.green, tip: localize('FreeStyle Libre + Libre Duo + Lingo OTC 5年新增营收 +$7.2B', "FreeStyle Libre, Libre Duo and Lingo OTC: +$7.2B in revenue over five years.") },
 { lbl: localize('+肿瘤/核心Dx', "+Cancer & Lab Dx"), v: 6.4, b: 49.2, col: pal.violet, tip: localize('Exact Sciences 全球化 + SimpleScreen CRC + Alinity 新增 +$6.4B', "Exact Sciences international expansion, SimpleScreen CRC and Alinity: +$6.4B.") },
 { lbl: localize('+电生理/结构', "+EP & Heart"), v: 6.8, b: 55.6, col: pal.blue, tip: localize('Volt PFA + TactiFlex Duo + TriClip + Aveir 新增 +$6.8B', "Volt PFA, TactiFlex Duo, TriClip and Aveir: +$6.8B.") },
 { lbl: localize('+EPD新兴药', "+Emerging Markets"), v: 3.6, b: 62.4, col: pal.amber, tip: localize('新兴市场品牌仿制药与生物类似药稳健新增 +$3.6B', "Emerging-market branded generics and biosimilars: +$3.6B.") },
 { lbl: localize('FY32E蓝图', "FY32E Outlook"), v: 66.0, b: 0, col: pal.green, tip: localize('FY2032E 新雅培远期营收蓝图: ~$66.0B（高毛利器械与诊断占比 >80%）', "FY2032E revenue: ~$66.0B, with devices and diagnostics contributing over 80%.") }
 ];
 var maxB = 72;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph, yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col; roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(1) + 'B', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
 ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20, Math.max(1, pw / (state.fView === "bridge" ? steps.length : segs.length) - 5));
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var segs = [
 { name: localize('肿瘤诊断 (Exact)', "Cancer Dx"), gr: 13.8, col: pal.violet, tip: localize('Q3 2026 同比可比增速 +13.8%，毛利率高于集团均值', "Q3 2026 comparable growth was +13.8%, with gross margin above the group average.") },
 { name: localize('医疗器械', "Devices"), gr: 11.9, col: pal.green, tip: localize('FY2025 有机增速 +11.9%（9M26 +8.2%），集团第一核心利润池', "FY2025 organic growth was +11.9% (9M26: +8.2%). Devices are the largest profit pool.") },
 { name: localize('新兴市场 EPD', "Emerging EPD"), gr: 8.4, col: pal.blue, tip: localize('Q3 2026 同比可比增速 +8.4%（重点新兴市场 +10.9%）', "Q3 2026 comparable growth was +8.4% (+10.9% in key emerging markets).") },
 { name: localize('核心实验室 Dx', "Core Lab Dx"), gr: 5.4, col: pal.amber, tip: localize('Q3 2026 同比可比增速 +5.4%（Alinity 装机稳健放量）', "Q3 2026 comparable growth was +5.4%, supported by Alinity installations.") },
 { name: localize('拟分拆营养品', "Nutrition"), gr: 1.2, col: pal.red, tip: localize('FY2025 有机增速仅 +1.2%（9M26 -2.1%），拟于 2027 年底前分拆', "FY2025 organic growth was +1.2% (9M26: -2.1%). Separation is planned by the end of 2027.") }
 ];
 var maxG = 16, sl = pw / segs.length, bw = Math.min(44, sl * 0.54);
 for (var g = 0; g <= 4; g++) {
 var gv = g * 4, gy = pad.top + ph - (gv / maxG) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 segs.forEach(function (s, i) {
 var x = pad.left + i * sl + (sl - bw) / 2, bh = (s.gr / maxG) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = s.col; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('+' + s.gr.toFixed(1) + '%', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
 ctx.fillText(s.name, x + bw / 2, pad.top + ph + 20, Math.max(1, pw / (state.fView === "bridge" ? steps.length : segs.length) - 5));
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: s.name, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E'];

 var s1 = state.sView === 'cgm' ? [7.6, 8.4, 9.4, 10.5, 11.6, 12.8] : [2.76, 3.35, 3.95, 4.55, 5.15, 5.80];
 var s2 = state.sView === 'cgm' ? [3.2, 3.7, 4.3, 4.9, 5.6, 6.4] : [2.52, 2.85, 3.30, 3.80, 4.35, 4.95];
 var lbl1 = state.sView === 'cgm' ? 'FreeStyle Libre + Lingo ($B)' : localize('电生理 Volt/TactiFlex ($B)', "EP Volt/TactiFlex ($B)");
 var lbl2 = state.sView === 'cgm' ? localize('Exact Sciences 肿瘤诊断 ($B)', "Exact Sciences Cancer Dx ($B)") : localize('结构性心脏病 TriClip/Navitor ($B)', "Structural Heart TriClip/Navitor ($B)");
 var maxY = state.sView === 'cgm' ? 14.5 : 7.0;

 for (var g = 0; g <= 4; g++) {
 var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
 }
 function plotS(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxY) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxY) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 0 || idx === 5) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1) + 'B', px, py - 8);
 }
 hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: localize('预计年营收约 $', "Estimated annual revenue: $") + v.toFixed(2) + 'B' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / 5) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotS(s1, pal.blue, lbl1);
 plotS(s2, pal.violet, lbl2);
 }

 var OPT_DATA = {
 cgm: { rev: 4.5, net: 1.55 },
 onc: { rev: 3.2, net: 1.15 },
 ep: { rev: 2.4, net: 0.88 },
 sh: { rev: 2.1, net: 0.72 },
 spin: { rev: 0.0, net: 0.90 }
 };
 var miniCaps = [179.9, 238.0, 345.0];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = [localize('当前ABT市值', "ABT today"), localize('2030基础盘', "2030 base"), localize('2030含期权', "2030 upside")];
 var maxV = Math.max(420, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(0) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16, Math.max(1, slot - 5));
 });
 }

 function recalcOptionality() {
 var baseRev = 47.0, baseNet = 9.50, sh2030 = 1.72;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) { var d = OPT_DATA[chk.getAttribute('data-opt')]; if (d) { addRev += d.rev; addNet += d.net; } }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var eps = totNet / sh2030;
 var mcapB = totNet * state.pe, baseMcapB = baseNet * state.pe;
 document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(1) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + Math.round(mcapB) + 'B';
 miniCaps = [179.9, baseMcapB, mcapB];
 drawOptMiniCanvas();
 }
 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]'); if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 25;
 var bs = peTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 recalcOptionality();
 });
 }

 function bindSeg(gid, attr, skey, fn) {
 var g = document.getElementById(gid); if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) {
 var rg = arr[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
 tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
 } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['futureCanvas', 'siliconCanvas'].forEach(bindTip);
 function drawAll() { drawFutureCanvas(); drawSiliconCanvas(); drawOptMiniCanvas(); }

 var QITEMS = [
 { id: 'sec-f0', t: 'F0 组合大重置与三阶时间窗雷达', s: 'Exact Sciences 并购 + 2027 营养品分拆 · 2026–2032 战略路径' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎深潜舱', s: 'Libre Duo / Lingo · Exact 肿瘤早筛 · Volt PFA · TriClip · Aveir · EPD' },
 { id: 'sec-f2', t: 'F2 瘦身增效与 2032E $66B 营收桥', s: '分拆低速营养品 · 对标纯血 MedTech 倍数重估逻辑' },
 { id: 'sec-f3', t: 'F3 新器械与肿瘤诊断双擎渗透', s: 'CGM 迈向 $12.8B · 肿瘤诊断迈向 $6.4B · 电生理与结构性心脏' },
 { id: 'sec-f4', t: 'F4 2030 新雅培估值重估实验室', s: '自由开关五大催化剂与 MedTech 估值倍数测算总市值' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 if (!qPop) return;
 var q = (kw || '').trim().toLowerCase();
 var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 if (qIn && qPop) {
 qIn.addEventListener('focus', function () { renderQ(qIn.value); });
 qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) {
 var jb = e.target.closest('[data-jump]'); if (!jb) return;
 var target = document.querySelector(jb.getAttribute('data-jump')); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 }
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else { document.body.classList.toggle('sidebar-collapsed'); }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) { var dh = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }
 }, { passive: true });

 document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var nt = btn.getAttribute('data-portal-theme');
 applyTheme(nt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nt); } catch (e) {}
 });
 });
 var exBtn = document.getElementById('exportHtmlBtn');
 if (exBtn) {
 exBtn.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'Abbott_Future_Horizon_2030_Blueprint.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast('已导出独立网页 Abbott_Future_Horizon_2030_Blueprint.html');
 });
 }

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
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang');
 applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 