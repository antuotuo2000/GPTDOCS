
 (function () {
 'use strict';

 var EXPORT_FILENAME = 'Chewy公司商业模式解构.html';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_STRESS_KEY = 'chwy_bm_stress_v1';

 var state = {
 theme: 'dark',
 lang: 'zh',
 pView: 'waterfall',
 cView: 'nspac',
 kView: 'shares'
 };

 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

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
 var lBtn = document.getElementById('sideThemeLightBtn');
 var dBtn = document.getElementById('sideThemeDarkBtn');
 if (lBtn) lBtn.classList.toggle('active', state.theme === 'light');
 if (dBtn) dBtn.classList.toggle('active', state.theme === 'dark');
 drawAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色护眼模式' : '已切换至 MUI 浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn');
 var enB = document.getElementById('langEnBtn');
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

 // Suite Hub Filter & Navigation Toast
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
 if (f === EXPORT_FILENAME) {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 } else {
 showToast('套件关联页：《' + f + '》— 请在聊天交付列表中打开或下载');
 }
 }
 });
 }

 // 1. Command Deck 3-Lens Switcher
 var LENSES = [
 {
 formula: '单宠主 10–15 年 LTV = 首年口粮获客回本 + ∑ [存续年限 × ($602→$950+ NSPAC) × 30.4% 毛利率] - 极低次年留存营销费',
 body: '普通综合电商面对一次性冲动消费，必须为每一单重复支付流量买量税；而宠物的进食与驱虫具备天然刚性生理周期，Chewy 一旦通过首单 5% 折扣将宠主导入 <strong>Autoship（占净营收 84.6%）</strong>，便获得了全美零售业罕见的<strong>高可预测性经常性现金流</strong>，大幅压缩安全库存损耗与派送路线空驶率。'
 },
 {
 formula: '综合毛利率破顶 (30.4%) = 刚需口粮底座 (69.7%权重) + 宠物药房/诊所 (15.7%权重) + Chewy Ads 零售媒体 (~70%+毛利率)',
 body: '单纯卖大包狗粮天花板约在 24%–25% 毛利率；Chewy 的破局在于<strong>“把重货物流变成零获客成本的医疗与广告入口”</strong>——当 2,171 万宠主每月固定收货时，顺带在 Chewy 药房续配高毛利心丝虫/皮肤科处方药，同时品牌商竞价购买 Chewy Max 广告位，推动毛利率较 IPO 前劲升逾 1,200 bps。'
 },
 {
 formula: '自由现金流转化 (78.2% × Adj. EBITDA) = 1.03% 极致轻 CapEx + (-8.3天负CCC供应商浮存) → 累计回购注销 >$16亿股票',
 body: 'Chewy 在顾客发货瞬间刷卡收款（DSO 仅 6.4 天），却在 ~50.4 天后才向供应商结算货款（应付账款 $12.21亿 > 库存 $8.65亿），形成逾 <strong>$11.45亿无息营运资本浮存</strong>；配合自动化履约中心摊薄人工，公司用源源不断的自由现金流持续回购并消化私募大股东 BC Partners 减持筹码。'
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
 badge: 'NODE 01 · 24/7 EMPATHY ONBOARDING & PET PROFILES',
 title: '把“宠物拟人化情感”沉淀为第一方宠物健康档案：综合电商无法复制的温度壁垒',
 desc: '亚马逊擅长标准化极速派送，但面对宠主咨询处方粮过敏、老年犬关节护理或爱宠离世退款时缺乏专业共情。Chewy 全年 365 天 24/7 真人客服几乎全部在 10 秒内接听，每年寄出数百万张手写节日卡与定制手绘宠物肖像油画（WOW Moments），同步引导用户建立包含品种、体重、生日与病史的精准 Pet Profile 第一方档案。',
 formula: '商业传导：极致情感信任 + 约 4,000 个合作品牌 / 19万+ SKU 一站式供给 → 口碑裂变降低获客成本，锁定 2,170.5 万高粘性活跃宠主',
 kpis: [['21.71M', 'Q2 FY26 活跃客户数 (+3.8%)'], ['~190,000', '在线商品与医疗服务 SKU'], ['<10 秒', '3座客服中心真人响应标准'], ['~30%', 'AI 助手 Cai 自助分流对话占比']]
 },
 {
 badge: 'NODE 02 · AUTOSHIP RECURRING ENGINE & CHEWY+ MEMBERSHIP',
 title: 'Autoship 自动续订 + $59/年 Chewy+ 双层锁客：把零售生意做成公用事业年金',
 desc: '搬运 40 磅猫砂与大袋狗粮上楼是北美养宠家庭最大的线下痛点。Chewy 以“首单立减 + 5% 常态续订折扣 + 随时弹性改期”消除订阅心理门槛，使 Q2 FY26 Autoship 销售额同比大增 +9.3% 至 $28.17亿（占净营收高达 84.6%）；2026 年进一步将付费会员 Chewy+ 年费优化至 $59/年（提供 5% 返现、零门槛包邮与线上问诊），强力归拢中腰部宠主钱包份额。',
 formula: '商业传导：84.6% 订单提前锁定排期 → 需求预测精度远超普通电商 → 降低滞销损耗并拉升 NSPAC 至创纪录 $602',
 kpis: [['84.6%', 'Q2 FY26 Autoship 占净营收比'], ['$10.50B', 'FY25 全年 Autoship 净销售额'], ['$602', 'Q2 FY26 单活跃客户年消费'], ['$59 / 年', 'Chewy+ 5%返现免邮付费会籍']]
 },
 {
 badge: 'NODE 03 · 17 FULFILLMENT CENTERS & ROBOTIC AFC NETWORK',
 title: '重货自动化履约革命：员工总数缩减 15.5%，支撑营收逆势扩张逾 40%',
 desc: '重袋宠物粮体积大、重量沉，传统人工拣选极易遭遇工资通胀与工伤瓶颈。CEO Sumit Singh 自 2020 年起主导建设新一代自动化履约中心（AFC），引入自动导引车与智能合单算法减少拆包分箱：全公司员工数由 FY21 峰值 21,300 人精简稳定至 FY25 的 18,000 人，人均年创收则由 $41.7万 飙升至 $70.0万（FY26E 迈向 ~$74万+）。',
 formula: '商业传导：AFC 固定成本规模摊薄 + 合单减少包裹拆分 → 抵消快递费率上涨，推动 1H FY26 营业利润同比跃升 +50.4%',
 kpis: [['17 座', '全美现代化履约中心网络'], ['18,000人', 'FY25 员工总数 (较峰值 -15.5%)'], ['$700K', 'FY25 人均年创收 (+68% vs FY21)'], ['6.5%', 'FY25 营销费用占营收稳态比']]
 },
 {
 badge: 'NODE 04 · PET PHARMACY, VET CLINICS & RETAIL MEDIA',
 title: '高毛利三级火箭：全美第1宠物药房 × 47家兽医诊所 × Chewy Max 广告变现',
 desc: '在稳固口粮流量盘后，Chewy 向价值链高毛利顶端延伸：(1) 宠物健康与特护板块 FY25 创收 $19.81亿（占比 15.7%），涵盖处方药、定制配制药及 $1.75亿收购的马匹营养龙头 SmartEquine；(2) $4.0亿现金收购 Modern Animal 使自营兽医诊所由 18 家跃升至 47 家，实现处方内循环；(3) Chewy Ads 凭 15 年第一方数据实现 >$7 LTV ROAS，直接增厚纯利。',
 formula: '商业传导：口粮高频触达 → 零获客成本交叉销售处方药/诊所服务 + 品牌广告竞价 → 推动 Adjusted EBITDA 率由 0.9% 跃升至 6.8%',
 kpis: [['$1.98B', 'FY25 宠物医疗健康板块营收'], ['47 家', '并购 Modern Animal 后全国诊所数'], ['>$7 ROAS', 'Chewy Ads 每 $1 投放贡献 LTV'], ['10.0%', '长期目标 Adjusted EBITDA 利润率']]
 },
 {
 badge: 'NODE 05 · NEGATIVE WORKING CAPITAL & SHARE RETIREMENT',
 title: '负营运资本浮存金 + 逾 $16亿 回购注销：有序化解私募大股东筹码压制',
 desc: '依托 Autoship 极高周转确定性与对上游品牌商约 50.4 天的应付账款账期，Chewy 常年以供应商账款覆盖全部库存（FY25 应付账款 $12.21亿 vs 存货 $8.65亿），在仅 1.03% 极低 CapEx 下将利润高比例转化为自由现金流（FY25 $5.62亿）。公司果断利用充沛现金流在公开市场及向控股股东 BC Partners 定向回购注销股票，持续增厚每股内在价值。',
 formula: '商业传导：$5.62亿 FCF + 新增 $5亿回购授权 → 累计回购超 $16亿 → 摊薄股本由 4.32亿股降至 4.101亿股 (-5.1%)',
 kpis: [['-8.3天', '贸易现金转换周期 (上游浮存)'], ['$562.4M', 'FY25 创纪录自由现金流 (+24.3%)'], ['>$1.60B', 'FY24–1H26 累计股票回购总额'], ['410.1M', 'Q2 FY26 加权摊薄流通股数']]
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

 // 3. Tier Filter, Cohort Switcher & Peer Filter
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
 new: {
 stats: [
 ['典型消费组合', '首袋主粮 + 猫砂/玩具试单', '首单促销券与搜索广告引流'],
 ['年度单客净消费 (NSPAC)', '~$240–$320', '尚未完全迁移线下药房与多品类'],
 ['综合贡献毛利率', '~26.5%', '受首单 Autoship 迎新折扣摊薄'],
 ['首年净经济贡献', '近盈亏平衡', '扣除 ~$38–$45 获客营销费后快速打平']
 ],
 note: '<strong>首年获客培育层特征：</strong>新晋宠主首年往往先将最笨重的主粮或猫砂转至 Chewy，首年贡献利润主要用于覆盖获客广告费（A&M 占全公司营收 6.5%）；核心运营动作是在前 90 天内引导其建立完整 Pet Profile 并留存在 Autoship 队列中。'
 },
 autoship: {
 stats: [
 ['典型消费组合', '主粮 Autoship + 驱虫处方药 + 零食用品', '跨 3+ 品类高频自动履约'],
 ['年度单客净消费 (NSPAC)', '~$680–$750', '显著高于全平台均值 $602'],
 ['综合贡献毛利率', '~31.5%', '药房与自有品牌拉升毛利'],
 ['5年累计单客毛利 LTV', '~$960', '首年获客投入在 10–14 个月内回本']
 ],
 note: '<strong>老龄化生物棘轮效应（Biological Aging Ratchet）：</strong>不同于电子产品换机周期可能延后，犬猫从幼年期迈入 7 岁+ 老年期的过程中，慢性肾病处方粮、关节保健品与长期处方药开销呈<strong>不可逆刚性递增</strong>——宠主留存越久，Chewy 单客 NSPAC 与药房高毛利附着率自然越高。'
 },
 health: {
 stats: [
 ['典型消费组合', 'Vet Care/Modern Animal 诊所 + 定制药 + Chewy+ + 全家桶口粮', '线上线下医疗与零售全闭环'],
 ['年度单客净消费 (NSPAC)', '$1,100+ / 年', '诊所会员带动商城 NSPAC 额外跃升 15%–20%'],
 ['综合贡献毛利率', '~36.0%+', '高毛利诊疗、配制药与会员复购共振'],
 ['5年累计单客毛利 LTV', '$2,150+', '流失率极低的终身年金型黄金家庭户']
 ],
 note: '<strong>全生态医疗超级会员层：</strong>当宠主在 Chewy Vet Care 或 Modern Animal 建立电子病历并开通 $59/年 Chewy+ 后，兽医开具的每一张电子处方直接无缝流转至 Chewy Pharmacy 自动寄送到家，彻底封死综合电商与传统社区诊所的分流空间。'
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
 var c = COHORTS[key] || COHORTS.autoship;
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
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: 'Autoship营收', val: 10.50, base: 0, col: pal.blue, tip: 'FY2025 Autoship 客户销售额: $10,497.1M (占总净营收 83.3%，同比 +11.8%)' },
 { lbl: '+非订阅营收', val: 2.10, base: 10.50, col: pal.green, tip: '单次点购、礼品与新兴服务贡献 $2,104.4M，合计总净营收 $12,601.5M' },
 { lbl: '=综合毛利', val: 3.75, base: 0, col: pal.violet, tip: 'FY2025 毛利润: $3,753.9M (毛利率 29.8%，同比扩张 +60bps；Q2 FY26 进一步升至 30.4%)' },
 { lbl: 'Adj.EBITDA', val: 0.72, base: 0, col: pal.blue, tip: 'FY2025 Adjusted EBITDA: $719.2M (+26.1% YoY，利润率 5.7%；FY26E 指引升至 ~$912M)' },
 { lbl: '调整后净利', val: 0.54, base: 0, col: pal.amber, tip: 'FY2025 Adjusted Net Income: $540.5M (+21.0% YoY；GAAP 净利润 $222.8M)' },
 { lbl: '自由现金流', val: 0.56, base: 0, col: pal.green, tip: 'FY2025 创纪录自由现金流: $562.4M (+24.3% YoY)，OCF $691.6M - CapEx $129.2M' }
 ];
 var maxV = 14.0;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length;
 var barW = Math.min(48, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
 var yBot = pad.top + ph - (s.base / maxV) * ph;
 var bh = Math.max(6, yBot - yTop);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yTop, barW, bh, 6);
 ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 var valTxt = s.val >= 1.0 ? ('$' + s.val.toFixed(2) + 'B') : ('$' + Math.round(s.val * 1000) + 'M');
 ctx.fillText(valTxt, x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', '1H26'];
 var gmArr = [26.7, 28.0, 28.4, 29.2, 29.8, 30.2];
 var ebArr = [0.9, 3.0, 3.3, 4.8, 5.7, 7.2];
 var maxM = 35;
 for (var m = 0; m <= 5; m++) {
 var mv = m * 7;
 var my = pad.top + ph - (mv / maxM) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv + '%', pad.left - 8, my + 4);
 }
 function plotLine(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 var py = pad.top + ph - (v / maxM) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 var py = pad.top + ph - (v / maxM) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 9);
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / (yrs.length - 1)) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotLine(gmArr, pal.blue, '综合毛利率 Gross Margin');
 plotLine(ebArr, pal.green, '调整后 EBITDA 利润率');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 24, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'nspac') {
 var xLbls = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'Q2 FY26'];
 var nspac = [430, 495, 555, 578, 591, 602];
 var autoPct = [70.2, 73.3, 76.2, 79.2, 83.3, 84.6];
 var minN = 350, maxN = 660;
 for (var g = 0; g <= 4; g++) {
 var gv = minN + ((maxN - minN) / 4) * g;
 var gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + Math.round(gv), pad.left - 8, gy + 4);
 }
 var slot = pw / xLbls.length, bw = Math.min(38, slot * 0.52);
 xLbls.forEach(function (lb, idx) {
 var x = pad.left + idx * slot + (slot - bw) / 2;
 var bh = ((nspac[idx] - minN) / (maxN - minN)) * ph;
 var yt = pad.top + ph - bh;
 ctx.fillStyle = idx === 5 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + nspac[idx], x + bw / 2, yt - 6);
 ctx.fillStyle = pal.violet; ctx.font = 'bold 9.5px "IBM Plex Mono", monospace';
 ctx.fillText(autoPct[idx] + '%', x + bw / 2, yt + 14);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(lb, x + bw / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({
 x: x, y: yt, w: bw, h: bh,
 title: lb + ' 客户钱包深度',
 body: '单活跃客户年消费 NSPAC: $' + nspac[idx] + ' · Autoship 营收占比: ' + autoPct[idx] + '%'
 });
 });
 } else {
 var brands = [
 { name: 'Chewy.com', share: 38.3, col: pal.blue, tip: '全美宠物零售搜索点击份额第一 (38.33%)，深度垄断高意向垂类流量' },
 { name: 'Petco.com', share: 15.4, col: pal.violet, tip: '线下门店导流线上，占比 15.36%' },
 { name: 'PetSmart.com', share: 6.1, col: pal.green, tip: '前母公司线上平台，占比 6.14%' },
 { name: 'Walmart / 其他垂类', share: 8.5, col: pal.amber, tip: 'Walmart (3.16%) + PetSuppliesPlus (2.68%) + TheFarmer\'sDog 等合计' }
 ];
 var maxS = 45;
 for (var k = 0; k <= 3; k++) {
 var kv = k * 15;
 var ky = pad.top + ph - (kv / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(kv + '%', pad.left - 8, ky + 4);
 }
 var sSlot = pw / brands.length, sBw = Math.min(48, sSlot * 0.56);
 brands.forEach(function (b, idx) {
 var x = pad.left + idx * sSlot + (sSlot - sBw) / 2;
 var bh = (b.share / maxS) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = b.col;
 roundRect(ctx, x, yt, sBw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(b.share.toFixed(1) + '%', x + sBw / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(b.name, x + sBw / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: x, y: yt, w: sBw, h: bh, title: b.name + ' (Adthena Oct 2026)', body: b.tip });
 });
 }
 }

 function drawCapitalCanvas() {
 var env = prepCanvas('capitalCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.kView === 'shares') {
 var periods = ['FY23末', 'FY24末', 'FY25末', 'Q1 FY26', 'Q2 FY26'];
 var dilSh = [432.0, 431.0, 425.8, 419.1, 410.1];
 var classB = [298.9, 219.7, 176.5, 176.5, 176.5];
 var maxSh = 460;
 for (var g = 0; g <= 4; g++) {
 var sv = (maxSh / 4) * g;
 var sy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(Math.round(sv) + 'M', pad.left - 8, sy + 4);
 }
 var slot = pw / periods.length, bw = 26;
 periods.forEach(function (p, i) {
 var cx = pad.left + i * slot + slot / 2;
 var h1 = (dilSh[i] / maxSh) * ph, h2 = (classB[i] / maxSh) * ph;
 ctx.fillStyle = pal.blue;
 roundRect(ctx, cx - bw - 3, pad.top + ph - h1, bw, h1, 5); ctx.fill();
 ctx.fillStyle = pal.violet;
 roundRect(ctx, cx + 3, pad.top + ph - h2, bw, h2, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(dilSh[i].toFixed(0) + 'M', cx - bw / 2 - 3, pad.top + ph - h1 - 6);
 ctx.fillText(classB[i].toFixed(0) + 'M', cx + bw / 2 + 3, pad.top + ph - h2 - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(p, cx, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({
 x: cx - bw - 5, y: pad.top, w: bw * 2 + 10, h: ph,
 title: p + ' 股本与治理优化',
 body: '加权摊薄总股本: ' + dilSh[i].toFixed(1) + 'M 股 · BC Partners B类股余额: ' + classB[i].toFixed(1) + 'M 股'
 });
 });
 } else {
 var items = [
 { name: 'Chewy (CHWY)', ccc: -8.3, col: pal.green, tip: 'DIO ~35.7天 + DSO ~6.4天 - DPO ~50.4天 = -8.3天（应付账款 $1.22B 大于库存 $0.86B）' },
 { name: 'Costco (COST)', ccc: -4.0, col: pal.blue, tip: '会员制仓店高周转标杆：先收现款再结供应商货款' },
 { name: 'Petco (WOOF)', ccc: 24.0, col: pal.amber, tip: '1,500家线下门店需铺货大量长尾硬品库存，占用营运资金' },
 { name: '传统专营宠物店', ccc: 48.0, col: pal.violet, tip: '周转缓慢且账期议价权弱，扩张期现金流承压' }
 ];
 var zeroX = pad.left + pw * 0.36;
 ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(zeroX, pad.top); ctx.lineTo(zeroX, pad.top + ph); ctx.stroke();
 var rowH = ph / items.length;
 items.forEach(function (it, idx) {
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 24;
 var scale = (pw * 0.54) / 55;
 var barLen = Math.max(8, Math.abs(it.ccc) * scale);
 var bx = it.ccc < 0 ? (zeroX - barLen) : zeroX;
 ctx.fillStyle = it.col;
 roundRect(ctx, bx, cy - bh / 2, barLen, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
 ctx.textAlign = it.ccc < 0 ? 'right' : 'left';
 ctx.fillText((it.ccc > 0 ? '+' : '') + it.ccc + ' 天', it.ccc < 0 ? bx - 6 : bx + barLen + 6, cy + 4);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.name, pad.left, cy - 16);
 hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 20, w: pw, h: 40, title: it.name + ' 现金转换周期', body: it.tip });
 });
 }
 }

 // 5. Interactive 5-Year EBITDA & FCF/Share Compounder
 var simData = { fcfPerSh: [1.70, 2.08, 2.52, 3.04, 3.63, 4.31] };
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var arr = simData.fcfPerSh;
 var maxE = Math.max(4.5, Math.ceil(Math.max.apply(null, arr) * 1.18));
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
 var gSales = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
 var targetEbMargin = parseFloat(document.getElementById('inpProdCagr').value) / 100;
 var buyRate = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblSvcCagr').textContent = (gSales * 100).toFixed(1) + '%';
 document.getElementById('lblProdCagr').textContent = (targetEbMargin * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = (buyRate * 100).toFixed(1) + '%';

 // FY26E baseline: $13.52B sales, 6.75% Adj. EBITDA margin (~$912M), ~76.5% FCF conversion (~$698M), 410.1M shares -> ~$1.70 FCF/sh
 var sales = 13.52;
 var startM = 0.0675;
 var shares = 0.4101; // in billions
 var fcfConv = 0.765;
 var baseFcfSh = (sales * startM * fcfConv) / shares;
 var arr = [baseFcfSh];
 for (var y = 1; y <= 5; y++) {
 sales *= (1 + gSales);
 shares *= (1 - buyRate);
 var curM = startM + ((targetEbMargin - startM) * (y / 5));
 var eb = sales * curM;
 var fcf = eb * fcfConv;
 arr.push(fcf / shares);
 }
 var fy31Eb = sales * targetEbMargin;
 var fy31FcfSh = arr[5];
 var cagr = (Math.pow(fy31FcfSh / baseFcfSh, 0.2) - 1) * 100;

 document.getElementById('simRevOut').textContent = '$' + sales.toFixed(1) + 'B';
 document.getElementById('simGmOut').textContent = '$' + fy31Eb.toFixed(2) + 'B';
 document.getElementById('simEpsOut').textContent = '$' + fy31FcfSh.toFixed(2);
 document.getElementById('simCagrOut').textContent = (cagr >= 0 ? '+' : '') + cagr.toFixed(1) + '%';
 simData.fcfPerSh = arr;
 drawSimMiniCanvas();
 }

 ['inpSvcCagr', 'inpProdCagr', 'inpBuyRate'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', runSimulator);
 });

 var PRESETS = {
 bear: { s: 4.5, m: 7.5, b: 1.5 },
 base: { s: 7.5, m: 10.0, b: 3.0 },
 bull: { s: 10.0, m: 11.5, b: 4.0 }
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
 document.getElementById('inpSvcCagr').value = pr.s;
 document.getElementById('inpProdCagr').value = pr.m;
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
 tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
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
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$12.60B 营收 · 84.6% Autoship · NSPAC $602' },
 { id: 'mod-pipeline', t: 'M1 五阶宠物生态价值传导沙盘', s: '24/7情感客服 → Autoship → AFC机器人 → 药房/广告 → 缩股' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与高毛利四引擎', s: 'Chewy Ads >$7 ROAS · 药房 $1.98B · 47家兽医诊所' },
 { id: 'mod-cohort', t: 'M3 宠物老龄化棘轮与 NSPAC 阶梯', s: 'Y1新客 vs Autoship户 vs 医疗超级会员 · 38.3% 垂类流量份额' },
 { id: 'mod-capital', t: 'M4 -8.3天负营运资本与回购推演器', s: '累计回购 >$1.6B · 迈向 10% EBITDA 率每股 FCF 模拟' },
 { id: 'mod-matrix', t: 'M5 零售巨头对标矩阵与三大压测', s: 'CHWY vs AMZN / COST / WOOF / ZTS · 诊所与B类股压测' }
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

 // Sidebar Toggle, Export, Print & Scroll Spy
 var sbBtn = document.getElementById('sidebarToggleBtn');
 var sb = document.getElementById('muiSidebar');
 var bd = document.getElementById('drawerBackdrop');
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
 setTimeout(drawAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () {
 sb.classList.remove('open');
 bd.classList.remove('open');
 });
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
 var initT = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
 applyTheme(initT, true);
 var initL = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
 applyLang(initL, true);
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

 var resizeTimer = null;
 window.addEventListener('resize', function () {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(drawAllCharts, 90);
 });

 runSimulator();
 drawAllCharts();
 })();
 