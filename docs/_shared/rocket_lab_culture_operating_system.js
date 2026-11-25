
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_AUDIT_KEY = 'rklb_os_audit_v1';

    var state = {
      theme: document.documentElement.getAttribute('data-theme') || 'light',
      lang: 'zh',
      topo: 'rklb',
      quadIdx: 0,
      eraIdx: 2,
      eraChart: 'rdgp',
      genomeTab: 'growth'
    };

    function isEn() { return state.lang === 'en'; }

    function showToast(msg) {
      var sb = document.getElementById('muiSnackbar');
      sb.textContent = msg;
      sb.classList.add('show');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(function () { sb.classList.remove('show'); }, 2200);
    }

    // Suite Subfolder Hub
    var hubEl = document.getElementById('companySubfolderHub');
    hubEl.addEventListener('click', function (e) {
      var pill = e.target.closest('[data-co-cat]');
      if (pill) {
        var cat = pill.getAttribute('data-co-cat');
        hubEl.querySelectorAll('.co-hub-pill').forEach(function (b) { b.classList.toggle('active', b === pill); });
        hubEl.querySelectorAll('.co-hub-item').forEach(function (it) {
          var ic = it.getAttribute('data-co-item-cat');
          it.style.display = (cat === 'ALL' || ic === cat) ? 'flex' : 'none';
        });
        return;
      }
      var item = e.target.closest('.co-hub-item');
      if (item) {
        var pg = item.getAttribute('data-suite-page');
        if (item.classList.contains('active')) window.scrollTo({ top: 0, behavior: 'smooth' });
        else showToast(isEn() ? ('Suite Deliverable: ' + pg) : ('同系列独立交付网页：' + pg));
      }
    });

    // C0 Topology Sandbox
    var TOPO_DATA = {
      rklb: {
        nodes: [
          { cls: 'good', zhB: '节点 1 · 自研部组件零加价直供', enB: 'Node 1 · Zero-Markup In-House Subsystems', zhS: 'SolAero 光伏、Sinclair 飞轮、Mynaric 激光与 GEOST 载荷在同一 ERP 内部直调，省去 25%–40% 分包商层层加价。', enS: 'SolAero solar, Sinclair wheels, Mynaric optical links & GEOST sensors flow via one ERP with zero supplier markup stacking.' },
          { cls: 'good', zhB: '节点 2 · 模块化整星平台并行总装', enB: 'Node 2 · Modular Bus Parallel AIT', zhS: '长滩清白房并行总装 55+ 颗航天器（SDA Tranche 2/3、SB-AMTI），主任工程师端到端对交付期与 BOM 成本负责。', enS: 'Long Beach cleanrooms build 55+ spacecraft concurrently with single-threaded Responsible Engineer ownership.' },
          { cls: 'good', zhB: '节点 3 · 自有发射场与 8天造箭节拍', enB: 'Node 3 · Private Pads & 8-Day Rocket Tempo', zhS: '玛希亚 LC-1 与沃洛普斯 LC-2/LC-3 专属工位随时响应补网，Electron 单发成本压至 $5.0M，Neutron 承接整网部署。', enS: 'Private Mahia LC-1 and Wallops LC-2/LC-3 pads launch on demand at $5.0M/Electron while Neutron scales constellation deployment.' },
          { cls: 'good', zhB: '节点 4 · 在轨软件与星座现金流闭环', enB: 'Node 4 · Orbital Operations & Cash Loop', zhS: 'ASI MAX 飞控软件统一执管在轨星座，叠加拟并入的 Iridium $4.95亿 OEBITDA 现金流持续反哺下一代研发。', enS: 'ASI MAX flight software runs constellations on orbit while pending Iridium\'s $495M OEBITDA funds next-gen R&D.' }
        ],
        verdictZh: '<strong>拓扑诊断结论（Rocket Lab 垂直脊柱）：</strong>端到端交付周期较传统军工缩短 <strong>50%–65%</strong>，固定总价合同下 Non-GAAP 毛利率达 <strong>38.4%–40.7%</strong>，9M 2026 主业毛利已覆盖 <strong>96.1%</strong> GAAP 研发支出。',
        verdictEn: '<strong>Topology Verdict (Rocket Lab Vertical Spine):</strong> Compresses concept-to-orbit cycle time by <strong>50%–65%</strong>, delivers <strong>38.4%–40.7%</strong> Non-GAAP gross margin under firm-fixed-price awards, and covers <strong>96.1%</strong> of 9M26 GAAP R&D from gross profit.'
      },
      legacy: {
        nodes: [
          { cls: 'warn', zhB: '孤岛 1 · 三四级外部部组件分包', enB: 'Silo 1 · Tier-2/3 External Subcontractors', zhS: '太阳翼、星敏、激光终端分别采购自不同外部供应商，每层叠加 15%–25% 毛利与漫长合同谈判期。', enS: 'Solar arrays, star trackers, and laser links sourced across fragmented vendors, stacking 15%–25% margin markups per tier.' },
          { cls: 'warn', zhB: '孤岛 2 · 矩阵式委员会审批与定制化', enB: 'Silo 2 · Matrix Review Boards & Bespoke Specs', zhS: '每个防务项目重新定制底盘，设计变更需跨多个事业部利润中心会签，动辄触发数亿美元成本超支。', enS: 'Bespoke satellite buses require multi-division sign-off for every engineering change order, driving routine schedule slips.' },
          { cls: 'warn', zhB: '孤岛 3 · 外部火箭排队与工位受制', enB: 'Silo 3 · Captive to Third-Party Launch Queues', zhS: '缺乏自有高频中小型与中型一体发射闭环，卫星下线后常在地面仓储等待数月甚至一年以上发射窗口。', enS: 'Finished satellites wait months in storage for third-party launch manifest slots and shared federal range availability.' },
          { cls: 'warn', zhB: '孤岛 4 · 硬件一次性交付无长尾服务', enB: 'Silo 4 · One-Off Cost-Plus Delivery', zhS: '分部经营利润率普遍锁死在 8%–10% 区间，缺乏高毛利商业订阅服务现金流弹性。', enS: 'Operating margins stay capped near 8%–10% under cost-plus rules with limited high-margin commercial recurring revenue.' }
        ],
        verdictZh: '<strong>拓扑诊断结论（传统军工孤岛）：</strong>多级分包加价（Double Marginalization）与多套异构 ERP 吞噬利润与速度，导致传统航天分部经营利润率长期徘徊在 <strong>~9.5%</strong>、同比增速仅 <strong>~4%</strong>。',
        verdictEn: '<strong>Topology Verdict (Legacy Prime Silos):</strong> Multi-tier double marginalization and incompatible ERPs erode agility, leaving legacy space division operating margins near <strong>~9.5%</strong> at single-digit growth.'
      }
    };

    function renderTopology() {
      var d = TOPO_DATA[state.topo];
      document.getElementById('topoStage').innerHTML = d.nodes.map(function (n) {
        return '<div class="topo-node ' + n.cls + '"><b>' + (isEn() ? n.enB : n.zhB) + '</b><span>' + (isEn() ? n.enS : n.zhS) + '</span></div>';
      }).join('');
      document.getElementById('topoVerdict').innerHTML = isEn() ? d.verdictEn : d.verdictZh;
    }

    document.getElementById('topoSwitch').addEventListener('click', function (e) {
      var b = e.target.closest('[data-topo]');
      if (!b) return;
      state.topo = b.getAttribute('data-topo');
      document.querySelectorAll('#topoSwitch .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      renderTopology();
    });

    // C1 2x2 Quadrants & Dial Canvas
    var QUADS = [
      {
        badge: 'CAPEX DISCIPLINE',
        titleZh: 'CODE Q1 · 极致效率带宽配置', titleEn: 'CODE Q1 · Fierce Efficiency Allocation',
        bw: [92, 86, 88, 82],
        descZh: '将 92% 工程主导力投向高壁垒自制夹具与二手高精产线改造（如长滩前 Virgin Orbit 总部），把固定资产折旧摊销压至行业最低水平。',
        descEn: 'Concentrates 92% engineering ownership on proprietary robotic tooling and distressed asset conversion (e.g., Virgin Orbit Long Beach plant) to minimize depreciation drag.'
      },
      {
        badge: 'FLIGHT TRUTH',
        titleZh: 'CODE Q2 · 硬件实证与透明门禁', titleEn: 'CODE Q2 · Show Don\'t Tell Gate',
        bw: [95, 91, 84, 78],
        descZh: '在飞行安全关键件（如 Neutron 碳纤维前穹顶、Rutherford 电泵涡轮）保留 95% 首席工程师一票否决权，宁可短期推迟首飞也绝不牺牲入轨成功率。',
        descEn: 'Retains 95% Chief Engineer veto authority on flight-critical hardware (Neutron composite forward dome), trading short-term calendar optics for 100% orbital reliability.'
      },
      {
        badge: '8-DAY CADENCE',
        titleZh: 'CODE Q3 · 聪明速度与扁平授权', titleEn: 'CODE Q3 · Smart Speed Execution',
        bw: [84, 96, 87, 93],
        descZh: '赋予一线主任工程师（Responsible Engineer）高达 93% 的跨工序直接调度权，省去跨部门周会审批，支撑每 8 天下线 1 枚 Electron 火箭。',
        descEn: 'Grants frontline Responsible Engineers 93% cross-shop execution autonomy, eliminating committee bottlenecks to sustain an 8-day rocket build cadence.'
      },
      {
        badge: 'M&A FLYWHEEL',
        titleZh: 'CODE Q4 · 90天并购内化带宽', titleEn: 'CODE Q4 · 90-Day M&A Integration',
        bw: [89, 83, 97, 85],
        descZh: 'CFO Adam Spice 与 COO Frank Klein 团队在交割后 90 天内执行 97% 强度的 ERP、采购与良率工程整合（Mynaric Q3 单季即贡献 $2,600 万营收）。',
        descEn: 'Executes 97%-intensity ERP, supply-chain, and yield integration within 90 days post-close—evidenced by Mynaric generating $26.0M in Q3 2026 revenue.'
      }
    ];

    var tooltip = document.getElementById('chartTooltip');
    var hitMap = {};

    function setupCanvas(id) {
      var c = document.getElementById(id);
      var rect = c.parentElement.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(220, rect.width - 20);
      var h = Math.max(150, rect.height - 20);
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + 'px';
      c.style.height = h + 'px';
      var ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      return { ctx: ctx, w: w, h: h };
    }

    function palette() {
      var dark = state.theme === 'dark';
      return {
        text: dark ? '#F3F6F9' : '#0F1924',
        muted: dark ? '#94A3B8' : '#5B6B7C',
        grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(15,25,36,0.08)',
        blue: '#0073E6',
        cyan: dark ? '#38BDF8' : '#0284C7',
        green: dark ? '#4ADE80' : '#16A34A',
        amber: dark ? '#FBBF24' : '#D97706',
        violet: dark ? '#A78BFA' : '#7C3AED'
      };
    }

    function drawDialCanvas() {
      var q = QUADS[state.quadIdx] || QUADS[0];
      var avg = Math.round((q.bw[0] + q.bw[1] + q.bw[2] + q.bw[3]) / 4);
      var s = setupCanvas('dialCanvas');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var cx = w / 2, cy = h * 0.78;
      var rad = Math.min(w * 0.36, h * 0.64);

      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.strokeStyle = p.grid;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, Math.PI, 2 * Math.PI);
      ctx.stroke();

      var endAng = Math.PI + (avg / 100) * Math.PI;
      var grad = ctx.createLinearGradient(cx - rad, cy, cx + rad, cy);
      grad.addColorStop(0, '#0073E6');
      grad.addColorStop(1, '#22C55E');
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, Math.PI, endAng);
      ctx.stroke();

      ctx.fillStyle = p.text;
      ctx.font = '800 24px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(avg + ' / 100', cx, cy - 16);
      ctx.fillStyle = p.muted;
      ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(isEn() ? 'COMPOSITE OS INTENSITY' : '组织操作系统综合带宽指数', cx, cy + 4);
    }

    function renderQuadInspector() {
      var q = QUADS[state.quadIdx] || QUADS[0];
      document.getElementById('dialTitle').textContent = isEn() ? q.titleEn : q.titleZh;
      document.getElementById('dialBadge').textContent = q.badge;
      document.getElementById('dialDesc').textContent = isEn() ? q.descEn : q.descZh;
      for (var i = 0; i < 4; i++) {
        document.getElementById('bwVal' + i).textContent = q.bw[i] + '%';
        document.getElementById('bwFill' + i).style.width = q.bw[i] + '%';
      }
      drawDialCanvas();
    }

    document.getElementById('quadGrid').addEventListener('click', function (e) {
      var card = e.target.closest('[data-quad]');
      if (!card) return;
      state.quadIdx = parseInt(card.getAttribute('data-quad'), 10) || 0;
      document.querySelectorAll('#quadGrid .quad-card').forEach(function (c, idx) { c.classList.toggle('active', idx === state.quadIdx); });
      renderQuadInspector();
    });

    // C2 Era Governance Scrubber
    var ERAS = [
      {
        titleZh: 'Era I (2006–2016) · 奥克兰极客车间内核', titleEn: 'Era I (2006–2016) · Auckland Workshop Kernel',
        descZh: '治理结构：创始人彼得·贝克身兼总设计师与车间主任，不足百人精锐团队围绕 Atea-1 探空火箭与 Rutherford 3D打印电泵发动机单线程攻坚，确立“零外部供应链依赖”生存本能。',
        descEn: 'Governance: Founder-led single-threaded skunkworks (<100 engineers) inventing Rutherford 3D-printed battery-pumped engines and private Mahia LC-1 pad.',
        kpis: [
          { v: '<150', lZh: '核心工程师规模', lEn: 'Core Team Size' },
          { v: '1st', lZh: '全球电泵入轨发动机', lEn: 'Battery-Pump Engine' },
          { v: 'LC-1', lZh: '自建玛希亚私营发射场', lEn: 'Private Orbital Pad' },
          { v: '~$100M', lZh: 'Electron 入轨总研发费', lEn: 'Electron R&D to Orbit' }
        ]
      },
      {
        titleZh: 'Era II (2017–2024) · 美新双总部与部组件四连并购', titleEn: 'Era II (2017–2024) · Dual-Hub & Subsystem Roll-Up',
        descZh: '治理结构：总部迁入加州长滩对接五角大楼与 NASA，保留奥克兰制造母体；引入半导体财务老将 Adam Spice 担任 CFO，完成 Sinclair、ASI、PSC、SolAero 并购并打通统一 ERP，员工扩至 2,100 人，营收突破 $4.36 亿。',
        descEn: 'Governance: Dual US/NZ headquarters established; CFO Adam Spice institutionalized 90-day M&A integration across Sinclair, ASI, PSC & SolAero, scaling FY24 revenue to $436.2M across 2,100 staff.',
        kpis: [
          { v: '$436.2M', lZh: 'FY2024 合并营收', lEn: 'FY2024 Revenue' },
          { v: '26.6%', lZh: 'FY2024 GAAP 毛利率', lEn: 'FY2024 GAAP GM' },
          { v: '2,100', lZh: '2024 全球员工总数', lEn: 'FY2024 Employees' },
          { v: '71.2%', lZh: '太空系统营收占比', lEn: 'Space Systems Share' }
        ]
      },
      {
        titleZh: 'Era III (2025–2026+) · 国防主承包、Neutron 与 Iridium 星座帝国', titleEn: 'Era III (2025–2026+) · Defense Prime, Neutron & Iridium OS',
        descZh: '治理结构：COO Frank Klein 统管全球高节拍产线，6/7 独立董事（含前太空军副参谋长与前洛马 CFO）护航国家安全治理；CEO 主动降薪至 $1 并弃权 39.2万股 RSU；9M26 毛利覆盖 96.1% 研发，账握 $47.0 亿净现金推进 ~$80 亿 Iridium 并购。',
        descEn: 'Governance: COO Frank Klein scales 8-day rocket manufacturing alongside an 85.7% independent board; CEO $1 salary alignment; 9M26 GAAP GP covers 96.1% of R&D while +$4.70B net cash backs the ~$8.0B Iridium merger.',
        kpis: [
          { v: '$3.57B', lZh: 'Q3 2026 在手订单', lEn: 'Q3 2026 Backlog' },
          { v: '96.1%', lZh: '9M26 毛利覆盖研发率', lEn: '9M26 GP/R&D Cover' },
          { v: '3,217', lZh: '四国全球员工规模', lEn: 'Global Workforce' },
          { v: '+$7.2M', lZh: 'Q3 经营现金流转正', lEn: 'Q3 Positive OCF' }
        ]
      }
    ];

    function renderEraCard() {
      var e = ERAS[state.eraIdx] || ERAS[2];
      document.getElementById('eraCard').innerHTML =
        '<div><span class="mui-chip mui-chip-primary mono" style="margin-bottom:8px;">GOVERNANCE SNAPSHOT</span>' +
        '<h3 style="font-size:1.0rem;font-weight:800;margin-bottom:8px;">' + (isEn() ? e.titleEn : e.titleZh) + '</h3>' +
        '<p style="font-size:0.80rem;color:var(--text-secondary);line-height:1.62;">' + (isEn() ? e.descEn : e.descZh) + '</p></div>' +
        '<div class="era-kpis">' + e.kpis.map(function (k) {
          return '<div class="era-kpi"><b class="mono">' + k.v + '</b><span>' + (isEn() ? k.lEn : k.lZh) + '</span></div>';
        }).join('') + '</div>';
    }

    document.getElementById('eraTabs').addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-era]');
      if (!b) return;
      state.eraIdx = parseInt(b.getAttribute('data-era'), 10) || 0;
      document.querySelectorAll('#eraTabs .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      renderEraCard();
    });

    // Era Dual-View Chart: GP/R&D Coverage (%) vs Rev/FTE ($K)
    var ERA_LABELS = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', '9M/26E'];
    var GP_RD_COV = [-4.5, 29.2, 43.8, 66.6, 76.5, 96.1]; // Verified: FY24 116.15/174.39=66.6%, FY25 207.18/270.72=76.5%, 9M26 251.14/261.33=96.1%
    var REV_EMP = [52.6, 150.7, 148.2, 207.7, 231.5, 305.3];

    function drawEraCanvas() {
      var s = setupCanvas('eraCanvas');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var pad = { t: 22, r: 22, b: 30, l: 48 };
      var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
      var hits = [];
      var isCov = state.eraChart === 'rdgp';
      var arr = isCov ? GP_RD_COV : REV_EMP;
      var minY = isCov ? -10 : 0;
      var maxY = isCov ? 110 : 340;

      ctx.strokeStyle = p.grid;
      ctx.font = '600 11px "IBM Plex Mono", monospace';
      for (var g = 0; g <= 4; g++) {
        var gy = pad.t + (ch * g / 4);
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        var v = Math.round(maxY - (maxY - minY) * (g / 4));
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'right';
        ctx.fillText(isCov ? (v + '%') : ('$' + v + 'K'), pad.l - 6, gy + 4);
      }

      var n = ERA_LABELS.length, step = cw / n;
      ctx.strokeStyle = isCov ? p.blue : p.green;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      arr.forEach(function (val, idx) {
        var px = pad.l + step * (idx + 0.5);
        var py = pad.t + ch - ((val - minY) / (maxY - minY)) * ch;
        if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();

      arr.forEach(function (val, idx) {
        var px = pad.l + step * (idx + 0.5);
        var py = pad.t + ch - ((val - minY) / (maxY - minY)) * ch;
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'center';
        ctx.fillText(ERA_LABELS[idx], px, h - 8);
        ctx.fillStyle = isCov ? p.blue : p.green;
        ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = p.text;
        ctx.fillText(isCov ? (val.toFixed(1) + '%') : ('$' + val.toFixed(0) + 'K'), px, py - 9);
        hits.push({
          x: px - 16, y: pad.t, w: 32, h: ch,
          html: '<b>' + ERA_LABELS[idx] + '</b><br/>' + (isCov ? ('GAAP GP / R&D Coverage: <b>' + val.toFixed(1) + '%</b>') : ('Implied Rev / Employee: <b>$' + val.toFixed(1) + 'K</b>'))
        });
      });
      hitMap.eraCanvas = hits;
    }

    document.getElementById('eraChartTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-era-chart]');
      if (!b) return;
      state.eraChart = b.getAttribute('data-era-chart');
      document.querySelectorAll('#eraChartTabs .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      drawEraCanvas();
    });

    // C3 Genome Horizontal Bar Chart
    var GENOME_PEERS = [
      { name: 'Rocket Lab (RKLB)', growth: 72.7, margin: 36.2, rklb: true },
      { name: 'Intuitive Machines', growth: 58.0, margin: 17.4, rklb: false },
      { name: 'Firefly Aerospace', growth: 44.0, margin: 22.9, rklb: false },
      { name: 'SpaceX (Est.)', growth: 38.0, margin: 47.0, rklb: false },
      { name: 'Planet Labs (PL)', growth: 18.0, margin: 55.4, rklb: false },
      { name: 'Redwire (RDW)', growth: 12.0, margin: 24.1, rklb: false },
      { name: 'Lockheed Space', growth: 4.1, margin: 9.5, rklb: false }
    ];

    function drawGenomeCanvas() {
      var s = setupCanvas('genomeCanvas');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var pad = { t: 10, r: 58, b: 14, l: 145 };
      var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
      var hits = [];
      var isGr = state.genomeTab === 'growth';
      var maxV = isGr ? 80 : 62;
      var rowH = ch / GENOME_PEERS.length;

      GENOME_PEERS.forEach(function (pr, idx) {
        var y = pad.t + idx * rowH + rowH * 0.18;
        var bh = rowH * 0.64;
        var val = isGr ? pr.growth : pr.margin;
        var bw = Math.max(4, (val / maxV) * cw);

        ctx.fillStyle = pr.rklb ? p.text : p.muted;
        ctx.font = (pr.rklb ? '800 ' : '600 ') + '11px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(pr.name, pad.l - 8, y + bh * 0.7);

        ctx.fillStyle = pr.rklb ? p.blue : p.cyan;
        ctx.beginPath();
        ctx.roundRect(pad.l, y, bw, bh, 5);
        ctx.fill();

        ctx.fillStyle = p.text;
        ctx.font = '700 11px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(val.toFixed(1) + '%', pad.l + bw + 7, y + bh * 0.7);

        hits.push({
          x: pad.l, y: y, w: cw, h: bh,
          html: '<b>' + pr.name + '</b><br/>YoY Growth: <b>+' + pr.growth.toFixed(1) + '%</b><br/>GAAP GM / OpM: <b>' + pr.margin.toFixed(1) + '%</b>'
        });
      });
      hitMap.genomeCanvas = hits;
    }

    document.getElementById('genomeTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-gen-tab]');
      if (!b) return;
      state.genomeTab = b.getAttribute('data-gen-tab');
      document.querySelectorAll('#genomeTabs .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      drawGenomeCanvas();
    });

    // C4 Entropy Simulator
    function runEntropySim() {
      var prog = parseInt(document.getElementById('entPrograms').value, 10) || 12;
      var vert = parseInt(document.getElementById('entVertical').value, 10) || 82;
      var lag = parseInt(document.getElementById('entLag').value, 10) || 3;

      document.getElementById('entLblProg').textContent = prog + (isEn() ? ' Programs' : ' 个');
      document.getElementById('entLblVert').textContent = vert + '%';
      document.getElementById('entLblLag').textContent = lag + (isEn() ? ' Mos' : ' 个月');

      var synergy = Math.max(32, Math.min(99, Math.round(vert * 0.92 + 24 - lag * 1.8 - Math.max(0, prog - 14) * 1.1)));
      var velocity = Math.max(28, Math.min(98, Math.round(94 - lag * 2.4 - Math.max(0, prog - 10) * 1.4 + (vert - 60) * 0.35)));
      var marginDelta = ((vert - 50) * 0.18 - lag * 0.28 - Math.max(0, prog - 16) * 0.15).toFixed(1);

      document.getElementById('scoreSynergy').textContent = synergy + '/100';
      document.getElementById('scoreVelocity').textContent = velocity + '/100';
      document.getElementById('scoreMargin').textContent = (parseFloat(marginDelta) >= 0 ? '+' : '') + marginDelta + 'pp';

      var s = setupCanvas('entropyCanvas');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var pad = { t: 16, r: 18, b: 26, l: 40 };
      var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
      var hits = [];

      ctx.strokeStyle = p.grid;
      ctx.font = '600 10.5px "IBM Plex Mono", monospace';
      for (var g = 0; g <= 3; g++) {
        var gy = pad.t + (ch * g / 3);
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(100 - (100 * g / 3)), pad.l - 6, gy + 4);
      }

      var rklbPts = [], siloPts = [];
      for (var q = 0; q <= 5; q++) {
        var v1 = Math.max(25, Math.min(99, velocity - q * (lag * 0.35) + q * ((vert - 65) * 0.12)));
        var v2 = Math.max(20, 72 - q * 6.5 - Math.max(0, prog - 8) * 0.9);
        rklbPts.push(v1);
        siloPts.push(v2);
      }

      function drawCurve(pts, col, dash) {
        ctx.save();
        if (dash) ctx.setLineDash([4, 4]);
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        pts.forEach(function (v, idx) {
          var px = pad.l + (cw * idx / 5);
          var py = pad.t + ch - (v / 100) * ch;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.restore();
      }
      drawCurve(siloPts, p.amber, true);
      drawCurve(rklbPts, p.blue, false);

      for (var m = 0; m <= 5; m++) {
        var px = pad.l + (cw * m / 5);
        var py = pad.t + ch - (rklbPts[m] / 100) * ch;
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'center';
        ctx.fillText('Y' + m, px, h - 6);
        ctx.fillStyle = p.blue;
        ctx.beginPath(); ctx.arc(px, py, 3.8, 0, Math.PI * 2); ctx.fill();
        hits.push({
          x: px - 14, y: pad.t, w: 28, h: ch,
          html: '<b>Year +' + m + '</b><br/>Single-ERP OS Efficiency: <b>' + rklbPts[m].toFixed(0) + '</b><br/>Unintegrated Silo Decay: <b>' + siloPts[m].toFixed(0) + '</b>'
        });
      }
      hitMap.entropyCanvas = hits;
    }

    ['entPrograms', 'entVertical', 'entLag'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', runEntropySim);
    });

    function bindHover(id) {
      var c = document.getElementById(id);
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var mx = e.clientX - r.left, my = e.clientY - r.top;
        var list = hitMap[id] || [];
        var hit = null;
        for (var i = 0; i < list.length; i++) {
          var b = list[i];
          if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) { hit = b; break; }
        }
        if (hit) {
          tooltip.innerHTML = hit.html;
          tooltip.style.display = 'block';
          tooltip.style.left = Math.min(window.innerWidth - 250, e.clientX + 14) + 'px';
          tooltip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, e.clientY - 34)) + 'px';
        } else {
          tooltip.style.display = 'none';
        }
      });
      c.addEventListener('mouseleave', function () { tooltip.style.display = 'none'; });
    }
    ['eraCanvas', 'genomeCanvas', 'entropyCanvas'].forEach(bindHover);

    // 6-Law OS Audit Persistence
    var auditState = { l1: true, l2: true, l3: true, l4: true, l5: true, l6: true };
    try {
      var raw = localStorage.getItem(STORAGE_AUDIT_KEY);
      if (raw) auditState = JSON.parse(raw);
    } catch (e) {}

    function syncAuditUI() {
      var boxes = document.querySelectorAll('[data-os-law]');
      var cnt = 0;
      boxes.forEach(function (cb) {
        var k = cb.getAttribute('data-os-law');
        cb.checked = !!auditState[k];
        if (cb.checked) cnt++;
      });
      var chip = document.getElementById('auditScoreChip');
      chip.textContent = cnt + ' / ' + boxes.length + (isEn() ? ' LAWS ACTIVE' : ' 铁律在线');
      chip.className = 'mui-chip mono ' + (cnt >= 5 ? 'mui-chip-success' : (cnt >= 3 ? 'mui-chip-warning' : 'mui-chip-error'));
    }

    document.getElementById('cultureAuditList').addEventListener('change', function (e) {
      var cb = e.target.closest('[data-os-law]');
      if (!cb) return;
      auditState[cb.getAttribute('data-os-law')] = cb.checked;
      try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(auditState)); } catch (err) {}
      syncAuditUI();
    });
    document.getElementById('auditToggleAllBtn').addEventListener('click', function () {
      var boxes = document.querySelectorAll('[data-os-law]');
      var allChecked = Array.prototype.every.call(boxes, function (b) { return b.checked; });
      boxes.forEach(function (b) { auditState[b.getAttribute('data-os-law')] = !allChecked; });
      try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(auditState)); } catch (err) {}
      syncAuditUI();
    });

    function drawAllCharts() {
      drawDialCanvas();
      drawEraCanvas();
      drawGenomeCanvas();
      runEntropySim();
    }

    // Quick Jump
    var QUICK_ITEMS = [
      { id: 'sec-c0', t: 'C0 跨洋全栈组织拓扑沙盘', s: 'Rocket Lab 单一ERP垂直脊柱 vs 传统军工四级分包孤岛' },
      { id: 'sec-c1', t: 'C1 2×2 操作码与工程带宽罗盘', s: 'Fierce Efficiency · Show Don\'t Tell · Smart Speed · M&A' },
      { id: 'sec-c2', t: 'C2 三代治理演进与研发自造血', s: '9M26 GAAP毛利覆盖96.1%研发 · 人均创收跃升至$305.3K' },
      { id: 'sec-c3', t: 'C3 全球组织基因竞技与阴阳对立', s: '7大太空防务企业增速/利润率对比 + 三组阴阳张力' },
      { id: 'sec-c4', t: 'C4 扩张熵增推演与六大铁律审计', s: '多项目与Iridium并购整合模拟器 + 6项OS铁律自检' }
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
        e.preventDefault(); qInput.focus();
      } else if (e.key === 'Escape') {
        qPop.classList.remove('open');
        document.body.classList.remove('portal-detail-drawer');
      }
    });

    function applyTheme(mode, silent) {
      var t = mode === 'dark' ? 'dark' : 'light';
      state.theme = t;
      document.documentElement.setAttribute('data-theme', t);
      
      
      document.getElementById('appbarThemeIcon').innerHTML = t === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
      drawAllCharts();
      if (!silent) showToast(t === 'dark' ? (isEn() ? 'Switched to Dark Obsidian' : '已切换至深色曜石主题') : (isEn() ? 'Switched to Light Mode' : '已切换至高清晰浅色主题'));
    }

    function applyLang(lang, silent) {
      state.lang = lang === 'en' ? 'en' : 'zh';
      document.documentElement.setAttribute('lang', state.lang === 'en' ? 'en' : 'zh-CN');
      document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
      document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
      document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
        var txt = el.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
        if (txt !== null) el.textContent = txt;
      });
      qInput.placeholder = isEn() ? 'Jump to module C0–C4…' : '检索组织模块 C0–C4…';
      renderTopology();
      renderQuadInspector();
      renderEraCard();
      syncAuditUI();
      drawAllCharts();
      if (!silent) showToast(isEn() ? 'Language set to English' : '已切换为中文界面');
    }

    function triggerDownload() {
      var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = '火箭实验室_Rocket_Lab_企业文化与组织操作系统.html';
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

    var mods = Array.prototype.slice.call(document.querySelectorAll('.os-module'));
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('#tocList .mui-nav-link'));
    window.addEventListener('scroll', function () {
      var bar = document.getElementById('readingProgressBar');
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
      var cur = mods[0] ? mods[0].id : '';
      for (var i = 0; i < mods.length; i++) {
        if (mods[i].getBoundingClientRect().top <= 130) cur = mods[i].id;
      }
      tocLinks.forEach(function (lk) { lk.classList.toggle('active', lk.getAttribute('href') === '#' + cur); });
    }, { passive: true });

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

    try {
      applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
    } catch (e) {
      renderTopology();
      renderQuadInspector();
      renderEraCard();
      syncAuditUI();
      drawAllCharts();
    }
  })();
  