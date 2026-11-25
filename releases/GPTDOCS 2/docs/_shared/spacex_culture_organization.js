
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_spcx_culture_checks_v1';

 var PILLAR_NOTES_ZH = [
 '<strong>当前选中支柱解读（01 马斯克五步工程算法）：</strong>在星舰与星链每一次产能突击（Surge）会上，马斯克反复追问“是谁规定的这条冗余安全系数？”——星舰直接砍掉传统沉重着陆腿、改用发射塔机械臂空中夹取（Flight 15 成功兑现），正是“最好的零件就是没有零件”哲学的巅峰之作 <a class="cite-link" href="https://www.corporate-rebels.com/blog/musks-algorithm-to-cut-bureaucracy" target="_blank" rel="noopener noreferrer">The Algorithm 拆解 ↗</a>。',
 '<strong>当前选中支柱解读（02 第一性原理与白痴指数）：</strong>当航空供应商对单套星载无线电或推进阀门报价超过 $100,000 时，SpaceX 工程师直接拆解铝材与工业芯片成本，内部自研将成本压至 $5,000 以下，使全公司核心硬件自制率超过 80%。',
 '<strong>当前选中支柱解读（03 责任工程师 RE 制度）：</strong>不同于传统大厂设计、采购、质检各自免责，SpaceX 的 RE 对所辖部件终身负责；同时严禁金字塔式逐级传话，一线技术员可直接向副总裁或首席工程师发起跨级排障沟通 <a class="cite-link" href="https://orgtree.app/org-chart-examples/spacex-org-chart" target="_blank" rel="noopener noreferrer">扁平汇报链 ↗</a>。',
 '<strong>当前选中支柱解读（04 硬件敏捷试飞文化）：</strong>从猎鹰 9 号早期多次海上回收甲板爆炸，到星舰历经 15 次综合试飞最终攻克二级飞船陆地机械臂捕获，SpaceX 用快速制造真箭实测跑赢了传统军工耗时十余年的仿真论证 <a class="cite-link" href="https://www.spacex.com/launches/starship-flight-15" target="_blank" rel="noopener noreferrer">Flight 15 纪实 ↗</a>。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · The 5-Step Algorithm):</strong> Every requirement must carry a named person rather than a department. Deleting Starship landing legs in favor of Mechazilla tower chopsticks—validated on Flight 15 (Nov 2026)—embodies "the best part is no part" <a class="cite-link" href="https://www.corporate-rebels.com/blog/musks-algorithm-to-cut-bureaucracy" target="_blank" rel="noopener noreferrer">Algorithm Study ↗</a>.',
 '<strong>Selected Pillar (02 · First Principles &amp; Idiot Index):</strong> By comparing finished aerospace quotes against raw stainless steel, aluminum, and silicon commodity costs, SpaceX brought >80% of propulsion, avionics, and phased-array manufacturing in-house at 10x lower cost.',
 '<strong>Selected Pillar (03 · Responsible Engineer Ownership):</strong> Every valve, board, or Raptor sub-assembly has one named Responsible Engineer (RE) owning design, shop-floor build, and flight telemetry—with direct skip-level communication across 4–5 flat layers.',
 '<strong>Selected Pillar (04 · Hardware-Rich Iterative Testing):</strong> Rather than spending a decade on paper reviews, SpaceX builds flight hardware rapidly at Starbase—iterating across 15 integrated Starship flights to achieve orbital V3 deployment and upper-stage tower catch.'
 ];

 var PEER_ROWS_ZH = [
 {
 category: 'flat', benchmark: true,
 company: '研究基准：SpaceX (NASDAQ: SPCX)',
 leader: '埃隆·马斯克 (CEO/首席工程师) × 格温·肖特维尔 (总裁/COO)',
 positioning: '双核统御 + 超扁平职能制 + >80% 垂直自造工厂',
 culture: '五步工程算法 + 白痴指数砍成本 + 责任工程师(RE) + 硬件敏捷试飞',
 headcount: '22,621人 · 年化人均创收 $2.58M',
 margins: 'Q3 26 营收 $14.58B · 营业利润 $2.79B (星链 OPM 45.1%)',
 verdict: '人类航天与基建效率极限：凭不到波音 1/8 的人力包揽全球 >85% 入轨质量，并融合 xAI/Cursor 开启轨道算力新纪元。',
 sourceLabel: 'SEC Q3 26 10-Q', sourceUrl: 'https://www.crowdfundedwealth.com/articles/spacex-10-q-q3-2026-ai-segment-starlink-revenue'
 },
 {
 category: 'flat', benchmark: false,
 company: '英伟达 (NVIDIA · NVDA)',
 leader: '黄仁勋 (Jensen Huang)',
 positioning: '超扁平蛛网架构 (~60高管直报CEO) + 软硬全栈无事业部墙',
 culture: '光速执行 (Speed of Light) + Top-5 全透明邮件 + 零官僚内耗',
 headcount: '~42,000人 (研发 ~74%) · 人均创收 ~$5.14M',
 margins: 'FY26 营收 $215.9B · GAAP 毛利率 71.1% · 净利 $120.1B',
 verdict: '硅片界的同频共振者：与 SpaceX 同样厌恶层级汇报与事业部藩篱，且是 SpaceX 地面与 2028 轨道 AI 卫星的核心算力伙伴。',
 sourceLabel: 'NVIDIA FY26 Stats', sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'flat', benchmark: false,
 company: '特斯拉 (Tesla · TSLA)',
 leader: '埃隆·马斯克 (CEO)',
 positioning: '第一性原理垂直制造 + 一体压铸自动化超级工厂',
 culture: '同源马斯克五步工程算法 + 产线驻场突击 + 软硬端到端 AI',
 headcount: '134,785人 · 人均创收 ~$0.70M',
 margins: 'FY25 营收 $94.83B · GAAP 营业利润 $4.4B · 26E CapEx ~$20B',
 verdict: '同源文化孪生体：共享材料学团队与 Megapack 能源基建，且 SpaceX 董事会已成立特别委员会研究潜在合并可能。',
 sourceLabel: 'SEC TSLA 10-K', sourceUrl: 'https://backlinko.com/tesla-stats'
 },
 {
 category: 'flat', benchmark: false,
 company: '火箭实验室 (Rocket Lab · RKLB)',
 leader: '彼得·贝克 (Peter Beck · 工程师创始人)',
 positioning: '轻中型可复用火箭 + 垂直整合卫星平台组件端到端模式',
 culture: '工程师创始人领衔 + 碳纤维复合材料自制 + 快速发射响应',
 headcount: '2,600+人 · Q3 26 年化人效 ~$0.41M',
 margins: 'Q3 26 创纪录营收 $267.8M (+73% YoY) · GAAP 毛利率 33.6%',
 verdict: '商业航天最稳健追赶者：完全复刻 SpaceX“火箭+卫星系统”垂直整合逻辑，正全力攻坚中大型可复用火箭 Neutron。',
 sourceLabel: 'SEC RKLB Q3 26', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1819994/000181999426000073/rklb-11092026ex991.htm'
 },
 {
 category: 'legacy', benchmark: false,
 company: '波音与洛克希德传统军工体系 (BA / LMT)',
 leader: '罗伯特·奥特伯格 (BA) / 吉姆·泰克莱特 (LMT)',
 positioning: '多事业部矩阵 (BCA/BDS 等) + 全球数千家多级分包商网络',
 culture: '瀑布流长周期纸面评审 + 历史成本加成惯性 + 严密合规层级',
 headcount: '波音 ~18.2万 ($0.49M/人) · 洛马 ~12.2万 ($0.61M/人)',
 margins: '2025 波音营收 $89.5B (净利 $2.23B) · 洛马 $75.0B (净利 $5.0B)',
 verdict: '组织制度的反面参照系：层层外包导致供应链白痴指数极高，一旦转入固定总价合同（如 Starliner）即遭遇严重延期与超支亏损。',
 sourceLabel: 'BA & LMT Filings', sourceUrl: 'https://investors.lockheedmartin.com/news-releases/news-release-details/lockheed-martin-reports-fourth-quarter-and-full-year-2025/'
 }
 ];

 var PEER_ROWS_EN = [
 {
 category: 'flat', benchmark: true,
 company: 'Benchmark: SpaceX (NASDAQ: SPCX)',
 leader: 'Elon Musk (CEO/Chief Eng) × Gwynne Shotwell (President/COO)',
 positioning: 'Dual-Core Stewardship + Ultra-Flat Org + >80% In-House Factories',
 culture: '5-Step Algorithm + Idiot Index + Responsible Engineer (RE) + Flight Sprints',
 headcount: '22,621 FTE · $2.58M Annualized Q3 Rev / FTE',
 margins: 'Q3 26 Rev $14.58B · OpInc $2.79B (Starlink OPM 45.1%)',
 verdict: 'Aerospace-AI benchmark: delivers >85% of global orbital mass with <1/8 of Boeing\'s workforce while scaling Grok, Cursor & StarMind.',
 sourceLabel: 'SEC Q3 26 10-Q', sourceUrl: 'https://www.crowdfundedwealth.com/articles/spacex-10-q-q3-2026-ai-segment-starlink-revenue'
 },
 {
 category: 'flat', benchmark: false,
 company: 'NVIDIA (NVDA)',
 leader: 'Jensen Huang',
 positioning: 'Ultra-flat 60-direct-report web + unified silicon/CUDA stack',
 culture: 'Speed-of-light execution + Top-5 email transparency + zero unit silos',
 headcount: '~42,000 FTE (~74% R&D) · ~$5.14M Rev / FTE',
 margins: 'FY26 Rev $215.9B · 71.1% GAAP GM · Net Inc $120.1B',
 verdict: 'Silicon soulmate: shares SpaceX\'s disdain for divisional hierarchy and supplies GPUs for SpaceX\'s 1.7GW SI & 2028 orbital AI satellites.',
 sourceLabel: 'NVIDIA FY26 Stats', sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'flat', benchmark: false,
 company: 'Tesla (TSLA)',
 leader: 'Elon Musk',
 positioning: 'First-principles Gigafactory integration + EV/Energy/Autonomy',
 culture: 'Shared 5-Step Algorithm + shop-floor surges + end-to-end AI',
 headcount: '134,785 FTE · ~$0.70M Rev / FTE',
 margins: 'FY25 Rev $94.83B · GAAP OpInc $4.4B · 26E CapEx ~$20B',
 verdict: 'Cultural twin: shares materials engineering and Megapack supply; SpaceX formed a board committee in Oct 2026 to study a potential combination.',
 sourceLabel: 'SEC TSLA 10-K', sourceUrl: 'https://backlinko.com/tesla-stats'
 },
 {
 category: 'flat', benchmark: false,
 company: 'Rocket Lab (RKLB)',
 leader: 'Peter Beck (Founder-Engineer)',
 positioning: 'Small/medium launch + vertically integrated Space Systems',
 culture: 'Founder-engineer led + in-house composites & spacecraft components',
 headcount: '2,600+ FTE · ~$0.41M Annualized Q3 Rev / FTE',
 margins: 'Q3 26 Record Rev $267.8M (+73% YoY) · 33.6% GAAP GM',
 verdict: 'Closest New-Space peer: mirrors SpaceX\'s launch + satellite vertical playbook while developing reusable medium-lift Neutron.',
 sourceLabel: 'SEC RKLB Q3 26', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1819994/000181999426000073/rklb-11092026ex991.htm'
 },
 {
 category: 'legacy', benchmark: false,
 company: 'Legacy Aerospace Primes (Boeing BA / Lockheed LMT)',
 leader: 'Kelly Ortberg (BA) / Jim Taiclet (LMT)',
 positioning: 'Multi-division matrices + multi-tier subcontractor pyramids',
 culture: 'Waterfall paper reviews + Cost-Plus heritage + heavy compliance layers',
 headcount: 'BA ~182k ($0.49M/FTE) · LMT ~122k ($0.61M/FTE)',
 margins: 'FY25 BA Rev $89.5B (Net $2.23B) · LMT Rev $75.0B (Net $5.0B)',
 verdict: 'Structural foil: deep outsourcing inflates the Idiot Index and triggers severe overruns under fixed-price contracts like Starliner.',
 sourceLabel: 'BA & LMT Filings', sourceUrl: 'https://investors.lockheedmartin.com/news-releases/news-release-details/lockheed-martin-reports-fourth-quarter-and-full-year-2025/'
 }
 ];

 var CHECKLIST_ZH = [
 { tag: '实名质疑需求', title: '1. 需求实名制测试：每条技术约束能否追溯到具体个人而非“某部门”？', desc: '核查工程评审是否强制要求所有安全冗余与流程规定挂钩具体工程师姓名，随时按物理学第一性原理重新质询。' },
 { tag: '10% 加回铁律', title: '2. 残酷删除测试：团队是否敢于砍掉零件，直到被迫加回约 10%？', desc: '对标星舰砍掉着陆腿改用发射塔夹取，检验研发团队是在“做减法删结构”还是在不断叠加复杂的补丁机构。' },
 { tag: '白痴指数 <3x', title: '3. 白痴指数测试：核心部件采购价与原材料成本之比是否被极致压缩？', desc: '排查是否存在被外部供应商收取 20–50 倍溢价的黑盒组件，企业是否具备自建产线垂直内化 >80% BOM 的能力。' },
 { tag: 'RE 一竿子到底', title: '4. 责任工程师 (RE) 测试：单个模块是否由同一人贯通设计、制造与实测？', desc: '检验设计工程师工位是否紧贴产线车间，杜绝“设计部画完图扔给制造部、出了故障互相甩锅”的部门墙。' },
 { tag: '高频真机试错', title: '5. 硬件敏捷迭代测试：从设计冻结到真机点火实测的周期是按周还是按年计？', desc: '观察企业是耗费数年撰写完美仿真报告，还是以低成本快速造出原型机在真实物理边界高频试错迭代。' },
 { tag: '双核现金闭环', title: '6. 远期探月与现金牛平衡测试：是否有 Shotwell 式运营铁军守护高毛利基本盘？', desc: '对标星链 45.1% 营业利润率反哺星舰与太空 AI，检验激进前沿研发背后是否有稳健的经常性现金流引擎支撑。' }
 ];

 var CHECKLIST_EN = [
 { tag: 'Named Owner', title: '1. Named-Requirement Test: Does every constraint trace to a person, never a department?', desc: 'Verify whether specifications attach a real engineer\'s name so inherited rules can be challenged against first-principles physics.' },
 { tag: '10% Add-Back', title: '2. Aggressive Deletion Test: Are parts & steps deleted until ~10% must be added back?', desc: 'Benchmarked against deleting Starship landing legs for tower catches—are teams deleting complexity before optimizing or automating?' },
 { tag: 'Idiot Index', title: '3. Idiot-Index Audit: Is finished component cost benchmarked against raw material value?', desc: 'Check whether 20x–50x subcontractor markups are aggressively replaced by >80% in-house vertical manufacturing.' },
 { tag: 'Single RE', title: '4. Responsible Engineer (RE) Test: Does one owner span CAD, shop floor, and flight telemetry?', desc: 'Confirm engineers sit adjacent to production lines with zero handoff walls between design, fabrication, and testing.' },
 { tag: 'Hardware Sprint', title: '5. Hardware-Rich Cadence Test: Is prototype-to-test cycle time measured in weeks rather than years?', desc: 'Assess whether teams build affordable test articles rapidly to gather real-world flight data instead of multi-year paper waterfall reviews.' },
 { tag: 'Dual-Core Cash', title: '6. Dual-Core Balance Test: Does a high-margin cash engine fund moonshot R&D?', desc: 'Mirroring Shotwell\'s 45.1% OPM Starlink funding Starship & StarMind, verify whether disciplined execution backs frontier bets.' }
 ];

 var QUICK_JUMP = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: 'Q3 $14.58B 营收 · $2.58M 年化人效 · 星链 45.1% 利润率' },
 { sec: 'sec-01', title: '01 双核架构与垂直自造协同', sub: 'Musk × Shotwell 汇报线 · 三大分部营收与人效双视图图表' },
 { sec: 'sec-02', title: '02 四大文化支柱与五维雷达', sub: '五步算法 · 白痴指数 · RE责任工程师 · 五维对比雷达图' },
 { sec: 'sec-03', title: '03 全球军工与硬科技横向对比', sub: 'SpaceX vs NVIDIA / Tesla / Rocket Lab / 波音洛马' },
 { sec: 'sec-04', title: '04 复用红利与跨代估值复利', sub: '2022–2026 发射与估值齐飞 · 期权与股东价值复利推演器' },
 { sec: 'sec-05', title: '05 三幕演进与四大生死战役', sub: '夸贾林第4发 · 不锈钢转向 · Crew-13 · Flight 15 捕获' },
 { sec: 'sec-06', title: '06 五步算法组织核查清单', sub: '6 项第一性原理硬科技诊断与本地持久化评分' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC CIK 0001181412 · SpaceX Official · Payload Space' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 10, priceCagr: 45.0, drip: true },
 p2: { principal: 10000, years: 3, priceCagr: 95.0, drip: true },
 p3: { principal: 10000, years: 10, priceCagr: 14.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 epsSeries: { eps: true, oci: true },
 activePillar: 0,
 radarSeries: { spcx: true, nvda: true, oldspace: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 10000, years: 10, priceCagr: 14.5, drip: true, preset: 'p3' },
 checks: [true, true, true, false, false, false]
 };

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };

 function isEn() { return state.lang === 'en'; }

 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg;
 el.classList.add('show');
 clearTimeout(el._t);
 el._t = setTimeout(function () { el.classList.remove('show'); }, 2400);
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
 var rows = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = rows.filter(function (r, idx) {
 var catOk = state.peerFilter === 'all' || r.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var hay = (PEER_ROWS_ZH[idx].company + ' ' + PEER_ROWS_ZH[idx].leader + ' ' + PEER_ROWS_ZH[idx].culture + ' ' + PEER_ROWS_EN[idx].company + ' ' + PEER_ROWS_EN[idx].leader + ' ' + PEER_ROWS_EN[idx].culture).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 if (badge) badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + rows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + rows.length + ' 家标杆企业');
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配企业，请尝试其他关键词。</td></tr>';
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

 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 if (!container) return;
 var items = isEn() ? CHECKLIST_EN : CHECKLIST_ZH;
 var done = state.checks.filter(Boolean).length;
 var pct = Math.round((done / items.length) * 100);
 if (chip) chip.textContent = isEn() ? ('Verified ' + done + ' / ' + items.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + items.length + ' 项 (' + pct + '%)');
 if (bar) bar.style.width = pct + '%';
 container.innerHTML = items.map(function (it, idx) {
 var ck = !!state.checks[idx];
 return '<label class="check-card ' + (ck ? 'checked' : '') + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (ck ? 'checked' : '') + ' />' +
 '<div style="flex:1;">' +
 '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
 '<span class="check-title">' + escapeHtml(it.title) + '</span>' +
 '<span class="mui-chip mono">' + escapeHtml(it.tag) + '</span>' +
 '</div>' +
 '<p class="check-desc">' + escapeHtml(it.desc) + '</p>' +
 '</div></label>';
 }).join('');
 }

 function formatCurrency(val) {
 if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
 var boost = state.sim.drip ? 4.5 : 0.0;
 var totRate = (cagr + boost) / 100;
 var endV = p * Math.pow(1 + totRate, yrs);
 var moic = endV / p;
 var midY = Math.max(1, Math.floor(yrs / 2));
 var midV = p * Math.pow(1 + totRate, midY);

 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endV);
 document.getElementById('simMoicVal').textContent = (moic >= 100 ? moic.toFixed(1) : moic.toFixed(2)) + 'x · ' + (totRate * 100).toFixed(1) + '%';
 document.getElementById('simNetGainVal').textContent = formatCurrency(endV - p);
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midY + ' Midpoint') : ('第 ' + midY + ' 年中期资产节点');
 document.getElementById('simMidVal').textContent = formatCurrency(midV);

 var pbs = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < pbs.length; i++) pbs[i].classList.toggle('active', pbs[i].getAttribute('data-preset') === state.sim.preset);
 drawSimChart();
 }

 // Canvas Engine
 function getPalette() {
 var dark = state.theme === 'dark';
 return {
 isDark: dark,
 grid: dark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
 tick: dark ? '#94A3B8' : '#475569',
 text: dark ? '#F3F6F9' : '#0F1924',
 sub: dark ? '#B2BAC2' : '#334155',
 pillBg: dark ? 'rgba(9, 13, 22, 0.88)' : 'rgba(255, 255, 255, 0.94)',
 pillBorder: dark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: dark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 c1: dark ? '#3399FF' : '#0073E6',
 c2: dark ? '#22C55E' : '#16A34A',
 c3: dark ? '#FFB74D' : '#D97706',
 c4: dark ? '#A78BFA' : '#7C3AED'
 };
 }

 function prepCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var rect = canvas.parentElement.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 canvas.width = Math.floor(w * dpr);
 canvas.height = Math.floor(h * dpr);
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rd = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + rd, y);
 ctx.arcTo(x + w, y, x + w, y + h, rd);
 ctx.arcTo(x + w, y + h, x, y + h, rd);
 ctx.arcTo(x, y + h, x, y, rd);
 ctx.arcTo(x, y, x + w, y, rd);
 ctx.closePath();
 }

 function drawCh1Chart() {
 var env = prepCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var pad = { top: 28, right: 48, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.ch1View === 'viewA') {
 var lbls = ['SI (AI+Cursor+X)', 'Connectivity (星链)', 'Space (航天发射)'];
 var q325 = [0.813, 3.097, 1.666];
 var q326 = [7.560, 5.248, 1.767];
 var growth = ['+830% (9.3x)', '+69.5% YoY', '+6.1% YoY'];
 var maxY = 8.5;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
 }
 var step = pw / lbls.length, bw = Math.min(44, step * 0.28);
 lbls.forEach(function (lb, i) {
 var cx = pad.left + step * (i + 0.5);
 if (state.ch1Series.s1) {
 var h1 = Math.max(4, (q325[i] / maxY) * ph), y1 = pad.top + ph - h1;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, cx - bw - 4, y1, bw, h1, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + q325[i].toFixed(2) + 'B', cx - bw / 2 - 4, y1 - 6);
 }
 if (state.ch1Series.s2) {
 var h2 = Math.max(4, (q326[i] / maxY) * ph), y2 = pad.top + ph - h2;
 ctx.fillStyle = pal.c2;
 roundRectPath(ctx, cx + 4, y2, bw, h2, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + q326[i].toFixed(2) + 'B', cx + bw / 2 + 4, y2 - 6);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lb, cx, pad.top + ph + 19);
 ctx.fillStyle = pal.c2; ctx.font = '600 10px "IBM Plex Mono", sans-serif';
 ctx.fillText(growth[i], cx, pad.top + ph + 33);
 hitRegions.chartCh1.push({
 x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
 html: '<strong>' + lb + ' (SEC 10-Q Note 18)</strong><br/>• Q3 2025: <strong>$' + q325[i].toFixed(3) + 'B</strong><br/>• Q3 2026: <strong>$' + q326[i].toFixed(3) + 'B</strong> (' + growth[i] + ')'
 });
 });
 } else {
 var yrs = ['2023', '2024', '2025 (S-1)', 'Q3 26 (年化)'];
 var ftes = [11.81, 14.60, 18.15, 22.62];
 var revFte = [0.76, 0.90, 1.03, 2.58];
 var maxF = 28.0, maxR = 3.0;
 for (var k = 0; k <= 4; k++) {
 var r = k / 4, ky = pad.top + ph - r * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText((maxF * r).toFixed(0) + 'k', pad.left - 7, ky + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText('$' + (maxR * r).toFixed(2) + 'M', pad.left + pw + 7, ky + 4);
 }
 var stB = pw / yrs.length, bW = Math.min(44, stB * 0.4);
 var pts = [];
 yrs.forEach(function (yr, i) {
 var cx = pad.left + stB * (i + 0.5);
 if (state.ch1Series.s1) {
 var bh = (ftes[i] / maxF) * ph, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, cx - bW / 2, by, bW, bh, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(ftes[i].toFixed(1) + 'k', cx, by + 16);
 }
 pts.push({ x: cx, y: pad.top + ph - (revFte[i] / maxR) * ph, v: revFte[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(yr, cx, pad.top + ph + 20);
 hitRegions.chartCh1.push({
 x: pad.left + stB * i, y: pad.top, w: stB, h: ph + 26,
 html: '<strong>' + yr + ' 人效与编制</strong><br/>• 全职员工：<strong>' + Math.round(ftes[i] * 1000).toLocaleString() + ' 人</strong><br/>• 人均年创收：<strong>$' + revFte[i].toFixed(2) + 'M / 人</strong>'
 });
 });
 if (state.ch1Series.s2) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
 pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
 ctx.stroke();
 pts.forEach(function (pt) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + pt.v.toFixed(2) + 'M', pt.x, pt.y - 9);
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = isEn() ? ['First-Principles', 'Hardware Velocity', 'In-House BOM', 'RE Ownership', 'Cash Conversion'] : ['第一性原理降本', '硬件敏捷迭代速度', '核心部件垂直自制', 'RE端到端单点问责', '经常性利润转化'];
 var series = [
 { key: 'spcx', color: pal.c1, fill: 'rgba(51,153,255,0.24)', vals: [9.9, 9.8, 9.6, 9.7, 9.1] },
 { key: 'nvda', color: pal.c2, fill: 'rgba(34,197,94,0.16)', vals: [9.3, 9.1, 8.2, 9.5, 9.8] },
 { key: 'oldspace', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [4.2, 3.5, 3.8, 4.8, 6.2] }
 ];
 var cx = w / 2, cy = h / 2 + 6;
 var radius = Math.max(60, Math.min((w - 200) / 2, h * 0.35));
 var total = axes.length;

 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
 var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.closePath(); ctx.stroke();
 }
 axes.forEach(function (axName, a) {
 var ang = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 var ax = cx + Math.cos(ang) * radius, ay = cy + Math.sin(ang) * radius;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(ang) * (radius + 14), ly = cy + Math.sin(ang) * (radius + 15);
 ctx.fillStyle = a === state.activePillar ? pal.c1 : pal.text;
 ctx.font = '700 11px sans-serif';
 ctx.textAlign = Math.abs(Math.cos(ang)) < 0.2 ? 'center' : (Math.cos(ang) > 0 ? 'left' : 'right');
 ctx.fillText(axName, lx, ly);
 hitRegions.chartRadar.push({
 x: Math.min(ax, lx) - 34, y: Math.min(ay, ly) - 20, w: 70 + Math.abs(lx - ax), h: 40,
 html: '<strong>' + axName + '</strong><br/>• SpaceX: <strong>' + series[0].vals[a] + '</strong> · 顶尖科技标杆: <strong>' + series[1].vals[a] + '</strong> · 传统军工: <strong>' + series[2].vals[a] + '</strong>'
 });
 });
 series.forEach(function (s) {
 if (!state.radarSeries[s.key]) return;
 ctx.beginPath();
 s.vals.forEach(function (v, idx) {
 var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total, d = (v / 10) * radius;
 var vx = cx + Math.cos(th) * d, vy = cy + Math.sin(th) * d;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 });
 ctx.closePath();
 ctx.fillStyle = s.fill; ctx.fill();
 ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { label: 'Falcon 9 Block 5 一级助推器回收着陆成功率', val: 99.1, col: '#16A34A', sub: '652 / 658 次成功回收', note: '支撑单枚助推器高达 37 次复用的工程可靠性奇迹' },
 { label: 'SpaceX 占全球年度入轨有效载荷总质量份额', val: 86.5, col: '#0073E6', sub: '>85% 全球质量统治力', note: '高频复用形成的跨代运力垄断' },
 { label: 'SpaceX 火箭与星链核心硬件内部垂直自制率', val: 82.0, col: '#7C3AED', sub: '>80% In-House BOM', note: '白痴指数驱动自造引擎、航电、阀门与相控阵硅芯片' },
 { label: 'SpaceX 星链连接分部营业利润率 (Q3 2026)', val: 45.1, col: '#22C55E', sub: '$2,367M / $5,248M', note: '贡献集团 84.8% 营业利润的超级现金流底座' },
 { label: 'Rocket Lab (RKLB) 综合 GAAP 毛利率 (Q3 2026)', val: 33.6, col: '#0284C7', sub: 'Non-GAAP 38.4%', note: '商业航天第二梯队优秀垂直整合样本' },
 { label: '传统军工代表：洛克希德马丁营业利润率 / 波音净利率', val: 10.2, col: '#D97706', sub: 'LMT ~10.2% · BA 2.5%', note: '多层转包与固定总价超支限制利润率上限' }
 ];
 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var maxX = 100, rowH = ph / items.length;
 items.forEach(function (it, i) {
 var rowTop = pad.top + rowH * i;
 var labelY = rowTop + Math.max(15, rowH * 0.35);
 var barY = rowTop + Math.max(22, rowH * 0.52);
 var barH = 13, bw = (it.val / maxX) * pw;
 ctx.fillStyle = pal.text; ctx.font = '600 12px sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(it.label, pad.left, labelY);
 ctx.fillStyle = it.col; ctx.font = '800 12px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, labelY);
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, 6); ctx.fill();
 ctx.fillStyle = it.col; roundRectPath(ctx, pad.left, barY, bw, barH, 6); ctx.fill();
 hitRegions.chartBars.push({ x: pad.left, y: rowTop, w: pw, h: rowH, html: '<strong>' + it.label + ': ' + it.val + '%</strong><br/>• ' + it.sub + '<br/>• ' + it.note });
 });
 }

 function drawEpsComboChart() {
 var env = prepCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var years = ['2022', '2023', '2024', '2025', '2026 (至11月)'];
 var launches = [61, 98, 138, 170, 136];
 var valB = [127, 175, 350, 800, 1900];
 var pad = { top: 26, right: 54, bottom: 38, left: 48 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var maxL = 200, maxV = 2100;

 for (var g = 0; g <= 4; g++) {
 var r = g / 4, gy = pad.top + ph - r * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(Math.round(maxL * r) + '发', pad.left - 7, gy + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
 ctx.fillText('$' + Math.round(maxV * r) + 'B', pad.left + pw + 7, gy + 4);
 }
 var step = pw / years.length, bw = Math.min(44, step * 0.42);
 var pts = [];
 years.forEach(function (yr, i) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = (launches[i] / maxL) * ph, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1;
 roundRectPath(ctx, cx - bw / 2, by, bw, bh, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(launches[i] + '发', cx, by + 16);
 }
 pts.push({ x: cx, y: pad.top + ph - (valB[i] / maxV) * ph, v: valB[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(yr, cx, pad.top + ph + 20);
 hitRegions.chartEps.push({
 x: pad.left + step * i, y: pad.top, w: step, h: ph + 26,
 html: '<strong>' + yr + '</strong><br/>• 总发射次数：<strong>' + launches[i] + ' 次</strong><br/>• 估值/市值：<strong>$' + valB[i] + 'B</strong>'
 });
 });
 if (state.epsSeries.oci) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
 pts.forEach(function (p, i) { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
 ctx.stroke();
 pts.forEach(function (p) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(p.v >= 1000 ? ('$' + (p.v / 1000).toFixed(2) + 'T') : ('$' + p.v + 'B'), p.x, p.y - 9);
 });
 }
 }

 function drawSimChart() {
 var env = prepCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years;
 var baseR = state.sim.priceCagr / 100;
 var totR = (state.sim.priceCagr + (state.sim.drip ? 4.5 : 0)) / 100;
 var totS = [], baseS = [];
 for (var y = 0; y <= yrs; y++) {
 totS.push(p * Math.pow(1 + totR, y));
 baseS.push(p * Math.pow(1 + baseR, y));
 }
 var maxVal = Math.max(totS[yrs], p * 1.2) * 1.1;
 var pad = { top: 20, right: 20, bottom: 28, left: 62 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 for (var g = 0; g <= 3; g++) {
 var gv = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(gv >= 1000000 ? ('$' + (gv / 1000000).toFixed(1) + 'M') : ('$' + Math.round(gv / 1000) + 'k'), pad.left - 7, gy + 4);
 }
 var stepX = pw / yrs;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
 baseS.forEach(function (v, i) {
 var px = pad.left + stepX * i, py = pad.top + ph - (v / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke(); ctx.restore();

 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 totS.forEach(function (v, i) {
 var px = pad.left + stepX * i, py = pad.top + ph - (v / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 if (i === 0 || i === Math.floor(yrs / 2) || i === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + i, px, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({
 x: px - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 20,
 html: '<strong>第 ' + i + ' 年预估价值</strong><br/>• 含太空AI生态溢价：<strong>' + formatCurrency(totS[i]) + '</strong><br/>• 仅核心业务基准：<strong>' + formatCurrency(baseS[i]) + '</strong>'
 });
 });
 ctx.stroke();
 }

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawHorizontalBars();
 drawEpsComboChart();
 drawSimChart();
 }

 function wireTip(cid) {
 var canvas = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 canvas.addEventListener('mousemove', function (e) {
 var rect = canvas.getBoundingClientRect();
 var x = e.clientX - rect.left, y = e.clientY - rect.top;
 var list = hitRegions[cid] || [], hit = null;
 for (var i = 0; i < list.length; i++) {
 var r = list[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { hit = r; break; }
 }
 if (hit) {
 tip.innerHTML = hit.html;
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 300, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }

 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl) sl.setAttribute('aria-pressed', state.theme === 'light' ? 'true' : 'false');
 if (sd) sd.setAttribute('aria-pressed', state.theme === 'dark' ? 'true' : 'false');
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式');
 }

 function applyLang(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 document.documentElement.lang = isEn() ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', !isEn());
 document.getElementById('langEnBtn').classList.toggle('active', isEn());
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(isEn() ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
 else nodes[i].textContent = val;
 }
 }
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>';
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 if (!silent) showToast(isEn() ? 'Switched to English' : '已切换为中文');
 }

 // Bindings
 document.getElementById('ch1TabA').addEventListener('click', function () {
 state.ch1View = 'viewA';
 this.classList.add('active'); document.getElementById('ch1TabB').classList.remove('active');
 drawCh1Chart();
 });
 document.getElementById('ch1TabB').addEventListener('click', function () {
 state.ch1View = 'viewB';
 this.classList.add('active'); document.getElementById('ch1TabA').classList.remove('active');
 drawCh1Chart();
 });

 document.querySelectorAll('[data-ch1-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-ch1-series');
 state.ch1Series[k] = !state.ch1Series[k];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[k] = true;
 this.classList.toggle('muted', !state.ch1Series[k]);
 drawCh1Chart();
 });
 });

 document.querySelectorAll('[data-eps-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-eps-series');
 state.epsSeries[k] = !state.epsSeries[k];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[k] = true;
 this.classList.toggle('muted', !state.epsSeries[k]);
 drawEpsComboChart();
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

 document.querySelectorAll('[data-pillar]').forEach(function (card) {
 card.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 document.querySelectorAll('[data-pillar]').forEach(function (c, i) { c.classList.toggle('active', i === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[idx] + '</div>';
 drawRadarChart();
 });
 });

 document.querySelectorAll('[data-radar-key]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-radar-key');
 state.radarSeries[k] = !state.radarSeries[k];
 if (!state.radarSeries.spcx && !state.radarSeries.nvda && !state.radarSeries.oldspace) state.radarSeries[k] = true;
 this.classList.toggle('muted', !state.radarSeries[k]);
 drawRadarChart();
 });
 });

 document.getElementById('peerSearchInput').addEventListener('input', function () {
 state.peerQuery = this.value;
 renderPeerTable();
 });
 document.querySelectorAll('[data-peer-filter]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 document.querySelectorAll('[data-peer-filter]').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderPeerTable();
 });
 });

 var pS = document.getElementById('simPrincipalSlider'), yS = document.getElementById('simYearsSlider'), cS = document.getElementById('simCagrSlider'), dT = document.getElementById('simDripToggle');
 pS.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 10; state.sim.preset = ''; updateSimulatorUI(); });
 cS.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 10; state.sim.preset = ''; updateSimulatorUI(); });
 dT.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
 document.querySelectorAll('[data-preset]').forEach(function (pb) {
 pb.addEventListener('click', function () {
 var k = this.getAttribute('data-preset'), cfg = PRESETS[k];
 if (!cfg) return;
 state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = k;
 pS.value = cfg.principal; yS.value = cfg.years; cS.value = cfg.priceCagr; dT.checked = cfg.drip;
 updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]');
 if (!inp) return;
 var idx = parseInt(inp.getAttribute('data-check-input'), 10);
 state.checks[idx] = !!inp.checked;
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 showToast('已勾选全部 6 项核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 showToast('已恢复默认核查状态');
 });

 // Suite Hub Filter & Navigation
 
 

 // Quick Jump
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 var q = (kw || '').trim().toLowerCase();
 var list = QUICK_JUMP.filter(function (x) { return !q || (x.title + ' ' + x.sub).toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = list.map(function (x) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + x.sec + '"><span class="quick-jump-item-title">' + x.title + '</span><span class="quick-jump-item-sub">' + x.sub + '</span></button>';
 }).join('');
 qPop.classList.toggle('open', list.length > 0);
 }
 qIn.addEventListener('focus', function () { renderQ(qIn.value); });
 qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) {
 var b = e.target.closest('[data-jump-sec]');
 if (!b) return;
 var el = document.getElementById(b.getAttribute('data-jump-sec'));
 if (el) el.scrollIntoView({ behavior: 'smooth' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
 if (e.key === 'Escape') {
 qPop.classList.remove('open');
 document.getElementById('muiSidebar').classList.remove('open');
 document.getElementById('drawerBackdrop').classList.remove('open');
 }
 });

 var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth > 1120) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
 setTimeout(renderAllCharts, 60);
 } else {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

 
 
 

 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark';
 applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (err) {}
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (!lb) return;
 var nl = lb.getAttribute('data-lang');
 applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 window.addEventListener('scroll', function () {
 var maxS = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxS) * 100) + '%';
 }, { passive: true });

 try {
 var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
 if (Array.isArray(sc) && sc.length === 6) state.checks = sc.map(Boolean);
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 }

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireTip);
 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 70); });
 })();
 