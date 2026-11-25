
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_STRESS_KEY = 'asml_bm_stress_v1';
 var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'ltv', kView: 'backlog' };
 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
 blue: dark ? '#3399FF' : '#0073E6', blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.16)',
 green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED', red: dark ? '#FF6B6B' : '#DC2626'
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
 drawAllCharts();
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
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var LENSES = [
 {
 formula: '单台 EUV 20年全周期价值 = 初始卖机收入 (€2亿–€3.8亿) + 20年 × 产能/套刻升级软件与维保 (IBM 约占设备原值 80%–100%)',
 body: '与自建全产业链的重资产制造不同，ASML 将 <strong>85%+ 的零部件生产外包给超过 5,000 家精密供应商</strong>（如蔡司光学、TRUMPF 激光），自己专注系统集成架构、控制软件与计算光刻算法，从而以 35.5% 的超高 ROIC 撬动全球算力基建。'
 },
 {
 formula: '综合毛利率跃迁 (52.8% → 57.5%) = 新系统代际提价 (NXE:3800E/High-NA) + 高毛利 IBM 装机升级服务放量 (€8.19B → €3.3B/季)',
 body: '随着全球已装机 EUV 突破 314 台、DUV 数千台持续超期服役，越来越多的机器走出质保期进入付费维保与吞吐量升级周期；2026 Q3 IBM 收入飙升至 €33亿，成为推升公司毛利率突破 57.5% 的超级杠杆。'
 },
 {
 formula: '自由现金流 (€10.6B) > GAAP 净利润 (€9.6B) | 在手积压订单 €38.80B + €120亿新回购注销计划',
 body: '每台 EUV 均要求晶圆厂提前下达不可撤销订单并支付阶段性预付款，这意味着<strong>下游客户在用自己的现金流垫资支持 ASML 的供应链备货</strong>；充沛现金支撑连续 17% 股息增长与百亿欧元级股份注销。'
 }
 ];
 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) {
 lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]'); if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 var all = lensTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });
 }

 var NODES = [
 {
 badge: 'NODE 01 · SYSTEM ARCHITECT & CHOKEPOINT LOCK',
 title: '系统集成编排者：85% 零部件外包，却握有最稀缺光学与光源的排他控制权',
 desc: '一台 High-NA EUV 光刻机重逾 150 吨、由超 10 万个零件组成，仅光学系统就包含约 40,000 个零件（12 吨）。ASML 并不自己打磨镜片或生产普通机架，而是通过“轻资产总装 + 战略股权/收购锁定咽喉”模式：2013 年斥资 €19.5亿收购美国光源商 Cymer，2016 年斥资 €10亿入股德国 Carl Zeiss SMT 24.9% 股权，确保全球唯一能造原子级平滑 EUV 反射镜的产能排他绑定 ASML。',
 formula: '商业传导：轻资产系统编排（CapEx 占营收低）+ 关键核心自控 → 资本效率 ROIC 高达 35.5%，免受重资产晶圆厂式折旧拖累',
 kpis: [['24.9%', '持股德国 Carl Zeiss SMT 股权'], ['5,000+', '全球深度协同精密供应商网络'], ['40,000个', 'High-NA EUV 光学模组精密零件'], ['35.5%', 'FY2025 投入资本回报率 (ROIC)']]
 },
 {
 badge: 'NODE 02 · 100% EUV MONOPOLY & ASP LADDER',
 title: '物理垄断定价权：每一代波长与数值孔径（NA）微缩，直接重塑单机价格锚',
 desc: '当波长从 193nm DUV（ArFi 约 €6,000万–€8,000万）跨入 13.5nm EUV（NXE:3800E 约 €2.0亿–€2.2亿），再到 0.55 NA High-NA（EXE:5200B 超 €3.5亿–€3.8亿），ASML 在最先进制程没有任何竞争对手。客户即便面对两位数提价也绝不砍单，因为没有 EUV 就无法量产具竞争力的 AI 加速器与旗舰 SoC。',
 formula: '商业传导：制程微缩刚需 + 单台 220 wph 吞吐提效 → FY2025 EUV 销售额大涨 +39% 至 €116亿，占系统营收近半壁江山',
 kpis: [['100%', '全球 EUV 光刻机唯一供应商'], ['€11.6B', 'FY2025 EUV 系统净销售额 (+39%)'], ['220 wph', 'NXE:3800E 晶圆吞吐量 (+37%)'], ['48 台', 'FY2025 确认营收 EUV 台数 (含4台EXE)']]
 },
 {
 badge: 'NODE 03 · HOLISTIC LITHOGRAPHY & YIELD LOCK-IN',
 title: '全息光刻闭环：把硬件单机升级为“设计—曝光—量测”软件协同护城河',
 desc: '2007 年收购计算光刻鼻祖 Brion、2016 年收购电子束检测巨头汉微科 (HMI)，与自研 YieldStar 光学量测系统合流，形成“Holistic Lithography（全息光刻）”软硬一体化生态。晶圆厂的掩膜版光学邻近效应修正（OPC）与套刻数据全部沉淀在 ASML 算法平台中，换用任何新厂商都要承担数年良率验证风险。',
 formula: '商业传导：计算光刻软件 + 量测反馈环（FY25 应用系统收入 €8.25亿，+28%）→ 锁死客户工艺流程与零替换率',
 kpis: [['€825M', 'FY2025 量测与检测系统销售额 (+28%)'], ['Brion', '计算光刻与 OPC 行业标准软件'], ['HMI', '多电子束晶圆缺陷检测核心引擎'], ['数年验证', '晶圆厂切换光刻供应商隐性门槛']]
 },
 {
 badge: 'NODE 04 · 20-YEAR INSTALLED BASE TOLLBOOTH',
 title: '装机服务收费站：每卖出一台光刻机，就种下一棵 20–30 年的现金流摇钱树',
 desc: '光刻机在晶圆厂服役长达 20–30 年。随着全球已装机 EUV 突破 314 台及数千台 DUV，ASML 通过全天候驻厂维护、软件提速包（Field Upgrades）及翻新二手设备征收持续年金。2025 年 IBM 收入达 €81.93亿（+26.2%），2026 Q3 更单季跳升至 €33亿，成为平抑半导体周期波动的压舱石。',
 formula: '商业传导：存量设备滚雪球扩张 × 软件吞吐升级高毛利 → IBM 占总营收比重已稳居 25%–28% 区间',
 kpis: [['€8.19B', 'FY2025 装机管理(IBM)总营收 (+26.2%)'], ['€3.30B', '2026 Q3 单季 IBM 营收 (超预期 €4亿)'], ['314+10', '全球在运行 Low-NA + High-NA EUV'], ['20–30年', '单台光刻机全生命周期服务跨度']]
 },
 {
 badge: 'NODE 05 · CUSTOMER PREPAYMENTS & CAPITAL RETURN',
 title: '客户预付款 + €120亿回购注销：把产业链咽喉优势转化为纯正股东复利',
 desc: '面对 €388亿积压订单，晶圆厂不仅排长队锁产能，还需支付大额预付款（及历史上 Intel/TSMC/Samsung 联合出资 €52.3亿共研 EUV）。ASML 账上常年保持逾百亿欧元净现金（2025 年末现金及短期投资 €133.2亿，净现金 €102亿），持续以 €120亿新回购与 17% 股息增长回馈股东。',
 formula: '商业传导：€10.6B 自由现金流 + 客户预付款零垫资 → 连续注销股本 + 股息复合增长（FY25 €7.50/股）',
 kpis: [['€38.80B', '2025 年末在手未交付积压订单'], ['€10.6B', 'FY2025 自由现金流 (OCF €12.2B)'], ['€12.0B', '2026–2028 全新股票回购注销计划'], ['€7.50', 'FY2025 年度每股股息 (+17% YoY)']]
 }
 ];
 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) {
 pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]'); if (!btn) return;
 var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
 var bs = pTrack.querySelectorAll('.bm-node-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
 var nd = NODES[idx];
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = nd.title;
 document.getElementById('nodeDesc').textContent = nd.desc;
 document.getElementById('nodeFormula').textContent = nd.formula;
 document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
 return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 });
 }

 var tierFilter = document.getElementById('tierFilter');
 if (tierFilter) {
 tierFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]'); if (!b) return;
 var cat = b.getAttribute('data-tcat');
 var bs = tierFilter.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var cards = document.querySelectorAll('#tierList [data-tier]');
 for (var j = 0; j < cards.length; j++) cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
 });
 }

 var COHORTS = {
 duv: {
 stats: [['主力光刻机组合', 'ArFi 浸没式 (NXT) + 干式 DUV', '覆盖成熟制程、汽车与模拟芯片'], ['单台系统售价区间', '~€2,000万–€8,000万', '年销量约 279 台（FY25）'], ['晶圆厂客户替换率', '< 5% (ArFi 高端 >90% 份额)', '套刻精度与生态软件高度绑定'], ['20年单台总生命周期产出', '~€0.6亿–€1.3亿', '含翻新转售与长期备件维保']],
 note: '<strong>成熟与主流 DUV 现金底座：</strong>DUV 虽技术成熟但出货基数庞大（2025 年确认 279 台系统、销售额 €120亿），为 ASML 贡献稳定现金流并支撑庞大的在运行设备维保池。'
 },
 euv: {
 stats: [['主力光刻机组合', 'NXE:3800E (0.33 NA) + ArFi', '替代繁琐的多重曝光工艺'], ['单台系统售价区间', '~€2.0亿–€2.2亿', '220 wph 吞吐量溢价显著'], ['晶圆厂客户替换率', '0% (绝对唯一)', '全行业无第二家 EUV 供应商'], ['20年单台总生命周期产出', '~€3.8亿–€4.2亿', '含装机升级与维保服务年金']],
 note: '<strong>光刻强度单向棘轮效应（Litho Intensity）：</strong>随着逻辑芯片迈向 3nm/2nm 及 HBM4 高带宽内存向更精密 DRAM 演进，EUV 曝光层数不断增加，平均售价年复合提价约 13% 仍零砍单。'
 },
 highna: {
 stats: [['主力光刻机组合', 'EXE:5000 / EXE:5200B (0.55 NA)', '单次曝光实现 8nm 分辨率飞跃'], ['单台系统售价区间', '~€3.5亿–€3.8亿+', '单台造价堪比波音客机'], ['晶圆厂路线图锁定', 'Intel 2026 / 三星 2028 / 台积电 2030', '2026年9月已装机 10 台'], ['20年单台总生命周期产出', '~€6.5亿–€7.5亿+', '驱动 2030 毛利率向 56%–60% 迈进']],
 note: '<strong>AI 时代终极护城河（High-NA EUV）：</strong>0.55 NA 光学分辨率提升 1.7 倍、晶体管密度提升近 3 倍，彻底省去 0.33 NA 的二次多重曝光良率损耗，是突破 1.4nm 及以下节点物理墙的唯一钥匙。'
 }
 };
 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) {
 cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]'); if (!b) return;
 var key = b.getAttribute('data-cohort');
 var bs = cohortTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var c = COHORTS[key] || COHORTS.euv;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
 var isMono = idx > 0 ? ' mono' : '';
 var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = c.note;
 });
 }

 var peerFilter = document.getElementById('peerFilter');
 if (peerFilter) {
 peerFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pcat]'); if (!b) return;
 var cat = b.getAttribute('data-pcat');
 var bs = peerFilter.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var rows = document.querySelectorAll('#peerTable tbody tr');
 for (var j = 0; j < rows.length; j++) {
 var rc = rows[j].getAttribute('data-row-cat') || '';
 rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 }
 });
 }

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 500), h = Math.max(140, rect.height || 280);
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

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: '光刻系统', val: 24.47, base: 0, col: pal.blue, tip: 'FY2025 光刻与量测系统营收: €24.47B (EUV €11.6B + DUV €12.0B + 量测 €0.83B)' },
 { lbl: '+装机服务', val: 8.19, base: 24.47, col: pal.green, tip: 'FY2025 装机管理(IBM)服务营收: +€8.19B (+26.2% YoY)，推升总营收至 €32.67B' },
 { lbl: '=总毛利', val: 17.26, base: 0, col: pal.violet, tip: 'FY2025 综合毛利额: €17.26B (综合毛利率 52.8%，较 FY24 提升 150bps)' },
 { lbl: '营业利润', val: 11.30, base: 0, col: pal.blue, tip: '扣除 €4.7B 研发与 SG&A 后营业利润: €11.30B (营业利润率 34.6%)' },
 { lbl: 'GAAP净利', val: 9.61, base: 0, col: pal.amber, tip: 'FY2025 GAAP 净利润: €9.61B (+26.9% YoY)，净利率 29.4%' },
 { lbl: '自由现金流', val: 10.60, base: 0, col: pal.green, tip: 'FY2025 自由现金流: €10.6B (经营现金流 €12.2B，FCF/净利转化率 110%)' }
 ];
 var maxV = 36;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('€' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph, yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(4, yBot - yTop);
 ctx.fillStyle = s.col; roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('€' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26'];
 var gm = [50.5, 51.3, 51.3, 52.8, 57.5];
 var opm = [30.7, 32.8, 31.9, 34.6, 41.0];
 var npm = [26.6, 28.4, 26.8, 29.4, 38.5];
 var minM = 20, maxM = 62;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 function plotLine(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === yrs.length - 1 || idx === 0) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 }
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotLine(gm, pal.green, '综合毛利率 Gross Margin');
 plotLine(opm, pal.blue, '营业利润率 Operating Margin');
 plotLine(npm, pal.violet, '净利润率 Net Margin');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 22, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = ['交付 Y1', 'Y5', 'Y10', 'Y15', 'Y20 累计'];
 var duv = [55, 72, 92, 110, 125];
 var euv = [210, 255, 310, 360, 410];
 var highna = [365, 440, 540, 635, 720];
 var maxL = 800;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('€' + gv.toFixed(0) + 'M', pad.left - 8, gy + 4);
 }
 function drawCurve(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw, py = pad.top + ph - (v / maxL) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw, py = pad.top + ph - (v / maxL) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('€' + v + 'M', px - 6, py - 8);
 }
 hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '单台累计创造营收: €' + v + 'M' });
 });
 }
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + (idx / (xLbls.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 drawCurve(highna, pal.violet, 'High-NA EUV (EXE:5200)');
 drawCurve(euv, pal.blue, 'Low-NA EUV (NXE:3800E)');
 drawCurve(duv, pal.amber, 'ArFi 浸没式 DUV');
 } else {
 var segs = [
 { name: 'High-NA EUV (0.55)', asml: 100, peer: 0, col: pal.violet },
 { name: 'Low-NA EUV (0.33)', asml: 100, peer: 0, col: pal.blue },
 { name: 'ArFi 浸没式 DUV', asml: 92, peer: 8, col: pal.green },
 { name: '整体光刻系统市场', asml: 88, peer: 12, col: pal.amber }
 ];
 var slot = pw / segs.length;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 25, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 segs.forEach(function (v, idx) {
 var cx = pad.left + idx * slot + slot / 2, bw = 42;
 var ah = (v.asml / 100) * ph;
 ctx.fillStyle = v.col; roundRect(ctx, cx - bw / 2, pad.top + ph - ah, bw, ah, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.asml + '%', cx, pad.top + ph - ah - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(v.name, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw / 2 - 4, y: pad.top, w: bw + 8, h: ph, title: v.name, body: 'ASML 全球市场份额 ~' + v.asml + '% vs 竞争对手合计 ~' + v.peer + '%' });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'backlog') {
 var items = [
 { lbl: 'FY24 积压订单', v: 35.94, col: pal.blue, tip: '2024 年末在手未交付系统订单: €35.94B' },
 { lbl: 'FY25 积压订单', v: 38.80, col: pal.violet, tip: '2025 年末在手未交付系统订单: €38.80B（Q4 单季新增 €13.2B）' },
 { lbl: 'FY25 账面现金', v: 13.32, col: pal.green, tip: '2025 年末现金及短期投资: €13.32B（净现金 €10.2B）' },
 { lbl: '26-28 新回购', v: 12.00, col: pal.amber, tip: '2026 年 1 月启动全新 €12.0B 股票回购注销计划' }
 ];
 var maxS = 44;
 for (var g = 0; g <= 4; g++) {
 var sv = (maxS / 4) * g, sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('€' + sv.toFixed(0) + 'B', pad.left - 8, sy + 4);
 }
 var slot = pw / items.length, bw = Math.min(48, slot * 0.56);
 items.forEach(function (it, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (it.v / maxS) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = it.col; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('€' + it.v.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(it.lbl, x + bw / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: it.lbl, body: it.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'];
 var divs = [5.50, 5.80, 6.10, 6.40, 7.50];
 var maxD = 8.5;
 for (var k = 0; k <= 4; k++) {
 var dv = (maxD / 4) * k, dy = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, dy); ctx.lineTo(pad.left + pw, dy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('€' + dv.toFixed(1), pad.left - 8, dy + 4);
 }
 var sl = pw / yrs.length, bW = Math.min(42, sl * 0.52);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sl + (sl - bW) / 2, bh = (divs[i] / maxD) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 4 ? pal.green : pal.blue; roundRect(ctx, x, yt, bW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('€' + divs[i].toFixed(2), x + bW / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bW / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bW, h: bh, title: y + ' 每股年度总股息', body: '€' + divs[i].toFixed(2) + ' / 股（FY25 同比提升 +17%）' });
 });
 }
 }

 var simData = { eps: [24.73, 30.2, 35.1, 40.3, 45.4, 50.85] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 44 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY25', 'FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E'];
 var arr = simData.eps, maxE = Math.max(60, Math.ceil(Math.max.apply(null, arr) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('€' + v.toFixed(1), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gSys = parseFloat(document.getElementById('inpSysCagr').value) / 100;
 var gIbm = parseFloat(document.getElementById('inpIbmCagr').value) / 100;
 var gmT = parseFloat(document.getElementById('inpGmTarget').value) / 100;
 document.getElementById('lblSysCagr').textContent = (gSys * 100).toFixed(1) + '%';
 document.getElementById('lblIbmCagr').textContent = (gIbm * 100).toFixed(1) + '%';
 document.getElementById('lblGmTarget').textContent = (gmT * 100).toFixed(1) + '%';

 var sys = 24.474, ibm = 8.193, shares = 0.3885; // ~388.5M basic shares in FY25
 var epsArr = [24.73];
 for (var y = 1; y <= 5; y++) {
 sys *= (1 + gSys); ibm *= (1 + gIbm); shares *= (1 - 0.012);
 var rev = sys + ibm;
 var gm = 0.528 + (gmT - 0.528) * (y / 5);
 var opexRatio = 0.182 - 0.025 * (y / 5); // operating leverage
 var ebit = rev * (gm - opexRatio);
 var netInc = ebit * 0.83; // ~17% ETR
 epsArr.push(netInc / shares);
 }
 var rev30 = sys + ibm, eps30 = epsArr[5];
 var epsCagr = (Math.pow(eps30 / 24.73, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '€' + rev30.toFixed(1) + 'B';
 document.getElementById('simGmOut').textContent = (gmT * 100).toFixed(1) + '%';
 document.getElementById('simEpsOut').textContent = '€' + eps30.toFixed(2);
 document.getElementById('simCagrOut').textContent = '+' + epsCagr.toFixed(1) + '%';
 simData.eps = epsArr;
 drawSimMiniCanvas();
 }

 ['inpSysCagr', 'inpIbmCagr', 'inpGmTarget'].forEach(function (id) {
 var el = document.getElementById(id); if (el) el.addEventListener('input', runSimulator);
 });
 var PRESETS = { bear: { s: 5.5, i: 8.5, g: 54.0 }, base: { s: 10.5, i: 13.0, g: 58.0 }, bull: { s: 12.5, i: 14.5, g: 60.0 } };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]'); if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpSysCagr').value = pr.s;
 document.getElementById('inpIbmCagr').value = pr.i;
 document.getElementById('inpGmTarget').value = pr.g;
 runSimulator();
 });
 }

 function bindChartTab(groupId, attr, stateKey, drawFn) {
 var g = document.getElementById(groupId); if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[stateKey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 drawFn();
 });
 }
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 function bindHoverTooltip(canvasId) {
 var c = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var list = hitRegions[canvasId] || [], hit = null;
 for (var i = 0; i < list.length; i++) {
 var rg = list[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
 } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

 function drawAllCharts() { drawProfitCanvas(); drawCohortCanvas(); drawCapitalCanvas(); drawSimMiniCanvas(); }

 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '€32.67B FY25营收 · 2026指引 €44-45B · 系统编排轻资产' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '蔡司24.9%锁死 → EUV提价 → 全息光刻 → 20年IBM → 回购' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与IBM拆解', s: 'FY25 €8.19B 装机服务 · Q3\'26 €3.3B · 毛利率冲上 57.5%' },
 { id: 'mod-cohort', t: 'M3 光刻强度棘轮与单机LTV', s: 'DUV vs EUV vs High-NA 单台全生命周期价值与 100% 垄断' },
 { id: 'mod-capital', t: 'M4 积压订单与 5 年 EPS 推演器', s: '€38.80B 订单可见性 · €120B 新回购 · 2030E 情景测算' },
 { id: 'mod-matrix', t: 'M5 半导体巨头对标与风险压测', s: 'ASML vs TSMC / NVDA / AMAT / AAPL · 出口管制与蔡司风险' }
 ];
 var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQuick(q) {
 if (!qPop) return;
 var kw = (q || '').trim().toLowerCase();
 var matched = QUICK_ITEMS.filter(function (it) { return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1; });
 qPop.innerHTML = matched.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
 }).join('');
 qPop.classList.toggle('open', matched.length > 0);
 }
 if (qInput && qPop) {
 qInput.addEventListener('focus', function () { renderQuick(qInput.value); });
 qInput.addEventListener('input', function () { renderQuick(qInput.value); });
 qPop.addEventListener('click', function (e) {
 var jb = e.target.closest('[data-jump]'); if (!jb) return;
 var el = document.querySelector(jb.getAttribute('data-jump'));
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 }
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qInput) qInput.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () { if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); } });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) { var docH = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%'; }
 }, { passive: true });

 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk'); chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () {
 savedChk[k] = chk.checked;
 try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
 showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
 });
 });
 } catch (e) {}

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 var themeBtn = document.getElementById('appbarThemeBtn');
 if (themeBtn) themeBtn.addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
 var stl = document.getElementById('sideThemeLightBtn'), std = document.getElementById('sideThemeDarkBtn');
 if (stl) stl.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 if (std) std.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 var sep = document.getElementById('sideExportBtn'), spr = document.getElementById('sidePrintBtn');
 if (sep) sep.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'ASML_Business_Model_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast('已导出独立网页 ASML_Business_Model_Analysis.html');
 });
 if (spr) spr.addEventListener('click', function () { window.print(); });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var resizeTimer = null;
 window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawAllCharts, 90); });
 runSimulator();
 drawAllCharts();
 })();
 