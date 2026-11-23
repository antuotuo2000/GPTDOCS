
  (function () {
    'use strict';

    var DATA = {"docTitleZh": "《NBA 2K》篮球模拟与虚拟城市生态 IP 深度研究报告 | 2K · Visual Concepts", "docTitleEn": "NBA 2K Franchise IP Deep Dive | 2K Sports & Visual Concepts", "exportFileName": "ttwo_ip_nba_2k.html", "storageCheckKey": "ttwo_ip_nba2k_check_v1", "richMap": {"feat_0": {"zh": "直接抓取真实 NBA 电视转播画面中库里、约基奇、亚历山大等球星的运球急停与投篮手型，通过计算机视觉自动转化为数千帧游戏骨骼动画，构筑竞争对手无法短期模仿的手感壁垒 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>。", "en": "Translates real NBA broadcast footage directly into signature jump shots, crossovers, and footwork—creating a proprietary animation library no new entrant can replicate <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>."}, "feat_1": {"zh": "《NBA 2K》早已超越赛场 5v5，将自创球员养成（MyPLAYER）、街头球场 3v3 约战、Nike/Jordan 联名球鞋穿搭、说唱厂牌音乐与滑板卡丁车融合成青年篮球生活方式社区 <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>。", "en": "Transcends 5v5 basketball by turning MyCAREER's 'The City' into a persistent streetwear, sneakerhead, hip-hop, and 3v3 streetball MMO <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>."}, "feat_2": {"zh": "每年 9 月随新赛季阵容更新重启经济周期：核心玩家不仅支付 $69.99–$99.99 购买新作，还为快速成型自建号充值 VC、抽取传奇球星卡并购买每 6 周一期的 Pro/Hall of Fame 赛季通行证 <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>。", "en": "Resets the progression economy every September: combining $69.99–$99.99 annual copy sales with MyPLAYER VC upgrades, MyTEAM card packs, and 6-week Season Passes <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>."}, "kpi_0": {"zh": "按销量与销售额双口径稳居世界第一篮球游戏，在拟真主机篮球赛道市占率接近 100% <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>。", "en": "#1 basketball video game globally in both units and dollars, holding ~100% console sim share <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>."}, "kpi_1": {"zh": "销量同比增长 9%，并在 FY26 Q3 带动经常性消费（RCS）同比大增 30%，刷新系列单代吸金纪录 <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>。", "en": "Units grew +9% YoY past 12M while Q3 FY26 RCS jumped +30% YoY to a franchise high <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>."}, "kpi_2": {"zh": "2026年9月4日发售（含 Switch 2 原生次世代版），在玩家攒钱等待 GTA VI 的逆风下仍狂卖超 400 万份 <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>。", "en": "Launched Sep 4, 2026 (including native Switch 2), topping 4M units inside Q2 FY27 <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>."}, "kpi_3": {"zh": "7 年 $11 亿长约锁定联盟与球员工会权益；中国《美职篮全明星》上线迅速突破 1,100 万注册玩家 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/Take-Two_Interactive\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia TTWO &#8599;</a>。", "en": "Backed by landmark $1.1B NBA partnership; China's NBA 2K All-Star crossed 11M registered users <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/Take-Two_Interactive\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia TTWO &#8599;</a>."}, "mat_col_0": {"zh": "<strong>注意区别官方非独占授权：</strong>不同于 NFL 美式橄榄球给 EA 签独占排他协议，NBA 从未禁止其他厂商做拟真游戏——《NBA 2K》的垄断是靠纯粹产品力打出来的“市场自然垄断”！", "en": "<strong>Earned vs. Contractual Monopoly:</strong> Unlike EA's exclusive NFL simulation contract, NBA 2K's ~100% market share was earned organically by out-executing competitors on court physics."}, "mat_body_0": {"zh": "EA 曾在 2010–2019 年四度尝试取消或重启《NBA Live》（最后一部为 NBA Live 19），但篮球运动在狭小半场内十人身体对抗、护球转身、盖帽干扰的帧判定复杂度远高于开阔草皮运动。Visual Concepts 二十七年积累的底层碰撞库叠加 ProPLAY 与街头社交关系链，让挑战者面临“手感差一点就没人组队”的网络效应绝境 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>。", "en": "EA canceled or delayed NBA Live repeatedly before halting it after NBA Live 19. Five-on-five half-court contact physics, ProPLAY signature animations, and friend-group lock-in inside The City form a network-effect wall <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>."}, "mat_col_1": {"zh": "<strong>双赢分工机制：</strong>Visual Concepts 输出核心 ProPLAY 引擎与球员数据资产，腾讯光子/体育团队负责本地化电竞赛事、微信/QQ 社交裂变与防作弊运维。", "en": "<strong>Capital-Light Structure:</strong> Visual Concepts supplies core simulation tech while Tencent handles WeChat/QQ social distribution and Chinese esports."}, "mat_body_1": {"zh": "中国拥有全球最庞大的篮球受众群体，但以 PC 网游与智能手机为主。2K 携手腾讯联合研发端游《NBA 2K Online 2》常年稳居中国体育网游榜首，2025 年 3 月上线的正统拟真手游<strong>《NBA 2K All-Star（美职篮全明星）》更迅速突破 1,100 万注册用户</strong>，为 Take-Two 贡献极高利润率的授权与分成收入 <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>。", "en": "Adapting to China's F2P PC/mobile market via Tencent, NBA 2K Online 2 and March 2025's <strong>NBA 2K All-Star (>11M registered players)</strong> monetize massive Chinese basketball fandom without Take-Two bearing local server or UA risk <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>."}, "mat_col_2": {"zh": "<strong>双向赋能：</strong>品牌植入不仅带来广告合作收入，更刺激玩家购买 VC 为自创角色换装最新限量球鞋。", "en": "<strong>Cosmetic Flywheel:</strong> Authentic branded apparel drives non-pay-to-win cosmetic VC spend across Park courts."}, "mat_body_2": {"zh": "真实 NBA 球星本人（杜兰特、布克、塔图姆、文班亚马）在休赛期争相在社交媒体讨论自己的 2K 能力值（2K Rating Reveal 已成每年 8 月联盟固定娱乐大戏），Nike、 Converse、New Balance 常选择在《篮球之城》同步首发新款签名球鞋数字版 <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>。", "en": "Annual 2K Rating reveals dominate NBA social media every August, while Nike, Jordan, and streetwear labels debut digital sneakers inside The City—embedding NBA 2K into youth culture <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>."}, "mat_col_3": {"zh": "<strong>长期铁律：</strong>保持零氪玩家合理的毕业路径，反而能留住足够大的匹配池供大 R 体验社交成就感。", "en": "<strong>Retention Rule:</strong> Fair F2P progression keeps matchmaking pools vibrant, sustaining long-term whale engagement."}, "mat_body_3": {"zh": "在《NBA 2K23–2K24》期间，打造一个满级 99 OVR 自建号所需 VC 高达数十万（折合额外氪金 $50–$100），曾引发欧美社区差评与集体诉讼讨论；Visual Concepts 在《2K25–2K26》通过引入“重生（Rebirth）”老号直升福利、调整徽章退化机制及恢复 MyTEAM 拍卖行修复玩家信任，直接促成了《2K26》销量与 RCS 双创纪录 <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>。", "en": "Steep VC costs to max out a MyPLAYER drew community pushback in 2K23–2K24; restoring the MyTEAM Auction House, removing badge regression, and adding Rebirth perks in 2K25–2K26 repaired sentiment and propelled record 2K26 RCS <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>."}, "econ_0": {"zh": "普通单机大作卖完 $70 买断（加季票至多 $80）即告终结；而在《NBA 2K》中，受全明星版/名人堂版高阶预购拉动，首发买断均价较高，且逾四成活跃玩家全年还会通过购买 VC（$19.99–$99.99 档位）与多期 $9.99 Pro Pass 持续消费，使<strong>单代年化总预订额轻松突破 $12 亿–$14 亿美元量级</strong> <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>。", "en": "Unlike standalone single-player titles capped at $70, NBA 2K layers All-Star/Hall-of-Fame deluxe editions atop year-round VC packs ($19.99–$99.99) and 6-week $9.99 Pro Passes—lifting <strong>annual single-entry gross bookings well past $1.2B–$1.4B</strong> <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>."}, "econ_1": {"zh": "过去老款 Switch 机能孱弱难以流畅运行次世代篮球之城；2025–2026 年 Nintendo Switch 2 热销让主机玩家得以在差旅途中随时刷 MyTEAM 与街头赛，叠加腾讯《美职篮全明星》高毛利分成，显著抬升了非客厅场景的时长与付费率 <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>。", "en": "Native Gen-9 performance on Nintendo Switch 2 unlocks portable MyCAREER/MyTEAM grinding, while Tencent's NBA 2K All-Star adds high-margin Asian royalty streams <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>."}, "tl_0": {"zh": "1999 年 Visual Concepts 为世嘉主机打造初代《NBA 2K》（阿伦·艾弗森连续五年代言封面）；2004 年底 EA 买断 NFL 橄榄球独占权逼退世嘉体育部门，Take-Two 趁机于 2005 年 1 月仅花 <strong>2,400 万美元</strong>打包买下 Visual Concepts 与 2K 体育全线资产并创立 2K 发行厂牌 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/Take-Two_Interactive\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia TTWO &#8599;</a>。", "en": "Born on Sega Dreamcast in 1999 with cover star Allen Iverson; after EA locked up exclusive NFL rights in late 2004, Take-Two opportunistically bought Visual Concepts and the 2K sports slate from Sega in Jan 2005 for just <strong>$24 million</strong> <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/Take-Two_Interactive\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia TTWO &#8599;</a>."}, "tl_1": {"zh": "2010 年《NBA 2K11》请回迈克尔·乔丹打造传奇挑战模式（MC 90 分），同年 EA《NBA Elite 11》因严重 Bug 临发售前紧急取消；随后 2K 率先引入 VC 虚拟货币、MyTEAM 与街头公园（MyPARK），完成从体育单机向在线服务网游的质变 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>。", "en": "2010's NBA 2K11 featuring Michael Jordan (90 MC) coincided with EA canceling NBA Elite 11 days before launch; Visual Concepts then pioneered Virtual Currency (VC), MyTEAM, and MyPARK streetball <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>."}, "tl_2": {"zh": "2019 年签署 $11 亿长约巩固护城河；次世代升级“篮球之城”，引入 ProPLAY 视频动捕与双轨通行证，至 2026 年累计突破 1.75 亿份，携《NBA 2K27》与《美职篮全明星》稳坐集团现金牛王座 <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>。", "en": "Locked in the $1.1B NBA partnership in 2019, scaled The City and ProPLAY on Gen-9 hardware, surpassed 175M total copies, and scaled China's NBA 2K All-Star past 11M users <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>."}, "case_0": {"zh": "当年市场普遍认为失去 NFL 橄榄球版权后的 Visual Concepts 价值大打折扣；Take-Two 却看准其在篮球骨骼物理上的深厚内功低价收入囊中，如今单一个季度的《NBA 2K》净利润便数倍于当年全部收购价 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/Take-Two_Interactive\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia TTWO &#8599;</a>。", "en": "When EA signed the NFL exclusively, Wall Street wrote off Visual Concepts; Take-Two paid $24M in 2005 for a studio that now generates more operating profit in a single month than its entire purchase price <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/Take-Two_Interactive\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia TTWO &#8599;</a>."}, "case_1": {"zh": "《2K24》曾取消玩家自由交易的 MyTEAM 拍卖行引发硬核卡迷不满；研发团队在《2K25–2K26》恢复防工作室刷金升级版拍卖行并优化自建号重生福利，玩家回流直接推动 2K26 销量破 1,200 万、RCS 暴增 30% <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>。", "en": "Removing the MyTEAM Auction House in 2K24 hurt sentiment; bringing it back with anti-bot safeguards alongside Rebirth progression perks drove NBA 2K26 past 12M units and +30% RCS growth <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>."}, "case_2": {"zh": "2020–2023 年间 PC 版《NBA 2K》长期沿用 PS4 旧引擎遭全球 PC 玩家差评抗议；全面切换至次世代 ProPLAY 与篮球之城内核后，亚洲与欧洲高配 PC 玩家买断与内购活跃度显著跃升 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>。", "en": "Years of shipping last-gen ports on Steam depressed PC sentiment; delivering full Gen-9 ProPLAY and The City parity revitalized PC sales across Asia and Europe <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/NBA_2K\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia NBA 2K &#8599;</a>."}, "case_3": {"zh": "针对中国年轻球迷习惯手机触屏操作与碎片化三分钟街头赛的特点，《美职篮全明星》在保留主机级动作捕捉质感的同时适配微信开黑，成为 2K 国际市场最具爆发力的增长极 <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>。", "en": "Tailoring ProPLAY animations to mobile touch controls and 3-minute streetball matches allowed Tencent and 2K to onboard >11M Chinese players rapidly <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a>."}, "hero_h1": {"zh": "《NBA 2K》篮球模拟与虚拟城市 IP 深度分析：<span class=\"gradient-accent\">1.75亿份体坛霸主、虚拟货币飞轮与跨端全球扩张</span>", "en": "NBA 2K Franchise IP Deep Dive: <span class=\"gradient-accent\">175M-Unit Sports Monopoly, &#x27;The City&#x27; Virtual Economy &amp; Global Mobile Expansion</span>"}, "hero_lead": {"zh": "如果说《GTA》负责每隔十年的指数级脉冲跃升，那么 2K 旗下 Visual Concepts 打造的<strong>《NBA 2K》</strong>就是过去二十年每年风雨无阻为 Take-Two 输血的第一大主机经常性消费（RCS）支柱 <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>。自 2005 年仅花 2,400 万美元从世嘉手中收购该系列以来，《NBA 2K》凭借极致的球星动作拟真硬生生将昔日霸主 EA《NBA Live》挤出市场，累计销量突破 <strong>1.75 亿份</strong>，高居全球互动娱乐历史前 20 大 IP <a class=\"cite-link\" href=\"https://crackthemarket.substack.com/p/take-two-gta-vi-is-a-platform-not\" target=\"_blank\" rel=\"noopener noreferrer\">Crack The Market &#8599;</a> <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/c4c4f7f0-6a7c-4159-b97f-089a76580c38\" target=\"_blank\" rel=\"noopener noreferrer\">August 2025 IR &#8599;</a>。在刚过去的周期中，《NBA 2K26》出货突破 <strong>1,200 万份（同比 +9%）</strong>并推动单季 RCS 暴涨 +30% 创历史新高；2026 年 9 月上市的《NBA 2K27》同步登陆 PS5、XSX、Switch 2 与 PC，首季即售出<strong>超 400 万份</strong>（创系列历史第二佳首发），同时携手腾讯在华推出的手游《NBA 2K All-Star（美职篮全明星）》注册用户已突破 <strong>1,100 万人</strong> <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a> <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>。", "en": "While Rockstar delivers generational cultural spikes, 2K's <strong>NBA 2K</strong>—developed by Visual Concepts—serves as Take-Two's relentless, clockwork annual cash-flow and Recurrent Consumer Spending (RCS) engine <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566\" target=\"_blank\" rel=\"noopener noreferrer\">May 2026 IR Deck &#8599;</a>. Acquired from Sega for just $24 million in 2005, NBA 2K out-innovated EA's NBA Live out of existence to surpass <strong>175 million lifetime units sold</strong>, ranking among the Top 20 franchises in interactive entertainment history <a class=\"cite-link\" href=\"https://crackthemarket.substack.com/p/take-two-gta-vi-is-a-platform-not\" target=\"_blank\" rel=\"noopener noreferrer\">Crack The Market &#8599;</a> <a class=\"cite-link\" href=\"https://ir.take2games.com/static-files/c4c4f7f0-6a7c-4159-b97f-089a76580c38\" target=\"_blank\" rel=\"noopener noreferrer\">August 2025 IR &#8599;</a>. Most recently, <strong>NBA 2K26 shipped >12 million units (+9% YoY)</strong> with record RCS (+30% in Q3 FY26), <strong>NBA 2K27 sold >4 million units</strong> in its September 2026 launch window across PS5, XSX, Switch 2 & PC, and Tencent-partnered <strong>NBA 2K All-Star</strong> topped <strong>11 million registered users</strong> in China <a class=\"cite-link\" href=\"https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/\" target=\"_blank\" rel=\"noopener noreferrer\">GamesBeat Q2 &#8599;</a> <a class=\"cite-link\" href=\"https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo\" target=\"_blank\" rel=\"noopener noreferrer\">Horizons Capitals &#8599;</a>."}}, "quickJumpZh": [{"sec": "sec-00", "title": "00 IP 核心论点与垄断级指标", "sub": "全系超 1.75 亿份 · NBA 2K26 >1,200万份 · RCS +30%"}, {"sec": "sec-01", "title": "01 ProPLAY 动捕引擎与篮球之城架构", "sub": "真实 NBA 比赛录像转动画 · MyCAREER + MyTEAM 双飞轮"}, {"sec": "sec-02", "title": "02 四大竞争壁垒与体育年货雷达", "sub": "逼退 EA NBA Live · $11亿长约 · 球鞋嘻哈文化中枢"}, {"sec": "sec-03", "title": "03 NBA 2K 生态矩阵与全球体育竞品对比", "sub": "NBA 2K vs EA SPORTS FC vs Madden NFL vs MLB The Show"}, {"sec": "sec-04", "title": "04 买断+VC+通行证单客 LTV 测算器", "sub": "年出货量 × VC 充值渗透率 × 赛季通行证模拟器"}, {"sec": "sec-05", "title": "05 从 $2,400万世嘉收购到千亿级帝国", "sub": "2005 抄底 Visual Concepts · 击溃 NBA Live · 腾讯出海中国"}, {"sec": "sec-06", "title": "06 经济平衡与长线留存核查清单", "sub": "6 项 VC 肝度口碑、PC 次世代同构与 Switch 2 渗透核查"}, {"sec": "sec-07", "title": "07 官方数据来源与核验索引", "sub": "May 2026 IR Slide 15 · Q2 FY27 8-K · GamesBeat"}], "quickJumpEn": [{"sec": "sec-00", "title": "00 IP Thesis & Monopoly KPIs", "sub": ">175M Franchise Units · 2K26 >12M · +30% RCS Surge"}, {"sec": "sec-01", "title": "01 ProPLAY Tech & 'The City' MMO", "sub": "Broadcast Footage-to-Animation · MyCAREER + MyTEAM"}, {"sec": "sec-02", "title": "02 Four Moats & Sports Sim Radar", "sub": "Forced EA NBA Live Exit · $1.1B License · Hoops Culture Hub"}, {"sec": "sec-03", "title": "03 NBA 2K Matrix & Sports Peers", "sub": "NBA 2K vs. EA SPORTS FC vs. Madden NFL vs. MLB The Show"}, {"sec": "sec-04", "title": "04 Copy + VC + Pass LTV Simulator", "sub": "Annual Units × VC Spend Attach × Season Pass ARPU Sim"}, {"sec": "sec-05", "title": "05 From $24M Sega Buyout to Monopoly", "sub": "2005 Visual Concepts Deal · Defeating EA · China Mobile"}, {"sec": "sec-06", "title": "06 VC Economy & Retention Checklist", "sub": "6-Point Build Cost Balance, PC Gen-9 Parity & Switch 2"}, {"sec": "sec-07", "title": "07 Official Sources & Verification", "sub": "May 2026 IR Slide 15 · Q2 FY27 8-K · GamesBeat"}], "ch1Chart": {"tabA_zh": "视图 A：近五代单作出货与 RCS 势能", "tabA_en": "View A: Recent Entry Units & RCS Index", "tabB_zh": "视图 B：系列累计销量二十年腾飞史", "tabB_en": "View B: 20-Year Cumulative Milestone", "source_chip_zh": "数据源：Take-Two IR Decks & Q2 FY27 8-K", "source_chip_en": "Source: Take-Two IR & Q2 FY27 8-K", "viewA": {"title_zh": "《NBA 2K22 – NBA 2K26》单代周期出货量（百万份）与经常性消费（RCS）指数", "title_en": "NBA 2K22 – NBA 2K26 Annual Entry Units (Millions) & Recurrent Spending (RCS) Index", "sub_zh": "度过 2K24 世代过渡阵痛后，NBA 2K26 凭借 ProPLAY 调优与赛季通行证创下 >1,200 万份与历史最高 RCS", "sub_en": "NBA 2K26 rebounded past 12M units (+9% YoY) while setting an all-time franchise RCS high (+30% in Q3 FY26)", "left_meta_zh": "左轴：单代全周期出货销量 (百万份)", "left_meta_en": "Left Axis: Full-Cycle Entry Units (Millions)", "right_meta_zh": "右轴：单代经常性消费 RCS 指数 (2K22=100)", "right_meta_en": "Right Axis: Entry RCS Revenue Index (2K22=100)", "leg1_zh": "单代年货累计出货量 (百万份)", "leg1_en": "Annual Entry Units Sold-In (M)", "leg2_zh": "经常性消费者支出 RCS 指数 (2K22=100)", "leg2_en": "Recurrent Consumer Spending Index", "labels_zh": ["NBA 2K22", "NBA 2K23", "NBA 2K24", "NBA 2K25", "NBA 2K26"], "labels_en": ["NBA 2K22", "NBA 2K23", "NBA 2K24", "NBA 2K25", "NBA 2K26"], "s1": [10.5, 11.5, 11.0, 11.2, 12.2], "s2": [100, 108, 114, 128, 152], "min1": 0, "max1": 15, "p1": "", "u1": "M", "d1": 1, "min2": 70, "max2": 170, "p2": "Idx ", "u2": "", "d2": 0, "notes_zh": ["75周年纪念版稳守千万级基本盘", "乔丹挑战赛回归带动销量破 1,100 万份+", "科比纪念版首次引入 ProPLAY 技术与赛季通行证体系", "PC 版升级次世代 + 拍卖行回归带动日活与 VC 显著回暖", "销量突破 1,200 万份（+9% YoY），单季 RCS 暴涨 +30% 创系列纪录"], "notes_en": ["75th Anniversary Edition anchored double-digit million volume", "Michael Jordan Challenge return lifted sell-in past 11M+", "Kobe Bryant Edition debuted ProPLAY and tiered Season Passes", "PC Gen-9 upgrade & Auction House return accelerated engagement", "Surpassed >12M units (+9% YoY) with record-breaking RCS (+30% Q3)"]}, "viewB": {"title_zh": "《NBA 2K》系列历史累计总销量跃升曲线（2015 – 2026，百万份）", "title_en": "NBA 2K Cumulative Franchise Units Sold-In Trajectory (2015–2026, Millions)", "sub_zh": "从 2021 年的 1.12 亿份一路攀升至 2026 年超 1.75 亿份，平均每年稳定新增逾 1,200 万份", "sub_en": "Compounded from 112M cumulative units in Aug 2021 to >175M by late 2026", "left_meta_zh": "左轴：系列历史累计总销量 (百万份)", "left_meta_en": "Left Axis: Cumulative Franchise Units (M)", "right_meta_zh": "右轴：在线与移动衍生版覆盖指数", "right_meta_en": "Right Axis: Live & Mobile Reach Index", "leg1_zh": "系列历史累计总销量 (百万份)", "leg1_en": "Cumulative Franchise Units (M)", "leg2_zh": "全生态（含中国端手游/Arcade）触达指数", "leg2_en": "Global Multi-Platform Reach Index", "labels_zh": ["2017年", "2019年", "2021年", "2023年", "2026年"], "labels_en": ["2017", "2019", "2021", "2023", "2026"], "s1": [68, 90, 112, 140, 175], "s2": [55, 72, 95, 118, 160], "min1": 0, "max1": 200, "p1": "", "u1": "M", "d1": 0, "min2": 30, "max2": 180, "p2": "Idx ", "u2": "", "d2": 0, "notes_zh": ["EA NBA Live 尝试反扑失败，2K 彻底巩固垄断优势", "与 NBA 签署 7 年 $11 亿天价续约协议，单代首破 1,200 万份（2K20）", "2021年8月官方披露累计达 1.12 亿份（2K21 贡献 1,100 万份）", "跨入 PS5/XSX 主力周期，累计突破 1.40 亿份", "累计突破 1.75 亿份，中国手游《All-Star》再添 1,100 万增量用户"], "notes_en": ["Cemented simulation monopoly as EA's NBA Live faltered", "Signed 7-year $1.1B NBA licensing extension", "Reached 112M units in Aug 2021 (11M from NBA 2K21)", "Crossed 140M units as Gen-9 console base scaled", "Surpassed 175M units alongside 11M+ users in NBA 2K All-Star China"]}}, "pillarNotesZh": ["<strong>抵抗周期证明：</strong>即便在 2026 年秋玩家普遍存钱买《GTA VI》的背景下，《NBA 2K27》首季仍卖出超 400 万份。", "<strong>监管抗风险：</strong>欧洲部分国家严管随机开箱抽卡时，MyCAREER 确定性的属性升级与潮牌外观购买提供了天然合规缓冲。", "<strong>避免 FIFA 更名阵痛：</strong>不同于 EA 因授权费分歧被迫将 FIFA 改名 EA SPORTS FC，Take-Two 与 NBA 维持长期战略共生。", "<strong>现金牛角色：</strong>《NBA 2K》每年稳定产出的数亿美元营业利润是支撑 2K 孵化新 IP 的核心资金池。"], "pillarNotesEn": ["<strong>Resilience Proof:</strong> Even right ahead of GTA VI's Nov 2026 launch, NBA 2K27 sold >4M copies in Q2 FY27.", "<strong>Regulatory Hedge:</strong> Deterministic MyPLAYER attribute/cosmetic VC spending hedges European loot-box scrutiny.", "<strong>Brand Continuity:</strong> Avoided EA's costly FIFA rebrand friction through deep long-term alignment with the NBA.", "<strong>Internal Cash Engine:</strong> NBA 2K's annual profits self-fund 2K's core shooter and strategy bets."], "radar": {"title_zh": "全球四大顶级体育年货游戏 IP 五维竞争力雷达", "title_en": "5-Axis Global Flagship Sports Franchise Capability Radar", "sub_zh": "对比《NBA 2K》《EA SPORTS FC》与《Madden NFL》", "sub_en": "Comparing NBA 2K (2K) vs. EA SPORTS FC (EA) and Madden NFL (EA)", "axes_zh": ["赛场动作与AI拟真度", "自创角色社交大厅(The City)", "单客经常性消费ARPU", "全球跨洲际受众广度", "单机历史王朝模式深度"], "axes_en": ["On-Court Physics & AI", "Social Avatar Hub (The City)", "Per-Player RCS ARPU", "Global Cross-Region Reach", "Offline Franchise Depth"], "pillar_axis_map": [1, 2, 0, 4], "series_labels": {"s1_zh": "NBA 2K (Take-Two / 2K)", "s1_en": "NBA 2K (Take-Two / 2K)", "s2_zh": "EA SPORTS FC (艺电足球)", "s2_en": "EA SPORTS FC (Soccer)", "s3_zh": "Madden NFL (艺电橄榄球)", "s3_en": "Madden NFL (Football)"}, "s1": [95, 98, 96, 86, 97], "s2": [89, 72, 95, 99, 80], "s3": [80, 68, 88, 62, 75]}, "peerRowsZh": [{"category": "nba2k", "benchmark": true, "entity": "NBA 2K26 / NBA 2K27 主机与PC旗舰", "sub": "Visual Concepts · 全球年货正作", "col2": "ProPLAY 真实录像动捕 · 篮球之城 MyCAREER + MyTEAM + MyNBA Eras", "col3": "PS5/XSX/Switch 2/PC ($69.99–$99.99) + VC 虚拟货币 + 6周赛季通行证", "col4": "2K26 >1,200万份 · 2K27 首季 >400万份", "col5": "26Q3 RCS +30% 创历史纪录", "verdict": "Take-Two 第一大单品经常性现金牛：兼具千万级正价买断基本盘与双核内购高弹性。", "sourceLabel": "GamesBeat Q2", "sourceUrl": "https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/"}, {"category": "nba2k", "benchmark": true, "entity": "NBA 2K All-Star 美职篮全明星 & Online 2", "sub": "Visual Concepts × 腾讯游戏 (中国专供)", "col2": "原生次世代引擎移动端街头 3v3 与王朝 5v5 实时竞技，深度整合微信/QQ开黑", "col3": "中国大陆 iOS / Android / PC 免费下载（F2P）+ 球员养成与皮肤通行证分成", "col4": "All-Star 上线突破 >1,100万注册用户", "col5": "2025.03 公测即冲榜首", "verdict": "成功打开主机渗透率偏低的中国百亿篮球手游市场，轻资产净享版税分成。", "sourceLabel": "Horizons Capitals", "sourceUrl": "https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo"}, {"category": "nba2k", "benchmark": false, "entity": "NBA 2K Mobile & Arcade Edition", "sub": "Cat Daddy Games / Visual Concepts", "col2": "欧美及全球轻中度移动端卡牌对战（2K Mobile）+ 零内购纯净单机（Apple Arcade）", "col3": "iOS / Android F2P 内购 + 苹果 Apple Arcade 订阅买断授权金", "col4": "全球数千万累计移动下载", "col5": "每年随新赛季同步大更", "verdict": "完善金字塔底端漏斗：将全球青少年移动轻度球迷逐步转化为未来主机正作核心买家。", "sourceLabel": "May 2026 IR Deck", "sourceUrl": "https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566"}, {"category": "rival", "benchmark": false, "entity": "EA SPORTS FC 26 / 27 (原 FIFA)", "sub": "EA Vancouver & Romania · 全球第一足球", "col2": "覆盖欧冠、英超、西甲等 700+ 俱乐部与 Ultimate Team 终极球队全球竞技", "col3": "全主机 + PC + FC Mobile；Ultimate Team 卡包贡献绝大部分利润", "col4": "年均主机/PC 销量 >2,500万份级", "col5": "欧洲与拉美绝对统治地位", "verdict": "全球受众基数大于篮球，但在自创角色开放社交大厅（The City）形态上不如 NBA 2K 超前。", "sourceLabel": "EA Analysis", "sourceUrl": "https://crackthemarket.substack.com/p/take-two-gta-vi-is-a-platform-not"}, {"category": "rival", "benchmark": false, "entity": "Madden NFL & College Football (EA)", "sub": "EA Tiburon · 北美橄榄球双子星", "col2": "NFL 唯一独占拟真授权 + 2024 重启爆火的美国大学橄榄球系列", "col3": "北美市场高度集中（美国占 85%+ 销量）· MUT 抽卡变现", "col4": "单代合计千万级北美销量", "col5": "美国本土国民级现金牛", "verdict": "北美护城河极深但国际化天花板明显；相比之下 NBA 2K 在中国与欧洲增长空间更广阔。", "sourceLabel": "TTWO 10-K", "sourceUrl": "https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm"}, {"category": "rival", "benchmark": false, "entity": "MLB The Show 美国职业棒球 (Sony)", "sub": "San Diego Studio · 跨平台棒球模拟", "col2": "Diamond Dynasty 良心攒卡模式与 Road to the Show 生涯养成", "col3": "索尼开发但应联盟要求同步登陆 Xbox 与 Switch", "col4": "年均数百万份北美与日韩销量", "col5": "MC ~80–82 口碑稳健", "verdict": "经济系统对零氪玩家更温和，但单客 VC/内购变现强度远低于 NBA 2K。", "sourceLabel": "May 2026 IR Deck", "sourceUrl": "https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566"}], "peerRowsEn": [{"category": "nba2k", "benchmark": true, "entity": "NBA 2K26 / NBA 2K27 Console & PC Flagship", "sub": "Visual Concepts · Annual Global Tentpole", "col2": "ProPLAY motion translation · The City MyCAREER MMO + MyTEAM + MyNBA Eras", "col3": "PS5/XSX/Switch 2/PC ($69.99–$99.99) + VC + 6-Week Pro/HoF Season Passes", "col4": "2K26 >12M units · 2K27 >4M Q2 debut", "col5": "+30% YoY RCS record in Q3 FY26", "verdict": "Take-Two's #1 annual console recurring cash engine, pairing 12M+ full-price copies with elite ARPU.", "sourceLabel": "GamesBeat Q2", "sourceUrl": "https://gamesbeat.com/take-two-reports-bookings-for-fiscal-q2-of-1-6b-down-18-and-below-expectations/"}, {"category": "nba2k", "benchmark": true, "entity": "NBA 2K All-Star & NBA 2K Online 2 (China)", "sub": "Visual Concepts × Tencent Games", "col2": "High-fidelity mobile 3v3/5v5 sim (All-Star) & #1 China PC sports online game", "col3": "F2P iOS / Android / PC in Mainland China with localized esports & royalties", "col4": ">11M registered users on All-Star", "col5": "Breakout March 2025 mobile launch", "verdict": "Unlocks China's massive mobile-first NBA fanbase with high-margin licensing economics.", "sourceLabel": "Horizons Capitals", "sourceUrl": "https://www.horizonscapitals.com/research-insights/take-two-interactive-ttwo"}, {"category": "nba2k", "benchmark": false, "entity": "NBA 2K Mobile & Arcade Edition", "sub": "Cat Daddy Games / Visual Concepts", "col2": "Global mobile card-battle basketball + ad-free/IAP-free Apple Arcade sim", "col3": "iOS / Android F2P IAP + guaranteed Apple Arcade subscription royalties", "col4": "Tens of millions of global downloads", "col5": "Annual roster & season refreshes", "verdict": "Top-of-funnel youth acquisition feeding future console flagship buyers.", "sourceLabel": "May 2026 IR Deck", "sourceUrl": "https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566"}, {"category": "rival", "benchmark": false, "entity": "EA SPORTS FC 26 / 27 (ex-FIFA)", "sub": "EA Vancouver & Romania · #1 Global Soccer", "col2": "700+ licensed clubs, Champions League & Ultimate Team live-service juggernaut", "col3": "Console, PC & FC Mobile; heavily concentrated in Ultimate Team packs", "col4": ">25M+ annual flagship players", "col5": "Dominant in Europe & LatAm", "verdict": "Larger global TAM than basketball, though NBA 2K leads in open-world social avatar hubs (The City).", "sourceLabel": "EA Analysis", "sourceUrl": "https://crackthemarket.substack.com/p/take-two-gta-vi-is-a-platform-not"}, {"category": "rival", "benchmark": false, "entity": "Madden NFL & EA College Football", "sub": "EA Tiburon · North American Football", "col2": "Exclusive NFL simulation rights + resurgent U.S. college football companion", "col3": "Heavily U.S.-centric (>85% domestic mix) + MUT card monetization", "col4": "10M+ combined U.S. annual units", "col5": "Fortress U.S. autumn staple", "verdict": "Rock-solid domestic moat but limited international ceiling compared to NBA 2K's China & Europe growth.", "sourceLabel": "TTWO 10-K", "sourceUrl": "https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm"}, {"category": "rival", "benchmark": false, "entity": "MLB The Show (Sony Interactive)", "sub": "San Diego Studio · Multi-Platform Baseball", "col2": "Diamond Dynasty & Road to the Show career simulation", "col3": "Published cross-platform across PS5, Xbox & Switch per MLB mandate", "col4": "Multi-million North America/East Asia", "col5": "~80–82 Metacritic consistency", "verdict": "Generous F2P card grind earns fan goodwill, but generates far lower RCS per user than NBA 2K.", "sourceLabel": "May 2026 IR Deck", "sourceUrl": "https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566"}], "peerCountUnitZh": "项体育游戏标杆", "peerCountUnitEn": "Sports Benchmarks", "barsChart": {"title_zh": "《NBA 2K》全周期单客价值拆解与同业体育旗舰变现深度对比（指数 / 美元）", "title_en": "NBA 2K Revenue Engines & Franchise Scale Benchmarks", "sub_zh": "展示《NBA 2K》如何通过高买断客单价 + 高频 VC 内购实现超 $10 亿级年化流水", "sub_en": "Key verified milestones illustrating NBA 2K's scale across console and China mobile", "badge_zh": "核心规模与增速指标", "badge_en": "Verified Scale Metrics", "maxX": 180, "prefix": "", "suffix": "Pts", "axisDecimals": 0, "valDecimals": 1, "items_zh": [{"label": "NBA 2K 全系累计历史销量 (百万份)", "val": 175.0, "sub": ">1.75 亿份全球正版出货", "note": "稳居全球电子游戏史 Top 20 常青大 IP"}, {"label": "NBA 2K26 RCS 单季增长爆发力 (基准100+)", "val": 130.0, "sub": "FY26 Q3 经常性消费同比 +30%", "note": "创下系列 27 年历史最高经常性内购纪录"}, {"label": "7年期 NBA 官方授权合约总价值 ($10M单位)", "val": 110.0, "sub": "$11.0 亿美元长周期战略绑定", "note": "锁定 30 支球队与现役球员全方位商业权益"}, {"label": "NBA 2K26 单代销量完成度 (x10 百万份)", "val": 122.0, "sub": "出货突破 >1,200 万份 (+9% YoY)", "note": "PC 次世代同构与 Switch 2 带来显著新增量"}, {"label": "腾讯《美职篮全明星》注册用户 (x10 百万)", "val": 110.0, "sub": ">1,100 万中国移动端注册玩家", "note": "2025年3月上线迅速打开中国高粘性移动增量"}, {"label": "NBA 2K27 首季销量折算指数 (x20 百万份)", "val": 82.0, "sub": "27Q2 首季销量即破 >400 万份", "note": "创下系列历史第二佳首发季度成绩"}], "items_en": [{"label": "NBA 2K Lifetime Units Sold (Millions)", "val": 175.0, "sub": ">175M copies sold worldwide", "note": "Top 20 franchise in interactive entertainment history"}, {"label": "NBA 2K26 Q3 RCS Growth Index (100+YoY%)", "val": 130.0, "sub": "+30% YoY RCS surge in Q3 FY26", "note": "All-time record recurrent spending performance"}, {"label": "7-Year NBA Licensing Deal Scale ($10M)", "val": 110.0, "sub": "$1.1B multi-year NBA/NBPA pact", "note": "Deep institutional moat across league & players"}, {"label": "NBA 2K26 Full-Cycle Volume (x10M Scale)", "val": 122.0, "sub": ">12M units shipped (+9% YoY)", "note": "Boosted by Gen-9 PC parity and Switch 2 debut"}, {"label": "China 'NBA 2K All-Star' Users (x10M)", "val": 110.0, "sub": ">11M registered players with Tencent", "note": "Launched March 2025 to strong Chinese mobile adoption"}, {"label": "NBA 2K27 Launch Quarter Scale (x20M)", "val": 82.0, "sub": ">4M units sold in Q2 FY27 launch", "note": "2nd-highest launch in 27-year franchise history"}]}, "histChart": {"title_zh": "单代《NBA 2K》发售 4 个财季内预订额季节性节奏（$M）与 RCS 占比爬坡", "title_en": "Intra-Year Quarterly NBA 2K Bookings Cadence ($M) & Rising RCS Share (%)", "sub_zh": "9 月首发季（Q2）买断集中爆发，Q3 圣诞季买断+VC 双高峰，Q4–Q1 季后赛与总决赛完全由高毛利 RCS 主导", "sub_en": "Q2 launch copy spike, Q3 holiday + NBA tip-off peak, followed by 80%+ RCS mix through NBA Playoffs & Finals", "badge_zh": "12个月年货生命周期", "badge_en": "12-Month Seasonal Curve", "left_axis_zh": "■ 左轴：单季系列总预订额估算 ($M)", "left_axis_en": "■ Left Axis: Est. Quarterly Franchise Bookings ($M)", "right_axis_zh": "● 右轴：当季经常性消费 RCS 占比 (%)", "right_axis_en": "● Right Axis: Quarterly RCS Share (%)", "legend": {"bar_zh": "单季系列净预订额 (左轴 · $M)", "bar_en": "Quarterly Franchise Net Bookings (Left · $M)", "line_zh": "当季 VC / MyTEAM / 通行证 RCS 占比 (右轴 · %)", "line_en": "Quarterly RCS Share of Franchise Bookings (Right · %)"}, "labels_zh": ["财年Q2 (9月首发)", "财年Q3 (圣诞+开赛)", "财年Q4 (全明星周)", "下一财年Q1 (总决赛)", "下一财年暑期"], "labels_en": ["Fiscal Q2 (Sep Debut)", "Fiscal Q3 (Holiday)", "Fiscal Q4 (All-Star)", "Next Q1 (NBA Finals)", "Summer Bridge"], "subs_zh": ["(400万+正价首发)", "(全年流水最高峰)", "(RCS升至75%+)", "(100总评神卡潮)", "(衔接下一代预购)"], "subs_en": ["(>4M Full-Price)", "(Peak Volume)", "(75%+ RCS Mix)", "(Playoff Pack Surge)", "(Next-Entry Preorder)"], "bars": [420, 465, 290, 245, 130], "line": [42, 62, 78, 86, 91], "minB": 0, "maxB": 540, "pB": "$", "uB": "M", "dB": 0, "minL": 25, "maxL": 100, "pL": "", "uL": "%", "dL": 0, "milestoneVal": 75, "milestone_zh": "75% 高毛利纯内购主导线", "milestone_en": "75% High-Margin RCS Line", "notes_zh": ["每年9月上旬发售，核心铁粉购入 $70–$100 版本并首充第1个自建号 VC", "感恩节黑五促销拉新数百万玩家 + NBA 新赛季揭幕引爆 VC 二次消费", "NBA 全明星周末主题卡包与第 4–5 赛季通行证主导高毛利流水", "NBA 季后赛与总决赛期间推出 99/100 总评终极球星卡包", "休赛期选秀更新维持在线粘性，8月公布新作能力值开启新一轮循环"], "notes_en": ["Early September launch drives >4M full-price units + Day-1 MyPLAYER VC builds", "Black Friday / Holiday hardware bundles onboard millions + NBA tip-off surge", "NBA All-Star Weekend packs and Season 4–5 Passes push RCS past 75%", "NBA Playoffs & Finals 99/100-OVR endgame MyTEAM cards sustain high ARPU", "Summer NBA Draft & August Rating Reveals bridge directly into next annual title"]}, "simConfig": {"presets": {"base": {"v1": 12.5, "v2": 52, "v3": 62, "flag": true}, "bull": {"v1": 14.5, "v2": 55, "v3": 74, "flag": true}, "bear": {"v1": 10.5, "v2": 46, "v3": 44, "flag": false}}, "defaultPreset": "base", "defaultVals": {"v1": 12.5, "v2": 52, "v3": 62, "flag": true}, "xLabelsZh": ["首发周", "第3月(圣诞)", "第6月(全明星)", "第9月(总决赛)", "第12月(收官)"], "xLabelsEn": ["Launch Wk", "Month 3", "Month 6", "Month 9", "Month 12"], "activeCurveLabelZh": "全生态累计总预订额", "activeCurveLabelEn": "Full Ecosystem Bookings", "baseCurveLabelZh": "纯拷贝买断收入基准", "baseCurveLabelEn": "Copy-Only Baseline"}, "checklistZh": [{"tag": "NBA 版权长约续签", "title": "1. NBA 与 NBPA 新一轮多年授权协议成本率测试", "desc": "2019 年签署的 7 年 $11 亿协议进入续约周期；跟踪新版协议保底授权金涨幅是否控制在单代总预订额增速之内，维持稳健营业利润率。"}, {"tag": "2K27 长尾兑现", "title": "2. 《NBA 2K27》在《GTA VI》分流窗口下的假日季与季后赛留存测试", "desc": "首季已取得 >400 万份佳绩，继续核验 Q3–Q4 与 GTA VI 同期竞争玩家注意力时，篮球核心群体的日均时长与 VC 充值韧性。"}, {"tag": "VC 养成通胀控制", "title": "3. 自创球员（60→99 OVR）成型成本与社区口碑平衡测试", "desc": "监控 Reddit / Steam 玩家对单号 VC 消耗量的舆论情绪，确保通过赛季通行证与任务奖励维持零微氪玩家活跃基数。"}, {"tag": "Switch 2 便携渗透", "title": "4. Nintendo Switch 2 装机放量对掌机端《NBA 2K》市占率的拉动测试", "desc": "随着 Switch 2 在日本、欧美持续热销，评估原生掌机次世代版能否每年稳定贡献百万级增量拷贝。"}, {"tag": "中国手游长线流水", "title": "5. 腾讯《NBA 2K All-Star（美职篮全明星）》周年留存与畅销榜排名跟踪", "desc": "核验 1,100 万注册用户在度过公测红利期后，iOS 中国区畅销榜排名稳定性与赛事商业化变现效率。"}, {"tag": "开箱合规与透明度", "title": "6. 欧美虚拟卡包概率披露与未成年人消费保护合规测试", "desc": "跟踪欧美监管机构对体育游戏卡包机制的最新法规，验证“确定性球员市场直购 + 赛季通行证”替代方案的平滑度。"}], "checklistEn": [{"tag": "NBA License Terms", "title": "1. Next-Cycle NBA & NBPA Multi-Year Licensing Royalty Discipline", "desc": "As the 2019 7-year $1.1B pact transitions into renewal, verify royalty escalation stays proportional to Bookings growth."}, {"tag": "2K27 vs. GTA VI", "title": "2. NBA 2K27 Holiday & Playoff Engagement Resilience Alongside GTA VI", "desc": "Following >4M Q2 launch units, confirm core hoops engagement and VC spend hold firm during GTA VI's holiday window."}, {"tag": "VC Build Balance", "title": "3. MyPLAYER 60-to-99 OVR VC Cost & Community Sentiment Test", "desc": "Ensure build upgrade costs and Rebirth perks prevent pay-to-win backlash while sustaining Season Pass attach."}, {"tag": "Switch 2 Share", "title": "4. Nintendo Switch 2 Installed-Base Attach Rate Expansion", "desc": "Track incremental unit and portable MyTEAM growth on Switch 2 hardware across North America, Europe, and Japan."}, {"tag": "China All-Star LTV", "title": "5. Tencent 'NBA 2K All-Star' Year-2 Retention & Grossing Rank", "desc": "Monitor active conversion and Chinese iOS top-grossing stability across the >11M registered player base."}, {"tag": "Pack Compliance", "title": "6. MyTEAM Card-Pack Regulatory Compliance & Direct Player Market", "desc": "Verify deterministic Season Pass and direct player-market options insulate RCS against European loot-box rules."}]};
    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_CHECK_KEY = DATA.storageCheckKey;

    var state = {
      lang: 'zh',
      theme: 'dark',
      ch1View: 'viewA',
      ch1Series: { s1: true, s2: true },
      activePillar: 0,
      radarSeries: { s1: true, s2: true, s3: true },
      peerFilter: 'all',
      peerQuery: '',
      epsSeries: { eps: true, oci: true },
      sim: Object.assign({ preset: DATA.simConfig.defaultPreset }, DATA.simConfig.defaultVals),
      checks: [true, true, true, false, false, false]
    };

    function isEn() { return state.lang === 'en'; }

    function safeGetStorage(key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    }
    function safeSetStorage(key, val) {
      try { window.localStorage.setItem(key, val); } catch (e) { /* ignore */ }
    }

    var toastTimer = null;
    function showToast(msg) {
      var el = document.getElementById('muiSnackbar');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
    }

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

    function syncCh1HeaderText() {
      var v = state.ch1View === 'viewA' ? DATA.ch1Chart.viewA : DATA.ch1Chart.viewB;
      var tEl = document.getElementById('ch1ChartTitle');
      var sEl = document.getElementById('ch1ChartSub');
      if (tEl) tEl.textContent = isEn() ? v.title_en : v.title_zh;
      if (sEl) sEl.textContent = isEn() ? v.sub_en : v.sub_zh;
    }

    function syncCollapseButtonsText() {
      var btns = document.querySelectorAll('[data-collapse-target]');
      for (var i = 0; i < btns.length; i++) {
        var pid = btns[i].getAttribute('data-collapse-target');
        var panel = document.getElementById(pid);
        var isOpen = panel && panel.classList.contains('open');
        if (isEn()) {
          btns[i].innerHTML = isOpen ? '<span>Hide Mechanism &amp; Evidence</span> <span>&#8963;</span>' : '<span>Show Mechanism &amp; Evidence</span> <span>&#8964;</span>';
        } else {
          btns[i].innerHTML = isOpen ? '<span>收起底层机制与数据拆解</span> <span>&#8963;</span>' : '<span>展开底层机制与数据拆解</span> <span>&#8964;</span>';
        }
      }
    }

    function applyLanguage(lang, silent) {
      state.lang = lang === 'en' ? 'en' : 'zh';
      var en = isEn();
      document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
      document.documentElement.setAttribute('data-lang', state.lang);
      document.title = en ? DATA.docTitleEn : DATA.docTitleZh;

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

      var biNodes = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
      for (var i = 0; i < biNodes.length; i++) {
        biNodes[i].textContent = en ? biNodes[i].getAttribute('data-i18n-en') : biNodes[i].getAttribute('data-i18n-zh');
      }

      var richNodes = document.querySelectorAll('[data-i18n-rich]');
      for (var r = 0; r < richNodes.length; r++) {
        var rk = richNodes[r].getAttribute('data-i18n-rich');
        var item = DATA.richMap[rk];
        if (item) richNodes[r].innerHTML = en ? item.en : item.zh;
      }

      var phNodes = document.querySelectorAll('[data-ph-zh][data-ph-en]');
      for (var p = 0; p < phNodes.length; p++) {
        phNodes[p].setAttribute('placeholder', en ? phNodes[p].getAttribute('data-ph-en') : phNodes[p].getAttribute('data-ph-zh'));
      }
      var tiNodes = document.querySelectorAll('[data-title-zh][data-title-en]');
      for (var t = 0; t < tiNodes.length; t++) {
        tiNodes[t].setAttribute('title', en ? tiNodes[t].getAttribute('data-title-en') : tiNodes[t].getAttribute('data-title-zh'));
      }
      var arNodes = document.querySelectorAll('[data-aria-zh][data-aria-en]');
      for (var a = 0; a < arNodes.length; a++) {
        arNodes[a].setAttribute('aria-label', en ? arNodes[a].getAttribute('data-aria-en') : arNodes[a].getAttribute('data-aria-zh'));
      }

      var pNote = document.getElementById('pillarFocusNote');
      if (pNote) {
        var notesArr = en ? DATA.pillarNotesEn : DATA.pillarNotesZh;
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
    function closeMobileDrawer() { document.body.classList.remove('drawer-open'); }

    function renderPeerTable() {
      var tbody = document.getElementById('peerTableBody');
      var badge = document.getElementById('peerCountBadge');
      if (!tbody) return;
      var activeRows = isEn() ? DATA.peerRowsEn : DATA.peerRowsZh;
      var q = state.peerQuery.trim().toLowerCase();
      var filtered = activeRows.filter(function (row, idx) {
        var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
        if (!catOk) return false;
        if (!q) return true;
        var zhR = DATA.peerRowsZh[idx] || row;
        var enR = DATA.peerRowsEn[idx] || row;
        var hay = (zhR.entity + ' ' + zhR.sub + ' ' + zhR.col2 + ' ' + zhR.col3 + ' ' + zhR.col4 + ' ' + zhR.col5 + ' ' + zhR.verdict + ' ' +
                   enR.entity + ' ' + enR.sub + ' ' + enR.col2 + ' ' + enR.col3 + ' ' + enR.col4 + ' ' + enR.col5 + ' ' + enR.verdict).toLowerCase();
        return hay.indexOf(q) !== -1;
      });

      if (badge) {
        badge.textContent = isEn()
          ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' ' + DATA.peerCountUnitEn)
          : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' ' + DATA.peerCountUnitZh);
      }

      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching entries found. Try another keyword or reset filters.' : '未找到匹配的对比记录，请尝试其他关键词或重置筛选条件。') + '</td></tr>';
        return;
      }

      var rawQ = state.peerQuery.trim();
      tbody.innerHTML = filtered.map(function (r) {
        return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
          '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.entity, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.sub, rawQ) + '</span></td>' +
          '<td>' + highlightMatch(r.col2, rawQ) + '</td>' +
          '<td>' + highlightMatch(r.col3, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.col4, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.col5, rawQ) + '</td>' +
          '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + escapeHtml(r.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' &#8599;</a></td>' +
          '</tr>';
      }).join('');
    }

    function computeSimModel(simState, en) {
      
              var unitsM = simState.v1;
              var copyAsp = simState.v2;
              var rcsPerBuyer = simState.v3;
              var chinaMobileM = simState.flag ? 115.0 : 0.0;

              var copyGrossM = unitsM * copyAsp;
              var rcsGrossM = unitsM * rcsPerBuyer + chinaMobileM;
              var totalGrossM = copyGrossM + rcsGrossM;
              var rcsSharePct = (rcsGrossM / totalGrossM) * 100;

              var copyPace = [0.36, 0.76, 0.90, 0.97, 1.00];
              var rcsPace = [0.16, 0.48, 0.74, 0.92, 1.00];
              var activeSeries = [];
              var baseSeries = [];
              for (var i = 0; i < 5; i++) {
                activeSeries.push(copyGrossM * copyPace[i] + rcsGrossM * rcsPace[i]);
                baseSeries.push(copyGrossM * copyPace[i]);
              }

              return {
                label1: unitsM.toFixed(1) + 'M',
                label2: '$' + copyAsp.toFixed(0),
                label3: '$' + rcsPerBuyer.toFixed(0),
                out1: '$' + (copyGrossM / 1000).toFixed(2) + 'B',
                out2: '$' + (rcsGrossM / 1000).toFixed(2) + 'B',
                out3: '$' + (totalGrossM / 1000).toFixed(2) + 'B',
                out4: rcsSharePct.toFixed(1) + '% RCS',
                activeSeries: activeSeries,
                baseSeries: baseSeries,
                formatY: function (v) { return '$' + (v / 1000).toFixed(2) + 'B'; }
              };
            
    }

    function updateSimulatorUI() {
      var m = computeSimModel(state.sim, isEn());
      document.getElementById('simVal1Label').textContent = m.label1;
      document.getElementById('simVal2Label').textContent = m.label2;
      document.getElementById('simVal3Label').textContent = m.label3;

      document.getElementById('simOut1').textContent = m.out1;
      document.getElementById('simOut2').textContent = m.out2;
      document.getElementById('simOut3').textContent = m.out3;
      document.getElementById('simOut4').textContent = m.out4;

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
      var itemsList = isEn() ? DATA.checklistEn : DATA.checklistZh;
      var doneCount = state.checks.filter(Boolean).length;
      var pct = Math.round((doneCount / itemsList.length) * 100);
      if (chip) {
        chip.textContent = isEn()
          ? ('Verified ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)')
          : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
      }
      if (bar) bar.style.width = pct + '%';

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
          '</div></label>';
      }).join('');
    }

    /* High-DPI Built-In Canvas Chart Engine */
    var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
    var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

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
      ctx.font = '700 10.5px "IBM Plex Mono", system-ui, sans-serif';
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

    function fmtTick(val, prefix, suffix, decimals) {
      var neg = val < 0 ? '-' : '';
      var absV = Math.abs(val);
      return neg + (prefix || '') + absV.toFixed(decimals || 0) + (suffix || '');
    }

    /* Chart 1: Dual-View Bar + Line Combo */
    function drawCh1Chart() {
      var env = prepareCanvas('chartCh1');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartCh1 = [];

      var v = state.ch1View === 'viewA' ? DATA.ch1Chart.viewA : DATA.ch1Chart.viewB;
      var en = isEn();
      var metaEl = document.getElementById('ch1AxisMeta');
      var leg1 = document.getElementById('ch1Leg1');
      var leg2 = document.getElementById('ch1Leg2');

      if (metaEl) {
        metaEl.innerHTML = '<span style="color:var(--chart-c1);">&#9632; ' + escapeHtml(en ? v.left_meta_en : v.left_meta_zh) + '</span>' +
                           '<span style="color:var(--chart-c2);">&#9679; ' + escapeHtml(en ? v.right_meta_en : v.right_meta_zh) + '</span>';
      }
      if (leg1) leg1.textContent = en ? v.leg1_en : v.leg1_zh;
      if (leg2) leg2.textContent = en ? v.leg2_en : v.leg2_zh;

      var pad = { top: 28, right: 54, bottom: 40, left: 54 };
      var pw = w - pad.left - pad.right;
      var ph = h - pad.top - pad.bottom;
      var labels = en ? v.labels_en : v.labels_zh;
      var s1 = v.s1;
      var s2 = v.s2;
      var min1 = v.min1 || 0, max1 = v.max1;
      var min2 = v.min2 || 0, max2 = v.max2;

      for (var g = 0; g <= 4; g++) {
        var r = g / 4;
        var gy = pad.top + ph - r * ph;
        ctx.strokeStyle = pal.grid;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.left, gy);
        ctx.lineTo(pad.left + pw, gy);
        ctx.stroke();

        ctx.font = '10.5px "IBM Plex Mono", sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = pal.tick;
        ctx.textAlign = 'right';
        ctx.fillText(fmtTick(min1 + r * (max1 - min1), v.p1, v.u1, v.d1), pad.left - 7, gy);

        ctx.fillStyle = pal.c2;
        ctx.textAlign = 'left';
        ctx.fillText(fmtTick(min2 + r * (max2 - min2), v.p2, v.u2, v.d2), pad.left + pw + 7, gy);
      }

      var step = pw / labels.length;
      var barW = Math.min(40, Math.max(18, step * 0.44));
      var pts = [];

      for (var i = 0; i < labels.length; i++) {
        var cx = pad.left + step * (i + 0.5);
        if (hoverState.chartCh1 === i) {
          ctx.fillStyle = pal.hoverBand;
          roundRectPath(ctx, pad.left + step * i + 3, pad.top, step - 6, ph, 6);
          ctx.fill();
        }

        if (state.ch1Series.s1) {
          var bH = Math.max(4, ((s1[i] - min1) / (max1 - min1)) * ph);
          var bX = cx - barW / 2;
          var bY = pad.top + ph - bH;
          var bGrad = ctx.createLinearGradient(0, bY, 0, pad.top + ph);
          if (pal.isDark) {
            bGrad.addColorStop(0, 'rgba(51, 153, 255, 0.82)');
            bGrad.addColorStop(1, 'rgba(0, 115, 230, 0.30)');
          } else {
            bGrad.addColorStop(0, '#1985F1');
            bGrad.addColorStop(1, '#0066CC');
          }
          ctx.fillStyle = bGrad;
          topRoundedBar(ctx, bX, bY, barW, bH, 5);
          ctx.fill();

          if (bH > 22 && w >= 460) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 10px "IBM Plex Mono", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(fmtTick(s1[i], v.p1, v.u1, v.d1), cx, bY + 15);
          }
        }

        var ly = pad.top + ph - ((s2[i] - min2) / (max2 - min2)) * ph;
        pts.push({ x: cx, y: ly, val: s2[i] });

        ctx.fillStyle = pal.text;
        ctx.font = '600 ' + (w < 500 ? '10px' : '11px') + ' system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(labels[i], cx, pad.top + ph + 20);

        var noteTxt = (en ? v.notes_en : v.notes_zh)[i] || '';
        hitRegions.chartCh1.push({
          idx: i,
          x: pad.left + step * i, y: pad.top, w: step, h: ph + 32,
          html: '<strong>' + escapeHtml(labels[i]) + '</strong><br/>' +
                '&#8226; ' + escapeHtml(en ? v.leg1_en : v.leg1_zh) + ': <strong>' + fmtTick(s1[i], v.p1, v.u1, v.d1) + '</strong><br/>' +
                '&#8226; ' + escapeHtml(en ? v.leg2_en : v.leg2_zh) + ': <strong>' + fmtTick(s2[i], v.p2, v.u2, v.d2) + '</strong>' +
                (noteTxt ? '<br/>&#8226; ' + escapeHtml(noteTxt) : '')
        });
      }

      if (state.ch1Series.s2) {
        ctx.save();
        drawSmoothLine(ctx, pts);
        ctx.strokeStyle = pal.c2;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.restore();

        for (var m = 0; m < pts.length; m++) {
          ctx.fillStyle = pal.pillBg;
          ctx.beginPath();
          ctx.arc(pts[m].x, pts[m].y, 5.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = pal.c2;
          ctx.beginPath();
          ctx.arc(pts[m].x, pts[m].y, 3.8, 0, Math.PI * 2);
          ctx.fill();
          if (w >= 540 || m === 0 || m === pts.length - 1) {
            drawValueBadge(ctx, fmtTick(pts[m].val, v.p2, v.u2, v.d2), pts[m].x, Math.max(14, pts[m].y - 15), pal.c2, pal);
          }
        }
      }
    }

    /* Chart 2: 5-Axis Radar Chart */
    function drawRadarChart() {
      var env = prepareCanvas('chartRadar');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartRadar = [];

      var rad = DATA.radar;
      var axes = isEn() ? rad.axes_en : rad.axes_zh;
      var count = axes.length;
      var cx = w / 2;
      var cy = h / 2 + 6;
      var radius = Math.min(w, h) * 0.33;

      for (var ring = 1; ring <= 5; ring++) {
        var rr = (radius * ring) / 5;
        ctx.beginPath();
        for (var a = 0; a < count; a++) {
          var ang = -Math.PI / 2 + (a * 2 * Math.PI) / count;
          var rx = cx + Math.cos(ang) * rr;
          var ry = cy + Math.sin(ang) * rr;
          if (a === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();
        ctx.strokeStyle = pal.grid;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      var highlightAxis = rad.pillar_axis_map ? rad.pillar_axis_map[state.activePillar] : state.activePillar % count;

      for (var k = 0; k < count; k++) {
        var angK = -Math.PI / 2 + (k * 2 * Math.PI) / count;
        var ex = cx + Math.cos(angK) * radius;
        var ey = cy + Math.sin(angK) * radius;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = k === highlightAxis ? pal.c1 : pal.grid;
        ctx.lineWidth = k === highlightAxis ? 2 : 1;
        ctx.stroke();

        var lx = cx + Math.cos(angK) * (radius + 24);
        var ly = cy + Math.sin(angK) * (radius + 18);
        ctx.font = (k === highlightAxis ? '800 ' : '600 ') + (w < 420 ? '10.5px' : '11.5px') + ' system-ui, sans-serif';
        ctx.fillStyle = k === highlightAxis ? pal.c1 : pal.text;
        ctx.textAlign = Math.abs(Math.cos(angK)) < 0.2 ? 'center' : (Math.cos(angK) > 0 ? 'left' : 'right');
        ctx.textBaseline = 'middle';
        ctx.fillText(axes[k], lx, ly);

        hitRegions.chartRadar.push({
          idx: k,
          x: lx - 48, y: ly - 16, w: 96, h: 32,
          html: '<strong>' + escapeHtml(axes[k]) + '</strong><br/>' +
                '&#8226; ' + escapeHtml(isEn() ? rad.series_labels.s1_en : rad.series_labels.s1_zh) + ': <strong>' + rad.s1[k] + '/100</strong><br/>' +
                '&#8226; ' + escapeHtml(isEn() ? rad.series_labels.s2_en : rad.series_labels.s2_zh) + ': ' + rad.s2[k] + '/100<br/>' +
                '&#8226; ' + escapeHtml(isEn() ? rad.series_labels.s3_en : rad.series_labels.s3_zh) + ': ' + rad.s3[k] + '/100'
        });
      }

      function plotPoly(vals, strokeCol, fillCol, widthLine) {
        ctx.beginPath();
        for (var idx = 0; idx < count; idx++) {
          var a = -Math.PI / 2 + (idx * 2 * Math.PI) / count;
          var dist = (vals[idx] / 100) * radius;
          var px = cx + Math.cos(a) * dist;
          var py = cy + Math.sin(a) * dist;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = fillCol;
        ctx.fill();
        ctx.strokeStyle = strokeCol;
        ctx.lineWidth = widthLine;
        ctx.stroke();

        for (var j = 0; j < count; j++) {
          var aj = -Math.PI / 2 + (j * 2 * Math.PI) / count;
          var dj = (vals[j] / 100) * radius;
          ctx.fillStyle = strokeCol;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(aj) * dj, cy + Math.sin(aj) * dj, 3.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (state.radarSeries.s3) plotPoly(rad.s3, pal.c3, 'rgba(255, 183, 77, 0.12)', 1.8);
      if (state.radarSeries.s2) plotPoly(rad.s2, pal.c2, 'rgba(34, 197, 94, 0.13)', 2.0);
      if (state.radarSeries.s1) plotPoly(rad.s1, pal.c1, 'rgba(0, 115, 230, 0.22)', 2.6);
    }

    /* Chart 3: Horizontal Gradient Bars */
    function drawHorizontalBars() {
      var env = prepareCanvas('chartBars');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartBars = [];

      var bc = DATA.barsChart;
      var items = isEn() ? bc.items_en : bc.items_zh;
      var maxX = bc.maxX || 100;
      var pad = { top: 10, right: 18, bottom: 26, left: 18 };
      var pw = w - pad.left - pad.right;
      var ph = h - pad.top - pad.bottom;

      for (var g = 0; g <= 5; g++) {
        var xVal = (maxX / 5) * g;
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
        ctx.fillText(fmtTick(xVal, bc.prefix, bc.suffix, bc.axisDecimals || 0), gx, pad.top + ph + 18);
      }

      var colors = [
        ['#3399FF', '#0066CC'],
        ['#22C55E', '#15803D'],
        ['#A78BFA', '#6D28D9'],
        ['#FFB74D', '#D97706'],
        ['#38BDF8', '#0284C7'],
        ['#94A3B8', '#475569']
      ];

      var rowH = ph / items.length;
      for (var i = 0; i < items.length; i++) {
        var rowTop = pad.top + rowH * i;
        if (hoverState.chartBars === i) {
          ctx.fillStyle = pal.hoverBand;
          roundRectPath(ctx, pad.left - 6, rowTop + 2, pw + 12, rowH - 4, 8);
          ctx.fill();
        }

        var labelY = rowTop + Math.max(15, rowH * 0.34);
        var barY = rowTop + Math.max(22, rowH * 0.50);
        var barH = Math.min(15, Math.max(11, rowH * 0.26));
        var bw = Math.max(8, Math.min(pw, (items[i].val / maxX) * pw));
        var cPair = colors[i % colors.length];

        ctx.fillStyle = pal.text;
        ctx.font = '600 ' + (w < 460 ? '11px' : '12px') + ' system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(items[i].label, pad.left, labelY);

        var valStr = fmtTick(items[i].val, bc.prefix, bc.suffix, bc.valDecimals != null ? bc.valDecimals : 1);
        ctx.font = '800 12.5px "IBM Plex Mono", sans-serif';
        ctx.fillStyle = pal.isDark ? cPair[0] : cPair[1];
        ctx.textAlign = 'right';
        ctx.fillText(valStr, pad.left + pw, labelY);

        if (w >= 580 && items[i].sub) {
          var valW = ctx.measureText(valStr).width + 10;
          ctx.font = '500 11px "IBM Plex Mono", system-ui, sans-serif';
          ctx.fillStyle = pal.tick;
          ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
        }

        ctx.fillStyle = pal.trackBg;
        roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2);
        ctx.fill();

        var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
        barGrad.addColorStop(0, cPair[0]);
        barGrad.addColorStop(1, cPair[1]);
        ctx.fillStyle = barGrad;
        roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2);
        ctx.fill();

        hitRegions.chartBars.push({
          idx: i,
          x: pad.left, y: rowTop, w: pw, h: rowH,
          html: '<strong>' + escapeHtml(items[i].label) + ': ' + valStr + '</strong>' +
                (items[i].sub ? '<br/>&#8226; ' + escapeHtml(items[i].sub) : '') +
                (items[i].note ? '<br/>&#8226; ' + escapeHtml(items[i].note) : '')
        });
      }
    }

    /* Chart 4: Historical 5-Period Bar + Line Combo */
    function drawEpsComboChart() {
      var env = prepareCanvas('chartEps');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartEps = [];

      var hc = DATA.histChart;
      var en = isEn();
      var years = en ? hc.labels_en : hc.labels_zh;
      var subYears = en ? hc.subs_en : hc.subs_zh;
      var bars = hc.bars;
      var line = hc.line;

      var pad = { top: 26, right: 56, bottom: 44, left: 54 };
      var pw = w - pad.left - pad.right;
      var ph = h - pad.top - pad.bottom;

      var minB = hc.minB || 0, maxB = hc.maxB;
      var minL = hc.minL, maxL = hc.maxL;

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
        var lTick = minL + ratio * (maxL - minL);
        ctx.font = '10.5px "IBM Plex Mono", sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = pal.tick;
        ctx.textAlign = 'right';
        ctx.fillText(fmtTick(bTick, hc.pB, hc.uB, hc.dB), pad.left - 7, gy);
        ctx.textAlign = 'left';
        ctx.fillStyle = pal.c2;
        ctx.fillText(fmtTick(lTick, hc.pL, hc.uL, hc.dL), pad.left + pw + 7, gy);
      }

      if (hc.milestoneVal != null) {
        var targetY = pad.top + ph - ((hc.milestoneVal - minL) / (maxL - minL)) * ph;
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = pal.c3;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(pad.left, targetY);
        ctx.lineTo(pad.left + pw, targetY);
        ctx.stroke();
        ctx.restore();
        if (w >= 460) {
          drawValueBadge(ctx, en ? hc.milestone_en : hc.milestone_zh, pad.left + pw * 0.28, Math.max(14, targetY - 12), pal.c3, pal);
        }
      }

      var step = pw / years.length;
      var barW = Math.min(46, Math.max(22, step * 0.42));
      var linePts = [];

      for (var i = 0; i < years.length; i++) {
        var cx = pad.left + step * (i + 0.5);
        if (hoverState.chartEps === i) {
          ctx.fillStyle = pal.hoverBand;
          roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 6);
          ctx.fill();
        }

        if (state.epsSeries.eps) {
          var bh = Math.max(4, ((bars[i] - minB) / (maxB - minB)) * ph);
          var bx = cx - barW / 2;
          var by = pad.top + ph - bh;
          var eGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
          if (i === years.length - 1) {
            eGrad.addColorStop(0, '#66B2FF');
            eGrad.addColorStop(1, '#1985F1');
          } else {
            eGrad.addColorStop(0, '#3399FF');
            eGrad.addColorStop(1, '#0066CC');
          }
          ctx.fillStyle = eGrad;
          topRoundedBar(ctx, bx, by, barW, bh, 6);
          ctx.fill();

          if (bh > 20) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 10px "IBM Plex Mono", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(fmtTick(bars[i], hc.pB, hc.uB, hc.dB), cx, by + 16);
          }
        }

        var oy = pad.top + ph - ((line[i] - minL) / (maxL - minL)) * ph;
        linePts.push({ x: cx, y: oy, val: line[i] });

        ctx.fillStyle = pal.text;
        ctx.font = '700 11px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(years[i], cx, pad.top + ph + 19);
        if (subYears && subYears[i]) {
          ctx.fillStyle = pal.tick;
          ctx.font = '10px system-ui, sans-serif';
          ctx.fillText(subYears[i], cx, pad.top + ph + 33);
        }

        var extraNote = (en ? hc.notes_en : hc.notes_zh)[i] || '';
        hitRegions.chartEps.push({
          idx: i,
          x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
          html: '<strong>' + escapeHtml(years[i] + (subYears && subYears[i] ? ' ' + subYears[i] : '')) + '</strong><br/>' +
                '&#8226; ' + escapeHtml(en ? hc.legend.bar_en : hc.legend.bar_zh) + ': <strong>' + fmtTick(bars[i], hc.pB, hc.uB, hc.dB) + '</strong><br/>' +
                '&#8226; ' + escapeHtml(en ? hc.legend.line_en : hc.legend.line_zh) + ': <strong>' + fmtTick(line[i], hc.pL, hc.uL, hc.dL) + '</strong>' +
                (extraNote ? '<br/>&#8226; ' + escapeHtml(extraNote) : '')
        });
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
          drawValueBadge(ctx, fmtTick(linePts[m].val, hc.pL, hc.uL, hc.dL), linePts[m].x, Math.max(14, linePts[m].y - 16), pal.c2, pal);
        }
      }
    }

    /* Chart 5: Interactive Simulator Dual-Curve Projection */
    function drawSimChart() {
      var env = prepareCanvas('chartSim');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartSim = [];

      var en = isEn();
      var m = computeSimModel(state.sim, en);
      var activeArr = m.activeSeries;
      var baseArr = m.baseSeries;
      var xLabels = en ? DATA.simConfig.xLabelsEn : DATA.simConfig.xLabelsZh;
      var n = activeArr.length - 1;

      var maxVal = 1;
      for (var z = 0; z <= n; z++) {
        if (activeArr[z] > maxVal) maxVal = activeArr[z];
        if (baseArr[z] > maxVal) maxVal = baseArr[z];
      }
      maxVal = maxVal * 1.12;

      var pad = { top: 20, right: 22, bottom: 28, left: 60 };
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
        ctx.fillText(m.formatY(v), pad.left - 7, gy);
      }

      var stepX = pw / n;

      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = pal.tick;
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      for (var i = 0; i <= n; i++) {
        var px = pad.left + (i / n) * pw;
        var py = pad.top + ph - (baseArr[i] / maxVal) * ph;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      for (var j = 0; j <= n; j++) {
        var tx = pad.left + (j / n) * pw;
        var ty = pad.top + ph - (activeArr[j] / maxVal) * ph;
        if (j === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);

        var diff = activeArr[j] - baseArr[j];
        var xLbl = xLabels[j] || ('T+' + j);
        hitRegions.chartSim.push({
          idx: j,
          x: tx - Math.max(8, stepX * 0.5), y: pad.top, w: Math.max(16, stepX), h: ph + 24,
          html: '<strong>' + escapeHtml(xLbl) + '</strong><br/>' +
                '&#8226; ' + escapeHtml(en ? DATA.simConfig.activeCurveLabelEn : DATA.simConfig.activeCurveLabelZh) + ': <strong>' + m.formatY(activeArr[j]) + '</strong><br/>' +
                '&#8226; ' + escapeHtml(en ? DATA.simConfig.baseCurveLabelEn : DATA.simConfig.baseCurveLabelZh) + ': ' + m.formatY(baseArr[j]) + '<br/>' +
                '&#8226; Delta: <strong style="color:#22C55E;">' + (diff >= 0 ? '+' : '-') + m.formatY(Math.abs(diff)) + '</strong>'
        });
      }
      ctx.strokeStyle = pal.c1;
      ctx.lineWidth = 2.8;
      ctx.stroke();

      ctx.lineTo(pad.left + pw, pad.top + ph);
      ctx.lineTo(pad.left, pad.top + ph);
      ctx.closePath();
      var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
      grad.addColorStop(0, 'rgba(0, 115, 230, 0.28)');
      grad.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
      ctx.fillStyle = grad;
      ctx.fill();

      for (var km = 0; km <= n; km++) {
        var kx = pad.left + (km / n) * pw;
        var ky = pad.top + ph - (activeArr[km] / maxVal) * ph;
        ctx.fillStyle = pal.pillBg;
        ctx.beginPath();
        ctx.arc(kx, ky, 4.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = pal.c1;
        ctx.beginPath();
        ctx.arc(kx, ky, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      var endX = pad.left + pw;
      var endY = pad.top + ph - (activeArr[n] / maxVal) * ph;
      drawValueBadge(ctx, m.formatY(activeArr[n]), Math.min(w - 44, endX - 24), Math.max(pad.top + 12, endY - 14), pal.c1, pal);

      ctx.fillStyle = pal.tick;
      ctx.font = '10.5px "IBM Plex Mono", sans-serif';
      ctx.textBaseline = 'alphabetic';
      for (var xl = 0; xl <= n; xl++) {
        if (n > 6 && xl !== 0 && xl !== Math.floor(n / 2) && xl !== n) continue;
        var xx = pad.left + (xl / n) * pw;
        ctx.textAlign = xl === 0 ? 'left' : (xl === n ? 'right' : 'center');
        ctx.fillText(xLabels[xl] || ('Y' + xl), xx, pad.top + ph + 19);
      }
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
          if (leftPos + tipW > window.innerWidth - 12) leftPos = Math.max(12, clientX - tipW - 14);
          var topPos = Math.max(12, Math.min(window.innerHeight - tipH - 12, clientY - 18));
          tip.style.left = leftPos + 'px';
          tip.style.top = topPos + 'px';
        } else {
          tip.style.display = 'none';
        }
      }

      canvas.addEventListener('mousemove', function (e) { handlePointer(e.clientX, e.clientY); });
      canvas.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      canvas.addEventListener('mouseleave', function () {
        if (hoverState[canvasId] !== -1) {
          hoverState[canvasId] = -1;
          if (redrawMap[canvasId]) redrawMap[canvasId]();
        }
        tip.style.display = 'none';
      });
    }

    function exportStandaloneHtml() {
      var doctype = '<!DOCTYPE html>\n';
      var htmlContent = doctype + document.documentElement.outerHTML;
      var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = DATA.exportFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast(isEn() ? ('Exported standalone file: ' + DATA.exportFileName) : ('已导出独立网页 ' + DATA.exportFileName));
    }

    function init() {
      var rawTheme = safeGetStorage(STORAGE_THEME_KEY);
      var savedTheme = rawTheme ? String(rawTheme).replace(/^"|"$/g, '') : '';
      if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;

      var rawLang = safeGetStorage(STORAGE_LANG_KEY);
      var savedLang = rawLang ? String(rawLang).replace(/^"|"$/g, '') : '';
      if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;

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
          if (Array.isArray(parsed) && parsed.length === DATA.checklistZh.length) {
            state.checks = parsed.map(Boolean);
          }
        } catch (e) { /* ignore */ }
      }

      applyTheme(state.theme, true);
      applyLanguage(state.lang, true);

      document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
      document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
      document.getElementById('appbarThemeBtn').addEventListener('click', function () {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark', false);
      });

      document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
      document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
      void 0;
      void 0;
      void 0;
      void 0;

      var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
      for (var t = 0; t < tocLinks.length; t++) {
        tocLinks[t].addEventListener('click', closeMobileDrawer);
      }

      var jumpInput = document.getElementById('quickJumpInput');
      var jumpPop = document.getElementById('quickJumpPopover');
      function renderJumpList(q) {
        var kw = (q || '').trim().toLowerCase();
        var activeJump = isEn() ? DATA.quickJumpEn : DATA.quickJumpZh;
        var list = activeJump.filter(function (item, idx) {
          var zhIt = DATA.quickJumpZh[idx] || item;
          var enIt = DATA.quickJumpEn[idx] || item;
          return !kw || (zhIt.title + ' ' + zhIt.sub + ' ' + enIt.title + ' ' + enIt.sub).toLowerCase().indexOf(kw) !== -1;
        });
        if (!list.length) {
          jumpPop.innerHTML = '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">' + (isEn() ? 'No matching section' : '未匹配到对应章节') + '</div>';
        } else {
          jumpPop.innerHTML = list.map(function (item) {
            return '<button type="button" class="quick-jump-item" data-jump-sec="' + escapeHtml(item.sec) + '">' +
              '<span class="quick-jump-item-title">' + escapeHtml(item.title) + '</span>' +
              '<span class="quick-jump-item-sub">' + escapeHtml(item.sub) + '</span></button>';
          }).join('');
        }
        jumpPop.classList.add('open');
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
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open');
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

      var collapseBtns = document.querySelectorAll('[data-collapse-target]');
      for (var m = 0; m < collapseBtns.length; m++) {
        collapseBtns[m].addEventListener('click', function () {
          var panel = document.getElementById(this.getAttribute('data-collapse-target'));
          if (!panel) return;
          panel.classList.toggle('open');
          syncCollapseButtonsText();
        });
      }

      var pillarCards = document.querySelectorAll('[data-pillar]');
      for (var p = 0; p < pillarCards.length; p++) {
        pillarCards[p].addEventListener('click', function () {
          var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
          state.activePillar = idx;
          for (var k = 0; k < pillarCards.length; k++) pillarCards[k].classList.toggle('active', k === idx);
          document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? DATA.pillarNotesEn : DATA.pillarNotesZh)[idx] + '</div>';
          drawRadarChart();
        });
      }

      var radarPills = document.querySelectorAll('[data-radar-key]');
      for (var r = 0; r < radarPills.length; r++) {
        radarPills[r].addEventListener('click', function () {
          var key = this.getAttribute('data-radar-key');
          state.radarSeries[key] = !state.radarSeries[key];
          if (!state.radarSeries.s1 && !state.radarSeries.s2 && !state.radarSeries.s3) state.radarSeries[key] = true;
          this.classList.toggle('muted', !state.radarSeries[key]);
          drawRadarChart();
        });
      }

      document.getElementById('peerSearchInput').addEventListener('input', function () {
        state.peerQuery = this.value;
        renderPeerTable();
      });
      var peerFilterBtns = document.querySelectorAll('[data-peer-filter]');
      for (var pf = 0; pf < peerFilterBtns.length; pf++) {
        peerFilterBtns[pf].addEventListener('click', function () {
          state.peerFilter = this.getAttribute('data-peer-filter');
          for (var x = 0; x < peerFilterBtns.length; x++) peerFilterBtns[x].classList.toggle('active', peerFilterBtns[x] === this);
          renderPeerTable();
        });
      }

      var sl1 = document.getElementById('simSlider1');
      var sl2 = document.getElementById('simSlider2');
      var sl3 = document.getElementById('simSlider3');
      var tg = document.getElementById('simToggle');

      sl1.addEventListener('input', function () { state.sim.v1 = parseFloat(this.value); state.sim.preset = ''; updateSimulatorUI(); });
      sl2.addEventListener('input', function () { state.sim.v2 = parseFloat(this.value); state.sim.preset = ''; updateSimulatorUI(); });
      sl3.addEventListener('input', function () { state.sim.v3 = parseFloat(this.value); state.sim.preset = ''; updateSimulatorUI(); });
      tg.addEventListener('change', function () { state.sim.flag = !!this.checked; state.sim.preset = ''; updateSimulatorUI(); });

      var presetBtns = document.querySelectorAll('[data-preset]');
      for (var pb = 0; pb < presetBtns.length; pb++) {
        presetBtns[pb].addEventListener('click', function () {
          var key = this.getAttribute('data-preset');
          var cfg = DATA.simConfig.presets[key];
          if (!cfg) return;
          state.sim.v1 = cfg.v1;
          state.sim.v2 = cfg.v2;
          state.sim.v3 = cfg.v3;
          state.sim.flag = cfg.flag;
          state.sim.preset = key;
          sl1.value = String(cfg.v1);
          sl2.value = String(cfg.v2);
          sl3.value = String(cfg.v3);
          tg.checked = !!cfg.flag;
          updateSimulatorUI();
        });
      }

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
        showToast(isEn() ? 'Checked all 6 diagnostic criteria' : '已勾选全部 6 项核心核查指标');
      });
      document.getElementById('resetCheckBtn').addEventListener('click', function () {
        state.checks = [true, true, true, false, false, false];
        safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
        renderChecklist();
        showToast(isEn() ? 'Checklist reset to baseline (50%)' : '核查清单已恢复默认基准状态 (50%)');
      });

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

      wireCanvasTooltip('chartCh1');
      wireCanvasTooltip('chartRadar');
      wireCanvasTooltip('chartBars');
      wireCanvasTooltip('chartEps');
      wireCanvasTooltip('chartSim');

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
  