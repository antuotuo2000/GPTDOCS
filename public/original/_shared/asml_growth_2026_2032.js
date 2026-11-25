
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'ibm', pe: 34 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar'); if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
 blue: dark ? '#3399FF' : '#0073E6', violet: dark ? '#A78BFA' : '#7C3AED',
 green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706', red: dark ? '#FF6B6B' : '#DC2626'
 };
 }
 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }
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
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 高确定性订单兑现期 (2026–2027)',
 title: '€44–45B 营收提前撞线 × NXE:3800E 全速交付 × IBM 升级潮',
 items: [
 '<strong>2026 业绩暴冲：</strong>Q3 创 €11.7B 营收与 57.5% 毛利率，全年上调至 €44B–€45B（提前四年触及 2030 指引下沿）。',
 '<strong>2027 EUV 扩产爬坡：</strong>Low-NA EUV 产能由 ~65 台向 ~85 台推进，组装周期由 22 周压缩至 15–16 周。',
 '<strong>装机升级爆发：</strong>晶圆厂急切扩产带动 3800 系列现场升级，IBM 单季稳居 €3B+ 高毛利区。'
 ],
 prob: '兑现确定性：极高 (90%+)', impact: '年化营收区间：€44B–€50B'
 },
 {
 badge: 'HORIZON 2 · High-NA 量产与百台 EUV 放量期 (2028–2029)',
 title: '三星 High-NA 量产 × 110+ 台 EUV 产能突破 × 毛利率冲刺 58%',
 items: [
 '<strong>三星 2028 HVM 启动：</strong>High-NA EUV 交付量迈向 10–20 台/年，单机 €3.8亿+ 均价拉动营收与毛利率爬坡。',
 '<strong>超越 30% 扩产上限：</strong>2028 年探索突破 110 台 Low-NA EUV 年产能，匹配全球 AI 晶圆厂扩建潮。',
 '<strong>3D 封装与 AI 赋能：</strong>XT:260 放量服务 HBM4 堆叠，Mistral AI 全面嵌入计算光刻软件与自诊断。'
 ],
 prob: '兑现确定性：中高 (80%)', impact: '年化营收区间：€52B–€60B'
 },
 {
 badge: 'HORIZON 3 · 12英寸大掩膜与后埃米时代奇点 (2030–2032)',
 title: '台积电 High-NA 全面导入 × 12英寸掩膜标准 × Hyper-NA 预研',
 items: [
 '<strong>台积电 2030 High-NA 全面导入：</strong>全球三大先进制程巨头齐步跨入 0.55 NA 量产，High-NA 成为 1.4nm 及以下标配。',
 '<strong>12 英寸大掩膜联盟落地：</strong>突破传统 6 英寸光掩膜视场极限，直接赋能超大尺寸单芯片 AI 算力簇。',
 '<strong>Hyper-NA 下一代物理探索：</strong>锁定 2032+ 亚纳米时代光刻路线图，延续长达半世纪的绝对技术代差。'
 ],
 prob: '兑现确定性：远期主线 (65%+)', impact: '年化营收区间：€62B–€75B+'
 }
 ];
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]'); if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 var bs = hzTabs.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var hz = HORIZONS[idx];
 document.getElementById('hzBadge').textContent = hz.badge;
 document.getElementById('hzTitle').textContent = hz.title;
 document.getElementById('hzList').innerHTML = hz.items.map(function (t) { return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>'; }).join('');
 document.getElementById('hzProb').textContent = hz.prob;
 document.getElementById('hzImpact').textContent = hz.impact;
 });
 }

 var ENGINES = [
 {
 badge: 'ENGINE 01 · HIGH-NA EUV (0.55 NA) COMMERCIALIZATION',
 title: 'High-NA EUV (EXE:5200B)：单次曝光突破 8nm 分辨率，开启 €3.8亿+ 超高端光刻纪元',
 desc: '传统 0.33 NA EUV 在 2nm 以下节点需依赖繁琐昂贵的多重曝光（Multi-Patterning），而 High-NA EUV 将数值孔径提升至 0.55，使分辨率提升 1.7 倍、晶体管密度跃升近 3 倍。2026 年 1 月 Intel 正式验收 EXE:5200B 进入高量产准备；Q3 2026 电话会确认三星将于 2028 年启动 High-NA 量产，台积电则于 2030 年全面导入，年交付规模正从个位数向 2027–2028 年 10–20 台爬坡。',
 formula: '盈利杠杆：High-NA 单价较 Low-NA 跃升 ~70%–80% → 随 EXE:5200B 爬坡越过初期摊销，将毛利率推向 56%–60% 区间',
 gauges: [['0.55 NA', '1.7倍分辨率 / 3倍密度飞跃'], ['10 台', '截至 2026.09 全球已安装数'], ['2028 / 2030', '三星 / 台积电确认 HVM 节点'], ['40,000 零件', '蔡司 12 吨重核心光学系统']]
 },
 {
 badge: 'ENGINE 02 · LOW-NA EUV CAPACITY EXPANSION (110+ UNITS)',
 title: 'Low-NA EUV 扩产破百：2028 年冲刺 110+ 台年产能，组装周期压缩至 15–16 周',
 desc: '因 AI 数据中心对 3nm/2nm 逻辑与 HBM DRAM 的需求远超预期，晶圆厂普遍认为供给至少在 2028 年前无法追上需求。ASML 正在推进产能由 2025 年的 48–65 台迈向 2027 年 ~85 台，并探索 2028 年突破 110 台，同时把单机建造周期由 22 周缩短至 15–16 周，极大释放厂房周转效率。',
 formula: '盈利杠杆：出货台数翻倍 + NXE:3800E 220 wph 提价红利 → 贡献 2026–2029 年最确定性的营收增量',
 gauges: [['220 wph', 'NXE:3800E 较前代提速 37%'], ['~85 → 110+', '2027E → 2028E 年产能目标'], ['15–16 周', '单台建造周期显著压缩'], ['314 台', '2026.09 全球已装机运行数']]
 },
 {
 badge: 'ENGINE 03 · 12-INCH RETICLE CONSORTIUM & HYPER-NA',
 title: '定义下一个十年标准：牵头 12 英寸大掩膜联盟，解决超大 AI 芯片曝光极限',
 desc: 'AI 训练芯片越来越大，传统 6 英寸光掩膜版尺寸已成为单芯片集成度的物理天花板。2026 年 Q3 财报会上，台积电正式要求 ASML 牵头行业 12 英寸（12-inch）大掩膜联盟，重新定义下一代光刻机台、掩膜传输与光学视场标准，同时推进 2032+ Hyper-NA 预研。',
 formula: '战略定位：不仅是设备供应商，更是全半导体产业链物理标准的唯一制定者与联盟盟主',
 gauges: [['12 英寸', '新一代超大视场光掩膜标准'], ['TSMC 委托', '2026 Q3 明确由 ASML 牵头'], ['Hyper-NA', '2032+ 亚纳米时代前沿预研'], ['100% 锁定', '下游生态与材料商集体对齐']]
 },
 {
 badge: 'ENGINE 04 · INSTALLED BASE MANAGEMENT (IBM) ANNUITY',
 title: '装机服务收费站跃迁：Q3 2026 单季 €33亿，314+ 台 EUV 步入高毛利升级期',
 desc: '当新建晶圆厂排队等待新机器时，已建成工厂最快的扩产方式就是向 ASML 购买软件与激光升级包（如将现有 NXE 提速至 220 wph）以及全天候维保合同。FY2025 IBM 收入达 €81.93亿（+26.2%），2026 Q3 更单季跳升至 €33亿（年化超 €130亿），成为集团毛利率冲上 57.5% 的核心功臣。',
 formula: '变现公式：存量 EUV 台数 (324→650+) × 20–30年服役期 × 软件/吞吐升级高毛利 → 抗周期永续年金',
 gauges: [['€3.30B', 'Q3 2026 单季 IBM 历史新高'], ['+26.2%', 'FY2025 IBM 年度同比增速'], ['57.5%', 'Q3 2026 集团创纪录毛利率'], ['20–30年', '单台光刻机持续收费年限']]
 },
 {
 badge: 'ENGINE 05 · 3D INTEGRATION (XT:260) & HOLISTIC METROLOGY',
 title: '横向破圈：XT:260 切入 3D 先进封装，YieldStar 与多电子束量测同比暴增 28%',
 desc: 'AI 芯片性能瓶颈正由前道晶体管微缩延伸至 HBM4 堆叠与 Chiplet 3D 互连封装。ASML 已于 FY2025 交付并确认首台 3D 集成系统 XT:260 营收，同时 YieldStar 光学量测与 HMI 多电子束检测收入大增 +28% 至 €8.25亿，构建前道+后道全息工艺闭环。',
 formula: '增量逻辑：从“前道光刻平面微缩”横向切入“AI 3D 堆叠先进封装”，打开百亿美元级 TAM 新战场',
 gauges: [['XT:260', '首款 3D 集成光刻系统商用'], ['€825M', 'FY2025 量测与检测营收 (+28%)'], ['HBM4', '高带宽内存堆叠核心受益'], ['全息闭环', '设计-光刻-量测软件一体化']]
 },
 {
 badge: 'ENGINE 06 · MISTRAL AI STRATEGIC PARTNERSHIP',
 title: '欧洲工业之王牵手主权大模型：€17亿级入股 Mistral AI 赋能“AI 造光刻机”',
 desc: '2025 年 9 月 ASML 领投 Mistral AI €13亿（获 11.1% 股权），2026 年 9 月再投 €4亿跟投 €30亿 D 轮（投后估值超 €210亿，Q3 录得 €5亿重估浮盈）。双方不仅共建欧洲科技主权，更直接将前沿大模型嵌入光刻机光学参数自调优、预测性维护与内部软件研发提效。',
 formula: '双重回报：(1) 股权战略增值 + (2) 内部研发与光刻良率调优 AI 化，强化 5,000 家供应链协同效率',
 gauges: [['€1.3B+€0.4B', '2025–2026 连续两轮重仓入股'], ['11.1%+', '2025年末稀释后持股比例'], ['€500M', 'Q3 2026 首期投资重估浮盈'], ['AI 调优', '赋能计算光刻与预测性运维']]
 }
 ];
 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]'); if (!b) return;
 var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 var bs = rail.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var eg = ENGINES[idx];
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').textContent = eg.title;
 document.getElementById('engDesc').textContent = eg.desc;
 document.getElementById('engFormula').textContent = eg.formula;
 document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
 return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
 }).join('');
 });
 }

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
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
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var yrs = ['2025', '2026E', '2027E', '2028E', '2030E'];
 var lowNa = [44, 62, 85, 110, 120];
 var highNa = [4, 6, 12, 20, 32];
 var maxC = 160;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '台', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(44, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh1 = (lowNa[i] / maxC) * ph, bh2 = (highNa[i] / maxC) * ph;
 var y1 = pad.top + ph - bh1, y2 = y1 - bh2;
 ctx.fillStyle = pal.blue; roundRect(ctx, x, y1, bw, bh1, 4); ctx.fill();
 ctx.fillStyle = pal.violet; roundRect(ctx, x, y2, bw, bh2, 4); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((lowNa[i] + highNa[i]) + '台', x + bw / 2, y2 - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: y2, w: bw, h: bh1 + bh2, title: y + ' EUV 交付产能推演', body: 'Low-NA: ' + lowNa[i] + '台 + High-NA: ' + highNa[i] + '台（合计 ' + (lowNa[i] + highNa[i]) + ' 台）' });
 });
 } else {
 var steps = [
 { lbl: 'FY25基准', v: 32.7, b: 0, col: pal.blue, tip: 'FY2025 实际总营收: €32.67B' },
 { lbl: '+26E跃升', v: 11.8, b: 32.7, col: pal.green, tip: '2026 指引中值 €44.5B（EUV 放量与 IBM 跳升贡献 +€11.8B）' },
 { lbl: '+EUV扩产', v: 8.5, b: 44.5, col: pal.blue, tip: '2027–2030 Low-NA 扩产至 110+ 台贡献 +€8.5B' },
 { lbl: '+High-NA', v: 10.5, b: 53.0, col: pal.violet, tip: '三星 2028 + 台积电 2030 High-NA 放量贡献 +€10.5B' },
 { lbl: '+IBM/3D', v: 8.5, b: 63.5, col: pal.amber, tip: '装机服务年金与 XT:260 3D 封装贡献 +€8.5B' },
 { lbl: '2032E蓝图', v: 72.0, b: 0, col: pal.green, tip: '2032E 远期营收蓝图: ~€72B（毛利率稳定在 58%–60%+）' }
 ];
 var maxB = 80;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('€' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph, yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col; roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '€' + s.v.toFixed(1) + 'B', x + bW / 2, yt - 6);
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
 var pad = { top: 28, right: 22, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E'];

 if (state.sView === 'ibm') {
 var ibmRev = [8.19, 10.8, 12.2, 13.5, 14.8, 16.0];
 var maxS = 18;
 for (var m = 0; m <= 3; m++) {
 var mv = (m * 6).toFixed(0), my = pad.top + ph - ((m * 6) / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('€' + mv + 'B', pad.left - 8, my + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (ibmRev[i] / maxS) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('€' + ibmRev[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' IBM 装机管理营收', body: '存量设备升级与维保服务年金预计达 €' + ibmRev[i].toFixed(2) + 'B' });
 });
 } else {
 var gmPath = [52.8, 56.0, 56.8, 57.5, 58.2, 59.0];
 var minG = 50, maxG = 61;
 for (var g = 0; g <= 4; g++) {
 var gv = minG + ((maxG - minG) / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv.toFixed(1) + '%', pad.left - 8, gy + 4);
 }
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.8; ctx.beginPath();
 gmPath.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - ((v - minG) / (maxG - minG)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 gmPath.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - ((v - minG) / (maxG - minG)) * ph;
 ctx.fillStyle = pal.violet; ctx.beginPath(); ctx.arc(px, py, 4.4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 ctx.fillStyle = pal.tick; ctx.fillText(yrs[idx], px, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: yrs[idx] + ' 综合毛利率爬坡', body: '随着 High-NA 规模化与 IBM 占比提升，毛利率迈向 ' + v.toFixed(1) + '%（CMD 56%–60% 目标）' });
 });
 }
 }

 var OPT_DATA = {
 euv110: { rev: 8.5, net: 3.1 },
 highna: { rev: 10.5, net: 4.1 },
 ibm: { rev: 6.8, net: 3.0 },
 pkg: { rev: 3.2, net: 1.1 },
 hyper: { rev: 5.5, net: 2.2 }
 };
 var miniCaps = [490, 560, 741];
 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前市值(€B)', '2030基础盘', '2030含期权'];
 var maxV = Math.max(1000, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('€' + Math.round(v) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }

 function recalcOptionality() {
 var baseRev = 32.7, baseNet = 10.5, sh2030 = 0.364; // ~364M shares after €12B buyback
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) { var d = OPT_DATA[chk.getAttribute('data-opt')]; if (d) { addRev += d.rev; addNet += d.net; } }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var eps = totNet / sh2030;
 var mcapB = totNet * state.pe;
 var baseMcapB = baseNet * state.pe;
 document.getElementById('optRevOut').textContent = '€' + totRev.toFixed(1) + 'B';
 document.getElementById('optNetOut').textContent = '€' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '€' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = mcapB >= 1000 ? ('€' + (mcapB / 1000).toFixed(2) + 'T') : ('€' + Math.round(mcapB) + 'B');
 miniCaps = [490, baseMcapB, mcapB];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]'); if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 34;
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
 { id: 'sec-f0', t: 'F0 傅克礼新政与三阶战略时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'High-NA EXE:5200B · Low-NA 110+台 · 12英寸掩膜 · IBM · XT:260 · Mistral AI' },
 { id: 'sec-f2', t: 'F2 AI 算力扩产与 2032 营收阶梯桥', s: 'EUV 产能爬坡路线 · 迈向 €72B 远期营收蓝图' },
 { id: 'sec-f3', t: 'F3 全栈光刻主权与双引擎爬坡', s: 'Carl Zeiss SMT · 12英寸掩膜 · IBM 迈向 €16B · 毛利率 59%' },
 { id: 'sec-f4', t: 'F4 2030 冲击万亿欧元市值期权组装器', s: '自由开关五大新业务期权与估值倍数实时测算 EPS' }
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
 var target = document.querySelector(jb.getAttribute('data-jump'));
 if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 }
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () { if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); } });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) { var dh = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }
 }, { passive: true });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 var tBtn = document.getElementById('appbarThemeBtn');
 if (tBtn) tBtn.addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
 var stl = document.getElementById('sideThemeLightBtn'), std = document.getElementById('sideThemeDarkBtn');
 if (stl) stl.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 if (std) std.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 var sep = document.getElementById('sideExportBtn'), spr = document.getElementById('sidePrintBtn');
 if (sep) sep.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'ASML_Future_Horizon_2030_Blueprint.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast('已导出独立网页 ASML_Future_Horizon_2030_Blueprint.html');
 });
 if (spr) spr.addEventListener('click', function () { window.print(); });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 