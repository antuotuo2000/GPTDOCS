
 (function () {
 'use strict';

 var CFG = {"filename": "Apple_Watch_Product_Analysis.html", "checkStorageKey": "mui_watch_moat_checks_v1", "docTitleZh": "Apple Watch (iWatch) 智能手表产品力、医疗健康壁垒与单机经济深度研究报告 | 数据中心", "docTitleEn": "Apple Watch Product Strategy, Clinical Health Moat & Unit Economics Deep Dive | Research Hub", "ch1": {"tabA_zh": "视图A: 可穿戴分部与手表估算营收", "tabA_en": "View A: Segment vs. Watch Revenue", "tabB_zh": "视图B: 2025–2026 出货增速反转", "tabB_en": "View B: Shipment Growth Rebound", "viewA": {"mode": "grouped", "title_zh": "FY2023–FY2026 苹果可穿戴分部净营收 vs Apple Watch 独立估算硬件营收 ($B)", "title_en": "FY2023–FY2026 SEC Wearables Segment Sales vs. Est. Standalone Apple Watch Revenue ($B)", "sub_zh": "可穿戴分部在 FY26 企稳于 $35.58B (-0.3%)，其中 Apple Watch 独立贡献约 $15.5B–$16.2B 稳健基本盘", "sub_en": "SEC Wearables stabilized at $35.58B in FY26 (-0.3% YoY), anchored by ~$15.5B–$16.2B in standalone Apple Watch sales", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ SEC 可穿戴、家居及配件分部总营收 ($B)</span><span style=\"color:var(--chart-c2);\">■ Apple Watch 独立估算营收 ($B)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ SEC Wearables, Home &amp; Accessories ($B)</span><span style=\"color:var(--chart-c2);\">■ Est. Standalone Apple Watch ($B)</span>", "leg1_zh": "SEC 可穿戴、家居及配件分部净销售额 ($B)", "leg1_en": "SEC Wearables, Home & Accessories Net Sales ($B)", "leg2_zh": "Apple Watch 独立硬件估算营收 ($B)", "leg2_en": "Estimated Standalone Apple Watch Revenue ($B)", "labels_zh": ["FY2023", "FY2024", "FY2025", "FY2026"], "labels_en": ["FY2023", "FY2024", "FY2025", "FY2026"], "full_zh": ["FY2023 (疫情后高基数消化)", "FY2024 (换机周期拉长)", "FY2025 (秋季 S11/SE3 拐点)", "FY2026 (分部企稳 + 手表正增长)"], "full_en": ["FY2023 (Post-COVID Base)", "FY2024 (Elongated Cycle)", "FY2025 (Fall S11/SE3 Turn)", "FY2026 (Stabilized + Watch Growth)"], "s1": [39.85, 37.01, 35.69, 35.58], "s2": [17.5, 16.2, 15.4, 15.9], "sub_row_zh": ["Watch占 ~44%", "Watch占 ~44%", "Watch占 ~43%", "Watch占 ~45%"], "sub_row_en": ["~44% Watch", "~44% Watch", "~43% Watch", "~45% Watch"], "max1": 45.0, "s1_prefix": "$", "s1_suffix": "B", "s1_dec": 0, "s1_val_dec": 2, "s2_prefix": "$", "s2_suffix": "B", "s2_val_dec": 2}, "viewB": {"mode": "combo", "title_zh": "2024–2026Q2 Apple Watch 全球出货同比增速 (%) 与全球智能手表营收份额 (%)", "title_en": "2024–Q2 2026 Apple Watch Shipment YoY Growth (%) & Global Revenue Share (%)", "sub_zh": "自 2025Q3 (+23% YoY) 终结连续回调后，2026Q1 (+21%) 与 2026Q2 (+14%) 连续领跑全球高端腕戴复苏", "sub_en": "After breaking a 7-quarter slide in Q3 2025 (+23%), shipments surged +21% in Q1 2026 and +14% in Q2 2026", "meta_html_zh": "<span style=\"color:var(--chart-c1);\">■ 左轴：全球智能手表营收份额 (%)</span><span style=\"color:var(--chart-c2);\">● 右轴：Apple Watch 出货量同比增速 YoY (%)</span>", "meta_html_en": "<span style=\"color:var(--chart-c1);\">■ Left Axis: Global Smartwatch Revenue Share (%)</span><span style=\"color:var(--chart-c2);\">● Right Axis: Unit Shipment YoY (%)</span>", "leg1_zh": "Apple Watch 全球智能手表营收份额 (左轴 · %)", "leg1_en": "Global Smartwatch Revenue Share (Left · %)", "leg2_zh": "Apple Watch 全球出货同比增速 YoY (右轴 · %)", "leg2_en": "Global Unit Shipment YoY Growth (Right · %)", "labels_zh": ["2024", "2025 Q2", "2025 Q3", "2026 Q1", "2026 Q2"], "labels_en": ["2024", "Q2 2025", "Q3 2025", "Q1 2026", "Q2 2026"], "full_zh": ["2024 全年 (新品空窗调整)", "2025 Q2 (换代前夕低谷)", "2025 Q3 (S11/SE3/Ultra3 首发反转)", "2026 Q1 (同比激增 +21%)", "2026 Q2 (逆市增长 +14%，大盘 -4%)"], "full_en": ["2024 Full Year", "Q2 2025 (Pre-Launch)", "Q3 2025 (S11/SE3 Breakout)", "Q1 2026 (+21% YoY Surge)", "Q2 2026 (+14% vs. Market -4%)"], "s1": [34.0, 32.0, 35.0, 34.5, 33.0], "s2": [-12.0, -8.0, 23.0, 21.0, 14.0], "min1": 20, "max1": 42, "min2": -20, "max2": 30, "s1_prefix": "", "s1_suffix": "%", "s1_dec": 0, "s1_val_dec": 1, "s2_prefix": "", "s2_suffix": "%", "s2_dec": 0, "s2_val_dec": 1, "s2_signed": true}}, "radar": {"title_zh": "全球核心智能手表阵营五维产品力对比雷达图（10分制评估）", "title_en": "5-Axis Global Smartwatch Competitiveness Radar (10-Point Scale)", "axes_zh": ["临床医疗验证与健康 AI", "独立芯片算力与应用生态", "单机均价与硬件毛利率", "卫星通信与户外耐受度", "跨系统兼容与多周长续航"], "axes_en": ["Clinical Validation & AI", "SiP Compute & App Ecosystem", "ASP & Hardware Margin", "Satellite & Ruggedness", "Cross-OS & Multi-Week Battery"], "s1_zh": "Apple Watch (S12 / Ultra 4)", "s1_en": "Apple Watch (S12 / Ultra 4)", "s2_zh": "华为 / 三星全能旗舰表 (WATCH 6 / Ultra2)", "s2_en": "Huawei WATCH 6 / Samsung Ultra2", "s3_zh": "佳明专业户外运动表 (Garmin fēnix 9 Pro)", "s3_en": "Garmin Pro Adventure (fēnix 9 Pro)", "v1": [9.8, 9.9, 9.5, 9.0, 5.8], "v2": [8.8, 7.8, 7.6, 8.2, 8.8], "v3": [8.2, 6.5, 9.4, 9.8, 9.7]}, "bars": {"title_zh": "旗舰 Apple Watch (TechInsights Series 11 5G 46mm $150.38 BOM) 硬件成本拆解（%）", "title_en": "Flagship Apple Watch (TechInsights Series 11 5G 46mm $150.38 BOM) Component Share (%)", "sub_zh": "数据来源：TechInsights 2026 百万台级逆向拆解 ($150.38 BOM vs $499 蜂窝版售价) 及 Counterpoint 子系统权重基准", "sub_en": "Sources: TechInsights 2026 Series 11 5G Teardown ($150.38 BOM vs. $499 MSRP) & Counterpoint Subsystem Baseline", "chip_zh": "总 BOM $150.38 · 仅占 $499 售价 30.1%", "chip_en": "Total BOM $150.38 · Just 30.1% of $499 MSRP", "leg1_zh": "绿色/蓝色：广视角 LTPO3 OLED 屏幕总成、S 系 SiP 独立主芯片与多模态生物传感器", "leg1_en": "Green / Blue: Wide-Angle LTPO3 OLED Display, S-Series SiP AP & Optical/ECG Biosensors", "leg2_zh": "琥珀色/紫色：5G 射频异形钢壳电池连接模组与 CNC/3D 打印表壳防水结构件", "leg2_en": "Amber / Purple: 5G RF + Metal-Can Battery + CNC/3D-Printed Waterproof Enclosure", "maxX": 35, "items_zh": [{"label": "5G 蜂窝基带射频链、异形钢壳电池、Taptic 线性马达与整机总装", "val": 28.0, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "~$42.10 (含 MT6815W 5G 基带与双天线 + 钢壳电芯)", "note": "首次引入 5G RedCap 射频前端与高能量密度定制钢壳电池，支撑 24h–50h 续航"}, {"label": "S10/S11 SiP 超微型封装主处理器与板载存储芯片", "val": 21.5, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "~$32.33 (仅独立 S10 AP 单颗即达 $23.90 / 占 15.89%)", "note": "TechInsights 指出苹果是唯一采用手机级高算力独立 AP 的手表厂商，1,758 引脚高密封装"}, {"label": "广视角 LTPO3 OLED 显示面板与 Ceramic Shield 2 / 蓝宝石前盖", "val": 19.5, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "~$29.32 (全品类单一最大独立模组驱动项)", "note": "2,000–3,000 nits 峰值亮度与 1Hz 秒针常亮刷新，叠加陶瓷涂层或蓝宝石水晶盖板"}, {"label": "多波长光学心率 (PPG)、单导联 ECG 电极与腕温生物传感表背总成", "val": 17.5, "cStart": "#38BDF8", "cEnd": "#0284C7", "sub": "~$26.32 (与蓝宝石背盖及快充磁吸线圈一体化封装)", "note": "Series 12/Ultra 4 进一步升级每 5 秒心率与 24 倍 HRV 采样密度"}, {"label": "铝金属 / 3D 打印再生钛金属 / 精密陶瓷表壳与数码表冠结构件", "val": 13.5, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$20.30 (钛/陶瓷款零售溢价 +$300~$500 远超材料增量)", "note": "3D 打印钛金属工艺节省 50% 原材料，成为高端 SKU 极高毛利率的核心推手"}], "items_en": [{"label": "5G Cellular RF Front-End, Metal-Can Battery, Taptic Engine & Assembly", "val": 28.0, "cStart": "#FBBF24", "cEnd": "#D97706", "sub": "~$42.10 (MT6815W 5G modem + dual antenna + steel cell)", "note": "Adds 5G cellular connectivity and custom high-density metal-can battery cells"}, {"label": "S10/S11 Micro-SiP Application Processor & Embedded Memory", "val": 21.5, "cStart": "#3399FF", "cEnd": "#0073E6", "sub": "~$32.33 (Standalone S10 AP die alone = $23.90 / 15.89%)", "note": "TechInsights: sole smartwatch using a phone-class high-compute AP in a 1,758-pin SiP"}, {"label": "Wide-Angle LTPO3 OLED Display & Ceramic Shield 2 / Sapphire Cover", "val": 19.5, "cStart": "#34D399", "cEnd": "#16A34A", "sub": "~$29.32 (#1 single discrete module cost driver)", "note": "2,000–3,000 nits peak brightness with 1Hz ticking second hand"}, {"label": "Multi-Wavelength PPG Heart Rate, ECG & Wrist Temp Back Crystal", "val": 17.5, "cStart": "#38BDF8", "cEnd": "#0284C7", "sub": "~$26.32 (co-packaged w/ fast-charge coil & sapphire back)", "note": "Upgraded in S12/Ultra 4 for 5-sec continuous HR and 24x overnight HRV"}, {"label": "Aluminum / 3D-Printed Titanium / Precision Ceramic Case & Crown", "val": 13.5, "cStart": "#A78BFA", "cEnd": "#7C3AED", "sub": "~$20.30 (Titanium/Ceramic command +$300–$500 MSRP lift)", "note": "3D-printed titanium halves raw material waste while driving luxury-grade margins"}]}, "combo": {"title_zh": "2026 Q2 全球高阶智能手表 (HLOS) 份额统治力 vs 全口径营收份额对比", "title_en": "2025–2026 Apple Watch Unit Share (%) vs. Global Smartwatch Revenue Share (%)", "sub_zh": "柱状图（左轴）为 Counterpoint 全球全口径智能手表出货份额；折线（右轴）为全球营收份额（高阶 HLOS 份额更高达 46%）", "sub_en": "Bars (left axis): Global total smartwatch unit share (%); Line (right axis): Global smartwatch revenue share (%)", "chip_zh": "Omdia 高阶智能手表 (HLOS) 苹果独占 46%", "chip_en": "Commands 46% of Global Advanced HLOS Watches", "left_axis_zh": "■ 左轴：Apple Watch 全球出货量份额 (%)", "left_axis_en": "■ Left Axis: Global Smartwatch Unit Share (%)", "right_axis_zh": "● 右轴：Apple Watch 全球营收份额 (%)", "right_axis_en": "● Right Axis: Global Smartwatch Revenue Share (%)", "leg1_zh": "Apple Watch 全球出货量份额 (左轴 · %)", "leg1_en": "Apple Watch Global Unit Share (Left · %)", "leg2_zh": "Apple Watch 全球行业营收份额 (右轴 · %)", "leg2_en": "Apple Watch Global Revenue Share (Right · %)", "ref_chip_zh": "--- 33.0% 三分之一行业营收线", "ref_chip_en": "--- 33.0% One-Third Industry Revenue Line", "labels_zh": ["2025 Q2", "2025 全年", "2026 Q1", "2026 Q2"], "labels_en": ["Q2 2025", "2025 FY", "Q1 2026", "Q2 2026"], "subs_zh": ["(换代前夕17%)", "(全年出货#1)", "(出货激增+21%)", "(SE3占1/3拉高销量)"], "subs_en": ["(Pre-Refresh)", "(#1 Full-Yr Units)", "(+21% YoY Surge)", "(SE 3 Volume Boost)"], "s1": [17.0, 23.0, 23.0, 20.1], "s2": [32.0, 34.5, 35.0, 33.0], "min1": 10.0, "max1": 30.0, "min2": 25.0, "max2": 40.0, "s1_prefix": "", "s1_suffix": "%", "s1_dec": 0, "s1_val_dec": 1, "s2_prefix": "", "s2_suffix": "%", "s2_dec": 0, "s2_val_dec": 1, "refLine2": 33.0, "ref_badge_zh": "33% 营收统治线", "ref_badge_en": "33% Revenue Mark"}, "sim": {"title_zh": "Apple Watch 销量 × Ultra/陶瓷与表带溢价五年毛利测算器", "title_en": "Apple Watch Volume × Ultra/Ceramic & Band Attach Profit Simulator", "toggle_title_zh": "开启 Ultra 4 / 钛陶瓷高配占比与官方表带复购溢价 (+$55 ASP)", "toggle_title_en": "Enable Ultra 4 / Ceramic Mix & Extra Band Attach (+$55 ASP)", "toggle_sub_zh": "模拟 $799 Ultra 4、$899 陶瓷款及人均复购 1–2 条高毛利官方表带对单客盈利的增厚", "toggle_sub_en": "Simulates $799 Ultra 4, $899 Ceramic, and high-margin extra band purchases boosting ARPU & GM%", "u_label_zh": "年均 Apple Watch 出货量 (Million Units)", "u_label_en": "Annual Watch Shipments (Million Units)", "u_min": 28, "u_max": 52, "u_step": 1, "u_suffix_zh": "M 块", "u_suffix_en": "M Units", "a_label_zh": "基础出厂实现均价 ASP (USD)", "a_label_en": "Base Realized Watch ASP (USD)", "a_min": 320, "a_max": 520, "a_step": 10, "b_label_zh": "综合全口径成本率 (BOM+渠道折让+保修 · %)", "b_label_en": "All-In GAAP Cost of Sales Ratio (%)", "b_min": 38, "b_max": 58, "b_step": 0.5, "revDivisorToB": 1000.0, "mixAspDelta": 55, "mixBomDelta": -3.5, "annualGrowthRate": 0.04, "stat1_zh": "年化 Apple Watch 生态净营收", "stat1_en": "Annualized Watch + Band Revenue", "stat2_zh": "年化 GAAP 毛利润 / 隐含毛利率", "stat2_en": "Annual GAAP Gross Profit / GM%", "stat3_zh": "综合单客 ARPU / 单表毛利额", "stat3_en": "Blended ARPU / Gross Profit per Watch", "stat4_zh": "5 年累计创造腕戴毛利池", "stat4_en": "5-Year Cumulative Gross Profit Pool", "presets": [{"label_zh": "① 2026 复苏稳态基准 (37M块 · ~$16B)", "label_en": "① 2026 Recovery Baseline (37M · ~$16B)", "tag_zh": "37M块 · 成本率48%", "tag_en": "37M · 48% Cost", "units": 37, "baseAsp": 380, "bomPct": 48.0, "mixBoost": true}, {"label_zh": "② watchOS 27 淘汰老表引发换机潮", "label_en": "② watchOS 27 Upgrade Wave + Health AI", "tag_zh": "43M块 · 成本率46%", "tag_en": "43M · 46% Cost", "units": 43, "baseAsp": 400, "bomPct": 46.0, "mixBoost": true}, {"label_zh": "③ SE 3 低价款占比过高稀释均价情景", "label_en": "③ High SE 3 Entry Mix Dilution Stress", "tag_zh": "34M块 · 不含高配溢价", "tag_en": "34M · Ex-Mix", "units": 34, "baseAsp": 350, "bomPct": 52.0, "mixBoost": false}]}, "pillarNotesZh": ["<strong>当前选中支柱解读（01 临床循证医学护城河）：</strong>2026 年 11 月联合《NEJM》《JAMA》循证库伙伴 OpenEvidence 启动 20 万人研究，打通“穿戴监测 → Quest 化验 → AI 问诊准备”闭环 <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/11/apple-launches-research-study-to-explore-the-use-of-ai-for-health/\" target=\"_blank\" rel=\"noopener noreferrer\">Clinical AI ↗</a>。", "<strong>当前选中支柱解读（02 超微型 SiP 硅基壁垒）：</strong>S10/S11 SiP 封装厚度仅 0.56mm 却集成 1,758 引脚，把端侧 Siri AI 与音频智能直接装进手腕 <a class=\"cite-link\" href=\"https://www.techinsights.com/teardown/apple-watch-series-11-5g-teardown\" target=\"_blank\" rel=\"noopener noreferrer\">SiP Teardown ↗</a>。", "<strong>当前选中支柱解读（03 双向生态防流失锁）：</strong>CIRP 调研证实拥有智能手表的苹果用户中高达 96% 选择 Apple Watch，第三方手表在 iOS 上难以突破通知与支付权限壁垒 <a class=\"cite-link\" href=\"https://speakwiseapp.com/blog/apple-watch-statistics\" target=\"_blank\" rel=\"noopener noreferrer\">CIRP Survey ↗</a>。", "<strong>当前选中支柱解读（04 奢侈品级材质阶梯定价）：</strong>从 $399 铝金属升至 $699 钛金属或 $899 陶瓷表壳，内部芯片传感器完全一致，+$300–$500 差价绝大部分沉淀为纯毛利 <a class=\"cite-link\" href=\"https://www.apple.com/shop/buy-watch/apple-watch\" target=\"_blank\" rel=\"noopener noreferrer\">Case Pricing ↗</a>。"], "pillarNotesEn": ["<strong>Selected Pillar (01 · Clinical Validation Moat):</strong> Nov 2026's OpenEvidence study links wrist vitals and Quest blood panels to peer-reviewed medical literature <a class=\"cite-link\" href=\"https://www.apple.com/newsroom/2026/11/apple-launches-research-study-to-explore-the-use-of-ai-for-health/\" target=\"_blank\" rel=\"noopener noreferrer\">Clinical AI ↗</a>.", "<strong>Selected Pillar (02 · Micro-SiP Engineering):</strong> A 15.9×9.12×0.56mm 1,758-pin SiP runs on-wrist Siri AI and continuous vascular algorithms locally <a class=\"cite-link\" href=\"https://www.techinsights.com/teardown/apple-watch-series-11-5g-teardown\" target=\"_blank\" rel=\"noopener noreferrer\">SiP Teardown ↗</a>.", "<strong>Selected Pillar (03 · Two-Way Ecosystem Lock):</strong> CIRP data shows 96% of smartwatch-owning Apple customers wear an Apple Watch, slashing iPhone churn <a class=\"cite-link\" href=\"https://speakwiseapp.com/blog/apple-watch-statistics\" target=\"_blank\" rel=\"noopener noreferrer\">CIRP Survey ↗</a>.", "<strong>Selected Pillar (04 · Luxury Case Tiering):</strong> Stepping from $399 Aluminum to $699 Titanium or $899 Ceramic uses identical internal electronics, converting case finishes into pure margin <a class=\"cite-link\" href=\"https://www.apple.com/shop/buy-watch/apple-watch\" target=\"_blank\" rel=\"noopener noreferrer\">Case Pricing ↗</a>."], "peerRowsZh": [{"category": "g1", "benchmark": true, "company": "研究基准：Apple Watch", "leader": "Series 12 / Ultra 4 / SE 3", "col2": "watchOS 27 + S11 SiP + 每5秒心率/24x HRV + 高血压/呼吸暂停 + Audio AI", "col3": "25全年出货 23% (#1)；26Q2 营收份额 33% · 高阶表 (HLOS) 占 46%", "col4": "S12 24h / Ultra 4 50h–84h · 全系 5G + Ultra 4 双向卫星", "col5": "$249 (SE 3) / $399–$899 (S12) / $799 (Ultra 4)", "verdict": "全球价值池与临床生态霸主：以 1.65x+ 出货营收比赚走最厚利润，唯一短板为不支持安卓配对与单周级长续航。", "sourceLabel": "Apple & Counterpoint", "sourceUrl": "https://www.apple.com/newsroom/2026/09/introducing-apple-watch-series-12-with-the-all-new-health-sensing-system/"}, {"category": "g2", "benchmark": false, "company": "华为终端 (Huawei Watch)", "leader": "WATCH 6 / 6 Pro / WATCH 5 / GT 7 Pro", "col2": "HarmonyOS (兼容 iOS/安卓) + 侧边 X-TAP 智感窗 60 秒 14 项微体检", "col3": "25全年出货 17% (+30%)；26Q2 借中国补贴达 21.8%/22% 暂居出货第 1", "col4": "WATCH 6 标准 4.5 天 / 省电 11 天 · 支持独立 eSIM", "col5": "GT 系列 ~$315 · WATCH 6 Pro ~$600+ 级", "verdict": "出货量头号劲敌：跨系统兼容与多日长续航极具吸引力，但约 80% 销量集中于中国市场，全球第三方应用生态弱于苹果。", "sourceLabel": "Counterpoint Q2 26", "sourceUrl": "https://counterpointresearch.com/en/insights/global-smartwatch-shipments-fall-4-percent-in-q2-2026-huawei-reaches-its-record-share"}, {"category": "g1", "benchmark": false, "company": "佳明 (Garmin)", "leader": "fēnix 9 / fēnix 9 Pro inReach (2026.08)", "col2": "专有低功耗户外 OS + 双频多星定位 + 心率/ECG + 内置双色手电筒", "col3": "Omdia 26Q2 高阶智能手表份额跃升至 15% (追平三星并列第 2)", "col4": "智能模式长达 10–31 天 · 9 Pro 内置 LTE + inReach 双向卫星", "col5": "$999.99–$1,199.99 (Fitness 分部毛利率高达 64%)", "verdict": "垂直硬核运动印钞机：在超马越野跑与多周续航领域筑有深厚壁垒，Apple Watch Ultra 4 升级 50h+卫星正直接切入其腹地。", "sourceLabel": "Garmin & Omdia", "sourceUrl": "https://www.garmin.com/en-US/blog/outdoor/the-difference-between-fenix-8-and-9/"}, {"category": "g1", "benchmark": false, "company": "三星电子 (Samsung Galaxy Watch)", "leader": "Galaxy Watch9 / Watch Ultra2 (2026.07)", "col2": "Wear OS + Galaxy AI + 3nm Exynos W + BioActive 血压校准/ECG", "col3": "25全年出货 ~7% · Omdia 26Q2 高阶智能手表份额 15%", "col4": "Watch9 AOD 30h / Ultra2 (800mAh 5,000 nits) 达 60h · 支持 LTE", "col5": "Watch9 $379.99 起 / Watch Ultra2 $699.99", "verdict": "安卓高端主阵地：Ultra2 屏幕峰值 5,000 nits 参数亮眼，但受限于仅限安卓配对且高端安卓表用户同时被佳明分流。", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/us/samsung-galaxy-watch-ultra2-watch9-health-companion/"}, {"category": "g2", "benchmark": false, "company": "小米集团 (Xiaomi Watch)", "leader": "Xiaomi Watch 5 (Wear OS 6) / Watch S4", "col2": "骁龙 W5 + BES2800 双芯切换 + 首配 EMG 肌电神经手势传感器", "col3": "25全年智能手表出货 9% (#3) · 基础手环品类占全球 45.9% (#1)", "col4": "930mAh 硅碳负极电池实现 Wear OS 智能 6 天 / 省电 18 天", "col5": "Watch 5 欧洲 €299 (~$353) · Redmi/手环覆盖百元走量带", "verdict": "双芯长续航与质价比标杆：硅碳大电池破解了 Wear OS 续航顽疾，但高净值临床健康溢价仍落后于 Apple Watch。", "sourceLabel": "Xiaomi Global", "sourceUrl": "https://www.mi.com/global/product/xiaomi-watch-5/"}, {"category": "g2", "benchmark": false, "company": "小天才 (imoo 电话手表)", "leader": "旗舰 Z10 / Z11 少年版", "col2": "闭环校园“碰一碰加好友”社交网络 + 楼层定位 3.0 + 可拆卸翻转双摄", "col3": "25全年全球智能手表出货份额 ~7%（凭单一儿童表跻身全球前五）", "col4": "780mAh 多日续航 + 4G 视频通话 + 20 米防水", "col5": "¥2,299–¥2,399 (~$320) 锁定中国高客单儿童刚需", "verdict": "独特社交网络效应奇兵：在中国校园形成排他性社交壁垒，Apple 正通过 $249 SE 3“For Your Kids”独立配表在欧美防御。", "sourceLabel": "SQ Smartwatch Stats", "sourceUrl": "https://sqmagazine.co.uk/smartwatch-statistics/"}], "peerRowsEn": [{"category": "g1", "benchmark": true, "company": "Benchmark: Apple Watch", "leader": "Series 12 / Ultra 4 / SE 3", "col2": "watchOS 27 + S11 SiP + 5-sec HR / 24x HRV + Hypertension + Audio AI", "col3": "2025: 23% Units (#1); Q2 26: 33% Global Rev Share · 46% HLOS Share", "col4": "S12 24h / Ultra 4 50h–84h · 5G across tiers + Ultra 4 two-way satellite", "col5": "$249 (SE 3) / $399–$899 (S12) / $799 (Ultra 4)", "verdict": "Global value & clinical ecosystem king: captures 1/3 of industry dollars, constrained only by iOS exclusivity and 1–3 day battery.", "sourceLabel": "Apple & Counterpoint", "sourceUrl": "https://www.apple.com/newsroom/2026/09/introducing-apple-watch-series-12-with-the-all-new-health-sensing-system/"}, {"category": "g2", "benchmark": false, "company": "Huawei (WATCH Series)", "leader": "WATCH 6 / 6 Pro / WATCH 5 / GT 7 Pro", "col2": "HarmonyOS (pairs w/ iOS & Android) + side X-TAP 60-sec 14-metric check", "col3": "2025: 17% (+30% YoY); Q2 26: record 21.8%/22% (#1 units on China stimulus)", "col4": "4.5 days standard / up to 11 days power-saver · Standalone eSIM", "col5": "~$315 (GT 7 Pro) to ~$600+ (WATCH 6 Pro)", "verdict": "Top unit-volume rival: cross-OS compatibility and multi-day endurance shine, though ~80% of shipments concentrate in China.", "sourceLabel": "Counterpoint Q2 26", "sourceUrl": "https://counterpointresearch.com/en/insights/global-smartwatch-shipments-fall-4-percent-in-q2-2026-huawei-reaches-its-record-share"}, {"category": "g1", "benchmark": false, "company": "Garmin Ltd.", "leader": "fēnix 9 / fēnix 9 Pro inReach (Aug 2026)", "col2": "Proprietary low-power OS + multiband GNSS + ECG + built-in LED torch", "col3": "Omdia Q2 26 advanced HLOS share surged from 11% to 15% (tied #2)", "col4": "10–31 days smartwatch battery · Built-in LTE + inReach satellite on 9 Pro", "col5": "$999.99–$1,199.99 (64% Fitness gross margin)", "verdict": "Endurance & outdoor fortress: commands ultra-high margins among serious athletes, though Ultra 4's 50h+satellite narrows the gap.", "sourceLabel": "Garmin & Omdia", "sourceUrl": "https://www.garmin.com/en-US/blog/outdoor/the-difference-between-fenix-8-and-9/"}, {"category": "g1", "benchmark": false, "company": "Samsung (Galaxy Watch)", "leader": "Galaxy Watch9 / Watch Ultra2 (July 2026)", "col2": "Wear OS + Galaxy AI + 3nm Exynos W + BioActive BP/ECG sensor", "col3": "2025: ~7% total share · Omdia Q2 26 advanced HLOS share: 15%", "col4": "Watch9 30h AOD / Ultra2 (800mAh, 5,000 nits) 60h · LTE option", "col5": "$379.99+ (Watch9) / $699.99 (Ultra2)", "verdict": "Android flagship peer: bright 5,000-nit Ultra2 display, but Android-only lock-in faces stiff competition from Garmin.", "sourceLabel": "Samsung Newsroom", "sourceUrl": "https://news.samsung.com/us/samsung-galaxy-watch-ultra2-watch9-health-companion/"}, {"category": "g2", "benchmark": false, "company": "Xiaomi Corp", "leader": "Xiaomi Watch 5 (Wear OS 6) / Watch S4", "col2": "Dual-chip Snapdragon W5 + BES2800 + EMG neural gesture sensor", "col3": "2025: 9% smartwatch share (#3) · #1 global basic band vendor (45.9%)", "col4": "930mAh silicon-carbon battery delivers 6-day Wear OS / 18-day saver", "col5": "€299 (~$353) Watch 5 · High-volume budget S4/Redmi bands", "verdict": "Dual-silicon battery innovator: silicon-carbon anode solves Wear OS battery anxiety, trailing Apple in clinical ASP.", "sourceLabel": "Xiaomi Global", "sourceUrl": "https://www.mi.com/global/product/xiaomi-watch-5/"}, {"category": "g2", "benchmark": false, "company": "imoo (BBK Kids Watch)", "leader": "Flagship Z10 / Z11 Youth Edition", "col2": "Closed-loop tap-to-friend kid social OS + 3D floor-level GPS + dual cams", "col3": "~7% global smartwatch unit share from kids segment alone", "col4": "780mAh multi-day standby + 4G video calling + 20m swimproof", "col5": "~$320 (¥2,299–¥2,399) premium kids positioning in China", "verdict": "Network-effect phenomenon: dominates Chinese schoolyards; Apple defends Western family share via $249 SE 3 For Your Kids.", "sourceLabel": "SQ Smartwatch Stats", "sourceUrl": "https://sqmagazine.co.uk/smartwatch-statistics/"}], "peerUnitLabelZh": "家全球核心腕戴品牌", "peerUnitLabelEn": "Global Smartwatch Brands", "checklistZh": [{"tag": "46% 高阶表份额", "title": "1. 高阶智能手表 (HLOS) 统治力测试：是否稳居全球近半壁江山？", "desc": "剔除百元级基础手环后，Apple Watch 能否继续维持 45%+ 的全球高阶智能手表份额与 33%+ 全口径营收占比？"}, {"tag": "高血压 + Health AI", "title": "2. 临床级传感器与 AI 医疗测试：慢病筛查与循证 AI 是否拉开代差？", "desc": "每 5 秒心率、24x HRV、高血压提醒及 20 万人 OpenEvidence AI 研究能否持续强化医生与中高端用户信任？"}, {"tag": "Ultra 4 50h+卫星", "title": "3. 续航痛点收敛与户外扩圈测试：Ultra 4 是否持续蚕食专业运动表？", "desc": "50h–84h 续航搭配两年免费双向卫星通信，能否持续从佳明等传统千元运动表手中抢夺高净值户外人群？"}, {"tag": "watchOS 27 换机潮", "title": "4. 存量老表淘汰激活测试：停止支持 S6/S7/S8 是否顺利转化为换机增量？", "desc": "超过 1.7 亿活跃底座中的老款表主，是否因 watchOS 27 端侧 Siri AI 与音频智能而加速升级 Series 12？"}, {"tag": "~30% BOM 成本率", "title": "5. 奢侈品级材质溢价测试：钛金属、精密陶瓷与官方表带占比是否稳健？", "desc": "3D 打印再生钛 ($699/$799) 与回归的 $899 精密陶瓷能否对冲 $249 SE 3 走量带来的均价结构下移？"}, {"tag": "96% iPhone 绑定", "title": "6. 生态渗透空间测试：新购表用户中“首购比例”是否继续保持 50% 左右？", "desc": "面对仍有约 69% 尚未配表的存量 iPhone 用户，SE 3 与健康功能能否持续打开首购增量空间？"}], "checklistEn": [{"tag": "46% HLOS Share", "title": "1. Advanced Smartwatch Dominance Test: Does Apple hold ~half of HLOS?", "desc": "Excluding budget fitness bands, does Apple Watch retain ~46% of global HLOS units and ~33% of total smartwatch revenue?"}, {"tag": "Clinical + Health AI", "title": "2. Clinical & Evidence-Based AI Test: Do medical features widen the moat?", "desc": "Do 150-country hypertension alerts, 24x HRV Readiness, and the 200k OpenEvidence study deepen clinical differentiation?"}, {"tag": "Ultra 4 50h+Sat", "title": "3. Endurance & Satellite Expansion Test: Is Ultra 4 taking Garmin share?", "desc": "Does 50h–84h battery life plus 2 years of free two-way satellite win over serious outdoor athletes at $799?"}, {"tag": "watchOS 27 Catalyst", "title": "4. Installed-Base Upgrade Test: Is dropping S6/S7/S8 driving replacements?", "desc": "Are legacy owners within the 170M+ base upgrading to Series 12 / Ultra 4 for watchOS 27 Siri AI and Live Rewind?"}, {"tag": "~30% BOM Ratio", "title": "5. Case & Band Margin Test: Do Ultra, Titanium & Ceramic offset SE 3 mix?", "desc": "Do 3D-printed Titanium ($699/$799), $899 Ceramic, and high-margin bands sustain ~65%+ physical hardware margins?"}, {"tag": ">50% First-Timers", "title": "6. iPhone Penetration Runway Test: Are >50% of buyers still new-to-Watch?", "desc": "With ~69% of iPhone owners not yet wearing an Apple Watch, does SE 3 keep expanding first-time adoption?"}], "quickJumpZh": [{"sec": "sec-00", "title": "00 执行摘要与核心指标", "sub": "~$15.8B 独立营收 · 46% 高阶表份额 · $150.38 BOM"}, {"sec": "sec-01", "title": "01 三阶在售矩阵与复苏引擎", "sub": "Series 12 ($899陶瓷回归) / Ultra 4 (50h+卫星) / SE 3"}, {"sec": "sec-02", "title": "02 临床医疗与四大护城河支柱", "sub": "高血压临床验证 · S11 SiP · 96% 绑定率 · 五维雷达"}, {"sec": "sec-03", "title": "03 全球腕戴竞争格局与 BOM 拆解", "sub": "对比华为/佳明/三星/小米/小天才 · Series 11 5G 拆解"}, {"sec": "sec-04", "title": "04 材质溢价单机经济与毛利推演", "sub": "1.65x 营收出货乘数 · 交互式 5 年腕戴毛利测算器"}, {"sec": "sec-05", "title": "05 三代健康定位跃迁与关键战役", "sub": "纠偏黄金表 → FDA 心电 → 2026 卫星与 20万人 AI 研究"}, {"sec": "sec-06", "title": "06 Apple Watch 护城河核查清单", "sub": "6 项临床可穿戴与高毛利表壳生态健康度自测"}, {"sec": "sec-07", "title": "07 数据来源与拆解临床核验索引", "sub": "SEC EDGAR · Apple Newsroom · TechInsights · Omdia"}], "quickJumpEn": [{"sec": "sec-00", "title": "00 Executive Summary & KPIs", "sub": "~$15.8B Revenue · 46% HLOS Share · $150.38 BOM"}, {"sec": "sec-01", "title": "01 Three-Tier Lineup & Rebound", "sub": "Series 12 (Ceramic) / Ultra 4 (50h+Sat) / SE 3"}, {"sec": "sec-02", "title": "02 Clinical Health & 4 Moat Pillars", "sub": "Hypertension · S11 SiP · 96% Lock-In · 5-Axis Radar"}, {"sec": "sec-03", "title": "03 Global Watch Peers & BOM Teardown", "sub": "vs. Huawei/Garmin/Samsung/Xiaomi · S11 5G BOM"}, {"sec": "sec-04", "title": "04 Case-Tier Economics & Profit Sim", "sub": "1.65x Value Multiplier · 5-Year Gross Profit Sim"}, {"sec": "sec-05", "title": "05 Three-Era Health Pivot & Battles", "sub": "Gold Pivot → FDA ECG → 2026 Satellite & Health AI"}, {"sec": "sec-06", "title": "06 Smartwatch Moat Checklist", "sub": "6-Point Clinical Wearable Moat Scorecard"}, {"sec": "sec-07", "title": "07 Primary Filings & Sources Index", "sub": "SEC EDGAR · Apple Newsroom · TechInsights · Omdia"}]};
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
 