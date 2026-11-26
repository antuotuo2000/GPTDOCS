
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

 var TITLE_ZH = '苹果公司 2026–2032 未来战略与新增长曲线观测站 | 数据中心';
 var TITLE_EN = 'Apple Inc. 2026–2032 Strategic Horizon & Growth Observatory | Research Hub';

 var state = {
 theme: 'dark',
 lang: 'zh',
 activeHz: 0,
 activeEng: 0,
 fView: 'capex',
 sView: 'pen',
 pe: 35,
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
 zh: '站在 $4,788亿 营收与 $5.16万亿市值的历史高点，2026 年 9 月原硬件工程高级副总裁 <strong>John Ternus 正式接替转任执行董事长的 Tim Cook 出任 CEO</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/" target="_blank" rel="noopener noreferrer">官方继任公告 ↗</a>，昭示苹果下一个十年的胜负手重回<strong>“激进硬件形态创新 + 端侧智能架构”</strong>。当硅谷云巨头每年斥资 $600亿–$1,000亿 疯狂囤积 GPU 并背负沉重折旧时，苹果走出了一条截然相反的<strong>“轻资产端侧套利”路线</strong>：把算力硬件成本通过每一台搭载 <strong>M5（每核内置神经网络加速器，AI 性能跃升 3.5 倍）</strong> <a class="cite-link" href="https://www.apple.com/in/newsroom/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/" target="_blank" rel="noopener noreferrer">M5 芯片公报 ↗</a> 与 A20 的终端由消费者买单，再以全新 <strong>Siri AI + Private Cloud Compute</strong> 掌控个人上下文入口；同时借 <strong>C1X 自研基带 + N1 无线芯片</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/03/apple-introduces-iphone-17e/" target="_blank" rel="noopener noreferrer">C1X 首发公报 ↗</a> 回收每年上百亿美元外部芯片税，并向折叠巨屏、<strong>Apple HomeView</strong> 智慧家庭与轻量化空间眼镜梯次扩张 <a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">Q4 FY26 新硬件线 ↗</a>。',
 en: 'At $478.8B in revenue and a ~$5.16T market cap, former Hardware SVP <strong>John Ternus succeeded Tim Cook (now Executive Chairman) as CEO in Sept 2026</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/" target="_blank" rel="noopener noreferrer">Succession Release ↗</a>, signaling a decade centered on <strong>radical hardware form factors + on-device AI</strong>. While hyperscalers spend $60B–$100B+ annually on depreciating GPU farms, Apple runs an <strong>asset-light edge arbitrage</strong>: consumers fund compute inside every <strong>M5 (per-core Neural Accelerators, 3.5x AI leap)</strong> <a class="cite-link" href="https://www.apple.com/in/newsroom/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/" target="_blank" rel="noopener noreferrer">M5 Release ↗</a> and A20 device while <strong>Siri AI + Private Cloud Compute</strong> owns personal context. Meanwhile, <strong>C1X modems + N1 wireless chips</strong> <a class="cite-link" href="https://www.apple.com/newsroom/2026/03/apple-introduces-iphone-17e/" target="_blank" rel="noopener noreferrer">C1X Release ↗</a> recapture billions in RF margins as Apple scales foldables, <strong>Apple HomeView</strong>, and spatial eyewear <a class="cite-link" href="https://www.apple.com/newsroom/2026/11/apple-reports-fourth-quarter-results/" target="_blank" rel="noopener noreferrer">Q4 FY26 Lineup ↗</a>.'
 },
 f2_caption: {
 zh: '战略反差：微软、亚马逊、Alphabet 与 Meta 单年资本开支纷纷飙升至 $65B–$105B 区间，未来数年将面临巨额 GPU 折旧摊销洪峰；而苹果将端侧 NPU 硬件成本直接计入消费者购买的 iPhone/Mac 售价中，自身全年 CapEx 仅 <strong>$9.0B（营收占比 1.9%）</strong>，自由现金流几乎不受侵蚀。',
 en: 'Strategic Contrast: Microsoft, Amazon, Alphabet, and Meta are each spending $65B–$105B/yr on AI data centers—locking in massive depreciation—whereas Apple embeds NPU costs into iPhone/Mac prices, keeping CapEx at just <strong>$9.0B (1.9% of sales)</strong> with FCF unscathed.'
 },
 f3_m5: {
 zh: 'M5 GPU 每核集成专用 Neural Accelerator，端侧 AI 吞吐达 M4 的 3.5 倍、M1 的 5.6 倍 <a class="cite-link" href="https://www.apple.com/in/newsroom/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/" target="_blank" rel="noopener noreferrer">M5 实测 ↗</a>。',
 en: 'M5 GPU integrates per-core Neural Accelerators, delivering 3.5x M4 and 5.6x M1 AI throughput <a class="cite-link" href="https://www.apple.com/in/newsroom/2025/10/apple-introduces-the-powerful-new-ipad-pro-with-the-m5-chip/" target="_blank" rel="noopener noreferrer">M5 Specs ↗</a>.'
 },
 f3_c1x: {
 zh: '第二代自研基带 C1X 已登陆 iPhone 17e 与 iPad Pro，速度翻倍且功耗降低 30% <a class="cite-link" href="https://www.apple.com/newsroom/2026/03/apple-introduces-iphone-17e/" target="_blank" rel="noopener noreferrer">C1X 公报 ↗</a>，正迈向 Pro 毫米波全覆盖。',
 en: '2nd-gen C1X modem debuts in iPhone 17e &amp; iPad Pro at 2x speed and -30% power draw <a class="cite-link" href="https://www.apple.com/newsroom/2026/03/apple-introduces-iphone-17e/" target="_blank" rel="noopener noreferrer">C1X Release ↗</a>, scaling toward Pro mmWave.'
 },
 f3_n1: {
 zh: '全新自研 N1 无线网络芯片同步替代外部连接芯片，原生集成智能家居 Thread 网格协议 <a class="cite-link" href="https://www.apple.com/ipad-pro/" target="_blank" rel="noopener noreferrer">N1 规格 ↗</a>。',
 en: 'In-house N1 wireless chip replaces third-party Wi-Fi/BT silicon with native Thread mesh <a class="cite-link" href="https://www.apple.com/ipad-pro/" target="_blank" rel="noopener noreferrer">N1 Specs ↗</a>.'
 },
 f3_caption: {
 zh: '商业推演：继 M1 全面替代英特尔每年为 Mac 节省逾 $25亿–$30亿 成本后，C 系列蜂窝基带与 N 系列无线芯片在 2028–2030 年实现全系超过 2.4 亿台 iPhone/iPad 覆盖后，有望每年再内化 <strong>$60亿–$85亿</strong> 硬件毛利并释放主板电池空间。',
 en: 'Economic Projection: Following M1’s $2.5B–$3.0B/yr Mac savings, C-series modems and N-series RF chips across 240M+ annual iPhones/iPads by 2028–2030 can internalize <strong>$6.0B–$8.5B/yr</strong> in hardware gross profit while freeing battery space.'
 }
 };

 var HORIZONS = [
 {
 badge: 'HORIZON 1 · HIGH-CERTAINTY EXECUTION (2026–2027)',
 badgeZh: 'HORIZON 1 · 高确定性业绩兑现期 (2026–2027)',
 titleZh: '折叠屏产能三倍释放 × Siri AI 全系渗透 × 触控 Mac 首秀',
 titleEn: '3x Foldable Ramp × Siri AI Rollout × Touch Mac Debut',
 itemsZh: [
 '<strong>iPhone Duo 良率突破：</strong>Counterpoint 预计 2027 年苹果折叠机出货量激增近 3 倍，持续拉升超高端 ASP。',
 '<strong>春季双波段闭环：</strong>2027 春季标准版 iPhone 18 与 e 系列补齐，消除上半年传统淡季缺口。',
 '<strong>Touch Mac 与 HomeView：</strong>首次引入触控屏 Mac 与新一代智能家居中枢硬件，激活存量多端增购。'
 ],
 itemsEn: [
 '<strong>iPhone Duo Yield Scale:</strong> Counterpoint projects ~3x foldable shipment growth in 2027, lifting ultra-premium ASP.',
 '<strong>Spring Dual-Wave Cadence:</strong> Spring 2027 base iPhone 18 &amp; e-series eliminate H1 seasonal revenue troughs.',
 '<strong>Touch Mac &amp; HomeView:</strong> First touchscreen Mac and next-gen Home hub drive multi-device household upgrades.'
 ],
 probZh: '兑现确定性：极高 (90%+)', probEn: 'Conviction: Very High (90%+)',
 impactZh: '年化增量营收池：+$45B–$65B', impactEn: 'Incremental Pool: +$45B–$65B/yr'
 },
 {
 badge: 'HORIZON 2 · STRUCTURAL MARGIN EXPANSION (2028–2029)',
 badgeZh: 'HORIZON 2 · 结构性毛利跃升期 (2028–2029)',
 titleZh: '全系清退外部基带 × AI Agent 订阅变现 × 折叠 iPad/Mac 扩圈',
 titleEn: '100% RF Autonomy × AI Agent Monetization × Foldable iPad/Mac',
 itemsZh: [
 '<strong>C2/C3 毫米波基带满贯：</strong>自研蜂窝基带与 N 系列无线芯片覆盖 Pro 旗舰全系，每年内化逾 $70亿 芯片毛利。',
 '<strong>AI 意图分发抽成：</strong>Siri 成为跨应用交易总入口，开辟高阶个人助理订阅与第三方模型竞价分润。',
 '<strong>桌面带机械臂家庭终端：</strong>结合 HomeView、FaceTime 追踪与家庭管家 AI，切入智慧养老与居家陪伴。'
 ],
 itemsEn: [
 '<strong>C2/C3 mmWave Full Sweep:</strong> In-house modems &amp; N-series RF across Pro flagships internalize $7B+/yr in chip margin.',
 '<strong>AI Intent Tollbooth:</strong> Siri becomes the cross-app execution layer, unlocking Pro AI tiers and 3P model rev-share.',
 '<strong>Robotic Home Companion:</strong> HomeView + FaceTime tracking + home AI expand into ambient domestic robotics.'
 ],
 probZh: '兑现确定性：中高 (75%)', probEn: 'Conviction: High (75%)',
 impactZh: '年化增量营收池：+$85B–$120B', impactEn: 'Incremental Pool: +$85B–$120B/yr'
 },
 {
 badge: 'HORIZON 3 · POST-SMARTPHONE SINGULARITY (2030–2032)',
 badgeZh: 'HORIZON 3 · 后智能手机奇点期 (2030–2032)',
 titleZh: '轻量化全天候 AR 眼镜 × 光学无创血糖/血压连续监测',
 titleEn: 'All-Day Lightweight AR Glasses × Non-Invasive Photonics Health',
 itemsZh: [
 '<strong>空间计算大众化：</strong>visionOS 沉淀十年空间应用生态后，随 Micro-LED 光波导成熟推出 &lt;75g 全天候智能眼镜。',
 '<strong>医疗级预防医学革命：</strong>硅光子芯片攻克 Apple Watch 无创血糖趋势预警与血压监测，绑定亿级慢病管理订阅。',
 '<strong>1.4nm 级 3D 堆叠硅片：</strong>端侧本地运行百亿参数多模态个人数字孪生模型。'
 ],
 itemsEn: [
 '<strong>Mass Spatial Computing:</strong> After a decade of visionOS maturity, Micro-LED waveguides enable &lt;75g all-day smart glasses.',
 '<strong>Preventative Health Leap:</strong> Silicon photonics unlocks non-invasive glucose trending &amp; BP alerts for 500M+ users.',
 '<strong>1.4nm 3D-Stacked Silicon:</strong> Runs 10B+ parameter multimodal personal digital twins entirely on-device.'
 ],
 probZh: '兑现确定性：远期期权 (45%–55%)', probEn: 'Conviction: Optionality (45%–55%)',
 impactZh: '年化增量营收池：+$130B+', impactEn: 'Incremental Pool: +$130B+/yr'
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
 badge: 'ENGINE 01 · ON-DEVICE SIRI AI & AGENT GATEKEEPER',
 titleZh: '端侧 Siri AI × Private Cloud Compute：把 App Store 升级为“AI 意图结算中心”',
 titleEn: 'On-Device Siri AI × Private Cloud Compute: Turning OS Into the AI Intent Clearinghouse',
 descZh: '在传统移动互联网时代，用户手动点开 App，苹果通过应用下载与内购抽成；在 AI Agent 时代，全新 Siri AI 直接跨应用读取用户邮件、日历、照片与位置上下文（App Intents 框架），在本地完成 85%+ 高频推理，复杂任务无缝调用自研 Apple Silicon 服务器集群构建的“私有云计算（Private Cloud Compute）”。无论外部大模型如何混战，只要想触达全球消费力最强的 25 亿终端用户，就必须接入苹果系统级入口并分享订阅或交易分成。',
 descEn: 'In the mobile era, users tapped apps manually; in the Agent era, Siri AI reads personal context across Mail, Calendar, and Photos via App Intents—executing 85%+ locally and routing complex queries to Apple Silicon Private Cloud Compute. Any frontier model seeking Apple’s 2.5B affluent devices must plug into OS intent routing.',
 formulaZh: '变现双轮：(1) 大运存硬件强制换机周期缩短 + (2) Siri AI 高阶代理订阅 / 第三方大模型接入分润（毛利率 &gt;78%）',
 formulaEn: 'Dual Monetization: (1) Shorter high-RAM upgrade cycles + (2) Siri AI Pro subscriptions &amp; 3P model rev-share (&gt;78% GM)',
 gaugesZh: [['3.5x', 'M5 每核神经加速器 AI 跃升'], ['0 数据留存', 'Private Cloud 密码学隐私验证'], ['2.5B+ 终端', '全球最大端侧推理算力网'], ['2026–2028', '商业化加速变现主窗口']],
 gaugesEn: [['3.5x', 'M5 Per-Core AI Throughput'], ['Zero Retention', 'Cryptographically Verified PCC'], ['2.5B+ Devices', 'Largest Edge Inference Mesh'], ['2026–2028', 'Primary Monetization Window']]
 },
 {
 badge: 'ENGINE 02 · C1X/C2 MODEM & N1 WIRELESS SOVEREIGNTY',
 titleZh: '射频通信全芯独立：攻克手机主板最后一块外部高毛利领地',
 titleEn: 'Full RF Silicon Sovereignty: Capturing the Last External Margin Pool on the Logic Board',
 descZh: '过去苹果虽掌控 A/M 系列主芯片，但蜂窝基带与 Wi-Fi/蓝牙组合芯片长期受制于高通与博通，每年支付高昂芯片溢价与专利费。随着 C1X 自研基带（速度较 C1 翻倍、功耗较前代旗舰降 30%）在 iPhone 17e 与 iPad Pro 成功验证，以及原生支持 Wi-Fi 7、蓝牙 6 与 Thread 的自研 N1 无线芯片规模商用，苹果正按既定节奏迈向全系射频自给自足。',
 descEn: 'While Apple owned A/M SoCs, cellular modems and Wi-Fi/BT combos remained external margin drains. With 2nd-gen C1X (2x speed, -30% power) proven in iPhone 17e and iPad Pro alongside the N1 Wi-Fi 7/BT 6/Thread chip, Apple is systematically retiring third-party RF dependencies.',
 formulaZh: '利润传导：每台节省 $22–$35 外部通信芯片溢价 × 2.5亿+ 年出货终端 ≈ 年化直接增厚 $60亿–$85亿 硬件毛利',
 formulaEn: 'Margin Flow: $22–$35/unit RF savings × 250M+ annual devices ≈ $6.0B–$8.5B/yr incremental hardware gross profit',
 gaugesZh: [['2.0x 提速', 'C1X 相比初代 C1 蜂窝吞吐'], ['-30% 功耗', 'C1X 显著延长全天续航'], ['Wi-Fi 7 + Thread', 'N1 无线芯片三合一集成'], ['+200bps', '全面切换后硬件毛利率提振']],
 gaugesEn: [['2.0x Speed', 'C1X Throughput vs. Gen-1 C1'], ['-30% Power', 'C1X Battery Efficiency Gain'], ['Wi-Fi 7 + Thread', 'N1 3-in-1 Wireless SoC'], ['+200bps', 'Hardware Gross Margin Uplift']]
 },
 {
 badge: 'ENGINE 03 · FOLDABLE MULTI-FORM-FACTOR & TOUCH MAC',
 titleZh: '形态破局红利：从首款折叠 iPhone Duo 迈向巨屏折叠 iPad 与触控 Mac',
 titleEn: 'Form-Factor Renaissance: Foldable iPhone Duo, Folding iPad &amp; Touch Mac',
 descZh: '智能手机直板形态演进十五年后趋于收敛，iPhone Duo 首秀即点燃 $2,000 超高端换机热情，Counterpoint 预测 2027 年苹果折叠屏出货量将翻近三倍。更重要的是，苹果将零折痕柔性屏与触控交互首次延伸至 Mac 产线（Touch Mac 与 MacBook Neo），打破笔电与平板边界，开启新一轮生产力终端单价上移。',
 descEn: 'After 15 years of slab convergence, foldable iPhone Duo unlocked a $2,000+ super-premium tier—with Counterpoint forecasting ~3x unit growth in 2027. Extending crease-free displays and touch input to Mac (Touch Mac &amp; MacBook Neo) blurs laptop/tablet lines and lifts ASPs.',
 formulaZh: '变现逻辑：超高端形态扩容（ASP +$700）+ AppleCare+ 折叠屏高单价延保高附着率（&gt;45%）',
 formulaEn: 'Monetization: Super-premium ASP expansion (+$700) + high-margin foldable AppleCare+ attach (&gt;45%)',
 gaugesZh: [['~3.0x', '2027E 折叠机型出货增长倍数'], ['$1,999+', '超高端价格天花板成功重构'], ['Touch Mac', '40年首次打通 Mac 触控交互'], ['+24% YoY', 'Q3 2026 Mac 营收逆势领跑']],
 gaugesEn: [['~3.0x', '2027E Foldable Unit Growth'], ['$1,999+', 'New Ultra-Premium Price Anchor'], ['Touch Mac', 'First Touchscreen Mac Architecture'], ['+24% YoY', 'Q3 2026 Mac Revenue Momentum']]
 },
 {
 badge: 'ENGINE 04 · APPLE HOMEVIEW & AMBIENT HOME ROBOTICS',
 titleZh: '智慧家庭中枢：以 Apple HomeView + Thread 网格夺回客厅环境计算入口',
 titleEn: 'Ambient Home Hub: Reclaiming the Living Room via HomeView + Thread Mesh',
 descZh: '苹果在 FY26Q4 正式推出新一代智能家居硬件矩阵（Apple HomeView、HomePod mini 2 等），并通过全系搭载 N1 芯片的 iPhone/iPad 构建无缝 Thread 低功耗家庭物联网。结合端侧 Siri 声纹/人脸识别与家庭安防云存储，苹果正把家庭屏幕从被动音箱升级为主动感知的家庭数字管家。',
 descEn: 'Launched in Q4 FY26, Apple HomeView and HomePod mini 2 pair with N1-powered Thread networking across every iPhone and iPad—turning passive smart speakers into proactive ambient home hubs backed by HomeKit Secure Video and iCloud+.',
 formulaZh: '变现逻辑：家庭中枢硬件普及 + iCloud+ HomeKit 安全视频多路存储与家庭 Apple One 渗透率跃升',
 formulaEn: 'Monetization: Home hub hardware adoption + iCloud+ HomeKit video storage &amp; Family Apple One upsell',
 gaugesZh: [['HomeView', '新一代家庭显控中枢入口'], ['Thread 协议', 'N1 芯片全系原生内置组网'], ['家庭账户锁死', '全屋智能使跨生态迁移归零'], ['+$18B+', '2030E 智慧家庭软硬合计空间']],
 gaugesEn: [['HomeView', 'Next-Gen Ambient Home Hub'], ['Thread Mesh', 'Native N1 Low-Power Networking'], ['Household Lock', 'Zero Churn Across Smart Homes'], ['+$18B+', '2030E Combined Home TAM']]
 },
 {
 badge: 'ENGINE 05 · VISIONOS & LIGHTWEIGHT AR EYEWEAR',
 titleZh: '空间计算十年长征：Vision Pro 锻造开发者底座，终局指向全天候 AR 眼镜',
 titleEn: 'Spatial Long March: Vision Pro Forges the OS; All-Day AR Glasses Are the Endgame',
 descZh: '正如初代 Apple Watch 历经三代找准健康定位，Apple Vision Pro 的战略使命是提前锁定全球空间计算交互标准（眼手追踪）、3D 内容格式（Spatial Video）与企业级数字孪生工作流。随着碳化硅光波导与高能效 2nm 芯片成熟，轻量化 Apple Glass 将与 iPhone 算力协同，承接后屏幕时代的第一视角入口。',
 descEn: 'Just as Apple Watch took three generations to nail preventative health, Vision Pro locks in eye-and-hand spatial UI standards and enterprise workflows before Micro-LED waveguides and 2nm silicon unlock lightweight Apple Glass tethered to iPhone.',
 formulaZh: '战略定位：短期不追求走量毛利，提前卡位下一代操作系统（visionOS）标准制定权与应用税底座',
 formulaEn: 'Strategic Role: Pre-empts next-gen OS standard-setting (visionOS) and spatial app tollbooths',
 gaugesZh: [['visionOS', '全球唯一成熟空间计算 OS'], ['眼动+手势', '确立后触控时代交互直觉'], ['端机算力分担', '借 iPhone 无线协处理减重'], ['2029–2031', '轻量化眼镜大众商业化窗口']],
 gaugesEn: [['visionOS', 'Leading Spatial OS Ecosystem'], ['Eye + Hand', 'Post-Touch Input Standard'], ['iPhone Offload', 'Wireless Compute Keeps Weight Low'], ['2029–2031', 'Consumer Eyewear Inflection']]
 },
 {
 badge: 'ENGINE 06 · NON-INVASIVE PHOTONICS & PREVENTATIVE HEALTH',
 titleZh: '硅光子无创生物传感：库克口中“苹果对人类最大贡献”的终极形态',
 titleEn: 'Silicon Photonics Biosensing: Preventative Healthcare at Billion-Wrist Scale',
 descZh: '苹果秘密攻关十余年的硅光子吸收光谱无创血糖趋势监测、连续无袖带血压预警与睡眠呼吸暂停医疗认证，正在将 Apple Watch 与 AirPods（体温/心率/助听）从消费电子升级为 24 小时贴身生命体征哨兵。一旦无创血糖趋势预警落地，全球逾 5 亿糖尿病前期及健康焦虑人群将形成无价的刚需换机潮。',
 descEn: 'Over a decade of secret silicon photonics R&amp;D targets non-invasive glucose trending and cuffless blood pressure alerts—elevating Apple Watch and AirPods from gadgets into 24/7 clinical-grade guardians for 500M+ pre-diabetic and health-conscious users.',
 formulaZh: '变现逻辑：医疗级独占传感器驱动穿戴硬件二次爆发 + AI 私人健康教练高粘性订阅服务',
 formulaEn: 'Monetization: Exclusive clinical sensors trigger Wearables super-cycle + recurring AI health coaching',
 gaugesZh: [['硅光子芯片', '底层光学光谱自研专利壁垒'], ['Watch + AirPods', '双穿戴多模态体征交叉核验'], ['FDA 级认证', '构筑消费品牌极难跨越的临床门槛'], ['>5亿人群', '全球慢病预警潜在刚需受众']],
 gaugesEn: [['Silicon Photonics', 'Proprietary Optical Spectroscopy'], ['Watch + AirPods', 'Dual-Wearable Sensor Fusion'], ['FDA Clearances', 'Clinical Moat Rivals Cannot Copy'], ['500M+ Users', 'Global Preventative Health TAM']]
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

 // Horizon & Engine click handlers
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

 // High-DPI Canvas Helpers
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
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'Apple $9B (1.9% of Sales) vs. Hyperscalers ($66B–$102B)' : '苹果仅 $9B (1.9% 营收占比) vs 云巨头 $66B–$102B 军备竞赛') + '</span>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-primary mono">' + (en ? 'FY2026 ($478.8B) → FY2032E (~$746B) Multi-Horizon Bridge' : 'FY2026 ($478.8B) → FY2032E (~$746B) 多曲线营收增量阶梯') + '</span>';
 }
 }

 function renderSiliconLegend() {
 var leg = document.getElementById('siliconLegend');
 if (!leg) return;
 var en = isEn();
 if (state.sView === 'pen') {
 leg.innerHTML =
 '<button type="button" class="legend-pill' + (state.silSeries.mod ? '' : ' muted') + '" data-sil-series="mod"><span class="legend-dot" style="background:var(--mui-primary-main);"></span><span>' + (en ? 'C-Series Cellular Modem (%)' : 'C系自研蜂窝基带渗透率 (%)') + '</span></button>' +
 '<button type="button" class="legend-pill' + (state.silSeries.wf ? '' : ' muted') + '" data-sil-series="wf"><span class="legend-dot" style="background:var(--mui-violet-text);"></span><span>' + (en ? 'N-Series Wi-Fi/BT/Thread (%)' : 'N系自研无线连接芯片渗透率 (%)') + '</span></button>';
 } else {
 leg.innerHTML = '<span class="mui-chip mui-chip-success mono">' + (en ? 'Annual External RF &amp; Modem BOM Savings ($B)' : '自研射频/基带年化节省外部采购与专利溢价 ($B)') + '</span>';
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
 { name: 'Amazon', cap: 102.0, col: pal.amber, tip: en ? 'Heavy AWS & fulfillment CapEx topping $100B/yr' : 'AWS 与履约重资本投入，年度 CapEx 破千亿美元' },
 { name: 'Microsoft', cap: 86.0, col: pal.blue, tip: en ? 'Global AI data-center & GPU cluster expansion' : '全球 AI 数据中心与 GPU 集群重度扩张' },
 { name: 'Alphabet', cap: 75.0, col: pal.violet, tip: en ? 'TPU & AI server infrastructure buildout' : 'TPU 集群与搜索/云 AI 基础设施高强度投入' },
 { name: 'Meta', cap: 66.0, col: pal.red, tip: en ? 'Llama training clusters with no direct cloud rental revenue' : 'Llama 训练集群重金投入，无直接云出租回血' },
 { name: 'Apple (AAPL)', cap: 9.0, col: pal.green, tip: en ? 'FY26 CapEx just $9.0B (1.9% of sales); consumers fund edge NPU hardware, leaving $136.1B FCF' : 'FY2026 CapEx 仅 $9.0B（占营收 1.9%）！端侧推理硬件由用户买单，FCF 高达 $136.1B' }
 ];
 var maxC = 115;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
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
 drawValueBadge(ctx, '$' + p.cap.toFixed(0) + 'B', cx, yt - 12, p.col, pal);
 ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(p.name, cx, pad.top + ph + 20);
 hits.futureCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26, title: p.name + (en ? ' Annual CapEx' : ' 年度资本开支'), body: p.tip });
 });
 } else {
 var steps = [
 { lbl: en ? 'FY26 Base' : 'FY26基准', v: 478.8, b: 0, col: pal.blue, tip: en ? 'FY2026 Actual Net Sales: $478.83B' : 'FY2026 实际总营收: $478.83B' },
 { lbl: en ? '+Core Svcs' : '+核心服务复利', v: 98.0, b: 478.8, col: pal.green, tip: en ? 'Organic Services, Ads & Pay compounding: +$98B' : '存量订阅、广告与支付自然增长贡献 +$98B' },
 { lbl: en ? '+Fold/Mac' : '+折叠/Mac升级', v: 68.0, b: 576.8, col: pal.violet, tip: en ? 'iPhone Duo scale, Pro ASP lift & Touch Mac: +$68B' : 'iPhone Duo 放量、Pro 均价上移与触控 Mac 贡献 +$68B' },
 { lbl: en ? '+Siri AI' : '+Siri AI变现', v: 46.0, b: 644.8, col: pal.amber, tip: en ? 'Siri AI Pro tier & 3P Agent rev-share: +$46B' : 'Siri AI 高阶代理包与模型分发抽成贡献 +$46B' },
 { lbl: en ? '+Home/Health' : '+家庭/空间健康', v: 55.0, b: 690.8, col: pal.green, tip: en ? 'HomeView, AR Eyewear & Clinical Health: +$55B' : 'HomeView 家庭终端、AR 眼镜与医疗传感贡献 +$55B' },
 { lbl: en ? 'FY32E Target' : 'FY32E蓝图', v: 745.8, b: 0, col: pal.blue, tip: en ? 'FY2032E Horizon Target: ~$746B (>35% high-margin Services/AI)' : 'FY2032E 远期营收蓝图: ~$746B（高毛利服务与AI占比超 35%）' }
 ];
 var maxB = 820;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
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
 drawValueBadge(ctx, (s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', cx, yt - 12, s.col, pal);
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
 var yrs = ['2025 (C1)', '2026 (C1X+N1)', '2027E (C2)', '2028E', '2029E', '2030E'];

 if (state.sView === 'pen') {
 var modPen = [8, 24, 55, 82, 96, 100];
 var wfPen = [0, 32, 68, 92, 100, 100];
 for (var g = 0; g <= 4; g++) {
 var gv = g * 25, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
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
 title: y + (en ? ' Custom RF Penetration' : ' 自研通信芯片渗透率'),
 body: (en ? 'C-Modem: ' : 'C系基带: ') + modPen[idx] + '% · ' + (en ? 'N-Wireless: ' : 'N系无线: ') + wfPen[idx] + '%'
 });
 });
 function plotP(arr, col, fillTop) {
 var pts = arr.map(function (v, idx) { return { x: pad.left + idx * stepX, y: pad.top + ph - (v / 100) * ph, v: v }; });
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
 if (idx === 1 || idx === 5 || isHov) drawValueBadge(ctx, pt.v + '%', pt.x, pt.y - 13, col, pal);
 });
 }
 if (state.silSeries.mod) plotP(modPen, pal.blue, 'rgba(0, 115, 230, 0.18)');
 if (state.silSeries.wf) plotP(wfPen, pal.violet, 'rgba(124, 58, 237, 0.16)');
 } else {
 var saved = [0.6, 2.1, 4.3, 6.2, 7.4, 8.2];
 var maxS = 9.5;
 for (var m = 0; m <= 3; m++) {
 var mv = (m * 3).toFixed(0), my = pad.top + ph - ((m * 3) / maxS) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, x = cx - bw / 2;
 var bh = (saved[i] / maxS) * ph, yt = pad.top + ph - bh;
 if (state.hover.siliconCanvas === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRect(ctx, pad.left + i * slot + 2, pad.top, slot - 4, ph, 7); ctx.fill();
 }
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 if (state.hover.siliconCanvas === i) { ctx.strokeStyle = pal.text; ctx.lineWidth = 1.5; ctx.stroke(); }
 drawValueBadge(ctx, '$' + saved[i].toFixed(1) + 'B', cx, yt - 12, i >= 3 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hits.siliconCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 26,
 title: y + (en ? ' Annual BOM Savings' : ' 自研通信芯片年化节流'),
 body: (en ? 'Projected annual external chip & royalty savings: ~$' : '预计全年节省外部芯片采购与专利溢价约 $') + saved[i].toFixed(1) + 'B'
 });
 });
 }
 }

 var OPT_DATA = { ai: { rev: 32, net: 20.5 }, rf: { rev: 0, net: 6.1 }, fold: { rev: 44, net: 13.8 }, home: { rev: 18, net: 6.4 }, ar: { rev: 38, net: 14.2 } };
 var miniCaps = [5.16, 5.39, 6.87];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.optMiniCanvas = [];
 var pad = { top: 24, right: 18, bottom: 26, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['Current Cap', '2030 Core', '2030 + Options'] : ['当前市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(8.5, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
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
 drawValueBadge(ctx, '$' + v.toFixed(2) + 'T', cx, yt - 12, col, pal);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(lbls[i], cx, pad.top + ph + 16);
 hits.optMiniCanvas.push({
 idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24,
 title: lbls[i],
 body: (en ? 'Implied Market Cap at ' + state.pe + 'x P/E: $' : state.pe + 'x P/E 隐含市值: $') + v.toFixed(2) + 'T'
 });
 });
 }

 function recalcOptionality() {
 var baseRev = 574.0, baseNet = 154.0, sh2030 = 13.15;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addNet += d.net; }
 }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var eps = totNet / sh2030;
 var mcapT = (totNet * state.pe) / 1000;
 var baseMcapT = (baseNet * state.pe) / 1000;

 document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

 miniCaps = [5.16, baseMcapT, mcapT];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 35;
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

 // Quick Jump ⌘K
 var QITEMS_ZH = [
 { id: 'sec-f0', t: 'F0 特努斯新政与三阶战略时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: '端侧Siri AI · C1X/N1全芯自主 · 折叠家族 · HomeView · AR与无创血糖' },
 { id: 'sec-f2', t: 'F2 反共识 AI 轻资产纪律与 2032 营收桥', s: '苹果 $9B CapEx 对比云巨头千亿投入 · 迈向 $746B 营收阶梯' },
 { id: 'sec-f3', t: 'F3 射频与基带全芯主权路线图', s: 'M5 神经加速器 + C1X 基带 + N1 Wi-Fi 7/Thread 年省 $80B+ 溢价' },
 { id: 'sec-f4', t: 'F4 2030 冲击 $7万亿市值期权组装器', s: '自由开关五大新业务期权与估值倍数实时测算 EPS' }
 ];
 var QITEMS_EN = [
 { id: 'sec-f0', t: 'F0 Ternus Era & 3-Horizon S-Curve Radar', s: '2026–2032 Near / Mid / Long-Term Catalysts & Conviction' },
 { id: 'sec-f1', t: 'F1 Six Future Growth Engines Explorer', s: 'Edge Siri AI · C1X/N1 RF · Foldables · HomeView · AR & Glucose' },
 { id: 'sec-f2', t: 'F2 Anti-Consensus AI CapEx & 2032 Bridge', s: 'Apple $9B CapEx vs. Hyperscalers · Bridge to ~$746B' },
 { id: 'sec-f3', t: 'F3 Full RF & Modem Silicon Sovereignty', s: 'M5 Neural + C1X Modem + N1 Wi-Fi 7/Thread Saving $6B–$8.5B/yr' },
 { id: 'sec-f4', t: 'F4 2030 $7T Market Cap Optionality Builder', s: 'Toggle 5 Growth Catalysts & P/E Multiples Live' }
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
 