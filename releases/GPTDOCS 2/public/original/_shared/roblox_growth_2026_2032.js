
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

      var state = {
        theme: document.documentElement.getAttribute('data-theme') || 'light',
        lang: 'zh',
        hz: 0,
        eng: 0,
        fView: 'bridge',
        sView: 'intl',
        mult: 30
      };

      var hits = { futureCanvas: [], siliconCanvas: [] };

      function showToast(msg) {
        var el = document.getElementById('muiSnackbar');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(function () { el.classList.remove('show'); }, 2400);
      }

      function applyTheme(theme, silent) {
        state.theme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
        
        
        document.getElementById('appbarThemeIcon').innerHTML = state.theme === 'dark'
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        drawAll();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色外观' : '已切换至浅色高清晰度外观');
      }

      function applyLang(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
        document.documentElement.setAttribute('lang', state.lang === 'en' ? 'en' : 'zh-CN');
        try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
        document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
        document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var el = nodes[i];
          var val = state.lang === 'en' ? el.getAttribute('data-i18n-en') : el.getAttribute('data-i18n-zh');
          if (val !== null) el.innerHTML = val;
        }
        renderHorizon();
        renderEngine();
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文界面');
      }

      /* F0 3-Horizon Radar */
      var HORIZONS = [
        {
          badge: 'HORIZON 1 · 年龄核验收官与免安装破壁期 (2026–2027H1)',
          title: 'Chrome WebAssembly 秒开 × Build 全量推广 × 停止全年指引转向十年长跑',
          bullets: [
            '<strong>零下载网页直玩：</strong>2026 年底率先在 Chrome 推出 WebAssembly 网页版，点击社交链接即刻进房同玩。',
            '<strong>两大平台级公测：</strong>2027 上半年启动 Roblox Everywhere 一期独立发包与 Universal Player 早期接入。',
            '<strong>全场景离线与金融卡：</strong>2027 年中上线飞机/地铁离线畅玩（Offline Play）与创作者专属 Roblox Card。'
          ],
          prob: '路线图锁定度：极高 (已官宣排期)',
          impact: '预订额量级：$7.0B → $9.5B+'
        },
        {
          badge: 'HORIZON 2 · 跨应用商店发行与硬核 3A 品类突破期 (2027H2–2029)',
          title: 'Server Authority 竞技品类起量 × 激励/前贴片视频广告规模化 × 外部游戏上云',
          bullets: [
            '<strong>攻克成人硬核品类：</strong>SLIM 网格、纹理流送与服务端权威架构成熟，孕育原生硬核射击、RPG 与写实体育大作。',
            '<strong>跨商店独立获客：</strong>头部创作者将体验打包为独立 iOS/Android/PC/主机应用上架，底层仍走 Robux 与安全系统。',
            '<strong>高毛利广告第二引擎：</strong>可跳过前贴片与激励视频覆盖过亿免费玩家，显著抬升整体自由现金流转化率。'
          ],
          prob: '战略兑现把握：高 (底层基建就绪)',
          impact: '预订额量级：$11B → $15B+'
        },
        {
          badge: 'HORIZON 3 · 全球 10% 游戏市场份额与世界模型纪元 (2030–2032)',
          title: 'Roblox Reality 照片级生成世界 × 亚太与新兴市场全面普及 × 迈向 10亿日活',
          bullets: [
            '<strong>生成式视频世界模型：</strong>Roblox Reality 实现实时照片级视觉交互，模糊传统 3A 引擎与云端生成世界的界限。',
            '<strong>冲击全球 10% 市占北极星：</strong>从 FY25 的 3.4% 份额向全球约 $2,000亿+ 游戏内容市场的 10%（~$200亿+）冲刺。',
            '<strong>日常数字第三空间：</strong>教育、音乐现场、品牌实景电商与跨国实时语音同玩融为一体。'
          ],
          prob: '远期北极星愿景：高赔率平台期权',
          impact: '远期目标锚：~$20B+ 预订额 · 10% 份额'
        }
      ];

      function renderHorizon() {
        var h = HORIZONS[state.hz];
        document.getElementById('hzBadge').textContent = h.badge;
        document.getElementById('hzTitle').textContent = h.title;
        document.getElementById('hzList').innerHTML = h.bullets.map(function (b) {
          return '<li><span class="ft-hz-dot"></span><span>' + b + '</span></li>';
        }).join('');
        document.getElementById('hzProb').textContent = h.prob;
        document.getElementById('hzImpact').textContent = h.impact;
      }

      document.getElementById('hzTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-hz]');
        if (!b) return;
        state.hz = parseInt(b.getAttribute('data-hz'), 10);
        var bs = this.querySelectorAll('.ft-hz-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        renderHorizon();
      });

      /* F1 6-Engine Master-Detail */
      var ENGINES = [
        {
          badge: 'ENGINE 01 · PROMPT-TO-GAME BUILD & CUBE 4D FOUNDATION',
          title: 'Build 自然语言生成可玩世界：让 1.38 亿玩家像发短视频一样“随口造游戏”',
          desc: '依托每日超 3.5 亿小时多智能体三维物理交互沉淀的独家 4D 数据模型记录（4D DMR），Roblox 自研出理解空间物理、脚本逻辑与多人交互的 Cube 4D 基座大模型，并在 Studio 内集成 MCP 协议（日活季度环比暴增 ~5 倍）。全新推出的 Build 允许零代码基础的普通玩家输入一句提示词或一张草图即可生成完整联机体验——Alpha 测试已涌入 500,000+ 用户发布超 70,000 款游戏，且逾 75% 从未使用过 Studio。',
          formula: '飞轮公式：独家 4D DMR 交互语料 → Cube 4D 与 Build 创作门槛归零 → 新游供给百倍爆发反哺 RFY 留存',
          gauges: [
            ['500,000+', 'Build Alpha 零门槛尝鲜创作者'],
            ['70,000+ 款', 'AI 一句话直接生成并发布的可玩游戏'],
            ['>75% 纯新', '从未接触过传统 Studio 的破圈人群'],
            ['~5x QoQ', 'Studio MCP 智能体协议日活季度增速']
          ]
        },
        {
          badge: 'ENGINE 02 · ROBLOX EVERYWHERE & ZERO-INSTALL CHROME WEB PLAY',
          title: 'Roblox Everywhere（1H 2027 一期）：把每一款爆款体验直接送进全球各大应用商店与网页链接',
          desc: '过去所有 Roblox 游戏只能在主 App 内被搜索；自 2027 上半年一期启动的 Roblox Everywhere 允许创作者将自己的体验自助打包为独立原生应用，直接发布到移动端、PC 与主机应用商店，而底层依然无缝调用 Roblox 的多人联机、Robux 经济与年龄安全系统。叠加 2026 年底上线的 Chrome WebAssembly 零安装网页即玩与 2027 年中的离线模式，获客触角伸向全互联网。',
          formula: '破圈公式：Chrome 点击链接免下载秒进 + 独立 App 上架各大商店 → 打破单一 App 外壳天花板',
          gauges: [
            ['2026年底', 'Chrome WebAssembly 免安装网页版上线'],
            ['1H 2027', 'Roblox Everywhere 一期独立应用发包启动'],
            ['2027年中', 'Offline Play 离线游玩模式正式推出'],
            ['2D + 3D', '新增正交视角与原生 2D 游戏渲染支持']
          ]
        },
        {
          badge: 'ENGINE 03 · THE UNIVERSAL PLAYER & ROBLOX REALITY',
          title: 'The Universal Player：用 AI 将外部任何引擎游戏一键迁入 Roblox 云生态',
          desc: '这是 RDC 2026 最具野心的降维打击：将于 2027 上半年开启抢先体验的 Universal Player，支持外部使用其他引擎开发的 PC、主机或移动游戏通过 AI 辅助转换直接导入并运行在 Roblox 云基础设施之上，即刻获得 1.38 亿日活分发、跨端语音社交与统一变现能力。远期更将融合 Roblox Reality 生成式视频世界模型，呈现照片级写实视效。',
          formula: '吞吐公式：AI 跨引擎迁移导入 + 零服务器运维托管 → 将外部存量独立/中型工作室纳入平台税基',
          gauges: [
            ['1H 2027', 'Universal Player 开发者抢先体验开启'],
            ['全引擎兼容', '支持外部主机/PC/手游 AI 辅助上云'],
            ['Reality 模型', '生成式视频世界模型解锁照片级画质'],
            ['~400 模型', '平台在线运行 AI 模型矩阵（77%自托管）']
          ]
        },
        {
          badge: 'ENGINE 04 · O18 NOVEL GENRES & $0.0054 DEVEX FLYWHEEL',
          title: '向成人硬核赛道要利润：美区 18+ 用户占比升至 37%，变现能力高出青少年 50%+',
          desc: '过去受限于卡通画质与客户端物理架构，硬核射击、大型 RPG 与拟真体育在 Roblox 占比偏低（公司称之为高潜“Novel 新兴品类”）。随着 Server Authority（服务端权威反作弊）、SLIM 轻量网格与自定义材质流送落地，加上美区 18+ 合规消费享受 $0.0054/Robux（+42% 溢价）分润，超 2,000 款体验已实现 10%+ 收入跃升，美区 18–34 岁日活两年翻倍（+114%）。',
          formula: '单客跃升：美区 O18 核验日活 (37%) × 变现高出 50%+ × $0.0054 分润虹吸专业大厂 → ARPU 结构性上移',
          gauges: [
            ['37% 占比', '美区已核验 DAU 中 18 岁以上成人比例'],
            ['+114% 2Y', '美区 18–34 岁核心青年日活两年累计增幅'],
            ['+50% 以上', '美区 O18 较 U18 单用户变现溢价幅度'],
            ['$0.0054', '美区 18+ 合格消费专属 DevEx 高汇率']
          ]
        },
        {
          badge: 'ENGINE 05 · VIDEO ADS, ROBLOX PLUS & MOMENTS COMMERCE',
          title: '把 80% 非付费玩家的 340 亿小时时长变成高毛利金矿：视频广告与短视频电商',
          desc: 'Q3 2026 平台拥有 1.38 亿日活（月活更高），但月度独立付费用户为 3,030 万——意味着海量免费活跃时长尚待广告货币化。目前激励视频完播率超 90%、可视率达 95%，已获 1,000+ 品牌采买（超 20% 接入游戏逾 10% 收入来自广告），可跳过前贴片广告蓄势待发；叠加 Moments 短视频“边刷边买”与消费达 7 倍的 Roblox Plus 订阅，打开高毛利增量池。',
          formula: '毛利增厚：品牌广告免缴 30% 应用商店过路费 + Moments 种草转化 → 边际自由现金流转化率远超内购',
          gauges: [
            ['>90% / 95%', '激励视频广告完播率与行业顶尖可视率'],
            ['1,000+ 品牌', '已投放激励视频广告的全球品牌广告主'],
            ['2x / 7x', 'Roblox Plus 订户游玩时长与 Robux 消费倍数'],
            ['>70% 百强', 'Top 100 头部体验常态化投放原生买量广告']
          ]
        },
        {
          badge: 'ENGINE 06 · INTERNATIONAL HYPERGROWTH & CREATOR FINTECH',
          title: '海外日常渗透率尚不足 2%：印度 +37%、日本 +33%、沙特 +30% 领衔全球裂变',
          desc: '当美国青少年渗透率已达 20%–30% 高位时，美国以外广阔市场的日常人口渗透率仍低于 2%。凭借 16 种以上语言实时 AI 自动聊天翻译与低端安卓机型帧率优化，Q3 2026 印度日活同比增长 +37%、日本（全球前三大高 ARPU 游戏市场）大增 +33%、沙特增长 +30%。配套 Airwallex 驱动的 Roblox Wallet 日结提现与 2027 Roblox Card，彻底打通全球本土创作者生计闭环。',
          formula: '区域扩张：日本/中东高付费力破局 + 印度人口基数裂变 + 工作日日结钱包 → 再造一个海外版 Roblox',
          gauges: [
            ['+37% YoY', 'Q3 2026 印度市场日活用户同比高增速'],
            ['+33% YoY', 'Q3 2026 日本高 ARPU 市场日活同比增速'],
            ['+30% YoY', 'Q3 2026 沙特阿拉伯日活用户同比增速'],
            ['<2% 渗透', '美国以外全球市场日常人口渗透率洼地']
          ]
        }
      ];

      function renderEngine() {
        var eg = ENGINES[state.eng];
        document.getElementById('engBadge').textContent = eg.badge;
        document.getElementById('engTitle').textContent = eg.title;
        document.getElementById('engDesc').textContent = eg.desc;
        document.getElementById('engFormula').textContent = eg.formula;
        document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
          return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
        }).join('');
      }

      document.getElementById('engineRail').addEventListener('click', function (e) {
        var b = e.target.closest('[data-eng]');
        if (!b) return;
        state.eng = parseInt(b.getAttribute('data-eng'), 10);
        var bs = this.querySelectorAll('.ft-rail-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        renderEngine();
      });

      /* Canvas Helpers */
      function prepCanvas(id) {
        var c = document.getElementById(id);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var r = c.parentElement.getBoundingClientRect();
        var w = Math.max(260, r.width - 20);
        var h = Math.max(120, r.height - 20);
        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        var ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
      }

      function pal() {
        var dark = state.theme === 'dark';
        return {
          text: dark ? '#F3F6F9' : '#0F1924',
          sub: dark ? '#94A3B8' : '#475569',
          grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)',
          blue: '#0073E6',
          cyan: '#00A3FF',
          green: dark ? '#66BB6A' : '#16A34A',
          violet: dark ? '#A78BFA' : '#7C3AED',
          amber: dark ? '#FFB74D' : '#D97706'
        };
      }

      /* Chart F2: futureCanvas */
      function drawFutureCanvas() {
        var o = prepCanvas('futureCanvas'), ctx = o.ctx, w = o.w, h = o.h, p = pal();
        hits.futureCanvas = [];
        var pad = { l: 52, r: 22, t: 28, b: 46 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;

        if (state.fView === 'bridge') {
          var steps = [
            { l: 'FY25 实际 (3.4%)', v: 6.79, c: p.blue, t: 'FY2025 实际预订额 $6.79B，占全球游戏内容市场 3.4%' },
            { l: '+O18 硬核新品类', v: 4.20, c: p.violet, t: 'Server Authority + $0.0054 分润撬动射击/RPG/体育成人增量' },
            { l: '+海外本地化裂变', v: 3.80, c: p.cyan, t: '日本(+33%)、印度(+37%)、中东与欧洲低渗透市场扩容' },
            { l: '+视频广告与电商', v: 2.40, c: p.amber, t: '激励视频、前贴片广告、Moments 购物与 Roblox Plus' },
            { l: '+Everywhere/上云', v: 2.90, c: p.violet, t: '独立应用发包、Chrome 免装网页版与 Universal Player 外部游戏导入' },
            { l: '10% 市占北极星', v: 20.09, c: p.green, t: '迈向全球 ~$200B+ 游戏内容市场 10% 份额战略目标 (~$20B+)' }
          ];
          var maxB = 22.5;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxB / 4) * g;
            var gy = pad.t + ph - (gv / maxB) * ph;
            ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
            ctx.fillStyle = p.sub; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv.toFixed(0) + 'B', pad.l - 6, gy + 3);
          }

          var running = 0;
          var bw = Math.min(52, (pw / steps.length) * 0.62);
          steps.forEach(function (st, idx) {
            var cx = pad.l + (pw / steps.length) * (idx + 0.5);
            var isTotal = (idx === 0 || idx === steps.length - 1);
            var baseVal = isTotal ? 0 : running;
            var topVal = isTotal ? st.v : running + st.v;
            if (idx < steps.length - 1) running = topVal;

            var yTop = pad.t + ph - (topVal / maxB) * ph;
            var yBot = pad.t + ph - (baseVal / maxB) * ph;
            var bh = Math.max(5, yBot - yTop);

            ctx.fillStyle = st.c;
            ctx.beginPath(); ctx.roundRect(cx - bw / 2, yTop, bw, bh, 5); ctx.fill();
            ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText((isTotal ? '$' : '+$') + st.v.toFixed(1) + 'B', cx, yTop - 6);
            ctx.fillStyle = p.sub; ctx.font = '600 10px system-ui, sans-serif';
            ctx.fillText(st.l, cx, h - 14);
            hits.futureCanvas.push({ x: cx - bw / 2, y: yTop, w: bw, h: bh, title: st.l, body: st.t });
          });
        } else {
          var metrics = [
            { l: 'AI 请求自建机房托管率', v: 77, u: '%', c: p.blue, t: '~400 个在线 AI 模型中 77% 的推理请求运行于 Roblox 自托管基础设施' },
            { l: 'Top 100 头部游戏 AI 采用率', v: 80, u: '%+', c: p.green, t: '超过 80% 的百强体验已深度采用 Roblox AI 创作或运行时能力' },
            { l: '激励视频广告平均完播率', v: 90, u: '%+', c: p.violet, t: '全球 1,000+ 品牌投放激励视频完播率超 90%，可视率达 95%' },
            { l: '裸金属迁移单负载最高提效', v: 100, u: ' (10x)', c: p.cyan, t: '核心 AI 工作负载从公有云迁回自有裸金属 GPU 集群实现最高 10 倍效率提升' }
          ];
          var bh2 = 28;
          metrics.forEach(function (m, i) {
            var y = pad.t + i * ((ph - 10) / metrics.length) + 8;
            var wBar = (m.v / 100) * (pw - 135);
            ctx.fillStyle = p.grid; ctx.beginPath(); ctx.roundRect(pad.l + 125, y, pw - 125, bh2, 6); ctx.fill();
            ctx.fillStyle = m.c; ctx.beginPath(); ctx.roundRect(pad.l + 125, y, wBar, bh2, 6); ctx.fill();
            ctx.fillStyle = p.text; ctx.font = '600 11px system-ui, sans-serif'; ctx.textAlign = 'right';
            ctx.fillText(m.l, pad.l + 118, y + 18);
            ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
            ctx.fillText(m.u === ' (10x)' ? '10x 效率跃升' : (m.v + m.u), pad.l + 134, y + 18);
            hits.futureCanvas.push({ x: pad.l + 125, y: y, w: wBar, h: bh2, title: m.l, body: m.t });
          });
        }
      }

      /* Chart F3: siliconCanvas */
      function drawSiliconCanvas() {
        var o = prepCanvas('siliconCanvas'), ctx = o.ctx, w = o.w, h = o.h, p = pal();
        hits.siliconCanvas = [];
        var pad = { l: 48, r: 22, t: 28, b: 44 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;

        var items = state.sView === 'intl'
          ? [
              { l: '印度 India', v: 37, c: p.green, t: 'Q3 2026 印度 DAU 同比增长 +37%（庞大年轻人口红利）' },
              { l: '日本 Japan', v: 33, c: p.blue, t: 'Q3 2026 日本 DAU 同比增长 +33%（高 ARPU 核心主机/手游大国）' },
              { l: '沙特 KSA', v: 30, c: p.violet, t: 'Q3 2026 沙特阿拉伯 DAU 同比增长 +30%（高客单中东市场）' },
              { l: '美区 18–34岁', v: 26, c: p.cyan, t: 'Q3 2026 美国 18–34 岁成人 DAU 同比增长 +26%（两年累计 +114%）' },
              { l: '德国 Germany', v: 13, c: p.amber, t: 'Q3 2026 德国 DAU 同比增长 +13%（法国同步增长 +12%）' }
            ]
          : [
              { l: '澳大利亚', v: 80, c: p.green, t: '截至 Q3 2026 澳大利亚 DAU 年龄核验完成率达 80%' },
              { l: '13–17岁群体', v: 80, c: p.violet, t: '全球 13–17 岁青少年主力群体年龄核验覆盖率超 80%' },
              { l: '美国 US', v: 75, c: p.blue, t: '美国 DAU 年龄核验完成率达 75%（其中 37% 为 O18 成人）' },
              { l: '英国 UK', v: 75, c: p.cyan, t: '英国 DAU 年龄核验完成率达 75%' },
              { l: '全球总日活', v: 64, c: p.amber, t: '全球 1.38 亿 DAU 中已有 64% 完成实名/AI 面部年龄核验' }
            ];

        var maxV = state.sView === 'intl' ? 45 : 100;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxV / 4) * g;
          var gy = pad.t + ph - (gv / maxV) * ph;
          ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
          ctx.fillStyle = p.sub; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(Math.round(gv) + '%', pad.l - 6, gy + 3);
        }

        var bw = Math.min(50, (pw / items.length) * 0.56);
        items.forEach(function (it, idx) {
          var cx = pad.l + (pw / items.length) * (idx + 0.5);
          var bh = (it.v / maxV) * ph;
          var y = pad.t + ph - bh;
          ctx.fillStyle = it.c;
          ctx.beginPath(); ctx.roundRect(cx - bw / 2, y, bw, bh, 6); ctx.fill();
          ctx.fillStyle = p.text; ctx.font = '700 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText((state.sView === 'intl' ? '+' : '') + it.v + '%', cx, y - 6);
          ctx.fillStyle = p.sub; ctx.font = '600 10.5px system-ui, sans-serif';
          ctx.fillText(it.l, cx, h - 14);
          hits.siliconCanvas.push({ x: cx - bw / 2, y: y, w: bw, h: bh, title: it.l, body: it.t });
        });
      }

      /* F4 Optionality Builder & Mini Chart */
      var OPT_DATA = {
        o18: { bkgs: 3.6, fcf: 0.90 },
        intl: { bkgs: 3.2, fcf: 0.74 },
        ads: { bkgs: 1.8, fcf: 0.86 },
        everywhere: { bkgs: 1.9, fcf: 0.66 },
        universal: { bkgs: 2.8, fcf: 0.72 }
      };
      var optBars = [1.35, 4.51];

      function drawOptMini() {
        var o = prepCanvas('optMiniCanvas'), ctx = o.ctx, w = o.w, h = o.h, p = pal();
        var pad = { l: 44, r: 18, t: 20, b: 24 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var labels = ['FY25 实际 FCF', '保守自然内生', 'FY30E 勾选期权合集'];
        var vals = [1.35, 2.05, optBars[1]];
        var cols = [p.blue, p.cyan, p.green];
        var maxO = Math.max(5.5, optBars[1] * 1.18);
        var bw = Math.min(56, (pw / 3) * 0.52);

        vals.forEach(function (v, idx) {
          var cx = pad.l + (pw / 3) * (idx + 0.5);
          var bh = (v / maxO) * ph;
          var y = pad.t + ph - bh;
          ctx.fillStyle = cols[idx];
          ctx.beginPath(); ctx.roundRect(cx - bw / 2, y, bw, bh, 5); ctx.fill();
          ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(2) + 'B', cx, y - 5);
          ctx.fillStyle = p.sub; ctx.font = '600 10px system-ui, sans-serif';
          ctx.fillText(labels[idx], cx, h - 6);
        });
      }

      function updateOptionality() {
        var bkgs = 6.79; // FY25 actual base
        var fcf = 1.35;  // FY25 actual base
        var boxes = document.querySelectorAll('#optSwitchList input[data-opt]');
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].checked) {
            var d = OPT_DATA[boxes[i].getAttribute('data-opt')];
            bkgs += d.bkgs;
            fcf += d.fcf;
          }
        }
        // Baseline organic maintenance uplift on core cohort (+$0.5B fcf on existing base)
        var projFcf = fcf;
        var shareEst = (bkgs / 201.0) * 100; // ~$201B global gaming content denominator implied by $6.79B = 3.4%
        var netCash = 5.23; // Q3'26 net cash $5.23B
        var impliedCap = projFcf * state.mult + netCash;

        document.getElementById('optRevOut').textContent = '$' + bkgs.toFixed(1) + 'B';
        document.getElementById('optNetOut').textContent = shareEst.toFixed(1) + '%';
        document.getElementById('optEpsOut').textContent = '$' + projFcf.toFixed(2) + 'B';
        document.getElementById('optCapOut').textContent = '$' + impliedCap.toFixed(1) + 'B';
        optBars = [1.35, projFcf];
        drawOptMini();
      }

      document.getElementById('optSwitchList').addEventListener('change', updateOptionality);
      document.getElementById('peTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-pe]');
        if (!b) return;
        state.mult = parseInt(b.getAttribute('data-pe'), 10);
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        updateOptionality();
      });

      function bindSeg(gid, attr, skey, fn) {
        var g = document.getElementById(gid);
        g.addEventListener('click', function (e) {
          var b = e.target.closest('[' + attr + ']');
          if (!b) return;
          state[skey] = b.getAttribute(attr);
          var bs = g.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          fn();
        });
      }
      bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
      bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

      function bindTip(cid) {
        var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
        c.addEventListener('mousemove', function (ev) {
          var r = c.getBoundingClientRect();
          var mx = ev.clientX - r.left, my = ev.clientY - r.top;
          var arr = hits[cid] || [], hit = null;
          for (var i = 0; i < arr.length; i++) {
            var rg = arr[i];
            if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
          }
          if (hit) {
            tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
            tip.style.display = 'block';
            tip.style.left = Math.min(window.innerWidth - 300, ev.clientX + 14) + 'px';
            tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
          } else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

      function drawAll() {
        drawFutureCanvas();
        drawSiliconCanvas();
        drawOptMini();
      }

      function exportHtml() {
        var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = '罗布乐思 Roblox 未来十年（2026–2032）战略图谱.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        showToast('已下载《罗布乐思 Roblox 未来十年（2026–2032）战略图谱.html》');
      }

      /* Suite Hub & Quick Jump */
      var hub = document.getElementById('companySubfolderHub');
      hub.addEventListener('click', function (e) {
        var catBtn = e.target.closest('[data-co-cat]');
        if (catBtn) {
          var cat = catBtn.getAttribute('data-co-cat');
          var ps = hub.querySelectorAll('[data-co-cat]');
          for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === catBtn);
          var its = hub.querySelectorAll('[data-co-item-cat]');
          for (var j = 0; j < its.length; j++) its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
          return;
        }
        var jb = e.target.closest('[data-suite-jump]');
        if (jb) showToast('请在画布列表或下载文件夹中打开《' + jb.getAttribute('data-suite-jump') + '》');
        else if (e.target.closest('[data-suite-current]')) window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      var QITEMS = [
        { id: 'sec-f0', t: 'F0 RDC 2026 新十年宣言与三阶时间窗', s: '从 3.4% 冲刺 10% 全球游戏市场份额与三大跃迁' },
        { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Build / Everywhere / Universal Player / O18 / 视频广告 / 出海' },
        { id: 'sec-f2', t: 'F2 10%全球市占阶梯桥与裸金属AI效率', s: '77% 自托管 AI 模型与 10x 裸金属推理提效' },
        { id: 'sec-f3', t: 'F3 全栈AI世界模型与引擎主权矩阵', s: 'Cube 4D · SLIM · Server Authority · Roblox Reality' },
        { id: 'sec-f4', t: 'F4 2030 千亿市值期权组装实验室', s: '交互式勾选五大增长极推演 FY30E FCF 与市值' }
      ];
      var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQ(kw) {
        var q = (kw || '').trim().toLowerCase();
        var m = QITEMS.filter(function (x) { return !q || (x.t + ' ' + x.s).toLowerCase().indexOf(q) !== -1; });
        qPop.innerHTML = m.map(function (x) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
      }
      qIn.addEventListener('focus', function () { renderQ(qIn.value); });
      qIn.addEventListener('input', function () { renderQ(qIn.value); });
      qPop.addEventListener('click', function (e) {
        var b = e.target.closest('[data-jump]');
        if (!b) return;
        var el = document.querySelector(b.getAttribute('data-jump'));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        qPop.classList.remove('open');
      });
      document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
      });

      document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
        if (window.innerWidth <= 1023) document.body.classList.toggle('drawer-open');
        else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(drawAll, 60); }
      });
      document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });
      document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
      
      
      
      
      document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
      document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });

      window.addEventListener('scroll', function () {
        var dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / dh) * 100) + '%';
      }, { passive: true });

      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {}

      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 80); });
      updateOptionality();
      drawAll();
    })();
  