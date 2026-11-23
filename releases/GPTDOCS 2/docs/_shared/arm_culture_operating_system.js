
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
      var STORAGE_AUDIT_KEY = 'arm_os_audit_v1';

      var state = {
        theme: 'dark',
        lang: 'zh',
        topo: 'arm',
        dialIdx: 0,
        eraIdx: 2,
        eraChart: 'chips'
      };

      var hitRegions = { eraCanvas: [], genomeCanvas: [] };

      function showToast(msg) {
        var bar = document.getElementById('muiSnackbar');
        if (!bar) return;
        bar.textContent = msg;
        bar.classList.add('show');
        clearTimeout(bar._t);
        bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2400);
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
          blueSoft: dark ? 'rgba(51, 153, 255, 0.24)' : 'rgba(0, 115, 230, 0.16)',
          green: dark ? '#22C55E' : '#16A34A',
          amber: dark ? '#FFB74D' : '#D97706',
          violet: dark ? '#A78BFA' : '#7C3AED',
          red: dark ? '#FF6B6B' : '#DC2626'
        };
      }

      function setupHiDPI(canvas) {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var rect = canvas.getBoundingClientRect();
        var w = Math.max(240, Math.floor(rect.width));
        var h = Math.max(150, Math.floor(rect.height));
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
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
        if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
        if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
        drawAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深空暗色模式' : '已切换至清晰浅色模式');
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

      // Suite Hub
      var hub = document.getElementById('companySubfolderHub');
      if (hub) {
        hub.addEventListener('click', function (e) {
          var pill = e.target.closest('[data-co-cat]');
          if (pill) {
            var cat = pill.getAttribute('data-co-cat');
            var ps = hub.querySelectorAll('[data-co-cat]');
            for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === pill);
            var its = hub.querySelectorAll('[data-co-item-cat]');
            for (var j = 0; j < its.length; j++) {
              var ic = its[j].getAttribute('data-co-item-cat');
              its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || ic === cat));
            }
            return;
          }
          var jumpBtn = e.target.closest('[data-suite-jump]');
          if (jumpBtn) {
            var fn = jumpBtn.getAttribute('data-suite-jump');
            showToast('套件姊妹篇「' + fn + '」已同步生成，可在聊天附件卡片中直接打开或下载');
          }
        });
      }

      // C0: Topology Switcher
      var TOPO_DATA = {
        arm: {
          coreT: '中枢内核：首席架构师统御单一 Armv9 / SME2 指令集宪法 + 8,058 人中央工程池',
          coreD: '严禁生态分支碎片化；一套微架构研发投入（FY26 $27.76亿）由全球 385+ 订阅授权伙伴共同分摊，前置授权费即覆盖超 120% Non-GAAP 研发成本。',
          b1T: 'Cloud AI BU（云端超算）', b1D: 'Neoverse CSS 赋能 AWS/NVIDIA/Google + 联手 Meta 量产 3nm 136 核 Arm AGI CPU',
          b2T: 'Edge AI BU（移动与 PC）', b2D: '手机 AP >99% 统治力 + Lumex/SME2 双倍版税 + Arm AI PC 斩获全球 ~20% 出货份额',
          b3T: 'Physical AI BU（车规与具身）', b3D: '车规 Zena CSS 缩短 12 个月流片时间，Q2 FY27 物理 AI 版税同比飙升 +50%',
          eq: '组织杠杆公式：8,058 名工程师 × 零晶圆厂折旧 × (台积电先进制程 + 3,000万开发者软件栈) = 97.5% 毛利率 & 单季 >100亿颗芯片出货',
          m: [
            ['工程师人才浓度', '84.1%', '9,584 名全职员工中 8,058 人为工程师，行政销售极度精简'],
            ['GAAP 毛利率护城河', '97.5%', 'Non-GAAP 毛利率高达 98.2%，无产线产能利用率滑坡风险'],
            ['外部生态放大倍数', '3,100x+', '每名 Arm 员工背后连接逾 3,100 名外部原生 Arm 软件开发者'],
            ['工艺迭代绑定风险', '零死锁', '天然绑定全球最先进代工厂（TSMC N3P/2nm），绝不被单一落伍晶圆厂拖垮']
          ]
        },
        idm: {
          coreT: '传统 IDM 帝国中枢：封闭专有指令集 × 自建数座百亿美元重资产晶圆厂绑定',
          coreD: '芯片设计部门被迫锁死在内部晶圆厂节点上；一旦某代光刻工艺延期（如 10nm/7nm 难产），全公司十万名员工的产品竞争力同步停摆，巨额折旧迅速吞噬毛利。',
          b1T: '封闭服务器事业部', b1D: '依赖历史存量高功耗架构防守，受困于云厂商自研 Arm 处理器替代潮',
          b2T: '传统 PC 客户端事业部', b2D: '缺乏移动低功耗基因，曾错失智能手机浪潮并面临 AI PC ~20% 分流',
          b3T: '内部晶圆代工事业群', b3D: '既做裁判又做运动员，外部 Fabless 巨头因担心机密泄露极难放心交单',
          eq: '传统 IDM 困局：108,000+ 员工 × 每年 $20B+ 晶圆厂重资产 CapEx × 内部制造良率摩擦 → ~33% 毛利率与组织内耗',
          m: [
            ['重资产人员结构', '~108,900 FTE', '大量产线运维与行政层级稀释了顶层微架构研发敏捷度'],
            ['周期下行毛利率', '~33.0%', '产能利用率不足与先进制程折旧导致毛利率剧烈承压'],
            ['生态商业模式', '单打独斗', '巨额研发仅能靠自家芯片销售分摊，外部芯片厂均为零和死敌'],
            ['制造耦合风险', '高度锁死', '设计部门与内部晶圆厂互相甩锅，组织拆分重组阵痛漫长']
          ]
        }
      };
      var topoSw = document.getElementById('topoSwitch');
      if (topoSw) {
        topoSw.addEventListener('click', function (e) {
          var b = e.target.closest('[data-topo]');
          if (!b) return;
          var k = b.getAttribute('data-topo');
          state.topo = k;
          var bs = topoSw.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var d = TOPO_DATA[k];
          document.getElementById('tbCoreTitle').textContent = d.coreT;
          document.getElementById('tbCoreDesc').textContent = d.coreD;
          document.getElementById('tbB1Title').textContent = d.b1T;
          document.getElementById('tbB1Desc').textContent = d.b1D;
          document.getElementById('tbB2Title').textContent = d.b2T;
          document.getElementById('tbB2Desc').textContent = d.b2D;
          document.getElementById('tbB3Title').textContent = d.b3T;
          document.getElementById('tbB3Desc').textContent = d.b3D;
          document.getElementById('topoEquation').textContent = d.eq;
          for (var m = 0; m < 4; m++) {
            document.getElementById('tm' + (m + 1) + 'Lbl').textContent = d.m[m][0];
            document.getElementById('tm' + (m + 1) + 'Val').textContent = d.m[m][1];
            document.getElementById('tm' + (m + 1) + 'Sub').textContent = d.m[m][2];
          }
        });
      }

      // C1: Bandwidth Dial
      var DIAL_SEGMENTS = [
        { pct: 38, lbl: 'ISA & 微架构', note: '<strong>底层 Armv9/SME2 与 CPU/GPU 微架构（~38% 工程带宽）：</strong>由中央架构与中央工程部主导，迭代下一代 Cortex、Neoverse 与 Mali G2-Ultra NX 核心，构筑所有授权与整芯产品的源头活水。' },
        { pct: 28, lbl: 'CSS 计算子系统', note: '<strong>三大垂直 CSS 计算子系统集成验证（~28% 工程带宽）：</strong>聚焦 Neoverse CSS、Lumex/Mobile CSS 2 与车规 Zena CSS 的缓存一致性互联与 3nm/2nm 物理时序收敛，直接驱动单芯片双倍版税率。' },
        { pct: 20, lbl: 'KleidiAI 软件栈', note: '<strong>KleidiAI、编译器与 3,000万开发者底座（~20% 工程带宽）：</strong>看似不直接收费，却是锁死生态的隐形武器——把 SME2 矩阵算子原生植入 PyTorch、Android、Linux 与云原生工具链。' },
        { pct: 14, lbl: 'AGI 整芯突击队', note: '<strong>首款 3nm 136 核 Arm AGI CPU 整芯与先进封装（~14% 工程带宽）：</strong>增速最快的新建特种部队，与首席伙伴 Meta 及台积电 N3P/UCIe 深度协同，瞄准 FY2031 ~$150亿自研芯片增量空间。' }
      ];
      function drawDialCanvas() {
        var c = document.getElementById('dialCanvas');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        var cx = w / 2, cy = h / 2, rOut = Math.min(w, h) * 0.40, rIn = rOut * 0.62;
        var cols = [pal.blue, pal.green, pal.violet, pal.amber];
        var startA = -Math.PI / 2;
        DIAL_SEGMENTS.forEach(function (seg, i) {
          var sweep = (seg.pct / 100) * Math.PI * 2;
          var endA = startA + sweep;
          var rad = (i === state.dialIdx) ? rOut + 6 : rOut;
          ctx.beginPath();
          ctx.arc(cx, cy, rad, startA, endA);
          ctx.arc(cx, cy, rIn, endA, startA, true);
          ctx.closePath();
          ctx.fillStyle = cols[i];
          ctx.globalAlpha = (i === state.dialIdx) ? 1 : 0.68;
          ctx.fill();
          ctx.globalAlpha = 1;
          startA = endA;
        });
        var cur = DIAL_SEGMENTS[state.dialIdx];
        ctx.fillStyle = pal.text;
        ctx.font = '800 22px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(cur.pct + '%', cx, cy - 2);
        ctx.fillStyle = pal.sub;
        ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(cur.lbl, cx, cy + 17);
      }
      var dPills = document.getElementById('dialPills');
      if (dPills) {
        dPills.addEventListener('click', function (e) {
          var b = e.target.closest('[data-dial]');
          if (!b) return;
          state.dialIdx = parseInt(b.getAttribute('data-dial'), 10) || 0;
          var bs = dPills.querySelectorAll('.dial-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          document.getElementById('dialNote').innerHTML = DIAL_SEGMENTS[state.dialIdx].note;
          drawDialCanvas();
        });
      }

      // C2: 3-Era Governance Scrubber
      var ERAS = [
        {
          t: 'OS v1.0（1990–2013）：Saxby & East 剑桥合伙人创世纪元',
          d: '12 名创始工程师在剑桥火鸡谷仓创立公司。Sir Robin Saxby 将资金匮乏转化为组织优势：确立“零晶圆厂 + 全球半导体伙伴网络”，Warren East 随后完善跨国治理，伴随诺基亚与初代 iPhone 引爆全球移动革命，累计芯片出货迈向 500 亿颗。',
          kv: [['所有权与治理形态', 'LSE / Nasdaq 双重上市公众公司'], ['组织架构核心特征', '剑桥集中式 CPU 微架构工程部'], ['代表性产品与定价飞跃', 'ARM7TDMI / Cortex-A 系列单核授权'], ['期末生态里程碑', '移动手机 >95% 标准 · ~3,000 员工']]
        },
        {
          t: 'OS v2.0（2013–2022）：Segars 时代与软银 £243亿私有化逆周期蓄力',
          d: '2016 年软银集团私有化收购为 Arm 卸下了公开市场季度盈利考核枷锁。Simon Segars 趁势将全球研发编制扩大一倍，承受利润率暂时探底的阵痛，潜心十年攻克 64 位服务器生态（Neoverse）与新一代安全矩阵指令集（Armv9），为 AI 时代埋下决定性伏笔。',
          kv: [['所有权与治理形态', '软银集团 100% 私有化全资子公司'], ['组织架构核心特征', 'IP 产品群 (IPG) 扩张 + 物联网试水剥离'], ['代表性产品与定价飞跃', 'Neoverse 云架构首发 + Armv9 奠基'], ['期末生态里程碑', '累计出货突破 2,200亿颗 · ~6,000 员工']]
        },
        {
          t: 'OS v3.0（2022–2026+）：Rene Haas 全栈平台与整芯突破操作系统',
          d: '2022 年 2 月英伟达收购终止后，Rene Haas 迅速完成管理层换血，引入硅谷顶级 SaaS 与算力高管（CFO Jason Child、CMO Ami Badani 等），把组织从“被动响应客户需求的 IP 超市”升级为“主动定义 Cloud/Edge/Physical AI 计算子系统乃至 3nm 量产整芯”的进攻型平台，驱动营收从 FY23 $26.8亿跃升至 Q2 FY27 TTM $54.7亿。',
          kv: [['所有权与治理形态', 'Nasdaq 上市 · 软银控股 ~87%'], ['组织架构核心特征', '中央 ISA 主干 × 3 大 AI BU'], ['代表性产品与定价飞跃', '23 项 CSS + 136 核 AGI CPU'], ['期末生态里程碑', '3,500亿+ 芯片 · 3,000万+ 开发者']]
        }
      ];
      var eraScrub = document.getElementById('eraScrubber');
      if (eraScrub) {
        eraScrub.addEventListener('click', function (e) {
          var b = e.target.closest('[data-era]');
          if (!b) return;
          state.eraIdx = parseInt(b.getAttribute('data-era'), 10) || 0;
          var bs = eraScrub.querySelectorAll('.era-tab');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var ed = ERAS[state.eraIdx];
          document.getElementById('eraTitle').textContent = ed.t;
          document.getElementById('eraDesc').textContent = ed.d;
          document.getElementById('eraKvGrid').innerHTML = ed.kv.map(function (it) {
            return '<div class="era-kv"><span>' + it[0] + '</span><b class="mono">' + it[1] + '</b></div>';
          }).join('');
        });
      }

      function drawEraCanvas() {
        var c = document.getElementById('eraCanvas');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        hitRegions.eraCanvas = [];
        var pad = { top: 26, right: 24, bottom: 32, left: 46 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.eraChart === 'chips') {
          var pts = [
            { yr: '1998', v: 0.2 }, { yr: '2008', v: 10 }, { yr: '2014', v: 50 },
            { yr: '2017', v: 100 }, { yr: '2021', v: 200 }, { yr: '2024', v: 287.4 }, { yr: '2026', v: 350 }
          ];
          var maxC = 380;
          for (var g = 0; g <= 4; g++) {
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(Math.round((g / 4) * maxC) + 'B', pad.left - 6, gy + 3);
          }
          ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
          pts.forEach(function (p, i) {
            var px = pad.left + (i / (pts.length - 1)) * pw, py = pad.top + ph - (p.v / maxC) * ph;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          pts.forEach(function (p, i) {
            var px = pad.left + (i / (pts.length - 1)) * pw, py = pad.top + ph - (p.v / maxC) * ph;
            ctx.fillStyle = (i === pts.length - 1) ? pal.green : pal.blue;
            ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(p.v + 'B', px, py - 8);
            ctx.fillStyle = pal.tick; ctx.fillText(p.yr, px, pad.top + ph + 16);
            hitRegions.eraCanvas.push({
              x: px - 16, y: py - 16, w: 32, h: 32,
              title: p.yr + ' 累计芯片出货: ' + p.v + 'B+ 颗',
              body: '从 1998 年上市时不足 2 亿颗跃升至 FY2026 超 3,500 亿颗（Q2 FY27 单季超 100 亿颗）'
            });
          });
        } else {
          var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
          var rd = [995, 1133, 1979, 2071, 2776];
          var ebit = [830, 783, 1408, 1871, 2115];
          var maxM = 3100;
          for (var k = 0; k <= 4; k++) {
            var ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + Math.round((k / 4) * maxM) + 'M', pad.left - 6, ky + 3);
          }
          var bw = 20;
          yrs.forEach(function (yr, i) {
            var cx = pad.left + (i + 0.5) * (pw / yrs.length);
            var h1 = (rd[i] / maxM) * ph, h2 = (ebit[i] / maxM) * ph;
            ctx.fillStyle = pal.violet; ctx.fillRect(cx - bw - 2, pad.top + ph - h1, bw, h1);
            ctx.fillStyle = pal.green; ctx.fillRect(cx + 2, pad.top + ph - h2, bw, h2);
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(yr, cx, pad.top + ph + 16);
            hitRegions.eraCanvas.push({
              x: cx - bw - 4, y: pad.top + ph - Math.max(h1, h2), w: bw * 2 + 8, h: Math.max(h1, h2),
              title: yr + ' 研发投入 vs Non-GAAP 营业利润',
              body: 'GAAP 研发 (紫): $' + rd[i] + 'M · Non-GAAP 营业利润 (绿): $' + ebit[i] + 'M'
            });
          });
        }
      }
      var ecTabs = document.getElementById('eraChartTabs');
      if (ecTabs) {
        ecTabs.addEventListener('click', function (e) {
          var b = e.target.closest('[data-ec]');
          if (!b) return;
          state.eraChart = b.getAttribute('data-ec');
          var bs = ecTabs.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          drawEraCanvas();
        });
      }

      // C3: Semiconductor Genome Scatter Arena
      function drawGenomeCanvas() {
        var c = document.getElementById('genomeCanvas');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        hitRegions.genomeCanvas = [];
        var pad = { top: 24, right: 32, bottom: 36, left: 48 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        // X: Engineer Purity 40% - 90%; Y: GAAP GM 20% - 105%
        for (var g = 0; g <= 4; g++) {
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText((20 + g * 20) + '% GM', pad.left - 6, gy + 3);
        }
        for (var x = 0; x <= 5; x++) {
          var gx = pad.left + (x / 5) * pw;
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText((40 + x * 10) + '% 工程', gx, pad.top + ph + 18);
        }

        var peers = [
          { name: 'Arm (ARM)', eng: 84.1, gm: 97.5, r: 16, col: pal.blue, desc: '84.1% 工程师纯度 · 97.5% GAAP 毛利率 · 9,584 FTE' },
          { name: 'Synopsys', eng: 78.0, gm: 80.0, r: 12, col: pal.violet, desc: '~78% 工程技术占比 · ~80% 毛利率 · EDA+IP 订阅模型' },
          { name: 'NVIDIA', eng: 74.0, gm: 71.1, r: 20, col: pal.green, desc: '~74% 研发占比 · 71.1% GAAP 毛利率 · 人均创收 ~$5.14M' },
          { name: 'TSMC', eng: 53.0, gm: 56.0, r: 16, col: pal.amber, desc: '纯晶圆代工制造纪律 · ~56% 毛利率 · ~83,000 FTE' },
          { name: 'Intel', eng: 48.0, gm: 33.0, r: 14, col: pal.red, desc: 'IDM 重资产转型期 · ~33% 毛利率 · ~108,900 FTE' }
        ];

        peers.forEach(function (p) {
          var px = pad.left + ((p.eng - 40) / 50) * pw;
          var py = pad.top + ph - ((p.gm - 20) / 85) * ph;
          ctx.fillStyle = p.col;
          ctx.globalAlpha = 0.24;
          ctx.beginPath(); ctx.arc(px, py, p.r + 4, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 0.92;
          ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(p.name, px, py - p.r - 6);
          hitRegions.genomeCanvas.push({
            x: px - p.r - 4, y: py - p.r - 4, w: (p.r + 4) * 2, h: (p.r + 4) * 2,
            title: p.name, body: p.desc
          });
        });
      }

      // C4: Entropy Simulator
      var entState = { trustSeries: [], ebitSeries: [] };
      function drawEntropyCanvas() {
        var c = document.getElementById('entropyCanvas');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        var pad = { top: 22, right: 36, bottom: 28, left: 42 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
        var maxE = 14;

        for (var g = 0; g <= 3; g++) {
          var gy = pad.top + ph - (g / 3) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round((g / 3) * maxE) + 'B', pad.left - 5, gy + 3);
        }

        // Bars: Consolidated Non-GAAP EBIT ($B)
        var bw = Math.min(34, pw / 9);
        entState.ebitSeries.forEach(function (v, i) {
          var cx = pad.left + (i + 0.5) * (pw / 6);
          var bh = (Math.min(maxE, v) / maxE) * ph;
          var by = pad.top + ph - bh;
          ctx.fillStyle = pal.blueSoft; ctx.strokeStyle = pal.blue; ctx.lineWidth = 1.4;
          ctx.fillRect(cx - bw / 2, by, bw, bh); ctx.strokeRect(cx - bw / 2, by, bw, bh);
          ctx.fillStyle = pal.text; ctx.font = 'bold 9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(1) + 'B', cx, by - 5);
          ctx.fillStyle = pal.tick; ctx.fillText(yrs[i], cx, pad.top + ph + 15);
        });

        // Line: Partner Trust Score (0-100)
        ctx.strokeStyle = pal.green; ctx.lineWidth = 2.2; ctx.beginPath();
        entState.trustSeries.forEach(function (t, i) {
          var cx = pad.left + (i + 0.5) * (pw / 6);
          var ty = pad.top + ph - (t / 100) * ph;
          if (i === 0) ctx.moveTo(cx, ty); else ctx.lineTo(cx, ty);
        });
        ctx.stroke();
        entState.trustSeries.forEach(function (t, i) {
          var cx = pad.left + (i + 0.5) * (pw / 6), ty = pad.top + ph - (t / 100) * ph;
          ctx.fillStyle = t < 65 ? pal.red : pal.green;
          ctx.beginPath(); ctx.arc(cx, ty, 3.8, 0, Math.PI * 2); ctx.fill();
        });
      }

      function runEntropySim() {
        var silPct = parseFloat(document.getElementById('rngEntSilicon').value);
        var wall = parseFloat(document.getElementById('rngEntWall').value);
        var moat = parseFloat(document.getElementById('rngEntMoat').value);
        document.getElementById('lblEntSilicon').textContent = silPct + '%';
        document.getElementById('lblEntWall').textContent = wall + '%';
        document.getElementById('lblEntMoat').textContent = moat + '%';

        // Trust starts at 92; higher silicon share creates friction unless mitigated by clean-room wall & moat
        var friction = (silPct / 100) * (125 - wall * 0.85);
        var trust31 = Math.max(38, Math.min(96, Math.round(92 - friction + (moat - 80) * 0.35)));
        var defection = Math.max(2.0, Math.min(35.0, (100 - trust31) * 0.48 - (moat - 75) * 0.15));

        // Base IP FY31 ~$10.2B mitigated by defection; Silicon scales up to $18B depending on silPct target
        var ip31 = 10.2 * (1 - defection / 160);
        var chip31 = silPct <= 0 ? 0 : (ip31 * (silPct / Math.max(18, 100 - silPct)));
        chip31 = Math.min(18.5, chip31);
        var ebit31 = ip31 * 0.65 + chip31 * 0.31;

        var tArr = [], eArr = [];
        for (var i = 0; i <= 5; i++) {
          var frac = i / 5;
          tArr.push(92 + (trust31 - 92) * frac);
          eArr.push(2.12 + (ebit31 - 2.12) * Math.pow(frac, 1.18));
        }
        entState.trustSeries = tArr;
        entState.ebitSeries = eArr;

        document.getElementById('outTrustScore').textContent = trust31 + ' / 100';
        var rLbl = defection < 9 ? '低 (' : (defection < 18 ? '中 (' : '高 (');
        document.getElementById('outRiscvRisk').textContent = rLbl + defection.toFixed(1) + '%)';
        document.getElementById('outPool2031').textContent = '$' + ebit31.toFixed(1) + 'B';

        var badge = document.getElementById('entVerdictBadge');
        if (trust31 >= 78 && ebit31 >= 9.5) {
          badge.textContent = '双轨黄金均衡态';
          badge.className = 'mui-chip mui-chip-success mono';
        } else if (trust31 < 65) {
          badge.textContent = '警惕生态反噬熵增';
          badge.className = 'mui-chip mui-chip-error mono';
        } else {
          badge.textContent = '温和轻资产守成';
          badge.className = 'mui-chip mui-chip-primary mono';
        }
        drawEntropyCanvas();
      }
      ['rngEntSilicon', 'rngEntWall', 'rngEntMoat'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', runEntropySim);
      });
      var ENT_PRESETS = {
        pure: { s: 0, w: 95, m: 88 },
        haas: { s: 55, w: 88, m: 90 },
        overreach: { s: 75, w: 42, m: 72 }
      };
      var epGrp = document.getElementById('entPresets');
      if (epGrp) {
        epGrp.addEventListener('click', function (e) {
          var b = e.target.closest('[data-ep]');
          if (!b) return;
          var k = b.getAttribute('data-ep');
          var bs = epGrp.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var p = ENT_PRESETS[k] || ENT_PRESETS.haas;
          document.getElementById('rngEntSilicon').value = p.s;
          document.getElementById('rngEntWall').value = p.w;
          document.getElementById('rngEntMoat').value = p.m;
          runEntropySim();
        });
      }

      // Hover Tooltips
      function bindTip(cid) {
        var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
        if (!c || !tip) return;
        c.addEventListener('mousemove', function (ev) {
          var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
          var list = hitRegions[cid] || [], hit = null;
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
      ['eraCanvas', 'genomeCanvas'].forEach(bindTip);

      // 6-Law Audit Persistence
      try {
        var savedAudit = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
        document.querySelectorAll('[data-osaudit]').forEach(function (chk) {
          var k = chk.getAttribute('data-osaudit');
          chk.checked = !!savedAudit[k];
          chk.addEventListener('change', function () {
            savedAudit[k] = chk.checked;
            try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedAudit)); } catch (err) {}
            showToast(chk.checked ? '已确认组织铁律状态' : '已取消标记');
          });
        });
      } catch (e) {}

      // Quick Jump Search (⌘K)
      var QUICK_ITEMS = [
        { id: 'c0-hero', t: 'C0 组织宪章与双拓扑切换沙盘', s: 'Arm 中央 ISA 同盟 vs 传统重资产 IDM 帝国' },
        { id: 'c1-codes', t: 'C1 四大内核代码与研发带宽罗盘', s: '毫瓦节俭 · 单一 ISA 宪政 · CSS 速度 · 8,058 工程师分配' },
        { id: 'c2-eras', t: 'C2 三代治理滑轨与芯片指数曲线', s: 'Saxby 创世 → 软银私有化深潜 → Haas 全栈整芯' },
        { id: 'c3-genome', t: 'C3 半导体基因竞技场与阴阳辩证', s: '84.1% 工程师纯度 × 97.5% 毛利率 vs NVDA/TSMC/INTC' },
        { id: 'c4-entropy', t: 'C4 中立与自研熵增推演器及六大铁律', s: 'FY31 $25B 硅片竞合平衡模拟与文化审计' }
      ];
      var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQuick(q) {
        if (!qPop) return;
        var kw = (q || '').trim().toLowerCase();
        var m = QUICK_ITEMS.filter(function (it) { return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1; });
        qPop.innerHTML = m.map(function (it) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
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
      });

      // Sidebar & Export Controls
      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
      if (sbBtn && sb && bd) {
        sbBtn.addEventListener('click', function () {
          if (window.innerWidth < 1024) {
            var op = sb.classList.toggle('open');
            bd.classList.toggle('open', op);
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

      document.querySelectorAll('[data-portal-theme]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-portal-theme');
          applyTheme(target, false);
          try { localStorage.setItem(STORAGE_THEME_KEY, target); } catch (e) {}
        });
      });

      var expBtn = document.getElementById('exportHtmlBtn');
      if (expBtn) {
        expBtn.addEventListener('click', function () {
          var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
          var a = document.createElement('a');
          a.href = url;
          a.download = 'Arm_企业文化与组织操作系统.html';
          a.click();
          setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
          showToast('已开始下载独立网页：Arm_企业文化与组织操作系统.html');
        });
      }
      var prtBtn = document.getElementById('printPdfBtn');
      if (prtBtn) prtBtn.addEventListener('click', function () { window.print(); });

      window.addEventListener('scroll', function () {
        var bar = document.getElementById('readingProgressBar');
        if (bar) {
          var docH = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
        }
      }, { passive: true });

      function drawAllCharts() {
        drawDialCanvas();
        drawEraCanvas();
        drawGenomeCanvas();
        drawEntropyCanvas();
      }

      try {
        var initT = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
        applyTheme(initT, true);
        var initL = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
        applyLang(initL, true);
      } catch (e) {}

      var themeBtn = document.getElementById('appbarThemeBtn');
      if (themeBtn) {
        themeBtn.addEventListener('click', function () {
          var nxt = state.theme === 'dark' ? 'light' : 'dark';
          applyTheme(nxt, false);
          try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
        });
      }
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
        resizeTimer = setTimeout(drawAllCharts, 90);
      });

      runEntropySim();
      drawAllCharts();
    })();
  