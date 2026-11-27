
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var TITLE_ZH = '拼多多 PDD 2026–2032 未来战略与新增长曲线观测站 | 数据中心';
 var TITLE_EN = 'PDD Holdings 2026–2032 Strategic Horizon Observatory | Research Hub';
 var state = { theme: 'light', lang: 'zh', activeHz: 0, activeEng: 0, fView: 'capex', sView: 'mix', pe: 14, hover: { futureCanvas: -1, siliconCanvas: -1, optMiniCanvas: -1 } };
 var hits = { futureCanvas: [], siliconCanvas: [], optMiniCanvas: [] };

 function isEn() { return state.lang === 'en'; }
 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar'); if (!bar) return;
 bar.textContent = msg; bar.classList.add('show'); clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569',
 grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', hoverBand: dark ? 'rgba(51,153,255,0.09)' : 'rgba(0,115,230,0.06)',
 pillBg: dark ? 'rgba(9,13,22,0.90)' : 'rgba(255,255,255,0.95)', pillBorder: dark ? 'rgba(51,153,255,0.34)' : 'rgba(0,115,230,0.25)',
 blue: dark ? '#3399FF' : '#0073E6', violet: dark ? '#A78BFA' : '#7C3AED', green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706', red: dark ? '#FF6B6B' : '#DC2626'
 };
 }

 var RICH_I18N = {
 f0_lead: {
 zh: '站在年营收 RMB 4,318 亿与账面 RMB 4,554 亿现金+短投的高地上，拼多多在 2025 年 12 月正式确立<strong>陈磊（主攻全球供应链与算法技术）与赵佳臻（主攻国内生态与农业基建）双联席董事长兼联席 CEO</strong> 架构 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465925122766/tm2533961d1_6k.htm" target="_blank" rel="noopener noreferrer">SEC 6-K 任命公告 ↗</a>。面对国内存量内卷与欧美取消小额免税的外部剧变，拼多多管理层主动放弃短期利润最大化：国内以<strong>“千亿扶持”</strong>（含雄安数字化质检与日均百万级“申诉优赔”）重塑高质量品牌供给，并于 2026 年 3 月低调孵化自有品牌计划<strong>“新拼姆（Xinpinmu）”</strong>；海外 Temu 则果断砍掉低效买量，全面切换<strong>海外仓半托管与本对本</strong> <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">26Q3 财报战略定调 ↗</a>，蓄力“三年再造一个拼多多”。',
 en: 'From RMB 431.8B in revenue and RMB 455.4B in cash, PDD formalized its <strong>Co-Chairmen &amp; Co-CEOs structure in Dec 2025—Lei Chen (global supply chain &amp; tech) and Jiazhen Zhao (domestic ecosystem &amp; agritech)</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465925122766/tm2533961d1_6k.htm" target="_blank" rel="noopener noreferrer">SEC 6-K ↗</a>. Choosing long-term durability over short-term margins, PDD launched its <strong>RMB 100B Merchant Support</strong> initiative, debuted private-label arm <strong>Xinpinmu</strong> in March 2026, and pivoted Temu to <strong>local-warehouse semi-managed fulfillment</strong> <a class="cite-link" href="https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/" target="_blank" rel="noopener noreferrer">Q3 2026 Release ↗</a>.'
 },
 f2_caption: {
 zh: '战略反差：亚马逊、阿里、京东每年需投入数十亿至上千亿美元自建仓储、数据中心与冷链车队；拼多多坚持“零自营仓库、零自营车队”，FY2025 全年资本开支仅 <strong>RMB 11.5亿（约 $0.16B，营收占比 0.27%）</strong>，几乎把全部利润直接沉淀为现金。',
 en: 'Strategic Contrast: Amazon, Alibaba, and JD spend billions to $100B+ annually on warehouses and AI data centers; PDD owns zero 1P warehouses or fleets—keeping FY25 CapEx at just <strong>RMB 1.15B (~$0.16B, 0.27% of sales)</strong>.'
 },
 f3_caption: {
 zh: '研发趋势：FY2025 研发费用同比大增 <strong>+30% 至 RMB 165.0亿</strong>，2026 前三季度进一步增至 RMB 140.4亿（Q3 单季 RMB 50.6亿，+16.8% YoY），重点投向供应链匹配算法、雄安 AI 数据标注与智能客服治理。',
 en: 'R&amp;D Trend: FY2025 R&amp;D surged <strong>+30% to RMB 16.50B</strong> and reached RMB 14.04B in 9M 2026 (Q3 +16.8% YoY to RMB 5.06B), funding supply-chain AI matching and automated merchant governance.'
 }
 };

 var HORIZONS = [
 {
 badge: 'HORIZON 1 · TRANSITION & CONSOLIDATION (2026–2027)', badgeZh: 'HORIZON 1 · 战略换挡与筑底期 (2026–2027)',
 titleZh: '千亿扶持惠商 × Temu 半托管全面铺开 × 营销费率优化', titleEn: 'RMB 100B Merchant Support × Temu Semi-Managed Scale × S&M Discipline',
 itemsZh: ['<strong>国内生态减负：</strong>退还百亿级技术服务费并上线百万级“申诉优赔”，稳固高质量商家留存。', '<strong>Temu 关税免疫：</strong>海外仓半托管与本对本占比跃升，消化美欧小额免税取消冲击。', '<strong>新拼姆初试水：</strong>在日用百货与家居品类验证自有品牌复购与毛利模型。'],
 itemsEn: ['<strong>Domestic Ecosystem Relief:</strong> Fee rebates and appeal compensation solidify quality SME retention.', '<strong>Temu Tariff Shield:</strong> Rapid local-warehouse shift absorbs US de minimis &amp; EU parcel duties.', '<strong>Xinpinmu Launch:</strong> Validating private-label repeat rates across daily household staples.'],
 probZh: '兑现确定性：高 (85%)', probEn: 'Conviction: High (85%)', impactZh: '核心任务：稳营收、提净利质量', impactEn: 'Focus: Margin Quality &amp; Retention'
 },
 {
 badge: 'HORIZON 2 · ECOSYSTEM HARVEST (2028–2029)', badgeZh: 'HORIZON 2 · 生态收获与利润释放期 (2028–2029)',
 titleZh: '新质品牌全站推广放量 × Temu 海外盈利转正贡献增量', titleEn: 'Upgraded Brand Ad Spend × Temu International Profit Inflection',
 itemsZh: ['<strong>广告天花板抬升：</strong>产业带白牌完成品牌升级后，全站推广 ROI 竞价预算倍增。', '<strong>Temu 全球规模盈利：</strong>欧美本地仓网络与拉美/东南亚多极市场摊薄履约与获客成本。', '<strong>多多买菜现金牛化：</strong>生鲜冷链网格仓实现稳态盈利，持续向主站输送日活流量。'],
 itemsEn: ['<strong>Higher Ad Ceiling:</strong> Upgraded factory brands expand Full-Site Promotion ad budgets.', '<strong>Temu Global Profitability:</strong> Mature US/EU local hubs and LatAm/SEA scale drive net margin.', '<strong>Duoduo Grocery Cash Cow:</strong> Profitable fresh-produce grid feeds daily active main-app users.'],
 probZh: '兑现确定性：中高 (75%)', probEn: 'Conviction: High (75%)', impactZh: '年化增量营收池：+¥180B–¥240B', impactEn: 'Incremental Pool: +¥180B–¥240B/yr'
 },
 {
 badge: 'HORIZON 3 · RE-RATING SINGULARITY (2030–2032)', badgeZh: 'HORIZON 3 · 价值重估与奇点期 (2030–2032)',
 titleZh: '千亿美元现金配置破冰 × AI 柔性制造直连全面落地', titleEn: 'Capital Return Re-Rating × End-to-End AI Flexible C2M',
 itemsZh: ['<strong>资本配置戴维斯双击：</strong>一旦开启常态化回购或分红，8.6x P/E 折价向 14x–18x 修复。', '<strong>AI 柔性供应链：</strong>算法直接预测爆款并下达产业带小单快反生产指令。', '<strong>农业科技规模化：</strong>农地云拼覆盖全国核心产区并输出数字化农业标准。'],
 itemsEn: ['<strong>Valuation Re-Rating:</strong> Initiating buybacks or dividends unlocks a re-rating from ~8.6x to 14x–18x P/E.', '<strong>AI Flexible C2M:</strong> Predictive demand models automate small-batch factory production.', '<strong>Agritech at Scale:</strong> Standardized cold-chain &amp; direct-farm digitization nationwide.'],
 probZh: '兑现确定性：高赔率期权 (60%)', probEn: 'Conviction: High-Upside (60%)', impactZh: '隐含市值重估空间：2x–3x', impactEn: 'Re-Rating Upside: 2x–3x'
 }
 ];
 function renderHorizon(idx) {
 state.activeHz = idx; var hz = HORIZONS[idx] || HORIZONS[0], en = isEn();
 document.getElementById('hzBadge').textContent = en ? hz.badge : hz.badgeZh;
 document.getElementById('hzTitle').textContent = en ? hz.titleEn : hz.titleZh;
 document.getElementById('hzList').innerHTML = (en ? hz.itemsEn : hz.itemsZh).map(function (t) { return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>'; }).join('');
 document.getElementById('hzProb').textContent = en ? hz.probEn : hz.probZh;
 document.getElementById('hzImpact').textContent = en ? hz.impactEn : hz.impactZh;
 }

 var ENGINES = [
 {
 badge: 'ENGINE 01 · TEMU SEMI-MANAGED & LOCAL-TO-LOCAL',
 titleZh: 'Temu 全球本地化重构：用“海运海外仓 + 本土卖家”跨过关税高墙',
 titleEn: 'Temu Global Localization: Crossing Tariff Walls via Ocean Freight &amp; Local Sellers',
 descZh: '2025年8月美国取消 $800 小额免税、2026年7月欧盟征收 €3 小包税，宣告“跨境空运直邮”野蛮生长阶段终结。Temu 迅速转向鼓励中国大卖提前海运备货至欧美本土仓（半托管），并大举招募欧美日韩本土卖家（本对本），不仅规避了逐单清关与小包税，还将配送时效压缩至 2–5 天，成功解锁家具、家电等高客单重货。',
 descEn: 'Following the Aug 2025 US de minimis repeal and Jul 2026 EU €3 parcel duty, Temu pivoted from air-freight direct mail to ocean-freighted local warehouses (semi-managed) and domestic US/EU/JP sellers—cutting delivery to 2–5 days and unlocking bulky high-ASP categories.',
 formulaZh: '盈利改善公式：剥离空运补贴 + 缩减 17% 低效买量 + 高客单价 ($45+) → 推动单均履约盈利能力转正',
 formulaEn: 'Margin Formula: Sheds air-freight subsidies + cuts low-ROI ads 17% + higher AOV ($45+) → positive unit economics',
 gaugesZh: [['2–5 天', '欧美本地仓半托管配送时效'], ['-16.6%', '26Q3 集团销售费用同比降幅'], ['$45+', '高客单重货拓展后 AOV 中枢'], ['2026–2028', '海外商业模式稳态收获期']],
 gaugesEn: [['2–5 Days', 'US/EU Local Warehouse Delivery'], ['-16.6%', 'Q3\'26 S&amp;M Expense Reduction'], ['$45+', 'Expanded Bulky-Goods AOV'], ['2026–2028', 'International Profit Inflection']]
 },
 {
 badge: 'ENGINE 02 · RMB 100B MERCHANT ECOSYSTEM SUPPORT',
 titleZh: '千亿扶持与新质商家工程：以短期利润让渡换取十年优质供给护城河',
 titleEn: 'RMB 100B Support Program: Trading Near-Term Margin for 10-Year Supply Dominance',
 descZh: '面对国内电商存量竞争，联席 CEO 赵佳臻牵头设立“商保会”与千亿扶持计划，陆续落地“百亿减免”退费、偏远地区物流中转费平台兜底，以及雄安中心日均百万级“申诉优赔”。这一反共识举措虽然短期压低了交易服务表观费率，却深度绑定了具备自主研发与品牌化潜力的产业带“新质商家”。',
 descEn: 'Co-CEO Zhao Jiazhen’s RMB 100B Support Program rebates technical fees, absorbs remote-region shipping costs, and runs daily million-scale merchant appeal protection—sacrificing near-term take-rate to lock in R&amp;D-capable factory brands.',
 formulaZh: '飞轮传导：商家减负降本 → 优质新品供给暴增 → 买家复购提升 → 全站推广广告竞价收入稳健增长 (+12%)',
 formulaEn: 'Flywheel: Lower merchant fees → richer quality SKUs → higher buyer retention → +12% online marketing growth',
 gaugesZh: [['¥1,000亿', '三年期商家生态专项投入'], ['1,680万', 'FY25 平台活跃商家底座'], ['180+项', '2026年精细化治理新规'], ['+12% YoY', 'Q3\'26 在线营销广告稳健增速']],
 gaugesEn: [['RMB 100B', '3-Year Merchant Support Pool'], ['16.8M', 'FY25 Active Merchants'], ['180+', '2026 Governance Upgrades'], ['+12% YoY', 'Q3\'26 Online Marketing Growth']]
 },
 {
 badge: 'ENGINE 03 · XINPINMU PRIVATE-LABEL STRATEGY',
 titleZh: '“新拼姆 (Xinpinmu)”自有品牌：把拼多多变成数字时代的 Costco Kirkland',
 titleEn: 'Xinpinmu Private Label: Building Digital-Era Kirkland Signature',
 descZh: '2026年3月拼多多悄然启动“新拼姆”项目，依托平台积累的 9 亿用户消费大数据，由平台直接参与海内外自有品牌产品的定义、品控与供应链整合。不同于传统白牌内卷，“新拼姆”瞄准纸品、粮油、个护与基础家居等高频复购刚需，对标 Costco Kirkland 建立高信任、高复购的独家利润池。',
 descEn: 'Launched in March 2026, Xinpinmu leverages PDD’s 900M-buyer demand data to co-develop proprietary brands across high-frequency staples—mirroring Costco’s Kirkland Signature to capture exclusive trust and higher margins.',
 formulaZh: '价值重构：平台数据反向定义 SKU + 头部代工厂直供 → 砍掉品牌溢价同时留存独家高毛利',
 formulaEn: 'Value Shift: Platform demand data defines SKUs + top OEMs → eliminates brand markup with exclusive margins',
 gaugesZh: [['2026.03', '“新拼姆”自有品牌正式启动'], ['国内外协同', '同时覆盖主站与海外市场'], ['高频刚需', '聚焦日百/家居/食品高复购类目'], ['Kirkland 化', '打造独家品质心智护城河']],
 gaugesEn: [['Mar 2026', 'Xinpinmu Division Launched'], ['Dual Market', 'Serving Domestic &amp; Global Channels'], ['Daily Staples', 'High-Frequency Repeat Categories'], ['Kirkland Model', 'Proprietary Quality Moat']]
 },
 {
 badge: 'ENGINE 04 · DUODUO GROCERY & AGRITECH',
 titleZh: '多多买菜与农地云拼：中国最大农产品上行平台的数字化终局',
 titleEn: 'Duoduo Grocery &amp; Agritech: Digitizing China\'s Largest Farm-to-Table Network',
 descZh: '拼多多起家于水果农产品，如今“农地云拼”与“多多买菜”网格仓网络已将中国农业流通损耗大幅压低。赵佳臻 2025–2026 年主导的“多多好特产”专项行动深入全国地标产区，结合雄安产地溯源与冷链履约，将低毛利农品转化为锁定中国家庭每日必访的超级流量入口。',
 descEn: 'Built on agricultural roots, PDD’s Agritech Cloud-Pooling and Duoduo Grocery grid warehouses slash produce spoilage while turning daily grocery demand into the stickiest household traffic anchor in China.',
 formulaZh: '生态价值：高频买菜锁定家庭主妇/主夫每日打开 → 零成本交叉导流至高毛利百货与家电频道',
 formulaEn: 'Ecosystem Value: Daily grocery opens → zero-CAC cross-sell into high-margin general merchandise',
 gaugesZh: [['全国网格', '多多买菜次日达自提履约网'], ['产地溯源', '地标农产品摆脱有品类无品牌'], ['高频复购', '周均多单锁定家庭刚需消费'], ['区域盈利', '极致人效实现社区团购自我造血']],
 gaugesEn: [['Nationwide Grid', 'Next-Day Pickup Cold-Chain'], ['Origin Trace', 'Branding Regional Produce'], ['Weekly Habit', 'Multi-Order Household Lock-In'], ['Self-Funding', 'Profitable Unit Economics']]
 },
 {
 badge: 'ENGINE 05 · AI SUPPLY-CHAIN MATCHING & XIONG\'AN HUB',
 titleZh: 'AI 全链路匹配与研发提速：用算法替代臃肿中后台人力',
 titleEn: 'AI Supply-Chain Matching &amp; Xiong\'an Hub: Algorithms Over Bureaucracy',
 descZh: 'FY2025 拼多多研发费用暴增 +30% 至 RMB 165.0 亿，2026 前三季度再投 RMB 140.4 亿。与大厂追逐通用聊天机器人不同，拼多多将 AI 算力精准砸向“人货匹配精度”、“全站推广自动出价模型”以及雄安处理中心的两大算法标注库，实现以 2.5 万名员工支撑 1,680 万商家的极致人效。',
 descEn: 'PDD raised FY25 R&amp;D +30% to RMB 16.50B and invested RMB 14.04B in 9M’26—focusing AI on demand-supply matching, automated Full-Site Promotion bidding, and Xiong’an data-labeling hubs so 25,474 FTEs can govern 16.8M merchants.',
 formulaZh: '技术杠杆：R&amp;D 投入 (+30%) × 原子化组织 (2.5万人) → 人均创收 RMB 1,695 万、净利 RMB 384 万',
 formulaEn: 'Tech Leverage: R&amp;D (+30%) × Lean Org (25.5k FTEs) → RMB 16.95M revenue &amp; RMB 3.84M profit per employee',
 gaugesZh: [['¥16.50B', 'FY25 研发投入 (+30% YoY)'], ['¥5.06B', 'Q3\'26 单季研发 (+16.8% YoY)'], ['百万级/日', '雄安中心 AI+人工处理申诉'], ['¥16.95M', '25,474 名员工惊人人均创收']],
 gaugesEn: [['RMB 16.50B', 'FY25 R&amp;D Spend (+30% YoY)'], ['RMB 5.06B', 'Q3\'26 R&amp;D (+16.8% YoY)'], ['1M+/Day', 'AI-Assisted Merchant Support'], ['RMB 16.95M', 'Revenue / Employee Peak']]
 },
 {
 badge: 'ENGINE 06 · RMB 571.1B LIQUIDITY & CAPITAL RETURN',
 titleZh: '价值重估终极期权：当 RMB 5,711 亿现金堡垒开启回购与分红阀门',
 titleEn: 'The Ultimate Re-Rating Catalyst: Unlocking RMB 571.1B in Cash &amp; Investments',
 descZh: '截至 2026年9月30日，拼多多账面现金+短投达 RMB 4,554 亿，加上非流动定期存款与债券合计 RMB 5,711 亿（约 $852 亿美元），而总市值仅约 $1,119 亿（~8.6x P/E）。包括喜马拉雅资本（李录 2026Q2 大幅加仓 133.5% 至占组合 22.2%）在内的顶级长线资金正押注其在战略投入期结束后释放巨额股东回报。',
 descEn: 'With RMB 571.1B ($85.2B) in total cash &amp; deposits against a ~$111.9B market cap (~8.6x P/E), long-term value investors (including Li Lu’s Himalaya Capital, which boosted its stake 133.5% in Q2’26) are betting on eventual buybacks or dividends.',
 formulaZh: '估值重估：扣除净现金后核心电商隐含 P/E 仅 ~3x–4x → 任意回购/分红官宣都将引爆戴维斯双击',
 formulaEn: 'Re-Rating Math: Ex-cash core commerce trades at ~3x–4x P/E → any payout initiation triggers a sharp multiple expansion',
 gaugesZh: [['¥571.1B', '26Q3 现金+短投+长期定存 ($85.2B)'], ['~8.6x', '2026年11月市场给予的市盈率'], ['22.2%', '李录喜马拉雅资本重仓占比'], ['0 → 1', '未来首次回购或分红催化期权']],
 gaugesEn: [['RMB 571.1B', 'Total Liquidity &amp; Deposits ($85.2B)'], ['~8.6x', 'Late-2026 Trailing P/E Multiple'], ['22.2%', 'Himalaya Capital Portfolio Weight'], ['0 → 1', 'Inaugural Payout Catalyst']]
 }
 ];
 function renderEngine(idx) {
 state.activeEng = idx; var eg = ENGINES[idx] || ENGINES[0], en = isEn();
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').innerHTML = en ? eg.titleEn : eg.titleZh;
 document.getElementById('engDesc').textContent = en ? eg.descEn : eg.descZh;
 document.getElementById('engFormula').innerHTML = en ? eg.formulaEn : eg.formulaZh;
 document.getElementById('engGauges').innerHTML = (en ? eg.gaugesEn : eg.gaugesZh).map(function (g) {
 return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
 }).join('');
 }

 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl && sd) { sl.setAttribute('aria-pressed', String(state.theme === 'light')); sd.setAttribute('aria-pressed', String(state.theme === 'dark')); }
 drawAll();
 if (!silent) showToast(isEn() ? (state.theme === 'dark' ? 'Dark Mode' : 'Light Mode') : (state.theme === 'dark' ? '已切换深色模式' : '已切换浅色模式'));
 }

 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 var en = isEn(); document.documentElement.lang = en ? 'en' : 'zh-CN'; document.title = en ? TITLE_EN : TITLE_ZH;
 var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
 if (zhB) { zhB.classList.toggle('active', !en); zhB.setAttribute('aria-pressed', String(!en)); }
 if (enB) { enB.classList.toggle('active', en); enB.setAttribute('aria-pressed', String(en)); }
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
 var val = el.getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) { if (val.indexOf('<span') !== -1 || val.indexOf('&') !== -1) el.innerHTML = val; else el.textContent = val; }
 });
 document.querySelectorAll('[data-i18n-rich]').forEach(function (el) {
 var rk = el.getAttribute('data-i18n-rich'); if (RICH_I18N[rk]) el.innerHTML = en ? RICH_I18N[rk].en : RICH_I18N[rk].zh;
 });
 document.querySelectorAll('[data-i18n-ph-zh]').forEach(function (el) { el.setAttribute('placeholder', el.getAttribute(en ? 'data-i18n-ph-en' : 'data-i18n-ph-zh')); });
 renderHorizon(state.activeHz); renderEngine(state.activeEng); renderFutureLegend(); renderSiliconLegend(); drawAll();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 document.getElementById('hzTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]'); if (!b) return;
 document.querySelectorAll('#hzTabs .ft-hz-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderHorizon(parseInt(b.getAttribute('data-hz'), 10) || 0);
 });
 document.getElementById('engineRail').addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]'); if (!b) return;
 document.querySelectorAll('#engineRail .ft-rail-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 renderEngine(parseInt(b.getAttribute('data-eng'), 10) || 0);
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect(), w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
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
 function drawValueBadge(ctx, text, cx, cy, fgColor, pal, maxW, maxH) {
 ctx.save(); ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 var tw = ctx.measureText(text).width + 10, th = 17;
 var bx = cx; if (maxW) bx = Math.max(tw / 2 + 4, Math.min(maxW - tw / 2 - 4, cx));
 var by = cy; if (maxH) by = Math.max(th / 2 + 2, Math.min(maxH - th / 2 - 2, cy));
 ctx.fillStyle = pal.pillBg; roundRect(ctx, bx - tw / 2, by - th / 2, tw, th, 5); ctx.fill();
 ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
 ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, bx, by + 0.5); ctx.restore();
 }

 function renderFutureLegend() {
 var leg = document.getElementById('futureLegend'); if (!leg) return; var en = isEn();
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (state.fView === 'capex'
 ? (en ? 'PDD $0.16B (0.27% of Sales) vs. Heavy Logistics &amp; Cloud Peers' : '拼多多仅 $0.16B (占营收 0.27%) vs 重仓储与云巨头')
 : (en ? 'FY2025 (¥431.8B) → FY2032E (~¥780B) Multi-Horizon Revenue Bridge' : 'FY2025 (¥431.8B) → FY2032E (~¥780B) 多曲线营收增量阶梯')) + '</span>';
 }
 function renderSiliconLegend() {
 var leg = document.getElementById('siliconLegend'); if (!leg) return; var en = isEn();
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (state.sView === 'mix'
 ? (en ? 'Estimated Temu Semi-Managed / Local Fulfillment Mix (%)' : 'Temu 海外仓半托管及本对本履约占比演进推演 (%)')
 : (en ? 'PDD Annual R&amp;D Investment (RMB B · FY22–FY26E)' : '拼多多年度研发投入跃升 (RMB B · FY22–FY26E)')) + '</span>';
 }

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var peers = [
 { name: 'Amazon', cap: 102.0, col: pal.amber, tip: en ? 'Heavy fulfillment + AWS AI CapEx >$100B/yr' : '自建仓储物流与 AWS 数据中心年投入超千亿美元' },
 { name: 'Alibaba', cap: 12.5, col: pal.blue, tip: en ? 'Cloud AI infrastructure &amp; Cainiao logistics CapEx' : '阿里云 AI 基建与菜鸟物流网络资本投入' },
 { name: 'MercadoLibre', cap: 1.4, col: pal.violet, tip: en ? 'LatAm managed fulfillment &amp; logistics fleet' : '拉美自建物流枢纽与配送车队投入' },
 { name: 'JD.com', cap: 3.1, col: pal.red, tip: en ? 'Self-operated warehouses &amp; cold-chain infrastructure' : '自营亚洲一号仓储与冷链物流重资产投入' },
 { name: 'PDD (FY25)', cap: 0.16, col: pal.green, tip: en ? 'FY25 CapEx just RMB 1.15B (~$0.16B, 0.27% of sales)!' : 'FY2025 CapEx 仅 RMB 11.5亿（约 $0.16B，占营收 0.27%）！' }
 ];
 var maxC = 115, slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 peers.forEach(function (p, i) {
 var cx = pad.left + i * slot + slot / 2, bh = Math.max(5, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 if (state.hover.futureCanvas === i) { ctx.fillStyle = pal.hoverBand; roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill(); }
 ctx.fillStyle = p.col; roundRect(ctx, cx - bw / 2, yt, bw, bh, 6); ctx.fill();
 drawValueBadge(ctx, '$' + (p.cap < 1 ? p.cap.toFixed(2) : p.cap.toFixed(1)) + 'B', cx, yt - 12, p.col, pal);
 ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(p.name, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: p.name + ' CapEx', body: p.tip });
 });
 } else {
 var steps = [
 { lbl: en ? 'FY25 Base' : 'FY25基准', v: 431.8, b: 0, col: pal.blue, tip: 'FY2025 Actual Revenue: RMB 431.85B' },
 { lbl: en ? '+Ads/Brand' : '+品牌广告', v: 135.0, b: 431.8, col: pal.green, tip: en ? 'Upgraded merchant ad budgets: +RMB 135B' : '千亿扶持转化新质商家带来全站推广增量 +¥135B' },
 { lbl: en ? '+Temu Local' : '+Temu本地', v: 120.0, b: 566.8, col: pal.violet, tip: en ? 'Semi-managed US/EU &amp; LatAm/SEA: +RMB 120B' : '欧美半托管高客单与拉美/东南亚市场贡献 +¥120B' },
 { lbl: en ? '+Xinpinmu' : '+新拼姆', v: 55.0, b: 686.8, col: pal.amber, tip: en ? 'Xinpinmu private label &amp; grocery scale: +RMB 55B' : '新拼姆自有品牌与多多买菜供应链溢价 +¥55B' },
 { lbl: en ? '+AI C2M' : '+AI匹配', v: 38.2, b: 741.8, col: pal.green, tip: en ? 'AI demand matching conversion lift: +RMB 38.2B' : 'AI 精准匹配提升转化率贡献 +¥38.2B' },
 { lbl: en ? 'FY32E Target' : 'FY32E蓝图', v: 780.0, b: 0, col: pal.blue, tip: 'FY2032E Revenue Horizon: ~RMB 780B' }
 ];
 var maxB = 850, sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('¥' + kv + 'B', pad.left - 8, ky + 4);
 }
 steps.forEach(function (s, i) {
 var cx = pad.left + i * sW + sW / 2, yt = pad.top + ph - ((s.b + s.v) / maxB) * ph, yb = pad.top + ph - (s.b / maxB) * ph, bh = Math.max(5, yb - yt);
 if (state.hover.futureCanvas === i) { ctx.fillStyle = pal.hoverBand; roundRect(ctx, pad.left + i * sW + 3, pad.top, sW - 6, ph, 7); ctx.fill(); }
 ctx.fillStyle = s.col; roundRect(ctx, cx - bW / 2, yt, bW, bh, 5); ctx.fill();
 drawValueBadge(ctx, (s.b > 0 ? '+' : '') + '¥' + s.v.toFixed(0) + 'B', cx, yt - 12, s.col, pal);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(s.lbl, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * sW, y: pad.top, w: sW, h: ph + 26, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.sView === 'mix') {
 var yrs = ['2024', '2025', '2026E', '2027E', '2028E', '2030E'], mix = [18, 35, 58, 74, 82, 88];
 for (var g = 0; g <= 4; g++) {
 var gv = g * 25, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 var stepX = pw / 5, pts = mix.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / 100) * ph, v: v }; });
 ctx.save(); drawSmoothLine(ctx, pts); ctx.lineTo(pts[pts.length - 1].x, pad.top + ph); ctx.lineTo(pts[0].x, pad.top + ph); ctx.closePath();
 var ag = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph); ag.addColorStop(0, 'rgba(0,115,230,0.20)'); ag.addColorStop(1, 'rgba(0,115,230,0)'); ctx.fillStyle = ag; ctx.fill(); ctx.restore();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.siliconCanvas === idx;
 ctx.fillStyle = pal.blue; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 5 : 3.8, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, pt.v + '%', pt.x, pt.y - 13, pal.blue, pal, w, h);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(yrs[idx], pt.x, pad.top + ph + 20);
 hits.siliconCanvas.push({ idx: idx, x: pt.x - stepX / 2, y: pad.top, w: stepX, h: ph + 26, title: yrs[idx] + ' Local/Semi-Managed Share', body: (en ? 'Estimated share of Temu GMV fulfilled via local warehouses: ' : '预计 Temu 本地仓半托管及本对本 GMV 占比: ') + pt.v + '%' });
 });
 } else {
 var rYrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'], rd = [10.4, 11.0, 12.7, 16.5, 19.2], maxR = 24;
 for (var m = 0; m <= 4; m++) {
 var mv = (maxR / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('¥' + mv.toFixed(0) + 'B', pad.left - 8, my + 4);
 }
 var slot = pw / rYrs.length, bw = Math.min(42, slot * 0.54);
 rYrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, bh = (rd[i] / maxR) * ph, yt = pad.top + ph - bh;
 if (state.hover.siliconCanvas === i) { ctx.fillStyle = pal.hoverBand; roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill(); }
 ctx.fillStyle = i >= 3 ? pal.violet : pal.blue; roundRect(ctx, cx - bw / 2, yt, bw, bh, 6); ctx.fill();
 drawValueBadge(ctx, '¥' + rd[i].toFixed(1) + 'B', cx, yt - 12, i >= 3 ? pal.violet : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(y, cx, pad.top + ph + 20);
 hits.siliconCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: y + ' R&D', body: 'Annual R&D Spend: RMB ' + rd[i].toFixed(1) + 'B' });
 });
 }
 }

 var OPT_DATA = { ads: { rev: 125, net: 38 }, temu: { rev: 95, net: 22 }, xin: { rev: 45, net: 9 }, cap: { rev: 0, net: 0, boost: 1.14 }, ai: { rev: 60, net: 15 } };
 var miniCaps = [111.9, 195, 348];
 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.optMiniCanvas = [];
 var pad = { top: 24, right: 18, bottom: 26, left: 46 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Current Cap', '2030 Base', '2030 + Options'] : ['当前市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(450, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
 for (var og = 0; og <= 2; og++) {
 var ogv = (maxV / 2) * og, ogy = pad.top + ph - (og / 2) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ogy); ctx.lineTo(pad.left + pw, ogy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + Math.round(ogv) + 'B', pad.left - 6, ogy + 3);
 }
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var cx = pad.left + i * slot + slot / 2, bh = (v / maxV) * ph, yt = pad.top + ph - bh, col = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 ctx.fillStyle = col; roundRect(ctx, cx - bw / 2, yt, bw, bh, 6); ctx.fill();
 drawValueBadge(ctx, '$' + Math.round(v) + 'B', cx, yt - 12, col, pal, w, h);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(lbls[i], cx, pad.top + ph + 16);
 hits.optMiniCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24, title: lbls[i], body: (en ? 'Implied Cap at ' + state.pe + 'x P/E: $' : state.pe + 'x P/E 隐含市值: $') + Math.round(v) + 'B' });
 });
 }

 function recalcOptionality() {
 var baseRev = 432.0, baseNet = 98.0, adsCount = 1.474, addRev = 0, addNet = 0, buyBoost = 1.0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addNet += d.net; if (d.boost) buyBoost = d.boost; }
 }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var netUsdB = totNet / 6.7045;
 var epsUsd = (netUsdB / (adsCount / buyBoost));
 var mcapB = netUsdB * state.pe * (buyBoost > 1 ? 1.05 : 1.0);
 var baseMcapB = (baseNet / 6.7045) * state.pe;
 document.getElementById('optRevOut').textContent = '¥' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '¥' + Math.round(totNet) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + epsUsd.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + Math.round(mcapB) + 'B';
 miniCaps = [111.9, baseMcapB, mcapB];
 drawOptMiniCanvas();
 }
 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 document.getElementById('peTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]'); if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 14;
 document.querySelectorAll('#peTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 recalcOptionality();
 });

 function bindSeg(gid, attr, skey, fn) {
 var g = document.getElementById(gid); if (!g) return;
 g.addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[skey] = b.getAttribute(attr); g.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 if (gid === 'fChartTabs') renderFutureLegend(); if (gid === 'sChartTabs') renderSiliconLegend(); fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid, redrawFn) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip'); if (!c || !tip) return;
 function handlePtr(clientX, clientY) {
 var r = c.getBoundingClientRect(), mx = clientX - r.left, my = clientY - r.top, arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) { var rg = arr[i]; if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; } }
 var nextIdx = hit ? hit.idx : -1;
 if (state.hover[cid] !== nextIdx) { state.hover[cid] = nextIdx; redrawFn(); }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 315, Math.max(12, clientX + 14)) + 'px';
 tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, clientY - 28)) + 'px';
 } else tip.style.display = 'none';
 }
 c.addEventListener('mousemove', function (ev) { handlePtr(ev.clientX, ev.clientY); });
 c.addEventListener('mouseleave', function () { if (state.hover[cid] !== -1) { state.hover[cid] = -1; redrawFn(); } tip.style.display = 'none'; });
 }
 bindTip('futureCanvas', drawFutureCanvas); bindTip('siliconCanvas', drawSiliconCanvas); bindTip('optMiniCanvas', drawOptMiniCanvas);
 function drawAll() { drawFutureCanvas(); drawSiliconCanvas(); drawOptMiniCanvas(); }

 var QITEMS_ZH = [
 { id: 'sec-f0', t: 'F0 双核新政与三阶时间窗雷达', s: '陈磊+赵佳臻双联席董事长 · 2026–2032 三阶路径' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Temu半托管 · 千亿扶持 · 新拼姆 · 多多买菜 · AI · 现金重估' },
 { id: 'sec-f2', t: 'F2 反共识轻资产与 2032 营收桥', s: '拼多多 $0.16B CapEx 对比亚马逊千亿重投入' },
 { id: 'sec-f3', t: 'F3 全球本地化与半托管主权', s: 'Temu 本对本占比爬坡与研发投入 (+30%)' },
 { id: 'sec-f4', t: 'F4 2030 估值重估期权组装器', s: '自由开关五大催化与估值倍数测算目标市值' }
 ];
 var QITEMS_EN = [
 { id: 'sec-f0', t: 'F0 Dual-Helm & 3-Horizon Radar', s: 'Chen Lei & Zhao Jiazhen · 2026–2032 Roadmap' },
 { id: 'sec-f1', t: 'F1 Six Future Growth Engines', s: 'Temu Semi-Managed · RMB 100B · Xinpinmu · AI · Cash' },
 { id: 'sec-f2', t: 'F2 CapEx Discipline & 2032 Bridge', s: 'PDD $0.16B CapEx vs. Peers · Bridge to ~¥780B' },
 { id: 'sec-f3', t: 'F3 Global Localization Pivot', s: 'Temu Local-to-Local Mix &amp; R&amp;D Intensity' },
 { id: 'sec-f4', t: 'F4 2030 Re-Rating Optionality Lab', s: 'Toggle 5 Catalysts &amp; P/E Multiples' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 var q = (kw || '').trim().toLowerCase(), src = isEn() ? QITEMS_EN : QITEMS_ZH;
 var m = src.filter(function (x, idx) { var z = QITEMS_ZH[idx], e = QITEMS_EN[idx]; return !q || (z.t + ' ' + z.s + ' ' + e.t + ' ' + e.s).toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 qIn.addEventListener('focus', function () { renderQ(qIn.value); }); qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; document.querySelector(jb.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar'), dh = document.documentElement.scrollHeight - window.innerHeight;
 if (bar) bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }, { passive: true });

 document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'PDD_Future_Horizon_2030_Blueprint.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) { applyLang('zh', true); }
 recalcOptionality(); drawAll();
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 90); });
 window.addEventListener('load', drawAll);
 if (typeof ResizeObserver !== 'undefined') { var _ro = new ResizeObserver(function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 60); }); document.querySelectorAll('.ft-canvas-box').forEach(function (b) { _ro.observe(b); }); }
 })();
 