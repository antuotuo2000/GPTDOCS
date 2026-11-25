
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_STRESS_KEY = 'birk_bm_stress_v1';

      var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'ltv', kView: 'lev' };
      var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

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
        
        
        safeSet(STORAGE_THEME_KEY, state.theme);
        drawAllCharts();
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
        drawAllCharts();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      /* 1. 3-Lens Switcher */
      var LENSES = [
        {
          formula: '营业利润率优势 (EBIT 26.2% vs 耐克 8.3%) = 奢品级毛利率 (59.1%) - $0 天价球星代言税 + 90%+ 自然口碑获客',
          body: '传统运动鞋巨头每年必须将 10%–12% 的总营收（如耐克年投 $47.5亿）支付给体育明星与流量平台维持热度；勃肯将营销建立在“穿十年不坏的足弓矫形口碑”与文化自发破圈上，省下的整块营销税直接转化为行业顶尖的 EBITDA 现金流。'
        },
        {
          formula: '单双均价跃升 (+19% FY21–23 CAGR) = 闭口鞋占比扩张 (15%→38%) × DTC直营渗透率提升 (34%→38%+) × 年度温和提价',
          body: '同样一块德国制造软木鞋床，做成经典凉鞋售价 €120，做成麂皮包头 Boston / Naples 乐福鞋售价跃升至 €170–€220，且直营门店收回了批发商约 45%–50% 的渠道价差，实现毛利额成倍放大。'
        },
        {
          formula: '全渠道正价率 (>90%) = 批发订单满足率卡死在 70%–80% → 零售伙伴零季末库存恐慌 → 自发拒绝打折促销',
          body: '当百货与精选买手店清楚知道“勃肯热门款永远差 20%–30% 不够卖、一旦打折下季度配额立即被砍”时，传统鞋服业最致命的季末五折清仓螺旋被彻底消灭。'
        }
      ];
      document.getElementById('lensTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-lens]');
        if (!b) return;
        var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        document.getElementById('lensFormula').textContent = LENSES[idx].formula;
        document.getElementById('lensBody').innerHTML = LENSES[idx].body;
      });

      /* 2. 5-Node Pipeline Inspector */
      var NODES = [
        {
          badge: 'NODE 01 · 1896 ANATOMICAL FOOTBED MONOPOLY',
          title: '四层天然材质鞋床：把“快消易耗品”变成超越潮流周期的矫形基础设施',
          desc: '勃肯自 1896 年发明弹性鞋床以来，底层四层复合工艺（底层黄麻 + 软木乳胶烘焙核心 + 上层黄麻吸湿 + 绒面牛皮衬里）逾百年未变。这不仅使模具与欧洲原材料采购具备极强规模经济，更免除了传统鞋企“每季押注新鞋型、押错全线计提减值”的宿命。',
          formula: '商业传导：100% 德国自产鞋床 + 零季节性过时风险 → 季末库存无需打折倾销 → 锁定 ~59%–62% 行业顶级毛利率',
          kpis: [['100%', '全球每一块勃肯鞋床德国自产'], ['>90%', '软木/皮革/铜扣源自欧洲本土'], ['50+ 道工序', '自动化激光裁切结合匠人贴合'], ['0 过时减值', '四大常青款畅销 50–60 年不衰']]
        },
        {
          badge: 'NODE 02 · €55 TO €500 PRICE ARCHITECTURE',
          title: 'EVA 亲民漏斗 × 闭口鞋高单价跃迁：通吃大众入门与静奢客群',
          desc: '勃肯用 €55 的德国产 EVA 水洗凉鞋降低年轻人尝试第一双勃肯的门槛；一旦体验到足弓支撑魅力，用户迅速向 €125 经典麂皮款、€180+ Boston/Naples 闭口四季鞋乃至 €400–€500 的 1774 高定联名款拾级而上。',
          formula: '商业传导：EVA 零买量拓新 + 闭口鞋占比从 15% 升至 38% → 抹平秋冬淡季并持续拉升全集团 ASP',
          kpis: [['€55–€75', 'EVA 入门引流系列价格带'], ['38.0%', 'FY2025 闭口鞋营收贡献占比'], ['+19% CAGR', 'FY21–FY23 单双均价复合增速'], ['€500 锚点', '1774 巴黎高定系列价格天花板']]
        },
        {
          badge: 'NODE 03 · ENGINEERED DISTRIBUTION SCARCITY',
          title: '70%–80% 饥饿配额分销：把 B2B 批发做成高利润现金奶牛',
          desc: '市场常以为只有纯 DTC 才能高毛利，但勃肯的 B2B 批发（占 62%）EBITDA 利润率极高——因为公司只挑选全球最优买手与鞋履门店，且主动只满足 70%–80% 的订货需求，在大批量整单出货省去门店租金的同时实现了 >90% 正价售罄。',
          formula: '商业传导：主动留白 20%–30% 批发需求 → 精选现有门店同店双位数内生增长 → 批发与直营双双 >90% 全价成交',
          kpis: [['70%–80%', '批发订单簿目标满足率上限'], ['>90%', '全渠道终端正价实现率'], ['€1,297.9M', 'FY2025 B2B 批发稳健营收'], ['+15% cc', 'Q3 FY2026 B2B 固定汇率增速']]
        },
        {
          badge: 'NODE 04 · BIOMECHANICAL BREAK-IN LOCK-IN',
          title: '越穿越贴合的“个人足模”：驱动人均 3.6 双收藏级复购',
          desc: '软木乳胶鞋床随穿着者体温与步态压力自然下陷塑形，穿满一个月后即成为全球独一无二的私人定制矫形垫。这种物理层面的舒适依赖让美国勃肯消费者平均拥有 3.6 双不同款式，超 70% 买单来自回头客。',
          formula: '商业传导：专属足弓塑形转换壁垒 → 老客跨场景增购（居家拖+夏凉鞋+秋冬包头鞋） → 极高终身毛利 LTV',
          kpis: [['3.6 双', '美国成熟消费者人均持有双数'], ['>70%', '老客复购贡献订单比例'], ['~90%', '非付费自然口碑获客占比'], ['可换底维修', '延长产品生命周期强化品牌信仰']]
        },
        {
          badge: 'NODE 05 · HIGH-PAYBACK RETAIL & SHARE RETIREMENT',
          title: '12–18 个月极速回本直营店 + 强现金流降债与回购注销',
          desc: '全球 124 家自营门店（其中亚太已达 53 家）以 €40–80万 精益建店投入实现 12–18 个月快速回本，全面展示批发商拿不到的闭口新品；充沛 EBITDA 现金流一边支持德国扩产，一边推进每年 ~€2亿 股份回购注销。',
          formula: '商业传导：€667M–€710M+ 年度 Adj. EBITDA → 自给自足覆盖 €120M 扩产 CapEx + 持续缩股增厚 EPS (15%–17% CAGR)',
          kpis: [['124 家', 'Q3 FY26 全球自营直营门店数'], ['12–18个月', '单店 €40–80万 CapEx 回本周期'], ['1.5x–1.7x', '净债务/EBITDA 稳健杠杆区间'], ['€200M+/年', '常态化股票回购注销力度']]
        }
      ];
      document.getElementById('pipelineTrack').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-node]');
        if (!btn) return;
        var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
        this.querySelectorAll('.bm-node-btn').forEach(function (x) { x.classList.toggle('active', x === btn); });
        var nd = NODES[idx];
        document.getElementById('nodeBadge').textContent = nd.badge;
        document.getElementById('nodeTitle').textContent = nd.title;
        document.getElementById('nodeDesc').textContent = nd.desc;
        document.getElementById('nodeFormula').textContent = nd.formula;
        document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
          return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
        }).join('');
      });

      /* 3. Filters & Cohort Persona Switcher */
      document.getElementById('tierFilter').addEventListener('click', function (e) {
        var b = e.target.closest('[data-tcat]');
        if (!b) return;
        var cat = b.getAttribute('data-tcat');
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        document.querySelectorAll('#tierList [data-tier]').forEach(function (c) {
          c.style.display = (cat === 'all' || c.getAttribute('data-tier') === cat) ? '' : 'none';
        });
      });

      var COHORTS = {
        entry: {
          stats: [['典型鞋柜组合', '单双 Arizona EVA 沙滩鞋', '年轻新客低门槛尝鲜'], ['复购自然发生率', '~42%', '约半数在次年升级购买软木款'], ['单双折算综合均价', '~€60', '一体成型高周转引流品'], ['5年累计单客毛利 LTV', '€75', '零买量亏损，首单即贡献正毛利']],
          note: '<strong>EVA 入门漏斗层：</strong>不同于互联网补贴烧钱获客，勃肯的 €55–€65 EVA 入门鞋本身仍在德国生产且赚钱，专门负责把穿人字拖或洞洞鞋的年轻消费者领进勃肯足弓支撑大门。'
        },
        fan: {
          stats: [['典型鞋柜组合', 'EVA + Arizona + Boston + 居家毛拖', '覆盖沙滩 / 夏街 / 秋冬通勤 / 室内'], ['复购自然发生率', '>70%', '零付费召回广告投入'], ['单双折算综合均价', '~€145', 'DTC 直营客单显著高于批发'], ['5年累计单客毛利 LTV', '€335+', '约为单双尝鲜客的 4.5 倍']],
          note: '<strong>生物力学“磨合棘轮效应（Break-In Ratchet）”：</strong>经过 2–3 周行走后，软木乳胶顺应穿着者足底压力形成专属 3D 足模印记。一旦双脚习惯这种足弓承托，用户便自发跨季节增购包头鞋与居家鞋（美国客群人均 3.6 双）。'
        },
        collector: {
          stats: [['典型鞋柜组合', '多色 Suede Boston + Naples + Boots + 1774', '全天候穿搭与联名限量收藏'], ['复购自然发生率', '>90%', '高频访问官网与直营概念店'], ['单双折算综合均价', '€215+', '高单价麂皮、羊毛衬里与 1774 系列'], ['5年累计单客毛利 LTV', '€820+', '叠加 Blue Footbed 鞋垫与护理耗材']],
          note: '<strong>全季静奢收藏层：</strong>高净值与时尚先锋客群不仅每年购入新配色绒面革 Boston/Tokio 及 1774 设计师联名款，还购买 €65 Blue Footbed 蓝鞋垫塞入自己的运动鞋与皮鞋中，实现全天候足床绑定。'
        }
      };
      document.getElementById('cohortTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-cohort]');
        if (!b) return;
        var k = b.getAttribute('data-cohort');
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        var c = COHORTS[k] || COHORTS.fan;
        document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
          var isMono = idx > 0 ? ' mono' : '';
          var fz = idx === 0 ? ' style="font-size:0.92rem;"' : '';
          return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + isMono + '"' + fz + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
        }).join('');
        document.getElementById('cohortNote').innerHTML = c.note;
      });

      document.getElementById('peerFilter').addEventListener('click', function (e) {
        var b = e.target.closest('[data-pcat]');
        if (!b) return;
        var cat = b.getAttribute('data-pcat');
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        document.querySelectorAll('#peerTable tbody tr').forEach(function (r) {
          var rc = r.getAttribute('data-row-cat') || '';
          r.style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
        });
      });

      /* 4. High-DPI Retina Canvas Charts */
      function prepCanvas(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(250, rect.width || 480), h = Math.max(140, rect.height || 270);
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

      function drawProfitCanvas() {
        var env = prepCanvas('profitCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.profitCanvas = [];
        var pad = { top: 28, right: 20, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.pView === 'waterfall') {
          var steps = [
            { lbl: 'B2B批发', val: 1297.9, base: 0, col: pal.blue, tip: 'FY2025 B2B 批发净营收: €1,297.9M (占比 62%，严守 70–80% 配货率)' },
            { lbl: '+DTC直营', val: 794.8, base: 1297.9, col: pal.green, tip: 'FY2025 DTC 直营净营收: +€794.8M (占比 38%，推升总营收至 €2,097.4M)' },
            { lbl: '=总毛利', val: 1239.6, base: 0, col: pal.violet, tip: 'FY2025 综合毛利额: €1,239.6M (综合毛利率高达 59.1%)' },
            { lbl: 'Adj.EBITDA', val: 667.0, base: 0, col: pal.blue, tip: 'FY2025 调整后 EBITDA: €667.0M (利润率 31.8%，Q3 FY26 升至 33.7%)' },
            { lbl: 'EBIT利润', val: 549.5, base: 0, col: pal.amber, tip: 'FY2025 营业利润 EBIT: ~€549.5M (营业利润率 26.2%)' },
            { lbl: 'GAAP净利', val: 348.3, base: 0, col: pal.green, tip: 'FY2025 GAAP 净利润: €348.3M (+82% YoY，净利率 16.6%)' }
          ];
          var maxV = 2300;
          for (var g = 0; g <= 4; g++) {
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('€' + Math.round((maxV / 4) * g) + 'M', pad.left - 8, gy + 4);
          }
          var slotW = pw / steps.length, barW = Math.min(44, slotW * 0.56);
          steps.forEach(function (s, i) {
            var x = pad.left + i * slotW + (slotW - barW) / 2;
            var yTop = pad.top + ph - ((s.base + s.val) / maxV) * ph;
            var yBot = pad.top + ph - (s.base / maxV) * ph;
            var bh = Math.max(4, yBot - yTop);
            ctx.fillStyle = s.col; roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('€' + Math.round(s.val) + 'M', x + barW / 2, yTop - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
            hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
          });
        } else {
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
          var b2b = [630, 790, 895, 1106, 1298, 1430];
          var dtc = [327, 450, 597, 692, 795, 895];
          var maxR = 1600;
          for (var m = 0; m <= 4; m++) {
            var my = pad.top + ph - (m / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('€' + (m * 400) + 'M', pad.left - 8, my + 4);
          }
          function plotL(arr, col, name) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxR) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxR) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 0 || idx === 5) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText('€' + v + 'M', px, py - 8);
              }
              hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: '€' + v + 'M' });
            });
          }
          yrs.forEach(function (y, idx) {
            var px = pad.left + (idx / 5) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(y, px, pad.top + ph + 20);
          });
          plotL(b2b, pal.blue, 'B2B 精选批发营收');
          plotL(dtc, pal.green, 'DTC 自营官网与门店营收');
        }
      }

      function drawCohortCanvas() {
        var env = prepCanvas('cohortCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.cohortCanvas = [];
        var pad = { top: 28, right: 22, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.cView === 'ltv') {
          var xLbls = ['首年 Y1', '第2年 Y2', '第3年 Y3', '第4年 Y4', '第5年 Y5'];
          var entry = [36, 48, 56, 65, 75];
          var fan = [78, 145, 212, 276, 335];
          var col = [185, 340, 505, 665, 825];
          var maxL = 900;
          for (var g = 0; g <= 3; g++) {
            var gy = pad.top + ph - (g / 3) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('€' + (g * 300), pad.left - 8, gy + 4);
          }
          function drawC(arr, cHex, lb) {
            ctx.strokeStyle = cHex; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxL) * ph;
              ctx.fillStyle = cHex; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 4) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
                ctx.fillText('€' + v, px - 6, py - 8);
              }
              hitRegions.cohortCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: xLbls[idx] + ' · ' + lb, body: '累计毛利贡献 LTV: €' + v });
            });
          }
          xLbls.forEach(function (lb, idx) {
            var px = pad.left + (idx / 4) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(lb, px, pad.top + ph + 20);
          });
          drawC(col, pal.violet, '全季收藏死忠 (6双+)');
          drawC(fan, pal.blue, '核心软木老客 (3.6双均值)');
          drawC(entry, pal.amber, 'EVA 尝鲜新客 (1双)');
        } else {
          var brands = [
            { name: 'Birkenstock', fp: 91.0, eb: 31.8, col: pal.blue },
            { name: 'Deckers (DECK)', fp: 84.0, eb: 25.5, col: pal.green },
            { name: 'NIKE (NKE)', fp: 64.0, eb: 11.2, col: pal.amber }
          ];
          var slot = pw / brands.length;
          for (var k = 0; k <= 4; k++) {
            var ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText((k * 25) + '%', pad.left - 8, ky + 4);
          }
          brands.forEach(function (b, idx) {
            var cx = pad.left + idx * slot + slot / 2, bw = 32;
            var fh = (b.fp / 100) * ph, eh = (b.eb / 100) * ph;
            ctx.fillStyle = pal.blueSoft; roundRect(ctx, cx - bw - 4, pad.top + ph - fh, bw, fh, 5); ctx.fill();
            ctx.fillStyle = b.col; roundRect(ctx, cx + 4, pad.top + ph - eh, bw, eh, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(b.fp + '%', cx - bw / 2 - 4, pad.top + ph - fh - 6);
            ctx.fillText(b.eb + '%', cx + bw / 2 + 4, pad.top + ph - eh - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
            ctx.fillText(b.name, cx, pad.top + ph + 20);
            hitRegions.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: b.name, body: '全价销售率 ~' + b.fp + '% vs EBITDA 利润率 ~' + b.eb + '%' });
          });
        }
      }

      function drawCapitalCanvas() {
        var env = prepCanvas('capitalCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.capitalCanvas = [];
        var pad = { top: 28, right: 20, bottom: 42, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.kView === 'lev') {
          var yrs = ['FY21(并购)', 'FY22', 'FY23(IPO)', 'FY24', 'FY25', 'FY26E'];
          var lev = [4.1, 3.2, 2.6, 1.8, 1.5, 1.65];
          var maxL = 4.6;
          for (var g = 0; g <= 4; g++) {
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(((maxL / 4) * g).toFixed(1) + 'x', pad.left - 8, gy + 4);
          }
          var slot = pw / yrs.length, bw = Math.min(36, slot * 0.54);
          yrs.forEach(function (y, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (lev[i] / maxL) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
            roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(lev[i].toFixed(2) + 'x', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
            ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
            hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 净债务 / Adj. EBITDA', body: lev[i].toFixed(2) + 'x（IPO 后现金流迅速去杠杆并同步开启回购）' });
          });
        } else {
          var regs = [
            { name: '亚太区 APAC 直营门店', n: 53, col: pal.green, tip: '53 家自营店（占比 42.7%），大中华区、日本、印度高速扩张' },
            { name: '欧洲中东非 EMEA 直营门店', n: 50, col: pal.blue, tip: '50 家自营店（占比 40.3%），巴黎、伦敦、科隆等核心商圈' },
            { name: '美洲区 Americas 直营门店', n: 21, col: pal.violet, tip: '21 家精品直营旗舰（SoHo / 迈阿密 / 奥斯汀等），单店坪效极高' },
            { name: 'Q3 FY26 全球自营门店总计', n: 124, col: pal.amber, tip: '截至 2026 年 6 月 30 日共 124 家（单季净增 13 家），平均 12–18 个月回本' }
          ];
          var maxS = 140, rowH = ph / regs.length;
          regs.forEach(function (it, idx) {
            var cy = pad.top + idx * rowH + rowH / 2, bh = 20, bl = (it.n / maxS) * (pw - 40);
            ctx.fillStyle = it.col; roundRect(ctx, pad.left, cy - bh / 2 + 6, bl, bh, 5); ctx.fill();
            ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'left';
            ctx.fillText(it.name, pad.left, cy - 8);
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace';
            ctx.fillText(it.n + ' 家', pad.left + bl + 8, cy + 10);
            hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 18, w: pw, h: 36, title: it.name, body: it.tip });
          });
        }
      }

      /* 5. Interactive 5Y EPS Compounder */
      var simData = { eps: [1.87, 2.18, 2.58, 3.06, 3.62, 4.28] };
      function drawSimMiniCanvas() {
        var env = prepCanvas('simMiniCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 22, right: 18, bottom: 24, left: 42 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var yrs = ['FY25', 'FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E'];
        var arr = simData.eps;
        var maxE = Math.max(5.0, Math.ceil(Math.max.apply(null, arr) * 1.18));
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
        arr.forEach(function (v, i) {
          var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        arr.forEach(function (v, i) {
          var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
          ctx.fillStyle = i === 5 ? pal.green : pal.blue;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('€' + v.toFixed(2), px, py - 7);
          ctx.fillStyle = pal.tick; ctx.fillText(yrs[i], px, pad.top + ph + 15);
        });
      }

      function runSimulator() {
        var gU = parseFloat(document.getElementById('inpUnitCagr').value) / 100;
        var gA = parseFloat(document.getElementById('inpAspCagr').value) / 100;
        var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
        document.getElementById('lblUnitCagr').textContent = (gU * 100).toFixed(1) + '%';
        document.getElementById('lblAspCagr').textContent = (gA * 100).toFixed(1) + '%';
        document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

        var rev = 2.0974, shares = 0.184; // billion EUR, billion shares at FY25
        var revGrowth = (1 + gU) * (1 + gA) - 1;
        var epsArr = [1.89];
        for (var y = 1; y <= 5; y++) {
          rev *= (1 + revGrowth);
          shares *= (1 - buy);
          var ebitdaM = Math.min(0.335, 0.308 + gA * 0.35 + y * 0.003);
          var netInc = rev * ebitdaM * 0.56;
          epsArr.push(netInc / shares);
        }
        var fy30Ebitda = rev * Math.min(0.335, 0.308 + gA * 0.35 + 0.015);
        var epsCagr = (Math.pow(epsArr[5] / epsArr[0], 0.2) - 1) * 100;

        document.getElementById('simRevOut').textContent = '€' + rev.toFixed(2) + 'B';
        document.getElementById('simEbitdaOut').textContent = '€' + fy30Ebitda.toFixed(2) + 'B';
        document.getElementById('simEpsOut').textContent = '€' + epsArr[5].toFixed(2);
        document.getElementById('simCagrOut').textContent = '+' + epsCagr.toFixed(1) + '%';
        simData.eps = epsArr;
        drawSimMiniCanvas();
      }
      ['inpUnitCagr', 'inpAspCagr', 'inpBuyRate'].forEach(function (id) { document.getElementById(id).addEventListener('input', runSimulator); });

      var PRESETS = { bear: { u: 7.0, a: 2.0, b: 1.2 }, base: { u: 10.0, a: 4.0, b: 2.2 }, bull: { u: 12.0, a: 5.5, b: 3.0 } };
      document.getElementById('simPresets').addEventListener('click', function (e) {
        var b = e.target.closest('[data-preset]');
        if (!b) return;
        var pr = PRESETS[b.getAttribute('data-preset')] || PRESETS.base;
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        document.getElementById('inpUnitCagr').value = pr.u;
        document.getElementById('inpAspCagr').value = pr.a;
        document.getElementById('inpBuyRate').value = pr.b;
        runSimulator();
      });

      function bindTab(gid, attr, skey, fn) {
        document.getElementById(gid).addEventListener('click', function (e) {
          var b = e.target.closest('[' + attr + ']');
          if (!b) return;
          state[skey] = b.getAttribute(attr);
          this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
          fn();
        });
      }
      bindTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
      bindTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
      bindTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

      function bindHover(cid) {
        var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
        c.addEventListener('mousemove', function (ev) {
          var r = c.getBoundingClientRect();
          var mx = ev.clientX - r.left, my = ev.clientY - r.top;
          var list = hitRegions[cid] || [], hit = null;
          for (var i = 0; i < list.length; i++) {
            var rg = list[i];
            if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; }
          }
          if (hit) {
            tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
            tip.style.display = 'block';
            tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
            tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
          } else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindHover);

      function drawAllCharts() { drawProfitCanvas(); drawCohortCanvas(); drawCapitalCanvas(); drawSimMiniCanvas(); }

      /* Quick Jump ⌘K */
      var QUICK_ITEMS = [
        { id: 'mod-deck', t: 'M0 双栏指挥舱与三大经济公式', s: '€2,097.4M 营收 · 59.1% 毛利率 · 零买量自然漏斗' },
        { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: '百年鞋床 → 四级价格带 → 70–80%饥饿配货 → 3.6双复购' },
        { id: 'mod-profit-pool', t: 'M2 利润瀑布流与四级价格阶梯', s: '€55 EVA 到 €500 1774高定 · Q3 EBITDA 率 33.7%' },
        { id: 'mod-cohort', t: 'M3 软木塑形棘轮与单客 3.6 双 LTV', s: '1双尝鲜 vs 3.6双均值 vs 6双收藏 · 零代言税对比' },
        { id: 'mod-capital', t: 'M4 12–18月回本门店与 EPS 推演器', s: '124 家全球自营门店 · 5年量价与回购缩股交互模拟' },
        { id: 'mod-matrix', t: 'M5 六大鞋服与顶奢商业范式对标压测', s: 'BIRK vs Hermès / Deckers / On / Crocs / Nike' }
      ];
      var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQ(kw) {
        var q = (kw || '').trim().toLowerCase();
        var m = QUICK_ITEMS.filter(function (it) { return !q || it.t.toLowerCase().indexOf(q) !== -1 || it.s.toLowerCase().indexOf(q) !== -1; });
        qPop.innerHTML = m.map(function (it) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
      }
      qIn.addEventListener('focus', function () { renderQ(qIn.value); });
      qIn.addEventListener('input', function () { renderQ(qIn.value); });
      qPop.addEventListener('click', function (e) {
        var jb = e.target.closest('[data-jump]');
        if (!jb) return;
        var el = document.querySelector(jb.getAttribute('data-jump'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          setTimeout(drawAllCharts, 60);
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
        var docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / docH) * 100) + '%';
      }, { passive: true });

      try {
        var savedChk = JSON.parse(safeGet(STORAGE_STRESS_KEY) || '{}');
        document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
          var k = chk.getAttribute('data-stress-chk');
          chk.checked = !!savedChk[k];
          chk.addEventListener('change', function () {
            savedChk[k] = chk.checked;
            safeSet(STORAGE_STRESS_KEY, JSON.stringify(savedChk));
            showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
          });
        });
      } catch (e) {}

      applyTheme((safeGet(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((safeGet(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      runSimulator();
      drawAllCharts();
      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAllCharts, 90); });
    })();
  