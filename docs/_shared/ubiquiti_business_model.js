
  (function () {
    'use strict';
    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
    var STORAGE_STRESS_KEY = 'ui_bm_stress_v1';

    var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'tco', kView: 'debt' };
    var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

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
      var lBtn = document.getElementById('sideThemeLightBtn'), dBtn = document.getElementById('sideThemeDarkBtn');
      if (lBtn) lBtn.classList.toggle('active', state.theme === 'light');
      if (dBtn) dBtn.classList.toggle('active', state.theme === 'dark');
      drawAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
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

    var LENSES = [
      {
        formula: '营业利润率 (38.1%) = 亲民硬件毛利率 (47.3%) - 精锐研发费率 (5.2%) - 极简销管费率 (4.0%) → 碾压高毛利但高销售费用的传统厂商',
        body: '传统网通厂商虽拥有 64%–75% 账面毛利率，但每年必须耗费 25%–38% 的营收养活庞大销售代表、渠道返点与市场公关；厄比奎蒂主动让渡 18–25 个百分点的硬件毛利给终端客户并免除软件年费，靠 YouTube 评测、Reddit/UI 社区口碑与 44% 官网直营结账，最终留存了比传统巨头更高的营业利润率！'
      },
      {
        formula: 'SG&A 结构性护城河：UI 销管费率 (3.7%) vs 传统网通/安全对手 (24%–36%) → 20–30个百分点的定价降维打击空间',
        body: '如果竞争对手跟进厄比奎蒂的硬件低价与“零授权年费”，其庞大的直销佣金体系将瞬间陷入巨额营业亏损；而如果对手维持高价收租，中小型企业、连锁商业与现代园区就会持续自发倒向 UniFi 生态——这正是典型的<strong>“反定位（Counter-Positioning）”护城河</strong>。'
      },
      {
        formula: '真实股东收益纯度：Non-GAAP 与 GAAP 净利差额仅 0.5%（FY26 SBC 仅 $7.44M / 占营收 0.23%） | 创始人零年薪零期权摊薄',
        body: '硅谷多数科技公司每年将营收的 8%–18% 用于高管与员工股权激励（SBC），侵蚀二级市场股东权益；而在厄比奎蒂，持股 93.0% 的创始人 Robert Pera 十余年领取 $0 薪水与 $0 股票奖励，每一分自由现金流都真实转化为清偿债务、每股 $1.00 季度分红与股票回购注销。'
      }
    ];
    document.getElementById('lensTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-lens]');
      if (!b) return;
      var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
      var all = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
      document.getElementById('lensFormula').textContent = LENSES[idx].formula;
      document.getElementById('lensBody').innerHTML = LENSES[idx].body;
    });

    var NODES = [
      {
        badge: 'NODE 01 · EX-APPLE RF & DESIGN-HOUSE DNA',
        title: '把冰冷机房铁盒做成消费电子艺术品：1,321 名精英工程师的软硬一体突袭',
        desc: 'Robert Pera 于 2003–2005 年在苹果担任无线硬件工程师期间发现，苹果产品品质卓越却受限于封闭桌面场景，而传统企业级网通设备操作反人类且溢价虚高。厄比奎蒂将“铝合金 CNC 工艺、LCM 触控状态屏、Etherlighting™ 发光端口定位与开箱即用 App 引导”注入企业级机柜，在全球台北、里加、布拉格与美国组建分布式精锐小团队，从底层射频固件到 UniFi OS 100% 原生自研。',
        formula: '商业传导：100% 原生自研固件（零并购商誉摊销）+ 商用芯片极致调优 → 以中端硬件售价实现 46.2%–47.3% 高毛利率',
        kpis: [['72.7%', '研发人员占总编制比重 (1,321/1,818)'], ['$2.26M', '按 Q1 FY27 年化测算人均创收'], ['$1.67M', '账面净无形资产 (几乎零并购泡沫)'], ['200+', '覆盖全球国家与地区网络节点']]
      },
      {
        badge: 'NODE 02 · ZERO DIRECT SALES FORCE & COMMUNITY FLYWHEEL',
        title: '砍掉客户经理与高尔夫球局：让全球百万 IT 集成商免费充当布道师',
        desc: '厄比奎蒂不雇佣传统企业级直销代表，全公司仅 127 名 SG&A 行政与财务人员。数以十万计的 MSP（托管服务提供商）、弱电系统集成商与科技博主在官方 UI Community、Reddit (r/Ubiquiti) 与 YouTube 自发晒机柜图、测评新固件并解答新手问题——工程师直接看论坛修 Bug，获客边际成本趋近于零。',
        formula: '商业传导：社区口碑病毒裂变 → 全年 SG&A 仅 $121.77M（占营收 3.7%，其中很大一部分还是官网刷卡手续费）',
        kpis: [['3.7%', 'FY2026 全年 SG&A 占营收比重'], ['127人', '全球 SG&A 销管人员总编制'], ['0 传统直销', '无昂贵驻场销售代表佣金抽成'], ['<10%', '无任何单一客户占总营收超10%']]
      },
      {
        badge: 'NODE 03 · ZERO-LICENSE PRICING DISRUPTION',
        title: '终结“不交年费设备变砖”：对传统网通寻租模式的釜底抽薪',
        desc: '思科 Meraki 等云管网络方案要求客户每年为每台 AP、每台交换机乃至每个摄像头缴纳数百美元授权费，否则后台停用；而厄比奎蒂在 Q1 FY27 官方定位中直言“消灭统治企业技术数十年的寻租模式（Eliminate the rent-extraction model）”，买断硬件即可终身免费使用完整 UniFi 控制平台与 OTA 升级。',
        formula: '商业传导：客户 5 年 TCO 暴降 60%–75% → 预算受限的中小企业、学校、酒店、连锁零售与多分支机构大规模倒戈',
        kpis: [['$0 / 年', '核心网络与本地安防强制授权费'], ['65%+', '相比传统云管方案 5 年 TCO 节省'], ['47.3%', 'Q1 FY27 在低价策略下仍创毛利新高'], ['+43.2%', 'Q1 FY27 企业级 UniFi 营收同比增速']]
      },
      {
        badge: 'NODE 04 · UNIFI 6-VERTICAL LAND-AND-EXPAND',
        title: '单一控制面硬件吞噬：从一颗 Wi-Fi AP 蔓延至整栋智能建筑操作系统',
        desc: '企业客户最初往往只买几台 $189 的 UniFi AP 解决无线死角；一旦体验到 UniFi OS 丝滑的拓扑可视化，便顺理成章换上 Cloud Gateway 网关、PoE+++ 发光交换机、UniFi Protect 4K AI 摄像头、UniFi Access 门禁考勤、UNAS Pro 网络存储乃至 EV 充电桩，并按需选购 CyberSecure 威胁防护订阅。',
        formula: '商业传导：低门槛无线单品切入 → 6 大建筑技术产品栈同界面交叉销售 → 单客户生命周期硬件产值放大 5–10 倍',
        kpis: [['6 大产品栈', '网络/安防/门禁/语音/存储/能源'], ['$941.3M', 'Q1 FY27 单季 Enterprise 平台营收'], ['$105.2M', 'Q1 FY27 资产负债表递延收入余额'], ['95,000+', 'CyberSecure 企业级实时威胁签名']]
      },
      {
        badge: 'NODE 05 · DIRECT WEBSTORE & OWNER-OPERATOR COMPOUNDING',
        title: '44% 官网直营现款结账 + 零银行债务 + 93% 创始人利益完全绑定',
        desc: '通过自营 store.ui.com 电商矩阵（占营收 44%–45%）配合全球百余家分销商（55%–56%），厄比奎蒂不仅省去中间层层盘剥、第一时间掌握新品真实销量，更将每年近十亿美元自由现金流全部用于扫清有息负债（2026年2月定期贷款归零）、派发每股 $1.00 季度股息及回购注销流通股。',
        formula: '商业传导：CapEx 仅占营收 0.6% → FY26 自由现金流 $908.9M → 净现金达 $845.5M + 持续分红回购增厚每股价值',
        kpis: [['44%–45%', '官方直营网店 (Webstore) 营收占比'], ['0.6%', 'FY2026 资本开支占总营收极低比重'], ['$0', '截至 2026.09.30 有息银行贷款余额'], ['93.0%', '创始人 Robert Pera 实益持股比例']]
      }
    ];
    document.getElementById('pipelineTrack').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-node]');
      if (!btn) return;
      var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
      var bs = this.querySelectorAll('.bm-node-btn');
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

    document.getElementById('tierFilter').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tcat]');
      if (!b) return;
      var cat = b.getAttribute('data-tcat');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var cards = document.querySelectorAll('#tierList [data-tier]');
      for (var j = 0; j < cards.length; j++) {
        cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
      }
    });

    var COHORTS = {
      solo: {
        stats: [
          ['典型硬件拓扑配置', '3–5 台 U7 Lite / Pro 无线 AP', '挂靠现有第三方路由器试用'],
          ['5年强制软件授权年费', '$0 (自托管或云管免费)', '零门槛切入 IT 管理员视野'],
          ['单站点累计硬件客单价', '~$950', '初步建立射频稳定性与 UI 口碑'],
          ['跨代增购与系统锁定留存', '~76%', '超过六成站点在18个月内补齐网关交换机']
        ],
        note: '<strong>无线单点切入策略：</strong>许多原本使用传统品牌的 IT 主管最初只采购几台 UniFi Wi-Fi 7 AP 救急，结果发现手机端 UniFi App 配网与信道热力图远胜传统命令行（CLI），随即触发整网替换。'
      },
      core: {
        stats: [
          ['典型硬件拓扑配置', 'UDM Pro Max + PoE交换机 + 6×U7 Pro + 8×AI安防/门禁', '一套 UniFi Site Manager 集中免运维'],
          ['5年强制软件授权年费', '$0 (基础全免费)', '对比同规模 Meraki 节省 ~$8,500+ 年费'],
          ['单站点累计硬件客单价', '~$6,800', '较纯购买 AP 尝鲜站扩容 6.2 倍'],
          ['跨代增购与系统锁定留存', '>94%', '更换品牌需推倒重装网通+监控+门禁']
        ],
        note: '<strong>跨品类物理棘轮效应：</strong>传统企业采购往往是“思科管网络、Verkada管监控、HID管门禁、群晖管存储”，需付四份年费；而 UniFi OS 将<strong>网络、监控、门禁、电话与 NAS</strong> 融进同一零年费界面，每多接入一环，迁移壁垒便筑高一层。'
      },
      ultra: {
        stats: [
          ['典型硬件拓扑配置', '双机热备 EFG + 100G ECS核心交换 + 40×E7 + UNVR Pro/AI Key + UNAS Pro 8', '千人级园区高可用双电源冗余架构'],
          ['5年可选增值订阅贡献', '~$2,495 ($499/年 CyberSecure 企业版)', '仅相当于传统防火墙订阅费的零头'],
          ['单站点累计软硬总产值', '~$48,000+', '单园区贡献逾 $22,000 毛利额'],
          ['跨代增购与系统锁定留存', '>97%', '多分支机构通过 SD-WAN Site Magic 一键互联']
        ],
        note: '<strong>上攻中大型企业园区破局点：</strong>随着双冗余电源、MC-LAG/VRRP 高可用、100G 核心交换（ECS）与 95,000+ 签名防火墙（EFG）齐备，过去因单点故障顾虑不敢用 UniFi 的中大型企业、医院与学区正成批迁入。'
      }
    };
    document.getElementById('cohortTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cohort]');
      if (!b) return;
      var key = b.getAttribute('data-cohort');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var c = COHORTS[key] || COHORTS.core;
      document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
        var isMono = idx > 0 ? ' mono' : '';
        var fz = idx === 0 ? ' style="font-size:0.90rem;"' : '';
        return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
      }).join('');
      document.getElementById('cohortNote').innerHTML = c.note;
    });

    document.getElementById('peerFilter').addEventListener('click', function (e) {
      var b = e.target.closest('[data-pcat]');
      if (!b) return;
      var cat = b.getAttribute('data-pcat');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var rows = document.querySelectorAll('#peerTable tbody tr');
      for (var j = 0; j < rows.length; j++) {
        var rc = rows[j].getAttribute('data-row-cat') || '';
        rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
      }
    });

    function prepCanvas(id) {
      var c = document.getElementById(id);
      if (!c) return null;
      var rect = c.getBoundingClientRect();
      var w = Math.max(260, rect.width || 500), h = Math.max(140, rect.height || 280);
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

    function drawProfitCanvas() {
      var env = prepCanvas('profitCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.profitCanvas = [];
      var pad = { top: 28, right: 20, bottom: 42, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.pView === 'waterfall') {
        var steps = [
          { lbl: 'Enterprise', val: 2.97, base: 0, col: pal.blue, tip: 'FY2026 Enterprise Technology 净营收: $2,972.3M (+31.9% YoY)，占比 90.8%' },
          { lbl: '+UISP宽带', val: 0.30, base: 2.97, col: pal.amber, tip: 'FY2026 Service Provider 净营收: +$301.9M，推升全年总营收至 $3,274.2M' },
          { lbl: '=总毛利', val: 1.51, base: 0, col: pal.violet, tip: 'FY2026 GAAP 毛利额: $1,511.4M (综合毛利率 46.2%，同比跃升 +280bps)' },
          { lbl: '营业利润', val: 1.19, base: 0, col: pal.blue, tip: '扣除仅 $204.2M 研发与 $121.8M SG&A 后，营业利润高达 $1,185.4M (营业利润率 36.2%)' },
          { lbl: 'GAAP净利', val: 0.96, base: 0, col: pal.green, tip: 'FY2026 GAAP 净利润: $960.3M (+34.9% YoY)，净利率 29.3%，摊薄 EPS $15.85' },
          { lbl: '自由现金流', val: 0.91, base: 0, col: pal.green, tip: 'FY2026 自由现金流: $908.9M (经营现金流 $928.7M - 极轻 CapEx $19.7M)' }
        ];
        var maxV = 3.6;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + gv.toFixed(1) + 'B', pad.left - 8, gy + 4);
        }
        var slotW = pw / steps.length, barW = Math.min(46, slotW * 0.58);
        steps.forEach(function (s, i) {
          var x = pad.left + i * slotW + (slotW - barW) / 2;
          var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
          var yBot = pad.top + ph - (s.base / maxV) * ph;
          var bh = Math.max(5, yBot - yTop);
          ctx.fillStyle = s.col;
          roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + s.val.toFixed(2) + 'B', x + barW / 2, yTop - 7);
          ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
          ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
          hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
        });
      } else {
        var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26', "Q1'27"];
        var gm = [39.6, 39.2, 38.4, 43.4, 46.2, 47.3];
        var opm = [27.3, 28.1, 25.9, 32.5, 36.2, 38.1];
        var netm = [22.4, 21.0, 18.2, 27.7, 29.3, 31.2];
        var minM = 15, maxM = 52;
        for (var m = 0; m <= 4; m++) {
          var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
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
            if (idx === yrs.length - 1 || idx === 2) {
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
        plotLine(gm, pal.blue, 'GAAP 毛利率');
        plotLine(opm, pal.violet, 'GAAP 营业利润率');
        plotLine(netm, pal.green, 'GAAP 净利率');
      }
    }

    function drawCohortCanvas() {
      var env = prepCanvas('cohortCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.cohortCanvas = [];
      var pad = { top: 28, right: 22, bottom: 42, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.cView === 'tco') {
        var stacks = [
          { name: 'Ubiquiti UniFi 全栈', hw: 6.8, lic: 0.5, col: pal.green, tip: '100人站点 5年硬件 $6.8K + 可选 CyberSecure $0.5K = 总计 $7.3K (零强制许可费)' },
          { name: 'Fortinet / HPE Aruba', hw: 12.5, lic: 9.2, col: pal.amber, tip: '硬件采购 $12.5K + 5年安全与云管授权续费 $9.2K = 总计 $21.7K' },
          { name: 'Cisco Meraki + Verkada', hw: 15.8, lic: 16.4, col: pal.red, tip: '高溢价硬件 $15.8K + 5年每设备/每摄像头强制云订阅 $16.4K = 总计 $32.2K' }
        ];
        var maxT = 36;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxT / 4) * g, gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + gv.toFixed(0) + 'K', pad.left - 8, gy + 4);
        }
        var slot = pw / stacks.length, bw = Math.min(58, slot * 0.48);
        stacks.forEach(function (st, idx) {
          var x = pad.left + idx * slot + (slot - bw) / 2;
          var hHw = (st.hw / maxT) * ph, hLic = (st.lic / maxT) * ph;
          var yHw = pad.top + ph - hHw, yLic = yHw - hLic;
          ctx.fillStyle = pal.blue;
          roundRect(ctx, x, yHw, bw, hHw, 4); ctx.fill();
          if (hLic > 1) {
            ctx.fillStyle = st.col;
            roundRect(ctx, x, yLic, bw, hLic, 4); ctx.fill();
          }
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + (st.hw + st.lic).toFixed(1) + 'K', x + bw / 2, yLic - 7);
          ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
          ctx.fillText(st.name, x + bw / 2, pad.top + ph + 20);
          hitRegions.cohortCanvas.push({ x: x, y: yLic, w: bw, h: hHw + hLic, title: st.name + ' 5年总拥有成本', body: st.tip });
        });
      } else {
        var xLbls = ['首年 Y1', '第2年 Y2', '第3年 Y3', '第4年 Y4', '第5年 Y5'];
        var solo = [440, 520, 680, 890, 1050];
        var core = [2150, 2680, 3190, 3950, 4620];
        var ultra = [11800, 14900, 18200, 21900, 25400];
        var maxL = 28000;
        for (var k = 0; k <= 4; k++) {
          var kv = (maxL / 4) * k, ky = pad.top + ph - (k / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + (kv / 1000).toFixed(0) + 'K', pad.left - 8, ky + 4);
        }
        function drawCurve(arr, col, label) {
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
            ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
            if (idx === 4) {
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
              ctx.fillText('$' + (v / 1000).toFixed(1) + 'K', px - 6, py - 8);
            }
            hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + label, body: '单站点累计贡献毛利: $' + v.toLocaleString() });
          });
        }
        xLbls.forEach(function (lb, idx) {
          var px = pad.left + (idx / 4) * pw;
          ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(lb, px, pad.top + ph + 20);
        });
        drawCurve(ultra, pal.violet, '中大型园区全栈站点');
        drawCurve(core, pal.blue, '标准商业4栈站点');
        drawCurve(solo, pal.amber, '单品类AP尝鲜站点');
      }
    }

    function drawCapitalCanvas() {
      var env = prepCanvas('capitalCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hitRegions.capitalCanvas = [];
      var pad = { top: 28, right: 20, bottom: 42, left: 54 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.kView === 'debt') {
        var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26', "Q1'27"];
        var cash = [136.7, 114.9, 126.3, 149.7, 611.2, 845.5];
        var debt = [853.3, 1140.0, 757.3, 297.4, 80.0, 76.0];
        var maxD = 1250;
        for (var g = 0; g <= 4; g++) {
          var sv = Math.round((maxD / 4) * g), sy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, sy); ctx.lineTo(pad.left + pw, sy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + sv + 'M', pad.left - 6, sy + 4);
        }
        var slot = pw / yrs.length, bw = Math.min(22, slot * 0.34);
        yrs.forEach(function (y, i) {
          var cx = pad.left + i * slot + slot / 2;
          var ch = (cash[i] / maxD) * ph, dh = (debt[i] / maxD) * ph;
          ctx.fillStyle = pal.green;
          roundRect(ctx, cx - bw - 2, pad.top + ph - ch, bw, ch, 4); ctx.fill();
          ctx.fillStyle = pal.red;
          roundRect(ctx, cx + 2, pad.top + ph - dh, bw, dh, 4); ctx.fill();
          if (i === 1 || i === 5) {
            ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + Math.round(cash[i]) + 'M', cx - bw / 2 - 2, pad.top + ph - ch - 6);
          }
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(y, cx, pad.top + ph + 20);
          hitRegions.capitalCanvas.push({ x: cx - bw - 4, y: pad.top, w: bw * 2 + 8, h: ph, title: y + ' 现金 vs 总债务(含租赁)', body: '现金及短投 $' + cash[i].toFixed(1) + 'M vs 总债务 $' + debt[i].toFixed(1) + 'M（2026.02 银行有息贷款已彻底清零）' });
        });
      } else {
        var peers = [
          { name: 'Ubiquiti (UI)', sga: 3.7, rd: 6.2, tip: 'SG&A 3.7% + R&D 6.2% = 总 OpEx 仅 10.0%！全行业极致精益标杆' },
          { name: 'Arista (ANET)', sga: 7.5, rd: 13.5, tip: 'SG&A ~7.5% + R&D ~13.5% = 总 OpEx ~21.0%（云巨头直销模式）' },
          { name: 'Cisco (CSCO)', sga: 25.0, rd: 14.5, tip: 'SG&A ~25.0% + R&D ~14.5% = 总 OpEx ~39.5%（庞大全球销售铁军）' },
          { name: 'Fortinet (FTNT)', sga: 35.5, rd: 11.8, tip: 'SG&A ~35.5% + R&D ~11.8% = 总 OpEx ~47.3%（高渠道营销投入）' }
        ];
        var maxP = 55;
        var rowH = ph / peers.length;
        peers.forEach(function (p, idx) {
          var cy = pad.top + idx * rowH + rowH / 2, bh = 22;
          var wSga = (p.sga / maxP) * (pw - 70), wRd = (p.rd / maxP) * (pw - 70);
          var x0 = pad.left + 62;
          ctx.fillStyle = idx === 0 ? pal.green : pal.amber;
          roundRect(ctx, x0, cy - bh / 2, wSga, bh, 4); ctx.fill();
          ctx.fillStyle = pal.blue;
          roundRect(ctx, x0 + wSga + 2, cy - bh / 2, wRd, bh, 4); ctx.fill();
          ctx.fillStyle = pal.sub; ctx.font = (idx === 0 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(p.name, x0 - 8, cy + 4);
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText((p.sga + p.rd).toFixed(1) + '%', x0 + wSga + wRd + 7, cy + 4);
          hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 16, w: pw, h: 32, title: p.name + ' 营业费用率结构', body: p.tip });
        });
      }
    }

    var simData = { eps: [15.85, 19.8, 22.9, 26.3, 30.1, 34.5] };
    function drawSimMiniCanvas() {
      var env = prepCanvas('simMiniCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var pad = { top: 22, right: 18, bottom: 26, left: 46 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
      var arr = simData.eps;
      var maxE = Math.max(22, Math.ceil(Math.max.apply(null, arr) * 1.16));
      ctx.strokeStyle = pal.grid;
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
      ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
      arr.forEach(function (v, i) {
        var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      arr.forEach(function (v, i) {
        var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
        ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + v.toFixed(1), px, py - 8);
        ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace';
        ctx.fillText(yrs[i], px, pad.top + ph + 16);
      });
    }

    function runSimulator() {
      var gE = parseFloat(document.getElementById('inpEntCagr').value) / 100;
      var gmT = parseFloat(document.getElementById('inpGmTarget').value) / 100;
      var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
      document.getElementById('lblEntCagr').textContent = (gE * 100).toFixed(1) + '%';
      document.getElementById('lblGmTarget').textContent = (gmT * 100).toFixed(1) + '%';
      document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

      var ent = 2.972, sp = 0.302, shares = 0.06057; // in Billions of shares (60.57M)
      var epsArr = [15.85];
      var lastOpm = 36.2;
      for (var y = 1; y <= 5; y++) {
        ent *= (1 + gE);
        sp *= 1.02;
        shares *= (1 - buy);
        var rev = ent + sp;
        var opm = Math.max(20, (gmT * 100) - 9.8);
        lastOpm = opm;
        var netInc = rev * (opm / 100) * 0.806; // ~19.4% effective tax rate
        epsArr.push(netInc / shares);
      }
      var fy31Rev = ent + sp;
      var fy31Eps = epsArr[5];
      var epsCagr = (Math.pow(fy31Eps / 15.85, 0.2) - 1) * 100;

      document.getElementById('simRevOut').textContent = '$' + fy31Rev.toFixed(2) + 'B';
      document.getElementById('simOpmOut').textContent = lastOpm.toFixed(1) + '%';
      document.getElementById('simEpsOut').textContent = '$' + fy31Eps.toFixed(2);
      document.getElementById('simCagrOut').textContent = (epsCagr >= 0 ? '+' : '') + epsCagr.toFixed(1) + '%';
      simData.eps = epsArr;
      drawSimMiniCanvas();
    }

    ['inpEntCagr', 'inpGmTarget', 'inpBuyRate'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', runSimulator);
    });

    var PRESETS = {
      bear: { e: 8.5, gm: 41.5, b: 0.5 },
      base: { e: 16.0, gm: 46.5, b: 1.5 },
      bull: { e: 22.0, gm: 48.5, b: 2.2 }
    };
    document.getElementById('simPresets').addEventListener('click', function (e) {
      var b = e.target.closest('[data-preset]');
      if (!b) return;
      var k = b.getAttribute('data-preset');
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var pr = PRESETS[k] || PRESETS.base;
      document.getElementById('inpEntCagr').value = pr.e;
      document.getElementById('inpGmTarget').value = pr.gm;
      document.getElementById('inpBuyRate').value = pr.b;
      runSimulator();
    });

    function bindChartTab(groupId, attr, stateKey, drawFn) {
      document.getElementById(groupId).addEventListener('click', function (e) {
        var b = e.target.closest('[' + attr + ']');
        if (!b) return;
        state[stateKey] = b.getAttribute(attr);
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        drawFn();
      });
    }
    bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
    bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
    bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

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
    ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHoverTooltip);

    function drawAllCharts() {
      drawProfitCanvas();
      drawCohortCanvas();
      drawCapitalCanvas();
      drawSimMiniCanvas();
    }

    var QUICK_ITEMS = [
      { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'FY26 $3.27B · Q1 FY27 $1.03B · 3.7% SG&A 费率差' },
      { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '苹果工业基因 → 零直销社区 → 零License → 6栈扩圈 → 复利' },
      { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与双擎拆解', s: '47.3% 毛利率 · 38.1% 营业利润率 · 44% 直营网店' },
      { id: 'mod-cohort', t: 'M3 多品类棘轮与零税 TCO 碾压', s: '100人园区 5年 TCO 对比：UniFi $7.3K vs Meraki $32.2K' },
      { id: 'mod-capital', t: 'M4 净现金逆转与 5 年 EPS 推演器', s: '$845.5M 现金零银行借款 · 交互式 FY31E EPS 模拟' },
      { id: 'mod-matrix', t: 'M5 六大网通与科技标杆对标压测', s: 'UI vs ANET / CSCO / FTNT / MSI / AAPL 及三大风险追踪' }
    ];
    var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
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
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qInput.focus(); }
    });

    // Suite Hub Filter & Click Feedback
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
        if (item.classList.contains('active')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          showToast('同套系关联研报：' + item.getAttribute('data-suite-file') + '（可在聊天附件列表切换打开或下载）');
        }
      }
    });

    // Sidebar Toggle, Theme, Lang, Export & Print
    var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
    document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
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

    document.getElementById('appbarThemeBtn').addEventListener('click', function () {
      var nxt = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nxt, false);
      try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
    });
    document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () {
      applyTheme('light', false);
      try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {}
    });
    document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () {
      applyTheme('dark', false);
      try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {}
    });
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
      a.download = '厄比奎蒂公司商业模式解构.html';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast('已触发下载：厄比奎蒂公司商业模式解构.html');
    });
    document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

    window.addEventListener('scroll', function () {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      document.getElementById('readingProgressBar').style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
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
      if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
      applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
    } catch (e) {}

    var rt = null;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAllCharts, 90); });
    runSimulator();
    drawAllCharts();
  })();
  