
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'gwh', mult: 30 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

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
 violet: dark ? '#A78BFA' : '#7C3AED',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 red: dark ? '#FF6B6B' : '#DC2626'
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
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl) sl.classList.toggle('active', state.theme === 'light');
 if (sd) sd.classList.toggle('active', state.theme === 'dark');
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深空暗色模式' : '已切换至 MUI 清晰浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
 if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
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

 // Subfolder Hub Safe Switcher
 var hubEl = document.getElementById('companySubfolderHub');
 if (hubEl) {
 hubEl.addEventListener('click', function (e) {
 var catBtn = e.target.closest('[data-co-cat]');
 if (catBtn) {
 var cat = catBtn.getAttribute('data-co-cat');
 hubEl.querySelectorAll('[data-co-cat]').forEach(function (b) { b.classList.toggle('active', b === catBtn); });
 hubEl.querySelectorAll('[data-co-item-cat]').forEach(function (it) {
 it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat));
 });
 return;
 }
 var jumpBtn = e.target.closest('[data-suite-jump]');
 if (jumpBtn) {
 var code = jumpBtn.getAttribute('data-suite-jump');
 if (code === '02') {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 showToast('当前正在阅读 02/04：特斯拉 2026–2032 战略图谱');
 } else {
 showToast('请在对话附件卡片中点开第 ' + code + '/04 篇独立网页查看或下载');
 }
 }
 });
 }

 // F0: 3-Horizon Radar Switcher
 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 六大新产线爬坡与无监督破冰期 (2026–2027)',
 title: 'Cybercab 德州量产 × Semi 交付 × 休斯顿 Megapack 3 × AI5 流片上车',
 items: [
 '<strong>Robotaxi 扩城：</strong>奥斯汀无安全员里程破 200 万英里，向达拉斯、休斯顿、凤凰城、迈阿密与拉斯维加斯铺开。',
 '<strong>Semi 与 Megapack 3：</strong>内华达 5 万台/年重卡产线及休斯顿 50GWh 储能超级工厂放量，兑现高确定性 B2B 营收。',
 '<strong>Fremont 换血：</strong>停产 Model S/X 改建首条百万台级 Optimus Gen 3 产线，AI5（50倍性能跃升）于 2027 投产。'
 ],
 prob: '产线落地确定性：高 (80%–85%)',
 impact: '年化新增营收池：+$35B–$55B'
 },
 {
 badge: 'HORIZON 2 · 无人车队网络效应与芯片跃升期 (2028–2029)',
 title: 'AI5/AI6 全系普及 × 北美欧洲无监督 FSD 放开 × 得州千万级机器人厂',
 items: [
 '<strong>车主闲置车队并网：</strong>搭载 AI4/AI5 的数百万辆私家特斯拉一键加入共享 Robotaxi 网络，平台零车队重资产分成。',
 '<strong>Optimus 工业化外销：</strong>22 自由度灵巧手攻克精细装配，从特斯拉自家车间走向全球仓储、汽车与制造工厂。',
 '<strong>AI6 统一架构芯片：</strong>2028 年投产下一代 AI6 硅片，打通车载端、机器人端与超算中心端同构算力栈。'
 ],
 prob: '兑现确定性：中高 (65%–70%)',
 impact: '年化新增营收池：+$90B–$140B'
 },
 {
 badge: 'HORIZON 3 · “极度丰饶”终局奇点期 (2030–2032)',
 title: '百万辆级无人出行网 × 百万台级通用机器人 × TWh 级全球智能电网',
 items: [
 '<strong>出行成本低于公交：</strong>Cybercab 将点对点出行成本压缩至 $0.25–$0.30/英里，彻底重塑城市道路与停车场形态。',
 '<strong>具身智能超越汽车：</strong>Optimus 迈入商业服务与家庭护理场景，成为特斯拉超过 75% 长期企业价值的核心载体。',
 '<strong>冲击 CEO 终局里程碑：</strong>对标 2025 绩效方案最高档——年化 Adjusted EBITDA 挑战 $4,000亿 级别。'
 ],
 prob: '兑现确定性：高赔率远期期权 (40%–50%)',
 impact: '年化新增营收池：+$200B+'
 }
 ];
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 hzTabs.querySelectorAll('.ft-hz-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 var hz = HORIZONS[idx];
 document.getElementById('hzBadge').textContent = hz.badge;
 document.getElementById('hzTitle').textContent = hz.title;
 document.getElementById('hzList').innerHTML = hz.items.map(function (t) {
 return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
 }).join('');
 document.getElementById('hzProb').textContent = hz.prob;
 document.getElementById('hzImpact').textContent = hz.impact;
 });
 }

 // F1: 6-Engine Master-Detail Explorer
 var ENGINES = [
 {
 badge: 'ENGINE 01 · CYBERCAB & UNSUPERVISED ROBOTAXI NETWORK',
 title: 'Cybercab × 车主共享车队：用纯视觉 + 开箱工艺（Unboxed）击穿网约车成本底线',
 desc: '人类 90% 的日常出行仅搭载 1–2 名乘客。相比竞争对手采用昂贵改装车与多颗激光雷达（单车硬件成本超 $12万–$15万），特斯拉专为无人驾驶原生设计的双座无方向盘 Cybercab 采用 Unboxed 模块化拼装工艺，将目标制造成本锚定在 $30,000 以下。2026Q3 Cybercab 已正式编入奥斯汀 Robotaxi 商业车队（每日 6:00–24:00 运营，累计无监督里程近 200 万英里），并内置 xAI Grok 全语音办公娱乐助手，使车辆资产利用率从私家车的每周 10 小时跃升至 50+ 小时。',
 formula: '单车年化模型：年跑 55,000 英里 × $1.00/英里票价 - $0.30/英里全包折旧电费维保 ≈ 单车每年创造 ~$38,500 毛利池',
 gauges: [['>12.5万台', '得州 Cybercab 首期年产能规划'], ['~200万英里', '奥斯汀累计无安全员真实里程'], ['<$0.30/mi', '规模化单英里边际运营成本目标'], ['100万辆', 'CEO 绩效方案商业化车队里程碑']]
 },
 {
 badge: 'ENGINE 02 · OPTIMUS GEN 3 HUMANOID ROBOTICS',
 title: 'Optimus Gen 3：人类工业史最大潜在 TAM，复用特斯拉 80% 视觉与三电工程能力',
 desc: '全球制造业、物流仓储与老龄化护理面临数以亿计的结构性劳动力缺口。2025 年夏 AI 软件副总裁 Ashok Elluswamy 亲自接掌 Optimus 项目，实现 FSD 端到端世界模型与机器人动作控制的架构大一统。全新量产定型版 Gen 3 配备 22 自由度腱绳驱动灵巧手（50 个前臂精密执行器），特斯拉更在 2026 年做出历史性决断：关停弗里蒙特 Model S/X 产线改建年产 100 万台 Optimus 首线，并在得州破土动工千万台级专用机器人超级工厂。',
 formula: '规模经济：年产百万台级目标 BOM 成本压至 <$20,000，按 ~$25,000–$30,000 售价或 RaaS 租赁订阅，毛利率直逼 40%–50%',
 gauges: [['22 自由度', 'Gen 3 仿生灵巧手精密关节数'], ['100万台/年', '弗里蒙特原 S/X 车间改造产能'], ['1,000万台级', '得州二期专用机器人工厂远景'], ['<$20,000', '百万台规模下单机目标制造成本']]
 },
 {
 badge: 'ENGINE 03 · FSD V14/V15 GLOBAL SUBSCRIPTION SAAS',
 title: 'FSD 纯订阅化转型：把 1,000 万+ 存量与增量车队变成高纯利月度现金牛',
 desc: '2026 年特斯拉完成商业模式关键一跃——逐步取消 FSD 高门槛一次性买断，全面转向 $99/月经常性订阅（ARR）。得益于端到端神经网络 V14 在泊车、环岛与复杂城区博弈的代际跃升，北美成熟市场新车 FSD 附着率在 Q3\'26 突破 75%（环比飙升近 20 个百分点），全球活跃付费用户达 174 万，并已斩获荷兰、捷克、克罗地亚等欧洲 9 国及韩国落地许可。',
 formula: 'SaaS 利润杠杆：若实现 CEO 激励目标 1,000 万活跃订阅户 × $99/月 = 年化 $118.8亿 经常性收入（边际毛利率 >85%）',
 gauges: [['174 万户', 'Q3\'26 活跃付费 FSD 用户数'], ['>75%', '北美新车交付 FSD 订阅附着率'], ['欧洲 9 国', '2026 监管破冰累计获批版图'], ['1,000万户', 'CEO 绩效方案硬核解锁指标']]
 },
 {
 badge: 'ENGINE 04 · MEGAPACK 3, MEGABLOCK & AUTOBIDDER VPP',
 title: 'AI 时代的“卖水人”：Megapack 3 与 Autobidder 锁定全球算力中心配储红利',
 desc: '大模型数据中心动辄数百兆瓦的脉冲式电力负荷，正在令欧美老旧电网濒临极限，无需漫长输电审批即可快速并网的电化学储能成为唯一解药。特斯拉储能业务在 FY25 交付 46.7 GWh（+49%）、Q3\'26 创下 33.1% 惊人毛利率的基础上，于休斯顿/Brookshire 投建 50 GWh 新基地量产 ~5MWh Megapack 3 与 20MWh 集成式 Megablock，叠加加州与上海双 40 GWh 基地，全球总产能直指 130+ GWh/年。',
 formula: '双层变现：高周转模块化硬件销售（~30%+ GM）+ Autobidder 实时电价峰谷套利与虚拟电厂软件分成',
 gauges: [['130+ GWh', '美中三大 Megafactory 合计年产能'], ['33.1%', 'Q3\'26 储能业务历史峰值毛利率'], ['20 MWh', '全新 Megablock 预制变电站单元'], ['>$10亿', 'Powerwall VPP 已为户主节省电费']]
 },
 {
 badge: 'ENGINE 05 · AI5/AI6 CUSTOM SILICON & CORTEX SUPERCLUSTERS',
 title: '算力主权闭环：云端 >220MW Cortex 训练巨兽 + 端侧 50 倍跃升 AI5/AI6 芯片',
 desc: '物理世界 AI 既需要云端海量视频预训练，更需要车载/机载毫瓦级超低延迟推理。特斯拉在得州总部建成超 105MW 的 Cortex 1 与超 115MW 的 Cortex 2 训练集群；同时自研下一代端侧推理芯片 AI5（2027 量产）与 AI6（2028 量产），其中 AI5 凭借 10倍原始算力、9倍内存容量与 5倍硬件级低精度量化，实现相对 AI4 高达 50 倍的综合性能跃升，甚至远期评估自建 ~$30亿 研发晶圆与先进封装线。',
 formula: '架构优势：针对自身端到端视觉神经网络定制硬化算子（Softmax/量化），剔除通用芯片冗余面积与外部军火商溢价',
 gauges: [['50x 跃升', 'AI5 相对 AI4 目标综合推理性能'], ['>220 MW', '得州 Cortex 1 + Cortex 2 算力电力'], ['9x 显存', '突破车端超大参数世界模型瓶颈'], ['2027 / 2028', 'AI5 与 AI6 既定量产时间窗']]
 },
 {
 badge: 'ENGINE 06 · TESLA SEMI & 1.2MW MEGACHARGER CORRIDORS',
 title: '商用干线物流电动化奇点：内华达 5 万台/年 Tesla Semi 启动规模量产',
 desc: '重型 8 级卡车仅占美国车辆总数约 1%，却制造了近 20% 的交通碳排放与高昂柴油开支。2026Q3 特斯拉正式在内华达新工厂启动新版 Tesla Semi 规模量产：在 82,000 磅满载总重下实现 500 英里真实续航、能耗低至惊人的 1.7 kWh/英里，并配套铺设峰值功率达 1.2MW 的 Megacharger 超快充干线走廊，单车每年可为百事、DHL、US Foods 等车队节省数万美元燃料维保费。',
 formula: 'B2B 刚需账本：更低每英里电耗 vs 柴油价差（2年内回本）+ 远期重卡高速编队自动驾驶（Platooning）解放司机短缺',
 gauges: [['500 英里', '8.2万磅满载工况实测续航'], ['1.7 kWh/mi', '三电机碳纤维转子极致能效'], ['1.2 MW', 'Megacharger 兆瓦级补能峰值'], ['50,000台/年', '内华达 Sparks 专用工厂设计产能']]
   }
      ];
 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 rail.querySelectorAll('.ft-rail-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
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

 // High-DPI Retina Canvas Engine
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

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var peers = [
 { name: 'Amazon', cap: 102.0, col: pal.amber, tip: 'AWS 与物流重资产投入破千亿美元' },
 { name: 'Microsoft', cap: 86.0, col: pal.blue, tip: '全球云端 AI 数据中心高额折旧投入' },
 { name: 'Alphabet', cap: 75.0, col: pal.violet, tip: 'TPU 与云基础设施年度资本开支' },
 { name: 'TSLA (FY25)', cap: 8.5, col: pal.blue, tip: '特斯拉 FY2025 实际 CapEx $8.53B，自由现金流达 $6.22B' },
 { name: 'TSLA (26E)', cap: 22.0, col: pal.green, tip: '特斯拉 2026 指引 >$20B（9M\'26 已投 $13.01B）：同时覆盖 Cortex 1/2 超算与 Cybercab/Optimus/Semi/Megapack 3 六条量产线' }
 ];
 var maxC = 115;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.cap.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '11px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' 资本开支', body: p.tip });
 });
 } else {
 var steps = [
 { lbl: 'FY25基准', v: 94.8, b: 0, col: pal.blue, tip: 'FY2025 实际总营收: $94.83B' },
 { lbl: '+乘用/重卡', v: 48.0, b: 94.8, col: pal.blue, tip: 'Model Y/3 扩产、Semi 5万台重卡与超充服务贡献 +$48B' },
 { lbl: '+Megapack网', v: 46.0, b: 142.8, col: pal.green, tip: '全球储能迈向 180+ GWh 与 Autobidder 虚拟电厂贡献 +$46B' },
 { lbl: '+FSD/Robotaxi', v: 64.0, b: 188.8, col: pal.violet, tip: '千万级 FSD 订阅与百万辆级 Cybercab/共享无人车队贡献 +$64B' },
 { lbl: '+Optimus机器人', v: 42.0, b: 252.8, col: pal.amber, tip: '弗里蒙特与得州基地工业/商业人形机器人放量贡献 +$42B' },
 { lbl: 'FY32E蓝图', v: 294.8, b: 0, col: pal.green, tip: 'FY2032E 物理 AI 平台营收蓝图: ~$295B（AI软件与能源利润占比超 65%）' }
 ];
 var maxB = 330;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
 var yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.sView === 'gwh') {
 var yrs = ['2021', '2022', '2023', '2024', '2025', '2026E', '2028E'];
 var gwh = [4.0, 6.5, 14.7, 31.4, 46.7, 64.0, 125.0];
 var maxG = 140;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxG / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + 'GWh', pad.left - 6, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(38, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(5, (gwh[i] / maxG) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 5 ? pal.violet : (i === 4 ? pal.green : pal.blue);
 roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(gwh[i].toFixed(1), x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 储能装机量', body: gwh[i].toFixed(1) + ' GWh（2021–2025 为 10-K 审计实际值，2026E+ 含上海与休斯顿 50GWh 基地爬坡）' });
 });
 } else {
 var modes = [
 { name: '传统人工网约车', cost: 2.25, col: pal.red, tip: '含人类司机薪酬抽成、燃油维保与平台调度费，约 $2.10–$2.50/英里' },
 { name: '激光雷达改装Robotaxi', cost: 1.38, col: pal.amber, tip: '多颗激光雷达+高精地图改装车（单车硬件>$130K），高折旧推高每英里成本' },
 { name: '北美私家车全包成本', cost: 0.78, col: pal.blue, tip: '美国汽车协会(AAA)私家车折旧、保险、油电与停车平均成本 ~$0.75–$0.80/英里' },
 { name: 'Tesla Cybercab 目标', cost: 0.28, col: pal.green, tip: '双座轻量化 Unboxed 制造 (<$30K BOM) + 纯视觉 AI5 低功耗，规模化目标 <$0.30/英里' }
 ];
 var maxM = 2.6;
 for (var m = 0; m <= 4; m++) {
 var mv = ((maxM / 4) * m).toFixed(2), my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv, pad.left - 8, my + 4);
 }
 var sl = pw / modes.length, bW = Math.min(46, sl * 0.54);
 modes.forEach(function (md, i) {
 var x = pad.left + i * sl + (sl - bW) / 2;
 var bh = (md.cost / maxM) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = md.col;
 roundRect(ctx, x, yt, bW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + md.cost.toFixed(2) + '/mi', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(md.name, x + bW / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bW, h: bh, title: md.name, body: md.tip });
 });
 }
 }

 // F4: Interactive 2030 Optionality Builder
 var OPT_DATA = {
 fsd: { rev: 9.2, ebitda: 7.6 },
 robo: { rev: 32.0, ebitda: 18.5 },
 energy: { rev: 38.0, ebitda: 11.8 },
 semi: { rev: 21.0, ebitda: 4.8 },
 bot: { rev: 25.0, ebitda: 11.2 }
 };
 var miniCaps = [1.54, 0.81, 2.09];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['当前市值', '2030纯整车盘', '2030含勾选期权'];
 var maxV = Math.max(3.2, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (v / maxV) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2) + 'T', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }

 function recalcOptionality() {
 var baseRev = 142.0, baseEbitda = 25.0, netCashB = 55.0, sh2030 = 3.65;
 var addRev = 0, addEbitda = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addEbitda += d.ebitda; }
 }
 });
 var totRev = baseRev + addRev;
 var totEbitda = baseEbitda + addEbitda;
 var estNetInc = Math.max(8, (totEbitda - 12.5) * 0.77);
 var eps = estNetInc / sh2030;
 var mcapT = (totEbitda * state.mult + netCashB) / 1000;
 var baseMcapT = (baseEbitda * state.mult + netCashB) / 1000;

 document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
 document.getElementById('optEbitdaOut').textContent = '$' + totEbitda.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

 miniCaps = [1.54, baseMcapT, mcapT];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 chk.addEventListener('change', recalcOptionality);
 });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-mult]');
 if (!b) return;
 state.mult = parseInt(b.getAttribute('data-mult'), 10) || 30;
 peTabs.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 recalcOptionality();
 });
 }

 function bindSeg(gid, attr, skey, fn) {
 var g = document.getElementById(gid);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 g.querySelectorAll('.mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
 fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid) {
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
 ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

 function drawAll() {
 drawFutureCanvas();
 drawSiliconCanvas();
 drawOptMiniCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS = [
 { id: 'sec-f0', t: 'F0 极度丰饶新政与三阶时间窗雷达', s: '2026–2032 六线投产 / 规模跃升 / 丰饶奇点三阶段路标' },
 { id: 'sec-f1', t: 'F1 六大物理 AI 引擎纵向深潜舱', s: 'Cybercab · Optimus Gen 3 · FSD SaaS · Megapack 3 · AI5 · Semi' },
 { id: 'sec-f2', t: 'F2 >$20B 重资本跃迁与 2032 营收桥', s: '对比云巨头千亿投入 · 迈向 ~$295B 物理AI平台阶梯' },
 { id: 'sec-f3', t: 'F3 全栈硬核主权：AI5芯片与锂电闭环', s: '50倍性能跃升 AI5 + 4680干法电极 + 30GWh 北美锂精炼' },
 { id: 'sec-f4', t: 'F4 2030 多万亿市值期权组装器', s: '对标 CEO 绩效方案五大期权自由勾选实时估值' }
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
 document.addEventListener('click', function (e) {
 if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open');
 });
 }
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); }
 if (e.key === 'Escape') {
 if (qPop) qPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 // Sidebar Toggle & Mobile Drawer
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
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
 sb.querySelectorAll('.mui-nav-link').forEach(function (l) {
 l.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 });
 }

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 // Theme, Lang, Export & Print
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

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 