
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_OS_CHK_KEY = 'chwy_org_os_audit_v1';

    var state = {
      theme: document.documentElement.getAttribute('data-theme') || 'dark',
      lang: 'zh',
      topo: 'chewy',
      dialRole: 'ceo',
      eraIdx: 2,
      eraMetric: 'revemp'
    };

    var QUICK_ITEMS = [
      { id: 'sec-c0', t: 'C0 权力路由拓扑切换器', s: '无COO扁平职能制 vs 传统事业部拼盘' },
      { id: 'sec-c1', t: 'C1 2×2 文化操作码与高管带宽旋钮', s: 'WOW油画 · STAR+Debug · 周度WBR · 药师/兽医/AI混编' },
      { id: 'sec-c2', t: 'C2 三代领导力演进擦除器 (2011–2026+)', s: 'Ryan Cohen创业 → Sumit Singh IPO → 医疗与AI生态' },
      { id: 'sec-c3', t: 'C3 全球组织基因竞技场与阴阳对立', s: 'Chewy vs Amazon / Costco / Apple / 私募兽医连锁' },
      { id: 'sec-c4', t: 'C4 组织规模熵增模拟器与六律审计', s: '诊所扩张 × AI分流率 × Chewy University同化沙盘' }
    ];

    var DIAL_DATA = {
      ceo: {
        vals: [32, 30, 24, 14],
        labelsZh: ['客户体验与WOW品质护栏', 'WBR运营细节与资本纪律', '医疗/广告/AI第二曲线', '高管梯队与跨职能协同'],
        labelsEn: ['Customer WOW Guardrails', 'WBR Metrics & Capital', 'Health/Ads/AI Growth', 'Org Coaching & Alignment']
      },
      afc: {
        vals: [22, 46, 20, 12],
        labelsZh: ['包裹准时与破损率控制', 'AFC机械臂稼动与单箱成本', '库存合单算法迭代', '一线安全与Chewy Univ晋升'],
        labelsEn: ['On-Time & Damage SLA', 'AFC Uptime & Unit Cost', 'Split-Order Algorithms', 'Safety & Chewy Univ']
      },
      health: {
        vals: [36, 24, 26, 14],
        labelsZh: ['临床诊疗口碑与宠主共情', '50州药房合规与处方时效', 'Callie语音AI与EMR打通', '执业兽医/药师留存激励'],
        labelsEn: ['Clinical Care & Empathy', '50-State Rx Compliance', 'Callie AI & EMR Sync', 'DVM & Pharmacist Retention']
      }
    };

    var ERA_DATA = [
      {
        badge: 'ERA I · 2011–2018 狂热客服创业纪元',
        title: 'Ryan Cohen 与 Michael Day：用“不计成本的宠物共情”在 Amazon 铁蹄下撕开裂口',
        desc: '拒绝烧钱投泛流量电视广告，把每一分资金砸向佛州与达拉斯 24/7 自营真人客服、手写欢迎卡、宠物手绘肖像油画与重袋狗粮 Autoship 次日达。2017 年 5 月以创当时电商纪录的 $33.5亿被 PetSmart/BC Partners 收购。',
        k1: '~$2.1B→$3.5B', k2: '~18%–20%', k3: '<10秒接听',
        l1: '早期营收规模', l2: '创业期毛利率', l3: '确立客服黄金铁律'
      },
      {
        badge: 'ERA II · 2018–2023 职能化与机器人工业革命',
        title: 'Sumit Singh 掌舵：纽交所独立 IPO、7 大运营准则编纂与 AFC 机器人仓换血',
        desc: '前 Amazon 高管 Sumit Singh 接任 CEO，建立无 COO 扁平职能架构，2019 年成功上市并与 PetSmart 完全分拆；全面上线新一代自动化履约中心（AFC），员工自 FY21 峰值 21,300 人有序收敛至 18,100 人，开辟 Chewy Pharmacy 迈过盈亏平衡点。',
        k1: '$11.15B', k2: '28.4%', k3: '$616K',
        l1: 'FY2023 净销售额', l2: 'FY2023 毛利率', l3: 'FY2023 人均创收'
      },
      {
        badge: 'ERA III · 2024–2026+ 全栈医疗、广告与第一方 AI 时代',
        title: '从线上宠物药房跃升为“47家自营兽医诊所 + Chewy Max + 第一方AI”生态闭环',
        desc: '在保持 18,000 名核心员工零净膨胀的纪律下，通过 $1.75亿收购马术营养龙头 SmartEquine 与 $4.0亿收购现代兽医连锁 Modern Animal（诊所跃升至 47 家），叠加自研 Chewy Max 零售媒体与 Cai/Callie 多智能体，推动 Q2 FY26 毛利率冲上 30.4%，FY24–1H26 累计回购超 $16.0亿股票。',
        k1: '$13.52B', k2: '30.4%', k3: '$751K',
        l1: '年度营收中位 (FY26E)', l2: '峰值毛利率 (Q2 FY26)', l3: '人均年创收 (FY26E)'
      }
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
      var w = Math.max(240, rect.width || 440);
      var h = Math.max(160, rect.height || 240);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx: ctx, w: w, h: h };
    }

    // C0 Topology Switcher
    function renderTopology() {
      var isChewy = state.topo === 'chewy';
      var root = document.getElementById('topoRootTitle');
      var grid = document.getElementById('topoNodesGrid');
      var bar = document.getElementById('topoPoolBar');
      if (!root || !grid || !bar) return;

      if (isChewy) {
        root.textContent = 'CEO Sumit Singh · 直接统辖六大专业职能中枢（无 COO 中间层）';
        grid.innerHTML =
          '<div class="topo-node"><b>Retail 零售采销 (Allen Hughes)</b><span>主粮 Autoship（84.6% 占比）负责高频锁客与 Chewy Ads 变现，主动向医疗导流。</span></div>' +
          '<div class="topo-node"><b>Chewy Health (Mita Malhotra)</b><span>#1 宠物药房（$19.8亿）+ 47 家自营诊所（含 Modern Animal）共享零获客成本流量。</span></div>' +
          '<div class="topo-node"><b>Tech &amp; Supply Finance (Wang / Deppe)</b><span>100% 第一方 AI（Cai/Callie）与 17 座履约中心（AFC）统一调度库存与算力。</span></div>';
        bar.className = 'topo-pool-bar';
        bar.textContent = '✓ 统一底层账本：2,170.5 万活跃宠主单一 Pet Profile 损益池（NSPAC $602 · 跨诊所客户 +15%–20% 提振）';
        document.getElementById('topoStat1').textContent = '~$0（Autoship 一键转处方/诊所）';
        document.getElementById('topoStat2').textContent = '$700K（FY26E $751K）';
        document.getElementById('topoStat3').textContent = '100% 第一方自研 (Cai + Chewy Max)';
        document.getElementById('topoStat4').textContent = '-8.3 天（供应商资金浮存）';
      } else {
        root.textContent = '传统集团总部 / 私募控股层 · 各事业部独立背负短期毛利 KPI';
        grid.innerHTML =
          '<div class="topo-node"><b>线下门店事业部</b><span>背负重商业租约与导购排班成本，抗拒线上低价订阅分流客源。</span></div>' +
          '<div class="topo-node"><b>并购动物医院拼盘</b><span>各诊所沿用十余套老旧病历软件，靠院内高价锁死处方药抗拒线上药房。</span></div>' +
          '<div class="topo-node"><b>外包电商与第三方广告部</b><span>依赖外部 SaaS 与零散促销买量，用户画像割裂、复购率不足 45%。</span></div>';
        bar.className = 'topo-pool-bar warn';
        bar.textContent = '✕ 割裂账本：多套会员体系各自算账、重复投放获客，人均年创收困在 ~$210K–$260K';
        document.getElementById('topoStat1').textContent = '高昂重复买量（门店与线上互搏）';
        document.getElementById('topoStat2').textContent = '~$210K–$250K（重人力低周转）';
        document.getElementById('topoStat3').textContent = '多套异构外包 ERP / 旧病历孤岛';
        document.getElementById('topoStat4').textContent = '+25 至 +45 天（门店压货占资）';
      }
    }

    // C1 Leadership Bandwidth Donut Dial
    function drawDial() {
      var cv = document.getElementById('dialCanvas');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var cfg = DIAL_DATA[state.dialRole] || DIAL_DATA.ceo;
      var colors = [p.blue, p.green, p.violet, p.amber];
      var cx = w / 2, cy = h / 2, rOut = Math.min(w, h) * 0.40, rIn = rOut * 0.60;
      var start = -Math.PI / 2;

      cfg.vals.forEach(function (v, i) {
        var sweep = (v / 100) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, rOut, start, start + sweep);
        ctx.arc(cx, cy, rIn, start + sweep, start, true);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        start += sweep;
      });

      ctx.fillStyle = p.text; ctx.font = '800 14px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillText('7 OPs', cx, cy - 3);
      ctx.fillStyle = p.sub; ctx.font = '600 10.5px sans-serif';
      ctx.fillText(state.dialRole.toUpperCase(), cx, cy + 14);

      var leg = document.getElementById('dialLegend');
      if (leg) {
        var lbs = state.lang === 'en' ? cfg.labelsEn : cfg.labelsZh;
        leg.innerHTML = cfg.vals.map(function (v, idx) {
          return '<div class="dial-leg-item"><span style="display:inline-flex;align-items:center;gap:6px;"><i style="width:9px;height:9px;border-radius:3px;background:' + colors[idx] + ';display:inline-block;"></i>' + lbs[idx] + '</span><b class="mono">' + v + '%</b></div>';
        }).join('');
      }
    }

    // C2 3-Era Canvas
    function renderEraText() {
      var d = ERA_DATA[state.eraIdx] || ERA_DATA[2];
      document.getElementById('eraBadge').textContent = d.badge;
      document.getElementById('eraTitle').textContent = d.title;
      document.getElementById('eraDesc').textContent = d.desc;
      document.getElementById('eraKpi1').textContent = d.k1;
      document.getElementById('eraKpi2').textContent = d.k2;
      document.getElementById('eraKpi3').textContent = d.k3;
    }

    function drawEraCanvas() {
      var cv = document.getElementById('eraCanvas');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
      var vals = state.eraMetric === 'revemp'
        ? [417, 521, 616, 659, 700, 751]
        : [-8.0, 119.3, 342.9, 452.5, 562.4, 695.0];
      var maxV = state.eraMetric === 'revemp' ? 850 : 800;
      var minV = state.eraMetric === 'revemp' ? 300 : -50;

      var padL = 52, padR = 20, padT = 26, padB = 34;
      var cw = w - padL - padR, ch = h - padT - padB;

      for (var i = 0; i <= 4; i++) {
        var gy = padT + (ch / 4) * i;
        var gv = maxV - ((maxV - minV) / 4) * i;
        ctx.strokeStyle = p.grid;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke();
        ctx.fillStyle = p.muted; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
        ctx.fillText('$' + Math.round(gv) + (state.eraMetric === 'revemp' ? 'K' : 'M'), 4, gy + 3);
      }

      var step = cw / yrs.length;
      yrs.forEach(function (yr, idx) {
        var cx = padL + step * (idx + 0.5);
        var bw = Math.min(36, step * 0.50);
        var zeroY = padT + ch - ((0 - minV) / (maxV - minV)) * ch;
        var valY = padT + ch - ((vals[idx] - minV) / (maxV - minV)) * ch;
        var topY = Math.min(zeroY, valY);
        var bh = Math.max(3, Math.abs(zeroY - valY));

        var highlight = (state.eraIdx === 1 && idx <= 2) || (state.eraIdx === 2 && idx >= 3) || state.eraIdx === 0;
        ctx.fillStyle = highlight ? p.blue : p.blueSoft;
        ctx.fillRect(cx - bw / 2, topY, bw, bh);

        ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + Math.round(vals[idx]) + (state.eraMetric === 'revemp' ? 'K' : 'M'), cx, topY - 6);
        ctx.fillStyle = p.sub; ctx.font = '700 11px sans-serif';
        ctx.fillText(yr, cx, h - 10);
      });
    }

    // C3 Genome Scatter Arena
    function drawGenomeArena() {
      var cv = document.getElementById('genomeCanvas');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var padL = 54, padR = 30, padT = 24, padB = 36;
      var cw = w - padL - padR, ch = h - padT - padB;

      for (var i = 0; i <= 4; i++) {
        var gy = padT + (ch / 4) * i;
        ctx.strokeStyle = p.grid;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke();
        ctx.fillStyle = p.muted; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
        ctx.fillText('GM ' + (55 - i * 11) + '%', 4, gy + 3);
      }

      ctx.fillStyle = p.muted; ctx.font = '700 10.5px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(state.lang === 'en' ? 'X-Axis: Recurring Customer / Subscription Lock-In (%)   |   Bubble Size = Revenue per Employee' : '横轴：订阅/会员复购锁定率 (%)   ·   气泡半径映射人均年创收效能', padL + cw / 2, h - 8);

      var peers = [
        { name: 'Chewy ($700K/FTE)', lock: 84.6, gm: 30.4, r: 17, c: p.blue },
        { name: 'Apple ($2.5M/FTE)', lock: 90.0, gm: 46.5, r: 24, c: p.violet },
        { name: 'Amazon ($461K/FTE)', lock: 76.0, gm: 49.0, r: 14, c: p.amber },
        { name: 'Costco ($810K/FTE)', lock: 92.5, gm: 12.8, r: 18, c: p.green },
        { name: 'Petco ($210K/FTE)', lock: 42.0, gm: 38.0, r: 10, c: p.muted }
      ];

      peers.forEach(function (pr) {
        var px = padL + ((pr.lock - 35) / 65) * cw;
        var py = padT + ch - ((pr.gm - 11) / 44) * ch;
        ctx.beginPath();
        ctx.arc(px, py, pr.r, 0, Math.PI * 2);
        ctx.fillStyle = pr.c;
        ctx.globalAlpha = 0.24;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = pr.c;
        ctx.stroke();

        ctx.fillStyle = p.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(pr.name, px, py - pr.r - 6);
      });
    }

    // C4 Scaling Entropy Simulator
    function runEntropySim() {
      var cEl = document.getElementById('entClinic');
      var aEl = document.getElementById('entAi');
      var tEl = document.getElementById('entTrain');
      if (!cEl || !aEl || !tEl) return;

      var clinics = parseInt(cEl.value, 10);
      var aiPct = parseInt(aEl.value, 10);
      var train = parseInt(tEl.value, 10);

      document.getElementById('entClinicVal').textContent = clinics + (state.lang === 'en' ? ' Clinics' : ' 家');
      document.getElementById('entAiVal').textContent = aiPct + '%';
      document.getElementById('entTrainVal').textContent = train + ' / 10';

      var clinicDrag = (clinics - 47) * 0.11;
      var aiOverreach = aiPct > 48 ? (aiPct - 48) * 0.55 : 0;
      var trainBoost = (train - 5) * 3.4;
      var cohesion = Math.round(Math.max(48, Math.min(96, 86 - clinicDrag - aiOverreach + trainBoost)));
      var sgaBps = -Math.round(aiPct * 2.6 + Math.min(40, (clinics - 47) * 0.18));

      document.getElementById('entOutCohesion').textContent = cohesion + ' / 100';
      document.getElementById('entOutSga').textContent = sgaBps + ' bps';
      var npsEl = document.getElementById('entOutNps');
      var noteEl = document.getElementById('entNote');
      if (aiPct > 55 && cohesion < 74) {
        npsEl.textContent = state.lang === 'en' ? 'Empathy Risk' : '共情稀释预警';
        noteEl.textContent = '风险提示：AI 自动拦截率超过 55% 且线下诊所扩张过快时，易挤压真人 <10s 关怀通道，建议同步拉升 Chewy University 培训强度至 9–10。';
      } else if (cohesion >= 82) {
        npsEl.textContent = state.lang === 'en' ? 'Optimal Zone' : '极高稳态甜点';
        noteEl.textContent = '当前参数处于帕累托甜点区：AI 精准消化查单/改期高频重复会话，释放 ~6,000 名专员与执业兽医专注高价值医疗与情感绑定。';
      } else {
        npsEl.textContent = state.lang === 'en' ? 'Manageable' : '可控磨合区间';
        noteEl.textContent = '当前处于规模磨合区间：需密切监控新增兽医诊所四墙利润率（>20%）与执业兽医年度留存率。';
      }

      var cv = document.getElementById('entropyCanvas');
      if (!cv) return;
      var s = setupHiDPI(cv), ctx = s.ctx, w = s.w, h = s.h, p = getPalette();
      ctx.clearRect(0, 0, w, h);

      var yrs = ['2026', '2027', '2028', '2029', '2030', '2031', '2032'];
      var padL = 42, padR = 18, padT = 22, padB = 30;
      var cw = w - padL - padR, ch = h - padT - padB;

      for (var g = 0; g <= 4; g++) {
        var gy = padT + (ch / 4) * g;
        ctx.strokeStyle = p.grid;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke();
        ctx.fillStyle = p.muted; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
        ctx.fillText((100 - g * 15) + '', 8, gy + 3);
      }

      var step = cw / (yrs.length - 1);
      var cohSeries = [], levSeries = [];
      yrs.forEach(function (_, i) {
        var frac = i / 6;
        cohSeries.push(90 + (cohesion - 90) * frac);
        levSeries.push(65 + Math.min(33, (Math.abs(sgaBps) / 180) * 30 * frac));
      });

      function plotLine(arr, color) {
        ctx.beginPath();
        arr.forEach(function (v, idx) {
          var px = padL + step * idx;
          var py = padT + ch - ((v - 40) / 60) * ch;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.strokeStyle = color; ctx.lineWidth = 2.6; ctx.stroke();
        arr.forEach(function (v, idx) {
          var px = padL + step * idx;
          var py = padT + ch - ((v - 40) / 60) * ch;
          ctx.fillStyle = color;
          ctx.beginPath(); ctx.arc(px, py, 3.8, 0, Math.PI * 2); ctx.fill();
        });
      }

      plotLine(levSeries, p.blue);
      plotLine(cohSeries, p.green);

      yrs.forEach(function (yr, idx) {
        ctx.fillStyle = p.sub; ctx.font = '600 10.5px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(yr, padL + step * idx, h - 8);
      });
    }

    function drawAllCharts() {
      drawDial();
      drawEraCanvas();
      drawGenomeArena();
      runEntropySim();
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
      if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文界面');
    }

    function triggerHtmlDownload() {
      try {
        var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
        var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Chewy企业文化与组织操作系统.html';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 150);
        showToast('正在下载：Chewy企业文化与组织操作系统.html');
      } catch (e) {
        showToast('请使用浏览器右键“另存为”保存此网页');
      }
    }

    // Event bindings
    document.getElementById('topoSwitchGroup').addEventListener('click', function (e) {
      var b = e.target.closest('[data-topo]');
      if (!b) return;
      state.topo = b.getAttribute('data-topo');
      document.querySelectorAll('#topoSwitchGroup .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
      renderTopology();
    });

    document.getElementById('dialRoleGroup').addEventListener('click', function (e) {
      var b = e.target.closest('[data-role]');
      if (!b) return;
      state.dialRole = b.getAttribute('data-role');
      document.querySelectorAll('#dialRoleGroup .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
      drawDial();
    });

    document.getElementById('eraTabs').addEventListener('click', function (e) {
      var t = e.target.closest('[data-era]');
      if (!t) return;
      state.eraIdx = parseInt(t.getAttribute('data-era'), 10);
      document.querySelectorAll('#eraTabs .era-tab').forEach(function (x) { x.classList.toggle('active', x === t); });
      renderEraText();
      drawEraCanvas();
    });

    document.getElementById('eraMetricSwitch').addEventListener('click', function (e) {
      var b = e.target.closest('[data-era-metric]');
      if (!b) return;
      state.eraMetric = b.getAttribute('data-era-metric');
      document.querySelectorAll('#eraMetricSwitch .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
      drawEraCanvas();
    });

    ['entClinic', 'entAi', 'entTrain'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', runEntropySim);
    });

    // Checklist persistence
    try {
      var savedC = JSON.parse(localStorage.getItem(STORAGE_OS_CHK_KEY) || '{}');
      document.querySelectorAll('[data-os-chk]').forEach(function (chk) {
        var k = chk.getAttribute('data-os-chk');
        if (typeof savedC[k] === 'boolean') chk.checked = savedC[k];
        chk.addEventListener('change', function () {
          savedC[k] = chk.checked;
          try { localStorage.setItem(STORAGE_OS_CHK_KEY, JSON.stringify(savedC)); } catch (err) {}
          showToast(chk.checked ? '已确认该组织健康律达标' : '已标记为待复核项');
        });
      });
    } catch (e) {}

    // Suite Hub Filter & Click
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

    // Sidebar Toggle & Actions
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
      var secs = ['sec-c0', 'sec-c1', 'sec-c2', 'sec-c3', 'sec-c4'];
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

    renderTopology();
    renderEraText();
    drawAllCharts();
  })();
  