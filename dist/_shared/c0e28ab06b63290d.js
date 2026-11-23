
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_DENSITY_KEY = 'mui_clarity_density_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

    var PILLARS = [{"id": "ai_suite", "num": "01", "mono": "AI", "cat": "eda_design", "catZh": "EDA 设计与签核", "catEn": "EDA & Signoff", "titleZh": "Synopsys.ai 与 Agentic AI 套件", "titleEn": "Synopsys.ai & Agentic AI Suite", "metaZh": "DSO.ai · VSO.ai · AgentEngineer™", "metaEn": "DSO.ai · VSO.ai · AgentEngineer™", "badgeZh": "AI-DRIVEN EDA · 全栈自主工程", "badgeEn": "AI-DRIVEN EDA · AUTONOMOUS ENGINEERING", "subZh": "业界首个覆盖架构、数字实现、模拟迁移、验证、测试与 3D-IC 的全栈 AI 驱动型 EDA 与自主智能体平台", "subEn": "Industry-first full-stack AI-driven EDA and agentic engineering platform spanning architecture, digital, analog, verification, test, and 3D-IC", "kpis": [{"lblZh": "VSO.ai 回归测试压缩", "lblEn": "VSO.ai Regression Compression", "val": "2–7x", "badgeZh": "覆盖率 +33%", "badgeEn": "+33% Coverage", "noteZh": "机器学习自动剔除冗余回归并定位覆盖率漏洞", "noteEn": "ML prunes redundant regressions & finds coverage gaps"}, {"lblZh": "VSO.ai 验证生产力", "lblEn": "VSO.ai Verification Productivity", "val": "Up to 10x", "badgeZh": "自动根因分析", "badgeEn": "Root-Cause AI", "noteZh": "工程师专注修复缺陷而非手工排查波形", "noteEn": "Engineers focus on fixing bugs, not hunting them"}, {"lblZh": "2026 自主智能体", "lblEn": "2026 Agentic AI", "val": "AgentEngineer", "badgeZh": "Autopilot™", "badgeEn": "Autopilot™", "noteZh": "领域专用 AI 智能体实现设计、验证与调试自动化", "noteEn": "Domain-specific agents for autonomous engineering"}, {"lblZh": "AI 驱动协同生态", "lblEn": "AI Ecosystem", "val": "Azure / NVIDIA", "badgeZh": "Copilot + 物理AI", "badgeEn": "Copilot + PhysAI", "noteZh": "Synopsys.ai Copilot 联合微软 Azure OpenAI 打造", "noteEn": "Synopsys.ai Copilot built with Microsoft Azure OpenAI"}], "thesisZh": "新思科技通过 <strong>Synopsys.ai</strong> 将强化学习、生成式 AI 与 2026 年推出的 <strong>AgentEngineer™</strong> 智能体深度嵌入芯片全流程，把原本依赖人工试错的 PPA 寻优与验证收敛转化为自主探索，直接应对埃米时代与 AI 算力芯片的指数级复杂度。", "thesisEn": "Synopsys embeds reinforcement learning, generative AI, and 2026 <strong>AgentEngineer™</strong> agents across the full chip lifecycle via <strong>Synopsys.ai</strong>, turning manual PPA tuning and verification closure into autonomous exploration.", "highlights": [{"titleZh": "全栈 AI 优化闭环", "titleEn": "Full-Stack AI Optimization", "descZh": "覆盖数字（DSO.ai）、验证（VSO.ai）、模拟（ASO.ai）、测试（TSO.ai）与 3D-IC（3DSO.ai）。", "descEn": "Covers digital (DSO.ai), verification (VSO.ai), analog (ASO.ai), test (TSO.ai), and 3D-IC (3DSO.ai)."}, {"titleZh": "2026 Agentic AI 跃迁", "titleEn": "2026 Agentic AI Leap", "descZh": "AgentEngineer™ 与 Autopilot™ 平台将单点参数寻优升级为跨工具链的多智能体自主编排。", "descEn": "AgentEngineer™ & Autopilot™ elevate point optimization to multi-agent workflow orchestration."}, {"titleZh": "数据驱动持续进化", "titleEn": "Data-Driven Feedback Loop", "descZh": "Design.da 与 Silicon.da 聚合设计、制造与现场运行数据，持续反哺 AI 决策精度。", "descEn": "Design.da and Silicon.da connect design, fab, and field telemetry to sharpen AI decisions."}], "products": [{"name": "Synopsys DSO.ai™", "roleZh": "数字设计空间优化", "roleEn": "Design Space Optimization", "craftZh": "强化学习 · 自主 PPA 寻优", "craftEn": "RL-Based Autonomous PPA", "specZh": "在海量 RTL-to-GDSII 解空间自动寻优功耗、性能与面积，与 Fusion Compiler 深度耦合", "specEn": "Autonomous PPA exploration in RTL-to-GDSII paired with Fusion Compiler", "takeZh": "业界首个规模化量产的 AI 芯片设计应用", "takeEn": "Industry-first volume-proven AI chip design app", "url": "https://www.synopsys.com/ai/ai-powered-eda/dso-ai.html"}, {"name": "Synopsys VSO.ai™", "roleZh": "验证空间优化", "roleEn": "Verification Space Optimization", "craftZh": "覆盖率 +33% · 回归 2–7x", "craftEn": "+33% Cov · 2–7x Regress", "specZh": "自动消除冗余回归测试并推断覆盖率盲区，验证生产力提升最高达 10x", "specEn": "Eliminates redundant regressions and infers coverage gaps (up to 10x productivity)", "takeZh": "大幅压缩流片前验证算力与周期成本", "takeEn": "Cuts pre-tapeout verification compute & schedule", "url": "https://www.synopsys.com/ai/ai-powered-eda/vso-ai.html"}, {"name": "Synopsys ASO.ai™", "roleZh": "模拟设计空间优化", "roleEn": "Analog Space Optimization", "craftZh": "跨节点迁移 · 多 PVT 寻优", "craftEn": "Cross-Node · Multi-PVT", "specZh": "跨工艺节点快速迁移模拟电路，跨数百个 PVT 角落自动多目标寻优", "specEn": "Cross-node analog migration and multi-objective optimization across PVT corners", "takeZh": "解决模拟工程师稀缺与节点迁移瓶颈", "takeEn": "Solves analog engineer scarcity & node migration", "url": "https://www.synopsys.com/ai/ai-powered-eda/aso-ai.html"}, {"name": "Synopsys TSO.ai™", "roleZh": "测试空间优化", "roleEn": "Test Space Optimization", "craftZh": "强化学习 · ATPG 压缩", "craftEn": "RL · ATPG Compression", "specZh": "业界首个自主 AI 半导体测试应用，最小化测试向量体积与 ATE 机台时间", "specEn": "Autonomous AI application for semiconductor test pattern & test time minimization", "takeZh": "直接降低大规模量产测试成本", "takeEn": "Directly lowers high-volume ATE test cost", "url": "https://www.synopsys.com/ai/ai-powered-eda/tso-ai.html"}, {"name": "Synopsys 3DSO.ai™", "roleZh": "2.5D/3D-IC 异构优化", "roleEn": "Multi-Die AI Optimization", "craftZh": "电热 · 信号 · PDN 协同", "craftEn": "Thermal · SI · PDN", "specZh": "与 3DIC Compiler 集成，自主优化热完整性、信号完整性与供电网络", "specEn": "Integrated with 3DIC Compiler for thermal, signal integrity, and PDN optimization", "takeZh": "AI 加速器多芯粒封装收敛利器", "takeEn": "Key convergence engine for AI multi-die packages", "url": "https://www.synopsys.com/implementation-and-signoff/3dic-design.html"}, {"name": "AgentEngineer™ & Autopilot™", "roleZh": "自主工程智能体 (2026)", "roleEn": "Agentic AI Platform (2026)", "craftZh": "多智能体 · 开放安全平台", "craftEn": "Multi-Agent · Open Platform", "specZh": "2026 年推出的领域专用 AI 智能体，覆盖实现、验证与调试全流程自动化", "specEn": "2026 domain-specific AI agents automating implementation, verification, and debug", "takeZh": "标志着 EDA 进入自主代理工程新纪元", "takeEn": "Marks EDA's shift to autonomous agentic engineering", "url": "https://www.synopsys.com/ai.html"}, {"name": "Synopsys.ai Copilot", "roleZh": "生成式 AI 助手", "roleEn": "Generative AI Copilot", "craftZh": "Azure OpenAI · LLM 协同", "craftEn": "Azure OpenAI · LLM", "specZh": "联合微软 Azure OpenAI 打造，提供 RTL 辅助生成、脚本自动化与知识问答", "specEn": "Built with Microsoft Azure OpenAI for generative RTL, scripting, and assistance", "takeZh": "显著降低新工程师上手与跨工具脚本门槛", "takeEn": "Lowers onboarding & cross-tool scripting friction", "url": "https://www.synopsys.com/ai/ai-powered-eda.html"}], "workflows": [{"tagZh": "STAGE 01 · 架构探索", "tagEn": "STAGE 01 · ARCHITECTURE", "titleZh": "Copilot 辅助与任务编排", "titleEn": "Copilot & Agent Orchestration", "descZh": "Copilot 辅助生成验证约束与脚本，AgentEngineer 拆解设计任务并调用前端分析。", "descEn": "Copilot assists with constraints and scripts while AgentEngineer orchestrates front-end tasks."}, {"tagZh": "STAGE 02 · 物理寻优", "tagEn": "STAGE 02 · PPA SEARCH", "titleZh": "DSO.ai 与 ASO.ai 并行探索", "titleEn": "DSO.ai & ASO.ai Exploration", "descZh": "在云端或本地集群并行探索数千种策略组合，大幅缩短周转时间并突破人工 PPA 上限。", "descEn": "Explore thousands of implementation strategies in parallel to beat manual PPA."}, {"tagZh": "STAGE 03 · 验证测试", "tagEn": "STAGE 03 · VERIFY & TEST", "titleZh": "VSO.ai 与 TSO.ai 智能收敛", "titleEn": "VSO.ai & TSO.ai Closure", "descZh": "VSO.ai 识别冗余回归并定位覆盖率盲区；TSO.ai 压缩量产测试向量。", "descEn": "VSO.ai prunes redundant regressions; TSO.ai compresses ATPG patterns."}, {"tagZh": "STAGE 04 · 数据闭环", "tagEn": "STAGE 04 · TELEMETRY LOOP", "titleZh": "Design.da 与 Silicon.da 联动", "titleEn": "Design.da & Silicon.da Loop", "descZh": "聚合设计、制造与现场运行数据，定位 PPA 异常并持续反哺下一代芯片迭代。", "descEn": "Connect design, fab, and in-field telemetry to feed next-gen iterations."}], "benchLabels": ["VSO.ai 回归压缩上限", "VSO.ai 验证生产力", "VSO.ai 覆盖率提升", "DSO.ai 策略探索"], "benchVals": [70, 100, 33, 85], "benchTexts": ["7x", "10x", "+33%", "全自动"], "compZh": "对比 Cadence Cerebrus / Verisium 与 Siemens EDA AI 工具，新思科技的优势在于全栈产品线（实现+验证+测试+模拟+3DIC）共享统一数据底座与 2026 年率先落地的 AgentEngineer 智能体编排平台。", "compEn": "Compared to Cadence Cerebrus/Verisium and Siemens EDA AI, Synopsys unifies implementation, verification, test, analog, and 3D-IC on a shared data backbone with 2026 AgentEngineer orchestration.", "evoZh": "2023 年推出 VSO.ai / TSO.ai 及与微软合作的 Copilot；2026 年升级发布 AgentEngineer™ 与 Autopilot™ 开放平台，正式从单点 AI 优化迈向多智能体自主工程。", "evoEn": "Launched VSO.ai/TSO.ai and Copilot in 2023; expanded in 2026 with AgentEngineer™ and the Autopilot™ platform for multi-agent autonomous engineering.", "riskZh": "AI 自主寻优高度依赖云端/集群算力与高质量历史设计数据，客户内部安全合规与数据孤岛可能延缓全自动智能体的全面部署。", "riskEn": "Autonomous AI optimization relies heavily on compute clusters and clean historical design data; enterprise security silos may pace full agentic rollout.", "sources": [{"title": "Agentic AI for Autonomous Engineering | Synopsys", "url": "https://www.synopsys.com/ai.html"}, {"title": "AI Chip Design – AI-powered EDA Solutions | Synopsys", "url": "https://www.synopsys.com/ai/ai-powered-eda.html"}, {"title": "VSO.ai: Industry-Leading AI-Driven Verification Solution | Synopsys", "url": "https://www.synopsys.com/ai/ai-powered-eda/vso-ai.html"}, {"title": "TSO.ai: AI-Driven Test Solution | Synopsys", "url": "https://www.synopsys.com/ai/ai-powered-eda/tso-ai.html"}]}, {"id": "digital_signoff", "num": "02", "mono": "DG", "cat": "eda_design", "catZh": "EDA 设计与签核", "catEn": "EDA & Signoff", "titleZh": "数字设计与签核 (Digital Design & Signoff)", "titleEn": "Digital Design & Signoff", "metaZh": "Fusion Compiler · PrimeTime · IC Validator", "metaEn": "Fusion Compiler · PrimeTime · IC Validator", "badgeZh": "EDA #1 · RTL-TO-GDSII 黄金标准", "badgeEn": "EDA #1 · RTL-TO-GDSII GOLD STANDARD", "subZh": "以单一数据模型贯穿 RTL 综合、布局布线、寄生提取、静态时序签核与物理验证的全球第一大数字实现平台", "subEn": "World's #1 digital implementation & signoff suite uniting RTL synthesis, place-and-route, extraction, STA, and physical verification", "kpis": [{"lblZh": "Design Compiler 拓扑精度", "lblEn": "DC Topographical Accuracy", "val": "<10%", "badgeZh": "物理相关性", "badgeEn": "Post-Layout", "noteZh": "综合结果与布局后时序/面积偏差控制在 10% 以内", "noteEn": "Timing & area within 10% of post-layout results"}, {"lblZh": "IC Validator 分布式扩展", "lblEn": "IC Validator Scalability", "val": "4,000+ Cores", "badgeZh": "当日签核", "badgeEn": "Same-Day", "noteZh": "支持百亿级晶体管光罩极限芯片当日完成 DRC/LVS", "noteEn": "Same-day DRC/LVS on multi-billion transistor chips"}, {"lblZh": "核心签核黄金标准", "lblEn": "Signoff Gold Standard", "val": "PrimeTime", "badgeZh": "全晶圆厂认证", "badgeEn": "Foundry Gold", "noteZh": "全球代工厂认证的门级静态时序分析（STA）标杆", "noteEn": "Foundry-certified gate-level STA benchmark"}, {"lblZh": "Design Automation Q3 营收", "lblEn": "Design Automation Q3 Rev", "val": "$2.00B", "badgeZh": "+96% YoY", "badgeEn": "+96% YoY", "noteZh": "Q3 FY26 分部营收（含 EDA 与 Ansys 并表贡献）", "noteEn": "Q3 FY26 segment revenue (EDA + Ansys)"}], "thesisZh": "数字设计与签核是新思科技最核心的现金牛与技术护城河。<strong>Fusion Compiler</strong> 打破了传统逻辑综合与物理布局布线的工具墙，配合行业黄金标准 <strong>PrimeTime</strong>、<strong>StarRC</strong> 与 <strong>IC Validator</strong>，在 3nm/2nm 及埃米节点占据主导地位。", "thesisEn": "Digital Design & Signoff forms Synopsys' core moat. <strong>Fusion Compiler</strong> unifies synthesis and place-and-route on one data model, backed by foundry-golden <strong>PrimeTime</strong>, <strong>StarRC</strong>, and <strong>IC Validator</strong>.", "highlights": [{"titleZh": "单一数据模型 RTL-to-GDSII", "titleEn": "Single Data-Model RTL-to-GDSII", "descZh": "消除综合与物理实现之间的数据转换损耗与反复迭代。", "descEn": "Eliminates handoff loss between synthesis and physical place-and-route."}, {"titleZh": "全代工厂认证签核黄金标准", "titleEn": "Foundry-Certified Gold Signoff", "descZh": "PrimeTime 与 StarRC 是 TSMC/Samsung/Intel 先进工艺流片必备签核工具。", "descEn": "PrimeTime & StarRC are mandatory signoff standards at leading foundries."}, {"titleZh": "超大规模分布式物理验证", "titleEn": "Massive Distributed DRC/LVS", "descZh": "IC Validator 可扩展至 4,000+ CPU 核心并在实现环境内自动修复违规。", "descEn": "IC Validator scales past 4,000 cores with in-design auto-repair."}], "products": [{"name": "Fusion Compiler™", "roleZh": "RTL-to-GDSII 统一平台", "roleEn": "RTL-to-GDSII Platform", "craftZh": "单一数据模型 · 融合 DSO.ai", "craftEn": "Unified Model · DSO.ai", "specZh": "融合综合与物理实现，提供业界领先的 PPA 与最快设计周转时间", "specEn": "Unified RTL-to-GDSII architecture for superior PPA and turnaround", "takeZh": "AI/HPC 超大芯片数字实现主力平台", "takeEn": "Flagship digital platform for AI/HPC SoCs", "url": "https://www.synopsys.com/implementation-and-signoff/physical-implementation/fusion-compiler.html"}, {"name": "Design Compiler® NXT", "roleZh": "RTL 逻辑综合", "roleEn": "RTL Synthesis", "craftZh": "拓扑精度 <10% · 4核 2x", "craftEn": "<10% Corr · 2x Quad-Core", "specZh": "并发优化时序、面积、功耗与测试，集成拥塞预测与物理引导", "specEn": "Concurrent timing, area, power & test optimization with physical guidance", "takeZh": "全球占有率最高的 RTL 综合黄金标准", "takeEn": "Industry's dominant RTL synthesis standard", "url": "https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler.html"}, {"name": "RTL Architect™", "roleZh": "物理感知 RTL 架构分析", "roleEn": "Physically Aware RTL", "craftZh": "5nm 及以下先进节点", "craftEn": "5nm & Below Nodes", "specZh": "在物理实现前早期预测 RTL 级 PPA、拥塞与功耗瓶颈", "specEn": "Early RTL PPA, congestion, and power prediction for advanced nodes", "takeZh": "把物理收敛大幅左移至架构设计阶段", "takeEn": "Shifts physical closure left to RTL architecture", "url": "https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test.html"}, {"name": "IC Compiler™ II", "roleZh": "布局布线系统", "roleEn": "Place & Route", "craftZh": "大规模 SoC 物理实现", "craftEn": "SoC Place & Route", "specZh": "与 Design Compiler NXT 及 IC Validator 紧密协同的高容量布局布线引擎", "specEn": "High-capacity place-and-route correlated with DC NXT and IC Validator", "takeZh": "成熟与先进节点高性价比物理实现核心", "takeEn": "Proven P&R backbone across mature & advanced nodes", "url": "https://www.synopsys.com/implementation-and-signoff/physical-verification.html"}, {"name": "PrimeTime®", "roleZh": "静态时序分析签核", "roleEn": "Static Timing Analysis", "craftZh": "多角多模 · 功耗签核", "craftEn": "MCMM · Power Signoff", "specZh": "全球半导体行业公认的门级静态时序分析（STA）与信号完整性签核标准", "specEn": "Gold-standard gate-level STA, signal integrity, and power signoff", "takeZh": "几乎所有晶圆厂流片签核的最终裁判", "takeEn": "Universal foundry tape-out timing arbiter", "url": "https://www.synopsys.com/implementation-and-signoff/signoff/primetime.html"}, {"name": "StarRC™", "roleZh": "寄生参数提取", "roleEn": "Parasitic Extraction", "craftZh": "3D 寄生 RC 提取", "craftEn": "3D Parasitic RC", "specZh": "晶圆厂认证的三维寄生电阻电容提取，同时支撑数字与模拟定制签核", "specEn": "Foundry-certified 3D parasitic extraction for digital & custom signoff", "takeZh": "保障纳米级互连延时建模的绝对精准", "takeEn": "Ensures nanometer interconnect delay accuracy", "url": "https://www.synopsys.com/implementation-and-signoff/custom-design-platform/custom-compiler.html"}, {"name": "IC Validator™", "roleZh": "物理验证 (DRC/LVS)", "roleEn": "Physical Verification", "craftZh": "4,000+ CPU 分布式", "craftEn": "4,000+ CPU Scaling", "specZh": "支持最大光罩尺寸芯片当日完成 DRC/LVS/Fill 签核，原生融入数字实现", "specEn": "Same-day DRC/LVS/fill signoff integrated inside Fusion Compiler", "takeZh": "打破传统物理验证串行等待瓶颈", "takeEn": "Breaks late-stage physical verification bottlenecks", "url": "https://www.synopsys.com/implementation-and-signoff/physical-verification.html"}], "workflows": [{"tagZh": "STAGE 01 · 早期架构", "tagEn": "STAGE 01 · EARLY RTL", "titleZh": "RTL Architect 物理感知", "titleEn": "Physically Aware RTL", "descZh": "在代码冻结前预测拥塞、功耗与面积瓶颈，减少后续返工。", "descEn": "Predicts congestion, power, and area bottlenecks before RTL freeze."}, {"tagZh": "STAGE 02 · 统一实现", "tagEn": "STAGE 02 · IMPLEMENTATION", "titleZh": "Fusion Compiler + DSO.ai", "titleEn": "Fusion Compiler + DSO.ai", "descZh": "共享综合与布局布线引擎，结合强化学习自动达成最优 PPA。", "descEn": "Unified synthesis & PnR engines with RL-driven PPA closure."}, {"tagZh": "STAGE 03 · 寄生时序", "tagEn": "STAGE 03 · TIMING SIGNOFF", "titleZh": "StarRC + PrimeTime 签核", "titleEn": "StarRC + PrimeTime Signoff", "descZh": "提取三维寄生参数并执行全芯片多角多模（MCMM）时序签核。", "descEn": "3D parasitic extraction followed by full-chip MCMM STA signoff."}, {"tagZh": "STAGE 04 · 物理流片", "tagEn": "STAGE 04 · TAPE-OUT", "titleZh": "IC Validator 当日签核", "titleEn": "IC Validator Same-Day Signoff", "descZh": "4,000+ 核并发完成 DRC/LVS 检查与自动修补，输出最终 GDSII。", "descEn": "4,000+ core DRC/LVS signoff and auto-repair for final GDSII."}], "benchLabels": ["综合-布局相关性", "物理验证并发核数", "先进节点覆盖率", "AI 寻优协同度"], "benchVals": [90, 95, 98, 92], "benchTexts": [">90%", "4000+核", "2nm/CFET", "DSO.ai"], "compZh": "全球 EDA 市场由 Synopsys、Cadence 与 Siemens EDA 三家合计占据约 75% 份额。新思科技在前端综合（Design Compiler）与时序签核（PrimeTime）长期保持绝对领先，Fusion Compiler 则在高端 AI/HPC 芯片物理实现中持续扩大份额。", "compEn": "Synopsys, Cadence, and Siemens EDA hold ~75% of the global EDA market. Synopsys leads in synthesis (Design Compiler) and STA signoff (PrimeTime), with Fusion Compiler strong in AI/HPC SoCs.", "evoZh": "持续面向 TSMC、Samsung、Intel Foundry 先进制程（含背面供电与 CFET）认证，并在 2025–2026 年将多物理场分析直接引入物理实现闭环。", "evoEn": "Certified across TSMC, Samsung, and Intel Foundry advanced nodes (including backside power & CFET), integrating multiphysics directly into implementation.", "riskZh": "先进制程研发与代工厂认证周期长、资金投入大，且出口管制限制了部分海外区域先进节点工具销售。", "riskEn": "Advanced-node foundry certification requires heavy R&D, while export restrictions limit sales in certain restricted regions.", "sources": [{"title": "Fusion Compiler: RTL-to-GDSII Design Solution | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/physical-implementation/fusion-compiler.html"}, {"title": "Design Compiler: Timing, Area, Power & Test | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler.html"}, {"title": "PrimeTime: Static Timing Analysis | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/signoff/primetime.html"}, {"title": "Physical Verification: IC Validator | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/physical-verification.html"}]}, {"id": "custom_3dic", "num": "03", "mono": "AM", "cat": "eda_design", "catZh": "EDA 设计与签核", "catEn": "EDA & Signoff", "titleZh": "定制/模拟设计、3DIC 与多物理场融合", "titleEn": "Custom/Analog, 3DIC & Multiphysics Fusion", "metaZh": "Custom Compiler · 3DIC Compiler · RedHawk-SC", "metaEn": "Custom Compiler · 3DIC Compiler · RedHawk-SC", "badgeZh": "MULTI-DIE & MULTIPHYSICS · 2026 核心突破", "badgeEn": "MULTI-DIE & MULTIPHYSICS · 2026 BREAKTHROUGH", "subZh": "连接模拟定制设计、2.5D/3D 先进封装与 Ansys 电热/应力/电磁多物理场签核的统一协同平台", "subEn": "Unified platform bridging full-custom analog, 2.5D/3D multi-die packaging, and Ansys electrothermal/EM/stress multiphysics signoff", "kpis": [{"lblZh": "Custom Compiler 效率", "lblEn": "Custom Compiler Gain", "val": "2–10x", "badgeZh": "FinFET 自动化", "badgeEn": "FinFET Auto", "noteZh": "视觉辅助自动化版图与内置 HFSS-IC 电磁感知", "noteEn": "Visually assisted FinFET layout + embedded HFSS-IC"}, {"lblZh": "3DIC 互联密度提升", "lblEn": "3DIC I/O Density", "val": "100x", "badgeZh": "-30x 能耗", "badgeEn": "-30x Energy", "noteZh": "通过硅中介层与 TSV 垂直互连大幅降低单比特能耗", "noteEn": "Silicon interposers & TSVs cut energy/bit up to 30x"}, {"lblZh": "Multiphysics Fusion", "lblEn": "Multiphysics Fusion", "val": "2026.03", "badgeZh": "首个融合产品", "badgeEn": "First Merged", "noteZh": "Cisco、MediaTek、NVIDIA 与 Samsung Foundry 已验证", "noteEn": "Adopted by Cisco, MediaTek, NVIDIA & Samsung"}, {"lblZh": "标杆 GPU 案例", "lblEn": "Flagship Adoption", "val": "AMD MI455X", "badgeZh": "多芯粒设计", "badgeEn": "Multi-Die GPU", "noteZh": "3DIC Compiler 全面赋能旗舰 AI GPU 多芯粒集成", "noteEn": "3DIC Compiler powers flagship multi-die GPU"}], "thesisZh": "随着单芯片逼近光罩极限，AI 加速器全面转向 2.5D/3D-IC 与 Chiplet。新思科技将 <strong>3DIC Compiler</strong> 与收购自 Ansys 的 <strong>RedHawk-SC Electrothermal</strong> 及 <strong>HFSS-IC</strong> 深度融合，于 2026 年 3 月推出 <strong>Multiphysics Fusion</strong>，终结“先过度设计再返工”的传统模式。", "thesisEn": "As AI accelerators shift to 2.5D/3D-IC chiplets, Synopsys fused <strong>3DIC Compiler</strong> with Ansys <strong>RedHawk-SC Electrothermal</strong> and <strong>HFSS-IC</strong> into <strong>Multiphysics Fusion</strong> (March 2026), shifting from overdesign to co-design.", "highlights": [{"titleZh": "从过度设计转向协同设计", "titleEn": "From Overdesign to Co-Design", "descZh": "在设计早期实时求解电、热、电磁与机械翘曲，消除保守设计裕量浪费。", "descEn": "Solves power, thermal, EM, and warpage in-design rather than post-layout."}, {"titleZh": "2.5D/3D 全封装形态支持", "titleEn": "All Advanced Package Types", "descZh": "支持硅中介层、有机中介层、LSI 桥、Fanout 与晶圆级系统（SoW）。", "descEn": "Supports silicon/organic interposers, LSI bridges, fanout, and system-on-wafer."}, {"titleZh": "功耗与侧信道安全签核", "titleEn": "Power & Security Signoff", "descZh": "RedHawk-SC 家族同时覆盖 IR 压降、电热耦合与硬件侧信道安全分析。", "descEn": "RedHawk-SC covers IR drop, electrothermal, and physical side-channel security."}], "products": [{"name": "Custom Compiler™", "roleZh": "定制与模拟混合信号", "roleEn": "Custom & AMS Design", "craftZh": "2–10x FinFET · HFSS-IC", "craftEn": "2–10x FinFET · HFSS-IC", "specZh": "集成 Multiphysics Fusion 与电磁感知，实现原理图至版图统一闭环", "specEn": "Unified custom environment with embedded HFSS-IC & Multiphysics Fusion", "takeZh": "面向高速 SerDes、RF 与模拟电路主力平台", "takeEn": "High-productivity platform for AMS, RF & SerDes", "url": "https://www.synopsys.com/implementation-and-signoff/custom-design-platform/custom-compiler.html"}, {"name": "PrimeSim™ / FineSim SPICE", "roleZh": "高精度电路仿真", "roleEn": "Analog/SPICE Sim", "craftZh": "高速高精度 SPICE", "craftEn": "High-Capacity SPICE", "specZh": "面向模拟、射频与混合信号芯片的大容量高保真电路级仿真引擎", "specEn": "High-capacity, high-accuracy SPICE simulation for AMS and RF designs", "takeZh": "与 Custom Compiler 及 StarRC 无缝联动", "takeEn": "Tightly integrated with Custom Compiler & StarRC", "url": "https://www.synopsys.com/implementation-and-signoff/custom-design-platform.html"}, {"name": "3DIC Compiler™", "roleZh": "2.5D/3D-IC 统一平台", "roleEn": "Multi-Die Platform", "craftZh": "UCIe/HBM · 单一数据模型", "craftEn": "UCIe/HBM · 3D View", "specZh": "支持探索、划分、自动高速 Die-to-Die 布线与全晶圆厂认证签核", "specEn": "Single data-model platform for exploration, UCIe/HBM routing, and signoff", "takeZh": "AMD Instinct MI455X 等旗舰多芯粒方案底座", "takeEn": "Proven on flagship multi-die AI GPUs like MI455X", "url": "https://www.synopsys.com/implementation-and-signoff/3dic-design.html"}, {"name": "RedHawk-SC™", "roleZh": "功耗完整性签核", "roleEn": "Power Integrity Signoff", "craftZh": "IR 压降 · 电迁移 (EM)", "craftEn": "IR Drop · EM", "specZh": "晶圆厂认证的全芯片电源网络完整性与电迁移可靠性分析行业标准", "specEn": "Foundry-certified full-chip IR drop, EM, and reliability signoff", "takeZh": "先进节点大规模 SoC 必选电源签核标准", "takeEn": "De-facto power integrity signoff for mega-SoCs", "url": "https://www.synopsys.com/implementation-and-signoff/signoff/redhawk-sc.html"}, {"name": "RedHawk-SC Electrothermal™", "roleZh": "电热与机械应力签核", "roleEn": "2.5D/3D Electrothermal", "craftZh": "热分布 · 翘曲应力", "craftEn": "Thermal · Warpage", "specZh": "联合求解多芯粒系统的功耗完整性、信号完整性、热分布与机械翘曲应力", "specEn": "Coupled multiphysics solver for power, thermal, and warpage in 3D-IC", "takeZh": "解决 3D 堆叠芯片散热与封装翘曲核心痛点", "takeEn": "Solves critical 3D-IC thermal & mechanical warpage", "url": "https://www.synopsys.com/implementation-and-signoff/signoff/redhawk-sc-electrothermal.html"}, {"name": "RedHawk-SC Security™", "roleZh": "硬件侧信道安全分析", "roleEn": "Side-Channel Security", "craftZh": "功耗/EM/热泄露检测", "craftEn": "Power/EM/Thermal", "specZh": "通过多物理场仿真在流片前检测功耗噪声、电磁辐射与热侧信道泄露", "specEn": "Detects physical side-channel leakage via power, EM, and thermal sim", "takeZh": "面向加密芯片与高安全等级 SoC 防护", "takeEn": "Pre-silicon defense for crypto & high-security SoCs", "url": "https://www.synopsys.com/implementation-and-signoff/signoff/redhawk-sc-security.html"}, {"name": "Multiphysics Fusion™", "roleZh": "多物理场融合 (2026)", "roleEn": "Multiphysics Fusion", "craftZh": "Ansys 首个融合 EDA", "craftEn": "First Post-Ansys EDA", "specZh": "2026 年 3 月发布，将电磁、热与机械应力实时嵌入芯片与封装设计流程", "specEn": "Launched March 2026, embedding EM, thermal, and stress into design closure", "takeZh": "Cisco/MediaTek/NVIDIA/Samsung 已验证实效", "takeEn": "Validated by Cisco, MediaTek, NVIDIA & Samsung", "url": "https://www.synopsys.com/"}], "workflows": [{"tagZh": "STAGE 01 · 芯粒划分", "tagEn": "STAGE 01 · PARTITIONING", "titleZh": "3DIC 架构与热预算探索", "titleEn": "Multi-Die Architecture", "descZh": "在单一环境完成芯粒划分、凸点规划与早期热/电源可行性评估。", "descEn": "Chiplet partitioning, bump planning, and early thermal/power feasibility."}, {"tagZh": "STAGE 02 · 互连布线", "tagEn": "STAGE 02 · D2D ROUTING", "titleZh": "Custom + HBM/UCIe 自动布线", "titleEn": "Custom & HBM/UCIe Routing", "descZh": "Custom Compiler 协同 HFSS-IC 消除寄生耦合，自动完成高密度互连。", "descEn": "Custom Compiler + HFSS-IC mitigate EM; automated HBM/UCIe routing."}, {"tagZh": "STAGE 03 · 多场签核", "tagEn": "STAGE 03 · MULTIPHYSICS", "titleZh": "RedHawk-SC 电热应力求解", "titleEn": "Electrothermal & Stress", "descZh": "联合 Ansys Mechanical 与 RedHawk-SC Electrothermal 验证温度与翘曲。", "descEn": "Co-solve temperature distribution and mechanical warpage across dies."}, {"tagZh": "STAGE 04 · 代工认证", "tagEn": "STAGE 04 · FOUNDRY", "titleZh": "全主流晶圆厂工艺支持", "titleEn": "Foundry Certification", "descZh": "全面支持 TSMC、Samsung、Intel Foundry、GF、Rapidus 与 UMC 先进封装。", "descEn": "Certified across TSMC, Samsung, Intel Foundry, GF, Rapidus, and UMC."}], "benchLabels": ["3DIC 互连密度提升", "单比特传输能耗降幅", "FinFET 版图效率", "多物理场求解维度"], "benchVals": [100, 90, 80, 95], "benchTexts": ["100x", "-30x 能耗", "2–10x", "电/热/磁/力"], "compZh": "Cadence Virtuoso 在传统模拟版图历史积淀深厚，但新思科技通过并购 Ansys（将原行业独大的 RedHawk-SC 与 HFSS 收入囊中），在 2.5D/3D-IC 电热磁力耦合与 AI 芯片先进封装签核领域形成了极难复制的壁垒。", "compEn": "While Cadence Virtuoso has deep legacy in analog layout, acquiring Ansys (RedHawk-SC & HFSS) gives Synopsys an unmatched moat in 2.5D/3D-IC multiphysics co-design and signoff.", "evoZh": "2026 年 3 月正式发布 Multiphysics Fusion，Cisco、MediaTek、NVIDIA 与 Samsung Foundry 均已验证其消除过设计（Overdesign）的实效。", "evoEn": "Launched Multiphysics Fusion in March 2026, with verified customer impact at Cisco, MediaTek, NVIDIA, and Samsung Foundry.", "riskZh": "跨芯片-封装-PCB 的多物理场联合仿真计算量巨大，对客户云端/GPU 硬件资源及跨团队协作流程提出更高要求。", "riskEn": "Coupled silicon-package-PCB multiphysics requires substantial GPU/HPC resources and tighter cross-team workflows.", "sources": [{"title": "3DIC Compiler: Platform for Multi-Die Designs | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/3dic-design.html"}, {"title": "Custom Compiler Design Environment | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/custom-design-platform/custom-compiler.html"}, {"title": "Synopsys RedHawk-SC Electrothermal | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/signoff/redhawk-sc-electrothermal.html"}, {"title": "Synopsys RedHawk-SC Security | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/signoff/redhawk-sc-security.html"}]}, {"id": "verification_hav", "num": "04", "mono": "VF", "cat": "eda_design", "catZh": "EDA 设计与签核", "catEn": "EDA & Signoff", "titleZh": "功能验证与硬件辅助验证 (Verification & HAV)", "titleEn": "Verification & Hardware-Assisted Verification", "metaZh": "VCS · Verdi · ZeBu-200 · HAPS-200", "metaEn": "VCS · Verdi · ZeBu-200 · HAPS-200", "badgeZh": "VERIFICATION CONTINUUM · 软硬协同左移", "badgeEn": "VERIFICATION CONTINUUM · SHIFT-LEFT", "subZh": "覆盖静态检查、形式化验证、VCS 仿真、Verdi 调试、Virtualizer 虚拟原型及 ZeBu/HAPS 硬件加速的全栈验证家族", "subEn": "Full-spectrum Verification Continuum spanning static/formal, VCS simulation, Verdi debug, Virtualizer, and ZeBu/HAPS HAV", "kpis": [{"lblZh": "Software-Defined HAV", "lblEn": "Software-Defined HAV", "val": "Up to 2x", "badgeZh": "2026.03 发布", "badgeEn": "Mar 2026", "noteZh": "无需更换硬件即可使 ZeBu Server 5 性能与容量翻倍", "noteEn": "2x performance & modular capacity on ZeBu Server 5"}, {"lblZh": "新一代硬件平台", "lblEn": "Next-Gen Hardware", "val": "ZeBu/HAPS-200", "badgeZh": "AI 超大芯片", "badgeEn": "AI Mega-SoC", "noteZh": "2025 年 2 月发布，支持 12 FPGA 高速原型验证", "noteEn": "Flagship emulation & 12-FPGA prototyping platforms"}, {"lblZh": "调试行业标准", "lblEn": "Debug Standard", "val": "Verdi®", "badgeZh": "全引擎统一", "badgeEn": "Unified Debug", "noteZh": "打通 VCS 仿真、VC Formal 与 ZeBu 硬件波形调试", "noteEn": "Unified root-cause debug across all engines"}, {"lblZh": "核心仿真引擎", "lblEn": "Simulation Engine", "val": "VCS®", "badgeZh": "HyperSim", "badgeEn": "HyperSim", "noteZh": "分区分布式编译与约束求解加速亿级门回归", "noteEn": "Distributed compile & HyperSim constraint solver"}], "thesisZh": "AI 大芯片的验证工作量已占研发周期 60% 以上。新思科技通过 <strong>Software-Defined HAV</strong> 与 <strong>Verification Continuum™</strong> 架构，让软件团队在流片前数月即可在 <strong>Virtualizer</strong>、<strong>ZeBu-200</strong> 与 <strong>HAPS-200</strong> 上启动 OS 与驱动联调。", "thesisEn": "Verification consumes >60% of AI SoC cycles. Synopsys' <strong>Software-Defined HAV</strong> and <strong>Verification Continuum™</strong> let software teams bring up OS and drivers months before tape-out.", "highlights": [{"titleZh": "全栈连续验证体系", "titleEn": "Verification Continuum", "descZh": "从 Virtualizer 事务级原型到 ZeBu 仿真与 HAPS 原型共享统一接口与调试视图。", "descEn": "Shares VIPs, transactors, and Verdi debug from virtual to hardware prototypes."}, {"titleZh": "软件定义硬件加速", "titleEn": "Software-Defined HAV", "descZh": "2026 年新品使现有 ZeBu Server 5 获得高达 2x 性能与容量弹性扩展。", "descEn": "2026 software-defined HAV delivers up to 2x speedup and capacity scaling."}, {"titleZh": "形式化与静态早筛", "titleEn": "Static & Formal Shift-Left", "descZh": "VC Formal 与 VC SpyGlass 在 RTL 早期穷举控制逻辑与跨时钟域隐患。", "descEn": "VC Formal & VC SpyGlass catch corner-case bugs exhaustively in early RTL."}], "products": [{"name": "Synopsys VCS®", "roleZh": "功能仿真器", "roleEn": "Functional Simulation", "craftZh": "分布式编译 · HyperSim", "craftEn": "Distributed · HyperSim", "specZh": "支持分区编译、Save/Restore、约束求解优化与混合信号仿真", "specEn": "Partitioned compile, Save/Restore, and HyperSim constraint optimization", "takeZh": "全球使用最广泛的数字 RTL 功能仿真器", "takeEn": "Industry's most widely deployed RTL simulator", "url": "https://www.synopsys.com/verification/simulation/vcs.html"}, {"name": "Synopsys Verdi®", "roleZh": "自动调试系统", "roleEn": "Automated Debug", "craftZh": "跨引擎根因分析", "craftEn": "Cross-Engine Debug", "specZh": "跨 VCS、VC Formal 与 ZeBu 的统一波形调试与覆盖率规划平台", "specEn": "Unified debug and coverage closure across VCS, Formal, and ZeBu", "takeZh": "验证工程师日常调试事实标准", "takeEn": "De-facto daily debug workbench for SoC teams", "url": "https://www.synopsys.com/verification/debug/verdi.html"}, {"name": "VC Formal™ / VC SpyGlass™", "roleZh": "形式化与静态签核", "roleEn": "Formal & Static", "craftZh": "FPV · SEQ · FuSa", "craftEn": "FPV · SEQ · FuSa", "specZh": "涵盖属性验证、等价性检查、功能安全、RTL 规则及 VC LP 低功耗检查", "specEn": "FPV, SEQ, FuSa formal apps, RTL static linting, and VC LP checks", "takeZh": "无需测试向量即可穷举证明关键控制逻辑", "takeEn": "Exhaustive proof of control logic without vectors", "url": "https://www.synopsys.com/verification/static-and-formal-verification/vc-formal.html"}, {"name": "ZeBu-200 / ZeBu Server 5", "roleZh": "硬件仿真 (Emulation)", "roleEn": "Hardware Emulation", "craftZh": "2x 软件定义 HAV", "craftEn": "2x SW-Defined HAV", "specZh": "面向超大规模 SoC 的高速硬件仿真与深入调试，支持云端 SaaS Burst", "specEn": "High-performance emulation with 2026 software-defined HAV up to 2x boost", "takeZh": "AI 万亿晶体管大芯片流片前核心验证机柜", "takeEn": "Essential pre-silicon engine for mega AI chips", "url": "https://www.synopsys.com/verification/emulation-prototyping.html"}, {"name": "HAPS-200", "roleZh": "FPGA 原型验证", "roleEn": "FPGA Prototyping", "craftZh": "12-FPGA 旗舰架构", "craftEn": "12-FPGA Flagship", "specZh": "最高性能 FPGA 原型系统，支撑早期软件开发、系统联调与外设接口实测", "specEn": "Flagship FPGA prototyping for early SW bring-up & real-world I/O validation", "takeZh": "拥有庞大 HAPS Connect 第三方子卡生态", "takeEn": "Backed by rich HAPS Connect accessory ecosystem", "url": "https://www.synopsys.com/verification/emulation-prototyping/prototyping.html"}, {"name": "Virtualizer™ & Platform Architect", "roleZh": "虚拟原型与架构", "roleEn": "Virtual Prototyping", "craftZh": "TLM 事务级模型", "craftEn": "TLM Virtual Models", "specZh": "在 RTL 就绪前实现软硬件协同设计、多核架构建模与汽车电子开发", "specEn": "TLM-based virtual prototypes for pre-RTL HW/SW co-design & architecture", "takeZh": "软件左移 6–12 个月的关键虚拟底座", "takeEn": "Shifts software bring-up 6–12 months earlier", "url": "https://www.synopsys.com/verification/emulation-prototyping/hav-interface-solutions.html"}, {"name": "Verification IP (VIP) & Transactors", "roleZh": "协议验证 IP", "roleEn": "Protocol VIP", "craftZh": "PCIe 7.0 · CXL · HBM", "craftEn": "PCIe 7.0 · CXL · HBM", "specZh": "覆盖最新高速协议一致性测试套件，无缝衔接 VCS 与 ZeBu 加速", "specEn": "Latest PCIe 7.0, CXL, Ethernet, HBM, MIPI, AMBA VIP for VCS & ZeBu", "takeZh": "显著缩短复杂接口子系统验证搭建周期", "takeEn": "Accelerates complex interface testbench setup", "url": "https://www.synopsys.com/verification/emulation-prototyping/hav-interface-solutions.html"}], "workflows": [{"tagZh": "STAGE 01 · 虚拟原型", "tagEn": "STAGE 01 · VIRTUAL", "titleZh": "Platform Architect + Virtualizer", "titleEn": "Architecture & Virtual SW", "descZh": "在 RTL 编写完成前即启动系统性能建模与操作系统/固件移植。", "descEn": "Start performance modeling and OS/firmware bring-up pre-RTL."}, {"tagZh": "STAGE 02 · 静态形式化", "tagEn": "STAGE 02 · STATIC/FORMAL", "titleZh": "VC SpyGlass + VC Formal", "titleEn": "Early Bug Exhaustion", "descZh": "快速拦截跨时钟域、X 态传播、低功耗域与死锁等深层逻辑缺陷。", "descEn": "Catch CDC, X-prop, low-power, and deadlock corner cases early."}, {"tagZh": "STAGE 03 · 智能仿真", "tagEn": "STAGE 03 · SIMULATION", "titleZh": "VCS + Verdi + VSO.ai", "titleEn": "Smart Regression & Debug", "descZh": "VSO.ai 压缩回归规模，Verdi 自动关联波形与源码加速定位根因。", "descEn": "VSO.ai shrinks regressions while Verdi automates root-cause debug."}, {"tagZh": "STAGE 04 · 硬件加速", "tagEn": "STAGE 04 · HAV RUN", "titleZh": "ZeBu-200 + HAPS-200 联调", "titleEn": "Emulation & Prototyping", "descZh": "运行完整 AI 负载与真实 PCIe/Ethernet 外设，完成功耗与系统签核。", "descEn": "Run full AI workloads and real I/O for power & system validation."}], "benchLabels": ["ZeBu 软件定义性能提升", "HAV 模块化容量扩展", "Verdi 跨引擎覆盖", "协议 VIP 支持广度"], "benchVals": [100, 100, 96, 98], "benchTexts": ["2x 提速", "2x 容量", "全平台", "PCIe 7.0+"], "compZh": "硬件辅助验证领域主要与 Cadence Palladium/Protium 及 Siemens Veloce 竞争。新思科技在仿真（VCS）与调试（Verdi）拥有广泛用户基础，并通过 2025–2026 年 ZeBu-200 / HAPS-200 与 Software-Defined HAV 补强超大规模 AI 芯片扩容弹性。", "compEn": "Competes with Cadence Palladium/Protium and Siemens Veloce. Synopsys pairs deep VCS/Verdi adoption with 2025–2026 ZeBu-200/HAPS-200 and Software-Defined HAV elasticity.", "evoZh": "2025 年 2 月推出 ZeBu-200 与 HAPS-200；2026 年 3 月发布软件定义硬件辅助验证（Software-Defined HAV），无需更换底层硬件即可获得高达 2x 性能跃升。", "evoEn": "Introduced ZeBu-200 and HAPS-200 in Feb 2025; launched Software-Defined HAV in March 2026 for up to 2x performance boost without hardware swaps.", "riskZh": "高端硬件仿真机柜单价昂贵、交付周期受高端 FPGA 供应链影响，且与 Cadence Palladium 的大客户争夺激烈。", "riskEn": "Enterprise emulators carry high capex and FPGA supply dependencies amid fierce competition from Cadence Palladium.", "sources": [{"title": "Emulation & Prototyping (ZeBu & HAPS) | Synopsys", "url": "https://www.synopsys.com/verification/emulation-prototyping.html"}, {"title": "Verification Family (VCS, Verdi, VC Formal) | Synopsys", "url": "https://www.synopsys.com/verification.html"}, {"title": "Software-Defined HAV for AI Chip Design | Synopsys", "url": "https://www.synopsys.com/blogs/chip-design/software-defined-hardware-assisted-verification.html"}, {"title": "Verdi Automated Debug System | Synopsys", "url": "https://www.synopsys.com/verification/debug/verdi.html"}]}, {"id": "silicon_ip", "num": "05", "mono": "IP", "cat": "ip_mfg", "catZh": "IP · 测试与制造", "catEn": "IP, Test & Fab", "titleZh": "半导体接口与基础 IP (Silicon IP)", "titleEn": "Silicon IP (Interface, Foundation & Security)", "metaZh": "Interface IP (#1) · Foundation · Security", "metaEn": "Interface IP (#1) · Foundation · Security", "badgeZh": "DESIGN IP · 全球第一大接口 IP 供应商", "badgeEn": "DESIGN IP · #1 INTERFACE IP PROVIDER", "subZh": "涵盖高速接口（PCIe 7.0/CXL/UALink/HBM/UCIe）、基础库、硬件安全与多芯粒互联的硅验证 IP 组合", "subEn": "Silicon-proven Interface (PCIe 7.0/CXL/UALink/HBM/UCIe), Foundation, Security, and Multi-Die IP portfolio", "kpis": [{"lblZh": "Q3 FY26 Design IP 营收", "lblEn": "Q3 FY26 Design IP Rev", "val": "$473.8M", "badgeZh": "重回同比增长", "badgeEn": "YoY Growth", "noteZh": "AI 数据中心互连需求带动 Q3 重返增长轨道", "noteEn": "Returned to YoY growth on AI interconnect demand"}, {"lblZh": "全球接口 IP 地位", "lblEn": "Interface IP Rank", "val": "#1 全球", "badgeZh": "整体 IP #2", "badgeEn": "#2 Overall IP", "noteZh": "接口 IP 授权营收全球第一，整体 IP 仅次于 Arm", "noteEn": "#1 in Interface IP; #2 overall behind Arm"}, {"lblZh": "AI 集群互连前沿", "lblEn": "AI Cluster Protocols", "val": "UALink / PCIe 7", "badgeZh": "1.6T / HBM", "badgeEn": "1.6T / HBM", "noteZh": "全面覆盖 Ethernet、HBM、CXL 与 UCIe Chiplet", "noteEn": "Full stack for Ethernet, HBM, CXL & UCIe"}, {"lblZh": "2026.06 业务聚焦", "lblEn": "2026.06 Portfolio Focus", "val": "剥离处理器 IP", "badgeZh": "聚焦高壁垒核心", "badgeEn": "Core Focus", "noteZh": "2026 年 6 月剥离处理器 IP，集中资源于接口与基础 IP", "noteEn": "Divested Processor IP in June 2026 to sharpen focus"}], "thesisZh": "在 AI 数据中心与 Physical AI 时代，芯片瓶颈正从算力转向“互连与存储带宽”。新思科技作为<strong>全球第一大接口 IP 供应商</strong>，凭借覆盖全晶圆厂先进节点的硅验证 IP，成为超大规模云厂商与 AI 芯片巨头定制硅片的关键基石。", "thesisEn": "As AI bottlenecks shift from compute to interconnect and memory bandwidth, #1 interface IP leader Synopsys supplies silicon-proven PHY and controller IP across all leading foundries.", "highlights": [{"titleZh": "全协议高速互连霸主", "titleEn": "Rack-Scale Interconnect Leader", "descZh": "率先卡位 PCIe 7.0、UALink、1.6T Ethernet 与 UCIe 多芯粒互连标准。", "descEn": "Early silicon-proven leadership in PCIe 7.0, UALink, Ethernet, and UCIe."}, {"titleZh": "数十亿颗量产基础 IP", "titleEn": "Billions-Shipped Foundation IP", "descZh": "嵌入式存储编译器、标准单元库与 NVM 经过全主流代工厂量产验证。", "descEn": "Embedded memory compilers, logic libraries & NVM proven across foundries."}, {"titleZh": "硬件级安全与 PUF", "titleEn": "Hardware Root of Trust & PUF", "descZh": "整合 Intrinsic ID PUF 指纹技术与抗量子密码（PQC）加速。", "descEn": "Combines Intrinsic ID PUF technology with Post-Quantum Crypto (PQC)."}], "products": [{"name": "High-Speed Interface IP", "roleZh": "高速接口与互联 IP", "roleEn": "Interface IP", "craftZh": "PCIe 7.0 · UALink · HBM", "craftEn": "PCIe 7.0 · UALink · HBM", "specZh": "覆盖 PCIe、CXL、UALink、Ethernet、USB、DDR/LPDDR、HBM、UCIe、MIPI、HDMI", "specEn": "PCIe, CXL, UALink, Ethernet, USB, DDR/LPDDR, HBM, UCIe, MIPI, HDMI", "takeZh": "全球市场份额第一，AI 集群扩扩展核心受益者", "takeEn": "#1 global share; prime beneficiary of AI cluster scaling", "url": "https://www.synopsys.com/designware-ip/interface-ip.html"}, {"name": "Foundation IP", "roleZh": "基础物理库与存储编译器", "roleEn": "Foundation IP", "craftZh": "SRAM · 标准单元 · NVM", "craftEn": "SRAM · Logic · NVM", "specZh": "嵌入式存储编译器、逻辑库、非易失存储 OTP/NVM、I/O 库与 PVT 传感器", "specEn": "Embedded memory compilers, logic libraries, NVM/OTP, I/Os, and PVT sensors", "takeZh": "决定 SoC 底层面积、漏电与良率的基石模块", "takeEn": "Foundational building blocks for SoC PPA & yield", "url": "https://www.synopsys.com/designware-ip/memories-logic-libraries.html"}, {"name": "Security IP", "roleZh": "硬件信任根与密码安全 IP", "roleEn": "Security IP", "craftZh": "RoT · PQC · Intrinsic ID", "craftEn": "RoT · PQC · PUF", "specZh": "硬件信任根、加密协议加速、抗量子密码及 Intrinsic ID PUF 物理不可克隆技术", "specEn": "Root of Trust, crypto accelerators, PQC, and Intrinsic ID PUF", "takeZh": "满足云端数据中心与汽车安全合规刚需", "takeEn": "Meets strict cloud & automotive security mandates", "url": "https://www.synopsys.com/designware-ip/ip-market-segments/physical-ai.html"}, {"name": "Multi-Die & Chiplet IP", "roleZh": "多芯粒互连 IP", "roleEn": "Multi-Die IP", "craftZh": "UCIe PHY · 控制器", "craftEn": "UCIe PHY · Controller", "specZh": "面向 2.5D/3D 异构集成的低功耗高带宽裸片间互连解决方案", "specEn": "Low-power, high-bandwidth UCIe die-to-die IP for 2.5D/3D chiplets", "takeZh": "与 3DIC Compiler 原生协同降低集成风险", "takeEn": "Co-validated with 3DIC Compiler to de-risk chiplets", "url": "https://www.synopsys.com/designware-ip/ip-market-segments/hpc.html"}, {"name": "Automotive & Physical AI IP", "roleZh": "车规与物理 AI 专用 IP", "roleEn": "Auto & Physical AI IP", "craftZh": "ISO 26262 ASIL-B/D", "craftEn": "ISO 26262 Safety", "specZh": "面向 ADAS、自动驾驶、人形机器人与工业智能的实时安全接口与基础 IP", "specEn": "Safety-ready interface, memory & security IP for ADAS and robotics", "takeZh": "加速物理 AI 传感器实时处理 SoC 一次流片成功", "takeEn": "Accelerates first-pass silicon for Physical AI SoCs", "url": "https://www.synopsys.com/designware-ip/ip-market-segments/physical-ai.html"}], "workflows": [{"tagZh": "STAGE 01 · 协议选型", "tagEn": "STAGE 01 · SIZING", "titleZh": "匹配代工工艺与带宽", "titleEn": "Protocol & Foundry Match", "descZh": "依据目标晶圆厂（TSMC/Samsung/Intel）与封装形式选定经硅验证的 PHY。", "descEn": "Select foundry-certified PHY and controller IP for target node."}, {"tagZh": "STAGE 02 · 早期验证", "tagEn": "STAGE 02 · PRE-SILICON", "titleZh": "SVK 与 ZeBu PHY 固件联调", "titleEn": "SVK & ZeBu PHY Validation", "descZh": "使用 SoC 验证套件与真实数模混合 PHY 模型提前验证驱动与协议一致性。", "descEn": "Validate firmware and compliance early with SVKs and ZeBu PHY models."}, {"tagZh": "STAGE 03 · 物理集成", "tagEn": "STAGE 03 · INTEGRATION", "titleZh": "无缝接入 EDA 实现与 3DIC", "titleEn": "EDA & 3DIC Integration", "descZh": "IP 交付物直接对接 Fusion Compiler 与 3DIC Compiler，避免版图返工。", "descEn": "IP views plug directly into Fusion Compiler and 3DIC Compiler."}, {"tagZh": "STAGE 04 · 量产交付", "tagEn": "STAGE 04 · PRODUCTION", "titleZh": "数十亿颗量产质量背书", "titleEn": "First-Pass Silicon Success", "descZh": "依托海量出货验证经验，显著降低先进节点流片失败风险。", "descEn": "Backed by billions of shipped units to minimize tape-out risk."}], "benchLabels": ["接口 IP 全球份额地位", "AI 数据中心协议完备度", "先进节点晶圆厂覆盖", "安全 PUF/PQC 集成度"], "benchVals": [98, 96, 95, 90], "benchTexts": ["#1 全球", "UALink/PCIe7", "全主流代工", "RoT+PUF"], "compZh": "全球半导体 IP 市场按营收计 Arm 居首（主攻 CPU 架构授权），新思科技位居第二并在“接口 IP”细分市场高居第一，领先 Cadence 与 Alphawave。2026 年 6 月剥离处理器 IP 业务后，资源更聚焦于高壁垒互连与基础 IP。", "compEn": "Synopsys ranks #2 in overall semiconductor IP revenue (behind Arm) and #1 in Interface IP ahead of Cadence and Alphawave, sharpened further after divesting Processor IP in June 2026.", "evoZh": "2024 年收购 Intrinsic ID 强化硬件指纹安全；2026 年 6 月完成处理器 IP 业务剥离，全力押注 AI 机柜级互连（UALink/Ethernet/PCIe 7.0）与 Physical AI。", "evoEn": "Acquired Intrinsic ID in 2024; divested Processor IP in June 2026 to double down on rack-scale AI interconnects (UALink, Ethernet, PCIe 7.0) and Physical AI.", "riskZh": "Design IP 业务受特定地区出口限制及部分晶圆厂路线图延期影响较大（FY25 曾短暂承压 -8%，Q3 FY26 已恢复增长）。", "riskEn": "Design IP licensing is sensitive to export controls and foundry node timing delays (saw -8% dip in FY25 before returning to growth in Q3 FY26).", "sources": [{"title": "Interface IP Solutions | Synopsys", "url": "https://www.synopsys.com/designware-ip/interface-ip.html"}, {"title": "Foundation IP: Logic Library, Memory Compiler, NVM | Synopsys", "url": "https://www.synopsys.com/designware-ip/memories-logic-libraries.html"}, {"title": "Silicon IP for Physical AI | Synopsys", "url": "https://www.synopsys.com/designware-ip/ip-market-segments/physical-ai.html"}, {"title": "IP for High-Performance Computing (HPC) | Synopsys", "url": "https://www.synopsys.com/designware-ip/ip-market-segments/hpc.html"}]}, {"id": "test_slm", "num": "06", "mono": "SL", "cat": "ip_mfg", "catZh": "IP · 测试与制造", "catEn": "IP, Test & Fab", "titleZh": "芯片测试与生命周期管理 (Test & SLM)", "titleEn": "Test Automation & Silicon Lifecycle Management", "metaZh": "TestMAX · STAR Memory · Silicon.da", "metaEn": "TestMAX · STAR Memory · Silicon.da", "badgeZh": "SILICON LIFECYCLE · 从测试到现场运维", "badgeEn": "SILICON LIFECYCLE · TEST TO IN-FIELD", "subZh": "将 DFT 可测性设计、嵌入式存储自测修复与跨设计-制造-测试-现场运行的全生命周期数据分析融为一体", "subEn": "Uniting DFT test automation, embedded memory test/repair, and AI-driven analytics from design and fab to in-field operation", "kpis": [{"lblZh": "DFT 深度融合", "lblEn": "DFT Integration", "val": "TestMAX", "badgeZh": "原生嵌入综合", "badgeEn": "In-Design DFT", "noteZh": "直接融合进 Design Compiler 与 Fusion Compiler", "noteEn": "Fused directly into DC & Fusion Compiler"}, {"lblZh": "存储良率修复", "lblEn": "Memory Yield Repair", "val": "STAR Memory", "badgeZh": "SMS IP", "badgeEn": "SMS IP", "noteZh": "针对大规模片上 SRAM 的内建自测试与冗余修复", "noteEn": "Automated embedded SRAM BIST & redundancy repair"}, {"lblZh": "AI 测试向量压缩", "lblEn": "AI Test Optimization", "val": "TSO.ai", "badgeZh": "自主强化学习", "badgeEn": "Autonomous RL", "noteZh": "显著缩减量产测试向量体积与 ATE 机时成本", "noteEn": "Minimizes ATPG pattern volume and tester time"}, {"lblZh": "全链路数据分析", "lblEn": "Lifecycle Analytics", "val": "Silicon.da", "badgeZh": "Design.da 协同", "badgeEn": "Design.da", "noteZh": "打通设计、晶圆制造、ATE 测试与现场遥测数据", "noteEn": "Links design, fab, ATE & in-field telemetry"}], "thesisZh": "AI 芯片与车规芯片要求极高的良率与长达 10–15 年的现场可靠性。新思科技以 <strong>TestMAX</strong> 与 <strong>STAR Memory System</strong> 为基础，叠加 <strong>Silicon.da</strong> 与 <strong>Design.da</strong> 大数据分析平台，将芯片“可测性”升级为贯穿全生命周期的“可观测性与自愈能力”。", "thesisEn": "AI and automotive chips demand extreme yield and 10–15 year reliability. Synopsys pairs <strong>TestMAX</strong> and <strong>STAR Memory System</strong> with <strong>Silicon.da</strong>/<strong>Design.da</strong> analytics to turn DFT into full-lifecycle observability.", "highlights": [{"titleZh": "物理实现内原生 DFT", "titleEn": "In-Design DFT Automation", "descZh": "TestMAX 与综合、布局布线共用数据模型，消除测试逻辑引发的时序违例。", "descEn": "TestMAX shares data models with synthesis/PnR to prevent timing regressions."}, {"titleZh": "片上存储良率自愈", "titleEn": "Embedded Memory Self-Repair", "descZh": "STAR Memory System 自动诊断并修复海量片上 SRAM 缺陷，直接拉升良率。", "descEn": "SMS IP diagnoses and repairs on-die SRAM faults to boost wafer yield."}, {"titleZh": "端到端芯片数据智能", "titleEn": "End-to-End Silicon Telemetry", "descZh": "Silicon.da 与片上 PVT/裕量监控器支撑数据中心与汽车预测性维护。", "descEn": "Silicon.da + in-chip PVT monitors enable predictive maintenance in the field."}], "products": [{"name": "TestMAX™ DFT & Manager", "roleZh": "可测性设计自动化", "roleEn": "Design-for-Test", "craftZh": "高压缩比 · RTL DFT", "craftEn": "High Compression · RTL", "specZh": "直接集成于 Design Compiler 与 Fusion Compiler，实现 RTL 级 DFT 生成与压缩", "specEn": "Fused into DC and Fusion Compiler for high compression and RTL DFT", "takeZh": "大幅降低测试引脚与机台测试时间", "takeEn": "Significantly reduces test time & data volume", "url": "https://www.synopsys.com/implementation-and-signoff/test-automation/testmax-dft.html"}, {"name": "TestMAX™ ATPG & TSO.ai", "roleZh": "自动测试向量生成", "roleEn": "ATPG & AI Test", "craftZh": "TSO.ai 强化学习", "craftEn": "TSO.ai RL Engine", "specZh": "结合 TSO.ai 自主强化学习优化测试向量生成，最小化缺陷逃逸与测试成本", "specEn": "Pairs ATPG with TSO.ai RL to minimize pattern count and defects", "takeZh": "AI 算力大芯片量产降本关键利器", "takeEn": "Key volume-production cost reducer for AI chips", "url": "https://www.synopsys.com/ai/ai-powered-eda/tso-ai.html"}, {"name": "STAR Memory System® (SMS IP)", "roleZh": "嵌入式存储测试与修复", "roleEn": "Memory Test & Repair", "craftZh": "BIST · 冗余修复", "craftEn": "BIST · Redundancy", "specZh": "针对 SoC 内部海量嵌入式存储器的自动化内建自测试、诊断与冗余修复 IP", "specEn": "Automated BIST, diagnostics, and redundancy repair IP for embedded memories", "takeZh": "保障 AI 芯片大面积片上缓存良率", "takeEn": "Protects yield on memory-heavy AI accelerators", "url": "https://www.synopsys.com/products.html"}, {"name": "Silicon.da™ & Design.da™", "roleZh": "AI 驱动生命周期分析", "roleEn": "Lifecycle Analytics", "craftZh": "跨设计/制造/现场", "craftEn": "Design-to-Field Data", "specZh": "关联分析设计运行、晶圆制造、ATE 测试与现场数据，定位 PPA 异常与良率根因", "specEn": "Connects design, fab, test, and in-field data for yield & PPA insights", "takeZh": "构建数据驱动的良率爬坡与质量闭环", "takeEn": "Accelerates yield ramp and quality feedback", "url": "https://www.synopsys.com/ai/ai-powered-eda.html"}, {"name": "SLM PVT & Path Margin Monitors", "roleZh": "片上生命周期监控 IP", "roleEn": "In-Chip SLM Monitors", "craftZh": "老化 · 电压/温度感知", "craftEn": "Aging · PVT Sensing", "specZh": "实时监测芯片老化、电压/温度波动与时序裕量，支撑预测性维护与动态调压", "specEn": "In-situ aging, PVT, and timing-margin monitors for predictive maintenance", "takeZh": "超大规模数据中心与车规芯片可靠性核心", "takeEn": "Vital for hyperscaler fleet & automotive reliability", "url": "https://www.synopsys.com/designware-ip/ip-market-segments/physical-ai.html"}], "workflows": [{"tagZh": "STAGE 01 · 原生 DFT", "tagEn": "STAGE 01 · IN-DESIGN DFT", "titleZh": "TestMAX Manager 插入扫描链", "titleEn": "In-Design DFT Insertion", "descZh": "在综合与物理实现阶段同步插入测试压缩逻辑，不牺牲关键路径。", "descEn": "Inserts scan and compression in-design without timing penalties."}, {"tagZh": "STAGE 02 · 片上监控", "tagEn": "STAGE 02 · IN-CHIP IP", "titleZh": "STAR Memory 与 SLM 植入", "titleEn": "Memory Repair & SLM IP", "descZh": "植入存储自修复与 PVT 传感器，保障出厂良率与全寿命可观测性。", "descEn": "Embeds memory repair and PVT monitors for yield & health sensing."}, {"tagZh": "STAGE 03 · 量产优化", "tagEn": "STAGE 03 · VOLUME TEST", "titleZh": "TSO.ai 优化 ATPG 向量", "titleEn": "TSO.ai Pattern Minimization", "descZh": "利用强化学习压缩 ATE 测试向量，大幅节省晶圆与封装测试机时。", "descEn": "Uses RL to optimize ATPG patterns and cut ATE tester costs."}, {"tagZh": "STAGE 04 · 遥测闭环", "tagEn": "STAGE 04 · TELEMETRY LOOP", "titleZh": "Silicon.da 反馈至 Design.da", "titleEn": "Fab-to-Design Feedback", "descZh": "将产线与现场运行遥测反馈至设计团队，指导工艺微调与下代架构。", "descEn": "Feeds fab and field telemetry back into Design.da for next-gen chips."}], "benchLabels": ["测试压缩比优化", "与物理实现融合度", "嵌入式存储修复", "现场遥测闭环"], "benchVals": [92, 96, 95, 88], "benchTexts": ["高压缩", "原生融合", "STAR IP", "Silicon.da"], "compZh": "在 DFT 领域与 Siemens Tessent、Cadence Modus 竞争。新思科技的优势在于 TestMAX 与 Fusion Compiler 的原生融合，以及通过整合 SLM 监控 IP 形成的 Silicon.da 全生命周期数据闭环。", "compEn": "Competes with Siemens Tessent and Cadence Modus. Synopsys differentiates via native TestMAX-Fusion Compiler integration and the Silicon.da analytics backbone.", "evoZh": "随着 2.5D/3D-IC 多芯粒封装良率挑战剧增，3DIC Compiler 已原生联动 TestMAX 与 SLM，实现芯粒级（Die-level）测试与已知良好裸片（KGD）筛选。", "evoEn": "3DIC Compiler natively links with TestMAX and SLM to enable die-level test, repair, and Known Good Die (KGD) screening for multi-die packages.", "riskZh": "全生命周期数据跨企业边界打通（从设计公司到 OSAT 封测厂再到终端云厂商）存在商业数据隐私与格式标准化阻力。", "riskEn": "Sharing silicon telemetry across fabless, OSAT, and hyperscaler boundaries faces data privacy and standardization hurdles.", "sources": [{"title": "TestMAX DFT: Advanced Design-for-Test | Synopsys", "url": "https://www.synopsys.com/implementation-and-signoff/test-automation/testmax-dft.html"}, {"title": "TSO.ai: AI-Driven Test Solution | Synopsys", "url": "https://www.synopsys.com/ai/ai-powered-eda/tso-ai.html"}, {"title": "Synopsys Products Portfolio | Synopsys", "url": "https://www.synopsys.com/products.html"}]}, {"id": "manufacturing_tcad", "num": "07", "mono": "MF", "cat": "ip_mfg", "catZh": "IP · 测试与制造", "catEn": "IP, Test & Fab", "titleZh": "TCAD 与掩模制造 (Manufacturing & TCAD)", "titleEn": "TCAD & Mask Manufacturing Solutions", "metaZh": "Sentaurus TCAD · Proteus OPC", "metaEn": "Sentaurus TCAD · Proteus OPC", "badgeZh": "SILICON PHYSICS · 原子级工艺至光刻掩模", "badgeEn": "SILICON PHYSICS · ATOMIC TO PHOTOMASK", "subZh": "服务全球晶圆厂与器件研发的半导体工艺/器件仿真（TCAD）及计算光刻、OPC 与掩模数据准备平台", "subEn": "Technology CAD (TCAD) for device/process physics and computational lithography, OPC, and mask synthesis for foundries", "kpis": [{"lblZh": "器件仿真标杆", "lblEn": "Device TCAD Standard", "val": "Sentaurus", "badgeZh": "1D/2D/3D", "badgeEn": "1D/2D/3D", "noteZh": "电、热、光多维耦合仿真新型晶体管与功率器件", "noteEn": "Electrical, thermal & optical device physics sim"}, {"lblZh": "计算光刻核心", "lblEn": "Computational Litho", "val": "Proteus OPC", "badgeZh": "EUV / ILT", "badgeEn": "EUV / ILT", "noteZh": "面向先进 DUV/EUV 光刻的光学邻近修正与工艺窗口优化", "noteEn": "DUV/EUV optical proximity correction & ILT"}, {"lblZh": "前沿材料覆盖", "lblEn": "Material Coverage", "val": "GAA / CFET / SiC", "badgeZh": "硅基+化合物", "badgeEn": "Si & Compound", "noteZh": "支撑 2nm GAA、CFET 与碳化硅（SiC）功率半导体", "noteEn": "Supports 2nm GAA, CFET, and SiC power devices"}, {"lblZh": "DTCO 协同价值", "lblEn": "DTCO Enablement", "val": "虚拟晶圆厂", "badgeZh": "减少流片试错", "badgeEn": "Cut Wafer Runs", "noteZh": "在定义实体晶圆工艺前完成设计-工艺协同优化", "noteEn": "Design-technology co-optimization before fab"}], "thesisZh": "在 2nm GAA、CFET 与高 NA EUV 光刻时代，每一次晶圆工艺试错成本高达数千万美元。新思科技 <strong>Sentaurus TCAD</strong> 与 <strong>Proteus OPC</strong> 是全球顶尖晶圆厂实现设计-工艺协同优化（DTCO）与掩模良率保障的底层基石。", "thesisEn": "At 2nm GAA, CFET, and High-NA EUV, experimental wafer runs cost tens of millions. <strong>Sentaurus TCAD</strong> and <strong>Proteus OPC</strong> underpin DTCO and mask yield across leading foundries.", "highlights": [{"titleZh": "原子至器件物理仿真", "titleEn": "Atomic-to-Device TCAD", "descZh": "Sentaurus 精确模拟载流子隧穿、自热效应与工艺偏差敏感度。", "descEn": "Sentaurus models carrier tunneling, self-heating, and process variation."}, {"titleZh": "EUV 与逆向光刻 OPC", "titleEn": "EUV & ILT Lithography", "descZh": "Proteus 最大化光刻工艺窗口，防止先进节点版图印刷畸变。", "descEn": "Proteus maximizes lithography process windows at EUV nodes."}, {"titleZh": "掩模写入数据标准", "titleEn": "Photomask Fracturing Standard", "descZh": "CATS 将设计版图高效转换为电子束掩模写入机可执行数据。", "descEn": "CATS converts GDSII/OASIS into high-precision photomask writer data."}], "products": [{"name": "Sentaurus™ Device & Process", "roleZh": "多维器件与工艺 TCAD", "roleEn": "1D/2D/3D TCAD", "craftZh": "FinFET · CFET · SiC", "craftEn": "FinFET · CFET · SiC", "specZh": "仿真硅基及化合物半导体器件的电学、热学与光学特性及参数良率", "specEn": "Simulates electrical, thermal, and optical behavior of Si & compound devices", "takeZh": "全球晶圆厂与高校器件物理研究第一标准", "takeEn": "#1 global TCAD standard for foundries & R&D", "url": "https://www.synopsys.com/manufacturing/tcad/device-simulation/sentaurus-device.html"}, {"name": "Proteus™ OPC", "roleZh": "光学邻近效应修正", "roleEn": "Optical Proximity Corr.", "craftZh": "DUV/EUV · ILT", "craftEn": "DUV/EUV · ILT", "specZh": "面向先进光刻节点的掩模图形修正、逆向光刻（ILT）与工艺窗口最大化", "specEn": "Advanced DUV/EUV mask correction, ILT, and process-window optimization", "takeZh": "保障纳米级光刻图形保真度与晶圆良率", "takeEn": "Safeguards nanoscale pattern fidelity & yield", "url": "https://www.synopsys.com/silicon-design.html"}, {"name": "CATS® & Mask Synthesis", "roleZh": "掩模数据准备", "roleEn": "Mask Data Prep", "craftZh": "GDSII/OASIS 分形", "craftEn": "Mask Fracturing", "specZh": "连接芯片物理版图与电子束掩模写入机的行业标准数据转换与验证工具", "specEn": "Industry-standard layout fracturing and verification for mask writers", "takeZh": "晶圆掩模制造车间不可或缺的桥梁软件", "takeEn": "Essential software bridge to photomask shops", "url": "https://www.synopsys.com/silicon-design.html"}], "workflows": [{"tagZh": "STAGE 01 · 工艺建模", "tagEn": "STAGE 01 · PROCESS", "titleZh": "Sentaurus 虚拟工艺与器件", "titleEn": "Virtual Process & Device", "descZh": "在实体晶圆流片前模拟离子注入、刻蚀与晶体管电学特性。", "descEn": "Models fab steps and transistor physics before physical wafer runs."}, {"tagZh": "STAGE 02 · DTCO 提取", "tagEn": "STAGE 02 · DTCO", "titleZh": "提取 SPICE 紧凑模型", "titleEn": "Compact SPICE Modeling", "descZh": "生成支撑 Foundation IP 与数字签核工具库的高精度工艺模型。", "descEn": "Extracts compact SPICE models feeding Foundation IP and EDA signoff."}, {"tagZh": "STAGE 03 · 计算光刻", "tagEn": "STAGE 03 · LITHOGRAPHY", "titleZh": "Proteus 执行 OPC 修正", "titleEn": "Proteus OPC Correction", "descZh": "对芯片版图执行高精度光学与光刻胶模拟并生成修正掩模图形。", "descEn": "Simulates optical/resist effects and applies OPC to layout shapes."}, {"tagZh": "STAGE 04 · 掩模交付", "tagEn": "STAGE 04 · MASK TAPE-OUT", "titleZh": "CATS 分形输出至掩模厂", "titleEn": "CATS Mask Fracturing", "descZh": "完成掩模数据分形与规则检查，确保光刻良率与关键尺寸一致性。", "descEn": "Fractures mask data for high-yield photomask manufacturing."}], "benchLabels": ["TCAD 器件仿真行业占有率", "先进节点 DTCO 支撑", "EUV/ILT 计算光刻能力", "宽禁带 SiC/GaN 覆盖"], "benchVals": [95, 94, 90, 92], "benchTexts": ["行业标杆", "GAA/CFET", "EUV Ready", "SiC/GaN"], "compZh": "新思科技 Sentaurus 在全球 TCAD 市场长期占据绝对领导地位；在计算光刻与掩模领域则与 ASML Brion、Siemens Calibre 共同构成晶圆制造端的核心软件支柱。", "compEn": "Sentaurus holds long-standing leadership in global TCAD, while Proteus and CATS form a core pillar of foundry computational lithography alongside ASML Brion and Siemens Calibre.", "evoZh": "结合机器学习加速 TCAD 与光刻热点预测，并支持下一代 CFET 立体堆叠晶体管与碳化硅（SiC）车规功率器件研发。", "evoEn": "Integrating ML acceleration for TCAD and lithography hotspot prediction while enabling next-gen CFET and SiC power devices.", "riskZh": "晶圆厂资本开支周期与地缘出口管制对最前沿 EUV 计算光刻工具的新增授权节奏存在一定影响。", "riskEn": "Foundry capex cycles and export controls can pace new licensing for leading-edge EUV computational lithography.", "sources": [{"title": "Sentaurus Device: Multidimensional Device Simulator | Synopsys", "url": "https://www.synopsys.com/manufacturing/tcad/device-simulation/sentaurus-device.html"}, {"title": "Electronic Design Automation (EDA) & Manufacturing | Synopsys", "url": "https://www.synopsys.com/silicon-design.html"}]}, {"id": "ansys_multiphysics", "num": "08", "mono": "AN", "cat": "ansys_services", "catZh": "Ansys 仿真与服务", "catEn": "Ansys & Services", "titleZh": "Ansys 结构、流体与电磁仿真 (Multiphysics)", "titleEn": "Ansys Structural, Fluids & EM Simulation", "metaZh": "Mechanical · Fluent · HFSS · Icepak", "metaEn": "Mechanical · Fluent · HFSS · Icepak", "badgeZh": "$35B 并购落地 · FY26E 贡献 ~$2.98B", "badgeEn": "$35B ACQUISITION · ~$2.98B FY26E REV", "subZh": "2025 年 7 月完成 $35B 并购后的世界级 CAE 多物理场仿真矩阵，覆盖结构力学、CFD 流体、高频电磁与 AI+ 加速", "subEn": "World-leading CAE multiphysics suite following the $35B acquisition (July 2025): structures, CFD, electromagnetics, and AI+", "kpis": [{"lblZh": "并购交易规模", "lblEn": "Acquisition Value", "val": "$35B", "badgeZh": "2025.07.17 交割", "badgeEn": "Closed Jul 2025", "noteZh": "工程软件史上最大规模并购案正式落地", "noteEn": "Largest transaction in engineering software history"}, {"lblZh": "FY26E 营收贡献", "lblEn": "FY26E Rev Contribution", "val": "~$2.98B", "badgeZh": "Q3 $711M", "badgeEn": "Q3 $711M", "noteZh": "全面并入 Design Automation 分部驱动集团 +37% 增长", "noteEn": "Integrated into Design Automation, driving +37% growth"}, {"lblZh": "HFSS 辐射计算提速", "lblEn": "HFSS Speedup", "val": "17x Faster", "badgeZh": "5G/6G & 雷达", "badgeEn": "5G/6G & Radar", "noteZh": "显著加速相控阵天线波束赋形与高速射频仿真", "noteEn": "Accelerates phased-array beam steering & RF design"}, {"lblZh": "AI+ 内置仿真产品", "lblEn": "AI+ Enabled Tools", "val": "7+ Products", "badgeZh": "Engineering Copilot", "badgeEn": "Eng. Copilot", "noteZh": "内置 50 余年仿真专家知识库与 SimAI 代理模型", "noteEn": "Built-in 50+ years of expertise & SimAI surrogates"}], "thesisZh": "2025 年 7 月完成对 <strong>Ansys</strong> 的 350 亿美元历史性并购，使新思科技从“芯片设计软件霸主”跃升为“从芯片到物理系统的全栈工程领导者”。<strong>Ansys Mechanical</strong>、<strong>Fluent</strong> 与 <strong>HFSS</strong> 不仅服务航空航天、汽车与工业巨头，更与新思 EDA 形成深度技术协同。", "thesisEn": "Closing the $35B <strong>Ansys</strong> deal in July 2025 transformed Synopsys into the Silicon-to-Systems engineering leader, uniting <strong>Mechanical</strong>, <strong>Fluent</strong>, and <strong>HFSS</strong> with core EDA.", "highlights": [{"titleZh": "全物理场求解器领导者", "titleEn": "Multi-Physics Solver Leader", "descZh": "囊括结构（Mechanical）、流体（Fluent）、高频电磁（HFSS）与电子散热（Icepak）。", "descEn": "Spans structural (Mechanical), CFD (Fluent), RF/EM (HFSS), and cooling (Icepak)."}, {"titleZh": "GPU 加速与 AI+ 代理", "titleEn": "GPU & AI+ Acceleration", "descZh": "Discovery 与 Icepak 深度释放 GPU 算力，SimAI 实现秒级物理场预测。", "descEn": "GPU-native Discovery/Icepak and SimAI surrogate models deliver instant insights."}, {"titleZh": "打通垂直行业大客户", "titleEn": "Cross-Industry System Reach", "descZh": "将新思硅级能力直接延伸至航空航天、国防、能源、医疗与汽车整机厂。", "descEn": "Extends Synopsys silicon expertise into aerospace, defense, energy & auto OEMs."}], "products": [{"name": "Ansys Mechanical™", "roleZh": "结构力学与热应力仿真", "roleEn": "Structural FEA", "craftZh": "有限元 · 瞬态热耦合", "craftEn": "FEA · Transient Thermal", "specZh": "覆盖结构强度、振动疲劳、复杂堆叠电子封装网格划分与热-力耦合求解", "specEn": "FEA for structural, fatigue, transient thermal, and stacked electronics meshing", "takeZh": "全球结构有限元仿真第一大工业软件", "takeEn": "#1 industrial structural FEA benchmark", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}, {"name": "Ansys Fluent®", "roleZh": "计算流体动力学 (CFD)", "roleEn": "CFD Simulation", "craftZh": "气动 · 传热 · 多相流", "craftEn": "Aero · Thermal · Multiphase", "specZh": "工业级流体、传热、气动外形与数据中心液冷散热仿真的黄金标准", "specEn": "Gold-standard CFD for aerodynamics, multiphase flow, and liquid cooling", "takeZh": "航空、汽车、能源与 AI 数据中心散热必备", "takeEn": "Essential for aerospace, auto & AI rack cooling", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}, {"name": "Ansys HFSS™ & Maxwell®", "roleZh": "全频段电磁仿真", "roleEn": "Electromagnetics", "craftZh": "HFSS 17x 提速 · AEDT", "craftEn": "17x HFSS · AEDT", "specZh": "HFSS 高频电磁/天线/高速通道仿真与 Maxwell 低频电机电磁仿真", "specEn": "HFSS (17x faster radiation patterns) & Maxwell in Ansys Electronics Desktop", "takeZh": "高速 SerDes、5G/6G 与相控阵雷达绝对标杆", "takeEn": "Unmatched benchmark for SerDes, 5G/6G & radar", "url": "https://ansys.synopsys.com/products/semiconductors"}, {"name": "Ansys Icepak®", "roleZh": "电子系统散热仿真", "roleEn": "Electronics Cooling", "craftZh": "GPU 加速 · 电热耦合", "craftEn": "GPU-Accelerated Thermal", "specZh": "面向芯片-封装-PCB-整机机箱的高效 GPU 加速热管理仿真", "specEn": "GPU-accelerated thermal and electrothermal cooling for chips, PCBs & racks", "takeZh": "应对高功耗 AI GPU 服务器热密度挑战", "takeEn": "Tackles extreme thermal density in AI servers", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}, {"name": "Ansys Discovery™ & Rocky™", "roleZh": "实时探索与颗粒仿真", "roleEn": "Real-Time & DEM", "craftZh": "GPU 实时 · 颗粒流耦合", "craftEn": "Real-Time GPU · DEM", "specZh": "概念设计阶段实时物理反馈（Discovery）与离散元颗粒-流体耦合（Rocky）", "specEn": "GPU-native real-time design exploration and DEM particle multiphysics", "takeZh": "让仿真从后期验证前移至前端设计师桌面", "takeEn": "Brings simulation upfront to every designer", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}, {"name": "Ansys SimAI™ & Copilot", "roleZh": "物理 AI 与工程助手", "roleEn": "Physics AI & Copilot", "craftZh": "optiSLang · AI+ 套件", "craftEn": "optiSLang · AI+ Suite", "specZh": "结合 optiSLang 训练物理代理模型，7 款以上产品内置 AI+ 与 Copilot", "specEn": "SimAI surrogate models with optiSLang plus built-in AI+ and Copilot", "takeZh": "将传统数小时求解压缩至秒级推理", "takeEn": "Compresses hours of solver runs into seconds", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}], "workflows": [{"tagZh": "STAGE 01 · 概念探索", "tagEn": "STAGE 01 · DISCOVERY", "titleZh": "Discovery + SimAI 秒级预测", "titleEn": "Instant Physics Exploration", "descZh": "在几秒内完成气动、结构或散热趋势评估，快速筛选最优概念方案。", "descEn": "Predict physics trends in seconds during early concepting."}, {"tagZh": "STAGE 02 · 多场求解", "tagEn": "STAGE 02 · WORKBENCH", "titleZh": "Mechanical + Fluent + HFSS", "titleEn": "High-Fidelity Multiphysics", "descZh": "在 Workbench 统一平台执行结构-流体-电磁高精度多物理场耦合。", "descEn": "Run coupled structural, CFD, and EM inside Ansys Workbench."}, {"tagZh": "STAGE 03 · 芯片系统", "tagEn": "STAGE 03 · SILICON-SYSTEM", "titleZh": "Icepak + HFSS-IC 跨层级", "titleEn": "Silicon-to-System Bridge", "descZh": "将芯片级热功耗与电磁寄生数据无缝传递至封装、PCB 与整机系统。", "descEn": "Bridge silicon thermal/EM data directly to package, PCB & chassis."}, {"tagZh": "STAGE 04 · 算力突发", "tagEn": "STAGE 04 · CLOUD HPC", "titleZh": "GPU 与 Cloud Burst 加速", "titleEn": "GPU & Cloud Burst", "descZh": "依托 GPU 求解器与 Ansys Cloud Burst Compute 消除本地算力瓶颈。", "descEn": "GPU solvers & Cloud Burst eliminate local HPC queues."}], "benchLabels": ["HFSS 辐射计算提速", "全球 CAE 仿真领导力", "GPU 加速产品覆盖", "与 EDA 协同整合度"], "benchVals": [96, 98, 90, 94], "benchTexts": ["17x 提速", "#1 CAE", "Icepak/Discovery", "Multiphysics Fusion"], "compZh": "在传统 CAE 市场与 Dassault Systèmes（SIMULIA）、Siemens（Simcenter）及 Altair 竞争。合并后的 Synopsys + Ansys 成为唯一同时拥有全球第一大 EDA 栈与全球第一大 CAE 多物理场栈的超级平台。", "compEn": "Competes with Dassault SIMULIA, Siemens Simcenter, and Altair. Combined Synopsys + Ansys is the only platform uniting #1 EDA and #1 CAE multiphysics.", "evoZh": "2025 年 7 月完成交割；2026 年全面整合进 Design Automation 报告分部，并联合举办首届 Synopsys Converge 2026 大会。", "evoEn": "Closed July 2025; integrated into Design Automation reporting segment in FY26, uniting SNUG and Simulation World into Synopsys Converge 2026.", "riskZh": "$35B 并购带来了约 $10B 债务负担与组织架构重组阵痛（2025 年底裁员约 2,800 人），跨文化与销售体系整合仍是 2026–2027 关注焦点。", "riskEn": "The $35B deal added ~$10B in debt and restructuring (~2,800 layoffs), keeping integration execution and deleveraging in focus.", "sources": [{"title": "Synopsys Completes Acquisition of Ansys | Synopsys News", "url": "https://news.synopsys.com/2025-07-17-Synopsys-Completes-Acquisition-of-Ansys"}, {"title": "Ansys 2025 R2 AI+ & Engineering Copilot | Synopsys IR", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}, {"title": "Ansys Semiconductor Multiphysics Solutions | Synopsys", "url": "https://ansys.synopsys.com/products/semiconductors"}]}, {"id": "photonics_digital_twin", "num": "09", "mono": "DT", "cat": "ansys_services", "catZh": "Ansys 仿真与服务", "catEn": "Ansys & Services", "titleZh": "Ansys 光电子、数字孪生与嵌入式系统", "titleEn": "Photonics, Digital Twin & Embedded Systems", "metaZh": "Lumerical · Speos · SCADE · Digital Twin", "metaEn": "Lumerical · Speos · SCADE · Digital Twin", "badgeZh": "PHYSICAL AI & SDV · 汽车与光子前沿", "badgeEn": "PHYSICAL AI & SDV · PHOTONICS & AUTO", "subZh": "面向硅光子、自动驾驶光学感知、软件定义汽车（SDV）电子数字孪生与安全关键嵌入式软件的综合平台", "subEn": "Simulation and modeling for silicon photonics, autonomous optical sensing, SDV Electronics Digital Twin, and safety-critical software", "kpis": [{"lblZh": "电子数字孪生", "lblEn": "SDV Digital Twin", "val": "2026 发布", "badgeZh": "SDV 加速", "badgeEn": "SDV Platform", "noteZh": "Synopsys Electronics Digital Twin Platform 正式推出", "noteEn": "Accelerates software-defined vehicle development"}, {"lblZh": "硅光子与微纳光学", "lblEn": "Photonics Simulation", "val": "Lumerical", "badgeZh": "FDTD / CPO", "badgeEn": "FDTD / CPO", "noteZh": "支撑下一代数据中心光电共封装（CPO）器件设计", "noteEn": "Powers next-gen silicon photonics & CPO interconnects"}, {"lblZh": "车规嵌入式软件", "lblEn": "Safety-Critical SW", "val": "Scade One™", "badgeZh": "认证代码生成", "badgeEn": "Certified Code", "noteZh": "满足航空电子与汽车最高功能安全认证要求", "noteEn": "Model-based certified embedded software dev"}, {"lblZh": "光学资产剥离说明", "lblEn": "Divestiture Note", "val": "Keysight", "badgeZh": "合规剥离", "badgeEn": "Divested", "noteZh": "原新思 CODE V / LightTools / RSoft 已转归是德科技", "noteEn": "Legacy CODE V / LightTools moved to Keysight"}], "thesisZh": "在合并 Ansys 光电子与系统工具的同时，新思科技按监管要求将原光学方案（CODE V、LightTools 等）剥离给 Keysight，转而以 <strong>Ansys Lumerical</strong>、<strong>Speos</strong>、<strong>SCADE</strong> 及 2026 年新推出的 <strong>Electronics Digital Twin Platform</strong> 聚焦硅光子互连与软件定义汽车（SDV）。", "thesisEn": "While divesting legacy optical tools (CODE V, LightTools) to Keysight, Synopsys anchors photonics and Physical AI on <strong>Ansys Lumerical</strong>, <strong>Speos</strong>, <strong>SCADE</strong>, and the 2026 <strong>Electronics Digital Twin Platform</strong>.", "highlights": [{"titleZh": "硅光子与光电共封装", "titleEn": "Silicon Photonics & CPO", "descZh": "Lumerical 解决 AI 数据中心光互连芯片的波导、调制器与光电耦合仿真。", "descEn": "Lumerical models waveguides, modulators & CPO for AI optical interconnects."}, {"titleZh": "软件定义汽车数字孪生", "titleEn": "SDV Electronics Digital Twin", "descZh": "将芯片虚拟原型与整车物理仿真打通，使车企在硬件到位前完成软件验证。", "descEn": "Unites virtual SoCs with vehicle physics for pre-hardware SDV validation."}, {"titleZh": "安全关键嵌入式开发", "titleEn": "Certified Embedded Software", "descZh": "Scade One 与 Saber 覆盖高安全控制代码生成及新能源高压电驱建模。", "descEn": "Scade One & Saber cover certified flight/auto code and EV powertrains."}], "products": [{"name": "Ansys Lumerical™", "roleZh": "光子与纳米光学仿真", "roleEn": "Photonics Simulation", "craftZh": "FDTD · 光电共封装", "craftEn": "FDTD · Silicon Photonics", "specZh": "仿真硅光子器件、波导、激光器、光子集成电路（PIC）与 CPO 链路", "specEn": "FDTD and multiphysics simulation for silicon photonics, PICs, and CPO", "takeZh": "AI 光互连与光计算芯片研发核心工具", "takeEn": "Core solver for AI optical interconnect chips", "url": "https://www.synopsys.com/photonic-solutions.html"}, {"name": "Ansys Speos®", "roleZh": "真实环境光学与感知", "roleEn": "Optical & Sensor Sim", "craftZh": "3D 场景 · LiDAR/视觉", "craftEn": "3D Scene · LiDAR/Eye", "specZh": "仿真人眼视觉、车灯合规性、摄像头与激光雷达传感器在真实 3D 环境的成像", "specEn": "Simulates human vision, lighting, and LiDAR/camera perception in 3D", "takeZh": "自动驾驶光学传感器在环仿真标杆", "takeEn": "Benchmark for autonomous sensor-in-the-loop", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}, {"name": "Electronics Digital Twin", "roleZh": "电子数字孪生平台 (2026)", "roleEn": "SDV Digital Twin", "craftZh": "Virtualizer + 物理仿真", "craftEn": "Virtualizer + Physics", "specZh": "2026 年发布，融合虚拟硬件原型与物理仿真加速软件定义汽车与物理 AI 开发", "specEn": "2026 platform combining virtual prototypes & physics for SDV & Physical AI", "takeZh": "将整车电子电气架构验证全面移至云端", "takeEn": "Moves full vehicle E/E verification to the cloud", "url": "https://www.synopsys.com/"}, {"name": "Ansys Scade One™ / SCADE", "roleZh": "安全关键嵌入式开发", "roleEn": "Embedded SW Modeling", "craftZh": "模型化 · 认证代码生成", "craftEn": "MBD · Certified Code", "specZh": "面向航空电子、轨交与自动驾驶控制器的模型化设计与认证代码生成环境", "specEn": "Model-based development for safety-critical aerospace and auto software", "takeZh": "大幅降低高安全等级嵌入式软件认证成本", "takeEn": "Slashes safety certification cost for critical SW", "url": "https://ansys.synopsys.com/academic/educators/academic-product-portfolio"}, {"name": "Synopsys Saber®", "roleZh": "电力电子与机电仿真", "roleEn": "Power & Mechatronics", "craftZh": "EV 电驱 · 电源转换", "craftEn": "EV Drivetrain · Power", "specZh": "面向新能源汽车电驱、电源转换、线束与机电一体化的物理系统建模平台", "specEn": "Physical system modeling for power electronics, EV drivetrains & mechatronics", "takeZh": "新能源与工业电力系统可靠性验证底座", "takeEn": "Proven platform for EV & power system reliability", "url": "https://www.synopsys.com/"}], "workflows": [{"tagZh": "STAGE 01 · 光子感知", "tagEn": "STAGE 01 · PHOTONICS", "titleZh": "Lumerical + Speos 建模", "titleEn": "Photonics & Sensor Optics", "descZh": "设计高速硅光子链路并验证车载摄像头与 LiDAR 在复杂光照下的成像。", "descEn": "Design silicon photonics and validate camera/LiDAR optical performance."}, {"tagZh": "STAGE 02 · 电力机电", "tagEn": "STAGE 02 · MECHATRONICS", "titleZh": "Saber 仿真电驱与电源", "titleEn": "Power & Drivetrain Sim", "descZh": "验证高压电源转换、线束故障与机电执行器在极端工况下的表现。", "descEn": "Verify high-voltage power conversion and mechatronic fault tolerance."}, {"tagZh": "STAGE 03 · 认证软件", "tagEn": "STAGE 03 · EMBEDDED SW", "titleZh": "Scade One 生成安全代码", "titleEn": "Certified Code Generation", "descZh": "通过模型化设计自动生成符合功能安全标准的嵌入式控制代码。", "descEn": "Auto-generate safety-certified embedded code from system models."}, {"tagZh": "STAGE 04 · 数字孪生", "tagEn": "STAGE 04 · DIGITAL TWIN", "titleZh": "SDV 云端数字孪生闭环", "titleEn": "SDV Cloud Digital Twin", "descZh": "Electronics Digital Twin 联合运行虚拟芯片与整车软件，加速 OTA 迭代。", "descEn": "Co-simulate virtual SoCs and vehicle SW to speed up SDV releases."}], "benchLabels": ["硅光子 CPO 仿真覆盖", "SDV 虚拟原型协同", "车规功能安全认证", "光学传感器闭环"], "benchVals": [94, 92, 95, 90], "benchTexts": ["Lumerical", "Digital Twin", "ISO/DO-178", "Speos"], "compZh": "对比传统单一光学或单一汽车软件工具链，新思科技独有的优势在于把 SoC 芯片虚拟原型（Virtualizer）直接嵌入到整车传感器与物理系统（Speos/Saber）的数字孪生中。", "compEn": "Unlike isolated optics or automotive tools, Synopsys embeds Virtualizer SoC prototypes directly into Speos/Saber system-level digital twins.", "evoZh": "原新思光学产品（CODE V、LightTools、LucidShape、RSoft）已转归 Keysight Technologies；保留并强化 Ansys Lumerical/Speos 与 2026 Physical AI / SDV 数字孪生战略。", "evoEn": "Legacy optical tools (CODE V, LightTools, LucidShape, RSoft) transferred to Keysight; Synopsys doubles down on Lumerical, Speos, and 2026 Physical AI / SDV digital twins.", "riskZh": "光学业务剥离过渡期需要保障老客户平滑迁移，同时汽车 OEM 自研 SDV 数字孪生平台的节奏受整车研发周期影响。", "riskEn": "Optical divestiture transition requires smooth customer handoff, while OEM adoption of SDV digital twins follows multi-year vehicle cycles.", "sources": [{"title": "Synopsys Silicon Photonics Solutions | Synopsys", "url": "https://www.synopsys.com/photonic-solutions.html"}, {"title": "Optical Design Solutions Transition to Keysight | Synopsys", "url": "https://www.synopsys.com/optical-solutions.html"}, {"title": "Synopsys Electronics Digital Twin & Physical AI | Synopsys", "url": "https://www.synopsys.com/"}]}, {"id": "cloud_services", "num": "10", "mono": "CS", "cat": "ansys_services", "catZh": "Ansys 仿真与服务", "catEn": "Ansys & Services", "titleZh": "Synopsys Cloud 云平台与专业设计服务", "titleEn": "Synopsys Cloud & Professional Design Services", "metaZh": "FlexEDA · ZeBu Cloud · Design Services", "metaEn": "FlexEDA · ZeBu Cloud · Design Services", "badgeZh": "CLOUD SAAS & ENGINEERING SERVICES", "badgeEn": "CLOUD SAAS & ENGINEERING SERVICES", "subZh": "基于 FlexEDA 弹性信用点的云原生 EDA/仿真平台，以及覆盖从架构到流片量产的全球专业工程设计服务", "subEn": "Cloud-native EDA/simulation SaaS powered by FlexEDA credits, plus end-to-end ASIC and system engineering design services", "kpis": [{"lblZh": "FlexEDA 商业模式", "lblEn": "FlexEDA Model", "val": "Cloud Credits", "badgeZh": "弹性按需", "badgeEn": "Elastic Pay", "noteZh": "统一信用点按需调用任意 EDA 工具许可与云端算力", "noteEn": "Single currency for licenses & cloud compute"}, {"lblZh": "云端硬件仿真", "lblEn": "Hosted Emulation", "val": "ZeBu Cloud", "badgeZh": "SaaS Burst", "badgeEn": "SaaS Burst", "noteZh": "免机柜采购与运维，支持本地 ZeBu 云端突发编译", "noteEn": "Turnkey hosted emulation + cloud burst compilation"}, {"lblZh": "全流程设计服务", "lblEn": "Design Services", "val": "ASIC-to-System", "badgeZh": "交钥匙工程", "badgeEn": "Turnkey", "noteZh": "覆盖先进节点物理实现、IP 集成与 3DIC 系统交付", "noteEn": "Physical design flow, IP integration & 3DIC delivery"}, {"lblZh": "集团现金流支撑", "lblEn": "Group Cash Flow", "val": "~$2.6B FCF", "badgeZh": "FY26E 目标", "badgeEn": "FY26E Target", "noteZh": "高粘性订阅制与云服务驱动 ~$2.8B 经营现金流", "noteEn": "~$2.8B operating cash flow & ~$2.6B FCF target"}], "thesisZh": "对于 AI 初创公司及存在峰值算力需求的半导体巨头而言，本地部署固定数量的 EDA 许可与仿真机柜成本高昂。<strong>Synopsys Cloud</strong> 通过 <strong>FlexEDA</strong> 打破传统许可束缚，配合 <strong>Synopsys Design Services</strong> 帮助客户跨越先进制程与系统集成门槛。", "thesisEn": "Traditional fixed EDA licenses bottleneck burst workloads. <strong>Synopsys Cloud</strong>'s <strong>FlexEDA</strong> credit model unlocks elastic tools and emulation, backed by <strong>Design Services</strong> for turnkey silicon delivery.", "highlights": [{"titleZh": "FlexEDA 信用点革命", "titleEn": "FlexEDA Credit Elasticity", "descZh": "消除“工具闲置或不够用”的许可错配，让项目进度而非预算决定算力调用。", "descEn": "Eliminates license seat bottlenecks so project timelines dictate tool usage."}, {"titleZh": "云端硬件仿真与突发算力", "titleEn": "Cloud Emulation & CAE Burst", "descZh": "ZeBu Cloud 与 Ansys Cloud Burst Compute 让中小团队也能调用顶级仿真算力。", "descEn": "ZeBu Cloud and Ansys Cloud Burst bring mega-scale HPC to any team."}, {"titleZh": "从 ASIC 到系统交钥匙服务", "titleEn": "Turnkey ASIC & System Services", "descZh": "资深工程团队协助客户攻克 2nm 物理实现、IP 子系统与 3DIC 封装难点。", "descEn": "Expert engineers co-deliver 2nm physical flows, IP subsystems, and 3DIC."}], "products": [{"name": "Synopsys Cloud™ Platform", "roleZh": "云原生 EDA SaaS 平台", "roleEn": "Cloud EDA SaaS", "craftZh": "自动许可 · 参考设计", "craftEn": "Auto License · RISC-V", "specZh": "现代 Web 门户整合自动化许可管理、安全云端算力、RISC-V 参考设计与 AI 工具", "specEn": "Web portal uniting automated license management, cloud compute & AI tools", "takeZh": "支持 30 天全功能试用，大幅降低启动门槛", "takeEn": "30-day full-featured trial lowers startup barrier", "url": "https://www.synopsys.com/cloud/platform.html"}, {"name": "FlexEDA™ Business Model", "roleZh": "弹性按需许可模式", "roleEn": "Elastic Licensing", "craftZh": "Cloud Credits 计费", "craftEn": "Cloud Credits", "specZh": "以统一 Cloud Credits 替代固定工具席位限制，按项目峰值需求自由调配工具", "specEn": "Replaces fixed seat counts with elastic Cloud Credits across enabled tools", "takeZh": "重塑 EDA 商业模式，完美匹配流片前脉冲负载", "takeEn": "Reshapes EDA licensing for pre-tapeout burst peaks", "url": "https://www.synopsys.com/glossary/what-is-flexeda.html"}, {"name": "ZeBu® Cloud & SaaS Burst", "roleZh": "云端托管硬件仿真", "roleEn": "Hosted Emulation", "craftZh": "免自建机房 · 突发编译", "craftEn": "Turnkey · SaaS Burst", "specZh": "无需采购机柜即可使用最新 ZeBu 仿真器，并支持本地 ZeBu 的云端编译加速", "specEn": "Turnkey hosted ZeBu emulation with cloud burst compilation and peak capacity", "takeZh": "让初创团队与跨区域客户轻松开展流片前协同", "takeEn": "Enables pre-silicon customer collaboration anywhere", "url": "https://www.synopsys.com/verification/emulation-prototyping/emulation/zebu-cloud-solution.html"}, {"name": "Ansys Cloud Burst Compute™", "roleZh": "云端突发 HPC 算力", "roleEn": "On-Demand CAE HPC", "craftZh": "内置 6+ Ansys 产品", "craftEn": "6+ Ansys Solvers", "specZh": "内置于 Speos、Lumerical FDTD 等 6 款 Ansys 产品，一键调用云端 HPC 无需 IT 支持", "specEn": "Built-in on-demand cloud HPC across 6+ Ansys solvers with zero IT setup", "takeZh": "打通多物理场大规模参数扫描算力瓶颈", "takeEn": "Unlocks massive parameter sweeps without IT setup", "url": "https://investor.synopsys.com/news/news-details/2025/Ansys-2025-R2-Enables-Next-Level-Productivity-by-Leveraging-AI-Smart-Automation-and-Broader-On-Demand-Capabilities-Solutions/default.aspx"}, {"name": "Synopsys Design Services", "roleZh": "专业芯片与系统设计服务", "roleEn": "Professional Services", "craftZh": "ASIC · 物理实现 · IP", "craftEn": "ASIC · Physical · IP", "specZh": "提供 ASIC 交钥匙设计、全流程物理实现、IP 子系统集成与工程咨询", "specEn": "ASIC/SoC turnkey design, physical implementation, and IP integration", "takeZh": "帮助系统厂商与超大规模客户加速自研芯片落地", "takeEn": "Helps hyperscalers & OEMs land custom silicon", "url": "https://www.synopsys.com/services.html"}, {"name": "System Solutions Design Services", "roleZh": "系统级解决方案服务", "roleEn": "System Design Services", "craftZh": "端到端系统工程", "craftEn": "End-to-End Systems", "specZh": "协助汽车、数据中心与复杂电子系统团队缩短开发周期并降低集成风险", "specEn": "End-to-end engineering support for automotive, data center & system teams", "takeZh": "连接新思全套软件栈与客户实际量产目标", "takeEn": "Bridges Synopsys software stack to customer tape-out", "url": "https://www.synopsys.com/services/design-services.html"}], "workflows": [{"tagZh": "STAGE 01 · 弹性开箱", "tagEn": "STAGE 01 · PROVISION", "titleZh": "FlexEDA 信用点激活", "titleEn": "FlexEDA Instant Setup", "descZh": "通过 Synopsys Cloud 一键激活所需工具许可与云端算力，快速启动项目。", "descEn": "Provision term or credit-based licenses instantly on Synopsys Cloud."}, {"tagZh": "STAGE 02 · 峰值突发", "tagEn": "STAGE 02 · BURST", "titleZh": "ZeBu Cloud 与云端回归", "titleEn": "Peak Regression & Emulation", "descZh": "流片前利用云端弹性算力吞吐海量验证、签核与多物理场仿真任务。", "descEn": "Scale out regressions, signoff, and ZeBu Cloud emulation pre-tapeout."}, {"tagZh": "STAGE 03 · 专家协同", "tagEn": "STAGE 03 · CO-DELIVERY", "titleZh": "Design Services 联合攻关", "titleEn": "Expert Design Services", "descZh": "新思工程团队介入 2nm 物理实现或 3DIC 封装难点，保障一次流片成功。", "descEn": "Synopsys engineers co-deliver critical physical, IP, or 3DIC blocks."}, {"tagZh": "STAGE 04 · 安全合规", "tagEn": "STAGE 04 · SECURITY", "titleZh": "零信任云端 IP 资产防护", "titleEn": "Zero-Trust Cloud Security", "descZh": "端到端加密与应用层安全防护保障客户核心 RTL/GDSII 资产安全。", "descEn": "End-to-end encryption protects proprietary RTL and GDSII in the cloud."}], "benchLabels": ["弹性许可灵活度", "云端算力可扩展性", "交钥匙工程覆盖", "软件安全业务说明"], "benchVals": [96, 95, 92, 100], "benchTexts": ["FlexEDA", "ZeBu+Ansys", "ASIC-to-Sys", "SIG 已剥离(Black Duck)"], "compZh": "相比传统本地买断制 EDA 模式，Synopsys Cloud 率先在云原生 SaaS 与按信用点计费（FlexEDA）建立先发优势；同时注意原软件安全部门（Software Integrity Group）已剥离独立为 Black Duck，使新思科技更纯粹聚焦芯片与系统工程。", "compEn": "Synopsys Cloud pioneered elastic credit-based EDA SaaS (FlexEDA). Note that the former Software Integrity Group was divested as Black Duck, sharpening focus on silicon-to-systems.", "evoZh": "2025–2026 年将 Ansys Cloud Burst Compute 与 Synopsys Cloud 协同推进，进一步打通芯片 EDA 与系统级物理仿真的云端算力池。", "evoEn": "2025–2026 aligns Ansys Cloud Burst Compute with Synopsys Cloud for unified silicon-to-systems cloud HPC.", "riskZh": "大型芯片设计公司对核心源码上云仍持审慎态度，混合云（本地私有集群 + 公有云突发）在中期内仍是主流过渡形态。", "riskEn": "Tier-1 semiconductor firms remain cautious about full cloud migration of crown-jewel RTL, making hybrid cloud burst the medium-term norm.", "sources": [{"title": "Synopsys Cloud Platform | Synopsys", "url": "https://www.synopsys.com/cloud/platform.html"}, {"title": "What is FlexEDA? | Synopsys", "url": "https://www.synopsys.com/glossary/what-is-flexeda.html"}, {"title": "ZeBu Cloud: Hosted Emulation Solution | Synopsys", "url": "https://www.synopsys.com/verification/emulation-prototyping/emulation/zebu-cloud-solution.html"}, {"title": "Professional & Design Services | Synopsys", "url": "https://www.synopsys.com/services.html"}]}];

    var state = {
      activeId: PILLARS[0].id,
      activeCat: 'all',
      theme: document.documentElement.getAttribute('data-theme') || 'dark',
      lang: document.documentElement.getAttribute('data-lang') || 'zh',
      density: 'relaxed',
      productQuery: '',
      checks: [true, true, true, true, false, false]
    };
 var requestedTopic = new URLSearchParams(location.hash.slice(1)).get('ip');
 if (requestedTopic && PILLARS.some(function (item) { return item.id === requestedTopic; })) state.activeId = requestedTopic;


    function showToast(msg) {
      var el = document.getElementById('muiSnackbar');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(el._t);
      el._t = setTimeout(function () { el.classList.remove('show'); }, 2500);
    }

    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function getActivePillar() {
      for (var i = 0; i < PILLARS.length; i++) {
        if (PILLARS[i].id === state.activeId) return PILLARS[i];
      }
      return PILLARS[0];
    }

    function getFilteredPillars() {
      if (state.activeCat === 'all') return PILLARS;
      return PILLARS.filter(function (p) { return p.cat === state.activeCat; });
    }

    function applyStaticI18n() {
      var isEn = state.lang === 'en';
      document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
        el.textContent = isEn ? (el.getAttribute('data-i18n-en') || el.textContent) : el.getAttribute('data-i18n-zh');
      });
      var searchInput = document.getElementById('quickJumpInput');
      if (searchInput) {
        searchInput.placeholder = isEn ? 'Search Synopsys products, tools or sections…' : '检索新思科技产品、工具或章节…';
      }
      var densText = document.getElementById('densityBtnText');
      if (densText) {
        densText.textContent = state.density === 'compact'
          ? (isEn ? 'Compact' : '紧凑视图')
          : (isEn ? 'Comfort' : '舒适排版');
      }
      var zhBtn = document.getElementById('langZhBtn');
      var enBtn = document.getElementById('langEnBtn');
      if (zhBtn && enBtn) {
        zhBtn.classList.toggle('active', !isEn);
        enBtn.classList.toggle('active', isEn);
        zhBtn.setAttribute('aria-pressed', String(!isEn));
        enBtn.setAttribute('aria-pressed', String(isEn));
      }
      var sLight = document.getElementById('sideThemeLightBtn');
      var sDark = document.getElementById('sideThemeDarkBtn');
      if (sLight && sDark) {
        void 0;
        void 0;
      }
    }

    function renderPillarControls() {
      var isEn = state.lang === 'en';
      var list = getFilteredPillars();
      var p = getActivePillar();

      document.querySelectorAll('[data-cat-filter]').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-cat-filter') === state.activeCat);
      });

      var grid = document.getElementById('ipPillGrid');
      if (grid) {
        grid.innerHTML = list.map(function (item) {
          var active = item.id === p.id;
          return '<button type="button" class="ip-pill-btn' + (active ? ' active' : '') + '" data-switch-ip="' + esc(item.id) + '" aria-pressed="' + active + '">' +
            '<span class="ip-pill-mono mono">' + esc(item.mono) + '</span>' +
            '<span class="ip-pill-text">' +
              '<span class="ip-pill-name">' + esc(item.num + '. ' + (isEn ? item.titleEn : item.titleZh)) + '</span>' +
              '<span class="ip-pill-meta mono">' + esc(isEn ? item.metaEn : item.metaZh) + '</span>' +
            '</span>' +
          '</button>';
        }).join('');
      }

      var sideList = document.getElementById('sidePillarList');
      if (sideList) {
        sideList.innerHTML = list.map(function (item) {
          var active = item.id === p.id;
          return '<a href="#sec-00" class="co-hub-item' + (active ? ' active' : '') + '" data-switch-ip="' + esc(item.id) + '">' +
            '<span class="co-hub-ticker mono">' + esc(item.num) + '</span>' +
            '<span class="co-hub-info">' +
              '<span class="co-hub-title">' + esc(isEn ? item.titleEn : item.titleZh) + '</span>' +
              '<span class="co-hub-meta mono">' + esc(isEn ? item.catEn : item.catZh) + '</span>' +
            '</span>' +
          '</a>';
        }).join('');
      }

      var monoEl = document.getElementById('appbarMonogram');
      if (monoEl) monoEl.textContent = p.mono;
      var crumbEl = document.getElementById('appbarCrumbCurrent');
      if (crumbEl) crumbEl.textContent = p.num + ' · ' + (isEn ? p.titleEn : p.titleZh);
      var sideTitle = document.getElementById('sideCardTitle');
      if (sideTitle) sideTitle.textContent = p.num + ' · ' + (isEn ? p.titleEn : p.titleZh);
      var sideSub = document.getElementById('sideCardSub');
      if (sideSub) sideSub.textContent = isEn ? p.subEn : p.subZh;
      var sideCounter = document.getElementById('sideIndexCounter');
      if (sideCounter) sideCounter.textContent = 'SNPS · ' + p.num + '/10';
    }

    function buildGroupRevenueSvg(isEn) {
      return '<svg viewBox="0 0 680 280" role="img" aria-label="Synopsys Revenue & Segment Breakdown">' +
        '<rect x="0" y="0" width="680" height="280" fill="transparent"/>' +
        '<text x="16" y="24" fill="var(--text-primary)" font-size="14" font-weight="700">' +
          (isEn ? 'Synopsys Revenue Trajectory & Q3 FY26 Segment Mix ($B)' : '新思科技集团营收跃升轨迹与 Q3 FY26 业务分部构成（十亿美元）') +
        '</text>' +
        '<line x1="60" y1="230" x2="650" y2="230" stroke="var(--divider)" stroke-width="1.2"/>' +
        '<line x1="60" y1="180" x2="650" y2="180" stroke="var(--chart-grid)" stroke-dasharray="4 4"/>' +
        '<line x1="60" y1="130" x2="650" y2="130" stroke="var(--chart-grid)" stroke-dasharray="4 4"/>' +
        '<line x1="60" y1="80" x2="650" y2="80" stroke="var(--chart-grid)" stroke-dasharray="4 4"/>' +
        '<text x="50" y="234" text-anchor="end" fill="var(--chart-tick)" font-size="11" class="mono">$0B</text>' +
        '<text x="50" y="184" text-anchor="end" fill="var(--chart-tick)" font-size="11" class="mono">$3.3B</text>' +
        '<text x="50" y="134" text-anchor="end" fill="var(--chart-tick)" font-size="11" class="mono">$6.7B</text>' +
        '<text x="50" y="84" text-anchor="end" fill="var(--chart-tick)" font-size="11" class="mono">$10.0B</text>' +
        '<rect class="chart-bar" data-tip="FY2025: $7.054B (+15% YoY, incl. partial Ansys)" x="95" y="124" width="76" height="106" rx="6" fill="var(--chart-c1)" opacity="0.78"/>' +
        '<text x="133" y="116" text-anchor="middle" fill="var(--text-primary)" font-size="12" font-weight="700" class="mono">$7.05B</text>' +
        '<text x="133" y="250" text-anchor="middle" fill="var(--text-secondary)" font-size="12">FY2025</text>' +
        '<rect class="chart-bar" data-tip="FY2026E Core EDA & IP: ~$6.74B" x="215" y="129" width="76" height="101" rx="0" fill="var(--chart-c1)"/>' +
        '<rect class="chart-bar" data-tip="FY2026E Ansys Contribution: ~$2.98B" x="215" y="84" width="76" height="45" rx="6" fill="var(--chart-c2)"/>' +
        '<text x="253" y="76" text-anchor="middle" fill="var(--text-primary)" font-size="12" font-weight="700" class="mono">$9.69–9.74B</text>' +
        '<text x="253" y="250" text-anchor="middle" fill="var(--text-secondary)" font-size="12">FY2026E (+37%)</text>' +
        '<line x1="340" y1="60" x2="340" y2="255" stroke="var(--divider)" stroke-width="1"/>' +
        '<text x="368" y="68" fill="var(--text-secondary)" font-size="12" font-weight="600">' +
          (isEn ? 'Q3 FY26 Segment Mix ($2.48B Total)' : 'Q3 FY26 分部营收构成（总计 $2.48B）') +
        '</text>' +
        '<rect class="chart-bar" data-tip="Design Automation (EDA + Ansys): $2.00B (80.7%)" x="368" y="96" width="230" height="32" rx="6" fill="var(--chart-c1)"/>' +
        '<text x="606" y="117" fill="var(--text-primary)" font-size="12" font-weight="700" class="mono">$2.00B</text>' +
        '<text x="368" y="90" fill="var(--text-secondary)" font-size="11.5">Design Automation (EDA + Ansys)</text>' +
        '<rect class="chart-bar" data-tip="Design IP: $473.8M (19.1%)" x="368" y="160" width="56" height="32" rx="6" fill="var(--chart-c3)"/>' +
        '<text x="432" y="181" fill="var(--text-primary)" font-size="12" font-weight="700" class="mono">$473.8M</text>' +
        '<text x="368" y="154" fill="var(--text-secondary)" font-size="11.5">Design IP (Interface / Foundation / Security)</text>' +
        '<rect x="95" y="264" width="10" height="10" rx="2" fill="var(--chart-c1)"/><text x="110" y="273" fill="var(--text-muted)" font-size="11">EDA &amp; IP</text>' +
        '<rect x="180" y="264" width="10" height="10" rx="2" fill="var(--chart-c2)"/><text x="195" y="273" fill="var(--text-muted)" font-size="11">Ansys (~$2.98B)</text>' +
        '<rect x="300" y="264" width="10" height="10" rx="2" fill="var(--chart-c3)"/><text x="315" y="273" fill="var(--text-muted)" font-size="11">Design IP</text>' +
      '</svg>';
    }

    function buildPillarBenchSvg(p, isEn) {
      var rows = p.benchLabels.map(function (lbl, idx) {
        var val = p.benchVals[idx] || 80;
        var w = Math.max(30, Math.round(val * 3.4));
        var y = 52 + idx * 46;
        return '<text x="16" y="' + (y + 18) + '" fill="var(--text-secondary)" font-size="12">' + esc(lbl) + '</text>' +
          '<rect x="210" y="' + y + '" width="340" height="24" rx="6" fill="var(--bg-subtle)"/>' +
          '<rect class="chart-bar" data-tip="' + esc(lbl + ': ' + p.benchTexts[idx]) + '" x="210" y="' + y + '" width="' + w + '" height="24" rx="6" fill="var(--chart-c1)"/>' +
          '<text x="562" y="' + (y + 17) + '" fill="var(--text-primary)" font-size="12" font-weight="700" class="mono">' + esc(p.benchTexts[idx]) + '</text>';
      }).join('');
      return '<svg viewBox="0 0 680 245" role="img" aria-label="Pillar Benchmark">' +
        '<text x="16" y="24" fill="var(--text-primary)" font-size="14" font-weight="700">' +
          esc(p.num + ' · ' + (isEn ? p.titleEn : p.titleZh) + (isEn ? ' — Capability & Benchmark Index' : ' — 核心能力与基准指标')) +
        '</text>' +
        rows +
      '</svg>';
    }

    function renderProductTableRows(p, isEn) {
      var q = state.productQuery.trim().toLowerCase();
      var rows = p.products.filter(function (prod) {
        if (!q) return true;
        var hay = (prod.name + ' ' + prod.roleZh + ' ' + prod.roleEn + ' ' + prod.craftZh + ' ' + prod.craftEn + ' ' + prod.specZh + ' ' + prod.specEn + ' ' + prod.takeZh + ' ' + prod.takeEn).toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      var badge = document.getElementById('peerCountBadge');
      if (badge) {
        badge.textContent = isEn
          ? ('Showing ' + rows.length + ' / ' + p.products.length + ' Products')
          : ('显示 ' + rows.length + ' / ' + p.products.length + ' 项产品/服务');
      }
      if (!rows.length) {
        return '<tr><td colspan="5" style="text-align:center;padding:24px;">' + (isEn ? 'No matching products or services found.' : '未找到匹配的产品或服务，请更换关键词。') + '</td></tr>';
      }
      return rows.map(function (prod) {
        return '<tr>' +
          '<td><strong style="color:var(--text-primary);display:block;">' + esc(prod.name) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + esc(isEn ? prod.roleEn : prod.roleZh) + '</span></td>' +
          '<td class="mono" style="font-size:0.79rem;">' + esc(isEn ? prod.craftEn : prod.craftZh) + '</td>' +
          '<td>' + esc(isEn ? prod.specEn : prod.specZh) + '</td>' +
          '<td>' + esc(isEn ? prod.takeEn : prod.takeZh) + '</td>' +
          '<td><a class="cite-link" href="' + esc(prod.url) + '" target="_blank" rel="noopener noreferrer">' + (isEn ? 'Official ↗' : '官网详情 ↗') + '</a></td>' +
        '</tr>';
      }).join('');
    }

    function renderChecklist(isEn) {
      var items = isEn ? [
        {title: 'Ansys $35B Synergies & Margin Expansion', tag: 'OPM ~41.5%', desc: 'Track Non-GAAP operating margin trajectory toward mid-40s long-term target.'},
        {title: 'Multiphysics Fusion Adoption', tag: 'Co-Design', desc: 'Monitor 3DIC Compiler + RedHawk-SC Electrothermal adoption across hyperscalers.'},
        {title: 'AgentEngineer™ & Synopsys.ai Monetization', tag: 'Agentic AI', desc: 'Verify AI-driven EDA seat & credit expansion across top semiconductor accounts.'},
        {title: 'Design IP Growth Recovery', tag: 'Q3 $473.8M', desc: 'Track UALink, PCIe 7.0, HBM4, and UCIe IP licensing after Processor IP divestiture.'},
        {title: 'Deleveraging & Free Cash Flow', tag: '~$2.6B FCF', desc: 'Monitor paydown of ~$10B Ansys acquisition debt from ~$2.6B annual FCF.'},
        {title: 'Foundry & Geopolitical Export Compliance', tag: '2nm / CFET', desc: 'Assess impact of regional export restrictions and TSMC/Samsung/Intel node ramps.'}
      ] : [
        {title: 'Ansys $35B 并购协同与利润率提升', tag: 'OPM ~41.5%', desc: '跟踪 Non-GAAP 营业利润率向长期目标 45% 区间迈进的兑现节奏。'},
        {title: 'Multiphysics Fusion 多物理场落地', tag: '协同设计', desc: '跟踪 3DIC Compiler + RedHawk-SC Electrothermal 在 AI 芯片巨头中的渗透。'},
        {title: 'AgentEngineer™ 与 Synopsys.ai 商业化', tag: 'Agentic AI', desc: '核验 AI 驱动型 EDA 工具在大客户中的增购与 FlexEDA 信用点消耗。'},
        {title: 'Design IP 聚焦高壁垒互连恢复增长', tag: 'Q3 $473.8M', desc: '剥离处理器 IP 后，持续跟踪 UALink、PCIe 7.0、HBM 与 UCIe 接口 IP 订单。'},
        {title: '并购债务去杠杆与自由现金流', tag: '~$2.6B FCF', desc: '跟踪每年约 $26 亿美元自由现金流对约 $100 亿美元并购债务的偿还进度。'},
        {title: '晶圆厂先进节点认证与合规韧性', tag: '2nm / CFET', desc: '评估地缘出口管制影响以及 TSMC/Samsung/Intel 2nm 与 CFET 推进节奏。'}
      ];
      var done = state.checks.filter(Boolean).length;
      var pct = Math.round((done / items.length) * 100);
      var chip = document.getElementById('checklistScoreChip');
      if (chip) chip.textContent = (isEn ? 'Verified ' : '已核查 ') + done + ' / ' + items.length + ' (' + pct + '%)';
      var bar = document.getElementById('checklistProgressBar');
      if (bar) bar.style.width = pct + '%';
      var cont = document.getElementById('checklistContainer');
      if (cont) {
        cont.innerHTML = items.map(function (it, idx) {
          var ck = !!state.checks[idx];
          return '<label class="check-card ' + (ck ? 'checked' : '') + '">' +
            '<input type="checkbox" data-check-input="' + idx + '" ' + (ck ? 'checked' : '') + ' />' +
            '<div style="flex:1;">' +
              '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
                '<span class="check-title">' + esc(it.title) + '</span>' +
                '<span class="mui-chip mono">' + esc(it.tag) + '</span>' +
              '</div>' +
              '<p class="check-desc">' + esc(it.desc) + '</p>' +
            '</div>' +
          '</label>';
        }).join('');
      }
    }

    function renderMonograph() {
 try { history.replaceState(null, '', '#ip=' + encodeURIComponent(state.activeId)); } catch (error) {}

      var p = getActivePillar();
      var isEn = state.lang === 'en';
      var root = document.getElementById('ipSectionsHost');
      if (!root) return;

      var chipCls = ['mui-chip-primary', 'mui-chip-success', 'mui-chip-warning', 'mui-chip-violet'];
      var iconSvgs = [
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
      ];
      var iconStyles = [
        '',
        'style="color: var(--mui-success-text); background: var(--mui-success-bg); border-color: var(--mui-success-border);"',
        'style="color: var(--mui-warning-text); background: var(--mui-warning-bg); border-color: var(--mui-warning-border);"'
      ];

      var featHtml = p.highlights.map(function (h, i) {
        return '<div class="feature-card">' +
          '<div class="mui-avatar-icon" ' + iconStyles[i % 3] + '>' + iconSvgs[i % 3] + '</div>' +
          '<h3>' + esc(isEn ? h.titleEn : h.titleZh) + '</h3>' +
          '<p>' + esc(isEn ? h.descEn : h.descZh) + '</p>' +
        '</div>';
      }).join('');

      var kpisHtml = p.kpis.map(function (k, i) {
        return '<div class="mui-paper mui-card-interactive kpi-card">' +
          '<div class="kpi-top">' +
            '<span class="kpi-label">' + esc(isEn ? k.lblEn : k.lblZh) + '</span>' +
            '<span class="mui-chip ' + chipCls[i % 4] + ' mono">' + esc(isEn ? k.badgeEn : k.badgeZh) + '</span>' +
          '</div>' +
          '<div class="kpi-value mono">' + esc(k.val) + '</div>' +
          '<p class="kpi-desc">' + esc(isEn ? k.noteEn : k.noteZh) + '</p>' +
        '</div>';
      }).join('');

      var archNodesHtml = p.products.slice(0, 6).map(function (prod) {
        return '<div class="arch-node">' +
          '<div class="arch-node-tag mono">' + esc(isEn ? prod.roleEn : prod.roleZh) + '</div>' +
          '<div class="arch-node-name">' + esc(prod.name) + '</div>' +
          '<div class="arch-node-desc">' + esc(isEn ? prod.specEn : prod.specZh) + '</div>' +
        '</div>';
      }).join('');

      var wfHtml = p.workflows.map(function (w, idx) {
        var dotBg = idx === 1 ? 'background:#3399FF;' : (idx === 2 ? 'background:#22C55E;' : (idx === 3 ? 'background:#A78BFA;' : ''));
        return '<div class="timeline-step">' +
          '<span class="timeline-dot" style="' + dotBg + '"></span>' +
          '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;margin-bottom:6px;">' +
            '<strong style="font-size:0.95rem;">' + esc(isEn ? w.titleEn : w.titleZh) + '</strong>' +
            '<span class="mui-chip mono">' + esc(isEn ? w.tagEn : w.tagZh) + '</span>' +
          '</div>' +
          '<p style="font-size:0.84rem;color:var(--text-secondary);">' + esc(isEn ? w.descEn : w.descZh) + '</p>' +
        '</div>';
      }).join('');

      var srcHtml = p.sources.map(function (s, idx) {
        var nStr = (idx + 1) < 10 ? ('0' + (idx + 1)) : String(idx + 1);
        return '<li><span class="mono">[' + nStr + ']</span>' +
          '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title) + ' ↗</a></li>';
      }).join('');

      root.innerHTML =
        '<section id="sec-00" class="mui-paper hero-card section-block">' +
          '<div class="status-strip">' +
            '<span class="mui-chip mui-chip-primary">' + esc(isEn ? p.badgeEn : p.badgeZh) + '</span>' +
            '<span class="mui-chip">' + esc(isEn ? p.metaEn : p.metaZh) + '</span>' +
            '<span class="mui-chip mui-chip-success mono">NASDAQ: SNPS · ' + esc(p.num) + '/10</span>' +
          '</div>' +
          '<div class="hero-overline mono"><span>CORE THESIS · ' + esc(isEn ? p.catEn : p.catZh) + ' · SILICON TO SYSTEMS</span></div>' +
          '<h1 class="hero-h1">' + esc(p.num + ' · ' + (isEn ? p.titleEn : p.titleZh)) + '：<span class="gradient-accent">' + esc(isEn ? 'Architecture, Portfolio & Competitive Moat' : '技术架构、全系矩阵与商业护城河') + '</span></h1>' +
          '<p class="lead-prose">' + (isEn ? p.thesisEn : p.thesisZh) + '</p>' +
          '<div class="grid-3" style="margin-bottom: 18px;">' + featHtml + '</div>' +
          '<div class="grid-4">' + kpisHtml + '</div>' +
        '</section>' +

        '<section id="sec-01" class="mui-paper section-block">' +
          '<div class="sec-header">' +
            '<div>' +
              '<div class="sec-eyebrow mono">CHAPTER 01 · ARCHITECTURE BLUEPRINT &amp; CORE CAPABILITIES</div>' +
              '<h2 class="sec-h2">' + (isEn ? '1. Portfolio Architecture Blueprint &amp; Key Highlights' : '一、产品架构蓝图与核心技术能力拆解') + '</h2>' +
              '<p class="sec-sub">' + esc(isEn ? p.subEn : p.subZh) + '</p>' +
            '</div>' +
            '<span class="mui-chip mui-chip-primary mono">' + esc(p.mono) + ' · ' + p.products.length + (isEn ? ' Core Tools' : ' 款核心工具/服务') + '</span>' +
          '</div>' +
          '<div class="arch-blueprint">' +
            '<div class="arch-hub">' +
              '<div class="arch-hub-title">' + esc(isEn ? p.titleEn : p.titleZh) + '</div>' +
              '<div class="arch-hub-sub">' + esc(isEn ? p.metaEn : p.metaZh) + '</div>' +
            '</div>' +
            '<div class="arch-nodes">' + archNodesHtml + '</div>' +
            '<div class="arch-platform-bar">' +
              '<div class="arch-platform"><strong>' + (isEn ? 'Silicon-to-Systems Integration' : 'Silicon-to-Systems 全栈打通') + '</strong><span>' + (isEn ? 'Unified data backbone linking EDA, Silicon IP, and Ansys Multiphysics.' : '统一数据底座无缝打通 EDA 实现、Silicon IP 与 Ansys 多物理场仿真。') + '</span></div>' +
              '<div class="arch-platform"><strong>' + (isEn ? 'FY2026 Financial Scale' : 'FY2026 集团级规模背书') + '</strong><span>' + (isEn ? '$9.69B–$9.74B target revenue · ~41.5% Non-GAAP operating margin.' : 'FY26E 目标总营收 $9.69B–$9.74B · Non-GAAP 营业利润率 ~41.5%。') + '</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="mui-alert"><span class="mui-chip mui-chip-primary mono">' + (isEn ? 'VERIFIED' : '机制核验') + '</span><div><strong>' + (isEn ? '2025–2026 Portfolio Evolution: ' : '2025–2026 战略演进：') + '</strong>' + esc(isEn ? p.evoEn : p.evoZh) + '</div></div>' +
        '</section>' +

        '<section id="sec-02" class="mui-paper section-block">' +
          '<div class="sec-header">' +
            '<div>' +
              '<div class="sec-eyebrow mono">CHAPTER 02 · FINANCIAL SCALE &amp; CAPABILITY BENCHMARKS</div>' +
              '<h2 class="sec-h2">' + (isEn ? '2. Group Financials &amp; Pillar Capability Visualization' : '二、集团财务跃升规模与本板块能力基准可视化') + '</h2>' +
              '<p class="sec-sub">' + (isEn ? 'Hover bars to inspect verified FY25–FY26E revenue &amp; pillar benchmarks' : '悬停柱状图可查看 FY2025–FY2026E 官方营收及本板块量化指标详情') + '</p>' +
            '</div>' +
            '<span class="mui-chip mui-chip-success mono">FY26E +37% YoY</span>' +
          '</div>' +
          '<div class="chart-card" style="margin-bottom: 18px;"><div class="svg-chart-box">' + buildGroupRevenueSvg(isEn) + '</div></div>' +
          '<div class="chart-card"><div class="svg-chart-box">' + buildPillarBenchSvg(p, isEn) + '</div></div>' +
        '</section>' +

        '<section id="sec-03" class="mui-paper section-block">' +
          '<div class="sec-header">' +
            '<div>' +
              '<div class="sec-eyebrow mono">CHAPTER 03 · PRODUCTS &amp; SERVICES MATRIX</div>' +
              '<h2 class="sec-h2">' + (isEn ? '3. Complete Products &amp; Services Matrix' : '三、全系产品与服务细节横向拆解矩阵') + '</h2>' +
              '<p class="sec-sub">' + (isEn ? 'Filter in real time by product name, capability, or role' : '支持按产品名称、技术特性或应用定位实时检索过滤') + '</p>' +
            '</div>' +
            '<span id="peerCountBadge" class="mui-chip mui-chip-primary mono"></span>' +
          '</div>' +
          '<div class="datagrid-toolbar">' +
            '<input type="search" id="peerSearchInput" class="mui-input-outlined" placeholder="' + (isEn ? 'Filter products, specs or roles…' : '搜索产品名称、工艺特性或技术指标…') + '" value="' + esc(state.productQuery) + '" aria-label="过滤产品矩阵" />' +
          '</div>' +
          '<div class="table-wrap"><table class="mui-table">' +
            '<thead><tr>' +
              '<th>' + (isEn ? 'Product / Service' : '产品 / 服务名称') + '</th>' +
              '<th>' + (isEn ? 'Key Specs / Craft' : '关键特性与制程') + '</th>' +
              '<th>' + (isEn ? 'Core Capabilities' : '核心技术能力') + '</th>' +
              '<th>' + (isEn ? 'Strategic Takeaway' : '战略定位与价值') + '</th>' +
              '<th>' + (isEn ? 'Source' : '官方链接') + '</th>' +
            '</tr></thead>' +
            '<tbody id="peerTableBody">' + renderProductTableRows(p, isEn) + '</tbody>' +
          '</table></div>' +
        '</section>' +

        '<section id="sec-04" class="mui-paper section-block">' +
          '<div class="sec-header">' +
            '<div>' +
              '<div class="sec-eyebrow mono">CHAPTER 04 · COMPETITIVE MOAT &amp; WATCHPOINTS</div>' +
              '<h2 class="sec-h2">' + (isEn ? '4. Competitive Landscape &amp; Risk Lens' : '四、竞争格局对比与客观风险张力') + '</h2>' +
              '<p class="sec-sub">' + (isEn ? 'Positioning vs. Cadence, Siemens EDA, Arm, and CAE peers' : '对比 Cadence、Siemens EDA、Arm 与 CAE 同行的护城河与潜在挑战') + '</p>' +
            '</div>' +
            '<span class="mui-chip mui-chip-warning mono">MOAT &amp; RISK LENS</span>' +
          '</div>' +
          '<div class="grid-2">' +
            '<div class="mui-alert mui-alert-success" style="flex-direction:column; gap:8px;">' +
              '<div style="display:flex;align-items:center;gap:8px;"><span class="mui-chip mui-chip-success mono">COMPETITIVE MOAT</span><strong>' + (isEn ? 'Competitive Positioning &amp; Edge' : '竞争格局与核心护城河') + '</strong></div>' +
              '<p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.68;">' + esc(isEn ? p.compEn : p.compZh) + '</p>' +
            '</div>' +
            '<div class="mui-alert mui-alert-warning" style="flex-direction:column; gap:8px;">' +
              '<div style="display:flex;align-items:center;gap:8px;"><span class="mui-chip mui-chip-warning mono">WATCHPOINTS</span><strong>' + (isEn ? 'Key Risks &amp; Execution Watchpoints' : '客观风险与跟踪要点') + '</strong></div>' +
              '<p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.68;">' + esc(isEn ? p.riskEn : p.riskZh) + '</p>' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<section id="sec-05" class="mui-paper section-block">' +
          '<div class="sec-header">' +
            '<div>' +
              '<div class="sec-eyebrow mono">CHAPTER 05 · END-TO-END WORKFLOWS</div>' +
              '<h2 class="sec-h2">' + (isEn ? '5. End-to-End Engineering Workflow' : '五、端到端工程工作流与场景落地') + '</h2>' +
              '<p class="sec-sub">' + (isEn ? 'Four-stage silicon-to-systems execution pipeline' : '从架构探索、实现验证到签核交付的四阶段工程闭环') + '</p>' +
            '</div>' +
            '<span class="mui-chip mui-chip-primary mono">4-STAGE PIPELINE</span>' +
          '</div>' +
          '<div class="mui-timeline">' + wfHtml + '</div>' +
        '</section>' +

        '<section id="sec-06" class="mui-paper section-block">' +
          '<div class="sec-header">' +
            '<div>' +
              '<div class="sec-eyebrow mono">CHAPTER 06 · INTERACTIVE STRATEGY CHECKLIST</div>' +
              '<h2 class="sec-h2">' + (isEn ? '6. Synopsys 2026 Strategic Verification Checklist' : '六、新思科技 2026 战略执行与护城河核查清单') + '</h2>' +
              '<p class="sec-sub">' + (isEn ? 'Track Ansys synergy, AI monetization, and IP recovery' : '用于跟踪检验 Ansys 并购协同、Agentic AI 商业化与 IP 增长韧性') + '</p>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
              '<span id="checklistScoreChip" class="mui-chip mui-chip-primary mono"></span>' +
              '<button type="button" id="checkAllBtn" class="mui-btn">' + (isEn ? 'Check All' : '全部勾选') + '</button>' +
              '<button type="button" id="resetCheckBtn" class="mui-btn">' + (isEn ? 'Reset' : '重置清单') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="progress-track"><div id="checklistProgressBar" class="progress-fill"></div></div>' +
          '<div id="checklistContainer" class="checklist-grid"></div>' +
        '</section>' +

        '<footer id="sec-07" class="mui-paper section-block" style="padding: 22px 26px;">' +
          '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px;">' +
            '<strong style="font-size:0.92rem;">' + (isEn ? 'Primary Official Filings &amp; Product Sources Index' : '权威数据来源与官方产品/财报核验索引（Synopsys · SEC 8-K/10-Q · Ansys）') + '</strong>' +
            '<span class="mui-chip mono">MUI High-Clarity Architecture · Offline Ready</span>' +
          '</div>' +
          '<p style="font-size:0.8rem;color:var(--text-muted);line-height:1.6;">' + (isEn ? 'All product capabilities, M&A milestones, and FY2025–FY2026 financial targets are grounded in Synopsys official documentation and SEC filings.' : '本报告所有产品线规格、Ansys 并购与业务剥离动态、FY2025–FY2026E 财务指标均核验自 Synopsys 官方网站、投资者关系公告及 SEC 财报文件。') + '</p>' +
          '<ul class="sources-list">' + srcHtml + '</ul>' +
        '</footer>';

      renderChecklist(isEn);
      bindChartTooltips();
    }

    function bindChartTooltips() {
      var tip = document.getElementById('chartTooltip');
      if (!tip) return;
      document.querySelectorAll('.chart-bar').forEach(function (bar) {
        bar.addEventListener('mouseenter', function (e) {
          var text = bar.getAttribute('data-tip');
          if (!text) return;
          tip.textContent = text;
          tip.style.display = 'block';
          tip.style.left = (e.clientX + 14) + 'px';
          tip.style.top = Math.max(12, e.clientY - 24) + 'px';
        });
        bar.addEventListener('mousemove', function (e) {
          tip.style.left = (e.clientX + 14) + 'px';
          tip.style.top = Math.max(12, e.clientY - 24) + 'px';
        });
        bar.addEventListener('mouseleave', function () {
          tip.style.display = 'none';
        });
      });
    }

    function selectPillar(id) {
      state.activeId = id;
      state.productQuery = '';
      renderPillarControls();
      renderMonograph();
      if (window.scrollY > 360) window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setCategory(cat) {
      state.activeCat = cat;
      var filtered = getFilteredPillars();
      var exists = filtered.some(function (item) { return item.id === state.activeId; });
      if (!exists && filtered.length) state.activeId = filtered[0].id;
      renderPillarControls();
      renderMonograph();
    }

    function cyclePillar(delta) {
      var list = getFilteredPillars();
      if (!list.length) return;
      var idx = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === state.activeId) { idx = i; break; }
      }
      var nextIdx = (idx + delta + list.length) % list.length;
      selectPillar(list[nextIdx].id);
    }

    function exportActiveStandaloneHtml() {
      var p = getActivePillar();
      var cloneRoot = document.documentElement.cloneNode(true);
      var banner = cloneRoot.querySelector('#ipHubSwitcher');
      if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
      var tip = cloneRoot.querySelector('#chartTooltip');
      if (tip) tip.style.display = 'none';
      var snack = cloneRoot.querySelector('#muiSnackbar');
      if (snack) snack.classList.remove('show');
      var titleEl = cloneRoot.querySelector('title');
      if (titleEl) titleEl.textContent = p.num + ' · ' + (state.lang === 'en' ? p.titleEn : p.titleZh);
      var htmlContent = '<!DOCTYPE html>\n' + cloneRoot.outerHTML;
      var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'synopsys_' + p.num + '_' + p.id + '.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      showToast(state.lang === 'en' ? 'Exported standalone HTML: ' + p.id : '已导出单页 HTML：' + p.titleZh);
    }

    function initEvents() {
      document.addEventListener('click', function (e) {
        var pill = e.target.closest('[data-switch-ip]');
        if (pill) {
          e.preventDefault();
          selectPillar(pill.getAttribute('data-switch-ip'));
          return;
        }
        var catBtn = e.target.closest('[data-cat-filter]');
        if (catBtn) {
          setCategory(catBtn.getAttribute('data-cat-filter'));
          return;
        }
        if (e.target.closest('#checkAllBtn')) {
          state.checks = [true, true, true, true, true, true];
          renderChecklist(state.lang === 'en');
          return;
        }
        if (e.target.closest('#resetCheckBtn')) {
          state.checks = [true, true, true, true, false, false];
          renderChecklist(state.lang === 'en');
          return;
        }
      });

      document.addEventListener('input', function (e) {
        if (e.target && e.target.id === 'peerSearchInput') {
          state.productQuery = e.target.value;
          var tbody = document.getElementById('peerTableBody');
          if (tbody) tbody.innerHTML = renderProductTableRows(getActivePillar(), state.lang === 'en');
        }
      });

      document.addEventListener('change', function (e) {
        var chk = e.target.closest ? e.target.closest('[data-check-input]') : null;
        if (chk) {
          var idx = parseInt(chk.getAttribute('data-check-input'), 10);
          state.checks[idx] = !!chk.checked;
          renderChecklist(state.lang === 'en');
        }
      });

      ['prevIpBtn', 'coHubPrevBtn'].forEach(function (id) {
        var b = document.getElementById(id);
        if (b) b.addEventListener('click', function () { cyclePillar(-1); });
      });
      ['nextIpBtn', 'coHubNextBtn'].forEach(function (id) {
        var b = document.getElementById(id);
        if (b) b.addEventListener('click', function () { cyclePillar(1); });
      });
      ['hubExportSingleBtn', 'sideExportBtn'].forEach(function (id) {
        var b = document.getElementById(id);
        if (b) b.addEventListener('click', exportActiveStandaloneHtml);
      });
      var printBtn = document.getElementById('sidePrintBtn');
      if (printBtn) void 0;

      function setTheme(nextTheme) {
        state.theme = nextTheme;
        document.documentElement.setAttribute('data-theme', state.theme);
        try { window.localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (err) {}
        applyStaticI18n();
        showToast(state.theme === 'dark' ? '已切换至 MUI 深海黑曜石护眼模式' : '已切换至 MUI 高清明亮浅色模式');
      }

      var themeBtn = document.getElementById('appbarThemeBtn');
      if (themeBtn) themeBtn.addEventListener('click', function () { setTheme(state.theme === 'dark' ? 'light' : 'dark'); });
      var sLight = document.getElementById('sideThemeLightBtn');
      if (sLight) void 0;
      var sDark = document.getElementById('sideThemeDarkBtn');
      if (sDark) void 0;

      var densBtn = document.getElementById('appbarDensityBtn');
      if (densBtn) {
        void 0;
      }

      [document.getElementById('langZhBtn'), document.getElementById('langEnBtn')].forEach(function (b) {
        if (!b) return;
        b.addEventListener('click', function () {
          state.lang = b.getAttribute('data-lang') || 'zh';
          document.documentElement.setAttribute('data-lang', state.lang);
          document.documentElement.setAttribute('lang', state.lang === 'en' ? 'en' : 'zh-CN');
          try { window.localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (err) {}
          applyStaticI18n();
          renderPillarControls();
          renderMonograph();
        });
      });

      var sidebarBtn = document.getElementById('sidebarToggleBtn');
      if (sidebarBtn) {
        sidebarBtn.addEventListener('click', function () {
          if (window.innerWidth < 1024) {
            document.body.classList.toggle('drawer-open');
          } else {
            var next = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
            if (next) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
            else document.documentElement.removeAttribute('data-sidebar-collapsed');
            try { window.localStorage.setItem(STORAGE_SIDEBAR_KEY, next ? '1' : '0'); } catch (err) {}
          }
        });
      }
      var backdrop = document.getElementById('drawerBackdrop');
      if (backdrop) backdrop.addEventListener('click', function () { document.body.classList.remove('drawer-open'); });

      var searchInput = document.getElementById('quickJumpInput');
      var popover = document.getElementById('quickJumpPopover');
      if (searchInput && popover) {
        searchInput.addEventListener('input', function () {
          var q = searchInput.value.trim().toLowerCase();
          if (!q) { popover.classList.remove('open'); popover.innerHTML = ''; return; }
          var matches = PILLARS.filter(function (p) {
            var text = (p.titleZh + ' ' + p.titleEn + ' ' + p.metaZh + ' ' + p.products.map(function (x) { return x.name; }).join(' ')).toLowerCase();
            return text.indexOf(q) !== -1;
          });
          if (!matches.length) {
            popover.innerHTML = '<div style="padding:10px 12px;font-size:0.82rem;color:var(--text-muted);">未找到匹配产品或板块</div>';
          } else {
            popover.innerHTML = matches.map(function (m) {
              return '<button type="button" class="quick-jump-item" data-jump-pillar="' + esc(m.id) + '">' +
                '<span class="quick-jump-item-title">' + esc(m.num + '. ' + (state.lang === 'en' ? m.titleEn : m.titleZh)) + '</span>' +
                '<span class="quick-jump-item-sub">' + esc(state.lang === 'en' ? m.metaEn : m.metaZh) + '</span>' +
              '</button>';
            }).join('');
          }
          popover.classList.add('open');
        });
        popover.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-jump-pillar]');
          if (!btn) return;
          selectPillar(btn.getAttribute('data-jump-pillar'));
          popover.classList.remove('open');
          searchInput.value = '';
        });
        document.addEventListener('click', function (e) {
          if (!e.target.closest('.quick-search-wrap')) popover.classList.remove('open');
        });
      }

      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          if (searchInput) searchInput.focus();
        } else if (document.activeElement !== searchInput) {
          if (e.key === '[') cyclePillar(-1);
          else if (e.key === ']') cyclePillar(1);
        }
      });

      window.addEventListener('scroll', function () {
        var bar = document.getElementById('readingProgressBar');
        if (!bar) return;
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docH > 0 ? Math.min(100, Math.max(0, (window.scrollY / docH) * 100)) : 0;
        bar.style.width = pct + '%';
      }, { passive: true });
    }

    applyStaticI18n();
    renderPillarControls();
    renderMonograph();
    initEvents();
  })();
  