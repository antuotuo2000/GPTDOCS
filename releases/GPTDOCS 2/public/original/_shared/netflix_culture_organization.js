
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_DENSITY_KEY = 'mui_clarity_density_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_nflx_culture_checks_v1';

 var PILLAR_NOTES = [
 '<strong>当前选中原则解读（01 梦之队与留任测试）：</strong>新版备忘录微调了 Keeper Test 表述，强调主管与下属常态化坦诚对齐预期，让留任测试不再是冷酷突袭，而是守护超高人才密度、使其余 99% 同事免受平庸拖累的制度保障 <a class="cite-link" href="https://about.netflix.com/news/sharing-our-latest-culture-memo" target="_blank" rel="noopener noreferrer">Sergio Ezama 解读 ↗</a>。',
 '<strong>当前选中原则解读（02 重人轻流程）：</strong>奈飞至今没有休假额度审批和繁琐差旅报销单，但明确区分“抑制创新的官僚坏流程”与“保障全球 10 亿人直播不宕机的工程好流程” <a class="cite-link" href="https://jobs.netflix.com/culture" target="_blank" rel="noopener noreferrer">Culture Memo ↗</a>。',
 '<strong>当前选中原则解读（03 令人不适的兴奋）：</strong>从砍掉高利润 DVD 业务，到推翻“绝不加广告”承诺建成 2.5 亿月活广告网，奈飞要求全员在剧变与不确定性中寻找兴奋感 <a class="cite-link" href="https://about.netflix.com/news/netflix-upfront-2026-get-closer" target="_blank" rel="noopener noreferrer">2026 Upfront ↗</a>。',
 '<strong>当前选中原则解读（04 卓越且永不止步）：</strong>即便 Q3\'26 营业利润率创下 34.6% 历史纪录，管理层仍在股东信中直言“观看时长增速仍有提升空间”，并果断调整内容统帅与组织架构 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1065280/000106528026000290/ex991_q326.htm" target="_blank" rel="noopener noreferrer">SEC Q3\'26 8-K ↗</a>。'
 ];

 var PEER_ROWS = [
 {
 category: 'density',
 benchmark: true,
 company: '研究基准：奈飞 (Netflix · NFLX)',
 leader: '哈斯廷斯 / 萨兰多斯 & 彼得斯 (双CEO)',
 positioning: '双 CEO 互补中枢 + 全球本土制片分权 + 情景赋能 (Context)',
 culture: '职业体育梦之队 + 留任测试 (Keeper Test) + 知情船长 + 零审批自由',
 headcount: '~1.6万人 (68%北美) · 人均创收 ~$3.19M (FY26E)',
 margins: 'FY26E 营收 $511亿 · 营业利润率 31.5% (Q3 34.6%) · FCF ~$120亿',
 verdict: '创意与工程双高密度标杆：无需层层绿灯委员会，以 1.6 万人撬动近 10 亿全球观众与行业断层第一流媒体利润率。',
 sourceLabel: 'SEC Q3\'26 / Culture Memo',
 sourceUrl: 'https://jobs.netflix.com/culture'
 },
 {
 category: 'density',
 benchmark: false,
 company: '苹果公司 (Apple · AAPL)',
 leader: '乔布斯 / 库克 / 约翰·特努斯 (2026.09+)',
 positioning: '职能制高度集权 (Functional Org) + 全公司唯一损益表 (Single P&L)',
 culture: '专家领导专家 + DRI 唯一问责 + 严格物理隔舱保密',
 headcount: '16.7万人 (41%工程) · 人均创收 $2.87M',
 margins: 'FY26 营收 $4,788亿 · 综合毛利 48.8% · 营业利润率 33.0%',
 verdict: '同属反事业部官僚极品，但路径相反：苹果靠集权保密打磨零误差硬件，奈飞靠全员财务透明与本土放权博取全球多元爆款。',
 sourceLabel: 'HBR / AAPL 10-K',
 sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
 },
 {
 category: 'density',
 benchmark: false,
 company: 'Alphabet / YouTube (GOOGL)',
 leader: '桑达尔·皮查伊 / 尼尔·莫汉 (YouTube)',
 positioning: '平台工程基础设施 + 全球数百万 UGC 创作者分成网络',
 culture: '算法与工程驱动 + OKR 目标对齐 + 双边生态分润',
 headcount: '~18.3万人 · 人均创收 ~$2.1M+',
 margins: 'Q3\'26 集团营业利润率 31.8% · YouTube 稳居美国电视时长榜首',
 verdict: '奈飞头号注意力对手：YouTube 以算法连接外部创作者“消磨时间”，奈飞以内部梦之队打造精品叙事“值得托付时间”。',
 sourceLabel: 'GOOGL Q3\'26 8-K',
 sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000080/googexhibit991q32026.htm'
 },
 {
 category: 'density',
 benchmark: false,
 company: 'Spotify (SPOT)',
 leader: '丹尼尔·埃克 (Daniel Ek)',
 positioning: '北欧敏捷部落/小队矩阵 (Squads, Tribes, Chapters) + 精简提效',
 culture: '高度产品实验迭代 + 2023–2025 严控编制后盈利拐点爆发',
 headcount: '7,323人 (FY25末) · 人均创收 ~$2.66M',
 margins: 'FY25 营收 $194亿 · Q4\'25 毛利率 33.1% / 营业利润率 15.5%',
 verdict: '音频流媒体近亲：同样极度重视算法推荐与高人效工程，但受制于三大唱片公司版税抽成，无法像奈飞自制剧那样完全买断成本。',
 sourceLabel: 'SPOT Q4\'25 Release',
 sourceUrl: 'https://newsroom.spotify.com/2026-02-10/spotify-q4-2025-earnings/'
 },
 {
 category: 'media',
 benchmark: false,
 company: '华特迪士尼 (Walt Disney · DIS)',
 leader: '鲍勃·艾格 (Bob Iger)',
 positioning: '三大核心事业部（娱乐影视流媒体 / ESPN体育 / 主题公园游轮）',
 culture: '百年殿堂级家族 IP 守护 + 院线/电视/乐园跨事业部统筹',
 headcount: '~22.5万+ (含全球主题公园一线演职人员)',
 margins: 'FY25 营收 $944亿 · FY26E 娱乐流媒体 SVOD 营业利润率指引 10.0%',
 verdict: '传统 IP 帝国典范：线下乐园衍生变现冠绝全球（奈飞 Netflix House 正向其取经），但层级审批与传统电视包袱拖慢流媒体利润率。',
 sourceLabel: 'DIS FY25 Release',
 sourceUrl: 'https://thewaltdisneycompany.com/press-releases/the-walt-disney-company-reports-fourth-quarter-and-full-year-earnings-for-fiscal-2025/'
 }
 ];

 var CHECKLIST_ITEMS = [
 {
 tag: '留任测试',
 title: '1. “留任测试 (Keeper Test)”检验：主管是否敢于为顶尖人才密度果断换血？',
 desc: '核查团队是否真正以职业冠军球队标准配置人才，对不再适配者给予慷慨遣散包体面分道扬镳，而非任由平庸稀释士气。'
 },
 {
 tag: '情景而非控制',
 title: '2. “情景管理 (Context, Not Control)”检验：一线拍板者是否掌握充分全局信息？',
 desc: '评估重大项目失败时管理层的第一反应是“补齐战略情景信息差”，还是“新增三道繁琐的审批签字关卡”。'
 },
 {
 tag: '知情船长制',
 title: '3. “知情船长与搜集异议”检验：每个项目是否有唯一船长且强制听取反对意见？',
 desc: '确认决策既不陷入平庸的委员会投票折中，也不沦为独断专行——船长必须主动搜集异议（Farming for Dissent）后独立担责。'
 },
 {
 tag: '晒太阳复盘',
 title: '4. “极度坦诚与晒太阳 (Sunshining)”检验：失误能否在阳光下坦率复盘？',
 desc: '核查员工是否敢于当面向上级提出建设性批评（4A反馈原则），以及船长在决策失误后是否主动向全员公开复盘教训。'
 },
 {
 tag: '顶薪零奖金内耗',
 title: '5. 薪酬机制检验：是否避免因短期 KPI 奖金池引发部门墙与目标保守化？',
 desc: '对标奈飞“市场最高档固定薪酬 + 零短期绩效奖金”机制，检验激励体系是否鼓励跨团队无私协作与高难度创新。'
 },
 {
 tag: '自我颠覆勇气',
 title: '6. “令人不适的兴奋”检验：面对范式转移是否敢于推翻昨日成功教条？',
 desc: '检验管理层能否像奈飞推进流媒体、广告套餐与果断放弃华纳高溢价并购一样，不被历史口号与沉没成本绑架。'
 }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: 'FY26E $51.1B 营收 · ~$3.19M 人均创收 · 31.5% 营业利润率' },
 { sec: 'sec-01', title: '01 双CEO架构与情景赋能协同', sub: 'Sarandos×Peters · Rice履新CCO · 区域营收与人效双视图' },
 { sec: 'sec-02', title: '02 四大文化原则与五维雷达图', sub: '梦之队 · 重人轻流程 · 知情船长 · 对比苹果与传统好莱坞' },
 { sec: 'sec-03', title: '03 全球传媒与科技巨头对比', sub: 'Netflix vs Apple vs YouTube vs Spotify vs Disney' },
 { sec: 'sec-04', title: '04 利润率跃迁与文化复利推演', sub: 'FY22–FY26E 利润率连跨四级 · 跨周期复利模拟器' },
 { sec: 'sec-05', title: '05 三次自我颠覆与战役复盘', sub: '2001裁员顿悟 · Qwikster教训 · 弃追WBD与2026精兵简政' },
 { sec: 'sec-06', title: '06 奈飞文化法则核查清单', sub: '6 项高人才密度组织诊断与本地持久化评分' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC Q3\'26 8-K · FY25 10-K · 官方文化备忘录' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 4, priceCagr: 36.0, drip: true },
 p2: { principal: 10000, years: 24, priceCagr: 31.5, drip: false },
 p3: { principal: 10000, years: 10, priceCagr: 13.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 activePillar: 0,
 radarSeries: { nflx: true, aapl: true, studio: true },
 ch1Series: { s1: true, s2: true },
 epsSeries: { eps: true, oci: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 10000, years: 10, priceCagr: 13.5, drip: true, preset: 'p3' },
 checks: [true, true, true, false, false, false]
 };

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg;
 el.classList.add('show');
 clearTimeout(el._t);
 el._t = setTimeout(function () { el.classList.remove('show'); }, 2500);
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
 
 
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深空暗色模式' : '已切换至清晰浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = state.lang === 'en';
 document.documentElement.lang = en ? 'en' : 'zh-CN';
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
 try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
 renderAllCharts();
 if (!silent) showToast(en ? 'Switched to English UI labels' : '已切换为中文视图');
 }

 function applyDensity(d) {
 var mode = d === 'compact' ? 'compact' : 'comfort';
 document.body.setAttribute('data-density', mode);
 var bs = document.querySelectorAll('[data-density-btn]');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i].getAttribute('data-density-btn') === mode);
 try { localStorage.setItem(STORAGE_DENSITY_KEY, mode); } catch (e) {}
 renderAllCharts();
 }

 // Suite Hub Filter
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
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = PEER_ROWS.filter(function (row) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var hay = (row.company + ' ' + row.leader + ' ' + row.positioning + ' ' + row.culture + ' ' + row.verdict).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">未找到匹配的标杆企业记录，请尝试其他关键词或重置筛选。</td></tr>';
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
 var p = state.sim.principal;
 var yrs = state.sim.years;
 var cagr = state.sim.priceCagr;
 var dripRate = state.sim.drip ? 2.8 : 0.0;
 var totalRate = (cagr + dripRate) / 100;
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

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < presetBtns.length; i++) {
 presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
 }
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 var doneCount = state.checks.filter(Boolean).length;
 var pct = Math.round((doneCount / CHECKLIST_ITEMS.length) * 100);
 chip.textContent = '已核查 ' + doneCount + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)';
 bar.style.width = pct + '%';
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
 '</div>' +
 '</label>';
 }).join('');
 }

 // High-DPI Canvas Engine
 function getPalette() {
 var cs = getComputedStyle(document.documentElement);
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: cs.getPropertyValue('--chart-grid').trim() || 'rgba(100,116,139,0.16)',
 tick: cs.getPropertyValue('--chart-tick').trim() || '#475569',
 text: cs.getPropertyValue('--text-primary').trim() || '#0F172A',
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
 var w = Math.max(240, Math.floor(rect.width));
 var h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 canvas.style.width = w + 'px';
 canvas.style.height = h + 'px';
 canvas.width = Math.floor(w * dpr);
 canvas.height = Math.floor(h * dpr);
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
 ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 var tw = ctx.measureText(text).width + 9, th = 17;
 ctx.fillStyle = pal.pillBg;
 roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5);
 ctx.fill();
 ctx.strokeStyle = pal.pillBorder;
 ctx.lineWidth = 1;
 ctx.stroke();
 ctx.fillStyle = fgColor;
 ctx.textAlign = 'center';
 ctx.textBaseline = 'middle';
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
 metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 蓝色：9M 2025 累计净营收 ($B · 合计 $33.13B)</span><span style="color:var(--chart-c2);">■ 绿色：9M 2026 累计净营收 ($B · 合计 $37.68B)</span>';
 leg1.textContent = '9M 2025 区域累计营收 ($B)';
 leg2.textContent = '9M 2026 区域累计营收 ($B)';

 var padA = { top: 30, right: 18, bottom: 44, left: 50 };
 var pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
 var labelsA = ['UCAN 北美', 'EMEA 欧洲中东', 'LATAM 拉美', 'APAC 亚太'];
 var subA = ['+11.5% YoY', '+14.1% YoY', '+18.9% YoY', '+16.5% YoY'];
 var r25 = [14.62, 10.64, 3.94, 3.93];
 var r26 = [16.31, 12.14, 4.68, 4.56];
 var maxY = 18.5;

 for (var g = 0; g <= 4; g++) {
 var val = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText('$' + val.toFixed(1) + 'B', padA.left - 8, gy);
 }
 var stepA = pwA / labelsA.length;
 var barW = Math.min(40, Math.max(16, stepA * 0.27));
 for (var i = 0; i < labelsA.length; i++) {
 var cx = padA.left + stepA * (i + 0.5);
 if (hoverState.chartCh1 === i) {
 ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padA.left + stepA * i + 4, padA.top, stepA - 8, phA, 8); ctx.fill();
 }
 var y1 = padA.top + phA - (r25[i] / maxY) * phA;
 var y2 = padA.top + phA - (r26[i] / maxY) * phA;
 if (state.ch1Series.s1) {
 var h1 = (r25[i] / maxY) * phA, x1 = state.ch1Series.s2 ? (cx - barW - 3) : (cx - barW / 2);
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, x1, y1, barW, h1, 5); ctx.fill();
 }
 if (state.ch1Series.s2) {
 var h2 = (r26[i] / maxY) * phA, x2 = state.ch1Series.s1 ? (cx + 3) : (cx - barW / 2);
 ctx.fillStyle = pal.c2; topRoundedBar(ctx, x2, y2, barW, h2, 5); ctx.fill();
 drawValueBadge(ctx, '$' + r26[i].toFixed(2) + 'B', x2 + barW / 2, y2 - 12, pal.c2, pal);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(labelsA[i], cx, padA.top + phA + 19);
 ctx.fillStyle = pal.c2; ctx.font = '600 10px "IBM Plex Mono", sans-serif';
 ctx.fillText(subA[i], cx, padA.top + phA + 34);

 hitRegions.chartCh1.push({
 idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 36,
 html: '<strong>' + labelsA[i] + ' 9个月累计净营收 (SEC Q3\'26 8-K)</strong><br/>• 9M 2025：<strong>$' + r25[i].toFixed(2) + 'B</strong><br/>• 9M 2026：<strong>$' + r26[i].toFixed(2) + 'B</strong> (' + subA[i] + ')'
 });
 }
 } else {
 metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 左轴：全职员工总数 (千人 · Form 10-K)</span><span style="color:var(--chart-c2);">● 右轴：人均年创收 ($M/人)</span>';
 leg1.textContent = '全职员工人数 (左轴 · 千人)';
 leg2.textContent = '人均年创收 (右轴 · $M)';

 var padB = { top: 28, right: 52, bottom: 38, left: 48 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var labelsB = ['FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var empK = [9.4, 11.3, 12.8, 13.0, 14.0, 16.0, 16.0];
 var revM = [2.66, 2.63, 2.47, 2.59, 2.79, 2.82, 3.19];
 var maxEmp = 24.0, minRev = 2.0, maxRev = 3.5;

 for (var j = 0; j <= 4; j++) {
 var r = j / 4, yGrid = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yGrid); ctx.lineTo(padB.left + pwB, yGrid); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText((maxEmp * r).toFixed(0) + 'k', padB.left - 7, yGrid);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText('$' + (minRev + r * (maxRev - minRev)).toFixed(2) + 'M', padB.left + pwB + 7, yGrid);
 }
 var stepB = pwB / labelsB.length, bWidth = Math.min(34, Math.max(16, stepB * 0.44)), pts = [];
 for (var k = 0; k < labelsB.length; k++) {
 var centerX = padB.left + stepB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bH = (empK[k] / maxEmp) * phB, bX = centerX - bWidth / 2, bY = padB.top + phB - bH;
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, bX, bY, bWidth, bH, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(empK[k].toFixed(1) + 'k', centerX, bY + 14);
 }
 var lY = padB.top + phB - ((revM[k] - minRev) / (maxRev - minRev)) * phB;
 pts.push({ x: centerX, y: lY, rev: revM[k] });
 ctx.fillStyle = pal.tick; ctx.font = '600 11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(labelsB[k], centerX, padB.top + phB + 22);
 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
 html: '<strong>' + labelsB[k] + ' 人效核验 (Form 10-K)</strong><br/>• 全职员工：<strong>~' + Math.round(empK[k] * 1000).toLocaleString() + ' 人</strong><br/>• 人均年创收：<strong>$' + revM[k].toFixed(2) + 'M / 人</strong>'
 });
 }
 if (state.ch1Series.s2) {
 ctx.save(); drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
 for (var n = 0; n < pts.length; n++) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 4.2, 0, Math.PI * 2); ctx.fill();
 if (n === 0 || n === 4 || n === 6) drawValueBadge(ctx, '$' + pts[n].rev.toFixed(2) + 'M', pts[n].x, pts[n].y - 16, pal.c2, pal);
 }
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = ['一线绿灯自主权', '人才优胜劣汰密度', '内部财务透明度', '自我颠覆敏捷度', '跨区域经营杠杆'];
 var pillarAxisMap = [1, 0, 3, 2];
 var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];
 var series = [
 { key: 'nflx', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.7, 9.8, 9.6, 9.4] },
 { key: 'aapl', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [6.5, 9.4, 5.2, 8.8, 9.7] },
 { key: 'studio', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [4.8, 5.6, 4.5, 4.4, 5.5] }
 ];
 var cx = w / 2, cy = h / 2 + 8;
 var sidePad = w < 420 ? 88 : 108;
 var radius = Math.max(62, Math.min((w - sidePad * 2) / 2, h * 0.35));
 var total = axes.length;

 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1;
 ctx.beginPath();
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
 ctx.fillStyle = isHi ? pal.c1 : pal.text;
 ctx.font = (isHi ? '800 ' : '600 ') + '11.5px system-ui, sans-serif'; ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
 html: '<strong>' + axes[a] + ' (10分制)</strong><br/>• 奈飞 (NFLX)：<strong>' + series[0].vals[a] + '</strong><br/>• 苹果 (AAPL)：<strong>' + series[1].vals[a] + '</strong><br/>• 传统好莱坞片厂：<strong>' + series[2].vals[a] + '</strong>'
 });
 }
 for (var s = 0; s < series.length; s++) {
 var item = series[s];
 if (!state.radarSeries[item.key]) continue;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total, dist = (item.vals[idx] / 10) * radius;
 var vx = cx + Math.cos(theta) * dist, vy = cy + Math.sin(theta) * dist;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
 }
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { label: 'Q3 2026 毛利率 Gross Margin (扣除内容摊销与CDN)', val: 52.8, cStart: '#34D399', cEnd: '#16A34A', sub: '$6,795M / $12,874M', note: '固定内容成本杠杆叠加 Open Connect 自研边缘分发驱动' },
 { label: 'Q3 2026 单季创纪录营业利润率 Operating Margin', val: 34.6, cStart: '#3399FF', cEnd: '#0073E6', sub: '$4,459M / $12,874M (+640bps)', note: '同比暴增 6.4 个百分点，领跑全球流媒体行业' },
 { label: 'FY2026 全年营业利润率官方指引 (Full-Year Target)', val: 31.5, cStart: '#60A5FA', cEnd: '#2563EB', sub: '较 FY25 (29.5%) 再扩 +200bps', note: '已吸收 Q4 约 1,000 岗精简提效一次性遣散支出影响' },
 { label: 'FY2026E 自由现金流转化率 (FCF / Revenue Margin)', val: 23.5, cStart: '#38BDF8', cEnd: '#0284C7', sub: '~$12.0B / $51.1B', note: '物理 CapEx 仅占营收 ~1.8%，现金内容比锚定 ~1.1x' },
 { label: '北美大本营（硅谷工程 + 好莱坞制片）员工占比', val: 68.0, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '~10,880 人 (FY25 10-K)', note: '集中全球推荐算法、Ads Suite 与美剧大制作核心人才' },
 { label: 'EMEA / APAC / LATAM 国际本土分部员工占比', val: 32.0, cStart: '#FBBF24', cEnd: '#D97706', sub: '~5,120 人遍布全球分部', note: '精悍本土知情船长团队撬动全球 >56% 海外营收' }
 ];
 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 80;
 for (var g = 0; g <= 4; g++) {
 var xVal = Math.round((maxX / 4) * g), gx = pad.left + (xVal / maxX) * pw;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = g === 0 ? 'left' : (g === 4 ? 'right' : 'center');
 ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
 }
 var rowH = ph / items.length;
 var targetX = pad.left + (30 / maxX) * pw;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(targetX, pad.top + 4); ctx.lineTo(targetX, pad.top + rowH * 4 - 4); ctx.stroke(); ctx.restore();

 for (var i = 0; i < items.length; i++) {
 var rowTop = pad.top + rowH * i;
 var labelY = rowTop + Math.max(15, rowH * 0.34), barY = rowTop + Math.max(22, rowH * 0.50);
 var barH = Math.min(15, Math.max(11, rowH * 0.26)), bw = Math.max(8, (items[i].val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(items[i].label, pad.left, labelY);
 var valStr = items[i].val.toFixed(1) + '%';
 ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? items[i].cStart : items[i].cEnd; ctx.textAlign = 'right';
 ctx.fillText(valStr, pad.left + pw, labelY);
 if (w >= 560) {
 var valW = ctx.measureText(valStr).width + 10;
 ctx.font = '500 11px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.tick;
 ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
 }
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
 barGrad.addColorStop(0, items[i].cStart); barGrad.addColorStop(1, items[i].cEnd);
 ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();
 hitRegions.chartBars.push({
 idx: i, x: pad.left, y: rowTop, w: pw, h: rowH,
 html: '<strong>' + items[i].label + '：' + items[i].val.toFixed(1) + '%</strong><br/>• 明细：' + items[i].sub + '<br/>• 解读：' + items[i].note
 });
 }
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var years = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026E'];
 var subYears = ['(订户阵痛期)', '(双CEO首年)', '(密码共享红利)', '(自研广告栈)', '(指引 +20%+ OI)'];
 var oiB = [5.63, 6.95, 10.42, 13.33, 16.10];
 var omPct = [17.8, 20.6, 26.7, 29.5, 31.5];
 var pad = { top: 26, right: 50, bottom: 44, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var minOi = 0, maxOi = 18.5, minOm = 12.0, maxOm = 35.0;

 for (var g = 0; g <= 4; g++) {
 var ratio = g / 4, gy = pad.top + ph - ratio * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('$' + (minOi + ratio * (maxOi - minOi)).toFixed(1) + 'B', pad.left - 7, gy);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minOm + ratio * (maxOm - minOm)).toFixed(1) + '%', pad.left + pw + 7, gy);
 }
 var targetY = pad.top + ph - ((30.0 - minOm) / (maxOm - minOm)) * ph;
 ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(pad.left, targetY); ctx.lineTo(pad.left + pw, targetY); ctx.stroke(); ctx.restore();

 var step = pw / years.length, barW = Math.min(46, Math.max(24, step * 0.42)), linePts = [];
 for (var i = 0; i < years.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = ((oiB[i] - minOi) / (maxOi - minOi)) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + oiB[i].toFixed(2) + 'B', cx, by + 17);
 }
 var oy = pad.top + ph - ((omPct[i] - minOm) / (maxOm - minOm)) * ph;
 linePts.push({ x: cx, y: oy, om: omPct[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(years[i], cx, pad.top + ph + 19);
 ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif';
 ctx.fillText(subYears[i], cx, pad.top + ph + 33);
 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
 html: '<strong>' + years[i] + ' ' + subYears[i] + '</strong><br/>• 年度营业利润：<strong>$' + oiB[i].toFixed(2) + 'B</strong><br/>• 营业利润率：<strong>' + omPct[i].toFixed(1) + '%</strong>'
 });
 }
 if (state.epsSeries.oci) {
 ctx.save(); drawSmoothLine(ctx, linePts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
 for (var m = 0; m < linePts.length; m++) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, linePts[m].om.toFixed(1) + '%', linePts[m].x, linePts[m].y - 16, pal.c2, pal);
 }
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years;
 var priceRate = state.sim.priceCagr / 100;
 var totalRate = (state.sim.priceCagr + (state.sim.drip ? 2.8 : 0)) / 100;
 var totalSeries = [], priceOnlySeries = [];
 for (var y = 0; y <= yrs; y++) {
 totalSeries.push(p * Math.pow(1 + totalRate, y));
 priceOnlySeries.push(p * Math.pow(1 + priceRate, y));
 }
 var maxVal = Math.max(totalSeries[yrs], priceOnlySeries[yrs], p * 1.2) * 1.08;
 var pad = { top: 20, right: 20, bottom: 28, left: 60 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 var labelStr = v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k');
 ctx.fillText(labelStr, pad.left - 7, gy);
 }
 var stepX = pw / yrs;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var px = pad.left + stepX * i, py = pad.top + ph - (priceOnlySeries[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.stroke(); ctx.restore();

 var totalPts = [];
 for (var k = 0; k <= yrs; k++) totalPts.push({ x: pad.left + stepX * k, y: pad.top + ph - (totalSeries[k] / maxVal) * ph });
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 for (var m = 0; m < totalPts.length; m++) {
 if (m === 0) ctx.moveTo(totalPts[m].x, totalPts[m].y); else ctx.lineTo(totalPts[m].x, totalPts[m].y);
 }
 ctx.stroke();
 for (var t = 0; t <= yrs; t++) {
 var tx = totalPts[t].x;
 if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + t, tx, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({
 idx: t, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22,
 html: '<strong>持有第 ' + t + ' 年资产对比</strong><br/>• 含回购缩股增厚：<strong>' + formatCurrency(totalSeries[t]) + '</strong><br/>• 仅内生增长：<strong>' + formatCurrency(priceOnlySeries[t]) + '</strong>'
 });
 }
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
 var rect = canvas.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
 var regions = hitRegions[canvasId] || [], matched = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
 }
 var nextIdx = matched ? matched.idx : -1;
 if (hoverState[canvasId] !== nextIdx) { hoverState[canvasId] = nextIdx; redrawMap[canvasId](); }
 if (matched) {
 tip.innerHTML = matched.html; tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () {
 hoverState[canvasId] = -1; redrawMap[canvasId](); tip.style.display = 'none';
 });
 }

 function init() {
 try {
 if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 var initD = localStorage.getItem(STORAGE_DENSITY_KEY);
 if (initD) applyDensity(initD);
 var savedT = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
 if (savedT === 'dark' || savedT === 'light') state.theme = savedT;
 var savedL = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
 if (savedL === 'zh' || savedL === 'en') state.lang = savedL;
 var savedC = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
 if (Array.isArray(savedC) && savedC.length === CHECKLIST_ITEMS.length) state.checks = savedC.map(Boolean);
 } catch (e) {}

 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 applyTheme(state.theme, true);
 applyLang(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 
 

 var dg = document.getElementById('densityGroup');
 if (dg) {
 dg.addEventListener('click', function (e) {
 var b = e.target.closest('[data-density-btn]');
 if (b) applyDensity(b.getAttribute('data-density-btn'));
 });
 }

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth >= 1120) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
 setTimeout(renderAllCharts, 60);
 } else {
 var open = document.getElementById('muiSidebar').classList.toggle('open');
 document.getElementById('drawerBackdrop').classList.toggle('open', open);
 }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () {
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 });

 
 

 var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase();
 var list = QUICK_JUMP_INDEX.filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
 jumpPop.innerHTML = list.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
 }).join('');
 jumpPop.classList.toggle('open', list.length > 0);
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
 if (e.key === 'Escape') {
 jumpPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 document.getElementById('ch1ChartTitle').textContent = state.ch1View === 'viewA'
 ? '9M 2025 vs 9M 2026 四大洲区域净营收全面协同增长（$B · SEC Q3 2026 8-K）'
 : 'FY2020–FY2026E 精英编制克制（千人）vs 人均年创收跃迁（$M · Form 10-K）';
 drawCh1Chart();
 });
 });

 document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var p = document.getElementById(this.getAttribute('data-collapse-target'));
 var open = p.classList.toggle('open');
 this.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
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
 if (!state.radarSeries.nflx && !state.radarSeries.aapl && !state.radarSeries.studio) state.radarSeries[key] = true;
 this.classList.toggle('muted', !state.radarSeries[key]);
 drawRadarChart();
 });
 });

 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 var pfBtns = document.querySelectorAll('[data-peer-filter]');
 pfBtns.forEach(function (b) {
 b.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 pfBtns.forEach(function (x) { x.classList.toggle('active', x === b); });
 renderPeerTable();
 });
 });

 var pSlider = document.getElementById('simPrincipalSlider'), ySlider = document.getElementById('simYearsSlider'), cSlider = document.getElementById('simCagrSlider'), dToggle = document.getElementById('simDripToggle');
 pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 ySlider.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 10; state.sim.preset = ''; updateSimulatorUI(); });
 cSlider.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
 dToggle.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });

 document.querySelectorAll('[data-preset]').forEach(function (pb) {
 pb.addEventListener('click', function () {
 var key = this.getAttribute('data-preset'), cfg = PRESETS[key];
 if (!cfg) return;
 state.sim = { principal: cfg.principal, years: cfg.years, priceCagr: cfg.priceCagr, drip: cfg.drip, preset: key };
 pSlider.value = String(cfg.principal); ySlider.value = String(cfg.years); cSlider.value = String(cfg.priceCagr); dToggle.checked = cfg.drip;
 updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]');
 if (!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist(); showToast('已勾选全部 6 项奈飞企业文化核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist(); showToast('核查清单已恢复默认基准状态 (50%)');
 });

 document.querySelectorAll('[data-ch1-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var sk = this.getAttribute('data-ch1-series');
 state.ch1Series[sk] = !state.ch1Series[sk];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
 this.classList.toggle('muted', !state.ch1Series[sk]);
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-eps-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var ek = this.getAttribute('data-eps-series');
 state.epsSeries[ek] = !state.epsSeries[ek];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[ek] = true;
 this.classList.toggle('muted', !state.epsSeries[ek]);
 drawEpsComboChart();
 });
 });

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);

 window.addEventListener('scroll', function () {
 var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxScroll) * 100) + '%';
 }, { passive: true });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 75); });
 renderAllCharts();
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 