
  (function () {
    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_CHARTER_KEY = 'ui_org_os_charter_v1';

    var state = { theme: 'dark', lang: 'zh', eView: 'revfte', entOpm: 38.1, entRealFcf: 30.2 };
    var hitRegions = { evoCanvas: [], genomeCanvas: [], entropyCanvas: [] };

    function showToast(msg) {
      var bar = document.getElementById('muiSnackbar');
      if (!bar) return;
      bar.textContent = msg;
      bar.classList.add('show');
      clearTimeout(bar._t);
      bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2200);
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
      var w = Math.max(250, rect.width || 480), h = Math.max(140, rect.height || 260);
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

    // C0 Topology Switcher
    var TOPOS = {
      ui: {
        legacy: false,
        root: 'Robert J. Pera (93% 持股创始人 / 单一 CODM 首席架构师) · 直审原型与合并净利',
        branches: [
          ['台北硬件射频与制造核 (65% APAC)', 'Wi-Fi 7 PRISM™、100G 交换 PCB、铝合金结构与 ODM 直连'],
          ['东欧/北欧软件与AI核 (23% EMEA)', '里加/布拉格精锐小队原生构建 UniFi OS、Protect AI 与路由栈'],
          ['百万社区 + 44% 直营网店闭环', 'UI 论坛零中介反馈直达代码库，仅 127 名 SG&A 支撑全球交付']
        ],
        metrics: [['72.7% vs 7.0%', '研发人员 vs SG&A人员占比'], ['3.7% (FY26)', '全年销管费用率（同行 25%–36%）'], ['$1.67M', '净无形资产（零并购拼凑孤岛）'], ['$2.26M / FTE', 'Q1 FY27 年化人均创收']]
      },
      legacy: {
        legacy: true,
        root: '职业经理人 CEO + 多层级 EVP / 大区销售总裁 / 并购整合委员会',
        branches: [
          ['割裂的事业部群 (无线BU/安全BU/协作BU)', '各自维护独立老旧操作系统与价格体系，跨部门抢预算'],
          ['数万人全球直销与渠道返点大军', '层层客户经理、高尔夫公关与高额佣金吞噬 25%–36% 营收'],
          ['强制按年收租 (License Lock-in)', '为维持高毛利被迫锁死设备后台按年收费，激发中小企业逃离']
        ],
        metrics: [['~35% vs ~35%', '销售行政与研发平分臃肿编制'], ['25% – 36%', '高昂 SG&A 销售与营销费用率'], ['$10B+ 商誉', '频繁溢价收购遗留沉重摊销'], ['$0.77M / FTE', '传统网通巨头典型人均创收']]
      }
    };
    document.getElementById('topoTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-topo]');
      if (!b) return;
      var k = b.getAttribute('data-topo');
      this.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
      var t = TOPOS[k] || TOPOS.ui;
      var rEl = document.getElementById('topoRoot');
      rEl.textContent = t.root;
      rEl.classList.toggle('is-legacy', t.legacy);
      document.getElementById('topoBranches').innerHTML = t.branches.map(function (br) {
        return '<div class="topo-node"><b>' + br[0] + '</b><span>' + br[1] + '</span></div>';
      }).join('');
      document.getElementById('topoMetrics').innerHTML = t.metrics.map(function (m) {
        return '<div class="topo-mcard"><b class="mono">' + m[0] + '</b><span>' + m[1] + '</span></div>';
      }).join('');
    });

    // C1 Dial
    function runOpexDial() {
      var sga = parseFloat(document.getElementById('dialSgaSlider').value);
      var rd = parseFloat(document.getElementById('dialRdSlider').value);
      var gm = 47.3;
      var opm = Math.max(0, gm - sga - rd);
      var opInc = 4.105 * (opm / 100);
      var eps = (opInc * 0.818) / 0.06057; // ~18.2% Q1 effective tax, 60.57M diluted shares
      document.getElementById('dialSgaLbl').textContent = sga.toFixed(1) + '%';
      document.getElementById('dialRdLbl').textContent = rd.toFixed(1) + '%';
      document.getElementById('segRd').style.width = rd.toFixed(1) + '%';
      document.getElementById('segSga').style.width = sga.toFixed(1) + '%';
      document.getElementById('segOpm').style.width = opm.toFixed(1) + '%';
      document.getElementById('dialOpmOut').textContent = opm.toFixed(1) + '%';
      document.getElementById('dialOpIncOut').textContent = '$' + opInc.toFixed(2) + 'B';
      document.getElementById('dialEpsOut').textContent = '$' + eps.toFixed(2);
      var v = opm >= 34 ? '极致精益态' : (opm >= 22 ? '温和膨胀态' : '官僚失血态');
      document.getElementById('dialVerdict').textContent = v;
    }
    document.getElementById('dialSgaSlider').addEventListener('input', runOpexDial);
    document.getElementById('dialRdSlider').addEventListener('input', runOpexDial);
    document.getElementById('dialResetBtn').addEventListener('click', function () {
      document.getElementById('dialSgaSlider').value = 4.0;
      document.getElementById('dialRdSlider').value = 5.2;
      runOpexDial();
    });

    // C2 Stages & Canvas
    var STAGES = [
      {
        t: 'Stage I（2005–2011）：$3万信用卡草根突围与全球 WISP 社区裂变',
        d: 'Pera 单枪匹马设计 SuperRange 高功率射频卡切入被大厂忽视的农村无线宽带运营商（WISP）市场，随后集结数十名顶尖射频与嵌入式工程师推出 AirOS 与 AirMAX TDMA 协议，零风险投资、零销售代表于 2011 年成功上市。',
        s: [['<200人', '早期超精悍极客团队'], ['$0 VC', '100% 依靠内生利润滚动'], ['AirMAX', '奠定户外远距射频统治力']]
      },
      {
        t: 'Stage II（2012–2023）：UniFi 企业网通革命、激进缩股与供应链大考',
        d: '确立“台北硬件供应链中心 + 东欧软件工程中心”双核架构，员工从 725 人（FY17）稳健增至 1,535 人（FY23）。在承受做空狙击、安全事件与全球缺芯挑战的同时，回购注销超三成总股本，完成向企业级市场的重心切换。',
        s: [['725→1,535人', 'FY17–FY23 克制扩编'], ['-33.7%', '上市后累计净缩减总股本'], ['90%+ 留存', '百万IT社区口碑护城河成型']]
      },
      {
        t: 'Stage III（2024–2026+）：全栈智能建筑操作系统与十亿美元单季井喷',
        d: '组织进入成熟高杠杆收获期：全球研发团队扩展至 1,321 人（总编制 1,818 人），在同一 UniFi OS 控制面下打通网关路由（EFG）、100G 层三交换、Wi-Fi 7 PRISM™、Protect AI Key 视觉推理、Access 门禁与 UNAS 企业存储六大垂直栈，并实现有息银行贷款清零与单季 $10.26亿历史最高营收。',
        s: [['1,818人', '全球精悍总编制'], ['$2.26M', "Q1'27年化人均创收"], ['$845.5M', '净现金及短投储备']]
      }
    ];
    document.getElementById('stageTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-stage]');
      if (!b) return;
      var idx = parseInt(b.getAttribute('data-stage'), 10) || 0;
      this.querySelectorAll('.stage-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
      var st = STAGES[idx];
      document.getElementById('stageTitle').textContent = st.t;
      document.getElementById('stageDesc').textContent = st.d;
      document.getElementById('stageStats').innerHTML = st.s.map(function (x) {
        return '<div class="stage-stat"><b class="mono">' + x[0] + '</b><span>' + x[1] + '</span></div>';
      }).join('');
    });

    function drawEvoCanvas() {
      var env = prepCanvas('evoCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.evoCanvas = [];
      var pad = { top: 28, right: 24, bottom: 40, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.eView === 'revfte') {
        var yrs = ['FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26', "Q1'27年化"];
        var vals = [1.26, 1.55, 1.23, 1.26, 1.27, 1.54, 1.80, 2.26];
        var maxV = 2.6;
        for (var g = 0; g <= 4; g++) {
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + ((maxV / 4) * g).toFixed(1) + 'M', pad.left - 7, gy + 4);
        }
        ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.8; ctx.beginPath();
        vals.forEach(function (v, i) {
          var px = pad.left + (i / (yrs.length - 1)) * pw, py = pad.top + ph - (v / maxV) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        vals.forEach(function (v, i) {
          var px = pad.left + (i / (yrs.length - 1)) * pw, py = pad.top + ph - (v / maxV) * ph;
          ctx.fillStyle = i >= 6 ? pal.green : pal.blue;
          ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(2) + 'M', px, py - 9);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
          ctx.fillText(yrs[i], px, pad.top + ph + 19);
          hitRegions.evoCanvas.push({ x: px - 14, y: py - 14, w: 28, h: 28, title: yrs[i] + ' 人均创收', body: '每位全职员工年创收: $' + v.toFixed(2) + 'M' });
        });
      } else {
        var cats = [
          { lbl: '研发工程 R&D (台北/欧洲/美)', cnt: 1321, pct: 72.7, col: pal.blue },
          { lbl: '供应链与物流运营 Operations', cnt: 370, pct: 20.4, col: pal.amber },
          { lbl: '财务法务与销管行政 SG&A', cnt: 127, pct: 7.0, col: pal.green }
        ];
        var slot = ph / cats.length;
        cats.forEach(function (c, idx) {
          var cy = pad.top + idx * slot + slot / 2, bh = 28;
          var x0 = pad.left + 135, maxW = Math.max(80, pw - 175);
          var bw = (c.pct / 80) * maxW;
          ctx.fillStyle = pal.grid; roundRect(ctx, x0, cy - bh / 2, maxW, bh, 6); ctx.fill();
          ctx.fillStyle = c.col; roundRect(ctx, x0, cy - bh / 2, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.sub; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(c.lbl, x0 - 10, cy + 4);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText(c.cnt + '人 (' + c.pct.toFixed(1) + '%)', x0 + bw + 8, cy + 4);
          hitRegions.evoCanvas.push({ x: x0, y: cy - bh / 2, w: maxW, h: bh, title: c.lbl, body: 'FY2026 编制: ' + c.cnt + ' 人，占全集团 1,818 人的 ' + c.pct.toFixed(1) + '%' });
        });
      }
    }
    document.getElementById('evoViewTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-eview]');
      if (!b) return;
      state.eView = b.getAttribute('data-eview');
      this.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
      drawEvoCanvas();
    });

    // C3 Genome Quadrant Scatter
    function drawGenomeCanvas() {
      var env = prepCanvas('genomeCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.genomeCanvas = [];
      var pad = { top: 28, right: 28, bottom: 42, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var maxX = 40, maxY = 68;

      for (var g = 0; g <= 4; g++) {
        var gy = pad.top + ph - (g / 4) * ph;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
        ctx.fillText(Math.round((maxY / 4) * g) + '%', pad.left - 6, gy + 4);
        var gx = pad.left + (g / 4) * pw;
        ctx.textAlign = 'center';
        ctx.fillText(Math.round((maxX / 4) * g) + '% SG&A', gx, pad.top + ph + 20);
      }

      var peers = [
        { n: 'Ubiquiti (UI)', sga: 3.7, opm: 38.1, rfte: 2.26, col: pal.blue, r: 15 },
        { n: 'NVIDIA', sga: 1.8, opm: 60.6, rfte: 5.14, col: pal.green, r: 20 },
        { n: 'Apple', sga: 6.2, opm: 33.1, rfte: 2.87, col: pal.violet, r: 16 },
        { n: 'Arista', sga: 7.5, opm: 43.5, rfte: 1.91, col: pal.blue, r: 13 },
        { n: 'Cisco', sga: 25.0, opm: 24.2, rfte: 0.77, col: pal.amber, r: 10 },
        { n: 'Fortinet', sga: 35.5, opm: 30.5, rfte: 0.45, col: pal.red, r: 9 }
      ];
      peers.forEach(function (p) {
        var px = pad.left + (p.sga / maxX) * pw;
        var py = pad.top + ph - (p.opm / maxY) * ph;
        ctx.fillStyle = p.col; ctx.globalAlpha = 0.25;
        ctx.beginPath(); ctx.arc(px, py, p.r + 4, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.col;
        ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(p.n, px + p.r + 6, py + 4);
        hitRegions.genomeCanvas.push({
          x: px - p.r - 4, y: py - p.r - 4, w: (p.r + 4) * 2, h: (p.r + 4) * 2,
          title: p.n + ' 组织效率坐标',
          body: 'SG&A 费率: ' + p.sga + '% | 营业利润率: ' + p.opm + '% | 人均创收: $' + p.rfte + 'M'
        });
      });
    }

    // C4 Entropy Simulator & Canvas
    function drawEntropyCanvas() {
      var env = prepCanvas('entropyCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.entropyCanvas = [];
      var pad = { top: 30, right: 24, bottom: 42, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var maxM = 45;
      for (var g = 0; g <= 3; g++) {
        var gy = pad.top + ph - (g / 3) * ph;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
        ctx.fillText(Math.round((maxM / 3) * g) + '%', pad.left - 7, gy + 4);
      }
      var groups = [
        { lbl: "Q1'27 真实创始人基线", opm: 38.1, fcf: 30.2, c1: pal.blue, c2: pal.green },
        { lbl: '模拟组织熵增后表现', opm: Math.max(0, state.entOpm), fcf: Math.max(0, state.entRealFcf), c1: pal.amber, c2: pal.red }
      ];
      var slot = pw / 2, bw = Math.min(48, slot * 0.28);
      groups.forEach(function (gr, i) {
        var cx = pad.left + i * slot + slot / 2;
        var h1 = (gr.opm / maxM) * ph, h2 = (gr.fcf / maxM) * ph;
        ctx.fillStyle = gr.c1; roundRect(ctx, cx - bw - 4, pad.top + ph - h1, bw, Math.max(4, h1), 5); ctx.fill();
        ctx.fillStyle = gr.c2; roundRect(ctx, cx + 4, pad.top + ph - h2, bw, Math.max(4, h2), 5); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText(gr.opm.toFixed(1) + '%', cx - bw / 2 - 4, pad.top + ph - h1 - 7);
        ctx.fillText(gr.fcf.toFixed(1) + '%', cx + bw / 2 + 4, pad.top + ph - h2 - 7);
        ctx.fillStyle = pal.sub; ctx.font = 'bold 11.5px sans-serif';
        ctx.fillText(gr.lbl, cx, pad.top + ph + 22);
        hitRegions.entropyCanvas.push({
          x: cx - bw - 8, y: pad.top, w: bw * 2 + 16, h: ph,
          title: gr.lbl,
          body: '营业利润率: ' + gr.opm.toFixed(1) + '% | 扣除SBC后真实股东FCF率: ' + gr.fcf.toFixed(1) + '%'
        });
      });
    }

    function runEntropySim() {
      var salesAdd = parseFloat(document.getElementById('entSalesSlider').value);
      var skuDrag = parseFloat(document.getElementById('entSkuSlider').value);
      var sbcPct = parseFloat(document.getElementById('entSbcSlider').value);
      document.getElementById('entSalesLbl').textContent = '+' + salesAdd.toFixed(1) + '%';
      document.getElementById('entSkuLbl').textContent = '-' + skuDrag.toFixed(1) + '%';
      document.getElementById('entSbcLbl').textContent = sbcPct.toFixed(2) + '%';

      var opm = Math.max(2.0, 38.1 - salesAdd - skuDrag);
      var realFcf = Math.max(0, (opm * 0.80) - (sbcPct - 0.23));
      var score = Math.max(18, Math.round(96 - salesAdd * 2.1 - skuDrag * 2.4 - (sbcPct - 0.23) * 2.6));
      state.entOpm = opm;
      state.entRealFcf = realFcf;

      document.getElementById('entOpmOut').textContent = opm.toFixed(1) + '%';
      document.getElementById('entRealFcfOut').textContent = realFcf.toFixed(1) + '%';
      document.getElementById('entHealthScore').textContent = score + ' / 100';
      drawEntropyCanvas();
    }
    ['entSalesSlider', 'entSkuSlider', 'entSbcSlider'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', runEntropySim);
    });
    document.getElementById('entResetBtn').addEventListener('click', function () {
      document.getElementById('entSalesSlider').value = 0;
      document.getElementById('entSkuSlider').value = 0;
      document.getElementById('entSbcSlider').value = 0.23;
      runEntropySim();
    });

    function bindHoverTooltip(canvasId) {
      var c = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
      c.addEventListener('mousemove', function (ev) {
        var r = c.getBoundingClientRect();
        var mx = ev.clientX - r.left, my = ev.clientY - r.top;
        var list = hitRegions[canvasId] || [], hit = null;
        for (var i = 0; i < list.length; i++) {
          var rg = list[i];
          if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
        }
        if (hit) {
          tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
          tip.style.display = 'block';
          tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
          tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
        } else {
          tip.style.display = 'none';
        }
      });
      c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
    }
    ['evoCanvas', 'genomeCanvas', 'entropyCanvas'].forEach(bindHoverTooltip);

    function drawAllCharts() {
      drawEvoCanvas();
      drawGenomeCanvas();
      drawEntropyCanvas();
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
      document.getElementById('sideThemeLightBtn').classList.toggle('active', state.theme === 'light');
      document.getElementById('sideThemeDarkBtn').classList.toggle('active', state.theme === 'dark');
      drawAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
    }

    function applyLang(lang, silent) {
      state.lang = (lang === 'en') ? 'en' : 'zh';
      document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
      document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
      document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
      document.querySelectorAll('[data-i18n-zh]').forEach(function (n) {
        var val = n.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
        if (val !== null) n.textContent = val;
      });
      drawAllCharts();
      if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
    }

    var QUICK_ITEMS = [
      { id: 'sec-c0', t: 'C0 创始人模式 vs 传统网通拓扑切换器', s: '10.4:1 研发/销管人头比 · 单一 CODM 神经中枢' },
      { id: 'sec-c1', t: 'C1 2×2 文化操作密码本与费率拨盘', s: '零VC零SBC · 全球极客套利 · 社区直连 · 费率模拟' },
      { id: 'sec-c2', t: 'C2 三阶段组织进化推杆与人效画布', s: '2005草根突围 → UniFi缩股 → $2.26M人均年化创收' },
      { id: 'sec-c3', t: 'C3 全球组织基因象限图与三组阴阳镜像', s: 'UI vs Apple / Cisco / Arista 效率坐标对决' },
      { id: 'sec-c4', t: 'C4 组织熵增压力模拟器与六律审计', s: '直销膨胀/SKU失焦/期权稀释三因子压力测试' },
      { id: 'sec-c5', t: 'REF 权威监管与组织治理信源', s: 'SEC DEF 14A · FY26 10-K · Q1 FY27 10-Q' }
    ];
    var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
    function renderQuick(q) {
      var kw = (q || '').trim().toLowerCase();
      var matched = QUICK_ITEMS.filter(function (it) { return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1; });
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
    document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qInput.focus(); } });

    var hub = document.getElementById('companySubfolderHub');
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
      var item = e.target.closest('[data-suite-file]');
      if (item) {
        if (item.classList.contains('active')) window.scrollTo({ top: 0, behavior: 'smooth' });
        else showToast('同套系关联研报：' + item.getAttribute('data-suite-file') + '（可在聊天附件列表切换打开或下载）');
      }
    });

    var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
    document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
      if (window.innerWidth < 1024) {
        var op = sb.classList.toggle('open'); bd.classList.toggle('open', op);
      } else {
        var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
        if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
        else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
        setTimeout(drawAllCharts, 60);
      }
    });
    bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

    document.getElementById('appbarThemeBtn').addEventListener('click', function () {
      var nxt = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nxt, false);
      try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
    });
    document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
    document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
    document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
      var lb = e.target.closest('[data-lang]');
      if (!lb) return;
      var nl = lb.getAttribute('data-lang');
      applyLang(nl, false);
      try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
    });

    document.getElementById('sideExportBtn')?.addEventListener('click', function () {
      var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
      var a = document.createElement('a');
      a.href = url;
      a.download = '厄比奎蒂企业文化与组织操作系统.html';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast('已触发下载：厄比奎蒂企业文化与组织操作系统.html');
    });
    document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

    function updateCharterBadge() {
      var all = document.querySelectorAll('[data-ochk]'), cnt = 0;
      all.forEach(function (c) { if (c.checked) cnt++; });
      document.getElementById('charterBadge').textContent = '反熵增防线：' + cnt + ' / ' + all.length + ' 已核签';
    }
    try {
      var savedC = JSON.parse(localStorage.getItem(STORAGE_CHARTER_KEY) || '{}');
      document.querySelectorAll('[data-ochk]').forEach(function (chk) {
        var k = chk.getAttribute('data-ochk');
        chk.checked = !!savedC[k];
        chk.addEventListener('change', function () {
          savedC[k] = chk.checked;
          try { localStorage.setItem(STORAGE_CHARTER_KEY, JSON.stringify(savedC)); } catch (err) {}
          updateCharterBadge();
        });
      });
      updateCharterBadge();
      if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
      applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
    } catch (e) {}

    window.addEventListener('scroll', function () {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      document.getElementById('readingProgressBar').style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
    }, { passive: true });

    var rt = null;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAllCharts, 90); });
    runOpexDial();
    runEntropySim();
    drawAllCharts();
  })();
  