
 (function () {
 'use strict';

 /* ======================================================================
 1. Grounded Datasets & Bilingual State Model
 ====================================================================== */
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_CHECK_KEY = 'mui_rblx_game_checks_v1';

 var DOC_TITLE_ZH = 'Roblox 游戏与 UGC 生态深度研究报告 (NYSE: RBLX) | 数据中心';
 var DOC_TITLE_EN = 'Roblox Game & Global UGC Ecosystem Deep Dive (NYSE: RBLX) | Research Hub';

 var I18N_RICH_LIST = [
 {
 key: 'rbx_r00',
 match_zh: 'Roblox 游戏与全球 UGC 生态深度研究报告：',
 zh: 'Roblox 游戏与全球 UGC 生态深度研究报告：<span class="gradient-accent">社交裂变爆款工厂、15亿美元创作者经济与 AI 原生游戏奇点</span>',
 en: 'Roblox Game &amp; Global UGC Ecosystem Deep Dive: <span class="gradient-accent">Viral Hit Factory, $1.5B Creator Economy &amp; AI-Native Gaming Singularity</span>'
 },
 {
 key: 'rbx_r01',
 match_zh: '为什么传统 3A 游戏动辄耗资数亿美元',
 zh: '为什么传统 3A 游戏动辄耗资数亿美元、研发周期长达五年，而在 Roblox（NYSE: RBLX）上，几名年轻开发者仅用 4 个月打造的《Steal a Brainrot》就能创下 <strong>2,540 万+ 单游戏峰值同时在线（CCU）</strong>的世界纪录，并与《Grow a Garden》（上线 33 天破 10 亿访问）共同在 2025 年 8 月将 Roblox 全平台同时在线推上 <strong>4,730 万人</strong>，一举超越 Steam 历史峰值（4,120 万） <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q4 2025 Letter ↗</a> <a class="cite-link" href="https://www.pocketgamer.biz/robloxs-steal-a-brainrot-becomes-first-game-to-surpass-25m-concurrent-players/" target="_blank" rel="noopener noreferrer">PocketGamer ↗</a>？ 答案在于 Roblox 并非单一游戏开发商，而是将<strong>“跨平台 3D 引擎（Roblox Studio）+ 免运维全球多人云端托管 + 好友社交图谱即时分发 + 统一虚拟货币（Robux）与创作者分成（DevEx）”</strong>垂直整合的双边网络飞轮。 2025 财年，Roblox 实现 GAAP 营收 <strong>$48.91 亿</strong>（+36% YoY）、预订额（Bookings）<strong>$67.88 亿</strong>（+55% YoY）、自由现金流 <strong>$13.53 亿</strong>（+111% YoY），占全球游戏内容市场份额达 <strong>3.4%</strong>（长期目标冲击 <strong>10%</strong>），并向全球创作者发放创纪录的 <strong>$15.03 亿</strong> DevEx 分成 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">FY25 Financials ↗</a>。 截至 2026 Q3，平台日活跃用户（DAU）达 <strong>1.38 亿</strong>（环比 +12%）、单季参与时长近 <strong>340 亿小时</strong>（环比 +17%），Top 100 游戏中超 <strong>80%</strong> 已采用 AI 工具加速研发，自然语言建游工具 <strong>Roblox Build</strong> 内测吸引超 50 万用户体验并发布逾 7 万款新游 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Letter ↗</a>。',
 en: 'Why do traditional AAA titles demand hundreds of millions of dollars and five-year build cycles, whereas on Roblox (NYSE: RBLX) a small team of young developers built <em>Steal a Brainrot</em> in just 4 months to set an all-time world record of <strong>25.4M+ peak concurrent users (CCU)</strong>—joining <em>Grow a Garden</em> (1B visits in 33 days) to propel platform-wide concurrent players to <strong>47.3M</strong> in August 2025, surpassing Steam\'s 41.2M record <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q4 2025 Letter ↗</a> <a class="cite-link" href="https://www.pocketgamer.biz/robloxs-steal-a-brainrot-becomes-first-game-to-surpass-25m-concurrent-players/" target="_blank" rel="noopener noreferrer">PocketGamer ↗</a>? Because Roblox is not a single game publisher—it is a vertically integrated two-sided flywheel combining a <strong>cross-device 3D engine (Roblox Studio), zero-ops global multiplayer cloud hosting, instant social-graph distribution, and a unified Robux + Developer Exchange (DevEx) economy</strong>. In FY2025, Roblox delivered <strong>$4.89B</strong> in GAAP revenue (+36% YoY), <strong>$6.79B</strong> in Bookings (+55% YoY), and <strong>$1.35B</strong> in free cash flow (+111% YoY), capturing <strong>3.4%</strong> of the global gaming market (targeting <strong>10%</strong>) while paying creators a record <strong>$1.50B</strong> via DevEx <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">FY25 Financials ↗</a>. In Q3 2026, DAUs reached <strong>138M</strong> (+12% QoQ) with nearly <strong>34B</strong> hours engaged (+17% QoQ), over <strong>80%</strong> of Top 100 games leveraged AI tools, and natural-language builder <strong>Roblox Build</strong> surpassed 500k alpha users and 70,000+ published games <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Letter ↗</a>.'
 },
 {
 key: 'rbx_r02',
 match_zh: '2026 Q3 平均 DAU 达 1.38 亿',
 zh: '2026 Q3 平均 DAU 达 1.38 亿（两年期 +55%），单季参与时长近 340 亿小时（FY25 全年高达 1,239 亿小时） <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">26Q3 Letter ↗</a>。',
 en: 'Q3 2026 average DAUs hit 138M (+55% on a 2-year basis) with nearly 34B quarterly hours engaged (123.9B hours in FY25) <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">26Q3 Letter ↗</a>.'
 },
 {
 key: 'rbx_r03',
 match_zh: 'FY25 Bookings 同比暴涨 55%',
 zh: 'FY25 Bookings 同比暴涨 55% 至 $67.88 亿，经营现金流达 $17.96 亿，26Q3 账面现金及投资总额增至 $62 亿 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">FY25 Letter ↗</a>。',
 en: 'FY25 Bookings surged +55% YoY to $6.79B with $1.80B operating cash flow; cash &amp; investments reached $6.2B in Q3 2026 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">FY25 Letter ↗</a>.'
 },
 {
 key: 'rbx_r04',
 match_zh: 'FY25 创作者分成同比跃升 62.9%',
 zh: 'FY25 创作者分成同比跃升 62.9% 至 $15.03 亿（Top 1,000 创作者均入 $130 万）；2026 前三季度再发 $11.89 亿 <a class="cite-link" href="https://resourcera.com/statistics/gaming/roblox-creator-earnings/" target="_blank" rel="noopener noreferrer">Resourcera ↗</a>。',
 en: 'FY25 creator payouts jumped +62.9% YoY to $1.50B ($1.3M avg for Top 1,000 creators), plus $1.19B paid in 9M 2026 <a class="cite-link" href="https://resourcera.com/statistics/gaming/roblox-creator-earnings/" target="_blank" rel="noopener noreferrer">Resourcera ↗</a>.'
 },
 {
 key: 'rbx_r05',
 match_zh: '全球已核验 DAU 中 13–17 岁占 37%',
 zh: '全球已核验 DAU 中 13–17 岁占 37%、18+ 占 29%（合计 66%），美国 18+ 玩家变现力高出未成年群体 50%+ <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Age-Check ↗</a>。',
 en: 'Among age-checked global DAUs, 37% are 13–17 and 29% are 18+ (66% aged 13+); U.S. O18 users monetize 50%+ higher than U18 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Age-Check ↗</a>.'
 },
 {
 key: 'rbx_r06',
 match_zh: '开发者只需在 Studio 编写一套代码',
 zh: '开发者只需在 Studio 编写一套代码，即可利用 SLIM 与动态纹理流式技术在千元安卓机、iOS、PC、PlayStation、Xbox、VR 乃至全新 WebAssembly 网页端（Chrome 免安装直连）同步流畅运行 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Tech ↗</a>。',
 en: 'Creators write one Luau codebase in Studio and deploy simultaneously across budget Android phones, iOS, PC, PlayStation, Xbox, VR, and instant zero-install WebAssembly browser links via SLIM and texture streaming <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Tech ↗</a>.'
 },
 {
 key: 'rbx_r07',
 match_zh: '2025–2026 年升级 RFY 长期留存',
 zh: '2025–2026 年升级 RFY 长期留存与年龄分层推荐权重后，Top 10 游戏占总时长比例已从三年前约 30% 降至约 20%，25Q4 非 Top 10 游戏贡献了过半的新增 Robux 消费增长 <a class="cite-link" href="https://www.quantumrun.com/consulting/metaverse-market-statistics/" target="_blank" rel="noopener noreferrer">Long-Tail Share ↗</a>。',
 en: 'After tuning RFY discovery for long-term retention and age cohorts, Top 10 games\' share of hours fell from ~30% (2023) to ~20% (2026), while non-Top-10 titles drove over half of Q4 2025 Robux spend growth <a class="cite-link" href="https://www.quantumrun.com/consulting/metaverse-market-statistics/" target="_blank" rel="noopener noreferrer">Long-Tail Share ↗</a>.'
 },
 {
 key: 'rbx_r08',
 match_zh: '针对 18–34 岁成人玩家偏好的竞技射击',
 zh: '针对 18–34 岁成人玩家偏好的竞技射击、体育竞速与硬核 RPG，上线服务端权威校验（Server Authority）与客户端预测回滚，彻底解决早年外挂与延迟痛点 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Novel Games ↗</a>。',
 en: 'Targeting 18–34 adult genres (Shooters, Sports/Racing, RPGs), Roblox shipped Server Authority with client prediction and rollback to ensure low-latency competitive fairness <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Novel Games ↗</a>.'
 },
 {
 key: 'rbx_r09',
 match_zh: '2025年夏秋双子星引爆全球游戏史纪录',
 zh: '<strong>2025年夏秋双子星引爆全球游戏史纪录：全平台 4,730 万同时在线</strong> —— 《Grow a Garden》与《Steal a Brainrot》在 2025 年合计斩获超 1,050 亿次访问，推动 Roblox 单季 DAU 在 25Q3 冲上 1.515 亿历史峰值，并在 26Q3 高基数上稳守 1.38 亿 DAU <a class="cite-link" href="https://gamedevreports.substack.com/p/newzoo-and-geeiq-the-roblox-audience" target="_blank" rel="noopener noreferrer">Newzoo &amp; GEEIQ ↗</a>。',
 en: '<strong>2025 Viral Duo Shatters Gaming Records: 47.3M Platform Peak CCU</strong> — <em>Grow a Garden</em> and <em>Steal a Brainrot</em> drew 105B+ combined visits in 2025, lifting Q3 2025 DAUs to a 151.5M peak before stabilizing at a resilient 138M DAUs in Q3 2026 <a class="cite-link" href="https://gamedevreports.substack.com/p/newzoo-and-geeiq-the-roblox-audience" target="_blank" rel="noopener noreferrer">Newzoo &amp; GEEIQ ↗</a>.'
 },
 {
 key: 'rbx_r10',
 match_zh: '以《Brookhaven RP》（Voldex 运营',
 zh: '以《Brookhaven RP》（Voldex 运营，累计访问超 879 亿次稳居全平台历史第一）与《Adopt Me!》为代表的低门槛生活扮演游戏，弱化胜负数值惩罚，聚焦房产载具定制、宠物孵化交易与熟人实时语聊，常年稳居 15 万–40 万+ 实时在线 <a class="cite-link" href="https://www.demandsage.com/how-many-people-play-roblox/" target="_blank" rel="noopener noreferrer">DemandSage 2026 ↗</a>。',
 en: 'Led by <em>Brookhaven RP</em> (operated by Voldex, #1 all-time with 87.9B+ visits) and <em>Adopt Me!</em>, low-friction social roleplay hubs prioritize house/vehicle customization, pet trading, and friend hangout chat—sustaining 150K–400K+ live CCU <a class="cite-link" href="https://www.demandsage.com/how-many-people-play-roblox/" target="_blank" rel="noopener noreferrer">DemandSage 2026 ↗</a>.'
 },
 {
 key: 'rbx_r11',
 match_zh: '2025 年现象级双王：《Grow a Garden》',
 zh: '2025 年现象级双王：《Grow a Garden》以“种植稀有作物 + 离线生长 + 气候突变全服事件”创下 33 天破 10 亿访问神迹；《Steal a Brainrot》融合网络迷因收集与玩家基地互相潜入偷取的强情绪对抗，创下超 2,540 万同时在线纪录 <a class="cite-link" href="https://www.pocketgamer.biz/robloxs-steal-a-brainrot-becomes-first-game-to-surpass-25m-concurrent-players/" target="_blank" rel="noopener noreferrer">25.4M CCU ↗</a>。',
 en: '2025\'s breakout phenomena: <em>Grow a Garden</em> paired cozy offline crop mutations with server-wide weather events (1B visits in 33 days), while <em>Steal a Brainrot</em> fused meme collecting with high-stakes base raiding to hit 25.4M+ concurrent users <a class="cite-link" href="https://www.pocketgamer.biz/robloxs-steal-a-brainrot-becomes-first-game-to-surpass-25m-concurrent-players/" target="_blank" rel="noopener noreferrer">25.4M CCU ↗</a>.'
 },
 {
 key: 'rbx_r12',
 match_zh: '《Blox Fruits》（累计访问 646 亿+）',
 zh: '《Blox Fruits》（累计访问 646 亿+）通过多海域等级探索、恶魔果实觉醒与玩家交易构筑深度 RPG 经济；《99 Nights in the Forest》（峰值 1,410 万 CCU）与竞技射击《RIVALS》则以高难度组队生存与低延迟公平枪战成功打开青少年及 18+ 硬核玩家市场 <a class="cite-link" href="https://lootbar.gg/blog/en/roblox-best-games-to-play-in-2026-top-picks-across-every-genre.html" target="_blank" rel="noopener noreferrer">Genre Leaders ↗</a>。',
 en: '<em>Blox Fruits</em> (64.6B+ visits) anchors deep multi-sea anime RPG progression and trading, while co-op horror breakout <em>99 Nights in the Forest</em> (14.1M peak CCU) and shooter <em>RIVALS</em> capture older teen and O18 core gamers <a class="cite-link" href="https://lootbar.gg/blog/en/roblox-best-games-to-play-in-2026-top-picks-across-every-genre.html" target="_blank" rel="noopener noreferrer">Genre Leaders ↗</a>.'
 },
 {
 key: 'rbx_r13',
 match_zh: '《Dress To Impress》以“6分钟主题穿搭',
 zh: '《Dress To Impress》以“6分钟主题穿搭 + T台走秀全员打分”横扫女性与时尚玩家，先后联动 Charli XCX 与 Lady Gaga（Mayhem 主题评审）；与此同时，2026 Q3 纯 AI 驱动开发的《Break and Steal an Egg》与《Huss Valley》双双闯入全平台同时在线前 20 名 <a class="cite-link" href="https://en.wikipedia.org/wiki/List_of_Roblox_games" target="_blank" rel="noopener noreferrer">Roblox Games Wiki ↗</a>。',
 en: '<em>Dress To Impress</em> redefined competitive fashion runways with official Charli XCX and Lady Gaga (<em>Mayhem</em>) collaborations, while AI-built titles <em>Break and Steal an Egg</em> and <em>Huss Valley</em> broke into Roblox\'s Top 20 CCU chart in Q3 2026 <a class="cite-link" href="https://en.wikipedia.org/wiki/List_of_Roblox_games" target="_blank" rel="noopener noreferrer">Roblox Games Wiki ↗</a>.'
 },
 {
 key: 'rbx_r14',
 match_zh: '2025.09 标准汇率上调 8.5%',
 zh: '2025.09 标准汇率上调 8.5% 至 $0.0038/Robux；2026.06 对美国认证 18+ 玩家内购给予 $0.0054 超额激励 <a class="cite-link" href="https://create.roblox.com/docs/production/monetization/developer-exchange" target="_blank" rel="noopener noreferrer">DevEx Docs ↗</a>。',
 en: 'Standard DevEx rose +8.5% to $0.0038/Robux in Sept 2025, plus a higher $0.0054 rate for eligible U.S. verified 18+ spend in June 2026 <a class="cite-link" href="https://create.roblox.com/docs/production/monetization/developer-exchange" target="_blank" rel="noopener noreferrer">DevEx Docs ↗</a>.'
 },
 {
 key: 'rbx_r15',
 match_zh: '1. 零前置风险的供给侧井喷：',
 zh: '<strong>1. 零前置风险的供给侧井喷：</strong>平台全包全球云端服务器、联机同步、反作弊与支付清算，使小型团队能以极低试错成本跑出年入千万美元的超级爆款。<br/> <strong>2. 第一方支付渠道扩利：</strong>通过优化“购买 Robux”引导路径提升网页与礼品卡等低费率直充占比，26Q3 营收成本率同比下降 160 bps 至 20%。<br/> <strong>3. 强劲净现金安全垫：</strong>截至 26Q3 坐拥 $62 亿现金及短期/长期投资（净现金约 $52 亿），并在 2026 前三季度回购注销 1,260 万股（耗资 $5.8 亿）。',
 en: '<strong>1. Zero-Upfront-Risk Supply Explosion:</strong> Roblox absorbs global multiplayer hosting, netcode, moderation, and billing so small teams can launch $10M+ hits with minimal upfront capital.<br/> <strong>2. First-Party Payment Margin Expansion:</strong> Steering Robux top-ups toward lower-fee direct web and prepaid channels cut Q3 2026 Cost of Revenue by 160 bps YoY to 20%.<br/> <strong>3. Fortress Net Liquidity:</strong> Holds $6.2B in cash &amp; investments (~$5.2B net cash) as of Q3 2026 while retiring 12.6M shares ($580M) in 9M 2026.'
 },
 {
 key: 'rbx_r16',
 match_zh: '1. 创作者收入极度二八分化：',
 zh: '<strong>1. 创作者收入极度二八分化：</strong>尽管 Top 1,000 创作者在 FY25 均入 $130 万，但约 2.9 万名提现创作者的中位数年收入仅约 $1,440–$1,575，且约 25%–30% 的名义综合分成率低于 Fortnite UEFN 与 Steam（70%+） <a class="cite-link" href="https://generalistprogrammer.com/comparisons/fortnite-vs-roblox-creator-earnings" target="_blank" rel="noopener noreferrer">Payout Skew ↗</a>。<br/> <strong>2. 高基数回落与外部大作逆风：</strong>受 2025 下半年史诗级爆款高基数及 GTA 新作分流预期影响，管理层指引 26Q4 Bookings 同比回落 10%–15%（$18.9亿–$20.0亿），且数据中心资本开支后置致单季 FCF 短暂承压 <a class="cite-link" href="https://www.stocktitan.net/sec-filings/RBLX/8-k-roblox-corp-reports-material-event-bf64854e48ab.html" target="_blank" rel="noopener noreferrer">Q4 Guide 8-K ↗</a>。<br/> <strong>3. 未成年人合规与司法和解支出：</strong>2026 前三季度已就阿拉巴马、内华达等六州及相关辖区青少年保护调查计提 $1.40 亿和解义务，且股权激励（FY25 SBC $11.29 亿）仍带来每年约 2% 股份稀释 <a class="cite-link" href="https://www.stocktitan.net/sec-filings/RBLX/10-q-roblox-corp-quarterly-earnings-report-9d9b35a9133d.html" target="_blank" rel="noopener noreferrer">26Q3 10-Q ↗</a>。',
 en: '<strong>1. Power-Law Creator Skew &amp; Take-Rate Debate:</strong> Top 1,000 creators averaged $1.3M in FY25, yet median DevEx payout across ~29k creators is ~$1,440–$1,575/yr, and effective ~25%–30% payout trails Fortnite UEFN and Steam (70%+) <a class="cite-link" href="https://generalistprogrammer.com/comparisons/fortnite-vs-roblox-creator-earnings" target="_blank" rel="noopener noreferrer">Payout Skew ↗</a>.<br/> <strong>2. Tough Viral Comps &amp; Q4 Headwinds:</strong> Lapping 2H25 mega-hits alongside anticipated GTA competition, Q4 2026 Bookings are guided down 10%–15% YoY ($1.89B–$2.00B) with CapEx timing shifting Q4 FCF negative <a class="cite-link" href="https://www.stocktitan.net/sec-filings/RBLX/8-k-roblox-corp-reports-material-event-bf64854e48ab.html" target="_blank" rel="noopener noreferrer">Q4 Guide 8-K ↗</a>.<br/> <strong>3. State Settlements &amp; SBC Dilution:</strong> Accrued $140M in 9M 2026 state youth-safety settlements, while stock-based compensation ($1.13B in FY25) drives ~2% annual share dilution <a class="cite-link" href="https://www.stocktitan.net/sec-filings/RBLX/10-q-roblox-corp-quarterly-earnings-report-9d9b35a9133d.html" target="_blank" rel="noopener noreferrer">26Q3 10-Q ↗</a>.'
 },
 {
 key: 'rbx_r17',
 match_zh: '创始人 David Baszucki 与 Erik Cassel',
 zh: '创始人 David Baszucki 与 Erik Cassel 基于 2D 教育物理软件经验创立 Roblox（原名 DynaBlocks，2006 年正式上线），确立“所有物品遵循统一物理碰撞规则 + 玩家即创作者”底层哲学；2013 年推出 Developer Exchange (DevEx) 打通 Robux 兑现法币闭环，催生《Murder Mystery 2》（2014）与《Adopt Me!》（2017）等首批长青原生工作室 <a class="cite-link" href="https://en.wikipedia.org/wiki/List_of_Roblox_games" target="_blank" rel="noopener noreferrer">Roblox History ↗</a>。',
 en: 'Co-founders David Baszucki and Erik Cassel built Roblox (originally DynaBlocks, launched 2006) out of educational physics simulation software; launching DevEx in 2013 unlocked real-money creator livelihoods and birthed enduring hits like <em>Murder Mystery 2</em> (2014) and <em>Adopt Me!</em> (2017) <a class="cite-link" href="https://en.wikipedia.org/wiki/List_of_Roblox_games" target="_blank" rel="noopener noreferrer">Roblox History ↗</a>.'
 },
 {
 key: 'rbx_r18',
 match_zh: '2020 年《Brookhaven RP》上线并迅速登顶',
 zh: '2020 年《Brookhaven RP》上线并迅速登顶，2021 年 3 月 Roblox 在纽交所直接上市（DPO）；面对 2022 年解封后变现增速放缓与 FCF 转负（-$5,840 万），公司果断登陆 PlayStation 与 Meta Quest、推行区域差异化定价并严控固定人员成本，推动 FY2024 自由现金流飙升 417% 至 $6.41 亿 <a class="cite-link" href="https://ir.roblox.com/news/news-details/2025/Roblox-Reports-Fourth-Quarter-and-Full-Year-2024-Financial-Results/default.aspx" target="_blank" rel="noopener noreferrer">FY24 Release ↗</a>。',
 en: '<em>Brookhaven RP</em> launched in 2020 ahead of Roblox\'s March 2021 NYSE direct listing; after post-reopening FCF dipped to -$58.4M in FY22, PlayStation/Quest launches, regional pricing, and cost discipline drove FY24 FCF up +417% to $641.3M <a class="cite-link" href="https://ir.roblox.com/news/news-details/2025/Roblox-Reports-Fourth-Quarter-and-Full-Year-2024-Financial-Results/default.aspx" target="_blank" rel="noopener noreferrer">FY24 Release ↗</a>.'
 },
 {
 key: 'rbx_r19',
 match_zh: '2025 年开源 Cube 3D、RFY 算法重构引爆',
 zh: '2025 年开源 Cube 3D、RFY 算法重构引爆《Grow a Garden》与《Steal a Brainrot》历史级流量海啸；2026 年全面落地聊天年龄强制核验、上调美国 18+ DevEx 费率至 $0.0054，并发布 Roblox Build、Roblox Everywhere 与 Universal Player 三大战略，开启从“青少年沙盒”向“全人类 AI 游戏母体”的质变 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Vision ↗</a>。',
 en: 'Open-source Cube 3D and RFY discovery upgrades ignited 2025\'s historic viral surge; in 2026, global chat age-checks, the $0.0054 U.S. O18 DevEx rate, Roblox Build, Roblox Everywhere, and Universal Player set the stage for a 10% global gaming share <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Vision ↗</a>.'
 },
 {
 key: 'rbx_r20',
 match_zh: '年轻团队精准捕捉 Z 世代网络迷因审美',
 zh: '年轻团队精准捕捉 Z 世代网络迷因审美与“收集+潜入偷取+好友复仇”的高张力社交循环，仅用 4 个月上线即刷新全球单一游戏峰值 CCU 纪录（累计访问破 736 亿），证明玩法密度与社交钩子远比百亿贴图预算更具爆发力 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q4 25 Case ↗</a>。',
 en: 'Capturing Gen-Z meme culture and a high-tension "collect, raid &amp; avenge" social loop in a 4-month build, <em>Steal a Brainrot</em> shattered the single-game world CCU record (25.4M+ peak, 73.6B+ visits), proving social hooks trump bloated graphics budgets <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q4 25 Case ↗</a>.'
 },
 {
 key: 'rbx_r21',
 match_zh: '治愈系种植模拟《Grow a Garden》33 天破',
 zh: '治愈系种植模拟《Grow a Garden》33 天破 10 亿访问、峰值超 2,130 万同时在线，倒逼 Roblox 自建核心数据中心与边缘节点承受住 4,730 万全网并发洪峰，验证了其分布式云基础设施的护城河深度 <a class="cite-link" href="https://www.pocketgamer.biz/robloxs-grow-a-garden-hits-industry-record-213m-concurrent-users-surpassing-pubg-fortnite-and-more/" target="_blank" rel="noopener noreferrer">21.3M Peak ↗</a>。',
 en: 'Cozy farming hit <em>Grow a Garden</em> reached 1B visits in 33 days and 21.3M+ peak CCU, stress-testing Roblox\'s hybrid core and edge data centers through a 47.3M platform-wide concurrency peak <a class="cite-link" href="https://www.pocketgamer.biz/robloxs-grow-a-garden-hits-industry-record-213m-concurrent-users-surpassing-pubg-fortnite-and-more/" target="_blank" rel="noopener noreferrer">21.3M Peak ↗</a>.'
 },
 {
 key: 'rbx_r22',
 match_zh: '从 GDC 2025 开源 Cube 3D 到 2026 推出',
 zh: '从 GDC 2025 开源 Cube 3D 到 2026 推出 4D 可交互物体生成与手机端自然语言建游工具 Build（75% 内测用户零 Studio 经验），并在 26Q3 跑出两款纯 AI 构建的 Top 20 热门游戏，彻底改写 UGC 供给曲线 <a class="cite-link" href="https://about.roblox.com/newsroom/2025/03/introducing-roblox-cube" target="_blank" rel="noopener noreferrer">Roblox Cube ↗</a>。',
 en: 'From open-sourcing Cube 3D at GDC 2025 to launching interactive 4D generation and mobile prompt-to-game tool Build (75%+ first-time creators) with two AI-built Top 20 CCU hits in Q3 2026, Roblox compressed creation friction dramatically <a class="cite-link" href="https://about.roblox.com/newsroom/2025/03/introducing-roblox-cube" target="_blank" rel="noopener noreferrer">Roblox Cube ↗</a>.'
 },
 {
 key: 'rbx_r23',
 match_zh: '主动承受中个位数时长增速摩擦',
 zh: '主动承受中个位数时长增速摩擦，在全球强制推行聊天年龄核验与分龄匹配（64% DAU 已核验），不仅构筑儿童保护行业金标准，更凭精准认证年龄解锁了品牌广告主与美国 O18 高净值客群精细化运营 <a class="cite-link" href="https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age" target="_blank" rel="noopener noreferrer">Age Verification ↗</a>。',
 en: 'Accepting mid-single-digit near-term engagement friction to mandate global chat age-checks (64% DAU verified) established gold-standard safety while unlocking verified demographic targeting for advertisers and high-ARPU O18 games <a class="cite-link" href="https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age" target="_blank" rel="noopener noreferrer">Age Verification ↗</a>.'
 }
 ];

 var I18N_TEXT_PAIRS = [
 ['数据中心', 'Research Hub'],
 ['Roblox 游戏与 UGC 生态深度研报', 'Roblox Game & UGC Ecosystem Report'],
 ['Roblox 游戏生态研报', 'Roblox Ecosystem Monograph'],
 ['社交图谱即时分发 × Robux 与 $15亿 DevEx 创作者飞轮 × Cube 4D 与 Build AI 原生创作引擎', 'Social Graph Distribution × $1.5B DevEx Flywheel × Cube 4D & Build AI Engine'],
 ['26Q3 DAU / 峰值在线', '26Q3 DAU / Peak CCU'],
 ['1.38亿 · 4,730万', '138M · 47.3M Peak'],
 ['FY25 预订额 / FCF', 'FY25 Bookings / FCF'],
 ['FY25 分成 / 13+占比', 'FY25 DevEx / 13+ Mix'],
 ['$1.50B · 66% 核验', '$1.50B · 66% Verified'],
 ['站点与关联导航', 'Site & Related Nav'],
 ['返回数据中心首页', 'Back to Research Hub'],
 ['Roblox 投资者关系与季报库', 'Roblox IR & Filings Hub'],
 ['核心研究章节 (00 – 07)', 'Report Chapters (00 – 07)'],
 ['执行摘要与核心指标', 'Executive Summary & KPIs'],
 ['垂直技术栈与爆款游戏矩阵', 'Vertical Stack & Hit Games'],
 ['四大飞轮支柱与 AI 护城河', '4 Flywheel Pillars & AI Moat'],
 ['全球游戏与 UGC 平台对比', 'Global UGC Platform Matrix'],
 ['虚拟经济漏斗与收益测算器', 'Robux Funnel & DevEx Sim'],
 ['三代演进与现象级战役复盘', '3-Era Evolution & Case Studies'],
 ['爆款游戏与生态核查清单', 'Hit Game & Ecosystem Checklist'],
 ['数据来源与财报核验索引', 'Primary Filings & Sources'],
 ['阅读与导出工具', 'Reading & Export Tools'],
 ['浅色外观', 'Light'],
 ['深色外观', 'Dark'],
 ['导出 HTML', 'Export HTML'],
 ['打印 / PDF', 'Print / PDF'],
 ['生态定评：全球游戏的“YouTube + 云端社交操作系统”', 'Verdict: The "YouTube + Cloud Social OS" of Global Gaming'],
 ['研究横跨：物理沙盒奠基 (2004–2019) · 病毒爆款井喷 (2025) · AI 原生与全龄破圈 (2026 Q3+)', 'Scope: Physics Sandbox Roots (2004–19) · Viral Surge (2025) · AI & O18 Expansion (Q3 2026+)'],
 ['数据基准：FY2025 10-K / 2026 Q3', 'Baseline: FY2025 10-K / Q3 2026'],
 ['CORE THESIS · 社交图谱即时分发 × 零边际服务器托管 × Robux/DevEx 飞轮 × Cube 4D 与 Build AI 革命', 'CORE THESIS · Social Graph Distribution × Zero-Ops Cloud Hosting × Robux/DevEx Flywheel × Cube 4D & Build AI'],
 ['零摩擦试错与病毒式社交裂变', 'Zero-Friction Prototyping & Viral Social Loops'],
 ['创作者无需承担前置服务器费用与买量成本，依托好友同玩关系链与 Recommended for You (RFY) 个性化推荐，人均每月体验超 24 款不同游戏，新游可在数周内引爆千万级同时在线。', 'Creators pay $0 upfront for multiplayer hosting or user acquisition; friend co-play invites and Recommended for You (RFY) discovery (>24 unique games played/user/mo) scale hits to 10M+ CCU in weeks.'],
 ['AI 原生创作奇点 (Cube 4D & Build)', 'AI-Native Creation Singularity (Cube 4D & Build)'],
 ['依托 20 年人类交互与每日超 3.5 亿小时空间遥测数据训练近 400 个模型；开源 Cube 3D/4D 交互生成模型与自然语言工具 Build，让超 75% 从未打开过 Studio 的新手也能直接建游。', 'Trained on 20 years of play and 350M+ daily hours of spatial telemetry across ~400 models; Cube 3D/4D and mobile prompt-to-game tool Build empower >75% first-time non-Studio creators.'],
 ['全龄破圈 (O18) 与多元变现进化', 'O18 Adult Expansion & Multi-Rail Monetization'],
 ['64% 全球 DAU 已完成强制聊天年龄核验，其中 13 岁以上占 66%、18 岁以上（O18）全球占 29%（美国达 37%，单客变现比未成年高 50%+），叠加 DevEx 提价、Roblox Plus 与激励视频广告共驱飞轮。', '64% of global DAUs are age-checked (66% aged 13+, 29% global O18, 37% U.S. O18 monetizing 50%+ higher), amplified by higher DevEx rates, Roblox Plus, and Rewarded Video ads.'],
 ['日活规模与全平台峰值 (26Q3)', 'Active Scale & Peak CCU (26Q3)'],
 ['47.3M 峰值 CCU', '47.3M Peak CCU'],
 ['全年预订额与自由现金流 (FY25)', 'Annual Bookings & FCF (FY25)'],
 ['创作者分成池规模 (DevEx)', 'Creator Payout Pool (DevEx)'],
 ['费率上调 +8.5%', 'Rate Hiked +8.5%'],
 ['年龄核验 13+ 占比与成人溢价', 'Verified 13+ Share & O18 Lift'],
 ['美国 O18 占 37%', 'U.S. O18 37%'],
 ['一、垂直整合技术栈与爆款游戏矩阵：为什么千万在线神作频频诞生于 Roblox？', '1. Vertically Integrated Stack & Hit Game Matrix: Why Do 10M+ CCU Hits Emerge on Roblox?'],
 ['前端四大游戏品类百花齐放（常青社交 / 病毒放置 / 硬核竞技 / 时尚与 AI 原生） × 后端云引擎与推荐网络统一托底', 'Four Front-End Hit Archetypes (Social RP / Viral Loops / Core RPG-Shooter / Fashion & AI-Native) × Unified Cloud Engine'],
 ['Top 10 时长集中度降至 ~20% · 长尾繁荣', 'Top 10 Hours Share Down to ~20% · Healthy Tail'],
 ['Roblox 垂直整合云游戏操作系统中枢（San Mateo, CA · 客户端秒级直连 / 混合云推理 / 全球统一虚拟经济）', 'Roblox Vertically Integrated Cloud Gaming OS Hub (San Mateo, CA · Instant Join / Hybrid AI Cloud / Unified Economy)'],
 ['三大下一代战略支柱：Roblox App + AI 加速创作 × Roblox Everywhere 跨商店独立发行 × The Universal Player 外部游戏一键上云', 'Three Next-Gen Initiatives: Roblox App + AI Acceleration × Roblox Everywhere Standalone Publishing × The Universal Player'],
 ['EVERGREEN RP · 常青社交基本盘', 'EVERGREEN RP · SOCIAL ANCHORS'],
 ['《Brookhaven》累计访问超 879 亿次居历史第一；《Adopt Me!》宠物交易与社交扮演构成高留存底盘。', 'Brookhaven RP leads all-time with 87.9B+ visits; Adopt Me! pet trading and social roleplay anchor multi-year retention.'],
 ['VIRAL LOOPS · 病毒式轻休闲爆款', 'VIRAL LOOPS · BREAKOUT PHENOMENA'],
 ['极致社交博弈与离线成长循环，分别创下 2,540 万+ 与 2,130 万+ 单游戏峰值同时在线行业纪录。', 'High-tension social raiding & cozy offline loops set industry records of 25.4M+ and 21.3M+ single-game peak CCU.'],
 ['NOVEL & CORE · 中重度竞技与恐怖', 'NOVEL & CORE · RPG, HORROR & FPS'],
 ['《Blox Fruits》超 646 亿访问；《99 Nights in the Forest》与射击大作《RIVALS》强力拉动 O18 成人留存。', 'Blox Fruits tops 64.6B visits; 99 Nights in the Forest and competitive FPS RIVALS propel O18 adult engagement.'],
 ['FASHION & AI-NATIVE · 时尚与 AI 新游', 'FASHION & AI-NATIVE · NEW GENRES'],
 ['《Dress To Impress》携手 Lady Gaga 破圈时尚秀场；纯 AI 构建游戏《Break and Steal an Egg》杀入在线前 20。', 'Dress To Impress partnered with Lady Gaga; AI-built Break and Steal an Egg cracked Roblox Top 20 CCU.'],
 ['Roblox Studio + Cube 4D + Build 创作与引擎底座', 'Roblox Studio + Cube 4D + Build Creation & Runtime Engine'],
 ['内置 Luau 脚本、SLIM 轻量模型、Server Authority 反作弊同步、动态纹理流式加载及 MCP 外部 AI 接入协议。', 'Unites Luau scripting, SLIM lightweight models, Server Authority netcode, dynamic texture streaming, and MCP AI harnesses.'],
 ['RFY 个性化推荐 + Moments 短视频直连 + RM3 安全护栏', 'RFY Personalized Discovery + Moments Feed + RM3 Safety Backbone'],
 ['每周 RFY 曝光前 100 游戏中约 40% 诞生于近 3 个月；Moments 视频一键入局；RM3 实时多模态场景审核护航。', '~40% of weekly RFY Top 100 games launched in the last 90 days; one-tap join from Moments videos; RM3 real-time scene safety.'],
 ['1. “一键跨端发布”消灭多平台适配壁垒', '1. Build Once, Run Everywhere Across Mobile, Console, PC & Web'],
 ['2. 算法去中心化激活“腰部与长尾”内容', '2. Discovery Algorithmic Decentralization Fuels the Torso & Tail'],
 ['3. Server Authority 赋能高拟真“Novel 新形态游戏”', '3. Server Authority Unlocks High-Fidelity "Novel" Adult Genres'],
 ['里程碑', 'MILESTONE'],
 ['视图A: 季度 DAU 与参与时长', 'View A: Quarterly DAU & Hours'],
 ['视图B: 殿堂级游戏访问与峰值', 'View B: Top Games Visits & CCU'],
 ['社交沙盒与数字第三空间（Brookhaven RP & Adopt Me!）', 'Social Sandboxes & Digital Third Places (Brookhaven RP & Adopt Me!)'],
 ['879亿+ 历史访问', '87.9B+ Visits'],
 ['核心变现并非强制数值付费，而是高复购的通行证（Game Passes，如高级住宅包、专属载具权限、VIP 身份铭牌）与限时节日稀有宠物蛋，单服熟人社交关系极大延长了用户 27 个月以上的付费生命周期。', 'Monetizes via high-margin Game Passes (premium estates, vehicle packs, VIP status badges) and seasonal rare pet drops rather than pay-to-win walls—sustaining a 27-month average paying user lifetime.'],
 ['高频多巴胺与社交劫掠裂变（Steal a Brainrot & Grow a Garden）', 'Viral Dopamine & Social Raiding Loops (Steal a Brainrot & Grow a Garden)'],
 ['2,540万+ 峰值 CCU', '25.4M+ Peak CCU'],
 ['通过“开发者全服在线发放稀有变异事件（Admin Events）”制造定时狂欢峰值，配合低客单价保护护盾、加速孵化道具及私人服务器（Private Servers）订阅，在极短研发周期内撬动数千万级自然裂变流量。', 'Scheduled live developer "Admin Abuse / Mutation Events" trigger massive synchronized concurrency spikes, converting players via low-ticket shields, speedups, and recurring Private Server subscriptions.'],
 ['长线数值 RPG 与硬核协作生存（Blox Fruits / 99 Nights / RIVALS）', 'Deep Progression RPGs & Co-Op Survival (Blox Fruits / 99 Nights / RIVALS)'],
 ['高 ARPU 核心引擎', 'High-ARPU Core'],
 ['中重度品类拥有全平台最高的单小时预订额（Bookings/Hour）：永久果实切换权、储物格扩容、赛季战斗通行证与高溢价武器皮肤驱动重度玩家高频复购，叠加美国 18+ 认证玩家 0.0054 美元/Robux 的高阶 DevEx 激励，吸引专业工作室涌入。', 'Delivers top-tier Bookings per Hour through permanent ability unlocks, inventory expansions, battle passes, and weapon skins—amplified by the $0.0054/Robux DevEx tier on verified U.S. 18+ spend.'],
 ['审美竞技、品牌跨界与 AI 原生新物种（Dress To Impress & Build）', 'Competitive Fashion, Brand Collabs & AI-Native Hits (Dress To Impress & Build)'],
 ['>70,000 款 Build 新游', '>70,000 Build Games'],
 ['打通“游戏内 VIP 高定衣橱 + 平台通用 Avatar 虚拟形象商城 + Moments 短视频同款直购 + 品牌赞助秀场”四重变现闭环，验证了 Roblox 在非战斗类审美社交与 AI 极速原型创作上的独特生态位。', 'Combines VIP runway wardrobes, cross-platform Avatar Marketplace items, direct Moments video shopping, and sponsored celebrity events—proving massive demand beyond combat genres.'],
 ['二、四大平台护城河支柱：社交分发、AI 创作引擎、多模态安全与跨端破圈', '2. Four Platform Moat Pillars: Social Discovery, AI Creation, Multimodal Safety & O18 Scale'],
 ['点击左侧任一护城河支柱卡片，联动查看底层技术细节与全球三大沙盒/UGC 平台五维竞争力雷达图', 'Click any pillar card on the left to inspect technical architecture and highlight the 5-axis UGC platform radar'],
 ['护城河定性：极宽 (Wide Moat · 1.38亿日活社交关系链 + 20年4D空间遥测数据)', 'Moat Rating: Wide Moat (138M Daily Social Graph + 20-Yr 4D Spatial Telemetry)'],
 ['01 · 社交图谱与智能发现飞轮（Social Graph & RFY）', '01 · Social Graph & Personalized Discovery (RFY)'],
 ['日均 16亿条聊天', '1.6B Daily Chats'],
 ['当 AI 让游戏供给呈指数级爆发时，稀缺资源从“内容制作”转向“注意力分发”。Roblox 依托真实好友同玩关系链、年龄分层 RFY 算法与 Moments 短视频流，让新游无需天价买量即可秒级冷启动。', 'As AI makes game creation abundant, distribution and attention become the scarce moat. Co-play friend graphs, age-weighted RFY algorithms, and Moments feeds cold-start hits organically.'],
 ['02 · 4D 空间数据与 AI 原生创作栈（Cube & Build）', '02 · 4D Spatial Telemetry & AI Creation Stack (Cube & Build)'],
 ['~400 个在役模型', '~400 Live AI Models'],
 ['沉淀超 20 年玩法记录与日均 3.5 亿+ 小时人类交互 4D 帧级数据（DMR 平台），自托管模型承接 77% 推理请求；开源 Cube 3D/4D 交互生成、Studio Assistant 与 MCP 接口使 97% 受访创作者显著提速。', 'Backed by 20+ years of gameplay and 350M+ daily hours of frame-level 4D telemetry (77% self-hosted inference); Cube 4D, Studio Assistant, and MCP speed up 97% of surveyed AI-using creators.'],
 ['03 · 强制年龄核验与实时多模态安全（RM3 & Sentinel）', '03 · Mandatory Age-Checks & Multimodal Safety (RM3 & Sentinel)'],
 ['64% DAU 已核验', '64% DAU Verified'],
 ['完成全球聊天强制面部年龄估算或证件核验（美英渗透率达 75%、澳洲达 80%），开源语音与儿童保护模型 Sentinel/Guard，并上线 RM3 实时多模态全场景审核与 BAM 违规穿搭拦截系统。', 'Rolled out global age-checks for chat (75% US/UK, 80% Australia), open-sourced Sentinel/Guard safety models, and deployed RM3 real-time 3D scene moderation and BAM avatar scanning.'],
 ['04 · Universal Player 与全龄跨端扩张（O18 & Web Play）', '04 · Universal Player & Cross-Platform O18 Expansion'],
 ['美国 18–34岁 +26%', 'U.S. 18–34 +26% YoY'],
 ['推进 Roblox Everywhere（赋能创作者向外部应用商店独立发行）与 Universal Player（AI 辅助外部主机/PC 游戏一键迁移上云），叠加 2027H1 拟内测的写实级 Roblox Reality 世界模型，全面抢占成人游戏时长。', 'Advances Roblox Everywhere (standalone app-store publishing), Universal Player (AI cloud import for external PC/console games), WebAssembly instant links, and photorealistic Roblox Reality (1H27).'],
 ['全球核心 UGC 游戏平台五维竞争力对比雷达图（10分制标杆评估）', '5-Axis Global UGC Gaming Platform Benchmark Radar (10-Point Scale)'],
 ['点击下方图例胶囊可单独开关对比曲线，悬停顶点查看各维度评分明细', 'Click legend pills below to toggle platform curves; hover vertices for exact scores'],
 ['Roblox (全栈社交 UGC 标杆)', 'Roblox (Full-Stack Social UGC Leader)'],
 ['Fortnite / UEFN (高画质高分成)', 'Fortnite / UEFN (AAA Fidelity & Share)'],
 ['Minecraft (买断制体素沙盒常青树)', 'Minecraft (Buy-to-Play Voxel Classic)'],
 ['三、全球顶级游戏与 UGC 平台横向对比：规模网络效应 vs 单笔分成率之争', '3. Global Gaming & UGC Platform Matrix: Audience Scale vs. Per-Dollar Take Rate'],
 ['支持按平台名称、母公司、代表生态（UEFN / Steam / Minecraft / Unity）或分成模式实时检索筛选', 'Filter or search in real time by platform, owner, engine (UEFN / Studio / Steam / Unity), or payout model'],
 ['全部标杆平台', 'All Platforms'],
 ['原生 UGC 与沙盒社区', 'Native UGC & Sandboxes'],
 ['传统分发商店与第三方引擎', 'Storefronts & Game Engines'],
 ['平台与核心主体', 'Platform & Parent'],
 ['生态定位与分发机制', 'Positioning & Distribution'],
 ['引擎工具与 AI 创作能力', 'Engine & AI Tooling'],
 ['用户体量与峰值并发', 'Audience & Peak CCU'],
 ['创作者分成与变现效率', 'Creator Payout & Economics'],
 ['与 Roblox 游戏生态的优劣势深度对比', 'Comparative Assessment vs. Roblox'],
 ['Roblox 平台经济分配（占 Bookings 比例）vs 全球已核验玩家年龄结构拆解（%）', 'Roblox Bookings Cost Allocation vs. Verified Global Player Age Cohort Mix (%)'],
 ['数据来源：Roblox 2026 Q3 股东信（成本与 DevEx 占 Bookings 比重，及截至 2026-09-30 全球已核验年龄 DAU 分布 34% + 37% + 29% = 100%）', 'Source: Roblox Q3 2026 Shareholder Letter (% of Bookings cost structure & verified global DAU age mix: 34% + 37% + 29% = 100%)'],
 ['DevEx 占 Bookings 24% · 13+ 玩家合计 66%', 'DevEx 24% of Bookings · 66% Aged 13+'],
 ['蓝色/绿色：2026 Q3 核心运营投入与创作者分成占 Bookings 比例', 'Blue / Green: Q3 2026 Core Operating & DevEx Share of Bookings'],
 ['紫色/琥珀色：2026 Q3 全球已核验玩家三大年龄段构成 (合计 100%)', 'Purple / Amber: Q3 2026 Verified Global DAU Age Cohorts (100% total)'],
 ['四、Robux 虚拟经济漏斗与工作室收益测算器：拆解“账面亏损、现金暴赚”与分成真相', '4. Robux Economic Funnel & Studio Payout Simulator: Deferred GAAP vs. Cash Flow Reality'],
 ['理解 27 个月递延收入准则下的自由现金流爆发力，以及 0.0038 / 0.0054 双轨 DevEx 汇率对工作室商业模型的重塑', 'Unpacking 27-month GAAP revenue deferral, free cash flow leverage, and dual $0.0038 / $0.0054 DevEx creator rates'],
 ['26Q3 净现金储备 ~$5.2B · 剩余回购额度 $2.4B', '26Q3 Net Cash ~$5.2B · $2.4B Buyback Left'],
 ['GAAP 递延确认周期', 'GAAP DEFERRAL WINDOW'],
 ['27 个月', '27 Months'],
 ['(递延池 $7.04B)', '($7.04B Deferred)'],
 ['玩家充值 Robux 当期全额计入现金流与 Bookings，但 GAAP 营收按 27 个月分摊，造就“表观亏损、现金丰沛”剪刀差。', 'Robux sales generate immediate Bookings and cash flow, while GAAP revenue amortizes over 27 months—creating high FCF alongside accounting net losses.'],
 ['标准与 O18 提现汇率', 'STANDARD & O18 DEVEX'],
 ['ROBLOX PLUS 订阅乘数', 'ROBLOX PLUS MULTIPLIER'],
 ['7.0x 消费', '7.0x Spend'],
 ['(2.0x 时长)', '(2.0x Playtime)'],
 ['2026 年 4 月推出的 Roblox Plus 已突破数百万活跃订户，订户人均游戏时长达非订户 2 倍、Robux 消费高达 7 倍。', 'Launched in April 2026, Roblox Plus scaled to millions of subscribers averaging 2x playtime and 7x Robux spend vs. non-subscribers.'],
 ['激励视频与原生广告', 'REWARDED VIDEO & ADS'],
 ['>90% 完播', '>90% Completion'],
 ['(95% 可视)', '(95% Viewability)'],
 ['超 1,000 家品牌接入激励视频广告；26Q3 超 20% 启用激励视频的游戏已有 10%+ 游戏内收入来自广告变现。', '1,000+ brands adopted Rewarded Video; in Q3 2026, >20% of games using rewarded video earned >10% of in-game revenue from ads.'],
 ['FY2022–FY2026E 规模与现金流跃迁：全年预订额 Bookings ($B) 与自由现金流 FCF ($B)', 'FY2022–FY2026E Scale & Cash Inflection: Annual Bookings ($B) & Free Cash Flow ($B)'],
 ['柱状图（左轴）为全年 Bookings 预订额；折线（右轴）为全年自由现金流 FCF（FY26E 基于前三季度实绩 + Q4 官方指引中值测算）', 'Bars (left axis): Annual Bookings ($B); Line (right axis): Annual Free Cash Flow ($B; FY26E combines 9M26 actuals + Q4 guidance midpoint)'],
 ['■ 左轴：全年预订额 Bookings ($B)', '■ Left Axis: Annual Bookings ($B)'],
 ['● 右轴：全年自由现金流 Free Cash Flow ($B)', '● Right Axis: Annual Free Cash Flow ($B)'],
 ['全年预订额 Bookings (左轴 · $B)', 'Annual Bookings (Left · $B)'],
 ['全年自由现金流 FCF (右轴 · $B)', 'Annual Free Cash Flow (Right · $B)'],
 ['--- $1.0B 年度自由现金流里程碑线', '--- $1.0B Annual Free Cash Flow Milestone'],
 ['Roblox 游戏工作室变现与 DevEx 净分成测算器', 'Roblox Game Studio Unit Economics & DevEx Payout Simulator'],
 ['启用激励视频广告 + Roblox Plus 订户红利 (+15%)', 'Enable Rewarded Video Ads + Roblox Plus Lift (+15%)'],
 ['叠加非付费玩家激励视频变现与 Creator Rewards 留存奖金池', 'Adds incremental ad monetization and Creator Rewards retention bonuses'],
 ['① 中重度常青 RPG / 竞技工作室模型', '① Evergreen Mid-Core RPG / Shooter Studio'],
 ['1.5万 CCU · $0.09', '15k CCU · $0.09'],
 ['② 病毒式社交放置头部爆款模型', '② Viral Social / Idle Mega-Hit Model'],
 ['8.0万 CCU · $0.06', '80k CCU · $0.06'],
 ['③ 美国高占比 18+ 成人向精品新游', '③ U.S. 18+ High-ARPU Novel Genre Hit'],
 ['5,000 CCU · 65% O18', '5k CCU · 65% O18'],
 ['游戏平均同时在线人数 (Avg. CCU)', 'Average Concurrent Players (Avg. CCU)'],
 ['估算日活单客总流水 (Gross ARPDAU $)', 'Gross Player Spend per DAU (ARPDAU $)'],
 ['美国已核验 18+ 付费流水占比 (享 $0.0054 汇率)', 'U.S. Verified 18+ Spend Share ($0.0054 Rate)'],
 ['工作室全年预计净提现 (Annual DevEx)', 'Projected Annual Studio DevEx (USD)'],
 ['加权提现汇率 / 综合实际到手率', 'Blended DevEx Rate / Effective Share'],
 ['月均入账 Earned Robux (扣 30% 税后)', 'Monthly Earned Robux (Net of 30% Fee)'],
 ['较旧版单一费率 ($0.0035) 年增收', 'Annual Gain vs. Legacy $0.0035 Baseline'],
 ['━ 当前设定 12 个月累计净到手美元', '━ 12-Month Cumulative Studio Payout (Active)'],
 ['- - 2025.09 提价前旧基准 ($0.0035 无加成)', '- - Pre-Sept 2025 Legacy Baseline ($0.0035 Ex-Ads)'],
 ['测算模型说明：按行业日均周转率（DAU ≈ 12 × 平均 CCU）、标准充值 $1 ≈ 100 Robux、交易内创作者留存 70% Earned Robux 及官方双轨汇率（$0.0038 标准 / $0.0054 美国 O18）精确推演。悬停曲线可逐月对比收益差额。', 'Model assumptions: DAU ≈ 12 × Avg CCU daily turnover, $1 gross ≈ 100 Robux, 70% in-experience creator cut, and official dual DevEx rates ($0.0038 standard / $0.0054 U.S. verified 18+). Hover curve for monthly breakdown.'],
 ['正向商业模式与平台护城河定评', 'Enduring Platform Moat & Cash Strengths'],
 ['客观商业张力与潜在风险反思', 'Structural Tensions & Risk Factors'],
 ['五、二十年三代演进与现象级战役复盘：从物理教学引擎到 10% 全球游戏市场野望', '5. Twenty-Year Evolution & Landmark Case Studies: Toward 10% of Global Gaming'],
 ['纵览创始人 David Baszucki 长达二十年的基础设施耐心投入与关键生态跃迁节点', 'Tracing founder David Baszucki\'s two-decade infrastructure compounding and viral inflection points'],
 ['2006 正式上线 → 2026 二十周年 (1.38亿 DAU)', '2006 Launch → 2026 20th Anniversary (138M DAU)'],
 ['第一幕 · 物理模拟基因与双边飞轮奠基 (2004–2019) —— 从 Interactive Physics 到 DevEx 诞生', 'Act I · Physics Sandbox DNA & Flywheel Genesis (2004–2019) — Launching DevEx'],
 ['2013 推出 DevEx 现金提现', '2013 DevEx Launched'],
 ['第二幕 · 全球破圈、纽交所上市与基建淬炼 (2020–2024) —— 跨越疫情红利消退期', 'Act II · Mainstream Breakout, Direct Listing & Operating Leverage (2020–2024)'],
 ['第三幕 · 病毒爆款奇点、AI 原生建游与全龄跃迁 (2025–2026+) —— 冲刺全球游戏市场 10% 份额', 'Act III · Viral CCU Records, AI Creation & O18 Expansion (2025–2026+)'],
 ['战役 01 · 2025.09', 'Case 01 · Sept 2025'],
 ['敏捷开发天花板', 'Agile Hit Velocity'],
 ['《Steal a Brainrot》4个月研发引爆 2,540 万同时在线', 'Steal a Brainrot Hits 25.4M Peak CCU After a 4-Month Build'],
 ['战役 02 · 2025.03–08', 'Case 02 · Mar–Aug 2025'],
 ['底层弹性极限大考', 'Cloud Scale Stress-Test'],
 ['《Grow a Garden》助推全平台 4,730 万并发超越 Steam', 'Grow a Garden Propels Platform to 47.3M Peak CCU Past Steam'],
 ['战役 03 · 2025.03–2026Q3', 'Case 03 · 2025–Q3 2026'],
 ['创作范式革命', 'AI Creation Shift'],
 ['Cube 4D 与自然语言工具 Build 打破技术垄断', 'Cube 4D & Prompt-to-Game Tool Build Democratize Creation'],
 ['战役 04 · 2025Q4–2026Q3', 'Case 04 · Q4 25–Q3 26'],
 ['主动阵痛换长治久安', 'Trust & Ad Unlock'],
 ['全球聊天强制年龄核验：以短期摩擦换取信任与广告溢价', 'Global Mandatory Age-Checks: Trading Short-Term Friction for Long-Term Trust'],
 ['铁律一：', 'Law 01:'],
 ['在 AI 令 3D 资产与代码成本趋近于零的时代，“自带 1.38 亿日活熟人社交图谱的即时分发网络”才是真正的游戏霸权。', 'As AI drives 3D asset and coding costs toward zero, instant distribution across a 138M-DAU social graph becomes the ultimate gaming moat.'],
 ['铁律二：', 'Law 02:'],
 ['Roblox 爆款的第一性原理不是照片级画质，而是“30秒秒进同服 + 高频全服事件共鸣 + 可炫耀的社交身份货币”。', 'Roblox hits win not on photorealism alone, but on sub-30-second friend joins, synchronized server events, and expressive social status items.'],
 ['铁律三：', 'Law 03:'],
 ['安全与年龄分层（RM3 + Age-Check）并非单纯合规成本，而是同时守住青少年基本盘与解锁成人高 ARPU 品类的战略支点。', 'Multimodal safety and verified age bands (RM3 + Age-Check) simultaneously protect youth and unlock high-ARPU O18 genres and brand ads.'],
 ['六、“Roblox 爆款方法论与平台健康度”六维交互核查清单', '6. Interactive "Roblox Hit Design & Ecosystem Health" 6-Point Diagnostic Checklist'],
 ['适用于游戏开发者立项自测与投资者跟踪 Roblox 生态飞轮成色（勾选进度自动保存在浏览器本地）', 'For game studios evaluating hit mechanics and analysts tracking Roblox flywheel health (saved locally)'],
 ['全部勾选', 'Check All'],
 ['重置清单', 'Reset'],
 ['数据来源与一手财报/开发者文档核验索引（SEC EDGAR & Official Docs）', 'Primary SEC Filings, Shareholder Letters & Creator Documentation Index'],
 ['本研报所有运营数据、财务报表、游戏访问/并发峰值、AI 模型进展与创作者分成规则均严格核验自美国证监会（SEC EDGAR）、Roblox 投资者关系股东信、Roblox Creator Hub 官方文档及权威行业统计报告，仅供游戏产品研发与商业模式研究参考，不构成任何投资建议。', 'All operational KPIs, financial statements, game visit/CCU records, AI benchmarks, and DevEx payout rules are verified directly against U.S. SEC EDGAR filings, Roblox Shareholder Letters, official Roblox Creator Hub docs, and industry research. For product and business analysis only; not investment advice.']
 ];

 var I18N_ATTR_PAIRS = [
 ['展开/收起章节目录', 'Toggle Chapter Sidebar'],
 ['切换目录侧边栏', 'Toggle Chapter Sidebar'],
 ['面包屑导航', 'Breadcrumb Navigation'],
 ['检索章节或指标…', 'Jump to chapter or KPI…'],
 ['快速跳转章节或指标', 'Quick jump to chapter or metric'],
 ['研究章节目录与站点导航', 'Report Chapters & Site Navigation'],
 ['站点导航与章节目录', 'Site Links & Table of Contents'],
 ['外观模式切换', 'Appearance Theme Switch'],
 ['阅读与导出工具', 'Reading & Export Tools'],
 ['导出独立 HTML 文件 (.html)', 'Export Standalone HTML File (.html)'],
 ['打印或导出 PDF 研报', 'Print or Save Report as PDF'],
 ['第一章图表视图切换', 'Chapter 01 Chart View Switch'],
 ['搜索平台、引擎 (UEFN / Studio / Steam) 或分成机制…', 'Search platform, engine (UEFN / Studio / Steam) or payout…'],
 ['筛选对比平台', 'Filter benchmark platforms'],
 ['标杆平台分类筛选', 'Platform category filter'],
 ['全球顶级游戏与UGC创作平台横向对比表', 'Global Gaming & UGC Platform Comparison Table'],
 ['典型Roblox游戏商业模型预设', 'Roblox Game Studio Archetype Presets'],
 ['核查完成度进度条', 'Checklist Completion Progress']
 ];

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 社交图谱与智能发现）：</strong>2026 Q3 发送聊天或连接语音的活跃用户环比激增 24%（达平台总 DAU 增速两倍），且每周 RFY 首页推荐曝光 Top 100 游戏中约 40% 为近三个月内诞生的新作 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Discovery ↗</a>。',
 '<strong>当前选中支柱解读（02 4D 空间数据与 AI 原生创作栈）：</strong>每日资产上传量环比翻三倍，使用 Studio MCP 连接器的每日活跃创作者激增近 5 倍，AI 驱动开发的游戏发布量在 26Q3 环比增长超 50% <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 AI ↗</a>。',
 '<strong>当前选中支柱解读（03 强制年龄核验与实时多模态安全）：</strong>截至 2026 年 9 月底全球 64% DAU（其中 13–17 岁群体超 80%）已完成年龄核验，RM3 系统实现头像、文本、动作与 3D 场景的实时全上下文安全拦截 <a class="cite-link" href="https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age" target="_blank" rel="noopener noreferrer">Safety &amp; Age-Check ↗</a>。',
 '<strong>当前选中支柱解读（04 Universal Player 与全龄跨端扩张）：</strong>2026 年暑期面向 18+ 客群投放逾 200 场获客活动，美国 18–34 岁 DAU 同比增长 26%（两年期暴增 114%），日本（+33%）与印度（+37%）领跑国际扩张 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">O18 &amp; Global ↗</a>。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Social Graph &amp; RFY Discovery):</strong> In Q3 2026, DAUs sending chat or voice messages surged +24% QoQ (double platform DAU growth), while ~40% of weekly RFY Top 100 games by impressions were created within the last 3 months <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 Discovery ↗</a>.',
 '<strong>Selected Pillar (02 · 4D Spatial Data &amp; AI Creation Stack):</strong> Daily cloud asset uploads tripled MoM, daily Studio MCP users jumped nearly 5x, and published AI-assisted game volume grew >50% QoQ in Q3 2026 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3 2026 AI ↗</a>.',
 '<strong>Selected Pillar (03 · Mandatory Age-Checks &amp; RM3 Safety):</strong> 64% of global DAUs (>80% of ages 13–17) completed age checks by Sept 30, 2026, paired with RM3 real-time multimodal scene moderation and BAM avatar scanning <a class="cite-link" href="https://about.roblox.com/newsroom/2026/02/moving-beyond-self-reported-age" target="_blank" rel="noopener noreferrer">Safety &amp; Age-Check ↗</a>.',
 '<strong>Selected Pillar (04 · Universal Player &amp; O18 Expansion):</strong> Over 200 summer O18 UA campaigns helped U.S. 18–34 DAUs grow +26% YoY (+114% 2-yr), while India (+37% YoY) and Japan (+33% YoY) led international gains <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">O18 &amp; Global ↗</a>.'
 ];

 var PEER_ROWS = [
 {
 category: 'dividend',
 benchmark: true,
 company: '研究基准：Roblox (NYSE: RBLX)',
 leader: 'David Baszucki · 全栈云端 UGC 平台',
 positioning: '社交图谱驱动的全品类免费即玩（F2P）云端游戏社区，覆盖低端手机至主机/网页全终端',
 culture: 'Roblox Studio (Luau) + 开源 Cube 3D/4D + 自然语言工具 Build + MCP 接口',
 headcount: '1.38亿 DAU (26Q3) · 峰值 4,730万 CCU',
 margins: 'FY25 分成 $15.03亿 · 综合到手 ~25%–30% (含 O18 提档)',
 verdict: '总盘规模与冷启动速度全球第一：全包免费多人服务器与社交裂变流量，头部工作室天花板极高，但单美元名义分成率低于传统商店。',
 sourceLabel: 'Q3 2026 Letter',
 sourceUrl: 'https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf'
 },
 {
 category: 'dividend',
 benchmark: false,
 company: 'Fortnite Creative / UEFN (Epic Games)',
 leader: 'Tim Sweeney · 虚幻引擎 5 UGC 生态',
 positioning: '依托《堡垒之夜》高画质射击底座向多元岛屿玩法延伸，主打中高龄主机与 PC 玩家',
 culture: 'Unreal Editor for Fortnite (Verse 语言) + 虚幻 5 次世代渲染管线',
 headcount: '数百万级实时并发 · 偏重主机/PC 重度硬件',
 margins: '40% 净收入参与度分成池 + 道具直售最高 ~74% 分成',
 verdict: '高画质与高分成劲敌：单创作者分成比例明显优于 Roblox，但低端移动设备覆盖率、非射击原生品类多样性及总分成池规模（~$3.5亿+级）仍落后于 Roblox。',
 sourceLabel: 'UEFN vs Roblox 2026',
 sourceUrl: 'https://generalistprogrammer.com/comparisons/fortnite-vs-roblox-creator-earnings'
 },
 {
 category: 'dividend',
 benchmark: false,
 company: 'Minecraft 我的世界 (Microsoft / Mojang)',
 leader: '微软游戏部门 · 全球销量第一体素沙盒',
 positioning: '买断制跨端沙盒建造（累计销量超 3 亿份）+ 官方 Marketplace 模组皮肤商城 + Realms 私服',
 culture: 'Java / Bedrock 双版本模组生态 + 社区创作者伙伴计划',
 headcount: '约 1.55亿 MAU (微软披露口径) · 长单次沉浸时长',
 margins: '买断制归属微软为主 + Marketplace 模组销售分成 (>50%)',
 verdict: '体素沙盒鼻祖 vs 多品类操作系统：Minecraft 在单机/私服建造自由度上无敌，但缺乏 Roblox 原生全品类独立游戏引擎（FPS/时尚走秀/RPG）与统一F2P即时社交大厅。',
 sourceLabel: 'Roblox vs Minecraft',
 sourceUrl: 'https://sqmagazine.co.uk/roblox-vs-minecraft-statistics/'
 },
 {
 category: 'global',
 benchmark: false,
 company: 'Steam (Valve Corporation)',
 leader: 'Gabe Newell · 全球 PC 数字发行霸主',
 positioning: '开放式 PC/Steam Deck 独立游戏与 3A 大作买断及内购数字商店',
 culture: '不绑定单一引擎（兼容 Unity / Unreal / Godot）+ Steamworks 联机接口',
 headcount: '全平台峰值并发 ~4,120万 CCU (已被 Roblox 4,730万超越)',
 margins: '开发者拿 70%–80% 净流水（服务器与买量成本由开发者自理）',
 verdict: '分成比例最高但获客门槛陡峭：Steam 给予独立工作室 70%+ 高分成，但开发者需自行承担研发资金、服务器运维、移动端移植与外部买量宣发风险。',
 sourceLabel: 'Newzoo Peak CCU',
 sourceUrl: 'https://gamedevreports.substack.com/p/newzoo-and-geeiq-the-roblox-audience'
 },
 {
 category: 'global',
 benchmark: false,
 company: 'Unity 引擎生态 (NYSE: U)',
 leader: 'Matthew Bromberg · 跨平台独立引擎与广告网',
 positioning: '向全球手游/独立游戏工作室提供底层 2D/3D 研发引擎订阅（Create）与买量变现网络（Grow）',
 culture: 'C# 工业级跨平台引擎 + Unity Muse / Sentis 端侧 AI 工具链',
 headcount: '支撑全球超 50% 移动游戏研发 · 无自有C端玩家社交大厅',
 margins: '按席位订阅费 + 广告竞价抽成（无内置统一虚拟货币闭环）',
 verdict: '纯工具军火商 vs 闭环帝国：Unity 赋予开发者 100% 独立 App 产权（Roblox 正以 Roblox Everywhere 追赶此能力），但缺乏 Roblox 自带的 1.38 亿 DAU 免买量流量池。',
 sourceLabel: 'BusinessWire RDC',
 sourceUrl: 'https://www.businesswire.com/news/home/20250905587466/en/Roblox-Unveils-AI-Monetization-and-Performance-Innovations-for-Creators'
 }
 ];

 var PEER_ROWS_EN = [
 {
 category: 'dividend',
 benchmark: true,
 company: 'Benchmark: Roblox (NYSE: RBLX)',
 leader: 'David Baszucki · Full-Stack Cloud UGC OS',
 positioning: 'Social-graph-driven F2P cloud gaming platform spanning budget mobile, PC, console, VR & web',
 culture: 'Roblox Studio (Luau) + Open-Source Cube 3D/4D + Prompt-to-Game Build + MCP',
 headcount: '138M DAUs (26Q3) · 47.3M Peak CCU',
 margins: '$1.50B FY25 DevEx · ~25%–30% effective share (higher w/ U.S. O18)',
 verdict: 'Unmatched total scale & zero-cost cold-start: covers global multiplayer servers and social discovery upfront, trading lower per-dollar cut for massive TAM.',
 sourceLabel: 'Q3 2026 Letter',
 sourceUrl: 'https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf'
 },
 {
 category: 'dividend',
 benchmark: false,
 company: 'Fortnite Creative / UEFN (Epic Games)',
 leader: 'Tim Sweeney · Unreal Engine 5 UGC Ecosystem',
 positioning: 'High-fidelity island ecosystem built atop Fortnite, skewing toward console & PC core gamers',
 culture: 'Unreal Editor for Fortnite (Verse scripting) + UE5 AAA rendering pipeline',
 headcount: 'Multi-million live CCU · Console/PC hardware skew',
 margins: '40% net-revenue engagement pool + up to ~74% on direct item sales',
 verdict: 'High-fidelity & higher-payout rival: superior per-creator revenue share, though smaller total payout pool (~$352M+ scale) and heavier device requirements than Roblox.',
 sourceLabel: 'UEFN vs Roblox 2026',
 sourceUrl: 'https://generalistprogrammer.com/comparisons/fortnite-vs-roblox-creator-earnings'
 },
 {
 category: 'dividend',
 benchmark: false,
 company: 'Minecraft (Microsoft / Mojang)',
 leader: 'Microsoft Gaming · #1 Best-Selling Voxel Sandbox',
 positioning: 'Buy-to-play sandbox (>300M copies sold) + curated Marketplace add-ons + Realms subscriptions',
 culture: 'Java / Bedrock modding communities + official Marketplace Partner Program',
 headcount: '~155M MAUs (Microsoft disclosure) · Deep session length',
 margins: 'Upfront copy sales ($27–$40) + >50% creator share on Marketplace skins/worlds',
 verdict: 'Voxel sandbox icon vs. multi-genre OS: unmatched survival/building depth, but lacks Roblox\'s F2P multi-genre engine (FPS, fashion, RPG) and unified social lobby.',
 sourceLabel: 'Roblox vs Minecraft',
 sourceUrl: 'https://sqmagazine.co.uk/roblox-vs-minecraft-statistics/'
 },
 {
 category: 'global',
 benchmark: false,
 company: 'Steam (Valve Corporation)',
 leader: 'Gabe Newell · Dominant PC Digital Storefront',
 positioning: 'Open PC & Steam Deck digital distribution store for indie and AAA buy-to-play / F2P titles',
 culture: 'Engine-agnostic (Unity / Unreal / Godot) + Steamworks networking APIs',
 headcount: '~41.2M all-time peak CCU (surpassed by Roblox\'s 47.3M in Aug 2025)',
 margins: '70%–80% developer revenue share (studios fund own servers & UA)',
 verdict: 'Highest revenue cut but steep UA & dev risk: creators keep 70%+, yet bear full upfront development, server hosting, mobile porting, and marketing costs.',
 sourceLabel: 'Newzoo Peak CCU',
 sourceUrl: 'https://gamedevreports.substack.com/p/newzoo-and-geeiq-the-roblox-audience'
 },
 {
 category: 'global',
 benchmark: false,
 company: 'Unity Technologies (NYSE: U)',
 leader: 'Matthew Bromberg · Cross-Platform Engine & Ad Network',
 positioning: 'Supplies 2D/3D engine seats (Create) and mobile user-acquisition/ad monetization (Grow)',
 culture: 'C# industrial runtime + Unity Muse / Sentis on-device AI workflow',
 headcount: 'Powers >50% of mobile games · No consumer social lobby',
 margins: 'Seat SaaS subscriptions + ad-network mediation take rate',
 verdict: 'Pure engine vendor vs. closed-loop network: Unity gives full standalone app ownership (which Roblox Everywhere now targets) but brings zero built-in player traffic.',
 sourceLabel: 'BusinessWire RDC',
 sourceUrl: 'https://www.businesswire.com/news/home/20250905587466/en/Roblox-Unveils-AI-Monetization-and-Performance-Innovations-for-Creators'
 }
 ];

 var CHECKLIST_ITEMS = [
 {
 tag: '30秒同服钩子',
 title: '1. 社交裂变与好友同玩测试：核心循环是否因“熟人组队/对抗”而指数级放大？',
 desc: '参考《Steal a Brainrot》与《99 Nights in the Forest》，游戏是否在首 30 秒内让好友产生协作求生、交易炫耀或趣味互坑的强社交张力？'
 },
 {
 tag: '高频 LiveOps',
 title: '2. 全服事件与长线留存测试：是否具备每周更新与全服同步狂欢机制？',
 desc: '是否建立类似《Grow a Garden》气候突变或《Dress To Impress》主题赛季的轻量化高频更新节奏，持续触发 RFY 推荐算法正向加权？'
 },
 {
 tag: 'O18 + Plus 乘数',
 title: '3. 分层变现与高净值客群测试：能否兼顾免费玩家留存与 O18 高汇率变现？',
 desc: '内购设计是否融合通行证、永久能力、私人服务器与激励视频广告，并针对美国 18+ 认证玩家（享 $0.0054/Robux 高阶汇率）优化深度付费点？'
 },
 {
 tag: 'Cube + MCP 提效',
 title: '4. AI 原生工作流测试：团队是否充分利用 Studio AI / Cube 4D 压缩试错周期？',
 desc: '是否接入 Roblox Studio Assistant、Cube 4D 交互资产生成或 MCP 编码代理（Top 100 游戏中超 80% 已采用），将原型验证周期从数月缩短至数周？'
 },
 {
 tag: 'SLIM 全端流畅',
 title: '5. 跨端性能与低配机兼容测试：能否在入门级手机与主机/网页端同步丝滑运行？',
 desc: '是否启用 SLIM 轻量模型、动态纹理流式加载与 Server Authority 权威同步，确保不流失占全球大盘主力的移动端与新兴市场玩家？'
 },
 {
 tag: 'FCF 与非Top10健康度',
 title: '6. 平台级飞轮跟踪指标（投资者视角）：长尾消费占比与第一方支付杠杆是否持续改善？',
 desc: '跟踪非 Top 10 游戏时长/流水占比（现约 80% 时长）、O18 用户增速、直充渠道降本幅度及 Bookings 向自由现金流（FY25 转化率 ~20%）的兑现效率。'
 }
 ];

 var CHECKLIST_ITEMS_EN = [
 {
 tag: '30-Sec Social Hook',
 title: '1. Co-Play & Social Virality Test: Does gameplay multiply in fun with friends?',
 desc: 'Like Steal a Brainrot and 99 Nights in the Forest, does the core loop trigger co-op survival, trading, or playful rivalry within 30 seconds of joining?'
 },
 {
 tag: 'Weekly LiveOps',
 title: '2. Synchronized Live Events & RFY Retention Test: Is content cadence built for RFY?',
 desc: 'Does the experience run weekly updates or server-wide mutation/runway events (like Grow a Garden & Dress To Impress) that compound RFY retention signals?'
 },
 {
 tag: '$0.0054 O18 Lift',
 title: '3. Multi-Rail Monetization Test: Does it capture O18 spend, Plus subscribers & ads?',
 desc: 'Combines Game Passes, private servers, and Rewarded Video while appealing to verified U.S. 18+ spenders ($0.0054/Robux DevEx tier)?'
 },
 {
 tag: 'Cube 4D & MCP',
 title: '4. AI-Accelerated Production Test: Is the team leveraging Studio AI & MCP?',
 desc: 'Uses Studio Assistant, Cube 4D interactive generation, and MCP connectors (used by >80% of Top 100 games) to compress iteration from months to days?'
 },
 {
 tag: 'SLIM Cross-Play',
 title: '5. Low-End Mobile to Console Scalability Test: Does it run smoothly everywhere?',
 desc: 'Adopts SLIM, dynamic texture streaming, and Server Authority so mobile, console, PC, and instant Web Play users share seamless framerate and fairness?'
 },
 {
 tag: 'FCF & Long-Tail',
 title: '6. Platform Flywheel Health Test (Investor Lens): Are O18 mix & direct payments rising?',
 desc: 'Tracks non-Top-10 engagement share (~80% of hours), O18 cohort expansion, 1P payment fee leverage, and Bookings-to-FCF conversion (~20% in FY25).'
 }
 ];

 var QUICK_JUMP_INDEX = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '1.38亿 DAU · 4,730万峰值在线 · $6.79B 预订额 · $1.50B 分成' },
 { sec: 'sec-01', title: '01 垂直技术栈与爆款游戏矩阵', sub: 'Brookhaven / Steal a Brainrot / Grow a Garden / Blox Fruits' },
 { sec: 'sec-02', title: '02 四大飞轮支柱与 AI 护城河', sub: 'RFY 推荐 · Cube 4D & Build · RM3 安全 · 五维竞品雷达图' },
 { sec: 'sec-03', title: '03 全球游戏与 UGC 平台对比', sub: 'Roblox vs Fortnite UEFN vs Minecraft vs Steam vs Unity' },
 { sec: 'sec-04', title: '04 虚拟经济漏斗与收益测算器', sub: '27个月递延准则 · $0.0038/$0.0054 汇率 · 工作室净分成模拟器' },
 { sec: 'sec-05', title: '05 三代演进与现象级战役复盘', sub: '2006 上线 · 2025 双子星破纪录 · 2026 Universal Player 战略' },
 { sec: 'sec-06', title: '06 爆款游戏与生态核查清单', sub: '6 项爆款设计法则与生态飞轮健康度本地持久化自测' },
 { sec: 'sec-07', title: '07 数据来源与财报核验索引', sub: 'SEC 10-K/10-Q · 25Q4 & 26Q3 股东信 · DevEx 官方文档' }
 ];

 var QUICK_JUMP_EN = [
 { sec: 'sec-00', title: '00 Executive Summary & KPIs', sub: '138M DAUs · 47.3M Peak CCU · $6.79B Bookings · $1.50B DevEx' },
 { sec: 'sec-01', title: '01 Vertical Stack & Hit Game Matrix', sub: 'Brookhaven / Steal a Brainrot / Grow a Garden / Blox Fruits' },
 { sec: 'sec-02', title: '02 Four Flywheel Pillars & AI Moat', sub: 'RFY Discovery · Cube 4D & Build · RM3 Safety · 5-Axis Radar' },
 { sec: 'sec-03', title: '03 Global Gaming & UGC Peer Matrix', sub: 'Roblox vs. Fortnite UEFN vs. Minecraft vs. Steam vs. Unity' },
 { sec: 'sec-04', title: '04 Robux Funnel & Studio Simulator', sub: '27-Mo Deferral · $0.0038/$0.0054 DevEx · Studio Payout Sim' },
 { sec: 'sec-05', title: '05 Three-Era Evolution & Case Studies', sub: '2006 Launch · 2025 Viral Surge · 2026 Universal Player' },
 { sec: 'sec-06', title: '06 Hit Game & Ecosystem Checklist', sub: '6-Point Studio & Investor Diagnostic (Saved Locally)' },
 { sec: 'sec-07', title: '07 Primary Filings & Sources Index', sub: 'SEC EDGAR · Q4 25 & Q3 26 Letters · Creator Hub Docs' }
 ];

 var PRESETS = {
 p1: { ccu: 15000, arpdauCents: 9, o18Share: 35, plusAds: true },
 p2: { ccu: 80000, arpdauCents: 6, o18Share: 22, plusAds: true },
 p3: { ccu: 5000, arpdauCents: 16, o18Share: 65, plusAds: true }
 };

 var state = {
 lang: 'zh',
 theme: 'light',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { mo: true, pmi: true, ko: true },
 peerFilter: 'all',
 peerQuery: '',
 epsSeries: { eps: true, oci: true },
 sim: { ccu: 15000, arpdauCents: 9, o18Share: 35, plusAds: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 /* Safe LocalStorage Helpers */
 function safeGetStorage(key) {
 try {
 return window.localStorage.getItem(key);
 } catch (err) {
 return null;
 }
 }

 function safeSetStorage(key, val) {
 try {
 window.localStorage.setItem(key, val);
 } catch (err) {
 /* Ignore storage quota/sandbox restrictions */
 }
 }

 /* Toast Notification (MUI Snackbar) */
 var toastTimer = null;
 function showToast(message) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = message;
 el.classList.add('show');
 if (toastTimer) clearTimeout(toastTimer);
 toastTimer = setTimeout(function () {
 el.classList.remove('show');
 }, 2800);
 }

 /* ======================================================================
 2. Bilingual Engine, Theme Switching & Sidebar Drawer
 ====================================================================== */
 function isEn() {
 return state.lang === 'en';
 }

 var _zhToEnText = {};
 var _enToZhText = {};
 for (var _ti = 0; _ti < I18N_TEXT_PAIRS.length; _ti++) {
 _zhToEnText[I18N_TEXT_PAIRS[_ti][0]] = I18N_TEXT_PAIRS[_ti][1];
 _enToZhText[I18N_TEXT_PAIRS[_ti][1]] = I18N_TEXT_PAIRS[_ti][0];
 }
 var _zhToEnAttr = {};
 var _enToZhAttr = {};
 for (var _ai = 0; _ai < I18N_ATTR_PAIRS.length; _ai++) {
 _zhToEnAttr[I18N_ATTR_PAIRS[_ai][0]] = I18N_ATTR_PAIRS[_ai][1];
 _enToZhAttr[I18N_ATTR_PAIRS[_ai][1]] = I18N_ATTR_PAIRS[_ai][0];
 }
 var _richMapByKey = {};
 for (var _ri = 0; _ri < I18N_RICH_LIST.length; _ri++) {
 _richMapByKey[I18N_RICH_LIST[_ri].key] = I18N_RICH_LIST[_ri];
 }

 function bindRichBlocksOnce() {
 var candidates = document.querySelectorAll('h1, p, div');
 for (var i = 0; i < candidates.length; i++) {
 var el = candidates[i];
 if (el.getAttribute('data-i18n-rich')) continue;
 if (el.id === 'pillarFocusNote' || el.closest('#pillarFocusNote')) continue;
 var normTxt = (el.textContent || '').replace(/\s+/g, ' ').trim();
 for (var j = 0; j < I18N_RICH_LIST.length; j++) {
 var item = I18N_RICH_LIST[j];
 if (normTxt.indexOf(item.match_zh) === 0 && el.children.length <= 25) {
 if (!el.querySelector('div, p, ul, table, canvas')) {
 el.setAttribute('data-i18n-rich', item.key);
 break;
 }
 }
 }
 }
 }

 function syncCh1HeaderText() {
 var titleEl = document.getElementById('ch1ChartTitle');
 var subEl = document.getElementById('ch1ChartSub');
 if (!titleEl || !subEl) return;
 if (state.ch1View === 'viewA') {
 titleEl.textContent = isEn()
 ? 'Q4 2024 – Q3 2026 Quarterly Average DAUs (Millions) & Hours Engaged (Billions)'
 : '2024 Q4 – 2026 Q3 平台季度平均 DAU（百万）与用户总参与时长（十亿小时）';
 subEl.textContent = isEn()
 ? 'Following 2025\'s historic summer viral surge, Q3 2026 DAUs rebounded +12% QoQ to 138M (+55% on a 2-year basis)'
 : '经历 2025 暑期现象级爆款脉冲后，2026 Q3 DAU 环比强劲回升 12% 至 1.38 亿，两年期复合增长 +55%';
 } else {
 titleEl.textContent = isEn()
 ? 'Hall-of-Fame Roblox Games: All-Time Visits (Billions) vs. Peak Concurrent Users (Millions)'
 : 'Roblox 殿堂级现象游戏对比：历史累计访问量（十亿次）vs 单游戏历史峰值同时在线（百万人）';
 subEl.textContent = isEn()
 ? 'Brookhaven RP leads all-time visits (87.9B+), while Steal a Brainrot (25.4M CCU) & Grow a Garden (21.3M CCU) set concurrency records'
 : '《Brookhaven RP》以 879 亿+ 访问居长青榜首，《Steal a Brainrot》(25.4M) 与《Grow a Garden》(21.3M) 刷新峰值并发纪录';
 }
 }

 function syncCollapseButtonsText() {
 var btns = document.querySelectorAll('[data-collapse-target]');
 for (var i = 0; i < btns.length; i++) {
 var pid = btns[i].getAttribute('data-collapse-target');
 var panel = document.getElementById(pid);
 var isOpen = panel && panel.classList.contains('open');
 if (isEn()) {
 btns[i].innerHTML = isOpen ? '<span>Hide Gameplay &amp; Monetization Loop</span> <span>⌃</span>' : '<span>Show Gameplay &amp; Monetization Loop</span> <span>⌄</span>';
 } else {
 btns[i].innerHTML = isOpen ? '<span>收起微观玩法与变现机制</span> <span>⌃</span>' : '<span>展开微观玩法与变现机制</span> <span>⌄</span>';
 }
 }
 }

 function applyLanguage(lang, silent) {
 bindRichBlocksOnce();
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.documentElement.setAttribute('data-lang', state.lang);
 document.title = en ? DOC_TITLE_EN : DOC_TITLE_ZH;

 var lGrp = document.getElementById('langSwitchGroup');
 if (lGrp) lGrp.setAttribute('aria-label', en ? 'Language switcher' : '语言切换');
 var abThmBtn = document.getElementById('appbarThemeBtn');
 if (abThmBtn) {
 abThmBtn.setAttribute('title', en ? 'Toggle Light / Dark theme' : '切换浅色 / 深色主题');
 abThmBtn.setAttribute('aria-label', en ? 'Toggle color theme' : '切换深浅色主题');
 }
 var zhBtn = document.getElementById('langZhBtn');
 var enBtn = document.getElementById('langEnBtn');
 if (zhBtn && enBtn) {
 zhBtn.classList.toggle('active', !en);
 enBtn.classList.toggle('active', en);
 zhBtn.setAttribute('aria-pressed', !en ? 'true' : 'false');
 enBtn.setAttribute('aria-pressed', en ? 'true' : 'false');
 }
 var dynNavSpans = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
 for (var dn = 0; dn < dynNavSpans.length; dn++) {
 dynNavSpans[dn].textContent = en ? dynNavSpans[dn].getAttribute('data-i18n-en') : dynNavSpans[dn].getAttribute('data-i18n-zh');
 }

 /* 1. Update Rich Prose Blocks */
 var richNodes = document.querySelectorAll('[data-i18n-rich]');
 for (var r = 0; r < richNodes.length; r++) {
 var rk = richNodes[r].getAttribute('data-i18n-rich');
 var rEntry = _richMapByKey[rk];
 if (rEntry) {
 richNodes[r].innerHTML = en ? rEntry.en : rEntry.zh;
 }
 }

 /* 2. Walk Pure Text Nodes */
 var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
 var tNode;
 while ((tNode = walker.nextNode())) {
 var pEl = tNode.parentElement;
 if (!pEl) continue;
 var tag = pEl.tagName;
 if (tag === 'SCRIPT' || tag === 'STYLE') continue;
 if (pEl.closest('#langSwitchGroup') || pEl.closest('[data-i18n-rich]') || pEl.closest('#pillarFocusNote')) continue;
 var raw = tNode.nodeValue || '';
 var trimmed = raw.replace(/\s+/g, ' ').trim();
 if (!trimmed) continue;
 var mapped = en ? _zhToEnText[trimmed] : _enToZhText[trimmed];
 if (mapped) {
 var leadMatch = raw.match(/^\s*/);
 var trailMatch = raw.match(/\s*$/);
 tNode.nodeValue = (leadMatch ? leadMatch[0] : '') + mapped + (trailMatch ? trailMatch[0] : '');
 }
 }

 /* 3. Update Attributes (placeholder, title, aria-label) */
 var allEls = document.querySelectorAll('[placeholder], [title], [aria-label]');
 var attrNames = ['placeholder', 'title', 'aria-label'];
 for (var a = 0; a < allEls.length; a++) {
 if (allEls[a].closest('#langSwitchGroup')) continue;
 for (var k = 0; k < attrNames.length; k++) {
 var an = attrNames[k];
 var av = allEls[a].getAttribute(an);
 if (!av) continue;
 var nextAv = en ? _zhToEnAttr[av] : _enToZhAttr[av];
 if (nextAv) allEls[a].setAttribute(an, nextAv);
 }
 }

 /* 4. Update Dynamic Panels & Redraw All 5 High-DPI Charts */
 var pNote = document.getElementById('pillarFocusNote');
 if (pNote) {
 var notesArr = en ? PILLAR_NOTES_EN : PILLAR_NOTES;
 pNote.innerHTML = '<div>' + notesArr[state.activePillar] + '</div>';
 }
 syncCh1HeaderText();
 syncCollapseButtonsText();
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 safeSetStorage(STORAGE_LANG_KEY, state.lang);

 if (!silent) {
 showToast(en ? 'Switched to English Research Edition' : '已切换至中文深度研报视图');
 }
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIconEl = document.getElementById('appbarThemeIcon');
 if (abIconEl) {
 abIconEl.innerHTML = (state.theme === 'dark')
 ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 var sDarkBtn = document.getElementById('sideThemeDarkBtn');
 var sLightBtn = document.getElementById('sideThemeLightBtn');
 if (sDarkBtn && sLightBtn) {
 void 0;
 void 0;
 }
 safeSetStorage(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) {
 showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Obsidian Mode' : '已切换至 MUI 深海黑曜石护眼模式') : (isEn() ? 'Switched to Crisp Light Mode' : '已切换至 MUI 浅色明亮阅读模式'));
 }
 }

 function toggleSidebar() {
 if (window.innerWidth <= 1120) {
 document.body.classList.toggle('drawer-open');
 } else {
 document.body.classList.toggle('sidebar-collapsed');
 setTimeout(renderAllCharts, 60);
 }
 }

 function closeMobileDrawer() {
 document.body.classList.remove('drawer-open');
 }

 /* ======================================================================
 3. Peer Comparison Table Rendering & Filtering
 ====================================================================== */
 function escapeHtml(str) {
 return String(str)
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;');
 }

 function highlightMatch(text, query) {
 var safe = escapeHtml(text);
 if (!query) return safe;
 var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 var re = new RegExp('(' + escapedQ + ')', 'gi');
 return safe.replace(re, '<mark class="hl">$1</mark>');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody');
 var badge = document.getElementById('peerCountBadge');
 if (!tbody) return;

 var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = activeRows.filter(function (row, idx) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var zhR = PEER_ROWS[idx] || row;
 var enR = PEER_ROWS_EN[idx] || row;
 var hay = (zhR.company + ' ' + zhR.leader + ' ' + zhR.positioning + ' ' + zhR.culture + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.leader + ' ' + enR.positioning + ' ' + enR.culture + ' ' + enR.verdict).toLowerCase();
 return hay.indexOf(q) !== -1;
 });

 if (badge) {
 badge.textContent = isEn()
 ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Platforms')
 : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆平台');
 }

 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching platforms found. Try another keyword or reset filters.' : '未找到匹配的标杆平台记录，请尝试其他关键词或重置筛选条件。') + '</td></tr>';
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

 /* ======================================================================
 4. Roblox Studio & Creator DevEx Payout Simulator
 ====================================================================== */
 function formatCurrency(val) {
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function computeStudioModel() {
 var ccu = state.sim.ccu;
 var arpdau = state.sim.arpdauCents / 100;
 var o18Ratio = state.sim.o18Share / 100;
 var lift = state.sim.plusAds ? 1.15 : 1.0;

 /* Typical daily turnover: DAU ~= 12 * Avg CCU */
 var estDau = ccu * 12;
 var dailyGrossUsdActive = estDau * arpdau * lift;
 var dailyGrossUsdLegacy = estDau * arpdau;

 /* $1 gross spend ~= 100 Robux; creator earns 70% inside experience = 70 Earned Robux / $1 */
 var monthlyEarnedRobux = dailyGrossUsdActive * 30.4375 * 70;
 var legacyMonthlyEarnedRobux = dailyGrossUsdLegacy * 30.4375 * 70;

 var blendedRate = (1 - o18Ratio) * 0.0038 + o18Ratio * 0.0054;
 var monthlyDevExActive = monthlyEarnedRobux * blendedRate;
 var monthlyDevExLegacy = legacyMonthlyEarnedRobux * 0.0035;

 var annualDevExActive = monthlyDevExActive * 12;
 var annualDevExLegacy = monthlyDevExLegacy * 12;
 var effectiveSharePct = (70 * blendedRate) * 100;

 return {
 ccu: ccu,
 arpdau: arpdau,
 o18Share: state.sim.o18Share,
 blendedRate: blendedRate,
 effectiveSharePct: effectiveSharePct,
 monthlyEarnedRobuxM: monthlyEarnedRobux / 1000000,
 monthlyActive: monthlyDevExActive,
 monthlyLegacy: monthlyDevExLegacy,
 annualActive: annualDevExActive,
 annualDelta: annualDevExActive - annualDevExLegacy
 };
 }

 function updateSimulatorUI() {
 var m = computeStudioModel();

 document.getElementById('simPrincipalLabel').textContent = m.ccu.toLocaleString('en-US') + (isEn() ? ' CCU' : ' 人');
 document.getElementById('simYearsLabel').textContent = '$' + m.arpdau.toFixed(2);
 document.getElementById('simCagrLabel').textContent = m.o18Share + '%';

 document.getElementById('simEndingVal').textContent = formatCurrency(m.annualActive);
 document.getElementById('simMoicVal').textContent = '$' + m.blendedRate.toFixed(4) + ' · ' + m.effectiveSharePct.toFixed(1) + '%';
 document.getElementById('simNetGainVal').textContent = m.monthlyEarnedRobuxM.toFixed(2) + 'M R$';
 document.getElementById('simMidLabel').textContent = isEn() ? 'Annual Gain vs. Legacy $0.0035' : '较旧版单一费率 ($0.0035) 年增收';
 document.getElementById('simMidVal').textContent = '+' + formatCurrency(m.annualDelta);

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < presetBtns.length; i++) {
 presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
 }

 drawSimChart();
 }

 /* ======================================================================
 5. Interactive Checklist
 ====================================================================== */
 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 if (!container) return;

 var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
 var doneCount = state.checks.filter(Boolean).length;
 var pct = Math.round((doneCount / itemsList.length) * 100);
 if (chip) {
 chip.textContent = isEn()
 ? ('Verified ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)')
 : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
 }
 if (bar) {
 bar.style.width = pct + '%';
 }

 container.innerHTML = itemsList.map(function (item, idx) {
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

 /* ======================================================================
 6. Built-In Zero-Dependency MUI X Charts-Style High-DPI Engine
 ====================================================================== */
 var hitRegions = {
 chartCh1: [],
 chartRadar: [],
 chartBars: [],
 chartEps: [],
 chartSim: []
 };

 var hoverState = {
 chartCh1: -1,
 chartRadar: -1,
 chartBars: -1,
 chartEps: -1,
 chartSim: -1
 };

 function getPalette() {
 var cs = getComputedStyle(document.documentElement);
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: cs.getPropertyValue('--chart-grid').trim() || (isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)'),
 tick: cs.getPropertyValue('--chart-tick').trim() || '#94A3B8',
 text: cs.getPropertyValue('--text-primary').trim() || '#F3F6F9',
 sub: cs.getPropertyValue('--text-secondary').trim() || '#B2BAC2',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.88)' : 'rgba(255, 255, 255, 0.94)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: cs.getPropertyValue('--chart-c1').trim() || '#3399FF',
 c2: cs.getPropertyValue('--chart-c2').trim() || '#22C55E',
 c3: cs.getPropertyValue('--chart-c3').trim() || '#FFB74D',
 c4: cs.getPropertyValue('--chart-c4').trim() || '#A78BFA'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var stage = canvas.parentElement;
 var rect = stage.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width));
 var h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 canvas.style.width = w + 'px';
 canvas.style.height = h + 'px';
 var targetW = Math.floor(w * dpr);
 var targetH = Math.floor(h * dpr);
 if (canvas.width !== targetW) canvas.width = targetW;
 if (canvas.height !== targetH) canvas.height = targetH;
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h, canvas: canvas };
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
 ctx.font = '700 11px "IBM Plex Mono", system-ui, sans-serif';
 var tw = ctx.measureText(text).width + 10;
 var th = 18;
 var bx = cx - tw / 2;
 var by = cy - th / 2;
 ctx.fillStyle = pal.pillBg;
 roundRectPath(ctx, bx, by, tw, th, 5);
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

 /* Chart 1: View A (Quarterly DAU + Hours Engaged) & View B (Top Games Visits + Peak CCU) */
 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartCh1 = [];

 var metaEl = document.getElementById('ch1AxisMeta');
 var leg1 = document.getElementById('ch1Leg1');
 var leg2 = document.getElementById('ch1Leg2');

 if (state.ch1View === 'viewA') {
 if (metaEl) {
 metaEl.innerHTML = isEn()
 ? '<span style="color:var(--chart-c1);">■ Left Axis: Quarterly Avg. DAUs (Millions)</span><span style="color:var(--chart-c2);">● Right Axis: Hours Engaged (Billions)</span>'
 : '<span style="color:var(--chart-c1);">■ 左轴：季度平均 DAU (百万人)</span><span style="color:var(--chart-c2);">● 右轴：单季总参与时长 (十亿小时)</span>';
 }
 if (leg1) leg1.textContent = isEn() ? 'Quarterly Average DAUs (Left Axis · Millions)' : '季度平均 DAU (左轴 · 百万人)';
 if (leg2) leg2.textContent = isEn() ? 'Quarterly Hours Engaged (Right Axis · Billions)' : '单季总参与时长 Hours Engaged (右轴 · 十亿小时)';

 var padA = { top: 28, right: 50, bottom: 38, left: 48 };
 var pwA = w - padA.left - padA.right;
 var phA = h - padA.top - padA.bottom;
 var qLabels = ['24Q4', '25Q1', '25Q2', '25Q3', '25Q4', '26Q1', '26Q2', '26Q3'];
 var dauM = [85.3, 97.8, 111.8, 151.5, 144.0, 132.0, 123.0, 138.0];
 var hrsB = [18.7, 21.7, 27.4, 39.6, 35.0, 31.0, 29.0, 34.0];
 var maxDau = 200.0;
 var minHrs = 12.0, maxHrs = 44.0;

 for (var g = 0; g <= 4; g++) {
 var r = g / 4;
 var gy = padA.top + phA - r * phA;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(padA.left, gy);
 ctx.lineTo(padA.left + pwA, gy);
 ctx.stroke();

 ctx.font = '11px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick;
 ctx.textAlign = 'right';
 ctx.fillText(Math.round(maxDau * r) + 'M', padA.left - 7, gy);

 ctx.fillStyle = pal.c2;
 ctx.textAlign = 'left';
 ctx.fillText((minHrs + r * (maxHrs - minHrs)).toFixed(0) + 'B', padA.left + pwA + 7, gy);
 }

 var stepA = pwA / qLabels.length;
 var barW = Math.min(36, Math.max(18, stepA * 0.44));
 var ptsA = [];

 for (var i = 0; i < qLabels.length; i++) {
 var cx = padA.left + stepA * (i + 0.5);
 if (hoverState.chartCh1 === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, padA.left + stepA * i + 3, padA.top, stepA - 6, phA, 6);
 ctx.fill();
 }

 if (state.ch1Series.s1) {
 var bH = (dauM[i] / maxDau) * phA;
 var bX = cx - barW / 2;
 var bY = padA.top + phA - bH;
 var bGrad = ctx.createLinearGradient(0, bY, 0, padA.top + phA);
 if (pal.isDark) {
 bGrad.addColorStop(0, 'rgba(51, 153, 255, 0.78)');
 bGrad.addColorStop(1, 'rgba(0, 115, 230, 0.28)');
 } else {
 bGrad.addColorStop(0, '#1985F1');
 bGrad.addColorStop(1, '#0066CC');
 }
 ctx.fillStyle = bGrad;
 topRoundedBar(ctx, bX, bY, barW, bH, 5);
 ctx.fill();

 if (bH > 24) {
 ctx.fillStyle = '#FFFFFF';
 ctx.font = '700 9.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(dauM[i].toFixed(0) + 'M', cx, bY + 15);
 }
 }

 var ly = padA.top + phA - ((hrsB[i] - minHrs) / (maxHrs - minHrs)) * phA;
 ptsA.push({ x: cx, y: ly, hrs: hrsB[i] });

 ctx.fillStyle = (i === 3 || i === 7) ? pal.text : pal.tick;
 ctx.font = ((i === 3 || i === 7) ? '700 ' : '600 ') + '11.5px system-ui, sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(qLabels[i], cx, padA.top + phA + 22);

 hitRegions.chartCh1.push({
 idx: i,
 x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 28,
 html: isEn()
 ? ('<strong>' + qLabels[i] + ' Engagement Snapshot</strong><br/>' +
 '• Average DAUs: <strong>' + dauM[i].toFixed(1) + 'M</strong><br/>' +
 '• Total Hours Engaged: <strong>' + hrsB[i].toFixed(1) + 'B hrs</strong>')
 : ('<strong>' + qLabels[i] + ' 平台季度活跃明细</strong><br/>' +
 '• 季度平均 DAU：<strong>' + dauM[i].toFixed(1) + 'M (百万)</strong><br/>' +
 '• 单季总参与时长：<strong>' + hrsB[i].toFixed(1) + 'B (十亿小时)</strong>')
 });
 }

 if (state.ch1Series.s2) {
 ctx.save();
 drawSmoothLine(ctx, ptsA);
 ctx.strokeStyle = pal.c2;
 ctx.lineWidth = 2.8;
 ctx.stroke();
 ctx.restore();

 for (var n = 0; n < ptsA.length; n++) {
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath();
 ctx.arc(ptsA[n].x, ptsA[n].y, 5.8, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = pal.c2;
 ctx.beginPath();
 ctx.arc(ptsA[n].x, ptsA[n].y, 4.0, 0, Math.PI * 2);
 ctx.fill();

 if (w >= 540 || n % 2 === 1) {
 drawValueBadge(ctx, ptsA[n].hrs.toFixed(1) + 'B', ptsA[n].x, ptsA[n].y - 16, pal.c2, pal);
 }
 }
 }
 } else {
 if (metaEl) {
 metaEl.innerHTML = isEn()
 ? '<span style="color:var(--chart-c1);">■ Left Axis: All-Time Visits (Billions)</span><span style="color:var(--chart-c2);">■ Right Bar: Peak Concurrent Players (Millions)</span>'
 : '<span style="color:var(--chart-c1);">■ 左柱：历史累计访问量 (十亿次)</span><span style="color:var(--chart-c2);">■ 右柱：单作历史峰值在线 CCU (百万人)</span>';
 }
 if (leg1) leg1.textContent = isEn() ? 'All-Time Visits (Billions)' : '历史累计访问量 All-Time Visits (十亿次)';
 if (leg2) leg2.textContent = isEn() ? 'All-Time Peak Concurrent Players (Millions)' : '历史峰值同时在线 Peak CCU (百万人)';

 var padB = { top: 28, right: 48, bottom: 44, left: 48 };
 var pwB = w - padB.left - padB.right;
 var phB = h - padB.top - padB.bottom;
 var games = ['Brookhaven', 'Steal Brainrot', 'Blox Fruits', 'Grow a Garden', '99 Nights'];
 var genresZh = ['社交RP', '迷因劫掠', '动作RPG', '治愈种植', '协作恐怖'];
 var genresEn = ['Social RP', 'Viral Raid', 'Anime RPG', 'Idle Farm', 'Co-Op Horror'];
 var visitsB = [87.9, 73.6, 64.6, 30.1, 14.5];
 var peakM = [1.1, 25.4, 2.8, 21.3, 14.1];
 var maxVisits = 100.0;
 var maxPeak = 30.0;

 for (var j = 0; j <= 4; j++) {
 var rB = j / 4;
 var yG = padB.top + phB - rB * phB;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(padB.left, yG);
 ctx.lineTo(padB.left + pwB, yG);
 ctx.stroke();

 ctx.font = '11px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick;
 ctx.textAlign = 'right';
 ctx.fillText(Math.round(maxVisits * rB) + 'B', padB.left - 7, yG);

 ctx.fillStyle = pal.c2;
 ctx.textAlign = 'left';
 ctx.fillText((maxPeak * rB).toFixed(1) + 'M', padB.left + pwB + 7, yG);
 }

 var stepG = pwB / games.length;
 var bwG = Math.min(38, Math.max(18, stepG * 0.26));

 for (var k = 0; k < games.length; k++) {
 var centerX = padB.left + stepG * (k + 0.5);
 if (hoverState.chartCh1 === k) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, padB.left + stepG * k + 5, padB.top, stepG - 10, phB, 8);
 ctx.fill();
 }

 if (state.ch1Series.s1) {
 var h1 = (visitsB[k] / maxVisits) * phB;
 var x1 = state.ch1Series.s2 ? (centerX - bwG - 4) : (centerX - bwG / 2);
 var y1 = padB.top + phB - h1;
 var g1 = ctx.createLinearGradient(0, y1, 0, padB.top + phB);
 g1.addColorStop(0, '#3399FF');
 g1.addColorStop(1, '#0066CC');
 ctx.fillStyle = g1;
 topRoundedBar(ctx, x1, y1, bwG, h1, 5);
 ctx.fill();
 drawValueBadge(ctx, visitsB[k].toFixed(1) + 'B', x1 + bwG / 2, y1 - 12, pal.c1, pal);
 }

 if (state.ch1Series.s2) {
 var h2 = (peakM[k] / maxPeak) * phB;
 var x2 = state.ch1Series.s1 ? (centerX + 4) : (centerX - bwG / 2);
 var y2 = padB.top + phB - h2;
 var g2 = ctx.createLinearGradient(0, y2, 0, padB.top + phB);
 g2.addColorStop(0, '#34D399');
 g2.addColorStop(1, '#16A34A');
 ctx.fillStyle = g2;
 topRoundedBar(ctx, x2, y2, bwG, h2, 5);
 ctx.fill();
 drawValueBadge(ctx, peakM[k].toFixed(1) + 'M', x2 + bwG / 2, y2 - 12, pal.c2, pal);
 }

 ctx.fillStyle = pal.text;
 ctx.font = '700 11.5px system-ui, sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(games[k], centerX, padB.top + phB + 19);
 ctx.fillStyle = pal.tick;
 ctx.font = '10px system-ui, sans-serif';
 ctx.fillText(isEn() ? genresEn[k] : genresZh[k], centerX, padB.top + phB + 34);

 hitRegions.chartCh1.push({
 idx: k,
 x: padB.left + stepG * k, y: padB.top, w: stepG, h: phB + 36,
 html: isEn()
 ? ('<strong>' + games[k] + ' (' + genresEn[k] + ')</strong><br/>' +
 '• All-Time Visits: <strong>' + visitsB[k].toFixed(1) + 'B+</strong><br/>' +
 '• Peak Concurrent Users: <strong>' + peakM[k].toFixed(1) + 'M CCU</strong>')
 : ('<strong>' + games[k] + ' (' + genresZh[k] + ')</strong><br/>' +
 '• 历史累计访问量：<strong>' + visitsB[k].toFixed(1) + 'B+ (十亿次)</strong><br/>' +
 '• 历史最高同时在线：<strong>' + peakM[k].toFixed(1) + 'M (百万人)</strong>')
 });
 }
 }
 }

 /* Chart 2: 5-Dimension Global UGC Platform Radar Chart */
 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartRadar = [];

 var axes = isEn()
 ? ['Social Graph Scale', 'AI & Low-Code Ease', 'Cross-Device Reach', 'Per-Dollar Cut', 'Safety & Age Trust']
 : ['社交图谱与冷启动', 'AI与零门槛创作', '全终端轻量化覆盖', '单笔开发者分成率', '多模态安全与分龄'];

 var pillarAxisMap = [0, 1, 4, 2];
 var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];

 var series = [
 { key: 'mo', name: 'Roblox', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.6, 9.7, 6.2, 9.3] },
 { key: 'pmi', name: 'Fortnite / UEFN', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [8.1, 7.6, 7.2, 9.1, 8.0] },
 { key: 'ko', name: 'Minecraft', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [8.4, 7.2, 9.0, 7.8, 8.5] }
 ];

 var cx = w / 2;
 var cy = h / 2 + 8;
 var sidePad = w < 420 ? 86 : 104;
 var radius = Math.max(62, Math.min((w - sidePad * 2) / 2, h * 0.35));
 var total = axes.length;

 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = ring === 10 ? 1.3 : 1;
 ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
 var px = cx + Math.cos(ang) * r;
 var py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py);
 else ctx.lineTo(px, py);
 }
 ctx.closePath();
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '600 9.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'left';
 ctx.textBaseline = 'middle';
 ctx.fillText(String(ring), cx + 4, cy - r);
 }

 for (var a = 0; a < total; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 var ax = cx + Math.cos(angle) * radius;
 var ay = cy + Math.sin(angle) * radius;
 var isHi = a === highlightedAxis;

 ctx.strokeStyle = isHi ? pal.c1 : pal.grid;
 ctx.lineWidth = isHi ? 1.8 : 1;
 ctx.beginPath();
 ctx.moveTo(cx, cy);
 ctx.lineTo(ax, ay);
 ctx.stroke();

 var lx = cx + Math.cos(angle) * (radius + 14);
 var ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = isHi ? pal.c1 : pal.text;
 ctx.font = (isHi ? '800 ' : '600 ') + (w < 420 ? '10.5px' : '11.5px') + ' system-ui, sans-serif';
 ctx.textBaseline = 'middle';
 if (Math.abs(Math.cos(angle)) < 0.2) ctx.textAlign = 'center';
 else if (Math.cos(angle) > 0) ctx.textAlign = 'left';
 else ctx.textAlign = 'right';
 ctx.fillText(axes[a], lx, ly);

 hitRegions.chartRadar.push({
 idx: a,
 x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
 html: isEn()
 ? ('<strong>' + axes[a] + ' (10-Pt Scale)</strong><br/>' +
 '• Roblox: <strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>' +
 '• Fortnite / UEFN: <strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>' +
 '• Minecraft: <strong>' + series[2].vals[a].toFixed(1) + '</strong>')
 : ('<strong>' + axes[a] + ' (10分制标杆评估)</strong><br/>' +
 '• Roblox：<strong>' + series[0].vals[a].toFixed(1) + ' 分</strong><br/>' +
 '• Fortnite / UEFN：<strong>' + series[1].vals[a].toFixed(1) + ' 分</strong><br/>' +
 '• Minecraft：<strong>' + series[2].vals[a].toFixed(1) + ' 分</strong>')
 });
 }

 for (var s = 0; s < series.length; s++) {
 var item = series[s];
 if (!state.radarSeries[item.key]) continue;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
 var dist = (item.vals[idx] / 10) * radius;
 var vx = cx + Math.cos(theta) * dist;
 var vy = cy + Math.sin(theta) * dist;
 if (idx === 0) ctx.moveTo(vx, vy);
 else ctx.lineTo(vx, vy);
 }
 ctx.closePath();
 ctx.fillStyle = item.fill;
 ctx.fill();
 ctx.strokeStyle = item.color;
 ctx.lineWidth = 2.4;
 ctx.stroke();

 for (var pIdx = 0; pIdx < total; pIdx++) {
 var pTheta = -Math.PI / 2 + (pIdx * 2 * Math.PI) / total;
 var pDist = (item.vals[pIdx] / 10) * radius;
 var pX = cx + Math.cos(pTheta) * pDist;
 var pY = cy + Math.sin(pTheta) * pDist;
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath();
 ctx.arc(pX, pY, 5.2, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = item.color;
 ctx.beginPath();
 ctx.arc(pX, pY, 3.6, 0, Math.PI * 2);
 ctx.fill();
 }
 }
 }

 /* Chart 3: Two-Deck Full-Width Horizontal Progress/Bar Chart */
 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartBars = [];

 var items = isEn() ? [
 { label: 'Developer Exchange (DevEx) Fees as % of Bookings (26Q3)', val: 24.0, cStart: '#34D399', cEnd: '#16A34A', sub: '$403M / $1,697M (+140 bps)', note: 'Reflects +8.5% Sept 2025 DevEx hike and June 2026 U.S. O18 rate boost' },
 { label: 'Personnel Costs excl. SBC as % of Bookings (26Q3)', val: 17.0, cStart: '#3399FF', cEnd: '#0073E6', sub: '$281M / $1,697M', note: 'Disciplined engineering & AI R&D headcount investment' },
 { label: 'Infrastructure & Trust/Safety as % of Bookings (26Q3)', val: 15.0, cStart: '#60A5FA', cEnd: '#2563EB', sub: '$258M / $1,697M', note: 'Covers global multiplayer cloud, AI inference & RM3 real-time safety' },
 { label: 'Verified Global DAU Share: Ages 13–17 Teen Cohort (26Q3)', val: 37.0, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '>80% Cohort Verified', note: 'Core teen social co-play engine (~30% of all U.S. 13–17s play daily)' },
 { label: 'Verified Global DAU Share: Under-13 Youth Cohort (26Q3)', val: 34.0, cStart: '#38BDF8', cEnd: '#0284C7', sub: 'Protected Banded Chat', note: 'Largest global U13 gaming destination under strict age-banded guardrails' },
 { label: 'Verified Global DAU Share: Ages 18+ Adult Cohort (26Q3)', val: 29.0, cStart: '#FBBF24', cEnd: '#D97706', sub: '37% in U.S. (+50% Monetization)', note: 'Fastest-growing demographic cohort; U.S. O18 monetizes 50%+ above U18' }
 ] : [
 { label: 'DevEx 创作者分成占 Bookings 预订额比重 (26Q3)', val: 24.0, cStart: '#34D399', cEnd: '#16A34A', sub: '$403M / $1,697M (+140 bps)', note: '反映 2025.09 提价 8.5% 及 2026.06 美国 18+ 高阶汇率激励落地' },
 { label: '核心人员成本（不含 SBC）占 Bookings 比重 (26Q3)', val: 17.0, cStart: '#3399FF', cEnd: '#0073E6', sub: '$281M / $1,697M', note: '聚焦 AI 基础模型、引擎性能优化与商业化工程人才投入' },
 { label: '云基础设施与信任安全支出占 Bookings 比重 (26Q3)', val: 15.0, cStart: '#60A5FA', cEnd: '#2563EB', sub: '$258M / $1,697M', note: '支撑 1.38 亿日活实时联机、自建 GPU 推理集群与 RM3 多模态审核' },
 { label: '全球已核验玩家年龄占比：13–17 岁青少年主力层 (26Q3)', val: 37.0, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '该年龄段核验率 >80%', note: '美国约 30% 的 13–17 岁青少年每天打开 Roblox 与好友同玩' },
 { label: '全球已核验玩家年龄占比：13 岁以下儿童保护层 (26Q3)', val: 34.0, cStart: '#38BDF8', cEnd: '#0284C7', sub: '强制分龄聊天隔离', note: '全球最大 U13 儿童游乐场，执行最严苛的 Roblox Kids 默认保护' },
 { label: '全球已核验玩家年龄占比：18 岁以上成人破圈层 (26Q3)', val: 29.0, cStart: '#FBBF24', cEnd: '#D97706', sub: '美国达 37% (变现高 50%+)', note: '全平台增速最快人群，驱动射击/竞速/恐怖等高 ARPU 品类崛起' }
 ];

 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;
 var maxX = 50;

 for (var g = 0; g <= 5; g++) {
 var xVal = g * 10;
 var gx = pad.left + (xVal / maxX) * pw;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(gx, pad.top);
 ctx.lineTo(gx, pad.top + ph);
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = g === 0 ? 'left' : (g === 5 ? 'right' : 'center');
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
 }

 var rowH = ph / items.length;

 for (var i = 0; i < items.length; i++) {
 var rowTop = pad.top + rowH * i;
 var isHovered = hoverState.chartBars === i;
 if (isHovered) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, pad.left - 6, rowTop + 2, pw + 12, rowH - 4, 8);
 ctx.fill();
 }

 var labelY = rowTop + Math.max(15, rowH * 0.34);
 var barY = rowTop + Math.max(22, rowH * 0.50);
 var barH = Math.min(15, Math.max(11, rowH * 0.26));
 var bw = Math.max(8, (items[i].val / maxX) * pw);

 ctx.fillStyle = pal.text;
 ctx.font = '600 ' + (w < 460 ? '11px' : '12px') + ' system-ui, sans-serif';
 ctx.textAlign = 'left';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(items[i].label, pad.left, labelY);

 var valStr = items[i].val.toFixed(1) + '%';
 ctx.font = '800 12.5px "IBM Plex Mono", sans-serif';
 ctx.fillStyle = pal.isDark ? items[i].cStart : items[i].cEnd;
 ctx.textAlign = 'right';
 ctx.fillText(valStr, pad.left + pw, labelY);

 if (w >= 580) {
 var valW = ctx.measureText(valStr).width + 10;
 ctx.font = '500 11px "IBM Plex Mono", system-ui, sans-serif';
 ctx.fillStyle = pal.tick;
 ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
 }

 ctx.fillStyle = pal.trackBg;
 roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2);
 ctx.fill();

 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
 barGrad.addColorStop(0, items[i].cStart);
 barGrad.addColorStop(1, items[i].cEnd);
 ctx.fillStyle = barGrad;
 roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2);
 ctx.fill();

 hitRegions.chartBars.push({
 idx: i,
 x: pad.left, y: rowTop, w: pw, h: rowH,
 html: isEn()
 ? ('<strong>' + items[i].label + ': ' + items[i].val.toFixed(1) + '%</strong><br/>• Metric: ' + items[i].sub + '<br/>• Insight: ' + items[i].note)
 : ('<strong>' + items[i].label + '：' + items[i].val.toFixed(1) + '%</strong><br/>• 数据明细：' + items[i].sub + '<br/>• 业务解读：' + items[i].note)
 });
 }
 }

 /* Chart 4: FY2022–FY2026E Annual Bookings ($B) & Free Cash Flow ($B) */
 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartEps = [];

 var years = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026E'];
 var subYears = isEn() ? ['(Post-COVID)', '(Turnaround)', '(+417% FCF)', '(+55% Surge)', '(9M+Q4 Mid)'] : ['(解封调整)', '(经营拐点)', '(FCF +417%)', '(爆款井喷)', '(前三季+Q4指引)'];
 var bookings = [2.87, 3.52, 4.37, 6.79, 6.90];
 var fcf = [-0.06, 0.12, 0.64, 1.35, 1.11];
 var devex = [0.62, 0.74, 0.92, 1.50, 1.62];

 var pad = { top: 26, right: 54, bottom: 44, left: 48 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;

 var minB = 0.0, maxB = 8.0;
 var minF = -0.2, maxF = 1.8;

 for (var g = 0; g <= 4; g++) {
 var ratio = g / 4;
 var gy = pad.top + ph - ratio * ph;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(pad.left, gy);
 ctx.lineTo(pad.left + pw, gy);
 ctx.stroke();

 var bTick = minB + ratio * (maxB - minB);
 var fTick = minF + ratio * (maxF - minF);
 ctx.font = '11px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick;
 ctx.textAlign = 'right';
 ctx.fillText('$' + bTick.toFixed(1) + 'B', pad.left - 7, gy);
 ctx.textAlign = 'left';
 ctx.fillStyle = pal.c2;
 ctx.fillText((fTick < 0 ? '-$' + Math.abs(fTick).toFixed(2) : '$' + fTick.toFixed(2)) + 'B', pad.left + pw + 7, gy);
 }

 /* $1.0B Annual FCF Milestone Dashed Line */
 var targetY = pad.top + ph - ((1.00 - minF) / (maxF - minF)) * ph;
 ctx.save();
 ctx.setLineDash([5, 5]);
 ctx.strokeStyle = pal.c3;
 ctx.lineWidth = 1.5;
 ctx.beginPath();
 ctx.moveTo(pad.left, targetY);
 ctx.lineTo(pad.left + pw, targetY);
 ctx.stroke();
 ctx.restore();

 var step = pw / years.length;
 var barW = Math.min(46, Math.max(24, step * 0.42));
 var linePts = [];

 for (var i = 0; i < years.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (hoverState.chartEps === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 6);
 ctx.fill();
 }

 if (state.epsSeries.eps) {
 var bh = ((bookings[i] - minB) / (maxB - minB)) * ph;
 var bx = cx - barW / 2;
 var by = pad.top + ph - bh;
 var eGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
 if (i === 4) {
 eGrad.addColorStop(0, '#66B2FF');
 eGrad.addColorStop(1, '#1985F1');
 } else {
 eGrad.addColorStop(0, '#3399FF');
 eGrad.addColorStop(1, '#0066CC');
 }
 ctx.fillStyle = eGrad;
 topRoundedBar(ctx, bx, by, barW, bh, 6);
 ctx.fill();

 ctx.fillStyle = '#FFFFFF';
 ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText('$' + bookings[i].toFixed(2) + 'B', cx, by + 17);
 }

 var oy = pad.top + ph - ((fcf[i] - minF) / (maxF - minF)) * ph;
 linePts.push({ x: cx, y: oy, fcf: fcf[i] });

 ctx.fillStyle = pal.text;
 ctx.font = '700 11.5px system-ui, sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(years[i], cx, pad.top + ph + 19);
 if (subYears[i]) {
 ctx.fillStyle = pal.tick;
 ctx.font = '10px system-ui, sans-serif';
 ctx.fillText(subYears[i], cx, pad.top + ph + 33);
 }

 var fcfStr = fcf[i] < 0 ? ('-$' + Math.abs(fcf[i]).toFixed(2) + 'B') : ('$' + fcf[i].toFixed(2) + 'B');
 hitRegions.chartEps.push({
 idx: i,
 x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
 html: isEn()
 ? ('<strong>' + years[i] + ' ' + subYears[i] + '</strong><br/>' +
 '• Annual Bookings: <strong>$' + bookings[i].toFixed(2) + 'B</strong><br/>' +
 '• Free Cash Flow: <strong>' + fcfStr + '</strong><br/>' +
 '• Creator DevEx Payouts: <strong>~$' + devex[i].toFixed(2) + 'B</strong>')
 : ('<strong>' + years[i] + ' ' + subYears[i] + '</strong><br/>' +
 '• 全年预订额 Bookings：<strong>$' + bookings[i].toFixed(2) + 'B</strong><br/>' +
 '• 全年自由现金流 FCF：<strong>' + fcfStr + '</strong><br/>' +
 '• 创作者分成池 DevEx：<strong>~$' + devex[i].toFixed(2) + 'B</strong>')
 });
 }

 if (w >= 460) {
 drawValueBadge(ctx, isEn() ? 'FCF $1.0B Line' : 'FCF $1.0B 里程碑', pad.left + pw * 0.28, targetY - 12, pal.c3, pal);
 }

 if (state.epsSeries.oci) {
 ctx.save();
 drawSmoothLine(ctx, linePts);
 ctx.strokeStyle = pal.c2;
 ctx.lineWidth = 2.8;
 ctx.stroke();
 ctx.restore();

 for (var m = 0; m < linePts.length; m++) {
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath();
 ctx.arc(linePts[m].x, linePts[m].y, 6, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = pal.c2;
 ctx.beginPath();
 ctx.arc(linePts[m].x, linePts[m].y, 4.2, 0, Math.PI * 2);
 ctx.fill();
 var bTxt = linePts[m].fcf < 0 ? ('-$' + Math.abs(linePts[m].fcf).toFixed(2) + 'B') : ('$' + linePts[m].fcf.toFixed(2) + 'B');
 drawValueBadge(ctx, bTxt, linePts[m].x, linePts[m].y - 16, pal.c2, pal);
 }
 }
 }

 /* Chart 5: 12-Month Cumulative Studio DevEx Cashflow Dual-Curve Chart */
 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartSim = [];

 var m = computeStudioModel();
 var months = 12;
 var activeCum = [];
 var legacyCum = [];
 for (var mo = 0; mo <= months; mo++) {
 activeCum.push(m.monthlyActive * mo);
 legacyCum.push(m.monthlyLegacy * mo);
 }

 var maxVal = Math.max(activeCum[months], legacyCum[months], 10000) * 1.10;
 var pad = { top: 20, right: 20, bottom: 28, left: 62 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g;
 var gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(pad.left, gy);
 ctx.lineTo(pad.left + pw, gy);
 ctx.stroke();

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'right';
 ctx.textBaseline = 'middle';
 var labelStr = v >= 1000000 ? ('$' + (v / 1000000).toFixed(2) + 'M') : ('$' + Math.round(v / 1000) + 'k');
 ctx.fillText(labelStr, pad.left - 7, gy);
 }

 var stepX = pw / months;

 /* Legacy $0.0035 dashed curve */
 ctx.save();
 ctx.setLineDash([4, 4]);
 ctx.strokeStyle = pal.tick;
 ctx.lineWidth = 1.7;
 ctx.beginPath();
 for (var i = 0; i <= months; i++) {
 var px = pad.left + (i / months) * pw;
 var py = pad.top + ph - (legacyCum[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py);
 else ctx.lineTo(px, py);
 }
 ctx.stroke();
 ctx.restore();

 /* Active blended DevEx curve + area fill */
 ctx.beginPath();
 for (var j = 0; j <= months; j++) {
 var tx = pad.left + (j / months) * pw;
 var ty = pad.top + ph - (activeCum[j] / maxVal) * ph;
 if (j === 0) ctx.moveTo(tx, ty);
 else ctx.lineTo(tx, ty);

 var diff = activeCum[j] - legacyCum[j];
 hitRegions.chartSim.push({
 idx: j,
 x: tx - Math.max(6, stepX * 0.5), y: pad.top, w: Math.max(12, stepX), h: ph + 24,
 html: isEn()
 ? ('<strong>Month ' + j + ' Cumulative Studio Payout</strong><br/>' +
 '• Active Model Payout: <strong>' + formatCurrency(activeCum[j]) + '</strong><br/>' +
 '• Legacy $0.0035 Baseline: ' + formatCurrency(legacyCum[j]) + '<br/>' +
 '• O18 + Rate Hike + Ads Gain: <strong style="color:#22C55E;">+' + formatCurrency(diff) + '</strong>')
 : ('<strong>运营第 ' + j + ' 个月累计净提现对比</strong><br/>' +
 '• 当前模型累计到手：<strong>' + formatCurrency(activeCum[j]) + '</strong><br/>' +
 '• 旧版 $0.0035 基准：' + formatCurrency(legacyCum[j]) + '<br/>' +
 '• 新费率与广告/O18增益：<strong style="color:#22C55E;">+' + formatCurrency(diff) + '</strong>')
 });
 }
 ctx.strokeStyle = pal.c1;
 ctx.lineWidth = 2.8;
 ctx.stroke();

 ctx.lineTo(pad.left + pw, pad.top + ph);
 ctx.lineTo(pad.left, pad.top + ph);
 ctx.closePath();
 var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 grad.addColorStop(0, 'rgba(0, 115, 230, 0.30)');
 grad.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
 ctx.fillStyle = grad;
 ctx.fill();

 if (hoverState.chartSim >= 0 && hoverState.chartSim <= months) {
 var hi = hoverState.chartSim;
 var hx = pad.left + (hi / months) * pw;
 var hy1 = pad.top + ph - (activeCum[hi] / maxVal) * ph;
 var hy2 = pad.top + ph - (legacyCum[hi] / maxVal) * ph;
 ctx.save();
 ctx.setLineDash([3, 3]);
 ctx.strokeStyle = pal.c1;
 ctx.lineWidth = 1.2;
 ctx.beginPath();
 ctx.moveTo(hx, pad.top);
 ctx.lineTo(hx, pad.top + ph);
 ctx.stroke();
 ctx.restore();

 ctx.fillStyle = pal.tick;
 ctx.beginPath();
 ctx.arc(hx, hy2, 4, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = pal.c1;
 ctx.beginPath();
 ctx.arc(hx, hy1, 5.5, 0, Math.PI * 2);
 ctx.fill();
 }

 var keyMonths = [0, 6, 12];
 for (var km = 0; km < keyMonths.length; km++) {
 var mIdx = keyMonths[km];
 var kx = pad.left + (mIdx / months) * pw;
 var kyY = pad.top + ph - (activeCum[mIdx] / maxVal) * ph;
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath();
 ctx.arc(kx, kyY, 5, 0, Math.PI * 2);
 ctx.fill();
 ctx.fillStyle = pal.c1;
 ctx.beginPath();
 ctx.arc(kx, kyY, 3.5, 0, Math.PI * 2);
 ctx.fill();
 }

 var endX = pad.left + pw;
 var endY = pad.top + ph - (activeCum[months] / maxVal) * ph;
 drawValueBadge(ctx, formatCurrency(activeCum[months]), Math.min(w - 46, endX - 28), Math.max(pad.top + 12, endY - 14), pal.c1, pal);

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'alphabetic';
 ctx.textAlign = 'left';
 ctx.fillText(isEn() ? 'Month 0' : '第 0 月', pad.left, pad.top + ph + 19);
 ctx.textAlign = 'center';
 ctx.fillText((isEn() ? 'Month 6' : '第 6 月') + ' (' + formatCurrency(activeCum[6]) + ')', pad.left + 0.5 * pw, pad.top + ph + 19);
 ctx.textAlign = 'right';
 ctx.fillText(isEn() ? 'Month 12' : '第 12 月', pad.left + pw, pad.top + ph + 19);
 }

 var redrawMap = {
 chartCh1: drawCh1Chart,
 chartRadar: drawRadarChart,
 chartBars: drawHorizontalBars,
 chartEps: drawEpsComboChart,
 chartSim: drawSimChart
 };

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawHorizontalBars();
 drawEpsComboChart();
 drawSimChart();
 }

 /* ======================================================================
 7. Hover & Touch Tooltips + Active Crosshair Redraw
 ====================================================================== */
 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;

 function handlePointer(clientX, clientY) {
 var rect = canvas.getBoundingClientRect();
 var mx = clientX - rect.left;
 var my = clientY - rect.top;
 var regions = hitRegions[canvasId] || [];
 var found = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) {
 found = r;
 break;
 }
 }
 var nextIdx = found && typeof found.idx === 'number' ? found.idx : -1;
 if (hoverState[canvasId] !== nextIdx) {
 hoverState[canvasId] = nextIdx;
 if (redrawMap[canvasId]) redrawMap[canvasId]();
 }
 if (found) {
 tip.innerHTML = found.html;
 tip.style.display = 'block';
 var tipW = tip.offsetWidth || 250;
 var tipH = tip.offsetHeight || 72;
 var leftPos = clientX + 14;
 if (leftPos + tipW > window.innerWidth - 12) {
 leftPos = Math.max(12, clientX - tipW - 14);
 }
 var topPos = Math.max(12, Math.min(window.innerHeight - tipH - 12, clientY - 18));
 tip.style.left = leftPos + 'px';
 tip.style.top = topPos + 'px';
 } else {
 tip.style.display = 'none';
 }
 }

 canvas.addEventListener('mousemove', function (e) {
 handlePointer(e.clientX, e.clientY);
 });

 canvas.addEventListener('touchstart', function (e) {
 if (e.touches && e.touches[0]) {
 handlePointer(e.touches[0].clientX, e.touches[0].clientY);
 }
 }, { passive: true });

 canvas.addEventListener('mouseleave', function () {
 if (hoverState[canvasId] !== -1) {
 hoverState[canvasId] = -1;
 if (redrawMap[canvasId]) redrawMap[canvasId]();
 }
 tip.style.display = 'none';
 });
 }

 /* ======================================================================
 8. Standalone HTML Download Export
 ====================================================================== */
 function exportStandaloneHtml() {
 var doctype = '<!DOCTYPE html>\n';
 var htmlContent = doctype + document.documentElement.outerHTML;
 var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'Roblox_Game_Analysis.html';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () {
 URL.revokeObjectURL(url);
 }, 1500);
 showToast(isEn() ? 'Exported standalone file: Roblox_Game_Analysis.html' : '已导出独立网页 Roblox_Game_Analysis.html');
 }

 /* ======================================================================
 9. Event Listeners & Initialization
 ====================================================================== */
 function init() {
 var rawTheme = safeGetStorage(STORAGE_THEME_KEY);
 var savedTheme = rawTheme ? String(rawTheme).replace(/^"|"$/g, '') : '';
 if (savedTheme === 'light' || savedTheme === 'dark') {
 state.theme = savedTheme;
 }
 var rawLang = safeGetStorage(STORAGE_LANG_KEY);
 var savedLang = rawLang ? String(rawLang).replace(/^"|"$/g, '') : '';
 if (savedLang === 'zh' || savedLang === 'en') {
 state.lang = savedLang;
 }
 window.addEventListener('storage', function (ev) {
 if (ev.key === STORAGE_THEME_KEY && ev.newValue) {
 var nt = String(ev.newValue).replace(/^"|"$/g, '');
 if ((nt === 'light' || nt === 'dark') && nt !== state.theme) applyTheme(nt, true);
 } else if (ev.key === STORAGE_LANG_KEY && ev.newValue) {
 var nl = String(ev.newValue).replace(/^"|"$/g, '');
 if ((nl === 'zh' || nl === 'en') && nl !== state.lang) applyLanguage(nl, true);
 }
 });
 var savedChecks = safeGetStorage(STORAGE_CHECK_KEY);
 if (savedChecks) {
 try {
 var parsed = JSON.parse(savedChecks);
 if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS.length) {
 state.checks = parsed.map(Boolean);
 }
 } catch (e) {
 /* Ignore malformed storage */
 }
 }

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 var abThm = document.getElementById('appbarThemeBtn');
 if (abThm) {
 abThm.addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 }

 /* Sidebar & Theme Controls */
 document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
 document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
 void 0;
 void 0;

 /* Sidebar Export & Print Buttons */
 void 0;
 void 0;

 /* Close mobile drawer on TOC click */
 var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
 for (var t = 0; t < tocLinks.length; t++) {
 tocLinks[t].addEventListener('click', closeMobileDrawer);
 }

 /* Quick Jump Search (Ctrl+K / Cmd+K) */
 var jumpInput = document.getElementById('quickJumpInput');
 var jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase();
 var activeJump = isEn() ? QUICK_JUMP_EN : QUICK_JUMP_INDEX;
 var list = activeJump.filter(function (item, idx) {
 var zhIt = QUICK_JUMP_INDEX[idx] || item;
 var enIt = QUICK_JUMP_EN[idx] || item;
 return !kw || (zhIt.title + ' ' + zhIt.sub + ' ' + enIt.title + ' ' + enIt.sub).toLowerCase().indexOf(kw) !== -1;
 });
 if (!list.length) {
 jumpPop.innerHTML = '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">' + (isEn() ? 'No matching section' : '未匹配到对应章节') + '</div>';
 } else {
 jumpPop.innerHTML = list.map(function (item) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + item.sec + '">' +
 '<span class="quick-jump-item-title">' + escapeHtml(item.title) + '</span>' +
 '<span class="quick-jump-item-sub">' + escapeHtml(item.sub) + '</span>' +
 '</button>';
 }).join('');
 }
 jumpPop.classList.add('open');
 }

 jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
 jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
 jumpPop.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-jump-sec]');
 if (!btn) return;
 var targetId = btn.getAttribute('data-jump-sec');
 var secEl = document.getElementById(targetId);
 if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) {
 if (!e.target.closest('.quick-search-wrap')) {
 jumpPop.classList.remove('open');
 }
 });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
 e.preventDefault();
 jumpInput.focus();
 } else if (e.key === 'Escape') {
 jumpPop.classList.remove('open');
 closeMobileDrawer();
 }
 });

 /* Ch 01 View A / View B Tabs */
 var ch1Btns = document.querySelectorAll('[data-ch1-view]');
 for (var c = 0; c < ch1Btns.length; c++) {
 ch1Btns[c].addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 syncCh1HeaderText();
 drawCh1Chart();
 });
 }

 /* Expandable Matrix Card Collapses */
 var collapseBtns = document.querySelectorAll('[data-collapse-target]');
 for (var m = 0; m < collapseBtns.length; m++) {
 collapseBtns[m].addEventListener('click', function () {
 var panelId = this.getAttribute('data-collapse-target');
 var panel = document.getElementById(panelId);
 if (!panel) return;
 panel.classList.toggle('open');
 syncCollapseButtonsText();
 });
 }

 /* Ch 02 Pillar Selection & Radar Legend Toggles */
 var pillarCards = document.querySelectorAll('[data-pillar]');
 for (var p = 0; p < pillarCards.length; p++) {
 pillarCards[p].addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 for (var k = 0; k < pillarCards.length; k++) {
 pillarCards[k].classList.toggle('active', k === idx);
 }
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[idx] + '</div>';
 drawRadarChart();
 });
 }

 var radarPills = document.querySelectorAll('[data-radar-key]');
 for (var r = 0; r < radarPills.length; r++) {
 radarPills[r].addEventListener('click', function () {
 var key = this.getAttribute('data-radar-key');
 state.radarSeries[key] = !state.radarSeries[key];
 if (!state.radarSeries.mo && !state.radarSeries.pmi && !state.radarSeries.ko) {
 state.radarSeries[key] = true;
 }
 this.classList.toggle('muted', !state.radarSeries[key]);
 drawRadarChart();
 });
 }

 /* Ch 03 Peer Search & Filter */
 document.getElementById('peerSearchInput').addEventListener('input', function () {
 state.peerQuery = this.value;
 renderPeerTable();
 });
 var peerFilterBtns = document.querySelectorAll('[data-peer-filter]');
 for (var pf = 0; pf < peerFilterBtns.length; pf++) {
 peerFilterBtns[pf].addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 for (var x = 0; x < peerFilterBtns.length; x++) {
 peerFilterBtns[x].classList.toggle('active', peerFilterBtns[x] === this);
 }
 renderPeerTable();
 });
 }

 /* Ch 04 Simulator Controls */
 var pSlider = document.getElementById('simPrincipalSlider');
 var ySlider = document.getElementById('simYearsSlider');
 var cSlider = document.getElementById('simCagrSlider');
 var dToggle = document.getElementById('simDripToggle');

 pSlider.addEventListener('input', function () {
 state.sim.ccu = parseFloat(this.value) || 15000;
 state.sim.preset = '';
 updateSimulatorUI();
 });
 ySlider.addEventListener('input', function () {
 state.sim.arpdauCents = parseInt(this.value, 10) || 9;
 state.sim.preset = '';
 updateSimulatorUI();
 });
 cSlider.addEventListener('input', function () {
 state.sim.o18Share = parseFloat(this.value) || 0;
 state.sim.preset = '';
 updateSimulatorUI();
 });
 dToggle.addEventListener('change', function () {
 state.sim.plusAds = !!this.checked;
 updateSimulatorUI();
 });

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var pb = 0; pb < presetBtns.length; pb++) {
 presetBtns[pb].addEventListener('click', function () {
 var key = this.getAttribute('data-preset');
 var cfg = PRESETS[key];
 if (!cfg) return;
 state.sim.ccu = cfg.ccu;
 state.sim.arpdauCents = cfg.arpdauCents;
 state.sim.o18Share = cfg.o18Share;
 state.sim.plusAds = cfg.plusAds;
 state.sim.preset = key;
 pSlider.value = String(cfg.ccu);
 ySlider.value = String(cfg.arpdauCents);
 cSlider.value = String(cfg.o18Share);
 dToggle.checked = cfg.plusAds;
 updateSimulatorUI();
 });
 }

 /* Ch 06 Checklist Controls */
 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var input = e.target.closest('[data-check-input]');
 if (!input) return;
 var idx = parseInt(input.getAttribute('data-check-input'), 10);
 state.checks[idx] = !!input.checked;
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast(isEn() ? 'Checked all 6 Roblox ecosystem diagnostic criteria' : '已勾选全部 6 项 Roblox 爆款与生态核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
 renderChecklist();
 showToast(isEn() ? 'Checklist reset to default baseline (50%)' : '核查清单已恢复默认基准状态 (50%)');
 });

 /* Reading Progress & Scroll-Spy */
 function updateScrollProgress() {
 var docEl = document.documentElement;
 var scrollTop = window.scrollY || docEl.scrollTop || 0;
 var maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
 var pct = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
 document.getElementById('readingProgressBar').style.width = pct + '%';
 }
 window.addEventListener('scroll', updateScrollProgress, { passive: true });
 updateScrollProgress();

 if ('IntersectionObserver' in window) {
 var secObserver = new IntersectionObserver(function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 var id = entry.target.id;
 for (var i = 0; i < tocLinks.length; i++) {
 tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === id);
 }
 }
 });
 }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });

 for (var s = 0; s <= 7; s++) {
 var secNode = document.getElementById('sec-0' + s);
 if (secNode) secObserver.observe(secNode);
 }
 }

 /* Wire Tooltips & Resize Redraw */
 wireCanvasTooltip('chartCh1');
 wireCanvasTooltip('chartRadar');
 wireCanvasTooltip('chartBars');
 wireCanvasTooltip('chartEps');
 wireCanvasTooltip('chartSim');

 /* Wire Ch1 & Ch4 Legend Series Toggles */
 var ch1SeriesBtns = document.querySelectorAll('[data-ch1-series]');
 for (var csIdx = 0; csIdx < ch1SeriesBtns.length; csIdx++) {
 ch1SeriesBtns[csIdx].addEventListener('click', function () {
 var sk = this.getAttribute('data-ch1-series');
 state.ch1Series[sk] = !state.ch1Series[sk];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
 this.classList.toggle('muted', !state.ch1Series[sk]);
 drawCh1Chart();
 });
 }

 var epsSeriesBtns = document.querySelectorAll('[data-eps-series]');
 for (var esIdx = 0; esIdx < epsSeriesBtns.length; esIdx++) {
 epsSeriesBtns[esIdx].addEventListener('click', function () {
 var ek = this.getAttribute('data-eps-series');
 state.epsSeries[ek] = !state.epsSeries[ek];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[ek] = true;
 this.classList.toggle('muted', !state.epsSeries[ek]);
 drawEpsComboChart();
 });
 }

 var resizeTimer = null;
 function scheduleRedraw() {
 if (resizeTimer) clearTimeout(resizeTimer);
 resizeTimer = setTimeout(renderAllCharts, 60);
 }
 window.addEventListener('resize', scheduleRedraw);
 if ('ResizeObserver' in window) {
 var mainEl = document.querySelector('.main-content');
 if (mainEl) {
 var ro = new ResizeObserver(scheduleRedraw);
 ro.observe(mainEl);
 }
 }
 }

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', init);
 } else {
 init();
 }
 })();
 