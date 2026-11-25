
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

    var state = { theme: 'dark', lang: 'zh', fView: 'bridge', sView: 'bom', mult: 15, activeHz: 0, activeEng: 0 };
    var hits = { futureCanvas: [], siliconCanvas: [] };

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
        violet: dark ? '#A78BFA' : '#7C3AED',
        green: dark ? '#22C55E' : '#16A34A',
        amber: dark ? '#FFB74D' : '#D97706',
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
      
      
      drawAll();
      if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
    }

    var HORIZONS = [
      {
        zhB: 'HORIZON 1 · 双重催化兑现期 (2026–2027)',
        enB: 'HORIZON 1 · DUAL CATALYST EXECUTION (2026–2027)',
        zhT: 'Neutron LC-3 首飞入轨 × Iridium 交割并表 × 年营收跨过 $20亿大关',
        enT: 'Neutron LC-3 Debut × Iridium Closing × Crossing $2B+ Pro Forma Sales',
        zhI: [
          '<strong>Neutron 2027 商业首秀：</strong>完成新复合材料前顶盖静压低温测试与 Archimedes 点火，解锁 $18.5亿发射积压订单变现。',
          '<strong>Iridium 2027 年中并表：</strong>一次性注入 ~$9亿+ 高毛利通信服务年收入与近 $5亿 OEBITDA，集团自由现金流由负转正。',
          '<strong>SDA 与 HASTE 密集交付：</strong>55+ 颗在造国防/商业卫星进入交付高峰，Electron/HASTE 迈向年发 28–32 次。'
        ],
        enI: [
          '<strong>Neutron 2027 Maiden Flight:</strong> Complete replacement dome cryo-qualification &amp; Archimedes hot-fire to unlock $1.85B launch backlog.',
          '<strong>Mid-2027 Iridium Close:</strong> Immediately adds ~$903M+ recurring telecom sales &amp; ~$495M OEBITDA, flipping group FCF positive.',
          '<strong>SDA &amp; HASTE Ramp:</strong> Deliveries across 55+ spacecraft in build while Electron/HASTE scales toward 28–32 flights/year.'
        ],
        zhP: '兑现确定性：高 (80%–85%)', enP: 'Certainty: High (80%–85%)',
        zhM: '备考年化营收池：$2.2B–$2.6B', enM: 'Pro Forma Run-Rate: $2.2B–$2.6B'
      },
      {
        zhB: 'HORIZON 2 · 规模复用与军方主承包放量期 (2028–2029)',
        enB: 'HORIZON 2 · REUSE CADENCE & DEFENSE PRIME (2028–2029)',
        zhT: 'Neutron 一子级常态回收 × NSSL 国家安全认证 × 下一代 Iridium D2D 组网',
        enT: 'Neutron Booster Reuse × NSSL Lane 1 Missions × Next-Gen Iridium D2D',
        zhI: [
          '<strong>Neutron 迈向年发 8–12 次：</strong>一子级海上平台回收复用摊薄单发成本，发射分部毛利率向 45%+ 跃升。',
          '<strong>自造自发下一代 Iridium 星座：</strong>利用 Flatellite 母平台与自家 Neutron 成本价部署增强型手机直连（NTN Direct）与天基 PNT 载荷。',
          '<strong>Golden Dome 天基拦截/预警续签：</strong>在 $151B SHIELD 框架下竞逐更大批次导弹跟踪与天基防御星座。'
        ],
        enI: [
          '<strong>Neutron 8–12 Flights/Yr:</strong> Booster recovery drives launch gross margin above 45% across 16+ backlog missions &amp; NSSL awards.',
          '<strong>Internal Iridium Next-Gen Refresh:</strong> Flatellite buses launched at cost on Neutron scale NTN Direct D2D &amp; resilient Alt-PNT.',
          '<strong>Golden Dome Multi-Tranche Expansion:</strong> Competing across MDA\'s $151B SHIELD vehicle with in-house EO/IR &amp; optical payloads.'
        ],
        zhP: '兑现确定性：中高 (70%–75%)', enP: 'Certainty: Medium-High (70%–75%)',
        zhM: '年化目标营收池：$3.6B–$4.5B', enM: 'Target Revenue Pool: $3.6B–$4.5B'
      },
      {
        zhB: 'HORIZON 3 · 轨道基础设施与太空算力奇点 (2030–2032)',
        enB: 'HORIZON 3 · ORBITAL INFRASTRUCTURE & AI COMPUTE (2030–2032)',
        zhT: '多星座在轨运营帝国 × 吉瓦级太空 AI 数据中心能源 × 深空商业干线',
        enT: 'Multi-Constellation Operator × Gigawatt Orbital AI Power × Mars Relay',
        zhI: [
          '<strong>经常性服务收入占比超 45%：</strong>天基物联网、全球航空海事安全通信、手机直连与政府加密频谱构成高粘性公用事业底座。',
          '<strong>太空数据中心能源卖铲人：</strong>千米级高功率硅基太阳翼为轨道 AI 推理集群提供全天候无大气衰减清洁电力。',
          '<strong>行星际常态化快线：</strong>复刻 ESCAPADE 模式，承接 NASA/盟国月球通信中继、火星采样返回与金星探测任务。'
        ],
        enI: [
          '<strong>&gt;45% Recurring Services Mix:</strong> Global L-band IoT, aviation/maritime safety, D2D, and defense PNT anchor utility-like cash flows.',
          '<strong>Gigawatt Orbital AI Power:</strong> Kilometer-scale space silicon solar arrays power orbital AI compute clusters beyond terrestrial grid limits.',
          '<strong>Interplanetary Commercial Express:</strong> Scaling ESCAPADE\'s low-cost blueprint to Lunar, Mars, and Venus science/relay fleets.'
        ],
        zhP: '兑现确定性：远期期权 (50%–60%)', enP: 'Certainty: Long-Term Option (50%–60%)',
        zhM: '远期年化营收池：$6.0B–$8.0B+', enM: '2032E Revenue Potential: $6.0B–$8.0B+'
      }
    ];

    var ENGINES = [
      {
        badge: 'ENGINE 01 · NEUTRON REUSABLE MEDIUM-LIFT VEHICLE',
        zhT: 'Neutron + Archimedes：承接全球非 Starlink 星座组网需求与 NSSL 国家安全发射',
        enT: 'Neutron + Archimedes: Capturing Global Non-Starlink Constellation & NSSL Demand',
        zhD: '全碳纤维复合材料箭体减轻结构死重、连体式“河马嘴（Hungry Hippo）”整流罩彻底省去海上打捞船队、9 台 Archimedes 富氧分级燃烧液氧甲烷发动机降低积碳维护工时——Neutron 从第一性原理专为高频复用而设计。在全球中型运载极度短缺的卖方市场中，Rocket Lab 在首飞前已把部分合同基准价提至 $70M/发，累计锁定 16 次发射任务（含 Q3 新签 5 家星座商 8 发超 $5.15亿合同及太空军 SB-AMTI 发射任务）。',
        enD: 'Carbon-composite structures, a captive "Hungry Hippo" fairing that eliminates fairing recovery vessels, and 9 Archimedes oxygen-rich staged-combustion LOX/methane engines make Neutron purpose-built for rapid reuse. Amid acute global launch scarcity, Rocket Lab raised base pricing to $70M/launch and booked 16 missions before maiden flight.',
        zhF: '变现双轮：(1) 外部商业/军方星座发射（$70M+/发，复飞稳态毛利 >45%） + (2) 内部零溢价发射自家 Flatellite 与下一代 Iridium 星座',
        enF: 'Monetization: (1) External constellation & NSSL launches ($70M+ ASP, >45% target reuse GM) + (2) At-cost internal constellation deployment',
        gauges: [['13,000 kg', 'LEO 近地轨道最大运力', 'Max LEO Payload'], ['$70M / 发', 'Q3 最新上调基准票价', 'Current Base Price'], ['16 发', '首飞前在手签约任务数', 'Booked Pre-Debut Flights'], ['LC-3 专属', '弗吉尼亚 Wallops 工位', 'Dedicated Wallops Pad']]
      },
      {
        badge: 'ENGINE 02 · IRIDIUM L-BAND CONSTELLATION & NTN DIRECT',
        zhT: '~$80亿并购 Iridium 卫星通信网：一步跨越星座冷启动死亡谷，切入手机直连与天基 PNT',
        enT: '~$8.0B Iridium Acquisition: Instant Global L-Band Spectrum, 2.55M+ Subs & NTN Direct',
        zhD: '2026 年 6 月签约、9 月获 Iridium 股东大会批准并完成全部现金对价募资的 Iridium 并购案，使 Rocket Lab 直接拥有全球唯一真正覆盖两极的 66 颗交联低轨卫星网（外加 14 颗在轨备份星）、稀缺 L 波段频谱及 500+ 行业生态伙伴。未来利用自家工厂与 Neutron 火箭升级部署 Iridium NTN Direct 标准手机直连与抗干扰替代 GPS（Alt-PNT）服务，将打开百亿美元级应急、国防与物联网增量空间。',
        enD: 'Approved by Iridium shareholders in Sep 2026 with cash fully financed via ATM, the deal delivers 66 cross-linked LEO satellites (+14 spares), globally coordinated L-band spectrum, and 2.55M+ active subscribers—setting the stage for low-cost internal deployment of Iridium NTN Direct D2D and assured Alt-PNT.',
        zhF: '现金流公式：Iridium 存量 $903M TTM 营收 (57% OEBITDA / 30.7% FCF率) + 自建自发省去数亿美元外部换星发射费',
        enF: 'Cash Formula: $903M TTM Iridium sales (57% OEBITDA / 30.7% FCF margin) + internal launch cost savings on next-gen constellation refresh',
        gauges: [['2.55M+', '全球活跃计费订阅用户', 'Active Subscribers'], ['$495M', 'Iridium 2025 OEBITDA (57%)', 'FY25 OEBITDA (57% Margin)'], ['66+14 颗', '在轨工作与备份 LEO 卫星', 'In-Orbit LEO Fleet'], ['2027年中', '预计完成监管审批交割', 'Expected Closing Window']]
      },
      {
        badge: 'ENGINE 03 · FLATELLITE & GOLDEN DOME DEFENSE PRIME',
        zhT: 'Flatellite 可堆叠卫星 × SDA/Golden Dome：重塑五角大楼天基导弹防御供应链',
        enT: 'Stackable Flatellite Bus & Golden Dome: Disrupting Pentagon Missile-Defense Primes',
        zhD: '针对大型星座“一箭多星”高密度堆叠发射需求，Rocket Lab 推出全新扁平模块化卫星平台 Flatellite，并于 2026 年 8 月即斩获美国太空军 $3.97亿 SB-AMTI（天基空中移动目标指示）研发制造与 Neutron 发射一体化大单。叠加 SDA Tranche 2/3 逾 $13.3亿合同、与雷神合作的太空拦截器项目及入围 $151B 上限的导弹防御局 SHIELD 计划，国防主承包飞轮已全面成型。',
        enD: 'Engineered for high-density fairing stacking, Flatellite won a $397M U.S. Space Force SB-AMTI build-and-launch award in Aug 2026. Combined with >$1.33B in SDA Tranche 2/3 awards, Raytheon Space-Based Interceptor work, and MDA\'s $151B SHIELD IDIQ, Rocket Lab is now a Tier-1 national-security prime.',
        zhF: '变现逻辑：平台标准化量产压低制造成本 + 自产 GEOST 红外传感器与 Mynaric 激光终端内化全额利润池',
        enF: 'Monetization: Standardized Flatellite/Lightning line + in-house GEOST IR & Mynaric optical payloads capture full prime margin',
        gauges: [['$1.33B+', 'SDA Tranche 2+3 累计授标', 'Total SDA Prime Awards'], ['$397M', '太空军 Flatellite 首单', 'USSF SB-AMTI Contract'], ['$151B', '入围 MDA SHIELD 竞标上限', 'MDA SHIELD IDIQ Ceiling'], ['CMMC L2', '110/110 满分国防安全合规', '110/110 Defense Cyber Score']]
      },
      {
        badge: 'ENGINE 04 · HASTE HYPERSONIC & GHOST RESPONSIVE LAUNCH',
        zhT: 'HASTE 高超音速测试火箭与 GHOST 机动发射：卡位大国博弈最紧迫的国防预算',
        enT: 'HASTE Hypersonic Testbed & GHOST Deployable Launch: High-Margin Defense Cadence',
        zhD: '美国国防部高超音速武器研发长期苦于缺乏高频、低成本真实大气层再入飞行测试平台。Rocket Lab 基于成熟 Electron 平台改造的 HASTE 亚轨道火箭完美填补空白，不仅在 2026 年 7 月拿下太空军 $2.66亿（12发+6发期权）大单，更推出可在阿拉斯加科迪亚克 LC-4 等前沿阵地快速部署的 GHOST 机动发射系统，并圆满执行太空军 VICTUS HAZE 快速响应太空演习。',
        enD: 'HASTE solves the Pentagon\'s acute shortage of affordable, high-cadence hypersonic flight testing—securing a $266M U.S. Space Force contract (12 + 6 option launches) alongside the GHOST deployable launch system at Kodiak LC-4 and the VICTUS HAZE tactically responsive space mission.',
        zhF: '利润特征：特种国防任务定制集成服务费显著高于普通商业小卫星发射，单发毛利率极具弹性',
        enF: 'Margin Profile: Custom defense integration & responsive readiness command premium ASPs well above standard commercial rides',
        gauges: [['$266M', '2026.07 太空军多发合同', 'Jul 2026 USSF Award'], ['12+6 发', '锁定亚轨道高超音速架次', 'Contracted HASTE Flights'], ['LC-4 阵地', '阿拉斯加 GHOST 机动部署', 'Kodiak GHOST Launch Site'], ['8天/枚', '与 Electron 共线柔性混产', 'Shared 8-Day Build Line']]
      },
      {
        badge: 'ENGINE 05 · MYNARIC OPTICAL MESH & GIGAWATT ORBITAL AI SOLAR',
        zhT: 'Mynaric 星间激光通信网 + 吉瓦级太空数据中心太阳翼：天基算力时代的“光纤与电厂”',
        enT: 'Mynaric Laser Mesh & Gigawatt Orbital AI Solar: Fiber & Power for Space Compute',
        zhD: '随着低轨星座互联及天基 AI 边缘推理兴起，星间激光通信终端与超大规模空间电力成为两大硬瓶颈。Rocket Lab 一方面在 2026 年 4 月并入德国 Mynaric（CONDOR 光学终端，Q3 单季已创收 $26M），规模化消解行业交付积压；另一方面由旗下 SolAero 推出专为千米级轨道 AI 数据中心设计的先进硅基太阳能阵列，抢占未来天基算力能源标准。',
        enD: 'Orbital AI clusters and proliferated defense constellations require two scarce inputs: optical cross-links and massive space power. Acquiring Mynaric ($26M Q3 revenue) scales CONDOR laser terminals in-house, while SolAero\'s new silicon solar arrays target kilometer-scale gigawatt orbital AI data centers.',
        zhF: '商业定位：无论谁来运营未来的太空数据中心与商业星座，都绕不开 Rocket Lab 的空间电源与激光网卡',
        enF: 'Positioning: Essential picks-and-shovels supplier of space power arrays and optical cross-links across commercial & defense fleets',
        gauges: [['$26.0M', 'Mynaric Q3 单季并表营收', 'Mynaric Q3 Revenue'], ['Rocket Lab EU', '慕尼黑欧洲总装与研发支点', 'Munich European Hub'], ['GW 级', '千米级太空算力太阳翼规划', 'Orbital AI Solar Scale'], ['100 Gbps+', '星间高速自由空间光通信', 'Optical Cross-Link Mesh']]
      },
      {
        badge: 'ENGINE 06 · INTERPLANETARY DEEP-SPACE PLATFORMS (MARS / VENUS / MOON)',
        zhT: '十分之一成本重构深空探索：从 CAPSTONE 绕月、ESCAPADE 双星奔火到金星探测',
        enT: '1/10th-Cost Deep-Space Exploration: From CAPSTONE & ESCAPADE Mars to Venus',
        zhD: '传统 NASA 行星际探测任务动辄耗资 $8亿–$20亿、耗时十年。Rocket Lab 继 CAPSTONE 成功验证月球近直线晕轨道后，为 NASA 与加州大学伯克利分校打造的 ESCAPADE 双星火星磁层探测器成功发射奔赴火星，造价仅约传统任务的十分之一；此外公司还交付了 NASA 在轨低温推进剂加注验证星 LOXSAT，并积极推进火星采样返回（MSR）低成本商业架构方案。',
        enD: 'Following CAPSTONE\'s lunar pathfinder triumph, Rocket Lab built and launched twin ESCAPADE Mars spacecraft for NASA & UC Berkeley at a fraction of legacy decadal mission costs, delivered NASA\'s LOXSAT cryogenic refueling spacecraft, and proposed an end-to-end commercial Mars Sample Return architecture.',
        zhF: '战略外溢：极端深空高辐射与自主导航验证反哺近地国防卫星平台高可靠口碑，构筑难以复制的品牌圣杯',
        enF: 'Halo Effect: Proven lunar & Martian flight heritage de-risks deep-space GNC, propulsion, and avionics for high-margin GEO/cislunar defense awards',
        gauges: [['2 颗在途', 'ESCAPADE 火星科学双星', 'ESCAPADE Twin Mars Probes'], ['LOXSAT', '在轨低温燃料加注验证星', 'Cryogenic Refueling Demo'], ['>$160M', 'Q2 新获高轨 GEO 卫星合同', 'GEO Spacecraft Contracts'], ['月/火/金星', '全太阳系商业探测平台谱系', 'Lunar / Mars / Venus Heritage']]
      }
    ];

    function refreshDynamicText() {
      var hz = HORIZONS[state.activeHz] || HORIZONS[0];
      document.getElementById('hzBadge').textContent = isEn() ? hz.enB : hz.zhB;
      document.getElementById('hzTitle').textContent = isEn() ? hz.enT : hz.zhT;
      var items = isEn() ? hz.enI : hz.zhI;
      document.getElementById('hzList').innerHTML = items.map(function (t) {
        return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
      }).join('');
      document.getElementById('hzProb').textContent = isEn() ? hz.enP : hz.zhP;
      document.getElementById('hzImpact').textContent = isEn() ? hz.enM : hz.zhM;

      var eg = ENGINES[state.activeEng] || ENGINES[0];
      document.getElementById('engBadge').textContent = eg.badge;
      document.getElementById('engTitle').textContent = isEn() ? eg.enT : eg.zhT;
      document.getElementById('engDesc').textContent = isEn() ? eg.enD : eg.zhD;
      document.getElementById('engFormula').textContent = isEn() ? eg.enF : eg.zhF;
      document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
        return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + (isEn() ? g[2] : g[1]) + '</span></div>';
      }).join('');
    }

    function applyLang(lang, silent) {
      state.lang = (lang === 'en') ? 'en' : 'zh';
      document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
      var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
      if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
      if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
      var nodes = document.querySelectorAll('[data-i18n-zh]');
      for (var i = 0; i < nodes.length; i++) {
        var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
        if (val !== null) {
          if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
          else nodes[i].textContent = val;
        }
      }
      refreshDynamicText();
      recalcOptionality();
      drawAll();
      if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
    }

    document.getElementById('hzTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-hz]');
      if (!b) return;
      state.activeHz = parseInt(b.getAttribute('data-hz'), 10) || 0;
      var bs = this.querySelectorAll('.ft-hz-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      refreshDynamicText();
    });

    document.getElementById('engineRail').addEventListener('click', function (e) {
      var b = e.target.closest('[data-eng]');
      if (!b) return;
      state.activeEng = parseInt(b.getAttribute('data-eng'), 10) || 0;
      var bs = this.querySelectorAll('.ft-rail-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      refreshDynamicText();
    });

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
          if (item.classList.contains('active')) window.scrollTo({ top: 0, behavior: 'smooth' });
          else showToast(isEn() ? ('Companion file: ' + item.getAttribute('data-suite-page')) : ('请在附件列表切换或同目录打开：' + item.getAttribute('data-suite-page')));
        }
      });
    }

    // High-DPI Retina Canvas Engine
    function prepCanvas(id) {
      var c = document.getElementById(id);
      if (!c) return null;
      var rect = c.getBoundingClientRect();
      var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
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

    function drawFutureCanvas() {
      var env = prepCanvas('futureCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hits.futureCanvas = [];
      var pad = { top: 28, right: 20, bottom: 42, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.fView === 'bridge') {
        var steps = [
          { lbl: 'FY26E基准', v: 0.98, b: 0, col: pal.blue, tip: 'FY2026E 隐含全年营收中值: ~$0.98B (9M26 $702M + Q4指引 $280M)' },
          { lbl: '+Iridium星座', v: 1.45, b: 0.98, col: pal.green, tip: 'Iridium 并表基数 ($0.90B) + NTN Direct 手机直连/PNT 增长至 2032E 贡献 +$1.45B' },
          { lbl: '+Neutron机队', v: 1.40, b: 2.43, col: pal.violet, tip: 'Neutron 年化 ~18–20 次发射 ($70M+ 票价) 贡献 +$1.40B' },
          { lbl: '+国防主承包', v: 1.65, b: 3.83, col: pal.amber, tip: 'SDA 后续批次、Golden Dome 与太空军 Flatellite 整星贡献 +$1.65B' },
          { lbl: '+激光/太空AI', v: 0.92, b: 5.48, col: pal.green, tip: 'Mynaric 激光终端、HASTE 与轨道 AI 太阳翼贡献 +$0.92B' },
          { lbl: 'FY32E蓝图', v: 6.40, b: 0, col: pal.blue, tip: 'FY2032E 端到端全栈营收蓝图: ~$6.40B（高毛利星座服务与部件占比超 45%）' }
        ];
        var maxB = 7.2;
        for (var k = 0; k <= 4; k++) {
          var kv = ((maxB / 4) * k).toFixed(1), ky = pad.top + ph - (k / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
        }
        var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
        steps.forEach(function (s, i) {
          var x = pad.left + i * sW + (sW - bW) / 2;
          var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
          var yb = pad.top + ph - (s.b / maxB) * ph;
          var bh = Math.max(5, yb - yt);
          ctx.fillStyle = s.col;
          roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(2) + 'B', x + bW / 2, yt - 6);
          ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
          ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
          hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
        });
      } else {
        var peers = [
          { name: 'Iridium (并购标的)', fcf: 30.7, col: pal.green, tip: 'TTM FCF 利润率高达 +30.7%（OEBITDA 利润率 57%），是稀缺的正向现金牛' },
          { name: 'Planet Labs (PL)', fcf: 6.5, col: pal.blue, tip: '地球观测数据服务 TTM FCF 利润率 +6.5%' },
          { name: 'Redwire (RDW)', fcf: -31.6, col: pal.amber, tip: 'TTM FCF 利润率 -31.6%' },
          { name: 'Rocket Lab (独立期)', fcf: -36.9, col: pal.violet, tip: 'TTM FCF 利润率 -36.9%（源于 Neutron 峰值研发，但 Q3 OCF 已率先转正 +$7.2M）' },
          { name: 'Intuitive (LUNR)', fcf: -38.3, col: pal.amber, tip: 'TTM FCF 利润率 -38.3%' },
          { name: 'Firefly (FLY)', fcf: -113.8, col: pal.red, tip: 'TTM FCF 利润率 -113.8%（高投入扩张期）' }
        ];
        var minF = -130, maxF = 45;
        var zeroY = pad.top + ph - ((0 - minF) / (maxF - minF)) * ph;
        ctx.strokeStyle = pal.sub; ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke();
        var slot = pw / peers.length, bw = Math.min(38, slot * 0.55);
        peers.forEach(function (p, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var py = pad.top + ph - ((p.fcf - minF) / (maxF - minF)) * ph;
          var yt = Math.min(zeroY, py), bh = Math.max(4, Math.abs(py - zeroY));
          ctx.fillStyle = p.col;
          roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText((p.fcf > 0 ? '+' : '') + p.fcf.toFixed(1) + '%', x + bw / 2, p.fcf >= 0 ? yt - 6 : yt + bh + 12);
          ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
          ctx.fillText(p.name.split(' ')[0], x + bw / 2, pad.top + ph + 20);
          hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' TTM FCF Margin', body: p.tip });
        });
      }
    }

    function drawSiliconCanvas() {
      var env = prepCanvas('siliconCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hits.siliconCanvas = [];
      var pad = { top: 28, right: 22, bottom: 40, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var yrs = ['2022', '2024', '2025 (+GEOST)', '2026 (+Mynaric)', '2028E (+Iridium)', '2030E'];

      if (state.sView === 'bom') {
        var satBom = [32, 48, 72, 85, 92, 95];
        var missionShare = [25, 38, 55, 68, 90, 96];
        for (var g = 0; g <= 4; g++) {
          var gv = g * 25, gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(gv + '%', pad.left - 8, gy + 4);
        }
        function plotP(arr, col, label) {
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
            ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
            if (idx === 3 || idx === 5) {
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
              ctx.fillText(v + '%', px, py - 8);
            }
            hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '内部垂直自制价值占比约 ' + v + '%' });
          });
        }
        yrs.forEach(function (y, idx) {
          var px = pad.left + (idx / 5) * pw;
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(y.split(' ')[0], px, pad.top + ph + 20);
        });
        plotP(satBom, pal.blue, '整星BOM与载荷自制率');
        plotP(missionShare, pal.violet, '发射+整星+频谱端到端任务闭环率');
      } else {
        var lCount = [9, 16, 21, 24, 38, 50];
        var maxL = 56;
        for (var m = 0; m <= 4; m++) {
          var mv = m * 14, my = pad.top + ph - (mv / maxL) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(mv + '发', pad.left - 8, my + 4);
        }
        var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
        yrs.forEach(function (y, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (lCount[i] / maxL) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(lCount[i] + '发', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
          ctx.fillText(y.split(' ')[0], x + bw / 2, pad.top + ph + 20);
          hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 年度总发射任务数', body: 'Electron + HASTE + Neutron (2027+) 合计年发射约 ' + lCount[i] + ' 次' });
        });
      }
    }

    // F4: Optionality Builder
    var OPT_DATA = {
      neutron: { rev: 1.08, eb: 0.41 },
      iridium: { rev: 1.24, eb: 0.72 },
      defense: { rev: 0.95, eb: 0.23 },
      haste: { rev: 0.42, eb: 0.13 },
      solarai: { rev: 0.65, eb: 0.23 }
    };
    var miniCaps = [37.5, 22.5, 77.9];

    function drawOptMiniCanvas() {
      var env = prepCanvas('optMiniCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var pad = { top: 22, right: 18, bottom: 24, left: 48 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var lbls = [isEn() ? 'Nov 26 Cap' : '当前市值', isEn() ? '2030 Base' : '2030基础盘', isEn() ? '2030 w/Opts' : '2030含期权'];
      var maxV = Math.max(60, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
      ctx.strokeStyle = pal.grid;
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
      var slot = pw / 3, bw = Math.min(54, slot * 0.5);
      miniCaps.forEach(function (v, i) {
        var x = pad.left + i * slot + (slot - bw) / 2;
        var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
        ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
        roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + v.toFixed(1) + 'B', x + bw / 2, yt - 6);
        ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
        ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
      });
    }

    function recalcOptionality() {
      // Base FY2030E organic core (Electron + baseline Space Systems): $1.50B rev, $0.31B Adj. EBITDA, ~755M pro forma diluted shares
      var baseRev = 1.50, baseEb = 0.31, sh2030 = 0.755;
      var addRev = 0, addEb = 0;
      document.querySelectorAll('[data-opt]').forEach(function (chk) {
        if (chk.checked) {
          var d = OPT_DATA[chk.getAttribute('data-opt')];
          if (d) { addRev += d.rev; addEb += d.eb; }
        }
      });
      var totRev = baseRev + addRev;
      var totEb = baseEb + addEb;
      var targetEv = totRev * state.mult;
      var baseCap = baseRev * state.mult;
      var shPrice = targetEv / sh2030;

      document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(2) + 'B';
      document.getElementById('optEbOut').textContent = '$' + totEb.toFixed(2) + 'B';
      document.getElementById('optShPriceOut').textContent = '$' + shPrice.toFixed(1);
      document.getElementById('optCapOut').textContent = '$' + targetEv.toFixed(1) + 'B';

      miniCaps = [37.5, baseCap, targetEv];
      drawOptMiniCanvas();
    }

    document.querySelectorAll('[data-opt]').forEach(function (chk) {
      chk.addEventListener('change', recalcOptionality);
    });
    document.getElementById('peTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-mult]');
      if (!b) return;
      state.mult = parseInt(b.getAttribute('data-mult'), 10) || 15;
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      recalcOptionality();
    });

    function bindSeg(gid, attr, skey, fn) {
      var g = document.getElementById(gid);
      if (!g) return;
      g.addEventListener('click', function (e) {
        var b = e.target.closest('[' + attr + ']');
        if (!b) return;
        state[skey] = b.getAttribute(attr);
        var bs = g.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        fn();
      });
    }
    bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
    bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

    function bindTip(cid) {
      var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
      if (!c || !tip) return;
      c.addEventListener('mousemove', function (ev) {
        var r = c.getBoundingClientRect();
        var mx = ev.clientX - r.left, my = ev.clientY - r.top;
        var arr = hits[cid] || [], hit = null;
        for (var i = 0; i < arr.length; i++) {
          var rg = arr[i];
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
    ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

    function drawAll() {
      drawFutureCanvas();
      drawSiliconCanvas();
      drawOptMiniCanvas();
    }

    // Quick Jump ⌘K
    var QITEMS = [
      { id: 'sec-f0', t: 'F0 端到端星网宣言与三阶时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
      { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Neutron · Iridium NTN Direct · Flatellite · HASTE · 轨道AI能源' },
      { id: 'sec-f2', t: 'F2 买现成星网套利与 2032 营收阶梯桥', s: 'Iridium +30.7% FCF 对比同行 · 迈向 $6.40B 全栈营收' },
      { id: 'sec-f3', t: 'F3 全载荷与频谱主权路线图', s: 'GEOST 红外 + Mynaric 激光 + SolAero 太阳翼内化 85%+ 整星价值' },
      { id: 'sec-f4', t: 'F4 2030 千亿太空主承包期权组装实验室', s: '自由开关五大新业务期权与 EV/S 倍数实时测算目标股价' }
    ];
    var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
    function renderQ(kw) {
      var q = (kw || '').trim().toLowerCase();
      var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
      qPop.innerHTML = m.map(function (x) {
        return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
      }).join('');
      qPop.classList.toggle('open', m.length > 0);
    }
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
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
      else if (e.key === 'Escape') { qPop.classList.remove('open'); document.body.classList.remove('portal-detail-drawer'); }
    });

    function triggerDownload() {
      var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = '火箭实验室_Rocket_Lab_未来十年战略图谱.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
      showToast(isEn() ? 'Downloaded standalone HTML file' : '已开始下载独立网页文件');
    }
    document.getElementById('topDownloadBtn').addEventListener('click', triggerDownload);
    
    

    document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
      if (window.innerWidth < 1024) document.body.classList.toggle('portal-detail-drawer');
      else {
        var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
        if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
        else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
        setTimeout(drawAll, 60);
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
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
    }, { passive: true });

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

    var rt = null;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
    recalcOptionality();
    drawAll();
  })();
  