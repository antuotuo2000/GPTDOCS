
 (function () {
 try {
 var theme = (window.localStorage.getItem('mui_portal_theme_v4') || '').replace(/^"|"$/g, '');
 if (theme === 'dark' || theme === 'light') document.documentElement.setAttribute('data-theme', theme);
 if (window.localStorage.getItem('mui_portal_sidebar_collapsed_v1') === '1') {
 document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 }
 } catch (e) {}
 })();
 

 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

 var TITLE_ZH = '美团 2026 Q3 财报深度观测站 (03690.HK) | 2026.11.27';
 var TITLE_EN = 'Meituan Q3 2026 Earnings Observatory (03690.HK) | Nov 27, 2026';

 var state = {
 theme: 'light',
 lang: 'zh',
 activeHz: 0,
 activeEng: 0,
 fView: 'capex',
 sView: 'pen',
 pe: 20,
 silSeries: { mod: true, wf: true },
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
 zh: '2026 年 11 月 27 日，美团（03690.HK）交出一份极具分水岭意义的三季报：<strong>总营收达 1,155.56 亿元（同比 +21.6%，环比 +10.4%）</strong>，显著高于市场一致预期的 1,133.7 亿元；<strong>经营溢利 27.41 亿元、期内净利润 20.71 亿元</strong>，较去年同期亏损 186.3 亿元实现全面扭亏为盈 <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">亿欧财报拆解 ↗</a>。更核心的信号在于<strong>“外卖价格战正式迎来拐点”</strong>：暑期促销季过后行业补贴趋于理性，平均客单价（AOV）同比明显回升，低价订单占比持续收窄，带动销售及营销开支同比大降 <strong>20.0% 至 270.2 亿元</strong>，<strong>核心本地商业分部实现经营利润 57.0 亿元（经营利润率 7.3%）</strong>，远超花旗预期的 41.5 亿元，同比减亏近 200 亿元 <a class="cite-link" href="https://cn.investing.com/news/earnings/article-3689200" target="_blank" rel="noopener noreferrer">英为财情共识对比 ↗</a>。与此同时，集团层面的 <strong>AI 投入（研发开支同比 +11.3% 至 77.2 亿元）与未分配项目（16.5 亿元）</strong>令经调整净利润录得 18.5 亿元（略低于一致预期 22 亿元），但新业务亏损收窄至 <strong>13.1 亿元</strong>，<strong>Keeta 在沙特整个季度实现盈利并已在香港盈利，巴西拓展至 32 城</strong> <a class="cite-link" href="https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6" target="_blank" rel="noopener noreferrer">BigGo 业务细节 ↗</a>。',
 en: 'On November 27, 2026, Meituan (03690.HK) delivered a watershed Q3 report: <strong>revenue climbed 21.6% YoY (+10.4% QoQ) to RMB 115.56B</strong>, beating the RMB 113.37B consensus; <strong>operating profit reached RMB 2.74B and GAAP net profit hit RMB 2.07B</strong>, swinging sharply from a RMB 18.63B loss a year ago <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">Iyiou Breakdown ↗</a>. Most critically, <strong>China’s food delivery price war reached an inflection point</strong>: subsidies turned rational post-summer, AOV rebounded, S&amp;M expenses fell <strong>20.0% YoY to RMB 27.02B</strong>, and <strong>Core Local Commerce earned RMB 5.70B operating profit (7.3% margin)</strong>—beating Citi’s RMB 4.15B forecast with a nearly RMB 20B YoY swing <a class="cite-link" href="https://cn.investing.com/news/earnings/article-3689200" target="_blank" rel="noopener noreferrer">Investing.com Consensus ↗</a>. While <strong>RMB 7.72B R&amp;D (+11.3% YoY) and RMB 1.65B unallocated AI/SBC costs</strong> left adjusted net profit at RMB 1.85B, New Initiatives losses narrowed to <strong>RMB 1.31B</strong> as <strong>Keeta achieved full-quarter profitability in Saudi Arabia alongside Hong Kong and scaled to 32 Brazilian cities</strong> <a class="cite-link" href="https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6" target="_blank" rel="noopener noreferrer">BigGo Details ↗</a>.'
 },
 f2_caption: {
 zh: '财报拆解：Q3 2026 核心本地商业经营溢利高达 <strong>+57.0 亿元</strong>（大超花旗一致预期 41.5 亿），新业务亏损收窄至 <strong>-13.1 亿元</strong>（优于预期 -17 亿）；集团经调整净利（18.5 亿）略低于一致预期（22 亿）的主因在于<strong>未分配项目亏损 16.5 亿元</strong>（含股份支付及集团级 AI 战略投入）。',
 en: 'Bridge Insight: Core Local Commerce (<strong>+¥5.70B</strong> vs. ¥4.15B est.) and New Initiatives (<strong>-¥1.31B</strong> vs. -¥1.70B est.) both outperformed; headline Non-IFRS profit (¥1.85B) trailed ¥2.20B consensus mainly due to <strong>¥1.65B in unallocated corporate AI &amp; SBC items</strong>.'
 },
 f3_m5: {
 zh: '11月正式开源新一代自研大模型 LongCat-2.5，坚持“中国模型跑在中国芯片上”，原生支持多模态推理 <a class="cite-link" href="https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6" target="_blank" rel="noopener noreferrer">LongCat 进展 ↗</a>。',
 en: 'Open-sourced LongCat-2.5 in Nov 2026 ("Chinese models on Chinese chips") with native multimodal reasoning <a class="cite-link" href="https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6" target="_blank" rel="noopener noreferrer">LongCat Details ↗</a>.'
 },
 f3_c1x: {
 zh: '商家工作台“妙手”已服务超 200 万商户；消费端“小团”国庆调用量较五一激增超 60% <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">AI 商业化 ↗</a>。',
 en: 'CatPaw AI merchant workbench serves 2M+ merchants; Xiaotuan consumer AI calls surged &gt;60% in Oct vs. May <a class="cite-link" href="https://www.iyiou.com/news/202611271147463" target="_blank" rel="noopener noreferrer">AI Rollout ↗</a>.'
 },
 f3_n1: {
 zh: 'Keeta 香港利润率改善、沙特实现整季盈利；巴西周年达成 8.3 万商户、43 万骑手与 32 城覆盖 <a class="cite-link" href="https://www.hstong.com/news/detail/26112509530475644" target="_blank" rel="noopener noreferrer">Keeta 里程碑 ↗</a>。',
 en: 'Keeta HK margin improved &amp; Saudi turned profitable for full Q3; Brazil hit 32 cities, 83k merchants &amp; 430k riders <a class="cite-link" href="https://www.hstong.com/news/detail/26112509530475644" target="_blank" rel="noopener noreferrer">Keeta Update ↗</a>.'
 },
 f3_caption: {
 zh: '趋势解读：核心本地商业经营利润率从 Q3\'25 的 <strong>-21.0%</strong> 修复至 Q2\'26 的 7.9% 与 Q3\'26 的 <strong>7.3%</strong>（暑期旺季骑手补贴略压低环比），新业务亏损率则从去年同期的 -4.6% 持续收窄至 <strong>-3.5%</strong>。',
 en: 'Margin Trend: Core Local Commerce operating margin recovered from <strong>-21.0%</strong> in Q3\'25 to 7.9% in Q2\'26 and <strong>7.3%</strong> in Q3\'26, while New Initiatives loss margin narrowed from -4.6% to <strong>-3.5%</strong>.'
 }
 };

 var HORIZONS = [
 {
 badge: 'STAGE 1 · FOOD DELIVERY INFLECTION (Q3 2026)',
 badgeZh: 'STAGE 1 · 外卖补贴退潮与主业拐点 (Q3 2026)',
 titleZh: '客单价回升 × 营销费用骤降 20% × 核心利润 57 亿超预期',
 titleEn: 'AOV Rebound × S&amp;M -20% YoY × Core Profit ¥5.70B Beat',
 itemsZh: [
 '<strong>竞争拐点确立：</strong>公告明确指出暑期后行业补贴趋于理性，低价订单占比持续回落，客单价同比明显回升。',
 '<strong>成本端杠杆释放：</strong>销售成本占营收比由 74.0% 降至 67.4%（-6.6 pct pts），营销开支同比大减 20% 至 270.2 亿。',
 '<strong>高粘性会员护城河：</strong>美团高等级会员规模突破 4,000 万，联动超 2,000 个品牌搭建联合会员体系。'
 ],
 itemsEn: [
 '<strong>Rational Competition:</strong> Post-summer subsidies cooled, low-priced order mix shrank, and AOV rebounded YoY.',
 '<strong>Operating Leverage:</strong> Cost of sales dropped 6.6 pct pts YoY to 67.4% of revenue; S&amp;M cut 20% YoY to ¥27.02B.',
 '<strong>Membership Moat:</strong> High-tier membership surpassed 40 million with 2,000+ co-branded partner programs.'
 ],
 probZh: '确定性：极高 (已财报兑现)', probEn: 'Conviction: Very High (Reported)',
 impactZh: '核心利润同比改善：+¥19.77B', impactEn: 'Core YoY Swing: +¥19.77B'
 },
 {
 badge: 'STAGE 2 · GLOBAL KEETA & GROCERY BREAKEVEN (2026–2027)',
 badgeZh: 'STAGE 2 · 出海盈利验证与食杂减亏 (2026–2027)',
 titleZh: 'Keeta 沙特/香港双盈利 × 巴西 32 城 × 小象超市 85 城',
 titleEn: 'Keeta KSA/HK Profitable × Brazil 32 Cities × Xiaoxiang 85 Cities',
 itemsZh: [
 '<strong>海外单区模型跑通：</strong>Keeta 在沙特阿拉伯整个 Q3 实现盈利，香港利润率继续改善，验证高密度履约出海可复制。',
 '<strong>巴西节制拓城：</strong>10 月新增 21 城至 32 城覆盖，1 周年累计 8.3 万商户、43 万骑手与超 1,000 万次下载。',
 '<strong>食杂全渠道提效：</strong>小象超市覆盖 85 城（成熟城市已盈利）并开出 9 家线下门店，“快乐猴”社区店加速扩张。'
 ],
 itemsEn: [
 '<strong>Overseas Unit Economics Proven:</strong> Keeta achieved full-quarter profitability in Saudi Arabia and higher margins in HK.',
 '<strong>Measured Brazil Scale:</strong> Expanded to 32 cities (83k merchants, 430k riders, 10M+ downloads at 1-year mark).',
 '<strong>Omnichannel Grocery:</strong> Xiaoxiang reached 85 cities (mature cities profitable) + 9 physical stores; Happy Monkey expanding.'
 ],
 probZh: '确定性：中高 (亏损率已降至 3.5%)', probEn: 'Conviction: High (-3.5% Loss Margin)',
 impactZh: '新业务增速：+32.9% YoY', impactEn: 'New Init. Growth: +32.9% YoY'
 },
 {
 badge: 'STAGE 3 · AI CLOSED-LOOP & LOW-ALTITUDE LOGISTICS (2027–2030)',
 badgeZh: 'STAGE 3 · AI 闭环执行与低空无人机网络 (2027–2030)',
 titleZh: 'LongCat-2.5 开源 × 妙手 200 万商户 × 无人机 110 万单出海',
 titleEn: 'LongCat-2.5 × 2M+ CatPaw Merchants × 1.1M+ Drone Orders',
 itemsZh: [
 '<strong>研发坚定加码：</strong>Q3 研发开支 77.2 亿（+11.3%），王兴定调 AI 转型是“必答题”而非选答题。',
 '<strong>B+C 双端 AI 落地：</strong>妙手工作台服务超 200 万商家，推出“超级厨房”与手艺人 Agent；小团国庆调用量增超 60%。',
 '<strong>低空人机协同：</strong>全球无人机累计完成超 110 万单，上海西岸航线 9 月开航，M-Drone 4L 进军迪拜与阿斯塔纳。'
 ],
 itemsEn: [
 '<strong>Committed AI R&amp;D:</strong> Q3 R&amp;D rose 11.3% YoY to ¥7.72B; Wang Xing called AI a "must-answer question."',
 '<strong>B2B + B2C AI Execution:</strong> CatPaw serves 2M+ merchants; Xiaotuan AI assistant usage jumped &gt;60% in Oct vs. May.',
 '<strong>Low-Altitude Network:</strong> 1.1M+ cumulative drone orders globally; Shanghai West Bund live &amp; M-Drone 4L entering Dubai.'
 ],
 probZh: '确定性：中长期期权 (投入期)', probEn: 'Conviction: Long-Term Optionality',
 impactZh: '硬科技投资浮盈：&gt;¥65B', impactEn: 'Hard-Tech Portfolio: &gt;¥65B'
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
 badge: 'ENGINE 01 · FOOD DELIVERY & 1-ON-1 EXPRESS',
 titleZh: '餐饮外卖：价格战退潮确立行业拐点，精细化分层巩固 50%+ 份额壁垒',
 titleEn: 'Food Delivery: Subsidy War Inflection &amp; Tiered Fulfillment Monetization',
 descZh: '经历了 2025 年惨烈的补贴内卷后，美团在 Q3 2026 明确看到外卖行业拐点：平均客单价同比回升、低价订单占比收窄、暑期后竞争显著理性化。用户端通过“1对1急送”拓展高净值付费场景，会员体系突破 4,000 万高等级会员；供给端则以“拼好饭”“神抢手”覆盖高性价比刚需，并以“繁盛计划”引导合规商家获得流量倾斜，推动配送服务收入同比大增 25.3% 至 288.74 亿元。',
 descEn: 'Following 2025’s brutal subsidy war, Q3 2026 marked a clear industry turning point: AOV rebounded YoY, low-priced order share shrank, and subsidies cooled post-summer. Paid "1-on-1 Express" lifted monetization among affluent users (40M+ high-tier members), while Pinhaofan, Shenqiangshou, and the Prosperity Plan optimized merchant supply—driving Delivery Services revenue up 25.3% YoY to RMB 28.87B.',
 formulaZh: '盈利修复公式：客单价回升 + 每单配送成本下降 + 营销开支同比 -20% → 核心本地商业利润同比大增近 200 亿元',
 formulaEn: 'Margin Formula: Higher AOV + Lower Delivery Cost/Order + S&amp;M -20% YoY → ~¥20B YoY Core Profit Swing',
 gaugesZh: [['¥288.74亿', 'Q3 配送服务收入 (+25.3% YoY)'], ['&gt;4,000万', '美团高等级会员规模'], ['2,000+品牌', '跨界联合会员合作矩阵'], ['67.4%', '集团销售成本占比 (-6.6 pct)']],
 gaugesEn: [['¥28.87B', 'Delivery Services Rev (+25.3%)'], ['40M+', 'High-Tier Members'], ['2,000+ Brands', 'Co-Membership Partners'], ['67.4%', 'Group Cost of Sales (-6.6 pct)']]
 },
 {
 badge: 'ENGINE 02 · MEITUAN INSTASHOPPING & LIGHTNING WAREHOUSES',
 titleZh: '美团闪购：从“应急补充”迈向“供给驱动增长”，1P 自营商品暴增 75.8%',
 titleEn: 'Meituan Instashopping: Supply-Driven Growth &amp; +75.8% 1P Merchandise Surge',
 descZh: '即时零售正在跨越单纯的便利性替代，进入与品牌方深度共创定制供给的新阶段。Q3 美团核心商业自营商品销售收入（药品、酒类等）同比飙升 75.8% 至 42.61 亿元。依托“歪马送酒”专属履约基建与“品牌官旗闪电仓”模式，平台联合品牌开发小包装与节假日 IP 礼赠爆款，并携手数百家连锁药房将 24 小时买药服务下沉至低线及偏远地区，带动老客复购率与频次持续走高。',
 descEn: 'On-demand retail has entered a supply-driven phase. 1P merchandise sales (pharma, liquor, etc.) jumped 75.8% YoY to RMB 4.26B. Powered by Waima Songjiu dedicated liquor logistics and Brand Flagship Lightning Warehouses, Meituan co-creates travel-size and gifting SKUs with brands while extending 24-hour pharmacy access to lower-tier cities.',
 formulaZh: '飞轮逻辑：专属闪电仓/歪马基建 → 提升履约确定性 → 撬动高客单品牌直供与老客高频复购',
 formulaEn: 'Flywheel: Dedicated Lightning Warehouses → High Fulfillment Certainty → High-AOV Brand Supply &amp; Repeat Orders',
 gaugesZh: [['¥42.61亿', '1P 商品销售收入 (+75.8% YoY)'], ['歪马送酒', '酒水垂类专属即时履约网'], ['24h 药店', '联合数百家连锁下沉低线城市'], ['品牌官旗仓', '新品礼赠与 IP 联名爆款孵化']],
 gaugesEn: [['¥4.26B', '1P Merchandise Rev (+75.8% YoY)'], ['Waima Liquor', 'Dedicated Alcohol Fulfillment'], ['24h Pharma', 'Lower-Tier City Expansion'], ['Flagship Hubs', 'Co-Created Branded SKUs']]
 },
 {
 badge: 'ENGINE 03 · IN-STORE, HOTEL, TRAVEL & AI STORE TOOLS',
 titleZh: '到店酒旅与餐饮基建：“美团直订”与“超级厨房”重构商家数字化资产',
 titleEn: 'In-Store, Hotel &amp; Travel: Direct Booking &amp; "Super Kitchen" Merchant SaaS',
 descZh: '到店、酒店及旅游业务在暑期旺季保持高质量增长，带动核心本地商业“商家服务”收入达 434.07 亿元（+8.2% YoY）。面向餐饮商户，美团继“品牌卫星店”后推出新一代“超级厨房”与 AI 店长工具，并通过“美团直订”与智能排队点餐系统打通会员及团购券自动核销，帮助商户沉淀交易、评价与会员长期资产，同时为“明厨亮竈”合规商家提供更多曝光。',
 descEn: 'In-store dining, hotel, and travel posted healthy summer peak growth, lifting Merchant Services revenue 8.2% YoY to RMB 43.41B. Following Brand Satellite Stores, Meituan launched "Super Kitchen" and AI Store Manager tools alongside Meituan Direct Booking and smart ordering—converting offline foot traffic into recurring digital merchant assets.',
 formulaZh: '商业壁垒：交易撮合 + 履约直订 + 会员核销 + AI 经营工作台 → 提升商户留存与在线营销活跃度',
 formulaEn: 'Moat: Discovery + Direct Booking + Loyalty Redemption + AI Workbench → Higher Merchant Retention &amp; Ad Spend',
 gaugesZh: [['¥434.07亿', 'Q3 商家服务收入 (+8.2% YoY)'], ['超级厨房', '新一代高坪效连锁餐饮店型'], ['美团直订', '预订/排队/点餐/核销全链路'], ['繁盛计划', '食安合规商家获平台流量倾斜']],
 gaugesEn: [['¥43.41B', 'Merchant Services (+8.2% YoY)'], ['Super Kitchen', 'Next-Gen High-Efficiency Kitchens'], ['Direct Booking', 'Reservation-to-Redemption Loop'], ['Prosperity Plan', 'Traffic Tilt to Compliant Merchants']]
 },
 {
 badge: 'ENGINE 04 · XIAOXIANG SUPERMARKET & HAPPY MONKEY',
 titleZh: '食杂零售全渠道：小象超市扩至 85 城（成熟城盈利），落地 9 家线下实体店',
 titleEn: 'Omnichannel Grocery: Xiaoxiang Reaches 85 Cities &amp; Opens 9 Physical Stores',
 descZh: '新业务分部 Q3 营收同比增长 32.9% 至 372.73 亿元（商品销售收入大增 48.6%），经营亏损同比及环比均收窄至 13.1 亿元（亏损率降至 3.5%）。作为核心引擎，小象超市已进驻 85 个城市，自有品牌 GTV 占比环比显著提升，客单价上升推动更多成熟城市实现盈利转正；同时小象已在北京、杭州、深圳落地 9 家线下实体店，社区硬折扣店“快乐猴”亦在加快开店节奏。',
 descEn: 'New Initiatives revenue grew 32.9% YoY to RMB 37.27B (merchandise +48.6% YoY), with operating loss narrowing to RMB 1.31B (-3.5% margin). Xiaoxiang Supermarket now operates in 85 cities with rising private-label share and mature-city profitability, complemented by 9 offline stores in Beijing/Hangzhou/Shenzhen and Happy Monkey community stores.',
 formulaZh: '单位经济改善：城市密度提升 + 自有品牌毛利贡献 + 线下门店协同 → 食杂零售减亏超预期',
 formulaEn: 'Unit Economics: City Density + Private-Label Mix + Offline Synergy → Faster-Than-Expected Loss Narrowing',
 gaugesZh: [['¥372.73亿', '新业务 Q3 营收 (+32.9% YoY)'], ['85 座城市', '小象超市运营覆盖规模'], ['9 家实体店', '京杭深线下全渠道试水落地'], ['-3.5% 亏损率', '同比改善 1.1 pct（优于预期）']],
 gaugesEn: [['¥37.27B', 'New Initiatives Rev (+32.9% YoY)'], ['85 Cities', 'Xiaoxiang Supermarket Footprint'], ['9 Stores', 'Offline Stores in BJ/HZ/SZ'], ['-3.5% Margin', 'Improved 1.1 pct YoY (Beat)']]
 },
 {
 badge: 'ENGINE 05 · KEETA GLOBAL EXPANSION',
 titleZh: 'Keeta 出海捷报：沙特实现整季盈利、香港利润率续升，巴西稳步拓至 32 城',
 titleEn: 'Keeta Global: Full-Quarter Profit in Saudi Arabia, HK Expansion &amp; 32 Brazilian Cities',
 descZh: '国际化成为美团最受瞩目的估值期权。Q3 期间，Keeta 在香港市场利润率进一步改善，在沙特阿拉伯更是实现“整个季度全面盈利”，证明美团的算法调度与精细化运营在中东高客单市场具备极强复制力。在巴西市场，美团遵循王兴“不盲目全面铺开、打磨好模型再扩张”的纪律，10 月新增 21 城至 32 城覆盖，入巴一周年已聚拢 8.3 万注册餐厅、43 万骑手与超 1,000 万下载量。',
 descEn: 'Keeta delivered milestone overseas validation in Q3: Hong Kong margins expanded further, and Saudi Arabia turned profitable for the entire quarter. Following Wang Xing’s disciplined playbook, Keeta expanded in Brazil to 32 cities in October (adding 21 cities), reaching 83,000 restaurants, 430,000 riders, and 10M+ downloads at its one-year anniversary.',
 formulaZh: '扩张纪律：香港盈利 → 沙特全季盈利（高客单验证） → 巴西分批拓城（控制单季亏损天花板）',
 formulaEn: 'Playbook: HK Profitable → Saudi Full-Quarter Profit → Disciplined Brazil City Rollout (Capped Burn)',
 gaugesZh: [['沙特盈利', '整个 Q3 实现单季全面盈利'], ['32 座城市', '巴西覆城数（10月新增 21 城）'], ['8.3万 / 43万', '巴西注册餐厅与注册骑手规模'], ['1,000万+', 'Keeta 巴西累计 App 下载量']],
 gaugesEn: [['KSA Profit', 'Profitable for Entire Q3 2026'], ['32 Cities', 'Brazil Coverage (+21 in Oct)'], ['83k / 430k', 'Brazil Restaurants &amp; Riders'], ['10M+ Downloads', 'Keeta Brazil 1-Year Milestone']]
 },
 {
 badge: 'ENGINE 06 · LONGCAT-2.5 AI & LOW-ALTITUDE DRONES',
 titleZh: 'AI 与低空物流：LongCat-2.5 开源、“妙手”服务 200 万商家、无人机飞向迪拜',
 titleEn: 'AI &amp; Low-Altitude Logistics: LongCat-2.5, 2M+ CatPaw Merchants &amp; Dubai Drones',
 descZh: 'Q3 研发开支同比增长 11.3% 至 77.2 亿元，增量主要投向 AI。11 月美团正式开源新一代原生多模态大模型 LongCat-2.5；B 端 AI 工作台“妙手（CatPaw）”已服务超 200 万商户，自动执行经营分析、评价管理与门店巡检；C 端“小团”国庆用户与调用量较五一暴增超 60%。低空方面，美团无人机全球累计完单超 110 万笔，上海西岸航线 9 月开航，第四代索降无人机 M-Drone 4L 进军迪拜与哈萨克斯坦。',
 descEn: 'Q3 R&amp;D rose 11.3% YoY to RMB 7.72B, led by AI. In November, Meituan open-sourced LongCat-2.5; CatPaw AI workbench now serves 2M+ merchants for diagnostics and inspections, while Xiaotuan consumer AI calls surged &gt;60% in October vs. May. Drones crossed 1.1M+ global orders, launching Shanghai West Bund and M-Drone 4L routes in Dubai and Astana.',
 formulaZh: 'AI 商业逻辑：用垂类真实交易数据反哺 LongCat → 降低商家运营门槛 + 提升用户端到端下单转化率',
 formulaEn: 'AI Logic: Real Transaction Data → LongCat-2.5 → Higher Merchant Efficiency &amp; End-to-End Consumer Conversion',
 gaugesZh: [['¥77.2亿', 'Q3 研发开支 (+11.3% YoY)'], ['200万+商家', '妙手 AI 工作台服务商户数'], ['+60% 调用', '小团 AI 助手国庆较五一增速'], ['110万+单', '无人机全球累计履约订单']],
 gaugesEn: [['¥7.72B', 'Q3 R&amp;D Spend (+11.3% YoY)'], ['2M+ Merchants', 'CatPaw AI Workbench Adoption'], ['+60% Calls', 'Xiaotuan Oct vs. May Surge'], ['1.1M+ Orders', 'Global Drone Deliveries']]
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
 var lb = document.getElementById('sideThemeLightBtn'), db = document.getElementById('sideThemeDarkBtn');
 if (lb) lb.setAttribute('aria-pressed', String(state.theme === 'light'));
 if (db) db.setAttribute('aria-pressed', String(state.theme === 'dark'));
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
 drawAll();
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
 if (state.fView === 'capex') {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Bars: Quarterly Revenue (¥B) · Line/Badges: Operating / Adj. Net Profit (¥B)' : '柱状: 季度总营收 (¥B) · 折线与标签: 经调整净利/经营溢利 (¥B)') + '</span>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'Q3 2026 Profit Bridge: Core (+¥5.70B) + New (-¥1.31B) + Unallocated (-¥1.65B) = Op Profit ¥2.74B' : 'Q3 2026 利润桥: 核心商业 (+57.0亿) + 新业务 (-13.1亿) + 未分配 (-16.5亿) = 经营溢利 27.4亿') + '</span>';
 }
 }

 function renderSiliconLegend() {
 var leg = document.getElementById('siliconLegend');
 if (!leg) return;
 var en = isEn();
 if (state.sView === 'pen') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.silSeries.mod ? '' : ' muted') + '" data-sil-series="mod"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'Core Local Op Margin (%)' : '核心本地商业经营利润率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.silSeries.wf ? '' : ' muted') + '" data-sil-series="wf"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'New Initiatives Margin (%)' : '新业务经营利润率 (%)') + '</span></button>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'Q3 2026 Revenue Mix: Core Local ¥78.28B (67.7%) vs. New Initiatives ¥37.27B (32.3%)' : 'Q3 2026 收入结构: 核心本地商业 ¥782.8亿 (67.7%) vs 新业务 ¥372.7亿 (32.3%)') + '</span>';
 }
 }

 var silLegEl = document.getElementById('siliconLegend');
 if (silLegEl) {
 silLegEl.addEventListener('click', function (e) {
 var b = e.target.closest('[data-sil-series]');
 if (!b) return;
 var k = b.getAttribute('data-sil-series');
 state.silSeries[k] = !state.silSeries[k];
 if (!state.silSeries.mod && !state.silSeries.wf) state.silSeries[k] = true;
 renderSiliconLegend();
 drawSiliconCanvas();
 });
 }

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 54 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var qs = [
 { name: 'Q3 2025', rev: 95.06, prof: -16.01, col: pal.red, tip: en ? 'Height of subsidy war: Revenue ¥95.06B, Adj. Net Loss -¥16.01B, Core Op Loss -¥14.07B' : '补贴大战峰值：营收 950.6 亿，经调整净亏 -160.1 亿（核心商业亏 140.7 亿）' },
 { name: 'Q1 2026', rev: 91.00, prof: -6.83, col: pal.amber, tip: en ? 'Early narrowing: Revenue ¥91.0B (+5.6% YoY), Net Loss narrowed to -¥6.83B' : '亏损收窄期：营收 910.0 亿（+5.6% YoY），净亏损收窄至 -68.3 亿' },
 { name: 'Q2 2026', rev: 104.64, prof: 2.52, col: pal.blue, tip: en ? 'Return to profit: Revenue ¥104.64B (+14.4% YoY), Adj. Net Profit +¥2.52B' : '重返盈利：营收 1,046.4 亿（+14.4% YoY），经调整净利 +25.2 亿' },
 { name: 'Q3 2026', rev: 115.56, prof: 1.85, col: pal.green, tip: en ? 'Inflection confirmed: Revenue ¥115.56B (+21.6% YoY), Core Op +¥5.70B, Adj. Net +¥1.85B' : '拐点确立：营收 1,155.6 亿（+21.6% YoY），核心商业 +57.0 亿，调后净利 +18.5 亿' }
 ];
 var maxR = 135;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxR / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / qs.length, bw = Math.min(48, slot * 0.48);
 qs.forEach(function (q, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = Math.max(6, (q.rev / maxR) * ph), yt = pad.top + ph - bh;
 if (state.hover.futureCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = i === 3 ? pal.blue : (pal.dark ? 'rgba(51, 153, 255, 0.38)' : 'rgba(0, 115, 230, 0.28)');
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.futureCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + q.rev.toFixed(1) + 'B', cx, yt - 12, pal.blue, pal);

 var profTxt = (q.prof >= 0 ? '+' : '') + '¥' + q.prof.toFixed(2) + 'B';
 drawValueBadge(ctx, (en ? 'Net ' : '净利 ') + profTxt, cx, pad.top + ph - 18, q.col, pal);

 ctx.fillStyle = i === 3 ? pal.green : pal.sub; ctx.font = (i === 3 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(q.name, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: q.name + (en ? ' Financial Summary' : ' 业绩概览'), body: q.tip });
 });
 } else {
 var steps = [
 { lbl: en ? 'Core Local' : '核心本地商业', v: 5.70, b: 0, col: pal.green, tip: en ? 'Core Local Commerce Op Profit: +¥5.70B (7.3% margin, beat ¥4.15B est.)' : '核心本地商业经营溢利: +57.0 亿元（大超市场预期 41.5 亿）' },
 { lbl: en ? 'New Init.' : '新业务亏损', v: -1.31, b: 5.70, col: pal.amber, tip: en ? 'New Initiatives Op Loss: -¥1.31B (-3.5% margin, better than -¥1.70B est.)' : '新业务经营亏损: -13.1 亿元（亏损率收窄至 3.5%，优于预期）' },
 { lbl: en ? 'Unalloc/AI' : '未分配/AI投入', v: -1.65, b: 4.39, col: pal.red, tip: en ? 'Unallocated Corporate & AI/SBC items: -¥1.65B' : '未分配项目亏损（含集团级 AI 投入与股份支付）: -16.5 亿元' },
 { lbl: en ? 'Op Profit' : '集团经营溢利', v: 2.74, b: 0, col: pal.blue, tip: en ? 'Group Operating Profit: +¥2.74B (vs. -¥19.76B in Q3 2025)' : '集团经营溢利: +27.41 亿元（上年同期为亏损 197.6 亿元）' },
 { lbl: en ? 'Inv/Tax' : '投资/税费调整', v: -0.67, b: 2.74, col: pal.violet, tip: en ? 'Net finance, tax & fair value gains (+¥2.3B) netting to GAAP profit' : '包含财务投资公允价值变动收益 (+23亿)、所得税等净调整 -6.7 亿' },
 { lbl: en ? 'GAAP Net' : '期内净利润', v: 2.07, b: 0, col: pal.green, tip: en ? 'GAAP Profit for Period: +¥2.07B (Adj. Net Profit +¥1.85B)' : '期内净利润: +20.71 亿元（Non-IFRS 经调整净利 +18.5 亿元）' }
 ];
 var maxB = 7.0;
 for (var k = 0; k <= 3; k++) {
 var kv = (k * 2).toFixed(0), ky = pad.top + ph - ((k * 2) / maxB) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.56);
 steps.forEach(function (s, i) {
 var cx = pad.left + i * sW + sW / 2, x = cx - bW / 2;
 var yTopVal = s.v >= 0 ? (s.b + s.v) : s.b;
 var yBotVal = s.v >= 0 ? s.b : (s.b + s.v);
 var yt = pad.top + ph - (yTopVal / maxB) * ph;
 var yb = pad.top + ph - (yBotVal / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 if (state.hover.futureCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * sW + 3, pad.top, sW - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 if (state.hover.futureCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, (s.v >= 0 ? '+' : '') + '¥' + s.v.toFixed(2) + 'B', cx, yt - 12, s.col, pal);
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

 if (state.sView === 'pen') {
 var yrs = ['Q3 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
 var coreM = [-21.0, -5.2, 7.9, 7.3];
 var newM = [-4.6, -6.1, -5.0, -3.5];
 var minY = -25, maxY = 12, span = maxY - minY;
 [-20, -10, 0, 10].forEach(function (gv) {
 var gy = pad.top + ph - ((gv - minY) / span) * ph;
 ctx.strokeStyle = gv === 0 ? pal.borderStrong || pal.blue : pal.grid;
 ctx.lineWidth = gv === 0 ? 1.4 : 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 });
 var stepX = pw / (yrs.length - 1);
 yrs.forEach(function (y, idx) {
 var px = pad.left + idx * stepX;
 if (state.hover.siliconCanvas === idx) {
 ctx.save(); ctx.strokeStyle = pal.blue; ctx.setLineDash([3, 3]);
 ctx.beginPath(); ctx.moveTo(px, pad.top); ctx.lineTo(px, pad.top + ph); ctx.stroke(); ctx.restore();
 }
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: idx, x: px - stepX / 2, y: pad.top, w: stepX, h: ph + 26,
 title: y + (en ? ' Operating Margins' : ' 分部经营利润率'),
 body: (en ? 'Core Local: ' : '核心本地商业: ') + coreM[idx] + '% · ' + (en ? 'New Initiatives: ' : '新业务: ') + newM[idx] + '%'
 });
 });
 function plotM(arr, col) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - ((v - minY) / span) * ph, v: v }; });
 ctx.strokeStyle = col; ctx.lineWidth = 2.8; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function (pt, idx) {
 var isHov = state.hover.siliconCanvas === idx;
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(pt.x, pt.y, isHov ? 4.8 : 3.8, 0, Math.PI * 2); ctx.fill();
 if (idx === 0 || idx === 3 || isHov) drawValueBadge(ctx, pt.v.toFixed(1) + '%', pt.x, pt.y - 14, col, pal);
 });
 }
 if (state.silSeries.mod) plotM(coreM, pal.blue);
 if (state.silSeries.wf) plotM(newM, pal.violet);
 } else {
 var cats = [
 { lbl: en ? 'Merchant Svcs' : '商家服务', val: 43.41, col: pal.blue, tip: en ? 'Merchant Services (Commission + Ads): ¥43.41B (+8.2% YoY)' : '核心商业商家服务收入（佣金与在线营销）：434.07 亿元（+8.2% YoY）' },
 { lbl: en ? 'New Init.' : '新业务分部', val: 37.27, col: pal.violet, tip: en ? 'New Initiatives (Xiaoxiang + Keeta): ¥37.27B (+32.9% YoY)' : '新业务分部（小象超市 + Keeta 出海等）：372.73 亿元（+32.9% YoY）' },
 { lbl: en ? 'Delivery' : '配送服务', val: 28.87, col: pal.green, tip: en ? 'Delivery Services: ¥28.87B (+25.3% YoY)' : '核心商业配送服务收入：288.74 亿元（+25.3% YoY）' },
 { lbl: en ? '1P Goods' : '自营商品', val: 4.26, col: pal.amber, tip: en ? 'Core 1P Merchandise (Pharma/Liquor): ¥4.26B (+75.8% YoY)' : '核心商业商品销售（自营药品/酒水等）：42.61 亿元（+75.8% YoY）' },
 { lbl: en ? 'Other' : '其他收入', val: 1.74, col: pal.tick, tip: en ? 'Other Core Local Revenue: ¥1.74B' : '核心本地商业其他收入：17.40 亿元' }
 ];
 var maxS = 50;
 for (var m = 0; m <= 5; m++) {
 var mv = m * 10, my = pad.top + ph - (mv / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('¥' + mv + 'B', pad.left - 8, my + 4);
 }
 var slot = pw / cats.length, bw = Math.min(44, slot * 0.56);
 cats.forEach(function (c, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = Math.max(5, (c.val / maxS) * ph), yt = pad.top + ph - bh;
 if (state.hover.siliconCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = c.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.siliconCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '¥' + c.val.toFixed(1) + 'B', cx, yt - 12, c.col, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(c.lbl, cx, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: c.lbl, body: c.tip
 });
 });
 }
 }

 var OPT_DATA = {
 core: { rev: 18, net: 14.0, ev: 0 },
 sm: { rev: 0, net: 8.5, ev: 0 },
 newb: { rev: 12, net: 2.8, ev: 0 },
 insta: { rev: 14, net: 4.2, ev: 0 },
 tech: { rev: 0, net: 0, ev: 45 }
 };
 var miniCaps = [386, 240, 746];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.optMiniCanvas = [];
 var pad = { top: 24, right: 18, bottom: 26, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Current EV (¥B)', '2027 Base (¥B)', '2027 + Drivers (¥B)'] : ['当前市值 (¥B)', '2027基础盘 (¥B)', '2027含修复 (¥B)'];
 var maxV = Math.max(950, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
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
 drawValueBadge(ctx, '¥' + Math.round(v) + 'B', cx, yt - 12, col, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lbls[i], cx, pad.top + ph + 16);
 hits.optMiniCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24,
 title: lbls[i],
 body: (en ? 'Implied Equity Value at ' + state.pe + 'x P/E: ¥' : state.pe + 'x P/E 隐含市值: ¥') + Math.round(v) + 'B'
 });
 });
 }

 function recalcOptionality() {
 var baseRev = 480.0, baseNet = 12.0;
 var addRev = 0, addNet = 0, addEv = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addNet += d.net; addEv += d.ev; }
 }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var rmbCap = totNet * state.pe + addEv;
 var hkdCap = rmbCap / 0.92;
 var baseRmbCap = baseNet * state.pe;

 document.getElementById('optRevOut').textContent = '¥' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '¥' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '¥' + Math.round(rmbCap) + 'B';
 document.getElementById('optCapOut').textContent = 'HK$' + Math.round(hkdCap) + 'B';

 miniCaps = [386, baseRmbCap, rmbCap];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 20;
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
 tip.style.left = Math.min(window.innerWidth - 315, Math.max(12, clientX + 14)) + 'px';
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
 { id: 'sec-f0', t: 'F0 拐点定调与三阶趋势雷达', s: '营收 1,155.6 亿 (+21.6%) · 核心商业 +57 亿 · 三大趋势时间窗' },
 { id: 'sec-f1', t: 'F1 六大业务引擎纵向深潜舱', s: '外卖 · 闪购 · 到店酒旅 · 小象超市 · Keeta出海 · LongCat AI' },
 { id: 'sec-f2', t: 'F2 季度扭亏曲线与利润桥拆解', s: 'Q3\'25 巨亏到 Q3\'26 扭亏 · 未分配 AI 投入拆解' },
 { id: 'sec-f3', t: 'F3 AI/出海矩阵与分部利润率', s: 'LongCat-2.5 · 妙手 200 万商家 · Keeta 沙特盈利 · 分部利润率' },
 { id: 'sec-f4', t: 'F4 2027E 盈利修复估值模拟器', s: '自由开关五大修复催化剂与 P/E 倍数测算港股市值' }
 ];
 var QITEMS_EN = [
 { id: 'sec-f0', t: 'F0 Inflection & 3-Stage Radar', s: 'Rev ¥115.56B (+21.6%) · Core +¥5.70B · 3 Strategic Stages' },
 { id: 'sec-f1', t: 'F1 Six Business Segment Engines', s: 'Food Delivery · Instashopping · In-Store · Xiaoxiang · Keeta · AI' },
 { id: 'sec-f2', t: 'F2 Turnaround Curve & Profit Bridge', s: 'Q3\'25–Q3\'26 V-Turnaround · Core Beat vs. Unallocated AI' },
 { id: 'sec-f3', t: 'F3 AI/Global Matrix & Margins', s: 'LongCat-2.5 · CatPaw 2M+ · Keeta KSA Profit · Segment Margins' },
 { id: 'sec-f4', t: 'F4 2027E Recovery Valuation Lab', s: 'Toggle 5 Recovery Catalysts & P/E Multiples Live' }
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

 // Sidebar & Drawer
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
 try { localStorage.setItem('mui_portal_sidebar_collapsed_v1', collapsed ? '1' : '0'); } catch (e) {}
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 }

 // Scroll active nav tracking
 var navLinks = document.querySelectorAll('.mui-nav-link');
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 var cur = 'sec-f0';
 ['sec-f0', 'sec-f1', 'sec-f2', 'sec-f3', 'sec-f4'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el && el.getBoundingClientRect().top <= 140) cur = id;
 });
 navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
 }, { passive: true });

 // Sidebar theme, Export HTML & Print PDF
 var sLight = document.getElementById('sideThemeLightBtn'), sDark = document.getElementById('sideThemeDarkBtn');
 if (sLight) sLight.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 if (sDark) sDark.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });

 var expBtn = document.getElementById('exportHtmlBtn');
 if (expBtn) {
 expBtn.addEventListener('click', function () {
 try {
 var htmlStr = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([htmlStr], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var a = document.createElement('a');
 a.href = url;
 a.download = 'Meituan_Q3_2026_Earnings_Observatory.html';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast(isEn() ? 'Exported HTML file!' : '已导出独立 HTML 文件！');
 } catch (e) {
 showToast(isEn() ? 'Export unavailable in preview' : '当前预览环境限制直接下载');
 }
 });
 }
 var prtBtn = document.getElementById('printPdfBtn');
 if (prtBtn) {
 prtBtn.addEventListener('click', function () { window.print(); });
 }

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
 recalcOptionality();
 drawAll();
 })();
 