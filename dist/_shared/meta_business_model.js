
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'meta_bm_stress_v1';

 var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'ltv', kView: 'capex' };
 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg;
 bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2400);
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
 blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.18)',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED',
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
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
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
 try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 function exportSelfHtml() {
 var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'Meta公司商业模式解构.html';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
 showToast('已开始下载《Meta公司商业模式解构.html》');
 }

 // Subfolder Hub Filter & Toast
 var hubPills = document.getElementById('hubCatPills');
 if (hubPills) {
 hubPills.addEventListener('click', function (e) {
 var b = e.target.closest('[data-co-cat]');
 if (!b) return;
 var cat = b.getAttribute('data-co-cat');
 var bs = hubPills.querySelectorAll('.co-hub-pill');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var its = document.querySelectorAll('#hubItemList [data-co-item-cat]');
 for (var j = 0; j < its.length; j++) {
 its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
 }
 });
 }
 document.querySelectorAll('[data-nav-toast]').forEach(function (el) {
 el.addEventListener('click', function () { showToast(el.getAttribute('data-nav-toast')); });
 });

 // M0: 3-Lens Formula Switcher
 var LENSES = [
 {
 formula: '核心广告营收 ($196.2B) = 家庭日活 DAP (3.64B) × 人均时长 × 广告加载率 [展示量 +10%] × AI 转化率溢价 [广告均价 +14%]',
 body: '奈飞每年需耗资约 $170亿 拍摄影视内容留住订户，苹果需支付约 61% 硬件 BOM 成本造手机；而 Meta 的内容由全球 36.4 亿用户与超千万中小商家免费生产，营业成本仅占营收约 <strong>18%–19%</strong>（主要为数据中心折旧与带宽），铸就了 81%–82% 的软件级极致毛利率。'
 },
 {
 formula: '广告主 ROI 护城河 = AI 深度学习排序 (Andromeda/GEM) + 生成式多素材自动投放 (Advantage+) → Q3 2026 单价同比大涨 +14%',
 body: '在 2021 年苹果 ATT 隐私新政切断跨应用 IDFA 追踪后，市场曾认为 Meta 精准广告模式永久受损；但 Meta 投入数万张 GPU 重建第一方概率转化模型与自动化投放，不仅完全修复归因精度，更推动广告量（+10%）与价（+14%）在 2,500亿美元年化体量上同步加速。'
 },
 {
 formula: '跨代战略自由度 = FoA 应用家族年营业利润 ($102.5B) + 60.8% 创始人投票权 + 无投票权 Class C 新股融资池',
 body: '普通职业经理人上市公司绝无可能承受 Reality Labs 五年累计亏损 $770亿 再叠加单年 $1400亿 AI 资本开支；唯有扎克伯格凭借 10 票权 Class B 股与 2026Q3 新设的无投票权 Class C 普通股，才能用世界最强广告印钞机强行孵化下一代个人超级智能与智能眼镜计算平台。'
 }
 ];
 var lensTabs = document.getElementById('lensTabs');
 if (lensTabs) {
 lensTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 var all = lensTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });
 }

 // M1: 5-Node Pipeline Inspector
 var NODES = [
 {
 badge: 'NODE 01 · ZERO-CAC SOCIAL & INTEREST DUAL GRAPH',
 title: '从熟人社交网切换至 AI 算法发现流：筑牢 36.4 亿日活不可复制的流量蓄水池',
 desc: '面对 TikTok 短视频冲击，Meta 完成了公司史上最惊险的底层引擎切换——将 Facebook 与 Instagram 主信息流从“仅看关注好友（Social Graph）”重构为“全网 GPU 深度学习兴趣推荐（Discovery Engine）”，Reels 观看时长在排名模型升级后持续两位数攀升；叠加 WhatsApp 全球超 20 亿日活通信刚需与上线仅三年即突破 5 亿月活的 Threads，形成横跨图文、短视频、即时通信与公共广场的四维垄断。',
 formula: '商业传导：双边熟人网络锁死退网成本 + AI 短视频拉长单日停留时长 → 广告库存池（Ad Impressions）在不损伤体验下保持年均 +10%–12% 扩容',
 kpis: [['3.64B', '2026年9月家庭日活人数 (DAP)'], ['>2.0B × 3', 'FB / IG / WhatsApp 三大超20亿日活应用'], ['500M+', 'Threads 月活跃用户规模 (2026年中)'], ['$0 内容买断', '纯 UGC/创作者驱动，毛利率达 82.0%']]
 },
 {
 badge: 'NODE 02 · ADVANTAGE+ & REAL-TIME AD AUCTION',
 title: '毫秒级二价竞拍与 Advantage+ 黑盒自动化：全球超千万中小商家的数字税务局',
 desc: 'Meta 最强大的壁垒不在于单个大品牌预算，而在于全球超千万中小电商与本地服务商对 Advantage+ Shopping 的刚性依赖。广告主只需上传商品链接与信用卡，Meta 的生成式 AI 即自动裁剪视频文案、寻找潜客并实时竞价。由于转化率提升直接抬高广告主最高出价意愿，Q3 2026 平均每条广告价格同比跃升 +14%。',
 formula: '商业传导：AI 推荐提升转化率 → 千万中小商家竞相抬高竞拍出价 → Q3 2026 广告营收同比暴增 +26% 至单季 $630.6亿',
 kpis: [['$63.06B', 'Q3 2026 单季广告营收 (+26% YoY)'], ['+14% YoY', 'Q3 2026 单条广告平均价格涨幅'], ['+10% YoY', 'Q3 2026 全系应用广告展示量增速'], ['51.6%', 'FY2025 应用家族 (FoA) 营业利润率']]
 },
 {
 badge: 'NODE 03 · WHATSAPP BUSINESS LOOP & THREADS MONETIZATION',
 title: '商业闭环补全：把长期免费的 WhatsApp 与 Threads 转化为高毛利增量池',
 desc: '过去十年 WhatsApp 坐拥超 20 亿日活却几乎零变现。如今通过“IG/FB 点击跳转 WhatsApp 私聊广告（Click-to-WhatsApp）”叠加企业付费客服/交易消息 API，以及 2026 年 9 月推出的 Meta One 增强会员与 Threads 广告逐步放开，FoA 其他收入在 2026 年前九个月同比激增 +67% 至 $29.87亿。',
 formula: '商业传导：公域信息流种草 → WhatsApp 私域 AI 客服即时成交 → 实现端到端闭环归因，彻底绕开第三方浏览器 Cookie 限制',
 kpis: [['$2.99B', '9M 2026 FoA 其他非广告营收 (+67%)'], ['3000万条/秒', 'WhatsApp 2026世界杯决赛峰值吞吐'], ['50+ 项特权', '2026年9月上线 Meta One 跨端订阅'], ['~$25B+', '华尔街测算 WhatsApp+Threads 中期增量池']]
 },
 {
 badge: 'NODE 04 · MTIA SILICON & GIGAWATT SUPERINTELLIGENCE',
 title: '从广告软件商变身全球前五算力基建商：MTIA 自研芯片 + Muse 超级智能',
 desc: '为避免算力命脉长期受制于外部 GPU 溢价，Meta 联合博通在两年内密集推出四代 MTIA（300–500）自研训练与推理加速芯片，并建设 Prometheus 与 Hyperion 吉瓦级数据中心（全球运营 33 座数据中心，PUE 低至 1.08）。在此底座上，Alexandr Wang 领衔的超级智能实验室（MSL）于 2026 年连发 Muse Spark、Muse 个人代理与 Muse Wonder 前沿模型。',
 formula: '商业传导：$135B–$145B 算力重投入 → 短期首先反哺核心广告推荐精度 → 中长期孵化 Muse ($20/$100 订阅 + Agent 购物抽成)',
 kpis: [['$135–145B', 'FY2026 全年资本开支官方指引'], ['4 代芯片', '两年连发 MTIA 300–500 自研加速卡'], ['33 座集群', '全球自建数据中心 + 贝莱德 1GW 合资'], ['10M+ 早期用户', 'Muse 独立 AI 代理上线首季高粘性验证']]
 },
 {
 badge: 'NODE 05 · CROSS-SUBSIDY & CLASS C GOVERNANCE SHIELD',
 title: '治理终极护城河：60.8% 创始人超级投票权 + 2027 无投票权 Class C 普通股',
 desc: '2026 年 10 月 21 日，Meta 董事会正式批准设立无投票权 Class C 普通股（2027年1月19日生效，按 1:1 派发股票股利实现类一拆二）并签署《创始人对齐协议》。这一制度设计让 Meta 未来既能增发无投票权股票用于 AI 并购、顶尖研究员亿级薪酬包与算力融资，又确保扎克伯格 60.8% 的绝对控制权永不被摊薄。',
 formula: '商业传导：Class B (10票) + Class C (0票) 三层股权架构 → 屏蔽华尔街短期季度 FCF 波动考核 → 保障十年周期的 AI 与 AR 眼镜豪赌',
 kpis: [['60.8%', '扎克伯格所持总投票权比例 (~13.4%股本)'], ['1 : 1 派股', '2027.01.19 生效类一拆二 Class C 股利'], ['$80.92B', '2026Q3 长期债务规模 (低息发债扩表)'], ['$8T–$9T', '2026.03 核心高管 2031 登月期权市值锚']]
 }
 ];
 var pTrack = document.getElementById('pipelineTrack');
 if (pTrack) {
 pTrack.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
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

 // M2B & M3A & M5 Filters
 var tierFilter = document.getElementById('tierFilter');
 if (tierFilter) {
 tierFilter.addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]');
 if (!b) return;
 var cat = b.getAttribute('data-tcat');
 var bs = tierFilter.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var cards = document.querySelectorAll('#tierList [data-tier]');
 for (var j = 0; j < cards.length; j++) {
 cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
 }
 });
 }

 var COHORTS = {
 apac: {
 stats: [
 ['覆盖核心应用组合', 'WhatsApp + Facebook + IG Reels', '全球最大用户增量底座（超20亿人）'],
 ['FY2025 区域营收增速', '亚太 +20% / 其他地区 +27%', '增速领跑全集团'],
 ['年化单用户创收 (ARPU)', '~$22 – $28 / 年', '仅为美加市场的约 1/11，提价空间巨大'],
 ['5年累计单客毛利贡献', '~$125', '随 Click-to-WhatsApp 商业化快速抬升']
 ],
 note: '<strong>新兴市场数量压舱石：</strong>在印度、印尼、巴西与墨西哥，WhatsApp 几乎等同于互联网本身。虽然传统展示广告单价较低，但按对话收费的 WhatsApp Business API 与 AI 导购代理正打开全新的交易变现通道。'
 },
 eu: {
 stats: [
 ['覆盖核心应用组合', 'Instagram + WhatsApp + Facebook', '高消费力成熟数字经济体'],
 ['FY2025 区域营收增速', '+24% YoY', '无惧监管逆风实现高速增长'],
 ['年化单用户创收 (ARPU)', '~$105 – $115 / 年', '稳居全球第二高价值梯队'],
 ['5年累计单客毛利贡献', '~$480', '受欧盟 DMA“低个性化广告”政策边际扰动']
 ],
 note: '<strong>欧洲高价值合规博弈层：</strong>尽管欧盟委员会强制要求提供低个性化广告选项（Less Personalized Ads），但欧洲本土品牌缺乏替代性流量渠道，使 Meta 欧洲区 FY2025 营收依然实现 +24% 强劲增长。'
 },
 usca: {
 stats: [
 ['覆盖核心应用组合', 'IG Reels + FB + Messenger + Threads', '电商高客单价竞价最白热化市场'],
 ['FY2025 区域营收增速', '+21% YoY', '高基数下依旧强劲扩张'],
 ['年化单用户创收 (ARPU)', '~$290+ / 年', '约为亚太/新兴市场的 10–12 倍'],
 ['5年累计单客毛利贡献', '~$1,190', '按 82% 毛利率且 $0 买量成本测算']
 ],
 note: '<strong>双向商家-用户网络棘轮：</strong>北美每位活跃用户每年为 Meta 贡献近 $300 广告收入，原因在于数百万独立站电商、消费品牌与跨境卖家必须在 IG/FB 上竞价才能获客；而随着 WhatsApp 商业客服与 AI 代理普及，全球其他地区正开启漫长的 ARPU 追赶红利。'
 }
 };
 var cohortTabs = document.getElementById('cohortTabs');
 if (cohortTabs) {
 cohortTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]');
 if (!b) return;
 var key = b.getAttribute('data-cohort');
 var bs = cohortTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var c = COHORTS[key] || COHORTS.usca;
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
 var b = e.target.closest('[data-pcat]');
 if (!b) return;
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

 // High-DPI Canvas Engine
 function prepCanvas(id) {
 var c = document.getElementById(id);
 if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 500);
 var h = Math.max(140, rect.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr);
 c.height = Math.round(h * dpr);
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

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: 'FY25总营收', val: 201.0, base: 0, col: pal.blue, tip: 'FY2025 总营收 $200.97B (+22% YoY)：其中广告 $196.18B + FoA其他 $2.58B + RL $2.21B' },
 { lbl: '综合毛利', val: 164.8, base: 0, col: pal.green, tip: 'FY2025 毛利额 $164.79B（综合毛利率高达 82.0%，营业成本仅 $36.18B）' },
 { lbl: 'FoA营业利润', val: 102.5, base: 0, col: pal.violet, tip: '应用家族 (FoA) 独创 $102.47B 营业利润，分部营业利润率高达 51.6%' },
 { lbl: 'RL营业亏损', val: 19.2, base: 83.3, col: pal.red, tip: 'Reality Labs 虚拟/增强现实与智能眼镜研发营业亏损 -$19.19B' },
 { lbl: '集团营业利润', val: 83.3, base: 0, col: pal.blue, tip: 'FY2025 合并营业利润 $83.28B (+20% YoY)，综合营业利润率 41.4%' },
 { lbl: '自由现金流', val: 43.6, base: 0, col: pal.amber, tip: '经营现金流 $115.80B 扣除含租赁资本开支 $72.22B 后，自由现金流为 $43.59B' }
 ];
 var maxV = 220;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(46, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((i === 3 ? '-' : '') + '$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', '9M26'];
 var gm = [80.8, 78.3, 80.8, 81.7, 82.0, 80.8];
 var opm = [39.6, 24.8, 34.7, 42.2, 41.4, 35.5]; // 9M26 ex-$9.89B AG charge = 35.5% (GAAP 30.1%)
 var cap = [15.8, 27.5, 20.8, 23.8, 35.9, 47.2];
 var minM = 10, maxM = 90;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m;
 var my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 function plotLine(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === yrs.length - 1 || idx === 1 || idx === 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 8);
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
 plotLine(opm, pal.blue, '经调营业利润率 Operating Margin (9M26剔除和解金)');
 plotLine(cap, pal.amber, 'CapEx / 营收资本强度 (含租赁)');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 22, bottom: 42, left: 56 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'ltv') {
 var xLbls = ['第1年 Y1', '第2年 Y2', '第3年 Y3', '第4年 Y4', '第5年 Y5'];
 var apac = [21, 44, 70, 96, 125];
 var eu = [82, 172, 268, 370, 480];
 var usca = [215, 442, 680, 930, 1190];
 var maxL = 1320;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxL / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0), pad.left - 8, gy + 4);
 }
 function drawCurve(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + v, px - 6, py - 8);
 }
 hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '单用户累计毛利贡献: ~$' + v });
 });
 }
 xLbls.forEach(function (lb, idx) {
 var px = pad.left + (idx / 4) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 drawCurve(usca, pal.violet, '美加核心户 (US & Canada)');
 drawCurve(eu, pal.blue, '欧洲成熟户 (Europe)');
 drawCurve(apac, pal.green, '亚太与新兴市场户 (APAC & RoW)');
 } else {
 var items = [
 { name: 'Family of Apps (FY25)', rev: 198.76, op: 102.47, col: pal.green },
 { name: 'Family of Apps (9M26)', rev: 180.44, op: 67.41, col: pal.blue },
 { name: 'Reality Labs (FY25)', rev: 2.21, op: -19.19, col: pal.red }
 ];
 var zeroY = pad.top + ph * 0.78;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke();
 var scale = (ph * 0.74) / 210;
 var slot = pw / items.length, bw = 34;
 items.forEach(function (it, idx) {
 var cx = pad.left + idx * slot + slot / 2;
 var rh = Math.max(4, it.rev * scale);
 ctx.fillStyle = pal.blueSoft;
 roundRect(ctx, cx - bw - 4, zeroY - rh, bw, rh, 5); ctx.fill();
 var oh = Math.max(4, Math.abs(it.op) * scale);
 ctx.fillStyle = it.col;
 var oy = it.op >= 0 ? (zeroY - oh) : zeroY;
 roundRect(ctx, cx + 4, oy, bw, oh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + it.rev.toFixed(1) + 'B', cx - bw / 2 - 4, zeroY - rh - 6);
 ctx.fillText((it.op > 0 ? '+' : '') + '$' + it.op.toFixed(1) + 'B', cx + bw / 2 + 4, it.op >= 0 ? (oy - 6) : (oy + oh + 13));
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(it.name, cx, pad.top + ph + 22);
 hitRegions.cohortCanvas.push({ x: cx - bw - 8, y: pad.top, w: bw * 2 + 16, h: ph, title: it.name, body: '分部营收 $' + it.rev.toFixed(2) + 'B · 分部营业利润 ' + (it.op > 0 ? '+' : '') + '$' + it.op.toFixed(2) + 'B' });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'capex') {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var ocf = [57.7, 50.5, 71.1, 91.3, 115.8, 132.0];
 var cap = [19.2, 32.0, 28.1, 39.2, 72.2, 140.0];
 var maxV = 155;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxV / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(22, slot * 0.34);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2;
 var oh = (ocf[i] / maxV) * ph, ch = (cap[i] / maxV) * ph;
 ctx.fillStyle = pal.green;
 roundRect(ctx, cx - bw - 2, pad.top + ph - oh, bw, oh, 4); ctx.fill();
 ctx.fillStyle = (i === 5) ? pal.red : pal.amber;
 roundRect(ctx, cx + 2, pad.top + ph - ch, bw, ch, 4); ctx.fill();
 if (i >= 3) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + cap[i].toFixed(0) + 'B', cx + bw / 2 + 2, pad.top + ph - ch - 5);
 }
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: cx - bw - 4, y: pad.top, w: bw * 2 + 8, h: ph, title: y + ' 经营现金流 vs 资本开支', body: '经营现金流 OCF: $' + ocf[i].toFixed(1) + 'B · 含租赁 CapEx: $' + cap[i].toFixed(1) + 'B（FY26E 取指引中枢 $140B）' });
 });
 } else {
 var byrs = ['FY22', 'FY23', 'FY24', 'FY25', '9M26'];
 var buy = [27.9, 20.0, 30.1, 26.2, 0.0];
 var debt = [9.9, 18.4, 28.8, 58.7, 80.9];
 var maxD = 90;
 for (var k = 0; k <= 3; k++) {
 var kv = k * 30, ky = pad.top + ph - (kv / maxD) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var s2 = pw / byrs.length, bw2 = Math.min(26, s2 * 0.34);
 byrs.forEach(function (y, i) {
 var cx = pad.left + i * s2 + s2 / 2;
 var bh1 = Math.max(2, (buy[i] / maxD) * ph), bh2 = (debt[i] / maxD) * ph;
 ctx.fillStyle = pal.blue;
 roundRect(ctx, cx - bw2 - 2, pad.top + ph - bh1, bw2, bh1, 4); ctx.fill();
 ctx.fillStyle = pal.violet;
 roundRect(ctx, cx + 2, pad.top + ph - bh2, bw2, bh2, 4); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + buy[i].toFixed(1) + 'B', cx - bw2 / 2 - 2, pad.top + ph - bh1 - 5);
 ctx.fillText('$' + debt[i].toFixed(1) + 'B', cx + bw2 / 2 + 2, pad.top + ph - bh2 - 5);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: cx - bw2 - 4, y: pad.top, w: bw2 * 2 + 8, h: ph, title: y + ' 资本结构转向', body: '股票回购: $' + buy[i].toFixed(2) + 'B · 期末长期债务: $' + debt[i].toFixed(2) + 'B（9M26 暂停回购全力保算力）' });
 });
 }
 }

 // M4B: Interactive 5-Year EPS Simulator
 var simData = { eps: [27.9, 32.5, 38.6, 46.2, 54.9, 65.1] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var arr = simData.eps;
 var maxE = Math.max(40, Math.ceil(Math.max.apply(null, arr) * 1.15));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(1), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gAd = parseFloat(document.getElementById('inpAdCagr').value) / 100;
 var opM = parseFloat(document.getElementById('inpOpMargin').value) / 100;
 var shChg = parseFloat(document.getElementById('inpShareChg').value) / 100;
 document.getElementById('lblAdCagr').textContent = (gAd * 100).toFixed(1) + '%';
 document.getElementById('lblOpMargin').textContent = (opM * 100).toFixed(1) + '%';
 document.getElementById('lblShareChg').textContent = (shChg >= 0 ? '+' : '') + (shChg * 100).toFixed(1) + '%';

 // FY26E normalized ex-AG settlement baseline: ~$256.2B rev, ~$85.5B opInc, ~16% norm tax -> $27.90 norm EPS on 2.57B shares
 var rev = 256.2, shares = 2.57, baseEps = 27.90;
 var epsArr = [baseEps];
 for (var y = 1; y <= 5; y++) {
 rev *= (1 + gAd);
 if (y >= 2) shares *= (1 - shChg);
 var curM = 0.334 + (opM - 0.334) * (y / 5);
 var netInc = rev * curM * 0.845;
 epsArr.push(netInc / shares);
 }
 var fy31Op = rev * opM;
 var fy31Eps = epsArr[5];
 var cagr = (Math.pow(fy31Eps / baseEps, 0.2) - 1) * 100;
 document.getElementById('simRevOut').textContent = '$' + Math.round(rev) + 'B';
 document.getElementById('simOpOut').textContent = '$' + Math.round(fy31Op) + 'B';
 document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
 document.getElementById('simCagrOut').textContent = (cagr >= 0 ? '+' : '') + cagr.toFixed(1) + '%';
 simData.eps = epsArr;
 drawSimMiniCanvas();
 }
 ['inpAdCagr', 'inpOpMargin', 'inpShareChg'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });
 var PRESETS = {
 bear: { a: 9.0, m: 29.0, s: -0.8 },
 base: { a: 14.5, m: 38.0, s: 1.0 },
 bull: { a: 19.5, m: 44.5, s: 2.0 }
 };
 var simPresets = document.getElementById('simPresets');
 if (simPresets) {
 simPresets.addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var k = b.getAttribute('data-preset');
 var bs = simPresets.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[k] || PRESETS.base;
 document.getElementById('inpAdCagr').value = pr.a;
 document.getElementById('inpOpMargin').value = pr.m;
 document.getElementById('inpShareChg').value = pr.s;
 runSimulator();
 });
 }

 function bindChartTab(gid, attr, skey, fn) {
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
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 function bindHoverTooltip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect();
 var mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var list = hitRegions[cid] || [], hit = null;
 for (var i = 0; i < list.length; i++) {
 var rg = list[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 300, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

 function drawAllCharts() {
 drawProfitCanvas();
 drawCohortCanvas();
 drawCapitalCanvas();
 drawSimMiniCanvas();
 }

 // Quick Jump (⌘K)
 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'FY25 $201.0B · Q3 26 +26% · 82% 毛利率注意力印钞机' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '3.64B双图谱 → Advantage+竞价 → WhatsApp → MTIA → Class C' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四层变现引擎', s: 'FoA 营业利润 $102.5B (51.6%) 对冲 RL -$19.2B 亏损' },
 { id: 'mod-cohort', t: 'M3 区域 12 倍 ARPU 剪刀差与双分部', s: '美加 ~$290 ARPU vs 亚太新兴市场追赶红利' },
 { id: 'mod-capital', t: 'M4 $140B 算力豪赌与 5 年 EPS 推演器', s: '暂停回购发债扩表 · 2027–2031 算力折旧消化模拟' },
 { id: 'mod-matrix', t: 'M5 六大科技巨头范式对标与三大压测', s: 'META vs AAPL / GOOGL / MSFT / AMZN / NVDA' }
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
 var jb = e.target.closest('[data-jump]');
 if (!jb) return;
 var el = document.querySelector(jb.getAttribute('data-jump'));
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 }
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qInput) qInput.focus(); }
 if (e.key === 'Escape') document.body.classList.remove('portal-detail-drawer');
 });

 // Sidebar Toggle, Export, Print & Checkboxes
 var sbBtn = document.getElementById('sidebarToggleBtn'), bd = document.getElementById('portalDetailBackdrop');
 if (sbBtn) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '1' : '0'); } catch (e) {}
 setTimeout(drawAllCharts, 60);
 } else {
 document.body.classList.toggle('portal-detail-drawer');
 }
 });
 }
 if (bd) bd.addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 document.querySelectorAll('#muiSidebar .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 });
 document.querySelectorAll('[data-export-self]').forEach(function (btn) { btn.addEventListener('click', exportSelfHtml); });
 document.querySelectorAll('[data-set-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () { applyTheme(btn.getAttribute('data-set-theme'), false); });
 });
 var prBtn = document.getElementById('sidePrintBtn');
 if (prBtn) prBtn.addEventListener('click', function () { window.print(); });

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var docH = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
 }
 }, { passive: true });

 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk');
 chk.checked = !!savedChk[k];
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

 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 applyTheme(state.theme === 'dark' ? 'light' : 'dark', false);
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (lb) applyLang(lb.getAttribute('data-lang'), false);
 });

 var rTimer = null;
 window.addEventListener('resize', function () { clearTimeout(rTimer); rTimer = setTimeout(drawAllCharts, 90); });
 runSimulator();
 drawAllCharts();
 })();
 