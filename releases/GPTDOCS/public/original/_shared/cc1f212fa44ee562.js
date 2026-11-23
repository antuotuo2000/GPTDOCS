
 (function () {
 'use strict';

 var CFG = {"filename": "Apple_Vision_Pro_Product_Analysis.html", "checkStorageKey": "mui_vision_moat_checks_v1", "docTitleZh": "Apple Vision Pro 空间计算产品力、M5+R1 硅基双芯与 B2B 商业模式深度研究报告 | 数据中心", "docTitleEn": "Apple Vision Pro Spatial Computing, M5+R1 Dual Silicon & Enterprise Moat Deep Dive | Research Hub", "ch1": {"tabA_zh": "视图A: 销量与高单价营收轨迹", "tabA_en": "View A: Shipments & Revenue Arc", "tabB_zh": "视图B: M2 初代 vs M5 拆解成本对比", "tabB_en": "View B: M2 vs. M5 Subsystem BOM ($)", "viewA": {"mode": "combo", "title_zh": "2024–2027E Apple Vision Pro 年度出货量 (千台) 与硬件估算营收 ($M) 演进", "title_en": "2024–2027E Apple Vision Pro Annual Shipments (K Units) & Est. Hardware Revenue ($M)", "sub_zh": "经历 2024 首销脉冲与 2025 换代前消化后，依托 ~75% B2B 政企复购与 $3,699+ 高单价步入稳态专业工具轨道", "sub_en": "Following 2024's early-adopter wave and 2025 transition, M5 + B2B fleet orders anchor steady high-ASP workstation sales", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 左轴：年度出货量 (千台 / K Units)</span><span style=\"color:var(--chart-c2);\">● 右轴：年度硬件估算营收 ($M 百万美元)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ Left Axis: Annual Shipments (K Units)</span><span style=\"color:var(--chart-c2);\">● Right Axis: Est. Annual Revenue ($M)</span>", "leg1_zh": "年度全球出货量 (千台 · 左轴)", "leg1_en": "Annual Global Shipments (K Units · Left)", "leg2_zh": "年度硬件含选配估算营收 ($M · 右轴)", "leg2_en": "Est. Annual Hardware Revenue ($M · Right)", "labels_zh": ["2024", "2025", "2026E", "2027E"], "labels_en": ["2024", "2025", "2026E", "2027E"], "full_zh": ["2024 (M2 初代首销脉冲)", "2025 (10月前等 M5 换代过渡)", "2026E (M5 全年 + B2B 接管 + 6月提价)", "2027E (外科医疗/航空规模化部署)"], "full_en": ["2024 (M2 Launch Wave)", "2025 (Pre-M5 Transition Year)", "2026E (Full-Yr M5 + B2B Expansion)", "2027E (Enterprise Fleet Scaling)"], "s1": [390, 85, 165, 220], "s2": [1420, 310, 640, 880], "min1": 0, "max1": 460, "min2": 0, "max2": 1650, "s1_prefix": "", "s1_suffix": "K", "s1_dec": 0, "s1_val_dec": 0, "s2_prefix": "$", "s2_suffix": "M", "s2_dec": 0, "s2_val_dec": 0, "s2_signed": false}, "viewB": {"mode": "grouped", "title_zh": "TechInsights 实拆两代硬件对账：初代 M2 版 vs 新款 M5 版四大核心子系统 BOM ($)", "title_en": "TechInsights Teardown Comparison: Gen-1 (M2) vs. New M5 Vision Pro Subsystem BOM ($)", "sub_zh": "120Hz 索尼硅基 OLED (+$252) 与 16GB 存储 (+$36) 显著涨价，而电池与头带声学工程降本 (-$96) 予以对冲", "sub_en": "120Hz Sony Micro-OLED (+$252) & 16GB DRAM/NAND (+$36) jumped, partially offset by -$96 battery/strap savings", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 初代 Vision Pro (M2 · 2024) 子系统 BOM ($)</span><span style=\"color:var(--chart-c2);\">■ 新款 Vision Pro (M5 · 2026拆解) 子系统 BOM ($)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ Gen-1 M2 Vision Pro Subsystem BOM ($)</span><span style=\"color:var(--chart-c2);\">■ New M5 Vision Pro Subsystem BOM ($)</span>", "leg1_zh": "初代 M2 版实拆成本 ($)", "leg1_en": "Gen-1 M2 Teardown Cost ($)", "leg2_zh": "新款 M5 版实拆成本 ($)", "leg2_en": "New M5 Teardown Cost ($)", "labels_zh": ["双硅基OLED+外屏", "主芯片+R1双芯", "16GB内存+256G闪存", "外置电池+音频带"], "labels_en": ["Micro-OLED+EyeSight", "M-Chip + R1 Duo", "16GB RAM+256G NAND", "Battery + Audio Strap"], "full_zh": ["双 1.42\" 索尼硅基 OLED + EyeSight 显示总成", "主处理器 (M2→M5 $159.41) + R1 ($106.95)", "16GB LPDDR5 内存 + 256GB 铠侠闪存颗粒", "外置铝壳电池包 + 双空间音频头带模组"], "full_en": ["Dual 1.42\" Sony Micro-OLED + Lenticular EyeSight", "Main SoC (M2→M5 $159.41) + R1 ($106.95)", "16GB Micron LPDDR5 + 256GB Kioxia NAND", "External Battery Pack + Spatial Audio Straps"], "s1": [864.4, 240.0, 56.2, 170.5], "s2": [1116.9, 266.4, 92.5, 74.8], "sub_row_zh": ["120Hz涨 +29.2%", "3nm M5 +11.0%", "存储暴涨 +64.5%", "精简降本 -56.1%"], "sub_row_en": ["120Hz +29.2%", "3nm M5 +11.0%", "DRAM Hike +64.5%", "Engineered -56.1%"], "max1": 1300, "s1_prefix": "$", "s1_suffix": "", "s1_dec": 0, "s1_val_dec": 1, "s2_prefix": "$", "s2_suffix": "", "s2_val_dec": 1}}, "radar": {"title_zh": "全球主流空间计算（XR）与智能眼镜阵营五维能力雷达图（10分制评估）", "title_en": "5-Axis Global Spatial Computing & XR Headwear Competitiveness Radar (10-Point Scale)", "axes_zh": ["微显示清晰度与透视低延迟", "企业医疗/工业 B2B 生态深度", "桌面生产力与跨端协同能力", "单台硬件毛利率与定价权", "全天轻便佩戴与大众价格亲和"], "axes_en": ["Micro-OLED Clarity & 12ms Latency", "Enterprise / Medical B2B Depth", "Desktop Productivity & Continuity", "Unit Gross Margin & ASP Power", "Lightweight Comfort & Mass Price"], "s1_zh": "Apple Vision Pro (M5 + R1)", "s1_en": "Apple Vision Pro (M5 + R1)", "s2_zh": "Samsung Galaxy XR ($1,799)", "s2_en": "Samsung Galaxy XR ($1,799)", "s3_zh": "Meta Quest 3 / 3S (大众娱乐)", "s3_en": "Meta Quest 3 / 3S (Consumer VR)", "v1": [9.9, 9.7, 9.6, 9.3, 3.8], "v2": [9.1, 7.2, 7.5, 7.6, 5.5], "v3": [6.8, 5.2, 6.4, 4.2, 8.9]}, "bars": {"title_zh": "Apple Vision Pro (M5 256GB · 含组装 ~$1,820 BOM) 硬件成本拆解占比（%）", "title_en": "Apple Vision Pro (M5 256GB · ~$1,820 Est. BOM w/ Assembly) Cost Share (%)", "sub_zh": "数据严格核验自 TechInsights 2026-09-11 M5 实拆报告（$1,116.88 显示总成 + $266.36 双芯 + $92.50 存储）及立讯精密组装基准", "sub_en": "Verified from TechInsights' Sept 11, 2026 M5 teardown ($1,116.88 displays, $266.36 silicon, $92.50 memory) + Luxshare assembly", "chip_zh": "双索尼 120Hz 硅基屏独吞 >61% BOM", "chip_en": "Dual 120Hz Sony Displays Take >61% of BOM", "leg1_zh": "绿色/蓝色：索尼 120Hz 双硅基 Micro-OLED + EyeSight 显示总成与 M5 + R1 空间计算双芯", "leg1_en": "Green / Blue: Dual 120Hz Sony Micro-OLED + EyeSight Subsystems & M5 + R1 Silicon Duo", "leg2_zh": "紫色/琥珀色：12 摄像头+LiDAR+铝合金曲面前框组装、16GB 存储及降本后的外置电池头带", "leg2_en": "Purple / Amber: 12-Cam/LiDAR/Aluminum Frame Assembly, 16GB DRAM+NAND & Optimized Battery/Strap", "maxX": 68, "items_zh": [{"label": "双 1.42\" 索尼 120Hz 硅基 Micro-OLED 内屏 + 柱状透镜 EyeSight 外屏与 Pancake 光学总成", "val": 61.4, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "$1,116.88 (较初代 M2 的 $864.40 上涨 +29.2%)", "note": "TechInsights 实测：单这一项显示子系统成本已接近两台全套 Meta Quest 3 零售价，决定了头显不可能廉价化"}, {"label": "Apple M5 主处理器 ($159.41) + R1 专用实时传感器协处理器 ($106.95)", "val": 14.6, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "$266.36 (台积电 3nm M5 + 专用 12ms R1)", "note": "双苹果自研大芯片提供桌面工作站级光追算力与零眩晕传感器融合"}, {"label": "12 颗光学/红外摄像头 + LiDAR + 3D 层压曲面玻璃铝合金机身与立讯精密组装", "val": 14.8, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$269.50 (多轴光学标定 + ~$130 复杂整机组装)", "note": "包含 4 颗眼动红外相机、6 颗外向追踪相机与极高难度多传感器出厂空间标定"}, {"label": "16GB 美光 LPDDR5 统一内存 + 256GB 铠侠 NAND 闪存颗粒", "val": 5.1, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "$92.50 (较 M2 版的 $56.24 暴涨 +64.5%)", "note": "2026 存储涨价潮叠加上游光学提价，直接推动苹果于 2026 年 6 月上调售价 $200–$300"}, {"label": "外置铝合金编织电源包 + 空间音频扬声器双圈钨配重头带模组", "val": 4.1, "cStart": "#38BDF8", "cEnd": "#0284C7", "sub": "$74.78 (较初代 $170.47 大幅精简降本 -56.1%)", "note": "通过精妙工程重构在不牺牲音质与续航前提下单机省下 $95.69 成本"}], "items_en": [{"label": "Dual 1.42\" Sony 120Hz Micro-OLED Displays, EyeSight OLED & Pancake Optics", "val": 61.4, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "$1,116.88 (up +29.2% from $864.40 on M2)", "note": "TechInsights: the display subsystem alone costs nearly 2x an entire Meta Quest 3—setting a hard MSRP floor"}, {"label": "12 Tracking/IR Cameras, LiDAR, 3D Laminated Glass/Aluminum Frame & Assembly", "val": 14.8, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$269.50 (multi-camera calibration + ~$130 assembly)", "note": "Includes 4 IR eye-tracking cameras, TrueDepth, LiDAR, and precision Luxshare optical calibration"}, {"label": "Apple M5 Main Processor ($159.41) + R1 Real-Time Sensor Chip ($106.95)", "val": 14.6, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "$266.36 (TSMC 3nm M5 + dedicated 12ms R1)", "note": "Delivers workstation ray tracing alongside dedicated 12ms photon-to-photon sensor fusion"}, {"label": "16GB Micron LPDDR5 Unified Memory + 256GB Kioxia NAND Flash", "val": 5.1, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "$92.50 (jumped +64.5% vs. $56.24 on M2)", "note": "Memory inflation + 120Hz Micro-OLED costs prompted June 2026's +$200–$300 MSRP adjustment"}, {"label": "External Aluminum Battery Pack & Tungsten Dual Knit Spatial Audio Straps", "val": 4.1, "cStart": "#38BDF8", "cEnd": "#0284C7", "sub": "$74.78 (slashed -56.1% from $170.47 on M2)", "note": "Aggressive value engineering saved $95.69 per headset while improving counterweight comfort"}]}, "combo": {"title_zh": "全球四大空间计算设备单机经济学分野：官方起售价 ($) vs 单机物料占售价比 BOM/MSRP (%)", "title_en": "Global XR Unit Economics Contrast: Starting MSRP ($) vs. Hardware BOM-to-MSRP Ratio (%)", "sub_zh": "柱状图（左轴）为各代表头显起售价；折线（右轴）为 BOM 占零售价比例（Quest 3 高达 ~85%+ 贴成本卖，Vision Pro 约 49%）", "sub_en": "Bars (left axis): Starting MSRP ($); Line (right axis): Est. BOM % of MSRP (~85%+ subsidized VR vs. ~49% on Vision Pro)", "chip_zh": "2026.06 提价稳守 ~50% 硬件毛利空间", "chip_en": "June 2026 Hike Preserves ~50% Gross Margin", "left_axis_zh": "■ 左轴：官方起售零售价 ($)", "left_axis_en": "■ Left Axis: Official Starting MSRP ($)", "right_axis_zh": "● 右轴：硬件 BOM 占零售价比重 (%)", "right_axis_en": "● Right Axis: Est. BOM as % of MSRP (%)", "leg1_zh": "各代表 XR 头显官方起售价 (左轴 · $)", "leg1_en": "Representative XR Headset Starting MSRP (Left · $)", "leg2_zh": "硬件物料与组装占售价比 BOM/MSRP (右轴 · %)", "leg2_en": "Est. BOM + Assembly % of MSRP (Right · %)", "ref_chip_zh": "--- 55.0% 苹果健康硬件成本上限", "ref_chip_en": "--- 55.0% Healthy Hardware BOM Ceiling", "labels_zh": ["Meta Quest 3S", "Meta Quest 3", "Samsung Galaxy XR", "Vision Pro (M5)"], "labels_en": ["Meta Quest 3S", "Meta Quest 3", "Samsung Galaxy XR", "Vision Pro (M5)"], "subs_zh": ["($349 菲涅尔走量)", "($599 涨$100止血)", "($1,799 半价挑战)", "($3,699 正毛利旗舰)"], "subs_en": ["($349 Fresnel VR)", "($599 Post-$100 Hike)", "($1,799 Android XR)", "($3,699 B2B Flagship)"], "s1": [350, 600, 1799, 3699], "s2": [88.0, 82.0, 61.0, 49.2], "min1": 0, "max1": 4200, "min2": 35.0, "max2": 98.0, "s1_prefix": "$", "s1_suffix": "", "s1_dec": 0, "s1_val_dec": 0, "s2_prefix": "", "s2_suffix": "%", "s2_dec": 0, "s2_val_dec": 1, "refLine2": 55.0, "ref_badge_zh": "55% 成本红线", "ref_badge_en": "55% BOM Ceiling"}, "sim": {"title_zh": "Apple Vision Pro 空间工作站五年营收与毛利推演测算器", "title_en": "Apple Vision Pro 5-Year Enterprise Revenue & Gross Profit Simulator", "toggle_title_zh": "计入 512GB/1TB 大容量、AppleCare+ ($499) 与蔡司/手柄企业选配 (+$340 均价)", "toggle_title_en": "Include 512GB/1TB Storage, $499 AppleCare+ & Enterprise Accessories (+$340 ASP)", "toggle_sub_zh": "模拟 ~75% 政企与专业机构采购大容量配置、开发者带及高毛利维保服务带来的 ARPU 增厚", "toggle_sub_en": "Simulates ~75% enterprise fleet orders attaching higher storage, AppleCare+, ZEISS inserts & controllers", "u_label_zh": "年均 Vision Pro 出货量 (千台 / Thousand Units)", "u_label_en": "Annual Vision Pro Shipments (Thousand Units / K)", "u_min": 80, "u_max": 600, "u_step": 10, "u_suffix_zh": "K 台", "u_suffix_en": "K Units", "a_label_zh": "主机基础成交均价 ASP (USD)", "a_label_en": "Base Host Headset ASP (USD)", "a_min": 3500, "a_max": 4200, "a_step": 50, "b_label_zh": "含 $1,117 硅基屏与组装硬件 BOM 成本率 (%)", "b_label_en": "Micro-OLED, Dual-Silicon & Assembly BOM Ratio (%)", "b_min": 42, "b_max": 62, "b_step": 0.5, "revDivisorToB": 1000000.0, "mixAspDelta": 340, "mixBomDelta": -3.0, "annualGrowthRate": 0.12, "stat1_zh": "年化 Vision Pro 空间计算净营收", "stat1_en": "Annualized Vision Pro Net Revenue", "stat2_zh": "年化硬件毛利润 / 隐含毛利率", "stat2_en": "Annual Gross Profit / Implied GM%", "stat3_zh": "含配件综合单价 / 单台毛利额", "stat3_en": "Blended Ticket / Gross Profit per Unit", "stat4_zh": "5 年累计反哺空间研发毛利池", "stat4_en": "5-Year Cumulative R&D Self-Funding GP", "presets": [{"label_zh": "① 2026–2027 M5 政企稳态基准", "label_en": "① 2026–2027 M5 Enterprise Baseline", "tag_zh": "180K台 · ~$0.74B营收", "tag_en": "180K · ~$0.74B Rev", "units": 180, "baseAsp": 3780, "bomPct": 50.5, "mixBoost": true}, {"label_zh": "② 医疗/航空车企规模部署 + 二代硅基降本", "label_en": "② Fortune 100 Fleet Scale + OLED Yield Bull", "tag_zh": "350K台 · 毛利扩张", "tag_en": "350K · Fleet Scale", "units": 350, "baseAsp": 3850, "bomPct": 46.5, "mixBoost": true}, {"label_zh": "③ $3,699+ 高价抑制需求小众保守情景", "label_en": "③ Niche High-Price Volume Floor", "tag_zh": "100K台 · 仅核心B2B", "tag_en": "100K · Core Niche", "units": 100, "baseAsp": 3700, "bomPct": 53.5, "mixBoost": false}]}, "pillarNotesZh": ["<strong>当前选中支柱解读（01 双芯物理护城河）：</strong>在外科医生连续佩戴 2 小时审阅病灶或工程师走动巡检时，R1 带来的零画面撕裂与空间锚定稳如泰山是生死攸关的底层体验 <a class=\"cite-link\" href=\"https://electronics360.globalspec.com/article/24122/techinsights-teardown-apple-vision-pro-m5\" target=\"_blank\" rel=\"noopener noreferrer\">R1 Silicon Cost ↗</a>。", "<strong>当前选中支柱解读（02 空间交互范式定义权）：</strong>正如多点触控定义了 iPhone，苹果在 visionOS 上率先跑通的“眼看手捏”空间交互范式将成为未来十年苹果 AI 眼镜的母体交互语言 <a class=\"cite-link\" href=\"https://www.apple.com/os/visionos/\" target=\"_blank\" rel=\"noopener noreferrer\">visionOS UX ↗</a>。", "<strong>当前选中支柱解读（03 政企信任护城河）：</strong>2026 年 2 月 Meta 正式停售商用 Quest 并关闭 Horizon Workrooms，使 Vision Pro 在北美高端医疗与工业培训市场几乎没有同量级合规对手 <a class=\"cite-link\" href=\"https://treeview.studio/blog/xr-spatial-computing-smart-glasses-market-statistics-report\" target=\"_blank\" rel=\"noopener noreferrer\">Meta B2B Exit ↗</a>。", "<strong>当前选中支柱解读（04 跨设备飞轮）：</strong>iPhone 负责低门槛生产空间影像内容，Mac 提供全套专业软件算力，Vision Pro 充当终极空间显示器官 <a class=\"cite-link\" href=\"https://www.apple.com/apple-vision-pro/\" target=\"_blank\" rel=\"noopener noreferrer\">Mac Virtual Display ↗</a>。"], "pillarNotesEn": ["<strong>Selected Pillar (01 · Dedicated R1 Silicon):</strong> Rock-solid 12ms sensor fusion prevents motion sickness during multi-hour surgical planning and industrial walk-throughs <a class=\"cite-link\" href=\"https://electronics360.globalspec.com/article/24122/techinsights-teardown-apple-vision-pro-m5\" target=\"_blank\" rel=\"noopener noreferrer\">R1 Silicon Cost ↗</a>.", "<strong>Selected Pillar (02 · Spatial UX Paradigm):</strong> Just as Multi-Touch defined iPhone, gaze-and-pinch interaction perfected on Vision Pro transfers directly to future Apple glasses <a class=\"cite-link\" href=\"https://www.apple.com/os/visionos/\" target=\"_blank\" rel=\"noopener noreferrer\">visionOS UX ↗</a>.", "<strong>Selected Pillar (03 · Post-Meta Enterprise Vacuum):</strong> Meta's Feb 2026 exit from commercial Quest SKUs and Workrooms left high-value medical/industrial XR wide open for Apple <a class=\"cite-link\" href=\"https://treeview.studio/blog/xr-spatial-computing-smart-glasses-market-statistics-report\" target=\"_blank\" rel=\"noopener noreferrer\">Meta B2B Exit ↗</a>.", "<strong>Selected Pillar (04 · Apple Ecosystem Loop):</strong> iPhones capture spatial memories at scale while Macs project 32:9 dual-5K workspaces straight into visionOS <a class=\"cite-link\" href=\"https://www.apple.com/apple-vision-pro/\" target=\"_blank\" rel=\"noopener noreferrer\">Mac Virtual Display ↗</a>."], "peerRowsZh": [{"category": "g1", "benchmark": true, "company": "研究基准：Apple Vision Pro", "leader": "Vision Pro (M5 + R1 · 256GB–1TB)", "col2": "3nm M5 + R1 (12ms) + 双 1.42\" 索尼 120Hz 硅基 OLED (2,300 万像素)", "col3": "累计 ~55万–60万台 · 26Q2 MR 销量份额 2.6% (#3) · 营收占比高", "col4": "$3,699 / $3,899 / $4,199 · ~75% B2B 医疗/航空/工业工作站", "col5": "750–800g (钨配重双圈带) · visionOS 27 (>2,500 原生空间应用)", "verdict": "超高端与政企绝对霸主：单机算力、12ms 零眩晕透视与财富百强医疗工业生态全球独一档。", "sourceLabel": "Apple & TechInsights", "sourceUrl": "https://electronics360.globalspec.com/article/24122/techinsights-teardown-apple-vision-pro-m5"}, {"category": "g1", "benchmark": false, "company": "三星 × 谷歌 (Samsung Galaxy XR)", "leader": "Galaxy XR (Project Moohan · 2025.10)", "col2": "骁龙 XR2+ Gen 2 (单芯) + 索尼双 4K 硅基 OLED (2,700 万像素, 90Hz)", "col3": "上市后累计出货约 ~7 万台（高端硅基 OLED 唯一直面竞品）", "col4": "$1,799 (约为 Vision Pro 半价；专用手柄另售 $249.99)", "col5": "545g 轻量化塑料机身 · 首发谷歌 Android XR + Gemini 多模态助手", "verdict": "半价轻量化劲敌：屏幕像素高且轻 200g+，但单颗 XR2+ 芯片峰值算力与 B2B 医疗工业沉淀远逊于 M5+R1。", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/us/introducing-galaxy-xr-opening-new-worlds/"}, {"category": "g2", "benchmark": false, "company": "Meta Reality Labs", "leader": "Quest 3 ($599.99) / Quest 3S ($349.99)", "col2": "骁龙 XR2 Gen 2 + LCD 面板 (Quest 3S 用菲涅尔透镜降本)", "col3": "2026Q2 占全球 MR 头显出货量 89.6% (#1 销量霸主)", "col4": "2026.04 涨价后 $349.99–$599.99；部门年亏损逾百亿美元，已转攻眼镜", "col5": "515g · Horizon OS 游戏娱乐生态最强，2026.02 彻底退出政企商用市场", "verdict": "消费级 VR 游戏量王：靠巨额硬件补贴统治大众游戏，主动放弃 B2B 政企并将战略重心转投 Ray-Ban AI 眼镜。", "sourceLabel": "Forbes & IDC", "sourceUrl": "https://www.forbes.com/sites/andrewwilliams/2026/04/17/meta-quest-3-hit-with-100-price-increase/"}, {"category": "g2", "benchmark": false, "company": "索尼互动娱乐 (Sony PS VR2)", "leader": "PlayStation VR2 (PS5 & PC VR)", "col2": "双 2000×2040 OLED (120Hz) + 眼动追踪 + 菲涅尔透镜（需有线连接）", "col3": "2025 年降价促销后年销约 ~130 万台", "col4": "官降 $150 后售 $399.99；其 Sense 手柄已单独适配卖给 Vision Pro 用户", "col5": "560g (无内置电池需插线) · 纯硬核主机/SteamVR 游戏外设", "verdict": "化敌为友的配件伙伴：定位纯有线游戏头显无独立计算能力，如今为 Vision Pro 提供官方 $249.95 空间手柄。", "sourceLabel": "PlayStation Blog", "sourceUrl": "https://blog.playstation.com/2025/02/27/a-great-new-price-for-playstation-vr2/"}, {"category": "g2", "benchmark": false, "company": "字节跳动 PICO & XREAL 轻薄眼镜", "leader": "PICO 4 Ultra (~$599) / XREAL 1 Pro+ ($599)", "col2": "PICO 骁龙 XR2 Gen 2 一体机 / XREAL 自研 X1 芯片 + 索尼 0.68\" Micro-OLED", "col3": "PICO 占 26Q2 全球 MR 6.8% (#2)；XREAL 占轻薄 AR 眼镜 36% (#1)", "col4": "$499–$599 区间，XREAL 主打 80g 随身连接手机/掌机投大屏", "col5": "XREAL 仅 ~80–85g 墨镜形态，代表消费级随身巨幕轻量化演进方向", "verdict": "轻量化风向标：80 克分体眼镜在差旅看片场景更轻松，验证了苹果搁置平价重头显、直接攻克智能眼镜的判断。", "sourceLabel": "Road to VR & PICO", "sourceUrl": "https://roadtovr.com/xreal-1-pro-plus-release-date-price/"}], "peerRowsEn": [{"category": "g1", "benchmark": true, "company": "Benchmark: Apple Vision Pro", "leader": "Vision Pro (M5 + R1 · 256GB–1TB)", "col2": "3nm M5 + R1 (12ms) + dual 1.42\" Sony 120Hz Micro-OLED (23M pixels)", "col3": "~550K–600K cum. units · 2.6% Q2 26 MR unit share (#3) · ~10x ASP", "col4": "$3,699 / $3,899 / $4,199 · ~75% B2B surgical, aviation & industrial", "col5": "750–800g (tungsten Dual Knit Band) · visionOS 27 (>2,500 spatial apps)", "verdict": "Unchallenged enterprise & workstation king: dual-chip 12ms pass-through and Fortune 100 MDM own high-ROI verticals.", "sourceLabel": "Apple & TechInsights", "sourceUrl": "https://electronics360.globalspec.com/article/24122/techinsights-teardown-apple-vision-pro-m5"}, {"category": "g1", "benchmark": false, "company": "Samsung × Google (Galaxy XR)", "leader": "Galaxy XR (Project Moohan · Oct 2025)", "col2": "Snapdragon XR2+ Gen 2 (single SoC) + dual 4K Sony Micro-OLED (27M px, 90Hz)", "col3": "~70K cumulative shipments; sole direct Micro-OLED Android XR rival", "col4": "$1,799 (~half of Vision Pro; 6DoF controllers $249.99 extra)", "col5": "545g plastic chassis · Debuts Google Android XR + multimodal Gemini", "verdict": "Lighter half-price rival: sharp panels and 545g weight, but mobile XR2+ compute and B2B app depth trail M5+R1.", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/us/introducing-galaxy-xr-opening-new-worlds/"}, {"category": "g2", "benchmark": false, "company": "Meta Reality Labs", "leader": "Quest 3 ($599.99) / Quest 3S ($349.99)", "col2": "Snapdragon XR2 Gen 2 + LCD panels (Fresnel lenses on Quest 3S)", "col3": "89.6% Q2 2026 global MR unit share (#1 consumer volume leader)", "col4": "$349.99–$599.99 (post-Apr 2026 +$100 hike); >$15B/yr Reality Labs losses", "col5": "515g · Strongest VR gaming catalog; exited enterprise Quest sales Feb 2026", "verdict": "Subsidized VR gaming giant: dominates consumer volume at steep operating losses while ceding enterprise XR to Apple.", "sourceLabel": "Forbes & IDC", "sourceUrl": "https://www.forbes.com/sites/andrewwilliams/2026/04/17/meta-quest-3-hit-with-100-price-increase/"}, {"category": "g2", "benchmark": false, "company": "Sony Interactive (PlayStation VR2)", "leader": "PS VR2 (Tethered PS5 & PC VR)", "col2": "Dual 2000×2040 OLED (120Hz) + eye tracking + Fresnel lenses (wired)", "col3": "~1.3M units shipped in 2025 following $150 MSRP cut", "col4": "$399.99 tethered gaming peripheral; sells Sense controllers ($249.95) for AVP", "col5": "560g (tethered USB-C, no standalone SoC or pass-through work OS)", "verdict": "Complementary gaming partner: pure console/PC VR accessory whose 6DoF controllers now enrich Vision Pro.", "sourceLabel": "PlayStation Blog", "sourceUrl": "https://blog.playstation.com/2025/02/27/a-great-new-price-for-playstation-vr2/"}, {"category": "g2", "benchmark": false, "company": "ByteDance PICO & XREAL Glasses", "leader": "PICO 4 Ultra (~$599) / XREAL 1 Pro+ ($599)", "col2": "PICO XR2 Gen 2 standalone / XREAL custom X1 + 0.68\" Sony Micro-OLED", "col3": "PICO #2 MR at 6.8% (2Q26); XREAL #1 tethered AR glasses at 36% share", "col4": "$499–$599 consumer media & Ultrawide virtual monitor glasses", "col5": "XREAL weighs just ~80–85g—validating lightweight eyewear demand", "verdict": "Form-factor bellwether: 80g media glasses underscore why Apple pivoted mid-tier R&D straight toward AI eyewear.", "sourceLabel": "Road to VR & PICO", "sourceUrl": "https://roadtovr.com/xreal-1-pro-plus-release-date-price/"}], "peerUnitLabelZh": "家空间计算核心玩家", "peerUnitLabelEn": "Spatial & XR Rivals", "checklistZh": [{"tag": "~75% 政企基本盘", "title": "1. B2B 商业复购测试：医疗手术、航空实训与工业 CAD 部署是否持续扩容？", "desc": "在 Meta 退出政企市场后，财富 100 强客户是否从几十台试点验证转向数百至数千台规模化采购？"}, {"tag": "Galaxy XR 防御", "title": "2. 半价竞品防御测试：$1,799 三星 Galaxy XR 是否分流核心专业开发者？", "desc": "M5+R1 双芯算力、12ms 零眩晕与 Mac 32:9 虚拟巨幕能否继续锁死高端生产力与企业客户？"}, {"tag": "硅基 OLED 二供降本", "title": "3. 光学供应链破局测试：三星显示/视涯等二供能否打破索尼 $1,117 独供高价？", "desc": "未来硅基 Micro-OLED 良率提升与多供应商竞争能否将显示总成成本压缩至 $500 以下？"}, {"tag": "~50% 单台正毛利", "title": "4. 财务自律测试：提价至 $3,699–$4,199 后是否持续维持正向硬件毛利？", "desc": "产品线能否在不造成巨额硬件补贴出血的前提下，持续自我造血支撑空间计算系统研发？"}, {"tag": "沉浸式直播变现", "title": "5. 空间内容破圈测试：NBA 场边 180度 8K 直播与空间影视能否常态化？", "desc": "Apple Immersive Video 体育赛事与演唱会直播能否跑通高客单虚拟贵宾席付费模式？"}, {"tag": "AI 智能眼镜转化", "title": "6. 终局跃迁测试：visionOS 视觉智能与眼手交互能否顺利赋能苹果轻量化眼镜？", "desc": "Vision Pro 积累的空间音频、低功耗协处理器（R系列）与 Visual Intelligence 能否助苹果赢下眼镜决战？"}], "checklistEn": [{"tag": "~75% B2B Fleet Mix", "title": "1. Enterprise Scaling Test: Are Fortune 100 pilots converting to multi-hundred-unit fleets?", "desc": "Post-Meta's enterprise exit, are hospital systems, airlines, and automakers scaling production Vision Pro deployments?"}, {"tag": "Galaxy XR Defense", "title": "2. Android XR Defense Test: Does M5+R1 fend off Samsung's $1,799 Galaxy XR?", "desc": "Do 12ms R1 pass-through, 32:9 Mac Virtual Display, and HIPAA/MDM compliance keep enterprise accounts on visionOS?"}, {"tag": "Micro-OLED Second Source", "title": "3. Display Cost Curve Test: Can secondary Micro-OLED suppliers break Sony's $1,117 floor?", "desc": "Will new Micro-OLED fab capacity eventually halve optical subsystem BOM below $500 for future hardware?"}, {"tag": "~50% Hardware GM", "title": "4. Self-Funding Discipline Test: Do $3,699–$4,199 MSRPs sustain ~50% unit gross margin?", "desc": "Does Apple maintain positive hardware gross profit per unit while avoiding Reality Labs-style operating losses?"}, {"tag": "Live 8K 180° Media", "title": "5. Immersive Content Test: Are live 180° NBA games & concerts building recurring pull?", "desc": "Can Apple Immersive Video courtside sports broadcasts unlock high-margin virtual ticket monetization?"}, {"tag": "Smart Glasses Bridge", "title": "6. Eyewear Transfer Test: Are R-series silicon & visionOS powering Apple's smart glasses?", "desc": "Do low-latency R-chip sensor fusion and Visual Intelligence give Apple a decisive OS edge in upcoming AI glasses?"}], "quickJumpZh": [{"sec": "sec-00", "title": "00 执行摘要与核心指标", "sub": "$3,699–$4,199 · ~75% B2B 买家 · $1,116.88 索尼双屏 BOM"}, {"sec": "sec-01", "title": "01 M5+R1 空间计算架构与配件矩阵", "sub": "120Hz 硅基 OLED · 钨配重头带 · PS VR2 手柄与罗技 Muse"}, {"sec": "sec-02", "title": "02 四大护城河支柱与 XR 雷达", "sub": "R1 12ms 零眩晕 · 眼动专利 · 财富百强独占 · 五维雷达"}, {"sec": "sec-03", "title": "03 全球 XR 头显竞品与 M5 实拆 BOM", "sub": "对比三星 Galaxy XR / Quest 3 / XREAL · TechInsights 拆解"}, {"sec": "sec-04", "title": "04 超高端单机经济与五年推演", "sub": "行业 10倍 ASP · 单台 ~$1,880 毛利 · 交互式 5 年测算"}, {"sec": "sec-05", "title": "05 三阶段战略转向与关键战役", "sub": "M2 首秀 → M5 补课 → 接管 B2B 并转向轻量化 AI 眼镜"}, {"sec": "sec-06", "title": "06 空间计算护城河核查清单", "sub": "6 项 B2B 复购、光学降本与智能眼镜转化自测"}, {"sec": "sec-07", "title": "07 数据来源与拆解报告核验索引", "sub": "Apple Newsroom · TechInsights · IDC · Omdia"}], "quickJumpEn": [{"sec": "sec-00", "title": "00 Executive Summary & KPIs", "sub": "$3,699–$4,199 · ~75% Enterprise Mix · $1,116.88 Sony BOM"}, {"sec": "sec-01", "title": "01 M5+R1 Stack & Spatial Ecosystem", "sub": "120Hz Micro-OLED · Tungsten Band · PS VR2 & Logitech Muse"}, {"sec": "sec-02", "title": "02 Four Moat Pillars & XR Radar", "sub": "12ms R1 Chip · Gaze UX · Fortune 100 MDM · 5-Axis Radar"}, {"sec": "sec-03", "title": "03 Global XR Peers & M5 Teardown", "sub": "vs. Galaxy XR / Quest 3 / XREAL · TechInsights M5 BOM"}, {"sec": "sec-04", "title": "04 Ultra-ASP Economics & 5Y Sim", "sub": "~10x Industry ASP · ~$1,880 GP/Unit · 5-Year Profit Sim"}, {"sec": "sec-05", "title": "05 Three-Stage Pivot & Key Decisions", "sub": "2024 Debut → M5 Upgrade → B2B Anchor & Smart Glasses"}, {"sec": "sec-06", "title": "06 Spatial Computing Checklist", "sub": "6-Point Enterprise XR & Eyewear Transfer Scorecard"}, {"sec": "sec-07", "title": "07 Primary Teardowns & Sources Index", "sub": "Apple Newsroom · TechInsights · IDC · Omdia"}]};
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
 