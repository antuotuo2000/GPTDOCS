
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

      var state = { theme: 'dark', lang: 'zh', fView: 'bridge', sView: 'cloud', pe: 40 };
      var hits = { futureCanvas: [], siliconCanvas: [] };

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
        var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
        if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
        if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
        drawAll();
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
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

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
            showToast('套件姊妹篇「' + jumpBtn.getAttribute('data-suite-jump') + '」已同步生成，可在聊天卡片中直接打开或下载');
          }
        });
      }

      // F0: 3-Horizon Radar Switcher
      var HORIZONS = [
        {
          badge: 'HORIZON 1 · 云份额夺取与整芯首秀期 (2026–2027)',
          title: '超算云 CPU 份额破 60% × AGI CPU 交付上机架 × PC 突破 20%',
          items: [
            '<strong>Arm AGI CPU 首批交付：</strong>Meta Yosemite YV5 与 Supermicro 液冷机柜（单柜 336 颗 CPU）启动部署，FY27–28 订单破 $2B。',
            '<strong>云巨头全面去 x86 化：</strong>Google TPU8 弃用 x86 改配 Axion，NVIDIA Vera 独立机柜与 AWS Graviton 推动云份额年底超 60%。',
            '<strong>端侧 CSS 2 全面普及：</strong>OPPO/vivo/小米导入 Mobile CSS 2 与 AI 原生 Mali G2-Ultra GPU；Googlebook 助推 PC 份额达 ~20%。'
          ],
          prob: '兑现确定性：极高 (90%+)',
          impact: '年化营收区间：$6.0B–$7.6B'
        },
        {
          badge: 'HORIZON 2 · 硅片规模放量与经营杠杆释放期 (2028–2029)',
          title: 'AGI CPU 跨越百亿门槛 × 2nm CSS N4 量产 × 车规 Zena CSS 上车',
          items: [
            '<strong>FY28 整芯收入实质性爆发：</strong>随台积电先进封装与存储配额扩充，第二代 AGI CPU 在 AI 推理数据中心进入数十亿美元级规模出货。',
            '<strong>研发费用增速拐点向下：</strong>前期高强度研发（56.4% 营收比）步入收获期，Non-GAAP OpEx 增速回落至 ~15%，IP/CSS 利润率向 60%+ 扩张。',
            '<strong>L3/L4 软件定义汽车量产：</strong>Zena CSS 车规计算子系统随全球头部车企新平台集中上市，单车 Arm 核心数迈向数百颗。'
          ],
          prob: '兑现确定性：中高 (75%)',
          impact: '年化营收区间：$11.5B–$16.0B'
        },
        {
          badge: 'HORIZON 3 · 冲击 $25B 终极蓝图与具身智能奇点 (2030–2032)',
          title: '数据中心成最大收入源 × 定制 AI 加速芯粒 × 人形机器人大脑标准',
          items: [
            '<strong>兑现 FY2031 双轮蓝图：</strong>官方锚定自研芯片年入 ~$15B + 授权版税年入 ~$10B（总计 ~$25B），Non-GAAP EPS 突破 $9.00+。',
            '<strong>UCIe 芯粒（Chiplet）生态霸主：</strong>通过 Arm Total Design 标准互联协议，让全球定制 AI ASIC 直接拼装 Arm CPU 控制芯粒。',
            '<strong>Physical AI 机器人操作系统底座：</strong>超 80 家生态伙伴将工业与家庭具身机器人实时运动控制与端侧世界模型统一于 Armv10/Zena 架构。'
          ],
          prob: '兑现确定性：远期战略锚 (55%–65%)',
          impact: '年化营收蓝图：$20.0B–$25.0B+'
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
          badge: 'ENGINE 01 · ARM AGI CPU IN-HOUSE SERVER SILICON',
          title: 'Arm AGI CPU（TSMC N3P · 136 核双芯粒）：直击智能体 AI 时代的机柜级算力瓶颈',
          desc: '在 Hot Chips 2026 与 OCP 全球峰会上，Arm 完整揭晓了首款自研数据中心处理器 Arm AGI CPU 的硬核架构：采用两颗各含 70 个 Neoverse V3 核心（单颗约 500 亿晶体管）的 TSMC 3nm N3P 芯粒，通过 2 TB/s UCIe 高速互联封装为最高 136 可用核、300W TDP 的旗舰处理器，支持 12 通道 DDR5-8800 与 96 通道 PCIe Gen6 / CXL 3.0。Meta 不仅作为首席联合开发伙伴将其导入 Yosemite YV5 机架，OpenAI、Cloudflare、SAP 与 Cerebras 亦纷纷跟进。',
          formula: '商业颠覆公式：单颗服务器芯片从过去仅收 $20–$60 授权版税 → 跃升至整颗数千美元硅片销售额（目标 Non-GAAP 营业利润率 ≥30%）',
          gauges: [['136 核', '双 70 核 N3P 芯粒 + 2TB/s UCIe'], ['45,696 核', 'Supermicro 200kW 液冷单机架密度'], ['>$2.0B', 'FY27–FY28 已确认客户订单需求'], ['~$15.0B', 'FY2031 官方芯片业务营收锚定值']]
        },
        {
          badge: 'ENGINE 02 · NEOVERSE CSS HYPERSCALER DOMINANCE',
          title: 'Neoverse V3 / CSS N4：吞噬全球四大云巨头自研服务器 CPU 的半壁江山',
          desc: '即便对于坚持自研芯片的超大规模云厂，Arm 依然是唯一底座：AWS 自研芯片业务（Graviton + Trainium + Nitro）年化规模已突破 $200亿，Anthropic 调用数千万颗 Graviton 核心支撑大模型工作流；Google 最新一代 TPU8t/TPU8i 全面弃用 x86 宿主处理器改配 Arm 架构 Axion；Microsoft Cobalt 铺开至核心 Azure 区域；NVIDIA 更推出集成 256 颗 Arm 架构 Vera CPU 的独立推理机柜。',
          formula: '增长乘数：云芯片核心数激增（2016年 8核 → 2025/26年 128–192核）× Neoverse CSS 翻倍版税率 → 数据中心版税连续同比翻番',
          gauges: [['~50%→60%+', '头部超算云 CPU 算力份额'], ['1.5B+ 核', 'Neoverse 累计出货服务器核心数'], ['>2.0x YoY', '连续多季数据中心版税同比增速'], ['128核/Die', '新一代 Neoverse CSS N4 Falcon']]
        },
        {
          badge: 'ENGINE 03 · MOBILE CSS 2 & SME2 ON-DEVICE AGENT AI',
          title: 'CSS for Mobile 2 × SME2 矩阵引擎：在零电量焦虑下激活数十亿手机端侧智能体',
          desc: '智能手机销量虽步入存量换机期，但常驻后台、跨应用代办任务的端侧 Agentic AI 对每瓦算力提出苛刻挑战。Arm 全新 C2 CPU 集群（C2-Ultra / C2-Pro）原生内置双 SME2 可扩展矩阵单元，将端侧智能体推理性能推高 +70%，配合首款 AI 原生神经图形架构 Mali G2-Ultra NX GPU（同功耗帧率翻 4 倍），已被 OPPO、vivo、小米与三星 Exynos 旗舰广泛采纳。',
          formula: '抗周期提价逻辑：哪怕全球手机出货量 0% 增长，从 Armv8 → Armv9 → Mobile CSS 2 的渗透依然驱动移动版税双位数复利',
          gauges: [['+70%', 'SME2 端侧智能体工作负载提速'], ['4.0x 帧率', 'Mali G2-Ultra NX AI 神经渲染'], ['Top 4 全覆盖', '前四大安卓手机厂均已出货 CSS'], ['>99%', '全球智能手机应用处理器统治率']]
        },
        {
          badge: 'ENGINE 04 · AI PC & WORKSTATION X86 DISRUPTION',
          title: 'AI PC 架构大迁徙：Apple M 系 + 骁龙 X + Googlebook 联手撕开 x86 四十年铁幕',
          desc: '据 Q2 FY2027 股东信确认，基于 Arm 架构的个人电脑已占全球 PC 总出货量约 20%！除了苹果 Mac 全系自研 M5 芯片外，Windows on Arm 阵营高通骁龙 X、联发科与 NVIDIA 联合打造的 RTX Spark 本地 AI 超算工作站，以及谷歌最新发布的 AI 原生笔记本新品类 Googlebook（专为 Gemini Intelligence 打造）正全面改写笔电市场格局。',
          formula: '增量弹性：PC 处理器芯片单价（ASP）显著高于手机 SoC，每提升 10% 全球 PC 份额即为 Arm 带来数亿美元纯增量高毛利版税',
          gauges: [['~20%', '2026Q3 Arm 架构占全球 PC 出货比'], ['Googlebook', 'Gemini 原生 AI 笔记本主力底座'], ['RTX Spark', 'NVIDIA × Arm 本地 AI 桌面工作站'], ['$250B TAM', 'FY2031 边缘与客户端 AI 潜在市场']]
        },
        {
          badge: 'ENGINE 05 · ZENA CSS & PHYSICAL AI ROBOTICS',
          title: 'Zena CSS 与 Physical AI 联盟：从单车 400 核自动驾驶迈向具身人形机器人',
          desc: '当 AI 从数字屏幕走向物理世界（自动驾驶汽车、仓储机械臂与人形机器人），毫秒级确定性实时控制与功能安全认证（ISO 26262）成为生死线。基于 Armv9-AE 打造的 Zena CSS 内置独立安全岛（Safety Island），帮车企缩短最高 12 个月芯片设计周期与 2 年软件适配期；Tensor L4 级个人自动驾驶 Robocar 单车即集成了超 400 颗 Arm CPU 核心。',
          formula: '爆发斜率：Q2 FY2027 Physical AI 版税同比飙升 +50%；Arm Total Design for Physical AI 已集结超 80 家芯片、模型与机器人伙伴',
          gauges: [['+50% YoY', 'Q2 FY27 Physical AI 版税增速'], ['400+ 核/车', 'Tensor L4 自动驾驶单车 Arm 核数'], ['-24 个月', 'Zena CSS 提前车载软件就绪时间'], ['80+ 伙伴', 'Physical AI 全球生态联盟阵容']]
        },
        {
          badge: 'ENGINE 06 · KLEIDIAI & 30M+ DEVELOPER SOFTWARE MOAT',
          title: 'KleidiAI 算子库与 3,000 万开发者：让全球大模型“零改写”直通云边端',
          desc: '任何新硬件架构最大的噩梦都是“有硅片、无软件”。Arm 将开源轻量级算子加速库 KleidiAI 直接嵌入 PyTorch、Llama.cpp、ExecuTorch、MediaPipe 与主流推理引擎底层——开发者无需手写汇编，新发布的开源大模型首日即可自动调用全球数十亿颗 Arm CPU 的 NEON、SVE2 与 SME2 矩阵硬件加速，构筑起竞争对手望尘莫及的软件护城河。',
          formula: '生态飞轮：3,000万+ 开发者（较两年前翻倍）→ 首日零摩擦跑通新模型 → 硬件厂商更坚定绑定 Armv9/CSS 底座',
          gauges: [['30M+ 人', 'Q2 FY27 全球 Arm 开发者总数'], ['Day-0 适配', '主流大模型首日原生调用 SME2'], ['云边同构', '一套二进制架构横跨机房到耳机'], ['$0 迁移费', '企业公有云与私有云无缝搬迁工作流']]
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
        var pad = { top: 28, right: 20, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.fView === 'bridge') {
          var steps = [
            { lbl: 'FY26基准', v: 4.92, b: 0, col: pal.blue, tip: 'FY2026 实际总营收: $4.92B（版税 $2.61B + 授权 $2.31B）' },
            { lbl: '+端侧CSS升级', v: 2.20, b: 4.92, col: pal.violet, tip: '智能手机与 AI PC 升级 Armv9 / Mobile CSS 2 贡献增量版税 +$2.2B' },
            { lbl: '+云与物理AI版税', v: 2.90, b: 7.12, col: pal.green, tip: 'Neoverse 云份额扩张与 Zena 车载/机器人带动 IP/CSS 总盘迈向 ~$10.0B' },
            { lbl: '+AGI整芯核心盘', v: 9.00, b: 10.02, col: pal.amber, tip: 'Meta / OpenAI / 企业液冷机架规模部署 Arm AGI CPU 贡献 +$9.0B' },
            { lbl: '+下一代AI硅片', v: 6.00, b: 19.02, col: pal.green, tip: '多代数据中心 CPU 与定制芯粒放量补齐 $15B 硅片目标' },
            { lbl: 'FY31E蓝图', v: 25.02, b: 0, col: pal.blue, tip: '管理层官方 FY2031 目标蓝图: ~$25.0B 总营收，Non-GAAP EPS >$9.00' }
          ];
          var maxB = 28.0;
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
            ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(1) + 'B', x + bW / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
            hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
          });
        } else {
          var metrics = [
            { name: '传统 x86 机架基准', perf: 1.0, col: pal.amber, tip: '传统双路 x86 服务器机架基准吞吐 = 1.00x，受限于单机架功耗墙' },
            { name: 'Google Axion (TPU8)', perf: 1.8, col: pal.blue, tip: 'TPU8i 改配 Arm 架构 Axion 宿主 CPU 后，每美元推理性能提升高达 +80% (1.8x)' },
            { name: 'Arm AGI CPU 液冷机架', perf: 2.0, col: pal.green, tip: 'OCP 验证单机架智能体编排吞吐达 x86 平台 2.0 倍以上，每 GW 数据中心节省最高 $10B CapEx！' },
            { name: 'Agentic CPU 配比扩张', perf: 4.0, col: pal.violet, tip: '自主智能体并发运行使每吉瓦数据中心所需 CPU 容量较传统架构激增 4.0 倍以上' }
          ];
          var maxP = 4.6;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxP / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(gv.toFixed(1) + 'x', pad.left - 8, gy + 4);
          }
          var slot = pw / metrics.length, bw = Math.min(50, slot * 0.54);
          metrics.forEach(function (m, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (m.perf / maxP) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = m.col;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(m.perf.toFixed(1) + 'x', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(m.name, x + bw / 2, pad.top + ph + 20);
            hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: m.name, body: m.tip });
          });
        }
      }

      function drawSiliconCanvas() {
        var env = prepCanvas('siliconCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.siliconCanvas = [];
        var pad = { top: 28, right: 22, bottom: 40, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.sView === 'cloud') {
          var yrs = ['CY2022', 'CY2024', 'CY2025', 'CY26E(指引)', 'CY2028E', 'CY2030E'];
          var hypShare = [10, 15, 50, 60, 66, 70];
          var pcShare = [9, 11, 15, 20, 28, 35];
          for (var g = 0; g <= 4; g++) {
            var gv = g * 20, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(gv + '%', pad.left - 8, gy + 4);
          }
          function plotP(arr, col, label) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 80) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 80) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 2 || idx === 3 || idx === 5) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText(v + '%', px, py - 8);
              }
              hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '市场份额约 ' + v + '%' });
            });
          }
          yrs.forEach(function (y, idx) {
            var px = pad.left + (idx / 5) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(y, px, pad.top + ph + 20);
          });
          plotP(hypShare, pal.blue, '头部超大规模云厂商 CPU 算力份额');
          plotP(pcShare, pal.green, '全球个人电脑 (AI PC) 出货份额');
        } else {
          var tams = [
            { name: 'Cloud AI (云与数据中心)', fy26: 330, fy31: 1150, col: pal.blue },
            { name: 'Edge AI (手机/PC/IoT)', fy26: 180, fy31: 250, col: pal.violet },
            { name: 'Physical AI (智驾/机器人)', fy26: 25, fy31: 50, col: pal.green }
          ];
          var maxT = 1300;
          for (var m = 0; m <= 4; m++) {
            var mv = Math.round((maxT / 4) * m), my = pad.top + ph - (m / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4);
          }
          var slot = pw / tams.length;
          tams.forEach(function (t, i) {
            var cx = pad.left + i * slot + slot / 2, bw = 32;
            var h26 = Math.max(5, (t.fy26 / maxT) * ph), h31 = Math.max(8, (t.fy31 / maxT) * ph);
            ctx.fillStyle = pal.amber;
            roundRect(ctx, cx - bw - 4, pad.top + ph - h26, bw, h26, 5); ctx.fill();
            ctx.fillStyle = t.col;
            roundRect(ctx, cx + 4, pad.top + ph - h31, bw, h31, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + t.fy26 + 'B', cx - bw / 2 - 4, pad.top + ph - h26 - 6);
            ctx.fillText('$' + t.fy31 + 'B', cx + bw / 2 + 4, pad.top + ph - h31 - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(t.name, cx, pad.top + ph + 20);
            hits.siliconCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: t.name + ' TAM 扩张', body: 'FY2026 $' + t.fy26 + 'B → FY2031E $' + t.fy31 + 'B+' });
          });
        }
      }

      // F4: Interactive FY2031 Optionality Builder + Mini Canvas
      var OPT_DATA = {
        css: { rev: 2.2, net: 1.31 },
        cloudip: { rev: 1.9, net: 1.10 },
        phys: { rev: 1.4, net: 0.77 },
        agi_core: { rev: 9.0, net: 2.37 },
        agi_full: { rev: 6.0, net: 1.68 }
      };
      var miniCaps = [175, 198, 330];

      function drawOptMiniCanvas() {
        var env = prepCanvas('optMiniCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 22, right: 18, bottom: 24, left: 48 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = ['FY26基准估值', 'FY31纯IP基础盘', 'FY31含勾选项'];
        var maxV = Math.max(260, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        var slot = pw / 3, bw = Math.min(54, slot * 0.5);
        miniCaps.forEach(function (v, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + Math.round(v) + 'B', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
          ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
        });
      }

      function recalcOptionality() {
        // Organic IP base FY31E without extra optionality escalators: $4.92Brev -> ~$4.9B base + organic inflation = $4.9B -> $4.92B, let's set base organic FY31 IP rev = $4.9B, Non-GAAP Net = $2.70B, diluted shares ~1.10B
        var baseRev = 4.92, baseNet = 2.70, sh2031 = 1.10;
        var addRev = 0, addNet = 0;
        document.querySelectorAll('[data-opt]').forEach(function (chk) {
          if (chk.checked) {
            var d = OPT_DATA[chk.getAttribute('data-opt')];
            if (d) { addRev += d.rev; addNet += d.net; }
          }
        });
        var totRev = baseRev + addRev;
        var totNet = baseNet + addNet;
        var eps = totNet / sh2031;
        var mcapB = totNet * state.pe;
        var baseMcapB = baseNet * state.pe;

        document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(1) + 'B';
        document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(2) + 'B';
        document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
        document.getElementById('optCapOut').textContent = '$' + Math.round(mcapB) + 'B';

        miniCaps = [175, baseMcapB, mcapB];
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
          state.pe = parseInt(b.getAttribute('data-pe'), 10) || 40;
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
            tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
            tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
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
        { id: 'sec-f0', t: 'F0 整芯破局宣言与三阶时间窗雷达', s: 'Arm AGI CPU 首发 · 2026–2032 近程/中程/远期三大兑现阶段' },
        { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'AGI CPU · Neoverse CSS · Mobile CSS 2 · AI PC · Zena 机器人 · KleidiAI' },
        { id: 'sec-f2', t: 'F2 智能体机架经济学与 $25B 营收桥', s: '每 GW 省 $10B CapEx · FY26 $4.92B 迈向 FY31E $25B 阶梯' },
        { id: 'sec-f3', t: 'F3 全栈架构矩阵与 $1.5T TAM 扩张', s: '头部云厂 CPU 份额迈过 60% · Cloud/Edge/Physical 三大赛道扩容' },
        { id: 'sec-f4', t: 'F4 FY2031 冲击 $25B 营收期权组装器', s: '自由开关五大新业务催化剂与估值倍数实时测算 Non-GAAP EPS' }
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

      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
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
            setTimeout(drawAll, 60);
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
          a.download = 'Arm_未来十年(2026-2032)战略图谱.html';
          a.click();
          setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
          showToast('已开始下载独立网页：Arm_未来十年(2026-2032)战略图谱.html');
        });
      }
      var prtBtn = document.getElementById('printPdfBtn');
      if (prtBtn) prtBtn.addEventListener('click', function () { window.print(); });

      window.addEventListener('scroll', function () {
        var bar = document.getElementById('readingProgressBar');
        if (bar) {
          var dh = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
        }
      }, { passive: true });

      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
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
  