
 (function () {
  'use strict';
  var STORAGE_THEME_KEY = 'amat_portal_theme_v1';
  var STORAGE_LANG_KEY = 'amat_portal_lang_v1';
  var STORAGE_STRESS_KEY = 'amat_bm_stress_v1';
  var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'mix', kView: 'return' };
  var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

  function showToast(msg) {
   var bar = document.getElementById('muiSnackbar');
   if (!bar) return;
   bar.textContent = msg; bar.classList.add('show');
   clearTimeout(bar._t);
   bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
  }
  function getPalette() {
   var dark = document.documentElement.getAttribute('data-theme') === 'dark';
   return {
    dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155',
    tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
    blue: dark ? '#3399FF' : '#0073E6', green: dark ? '#22C55E' : '#16A34A',
    amber: dark ? '#FFB74D' : '#D97706', violet: dark ? '#A78BFA' : '#7C3AED', red: dark ? '#FF6B6B' : '#DC2626'
   };
  }
  function applyTheme(t, silent) {
   state.theme = (t === 'dark') ? 'dark' : 'light';
   document.documentElement.setAttribute('data-theme', state.theme);
   var ic = document.getElementById('appbarThemeIcon');
   if (ic) ic.innerHTML = state.theme === 'dark'
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
   drawAllCharts();
   if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
  }
  function applyLang(lang, silent) {
   state.lang = (lang === 'en') ? 'en' : 'zh';
   document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
   var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
   if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh'); }
   if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en'); }
   var nodes = document.querySelectorAll('[data-i18n-zh]');
   for (var i = 0; i < nodes.length; i++) {
    var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
    if (val !== null) { if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val; else nodes[i].textContent = val; }
   }
   drawAllCharts();
   if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
  }

  var LENSES = [
   { formula: '单座晶圆厂全周期 LTV = 前道工艺设备组合 ($100M–$1B+, 55% GM) + ∑ [10–20年 AGS 备件与订阅合约 (35% GM, >90% 续约)]', body: '每当芯片架构发生代际跃迁（FinFET → GAA 全环绕栅极、正面供电 → 背面供电 BSPDN、平面 DRAM → HBM 3D 堆叠），底层本质都是<strong>材料工程难题</strong>。2026–2027 年全球 WFE 增量开支的 80% 集中在先进逻辑、DRAM 与先进封装，恰好全部落在应用材料最核心的强项组合中。' },
   { formula: 'AGS 年金飞轮 ($6.90B, +20.2% YoY) = 庞大存量装机基数 × 67%多年期订阅合约 (>90%续约率) → Q4 营业利润率达 30.5%', body: '每卖出一台沉积、外延或 CMP 机台，就为未来 10–20 年锁定了高粘性的备件更换、工艺调优与工厂自动化软件收入。即使半导体资本开支出现短期波动，AGS 的高频订阅底仓也能稳住利润率底线。' },
   { formula: '股东回报率 = (经营现金流 $8.87B - CapEx $2.67B) = $6.20B FCF × 80–100% 承诺回馈 → FY26 回购 $3.18B + 分红 $1.57B', body: '依托轻晶圆制造与全球分布式装配网络，应用材料在重金建设硅谷 $5B EPIC 中心的同时，仍保持 43.4% ROE 与 $9.34B 现金储备，并通过持续回购将稀释股本压降至 7.99 亿股。' }
  ];
  document.getElementById('lensTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-lens]'); if (!b) return;
   var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
   document.querySelectorAll('#lensTabs .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   document.getElementById('lensFormula').textContent = LENSES[idx].formula;
   document.getElementById('lensBody').innerHTML = LENSES[idx].body;
  });

  var NODES = [
   { badge: 'NODE 01 · INFLECTION-FOCUSED R&D & EPIC CENTER', title: '材料工程先发定义权：在晶圆厂量产前 3–5 年锁定工艺配方（Recipe Lock-In）', desc: '半导体制造已从单纯的微缩转向“原子级材料重塑”。应用材料每年投入 $41.84亿（占营收 12.1%）研发费用，并于 2026 年 10 月正式揭幕投资规模达 $50亿的硅谷 EPIC 中心，将台积电、英特尔、三星、SK 海力士、美光等 15 家顶尖芯片商与高校科学家引入同一座洁净室大楼并行开发，把材料创新到量产的周期缩短一半。', formula: '商业传导：早期联合研发锁定工艺基准配方 (POR) → 量产阶段形成极高良率切换成本 → 支撑 50%+ 长期毛利中枢', kpis: [['$4.18B', 'FY2026 研发与工程投入 (+17.2%)'], ['$5.0B', '硅谷 EPIC 协同研发中心规划投资'], ['15 家', 'EPIC 首批签约芯片/伙伴/高校'], ['2x 提速', '并行开发缩短工艺商业化周期']] },
   { badge: 'NODE 02 · BROADEST INTEGRATED WFE TOOLBOX', title: '全球最全晶圆设备矩阵：沉积、外延、注入、CMP 与热处理五大工艺稳居第一', desc: '不同于单点设备商，应用材料拥有涵盖薄膜沉积（PVD/CVD/ALD）、外延、离子注入、CMP 平坦化、快速热处理与电子束量测（VeritySEM 20）的完整工具箱，能够通过“集成材料解决方案（IMS）”在同一真空腔体内完成多道原子级工序。', formula: '商业传导：单机售卖升级为多腔体平台集成方案 → 提升单厂钱包份额 → FY26 设备毛利率跃升至 54.9%', kpis: [['$26.14B', 'FY26 半导体设备总营收 (+21.9%)'], ['54.9%', 'FY26 设备分部 GAAP 毛利率'], ['38.8%', 'Q4 FY26 设备分部营业利润率'], ['五大工艺 #1', '沉积/外延/CMP/注入/热处理领跑']] },
   { badge: 'NODE 03 · AI COMPUTING ARCHITECTURE INFLECTIONS', title: '精准卡位三大 AI 算力拐点：GAA 晶体管、背面供电 BSPDN 与 HBM 混合键合', desc: '2026–2027 年全球晶圆制造设备 80% 的增量开支集中在先进逻辑、DRAM 与先进封装。应用材料 Q4 DRAM 收入同比暴增 +93% 至 ~$2.64B（占设备营收 33%），先进封装 CY26 预计增长超 70%，并增持混合键合龙头 Besi 股权至约 20%。', formula: '商业传导：芯片架构复杂度指数上升 → 材料工程步数翻倍 → 驱动 CY26 半导体设备增长超 40%', kpis: [['33%', 'Q4 DRAM 占设备营收比重 (+93% YoY)'], ['>70%', 'CY26 先进封装营收预期增速'], ['~20%', '战略增持混合键合伙伴 Besi 持股'], ['80%', '三大强项占据全球 WFE 增量比重']] },
   { badge: 'NODE 04 · AGS INSTALLED-BASE RECURRING ANNUITY', title: 'Applied Global Services (AGS)：庞大装机底座上的“工业界 SaaS 年金”', desc: '全球晶圆厂运行着数以万计的应用材料设备，AGS 为其提供 7×24 小时备件供应、预测性维护软件与产能良率优化服务。目前 AGS 约三分之二营收来自平均期限近 3 年的多年期订阅合约，续约率稳定高于 90%，Q4 营业利润率突破 30.5%。', formula: '商业传导：设备交付扩充装机分母 → 多年期合约锁死高续约率 → 构筑 $6.90B 抗周期现金流底座', kpis: [['$6.90B', 'FY2026 AGS 服务总营收 (+20.2%)'], ['>90%', '多年期服务订阅合约续约率'], ['30.5%', 'Q4 FY26 AGS 营业利润率 (+170bps)'], ['~3 年', '服务合约平均绑定周期']] },
   { badge: 'NODE 05 · DISCIPLINED FCF & CAPITAL ALLOCATION', title: '80%–100% 自由现金流回馈：回购注销与股息双升驱动 EPS 加速复利', desc: '即便在加大硅谷 EPIC 中心与新加坡工厂资本开支的背景下，FY2026 仍创造 $8.87B 经营现金流与 $6.20B 自由现金流，全年向股东返还 $4.75B（其中 Q4 单季加速回购 $2.00B，创逾八年最大单季回购规模），并将季度股息上调 15% 兑现翻倍目标。', formula: '商业传导：$6.20B FCF × 80–100% 回馈政策 → 股本缩至 7.99亿股 → FY26 GAAP EPS 大涨 +45.7% 至 $12.62', kpis: [['$6.20B', 'FY2026 非GAAP 自由现金流'], ['$4.75B', 'FY26 回购 ($3.18B) + 分红 ($1.57B)'], ['799M 股', 'FY26 加权平均稀释股本'], ['+15%', '季度每股股息上调幅度']] }
  ];
  document.getElementById('pipelineTrack').addEventListener('click', function (e) {
   var btn = e.target.closest('[data-node]'); if (!btn) return;
   var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
   document.querySelectorAll('#pipelineTrack .bm-node-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
   var nd = NODES[idx];
   document.getElementById('nodeBadge').textContent = nd.badge;
   document.getElementById('nodeTitle').textContent = nd.title;
   document.getElementById('nodeDesc').textContent = nd.desc;
   document.getElementById('nodeFormula').textContent = nd.formula;
   document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) { return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
  });

  document.getElementById('tierFilter').addEventListener('click', function (e) {
   var b = e.target.closest('[data-tcat]'); if (!b) return;
   var cat = b.getAttribute('data-tcat');
   document.querySelectorAll('#tierFilter .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   document.querySelectorAll('#tierList [data-tier]').forEach(function (c) { c.style.display = (cat === 'all' || c.getAttribute('data-tier') === cat) ? '' : 'none'; });
  });

  var COHORTS = {
   icaps: { stats: [['核心采购设备组合', '200mm/300mm 注入 + CMP + 沉积', '服务汽车电子、功率半导体与传感器'], ['工艺节点切换难度', '中高 (产能弹性)', '依赖高性价比与长生命周期备件'], ['AGS 年度维保绑定率', '>85% 续约', '延长成熟产线服役年限至 20 年+'], ['设备板块毛利率支撑', '~45% – 48%', '标准化平台摊薄制造成本']], note: '<strong>ICAPS 长尾稳定层：</strong>AI 数据中心对电源管理芯片与光通信芯片的拉动正推动 ICAPS 晶圆厂稼动率全面回升，是 AGS 备件需求最稳定的现金奶牛。' },
   gaa: { stats: [['核心采购设备组合', '外延 + ALD + CMP + 离子注入 + eBeam', '多步骤真空腔体协同集成 (IMS)'], ['工艺节点切换难度', '极高 (POR 锁定)', 'GAA 步骤数较 FinFET 大幅跃升'], ['AGS 年度维保绑定率', '>90% 续约', '3年期订阅合约保障良率爬坡'], ['设备板块毛利率支撑', '~55% – 58%', '高难度配方带来强溢价能力']], note: '<strong>集成材料解决方案（IMS）锁定效应：</strong>在 2nm GAA 与背面供电（BSPDN）制程中，薄膜沉积、表面处理与量测必须整合在同一真空系统内防止氧化——应用材料凭借全球最完整的设备组合把单机升级为“集成平台”，令单一设备竞争对手极难切入。' },
   hbm: { stats: [['核心采购设备组合', 'TSV 沉积/刻蚀 + 混合键合 + CMP', 'DRAM Q4 占比跃升至 33%'], ['工艺节点切换难度', '极高 (3D 堆叠)', '12-Hi / 16-Hi HBM 对良率极其敏感'], ['AGS 年度维保绑定率', '>92% 续约', '韩国与美光产线驻场工程师深度绑定'], ['设备板块毛利率支撑', '~54% – 57%', '战略持股 Besi 20% 强化键合闭环']], note: '<strong>3D DRAM 与 HBM 奇点红利：</strong>随着内存从平面微缩转向 3D 堆叠与混合键合，工艺重心向导体刻蚀与外延倾斜，机构预计应用材料 DRAM 市占率正从 2025 年的 ~19% 迈向 22%–23%+。' }
  };
  document.getElementById('cohortTabs').addEventListener('click', function (e) {
   var b = e.target.closest('[data-cohort]'); if (!b) return;
   var k = b.getAttribute('data-cohort');
   document.querySelectorAll('#cohortTabs .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   var c = COHORTS[k] || COHORTS.gaa;
   document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, i) { return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + (i > 0 ? ' mono' : '') + '"' + (i === 0 ? ' style="font-size:0.92rem;"' : '') + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>'; }).join('');
   document.getElementById('cohortNote').innerHTML = c.note;
  });

  document.getElementById('peerFilter').addEventListener('click', function (e) {
   var b = e.target.closest('[data-pcat]'); if (!b) return;
   var cat = b.getAttribute('data-pcat');
   document.querySelectorAll('#peerFilter .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   document.querySelectorAll('#peerTable tbody tr').forEach(function (r) { var rc = r.getAttribute('data-row-cat') || ''; r.style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none'; });
  });

  function prepCanvas(id) {
   var c = document.getElementById(id); if (!c) return null;
   var rect = c.getBoundingClientRect(), w = Math.max(260, rect.width || 500), h = Math.max(140, rect.height || 280);
   var dpr = Math.min(window.devicePixelRatio || 1, 2);
   c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
   var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
   return { c: c, ctx: ctx, w: w, h: h };
  }
  function roundRect(ctx, x, y, w, h, r) {
   var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
   ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
  }

  function drawProfitCanvas() {
   var env = prepCanvas('profitCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.profitCanvas = [];
   var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   if (state.pView === 'waterfall') {
    var steps = [
     { lbl: '半导体设备', val: 26.14, base: 0, col: pal.blue, tip: 'FY2026 Semiconductor Systems 营收: $26.14B (+21.9% YoY, 54.9% GM)' },
     { lbl: '+AGS与显示', val: 8.30, base: 26.14, col: pal.green, tip: 'AGS $6.90B + Other/Display $1.40B = +$8.30B，总营收达 $34.45B' },
     { lbl: '=总毛利', val: 17.22, base: 0, col: pal.violet, tip: 'FY2026 GAAP 毛利额: $17.22B (综合毛利率 50.0%, +130bps)' },
     { lbl: '营业利润', val: 11.09, base: 0, col: pal.blue, tip: '扣除 $4.18B 研发与 SG&A 后 GAAP 营业利润 $11.09B (32.2% 利润率)' },
     { lbl: 'GAAP净利', val: 10.09, base: 0, col: pal.amber, tip: 'FY2026 GAAP 净利润: $10.09B (+44.2% YoY, 稀释 EPS $12.62)' },
     { lbl: '自由现金流', val: 6.20, base: 0, col: pal.green, tip: 'OCF $8.87B 扣除 $2.67B CapEx (含 EPIC 中心建设) = $6.20B FCF' }
    ];
    var maxV = 38;
    for (var g = 0; g <= 4; g++) {
     var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
    }
    var slotW = pw / steps.length, barW = Math.min(48, slotW * 0.58);
    steps.forEach(function (s, i) {
     var x = pad.left + i * slotW + (slotW - barW) / 2, yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph, yBot = pad.top + ph - (s.base / maxV) * ph, bh = Math.max(4, yBot - yTop);
     ctx.fillStyle = s.col; roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
     ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
     hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
    });
   } else {
    var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26'], gm = [46.5, 46.7, 47.5, 48.7, 50.0], opm = [30.2, 28.9, 28.9, 29.2, 32.2], minM = 24, maxM = 54;
    for (var m = 0; m <= 3; m++) {
     var mv = minM + ((maxM - minM) / 3) * m, my = pad.top + ph - (m / 3) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
    }
    function plotL(arr, col, name) {
     ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
     arr.forEach(function (v, idx) { var px = pad.left + (idx / 4) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph; if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
     ctx.stroke();
     arr.forEach(function (v, idx) {
      var px = pad.left + (idx / 4) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(v.toFixed(1) + '%', px, py - 9);
      hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
     });
    }
    yrs.forEach(function (y, idx) { var px = pad.left + (idx / 4) * pw; ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(y, px, pad.top + ph + 20); });
    plotL(gm, pal.green, 'GAAP 综合毛利率'); plotL(opm, pal.blue, 'GAAP 营业利润率');
   }
  }

  function drawCohortCanvas() {
   var env = prepCanvas('cohortCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.cohortCanvas = [];
   var pad = { top: 28, right: 22, bottom: 42, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   if (state.cView === 'mix') {
    var cats = ['Foundry & Logic', 'DRAM (含HBM)', 'Flash Memory'], fy25 = [68, 26, 6], fy26 = [63, 30, 7], q4 = [58, 33, 9];
    for (var g = 0; g <= 4; g++) { var gv = g * 20, gy = pad.top + ph - (gv / 80) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(gv + '%', pad.left - 8, gy + 4); }
    var slot = pw / 3, bw = Math.min(28, slot * 0.22);
    cats.forEach(function (c, i) {
     var cx = pad.left + i * slot + slot / 2;
     [[fy25[i], pal.tick, -bw * 1.5 - 3], [fy26[i], pal.blue, -bw / 2], [q4[i], pal.green, bw / 2 + 3]].forEach(function (b) {
      var bh = (b[0] / 80) * ph, yt = pad.top + ph - bh;
      ctx.fillStyle = b[1]; roundRect(ctx, cx + b[2], yt, bw, bh, 4); ctx.fill();
      ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(b[0] + '%', cx + b[2] + bw / 2, yt - 5);
     });
     ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.fillText(c, cx, pad.top + ph + 20);
     hitRegions.cohortCanvas.push({ x: cx - bw * 2, y: pad.top, w: bw * 4, h: ph, title: c + ' 设备营收占比', body: 'FY25: ' + fy25[i] + '% → FY26: ' + fy26[i] + '% → Q4 FY26: ' + q4[i] + '%' });
    });
   } else {
    var regs = [{ n: '中国大陆', v: 27.1, c: pal.amber }, { n: '中国台湾', v: 25.6, c: pal.blue }, { n: '韩国', v: 18.5, c: pal.violet }, { n: '美国', v: 12.4, c: pal.green }, { n: '日本', v: 7.6, c: pal.blue }, { n: '欧洲+东南亚', v: 8.8, c: pal.tick }];
    var rowH = ph / regs.length;
    regs.forEach(function (r, i) {
     var cy = pad.top + i * rowH + rowH / 2, bh = 18, bl = (r.v / 32) * (pw - 55);
     ctx.fillStyle = pal.grid; roundRect(ctx, pad.left + 48, cy - bh / 2, pw - 55, bh, 4); ctx.fill();
     ctx.fillStyle = r.c; roundRect(ctx, pad.left + 48, cy - bh / 2, bl, bh, 4); ctx.fill();
     ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(r.n, pad.left + 40, cy + 4);
     ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(r.v.toFixed(1) + '%', pad.left + 54 + bl, cy + 4);
     hitRegions.cohortCanvas.push({ x: pad.left, y: cy - 12, w: pw, h: 24, title: r.n + ' FY2026 占比', body: '占总营收 ' + r.v.toFixed(1) + '%（Q4 中国降至 25.4%，台湾升至 28.0%）' });
    });
   }
  }

  function drawCapitalCanvas() {
   var env = prepCanvas('capitalCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.capitalCanvas = [];
   var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   if (state.kView === 'return') {
    var yrs = ['FY23', 'FY24', 'FY25', 'FY26'], sh = [845, 833, 808, 799], maxS = 900;
    for (var g = 0; g <= 3; g++) { var sv = (maxS / 3) * g, sy = pad.top + ph - (g / 3) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(sv.toFixed(0) + 'M', pad.left - 8, sy + 4); }
    var slot = pw / 4, bw = Math.min(44, slot * 0.52);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot + (slot - bw) / 2, bh = (sh[i] / maxS) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = i === 3 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(sh[i] + 'M', x + bw / 2, yt - 6);
     ctx.fillStyle = pal.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
     hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 加权稀释股本', body: sh[i] + 'M 股（FY26 全年回购 $3.18B + 分红 $1.57B）' });
    });
   } else {
    var items = [{ n: '现金及短期投资', v: 9.34, c: pal.green }, { n: '长期投资组合', v: 4.76, c: pal.blue }, { n: '总有息债务', v: 6.53, c: pal.amber }, { n: '客户合同负债', v: 3.59, c: pal.violet }];
    var slot2 = pw / 4, bw2 = Math.min(44, slot2 * 0.52), maxB = 11;
    for (var k = 0; k <= 2; k++) { var kv = k * 5, ky = pad.top + ph - (kv / maxB) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4); }
    items.forEach(function (it, i) {
     var x = pad.left + i * slot2 + (slot2 - bw2) / 2, bh = (it.v / maxB) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = it.c; roundRect(ctx, x, yt, bw2, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + it.v.toFixed(2) + 'B', x + bw2 / 2, yt - 6);
     ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(it.n, x + bw2 / 2, pad.top + ph + 20);
     hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw2, h: bh, title: it.n, body: '$' + it.v.toFixed(2) + 'B（截至 2026 年 10 月 25 日资产负债表）' });
    });
   }
  }

  var simData = { eps: [12.89, 15.2, 17.5, 19.8, 22.4, 25.2] };
  function drawSimMiniCanvas() {
   var env = prepCanvas('simMiniCanvas'); if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   var pad = { top: 22, right: 18, bottom: 26, left: 44 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'], arr = simData.eps, maxE = Math.max(28, Math.ceil(Math.max.apply(null, arr) * 1.15));
   ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
   ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
   arr.forEach(function (v, i) { var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
   ctx.stroke();
   arr.forEach(function (v, i) {
    var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
    ctx.fillStyle = (i === 5) ? pal.green : pal.blue; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + v.toFixed(2), px, py - 8);
    ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.fillText(yrs[i], px, pad.top + ph + 16);
   });
  }
  function runSimulator() {
   var gS = parseFloat(document.getElementById('inpSysCagr').value) / 100, gA = parseFloat(document.getElementById('inpAgsCagr').value) / 100, buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
   document.getElementById('lblSysCagr').textContent = (gS * 100).toFixed(1) + '%';
   document.getElementById('lblAgsCagr').textContent = (gA * 100).toFixed(1) + '%';
   document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';
   var sys = 26.142, ags = 6.901, oth = 1.403, shares = 799.0, baseGp = 17.255, epsArr = [12.89];
   for (var y = 1; y <= 5; y++) {
    sys *= (1 + gS); ags *= (1 + gA); shares *= (1 - buy);
    var gp = sys * 0.562 + ags * 0.365 + oth * 0.25;
    var netInc = 10.301 * (gp / baseGp);
    epsArr.push((netInc * 1000) / shares);
   }
   var fy31Rev = sys + ags + oth, fy31Gm = ((sys * 0.562 + ags * 0.365 + oth * 0.25) / fy31Rev) * 100, fy31Eps = epsArr[5], cagr = (Math.pow(fy31Eps / 12.89, 0.2) - 1) * 100;
   document.getElementById('simRevOut').textContent = '$' + fy31Rev.toFixed(1) + 'B';
   document.getElementById('simGmOut').textContent = fy31Gm.toFixed(1) + '%';
   document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
   document.getElementById('simCagrOut').textContent = (cagr >= 0 ? '+' : '') + cagr.toFixed(1) + '%';
   simData.eps = epsArr; drawSimMiniCanvas();
  }
  ['inpSysCagr', 'inpAgsCagr', 'inpBuyRate'].forEach(function (id) { document.getElementById(id).addEventListener('input', runSimulator); });
  var PRESETS = { bear: { s: 4.0, a: 8.5, b: 1.4 }, base: { s: 11.0, a: 12.5, b: 2.0 }, bull: { s: 16.0, a: 15.0, b: 2.8 } };
  document.getElementById('simPresets').addEventListener('click', function (e) {
   var b = e.target.closest('[data-preset]'); if (!b) return;
   var pr = PRESETS[b.getAttribute('data-preset')] || PRESETS.base;
   document.querySelectorAll('#simPresets .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
   document.getElementById('inpSysCagr').value = pr.s; document.getElementById('inpAgsCagr').value = pr.a; document.getElementById('inpBuyRate').value = pr.b;
   runSimulator();
  });

  function bindChartTab(gid, attr, skey, fn) {
   document.getElementById(gid).addEventListener('click', function (e) {
    var b = e.target.closest('[' + attr + ']'); if (!b) return;
    state[skey] = b.getAttribute(attr);
    document.querySelectorAll('#' + gid + ' .mui-seg-btn').forEach(function (btn) { btn.classList.toggle('active', btn === b); });
    fn();
   });
  }
  bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
  bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
  bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

  ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(function (cid) {
   var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
   c.addEventListener('mousemove', function (ev) {
    var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, arr = hitRegions[cid] || [], hit = null;
    for (var i = 0; i < arr.length; i++) { if (mx >= arr[i].x && mx <= arr[i].x + arr[i].w && my >= arr[i].y && my <= arr[i].y + arr[i].h) { hit = arr[i]; break; } }
    if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
    else tip.style.display = 'none';
   });
   c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
  });
  function drawAllCharts() { drawProfitCanvas(); drawCohortCanvas(); drawCapitalCanvas(); drawSimMiniCanvas(); }

  var QUICK_ITEMS = [
   { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$34.45B 营收 · 50.0% 毛利率 · 拐点材料工程平台' },
   { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: 'EPIC 联合研发 → 最全工具箱 → GAA/HBM → AGS 年金' },
   { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与业务拆解', s: 'Semiconductor Systems $26.14B · AGS $6.90B' },
   { id: 'mod-cohort', t: 'M3 晶圆厂分层 LTV 与赛道占比', s: 'DRAM Q4 占比 33% · 中国占比降至 25.4%' },
   { id: 'mod-capital', t: 'M4 资本配置与五年 EPS 推演器', s: 'FY26 回馈 $4.75B · 799M 稀释股本 · 5Y 情景模拟' },
   { id: 'mod-matrix', t: 'M5 全球设备巨头对标与风险压测', s: 'AMAT vs ASML / LRCX / KLAC / NVDA' }
  ];
  var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
  function renderQ(kw) {
   var q = (kw || '').trim().toLowerCase(), m = QUICK_ITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
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
   else { document.documentElement.toggleAttribute('data-sidebar-collapsed'); setTimeout(drawAllCharts, 60); }
  });
  bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
  window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });

  try {
   var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
   document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
    var k = chk.getAttribute('data-stress-chk'); chk.checked = !!savedChk[k];
    chk.addEventListener('change', function () { savedChk[k] = chk.checked; try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {} showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记'); });
   });
  } catch (e) {}

  document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
  document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
  document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
  document.getElementById('sideExportBtn')?.addEventListener('click', function () {
   var url = URL.createObjectURL(new Blob(['<!doctype html>\n', document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
   var a = document.createElement('a'); a.href = url; a.download = 'Applied_Materials_Business_Model_Analysis.html'; a.click();
   setTimeout(function () { URL.revokeObjectURL(url); }, 1500); showToast('已导出独立网页文件');
  });

  try { applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true); applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true); } catch (e) {}
  document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
  document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });
  var rt = null; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAllCharts, 90); });
  runSimulator(); drawAllCharts();
 })();
 