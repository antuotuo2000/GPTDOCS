
  (function () {
    'use strict';

    var DATA = {"docTitleZh": "《幽浮 XCOM》（含漫威暗夜之子）回合制战术策略 IP 深度研究报告 | 2K · Firaxis", "docTitleEn": "XCOM Turn-Based Tactical Strategy IP Deep Dive | 2K & Firaxis Games", "exportFileName": "ttwo_ip_xcom.html", "storageCheckKey": "ttwo_ip_xcom_check_v1", "richMap": {"feat_0": {"zh": "允许玩家用现实中同事、死党或伴侣的名字定制士兵外观与国籍；一旦在铁人模式（Ironman）下因贪功冒进导致培养二十小时的王牌狙击手永久牺牲，所带来的真实悔恨与复仇动力远超固定CG过场 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Naming custom soldiers after real-life friends under Ironman Permadeath turns every risky flanking dash and 95% shot into unforgettable personal drama <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "feat_1": {"zh": "1994 老版需精确计算每走一步扣几点体力；Firaxis 在 2009 推翻复杂原型，提炼出极度洗练的<strong>“蓝圈移动 + 黄圈冲刺/开火/监视（Overwatch）”与半盾/全盾掩体UI</strong>，让主机手柄与 iPad 触屏同样丝滑操控 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Replacing archaic 1994 Time-Unit math with clean Blue-Move / Gold-Action phases and Half/Full-Cover shields made deep squad tactics intuitive on PC, console, and iOS <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "feat_2": {"zh": "战场上缴获的外星人残骸带回地下蚁巢基地解剖研发等离子步枪，而地球仪上各国恐慌度与化身计划（Avatar Project）毁灭倒计时又倒逼玩家在伤兵满营时硬着头皮出击 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Tactical battlefield salvage directly fuels underground Ant-Farm R&D, while Geoscape panic meters force agonizing triage decisions <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "kpi_0": {"zh": "《未知敌人》PC 89 / X360 90 / iOS 91 分，《XCOM 2》及《天选者之战》均达 88 分殿堂级水准 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Enemy Unknown hit 89 PC / 90 X360 / 91 iOS, followed by 88 MC on XCOM 2 & War of the Chosen <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "kpi_1": {"zh": "2016年2月首发仅次于 Dota2 与 CS:GO 高居 Steam 全站第三，超越文明5首发峰值（9.1万） <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>。", "en": "Ranked #3 overall on Steam behind Dota 2 & CS:GO at launch, topping Civ V's 91k peak <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>."}, "kpi_2": {"zh": "Alinea 2026Q3 统计：新战术热作《星战：零号连队》Steam 买家中 34% 玩过 XCOM（主机端达 32%） <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>。", "en": "2026 Alinea data: 34% of Steam buyers of Star Wars Zero Company had played XCOM 1/2 <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>."}, "kpi_3": {"zh": "吸取 2022《漫威暗夜之子》高口碑低销量且需付高额漫威版税教训，回归自有 XCOM 利润率高出 20pct+ <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm\" target=\"_blank\" rel=\"noopener noreferrer\">FY26 10-K &#8599;</a>。", "en": "Unlike licensed Marvel's Midnight Suns, wholly-owned XCOM retains 100% of net publisher margin <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm\" target=\"_blank\" rel=\"noopener noreferrer\">FY26 10-K &#8599;</a>."}, "mat_body_0": {"zh": "由前 Firaxis《XCOM》开发骨干创立的 Bit Reactor 于 2026 年 8 月 27 日推出回合制战术游戏《Star Wars Zero Company》（MC 86），短短一个多月便售出<strong>超 100 万份、斩获 4,980 万美元总收入</strong>，且其中高达 <strong>34% 的 Steam 买家是 XCOM 老玩家</strong> <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>——这用真金白银证明全球千万战棋迷正饥渴等待正宗《XCOM 3》归来！", "en": "Launched Aug 27, 2026 by ex-Firaxis XCOM veterans at Bit Reactor, <em>Star Wars Zero Company</em> (86 MC) sold <strong>>1M copies and grossed $49.8M in weeks</strong>—with <strong>34% of Steam buyers coming directly from XCOM</strong> <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>. Pent-up demand for mainline XCOM 3 is undeniable."}, "mat_body_1": {"zh": "枪管几乎怼到外星人脸上的游侠士兵显示 95% 命中率却一枪打飞，紧接着引发全队恐慌灭团——这种毫不留情的概率硬核感诞生了全球玩家津津乐道的口头禅“That's XCOM, baby!”，迫使玩家永远准备 B 计划（保底手雷），造就极高的直播戏剧张力 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Missing a point-blank 95% shotgun blast and scrambling with backup grenades spawned gaming's most famous tactical meme—turning every Twitch Ironman run into edge-of-your-seat theater <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "mat_body_2": {"zh": "据彭博社与 GameSpot 披露，Firaxis 正在开发的新《XCOM》项目在 2025 年夏季曾错过一个内部里程碑并随工作室重组进行调整，但项目仍在坚定推进中 <a class=\"cite-link\" href=\"https://www.gamespot.com/\" target=\"_blank\" rel=\"noopener noreferrer\">GameSpot Firaxis &#8599;</a>。回看历史，2012 年《未知敌人》当年也曾彻底推翻一年半原型重做才换来 89 分神作——在策略品类，推倒平庸原型恰恰是Firaxis的成功传统 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>！", "en": "Industry reports noted Firaxis's next XCOM missed an internal milestone amid 2025's studio restructuring yet remains in active development. Crucially, 2012's Enemy Unknown ALSO scrapped 18 months of over-engineered prototypes before becoming an 89-MC GOTY classic <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "mat_body_3": {"zh": "早在 2013 年，Firaxis 便联合 2K China 将完整版《XCOM: Enemy Unknown》移植上 iPad（首发周即冲上 iPad 畅销收入榜前列并获 MC 91 分），随后的《XCOM 2 Collection》同样登陆 iOS/Android 与 Switch，证明网格回合制天然适配触屏与掌机 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Co-developed with 2K China in 2013, XCOM on iPad scored 91 MC and ranked among the App Store's top-grossing releases—establishing a blueprint later repeated with XCOM 2 Collection on Switch and mobile <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "econ_0": {"zh": "开发外部超级英雄授权游戏不仅受制于严格的服装形象审批（无法做血腥断肢或重度改装 Mod），还需向版权方缴纳净收入 18%–25% 的授权金；而《XCOM》作为 2K 100% 自有资产，<strong>全部本体、$39.99 大型资料片及十年合集的每一分净收入完全留在 2K 账上</strong> <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm\" target=\"_blank\" rel=\"noopener noreferrer\">FY26 10-K &#8599;</a>。", "en": "Licensed superhero tactics games pay ~18%–25% IP royalties and face strict modding limits; wholly-owned <strong>XCOM</strong> keeps 100% of net publisher receipts while unleashing full Steam Workshop freedom <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm\" target=\"_blank\" rel=\"noopener noreferrer\">FY26 10-K &#8599;</a>."}, "econ_1": {"zh": "不同于开放世界需要数千美术堆砌城市街道，《XCOM》依靠模块化程序拼接战术地图与高重玩循环（2012 初代核心团队仅 50–60 人），研发总预算可控性极强，仅需 150 万–180 万份即可步入丰厚盈利区 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Unlike 2,000-person open-world productions, XCOM leverages modular procedural tactical maps and systemic AI (built by ~50–60 core devs on Enemy Unknown), enabling low breakeven thresholds <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "tl_0": {"zh": "Take-Two 于 2005 年随文明资产一并购入 1994 经典《UFO: Enemy Unknown》版权；狂热粉丝出身的总监 Jake Solomon 在 2008–2009 花一年半做出照搬老版时间单位的复杂原型，内部试玩被评“痛苦不堪”，团队壮士断腕全部推倒重做才诞生现代双行动点神作 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "After acquiring X-COM rights in 2005, director Jake Solomon built a faithful Time-Unit prototype in 2008–2009 that tested as 'painful' internally—prompting a bold ground-up reboot into the sleek two-action cover system <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "tl_1": {"zh": "当时业界迷信“回合制已死”，2K 甚至另立《调查局：幽浮解密》射击版；结果 2012 Firaxis 回合制正传口碑销量全面碾压！2016《XCOM 2》更巧妙将玩家们在初代最高难度团灭失败的统计结果直接设为正史开局，创下 13.2 万 Steam 并发纪录 <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>。", "en": "Defying industry dogma that turn-based games were dead, 2012's Enemy Unknown crushed expectations; 2016's XCOM 2 brilliantly canonized players' lost Impossible-difficulty runs as its guerrilla premise <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>."}, "tl_2": {"zh": "在主创 Jake Solomon 2023 年离职创业做生活模拟后，Firaxis 组建新一代战术团队攻坚正统新《XCOM》；尽管 2025 经历里程碑调整与工作室精简，但《博德之门3》与《零号连队》引爆的回合制复兴为其铺好了最佳市场温床 <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>。", "en": "Following Midnight Suns, Firaxis commissioned a new mainline XCOM project; despite 2025 milestone adjustments, booming post-BG3 turn-based appetite gives the franchise its largest addressable market ever <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>."}, "case_0": {"zh": "Firaxis 后台统计发现初代大多数玩家首轮存档都因恐慌失控输给了外星人；于是《XCOM 2》干脆设定人类在初代开局两个月即投降，玩家从防守方变成夺取外星飞船打游击的反抗军，彻底刷新战术节奏 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "Telemetry showed most players lost their first Enemy Unknown run; Firaxis made humanity's early surrender canon in XCOM 2, flipping gameplay from reactive defense to ambush guerrilla warfare <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "case_1": {"zh": "2K Marin 当年耗巨资将幽浮改为第三人称射击《The Bureau》（MC 66），结果射击玩家嫌慢、战棋玩家嫌浅；反观坚守回合制网格的 Firaxis 版成为十年金矿——这与后来《暗夜之子》加卡牌遇冷异曲同工：XCOM 粉丝要的就是纯粹硬核战棋 <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>。", "en": "2K Marin's third-person shooter reboot The Bureau (66 MC) flopped while Firaxis's turn-based Enemy Unknown soared—proving XCOM thrives when embracing pure grid tactics rather than chasing trends <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>."}, "case_2": {"zh": "盛赞民间模组《Long War》是“20小时免费教程（指原版）之后的真正正餐”后，Firaxis 直接付费资助该团队在《XCOM 2》发售首日同步推出官方合作模组并演化为《Long War 2》，成就佳话 <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>。", "en": "After Sid Meier and Jake Solomon praised Enemy Unknown's Long War mod, 2K paid Pavonis Interactive to ship day-one XCOM 2 mods and Long War 2—cementing elite community goodwill <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>."}, "case_3": {"zh": "当年《XCOM 2》PC 先发、主机晚了半年；而 2026 实测数据显示同步首发的主机版以 30% 销量贡献了 40.1% 总营收，提示新一代《XCOM》实行 PC + PS5 + Xbox + Switch 2 全端首日同步将大幅拉高首季流水 <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>。", "en": "XCOM 2 launched PC-only before hitting consoles months later; 2026 genre data showing consoles generate 40.1% of day-one tactical revenue highlights strong upside from simultaneous multi-platform launch <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>."}, "hero_h1": {"zh": "《幽浮 XCOM》回合制战术策略 IP 深度分析：<span class=\"gradient-accent\">现代小队战棋教科书、概率博弈心理学与新一代正作破局前瞻</span>", "en": "XCOM Tactical Strategy Franchise IP Deep Dive: <span class=\"gradient-accent\">Modern Turn-Based Tactics Gold Standard, Permadeath Psychology &amp; Next-Gen Outlook</span>"}, "hero_lead": {"zh": "在全世界的游戏评测词典里，只要出现一款小队掩体战棋游戏（无论是育碧《马力欧+疯狂兔子》、拉瑞安《博德之门3》早期战术对比，还是 2026 年刚发售破百万份的《星球大战：零号连队》），媒体和玩家永远只用一个词来定义它——<strong>“类 XCOM（XCOM-like）”</strong> <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a> <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>。在 Take-Two FY2026 Form 10-K 年报中，《XCOM》被明确列为 2K 内部全资自研核心多百万销量旗舰 IP 之一 <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm\" target=\"_blank\" rel=\"noopener noreferrer\">FY26 10-K &#8599;</a>：2012 年《XCOM: Enemy Unknown》斩获 <strong>Metacritic 89–91 分</strong>并横扫 DICE 年度最佳策略游戏；2016 年《XCOM 2》首发周末在 Steam 创下 <strong>13.2 万峰值同时在线（是初代两倍、更超越当年文明5峰值 45%）</strong>，其资料片《天选者之战》更被奉为战术游戏天花板 <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>。即便距离正传已过去十年，2026 年最新第三方数据显示新发战术大作中仍有<strong>高达 34% 的玩家直接来自《XCOM 1/2》老用户群</strong>，而 Firaxis 内部新一代《XCOM》正经历组织聚焦打磨蓄势待发 <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>。", "en": "Across global games criticism, an entire genre is defined by a single shorthand: <strong>'XCOM-like.'</strong> Listed in Take-Two's FY2026 Form 10-K among 2K's flagship multi-million-selling wholly-owned franchises <a class=\"cite-link\" href=\"https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm\" target=\"_blank\" rel=\"noopener noreferrer\">FY26 10-K &#8599;</a>, Firaxis's 2012 reboot <strong>XCOM: Enemy Unknown (89–91 Metacritic, DICE Strategy GOTY)</strong> resurrected turn-based squad tactics from a decade of dormancy <a class=\"cite-link\" href=\"https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown\" target=\"_blank\" rel=\"noopener noreferrer\">Wikipedia XCOM &#8599;</a>, while 2016's <strong>XCOM 2</strong> hit <strong>132,000 launch-weekend concurrent players on Steam</strong> (~2x Enemy Unknown and +45% above Civilization V's peak) alongside landmark expansion <em>War of the Chosen</em> <a class=\"cite-link\" href=\"https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/\" target=\"_blank\" rel=\"noopener noreferrer\">Reddit XCOM 2 Peak &#8599;</a>. Even ten years after XCOM 2, October 2026 market telemetry shows <strong>34% of buyers of new AAA tactics hits previously played XCOM</strong>—underscoring massive pent-up demand as Firaxis builds the next mainline entry <a class=\"cite-link\" href=\"https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e\" target=\"_blank\" rel=\"noopener noreferrer\">GameDev Oct 2026 &#8599;</a>."}}, "quickJumpZh": [{"sec": "sec-00", "title": "00 IP 核心论点与现代战棋宗师地位", "sub": "MC 89/88 年度策略大奖 · XCOM 2 首周末 13.2万 Steam CCU"}, {"sec": "sec-01", "title": "01 宏观地球仪 × 微观掩体双层循环", "sub": "蚁巢式地下基地经营 + 双行动点半掩体/全掩体博弈"}, {"sec": "sec-02", "title": "02 四大设计护城河与战术品类雷达", "sub": "永久死亡涌现叙事 · 天选者宿敌系统 · Long War 模组神迹"}, {"sec": "sec-03", "title": "03 XCOM 历代作品与战棋竞品对比", "sub": "XCOM 1/2/奇美拉/暗夜之子 vs 星战零号连队 vs 火焰纹章"}, {"sec": "sec-04", "title": "04 战棋旗舰 + 大型资料片收益测算", "sub": "本体 + 天选者之战级大型资料片 + 掌机/iPad 移植模拟器"}, {"sec": "sec-05", "title": "05 从 1994 软盘经典到现代重生复盘", "sub": "2009 推翻废案重做 · 2012 拯救死寂品类 · 新 XCOM 攻坚"}, {"sec": "sec-06", "title": "06 下一代 XCOM 研发突围核查清单", "sub": "6 项 Firaxis 新 XCOM 里程碑、吸取暗夜之子教训核查"}, {"sec": "sec-07", "title": "07 官方数据来源与核验索引", "sub": "FY26 10-K · Wikipedia XCOM · 2026 行业数据周报"}], "quickJumpEn": [{"sec": "sec-00", "title": "00 IP Thesis & Genre Leadership", "sub": "MC 89/88 GOTY Winner · 132k XCOM 2 Steam Peak CCU"}, {"sec": "sec-01", "title": "01 Geoscape × Tactical Dual Loop", "sub": "Ant-Farm Base Strategy + Two-Action Cover Combat"}, {"sec": "sec-02", "title": "02 Four Moats & Tactics Genre Radar", "sub": "Permadeath Emergent Stories · Nemesis Chosen · Long War"}, {"sec": "sec-03", "title": "03 XCOM Entries & Tactical Peers", "sub": "XCOM EU/2/Chimera/Midnight Suns vs. Star Wars Zero Co."}, {"sec": "sec-04", "title": "04 Base + Chosen Expansion Simulator", "sub": "Mainline Launch + War-of-the-Chosen Expansion ROI Sim"}, {"sec": "sec-05", "title": "05 From 1994 UFO to Modern Rebirth", "sub": "2009 Prototype Scrap · 2012 Revival · Next XCOM Build"}, {"sec": "sec-06", "title": "06 Next-Gen XCOM Execution Checklist", "sub": "6-Point Firaxis Milestone, Owned-IP Margin & Mod SDK"}, {"sec": "sec-07", "title": "07 Official Sources & Verification", "sub": "FY26 Form 10-K · Wikipedia · Alinea 2026 Tactics Data"}], "ch1Chart": {"tabA_zh": "视图 A：Firaxis 战术作品评分与并发跃升", "tabA_en": "View A: Tactical Releases MC & Steam CCU", "tabB_zh": "视图 B：回合制战术赛道对标销量与收入", "tabB_en": "View B: Turn-Based Tactics Comps", "source_chip_zh": "数据源：Wikipedia / SteamCharts / Alinea 2026", "source_chip_en": "Source: Wikipedia / SteamCharts / Alinea 2026", "viewA": {"title_zh": "Firaxis 战术产品线 Metacritic 媒体评分与 Steam 首发峰值并发（千人）", "title_en": "Firaxis Tactical Titles: Metacritic Score vs. Peak Steam Concurrency (Thousands)", "sub_zh": "正传《XCOM 2》首发并发高达 13.2 万人，远高于实验衍生作与漫威授权卡牌尝试", "sub_en": "Mainline XCOM 2 hit 132k peak Steam CCU—dwarfing experimental spin-offs and licensed card hybrids", "left_meta_zh": "左轴：Steam 历史峰值同时在线 (千人)", "left_meta_en": "Left Axis: Peak Steam Concurrent Players (k)", "right_meta_zh": "右轴：PC 版 Metacritic 媒体评分", "right_meta_en": "Right Axis: PC Metacritic Score", "leg1_zh": "Steam 首发峰值同时在线人数 (千人)", "leg1_en": "Peak Steam Concurrent Players (k)", "leg2_zh": "PC 版 Metacritic 评分", "leg2_en": "PC Metacritic Score", "labels_zh": ["XCOM:未知敌人(12)", "内部敌人DLC(13)", "XCOM 2 + 天选者(16)", "奇美拉小队(20)", "漫威暗夜之子(22)"], "labels_en": ["Enemy Unknown", "Enemy Within", "XCOM 2 / WotC", "Chimera Squad", "Midnight Suns"], "s1": [70.5, 42.0, 132.9, 39.6, 15.5], "s2": [89, 86, 88, 77, 83], "min1": 0, "max1": 150, "p1": "", "u1": "k", "d1": 1, "min2": 65, "max2": 95, "p2": "MC ", "u2": "", "d2": 0, "notes_zh": ["2012年10月发售登顶 Steam 周销榜，斩获多项年度最佳策略奖", "基因改造与机甲士兵（MEC）大型资料片，iOS 移植版更高达 MC 91 分", "PC 先发引爆全球战棋热潮，13.29 万峰值并发至今稳居纯战棋历史前列", "首发半价 $9.99 实验性衍生作，测试交错回合与破门机制", "口碑达 MC 83 但峰值仅 1.55 万，印证硬核玩家更渴望正统 XCOM 3"], "notes_en": ["Oct 2012 #1 Steam seller; won DICE & Spike PC Game of the Year", "Added MEC troopers & gene mods; iOS port scored 91 on Metacritic", "132.9k Steam peak CCU—nearly double Enemy Unknown's debut", "Experimental $9.99/$19.99 spin-off testing Breach-and-Clear turns", "83 MC critical praise but 15.5k CCU proved fans want pure XCOM 3"]}, "viewB": {"title_zh": "现代小队战术与 CRPG 回合制破圈标杆市场体量对比（百万份）", "title_en": "Turn-Based Tactical & Squad Strategy Market Comps: Units Sold (Millions)", "sub_zh": "《博德之门3》《火焰纹章》与 2026《星战：零号连队》印证全球回合制战术市场正处于历史最繁荣期", "sub_en": "Recent hits from Baldur's Gate 3 to 2026's Star Wars Zero Company prove turn-based tactics TAM has expanded sharply", "left_meta_zh": "左轴：单作销量规模 (百万份)", "left_meta_en": "Left Axis: Estimated/Reported Units (M)", "right_meta_zh": "右轴：Metacritic 评分", "right_meta_en": "Right Axis: Metacritic Score", "leg1_zh": "代表作销量规模 (百万份)", "leg1_en": "Title Units Sold (M)", "leg2_zh": "Metacritic 评分", "leg2_en": "Metacritic Score", "labels_zh": ["XCOM 1 全端", "XCOM 2 全端", "火焰纹章:风花雪月", "马力欧+疯兔1", "星战:零号连队(26首月)"], "labels_en": ["XCOM EU Total", "XCOM 2 Total", "Fire Emblem 3H", "Mario+Rabbids 1", "SW Zero Co (1Mo)"], "s1": [4.8, 6.5, 4.2, 10.0, 1.0], "s2": [89, 88, 89, 85, 86], "min1": 0, "max1": 12, "p1": "", "u1": "M", "d1": 1, "min2": 75, "max2": 95, "p2": "MC ", "u2": "", "d2": 0, "notes_zh": ["含 PC、主机与极受欢迎的 iPad/Android 高价移植版", "叠加天选者之战与全集大包，十年长卖常青标杆", "任天堂第一方战棋巅峰，证明角色羁绊+回合战棋具备四百万+全价潜力", "直接致敬 XCOM 掩体系统的全龄破圈神作，累计玩家超千万", "前 Firaxis XCOM 老兵组建 Bit Reactor 开发，2026年8月底发售一月即破百万份（$49.8M）"], "notes_en": ["Multi-million seller across Steam, consoles, and top-grossing iPad port", "Compounded over 10 years via War of the Chosen & Collection bundles", "Nintendo's 4M+ seller proving squad bonding + tactics scales cleanly", "Ubisoft's family-friendly XCOM homage surpassing 10M lifetime players", "Built by ex-Firaxis XCOM vets at Bit Reactor: >1M units & $49.8M in ~6 weeks (Oct 2026)"]}}, "pillarNotesZh": ["<strong>重玩度倍增器：</strong>没有两局战役的科技研发顺序、外星人突变节奏与伤亡名单是相同的。", "<strong>主机端破圈关键：</strong>在《星战零号连队》与《XCOM》收入中，主机版因客单价高贡献达 40% 营收。", "<strong>跨周目情感复利：</strong>上一档壮烈牺牲的老兵在下一档开局重逢，构筑极深情感联结。", "<strong>对比竞品优势：</strong>迪士尼/漫威等外部 IP 战棋严禁随意打换皮 Mod，唯有自有 IP 的 XCOM 拥有无限工坊自由。"], "pillarNotesEn": ["<strong>Infinite Campaign Variance:</strong> Procedural mission rewards, wound timers, and Chosen ambushes make every Ironman run unique.", "<strong>Console Revenue Share:</strong> Cinematic presentation unlocks high-ASP PS5 and Xbox players (~40% of genre revenue).", "<strong>Multi-Run Attachment:</strong> Seeing fallen favorites reborn in a fresh Ironman run fuels multi-hundred-hour loyalty.", "<strong>Owned-IP Freedom:</strong> Licensed Disney/Star Wars tactics games restrict wild modding, leaving XCOM unchallenged on Steam Workshop."], "radar": {"title_zh": "全球回合制小队战术标杆五维能力雷达", "title_en": "5-Axis Turn-Based Squad Tactics Capability Radar", "sub_zh": "对比《XCOM 2: 天选者之战》《火焰纹章：风花雪月》与《星球大战：零号连队 (2026)》", "sub_en": "Comparing XCOM 2: WotC, Fire Emblem: Three Houses, and Star Wars Zero Company (2026)", "axes_zh": ["战略基地与战术联动深度", "程序化多周目重玩寿命", "Steam 创意工坊模组生态", "角色永久阵亡紧张张力", "固定主线人物剧情演出"], "axes_en": ["Strategy-Tactics Loop", "Procedural Replayability", "Steam Modding Ecosystem", "Ironman Permadeath Tension", "Scripted Story Drama"], "pillar_axis_map": [0, 3, 1, 2], "series_labels": {"s1_zh": "XCOM 2: 天选者之战 (2K/Firaxis)", "s1_en": "XCOM 2: WotC (2K/Firaxis)", "s2_zh": "星球大战：零号连队 (EA/Bit Reactor)", "s2_en": "Star Wars Zero Co. (2026)", "s3_zh": "火焰纹章：风花雪月 (Nintendo)", "s3_en": "Fire Emblem: Three Houses"}, "s1": [98, 97, 99, 98, 72], "s2": [85, 82, 48, 86, 86], "s3": [78, 84, 25, 85, 96]}, "peerRowsZh": [{"category": "firaxis", "benchmark": true, "entity": "XCOM 2 + 天选者之战 (2016 / 2017)", "sub": "Firaxis Games · 品类巅峰完全体", "col2": "外星人统治地球后的反抗军游击战 · 程序化生成关卡 + 三大宿敌天选者", "col3": "100% 2K 自有 IP · PC 先发后扩至 PS4/XOne/Switch/iOS/Android", "col4": "Steam 峰值 13.29万 CCU · 累计多百万级", "col5": "MC 88 / 88 · 十年战棋天花板", "verdict": "商业与口碑双丰收标杆：证明自有科幻战术 IP + 重磅资料片 + 创意工坊具备十年长卖生命力。", "sourceLabel": "XCOM 2 Peak", "sourceUrl": "https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/"}, {"category": "firaxis", "benchmark": true, "entity": "XCOM: Enemy Unknown & Within (2012/13)", "sub": "Firaxis Games · 现代复兴鼻祖", "col2": "全球卫星防卫网 + 双行动点掩体射击 + 基因改造与巨型机甲战士（MEC）", "col3": "100% 2K 自有 IP · PC/PS3/X360 同步首发 + 2K China 移植 iPad/Android", "col4": "Steam 峰值 7.0万 · 首周登顶 Steam 与 iPad 畅销榜", "col5": "MC 89 (PC) / 90 (X360) / 91 (iOS)", "verdict": "横扫多家媒体 2012 年度最佳游戏，确立了延续至今的全球“XCOM-like”设计语法。", "sourceLabel": "XCOM EU Wiki", "sourceUrl": "https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown"}, {"category": "firaxis", "benchmark": false, "entity": "XCOM: Chimera Squad 奇美拉小队 (2020)", "sub": "Firaxis Games · 轻量城市特警实验作", "col2": "战后人类与外星人混编特警队 · 破门突入（Breach）+ 固定技能干员交替回合", "col3": "100% 自有 IP · PC Steam $19.99（首发半价 $9.99 福利回馈）", "col4": "Steam 峰值近 4.0万人", "col5": "MC 77 · 机制试验田", "verdict": "验证了破门演出爽快感，但也表明核心老玩家更偏爱自定义无名士兵而非固定英雄。", "sourceLabel": "FY26 10-K", "sourceUrl": "https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm"}, {"category": "firaxis", "benchmark": false, "entity": "Marvel's Midnight Suns 漫威暗夜之子 (2022)", "sub": "Firaxis Games · 外部授权试水", "col2": "刀锋战士/钢铁侠抽卡位移地形击退战棋 + 修道院好感度对话养成", "col3": "迪士尼漫威外部授权（需付版税）· PC/PS5/XSX", "col4": "商业销量低于预期（Zelnick 称之为叫好不叫座遗憾）", "col5": "MC 83 · 战斗设计获高赞", "verdict": "关键反面经验：漫威粉丝嫌弃回合制抽卡，XCOM 铁粉嫌弃修道院冗长社交——回归纯正 XCOM 才是正道！", "sourceLabel": "TTWO Metacritic", "sourceUrl": "https://www.metacritic.com/company/take-two-interactive/"}, {"category": "peer", "benchmark": false, "entity": "Star Wars Zero Company 星战零号连队 (2026.08)", "sub": "Bit Reactor (前 Firaxis 老兵) / EA", "col2": "克隆人战争末期硬核掩体小队战术（纯正 XCOM 精神继承者）", "col3": "卢卡斯影业外部授权 · Steam (69.9%) + PS5 (19.9%) + Xbox (10.2%)", "col4": "发售约 6 周销量 >100万份 · 总收入 $49.8M", "col5": "MC 86 (22年来最高分星战游戏)", "verdict": "极强行业验证信号：证明 2026 年市场对高水准正统掩体战术拥有极强全价购买力（主机占 40.1% 营收）。", "sourceLabel": "Alinea Oct 2026", "sourceUrl": "https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e"}, {"category": "peer", "benchmark": false, "entity": "Phoenix Point 凤凰点 (2019)", "sub": "Snapshot Games (1994老幽浮之父 Julian Gollop)", "col2": "第一人称自由瞄准部位破坏弹道模拟", "col3": "众筹独立研发 · 早期 Epic 独占后登全平台", "col4": "百万级以下小众体量", "col5": "MC 74 · 缺乏 3A 演出质感", "verdict": "连初代幽浮发明者亲自下场也未能接近 Firaxis《XCOM 2》的工业化演出与大众吸引力。", "sourceLabel": "XCOM EU Wiki", "sourceUrl": "https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown"}], "peerRowsEn": [{"category": "firaxis", "benchmark": true, "entity": "XCOM 2 + War of the Chosen (2016 / 2017)", "sub": "Firaxis Games · Genre Zenith", "col2": "Guerrilla resistance aboard the Avenger · Procedural maps + Chosen Nemesis bosses", "col3": "100% Owned 2K IP · PC debut followed by PS4/XOne/Switch/iOS/Android", "col4": "132.9k Peak Steam CCU · Multi-million seller", "col5": "MC 88 / 88 · Decade Tactics King", "verdict": "Commercial & critical pinnacle proving owned sci-fi tactics + major expansion + Steam Workshop compounds for 10+ years.", "sourceLabel": "XCOM 2 Peak", "sourceUrl": "https://www.reddit.com/r/Xcom/comments/44qdh3/xcom_2_is_firaxis_biggest_hit_yet/"}, {"category": "firaxis", "benchmark": true, "entity": "XCOM: Enemy Unknown & Within (2012/13)", "sub": "Firaxis Games · Modern Genre Revival", "col2": "Global satellite defense + 2-action cover gunplay + MEC cybernetics & gene mods", "col3": "100% Owned 2K IP · PC/PS3/X360 simultaneous + hit iPad/Android ports", "col4": "~70k Steam CCU · #1 Steam & iPad grossing debut", "col5": "MC 89 (PC) / 90 (X360) / 91 (iOS)", "verdict": "Won multiple 2012 GOTY awards and established the modern 'XCOM-like' design blueprint.", "sourceLabel": "XCOM EU Wiki", "sourceUrl": "https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown"}, {"category": "firaxis", "benchmark": false, "entity": "XCOM: Chimera Squad (2020)", "sub": "Firaxis Games · Tactical Breach Spin-Off", "col2": "Human-alien SWAT team in City 31 · Breach entry mode & interleaved turn order", "col3": "100% Owned IP · Budget $19.99 ($9.99 launch promo) PC release", "col4": "~39.6k Peak Steam CCU", "col5": "MC 77 · Design Sandbox", "verdict": "Validated snappy Breach mechanics while confirming core fans prefer custom permadeath rookies over preset heroes.", "sourceLabel": "FY26 10-K", "sourceUrl": "https://www.sec.gov/Archives/edgar/data/946581/000162828026037434/ttwo-20260331.htm"}, {"category": "firaxis", "benchmark": false, "entity": "Marvel's Midnight Suns (2022)", "sub": "Firaxis Games · Licensed Card-Tactics Hybrid", "col2": "Card-driven knockback arena combat + Abbey superhero social RPG", "col3": "Licensed Disney/Marvel IP (royalty-bearing) · PC/PS5/XSX", "col4": "Commercial miss despite critical acclaim", "col5": "MC 83 · Praised Combat Loop", "verdict": "Valuable strategic lesson: card mechanics alienated XCOM purists while royalties compressed margins—steering Firaxis back to owned XCOM.", "sourceLabel": "TTWO Metacritic", "sourceUrl": "https://www.metacritic.com/company/take-two-interactive/"}, {"category": "peer", "benchmark": false, "entity": "Star Wars Zero Company (Aug 2026)", "sub": "Bit Reactor (Ex-Firaxis Vets) / EA", "col2": "Clone Wars turn-based cover tactics built by XCOM alumni", "col3": "Licensed Lucasfilm IP · Steam (69.9%) + PS5 (19.9%) + Xbox (10.2%)", "col4": ">1.0M copies & $49.8M gross in ~6 weeks", "col5": "MC 86 (Highest-rated SW game in 22 yrs)", "verdict": "Fresh 2026 market proof: 34% of buyers played XCOM, and console copies drove 40.1% of revenue due to full regional pricing.", "sourceLabel": "Alinea Oct 2026", "sourceUrl": "https://gamedevreports.substack.com/p/weekly-gaming-reports-recap-october-e7e"}, {"category": "peer", "benchmark": false, "entity": "Phoenix Point (2019)", "sub": "Snapshot Games (Original 1994 X-COM Creator)", "col2": "Free-aim ballistic body-part targeting & mutating alien factions", "col3": "Crowdfunded indie · Timed Epic exclusive then Steam/Console", "col4": "Niche sub-million audience", "col5": "MC 74 · Lacked AAA presentation", "verdict": "Showed that even X-COM's original creator couldn't match Firaxis's AAA cinematic polish and accessibility.", "sourceLabel": "XCOM EU Wiki", "sourceUrl": "https://en.wikipedia.org/wiki/XCOM:_Enemy_Unknown"}], "peerCountUnitZh": "部战术策略代表作", "peerCountUnitEn": "Tactical Benchmarks", "barsChart": {"title_zh": "《XCOM》跨平台媒体评分统治力与 2026 战术市场结构核验（%/分值）", "title_en": "XCOM Multi-Platform Critical Scores & 2026 Tactics Market Telemetry", "sub_zh": "结合 Wikipedia 评测档案与 Alinea Analytics 2026 年 10 月最新战术品类消费结构报告", "sub_en": "Grounded in Metacritic records and October 2026 Alinea Analytics tactical genre telemetry", "badge_zh": "权威评测与画像数据", "badge_en": "Verified Telemetry", "maxX": 100, "prefix": "", "suffix": "%", "axisDecimals": 0, "valDecimals": 1, "items_zh": [{"label": "XCOM: Enemy Unknown iOS 移植版评分", "val": 91.0, "sub": "MC 91 / 100 · 首周登顶 iPad 畅销榜", "note": "全价买断制策略游戏移动端适配天花板"}, {"label": "XCOM: Enemy Unknown 主机/PC 媒体均分", "val": 89.5, "sub": "X360 90分 · PC/PS3 89分", "note": "斩获 DICE 与 Spike 年度最佳策略游戏"}, {"label": "XCOM 2 及《天选者之战》媒体均分", "val": 88.0, "sub": "MC 88 / 100 · 13.29万 Steam 并发", "note": "奠定程序化关卡与天选者宿敌完全体"}, {"label": "2026 战术新品 PC Steam 销量渠道占比", "val": 69.9, "sub": "Steam 占 69.9% 拷贝 / 59.9% 收入", "note": "硬核 PC 社区仍是小队战术游戏首发基本盘"}, {"label": "2026 战术新品主机端（PS5+Xbox）营收占比", "val": 40.1, "sub": "30.1% 拷贝贡献高达 40.1% 总营收", "note": "主机端无低价区套利，单份客单价显著高于 PC"}, {"label": "2026 战术新品买家中 XCOM 老玩家比例", "val": 34.0, "sub": "Steam 34% (28% X2 + 6% EU) · 主机 32%", "note": "印证 XCOM 十年后仍是全球战棋玩家最大源头"}], "items_en": [{"label": "XCOM: Enemy Unknown iOS Port Score", "val": 91.0, "sub": "91 / 100 MC · Top-grossing iPad debut", "note": "Benchmark for premium touch-screen tactics"}, {"label": "XCOM: Enemy Unknown Console/PC Score", "val": 89.5, "sub": "90 X360 · 89 PC & PS3 Metacritic", "note": "2012 Strategy Game of the Year winner"}, {"label": "XCOM 2 & War of the Chosen Score", "val": 88.0, "sub": "88 / 100 MC · 132.9k Steam peak CCU", "note": "Gold standard for procedural squad tactics"}, {"label": "2026 AAA Tactics Steam Unit Share", "val": 69.9, "sub": "69.9% of copies on Steam (Alinea 2026)", "note": "PC remains the core volume driver for tactics"}, {"label": "2026 AAA Tactics Console Revenue Share", "val": 40.1, "sub": "30.1% console units drive 40.1% revenue", "note": "Higher console regional pricing boosts ASP"}, {"label": "Prior XCOM Players in 2026 Tactics Hits", "val": 34.0, "sub": "34% on Steam & 32% on PS5/Xbox", "note": "Proves massive dormant XCOM fanbase awaiting XCOM 3"}]}, "histChart": {"title_zh": "战术策略品类跨端单份收益与区域客单价核验（基于 2026 市场实测数据）", "title_en": "Tactical Strategy Revenue Velocity & Platform Realization Breakdown", "sub_zh": "展示《XCOM》典型生命周期从 PC 首发、主机全价同步、大型资料片到掌机/移动端的四波段收割", "sub_en": "Four-wave monetization lifecycle across PC + Console launch, Major Expansion, Switch 2, and Collection tail", "badge_zh": "四波段变现曲线", "badge_en": "4-Wave Lifecycle", "left_axis_zh": "■ 左轴：阶段累计总预订额 ($M)", "left_axis_en": "■ Left Axis: Cumulative Lifecycle Bookings ($M)", "right_axis_zh": "● 右轴：营业利润率爬坡 (%)", "right_axis_en": "● Right Axis: Cumulative Operating Margin (%)", "legend": {"bar_zh": "单代 XCOM 累计总预订额 (左轴 · $M)", "bar_en": "Cumulative XCOM Entry Bookings (Left · $M)", "line_zh": "扣减研发摊销后累计营业利润率 (右轴 · %)", "line_en": "Cumulative Operating Margin Post-R&D (Right · %)"}, "labels_zh": ["首季 (PC+主机首发)", "第1年末 (DLC小包)", "第2年 (天选者大资料片)", "第3年 (Switch2/iPad)", "第5年 (典藏合集包)"], "labels_en": ["Launch Qtr", "Year 1 End", "Year 2 (Major Exp)", "Year 3 (Switch2/iOS)", "Year 5 (Collection)"], "subs_zh": ["(覆盖研发本金)", "(利润率转正)", "($39.99高转化)", "(便携端二轮)", "(纯利长尾)"], "subs_en": ["(Recoups R&D)", "(Margin Positive)", "($39.99 Expansion)", "(Portable Ports)", "(Workshop Tail)"], "bars": [115, 165, 245, 290, 345], "line": [12, 26, 38, 42, 46], "minB": 0, "maxB": 390, "pB": "$", "uB": "M", "dB": 0, "minL": 0, "maxL": 55, "pL": "", "uL": "%", "dL": 0, "milestoneVal": 35, "milestone_zh": "35% 高利润率精品线", "milestone_en": "35% High-Margin Target", "notes_zh": ["Steam 与 PS5/XSX 首日同步发售，主机高客单价加速首季回本", "战术装饰包与新兵种小 DLC（如沈的最后礼物）维系首年热度", "推出《内部敌人 / 天选者之战》级重磅资料片引爆老粉高比例复购", "移植至 Switch 2 与 iPad 触屏端收获零边际研发增量", "Long War 3 等大型社区模组支撑终极合集包长卖五年以上"], "notes_en": ["Simultaneous Steam + PS5/XSX launch recovers core dev budget rapidly", "Class & mission DLCs bridge Year-1 engagement", "Major $39.99 expansion (Enemy Within / WotC tier) drives margin jump", "Switch 2 and iPad ports capture portable tacticians", "Steam Workshop overhaul mods keep Ultimate Collection selling through Year 5+"]}, "simConfig": {"presets": {"base": {"v1": 5.5, "v2": 44, "v3": 42, "flag": true}, "bull": {"v1": 8.0, "v2": 48, "v3": 50, "flag": true}, "bear": {"v1": 3.2, "v2": 38, "v3": 30, "flag": false}}, "defaultPreset": "base", "defaultVals": {"v1": 5.5, "v2": 44, "v3": 42, "flag": true}, "xLabelsZh": ["首发季", "第1年", "第2年(大DLC)", "第3年(掌机)", "第5年"], "xLabelsEn": ["Launch", "Year 1", "Year 2 (Exp)", "Year 3 (Port)", "Year 5"], "activeCurveLabelZh": "自有 XCOM 累计净回款", "activeCurveLabelEn": "100% Owned XCOM Net Receipts", "baseCurveLabelZh": "外部授权IP扣版税对比线", "baseCurveLabelEn": "20%-Royalty Licensed Counterfactual"}, "checklistZh": [{"tag": "回归无名小兵定制", "title": "1. 坚持“白板新兵全自定义 + 铁人永久死亡”核心灵魂（拒绝抽卡或固定英雄）", "desc": "吸取《奇美拉小队》固定干员与《暗夜之子》抽卡遇冷教训，确保新作 100% 回归玩家亲手捏人、培养、截肢改造或壮烈牺牲的涌现叙事。"}, {"tag": "深海/星际新舞台", "title": "2. 世界观舞台跃迁测试：致敬经典《深海恐怖（Terror from the Deep）》或反攻母星？", "desc": "《XCOM 2：天选者之战》结局彩蛋明确指向海底深渊异动，观察新作如何刷新地图垂直纵深与恐怖压迫感。"}, {"tag": "全平台首日同步", "title": "3. Steam + PS5 + Xbox Series X|S + Switch 2（支持手柄与鼠标模式）同步首发", "desc": "锁定占营收 40% 的高单价主机市场与便携躺玩掌机群体，避免分批移植损耗首发营销声量。"}, {"tag": "首发内置 Mod SDK", "title": "4. 首日开放完整地图、兵种与语音创意工坊工具包测试", "desc": "确保发售首周即激活星战、战锤、光环模组作者迁移，锁定未来 8–10 年零获客成本长尾。"}, {"tag": "里程碑品控把关", "title": "5. 2025 重组后的新主创团队内部试玩“好玩度”验证", "desc": "延续 Firaxis“不好玩就推倒重调”传统，确保跨过内部 Alpha 里程碑后再正式官宣定档。"}, {"tag": "18个月大资料片", "title": "6. 预留《内部敌人 / 天选者之战》级单部重磅机制资料片架构接口", "desc": "比起零碎皮肤包，XCOM 玩家对改变底层规则的 $39.99 大型资料片付费率最高，需提前模块化设计。"}], "checklistEn": [{"tag": "Custom Permadeath", "title": "1. Pure Grid Tactics + Custom Rookie Permadeath (No Card Decks)", "desc": "Apply Midnight Suns and Chimera Squad lessons by doubling down on customizable soldiers, Ironman stakes, and percentage gunplay."}, {"tag": "Deep-Sea / Space Hook", "title": "2. Fresh Campaign Premise (Terror from the Deep Tease or Alien Homeworld)", "desc": "Build on XCOM 2's ocean-trench ending tease to deliver novel environmental hazards and horror tension."}, {"tag": "Day-One Multi-Platform", "title": "3. Simultaneous Steam, PS5, Xbox Series X|S & Switch 2 Launch", "desc": "Capture full-price console buyers (~40% revenue share) alongside core Steam PC tacticians on Day 1."}, {"tag": "Day-One Modding SDK", "title": "4. Comprehensive Steam Workshop SDK at Launch", "desc": "Empower Long War-style overhaul creators and cosmetic squad modders from week one."}, {"tag": "Post-Reset Milestone", "title": "5. Post-2025 Studio Restructuring Gameplay Loop Sign-Off", "desc": "Ensure Firaxis's tactical team clears rigorous internal fun-factor gates before announcing a firm launch window."}, {"tag": "Chosen-Scale Expansion", "title": "6. Modular Architecture Built for a Major Year-2 Expansion", "desc": "Anchor post-launch monetization around a transformative $39.99 Enemy Within / War of the Chosen-scale expansion."}]};
    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_CHECK_KEY = DATA.storageCheckKey;

    var state = {
      lang: 'zh',
      theme: 'light',
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
              var baseAsp = simState.v2;
              var expPct = simState.v3;
              var portNetM = simState.flag ? 28.0 : 0.0;

              var baseGrossM = unitsM * baseAsp;
              var expGrossM = unitsM * (expPct / 100) * 32.0;
              var totalGrossM = baseGrossM + expGrossM + (simState.flag ? 39.0 : 0);

              var ownedNetM = (baseGrossM + expGrossM) * 0.71 + portNetM;
              var royaltySavedM = ownedNetM * 0.20;
              var licensedNetM = (ownedNetM - royaltySavedM) * 0.88;
              var opProfitM = ownedNetM - 75.0;

              var pace = [0.34, 0.52, 0.76, 0.89, 1.00];
              var activeSeries = [];
              var baseSeries = [];
              for (var i = 0; i < 5; i++) {
                activeSeries.push(ownedNetM * pace[i]);
                baseSeries.push(licensedNetM * pace[i]);
              }

              return {
                label1: unitsM.toFixed(1) + 'M',
                label2: '$' + baseAsp.toFixed(0),
                label3: expPct.toFixed(0) + '%',
                out1: '$' + Math.round(totalGrossM) + 'M',
                out2: '$' + Math.round(ownedNetM) + 'M',
                out3: '+$' + Math.round(royaltySavedM) + 'M',
                out4: (opProfitM >= 0 ? '+$' : '-$') + Math.abs(Math.round(opProfitM)) + 'M',
                activeSeries: activeSeries,
                baseSeries: baseSeries,
                formatY: function (v) { return '$' + Math.round(v) + 'M'; }
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
  