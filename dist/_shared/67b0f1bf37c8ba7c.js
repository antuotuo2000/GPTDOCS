
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

      var state = { theme: 'light', lang: 'zh', fView: 'capex', sView: 'pen', pe: 35 };
      var hits = { futureCanvas: [], siliconCanvas: [] };

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
          text: dark ? '#F3F6F9' : '#0F1924',
          sub: dark ? '#B2BAC2' : '#334155',
          tick: dark ? '#94A3B8' : '#475569',
          grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
          blue: dark ? '#3399FF' : '#0073E6',
          violet: dark ? '#A78BFA' : '#7C3AED',
          green: dark ? '#22C55E' : '#16A34A',
          amber: dark ? '#FFB74D' : '#D97706',
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
        drawAll();
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
          if (val !== null) {
            if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
            else nodes[i].textContent = val;
          }
        }
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      // F0: 3-Horizon Radar Switcher
      var HORIZONS = [
        {
          badge: 'HORIZON 1 · 高确定性业绩兑现期 (2026–2027)',
          title: '折叠屏产能三倍释放 × Siri AI 全系渗透 × 触控 Mac 首秀',
          items: [
            '<strong>iPhone Duo 良率突破：</strong>Counterpoint 预计 2027 年苹果折叠机出货量激增近 3 倍，持续拉升超高端 ASP。',
            '<strong>春季双波段闭环：</strong>2027 春季标准版 iPhone 18 与 e 系列补齐，消除上半年传统淡季缺口。',
            '<strong>Touch Mac 与 HomeView：</strong>首次引入触控屏 Mac 与新一代智能家居中枢硬件，激活存量多端增购。'
          ],
          prob: '兑现确定性：极高 (90%+)',
          impact: '年化增量营收池：+$45B–$65B'
        },
        {
          badge: 'HORIZON 2 · 结构性毛利跃升期 (2028–2029)',
          title: '全系清退外部基带 × AI Agent 订阅变现 × 折叠 iPad/Mac 扩圈',
          items: [
            '<strong>C2/C3 毫米波基带满贯：</strong>自研蜂窝基带与 N 系列无线芯片覆盖 Pro 旗舰全系，每年内化逾 $70亿 芯片毛利。',
            '<strong>AI 意图分发抽成：</strong>Siri 成为跨应用交易总入口，开辟高阶个人助理订阅与第三方模型竞价分润。',
            '<strong>桌面带机械臂家庭终端：</strong>结合 HomeView、FaceTime 追踪与家庭管家 AI，切入智慧养老与居家陪伴。'
          ],
          prob: '兑现确定性：中高 (75%)',
          impact: '年化增量营收池：+$85B–$120B'
        },
        {
          badge: 'HORIZON 3 · 后智能手机奇点期 (2030–2032)',
          title: '轻量化全天候 AR 眼镜 × 光学无创血糖/血压连续监测',
          items: [
            '<strong>空间计算大众化：</strong>visionOS 沉淀十年空间应用生态后，随 Micro-LED 光波导成熟推出 <75g 全天候智能眼镜。',
            '<strong>医疗级预防医学革命：</strong>硅光子芯片攻克Apple Watch 无创血糖趋势预警与血压监测，绑定亿级慢病管理订阅。',
            '<strong>1.4nm 级 3D 堆叠硅片：</strong>端侧本地运行百亿参数多模态个人数字孪生模型。'
          ],
          prob: '兑现确定性：远期期权 (45%–55%)',
          impact: '年化增量营收池：+$130B+'
        }
      ];
      var hzTabs = document.getElementById('hzTabs');
      if (hzTabs) {
        hzTabs.addEventListener('click', function (e) {
          var b = e.target.closest('[data-hz]');
          if (!b) return;
          var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
          var bs = hzTabs.querySelectorAll('.ft-hz-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var hz = HORIZONS[idx];
          document.getElementById('hzBadge').textContent = hz.badge;
          document.getElementById('hzTitle').textContent = hz.title;
          document.getElementById('hzList').innerHTML = hz.items.map(function (t) {
            return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
          }).join('');
          document.getElementById('hzProb').textContent = hz.prob;
          document.getElementById('hzImpact').textContent = hz.impact;
        });
      }

      // F1: 6-Engine Vertical Master-Detail Explorer
      var ENGINES = [
        {
          badge: 'ENGINE 01 · ON-DEVICE SIRI AI & AGENT GATEKEEPER',
          title: '端侧 Siri AI × Private Cloud Compute：把 App Store 升级为“AI 意图结算中心”',
          desc: '在传统移动互联网时代，用户手动点开 App，苹果通过应用下载与内购抽成；在 AI Agent 时代，全新 Siri AI 直接跨应用读取用户邮件、日历、照片与位置上下文（App Intents 框架），在本地完成 85%+ 高频推理，复杂任务无缝调用自研 Apple Silicon 服务器集群构建的“私有云计算（Private Cloud Compute）”。无论外部大模型如何混战，只要想触达全球消费力最强的 25 亿终端用户，就必须接入苹果系统级入口并分享订阅或交易分成。',
          formula: '变现双轮：(1) 大运存硬件强制换机周期缩短 + (2) Siri AI 高阶代理订阅 / 第三方大模型接入分润（毛利率 >78%）',
          gauges: [['3.5x', 'M5 每核神经加速器 AI 跃升'], ['0 数据留存', 'Private Cloud 密码学隐私验证'], ['2.5B+ 终端', '全球最大端侧推理算力网'], ['2026–2028', '商业化加速变现主窗口']]
        },
        {
          badge: 'ENGINE 02 · C1X/C2 MODEM & N1 WIRELESS SOVEREIGNTY',
          title: '射频通信全芯独立：攻克手机主板最后一块外部高毛利领地',
          desc: '过去苹果虽掌控 A/M 系列主芯片，但蜂窝基带与 Wi-Fi/蓝牙组合芯片长期受制于高通与博通，每年支付高昂芯片溢价与专利费。随着 C1X 自研基带（速度较 C1 翻倍、功耗较前代旗舰降 30%）在 iPhone 17e 与 iPad Pro 成功验证，以及原生支持 Wi-Fi 7、蓝牙 6 与 Thread 的自研 N1 无线芯片规模商用，苹果正按既定节奏迈向全系射频自给自足。',
          formula: '利润传导：每台节省 $22–$35 外部通信芯片溢价 × 2.5亿+ 年出货终端 ≈ 年化直接增厚 $60亿–$85亿 硬件毛利',
          gauges: [['2.0x 提速', 'C1X 相比初代 C1 蜂窝吞吐'], ['-30% 功耗', 'C1X 显著延长全天续航'], ['Wi-Fi 7 + Thread', 'N1 无线芯片三合一集成'], ['+200bps', '全面切换后硬件毛利率提振']]
        },
        {
          badge: 'ENGINE 03 · FOLDABLE MULTI-FORM-FACTOR & TOUCH MAC',
          title: '形态破局红利：从首款折叠 iPhone Duo 迈向巨屏折叠 iPad 与触控 Mac',
          desc: '智能手机直板形态演进十五年后趋于收敛，iPhone Duo 首秀即点燃 $2,000 超高端换机热情，Counterpoint 预测 2027 年苹果折叠屏出货量将翻近三倍。更重要的是，苹果将零折痕柔性屏与触控交互首次延伸至 Mac 产线（Touch Mac 与 MacBook Neo），打破笔电与平板边界，开启新一轮生产力终端单价上移。',
          formula: '变现逻辑：超高端形态扩容（ASP +$700）+ AppleCare+ 折叠屏高单价延保高附着率（>45%）',
          gauges: [['~3.0x', '2027E 折叠机型出货增长倍数'], ['$1,999+', '超高端价格天花板成功重构'], ['Touch Mac', '40年首次打通 Mac 触控交互'], ['+24% YoY', 'Q3 2026 Mac 营收逆势领跑']]
        },
        {
          badge: 'ENGINE 04 · APPLE HOMEVIEW & AMBIENT HOME ROBOTICS',
          title: '智慧家庭中枢：以 Apple HomeView + Thread 网格夺回客厅环境计算入口',
          desc: '苹果在 FY26Q4 正式推出新一代智能家居硬件矩阵（Apple HomeView、HomePod mini 2 等），并通过全系搭载 N1 芯片的 iPhone/iPad 构建无缝 Thread 低功耗家庭物联网。结合端侧 Siri 声纹/人脸识别与家庭安防云存储，苹果正把家庭屏幕从被动音箱升级为主动感知的家庭数字管家。',
          formula: '变现逻辑：家庭中枢硬件普及 + iCloud+ HomeKit 安全视频多路存储与家庭 Apple One 渗透率跃升',
          gauges: [['HomeView', '新一代家庭显控中枢入口'], ['Thread 协议', 'N1 芯片全系原生内置组网'], ['家庭账户锁死', '全屋智能使跨生态迁移归零'], ['+$18B+', '2030E 智慧家庭软硬合计空间']]
        },
        {
          badge: 'ENGINE 05 · VISIONOS & LIGHTWEIGHT AR EYEWEAR',
          title: '空间计算十年长征：Vision Pro 锻造开发者底座，终局指向全天候 AR 眼镜',
          desc: '正如初代 Apple Watch 历经三代找准健康定位，Apple Vision Pro 的战略使命是提前锁定全球空间计算交互标准（眼手追踪）、3D 内容格式（Spatial Video）与企业级数字孪生工作流。随着碳化硅光波导与高能效 2nm 芯片成熟，轻量化 Apple Glass 将与 iPhone 算力协同，承接后屏幕时代的第一视角入口。',
          formula: '战略定位：短期不追求走量毛利，提前卡位下一代操作系统（visionOS）标准制定权与应用税底座',
          gauges: [['visionOS', '全球唯一成熟空间计算 OS'], ['眼动+手势', '确立后触控时代交互直觉'], ['端机算力分担', '借 iPhone 无线协处理减重'], ['2029–2031', '轻量化眼镜大众商业化窗口']]
        },
        {
          badge: 'ENGINE 06 · NON-INVASIVE PHOTONICS & PREVENTATIVE HEALTH',
          title: '硅光子无创生物传感：库克口中“苹果对人类最大贡献”的终极形态',
          desc: '苹果秘密攻关十余年的硅光子吸收光谱无创血糖趋势监测、连续无袖带血压预警与睡眠呼吸暂停医疗认证，正在将 Apple Watch 与 AirPods（体温/心率/助听）从消费电子升级为 24 小时贴身生命体征哨兵。一旦无创血糖趋势预警落地，全球逾 5 亿糖尿病前期及健康焦虑人群将形成无价的刚需换机潮。',
          formula: '变现逻辑：医疗级独占传感器驱动穿戴硬件二次爆发 + AI 私人健康教练高粘性订阅服务',
          gauges: [['硅光子芯片', '底层光学光谱自研专利壁垒'], ['Watch + AirPods', '双穿戴多模态体征交叉核验'], ['FDA 级认证', '构筑消费品牌极难跨越的临床门槛'], ['>5亿人群', '全球慢病预警潜在刚需受众']]
        }
      ];
      var rail = document.getElementById('engineRail');
      if (rail) {
        rail.addEventListener('click', function (e) {
          var b = e.target.closest('[data-eng]');
          if (!b) return;
          var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
          var bs = rail.querySelectorAll('.ft-rail-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var eg = ENGINES[idx];
          document.getElementById('engBadge').textContent = eg.badge;
          document.getElementById('engTitle').textContent = eg.title;
          document.getElementById('engDesc').textContent = eg.desc;
          document.getElementById('engFormula').textContent = eg.formula;
          document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
            return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
          }).join('');
        });
      }

      // High-DPI Retina Canvas Engine
      function prepCanvas(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
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

      function drawFutureCanvas() {
        var env = prepCanvas('futureCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.futureCanvas = [];
        var pad = { top: 28, right: 20, bottom: 42, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.fView === 'capex') {
          var peers = [
            { name: 'Amazon', cap: 102.0, col: pal.amber, tip: 'AWS 与履约重资本投入，年度 CapEx 破千亿美元' },
            { name: 'Microsoft', cap: 86.0, col: pal.blue, tip: '全球 AI 数据中心与 GPU 集群重度扩张' },
            { name: 'Alphabet', cap: 75.0, col: pal.violet, tip: 'TPU 集群与搜索/云 AI 基础设施高强度投入' },
            { name: 'Meta', cap: 66.0, col: pal.red, tip: 'Llama 训练集群重金投入，无直接云出租回血' },
            { name: 'Apple (AAPL)', cap: 9.0, col: pal.green, tip: 'FY2026 CapEx 仅 $9.0B（占营收 1.9%）！端侧推理硬件由用户买单，FCF 高达 $136.1B' }
          ];
          var maxC = 115;
          for (var g = 0; g <= 4; g++) {
            var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
          }
          var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
          peers.forEach(function (p, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
            ctx.fillStyle = p.col;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + p.cap.toFixed(0) + 'B', x + bw / 2, yt - 6);
            ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '11px sans-serif';
            ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
            hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' 年度资本开支', body: p.tip });
          });
        } else {
          var steps = [
            { lbl: 'FY26基准', v: 478.8, b: 0, col: pal.blue, tip: 'FY2026 实际总营收: $478.83B' },
            { lbl: '+核心服务复利', v: 98.0, b: 478.8, col: pal.green, tip: '存量订阅、广告与支付自然增长贡献 +$98B' },
            { lbl: '+折叠/Mac升级', v: 68.0, b: 576.8, col: pal.violet, tip: 'iPhone Duo 放量、Pro 均价上移与触控 Mac 贡献 +$68B' },
            { lbl: '+Siri AI变现', v: 46.0, b: 644.8, col: pal.amber, tip: 'Siri AI 高阶代理包与模型分发抽成贡献 +$46B' },
            { lbl: '+家庭/空间健康', v: 55.0, b: 690.8, col: pal.green, tip: 'HomeView 家庭终端、AR 眼镜与医疗传感贡献 +$55B' },
            { lbl: 'FY32E蓝图', v: 745.8, b: 0, col: pal.blue, tip: 'FY2032E 远期营收蓝图: ~$746B（高毛利服务与AI占比超 35%）' }
          ];
          var maxB = 820;
          for (var k = 0; k <= 4; k++) {
            var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
          }
          var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
          steps.forEach(function (s, i) {
            var x = pad.left + i * sW + (sW - bW) / 2;
            var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
            var yb = pad.top + ph - (s.b / maxB) * ph;
            var bh = Math.max(5, yb - yt);
            ctx.fillStyle = s.col;
            roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', x + bW / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
            hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
          });
        }
      }

      function drawSiliconCanvas() {
        var env = prepCanvas('siliconCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.siliconCanvas = [];
        var pad = { top: 28, right: 22, bottom: 40, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var yrs = ['2025 (C1)', '2026 (C1X+N1)', '2027E (C2)', '2028E', '2029E', '2030E'];

        if (state.sView === 'pen') {
          var modPen = [8, 24, 55, 82, 96, 100];
          var wfPen = [0, 32, 68, 92, 100, 100];
          for (var g = 0; g <= 4; g++) {
            var gv = g * 25, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(gv + '%', pad.left - 8, gy + 4);
          }
          function plotP(arr, col, label) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 1 || idx === 5) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText(v + '%', px, py - 8);
              }
              hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '出货渗透率预计达 ' + v + '%' });
            });
          }
          yrs.forEach(function (y, idx) {
            var px = pad.left + (idx / 5) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(y, px, pad.top + ph + 20);
          });
          plotP(modPen, pal.blue, 'C系自研蜂窝基带渗透率');
          plotP(wfPen, pal.violet, 'N系自研无线连接芯片渗透率');
        } else {
          var saved = [0.6, 2.1, 4.3, 6.2, 7.4, 8.2];
          var maxS = 9.5;
          for (var m = 0; m <= 3; m++) {
            var mv = (m * 3).toFixed(0), my = pad.top + ph - ((m * 3) / maxS) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
          }
          var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
          yrs.forEach(function (y, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (saved[i] / maxS) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + saved[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
            ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
            hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 自研通信芯片年化节流', body: '预计全年节省外部芯片采购与专利溢价约 $' + saved[i].toFixed(1) + 'B' });
          });
        }
      }

      // F4: Interactive 2030 Optionality Builder + Mini Canvas
      var OPT_DATA = {
        ai:   { rev: 32, net: 20.5 },
        rf:   { rev: 0,  net: 6.1  },
        fold: { rev: 44, net: 13.8 },
        home: { rev: 18, net: 6.4  },
        ar:   { rev: 38, net: 14.2 }
      };
      var miniCaps = [5.16, 5.95, 6.87];

      function drawOptMiniCanvas() {
        var env = prepCanvas('optMiniCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 22, right: 18, bottom: 24, left: 46 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = ['当前市值', '2030基础盘', '2030含期权'];
        var maxV = Math.max(8.5, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        var slot = pw / 3, bw = Math.min(54, slot * 0.5);
        miniCaps.forEach(function (v, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(2) + 'T', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
          ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
        });
      }

      function recalcOptionality() {
        // Baseline organic FY2030E (4% core hw + 9% core services, 2.2%/yr buybacks -> ~13.3B shares)
        var baseRev = 574.0, baseNet = 154.0, sh2030 = 13.15;
        var addRev = 0, addNet = 0;
        document.querySelectorAll('[data-opt]').forEach(function (chk) {
          if (chk.checked) {
            var d = OPT_DATA[chk.getAttribute('data-opt')];
            if (d) { addRev += d.rev; addNet += d.net; }
          }
        });
        var totRev = baseRev + addRev;
        var totNet = baseNet + addNet;
        var eps = totNet / sh2030;
        var mcapT = (totNet * state.pe) / 1000;
        var baseMcapT = (baseNet * state.pe) / 1000;

        document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
        document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
        document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
        document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

        miniCaps = [5.16, baseMcapT, mcapT];
        drawOptMiniCanvas();
      }

      document.querySelectorAll('[data-opt]').forEach(function (chk) {
        chk.addEventListener('change', recalcOptionality);
      });
      var peTabs = document.getElementById('peTabs');
      if (peTabs) {
        peTabs.addEventListener('click', function (e) {
          var b = e.target.closest('[data-pe]');
          if (!b) return;
          state.pe = parseInt(b.getAttribute('data-pe'), 10) || 35;
          var bs = peTabs.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          recalcOptionality();
        });
      }

      function bindSeg(gid, attr, skey, fn) {
        var g = document.getElementById(gid);
        if (!g) return;
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
        if (!c || !tip) return;
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
          } else {
            tip.style.display = 'none';
          }
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

      function drawAll() {
        drawFutureCanvas();
        drawSiliconCanvas();
        drawOptMiniCanvas();
      }

      // Quick Jump ⌘K
      var QITEMS = [
        { id: 'sec-f0', t: 'F0 特努斯新政与三阶战略时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
        { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: '端侧Siri AI · C1X/N1全芯自主 · 折叠家族 · HomeView · AR与无创血糖' },
        { id: 'sec-f2', t: 'F2 反共识 AI 轻资产纪律与 2032 营收桥', s: '苹果 $9B CapEx 对比云巨头千亿投入 · 迈向 $746B 营收阶梯' },
        { id: 'sec-f3', t: 'F3 射频与基带全芯主权路线图', s: 'M5 神经加速器 + C1X 基带 + N1 Wi-Fi 7/Thread 年省 $80B+ 溢价' },
        { id: 'sec-f4', t: 'F4 2030 冲击 $7万亿市值期权组装器', s: '自由开关五大新业务期权与估值倍数实时测算 EPS' }
      ];
      var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQ(kw) {
        if (!qPop) return;
        var q = (kw || '').trim().toLowerCase();
        var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
        qPop.innerHTML = m.map(function (x) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
      }
      if (qIn && qPop) {
        qIn.addEventListener('focus', function () { renderQ(qIn.value); });
        qIn.addEventListener('input', function () { renderQ(qIn.value); });
        qPop.addEventListener('click', function (e) {
          var jb = e.target.closest('[data-jump]');
          if (!jb) return;
          var target = document.querySelector(jb.getAttribute('data-jump'));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          qPop.classList.remove('open');
        });
        document.addEventListener('click', function (e) {
          if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open');
        });
      }
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); }
      });

      // Mobile Drawer & Scroll Progress
      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
      if (sbBtn && sb && bd) {
        sbBtn.addEventListener('click', function () {
          if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
        });
        bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
      }
      window.addEventListener('scroll', function () {
        var bar = document.getElementById('readingProgressBar');
        if (bar) {
          var dh = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
        }
      }, { passive: true });

      // Init Theme, Lang & Resize
      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'light').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {}

      var tBtn = document.getElementById('appbarThemeBtn');
      if (tBtn) {
        tBtn.addEventListener('click', function () {
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

      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
      recalcOptionality();
      drawAll();
    })();
  