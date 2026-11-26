
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_AUDIT_KEY = 'vrsn_culture_bp_audit_v1';

 var TITLE_ZH = '威瑞信企业文化与组织操作系统图谱：零宕机信仰、928人极简编制与26年创始舵手 | 数据中心';
 var TITLE_EN = 'VeriSign Organizational OS & Culture Blueprint: Zero-Downtime Creed & 928 FTEs | Research Hub';

 var state = {
 theme: 'dark',
 lang: 'zh',
 topoMode: 'apple',
 activeQuad: 0,
 activeEra: 2,
 eView: 'revemp',
 gView: 'emp',
 eraSeries: { fcf: true, rd: true },
 hover: { eraCanvas: -1, genomeCanvas: -1, entropyCanvas: -1 }
 };
 var hits = { eraCanvas: [], genomeCanvas: [], entropyCanvas: [] };

 function isEn() { return state.lang === 'en'; }
 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar'); if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569',
 grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', hoverBand: dark ? 'rgba(51,153,255,0.09)' : 'rgba(0,115,230,0.06)',
 pillBg: dark ? 'rgba(9,13,22,0.90)' : 'rgba(255,255,255,0.95)', pillBorder: dark ? 'rgba(51,153,255,0.34)' : 'rgba(0,115,230,0.25)',
 blue: dark ? '#3399FF' : '#0073E6', green: dark ? '#22C55E' : '#16A34A', violet: dark ? '#A78BFA' : '#7C3AED', amber: dark ? '#FFB74D' : '#D97706', red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 c0_lead: {
 zh: '当绝大多数美股软件与安全公司为了冲刺收入规模而不断扩张上万名销售与并购团队时，<strong>威瑞信（VeriSign）</strong>在 2008 年创始人 <strong>Jim Bidzos</strong> 重掌帅印后，反向执行了一场彻底的<strong>“减法革命”</strong>：接连剥离 SSL 证书与安全托管等重人力业务，把全部组织带宽锁定在 .com/.net 根域解析与全球根服务器维护上 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000006/vrsn-20251231.htm" target="_blank" rel="noopener noreferrer">SEC FY25 10-K ↗</a>。截至 FY2025 末，全公司仅有 <strong>928 名员工（其中 926 名全职）</strong>，却稳定支撑着全球 <strong>1.825 亿个域名</strong>与日均约 8,000 亿次查询，并连续 <strong>29 年+ 保持 100% 连续可用性</strong> <a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">FY25 年报 ↗</a>。',
 en: 'While most software and security peers expand headcount by thousands to chase top-line scale, <strong>VeriSign</strong> executed a radical <strong>"subtraction revolution"</strong> after founder <strong>Jim Bidzos</strong> returned as CEO in 2008—divesting SSL certificates and managed security to focus purely on .com/.net root resolution <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000006/vrsn-20251231.htm" target="_blank" rel="noopener noreferrer">SEC FY25 10-K ↗</a>. At year-end 2025, just <strong>928 employees (926 FTEs)</strong> supported <strong>182.5M domains</strong> and ~800B daily queries with <strong>29+ years of 100% availability</strong> <a class="cite-link" href="https://investor.verisign.com/news-releases/news-release-details/verisign-reports-fourth-quarter-and-full-year-2025-results/" target="_blank" rel="noopener noreferrer">FY25 Release ↗</a>.'
 },
 c0_quote: {
 zh: '<strong>组织核心信条（VeriSign Form 10-K 披露）：</strong>“我们的员工是使命驱动且专注于价值观的；正是这支不到千人的精锐团队的奉献精神，使威瑞信得以在超过四分之一个世纪里保持 .com 与 .net 域名解析 100% 的连续可用性。” <a class="cite-link" href="https://investor.verisign.com/static-files/01e6867e-8c9e-4923-9b62-da81aeeb90ef" target="_blank" rel="noopener noreferrer">Form 10-K ↗</a>',
 en: '<strong>Institutional Creed (VeriSign Form 10-K):</strong> “Our employees are mission driven and values focused. Their dedication to these principles forms the backbone that enables Verisign to provide 100% availability for .com and .net resolution for over a quarter century.” <a class="cite-link" href="https://investor.verisign.com/static-files/01e6867e-8c9e-4923-9b62-da81aeeb90ef" target="_blank" rel="noopener noreferrer">Form 10-K ↗</a>'
 },
 c2_note: {
 zh: '注：FY2025 末全公司仅 928 名员工，人均创收达 <strong>$1.79M</strong>（FY26E 随营收增至 ~$1.76B 迈向 <strong>$1.89M/人</strong>），而自由现金流 ($1,068.3M) 为研发费用 ($103.6M) 的 <strong>10.3 倍</strong>。',
 en: 'Note: With 928 employees at year-end FY25, Rev/FTE reached <strong>$1.79M</strong> (heading toward <strong>$1.89M</strong> in FY26E), while FCF ($1,068.3M) equals <strong>10.3x</strong> annual R&amp;D ($103.6M).'
 },
 c3_note: {
 zh: '观察结论：威瑞信虽总营收规模远小于万亿科技巨头，但凭借<strong>“928人极简上游垄断 + 零零售团队”</strong>，在营业利润率（<strong>67.7%</strong>）上高居全球基础设施企业榜首。',
 en: 'Key Takeaway: Though smaller in total revenue than mega-caps, VeriSign’s <strong>928-FTE upstream monopoly with zero retail sales force</strong> achieves a peer-leading <strong>67.7% operating margin</strong>.'
 }
 };

 function renderTopo(mode) {
 state.topoMode = mode === 'legacy' ? 'legacy' : 'apple';
 var stage = document.getElementById('topoStage'); if (!stage) return;
 var en = isEn();
 if (state.topoMode === 'apple') {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono">CEO (Jim Bidzos) × 928-FTE Single-Mission Registry Spine ($1.76B)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>Root &amp; DNS Ops</b>A/J Root Servers + global Anycast at 100% uptime</div>' +
 '<div class="cc-spoke"><b>Verisign Labs</b>CSO Danny McPherson · PQ-DNSSEC &amp; Informed™</div>' +
 '<div class="cc-spoke"><b>ICANN &amp; Policy</b>Presumptive renewal &amp; .com/.web contract governance</div>' +
 '<div class="cc-spoke"><b>Registrar API</b>Automated EPP billing to 1,000+ global registrars</div>' +
 '<div class="cc-spoke"><b>Zero Retail Sales</b>Registrars fund 100% of consumer marketing &amp; support</div>' +
 '<div class="cc-spoke"><b>Capital Treasury</b>$1.46B float + $1B+ annual buybacks &amp; dividends</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">Outcome: 67.7% operating margin, $1.79M Rev/FTE, 29+ years 100% uptime, and zero bureaucratic middle-management sprawl.</div>'
 : '<div class="cc-topo-hub mono">CEO (Jim Bidzos) × 928人单一使命根域中枢 ($1.76B)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>根解析与运维</b>A/J 根服务器与全球 Anycast 集群 100% 在线</div>' +
 '<div class="cc-spoke"><b>Verisign Labs</b>CSO Danny McPherson · 抗量子与 Informed™</div>' +
 '<div class="cc-spoke"><b>ICANN 合规法务</b>维护推定续约权、.com 提价及 .web 上线</div>' +
 '<div class="cc-spoke"><b>注册商接口</b>EPP 自动化批发对接全球 1,000+ 认证注册商</div>' +
 '<div class="cc-spoke"><b>零零售直销团队</b>把全部前端营销与客服成本留给下游注册商</div>' +
 '<div class="cc-spoke"><b>资本配置金库</b>管理 $14.63亿浮存金与每年超 $10亿回购分红</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：67.7% 营业利润率、$1.79M 人均创收、29年+零宕机纪录与零冗余中层内耗</div>';
 } else {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">2000s Conglomerate Era · Bloated Multi-BU Sprawl (5,000+ Staff)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>SSL Retail Sales</b>Heavy enterprise sales force competing on price</div>' +
 '<div class="cc-spoke silo"><b>Managed Security</b>Labor-intensive SOC consulting services</div>' +
 '<div class="cc-spoke silo"><b>Telecom Billing</b>Low-margin carrier software &amp; messaging</div>' +
 '<div class="cc-spoke silo"><b>Content Delivery</b>CapEx-heavy CDN infrastructure races</div>' +
 '<div class="cc-spoke silo"><b>M&amp;A Integration</b>Endless post-merger restructuring &amp; write-downs</div>' +
 '<div class="cc-spoke silo"><b>Diluted Focus</b>Margin-draining units masking .com crown jewel</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">Failure Mode (Pre-2008 Lesson): Top-line vanity growth crushed margins and distracted management until Bidzos divested non-core units.</div>'
 : '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">2000年代多元膨胀期 · 多事业部并购臃肿 (5,000+ 员工)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>SSL 零售业务</b>养庞大企业销售团队打价格战</div>' +
 '<div class="cc-spoke silo"><b>安全托管咨询</b>重人力 SOC 驻场外包服务</div>' +
 '<div class="cc-spoke silo"><b>电信计费软件</b>低毛利运营商短信与计费系统</div>' +
 '<div class="cc-spoke silo"><b>CDN 内容分发</b>重资产服务器扩容烧钱竞争</div>' +
 '<div class="cc-spoke silo"><b>并购整合内耗</b>频繁重组与商誉减值分散高层精力</div>' +
 '<div class="cc-spoke silo"><b>利润率被稀释</b>平庸业务掩盖了 .com 印钞机成色</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">教训：追求虚胖营收规模曾严重拖累利润率，直到 2008 年 Jim Bidzos 回归大刀阔斧剥离全部非核心资产</div>';
 }
 }

 var QUADS = [
 { badge: 'Q1 · ZERO-DOWNTIME ENGINEERING CREED', titleZh: '零宕机信仰三大准则：物理冗余 × 混沌演练 × 保守发布', titleEn: 'Zero-Downtime Creed: Physical Redundancy × Chaos Testing × Conservative Releases', descZh: '在威瑞信，任何会影响 .com/.net 解析可用性的代码变更都会被一票否决。全球 Anycast 节点保持数倍于峰值流量的冗余余量，实现连续 29 年+ 100% 可用性。', descEn: 'Any code change threatening .com/.net availability is vetoed on sight. Global Anycast clusters maintain massive headroom, sustaining 29+ years of 100% uptime.', alloc: [48, 22, 18, 12] },
 { badge: 'Q2 · 928-FTE EXTREME TALENT DENSITY', titleZh: '928人极简编制铁律：把重人力环节彻底留给下游生态', titleEn: '928-FTE Discipline: Leaving Labor-Heavy Retail to Downstream Registrars', descZh: '公司不设消费级营销与客服中心，所有 928 名员工集中于核心根区运维、安全研发、ICANN 合规与资本配置，SG&A 仅占营收 14.2%。', descEn: 'With zero retail marketing or call centers, all 928 employees focus on root ops, security R&D, ICANN policy, and treasury—holding SG&A to 14.2% of sales.', alloc: [35, 25, 22, 18] },
 { badge: 'Q3 · RADICAL SUBTRACTION & HIGH ROIC', titleZh: '战略减法哲学：宁可营收瘦身，绝不让低毛利业务污染主业', titleEn: 'Radical Subtraction: Never Let Low-Margin Units Pollute a 67.7% OpM Core', descZh: '2008–2018 年果断出售 SSL 证书与安全服务，将营业利润率推升至 67.7%，证明做减法比做加法更能创造长期股东价值。', descEn: 'Selling SSL certificates and managed security lifted operating margins to 67.7%, proving subtraction creates far more shareholder value than vanity M&A.', alloc: [30, 20, 15, 35] },
 { badge: 'Q4 · FOUNDER-LED INSTITUTIONAL CONTINUITY', titleZh: '创始人长期掌舵：跨周期政策定力与十年磨一剑的耐心', titleEn: 'Founder Stewardship: Multi-Decade Policy Continuity & Patience', descZh: 'Jim Bidzos 与核心高管团队历经 2020/2024 ICANN 续约及长达十年的 .web 仲裁直至 2026 年完胜，展现出极罕见的机构耐心。', descEn: 'Jim Bidzos and his tenured team navigated 2020/2024 ICANN renewals and a 10-year .web battle to victory in 2026.', alloc: [25, 35, 18, 22] }
 ];

 function renderQuad(idx) {
 state.activeQuad = idx;
 var q = QUADS[idx] || QUADS[0], en = isEn();
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = en ? q.titleEn : q.titleZh;
 document.getElementById('dialDesc').textContent = en ? q.descEn : q.descZh;
 [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (pair) {
 document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
 document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
 });
 }

 var ERAS = [
 { badge: 'ERA I · 1995–2007 · RSA SPIN-OFF & CONGLOMERATE SPRAWL', titleZh: '创立与扩张迷失期：夺得 .com 皇冠，却陷入多元并购臃肿', titleEn: 'Origins & M&A Sprawl: Winning .com Crown, Diluting Focus', descZh: '1995 年由 Jim Bidzos 从 RSA 分拆创立，2000 年收购 Network Solutions 掌控 .com/.net，但随后大举并购安全、电信与 CDN 业务，员工膨胀至数千人，利润率承压。', descEn: 'Spun out of RSA in 1995 and acquired Network Solutions in 2000 for .com/.net, but subsequent M&A in security, telecom, and CDN bloated headcount and diluted margins.', kpisZh: [['2000年', '收购 Network Solutions 获 .com'], ['5,000+人', '多元并购期员工一度极度膨胀'], ['多事业部', '低毛利安全/电信业务拖累利润'], ['100% SLA', '唯一坚守的根解析可靠性底线']], kpisEn: [['2000', 'Acquired Network Solutions (.com)'], ['5,000+ FTEs', 'Headcount Bloated via M&A'], ['Multi-BU', 'Low-Margin Units Dragged OpM'], ['100% SLA', 'Unbroken Root DNS Uptime']] },
 { badge: 'ERA II · 2008–2018 · FOUNDER RETURN & RADICAL SLIM-DOWN', titleZh: '瘦身重生期：Jim Bidzos 回归剥离非核心资产，迎巴菲特重仓', titleEn: 'Founder Return & Slim-Down: Divesting Non-Core Units, Attracting Buffett', descZh: '2008 年 Jim Bidzos 重任 CEO，接连出售 SSL 证书（予赛门铁克）与安全托管（予 Neustar），员工缩编至千人以内，营业利润率飙升至 65%+，2012 年获伯克希尔买入。', descEn: 'Jim Bidzos returned as CEO in 2008, sold SSL certificates and managed security, shrank staff below 1,000, lifted OpM above 65%, and earned Berkshire Hathaway’s investment in 2012.', kpisZh: [['2008.07', 'Jim Bidzos 回任 CEO 开启瘦身'], ['$1.28B', '剥离 SSL 证书回笼巨额现金'], ['<1,000人', '编制彻底纯化为根域精兵'], ['65%+ OpM', '跃居美股最高利润率基础设施']], kpisEn: [['Jul 2008', 'Bidzos Returned as CEO'], ['$1.28B', 'SSL Divestiture Cash Proceeds'], ['<1,000 FTEs', 'Pure-Play Registry Headcount'], ['65%+ OpM', 'Top-Tier Infrastructure Margins']] },
 { badge: 'ERA III · 2019–2026+ · PRICING CYCLE, .WEB & INFORMED™', titleZh: '收获与第二曲线期：.com 四连提价落地，.web 与 Informed™ 启航', titleEn: 'Harvest & Second Curve: .com Price Escalators, .web & Informed™', descZh: '在锁定 2030 年 .com 合同续期后，2026 年 11 月首轮 .com 提价至 $10.97 落地；同期 .web 定档 2026.12 日出期与 2027.04 开放，Verisign Informed™ 开启测试。', descEn: 'After securing .com through 2030, Round 1 pricing hit $10.97 in Nov 2026, .web cleared for Dec 2026–Apr 2027 launch, and Verisign Informed™ entered beta.', kpisZh: [['$1,656.6M', 'FY2025 营收 (FY26E $1.758B)'], ['928人', 'FY25 员工数 ($1.79M 人均创收)'], ['67.7% OpM', 'FY25 营业利润 $1,121.0M'], ['182.5M', 'Q3 2026 .com/.net 域名基数']], kpisEn: [['$1,656.6M', 'FY25 Revenue (FY26E $1.758B)'], ['928 FTEs', 'FY25 Staff ($1.79M Rev/FTE)'], ['67.7% OpM', 'FY25 OpInc $1,121.0M'], ['182.5M', 'Q3 2026 .com/.net Domain Base']] }
 ];

 function renderEra(idx) {
 state.activeEra = idx;
 var er = ERAS[idx] || ERAS[2], en = isEn();
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = en ? er.titleEn : er.titleZh;
 document.getElementById('eraDesc').textContent = en ? er.descEn : er.descZh;
 var kpis = en ? er.kpisEn : er.kpisZh;
 document.getElementById('eraKpis').innerHTML = kpis.map(function (k) { return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
 }

 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 drawAll();
 if (!silent) showToast(isEn() ? (state.theme === 'dark' ? 'Dark Mode' : 'Light Mode') : (state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至浅色模式'));
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.lang = en ? 'en' : 'zh-CN';
 document.title = en ? TITLE_EN : TITLE_ZH;
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', !en); zhB.setAttribute('aria-pressed', String(!en)); }
 if (enB) { enB.classList.toggle('active', en); enB.setAttribute('aria-pressed', String(en)); }
 document.querySelectorAll('[data-i18n-zh]').forEach(function (n) {
 var val = n.getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) { if (val.indexOf('<span') !== -1) n.innerHTML = val; else n.textContent = val; }
 });
 document.querySelectorAll('[data-i18n-rich]').forEach(function (n) {
 var rk = n.getAttribute('data-i18n-rich');
 if (RICH_I18N[rk]) n.innerHTML = en ? RICH_I18N[rk].en : RICH_I18N[rk].zh;
 });
 document.querySelectorAll('[data-i18n-ph-zh]').forEach(function (n) { n.setAttribute('placeholder', n.getAttribute(en ? 'data-i18n-ph-en' : 'data-i18n-ph-zh')); });
 renderTopo(state.topoMode); renderQuad(state.activeQuad); renderEra(state.activeEra);
 updateEntropySim(); refreshAuditChip(); renderEraLegend(); drawAll();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 document.getElementById('topoSwitch').addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]'); if (!b) return;
 document.querySelectorAll('#topoSwitch .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderTopo(b.getAttribute('data-topo'));
 });
 document.getElementById('quadGrid').addEventListener('click', function (e) {
 var c = e.target.closest('[data-quad]'); if (!c) return;
 document.querySelectorAll('#quadGrid .cc-quad-card').forEach(function (x) { x.classList.toggle('active', x === c); });
 renderQuad(parseInt(c.getAttribute('data-quad'), 10) || 0);
 });
 document.getElementById('eraTabs').addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]'); if (!t) return;
 document.querySelectorAll('#eraTabs .cc-era-tab').forEach(function (x) { x.classList.toggle('active', x === t); });
 renderEra(parseInt(t.getAttribute('data-era'), 10) || 0);
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect(), w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return; var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }
 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) { var xc = (pts[i].x + pts[i + 1].x) / 2; ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y); }
 }
 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save(); ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 var tw = ctx.measureText(text).width + 10, th = 17;
 ctx.fillStyle = pal.pillBg; roundRect(ctx, cx - tw / 2, cy - th / 2, tw, th, 5); ctx.fill();
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, cx, cy + 0.5); ctx.restore();
 }

 function renderEraLegend() {
 var leg = document.getElementById('eraLegend'); if (!leg) return;
 var en = isEn();
 if (state.eView === 'revemp') leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Bars: Revenue per Employee ($M · 2007–2026E)' : '柱状图：员工人均年创收 ($M · 2007–2026E)') + '</span>';
 else leg.innerHTML = '<button type="button" class="legend-pill' + (state.eraSeries.fcf ? '' : ' muted') + '" data-era-series="fcf"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Free Cash Flow ($M)' : '自由现金流 FCF ($M)') + '</span></button><button type="button" class="legend-pill' + (state.eraSeries.rd ? '' : ' muted') + '" data-era-series="rd"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'R&amp;D Spend ($M)' : '研发投入 R&amp;D ($M)') + '</span></button>';
 }
 document.getElementById('eraLegend').addEventListener('click', function (e) {
 var b = e.target.closest('[data-era-series]'); if (!b) return;
 var k = b.getAttribute('data-era-series'); state.eraSeries[k] = !state.eraSeries[k];
 if (!state.eraSeries.fcf && !state.eraSeries.rd) state.eraSeries[k] = true;
 renderEraLegend(); drawEraCanvas();
 });

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.eView === 'revemp') {
 var yrs = ['2007', '2012', '2016', '2021', '2025', '2026E'], revEmp = [0.35, 0.85, 1.12, 1.46, 1.79, 1.89], maxV = 2.2;
 for (var g = 0; g <= 4; g++) { var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(1) + 'M', pad.left - 8, gy + 4); }
 var slot = pw / yrs.length, bw = Math.min(42, slot * 0.56);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, bh = (revEmp[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 4 ? pal.green : pal.blue; roundRect(ctx, cx - bw / 2, yt, bw, bh, 6); ctx.fill();
 drawValueBadge(ctx, '$' + revEmp[i].toFixed(2) + 'M', cx, yt - 12, i >= 4 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(y, cx, pad.top + ph + 20);
 hits.eraCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 28, title: y + ' Rev/FTE', body: '$' + revEmp[i].toFixed(2) + 'M / Employee' });
 });
 } else {
 var lyrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'], rdM = [79.0, 88.0, 93.0, 96.7, 103.6], fcfM = [779, 804, 815, 874.5, 1068.3], maxF = 1200, stepX = pw / 4;
 for (var k = 0; k <= 3; k++) { var kv = k * 400, ky = pad.top + ph - (kv / maxF) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv + 'M', pad.left - 8, ky + 4); }
 lyrs.forEach(function (lb, idx) { var px = pad.left + idx * stepX; ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(lb, px, pad.top + ph + 20); hits.eraCanvas.push({ idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26, title: lb, body: 'FCF: $' + fcfM[idx] + 'M · R&D: $' + rdM[idx] + 'M' }); });
 function plot(arr, col) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxF) * ph, v: v }; });
 ctx.strokeStyle = col; ctx.lineWidth = 2.8; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2); ctx.fill(); drawValueBadge(ctx, '$' + pt.v.toFixed(0) + 'M', pt.x, pt.y - 14, col, pal); });
 }
 if (state.eraSeries.fcf) plot(fcfM, pal.green);
 if (state.eraSeries.rd) plot(rdM, pal.blue);
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.genomeCanvas = [];
 var pad = { top: 20, right: 54, bottom: 24, left: 138 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var peers = [
 { name: en ? 'NVIDIA (Flat)' : 'NVIDIA (职能扁平)', emp: 5.14, opm: 62.0, col: pal.violet },
 { name: en ? 'Apple (Single P&L)' : 'Apple (单一P&L)', emp: 2.87, opm: 33.0, col: pal.blue },
 { name: en ? 'VeriSign (928 FTE)' : 'VeriSign (928精兵)', emp: 1.79, opm: 67.7, col: pal.green },
 { name: en ? 'Microsoft (M-Form)' : 'Microsoft (事业部)', emp: 1.49, opm: 44.5, col: pal.amber },
 { name: en ? 'GoDaddy (Retail)' : 'GoDaddy (下游零售)', emp: 0.80, opm: 20.5, col: pal.blue }
 ];
 var isEmp = (state.gView === 'emp'), maxX = isEmp ? 5.8 : 75, rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.opm, cy = pad.top + idx * rowH + rowH / 2, bh = 22, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
 ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = idx === 2 ? pal.green : pal.sub; ctx.font = (idx === 2 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 8, cy + 4);
 hits.genomeCanvas.push({ idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH, title: p.name, body: 'Rev/FTE: $' + p.emp.toFixed(2) + 'M · OpM: ' + p.opm.toFixed(1) + '%' });
 });
 }

 var entropySeries = [68, 67.7, 56, 44, 32];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.entropyCanvas = [];
 var pad = { top: 24, right: 22, bottom: 26, left: 38 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['800 FTE', '928 (VRSN)', '2,000 FTE', '3,500 FTE', '5,000 (Bloat)'] : ['800人', '928人(威瑞信)', '2,000人', '3,500人', '5,000人(膨胀)'];
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var pts = entropySeries.map(function (v, i) { return { x: pad.left + (i / 4) * pw, y: pad.top + ph - (v / 80) * ph, v: v }; });
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, i) {
 ctx.fillStyle = i === 1 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 13, i === 1 ? pal.green : pal.violet, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(lbls[i], pt.x, pad.top + ph + 16);
 hits.entropyCanvas.push({ idx: i, x: pt.x - 30, y: pad.top, w: 60, h: ph + 24, title: lbls[i], body: (en ? 'Projected Operating Margin: ' : '推演营业利润率: ') + pt.v.toFixed(1) + '%' });
 });
 }

 function updateEntropySim() {
 var skus = parseInt(document.getElementById('rngSkus').value, 10), exp = parseInt(document.getElementById('rngExp').value, 10), lag = parseInt(document.getElementById('rngLag').value, 10), en = isEn();
 document.getElementById('valSkus').textContent = en ? (skus + ' FTEs' + (skus <= 1100 ? ' (Lean)' : ' (Bloated)')) : (skus + ' 人' + (skus <= 1100 ? ' (极简精兵)' : ' (编制膨胀)'));
 document.getElementById('valExp').textContent = exp + '%';
 document.getElementById('valLag').textContent = lag + (en ? (lag <= 20 ? '% (Low)' : '% (High)') : (lag <= 20 ? '% (低摩擦)' : '% (高摩擦)'));
 var opm = Math.max(22, Math.min(72, 67.7 - Math.max(0, (skus - 928) * 0.008) - (100 - exp) * 0.35 - (lag - 12) * 0.25));
 var rel = Math.max(70, Math.min(100, Math.round(99 - Math.max(0, (skus - 1200) * 0.004) - (lag - 12) * 0.25)));
 var rpe = (1656.6 / skus).toFixed(2);
 document.getElementById('outSynergy').textContent = rel + ' / 100';
 document.getElementById('outVelocity').textContent = opm.toFixed(1) + '%';
 document.getElementById('outGmPrem').textContent = '$' + rpe + 'M';
 entropySeries = [800, 928, 2000, 3500, 5000].map(function (s) { return Math.max(20, Math.min(72, 67.7 - Math.max(0, (s - 928) * 0.008) - (100 - exp) * 0.30 - (lag - 12) * 0.20)); });
 drawEntropyCanvas();
 }
 ['rngSkus', 'rngExp', 'rngLag'].forEach(function (id) { document.getElementById(id).addEventListener('input', updateEntropySim); });

 document.getElementById('eChartTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-eview]'); if (!b) return;
 state.eView = b.getAttribute('data-eview');
 document.querySelectorAll('#eChartTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderEraLegend(); drawEraCanvas();
 });
 document.getElementById('gChartTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-gview]'); if (!b) return;
 state.gView = b.getAttribute('data-gview');
 document.querySelectorAll('#gChartTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 drawGenomeCanvas();
 });

 function bindTooltip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip'); if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, hit = null;
 (hits[cid] || []).forEach(function (rg) { if (!hit && mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) hit = rg; });
 if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 305, Math.max(12, ev.clientX + 14)) + 'px'; tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, ev.clientY - 28)) + 'px'; } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['eraCanvas', 'genomeCanvas', 'entropyCanvas'].forEach(bindTooltip);
 function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }

 var QITEMS_ZH = [
 { id: 'sec-c0', t: 'C0 928人拓扑与极简悖论', s: '29年+零宕机 · 精兵职能制 vs 2000s并购膨胀沙盘' },
 { id: 'sec-c1', t: 'C1 四大文化基因与守夜人罗盘', s: '100% SLA · 928人编制 · 战略减法 · 创始人掌舵' },
 { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1995–2026+)', s: 'RSA分拆 / 2008瘦身革命 / 提价+.web新周期' },
 { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱对比', s: 'VeriSign vs NVIDIA / Apple / Microsoft / Berkshire' },
 { id: 'sec-c4', t: 'C4 组织膨胀压力测试与六律体检', s: '编制膨胀对营业利润率冲击 · 6项组织护城河核查' }
 ];
 var QITEMS_EN = [
 { id: 'sec-c0', t: 'C0 928-FTE Topology & Lean Paradox', s: '29+ Yrs 100% Uptime · Lean Spine vs. 2000s M&A Bloat' },
 { id: 'sec-c1', t: 'C1 4 Cultural Codes & Stewardship Dial', s: 'Zero-Downtime · 928 FTEs · Subtraction · Founder Continuity' },
 { id: 'sec-c2', t: 'C2 Three-Era Governance Timeline', s: 'RSA Spin-Off / 2008 Slim-Down / Pricing & .web Cycle' },
 { id: 'sec-c3', t: 'C3 Mega-Cap Cultural Genome Arena', s: 'VeriSign vs. NVIDIA / Apple / Microsoft / Berkshire' },
 { id: 'sec-c4', t: 'C4 Bloat Stress Test & 6-Law Audit', s: 'Headcount Bloat Simulator · 6-Point Organizational Audit' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 qIn.addEventListener('focus', function () {
 var src = isEn() ? QITEMS_EN : QITEMS_ZH;
 qPop.innerHTML = src.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.add('open');
 });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (jb) { document.querySelector(jb.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); } });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 window.addEventListener('scroll', function () { var d = document.documentElement; document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / Math.max(1, d.scrollHeight - window.innerHeight)) * 100) + '%'; }, { passive: true });

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]'), done = 0;
 boxes.forEach(function (b) { if (b.checked) done++; });
 document.getElementById('auditScoreChip').textContent = isEn() ? ('Culture Audit: ' + done + ' / ' + boxes.length) : ('文化自检核验：' + done + ' / ' + boxes.length + ' 项');
 }
 try {
 var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (chk) {
 var k = chk.getAttribute('data-cchk'); chk.checked = !!savedA[k];
 chk.addEventListener('change', function () { savedA[k] = chk.checked; try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {} refreshAuditChip(); });
 });
 } catch (e) {}

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) { applyLang('zh', true); }

 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });
 window.addEventListener('resize', drawAll);
 })();
 