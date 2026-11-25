
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_DENSITY_KEY = 'mui_clarity_density_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'adrev', pe: 34 };
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
 text: dark ? '#F3F6F9' : '#0F172A',
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
 var sL = document.getElementById('sideLightBtn'), sD = document.getElementById('sideDarkBtn');
 if (sL) sL.classList.toggle('active', state.theme === 'light');
 if (sD) sD.classList.toggle('active', state.theme === 'dark');
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深空暗色模式' : '已切换至清晰浅色模式');
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

 function applyDensity(d) {
 var mode = d === 'compact' ? 'compact' : 'comfort';
 document.body.setAttribute('data-density', mode);
 var bs = document.querySelectorAll('[data-density-btn]');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i].getAttribute('data-density-btn') === mode);
 try { localStorage.setItem(STORAGE_DENSITY_KEY, mode); } catch (e) {}
 drawAll();
 }

 // Suite Hub Filter (Zero Auto-Scroll)
 var hub = document.getElementById('companySubfolderHub');
 if (hub) {
 hub.addEventListener('click', function (e) {
 var pill = e.target.closest('[data-co-cat]');
 if (pill) {
 var cat = pill.getAttribute('data-co-cat');
 var ps = hub.querySelectorAll('[data-co-cat]');
 for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === pill);
 var items = hub.querySelectorAll('[data-co-item-cat]');
 for (var j = 0; j < items.length; j++) {
 items[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || items[j].getAttribute('data-co-item-cat') === cat));
 }
 return;
 }
 var item = e.target.closest('.co-hub-item');
 if (item) {
 var jump = item.getAttribute('data-suite-jump');
 var msg = item.getAttribute('data-suite-toast');
 if (jump) {
 var el = document.querySelector(jump);
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 } else if (msg) {
 showToast(msg);
 }
 }
 });
 }

 // F0: 3-Horizon Radar Switcher
 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 高确定性业绩兑现期 (2026–2027)',
 title: '广告套餐扩容 15 国 × NFL 5场圣诞感恩节包 × FIFA 2027 女足世界杯',
 items: [
 '<strong>广告版图大扩军：</strong>2027 年 3 月起含广告套餐进军欧洲 9 国、哥伦比亚、秘鲁与新西兰等 15 个新市场。',
 '<strong>事件化体育峰值：</strong>NFL 感恩节前夜首秀与圣诞双赛、Fury vs. Joshua 拳赛及 2027 女足世界杯独家直播。',
 '<strong>新 CCO 组织提效：</strong>Peter Rice 接管全球剧集/电影/直播内容矩阵，精简千岗聚焦高影响力爆款。'
 ],
 prob: '兑现确定性：极高 (90%+)',
 impact: '年化增量营收池：+$11B–$15B'
 },
 {
 badge: 'HORIZON 2 · 结构性利润率跃升期 (2028–2029)',
 title: '程序化 DAI 直播广告全面成熟 × 广电聚合多国复制 × InterPositive 全栈提效',
 items: [
 '<strong>广告迈过 $6B–$8B 门槛：</strong>自研 Netflix Ads Suite 实现精准频控、零售媒体闭环归因与互动购物广告。',
 '<strong>TF1 聚合模式跨国复制：</strong>在更多欧洲、拉美与亚太市场整合本土头部免费电视台，垄断客厅开机第一屏。',
 '<strong>InterPositive AI 普及：</strong>全自制剧组标配 AI 实拍后期精修与多语种口型同步，推动营业利润率突破 35%+。'
 ],
 prob: '兑现确定性：中高 (75%–80%)',
 impact: '年化增量营收池：+$22B–$30B'
 },
 {
 badge: 'HORIZON 3 · 全域娱乐操作系统奇点期 (2030–2032)',
 title: '达成 $90亿+ 广告目标 × FIFA 2031 卫冕 × 云端互动叙事与全球实景乐园网',
 items: [
 '<strong>4亿+ 家庭与 $9B+ 广告收官：</strong>全球触达逾 12 亿观众，稳居联网电视（CTV）最高溢价品牌广告基础设施。',
 '<strong>客厅云游戏与实时互动剧：</strong>基于超低延迟云串流与生成式 NPC，让爆款影视 IP 同步衍生多人派对云游戏。',
 '<strong>Netflix House 全球地标化：</strong>从费城、达拉斯扩展至全球核心都会区，跑通“线上爆款→线下门票周边”永动机。'
 ],
 prob: '兑现确定性：远期期权 (55%–65%)',
 impact: '年化增量营收池：+$38B–$48B'
 }
 ];
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 var bs = hzTabs.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
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

 // F1: 6-Engine Vertical Master-Detail Explorer
 var ENGINES = [
 {
 badge: 'ENGINE 01 · PROPRIETARY NETFLIX ADS SUITE (NAS)',
 title: '自研广告技术底座 × 2.5 亿月活大屏观众：重构联网电视（CTV）最高溢价广告位',
 desc: '传统有线电视每年流失百亿美元品牌广告预算，而品牌主苦于短视频平台内容环境不可控。奈飞全面建成自研广告技术栈 Netflix Ads Suite（NAS），不仅打通全球主流程序化 DSP 归因测量、接入拉美电商巨头 MercadoLibre 第一方购买意图数据与欧洲 AdForm，更在 WWE Raw 与 SmackDown 率先跑通直播动态广告插入（DAI）及暂停页原生互动广告，2027 年新增 15 国覆盖后将迈向 $90 亿高毛利广告年收。',
 formula: '变现双轮：(1) 低月费广告层持续扩大总订户漏斗 + (2) 零外部技术分成损耗的 75%+ 边际营业利润率广告增量',
 gauges: [['250M+ MAV', '全球含广告套餐月活观众'], ['~$2.7B → $9B', 'FY26E 至 2030E 广告营收跃升'], ['+15 新市场', '2027 年 3 月起分批上线扩容'], ['100% 自研栈', '告别早期外部微软技术分成']]
 },
 {
 badge: 'ENGINE 02 · EVENTIZED LIVE SPORTS & GLOBAL SPECTACLES',
 title: '只买皇冠上的明珠：WWE 52周常青直播 + NFL 假日大战 + FIFA 女足世界杯',
 desc: '奈飞彻底破解了流媒体做体育的盈利魔咒——绝不为低收视率周二常规赛买单，而是用十年 $50 亿长约锁定全年 52 周无休的娱乐体育常青树 WWE Raw，再精准叠加 NFL 感恩节前夜首秀（U2 中场秀）与圣诞双赛、Fury vs. Joshua 重量级拳王争霸，以及 2027 与 2031 两届 FIFA 女足世界杯美国独家版权，打造广告主非投不可的“全球全民围观时刻”。',
 formula: '变现逻辑：全年周播留存底盘（WWE）+ 节日脉冲拉新与天价冠名广告（NFL/拳击/世界杯）',
 gauges: [['5 场 NFL 大战', '含感恩节前夜首秀与圣诞双赛'], ['52周不间断', 'WWE Raw 全球周播娱乐底盘'], ['2027 & 2031', '两届 FIFA 女足世界杯独家权'], ['DAI 实时插播', '按观众画像千人千面投流直播广告']]
 },
 {
 badge: 'ENGINE 03 · NON-ENGLISH LOCAL ORIGINALS & INDIA BREAKOUT',
 title: '非英语原创占比突破 1/3：在印度、日韩、拉美与北欧锻造“本土制作、全球收割”机器',
 desc: '十年前奈飞非英语内容观看量不足 10%，如今已突破总时长的 1/3。2026Q3 丹麦剧《The Secret Woman》（4,700万观看）、墨西哥《Facing El Chapo》（5,800万观看）与日本剧集同步霸榜全球；而在人口第一大国印度，日播真人秀《Lock Upp》创下印度奈飞史上最高单作观看纪录，配合 Flipkart 会员捆绑推动印度单季观看时长暴涨 +24%、净增订户创历史峰值。',
 formula: '套利公式：新兴市场高性价比制片成本 × 190+ 国算法跨文化分发 = 远超好莱坞单语种剧集的 ROI',
 gauges: [['>33.3%', '非英语内容占全球总观看比重'], ['+24% YoY', '2026Q3 印度市场观看时长增速'], ['+18% FXN', '2026Q3 印度市场汇率中性营收增速'], ['50+ 国家', '全球常态化本土制片基地覆盖']]
 },
 {
 badge: 'ENGINE 04 · SUPER-AGGREGATOR (TF1), LICENSING & VIDEO PODCASTS',
 title: '从“单一内容应用”进化为“国家客厅总入口”：TF1 广电融合、迪士尼授权与视频播客',
 desc: '2026 年夏天奈飞在法国迈出历史性一步：将法国头号商业电视台 TF1 的本地剧集、新闻与实时体育直播直接内嵌进奈飞客户端，首季即带来显著增量观看时长。叠加与迪士尼达成的新一轮片库授权（《冰川时代》全系霸榜全球 Top 10）、Take-Two《GTA VI》独家先导揭秘以及视频播客（Video Podcasts）布局，奈飞正在成为所有内容方离不开的宣发放大器。',
 formula: '平台效应：近 10 亿观众分发霸权 → 吸引对手主动送上门授权/联运 → 用户更无需退出奈飞界面',
 gauges: [['TF1 实时内嵌', '开创国家级电视台应用内聚合先河'], ['Disney 授权', '《冰川时代》等经典合家欢片库回归'], ['近 10 亿人', '全球影视与游戏巨作宣发头号阵地'], ['Video Podcasts', '低成本高频谈话节目填补日间碎片时长']]
 },
 {
 badge: 'ENGINE 05 · INTERPOSITIVE AI & STUDIO PRODUCTION EFFICIENCY',
 title: '斥资 $5.87亿 收购本·阿弗莱克 InterPositive：用“尊重导演的 AI”重构影视后期工业',
 desc: '2026 年 3 月奈飞以约 $5.87 亿现金全资收购本·阿弗莱克秘密孵化四年的影视 AI 创业公司 InterPositive，并入新任首席产品与技术官（CPTO）Elizabeth Stone 麾下。不同于从零捏造虚假画面的通用大模型，InterPositive 专门学习剧组自己的实拍底片，用于后期补拍修复、光影一致性精修与多语种视觉本地化，在不触碰演员工会红线的前提下显著降低重拍超支率。',
 formula: '利润传导：在不增加现金内容总预算（守住 ~1.1x）的前提下，提升单美元制作预算的成片质感与全球本土化速度',
 gauges: [['$587M 现金', '2026.03 精准收购 AI 后期技术团队'], ['实拍底片驱动', '创作者友好型 AI，规避版权与工会摩擦'], ['CPTO 统合', 'Elizabeth Stone 打通产品与制片科技'], ['+200bps+', '中长期制片与本地化效率利润率贡献']]
 },
 {
 badge: 'ENGINE 06 · NETFLIX HOUSE EXPERIENTIAL VENUES & CLOUD TV GAMES',
 title: '跨出屏幕边界：费城与达拉斯 Netflix House 实景乐园 + 零硬件门槛客厅云游戏',
 desc: '当现象级动画电影《KPop Demon Hunters》（累计狂揽 4.82 亿次观看）与《鱿鱼游戏》《布里奇顿》席卷全球，奈飞不再满足于一次性播放热度：位于费城与达拉斯的首批常设实景综合体 Netflix House 已正式运营，集沉浸式闯关、主题餐饮与限定周边零售于一体；线上则由游戏总裁 Alain Tascan 主导“手机当手柄、电视即点即玩”的合家欢派对云游戏，把单部爆款升级为跨媒介摇钱树。',
 formula: '飞轮闭环：剧集引爆全球 IP 狂热 → 零宣发费导流线下 Netflix House 门票零售与云游戏留存',
 gauges: [['费城 + 达拉斯', '首批常设 Netflix House 综合体开业'], ['4.82亿观看', '《KPop Demon Hunters》线下实景化变现'], ['零主机门槛', '手机秒变手柄直连智能电视云游戏'], ['全年常设运营', '区别于快闪店的长期线下现金流触点']]
 }
 ];
 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
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
 { name: 'Netflix FY26E FCF', v: 12.0, col: pal.green, tip: '奈飞 FY2026E 预计创造 ~$12.0B 自由现金流，净债务仅 $7.11B（约 0.44x 营业利润）' },
 { name: 'Netflix Q3末净债务', v: 7.11, col: pal.blue, tip: '截至 2026.09.30 奈飞总债务 $15.13B 减去现金 $8.22B，净债务仅 $7.11B' },
 { name: 'Disney FY26E OCF-CapEx', v: 10.0, col: pal.violet, tip: '迪士尼 FY2026 指引经营现金流 $19B 减去 $9B 乐园游轮重资产 CapEx ≈ $10B' },
 { name: 'WBD 竞购企业价值', v: 82.7, col: pal.red, tip: '奈飞果断放弃跟进 $1,110 亿派拉蒙竞标（原协议企业价值 $82.7B），避免重资产债务泥潭并净收 $2.8B 违约金' }
 ];
 var maxC = 92;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(48, slot * 0.56);
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(8, (p.v / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.v.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 0 ? pal.green : pal.sub; ctx.font = (i === 0 ? 'bold ' : '600 ') + '10.5px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name, body: p.tip });
 });
 } else {
 var steps = [
 { lbl: 'FY26E指引', v: 51.1, b: 0, col: pal.blue, tip: 'FY2026E 官方全年营收指引: $51.1B (+13% YoY)' },
 { lbl: '+成熟区ARM', v: 13.5, b: 51.1, col: pal.green, tip: '北美与西欧周期性温和提价与家庭席位深化贡献 +$13.5B' },
 { lbl: '+新兴区扩户', v: 12.8, b: 64.6, col: pal.violet, tip: '印度、亚太与拉美订户翻倍及广电聚合贡献 +$12.8B' },
 { lbl: '+自研广告栈', v: 8.8, b: 77.4, col: pal.amber, tip: 'Netflix Ads Suite 迈过 2030 $9B 后向 2032E 持续扩张净增 +$8.8B' },
 { lbl: '+直播/游戏/乐园', v: 6.4, b: 86.2, col: pal.green, tip: '体育事件赞助、客厅云游戏与 Netflix House 实景零售贡献 +$6.4B' },
 { lbl: 'FY32E蓝图', v: 92.6, b: 0, col: pal.blue, tip: 'FY2032E 远期营收蓝图: ~$92.6B（营业利润率有望站稳 37%–40%）' }
 ];
 var maxB = 104;
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
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(1) + 'B', x + bW / 2, yt - 6);
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
 var yrs = ['2023', '2024', '2025', '2026E', '2028E', '2030E'];

 if (state.sView === 'adrev') {
 var adRev = [0.6, 1.4, 2.1, 2.7, 5.6, 9.0];
 var maxA = 10.5;
 for (var m = 0; m <= 3; m++) {
 var mv = (m * 3.5).toFixed(1), my = pad.top + ph - ((m * 3.5) / maxA) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (adRev[i] / maxA) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + adRev[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 奈飞广告业务年营收', body: '$' + adRev[i].toFixed(1) + 'B（FY26E 官方指引 ~$2.7B，2030 内部战略目标 ~$9.0B）' });
 });
 } else {
 var mavs = [23, 70, 170, 250, 340, 420];
 var maxM = 460;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxM / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + 'M', pad.left - 8, gy + 4);
 }
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.8; ctx.beginPath();
 mavs.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxM) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 mavs.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxM) * ph;
 ctx.fillStyle = idx === 3 ? pal.green : pal.violet;
 ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v + 'M', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[idx], px, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: yrs[idx] + ' 含广告层全球月活观众', body: v + 'M 月活观众（2026年5月 Upfront 官方宣布突破 250M+ MAV）' });
 });
 }
 }

 // F4: Interactive 2030 Optionality Builder + Mini Canvas
 var OPT_DATA = {
 ads: { rev: 6.3, net: 3.9 },
 live: { rev: 5.5, net: 1.7 },
 intl: { rev: 8.2, net: 2.4 },
 ai: { rev: 0.0, net: 1.8 },
 house: { rev: 4.8, net: 1.3 }
 };
 var miniCaps = [0.40, 0.58, 0.92];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['2026基准', '2030纯内生盘', '2030含期权'];
 var maxV = Math.max(1.2, Math.ceil(Math.max.apply(null, miniCaps) * 1.2 * 10) / 10);
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2) + 'T', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }

 function recalcOptionality() {
 // Organic SVOD baseline FY2030E (~7.5% organic sub growth from $51.1B -> $66.5B rev, $17.1B net income, 2.8%/yr buybacks -> ~3.74B diluted shares)
 var baseRev = 66.5, baseNet = 17.1, sh2030 = 3.74;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addNet += d.net; }
 }
 });
 var totRev = baseRev + addRev;
 var totNet = baseNet + addNet;
 var eps = totNet / sh2030;
 var mcapT = (totNet * state.pe) / 1000;
 var baseMcapT = (baseNet * state.pe) / 1000;

 document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(1) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

 miniCaps = [0.40, baseMcapT, mcapT];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 chk.addEventListener('change', recalcOptionality);
 });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 34;
 var bs = peTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
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
 tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
 tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
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
 { id: 'sec-f0', t: 'F0 弃追 WBD 资本纪律与三阶战略雷达', s: '净收 $2.8B 违约金 · 2026–2032 近程/中程/远期兑现时间窗' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Netflix Ads Suite · 体育直播 · 非英语原创 · TF1聚合 · InterPositive AI · Netflix House' },
 { id: 'sec-f2', t: 'F2 反并购资本纪律与 2032E 营收阶梯桥', s: '$12.0B FCF vs 旧传媒债务包袱 · 迈向 $92.6B 营收阶梯' },
 { id: 'sec-f3', t: 'F3 四大自研技术主权与广告放量曲线', s: '250M+ 月活观众 · 自研广告栈冲刺 2030E $9.0B 目标' },
 { id: 'sec-f4', t: 'F4 2030 冲击 $1万亿市值期权组装器', s: '自由开关五大新业务期权与估值倍数实时测算 EPS' }
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

 // Sidebar Toggle, Export & Print
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
 setTimeout(drawAll, 60);
 } else {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 
 
 

 var dg = document.getElementById('densityGroup');
 if (dg) {
 dg.addEventListener('click', function (e) {
 var b = e.target.closest('[data-density-btn]');
 if (b) applyDensity(b.getAttribute('data-density-btn'));
 });
 }

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 try {
 if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 var initD = localStorage.getItem(STORAGE_DENSITY_KEY);
 if (initD) applyDensity(initD);
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

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
 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
 if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 