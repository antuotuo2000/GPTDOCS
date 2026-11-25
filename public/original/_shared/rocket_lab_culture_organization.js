
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_CHECK_KEY = 'rklb_culture_checklist_v1';

    var state = {
      theme: document.documentElement.getAttribute('data-theme') || 'light',
      lang: 'zh',
      ch1View: 'viewA',
      ch1Hidden: {},
      pillarIdx: 0,
      radarHidden: {},
      peerCat: 'all',
      peerQuery: '',
      barMetric: 'gm',
      epsHidden: {}
    };

    function isEn() { return state.lang === 'en'; }

    function showToast(msg) {
      var sb = document.getElementById('muiSnackbar');
      sb.textContent = msg;
      sb.classList.add('show');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(function () { sb.classList.remove('show'); }, 2200);
    }

    // Suite Subfolder Hub Filter & Info Toast (Zero auto-scroll, zero broken local file links)
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
        if (item.classList.contains('active')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          showToast(isEn() ? ('Suite Deliverable: ' + pg) : ('同系列独立交付网页：' + pg));
        }
      }
    });

    // Pillar Data
    var PILLARS = [
      {
        zh: '<strong>支柱一落点 · 极致效率（Fierce Efficiency）：</strong>贝克将新西兰农业与机械业著名的“8号铁丝（No. 8 Wire）”文化制度化——每一项资本开支都必须回答“能否用自研自动化夹具替代昂贵外购”。典型实证：2023年以仅约 $1,610万美元破产拍卖价盘下 Virgin Orbit 加州长滩总部及全套高精密五轴加工中心（原值逾亿美元），直接建成发动机与卫星扩产中枢。',
        en: '<strong>Pillar 1 in Practice · Fierce Efficiency:</strong> Institutionalizes Kiwi "No. 8 Wire" resourcefulness—every CapEx dollar is scrutinized for capital productivity. Classic proof: acquiring Virgin Orbit\'s Long Beach headquarters and precision CNC tooling out of bankruptcy in 2023 for ~$16.1M (pennies on the dollar) to scale engine and spacecraft output.'
      },
      {
        zh: '<strong>支柱二落点 · 硬件实证（Show, Don\'t Tell）：</strong>内部严禁“用精美路线图掩盖工程滞后”。无论是 Electron 连续 59 次成功入轨、HASTE 高超音速实弹试飞，还是 2026年10月主动披露 Neutron 外包前穹顶缺陷并收回自有 AFP 机器人铺放产线重制，管理层始终把真实硬件测试数据置于公关叙事之上。',
        en: '<strong>Pillar 2 in Practice · Show, Don\'t Tell:</strong> Bans vaporware roadmaps in favor of flight-proven hardware. Whether delivering 59 straight successful Electron missions or openly disclosing contractor-built Neutron dome voids in Oct 2026 and pulling production onto in-house robotic AFP tooling, hardware truth leads.'
      },
      {
        zh: '<strong>支柱三落点 · 聪明的速度（Smart Speed）：</strong>与“盲目炸火箭试错”不同，Rocket Lab 在可逆子系统快速迭代，同时通过自建新西兰玛希亚 LC-1 与弗吉尼亚 LC-2/LC-3 专属工位掌握发射窗口主权，把火箭总装节拍压缩至每 8 天 1 枚，曾创下两发轨道任务仅隔数天的敏捷纪录。',
        en: '<strong>Pillar 3 in Practice · Smart Speed:</strong> Balances rapid ground iteration with strict orbital reliability gates. Owning private Launch Complex 1 in Mahia plus Wallops LC-2/LC-3 eliminates range bottlenecks, enabling an 8-day rocket build cadence.'
      },
      {
        zh: '<strong>支柱四落点 · 端到端垂直整合（Vertical Integration）：</strong>通过 7 次高纪律并购（Sinclair / ASI / PSC / SolAero / GEOST / Mynaric / Motiv）外加拟 ~$80亿并购 Iridium，Rocket Lab 打通“部组件 → 整星 → 发射 → 全球 L 波段星座服务”四层闭环，太空系统已占 Q3 2026 总营收的 80.2%（$2.148亿）。',
        en: '<strong>Pillar 4 in Practice · Vertical Integration:</strong> Seven disciplined bolt-on acquisitions plus the pending ~$8.0B Iridium merger unite subsystems, spacecraft prime builds (80.2% of Q3 2026 revenue at $214.8M), launch vehicles, and recurring L-band satellite communications.'
      }
    ];

    function renderPillarNote() {
      var p = PILLARS[state.pillarIdx] || PILLARS[0];
      document.getElementById('pillarFocusNote').innerHTML = isEn() ? p.en : p.zh;
    }

    document.getElementById('pillarStack').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-pillar]');
      if (!btn) return;
      state.pillarIdx = parseInt(btn.getAttribute('data-pillar'), 10) || 0;
      document.querySelectorAll('#pillarStack .pillar-card').forEach(function (c, i) {
        c.classList.toggle('active', i === state.pillarIdx);
      });
      renderPillarNote();
    });

    // Collapsible Matrix Cards
    document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tid = btn.getAttribute('data-collapse-target');
        var box = document.getElementById(tid);
        if (!box) return;
        var open = box.classList.toggle('open');
        btn.textContent = open ? (isEn() ? 'Hide' : '收起细节') : (isEn() ? 'Details' : '展开细节');
      });
    });

    // Peer Table Data
    var PEERS = [
      {
        id: 'rklb', cat: 'newspace', isRklb: true,
        name: 'Rocket Lab (NASDAQ: RKLB)',
        url: 'https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-announces-third-quarter-2026-financial-results-posts',
        archZh: '跨洋全栈工程脊柱 + 单一ERP垂直整合', archEn: 'Dual-Hub Functional Spine + Single ERP',
        revZh: 'TTM $881.9M · Q3 $267.8M (+72.7% YoY)', revEn: 'TTM $881.9M · Q3 $267.8M (+72.7% YoY)',
        gmZh: 'TTM GAAP 36.2% · Q3 Non-GAAP 38.4%', gmEn: 'TTM GAAP 36.2% · Q3 Non-GAAP 38.4%',
        moatZh: '$3.57B Backlog · 100发里程碑 · 拟并Iridium', moatEn: '$3.57B Backlog · 100 Launches · Pending IRDM',
        govZh: '$1 CEO基本年薪 · 85.7%独董 · 固定总价履约', govEn: '$1 CEO Salary · 85.7% Ind. Board · FFP Rigor',
        gmVal: 38.4, growthVal: 72.7, vertVal: 94
      },
      {
        id: 'spacex', cat: 'newspace', isRklb: false,
        name: 'SpaceX (2026 Newly Listed)',
        url: 'https://newmarketpitch.com/blogs/news/space-economy-top-revenue',
        archZh: '第一性原理重资本自建帝国（火箭+星链）', archEn: 'First-Principles Mega-Cap Vertically Integrated Empire',
        revZh: 'FY25 $18.67B · Q3\'26 ~$7.02B (+38% Est.)', revEn: 'FY25 $18.67B · Q3\'26 ~$7.02B (+38% Est.)',
        gmZh: '混合估计 ~47.0% (Starlink 高毛利驱动)', gmEn: 'Blended Est. ~47.0% (Starlink-driven)',
        moatZh: '35次/季发射 · 全球最大LEO宽带星座', moatEn: '35 Launches/Qtr · Dominant LEO Broadband',
        govZh: '创始人绝对控制权 · 极限炸箭试错节奏', govEn: 'Founder Super-Control · Rapid Destructive Testing',
        gmVal: 47.0, growthVal: 38.0, vertVal: 97
      },
      {
        id: 'irdm', cat: 'newspace', isRklb: false,
        name: 'Iridium (NASDAQ: IRDM · 拟并入)',
        url: 'https://investors.rocketlabcorp.com/news-releases/news-release-details/iridium-stockholders-approve-acquisition-rocket-lab',
        archZh: '高可靠全球L波段LEO星座电信运营商', archEn: 'High-Reliability Global L-Band LEO Operator',
        revZh: 'TTM $903.0M · FY25 $871.7M (+5.2% YoY)', revEn: 'TTM $903.0M · FY25 $871.7M (+5.2% YoY)',
        gmZh: 'OEBITDA 利润率 57.0% · FCF率 30.7%', gmEn: '57.0% OEBITDA Margin · 30.7% FCF Margin',
        moatZh: '66+14颗在轨星 · 255万+安全与物联网用户', moatEn: '66+14 LEO Sats · 2.55M+ Subscribers',
        govZh: '公用事业级稳健治理 · 股东已批与RKLB合并', govEn: 'Telecom-Grade Reliability · Approved RKLB Merger',
        gmVal: 57.0, growthVal: 5.2, vertVal: 58
      },
      {
        id: 'lunr', cat: 'newspace', isRklb: false,
        name: 'Intuitive Machines (NASDAQ: LUNR)',
        url: 'https://newmarketpitch.com/blogs/news/space-economy-top-revenue',
        archZh: '月球着陆器与地月空间数据中继包商', archEn: 'Lunar Lander &amp; Cislunar Relay Contractor',
        revZh: 'TTM $490.0M · Q2\'26 $206.2M (+58.0% YoY)', revEn: 'TTM $490.0M · Q2\'26 $206.2M (+58.0% YoY)',
        gmZh: 'Q2\'26 GAAP 毛利率 17.4%', gmEn: 'Q2\'26 GAAP Gross Margin 17.4%',
        moatZh: '$1.80B Backlog · NASA NSNS/CLPS 核心合同', moatEn: '$1.80B Backlog · NASA NSNS/CLPS Anchor',
        govZh: '项目制工程团队 · 依赖NASA深空任务拨款', govEn: 'Mission-Centric Engineering · NASA Dependent',
        gmVal: 17.4, growthVal: 58.0, vertVal: 62
      },
      {
        id: 'fly', cat: 'newspace', isRklb: false,
        name: 'Firefly Aerospace (NASDAQ: FLY)',
        url: 'https://sec-api.io/insights/firefly-aerospace-fly-q3-2026-earnings-revenue-110-7m-backlog-1-67bn-ast-deal-about-1-3bn-sec-filing-analysis',
        archZh: '中小运载火箭 + 轨间转移飞行器新锐', archEn: 'Launch + Orbital Transfer Vehicle Challenger',
        revZh: 'TTM $287.0M · Q3\'26 $110.7M (+44.0% YoY)', revEn: 'TTM $287.0M · Q3\'26 $110.7M (+44.0% YoY)',
        gmZh: 'Q3\'26 GAAP 毛利率 22.9%', gmEn: 'Q3\'26 GAAP Gross Margin 22.9%',
        moatZh: '$1.67B Backlog · AST ~$1.3B 星座发射长单', moatEn: '$1.67B Backlog · ~$1.3B AST Launch Deal',
        govZh: '快速响应发射文化 · 产能与复飞爬坡阶段', govEn: 'Responsive Launch Culture · Cadence Ramp Stage',
        gmVal: 22.9, growthVal: 44.0, vertVal: 68
      },
      {
        id: 'lmt', cat: 'legacy', isRklb: false,
        name: 'Lockheed Martin Space (NYSE: LMT)',
        url: 'https://www.sec.gov/Archives/edgar/data/1819994/000162828026023922/rklb-20260406.htm',
        archZh: '传统多级分包 + 成本加成军工矩阵体制', archEn: 'Multi-Tier Subcontracting + Cost-Plus Matrix',
        revZh: 'Q3\'26 分部 $3.49B (~$13.5B年化 · +4.1% YoY)', revEn: 'Q3\'26 Segment $3.49B (~$13.5B Run-Rate · +4.1%)',
        gmZh: '分部经营利润率 9.5%', gmEn: 'Segment Operating Margin 9.5%',
        moatZh: '战略威慑/GEO机密卫星深厚资质壁垒', moatEn: 'Classified GEO &amp; Strategic Deterrence Moat',
        govZh: '流程驱动型官僚架构 · 研发周期5–10年', govEn: 'Process-Heavy Bureaucracy · 5–10 Yr Cycles',
        gmVal: 9.5, growthVal: 4.1, vertVal: 45
      }
    ];

    function highlightText(str, kw) {
      if (!kw) return str;
      var esc = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return str.replace(new RegExp('(' + esc + ')', 'gi'), '<mark class="hl">$1</mark>');
    }

    function renderPeerTable() {
      var kw = (state.peerQuery || '').trim();
      var rows = PEERS.filter(function (p) {
        if (state.peerCat !== 'all' && p.cat !== state.peerCat) return false;
        if (!kw) return true;
        var hay = [p.name, p.archZh, p.archEn, p.revZh, p.gmZh, p.moatZh, p.govZh].join(' ').toLowerCase();
        return hay.indexOf(kw.toLowerCase()) !== -1;
      });
      var tbody = document.getElementById('peerTableBody');
      if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-muted);">' + (isEn() ? 'No matching aerospace peers found.' : '未找到匹配的对标企业，请更换检索词。') + '</td></tr>';
        return;
      }
      tbody.innerHTML = rows.map(function (p) {
        var arch = isEn() ? p.archEn : p.archZh;
        var rev = isEn() ? p.revEn : p.revZh;
        var gm = isEn() ? p.gmEn : p.gmZh;
        var moat = isEn() ? p.moatEn : p.moatZh;
        var gov = isEn() ? p.govEn : p.govZh;
        return '<tr class="' + (p.isRklb ? 'is-rklb' : '') + '">' +
          '<td><a href="' + p.url + '" target="_blank" rel="noopener noreferrer" style="font-weight:800;">' + highlightText(p.name, kw) + ' ↗</a></td>' +
          '<td>' + highlightText(arch, kw) + '</td>' +
          '<td class="mono">' + highlightText(rev, kw) + '</td>' +
          '<td class="mono">' + highlightText(gm, kw) + '</td>' +
          '<td>' + highlightText(moat, kw) + '</td>' +
          '<td>' + highlightText(gov, kw) + '</td>' +
          '</tr>';
      }).join('');
    }

    document.getElementById('peerSearchInput').addEventListener('input', function (e) {
      state.peerQuery = e.target.value;
      renderPeerTable();
    });
    document.getElementById('peerFilterSeg').addEventListener('click', function (e) {
      var b = e.target.closest('[data-peer-cat]');
      if (!b) return;
      state.peerCat = b.getAttribute('data-peer-cat');
      document.querySelectorAll('#peerFilterSeg .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      renderPeerTable();
    });

    // Canvas Helpers & Tooltip
    var tooltip = document.getElementById('chartTooltip');
    var chartHitBoxes = {};

    function setupCanvas(id) {
      var c = document.getElementById(id);
      var rect = c.parentElement.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(260, rect.width - 20);
      var h = Math.max(200, rect.height - 20);
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

    function bindCanvasHover(id) {
      var c = document.getElementById(id);
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var mx = e.clientX - r.left;
        var my = e.clientY - r.top;
        var boxes = chartHitBoxes[id] || [];
        var hit = null;
        for (var i = 0; i < boxes.length; i++) {
          var b = boxes[i];
          if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) { hit = b; break; }
        }
        if (hit) {
          tooltip.innerHTML = hit.html;
          tooltip.style.display = 'block';
          tooltip.style.left = Math.min(window.innerWidth - 260, e.clientX + 14) + 'px';
          tooltip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, e.clientY - 36)) + 'px';
        } else {
          tooltip.style.display = 'none';
        }
      });
      c.addEventListener('mouseleave', function () { tooltip.style.display = 'none'; });
    }

    // Chart 1: Dual View (Segment Mix vs FTE & Rev/FTE)
    var CH1_YEARS = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'TTM Q3\'26'];
    var CH1_LAUNCH = [39.0, 60.7, 71.9, 125.4, 199.0, 219.2];
    var CH1_SPACE = [23.2, 150.3, 172.7, 310.8, 402.8, 662.7];
    var CH1_FTES = [1183, 1400, 1650, 2100, 2600, 3217];
    var CH1_REV_FTE = [52.6, 150.7, 148.2, 207.7, 231.5, 305.3]; // 2026E implied $982.2M / 3,217 = $305.3K

    function renderCh1Legend() {
      var p = palette();
      var items = state.ch1View === 'viewA'
        ? [
            { k: 'space', c: p.blue, zh: '太空系统营收 ($M · 主承包+部组件)', en: 'Space Systems Revenue ($M)' },
            { k: 'launch', c: p.cyan, zh: '发射服务营收 ($M · Electron/HASTE)', en: 'Launch Services Revenue ($M)' }
          ]
        : [
            { k: 'fte', c: p.violet, zh: '全球员工总数 (人 · 左轴)', en: 'Global Employees (Left Axis)' },
            { k: 'revfte', c: p.green, zh: '人均年化创收 ($K/人 · 右轴)', en: 'Annualized Rev / Employee ($K · Right)' }
          ];
      var box = document.getElementById('ch1Legend');
      box.innerHTML = items.map(function (it) {
        var off = !!state.ch1Hidden[it.k];
        return '<button type="button" class="legend-pill ' + (off ? 'off' : '') + '" data-ch1-leg="' + it.k + '">' +
          '<span class="legend-dot" style="background:' + it.c + ';"></span>' +
          '<span>' + (isEn() ? it.en : it.zh) + '</span></button>';
      }).join('');
    }

    function drawChartCh1() {
      var s = setupCanvas('chartCh1');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var pad = { t: 24, r: 54, b: 34, l: 52 };
      var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
      var hits = [];

      ctx.strokeStyle = p.grid;
      ctx.lineWidth = 1;
      for (var g = 0; g <= 4; g++) {
        var gy = pad.t + (ch * g / 4);
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
      }

      var n = CH1_YEARS.length;
      var step = cw / n;
      ctx.font = '600 11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      for (var i = 0; i < n; i++) {
        var cx = pad.l + step * (i + 0.5);
        ctx.fillStyle = p.muted;
        ctx.fillText(i === 5 && state.ch1View === 'viewB' ? '2026E' : CH1_YEARS[i], cx, h - 10);
      }

      if (state.ch1View === 'viewA') {
        var maxV = 950;
        ctx.textAlign = 'right';
        for (var y = 0; y <= 4; y++) {
          var val = Math.round(maxV * (1 - y / 4));
          ctx.fillStyle = p.muted;
          ctx.fillText('$' + val + 'M', pad.l - 8, pad.t + (ch * y / 4) + 4);
        }
        var bw = Math.min(44, step * 0.52);
        for (var j = 0; j < n; j++) {
          var x = pad.l + step * (j + 0.5) - bw / 2;
          var vS = state.ch1Hidden.space ? 0 : CH1_SPACE[j];
          var vL = state.ch1Hidden.launch ? 0 : CH1_LAUNCH[j];
          var hS = (vS / maxV) * ch;
          var hL = (vL / maxV) * ch;
          var yS = pad.t + ch - hS;
          var yL = yS - hL;
          if (vS > 0) {
            ctx.fillStyle = p.blue;
            ctx.fillRect(x, yS, bw, hS);
          }
          if (vL > 0) {
            ctx.fillStyle = p.cyan;
            ctx.fillRect(x, yL, bw, hL);
          }
          var tot = (vS + vL).toFixed(1);
          ctx.fillStyle = p.text;
          ctx.textAlign = 'center';
          ctx.fillText('$' + tot + 'M', x + bw / 2, Math.max(14, yL - 6));
          hits.push({
            x: x - 4, y: pad.t, w: bw + 8, h: ch,
            html: '<b>' + CH1_YEARS[j] + '</b><br/>Space Systems: <b>$' + CH1_SPACE[j].toFixed(1) + 'M</b> (' + Math.round(CH1_SPACE[j] / (CH1_SPACE[j] + CH1_LAUNCH[j]) * 100) + '%)<br/>Launch Services: <b>$' + CH1_LAUNCH[j].toFixed(1) + 'M</b>'
          });
        }
      } else {
        var maxFte = 3600, maxRev = 340;
        ctx.textAlign = 'right';
        for (var yl = 0; yl <= 4; yl++) {
          ctx.fillStyle = p.muted;
          ctx.fillText(Math.round(maxFte * (1 - yl / 4)), pad.l - 8, pad.t + (ch * yl / 4) + 4);
        }
        ctx.textAlign = 'left';
        for (var yr = 0; yr <= 4; yr++) {
          ctx.fillStyle = p.green;
          ctx.fillText('$' + Math.round(maxRev * (1 - yr / 4)) + 'K', w - pad.r + 6, pad.t + (ch * yr / 4) + 4);
        }
        var bw2 = Math.min(38, step * 0.46);
        for (var k = 0; k < n; k++) {
          var bx = pad.l + step * (k + 0.5) - bw2 / 2;
          if (!state.ch1Hidden.fte) {
            var hf = (CH1_FTES[k] / maxFte) * ch;
            ctx.fillStyle = state.theme === 'dark' ? 'rgba(167,139,250,0.42)' : 'rgba(124,58,237,0.22)';
            ctx.strokeStyle = p.violet;
            ctx.fillRect(bx, pad.t + ch - hf, bw2, hf);
            ctx.strokeRect(bx, pad.t + ch - hf, bw2, hf);
          }
          hits.push({
            x: bx - 6, y: pad.t, w: bw2 + 12, h: ch,
            html: '<b>' + (k === 5 ? '2026E' : CH1_YEARS[k]) + '</b><br/>Employees: <b>' + CH1_FTES[k].toLocaleString() + '</b><br/>Rev / Employee: <b>$' + CH1_REV_FTE[k].toFixed(1) + 'K</b>'
          });
        }
        if (!state.ch1Hidden.revfte) {
          ctx.strokeStyle = p.green;
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          for (var m = 0; m < n; m++) {
            var px = pad.l + step * (m + 0.5);
            var py = pad.t + ch - (CH1_REV_FTE[m] / maxRev) * ch;
            if (m === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.stroke();
          for (var m2 = 0; m2 < n; m2++) {
            var px2 = pad.l + step * (m2 + 0.5);
            var py2 = pad.t + ch - (CH1_REV_FTE[m2] / maxRev) * ch;
            ctx.fillStyle = p.green;
            ctx.beginPath(); ctx.arc(px2, py2, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = p.text;
            ctx.textAlign = 'center';
            ctx.fillText('$' + CH1_REV_FTE[m2].toFixed(0) + 'K', px2, py2 - 9);
          }
        }
      }
      chartHitBoxes.chartCh1 = hits;
    }

    document.getElementById('ch1ViewSwitch').addEventListener('click', function (e) {
      var b = e.target.closest('[data-ch1-view]');
      if (!b) return;
      state.ch1View = b.getAttribute('data-ch1-view');
      document.querySelectorAll('#ch1ViewSwitch .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      renderCh1Legend();
      drawChartCh1();
    });
    document.getElementById('ch1Legend').addEventListener('click', function (e) {
      var b = e.target.closest('[data-ch1-leg]');
      if (!b) return;
      var k = b.getAttribute('data-ch1-leg');
      state.ch1Hidden[k] = !state.ch1Hidden[k];
      renderCh1Legend();
      drawChartCh1();
    });

    // Chart 2: 5-Axis Radar
    var RADAR_SERIES = [
      { k: 'rklb', zh: 'Rocket Lab (RKLB)', en: 'Rocket Lab (RKLB)', vals: [95, 94, 90, 96, 93], colorKey: 'blue' },
      { k: 'spacex', zh: 'SpaceX', en: 'SpaceX', vals: [76, 98, 99, 64, 92], colorKey: 'green' },
      { k: 'legacy', zh: '传统成本加成军工 (LMT/BA)', en: 'Legacy Cost-Plus Primes', vals: [42, 46, 44, 72, 38], colorKey: 'amber' }
    ];
    var RADAR_AXES = [
      { zh: '资本效率', en: 'Capital Eff.' },
      { zh: '全栈垂直率', en: 'Vertical Stack' },
      { zh: '发射制造节拍', en: 'Build Cadence' },
      { zh: '治理透明度', en: 'Gov. Candor' },
      { zh: '固定总价纪律', en: 'FFP Discipline' }
    ];

    function renderRadarLegend() {
      var p = palette();
      document.getElementById('radarLegend').innerHTML = RADAR_SERIES.map(function (sr) {
        var off = !!state.radarHidden[sr.k];
        return '<button type="button" class="legend-pill ' + (off ? 'off' : '') + '" data-rad-leg="' + sr.k + '">' +
          '<span class="legend-dot" style="background:' + p[sr.colorKey] + ';"></span>' +
          '<span>' + (isEn() ? sr.en : sr.zh) + '</span></button>';
      }).join('');
    }

    function drawChartRadar() {
      var s = setupCanvas('chartRadar');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var cx = w / 2, cy = h / 2 + 6;
      var rad = Math.min(w, h) * 0.34;
      var hits = [];

      ctx.strokeStyle = p.grid;
      for (var ring = 1; ring <= 4; ring++) {
        var rr = rad * (ring / 4);
        ctx.beginPath();
        for (var a = 0; a < 5; a++) {
          var ang = -Math.PI / 2 + (a * 2 * Math.PI / 5);
          var rx = cx + Math.cos(ang) * rr, ry = cy + Math.sin(ang) * rr;
          if (a === 0) ctx.moveTo(rx, ry); else ctx.lineTo(rx, ry);
        }
        ctx.closePath(); ctx.stroke();
      }

      ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
      for (var i = 0; i < 5; i++) {
        var ang2 = -Math.PI / 2 + (i * 2 * Math.PI / 5);
        var ex = cx + Math.cos(ang2) * rad, ey = cy + Math.sin(ang2) * rad;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
        var lx = cx + Math.cos(ang2) * (rad + 24), ly = cy + Math.sin(ang2) * (rad + 18);
        ctx.fillStyle = p.text;
        ctx.textAlign = 'center';
        ctx.fillText(isEn() ? RADAR_AXES[i].en : RADAR_AXES[i].zh, lx, ly + 4);
      }

      RADAR_SERIES.forEach(function (sr) {
        if (state.radarHidden[sr.k]) return;
        var col = p[sr.colorKey];
        ctx.beginPath();
        sr.vals.forEach(function (v, idx) {
          var ang3 = -Math.PI / 2 + (idx * 2 * Math.PI / 5);
          var px = cx + Math.cos(ang3) * rad * (v / 100);
          var py = cy + Math.sin(ang3) * rad * (v / 100);
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = sr.k === 'rklb' ? 'rgba(0,115,230,0.20)' : (sr.k === 'spacex' ? 'rgba(34,197,94,0.12)' : 'rgba(217,119,6,0.12)');
        ctx.fill();
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        sr.vals.forEach(function (v, idx) {
          var ang4 = -Math.PI / 2 + (idx * 2 * Math.PI / 5);
          var px = cx + Math.cos(ang4) * rad * (v / 100);
          var py = cy + Math.sin(ang4) * rad * (v / 100);
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          hits.push({
            x: px - 8, y: py - 8, w: 16, h: 16,
            html: '<b>' + (isEn() ? sr.en : sr.zh) + '</b><br/>' + (isEn() ? RADAR_AXES[idx].en : RADAR_AXES[idx].zh) + ': <b>' + v + ' / 100</b>'
          });
        });
      });
      chartHitBoxes.chartRadar = hits;
    }

    document.getElementById('radarLegend').addEventListener('click', function (e) {
      var b = e.target.closest('[data-rad-leg]');
      if (!b) return;
      var k = b.getAttribute('data-rad-leg');
      state.radarHidden[k] = !state.radarHidden[k];
      renderRadarLegend();
      drawChartRadar();
    });

    // Chart 3: Horizontal Benchmark Bars
    function drawChartBars() {
      var s = setupCanvas('chartBars');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var pad = { t: 12, r: 64, b: 18, l: 175 };
      var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
      var hits = [];
      var key = state.barMetric === 'gm' ? 'gmVal' : (state.barMetric === 'growth' ? 'growthVal' : 'vertVal');
      var maxVal = state.barMetric === 'gm' ? 65 : (state.barMetric === 'growth' ? 80 : 100);
      var suffix = state.barMetric === 'vert' ? ' pts' : '%';

      var rowH = ch / PEERS.length;
      PEERS.forEach(function (pr, idx) {
        var y = pad.t + idx * rowH + rowH * 0.2;
        var bh = rowH * 0.6;
        var v = pr[key];
        var bw = Math.max(4, (v / maxVal) * cw);
        ctx.fillStyle = pr.isRklb ? p.text : p.muted;
        ctx.font = (pr.isRklb ? '800 ' : '600 ') + '11.5px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(pr.name.split(' (')[0], pad.l - 10, y + bh * 0.68);

        ctx.fillStyle = pr.isRklb ? p.blue : (pr.cat === 'legacy' ? p.amber : p.cyan);
        ctx.beginPath();
        ctx.roundRect(pad.l, y, bw, bh, 5);
        ctx.fill();

        ctx.fillStyle = p.text;
        ctx.font = '700 11px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(v.toFixed(1) + suffix, pad.l + bw + 8, y + bh * 0.68);

        hits.push({
          x: pad.l, y: y, w: cw, h: bh,
          html: '<b>' + pr.name + '</b><br/>Value: <b>' + v.toFixed(1) + suffix + '</b><br/>' + (isEn() ? pr.moatEn : pr.moatZh)
        });
      });
      chartHitBoxes.chartBars = hits;
    }

    document.getElementById('barMetricSeg').addEventListener('click', function (e) {
      var b = e.target.closest('[data-bar-metric]');
      if (!b) return;
      state.barMetric = b.getAttribute('data-bar-metric');
      document.querySelectorAll('#barMetricSeg .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      drawChartBars();
    });

    // Chart 4: Revenue vs Gross Margin Combo
    var EPS_YRS = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'TTM Q3\'26'];
    var EPS_REV = [62.2, 211.0, 244.6, 436.2, 601.8, 881.9];
    var EPS_GAAP_GM = [-3.0, 9.0, 21.0, 26.6, 34.4, 36.2];
    var EPS_NG_GM = [4.5, 19.5, 27.2, 32.0, 39.7, 40.7];

    function renderEpsLegend() {
      var p = palette();
      var items = [
        { k: 'rev', c: p.blue, zh: '合并营收 ($M · 左轴)', en: 'Revenue ($M · Left)' },
        { k: 'gaap', c: p.green, zh: 'GAAP 毛利率 (% · 右轴)', en: 'GAAP Gross Margin (%)' },
        { k: 'ng', c: p.amber, zh: 'Non-GAAP 毛利率 (% · 右轴)', en: 'Non-GAAP Gross Margin (%)' }
      ];
      document.getElementById('epsLegend').innerHTML = items.map(function (it) {
        var off = !!state.epsHidden[it.k];
        return '<button type="button" class="legend-pill ' + (off ? 'off' : '') + '" data-eps-leg="' + it.k + '">' +
          '<span class="legend-dot" style="background:' + it.c + ';"></span>' +
          '<span>' + (isEn() ? it.en : it.zh) + '</span></button>';
      }).join('');
    }

    function drawChartEps() {
      var s = setupCanvas('chartEps');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var pad = { t: 22, r: 50, b: 32, l: 54 };
      var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
      var hits = [];
      var maxRev = 1000, minGm = -10, maxGm = 50;

      ctx.strokeStyle = p.grid;
      for (var g = 0; g <= 4; g++) {
        var gy = pad.t + (ch * g / 4);
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        ctx.font = '600 11px "IBM Plex Mono", monospace';
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'right';
        ctx.fillText('$' + Math.round(maxRev * (1 - g / 4)) + 'M', pad.l - 8, gy + 4);
        ctx.textAlign = 'left';
        ctx.fillText(Math.round(maxGm - (maxGm - minGm) * (g / 4)) + '%', w - pad.r + 6, gy + 4);
      }

      var n = EPS_YRS.length, step = cw / n, bw = Math.min(42, step * 0.48);
      for (var i = 0; i < n; i++) {
        var cx = pad.l + step * (i + 0.5);
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'center';
        ctx.fillText(EPS_YRS[i], cx, h - 10);
        if (!state.epsHidden.rev) {
          var bh = (EPS_REV[i] / maxRev) * ch;
          ctx.fillStyle = state.theme === 'dark' ? 'rgba(0,115,230,0.48)' : 'rgba(0,115,230,0.24)';
          ctx.strokeStyle = p.blue;
          ctx.fillRect(cx - bw / 2, pad.t + ch - bh, bw, bh);
          ctx.strokeRect(cx - bw / 2, pad.t + ch - bh, bw, bh);
        }
        hits.push({
          x: cx - bw / 2 - 4, y: pad.t, w: bw + 8, h: ch,
          html: '<b>' + EPS_YRS[i] + '</b><br/>Revenue: <b>$' + EPS_REV[i].toFixed(1) + 'M</b><br/>GAAP GM: <b>' + EPS_GAAP_GM[i].toFixed(1) + '%</b><br/>Non-GAAP GM: <b>' + EPS_NG_GM[i].toFixed(1) + '%</b>'
        });
      }

      function drawGmLine(arr, col) {
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        arr.forEach(function (v, idx) {
          var px = pad.l + step * (idx + 0.5);
          var py = pad.t + ch - ((v - minGm) / (maxGm - minGm)) * ch;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        arr.forEach(function (v, idx) {
          var px = pad.l + step * (idx + 0.5);
          var py = pad.t + ch - ((v - minGm) / (maxGm - minGm)) * ch;
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        });
      }
      if (!state.epsHidden.gaap) drawGmLine(EPS_GAAP_GM, p.green);
      if (!state.epsHidden.ng) drawGmLine(EPS_NG_GM, p.amber);
      chartHitBoxes.chartEps = hits;
    }

    document.getElementById('epsLegend').addEventListener('click', function (e) {
      var b = e.target.closest('[data-eps-leg]');
      if (!b) return;
      var k = b.getAttribute('data-eps-leg');
      state.epsHidden[k] = !state.epsHidden[k];
      renderEpsLegend();
      drawChartEps();
    });

    // Chart 5: Flywheel Compounding Simulator
    function runFlywheelSim() {
      var prin = parseFloat(document.getElementById('simPrincipal').value) || 100;
      var yrs = parseInt(document.getElementById('simYears').value, 10) || 6;
      var cagr = parseFloat(document.getElementById('simCagr').value) || 32;
      var iridiumBoost = document.getElementById('simIridiumChk').checked ? 6.0 : 0.0;

      document.getElementById('lblPrincipal').textContent = '$' + prin + 'K';
      document.getElementById('lblYears').textContent = yrs + (isEn() ? ' Yrs' : ' 年');
      document.getElementById('lblCagr').textContent = cagr + '%';

      var effRate = (cagr + iridiumBoost) / 100;
      var launchOnlyRate = Math.max(0.08, (cagr * 0.55) / 100);
      var fullCurve = [], baseCurve = [];
      for (var t = 0; t <= yrs; t++) {
        fullCurve.push(prin * Math.pow(1 + effRate, t));
        baseCurve.push(prin * Math.pow(1 + launchOnlyRate, t));
      }
      var endVal = fullCurve[yrs];
      var spread = endVal - baseCurve[yrs];
      var steadyGm = Math.min(54.0, 36.2 + (yrs * 1.1) + (iridiumBoost > 0 ? 5.2 : 0));

      document.getElementById('simOutFinal').textContent = endVal >= 1000 ? ('$' + (endVal / 1000).toFixed(2) + 'M') : ('$' + Math.round(endVal) + 'K');
      document.getElementById('simOutMultiple').textContent = (endVal / prin).toFixed(2) + 'x';
      document.getElementById('simOutMargin').textContent = steadyGm.toFixed(1) + '%';
      document.getElementById('simOutSpread').textContent = '+$' + (spread >= 1000 ? ((spread / 1000).toFixed(2) + 'M') : (Math.round(spread) + 'K'));

      var s = setupCanvas('chartSim');
      var ctx = s.ctx, w = s.w, h = s.h, p = palette();
      var pad = { t: 20, r: 24, b: 30, l: 56 };
      var cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;
      var maxY = Math.max(endVal * 1.12, prin * 2);
      var hits = [];

      ctx.strokeStyle = p.grid;
      ctx.font = '600 11px "IBM Plex Mono", monospace';
      for (var g = 0; g <= 4; g++) {
        var gy = pad.t + (ch * g / 4);
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        var yv = maxY * (1 - g / 4);
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'right';
        ctx.fillText(yv >= 1000 ? ('$' + (yv / 1000).toFixed(1) + 'M') : ('$' + Math.round(yv) + 'K'), pad.l - 8, gy + 4);
      }

      function plotCurve(arr, col, dashed) {
        ctx.save();
        if (dashed) ctx.setLineDash([5, 4]);
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        arr.forEach(function (v, idx) {
          var px = pad.l + (cw * idx / yrs);
          var py = pad.t + ch - (v / maxY) * ch;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.restore();
      }
      plotCurve(baseCurve, p.amber, true);
      plotCurve(fullCurve, p.blue, false);

      for (var k = 0; k <= yrs; k++) {
        var px = pad.l + (cw * k / yrs);
        var py = pad.t + ch - (fullCurve[k] / maxY) * ch;
        ctx.fillStyle = p.muted;
        ctx.textAlign = 'center';
        ctx.fillText('Y' + k, px, h - 8);
        ctx.fillStyle = p.blue;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        hits.push({
          x: px - 12, y: pad.t, w: 24, h: ch,
          html: '<b>Year ' + k + '</b><br/>Full-Stack Flywheel: <b>$' + Math.round(fullCurve[k]).toLocaleString() + 'K</b><br/>Launch-Only Peer: <b>$' + Math.round(baseCurve[k]).toLocaleString() + 'K</b>'
        });
      }
      chartHitBoxes.chartSim = hits;
    }

    ['simPrincipal', 'simYears', 'simCagr', 'simIridiumChk'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', runFlywheelSim);
      document.getElementById(id).addEventListener('change', runFlywheelSim);
    });
    document.getElementById('simPresets').addEventListener('click', function (e) {
      var b = e.target.closest('[data-preset]');
      if (!b) return;
      var mode = b.getAttribute('data-preset');
      document.querySelectorAll('#simPresets .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
      document.getElementById('simCagr').value = mode === 'cons' ? 22 : (mode === 'bull' ? 42 : 32);
      runFlywheelSim();
    });

    ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(bindCanvasHover);

    function drawAllCharts() {
      drawChartCh1();
      drawChartRadar();
      drawChartBars();
      drawChartEps();
      runFlywheelSim();
    }

    // Checklist Persistence
    var chkState = {};
    try { chkState = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || '{}'); } catch (e) {}
    function syncChecklistUI() {
      var boxes = document.querySelectorAll('[data-chk-id]');
      var done = 0;
      boxes.forEach(function (cb) {
        var id = cb.getAttribute('data-chk-id');
        cb.checked = !!chkState[id];
        if (cb.checked) done++;
      });
      var pct = Math.round((done / boxes.length) * 100);
      document.getElementById('checklistProgressBar').style.width = pct + '%';
      document.getElementById('checklistScoreLabel').textContent = isEn()
        ? ('Verified ' + done + ' / ' + boxes.length + ' (' + pct + '%)')
        : ('已核验 ' + done + ' / ' + boxes.length + ' 项 (' + pct + '%)');
    }
    document.getElementById('checklistContainer').addEventListener('change', function (e) {
      var cb = e.target.closest('[data-chk-id]');
      if (!cb) return;
      chkState[cb.getAttribute('data-chk-id')] = cb.checked;
      try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(chkState)); } catch (err) {}
      syncChecklistUI();
    });
    document.getElementById('checkAllBtn').addEventListener('click', function () {
      document.querySelectorAll('[data-chk-id]').forEach(function (cb) { chkState[cb.getAttribute('data-chk-id')] = true; });
      try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(chkState)); } catch (err) {}
      syncChecklistUI();
      showToast(isEn() ? 'All 6 milestones checked' : '已勾选全部 6 项诊断节点');
    });
    document.getElementById('resetCheckBtn').addEventListener('click', function () {
      chkState = {};
      try { localStorage.setItem(STORAGE_CHECK_KEY, '{}'); } catch (err) {}
      syncChecklistUI();
      showToast(isEn() ? 'Checklist reset' : '诊断清单已重置');
    });

    // Quick Jump Search
    var QUICK_ITEMS = [
      { id: 'sec-00', t: '00 核心论点与关键组织指标', s: '人均创收 ~$305.3K · $1 CEO年薪 · 100次发射里程碑' },
      { id: 'sec-01', t: '01 跨洋全栈工程脊柱与人效跃迁', s: '长滩×奥克兰双总部 · 单一ERP · 太空系统占80.2%' },
      { id: 'sec-02', t: '02 贝克四大信条与五维文化雷达', s: 'HBR R2602K 四大支柱 · RKLB vs SpaceX vs 传统军工' },
      { id: 'sec-03', t: '03 全球商业航天与国防文化对标', s: '6大航天与防务企业检索对标表 + 横向对比图' },
      { id: 'sec-04', t: '04 垂直整合红利与复利飞轮推演', s: 'Q3 OCF +$7.2M · $4.70B净现金 · Iridium 复利模拟' },
      { id: 'sec-05', t: '05 三代组织跃迁与四大硬仗复盘', s: '吃帽子转向 · 前穹顶透明门禁 · SDA $13.3亿+' },
      { id: 'sec-06', t: '06 太空硬科技组织六维诊断清单', s: '2026–2028 Neutron 与 Iridium 整合跟踪清单' },
      { id: 'sec-07', t: '07 十二大一手信源与治理披露', s: 'SEC 10-K/10-Q/DEF 14A/8-K 与 HBR 原文链接' }
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

    // Theme & Language Switching
    function applyTheme(mode, silent) {
      var t = mode === 'dark' ? 'dark' : 'light';
      state.theme = t;
      document.documentElement.setAttribute('data-theme', t);
      
      
      document.getElementById('appbarThemeIcon').innerHTML = t === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
      renderCh1Legend();
      renderRadarLegend();
      renderEpsLegend();
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
      qInput.placeholder = isEn() ? 'Jump to chapter or metric…' : '检索文化信条或章节…';
      document.getElementById('peerSearchInput').placeholder = isEn() ? 'Filter peers, org model, or metrics…' : '搜索公司、文化机制或财务指标（支持高亮）…';
      renderPillarNote();
      renderPeerTable();
      renderCh1Legend();
      renderRadarLegend();
      renderEpsLegend();
      syncChecklistUI();
      drawAllCharts();
      if (!silent) showToast(isEn() ? 'Language set to English' : '已切换为中文界面');
    }

    // Download & Print
    function triggerDownload() {
      var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = '火箭实验室_Rocket_Lab_企业文化与组织架构深度研究报告.html';
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

    // Scroll Spy (No scrollIntoView on sidebar to prevent page jump)
    var sections = Array.prototype.slice.call(document.querySelectorAll('.doc-section'));
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll('#tocList .mui-nav-link'));
    window.addEventListener('scroll', function () {
      var bar = document.getElementById('readingProgressBar');
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
      var cur = sections[0] ? sections[0].id : '';
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= 130) cur = sections[i].id;
      }
      tocLinks.forEach(function (lk) {
        lk.classList.toggle('active', lk.getAttribute('href') === '#' + cur);
      });
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
      renderPillarNote();
      renderPeerTable();
      renderCh1Legend();
      renderRadarLegend();
      renderEpsLegend();
      syncChecklistUI();
      drawAllCharts();
    }
  })();
  