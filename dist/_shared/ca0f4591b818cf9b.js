
 (function () {
 'use strict';

 var CFG = {"filename": "iPad_Product_Analysis.html", "checkStorageKey": "mui_ipad_moat_checks_v1", "docTitleZh": "Apple iPad 平板产品力、串联 OLED 与搭售商业模式深度研究报告 | 数据中心", "docTitleEn": "Apple iPad Product Architecture, Tandem OLED & Attach Economics Deep Dive | Research Hub", "ch1": {"tabA_zh": "视图A: 六年营收与周期轨迹", "tabA_en": "View A: 6-Yr Sales & YoY %", "tabB_zh": "视图B: FY25 vs FY26 分季对账", "tabB_en": "View B: Quarterly H1 vs H2 Split", "viewA": {"mode": "combo", "title_zh": "FY2021–FY2026 全年 iPad 净销售额 ($B) 与同比增速演进（SEC Form 10-K）", "title_en": "FY2021–FY2026 Annual iPad Net Sales ($B) & YoY Growth Trajectory (SEC Form 10-K)", "sub_zh": "疫情居家峰值 $31.86B 后历经三年消化，FY25–FY26 稳定锚定在 ~$28.0B 高价值平台区", "sub_en": "Following the $31.86B pandemic peak, iPad stabilized firmly on a ~$28.0B annual revenue plateau in FY25–FY26", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 左轴：全年 iPad 净销售额 ($B)</span><span style=\"color:var(--chart-c2);\">● 右轴：同比营收增速 YoY (%)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ Left Axis: Annual iPad Net Sales ($B)</span><span style=\"color:var(--chart-c2);\">● Right Axis: YoY Change (%)</span>", "leg1_zh": "全年 iPad 净销售额 ($B · 左轴)", "leg1_en": "Annual iPad Net Sales ($B · Left Axis)", "leg2_zh": "同比营收变动率 YoY (% · 右轴)", "leg2_en": "YoY Net Sales Change (% · Right Axis)", "labels_zh": ["FY21", "FY22", "FY23", "FY24", "FY25", "FY26"], "labels_en": ["FY21", "FY22", "FY23", "FY24", "FY25", "FY26"], "full_zh": ["FY2021 (居家学习峰值)", "FY2022 (高基数回调)", "FY2023 (十代 iPad 过渡)", "FY2024 (M4 OLED 年中首发)", "FY2025 (全系换代复苏)", "FY2026 (M5 Pro + 6月提价)"], "full_en": ["FY2021 (Remote Peak)", "FY2022 (Post-Peak Reset)", "FY2023 (10th Gen Transition)", "FY2024 (Mid-Yr M4 OLED)", "FY2025 (Full Lineup Refresh)", "FY2026 (M5 Pro + June Hike)"], "s1": [31.86, 29.29, 28.3, 26.69, 28.02, 27.93], "s2": [34.3, -8.1, -3.4, -5.7, 5.0, -0.3], "min1": 20, "max1": 36, "min2": -15, "max2": 40, "s1_prefix": "$", "s1_suffix": "B", "s1_dec": 0, "s1_val_dec": 2, "s2_prefix": "", "s2_suffix": "%", "s2_dec": 0, "s2_val_dec": 1, "s2_signed": true}, "viewB": {"mode": "grouped", "title_zh": "FY2025 vs FY2026 分季度 iPad 净销售额对比（$B · H1 新品增长 vs H2 涨价控量）", "title_en": "FY2025 vs. FY2026 Quarterly iPad Net Sales ($B · H1 Launch Growth vs. H2 Price Hike)", "sub_zh": "H1 FY26 受益 M5 iPad Pro 与 M4 Air 同比增长 +7.0%，H2 受 6 月全系涨价 15%–29% 影响销量短期回调", "sub_en": "H1 FY26 grew +7.0% YoY on M5 Pro & M4 Air, while H2 absorbed June's 15%–29% memory-driven MSRP increases", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ FY2025 分季度 iPad 营收 ($B)</span><span style=\"color:var(--chart-c2);\">■ FY2026 分季度 iPad 营收 ($B)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ FY2025 Quarterly Sales ($B)</span><span style=\"color:var(--chart-c2);\">■ FY2026 Quarterly Sales ($B)</span>", "leg1_zh": "FY2025 分季度净销售额 ($B)", "leg1_en": "FY2025 Quarterly Net Sales ($B)", "leg2_zh": "FY2026 分季度净销售额 ($B)", "leg2_en": "FY2026 Quarterly Net Sales ($B)", "labels_zh": ["Q1 (假日季)", "Q2 (春季季)", "Q3 (6月季)", "Q4 (返校季)"], "labels_en": ["Q1 (Holiday)", "Q2 (Mar Qtr)", "Q3 (Jun Qtr)", "Q4 (Sep Qtr)"], "full_zh": ["Q1 假日季 (M5 Pro 首发)", "Q2 春季季 (M4 Air 发售)", "Q3 夏季季 (6月底涨价前夕)", "Q4 返校季 (消化提价 + 等新款 mini)"], "full_en": ["Q1 Holiday (M5 Pro Launch)", "Q2 Spring (M4 Air Launch)", "Q3 June Qtr (Pre-Hike Transition)", "Q4 Back-to-School (Post-Hike Digestion)"], "s1": [8.09, 6.4, 6.58, 6.95], "s2": [8.6, 6.91, 6.19, 6.23], "sub_row_zh": ["YoY +6.3%", "YoY +8.0%", "YoY -5.9%", "YoY -10.4%"], "sub_row_en": ["YoY +6.3%", "YoY +8.0%", "YoY -5.9%", "YoY -10.4%"], "max1": 10.5, "s1_prefix": "$", "s1_suffix": "B", "s1_dec": 1, "s1_val_dec": 2, "s2_prefix": "$", "s2_suffix": "B", "s2_val_dec": 2}}, "radar": {"title_zh": "全球主流平板电脑阵营五维产品力对比雷达图（10分制评估）", "title_en": "5-Axis Global Tablet Ecosystem Competitiveness Radar (10-Point Scale)", "axes_zh": ["专业创意软件生态", "峰值芯片与 AI 算力", "屏幕素质与工业轻薄", "外设变现与残值率", "整机性价比与附赠配件"], "axes_en": ["Pro Creative App Moat", "Peak Silicon & AI Compute", "OLED Display & Thinness", "Attach ARPU & Resale", "Bundled Value-for-Money"], "s1_zh": "Apple iPad (M5 Pro / OLED mini)", "s1_en": "Apple iPad (M5 Pro / OLED mini)", "s2_zh": "Samsung Galaxy Tab S12 系列", "s2_en": "Samsung Galaxy Tab S12 Series", "s3_zh": "中国旗舰平板 (Huawei / Xiaomi / Lenovo)", "s3_en": "Chinese Flagship Slates (Huawei / Xiaomi)", "v1": [9.9, 9.8, 9.6, 9.7, 6.2], "v2": [7.5, 8.3, 9.1, 7.6, 8.4], "v3": [7.2, 8.0, 9.2, 6.8, 9.3]}, "bars": {"title_zh": "串联双层 OLED iPad Pro (11\"/13\" M5 基准 ~$600–$750 BOM) 物料结构拆解（%）", "title_en": "Tandem OLED M5 iPad Pro (11\"/13\" ~$600–$750 BOM) Component Cost Share (%)", "sub_zh": "数据来源：Omdia 混合串联 OLED 面板成本测算 ($307–$420 总成) 及 TechInsights / TrendForce 2026 存储追踪", "sub_en": "Sources: Omdia Hybrid Tandem OLED cost breakdown ($307–$420 display assembly) & TechInsights / TrendForce 2026", "chip_zh": "11\"/13\" 串联 OLED 总成 $307–$420 · 占 BOM 逾半", "chip_en": "Tandem OLED Assembly $307–$420 · >50% of BOM", "leg1_zh": "绿色/蓝色：混合串联双层 OLED 显示总成与 Apple Silicon (M5+N1+C1X)", "leg1_en": "Green / Blue: Hybrid Tandem OLED Display Assembly & Apple Silicon (M5+N1+C1X)", "leg2_zh": "琥珀色/紫色：12GB/16GB LPDDR5X+NAND 存储与 5.1mm CNC 再生铝机身组装", "leg2_en": "Amber / Purple: 12/16GB LPDDR5X+NAND Memory & 5.1mm CNC Enclosure/Assembly", "maxX": 60, "items_zh": [{"label": "Ultra Retina XDR 混合串联双层 OLED 面板与触控贴合总成", "val": 52.5, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "11\" $307–$318 / 13\" $407–$420", "note": "Omdia 实测：双发光层 LTPO 背板 + 薄膜封装，成本约为旧款 LCD ($116) 及单层 OLED 的 3 倍"}, {"label": "Apple M5 主处理器 + N1 无线芯片 + C1X 5G 基带芯片组", "val": 16.5, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "台积电 3nm M5 + 自研连接双芯", "note": "用自研 N1 与 C1X 替代博通与高通外购芯片，部分对冲面板与内存成本上涨"}, {"label": "12GB / 16GB LPDDR5X 统一内存与 NAND 闪存颗粒", "val": 16.0, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "2026 短缺期仅 12GB RAM 即飙至 ~$70", "note": "直接触发苹果 2026 年 6 月 25 日将 iPad Pro 全系提价 $200 的核心成本推手"}, {"label": "5.1mm/5.3mm 超薄 CNC 铝金属背壳、铜散热、电池与组装", "val": 9.5, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "100% 再生铝一体机身 + 快充锂电", "note": "极致轻薄公差控制与内部铜导热结构支撑无风扇 M5 峰值释放"}, {"label": "12MP 广角 + LiDAR 激光雷达 + 横向原深感 Face ID 与四扬声器", "val": 5.5, "cStart": "#38BDF8", "cEnd": "#0284C7", "sub": "空间扫描与录音棚级四麦克风阵列", "note": "支撑 AR 空间建模、Face ID 横向解锁与专业外景音视频采集"}], "items_en": [{"label": "Ultra Retina XDR Hybrid Tandem OLED Panel & Touch Assembly", "val": 52.5, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "11\" $307–$318 / 13\" $407–$420", "note": "Omdia: dual-stack LTPO + TFE hybrid OLED costs ~3x legacy LCD ($116) and single-stack rivals"}, {"label": "Apple M5 SoC + N1 Wireless + C1X 5G Cellular Silicon", "val": 16.5, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "TSMC 3nm M5 + in-house RF duo", "note": "Replaces Broadcom & Qualcomm silicon to internalize connectivity margin"}, {"label": "12GB / 16GB LPDDR5X Unified Memory & NAND Flash", "val": 16.0, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "12GB LPDDR5X surged to ~$70 in 2026", "note": "4x memory contract surge directly prompted Apple's +$200 June 2026 iPad Pro price hike"}, {"label": "5.1mm/5.3mm CNC Recycled Aluminum Unibody, Thermal & Assembly", "val": 9.5, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "Copper heat spreader + fast-charge cell", "note": "Ultra-tight CNC tolerances sustain fanless M5 performance at 5.1mm thinness"}, {"label": "12MP Camera, LiDAR Scanner, Landscape Face ID & 4-Speaker Audio", "val": 5.5, "cStart": "#38BDF8", "cEnd": "#0284C7", "sub": "TrueDepth landscape + studio mics", "note": "Powers 3D LiDAR room scanning, Center Stage video calls, and pro field recording"}]}, "combo": {"title_zh": "2025–2026 平板行业周期逆转：全球季度出货量 (M台) vs Apple iPad 全球出货份额 (%)", "title_en": "2025–2026 Global Tablet Cycle: Industry Quarterly Shipments (M) vs. iPad Unit Share (%)", "sub_zh": "柱状图（左轴）为 Omdia 全球平板季度总出货量；折线（右轴）为 iPad 全球出货量份额（营收份额长期稳居 55%+）", "sub_en": "Bars (left axis): Omdia global quarterly tablet shipments (M); Line (right axis): Apple iPad global unit share (%)", "chip_zh": "Q2 2026 前五大厂商集中度高达 79.8%", "chip_en": "Top-5 OEM Concentration Reached 79.8% in Q2 26", "left_axis_zh": "■ 左轴：全球平板季度出货总量 (百万台)", "left_axis_en": "■ Left Axis: Global Quarterly Tablet Shipments (M)", "right_axis_zh": "● 右轴：Apple iPad 全球销量份额 (%)", "right_axis_en": "● Right Axis: Apple iPad Global Unit Share (%)", "leg1_zh": "全球平板电脑季度总出货量 (左轴 · M台)", "leg1_en": "Global Tablet Quarterly Shipments (Left · M)", "leg2_zh": "Apple iPad 全球出货市场份额 (右轴 · %)", "leg2_en": "Apple iPad Global Unit Share (Right · %)", "ref_chip_zh": "--- 35.0% 绝对统治基准线", "ref_chip_en": "--- 35.0% Category Leadership Floor", "labels_zh": ["2025 Q4", "2026 Q1", "2026 Q2", "2026 Q3"], "labels_en": ["Q4 2025", "Q1 2026", "Q2 2026", "Q3 2026"], "subs_zh": ["(M5 Pro假日季)", "(需求持平+0.1%)", "(行业涨价潮-10%)", "(存储紧缺-23%)"], "subs_en": ["(M5 Pro Holiday)", "(Flat +0.1% YoY)", "(Price Hikes -10%)", "(DRAM Crunch -23%)"], "s1": [43.7, 36.8, 36.0, 32.0], "s2": [44.9, 37.5, 38.0, 36.0], "min1": 20, "max1": 50, "min2": 30.0, "max2": 48.0, "s1_prefix": "", "s1_suffix": "M", "s1_dec": 0, "s1_val_dec": 1, "s2_prefix": "", "s2_suffix": "%", "s2_dec": 0, "s2_val_dec": 1, "refLine2": 35.0, "ref_badge_zh": "35% 份额统治线", "ref_badge_en": "35% Leadership Floor"}, "sim": {"title_zh": "iPad 主机 + 键笔搭售生态五年毛利测算器", "title_en": "iPad + Keyboard/Pencil Attach 5-Year Gross Profit Simulator", "toggle_title_zh": "计入妙控键盘与 Apple Pencil Pro 生态搭售溢价 (+$95 综合单台 ARPU)", "toggle_title_en": "Include Magic Keyboard & Pencil Pro Attach Lift (+$95 Blended ARPU)", "toggle_sub_zh": "模拟约 25%–30% 中高端用户加购高毛利键笔外设对单客收入与综合毛利率的增厚", "toggle_sub_en": "Simulates ~25%–30% attach rate of DRAM-free keyboards/pencils boosting blended ARPU & GM%", "u_label_zh": "年均 iPad 出货量 (Million Units)", "u_label_en": "Annual iPad Shipments (Million Units)", "u_min": 38, "u_max": 68, "u_step": 1, "u_suffix_zh": "M 台", "u_suffix_en": "M Units", "a_label_zh": "主机基础出厂均价 ASP (USD)", "a_label_en": "Base Host iPad ASP (USD)", "a_min": 460, "a_max": 720, "a_step": 10, "b_label_zh": "主机硬件 BOM 与制造成本率 (%)", "b_label_en": "Host Hardware BOM & Mfg Ratio (%)", "b_min": 48, "b_max": 66, "b_step": 0.5, "revDivisorToB": 1000.0, "mixAspDelta": 95, "mixBomDelta": -3.2, "annualGrowthRate": 0.02, "stat1_zh": "年化 iPad 生态含外设总营收", "stat1_en": "Annualized iPad + Attach Revenue", "stat2_zh": "年化综合毛利润 / 隐含毛利率", "stat2_en": "Annual Blended Gross Profit / GM%", "stat3_zh": "综合单客 ARPU / 单台毛利额", "stat3_en": "Blended ARPU / Gross Profit per Unit", "stat4_zh": "5 年累计创造生态硬件毛利池", "stat4_en": "5-Year Cumulative Gross Profit Pool", "presets": [{"label_zh": "① FY2026 调价后稳态含外设基准", "label_en": "① FY2026 Post-Hike + Attach Baseline", "tag_zh": "50M台 · 主机$560", "tag_en": "50M · $560 Base", "units": 50, "baseAsp": 560, "bomPct": 58.0, "mixBoost": true}, {"label_zh": "② 2027 OLED mini + AI 换机上行", "label_en": "② 2027 OLED mini + Siri AI Upswing", "tag_zh": "55M台 · 主机$590", "tag_en": "55M · $590 Base", "units": 55, "baseAsp": 590, "bomPct": 56.0, "mixBoost": true}, {"label_zh": "③ 纯主机口径 + 面板存储高压情景", "label_en": "③ Host-Only + OLED/DRAM Cost Stress", "tag_zh": "44M台 · 不含外设", "tag_en": "44M · Ex-Attach", "units": 44, "baseAsp": 550, "bomPct": 62.0, "mixBoost": false}]}, "pillarNotesZh": ["<strong>当前选中支柱解读（01 专业创意软件独占）：</strong>即使竞品硬件堆料追赶，全球数字艺术、影视监看与建筑设计工作流插件均优先乃至独家针对 iPadOS 与 Metal 图形引擎开发 <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2025/06/ipados-26-introduces-powerful-new-features-that-push-ipad-even-further/\" target=\"_blank\" rel=\"noopener noreferrer\">iPadOS Ecosystem ↗</a>。", "<strong>当前选中支柱解读（02 跨产品线硅基复用）：</strong>M5 iPad Pro AI 算力较 M4 再提速 3.5 倍，而 8.5 英寸 iPad mini 直接用上 2nm A20 Pro，让小屏平板拥有顶级旗舰算力 <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/10/apple-gives-ipad-mini-its-biggest-update-ever/\" target=\"_blank\" rel=\"noopener noreferrer\">A20 Pro mini ↗</a>。", "<strong>当前选中支柱解读（03 串联 OLED 显示壁垒）：</strong>Omdia 数据显示 LG Display 与三星显示 2025–2026 每年为 iPad Pro 供应 490 万–600 万片高难度混合串联 OLED 面板 <a class=\"cite-link\" href=\"https://www.macrumors.com/2026/11/19/apple-may-cancel-oled-imac/\" target=\"_blank\" rel=\"noopener noreferrer\">OLED Supply ↗</a>。", "<strong>当前选中支柱解读（04 跨端协同与行业标准）：</strong>随航（Sidecar）、隔空投送与通用控制让全球数千万 Mac 用户在选购平板时几乎只考虑 iPad <a class=\"cite-link\" href=\"https://www.apple.com/ipad/\" target=\"_blank\" rel=\"noopener noreferrer\">Apple Continuity ↗</a>。"], "pillarNotesEn": ["<strong>Selected Pillar (01 · Creative App Exclusivity):</strong> Digital illustration, on-set film grading, and CAD workflows target iPadOS and Metal first, locking in creative pros <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2025/06/ipados-26-introduces-powerful-new-features-that-push-ipad-even-further/\" target=\"_blank\" rel=\"noopener noreferrer\">iPadOS Ecosystem ↗</a>.", "<strong>Selected Pillar (02 · Cross-Line Silicon Reuse):</strong> M5 boosts AI compute 3.5x over M4 while iPad mini inherits the 2nm A20 Pro, eliminating R&D duplication <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/10/apple-gives-ipad-mini-its-biggest-update-ever/\" target=\"_blank\" rel=\"noopener noreferrer\">A20 Pro mini ↗</a>.", "<strong>Selected Pillar (03 · Tandem OLED Mastery):</strong> LG Display and Samsung ship 4.9M–6.0M hybrid Tandem OLED panels annually for iPad Pro <a class=\"cite-link\" href=\"https://www.macrumors.com/2026/11/19/apple-may-cancel-oled-imac/\" target=\"_blank\" rel=\"noopener noreferrer\">OLED Supply ↗</a>.", "<strong>Selected Pillar (04 · Continuity & Fleet Standard):</strong> Sidecar, Universal Control, and enterprise MDM lock in Mac owners and commercial fleets <a class=\"cite-link\" href=\"https://www.apple.com/ipad/\" target=\"_blank\" rel=\"noopener noreferrer\">Apple Continuity ↗</a>."], "peerRowsZh": [{"category": "g1", "benchmark": true, "company": "研究基准：Apple iPad", "leader": "M5 iPad Pro / M4 Air / A20 Pro OLED mini", "col2": "M5 + 2nm A20 Pro + 串联双层 OLED + iPadOS 27 窗口与 Siri AI", "col3": "25Q4 41.9%–44.9% · 26Q2 38.0% · 26Q3 36.0% (#1)", "col4": "独占全球 55% 平板总营收 · ASP ~$583 (外设另售)", "col5": "2026.06 果断提价 $100–$200 捍卫毛利率，牺牲部分低端量保利润池", "verdict": "绝对霸主：出货量超第 2–4 名总和，专业绘画剪辑生态与键笔拆卖模型构筑极深利润护城河。", "sourceLabel": "Omdia & Counterpoint", "sourceUrl": "https://omdia.tech.informa.com/pr/2026/nov/global-tablet-shipments-fall-23percent-to-32-million-in-q3-2026"}, {"category": "g1", "benchmark": false, "company": "三星电子 (Samsung Galaxy Tab)", "leader": "Galaxy Tab S12+ (12.6\") / S12 Ultra (14.6\")", "col2": "3nm 天玑 9500 + Dynamic AMOLED 2X (5.1mm, IP68) + DeX 桌面模式", "col3": "26Q2 ~16.7% · 26Q3 16.9% (5.43M 台，稳居全球第 2)", "col4": "美区旗舰 $1,199 / $1,399 起 · 全系盒内免费附赠 S Pen", "col5": "同步上调终端售价并倚仗自有存储与 AMOLED 面板缓冲成本", "verdict": "安卓高端唯一对手：IP68 防水与附赠 S Pen 诚意十足，但安卓专业创意独占软件生态仍弱于 iPadOS。", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/uk/samsung-introduces-galaxy-tab-s12-series-the-ultimate-productivity-powerhouse-built-for-growth"}, {"category": "g2", "benchmark": false, "company": "联想集团 (Lenovo Tablets)", "leader": "Yoga Tab Plus Gen 2 (13\") / 拯救者 Y700 五代", "col2": "骁龙 8 Elite + 4K PureSight 屏 + 电竞小平板与商用教育广覆盖", "col3": "26Q2 +27% YoY · 26Q3 12.7% (4.09M 台，+11.9% 唯一正增长)", "col4": "旗舰含笔 $799.99 起 · 主力小新/Tab M 聚焦 $150–$350 走量带", "col5": "逆势黑马：借 PC 供应链协同与电竞细分爆款在 2026 连续逆势增长", "verdict": "全球出货季军：商用教育渠道与高性价比突围成功，但超高端 $1,000+ 创作者心智占比有限。", "sourceLabel": "Omdia 3Q26", "sourceUrl": "https://omdia.tech.informa.com/pr/2026/nov/global-tablet-shipments-fall-23percent-to-32-million-in-q3-2026"}, {"category": "g2", "benchmark": false, "company": "小米集团 (Xiaomi Pad)", "leader": "Xiaomi Pad 9 / Pad 9 Pro / Pad 9 Pro Max (13.3\")", "col2": "自研 10 核玄戒 Xring O3 / 骁龙 8 Gen 5 + 144Hz 3.4K 屏 + 车机互联", "col3": "26Q2 ~7.8% (2.8M) · 26Q3 7.3% (2.35M 台，位居全球第 4)", "col4": "主力覆盖 $250–$650 中高端质价比区间，支持 USB-C 视频副屏输入", "col5": "存储涨价压制入门款放量，主动向 Pad 9 Pro 系列高配结构倾斜", "verdict": "硬件规格越级挑战者：12000mAh 超大电池与澎湃人车家联动出色，但海外高端软件生态仍在追赶。", "sourceLabel": "Omdia 3Q26", "sourceUrl": "https://omdia.tech.informa.com/pr/2026/nov/global-tablet-shipments-fall-23percent-to-32-million-in-q3-2026"}, {"category": "g2", "benchmark": false, "company": "华为终端 (Huawei MatePad)", "leader": "MatePad Pro 12.2\" / MatePad Pro 12 (2026)", "col2": "麒麟 T93 + 双层柔光 PaperMatte OLED (4.7mm / 454g) + PC 级原生鸿蒙应用", "col3": "26Q2 ~7.5% (2.7M) · 26Q3 5.7% (1.85M 台，优先保手机存储)", "col4": "海外旗舰 €1,099 起，中国本土高端政企与无纸化学习市场份额领先", "col5": "受限于紧缺存储芯片优先倾斜 Mate/Pura 手机，Q3 平板出货阶段性收缩", "verdict": "工业轻薄与柔光屏标杆：4.7mm 机身与 PC 级 WPS 极具竞争力，主要受限于海外应用生态覆盖。", "sourceLabel": "Notebookcheck & Omdia", "sourceUrl": "https://www.notebookcheck.net/Huawei-MatePad-Pro-12-2026-launches-outside-China-with-PaperMatte-OLED-display-now-even-thinner-and-lighter.1422814.0.html"}], "peerRowsEn": [{"category": "g1", "benchmark": true, "company": "Benchmark: Apple iPad", "leader": "M5 iPad Pro / M4 Air / A20 Pro OLED mini", "col2": "M5 + 2nm A20 Pro + Tandem OLED + iPadOS 27 windowing & Siri AI", "col3": "4Q25: 41.9%–44.9% · 2Q26: 38.0% · 3Q26: 36.0% (#1)", "col4": "55% Global Tablet Revenue Share · ~$583 ASP (accessories extra)", "col5": "Hiked MSRPs +$100–$200 in June 2026 to fully offset 4x DRAM/NAND surge", "verdict": "Unchallenged category king: ships more than #2–#4 combined while monetizing pro apps and unbundled accessories.", "sourceLabel": "Omdia & Counterpoint", "sourceUrl": "https://omdia.tech.informa.com/pr/2026/nov/global-tablet-shipments-fall-23percent-to-32-million-in-q3-2026"}, {"category": "g1", "benchmark": false, "company": "Samsung Electronics (Galaxy Tab)", "leader": "Galaxy Tab S12+ (12.6\") / S12 Ultra (14.6\")", "col2": "3nm Dimensity 9500 + Dynamic AMOLED 2X (5.1mm, IP68) + DeX mode", "col3": "2Q26: ~16.7% · 3Q26: 16.9% (5.43M units, Global #2)", "col4": "U.S. flagships $1,199 / $1,399+ · Free S Pen bundled in box", "col5": "Raised prices alongside captive Samsung DRAM & AMOLED supply buffer", "verdict": "Sole Android premium peer: IP68 + free S Pen add value, though Android pro creative app depth trails iPadOS.", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/uk/samsung-introduces-galaxy-tab-s12-series-the-ultimate-productivity-powerhouse-built-for-growth"}, {"category": "g2", "benchmark": false, "company": "Lenovo Group", "leader": "Yoga Tab Plus Gen 2 (13\") / Legion Tab Gen 5", "col2": "Snapdragon 8 Elite + 4K PureSight display + gaming & edu breadth", "col3": "2Q26: +27% YoY · 3Q26: 12.7% (4.09M, +11.9% sole grower)", "col4": "Flagship $799.99 w/ pen · High-volume $150–$350 commercial/edu tiers", "col5": "Outperformed peers in 2026 via PC supply-chain leverage & gaming niche", "verdict": "Global #3 unit climber: strong commercial and gaming execution, but limited $1,000+ creative pro share.", "sourceLabel": "Omdia 3Q26", "sourceUrl": "https://omdia.tech.informa.com/pr/2026/nov/global-tablet-shipments-fall-23percent-to-32-million-in-q3-2026"}, {"category": "g2", "benchmark": false, "company": "Xiaomi Corp (Xiaomi Pad)", "leader": "Xiaomi Pad 9 / Pad 9 Pro / Pad 9 Pro Max (13.3\")", "col2": "In-house 10-core Xring O3 / Snapdragon 8 Gen 5 + 144Hz 3.4K LCD", "col3": "2Q26: ~7.8% (2.8M) · 3Q26: 7.3% (2.35M units, Global #4)", "col4": "Targets $250–$650 sweet spot with EV cabin & USB-C monitor mode", "col5": "Shifted mix toward Pad 9 Pro tiers as memory costs squeezed entry SKUs", "verdict": "High-spec value challenger: 12,000mAh battery and HyperOS continuity shine, trailing in global pro software.", "sourceLabel": "Omdia 3Q26", "sourceUrl": "https://omdia.tech.informa.com/pr/2026/nov/global-tablet-shipments-fall-23percent-to-32-million-in-q3-2026"}, {"category": "g2", "benchmark": false, "company": "Huawei (MatePad)", "leader": "MatePad Pro 12.2\" / MatePad Pro 12 (2026)", "col2": "Kirin T93 + PaperMatte Tandem OLED (4.7mm / 454g) + HarmonyOS PC apps", "col3": "2Q26: ~7.5% (2.7M) · 3Q26: 5.7% (1.85M, prioritized phone DRAM)", "col4": "€1,099+ overseas flagship; strong China premium & paperless office share", "col5": "Allocated scarce memory wafers toward flagship phones in Q3 2026", "verdict": "Ultra-thin & anti-glare pioneer: 4.7mm PaperMatte OLED rivals iPad Pro hardware, constrained outside China.", "sourceLabel": "Notebookcheck & Omdia", "sourceUrl": "https://www.notebookcheck.net/Huawei-MatePad-Pro-12-2026-launches-outside-China-with-PaperMatte-OLED-display-now-even-thinner-and-lighter.1422814.0.html"}], "peerUnitLabelZh": "家核心平板厂商", "peerUnitLabelEn": "Tablet OEMs", "checklistZh": [{"tag": "55% 全球营收份额", "title": "1. 行业价值池垄断测试：是否持续占据全球平板超半数总营收？", "desc": "在行业出货波动期，iPad 能否凭借 35%–42% 出货份额持续拿走全球 55%+ 的平板销售额？"}, {"tag": "Procreate / 创意独占", "title": "2. 专业触控软件壁垒测试：数字绘画与专业音视频生态是否稳固？", "desc": "插画、建筑批注、影视监看等核心生产力应用是否依然优先绑定 iPadOS 与 Apple Pencil Pro？"}, {"tag": "+$398~$478 外设", "title": "3. 键笔拆卖高毛利测试：妙控键盘与 Pencil Pro 搭售率是否健康？", "desc": "高溢价且零 DRAM 成本敞口的官方键笔配件能否持续贡献 +30% 以上的单客 ARPU 增厚？"}, {"tag": "M5 + A20 Pro + C2", "title": "4. 跨产品线硅基复用测试：SoC 与蜂窝基带是否维持代差优势？", "desc": "M5、2nm A20 Pro 以及自研 C1X/C2 5G 基带能否继续提供竞品无法企及的每瓦算力与蜂窝毛利？"}, {"tag": "iPadOS 27 窗口化", "title": "5. 桌面生产力演进与防内耗测试：与触控 Mac 及 iPhone Duo 边界是否清晰？", "desc": "在 2026 秋季推出 iPhone Duo 与触控屏 MacBook Pro 后，iPad 能否凭借轻量化拆装与手写体验守住独立场景？"}, {"tag": "提价传导力", "title": "6. 供应链通胀转嫁测试：面板与存储涨价能否通过价格阶梯消化？", "desc": "经历 2026 年 6 月全系提价 $100–$200 与 Apple Upgrade 租赁缓冲后，高端 Pro/Air/mini 结构是否保持韧性？"}], "checklistEn": [{"tag": "55% Global Rev Share", "title": "1. Value-Pool Capture Test: Does iPad retain >50% of global tablet revenue?", "desc": "Across shipment cycles, does iPad command 55%+ of global tablet dollars on 35%–42% unit share?"}, {"tag": "Creative App Moat", "title": "2. Exclusive Pro Touch Software Test: Are creative workflows locked in?", "desc": "Do Procreate, CAD markup, on-set grading, and cockpit EFB ecosystems remain anchored to iPadOS & Pencil Pro?"}, {"tag": "+$398–$478 Attach", "title": "3. Unbundled Accessory Economics Test: Is keyboard/pencil attach resilient?", "desc": "Do DRAM-free Magic Keyboard and Apple Pencil Pro bundles continue lifting blended customer spend by +30%+?"}, {"tag": "M5 + A20 Pro + C2", "title": "4. Cross-Line Silicon Reuse Test: Do M-series & C-modems preserve lead?", "desc": "Do shared M5/A20 Pro compute and in-house C1X/C2 cellular modems sustain performance and cellular margin advantages?"}, {"tag": "iPadOS 27 Boundary", "title": "5. Ecosystem Cannibalization Test: Are boundaries vs. Touch Mac & Duo clear?", "desc": "Alongside foldable iPhone Duo and Touch MacBook Pro, does iPad defend distinct stylus-first modular workflows?"}, {"tag": "Pricing Pass-Through", "title": "6. Component Inflation Pass-Through Test: Did June 2026 hikes hold?", "desc": "Backed by Apple Upgrade leasing, did M5 Pro, M4 Air, and OLED mini absorb $100–$200 MSRP resets while defending GM%?"}], "quickJumpZh": [{"sec": "sec-00", "title": "00 执行摘要与核心指标", "sub": "FY26 $27.93B · 全球 55% 营收份额 · 串联 OLED BOM"}, {"sec": "sec-01", "title": "01 四阶产品矩阵与营收引擎", "sub": "M5 Pro / M4 Air / 8.5\" OLED A20 Pro mini / A16 iPad"}, {"sec": "sec-02", "title": "02 四大护城河支柱与能力雷达", "sub": "专业创意软件 · 跨线芯片复用 · 五维平板雷达图"}, {"sec": "sec-03", "title": "03 全球平板竞争格局与 BOM 拆解", "sub": "iPad vs 三星/联想/小米/华为 · 串联 OLED $307–$420 拆解"}, {"sec": "sec-04", "title": "04 键笔搭售经济与毛利推演", "sub": "+$398~$478 外设溢价 · 交互式 5 年生态毛利测算器"}, {"sec": "sec-05", "title": "05 三代计算演进与关键战役", "sub": "2010 初代 → M系桌面化 → 2026 提价与 OLED mini 破局"}, {"sec": "sec-06", "title": "06 iPad 产品力护城河核查清单", "sub": "6 项平板竞争壁垒与防内耗健康度自测"}, {"sec": "sec-07", "title": "07 数据来源与拆解财报核验索引", "sub": "SEC EDGAR · Apple Newsroom · Omdia · Counterpoint"}], "quickJumpEn": [{"sec": "sec-00", "title": "00 Executive Summary & KPIs", "sub": "FY26 $27.93B · 55% Global Rev Share · Tandem OLED BOM"}, {"sec": "sec-01", "title": "01 Four-Tier Lineup & Sales Engine", "sub": "M5 Pro / M4 Air / 8.5\" OLED A20 Pro mini / A16 iPad"}, {"sec": "sec-02", "title": "02 Four Moat Pillars & Tablet Radar", "sub": "Creative App Moat · Silicon Reuse · 5-Axis Radar"}, {"sec": "sec-03", "title": "03 Global Tablet Peers & BOM Teardown", "sub": "iPad vs. Samsung/Lenovo/Xiaomi/Huawei · Tandem OLED BOM"}, {"sec": "sec-04", "title": "04 Attach Economics & Profit Simulator", "sub": "+$398–$478 Bundle Lift · 5-Year Gross Profit Simulator"}, {"sec": "sec-05", "title": "05 Three-Era Evolution & Key Battles", "sub": "2010 Debut → M-Series Leap → 2026 Pricing & OLED mini"}, {"sec": "sec-06", "title": "06 Tablet Moat Diagnostic Checklist", "sub": "6-Point Modular Slate Moat Scorecard (Saved Locally)"}, {"sec": "sec-07", "title": "07 Primary Filings & Sources Index", "sub": "SEC EDGAR · Apple Newsroom · Omdia · Counterpoint"}]};
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_CHECK_KEY = CFG.checkStorageKey;

 var p0 = CFG.sim.presets[0];
 var state = {
 lang: 'zh',
 theme: 'light',
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
 