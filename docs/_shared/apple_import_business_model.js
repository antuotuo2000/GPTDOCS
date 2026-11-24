
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_STRESS_KEY = 'aapl_bm_stress_v1';

    var state = {
      theme: 'dark',
      lang: 'zh',
      pView: 'waterfall',
      cView: 'ltv',
      kView: 'shares'
    };

    var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

    function showToast(msg) {
      var bar = document.getElementById('muiSnackbar');
      if (!bar) return;
      bar.textContent = msg;
      bar.classList.add('show');
      clearTimeout(bar._t);
      bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
    }

    function getPalette() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        dark: dark,
        text: dark ? '#F8FAFC' : '#0F172A',
        sub: dark ? '#CBD5E1' : '#334155',
        tick: dark ? '#94A3B8' : '#475569',
        grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
        blue: dark ? '#38BDF8' : '#0073E6',
        blueSoft: dark ? 'rgba(56, 189, 248, 0.24)' : 'rgba(0, 115, 230, 0.16)',
        green: dark ? '#4ADE80' : '#16A34A',
        amber: dark ? '#FBBF24' : '#D97706',
        violet: dark ? '#C4B5FD' : '#7C3AED',
        red: dark ? '#F87171' : '#DC2626'
      };
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
      drawAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? '已切换至深色高对比模式' : '已切换至 MUI 浅色清晰模式');
    }

    function applyLang(lang, silent) {
      state.lang = (lang === 'en') ? 'en' : 'zh';
      document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
      var zhB = document.getElementById('langZhBtn');
      var enB = document.getElementById('langEnBtn');
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

    // 1. Command Deck 3-Lens Switcher
    var LENSES = [
      {
        formula: '单用户全周期毛利 LTV = 首购硬件毛利 ($380+) + ∑ [存续年限 × 多端服务 ARPU × 76.2% 毛利率] - $0 边际获客费',
        body: '传统互联网平台必须每年烧掉数百亿美元买量（CAC）才能维持活跃用户，而苹果每一次卖出 iPhone 或 Mac 都是<strong>“带毛利的逆向获客”</strong>——消费者自己付费跨入围墙花园，一旦绑定 Apple ID、iCloud 照片库与 AirPods/Watch，跨生态迁移摩擦便呈指数级上升。'
      },
      {
        formula: '综合毛利率扩张 (48.8%) = 硬件毛利率 (39.3% × 74.2%权重) + 服务毛利率 (76.2% × 25.8%权重) → 服务占总毛利池达 40.2%',
        body: '服务业务毛利率（76.2%）几乎是硬件业务（39.3%）的两倍。这意味着即使硬件出货量在宏观逆风期仅温和增长，只要 25 亿存量设备上的付费订阅数（>15亿）保持双位数渗透，<strong>全集团毛利率与营业利润率就会呈现结构性上移</strong>。'
      },
      {
        formula: '每股收益增速 (+20.4%) = 净利润增速 (+18.0%) ÷ (1 - 年均回购注销股本率) | 营运资本占用 = -58 天 (上游免息浮存)',
        body: '苹果以约 9 天极速库存周转配合 ~95 天应付账款账期，实现<strong>“先收消费者的钱、3个月后再付供应商货款”</strong>的类保险浮存金机制；叠加仅 1.9% 的极低 CapEx，每年超千亿美元自由现金流近乎 100% 用于回购注销股票与分红。'
      }
    ];
    var lensTabs = document.getElementById('lensTabs');
    if (lensTabs) {
      lensTabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-lens]');
        if (!b) return;
        var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
        var all = lensTabs.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
        document.getElementById('lensFormula').textContent = LENSES[idx].formula;
        document.getElementById('lensBody').innerHTML = LENSES[idx].body;
      });
    }

    // 2. Horizontal 5-Node Value-Chain Pipeline Inspector
    var NODES = [
      {
        badge: 'NODE 01 · APPLE SILICON VERTICAL INTEGRATION',
        title: '自研芯片（A / M / C / S 系列）：把高通与英特尔的利润直接内化为苹果毛利',
        desc: 'Johny Srouji 领衔的硬件技术团队通过统一架构研发 A 系列移动芯片、M 系列桌面芯片与自研连接芯片，彻底剥离了对外购 x86 处理器与高端第三方 SoC 的双重毛利盘剥。在台积电先进制程包下首发产能的同时，统一内存架构（UMA）让端侧 Siri AI 推理无需高昂云端 GPU 资本开支即可在本地高效运行。',
        formula: '商业传导：芯片自研节省 BOM 溢价 + 极致能效比差异化 → 支撑硬件毛利率稳居 39.3% 历史高位（远超安卓阵营 12%–18%）',
        kpis: [['39.3%', 'FY2026 硬件综合毛利率'], ['$45.8B', '年化研发投入全栈摊薄'], ['100%', 'Mac / iPad / iPhone 自研 SoC 覆盖'], ['1.9%', '全集团 CapEx / 营收轻资产比']]
      },
      {
        badge: 'NODE 02 · STAGGERED LAUNCH & DECOY PRICING LADDER',
        title: '错峰旗舰周期与存储阶梯定价：教科书级的消费者剩余提取术',
        desc: '2026 秋季苹果率先发布超高端折叠机 iPhone Duo 与 iPhone 18 Pro / Pro Max，并将标准版延后错峰上市，成功引导核心换机人群向 $1,099–$1,999 价格带迁移。同时，128GB→256GB→1TB 的闪存容量阶梯加价（每级加收 $100–$200，而 NAND 边际成本仅十余美元）贡献了极高的隐性硬件边际毛利。',
        formula: '商业传导：Pro/Fold 首发定锚 + 存储容量阶梯高毛利加价 → 驱动 FY26 iPhone 营收大涨 +21.2% 至 $2,541.0亿',
        kpis: [['$254.1B', 'FY2026 iPhone 净营收 (+21.2%)'], ['53.1%', 'iPhone 占集团总营收比重'], ['>80%', '大容量闪存升级包边际毛利率'], ['540+家', '全球 Apple Store 直营零折扣控价']]
      },
      {
        badge: 'NODE 03 · 6-OS CONTINUITY & SWITCHING-COST MOAT',
        title: '六大操作系统无缝接力：让每一次增购硬件都把围墙筑高一层',
        desc: 'iOS、macOS、iPadOS、watchOS、visionOS 与 tvOS 共享同一套 Apple ID、iCloud 密钥串、通用剪贴板、AirDrop 与查找（Find My）网络。单品的竞争对手或许能在摄像头或屏幕参数上局部追平，但无法复刻跨手机、电脑、手表、耳机的系统级协同体验。',
        formula: '商业传导：单设备满意 → 增购 Watch/AirPods/Mac → 跨系统迁移沉没成本指数级飙升 → 锁定 >92% 换机留存率',
        kpis: [['2.5B+', '全球活跃安装设备底座'], ['6大OS', '端到端封闭软硬协同栈'], ['<2%', '三件套以上家庭用户年流失率'], ['$101.4B', 'Mac + iPad + 穿戴辅件合计年营收']]
      },
      {
        badge: 'NODE 04 · ZERO-CAC DIGITAL TOLLBOOTH',
        title: '服务业务收费站：躺在 25 亿台终端上收“数字商业地产租金”',
        desc: '一旦 25 亿台硬件铺入全球高净值消费者口袋，苹果无需多花一分钱获客广告费，即可在开机向导、系统设置与锁屏界面完成原生触达：从 Safari 默认搜索分成、App Store 内购佣金，到 iCloud+ 容量订阅与 Apple Pay 刷卡分润，构建出年入 $1,233亿、毛利率高达 76.2% 的超级现金牛。',
        formula: '商业传导：25亿终端 × 零获客成本自然转化 → $1,233亿 服务营收 × 76.2% 毛利率 = 贡献集团 $940亿 毛利额（占比 40.2%）',
        kpis: [['$123.3B', 'FY2026 服务业务总营收 (+13%)'], ['76.2%', 'FY2026 服务分部毛利率'], ['1.5B+', '全球活跃付费订阅账户份数'], ['40.2%', '服务对苹果总毛利池贡献度']]
      },
      {
        badge: 'NODE 05 · NEGATIVE WORKING CAPITAL & SHARE CANNIBALIZATION',
        title: '负营运资本浮存金 + 持续注销股本：巴菲特最推崇的资本配置范本',
        desc: '依托直营渠道现款现货与对全球果链约 95 天的应付账期，苹果常年保持约 -58 天的负现金转换周期（CCC），扩张期不仅不垫资反而净吸纳上游现金。管理层拒绝盲目并购扩张，将每年逾千亿美元自由现金流持续用于二级市场回购注销股票，使留存股东在公司中的权益占比每年自动增厚。',
        formula: '商业传导：$1,361亿 FCF (103% 净利转化) → FY26 回购 $864亿 + 分红 → 摊薄 EPS 增速 (+20.4%) 持续跑赢净利润增速 (+18.0%)',
        kpis: [['-58天', '现金转换周期 (上游无息浮存)'], ['$136.1B', 'FY2026 年度自由现金流 (+38%)'], ['-44.8%', 'FY13–FY26 累计注销摊薄股本'], ['$100B', '2026 Q2 董事会新增回购授权']]
      }
    ];
    var pTrack = document.getElementById('pipelineTrack');
    if (pTrack) {
      pTrack.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-node]');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
        var bs = pTrack.querySelectorAll('.bm-node-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
        var nd = NODES[idx];
        document.getElementById('nodeBadge').textContent = nd.badge;
        document.getElementById('nodeTitle').textContent = nd.title;
        document.getElementById('nodeDesc').textContent = nd.desc;
        document.getElementById('nodeFormula').textContent = nd.formula;
        document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
          return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
        }).join('');
      });
    }

    // 3. Services Tier Filter & Peer Table Filter & Cohort Persona Switcher
    var tierFilter = document.getElementById('tierFilter');
    if (tierFilter) {
      tierFilter.addEventListener('click', function (e) {
        var b = e.target.closest('[data-tcat]');
        if (!b) return;
        var cat = b.getAttribute('data-tcat');
        var bs = tierFilter.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var cards = document.querySelectorAll('#tierList [data-tier]');
        for (var j = 0; j < cards.length; j++) {
          var show = (cat === 'all' || cards[j].getAttribute('data-tier') === cat);
          cards[j].style.display = show ? '' : 'none';
          cards[j].style.flex = (cat === 'all') ? '1' : '0 0 auto';
        }
      });
    }

    var COHORTS = {
      solo: {
        stats: [
          ['典型设备组合', '单台标准版 iPhone', '价格敏感度相对较高'],
          ['年均生态退订/流失率', '~11.5%', '换机时存在安卓旗舰分流可能'],
          ['年度服务贡献 ARPU', '$52 / 年', '基础 iCloud 50GB + 少量内购'],
          ['5年累计单客毛利 LTV', '$685', '主要依赖首购与二次换机毛利']
        ],
        note: '<strong>单机入门层特征：</strong>单台 iPhone 用户虽贡献首购硬件毛利（~$340+）与默认搜索价值，但尚未形成跨硬件物理锁定，直营店核心任务是引导其配齐 AirPods 或开通 iCloud+。'
      },
      core: {
        stats: [
          ['典型设备组合', 'iPhone Pro + Watch + AirPods', '配件毛利与换机同步锁定'],
          ['年均生态退订/流失率', '~2.8%', '留存率 >97%（行业极值）'],
          ['年度服务贡献 ARPU', '$168 / 年', 'iCloud+ / Care+ / App 内购'],
          ['5年累计单客毛利 LTV', '$1,640', '约为单机入门户的 2.4 倍']
        ],
        note: '<strong>单向棘轮效应：</strong>配齐 Apple Watch 与 AirPods 后，换机放弃 iPhone 意味着<strong>外设瞬间报废</strong>——硬件辅件反过来成为主机的续费保险单。'
      },
      ultra: {
        stats: [
          ['典型设备组合', 'Duo/Pro + Mac + iPad + Watch', '全场景工作流与家庭相册锁死'],
          ['年均生态退订/流失率', '< 1.2%', '近乎终身年金型现金流客户'],
          ['年度服务贡献 ARPU', '$340+ / 年', 'Apple One Premier + 2TB iCloud'],
          ['5年累计单客毛利 LTV', '$3,480+', '5年服务毛利贡献反超手机毛利']
        ],
        note: '<strong>超级全家桶年金层：</strong>家庭共享（Family Sharing）将全家的相册、订阅与查找网络织成一张熟人关系网，脱离生态等同于“数字搬家”，现金流确定性堪比公用事业。'
      }
    };
    var cohortTabs = document.getElementById('cohortTabs');
    if (cohortTabs) {
      cohortTabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cohort]');
        if (!b) return;
        var key = b.getAttribute('data-cohort');
        var bs = cohortTabs.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var c = COHORTS[key] || COHORTS.core;
        document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
          var isMono = idx > 0 ? ' mono' : '';
          var fz = idx === 0 ? ' style="font-size:0.94rem;"' : '';
          return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
        }).join('');
        document.getElementById('cohortNote').innerHTML = c.note;
      });
    }

    var peerFilter = document.getElementById('peerFilter');
    if (peerFilter) {
      peerFilter.addEventListener('click', function (e) {
        var b = e.target.closest('[data-pcat]');
        if (!b) return;
        var cat = b.getAttribute('data-pcat');
        var bs = peerFilter.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var rows = document.querySelectorAll('#peerTable tbody tr');
        for (var j = 0; j < rows.length; j++) {
          var rc = rows[j].getAttribute('data-row-cat') || '';
          rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
        }
      });
    }

    // 4. High-DPI Retina Custom Canvas Engine + Hover Tooltips
    function prepCanvas(id) {
      var c = document.getElementById(id);
      if (!c) return null;
      var rect = c.getBoundingClientRect();
      var w = Math.max(260, rect.width || 500);
      var h = Math.max(145, rect.height || 280);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
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

    function drawProfitCanvas() {
      var env = prepCanvas('profitCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.profitCanvas = [];
      var pad = { top: 28, right: 20, bottom: 40, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.pView === 'waterfall') {
        var steps = [
          { lbl: '硬件营收', val: 355.5, base: 0, col: pal.blue, tip: 'FY2026 硬件净营收: $355.5B (iPhone $254.1B + Mac $37.9B + 穿戴 $35.6B + iPad $27.9B)' },
          { lbl: '+服务营收', val: 123.3, base: 355.5, col: pal.green, tip: 'FY2026 服务净营收: +$123.3B (+13.0% YoY)，推升总营收至 $478.83B' },
          { lbl: '=总毛利', val: 233.6, base: 0, col: pal.violet, tip: 'FY2026 综合毛利额: $233.6B (综合毛利率 48.8% = 硬件 $139.7B + 服务 $93.9B)' },
          { lbl: '营业利润', val: 158.1, base: 0, col: pal.blue, tip: '扣除研发与 SG&A 费用后营业利润 $158.1B (营业利润率 33.0%)' },
          { lbl: 'GAAP净利', val: 132.2, base: 0, col: pal.amber, tip: 'FY2026 GAAP 净利润: $132.18B (+18.0% YoY)，净利率 27.6%' },
          { lbl: '自由现金流', val: 136.1, base: 0, col: pal.green, tip: 'FY2026 自由现金流: $136.1B (+38% YoY)，FCF/净利转化率高达 103.0% (CapEx 仅 $9.0B)' }
        ];
        var maxV = 520;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxV / 4) * g;
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
        }
        var slotW = pw / steps.length;
        var barW = Math.min(48, slotW * 0.58);
        steps.forEach(function (s, i) {
          var x = pad.left + i * slotW + (slotW - barW) / 2;
          var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
          var yBot = pad.top + ph - (s.base / maxV) * ph;
          var bh = Math.max(4, yBot - yTop);
          ctx.fillStyle = s.col;
          roundRect(ctx, x, yTop, barW, bh, 6);
          ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + s.val.toFixed(1) + 'B', x + barW / 2, yTop - 7);
          ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
          ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
          hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
        });
      } else {
        var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
        var gmSvc = [69.7, 71.7, 70.8, 73.9, 75.1, 76.2];
        var gmTot = [41.8, 43.3, 44.1, 46.2, 46.9, 48.8];
        var gmPrd = [35.3, 36.3, 36.5, 37.2, 37.5, 39.3];
        var minM = 25, maxM = 85;
        for (var m = 0; m <= 4; m++) {
          var mv = minM + ((maxM - minM) / 4) * m;
          var my = pad.top + ph - (m / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
        }
        function plotLine(arr, col, name) {
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / (yrs.length - 1)) * pw;
            var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / (yrs.length - 1)) * pw;
            var py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
            ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
            if (idx === yrs.length - 1 || idx === 0) {
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
              ctx.fillText(v.toFixed(1) + '%', px, py - 9);
            }
            hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
          });
        }
        yrs.forEach(function (y, idx) {
          var px = pad.left + (idx / (yrs.length - 1)) * pw;
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(y, px, pad.top + ph + 20);
        });
        plotLine(gmSvc, pal.green, '服务毛利率 Services GM');
        plotLine(gmTot, pal.violet, '集团综合毛利率 Consolidated GM');
        plotLine(gmPrd, pal.blue, '硬件产品毛利率 Products GM');
      }
    }

    function drawCohortCanvas() {
      var env = prepCanvas('cohortCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.cohortCanvas = [];
      var pad = { top: 28, right: 22, bottom: 40, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.cView === 'ltv') {
        var xLbls = ['首年 Y1', '第2年 Y2', '第3年 Y3', '第4年 Y4', '第5年 Y5'];
        var solo = [365, 405, 445, 635, 685];
        var core = [620, 790, 980, 1420, 1640];
        var ultra = [1280, 1690, 2120, 2960, 3480];
        var maxL = 3800;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxL / 4) * g;
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + gv.toFixed(0), pad.left - 8, gy + 4);
        }
        function drawCurve(arr, col, label) {
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / (xLbls.length - 1)) * pw;
            var py = pad.top + ph - (v / maxL) * ph;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / (xLbls.length - 1)) * pw;
            var py = pad.top + ph - (v / maxL) * ph;
            ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
            if (idx === 4) {
              ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
              ctx.fillText('$' + v, px - 6, py - 8);
            }
            hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '累计毛利 LTV: $' + v });
          });
        }
        xLbls.forEach(function (lb, idx) {
          var px = pad.left + (idx / (xLbls.length - 1)) * pw;
          ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(lb, px, pad.top + ph + 20);
        });
        drawCurve(ultra, pal.violet, '重度全家桶 (5台+)');
        drawCurve(core, pal.blue, '核心生态三件套 (3台)');
        drawCurve(solo, pal.amber, '单机入门户 (1台)');
      } else {
        var vendors = [
          { name: 'Apple (iPhone)', unit: 20.5, prof: 83.0, col: pal.blue },
          { name: 'Samsung', unit: 19.0, prof: 12.5, col: pal.green },
          { name: 'Xiaomi / 其他OEM', unit: 60.5, prof: 4.5, col: pal.amber }
        ];
        var slot = pw / vendors.length;
        for (var k = 0; k <= 4; k++) {
          var kv = k * 25;
          var ky = pad.top + ph - (k / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(kv + '%', pad.left - 8, ky + 4);
        }
        vendors.forEach(function (v, idx) {
          var cx = pad.left + idx * slot + slot / 2;
          var bw = 34;
          var uh = (v.unit / 100) * ph, prh = (v.prof / 100) * ph;
          ctx.fillStyle = pal.blueSoft;
          roundRect(ctx, cx - bw - 4, pad.top + ph - uh, bw, uh, 5); ctx.fill();
          ctx.fillStyle = v.col;
          roundRect(ctx, cx + 4, pad.top + ph - prh, bw, prh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(v.unit + '%', cx - bw / 2 - 4, pad.top + ph - uh - 6);
          ctx.fillText(v.prof + '%', cx + bw / 2 + 4, pad.top + ph - prh - 6);
          ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
          ctx.fillText(v.name, cx, pad.top + ph + 20);
          hitRegions.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: v.name, body: '全球销量份额 ~' + v.unit + '% vs 全球营业利润池占比 ~' + v.prof + '%' });
        });
      }
    }

    function drawCapitalCanvas() {
      var env = prepCanvas('capitalCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.capitalCanvas = [];
      var pad = { top: 28, right: 20, bottom: 40, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.kView === 'shares') {
        var yrs = ['FY13', 'FY15', 'FY17', 'FY19', 'FY21', 'FY23', 'FY25', 'FY26'];
        var sh = [26.3, 23.2, 20.8, 18.4, 16.9, 15.8, 14.9, 14.53];
        var maxS = 28;
        for (var g = 0; g <= 4; g++) {
          var sv = (maxS / 4) * g;
          var sy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(sv.toFixed(0) + 'B', pad.left - 8, sy + 4);
        }
        var slot = pw / yrs.length, bw = Math.min(36, slot * 0.56);
        yrs.forEach(function (y, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (sh[i] / maxS) * ph;
          var yTop = pad.top + ph - bh;
          ctx.fillStyle = (i === yrs.length - 1) ? pal.green : pal.blue;
          roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(sh[i].toFixed(1) + 'B', x + bw / 2, yTop - 6);
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
          ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
          hitRegions.capitalCanvas.push({ x: x, y: yTop, w: bw, h: bh, title: y + ' 拆股调整后摊薄股本', body: sh[i].toFixed(2) + 'B 股（较 FY13 累计缩减 ' + ((1 - sh[i] / 26.3) * 100).toFixed(1) + '%）' });
        });
      } else {
        var items = [
          { name: 'Apple (AAPL)', ccc: -58, col: pal.green, tip: 'DIO ~9天 + DSO ~28天 - DPO ~95天 = -58天（上游供应商免息浮存金）' },
          { name: 'Costco (COST)', ccc: -4, col: pal.blue, tip: '快周转零售标杆：库存未付账款即已完成终端现款销售' },
          { name: 'Samsung 电子', ccc: 72, col: pal.amber, tip: '重晶圆与面板制造库存，需垫付大量营运资金' },
          { name: 'NVIDIA (NVDA)', ccc: 85, col: pal.violet, tip: '高速扩张期需预付台积电 CoWoS 与 HBM 存储产能账款' }
        ];
        var zeroX = pad.left + pw * 0.44;
        ctx.strokeStyle = pal.sub; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(zeroX, pad.top); ctx.lineTo(zeroX, pad.top + ph); ctx.stroke();
        var rowH = ph / items.length;
        items.forEach(function (it, idx) {
          var cy = pad.top + idx * rowH + rowH / 2;
          var bh = 24;
          var scale = (pw * 0.48) / 100;
          var barLen = Math.abs(it.ccc) * scale;
          var bx = it.ccc < 0 ? (zeroX - barLen) : zeroX;
          ctx.fillStyle = it.col;
          roundRect(ctx, bx, cy - bh / 2, barLen, bh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
          ctx.textAlign = it.ccc < 0 ? 'right' : 'left';
          ctx.fillText((it.ccc > 0 ? '+' : '') + it.ccc + ' 天', it.ccc < 0 ? bx - 6 : bx + barLen + 6, cy + 4);
          ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
          ctx.fillText(it.name, pad.left, cy - 16);
          hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 20, w: pw, h: 40, title: it.name + ' 现金转换周期', body: it.tip });
        });
      }
    }

    // 5. Interactive 5-Year EPS & Margin Simulator
    var simData = { eps: [8.98, 9.9, 10.9, 12.1, 13.3, 14.7], rev: [478.8, 515, 554, 596, 640, 686] };
    function drawSimMiniCanvas() {
      var env = prepCanvas('simMiniCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var pad = { top: 24, right: 20, bottom: 26, left: 46 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
      var arr = simData.eps;
      var maxE = Math.max(18, Math.ceil(Math.max.apply(null, arr) * 1.15));
      for (var g = 0; g <= 2; g++) {
        var gy = pad.top + ph - (g / 2) * ph;
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
        ctx.fillText('$' + Math.round((maxE / 2) * g), pad.left - 6, gy + 3);
      }
      ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
      arr.forEach(function (v, i) {
        var px = pad.left + (i / 5) * pw;
        var py = pad.top + ph - (v / maxE) * ph;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      arr.forEach(function (v, i) {
        var px = pad.left + (i / 5) * pw;
        var py = pad.top + ph - (v / maxE) * ph;
        ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + v.toFixed(2), px, py - 8);
        ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
        ctx.fillText(yrs[i], px, pad.top + ph + 16);
      });
    }

    function runSimulator() {
      var gS = parseFloat(document.getElementById('inpSvcCagr').value) / 100;
      var gP = parseFloat(document.getElementById('inpProdCagr').value) / 100;
      var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
      document.getElementById('lblSvcCagr').textContent = (gS * 100).toFixed(1) + '%';
      document.getElementById('lblProdCagr').textContent = (gP * 100).toFixed(1) + '%';
      document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

      var prod = 355.54, svc = 123.30, shares = 14.53;
      var baseGp = prod * 0.393 + svc * 0.762;
      var epsArr = [8.98], revArr = [478.83];
      for (var y = 1; y <= 5; y++) {
        prod *= (1 + gP);
        svc *= (1 + gS);
        shares *= (1 - buy);
        var gp = prod * 0.393 + svc * 0.765;
        var netInc = 132.18 * (gp / baseGp);
        epsArr.push(netInc / shares);
        revArr.push(prod + svc);
      }
      var fy31Rev = prod + svc;
      var fy31Gm = ((prod * 0.393 + svc * 0.765) / fy31Rev) * 100;
      var fy31Eps = epsArr[5];
      var epsCagr = (Math.pow(fy31Eps / 8.98, 0.2) - 1) * 100;

      document.getElementById('simRevOut').textContent = '$' + Math.round(fy31Rev) + 'B';
      document.getElementById('simGmOut').textContent = fy31Gm.toFixed(1) + '%';
      document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
      document.getElementById('simCagrOut').textContent = (epsCagr >= 0 ? '+' : '') + epsCagr.toFixed(1) + '%';
      simData.eps = epsArr;
      simData.rev = revArr;
      drawSimMiniCanvas();
    }

    ['inpSvcCagr', 'inpProdCagr', 'inpBuyRate'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', runSimulator);
    });

    var PRESETS = {
      bear: { s: 7.5, p: 1.5, b: 1.8 },
      base: { s: 12.5, p: 5.5, b: 2.4 },
      bull: { s: 15.5, p: 8.5, b: 3.0 }
    };
    var simPresets = document.getElementById('simPresets');
    if (simPresets) {
      simPresets.addEventListener('click', function (e) {
        var b = e.target.closest('[data-preset]');
        if (!b) return;
        var k = b.getAttribute('data-preset');
        var bs = simPresets.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var pr = PRESETS[k] || PRESETS.base;
        document.getElementById('inpSvcCagr').value = pr.s;
        document.getElementById('inpProdCagr').value = pr.p;
        document.getElementById('inpBuyRate').value = pr.b;
        runSimulator();
      });
    }

    function bindChartTab(groupId, attr, stateKey, drawFn) {
      var g = document.getElementById(groupId);
      if (!g) return;
      g.addEventListener('click', function (e) {
        var b = e.target.closest('[' + attr + ']');
        if (!b) return;
        state[stateKey] = b.getAttribute(attr);
        var bs = g.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        drawFn();
      });
    }
    bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
    bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
    bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

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
          tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
          tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
        } else {
          tip.style.display = 'none';
        }
      });
      c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
    }
    ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

    function drawAllCharts() {
      drawProfitCanvas();
      drawCohortCanvas();
      drawCapitalCanvas();
      drawSimMiniCanvas();
    }

    // Quick Jump Search (⌘K)
    var QUICK_ITEMS = [
      { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$478.83B 营收 · 48.8% 毛利率 · 负获客成本漏斗' },
      { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '自研芯片 → 错峰定价 → 6大OS锁死 → 服务税 → 缩股' },
      { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与服务拆解', s: '$123.3B 服务营收 · 76.2% 毛利率 · 贡献 40.2% 毛利' },
      { id: 'mod-cohort', t: 'M3 多设备棘轮效应与单客 LTV', s: '1台 vs 3台 vs 5台全家桶留存率与 83% 手机利润份额' },
      { id: 'mod-capital', t: 'M4 -58天负营运资本与缩股推演器', s: '13年注销 44.8% 股本 · 5年 EPS 复利交互模拟' },
      { id: 'mod-matrix', t: 'M5 六大科技巨头商业范式对标与压测', s: 'AAPL vs MSFT / GOOGL / NVDA / COST / Samsung' }
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
    });

    // Scroll Progress & Active TOC
    var tocLinks = document.querySelectorAll('#tocList .mui-nav-link');
    window.addEventListener('scroll', function () {
      var bar = document.getElementById('readingProgressBar');
      if (bar) {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
      }
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            for (var i = 0; i < tocLinks.length; i++) {
              tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === id);
            }
          }
        });
      }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
      ['mod-deck', 'mod-pipeline', 'mod-profit-pool', 'mod-cohort', 'mod-capital', 'mod-matrix'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }

    try {
      var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
      document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
        var k = chk.getAttribute('data-stress-chk');
        chk.checked = !!savedChk[k];
        chk.addEventListener('change', function () {
          savedChk[k] = chk.checked;
          try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
          showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
        });
      });
    } catch (e) {}

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
    function scheduleDraw() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawAllCharts, 60);
    }
    window.addEventListener('resize', scheduleDraw);
    if ('ResizeObserver' in window) {
      var ws = document.querySelector('.bm-workspace');
      if (ws) new ResizeObserver(scheduleDraw).observe(ws);
    }

    runSimulator();
    drawAllCharts();
  })();
  