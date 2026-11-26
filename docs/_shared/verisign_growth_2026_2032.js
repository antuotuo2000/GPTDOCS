
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

 var TITLE_ZH = '威瑞信 2026–2032 未来战略与新增长曲线观测站 | 数据中心';
 var TITLE_EN = 'VeriSign, Inc. 2026–2032 Strategic Horizon & Growth Observatory | Research Hub';

 var state = {
 theme: 'dark',
 lang: 'zh',
 activeHz: 0,
 activeEng: 0,
 fView: 'capex',
 sView: 'pen',
 pe: 26,
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
 zh: '站在 $17.6 亿年营收与 1.825 亿 .com/.net 域名基数的新起点上，2026 年第四季度成为威瑞信近十年来最重要的战略拐点：一方面，2026 年 11 月 1 日起 <strong>.com 批发价正式启动四年连涨首轮提价（$10.26 → $10.97）</strong> <a class="cite-link" href="https://topsitehosters.com/blog/the-price-of-com-and-org-domains-is-going-up-in-2026-here-is-what-to-do/" target="_blank" rel="noopener noreferrer">.com 提价公告 ↗</a>，同时 <strong>.net 亦定档 2027 年 3 月上调 10% 至 $12.00</strong> <a class="cite-link" href="https://domainincite.com/31906-net-prices-going-up" target="_blank" rel="noopener noreferrer">.net 提价 ↗</a>；另一方面，历经十年 ICANN 博弈的 <strong>.web 顶级域终获放行</strong>（2026 年 12 月 10 日日出期、2027 年 4 月 6 日全面开放，且<strong>无批发限价约束</strong>） <a class="cite-link" href="https://www.quantisnow.com/insight/verisign-announces-web-launch-key-dates-6785369" target="_blank" rel="noopener noreferrer">.web 上线日程 ↗</a>。叠加 2026 年 10 月启动限额公测的高保证身份验证服务 <strong>Verisign Informed™</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 8-K ↗</a>，威瑞信正从单一域名注册局进化为 AI 代理时代的互联网根级信任锚点。',
 en: 'From a $1.76B revenue base and 182.5M .com/.net domains, Q4 2026 marks VeriSign’s biggest strategic inflection in a decade: on Nov 1, 2026, <strong>.com initiated Round 1 of its four-year 7% price escalator ($10.26 → $10.97)</strong> <a class="cite-link" href="https://topsitehosters.com/blog/the-price-of-com-and-org-domains-is-going-up-in-2026-here-is-what-to-do/" target="_blank" rel="noopener noreferrer">.com Hike ↗</a> alongside a <strong>10% .net hike to $12.00 in Mar 2027</strong> <a class="cite-link" href="https://domainincite.com/31906-net-prices-going-up" target="_blank" rel="noopener noreferrer">.net Hike ↗</a>. Simultaneously, after a 10-year battle, <strong>.web launches Dec 10, 2026 (GA Apr 6, 2027) with uncapped pricing</strong> <a class="cite-link" href="https://www.quantisnow.com/insight/verisign-announces-web-launch-key-dates-6785369" target="_blank" rel="noopener noreferrer">.web Dates ↗</a>, paired with <strong>Verisign Informed™</strong> beta for AI-era trust validation <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">Q3 2026 8-K ↗</a>.'
 },
 f2_caption: {
 zh: '战略反差：超大规模云巨头与 CDN 厂商需将营收的 12%–30% 投入高折旧服务器与 GPU 集群；而威瑞信 FY2025 资本开支仅 <strong>$22.8M（占营收 1.4%）</strong>，即便 FY2026 因基础设施升级提至 $55M–$65M（~3.4%），仍属全美利润率最高、最轻资产的数字化核心基建。',
 en: 'Strategic Contrast: Hyperscalers and CDN peers sink 12%–30% of revenue into depreciating GPUs and servers, while VeriSign spent just <strong>$22.8M (1.4% of sales)</strong> in FY25—and even with FY26 upgrades at $55M–$65M (~3.4%), remains an unmatched asset-light cash machine.'
 },
 f3_root: {
 zh: '独家承担 ICANN 根区文件编辑与分发职能，并运营 13 台全球根服务器中的 A 根与 J 根 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">官方披露 ↗</a>。',
 en: 'Exclusive Root Zone Maintainer for ICANN and operator of 2 of 13 global internet root servers (A &amp; J) <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1014473/000101447326000038/q32026earningsrelease.htm" target="_blank" rel="noopener noreferrer">SEC 8-K ↗</a>.'
 },
 f3_sla: {
 zh: '自 1997 年起连续 29 年+ 保持 .com/.net 解析 100% 在线，日均扛住 ~8,000 亿次查询与 DDoS 攻击。',
 en: '29+ consecutive years of 100% .com/.net DNS availability, resolving ~800B daily queries under constant DDoS.'
 },
 f3_web: {
 zh: '2026.12.10 启动日出期，2027.01.12 .com 持有人优先注册，2027.04.06 全面开放 <a class="cite-link" href="https://www.quantisnow.com/insight/verisign-announces-web-launch-key-dates-6785369" target="_blank" rel="noopener noreferrer">上线时间表 ↗</a>。',
 en: 'Sunrise Dec 10, 2026; .com Priority Jan 12, 2027; General Availability Apr 6, 2027 <a class="cite-link" href="https://www.quantisnow.com/insight/verisign-announces-web-launch-key-dates-6785369" target="_blank" rel="noopener noreferrer">Key Dates ↗</a>.'
 },
 f3_caption: {
 zh: '提价复利推演：按照 ICANN 协议 2026–2029 年每年最高 7% 提价权限，.com 批发价将由 2025 年的 $10.26 稳步阶梯升至 2029/2030 年的 <strong>~$13.42</strong>（累计 +30.8%），仅存量提价即可在 2030 年新增逾 $5 亿高毛利营收。',
 en: 'Pricing Compounding: Under the 7% annual cap from 2026–2029, .com wholesale pricing steps from $10.26 to <strong>~$13.42</strong> (+30.8%), adding $500M+ in high-margin annual revenue by 2030.'
 }
 };

 var HORIZONS = [
 {
 badge: 'HORIZON 1 · HIGH-CERTAINTY EXECUTION (2026–2027)',
 badgeZh: 'HORIZON 1 · 高确定性业绩兑现期 (2026–2027)',
 titleZh: '.com 首轮提价落地 × .net 10% 提价 × .web 全面商业开闸',
 titleEn: '.com Hike Round 1 × .net +10% Hike × .web Public Launch',
 itemsZh: [
 '<strong>.com 与 .net 双轮提价：</strong>2026.11 .com 提至 $10.97，2027.03 .net 提至 $12.00，高毛利营收确定性落地。',
 '<strong>.web 三阶段上线：</strong>2026.12.10 日出期 → 2027.01.12 .com 持有人优先期 → 2027.04.06 全面开放。',
 '<strong>Verisign Informed™ 商用：</strong>2026.10 启动有限测试，预计 2027 上半年正式推向企业安全市场。'
 ],
 itemsEn: [
 '<strong>Dual Price Hikes:</strong> .com hits $10.97 (Nov 2026) and .net hits $12.00 (Mar 2027) with near-100% margin flow-through.',
 '<strong>.web 3-Stage Rollout:</strong> Dec 10, 2026 Sunrise → Jan 12, 2027 .com Priority → Apr 6, 2027 General Availability.',
 '<strong>Verisign Informed™:</strong> Limited beta launched Oct 2026, targeting commercial rollout in H1 2027.'
 ],
 probZh: '兑现确定性：极高 (95%+)', probEn: 'Conviction: Very High (95%+)',
 impactZh: '年化增量营收池：+$240M–$320M', impactEn: 'Incremental Pool: +$240M–$320M/yr'
 },
 {
 badge: 'HORIZON 2 · COMPOUNDING & NEW CURVE SCALE (2028–2029)',
 badgeZh: 'HORIZON 2 · 提价复利与新曲线放量期 (2028–2029)',
 titleZh: '.com 连续四年 7% 提价收官 × .web 续费复利 × 缩股突破 8,000 万股',
 titleEn: '.com Escalator Completion × .web Recurring Base × Sub-80M Shares',
 itemsZh: [
 '<strong>.com 突破 $13 门槛：</strong>若 2027–2029 年每年行使 7% 提价权，批发价将于 2029 年底触及 ~$13.42。',
 '<strong>.web 进入高续费周期：</strong>首波 2027 年注册的企业与商业 .web 域名进入 75%–85% 高毛利续费复利。',
 '<strong>股本持续注销：</strong>每年超 $10 亿自由现金流推动流通股本跌破 8,000 万股，EPS 增速显著超营收。'
 ],
 itemsEn: [
 '<strong>.com Tops $13:</strong> Exercising 7% hikes through 2029 lifts .com wholesale pricing to ~$13.42.',
 '<strong>.web Recurring Flywheel:</strong> 2027 cohort enters high-margin renewal cycles alongside premium domain tiers.',
 '<strong>Sub-80M Share Count:</strong> $1B+ annual FCF drives shares outstanding below 80M, accelerating EPS growth.'
 ],
 probZh: '兑现确定性：高 (80%+)', probEn: 'Conviction: High (80%+)',
 impactZh: '年化增量营收池：+$550M–$750M', impactEn: 'Incremental Pool: +$550M–$750M/yr'
 },
 {
 badge: 'HORIZON 3 · POST-2030 CONTRACT & AI TRUST ERA (2030–2032)',
 badgeZh: 'HORIZON 3 · 后 2030 续约与 AI 信任底座期 (2030–2032)',
 titleZh: '2030 .com 协议新一轮续签 × 抗量子 DNSSEC × AI 代理鉴权网络',
 titleEn: '2030 .com Renewal × Post-Quantum DNSSEC × Agentic Trust Layer',
 itemsZh: [
 '<strong>2030 周期续签博弈：</strong>凭借“推定续约权”与 33 年零宕机纪录，锁定下一个六年商业运营周期。',
 '<strong>AI 代理信任基础设施：</strong>Verisign Informed™ 切入高频机器间（M2M）证书与身份实时核验市场。',
 '<strong>抗量子加密根区升级：</strong>全球 DNSSEC 向抗量子密码迁移，进一步拉大中小注册局的技术合规门槛。'
 ],
 itemsEn: [
 '<strong>2030 Contract Renewal:</strong> Presumptive renewal + 33+ years of 100% uptime anchor the next 6-year term.',
 '<strong>Agentic Trust Layer:</strong> Verisign Informed™ scales into high-frequency machine-to-machine authentication.',
 '<strong>Post-Quantum DNSSEC:</strong> Industry-wide PQ migration widens the technical moat around root infrastructure.'
 ],
 probZh: '兑现确定性：中高期权 (60%–70%)', probEn: 'Conviction: Strategic Option (60%–70%)',
 impactZh: '年化增量营收池：+$900M+', impactEn: 'Incremental Pool: +$900M+/yr'
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
 badge: 'ENGINE 01 · .COM 7% CONTRACTED PRICE ESCALATOR',
 titleZh: '.com 四连提价周期（2026–2029）：互联网最确定的内生利润放大器',
 titleEn: '.com 4-Year Price Escalator (2026–2029): Highest-Visibility Profit Lever',
 descZh: '根据 ICANN 2020 年修订的 .com 注册局协议，每个六年合同期前两年冻结价格、后四年每年允许最高上调 7%。2026 年 11 月 1 日首轮提价已正式将批发价从 $10.26 推升至 $10.97（CEO Jim Bidzos 称之为“每天仅增加约 0.2 美分”）。由于解析边际成本为零，2026–2029 年连续四次提价几乎全部直接转为营业利润。',
 descEn: 'Under the 2020 ICANN .com amendment, prices freeze for 2 years and rise up to 7%/year in the final 4 years of each 6-year term. Round 1 took effect Nov 1, 2026 ($10.26 → $10.97). With zero marginal resolution cost, four annual hikes drop straight to operating profit.',
 formulaZh: '利润公式：1.70亿+ .com 存量 × ($13.42 - $10.26) = 2030年纯提价年化贡献逾 $5.3亿 高毛利收入',
 formulaEn: 'Profit Formula: 170M+ .com Base × ($13.42 - $10.26) = +$530M+ Pure Price Revenue by 2030',
 gaugesZh: [['$10.97', '2026.11.01 生效批发价 (+6.9%)'], ['~$13.42', '2029–2030E 理论提价上限'], ['~95%', '提价新增收入转营业利润率'], ['1.70亿+', '.com 活跃商业域名存量基数']],
 gaugesEn: [['$10.97', 'Nov 1, 2026 Wholesale Price'], ['~$13.42', '2029–2030E Contract Ceiling'], ['~95%', 'Incremental OpInc Flow-Through'], ['170M+', 'Active .com Domain Base']]
 },
 {
 badge: 'ENGINE 02 · .WEB UNCAPPED gTLD LAUNCH',
 titleZh: '.web 顶级域商业化落地：不受 ICANN 限价约束的第二主干后缀',
 titleEn: '.web Commercialization: Uncapped Wholesale Pricing Power',
 descZh: '历经逾十年竞争争议与 ICANN 独立审查，威瑞信于 2026 年 7 月彻底扫清障碍并在 11 月 11 日官宣上线日程：2026 年 12 月 10 日启动商标日出期、2027 年 1 月 12 日开启 .com 持有人优先注册期、2027 年 4 月 6 日全面公开注册。最关键的是，.web 不同于 .com/.net，没有任何批发价格上限限制。',
 descEn: 'After a decade of ICANN proceedings, VeriSign cleared all hurdles in 2026 and set .web dates: Dec 10, 2026 Sunrise; Jan 12, 2027 .com Owner Priority Access; Apr 6, 2027 General Availability. Crucially, .web has NO ICANN wholesale price cap.',
 formulaZh: '变现双轮：(1) 2027 Q1 既存 .com 品牌防御性批量抢注 + (2) 高价值词分级溢价与长期续费复利',
 formulaEn: 'Dual Engine: (1) Q1 2027 defensive .com owner priority uptake + (2) tiered premium pricing &amp; recurring renewals',
 gaugesZh: [['2026.12.10', 'TMCH 商标日出期正式启动'], ['2027.01.12', '.com 持有人优先配对窗口'], ['2027.04.06', '全球公众全面开放注册 (GA)'], ['无价格上限', '摆脱 ICANN 批发限价约束']],
 gaugesEn: [['Dec 10, 2026', 'TMCH Trademark Sunrise Opens'], ['Jan 12, 2027', '.com Owner Priority Window'], ['Apr 6, 2027', 'Global General Availability'], ['Uncapped', 'Free from ICANN Price Caps']]
 },
 {
 badge: 'ENGINE 03 · VERISIGN INFORMED™ HIGH-ASSURANCE TRUST',
 titleZh: 'Verisign Informed™：从“域名寻址”切入“机器速度时代实时信任验证”',
 titleEn: 'Verisign Informed™: Real-Time Trust Validation at Machine Speed',
 descZh: '2026 年 10 月威瑞信正式发布并开启 Verisign Informed™ 有限测试。随着企业依赖数字证书与 AI 自主代理在毫秒级交互，传统静态证书极易产生“过期信任（Stale Trust）”风险。威瑞信将自身权威域名注册与根级安全遥测封装为高保证验证服务，在不重资产扩张的前提下开辟高毛利 B2B 安全 SaaS 收入。',
 descEn: 'Launched in limited beta in Oct 2026, Verisign Informed™ addresses "stale trust" for enterprises and autonomous AI agents operating at machine speed—monetizing VeriSign’s authoritative DNS telemetry as a high-margin B2B validation layer.',
 formulaZh: '战略定位：复用现有 928 人安全/工程底座 → 零重资产切入企业零信任与 AI 代理身份校验',
 formulaEn: 'Strategic Leverage: Reuses existing 928-FTE security core → asset-light B2B trust SaaS',
 gaugesZh: [['2026.10', 'Q3 财报确认开启有限测试'], ['Stale Trust', '直击企业数字证书过期痛点'], ['2027 H1', '预计推向全面商业化部署'], ['高毛利 SaaS', '纯软件接口订阅收费模式']],
 gaugesEn: [['Oct 2026', 'Limited Beta Confirmed in Q3'], ['Stale Trust', 'Solves Certificate Staleness'], ['H1 2027', 'Expected Commercial Rollout'], ['High-GM SaaS', 'API-Driven Enterprise Subs']]
 },
 {
 badge: 'ENGINE 04 · .NET 10% ESCALATOR & STICKY RENEWAL',
 titleZh: '.net 基础设施后缀：1,240 万老牌基数的 10% 年提价压舱石',
 titleEn: '.net Infrastructure Registry: 10% Annual Escalator on Sticky Base',
 descZh: '作为全球互联网早期网络基础设施、ISP 与技术开发者的首选后缀，.net 拥有约 1,240 万个极度稳定的域名基数。威瑞信已正式公告自 2027 年 3 月 1 日起将 .net 批发价从 $10.91 上调 10% 至 $12.00（合同允许每年最高 10% 提价），在低波动中持续贡献高纯度现金流。',
 descEn: 'With ~12.4M domains powering ISPs and network infrastructure, .net exhibits exceptional renewal inertia. VeriSign announced a 10% wholesale increase from $10.91 to $12.00 effective March 1, 2027.',
 formulaZh: '利润传导：1,240万 .net 域名 × $1.09 提价 ≈ 年化新增 ~$1,350万 纯税前利润',
 formulaEn: 'Margin Flow: 12.4M .net Domains × $1.09 Hike ≈ +$13.5M Annualized Pre-Tax Profit',
 gaugesZh: [['$12.00', '2027.03.01 生效批发价'], ['+10.0%', 'ICANN 合同允许年提价上限'], ['~1,240万', '.net 区域文件稳定域名基数'], ['基础设施级', 'ISP 与技术架构极低迁移意愿']],
 gaugesEn: [['$12.00', 'Mar 1, 2027 Wholesale Fee'], ['+10.0%/yr', 'ICANN Contracted Escalator'], ['~12.4M', 'Stable .net Zone File Base'], ['Infra-Grade', 'Ultra-Sticky ISP/Tech Base']]
 },
 {
 badge: 'ENGINE 05 · AI-ERA DOMAIN DEMAND & AGENTIC DNS',
 titleZh: 'AI 代理与微型应用爆发：Q3 2026 新注册飙至 1,310 万创近年纪录',
 titleEn: 'AI Startup & Agentic Boom: Record 13.1M Q3 2026 New Registrations',
 descZh: '市场曾担忧聊天机器人会取代网站访问，但现实恰恰相反：AI 编程极大降低了网站与 SaaS 搭建门槛，全球 AI 工具、智能体与自动化工作流反而需要更多独立域名作为可信 API 与品牌入口。Q3 2026 威瑞信新注册量跳升至 1,310 万个（+23.6% YoY），推动全年基数增速指引上调至 6.5%–7.0%。',
 descEn: 'Contrary to fears that chatbots would kill domains, AI coding lowered website creation friction while agents need trusted API endpoints. Q3 2026 new registrations jumped +23.6% YoY to 13.1M, lifting FY26 base growth guidance to 6.5%–7.0%.',
 formulaZh: '量价共振：域名基数恢复 4%–6% 增长 × 7% 年提价 = 双位数营收与 13%–16% EPS 复利',
 formulaEn: 'Volume × Price: 4%–6% Base Growth × 7% Escalator = Double-Digit Rev &amp; 13%–16% EPS CAGR',
 gaugesZh: [['13.1M', 'Q3 2026 单季新注 (+23.6% YoY)'], ['+3.36M', 'Q3 2026 单季净增域名基数'], ['6.5%–7.0%', 'FY2026 全年基数增长指引'], ['75.2%', 'Q2 2026 最终混合续费率']],
 gaugesEn: [['13.1M', 'Q3 2026 New Adds (+23.6% YoY)'], ['+3.36M', 'Q3 2026 Net Base Additions'], ['6.5%–7.0%', 'FY2026 Base Growth Guidance'], ['75.2%', 'Q2 2026 Final Renewal Rate']]
 },
 {
 badge: 'ENGINE 06 · POST-QUANTUM DNSSEC & ROOT RESILIENCE',
 titleZh: '抗量子 DNSSEC 与根区弹性：锁定 2030 年后下一个十年特许权',
 titleEn: 'Post-Quantum DNSSEC & Root Resilience: Locking in Post-2030 Renewal',
 descZh: '为应对 AI 代理流量洪峰与未来量子计算对加密签名的挑战，威瑞信在 FY2026 将资本开支由 $22.8M 主动提升至 $55M–$65M，强化全球任意播（Anycast）解析集群、DDoS 防御与抗量子 DNSSEC 演进。持续零失误的国家级安全表现，是威瑞信在 2030 年顺利续签 ICANN .com 协议的最强政治与技术背书。',
 descEn: 'To absorb AI traffic spikes and prepare for quantum computing threats, VeriSign raised FY26 CapEx from $22.8M to $55M–$65M for Anycast capacity, DDoS defense, and post-quantum DNSSEC—cementing its 2030 ICANN .com renewal.',
 formulaZh: '战略定位：以不足营收 3.5% 的极小 CapEx 投入，换取 2030–2036 年下一个六年垄断期续约',
 formulaEn: 'Strategic ROI: <3.5% CapEx intensity secures the next 2030–2036 exclusive .com renewal',
 gaugesZh: [['$55M–$65M', 'FY2026E 基础设施升级 CapEx'], ['Anycast', '全球分布式抗 DDoS 根解析网'], ['PQ-DNSSEC', '抗量子加密签名演进储备'], ['2030→2036', '推定续约权锁定下个六年周期']],
 gaugesEn: [['$55M–$65M', 'FY2026E Infrastructure CapEx'], ['Anycast', 'Global DDoS-Resilient Mesh'], ['PQ-DNSSEC', 'Post-Quantum Crypto Readiness'], ['2030→2036', 'Presumptive Next 6-Yr Cycle']]
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
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'VeriSign 1.4% (FY25) / 3.4% (FY26E) vs. Cloud &amp; Infra Peers (12%–29%)' : '威瑞信 1.4% (FY25) / 3.4% (FY26E) vs 云/边缘基建同行 (12%–29%)') + '</span>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'FY2025 ($1.66B) → FY2032E (~$3.28B) Multi-Horizon Bridge' : 'FY2025 ($1.66B) → FY2032E (~$3.28B) 多曲线营收增量阶梯') + '</span>';
 }
 }

 function renderSiliconLegend() {
 var leg = document.getElementById('siliconLegend');
 if (!leg) return;
 var en = isEn();
 if (state.sView === 'pen') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.silSeries.mod ? '' : ' muted') + '" data-sil-series="mod"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? '.com Wholesale Price ($)' : '.com 批发价法定路径 ($)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.silSeries.wf ? '' : ' muted') + '" data-sil-series="wf"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? '.net Wholesale Price ($)' : '.net 批发价路径 ($)') + '</span></button>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'Projected .web + Verisign Informed™ Incremental Revenue ($M)' : '推演 .web + Verisign Informed™ 年化增量营收 ($M)') + '</span>';
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
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var peers = [
 { name: 'Microsoft', cap: 27.5, col: pal.amber, tip: en ? 'Hyperscale AI data centers require ~27% of sales in CapEx' : '超大规模 AI 数据中心投入占营收 ~27.5%' },
 { name: 'Alphabet', cap: 18.5, col: pal.blue, tip: en ? 'TPU & AI infrastructure buildout ~18.5% of sales' : 'TPU 与云基础设施 CapEx 占营收 ~18.5%' },
 { name: 'Cloudflare', cap: 12.2, col: pal.violet, tip: en ? 'Global edge network server expansion ~12.2% of sales' : '全球边缘服务器与 CDN 扩容占营收 ~12.2%' },
 { name: 'VRSN FY26E', cap: 3.4, col: pal.blue, tip: en ? 'FY26E CapEx $55M–$65M (~3.4% of $1.76B sales) for infrastructure refresh' : 'FY2026E 指引 CapEx $55M–$65M（占营收 ~3.4%），用于根解析升级' },
 { name: 'VRSN FY25', cap: 1.4, col: pal.green, tip: en ? 'FY25 actual CapEx just $22.8M (1.4% of $1,656.6M sales); FCF $1,068.3M!' : 'FY2025 实际 CapEx 仅 $22.8M（占营收 1.4%），FCF 高达 $1,068.3M' }
 ];
 var maxC = 32;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 peers.forEach(function (p, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 if (state.hover.futureCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 3, pad.top, slot - 6, ph, 7); ctx.fill();
 }
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.futureCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, p.cap.toFixed(1) + '%', cx, yt - 12, p.col, pal);
 ctx.fillStyle = i >= 3 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(p.name, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: p.name + (en ? ' CapEx Intensity' : ' 资本开支强度'), body: p.tip });
 });
 } else {
 var steps = [
 { lbl: en ? 'FY25 Base' : 'FY25基准', v: 1657, b: 0, col: pal.blue, tip: en ? 'FY2025 Actual Revenue: $1,656.6M' : 'FY2025 实际总营收: $1,656.6M' },
 { lbl: en ? '+.com Price' : '+.com提价', v: 580, b: 1657, col: pal.green, tip: en ? '2026–2031 .com & .net contracted wholesale escalators: +$580M' : '2026–2031 .com 与 .net 法定提价周期贡献 +$580M' },
 { lbl: en ? '+Base Vol' : '+基数扩容', v: 410, b: 2237, col: pal.violet, tip: en ? 'AI-era domain base expansion (~3.5%/yr): +$410M' : 'AI 时代域名基数自然增长（~3.5%/年）贡献 +$410M' },
 { lbl: en ? '+.web gTLD' : '+.web商业化', v: 265, b: 2647, col: pal.amber, tip: en ? 'Uncapped .web gTLD registration & renewal scaling: +$265M' : '.web 无上限新顶级域注册与续费放量贡献 +$265M' },
 { lbl: en ? '+Informed' : '+信任服务', v: 368, b: 2912, col: pal.green, tip: en ? 'Verisign Informed™ & enterprise trust APIs: +$368M' : 'Verisign Informed™ 实时信任验证与安全增值服务贡献 +$368M' },
 { lbl: en ? 'FY32E Target' : 'FY32E蓝图', v: 3280, b: 0, col: pal.blue, tip: en ? 'FY2032E Horizon Target: ~$3.28B (~2x FY25 revenue at >72% OpM)' : 'FY2032E 远期营收蓝图: ~$3.28B（营业利润率维持 72%+）' }
 ];
 var maxB = 3600;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + (kv / 1000).toFixed(1) + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
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
 var badgeTxt = s.v >= 1000 ? ('$' + (s.v / 1000).toFixed(2) + 'B') : ((s.b > 0 ? '+' : '') + '$' + s.v + 'M');
 drawValueBadge(ctx, badgeTxt, cx, yt - 12, s.col, pal);
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
 var yrs = ['2025', '2026.11', '2027E', '2028E', '2029E', '2030E'];

 if (state.sView === 'pen') {
 var comP = [10.26, 10.97, 11.73, 12.55, 13.42, 13.42];
 var netP = [10.91, 10.91, 12.00, 13.20, 14.52, 15.97];
 var minP = 9.0, maxP = 17.0;
 for (var g = 0; g <= 4; g++) {
 var gv = minP + ((maxP - minP) / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0), pad.left - 8, gy + 4);
 }
 var stepX = pw / 5;
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
 title: y + (en ? ' Wholesale Price Ceiling' : ' 法定批发价路径'),
 body: '.com: $' + comP[idx].toFixed(2) + ' · .net: $' + netP[idx].toFixed(2)
 });
 });
 function plotP(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - ((v - minP) / (maxP - minP)) * ph, v: v }; });
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
 if (idx === 1 || idx === 4 || isHov) drawValueBadge(ctx, '$' + pt.v.toFixed(2), pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.silSeries.mod) plotP(comP, pal.blue, 'rgba(0, 115, 230, 0.18)');
 if (state.silSeries.wf) plotP(netP, pal.violet, 'rgba(124, 58, 237, 0.16)');
 } else {
 var incRev = [0, 8, 68, 155, 270, 400];
 var maxS = 450;
 for (var m = 0; m <= 3; m++) {
 var mv = m * 150, my = pad.top + ph - (mv / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv + 'M', pad.left - 8, my + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = Math.max(3, (incRev[i] / maxS) * ph), yt = pad.top + ph - bh;
 if (state.hover.siliconCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.siliconCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '$' + incRev[i] + 'M', cx, yt - 12, i >= 3 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: y + (en ? ' .web + Informed™ Est.' : ' .web + Informed™ 增量推演'),
 body: (en ? 'Projected combined incremental revenue: ~$' : '预计 .web 与 Verisign Informed™ 合计贡献营收 ~$') + incRev[i] + 'M'
 });
 });
 }
 }

 var OPT_DATA = {
 com7: { rev: 520, net: 390 },
 vol: { rev: 285, net: 198 },
 web: { rev: 180, net: 118 },
 buy: { rev: 0, net: 0 },
 inf: { rev: 220, net: 132 }
 };
 var miniCaps = [25.8, 28.5, 38.2];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.optMiniCanvas = [];
 var pad = { top: 24, right: 18, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Current Cap', '2030 Core', '2030 + Options'] : ['当前市值基准', '2030基础盘', '2030含期权'];
 var maxV = Math.max(52, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
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
 body: (en ? 'Implied Market Cap at ' + state.pe + 'x P/E: $' : state.pe + 'x P/E 隐含市值: $') + v.toFixed(1) + 'B'
 });
 });
 }

 function recalcOptionality() {
 var baseRev = 1758.0, baseNet = 865.0;
 var addRev = 0, addNet = 0, useBuyback = false;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var k = chk.getAttribute('data-opt');
 if (k === 'buy') useBuyback = true;
 var d = OPT_DATA[k];
 if (d) { addRev += d.rev; addNet += d.net; }
 }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var sh2030 = useBuyback ? 78.8 : 89.8;
 var eps = totNet / sh2030;
 var mcapB = (totNet * state.pe) / 1000;
 var baseMcapB = (baseNet * state.pe) / 1000;

 document.getElementById('optRevOut').textContent = '$' + (totRev / 1000).toFixed(2) + 'B';
 document.getElementById('optNetOut').textContent = '$' + Math.round(totNet) + 'M';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapB.toFixed(1) + 'B';

 miniCaps = [25.8, baseMcapB, mcapB];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 26;
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

 var QITEMS_ZH = [
 { id: 'sec-f0', t: 'F0 四连提价与三阶战略时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: '.com 7%提价 · .web 无上限 · Verisign Informed™ · .net 10% · AI DNS' },
 { id: 'sec-f2', t: 'F2 反共识轻资产纪律与 2032 营收桥', s: '威瑞信 1.4%–3.4% CapEx 对比云巨头 · 迈向 ~$3.28B 营收阶梯' },
 { id: 'sec-f3', t: 'F3 协议主权与 .com/.web 爬坡路线图', s: 'A/J 根服务器 + .com $10.97→$13.42 + .web 2027.04 开放' },
 { id: 'sec-f4', t: 'F4 2030 估值跃升期权组装器', s: '自由开关五大催化剂与 P/E 倍数实时测算 EPS 与市值' }
 ];
 var QITEMS_EN = [
 { id: 'sec-f0', t: 'F0 Price Cycle & 3-Horizon S-Curve Radar', s: '2026–2032 Near / Mid / Long-Term Catalysts & Conviction' },
 { id: 'sec-f1', t: 'F1 Six Future Growth Engines Explorer', s: '.com 7% · Uncapped .web · Verisign Informed™ · .net 10% · AI DNS' },
 { id: 'sec-f2', t: 'F2 Anti-Consensus CapEx & 2032 Bridge', s: 'VeriSign 1.4%–3.4% CapEx vs. Peers · Bridge to ~$3.28B' },
 { id: 'sec-f3', t: 'F3 Protocol Sovereignty & .com/.web Ramp', s: 'A/J Root Servers + .com $10.97→$13.42 + .web Apr 2027 GA' },
 { id: 'sec-f4', t: 'F4 2030 Valuation Optionality Builder', s: 'Toggle 5 Growth Catalysts & P/E Multiples Live' }
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

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 if (sbBtn && sb && bd) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
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
 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
 if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 