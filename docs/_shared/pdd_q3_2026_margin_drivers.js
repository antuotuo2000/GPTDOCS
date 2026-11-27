
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'pdd_earnings_theme_v1';
 var STORAGE_LANG_KEY = 'pdd_earnings_lang_v1';
 var STORAGE_AUDIT_KEY = 'pdd_q3_2026_audit_v1';

 var TITLE_ZH = '拼多多 (PDD) 2026 Q3 财报深度解析：双引擎切换、30% 营业利润率与千亿扶持 | 数据中心';
 var TITLE_EN = 'PDD Holdings Q3 2026 Earnings Deep Dive: Dual-Engine Shift & 30% OPM | Research Hub';

 var state = {
 theme: 'light',
 lang: 'zh',
 topoMode: 'marketing',
 activeQuad: 0,
 activeEra: 2,
 eView: 'mix',
 gView: 'opm',
 eraSeries: { opm: true, ocf: true },
 hover: { eraCanvas: -1, genomeCanvas: -1, entropyCanvas: -1 }
 };
 var hits = { eraCanvas: [], genomeCanvas: [], entropyCanvas: [] };

 function isEn() { return state.lang === 'en'; }

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg;
 bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }

 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark,
 text: dark ? '#F3F6F9' : '#0F1924',
 sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569',
 grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
 hoverBand: dark ? 'rgba(51, 153, 255, 0.09)' : 'rgba(0, 115, 230, 0.06)',
 pillBg: dark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
 pillBorder: dark ? 'rgba(51, 153, 255, 0.34)' : 'rgba(0, 115, 230, 0.25)',
 blue: dark ? '#3399FF' : '#0073E6',
 green: dark ? '#22C55E' : '#16A34A',
 violet: dark ? '#A78BFA' : '#7C3AED',
 amber: dark ? '#FFB74D' : '#D97706',
 red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 c0_lead: {
 zh: '2026 年 11 月 19 日，拼多多（NASDAQ: PDD）交出了一份极具分裂感的第三季度成绩单：总营收录得 <strong>RMB 108.34B（$16.16B）</strong>，同比仅微增 <strong>+0.1%</strong>（低于市场预期的 ¥116.0B）；但另一侧，GAAP 营业利润飙升 <strong>+24.5%</strong> 至 <strong>RMB 31.16B</strong>，Non-GAAP 净利润达 <strong>RMB 31.02B</strong>（摊薄 ADS 收益 ¥21.04），大幅超越华尔街一致预期 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">PDD Q3 2026 官方财报 ↗</a>。 这一“增利不增收”的反差，源于内部两大引擎的剧烈对冲：高毛利的<strong>主站在线营销服务（+12.1% YoY）</strong>在“千亿扶持”生态反哺下加速回暖，而受欧美关税与小额包裹税改冲击的<strong>交易服务（-11.7% YoY）</strong>则主动收缩并转向海外本地仓重资产基建。',
 en: 'On Nov 19, 2026, PDD Holdings (NASDAQ: PDD) delivered a striking Q3 divergence: total revenue came in at <strong>RMB 108.34B ($16.16B)</strong>, up just <strong>+0.1% YoY</strong> (missing the ~RMB 116.0B consensus), yet GAAP operating profit jumped <strong>+24.5% YoY</strong> to <strong>RMB 31.16B</strong> and Non-GAAP net income reached <strong>RMB 31.02B</strong> (RMB 21.04/ADS), solidly beating Wall Street estimates <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">PDD Q3 2026 Release ↗</a>. This divergence reflects two offsetting engines: high-margin <strong>Online Marketing (+12.1% YoY)</strong> accelerated as merchant investments paid off, while <strong>Transaction Services (-11.7% YoY)</strong> contracted under EU/US trade headwinds and a pivot toward local warehousing.'
 },
 c0_quote: {
 zh: '<strong>管理层电话会核心定调（陈磊 &amp; 赵佳臻）：</strong>“跨境业务正面临快速演变的国际贸易与税收规则（如欧盟 7 月生效的小额包裹关税），我们将坚定推进端到端全球本地仓与履约网络建设；国内‘千亿扶持’已覆盖研发、生产到履约全链路，生态投入正逐步转化为更高质量的平台韧性。” <a class="cite-link" href="https://stockanalysis.com/stocks/pdd/transcripts/738375-q3-2026/" target="_blank" rel="noopener noreferrer">Q3 电话会实录 ↗</a>',
 en: '<strong>Management Call Tone (Lei Chen &amp; Jiazhen Zhao):</strong> “As global trade and tax rules evolve rapidly—including EU parcel duties effective July—we are committed to building an end-to-end global warehousing and fulfillment network. Domestically, our RMB 100B merchant-support program across R&amp;D, production, and fulfillment is strengthening long-term platform resilience.” <a class="cite-link" href="https://stockanalysis.com/stocks/pdd/transcripts/738375-q3-2026/" target="_blank" rel="noopener noreferrer">Q3 Transcript ↗</a>'
 },
 c2_note: {
 zh: '注：2026 年前三季度累计营收 <strong>RMB 326.93B（+6.2% YoY）</strong>，累计 GAAP 营业利润 <strong>RMB 78.49B（+17.3% YoY）</strong>；但因 Q1–Q2 汇兑及其他营业外项目波动，9M26 归母净利润为 RMB 69.27B（-7.4% YoY） <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 9M 合并表 ↗</a>。',
 en: 'Note: For 9M 2026, cumulative revenue reached <strong>RMB 326.93B (+6.2% YoY)</strong> and GAAP operating profit rose <strong>+17.3% YoY</strong> to <strong>RMB 78.49B</strong>, while 9M net income was RMB 69.27B (-7.4% YoY) due to non-operating/FX swings in 1H26 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 9M Table ↗</a>.'
 },
 c3_note: {
 zh: '核心结论：拼多多以约 <strong>2.55万名全职员工</strong>（2025 20-F）支撑起 <strong>28.8% GAAP 营业利润率</strong>，在营收仅为京东 35%、阿里 40% 的情况下，Q3 营业利润（¥31.2B）高出阿里（¥29.1B）且为京东（¥5.2B）的 6 倍。',
 en: 'Key Takeaway: With ~<strong>25,474 employees</strong> (2025 20-F), PDD generated a <strong>28.8% GAAP operating margin</strong>—producing RMB 31.2B in Q3 operating profit, ahead of Alibaba (RMB 29.1B) and 6x JD.com (RMB 5.2B) despite 60–65% lower top-line revenue.'
 }
 };

 function renderTopo(mode) {
 state.topoMode = mode === 'transaction' ? 'transaction' : 'marketing';
 var stage = document.getElementById('topoStage');
 if (!stage) return;
 var en = isEn();
 if (state.topoMode === 'marketing') {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono">Online Marketing &amp; Others · RMB 59.82B (+12.1% YoY · 55.2% Mix)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>Ad Acceleration</b>Accelerated from +2% (Q1) &amp; +3% (Q2) to +12.1% in Q3</div>' +
 '<div class="cc-spoke"><b>Merchant ROI</b>¥100B support + fee rebates boosted seller ad budgets</div>' +
 '<div class="cc-spoke"><b>Western Villages</b>Free Shipping to Villages drove >30% remote order growth</div>' +
 '<div class="cc-spoke"><b>1P Brand Push</b>RMB 15B 1P brand arm scaling launches across categories</div>' +
 '<div class="cc-spoke"><b>S&amp;M Discipline</b>Marketing spend cut -16.6% YoY to RMB 25.30B</div>' +
 '<div class="cc-spoke"><b>Gross Margin</b>Zero physical COGS lifted group GM +1.5pp to 58.2%</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">Outcome: High-margin domestic ad recovery + S&amp;M discipline pushed Non-GAAP OPM to 30.1% (RMB 32.64B).</div>'
 : '<div class="cc-topo-hub mono">在线营销服务及其他 · RMB 59.82B (+12.1% YoY · 占总营收 55.2%)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke"><b>增速强势反弹</b>从 Q1 (+2%)、Q2 (+3%) 显著提速至 Q3 的 +12.1%</div>' +
 '<div class="cc-spoke"><b>千亿扶持变现</b>技术服务费减免反哺商家毛利，带动站内投流意愿回升</div>' +
 '<div class="cc-spoke"><b>电商西进增量</b>偏远地区包邮与中转补贴带动西部订单增长超 30%</div>' +
 '<div class="cc-spoke"><b>1P 自营上新</b>“新拼姆”一期 150 亿品牌自营进入多品类规模化上新</div>' +
 '<div class="cc-spoke"><b>营销费率收敛</b>销售费用同比大降 16.6% 至 ¥25.30B，效率显著优化</div>' +
 '<div class="cc-spoke"><b>毛利结构拉升</b>高毛利广告占比回升，推动综合毛利率升至 58.2% (+1.5pp)</div>' +
 '</div>' +
 '<div class="cc-topo-outcome">结果：主站高毛利广告引擎重启 + 营销费用收缩，共同托举 Non-GAAP 营业利润率重返 30.1%。</div>';
 } else {
 stage.innerHTML = en
 ? '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">Transaction Services · RMB 48.52B (-11.7% YoY · 44.8% Mix)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>Sharp Reversal</b>Swung from +20% (Q1) &amp; +13% (Q2) to -11.7% in Q3</div>' +
 '<div class="cc-spoke silo"><b>EU Parcel Duty</b>€3 flat customs duty on sub-€150 parcels hit from July 1</div>' +
 '<div class="cc-spoke silo"><b>US Tariff Shift</b>Post-May 2025 de minimis repeal pressured direct-mail SKUs</div>' +
 '<div class="cc-spoke silo"><b>SME Squeeze</b>Cross-border SME merchants face rising compliance &amp; tax costs</div>' +
 '<div class="cc-spoke silo"><b>DSA &amp; Antitrust</b>EU DSA €200M fine (appealed) &amp; German pricing scrutiny</div>' +
 '<div class="cc-spoke silo"><b>Local Pivot</b>Shifting toward shared overseas warehouses &amp; semi-managed</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">Trade-Off: Near-term transaction revenue shrinks as Temu transitions from cross-border direct mail to local fulfillment.</div>'
 : '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">交易服务收入（含佣金与 Temu 履约）· RMB 48.52B (-11.7% YoY · 占比 44.8%)</div>' +
 '<div class="cc-topo-spokes">' +
 '<div class="cc-spoke silo"><b>增速剧烈换挡</b>从 Q1 (+20%)、Q2 (+13%) 骤然转负至 Q3 的 -11.7%</div>' +
 '<div class="cc-spoke silo"><b>欧盟小包关税</b>2026年7月起欧盟对 €150 以下包裹征收 €3 关税冲击直邮</div>' +
 '<div class="cc-spoke silo"><b>美国免税取消</b>2025年5月取消小额免税后，跨境全托管低价单品持续承压</div>' +
 '<div class="cc-spoke silo"><b>中小商家承压</b>管理层坦承跨境中小商家面临“相当大的经营与税费压力”</div>' +
 '<div class="cc-spoke silo"><b>欧洲合规摩擦</b>欧盟 DSA 2亿欧元罚款上诉及德国反垄断局定价合规审查</div>' +
 '<div class="cc-spoke silo"><b>重资产仓配转型</b>推出“共享海外仓”与半托管模式，重构端到端全球履约网</div>' +
 '</div>' +
 '<div class="cc-topo-outcome warn">代价与取舍：主动承受短期交易服务收入下滑，换取 Temu 向本地化合规与海外仓网络的长期转型。</div>';
 }
 }

 var QUADS = [
 {
 badge: 'Q1 · REVENUE MIX & GROSS MARGIN',
 titleZh: '收入结构切换：高毛利广告反超低毛利跨境履约',
 titleEn: 'Mix Shift: High-Margin Ads Outpace Cross-Border Fulfillment',
 descZh: '2026 Q1 交易服务曾以 53% 占比首次反超广告；但 Q3 在线营销服务提速至 +12.1%（RMB 59.82B），交易服务回落至 -11.7%（RMB 48.52B）。由于交易服务包含较高的跨境物流履约成本，其占比下降反而使集团营业成本同比减少 3.4%，毛利率提升至 58.2%。',
 descEn: 'Transaction services briefly exceeded 50% of revenue in Q1 2026, but Q3 saw marketing rebound +12.1% (RMB 59.82B) while transaction fell -11.7% (RMB 48.52B). Lower fulfillment-heavy mix cut cost of revenues 3.4% YoY and lifted gross margin to 58.2%.',
 alloc: [41.8, 23.3, 6.1, 28.8]
 },
 {
 badge: 'Q2 · OPERATING LEVERAGE & S&M CUT',
 titleZh: '费用端强力刹车：S&M 费率创近年低位，护航 30.1% OPM',
 titleEn: 'Expense Discipline: S&M Ratio Drops 4.7pp to Lift OPM to 30.1%',
 descZh: 'Q3 总运营费用同比下降 12.3% 至 RMB 31.93B，核心驱动力是销售及营销费用同比大砍 RMB 50.27 亿（-16.6%）。营销费用占营收比从去年同期的 28.0% 收敛至 23.3%，释放出巨大的营业利润弹性（GAAP OPM 从 23.1% 跃升至 28.8%）。',
 descEn: 'Total operating expenses fell 12.3% YoY to RMB 31.93B, led by a RMB 5.03B (-16.6%) reduction in sales and marketing. Compressing S&M from 28.0% to 23.3% of revenue unlocked +5.7pp of GAAP operating margin expansion (23.1% to 28.8%).',
 alloc: [41.8, 23.3, 6.1, 28.8]
 },
 {
 badge: 'Q3 · R&D INVESTMENT & SUPPLY CHAIN',
 titleZh: '唯一逆势增长的费用项：研发 +16.8% 砸向供应链与治理',
 titleEn: 'Counter-Cyclical R&D (+16.8%) & Supply-Chain Deepening',
 descZh: '在严控营销开支的同时，拼多多 Q3 研发费用同比大增 16.8% 至 RMB 5.06B（前 9 个月累计 ¥14.04B，+22.1% YoY）。管理层将“千亿扶持”从单纯减免佣金延伸至产业带研发、农货上行、1P 品牌自营与 180 余项平台合规治理。',
 descEn: 'While trimming marketing, PDD boosted Q3 R&D by 16.8% YoY to RMB 5.06B (9M26 RMB 14.04B, +22.1% YoY). The RMB 100B merchant program now spans product R&D, rural logistics, 1P brand incubation, and 180+ governance upgrades.',
 alloc: [41.8, 23.3, 6.1, 28.8]
 },
 {
 badge: 'Q4 · BALANCE SHEET & CASH GENERATION',
 titleZh: '负营运资本现金奶牛：手握 ¥4,554亿 现金与零金融负债',
 titleEn: 'Negative Working Capital Machine: ¥455.4B Cash & Zero Debt',
 descZh: '资产负债表极具防御性：截至 2026 年 9 月 30 日，现金、现金等价物及短期投资高达 RMB 455.4B（$67.9B），另有 RMB 115.7B 长期存款与债券及 RMB 82.2B 受限资金。应付商家款项 ¥112.0B 与保证金 ¥18.9B 形成天然无息浮存金，Q3 产生 ¥43.0B 经营现金流。',
 descEn: 'PDD’s balance sheet holds RMB 455.4B ($67.9B) in cash & short-term investments plus RMB 115.7B in non-current deposits/debt securities with zero financial debt. Merchant payables (RMB 112.0B) and deposits (RMB 18.9B) fuel RMB 43.0B in Q3 OCF.',
 alloc: [41.8, 23.3, 6.1, 28.8]
 }
 ];

 function renderQuad(idx) {
 state.activeQuad = idx;
 var q = QUADS[idx] || QUADS[0];
 var en = isEn();
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = en ? q.titleEn : q.titleZh;
 document.getElementById('dialDesc').textContent = en ? q.descEn : q.descZh;
 [['Cost', q.alloc[0]], ['Sm', q.alloc[1]], ['Rd', q.alloc[2]], ['Opm', q.alloc[3]]].forEach(function (pair) {
 document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
 document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
 });
 }

 var ERAS = [
 {
 badge: 'Q1 2026 · TRANSACTION SURGE & NON-OP DRAG',
 titleZh: '2026 Q1：交易服务首超半壁江山，营业外损益拖累表观净利',
 titleEn: 'Q1 2026: Transaction Mix Tops 50% While Non-Op Losses Weigh on Net Income',
 descZh: '2026 年开局，交易服务大涨 20% 至 RMB 56.29B，首次超越在线营销服务（RMB 49.94B，+2%）；GAAP 营业利润同比增长 22% 至 RMB 19.6B。但受当季汇兑及“其他净亏损”拖累，归母净利润同比下滑 15% 至 RMB 12.5B，引发市场对利润波动的担忧。',
 descEn: 'Transaction services grew 20% YoY to RMB 56.29B in Q1 2026, surpassing online marketing (RMB 49.94B, +2%) for the first time. GAAP operating profit rose 22% to RMB 19.6B, but FX and non-operating losses pushed net income down 15% to RMB 12.5B.',
 kpisZh: [['¥106.2B (+11%)', '总营收规模'], ['53.0% 占比', '交易服务首超广告'], ['¥19.6B (+22%)', 'GAAP 营业利润'], ['¥12.5B (-15%)', '归母净利润']],
 kpisEn: [['¥106.2B (+11%)', 'Total Revenue'], ['53.0% Mix', 'Transaction > Marketing'], ['¥19.6B (+22%)', 'GAAP Operating Profit'], ['¥12.5B (-15%)', 'GAAP Net Income']]
 },
 {
 badge: 'Q2 2026 · ECOSYSTEM INVESTMENT PEAK',
 titleZh: '2026 Q2：营收增速放缓至 8%，千亿扶持加大导致净利承压',
 titleEn: 'Q2 2026: Revenue Slows to +8% as Ecosystem Investments Peak',
 descZh: 'Q2 营收 RMB 112.4B（+8% YoY），其中交易服务增速放缓至 +13%（RMB 54.7B），广告微增 +3%（RMB 57.6B）。因 618 大促及“千亿扶持”加码，销售费用升至 RMB 29.7B，研发与运营费用同比增 13%，导致 GAAP 净利润同比下降 12% 至 RMB 27.2B。',
 descEn: 'Q2 revenue rose 8% YoY to RMB 112.4B (transaction +13% to RMB 54.7B; marketing +3% to RMB 57.6B). Stepped-up 618 and merchant ecosystem spend lifted S&M to RMB 29.7B, reducing GAAP net income by 12% YoY to RMB 27.2B.',
 kpisZh: [['¥112.4B (+8%)', '总营收规模'], ['¥57.6B (+3%)', '在线营销服务'], ['¥27.8B (+8%)', 'GAAP 营业利润'], ['¥27.2B (-12%)', '归母净利润']],
 kpisEn: [['¥112.4B (+8%)', 'Total Revenue'], ['¥57.6B (+3%)', 'Online Marketing'], ['¥27.8B (+8%)', 'GAAP Operating Profit'], ['¥27.2B (-12%)', 'GAAP Net Income']]
 },
 {
 badge: 'Q3 2026 · PROFIT HARVEST & GLOBAL PIVOT',
 titleZh: '2026 Q3：广告加速 +12.1% 与营销大减 16.6% 造就盈利超预期',
 titleEn: 'Q3 2026: +12.1% Ad Rebound & -16.6% S&M Cut Drive Profit Beat',
 descZh: 'Q3 总营收 RMB 108.34B（+0.1% YoY），看似停滞的背后是剧烈的结构切换：广告收入加速至 +12.1%（RMB 59.82B），交易服务因欧盟 7 月起征小额包裹关税而回落 -11.7%（RMB 48.52B）。同时营销费用骤降 16.6%，推动 GAAP 营业利润大涨 24.5% 至 RMB 31.16B，Non-GAAP 净利润 ¥31.02B 显著超预期。',
 descEn: 'Q3 revenue was flat at RMB 108.34B (+0.1% YoY), masking a sharp internal pivot: marketing accelerated to +12.1% (RMB 59.82B) while transaction services dropped -11.7% (RMB 48.52B) on July EU parcel duties. Cutting S&M by 16.6% drove GAAP operating profit +24.5% to RMB 31.16B.',
 kpisZh: [['¥108.34B (+0.1%)', '总营收 (低于预期6.7%)'], ['¥59.82B (+12.1%)', '在线营销重回双位数'], ['¥31.16B (+24.5%)', 'GAAP 营业利润 (28.8%)'], ['¥31.02B (Beat)', 'Non-GAAP 净利润']],
 kpisEn: [['¥108.34B (+0.1%)', 'Revenue (6.7% Miss)'], ['¥59.82B (+12.1%)', 'Marketing Re-Accelerates'], ['¥31.16B (+24.5%)', 'GAAP Op Profit (28.8%)'], ['¥31.02B (Beat)', 'Non-GAAP Net Income']]
 }
 ];

 function renderEra(idx) {
 state.activeEra = idx;
 var er = ERAS[idx] || ERAS[2];
 var en = isEn();
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = en ? er.titleEn : er.titleZh;
 document.getElementById('eraDesc').textContent = en ? er.descEn : er.descZh;
 var kpis = en ? er.kpisEn : er.kpisZh;
 document.getElementById('eraKpis').innerHTML = kpis.map(function (k) {
 return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
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
 var sl = document.getElementById('sideThemeLightBtn'), sd = document.getElementById('sideThemeDarkBtn');
 if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
 if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
 drawAll();
 if (!silent) showToast(isEn() ? (state.theme === 'dark' ? 'Switched to Dark Blueprint' : 'Switched to Light Mode') : (state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式'));
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.lang = en ? 'en' : 'zh-CN';
 document.title = en ? TITLE_EN : TITLE_ZH;
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', !en); zhB.setAttribute('aria-pressed', String(!en)); }
 if (enB) { enB.classList.toggle('active', en); enB.setAttribute('aria-pressed', String(en)); }

 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
 else nodes[i].textContent = val;
 }
 }

 var richNodes = document.querySelectorAll('[data-i18n-rich]');
 for (var r = 0; r < richNodes.length; r++) {
 var rk = richNodes[r].getAttribute('data-i18n-rich');
 if (RICH_I18N[rk]) richNodes[r].innerHTML = en ? RICH_I18N[rk].en : RICH_I18N[rk].zh;
 }

 var phNodes = document.querySelectorAll('[data-i18n-ph-zh]');
 for (var p = 0; p < phNodes.length; p++) {
 phNodes[p].setAttribute('placeholder', phNodes[p].getAttribute(en ? 'data-i18n-ph-en' : 'data-i18n-ph-zh'));
 }
 var ariaNodes = document.querySelectorAll('[data-i18n-aria-zh]');
 for (var a = 0; a < ariaNodes.length; a++) {
 ariaNodes[a].setAttribute('aria-label', ariaNodes[a].getAttribute(en ? 'data-i18n-aria-en' : 'data-i18n-aria-zh'));
 }
 var titleNodes = document.querySelectorAll('[data-i18n-title-zh]');
 for (var t = 0; t < titleNodes.length; t++) {
 titleNodes[t].setAttribute('title', titleNodes[t].getAttribute(en ? 'data-i18n-title-en' : 'data-i18n-title-zh'));
 }

 renderTopo(state.topoMode);
 renderQuad(state.activeQuad);
 renderEra(state.activeEra);
 updateEntropySim();
 refreshAuditChip();
 renderEraLegend();
 drawAll();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 // C0 Topology Switcher
 var topoSwitch = document.getElementById('topoSwitch');
 if (topoSwitch) {
 topoSwitch.addEventListener('click', function (e) {
 var b = e.target.closest('[data-topo]');
 if (!b) return;
 var bs = topoSwitch.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderTopo(b.getAttribute('data-topo'));
 });
 }

 // C1 Quadrant Selector
 var quadGrid = document.getElementById('quadGrid');
 if (quadGrid) {
 quadGrid.addEventListener('click', function (e) {
 var card = e.target.closest('[data-quad]');
 if (!card) return;
 var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
 var cs = quadGrid.querySelectorAll('.cc-quad-card');
 for (var i = 0; i < cs.length; i++) cs[i].classList.toggle('active', cs[i] === card);
 renderQuad(idx);
 });
 }

 // C2 Era Scrubber
 var eraTabs = document.getElementById('eraTabs');
 if (eraTabs) {
 eraTabs.addEventListener('click', function (e) {
 var t = e.target.closest('[data-era]');
 if (!t) return;
 var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
 var ts = eraTabs.querySelectorAll('.cc-era-tab');
 for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('active', ts[i] === t);
 renderEra(idx);
 });
 }

 // High-DPI Retina Canvas Helpers
 function prepCanvas(id) {
 var c = document.getElementById(id);
 if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }

 function roundRect(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath();
 ctx.moveTo(x + rr, y);
 ctx.arcTo(x + w, y, x + w, y + h, rr);
 ctx.arcTo(x + w, y + h, x, y + h, rr);
 ctx.arcTo(x, y + h, x, y, rr);
 ctx.arcTo(x, y, x + w, y, rr);
 ctx.closePath();
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

 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save();
 ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 var tw = ctx.measureText(text).width + 10;
 var th = 17;
 ctx.fillStyle = pal.pillBg;
 roundRect(ctx, cx - tw / 2, cy - th / 2, tw, th, 5);
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

 function renderEraLegend() {
 var leg = document.getElementById('eraLegend');
 if (!leg) return;
 var en = isEn();
 if (state.eView === 'mix') {
 leg.innerHTML =
 '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Blue: Online Marketing (¥B)' : '蓝色柱：在线营销服务 (¥B)') + '</span>' +
 '<span class="mui-chip mui-chip-warning mono">' + (en ? 'Amber: Transaction Services (¥B)' : '琥珀柱：交易服务收入 (¥B)') + '</span>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.eraSeries.opm ? '' : ' muted') + '" data-era-series="opm"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'GAAP Operating Profit (¥B)' : 'GAAP 营业利润 (¥B)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.eraSeries.ocf ? '' : ' muted') + '" data-era-series="ocf"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Operating Cash Flow (¥B)' : '经营性现金流 OCF (¥B)') + '</span></button>';
 }
 }

 var eraLegendEl = document.getElementById('eraLegend');
 if (eraLegendEl) {
 eraLegendEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-era-series]');
 if (!b) return;
 var k = b.getAttribute('data-era-series');
 state.eraSeries[k] = !state.eraSeries[k];
 if (!state.eraSeries.opm && !state.eraSeries.ocf) state.eraSeries[k] = true;
 renderEraLegend();
 drawEraCanvas();
 });
 }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 var qtrs = ['Q3 25', 'Q1 26', 'Q2 26', 'Q3 26'];
 if (state.eView === 'mix') {
 var mkt = [53.35, 49.94, 57.64, 59.82];
 var tx = [54.93, 56.29, 54.73, 48.52];
 var maxV = 68;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + Math.round(gv) + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / qtrs.length, bw = Math.min(26, slot * 0.28);
 qtrs.forEach(function (q, i) {
 var cx = pad.left + i * slot + slot / 2;
 if (state.hover.eraCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 var h1 = (mkt[i] / maxV) * ph, y1 = pad.top + ph - h1;
 var h2 = (tx[i] / maxV) * ph, y2 = pad.top + ph - h2;

 ctx.fillStyle = pal.blue;
 roundRect(ctx, cx - bw - 3, y1, bw, h1, 5); ctx.fill();
 ctx.fillStyle = pal.amber;
 roundRect(ctx, cx + 3, y2, bw, h2, 5); ctx.fill();

 drawValueBadge(ctx, mkt[i].toFixed(1), cx - bw / 2 - 3, y1 - 11, pal.blue, pal);
 drawValueBadge(ctx, tx[i].toFixed(1), cx + bw / 2 + 3, y2 - 11, pal.amber, pal);

 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(q, cx, pad.top + ph + 20);
 hits.eraCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 28,
 title: q + (en ? ' Revenue Split' : ' 营收结构拆分'),
 body: en
 ? ('Marketing: ¥' + mkt[i].toFixed(2) + 'B · Transaction: ¥' + tx[i].toFixed(2) + 'B · Total: ¥' + (mkt[i] + tx[i]).toFixed(2) + 'B')
 : ('在线营销 ¥' + mkt[i].toFixed(2) + 'B · 交易服务 ¥' + tx[i].toFixed(2) + 'B · 合计 ¥' + (mkt[i] + tx[i]).toFixed(2) + 'B')
 });
 });
 } else {
 var opmArr = [25.03, 19.60, 27.80, 31.16];
 var ocfArr = [45.66, 16.40, 25.70, 43.02];
 var maxF = 52;
 for (var k = 0; k <= 4; k++) {
 var kv = (maxF / 4) * k, ky = pad.top + ph - (kv / maxF) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + Math.round(kv) + 'B', pad.left - 8, ky + 4);
 }
 var stepX = pw / (qtrs.length - 1);
 qtrs.forEach(function (lb, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.eraCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.3;
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(lb, px, pad.top + ph + 20);
 hits.eraCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: lb + (en ? ' Profit & Cash Flow' : ' 利润与现金流'),
 body: en
 ? ('GAAP Op Profit: ¥' + opmArr[idx].toFixed(2) + 'B · OCF: ¥' + ocfArr[idx].toFixed(2) + 'B')
 : ('GAAP 营业利润 ¥' + opmArr[idx].toFixed(2) + 'B · 经营现金流 ¥' + ocfArr[idx].toFixed(2) + 'B')
 });
 });

 function plot(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) {
 return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxF) * ph, v: v };
 });
 ctx.save();
 drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph);
 ctx.lineTo(pts[0].x, pad.top + ph);
 ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)');
 ctx.fillStyle = ag; ctx.fill();
 ctx.restore();

 ctx.strokeStyle = col; ctx.lineWidth = 2.8;
 drawSmoothLine(ctx, pts); ctx.stroke();

 pts.forEach(function (pt, idx) {
 var isHov = state.hover.eraCanvas === idx;
 if (isHov) {
 ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill();
 }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.8 : 3.8, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, '¥' + pt.v.toFixed(1) + 'B', pt.x, pt.y - 14, col, pal);
 });
 }
 if (state.eraSeries.ocf) plot(ocfArr, pal.green, 'rgba(22, 163, 74, 0.22)');
 if (state.eraSeries.opm) plot(opmArr, pal.blue, 'rgba(0, 115, 230, 0.20)');
 }
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.genomeCanvas = [];
 var pad = { top: 24, right: 64, bottom: 24, left: en ? 148 : 132 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 var peers = [
 { name: en ? 'PDD Holdings (Q3 26)' : '拼多多 PDD (Q3 26)', opm: 28.8, rev: 108.34, col: pal.blue },
 { name: en ? 'Alibaba (Sep Qtr 26)' : '阿里巴巴 BABA (9月季)', opm: 10.7, rev: 271.52, col: pal.violet },
 { name: en ? 'JD.com (Q3 26)' : '京东集团 JD (Q3 26)', opm: 1.7, rev: 309.60, col: pal.amber }
 ];
 var isOpm = (state.gView === 'opm');
 var maxX = isOpm ? 34 : 340;
 var rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isOpm ? p.opm : p.rev;
 var cy = pad.top + idx * rowH + rowH / 2;
 var bh = 28, bl = (val / maxX) * pw;
 if (state.hover.genomeCanvas === idx) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, 4, cy - rowH / 2 + 2, w - 8, rowH - 4, 8); ctx.fill();
 }
 ctx.fillStyle = pal.grid;
 roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 6); ctx.fill();
 ctx.fillStyle = p.col;
 roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 6); ctx.fill();
 ctx.fillStyle = idx === 0 ? pal.blue : pal.sub;
 ctx.font = (idx === 0 ? 'bold ' : '600 ') + '12px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(isOpm ? (val.toFixed(1) + '%') : ('¥' + val.toFixed(1) + 'B'), pad.left + bl + 8, cy + 4);
 hits.genomeCanvas.push({
 idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH,
 title: p.name,
 body: en
 ? ('Q3 Revenue: ¥' + p.rev.toFixed(2) + 'B · GAAP Operating Margin: ' + p.opm.toFixed(1) + '%')
 : ('Q3 单季营收 ¥' + p.rev.toFixed(2) + 'B · GAAP 营业利润率 ' + p.opm.toFixed(1) + '%')
 });
 });
 }

 var entropySeries = [33.8, 31.8, 28.8, 25.8, 22.8];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.entropyCanvas = [];
 var pad = { top: 24, right: 24, bottom: 26, left: 38 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en
 ? ['18% S&M', '20% S&M', '23% (Q3)', '26% S&M', '30% S&M']
 : ['18% 费率', '20% 费率', '23% (Q3实际)', '26% 费率', '30% 费率'];
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();

 var pts = entropySeries.map(function (v, i) {
 return { x: pad.left + (i / 4) * pw, y: pad.top + ph - (Math.max(5, Math.min(42, v)) / 44) * ph, v: v };
 });

 ctx.save();
 drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph);
 ctx.lineTo(pts[0].x, pad.top + ph);
 ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, 'rgba(124, 58, 237, 0.25)');
 ag.addColorStop(1, 'rgba(124, 58, 237, 0.01)');
 ctx.fillStyle = ag; ctx.fill();
 ctx.restore();

 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.6;
 drawSmoothLine(ctx, pts); ctx.stroke();

 var slot = pw / 4;
 pts.forEach(function (pt, i) {
 var isHov = state.hover.entropyCanvas === i;
 if (isHov) {
 ctx.save(); ctx.strokeStyle = pal.violet; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(pt.x, pad.top); ctx.lineTo(pt.x, pad.top + ph); ctx.stroke(); ctx.restore();
 ctx.fillStyle = 'rgba(124, 58, 237, 0.22)'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill();
 }
 ctx.fillStyle = i === 2 ? pal.green : pal.violet;
 ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 5.2 : 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 13, i === 2 ? pal.green : pal.violet, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lbls[i], pt.x, pad.top + ph + 16);
 hits.entropyCanvas.push({
 idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24,
 title: lbls[i],
 body: en
 ? ('Projected GAAP Operating Margin: ' + pt.v.toFixed(1) + '%')
 : ('推演 GAAP 营业利润率：' + pt.v.toFixed(1) + '%')
 });
 });
 }

 function updateEntropySim() {
 var sm = parseInt(document.getElementById('rngSm').value, 10);
 var sup = parseInt(document.getElementById('rngSup').value, 10);
 var tar = parseInt(document.getElementById('rngTar').value, 10);
 var en = isEn();
 document.getElementById('valSm').textContent = en
 ? (sm + '%' + (sm <= 24 ? ' (Q3 Actual)' : sm <= 28 ? ' (Q3 25 Level)' : ' (Subsidy War)'))
 : (sm + '%' + (sm <= 24 ? ' (Q3 实际)' : sm <= 28 ? ' (去年同期)' : ' (补贴战)'));
 document.getElementById('valSup').textContent = sup + (en ? (sup <= 5 ? '% (Moderate)' : '% (Heavy)') : (sup <= 5 ? '% (温和)' : '% (高强度)'));
 document.getElementById('valTar').textContent = tar + (en ? (tar <= 4 ? '% (Contained)' : '% (Severe)') : (tar <= 4 ? '% (可控)' : '% (高压)'));

 // Baseline Q3 2026: S&M=23%, Sup=5%, Tar=4% -> GAAP OPM = 28.8%
 var opm = Math.max(8.0, Math.min(38.0, 28.8 - (sm - 23) * 1.0 - (sup - 5) * 0.7 - (tar - 4) * 0.65));
 var ni = Math.round(445 * (opm / 100) * 0.92);
 var cash12m = Math.round(455.4 + ni * 1.08);

 document.getElementById('outOpm').textContent = opm.toFixed(1) + '%';
 document.getElementById('outNi').textContent = '¥' + ni + 'B';
 document.getElementById('outCash').textContent = '¥' + cash12m + 'B';

 entropySeries = [18, 20, 23, 26, 30].map(function (sVal) {
 return Math.max(8.0, Math.min(38.0, 28.8 - (sVal - 23) * 1.0 - (sup - 5) * 0.7 - (tar - 4) * 0.65));
 });
 drawEntropyCanvas();
 }
 ['rngSm', 'rngSup', 'rngTar'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) el.addEventListener('input', updateEntropySim);
 });

 function bindSegChart(gid, attr, skey, fn) {
 var g = document.getElementById(gid);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 if (gid === 'eChartTabs') renderEraLegend();
 fn();
 });
 }
 bindSegChart('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
 bindSegChart('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);

 function bindTooltip(cid, redrawFn) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!c || !tip) return;
 function handlePtr(clientX, clientY) {
 var r = c.getBoundingClientRect();
 var mx = clientX - r.left, my = clientY - r.top;
 var arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) {
 var rg = arr[i];
 if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
 }
 var nextIdx = hit ? hit.idx : -1;
 if (state.hover[cid] !== nextIdx) {
 state.hover[cid] = nextIdx;
 redrawFn();
 }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 305, Math.max(12, clientX + 14)) + 'px';
 tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, clientY - 28)) + 'px';
 } else {
 tip.style.display = 'none';
 }
 }
 c.addEventListener('mousemove', function (ev) { handlePtr(ev.clientX, ev.clientY); });
 c.addEventListener('touchstart', function (ev) { if (ev.touches[0]) handlePtr(ev.touches[0].clientX, ev.touches[0].clientY); }, { passive: true });
 c.addEventListener('touchmove', function (ev) { if (ev.touches[0]) handlePtr(ev.touches[0].clientX, ev.touches[0].clientY); }, { passive: true });
 c.addEventListener('mouseleave', function () {
 if (state.hover[cid] !== -1) { state.hover[cid] = -1; redrawFn(); }
 tip.style.display = 'none';
 });
 }
 bindTooltip('eraCanvas', drawEraCanvas);
 bindTooltip('genomeCanvas', drawGenomeCanvas);
 bindTooltip('entropyCanvas', drawEntropyCanvas);

 function drawAll() {
 drawEraCanvas();
 drawGenomeCanvas();
 drawEntropyCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS_ZH = [
 { id: 'sec-c0', t: 'C0 双引擎切换与营收真相', s: 'Q3 2026 营收 ¥108.34B · 在线营销 +12.1% vs 交易服务 -11.7%' },
 { id: 'sec-c1', t: 'C1 四大财务支柱与损益分配罗盘', s: '营销费用 -16.6% · 研发 +16.8% · ¥4,554亿 现金储备' },
 { id: 'sec-c2', t: 'C2 2026 Q1–Q3 演进轨迹工作台', s: '三季度盈利剪刀差 · 双引擎收入拆分 & 营业利润/OCF 走势' },
 { id: 'sec-c3', t: 'C3 中国电商三巨头 Q3 横向对决', s: '拼多多 (28.8% OPM) vs 阿里巴巴 (10.7%) vs 京东 (1.7%)' },
 { id: 'sec-c4', t: 'C4 利润率压力测试与投资六律核查', s: 'S&M 费率/关税敏感性推演 · 未来 4 季度核心跟踪指标' }
 ];
 var QITEMS_EN = [
 { id: 'sec-c0', t: 'C0 Dual-Engine Revenue Shift', s: 'Q3 2026 ¥108.34B · Online Marketing +12.1% vs. Transaction -11.7%' },
 { id: 'sec-c1', t: 'C1 4 Financial Pillars & P&L Dial', s: 'S&M -16.6% · R&D +16.8% · ¥455.4B Cash & ST Investments' },
 { id: 'sec-c2', t: 'C2 2026 Q1–Q3 Financial Trajectory', s: 'Quarterly Revenue Split, Operating Profit & OCF Curve' },
 { id: 'sec-c3', t: 'C3 China E-Commerce Q3 Peer Arena', s: 'PDD (28.8% OPM) vs. Alibaba (10.7%) vs. JD.com (1.7%)' },
 { id: 'sec-c4', t: 'C4 Margin Stress & 6-Law Audit', s: 'S&M & Tariff Sensitivity Simulator · 6-Point Thesis Checklist' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 if (!qPop) return;
 var q = (kw || '').trim().toLowerCase();
 var src = isEn() ? QITEMS_EN : QITEMS_ZH;
 var m = src.filter(function (x, idx) {
 var z = QITEMS_ZH[idx], e = QITEMS_EN[idx];
 return !q || (z.t + ' ' + z.s + ' ' + e.t + ' ' + e.s).toLowerCase().indexOf(q) !== -1;
 });
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
 });

 // Sidebar Toggle & Mobile Drawer
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 // Sidebar Appearance & Export Controls
 var sideLight = document.getElementById('sideThemeLightBtn'), sideDark = document.getElementById('sideThemeDarkBtn');
 if (sideLight) sideLight.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 if (sideDark) sideDark.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 var expBtn = document.getElementById('exportHtmlBtn');
 if (expBtn) {
 expBtn.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n', document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a');
 a.href = url;
 a.download = 'PDD_Q3_2026_Earnings_Analysis.html';
 a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
 showToast(isEn() ? 'Exported HTML report' : '已导出 HTML 财报分析文件');
 });
 }
 var prtBtn = document.getElementById('printPdfBtn');
 if (prtBtn) prtBtn.addEventListener('click', function () { window.print(); });

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]');
 var done = 0;
 for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
 var chip = document.getElementById('auditScoreChip');
 if (chip) {
 chip.textContent = isEn()
 ? ('Thesis Audit: ' + done + ' / ' + boxes.length)
 : ('跟踪核查进度：' + done + ' / ' + boxes.length + ' 项');
 }
 }
 try {
 var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (chk) {
 var k = chk.getAttribute('data-cchk');
 chk.checked = !!savedA[k];
 chk.addEventListener('change', function () {
 savedA[k] = chk.checked;
 try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {}
 refreshAuditChip();
 showToast(isEn() ? (chk.checked ? 'Added to audit' : 'Removed from audit') : (chk.checked ? '已勾选该跟踪指标' : '已取消勾选'));
 });
 });
 } catch (e) {}

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {
 applyLang('zh', true);
 }

 var tBtn = document.getElementById('appbarThemeBtn');
 if (tBtn) {
 tBtn.addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark';
 applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 }
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (!lb) return;
 var nl = lb.getAttribute('data-lang');
 applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 })();
 