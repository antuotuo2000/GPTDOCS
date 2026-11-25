
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_DIAG_KEY = 'chwy_culture_diag_v1';

    var state = {
      theme: document.documentElement.getAttribute('data-theme') || 'dark',
      lang: 'zh',
      ch1View: 'efficiency'
    };

    var QUICK_ITEMS = [
      { id: 'sec-00', t: '00 执行摘要与核心命题', s: '18,000 FTE · $700K 人均创收 · 84.6% Autoship' },
      { id: 'sec-01', t: '01 无COO扁平职能制与高管架构', s: 'Sumit Singh · Mita Malhotra · Chris Deppe · AFC机器人' },
      { id: 'sec-02', t: '02 7大官方运营准则与文化雷达', s: 'WOW手绘油画 · <10s接听 · Operate in the Details' },
      { id: 'sec-03', t: '03 全球标杆横评矩阵 (DataGrid)', s: 'Chewy vs Amazon / Costco / Apple / Petco' },
      { id: 'sec-04', t: '04 自动化兑现、复利推演与治理张力', s: 'EBITDA三倍增长 · BC Partners 88.4%投票权 · 579:1薪酬比' },
      { id: 'sec-05', t: '05 三幕演进史与四大标志性战役', s: 'Ryan Cohen创业 → IPO与AFC → Modern Animal与AI' },
      { id: 'sec-06', t: '06 企业文化六维健康度诊断清单', s: '季度跟踪核验表（本地持久化）' },
      { id: 'sec-07', t: '07 SEC 监管文件与一手信源目录', s: '10-K · Q2 FY26 EX-99.1 · 2026 DEF 14A' }
    ];

    function showToast(msg) {
      var el = document.getElementById('muiSnackbar');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(function () { el.classList.remove('show'); }, 2400);
    }

    function getPalette() {
      var dark = state.theme === 'dark';
      return {
        dark: dark,
        text: dark ? '#F3F6F9' : '#0F1924',
        sub: dark ? '#B2BAC2' : '#475569',
        muted: dark ? '#7E8C9A' : '#64748B',
        grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(15,25,36,0.08)',
        blue: dark ? '#3399FF' : '#0073E6',
        blueSoft: dark ? 'rgba(51,153,255,0.28)' : 'rgba(0,115,230,0.20)',
        green: dark ? '#66BB6A' : '#15803D',
        amber: dark ? '#FFB74D' : '#D97706',
        violet: dark ? '#A78BFA' : '#6D28D9',
        red: dark ? '#FF6B6B' : '#DC2626'
      };
    }

    function setupHiDPI(canvas) {
      var rect = canvas.getBoundingClientRect();
      var w = Math.max(240, rect.width || 480);
      var h = Math.max(160, rect.height || 260);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx: ctx, w: w, h: h };
    }

    // Chart 1: Ch01 Dual View (Efficiency vs Category Mix)
    function drawChartCh1() {
      var cv = document.getElementById('chartCh1');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var padL = 48, padR = 52, padT = 30, padB = 38;
      var cw = w - padL - padR, ch = h - padT - padB;

      if (state.ch1View === 'efficiency') {
        var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
        var fte = [21.3, 19.4, 18.1, 18.0, 18.0, 18.0];
        var revEmp = [417, 521, 616, 659, 700, 751];

        for (var g = 0; g <= 4; g++) {
          var gy = padT + (ch / 4) * g;
          ctx.strokeStyle = p.grid;
          ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke();
          ctx.fillStyle = p.muted; ctx.font = '600 10px "IBM Plex Mono", monospace';
          ctx.textAlign = 'left';
          ctx.fillText(((25 - g * 5)).toFixed(0) + 'k', 8, gy + 3);
          ctx.textAlign = 'right';
          ctx.fillText('$' + (800 - g * 150) + 'K', w - 6, gy + 3);
        }

        var step = cw / yrs.length;
        var pts = [];
        yrs.forEach(function (yr, i) {
          var cx = padL + step * (i + 0.5);
          var bw = Math.min(34, step * 0.46);
          var bh = ((fte[i] - 5) / 20) * ch;
          var by = padT + ch - bh;
          ctx.fillStyle = p.blueSoft;
          ctx.strokeStyle = p.blue;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(cx - bw / 2, by, bw, bh, 5) : ctx.rect(cx - bw / 2, by, bw, bh);
          ctx.fill(); ctx.stroke();

          ctx.fillStyle = p.sub; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(yr, cx, h - 13);
          ctx.fillStyle = p.muted; ctx.font = '700 10px "IBM Plex Mono", monospace';
          ctx.fillText(fte[i].toFixed(1) + 'k', cx, by - 6);

          var ly = padT + ch - ((revEmp[i] - 200) / 600) * ch;
          pts.push({ x: cx, y: ly, v: revEmp[i] });
        });

        ctx.strokeStyle = p.green; ctx.lineWidth = 2.6;
        ctx.beginPath();
        pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
        ctx.stroke();

        pts.forEach(function (pt) {
          ctx.fillStyle = p.green;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + pt.v + 'K', pt.x, pt.y - 9);
        });
      } else {
        var cats = state.lang === 'en'
          ? ['Consumables', 'Pet Health/Rx', 'Hardgoods', 'Other/Ads']
          : ['主粮快消 (69.7%)', '医药与专科 (15.7%)', '硬品配件 (11.4%)', '其他与广告 (3.2%)'];
        var fy24 = [8.39, 1.77, 1.27, 0.43];
        var fy25 = [8.78, 1.98, 1.44, 0.41];
        for (var k = 0; k <= 4; k++) {
          var y2 = padT + (ch / 4) * k;
          ctx.strokeStyle = p.grid;
          ctx.beginPath(); ctx.moveTo(padL, y2); ctx.lineTo(w - 20, y2); ctx.stroke();
          ctx.fillStyle = p.muted; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText('$' + (10 - k * 2.5).toFixed(1) + 'B', 4, y2 + 3);
        }
        var st = (w - padL - 20) / cats.length;
        cats.forEach(function (lb, i) {
          var gx = padL + st * (i + 0.5);
          var wBar = Math.min(24, st * 0.28);
          var h24 = (fy24[i] / 10) * ch, h25 = (fy25[i] / 10) * ch;
          ctx.fillStyle = p.blueSoft;
          ctx.fillRect(gx - wBar - 2, padT + ch - h24, wBar, h24);
          ctx.fillStyle = p.blue;
          ctx.fillRect(gx + 2, padT + ch - h25, wBar, h25);
          ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + fy25[i].toFixed(2) + 'B', gx + wBar / 2 + 2, padT + ch - h25 - 6);
          ctx.fillStyle = p.sub; ctx.font = '600 10.5px sans-serif';
          ctx.fillText(lb, gx, h - 12);
        });
      }
    }

    // Chart 2: 5-Axis Radar
    function drawChartRadar() {
      var cv = document.getElementById('chartRadar');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var cx = w / 2, cy = h / 2 + 10, r = Math.min(w, h) * 0.34;
      var axes = state.lang === 'en'
        ? ['WOW Empathy', 'Robotic Ops', '50-State Rx Depth', 'Autoship Lock-in', '1P AI & Ad-Tech']
        : ['情感共情 WOW', 'AFC自动化细节', '50州处方医疗合规', 'Autoship订阅锁死', '第一方AI与广告栈'];
      var series = [
        { name: 'Chewy', vals: [0.97, 0.88, 0.94, 0.93, 0.86], stroke: p.blue, fill: p.dark ? 'rgba(51,153,255,0.24)' : 'rgba(0,115,230,0.18)' },
        { name: 'Amazon', vals: [0.58, 0.98, 0.52, 0.82, 0.97], stroke: p.amber, fill: 'rgba(217,119,6,0.08)' },
        { name: state.lang === 'en' ? 'Legacy Pet Stores' : '传统线下宠物店', vals: [0.74, 0.42, 0.68, 0.45, 0.34], stroke: p.violet, fill: 'rgba(109,40,217,0.07)' }
      ];

      for (var lv = 1; lv <= 4; lv++) {
        var rr = (r / 4) * lv;
        ctx.strokeStyle = p.grid; ctx.lineWidth = 1;
        ctx.beginPath();
        for (var a = 0; a < 5; a++) {
          var ang = -Math.PI / 2 + (Math.PI * 2 * a) / 5;
          var px = cx + Math.cos(ang) * rr, py = cy + Math.sin(ang) * rr;
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      }

      for (var i = 0; i < 5; i++) {
        var ang2 = -Math.PI / 2 + (Math.PI * 2 * i) / 5;
        var ex = cx + Math.cos(ang2) * r, ey = cy + Math.sin(ang2) * r;
        ctx.strokeStyle = p.grid;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
        var lx = cx + Math.cos(ang2) * (r + 22), ly = cy + Math.sin(ang2) * (r + 16);
        ctx.fillStyle = p.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(axes[i], lx, ly + 4);
      }

      series.forEach(function (sr) {
        ctx.beginPath();
        sr.vals.forEach(function (v, idx) {
          var ang3 = -Math.PI / 2 + (Math.PI * 2 * idx) / 5;
          var vx = cx + Math.cos(ang3) * r * v, vy = cy + Math.sin(ang3) * r * v;
          if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
        });
        ctx.closePath();
        ctx.fillStyle = sr.fill; ctx.fill();
        ctx.strokeStyle = sr.stroke; ctx.lineWidth = 2.2; ctx.stroke();
      });

      var lx0 = 14;
      series.forEach(function (sr, idx) {
        var ox = lx0 + idx * 112;
        ctx.fillStyle = sr.stroke; ctx.fillRect(ox, 8, 12, 12);
        ctx.fillStyle = p.sub; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(sr.name, ox + 16, 18);
      });
    }

    // Chart 3: Horizontal Benchmark Bars
    function drawChartBars() {
      var cv = document.getElementById('chartBars');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var rows = [
        { name: 'Costco (会员续费率)', lock: 92.5, gm: 12.8, c: p.green },
        { name: 'Chewy (Autoship占比)', lock: 84.6, gm: 30.4, c: p.blue },
        { name: 'Apple (生态设备留存)', lock: 90.0, gm: 46.5, c: p.violet },
        { name: 'Amazon (Prime渗透率)', lock: 76.0, gm: 49.0, c: p.amber },
        { name: 'Petco (会员重复占比)', lock: 42.0, gm: 38.0, c: p.muted }
      ];
      var padL = 152, padR = 58, padT = 26, rowH = (h - padT - 14) / rows.length;
      var barArea = w - padL - padR;

      ctx.fillStyle = p.muted; ctx.font = '700 10.5px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(state.lang === 'en' ? 'Blue/Color = Recurring Lock-in %  |  Right Label = Gross Margin %' : '主条长度 = 订阅/会员锁定率 (%)  ·  右侧标注 = 综合毛利率', padL, 15);

      rows.forEach(function (r, idx) {
        var y = padT + idx * rowH + rowH * 0.22;
        var bh = Math.min(20, rowH * 0.54);
        ctx.fillStyle = p.text; ctx.font = '700 11.5px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(r.name, padL - 12, y + bh * 0.74);

        ctx.fillStyle = p.grid;
        ctx.fillRect(padL, y, barArea, bh);
        var bw = (r.lock / 100) * barArea;
        ctx.fillStyle = r.c;
        ctx.fillRect(padL, y, bw, bh);

        ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
        if (bw > 56) ctx.fillText(r.lock.toFixed(1) + '%', padL + 8, y + bh * 0.74);
        ctx.fillStyle = p.sub;
        ctx.fillText('GM ' + r.gm.toFixed(1) + '%', padL + barArea + 6, y + bh * 0.74);
      });
    }

    // Chart 4: FY22-FY26E Adjusted EBITDA + Gross Margin
    function drawChartEps() {
      var cv = document.getElementById('chartEps');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
      var ebitda = [305.9, 368.1, 570.5, 719.2, 912.0];
      var gm = [28.0, 28.4, 29.2, 29.8, 30.3];
      var padL = 50, padR = 48, padT = 28, padB = 36;
      var cw = w - padL - padR, ch = h - padT - padB;

      for (var i = 0; i <= 4; i++) {
        var gy = padT + (ch / 4) * i;
        ctx.strokeStyle = p.grid;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke();
        ctx.fillStyle = p.muted; ctx.font = '600 10px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left'; ctx.fillText('$' + (1000 - i * 250) + 'M', 4, gy + 3);
        ctx.textAlign = 'right'; ctx.fillText((31.0 - i * 1.0).toFixed(1) + '%', w - 4, gy + 3);
      }

      var step = cw / yrs.length;
      var linePts = [];
      yrs.forEach(function (yr, idx) {
        var cx = padL + step * (idx + 0.5);
        var bw = Math.min(38, step * 0.48);
        var bh = (ebitda[idx] / 1000) * ch;
        var by = padT + ch - bh;
        ctx.fillStyle = idx === 4 ? p.blue : p.blueSoft;
        ctx.strokeStyle = p.blue; ctx.lineWidth = 1.2;
        ctx.fillRect(cx - bw / 2, by, bw, bh);
        ctx.strokeRect(cx - bw / 2, by, bw, bh);

        ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + Math.round(ebitda[idx]) + 'M', cx, by - 6);
        ctx.fillStyle = p.sub; ctx.font = '700 11px sans-serif';
        ctx.fillText(yr, cx, h - 12);

        var ly = padT + ch - ((gm[idx] - 27.0) / 4.0) * ch;
        linePts.push({ x: cx, y: ly, v: gm[idx] });
      });

      ctx.strokeStyle = p.green; ctx.lineWidth = 2.6;
      ctx.beginPath();
      linePts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
      ctx.stroke();
      linePts.forEach(function (pt) {
        ctx.fillStyle = p.green;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = p.green; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText(pt.v.toFixed(1) + '%', pt.x, pt.y - 9);
      });
    }

    // Chart 5: Interactive 5-Year Compounding Simulator
    function runSimulator() {
      var gEl = document.getElementById('simGrowth');
      var mEl = document.getElementById('simMargin');
      var bEl = document.getElementById('simBuybackToggle');
      if (!gEl || !mEl || !bEl) return;

      var g = parseFloat(gEl.value) / 100;
      var targetM = parseFloat(mEl.value) / 100;
      var buybackOn = bEl.checked;

      document.getElementById('simGrowthVal').textContent = (g * 100).toFixed(1) + '%';
      document.getElementById('simMarginVal').textContent = (targetM * 100).toFixed(1) + '%';

      var baseRev = 13.52; // FY26E $B midpoint
      var baseMargin = 0.0675;
      var baseShares = 0.4101; // 410.1M diluted shares in billions
      var fcfConv = 0.78;

      var labels = ['FY26E', 'Yr+1', 'Yr+2', 'Yr+3', 'Yr+4', 'Yr+5'];
      var fcfPerShare = [];
      var lastRev = baseRev, lastEbitda = 0, lastFcf = 0;

      for (var yr = 0; yr <= 5; yr++) {
        var rev = baseRev * Math.pow(1 + g, yr);
        var m = baseMargin + ((targetM - baseMargin) * yr) / 5;
        var eb = rev * m;
        var fcf = eb * fcfConv;
        var sh = buybackOn ? baseShares * Math.pow(0.97, yr) : baseShares;
        fcfPerShare.push(fcf / sh);
        if (yr === 5) { lastRev = rev; lastEbitda = eb; lastFcf = fcf; }
      }

      document.getElementById('simOutRev').textContent = '$' + lastRev.toFixed(1) + 'B';
      document.getElementById('simOutEbitda').textContent = '$' + lastEbitda.toFixed(2) + 'B';
      document.getElementById('simOutFcf').textContent = '$' + lastFcf.toFixed(2) + 'B';
      document.getElementById('simOutFcfPs').textContent = '$' + fcfPerShare[5].toFixed(2);

      var cv = document.getElementById('chartSim');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var padL = 44, padR = 18, padT = 22, padB = 28;
      var cw = w - padL - padR, ch = h - padT - padB;
      var maxVal = Math.max(4.5, fcfPerShare[5] * 1.15);

      for (var k = 0; k <= 3; k++) {
        var gy = padT + (ch / 3) * k;
        ctx.strokeStyle = p.grid;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke();
        ctx.fillStyle = p.muted; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
        ctx.fillText('$' + (maxVal * (1 - k / 3)).toFixed(1), 4, gy + 3);
      }

      var step = cw / (labels.length - 1);
      ctx.beginPath();
      labels.forEach(function (lb, i) {
        var px = padL + step * i;
        var py = padT + ch - (fcfPerShare[i] / maxVal) * ch;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = p.blue; ctx.lineWidth = 2.6; ctx.stroke();

      labels.forEach(function (lb, i) {
        var px = padL + step * i;
        var py = padT + ch - (fcfPerShare[i] / maxVal) * ch;
        ctx.fillStyle = p.blue;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + fcfPerShare[i].toFixed(2), px, py - 8);
        ctx.fillStyle = p.sub; ctx.font = '600 10px sans-serif';
        ctx.fillText(lb, px, h - 8);
      });
    }

    function drawAllCharts() {
      drawChartCh1();
      drawChartRadar();
      drawChartBars();
      drawChartEps();
      runSimulator();
    }

    function applyTheme(theme, silent) {
      state.theme = theme === 'dark' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      var lBtn = document.getElementById('sideThemeLightBtn');
      var dBtn = document.getElementById('sideThemeDarkBtn');
      if (lBtn) lBtn.classList.toggle('active', state.theme === 'light');
      if (dBtn) dBtn.classList.toggle('active', state.theme === 'dark');
      var iconWrap = document.getElementById('appbarThemeIcon');
      if (iconWrap) {
        iconWrap.innerHTML = state.theme === 'dark'
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
      }
      drawAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? '已切换为深色外观' : '已切换为浅色外观');
    }

    function applyLang(lang, silent) {
      state.lang = lang === 'en' ? 'en' : 'zh';
      document.querySelectorAll('#langSwitchGroup [data-lang]').forEach(function (btn) {
        var act = btn.getAttribute('data-lang') === state.lang;
        btn.classList.toggle('active', act);
        btn.setAttribute('aria-pressed', act ? 'true' : 'false');
      });
      document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
        var target = state.lang === 'en' ? el.getAttribute('data-i18n-en') : el.getAttribute('data-i18n-zh');
        if (target) el.innerHTML = target;
      });
      drawAllCharts();
      updateDiagProgress();
      if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文界面');
    }

    function triggerHtmlDownload() {
      try {
        var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
        var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Chewy公司 Chewy Inc. 企业文化与组织架构深度研究报告.html';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 150);
        showToast('正在下载：Chewy公司 Chewy Inc. 企业文化与组织架构深度研究报告.html');
      } catch (e) {
        showToast('请使用浏览器右键“另存为”保存此网页');
      }
    }

    // Ch01 Switch & Collapsibles
    var ch1Sw = document.getElementById('ch1ChartSwitch');
    if (ch1Sw) {
      ch1Sw.addEventListener('click', function (e) {
        var b = e.target.closest('[data-ch1-view]');
        if (!b) return;
        state.ch1View = b.getAttribute('data-ch1-view');
        ch1Sw.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        drawChartCh1();
      });
    }

    document.querySelectorAll('[data-collapse-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.collapse-card');
        if (!card) return;
        var open = card.classList.toggle('open');
        var ic = btn.querySelector('.collapse-icon');
        if (ic) ic.textContent = open ? '−' : '+';
      });
    });

    // Ch03 Peer Filter & Search
    var activePeerCat = 'ALL';
    function filterPeers() {
      var kw = ((document.getElementById('peerSearchInput') || {}).value || '').trim().toLowerCase();
      document.querySelectorAll('#peerTableBody tr').forEach(function (tr) {
        var cats = tr.getAttribute('data-cat') || '';
        var catMatch = activePeerCat === 'ALL' || cats.indexOf(activePeerCat) !== -1;
        var txtMatch = !kw || tr.textContent.toLowerCase().indexOf(kw) !== -1;
        tr.style.display = (catMatch && txtMatch) ? '' : 'none';
      });
    }
    var pfGroup = document.getElementById('peerFilterGroup');
    if (pfGroup) {
      pfGroup.addEventListener('click', function (e) {
        var b = e.target.closest('[data-peer-cat]');
        if (!b) return;
        activePeerCat = b.getAttribute('data-peer-cat');
        pfGroup.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        filterPeers();
      });
    }
    var pInput = document.getElementById('peerSearchInput');
    if (pInput) pInput.addEventListener('input', filterPeers);

    // Ch04 Simulator Listeners
    ['simGrowth', 'simMargin', 'simBuybackToggle'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', runSimulator);
      if (el) el.addEventListener('change', runSimulator);
    });
    var presetGrp = document.getElementById('simPresetGroup');
    if (presetGrp) {
      presetGrp.addEventListener('click', function (e) {
        var b = e.target.closest('[data-preset]');
        if (!b) return;
        presetGrp.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        var pr = b.getAttribute('data-preset');
        if (pr === 'conservative') { document.getElementById('simGrowth').value = '5.5'; document.getElementById('simMargin').value = '7.6'; }
        else if (pr === 'target10') { document.getElementById('simGrowth').value = '9.0'; document.getElementById('simMargin').value = '10.0'; }
        else { document.getElementById('simGrowth').value = '7.5'; document.getElementById('simMargin').value = '9.2'; }
        runSimulator();
      });
    }

    // Ch06 Checklist Persistence
    function updateDiagProgress() {
      var boxes = document.querySelectorAll('[data-diag-id]');
      var checked = 0, map = {};
      boxes.forEach(function (bx) {
        if (bx.checked) checked++;
        map[bx.getAttribute('data-diag-id')] = bx.checked;
      });
      var pct = boxes.length ? Math.round((checked / boxes.length) * 100) : 0;
      var fill = document.getElementById('diagProgressFill');
      if (fill) fill.style.width = pct + '%';
      var txt = document.getElementById('diagScoreText');
      if (txt) txt.textContent = state.lang === 'en' ? ('Audit Score: ' + checked + ' / ' + boxes.length + ' Verified') : ('核验进度：' + checked + ' / ' + boxes.length + ' 项达标');
      var badge = document.getElementById('diagStatusBadge');
      if (badge) {
        badge.textContent = checked >= 5 ? (state.lang === 'en' ? 'Strong Genome' : '组织护城河强劲') : (checked >= 3 ? (state.lang === 'en' ? 'Balanced' : '双基因稳健') : (state.lang === 'en' ? 'Watch Required' : '需重点审视'));
      }
      try { localStorage.setItem(STORAGE_DIAG_KEY, JSON.stringify(map)); } catch (e) {}
    }

    try {
      var savedD = JSON.parse(localStorage.getItem(STORAGE_DIAG_KEY) || 'null');
      if (savedD) {
        document.querySelectorAll('[data-diag-id]').forEach(function (bx) {
          var k = bx.getAttribute('data-diag-id');
          if (typeof savedD[k] === 'boolean') bx.checked = savedD[k];
        });
      }
    } catch (e) {}

    document.querySelectorAll('[data-diag-id]').forEach(function (bx) { bx.addEventListener('change', updateDiagProgress); });
    document.getElementById('chkAllBtn').addEventListener('click', function () {
      document.querySelectorAll('[data-diag-id]').forEach(function (bx) { bx.checked = true; });
      updateDiagProgress();
    });
    document.getElementById('chkResetBtn').addEventListener('click', function () {
      document.querySelectorAll('[data-diag-id]').forEach(function (bx) { bx.checked = false; });
      updateDiagProgress();
    });

    // Suite Hub Filter & Click Toast
    var hub = document.getElementById('companySubfolderHub');
    if (hub) {
      hub.addEventListener('click', function (e) {
        var pill = e.target.closest('[data-co-cat]');
        if (pill) {
          var cat = pill.getAttribute('data-co-cat');
          hub.querySelectorAll('.co-hub-pill').forEach(function (p) { p.classList.toggle('active', p === pill); });
          hub.querySelectorAll('.co-hub-item').forEach(function (it) {
            var ic = it.getAttribute('data-co-item-cat');
            it.classList.toggle('co-hub-hidden', cat !== 'ALL' && ic !== cat);
          });
          return;
        }
        var item = e.target.closest('[data-suite-file]');
        if (item) {
          var fn = item.getAttribute('data-suite-file');
          if (item.classList.contains('active')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            showToast('请在对话附件卡片或合集包中打开《' + fn + '》');
          }
        }
      });
    }

    // Quick Search Popover
    var qInput = document.getElementById('quickJumpInput');
    var qPop = document.getElementById('quickJumpPopover');
    function renderQuick(val) {
      if (!qPop) return;
      var kw = (val || '').trim().toLowerCase();
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

    // Sidebar Toggle, Export, Print & Scroll Spy
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
      bd.addEventListener('click', function () {
        sb.classList.remove('open');
        bd.classList.remove('open');
      });
    }

    document.getElementById('exportHtmlBtn')?.addEventListener('click', triggerHtmlDownload);
    document.getElementById('sideExportBtn')?.addEventListener('click', triggerHtmlDownload);
    document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
    document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () {
      applyTheme('light', false);
      try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {}
    });
    document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () {
      applyTheme('dark', false);
      try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {}
    });

    window.addEventListener('scroll', function () {
      var bar = document.getElementById('readingProgressBar');
      if (bar) {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
      }
      var secs = ['sec-00', 'sec-01', 'sec-02', 'sec-03', 'sec-04', 'sec-05', 'sec-06', 'sec-07'];
      var cur = secs[0];
      secs.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      });
      document.querySelectorAll('#tocList .mui-nav-link').forEach(function (lk) {
        lk.classList.toggle('active', lk.getAttribute('href') === '#' + cur);
      });
    }, { passive: true });

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

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAllCharts, 90);
    });

    updateDiagProgress();
    drawAllCharts();
  })();
  