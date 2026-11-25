
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

    var state = {
      theme: document.documentElement.getAttribute('data-theme') || 'light',
      lang: 'zh',
      hz: 0,
      eng: 0,
      f2View: 'capex',
      f3View: 'pen'
    };

    var hitRegions = { sCurveCanvas: [], capexBridgeCanvas: [], siliconCanvas: [] };

    function showToast(msg) {
      var el = document.getElementById('muiSnackbar');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(function () { el.classList.remove('show'); }, 2200);
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
        blueSoft: dark ? 'rgba(51, 153, 255, 0.22)' : 'rgba(0, 115, 230, 0.16)',
        green: dark ? '#22C55E' : '#16A34A',
        amber: dark ? '#FFB74D' : '#D97706',
        violet: dark ? '#A78BFA' : '#7C3AED',
        red: dark ? '#FF6B6B' : '#DC2626'
      };
    }

    function prepCanvas(id) {
      var c = document.getElementById(id);
      if (!c) return null;
      var rect = c.getBoundingClientRect();
      var w = Math.max(260, rect.width || 520);
      var h = Math.max(180, rect.height || 280);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      var ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      return { ctx: ctx, w: w, h: h };
    }

    function roundRect(ctx, x, y, w, h, r) {
      var rr = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    }

    // F0 Horizons Data
    var HORIZONS = [
      {
        formula: 'H1 核心催化：~$2,200亿 CapEx 转化为 AWS 电力翻倍（2027底）+ Trainium3/4 放量 + 生鲜当日达 2,300+ 城 & Rufus/Alexa+ 导购变现',
        desc: '2026–2027 年是重资本投入立即转化为收入加速的窗口期：AWS 电力容量在 2025 新增 3.9 GW 基础上将于 2027 年底翻倍，支撑 AWS 连续冲击 >40% 增速；零售端通过生鲜易腐品当日达与 450+ 城镇 Amazon Now 极速闪送将 Prime 购买频次拉升至 3 倍。',
        badge: 'H1 ACTIVE · 2026–2027'
      },
      {
        formula: 'H2 核心催化：企业级 AgentCore 生产自治普及 + Trainium4 (6x FP4) 规模替代外部 GPU + 零售闭环广告突破 $1,100亿/年',
        desc: '2028–2029 年进入高边际利润收获波：数百万企业智能体常驻 AWS 数据重力层 7×24 小时消耗 Token；自研芯片大幅拉低单机柜折旧占比，同时 Amazon Pharmacy 与超快闪送重塑家庭日常刚需钱包份额。',
        badge: 'H2 SCALE · 2028–2029'
      },
      {
        formula: 'H3 核心催化：全球零售与 AWS 双双突破 $1T 年营收门槛 + Amazon Leo 全球星座组网 + Zoox 无人出行与 Prime Air 5亿件无人机网',
        desc: '2030–2032 年迈向物理与太空全栈重构：约 85% 本地 IT 上云与 80% 线下零售渗透持续兑现，Amazon Leo 打通天地一体化 AWS 边缘计算与手机直连，Zoox 与百万具身机器人彻底改写城市物流与出行成本曲线。',
        badge: 'H3 ENDGAME · 2030–2032'
      }
    ];

    var hTabs = document.getElementById('horizonTabs');
    if (hTabs) {
      hTabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-hz]');
        if (!b) return;
        state.hz = parseInt(b.getAttribute('data-hz'), 10) || 0;
        var bs = hTabs.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        document.getElementById('hzFormula').textContent = HORIZONS[state.hz].formula;
        document.getElementById('hzDesc').textContent = HORIZONS[state.hz].desc;
        document.getElementById('sCurveBadge').textContent = HORIZONS[state.hz].badge;
        drawSCurveCanvas();
      });
    }

    // F1 6-Engine Master-Detail Data
    var ENGINES = [
      {
        badge: 'ENGINE 01 · AWS AGENTIC AI STACK (H1–H2 CORE)',
        cite: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/',
        title: 'AWS Agentic AI 全栈数字电网：企业核心数据重力 × 多模型中立路由 × AgentCore 运行时',
        lead: '随着生成式 AI 从早期训练（Training）全面迈向高频生产推理（Inference）与自主智能体（Agents），企业发现智能体必须安全贴近自身核心数据库、IAM 权限与私有 VPC 运行。AWS 在 Q3 2026 营收同比加速至 +39.3%（单季 $459.8亿，营业利润 $177.7亿），财富 500 强在 Amazon Bedrock 上的支出同比暴增约 7 倍、Token 处理量激增约 17 倍；Bedrock AgentCore 在 Q3 单季部署的生产级 Agent 数量超过此前三个季度总和的 2 倍，叠加 OpenAI 逾 $1,000亿 算力合作与 Anthropic 深度绑定，奠定 2027–2028 连续 >40% 增长底座。',
        kpis: [['+39.3% YoY', 'Q3 2026 AWS 营收增速 ($45.98B)'], ['~17x Token', 'Q3 Bedrock Token 处理量同比倍增'], ['>$15B 年化', 'Q1 2026 AWS AI 早期年化运行率'], ['-32% 成本', 'Strands 开源 Agent 框架节省 Token']],
        moat: '6 名工程师借助 Kiro 仅用 76 天从零构建 Bedrock Mantle 高吞吐推理引擎；Strands Box 提供硬件虚拟化级 Agent 安全沙箱；AWS Transform 已累计分析 18 亿行大型机老旧代码并把迁移周期压缩 4 倍；收购 DuckDB 幕后团队 DuckLabs 强化云原生分析底座。',
        risk: '当前首要约束并非需求而是电网接入、变压器、光模块与 HBM 存储产能；同时若单一闭源模型形成绝对垄断可能削弱多模型平台溢价，AWS 正以多模型 Bedrock + 自研 Nova + Trainium 30–40% 性价比对冲。'
      },
      {
        badge: 'ENGINE 02 · ANNAPURNA LABS CUSTOM SILICON (H1–H2 MARGIN SHIELD)',
        cite: 'https://s2.q4cdn.com/299287126/files/doc_financials/2026/ar/2025-Shareholder-Letter-Final.pdf',
        title: 'Annapurna Labs 自研硅片帝国：Graviton5 × Trainium2/3/4 × Nitro 全栈去“英伟达税”',
        lead: '正如苹果靠 Apple Silicon 甩开 x86/高通毛利盘剥，亚马逊通过自研芯片掌控云端算力底层成本：截至 2026 年初，Graviton、Trainium 与 Nitro 合计年化营收运行率已突破 $200亿（若按外部商用芯片公司毛利折算等价于 ~$500亿 市场体量）。前 1,000 大 EC2 客户中 98% 已采用 Graviton（性价比优于 x86 达 40%）；超过 140 万颗 Trainium2 已落地（含为 Anthropic 打造的 50万+ 芯片超级集群 Project Rainier），Trainium3 几近订满，2027 年登场的 Trainium4 更将带来 6 倍 FP4 算力跃升。',
        kpis: [['>$20B 年化', '自研硅片组合年化运行率 (~$50B等价)'], ['98% 采用率', 'Top 1,000 EC2 客户使用 Graviton'], ['30%–40%', 'Trainium2/3 较同级 GPU 性价比优势'], ['6x FP4 算力', '2027 Trainium4 较 Trn3 算力跃迁']],
        moat: '硬件芯片（Trainium）、系统虚拟化卸载卡（Nitro）、高速互连网络（EFA）与软件编译器栈（TorchNeuron 原生集成 PyTorch）由同一内部团队垂直协同设计，不仅对外出租还支撑内部 Rufus、Alexa+ 与 Bedrock 超大规模推理。',
        risk: '第三方 CUDA 开发者生态惯性依然深厚；台积电先进制程（3nm/2nm）、CoWoS 封装与 HBM4 配额竞争激烈，需持续提升 Neuron SDK 开箱即用流畅度。'
      },
      {
        badge: 'ENGINE 03 · EMBODIED ROBOTICS & ULTRA-FAST GROCERY (H1–H2 RETAIL MOAT)',
        cite: 'https://s2.q4cdn.com/299287126/files/doc_financials/2026/ar/2025-Shareholder-Letter-Final.pdf',
        title: '100万+ 仓储机器人 × 20分钟闪送 × $1,500亿生鲜霸权：用物理极速锁死万亿零售地平线',
        lead: '亚马逊全球履约网络已部署超过 1,000,000 台具身机器人，配合 85+ 座当日达履约中心（SSD，存放最高频 9万个 SKU）与 $40亿+ 美国乡村配送网扩建（覆盖 13,000+ 邮编），在 Q3 2026 单季实现逾 15 亿件当日或次日送达。更关键的品类破局在于日常生鲜与闪送：2025 年生鲜杂货总销售额突破 $1,500亿（稳居全美第 2 大杂货商），在开通当日达的城市生鲜约占 Q3 售出件数的 50%；20–30 分钟送达的 Amazon Now 已扩展至全球 450+ 城镇，单量同比猛增 10 倍并使 Prime 用户下单频次翻至 3 倍。',
        kpis: [['1,000,000+', '全球履约中心在役机器人数量'], ['>$150B GMV', '生鲜杂货年总销售额 (全美第2)'], ['10x 订单量', 'Q3 2026 Amazon Now (450+城) 同比暴增'], ['500M 件/年', 'Prime Air 无人机本十年末年配送目标']],
        moat: '履约区域化 + 机器人拣选 + 生鲜高频连带构成的物理网络具有极强规模经济与路线密度壁垒；同时上线超低价频道 Amazon Haul（覆盖 25+ 国百万件 $10 以下商品）封堵跨境白牌电商渗透。',
        risk: '一线仓配人力成本刚性上升（2026 年投入 $15亿+ 将全美仓配起薪提至 $20/小时），超快闪送微仓（Micro-FC）在低密度城区的单均履约经济性需精细打磨。'
      },
      {
        badge: 'ENGINE 04 · AGENTIC COMMERCE & CLOSED-LOOP ADS (H1–H2 PROFIT ENGINE)',
        cite: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/',
        title: 'Rufus × Alexa+（6亿终端）× $780亿闭环广告：重塑 AI 时代的购物入口与高毛利变现',
        lead: '当传统搜索框向对话式 Agent 演进，亚马逊手握两大原生超级入口：站内购物助手 Rufus 已服务超 3亿顾客并带来约 $120亿 年化增量销售；重构后的 Alexa+ 覆盖全球 6亿活跃终端（Prime 会员免费、独立订阅 $19.99/月），交互对话量翻倍、带动的设备购买翻 3 倍，Q3 2026 Alexa 购物交互量更同比飙升 +570%。入口之上是 TTM 高达 $780.1亿 的闭环广告收费站，2026 新推 Amazon Ads Agent 将搜索广告与 Prime Video（NFL 周四夜赛场均 1,770万观众、NBA 200+ 国转播）全漏斗打通。',
        kpis: [['$78.01B', 'TTM Q3 2026 广告服务累计净营收'], ['~$12B 增量', 'Rufus (3亿+用户) 拉动年化增量销售'], ['600M 终端', 'Alexa+ 覆盖活跃硬件生态底座'], ['+570% YoY', 'Q3 2026 Alexa 购物交互量同比激增']],
        moat: '唯一同时拥有“家庭语音硬件生态 + 万亿级真实商品履约目录 + 第一方交易支付闭环 + 顶级体育流媒体大屏”的商业体，天然免疫第三方隐私政策冲击。',
        risk: '外部通用 AI 搜索智能体（如 ChatGPT Shopping / Google AI Mode）试图截留上游比价流量；广告加载率提升需严格平衡自然搜索结果相关性与商家 ROI。'
      },
      {
        badge: 'ENGINE 05 · AMAZON LEO SPACE INTERNET (H2–H3 GLOBAL INFRASTRUCTURE)',
        cite: 'https://s2.q4cdn.com/299287126/files/doc_financials/2026/ar/2025-Shareholder-Letter-Final.pdf',
        title: 'Amazon Leo 近地轨道卫星星座：连接全球无网人口、航空海事与 AWS 太空私有云链路',
        lead: '原 Project Kuiper 已正式定名为 Amazon Leo，截至 2026 年已在轨部署 300+ 颗商业低轨卫星并进入密集发射与企业商用冲刺期。依托自研相控阵与星间光链路芯片，旗舰终端 Leo Ultra 实现 1 Gbps 下行与 400 Mbps 上行速率（企业级上行能力达竞品 6–8 倍），并可直接绕开公网通过私有链路接入 AWS VPC。目前已锁定 AT&T 企业连接、达美航空（逾 500 架客机）、捷蓝航空、Vodafone 与 NASA 等重磅订单，并通过 $116亿 Globalstar 频谱合作切入 Apple 卫星直连手机（D2D）服务。',
        kpis: [['300+ 在轨', '已部署低轨卫星 (规划超 3,200 颗)'], ['1 Gbps / 400M', 'Leo Ultra 企业终端下行/上行峰值'], ['6–8x 上行', '自研 Leo 芯片较竞品企业上行优势'], ['$11.6B 合作', 'Globalstar 频谱与手机直连卫星布局']],
        moat: '不同于单纯卖消费者宽带的卫星公司，Amazon Leo 与 AWS 企业专网、全球物流车队/远洋货轮调度及 Prime 家庭生态形成深度交叉补贴与 B2B 打包锁死。',
        risk: '重型火箭发射窗口排期紧张（已向 FCC 申请星座部署节点顺延），卫星制造与发射折旧在组网前中期对国际与总部利润存在阶段性摊销拖累。'
      },
      {
        badge: 'ENGINE 06 · ZOOX ROBOTAXI & AMAZON PHARMACY (H2–H3 PHYSICAL FRONTIERS)',
        cite: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/',
        title: 'Zoox 原生无人驾驶出租车 × Amazon Pharmacy 3小时送药：向万亿出行与医疗深水区进军',
        lead: '在零售与云计算之外，亚马逊耐心孵化十年的两大物理新物种已跨过商业化拐点：第一，Zoox 摒弃改装传统燃油车路线，正向研发无方向盘、无踏板、双向对称行驶的原生 Robotaxi，已在拉斯维加斯正式开启面向公众的商业付费乘车服务，并在全美 12 座城市开展车队测试运营；第二，Amazon Pharmacy 已在全美 3,000+ 城镇开通处方药当日达、在 350+ 城市实现 3 小时极速送药上门，Q3 2026 活跃购药患者同比大增 +60%，复购客户增长逾 +50%。',
        kpis: [['12 座城市', 'Zoox 全美运营测试与拉斯维加斯付费商运'], ['3,000+ 城', 'Amazon Pharmacy 处方药当日达覆盖'], ['350+ 城市', '处方药 3 小时极速送达覆盖范围'], ['+60% YoY', 'Q3 2026 Amazon Pharmacy 活跃客户增速']],
        moat: 'Pharmacy 直接复用已建成的当日达微仓与温控配送网络，透明药价直击北美传统药房痛点；Zoox 依托 AWS 海量仿真训练算力与正向定制车规产线降低单英里成本。',
        risk: '自动驾驶面临州级安全监管审批与长尾极端路况责任界定；处方药业务需持续突破北美 PBM（药品福利管理机构）与商业医保报销网络壁垒。'
      }
    ];

    var engRail = document.getElementById('engineRail');
    if (engRail) {
      engRail.addEventListener('click', function (e) {
        var b = e.target.closest('[data-eng]');
        if (!b) return;
        state.eng = parseInt(b.getAttribute('data-eng'), 10) || 0;
        var bs = engRail.querySelectorAll('.fh-eng-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var d = ENGINES[state.eng];
        document.getElementById('detBadge').textContent = d.badge;
        document.getElementById('detCite').href = d.cite;
        document.getElementById('detTitle').textContent = d.title;
        document.getElementById('detLead').textContent = d.lead;
        document.getElementById('detMoat').textContent = d.moat;
        document.getElementById('detRisk').textContent = d.risk;
        document.getElementById('detKpis').innerHTML = d.kpis.map(function (k) {
          return '<div class="fh-det-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
        }).join('');
      });
    }

    // Chart 1: F0 3-Horizon S-Curve Canvas
    function drawSCurveCanvas() {
      var env = prepCanvas('sCurveCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.sCurveCanvas = [];
      var pad = { top: 28, right: 22, bottom: 38, left: 48 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      var yrs = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E', '2031E', '2032E'];
      var h1 = [717, 815, 935, 1055, 1165, 1270, 1365, 1455]; // Core Retail + 3P + Base Cloud
      var h2 = [717, 825, 985, 1175, 1365, 1545, 1710, 1875]; // + Agentic AI + Silicon + Ads
      var h3 = [717, 828, 995, 1200, 1415, 1630, 1845, 2060]; // + Leo + Zoox + Pharmacy Dual-$1T
      var maxY = 2200;

      for (var g = 0; g <= 4; g++) {
        var val = (maxY / 4) * g;
        var gy = pad.top + ph - (g / 4) * ph;
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
        ctx.fillText('$' + Math.round(val) + 'B', pad.left - 6, gy + 4);
      }

      // Highlight active horizon band
      var bands = [[0, 2], [2, 4], [4, 7]];
      var bIdx = bands[state.hz] || [0, 2];
      var bx1 = pad.left + (bIdx[0] / 7) * pw;
      var bx2 = pad.left + (bIdx[1] / 7) * pw;
      ctx.fillStyle = pal.blueSoft;
      ctx.fillRect(bx1, pad.top, bx2 - bx1, ph);

      function plotLine(arr, col, width, label, active) {
        ctx.strokeStyle = col;
        ctx.lineWidth = active ? 3.2 : width;
        ctx.beginPath();
        arr.forEach(function (v, i) {
          var px = pad.left + (i / 7) * pw;
          var py = pad.top + ph - (v / maxY) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        arr.forEach(function (v, i) {
          var px = pad.left + (i / 7) * pw;
          var py = pad.top + ph - (v / maxY) * ph;
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(px, py, active ? 4.4 : 3.2, 0, Math.PI * 2); ctx.fill();
          if (i === 7) {
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + (v / 1000).toFixed(2) + 'T', px - 4, py - 7);
          }
          hitRegions.sCurveCanvas.push({
            x: px - 10, y: py - 10, w: 20, h: 20,
            title: yrs[i] + ' · ' + label,
            body: '模拟集团年营收轨迹: $' + v + 'B ($' + (v / 1000).toFixed(2) + 'T)'
          });
        });
      }

      yrs.forEach(function (y, i) {
        var px = pad.left + (i / 7) * pw;
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText(y, px, pad.top + ph + 19);
      });

      plotLine(h1, pal.amber, 2.0, 'H1 基础飞轮线', state.hz === 0);
      plotLine(h2, pal.blue, 2.4, 'H2 Agentic AI + 芯片叠加线', state.hz === 1);
      plotLine(h3, pal.violet, 2.4, 'H3 双万亿 + 太空/无人全栈线', state.hz === 2);
    }

    // Chart 2: F2 CapEx vs Peers & Revenue Bridge
    function drawCapexBridgeCanvas() {
      var env = prepCanvas('capexBridgeCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.capexBridgeCanvas = [];
      var pad = { top: 28, right: 20, bottom: 44, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.f2View === 'capex') {
        var labels = ['AMZN 23', 'AMZN 24', 'AMZN 25', 'AMZN 26E', 'GOOGL 26E', 'MSFT 26E', 'META 26E', 'AAPL 26E'];
        var vals = [52.7, 77.7, 128.3, 220.0, 175.0, 145.0, 118.0, 13.5];
        var cols = [pal.blueSoft, pal.blueSoft, pal.blue, pal.violet, pal.green, pal.amber, pal.amber, pal.tick];
        var maxV = 240;
        for (var g = 0; g <= 4; g++) {
          var sv = (maxV / 4) * g;
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round(sv) + 'B', pad.left - 7, gy + 4);
        }
        var slot = pw / labels.length, bw = Math.min(38, slot * 0.62);
        labels.forEach(function (lb, i) {
          var cx = pad.left + i * slot + slot / 2;
          var bh = (vals[i] / maxV) * ph;
          var by = pad.top + ph - bh;
          ctx.fillStyle = (i < 2) ? pal.blue : cols[i];
          if (i < 2) ctx.globalAlpha = 0.65;
          roundRect(ctx, cx - bw / 2, by, bw, bh, 5); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + vals[i].toFixed(0) + 'B', cx, by - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
          ctx.fillText(lb, cx, pad.top + ph + 18);
          hitRegions.capexBridgeCanvas.push({
            x: cx - bw / 2, y: by, w: bw, h: bh,
            title: lb + ' 年度资本开支对比',
            body: '资本开支规模: ~$' + vals[i].toFixed(1) + 'B（AMZN 2026E 现金 CapEx 指引约 $220B，居全球科技企业首位，苹果则采用轻资产 PCC 路径）'
          });
        });
      } else {
        var steps = [
          { n: 'FY25 基准', v: 717, base: 0, col: pal.blue, tip: 'FY2025 审计总净销售额 $716.92B' },
          { n: '+AWS与AI', v: 490, base: 717, col: pal.violet, tip: 'AWS 从 $128.7B 迈向 $618B+（AgentCore + AI 推理 + 85%本地IT上云）' },
          { n: '+自营/生鲜', v: 215, base: 1207, col: pal.green, tip: '生鲜当日达、Amazon Now 极速闪送与全球零售渗透增量' },
          { n: '+3P与订阅', v: 185, base: 1422, col: pal.green, tip: '第三方卖家 FBA 服务费与 Prime / Alexa+ 订阅增量' },
          { n: '+闭环广告', v: 88, base: 1607, col: pal.amber, tip: '零售搜索广告 + Prime Video 体育流媒体广告增量' },
          { n: '+Leo/Zoox/医', v: 65, base: 1695, col: pal.amber, tip: 'Amazon Leo 卫星通信、Zoox 无人出租车与 Pharmacy 医疗贡献' },
          { n: 'FY32E 终局', v: 1760, base: 0, col: pal.blue, tip: '2032E 基准双引擎总营收 ~$1.76T（乐观全期权突破 $2.0T+）' }
        ];
        var maxB = 1950;
        for (var k = 0; k <= 4; k++) {
          var bv = (maxB / 4) * k;
          var bgy = pad.top + ph - (k / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, bgy); ctx.lineTo(pad.left + pw, bgy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round(bv) + 'B', pad.left - 7, bgy + 4);
        }
        var bSlot = pw / steps.length, bW = Math.min(42, bSlot * 0.64);
        steps.forEach(function (st, idx) {
          var cx = pad.left + idx * bSlot + bSlot / 2;
          var topVal = st.base + st.v;
          var yTop = pad.top + ph - (topVal / maxB) * ph;
          var yBot = pad.top + ph - (st.base / maxB) * ph;
          var bh = Math.max(5, yBot - yTop);
          ctx.fillStyle = st.col;
          roundRect(ctx, cx - bW / 2, yTop, bW, bh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText((st.base > 0 ? '+$' : '$') + st.v + 'B', cx, yTop - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
          ctx.fillText(st.n, cx, pad.top + ph + 18);
          hitRegions.capexBridgeCanvas.push({ x: cx - bW / 2, y: yTop, w: bW, h: bh, title: st.n, body: st.tip });
        });
      }
    }

    // Chart 3: F3 Annapurna Silicon Canvas
    function drawSiliconCanvas() {
      var env = prepCanvas('siliconCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.siliconCanvas = [];
      var pad = { top: 28, right: 38, bottom: 42, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.f3View === 'pen') {
        var yrs = ['2022', '2024', 'Q1 26', '2027E', '2029E', '2031E'];
        var runRate = [3.5, 9.5, 20.5, 34.0, 56.0, 82.0]; // $B annualized run-rate
        var share = [14, 24, 36, 48, 58, 66]; // % AWS compute share
        var maxR = 90;
        for (var g = 0; g <= 4; g++) {
          var sv = (maxR / 4) * g;
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round(sv) + 'B', pad.left - 6, gy + 4);
          ctx.textAlign = 'left';
          ctx.fillText(Math.round((g / 4) * 80) + '%', pad.left + pw + 6, gy + 4);
        }
        var slot = pw / yrs.length, bw = Math.min(38, slot * 0.52);
        yrs.forEach(function (y, i) {
          var cx = pad.left + i * slot + slot / 2;
          var bh = (runRate[i] / maxR) * ph;
          var by = pad.top + ph - bh;
          ctx.fillStyle = i <= 2 ? pal.blue : pal.violet;
          roundRect(ctx, cx - bw / 2, by, bw, bh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + runRate[i].toFixed(1) + 'B', cx, by - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
          ctx.fillText(y, cx, pad.top + ph + 18);
          hitRegions.siliconCanvas.push({
            x: cx - bw / 2, y: by, w: bw, h: bh,
            title: y + ' Annapurna 自研硅片规模',
            body: '自研芯片年化营收运行率: ~$' + runRate[i].toFixed(1) + 'B · 占 AWS 内部与客户新增算力比重约 ' + share[i] + '%'
          });
        });
        ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
        yrs.forEach(function (y, i) {
          var cx = pad.left + i * slot + slot / 2;
          var py = pad.top + ph - (share[i] / 80) * ph;
          if (i === 0) ctx.moveTo(cx, py); else ctx.lineTo(cx, py);
        });
        ctx.stroke();
        yrs.forEach(function (y, i) {
          var cx = pad.left + i * slot + slot / 2;
          var py = pad.top + ph - (share[i] / 80) * ph;
          ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(cx, py, 4.2, 0, Math.PI * 2); ctx.fill();
        });
      } else {
        var rows = [
          { n: '第三方旗舰商用 GPU 实例 (基准=100)', cost: 100, gm: 31, col: pal.amber, tip: '承受上游芯片厂商 ~70% 硬件毛利溢价，折旧占比较高' },
          { n: 'AWS Trainium2 (Project Rainier 已投产)', cost: 68, gm: 41, col: pal.blue, tip: '较同级 GPU 实例提供 30%–40% 性价比优势，同时提升 AWS 实例毛利率' },
          { n: 'AWS Trainium3 (2026 放量交付)', cost: 48, gm: 45, col: pal.green, tip: '较 Trainium2 再提升 30%–40% 性价比，支撑高频 Agentic Token 推理' },
          { n: 'AWS Trainium4 (2027 规划 · 6x FP4)', cost: 28, gm: 49, col: pal.violet, tip: '6倍 FP4 算力 + 4倍内存带宽，将百万 Token 推理成本压降至基准约 28%' }
        ];
        var rH = ph / rows.length;
        rows.forEach(function (r, idx) {
          var cy = pad.top + idx * rH + rH / 2;
          var barW = (r.cost / 110) * (pw * 0.78);
          ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
          ctx.fillText(r.n, pad.left, cy - 13);
          ctx.fillStyle = r.col;
          roundRect(ctx, pad.left, cy - 6, barW, 18, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
          ctx.fillText('推理成本指数 ' + r.cost + ' · 估算实例毛利 ~' + r.gm + '%', pad.left + barW + 8, cy + 7);
          hitRegions.siliconCanvas.push({ x: pad.left, y: cy - 22, w: pw, h: 38, title: r.n, body: r.tip });
        });
      }
    }

    // F4 Optionality Switchboard & Mini Canvas
    var OPT_CFG = {
      aws_ai: { rev: 340, ebit: 125, label: 'AWS+AI', col: 'blue' },
      silicon: { rev: 45, ebit: 34, label: '自研芯片', col: 'violet' },
      retail_ads: { rev: 260, ebit: 58, label: '闪送+广告', col: 'green' },
      leo: { rev: 28, ebit: 9, label: 'Leo卫星', col: 'amber' },
      zoox_rx: { rev: 36, ebit: 10, label: 'Zoox+医药', col: 'red' }
    };
    var optBreakdown = [];

    function drawOptSimCanvas() {
      var env = prepCanvas('optSimCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var pad = { top: 24, right: 16, bottom: 32, left: 46 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var maxV = 160;
      ctx.strokeStyle = pal.grid;
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
      var slot = pw / optBreakdown.length, bw = Math.min(36, slot * 0.58);
      optBreakdown.forEach(function (it, i) {
        var cx = pad.left + i * slot + slot / 2;
        var bh = Math.max(3, (it.v / maxV) * ph);
        var by = pad.top + ph - bh;
        ctx.fillStyle = pal[it.col] || pal.blue;
        if (!it.on) ctx.globalAlpha = 0.22;
        roundRect(ctx, cx - bw / 2, by, bw, bh, 5); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + it.v + 'B', cx, by - 5);
        ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
        ctx.fillText(it.n, cx, pad.top + ph + 16);
      });
    }

    function runOptionalitySim() {
      var baseRev = 1100, baseEbit = 99; // Conservative 2032E inertial baseline
      var addRev = 0, addEbit = 0;
      optBreakdown = [{ n: '惯性底盘', v: baseEbit, col: 'blue', on: true }];
      document.querySelectorAll('#optToggleList [data-opt]').forEach(function (chk) {
        var k = chk.getAttribute('data-opt');
        var cfg = OPT_CFG[k];
        if (!cfg) return;
        if (chk.checked) {
          addRev += cfg.rev;
          addEbit += cfg.ebit;
        }
        optBreakdown.push({ n: cfg.label, v: chk.checked ? cfg.ebit : 0, col: cfg.col, on: chk.checked });
      });
      var mult = parseFloat(document.getElementById('inpEvMult').value) || 20;
      document.getElementById('lblEvMult').textContent = mult.toFixed(1) + 'x';
      var totRev = baseRev + addRev;
      var totEbit = baseEbit + addEbit;
      var opm = (totEbit / totRev) * 100;
      var evT = (totEbit * mult) / 1000;

      document.getElementById('outRev32').textContent = '$' + totRev.toLocaleString() + 'B';
      document.getElementById('outEbit32').textContent = '$' + totEbit + 'B';
      document.getElementById('outOpm32').textContent = opm.toFixed(1) + '%';
      document.getElementById('outEv32').textContent = '$' + evT.toFixed(2) + 'T';
      drawOptSimCanvas();
    }

    document.querySelectorAll('#optToggleList [data-opt]').forEach(function (chk) {
      chk.addEventListener('change', runOptionalitySim);
    });
    document.getElementById('inpEvMult').addEventListener('input', runOptionalitySim);

    var optPresets = document.getElementById('optPresetGroup');
    if (optPresets) {
      optPresets.addEventListener('click', function (e) {
        var b = e.target.closest('[data-opreset]');
        if (!b) return;
        var mode = b.getAttribute('data-opreset');
        optPresets.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
        var map = {
          core: { opts: ['retail_ads'], m: 17.5 },
          base: { opts: ['aws_ai', 'silicon', 'retail_ads'], m: 20.0 },
          full: { opts: ['aws_ai', 'silicon', 'retail_ads', 'leo', 'zoox_rx'], m: 22.5 }
        }[mode];
        if (!map) return;
        document.querySelectorAll('#optToggleList [data-opt]').forEach(function (chk) {
          chk.checked = map.opts.indexOf(chk.getAttribute('data-opt')) !== -1;
        });
        document.getElementById('inpEvMult').value = map.m;
        runOptionalitySim();
      });
    }

    function bindChartTabs(groupId, attr, stateKey, fn) {
      var g = document.getElementById(groupId);
      if (!g) return;
      g.addEventListener('click', function (e) {
        var b = e.target.closest('[' + attr + ']');
        if (!b) return;
        state[stateKey] = b.getAttribute(attr);
        g.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
        fn();
      });
    }
    bindChartTabs('f2Tabs', 'data-f2', 'f2View', drawCapexBridgeCanvas);
    bindChartTabs('f3Tabs', 'data-f3', 'f3View', drawSiliconCanvas);

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
    ['sCurveCanvas', 'capexBridgeCanvas', 'siliconCanvas'].forEach(bindHoverTooltip);

    function drawAllCharts() {
      drawSCurveCanvas();
      drawCapexBridgeCanvas();
      drawSiliconCanvas();
      drawOptSimCanvas();
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
      var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
      if (sl) sl.classList.toggle('active', state.theme === 'light');
      if (sd) sd.classList.toggle('active', state.theme === 'dark');
      drawAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? '已切换至深色护眼模式' : '已切换至 MUI 浅色模式');
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
      drawAllCharts();
      if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
    }

    

    // Quick Jump Search (⌘K)
    var QUICK_ITEMS = [
      { id: 'mod-f0', t: 'F0 战略总纲与三阶段 S 曲线', s: '双万亿营收地平线 · AWS 2027–28 >40% 预期增速 · 85% IT 未上云' },
      { id: 'mod-f1', t: 'F1 六大增长引擎主从观测台', s: 'Bedrock/AgentCore · Annapurna芯片 · 百万机器人闪送 · Rufus/Alexa+ · Leo · Zoox' },
      { id: 'mod-f2', t: 'F2 $2,200亿基建周期与营收瀑布桥', s: '2026E 现金 CapEx ~$220B vs 科技巨头 · FY25→FY32E 增量桥' },
      { id: 'mod-f3', t: 'F3 Annapurna Labs 算力主权图谱', s: 'Graviton5 · Trainium2/3/4 (6x FP4) · >$20B 年化运行率' },
      { id: 'mod-f4', t: 'F4 2032 五万亿市值期权调音台', s: '五大战略期权自由开关 · EV/EBIT 倍数与 2032E 利润模拟' }
    ];
    var qInput = document.getElementById('quickJumpInput');
    var qPop = document.getElementById('quickJumpPopover');
    function renderQuick(q) {
      if (!qPop) return;
      var kw = (q || '').trim().toLowerCase();
      var matched = QUICK_ITEMS.filter(function (it) {
        return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1;
      });
      qPop.innerHTML = matched.map(function (it) {
        return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
      }).join('');
      qPop.classList.toggle('open', matched.length > 0);
    }
    if (qInput && qPop) {
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
    }
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (qInput) qInput.focus();
      }
      if (e.key === 'Escape') {
        if (qPop) qPop.classList.remove('open');
        document.getElementById('muiSidebar').classList.remove('open');
        document.getElementById('drawerBackdrop').classList.remove('open');
      }
    });

    // Suite Hub Navigation
    var hub = document.getElementById('companySubfolderHub');
    if (hub) {
      hub.addEventListener('click', function (e) {
        var pill = e.target.closest('[data-co-cat]');
        if (pill) {
          var cat = pill.getAttribute('data-co-cat');
          hub.querySelectorAll('[data-co-cat]').forEach(function (p) { p.classList.toggle('active', p === pill); });
          hub.querySelectorAll('[data-co-item-cat]').forEach(function (it) {
            it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat));
          });
          return;
        }
        var item = e.target.closest('.co-hub-item');
        if (item) {
          var jump = item.getAttribute('data-suite-jump');
          var docName = item.getAttribute('data-suite-Doc');
          if (jump) {
            var sec = document.querySelector(jump);
            if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          } else if (docName) {
            showToast('请在配套四页式套件中打开《' + docName + '》');
          }
        }
      });
    }

    document.getElementById('crumbTopBtn').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    

    var sbBtn = document.getElementById('sidebarToggleBtn');
    var sb = document.getElementById('muiSidebar');
    var bd = document.getElementById('drawerBackdrop');
    if (sbBtn && sb && bd) {
      sbBtn.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
          var open = sb.classList.toggle('open');
          bd.classList.toggle('open', open);
        } else {
          var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
          if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
          else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
          try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
          setTimeout(drawAllCharts, 60);
        }
      });
      bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
    }

    var tocLinks = document.querySelectorAll('#tocList .mui-nav-link');
    window.addEventListener('scroll', function () {
      var bar = document.getElementById('readingProgressBar');
      if (bar) {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
      }
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var id = '#' + en.target.id;
            tocLinks.forEach(function (lk) { lk.classList.toggle('active', lk.getAttribute('href') === id); });
          }
        });
      }, { rootMargin: '-20% 0px -65% 0px' });
      ['mod-f0', 'mod-f1', 'mod-f2', 'mod-f3', 'mod-f4'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) obs.observe(el);
      });
    }

    
    
    
    
    

    try {
      var initT = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
      applyTheme(initT, true);
      var initL = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
      applyLang(initL, true);
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
    window.addEventListener('storage', function (ev) {
      if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
      if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAllCharts, 80);
    });

    runOptionalitySim();
    drawAllCharts();
  })();
  