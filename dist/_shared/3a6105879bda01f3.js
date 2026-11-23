
  (function () {
    'use strict';

    /* ======================================================================
       1. Grounded Datasets, Bilingual Dictionary & State Model
       ====================================================================== */
    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_CHECK_KEY = 'mui_ntdoy_checklist_v1';

    var DOC_TITLE_ZH = '任天堂株式会社 Nintendo (7974.T / NTDOY) 深度投资与商业模式研究报告 | 数据中心';
    var DOC_TITLE_EN = 'Nintendo Co., Ltd. (7974.T / NTDOY) Equity & Business Model Deep Dive | Research Hub';

    var I18N_RICH_MAP = {
      nt_r00: {
        zh: '任天堂株式会社 Nintendo Co., Ltd. 深度投资与商业模式研究报告：<span class="gradient-accent">软硬一体飞轮、跨世代超级 IP 矩阵与零负债现金堡垒</span>',
        en: 'Nintendo Co., Ltd. (7974.T / NTDOY) Equity &amp; Business Model Deep Dive: <span class="gradient-accent">Hardware-Software Flywheel, Evergreen IP &amp; Zero-Debt Cash Fortress</span>'
      },
      nt_r01: {
        zh: '为什么在索尼与微软竞逐百亿晶体管算力、欧美 3A 游戏大厂深陷动辄数亿美元研发成本与大规模裁员潮的时代，创立逾百年的京都巨头<strong>任天堂（Nintendo, TYO: 7974 / NTDOY）</strong>却能以极低的人员流失率持续改写娱乐史？答案在于其独步全球的<strong>“专用硬件入口 + 100% 独占第一方常青软件 + 4 亿 Nintendo Account 跨世代账户 + 电影与主题乐园全龄放大器”</strong>闭环生态。2025 年 6 月全球首发的 <strong>Nintendo Switch 2</strong> 创下任天堂主机最快开局纪录，推动 FY2026（截至 2026 年 3 月）合并净营收同比暴涨 <strong>98.6%</strong> 至 <strong>¥23,130.5 亿（约 $146 亿美元）</strong>、归母净利润增长 <strong>51.3%</strong> 至 <strong>¥4,240.6 亿</strong> <a class="cite-link" href="https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2" target="_blank" rel="noopener noreferrer">GamesIndustry FY26 ↗</a>。截至 2026 年 9 月 30 日（FY2027 H1 半年报），Switch 2 累计硬件销量已达 <strong>2,635 万台</strong>、软件累计出货 <strong>7,321 万份</strong>，初代 Switch 累计销量更攀升至 <strong>1.5720 亿台</strong>；随着数字版软件占比跃升至 <strong>60.7%</strong>，FY2027 上半年营业利润逆势大增 <strong>49.1%</strong> 至 <strong>¥2,165 亿</strong> <a class="cite-link" href="https://simulationdaily.com/news/nintendo-financial-results-q2-fy2027/" target="_blank" rel="noopener noreferrer">Q2 FY27 Results ↗</a>。与此同时，2026 年 4 月上映的《超级马力欧银河大电影》全球票房再度突破 <strong>$10.1 亿美元</strong>（系列动画电影累计超 <strong>$23.7 亿</strong>） <a class="cite-link" href="https://corporate.comcast.com/press/releases/illumination-and-universal-pictures-super-mario-galaxy-movie-becomes-first-1-billion-film-of-2026" target="_blank" rel="noopener noreferrer">Universal Box Office ↗</a>，配合账面 <strong>¥1.93 万亿零有息负债净现金</strong>与京都本部仅 <strong>2.3% 离职率</strong>的工匠团队 <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">Nintendo Workforce ↗</a>，构筑起攻守兼备的全球家庭娱乐帝国。',
        en: 'While rivals chase raw GPU teraflops and Western AAA studios grapple with ballooning $300M+ budgets and mass layoffs, century-old Kyoto powerhouse <strong>Nintendo Co., Ltd. (TYO: 7974 / NTDOY)</strong> compounds value through an unrivaled closed loop: <strong>dedicated hybrid hardware + 100% exclusive first-party evergreen software + >400M cross-gen Nintendo Accounts + theatrical &amp; theme-park IP multipliers</strong>. Following the record-breaking June 2025 debut of <strong>Nintendo Switch 2</strong>, FY2026 (ended March 2026) consolidated net sales surged <strong>+98.6% YoY</strong> to <strong>¥2,313.1B (~$14.6B)</strong> and net profit climbed <strong>+51.3%</strong> to <strong>¥424.1B</strong> <a class="cite-link" href="https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2" target="_blank" rel="noopener noreferrer">GamesIndustry FY26 ↗</a>. As of September 30, 2026 (H1 FY27), Switch 2 reached <strong>26.35M hardware units</strong> and <strong>73.21M software units</strong> while original Switch hit <strong>157.20M units</strong>; propelled by a <strong>60.7% digital sales mix</strong>, H1 FY27 operating profit jumped <strong>+49.1% YoY</strong> to <strong>¥216.5B</strong> <a class="cite-link" href="https://simulationdaily.com/news/nintendo-financial-results-q2-fy2027/" target="_blank" rel="noopener noreferrer">Q2 FY27 Results ↗</a>. Paired with <em>The Super Mario Galaxy Movie</em> crossing <strong>$1.01B+</strong> globally in 2026 (lifting the Mario film franchise past <strong>$2.37B</strong>) <a class="cite-link" href="https://corporate.comcast.com/press/releases/illumination-and-universal-pictures-super-mario-galaxy-movie-becomes-first-1-billion-film-of-2026" target="_blank" rel="noopener noreferrer">Universal Box Office ↗</a>, <strong>¥1.93T in debt-free cash</strong>, and <strong>2.3% Kyoto parent turnover</strong> <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">Nintendo Workforce ↗</a>, Nintendo stands as global entertainment\'s most resilient IP fortress.'
      },
      nt_r02: {
        zh: 'FY2026 净营收达 ¥23,130.5 亿（$146亿），营业利润 ¥3,601 亿；27H1 营业利润再增 +49.1% 至 ¥2,165 亿 <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">SQ Stats ↗</a>。',
        en: 'FY26 net sales hit ¥2,313.1B ($14.6B) with ¥360.1B OP; H1 FY27 operating profit jumped +49.1% YoY to ¥216.5B <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">SQ Stats ↗</a>.'
      },
      nt_r03: {
        zh: 'Switch 2 上市 16 个月售出 2,635 万台（软件 7,321 万份）；初代 Switch 达 1.5720 亿台稳居影史主机榜眼 <a class="cite-link" href="https://simulationdaily.com/news/nintendo-financial-results-q2-fy2027/" target="_blank" rel="noopener noreferrer">Q2 FY27 ↗</a>。',
        en: 'Switch 2 shipped 26.35M consoles (73.21M games) in 16 months; original Switch reached 157.20M as #2 console in history <a class="cite-link" href="https://simulationdaily.com/news/nintendo-financial-results-q2-fy2027/" target="_blank" rel="noopener noreferrer">Q2 FY27 ↗</a>.'
      },
      nt_r04: {
        zh: '27H1 数字版软件收入占比升至 60.7%（FY26 为 54.6%），年活跃游玩用户 1.28 亿、NSO 付费会员超 3,400 万 <a class="cite-link" href="https://www.shanethegamer.com/research/nintendo-eshop-facts/" target="_blank" rel="noopener noreferrer">eShop Facts ↗</a>。',
        en: 'Digital software share hit 60.7% in H1 FY27 (up from 54.6% in FY26), backed by 128M annual playing users and >34M NSO members <a class="cite-link" href="https://www.shanethegamer.com/research/nintendo-eshop-facts/" target="_blank" rel="noopener noreferrer">eShop Facts ↗</a>.'
      },
      nt_r05: {
        zh: '账面现金及存款 ¥1.93 万亿、有息负债为 0（每股净现金 ¥1,672.8）；全球 8,666 名员工人均创收 ¥2.669 亿 <a class="cite-link" href="https://stockanalysis.com/quote/tyo/7974/statistics/" target="_blank" rel="noopener noreferrer">7974 Stats ↗</a>。',
        en: '¥1.93T cash &amp; zero debt (¥1,672.8/sh net cash); 8,666 consolidated staff generate ¥266.9M ($1.68M) sales/FTE <a class="cite-link" href="https://stockanalysis.com/quote/tyo/7974/statistics/" target="_blank" rel="noopener noreferrer">7974 Stats ↗</a>.'
      },
      nt_r06: {
        zh: '与把第一方大作同步或移植 PC/多平台的微软、索尼不同，任天堂核心主机大作 100% 锁定自家硬件，既省去 30% 外部渠道抽成，又反向拉动两亿级硬件装机 <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">SQ Platform ↗</a>。',
        en: 'Unlike Sony and Microsoft porting tentpoles to PC, Nintendo keeps core console IP 100% exclusive to its own hardware—retaining 100% of platform economics while pulling hardware adoption <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">SQ Platform ↗</a>.'
      },
      nt_r07: {
        zh: 'FY2026 因低毛利新硬件集中出货（1,986万台）致毛利率阶段性降至 39.3%；进入 FY2027 H1 软件与数字版放量后，即便硬件回落，营业利润仍劲增 49.1% <a class="cite-link" href="https://shattered.io/nintendo-earnings-2026/" target="_blank" rel="noopener noreferrer">FY27 H1 Profit ↗</a>。',
        en: 'Heavy launch-year hardware mix (19.86M units) compressed FY26 gross margin to 39.3%; in H1 FY27, surging digital &amp; first-party software drove +49.1% YoY operating profit growth <a class="cite-link" href="https://shattered.io/nintendo-earnings-2026/" target="_blank" rel="noopener noreferrer">FY27 H1 Profit ↗</a>.'
      },
      nt_r08: {
        zh: '步入第 10 年的初代 Switch 在 FY26 仍售出 380 万台硬件与 1.369 亿份软件；新作《朋友收集 梦想生活》热销 881 万份，其中 40% 玩家直接在 Switch 2 上游玩 <a class="cite-link" href="https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2" target="_blank" rel="noopener noreferrer">Cross-Gen Hit ↗</a>。',
        en: 'Entering Year 10, original Switch still sold 3.80M consoles and 136.91M games in FY26; breakout hit Tomodachi Life: Living the Dream reached 8.81M units with 40% played on Switch 2 <a class="cite-link" href="https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2" target="_blank" rel="noopener noreferrer">Cross-Gen Hit ↗</a>.'
      },
      nt_r09: {
        zh: '<strong>应对存储芯片涨价的果断定价权（2026年9月）：</strong>面对全球 DRAM/NAND 存储组件持续紧缺与成本上行，任天堂于 2026 年 9 月 1 日将美版 Switch 2 建议零售价由 $449.99 上调至 $499.99，并同步调整部分区域硬件与 NSO 价格，坚守“绝不长期亏本卖硬件”的财务铁律 <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">2026 Price Revision ↗</a>。',
        en: '<strong>Decisive Pricing Power Amid Memory Crunch (Sep 2026):</strong> Facing global DRAM/NAND component inflation, Nintendo raised U.S. Switch 2 MSRP from $449.99 to $499.99 on Sep 1, 2026 alongside regional hardware and NSO adjustments—upholding its rule against structural hardware losses <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">2026 Price Revision ↗</a>.'
      },
      nt_r10: {
        zh: 'Switch 2 护航旗舰《马力欧卡丁车 世界》（定价 $79.99 含同捆）截至 2026 年 9 月累计销量已飙升至 1,648 万份，意味着每 10 位 Switch 2 机主中就有超过 6 人拥有该作；同期《咚奇刚 蕉力全开》亦突破 505 万份 <a class="cite-link" href="https://www.nintendolife.com/news/2026/11/here-are-the-best-selling-switch-1-and-2-games-as-of-september-2026" target="_blank" rel="noopener noreferrer">Switch 2 Best-Sellers ↗</a>。',
        en: 'Switch 2 launch flagship Mario Kart World ($79.99 MSRP / bundle) reached 16.48M units by Sep 30, 2026—a staggering 62.5% attach rate across all Switch 2 owners—followed by Donkey Kong Bananza at 5.05M units <a class="cite-link" href="https://www.nintendolife.com/news/2026/11/here-are-the-best-selling-switch-1-and-2-games-as-of-september-2026" target="_blank" rel="noopener noreferrer">Switch 2 Best-Sellers ↗</a>.'
      },
      nt_r11: {
        zh: '2025 年 10 月发售的《宝可梦传说 Z-A（Switch 2 版）》售出 394 万+ 份；2026 年 3 月独占新作《Pokémon Pokopia》上市仅 4 天全球热销 220 万份（累计破 400 万份），经典复刻《火红/叶绿》6 周亦贡献超 400 万数字销量 <a class="cite-link" href="https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2" target="_blank" rel="noopener noreferrer">Pokémon Momentum ↗</a>。',
        en: 'Pokémon Legends: Z-A (Switch 2 Edition) sold 3.94M+ copies, March 2026 exclusive Pokémon Pokopia sold 2.2M in 4 days (4.0M+ cumulative), and digital FireRed &amp; LeafGreen topped 4M units in 6 weeks <a class="cite-link" href="https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2" target="_blank" rel="noopener noreferrer">Pokémon Momentum ↗</a>.'
      },
      nt_r12: {
        zh: 'eShop 数字版下载、DLC 扩充票与 Nintendo Switch Online（超 3,400 万付费订户）省去了实体卡带封装与零售返点，直接推动 FY2027 Q1 数字销售额同比激增 90.0% 至 ¥1,327 亿，成为利润率修复头号功臣 <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">Digital Surge ↗</a>。',
        en: 'Full-game downloads, DLC, and Nintendo Switch Online (>34M paid subscribers) bypass physical cartridge ROM costs and retail margins—driving Q1 FY27 digital sales up +90.0% YoY to ¥132.7B <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">Digital Surge ↗</a>.'
      },
      nt_r13: {
        zh: '继首部《超级马力欧兄弟大电影》斩获 $13.62 亿票房后，2026 年 4 月上映的《超级马力欧银河大电影》上映 10 周即成为 2026 年全球首部破 $10 亿美元大片（累计约 $10.1 亿+），实现“高票房分成 + 亲子新用户破圈”双重收益 <a class="cite-link" href="https://fortune.com/2026/11/14/gta-vi-biggest-entertainment-launch-preorders-hollywood/" target="_blank" rel="noopener noreferrer">Fortune Box Office ↗</a>。',
        en: 'Following The Super Mario Bros. Movie ($1.362B), April 2026 sequel The Super Mario Galaxy Movie became 2026\'s first $1B global blockbuster (~$1.01B+), pairing high-margin box-office royalties with family customer acquisition <a class="cite-link" href="https://fortune.com/2026/11/14/gta-vi-biggest-entertainment-launch-preorders-hollywood/" target="_blank" rel="noopener noreferrer">Fortune Box Office ↗</a>.'
      },
      nt_r14: {
        zh: '<strong>1. 跨代平滑过渡已获验证：</strong>Switch 2 上市 16 个月斩获 2,635 万台装机，彻底打破任天堂历史上“一代神机、一代滑铁卢”的宿命。<br/><strong>2. 利润率步入上行收获通道：</strong>27H1 数字版占比突破 60.7%，第一方千万级软件放量正快速拉升整体毛利与营业利润率。<br/><strong>3. 稀缺全龄跨代资产与现金底牌：</strong>迪士尼级别的亲子 IP 矩阵叠加 ¥1.93 万亿零负债现金，具备极强抗通胀与抗衰退韧性。',
        en: '<strong>1. Proven Cross-Gen Continuity:</strong> 26.35M Switch 2 units in 16 months breaks Nintendo\'s historical boom-bust hardware curse.<br/><strong>2. Expanding Software Margin Mix:</strong> 60.7% digital share in H1 FY27 and million-seller exclusives are rapidly lifting operating margins.<br/><strong>3. Irreplaceable Family IP &amp; Cash Shield:</strong> Multi-generational franchises backed by ¥1.93T debt-free cash provide unmatched defensive resilience.'
      },
      nt_r15: {
        zh: '<strong>1. 存储芯片成本与硬件涨价弹性：</strong>2026 年 9 月美版 Switch 2 提价至 $499.99 后，FY27 Q2 硬件单季出货回落至 267 万台（H2 需在圣诞旺季冲刺约 1,001 万台方能兑现全年 1,650 万台硬件指引）<a class="cite-link" href="https://shattered.io/switch-2-2-67-million-q2-fy27-16-5-million-target-h2-math-2026/" target="_blank" rel="noopener noreferrer">H2 Hardware Math ↗</a>。<br/><strong>2. 汇率波动敏感性：</strong>海外销售占比近 78%，日元若大幅升值将对折算营收与汇兑收益（Ordinary Profit）造成账面扰动。<br/><strong>3. 外部超级大作注意力竞争：</strong>移动端碎片化娱乐与 2026–2027 行业现象级第三方大作对轻度玩家时长的阶段性争夺。',
        en: '<strong>1. Memory Component Inflation &amp; Price Elasticity:</strong> After raising U.S. Switch 2 MSRP to $499.99 in Sep 2026, Q2 shipments moderated to 2.67M (requiring ~10.01M holiday H2 units to hit full-year 16.5M guidance) <a class="cite-link" href="https://shattered.io/switch-2-2-67-million-q2-fy27-16-5-million-target-h2-math-2026/" target="_blank" rel="noopener noreferrer">H2 Hardware Math ↗</a>.<br/><strong>2. FX Sensitivity:</strong> With ~78% overseas revenue, sharp yen appreciation can create translation headwinds.<br/><strong>3. Attention Competition:</strong> Short-form mobile media and major 2026–2027 third-party releases competing for casual leisure hours.'
      },
      nt_r16: {
        zh: '山内溥与宫本茂、横井军平凭借红白机（FC）与 Game Boy（1.1869 亿台）重建全球主机秩序与权利金制度；2002 年岩田聪出任社长后提出“扩大游戏人口”，以双屏触控 NDS（1.5402 亿台）与体感 Wii（1.0163 亿台）开辟家庭蓝海，但也经历了 Wii U 定位模糊（仅约 1,356 万台）的深刻阵痛 <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">Console History ↗</a>。',
        en: 'Hiroshi Yamauchi, Shigeru Miyamoto, and Gunpei Yokoi defined modern console licensing with Famicom/NES and Game Boy (118.69M). Satoru Iwata\'s "Expanding the Gaming Population" unlocked blue-ocean hits DS (154.02M) and Wii (101.63M) before encountering the Wii U setback (~13.56M) <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">Console History ↗</a>.'
      },
      nt_r17: {
        zh: '吸取 Wii U 软件阵容断档教训，任天堂于 2015 年将家用机与掌机研发团队合并为统一的 Nintendo EPD，把全部第一方火力集中投向单一混合平台 Switch（2017.03 首发），创造累计超 1.57 亿台硬件、超 15 亿份软件的队史最高商业纪录 <a class="cite-link" href="https://en.wikipedia.org/wiki/Nintendo_Software_Planning_%26_Development" target="_blank" rel="noopener noreferrer">EPD Merger ↗</a>。',
        en: 'Learning from Wii U software droughts, Nintendo merged handheld and home-console R&amp;D into unified Nintendo EPD in 2015—focusing 100% of first-party output onto hybrid Switch (157.20M consoles, >1.50B games sold) <a class="cite-link" href="https://en.wikipedia.org/wiki/Nintendo_Software_Planning_%26_Development" target="_blank" rel="noopener noreferrer">EPD Merger ↗</a>.'
      },
      nt_r18: {
        zh: '古川俊太郎以 4 亿 Nintendo Account 为纽带推动 Switch 2 于 2025 年 6 月平滑接棒（首四天破 350 万台、截至 2026 年 9 月达 2,635 万台），同时携手照明娱乐/环球影业打造两部破十亿美元马力欧动画电影与三大主题乐园，完成从“游戏硬件商”向“永续全球 IP 生态平台”的升维 <a class="cite-link" href="https://corporate.comcast.com/press/releases/illumination-and-universal-pictures-super-mario-galaxy-movie-becomes-first-1-billion-film-of-2026" target="_blank" rel="noopener noreferrer">Galaxy Movie $1B ↗</a>。',
        en: 'President Shuntaro Furukawa anchored Switch 2\'s seamless June 2025 handover (>3.5M in 4 days; 26.35M by Sep 2026) on 400M Nintendo Accounts while scaling two $1B+ Mario films and 3 Universal theme parks into a perpetual IP ecosystem <a class="cite-link" href="https://corporate.comcast.com/press/releases/illumination-and-universal-pictures-super-mario-galaxy-movie-becomes-first-1-billion-film-of-2026" target="_blank" rel="noopener noreferrer">Galaxy Movie $1B ↗</a>.'
      },
      nt_r19: {
        zh: '动用充沛账面现金提前大规模锁定产能以遏制黄牛溢价，Switch 2 仅用约 10 个月便突破 1,986 万台（同期 PS5 达成同等规模耗时约 22 个月），并凭向下兼容稳住 1.28 亿活跃玩家基本盘 <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">Switch 2 vs PS5 Pace ↗</a>。',
        en: 'Deploying its cash fortress to pre-build anti-scalper inventory, Switch 2 cleared 19.86M units in ~10 months (vs. ~22 months for PS5) while retaining 128M active Switch players via backward compatibility <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">Switch 2 vs PS5 Pace ↗</a>.'
      },
      nt_r20: {
        zh: '摒弃 1993 年单纯甩手卖版权的失败模式，宫本茂深度介入剧本与角色把控，与照明娱乐合拍的首作 ($13.62亿) 与 2026 续作《超级马力欧银河大电影》($10.1亿+) 双双破十亿，直接带动游戏长尾回流 <a class="cite-link" href="https://www.nbcuniversal.com/article/super-mario-galaxy-movie-smashes-box-office-records-worldwide" target="_blank" rel="noopener noreferrer">NBCUniversal ↗</a>。',
        en: 'Replacing passive 1990s licensing with hands-on creative co-production led by Shigeru Miyamoto and Illumination delivered back-to-back $1B+ hits ($1.362B + $1.01B+), pulling millions of families back into Mario software <a class="cite-link" href="https://www.nbcuniversal.com/article/super-mario-galaxy-movie-smashes-box-office-records-worldwide" target="_blank" rel="noopener noreferrer">NBCUniversal ↗</a>.'
      },
      nt_r21: {
        zh: '零有息负债与巨额现金储备赋予研发团队不被短期季度华尔街预期绑架的底气——践行宫本茂名言“延期的游戏终会变好”，保护百年 IP 商誉永不因仓促赶工而受损 <a class="cite-link" href="https://stockanalysis.com/quote/tyo/7974/statistics/" target="_blank" rel="noopener noreferrer">Balance Sheet ↗</a>。',
        en: 'Zero debt and ¥1.93T in cash insulate developers from quarterly pressure—backing Miyamoto\'s ethos of delaying titles until gameplay shines rather than shipping rushed releases that tarnish IP trust <a class="cite-link" href="https://stockanalysis.com/quote/tyo/7974/statistics/" target="_blank" rel="noopener noreferrer">Balance Sheet ↗</a>.'
      }
    };

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
      ['搜索企业、掌舵人、核心IP (Switch 2 / PS5 / 高达 / 迪士尼)…', 'Search company, leader, or IP (Switch 2 / PS5 / Gundam / Disney)…'],
      ['筛选对比企业', 'Filter benchmark peers'],
      ['标杆企业分类筛选', 'Peer category filter'],
      ['全球顶级游戏与超级IP娱乐巨头横向对比表', 'Global Gaming & Super-IP Entertainment Giants Comparison'],
      ['盈利推演情景预设', 'Ecosystem Profit Presets'],
      ['核查完成度进度条', 'Checklist Completion Progress']
    ];

    var PILLAR_NOTES_ZH = [
      '<strong>当前选中支柱解读（01 枯萎技术的水平思考）：</strong>不参与无止境的显卡算力烧钱竞赛，使任天堂单款旗舰游戏的研发预算远低于动辄 $3 亿–$10 亿美元的好莱坞式写实 3A 巨制，从而维持软件成熟期高达 57%–61% 的综合毛利率 <a class="cite-link" href="https://en.wikipedia.org/wiki/Nintendo_Entertainment_Planning_%26_Development" target="_blank" rel="noopener noreferrer">Nintendo EPD ↗</a>。',
      '<strong>当前选中支柱解读（02 京都 EPD 软硬同楼共创）：</strong>硬件工程部（PTD）与 11 大软件制作组同处京都开发栋，Switch 2 的磁性 Joy-Con 2、鼠标模式交互与向下兼容底层均围绕第一方创意原型量身定制 <a class="cite-link" href="https://en.wikipedia.org/wiki/Nintendo_Software_Planning_%26_Development" target="_blank" rel="noopener noreferrer">Kyoto R&amp;D Hub ↗</a>。',
      '<strong>当前选中支柱解读（03 零裁员长期主义与工匠留存）：</strong>截至 2026 年 3 月全球员工稳步增至 8,666 人（京都母公司 3,084 人离职率仅 2.3%，美国任天堂平均司龄达 9.4 年），极高的团队默契度直接转化为关卡设计品质 <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">Workforce Retention ↗</a>。',
      '<strong>当前选中支柱解读（04 全龄触达与正价长青铁律）：</strong>美国 Switch 机主女性占比达 52%，且发售逾 8 年的《马力欧卡丁车8 豪华版》仍维持正价热销至 7,108 万份，构建出游戏界罕见的“抗折旧数字资产” <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">Circana &amp; Evergreen ↗</a>。'
    ];

    var PILLAR_NOTES_EN = [
      '<strong>Selected Pillar (01 · Lateral Thinking with Withered Tech):</strong> Avoiding GPU teraflop arms races keeps flagship development budgets far below $300M+ photorealistic AAA peers—supporting 57%–61% gross margins in mature software phases <a class="cite-link" href="https://en.wikipedia.org/wiki/Nintendo_Entertainment_Planning_%26_Development" target="_blank" rel="noopener noreferrer">Nintendo EPD ↗</a>.',
      '<strong>Selected Pillar (02 · Kyoto EPD Hardware-Software Symbiosis):</strong> Co-locating hardware engineering with 11 EPD software units inside the Kyoto Development Center ensures custom silicon, controllers, and backward compatibility directly serve gameplay <a class="cite-link" href="https://en.wikipedia.org/wiki/Nintendo_Software_Planning_%26_Development" target="_blank" rel="noopener noreferrer">Kyoto R&amp;D Hub ↗</a>.',
      '<strong>Selected Pillar (03 · Zero-Layoff Long-Termism &amp; 2.3% Turnover):</strong> Growing steadily to 8,666 consolidated staff in FY26 with just 2.3% turnover at Kyoto HQ (9.4-yr avg tenure at NOA) preserves irreplaceable level-design institutional memory <a class="cite-link" href="https://sqmagazine.co.uk/how-many-people-work-at-nintendo/" target="_blank" rel="noopener noreferrer">Workforce Retention ↗</a>.',
      '<strong>Selected Pillar (04 · Demographic Balance &amp; Full-Price Discipline):</strong> 52% U.S. female Switch ownership plus strict MSRP discipline enabled Mario Kart 8 Deluxe to reach 71.08M units years after launch without value-eroding price cuts <a class="cite-link" href="https://sqmagazine.co.uk/nintendo-statistics/" target="_blank" rel="noopener noreferrer">Circana &amp; Evergreen ↗</a>.'
    ];

    var PEER_ROWS_ZH = [
      {
        category: 'console',
        benchmark: true,
        company: '研究基准：任天堂 (Nintendo · 7974.T)',
        leader: '古川俊太郎 / 宫本茂',
        positioning: '掌机主机混合专用平台 + 100%第一方独占IP + 影游乐园破圈 (Switch 2 / Mario / Zelda / Pokémon)',
        culture: '枯萎技术水平思考 + 京都EPD软硬同源 + 2.3%极低离职率',
        headcount: '8,666人 · 4亿注册账户 / 1.28亿年活',
        margins: 'FY26 营收 ¥2,313.1B · 27H1 营业利润率 22.4% (成熟期 31%–35%)',
        verdict: '软硬闭环利润率与现金安全性居首：无需靠硬件巨额补贴换装机，第一方正价软件与 ¥1.93T 零负债现金构筑极宽护城河。',
        sourceLabel: 'GamesIndustry FY26',
        sourceUrl: 'https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2'
      },
      {
        category: 'console',
        benchmark: false,
        company: '索尼集团 · 游戏与网络服务 (Sony G&NS · 6758.T)',
        leader: '西野秀明 (SIE CEO)',
        positioning: '高性能家用主机 (PS5 累计 9,370万+台) + PSN 订阅生态 + 第三方 3A 抽成主阵地',
        culture: '全球写实视听工业化标杆 + 欧美多工作室矩阵管理',
        headcount: 'PSN 月活 1.25亿账户 · 全球大型工作室群',
        margins: 'FY25 G&NS 营收 ¥4,685.7B · 营业利润 ¥463.3B (利润率 9.9%)',
        verdict: '营收体量约为任天堂 2 倍但利润率显著较低：依赖高规格硬件与高预算写实 3A（部分服务型项目承压），在硬核第三方生态占优。',
        sourceLabel: 'Sony FY25 Results',
        sourceUrl: 'https://www.sony.com/en/SonyInfo/IR/library/presen/er/pdf/25q4_sonypre.pdf'
      },
      {
        category: 'ip',
        benchmark: false,
        company: '万代南梦宫控股 (Bandai Namco · 7832.T)',
        leader: '川口胜 / 宇田川南欧',
        positioning: 'IP 轴心战略：玩具模型 (高达 Gunpla) + 动漫游戏 (艾尔登法环 / 龙珠) + 线下游艺联动',
        culture: '跨媒介商品化变现极强 + 多元外部动漫 IP 委员会协同',
        headcount: '日本头部综合娱乐玩具与数字内容集团',
        margins: 'FY26.3 净营收 ¥1,348.2B · 营业利润率 14.1%',
        verdict: '实体周边变现高手 vs 平台入口缺失：万代在模型玩具毛利丰厚，但缺乏自有主机与操作系统入口，数字分发需向主机/PC平台分成。',
        sourceLabel: 'Bandai Namco IR',
        sourceUrl: 'https://www.bandainamco.co.jp/en/ir/financial/index.html'
      },
      {
        category: 'ip',
        benchmark: false,
        company: '华特迪士尼 (Walt Disney · DIS)',
        leader: '鲍勃·艾格 (Bob Iger 交接期)',
        positioning: '全球院线电影 + Disney+ 流媒体 + 主题乐园及邮轮体验帝国 (Experiences)',
        culture: '百年家庭角色叙事圣殿 + 重资产实景乐园与衍生授权飞轮',
        headcount: '全球超 20 万员工 · 重资产乐园与影视制作矩阵',
        margins: 'FY2026 总营收 $102.34B (+8.4% YoY) · 乐园为核心利润柱',
        verdict: '任天堂跨媒介演进的终极参照系：任天堂借鉴迪士尼电影与乐园飞轮放大 IP 寿命，但借力环球影业轻资产合作避免了重资产折旧包袱。',
        sourceLabel: 'Disney FY26 Macro',
        sourceUrl: 'https://www.macrotrends.net/stocks/charts/DIS/disney/revenue'
      }
    ];

    var PEER_ROWS_EN = [
      {
        category: 'console',
        benchmark: true,
        company: 'Benchmark: Nintendo Co., Ltd. (7974.T)',
        leader: 'Shuntaro Furukawa / Shigeru Miyamoto',
        positioning: 'Dedicated hybrid console + 100% exclusive 1st-party IP + Movies/Parks funnel (Switch 2 / Mario / Zelda)',
        culture: 'Withered tech lateral thinking + Kyoto EPD co-design + 2.3% turnover',
        headcount: '8,666 FTE · 400M Accounts / 128M APU',
        margins: 'FY26 Sales ¥2,313.1B · H1 FY27 OP Margin 22.4% (31%–35% mature)',
        verdict: 'Highest full-cycle margin & balance-sheet safety: zero console-subsidy trap, evergreen full-price 1st-party titles, and ¥1.93T debt-free cash.',
        sourceLabel: 'GamesIndustry FY26',
        sourceUrl: 'https://www.gamesindustry.biz/nintendo-fy-sales-soar-986-to-146bn-following-launch-of-switch-2'
      },
      {
        category: 'console',
        benchmark: false,
        company: 'Sony Group · G&NS / PlayStation (6758.T)',
        leader: 'Hideaki Nishino (SIE CEO)',
        positioning: 'High-spec home console (PS5 93.7M+) + PSN subscription network + premier 3rd-party AAA storefront',
        culture: 'Cinematic blockbuster production values + global studio network',
        headcount: '125M PSN Monthly Active Users · Global studio footprint',
        margins: 'FY25 G&NS Sales ¥4,685.7B · OP ¥463.3B (9.9% OP Margin)',
        verdict: '~2x Nintendo revenue scale but structurally lower OP margin (~9.9%): leads hardcore 3rd-party ecosystem while facing higher AAA dev costs.',
        sourceLabel: 'Sony FY25 Results',
        sourceUrl: 'https://www.sony.com/en/SonyInfo/IR/library/presen/er/pdf/25q4_sonypre.pdf'
      },
      {
        category: 'ip',
        benchmark: false,
        company: 'Bandai Namco Holdings (7832.T)',
        leader: 'Masaru Kawaguchi / Nao Udagawa',
        positioning: 'IP Axis Strategy: Toys & Hobby (Gundam) + Digital Games (Elden Ring / Dragon Ball) + Amusement',
        culture: 'Cross-media merchandising mastery + anime production committees',
        headcount: 'Integrated Japanese toy, anime & game powerhouse',
        margins: 'FY26.3 Net Sales ¥1,348.2B · 14.1% Operating Margin',
        verdict: 'Physical merchandising leader without platform ownership: excels in high-margin toys, but pays platform fees on console/PC game sales.',
        sourceLabel: 'Bandai Namco IR',
        sourceUrl: 'https://www.bandainamco.co.jp/en/ir/financial/index.html'
      },
      {
        category: 'ip',
        benchmark: false,
        company: 'The Walt Disney Company (DIS)',
        leader: 'Bob Iger (Succession Era)',
        positioning: 'Global theatrical studios + Disney+ streaming DTC + Theme Parks & Cruises (Experiences)',
        culture: 'Century-old family storytelling + capital-intensive park operations',
        headcount: '200k+ global staff · Heavy park & studio infrastructure',
        margins: 'FY2026 Revenue $102.34B (+8.4% YoY) · Experiences profit engine',
        verdict: 'Strategic North Star for multi-generational IP: Nintendo replicates Disney\'s theatrical/park flywheel asset-lightly via Universal partnerships.',
        sourceLabel: 'Disney FY26 Macro',
        sourceUrl: 'https://www.macrotrends.net/stocks/charts/DIS/disney/revenue'
      }
    ];

    var CHECKLIST_ITEMS_ZH = [
      {
        tag: '2,635万台已验证',
        title: '1. 跨世代账户平滑迁徙测试：新主机是否成功继承上代亿级用户池？',
        desc: '依托 4 亿 Nintendo Account 与原生向下兼容，Switch 2 是否避免了历史上 Wii U 式的世代断崖并保持健康装机斜率？'
      },
      {
        tag: '附着率 >62%',
        title: '2. 第一方独占护航火力测试：核心大作节奏能否持续拉动硬件需求？',
        desc: '继《马力欧卡丁车 世界》(1,648万份) 与《咚奇刚 蕉力全开》(505万份) 后，3D 马力欧、塞尔达与宝可梦正作管线是否充沛？'
      },
      {
        tag: '27H1 达 60.7%',
        title: '3. 数字版与 NSO 毛利扩张测试：软件结构升级是否兑现为利润率反弹？',
        desc: 'eShop 数字下载、升级通行证与 NSO 扩充包占比提升，是否持续推动合并营业利润率从首发年 15.6% 向 25%–30%+ 回归？'
      },
      {
        tag: '京都离职率 2.3%',
        title: '4. 工匠团队稳定度与研发纪律测试：是否守住低流失率与可控预算？',
        desc: '在 AI 与行业成本膨胀背景下，京都 EPD 是否继续保持 <3% 超低流失率与“枯萎技术水平思考”的高研发投产比？'
      },
      {
        tag: '电影破 $23.7B',
        title: '5. 轻资产跨媒介放大器测试：影视与乐园能否持续破圈反哺主业？',
        desc: '继两部十亿美元马力欧电影后，三大环球影城园区与后续《塞尔达传说》真人电影能否在零重资产包袱下持续拓宽新受众？'
      },
      {
        tag: '¥1.93T 零负债',
        title: '6. 现金堡垒与股东分红契约测试：硬件成本波动下是否坚守财务底线？',
        desc: '面对存储芯片涨价与关税波动，管理层是否通过及时调价守住硬件正向毛利，并严格兑现 33% 营业利润 / 50% 派息率分红锚？'
      }
    ];

    var CHECKLIST_ITEMS_EN = [
      {
        tag: '26.35M Shipped',
        title: '1. Cross-Gen Account Continuity Test: Is Switch 2 retaining the 128M active user base?',
        desc: 'Backed by 400M Nintendo Accounts and backward compatibility, is Switch 2 avoiding historical console resets with healthy sell-through?'
      },
      {
        tag: '>62% Attach Rate',
        title: '2. First-Party Exclusive Cadence Test: Are tentpole releases pulling hardware demand?',
        desc: 'Following Mario Kart World (16.48M) and Donkey Kong Bananza (5.05M), is the pipeline of 3D Mario, Zelda, and Pokémon titles on track?'
      },
      {
        tag: '60.7% in H1 FY27',
        title: '3. Digital & NSO Margin Expansion Test: Is software mix lifting operating margins?',
        desc: 'Are eShop digital downloads, Upgrade Packs, and NSO Expansion Pack adoption driving OP margins back from 15.6% toward 25%–30%+?'
      },
      {
        tag: '2.3% Kyoto Turnover',
        title: '4. Creative Talent Retention & Budget Discipline Test: Is R&D ROI protected?',
        desc: 'Does Kyoto EPD maintain sub-3% attrition and disciplined development budgets without succumbing to bloated AAA cost inflation?'
      },
      {
        tag: '>$2.37B Box Office',
        title: '5. Asset-Light Transmedia Funnel Test: Do movies and parks expand the user funnel?',
        desc: 'Following back-to-back $1B Mario films and 3 Universal parks, does the upcoming Zelda film expand IP reach without heavy capex?'
      },
      {
        tag: '¥1.93T · ¥0 Debt',
        title: '6. Cash Fortress & Dividend Rule Test: Are hardware margins and payouts defended?',
        desc: 'Amid memory cost spikes, does management protect hardware margins via pricing power while honoring its 33% OP / 50% dividend payout rule?'
      }
    ];

    var QUICK_JUMP_ZH = [
      { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: 'FY26 净营收 ¥2.31T (+98.6%) · Switch 2 达 2,635万台 · ¥1.93T 净现金' },
      { sec: 'sec-01', title: '01 软硬一体与 Switch 2 跃迁', sub: '京都 EPD 架构图 · 历代主机销量坐标 · Switch 2 季度爬坡曲线' },
      { sec: 'sec-02', title: '02 四大研发支柱与护城河雷达', sub: '枯萎技术水平思考 · 2.3% 离职率 · 五维竞争力雷达图' },
      { sec: 'sec-03', title: '03 全球游戏与IP巨头横向对比', sub: '任天堂 7974 vs 索尼 PlayStation vs 万代南梦宫 vs 迪士尼' },
      { sec: 'sec-04', title: '04 跨周期财务与装机利润测算', sub: 'FY22–FY27E 营收利润率剪刀差 · 交互式 Switch 2 利润模拟器' },
      { sec: 'sec-05', title: '05 三代演进与四大战役复盘', sub: '红白机/Wii 蓝海 · EPD 合流 · 马力欧银河大电影破 $10亿' },
      { sec: 'sec-06', title: '06 任天堂护城河核查清单', sub: '6 项创意与生态平台核心指标自测（本地自动保存）' },
      { sec: 'sec-07', title: '07 数据来源与财报核验索引', sub: 'FY26 年报 · 27H1 决算短信 · Sony / Bandai / Disney 权威信源' }
    ];

    var QUICK_JUMP_EN = [
      { sec: 'sec-00', title: '00 Executive Summary & KPIs', sub: 'FY26 Sales ¥2.31T (+98.6%) · 26.35M Switch 2 · ¥1.93T Net Cash' },
      { sec: 'sec-01', title: '01 Integrated Model & Switch 2 Ramp', sub: 'Kyoto EPD Blueprint · Console History · Quarterly Ramp Curve' },
      { sec: 'sec-02', title: '02 Four Creative Pillars & Moat Radar', sub: 'Withered Tech · 2.3% Turnover · 5-Axis Competitive Radar' },
      { sec: 'sec-03', title: '03 Global Gaming & IP Peer Matrix', sub: 'Nintendo 7974 vs. Sony PlayStation vs. Bandai Namco vs. Disney' },
      { sec: 'sec-04', title: '04 Cross-Cycle Financials & Simulator', sub: 'FY22–FY27E Margin Cycle · Interactive Switch 2 Profit Simulator' },
      { sec: 'sec-05', title: '05 Three-Era Evolution & Case Studies', sub: 'Iwata Blue Ocean · EPD Unification · $1B+ Mario Galaxy Movie' },
      { sec: 'sec-06', title: '06 Nintendo Moat Diagnostic Checklist', sub: '6-Point Platform & Creative Moat Tracker (Saved Locally)' },
      { sec: 'sec-07', title: '07 Primary Filings & Sources Index', sub: 'Nintendo FY26 AR · Q2 FY27 Release · Peer IR Filings' }
    ];

    var PRESETS = {
      p1: { baseM: 36, attach: 2.1, digPct: 61, ipPool: true },
      p2: { baseM: 75, attach: 2.6, digPct: 66, ipPool: true },
      p3: { baseM: 105, attach: 3.0, digPct: 72, ipPool: true }
    };

    var state = {
      lang: 'zh',
      theme: 'dark',
      ch1View: 'viewA',
      ch1Series: { s1: true, s2: true },
      activePillar: 0,
      radarSeries: { ntd: true, sie: true, pub: true },
      peerFilter: 'all',
      peerQuery: '',
      epsSeries: { eps: true, oci: true },
      sim: { baseM: 36, attach: 2.1, digPct: 61, ipPool: true, preset: 'p1' },
      checks: [true, true, true, true, false, false]
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

    function isEn() {
      return state.lang === 'en';
    }

    var _zhToEnAttr = {};
    var _enToZhAttr = {};
    for (var _ai = 0; _ai < I18N_ATTR_PAIRS.length; _ai++) {
      _zhToEnAttr[I18N_ATTR_PAIRS[_ai][0]] = I18N_ATTR_PAIRS[_ai][1];
      _enToZhAttr[I18N_ATTR_PAIRS[_ai][1]] = I18N_ATTR_PAIRS[_ai][0];
    }

    function syncCh1HeaderText() {
      var titleEl = document.getElementById('ch1ChartTitle');
      var subEl = document.getElementById('ch1ChartSub');
      if (!titleEl || !subEl) return;
      if (state.ch1View === 'viewA') {
        titleEl.textContent = isEn()
          ? 'All-Time Nintendo Flagship Console Hardware Shipments & Switch 2 Trajectory (Millions)'
          : '历代任天堂旗舰主机累计硬件销量与 Switch 2 跃迁坐标（百万台）';
        subEl.textContent = isEn()
          ? 'Original Switch reached 157.20M (#1 in Nintendo history); Switch 2 hit 26.35M in just 16 months'
          : '初代 Switch 达 1.5720 亿台超越 NDS 登顶队史第一；Switch 2 仅用 16 个月即达成 2,635 万台';
      } else {
        titleEl.textContent = isEn()
          ? 'Switch 2 Cumulative Hardware Shipments (M) vs. Cumulative Software Sales (M · Jun 2025–Sep 2026)'
          : 'Switch 2 季度累计硬件装机量（百万台）vs 累计软件出货量爬坡曲线（百万份）';
        subEl.textContent = isEn()
          ? 'From 3.50M opening 4-day consoles to 26.35M consoles and 73.21M software units by Q2 FY27 (Sep 30, 2026)'
          : '从 2025.06 首四天 350 万台一路攀升至 2026.09 累计 2,635 万台硬件与 7,321 万份软件';
      }
    }

    function syncCollapseButtonsText() {
      var btns = document.querySelectorAll('[data-collapse-target]');
      for (var i = 0; i < btns.length; i++) {
        var pid = btns[i].getAttribute('data-collapse-target');
        var panel = document.getElementById(pid);
        var isOpen = panel && panel.classList.contains('open');
        if (isEn()) {
          btns[i].innerHTML = isOpen ? '<span>Hide Execution Mechanics</span> <span>⌃</span>' : '<span>Show Execution Mechanics</span> <span>⌄</span>';
        } else {
          btns[i].innerHTML = isOpen ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
        }
      }
    }

    /* ======================================================================
       2. Language & Theme Switching + Responsive Sidebar
       ====================================================================== */
    function applyLanguage(lang, silent) {
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

      /* 1. Update data-i18n-zh / data-i18n-en elements */
      var i18nNodes = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
      for (var i = 0; i < i18nNodes.length; i++) {
        var node = i18nNodes[i];
        node.textContent = en ? node.getAttribute('data-i18n-en') : node.getAttribute('data-i18n-zh');
      }

      /* 2. Update Rich HTML blocks */
      var richNodes = document.querySelectorAll('[data-i18n-rich]');
      for (var r = 0; r < richNodes.length; r++) {
        var rk = richNodes[r].getAttribute('data-i18n-rich');
        var rEntry = I18N_RICH_MAP[rk];
        if (rEntry) {
          richNodes[r].innerHTML = en ? rEntry.en : rEntry.zh;
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
        var notesArr = en ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH;
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
        abIconEl.innerHTML = state.theme === 'dark'
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

      var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH;
      var q = state.peerQuery.trim().toLowerCase();
      var filtered = activeRows.filter(function (row, idx) {
        var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
        if (!catOk) return false;
        if (!q) return true;
        var zhR = PEER_ROWS_ZH[idx] || row;
        var enR = PEER_ROWS_EN[idx] || row;
        var hay = (zhR.company + ' ' + zhR.leader + ' ' + zhR.positioning + ' ' + zhR.culture + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.leader + ' ' + enR.positioning + ' ' + enR.culture + ' ' + enR.verdict).toLowerCase();
        return hay.indexOf(q) !== -1;
      });

      if (badge) {
        badge.textContent = isEn()
          ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers')
          : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆企业');
      }

      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching benchmark peers found. Try another keyword or reset filters.' : '未找到匹配的标杆企业记录，请尝试其他关键词或重置筛选条件。') + '</td></tr>';
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
       4. Switch 2 Installed-Base × Software Attach Profit Simulator
       ====================================================================== */
    function computeEcosystemModel(baseM, attach, digPct, includeIp) {
      /* Grounded unit-economics model calibrated to FY26–FY27 guidance:
         - Annual hardware shipment steady-state ~14.5M–16.5M consoles (~¥760B hardware revenue, ~10% hardware contribution)
         - Software units = baseM * attach; blended net realization ~¥6,900/unit (~$45 wholesale/digital blended)
         - Software gross margin lifts from ~58% (physical) to ~84% (digital/NSO), minus ~¥490B fixed R&D + SG&A
         - Optional IP/Movies/Parks/Merch high-margin royalty pool adds +¥85B OP (+¥105B revenue) */
      var swUnitsM = baseM * attach;
      var legacySwRevB = Math.max(120, 380 - Math.max(0, baseM - 36) * 3.2);
      var hwRevB = 820 + Math.max(0, (baseM - 36) * 1.2);
      var swRevB = swUnitsM * 7.8 + legacySwRevB + 135;
      var ipRevB = includeIp ? 95 : 20;
      var totalRevB = hwRevB + swRevB + ipRevB;

      var digRatio = digPct / 100;
      var blendedSwMargin = 0.54 + digRatio * 0.28;
      var hwGrossB = hwRevB * 0.09;
      var swGrossB = (swUnitsM * 7.8 + legacySwRevB * 0.75 + 135) * blendedSwMargin;
      var ipOpB = includeIp ? 85 : 12;
      var fixedOpexB = 505 + Math.max(0, (baseM - 36) * 2.2);

      var opB = Math.max(150, hwGrossB + swGrossB + ipOpB - fixedOpexB);
      var opMargin = (opB / totalRevB) * 100;
      var divPoolB = opB * 0.33;
      var impliedEqT = (opB * 18 + 1930) / 1000; /* 18x OP + ¥1.93T net cash */

      return {
        swUnitsM: swUnitsM,
        totalRevB: totalRevB,
        opB: opB,
        opMargin: opMargin,
        divPoolB: divPoolB,
        impliedEqT: impliedEqT
      };
    }

    function updateSimulatorUI() {
      var res = computeEcosystemModel(state.sim.baseM, state.sim.attach, state.sim.digPct, state.sim.ipPool);

      document.getElementById('simBaseLabel').textContent = state.sim.baseM + (isEn() ? 'M Units' : ' 百万台');
      document.getElementById('simAttachLabel').textContent = state.sim.attach.toFixed(1) + (isEn() ? ' / yr' : ' 份/年');
      document.getElementById('simDigLabel').textContent = state.sim.digPct + '%';

      document.getElementById('simOpVal').textContent = '¥' + Math.round(res.opB).toLocaleString('en-US') + 'B';
      document.getElementById('simMarginVal').textContent = res.opMargin.toFixed(1) + '% · ¥' + Math.round(res.divPoolB) + 'B';
      document.getElementById('simSwVal').textContent = res.swUnitsM.toFixed(1) + (isEn() ? 'M Units' : 'M 份');
      document.getElementById('simEvVal').textContent = '¥' + res.impliedEqT.toFixed(2) + 'T';

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

      var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS_ZH;
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
          '<div style="flex:1;min-width:0;">' +
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

    /* Chart 1: View A (All-Time Console Shipments) & View B (Switch 2 Quarterly Hardware vs Software Ramp) */
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
            ? '<span style="color:var(--chart-c1);">■ Left Axis: Cumulative Hardware Units (Millions)</span><span style="color:var(--text-muted);">Switch 1 (157.20M) #1 in Nintendo History · Switch 2 (26.35M in 16M)</span>'
            : '<span style="color:var(--chart-c1);">■ 左轴：全球累计硬件出货量 (百万台)</span><span style="color:var(--text-muted);">初代 Switch 达 157.20M 登顶队史第一 · Switch 2 已达 26.35M</span>';
        }
        if (leg1) leg1.textContent = isEn() ? 'Legacy & Hybrid Flagship Consoles (M)' : '历代旗舰主机累计销量 (百万台)';
        if (leg2) leg2.textContent = isEn() ? 'Switch 2 Actual & FY27E Target (M)' : 'Switch 2 当前实绩与 FY27E 目标 (百万台)';

        var padA = { top: 28, right: 20, bottom: 46, left: 50 };
        var pwA = w - padA.left - padA.right;
        var phA = h - padA.top - padA.bottom;
        var consoles = [
          { name: 'Switch', sub: isEn() ? '2017–26' : '混合神机', units: 157.20, isSw2: false, swInfo: '>1,500M' },
          { name: 'Nintendo DS', sub: '2004–13', units: 154.02, isSw2: false, swInfo: '948.7M' },
          { name: 'Game Boy', sub: 'GB+GBC', units: 118.69, isSw2: false, swInfo: '501.1M' },
          { name: 'Wii', sub: '2006–13', units: 101.63, isSw2: false, swInfo: '921.8M' },
          { name: 'Switch 2', sub: isEn() ? 'Sep 2026' : '上市16月', units: 26.35, isSw2: true, swInfo: '73.21M' },
          { name: 'Switch 2 (E)', sub: isEn() ? 'Mar 2027E' : 'FY27末目标', units: 36.36, isSw2: true, swInfo: '~108M+' }
        ];
        var maxY = 180.0;

        for (var g = 0; g <= 4; g++) {
          var val = (maxY / 4) * g;
          var gy = padA.top + phA - (g / 4) * phA;
          ctx.strokeStyle = pal.grid;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(padA.left, gy);
          ctx.lineTo(padA.left + pwA, gy);
          ctx.stroke();

          ctx.fillStyle = pal.tick;
          ctx.font = '11px "IBM Plex Mono", sans-serif';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(val.toFixed(0) + 'M', padA.left - 8, gy);
        }

        var stepA = pwA / consoles.length;
        var barW = Math.min(52, Math.max(22, stepA * 0.48));

        for (var i = 0; i < consoles.length; i++) {
          var item = consoles[i];
          var showBar = item.isSw2 ? state.ch1Series.s2 : state.ch1Series.s1;
          var cx = padA.left + stepA * (i + 0.5);

          if (hoverState.chartCh1 === i) {
            ctx.fillStyle = pal.hoverBand;
            roundRectPath(ctx, padA.left + stepA * i + 4, padA.top, stepA - 8, phA, 8);
            ctx.fill();
          }

          if (showBar) {
            var bh = (item.units / maxY) * phA;
            var bx = cx - barW / 2;
            var by = padA.top + phA - bh;
            var grad = ctx.createLinearGradient(0, by, 0, padA.top + phA);
            if (item.isSw2) {
              grad.addColorStop(0, '#34D399');
              grad.addColorStop(1, '#16A34A');
            } else {
              grad.addColorStop(0, '#3399FF');
              grad.addColorStop(1, '#0066CC');
            }
            ctx.fillStyle = grad;
            topRoundedBar(ctx, bx, by, barW, bh, 6);
            ctx.fill();
            drawValueBadge(ctx, item.units.toFixed(2) + 'M', cx, by - 13, item.isSw2 ? pal.c2 : pal.c1, pal);
          }

          ctx.fillStyle = pal.text;
          ctx.font = '700 ' + (w < 500 ? '10.5px' : '11.5px') + ' system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.fillText(item.name, cx, padA.top + phA + 19);
          ctx.fillStyle = pal.tick;
          ctx.font = '10px "IBM Plex Mono", sans-serif';
          ctx.fillText(item.sub, cx, padA.top + phA + 34);

          hitRegions.chartCh1.push({
            idx: i,
            x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 38,
            html: isEn()
              ? ('<strong>' + item.name + ' (' + item.sub + ')</strong><br/>' +
                 '• Cumulative Hardware: <strong>' + item.units.toFixed(2) + 'M units</strong><br/>' +
                 '• Cumulative Software: <strong>' + item.swInfo + ' units</strong>')
              : ('<strong>' + item.name + ' (' + item.sub + ')</strong><br/>' +
                 '• 累计硬件销量：<strong>' + item.units.toFixed(2) + ' 百万台</strong><br/>' +
                 '• 对应软件总销量：<strong>' + item.swInfo + ' 份</strong>')
          });
        }
      } else {
        if (metaEl) {
          metaEl.innerHTML = isEn()
            ? '<span style="color:var(--chart-c1);">■ Left Axis: Switch 2 Cumulative Hardware (M)</span><span style="color:var(--chart-c2);">● Right Axis: Cumulative Software Shipments (M)</span>'
            : '<span style="color:var(--chart-c1);">■ 左轴：Switch 2 累计硬件销量 (百万台)</span><span style="color:var(--chart-c2);">● 右轴：Switch 2 累计软件销量 (百万份)</span>';
        }
        if (leg1) leg1.textContent = isEn() ? 'Cumulative Switch 2 Hardware (Left · M)' : 'Switch 2 累计硬件出货 (左轴 · 百万台)';
        if (leg2) leg2.textContent = isEn() ? 'Cumulative Switch 2 Software (Right · M)' : 'Switch 2 累计软件销量 (右轴 · 百万份)';

        var padB = { top: 28, right: 52, bottom: 40, left: 48 };
        var pwB = w - padB.left - padB.right;
        var phB = h - padB.top - padB.bottom;
        var labelsB = ['25.06 (4D)', '25.09 (Q2)', '25.12 (Q3)', '26.03 (FY26)', '26.06 (Q1)', '26.09 (Q2)'];
        var fullB = isEn()
          ? ['Jun 2025 (Opening 4 Days)', 'Sep 30, 2025 (H1 FY26)', 'Dec 31, 2025 (Holiday Q3)', 'Mar 31, 2026 (FY26 End)', 'Jun 30, 2026 (Q1 FY27)', 'Sep 30, 2026 (Q2 FY27)']
          : ['2025.06 (首发前4天)', '2025.09 (FY26半年报)', '2025.12 (圣诞旺季末)', '2026.03 (FY26财年末)', '2026.06 (FY27一季末)', '2026.09 (FY27半年报)'];
        var hwM = [3.50, 10.36, 17.37, 19.86, 23.68, 26.35];
        var swM = [5.80, 20.60, 37.93, 48.71, 58.17, 73.21];
        var maxHw = 36.0;
        var maxSw = 88.0;

        for (var j = 0; j <= 4; j++) {
          var r = j / 4;
          var yGrid = padB.top + phB - r * phB;
          ctx.strokeStyle = pal.grid;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(padB.left, yGrid);
          ctx.lineTo(padB.left + pwB, yGrid);
          ctx.stroke();

          ctx.font = '11px "IBM Plex Mono", sans-serif';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = pal.tick;
          ctx.textAlign = 'right';
          ctx.fillText((maxHw * r).toFixed(0) + 'M', padB.left - 7, yGrid);

          ctx.fillStyle = pal.c2;
          ctx.textAlign = 'left';
          ctx.fillText((maxSw * r).toFixed(0) + 'M', padB.left + pwB + 7, yGrid);
        }

        var stepB = pwB / labelsB.length;
        var bWidth = Math.min(38, Math.max(18, stepB * 0.42));
        var pts = [];

        for (var k = 0; k < labelsB.length; k++) {
          var centerX = padB.left + stepB * (k + 0.5);
          if (hoverState.chartCh1 === k) {
            ctx.fillStyle = pal.hoverBand;
            roundRectPath(ctx, padB.left + stepB * k + 3, padB.top, stepB - 6, phB, 6);
            ctx.fill();
          }

          if (state.ch1Series.s1) {
            var bH = (hwM[k] / maxHw) * phB;
            var bX = centerX - bWidth / 2;
            var bY = padB.top + phB - bH;
            var bGrad = ctx.createLinearGradient(0, bY, 0, padB.top + phB);
            if (pal.isDark) {
              bGrad.addColorStop(0, 'rgba(51, 153, 255, 0.72)');
              bGrad.addColorStop(1, 'rgba(0, 115, 230, 0.26)');
            } else {
              bGrad.addColorStop(0, '#1985F1');
              bGrad.addColorStop(1, '#0066CC');
            }
            ctx.fillStyle = bGrad;
            topRoundedBar(ctx, bX, bY, bWidth, bH, 5);
            ctx.fill();

            if (bH > 22) {
              ctx.fillStyle = '#FFFFFF';
              ctx.font = '700 9.5px "IBM Plex Mono", sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'alphabetic';
              ctx.fillText(hwM[k].toFixed(1) + 'M', centerX, bY + 15);
            }
          }

          var lY = padB.top + phB - (swM[k] / maxSw) * phB;
          pts.push({ x: centerX, y: lY, sw: swM[k] });

          ctx.fillStyle = k === labelsB.length - 1 ? pal.text : pal.tick;
          ctx.font = (k === labelsB.length - 1 ? '700 ' : '600 ') + (w < 500 ? '10px' : '11px') + ' system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'alphabetic';
          ctx.fillText(labelsB[k], centerX, padB.top + phB + 22);

          hitRegions.chartCh1.push({
            idx: k,
            x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
            html: isEn()
              ? ('<strong>' + fullB[k] + '</strong><br/>' +
                 '• Switch 2 Hardware LTD: <strong>' + hwM[k].toFixed(2) + 'M consoles</strong><br/>' +
                 '• Switch 2 Software LTD: <strong>' + swM[k].toFixed(2) + 'M units</strong><br/>' +
                 '• Cumulative Tie Ratio: <strong>' + (swM[k] / hwM[k]).toFixed(2) + 'x</strong>')
              : ('<strong>' + fullB[k] + '</strong><br/>' +
                 '• Switch 2 累计硬件：<strong>' + hwM[k].toFixed(2) + ' 百万台</strong><br/>' +
                 '• Switch 2 累计软件：<strong>' + swM[k].toFixed(2) + ' 百万份</strong><br/>' +
                 '• 累计软硬附着比：<strong>' + (swM[k] / hwM[k]).toFixed(2) + ' 份/台</strong>')
          });
        }

        if (state.ch1Series.s2) {
          ctx.save();
          drawSmoothLine(ctx, pts);
          ctx.strokeStyle = pal.c2;
          ctx.lineWidth = 2.8;
          ctx.stroke();
          ctx.restore();

          for (var n = 0; n < pts.length; n++) {
            ctx.fillStyle = pal.pillBg;
            ctx.beginPath();
            ctx.arc(pts[n].x, pts[n].y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = pal.c2;
            ctx.beginPath();
            ctx.arc(pts[n].x, pts[n].y, 4.2, 0, Math.PI * 2);
            ctx.fill();

            if (w >= 500 || n % 2 === 1) {
              drawValueBadge(ctx, pts[n].sw.toFixed(1) + 'M', pts[n].x, pts[n].y - 16, pal.c2, pal);
            }
          }
        }
      }
    }

    /* Chart 2: 5-Dimension Moat Radar Chart */
    function drawRadarChart() {
      var env = prepareCanvas('chartRadar');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartRadar = [];

      var axes = isEn()
        ? ['1st-Party IP Moat', 'Withered-Tech ROI', 'Cash & Retention', 'Family & Evergreen', 'Cinema & Parks']
        : ['第一方独占IP统治力', '研发投产比与硬件纪律', '零负债与团队留存', '全龄家庭与正价长青', '影游乐园跨媒介变现'];

      var pillarAxisMap = [1, 0, 2, 3];
      var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];

      var series = [
        { key: 'ntd', name: isEn() ? 'Nintendo (7974)' : '任天堂 (Nintendo)', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.5, 9.7, 9.8, 9.1] },
        { key: 'sie', name: isEn() ? 'Sony PlayStation' : '索尼互娱 (SIE)', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [8.4, 6.8, 7.5, 6.9, 8.2] },
        { key: 'pub', name: isEn() ? '3rd-Party AAA Peers' : '传统第三方3A基准', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [6.8, 5.9, 6.1, 6.0, 5.8] }
      ];

      var cx = w / 2;
      var cy = h / 2 + 8;
      var sidePad = w < 420 ? 86 : 108;
      var radius = Math.max(60, Math.min((w - sidePad * 2) / 2, h * 0.35));
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
          html: '<strong>' + axes[a] + (isEn() ? ' (10-Pt Scale)' : ' (10分制标杆评估)') + '</strong><br/>' +
            '• ' + series[0].name + ': <strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>' +
            '• ' + series[1].name + ': <strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>' +
            '• ' + series[2].name + ': <strong>' + series[2].vals[a].toFixed(1) + '</strong>'
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

    /* Chart 3: Full-Width Horizontal Progress/Bar Chart (Zero Truncation) */
    function drawHorizontalBars() {
      var env = prepareCanvas('chartBars');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartBars = [];

      var items = isEn() ? [
        { label: 'H1 FY2027 Digital Software Revenue Share (Apr–Sep 2026)', val: 60.7, cStart: '#34D399', cEnd: '#16A34A', sub: 'Up from 54.6% in FY26', note: 'Digital downloads, Switch 2 Upgrade Packs & NSO drove H1 OP +49.1%' },
        { label: 'FY2026 Full-Year Digital Software Share (Ended Mar 2026)', val: 54.6, cStart: '#2DD4BF', cEnd: '#0D9488', sub: 'Up from 53.5% in FY25', note: 'Steady shift away from costly high-speed physical ROM cartridges' },
        { label: 'U.S. Female Console Ownership Share on Switch (Circana)', val: 52.0, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '#1 Console (vs PS5 41.0%)', note: '11pp lead over PS5 unlocks unmatched family & casual TAM' },
        { label: 'FY2026 Americas Regional Revenue Share (Largest Market)', val: 40.3, cStart: '#3399FF', cEnd: '#0073E6', sub: 'Core U.S. + LatAm Demand', note: 'Supported by 1,603 NOA staff & Hollywood/Orlando theme parks' },
        { label: 'FY2026 Europe Regional Revenue Share', val: 24.7, cStart: '#60A5FA', cEnd: '#2563EB', sub: 'Strong Evergreen Mario/Pokémon', note: 'Consistent physical + digital demand across Western Europe' },
        { label: 'FY2026 Japan Domestic Revenue Share (76.9% Overseas)', val: 23.1, cStart: '#FBBF24', cEnd: '#D97706', sub: '+12.2% Rest of World', note: 'Dedicated ¥49,980 Japan-language Switch 2 SKU defends home base' }
      ] : [
        { label: 'FY2027 H1 数字版软件占总软件收入比重 (2026.04–09)', val: 60.7, cStart: '#34D399', cEnd: '#16A34A', sub: '较 FY26 提升 6.1pp', note: '数字下载、DLC 与 NSO 免除高昂大容量卡带成本，驱动半年利润大增 49.1%' },
        { label: 'FY2026 全年数字版软件收入占比 (截至 2026.03)', val: 54.6, cStart: '#2DD4BF', cEnd: '#0D9488', sub: '较 FY25 (53.5%) 稳步抬升', note: '宝可梦与第一方数字版下载比重持续走高' },
        { label: '美国市场 Switch 女性机主持有占比 (Circana 调研)', val: 52.0, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '全主机第1 (领先 PS5 达 11pp)', note: '森友会、马力欧、朋友收集等均衡覆盖全性别家庭受众' },
        { label: 'FY2026 美洲地区净营收占比 Americas (头号票仓)', val: 40.3, cStart: '#3399FF', cEnd: '#0073E6', sub: '海外合计占比达 76.9%', note: '好莱坞与奥兰多超级任天堂世界持续强化北美品牌统治力' },
        { label: 'FY2026 欧洲地区净营收占比 Europe', val: 24.7, cStart: '#60A5FA', cEnd: '#2563EB', sub: '第二大海外支柱区域', note: '马力欧卡丁车与宝可梦系列在欧洲具备深厚跨世代基本盘' },
        { label: 'FY2026 日本本土净营收占比 Japan (其余地区 12.2%)', val: 23.1, cStart: '#FBBF24', cEnd: '#D97706', sub: '含日本国内专用版亲民策略', note: '推出 ¥49,980 日语专用版 Switch 2 稳固本土国民级渗透率' }
      ];

      var pad = { top: 10, right: 18, bottom: 26, left: 18 };
      var pw = w - pad.left - pad.right;
      var ph = h - pad.top - pad.bottom;
      var maxX = 80;

      for (var g = 0; g <= 4; g++) {
        var xVal = g * 20;
        var gx = pad.left + (xVal / maxX) * pw;
        ctx.strokeStyle = pal.grid;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gx, pad.top);
        ctx.lineTo(gx, pad.top + ph);
        ctx.stroke();

        ctx.fillStyle = pal.tick;
        ctx.font = '10.5px "IBM Plex Mono", sans-serif';
        ctx.textAlign = g === 0 ? 'left' : (g === 4 ? 'right' : 'center');
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
      }

      var rowH = ph / items.length;

      /* 50% Milestone dashed line spanning the top 3 digital/gender rows */
      var targetX = pad.left + (50 / maxX) * pw;
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = pal.c3;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(targetX, pad.top + 4);
      ctx.lineTo(targetX, pad.top + rowH * 3 - 4);
      ctx.stroke();
      ctx.restore();

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

        if (w >= 560) {
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
            ? ('<strong>' + items[i].label + ': ' + items[i].val.toFixed(1) + '%</strong><br/>• Context: ' + items[i].sub + '<br/>• Insight: ' + items[i].note)
            : ('<strong>' + items[i].label + '：' + items[i].val.toFixed(1) + '%</strong><br/>• 口径说明：' + items[i].sub + '<br/>• 核心洞察：' + items[i].note)
        });
      }
    }

    /* Chart 4: FY2022–FY2027E Net Sales (¥B) & Operating Margin (%) Combo Chart */
    function drawEpsComboChart() {
      var env = prepareCanvas('chartEps');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartEps = [];

      var years = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026', 'FY2027E'];
      var subYears = isEn()
        ? ['(Mature Peak)', '(Evergreen)', '(Zelda+Movie)', '(Pre-Sw2 Dip)', '(Sw2 Launch)', '(27H1: 22.4%)']
        : ['(软件巅峰)', '(长青稳态)', '(王泪+电影)', '(换代蓄力)', '(Sw2首发翻倍)', '(27H1达22.4%)'];
      var salesB = [1695.3, 1601.7, 1671.9, 1164.9, 2313.1, 2050.0];
      var opB = [592.8, 504.4, 528.9, 282.6, 360.1, 370.0];
      var opMargin = [35.0, 31.5, 31.6, 24.3, 15.6, 22.4]; /* Last point highlights verified H1 FY27 actual 22.4% rebound (FY27 conservative guidance 18.0%) */

      var pad = { top: 26, right: 48, bottom: 44, left: 54 };
      var pw = w - pad.left - pad.right;
      var ph = h - pad.top - pad.bottom;

      var maxSales = 2600.0;
      var minM = 10.0, maxM = 40.0;

      for (var g = 0; g <= 4; g++) {
        var ratio = g / 4;
        var gy = pad.top + ph - ratio * ph;
        ctx.strokeStyle = pal.grid;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.left, gy);
        ctx.lineTo(pad.left + pw, gy);
        ctx.stroke();

        var sTick = ratio * maxSales;
        var mTick = minM + ratio * (maxM - minM);
        ctx.font = '10.5px "IBM Plex Mono", sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = pal.tick;
        ctx.textAlign = 'right';
        ctx.fillText('¥' + Math.round(sTick) + 'B', pad.left - 6, gy);
        ctx.textAlign = 'left';
        ctx.fillStyle = pal.c2;
        ctx.fillText(mTick.toFixed(0) + '%', pad.left + pw + 6, gy);
      }

      /* 30% Mature Software Margin Reference Line */
      var targetY = pad.top + ph - ((30.0 - minM) / (maxM - minM)) * ph;
      ctx.save();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = pal.c3;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(pad.left, targetY);
      ctx.lineTo(pad.left + pw, targetY);
      ctx.stroke();
      ctx.restore();

      var step = pw / years.length;
      var barW = Math.min(44, Math.max(20, step * 0.44));
      var linePts = [];

      for (var i = 0; i < years.length; i++) {
        var cx = pad.left + step * (i + 0.5);
        if (hoverState.chartEps === i) {
          ctx.fillStyle = pal.hoverBand;
          roundRectPath(ctx, pad.left + step * i + 3, pad.top, step - 6, ph, 6);
          ctx.fill();
        }

        if (state.epsSeries.eps) {
          var bh = (salesB[i] / maxSales) * ph;
          var bx = cx - barW / 2;
          var by = pad.top + ph - bh;
          var eGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
          if (i >= 4) {
            eGrad.addColorStop(0, '#66B2FF');
            eGrad.addColorStop(1, '#0073E6');
          } else {
            eGrad.addColorStop(0, '#3399FF');
            eGrad.addColorStop(1, '#0059B2');
          }
          ctx.fillStyle = eGrad;
          topRoundedBar(ctx, bx, by, barW, bh, 6);
          ctx.fill();

          if (w >= 520) {
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 9.5px "IBM Plex Mono", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText('¥' + Math.round(salesB[i]), cx, by + 15);
          }
        }

        var oy = pad.top + ph - ((opMargin[i] - minM) / (maxM - minM)) * ph;
        linePts.push({ x: cx, y: oy, m: opMargin[i] });

        ctx.fillStyle = pal.text;
        ctx.font = '700 ' + (w < 480 ? '10.5px' : '11.5px') + ' system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(years[i], cx, pad.top + ph + 19);
        ctx.fillStyle = pal.tick;
        ctx.font = '9.5px system-ui, sans-serif';
        ctx.fillText(subYears[i], cx, pad.top + ph + 33);

        var extraNote = i === 5
          ? (isEn() ? ' (H1 FY27 Actual Margin: 22.4%; Full-Yr Conservative Guide: ¥370B / 18.0%)' : ' (27H1 实绩利润率已升至 22.4%；全年保守指引营业利润 ¥3,700亿)')
          : '';
        hitRegions.chartEps.push({
          idx: i,
          x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
          html: isEn()
            ? ('<strong>' + years[i] + ' ' + subYears[i] + '</strong><br/>' +
               '• Consolidated Net Sales: <strong>¥' + salesB[i].toFixed(1) + 'B</strong><br/>' +
               '• Operating Profit: <strong>¥' + opB[i].toFixed(1) + 'B</strong><br/>' +
               '• Operating Margin: <strong>' + opMargin[i].toFixed(1) + '%</strong>' + extraNote)
            : ('<strong>' + years[i] + ' ' + subYears[i] + '</strong><br/>' +
               '• 合并净营收：<strong>¥' + salesB[i].toFixed(1) + ' 十亿</strong><br/>' +
               '• 营业利润：<strong>¥' + opB[i].toFixed(1) + ' 十亿</strong><br/>' +
               '• 营业利润率：<strong>' + opMargin[i].toFixed(1) + '%</strong>' + extraNote)
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
          drawValueBadge(ctx, linePts[m].m.toFixed(1) + '%', linePts[m].x, linePts[m].y - 16, pal.c2, pal);
        }
      }
    }

    /* Chart 5: Interactive Switch 2 Installed-Base Operating Profit Curve */
    function drawSimChart() {
      var env = prepareCanvas('chartSim');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h;
      var pal = getPalette();
      hitRegions.chartSim = [];

      var bases = [25, 40, 55, 70, 85, 100, 115];
      var activeOps = [];
      var legacyOps = [];
      for (var i = 0; i < bases.length; i++) {
        activeOps.push(computeEcosystemModel(bases[i], state.sim.attach, state.sim.digPct, state.sim.ipPool).opB);
        legacyOps.push(computeEcosystemModel(bases[i], state.sim.attach, 42, false).opB);
      }

      var curModel = computeEcosystemModel(state.sim.baseM, state.sim.attach, state.sim.digPct, state.sim.ipPool);
      var maxVal = Math.max(activeOps[bases.length - 1], curModel.opB, 600) * 1.12;

      var pad = { top: 20, right: 22, bottom: 28, left: 56 };
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
        ctx.fillText('¥' + Math.round(v) + 'B', pad.left - 7, gy);
      }

      /* Legacy Physical-Only Dashed Curve */
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = pal.tick;
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      for (var pIdx = 0; pIdx < bases.length; pIdx++) {
        var lx = pad.left + ((bases[pIdx] - 25) / 95) * pw;
        var ly = pad.top + ph - (legacyOps[pIdx] / maxVal) * ph;
        if (pIdx === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      ctx.stroke();
      ctx.restore();

      /* Active Full-Ecosystem Curve + Area Fill */
      var stepW = pw / (bases.length - 1);
      ctx.beginPath();
      for (var j = 0; j < bases.length; j++) {
        var tx = pad.left + ((bases[j] - 25) / 95) * pw;
        var ty = pad.top + ph - (activeOps[j] / maxVal) * ph;
        if (j === 0) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);

        var alpha = activeOps[j] - legacyOps[j];
        hitRegions.chartSim.push({
          idx: j,
          x: tx - stepW * 0.5, y: pad.top, w: stepW, h: ph + 24,
          html: isEn()
            ? ('<strong>Installed Base: ' + bases[j] + 'M Switch 2 Units</strong><br/>' +
               '• Full-Ecosystem OP: <strong>¥' + Math.round(activeOps[j]) + 'B</strong><br/>' +
               '• Physical-Heavy Baseline: ¥' + Math.round(legacyOps[j]) + 'B<br/>' +
               '• Digital + IP Margin Lift: <strong style="color:#22C55E;">+¥' + Math.round(alpha) + 'B</strong>')
            : ('<strong>Switch 2 装机规模：' + bases[j] + ' 百万台</strong><br/>' +
               '• 当前设定年化营业利润：<strong>¥' + Math.round(activeOps[j]) + 'B</strong><br/>' +
               '• 传统低数字无IP基准：¥' + Math.round(legacyOps[j]) + 'B<br/>' +
               '• 数字高毛利+IP超额利润：<strong style="color:#22C55E;">+¥' + Math.round(alpha) + 'B</strong>')
        });
      }
      ctx.strokeStyle = pal.c1;
      ctx.lineWidth = 2.8;
      ctx.stroke();

      var lastX = pad.left + ((bases[bases.length - 1] - 25) / 95) * pw;
      ctx.lineTo(lastX, pad.top + ph);
      ctx.lineTo(pad.left, pad.top + ph);
      ctx.closePath();
      var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
      grad.addColorStop(0, 'rgba(0, 115, 230, 0.30)');
      grad.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
      ctx.fillStyle = grad;
      ctx.fill();

      /* Active User-Selected Slider Marker */
      var selX = pad.left + ((Math.min(120, Math.max(25, state.sim.baseM)) - 25) / 95) * pw;
      var selY = pad.top + ph - (curModel.opB / maxVal) * ph;
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = pal.c2;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(selX, pad.top);
      ctx.lineTo(selX, pad.top + ph);
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = pal.pillBg;
      ctx.beginPath();
      ctx.arc(selX, selY, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = pal.c2;
      ctx.beginPath();
      ctx.arc(selX, selY, 4.5, 0, Math.PI * 2);
      ctx.fill();
      drawValueBadge(ctx, state.sim.baseM + 'M → ¥' + Math.round(curModel.opB) + 'B', Math.min(w - 58, Math.max(pad.left + 54, selX)), Math.max(pad.top + 13, selY - 16), pal.c2, pal);

      ctx.fillStyle = pal.tick;
      ctx.font = '10.5px "IBM Plex Mono", sans-serif';
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      ctx.fillText(isEn() ? '25M Base' : '25M 装机', pad.left, pad.top + ph + 19);
      ctx.textAlign = 'center';
      ctx.fillText(isEn() ? '70M Mid-Cycle' : '70M 中期规模', pad.left + ((70 - 25) / 95) * pw, pad.top + ph + 19);
      ctx.textAlign = 'right';
      ctx.fillText(isEn() ? '115M+ Scale' : '115M+ 破亿稳态', lastX, pad.top + ph + 19);
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
      link.download = 'Nintendo_Company_Analysis.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 1500);
      showToast(isEn() ? 'Exported standalone file: Nintendo_Company_Analysis.html' : '已导出独立网页 Nintendo_Company_Analysis.html');
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
          if (Array.isArray(parsed) && parsed.length === CHECKLIST_ITEMS_ZH.length) {
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

      /* Quick Jump Search (Ctrl+K / Cmd+K) */
      var jumpInput = document.getElementById('quickJumpInput');
      var jumpPop = document.getElementById('quickJumpPopover');
      function renderJumpList(q) {
        var kw = (q || '').trim().toLowerCase();
        var activeJump = isEn() ? QUICK_JUMP_EN : QUICK_JUMP_ZH;
        var list = activeJump.filter(function (item, idx) {
          var zhIt = QUICK_JUMP_ZH[idx] || item;
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
          document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[idx] + '</div>';
          drawRadarChart();
        });
      }

      var radarPills = document.querySelectorAll('[data-radar-key]');
      for (var r = 0; r < radarPills.length; r++) {
        radarPills[r].addEventListener('click', function () {
          var key = this.getAttribute('data-radar-key');
          state.radarSeries[key] = !state.radarSeries[key];
          if (!state.radarSeries.ntd && !state.radarSeries.sie && !state.radarSeries.pub) {
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
      var bSlider = document.getElementById('simBaseSlider');
      var aSlider = document.getElementById('simAttachSlider');
      var dSlider = document.getElementById('simDigSlider');
      var ipToggle = document.getElementById('simIpToggle');

      bSlider.addEventListener('input', function () {
        state.sim.baseM = parseInt(this.value, 10) || 36;
        state.sim.preset = '';
        updateSimulatorUI();
      });
      aSlider.addEventListener('input', function () {
        state.sim.attach = parseFloat(this.value) || 2.1;
        state.sim.preset = '';
        updateSimulatorUI();
      });
      dSlider.addEventListener('input', function () {
        state.sim.digPct = parseInt(this.value, 10) || 61;
        state.sim.preset = '';
        updateSimulatorUI();
      });
      ipToggle.addEventListener('change', function () {
        state.sim.ipPool = !!this.checked;
        updateSimulatorUI();
      });

      var presetBtns = document.querySelectorAll('[data-preset]');
      for (var pb = 0; pb < presetBtns.length; pb++) {
        presetBtns[pb].addEventListener('click', function () {
          var key = this.getAttribute('data-preset');
          var cfg = PRESETS[key];
          if (!cfg) return;
          state.sim.baseM = cfg.baseM;
          state.sim.attach = cfg.attach;
          state.sim.digPct = cfg.digPct;
          state.sim.ipPool = cfg.ipPool;
          state.sim.preset = key;
          bSlider.value = String(cfg.baseM);
          aSlider.value = String(cfg.attach);
          dSlider.value = String(cfg.digPct);
          ipToggle.checked = cfg.ipPool;
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
        showToast(isEn() ? 'Checked all 6 Nintendo moat criteria' : '已勾选全部 6 项任天堂护城河核查指标');
      });
      document.getElementById('resetCheckBtn').addEventListener('click', function () {
        state.checks = [true, true, true, true, false, false];
        safeSetStorage(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
        renderChecklist();
        showToast(isEn() ? 'Checklist reset to default baseline (67%)' : '核查清单已恢复默认基准状态 (67%)');
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

      /* Wire Tooltips & Legend Toggles */
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
  