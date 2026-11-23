
 (function () {
 'use strict';

 var CFG = {"filename": "Apple_Home_Product_Analysis.html", "checkStorageKey": "mui_home_moat_checks_v1", "docTitleZh": "Apple Home 智能家居产品力、HomeView 端侧 AI 中枢与隐私商业模式深度研究报告 | 数据中心", "docTitleEn": "Apple Home Product Strategy, HomeView AI Hub & Privacy-First Smart Home Deep Dive | Research Hub", "ch1": {"tabA_zh": "视图A: 全球带屏中枢高增赛道", "tabA_en": "View A: Smart Display Market Ramp", "tabB_zh": "视图B: 2026 苹果家居提价前后对比", "tabB_en": "View B: Pre- vs. Post-2026 MSRP Ladder", "viewA": {"mode": "combo", "title_zh": "2024–2029E 全球智能带屏中枢市场规模 ($B) 与 Apple Home 独立营收估算 ($B)", "title_en": "2024–2029E Global Smart Display Market ($B) & Est. Apple Home Hardware Revenue ($B)", "sub_zh": "左轴为 Mordor Intelligence 全球智能显示屏市场规模（CAGR ~16.6%）；右轴为 HomeView + TV + HomePod 硬件规模演进", "sub_en": "Left axis: Mordor global smart display market (~16.6% CAGR); Right axis: Est. Apple Home hardware revenue trajectory", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 左轴：全球智能带屏中枢市场规模 ($B)</span><span style=\"color:var(--chart-c2);\">● 右轴：Apple Home 独立硬件年营收估算 ($B)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ Left Axis: Global Smart Display Market ($B)</span><span style=\"color:var(--chart-c2);\">● Right Axis: Est. Apple Home Revenue ($B)</span>", "leg1_zh": "全球智能显示屏市场规模 ($B · 左轴)", "leg1_en": "Global Smart Display Market Size ($B · Left)", "leg2_zh": "Apple Home 全系硬件估算营收 ($B · 右轴)", "leg2_en": "Est. Apple Home Hardware Revenue ($B · Right)", "labels_zh": ["2024", "2025", "2026E", "2027E", "2028E", "2029E"], "labels_en": ["2024", "2025", "2026E", "2027E", "2028E", "2029E"], "full_zh": ["2024 (旧款 TV + HomePod 存量期)", "2025 (新品蓄势待发期)", "2026E (11月 HomeView/A19 TV 首销)", "2027E (首个完整财年+安防外设放量)", "2028E (欧盟与全球市场拓展)", "2029E (桌面机械臂中枢演进)"], "full_en": ["2024 (Legacy TV & HomePod)", "2025 (Pre-Overhaul Trough)", "2026E (Nov HomeView/A19 Launch)", "2027E (First Full Year + Collection)", "2028E (Global Expansion)", "2029E (Robotic Tabletop Era)"], "s1": [4.05, 4.71, 5.49, 6.4, 7.46, 8.7], "s2": [3.2, 3.0, 3.6, 5.4, 6.3, 7.2], "min1": 2.0, "max1": 10.0, "min2": 2.0, "max2": 8.5, "s1_prefix": "$", "s1_suffix": "B", "s1_dec": 1, "s1_val_dec": 2, "s2_prefix": "$", "s2_suffix": "B", "s2_dec": 1, "s2_val_dec": 1, "s2_signed": false}, "viewB": {"mode": "grouped", "title_zh": "Apple Home 主力硬件价格重塑对比：2025 旧款起售价 vs 2026.10 算力跃迁后起售价 (USD)", "title_en": "Apple Home Hardware MSRP Reset: 2025 Legacy Base Price vs. Oct 2026 AI-Hub Lineup ($)", "sub_zh": "通过植入 A19 / A18 / S10 与 8GB 大内存，将客厅硬件均价整体上移 17%–132% 以消化存储成本并增厚毛利", "sub_en": "Upgrading to A19, A18, S10 & 8GB RAM lifted starting MSRPs +17% to +132%, defending positive hardware margins", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 2025 旧世代官方起售价 ($)</span><span style=\"color:var(--chart-c2);\">■ 2026.10 换代/调价后官方起售价 ($)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ 2025 Legacy Starting MSRP ($)</span><span style=\"color:var(--chart-c2);\">■ Oct 2026 Current Starting MSRP ($)</span>", "leg1_zh": "2025 旧世代官方起售价 ($)", "leg1_en": "2025 Legacy Starting MSRP ($)", "leg2_zh": "2026.10 最新在售起售价 ($)", "leg2_en": "Oct 2026 Active Starting MSRP ($)", "labels_zh": ["HomePod mini", "Apple TV 4K", "HomeView 带屏中枢", "HomePod 旗舰音箱"], "labels_en": ["HomePod mini", "Apple TV 4K", "HomeView 7\" Hub", "HomePod 2nd Gen"], "full_zh": ["HomePod mini (S5 $99 → S10 mini 2 $149)", "Apple TV 4K (A15 64GB $129 → A19+N1 128GB $299)", "Apple HomeView (全新开辟 $299 7英寸触控品类)", "HomePod 二代 (2026.06 由 $299 上调至 $349)"], "full_en": ["HomePod mini (S5 $99 → S10 mini 2 $149)", "Apple TV 4K (A15 $129 → A19+N1 128GB $299)", "Apple HomeView (All-new $299 A18 smart display)", "HomePod 2nd Gen (Hiked June 2026 from $299 to $349)"], "s1": [99, 129, 0, 299], "s2": [149, 299, 299, 349], "sub_row_zh": ["+$50 (+50.5%)", "+$170 (A19+128GB)", "全新品类 $299", "+$50 (+16.7%)"], "sub_row_en": ["+$50 (+50.5%)", "+$170 (A19+128GB)", "New Category $299", "+$50 (+16.7%)"], "max1": 400, "s1_prefix": "$", "s1_suffix": "", "s1_dec": 0, "s1_val_dec": 0, "s2_prefix": "$", "s2_suffix": "", "s2_val_dec": 0}}, "radar": {"title_zh": "全球五大智能家居与客厅音频生态五维能力雷达图（10分制评估）", "title_en": "5-Axis Smart Home & Living-Room Ecosystem Competitiveness Radar (10-Point Scale)", "axes_zh": ["端侧 AI 算力与无广告隐私", "音画品质与工业设计质感", "单台硬件毛利率健康度", "第三方全屋家电覆盖广度", "入门价格亲民度与铺货量"], "axes_en": ["Local AI Compute & Privacy", "AV Quality & Industrial Design", "Hardware Gross Margin Health", "3rd-Party Appliance Breadth", "Mass-Market Entry Price"], "s1_zh": "Apple Home (HomeView / A19 TV)", "s1_en": "Apple Home (HomeView / A19 TV)", "s2_zh": "Amazon Echo / Alexa+ 生态", "s2_en": "Amazon Echo / Alexa+ Ecosystem", "s3_zh": "Sonos / 小米 AIoT (取各自长板均值)", "s3_en": "Sonos Audio / Xiaomi AIoT Peers", "v1": [9.9, 9.5, 9.2, 7.6, 5.4], "v2": [6.2, 7.4, 4.5, 9.6, 9.5], "v3": [7.5, 8.8, 8.2, 9.2, 8.4]}, "bars": {"title_zh": "Apple HomeView ($299 估算 ~$185 BOM) 硬件成本结构拆解 vs 传统智能音箱迁移（%）", "title_en": "Apple HomeView ($299 · Est. ~$185 BOM) Cost Breakdown vs. Legacy Smart Speakers (%)", "sub_zh": "综合 iFixit 2026-11-17 实拆（A18 + 8GB 海力士 LPDDR5X + 64GB 铠侠闪存 + 7\" 屏）与 TechInsights HomePod 声学拆解基准", "sub_en": "Synthesized from iFixit's Nov 17, 2026 HomeView teardown (A18 + 8GB SK hynix LPDDR5X + 64GB NAND) & TechInsights HomePod data", "chip_zh": "A18 + 8GB LPDDR5X 占 BOM 约 38%", "chip_en": "A18 + 8GB LPDDR5X Drives ~38% of BOM", "leg1_zh": "蓝色/琥珀色：A18 处理器 + 8GB LPDDR5X/64GB 存储与 7 英寸 1088×1088 触控屏 + 12MP 摄像头", "leg1_en": "Blue / Amber: A18 SoC + 8GB LPDDR5X/64GB NAND & 7\" 1088×1088 Touch Display + 12MP Camera", "leg2_zh": "绿色/紫色：多单元声学腔体电源模块与 Wi-Fi 6E / BT 6 / Thread 射频及挂墙结构件", "leg2_en": "Green / Purple: Multi-Driver Acoustic/PSU Subsystem & Wi-Fi 6E / Thread RF + Enclosure", "maxX": 45, "items_zh": [{"label": "Apple A18 主芯片 + 8GB SK 海力士 LPDDR5X 内存 + 64GB 铠侠闪存", "val": 38.0, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "~$70 (传统音箱仅占 22%，端侧 AI 翻倍)", "note": "iFixit 实拆证实标配满血 8GB LPDDR5X 以本地运行 Apple Intelligence，是 $299 定价的核心成本项"}, {"label": "7 英寸 1088×1088 方形 Liquid Retina 触控屏 + 12MP 超广角人脸识别模组", "val": 24.5, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "~$45 (定制 1:1 方形面板 + 传感器)", "note": "支撑 Glanceable UI 远近动态切换与同屏 9 路 HomeKit 加密监控解码显示"}, {"label": "双全频扬声器 + 下沉式低音炮 + 双无源辐射器 + 四麦阵列与内置电源", "val": 23.0, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "~$42.5 (继承 HomePod 高保真声学功底)", "note": "远超普通廉价带屏音箱的单薄喇叭素质，单机即可充当厨房或书房主力音响"}, {"label": "Wi-Fi 6E + Bluetooth 6.0 + Thread 边界路由模组与磁吸挂墙/底座结构件", "val": 14.5, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$27.5 (全胶封前屏结构 + 精密织物网罩)", "note": "内置全屋 Matter/Thread 路由网关，支持台式底座与墙面磁吸供电底座灵活切换"}], "items_en": [{"label": "Apple A18 SoC + 8GB SK hynix LPDDR5X Unified RAM + 64GB Kioxia NAND", "val": 38.0, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "~$70 (up from 22% on legacy HomePod)", "note": "iFixit confirmed full 8GB LPDDR5X to run on-device Siri AI—explaining the disciplined $299 MSRP"}, {"label": "7-Inch 1088×1088 Square Liquid Retina Touchscreen + 12MP Center Stage Camera", "val": 24.5, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "~$45 (custom 1:1 panel + ambient sensors)", "note": "Enables distance-adaptive Glanceable UI, FaceTime calls, and live 9-camera Secure Video grids"}, {"label": "Dual Full-Range Drivers, Down-Firing Woofer, Dual Radiators & 4-Mic Array", "val": 23.0, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "~$42.5 (HomePod-grade acoustic engineering)", "note": "Delivers rich room-filling audio far superior to hollow plastic smart displays"}, {"label": "Wi-Fi 6E + Bluetooth 6.0 + Thread Border Router & Wall/Tabletop Chassis", "val": 14.5, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$27.5 (magnetic mount + mesh fabric)", "note": "Anchors local Matter/Thread mesh connectivity across tabletop and Schneider wall-mount setups"}]}, "combo": {"title_zh": "行业商业模式大分野：四大智能家居硬件阵营代表单品零售均价 ($) vs 硬件端估算毛利率 (%)", "title_en": "Smart Home Business Model Divergence: Representative Hub MSRP ($) vs. Est. Hardware GM (%)", "sub_zh": "柱状图（左轴）为主力带屏/客厅旗舰单价；折线（右轴）为纯硬件毛利率（亚马逊 Echo Show 15 拆解实测倒挂 -24%）", "sub_en": "Bars (left axis): Flagship hub/audio MSRP ($); Line (right axis): Est. hardware gross margin (Echo Show 15 at -24%)", "chip_zh": "苹果与 Sonos 坚守正毛利 · 互联网巨头硬件补贴", "chip_en": "Apple & Sonos Positive GM vs. Ad-Subsidized Rivals", "left_axis_zh": "■ 左轴：主力客厅/带屏中枢官方售价 ($)", "left_axis_en": "■ Left Axis: Flagship Hub / Audio MSRP ($)", "right_axis_zh": "● 右轴：硬件端估算毛利率 (%)", "right_axis_en": "● Right Axis: Est. Hardware Gross Margin (%)", "leg1_zh": "代表性带屏/音响硬件官方定价 (左轴 · $)", "leg1_en": "Representative Smart Hub / Audio MSRP (Left · $)", "leg2_zh": "单机纯硬件估算毛利率 (右轴 · %)", "leg2_en": "Estimated Hardware Gross Margin (Right · %)", "ref_chip_zh": "--- 0% 硬件盈亏平衡生死线", "ref_chip_en": "--- 0% Hardware Breakeven Line", "labels_zh": ["Amazon Echo Show 15", "Google TV Streamer", "Apple HomeView", "Sonos Era 300"], "labels_en": ["Echo Show 15", "Google TV Streamer", "Apple HomeView", "Sonos Era 300"], "subs_zh": ["($309 BOM 赔本卖)", "(低价导流云订阅)", "(A18+8GB 正毛利)", "(纯声学 46.9% GM)"], "subs_en": ["($309 BOM Loss Leader)", "(Cloud Sub Funnel)", "(A18+8GB Positive GM)", "(46.9% GAAP GM)"], "s1": [249, 150, 299, 479], "s2": [-24.0, 12.0, 36.0, 46.9], "min1": 0, "max1": 550, "min2": -32.0, "max2": 56.0, "s1_prefix": "$", "s1_suffix": "", "s1_dec": 0, "s1_val_dec": 0, "s2_prefix": "", "s2_suffix": "%", "s2_dec": 0, "s2_val_dec": 1, "refLine2": 0.0, "ref_badge_zh": "0% 硬件盈亏线", "ref_badge_en": "0% Breakeven Floor"}, "sim": {"title_zh": "Apple Home 全屋矩阵五年硬件营收与毛利推演测算器", "title_en": "Apple Home 5-Year Hardware Revenue & Gross Profit Simulator", "toggle_title_zh": "计入 HomeView 挂墙配件与 Apple Home Collection 安防套装搭售 (+$48 综合均价)", "toggle_title_en": "Include HomeView Mounts & Home Collection Camera/Lock Attach (+$48 ASP)", "toggle_sub_zh": "模拟多房间购买摄像机、可视门铃、UWB 门锁与施耐德挂墙面板对客单价的拉动", "toggle_sub_en": "Simulates multi-device attach of 2.5K cameras, video doorbells, UWB locks & Schneider wall mounts", "u_label_zh": "年均 Apple Home 全系设备总出货 (Million Units)", "u_label_en": "Annual Total Apple Home Units (Million Devices)", "u_min": 8, "u_max": 32, "u_step": 1, "u_suffix_zh": "M 台", "u_suffix_en": "M Units", "a_label_zh": "中枢与音箱基础出厂均价 ASP (USD)", "a_label_en": "Base Hub & Speaker Net ASP (USD)", "a_min": 175, "a_max": 310, "a_step": 5, "b_label_zh": "含 A18/A19 存储与联名分成硬件成本率 (%)", "b_label_en": "Hardware BOM & Co-Engineering Partner Ratio (%)", "b_min": 54, "b_max": 74, "b_step": 0.5, "revDivisorToB": 1000.0, "mixAspDelta": 48, "mixBomDelta": -2.0, "annualGrowthRate": 0.08, "stat1_zh": "年化 Apple Home 生态总营收", "stat1_en": "Annualized Apple Home Net Revenue", "stat2_zh": "年化硬件毛利润 / 隐含毛利率", "stat2_en": "Annual Gross Profit / Implied GM%", "stat3_zh": "综合单件 ARPU / 单件毛利额", "stat3_en": "Blended ARPU / Gross Profit per Device", "stat4_zh": "5 年累计创造家居硬件毛利池", "stat4_en": "5-Year Cumulative Gross Profit Pool", "presets": [{"label_zh": "① FY2027 全系换代首年基准 (HomeView+A19 TV)", "label_en": "① FY2027 Full-Refresh Baseline", "tag_zh": "18M台 · ~$5.0B营收", "tag_en": "18M · ~$5.0B Rev", "units": 18, "baseAsp": 230, "bomPct": 64.5, "mixBoost": true}, {"label_zh": "② 全屋安防门锁套装高渗透上行", "label_en": "② Whole-Home Security & Atmos Bull", "tag_zh": "25M台 · 多房间放量", "tag_en": "25M · Multi-Room", "units": 25, "baseAsp": 245, "bomPct": 62.0, "mixBoost": true}, {"label_zh": "③ $299 高定价抑制销量保守情景", "label_en": "③ $299 Price-Sensitivity Conservative", "tag_zh": "12M台 · 纯主机口径", "tag_en": "12M · Hub Only", "units": 12, "baseAsp": 215, "bomPct": 67.5, "mixBoost": false}]}, "pillarNotesZh": ["<strong>当前选中支柱解读（01 家庭隐私红线）：</strong>客厅与卧室是用户隐私最敏感的私密领地；亚马逊 Echo Show 强推全屏轮播广告引发大量高端用户反感，为无广告的 HomeView 腾出巨大替代窗口 <a class=\"cite-link\" href=\"https://support.apple.com/en-us/149438\" target=\"_blank\" rel=\"noopener noreferrer\">HomeView Privacy ↗</a>。", "<strong>当前选中支柱解读（02 商业可持续性）：</strong>智能音箱点歌设闹钟难以像游戏主机那样靠抽成回本，只有硬件自身盈利才能持续投入 A18/A19 级先进芯片迭代 <a class=\"cite-link\" href=\"https://www.techinsights.com/blog/apple-homepod-teardown-and-cost-comparison\" target=\"_blank\" rel=\"noopener noreferrer\">HomePod Economics ↗</a>。", "<strong>当前选中支柱解读（03 家庭级物理锁定）：</strong>个人换安卓手机只需导通讯录，但若全家门锁钥匙、9 路安防监控与客厅四音箱环绕声全绑在 Apple Home 上，整户流失率趋近于零 <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/10/introducing-apple-home-collection-a-new-lineup-of-smart-home-accessories/\" target=\"_blank\" rel=\"noopener noreferrer\">Household Lock-In ↗</a>。", "<strong>当前选中支柱解读（04 开放协议借力）：</strong>过去 HomeKit 认证严苛导致配件贵且少；如今第三方平价传感器走 Matter 协议，核心高频中枢与安防由苹果自营/联名把控 <a class=\"cite-link\" href=\"https://www.apple.com/tv-home/\" target=\"_blank\" rel=\"noopener noreferrer\">Matter & Thread ↗</a>。"], "pillarNotesEn": ["<strong>Selected Pillar (01 · Zero-Ad Privacy):</strong> As rivals monetize kitchen screens with intrusive ads, HomeView's clean Glanceable UI and local encryption win affluent households <a class=\"cite-link\" href=\"https://support.apple.com/en-us/149438\" target=\"_blank\" rel=\"noopener noreferrer\">HomeView Privacy ↗</a>.", "<strong>Selected Pillar (02 · Hardware Profitability):</strong> Because timers and music commands rarely pay back hardware subsidies, upfront margin discipline funds A18/A19 silicon upgrades <a class=\"cite-link\" href=\"https://www.techinsights.com/blog/apple-homepod-teardown-and-cost-comparison\" target=\"_blank\" rel=\"noopener noreferrer\">HomePod Economics ↗</a>.", "<strong>Selected Pillar (03 · Physical Household Lock-In):</strong> Switching one phone is easy; ripping out hardwired doorbells, UWB deadbolts, and 4-HomePod Atmos is near-impossible <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/10/introducing-apple-home-collection-a-new-lineup-of-smart-home-accessories/\" target=\"_blank\" rel=\"noopener noreferrer\">Household Lock-In ↗</a>.", "<strong>Selected Pillar (04 · Matter &amp; Thread Leverage):</strong> Commodity plugs and bulbs join via Matter while Apple captures high-margin hubs, audio, and cameras <a class=\"cite-link\" href=\"https://www.apple.com/tv-home/\" target=\"_blank\" rel=\"noopener noreferrer\">Matter & Thread ↗</a>."], "peerRowsZh": [{"category": "g1", "benchmark": true, "company": "研究基准：Apple Home", "leader": "HomeView ($299) / Apple TV 4K A19 ($299) / mini 2 ($149)", "col2": "A19 + A18 (8GB RAM) + S10 + 自研 N1 (Wi-Fi 7 / Thread) + 本地 Siri AI", "col3": "音箱销量 ~4.7% 攫取 ~13.3% 营收 · 北美主机 CTV 份额 ~8%", "col4": "主机 $149–$349；安防录像含于既有 iCloud+ 零额外月费、零广告", "col5": "全线坚守 ~30%–38%+ 正向硬件毛利，拒绝赔本冲量", "verdict": "高端隐私与端侧算力标杆：单机算力领先竞品数代，2026.10 补齐带屏中枢与联名安防短板。", "sourceLabel": "Apple Newsroom", "sourceUrl": "https://www.apple.com/newsroom/2026/10/meet-apple-homeview-a-new-way-to-enjoy-entertainment-and-manage-the-home/"}, {"category": "g1", "benchmark": false, "company": "亚马逊 (Amazon Echo / Ring / Fire TV)", "leader": "Echo Dot Max ($100) / Echo Show 8 & 11 ($180–$220) / Show 16", "col2": "自研 AZ3 / AZ3 Pro 边缘芯片 + Omnisense 传感 + 云端 Alexa+", "col3": "全球智能音箱收入份额 ~31% (#1) · 累计售出 >5 亿台 Alexa 设备", "col4": "促销低至 $39–$99；非 Prime 需 $19.99/月 Alexa+ + Ring 安防月费 + 屏幕广告", "col5": "长期硬件贴成本甚至负毛利补贴（Echo Show 15 拆解倒挂 -24%）", "verdict": "存量规模霸主：设备覆盖最广，但屏幕广告骚扰与多重订阅收费正把高净值苹果家庭推向 HomeView。", "sourceLabel": "AboutAmazon 2026", "sourceUrl": "https://www.aboutamazon.com/news/devices/new-alexa-devices-2026"}, {"category": "g1", "benchmark": false, "company": "谷歌智能家居 (Google Nest / Google TV)", "leader": "Google Home Speaker ($99.99) / Google TV Streamer ($150)", "col2": "云端 Gemini for Home 大模型（TV Streamer 仍停留在 Wi-Fi 5 旧芯片）", "col3": "全球带屏与语音中枢稳居前二，Android TV / Google TV 装机庞大", "col4": "硬件 $99.99–$279.99；高级安防与 Gemini Live 需 $10–$20/月订阅", "col5": "硬件微利走量，重心转向变现 Google Home Premium 云订阅", "verdict": "云端大模型对话自然度强，但 $150 电视盒子硬件算力与 Wi-Fi 规格远落后于 A19+N1 Apple TV 4K。", "sourceLabel": "Google Store", "sourceUrl": "https://store.google.com/us/category/connected_home?hl=en-US"}, {"category": "g1", "benchmark": false, "company": "Roku 流媒体平台 (Roku OS)", "leader": "Roku Ultra ($99) / Roku 贴牌智能电视", "col2": "低功耗流媒体解码芯片 + 主屏广告分发操作系统", "col3": "北美联网电视主用平台第 1（占美国家庭 28%–37%）", "col4": "硬件 $29–$99 极低价铺货，靠平台广告与频道分成盈利", "col5": "硬件端接近零毛利获客，平台广告毛利率超 50%", "verdict": "北美电视入口量王：低价统治大众客厅，但无端侧 AI 智能家居计算能力与高保真多房间声学矩阵。", "sourceLabel": "Parks Associates", "sourceUrl": "https://www.parksassociates.com/blogs/pr-video-services-ott-pay-tv/roku-and-samsung-dominate-connected-tv-platforms"}, {"category": "g2", "benchmark": false, "company": "Sonos 全屋高端音响", "leader": "Sonos Arc Ultra ($1,099) / Era 300 ($479) / Sub 4", "col2": "Sound Motion 平板低音换能器 + Trueplay 空间调音（纯音频无屏幕）", "col3": "FY2026 营收 $15.47 亿 (+7% YoY)，高端多房间音响标杆", "col4": "$199–$1,099 高端声学硬件一次性买断，无强制云月费", "col5": "FY2026 GAAP 硬件综合毛利率高达 46.9%，与苹果同属高毛利阵营", "verdict": "多房间声学直接对手：经历 App 口碑风波后复苏，正面临 Apple TV 4K 四台 HomePod 无线全景声正面分流。", "sourceLabel": "Sonos FY26 Filing", "sourceUrl": "https://www.businesswire.com/news/home/20261110256954/en/Sonos-Reports-Fourth-Quarter-and-Fiscal-2026-Results"}, {"category": "g2", "benchmark": false, "company": "小米澎湃智联 (Xiaomi AIoT)", "leader": "小米智能家庭屏 Pro / 米家冰洗空全屋大家电矩阵", "col2": "澎湃 HyperOS 人车家全生态 + 小爱大模型 + 中枢网关本地联动", "col3": "AIoT 平台连接设备破 11.61 亿台 (+20% YoY)，米家月活 1.24 亿", "col4": "从 ¥49 传感器到万元中央空调全价位自研覆盖", "col5": "2026Q2 IoT 与生活消费品毛利率创 25.2% 新高", "verdict": "全球白电与全屋硬件广度第一：大家电自产能力远超苹果，但欧美高端隐私市场与 iOS 原生权限不及 Apple Home。", "sourceLabel": "Xiaomi Q2 2026", "sourceUrl": "https://www.mi.com/global/discover/article?id=6331"}], "peerRowsEn": [{"category": "g1", "benchmark": true, "company": "Benchmark: Apple Home", "leader": "HomeView ($299) / Apple TV 4K A19 ($299) / mini 2 ($149)", "col2": "A19 + A18 (8GB RAM) + S10 + in-house N1 (Wi-Fi 7 / Thread) + local Siri AI", "col3": "~4.7% speaker units capture ~13.3% revenue · ~8% U.S. primary CTV", "col4": "$149–$349 hubs; Secure Video included in iCloud+ w/ zero extra fees or ads", "col5": "Maintains ~30%–38%+ positive hardware gross margin across every SKU", "verdict": "Privacy & local-AI leader: leaps generations ahead in hub silicon while closing display & camera gaps.", "sourceLabel": "Apple Newsroom", "sourceUrl": "https://www.apple.com/newsroom/2026/10/meet-apple-homeview-a-new-way-to-enjoy-entertainment-and-manage-the-home/"}, {"category": "g1", "benchmark": false, "company": "Amazon (Echo / Ring / Fire TV)", "leader": "Echo Dot Max ($100) / Echo Show 8 & 11 ($180–$220) / Show 16", "col2": "Custom AZ3 / AZ3 Pro edge silicon + Omnisense + cloud Alexa+", "col3": "~31% global smart speaker revenue (#1) · >500M Alexa devices sold", "col4": "$39–$99 promos; $19.99/mo Alexa+ (free w/ Prime) + Ring fees + screen ads", "col5": "Historically near-zero or negative hardware GM (Echo Show 15 at -24% BOM)", "verdict": "Installed-base giant: widest device reach, but home-screen ad clutter and subscription fatigue alienate premium buyers.", "sourceLabel": "AboutAmazon 2026", "sourceUrl": "https://www.aboutamazon.com/news/devices/new-alexa-devices-2026"}, {"category": "g1", "benchmark": false, "company": "Google Home & Google TV", "leader": "Google Home Speaker ($99.99) / Google TV Streamer ($150)", "col2": "Cloud Gemini for Home (Google TV Streamer still uses legacy Wi-Fi 5 chip)", "col3": "Top-2 global voice & smart display base; massive Google TV footprint", "col4": "$99.99–$279.99 hardware + $10–$20/mo Google Home Premium AI/video plans", "col5": "Thin hardware margins aimed at driving recurring Gemini/Nest cloud ARPU", "verdict": "Strong cloud Gemini conversational fluency, but local hub compute trails Apple's A19 + N1 by years.", "sourceLabel": "Google Store", "sourceUrl": "https://store.google.com/us/category/connected_home?hl=en-US"}, {"category": "g1", "benchmark": false, "company": "Roku Inc. (Roku OS)", "leader": "Roku Ultra ($99) / Roku-Powered Smart TVs", "col2": "Low-cost streaming SoCs + ad-monetized home-screen OS", "col3": "#1 U.S. primary CTV platform (28%–37% of broadband households)", "col4": "$29–$99 streaming sticks/boxes monetized via home-screen video ads", "col5": "Near-breakeven hardware subsidizing >50% margin platform ad revenue", "verdict": "U.S. streaming volume leader, but lacks local smart-home AI compute, cameras, or spatial audio mesh.", "sourceLabel": "Parks Associates", "sourceUrl": "https://www.parksassociates.com/blogs/pr-video-services-ott-pay-tv/roku-and-samsung-dominate-connected-tv-platforms"}, {"category": "g2", "benchmark": false, "company": "Sonos Inc.", "leader": "Sonos Arc Ultra ($1,099) / Era 300 ($479) / Sub 4", "col2": "Sound Motion transducer + Trueplay room tuning (audio-only, no screens)", "col3": "FY2026 revenue $1.547B (+7% YoY); premier multi-room audio brand", "col4": "$199–$1,099 upfront Hi-Fi hardware with zero mandatory monthly fees", "col5": "Healthy 46.9% FY26 GAAP gross margin—closest peer to Apple's pricing model", "verdict": "Direct whole-home audio rival: recovering from app missteps, now facing Apple TV 4K's 4-HomePod Atmos surround.", "sourceLabel": "Sonos FY26 Filing", "sourceUrl": "https://www.businesswire.com/news/home/20261110256954/en/Sonos-Reports-Fourth-Quarter-and-Fiscal-2026-Results"}, {"category": "g2", "benchmark": false, "company": "Xiaomi HyperOS AIoT", "leader": "Xiaomi Smart Home Screen Pro / Mijia HVAC & White Goods", "col2": "HyperOS Human × Car × Home + local central mesh gateway", "col3": "1.1608B connected AIoT devices (+20% YoY); 124.1M Mi Home MAUs", "col4": "Spans $7 sensors to smart refrigerators, washers, and EV integration", "col5": "Record 25.2% Q2 2026 IoT & Lifestyle gross margin at massive scale", "verdict": "Unmatched first-party appliance breadth in Asia/Europe, though less integrated into U.S. iOS households.", "sourceLabel": "Xiaomi Q2 2026", "sourceUrl": "https://www.mi.com/global/discover/article?id=6331"}], "peerUnitLabelZh": "家核心智能家居对手", "peerUnitLabelEn": "Smart Home Peers", "checklistZh": [{"tag": "HomeView 首年渗透", "title": "1. 新品类破局测试：HomeView ($299) 能否打开存量果粉厨房/玄关入口？", "desc": "走近 6 人自动人脸切换看板与挂墙模式能否说服 iPhone 家庭购买首台苹果带屏中枢？"}, {"tag": "4-HomePod 全景声", "title": "2. 多台组网客单测试：Apple TV 4K 四音箱无线环绕能否拉高单户台数？", "desc": "支持最多 4 台 HomePod / mini 2 自动校准杜比全景声能否持续侵蚀 Sonos 家庭影院份额？"}, {"tag": "LG/施耐德安防搭售", "title": "3. 安防闭环测试：Apple Home Collection 门铃/门锁/摄像头搭售是否顺畅？", "desc": "ADT 上门安装服务与 iCloud+ 免额外月费能否推动用户从 Ring / Nest 迁移至苹果安防体系？"}, {"tag": "A18/A19 正向毛利", "title": "4. 存储涨价吸收测试：$149–$349 新价格带能否完全覆盖 8GB LPDDR5X 成本？", "desc": "上调后的主机定价能否在 2026–2027 高存储成本周期内稳守 30%+ 硬件毛利率？"}, {"tag": "欧盟 DMA 合规解锁", "title": "5. 地域扩张测试：HomeView 能否在合规调优后顺利进入欧盟 27 国市场？", "desc": "苹果能否在不牺牲核心家庭隐私安全的前提下满足欧盟互操作规范、释放欧洲增量？"}, {"tag": "桌面机器人演进", "title": "6. 下一代家庭具身 AI 储备：HomeOS 是否为机械臂桌面中枢打好地基？", "desc": "Glanceable UI 多模态人物追踪与本地 Siri AI 是否顺利向更高客单价的家庭具身终端演进？"}], "checklistEn": [{"tag": "HomeView Adoption", "title": "1. Category Creation Test: Is HomeView ($299) winning kitchen & wall slots?", "desc": "Do 6-person face-aware Glanceable dashboards and wall mounting drive multi-room adoption among iPhone homes?"}, {"tag": "4-Speaker Atmos", "title": "2. Multi-Unit Cart Test: Does 4-HomePod surround boost devices per household?", "desc": "Does pairing up to 4 HomePods/mini 2s with A19 Apple TV 4K capture high-ticket home theater budgets from Sonos?"}, {"tag": "Collection Attach", "title": "3. Security Ring Test: Are LG/Schneider cameras & UWB locks converting Ring users?", "desc": "Do ADT turnkey installation and zero-extra-fee iCloud+ Secure Video accelerate whole-home security switching?"}, {"tag": "30%+ Hardware GM", "title": "4. Margin Discipline Test: Does the $149–$349 price ladder offset 8GB DRAM costs?", "desc": "Do Oct 2026 MSRPs preserve healthy positive hardware margins despite A18/A19 and 8GB LPDDR5X BOM upgrades?"}, {"tag": "EU DMA Resolution", "title": "5. Geographic Unlock Test: Will Apple clear EU DMA hurdles to ship HomeView in Europe?", "desc": "Can Apple resolve EU interoperability requirements to unlock the European smart-home market in 2027?"}, {"tag": "Robotic Hub Path", "title": "6. Embodied Home AI Test: Does HomeOS lay the foundation for tabletop robotics?", "desc": "Do multi-person camera tracking and local Siri AI establish the OS stack for future motorized home companions?"}], "quickJumpZh": [{"sec": "sec-00", "title": "00 执行摘要与 2026 换代总览", "sub": "HomeView $299 · A19 TV $299 · 正向硬件毛利铁律"}, {"sec": "sec-01", "title": "01 五维家居硬件矩阵与算力跃迁", "sub": "HomeView / Apple TV 4K A19 / mini 2 / Home Collection"}, {"sec": "sec-02", "title": "02 四大护城河支柱与生态雷达", "sub": "端侧隐私零广告 · iCloud+ 免月费安防 · 五维家居雷达"}, {"sec": "sec-03", "title": "03 全球智能家居竞品与 BOM 拆解", "sub": "对比 Amazon / Google / Sonos / 小米 · iFixit HomeView 拆解"}, {"sec": "sec-04", "title": "04 拒绝补贴单机经济与毛利推演", "sub": "Echo -24% 倒挂对比 · 交互式 5 年全屋硬件毛利测算"}, {"sec": "sec-05", "title": "05 十年客厅战略演进与关键战役", "sub": "初代 HomePod 复盘 → Matter 破冰 → 2026.10 总攻"}, {"sec": "sec-06", "title": "06 Apple Home 护城河核查清单", "sub": "6 项全屋智能渗透、安防搭售与合规解锁自测"}, {"sec": "sec-07", "title": "07 数据来源与拆解公告核验索引", "sub": "Apple Newsroom · SEC 8-K · iFixit · TechInsights"}], "quickJumpEn": [{"sec": "sec-00", "title": "00 Executive Summary & 2026 Reset", "sub": "HomeView $299 · A19 TV $299 · Positive-Margin Discipline"}, {"sec": "sec-01", "title": "01 Five-Pillar Lineup & A18/A19 Leap", "sub": "HomeView / Apple TV 4K A19 / mini 2 / Home Collection"}, {"sec": "sec-02", "title": "02 Four Moat Pillars & Home Radar", "sub": "Zero-Ad Local AI · Free iCloud+ Video · 5-Axis Radar"}, {"sec": "sec-03", "title": "03 Smart Home Peers & BOM Contrast", "sub": "vs. Amazon / Google / Sonos / Xiaomi · HomeView BOM"}, {"sec": "sec-04", "title": "04 Anti-Loss-Leader Economics & Sim", "sub": "Echo -24% Loss Contrast · 5-Year Gross Profit Simulator"}, {"sec": "sec-05", "title": "05 Ten-Year Living-Room Arc & Battles", "sub": "2018 HomePod → Matter Mesh → Oct 2026 AI Blitz"}, {"sec": "sec-06", "title": "06 Smart Home Moat Checklist", "sub": "6-Point Ambient Hub & Security Ecosystem Scorecard"}, {"sec": "sec-07", "title": "07 Primary Releases & Sources Index", "sub": "Apple Newsroom · SEC 8-K · iFixit · TechInsights"}]};
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_CHECK_KEY = CFG.checkStorageKey;

 var p0 = CFG.sim.presets[0];
 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { s1: true, s2: true, s3: true },
 peerFilter: 'all',
 peerQuery: '',
 epsSeries: { s1: true, s2: true },
 sim: { units: p0.units, baseAsp: p0.baseAsp, bomPct: p0.bomPct, mixBoost: p0.mixBoost, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 function safeGetStorage(key) {
 try { return window.localStorage.getItem(key); } catch (err) { return null; }
 }
 function safeSetStorage(key, val) {
 try { window.localStorage.setItem(key, val); } catch (err) {}
 }

 var toastTimer = null;
 function showToast(message) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = message;
 el.classList.add('show');
 if (toastTimer) clearTimeout(toastTimer);
 toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2800);
 }

 function isEn() { return state.lang === 'en'; }

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
 var v = CFG.ch1[state.ch1View];
 document.getElementById('ch1ChartTitle').textContent = isEn() ? v.title_en : v.title_zh;
 document.getElementById('ch1ChartSub').textContent = isEn() ? v.sub_en : v.sub_zh;
 }

 function syncCollapseButtonsText() {
 var btns = document.querySelectorAll('[data-collapse-target]');
 for (var i = 0; i < btns.length; i++) {
 var pid = btns[i].getAttribute('data-collapse-target');
 var panel = document.getElementById(pid);
 var open = panel && panel.classList.contains('open');
 if (isEn()) {
 btns[i].innerHTML = open ? '<span>Hide Tech &amp; Commercial Mechanics</span> <span>⌃</span>' : '<span>Show Tech &amp; Commercial Mechanics</span> <span>⌄</span>';
 } else {
 btns[i].innerHTML = open ? '<span>收起微观技术与商业机制</span> <span>⌃</span>' : '<span>展开微观技术与商业机制</span> <span>⌄</span>';
 }
 }
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.documentElement.setAttribute('data-lang', state.lang);
 document.title = en ? CFG.docTitleEn : CFG.docTitleZh;

 var zhBtn = document.getElementById('langZhBtn');
 var enBtn = document.getElementById('langEnBtn');
 if (zhBtn && enBtn) {
 zhBtn.classList.toggle('active', !en);
 enBtn.classList.toggle('active', en);
 zhBtn.setAttribute('aria-pressed', !en ? 'true' : 'false');
 enBtn.setAttribute('aria-pressed', en ? 'true' : 'false');
 }

 var textNodes = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
 for (var i = 0; i < textNodes.length; i++) {
 textNodes[i].textContent = en ? textNodes[i].getAttribute('data-i18n-en') : textNodes[i].getAttribute('data-i18n-zh');
 }

 var htmlNodes = document.querySelectorAll('[data-i18n-html-zh][data-i18n-html-en]');
 for (var j = 0; j < htmlNodes.length; j++) {
 htmlNodes[j].innerHTML = en ? htmlNodes[j].getAttribute('data-i18n-html-en') : htmlNodes[j].getAttribute('data-i18n-html-zh');
 }

 var phNodes = document.querySelectorAll('[data-i18n-ph-zh][data-i18n-ph-en]');
 for (var k = 0; k < phNodes.length; k++) {
 phNodes[k].setAttribute('placeholder', en ? phNodes[k].getAttribute('data-i18n-ph-en') : phNodes[k].getAttribute('data-i18n-ph-zh'));
 }

 var titleNodes = document.querySelectorAll('[data-i18n-title-zh][data-i18n-title-en]');
 for (var m = 0; m < titleNodes.length; m++) {
 titleNodes[m].setAttribute('title', en ? titleNodes[m].getAttribute('data-i18n-title-en') : titleNodes[m].getAttribute('data-i18n-title-zh'));
 }

 var pNote = document.getElementById('pillarFocusNote');
 if (pNote) {
 var notesArr = en ? CFG.pillarNotesEn : CFG.pillarNotesZh;
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
 showToast(state.theme === 'dark' ? (isEn() ? 'Switched to MUI Dark Obsidian Mode' : '已切换至 MUI 深海黑曜石护眼模式') : (isEn() ? 'Switched to MUI Crisp Light Mode' : '已切换至 MUI 浅色明亮阅读模式'));
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
 var activeRows = isEn() ? CFG.peerRowsEn : CFG.peerRowsZh;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = activeRows.filter(function (row, idx) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var zhR = CFG.peerRowsZh[idx] || row;
 var enR = CFG.peerRowsEn[idx] || row;
 var hay = (zhR.company + ' ' + zhR.leader + ' ' + zhR.col2 + ' ' + zhR.col3 + ' ' + zhR.col4 + ' ' + zhR.col5 + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.leader + ' ' + enR.col2 + ' ' + enR.verdict).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 if (badge) {
 badge.textContent = isEn()
 ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' ' + CFG.peerUnitLabelEn)
 : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' ' + CFG.peerUnitLabelZh);
 }
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching peers found. Try another keyword or reset filters.' : '未找到匹配的对比厂商记录，请尝试其他关键词或重置筛选条件。') + '</td></tr>';
 return;
 }
 var rawQ = state.peerQuery.trim();
 tbody.innerHTML = filtered.map(function (r) {
 return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
 '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
 '<td>' + highlightMatch(r.col2, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.col3, rawQ) + '</td>' +
 '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.col4, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.col5, rawQ) + '</td>' +
 '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
 '</tr>';
 }).join('');
 }

 function computeSimModel() {
 var sc = CFG.sim;
 var units = state.sim.units;
 var effectiveAsp = state.sim.baseAsp + (state.sim.mixBoost ? sc.mixAspDelta : 0);
 var effectiveBomPct = Math.max(20, Math.min(82, state.sim.bomPct + (state.sim.mixBoost ? sc.mixBomDelta : 0)));
 var gmPct = 100 - effectiveBomPct;
 /* unitsScale: if unit_divisor is 1000, units is in Millions -> $B; if unit_divisor is 1, units is in Thousands -> $M then /1000 -> $B */
 var annualRevB = (units * effectiveAsp) / sc.revDivisorToB;
 var annualGpB = annualRevB * (gmPct / 100);
 var gpPerUnit = effectiveAsp * (gmPct / 100);
 return {
 units: units,
 effectiveAsp: effectiveAsp,
 effectiveBomPct: effectiveBomPct,
 gmPct: gmPct,
 annualRevB: annualRevB,
 annualGpB: annualGpB,
 gpPerUnit: gpPerUnit
 };
 }

 function updateSimulatorUI() {
 var sc = CFG.sim;
 var m = computeSimModel();
 document.getElementById('simUnitsLabel').textContent = m.units + (isEn() ? sc.u_suffix_en : sc.u_suffix_zh);
 document.getElementById('simAspLabel').textContent = '$' + Math.round(state.sim.baseAsp).toLocaleString('en-US');
 document.getElementById('simBomLabel').textContent = state.sim.bomPct.toFixed(1) + '%';

 document.getElementById('simAnnualRevVal').textContent = '$' + m.annualRevB.toFixed(2) + 'B';
 document.getElementById('simAnnualGpVal').textContent = '$' + m.annualGpB.toFixed(2) + 'B · ' + m.gmPct.toFixed(1) + '%';
 document.getElementById('simPerUnitVal').textContent = '$' + Math.round(m.effectiveAsp).toLocaleString('en-US') + ' · $' + Math.round(m.gpPerUnit).toLocaleString('en-US') + (isEn() ? '/u' : '/台');

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
 var itemsList = isEn() ? CFG.checklistEn : CFG.checklistZh;
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
 '</div>' +
 '</label>';
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
 var rad = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h - rad);
 ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
 ctx.lineTo(x + rad, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
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
 ctx.fillStyle = pal.pillBg;
 roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5);
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

 /* Chart 1: Supports bar+line combo (mode='combo') or grouped bars (mode='grouped') */
 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartCh1 = [];
 var v = CFG.ch1[state.ch1View];
 var en = isEn();

 document.getElementById('ch1AxisMeta').innerHTML = en ? v.meta_html_en : v.meta_html_zh;
 document.getElementById('ch1Leg1').textContent = en ? v.leg1_en : v.leg1_zh;
 document.getElementById('ch1Leg2').textContent = en ? v.leg2_en : v.leg2_zh;

 var labels = en ? v.labels_en : v.labels_zh;
 var fullLabels = en ? v.full_en : v.full_zh;

 if (v.mode === 'combo') {
 var pad = { top: 28, right: 52, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;
 var s1 = v.s1, s2 = v.s2;
 var min1 = v.min1, max1 = v.max1, min2 = v.min2, max2 = v.max2;

 for (var g = 0; g <= 4; g++) {
 var r = g / 4;
 var gy = pad.top + ph - r * ph;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(pad.left, gy);
 ctx.lineTo(pad.left + pw, gy);
 ctx.stroke();

 ctx.font = '11px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick;
 ctx.textAlign = 'right';
 var t1 = min1 + r * (max1 - min1);
 ctx.fillText((v.s1_prefix || '') + t1.toFixed(v.s1_dec || 0) + (v.s1_suffix || ''), pad.left - 7, gy);

 ctx.fillStyle = pal.c2;
 ctx.textAlign = 'left';
 var t2 = min2 + r * (max2 - min2);
 var sign2 = (v.s2_signed && t2 > 0) ? '+' : '';
 ctx.fillText(sign2 + (v.s2_prefix || '') + t2.toFixed(v.s2_dec || 0) + (v.s2_suffix || ''), pad.left + pw + 7, gy);
 }

 var step = pw / labels.length;
 var barW = Math.min(44, Math.max(22, step * 0.42));
 var pts = [];

 for (var i = 0; i < labels.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (hoverState.chartCh1 === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 8);
 ctx.fill();
 }
 var val1Str = (v.s1_prefix || '') + s1[i].toFixed(v.s1_val_dec !== undefined ? v.s1_val_dec : 2) + (v.s1_suffix || '');
 var sgn = (v.s2_signed && s2[i] > 0) ? '+' : '';
 var val2Str = sgn + (v.s2_prefix || '') + s2[i].toFixed(v.s2_val_dec !== undefined ? v.s2_val_dec : 1) + (v.s2_suffix || '');

 if (state.ch1Series.s1) {
 var bh = Math.max(6, ((s1[i] - min1) / (max1 - min1)) * ph);
 var bx = cx - barW / 2;
 var by = pad.top + ph - bh;
 var bGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
 if (i === labels.length - 1) {
 bGrad.addColorStop(0, '#66B2FF');
 bGrad.addColorStop(1, '#0073E6');
 } else {
 bGrad.addColorStop(0, '#3399FF');
 bGrad.addColorStop(1, '#0059B2');
 }
 ctx.fillStyle = bGrad;
 topRoundedBar(ctx, bx, by, barW, bh, 6);
 ctx.fill();
 if (w >= 480 || i === 0 || i === labels.length - 1) {
 ctx.fillStyle = '#FFFFFF';
 ctx.font = '700 10px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 if (bh > 20) ctx.fillText(val1Str, cx, by + 15);
 }
 }

 var ly = pad.top + ph - ((s2[i] - min2) / (max2 - min2)) * ph;
 pts.push({ x: cx, y: ly, label: val2Str });

 ctx.fillStyle = i === labels.length - 1 ? pal.text : pal.tick;
 ctx.font = (i === labels.length - 1 ? '800 ' : '600 ') + '11.5px system-ui, sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(labels[i], cx, pad.top + ph + 22);

 hitRegions.chartCh1.push({
 idx: i,
 x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
 html: '<strong>' + escapeHtml(fullLabels[i]) + '</strong><br/>' +
 '• ' + escapeHtml(en ? v.leg1_en : v.leg1_zh) + '：<strong>' + val1Str + '</strong><br/>' +
 '• ' + escapeHtml(en ? v.leg2_en : v.leg2_zh) + '：<strong>' + val2Str + '</strong>'
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
 ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 6, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2;
 ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 4.2, 0, Math.PI * 2); ctx.fill();
 if (w >= 500 || n === 0 || n === pts.length - 1) {
 drawValueBadge(ctx, pts[n].label, pts[n].x, pts[n].y - 16, pal.c2, pal);
 }
 }
 }
 } else {
 var padG = { top: 28, right: 20, bottom: 44, left: 50 };
 var pwG = w - padG.left - padG.right;
 var phG = h - padG.top - padG.bottom;
 var g1 = v.s1, g2 = v.s2, maxG = v.max1;
 var subRow = en ? v.sub_row_en : v.sub_row_zh;

 for (var j = 0; j <= 4; j++) {
 var qVal = (maxG / 4) * j;
 var yGrid = padG.top + phG - (j / 4) * phG;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = 1;
 ctx.beginPath();
 ctx.moveTo(padG.left, yGrid);
 ctx.lineTo(padG.left + pwG, yGrid);
 ctx.stroke();
 ctx.fillStyle = pal.tick;
 ctx.font = '11px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'right';
 ctx.textBaseline = 'middle';
 ctx.fillText((v.s1_prefix || '') + qVal.toFixed(v.s1_dec || 0) + (v.s1_suffix || ''), padG.left - 8, yGrid);
 }

 var stepG = pwG / labels.length;
 var bW = Math.min(46, Math.max(22, stepG * 0.27));

 for (var k = 0; k < labels.length; k++) {
 var centerX = padG.left + stepG * (k + 0.5);
 if (hoverState.chartCh1 === k) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, padG.left + stepG * k + 6, padG.top, stepG - 12, phG, 8);
 ctx.fill();
 }
 var s1Txt = (v.s1_prefix || '') + g1[k].toFixed(v.s1_val_dec !== undefined ? v.s1_val_dec : 2) + (v.s1_suffix || '');
 var s2Txt = (v.s2_prefix || '') + g2[k].toFixed(v.s2_val_dec !== undefined ? v.s2_val_dec : 2) + (v.s2_suffix || '');

 if (state.ch1Series.s1) {
 var hA = Math.max(4, (g1[k] / maxG) * phG);
 var xA = state.ch1Series.s2 ? (centerX - bW - 4) : (centerX - bW / 2);
 var yA = padG.top + phG - hA;
 var grA = ctx.createLinearGradient(0, yA, 0, padG.top + phG);
 grA.addColorStop(0, '#3399FF'); grA.addColorStop(1, '#0066CC');
 ctx.fillStyle = grA;
 topRoundedBar(ctx, xA, yA, bW, hA, 6); ctx.fill();
 drawValueBadge(ctx, s1Txt, xA + bW / 2, yA - 12, pal.c1, pal);
 }
 if (state.ch1Series.s2) {
 var hB = Math.max(4, (g2[k] / maxG) * phG);
 var xB = state.ch1Series.s1 ? (centerX + 4) : (centerX - bW / 2);
 var yB = padG.top + phG - hB;
 var grB = ctx.createLinearGradient(0, yB, 0, padG.top + phG);
 grB.addColorStop(0, '#34D399'); grB.addColorStop(1, '#16A34A');
 ctx.fillStyle = grB;
 topRoundedBar(ctx, xB, yB, bW, hB, 6); ctx.fill();
 drawValueBadge(ctx, s2Txt, xB + bW / 2, yB - 12, pal.c2, pal);
 }

 ctx.fillStyle = pal.text;
 ctx.font = '700 12px system-ui, sans-serif';
 ctx.textAlign = 'center';
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(labels[k], centerX, padG.top + phG + 20);
 if (subRow && subRow[k]) {
 ctx.fillStyle = pal.c2;
 ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 ctx.fillText(subRow[k], centerX, padG.top + phG + 35);
 }

 hitRegions.chartCh1.push({
 idx: k,
 x: padG.left + stepG * k, y: padG.top, w: stepG, h: phG + 36,
 html: '<strong>' + escapeHtml(fullLabels[k]) + '</strong><br/>' +
 '• ' + escapeHtml(en ? v.leg1_en : v.leg1_zh) + '：<strong>' + s1Txt + '</strong><br/>' +
 '• ' + escapeHtml(en ? v.leg2_en : v.leg2_zh) + '：<strong>' + s2Txt + '</strong>' +
 (subRow && subRow[k] ? (' (' + escapeHtml(subRow[k]) + ')') : '')
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartRadar = [];
 var rc = CFG.radar;
 var en = isEn();
 var axes = en ? rc.axes_en : rc.axes_zh;
 var pillarAxisMap = [0, 1, 2, 3];
 var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarAxisMap[state.activePillar];

 var series = [
 { key: 's1', name: en ? rc.s1_en : rc.s1_zh, color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: rc.v1 },
 { key: 's2', name: en ? rc.s2_en : rc.s2_zh, color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: rc.v2 },
 { key: 's3', name: en ? rc.s3_en : rc.s3_zh, color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: rc.v3 }
 ];

 var cx = w / 2, cy = h / 2 + 8;
 var sidePad = w < 420 ? 88 : 108;
 var radius = Math.max(60, Math.min((w - sidePad * 2) / 2, h * 0.35));
 var total = axes.length;

 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid;
 ctx.lineWidth = ring === 10 ? 1.3 : 1;
 ctx.beginPath();
 for (var i = 0; i < total; i++) {
 var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
 var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.closePath(); ctx.stroke();
 ctx.fillStyle = pal.tick;
 ctx.font = '600 9.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
 ctx.fillText(String(ring), cx + 4, cy - r);
 }

 for (var a = 0; a < total; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
 var isHi = a === highlightedAxis;
 ctx.strokeStyle = isHi ? pal.c1 : pal.grid;
 ctx.lineWidth = isHi ? 1.8 : 1;
 ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();

 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
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
 html: '<strong>' + escapeHtml(axes[a]) + (en ? ' (10-Pt Scale)' : ' (10分制评估)') + '</strong><br/>' +
 '• ' + escapeHtml(series[0].name) + '：<strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>' +
 '• ' + escapeHtml(series[1].name) + '：<strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>' +
 '• ' + escapeHtml(series[2].name) + '：<strong>' + series[2].vals[a].toFixed(1) + '</strong>'
 });
 }

 for (var s = 0; s < series.length; s++) {
 var item = series[s];
 if (!state.radarSeries[item.key]) continue;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
 var dist = (item.vals[idx] / 10) * radius;
 var vx = cx + Math.cos(theta) * dist, vy = cy + Math.sin(theta) * dist;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath();
 ctx.fillStyle = item.fill; ctx.fill();
 ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();

 for (var pIdx = 0; pIdx < total; pIdx++) {
 var pTheta = -Math.PI / 2 + (pIdx * 2 * Math.PI) / total;
 var pDist = (item.vals[pIdx] / 10) * radius;
 var pX = cx + Math.cos(pTheta) * pDist, pY = cy + Math.sin(pTheta) * pDist;
 ctx.fillStyle = pal.pillBg;
 ctx.beginPath(); ctx.arc(pX, pY, 5.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = item.color;
 ctx.beginPath(); ctx.arc(pX, pY, 3.6, 0, Math.PI * 2); ctx.fill();
 }
 }
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartBars = [];
 var bc = CFG.bars;
 var en = isEn();
 var items = en ? bc.items_en : bc.items_zh;
 var maxX = bc.maxX || 60;

 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 4; g++) {
 var xVal = (maxX / 4) * g;
 var gx = pad.left + (g / 4) * pw;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = g === 0 ? 'left' : (g === 4 ? 'right' : 'center');
 ctx.textBaseline = 'alphabetic';
 ctx.fillText(Math.round(xVal) + '%', gx, pad.top + ph + 18);
 }

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
 var bw = Math.max(8, (items[i].val / maxX) * pw);

 ctx.fillStyle = pal.text;
 ctx.font = '600 ' + (w < 460 ? '11px' : '12px') + ' system-ui, sans-serif';
 ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
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
 roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();

 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
 barGrad.addColorStop(0, items[i].cStart); barGrad.addColorStop(1, items[i].cEnd);
 ctx.fillStyle = barGrad;
 roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();

 hitRegions.chartBars.push({
 idx: i,
 x: pad.left, y: rowTop, w: pw, h: rowH,
 html: '<strong>' + escapeHtml(items[i].label) + '：' + valStr + '</strong><br/>• ' +
 (en ? 'Cost Basis: ' : '拆解基准：') + escapeHtml(items[i].sub) + '<br/>• ' +
 (en ? 'Insight: ' : '产业链解读：') + escapeHtml(items[i].note)
 });
 }
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartEps = [];
 var cc = CFG.combo;
 var en = isEn();
 var periods = en ? cc.labels_en : cc.labels_zh;
 var subLabels = en ? cc.subs_en : cc.subs_zh;
 var s1 = cc.s1, s2 = cc.s2;
 var min1 = cc.min1, max1 = cc.max1, min2 = cc.min2, max2 = cc.max2;

 var pad = { top: 26, right: 52, bottom: 44, left: 50 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 4; g++) {
 var ratio = g / 4;
 var gy = pad.top + ph - ratio * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();

 var t1 = min1 + ratio * (max1 - min1);
 var t2 = min2 + ratio * (max2 - min2);
 ctx.font = '11px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right';
 ctx.fillText((cc.s1_prefix || '') + t1.toFixed(cc.s1_dec || 0) + (cc.s1_suffix || ''), pad.left - 7, gy);
 ctx.textAlign = 'left'; ctx.fillStyle = pal.c2;
 ctx.fillText((cc.s2_prefix || '') + t2.toFixed(cc.s2_dec || 1) + (cc.s2_suffix || ''), pad.left + pw + 7, gy);
 }

 if (cc.refLine2 !== undefined) {
 var refY = pad.top + ph - ((cc.refLine2 - min2) / (max2 - min2)) * ph;
 ctx.save();
 ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(pad.left, refY); ctx.lineTo(pad.left + pw, refY); ctx.stroke();
 ctx.restore();
 if (w >= 460) {
 drawValueBadge(ctx, en ? cc.ref_badge_en : cc.ref_badge_zh, pad.left + pw * 0.26, Math.max(pad.top + 12, refY - 12), pal.c3, pal);
 }
 }

 var step = pw / periods.length;
 var barW = Math.min(46, Math.max(24, step * 0.42));
 var linePts = [];

 for (var i = 0; i < periods.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (hoverState.chartEps === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 6);
 ctx.fill();
 }
 var v1Txt = (cc.s1_prefix || '') + s1[i].toFixed(cc.s1_val_dec !== undefined ? cc.s1_val_dec : 0) + (cc.s1_suffix || '');
 var v2Txt = (cc.s2_prefix || '') + s2[i].toFixed(cc.s2_val_dec !== undefined ? cc.s2_val_dec : 1) + (cc.s2_suffix || '');

 if (state.epsSeries.s1) {
 var bh = Math.max(6, ((s1[i] - min1) / (max1 - min1)) * ph);
 var bx = cx - barW / 2, by = pad.top + ph - bh;
 var eGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
 if (i === periods.length - 1) { eGrad.addColorStop(0, '#66B2FF'); eGrad.addColorStop(1, '#1985F1'); }
 else { eGrad.addColorStop(0, '#3399FF'); eGrad.addColorStop(1, '#0066CC'); }
 ctx.fillStyle = eGrad;
 topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
 ctx.fillStyle = '#FFFFFF';
 ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 if (bh > 20) ctx.fillText(v1Txt, cx, by + 16);
 }

 var sy = pad.top + ph - ((s2[i] - min2) / (max2 - min2)) * ph;
 linePts.push({ x: cx, y: sy, txt: v2Txt });

 ctx.fillStyle = pal.text;
 ctx.font = '700 11.5px system-ui, sans-serif';
 ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(periods[i], cx, pad.top + ph + 19);
 if (subLabels && subLabels[i]) {
 ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif';
 ctx.fillText(subLabels[i], cx, pad.top + ph + 33);
 }

 hitRegions.chartEps.push({
 idx: i,
 x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
 html: '<strong>' + escapeHtml(periods[i]) + (subLabels && subLabels[i] ? (' ' + escapeHtml(subLabels[i])) : '') + '</strong><br/>' +
 '• ' + escapeHtml(en ? cc.leg1_en : cc.leg1_zh) + '：<strong>' + v1Txt + '</strong><br/>' +
 '• ' + escapeHtml(en ? cc.leg2_en : cc.leg2_zh) + '：<strong>' + v2Txt + '</strong>'
 });
 }

 if (state.epsSeries.s2) {
 ctx.save(); drawSmoothLine(ctx, linePts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
 for (var m = 0; m < linePts.length; m++) {
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 6, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, linePts[m].txt, linePts[m].x, linePts[m].y - 16, pal.c2, pal);
 }
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h;
 var pal = getPalette();
 hitRegions.chartSim = [];

 var m = computeSimModel();
 var yrs = 5;
 var growth = CFG.sim.annualGrowthRate || 0.03;
 var revSeries = [], gpSeries = [];
 for (var y = 0; y <= yrs; y++) {
 if (y === 0) { revSeries.push(0); gpSeries.push(0); }
 else {
 var factor = Math.pow(1 + growth, y - 1);
 revSeries.push(revSeries[y - 1] + m.annualRevB * factor);
 gpSeries.push(gpSeries[y - 1] + m.annualGpB * factor);
 }
 }

 var fiveEl = document.getElementById('simFiveYrVal');
 if (fiveEl) fiveEl.textContent = '$' + gpSeries[yrs].toFixed(2) + 'B';

 var maxVal = Math.max(revSeries[yrs], 1.0) * 1.12;
 var pad = { top: 20, right: 20, bottom: 28, left: 58 };
 var pw = w - pad.left - pad.right;
 var ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g;
 var gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 var lbl = v >= 1000 ? ('$' + (v / 1000).toFixed(2) + 'T') : (v >= 10 ? ('$' + Math.round(v) + 'B') : ('$' + v.toFixed(1) + 'B'));
 ctx.fillText(lbl, pad.left - 7, gy);
 }

 var stepX = pw / yrs;
 ctx.save();
 ctx.setLineDash([5, 4]); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.4;
 ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var gxPos = pad.left + (i / yrs) * pw;
 var gyPos = pad.top + ph - (gpSeries[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(gxPos, gyPos); else ctx.lineTo(gxPos, gyPos);
 }
 ctx.stroke(); ctx.restore();

 ctx.beginPath();
 for (var j = 0; j <= yrs; j++) {
 var tx = pad.left + (j / yrs) * pw;
 var ty = pad.top + ph - (revSeries[j] / maxVal) * ph;
 if (j === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);

 hitRegions.chartSim.push({
 idx: j,
 x: tx - Math.max(10, stepX * 0.5), y: pad.top, w: Math.max(20, stepX), h: ph + 24,
 html: (isEn()
 ? ('<strong>Year ' + j + ' Cumulative Trajectory</strong><br/>• Cumulative Segment Revenue: <strong>$' + revSeries[j].toFixed(2) + 'B</strong><br/>• Cumulative Hardware Gross Profit: <strong style="color:#22C55E;">$' + gpSeries[j].toFixed(2) + 'B</strong><br/>• Implied Gross Margin: <strong>' + m.gmPct.toFixed(1) + '%</strong>')
 : ('<strong>第 ' + j + ' 年累计产出对比</strong><br/>• 累计产品线净营收：<strong>$' + revSeries[j].toFixed(2) + 'B</strong><br/>• 累计创造硬件毛利润：<strong style="color:#22C55E;">$' + gpSeries[j].toFixed(2) + 'B</strong><br/>• 隐含硬件毛利率：<strong>' + m.gmPct.toFixed(1) + '%</strong>'))
 });
 }
 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.8; ctx.stroke();
 ctx.lineTo(pad.left + pw, pad.top + ph); ctx.lineTo(pad.left, pad.top + ph); ctx.closePath();
 var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
 grad.addColorStop(0, 'rgba(0, 115, 230, 0.28)'); grad.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
 ctx.fillStyle = grad; ctx.fill();

 if (hoverState.chartSim >= 0 && hoverState.chartSim <= yrs) {
 var hi = hoverState.chartSim;
 var hx = pad.left + (hi / yrs) * pw;
 var hy1 = pad.top + ph - (revSeries[hi] / maxVal) * ph;
 var hy2 = pad.top + ph - (gpSeries[hi] / maxVal) * ph;
 ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = pal.c1; ctx.lineWidth = 1.2;
 ctx.beginPath(); ctx.moveTo(hx, pad.top); ctx.lineTo(hx, pad.top + ph); ctx.stroke(); ctx.restore();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(hx, hy2, 4.5, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c1; ctx.beginPath(); ctx.arc(hx, hy1, 5.5, 0, Math.PI * 2); ctx.fill();
 }

 for (var ky = 0; ky <= yrs; ky++) {
 var kx = pad.left + (ky / yrs) * pw;
 var kyR = pad.top + ph - (revSeries[ky] / maxVal) * ph;
 var kyG = pad.top + ph - (gpSeries[ky] / maxVal) * ph;
 ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(kx, kyR, 4.8, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c1; ctx.beginPath(); ctx.arc(kx, kyR, 3.3, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(kx, kyG, 3.2, 0, Math.PI * 2); ctx.fill();
 }

 var endX = pad.left + pw;
 var endRevY = pad.top + ph - (revSeries[yrs] / maxVal) * ph;
 var endGpY = pad.top + ph - (gpSeries[yrs] / maxVal) * ph;
 var endRevLbl = revSeries[yrs] >= 1000 ? ('$' + (revSeries[yrs] / 1000).toFixed(2) + 'T') : ('$' + revSeries[yrs].toFixed(1) + 'B');
 drawValueBadge(ctx, endRevLbl, Math.min(w - 40, endX - 24), Math.max(pad.top + 12, endRevY - 14), pal.c1, pal);
 drawValueBadge(ctx, 'GP $' + gpSeries[yrs].toFixed(1) + 'B', Math.min(w - 48, endX - 30), Math.max(pad.top + 32, endGpY - 14), pal.c2, pal);

 ctx.fillStyle = pal.tick;
 ctx.font = '10.5px "IBM Plex Mono", sans-serif';
 ctx.textBaseline = 'alphabetic';
 ctx.textAlign = 'left'; ctx.fillText(isEn() ? 'Year 0' : '第 0 年', pad.left, pad.top + ph + 19);
 ctx.textAlign = 'center'; ctx.fillText((isEn() ? 'Year 3' : '第 3 年') + ' ($' + revSeries[3].toFixed(1) + 'B)', pad.left + (3 / yrs) * pw, pad.top + ph + 19);
 ctx.textAlign = 'right'; ctx.fillText(isEn() ? 'Year 5' : '第 5 年', pad.left + pw, pad.top + ph + 19);
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
 var mx = clientX - rect.left, my = clientY - rect.top;
 var regions = hitRegions[canvasId] || [];
 var found = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { found = r; break; }
 }
 var nextIdx = found && typeof found.idx === 'number' ? found.idx : -1;
 if (hoverState[canvasId] !== nextIdx) {
 hoverState[canvasId] = nextIdx;
 if (redrawMap[canvasId]) redrawMap[canvasId]();
 }
 if (found) {
 tip.innerHTML = found.html;
 tip.style.display = 'block';
 var tipW = tip.offsetWidth || 250, tipH = tip.offsetHeight || 72;
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
 canvas.addEventListener('touchstart', function (e) { if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
 canvas.addEventListener('mouseleave', function () {
 if (hoverState[canvasId] !== -1) { hoverState[canvasId] = -1; if (redrawMap[canvasId]) redrawMap[canvasId](); }
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
 link.download = CFG.filename;
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast((isEn() ? 'Exported standalone file: ' : '已导出独立网页 ') + CFG.filename);
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
 if (Array.isArray(parsed) && parsed.length === CFG.checklistZh.length) state.checks = parsed.map(Boolean);
 } catch (e) {}
 }

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });

 document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
 document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
 void 0;
 void 0;
 void 0;
 void 0;

 var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
 for (var t = 0; t < tocLinks.length; t++) tocLinks[t].addEventListener('click', closeMobileDrawer);

 var jumpInput = document.getElementById('quickJumpInput');
 var jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase();
 var activeJump = isEn() ? CFG.quickJumpEn : CFG.quickJumpZh;
 var list = activeJump.filter(function (item, idx) {
 var zhIt = CFG.quickJumpZh[idx] || item;
 var enIt = CFG.quickJumpEn[idx] || item;
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
 var secEl = document.getElementById(btn.getAttribute('data-jump-sec'));
 if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) {
 if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open');
 });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
 else if (e.key === 'Escape') { jumpPop.classList.remove('open'); closeMobileDrawer(); }
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
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? CFG.pillarNotesEn : CFG.pillarNotesZh)[idx] + '</div>';
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

 var uSlider = document.getElementById('simUnitsSlider');
 var aSlider = document.getElementById('simAspSlider');
 var bSlider = document.getElementById('simBomSlider');
 var mToggle = document.getElementById('simMixToggle');

 uSlider.addEventListener('input', function () { state.sim.units = parseFloat(this.value) || p0.units; state.sim.preset = ''; updateSimulatorUI(); });
 aSlider.addEventListener('input', function () { state.sim.baseAsp = parseFloat(this.value) || p0.baseAsp; state.sim.preset = ''; updateSimulatorUI(); });
 bSlider.addEventListener('input', function () { state.sim.bomPct = parseFloat(this.value) || p0.bomPct; state.sim.preset = ''; updateSimulatorUI(); });
 mToggle.addEventListener('change', function () { state.sim.mixBoost = !!this.checked; updateSimulatorUI(); });

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var pb = 0; pb < presetBtns.length; pb++) {
 presetBtns[pb].addEventListener('click', function () {
 var key = this.getAttribute('data-preset');
 var idx = parseInt(key.replace('p', ''), 10) - 1;
 var pr = CFG.sim.presets[idx];
 if (!pr) return;
 state.sim.units = pr.units;
 state.sim.baseAsp = pr.baseAsp;
 state.sim.bomPct = pr.bomPct;
 state.sim.mixBoost = pr.mixBoost;
 state.sim.preset = key;
 uSlider.value = String(pr.units);
 aSlider.value = String(pr.baseAsp);
 bSlider.value = String(pr.bomPct);
 mToggle.checked = pr.mixBoost;
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
 showToast(isEn() ? 'Checked all 6 moat diagnostic criteria' : '已勾选全部 6 项产品力护城河核查指标');
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
 for (var i = 0; i < tocLinks.length; i++) tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === id);
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
 if (!state.epsSeries.s1 && !state.epsSeries.s2) state.epsSeries[ek] = true;
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
 if (mainEl) { var ro = new ResizeObserver(scheduleRedraw); ro.observe(mainEl); }
 }
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 