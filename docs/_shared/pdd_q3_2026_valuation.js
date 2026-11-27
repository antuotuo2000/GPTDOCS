
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'pdd_obs_theme_v1';
 var STORAGE_LANG_KEY = 'pdd_obs_lang_v1';

 var TITLE_ZH = '拼多多 PDD Holdings 2026 Q3 财报深度解析观测站 | 财务研究中心';
 var TITLE_EN = 'PDD Holdings Q3 2026 Earnings Deep-Dive Observatory | Research Hub';

 var state = {
 theme: 'light',
 lang: 'zh',
 activeHz: 0,
 activeEng: 0,
 fView: 'trend',
 sView: 'mix',
 pe: 11,
 mixSeries: { ads: true, tx: true },
 ratioSeries: { sm: true, opm: true, rd: true },
 hover: { futureCanvas: -1, siliconCanvas: -1, optMiniCanvas: -1 }
 };
 var hits = { futureCanvas: [], siliconCanvas: [], optMiniCanvas: [] };

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
 violet: dark ? '#A78BFA' : '#7C3AED',
 green: dark ? '#22C55E' : '#16A34A',
 amber: dark ? '#FFB74D' : '#D97706',
 red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 f0_lead: {
 zh: '2026 年 11 月 19 日，拼多多发布截至 9 月 30 日的 2026 年第三季度未经审计财报 <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 官方公告 ↗</a>：单季总营收 <strong>RMB 1,083.41亿（$161.59亿）</strong>，同比微增 0.1%（低于 LSEG 一致预期 RMB 1,159.7亿）；但得益于销售与营销费用同比大降 <strong>16.6%（少花 RMB 50.27亿）</strong>，GAAP 营业利润逆势飙升 <strong>24.5% 至 RMB 311.64亿</strong>，Non-GAAP 净利润录得 <strong>RMB 310.20亿</strong>，大幅跑赢市场一致预期 RMB 280.3亿（Beat +10.7%）<a class="cite-link" href="https://www.insiderfinance.io/news/pdd-q3-2026-profit-beats-estimates-as-revenue-misses" target="_blank" rel="noopener noreferrer">预期对比 ↗</a>。账面现金、现金等价物及短期投资攀升至 <strong>RMB 4,554亿（$679亿）</strong>，若计入 ¥1,157亿 长期定期存款与债权投资，广义金融资产达 <strong>$852亿</strong>，相当于当前 $1,244亿 市值 <a class="cite-link" href="https://www.macrotrends.net/stocks/charts/PDD/pdd-holdings/market-cap" target="_blank" rel="noopener noreferrer">市值数据 ↗</a> 的 68.5%。',
 en: 'On November 19, 2026, PDD Holdings reported Q3 2026 unaudited results <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Official Release ↗</a>: total revenue came in at <strong>RMB 108.34B ($16.16B)</strong>, up 0.1% YoY (missing the RMB 115.97B LSEG consensus). Yet a <strong>16.6% YoY cut in sales &amp; marketing (-RMB 5.03B)</strong> drove GAAP operating profit up <strong>24.5% YoY to RMB 31.16B</strong>, while Non-GAAP net income hit <strong>RMB 31.02B</strong>, beating consensus (RMB 28.03B) by +10.7% <a class="cite-link" href="https://www.insiderfinance.io/news/pdd-q3-2026-profit-beats-estimates-as-revenue-misses" target="_blank" rel="noopener noreferrer">Consensus ↗</a>. Cash and short-term investments reached <strong>RMB 455.4B ($67.9B)</strong>—or <strong>$85.2B</strong> including $17.3B in non-current deposits/debt securities, covering 68.5% of its $124.43B market cap <a class="cite-link" href="https://www.macrotrends.net/stocks/charts/PDD/pdd-holdings/market-cap" target="_blank" rel="noopener noreferrer">Market Cap ↗</a>.'
 },
 f2_caption: {
 zh: '财务特征：2026 Q3 拼多多营收虽停留在 <strong>RMB 108.34B（+0.1% YoY）</strong>，但营业利润跃升至近七个季度新高的 <strong>RMB 31.16B（28.8% 利润率）</strong>；从营业利润到净利润之间，因利息与投资净收益同比减少 ¥31.8亿 且所得税增加 ¥25.8亿，使得归母净利润仅微增 0.7% 至 RMB 29.54B。',
 en: 'Earnings Profile: While Q3 2026 revenue flattened at <strong>RMB 108.34B (+0.1% YoY)</strong>, operating profit surged to a 7-quarter high of <strong>RMB 31.16B (28.8% margin)</strong>. Below the operating line, lower interest/investment income (-RMB 3.18B YoY) and higher taxes (+RMB 2.58B) moderated GAAP net income growth to +0.7% YoY (RMB 29.54B).'
 },
 f3_caption: {
 zh: '拐点信号：2026 Q3 在线营销收入（<strong>¥59.82B</strong>）再次反超交易服务收入（<strong>¥48.52B</strong>）逾 113 亿元；同时营业利润率从 Q1 的 18.4% 连续两个季度强势修复至 <strong>28.8%</strong>（Non-GAAP 30.1%），显示平台盈利韧性远超悲观预期。',
 en: 'Inflection Signal: In Q3 2026, online marketing revenue (<strong>¥59.82B</strong>) widened its lead over transaction services (<strong>¥48.52B</strong>) by ¥11.3B, while operating margin rebounded from 18.4% in Q1 to <strong>28.8%</strong> (30.1% Non-GAAP), proving stronger-than-feared earnings resilience.'
 }
 };

 var HORIZONS = [
 {
 badge: 'PHASE 1 · Q3 2026 ACTUALS (NOV 19, 2026)',
 badgeZh: 'PHASE 1 · Q3 2026 当季实绩 (2026.11.19)',
 titleZh: '营收降速承压 × 营销费率大降 × 盈利能力超预期',
 titleEn: 'Top-Line Moderation × S&amp;M Discipline × Profit Beat',
 itemsZh: [
 '<strong>营收剪刀差扩大：</strong>在线营销 ¥598.2亿（+12.1%）稳健；交易服务 ¥485.2亿（-11.7%）反映手续费减免与全球合规调整。',
 '<strong>费用端释放红利：</strong>S&amp;M 降至 ¥253.0亿（-16.6% YoY），单季营业利润率跃升 5.7 个百分点至 28.8%。',
 '<strong>现金奶牛本色不改：</strong>单季经营现金流 ¥430.2亿，账面现金及短投增至 ¥4,554亿（$679亿）。'
 ],
 itemsEn: [
 '<strong>Revenue Divergence:</strong> Ads grew +12.1% to ¥59.82B while transaction services fell -11.7% to ¥48.52B on fee waivers &amp; Temu shifts.',
 '<strong>OpEx Discipline:</strong> S&amp;M dropped -16.6% YoY to ¥25.30B, lifting GAAP operating margin +5.7pp to 28.8%.',
 '<strong>Cash Generation:</strong> Q3 operating cash flow reached ¥43.02B, lifting cash &amp; short-term investments to $67.9B.'
 ],
 probZh: '市场反馈：绩后大涨 +12.8%', probEn: 'Reaction: +12.8% Post-Earnings',
 impactZh: 'Non-GAAP Beat：+10.7%', impactEn: 'Non-GAAP Beat: +10.7%'
 },
 {
 badge: 'PHASE 2 · STRATEGIC INVESTMENT (Q4 2026–2027E)',
 badgeZh: 'PHASE 2 · 生态转型攻坚期 (Q4 2026–2027E)',
 titleZh: '“千亿扶持”深入产业带 × Temu 半托管与本地化适配',
 titleEn: 'RMB 100B Merchant Support × Temu Semi-Managed Pivot',
 itemsZh: [
 '<strong>高筑供给侧护城河：</strong>“新质供给”向制造业腹地延伸，并通过“申诉优赔”为商家售后兜底（日均补贴超千万元）。',
 '<strong>交易服务筑底企稳：</strong>消化欧美小额包裹关税与监管变化，加速 Temu 本地仓与半托管模式占比。',
 '<strong>管理层指引保持谨慎：</strong>CFO 刘珺与联席 CEO 陈磊、赵佳臻重申仍处于战略投入期，利润可能存在季度波动。'
 ],
 itemsEn: [
 '<strong>Supply-Chain Moat:</strong> Deepening "New Quality Supply" in manufacturing hubs plus ¥10M+/day merchant after-sales subsidies.',
 '<strong>Transaction Stabilization:</strong> Adapting Temu to trade/tariff rules via semi-managed &amp; local-to-local fulfillment.',
 '<strong>Prudent Guidance:</strong> Management reiterates strategic investment phase with potential quarterly margin fluctuations.'
 ],
 probZh: '核心跟踪：交易服务何时转正', probEn: 'Watch: Transaction Rev Inflection',
 impactZh: 'Q4 2026E 一致预期：¥1,214.6亿', impactEn: 'Q4 2026E Consensus: ¥121.46B'
 },
 {
 badge: 'PHASE 3 · VALUATION RE-RATING (2028E+)',
 badgeZh: 'PHASE 3 · 价值重估奇点期 (2028E+)',
 titleZh: '9.5x P/E 修复 × $852亿金融资产的资本配置破冰',
 titleEn: '9.5x P/E Re-Rating × $85.2B Capital Allocation Catalyst',
 itemsZh: [
 '<strong>极致的估值安全垫：</strong>当前 $1,244亿 市值扣除 $852亿 现金及金融资产后，主业隐含 EV 仅约 $392亿（不足 3x 营业利润）。',
 '<strong>资本配置是最大期权：</strong>一旦拼多多宣布历史首次股票回购或分红（哪怕仅动用 15% 现金），将触发外资长线基金重估。',
 '<strong>生态红利反哺变现：</strong>减免与扶持周期结束后，更健康的品牌与产业带商家生态将推动广告与佣金双轮共振。'
 ],
 itemsEn: [
 '<strong>Deep Value Floor:</strong> Subtracting $85.2B cash/investments from $124.4B market cap leaves ~$39.2B EV (&lt;3x EBIT).',
 '<strong>Payout Catalyst:</strong> Any maiden buyback or dividend program would unlock major institutional multiple expansion.',
 '<strong>Ecosystem Harvest:</strong> Stronger branded &amp; factory supply supports durable post-investment monetization.'
 ],
 probZh: 'S&amp;P 一致目标价：$115.17 (+31.7%)', probEn: 'S&amp;P Target: $115.17 (+31.7%)',
 impactZh: '隐含剔除现金 P/E：~2.0x–3.0x', impactEn: 'Ex-Cash P/E: ~2.0x–3.0x'
 }
 ];

 function renderHorizon(idx) {
 state.activeHz = idx;
 var hz = HORIZONS[idx] || HORIZONS[0];
 var en = isEn();
 document.getElementById('hzBadge').textContent = en ? hz.badge : hz.badgeZh;
 document.getElementById('hzTitle').textContent = en ? hz.titleEn : hz.titleZh;
 var items = en ? hz.itemsEn : hz.itemsZh;
 document.getElementById('hzList').innerHTML = items.map(function (t) {
 return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
 }).join('');
 document.getElementById('hzProb').textContent = en ? hz.probEn : hz.probZh;
 document.getElementById('hzImpact').textContent = en ? hz.impactEn : hz.impactZh;
 }

 var ENGINES = [
 {
 badge: 'DRIVER 01 · REVENUE MIX DIVERGENCE',
 titleZh: '营收结构剪刀差：在线营销稳健 +12.1%，交易服务为何下滑 11.7%？',
 titleEn: 'Revenue Scissors: Why Online Marketing Rose +12.1% While Transaction Services Fell -11.7%',
 descZh: '2026 Q3 总营收 ¥1,083.41亿 与去年同期（¥1,082.77亿）几乎持平，但内部结构发生显著切换：高毛利的在线营销及其他收入同比增长 12.1% 至 ¥598.19亿，占比回升至 55.2%，证明国内主站流量效率与商家广告投放 ROI 依然坚挺；而交易服务收入同比下滑 11.7% 至 ¥485.22亿（低于 Q2 的 ¥547.21亿），主要受“百亿减免”等平台技术服务费退返政策深入，以及 Temu 应对海外关税与监管变化调整业务模式（部分转向半托管、净额法确认或主动控速）的双重影响。',
 descEn: 'Q3 2026 total revenue was nearly flat YoY at RMB 108.34B (+0.1%), masking a sharp internal mix shift. High-margin online marketing &amp; others grew +12.1% YoY to RMB 59.82B (55.2% of total), confirming resilient domestic merchant ad ROI. Conversely, transaction services declined -11.7% YoY to RMB 48.52B (down from RMB 54.72B in Q2), reflecting deeper merchant fee rebates and Temu’s structural pivot amid evolving global tariffs.',
 formulaZh: '总营收 ¥108.34B = 在线营销 ¥59.82B (+12.1% YoY) + 交易服务 ¥48.52B (-11.7% YoY)',
 formulaEn: 'Total Rev ¥108.34B = Online Marketing ¥59.82B (+12.1% YoY) + Transaction Services ¥48.52B (-11.7% YoY)',
 gaugesZh: [['¥59.82B', '在线营销 (+12.1% YoY)'], ['¥48.52B', '交易服务 (-11.7% YoY)'], ['55.2%', '广告收入占比回升'], ['58.2%', '综合毛利率 (+1.5pp YoY)']],
 gaugesEn: [['¥59.82B', 'Online Marketing (+12.1%)'], ['¥48.52B', 'Transaction Svcs (-11.7%)'], ['55.2%', 'Higher-Margin Ad Mix'], ['58.2%', 'Gross Margin (+1.5pp YoY)']]
 },
 {
 badge: 'DRIVER 02 · S&M CONTRACTION & MARGIN SURGE',
 titleZh: '营销费用少花 ¥50.3亿：营业利润率跃升至 28.8%，击碎“补贴无底洞”担忧',
 titleEn: 'RMB 5.03B S&M Cut Lifts Operating Margin to 28.8%, Disproving Runaway Spend Fears',
 descZh: '本季财报最令华尔街惊喜的并非营收，而是费用端的极强掌控力。Q3 销售与营销费用降至 ¥252.96亿，同比大幅下降 16.6%（少支出 ¥50.27亿），营销费用率从去年同期的 28.0% 压降至 23.3%。与此同时，研发费用同比增加 16.8% 至 ¥50.59亿，管理费用同比下降 10.0% 至 ¥15.79亿。三费合计同比下降 12.3% 至 ¥319.34亿，直接推动 GAAP 营业利润同比大增 24.5% 至 ¥311.64亿（Non-GAAP 营业利润 ¥326.43亿，利润率 30.1%）。',
 descEn: 'The biggest positive surprise was cost discipline. Q3 sales &amp; marketing expenses fell 16.6% YoY (-RMB 5.03B) to RMB 25.30B, compressing the S&amp;M ratio from 28.0% to 23.3%. Meanwhile, G&amp;A fell 10.0% to RMB 1.58B while R&amp;D rose 16.8% to RMB 5.06B. Total OpEx dropped 12.3% YoY, propelling GAAP operating profit up 24.5% to RMB 31.16B (28.8% margin; 30.1% Non-GAAP).',
 formulaZh: 'Q3 营业利润 ¥31.16B = 毛利 ¥63.10B (58.2%) − 营销 ¥25.30B − 研发 ¥5.06B − 管理 ¥1.58B',
 formulaEn: 'Q3 EBIT ¥31.16B = Gross Profit ¥63.10B (58.2%) − S&amp;M ¥25.30B − R&amp;D ¥5.06B − G&amp;A ¥1.58B',
 gaugesZh: [['-16.6%', '营销费用同比降幅'], ['23.3%', '营销费用率 (-4.7pp YoY)'], ['28.8%', 'GAAP 营业利润率'], ['30.1%', 'Non-GAAP 营业利润率']],
 gaugesEn: [['-16.6%', 'S&amp;M Expense YoY Cut'], ['23.3%', 'S&amp;M % of Rev (-4.7pp)'], ['28.8%', 'GAAP Operating Margin'], ['30.1%', 'Non-GAAP Op Margin']]
 },
 {
 badge: 'DRIVER 03 · RMB 100B SUPPORT & SUPPLY CHAIN',
 titleZh: '“千亿扶持”推进满一周年：“申诉优赔”日补超千万，重构产业带护城河',
 titleEn: 'One Year Into "RMB 100B Support": ¥10M+/Day Merchant Subsidies &amp; Supply Depth',
 descZh: '2026 Q3 正值拼多多“新十年高质量发展”及“千亿扶持”惠商战略推进满一周年。联席 CEO 赵佳臻在电话会上指出，平台一方面通过“申诉优赔”机制为商家售后兜底（单日补偿超千万元，预计年度投入数十亿元），缓解“仅退款”争议下的商家经营痛点；另一方面将补贴资源向“新质供给”与制造业腹地倾斜，用平台真金白银换取优质商家留存与源头产品力升级。',
 descEn: 'Q3 2026 marked the one-year milestone of PDD’s "RMB 100B Merchant Support" program. Co-CEO Jiazhen Zhao highlighted that PDD is backing merchants with over RMB 10M/day in after-sales appeal compensation while directing resources to "New Quality Supply" across manufacturing hubs—trading short-term monetization for long-term supply-chain loyalty.',
 formulaZh: '战略取舍：短期抽佣与营销投入 → 商家生态健康度提升 + 源头产业带优质供给锁死',
 formulaEn: 'Strategic Trade-off: Near-Term Fee Rebates → Healthier Merchant Economics &amp; Factory Supply Lock-In',
 gaugesZh: [['1 周年', '千亿扶持纵深推进'], ['¥1,000万+', '申诉优赔单日补偿额'], ['+16.8%', 'Q3 研发投入同比增速'], ['¥140.4B', '9M 2026 累计研发投入']],
 gaugesEn: [['1-Year', 'RMB 100B Support Milestone'], ['¥10M+/day', 'Appeal Compensation Pool'], ['+16.8%', 'Q3 R&amp;D Growth YoY'], ['¥14.04B', '9M 2026 Total R&amp;D Spend']]
 },
 {
 badge: 'DRIVER 04 · TEMU GLOBALIZATION & COMPLIANCE',
 titleZh: 'Temu 全球化换挡：应对关税与监管变局，从激进买量转向本地供应链深耕',
 titleEn: 'Temu’s Global Reset: Navigating Trade Tariffs via Local Supply &amp; Semi-Managed Mode',
 descZh: '联席 CEO 陈磊在 Q3 财报中明确表示：“随着全球业务适应不断演变的贸易和监管环境，我们将继续致力于深化供应链投资。”面对欧美跨境小额免税政策收紧与合规门槛抬升，Temu 在 2026 年放缓了纯粹的海外高价买量（这也是 Q3 营销费用显著下降的重要原因之一），转而推进半托管模式与本地仓履约体系建设，以牺牲部分短期交易服务收入增速为代价，换取更抗周期、合规的全球履约网络。',
 descEn: 'Co-CEO Lei Chen emphasized that as global operations adapt to evolving trade and regulatory landscapes, PDD is prioritizing supply-chain resilience. Facing stricter cross-border customs and tariff rules, Temu dialed back aggressive overseas ad bidding in 2026—contributing to Q3’s S&amp;M reduction—while scaling semi-managed and local-warehouse fulfillment.',
 formulaZh: 'Temu 演进路径：全托管激进扩张 → 关税/合规冲击 → 半托管本地仓 + 高毛利精选SKU',
 formulaEn: 'Temu Evolution: Aggressive Full-Managed → Tariff/Regulatory Pivot → Semi-Managed Local Fulfillment',
 gaugesZh: [['合规优先', '应对全球贸易规则演变'], ['半托管', '本地仓履约占比提升'], ['控速降费', '海外买量 ROI 纪律收紧'], ['长期韧性', '降低单一跨境清关风险']],
 gaugesEn: [['Compliance', 'Adapting to Trade Rules'], ['Semi-Managed', 'Local Warehouse Expansion'], ['Ad Discipline', 'Tighter Overseas CAC ROI'], ['Resilience', 'Lower Customs Risk']]
 },
 {
 badge: 'DRIVER 05 · BELOW-THE-LINE & TAX IMPACT',
 titleZh: '为何营业利润大增 24.5%，归母净利润却仅微增 0.7%？',
 titleEn: 'Why Did GAAP Net Income Grow Only +0.7% When Operating Profit Surged +24.5%?',
 descZh: '拆解 Q3 利润表营业利润以下项目即可找到答案：（1）利息及投资净收益由 2025 Q3 的 ¥85.65亿 降至 2026 Q3 的 ¥53.89亿（同比减少 ¥31.76亿），受利率环境与理财收益波动影响；（2）所得税费用由去年同期的 ¥39.87亿 跃升至 ¥65.70亿（同比多缴 ¥25.83亿），实际有效税率从 12.0% 升至 18.2%；（3）外币汇兑损失 ¥4.08亿（去年同期 ¥2.66亿）。上述三大非经营项合计拖累税后利润近 ¥59亿，掩盖了主营营业利润的强劲爆发。',
 descEn: 'The gap between +24.5% operating profit and +0.7% GAAP net income sits entirely below the operating line: (1) net interest &amp; investment income fell from RMB 8.57B to RMB 5.39B (-RMB 3.18B YoY); (2) income tax jumped from RMB 3.99B to RMB 6.57B (+RMB 2.58B), raising the effective tax rate from 12.0% to 18.2%; and (3) FX losses widened slightly to RMB 408M.',
 formulaZh: '营业利润 ¥31.16B + 利息投资 ¥5.39B − 汇兑/其他 ¥0.44B − 所得税 ¥6.57B = 净利 ¥29.54B',
 formulaEn: 'EBIT ¥31.16B + Interest/Inv ¥5.39B − FX/Other ¥0.44B − Tax ¥6.57B = Net Income ¥29.54B',
 gaugesZh: [['¥5.39B', '利息及投资净收益 (-37%)'], ['¥6.57B', '所得税费用 (+64.8%)'], ['18.2%', 'Q3 实际有效税率'], ['¥20.04', 'GAAP 稀释每 ADS 收益']],
 gaugesEn: [['¥5.39B', 'Interest &amp; Inv Inc (-37%)'], ['¥6.57B', 'Income Tax (+64.8% YoY)'], ['18.2%', 'Effective Tax Rate'], ['¥20.04', 'GAAP Diluted EPADS']]
 },
 {
 badge: 'DRIVER 06 · $85.2B FINANCIAL FORTRESS',
 titleZh: '¥4,554亿 现金与 ¥1,157亿 长期存单：为什么市场只给拼多多 9.5x P/E？',
 titleEn: '$85.2B Financial Fortress vs. $124.4B Market Cap: The Capital Allocation Discount',
 descZh: '截至 2026 年 9 月 30 日，拼多多资产负债表坐拥现金及现金等价物 ¥1,255.2亿 + 短期投资 ¥3,298.6亿 = ¥4,553.8亿（$679亿），此外还有 ¥822.0亿 受限资金及 ¥1,157.5亿 非流动长期定期存款与债权投资（$173亿），且无任何有息债务！广义金融资产达 $852亿，但目前公司仍保持“零分红、零回购”政策，导致市场对其账面现金赋予极高流动性折价，剔除净现金后主业隐含市盈率仅约 2–3 倍。',
 descEn: 'As of Sept 30, 2026, PDD held RMB 455.4B ($67.9B) in cash &amp; short-term investments, plus RMB 82.2B ($12.3B) restricted cash and RMB 115.7B ($17.3B) in long-term time deposits/debt securities—with zero financial debt. Yet zero dividends and zero buybacks keep the stock at ~9.5x headline P/E (just ~2x–3x ex-cash).',
 formulaZh: '市值 $124.43B − (现金短投 $67.9B + 长期金融资产 $17.3B) = 主业隐含估值仅 $39.23B',
 formulaEn: 'Mkt Cap $124.43B − ($67.9B Liquid + $17.3B Non-Current Deposits) = $39.23B Implied Core EV',
 gaugesZh: [['$67.9B', '现金及短期投资 (¥455.4B)'], ['$17.3B', '长期定期存单与债投'], ['0 负债', '无任何短期或长期有息借款'], ['~9.5x', '当前 TTM P/E 估值水平']],
 gaugesEn: [['$67.9B', 'Cash &amp; ST Inv (¥455.4B)'], ['$17.3B', 'Long-Term Deposits/Debt'], ['Zero Debt', 'Zero Financial Debt'], ['~9.5x', 'Current TTM P/E Multiple']]
 }
 ];

 function renderEngine(idx) {
 state.activeEng = idx;
 var eg = ENGINES[idx] || ENGINES[0];
 var en = isEn();
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').innerHTML = en ? eg.titleEn : eg.titleZh;
 document.getElementById('engDesc').textContent = en ? eg.descEn : eg.descZh;
 document.getElementById('engFormula').innerHTML = en ? eg.formulaEn : eg.formulaZh;
 var gs = en ? eg.gaugesEn : eg.gaugesZh;
 document.getElementById('engGauges').innerHTML = gs.map(function (g) {
 return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
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
 if (val.indexOf('<span') !== -1 || val.indexOf('&') !== -1) nodes[i].innerHTML = val;
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

 renderHorizon(state.activeHz);
 renderEngine(state.activeEng);
 renderFutureLegend();
 renderSiliconLegend();
 recalcOptionality();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 // Horizon & Engine click handlers
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var bs = hzTabs.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderHorizon(parseInt(b.getAttribute('data-hz'), 10) || 0);
 });
 }

 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 var bs = rail.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 renderEngine(parseInt(b.getAttribute('data-eng'), 10) || 0);
 });
 }

 // High-DPI Canvas Helpers
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
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function renderFutureLegend() {
 var leg = document.getElementById('futureLegend');
 if (!leg) return;
 var en = isEn();
 if (state.fView === 'trend') {
 leg.innerHTML =
 '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Total Revenue (¥B)' : '单季总营收 (¥B)') + '</span>' +
 '<span class="mui-chip mui-chip-success mono">' + (en ? 'GAAP Operating Profit (¥B)' : 'GAAP 营业利润 (¥B)') + '</span>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Q3 2026 P&amp;L Waterfall: Revenue (¥108.3B) → Net Income (¥29.5B)' : 'Q3 2026 利润表传导: 总营收 (¥108.3B) → 归母净利 (¥29.5B)') + '</span>';
 }
 }

 function renderSiliconLegend() {
 var leg = document.getElementById('siliconLegend');
 if (!leg) return;
 var en = isEn();
 if (state.sView === 'mix') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.mixSeries.ads ? '' : ' muted') + '" data-mix-series="ads"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Online Marketing &amp; Others (¥B)' : '在线营销及其他收入 (¥B)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.mixSeries.tx ? '' : ' muted') + '" data-mix-series="tx"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'Transaction Services (¥B)' : '交易服务收入 (¥B)') + '</span></button>';
 } else {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.ratioSeries.opm ? '' : ' muted') + '" data-ratio-series="opm"><span class="legend-dot" style="background:var(--mui-success-main);"></span><span>' + (en ? 'Operating Margin (%)' : 'GAAP 营业利润率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.ratioSeries.sm ? '' : ' muted') + '" data-ratio-series="sm"><span class="legend-dot" style="background:var(--mui-warning-main);"></span><span>' + (en ? 'S&amp;M Ratio (%)' : '销售与营销费用率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.ratioSeries.rd ? '' : ' muted') + '" data-ratio-series="rd"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'R&amp;D Ratio (%)' : '研发费用率 (%)') + '</span></button>';
 }
 }

 var silLegEl = document.getElementById('siliconLegend');
 if (silLegEl) {
 silLegEl.addEventListener('click', function (e) {
 var bMix = e.target.closest('[data-mix-series]');
 if (bMix) {
 var k = bMix.getAttribute('data-mix-series');
 state.mixSeries[k] = !state.mixSeries[k];
 if (!state.mixSeries.ads && !state.mixSeries.tx) state.mixSeries[k] = true;
 renderSiliconLegend();
 drawSiliconCanvas();
 return;
 }
 var bRat = e.target.closest('[data-ratio-series]');
 if (bRat) {
 var rk = bRat.getAttribute('data-ratio-series');
 state.ratioSeries[rk] = !state.ratioSeries[rk];
 if (!state.ratioSeries.sm && !state.ratioSeries.opm && !state.ratioSeries.rd) state.ratioSeries[rk] = true;
 renderSiliconLegend();
 drawSiliconCanvas();
 }
 });
 }

 // Quarterly Data (Q1'25 - Q3'26, RMB Billions)
 var Q_LABELS = ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26"];
 var Q_REV = [95.67, 103.99, 108.28, 123.91, 106.23, 112.36, 108.34];
 var Q_OP  = [16.09, 25.79, 25.03, 27.72, 19.57, 27.76, 31.16];
 var Q_NI  = [14.74, 30.75, 29.33, 24.54, 12.55, 27.18, 29.54];
 var Q_ADS = [48.72, 55.70, 53.35, 60.01, 49.94, 57.64, 59.82];
 var Q_TX  = [46.95, 48.28, 54.93, 63.90, 56.29, 54.72, 48.52];
 var Q_SM_R = [34.9, 26.2, 28.0, 27.7, 31.8, 26.4, 23.3];
 var Q_OPM  = [16.8, 24.8, 23.1, 22.4, 18.4, 24.7, 28.8];
 var Q_RD_R = [3.7, 3.5, 4.0, 4.0, 4.2, 4.1, 4.7];

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'trend') {
 var maxV = 140;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxV / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / Q_LABELS.length, bw = Math.min(26, slot * 0.34);
 Q_LABELS.forEach(function (lbl, i) {
 var cx = pad.left + i * slot + slot / 2;
 if (state.hover.futureCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 var h1 = (Q_REV[i] / maxV) * ph, y1 = pad.top + ph - h1;
 var h2 = (Q_OP[i] / maxV) * ph, y2 = pad.top + ph - h2;
 ctx.fillStyle = pal.blue;
 roundRect(ctx, cx - bw - 2, y1, bw, h1, 4); ctx.fill();
 ctx.fillStyle = pal.green;
 roundRect(ctx, cx + 2, y2, bw, h2, 4); ctx.fill();
 if (i === 6 || state.hover.futureCanvas === i) {
 drawValueBadge(ctx, '¥' + Q_REV[i].toFixed(1) + 'B', cx - bw / 2 - 2, y1 - 11, pal.blue, pal);
 drawValueBadge(ctx, '¥' + Q_OP[i].toFixed(1) + 'B', cx + bw / 2 + 2, y2 - 11, pal.green, pal);
 }
 ctx.fillStyle = i === 6 ? pal.text : pal.tick;
 ctx.font = (i === 6 ? 'bold ' : '600 ') + '10.5px "IBM Plex Mono", monospace';
 ctx.textAlign = 'center';
 ctx.fillText(lbl, cx, pad.top + ph + 20);
 hits.futureCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: lbl + (en ? ' PDD Financials' : ' 拼多多季度业绩'),
 body: (en ? 'Rev: ¥' : '总营收: ¥') + Q_REV[i].toFixed(2) + 'B · ' + (en ? 'OP: ¥' : '营业利润: ¥') + Q_OP[i].toFixed(2) + 'B · ' + (en ? 'GAAP NI: ¥' : '归母净利: ¥') + Q_NI[i].toFixed(2) + 'B'
 });
 });
 } else {
 var steps = [
 { lbl: en ? 'Revenue' : '总营收', v: 108.34, b: 0, col: pal.blue, tip: en ? 'Q3 2026 Total Revenue: ¥108.34B (+0.1% YoY)' : '2026 Q3 总营收: ¥108.34B (+0.1% YoY)' },
 { lbl: en ? '-COGS' : '-营业成本', v: 45.24, b: 63.10, col: pal.amber, tip: en ? 'Cost of Revenues: -¥45.24B (-3.4% YoY); Gross Margin 58.2%' : '营业成本: -¥45.24B (-3.4% YoY)，毛利率 58.2%' },
 { lbl: en ? '-S&M' : '-营销费用', v: 25.30, b: 37.80, col: pal.red, tip: en ? 'Sales & Marketing: -¥25.30B (-16.6% YoY, saved ¥5.03B)' : '销售与营销费用: -¥25.30B (-16.6% YoY，节省 ¥50.3亿)' },
 { lbl: en ? '-R&D/G&A' : '-研发/管理', v: 6.64, b: 31.16, col: pal.violet, tip: en ? 'R&D ¥5.06B (+16.8%) + G&A ¥1.58B (-10.0%)' : '研发费用 ¥5.06B (+16.8%) + 管理费用 ¥1.58B (-10.0%)' },
 { lbl: en ? 'Op Profit' : '营业利润', v: 31.16, b: 0, col: pal.green, tip: en ? 'GAAP Operating Profit: ¥31.16B (+24.5% YoY, 28.8% Margin)' : 'GAAP 营业利润: ¥31.16B (+24.5% YoY，利润率 28.8%)' },
 { lbl: en ? '+Net/Tax' : '±利息与税', v: 1.62, b: 29.54, col: pal.amber, tip: en ? '+Interest/Inv ¥5.39B - FX/Other ¥0.44B - Tax ¥6.57B = -¥1.62B net' : '+利息投资 ¥5.39B − 汇兑/其他 ¥0.44B − 所得税 ¥6.57B = 净扣除 ¥1.62B' },
 { lbl: en ? 'Net Inc' : '归母净利', v: 29.54, b: 0, col: pal.blue, tip: en ? 'GAAP Net Income: ¥29.54B (+0.7% YoY) | Non-GAAP: ¥31.02B' : 'GAAP 归母净利: ¥29.54B (+0.7% YoY) | Non-GAAP: ¥31.02B' }
 ];
 var maxB = 122;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(40, sW * 0.58);
 steps.forEach(function (s, i) {
 var cx = pad.left + i * sW + sW / 2, x = cx - bW / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
 var yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 if (state.hover.futureCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * sW + 3, pad.top, sW - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 if (state.hover.futureCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 var prefix = (i === 1 || i === 2 || i === 3 || i === 5) ? '-' : '';
 drawValueBadge(ctx, prefix + '¥' + s.v.toFixed(1) + 'B', cx, yt - 12, s.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(s.lbl, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * sW, y: pad.top, w: sW, h: ph + 26, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var stepX = pw / (Q_LABELS.length - 1);

 if (state.sView === 'mix') {
 var maxM = 75;
 for (var g = 0; g <= 3; g++) {
 var gv = g * 25, gy = pad.top + ph - (gv / maxM) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv + 'B', pad.left - 8, gy + 4);
 }
 Q_LABELS.forEach(function (y, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.siliconCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = idx === 6 ? pal.text : pal.tick;
 ctx.font = (idx === 6 ? 'bold ' : '') + '10.5px "IBM Plex Mono", monospace';
 ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: y + (en ? ' Revenue Split' : ' 营收结构拆解'),
 body: (en ? 'Online Marketing: ¥' : '在线营销: ¥') + Q_ADS[idx].toFixed(2) + 'B · ' + (en ? 'Transaction: ¥' : '交易服务: ¥') + Q_TX[idx].toFixed(2) + 'B'
 });
 });
 function plotMix(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxM) * ph, v: v }; });
 ctx.save(); drawSmoothLine(ctx, pts);
 ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 ag.addColorStop(0, fillTop); ag.addColorStop(1, 'rgba(0,0,0,0)');
 ctx.fillStyle = ag; ctx.fill(); ctx.restore();
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.siliconCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.6 : 3.6, 0, Math.PI * 2); ctx.fill();
 if (idx === 3 || idx === 6 || isHov) drawValueBadge(ctx, '¥' + pt.v.toFixed(1) + 'B', pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.mixSeries.ads) plotMix(Q_ADS, pal.blue, 'rgba(0, 115, 230, 0.18)');
 if (state.mixSeries.tx) plotMix(Q_TX, pal.violet, 'rgba(124, 58, 237, 0.16)');
 } else {
 var maxR = 40;
 for (var m = 0; m <= 4; m++) {
 var mv = m * 10, my = pad.top + ph - (mv / maxR) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv + '%', pad.left - 8, my + 4);
 }
 Q_LABELS.forEach(function (y, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.siliconCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = idx === 6 ? pal.text : pal.tick;
 ctx.font = (idx === 6 ? 'bold ' : '') + '10.5px "IBM Plex Mono", monospace';
 ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: y + (en ? ' Efficiency Ratios' : ' 盈利与费用率'),
 body: (en ? 'OPM: ' : '营业利润率: ') + Q_OPM[idx] + '% · ' + (en ? 'S&M: ' : '营销率: ') + Q_SM_R[idx] + '% · R&D: ' + Q_RD_R[idx] + '%'
 });
 });
 function plotRat(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / maxR) * ph, v: v }; });
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.siliconCanvas === idx;
 if (isHov) { ctx.fillStyle = fillTop; ctx.beginPath(); ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2); ctx.fill(); }
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.4 : 3.4, 0, Math.PI * 2); ctx.fill();
 if (idx === 4 || idx === 6 || isHov) drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 12, col, pal);
 });
 }
 if (state.ratioSeries.opm) plotRat(Q_OPM, pal.green, 'rgba(22, 163, 74, 0.16)');
 if (state.ratioSeries.sm) plotRat(Q_SM_R, pal.amber, 'rgba(217, 119, 6, 0.16)');
 if (state.ratioSeries.rd) plotRat(Q_RD_R, pal.violet, 'rgba(124, 58, 237, 0.16)');
 }
 }

 var OPT_DATA = {
 ads:    { net: 1.4, peAdd: 0 },
 sm:     { net: 1.6, peAdd: 0 },
 temu:   { net: 1.1, peAdd: 0 },
 payout: { net: 0.0, peAdd: 1.5 },
 yield:  { net: 1.5, peAdd: 0 }
 };
 var miniCaps = [124.43, 167.2, 212.3];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.optMiniCanvas = [];
 var pad = { top: 24, right: 18, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Current Cap', '2027E Base', '2027E + Catalysts'] : ['当前市值', '2027E基础盘', '2027E含催化'];
 var maxV = Math.max(260, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 if (state.hover.optMiniCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 4, pad.top, slot - 8, ph, 7); ctx.fill();
 }
 var col = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 ctx.fillStyle = col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.optMiniCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '$' + v.toFixed(1) + 'B', cx, yt - 12, col, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lbls[i], cx, pad.top + ph + 16);
 hits.optMiniCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24,
 title: lbls[i],
 body: (en ? 'Implied Market Cap: $' : '隐含市值: $') + v.toFixed(1) + 'B'
 });
 });
 }

 function recalcOptionality() {
 var baseNet = 15.2, adsCount = 1.474, cashFin = 85.2, curCap = 124.43;
 var addNet = 0, addPe = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addNet += d.net; addPe += d.peAdd; }
 }
 });
 var totNet = baseNet + addNet;
 var effPe = state.pe + addPe;
 var eps = totNet / adsCount;
 var mcapB = totNet * effPe;
 var baseMcapB = baseNet * state.pe;
 var upsidePct = ((mcapB - curCap) / curCap) * 100;
 var exCashPe = (curCap - cashFin) / totNet;

 document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapB.toFixed(1) + 'B (' + (upsidePct >= 0 ? '+' : '') + upsidePct.toFixed(0) + '%)';
 document.getElementById('optExCashOut').textContent = Math.max(0.5, exCashPe).toFixed(1) + 'x';

 miniCaps = [curCap, baseMcapB, mcapB];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 11;
 var bs = peTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 recalcOptionality();
 });
 }

 function bindSeg(gid, attr, skey, fn) {
 var g = document.getElementById(gid);
 if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = g.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 if (gid === 'fChartTabs') renderFutureLegend();
 if (gid === 'sChartTabs') renderSiliconLegend();
 fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid, redrawFn) {
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
 if (state.hover[cid] !== nextIdx) { state.hover[cid] = nextIdx; redrawFn(); }
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
 bindTip('futureCanvas', drawFutureCanvas);
 bindTip('siliconCanvas', drawSiliconCanvas);
 bindTip('optMiniCanvas', drawOptMiniCanvas);

 function drawAll() {
 drawFutureCanvas();
 drawSiliconCanvas();
 drawOptMiniCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS_ZH = [
 { id: 'sec-f0', t: 'F0 业绩总览与三阶经营周期雷达', s: 'Q3 2026 ¥108.34B 营收 · ¥31.16B 营业利润 · 绩后 +12.8%' },
 { id: 'sec-f1', t: 'F1 六大财报核心议题纵向深潜舱', s: '营收剪刀差 · 营销收缩 ¥50亿 · 千亿扶持 · Temu 合规 · $852亿现金' },
 { id: 'sec-f2', t: 'F2 季度营收趋势与 Q3 利润传导阶梯桥', s: 'Q1\'25–Q3\'26 营业利润跃升至 28.8% 与营业外税率拆解' },
 { id: 'sec-f3', t: 'F3 双轮营收剪刀差与三大费用率演变', s: '在线营销 +12.1% vs 交易服务 -11.7% · 研发投入创单季新高' },
 { id: 'sec-f4', t: 'F4 9.5x P/E 估值重估与催化模拟器', s: '自由开关五大催化剂测算 2027E EPS 与剔除净现金估值' }
 ];
 var QITEMS_EN = [
 { id: 'sec-f0', t: 'F0 Q3 Highlights & 3-Phase Radar', s: '¥108.34B Rev · ¥31.16B OP · +12.8% Post-Earnings Rally' },
 { id: 'sec-f1', t: 'F1 Six Core Financial Drivers Explorer', s: 'Revenue Mix · S&amp;M -16.6% · RMB 100B Support · Temu · $85.2B Cash' },
 { id: 'sec-f2', t: 'F2 Quarterly Trend & Q3 P&L Waterfall', s: 'Q1\'25–Q3\'26 OP Margin Expansion to 28.8% &amp; Tax Impact' },
 { id: 'sec-f3', t: 'F3 Revenue Scissors & OpEx Ratios', s: 'Ads +12.1% vs Tx -11.7% · Record R&amp;D Intensity' },
 { id: 'sec-f4', t: 'F4 9.5x P/E Valuation Re-Rating Lab', s: 'Toggle 5 Catalysts to Model 2027E EPS &amp; Ex-Cash Upside' }
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

 // Sidebar & Reading Tools
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var collapsed = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (collapsed) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 document.querySelectorAll('#muiSidebar .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () {
 document.querySelectorAll('#muiSidebar .mui-nav-link').forEach(function (x) { x.classList.remove('active'); });
 lnk.classList.add('active');
 if (window.innerWidth < 1024 && sb && bd) { sb.classList.remove('open'); bd.classList.remove('open'); }
 });
 });

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

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
 document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var nxt = btn.getAttribute('data-portal-theme');
 applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 });
 var exportBtn = document.getElementById('exportHtmlBtn');
 if (exportBtn) {
 exportBtn.addEventListener('click', function () {
 var htmlStr = '<!doctype html>\n' + document.documentElement.outerHTML;
 var url = URL.createObjectURL(new Blob([htmlStr], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a');
 a.href = url;
 a.download = 'PDD_Q3_2026_Earnings_Observatory.html';
 a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
 showToast(isEn() ? 'Exported HTML Report' : '已导出 HTML 报告');
 });
 }
 var printBtn = document.getElementById('printPdfBtn');
 if (printBtn) {
 printBtn.addEventListener('click', function () { window.print(); });
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
 recalcOptionality();
 drawAll();
 })();
 