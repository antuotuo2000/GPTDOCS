
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

      var state = { theme: 'dark', lang: 'zh', fView: 'bridge', sView: 'triad', pe: 24 };
      var hits = { futureCanvas: [], siliconCanvas: [] };

      function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
      function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

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
          violet: dark ? '#A78BFA' : '#7C3AED',
          green: dark ? '#22C55E' : '#16A34A',
          amber: dark ? '#FFB74D' : '#D97706',
          red: dark ? '#FF6B6B' : '#DC2626'
        };
      }

      function applyTheme(t, silent) {
        state.theme = (t === 'dark') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        
        
        safeSet(STORAGE_THEME_KEY, state.theme);
        drawAll();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至清晰浅色模式');
      }

      function applyLang(lang, silent) {
        state.lang = (lang === 'en') ? 'en' : 'zh';
        document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
        document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
        document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
          if (val !== null) {
            if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
            else nodes[i].textContent = val;
          }
        }
        safeSet(STORAGE_LANG_KEY, state.lang);
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      /* F0: 3-Horizon Radar Switcher */
      var HORIZONS = [
        {
          badge: 'HORIZON 1 · 产能爬坡与关税消化期 (2026–2027)',
          title: 'Görlitz / Arouca 扩建收官 × Wittichenau 投产 × 直营店破 160 家',
          items: [
            '<strong>FY26 上调指引兑现：</strong>营收冲刺 €2.30B–€2.35B（+15% cc），调整后 EBITDA ≥€710M。',
            '<strong>欧洲产线合拢：</strong>2026 年底 Görlitz 与葡萄牙 Arouca 完工，2027 年 Wittichenau 棕地工厂投产。',
            '<strong>自由现金流跃升：</strong>标普预计年度 FOCF 由 €2.1–2.4亿 跃升至 2027 年的 €2.9–3.2亿。'
          ],
          prob: '兑现确定性：极高 (90%+)',
          impact: '阶段目标营收：€2.33B → €2.68B'
        },
        {
          badge: 'HORIZON 2 · CMD €30亿里程碑达成期 (2028–2029)',
          title: '兑现净增 €10亿营收承诺 × 亚太翻倍 × 闭口鞋占比突破 45%',
          items: [
            '<strong>跨越 €30亿大关：</strong>按 13%–15% cc CAGR 兑现 CMD 头条承诺，新厂固定成本摊薄拉动毛利率重返 60%。',
            '<strong>亚太三年翻倍：</strong>大中华区、印度与日韩直营及单品牌合作店共振，亚太营收迈过 €4.5亿–€5.5亿。',
            '<strong>持续缩股增厚：</strong>净杠杆回落至 <1.5x 舒适区，常态化 €2亿+/年回购驱动 EPS 跑赢营收 200bps+。'
          ],
          prob: '兑现确定性：高 (80%)',
          impact: '阶段目标营收：€3.05B → €3.48B'
        },
        {
          badge: 'HORIZON 3 · 全球三足鼎立与全天候足床生态 (2030–2032)',
          title: '迈向“美/欧/亚各 1/3”终极均衡 × Blue Footbed 鞋垫赋能外部鞋履',
          items: [
            '<strong>亚太迈向 25%–33% 权重：</strong>复制美洲过去十年增长 30 倍的奇迹，彻底消除单一欧美市场宏观依赖。',
            '<strong>Blue Footbed 独立大单品：</strong>将百年矫形鞋床植入数以亿计的正装皮鞋与跑步运动鞋，打开高频替换耗材池。',
            '<strong>医护厨师 B2B 与睡眠系统：</strong>Professional 认证安全鞋与居家健康产品构筑跨场景护城河。'
          ],
          prob: '兑现确定性：中高期权 (65%)',
          impact: '远期营收蓝图：€4.0B – €4.6B+'
        }
      ];
      document.getElementById('hzTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-hz]');
        if (!b) return;
        var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
        this.querySelectorAll('.ft-hz-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        var hz = HORIZONS[idx];
        document.getElementById('hzBadge').textContent = hz.badge;
        document.getElementById('hzTitle').textContent = hz.title;
        document.getElementById('hzList').innerHTML = hz.items.map(function (t) {
          return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
        }).join('');
        document.getElementById('hzProb').textContent = hz.prob;
        document.getElementById('hzImpact').textContent = hz.impact;
      });

      /* F1: 6-Engine Master-Detail Explorer */
      var ENGINES = [
        {
          badge: 'ENGINE 01 · APAC WHITE-SPACE HYPERGROWTH',
          title: '亚太区双倍速裂变：从仅占营收 11% 的洼地迈向“全球三分天下有其一”',
          desc: '在欧美成熟市场，勃肯早已是国民级鞋柜标配；但在亚太区，FY2025 营收仅 €2.218 亿（占集团 10.6%）。在 L Catterton 亚洲顶级商业地产网络加持下，勃肯已在上海、成都、东京、孟买与新加坡密集开设 53 家自营直营店（并收购澳洲经销商收回直营权），FY25 亚太增长 +34% cc、Q3 FY26 大中华区同比跃升 +50%，且亚太消费者更偏爱高单价麂皮闭口款。',
          formula: '变现公式：亚太年均 ~25%–30% cc 增速（集团两倍速）× 直营主导高 ASP → 三年内亚太营收翻倍破 €4.5亿+',
          gauges: [['+34% cc', 'FY2025 亚太区固定汇率增速'], ['+50% YoY', 'Q3 FY26 大中华区同比增速'], ['53 家直营', '占全球 124 家自营门店 43%'], ['11% → 33%', 'CMD 远期三大战区均衡愿景']]
        },
        {
          badge: 'ENGINE 02 · CLOSED-TOE 4-SEASON EXPANSION',
          title: '闭口鞋、乐福鞋与靴履矩阵：把“半年凉鞋生意”彻底升级为“四季衣橱刚需”',
          desc: 'CPO Dr. Markus Baum 领衔的产品工程团队围绕经典鞋床持续孵化爆款闭口廓形：除了长年断货的 Boston 博肯包头鞋，带后跟扣带的 Tokio、切入通勤商务风的 Naples 乐福鞋、Utti 莫卡辛鞋、Bend 休闲板鞋及 Highwood 切尔西靴全面开花，闭口鞋占比从 FY21 的 15% 飙升至 FY25 的 38%，并正向 50% 迈进。',
          formula: '变现公式：单双售价高出凉鞋 35%–60% + 秋冬 Q1/Q4 季度门店坪效翻倍 → 驱动全集团 ASP 年均提升 3%–5%',
          gauges: [['15% → 38%', 'FY21–FY25 闭口鞋占比跃升'], ['+35%–60%', '闭口鞋相比经典凉鞋溢价幅度'], ['四季无淡季', '彻底对冲北半球寒冷气候影响'], ['Arouca 扩产', '葡萄牙基地专攻复杂闭口鞋帮']]
        },
        {
          badge: 'ENGINE 03 · HIGH-PAYBACK OWN RETAIL & DIGITAL MEMBERSHIP',
          title: '精益高坪效直营店（124 → 220+ 家）与官网千万级私域会员闭环',
          desc: '批发商往往只敢进最安全的棕黑双色 Arizona/Boston，而勃肯自营门店与官网（birkenstock.com，会员数已逾千万）则完整陈列靴履、1774 限量款、童鞋与护理周边。单店仅 €40–80万 的克制装修投入配合高连带率，造就了 12–18 个月回本的恐怖零售经济学。',
          formula: '变现公式：DTC 渠道毛利率较批发高出 >1,000bps × Q3 FY26 DTC (+16% cc) 增速反超批发 → 持续增厚集团毛利池',
          gauges: [['124 家', '截至 2026.06 全球自营门店数'], ['€40–80万', '单店精益建店 CapEx 预算'], ['12–18个月', '行业罕见的极速现金回本周期'], ['+16% cc', 'Q3 FY2026 DTC 加速领跑增速']]
        },
        {
          badge: 'ENGINE 04 · PASEWALK & WITTICHENAU CAPACITY UNLOCK',
          title: '突破供给瓶颈：€1.2亿 Pasewalk 爬坡 + Wittichenau 棕地工厂接力',
          desc: '过去两年勃肯热门码段在零售终端频繁断货，制约了本可更高的销量转化。随着 €1.2亿 Pasewalk 工厂良率成熟、2026 年底 Görlitz 与 Arouca 扩建收官，以及 €1,800万收购的萨克森州 Wittichenau 工厂于 2027 年投产，勃肯锁定了支撑未来五年每年 +10% 双数增长的欧洲本土产能。',
          formula: '变现公式：新增产能释放 +10% 双数 CAGR + 固定折旧摊薄 → 对冲关税逆风并守护 >30% EBITDA 利润率',
          gauges: [['€120M', 'Pasewalk 新厂历史最大投资'], ['€110–130M', 'FY2026 年度扩产与IT总CapEx'], ['2027 投产', 'Wittichenau 新制造基地时间表'], ['+10% CAGR', 'CMD 锚定年均销售双数增速']]
        },
        {
          badge: 'ENGINE 05 · BLUE FOOTBED "TROJAN HORSE" ECOSYSTEM',
          title: 'Blue Footbed 蓝鞋垫与足部护理：把所有其他品牌的鞋变成“内部勃肯”',
          desc: '即便消费者在跑步、正装或户外场景必须穿运动鞋或皮鞋，售价 €60–€70 的德国产 Blue Footbed 蓝鞋垫也能直接置入第三方鞋履中提供完全一致的勃肯足弓支撑。配合高毛利棉麻分趾袜、软木防水喷雾与天然足部护理霜，打开高频低单价连带销售空间。',
          formula: '变现公式：跨品牌全天候穿着场景渗透 + 门店结账台高毛利连带搭售（提升客单价 UPT）',
          gauges: [['1925 诞生', 'Blue Footbed 百年矫形专利积淀'], ['€60–€70', '独立鞋垫高毛利零售价格带'], ['全鞋履兼容', '无缝植入运动鞋/工装靴/正装鞋'], ['连带增厚', '显著拉升自营门店客单件数']]
        },
        {
          badge: 'ENGINE 06 · 1774 COUTURE HALO & PROFESSIONAL B2B',
          title: '哑铃两端齐飞：巴黎 1774 顶奢秀场破圈 × 医护餐饮 Professional 刚需工装',
          desc: '在时尚金字塔尖，巴黎 1774 工作室通过 $395 Uerzell 穆勒鞋及与 Dior、Etro 等顶奢联名持续制造社交媒体稀缺话题；在专业功能底座，通过欧盟认证的 Super-Birki、QS 防砸防滑职业鞋深耕全球外科医生、护士、星级主厨与园艺技工刚需市场，构筑零时尚波动的稳固底盘。',
          formula: '变现公式：1774 拉高品牌溢价锚点 + Professional B2B 锁定高强度每日 10 小时站立刚需人群',
          gauges: [['€395–€500+', '1774 巴黎高定线零售定价'], ['ISO 认证', '医护/后厨防滑抗静电安全标准'], ['零广告破圈', '时装周买手与名厨自发背书'], ['双向护城河', '顶奢审美与硬核功能完美闭环']]
        }
      ];
      document.getElementById('engineRail').addEventListener('click', function (e) {
        var b = e.target.closest('[data-eng]');
        if (!b) return;
        var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
        this.querySelectorAll('.ft-rail-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        var eg = ENGINES[idx];
        document.getElementById('engBadge').textContent = eg.badge;
        document.getElementById('engTitle').textContent = eg.title;
        document.getElementById('engDesc').textContent = eg.desc;
        document.getElementById('engFormula').textContent = eg.formula;
        document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
          return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
        }).join('');
      });

      /* High-DPI Retina Canvas Engine */
      function prepCanvas(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(250, rect.width || 480), h = Math.max(135, rect.height || 260);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        var ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { c: c, ctx: ctx, w: w, h: h };
      }

      function roundRect(ctx, x, y, w, h, r) {
        if (w <= 0 || h <= 0) return;
        var rr = Math.min(r, w / 2, h / 2);
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
            { lbl: 'FY25实绩', v: 2097, b: 0, col: pal.blue, tip: 'FY2025 实际总营收: €2,097.4M' },
            { lbl: '+欧美深耕', v: 680, b: 2097, col: pal.green, tip: '美洲与 EMEA 精选门店扩品及直营复利贡献 +€680M' },
            { lbl: '+亚太爆发', v: 580, b: 2777, col: pal.violet, tip: '大中华区、印度与日韩双倍速扩张贡献 +€580M' },
            { lbl: '+闭口鞋升级', v: 520, b: 3357, col: pal.amber, tip: 'Boston/Naples/靴履占比迈向 50% 带来增量 +€520M' },
            { lbl: '+鞋垫/职业鞋', v: 280, b: 3877, col: pal.green, tip: 'Blue Footbed 蓝鞋垫、护理周边与医护工装鞋贡献 +€280M' },
            { lbl: 'FY32E蓝图', v: 4157, b: 0, col: pal.blue, tip: 'FY2032E 远期营收蓝图: ~€4.16B（2028 CMD 先跨过 €3.0B+ 里程碑）' }
          ];
          var maxB = 4600;
          for (var k = 0; k <= 4; k++) {
            var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('€' + (kv / 1000).toFixed(1) + 'B', pad.left - 8, ky + 4);
          }
          var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
          steps.forEach(function (s, i) {
            var x = pad.left + i * sW + (sW - bW) / 2;
            var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
            var yb = pad.top + ph - (s.b / maxB) * ph;
            var bh = Math.max(5, yb - yt);
            ctx.fillStyle = s.col; roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText((s.b > 0 ? '+' : '') + '€' + s.v + 'M', x + bW / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
            hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
          });
        } else {
          var yrs = ['FY23(新厂)', 'FY24', 'FY25', 'FY26E', 'FY27E'];
          var capex = [105, 88, 96, 120, 105];
          var focf = [145, 210, 260, 225, 305];
          var maxF = 350;
          for (var g = 0; g <= 3; g++) {
            var gy = pad.top + ph - (g / 3) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('€' + Math.round((maxF / 3) * g) + 'M', pad.left - 8, gy + 4);
          }
          var slot = pw / yrs.length, bw = 24;
          yrs.forEach(function (y, idx) {
            var cx = pad.left + idx * slot + slot / 2;
            var ch = (capex[idx] / maxF) * ph, fh = (focf[idx] / maxF) * ph;
            ctx.fillStyle = pal.amber; roundRect(ctx, cx - bw - 3, pad.top + ph - ch, bw, ch, 4); ctx.fill();
            ctx.fillStyle = pal.green; roundRect(ctx, cx + 3, pad.top + ph - fh, bw, fh, 4); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('€' + focf[idx] + 'M', cx + bw / 2 + 3, pad.top + ph - fh - 6);
            ctx.fillStyle = pal.tick; ctx.fillText(y, cx, pad.top + ph + 20);
            hits.futureCanvas.push({ x: cx - bw - 4, y: pad.top, w: bw * 2 + 8, h: ph, title: y + ' 现金流与扩产投入', body: '扩产 CapEx: €' + capex[idx] + 'M vs 自由经营现金流 FOCF: €' + focf[idx] + 'M' });
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
        var yrs = ['FY23', 'FY25', 'FY27E', 'FY29E', 'FY31E', '远期终局'];

        if (state.sView === 'triad') {
          var am = [54, 52, 48, 44, 39, 34];
          var em = [36, 37, 36, 35, 34, 33];
          var ap = [10, 11, 16, 21, 27, 33];
          for (var g = 0; g <= 3; g++) {
            var gy = pad.top + ph - (g / 3) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText((g * 20) + '%', pad.left - 8, gy + 4);
          }
          function plotP(arr, col, label) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 60) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 60) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 1 || idx === 5) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText(v + '%', px, py - 8);
              }
              hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '占集团营收比重: ' + v + '%' });
            });
          }
          yrs.forEach(function (y, idx) {
            var px = pad.left + (idx / 5) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(y, px, pad.top + ph + 20);
          });
          plotP(am, pal.blue, '美洲区 Americas');
          plotP(em, pal.violet, '欧洲中东非 EMEA');
          plotP(ap, pal.green, '亚太区 APAC (双倍速崛起)');
        } else {
          var pYrs = ['FY23', 'FY25', 'FY26E', 'FY28E', 'FY30E', 'FY32E'];
          var pairs = [30.5, 36.8, 40.5, 49.0, 59.3, 71.7];
          var maxP = 80;
          for (var m = 0; m <= 4; m++) {
            var my = pad.top + ph - (m / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText((m * 20) + 'M', pad.left - 8, my + 4);
          }
          var slot = pw / pYrs.length, bw = Math.min(38, slot * 0.54);
          pYrs.forEach(function (y, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (pairs[i] / maxP) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(pairs[i].toFixed(1) + 'M', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
            hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 年产销鞋履双数', body: '预计全年销售约 ' + pairs[i].toFixed(1) + 'M 双（按 CMD +10% 双数 CAGR 推演）' });
          });
        }
      }

      /* F4: Interactive 2030 Optionality Builder */
      var OPT_DATA = {
        apac: { rev: 0.42, net: 0.088 },
        closed: { rev: 0.38, net: 0.082 },
        dtc: { rev: 0.31, net: 0.076 },
        insole: { rev: 0.19, net: 0.044 },
        tariff: { rev: 0.00, net: 0.072 }
      };
      var miniCaps = [6.2, 10.3, 17.2];

      function drawOptMiniCanvas() {
        var env = prepCanvas('optMiniCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 22, right: 18, bottom: 24, left: 46 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前折价市值', '2030基础盘', '2030含期权'];
        var maxV = Math.max(18, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        var slot = pw / 3, bw = Math.min(52, slot * 0.5);
        miniCaps.forEach(function (v, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('€' + v.toFixed(1) + 'B', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
          ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
        });
      }

      function recalcOptionality() {
        var baseRev = 2.65, baseNet = 0.428, sh2030 = 0.154; // billion EUR, billion shares after buybacks
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
        var mcapB = totNet * state.pe;
        var baseMcapB = baseNet * state.pe;

        document.getElementById('optRevOut').textContent = '€' + totRev.toFixed(2) + 'B';
        document.getElementById('optNetOut').textContent = '€' + Math.round(totNet * 1000) + 'M';
        document.getElementById('optEpsOut').textContent = '€' + eps.toFixed(2);
        document.getElementById('optCapOut').textContent = '€' + mcapB.toFixed(1) + 'B';

        miniCaps = [6.2, baseMcapB, mcapB];
        drawOptMiniCanvas();
      }
      document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
      document.getElementById('peTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-pe]');
        if (!b) return;
        state.pe = parseInt(b.getAttribute('data-pe'), 10) || 24;
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        recalcOptionality();
      });

      document.getElementById('fChartTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-fview]');
        if (!b) return;
        state.fView = b.getAttribute('data-fview');
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        drawFutureCanvas();
      });
      document.getElementById('sChartTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-sview]');
        if (!b) return;
        state.sView = b.getAttribute('data-sview');
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        drawSiliconCanvas();
      });

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
            tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
            tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
          } else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

      function drawAll() { drawFutureCanvas(); drawSiliconCanvas(); drawOptMiniCanvas(); }

      /* Quick Jump ⌘K */
      var QITEMS = [
        { id: 'sec-f0', t: 'F0 2026 CMD宣言与三阶战略时间窗', s: '三年净增€10亿营收达€30亿+ · 近程/中程/远期确定性雷达' },
        { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: '亚太翻倍 · 闭口鞋50% · 220+直营店 · 新厂扩容 · 蓝鞋垫木马' },
        { id: 'sec-f2', t: 'F2 反共识自建厂纪律与 2032 营收桥', s: '年度扩产CapEx与FOCF跃升 · 迈向 €41.6亿 营收阶梯桥' },
        { id: 'sec-f3', t: 'F3 欧洲七大制造基地主权与三足鼎立', s: 'Pasewalk / Görlitz / Wittichenau / Arouca · 1/3亚太演进' },
        { id: 'sec-f4', t: 'F4 2030 市值倍增期权组装实验室', s: '自由勾选五大业务期权与 P/E 倍数实时推演目标市值' }
      ];
      var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQ(kw) {
        var q = (kw || '').trim().toLowerCase();
        var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
        qPop.innerHTML = m.map(function (x) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
      }
      qIn.addEventListener('focus', function () { renderQ(qIn.value); });
      qIn.addEventListener('input', function () { renderQ(qIn.value); });
      qPop.addEventListener('click', function (e) {
        var jb = e.target.closest('[data-jump]');
        if (!jb) return;
        var target = document.querySelector(jb.getAttribute('data-jump'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        qPop.classList.remove('open');
      });
      document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
      document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

      /* Sidebar, Hub & Export */
      document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
        if (window.innerWidth < 1024) document.body.classList.toggle('drawer-open');
        else {
          var cur = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
          if (cur) document.documentElement.removeAttribute('data-sidebar-collapsed');
          else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
          safeSet('mui_portal_sidebar_collapsed_v1', cur ? '0' : '1');
          setTimeout(drawAll, 60);
        }
      });
      document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });

      var hub = document.getElementById('companySubfolderHub');
      hub.addEventListener('click', function (e) {
        var cb = e.target.closest('[data-co-cat]');
        if (cb) {
          var cat = cb.getAttribute('data-co-cat');
          hub.querySelectorAll('[data-co-cat]').forEach(function (p) { p.classList.toggle('active', p === cb); });
          hub.querySelectorAll('[data-co-item-cat]').forEach(function (it) { it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat)); });
          return;
        }
        var jb = e.target.closest('[data-suite-jump]');
        if (jb) {
          var target = jb.getAttribute('data-suite-jump');
          if (target === 'current') window.scrollTo({ top: 0, behavior: 'smooth' });
          else showToast('配套网页《' + target + '》已同步生成供下载');
        }
      });

      
      
      document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
      
      
      document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
      document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });

      window.addEventListener('scroll', function () {
        var dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / dh) * 100) + '%';
      }, { passive: true });

      applyTheme((safeGet(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((safeGet(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      recalcOptionality();
      drawAll();
      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
    })();
  