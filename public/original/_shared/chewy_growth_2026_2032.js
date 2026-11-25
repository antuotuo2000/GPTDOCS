
 (function () {
 'use strict';

 var EXPORT_FILENAME = 'Chewy未来十年（2026–2032）战略图谱.html';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', fView: 'bridge', sView: 'clinics', pe: 14 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg;
 bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2400);
 }

 function triggerHtmlDownload() {
 try {
 var htmlText = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = EXPORT_FILENAME;
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
 showToast(state.lang === 'en' ? 'Downloading ' + EXPORT_FILENAME : '正在下载网页：' + EXPORT_FILENAME);
 } catch (e) {
 showToast('导出失败，请使用浏览器保存网页功能');
 }
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
 var lBtn = document.getElementById('sideThemeLightBtn');
 var dBtn = document.getElementById('sideThemeDarkBtn');
 if (lBtn) lBtn.classList.toggle('active', state.theme === 'light');
 if (dBtn) dBtn.classList.toggle('active', state.theme === 'dark');
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色护眼模式' : '已切换至 MUI 浅色模式');
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

 // Suite Hub Filter & Toast
 var hub = document.getElementById('companySubfolderHub');
 if (hub) {
 hub.addEventListener('click', function (e) {
 var catBtn = e.target.closest('[data-co-cat]');
 if (catBtn) {
 var cat = catBtn.getAttribute('data-co-cat');
 var pills = hub.querySelectorAll('[data-co-cat]');
 for (var i = 0; i < pills.length; i++) pills[i].classList.toggle('active', pills[i] === catBtn);
 var items = hub.querySelectorAll('[data-co-item-cat]');
 for (var j = 0; j < items.length; j++) {
 var ic = items[j].getAttribute('data-co-item-cat');
 items[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || ic === cat));
 }
 return;
 }
 var itemBtn = e.target.closest('[data-suite-file]');
 if (itemBtn) {
 var f = itemBtn.getAttribute('data-suite-file');
 if (f === EXPORT_FILENAME) window.scrollTo({ top: 0, behavior: 'smooth' });
 else showToast('套件关联页：《' + f + '》— 请在聊天交付列表中打开或下载');
 }
 });
 }

 // F0: 3-Horizon Radar Switcher
 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 高确定性整合兑现期 (2026–2027)',
 title: '诊所冲刺 ~60 家 × AI 年省 $50M × $59/年 Chewy+ 放量',
 items: [
 '<strong>Modern Animal 无缝并表：</strong>2026 年底全国兽医诊所迈向 ~60 家，2027 年实现诊所并购 EBITDA 净贡献转正。',
 '<strong>智能体降本兑现：</strong>客服 AI Cai 与诊所语音 AI Callie 全面铺开，FY27 实现年化约 $5,000万 运营成本节约。',
 '<strong>Chewy+ 降门槛吸客：</strong>年费由测试价 $79 降至 $59，吸引中腰部宠主集中跨品类钱包份额。'
 ],
 prob: '兑现确定性：极高 (85%–90%)',
 impact: '目标 EBITDA 率：6.8% → 7.8%'
 },
 {
 badge: 'HORIZON 2 · 结构性毛利加速期 (2028–2029)',
 title: 'Chewy Max 迈向 3% 净营收 × 百店级诊所网络 × B类股治理折价消除',
 items: [
 '<strong>零售媒体全面收割：</strong>Chewy Ads 站内外联投（Meta/TikTok/CTV）渗透率逼近 3%，单年贡献逾 $4亿 高毛利广告利润。',
 '<strong>120–150家自营诊所成熟：</strong>早期开业的 CVC 与 Modern Animal 门店集中跨过 2–4 年成熟期，释放 >20% 四墙利润率。',
 '<strong>单一投票权常态化：</strong>随着 BC Partners 有序减持与公司回购注销，有望解除受控公司身份并获纳入更多核心指数。'
 ],
 prob: '兑现确定性：中高 (75%)',
 impact: '目标 EBITDA 率：8.5% – 9.5%'
 },
 {
 badge: 'HORIZON 3 · 全生命周期生态稳态期 (2030–2032)',
 title: '10%+ EBITDA 稳态现金牛 × 国际市场盈利 × AI 预防性宠物医疗管家',
 items: [
 '<strong>突破 10% 长期利润率北极星：</strong>医疗、广告与自有品牌合计贡献超半数毛利增量，年自由现金流迈向 $15亿+ 量级。',
 '<strong>加拿大复制成熟与新国别拓荒：</strong>多伦多自动化仓网与本地药房跑通盈利模型后，向更多高养宠率英语市场复制。',
 '<strong>主动式 AI 宠物健康管家：</strong>融合诊所电子病历、基因/血液检测与穿戴数据，自动定制动态营养配比与慢病处方。'
 ],
 prob: '兑现确定性：远期期权 (55%–65%)',
 impact: '目标 EBITDA 率：10.0% – 11.5%'
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
 badge: 'ENGINE 01 · CHEWY VET CARE × MODERN ANIMAL ($400M M&A)',
 title: '从“线上卖药”杀入“线下开方”：打造北美唯一线上线下一体化数字兽医帝国',
 desc: '全美兽医服务市场规模高达 $400亿（年增 ~5%），长期由高度分散的夫妻店或高溢价私募连锁把持，且过去常以不愿外流处方阻碍线上药房渗透。Chewy 于 2026 年 5 月 21 日斥资 $4.0亿现金收购科技兽医平台 Modern Animal（拥有 29 家直营诊所、24/7 远程医疗与超 10 万会员家庭），一举将全国诊所网络从 18 家推升至 47 家（年底迈向 ~60 家），并自 2026 年 7 月起在科罗拉多与得州率先打通 Modern Animal App 一键调用 Chewy Pharmacy 履约处方药。',
 formula: '协同公式：成熟诊所单店营收 >行业均值 2 倍 + 四墙 EBITDA 率 >20% + 带动会员在 Chewy 主站 NSPAC 额外提升 15%–20%',
 gauges: [['47 → ~60家', 'FY26 实体兽医诊所扩张版图'], ['>$125M', 'Modern Animal 年化营收贡献'], ['>20%', '成熟诊所四墙 EBITDA 利润率'], ['+15%–20%', '诊所客群跨平台 NSPAC 提振']]
 },
 {
 badge: 'ENGINE 02 · CHEWY ADS & CHEWY MAX RETAIL MEDIA NETWORK',
 title: 'Chewy Ads × Chewy Max：用 15 年第一方宠物数据收割 ~70%+ 毛利率广告金矿',
 desc: '2023 年 5 月启动的 Chewy Ads 已彻底迁回全自研第一方技术栈，并于 2026 年 3 月重磅发布 AI 驱动的 Chewy Max 投放平台。不同于普通电商仅考核单次点击购买，Chewy Max 允许雀巢普瑞纳、玛氏等 4,000 家品牌商直接按“新客终身价值回报率（LTV ROAS）”竞价——平台平均每 $1 广告费可撬动 >$7 终身销售额，点击购买转化率高达 1/3，且同步打通 Meta、TikTok、Google 与联网电视（CTV）站外投放。',
 formula: '利润传导：广告占净营收比从 ~1%+ 迈向 3.0% × ~70%+ 超高毛利率 = 直接贡献逾 +140–200bps 集团 EBITDA 率扩张',
 gauges: [['2.0x 翻倍', '2026 广告主与在线活动增幅'], ['33.3%', '每 3 次广告点击促成 1 笔购买'], ['>$7 LTV', '每 $1 广告预算平均撬动销售额'], ['~70%+', '零售媒体业务稳态毛利率区间']]
 },
 {
 badge: 'ENGINE 03 · #1 US PET PHARMACY, COMPOUNDING & SMARTEQUINE',
 title: '全美第一宠物药房 + 定制配制药 + $1.75亿马术健康：高门槛特种医疗护城河',
 desc: 'FY2025 Chewy 宠物医疗与特护产品营收已达 $19.81亿（占总营收 15.7%）。除常规驱虫与慢病处方药外，Chewy 大力扩张高毛利定制配制药房（Compounding，将苦药定制为肉味咀嚼锭或涂抹凝胶），并通过 PracticeHub 让数千家外部合作兽医诊所零库存开方分润；2026 年 2 月更以 $1.748亿全现金收购马匹定制营养包霸主 SmartEquine（原 SmartPak，服务 ~4.3万高净值马主），切入极高客单价的马科健康蓝海。',
 formula: '变现逻辑：慢病终身服药刚需 (Autoship 锁死) + 特种配制/马匹高毛利溢价 (+500–1,000bps vs 普通干粮)',
 gauges: [['$1.98B', 'FY25 宠物健康与特护年营收'], ['#1 全美第一', '美国线上宠物处方药房市场地位'], ['$175M 并购', 'SmartEquine 70+款马匹营养制剂'], ['~43,000户', '高客单价活跃马主订阅客群']]
 },
 {
 badge: 'ENGINE 04 · FIRST-PARTY AGENTIC AI (CAI & CALLIE)',
 title: '第一方多智能体编排框架：既守住“真人情感温度”，又每年砍掉 $5,000万可变成本',
 desc: 'Chewy 耗时数个季度自研底层清洁数据管道与多智能体编排框架（Multi-Agent Orchestration），拒绝拼凑第三方黑盒 SaaS：面向消费者的 AI 助手 Cai 在 2026 Q2 已自助解决约 30% 的订单查询与 Autoship 调整会话；面向诊所的语音智能体 Callie 自动处理预约确认与复诊提醒；药房端 AI 则自动提取兽医传真/扫描处方参数。管理层预计 FY2027 起每年实现约 $5,000万美元直接成本节流。',
 formula: '效率杠杆：常规机械咨询由 Cai 零边际成本秒回 → 真人客服 100% 聚焦疑难护理与情感关怀 → 客服成本率结构性下行',
 gauges: [['$50M / 年', 'FY27E 起 AI 年化直接成本节流'], ['~30%', 'Cai 智能体自助解决聊天占比'], ['Callie 语音', '兽医诊所自动排班与诊后随访'], ['100% 自研', '第一方多智能体数据编排底座']]
 },
 {
 badge: 'ENGINE 05 · ROBOTIC AFCs & PRIVATE-LABEL BRANDS',
 title: '自动化履约中心（AFC）产能爬坡 × 自有品牌矩阵：从重体力搬运走向算法驱动',
 desc: '全美 17 座履约中心中的新一代自动化仓（AFC）在拣选、打包与路径规划上全面引入机器人，使全公司员工稳定在 18,000 人（较 FY21 峰值少 3,300 人），固定折旧随单量增长持续摊薄。同时，Frisco（用品）、American Journey（主粮）、Vibeful（保健品）与 Tylee\'s 等自有品牌凭借平台消费洞察精准卡位高复购细分带，毛利率显著优于第三方经销品牌。',
 formula: '双轮提效：AFC 降低每单履约可变人工与拆单运费 + 自有品牌提升毛利 = 构筑对抗通用电商包邮战的成本护盾',
 gauges: [['17 座仓网', '覆盖全美次日/隔日达重货网络'], ['-15.5%', '较 FY21 峰值精简员工编制幅度'], ['+68%', 'FY21–FY25 人均创收累计增幅'], ['Vibeful / Frisco', '高毛利自有营养品与硬品矩阵']]
 },
 {
 badge: 'ENGINE 06 · $59/YR CHEWY+ LOYALTY & CANADA INTERNATIONAL',
 title: '双层会员锁死与跨国复制：$59/年 Chewy+ 叠加 Autoship，多伦多枢纽打通北美外溢',
 desc: 'Chewy 正在经典的免费 Autoship 之上叠加“类 Costco/Prime”付费会员层 Chewy+：2026 年将年费优化定锚为 $59/年（不到 $5/月），赋予会员合资格商品 5% 积分返现、无 $49 门槛全场免运费及免费线上兽医咨询，强力刺激原本只买狗粮的客户把零食、保健品与处方药一并转入 Chewy。地域上，以大多伦多地区（GTA）自动化履约中心为支点深耕加拿大市场，验证零门店纯电商品牌出海模板。',
 formula: '增长飞轮：$59 年费提前锁定心智 → 免门槛包邮消除小件医药/零食下单摩擦 → 驱动单客 NSPAC 向 $750+ 跃迁',
 gauges: [['$59 / 年', 'Chewy+ 全新普惠年费定价'], ['5% 返现', '合资格消费积分回馈锁死复购'], ['$0 免邮门槛', '打破原先 $49 凑单包邮限制'], ['加拿大首站', '验证跨国纯数字宠物生态复制力']]
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

 if (state.fView === 'bridge') {
 var steps = [
 { lbl: 'FY25实绩', v: 5.7, b: 0, col: pal.blue, tip: 'FY2025 实际 Adjusted EBITDA 利润率: 5.7% ($719.2M)' },
 { lbl: 'FY26E增量', v: 1.05, b: 5.7, col: pal.green, tip: 'FY2026 指引中枢提升至 6.75% (~$912M)，单年扩张超 +100bps' },
 { lbl: '+零售媒体', v: 1.25, b: 6.75, col: pal.violet, tip: 'Chewy Ads / Chewy Max 向 3% 营收占比迈进，高毛利增厚 +125bps' },
 { lbl: '+药房/诊所', v: 1.05, b: 8.0, col: pal.amber, tip: 'Modern Animal 成熟诊所 (>20% EBITDA) 与定制药占比提升贡献 +105bps' },
 { lbl: '+AI与AFC', v: 0.95, b: 9.05, col: pal.green, tip: 'Cai/Callie 年省 $50M+ 与 AFC 自动化固定成本摊薄贡献 +95bps' },
 { lbl: '长期目标', v: 10.0, b: 0, col: pal.blue, tip: 'Investor Day 长期稳态目标: 10.0%+ Adjusted EBITDA 利润率' }
 ];
 var maxB = 11.5;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxB / 4) * k, ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv.toFixed(1) + '%', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
 var yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(6, yb - yt);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + s.v.toFixed(2) + '%', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var peers = [
 { name: 'Amazon (集团)', cap: 12.8, col: pal.amber, tip: '含 AWS 数据中心与重型物流网络，CapEx 占营收约 12%–14%' },
 { name: 'Zoetis (动物药)', cap: 7.4, col: pal.violet, tip: '生物制剂与单抗产能扩建，CapEx 占营收约 7%–8%' },
 { name: 'Petco (线下店)', cap: 3.8, col: pal.red, tip: '1,500家实体门店翻新与维护消耗大量资本开支' },
 { name: 'Walmart', cap: 3.2, col: pal.blue, tip: '全渠道门店改造与供应链自动化投入约 3.2%' },
 { name: 'Chewy (CHWY)', cap: 1.03, col: pal.green, tip: 'FY2025 CapEx 仅 $129.2M（占净营收 1.03%）！轻资产高现金流转化典范' }
 ];
 var maxC = 15;
 for (var g = 0; g <= 3; g++) {
 var gv = g * 5, gy = pad.top + ph - (gv / maxC) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(p.cap.toFixed(1) + '%', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '10.5px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' CapEx/营收比', body: p.tip });
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

 if (state.sView === 'clinics') {
 var yrs = ['FY24末', 'FY25末', 'Q2 FY26(并购)', 'FY26E末', 'FY28E', 'FY30E'];
 var clinics = [8, 18, 47, 60, 105, 160];
 var maxCl = 180;
 for (var g = 0; g <= 3; g++) {
 var gv = g * 60, gy = pad.top + ph - (gv / maxCl) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '家', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (clinics[i] / maxCl) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i > 2 ? pal.violet : pal.blue);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(clinics[i] + '家', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 自营兽医诊所规模', body: '全国门店数达 ' + clinics[i] + ' 家（含 CVC 自建与 Modern Animal 29 家整合）' });
 });
 } else {
 var pyrs = ['FY21', 'FY23', 'FY25', 'FY26E', 'FY28E', 'FY30E'];
 var revEmp = [417, 616, 700, 742, 845, 960];
 var minR = 300, maxR = 1050;
 for (var m = 0; m <= 3; m++) {
 var mv = minR + ((maxR - minR) / 3) * m, my = pad.top + ph - (m / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + Math.round(mv) + 'K', pad.left - 8, my + 4);
 }
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 revEmp.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - ((v - minR) / (maxR - minR)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 revEmp.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - ((v - minR) / (maxR - minR)) * ph;
 ctx.fillStyle = idx >= 3 ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4.4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v + 'K', px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(pyrs[idx], px, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: pyrs[idx] + ' 人均年创收', body: 'AFC 机器人仓网与 AI 智能体推动人均创收达 $' + v + 'K' });
 });
 }
 }

 // F4: Interactive 2030 Optionality Builder + Mini Canvas
 var OPT_DATA = {
 ads: { rev: 0.45, eb: 0.32 },
 vet: { rev: 1.40, eb: 0.23 },
 ai: { rev: 0.00, eb: 0.145 },
 plus: { rev: 1.20, eb: 0.135 },
 intl: { rev: 1.30, eb: 0.12 }
 };
 var miniCaps = [7.85, 14.4, 26.0];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(18, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }

 function recalcOptionality() {
 // Baseline organic FY2030E (core consumables ~4% CAGR from $13.52B -> $15.80B, base Adj. EBITDA $1.03B, net cash ~$0.4B, ~367M diluted shares after ~2.8%/yr buybacks)
 var baseRev = 15.80, baseEb = 1.03, sh2030 = 0.367;
 var addRev = 0, addEb = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addEb += d.eb; }
 }
 });
 var totRev = baseRev + addRev;
 var totEb = baseEb + addEb;
 var ebMargin = (totEb / totRev) * 100;
 var mcapB = totEb * state.pe + 0.40;
 var baseMcapB = baseEb * state.pe + 0.40;
 var impliedPrice = mcapB / sh2030;

 document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(1) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totEb.toFixed(2) + 'B (' + ebMargin.toFixed(1) + '%)';
 document.getElementById('optEpsOut').textContent = '$' + impliedPrice.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapB.toFixed(2) + 'B';

 miniCaps = [7.85, baseMcapB, mcapB];
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
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 14;
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
 { id: 'sec-f0', t: 'F0 医疗跃迁宣言与三阶战略时间窗', s: '2026–2032 近程并表/中程扩利/远期 10%+ EBITDA 路线图' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Modern Animal 47家诊所 · Chewy Max · 药房 · AI Cai/Callie' },
 { id: 'sec-f2', t: 'F2 1.03% 轻资产纪律与 10% 利润率桥', s: '对比零售同行 CapEx 强度 · 5.7%→10.0% EBITDA 阶梯拆解' },
 { id: 'sec-f3', t: 'F3 第一方 AI 智能体与 AFC 自动化栈', s: 'Cai 30% 自助解决率 · 诊所扩张与人均创收跃迁曲线' },
 { id: 'sec-f4', t: 'F4 2030 估值重估期权组装实验室', s: '从当前 $7.85B 市值推演五大增长期权与目标股价弹性' }
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

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 document.getElementById('exportHtmlBtn')?.addEventListener('click', triggerHtmlDownload);
 document.getElementById('sideExportBtn')?.addEventListener('click', triggerHtmlDownload);
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () {
 applyTheme('light', false);
 try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {}
 });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () {
 applyTheme('dark', false);
 try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {}
 });

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 try {
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

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 