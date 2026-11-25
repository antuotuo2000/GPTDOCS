
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_tsla_culture_checks_v1';

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 第一性原理与白痴指数）：</strong>当年供应商对电池组与高压线束漫天要价时，特斯拉按钴、镍、铝、碳等大宗原材料物理底价重算成本，自研电芯模组与 48V 低压架构（将车内铜线重量骤减逾 70%） <a class="cite-link" href="https://fasterthannormal.co/people/elon-musk" target="_blank" rel="noopener noreferrer">第一性原理案例 ↗</a>。',
 '<strong>当前选中支柱解读（02 五步工程算法）：</strong>马斯克反复告诫工程师：“最常犯的错误就是去优化一个本来根本不该存在的零件。”每条要求必须追查到提出它的具体个人姓名，而不是归咎于模糊的法务部或质检部 <a class="cite-link" href="https://digitalmag.theceomagazine.com/your-ai-doesnt-know-who-you-are/" target="_blank" rel="noopener noreferrer">算法成文化 ↗</a>。',
 '<strong>当前选中支柱解读（03 越级沟通铁律）：</strong>在传统车企，底盘工程师找座舱软件工程师改接口需跨越两边各三级领导签字；在特斯拉，一线工程师直接拉群改代码，无常设 COO 架构确保 CEO 直插一线限制因子 <a class="cite-link" href="https://creately.com/org-chart/fortune-500/tesla/" target="_blank" rel="noopener noreferrer">扁平汇报图 ↗</a>。',
 '<strong>当前选中支柱解读（04 战时紧迫感与全员期权）：</strong>从产线技术员到核心 AI 科学家普遍享有股票激励与 ESPP 购股计划，CEO 更坚持 $0 现金工资、100% 绑定长周期市值与 EBITDA 里程碑 <a class="cite-link" href="https://www.stocktitan.net/sec-filings/TSLA/10-k-a-tesla-inc-amends-annual-report-3615ff64a985.html" target="_blank" rel="noopener noreferrer">激励对齐 ↗</a>。'
 ];

 var PEER_ROWS = [
 {
 category: 'tech',
 benchmark: true,
 company: '研究基准：特斯拉 (Tesla · TSLA)',
 leader: '埃隆·马斯克 (Elon Musk) / 朱晓彤 / Elluswamy',
 positioning: '无常设 COO 超扁平职能制 + 软硬制造全栈耦合',
 culture: '第一性原理 + 五步工程算法 + 越级直通 + 零底薪对赌',
 headcount: '134,785人 · 单人净利 $28,149 (TTM人效 ~$768K)',
 margins: 'TTM 营收 $1,036亿 · Q3毛利 19.6% (储能 33.1%) · 现金 $454.5亿',
 verdict: '重工业里的硅谷特种部队：把整车、储能与人形机器人拉通在同一套电芯、芯片与视觉神经网络上高速迭代。',
 sourceLabel: 'SEC FY25 10-K / Q3\'26',
 sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm'
 },
 {
 category: 'tech',
 benchmark: false,
 company: '英伟达 (NVIDIA · NVDA)',
 leader: '黄仁勋 (Jensen Huang)',
 positioning: '超扁平蛛网架构 (~60高管直报 CEO) + Fabless 台积电代工',
 culture: '无事业部利润墙 + Top-5 邮件全透明广播 + 光速执行',
 headcount: '~42,000人 (74%研发) · 人均创收 $5.14M',
 margins: 'FY26 营收 $2,159亿 · GAAP 毛利率 71.1% · 净利 $1,201亿',
 verdict: '组织灵魂最相似的算力盟友：同样拒绝中层官僚与事业部藩篱；区别在于英伟达轻晶圆制造，特斯拉重度自建超级工厂。',
 sourceLabel: 'NVIDIA FY26 Stats',
 sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'auto',
 benchmark: false,
 company: '比亚迪 (BYD · 1211.HK)',
 leader: '王传福 (Wang Chuanfu)',
 positioning: '多品牌事业部矩阵 + 电池/电机/半导体 75% 垂直自供',
 culture: '工程师人海战术 + 极致成本制造纪律 + 模具自研',
 headcount: '102万+ 员工 · 单人净利 ~$5,346',
 margins: 'FY25 营收 RMB 8,470亿 (~$1,180亿) · 9M\'26 毛利率 18.5%',
 verdict: '垂直整合制造的东方镜像：比亚迪靠十余万工程师矩阵与百万产业工人实现极致BOM成本，特斯拉靠极简SKU与算法自动化实现 5.3 倍单人净利。',
 sourceLabel: 'MarkLines / Assembly',
 sourceUrl: 'https://www.assemblymag.com/articles/100196-toyota-tesla-and-byd-rank-among-worlds-best-for-revenue-and-profit-per-employee'
 },
 {
 category: 'auto',
 benchmark: false,
 company: '丰田汽车 (Toyota · TM)',
 leader: '丰田章男 / 佐藤恒治 (Koji Sato)',
 positioning: '经典 TPS 精益矩阵 + 紧密财团供应链 (Keiretsu · 电装/爱信)',
 culture: '渐进式持续改善 (Kaizen) + 安灯拉绳零缺陷 + 多路径稳健',
 headcount: '~38.4万人 · 营收 ~$3,140亿',
 margins: '营业利润率稳居 10%–12% · 混动 HEV 超级现金牛',
 verdict: '制造哲学的代际碰撞：丰田在既有架构上把渐进式良率推向极致，特斯拉则用第一性原理把 70 个冲压件直接推倒重来压铸成一个零件。',
 sourceLabel: 'Toyota 20-F / Analysis',
 sourceUrl: 'https://highways.today/companies/toyota/'
 },
 {
 category: 'tech',
 benchmark: false,
 company: '苹果公司 (Apple · AAPL)',
 leader: '蒂姆·库克 / 约翰·特努斯 (John Ternus)',
 positioning: '职能制集权 + 全公司唯一损益表 + 果链轻资产外包制造',
 culture: '专家领导专家 + DRI 单点问责 + 物理隔舱极致保密',
 headcount: '16.7万人 · 人均创收 $2.87M',
 margins: 'FY26 营收 $4,788亿 · 综合毛利率 48.8% (服务 76.2%)',
 verdict: '软硬一体双璧但制造路线相反：苹果将工厂重资产留给代工伙伴并主动关停造车，特斯拉则把“超级工厂本身”打造成最核心的产品壁垒。',
 sourceLabel: 'Apple Newsroom',
 sourceUrl: 'https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/'
 }
 ];

 var CHECKLIST_ITEMS = [
 {
 tag: '第一性原理',
 title: '1. “白痴指数（Idiot Index）”测试：是否按原材料物理底价审视一切外购件？',
 desc: '核查工程团队是否敢于拆解高溢价供应商黑盒，将成品采购价与大宗金属/硅料物理成本对比并果断内化自研。'
 },
 {
 tag: '五步工程算法',
 title: '2. 实名需求与删减率测试：是否在引入自动化之前先删够了冗余步骤？',
 desc: '检验每条安全/合规/设计约束是否绑定到具体个人姓名而非模糊部门，且严守“先删除简化、最后才自动化”铁律。'
 },
 {
 tag: '越级直通车',
 title: '3. 零传声筒速度测试：一线工程师能否不经请示跨部门直连解决问题？',
 desc: '观察跨硬件、固件与产线团队沟通是否无需逐级上报审批，组织中是否彻底清除了靠垄断信息生存的中层官僚。'
 },
 {
 tag: '工厂即产品',
 title: '4. 制造工程地位测试：顶尖软件与物理人才是否愿意长期驻扎车间排障？',
 desc: '核查产品设计与产线工艺是否同桌同步定义（如一体压铸与 Unboxed 工艺），而非画完图纸扔给代工厂。'
 },
 {
 tag: '跨物种复用',
 title: '5. 底层平台复用测试：电芯、功率电子与 AI 模型能否跨多品类共享？',
 desc: '对标特斯拉将同源三电与端到端视觉模型横跨乘用车、Semi 重卡、Megapack 储能与 Optimus 机器人的协同效率。'
 },
 {
 tag: '长期激励锁死',
 title: '6. 主人翁风险共担测试：核心层薪酬是否高度挂钩长周期硬核运营里程碑？',
 desc: '核查管理层与技术骨干是否以长期股权增值而非高额旱涝保收现金底薪作为主要回报来源。'
 }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '134,785 员工 · 单人净利 $28,149 · TTM >$103.6B' },
 { sec: 'sec-01', title: '01 无常设 COO 超扁平架构与协同', sub: 'Ashok Elluswamy 统合 AI/Optimus · 业务与人效双视图' },
 { sec: 'sec-02', title: '02 四大文化支柱与五维雷达图', sub: '第一性原理 · 五步算法 · 越级沟通 · 硬核主人翁' },
 { sec: 'sec-03', title: '03 全球车企与科技巨头横向对比', sub: 'Tesla vs NVIDIA vs BYD vs Toyota vs Apple' },
 { sec: 'sec-04', title: '04 制造红利、现金流与复利推演器', sub: 'TTM $18.7B OCF · 33.1% 储能毛利 · 跨代复利模拟' },
 { sec: 'sec-05', title: '05 三幕使命演进与四大生死硬仗', sub: '2008 平安夜 · 2018 帐篷产线 · 2026 停产S/X造机器人' },
 { sec: 'sec-06', title: '06 特斯拉文化法则核查清单', sub: '6 项硬科技与物理 AI 组织诊断清单 (自动保存)' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC FY25 10-K · Q3\'26 10-Q · DEF 14A 权威信源' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 7, priceCagr: 34.0, drip: true },
 p2: { principal: 10000, years: 16, priceCagr: 36.5, drip: false },
 p3: { principal: 10000, years: 10, priceCagr: 14.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 epsSeries: { eps: true, oci: true },
 activePillar: 0,
 radarSeries: { tsla: true, nvda: true, oem: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 10000, years: 10, priceCagr: 14.5, drip: true, preset: 'p3' },
 checks: [true, true, true, false, false, false]
 };

 function safeGetStorage(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
 function safeSetStorage(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

 var toastTimer = null;
 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg;
 el.classList.add('show');
 if (toastTimer) clearTimeout(toastTimer);
 toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2500);
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIconEl = document.getElementById('appbarThemeIcon');
 if (abIconEl) {
 abIconEl.innerHTML = state.theme === 'dark'
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 
 
 safeSetStorage(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深空暗色模式' : '已切换至 MUI 清晰浅色模式');
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = state.lang === 'en';
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.getElementById('langZhBtn').classList.toggle('active', !en);
 document.getElementById('langEnBtn').classList.toggle('active', en);
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var v = nodes[i].getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (v !== null) {
 if (v.indexOf('<span') !== -1) nodes[i].innerHTML = v;
 else nodes[i].textContent = v;
 }
 }
 safeSetStorage(STORAGE_LANG_KEY, state.lang);
 renderAllCharts();
 if (!silent) showToast(en ? 'Switched to English Headings & Charts' : '已切换至中文深度研报视图');
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
 if (code === '03') {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 showToast('当前正在阅读 03/04：特斯拉企业文化深度研报');
 } else {
 showToast('请在对话附件卡片中点开第 ' + code + '/04 篇独立网页查看或下载');
 }
 }
 });
 }

 function escapeHtml(str) {
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 }

 function highlightMatch(text, query) {
 var safe = escapeHtml(text);
 if (!query) return safe;
 var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody');
 var badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = PEER_ROWS.filter(function (r) {
 var catOk = state.peerFilter === 'all' || r.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var hay = (r.company + ' ' + r.leader + ' ' + r.positioning + ' ' + r.culture + ' ' + r.verdict).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 if (badge) badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配的标杆企业记录，请尝试其他关键词。</td></tr>';
 return;
 }
 var rawQ = state.peerQuery.trim();
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
 '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
 '<td>' + highlightMatch(r.positioning, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.culture, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.headcount, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.margins, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
 '</tr>';
 }).join('');
 }

 function formatCurrency(val) {
 if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
 var aiBoost = state.sim.drip ? 4.5 : 0.0;
 var totalRate = (cagr + aiBoost) / 100;
 var endingValue = p * Math.pow(1 + totalRate, yrs);
 var moic = endingValue / p;
 var netGain = endingValue - p;
 var midYear = Math.max(1, Math.floor(yrs / 2));
 var midValue = p * Math.pow(1 + totalRate, midYear);

 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + ' 年';
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
 document.getElementById('simMoicVal').textContent = (moic >= 100 ? moic.toFixed(1) : moic.toFixed(2)) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = formatCurrency(netGain);
 document.getElementById('simMidLabel').textContent = '第 ' + midYear + ' 年中期资产节点';
 document.getElementById('simMidVal').textContent = formatCurrency(midValue);

 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.classList.toggle('active', b.getAttribute('data-preset') === state.sim.preset);
 });
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 if (!container) return;
 var doneCount = state.checks.filter(Boolean).length;
 var pct = Math.round((doneCount / CHECKLIST_ITEMS.length) * 100);
 if (chip) chip.textContent = '已核查 ' + doneCount + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)';
 if (bar) bar.style.width = pct + '%';

 container.innerHTML = CHECKLIST_ITEMS.map(function (item, idx) {
 var isChecked = !!state.checks[idx];
 return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
 '<div style="flex:1;">' +
 '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
 '<span class="check-title">' + escapeHtml(item.title) + '</span>' +
 '<span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
 '</div>' +
 '<p class="check-desc">' + escapeHtml(item.desc) + '</p>' +
 '</div></label>';
 }).join('');
 }

 // High-DPI Canvas Engine
 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function getPalette() {
 var cs = getComputedStyle(document.documentElement);
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: cs.getPropertyValue('--chart-grid').trim() || 'rgba(100,116,139,0.16)',
 tick: cs.getPropertyValue('--chart-tick').trim() || '#475569',
 text: cs.getPropertyValue('--text-primary').trim() || '#0F1924',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: cs.getPropertyValue('--chart-c1').trim() || '#0073E6',
 c2: cs.getPropertyValue('--chart-c2').trim() || '#16A34A',
 c3: cs.getPropertyValue('--chart-c3').trim() || '#D97706',
 c4: cs.getPropertyValue('--chart-c4').trim() || '#7C3AED'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var rect = canvas.parentElement.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
 canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var radius = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + radius, y);
 ctx.lineTo(x + w - radius, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
 ctx.lineTo(x + w, y + h - radius);
 ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
 ctx.lineTo(x + radius, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
 ctx.lineTo(x, y + radius);
 ctx.quadraticCurveTo(x, y, x + radius, y);
 ctx.closePath();
 }

 function topRoundedBar(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h);
 ctx.beginPath();
 ctx.moveTo(x, y + h);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h);
 ctx.closePath();
 }

 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save();
 ctx.font = '700 10.5px "IBM Plex Mono", system-ui, sans-serif';
 var tw = ctx.measureText(text).width + 9, th = 17;
 ctx.fillStyle = pal.pillBg;
 roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5);
 ctx.fill();
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return;
 ctx.beginPath();
 ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) {
 var xc = (pts[i].x + pts[i + 1].x) / 2;
 ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
 }
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var metaEl = document.getElementById('ch1AxisMeta');
 var leg1 = document.getElementById('ch1Leg1'), leg2 = document.getElementById('ch1Leg2');

 if (state.ch1View === 'viewA') {
 if (metaEl) metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 蓝色：FY2024 实际营收 ($B)</span><span style="color:var(--chart-c2);">■ 绿色：Q3\'26 年化运行率 ($B · 合计 $112.2B)</span>';
 if (leg1) leg1.textContent = 'FY2024 分板块营收 ($B · 合计 $97.69B)';
 if (leg2) leg2.textContent = 'Q3\'26 年化运行率 ($B · 合计 $112.20B)';

 var padA = { top: 30, right: 18, bottom: 44, left: 50 };
 var pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
 var labelsA = ['Automotive 整车', 'Energy 能源储能', 'Services 服务超充'];
 var subA = ['$82.24B 年化', '$11.52B (Q3毛利33.1%)', '$18.44B (+33% YoY)'];
 var fy24 = [77.07, 10.09, 10.53];
 var q3Run = [82.24, 11.52, 18.44];
 var maxY = 95.0;

 for (var g = 0; g <= 4; g++) {
 var val = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText('$' + val.toFixed(0) + 'B', padA.left - 8, gy);
 }

 var stepA = pwA / labelsA.length, barW = Math.min(46, Math.max(18, stepA * 0.25));
 for (var i = 0; i < labelsA.length; i++) {
 var cx = padA.left + stepA * (i + 0.5);
 if (hoverState.chartCh1 === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, padA.left + stepA * i + 6, padA.top, stepA - 12, phA, 8); ctx.fill();
 }
 var y1 = padA.top + phA - (fy24[i] / maxY) * phA;
 var y2 = padA.top + phA - (q3Run[i] / maxY) * phA;
 if (state.ch1Series.s1) {
 var h1 = (fy24[i] / maxY) * phA, x1 = state.ch1Series.s2 ? (cx - barW - 4) : (cx - barW / 2);
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, x1, y1, barW, h1, 5); ctx.fill();
 drawValueBadge(ctx, '$' + fy24[i].toFixed(1) + 'B', x1 + barW / 2, y1 - 12, pal.c1, pal);
 }
 if (state.ch1Series.s2) {
 var h2 = (q3Run[i] / maxY) * phA, x2 = state.ch1Series.s1 ? (cx + 4) : (cx - barW / 2);
 ctx.fillStyle = pal.c2; topRoundedBar(ctx, x2, y2, barW, h2, 5); ctx.fill();
 drawValueBadge(ctx, '$' + q3Run[i].toFixed(1) + 'B', x2 + barW / 2, y2 - 12, pal.c2, pal);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(labelsA[i], cx, padA.top + phA + 19);
 ctx.fillStyle = pal.c2; ctx.font = '600 10px "IBM Plex Mono", sans-serif';
 ctx.fillText(subA[i], cx, padA.top + phA + 34);

 hitRegions.chartCh1.push({
 idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 36,
 html: '<strong>' + labelsA[i] + '</strong><br/>• FY2024 营收：<strong>$' + fy24[i].toFixed(2) + 'B</strong><br/>• Q3\'26 年化运行率：<strong>$' + q3Run[i].toFixed(2) + 'B</strong><br/>• 亮点：' + subA[i]
 });
 }
 } else {
 if (metaEl) metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 左轴：全球全职员工数 (千人 · 2024铁腕去肥增肌)</span><span style="color:var(--chart-c2);">● 右轴：人均年创收 ($K/人)</span>';
 if (leg1) leg1.textContent = '全球全职员工数 FTE (左轴 · 千人)';
 if (leg2) leg2.textContent = '人均年创收 Revenue/FTE (右轴 · $K)';

 var padB = { top: 28, right: 54, bottom: 38, left: 48 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var labelsB = ['FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'TTM26'];
 var empK = [70.8, 99.3, 127.9, 140.5, 125.7, 134.8, 134.8];
 var revK = [445, 542, 637, 689, 777, 704, 768];
 var maxEmp = 180.0, minRev = 350, maxRev = 860;

 for (var j = 0; j <= 4; j++) {
 var r = j / 4, yGrid = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yGrid); ctx.lineTo(padB.left + pwB, yGrid); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText((maxEmp * r).toFixed(0) + 'k', padB.left - 7, yGrid);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText('$' + Math.round(minRev + r * (maxRev - minRev)) + 'K', padB.left + pwB + 7, yGrid);
 }
 var stepB = pwB / labelsB.length, bWidth = Math.min(34, Math.max(16, stepB * 0.44)), pts = [];
 for (var k = 0; k < labelsB.length; k++) {
 var centerX = padB.left + stepB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bH = (empK[k] / maxEmp) * phB, bX = centerX - bWidth / 2, bY = padB.top + phB - bH;
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, bX, bY, bWidth, bH, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(empK[k].toFixed(0) + 'k', centerX, bY + 14);
 }
 var lY = padB.top + phB - ((revK[k] - minRev) / (maxRev - minRev)) * phB;
 pts.push({ x: centerX, y: lY, rev: revK[k] });
 ctx.fillStyle = pal.tick; ctx.font = '600 11px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(labelsB[k], centerX, padB.top + phB + 22);

 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
 html: '<strong>' + labelsB[k] + ' 编制与人效</strong><br/>• 员工总数：<strong>' + Math.round(empK[k] * 1000).toLocaleString() + ' 人</strong><br/>• 人均创收：<strong>$' + revK[k] + 'K / 人</strong>'
 });
 }
 if (state.ch1Series.s2) {
 ctx.save(); drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
 pts.forEach(function (pt, n) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2); ctx.fill();
 if (w >= 540 || n % 2 === 0) drawValueBadge(ctx, '$' + pt.rev + 'K', pt.x, pt.y - 15, pal.c2, pal);
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = ['第一性原理颠覆', '制造垂直整合度', '扁平决策光速', '绝境抗压执行力', 'AI与电网毛利潜力'];
 var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : state.activePillar;
 var series = [
 { key: 'tsla', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.9, 9.7, 9.6, 9.8, 9.2] },
 { key: 'nvda', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [9.6, 7.8, 9.7, 9.5, 9.9] },
 { key: 'oem', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [4.8, 5.2, 4.5, 6.8, 4.6] }
 ];
 var cx = w / 2, cy = h / 2 + 8, radius = Math.max(62, Math.min((w - 200) / 2, h * 0.35)), total = axes.length;
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
 var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.closePath(); ctx.stroke();
 }
 for (var a = 0; a < total; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
 var isHi = a === highlightedAxis;
 ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.8 : 1;
 ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = isHi ? pal.c1 : pal.text; ctx.font = (isHi ? '800 ' : '600 ') + '11.5px system-ui, sans-serif';
 ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
 html: '<strong>' + axes[a] + ' (10分制)</strong><br/>• 特斯拉：<strong>' + series[0].vals[a] + '</strong><br/>• 英伟达：<strong>' + series[1].vals[a] + '</strong><br/>• 传统车企：<strong>' + series[2].vals[a] + '</strong>'
 });
 }
 series.forEach(function (item) {
 if (!state.radarSeries[item.key]) return;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
 var vx = cx + Math.cos(th) * (item.vals[idx] / 10) * radius, vy = cy + Math.sin(th) * (item.vals[idx] / 10) * radius;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { label: 'Megapack 能源与储能业务毛利率 (Q3 2026)', val: 33.1, cStart: '#34D399', cEnd: '#16A34A', sub: '单季毛利 $954M / 历史最高', note: '公用事业储能规模效应与 Autobidder 调度软件拉动' },
 { label: 'Tesla 全集团综合 GAAP 毛利率 (Q3 2026)', val: 19.6, cStart: '#3399FF', cEnd: '#0073E6', sub: '毛利 $5.49B (+160bps YoY)', note: '连续修复，跑赢全球绝大多数纯电动车竞争对手' },
 { label: '汽车业务剔除碳积分毛利率 (Q3 2026 Non-GAAP)', val: 18.1, cStart: '#60A5FA', cEnd: '#2563EB', sub: '较 2025 低谷显著回升', note: '4680 干法电极与焕新版 Model Y 制造降本驱动' },
 { label: 'Services 服务与超充网络毛利率 (Q3 2026)', val: 15.9, cStart: '#38BDF8', cEnd: '#0284C7', sub: '单季毛利 $734M 创纪录', note: 'NACS 跨品牌充电开放、动态车险与配件高增长' },
 { label: '白领专业序列中工程研发岗位占比 (Engineering)', val: 40.0, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '第一大专业职能序列', note: '硬核工程师治企底座，为行政管理岗位的 3 倍以上' },
 { label: '白领序列中综合商业与行政管理占比 (Admin)', val: 13.0, cStart: '#FBBF24', cEnd: '#D97706', sub: '无常设 COO 极简层级', note: '2024 去官僚化整风后严控非一线管理编制膨胀' }
 ];
 var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 45;
 for (var g = 0; g <= 3; g++) {
 var xVal = g * 15, gx = pad.left + (xVal / maxX) * pw;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = g === 0 ? 'left' : (g === 3 ? 'right' : 'center');
 ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
 }
 var rowH = ph / items.length;
 var targetX = pad.left + (25 / maxX) * pw;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(targetX, pad.top + 4); ctx.lineTo(targetX, pad.top + rowH * 4 - 4); ctx.stroke(); ctx.restore();

 items.forEach(function (it, i) {
 var rowTop = pad.top + rowH * i;
 var labelY = rowTop + Math.max(15, rowH * 0.34), barY = rowTop + Math.max(22, rowH * 0.50);
 var barH = Math.min(15, Math.max(11, rowH * 0.26)), bw = Math.max(8, (it.val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.label, pad.left, labelY);
 var valStr = it.val.toFixed(1) + '%';
 ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? it.cStart : it.cEnd; ctx.textAlign = 'right';
 ctx.fillText(valStr, pad.left + pw, labelY);
 if (w >= 560) {
 var valW = ctx.measureText(valStr).width + 10;
 ctx.font = '500 11px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.tick;
 ctx.fillText(it.sub, pad.left + pw - valW, labelY);
 }
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
 barGrad.addColorStop(0, it.cStart); barGrad.addColorStop(1, it.cEnd);
 ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();
 hitRegions.chartBars.push({
 idx: i, x: pad.left, y: rowTop, w: pw, h: rowH,
 html: '<strong>' + it.label + '：' + valStr + '</strong><br/>• 明细：' + it.sub + '<br/>• 解读：' + it.note
 });
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var years = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'TTM Q3\'26'];
 var ocfB = [11.50, 14.72, 13.26, 14.92, 14.75, 18.71];
 var engGm = [-4.7, 7.4, 18.9, 26.2, 29.8, 33.1];
 var pad = { top: 26, right: 50, bottom: 38, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var minO = 0, maxO = 22.0, minG = -10, maxG = 38.0;

 for (var g = 0; g <= 4; g++) {
 var ratio = g / 4, gy = pad.top + ph - ratio * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('$' + (minO + ratio * (maxO - minO)).toFixed(0) + 'B', pad.left - 7, gy);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minG + ratio * (maxG - minG)).toFixed(0) + '%', pad.left + pw + 7, gy);
 }
 var step = pw / years.length, barW = Math.min(42, Math.max(20, step * 0.44)), linePts = [];
 for (var i = 0; i < years.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = ((ocfB[i] - minO) / (maxO - minO)) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + ocfB[i].toFixed(1) + 'B', cx, by + 16);
 }
 var oy = pad.top + ph - ((engGm[i] - minG) / (maxG - minG)) * ph;
 linePts.push({ x: cx, y: oy, gm: engGm[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(years[i], cx, pad.top + ph + 20);
 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 30,
 html: '<strong>' + years[i] + '</strong><br/>• 经营活动现金流 OCF：<strong>$' + ocfB[i].toFixed(2) + 'B</strong><br/>• 储能板块毛利率：<strong>' + engGm[i].toFixed(1) + '%</strong>'
 });
 }
 if (state.epsSeries.oci) {
 ctx.save(); drawSmoothLine(ctx, linePts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
 linePts.forEach(function (pt) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, pt.gm.toFixed(1) + '%', pt.x, pt.y - 15, pal.c2, pal);
 });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years;
 var baseRate = state.sim.priceCagr / 100, totalRate = (state.sim.priceCagr + (state.sim.drip ? 4.5 : 0)) / 100;
 var totalSeries = [], baseSeries = [];
 for (var y = 0; y <= yrs; y++) {
 totalSeries.push(p * Math.pow(1 + totalRate, y));
 baseSeries.push(p * Math.pow(1 + baseRate, y));
 }
 var maxVal = Math.max(totalSeries[yrs], baseSeries[yrs], p * 1.2) * 1.08;
 var pad = { top: 20, right: 20, bottom: 28, left: 60 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 7, gy);
 }
 var stepX = pw / yrs;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var px = pad.left + stepX * i, py = pad.top + ph - (baseSeries[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.stroke(); ctx.restore();

 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 for (var m = 0; m <= yrs; m++) {
 var tx = pad.left + stepX * m, ty = pad.top + ph - (totalSeries[m] / maxVal) * ph;
 if (m === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
 if (m === 0 || m === Math.floor(yrs / 2) || m === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + m, tx, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({
 idx: m, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22,
 html: '<strong>第 ' + m + ' 年复利模拟</strong><br/>• 含物理 AI 溢价：<strong>' + formatCurrency(totalSeries[m]) + '</strong><br/>• 纯硬件基准：<strong>' + formatCurrency(baseSeries[m]) + '</strong>'
 });
 }
 ctx.stroke();
 }

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawHorizontalBars();
 drawEpsComboChart();
 drawSimChart();
 }

 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
 canvas.addEventListener('mousemove', function (e) {
 var rect = canvas.getBoundingClientRect();
 var x = e.clientX - rect.left, y = e.clientY - rect.top;
 var regions = hitRegions[canvasId] || [], matched = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
 }
 var nextIdx = matched ? matched.idx : -1;
 if (hoverState[canvasId] !== nextIdx) { hoverState[canvasId] = nextIdx; if (redrawMap[canvasId]) redrawMap[canvasId](); }
 if (matched) {
 tip.innerHTML = matched.html; tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () {
 hoverState[canvasId] = -1;
 if (redrawMap[canvasId]) redrawMap[canvasId]();
 tip.style.display = 'none';
 });
 }

 function init() {
 var savedTheme = (safeGetStorage(STORAGE_THEME_KEY) || 'light').replace(/^"|"$/g, '');
 var savedLang = (safeGetStorage(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
 var savedChecks = safeGetStorage(STORAGE_CHECK_KEY);
 if (savedChecks) {
 try {
 var parsed = JSON.parse(savedChecks);
 if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) state.checks = parsed.map(Boolean);
 } catch (e) {}
 }

 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 applyTheme(savedTheme, true);
 applyLanguage(savedLang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 
 

 var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth > 1120) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 safeSetStorage(STORAGE_SIDEBAR_KEY, col ? '0' : '1');
 setTimeout(renderAllCharts, 60);
 } else {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 document.querySelectorAll('#tocNavList .mui-nav-link').forEach(function (l) {
 l.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 });

 
 

 var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase();
 var list = QUICK_JUMP_INDEX.filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
 jumpPop.innerHTML = list.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
 }).join('');
 jumpPop.classList.add('open');
 }
 jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
 jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
 jumpPop.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-jump-sec]');
 if (!btn) return;
 var secEl = document.getElementById(btn.getAttribute('data-jump-sec'));
 if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
 else if (e.key === 'Escape') { jumpPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
 });

 document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });

 document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var panel = document.getElementById(this.getAttribute('data-collapse-target'));
 if (!panel) return;
 var isOpen = panel.classList.toggle('open');
 this.innerHTML = isOpen ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
 });
 });

 var pillarCards = document.querySelectorAll('[data-pillar]');
 pillarCards.forEach(function (card) {
 card.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 pillarCards.forEach(function (c, k) { c.classList.toggle('active', k === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + PILLAR_NOTES[idx] + '</div>';
 drawRadarChart();
 });
 });

 document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
 pill.addEventListener('click', function () {
 var key = this.getAttribute('data-radar-key');
 state.radarSeries[key] = !state.radarSeries[key];
 if (!state.radarSeries.tsla && !state.radarSeries.nvda && !state.radarSeries.oem) state.radarSeries[key] = true;
 this.classList.toggle('muted', !state.radarSeries[key]);
 drawRadarChart();
 });
 });

 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 var peerFilterBtns = document.querySelectorAll('[data-peer-filter]');
 peerFilterBtns.forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 peerFilterBtns.forEach(function (x) { x.classList.toggle('active', x === btn); });
 renderPeerTable();
 });
 });

 var pSlider = document.getElementById('simPrincipalSlider'), ySlider = document.getElementById('simYearsSlider'), cSlider = document.getElementById('simCagrSlider'), dToggle = document.getElementById('simDripToggle');
 pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 ySlider.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 10; state.sim.preset = ''; updateSimulatorUI(); });
 cSlider.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
 dToggle.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });

 document.querySelectorAll('[data-preset]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var key = this.getAttribute('data-preset'), cfg = PRESETS[key];
 if (!cfg) return;
 state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = key;
 pSlider.value = String(cfg.principal); ySlider.value = String(cfg.years); cSlider.value = String(cfg.priceCagr); dToggle.checked = cfg.drip;
 updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var input = e.target.closest('[data-check-input]');
 if (!input) return;
 var idx = parseInt(input.getAttribute('data-check-input'), 10);
 state.checks[idx] = !!input.checked;
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast('已勾选全部 6 项特斯拉企业文化核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast('核查清单已恢复默认基准状态 (50%)');
 });

 document.querySelectorAll('[data-ch1-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var sk = this.getAttribute('data-ch1-series');
 state.ch1Series[sk] = !state.ch1Series[sk];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
 this.classList.toggle('muted', !state.ch1Series[sk]);
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-eps-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var ek = this.getAttribute('data-eps-series');
 state.epsSeries[ek] = !state.epsSeries[ek];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[ek] = true;
 this.classList.toggle('muted', !state.epsSeries[ek]);
 drawEpsComboChart();
 });
 });

 window.addEventListener('scroll', function () {
 var docEl = document.documentElement, maxS = Math.max(1, docEl.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, (window.scrollY / maxS) * 100)) + '%';
 }, { passive: true });

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);
 var rTimer = null;
 window.addEventListener('resize', function () { clearTimeout(rTimer); rTimer = setTimeout(renderAllCharts, 60); });
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 