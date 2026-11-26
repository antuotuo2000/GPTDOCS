
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var DOC_TITLE_ZH = '威瑞信 VeriSign, Inc. (VRSN) 企业文化与组织架构深度研究报告 | 数据中心';
 var DOC_TITLE_EN = 'VeriSign, Inc. (VRSN) Corporate Culture & Organizational Architecture Deep Dive | Research Hub';
 var STORAGE_CHECK_KEY = 'mui_vrsn_culture_checks_v1';

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 activePillar: 0,
 radarSeries: { aapl: true, nvda: true, mform: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 10000, years: 14, priceCagr: 11.5, drip: true, preset: 'p1' },
 checks: [true, true, true, false, false, false],
 ch1Series: { s1: true, s2: true },
 epsSeries: { eps: true, oci: true }
 };

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 零宕机工程信仰）：</strong>连续 29 年+ 为 .com/.net 提供 100% 连续解析可用性，是威瑞信赢得 ICANN 推定续约权与美国政府信任的终极筹码 <a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">FY25 年报 ↗</a>。',
 '<strong>当前选中支柱解读（02 928人极简编制）：</strong>剥离非核心业务后，威瑞信以不到千人的团队创造 $16.57亿 营收（FY26 指引 $17.58亿），人均净利高达 $89 万 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000006/vrsn-20251231.htm" target="_blank" rel="noopener noreferrer">SEC 10-K ↗</a>。',
 '<strong>当前选中支柱解读（03 创始人长期主义）：</strong>创始人 Jim Bidzos 横跨 31 年稳定掌舵，核心安全与法务高管任职普遍超十年，保证了根域合规与战略定力 <a class="cite-link" href="https://www.verisign.com/about-us/leadership/" target="_blank" rel="noopener noreferrer">Leadership ↗</a>。',
 '<strong>当前选中支柱解读（04 资本配置洁癖）：</strong>拒绝低回报并购，将每年超 $10 亿自由现金流几乎全额用于股本注销与分红，吸引伯克希尔长期持有 6.6% 股份 <a class="cite-link" href="https://www.quantisnow.com/insight/amendment-sec-form-schedule-13ga-filed-by-berkshire-hathaway-inc-6795273" target="_blank" rel="noopener noreferrer">SEC 13G/A ↗</a>。'
 ];
 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Zero-Downtime Creed):</strong> 29+ consecutive years of 100% .com/.net DNS availability is VeriSign’s ultimate political and technical moat for presumptive ICANN renewal <a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">FY25 Release ↗</a>.',
 '<strong>Selected Pillar (02 · 928-FTE Restraint):</strong> After divesting non-core units, fewer than 1,000 employees generate $1.66B in FY25 sales ($1.76B FY26E) and ~$890K net income per employee <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000006/vrsn-20251231.htm" target="_blank" rel="noopener noreferrer">SEC 10-K ↗</a>.',
 '<strong>Selected Pillar (03 · Founder Stewardship):</strong> Founder Jim Bidzos has anchored strategy across 31 years alongside decade-tenured security and legal chiefs <a class="cite-link" href="https://www.verisign.com/about-us/leadership/" target="_blank" rel="noopener noreferrer">Leadership ↗</a>.',
 '<strong>Selected Pillar (04 · Capital Discipline):</strong> Shunning empire-building M&amp;A, 100%+ of FCF goes into share retirement and dividends—earning a 6.6% Berkshire Hathaway stake <a class="cite-link" href="https://www.quantisnow.com/insight/amendment-sec-form-schedule-13ga-filed-by-berkshire-hathaway-inc-6795273" target="_blank" rel="noopener noreferrer">SEC 13G/A ↗</a>.'
 ];

 var PEER_ROWS = [
 { category: 'functional', benchmark: true, company: '研究基准：威瑞信 (VeriSign · VRSN)', leader: 'Jim Bidzos (创始人/CEO)', positioning: '极致聚焦精兵职能制 + 零零售直销团队', culture: '29年+ 100%零宕机信仰 + 极简减法 + 股东回购洁癖', headcount: '928人 (926全职) · 人均创收 $1.79M', margins: 'FY25 营收 $16.57亿 · 毛利 88.2% · OpM 67.7%', verdict: '基础设施级极致人效典范：靠剥离非核心业务与下游注册商分工，在不足千人编制下跑出 67.7% 营业利润率。', sourceLabel: 'SEC FY25 10-K', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1014473/000101447326000006/vrsn-20251231.htm' },
 { category: 'functional', benchmark: false, company: '苹果公司 (Apple · AAPL)', leader: 'John Ternus / Tim Cook', positioning: '职能制集权 + 全公司唯一损益表 (Single P&L)', culture: '专家领导专家 + DRI 直接责任人 + Apple University 减法', headcount: '16.7万人 · 人均创收 $2.87M', margins: 'FY26 营收 $4,788亿 · 综合毛利 48.8% · OpM 33.0%', verdict: '消费级全栈职能制鼻祖：同样奉行单一主线聚焦与拒绝事业部割据，规模百倍于威瑞信仍保持极高人效。', sourceLabel: 'Apple FY26 10-K', sourceUrl: 'https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/' },
 { category: 'functional', benchmark: false, company: '英伟达 (NVIDIA · NVDA)', leader: '黄仁勋 (Jensen Huang)', positioning: '超扁平职能网络 + ~60名高管直报 CEO', culture: '无事业部墙 + Top-5 全透明邮件 + 光速执行', headcount: '~4.2万人 · 人均创收 ~$5.14M', margins: 'FY26 营收 $2,159亿 · 毛利率 71.1% · 净利 $1,201亿', verdict: '高研发密度职能制极客：以极高工程师比例统治 AI 算力栈；威瑞信则以极低人员总量统治 DNS 根解析。', sourceLabel: 'NVIDIA FY26', sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/' },
 { category: 'divisional', benchmark: false, company: 'GoDaddy (GDDY)', leader: 'Aman Bhutani', positioning: '下游零售注册商 + SMB 建站与商业 SaaS 事业部', culture: '强消费级营销获客 + 产品组合交叉销售驱动', headcount: '~5,800人 · 含大量客服与营销团队', margins: '营收 ~$46亿+ · OpM ~19%–22%', verdict: '上下游生态互补镜像：GoDaddy 承担了所有重人力零售获客与客服，让上游威瑞信得以维持 928 人轻盈编制。', sourceLabel: 'GDDY Filings', sourceUrl: 'https://www.sec.gov/edgar/browse/?CIK=0001609711' },
 { category: 'divisional', benchmark: false, company: '伯克希尔·哈撒韦 (Berkshire · BRK.B)', leader: '巴菲特 / Greg Abel', positioning: '奥马哈 27 人总部 + 60+ 独立子公司极端分权', culture: '经营权完全下放 + 资本配置高度集中', headcount: '~38.8万人 · 总部仅 27 人', margins: '保险/铁路/能源永续现金流复合体', verdict: '资本配置灵魂共鸣：伯克希尔长期重仓威瑞信 6.6%（592万股），正因双方均视“零冗余+回购缩股”为信仰。', sourceLabel: 'SEC 13G/A', sourceUrl: 'https://www.quantisnow.com/insight/amendment-sec-form-schedule-13ga-filed-by-berkshire-hathaway-inc-6795273' }
 ];
 var PEER_ROWS_EN = [
 { category: 'functional', benchmark: true, company: 'Benchmark: VeriSign (VRSN)', leader: 'Jim Bidzos (Founder / CEO)', positioning: '928-FTE Functional Spine + Zero Retail Sales Force', culture: '29+ Yrs 100% Uptime Creed + Radical Focus + Buyback Discipline', headcount: '928 Employees (926 FTE) · $1.79M Rev/FTE', margins: 'FY25 Rev $1.657B · 88.2% GM · 67.7% OpM', verdict: 'Infrastructure efficiency pinnacle: outsourcing retail CAC to registrars lets 928 FTEs run a 67.7% operating margin monopoly.', sourceLabel: 'SEC FY25 10-K', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1014473/000101447326000006/vrsn-20251231.htm' },
 { category: 'functional', benchmark: false, company: 'Apple Inc. (AAPL)', leader: 'John Ternus / Tim Cook', positioning: 'Functional Organization + Single Enterprise P&L', culture: 'Experts Leading Experts + Single DRI + Apple University', headcount: '167,000 FTE · $2.87M Rev/FTE', margins: 'FY26 Rev $478.8B · 48.8% GM · 33.0% OpM', verdict: 'Consumer functional benchmark: shares VeriSign’s rejection of divisional silos and commitment to lean SKU focus.', sourceLabel: 'Apple FY26 10-K', sourceUrl: 'https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/' },
 { category: 'functional', benchmark: false, company: 'NVIDIA (NVDA)', leader: 'Jensen Huang', positioning: 'Ultra-Flat Functional Network + ~60 Direct Reports', culture: 'Zero BU Walls + Top-5 Emails + Light-Speed Execution', headcount: '~42,000 FTE · ~$5.14M Rev/FTE', margins: 'FY26 Rev $215.9B · 71.1% GM · $120.1B Net Inc', verdict: 'High-R&D functional peer: dominates AI compute via engineering density, just as VeriSign dominates DNS via lean reliability.', sourceLabel: 'NVIDIA FY26', sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/' },
 { category: 'divisional', benchmark: false, company: 'GoDaddy (GDDY)', leader: 'Aman Bhutani', positioning: 'Downstream Retail Registrar + SMB Website/Commerce SaaS', culture: 'Performance Marketing + Cross-Sell SaaS Attach', headcount: '~5,800 FTEs · Heavy Customer Care & Marketing', margins: 'Rev ~$4.6B+ · ~19%–22% OpM', verdict: 'Downstream mirror image: GoDaddy absorbs retail CAC and support, enabling VeriSign’s ultra-lean 928-FTE upstream model.', sourceLabel: 'GDDY Filings', sourceUrl: 'https://www.sec.gov/edgar/browse/?CIK=0001609711' },
 { category: 'divisional', benchmark: false, company: 'Berkshire Hathaway (BRK.B)', leader: 'Buffett / Greg Abel', positioning: '27-Person Omaha HQ + 60+ Autonomous Subsidiaries', culture: 'Decentralized Ops + Centralized Capital Allocation', headcount: '~388k FTE · 27 at HQ', margins: 'Perpetual Cash-Compounding Federation', verdict: 'Capital-allocation kindred spirit: Berkshire holds 6.6% (5.92M shares) of VRSN for its shared zero-bloat buyback discipline.', sourceLabel: 'SEC 13G/A', sourceUrl: 'https://www.quantisnow.com/insight/amendment-sec-form-schedule-13ga-filed-by-berkshire-hathaway-inc-6795273' }
 ];

 var CHECKLIST_ITEMS = [
 { tag: '100% SLA 信仰', title: '1. 零宕机可靠性红线：连续 29 年+ .com/.net 解析可用性是否维持 100%？', desc: '核查季度披露及全球根服务器监控，确保无重大 BGP 劫持、DDoS 瘫痪或代码升级中断事故。' },
 { tag: '928人极简编制', title: '2. 编制克制测试：全职员工是否稳定控制在千人以内而不盲目扩招？', desc: '对标 FY25 Form 10-K 的 928 人基准，检验推进 .web 与 Verisign Informed™ 时是否依然保持高人均创收（>$1.75M）。' },
 { tag: '战略减法纪律', title: '3. 拒绝低效多元化：管理层是否坚决抵制稀释毛利率的跨界并购？', desc: '检验资本开支与并购记录，确认公司专注于高毛利 DNS、顶级域与高保证信任验证，不重蹈 2000 年代并购覆辙。' },
 { tag: 'ICANN 续约护城河', title: '4. 协议与政策护城河：与 ICANN 及美国商务部 NTIA 的合作关系是否稳固？', desc: '跟踪 .com 2026–2029 年 7% 提价周期执行情况及面向 2030 续约周期的监管合规表现。' },
 { tag: '缩股资本配置', title: '5. 股东至上回购纪律：是否将 100%+ 自由现金流返还股东（回购+分红）？', desc: '核查季度回购金额（如 Q3 26 $189M）及季度现金股息（$0.81/股）持续性，观察流通股本是否继续稳步下降。' },
 { tag: '第二曲线验证', title: '6. .web 与 Informed™ 商业落地：新增长曲线是否按 2026–2027 时间表兑现？', desc: '跟踪 2026.12.10 .web 日出期、2027.04.06 全面开放及 Verisign Informed™ H1 2027 商业化进展。' }
 ];
 var CHECKLIST_ITEMS_EN = [
 { tag: '100% SLA Creed', title: '1. Zero-Downtime Red Line: Is .com/.net DNS availability holding at 100% (29+ yrs)?', desc: 'Verify quarterly filings and root-server telemetry for zero major outages or DDoS disruptions.' },
 { tag: '928-FTE Restraint', title: '2. Headcount Discipline: Is total workforce staying lean (<1,000 FTEs) during .web launch?', desc: 'Benchmark against FY25 10-K’s 928 employees to ensure Rev/FTE stays above $1.75M.' },
 { tag: 'Radical Focus', title: '3. M&A Restraint: Is leadership avoiding low-margin empire-building acquisitions?', desc: 'Confirm capital stays focused on high-margin DNS, TLDs, and Verisign Informed™ trust APIs.' },
 { tag: 'ICANN Moat', title: '4. Regulatory Alignment: Are ICANN & NTIA relationships intact through 2030?', desc: 'Track 2026–2029 .com 7% escalator execution and compliance ahead of 2030 renewal.' },
 { tag: 'Share Retirement', title: '5. Capital Return Discipline: Is 100%+ of FCF returned via buybacks & dividends?', desc: 'Monitor quarterly share repurchases ($189M in Q3 26) and $0.81/qtr dividend continuity.' },
 { tag: '2nd Curve Check', title: '6. .web & Informed™ Milestones: Are 2026–2027 rollout dates executing on schedule?', desc: 'Track Dec 10, 2026 .web Sunrise, Apr 6, 2027 GA, and H1 2027 Informed™ commercialization.' }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '$1.66B 营收 · 928人 · 67.7% OpM · 29年+ 零宕机' },
 { sec: 'sec-01', title: '01 928人精兵职能架构', sub: 'Jim Bidzos 掌舵 · 零消费级销售 · 人效跃迁双视图' },
 { sec: 'sec-02', title: '02 四大文化支柱与可靠性护城河', sub: '100% SLA · 极简减法 · 长期舵手 · 五维雷达图' },
 { sec: 'sec-03', title: '03 全球巨头组织文化横向对比', sub: 'VRSN vs Apple / NVIDIA / GoDaddy / Berkshire' },
 { sec: 'sec-04', title: '04 极简人效、利润率与复利推演', sub: 'FY21–FY25 净利与 OpM · 缩股复利推演器' },
 { sec: 'sec-05', title: '05 三代战略演进与战役复盘', sub: '1995 RSA · 2008 瘦身革命 · 2026 .web 破局' },
 { sec: 'sec-06', title: '06 威瑞信文化法则核查清单', sub: '6项基础设施组织护城河持久化自检' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC FY25 10-K · Q3 2026 8-K · 13G/A' }
 ];
 var QUICK_JUMP_EN = [
 { sec: 'sec-00', title: '00 Executive Summary & KPIs', s: '', sub: '$1.66B Rev · 928 FTEs · 67.7% OpM · 29+ Yrs 100% SLA' },
 { sec: 'sec-01', title: '01 928-FTE Functional Architecture', sub: 'Jim Bidzos · Zero Retail Sales · Rev & FTE Charts' },
 { sec: 'sec-02', title: '02 Four Cultural Pillars & Moat', sub: '100% SLA · Radical Focus · Stewardship · 5-Axis Radar' },
 { sec: 'sec-03', title: '03 Global Peer Culture Matrix', sub: 'VRSN vs. Apple / NVIDIA / GoDaddy / Berkshire' },
 { sec: 'sec-04', title: '04 Margins, Efficiency & Flywheel', sub: 'FY21–FY25 Net Income & OpM · Buyback Simulator' },
 { sec: 'sec-05', title: '05 Three-Era Evolution & Battles', sub: '1995 RSA · 2008 Slim-Down · 2026 .web Breakthrough' },
 { sec: 'sec-06', title: '06 VeriSign Culture Checklist', sub: '6-Point Infrastructure Moat Diagnostic' },
 { sec: 'sec-07', title: '07 Primary Filings & Sources', sub: 'SEC FY25 10-K · Q3 2026 8-K · 13G/A' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 14, priceCagr: 11.5, drip: true },
 p2: { principal: 10000, years: 5, priceCagr: 9.5, drip: true },
 p3: { principal: 10000, years: 10, priceCagr: 8.5, drip: true }
 };

 function safeGetStorage(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
 function safeSetStorage(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
 function isEn() { return state.lang === 'en'; }
 var toastTimer = null;
 function showToast(msg) {
 var el = document.getElementById('muiSnackbar'); if (!el) return;
 el.textContent = msg; el.classList.add('show');
 if (toastTimer) clearTimeout(toastTimer);
 toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2500);
 }
 function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
 function highlightMatch(text, q) {
 var safe = escapeHtml(text); if (!q) return safe;
 return safe.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark class="hl">$1</mark>');
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIconEl = document.getElementById('appbarThemeIcon');
 if (abIconEl) abIconEl.innerHTML = (state.theme === 'dark') ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var sDark = document.getElementById('sideThemeDarkBtn'), sLight = document.getElementById('sideThemeLightBtn');
 if (sDark && sLight) { sDark.classList.toggle('active', state.theme === 'dark'); sLight.classList.toggle('active', state.theme === 'light'); }
 safeSetStorage(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Dark Mode' : '已切换至深色蓝图模式') : (isEn() ? 'Light Mode' : '已切换至浅色模式'));
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.title = en ? DOC_TITLE_EN : DOC_TITLE_ZH;
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB && enB) { zhB.classList.toggle('active', !en); enB.classList.toggle('active', en); zhB.setAttribute('aria-pressed', String(!en)); enB.setAttribute('aria-pressed', String(en)); }
 document.querySelectorAll('[data-i18n-zh][data-i18n-en]').forEach(function (n) { n.textContent = en ? n.getAttribute('data-i18n-en') : n.getAttribute('data-i18n-zh'); });
 var pNote = document.getElementById('pillarFocusNote');
 if (pNote) pNote.innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES)[state.activePillar] + '</div>';
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 safeSetStorage(STORAGE_LANG_KEY, state.lang);
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS, q = state.peerQuery.trim().toLowerCase();
 var filtered = activeRows.filter(function (row, idx) {
 if (state.peerFilter !== 'all' && row.category !== state.peerFilter) return false;
 if (!q) return true;
 var zhR = PEER_ROWS[idx] || row, enR = PEER_ROWS_EN[idx] || row;
 return (zhR.company + ' ' + zhR.leader + ' ' + zhR.positioning + ' ' + zhR.culture + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.leader).toLowerCase().indexOf(q) !== -1;
 });
 if (badge) badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆企业');
 if (!filtered.length) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching companies found.' : '未找到匹配的标杆企业。') + '</td></tr>'; return; }
 var rawQ = state.peerQuery.trim();
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
 '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
 '<td>' + highlightMatch(r.positioning, rawQ) + '</td><td>' + highlightMatch(r.culture, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.headcount, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.margins, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td></tr>';
 }).join('');
 }

 function formatCurrency(val) {
 if (val >= 1000000) return '$' + (val / 1000000).toFixed(2) + 'M';
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
 var dripRate = state.sim.drip ? 4.2 : 0.0, totalRate = (cagr + dripRate) / 100;
 var endingValue = p * Math.pow(1 + totalRate, yrs), moic = endingValue / p, netGain = endingValue - p;
 var midYear = Math.max(1, Math.floor(yrs / 2)), midValue = p * Math.pow(1 + totalRate, midYear);
 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
 document.getElementById('simMoicVal').textContent = moic.toFixed(2) + 'x · ' + (totalRate * 100).toFixed(1) + '%';
 document.getElementById('simNetGainVal').textContent = formatCurrency(netGain);
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint') : ('第 ' + midYear + ' 年中期资产节点');
 document.getElementById('simMidVal').textContent = formatCurrency(midValue);
 document.querySelectorAll('[data-preset]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-preset') === state.sim.preset); });
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
 if (!container) return;
 var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
 var doneCount = state.checks.filter(Boolean).length, pct = Math.round((doneCount / itemsList.length) * 100);
 if (chip) chip.textContent = isEn() ? ('Verified ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
 if (bar) bar.style.width = pct + '%';
 container.innerHTML = itemsList.map(function (item, idx) {
 var chk = !!state.checks[idx];
 return '<label class="check-card ' + (chk ? 'checked' : '') + '"><input type="checkbox" data-check-input="' + idx + '" ' + (chk ? 'checked' : '') + ' /><div style="flex:1;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + escapeHtml(item.title) + '</span><span class="mui-chip mono">' + escapeHtml(item.tag) + '</span></div><p class="check-desc">' + escapeHtml(item.desc) + '</p></div></label>';
 }).join('');
 }

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function getPalette() {
 var cs = getComputedStyle(document.documentElement), isDark = state.theme === 'dark';
 return {
 isDark: isDark, grid: cs.getPropertyValue('--chart-grid').trim(), tick: cs.getPropertyValue('--chart-tick').trim(),
 text: cs.getPropertyValue('--text-primary').trim(), sub: cs.getPropertyValue('--text-secondary').trim(),
 pillBg: isDark ? 'rgba(9,13,22,0.88)' : 'rgba(255,255,255,0.94)', pillBorder: isDark ? 'rgba(51,153,255,0.28)' : 'rgba(0,115,230,0.24)',
 trackBg: isDark ? 'rgba(148,163,184,0.10)' : 'rgba(15,25,36,0.06)', hoverBand: isDark ? 'rgba(51,153,255,0.08)' : 'rgba(0,115,230,0.05)',
 c1: cs.getPropertyValue('--chart-c1').trim(), c2: cs.getPropertyValue('--chart-c2').trim(), c3: cs.getPropertyValue('--chart-c3').trim(), c4: cs.getPropertyValue('--chart-c4').trim()
 };
 }
 function prepareCanvas(id) {
 var c = document.getElementById(id); if (!c || !c.parentElement) return null;
 var r = c.parentElement.getBoundingClientRect(), w = Math.max(240, Math.floor(r.width)), h = Math.max(170, Math.floor(r.height)), dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 c.style.width = w + 'px'; c.style.height = h + 'px'; c.width = Math.floor(w * dpr); c.height = Math.floor(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return; var rad = Math.min(r, w / 2, h / 2);
 ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.lineTo(x + w - rad, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h - rad); ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
 ctx.lineTo(x + rad, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - rad); ctx.lineTo(x, y + rad); ctx.quadraticCurveTo(x, y, x + rad, y); ctx.closePath();
 }
 function topRoundedBar(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return; var rad = Math.min(r, w / 2, h);
 ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + rad); ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.lineTo(x + w - rad, y); ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h); ctx.closePath();
 }
 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save(); ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 var tw = ctx.measureText(text).width + 9, th = 17;
 ctx.fillStyle = pal.pillBg; roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5); ctx.fill();
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, cx, cy + 0.5); ctx.restore();
 }
 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) { var xc = (pts[i].x + pts[i + 1].x) / 2; ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y); }
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartCh1 = [];
 var metaEl = document.getElementById('ch1AxisMeta'), leg1 = document.getElementById('ch1Leg1'), leg2 = document.getElementById('ch1Leg2');

 if (state.ch1View === 'viewA') {
 if (metaEl) metaEl.innerHTML = en ? '<span style="color:var(--chart-c1);">■ Revenue ($M)</span><span style="color:var(--chart-c2);">■ Operating Income ($M)</span>' : '<span style="color:var(--chart-c1);">■ 蓝色：年度总营收 ($M)</span><span style="color:var(--chart-c2);">■ 绿色：年度营业利润 ($M)</span>';
 if (leg1) leg1.textContent = en ? 'Annual Revenue ($M)' : '年度总营收 Revenue ($M)';
 if (leg2) leg2.textContent = en ? 'Operating Income ($M)' : '年度营业利润 Operating Income ($M)';
 var padA = { top: 30, right: 18, bottom: 42, left: 54 }, pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var revs = [1328, 1425, 1493, 1557.4, 1656.6, 1758];
 var ops = [867, 943, 1000, 1058.2, 1121.0, 1190];
 var maxY = 2000;
 for (var g = 0; g <= 4; g++) {
 var val = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.fillText('$' + val + 'M', padA.left - 8, gy + 4);
 }
 var stepA = pwA / yrs.length, barW = Math.min(34, Math.max(14, stepA * 0.28));
 yrs.forEach(function (yr, i) {
 var cx = padA.left + stepA * (i + 0.5), isHov = hoverState.chartCh1 === i;
 if (isHov) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padA.left + stepA * i + 4, padA.top, stepA - 8, phA, 8); ctx.fill(); }
 var y1 = padA.top + phA - (revs[i] / maxY) * phA, y2 = padA.top + phA - (ops[i] / maxY) * phA;
 if (state.ch1Series.s1) {
 var h1 = (revs[i] / maxY) * phA, x1 = state.ch1Series.s2 ? (cx - barW - 2) : (cx - barW / 2);
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, x1, y1, barW, h1, 5); ctx.fill();
 if (!state.ch1Series.s2 || isHov) drawValueBadge(ctx, '$' + revs[i].toFixed(0), x1 + barW / 2, y1 - 12, pal.c1, pal);
 }
 if (state.ch1Series.s2) {
 var h2 = (ops[i] / maxY) * phA, x2 = state.ch1Series.s1 ? (cx + 2) : (cx - barW / 2);
 ctx.fillStyle = pal.c2; topRoundedBar(ctx, x2, y2, barW, h2, 5); ctx.fill();
 if (i === 5 || !state.ch1Series.s1 || isHov) drawValueBadge(ctx, '$' + ops[i].toFixed(0), x2 + barW / 2, y2 - 12, pal.c2, pal);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.fillText(yr, cx, padA.top + phA + 20);
 hitRegions.chartCh1.push({ idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 30, html: '<strong>' + yr + '</strong><br/>• Revenue: <strong>$' + revs[i] + 'M</strong><br/>• OpInc: <strong>$' + ops[i] + 'M</strong> (' + ((ops[i] / revs[i]) * 100).toFixed(1) + '%)' });
 });
 } else {
 if (metaEl) metaEl.innerHTML = en ? '<span style="color:var(--chart-c1);">■ Total Employees</span><span style="color:var(--chart-c2);">● Rev / Employee ($M)</span>' : '<span style="color:var(--chart-c1);">■ 左轴：全球员工总数 (人 · ~928人极简区)</span><span style="color:var(--chart-c2);">● 右轴：人均年创收 ($M)</span>';
 if (leg1) leg1.textContent = en ? 'Total Employees (Left)' : '员工总数 (左轴 · 人)';
 if (leg2) leg2.textContent = en ? 'Revenue / Employee (Right · $M)' : '人均年创收 (右轴 · $M)';
 var padB = { top: 28, right: 52, bottom: 38, left: 50 }, pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var lbs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
 var ftes = [909, 892, 912, 918, 928, 930];
 var revE = [1.46, 1.60, 1.64, 1.70, 1.79, 1.89];
 var maxEmp = 1500, minRev = 1.0, maxRev = 2.1;
 for (var j = 0; j <= 4; j++) {
 var r = j / 4, yGrid = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yGrid); ctx.lineTo(padB.left + pwB, yGrid); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.fillText((maxEmp * r).toFixed(0), padB.left - 7, yGrid + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText('$' + (minRev + r * (maxRev - minRev)).toFixed(2) + 'M', padB.left + pwB + 7, yGrid + 4);
 }
 var stepB = pwB / lbs.length, bW = Math.min(38, stepB * 0.42), pts = [];
 lbs.forEach(function (lb, k) {
 var cx = padB.left + stepB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bh = (ftes[k] / maxEmp) * phB, by = padB.top + phB - bh;
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, cx - bW / 2, by, bW, bh, 5); ctx.fill();
 ctx.fillStyle = '#FFF'; ctx.font = '700 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.fillText(String(ftes[k]), cx, by + 15);
 }
 pts.push({ x: cx, y: padB.top + phB - ((revE[k] - minRev) / (maxRev - minRev)) * phB, rev: revE[k] });
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.fillText(lb, cx, padB.top + phB + 22);
 hitRegions.chartCh1.push({ idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28, html: '<strong>' + lb + '</strong><br/>• Employees: <strong>' + ftes[k] + '</strong><br/>• Rev / FTE: <strong>$' + revE[k].toFixed(2) + 'M</strong>' });
 });
 if (state.ch1Series.s2) {
 drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke();
 pts.forEach(function (pt, n) {
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '$' + pt.rev.toFixed(2) + 'M', pt.x, pt.y - 15, pal.c2, pal);
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartRadar = [];
 var axes = en ? ['100% SLA', 'Headcount Restraint', 'Margin Purity', 'Founder Continuity', 'Capital Return'] : ['零宕机可靠性', '极简编制人效', '营业利润率纯度', '创始治理连续性', '回购缩股纪律'];
 var hiAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : [0, 1, 3, 4][state.activePillar];
 var series = [
 { key: 'aapl', color: pal.c1, fill: 'rgba(51,153,255,0.24)', vals: [10.0, 9.9, 9.9, 9.6, 9.8] },
 { key: 'nvda', color: pal.c2, fill: 'rgba(34,197,94,0.16)', vals: [9.5, 8.8, 7.8, 9.4, 9.6] },
 { key: 'mform', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [8.4, 5.5, 6.2, 6.8, 6.5] }
 ];
 var cx = w / 2, cy = h / 2 + 8, radius = Math.max(62, Math.min((w - 190) / 2, h * 0.35)), total = 5;
 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.beginPath();
 for (var i = 0; i < total; i++) { var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total; var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
 ctx.closePath(); ctx.stroke();
 }
 for (var a = 0; a < total; a++) {
 var ang2 = -Math.PI / 2 + (a * 2 * Math.PI) / total, ax = cx + Math.cos(ang2) * radius, ay = cy + Math.sin(ang2) * radius;
 ctx.strokeStyle = a === hiAxis ? pal.c1 : pal.grid; ctx.lineWidth = a === hiAxis ? 2 : 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(ang2) * (radius + 14), ly = cy + Math.sin(ang2) * (radius + 14);
 ctx.fillStyle = a === hiAxis ? pal.c1 : pal.text; ctx.font = (a === hiAxis ? '800 ' : '600 ') + '11.5px sans-serif'; ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(ang2)) < 0.2 ? 'center' : (Math.cos(ang2) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({ idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44, html: '<strong>' + axes[a] + '</strong><br/>• VeriSign: <strong>' + series[0].vals[a] + '</strong><br/>• Apple: <strong>' + series[1].vals[a] + '</strong><br/>• SaaS Peers: <strong>' + series[2].vals[a] + '</strong>' });
 }
 series.forEach(function (it) {
 if (!state.radarSeries[it.key]) return;
 ctx.beginPath();
 for (var i = 0; i < total; i++) { var th = -Math.PI / 2 + (i * 2 * Math.PI) / total, d = (it.vals[i] / 10) * radius; var vx = cx + Math.cos(th) * d, vy = cy + Math.sin(th) * d; if (i === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy); }
 ctx.closePath(); ctx.fillStyle = it.fill; ctx.fill(); ctx.strokeStyle = it.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hitRegions.chartBars = [];
 var items = en ? [
 { label: 'FY2025 Gross Margin', val: 88.2, cStart: '#34D399', cEnd: '#16A34A', sub: 'Cost of Rev only $196.3M (11.8%)' },
 { label: 'FY2025 Operating Margin', val: 67.7, cStart: '#3399FF', cEnd: '#0073E6', sub: 'Op Income $1,121.0M' },
 { label: 'FY2025 Free Cash Flow Margin', val: 64.5, cStart: '#60A5FA', cEnd: '#2563EB', sub: 'FCF $1,068.3M (CapEx $22.8M)' },
 { label: 'FY2025 GAAP Net Profit Margin', val: 49.8, cStart: '#38BDF8', cEnd: '#0284C7', sub: 'Net Income $825.7M' },
 { label: 'SG&A Expense % of Revenue', val: 14.2, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '$235.7M (Zero Retail Sales Force)' },
 { label: 'R&D Expense % of Revenue', val: 6.3, cStart: '#FBBF24', cEnd: '#D97706', sub: '$103.6M (DNSSEC & Informed™)' }
 ] : [
 { label: 'FY2025 综合毛利率 Gross Margin', val: 88.2, cStart: '#34D399', cEnd: '#16A34A', sub: '营业成本仅 $196.3M (占比 11.8%)' },
 { label: 'FY2025 营业利润率 Operating Margin', val: 67.7, cStart: '#3399FF', cEnd: '#0073E6', sub: '营业利润 $1,121.0M' },
 { label: 'FY2025 自由现金流率 FCF Margin', val: 64.5, cStart: '#60A5FA', cEnd: '#2563EB', sub: 'FCF $1,068.3M (CapEx 仅 $22.8M)' },
 { label: 'FY2025 GAAP 净利率 Net Margin', val: 49.8, cStart: '#38BDF8', cEnd: '#0284C7', sub: '净利润 $825.7M ($8.81 EPS)' },
 { label: '销管费用占比 SG&A / Revenue', val: 14.2, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '$235.7M (无零售直销军团)' },
 { label: '研发费用占比 R&D / Revenue', val: 6.3, cStart: '#FBBF24', cEnd: '#D97706', sub: '$103.6M (专注根安全与 Informed™)' }
 ];
 var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 95, rowH = ph / items.length;
 items.forEach(function (it, i) {
 var rt = pad.top + rowH * i, ly = rt + 16, by = rt + 26, bh = 14, bw = Math.max(8, (it.val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 12px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.label, pad.left, ly);
 ctx.fillStyle = pal.isDark ? it.cStart : it.cEnd; ctx.font = '800 12.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, ly);
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, by, pw, bh, 7); ctx.fill();
 ctx.fillStyle = it.cEnd; roundRectPath(ctx, pad.left, by, bw, bh, 7); ctx.fill();
 hitRegions.chartBars.push({ idx: i, x: pad.left, y: rt, w: pw, h: rowH, html: '<strong>' + it.label + ': ' + it.val.toFixed(1) + '%</strong><br/>' + it.sub });
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var years = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];
 var netM = [785, 674, 818, 785.7, 825.7], opm = [65.3, 66.2, 67.0, 67.9, 67.7];
 var pad = { top: 26, right: 50, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var step = pw / years.length, barW = Math.min(44, step * 0.42), pts = [];
 years.forEach(function (yr, i) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = ((netM[i] - 400) / 550) * ph, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, cx - barW / 2, by, barW, bh, 6); ctx.fill();
 ctx.fillStyle = '#FFF'; ctx.font = '700 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + netM[i].toFixed(0) + 'M', cx, by + 16);
 }
 pts.push({ x: cx, y: pad.top + ph - ((opm[i] - 62) / 8) * ph, gm: opm[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(yr, cx, pad.top + ph + 20);
 hitRegions.chartEps.push({ idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28, html: '<strong>' + yr + '</strong><br/>• Net Income: <strong>$' + netM[i] + 'M</strong><br/>• Operating Margin: <strong>' + opm[i] + '%</strong>' });
 });
 if (state.epsSeries.oci) {
 drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke();
 pts.forEach(function (pt) {
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, pt.gm.toFixed(1) + '%', pt.x, pt.y - 15, pal.c2, pal);
 });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years, pr = state.sim.priceCagr / 100, tr = (state.sim.priceCagr + (state.sim.drip ? 4.2 : 0)) / 100;
 var tot = [], base = [];
 for (var y = 0; y <= yrs; y++) { tot.push(p * Math.pow(1 + tr, y)); base.push(p * Math.pow(1 + pr, y)); }
 var maxV = Math.max(tot[yrs], p * 1.2) * 1.08, pad = { top: 20, right: 20, bottom: 28, left: 60 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, stepX = pw / yrs;
 var tPts = [], bPts = [];
 for (var k = 0; k <= yrs; k++) {
 bPts.push({ x: pad.left + stepX * k, y: pad.top + ph - (base[k] / maxV) * ph });
 tPts.push({ x: pad.left + stepX * k, y: pad.top + ph - (tot[k] / maxV) * ph });
 }
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; drawSmoothLine(ctx, bPts); ctx.stroke(); ctx.restore();
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; drawSmoothLine(ctx, tPts); ctx.stroke();
 for (var t = 0; t <= yrs; t++) {
 if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) { ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('Y' + t, tPts[t].x, pad.top + ph + 18); }
 hitRegions.chartSim.push({ idx: t, x: tPts[t].x - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22, html: '<strong>Year ' + t + '</strong><br/>• With Buybacks &amp; Div: <strong>' + formatCurrency(tot[t]) + '</strong><br/>• Base OpInc Growth: <strong>' + formatCurrency(base[t]) + '</strong>' });
 }
 }

 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

 function wireCanvasTooltip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip'); if (!c || !tip) return;
 c.addEventListener('mousemove', function (e) {
 var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, hit = null;
 (hitRegions[cid] || []).forEach(function (rg) { if (!hit && x >= rg.x && x <= rg.x + rg.w && y >= rg.y && y <= rg.y + rg.h) hit = rg; });
 if (hit) { tip.innerHTML = hit.html; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px'; tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, e.clientY - 28)) + 'px'; } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }

 function init() {
 var st = safeGetStorage(STORAGE_THEME_KEY); if (st) state.theme = st.replace(/^"|"$/g, '');
 var sl = safeGetStorage(STORAGE_LANG_KEY); if (sl) state.lang = sl.replace(/^"|"$/g, '');
 var sc = safeGetStorage(STORAGE_CHECK_KEY); if (sc) { try { var p = JSON.parse(sc); if (Array.isArray(p) && p.length === 6) state.checks = p; } catch (e) {} }
 applyTheme(state.theme, true); applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
 else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var b = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
 var u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = 'VeriSign_Corporate_Culture_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 });

 document.querySelectorAll('[data-ch1-view]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-collapse-target]').forEach(function (b) {
 b.addEventListener('click', function () {
 var p = document.getElementById(this.getAttribute('data-collapse-target'));
 if (p) p.classList.toggle('open');
 });
 });
 document.querySelectorAll('[data-pillar]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.activePillar = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 document.querySelectorAll('[data-pillar]').forEach(function (x, idx) { x.classList.toggle('active', idx === state.activePillar); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[state.activePillar] + '</div>';
 drawRadarChart();
 });
 });
 document.querySelectorAll('[data-radar-key]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-radar-key'); state.radarSeries[k] = !state.radarSeries[k];
 this.classList.toggle('muted', !state.radarSeries[k]); drawRadarChart();
 });
 });
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 document.querySelectorAll('[data-peer-filter]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 document.querySelectorAll('[data-peer-filter]').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderPeerTable();
 });
 });

 var pS = document.getElementById('simPrincipalSlider'), yS = document.getElementById('simYearsSlider'), cS = document.getElementById('simCagrSlider'), dT = document.getElementById('simDripToggle');
 pS.addEventListener('input', function () { state.sim.principal = parseFloat(this.value); state.sim.preset = ''; updateSimulatorUI(); });
 yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10); state.sim.preset = ''; updateSimulatorUI(); });
 cS.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value); state.sim.preset = ''; updateSimulatorUI(); });
 dT.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-preset'), cfg = PRESETS[k]; if (!cfg) return;
 state.sim.principal = cfg.principal; state.sim.years = cfg.years; state.sim.priceCagr = cfg.priceCagr; state.sim.drip = cfg.drip; state.sim.preset = k;
 pS.value = cfg.principal; yS.value = cfg.years; cS.value = cfg.priceCagr; dT.checked = cfg.drip; updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var inp = e.target.closest('[data-check-input]'); if (!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () { state.checks = [true, true, true, true, true, true]; safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist(); });
 document.getElementById('resetCheckBtn').addEventListener('click', function () { state.checks = [true, true, true, false, false, false]; safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist(); });

 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 qIn.addEventListener('focus', function () {
 var list = isEn() ? QUICK_JUMP_EN : QUICK_JUMP_INDEX;
 qPop.innerHTML = list.map(function (it) { return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>'; }).join('');
 qPop.classList.add('open');
 });
 qPop.addEventListener('click', function (e) { var b = e.target.closest('[data-jump-sec]'); if (b) { document.getElementById(b.getAttribute('data-jump-sec')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); } });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 window.addEventListener('scroll', function () { var d = document.documentElement; document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / Math.max(1, d.scrollHeight - window.innerHeight)) * 100) + '%'; }, { passive: true });
 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);
 window.addEventListener('resize', renderAllCharts);
 }
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
 })();
 