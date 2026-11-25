
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_OS_CHK_KEY = 'amzn_org_os_audit_v1';

    var state = {
      theme: document.documentElement.getAttribute('data-theme') || 'light',
      lang: 'zh',
      topo: 'amzn',
      bw: 'startup',
      era: 2,
      c2View: 'revemp',
      peer: 'aapl'
    };

    var hitRegions = { topologyCanvas: [], bandwidthCanvas: [], leverageCanvas: [], genomeCanvas: [] };

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
        blueSoft: dark ? 'rgba(51, 153, 255, 0.20)' : 'rgba(0, 115, 230, 0.14)',
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
      var w = Math.max(260, rect.width || 500);
      var h = Math.max(180, rect.height || 275);
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

    // C0 Topology Switcher & Canvas
    var TOPO_COPY = {
      amzn: {
        rule: '康威定律正向工程：所有团队只允许通过标准化服务 API 通信，禁止跨部门会议拉扯 → 催生 FBA 与 AWS',
        desc: '在亚马逊拓扑中，S-Team 仅设定资本分配、16条领导力准则与安全护栏；每个不超 10 人的双披萨团队由一名 100% 专注的单线程领导者（STL）统领，直接调用内部标准 API 极速上线——典型战例如 2025 年仅 6 名工程师用 76 天便从零写出 Bedrock Mantle 核心推理引擎。',
        chip: 'O(1) API Calls'
      },
      silo: {
        rule: '传统科层反面教材：N 个职能孤岛两两协调产生 N(N-1)/2 条会议审批链 → 陷入“会前预备会”泥潭',
        desc: '在传统巨型企业的层级矩阵中，上线一个新功能需要跨越产品、前端、底层数据库、物流与法务五个副总裁部门层层签字排期；任何一个中层经理基于风险厌恶说“No”，创新就会在无休止的对齐周会中慢性死亡（Bezos 称之为 Day 2 停滞）。',
        chip: 'O(N²) Approval Bottleneck'
      }
    };

    var topoTabs = document.getElementById('topoTabs');
    if (topoTabs) {
      topoTabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-topo]');
        if (!b) return;
        state.topo = b.getAttribute('data-topo');
        topoTabs.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
        var cp = TOPO_COPY[state.topo];
        document.getElementById('topoRule').textContent = cp.rule;
        document.getElementById('topoDesc').textContent = cp.desc;
        document.getElementById('topoChip').textContent = cp.chip;
        drawTopologyCanvas();
      });
    }

    function drawTopologyCanvas() {
      var env = prepCanvas('topologyCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.topologyCanvas = [];

      if (state.topo === 'amzn') {
        var cx = w / 2, cy = h / 2 + 6;
        // Central API Bus Ring
        ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.2; ctx.setLineDash([5, 4]);
        ctx.beginPath(); ctx.arc(cx, cy, Math.min(w, h) * 0.31, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);

        // Center Bus Hub
        ctx.fillStyle = pal.blueSoft;
        roundRect(ctx, cx - 64, cy - 22, 128, 44, 10); ctx.fill();
        ctx.strokeStyle = pal.blue; ctx.lineWidth = 1.6; ctx.stroke();
        ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('STANDARD SERVICE', cx, cy - 4);
        ctx.fillText('API BUS (S-Team)', cx, cy + 12);

        var pods = [
          { n: 'STL · AWS Bedrock', a: -Math.PI / 2, c: pal.blue, tip: '双披萨团队通过标准 API 独立迭代，6名工程师76天交付 Mantle' },
          { n: 'STL · Trainium 硅片', a: -Math.PI / 6, c: pal.violet, tip: 'Annapurna Labs 单线程硬件/编译器一体自治小队' },
          { n: 'STL · 当日达机器人', a: Math.PI / 6, c: pal.green, tip: '独立掌控仓储机器人算法与微仓补货接口' },
          { n: 'STL · Rufus / Alexa+', a: Math.PI / 2, c: pal.green, tip: '直接调用商品目录与结账 API，无需跨部门排期审批' },
          { n: 'STL · 闭环广告竞价', a: 5 * Math.PI / 6, c: pal.amber, tip: '毫秒级广告竞价引擎以 API 嵌入搜索与 Prime Video' },
          { n: 'STL · Leo / Zoox', a: -5 * Math.PI / 6, c: pal.violet, tip: '前沿新物种单线程隔离保护，避免被成熟主业短期KPI扼杀' }
        ];
        var rx = Math.min(w * 0.37, 175), ry = Math.min(h * 0.37, 104);
        pods.forEach(function (p) {
          var px = cx + Math.cos(p.a) * rx;
          var py = cy + Math.sin(p.a) * ry;
          ctx.strokeStyle = p.c; ctx.lineWidth = 1.8;
          ctx.beginPath(); ctx.moveTo(cx + Math.cos(p.a) * 56, cy + Math.sin(p.a) * 24); ctx.lineTo(px, py); ctx.stroke();
          ctx.fillStyle = pal.dark ? '#132337' : '#FFFFFF';
          roundRect(ctx, px - 58, py - 15, 116, 30, 8); ctx.fill();
          ctx.strokeStyle = p.c; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(p.n, px, py + 4);
          hitRegions.topologyCanvas.push({ x: px - 58, y: py - 15, w: 116, h: 30, title: p.n, body: p.tip });
        });
      } else {
        // Hierarchical Bottleneck Pyramid
        var levels = [
          { y: 34, boxes: ['集团委员会审批 (HQ Committee)'], col: pal.amber },
          { y: 98, boxes: ['VP 部门墙 A', 'VP 部门墙 B', 'VP 部门墙 C'], col: pal.red },
          { y: 164, boxes: ['中层协调会 1', '中层协调会 2', '预备对齐会 3', '排期评审会 4'], col: pal.amber },
          { y: 232, boxes: ['一线工程师等待排期與签字 (Blocked Builders)'], col: pal.tick }
        ];
        levels.forEach(function (lv, li) {
          var cnt = lv.boxes.length;
          var slot = (w - 32) / cnt;
          lv.boxes.forEach(function (txt, bi) {
            var bx = 16 + bi * slot + 6;
            var bw = slot - 12;
            ctx.fillStyle = pal.dark ? '#172030' : '#F8FAFC';
            roundRect(ctx, bx, lv.y - 15, bw, 30, 7); ctx.fill();
            ctx.strokeStyle = lv.col; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(txt, bx + bw / 2, lv.y + 4);
            if (li < levels.length - 1) {
              ctx.strokeStyle = pal.red; ctx.lineWidth = 1.1; ctx.setLineDash([3, 3]);
              ctx.beginPath(); ctx.moveTo(bx + bw / 2, lv.y + 15); ctx.lineTo(w / 2, levels[li + 1].y - 15); ctx.stroke();
              ctx.setLineDash([]);
            }
            hitRegions.topologyCanvas.push({
              x: bx, y: lv.y - 15, w: bw, h: 30,
              title: txt,
              body: 'Day 2 科层熵增症状：多层传声筒与跨部门否决权吞噬一线创新速度'
            });
          });
        });
      }
    }

    // C1 Builder Bandwidth Canvas
    var bwTabs = document.getElementById('bwTabs');
    if (bwTabs) {
      bwTabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-bw]');
        if (!b) return;
        state.bw = b.getAttribute('data-bw');
        bwTabs.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
        drawBandwidthCanvas();
      });
    }

    function drawBandwidthCanvas() {
      var env = prepCanvas('bandwidthCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.bandwidthCanvas = [];
      var rows = state.bw === 'startup'
        ? [
            { n: '直接面向客户的编码、实验与产品交付 (Shipping)', v: 68, col: pal.green, tip: 'STL 单线程自治 + Kiro AI 编程将近七成带宽聚焦于客户价值创造' },
            { n: '6页纸深度思考、PR/FAQ 架构推演与指标复盘 (WBR)', v: 18, col: pal.blue, tip: '高信噪比书面异步推演替代低效PPT口水会' },
            { n: '跨团队标准 API 契约对齐与运维守卫 (API SLA)', v: 9, col: pal.violet, tip: '通过服务等级协议（SLA）而非人工拉群对齐依赖' },
            { n: '行政汇报、层级审批与预备会损耗 (Bureaucracy)', v: 5, col: pal.amber, tip: '反官僚信箱废除 150+ 规章并压减中层传声筒后的极低损耗' }
          ]
        : [
            { n: '直接面向客户的编码、实验与产品交付 (Shipping)', v: 41, col: pal.blue, tip: '2020–2022 员工翻倍期，沟通协调摩擦显著挤压有效产出时间' },
            { n: '6页纸深度思考、PR/FAQ 架构推演与指标复盘 (WBR)', v: 16, col: pal.violet, tip: '核心书面机制仍在，但衍生出冗余的会前对表' },
            { n: '跨部门排期拉扯与依赖等待 (Cross-Silo Friction)', v: 24, col: pal.amber, tip: '团队边界膨胀导致多部门排期博弈加剧' },
            { n: '行政汇报、层级审批与“会前预备会” (Pre-Meetings)', v: 19, col: pal.red, tip: '正是触发 Andy Jassy 2024.09 组织扁平化改革的核心痛点' }
          ];
      var pad = { top: 18, right: 48, bottom: 14, left: 16 };
      var rH = (h - pad.top - pad.bottom) / rows.length;
      rows.forEach(function (r, idx) {
        var y = pad.top + idx * rH;
        ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(r.n, pad.left, y + 15);
        var trackW = w - pad.left - pad.right;
        ctx.fillStyle = pal.grid;
        roundRect(ctx, pad.left, y + 23, trackW, 16, 5); ctx.fill();
        var fillW = (r.v / 100) * trackW;
        ctx.fillStyle = r.col;
        roundRect(ctx, pad.left, y + 23, fillW, 16, 5); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 11.5px "IBM Plex Mono", monospace';
        ctx.fillText(r.v + '%', pad.left + trackW + 7, y + 35);
        hitRegions.bandwidthCanvas.push({ x: pad.left, y: y + 4, w: w - 24, h: rH - 6, title: r.n, body: r.tip });
      });
    }

    // C2 3-Era Scrubber & Leverage Canvas
    var ERAS = [
      {
        title: 'Era I（1994–2005）：车库门办公桌、1997 Day 1 宪章与 2002 API 法令奠基',
        body: 'Jeff Bezos 用一扇旧木门加四条腿钉成办公桌（Door Desk），确立“只在客户体验处花钱、不在门面排场花钱”的节俭基因；1997 年首封致股东信写下“永远聚焦长期自由现金流折现而非短期会计利润”与“股权绑定主人翁”铁律；2002 年颁布传奇 API 法令，强制将内部单体电商拆解为面向服务架构（SOA），直接埋下 AWS 云帝国的种子。',
        pills: ['1997 Day 1 宪章', '2002 Bezos API 法令', '2004 禁用 PPT 改 6页纸']
      },
      {
        title: 'Era II（2006–2021）：AWS / Prime / FBA 三大引擎裂变与全球百万员工扩张',
        body: '逆向工作法（PR/FAQ）与单线程领导者（STL）进入全面丰收期：S3 与 EC2 开创现代公有云，FBA 让第三方卖家件数占比历史性超越自营，Prime 视频与 Echo/Alexa 走进亿万家庭。2020–2021 疫情期间亚马逊为承接暴增需求在两年内把物流与研发规模扩充近一倍至 160.8 万人，但也伴生了管理层级变厚与成本超调。',
        pills: ['AWS & FBA 爆发', '2021 新增完美雇主/地球责任准则', '员工突破 160.8 万人']
      },
      {
        title: 'Era III（2022–2026+）：Andy Jassy 刀刃向内——从疫情过剩回归“全球最大初创企业”',
        body: '2022 年高通胀与疫后增速放缓曾令亚马逊营业利润率一度跌至 2.4%（净亏损 $27.2亿）。接任 CEO 的 Andy Jassy 展现出极强战略定力：先将全美履约网重构为 8 大区域并关停缺乏规模前景的边缘项目；继而在 2024 年 9 月颁布组织重塑令——要求 2025 Q1 底前将个人贡献者（IC）与管理者比例提高至少 15%、恢复每周 5 天办公室现场敏捷共创、设立直通高管的“反官僚信箱（Bureaucracy Mailbox）”。成效立竿见影：TTM 人均创收从 FY22 的 $33.4万 飙升 +46% 至 Q3 2026 的 $48.7万，G&A 费率压降至 1.34%，集团单季营业利润率飙至史无前例的 13.9%。',
        pills: ['IC/Manager +15%', 'Rev/Emp $334K → $487K', 'OpM 2.4% → 13.9%']
      }
    ];

    var eraBar = document.getElementById('eraBar');
    if (eraBar) {
      eraBar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-era]');
        if (!b) return;
        state.era = parseInt(b.getAttribute('data-era'), 10) || 0;
        eraBar.querySelectorAll('.os-era-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
        var ed = ERAS[state.era];
        document.getElementById('eraTitle').textContent = ed.title;
        document.getElementById('eraBody').textContent = ed.body;
        document.getElementById('eraPills').innerHTML = ed.pills.map(function (p, i) {
          var cls = ['mui-chip-primary', 'mui-chip-success', 'mui-chip-violet'][i % 3];
          return '<span class="mui-chip ' + cls + ' mono">' + p + '</span>';
        }).join('');
      });
    }

    var c2Tabs = document.getElementById('c2Tabs');
    if (c2Tabs) {
      c2Tabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-c2]');
        if (!b) return;
        state.c2View = b.getAttribute('data-c2');
        c2Tabs.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
        drawLeverageCanvas();
      });
    }

    function drawLeverageCanvas() {
      var env = prepCanvas('leverageCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.leverageCanvas = [];
      var pad = { top: 28, right: 42, bottom: 40, left: 50 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', "TTM Q3'26"];

      if (state.c2View === 'revemp') {
        var revEmp = [292, 334, 377, 410, 455, 487]; // $K per employee
        var opm = [5.3, 2.4, 6.4, 10.8, 11.2, 13.1]; // % (Q3 single quarter 13.9%)
        var maxR = 540;
        for (var g = 0; g <= 4; g++) {
          var sv = (maxR / 4) * g;
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round(sv) + 'K', pad.left - 6, gy + 4);
          ctx.textAlign = 'left';
          ctx.fillText((g * 4) + '%', pad.left + pw + 6, gy + 4);
        }
        var slot = pw / yrs.length, bw = Math.min(36, slot * 0.52);
        yrs.forEach(function (y, i) {
          var cx = pad.left + i * slot + slot / 2;
          var bh = (revEmp[i] / maxR) * ph;
          var by = pad.top + ph - bh;
          ctx.fillStyle = i === 5 ? pal.blue : pal.blueSoft;
          roundRect(ctx, cx - bw / 2, by, bw, bh, 5); ctx.fill();
          if (i < 5) { ctx.strokeStyle = pal.blue; ctx.lineWidth = 1.2; ctx.stroke(); }
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + revEmp[i] + 'K', cx, by - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
          ctx.fillText(y, cx, pad.top + ph + 18);
          hitRegions.leverageCanvas.push({
            x: cx - bw / 2, y: by, w: bw, h: bh,
            title: y + ' 人均创收与利润率',
            body: '人均年营收 $' + revEmp[i] + 'K · 营业利润率 ' + opm[i] + '%（Q3\'26 单季更达 13.9% 历史极值）'
          });
        });
        ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
        yrs.forEach(function (y, i) {
          var cx = pad.left + i * slot + slot / 2;
          var py = pad.top + ph - (opm[i] / 16) * ph;
          if (i === 0) ctx.moveTo(cx, py); else ctx.lineTo(cx, py);
        });
        ctx.stroke();
        yrs.forEach(function (y, i) {
          var cx = pad.left + i * slot + slot / 2;
          var py = pad.top + ph - (opm[i] / 16) * ph;
          ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(cx, py, 4.2, 0, Math.PI * 2); ctx.fill();
        });
      } else {
        var periods = ['FY22', 'FY23', 'FY24', 'FY25', "Q3'26 单季"];
        var techPct = [14.2, 14.9, 13.9, 15.1, 17.2]; // Tech & Infra % of sales
        var gaPct = [2.31, 2.06, 1.78, 1.56, 1.34];   // G&A % of sales
        var maxP = 20;
        for (var k = 0; k <= 4; k++) {
          var pv = (maxP / 4) * k;
          var pgy = pad.top + ph - (k / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pgy); ctx.lineTo(pad.left + pw, pgy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(pv + '%', pad.left - 6, pgy + 4);
        }
        var pSlot = pw / periods.length, pBw = Math.min(28, pSlot * 0.34);
        periods.forEach(function (p, i) {
          var cx = pad.left + i * pSlot + pSlot / 2;
          var hT = (techPct[i] / maxP) * ph;
          var hG = (gaPct[i] / maxP) * ph;
          ctx.fillStyle = pal.violet;
          roundRect(ctx, cx - pBw - 2, pad.top + ph - hT, pBw, hT, 4); ctx.fill();
          ctx.fillStyle = pal.amber;
          roundRect(ctx, cx + 2, pad.top + ph - hG, pBw, Math.max(4, hG), 4); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(techPct[i] + '%', cx - pBw / 2 - 2, pad.top + ph - hT - 5);
          ctx.fillText(gaPct[i] + '%', cx + pBw / 2 + 2, pad.top + ph - hG - 5);
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
          ctx.fillText(p, cx, pad.top + ph + 18);
          hitRegions.leverageCanvas.push({
            x: cx - pBw - 4, y: pad.top, w: pBw * 2 + 8, h: ph,
            title: p + ' 技术投入 vs 行政损耗',
            body: '技术与基础设施占比 ' + techPct[i] + '% vs 一般及行政管理 (G&A) 仅 ' + gaPct[i] + '%'
          });
        });
      }
    }

    // C3 6-Axis Cultural Genome Radar
    var PEERS = {
      aapl: {
        name: 'Apple (AAPL)',
        scores: [22, 98, 25, 92, 55, 86],
        summary: '<strong>AMZN vs AAPL 核心镜像：</strong>苹果追求“千次说不、全公司押注唯一最优解”，靠职能专家制打磨出 47%+ 毛利的极致硬件；亚马逊则信奉“2 > 0 并行探索 + 双向门快速试错”，允许 Fire Phone 失败但孵化出 AWS、FBA、Prime、Alexa+ 与 Leo 多条千亿级新物种。'
      },
      msft: {
        name: 'Microsoft (MSFT)',
        scores: [64, 72, 68, 76, 80, 74],
        summary: '<strong>AMZN vs MSFT 对比：</strong>纳德拉治下的微软擅长“企业级套装捆绑（Teams/M365/Azure）与战略投资结盟（OpenAI）”；亚马逊则更强调底层原语自研（Annapurna 芯片 + Bedrock 多模型中立）与书面的 6页纸工程严谨度。'
      },
      wmt: {
        name: 'Walmart (WMT)',
        scores: [45, 78, 38, 62, 74, 88],
        summary: '<strong>AMZN vs WMT 对比：</strong>两者同享“天天平价 + 极度节俭”基因，但沃尔玛是以 4,600+ 大卖场店长为支点的零售运营机器，而亚马逊是以 API 解耦软件工程师为核心、将仓库与服务器外溢变现的科技基建平台。'
      },
      brk: {
        name: 'Berkshire (BRK)',
        scores: [96, 35, 30, 88, 95, 97],
        summary: '<strong>AMZN vs BRK 对比：</strong>伯克希尔将分权推向极致（收购成熟现金牛后完全放手）；亚马逊则通过统一 API 总线、16条领导力准则与周度 WBR 指标仪表盘，在分权敏捷的同时保持内部飞轮紧密咬合。'
      }
    };
    var AMZN_SCORES = [94, 62, 96, 95, 94, 93];
    var AXES = ['API分权自治', '职能中央集权', '并行试错(2>0)', '书面工程严谨', '长久期现金流', '反排场节俭度'];

    var peerTabs = document.getElementById('peerTabs');
    if (peerTabs) {
      peerTabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-peer]');
        if (!b) return;
        state.peer = b.getAttribute('data-peer');
        peerTabs.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
        document.getElementById('peerSummary').innerHTML = PEERS[state.peer].summary;
        drawGenomeCanvas();
      });
    }

    function drawGenomeCanvas() {
      var env = prepCanvas('genomeCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var cx = w / 2, cy = h / 2 + 4;
      var radius = Math.min(w * 0.34, h * 0.38);

      for (var ring = 1; ring <= 4; ring++) {
        var rr = (radius / 4) * ring;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
        ctx.beginPath();
        for (var a = 0; a < 6; a++) {
          var ang = -Math.PI / 2 + (a * Math.PI * 2) / 6;
          var rx = cx + Math.cos(ang) * rr, ry = cy + Math.sin(ang) * rr;
          if (a === 0) ctx.moveTo(rx, ry); else ctx.lineTo(rx, ry);
        }
        ctx.closePath(); ctx.stroke();
      }

      for (var k = 0; k < 6; k++) {
        var angK = -Math.PI / 2 + (k * Math.PI * 2) / 6;
        var ex = cx + Math.cos(angK) * radius, ey = cy + Math.sin(angK) * radius;
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
        var lx = cx + Math.cos(angK) * (radius + 22), ly = cy + Math.sin(angK) * (radius + 16);
        ctx.fillStyle = pal.sub; ctx.font = 'bold 10.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(AXES[k], lx, ly + 4);
      }

      function drawPoly(vals, strokeCol, fillCol) {
        ctx.beginPath();
        vals.forEach(function (v, idx) {
          var ang = -Math.PI / 2 + (idx * Math.PI * 2) / 6;
          var px = cx + Math.cos(ang) * (v / 100) * radius;
          var py = cy + Math.sin(ang) * (v / 100) * radius;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = fillCol; ctx.fill();
        ctx.strokeStyle = strokeCol; ctx.lineWidth = 2.3; ctx.stroke();
      }

      var pr = PEERS[state.peer] || PEERS.aapl;
      drawPoly(pr.scores, pal.violet, pal.dark ? 'rgba(167,139,250,0.18)' : 'rgba(124,58,237,0.14)');
      drawPoly(AMZN_SCORES, pal.blue, pal.blueSoft);
    }

    // C4 Entropy Simulator & Persistent Checklist
    function runEntropySim() {
      var ic = parseFloat(document.getElementById('inpIcRatio').value) || 0;
      var t2 = parseFloat(document.getElementById('inpType2').value) || 80;
      var ai = parseFloat(document.getElementById('inpAiTool').value) || 70;

      document.getElementById('lblIcRatio').textContent = '+' + ic + '%';
      document.getElementById('lblType2').textContent = t2 + '%';
      document.getElementById('lblAiTool').textContent = ai + '%';

      var latency = Math.max(0.8, 7.6 - ic * 0.14 - (t2 - 40) * 0.068 - (ai - 15) * 0.015);
      var shipMult = 0.88 + ic * 0.014 + (t2 - 40) * 0.0045 + (ai - 15) * 0.0035;
      var gaPct = Math.max(1.12, 2.05 - ic * 0.032 - (ai - 15) * 0.0042);
      var bps = Math.round((2.05 - gaPct) * 100 + (shipMult - 1.0) * 105);

      document.getElementById('outLatency').textContent = latency.toFixed(1) + (state.lang === 'en' ? ' days' : ' 天');
      document.getElementById('outShipIdx').textContent = shipMult.toFixed(2) + 'x';
      document.getElementById('outGaPct').textContent = gaPct.toFixed(2) + '%';
      document.getElementById('outMarginBps').textContent = (bps >= 0 ? '+' : '') + bps + ' bps';

      var chip = document.getElementById('entropyStatusChip');
      if (latency <= 2.4) {
        chip.textContent = 'Day 1 High-Velocity';
        chip.className = 'mui-chip mui-chip-success mono';
      } else if (latency <= 4.5) {
        chip.textContent = 'Hybrid Transition';
        chip.className = 'mui-chip mui-chip-primary mono';
      } else {
        chip.textContent = 'Day 2 Bureaucracy Risk';
        chip.className = 'mui-chip mui-chip-warning mono';
      }
    }

    ['inpIcRatio', 'inpType2', 'inpAiTool'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', runEntropySim);
    });

    function updateChkCount() {
      var all = document.querySelectorAll('[data-oschk]');
      var done = 0;
      all.forEach(function (c) { if (c.checked) done++; });
      var b = document.getElementById('chkCountBadge');
      if (b) b.textContent = done + ' / ' + all.length + (state.lang === 'en' ? ' Verified' : ' 已核验');
    }
    try {
      var savedOs = JSON.parse(localStorage.getItem(STORAGE_OS_CHK_KEY) || '{}');
      document.querySelectorAll('[data-oschk]').forEach(function (chk) {
        var k = chk.getAttribute('data-oschk');
        chk.checked = !!savedOs[k];
        chk.addEventListener('change', function () {
          savedOs[k] = chk.checked;
          try { localStorage.setItem(STORAGE_OS_CHK_KEY, JSON.stringify(savedOs)); } catch (err) {}
          updateChkCount();
          showToast(chk.checked ? '已记录 Day 1 组织体检项' : '已取消勾选');
        });
      });
      updateChkCount();
    } catch (e) {}

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
          tip.style.left = Math.min(window.innerWidth - 305, ev.clientX + 14) + 'px';
          tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
        } else {
          tip.style.display = 'none';
        }
      });
      c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
    }
    ['topologyCanvas', 'bandwidthCanvas', 'leverageCanvas'].forEach(bindHoverTooltip);

    function drawAllCharts() {
      drawTopologyCanvas();
      drawBandwidthCanvas();
      drawLeverageCanvas();
      drawGenomeCanvas();
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
      runEntropySim();
      updateChkCount();
      drawAllCharts();
      if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
    }

    

    // Quick Jump Search (⌘K)
    var QUICK_ITEMS = [
      { id: 'mod-c0', t: 'C0 API解耦拓扑与双披萨沙盘', s: '163.8万员工 · TTM 人均营收 $487K · G&A 费率仅 1.34%' },
      { id: 'mod-c1', t: 'C1 四大文化内核与创造者带宽盘', s: '逆向工作法 PR/FAQ · 6页纸静默阅读 · STL 单线程 · 抬杆者' },
      { id: 'mod-c2', t: 'C2 三代治理演进与费用杠杆曲线', s: '1997 Day 1 → 2002 API → Jassy 扁平化改革 (+15% IC/Manager)' },
      { id: 'mod-c3', t: 'C3 全球巨头文化基因组镜像竞技场', s: 'Amazon 分布式接口联邦 vs Apple 职能集权钟表 / MSFT / WMT / BRK' },
      { id: 'mod-c4', t: 'C4 组织熵增推演器与 Day 1 体检表', s: '模拟管理跨度与 AI 编码提效对利润率贡献 · 6大反腐化清单' }
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
      ['mod-c0', 'mod-c1', 'mod-c2', 'mod-c3', 'mod-c4'].forEach(function (id) {
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

    runEntropySim();
    drawAllCharts();
  })();
  