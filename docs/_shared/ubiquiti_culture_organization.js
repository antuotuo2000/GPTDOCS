
  (function () {
    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_CHK_KEY = 'ui_monograph_audit_v1';

    var state = { theme: 'dark', lang: 'zh', oView: 'seg', rMode: 'all' };
    var hitRegions = { orgDualCanvas: [], radarCanvas: [], marginBarCanvas: [], profitComboCanvas: [] };

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
      var w = Math.max(250, rect.width || 480), h = Math.max(110, rect.height || 260);
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

    function drawOrgDualCanvas() {
      var env = prepCanvas('orgDualCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.orgDualCanvas = [];
      var pad = { top: 28, right: 44, bottom: 40, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.oView === 'seg') {
        var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26', "Q1'27年化"];
        var ent = [1.35, 1.58, 1.60, 2.25, 2.97, 3.77];
        var uisp = [0.34, 0.36, 0.33, 0.32, 0.30, 0.34];
        var maxV = 4.5;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 7, gy + 4);
        }
        var slot = pw / yrs.length, bw = Math.min(44, slot * 0.54);
        yrs.forEach(function (y, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var hE = (ent[i] / maxV) * ph, hS = (uisp[i] / maxV) * ph;
          var yE = pad.top + ph - hE, yS = yE - hS;
          ctx.fillStyle = pal.blue; roundRect(ctx, x, yE, bw, hE, 4); ctx.fill();
          ctx.fillStyle = pal.amber; roundRect(ctx, x, yS, bw, Math.max(3, hS), 4); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + (ent[i] + uisp[i]).toFixed(2) + 'B', x + bw / 2, yS - 6);
          ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif';
          ctx.fillText(y, x + bw / 2, pad.top + ph + 19);
          hitRegions.orgDualCanvas.push({
            x: x, y: yS, w: bw, h: hE + hS,
            title: y + ' 双产品线营收结构',
            body: 'Enterprise (UniFi): $' + ent[i].toFixed(2) + 'B | Service Provider (UISP): $' + uisp[i].toFixed(2) + 'B | 合计 $' + (ent[i] + uisp[i]).toFixed(2) + 'B'
          });
        });
      } else {
        var yrs2 = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26', "Q1'27年化"];
        var ftes = [1223, 1377, 1535, 1515, 1667, 1818, 1818];
        var revFte = [1.55, 1.23, 1.26, 1.27, 1.54, 1.80, 2.26];
        var maxF = 2200, maxR = 2.6;
        for (var k = 0; k <= 4; k++) {
          var ky = pad.top + ph - (k / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(Math.round((maxF / 4) * k) + '人', pad.left - 6, ky + 4);
          ctx.textAlign = 'left';
          ctx.fillText('$' + ((maxR / 4) * k).toFixed(1) + 'M', pad.left + pw + 6, ky + 4);
        }
        var sl = pw / yrs2.length, bw2 = Math.min(34, sl * 0.48);
        yrs2.forEach(function (y, i) {
          var x = pad.left + i * sl + (sl - bw2) / 2;
          var bh = (ftes[i] / maxF) * ph;
          ctx.fillStyle = pal.blueSoft; roundRect(ctx, x, pad.top + ph - bh, bw2, bh, 4); ctx.fill();
          ctx.strokeStyle = pal.blue; ctx.lineWidth = 1.2; roundRect(ctx, x, pad.top + ph - bh, bw2, bh, 4); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(y, x + bw2 / 2, pad.top + ph + 19);
          hitRegions.orgDualCanvas.push({
            x: x, y: pad.top, w: bw2, h: ph,
            title: y + ' 员工编制与人效',
            body: '全职员工: ' + ftes[i] + ' 人 | 人均创收: $' + revFte[i].toFixed(2) + 'M / FTE'
          });
        });
        ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
        revFte.forEach(function (v, i) {
          var px = pad.left + i * sl + sl / 2, py = pad.top + ph - (v / maxR) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        revFte.forEach(function (v, i) {
          var px = pad.left + i * sl + sl / 2, py = pad.top + ph - (v / maxR) * ph;
          ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
          if (i === 0 || i === 5 || i === 6) {
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + v.toFixed(2) + 'M', px, py - 8);
          }
        });
      }
    }

    function drawRadarCanvas() {
      var env = prepCanvas('radarCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.radarCanvas = [];
      var cx = w / 2, cy = h / 2 + 6, radius = Math.min(w, h) * 0.35;
      var axes = ['研发编制浓度', '人均创收效能', '销管极简纪律', '反期权稀释纯度', '原生软硬一体'];
      var uiVals = [95, 86, 98, 99, 92];
      var aaplVals = [72, 95, 88, 80, 98];
      var cscoVals = [45, 38, 34, 58, 48];

      for (var lv = 1; lv <= 4; lv++) {
        var r = (radius / 4) * lv;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath();
        for (var a = 0; a < 5; a++) {
          var ang = -Math.PI / 2 + (a * 2 * Math.PI) / 5;
          var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      }
      for (var i = 0; i < 5; i++) {
        var ang2 = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        var ex = cx + Math.cos(ang2) * radius, ey = cy + Math.sin(ang2) * radius;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
        var lx = cx + Math.cos(ang2) * (radius + 22), ly = cy + Math.sin(ang2) * (radius + 16);
        ctx.fillStyle = pal.sub; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(axes[i], lx, ly + 4);
        hitRegions.radarCanvas.push({
          x: lx - 42, y: ly - 12, w: 84, h: 24,
          title: axes[i] + ' 评分对比',
          body: 'Ubiquiti: ' + uiVals[i] + ' | Apple: ' + aaplVals[i] + ' | Cisco: ' + cscoVals[i]
        });
      }

      function plotPoly(vals, strokeCol, fillCol) {
        ctx.beginPath();
        vals.forEach(function (v, idx) {
          var ang = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
          var rr = (v / 100) * radius;
          var px = cx + Math.cos(ang) * rr, py = cy + Math.sin(ang) * rr;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = fillCol; ctx.fill();
        ctx.strokeStyle = strokeCol; ctx.lineWidth = 2.3; ctx.stroke();
      }

      plotPoly(cscoVals, pal.amber, 'rgba(217, 119, 6, 0.10)');
      if (state.rMode === 'all') plotPoly(aaplVals, pal.violet, 'rgba(124, 58, 237, 0.10)');
      plotPoly(uiVals, pal.blue, pal.blueSoft);
    }

    function drawMarginBarCanvas() {
      var env = prepCanvas('marginBarCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.marginBarCanvas = [];
      var rows = [
        { lbl: '研发人员占比 (1,321/1,818)', val: 72.7, col: pal.blue, tip: 'FY2026 全球 1,321 名研发人员占总员工 72.7%，硬核工程驱动' },
        { lbl: "Q1 FY27 GAAP 毛利率", val: 47.3, col: pal.violet, tip: 'Q1 FY27 毛利额 $485.35M / 营收 $1,026.25M = 47.3% (+130bps YoY)' },
        { lbl: "Q1 FY27 GAAP 营业利润率", val: 38.1, col: pal.green, tip: '扣除仅 9.1% 总营业费用后，单季营业利润率高达 38.1% ($391.47M)' },
        { lbl: "Q1 FY27 GAAP 净利率", val: 31.2, col: pal.green, tip: '单季 GAAP 净利润 $320.46M (+54.2% YoY)，净利率高达 31.2%' },
        { lbl: '供应链与运营人员占比 (370人)', val: 20.4, col: pal.amber, tip: '370 名供应链、采购、质量与全球仓配运营团队' },
        { lbl: 'SG&A 费用占营收比 (FY26)', val: 3.7, col: pal.red, tip: '全年 SG&A 仅 $121.77M (3.7%)，而传统网通巨头高达 25%–36%' }
      ];
      var pad = { top: 12, right: 56, bottom: 12, left: 178 };
      var pw = Math.max(90, w - pad.left - pad.right), rowH = (h - pad.top - pad.bottom) / rows.length;
      rows.forEach(function (r, idx) {
        var cy = pad.top + idx * rowH + rowH / 2, bh = Math.min(20, rowH * 0.58);
        var bw = (r.val / 80) * pw;
        ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
        ctx.fillStyle = r.col; roundRect(ctx, pad.left, cy - bh / 2, Math.max(5, bw), bh, 5); ctx.fill();
        ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(r.lbl, pad.left - 10, cy + 4);
        ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
        ctx.fillText(r.val.toFixed(1) + '%', pad.left + bw + 8, cy + 4);
        hitRegions.marginBarCanvas.push({ x: pad.left, y: cy - bh / 2 - 3, w: pw, h: bh + 6, title: r.lbl, body: r.tip });
      });
    }

    function drawProfitComboCanvas() {
      var env = prepCanvas('profitComboCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.profitComboCanvas = [];
      var pad = { top: 28, right: 44, bottom: 40, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26', "Q1'27年化"];
      var netInc = [378.7, 407.6, 350.0, 711.9, 960.3, 1281.9];
      var gm = [39.6, 39.2, 38.4, 43.4, 46.2, 47.3];
      var maxN = 1450, minG = 34, maxG = 50;

      for (var g = 0; g <= 4; g++) {
        var gy = pad.top + ph - (g / 4) * ph;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
        ctx.fillText('$' + Math.round((maxN / 4) * g) + 'M', pad.left - 6, gy + 4);
        ctx.textAlign = 'left';
        ctx.fillText((minG + ((maxG - minG) / 4) * g).toFixed(0) + '%', pad.left + pw + 6, gy + 4);
      }
      var slot = pw / yrs.length, bw = Math.min(42, slot * 0.52);
      yrs.forEach(function (y, i) {
        var x = pad.left + i * slot + (slot - bw) / 2;
        var bh = (netInc[i] / maxN) * ph, yt = pad.top + ph - bh;
        ctx.fillStyle = i >= 4 ? pal.blue : pal.blueSoft;
        roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + Math.round(netInc[i]) + 'M', x + bw / 2, yt - 6);
        ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif';
        ctx.fillText(y, x + bw / 2, pad.top + ph + 19);
        hitRegions.profitComboCanvas.push({
          x: x, y: yt, w: bw, h: bh,
          title: y + ' 盈利与毛利表现',
          body: 'GAAP 净利润: $' + netInc[i].toFixed(1) + 'M | GAAP 毛利率: ' + gm[i].toFixed(1) + '%'
        });
      });
      ctx.strokeStyle = pal.green; ctx.lineWidth = 2.6; ctx.beginPath();
      gm.forEach(function (v, i) {
        var px = pad.left + i * slot + slot / 2;
        var py = pad.top + ph - ((v - minG) / (maxG - minG)) * ph;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      gm.forEach(function (v, i) {
        var px = pad.left + i * slot + slot / 2;
        var py = pad.top + ph - ((v - minG) / (maxG - minG)) * ph;
        ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
      });
    }

    var ERA_CFG = {
      ipo: { mult: 46.8, cagr: 29.2, pts: [1.0, 2.4, 5.8, 13.5, 27.2, 46.8] },
      rebound: { mult: 3.66, cagr: 54.1, pts: [1.0, 1.35, 2.03, 2.74, 3.20, 3.66] },
      future: { mult: 4.05, cagr: 15.0, pts: [1.0, 1.32, 1.75, 2.31, 3.06, 4.05] }
    };
    function runEraSimulator() {
      var k = document.getElementById('eraSelect').value;
      var p = parseFloat(document.getElementById('principalSlider').value) || 50000;
      var cfg = ERA_CFG[k] || ERA_CFG.ipo;
      var finalV = Math.round(p * cfg.mult);
      document.getElementById('principalLbl').textContent = '$' + p.toLocaleString();
      document.getElementById('eraFinalVal').textContent = '$' + finalV.toLocaleString();
      document.getElementById('eraMultVal').textContent = cfg.mult.toFixed(2) + 'x';
      document.getElementById('eraCagrVal').textContent = cfg.cagr.toFixed(1) + '%';

      var env = prepCanvas('eraSimCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var pad = { top: 14, right: 14, bottom: 14, left: 14 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var maxP = cfg.pts[cfg.pts.length - 1] * 1.1;
      ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.5; ctx.beginPath();
      cfg.pts.forEach(function (v, idx) {
        var px = pad.left + (idx / (cfg.pts.length - 1)) * pw;
        var py = pad.top + ph - (v / maxP) * ph;
        if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      cfg.pts.forEach(function (v, idx) {
        var px = pad.left + (idx / (cfg.pts.length - 1)) * pw;
        var py = pad.top + ph - (v / maxP) * ph;
        ctx.fillStyle = idx === cfg.pts.length - 1 ? pal.green : pal.blue;
        ctx.beginPath(); ctx.arc(px, py, 3.8, 0, Math.PI * 2); ctx.fill();
      });
    }
    document.getElementById('eraSelect').addEventListener('change', runEraSimulator);
    document.getElementById('principalSlider').addEventListener('input', runEraSimulator);

    // Accordion
    document.getElementById('orgAccList').addEventListener('click', function (e) {
      var b = e.target.closest('.matrix-acc-btn');
      if (!b) return;
      var item = b.parentElement;
      item.classList.toggle('open');
    });

    // Peer filter & search
    var activePeerCat = 'all';
    function filterPeers() {
      var kw = (document.getElementById('peerSearchInput').value || '').trim().toLowerCase();
      document.querySelectorAll('#culPeerTable tbody tr').forEach(function (tr) {
        var gc = tr.getAttribute('data-gcat') || '';
        var catOk = (activePeerCat === 'all' || gc.indexOf(activePeerCat) !== -1);
        var kwOk = (!kw || tr.textContent.toLowerCase().indexOf(kw) !== -1);
        tr.style.display = (catOk && kwOk) ? '' : 'none';
      });
    }
    document.getElementById('peerSearchInput').addEventListener('input', filterPeers);
    document.getElementById('peerCatTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-gcat]');
      if (!b) return;
      activePeerCat = b.getAttribute('data-gcat');
      this.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
      filterPeers();
    });

    // Battles
    var BATTLES = [
      {
        t: '战役一（2015）：$4,670 万跨国商务电邮诈骗（BEC）冲击与财务集中管控重塑',
        d: '2015年厄比奎蒂香港子公司曾遭遇外部黑客假冒高管邮件诈骗 $4,670 万美元（后追回部分款项），暴露出早期极端精简行政团队在内控审批上的短板。危机后 Pera 于 2016 年引入资深财务老将 Kevin Radigan 出任首席会计官（2019年升任 CFO），在不增加冗余销售官僚的前提下重建全球资金内控与审计防线。'
      },
      {
        t: '战役二（2016–2018）：做空机构香橼（Citron）公开狙击与业绩回购双杀',
        d: '知名做空机构曾质疑厄比奎蒂“没有销售团队却拥有超高利润率违背商业常识”。面对质疑，Pera 没有打口水战，而是直接用持续激增的 UniFi 终端激活量、真实经营现金流与低位大举回购注销股票予以回应，迫使空头认赔出局，铸就十倍股传奇。'
      },
      {
        t: '战役三（2021–2023）：云安全勒索事件与全球缺芯期 $7.8 亿库存逆向豪赌',
        d: '2021年名前员工实施内部勒索并煽动媒体恐慌（最终该前员工认罪获刑），紧接着全球芯片断供重创硬件交付。Pera 果断动用信贷额度在 FY23 承受 -$1.66亿自由现金流逆势锁死核心射频与交换芯片，为 2025–2026 年同行缺货时的份额暴涨奠定胜局。'
      },
      {
        t: '战役四（2025–2026）：一年扫清全部银行贷款，携 EFG/E7/AI Key 攻入大型园区',
        d: '伴随库存高效变现与毛利率回升至 46.2%–47.3%，公司在 2026年2月27日一次性还清全部定期贷款，截至 2026年9月末坐拥 $8.45亿现金且零银行借款，同时凭双机热备 EFG 与 100G 园区交换机打开中大型企业增量天花板。'
      }
    ];
    document.getElementById('battleTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-battle]');
      if (!b) return;
      var idx = parseInt(b.getAttribute('data-battle'), 10) || 0;
      this.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
      document.getElementById('battleTitle').textContent = BATTLES[idx].t;
      document.getElementById('battleDesc').textContent = BATTLES[idx].d;
    });

    // Chart tabs & hover tooltips
    document.getElementById('orgChartTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-oview]');
      if (!b) return;
      state.oView = b.getAttribute('data-oview');
      this.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
      drawOrgDualCanvas();
    });
    document.getElementById('radarToggle').addEventListener('click', function (e) {
      var b = e.target.closest('[data-rmode]');
      if (!b) return;
      state.rMode = b.getAttribute('data-rmode');
      this.querySelectorAll('.mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
      drawRadarCanvas();
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
    ['orgDualCanvas', 'radarCanvas', 'marginBarCanvas', 'profitComboCanvas'].forEach(bindHoverTooltip);

    function drawAllCharts() {
      drawOrgDualCanvas();
      drawRadarCanvas();
      drawMarginBarCanvas();
      drawProfitComboCanvas();
      runEraSimulator();
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

    // Quick Jump
    var QUICK_ITEMS = [
      { id: 'sec-00', t: '00 核心命题与组织人效快照', s: '93%创始人持股 · $2.26M人均年化创收 · 8.83:1薪酬比' },
      { id: 'sec-01', t: '01 创始人直管与2高管/4董事架构', s: 'Robert Pera CODM · 台北/里加/布拉格分布式研发' },
      { id: 'sec-02', t: '02 四大文化支柱与五维基因雷达', s: '极客密度 · 社区自传播 · 苹果工艺 · 零稀释纪律' },
      { id: 'sec-03', t: '03 五大网通与科技巨头人效对标表', s: 'UI vs ANET / CSCO / AAPL / NVDA 搜索与筛选' },
      { id: 'sec-04', t: '04 盈利跃迁曲线与多纪元复利推演', s: '2011 IPO 46.8x复利 · 去库存反转 · 攻守双透镜' },
      { id: 'sec-05', t: '05 三幕创业演进史与四大经典战役', s: '$3万起步 → 反杀做空 → $8.45亿净现金零负债' },
      { id: 'sec-06', t: '06 机构投资者六项持久文化审计清单', s: 'SG&A <5% · R&D >68% · SBC <1% 实时勾选追踪' },
      { id: 'sec-07', t: '07 十二大权威一手 SEC 与产品信源', s: 'Q1 FY27 10-Q · FY26 10-K · DEF 14A 直达链接' }
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

    // Suite Hub
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

    // Sidebar, Theme, Lang, Export, Print & Checklist Persistence
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
      a.download = '厄比奎蒂 Ubiquiti Inc. 企业文化与组织架构深度研究报告.html';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast('已触发下载：厄比奎蒂 Ubiquiti Inc. 企业文化与组织架构深度研究报告.html');
    });
    document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

    function updateChkBadge() {
      var all = document.querySelectorAll('[data-cchk]'), cnt = 0;
      all.forEach(function (c) { if (c.checked) cnt++; });
      document.getElementById('auditCountBadge').textContent = '已核验 ' + cnt + ' / ' + all.length;
    }
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_CHK_KEY) || '{}');
      document.querySelectorAll('[data-cchk]').forEach(function (chk) {
        var k = chk.getAttribute('data-cchk');
        chk.checked = !!saved[k];
        chk.addEventListener('change', function () {
          saved[k] = chk.checked;
          try { localStorage.setItem(STORAGE_CHK_KEY, JSON.stringify(saved)); } catch (err) {}
          updateChkBadge();
        });
      });
      updateChkBadge();
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
    drawAllCharts();
  })();
  