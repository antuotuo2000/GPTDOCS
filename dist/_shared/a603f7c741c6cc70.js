
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_DENSITY_KEY = 'nvda_density_v1';
    var STORAGE_SIDEBAR_KEY = 'nvda_sidebar_collapsed_v1';
    var STORAGE_CHECK_KEY = 'nvda_bm_check_v1';

    var RICH_MAP = {
      hero_h1: {
        zh: 'NVIDIA 英伟达商业模式深度研究报告：<span class="gradient-accent">如何以“六芯协同 + CUDA 生态”独揽全球 AI 算力七成以上价值池？</span>',
        en: 'NVIDIA Business Model Deep-Dive Report: <span class="gradient-accent">How 6-Chip Codesign &amp; CUDA Capture &gt;75% of Global AI Compute Value</span>'
      },
      lead_prose: {
        zh: '在 AI 基础设施资本开支突破万亿美元周期的 2026 年，英伟达为何能以轻晶圆厂（Fabless）模式在 Q3 FY2027 轰出 <strong>$1,158.4 亿美元单季营收（同比 +103.2%）</strong> 与 <strong>74.8% GAAP 毛利率</strong> <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 FY27 PR ↗</a>？核心密码在于其完成了三次商业模式升维：第一，<strong>从“卖单颗 GPU 加速卡”升维为“按吉瓦 (GW) 交付整机柜 AI 工厂”</strong>，以 Vera Rubin NVL72 实现六颗自研芯片（Vera CPU、Rubin GPU、NVLink 6、ConnectX-9、BlueField-4、Spectrum-X）的极限协同设计 <a class="cite-link" href="https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/" target="_blank" rel="noopener noreferrer">Vera Rubin ↗</a>；第二，<strong>“免费 CUDA + 收费 NIM / AI Enterprise”双边软件飞轮</strong>，将超 500 万开发者与企业推理微服务牢牢锁死在单一架构栈上；第三，以 <strong>$3,900 亿美元供应链与 HBM 产能承诺</strong>锁死上游先进封装与存储资源，把物理产能稀缺转化为持续的定价权与 66.9% 营业利润率。',
        en: 'In 2026, why does asset-light fabless NVIDIA generate <strong>$115.84B in Q3 FY2027 quarterly revenue (+103.2% YoY)</strong> at a <strong>74.8% GAAP gross margin</strong> <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 FY27 PR ↗</a>? Three structural upgrades explain it: (1) <strong>Selling rack-scale "AI Factories" by the gigawatt</strong> via Vera Rubin NVL72’s six-chip extreme codesign <a class="cite-link" href="https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/" target="_blank" rel="noopener noreferrer">Vera Rubin ↗</a>; (2) <strong>A free CUDA + paid NIM / AI Enterprise flywheel</strong> locking in 5M+ developers and enterprise inference; and (3) <strong>$390B in multi-year supply commitments</strong> securing scarce CoWoS packaging and HBM4 memory to sustain a 66.9% operating margin.'
      },
      kpi_desc_0: {
        zh: '环比 Q2 ($96.2B) 再增 20.4%，Q4 FY27 业绩指引更上看 $130.0B（含第 14 周）<a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1045810/000104581026000088/q3fy27cfocommentary.htm" target="_blank" rel="noopener noreferrer">SEC CFO ↗</a>。',
        en: 'Up 20.4% QoQ from Q2 ($96.2B), with Q4 FY27 outlook reaching $130.0B (14-week quarter) <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1045810/000104581026000088/q3fy27cfocommentary.htm" target="_blank" rel="noopener noreferrer">SEC CFO ↗</a>.'
      },
      kpi_desc_1: {
        zh: '同比 +110%，其中超大规模云厂商贡献 $60.1B，AI 云/政企 (ACIE) 贡献 $47.5B <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">SEC Analysis ↗</a>。',
        en: 'Up 110% YoY; Hyperscale contributed $60.1B and ACIE (AI Cloud &amp; Enterprise) $47.5B <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">SEC Analysis ↗</a>.'
      },
      kpi_desc_2: {
        zh: '单季营业利润达 $77.52B，GAAP 净利润 $65.29B (+105% YoY)，稀释 EPS $2.70 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 8-K ↗</a>。',
        en: 'Operating income hit $77.52B, GAAP net income $65.29B (+105% YoY), diluted EPS $2.70 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 8-K ↗</a>.'
      },
      kpi_desc_3: {
        zh: '仅 Q3 单季自由现金流即达 $43.78B，账面尚余 $2,273 亿股票回购授权额度 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Cash Flow ↗</a>。',
        en: 'Q3 FCF alone hit $43.78B, with $227.3B remaining under share repurchase authorization <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Cash Flow ↗</a>.'
      },
      pr_desc_0: {
        zh: '单卖芯片易受价格透明化冲击；Vera Rubin NVL72 把 CPU、GPU、NVLink 6 交换机、DPU 与液冷参考设计打包，显著提升每 1 GW 数据中心的英伟达价值捕获 <a class="cite-link" href="https://www.simpletechtrend.com/en/post/nvda-q2-fy2027-earnings-vera-rubin-neocloud-en" target="_blank" rel="noopener noreferrer">$/GW Capture ↗</a>。',
        en: 'Discrete chips face price transparency; Vera Rubin NVL72 bundles CPU, GPU, NVLink 6, DPU, and liquid-cooled reference designs to maximize revenue capture per GW <a class="cite-link" href="https://www.simpletechtrend.com/en/post/nvda-q2-fy2027-earnings-vera-rubin-neocloud-en" target="_blank" rel="noopener noreferrer">$/GW Capture ↗</a>.'
      },
      pr_desc_1: {
        zh: '随着推理侧进入长思维链（Test-time Scaling）与多智能体并发，延迟与 KV Cache 吞吐成为核心瓶颈，Vera Rubin 与 Groq 技术整合强化低延迟推理护城河 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 Release ↗</a>。',
        en: 'As inference shifts to test-time scaling and multi-agent concurrency, latency and KV-cache throughput dominate—reinforced by Vera Rubin and Groq integration <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 Release ↗</a>.'
      },
      pr_desc_2: {
        zh: '英伟达资产负债表持有 $44.2B 公开股权及 $65.5B 非公开战略股权投资（较年初翻近三倍），扶持 CoreWeave、Nebius 等 Neocloud 成为独立于云巨头的算力买家 <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">Neocloud Base ↗</a>。',
        en: 'Holding $44.2B in marketable equity and $65.5B in non-marketable stakes (nearly 3x YTD), NVIDIA backs Neoclouds like CoreWeave and Nebius to diversify buyer demand <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">Neocloud Base ↗</a>.'
      },
      ch1_alert: {
        zh: '<strong>Q3 FY27 核心变动与承诺披露：</strong>截至 2026 年 10 月 25 日，英伟达供应链与产能采购承诺升至 <strong>$3,900 亿美元</strong>（Q2 为 $2,790 亿），总未来承诺 $5,180 亿 + $320 亿 Neocloud 协议；同时 11 月 11 日创始人黄仁勋卸任 CEO 与董事，由 CFO Colette Kress 担任临时 CEO 兼 CFO，Q4 指引仍高达 $1,300 亿美元 <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">SEC Filing ↗</a>。',
        en: '<strong>Q3 FY27 Commitments &amp; Governance Note:</strong> Supply/capacity commitments reached <strong>$390B</strong> at Oct 25, 2026 (up from $279B in Q2; $518B total + $32B neocloud agreements). Founder Jensen Huang stepped down Nov 11, 2026, with CFO Colette Kress serving as Interim CEO &amp; CFO while Q4 guides $130.0B <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">SEC Filing ↗</a>.'
      },
      mc_body_0: {
        zh: '在 Grace Blackwell 与 Vera Rubin 时代，英伟达不再只交付裸芯片，而是交付包含自研 CPU、NVLink 铜缆背板、液冷分配器与 BlueField DPU 的整机柜，使单柜 ASP 跃升至数百万美元级 <a class="cite-link" href="https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/" target="_blank" rel="noopener noreferrer">NVL72 Arch ↗</a>。',
        en: 'In the Blackwell and Vera Rubin eras, NVIDIA delivers integrated liquid-cooled racks combining custom CPUs, NVLink backplanes, and BlueField DPUs, lifting rack ASPs into the multi-million-dollar tier <a class="cite-link" href="https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/" target="_blank" rel="noopener noreferrer">NVL72 Arch ↗</a>.'
      },
      mc_body_1: {
        zh: '2019 年收购 Mellanox 的战略远见在 2026 年彻底兑现：除高毛利 InfiniBand 外，Spectrum-X 以太网平台成为 Meta、Oracle 等超大规模集群标准，网络业务年化体量已媲美一家大型独立半导体巨头 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2027/default.aspx" target="_blank" rel="noopener noreferrer">Q1 FY27 PR ↗</a>。',
        en: 'The 2019 Mellanox acquisition paid off massively in 2026: alongside InfiniBand, Spectrum-X Ethernet became the standard for Meta and Oracle clusters, scaling networking into a standalone semiconductor giant <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2027/default.aspx" target="_blank" rel="noopener noreferrer">Q1 FY27 PR ↗</a>.'
      },
      mc_body_2: {
        zh: '英伟达将复杂的算子调优、TensorRT-LLM 量化与安全护栏打包进 NIM 微服务与 NVIDIA AI Enterprise，使传统行业客户无需组建百人底层团队即可一键部署生产级 Agentic AI <a class="cite-link" href="https://www.nvidia.com/en-us/data-center/products/ai-enterprise/" target="_blank" rel="noopener noreferrer">AI Enterprise ↗</a>。',
        en: 'Packaging kernel tuning, TensorRT-LLM quantization, and guardrails into NIM microservices and NVIDIA AI Enterprise lets enterprises deploy production agentic AI without massive systems teams <a class="cite-link" href="https://www.nvidia.com/en-us/data-center/products/ai-enterprise/" target="_blank" rel="noopener noreferrer">AI Enterprise ↗</a>.'
      },
      mc_body_3: {
        zh: '随着营收迈向年化四千亿美元级，英伟达资产负债表上的应收账款升至 $81.03B、存货升至 $39.72B（2026年10月25日），同时用 $24.9B 新发长期债务优化资本结构以支持产能扩张 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Balance Sheet ↗</a>。',
        en: 'Scaling toward a $400B+ run-rate lifted receivables to $81.03B and inventories to $39.72B (Oct 25, 2026), alongside $24.9B in new debt issuance to fund supply expansion <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Balance Sheet ↗</a>.'
      },
      moat_pos: {
        zh: '<strong>1. 买芯片即买整个数据中心标准：</strong>通过 Vera Rubin NVL72 与 DSX POD，英伟达实质上定义了全球 AI 工厂的供电、液冷与网络标准。<br/><strong>2. 推理侧规模效应反而强化护城河：</strong>多智能体与实时长文本推理对互联带宽与软件调度要求更高，直接放大了 NVLink 6 与 TensorRT-LLM 的代差优势。<br/><strong>3. 现金流反哺生态投资：</strong>年化千亿级自由现金流支撑股票回购与对 Hugging Face 等上下游的战略并购投资。',
        en: '<strong>1. Defining the Data Center Standard:</strong> Vera Rubin NVL72 and DSX POD effectively set global power, liquid-cooling, and fabric standards for AI factories.<br/><strong>2. Inference Scaling Deepens the Moat:</strong> Multi-agent and long-context inference intensify interconnect and scheduling demands, widening NVLink 6 and TensorRT-LLM leads.<br/><strong>3. Cash Flow Fuels Ecosystem M&amp;A:</strong> $113.7B+ 9M FCF funds massive buybacks and strategic deals like the pending Hugging Face acquisition.'
      },
      moat_risk: {
        zh: '<strong>1. 超大规模云厂商自研 ASIC 分流：</strong>Google TPU、AWS Trainium 与 Broadcom 定制芯片正持续瓜分特定内部推理负载（AI 芯片份额呈温和分散趋势）。<br/><strong>2. $390B 供应链锁单与周期反转风险：</strong>巨额不可取消长期采购承诺在需求高景气时是护城河，一旦下游 AI 变现放缓将转为资产负债表重压。<br/><strong>3. 地缘管制与后黄仁勋时代治理考题：</strong>Q4 指引继续剔除中国数据中心算力收入；黄仁勋于 2026 年 11 月 11 日卸任后，新任正式 CEO 遴选与董事会独立委员会调查进展需密切跟踪。',
        en: '<strong>1. Hyperscaler Custom ASIC Encroachment:</strong> Google TPU, AWS Trainium, and Broadcom ASICs continue capturing internal inference workloads, gradually trimming GPU share.<br/><strong>2. $390B Supply Commitment Leverage:</strong> Non-cancelable multi-year memory/packaging commitments protect upside today but amplify downside if AI CapEx pauses.<br/><strong>3. Export Controls &amp; Post-Huang Transition:</strong> Q4 outlook assumes zero China Data Center compute; investors must monitor the permanent CEO search and board committee investigation.'
      },
      act_desc_0: {
        zh: '以 GeForce 确立桌面游戏显卡统治地位后，英伟达顶住短期毛利压力在全系消费卡中标配 CUDA 架构，在高校与科研机构无声种下百万级并行计算开发者种子 <a class="cite-link" href="https://investor.nvidia.com/financial-info/financial-reports/default.aspx" target="_blank" rel="noopener noreferrer">NVDA IR ↗</a>。',
        en: 'After dominating PC gaming with GeForce, NVIDIA embedded CUDA across every consumer GPU despite short-term die-size costs, seeding millions of parallel-computing developers <a class="cite-link" href="https://investor.nvidia.com/financial-info/financial-reports/default.aspx" target="_blank" rel="noopener noreferrer">NVDA IR ↗</a>.'
      },
      act_desc_1: {
        zh: 'Volta/Ampere 引入 Tensor Core 引爆大模型训练，2020 年完成收购 Mellanox 打通 InfiniBand 与高速以太网，正式宣告“整个数据中心就是一台计算机”的战略范式。',
        en: 'Volta and Ampere introduced Tensor Cores for deep learning, while the 2020 Mellanox acquisition united InfiniBand and Ethernet under the thesis that the entire data center is the unit of computing.'
      },
      act_desc_2: {
        zh: 'Hopper 破局、Blackwell 放量、Vera Rubin NVL72 在 Q3 FY27 极速量产，叠加 NIM 软件与物理 AI（Jetson Thor/Alpamayo），营收从 FY23 $27B 跃升至年化超 $4,300 亿 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 FY27 ↗</a>。',
        en: 'Hopper’s breakout, Blackwell’s scale, and Vera Rubin NVL72’s Q3 FY27 ramp—paired with NIM and Physical AI—propelled revenue from $27B in FY23 to a $430B+ annualized pace <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 FY27 ↗</a>.'
      },
      bat_desc_0: {
        zh: 'Q3 FY27 单季营收达 $115.84B (+103.2% YoY)，且 Q4 指引直指 $130.0B，彻底打破“AI 基建见顶”市场质疑 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 PR ↗</a>。',
        en: 'Q3 FY27 revenue reached $115.84B (+103.2% YoY) with Q4 guided to $130.0B, decisively refuting peak-CapEx skepticism <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">Q3 PR ↗</a>.'
      },
      bat_desc_1: {
        zh: 'Azure、Google Cloud、OCI、CoreWeave 与 Nebius 同步上线 Vera Rubin 集群，验证一年一代极速交付体系 <a class="cite-link" href="https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer" target="_blank" rel="noopener noreferrer">Rubin Stack ↗</a>。',
        en: 'Simultaneous Vera Rubin NVL72 deployments at Azure, GCP, OCI, CoreWeave, and Nebius validated NVIDIA’s 12-month rack-scale cadence <a class="cite-link" href="https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer" target="_blank" rel="noopener noreferrer">Rubin Stack ↗</a>.'
      },
      bat_desc_2: {
        zh: '在推出 Nemotron 科学模型与 OpenShell 代理安全架构同时拟收购 Hugging Face，将开源社区工作流深度绑定至 NIM 与 CUDA <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">HF Deal ↗</a>。',
        en: 'Alongside Nemotron Science and OpenShell agent security, the pending Hugging Face acquisition binds open-source model workflows to NIM and CUDA <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">HF Deal ↗</a>.'
      },
      bat_desc_3: {
        zh: 'RTX Spark PC、DGX Spark 64GB、奔驰/沃尔沃智驾与 Jetson Thor 人形机器人推动边缘计算单季跃升至 $8.2B <a class="cite-link" href="https://www.credenceresearch.com/news/nvidia-q3-fiscal-2027-revenue-115-8-billion-vera-rubin-interim-ceo-kress" target="_blank" rel="noopener noreferrer">Edge Growth ↗</a>。',
        en: 'RTX Spark PCs, DGX Spark 64GB, Mercedes/Volvo automated driving, and Jetson Thor robotics lifted Edge Computing to $8.2B/qtr <a class="cite-link" href="https://www.credenceresearch.com/news/nvidia-q3-fiscal-2027-revenue-115-8-billion-vera-rubin-interim-ceo-kress" target="_blank" rel="noopener noreferrer">Edge Growth ↗</a>.'
      }
    };

    var CH1_CONFIG = {
      viewA: {
        mode: 'dual_bar_line',
        title_zh: '英伟达历年净营收 ($B) 与同比增速 (%) 爆发轨迹 (FY2023–FY2027E)',
        title_en: 'NVIDIA Annual Net Revenue ($B) & YoY Growth (%) Trajectory (FY2023–FY2027E)',
        sub_zh: '五年间从 $26.97B 跨越至 FY27 隐含年化 $423.7B，实现近 16 倍体量扩张',
        sub_en: 'Scaling nearly 16x from $26.97B in FY23 to an implied $423.7B in FY27E (9M actual + Q4 guide)',
        leg1_zh: '财年总净营收 ($B · 左轴)',
        leg1_en: 'Annual Revenue ($B · Left)',
        leg2_zh: '同比增速 YoY (% · 右轴)',
        leg2_en: 'YoY Growth (% · Right)',
        labels_zh: ['FY2023', 'FY2024', 'FY2025', 'FY2026', 'FY2027E'],
        labels_en: ['FY2023', 'FY2024', 'FY2025', 'FY2026', 'FY2027E'],
        subs_zh: ['Hopper 前夜', '大模型元年', 'Hopper 巅峰', 'Blackwell 放量', 'Rubin 接力'],
        subs_en: ['Pre-Hopper', 'LLM Inflection', 'Hopper Peak', 'Blackwell Scale', 'Rubin Ramp'],
        s1: [26.97, 60.92, 130.50, 215.94, 423.68],
        s2: [0.2, 125.9, 114.2, 65.5, 96.2],
        max1: 480, max2: 150, u1: 'B', u2: '%'
      },
      viewB: {
        mode: 'dual_bar_line',
        title_zh: 'Q3 FY26–Q4 FY27E 单季营收 ($B) 与数据中心营收占比 (%)',
        title_en: 'Quarterly Revenue ($B) & Data Center Share (%) — Q3 FY26 to Q4 FY27E',
        sub_zh: '数据中心占比从 89.8% 攀升至 92.9%，单季体量突破千亿美元大关',
        sub_en: 'Data Center share rose from 89.8% to 92.9% as quarterly revenue crossed $100B+',
        leg1_zh: '单季净营收 ($B · 左轴)',
        leg1_en: 'Quarterly Revenue ($B · Left)',
        leg2_zh: '数据中心占比 (% · 右轴)',
        leg2_en: 'Data Center Mix (% · Right)',
        labels_zh: ['Q3 FY26', 'Q4 FY26', 'Q1 FY27', 'Q2 FY27', 'Q3 FY27', 'Q4 FY27E'],
        labels_en: ['Q3 FY26', 'Q4 FY26', 'Q1 FY27', 'Q2 FY27', 'Q3 FY27', 'Q4 FY27E'],
        subs_zh: ['2025-10', '2026-01', '2026-04', '2026-07', '2026-10', '2027-01E'],
        subs_en: ['Oct 2025', 'Jan 2026', 'Apr 2026', 'Jul 2026', 'Oct 2026', 'Jan 2027E'],
        s1: [57.0, 68.1, 81.6, 96.2, 115.8, 130.0],
        s2: [89.8, 91.0, 92.2, 92.5, 92.9, 93.0],
        max1: 150, max2: 100, u1: 'B', u2: '%'
      }
    };

    var PILLAR_NOTES = {
      zh: [
        '<strong>当前选中支柱解读（01 软件生态锁定）：</strong>即便云巨头自研 ASIC 拥有理论单位 FLOPS 成本优势，但在应对每周演进的开源与多模态 Agent 模型时，CUDA + NIM 的“开箱即用”仍大幅压缩 TCO 综合上市时间 <a class="cite-link" href="https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference" target="_blank" rel="noopener noreferrer">Market Share ↗</a>。',
        '<strong>当前选中支柱解读（02 六芯机架协同）：</strong>Vera Rubin NVL72 将自研 Vera CPU、Rubin GPU、NVLink 6、ConnectX-9、BlueField-4 与 Spectrum-X 融为一体，把竞争维度从“单卡参数”拉升至“整机柜可用算力” <a class="cite-link" href="https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/" target="_blank" rel="noopener noreferrer">Vera Rubin ↗</a>。',
        '<strong>当前选中支柱解读（03 极致迭代与性能）：</strong>Q3 FY27 Vera Rubin NVL72 创下史上最快量产爬坡并横扫 MLPerf 训练与推理基准，使竞品始终面临“追平即过时”的代差折价 <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">MLPerf Sweep ↗</a>。',
        '<strong>当前选中支柱解读（04 供应链产能锁单）：</strong>截至 2026 年 10 月 25 日，英伟达 $390B 供应链与内存承诺构筑了极深的物理护城河，但也要求下游 AI 资本开支维持高强度兑现 <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">Supply $390B ↗</a>。'
      ],
      en: [
        '<strong>Active Pillar (01 Software Ecosystem Lock-In):</strong> Even when hyperscaler ASICs claim lower theoretical FLOPS cost, CUDA + NIM day-zero support for evolving agentic models delivers superior total TCO <a class="cite-link" href="https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference" target="_blank" rel="noopener noreferrer">Market Share ↗</a>.',
        '<strong>Active Pillar (02 6-Chip Rack Codesign):</strong> Vera Rubin NVL72 fuses custom Vera CPU, Rubin GPU, NVLink 6, ConnectX-9, BlueField-4, and Spectrum-X—shifting competition from chip specs to rack-scale goodput <a class="cite-link" href="https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/" target="_blank" rel="noopener noreferrer">Vera Rubin ↗</a>.',
        '<strong>Active Pillar (03 Annual Cadence &amp; Performance):</strong> Vera Rubin NVL72 achieved NVIDIA’s fastest ramp in Q3 FY27 and swept MLPerf Training &amp; Endpoints benchmarks <a class="cite-link" href="https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/" target="_blank" rel="noopener noreferrer">MLPerf Sweep ↗</a>.',
        '<strong>Active Pillar (04 $390B Supply Commitments):</strong> Multi-year memory and packaging commitments of $390B lock out competitors from HBM4 capacity, while introducing cyclical operating leverage <a class="cite-link" href="https://sec-api.io/insights/nvidia-nvda-q3-fy2027-earnings-revenue-115-8bn-data-center-107-6bn-q4-outlook-130-0bn-sec-filing-analysis" target="_blank" rel="noopener noreferrer">Supply $390B ↗</a>.'
      ]
    };

    var RADAR_CFG = {
      axes_zh: ['软件生态锁定', '全栈机架协同', '芯片与互联性能', '供应链产能议价', '毛利率与定价权'],
      axes_en: ['Software Lock-In', 'Rack-Scale Codesign', 'Silicon & Fabric Perf', 'Supply Chain Leverage', 'Margin & Pricing Power'],
      s0_zh: 'NVIDIA (Vera Rubin / CUDA 全栈)', s0_en: 'NVIDIA (Vera Rubin / CUDA Stack)',
      s1_zh: 'Broadcom (定制 ASIC + 以太网)', s1_en: 'Broadcom (Custom ASIC + Ethernet)',
      s2_zh: 'AMD (Instinct MI350/400 + ROCm)', s2_en: 'AMD (Instinct MI350/400 + ROCm)',
      v0: [9.9, 9.8, 9.8, 9.7, 9.6],
      v1: [5.5, 7.6, 8.2, 8.3, 8.1],
      v2: [6.4, 7.0, 8.0, 7.2, 6.8]
    };

    var PEERS_ZH = [
      {
        category: 'internal', benchmark: true,
        title: 'NVIDIA 数据中心算力 (Data Center Compute)',
        creator: 'NVIDIA 核心基本盘 · Hyperscale + ACIE',
        format: '整机柜 NVL72 / HGX / 加速卡 · 一年一代',
        craft: 'Vera Rubin (288GB HBM4) + Blackwell Ultra + CUDA-X',
        views: 'Q3 FY27 $107.6B (含网络; 占总营收 92.9%)',
        acclaim: 'GAAP 毛利率 ~75%+ · 全球 AI 份额 ~75–81%',
        takeaway: '超大规模云巨头 ($60.1B) 与工业/主权 AI ($47.5B) 双轮驱动，单季同比 +110%。',
        sourceLabel: 'Q3 FY27 PR',
        sourceUrl: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/'
      },
      {
        category: 'internal', benchmark: true,
        title: 'NVIDIA 高速网络与互联 (Data Center Networking)',
        creator: 'NVIDIA 集群咽喉 · Mellanox 演进线',
        format: 'NVLink 6 + Spectrum-X 以太网 + InfiniBand + DPU',
        craft: 'ConnectX-9 SuperNIC + BlueField-4 + Quantum-X800',
        views: 'Q1 FY27 单季 $14.8B (+199% YoY, +35% QoQ)',
        acclaim: '万卡集群高附着率 · 年化 ~$60B+ 规模',
        takeaway: '以端到端无损网络消除集群通信瓶颈，成为增长最快的百亿级核心支柱。',
        sourceLabel: 'Q1 FY27 PR',
        sourceUrl: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2027/default.aspx'
      },
      {
        category: 'internal', benchmark: false,
        title: 'NVIDIA 软件与 AI 企业生态 (Software, NIM &amp; NeMo)',
        creator: 'NVIDIA 经常性软件变现层',
        format: '按 GPU 卡/年订阅授权 + 开源生态整合',
        craft: 'CUDA-X · NIM 微服务 · OpenShell · 拟收购 Hugging Face',
        views: '驱动 $47.5B/季 ACIE 政企市场渗透核心引擎',
        acclaim: '纯软件级高毛利 · 极大拉升客户迁移壁垒',
        takeaway: '把底层算力优势转化为企业生产级推理订阅流与代理安全标准。',
        sourceLabel: 'AI Enterprise',
        sourceUrl: 'https://www.nvidia.com/en-us/data-center/products/ai-enterprise/'
      },
      {
        category: 'internal', benchmark: false,
        title: 'NVIDIA 边缘与物理 AI (Edge: 游戏 · PC · 智驾 · 机器人)',
        creator: 'NVIDIA 第二曲线与端侧基本盘',
        format: '消费显卡 + 端侧工作站 + 智驾/机器人平台',
        craft: 'RTX 50 + DLSS 5 · DGX Spark · Jetson Thor · Alpamayo',
        views: 'Q3 FY27 $8.2B (+42% YoY) · FY26 游戏 $16.0B',
        acclaim: '消费端现金流 + 具身智能/智驾远期期权',
        takeaway: '以端侧 AI PC 与奔驰/沃尔沃智驾、Isaac 人形机器人打开物理世界万亿空间。',
        sourceLabel: 'Q3 Edge',
        sourceUrl: 'https://www.credenceresearch.com/news/nvidia-q3-fiscal-2027-revenue-115-8-billion-vera-rubin-interim-ceo-kress'
      },
      {
        category: 'external', benchmark: false,
        title: 'Broadcom (AVGO) 定制 AI ASIC 与以太网交换',
        creator: '外部头号阵营 · 定制芯片设计伙伴',
        format: 'XPU 联合设计 + Tomahawk 以太网交换芯片',
        craft: '先进 SerDes + CoWoS 定制集成 · 服务 Google/Meta 等',
        views: 'AI 季度约 $16.7B (年化 ~$67B 跑道)',
        acclaim: '高定制化性价比 · 云巨头自研最大受益者',
        takeaway: '不与客户争生态，专吃超大规模云厂商内部确定性推理负载的定制芯片红利。',
        sourceLabel: 'Share Audit',
        sourceUrl: 'https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference'
      },
      {
        category: 'external', benchmark: false,
        title: 'AMD Instinct MI350 / MI400 与 EPYC 数据中心',
        creator: '外部通用 GPU 挑战者',
        format: '开源 ROCm 软件栈 + 高容量 HBM GPU + 服务器 CPU',
        craft: 'Chiplet 小芯片架构 · CDNA 系列 · EPYC 协同',
        views: '数据中心季度约 $6.7B (年化 ~$27B · AI 份额 ~6–8%)',
        acclaim: '云厂商“第二供应商”制衡定价的首选',
        takeaway: '硬件参数追赶迅速，但在机架级全栈软件协同与百万开发者粘性上仍落后一代。',
        sourceLabel: 'AMD vs NVDA',
        sourceUrl: 'https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference'
      },
      {
        category: 'external', benchmark: false,
        title: 'Hyperscaler 自研芯片 (Google TPU · AWS Trainium)',
        creator: '既是最大客户又是自研替代者',
        format: '仅限自有云内部部署 · 不对外零售硬件',
        craft: 'Google TPU (约 8% 份额) · AWS Trainium/Inferentia (约 5%)',
        views: 'AWS 全芯片业务年化 >$25B；自研芯片合计占 ~12–16%',
        acclaim: '省去英伟达硬件毛利，专攻内部稳定模型推理',
        takeaway: '长期抑制英伟达在单一云巨头的份额上限，但云厂商仍需采购 Vera Rubin 服务外部租户。',
        sourceLabel: 'Cloud Silicon',
        sourceUrl: 'https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference'
      }
    ];

    var PEERS_EN = [
      {
        category: 'internal', benchmark: true,
        title: 'NVIDIA Data Center Compute (Hyperscale + ACIE)',
        creator: 'NVIDIA Core Engine · $430B+ Run-Rate',
        format: 'NVL72 Rack-Scale / HGX / Annual Cadence',
        craft: 'Vera Rubin (288GB HBM4) + Blackwell Ultra + CUDA-X',
        views: 'Q3 FY27 $107.6B (incl. Networking; 92.9% of Total)',
        acclaim: '~75%+ GAAP GM · ~75–81% AI Accelerator Share',
        takeaway: 'Hyperscale ($60.1B) and ACIE ($47.5B) drove +110% YoY growth in Q3 FY27.',
        sourceLabel: 'Q3 FY27 PR',
        sourceUrl: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Third-Quarter-Fiscal-2027/'
      },
      {
        category: 'internal', benchmark: true,
        title: 'NVIDIA Data Center Networking (NVLink &amp; Spectrum-X)',
        creator: 'Cluster Interconnect Backbone (ex-Mellanox)',
        format: 'NVLink 6 + Spectrum-X Ethernet + InfiniBand + DPU',
        craft: 'ConnectX-9 SuperNIC + BlueField-4 + Quantum-X800',
        views: 'Q1 FY27 Record $14.8B (+199% YoY, +35% QoQ)',
        acclaim: 'Mandatory cluster attach · ~$60B+ annualized pace',
        takeaway: 'Eliminates tail-latency bottlenecks in 100k-GPU clusters, scaling into a standalone giant.',
        sourceLabel: 'Q1 FY27 PR',
        sourceUrl: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2027/default.aspx'
      },
      {
        category: 'internal', benchmark: false,
        title: 'NVIDIA Software Stack (CUDA-X, NIM &amp; AI Enterprise)',
        creator: 'Recurring Enterprise Software Layer',
        format: 'Per-GPU annual subscription + Open Model Hub',
        craft: 'CUDA-X · NIM Microservices · OpenShell · Hugging Face (pending)',
        views: 'Powers $47.5B/qtr ACIE sovereign &amp; enterprise adoption',
        acclaim: 'Software-grade margins · Steepest switching barrier',
        takeaway: 'Converts silicon dominance into recurring enterprise inference and agent-security licensing.',
        sourceLabel: 'AI Enterprise',
        sourceUrl: 'https://www.nvidia.com/en-us/data-center/products/ai-enterprise/'
      },
      {
        category: 'internal', benchmark: false,
        title: 'NVIDIA Edge &amp; Physical AI (Gaming · PC · Auto · Robotics)',
        creator: 'Edge Cashflow &amp; Embodied AI Optionality',
        format: 'Consumer GPUs + Local AI PCs + Auto/Robotics Platforms',
        craft: 'RTX 50 + DLSS 5 · DGX Spark · Jetson Thor · Alpamayo',
        views: 'Q3 FY27 $8.2B (+42% YoY) · FY26 Gaming $16.0B',
        takeaway: 'Expands accelerated computing into AI PCs, Mercedes/Volvo AVs, and Isaac humanoid robotics.',
        acclaim: 'Resilient consumer cashflow + Physical AI option',
        sourceLabel: 'Q3 Edge',
        sourceUrl: 'https://www.credenceresearch.com/news/nvidia-q3-fiscal-2027-revenue-115-8-billion-vera-rubin-interim-ceo-kress'
      },
      {
        category: 'external', benchmark: false,
        title: 'Broadcom (AVGO) Custom AI ASICs &amp; Switching',
        creator: 'Top External Challenger · Custom XPU Partner',
        format: 'Co-designed Hyperscaler XPUs + Tomahawk Switching',
        craft: 'Leading SerDes + CoWoS integration for Google/Meta',
        views: '~$16.7B AI Quarter (~$67B annualized run-rate)',
        takeaway: 'Captures internal hyperscaler inference workloads without competing on developer software.',
        acclaim: 'Best custom silicon economics · Hyperscaler partner',
        sourceLabel: 'Share Audit',
        sourceUrl: 'https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference'
      },
      {
        category: 'external', benchmark: false,
        title: 'AMD Instinct MI350 / MI400 &amp; EPYC Data Center',
        creator: 'Primary Merchant GPU Challenger',
        format: 'Open ROCm stack + High-HBM GPUs + EPYC CPUs',
        craft: 'Chiplet architecture · CDNA · EPYC server synergy',
        views: '~$6.7B Data Center Qtr (~$27B run-rate · ~6–8% AI share)',
        acclaim: 'Cloud buyers’ preferred second-source leverage',
        takeaway: 'Competitive raw hardware specs, but lags NVIDIA on rack-scale integration and CUDA maturity.',
        sourceLabel: 'AMD vs NVDA',
        sourceUrl: 'https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference'
      },
      {
        category: 'external', benchmark: false,
        title: 'Hyperscaler In-House Silicon (Google TPU · AWS Trainium)',
        creator: 'Frenemy Cloud Giants',
        format: 'Internal cloud deployment only (not retail merchant)',
        craft: 'Google TPU (~8% share) · AWS Trainium/Inferentia (~5%)',
        views: 'AWS total chips &gt;$25B/yr; combined custom ~12–16% share',
        acclaim: 'Eliminates NVIDIA hardware margin on internal jobs',
        takeaway: 'Caps NVIDIA share on internal workloads, though clouds still buy Vera Rubin for external tenants.',
        sourceLabel: 'Cloud Silicon',
        sourceUrl: 'https://safeguard.sh/resources/blog/ai-chip-market-share-2026-nvidia-custom-silicon-training-vs-inference'
      }
    ];

    var BARS_CFG = {
      max_x: 460,
      ref_line: 100,
      items_zh: [
        { label: 'NVIDIA 数据中心 (Q3 FY27 年化)', val: 430.4, disp: '$430.4B', sub: '含计算与网络 · 占比 92.9%', note: '单季 $107.6B 年化跑道，稳居全球算力绝对统治地位' },
        { label: 'Broadcom AI 半导体 (定制 ASIC+网络)', val: 67.0, disp: '~$67.0B', sub: '单季约 $16.7B 年化', note: '承接谷歌/Meta 等超大规模定制 XPU 需求' },
        { label: 'NVIDIA 边缘计算 (游戏/PC/智驾/机器人)', val: 32.8, disp: '$32.8B', sub: 'Q3 $8.2B 年化 (+42% YoY)', note: 'RTX 50、DGX Spark 与 Jetson Thor 多点爆发' },
        { label: 'AMD 数据中心 (GPU + EPYC CPU)', val: 27.0, disp: '~$27.0B', sub: '单季约 $6.7B 年化', note: 'AI 加速卡份额约 6%–8%，定位第二供应商' },
        { label: 'AWS 自研芯片组合 (Trainium/Graviton)', val: 25.0, disp: '$25.0B+', sub: '亚马逊内部云算力替代', note: '专攻自有云内部分布式训练与推理降本' }
      ],
      items_en: [
        { label: 'NVIDIA Data Center (Q3 FY27 Annualized)', val: 430.4, disp: '$430.4B', sub: 'Compute + Networking · 92.9% Mix', note: '$107.6B quarterly pace anchors global AI infrastructure' },
        { label: 'Broadcom AI Semi (Custom ASIC + Switching)', val: 67.0, disp: '~$67.0B', sub: '~$16.7B AI Quarter Run-Rate', note: 'Leading partner for hyperscaler custom XPUs' },
        { label: 'NVIDIA Edge Computing (PC/Gaming/Auto/Robot)', val: 32.8, disp: '$32.8B', sub: '$8.2B Q3 Annualized (+42% YoY)', note: 'Driven by RTX 50, DGX Spark, and Jetson Thor' },
        { label: 'AMD Data Center (Instinct + EPYC)', val: 27.0, disp: '~$27.0B', sub: '~$6.7B Quarter Run-Rate', note: '~6%–8% AI accelerator share as second source' },
        { label: 'AWS Custom Silicon (Trainium/Graviton)', val: 25.0, disp: '$25.0B+', sub: 'Internal Cloud Chip Run-Rate', note: 'Captures internal AWS training/inference workloads' }
      ]
    };

    var COMBO_CFG = {
      titles_zh: ['Q3 FY26', 'Q4 FY26', 'Q1 FY27', 'Q2 FY27', 'Q3 FY27', 'Q4 FY27E'],
      titles_en: ['Q3 FY26', 'Q4 FY26', 'Q1 FY27', 'Q2 FY27', 'Q3 FY27', 'Q4 FY27E'],
      subs_zh: ['2025-10', '2026-01', '2026-04', '2026-07', '2026-10', '指引中值'],
      subs_en: ['Oct 2025', 'Jan 2026', 'Apr 2026', 'Jul 2026', 'Oct 2026', 'Mid-Guide'],
      bars: [57.0, 68.1, 81.6, 96.2, 115.8, 130.0],
      line: [73.4, 73.0, 74.5, 75.0, 74.8, 71.5],
      max_bar: 150, min_line: 60, max_line: 80, ref_line: 70, highlight_idx: 4,
      u_bar: 'B', u_line: '%',
      leg1_zh: '单季净营收 (左轴 · $B)', leg1_en: 'Quarterly Revenue (Left · $B)',
      leg2_zh: 'GAAP 毛利率 (右轴 · %)', leg2_en: 'GAAP Gross Margin (Right · %)'
    };

    var SIM_PRESETS = {
      p1: { views: 7, v_per_view: 32, ancillary_m: 35, years: 3, transmedia: false },
      p2: { views: 10, v_per_view: 38, ancillary_m: 55, years: 5, transmedia: true },
      p3: { views: 15, v_per_view: 44, ancillary_m: 80, years: 7, transmedia: true }
    };

    var CHECKLIST_ZH = [
      { title: 'Vera Rubin NVL72 爬坡后毛利率重返 73%–75% 区间', tag: 'GM 韧性', desc: '验证 Q4 FY27 初期爬坡 (71%–72%) 后，系统良率提升能否迅速修复百分比毛利率。' },
      { title: 'Spectrum-X 与 NVLink 网络附着率持续领跑', tag: '第二引擎', desc: '跟踪数据中心网络营收是否维持高双位数增长，对冲纯计算芯片价格竞争。' },
      { title: 'ACIE（主权 AI 与企业客户）占比稳步扩大', tag: '客户分散', desc: '观察 Q3 已达 $47.5B 的非云巨头板块能否持续降低对前四大云厂商的集中度依赖。' },
      { title: '$390B 供应链锁单与存货周转保持健康匹配', tag: '资产效率', desc: '监控存货 ($39.7B) 与应收账款 ($81.0B) 增速是否与未来四个季度指引订单同步。' },
      { title: 'NIM / AI Enterprise 软件与 Hugging Face 整合变现', tag: '软件护城河', desc: '核查企业级 AI 软件经常性收入增长，强化对抗自研 ASIC 的开发者粘性。' },
      { title: '后黄仁勋时代新任 CEO 任命与治理过渡平稳落地', tag: '公司治理', desc: '跟踪正式 CEO 遴选结果及董事会独立委员会调查披露，确保战略执行连续性。' }
    ];

    var CHECKLIST_EN = [
      { title: 'Post-Ramp Gross Margin Recovery Toward 73%–75%', tag: 'GM Resilience', desc: 'Verify whether Vera Rubin rack yields restore percentage margins after Q4 FY27’s 71%–72% ramp dip.' },
      { title: 'Spectrum-X &amp; NVLink Networking Attach Momentum', tag: 'Fabric Engine', desc: 'Track sustained double-digit networking growth to offset pure compute price pressure.' },
      { title: 'ACIE (Sovereign &amp; Enterprise) Share Expansion', tag: 'Buyer Mix', desc: 'Monitor whether the $47.5B/qtr ACIE segment continues diversifying hyperscaler concentration.' },
      { title: 'Healthy Alignment of $390B Supply Commitments &amp; Inventory', tag: 'Working Capital', desc: 'Audit inventory ($39.7B) and receivables ($81.0B) velocity against forward demand.' },
      { title: 'NIM / AI Enterprise &amp; Hugging Face Monetization', tag: 'Software Moat', desc: 'Track recurring enterprise software licensing to defend against custom hyperscaler ASICs.' },
      { title: 'Smooth Post-Huang CEO Selection &amp; Governance Resolution', tag: 'Governance', desc: 'Follow the permanent CEO search under Interim CEO Colette Kress and board committee updates.' }
    ];

    var QUICK_JUMP_ZH = [
      { id: 'sec-00', title: '00 · 执行摘要与核心指标', sub: 'Q3 FY27 $115.84B 营收 · 数据中心 $107.6B · GAAP 毛利率 74.8%' },
      { id: 'sec-01', title: '01 · 全栈架构与六芯协同', sub: 'Vera Rubin NVL72 · Spectrum-X · CUDA+NIM · 历年营收轨迹' },
      { id: 'sec-02', title: '02 · 四大统治支柱与雷达', sub: 'CUDA 锁定 · 机架工程 · 年度迭代 · 五维护城河对比' },
      { id: 'sec-03', title: '03 · 全球 AI 算力横向对比', sub: 'NVDA vs Broadcom ASIC / AMD Instinct / Google TPU / AWS Trainium' },
      { id: 'sec-04', title: '04 · AI 工厂经济与复利模拟', sub: '单 GW 价值捕获模拟器 · 74.8% 毛利结构与风险拆解' },
      { id: 'sec-05', title: '05 · 商业演进史与四大战役', sub: '1993–2026 三幕演进 · 破千亿单季 · 拟收购 Hugging Face' },
      { id: 'sec-06', title: '06 · 护城河耐久度核查清单', sub: '6 项可持久化追踪指标与进度条' },
      { id: 'sec-07', title: '07 · SEC 财报与官方信源索引', sub: 'Q3 FY27 8-K · CFO Commentary · FY26 10-K' }
    ];

    var QUICK_JUMP_EN = [
      { id: 'sec-00', title: '00 · Executive Summary & KPIs', sub: 'Q3 FY27 $115.84B Rev · Data Center $107.6B · 74.8% GAAP GM' },
      { id: 'sec-01', title: '01 · Full-Stack & 6-Chip Codesign', sub: 'Vera Rubin NVL72 · Spectrum-X · CUDA+NIM · Revenue Trajectory' },
      { id: 'sec-02', title: '02 · 4 Pillars & Moat Radar', sub: 'CUDA Lock-In · Rack Engineering · Annual Cadence · 5-Axis Radar' },
      { id: 'sec-03', title: '03 · Global AI Silicon Matrix', sub: 'NVDA vs Broadcom ASIC / AMD Instinct / Google TPU / AWS Trainium' },
      { id: 'sec-04', title: '04 · Unit Economics & LTV Sim', sub: 'AI Factory $/GW Simulator · 74.8% Margin & Risk Lens' },
      { id: 'sec-05', title: '05 · Evolution & 2026 Battles', sub: '1993–2026 Timeline · $115.8B Quarter · Hugging Face Deal' },
      { id: 'sec-06', title: '06 · Moat Durability Checklist', sub: '6-item interactive audit with localStorage persistence' },
      { id: 'sec-07', title: '07 · SEC Filings & Primary Sources', sub: 'Q3 FY27 8-K · CFO Commentary · FY26 10-K' }
    ];

    var state = {
      lang: 'zh',
      theme: 'light',
      density: 'relaxed',
      ch1View: 'viewA',
      ch1Series: { s1: true, s2: true },
      activePillar: 0,
      radarSeries: { s0: true, s1: true, s2: true },
      peerFilter: 'all',
      peerQuery: '',
      epsSeries: { rev: true, oci: true },
      sim: { views: 10, v_per_view: 38, ancillary_m: 55, years: 5, transmedia: true, preset: 'p2' },
      checks: [true, true, true, true, false, false]
    };

    function isEn() { return state.lang === 'en'; }
    function safeGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
    function safeSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

    var toastTimer = null;
    function showToast(msg) {
      var el = document.getElementById('muiSnackbar');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
    }

    function escapeHtml(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function highlightMatch(text, query) {
      var safe = escapeHtml(text);
      if (!query) return safe;
      var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
    }

    function loadChecks() {
      var raw = safeGet(STORAGE_CHECK_KEY);
      if (raw) {
        try {
          var parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length === CHECKLIST_ZH.length) return parsed.map(Boolean);
        } catch (e) {}
      }
      return [true, true, true, true, false, false];
    }

    function applyDensity(density, silent) {
      state.density = density === 'compact' ? 'compact' : 'relaxed';
      if (state.density === 'compact') document.documentElement.setAttribute('data-density', 'compact');
      else document.documentElement.removeAttribute('data-density');
      safeSet(STORAGE_DENSITY_KEY, state.density);
      var lblEl = document.getElementById('densityBtnLabel');
      if (lblEl) lblEl.textContent = state.density === 'compact' ? (isEn() ? 'Compact' : '紧凑视图') : (isEn() ? 'Comfort' : '舒适排版');
      setTimeout(renderAllCharts, 40);
      if (!silent) showToast(state.density === 'compact' ? (isEn() ? 'Switched to Compact Density' : '已切换至高信息密度紧凑视图') : (isEn() ? 'Switched to Comfort Density' : '已切换至舒适阅读排版视图'));
    }

    function syncCh1HeaderText() {
      var vCfg = CH1_CONFIG[state.ch1View];
      var en = isEn();
      var tEl = document.getElementById('ch1ChartTitle');
      var sEl = document.getElementById('ch1ChartSub');
      var l1El = document.getElementById('ch1Leg1');
      var l2El = document.getElementById('ch1Leg2');
      var metaEl = document.getElementById('ch1AxisMeta');
      if (!tEl || !vCfg) return;
      tEl.textContent = en ? vCfg.title_en : vCfg.title_zh;
      sEl.textContent = en ? vCfg.sub_en : vCfg.sub_zh;
      var l1 = en ? vCfg.leg1_en : vCfg.leg1_zh;
      var l2 = en ? vCfg.leg2_en : vCfg.leg2_zh;
      if (l1El) l1El.textContent = l1;
      if (l2El) l2El.textContent = l2;
      if (metaEl) metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ ' + escapeHtml(l1) + '</span><span style="color:var(--chart-c2);">● ' + escapeHtml(l2) + '</span>';
    }

    function syncCollapseButtonsText() {
      var btns = document.querySelectorAll('[data-collapse-target]');
      for (var i = 0; i < btns.length; i++) {
        var panel = document.getElementById(btns[i].getAttribute('data-collapse-target'));
        var isOpen = panel && panel.classList.contains('open');
        btns[i].innerHTML = isEn()
          ? (isOpen ? '<span>Hide Mechanics Breakdown</span> <span>⌃</span>' : '<span>Show Mechanics Breakdown</span> <span>⌄</span>')
          : (isOpen ? '<span>收起微观机制拆解</span> <span>⌃</span>' : '<span>展开微观机制拆解</span> <span>⌄</span>');
      }
    }

    function renderPeerTable() {
      var tbody = document.getElementById('peerTableBody');
      var badge = document.getElementById('peerCountBadge');
      if (!tbody || !badge) return;
      var activeRows = isEn() ? PEERS_EN : PEERS_ZH;
      var q = state.peerQuery.trim().toLowerCase();
      var filtered = activeRows.filter(function (row, idx) {
        if (state.peerFilter !== 'all' && row.category !== state.peerFilter) return false;
        if (!q) return true;
        var rZh = PEERS_ZH[idx], rEn = PEERS_EN[idx];
        var hay = (rZh.title + ' ' + rZh.creator + ' ' + rZh.format + ' ' + rZh.craft + ' ' + rZh.views + ' ' + rZh.acclaim + ' ' + rZh.takeaway + ' ' +
          rEn.title + ' ' + rEn.creator + ' ' + rEn.format + ' ' + rEn.craft + ' ' + rEn.takeaway).toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Benchmarks') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 项对标');
      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching segments or competitors found.' : '未找到匹配的业务线或竞品记录，请尝试其他关键词。') + '</td></tr>';
        return;
      }
      var rawQ = state.peerQuery.trim();
      tbody.innerHTML = filtered.map(function (r) {
        return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
          '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.title, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.creator, rawQ) + '</span></td>' +
          '<td>' + highlightMatch(r.format, rawQ) + '</td>' +
          '<td>' + highlightMatch(r.craft, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.views, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.acclaim, rawQ) + '</td>' +
          '<td>' + highlightMatch(r.takeaway, rawQ) + ' <a class="cite-link" href="' + escapeHtml(r.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
          '</tr>';
      }).join('');
    }

    function computeLifecycleSeries() {
      var gw = state.sim.views;
      var revPerGw = state.sim.v_per_view;
      var attachGpB = state.sim.ancillary_m;
      var yrs = state.sim.years;
      var mult = state.sim.transmedia ? 1.22 : 1.0;

      var baseAnnualComputeGP = gw * revPerGw * 0.74;
      var cumDirectB = [0], cumTotalB = [0];
      for (var y = 1; y <= yrs; y++) {
        var growthStep = Math.pow(state.sim.transmedia ? 1.05 : 1.02, y - 1);
        var yrDirect = baseAnnualComputeGP * growthStep * (state.sim.transmedia && y >= 2 ? 1.04 : 1.0);
        var yrAttach = attachGpB * mult * Math.pow(1.07, y - 1);
        cumDirectB.push(cumDirectB[y - 1] + yrDirect);
        cumTotalB.push(cumTotalB[y - 1] + yrDirect + yrAttach);
      }
      var costBenchB = Math.max(1, 30 * yrs);
      return {
        yrs: yrs,
        cumStreamB: cumDirectB,
        cumTotalB: cumTotalB,
        streamTotalB: cumDirectB[yrs],
        ancTotalB: cumTotalB[yrs] - cumDirectB[yrs],
        grandTotalB: cumTotalB[yrs],
        costBenchB: costBenchB
      };
    }

    function fmtMoneyB(valB) {
      if (valB >= 1000) return '$' + (valB / 1000).toFixed(2) + 'T';
      return '$' + Math.round(valB).toLocaleString() + 'B';
    }

    function updateSimulatorUI() {
      var res = computeLifecycleSeries();
      var roi = res.grandTotalB / res.costBenchB;
      var ancPct = res.grandTotalB > 0 ? Math.round((res.ancTotalB / res.grandTotalB) * 100) : 0;

      document.getElementById('simPrincipalLabel').textContent = state.sim.views + (isEn() ? ' GW/yr' : ' GW/年');
      document.getElementById('simCagrLabel').textContent = '$' + state.sim.v_per_view + (isEn() ? 'B/GW' : 'B/GW');
      document.getElementById('simLiveArpuLabel').textContent = '$' + state.sim.ancillary_m + (isEn() ? 'B/yr' : 'B/年');
      document.getElementById('simYearsLabel').textContent = state.sim.years + (isEn() ? ' yrs' : ' 年');

      document.getElementById('simEndingVal').textContent = fmtMoneyB(res.grandTotalB);
      document.getElementById('simMoicVal').textContent = roi.toFixed(2) + 'x · ' + (isEn() ? ('Attach ' + ancPct + '%') : ('生态连带 ' + ancPct + '%'));
      document.getElementById('simNetGainVal').textContent = fmtMoneyB(res.streamTotalB);
      document.getElementById('simMidVal').textContent = fmtMoneyB(res.ancTotalB);

      var pBtns = document.querySelectorAll('[data-preset]');
      for (var i = 0; i < pBtns.length; i++) pBtns[i].classList.toggle('active', pBtns[i].getAttribute('data-preset') === state.sim.preset);
      drawSimChart();
    }

    function renderChecklist() {
      var container = document.getElementById('checklistContainer');
      var chip = document.getElementById('checklistScoreChip');
      var bar = document.getElementById('checklistProgressBar');
      if (!container || !chip || !bar) return;
      var items = isEn() ? CHECKLIST_EN : CHECKLIST_ZH;
      var doneCount = state.checks.filter(Boolean).length;
      var pct = Math.round((doneCount / items.length) * 100);
      chip.textContent = isEn() ? ('Verified ' + doneCount + ' / ' + items.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + items.length + ' 项 (' + pct + '%)');
      bar.style.width = pct + '%';
      container.innerHTML = items.map(function (item, idx) {
        var isChecked = !!state.checks[idx];
        return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
          '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
          '<div style="flex:1;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
          '<span class="check-title">' + escapeHtml(item.title) + '</span><span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
          '</div><p class="check-desc">' + escapeHtml(item.desc) + '</p></div></label>';
      }).join('');
    }

    /* Canvas Chart Engine */
    var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
    var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

    function getPalette() {
      var cs = getComputedStyle(document.documentElement);
      var isDark = state.theme === 'dark';
      return {
        isDark: isDark,
        grid: cs.getPropertyValue('--chart-grid').trim() || (isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)'),
        tick: cs.getPropertyValue('--chart-tick').trim() || '#94A3B8',
        text: cs.getPropertyValue('--text-primary').trim() || '#0F1924',
        pillBg: isDark ? 'rgba(8, 14, 26, 0.92)' : 'rgba(255, 255, 255, 0.95)',
        pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
        trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
        hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
        c1: cs.getPropertyValue('--chart-c1').trim() || '#0073E6',
        c2: cs.getPropertyValue('--chart-c2').trim() || '#16A34A',
        c3: cs.getPropertyValue('--chart-c3').trim() || '#D97706',
        c4: cs.getPropertyValue('--chart-c4').trim() || '#7C3AED'
      };
    }

    function prepareCanvas(id) {
      var canvas = document.getElementById(id);
      if (!canvas || !canvas.parentElement) return null;
      var rect = canvas.parentElement.getBoundingClientRect();
      var w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
      var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      var tw = Math.floor(w * dpr), th = Math.floor(h * dpr);
      if (canvas.width !== tw) canvas.width = tw;
      if (canvas.height !== th) canvas.height = th;
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      return { ctx: ctx, w: w, h: h };
    }

    function roundRectPath(ctx, x, y, w, h, r) {
      if (w <= 0 || h <= 0) return;
      var rad = Math.min(r, w / 2, h / 2);
      ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.lineTo(x + w - rad, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h - rad);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h); ctx.lineTo(x + rad, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rad); ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y); ctx.closePath();
    }

    function topRoundedBar(ctx, x, y, w, h, r) {
      if (w <= 0 || h <= 0) return;
      var rad = Math.min(r, w / 2, h);
      ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y); ctx.lineTo(x + w - rad, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h); ctx.closePath();
    }

    function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
      ctx.save(); ctx.font = '700 11px "IBM Plex Mono", system-ui, sans-serif';
      var tw = ctx.measureText(text).width + 10, th = 18;
      ctx.fillStyle = pal.pillBg; roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5); ctx.fill();
      ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, cx, cy + 0.5); ctx.restore();
    }

    function drawSmoothLine(ctx, pts) {
      if (!pts.length) return;
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      for (var i = 0; i < pts.length - 1; i++) {
        var xc = (pts[i].x + pts[i + 1].x) / 2;
        ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
      }
    }

    function drawCh1Chart() {
      var env = prepareCanvas('chartCh1');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartCh1 = [];
      var vCfg = CH1_CONFIG[state.ch1View], en = isEn();
      var labels = en ? vCfg.labels_en : vCfg.labels_zh;
      var subs = en ? vCfg.subs_en : vCfg.subs_zh;
      var s1 = vCfg.s1, s2 = vCfg.s2, u1 = vCfg.u1, u2 = vCfg.u2;
      var pad = { top: 28, right: 54, bottom: 44, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var max1 = vCfg.max1, max2 = vCfg.max2;

      for (var g = 0; g <= 4; g++) {
        var r = g / 4, gy = pad.top + ph - r * ph;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
        ctx.fillStyle = pal.tick; ctx.textAlign = 'right';
        ctx.fillText(Math.round(max1 * r) + u1, pad.left - 8, gy);
        ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
        ctx.fillText(Math.round(max2 * r) + u2, pad.left + pw + 8, gy);
      }

      var step = pw / labels.length, barW = Math.min(62, Math.max(26, step * 0.36)), pts = [];
      for (var i = 0; i < labels.length; i++) {
        var cx = pad.left + step * (i + 0.5);
        if (hoverState.chartCh1 === i) {
          ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 6, pad.top, step - 12, ph, 8); ctx.fill();
        }
        if (state.ch1Series.s1) {
          var bh = (s1[i] / max1) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
          var grad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
          grad.addColorStop(0, '#3399FF'); grad.addColorStop(1, '#0066CC');
          ctx.fillStyle = grad; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
          if (bh > 22) ctx.fillText('$' + s1[i] + u1, cx, by + 16);
          else drawValueBadge(ctx, '$' + s1[i] + u1, cx, by - 11, pal.c1, pal);
        }
        pts.push({ x: cx, y: pad.top + ph - (s2[i] / max2) * ph, val: s2[i] });
        ctx.fillStyle = pal.text; ctx.font = '700 ' + (w < 480 ? '10.5px' : '11.5px') + ' system-ui, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(labels[i], cx, pad.top + ph + 20);
        ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif';
        ctx.fillText(subs[i], cx, pad.top + ph + 35);

        hitRegions.chartCh1.push({
          idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 38,
          html: '<strong>' + escapeHtml(labels[i]) + ' (' + escapeHtml(subs[i]) + ')</strong><br/>' +
            '• ' + escapeHtml(en ? vCfg.leg1_en : vCfg.leg1_zh) + ': <strong>$' + s1[i] + u1 + '</strong><br/>' +
            '• ' + escapeHtml(en ? vCfg.leg2_en : vCfg.leg2_zh) + ': <strong>' + s2[i] + u2 + '</strong>'
        });
      }
      if (state.ch1Series.s2) {
        ctx.save(); drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
        for (var n = 0; n < pts.length; n++) {
          ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 6, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 4.2, 0, Math.PI * 2); ctx.fill();
          drawValueBadge(ctx, pts[n].val + u2, pts[n].x, Math.max(12, pts[n].y - 15), pal.c2, pal);
        }
      }
    }

    function drawRadarChart() {
      var env = prepareCanvas('chartRadar');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartRadar = [];
      var axes = isEn() ? RADAR_CFG.axes_en : RADAR_CFG.axes_zh;
      var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : (state.activePillar % 4);
      var series = [
        { key: 's0', name: isEn() ? RADAR_CFG.s0_en : RADAR_CFG.s0_zh, color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: RADAR_CFG.v0 },
        { key: 's1', name: isEn() ? RADAR_CFG.s1_en : RADAR_CFG.s1_zh, color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: RADAR_CFG.v1 },
        { key: 's2', name: isEn() ? RADAR_CFG.s2_en : RADAR_CFG.s2_zh, color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: RADAR_CFG.v2 }
      ];
      var cx = w / 2, cy = h / 2 + 8, sidePad = w < 420 ? 88 : 108;
      var radius = Math.max(58, Math.min((w - sidePad * 2) / 2, h * 0.35)), total = axes.length;

      for (var ring = 2; ring <= 10; ring += 2) {
        var r = (ring / 10) * radius;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1; ctx.beginPath();
        for (var i = 0; i < total; i++) {
          var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
          var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '600 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(String(ring), cx + 4, cy - r);
      }

      for (var a = 0; a < total; a++) {
        var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
        var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
        var isHi = a === highlightedAxis;
        ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.8 : 1;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();

        var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
        ctx.fillStyle = isHi ? pal.c1 : pal.text;
        ctx.font = (isHi ? '800 ' : '600 ') + (w < 420 ? '10.5px' : '11.5px') + ' system-ui, sans-serif'; ctx.textBaseline = 'middle';
        if (Math.abs(Math.cos(angle)) < 0.2) ctx.textAlign = 'center';
        else if (Math.cos(angle) > 0) ctx.textAlign = 'left';
        else ctx.textAlign = 'right';
        ctx.fillText(axes[a], lx, ly);

        hitRegions.chartRadar.push({
          idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
          html: '<strong>' + escapeHtml(axes[a]) + (isEn() ? ' (10-Pt Scale)' : ' (10分制评估)') + '</strong><br/>' +
            '• ' + escapeHtml(series[0].name) + ': <strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>' +
            '• ' + escapeHtml(series[1].name) + ': <strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>' +
            '• ' + escapeHtml(series[2].name) + ': <strong>' + series[2].vals[a].toFixed(1) + '</strong>'
        });
      }

      for (var s = 0; s < series.length; s++) {
        var item = series[s];
        if (!state.radarSeries[item.key]) continue;
        ctx.beginPath();
        for (var idx = 0; idx < total; idx++) {
          var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total, dist = (item.vals[idx] / 10) * radius;
          var vx = cx + Math.cos(theta) * dist, vy = cy + Math.sin(theta) * dist;
          if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
        }
        ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
        for (var pIdx = 0; pIdx < total; pIdx++) {
          var pTheta = -Math.PI / 2 + (pIdx * 2 * Math.PI) / total, pDist = (item.vals[pIdx] / 10) * radius;
          var pX = cx + Math.cos(pTheta) * pDist, pY = cy + Math.sin(pTheta) * pDist;
          ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pX, pY, 5.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = item.color; ctx.beginPath(); ctx.arc(pX, pY, 3.6, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    function drawHorizontalBars() {
      var env = prepareCanvas('chartBars');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartBars = [];
      var items = isEn() ? BARS_CFG.items_en : BARS_CFG.items_zh, maxX = BARS_CFG.max_x;
      var colors = [['#34D399', '#16A34A'], ['#FBBF24', '#D97706'], ['#3399FF', '#0073E6'], ['#A78BFA', '#7C3AED'], ['#38BDF8', '#0284C7']];
      var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      for (var g = 0; g <= 5; g++) {
        var xVal = Math.round((maxX / 5) * g), gx = pad.left + (g / 5) * pw;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif';
        ctx.textAlign = g === 0 ? 'left' : (g === 5 ? 'right' : 'center'); ctx.textBaseline = 'alphabetic';
        ctx.fillText('$' + xVal + 'B', gx, pad.top + ph + 18);
      }

      var tx = pad.left + (BARS_CFG.ref_line / maxX) * pw;
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(tx, pad.top + 4); ctx.lineTo(tx, pad.top + ph - 4); ctx.stroke(); ctx.restore();

      var rowH = ph / items.length;
      for (var i = 0; i < items.length; i++) {
        var rowTop = pad.top + rowH * i, cPair = colors[i % colors.length];
        if (hoverState.chartBars === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left - 6, rowTop + 2, pw + 12, rowH - 4, 8); ctx.fill(); }
        var labelY = rowTop + Math.max(15, rowH * 0.34), barY = rowTop + Math.max(22, rowH * 0.50);
        var barH = Math.min(15, Math.max(11, rowH * 0.26)), bw = Math.max(8, Math.min(pw, (items[i].val / maxX) * pw));
        ctx.fillStyle = pal.text; ctx.font = '600 ' + (w < 460 ? '11px' : '12px') + ' system-ui, sans-serif';
        ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(items[i].label, pad.left, labelY);

        ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? cPair[0] : cPair[1];
        ctx.textAlign = 'right'; ctx.fillText(items[i].disp, pad.left + pw, labelY);

        if (w >= 580 && items[i].sub) {
          var valW = ctx.measureText(items[i].disp).width + 10;
          ctx.font = '500 11px "IBM Plex Mono", system-ui, sans-serif'; ctx.fillStyle = pal.tick;
          ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
        }
        ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
        var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
        barGrad.addColorStop(0, cPair[0]); barGrad.addColorStop(1, cPair[1]);
        ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();

        hitRegions.chartBars.push({
          idx: i, x: pad.left, y: rowTop, w: pw, h: rowH,
          html: '<strong>' + escapeHtml(items[i].label) + ': ' + escapeHtml(items[i].disp) + '</strong><br/>• ' + escapeHtml(items[i].sub) + '<br/>• ' + escapeHtml(items[i].note)
        });
      }
    }

    function drawEpsComboChart() {
      var env = prepareCanvas('chartEps');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartEps = [];
      var cCfg = COMBO_CFG, en = isEn();
      var titles = en ? cCfg.titles_en : cCfg.titles_zh, subs = en ? cCfg.subs_en : cCfg.subs_zh;
      var bars = cCfg.bars, line = cCfg.line, uB = cCfg.u_bar, uL = cCfg.u_line;
      var pad = { top: 26, right: 54, bottom: 44, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var minB = 0, maxB = cCfg.max_bar, minL = cCfg.min_line, maxL = cCfg.max_line;

      for (var g = 0; g <= 4; g++) {
        var ratio = g / 4, gy = pad.top + ph - ratio * ph;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
        ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('$' + Math.round(minB + ratio * (maxB - minB)) + uB, pad.left - 7, gy);
        ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText(Math.round(minL + ratio * (maxL - minL)) + uL, pad.left + pw + 7, gy);
      }

      var targetY = pad.top + ph - ((cCfg.ref_line - minL) / (maxL - minL)) * ph;
      ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pad.left, targetY); ctx.lineTo(pad.left + pw, targetY); ctx.stroke(); ctx.restore();

      var step = pw / titles.length, barW = Math.min(48, Math.max(24, step * 0.42)), linePts = [];
      for (var i = 0; i < titles.length; i++) {
        var cx = pad.left + step * (i + 0.5);
        if (hoverState.chartEps === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 6); ctx.fill(); }
        if (state.epsSeries.rev) {
          var bh = ((bars[i] - minB) / (maxB - minB)) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
          var eGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
          if (i === cCfg.highlight_idx) { eGrad.addColorStop(0, '#66B2FF'); eGrad.addColorStop(1, '#0073E6'); }
          else { eGrad.addColorStop(0, '#3399FF'); eGrad.addColorStop(1, '#0059B2'); }
          ctx.fillStyle = eGrad; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
          if (bh > 22) ctx.fillText('$' + bars[i] + uB, cx, by + 16);
          else drawValueBadge(ctx, '$' + bars[i] + uB, cx, by - 11, pal.c1, pal);
        }
        linePts.push({ x: cx, y: pad.top + ph - ((line[i] - minL) / (maxL - minL)) * ph, val: line[i] });
        ctx.fillStyle = pal.text; ctx.font = '700 ' + (w < 460 ? '10px' : '11.5px') + ' system-ui, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(titles[i], cx, pad.top + ph + 19);
        ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif'; ctx.fillText(subs[i], cx, pad.top + ph + 33);

        hitRegions.chartEps.push({
          idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
          html: '<strong>' + escapeHtml(titles[i]) + ' (' + escapeHtml(subs[i]) + ')</strong><br/>' +
            '• ' + escapeHtml(en ? cCfg.leg1_en : cCfg.leg1_zh) + ': <strong>$' + bars[i] + uB + '</strong><br/>' +
            '• ' + escapeHtml(en ? cCfg.leg2_en : cCfg.leg2_zh) + ': <strong>' + line[i] + uL + '</strong>'
        });
      }
      if (state.epsSeries.oci) {
        ctx.save(); drawSmoothLine(ctx, linePts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
        for (var m = 0; m < linePts.length; m++) {
          ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 6, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 4.2, 0, Math.PI * 2); ctx.fill();
          drawValueBadge(ctx, linePts[m].val + uL, linePts[m].x, Math.max(12, linePts[m].y - 15), pal.c2, pal);
        }
      }
    }

    function drawSimChart() {
      var env = prepareCanvas('chartSim');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.chartSim = [];
      var simRes = computeLifecycleSeries(), yrs = simRes.yrs, totalS = simRes.cumTotalB, baseS = simRes.cumStreamB;
      var maxVal = Math.max(totalS[yrs], 100) * 1.12;
      var pad = { top: 20, right: 20, bottom: 28, left: 62 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      for (var g = 0; g <= 3; g++) {
        var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(fmtMoneyB(v), pad.left - 7, gy);
      }

      var stepX = pw / yrs;
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.7; ctx.beginPath();
      for (var i = 0; i <= yrs; i++) {
        var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (baseS[i] / maxVal) * ph;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.restore();

      ctx.beginPath();
      for (var j = 0; j <= yrs; j++) {
        var tx = pad.left + (j / yrs) * pw, ty = pad.top + ph - (totalS[j] / maxVal) * ph;
        if (j === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
        var diff = totalS[j] - baseS[j];
        hitRegions.chartSim.push({
          idx: j, x: tx - Math.max(6, stepX * 0.5), y: pad.top, w: Math.max(12, stepX), h: ph + 24,
          html: isEn()
            ? ('<strong>Year ' + j + ' Cumulative Gross Profit</strong><br/>• Full-Stack GP: <strong>' + fmtMoneyB(totalS[j]) + '</strong><br/>• Compute Hardware GP: ' + fmtMoneyB(baseS[j]) + '<br/>• Network & Software Lift: <strong style="color:#22C55E;">+' + fmtMoneyB(diff) + '</strong>')
            : ('<strong>第 ' + j + ' 年累计生态总毛利对比</strong><br/>• 全栈累计总毛利：<strong>' + fmtMoneyB(totalS[j]) + '</strong><br/>• 算力硬件直接毛利：' + fmtMoneyB(baseS[j]) + '<br/>• 网络与软件连带毛利：<strong style="color:#22C55E;">+' + fmtMoneyB(diff) + '</strong>')
        });
      }
      ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.8; ctx.stroke();
      ctx.lineTo(pad.left + pw, pad.top + ph); ctx.lineTo(pad.left, pad.top + ph); ctx.closePath();
      var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph);
      grad.addColorStop(0, 'rgba(0, 115, 230, 0.30)'); grad.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
      ctx.fillStyle = grad; ctx.fill();

      var midYr = Math.max(1, Math.floor(yrs / 2));
      if (hoverState.chartSim >= 0 && hoverState.chartSim <= yrs) {
        var hi = hoverState.chartSim, hx = pad.left + (hi / yrs) * pw;
        var hy1 = pad.top + ph - (totalS[hi] / maxVal) * ph, hy2 = pad.top + ph - (baseS[hi] / maxVal) * ph;
        ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = pal.c1; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(hx, pad.top); ctx.lineTo(hx, pad.top + ph); ctx.stroke(); ctx.restore();
        ctx.fillStyle = pal.tick; ctx.beginPath(); ctx.arc(hx, hy2, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.c1; ctx.beginPath(); ctx.arc(hx, hy1, 5.5, 0, Math.PI * 2); ctx.fill();
      }

      var keyYears = [0, 1, midYr, yrs];
      for (var ky = 0; ky < keyYears.length; ky++) {
        var yrIdx = keyYears[ky], kx = pad.left + (yrIdx / yrs) * pw, kyY = pad.top + ph - (totalS[yrIdx] / maxVal) * ph;
        ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(kx, kyY, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.c1; ctx.beginPath(); ctx.arc(kx, kyY, 3.5, 0, Math.PI * 2); ctx.fill();
      }
      drawValueBadge(ctx, fmtMoneyB(totalS[yrs]), Math.min(w - 46, pad.left + pw - 26), Math.max(pad.top + 12, pad.top + ph - (totalS[yrs] / maxVal) * ph - 14), pal.c1, pal);

      ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left'; ctx.fillText(isEn() ? 'Year 0' : '测算起点', pad.left, pad.top + ph + 19);
      ctx.textAlign = 'center'; ctx.fillText((isEn() ? ('Year ' + midYr) : ('第 ' + midYr + ' 年')) + ' (' + fmtMoneyB(totalS[midYr]) + ')', pad.left + (midYr / yrs) * pw, pad.top + ph + 19);
      ctx.textAlign = 'right'; ctx.fillText(isEn() ? ('Year ' + yrs) : ('第 ' + yrs + ' 年'), pad.left + pw, pad.top + ph + 19);
    }

    var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
    function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

    function wireCanvasTooltip(canvasId) {
      var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
      if (!canvas || !tip) return;
      function handlePointer(clientX, clientY) {
        var rect = canvas.getBoundingClientRect(), mx = clientX - rect.left, my = clientY - rect.top;
        var regions = hitRegions[canvasId] || [], found = null;
        for (var i = 0; i < regions.length; i++) {
          var r = regions[i];
          if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { found = r; break; }
        }
        var nextIdx = found && typeof found.idx === 'number' ? found.idx : -1;
        if (hoverState[canvasId] !== nextIdx) { hoverState[canvasId] = nextIdx; if (redrawMap[canvasId]) redrawMap[canvasId](); }
        if (found) {
          tip.innerHTML = found.html; tip.style.display = 'block';
          var tipW = tip.offsetWidth || 260, tipH = tip.offsetHeight || 74;
          var leftPos = clientX + 14;
          if (leftPos + tipW > window.innerWidth - 12) leftPos = Math.max(12, clientX - tipW - 14);
          var topPos = Math.max(12, Math.min(window.innerHeight - tipH - 12, clientY - 18));
          tip.style.left = leftPos + 'px'; tip.style.top = topPos + 'px';
        } else { tip.style.display = 'none'; }
      }
      canvas.addEventListener('mousemove', function (e) { handlePointer(e.clientX, e.clientY); });
      canvas.addEventListener('touchstart', function (e) { if (e.touches && e.touches[0]) handlePointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
      canvas.addEventListener('mouseleave', function () {
        if (hoverState[canvasId] !== -1) { hoverState[canvasId] = -1; if (redrawMap[canvasId]) redrawMap[canvasId](); }
        tip.style.display = 'none';
      });
    }

    function applyLanguage(lang, silent) {
      state.lang = lang === 'en' ? 'en' : 'zh';
      var en = isEn();
      document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
      document.documentElement.setAttribute('data-lang', state.lang);
      document.title = en
        ? 'NVIDIA (NASDAQ: NVDA) Business Model Deep-Dive Report (Q3 FY2027 $115.84B) | Research Hub'
        : 'NVIDIA 英伟达 (NASDAQ: NVDA) 商业模式深度研究报告（Q3 FY2027 $115.84B 全景拆解）| 数据中心';

      var zhBtn = document.getElementById('langZhBtn'), enBtn = document.getElementById('langEnBtn');
      zhBtn.classList.toggle('active', !en); enBtn.classList.toggle('active', en);
      zhBtn.setAttribute('aria-pressed', String(!en)); enBtn.setAttribute('aria-pressed', String(en));

      var txtNodes = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
      for (var i = 0; i < txtNodes.length; i++) txtNodes[i].textContent = en ? txtNodes[i].getAttribute('data-i18n-en') : txtNodes[i].getAttribute('data-i18n-zh');

      var richNodes = document.querySelectorAll('[data-i18n-rich]');
      for (var r = 0; r < richNodes.length; r++) {
        var entry = RICH_MAP[richNodes[r].getAttribute('data-i18n-rich')];
        if (entry) richNodes[r].innerHTML = en ? entry.en : entry.zh;
      }

      var phNodes = document.querySelectorAll('[data-ph-zh][data-ph-en]');
      for (var p = 0; p < phNodes.length; p++) phNodes[p].setAttribute('placeholder', en ? phNodes[p].getAttribute('data-ph-en') : phNodes[p].getAttribute('data-ph-zh'));
      var tiNodes = document.querySelectorAll('[data-title-zh][data-title-en]');
      for (var t = 0; t < tiNodes.length; t++) tiNodes[t].setAttribute('title', en ? tiNodes[t].getAttribute('data-title-en') : tiNodes[t].getAttribute('data-title-zh'));
      var arNodes = document.querySelectorAll('[data-aria-zh][data-aria-en]');
      for (var a = 0; a < arNodes.length; a++) arNodes[a].setAttribute('aria-label', en ? arNodes[a].getAttribute('data-aria-en') : arNodes[a].getAttribute('data-aria-zh'));

      document.getElementById('pillarFocusNote').innerHTML = '<div>' + (en ? PILLAR_NOTES.en : PILLAR_NOTES.zh)[state.activePillar] + '</div>';
      applyDensity(state.density, true);
      syncCh1HeaderText();
      syncCollapseButtonsText();
      renderPeerTable();
      renderChecklist();
      updateSimulatorUI();
      renderAllCharts();
      safeSet(STORAGE_LANG_KEY, state.lang);
      if (!silent) showToast(en ? 'Switched to English Research Edition' : '已切换至中文深度研报视图');
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
      void 0;
      void 0;
      safeSet(STORAGE_THEME_KEY, state.theme);
      renderAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Obsidian Mode' : '已切换至 MUI 深海黑曜石护眼模式') : (isEn() ? 'Switched to Light Clarity Mode' : '已切换至 MUI 高清明亮浅色模式'));
    }

    function toggleSidebar() {
      if (window.innerWidth < 1120) {
        document.body.classList.toggle('drawer-open');
      } else {
        var next = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
        if (next) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        else document.documentElement.removeAttribute('data-sidebar-collapsed');
        safeSet(STORAGE_SIDEBAR_KEY, next ? '1' : '0');
        setTimeout(renderAllCharts, 60);
      }
    }
    function closeMobileDrawer() { document.body.classList.remove('drawer-open'); }

    function exportHtml() {
      var cloneRoot = document.documentElement.cloneNode(true);
      var tip = cloneRoot.querySelector('#chartTooltip');
      if (tip) tip.style.display = 'none';
      var snack = cloneRoot.querySelector('#muiSnackbar');
      if (snack) snack.classList.remove('show');
      var blob = new Blob(['<!DOCTYPE html>\n' + cloneRoot.outerHTML], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url; link.download = 'Nvidia_Business_Model_Analysis.html';
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast(isEn() ? 'Exported standalone HTML report' : '已导出独立 HTML 研报文件');
    }

    function init() {
      var savedTheme = safeGet(STORAGE_THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
      var savedLang = safeGet(STORAGE_LANG_KEY);
      if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;
      var savedDens = safeGet(STORAGE_DENSITY_KEY);
      if (savedDens === 'compact' || savedDens === 'relaxed') state.density = savedDens;
      state.checks = loadChecks();

      ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);

      if ('IntersectionObserver' in window) {
        var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
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

      applyTheme(state.theme, true);
      applyLanguage(state.lang, true);

      document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
      document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
      document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
      void 0;
      document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
      document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
      void 0;
      void 0;
      void 0;
      void 0;

      var tocLinksAll = document.querySelectorAll('#tocNavList .mui-nav-link');
      for (var t = 0; t < tocLinksAll.length; t++) tocLinksAll[t].addEventListener('click', closeMobileDrawer);

      document.addEventListener('click', function (e) {
        var ch1Btn = e.target.closest('[data-ch1-view]');
        if (ch1Btn) {
          state.ch1View = ch1Btn.getAttribute('data-ch1-view');
          document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
          document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
          syncCh1HeaderText(); drawCh1Chart(); return;
        }
        var ch1Ser = e.target.closest('[data-ch1-series]');
        if (ch1Ser) {
          var sk = ch1Ser.getAttribute('data-ch1-series');
          state.ch1Series[sk] = !state.ch1Series[sk];
          if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
          ch1Ser.classList.toggle('muted', !state.ch1Series[sk]); drawCh1Chart(); return;
        }
        var colBtn = e.target.closest('[data-collapse-target]');
        if (colBtn) {
          var panel = document.getElementById(colBtn.getAttribute('data-collapse-target'));
          if (panel) panel.classList.toggle('open');
          syncCollapseButtonsText(); return;
        }
        var pilCard = e.target.closest('[data-pillar]');
        if (pilCard) {
          var idx = parseInt(pilCard.getAttribute('data-pillar'), 10) || 0;
          state.activePillar = idx;
          var allPils = document.querySelectorAll('[data-pillar]');
          for (var k = 0; k < allPils.length; k++) allPils[k].classList.toggle('active', k === idx);
          document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES.en : PILLAR_NOTES.zh)[idx] + '</div>';
          drawRadarChart(); return;
        }
        var radPill = e.target.closest('[data-radar-key]');
        if (radPill) {
          var rKey = radPill.getAttribute('data-radar-key');
          state.radarSeries[rKey] = !state.radarSeries[rKey];
          if (!state.radarSeries.s0 && !state.radarSeries.s1 && !state.radarSeries.s2) state.radarSeries[rKey] = true;
          radPill.classList.toggle('muted', !state.radarSeries[rKey]); drawRadarChart(); return;
        }
        var pfBtn = e.target.closest('[data-peer-filter]');
        if (pfBtn) {
          state.peerFilter = pfBtn.getAttribute('data-peer-filter');
          var allPf = document.querySelectorAll('[data-peer-filter]');
          for (var x = 0; x < allPf.length; x++) allPf[x].classList.toggle('active', allPf[x] === pfBtn);
          renderPeerTable(); return;
        }
        var epsBtn = e.target.closest('[data-eps-series]');
        if (epsBtn) {
          var ek = epsBtn.getAttribute('data-eps-series');
          state.epsSeries[ek] = !state.epsSeries[ek];
          if (!state.epsSeries.rev && !state.epsSeries.oci) state.epsSeries[ek] = true;
          epsBtn.classList.toggle('muted', !state.epsSeries[ek]); drawEpsComboChart(); return;
        }
        var prBtn = e.target.closest('[data-preset]');
        if (prBtn) {
          var pKey = prBtn.getAttribute('data-preset'), cfg = SIM_PRESETS[pKey];
          if (!cfg) return;
          state.sim = { views: cfg.views, v_per_view: cfg.v_per_view, ancillary_m: cfg.ancillary_m, years: cfg.years, transmedia: cfg.transmedia, preset: pKey };
          document.getElementById('simPrincipalSlider').value = String(cfg.views);
          document.getElementById('simCagrSlider').value = String(cfg.v_per_view);
          document.getElementById('simLiveArpuSlider').value = String(cfg.ancillary_m);
          document.getElementById('simYearsSlider').value = String(cfg.years);
          document.getElementById('simDripToggle').checked = cfg.transmedia;
          updateSimulatorUI(); return;
        }
        if (e.target.closest('#checkAllBtn')) {
          state.checks = [true, true, true, true, true, true];
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
          showToast(isEn() ? 'Checked all 6 moat criteria' : '已勾选全部 6 项护城河核查指标'); return;
        }
        if (e.target.closest('#resetCheckBtn')) {
          state.checks = [true, true, true, true, false, false];
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
          showToast(isEn() ? 'Checklist reset to baseline (67%)' : '核查清单已恢复默认基准状态 (67%)'); return;
        }
      });

      document.addEventListener('input', function (e) {
        if (e.target.id === 'peerSearchInput') { state.peerQuery = e.target.value; renderPeerTable(); }
        else if (e.target.id === 'simPrincipalSlider') { state.sim.views = parseFloat(e.target.value) || 4; state.sim.preset = ''; updateSimulatorUI(); }
        else if (e.target.id === 'simCagrSlider') { state.sim.v_per_view = parseFloat(e.target.value) || 25; state.sim.preset = ''; updateSimulatorUI(); }
        else if (e.target.id === 'simLiveArpuSlider') { state.sim.ancillary_m = parseFloat(e.target.value) || 20; state.sim.preset = ''; updateSimulatorUI(); }
        else if (e.target.id === 'simYearsSlider') { state.sim.years = parseInt(e.target.value, 10) || 5; state.sim.preset = ''; updateSimulatorUI(); }
      });

      document.addEventListener('change', function (e) {
        if (e.target.id === 'simDripToggle') { state.sim.transmedia = !!e.target.checked; updateSimulatorUI(); return; }
        var chk = e.target.closest ? e.target.closest('[data-check-input]') : null;
        if (chk) {
          state.checks[parseInt(chk.getAttribute('data-check-input'), 10)] = !!chk.checked;
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
        }
      });

      var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
      function renderJumpList(q) {
        var kw = (q || '').trim().toLowerCase();
        var items = (isEn() ? QUICK_JUMP_EN : QUICK_JUMP_ZH).filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
        jumpPop.innerHTML = items.length ? items.map(function (item) {
          return '<button type="button" class="quick-jump-item" data-jump-id="' + item.id + '"><span class="quick-jump-item-title">' + escapeHtml(item.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(item.sub) + '</span></button>';
        }).join('') : '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">' + (isEn() ? 'No matching section' : '未匹配到对应章节') + '</div>';
        jumpPop.classList.add('open');
      }
      jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
      jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
      jumpPop.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-jump-id]');
        if (btn) {
          var secEl = document.getElementById(btn.getAttribute('data-jump-id'));
          if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
          jumpPop.classList.remove('open');
        }
      });
      document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
        else if (e.key === 'Escape') { jumpPop.classList.remove('open'); closeMobileDrawer(); }
      });

      function updateScrollProgress() {
        var docEl = document.documentElement, scrollTop = window.scrollY || docEl.scrollTop || 0;
        var maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
        document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) + '%';
      }
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
      updateScrollProgress();

      var resizeTimer = null;
      function scheduleRedraw() { if (resizeTimer) clearTimeout(resizeTimer); resizeTimer = setTimeout(renderAllCharts, 60); }
      window.addEventListener('resize', scheduleRedraw);
      if ('ResizeObserver' in window) {
        var mainEl = document.querySelector('.main-content');
        if (mainEl) new ResizeObserver(scheduleRedraw).observe(mainEl);
      }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();
  