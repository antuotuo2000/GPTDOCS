
 (function () {
  'use strict';
  var STORAGE_THEME_KEY = 'amat_portal_theme_v1', STORAGE_LANG_KEY = 'amat_portal_lang_v1';
  var state = { theme: 'dark', lang: 'zh', fView: 'drivers', sView: 'dram', pe: 28 }, hits = { futureCanvas: [], siliconCanvas: [] };

  function showToast(msg) { var bar = document.getElementById('muiSnackbar'); bar.textContent = msg; bar.classList.add('show'); clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000); }
  function getPalette() {
   var dark = document.documentElement.getAttribute('data-theme') === 'dark';
   return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: dark ? '#3399FF' : '#0073E6', violet: dark ? '#A78BFA' : '#7C3AED', green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706' };
  }
  function applyTheme(t, silent) {
   state.theme = (t === 'dark') ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
   var ic = document.getElementById('appbarThemeIcon');
   if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
   drawAll(); if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
  }
  function applyLang(lang, silent) {
   state.lang = (lang === 'en') ? 'en' : 'zh'; document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
   document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh'); document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
   document.querySelectorAll('[data-i18n-zh]').forEach(function (n) { var v = n.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (v !== null) { if (v.indexOf('<span') !== -1) n.innerHTML = v; else n.textContent = v; } });
   drawAll(); if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
  }

  var HORIZONS = [
   { badge: 'HORIZON 1 · 高确定性订单兑现期 (2026–2027)', title: 'Q1 FY27 $11.1B 爆发 × 先进封装 +70% × DRAM 扩产潮', items: ['<strong>Semiconductor Systems &gt;40% 增速：</strong>2nm GAA 产线全面爬坡叠加 DRAM/HBM 扩产，驱动 CY26 设备大增。', '<strong>先进封装迈向 $5B+：</strong>CY26 增速超 70%，受益于 AI 芯片 2.5D/3D 堆叠与混合键合渗透。', '<strong>VeritySEM 20 切入 High-NA：</strong>新一代 eBeam CD-SEM 量测系统护航极紫外更薄光刻胶控制。'], prob: '兑现确定性：极高 (90%+)', impact: '年化增量营收池：+$8B–$12B' },
   { badge: 'HORIZON 2 · 结构性份额扩张期 (2028–2029)', title: '背面供电 BSPDN 普及 × EPIC 并行研发成果量产 × AGS 破百亿', items: ['<strong>背面供电 BSPDN 全面导入：</strong>晶圆背面金属布线与抛光大幅增加 CMP、沉积与选择性刻蚀设备强度。', '<strong>EPIC 首批联合配方落地：</strong>与台积电/Intel/三星共研工艺进入高良率量产，目标夺取 +2% WFE 份额。', '<strong>AGS 软件与 AI 诊断放量：</strong>全球装机基数扩大驱动 AGS 向 $10B 年金与 33%+ 利润率迈进。'], prob: '兑现确定性：中高 (75%–80%)', impact: '年化增量营收池：+$15B–$20B' },
   { badge: 'HORIZON 3 · 原子级架构奇点期 (2030–2032)', title: '3D DRAM 垂直堆叠 × CFET 互补场效应晶体管 × 碳化硅/光互连', items: ['<strong>3D DRAM 架构全面切换：</strong>存储行业告别平面微缩，转向多层堆叠大幅推高外延与导体刻蚀强度。', '<strong>CFET 与原子层沉积普及：</strong>N/P 型晶体管垂直堆叠，要求原子级精度薄膜与选择性移除工艺。', '<strong>玻璃基板与 CPO 光电共封：</strong>算力互连光进铜退，打开新型面板级封装与材料工艺蓝海。'], prob: '兑现确定性：远期期权 (50%–60%)', impact: '年化增量营收池：+$25B+' }
  ];
  document.getElementById('hzTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-hz]'); if (!b) return;
   var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
   document.querySelectorAll('#hzTabs .ft-hz-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   var hz = HORIZONS[idx];
   document.getElementById('hzBadge').textContent = hz.badge; document.getElementById('hzTitle').textContent = hz.title;
   document.getElementById('hzList').innerHTML = hz.items.map(function (t) { return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>'; }).join('');
   document.getElementById('hzProb').textContent = hz.prob; document.getElementById('hzImpact').textContent = hz.impact;
  });

  var ENGINES = [
   { badge: 'ENGINE 01 · $5B EPIC COLLABORATIVE R&D CENTER', title: 'EPIC Center（硅谷桑尼维尔）：把“串联研发”改写为“并联协同”的产业操作系统', desc: '2026 年 10 月揭幕的 EPIC 中心是全球最大的半导体工艺与设备协同研发基地。台积电、英特尔、三星、SK 海力士、美光五大芯片巨擘与博通、Besi、Advantest 等伙伴直接进驻应用材料洁净室，与 AMAT 科学家并行验证材料配方。机构测算，这种 2 倍速商业化将助力应用材料至 2030 年额外夺取约 2 个百分点的全球 WFE 市场份额。', formula: '变现飞轮：提前 3–5 年共创 POR 配方 → 锁死量产期高毛利集成设备订单 → 延续 15 年 AGS 订阅年金', gauges: [['$5.0B', '规划协同研发总投资'], ['15 家', '首批芯片/设备/高校伙伴'], ['2x 提速', '实验室到 HVM 量产周期'], ['+2% 份额', '2030E 目标 WFE 份额增益']] },
   { badge: 'ENGINE 02 · GAA & BACKSIDE POWER DELIVERY (BSPDN)', title: '先进逻辑双拐点：从 FinFET 到 GAA 全环绕栅极与晶圆背面供电', desc: '2nm 以下逻辑芯片必须采用纳米片 GAA 晶体管与背面供电网络（BSPDN），这不仅需要全新的选择性外延与原子层沉积，更要求在晶圆背面进行超高精度减薄、CMP 平坦化与铜/钌互连——这正是应用材料全球市占率第一的绝对腹地。', formula: '利润传导：每一代逻辑节点材料工程步骤数增长 >30% → 直接转化为 AMAT 单厂设备价值量跃升', gauges: [['$16.47B', 'FY26 逻辑与代工设备营收'], ['#1 市占', '外延/CMP/注入工艺领先'], ['BSPDN', '新增晶圆背面全套工艺需求'], ['2026–2029', '2nm/A16 扩产主窗口']] },
   { badge: 'ENGINE 03 · HBM & 3D DRAM SINGULARITY', title: '内存超级周期：HBM 高带宽内存与未来 3D DRAM 的材料红利', desc: 'AI 大模型推理对显存带宽的贪婪需求引爆 HBM 扩产，Q4 FY26 AMAT DRAM 营收同比暴涨 +93% 至 ~$2.64B。更深远的是，DRAM 未来向 3D 垂直架构演进将使工艺重心从 NAND 风格的介质刻蚀转向导体刻蚀与外延，全面利好应用材料。', formula: '变现逻辑：HBM 堆叠 TSV 工艺强度翻倍 + 3D DRAM 迁移驱动 AMAT 内存市占率由 19% 升向 23%+', gauges: [['+93% YoY', 'Q4 FY26 DRAM 营收暴增'], ['33%', 'Q4 DRAM 占设备营收比重'], ['22–23%', '2026–27E DRAM 市占目标'], ['3D DRAM', '远期材料工程更大弹性']] },
   { badge: 'ENGINE 04 · HYBRID BONDING & ADVANCED PACKAGING', title: '异构集成浪潮：先进封装迈向 $5B+ 与战略持股 Besi 20%', desc: '随着单颗芯片光刻面积逼近光罩极限，2.5D/3D 芯粒（Chiplet）堆叠与无凸点混合键合（Hybrid Bonding）成为延续摩尔定律的唯一出路。应用材料先进封装营收 CY26 增速超 70%，并通过加速协议增持混合键合龙头 Besi 至约 20%。', formula: '变现逻辑：联合 Besi 提供“前道级清洗/沉积/CMP + 混合键合”交钥匙方案 → 切入 $5B+ 高毛利新赛道', gauges: [['>70%', 'CY26 先进封装预期增速'], ['$5.0B+', '中期先进封装营收目标'], ['~20%', '战略入股 Besi 持股比例'], ['Broadcom', '加入 EPIC 共研 AI 封装']] },
   { badge: 'ENGINE 05 · HIGH-NA EUV EBEAM METROLOGY', title: 'High-NA EUV 时代的“火眼金睛”：VeritySEM 20 电子束量测', desc: '当极紫外光刻步入 High-NA 时代，光刻胶更薄、线宽进入埃米级，传统光学检测已无法精准分辨纳米级图形缺陷。2026 年 11 月发布的 VeritySEM 20 采用前沿电子束成像与 AI 算法加速配方生成，强力补齐 AMAT 在过程控制领域的版图。', formula: '战略定位：与沉积/刻蚀主设备形成“工艺+量测”闭环，提升整线良率调优话语权', gauges: [['VeritySEM 20', '2026 Q4 最新 CD-SEM 发布'], ['High-NA EUV', '专为更薄光刻胶窗口设计'], ['AI 配方', '大幅缩短量测建模时间'], ['工艺闭环', '联动刻蚀与沉积实时纠偏']] },
   { badge: 'ENGINE 06 · AGS AI-DRIVEN RECURRING ANNUITY', title: 'Applied Global Services：从传统备件维修升级为 AI 智慧工厂底座', desc: 'AGS 营收已达 $6.90B，约三分之二为续约率超 90% 的多年期订阅合约，Q4 营业利润率创下 30.5% 新高。随着全球新建晶圆厂分布于美、欧、日、台、韩，高度自动化的远程诊断与智能排产软件正推动 AGS 向百亿美元级高利润年金跃升。', formula: '变现逻辑：设备装机量每年净增 + AI 自动化软件渗透 → 支撑 AGS 中双位数稳健复利', gauges: [['$6.90B', 'FY2026 AGS 营收 (+20.2%)'], ['>90%', '订阅服务合约续约率'], ['30.5%', 'Q4 FY26 营业利润率'], ['$10B+', '2030E AGS 年金规模目标']] }
  ];
  document.getElementById('engineRail').addEventListener('click', function (e) {
   var b = e.target.closest('[data-eng]'); if (!b) return;
   var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
   document.querySelectorAll('#engineRail .ft-rail-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   var eg = ENGINES[idx];
   document.getElementById('engBadge').textContent = eg.badge; document.getElementById('engTitle').textContent = eg.title;
   document.getElementById('engDesc').textContent = eg.desc; document.getElementById('engFormula').textContent = eg.formula;
   document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) { return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>'; }).join('');
  });

  function prepCanvas(id) {
   var c = document.getElementById(id); if (!c) return null;
   var rect = c.getBoundingClientRect(), w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2);
   c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
   var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
   return { c: c, ctx: ctx, w: w, h: h };
  }
  function roundRect(ctx, x, y, w, h, r) { var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }

  function drawFutureCanvas() {
   var env = prepCanvas('futureCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hits.futureCanvas = [];
   var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   if (state.fView === 'drivers') {
    var segs = [
     { name: '先进逻辑 (GAA+BSPDN)', pct: 38, col: pal.blue, tip: '2nm GAA 与背面供电占 2026–2027 WFE 增量最大份额' },
     { name: 'DRAM / HBM 内存', pct: 28, col: pal.violet, tip: 'AI 显存需求驱动 DRAM 扩产，Q4 AMAT DRAM 暴涨 +93%' },
     { name: '先进封装 (2.5D/3D)', pct: 14, col: pal.green, tip: '三项合计贡献全球 WFE 支出增长的 80%+' },
     { name: '成熟/ICAPS 与 NAND', pct: 20, col: pal.amber, tip: '功率/光学芯片与闪存温和复苏贡献约 20% 增量' }
    ];
    for (var g = 0; g <= 4; g++) { var gv = g * 10, gy = pad.top + ph - (gv / 42) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(gv + '%', pad.left - 8, gy + 4); }
    var slot = pw / 4, bw = Math.min(48, slot * 0.56);
    segs.forEach(function (s, i) {
     var x = pad.left + i * slot + (slot - bw) / 2, bh = (s.pct / 42) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = s.col; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(s.pct + '%', x + bw / 2, yt - 6);
     ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(s.name, x + bw / 2, pad.top + ph + 20);
     hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: s.name, body: s.tip });
    });
   } else {
    var steps = [
     { lbl: 'FY26基准', v: 34.45, b: 0, col: pal.blue, tip: 'FY2026 实际总营收: $34.45B' },
     { lbl: '+GAA/BSPDN', v: 8.5, b: 34.45, col: pal.violet, tip: '先进逻辑 2nm/1.4nm 工艺步数扩容贡献 +$8.5B' },
     { lbl: '+HBM/3D内存', v: 7.2, b: 42.95, col: pal.green, tip: 'HBM4/5 与 3D DRAM 架构切换贡献 +$7.2B' },
     { lbl: '+先进封装', v: 5.0, b: 50.15, col: pal.amber, tip: '混合键合与芯粒堆叠跃升贡献 +$5.0B' },
     { lbl: '+AGS百亿化', v: 6.2, b: 55.15, col: pal.green, tip: '装机基数与 AI 智慧工厂订阅贡献 +$6.2B' },
     { lbl: 'FY32E蓝图', v: 61.35, b: 0, col: pal.blue, tip: 'FY2032E 远期营收蓝图: ~$61.4B (毛利率迈向 53%+)' }
    ];
    var maxB = 68;
    for (var k = 0; k <= 4; k++) { var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4); }
    var sW = pw / 6, bW = Math.min(44, sW * 0.58);
    steps.forEach(function (s, i) {
     var x = pad.left + i * sW + (sW - bW) / 2, yt = pad.top + ph - ((s.b + s.v) / maxB) * ph, yb = pad.top + ph - (s.b / maxB) * ph, bh = Math.max(5, yb - yt);
     ctx.fillStyle = s.col; roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(1) + 'B', x + bW / 2, yt - 6);
     ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
     hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
    });
   }
  }

  function drawSiliconCanvas() {
   var env = prepCanvas('siliconCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hits.siliconCanvas = [];
   var pad = { top: 28, right: 22, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var yrs = ['FY24', 'FY25', 'FY26', 'Q4 FY26', '2028E', '2030E'];
   if (state.sView === 'dram') {
    var share = [22, 26, 30, 33, 35, 37];
    for (var g = 0; g <= 4; g++) { var gv = g * 10, gy = pad.top + ph - (gv / 42) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(gv + '%', pad.left - 8, gy + 4); }
    ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.6; ctx.beginPath();
    share.forEach(function (v, idx) { var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 42) * ph; if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
    ctx.stroke();
    share.forEach(function (v, idx) {
     var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 42) * ph;
     ctx.fillStyle = idx === 3 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(v + '%', px, py - 9);
     ctx.fillStyle = pal.tick; ctx.fillText(yrs[idx], px, pad.top + ph + 20);
     hits.siliconCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: yrs[idx] + ' DRAM 占比', body: 'DRAM 占半导体设备营收比重达 ' + v + '%' });
    });
   } else {
    var pkg = [1.5, 2.1, 3.6, 4.4, 5.5, 6.8], maxP = 7.5;
    for (var m = 0; m <= 3; m++) { var mv = m * 2.5, my = pad.top + ph - (mv / maxP) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + mv.toFixed(1) + 'B', pad.left - 8, my + 4); }
    var slot = pw / 6, bw = Math.min(40, slot * 0.54);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot + (slot - bw) / 2, bh = (pkg[i] / maxP) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = i >= 3 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + pkg[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
     hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 先进封装规模', body: '预计先进封装及混合键合贡献约 $' + pkg[i].toFixed(1) + 'B' });
    });
   }
  }

  var OPT_DATA = { gaa: { rev: 6.5, net: 2.8 }, hbm: { rev: 5.5, net: 2.3 }, pkg: { rev: 4.2, net: 1.6 }, ags: { rev: 3.8, net: 1.1 }, epic: { rev: 4.5, net: 2.0 } };
  var miniCaps = [304, 345, 507];
  function drawOptMiniCanvas() {
   var env = prepCanvas('optMiniCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   var pad = { top: 22, right: 18, bottom: 24, left: 46 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前市值', '2030基础盘', '2030含期权'], maxV = Math.max(650, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
   ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
   var slot = pw / 3, bw = Math.min(54, slot * 0.5);
   miniCaps.forEach(function (v, i) {
    var x = pad.left + i * slot + (slot - bw) / 2, bh = (v / maxV) * ph, yt = pad.top + ph - bh;
    ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet); roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
    ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + Math.round(v) + 'B', x + bw / 2, yt - 6);
    ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
   });
  }
  function recalcOptionality() {
   var baseRev = 39.0, baseNet = 10.3, sh2030 = 0.735, addRev = 0, addNet = 0;
   document.querySelectorAll('[data-opt]').forEach(function (chk) { if (chk.checked) { var d = OPT_DATA[chk.getAttribute('data-opt')]; if (d) { addRev += d.rev; addNet += d.net; } } });
   var totRev = baseRev + addRev, totNet = baseNet + addNet, eps = totNet / sh2030, mcapB = totNet * state.pe, baseMcapB = baseNet * state.pe;
   document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(1) + 'B';
   document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
   document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
   document.getElementById('optCapOut').textContent = '$' + Math.round(mcapB) + 'B';
   miniCaps = [304, baseMcapB, mcapB]; drawOptMiniCanvas();
  }
  document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
  document.getElementById('peTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-pe]'); if (!b) return;
   state.pe = parseInt(b.getAttribute('data-pe'), 10) || 28;
   document.querySelectorAll('#peTabs .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   recalcOptionality();
  });

  function bindSeg(gid, attr, skey, fn) {
   document.getElementById(gid).addEventListener('click', function (e) {
    var b = e.target.closest('[' + attr + ']'); if (!b) return;
    state[skey] = b.getAttribute(attr);
    document.querySelectorAll('#' + gid + ' .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
    fn();
   });
  }
  bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
  bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);
  ['futureCanvas', 'siliconCanvas'].forEach(function (cid) {
   var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
   c.addEventListener('mousemove', function (ev) {
    var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, arr = hits[cid] || [], hit = null;
    for (var i = 0; i < arr.length; i++) { if (mx >= arr[i].x && mx <= arr[i].x + arr[i].w && my >= arr[i].y && my <= arr[i].y + arr[i].h) { hit = arr[i]; break; } }
    if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
    else tip.style.display = 'none';
   });
   c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
  });
  function drawAll() { drawFutureCanvas(); drawSiliconCanvas(); drawOptMiniCanvas(); }

  var QITEMS = [
   { id: 'sec-f0', t: 'F0 EPIC 新政与三阶战略时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段' },
   { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: '$5B EPIC · GAA/BSPDN · HBM/3D DRAM · 混合键合 · VeritySEM 20' },
   { id: 'sec-f2', t: 'F2 80% WFE 增量与 2032 营收桥', s: '先进逻辑+DRAM+封装驱动迈向 $61B+ 营收蓝图' },
   { id: 'sec-f3', t: 'F3 EPIC 15伙伴矩阵与 DRAM/封装爬坡', s: '台积电/Intel/三星/SK海力士/美光 · 先进封装 $5B+ 目标' },
   { id: 'sec-f4', t: 'F4 2030 冲击 $600B+ 市值期权组装器', s: '自由开关五大增长期权与估值倍数实时测算 EPS' }
  ];
  var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
  function renderQ(kw) {
   var q = (kw || '').trim().toLowerCase(), m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
   qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
   qPop.classList.toggle('open', m.length > 0);
  }
  qIn.addEventListener('focus', function () { renderQ(qIn.value); });
  qIn.addEventListener('input', function () { renderQ(qIn.value); });
  qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; document.querySelector(jb.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth', block: 'start' }); qPop.classList.remove('open'); });
  document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

  var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
  sbBtn.addEventListener('click', function () {
   if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
   else { document.documentElement.toggleAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
  });
  bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
  window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });

  document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
  document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
  document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
  document.getElementById('sideExportBtn')?.addEventListener('click', function () {
   var url = URL.createObjectURL(new Blob(['<!doctype html>\n', document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
   var a = document.createElement('a'); a.href = url; a.download = 'Applied_Materials_Future_Horizon_2030_Blueprint.html'; a.click();
   setTimeout(function () { URL.revokeObjectURL(url); }, 1500); showToast('已导出独立网页文件');
  });

  try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true); } catch (e) {}
  document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
  document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });
  var rt = null; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
  recalcOptionality(); drawAll();
 })();
 