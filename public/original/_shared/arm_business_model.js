
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
      var STORAGE_STRESS_KEY = 'arm_bm_stress_v1';

      var state = {
        theme: 'dark',
        lang: 'zh',
        pView: 'waterfall',
        cView: 'ladder',
        kView: 'acv'
      };

      var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

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

      // Suite Hub Category Filter & Sibling Toast
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

      // M0: 3-Lens Formula Switcher
      var LENSES = [
        {
          formula: '单代架构全周期价值 = ∑(N家伙伴前置授权费 ≥ 研发总成本 $2.78B) + ∑[未来10–20年 × 年出货400亿颗 × ASP × 版税率(98%毛利)]',
          body: '单家芯片厂商自研一套先进 CPU 微架构需耗资数亿美元且仅能自用；Arm 将同一套研发成果同时授权给数十家芯片厂，<strong>仅靠前置授权费（FY26 $23.1亿）即覆盖绝大部分 Non-GAAP 研发支出（$19.1亿）</strong>，随后长达十余年流淌的版税收入（约 50% 当前版税来自 10 年前发布的产品）几乎纯属高毛利复利年金。'
        },
        {
          formula: '单颗芯片收入阶梯：Armv8 (~2%–2.5% ASP) → Armv9 (~4%–5% ASP) → CSS 子系统 (~8%–10% ASP) → AGI CPU 整芯 ($数千/颗)',
          body: '过去市场担忧全球智能手机年出货量见顶（~12亿部）会锁死 Arm 增长；实际上 FY25 手机出货增幅不足 2%，Arm 手机版税却大涨 <strong>~30%</strong>——因为大客户正从买单核 RTL 升级至预验证的 <strong>Lumex / Neoverse CSS 子系统</strong>，并向首款自研 136 核 AGI CPU 整芯跃迁。'
        },
        {
          formula: '迁移壁垒成本 = 重写全球 3,000万+ 开发者底层编译工具链 + 放弃 >3,500亿颗存量设备二进制兼容性 → 生态替换率 ≈ 0%',
          body: '硬件指令集（ISA）真正的护城河不在硅片而在软件栈：从 iOS、Android、Linux 内核到 AWS 云原生容器与 KleidiAI 端侧大模型算子库，人类过去 35 年积累的移动与边缘软件资产全部构建在 Arm 指令集之上，形成了比芯片电路深厚百倍的双边网络效应。'
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

      // M1: 5-Node Value-Chain Pipeline Inspector
      var NODES = [
        {
          badge: 'NODE 01 · ARMV9 ARCHITECTURE & R&D ENGINE',
          title: 'Armv9 指令集（ISA）：用占营收 56.4% 的超高强度研发构筑全行业计算母语',
          desc: '首席架构师 Richard Grisenthwaite 团队统筹 Armv9 演进，原生植入机密计算领域（Confidential Compute Architecture）与可扩展矩阵扩展（SME2）。由于全球逾 3,000 万软件开发者的操作系统内核、编译器与 AI 推理库（KleidiAI）均针对 Arm 指令集深度优化，任何芯片厂脱离该标准即面临软件生态归零风险。',
          formula: '商业传导：8,058 名工程师（占全员 84.1%）持续迭代 ISA → Armv9 单芯片版税率较前代 Armv8 跃升约 2 倍',
          kpis: [['$2,776M', 'FY2026 GAAP 研发总投入 (+34%)'], ['84.1%', '工程师占总员工 (9,584人) 比例'], ['~2.0x', 'Armv9 相对 Armv8 版税率倍数'], ['30M+', '全球原生 Arm 软件开发者规模']]
        },
        {
          badge: 'NODE 02 · ATA & AFA SUBSCRIPTION LICENSING FUNNEL',
          title: '双轨订阅漏斗（ATA + AFA）：把脉冲式专利谈判变成可预测的 SaaS 合同池',
          desc: '过去芯片公司每立项一颗芯片才签一次单项授权（TLA），导致季度收入剧烈波动。Rene Haas 推行订阅制改革：底层用 Arm Flexible Access（329 家客户）让初创公司先免费探索设计、流片才付费；顶层用 Arm Total Access（56 家大客户，覆盖超半数 Top 30 伙伴）按年打包解锁全系前沿 IP。',
          formula: '商业传导：329 家 AFA 孵化漏斗 + 56 家 ATA 旗舰订阅 → 推升年化合同价值 ACV 达 $17.32亿（FY26 授权营收 $23.07亿）',
          kpis: [['$2,307M', 'FY2026 授权及其他收入 (+25%)'], ['$1,732M', 'Q1 FY27 年化合同价值 (ACV)'], ['56 家', 'Arm Total Access 旗舰订阅客户'], ['329 家', 'Arm Flexible Access 创新客户']]
        },
        {
          badge: 'NODE 03 · COMPUTE SUBSYSTEMS (CSS) VALUE MULTIPLIER',
          title: 'CSS 计算子系统：替客户省去一年后端验证苦活，换取双倍单芯版税率',
          desc: '面对 3nm/2nm 动辄上百核互联与缓存一致性验证难题，Arm 推出预集成、预验证的 Neoverse CSS（数据中心）、Lumex / Mobile CSS 2（旗舰手机，前四大安卓品牌均已量产）与 Zena CSS（L4 智驾汽车，缩短 12 个月流片时间），并在 2025 年 8 月剥离低毛利 Artisan 基础物理 IP 聚焦高附加值计算平台。',
          formula: '商业传导：交付完整计算子系统（乃至 GDSII 物理实现）→ 累计签约 23 项 CSS 授权 → 单芯片版税率较标准 Armv9 再翻一倍',
          kpis: [['23 项', '截至 FY26 末累计签约 CSS 授权'], ['~2.0x', 'CSS 相对标准 Armv9 版税倍数'], ['-12 个月', 'Zena CSS 缩短车规芯片研发周期'], ['+70%', 'Mobile CSS 2 提升端侧代理 AI 性能']]
        },
        {
          badge: 'NODE 04 · 350B+ CUMULATIVE CHIP ROYALTY ANNUITY',
          title: '3,500亿+ 存量硅片税基：每季度超 100 亿颗芯片出厂自动汇入版税现金流',
          desc: '从一颗售价 $0.50 的智能水表 Cortex-M 微控制器，到一颗价值数千美元的 NVIDIA Grace Blackwell / AWS Graviton4 云端超算处理器，合作伙伴晶圆厂每出货一颗芯片，Arm 即按约定费率计提版税。Q2 FY27 单季伙伴报告出货芯片首次突破 100 亿颗大关。',
          formula: '商业传导：Q2 FY27 单季 >100亿颗出货 × 架构升级溢价 → FY26 版税收入 $26.13亿（97.5% 毛利率，半数源自 10 年前长尾老品）',
          kpis: [['350B+', '1990 至今累计出货 Arm 芯片总数'], ['>10B / 季', 'Q2 FY27 单季芯片出货首破百亿颗'], ['50%', '源自发布 ≥10 年老产品的稳态版税'], ['>2.0x YoY', 'FY26Q4 & FY27Q1 数据中心版税增速']]
        },
        {
          badge: 'NODE 05 · ARM AGI CPU FULL-SILICON CAPTURE',
          title: '首款自研量产芯片 Arm AGI CPU：从抽几个点版税跃升至捕获 100% 芯片售价',
          desc: '2026 年 3 月 Arm 宣布公司 36 年历史上最大战略跨越——携手首席联合开发伙伴 Meta 推出自研量产服务器处理器 Arm AGI CPU（台积电 3nm N3P 双芯粒、最高 136 颗 Neoverse V3 核心、300W TDP），单机架性能达 x86 两倍以上，每吉瓦（GW）AI 数据中心可节省最高 $100亿 CapEx。',
          formula: '商业传导：IP → CSS → 量产硅片三级跳 → FY27–FY28 客户订单需求已超 $20亿，官方锚定 FY2031 贡献 ~$150亿 芯片营收',
          kpis: [['136 核', 'TSMC N3P 双芯粒 Neoverse V3 架构'], ['>$2.0B', 'FY27–FY28 已锁定客户需求规模'], ['~$15.0B', 'FY2031 官方自研硅片年营收目标'], ['-$10B / GW', '单吉瓦 AI 数据中心机架级 CapEx 节省']]
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

      // M2B: Tier Filter
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
            cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
          }
        });
      }

      // M3A: Customer Cohort Ratchet Switcher
      var COHORTS = {
        rtl: {
          stats: [
            ['代表客群与场景', '通用 IoT / 消费电子 / 传统 MCU 厂商', '采购单颗 Cortex-M / Cortex-A RTL 核'],
            ['客户自主集成工作量', '18–24 个月完整流片', '客户需自建总线、存储控制与物理后端'],
            ['隐含单芯片版税率区间', '~1.5% – 4.5% ASP', 'Armv8 约 2%–2.5%，标准 Armv9 约 4%–5%'],
            ['长尾生命周期', '10 – 20+ 年持续出货', '一旦嵌入工业/家电固件几乎永不更换']
          ],
          note: '<strong>经典 RTL 核授权层：</strong>这是 Arm 过去三十年的立身之本——客户自由组合单核 IP 并自行完成 SoC 集成，虽然单颗芯片版税绝对值较低，但造就了逾 3,500 亿颗无处不在的生态底座。'
        },
        css: {
          stats: [
            ['代表客群与平台', '前四大安卓旗舰厂 / AWS / 车企', 'Neoverse / Lumex / Zena CSS'],
            ['帮客户节省流片周期', '缩短 9–12 个月', '大幅省去客户稀缺后端工程人力'],
            ['隐含单芯片版税率区间', '~8% – 10% ASP', '约为 Armv8 (~2.5%) 的 3–4 倍'],
            ['跨代架构留存率', '> 98%', '总线/安全岛与编译工具链深度焊死']
          ],
          note: '<strong>双向锁定棘轮（Two-Sided Lock-In）：</strong>随着 3nm/2nm 芯片单次流片研发成本飙升至 $5亿 以上，手机大厂、车企与云厂商越来越不愿把工程师耗费在通用 CPU 集群互联与验证上，主动采购 Arm 预验证的 <strong>CSS 计算子系统</strong>——客户省下了 1 年研发时间，而 Arm 则永久锁住了翻倍的芯片全周期版税率。'
        },
        hyp: {
          stats: [
            ['代表客群与平台', 'Meta / OpenAI / 云厂商 / Supermicro', 'Arm AGI CPU 整芯 & 定制芯粒 (Chiplets)'],
            ['交付产品形态', 'TSMC 3nm N3P 量产芯片', '最高 136 核双芯粒，开箱即插即用上机架'],
            ['单颗硅片价值捕获量级', '数千美元 / 颗整芯收入', '较传统单颗服务器芯片几十美元版税放大数十倍'],
            ['目标 Non-GAAP 营业利润率', '30%+ (官方指引)', '毛利率虽低于纯 IP，但绝对利润池与 EPS 爆发式扩容']
          ],
          note: '<strong>云端超算整芯跃迁层：</strong>在 Agentic AI 时代，每个智能体后台持续调度使每吉瓦数据中心 CPU 需求激增 4 倍以上；对于希望绕过漫长自研周期直接大规模部署高能效机柜的 AI 巨头（如 Meta、OpenAI、Cloudflare），Arm 直接交付成品 AGI CPU 成为最快路径。'
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
          var c = COHORTS[key] || COHORTS.css;
          document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
            var isMono = idx > 0 ? ' mono' : '';
            var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
            return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
          }).join('');
          document.getElementById('cohortNote').innerHTML = c.note;
        });
      }

      // M5: Peer Table Filter
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

      // High-DPI Retina Canvas Engine
      function prepCanvas(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(260, rect.width || 500);
        var h = Math.max(140, rect.height || 280);
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
        var pad = { top: 28, right: 20, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.pView === 'waterfall') {
          var steps = [
            { lbl: '版税收入', val: 2.61, base: 0, col: pal.blue, tip: 'FY2026 版税收入: $2,613M (+21% YoY)，占总营收 53.1%' },
            { lbl: '+授权收入', val: 2.31, base: 2.61, col: pal.green, tip: 'FY2026 授权及其他收入: +$2,307M (+25% YoY)，推升总营收至创纪录 $4,920M' },
            { lbl: '=GAAP毛利', val: 4.80, base: 0, col: pal.violet, tip: 'FY2026 GAAP 毛利: $4,799M（销售成本仅 $121M，毛利率高达 97.5%！）' },
            { lbl: 'Non-GAAP研发', val: 1.91, base: 0, col: pal.amber, tip: 'Non-GAAP 研发投入 $1,911M（GAAP 含股权激励为 $2,776M，占营收 56.4%）' },
            { lbl: 'Non-GAAP营业利', val: 2.12, base: 0, col: pal.blue, tip: 'FY2026 Non-GAAP 营业利润: $2,115M（营业利润率 43.0%；GAAP 营业利润 $900M）' },
            { lbl: 'Non-GAAP净利', val: 1.89, base: 0, col: pal.green, tip: 'FY2026 Non-GAAP 净利润: $1,889M（摊薄 EPS $1.77；经营现金流 $1,524M）' }
          ];
          var maxV = 5.5;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxV / 4) * g;
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
          }
          var slotW = pw / steps.length;
          var barW = Math.min(46, slotW * 0.58);
          steps.forEach(function (s, i) {
            var x = pad.left + i * slotW + (slotW - barW) / 2;
            var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
            var yBot = pad.top + ph - (s.base / maxV) * ph;
            var bh = Math.max(5, yBot - yTop);
            ctx.fillStyle = s.col;
            roundRect(ctx, x, yTop, barW, bh, 6);
            ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + s.val.toFixed(2) + 'B', x + barW / 2, yTop - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
            hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
          });
        } else {
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26', 'TTM(Q2FY27)'];
          var tot = [2.03, 2.70, 2.68, 3.23, 4.01, 4.92, 5.47];
          var roy = [1.36, 1.56, 1.68, 1.80, 2.17, 2.61, 2.79];
          var lic = [0.67, 1.14, 1.00, 1.43, 1.84, 2.31, 2.68];
          var maxR = 6.0;
          for (var m = 0; m <= 4; m++) {
            var mv = (maxR / 4) * m;
            var my = pad.top + ph - (m / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + mv.toFixed(1) + 'B', pad.left - 8, my + 4);
          }
          var sW = pw / yrs.length, bW = Math.min(38, sW * 0.56);
          yrs.forEach(function (y, idx) {
            var x = pad.left + idx * sW + (sW - bW) / 2;
            var rH = (roy[idx] / maxR) * ph;
            var lH = (lic[idx] / maxR) * ph;
            var yRoy = pad.top + ph - rH;
            var yLic = yRoy - lH;
            ctx.fillStyle = pal.blue;
            roundRect(ctx, x, yRoy, bW, rH, 4); ctx.fill();
            ctx.fillStyle = pal.green;
            roundRect(ctx, x, yLic, bW, lH, 4); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + tot[idx].toFixed(2) + 'B', x + bW / 2, yLic - 6);
            ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
            ctx.fillText(y, x + bW / 2, pad.top + ph + 20);
            hitRegions.profitCanvas.push({
              x: x, y: yLic, w: bW, h: rH + lH,
              title: y + ' 营收拆解 ($' + tot[idx].toFixed(2) + 'B)',
              body: '版税收入 $' + roy[idx].toFixed(2) + 'B + 授权收入 $' + lic[idx].toFixed(2) + 'B'
            });
          });
        }
      }

      function drawCohortCanvas() {
        var env = prepCanvas('cohortCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.cohortCanvas = [];
        var pad = { top: 28, right: 22, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.cView === 'ladder') {
          var rungs = [
            { name: '经典 Armv7/M', rate: 1.5, col: pal.amber, tip: '传统 32 位与基础嵌入式芯片：典型版税率约 1%–2% ASP' },
            { name: '主流 Armv8', rate: 2.5, col: pal.blue, tip: '64 位普及代际：智能手机与早期云芯片典型版税率约 ~2.5% ASP' },
            { name: '前沿 Armv9', rate: 5.0, col: pal.violet, tip: '集成机密计算与矩阵 AI 指令：单芯片版税率约为 Armv8 的 2 倍 (~5% ASP)' },
            { name: 'CSS 计算子系统', rate: 10.0, col: pal.green, tip: 'Neoverse / Lumex / Zena CSS 预验证子系统：版税率较标准 Armv9 再翻倍 (~10% ASP)' }
          ];
          var maxRt = 12.0;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxRt / 4) * g;
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(gv.toFixed(0) + '%', pad.left - 8, gy + 4);
          }
          var slot = pw / rungs.length, bw = Math.min(54, slot * 0.54);
          rungs.forEach(function (r, idx) {
            var x = pad.left + idx * slot + (slot - bw) / 2;
            var bh = (r.rate / maxRt) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = r.col;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('~' + r.rate.toFixed(1) + '%', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
            ctx.fillText(r.name, x + bw / 2, pad.top + ph + 20);
            hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: r.name, body: r.tip });
          });
        } else {
          var segs = [
            { name: '智能手机 AP', oldS: 99.0, newS: 99.5, tip: '移动应用处理器常年维持 >99% 绝对垄断份额（iOS + Android 全覆盖）' },
            { name: '头部云厂 CPU', oldS: 15.0, newS: 50.0, tip: 'AWS Graviton / Google Axion / Azure Cobalt / NVIDIA Grace 推动头部超算云份额从 CY24 ~15% 跃升至 FY26Q4 ~50%' },
            { name: '车载与机器人', oldS: 36.0, newS: 44.0, tip: 'FY22 (36%) → FY25 (44%)，ADAS 与智能座舱推动 Physical AI 版税同比高增 +50%' },
            { name: '全球 PC 出货', oldS: 9.0, newS: 20.0, tip: 'Apple M 系列 + Snapdragon X + Googlebook + NVIDIA RTX Spark 推动 Arm PC 达全球出货约 ~20%' }
          ];
          var slotS = pw / segs.length;
          for (var k = 0; k <= 4; k++) {
            var kv = k * 25, ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(kv + '%', pad.left - 8, ky + 4);
          }
          segs.forEach(function (v, idx) {
            var cx = pad.left + idx * slotS + slotS / 2;
            var bw2 = 28;
            var h1 = (v.oldS / 100) * ph, h2 = (v.newS / 100) * ph;
            ctx.fillStyle = pal.blueSoft;
            roundRect(ctx, cx - bw2 - 3, pad.top + ph - h1, bw2, h1, 5); ctx.fill();
            ctx.fillStyle = idx === 1 ? pal.green : pal.blue;
            roundRect(ctx, cx + 3, pad.top + ph - h2, bw2, h2, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(v.oldS.toFixed(0) + '%', cx - bw2 / 2 - 3, pad.top + ph - h1 - 5);
            ctx.fillText(v.newS.toFixed(0) + '%', cx + bw2 / 2 + 3, pad.top + ph - h2 - 5);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(v.name, cx, pad.top + ph + 20);
            hitRegions.cohortCanvas.push({ x: cx - bw2 - 5, y: pad.top, w: bw2 * 2 + 10, h: ph, title: v.name + ' 市场份额跃升', body: v.tip });
          });
        }
      }

      function drawCapitalCanvas() {
        var env = prepCanvas('capitalCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.capitalCanvas = [];
        var pad = { top: 28, right: 20, bottom: 42, left: 56 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.kView === 'acv') {
          var qtrs = ['Q4 FY24', 'Q2 FY25', 'Q4 FY25', 'Q2 FY26', 'Q4 FY26', 'Q1 FY27'];
          var acv = [1182, 1253, 1365, 1528, 1660, 1732];
          var maxA = 2000;
          for (var g = 0; g <= 4; g++) {
            var av = (maxA / 4) * g, ay = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ay); ctx.lineTo(pad.left + pw, ay); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + av.toFixed(0) + 'M', pad.left - 8, ay + 4);
          }
          var slot = pw / qtrs.length, bw = Math.min(40, slot * 0.56);
          qtrs.forEach(function (q, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (acv[i] / maxA) * ph, yTop = pad.top + ph - bh;
            ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
            roundRect(ctx, x, yTop, bw, bh, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + acv[i] + 'M', x + bw / 2, yTop - 6);
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
            ctx.fillText(q, x + bw / 2, pad.top + ph + 20);
            hitRegions.capitalCanvas.push({ x: x, y: yTop, w: bw, h: bh, title: q + ' 年化合同价值 (ACV)', body: '活跃授权合同年化承诺费达 $' + acv[i] + 'M（不含未来芯片出货版税弹性）' });
          });
        } else {
          var vintages = [
            { name: '发布 ≥10 年经典架构长尾版税', pct: 50, col: pal.green, tip: '工业/车载/IoT/家电长生命周期芯片贡献约 50% 当期版税现金流，零新增研发维护成本' },
            { name: '发布 5–10 年成熟期 Armv8 芯片', pct: 24, col: pal.blue, tip: '主流中端手机、消费电子与网络设备稳定出货贡献约 24% 版税' },
            { name: '近 5 年新一代 Armv9 与 CSS 平台', pct: 26, col: pal.violet, tip: '旗舰手机、云端 Neoverse CSS 与智驾芯片贡献最快边际增速，单颗费率高出 2–4 倍' }
          ];
          var rowH = ph / vintages.length;
          vintages.forEach(function (it, idx) {
            var cy = pad.top + idx * rowH + rowH / 2;
            var bh = 26, barLen = (it.pct / 65) * (pw - 55);
            ctx.fillStyle = it.col;
            roundRect(ctx, pad.left, cy - bh / 2 + 6, barLen, bh, 6); ctx.fill();
            ctx.fillStyle = pal.sub; ctx.font = 'bold 11.5px sans-serif'; ctx.textAlign = 'left';
            ctx.fillText(it.name, pad.left, cy - 12);
            ctx.fillStyle = pal.text; ctx.font = 'bold 11.5px "IBM Plex Mono", monospace';
            ctx.fillText('~' + it.pct + '% 占比', pad.left + barLen + 8, cy + 11);
            hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 22, w: pw, h: 44, title: it.name, body: it.tip });
          });
        }
      }

      // M4B: Interactive 5-Year EPS & Revenue Compounder (FY26 -> FY31E)
      var simData = { eps: [1.77, 2.30, 3.25, 4.35, 5.45, 6.58] };
      function drawSimMiniCanvas() {
        var env = prepCanvas('simMiniCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 22, right: 18, bottom: 26, left: 44 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
        var arr = simData.eps;
        var maxE = Math.max(4, Math.ceil(Math.max.apply(null, arr) * 1.18));
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
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
        var gRoy = parseFloat(document.getElementById('inpRoyCagr').value) / 100;
        var gLic = parseFloat(document.getElementById('inpLicCagr').value) / 100;
        var chip31 = parseFloat(document.getElementById('inpChipRev').value);
        document.getElementById('lblRoyCagr').textContent = (gRoy * 100).toFixed(1) + '%';
        document.getElementById('lblLicCagr').textContent = (gLic * 100).toFixed(1) + '%';
        document.getElementById('lblChipRev').textContent = '$' + chip31.toFixed(1) + 'B';

        // FY26 base: Royalty $2.613B, License $2.307B, Shares ~1.08B diluted by FY31
        var roy = 2.613, lic = 2.307;
        var chipRamp = [0, 0.35, 1.4, 3.4, 5.8, 1.0]; // normalized ramp weights if chip31 > 0
        var epsArr = [1.77];
        var fy31Rev = 0, fy31Ebit = 0;
        for (var y = 1; y <= 5; y++) {
          roy *= (1 + gRoy);
          lic *= (1 + gLic);
          var cRev = (y === 5) ? chip31 : chip31 * (chipRamp[y] / 8.5) * 0.9;
          var ipRev = roy + lic;
          // IP/CSS scales toward 64% Non-GAAP EBIT margin as OpEx decelerates to mid-teens; AGI CPU at 31% Non-GAAP EBIT margin
          var ipEbitMargin = 0.43 + (y / 5) * 0.21;
          var ebit = ipRev * ipEbitMargin + cRev * 0.31;
          var netAfterTax = ebit * 0.85;
          var sh = 1.068 + y * 0.006;
          epsArr.push(netAfterTax / sh);
          if (y === 5) {
            fy31Rev = ipRev + cRev;
            fy31Ebit = ebit;
          }
        }
        var fy31EbitPct = fy31Rev > 0 ? (fy31Ebit / fy31Rev) * 100 : 0;
        var fy31Eps = epsArr[5];
        var epsCagr = (Math.pow(fy31Eps / 1.77, 0.2) - 1) * 100;

        document.getElementById('simRevOut').textContent = '$' + fy31Rev.toFixed(1) + 'B';
        document.getElementById('simEbitOut').textContent = fy31EbitPct.toFixed(1) + '%';
        document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
        document.getElementById('simCagrOut').textContent = (epsCagr >= 0 ? '+' : '') + epsCagr.toFixed(1) + '%';
        simData.eps = epsArr;
        drawSimMiniCanvas();
      }

      ['inpRoyCagr', 'inpLicCagr', 'inpChipRev'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', runSimulator);
      });

      var PRESETS = {
        bear: { r: 12.0, l: 6.5, c: 2.0 },
        base: { r: 18.0, l: 10.0, c: 8.5 },
        bull: { r: 20.5, l: 11.5, c: 15.0 }
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
          document.getElementById('inpRoyCagr').value = pr.r;
          document.getElementById('inpLicCagr').value = pr.l;
          document.getElementById('inpChipRev').value = pr.c;
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
            tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
            tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
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
        { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$4.92B FY26 营收 · 97.5% 毛利率 · 研发共摊与版税年金' },
        { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: 'Armv9 ISA → ATA/AFA → CSS子系统 → 350B版税 → AGI整芯' },
        { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四级授权阶梯', s: '$2.61B 版税 + $2.31B 授权 · Non-GAAP 营业利润 $2.12B' },
        { id: 'mod-cohort', t: 'M3 客户深度绑定与市场份额统治', s: '手机 >99% · 头部超算云 ~50% · 车规 44% · PC ~20%' },
        { id: 'mod-capital', t: 'M4 ACV 合同池与5年双轨复利推演器', s: '$1.73B ACV · 半数版税源自10年前老品 · FY31 $25B 蓝图模拟' },
        { id: 'mod-matrix', t: 'M5 半导体六大范式对标与暗礁压测', s: 'ARM vs NVDA / TSMC / SNPS / QCOM / ASML · 高通诉讼与安谋中国' }
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

      // Sidebar Collapse / Mobile Drawer / Export / Print
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
          a.download = 'Arm_商业模式解构.html';
          a.click();
          setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
          showToast('已开始下载独立网页：Arm_商业模式解构.html');
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
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawAllCharts, 90);
      });

      runSimulator();
      drawAllCharts();
    })();
  