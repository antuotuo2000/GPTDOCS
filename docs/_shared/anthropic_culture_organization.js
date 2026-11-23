
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_ant_culture_checks_v1';

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 物理学家式经验主义）：</strong>CSO Jared Kaplan 与首席架构师 Sam McCandlish 正是 2020 年奠定现代大模型时代的《Scaling Laws for Neural Language Models》核心作者——在 Anthropic，安全对齐与前沿预训练共享同一批顶尖物理学家与同一套算力池 <a class="cite-link" href="https://www.anthropic.com/company/leadership" target="_blank" rel="noopener noreferrer">Anthropic Leadership ↗</a>。',
 '<strong>当前选中支柱解读（02 机械可解释性白盒解剖）：</strong>联创 Chris Olah 团队率先在百万参数工业级模型中提取出数千万可解释语义特征（如著名的“金门大桥特征”与欺骗回路检测），让安全审计从“猜谜测试”迈向“神经外科级成像” <a class="cite-link" href="https://www.anthropic.com/transparency" target="_blank" rel="noopener noreferrer">Transparency Hub ↗</a>。',
 '<strong>当前选中支柱解读（03 RSP v3.0 与 ASL 红线熔断）：</strong>S-1/A 第 30 与 53 页明确披露，公司内部测算未来模型可能临近“AI 驱动研发急剧加速”阈值，正推进对关键研发决策强制引入人类审查与批准——绝不为了抢跑而放任无监督递归自我迭代 <a class="cite-link" href="https://www.anthropic.com/news/responsible-scaling-policy-v3" target="_blank" rel="noopener noreferrer">RSP v3.0 ↗</a>。',
 '<strong>当前选中支柱解读（04 反阿谀奉承与原则底线）：</strong>Claude 因拒绝无底线顺从用户错误前提、代码严谨少幻觉而深受高级工程师偏爱；在公司层面，即便面对军方贴标施压，依然坚守不参与大规模监控与全自主杀伤武器的伦理契约 <a class="cite-link" href="https://dealroom.co/news/info-i4toci-how-anthropic-upstaged-openai-on-road-to-blockbuster-ipo/" target="_blank" rel="noopener noreferrer">S-1 披露 ↗</a>。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Empirical Physics Rigor):</strong> CSO Jared Kaplan and Chief Architect Sam McCandlish co-authored the foundational Scaling Laws papers—treating alignment and Constitutional AI with the same mathematical rigor as pre-training <a class="cite-link" href="https://www.anthropic.com/company/leadership" target="_blank" rel="noopener noreferrer">Anthropic Leadership ↗</a>.',
 '<strong>Selected Pillar (02 · Mechanistic Interpretability):</strong> Co-founder Chris Olah\'s team pioneers dictionary learning and sparse autoencoders to map millions of internal neural features—opening the black box rather than relying solely on surface behavioral evals <a class="cite-link" href="https://www.anthropic.com/transparency" target="_blank" rel="noopener noreferrer">Transparency Hub ↗</a>.',
 '<strong>Selected Pillar (03 · RSP v3.0 &amp; ASL Hard Gates):</strong> Per S-1/A Risk Factors (pp. 30 &amp; 53), Anthropic enforces ASL-3 safeguards and mandatory human supervision over critical R&amp;D decisions as models approach accelerated AI R&amp;D thresholds <a class="cite-link" href="https://www.anthropic.com/news/responsible-scaling-policy-v3" target="_blank" rel="noopener noreferrer">RSP v3.0 ↗</a>.',
 '<strong>Selected Pillar (04 · Anti-Sycophancy &amp; Ethical Spine):</strong> From training Claude to be candid rather than sycophantic to refusing mass domestic surveillance and autonomous lethal weapons uses, principled restraint powers enterprise trust <a class="cite-link" href="https://dealroom.co/news/info-i4toci-how-anthropic-upstaged-openai-on-road-to-blockbuster-ipo/" target="_blank" rel="noopener noreferrer">S-1 Review ↗</a>.'
 ];

 var PEER_ROWS = [
 {
 category: 'frontier',
 benchmark: true,
 company: '研究基准：Anthropic, PBC (ANT)',
 leader: 'Dario & Daniela Amodei + 7联创全员',
 positioning: '特拉华州 PBC + LTBT 独立信托 + Class F 50.1% 使命锁死',
 culture: '物理学家经验主义 + 机械可解释性 + RSP v3.0 分级熔断',
 headcount: '~5,300人 · 7/7 联创零流失 · TTM 人效 $6.66M',
 margins: 'Q3\'26 营收 $16.96B · 推导毛利 85.7% · ~900% NRR',
 verdict: '高信任企业 AI 标杆：以零治理内耗与代码能力统治力率先登陆纳斯达克，募资逾千亿美元。',
 sourceLabel: 'SEC 424B4 / S-1/A',
 sourceUrl: 'https://guptadeepak.com/earnings/ipos/company/anthropic/'
 },
 {
 category: 'frontier',
 benchmark: false,
 company: 'OpenAI (拟改制未上市)',
 leader: 'Sam Altman',
 positioning: '非营利母体向 PBC 重组过渡期 · 高估值私募架构',
 culture: '极致产品先发速度 + 超级消费级入口 (ChatGPT) 驱动',
 headcount: '~4,000–5,000+人 · 多名早期联创与安全骨干先后离职',
 margins: '2026.09 净年化营收 ~$50B · 承受庞大免费用户推理成本',
 verdict: '消费级心智绝对霸主，但历史治理震荡与人才流向 Anthropic 使后者在 B2B 编码市场实现反超。',
 sourceLabel: 'Dealroom 对比',
 sourceUrl: 'https://dealroom.co/news/info-i4toci-how-anthropic-upstaged-openai-on-road-to-blockbuster-ipo/'
 },
 {
 category: 'giant',
 benchmark: false,
 company: 'Google DeepMind (GOOGL)',
 leader: 'Demis Hassabis (诺奖得主)',
 positioning: 'Alphabet 核心合并研究院 + 自有全栈 TPU 基础设施',
 culture: '诺奖级基础科学突破 (AlphaFold) + 搜索/Workspace 生态分发',
 headcount: '数千名顶尖研究员 · 背靠 Alphabet 18万+ 全球体系',
 margins: 'Alphabet TTM 营收 $445.9B · 毛利率 60.9%',
 verdict: '科学底蕴与自有芯片实力深厚，既是 Anthropic ~15% 大股东与 TPU 债主，也是头号全栈竞品。',
 sourceLabel: 'S-1 同行对比表',
 sourceUrl: 'https://sec-api.io/insights/anthropic-ant-s-1-and-s-1-a-ipo-filings-analysis-q3-2026-revenue-17-0bn-and-895bn-compute-commitments'
 },
 {
 category: 'giant',
 benchmark: false,
 company: 'NVIDIA (NVDA)',
 leader: '黄仁勋 (Jensen Huang)',
 positioning: '超扁平 ~60 高管直报 CEO + 软硬一体 CUDA 算力帝国',
 culture: '光速执行 + Top-5 全透明邮件 + 零事业部利润墙',
 headcount: '~4.2万人 · TTM 人均创收 ~$7.2M',
 margins: 'TTM 营收 $303.0B · 毛利率 74.7% · 营业利润率 65.2%',
 verdict: '算力时代最高效硬件组织，参与认购 Anthropic IPO 同步私募并通过云伙伴向其供应前沿 GPU。',
 sourceLabel: 'NVDA 10-Q / S-1',
 sourceUrl: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/'
 },
 {
 category: 'giant',
 benchmark: false,
 company: 'Meta AI / FAIR (META)',
 leader: 'Mark Zuckerberg',
 positioning: '创始人超级投票权控制 + 广告现金牛反哺开源大模型',
 culture: '黑客文化 (Move Fast) + 开放权重生态商品化互补品策略',
 headcount: '~7.4万人全集团 · TTM 人均创收 ~$3.26M',
 margins: 'TTM 营收 $241.6B · 毛利率 81.0% · 营业利润率 32.9%',
 verdict: '开源生态普及推手，迫使闭源实验室必须持续在前沿编码与复杂长程推理上保持至少半代以上代差。',
 sourceLabel: 'META 10-Q / S-1',
 sourceUrl: 'https://sec-api.io/insights/anthropic-ant-s-1-and-s-1-a-ipo-filings-analysis-q3-2026-revenue-17-0bn-and-895bn-compute-commitments'
 }
 ];

 var CHECKLIST_ITEMS = [
 {
 tag: 'LTBT 独立性',
 title: '1. 独立信托制衡测试：LTBT 受托人是否保持 100% 财务无利益关联并掌握过半席位？',
 desc: '核查上市后 Long-Term Benefit Trust 的受托人换届与 Class T 董事履职记录，确保商业股价压力未侵蚀安全否决权。'
 },
 {
 tag: '7/7 联创凝聚',
 title: '2. 核心科研班底留存测试：七位联合创始人与对齐领军学者是否稳定在岗？',
 desc: '跟踪 365 天锁定期（2027年11月）满后联创团队及对齐/可解释性核心带头人的留存率与研发专注度。'
 },
 {
 tag: 'RSP 硬约束',
 title: '3. RSP 能力红线执行测试：面对竞争压力时是否仍敢暂缓未达标高危模型？',
 desc: '观察未来模型触及 AI R&D 加速或生物/网安高危阈值时，是否如 Project Glasswing 一样严格执行分级受控发布。'
 },
 {
 tag: '>80% 新模鲜度',
 title: '4. 研究向产品转化速度测试：Anthropic Labs 能否维持半年内新模型贡献 >80% 营收？',
 desc: '核查双核架构扩编至 5,000–10,000 人后，是否避免大公司流程僵化，持续在编码与桌面代理基准上领跑。'
 },
 {
 tag: '~900% NRR 质量',
 title: '5. 企业净留存与算力回本测试：长协算力并网后调整后营利率是否稳居 20%+？',
 desc: '检验 Google TPU、AWS Trainium 与 Broadcom 长协交付后，算力占收比是否由 Q3 的 58% 如期回落。'
 },
 {
 tag: '5%+2% 公益兑现',
 title: '6. 公益基金与配捐透明度测试：市值跨里程碑后是否如约增发公益股份？',
 desc: '跟踪 Anthropic Public Benefit Fund（初始 8.468亿股）的资金投向透明度与里程碑增发承诺兑现情况。'
 }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '$6.66M TTM人效 · 7联创 100% 在岗 · 5% 公益基金' },
 { sec: 'sec-01', title: '01 双核架构与五层股权治理', sub: 'Dario × Daniela · Class F 50.1% · LTBT 过半董事' },
 { sec: 'sec-02', title: '02 四大文化支柱与安全护城河', sub: 'Constitutional AI · 机械可解释性 · RSP v3.0 雷达图' },
 { sec: 'sec-03', title: '03 全球 AI 实验室文化横向对比', sub: 'Anthropic vs OpenAI vs DeepMind vs NVIDIA vs Meta' },
 { sec: 'sec-04', title: '04 安全溢价、盈利拐点与复利推演', sub: 'Q3 调整后营利 +$2.46B · 价值与公益基金模拟器' },
 { sec: 'sec-05', title: '05 三幕演进与四大战役复盘', sub: '2021出走 · Claude Code核爆 · Glasswing受控防御' },
 { sec: 'sec-06', title: '06 安全飞轮组织诊断核查清单', sub: '6 项上市后治理与科研密度持久化核查' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC Form 424B4 / S-1/A · RSP v3.0 · 官方文献' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 5, priceCagr: 24.0, drip: true },
 p2: { principal: 10000, years: 6, priceCagr: 158.0, drip: false },
 p3: { principal: 10000, years: 8, priceCagr: 28.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { ant: true, oai: true, bigtech: true },
 epsSeries: { eps: true, oci: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 10000, years: 5, priceCagr: 24.0, drip: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
 function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

 var toastTimer = null;
 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg;
 el.classList.add('show');
 if (toastTimer) clearTimeout(toastTimer);
 toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
 }

 function isEn() { return state.lang === 'en'; }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIcon = document.getElementById('appbarThemeIcon');
 if (abIcon) {
 abIcon.innerHTML = state.theme === 'dark'
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 var sDark = document.getElementById('sideThemeDarkBtn'), sLight = document.getElementById('sideThemeLightBtn');
 if (sDark && sLight) {
 sDark.classList.toggle('active', state.theme === 'dark');
 sLight.classList.toggle('active', state.theme === 'light');
 }
 safeSet(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色阅读模式');
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 document.documentElement.lang = isEn() ? 'en' : 'zh-CN';
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB && enB) {
 zhB.classList.toggle('active', !isEn());
 enB.classList.toggle('active', isEn());
 zhB.setAttribute('aria-pressed', String(!isEn()));
 enB.setAttribute('aria-pressed', String(isEn()));
 }
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(isEn() ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
 else nodes[i].textContent = val;
 }
 }
 var pNote = document.getElementById('pillarFocusNote');
 if (pNote) {
 pNote.innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[state.activePillar] + '</div>';
 }
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 safeSet(STORAGE_LANG_KEY, state.lang);
 if (!silent) showToast(isEn() ? 'Switched to English UI' : '已切换至中文界面');
 }

 // Suite Hub Filter & Safe Toast Navigation
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
 var item = e.target.closest('[data-suite-file]');
 if (item) {
 var fn = item.getAttribute('data-suite-file');
 if (item.classList.contains('active')) window.scrollTo({ top: 0, behavior: 'smooth' });
 else showToast('同套独立网页文件：' + fn + '（请在已下载的四件套中打开）');
 }
 });
 }
 document.querySelectorAll('[data-suite-jump]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 showToast('Anthropic 深度研究四件套 · 第 03 篇：企业文化与组织架构深度研究报告');
 });
 });

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
 var filtered = PEER_ROWS.filter(function (row) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var hay = (row.company + ' ' + row.leader + ' ' + row.positioning + ' ' + row.culture + ' ' + row.headcount + ' ' + row.margins + ' ' + row.verdict).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 if (badge) badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆机构';
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配的标杆机构，请尝试其他关键词。</td></tr>';
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
 // Count +50% share price milestones reached over holding horizon
 var grossMult = Math.pow(1 + cagr / 100, yrs);
 var milestones = Math.max(0, Math.floor(Math.log(Math.max(1, grossMult)) / Math.log(1.5)));
 var dilutionFactor = state.sim.drip ? Math.pow(0.985, milestones) : 1.0;
 var netMult = grossMult * dilutionFactor;
 var endingValue = p * netMult;
 var netCagr = (Math.pow(netMult, 1 / yrs) - 1) * 100;
 var midYear = Math.max(1, Math.floor(yrs / 2));
 var midVal = p * Math.pow(1 + netCagr / 100, midYear);
 // Public Benefit Fund starts at 5% of ~$1.5T = $75B and grows with enterprise value + milestone issuances
 var pbfPct = 0.05 + (state.sim.drip ? milestones * 0.015 : 0);
 var pbfB = Math.min(9999, 1500 * grossMult * pbfPct);

 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + ' 年';
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
 document.getElementById('simMoicVal').textContent = (netMult >= 100 ? netMult.toFixed(0) : netMult.toFixed(2)) + 'x · ' + netCagr.toFixed(1) + '%';
 document.getElementById('simBenefitVal').textContent = pbfB >= 1000 ? ('$' + (pbfB / 1000).toFixed(2) + 'T') : ('$' + Math.round(pbfB) + 'B');
 document.getElementById('simMidLabel').textContent = '第 ' + midYear + ' 年中期资产节点';
 document.getElementById('simMidVal').textContent = formatCurrency(midVal);

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
 '</div>' +
 '</label>';
 }).join('');
 }

 // High-DPI Retina Canvas Engine
 function getPalette() {
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
 tick: isDark ? '#94A3B8' : '#475569',
 text: isDark ? '#F3F6F9' : '#0F172A',
 sub: isDark ? '#B2BAC2' : '#334155',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: isDark ? '#3399FF' : '#0073E6',
 c2: isDark ? '#22C55E' : '#16A34A',
 c3: isDark ? '#FFB74D' : '#D97706',
 c4: isDark ? '#A78BFA' : '#7C3AED',
 red: isDark ? '#FF6B6B' : '#DC2626'
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

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];

 if (state.ch1View === 'viewA') {
 var pad = { top: 28, right: 20, bottom: 40, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var qs = ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var rev = [0.38, 0.79, 1.38, 2.04, 4.73, 11.56, 16.96];
 var comp = [0.94, 1.39, 2.05, 2.95, 3.39, 5.56, 9.86];
 var maxY = 19;

 for (var g = 0; g <= 4; g++) {
 var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 7, gy + 4);
 }
 var step = pw / qs.length, bw = Math.min(28, Math.max(12, step * 0.28));
 qs.forEach(function (q, i) {
 var cx = pad.left + step * (i + 0.5);
 if (state.ch1Series.s1) {
 var h1 = (rev[i] / maxY) * ph, y1 = pad.top + ph - h1;
 var x1 = state.ch1Series.s2 ? cx - bw - 2 : cx - bw / 2;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, x1, y1, bw, h1, 4); ctx.fill();
 if (i >= 4) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + rev[i].toFixed(1) + 'B', x1 + bw / 2, y1 - 6);
 }
 }
 if (state.ch1Series.s2) {
 var h2 = (comp[i] / maxY) * ph, y2 = pad.top + ph - h2;
 var x2 = state.ch1Series.s1 ? cx + 2 : cx - bw / 2;
 ctx.fillStyle = pal.c3;
 roundRectPath(ctx, x2, y2, bw, h2, 4); ctx.fill();
 }
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(q, cx, pad.top + ph + 20);
 hitRegions.chartCh1.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 26,
 html: '<strong>' + q + ' S-1/A 季度对比</strong><br/>• 确认总营收：<strong>$' + rev[i].toFixed(2) + 'B</strong><br/>• 总算力与基建：<strong>$' + comp[i].toFixed(2) + 'B</strong>'
 });
 });
 } else {
 var padB = { top: 28, right: 54, bottom: 38, left: 50 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var nodes = ['2023年末', '2024年末', '2025.09', '2025年末', '2026.09 (TTM)', 'Q3\'26年化'];
 var fteK = [0.40, 1.05, 1.96, 2.30, 5.30, 5.30];
 var revFte = [0.10, 0.37, 1.40, 2.00, 6.66, 12.80];
 var maxK = 6.5, maxR = 14.5;

 for (var j = 0; j <= 4; j++) {
 var ry = padB.top + phB - (j / 4) * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, ry); ctx.lineTo(padB.left + pwB, ry); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText((maxK * j / 4).toFixed(1) + 'k', padB.left - 7, ry + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText('$' + (maxR * j / 4).toFixed(1) + 'M', padB.left + pwB + 7, ry + 4);
 }
 var stB = pwB / nodes.length, bW = Math.min(36, stB * 0.42);
 var pts = [];
 nodes.forEach(function (nd, k) {
 var cx = padB.left + stB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bh = (fteK[k] / maxK) * phB, by = padB.top + phB - bh;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, cx - bW / 2, by, bW, bh, 5); ctx.fill();
 }
 var ly = padB.top + phB - (revFte[k] / maxR) * phB;
 pts.push({ x: cx, y: ly, v: revFte[k] });
 ctx.fillStyle = pal.tick; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(nd, cx, padB.top + phB + 20);
 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stB * k, y: padB.top, w: stB, h: phB + 26,
 html: '<strong>' + nd + '</strong><br/>• 全职团队规模：<strong>~' + Math.round(fteK[k] * 1000).toLocaleString() + ' 人</strong><br/>• 人均创收水平：<strong>$' + revFte[k].toFixed(2) + 'M / 人</strong>'
 });
 });
 if (state.ch1Series.s2) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
 ctx.stroke();
 pts.forEach(function (pt, idx) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx >= 3) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + pt.v.toFixed(1) + 'M', pt.x, pt.y - 8);
 }
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = ['安全治理锁死', '可解释性白盒度', '企业编码统治力', '联创班底凝聚力', '多云算力中立性'];
 var series = [
 { key: 'ant', color: pal.c1, fill: 'rgba(51, 153, 255, 0.22)', vals: [9.8, 9.9, 9.7, 9.9, 9.6] },
 { key: 'oai', color: pal.c2, fill: 'rgba(34, 197, 94, 0.14)', vals: [6.8, 7.5, 8.9, 5.5, 6.2] },
 { key: 'bigtech', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [7.4, 7.8, 7.9, 7.2, 5.0] }
 ];
 var cx = w / 2, cy = h / 2 + 8;
 var radius = Math.max(60, Math.min((w - 190) / 2, h * 0.35));
 var total = axes.length;

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
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 34, y: Math.min(ay, ly) - 20, w: 68 + Math.abs(lx - ax), h: 40,
 html: '<strong>' + axes[a] + '</strong><br/>• Anthropic: <strong>' + series[0].vals[a] + '</strong> · OpenAI: <strong>' + series[1].vals[a] + '</strong> · 大厂AI部: <strong>' + series[2].vals[a] + '</strong>'
 });
 }
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 s.vals.forEach(function (v, idx) {
 var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
 var vx = cx + Math.cos(th) * (v / 10) * radius, vy = cy + Math.sin(th) * (v / 10) * radius;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 });
 ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { label: 'Q3 2026 推导推理毛利率 Derived Gross Margin', val: 85.7, col: '#16A34A', sub: '推理直接履约成本仅占 14.3%', note: 'S-1/A 附注 8 职能拆分推导口径（9M 2026 为 85.5%）' },
 { label: '超十万美元企业大客贡献 TTM 营收占比', val: 74.0, col: '#0073E6', sub: '11,900+ 家企业贡献 $26.1B', note: '机构级 B2B 基本盘稳固，非短期消费猎奇流量' },
 { label: '9M 2026 研发费用占总营收比重 R&D Intensity', val: 57.9, col: '#7C3AED', sub: '$19.24B / $33.24B', note: '前沿模型预训练算力与顶尖研究员薪酬全力投入未来代差' },
 { label: '9M 2026 自由现金流利润率 FCF Margin', val: 17.0, col: '#16A34A', sub: '+$5.64B / $33.24B', note: '经营现金流 +$6.57B 减去极轻设备开支 $0.93B' },
 { label: 'Q3 2026 Non-GAAP 调整后营业利润率', val: 15.0, col: '#0284C7', sub: '+$2.46B / $16.96B (Q2达 19%)', note: '即使消化 $5.0B 短期高价扩容算力仍保持可观经营盈利' },
 { label: 'Q3 2026 销售、市场与渠道合作费率 S&M %', val: 14.0, col: '#D97706', sub: '由 Q1\'26 的 22.0% 快速回落', note: '~900% NRR 自然裂变与直连 API 比例提升大幅摊薄获客成本' }
 ];
 var pad = { top: 12, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 95;
 var rowH = ph / items.length;

 items.forEach(function (it, i) {
 var rowTop = pad.top + rowH * i;
 var labelY = rowTop + rowH * 0.36;
 var barY = rowTop + rowH * 0.52, barH = Math.min(14, rowH * 0.25);
 var bw = Math.max(8, (it.val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.label, pad.left, labelY);
 ctx.fillStyle = it.col; ctx.font = '800 12px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, labelY);
 if (w >= 560) {
 ctx.fillStyle = pal.tick; ctx.font = '500 10.5px "IBM Plex Mono", sans-serif';
 ctx.fillText(it.sub, pad.left + pw - 58, labelY);
 }
 ctx.fillStyle = pal.trackBg;
 roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
 ctx.fillStyle = it.col;
 roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();
 hitRegions.chartBars.push({
 idx: i, x: pad.left, y: rowTop, w: pw, h: rowH,
 html: '<strong>' + it.label + '：' + it.val.toFixed(1) + '%</strong><br/>• ' + it.sub + '<br/>• ' + it.note
 });
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var qs = ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var adjOp = [-0.83, -1.02, -1.28, -1.72, -0.62, 2.24, 2.46];
 var adjMargin = [-221, -129, -93, -84, -13, 19, 15];

 var pad = { top: 26, right: 50, bottom: 38, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var minOp = -2.2, maxOp = 3.2;
 var minM = -240, maxM = 40;

 var zeroY = pad.top + ph - ((0 - minOp) / (maxOp - minOp)) * ph;
 ctx.strokeStyle = pal.c3; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke(); ctx.setLineDash([]);

 for (var g = 0; g <= 4; g++) {
 var r = g / 4, gy = pad.top + ph - r * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText('$' + (minOp + r * (maxOp - minOp)).toFixed(1) + 'B', pad.left - 6, gy + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText(Math.round(minM + r * (maxM - minM)) + '%', pad.left + pw + 6, gy + 4);
 }

 var step = pw / qs.length, barW = Math.min(38, step * 0.44);
 var pts = [];
 qs.forEach(function (q, i) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var valY = pad.top + ph - ((adjOp[i] - minOp) / (maxOp - minOp)) * ph;
 var bTop = Math.min(zeroY, valY), bH = Math.max(3, Math.abs(zeroY - valY));
 ctx.fillStyle = adjOp[i] >= 0 ? pal.c1 : pal.red;
 roundRectPath(ctx, cx - barW / 2, bTop, barW, bH, 4); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText((adjOp[i] >= 0 ? '+$' : '-$') + Math.abs(adjOp[i]).toFixed(2) + 'B', cx, adjOp[i] >= 0 ? bTop - 6 : bTop + bH + 12);
 }
 var my = pad.top + ph - ((adjMargin[i] - minM) / (maxM - minM)) * ph;
 pts.push({ x: cx, y: my, m: adjMargin[i] });
 ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(q, cx, pad.top + ph + 22);
 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
 html: '<strong>' + q + ' 盈利能力拐点</strong><br/>• Non-GAAP 调整后营业利润：<strong>' + (adjOp[i] >= 0 ? '+$' : '-$') + Math.abs(adjOp[i]).toFixed(2) + 'B</strong><br/>• 调整后营业利润率：<strong>' + adjMargin[i] + '%</strong>'
 });
 });

 if (state.epsSeries.oci) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
 pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
 ctx.stroke();
 pts.forEach(function (pt) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill();
 });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years, gRate = state.sim.priceCagr / 100;
 var netSeries = [], grossSeries = [];
 for (var y = 0; y <= yrs; y++) {
 var gm = Math.pow(1 + gRate, y);
 var ms = Math.max(0, Math.floor(Math.log(Math.max(1, gm)) / Math.log(1.5)));
 var dil = state.sim.drip ? Math.pow(0.985, ms) : 1.0;
 grossSeries.push(p * gm);
 netSeries.push(p * gm * dil);
 }
 var maxVal = Math.max(grossSeries[yrs], p * 1.2) * 1.08;
 var pad = { top: 20, right: 20, bottom: 26, left: 62 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 var lbl = v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k');
 ctx.fillText(lbl, pad.left - 7, gy + 4);
 }
 var stepX = pw / yrs;
 ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.6; ctx.beginPath();
 grossSeries.forEach(function (gv, i) {
 var px = pad.left + stepX * i, py = pad.top + ph - (gv / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke(); ctx.setLineDash([]);

 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 netSeries.forEach(function (nv, i) {
 var px = pad.left + stepX * i, py = pad.top + ph - (nv / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 netSeries.forEach(function (nv, t) {
 var tx = pad.left + stepX * t, ty = pad.top + ph - (nv / maxVal) * ph;
 if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + t, tx, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({
 idx: t, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 20,
 html: '<strong>第 ' + t + ' 年持仓推演</strong><br/>• 股东净持仓价值：<strong>' + formatCurrency(nv) + '</strong><br/>• 未摊薄企业价值基准：<strong>' + formatCurrency(grossSeries[t]) + '</strong>'
 });
 });
 }

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawHorizontalBars();
 drawEpsComboChart();
 drawSimChart();
 }

 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 canvas.addEventListener('mousemove', function (e) {
 var rect = canvas.getBoundingClientRect();
 var x = e.clientX - rect.left, y = e.clientY - rect.top;
 var regions = hitRegions[canvasId] || [], matched = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
 }
 if (matched) {
 tip.innerHTML = matched.html;
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }

 

 function init() {
 var savedTheme = (safeGet(STORAGE_THEME_KEY) || '').replace(/^"|"$/g, '');
 if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
 var savedLang = (safeGet(STORAGE_LANG_KEY) || '').replace(/^"|"$/g, '');
 if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;
 var savedChecks = safeGet(STORAGE_CHECK_KEY);
 if (savedChecks) {
 try {
 var parsed = JSON.parse(savedChecks);
 if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) state.checks = parsed.map(Boolean);
 } catch (e) {}
 }

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 
 
 
 

 var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 safeSet(STORAGE_SIDEBAR_KEY, col ? '0' : '1');
 setTimeout(renderAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 document.querySelectorAll('#tocNavList .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
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
 else if (e.key === 'Escape') { jumpPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
 });

 document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 document.getElementById('ch1ChartTitle').textContent = state.ch1View === 'viewA'
 ? 'Q1 2025 – Q3 2026 七季度实收营收 vs 总算力基建投入跃迁（$B · SEC S-1/A）'
 : '2023 – 2026 精英团队扩编（千人）vs 人均年化创收飙升（$M · S-1）';
 drawCh1Chart();
 });
 });

 document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var panel = document.getElementById(this.getAttribute('data-collapse-target'));
 if (!panel) return;
 var open = panel.classList.toggle('open');
 this.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
 });
 });

 var pillarCards = document.querySelectorAll('[data-pillar]');
 pillarCards.forEach(function (card) {
 card.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 pillarCards.forEach(function (c, k) { c.classList.toggle('active', k === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[idx] + '</div>';
 drawRadarChart();
 });
 });

 document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
 pill.addEventListener('click', function () {
 var key = this.getAttribute('data-radar-key');
 state.radarSeries[key] = !state.radarSeries[key];
 if (!state.radarSeries.ant && !state.radarSeries.oai && !state.radarSeries.bigtech) state.radarSeries[key] = true;
 this.classList.toggle('muted', !state.radarSeries[key]);
 drawRadarChart();
 });
 });

 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 var peerFilterBtns = document.querySelectorAll('[data-peer-filter]');
 peerFilterBtns.forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 peerFilterBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
 renderPeerTable();
 });
 });

 var pSlider = document.getElementById('simPrincipalSlider');
 var ySlider = document.getElementById('simYearsSlider');
 var cSlider = document.getElementById('simCagrSlider');
 var dToggle = document.getElementById('simDripToggle');
 pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 ySlider.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 5; state.sim.preset = ''; updateSimulatorUI(); });
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
 state.checks[parseInt(input.getAttribute('data-check-input'), 10)] = !!input.checked;
 safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast('已勾选全部 6 项核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast('核查清单已恢复默认状态 (50%)');
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

 window.addEventListener('scroll', function () {
 var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxScroll) * 100) + '%';
 }, { passive: true });

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);
 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 70); });
 renderAllCharts();
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 