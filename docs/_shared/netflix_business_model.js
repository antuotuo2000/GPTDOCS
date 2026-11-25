
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_DENSITY_KEY = 'mui_clarity_density_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'nflx_bm_stress_v1';

 var state = {
 theme: 'dark',
 lang: 'zh',
 pView: 'waterfall',
 cView: 'regions',
 kView: 'fcf'
 };

 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

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
 blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.16)',
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
 var sL = document.getElementById('sideLightBtn'), sD = document.getElementById('sideDarkBtn');
 if (sL) sL.classList.toggle('active', state.theme === 'light');
 if (sD) sD.classList.toggle('active', state.theme === 'dark');
 drawAllCharts();
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
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 function applyDensity(d) {
 var mode = d === 'compact' ? 'compact' : 'comfort';
 document.body.setAttribute('data-density', mode);
 var bs = document.querySelectorAll('[data-density-btn]');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i].getAttribute('data-density-btn') === mode);
 try { localStorage.setItem(STORAGE_DENSITY_KEY, mode); } catch (e) {}
 drawAllCharts();
 }

 // Suite Hub Filter & Actions (Zero Auto-Scroll on Load)
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

 // 1. Command Deck 3-Lens Switcher
 var LENSES = [
 {
 formula: '单部剧集单次观看成本 = 固定制作/采购额 ÷ 全球 190+ 国总观看量 → 规模越大，对手越无法跟进同等内容预算',
 body: '迪士尼流媒体（FY26E DTC SVOD 营业利润率指引仅 10%）与传统片厂受限于分区域发行和院线窗口期摩擦，而奈飞凭借<strong>非英语本土内容占比超 1/3 的全球化交叉分发</strong>（如韩国、墨西哥、丹麦与日本本土剧集瞬间触达近 10 亿观众），用行业最低的单小时观看摊销成本撑起每年近 $180 亿现金内容弹药库。'
 },
 {
 formula: '单户综合 ARM = 基础月费阶梯 ($7.99 → $24.99) + 付费共享附加席位 + 广告层 eCPM 变现 (2.5亿+月活观众)',
 body: '过去十年奈飞只赚单一无广告订阅费；如今通过<strong>“低门槛广告层引流价格敏感客群 + 高价值无广告层温和提价 + 密码共享打击”</strong>三箭齐发，广告套餐在上线国家贡献约 50% 新增注册，同时自研 Netflix Ads Suite 省去外部技术商分成，直接增厚边际营业利润率。'
 },
 {
 formula: '自由现金流转化 (~$12.0B) = 营业利润 ($16.1B) + 内容摊销与现金投入差额 (~1.1x稳态) - 极低物理 CapEx (1.8%)',
 body: '华尔街曾长期质疑奈飞“账面盈利但现金流为负”，根源在于高速扩张期现金内容投入远超历史摊销（>1.5x）。如今现金内容/摊销比收敛至稳态 <strong>~1.1x</strong>，叠加 <strong>$17.8 亿会员预收递延收入浮存金</strong>与极轻物理资产，每年超百亿美元自由现金流全额化作回购缩股燃料。'
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

 // 2. Horizontal 5-Node Value-Chain Pipeline Inspector
 var NODES = [
 {
 badge: 'NODE 01 · GLOBAL-LOCAL CONTENT FACTORY & LICENSING',
 title: '全球 50+ 国本土制片网络 + 头部片厂逆向授权：对手越撤退，奈飞片库越厚',
 desc: '奈飞过去十年在韩国、日本、西班牙、墨西哥、英国、丹麦与印度建立本土原创团队，推动非英语剧集观看占比从十年前不足 10% 跃升至如今超过 1/3（如 2026Q3 丹麦《The Secret Woman》获 4,700 万次观看、墨西哥《Facing El Chapo》获 5,800 万次观看）。与此同时，随着传统媒体迫于债务压力放弃排他闭环，迪士尼（《冰川时代》全系、《波西·杰克逊》）与法国 TF1 纷纷向奈飞开放授权与频道聚合。',
 formula: '商业传导：非英语地区低制作成本 × 全球近 10 亿人同步宣发 + 第三方成熟 IP 授权 → 维持行业最低退订率（Churn）',
 kpis: [['$34.61B', 'Q3\'26 资产负债表净内容资产'], ['>33.3%', '非英语内容占全球总观看时长比'], ['$25.22B', '流媒体内容总采购承诺义务'], ['~10亿人', '全球触达观众规模（合作首选入口）']]
 },
 {
 badge: 'NODE 02 · PERSONALIZED DISCOVERY & OPEN CONNECT CDN',
 title: '自研 Open Connect 边缘缓存 + 新版电视交互 UI：把“找片摩擦”与“带宽过路费”降到极致',
 desc: '当家庭打开电视超过 90 秒找不到想看的内容就会切向短视频。奈飞 2025–2026 全面升级新版 TV UI，结合实时行为信号精准匹配剧集、直播与游戏；底层则依靠免费部署在全球 1,000 多家电信运营商（ISP）机房内的 Open Connect 定制缓存服务器，在离客厅仅 2–3 跳距离直接吐出 4K 视频流，规避高昂跨网传输费。',
 formula: '商业传导：高命中个性化推荐提升单户观看粘性 + Open Connect 本地化卸载 >95% 流量 → 营业成本率显著优于同行',
 kpis: [['1,000+家', '全球合作内嵌 ISP 运营商网络'], ['~15%', '占全球互联网下行总流量份额'], ['1.8%', '9M26 物理资本开支占营收比重'], ['新版 TV UI', '无缝整合剧集、直播与第三方频道']]
 },
 {
 badge: 'NODE 03 · THREE-TIER PRICING LADDER & PAID SHARING',
 title: '三档价格阶梯与付费共享闭环：每一次提价都由真实观看价值托底',
 desc: '奈飞摒弃“一刀切”定价，构建起含广告标准版、无广告标准版与 4K 高级版（加购家庭外额外成员席位）的精密价格阶梯。2026 年实施新一轮调价后，全球与美国本土退订率（Churn）不仅未升反而同比改善，证明当片单供给密度足够高时，奈飞具备极强的抗通胀周期提价权。',
 formula: '商业传导：观看参与度稳固 → 周期性温和提价 + 借号用户转正 → 订阅收入增速在 Q3\'26 跑赢公司内部预期',
 kpis: [['325M+', '全球付费订阅家庭账户底座'], ['~50%', '广告区新注册用户选择含广告档'], ['Churn 改善', '2026 调价后美及全球留存超预期'], ['4大区域', '全区连续实现双位数营收增长']]
 },
 {
 badge: 'NODE 04 · IN-HOUSE NETFLIX ADS SUITE & EVENTIZED LIVE TV',
 title: '自研 Netflix Ads Suite + 顶级体育事件直播：切入全球千亿美元品牌电视广告池',
 desc: '告别早期依赖微软外部广告技术的过渡阶段，奈飞已全面切换至 100% 自研的 Netflix Ads Suite（NAS），打通全球 CTV 程序化采买、DSP 内置归因以及 MercadoLibre（拉美）、AdForm（欧洲）合作，并在 WWE Raw 与 NFL 赛事中落地动态广告插入（DAI），2027 年 3 月起再向 15 个新国家扩张。',
 formula: '商业传导：2.5亿+高注意力大屏观众 × 自研广告栈零分成损耗 + 体育直播稀缺溢价 → 广告营收迈向 2030E $90亿目标',
 kpis: [['250M+ MAV', '含广告套餐全球月活跃观众'], ['~$2.7B', 'FY2026E 全年广告业务营收指引'], ['+15 新国', '2027年广告套餐新增覆盖市场'], ['5场 NFL + WWE', '感恩节前夜与圣诞大战收视引爆点']]
 },
 {
 badge: 'NODE 05 · ~1.1x CASH CONTENT DISCIPLINE & CANNIBALIZATION',
 title: '拒接高溢价并购包袱 + 创纪录股票回购：把自由现金流直接转化为每股收益弹性',
 desc: '2026 年 2 月面对派拉蒙天舞将华纳兄弟探索（WBD）竞购价推高至 $1,110 亿，奈飞严守资本回报率纪律果断离场，在 Q1 净赚 $28 亿现金违约金，随即宣布加码 $250 亿股票回购授权。Q3 单季奈飞斥资 $48.0 亿回购 6,390 万股（创公司史单季最高纪录），推动拆股调整后稀释股本同比缩减 3.3%。',
 formula: '商业传导：~$120亿年度 FCF + $28亿违约金落袋 → 拒绝举债并购泥潭、全力回购缩股 → Q3\'26 EPS 飙升 +49% YoY',
 kpis: [['~1.1x', '年度现金内容投入/摊销纪律比'], ['$4.80B', '2026Q3 单季创纪录股票回购额'], ['$22.3B', '截至 Q3 末剩余可用回购授权池'], ['4,195M股', '拆股后稀释股本（较上年缩减 1.45亿股）']]
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

 // 3. Filters & Regional Switcher
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
 ucan: {
 stats: [
 ['Q3 2026 单季净营收', '$5,628M', '+11% YoY（占全集团 43.7%）'],
 ['9M 2026 累计营收', '$16,305M', '全球最高单客 ARM 利润池'],
 ['核心增长驱动引擎', '提价消化 + NFL/WWE 广告', '调价后美国退订率同比下降'],
 ['战略护城河锚点', '客厅第一入口（Must-Have）', '费城与达拉斯 Netflix House 落地']
 ],
 note: '<strong>北美成熟区特征：</strong>即便在高度渗透的美国与加拿大主场，奈飞通过 2026 年价格调整、付费共享常态化及 NFL 圣诞/感恩节赛事广告，依然保持 +11% 稳健双位数营收增长，是全集团自由现金流的最大基石。'
 },
 emea: {
 stats: [
 ['Q3 2026 单季净营收', '$4,107M', '+11% YoY（汇率中性 +9%）'],
 ['9M 2026 累计营收', '$12,139M', '集团第二大核心支柱（占 31.9%）'],
 ['本土爆款与渠道创新', '英国/法国/丹麦剧集 + TF1 聚合', '丹麦剧《The Secret Woman》4,700万观看'],
 ['广告网络加速布局', 'AdForm 合作 + 2027 新增 9 国', '欧洲程序化 CTV 广告快速放量']
 ],
 note: '<strong>欧洲中东区特征：</strong>奈飞在法国开创性地将本土最大商业电视台 TF1 的实时剧集、新闻与体育频道无缝内嵌进奈飞界面，证明其正从单一流媒体升维为欧洲家庭的<strong>“国家级电视超级聚合器”</strong>。'
 },
 emerging: {
 stats: [
 ['Q3 2026 合计净营收', '$3,140M', 'LATAM $1,603M (+17%) + APAC $1,537M (+12%)'],
 ['汇率中性真实增速', '+12% ~ +15%', '印度单季营收汇率中性大涨 ~+18%'],
 ['印度市场里程碑', '观看时长 +24% YoY', '单季净增付费户创印度历史最高纪录'],
 ['本土商业结盟标杆', 'MercadoLibre (拉美) + Flipkart (印度)', '电商会员捆绑大幅降低获客摩擦']
 ],
 note: '<strong>拉美与亚太高增长极：</strong>韩国（《The East Palace》）、日本（《Plastic Beauty》创日本本土剧最高纪录）、墨西哥（《Facing El Chapo》5,800万观看）与印度日播综艺《Lock Upp》不仅引爆本地订户增长，更反向输出全球，构成奈飞未来十年最大的用户增量池。'
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
 var c = COHORTS[key] || COHORTS.ucan;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
 var isMono = idx < 2 ? ' mono' : '';
 var fz = idx >= 2 ? ' style="font-size:0.93rem;"' : '';
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

 // 4. High-DPI Retina Custom Canvas Engine
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
 { lbl: '订阅营收', val: 48.4, base: 0, col: pal.blue, tip: 'FY2026E 核心会员订阅净营收约 ~$48.4B（跑赢年初预期）' },
 { lbl: '+广告营收', val: 2.7, base: 48.4, col: pal.green, tip: 'FY2026E 自研广告业务营收约 +$2.7B，合计总营收达 $51.1B (+13% YoY)' },
 { lbl: '=毛利池', val: 26.2, base: 0, col: pal.violet, tip: '扣除内容摊销与 Open Connect 分发成本后毛利约 ~$26.2B (毛利率 ~51.3%)' },
 { lbl: '营业利润', val: 16.1, base: 0, col: pal.blue, tip: 'FY2026E 营业利润约 $16.1B (+20.8% YoY)，全年营业利润率指引 31.5%' },
 { lbl: 'GAAP净利', val: 15.1, base: 0, col: pal.amber, tip: 'FY2026E 预计 GAAP 净利润 ~$15.14B（9M实绩 $12.35B 含 $2.8B WBD违约金 + Q4指引 $2.79B）' },
 { lbl: '自由现金流', val: 12.0, base: 0, col: pal.green, tip: 'FY2026E 自由现金流指引 ~$12.0B（较 FY25 $9.46B 大增 +26.8%，物理 CapEx 仅 ~1.8%）' }
 ];
 var maxV = 56;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length;
 var barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(5, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6);
 ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.base > 0 ? '+' : '') + '$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var omArr = [20.9, 17.8, 20.6, 26.7, 29.5, 31.5];
 var fcfPct = [0.0, 5.1, 20.5, 17.7, 20.9, 23.5];
 var minM = 0, maxM = 38;
 for (var m = 0; m <= 4; m++) {
 var mv = ((maxM - minM) / 4) * m;
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
 if (idx === yrs.length - 1 || idx === 1) {
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
 plotLine(omArr, pal.blue, '营业利润率 Operating Margin');
 plotLine(fcfPct, pal.green, '自由现金流利润率 FCF Margin');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 22, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'regions') {
 var qLbls = ['Q3\'25', 'Q4\'25', 'Q1\'26', 'Q2\'26', 'Q3\'26'];
 var ucan = [5.07, 5.34, 5.25, 5.43, 5.63];
 var emea = [3.70, 3.87, 4.00, 4.03, 4.11];
 var latam = [1.37, 1.42, 1.50, 1.58, 1.60];
 var apac = [1.37, 1.42, 1.51, 1.51, 1.54];
 var maxR = 6.2;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxR / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
 }
 function drawCurve(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (qLbls.length - 1)) * pw;
 var py = pad.top + ph - (v / maxR) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (qLbls.length - 1)) * pw;
 var py = pad.top + ph - (v / maxR) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 if (idx === 4 && (label.indexOf('UCAN') !== -1 || label.indexOf('EMEA') !== -1 || label.indexOf('LATAM') !== -1)) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + v.toFixed(2) + 'B', px - 6, py - 7);
 }
 hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: qLbls[idx] + ' · ' + label, body: '单季净营收: $' + v.toFixed(2) + 'B' });
 });
 }
 qLbls.forEach(function (lb, idx) {
 var px = pad.left + (idx / (qLbls.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 });
 drawCurve(ucan, pal.blue, 'UCAN 北美区');
 drawCurve(emea, pal.violet, 'EMEA 欧洲中东非');
 drawCurve(latam, pal.green, 'LATAM 拉丁美洲');
 drawCurve(apac, pal.amber, 'APAC 亚太区');
 } else {
 var peers = [
 { name: 'Netflix (Q3\'26)', mgn: 34.6, col: pal.green, tip: 'Q3 2026 实际营业利润率达 34.6%（创历史最高纪录）' },
 { name: 'Netflix (FY26E)', mgn: 31.5, col: pal.blue, tip: 'FY2026 全年营业利润率指引 31.5%（较 FY25 +200bps）' },
 { name: 'Spotify (Q4\'25)', mgn: 15.5, col: pal.violet, tip: 'Spotify Q4 2025 营业利润率 15.5%（受制于唱片公司版税分成）' },
 { name: 'Disney DTC (FY26E)', mgn: 10.0, col: pal.amber, tip: '迪士尼 FY2026 娱乐流媒体 SVOD 营业利润率目标 10.0%' }
 ];
 var maxP = 40;
 for (var k = 0; k <= 4; k++) {
 var kv = k * 10;
 var ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 var slot = pw / peers.length, bw = Math.min(46, slot * 0.56);
 peers.forEach(function (p, idx) {
 var x = pad.left + idx * slot + (slot - bw) / 2;
 var bh = (p.mgn / maxP) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(p.mgn.toFixed(1) + '%', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name, body: p.tip });
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

 if (state.kView === 'fcf') {
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var fcf = [1.62, 6.93, 6.92, 9.46, 12.00];
 var maxF = 14.0;
 for (var g = 0; g <= 4; g++) {
 var fv = (maxF / 4) * g;
 var fy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, fy); ctx.lineTo(pad.left + pw, fy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + fv.toFixed(1) + 'B', pad.left - 8, fy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(44, slot * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (fcf[i] / maxF) * ph, yTop = pad.top + ph - bh;
 ctx.fillStyle = (i >= 3) ? pal.green : pal.blue;
 roundRect(ctx, x, yTop, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + fcf[i].toFixed(2) + 'B', x + bw / 2, yTop - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yTop, w: bw, h: bh, title: y + ' 年度自由现金流', body: 'Free Cash Flow: $' + fcf[i].toFixed(2) + 'B（~1.1x 内容投入/摊销纪律驱动爆发）' });
 });
 } else {
 var qs = ['Q3\'25', 'Q4\'25', 'Q1\'26', 'Q2\'26', 'Q3\'26'];
 var sh = [4340, 4317, 4298, 4261, 4195];
 var minS = 4050, maxS = 4400;
 for (var m = 0; m <= 4; m++) {
 var sv = minS + ((maxS - minS) / 4) * m;
 var sy = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText((sv / 1000).toFixed(2) + 'B', pad.left - 6, sy + 4);
 }
 var sW = pw / qs.length, bW = Math.min(42, sW * 0.56);
 qs.forEach(function (q, idx) {
 var x = pad.left + idx * sW + (sW - bW) / 2;
 var bh = ((sh[idx] - minS) / (maxS - minS)) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = idx === 4 ? pal.green : pal.violet;
 roundRect(ctx, x, yt, bW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(sh[idx] + 'M', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
 ctx.fillText(q, x + bW / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bW, h: bh, title: q + ' 拆股调整后稀释股本', body: sh[idx] + 'M 股（Q3\'26 单季回购 $4.80B 注销 63.9M 股，同比净缩股 -3.34%）' });
 });
 }
 }

 // 5. Interactive 5-Year EPS & Margin Simulator
 var simData = { eps: [3.23, 3.82, 4.46, 5.18, 6.00, 6.92] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 44 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var arr = simData.eps;
 var maxE = Math.max(8, Math.ceil(Math.max.apply(null, arr) * 1.15));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw;
 var py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
 ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
 ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }

 function runSimulator() {
 var gSub = parseFloat(document.getElementById('inpSubCagr').value) / 100;
 var gAd = parseFloat(document.getElementById('inpAdCagr').value) / 100;
 var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblSubCagr').textContent = (gSub * 100).toFixed(1) + '%';
 document.getElementById('lblAdCagr').textContent = (gAd * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

 // Normalized core FY26E operating baseline (ex one-time WBD breakup fee): $51.1B rev ($48.4B SVOD + $2.7B Ads), 31.5% OI ($16.1B), ~4.22B avg diluted shares -> ~$3.18 core EPS
 var subRev = 48.4, adRev = 2.7, shares = 4.20;
 var baseEps = 3.18;
 var epsArr = [baseEps];
 var lastOm = 31.5;
 for (var y = 1; y <= 5; y++) {
 subRev *= (1 + gSub);
 adRev *= (1 + gAd);
 shares *= (1 - buy);
 var totR = subRev + adRev;
 // Fixed-cost leverage + high-margin ad mix expands operating margin bounded reasonably
 var adShare = adRev / totR;
 lastOm = Math.min(42.5, 31.5 + y * (gSub * 9.5) + (adShare - 0.053) * 38);
 var oi = totR * (lastOm / 100);
 var netCore = (oi - 0.55) * 0.84;
 epsArr.push(Math.max(0.5, netCore / shares));
 }
 var fy31Rev = subRev + adRev;
 var fy31Eps = epsArr[5];
 var epsCagr = (Math.pow(fy31Eps / baseEps, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '$' + fy31Rev.toFixed(1) + 'B';
 document.getElementById('simOmOut').textContent = lastOm.toFixed(1) + '%';
 document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
 document.getElementById('simCagrOut').textContent = (epsCagr >= 0 ? '+' : '') + epsCagr.toFixed(1) + '%';
 simData.eps = epsArr;
 drawSimMiniCanvas();
 }

 ['inpSubCagr', 'inpAdCagr', 'inpBuyRate'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { sub: 5.5, ad: 18.0, b: 1.6 },
 base: { sub: 9.5, ad: 32.0, b: 2.8 },
 bull: { sub: 12.0, ad: 40.0, b: 3.6 }
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
 document.getElementById('inpSubCagr').value = pr.sub;
 document.getElementById('inpAdCagr').value = pr.ad;
 document.getElementById('inpBuyRate').value = pr.b;
 runSimulator();
 });
 }

 function bindChartTab(groupId, attr, stateKey, drawFn) {
 var g = document.getElementById(groupId);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
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
 var c = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect();
 var mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var list = hitRegions[canvasId] || [];
 var hit = null;
 for (var i = 0; i < list.length; i++) {
 var rg = list[i];
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
 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

 function drawAllCharts() {
 drawProfitCanvas();
 drawCohortCanvas();
 drawCapitalCanvas();
 drawSimMiniCanvas();
 }

 // Quick Jump Search (⌘K)
 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'FY26E $51.1B 营收 · 31.5% 营业利润率 · 固定成本摊薄杠杆' },
 { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '本土原创 → Open Connect CDN → 三档订阅 → Ads Suite → 缩股' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四层变现阶梯', s: 'Q3 34.6% 创纪录营业利润率 · 2.5亿+月活广告观众' },
 { id: 'mod-cohort', t: 'M3 全球四区飞轮与行业利润率统治度', s: 'UCAN / EMEA / LATAM / APAC 营收与对比迪士尼 10% 利润率' },
 { id: 'mod-capital', t: 'M4 ~1.1x 内容现金纪律与回购推演器', s: 'FY26E ~$12.0B FCF · Q3 单季回购 $4.80B · 5年 EPS 模拟' },
 { id: 'mod-matrix', t: 'M5 全球流媒体与科技巨头对标及压测', s: 'NFLX vs YouTube / Disney / Spotify / WBD 及三大风险审计' }
 ];
 var qInput = document.getElementById('quickJumpInput');
 var qPop = document.getElementById('quickJumpPopover');
 function renderQuick(q) {
 if (!qPop) return;
 var kw = (q || '').trim().toLowerCase();
 var matched = QUICK_ITEMS.filter(function (it) {
 return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1;
 });
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
 document.addEventListener('click', function (e) {
 if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open');
 });
 }
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
 e.preventDefault();
 if (qInput) qInput.focus();
 }
 if (e.key === 'Escape') {
 if (qPop) qPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 // Sidebar Collapse (Desktop) & Drawer (Mobile) + Export/Print
 var sbBtn = document.getElementById('sidebarToggleBtn');
 var sb = document.getElementById('muiSidebar');
 var bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
 setTimeout(drawAllCharts, 60);
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

 var resizeTimer = null;
 window.addEventListener('resize', function () {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(drawAllCharts, 90);
 });

 runSimulator();
 drawAllCharts();
 })();
 