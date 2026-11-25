
 (function () {
 'use strict';

 var CFG = {"filename": "AirPods_Product_Analysis.html", "checkStorageKey": "mui_airpods_moat_checks_v1", "docTitleZh": "Apple AirPods 声学穿戴产品力、H2 计算音频与千亿商业模式深度研究报告 | 数据中心", "docTitleEn": "Apple AirPods Acoustic Computing, H2 Silicon & $100B Revenue Moat Deep Dive | Research Hub", "ch1": {"tabA_zh": "视图A: 六年出货量与年化营收", "tabA_en": "View A: 6-Yr Units & Revenue", "tabB_zh": "视图B: 销量份额 vs 营收份额剪刀差", "tabB_en": "View B: Unit vs. Revenue Share Gap", "viewA": {"mode": "combo", "title_zh": "2021–2026E AirPods 全球年出货量 (M副) 与独立估算年营收 ($B) 演进轨迹", "title_en": "2021–2026E Global AirPods Shipments (M Units) & Standalone Revenue ($B) Trajectory", "sub_zh": "成熟期每年稳健出货 75M–82M+ 副（含智能音频口径），贡献约 $19B–$23B 高确定性年化现金流", "sub_en": "Sustains 75M–82M+ annual smart-audio shipments at maturity, generating ~$19B–$23B in recurring hardware revenue", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 左轴：全球年出货量 (百万副)</span><span style=\"color:var(--chart-c2);\">● 右轴：独立年化营收规模 ($B)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ Left Axis: Annual Shipments (M Units)</span><span style=\"color:var(--chart-c2);\">● Right Axis: Standalone Revenue ($B)</span>", "leg1_zh": "AirPods 全球年出货量 (M副 · 左轴)", "leg1_en": "Global Annual AirPods Shipments (M · Left)", "leg2_zh": "AirPods 独立年化营收估算 ($B · 右轴)", "leg2_en": "Estimated Standalone Revenue ($B · Right)", "labels_zh": ["2021", "2022", "2023", "2024", "2025", "2026E"], "labels_en": ["2021", "2022", "2023", "2024", "2025", "2026E"], "full_zh": ["2021 (AirPods 3 换代)", "2022 (AirPods Pro 2 爆发)", "2023 (USB-C Pro 2 稳态)", "2024 (AirPods 4 双版齐发)", "2025 (AirPods Pro 3 首发)", "2026E (Max 2 + AirPods 5 破千亿)"], "full_en": ["2021 (AirPods 3 Launch)", "2022 (AirPods Pro 2 Surge)", "2023 (USB-C Pro 2)", "2024 (AirPods 4 Refresh)", "2025 (AirPods Pro 3 Launch)", "2026E (Max 2 + AirPods 5 >$100B)"], "s1": [78.0, 82.0, 75.5, 81.8, 78.5, 81.0], "s2": [18.5, 20.8, 19.2, 21.4, 22.0, 22.5], "min1": 50, "max1": 95, "min2": 14, "max2": 26, "s1_prefix": "", "s1_suffix": "M", "s1_dec": 0, "s1_val_dec": 1, "s2_prefix": "$", "s2_suffix": "B", "s2_dec": 0, "s2_val_dec": 1, "s2_signed": false}, "viewB": {"mode": "grouped", "title_zh": "2026 全球 TWS 市场四大头部厂商：出货量份额 (%) vs 行业营收份额 (%) 剪刀差", "title_en": "2026 Global TWS Top-4 Vendors: Unit Share (%) vs. Global Revenue Share (%) Gap", "sub_zh": "数据综合 Omdia 2Q26 / SAG 1Q26：苹果以约 21%–23% 销量统治 44%–50% 行业总营收，白牌与百元机仅分食销量", "sub_en": "Per Omdia 2Q26 & SAG 1Q26: AirPods turns 21%–23% unit share into 44%–50% of global TWS dollars", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 全球 TWS 出货量市场份额 (%)</span><span style=\"color:var(--chart-c2);\">■ 全球 TWS 销售额营收份额 (%)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ Global TWS Unit Share (%)</span><span style=\"color:var(--chart-c2);\">■ Global TWS Revenue Share (%)</span>", "leg1_zh": "全球 TWS 出货量份额 (%)", "leg1_en": "Global TWS Unit Share (%)", "leg2_zh": "全球 TWS 营收价值份额 (%)", "leg2_en": "Global TWS Revenue Share (%)", "labels_zh": ["Apple AirPods", "Xiaomi 小米", "Samsung 三星", "Huawei 华为"], "labels_en": ["Apple AirPods", "Xiaomi", "Samsung", "Huawei"], "full_zh": ["Apple AirPods (不含 Beats 8%)", "小米 Redmi/Xiaomi Buds (#2 销量)", "三星 Galaxy Buds4 系列 (#3)", "华为 FreeBuds / FreeClip 开放式"], "full_en": ["Apple AirPods (Excl. 8% Beats)", "Xiaomi / Redmi Buds (#2 Units)", "Samsung Galaxy Buds4 (#3)", "Huawei FreeBuds / FreeClip OWS"], "s1": [21.5, 10.4, 6.7, 5.2], "s2": [46.0, 5.5, 8.8, 5.8], "sub_row_zh": ["2.1x 价值倍率", "$25 走量为主", "旗舰 Buds4 对冲", "FreeClip 高溢价"], "sub_row_en": ["2.1x Value Mult", "Sub-$30 Volume", "Buds4 Pro Mix", "FreeClip OWS Lift"], "max1": 52.0, "s1_prefix": "", "s1_suffix": "%", "s1_dec": 0, "s1_val_dec": 1, "s2_prefix": "", "s2_suffix": "%", "s2_val_dec": 1}}, "radar": {"title_zh": "全球主流真无线与旗舰音频品牌五维竞争力雷达图（10分制评估）", "title_en": "5-Axis Global TWS & Personal Audio Brand Competitiveness Radar (10-Point Scale)", "axes_zh": ["跨设备无感切换与防丢", "主动降噪与通透自然度", "医疗助听与运动健康传感", "单品毛利率与复购粘性", "跨安卓高清蓝牙编码开放度"], "axes_en": ["Ecosystem Handoff & Find My", "ANC & Natural Transparency", "Clinical Hearing & Biosensors", "Gross Margin & Repeat Rate", "Cross-Android Hi-Res Codecs"], "s1_zh": "Apple AirPods (Pro 3 / AirPods 5)", "s1_en": "Apple AirPods (Pro 3 / AirPods 5)", "s2_zh": "传统声学旗舰 (Sony XM6 / Bose QC2)", "s2_en": "Acoustic Peers (Sony XM6 / Bose QC2)", "s3_zh": "手机厂 TWS (Samsung Buds4 / Xiaomi)", "s3_en": "Phone OEM TWS (Samsung / Xiaomi)", "v1": [9.9, 9.6, 9.8, 9.7, 5.8], "v2": [7.0, 9.7, 6.5, 7.8, 9.5], "v3": [8.4, 8.5, 7.6, 7.2, 8.9]}, "bars": {"title_zh": "AirPods Pro 3 (型号 A3063 · 纯物料 ~$55.5 / 落地 ~$62.5) BOM 成本拆解占比（%）", "title_en": "AirPods Pro 3 (Model A3063 · ~$55.5 Pure BOM / ~$62.5 Landed) Component Share (%)", "sub_zh": "数据核验自 TechInsights A3063 深度拆解、Lumafield 工业 CT 扫描及 iFixit 内部电芯与光学模组分析", "sub_en": "Verified via TechInsights A3063 teardown, Lumafield industrial CT scan & iFixit battery/PPG analysis", "chip_zh": "纯 BOM ~$55.5 · 仅占 $249 零售价 22.3%", "chip_en": "Pure BOM ~$55.5 · Just 22.3% of $249 MSRP", "leg1_zh": "蓝色/绿色：Apple H2 SiP + 二代 UWB 查找芯片组与声学/256Hz 红外心率传感模组", "leg1_en": "Blue / Green: Apple H2 SiP + UWB Gen 2 Silicon & Custom Acoustic + 256Hz IR PPG Sensors", "leg2_zh": "紫色/琥珀色：IP57 精密壳体柔性电路板与简化单电芯 MagSafe 充电盒电池组", "leg2_en": "Purple / Amber: IP57 Precision Enclosure/FPC & Simplified Single-Cell MagSafe Case Battery", "maxX": 42, "items_zh": [{"label": "Apple H2 定制音频 SiP (双耳) + 充电盒二代 UWB 超宽带与电源管理芯片", "val": 35.1, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "~$19.50 (占纯物料 35.1%)", "note": "采用先进 BGA 紧凑高密封装且无需外挂高价 LPDDR5X 大内存，完全免疫 2026 存储涨价"}, {"label": "IP57 多孔声学精密腔体、多层立体折叠 FPC 软硬结合板与 MagSafe 磁铁", "val": 27.9, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$15.50 (泡棉复合耳塞 + 密封壳体)", "note": "极高密度点胶密封在达成 IP57 防水防汗的同时也导致 0/10 不可拆修"}, {"label": "定制低失真动圈单元 + 6 颗高信噪比 MEMS 麦克风 + 256Hz 红外 PPG 心率传感器", "val": 25.8, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "~$14.30 (新增红外光电脉搏波模组)", "note": "仅增加数美元光学传感器 BOM 即解锁运动心率监测与 $249 旗舰差异化溢价"}, {"label": "双耳微型纽扣锂电池 + 充电盒优化单电芯 (1.334 Wh) 与无线充电线圈", "val": 11.2, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "~$6.20 (盒内双电芯简化为单电芯)", "note": "iFixit 实拆证实 Pro 3 充电盒由双并联电芯改为单颗 1.334Wh 电芯，进一步精简成本"}], "items_en": [{"label": "Apple H2 Audio SiP (Dual Buds) + Case UWB Gen 2 & PMIC Silicon", "val": 35.1, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "~$19.50 (35.1% of pure BOM)", "note": "Compact BGA SiP uses zero costly LPDDR5X DRAM—fully insulating AirPods from 2026 memory inflation"}, {"label": "IP57 Multi-Port Acoustic Housing, Rigid-Flex FPCs & MagSafe Array", "val": 27.9, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$15.50 (5-size foam tips + IP57 seals)", "note": "Precision glue sealing achieves IP57 water/dust resistance while resulting in 0/10 repairability"}, {"label": "Custom Low-Distortion Drivers, 6 High-SNR MEMS Mics & 256Hz IR PPG Sensor", "val": 25.8, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "~$14.30 (adds invisible IR PPG module)", "note": "A few dollars of optical biosensor BOM unlocks workout heart-rate tracking and $249 Pro pricing"}, {"label": "Dual Earbud Micro-Cells + Simplified Single-Cell Case Battery (1.334 Wh)", "val": 11.2, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "~$6.20 (consolidated to single case cell)", "note": "iFixit confirmed Apple consolidated Pro 2's twin case cells into one 1.334 Wh cell on Pro 3"}]}, "combo": {"title_zh": "2024–2026 全球个人智能音频格局：AirPods 季度/半年度出货份额 (%) vs 全球营收份额 (%)", "title_en": "2024–2026 Global TWS Trajectory: AirPods Unit Share (%) vs. Global Revenue Share (%)", "sub_zh": "柱状图（左轴）为 AirPods 全球纯 TWS 出货量份额；折线（右轴）为 AirPods 占全球 TWS 市场总营收比重", "sub_en": "Bars (left axis): AirPods global pure-TWS unit share (%); Line (right axis): AirPods global TWS revenue share (%)", "chip_zh": "2026 累计历史销售额正式跨过 $100B", "chip_en": "Surpassed $100B Cumulative Sales in 2026", "left_axis_zh": "■ 左轴：AirPods 全球 TWS 销量份额 (%)", "left_axis_en": "■ Left Axis: AirPods Global TWS Unit Share (%)", "right_axis_zh": "● 右轴：AirPods 全球 TWS 营收份额 (%)", "right_axis_en": "● Right Axis: AirPods Global TWS Revenue Share (%)", "leg1_zh": "AirPods 全球纯 TWS 出货量份额 (左轴 · %)", "leg1_en": "AirPods Global Pure-TWS Unit Share (Left · %)", "leg2_zh": "AirPods 全球 TWS 营收价值份额 (右轴 · %)", "leg2_en": "AirPods Global TWS Revenue Share (Right · %)", "ref_chip_zh": "--- 40.0% 绝对价值统治线", "ref_chip_en": "--- 40.0% Value Dominance Floor", "labels_zh": ["2024 全年", "2025 Q3", "2026 Q1", "2026 Q2"], "labels_en": ["FY 2024", "Q3 2025", "Q1 2026", "Q2 2026"], "subs_zh": ["(AirPods 4 上市)", "(Pro 3 首发冲高)", "(SAG 口径+Max 2)", "(AirPods 5 发布前夕)"], "subs_en": ["(AirPods 4 Launch)", "(Pro 3 Debut Surge)", "(SAG + Max 2 Launch)", "(Pre-AirPods 5 Wait)"], "s1": [23.1, 20.0, 23.0, 20.5], "s2": [40.0, 50.0, 44.0, 43.5], "min1": 12, "max1": 30, "min2": 32.0, "max2": 54.0, "s1_prefix": "", "s1_suffix": "%", "s1_dec": 0, "s1_val_dec": 1, "s2_prefix": "", "s2_suffix": "%", "s2_dec": 0, "s2_val_dec": 1, "refLine2": 40.0, "ref_badge_zh": "40% 营收统治线", "ref_badge_en": "40% Revenue Floor"}, "sim": {"title_zh": "AirPods 产品线五年营收与净硬件毛利推演测算器", "title_en": "AirPods 5-Year Segment Revenue & Net Gross Profit Simulator", "toggle_title_zh": "激活 Pro 3 助听器与 Max 2 高端结构溢价 (+$32 综合出厂均价 ASP)", "toggle_title_en": "Enable Pro 3 Hearing Aid & Max 2 Mix Boost (+$32 Blended ASP)", "toggle_sub_zh": "模拟 Pro 3 占比超 50% 及 AppleCare+ / 单耳补购对综合 ASP 与净毛利率的拉升", "toggle_sub_en": "Models >50% AirPods Pro 3 mix + AppleCare+ / replacement buds lifting blended ASP & GM%", "u_label_zh": "年均 AirPods 出货量 (Million Units)", "u_label_en": "Annual AirPods Shipments (Million Units)", "u_min": 60, "u_max": 110, "u_step": 1, "u_suffix_zh": "M 副", "u_suffix_en": "M Units", "a_label_zh": "基础批发含渠道折扣均价 ASP (USD)", "a_label_en": "Base Wholesale Net ASP (USD)", "a_min": 145, "a_max": 260, "a_step": 5, "b_label_zh": "含 BOM、渠道折让与质保换新总成本率 (%)", "b_label_en": "All-In BOM, Channel & Warranty Swap Ratio (%)", "b_min": 42, "b_max": 60, "b_step": 0.5, "revDivisorToB": 1000.0, "mixAspDelta": 32, "mixBomDelta": -2.5, "annualGrowthRate": 0.025, "stat1_zh": "年化 AirPods 独立净营收", "stat1_en": "Annualized AirPods Net Revenue", "stat2_zh": "年化硬件毛利润 / 净 GAAP 毛利率", "stat2_en": "Annual Gross Profit / Net GAAP GM%", "stat3_zh": "综合出厂 ASP / 单副净毛利", "stat3_en": "Blended Net ASP / Profit per Unit", "stat4_zh": "5 年累计创造声学毛利现金池", "stat4_en": "5-Year Cumulative Gross Profit Pool", "presets": [{"label_zh": "① 2026 破千亿稳态基准 (Pro 3 + AirPods 5)", "label_en": "① 2026 $100B Milestone Baseline", "tag_zh": "82M副 · ~$22.5B营收", "tag_en": "82M · ~$22.5B Rev", "units": 82, "baseAsp": 242, "bomPct": 51.5, "mixBoost": true}, {"label_zh": "② 助听器破圈 + 存量换新高峰情景", "label_en": "② Hearing-Aid & IR-Camera Upgrade Bull", "tag_zh": "94M副 · 高端放量", "tag_en": "94M · Pro Upswing", "units": 94, "baseAsp": 248, "bomPct": 49.5, "mixBoost": true}, {"label_zh": "③ OWS 开放式分流 + $129 入门占比上升", "label_en": "③ OWS Competition + $129 Entry Shift", "tag_zh": "74M副 · 均价下移", "tag_en": "74M · Entry Mix", "units": 74, "baseAsp": 205, "bomPct": 54.0, "mixBoost": false}]}, "pillarNotesZh": ["<strong>当前选中支柱解读（01 系统级无缝协同）：</strong>第三方蓝牙耳机受限于标准多点连接协议，无法复刻 AirPods 在来电抢占、Mac 视频会议与 Vision Pro 无损空间音频间的毫秒级无感流转 <a class=\"cite-link\" href=\"https://www.apple.com/airpods/\" target=\"_blank\" rel=\"noopener noreferrer\">Apple Continuity ↗</a>。", "<strong>当前选中支柱解读（02 计算音频壁垒）：</strong>H2 SiP 将定制低失真驱动单元、高动态范围放大器与超低功耗神经网络融为一体，兼顾 8 小时小体积降噪续航与自然通透感 <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/09/apple-introduces-airpods-5-with-best-in-class-open-ear-active-noise-cancellation/\" target=\"_blank\" rel=\"noopener noreferrer\">H2 Open-Ear ANC ↗</a>。", "<strong>当前选中支柱解读（03 医疗健康扩圈）：</strong>传统处方助听器均价 $1,500–$4,000 且存在病耻感，AirPods Pro 3 以 $249 时尚外观实现临床级对话增强与听力保护 <a class=\"cite-link\" href=\"https://www.fda.gov/news-events/press-announcements/fda-authorizes-first-over-counter-hearing-aid-software\" target=\"_blank\" rel=\"noopener noreferrer\">FDA Clinical Approval ↗</a>。", "<strong>当前选中支柱解读（04 准耗材复购经济）：</strong>不同于 4–5 年才换机的平板与电脑，真无线耳机每日充放使存量老用户每 3 年集中回流升级新一代 Pro 或数字系列 <a class=\"cite-link\" href=\"https://www.ifixit.com/News/113507/airpods-pro-3-teardown-still-a-tragedy\" target=\"_blank\" rel=\"noopener noreferrer\">Lifecycle Dynamics ↗</a>。"], "pillarNotesEn": ["<strong>Selected Pillar (01 · OS-Level Continuity):</strong> Third-party Bluetooth multipoint cannot match Apple's kernel-level audio handoff across iPhone calls, Mac meetings, and Vision Pro <a class=\"cite-link\" href=\"https://www.apple.com/airpods/\" target=\"_blank\" rel=\"noopener noreferrer\">Apple Continuity ↗</a>.", "<strong>Selected Pillar (02 · Computational Audio):</strong> H2 co-designs custom drivers, amplifiers, and neural voice isolation to achieve 8h ANC in a 5.5g earbud <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/09/apple-introduces-airpods-5-with-best-in-class-open-ear-active-noise-cancellation/\" target=\"_blank\" rel=\"noopener noreferrer\">H2 Open-Ear ANC ↗</a>.", "<strong>Selected Pillar (03 · Clinical Health Expansion):</strong> Disrupts $1,500–$4,000 traditional hearing aids with stigma-free $249 clinical-grade amplification <a class=\"cite-link\" href=\"https://www.fda.gov/news-events/press-announcements/fda-authorizes-first-over-counter-hearing-aid-software\" target=\"_blank\" rel=\"noopener noreferrer\">FDA Clinical Approval ↗</a>.", "<strong>Selected Pillar (04 · Semi-Consumable Cycle):</strong> Daily charge cycles create a steady ~3-year upgrade cadence across Apple's >550M cumulative AirPods base <a class=\"cite-link\" href=\"https://www.ifixit.com/News/113507/airpods-pro-3-teardown-still-a-tragedy\" target=\"_blank\" rel=\"noopener noreferrer\">Lifecycle Dynamics ↗</a>."], "peerRowsZh": [{"category": "g1", "benchmark": true, "company": "研究基准：Apple AirPods", "leader": "AirPods Pro 3 / AirPods 5 / Max 2", "col2": "自研 H2 (48kHz 计算音频) + UWB Gen 2 + 256Hz 红外心率传感器", "col3": "26Q1 23.0% (含 Beats 31%) · 26Q2 20.5% (16.8M 副, #1)", "col4": "$129 / $149 / $249 / $549 · 独占全球 44%–50% TWS 营收", "col5": "FDA De Novo 临床级助听器 + 50+ 运动心率 + Siri AI 实时同传", "verdict": "绝对价值霸主：单品牌拿走行业近半营收池，iOS 零感切换与临床助听器构筑极高壁垒。", "sourceLabel": "Omdia & SAG", "sourceUrl": "https://www.nasdaq.com/press-release/omdia-ows-shipments-grow-12-tws-market-remains-broadly-flat-2q26-2026-09-17"}, {"category": "g1", "benchmark": false, "company": "索尼音频 (Sony Audio)", "leader": "WF-1000XM6 (2026.02) / WH-1000XM6", "col2": "HD 降噪处理器 QN3e + 集成处理器 V2 + 8 麦克风 + LDAC 高解析编码", "col3": "高端 $250+ 独立发烧降噪前三（总体出货份额 <3%）", "col4": "入耳 XM6 $329.99 (涨 $30) / 头戴 XM6 $449.99", "col5": "发烧级音质调校与跨安卓/iOS 兼容性，无心率或 FDA 助听认证", "verdict": "纯声学标杆：比 AirPods Pro 3 贵 $80 且支持 LDAC，但在 iOS 生态联动与医疗健康功能上不及苹果。", "sourceLabel": "Sony Official", "sourceUrl": "https://electronics.sony.com/audio/headphones/truly-wireless-earbuds/p/wf1000xm6-b"}, {"category": "g1", "benchmark": false, "company": "三星电子 (Samsung Galaxy Buds)", "leader": "Galaxy Buds4 ($179) / Buds4 Pro ($249.99)", "col2": "双路功放 (11mm 低音 + 平面高音) + Bluetooth 6.1 + UWB 查找", "col3": "2026Q2 全球出货份额 6.7% (全球第 3)", "col4": "$179.99–$249.99，三星手机捆绑促销推升高端占比", "col5": "深度绑定 Galaxy AI 实时同传与头部姿态控制，限三星机满血体验", "verdict": "安卓阵营最强生态对手：24-bit/96kHz 音质出色，但对 iPhone 存量用户几乎无跨生态吸引力。", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/us/samsung-unveils-galaxy-buds4-series-best-hi-fi-sound-enhanced-comfort-fit/"}, {"category": "g1", "benchmark": false, "company": "博士音响 (Bose Corporation)", "leader": "QC Ultra Earbuds Gen 2 ($299) / Headphones Gen 2", "col2": "CustomTune 耳道声场自校准 + AI SpeechClarity 通话降噪", "col3": "北美 $250+ 高端航空差旅降噪核心挑战者", "col4": "入耳 $299 / 头戴 $449 (较 AirPods Max 2 便宜 $100)", "col5": "极致低频消噪与佩戴舒适度，此前退出自营 OTC 助听器转守消费声学", "verdict": "差旅消噪名宿：头戴式轻便度优于 386g 的 AirPods Max 2，但入耳体积偏大且缺乏自研计算芯片。", "sourceLabel": "Bose Pressroom", "sourceUrl": "https://www.bose.com/pressroom/bose-announces-the-quietcomfort-ultra-earbuds-2nd-gen"}, {"category": "g2", "benchmark": false, "company": "小米集团 (Xiaomi / Redmi Buds)", "leader": "Xiaomi Buds 5 Pro Wi-Fi (€219.99) / Redmi Buds 6", "col2": "高通 S7 Pro XPAN 4.2Mbps Wi-Fi 无损音频 + 哈曼联合调音", "col3": "2026Q2 全球出货份额 10.4% (稳居全球第 2)", "col4": "走量主力 $18–$45 Redmi 系列，旗舰冲击 €200 档", "col5": "独立内置录音转写与小米澎湃 OS 跨端流转", "verdict": "全球销量亚军：靠百元级 Redmi 耳机横扫新兴市场，但整体均价仅为 AirPods 的约六分之一。", "sourceLabel": "Xiaomi Global", "sourceUrl": "https://www.mi.com/global/product/xiaomi-buds-5-pro/"}, {"category": "g2", "benchmark": false, "company": "华为 & 韶音 (Huawei FreeClip / Shokz OWS)", "leader": "Huawei FreeClip 2 耳夹式 / Shokz OpenFit 2+", "col2": "C 形桥镍钛记忆合金耳夹 / 双单元骨气导开放式声学 (OWS)", "col3": "OWS 赛道 26Q2 同比 +12% 达 11.1M 副 (Shokz 占 OWS 10.3% #1)", "col4": "$179–$229 中高端运动与全天无感办公新兴增长极", "col5": "完全不入耳道零胀痛、全天候环境感知，成为唯一两位数增长子赛道", "verdict": "形态创新奇兵：开放式耳夹与耳挂分流部分长时间佩戴人群，促使苹果以 AirPods 5 半入耳降噪防御。", "sourceLabel": "Omdia OWS Report", "sourceUrl": "https://www.nasdaq.com/press-release/omdia-ows-shipments-grow-12-tws-market-remains-broadly-flat-2q26-2026-09-17"}], "peerRowsEn": [{"category": "g1", "benchmark": true, "company": "Benchmark: Apple AirPods", "leader": "AirPods Pro 3 / AirPods 5 / Max 2", "col2": "In-house H2 (48kHz DSP) + UWB Gen 2 + 256Hz IR PPG heart-rate sensor", "col3": "1Q26: 23.0% (31% w/ Beats) · 2Q26: 20.5% (16.8M units, #1)", "col4": "$129 / $149 / $249 / $549 · Commands 44%–50% of global TWS revenue", "col5": "FDA De Novo OTC Hearing Aid + 50+ workout HR + Siri AI Live Translation", "verdict": "Unmatched value leader: captures nearly half of industry dollars via iOS lock-in and clinical hearing features.", "sourceLabel": "Omdia & SAG", "sourceUrl": "https://www.nasdaq.com/press-release/omdia-ows-shipments-grow-12-tws-market-remains-broadly-flat-2q26-2026-09-17"}, {"category": "g1", "benchmark": false, "company": "Sony Audio", "leader": "WF-1000XM6 (Feb 2026) / WH-1000XM6", "col2": "HD Noise Canceling QN3e + Integrated Processor V2 + 8 mics + LDAC", "col3": "Top-3 audiophile $250+ ANC leader (<3% total unit share)", "col4": "WF-1000XM6 $329.99 (+$30 hike) / WH-1000XM6 $449.99", "col5": "Reference acoustic tuning & cross-platform LDAC; lacks PPG HR or FDA SaMD", "verdict": "Audiophile benchmark: $80 pricier than Pro 3 with Hi-Res LDAC, but lacks iOS continuity and clinical hearing tools.", "sourceLabel": "Sony Official", "sourceUrl": "https://electronics.sony.com/audio/headphones/truly-wireless-earbuds/p/wf1000xm6-b"}, {"category": "g1", "benchmark": false, "company": "Samsung Electronics (Galaxy Buds)", "leader": "Galaxy Buds4 ($179) / Buds4 Pro ($249.99)", "col2": "2-way woofer + planar tweeter + Bluetooth 6.1 + UWB Find", "col3": "2Q26: 6.7% global TWS unit share (Global #3)", "col4": "$179.99–$249.99, lifted by flagship Galaxy smartphone bundles", "col5": "Galaxy AI Live Interpreter & head gestures (full features gated to Samsung)", "verdict": "Strongest Android ecosystem peer: 24-bit/96kHz fidelity shines on Galaxy, zero pull on iPhone owners.", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/us/samsung-unveils-galaxy-buds4-series-best-hi-fi-sound-enhanced-comfort-fit/"}, {"category": "g1", "benchmark": false, "company": "Bose Corporation", "leader": "QC Ultra Earbuds Gen 2 ($299) / Headphones Gen 2", "col2": "CustomTune ear-canal calibration + AI SpeechClarity voice isolation", "col3": "Core North American $250+ travel & aviation ANC rival", "col4": "Earbuds $299 / Over-ear $449 ($100 below AirPods Max 2)", "col5": "Class-leading low-frequency attenuation & comfort; exited direct OTC hearing aids", "verdict": "Travel ANC icon: lighter over-ear build than 386g Max 2, but bulkier buds and no custom ecosystem silicon.", "sourceLabel": "Bose Pressroom", "sourceUrl": "https://www.bose.com/pressroom/bose-announces-the-quietcomfort-ultra-earbuds-2nd-gen"}, {"category": "g2", "benchmark": false, "company": "Xiaomi Corp (Xiaomi / Redmi Buds)", "leader": "Xiaomi Buds 5 Pro Wi-Fi (€219.99) / Redmi Buds 6", "col2": "Qualcomm S7 Pro XPAN 4.2Mbps Wi-Fi lossless audio + Harman tuning", "col3": "2Q26: 10.4% global TWS unit share (Global #2)", "col4": "Volume anchored in $18–$45 Redmi SKUs; flagship €219.99", "col5": "Built-in voice recorder transcription & HyperOS multi-device handoff", "verdict": "Global #2 unit volume player: dominates emerging markets, though blended ASP is ~1/6th of AirPods.", "sourceLabel": "Xiaomi Global", "sourceUrl": "https://www.mi.com/global/product/xiaomi-buds-5-pro/"}, {"category": "g2", "benchmark": false, "company": "Huawei & Shokz (OWS Open-Ear)", "leader": "Huawei FreeClip 2 / Shokz OpenFit 2+", "col2": "Ni-Ti C-bridge clip-on & dual-pitch open-ear acoustic drivers (OWS)", "col3": "OWS grew +12% YoY in 2Q26 to 11.1M units (13.5% of TWS; Shokz #1 at 10.3%)", "col4": "$179–$229 fast-growing athletic & all-day comfort tier", "col5": "Zero ear-canal occlusion for marathon comfort and situational awareness", "verdict": "Fastest-growing form factor threat: clip/hook OWS surge directly spurred Apple's open-ear ANC push on AirPods 5.", "sourceLabel": "Omdia OWS Report", "sourceUrl": "https://www.nasdaq.com/press-release/omdia-ows-shipments-grow-12-tws-market-remains-broadly-flat-2q26-2026-09-17"}], "peerUnitLabelZh": "家核心音频品牌", "peerUnitLabelEn": "Audio Competitors", "checklistZh": [{"tag": "44%–50% 营收统治", "title": "1. 全球价值池垄断测试：是否持续拿走全球 TWS 市场逾四成总营收？", "desc": "在百元安卓耳机与白牌冲量下，AirPods 能否维持 ~2.8x 批发均价并占据 44%–50% 行业销售额？"}, {"tag": "Pro 3 >50% 占比", "title": "2. 高端产品结构测试：AirPods Pro 3 与 Max 2 是否稳占过半营收？", "desc": "$249 Pro 3 与 $549 Max 2 能否抵御 $129/$149 AirPods 5 下沉带来的内部结构稀释？"}, {"tag": "FDA 助听与心率", "title": "3. 医疗与生物传感测试：临床助听器与耳内心率是否拓展新客群？", "desc": "5 分钟听力测试、临床级对话增强与 256Hz 红外心率能否吸引非传统音乐发烧友的增量购买？"}, {"tag": "半入耳 ANC 防御", "title": "4. 开放式形态防御测试：AirPods 5 能否遏制耳夹/耳挂 OWS 分流？", "desc": "标配 1.5 倍半入耳降噪的 AirPods 5 能否有效留住排斥入耳硅胶耳塞的长时间佩戴用户？"}, {"tag": "~$62.5 低 BOM 纪律", "title": "5. 零存储敞口毛利测试：GAAP 净毛利率是否稳定锚定 45%–54%？", "desc": "在计提节假日零售折让与 1 年质保换新成本后，越南/印度供应链能否守住近半毛利率？"}, {"tag": "红外视觉与 AI 演进", "title": "6. 下一代多模态传感储备：耳内 Siri AI 与未来红外空间感知是否领先？", "desc": "实时语音翻译、点头交互及后续与 Apple Intelligence 视觉感知的协同能否开启新一轮换机潮？"}], "checklistEn": [{"tag": "44%–50% Rev Share", "title": "1. Value-Pool Dominance Test: Does AirPods capture >40% of global TWS dollars?", "desc": "Despite sub-$30 Android volume, does AirPods sustain ~2.8x wholesale ASP and 44%–50% global revenue share?"}, {"tag": "Pro 3 >50% Mix", "title": "2. Premium Tier Mix Test: Do Pro 3 ($249) & Max 2 ($549) drive >50% of sales?", "desc": "Does clinical hearing + 2x ANC keep buyers stepping up to $249 Pro 3 alongside $129/$149 AirPods 5?"}, {"tag": "FDA SaMD & PPG", "title": "3. Clinical & Biometric Adoption Test: Are Hearing Aid & 256Hz HR expanding TAM?", "desc": "Do FDA OTC Hearing Aid software and workout PPG heart-rate sensing unlock new health & aging demographics?"}, {"tag": "OWS Defense", "title": "4. Open-Ear Defense Test: Does AirPods 5 blunt clip/hook OWS defection?", "desc": "Does standard open-ear ANC at $129/$149 retain users who dislike silicone ear-canal tips?"}, {"tag": "~$62.5 Landed Cost", "title": "5. Margin Discipline Test: Does net GAAP gross margin hold at 45%–54%?", "desc": "After holiday promos and swap warranty accruals, does DRAM-free Vietnam/India ODM keep margins near ~50%?"}, {"tag": "In-Ear AI Roadmap", "title": "6. Multimodal AI Evolution Test: Do Live Translation & Siri AI spur upgrades?", "desc": "Does hands-free voice translation and deep Apple Intelligence integration shorten the ~3-year upgrade cycle?"}], "quickJumpZh": [{"sec": "sec-00", "title": "00 执行摘要与千亿里程碑", "sub": "累计破 $100B · 年营收 ~$22.5B · Pro 3 ~$62.5 落地成本"}, {"sec": "sec-01", "title": "01 全系 H2 在售矩阵与降维卡位", "sub": "AirPods Pro 3 ($249) / AirPods 5 ($129/$149) / Max 2 ($549)"}, {"sec": "sec-02", "title": "02 四大护城河支柱与声学雷达", "sub": "iCloud 零感切换 · 48kHz 计算音频 · FDA 助听 · 五维雷达"}, {"sec": "sec-03", "title": "03 全球 TWS 竞争格局与 BOM 拆解", "sub": "对比索尼 XM6 / 三星 / Bose / 小米 / OWS · A3063 拆解"}, {"sec": "sec-04", "title": "04 耗材型单机经济与毛利推演", "sub": "2.8x 均价倍率 · 3年电池复购 · 交互式 5 年毛利测算"}, {"sec": "sec-05", "title": "05 十年计算音频演进与关键战役", "sub": "取消 3.5mm 接口 → FDA 批文 → $129 半入耳降噪清场"}, {"sec": "sec-06", "title": "06 AirPods 声学护城河核查清单", "sub": "6 项真无线耳机价值垄断与健康扩圈自测"}, {"sec": "sec-07", "title": "07 数据来源与拆解研报核验索引", "sub": "Apple Newsroom · Counterpoint · Omdia · TechInsights"}], "quickJumpEn": [{"sec": "sec-00", "title": "00 Executive Summary & $100B KPIs", "sub": ">$100B Lifetime Sales · ~$22.5B/yr · ~$62.5 Pro 3 Cost"}, {"sec": "sec-01", "title": "01 All-H2 Lineup & ANC Ladder", "sub": "AirPods Pro 3 ($249) / AirPods 5 ($129/$149) / Max 2 ($549)"}, {"sec": "sec-02", "title": "02 Four Moat Pillars & Audio Radar", "sub": "iCloud Handoff · 48kHz H2 DSP · FDA Hearing · 5-Axis Radar"}, {"sec": "sec-03", "title": "03 Global TWS Peers & Pro 3 BOM", "sub": "vs. Sony XM6 / Samsung / Bose / Xiaomi / OWS · A3063 BOM"}, {"sec": "sec-04", "title": "04 Consumable Economics & Profit Sim", "sub": "2.8x ASP Multiplier · 3-Yr Cycle · 5-Year Gross Profit Sim"}, {"sec": "sec-05", "title": "05 Ten-Year Audio Evolution & Battles", "sub": "Removing 3.5mm Jack → FDA SaMD → $129 Open-Ear ANC"}, {"sec": "sec-06", "title": "06 TWS Moat Diagnostic Checklist", "sub": "6-Point Acoustic & Biosensing Moat Scorecard"}, {"sec": "sec-07", "title": "07 Primary Teardowns & Sources Index", "sub": "Apple Newsroom · Counterpoint · Omdia · TechInsights"}]};
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
 