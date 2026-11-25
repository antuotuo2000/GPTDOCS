
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_STRESS_KEY = 'rklb_bm_stress_v1';

    var state = {
      theme: 'dark',
      lang: 'zh',
      pView: 'waterfall',
      cView: 'backlog',
      kView: 'cash',
      activeLens: 0,
      activeNode: 0,
      activeCohort: 'constellation'
    };

    var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

    function isEn() { return state.lang === 'en'; }

    function showToast(msg) {
      var bar = document.getElementById('muiSnackbar');
      if (!bar) return;
      bar.textContent = msg;
      bar.classList.add('show');
      clearTimeout(bar._t);
      bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2400);
    }

    function getPalette() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        dark: dark,
        text: dark ? '#F3F6F9' : '#0F1924',
        sub: dark ? '#B2BAC2' : '#334155',
        tick: dark ? '#94A3B8' : '#475569',
        grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
        blue: dark ? '#3399FF' : '#0073E6',
        blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.16)',
        green: dark ? '#22C55E' : '#16A34A',
        amber: dark ? '#FFB74D' : '#D97706',
        violet: dark ? '#A78BFA' : '#7C3AED',
        red: dark ? '#FF6B6B' : '#DC2626'
      };
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
      var lBtn = document.getElementById('sideThemeLightBtn');
      var dBtn = document.getElementById('sideThemeDarkBtn');
      if (lBtn) lBtn.setAttribute('aria-pressed', String(state.theme === 'light'));
      if (dBtn) dBtn.setAttribute('aria-pressed', String(state.theme === 'dark'));
      drawAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Dark theme enabled' : '已切换至深色蓝图模式') : (isEn() ? 'Light theme enabled' : '已切换至 MUI 浅色模式'));
    }

    var HERO_LEAD_ZH = '资本市场早年常将 <strong>Rocket Lab (NASDAQ: RKLB)</strong> 简单归类为“小型火箭发射商”，但翻开其 2026 年三季报，这实质上是一台沿袭 SpaceX 终局路径、唯一在美股公开交易的<strong>“三级端到端太空复利机器”</strong>：第一级凭借全球商业发射频次第二的 <strong>Electron 与 HASTE 高超音速火箭</strong>（2026 年 11 月 14 日达成历史性第 100 次发射、连续 59 发成功，每 8 天下线一枚）垄断专车入轨信用入口，Q3 发射营收 <strong>$53.1M（分部毛利率 35.3%，发射积压订单暴涨至 $18.5亿 / 117 发）</strong> <a class="cite-link" href="https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-announces-third-quarter-2026-financial-results-posts" target="_blank" rel="noopener noreferrer">Q3 2026 财报 ↗</a>；第二级将发射信任顺势转化为整星制造与核心部组件垄断，推动 <strong>Space Systems（太空系统）</strong>在 Q3 贡献 <strong>$214.8M 营收（占总营收 80.2%，同比激增 +88.1%）</strong>，豪取美国太空发展局（SDA）逾 <strong>$13.3亿</strong> 星座主承包大单 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1819994/000181999426000012/rklb-02262026ex991.htm" target="_blank" rel="noopener noreferrer">FY25 年报公报 ↗</a>；第三级通过现金对价已全额募资到位的 <strong>~$80亿美元并购 Iridium（铱星通信）</strong>，一步跨入拥有 <strong>255万+ 订阅用户、66 颗在轨卫星、全球 L 波段频谱与 57% OEBITDA 利润率（$4.95亿/年）</strong>的太空通信经常性现金牛 <a class="cite-link" href="https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-acquire-iridium-historic-deal-creating-fully" target="_blank" rel="noopener noreferrer">Iridium 并购公报 ↗</a>。';
    var HERO_LEAD_EN = 'Wall Street once pigeonholed <strong>Rocket Lab (NASDAQ: RKLB)</strong> as a small-rocket launcher, yet its Q3 2026 filings reveal the only publicly traded <strong>3-Stage End-to-End Space Compounding Machine</strong> following SpaceX\'s full-stack playbook: Stage 1 monopolizes dedicated orbital &amp; hypersonic access via <strong>Electron &amp; HASTE</strong> (100th mission completed Nov 14, 2026 with 59 straight wins and 1 rocket built every 8 days), posting <strong>$53.1M Q3 launch revenue (35.3% GM; $1.85B / 117-launch backlog)</strong> <a class="cite-link" href="https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-announces-third-quarter-2026-financial-results-posts" target="_blank" rel="noopener noreferrer">Q3 2026 Release ↗</a>; Stage 2 converts flight heritage into spacecraft &amp; merchant subsystem dominance, driving <strong>Space Systems to $214.8M in Q3 (80.2% of revenue, +88.1% YoY)</strong> with <strong>&gt;$1.33B</strong> in SDA prime constellation awards <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1819994/000181999426000012/rklb-02262026ex991.htm" target="_blank" rel="noopener noreferrer">FY25 Filing ↗</a>; Stage 3 vaults into recurring orbital telecom services via the fully funded pending <strong>~$8.0B acquisition of Iridium</strong>, adding <strong>2.55M+ subscribers, 66 LEO satellites, global L-band spectrum, and $495M OEBITDA (57% margin)</strong> <a class="cite-link" href="https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-acquire-iridium-historic-deal-creating-fully" target="_blank" rel="noopener noreferrer">Iridium Deal ↗</a>.';

    var LENSES = [
      {
        zhF: '单任务全栈价值 = 专车发射费 ($7.8M–$70M) + 整星平台与载荷合同 ($25M–$45M/颗) + 在轨L波段通信订阅年金 (57% OEBITDA)',
        enF: 'Full-Stack Mission LTV = Launch ($7.8M–$70M) + Spacecraft Bus & Payload ($25M–$45M/sat) + L-Band Subscription Annuity (57% OEBITDA)',
        zhB: '纯火箭初创公司困于单次运费天花板与发射窗口波动（过去十年逾 60 家小型火箭商折戟），而 Rocket Lab 把火箭变成<strong>“零获客成本的信任漏斗”</strong>——先为全球逾 1,700 次太空任务供应太阳翼、反作用飞轮、分离环与激光终端，再以整星总包商身份承接百亿级国防星座。',
        enB: 'Pure-play small launchers hit single-ticket revenue ceilings (over 60 failed in the past decade), whereas Rocket Lab turns launch reliability into a <strong>zero-CAC trust funnel</strong>—supplying solar arrays, reaction wheels, separation rings, and laser terminals to 1,700+ missions before capturing billion-dollar prime satellite builds.'
      },
      {
        zhF: '综合毛利率跃迁 (FY21 -3.0% → 9M26 Non-GAAP 40.7%) = 发射频次摊薄固定台位成本 + 核心宇航器件自研内化三级供应商溢价',
        enF: 'Gross Margin Expansion (FY21 -3.0% → 9M26 Non-GAAP 40.7%) = 8-Day Rocket Cadence Absorption + In-House Subsystem Margin Capture',
        zhB: '传统军工集团依赖层层转包（Subcontractor Markup），不仅交期长达 5–7 年且毛利被分食；Rocket Lab 垂直并购 SolAero、GEOST、Mynaric 与 Motiv 后，<strong>自己造太阳翼、自己造红外载荷、自己造激光通信机并用自家火箭送上天</strong>，Q3 毛利率逆势超出指引上限逾 260bps。',
        enB: 'Legacy defense primes suffer from multi-tier subcontractor markups and 5–7 year delays; by vertically integrating SolAero, GEOST, Mynaric, and Motiv, Rocket Lab <strong>builds its own solar cells, IR sensors, and laser terminals</strong>—beating Q3 GAAP gross margin guidance by >260 bps.'
      },
      {
        zhF: '资本自循环飞轮 = $423.6M 客户里程碑预收款浮存金 + $4.70B 在手现金利息 ($45M/季指引) + Iridium 并表 $495M/年 OEBITDA',
        enF: 'Self-Funding Flywheel = $423.6M Customer Advance Float + $4.70B Cash Interest ($45M/qtr guide) + Iridium $495M Annual OEBITDA',
        zhB: '商业航天最怕研发期现金枯竭，而 Rocket Lab 一方面靠大型国防与星座合同的<strong>里程碑预付款（合同负债达 $4.24亿）</strong>在 Q3 实现正向经营现金流（+$7.2M），另一方面提前募足并购资金并计划并入 Iridium 高自由现金流订阅底座，彻底打通“以星养箭、以网养星”闭环。',
        enB: 'Aerospace challengers typically bleed cash during R&D, yet Rocket Lab pairs <strong>$423.6M in upfront customer contract liabilities</strong> (driving +$7.2M positive GAAP OCF in Q3) with $4.70B cash and Iridium\'s 30.7% FCF-margin subscriber base to self-fund next-generation constellations.'
      }
    ];

    var NODES = [
      {
        badge: 'NODE 01 · MERCHANT SPACECRAFT SUBSYSTEMS',
        zhT: '底层宇航部组件“卖铲人”：竞争对手每造一颗卫星，都在给 Rocket Lab 交过路费',
        enT: 'Merchant Subsystem Arsenal: Rivals Pay Rocket Lab Whenever They Build a Satellite',
        zhD: '通过精准并购整合 Sinclair（飞轮与星敏）、PSC（Lightband 星箭分离装置）、SolAero（全球稀缺空间级三结砷化镓太阳电池）、ASI（飞行软件）、Mynaric（激光通信终端）与 Motiv（空间机械臂），Rocket Lab 把行业最卡脖子的供应链瓶颈全部收归麾下。对外赚取高毛利部组件现货现金流，对内消除自身星座造星的三级供应商加价与交期延误。',
        enD: 'Through disciplined tuck-in acquisitions—Sinclair (wheels/star trackers), PSC (Lightband separation), SolAero (space-grade solar), ASI (MAX flight software), Mynaric (laser terminals), and Motiv (robotics)—Rocket Lab owns the industry\'s tightest bottlenecks, earning merchant margins externally while eliminating supplier markups internally.',
        zhF: '商业传导：掌控空间太阳能、激光终端与姿控飞轮 → Q3 产品类营收达 $197.5M（+89.8% YoY），直接推动毛利率超预期突破 38.4% (Non-GAAP)',
        enF: 'Value Flow: Owning space solar, laser comms & wheels → Q3 Product revenue hit $197.5M (+89.8% YoY), lifting Non-GAAP GM to 38.4%',
        kpis: [['1,700+', '搭载部件的全球航天任务', 'Global Missions Powered'], ['$26.0M', 'Mynaric 激光终端 Q3 营收', 'Mynaric Q3 Revenue'], ['$197.5M', 'Q3 产品类营收 (+89.8%)', 'Q3 Product Sales (+89.8%)'], ['40%–50%+', '成熟宇航部件稳态毛利带', 'Target Subsystem GM']]
      },
      {
        badge: 'NODE 02 · DEFENSE & COMMERCIAL SPACECRAFT PRIME',
        zhT: '整星平台与光电载荷主承包商：以固定总价与敏捷交付颠覆传统军工五巨头',
        enT: 'Spacecraft & EO/IR Payload Prime: Disrupting Legacy Primes on Speed & Cost',
        zhD: '依托模块化 Photon、Lightning 与可堆叠 Flatellite 卫星母平台，叠加 GEOST 与 Optical Support 的天基光电/红外导弹预警载荷，Rocket Lab 已跃升为美国太空军与太空发展局（SDA）核心一类主承包商（Prime Contractor）。目前长滩等超级工厂内同时在研在造卫星超过 55 颗。',
        enD: 'Combining modular Photon, Lightning, and stackable Flatellite buses with GEOST electro-optical/IR missile-warning payloads, Rocket Lab now wins Tier-1 Pentagon prime contracts historically reserved for legacy defense giants, with 55+ spacecraft simultaneously in build.',
        zhF: '商业传导：SDA Tranche 2 ($515M) + Tranche 3 ($816M) + 太空军 SB-AMTI ($397M) → 太空系统 Backlog 膨胀至 $17.2亿',
        enF: 'Value Flow: SDA Tranche 2 ($515M) + Tranche 3 ($816M) + USSF SB-AMTI ($397M) → Space Systems backlog surged to $1.72B',
        kpis: [['$214.8M', 'Q3 太空系统营收 (+88.1%)', 'Q3 Space Systems (+88.1%)'], ['$816M', 'SDA Tranche 3 单笔最大合同', 'SDA Tranche 3 Prime Award'], ['55+ 颗', '在研在造整星产线规模', 'Spacecraft Currently in Build'], ['42%', '9M26 最大美政府客户占比', '9M26 Top US Gov Share']]
      },
      {
        badge: 'NODE 03 · ELECTRON & HASTE CADENCE MONOPOLY',
        zhT: 'Electron 与 HASTE 高超音速专车：每 8 天造一枚火箭的商业入轨霸主',
        enT: 'Electron & HASTE Cadence Monopoly: 1 Rocket Built Every 8 Days',
        zhD: '在西方小型专车发射市场，Rocket Lab 已形成事实上的准垄断地位：新西兰 LC-1 与美国弗吉尼亚 LC-2 双发射场联动，2026 年 11 月突破 100 次发射里程碑；同时衍生出的 HASTE 亚轨道高超音速测试火箭切入美军 Golden Dome 与 MACH-TB 国防急需通道，于 2026 年 7 月斩获太空军 $2.66亿多发采购大单。',
        enD: 'Across LC-1 (Mahia, NZ) and LC-2 (Wallops, VA), Electron reached 100 launches in Nov 2026 as the West\'s undisputed small-launch leader, while its HASTE hypersonic testbed secured a $266M U.S. Space Force multi-launch contract supporting Golden Dome defense.',
        zhF: '商业传导：年产节拍提速 37.5%（8天/枚） → 单发直接成本降至 $5.0M，而 HASTE 特种任务溢价显著抬升单发毛利',
        enF: 'Value Flow: +37.5% build cadence (1 rocket/8 days) → Q3 cost/launch fell to $5.0M vs $7.8M–$10M+ ASP',
        kpis: [['100 次', 'Electron 累计入轨发射里程碑', 'Electron Launches (Nov 2026)'], ['59 连胜', '连续任务成功纪录', 'Consecutive Successful Flights'], ['$5.0M', 'Q3 单发平均制造成本', 'Q3 Avg Cost per Launch'], ['$266M', '太空军 HASTE 高超音速合同', 'USSF HASTE Contract']]
      },
      {
        badge: 'NODE 04 · NEUTRON MEDIUM-LIFT REUSABLE ROCKET',
        zhT: 'Neutron 中型可复用运载火箭：打开 13 吨级星座组网与国家安全主航道',
        enT: 'Neutron Reusable Medium-Lift Vehicle: Unlocking 13-Ton Constellation & NSSL Markets',
        zhD: '配备 9 台自研 Archimedes 富氧分级燃烧液氧甲烷发动机与独创连体“河马嘴（Hungry Hippo）”整流罩，Neutron 旨在打破猎鹰 9 号在中大型星座发射上的独家垄断。尽管因复合材料贮箱前顶盖工艺空隙将首飞审慎推至 2027 年，但在运力紧缺背景下基准票价已涨至 $70M/发，首飞前即锁定 16 次商业与军方任务。',
        enD: 'Powered by 9 Archimedes LOX/methane engines and a captive "Hungry Hippo" fairing, Neutron breaks the medium-lift bottleneck. Even with maiden flight prudently set for 2027 to replace a composite tank dome, tight global capacity lifted Neutron\'s base price to $70M across 16 booked missions.',
        zhF: '商业传导：Q3 单季连签 8 发星座合同（>$515M） → 推动发射分部总 Backlog 翻倍至创纪录的 $18.5亿（117 发）',
        enF: 'Value Flow: 8 new Q3 Neutron missions (>$515M) → Launch backlog nearly doubled QoQ to $1.85B (117 total missions)',
        kpis: [['13,000 kg', '近地轨道最大运载能力', 'LEO Payload Capacity'], ['16 发', '首飞前已签约任务储备', 'Pre-Debut Booked Missions'], ['$70M', '最新签约基准发射单价', 'Current Base Launch Price'], ['2027E', '弗吉尼亚 LC-3 首飞时间窗', 'Target Maiden Flight Window']]
      },
      {
        badge: 'NODE 05 · IRIDIUM L-BAND CONSTELLATION & SPACE APPS',
        zhT: '拟 $80亿并购 Iridium 通信星座：补齐“造箭—造星—频率运营”终极版图',
        enT: 'Pending $8.0B Iridium Acquisition: Completing the Launch-to-Connectivity Flywheel',
        zhD: '正如彼得·贝克所言，未来太空巨头必将掌控自有在轨基础设施与应用服务。并购 Iridium 不仅立即注入 66 颗在轨运行 LEO 卫星（外加 14 颗在轨备份星）、全球协调 L 波段稀缺频谱及 255万+ 航空/海事/国防高粘性订户，更让下一代手机直连（NTN Direct）星座得以用自家工厂造星、自家 Neutron 成本价换星。',
        enD: 'Acquiring Iridium adds 66 operational LEO cross-linked satellites (+14 spares), globally coordinated L-band spectrum, and 2.55M+ safety-critical subscribers—letting Rocket Lab build and launch next-gen D2D constellations internally at cost while harvesting 57% OEBITDA recurring cash flows.',
        zhF: '商业传导：Iridium 年营收 $9.03亿 (TTM) + $4.95亿 OEBITDA (57% 利润率) → 现金部分 $19.44亿已全额募足，预计 2027 年中并表',
        enF: 'Value Flow: Iridium $903M TTM rev + $495M OEBITDA (57% margin) → Cash leg fully funded via ATM, closing expected mid-2027',
        kpis: [['~$8.0B', 'Iridium 交易企业价值 (EV)', 'Transaction Enterprise Value'], ['2.55M+', '全球活跃计费订阅终端', 'Active Billable Subscribers'], ['57%', 'Iridium 2025 OEBITDA 利润率', 'Iridium OEBITDA Margin'], ['66+14 颗', '在轨运行与备份 LEO 卫星群', 'Active + Spare LEO Satellites']]
      }
    ];

    var COHORTS = {
      solo: {
        stats: [
          ['典型合同标的', '单发 Electron 专车或 HASTE 测试', 'Dedicated Electron / HASTE'],
          ['单发/单合同基准规模', '$7.8M – $10.1M', '$7.8M – $10.1M / Launch'],
          ['当前分部毛利率', '35.3% – 47.5%', '35.3% – 47.5% Segment GM'],
          ['5年单客复购 LTV', '$35M – $80M', '$35M – $80M (Multi-Flight)']
        ],
        zhN: '<strong>专车精准入轨溢价：</strong>iQPS、Synspective 等高分辨率 SAR 雷达卫星客户需要特定倾角与分钟级轨道相位部署，拼车火箭无法满足，因此愿意支付每公斤逾 $2.5万美元的专车溢价并连续签下 5–10 发一揽子合同。',
        enN: '<strong>Dedicated Orbital Precision Premium:</strong> Commercial SAR operators like iQPS and Synspective require exact orbital planes and rapid replacement windows that rideshares cannot serve, driving high repeat multi-launch contracts.'
      },
      constellation: {
        stats: [
          ['典型合同标的', 'Neutron 多发星座部署 + 分离机构', 'Neutron Multi-Launch + Subsystems'],
          ['单发/单合同基准规模', '$70M / 发', '$70M Base per Launch'],
          ['目标复飞稳态毛利率', '40% – 50%+', '40% – 50%+ Target Reuse GM'],
          ['5年单客全栈潜力 LTV', '$350M – $600M', '$350M – $600M Full-Stack LTV']
        ],
        zhN: '<strong>全栈搭售棘轮（One-Stop Orbital Ratchet）：</strong>随着 SpaceX 逐步将重心转向巨型 Starship，商业与国防星座运营商极度渴求<strong>第二家可靠中大型运载商</strong>；而一旦客户采用 Rocket Lab 的 Flatellite 卫星平台与激光终端，便能无缝适配 Neutron 整流罩锁死长期包船订单。',
        enN: '<strong>One-Stop Orbital Ratchet:</strong> As constellation operators seek non-Starlink medium-lift capacity, pairing Rocket Lab\'s stackable Flatellite bus and Mynaric laser terminals with Neutron locks multi-year fleet deployment into a single vendor.'
      },
      defense: {
        stats: [
          ['典型合同标的', 'SDA 18星主承包 / 太空军 Flatellite', 'SDA 18-Sat Prime / USSF SB-AMTI'],
          ['单笔主承包合同规模', '$397M – $816M', '$397M – $816M Prime Award'],
          ['合同现金流特征', '里程碑预收款驱动正 OCF', 'Milestone Advances Fund WIP'],
          ['5年国防单客户群 LTV', '$1.5B – $3.0B+', '$1.5B – $3.0B+ Multi-Tranche']
        ],
        zhN: '<strong>新国防主承包商护城河：</strong>一旦打入 SDA 增殖型作战太空架构（PWSA）Tranche 2 与 Tranche 3 供应链并获得 CMMC Level 2 满分安全认证，后续每两年一轮的星座迭代升级与在轨运维将形成极高转换壁垒的长期国防年金。',
        enN: '<strong>Disruptive Defense Prime Moat:</strong> Winning SDA Tranche 2 ($515M), Tranche 3 ($816M), and USSF SB-AMTI ($397M) embeds Rocket Lab\'s bus, Phoenix IR payload, and laser terminals into recurring 2-year Pentagon constellation Spiral upgrades.'
      }
    };

    function refreshDynamicPanels() {
      var ln = LENSES[state.activeLens] || LENSES[0];
      document.getElementById('lensFormula').textContent = isEn() ? ln.enF : ln.zhF;
      document.getElementById('lensBody').innerHTML = isEn() ? ln.enB : ln.zhB;

      var nd = NODES[state.activeNode] || NODES[0];
      document.getElementById('nodeBadge').textContent = nd.badge;
      document.getElementById('nodeTitle').textContent = isEn() ? nd.enT : nd.zhT;
      document.getElementById('nodeDesc').textContent = isEn() ? nd.enD : nd.zhD;
      document.getElementById('nodeFormula').textContent = isEn() ? nd.enF : nd.zhF;
      document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
        return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + (isEn() ? k[2] : k[1]) + '</span></div>';
      }).join('');

      var ch = COHORTS[state.activeCohort] || COHORTS.constellation;
      document.getElementById('cohortMetrics').innerHTML = ch.stats.map(function (s, idx) {
        var valTxt = isEn() ? s[2] : s[1];
        var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
        var mn = idx > 0 ? ' mono' : '';
        return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + mn + '"' + fz + '>' + valTxt + '</div><div class="delta">SEC / IR Verified</div></div>';
      }).join('');
      document.getElementById('cohortNote').innerHTML = isEn() ? ch.enN : ch.zhN;

      var leadEl = document.getElementById('heroLeadText');
      if (leadEl) leadEl.innerHTML = isEn() ? HERO_LEAD_EN : HERO_LEAD_ZH;
    }

    function applyLang(lang, silent) {
      state.lang = (lang === 'en') ? 'en' : 'zh';
      document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
      var zhB = document.getElementById('langZhBtn');
      var enB = document.getElementById('langEnBtn');
      if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
      if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
      var nodes = document.querySelectorAll('[data-i18n-zh]');
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].getAttribute('data-i18n-zh-raw') === '1' && state.lang === 'zh') continue;
        var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
        if (val !== null) {
          if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
          else nodes[i].textContent = val;
        }
      }
      refreshDynamicPanels();
      runSimulator();
      drawAllCharts();
      if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
    }

    // Event bindings for Lenses, Pipeline Nodes, Filters, Cohorts
    document.getElementById('lensTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-lens]');
      if (!b) return;
      state.activeLens = parseInt(b.getAttribute('data-lens'), 10) || 0;
      var all = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
      refreshDynamicPanels();
    });

    document.getElementById('pipelineTrack').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-node]');
      if (!btn) return;
      state.activeNode = parseInt(btn.getAttribute('data-node'), 10) || 0;
      var bs = this.querySelectorAll('.bm-node-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
      refreshDynamicPanels();
    });

    document.getElementById('tierFilter').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tcat]');
      if (!b) return;
      var cat = b.getAttribute('data-tcat');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var cards = document.querySelectorAll('#tierList [data-tier]');
      for (var j = 0; j < cards.length; j++) {
        cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
      }
    });

    document.getElementById('cohortTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cohort]');
      if (!b) return;
      state.activeCohort = b.getAttribute('data-cohort');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      refreshDynamicPanels();
    });

    document.getElementById('peerFilter').addEventListener('click', function (e) {
      var b = e.target.closest('[data-pcat]');
      if (!b) return;
      var cat = b.getAttribute('data-pcat');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var rows = document.querySelectorAll('#peerTable tbody tr');
      for (var j = 0; j < rows.length; j++) {
        var rc = rows[j].getAttribute('data-row-cat') || '';
        rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
      }
    });

    // Suite Subfolder Hub Filter & Click Handler
    var hub = document.getElementById('companySubfolderHub');
    if (hub) {
      hub.addEventListener('click', function (e) {
        var pill = e.target.closest('[data-co-cat]');
        if (pill) {
          var cat = pill.getAttribute('data-co-cat');
          var ps = hub.querySelectorAll('[data-co-cat]');
          for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === pill);
          var its = hub.querySelectorAll('[data-co-item-cat]');
          for (var j = 0; j < its.length; j++) {
            its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
          }
          return;
        }
        var item = e.target.closest('[data-suite-page]');
        if (item) {
          if (item.classList.contains('active')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            var targetName = item.getAttribute('data-suite-page');
            showToast(isEn() ? ('Companion file in suite: ' + targetName) : ('请在附件列表切换或同目录打开：' + targetName));
          }
        }
      });
    }

    // High-DPI Retina Canvas Engine
    function prepCanvas(id) {
      var c = document.getElementById(id);
      if (!c) return null;
      var rect = c.getBoundingClientRect();
      var w = Math.max(260, rect.width || 500);
      var h = Math.max(140, rect.height || 280);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      var ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      return { c: c, ctx: ctx, w: w, h: h };
    }

    function roundRect(ctx, x, y, w, h, r) {
      var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    }

    function drawProfitCanvas() {
      var env = prepCanvas('profitCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.profitCanvas = [];
      var pad = { top: 28, right: 20, bottom: 42, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.pView === 'waterfall') {
        var steps = [
          { lbl: isEn() ? 'Space Sys' : '太空系统', val: 540.9, base: 0, col: pal.blue, tip: '9M 2026 Space Systems 营收: $540.9M (占总营收 77.0%)' },
          { lbl: isEn() ? '+Launch' : '+发射服务', val: 161.3, base: 540.9, col: pal.green, tip: '9M 2026 Launch Services 营收: +$161.3M (18次发射)，合计总营收 $702.25M' },
          { lbl: isEn() ? 'Non-GAAP GP' : 'Non-GAAP毛利', val: 285.9, base: 0, col: pal.violet, tip: '9M 2026 Non-GAAP 毛利额: $285.88M (毛利率 40.7%；GAAP 毛利 $251.14M)' },
          { lbl: isEn() ? 'R&D Invest' : '研发投入', val: 261.3, base: 0, col: pal.amber, tip: '9M 2026 GAAP 研发投入: $261.33M (重点攻坚 Neutron 火箭与星座技术)' },
          { lbl: isEn() ? 'Cust. Float' : '合同预收款', val: 423.6, base: 0, col: pal.green, tip: 'Q3 期末资产负债表合同负债(客户预收款): $423.58M (+117% vs 年初)' },
          { lbl: isEn() ? 'FY26E Rev' : 'FY26E指引全貌', val: 982.2, base: 0, col: pal.blue, tip: '9M26 实际 ($702.2M) + Q4 指引中值 ($280M) = 隐含全年营收 ~$982.2M' }
        ];
        var maxV = 1080;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxV / 4) * g;
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + gv.toFixed(0) + 'M', pad.left - 8, gy + 4);
        }
        var slotW = pw / steps.length;
        var barW = Math.min(46, slotW * 0.56);
        steps.forEach(function (s, i) {
          var x = pad.left + i * slotW + (slotW - barW) / 2;
          var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
          var yBot = pad.top + ph - (s.base / maxV) * ph;
          var bh = Math.max(5, yBot - yTop);
          ctx.fillStyle = s.col;
          roundRect(ctx, x, yTop, barW, bh, 6);
          ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + s.val.toFixed(0) + 'M', x + barW / 2, yTop - 6);
          ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
          ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
          hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
        });
      } else {
        var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'TTM Q3\'26'];
        var gmGaap = [-3.0, 9.0, 21.0, 26.6, 34.4, 36.2];
        var opMargin = [-164.0, -64.1, -72.7, -43.5, -38.0, -27.6];
        var minM = -175, maxM = 55;
        for (var m = 0; m <= 4; m++) {
          var mv = minM + ((maxM - minM) / 4) * m;
          var my = pad.top + ph - (m / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
        }
        var zeroY = pad.top + ph - ((0 - minM) / (maxM - minM)) * ph;
        ctx.strokeStyle = pal.sub; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke();
        ctx.setLineDash([]);

        function plotLine(arr, col, name) {
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / (yrs.length - 1)) * pw;
            var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / (yrs.length - 1)) * pw;
            var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
            ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
            if (idx === 0 || idx === 4 || idx === 5) {
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
              ctx.fillText(v.toFixed(1) + '%', px, py - 9);
            }
            hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
          });
        }
        yrs.forEach(function (y, idx) {
          var px = pad.left + (idx / (yrs.length - 1)) * pw;
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(y, px, pad.top + ph + 20);
        });
        plotLine(gmGaap, pal.green, 'GAAP 毛利率 Gross Margin');
        plotLine(opMargin, pal.blue, 'GAAP 营业利润率 Operating Margin (亏损快速收敛)');
      }
    }

    function drawCohortCanvas() {
      var env = prepCanvas('cohortCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.cohortCanvas = [];
      var pad = { top: 28, right: 22, bottom: 42, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.cView === 'backlog') {
        var qs = ['Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026'];
        var lBk = [0.51, 0.48, 0.92, 0.94, 1.85];
        var sBk = [0.59, 1.37, 1.30, 1.42, 1.72];
        var maxB = 4.0;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxB / 4) * g;
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
        }
        var slot = pw / qs.length, bw = Math.min(48, slot * 0.56);
        qs.forEach(function (q, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var tot = lBk[i] + sBk[i];
          var hS = (sBk[i] / maxB) * ph;
          var hL = (lBk[i] / maxB) * ph;
          var yS = pad.top + ph - hS;
          var yL = yS - hL;
          ctx.fillStyle = pal.blue;
          roundRect(ctx, x, yS, bw, hS, 4); ctx.fill();
          ctx.fillStyle = pal.green;
          roundRect(ctx, x, yL, bw, hL, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + tot.toFixed(2) + 'B', x + bw / 2, yL - 6);
          ctx.fillStyle = pal.sub; ctx.font = '600 11px "IBM Plex Mono", monospace';
          ctx.fillText(q, x + bw / 2, pad.top + ph + 20);
          hitRegions.cohortCanvas.push({ x: x, y: yL, w: bw, h: hS + hL, title: q + ' 在手订单总计 $' + tot.toFixed(2) + 'B', body: '发射服务 Backlog: $' + lBk[i].toFixed(2) + 'B + 太空系统 Backlog: $' + sBk[i].toFixed(2) + 'B' });
        });
      } else {
        var yrs = ['2021', '2022', '2023', '2024', '2025', '2026 YTD(11.14)'];
        var flights = [6, 9, 10, 16, 21, 21];
        var maxF = 25;
        for (var k = 0; k <= 5; k++) {
          var kv = k * 5;
          var ky = pad.top + ph - (kv / maxF) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(kv + (isEn() ? '' : '发'), pad.left - 8, ky + 4);
        }
        var s2 = pw / yrs.length, bw2 = Math.min(42, s2 * 0.54);
        yrs.forEach(function (yr, idx) {
          var x = pad.left + idx * s2 + (s2 - bw2) / 2;
          var bh = (flights[idx] / maxF) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = idx >= 4 ? pal.violet : pal.blue;
          roundRect(ctx, x, yt, bw2, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(flights[idx] + (isEn() ? '' : '发'), x + bw2 / 2, yt - 6);
          ctx.fillStyle = pal.sub; ctx.font = '600 10.5px "IBM Plex Mono", monospace';
          ctx.fillText(yr, x + bw2 / 2, pad.top + ph + 20);
          hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw2, h: bh, title: yr + ' Electron/HASTE 发射频次', body: '年度完成发射 ' + flights[idx] + ' 次（截至 2026-11-14 累计达 100 次发射、连续 59 次成功）' });
        });
      }
    }

    function drawCapitalCanvas() {
      var env = prepCanvas('capitalCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.capitalCanvas = [];
      var pad = { top: 28, right: 20, bottom: 42, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.kView === 'cash') {
        var pts = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'Q3 2026'];
        var cashB = [0.69, 0.54, 0.32, 0.48, 1.10, 4.70];
        var maxC = 5.2;
        for (var g = 0; g <= 4; g++) {
          var cv = (maxC / 4) * g;
          var cy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, cy); ctx.lineTo(pad.left + pw, cy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + cv.toFixed(1) + 'B', pad.left - 8, cy + 4);
        }
        var slot = pw / pts.length, bw = Math.min(42, slot * 0.56);
        pts.forEach(function (p, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (cashB[i] / maxC) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + cashB[i].toFixed(2) + 'B', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
          ctx.fillText(p, x + bw / 2, pad.top + ph + 20);
          hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p + ' 现金及有价证券储备', body: '$' + cashB[i].toFixed(2) + 'B（Q3 2026 有息债务仅 $3.0M，Iridium 现金对价已全额募足）' });
        });
      } else {
        var items = [
          { name: 'Q3\'26 客户合同负债预收款', v: 423.6, max: 460, unit: '$423.6M', col: pal.green, tip: '截至 2026-09-30 合同负债达 $423.58M，无息支撑在研火箭与卫星制造' },
          { name: 'FY25 期末客户合同负债', v: 195.4, max: 460, unit: '$195.4M', col: pal.blue, tip: '截至 2025-12-31 合同负债为 $195.44M，9个月净增 +116.7%' },
          { name: '9M26 最大美政府客户营收贡献', v: 294.9, max: 460, unit: '$294.9M (42%)', col: pal.violet, tip: '单一最大美国政府客户占比由 FY24 11% → FY25 28% → 9M26 42%' },
          { name: 'Q4\'26 预计单季净利息收入', v: 45.0, max: 460, unit: '$45.0M/季', col: pal.amber, tip: '$4.70B 现金储备在交割前每季度创造约 $45M 净利息收益，大幅对冲研发开支' }
        ];
        var rowH = ph / items.length;
        items.forEach(function (it, idx) {
          var cy = pad.top + idx * rowH + rowH / 2;
          var bh = 22, barLen = (it.v / it.max) * (pw * 0.78);
          ctx.fillStyle = pal.grid;
          roundRect(ctx, pad.left, cy - 2, pw * 0.78, bh, 5); ctx.fill();
          ctx.fillStyle = it.col;
          roundRect(ctx, pad.left, cy - 2, barLen, bh, 5); ctx.fill();
          ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
          ctx.fillText(it.name, pad.left, cy - 8);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
          ctx.fillText(it.unit, pad.left + pw * 0.78 + 8, cy + 13);
          hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 18, w: pw, h: 42, title: it.name, body: it.tip });
        });
      }
    }

    // Interactive 5-Year Pro Forma Simulator
    var simData = { rev: [0.98, 2.25, 2.85, 3.60, 4.48, 5.51] };
    function drawSimMiniCanvas() {
      var env = prepCanvas('simMiniCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var pad = { top: 22, right: 18, bottom: 26, left: 46 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
      var arr = simData.rev;
      var maxR = Math.max(4.0, Math.ceil(Math.max.apply(null, arr) * 1.18));
      ctx.strokeStyle = pal.grid;
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
      ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
      arr.forEach(function (v, i) {
        var px = pad.left + (i / 5) * pw;
        var py = pad.top + ph - (v / maxR) * ph;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      arr.forEach(function (v, i) {
        var px = pad.left + (i / 5) * pw;
        var py = pad.top + ph - (v / maxR) * ph;
        ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + v.toFixed(2) + 'B', px, py - 8);
        ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
        ctx.fillText(yrs[i], px, pad.top + ph + 16);
      });
    }

    function runSimulator() {
      var gOrg = parseFloat(document.getElementById('inpOrgCagr').value) / 100;
      var neuF = parseInt(document.getElementById('inpNeuFlights').value, 10);
      var irdmOn = parseInt(document.getElementById('inpIrdmBoost').value, 10) >= 50;

      document.getElementById('lblOrgCagr').textContent = (gOrg * 100).toFixed(1) + '%';
      document.getElementById('lblNeuFlights').textContent = neuF + (isEn() ? ' flights/yr' : ' 发/年');
      document.getElementById('lblIrdmBoost').textContent = irdmOn ? (isEn() ? 'Included (+100%)' : '开启 (+100%)') : (isEn() ? 'Standalone (0%)' : '仅独立内生 (0%)');

      var base26 = 0.982; // Implied FY2026 midpoint $982.2M
      var revArr = [base26];
      var core = base26;
      for (var y = 1; y <= 5; y++) {
        core = core * (1 + gOrg);
        var neuRev = (neuF * (y / 5) * 0.070); // $70M per flight ramping to Y5
        var irdmRev = irdmOn ? (y === 1 ? 0.46 : 0.94 * Math.pow(1.07, y - 1)) : 0; // Mid-2027 close
        revArr.push(core + neuRev + irdmRev);
      }
      var fy31Rev = revArr[5];
      var core31 = core + (neuF * 0.070);
      var irdm31 = irdmOn ? (0.94 * Math.pow(1.07, 4)) : 0;
      var gm31 = ((core31 * 0.445 + irdm31 * 0.68) / fy31Rev) * 100;
      var ebitda31 = core31 * 0.275 + irdm31 * 0.58;
      var ebMargin = (ebitda31 / fy31Rev) * 100;

      document.getElementById('simRevOut').textContent = '$' + fy31Rev.toFixed(2) + 'B';
      document.getElementById('simGmOut').textContent = gm31.toFixed(1) + '%';
      document.getElementById('simEbitdaOut').textContent = '$' + ebitda31.toFixed(2) + 'B';
      document.getElementById('simMarginOut').textContent = ebMargin.toFixed(1) + '%';

      simData.rev = revArr;
      drawSimMiniCanvas();
    }

    ['inpOrgCagr', 'inpNeuFlights', 'inpIrdmBoost'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', runSimulator);
    });

    var PRESETS = {
      bear: { g: 18, n: 6, i: 0 },
      base: { g: 28, n: 14, i: 100 },
      bull: { g: 36, n: 22, i: 100 }
    };
    document.getElementById('simPresets').addEventListener('click', function (e) {
      var b = e.target.closest('[data-preset]');
      if (!b) return;
      var k = b.getAttribute('data-preset');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var pr = PRESETS[k] || PRESETS.base;
      document.getElementById('inpOrgCagr').value = pr.g;
      document.getElementById('inpNeuFlights').value = pr.n;
      document.getElementById('inpIrdmBoost').value = pr.i;
      runSimulator();
    });

    function bindChartTab(groupId, attr, stateKey, drawFn) {
      var g = document.getElementById(groupId);
      if (!g) return;
      g.addEventListener('click', function (e) {
        var b = e.target.closest('[' + attr + ']');
        if (!b) return;
        state[stateKey] = b.getAttribute(attr);
        var bs = g.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        drawFn();
      });
    }
    bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
    bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
    bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

    function bindHoverTooltip(canvasId) {
      var c = document.getElementById(canvasId);
      var tip = document.getElementById('chartTooltip');
      if (!c || !tip) return;
      c.addEventListener('mousemove', function (ev) {
        var r = c.getBoundingClientRect();
        var mx = ev.clientX - r.left, my = ev.clientY - r.top;
        var list = hitRegions[canvasId] || [];
        var hit = null;
        for (var i = 0; i < list.length; i++) {
          var rg = list[i];
          if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
        }
        if (hit) {
          tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
          tip.style.display = 'block';
          tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
          tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
        } else {
          tip.style.display = 'none';
        }
      });
      c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
    }
    ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

    function drawAllCharts() {
      drawProfitCanvas();
      drawCohortCanvas();
      drawCapitalCanvas();
      drawSimMiniCanvas();
    }

    // Quick Jump Search (⌘K)
    var QUICK_ITEMS = [
      { id: 'mod-deck', t: 'M0 双栏指挥舱与三阶公式', s: 'Q3 $267.8M (+72.7%) · Backlog $3.57B · 净现金 $4.70B' },
      { id: 'mod-pipeline', t: 'M1 五阶端到端价值链沙盘', s: '核心部组件 → 整星总包 → Electron/HASTE → Neutron → Iridium' },
      { id: 'mod-profit-pool', t: 'M2 损益瀑布流与太空系统四层塔', s: '9M26 40.7% Non-GAAP GM · SDA $1.33B+ 主承包拆解' },
      { id: 'mod-cohort', t: 'M3 全栈搭售棘轮与 Backlog 爆发曲线', s: 'Neutron 16发储备 ($70M/发) · 100次发射里程碑' },
      { id: 'mod-capital', t: 'M4 $4.24亿客户预收浮存金与并表推演器', s: 'Q3 OCF +$7.2M 转正 · 2031E Iridium 并表 EBITDA 模拟' },
      { id: 'mod-matrix', t: 'M5 全球商业航天对标矩阵与三大压测', s: 'RKLB vs SpaceX / Iridium / LUNR / Firefly / 洛克希德马丁' }
    ];
    var qInput = document.getElementById('quickJumpInput');
    var qPop = document.getElementById('quickJumpPopover');
    function renderQuick(q) {
      var kw = (q || '').trim().toLowerCase();
      var matched = QUICK_ITEMS.filter(function (it) {
        return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1;
      });
      qPop.innerHTML = matched.map(function (it) {
        return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
      }).join('');
      qPop.classList.toggle('open', matched.length > 0);
    }
    qInput.addEventListener('focus', function () { renderQuick(qInput.value); });
    qInput.addEventListener('input', function () { renderQuick(qInput.value); });
    qPop.addEventListener('click', function (e) {
      var jb = e.target.closest('[data-jump]');
      if (!jb) return;
      var el = document.querySelector(jb.getAttribute('data-jump'));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      qPop.classList.remove('open');
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        qInput.focus();
      } else if (e.key === 'Escape') {
        qPop.classList.remove('open');
        document.body.classList.remove('portal-detail-drawer');
      }
    });

    // Sidebar Toggle, Print & 1-Click HTML Download
    function triggerDownload() {
      var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = '火箭实验室_Rocket_Lab_商业模式解构.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
      showToast(isEn() ? 'Downloaded standalone HTML file' : '已开始下载独立网页文件');
    }
    document.getElementById('topDownloadBtn').addEventListener('click', triggerDownload);
    
    

    document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
      if (window.innerWidth < 1024) {
        document.body.classList.toggle('portal-detail-drawer');
      } else {
        var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
        if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
        else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
        setTimeout(drawAllCharts, 60);
      }
    });
    document.getElementById('portalDetailBackdrop').addEventListener('click', function () {
      document.body.classList.remove('portal-detail-drawer');
    });
    document.getElementById('tocList').addEventListener('click', function (e) {
      if (e.target.closest('.mui-nav-link')) document.body.classList.remove('portal-detail-drawer');
    });

    window.addEventListener('scroll', function () {
      var bar = document.getElementById('readingProgressBar');
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
    }, { passive: true });

    // Stress Audit Checkboxes
    try {
      var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
      document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
        var k = chk.getAttribute('data-stress-chk');
        chk.checked = !!savedChk[k];
        chk.addEventListener('change', function () {
          savedChk[k] = chk.checked;
          try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
          showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
        });
      });
    } catch (e) {}

    // Theme & Lang Init
    try {
      applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
    } catch (e) {}

    document.getElementById('appbarThemeBtn').addEventListener('click', function () {
      var nxt = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nxt, false);
      try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
    });
    
    document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
      var lb = e.target.closest('[data-lang]');
      if (!lb) return;
      var nl = lb.getAttribute('data-lang');
      applyLang(nl, false);
      try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAllCharts, 90);
    });

    runSimulator();
    drawAllCharts();
  })();
  