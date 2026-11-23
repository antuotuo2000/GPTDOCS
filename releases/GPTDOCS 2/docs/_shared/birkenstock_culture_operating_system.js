
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_AUDIT_KEY = 'birk_culture_bp_audit_v1';

      var state = { theme: 'dark', lang: 'zh', eView: 'rev', gView: 'gm' };
      var hits = { eraCanvas: [], genomeCanvas: [] };

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
          green: dark ? '#22C55E' : '#16A34A',
          violet: dark ? '#A78BFA' : '#7C3AED',
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
          var v = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
          if (v !== null) {
            if (v.indexOf('<span') !== -1) nodes[i].innerHTML = v;
            else nodes[i].textContent = v;
          }
        }
        safeSet(STORAGE_LANG_KEY, state.lang);
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      /* C0 Topology Switcher */
      document.getElementById('topoSwitch').addEventListener('click', function (e) {
        var b = e.target.closest('[data-topo]');
        if (!b) return;
        var mode = b.getAttribute('data-topo');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var stage = document.getElementById('topoStage');
        if (mode === 'birk') {
          stage.innerHTML =
            '<div class="cc-topo-hub mono">CEO (Oliver Reichert) × CFO (Ivica Krolo) 单一集团稀缺配额总账</div>' +
            '<div class="cc-topo-spokes">' +
              '<div class="cc-spoke"><b>德国制造 SVP/CPO</b>Dr. Markus Baum · 6大德国厂统一排产</div>' +
              '<div class="cc-spoke"><b>全球分销 CSO</b>Klaus Baumann · 严守 70–80% 批发配货阀</div>' +
              '<div class="cc-spoke"><b>美洲战区总裁</b>David Kahan · 十年增长 ~30倍清退乱价商</div>' +
              '<div class="cc-spoke"><b>EMEA 战区总裁</b>Nico Bouyakhf · 欧洲大本营直营+精选买手</div>' +
              '<div class="cc-spoke"><b>1774 巴黎创意室</b>顶奢联名反哺经典廓形溢价，不改鞋床底层</div>' +
              '<div class="cc-spoke"><b>品牌传播 CCO</b>Jochen Gutzy · 零明星代言费，纯口碑裂变</div>' +
            '</div>' +
            '<div class="cc-topo-outcome">结果：工厂不为摊薄固定成本盲目超产，区域销售不为季度提成向折扣店塞货，全渠道 &gt;90% 正价成交</div>';
        } else {
          stage.innerHTML =
            '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">2013年前 38 家家族独立法人迷宫 / 传统代工快消鞋企病灶</div>' +
            '<div class="cc-topo-spokes">' +
              '<div class="cc-spoke silo"><b>38家分散家族实体</b>各执一摊各自结算，无集团统一 CEO 与战略</div>' +
              '<div class="cc-spoke silo"><b>外部批发代理失控</b>串货商在电商平台竞相打折，侵蚀品牌调性</div>' +
              '<div class="cc-spoke silo"><b>100%亚洲代工同质化</b>模具与配方外泄，平替山寨迅速瓦解毛利率</div>' +
              '<div class="cc-spoke silo"><b>春夏单季库存周期</b>缺乏闭口鞋统筹，秋冬产能闲置或被迫清仓</div>' +
              '<div class="cc-spoke silo"><b>零直营消费者数据</b>没有官网与自营店，彻底与年轻世代断联</div>' +
              '<div class="cc-spoke silo"><b>10%+买量代言依赖</b>一旦停止投放或球星解约，终端动销立即失速</div>' +
            '</div>' +
            '<div class="cc-topo-outcome warn">恶果：缺乏统一产能阀门与渠道纪律，百年手艺沦为低毛利批发品（Reichert 2013改革彻底终结此困局）</div>';
        }
      });

      /* C1 Quadrant Switcher */
      var QUADS = [
        { badge: 'Q1 · FORM FOLLOWS FOOTBED', title: '鞋床母体原教旨：一切设计围绕足弓解剖学服务', desc: '勃肯逾百年的全部商业大厦建立在同一块四层结构鞋床（黄麻底层、软木乳胶核心、第二层黄麻、绒面牛皮衬里）之上，高管首要职责是守护物理脚感零妥协。', alloc: [42, 28, 18, 12] },
        { badge: 'Q2 · GERMAN ARTISAN + AUTOMATION', title: '德国工匠与精密自动化共舞：守住制造最高机密', desc: '在 Pasewalk、Görlitz 与 Sankt Katharinen 工厂，特制软木烘焙温湿度曲线与手工修边相辅相成，让生产部门成为品牌溢价的第一责任人。', alloc: [50, 22, 16, 12] },
        { badge: 'Q3 · ENGINEERED SCARCITY VALVE', title: '工程化稀缺控盘：把“说不的权力”制度化', desc: '分销委员会按单店全价售罄率动态分配 Boston、Naples 等紧俏配额，主动留出 20%–30% 批发缺口，彻底逆转品牌对百货渠道的议价地位。', alloc: [25, 45, 15, 15] },
        { badge: 'Q4 · PARIS 1774 × RHINE MITTELSTAND', title: '巴黎高定光环 × 德国隐形冠军实业底座', desc: '巴黎 1774 团队负责在时装周制造文化渴望与 €500 价格锚点，德国工程团队负责把溢价势能转化为千万双标准品的高毛利交付。', alloc: [26, 24, 32, 18] }
      ];
      document.getElementById('quadGrid').addEventListener('click', function (e) {
        var card = e.target.closest('[data-quad]');
        if (!card) return;
        var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
        var cs = this.querySelectorAll('.cc-quad-card');
        for (var i = 0; i < cs.length; i++) cs[i].classList.toggle('active', cs[i] === card);
        var q = QUADS[idx];
        document.getElementById('dialBadge').textContent = q.badge;
        document.getElementById('dialTitle').textContent = q.title;
        document.getElementById('dialDesc').textContent = q.desc;
        [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (p) {
          document.getElementById('pct' + p[0]).textContent = p[1] + '%';
          document.getElementById('bar' + p[0]).style.width = p[1] + '%';
        });
      });

      /* C2 Era Scrubber */
      var ERAS = [
        {
          badge: 'ERA I · 1774–2012 · SIX GENERATIONS OF SHOEMAKERS',
          title: '家族工匠积累期：发明软木鞋床与经典廓形，但困于 38 家分散公司',
          desc: '从 1774 年乡村鞋匠到 1896 年发明弹性鞋床、1963–1976 年推出 Madrid/Arizona/Boston，勃肯积淀了深厚的矫形功能口碑；但家族多头持股导致生产、辅料与销售分裂为 38 家独立法人，错失早期全球化红利。',
          kpis: [['1774 / 1896', '品牌创立与弹性鞋床诞生年'], ['38 家实体', '2013改革前分散家族法人数'], ['~€300M 级', '改革前夕集团营收体量'], ['四大常青款', 'Madrid/Arizona/Boston/Gizeh']]
        },
        {
          badge: 'ERA II · 2013–2021 · OLIVER REICHERT UNIFICATION',
          title: 'Reichert 破局重塑期：一统三大职能、断供乱价平台、激活 DTC 与 EVA',
          desc: '外部统帅 Oliver Reichert 上任后迅速将 38 家公司整合进单一集团，建立生产、分销、服务三大支柱；2015 推出 EVA 切入年轻入门层，2016 上线官网电商并铁腕切断亚马逊第三方乱价卖家，营收翻逾三倍至 €9.62亿。',
          kpis: [['€300M→€962M', '8年营收增长逾 3.2 倍'], ['2015 / 2016', '推出 EVA 入门线与自营电商'], ['1774 Studio', '巴黎高定工作室抬升品牌天花板'], ['单一集团', '三大职能终结内部割据']]
        },
        {
          badge: 'ERA III · 2021–2026+ · L CATTERTON & NYSE PUBLIC ERA',
          title: 'L Catterton 战略赋能与 NYSE 上市新纪元：守住德国根基，释放全球稀缺红利',
          desc: '2021 年 L Catterton 与阿尔诺家族资本入主，注资 €1.2 亿兴建 Pasewalk 工厂并加速直营开店；2023 年 10 月登陆纽交所后售出超 7,200 万双鞋履，闭口鞋升至 38%，亚太区以双倍速度冲刺远期 1/3 版图。',
          kpis: [['€2,097.4M', 'FY2025 集团总营收 (+18% cc)'], ['€667.0M', 'FY2025 Adj. EBITDA (31.8%)'], ['124 家门店', 'Q3 FY26 全球自营零售舰队'], ['€2.30–2.35B', 'FY2026 上调后全年营收指引']]
        }
      ];
      document.getElementById('eraTabs').addEventListener('click', function (e) {
        var t = e.target.closest('[data-era]');
        if (!t) return;
        var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
        var ts = this.querySelectorAll('.cc-era-tab');
        for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('active', ts[i] === t);
        var er = ERAS[idx];
        document.getElementById('eraBadge').textContent = er.badge;
        document.getElementById('eraTitle').textContent = er.title;
        document.getElementById('eraDesc').textContent = er.desc;
        document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) {
          return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
        }).join('');
      });

      /* High-DPI Canvas Helpers */
      function prepCanvas(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(250, rect.width || 460), h = Math.max(135, rect.height || 250);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        var ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
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

      function drawEraCanvas() {
        var env = prepCanvas('eraCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.eraCanvas = [];
        var pad = { top: 28, right: 20, bottom: 40, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.eView === 'rev') {
          var yrs = ['2013', '2019', 'FY21', 'FY23', 'FY25', 'FY26E'];
          var rev = [300, 722, 962, 1492, 2097, 2325];
          var maxV = 2600;
          for (var g = 0; g <= 4; g++) {
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('€' + Math.round((maxV / 4) * g) + 'M', pad.left - 8, gy + 4);
          }
          var slot = pw / yrs.length, bw = Math.min(38, slot * 0.54);
          yrs.forEach(function (y, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (rev[i] / maxV) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i >= 4 ? pal.green : (i >= 2 ? pal.violet : pal.blue);
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('€' + rev[i] + 'M', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
            hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 集团净营收', body: '€' + rev[i] + 'M（较 2013 改革起点扩张 ' + (rev[i] / 300).toFixed(1) + ' 倍）' });
          });
        } else {
          var metrics = [
            { name: 'FY21–FY23 销量增速 (Unit CAGR)', v: 4.0, col: pal.blue, tip: '刻意控制出货双数温和增长 +4% CAGR，保护市场稀缺度' },
            { name: 'FY21–FY23 均价增速 (ASP CAGR)', v: 19.0, col: pal.violet, tip: 'DTC 占比提升 + 闭口鞋扩容驱动 ASP 年均复合大涨 +19%' },
            { name: 'FY21–FY23 营收增速 (Rev CAGR)', v: 25.0, col: pal.green, tip: '量价齐升推动总营收实现 +25% 两年复合增长' },
            { name: '2026–2028 CMD 目标 EPS 增速', v: 16.0, col: pal.amber, tip: 'CMD 指引销量 +10% CAGR、营收 13%–15% CAGR、EPS 15%–17% CAGR' }
          ];
          var maxP = 30;
          for (var k = 0; k <= 3; k++) {
            var ky = pad.top + ph - (k / 3) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText((k * 10) + '%', pad.left - 8, ky + 4);
          }
          var sW = pw / metrics.length, bW = Math.min(44, sW * 0.5);
          metrics.forEach(function (m, idx) {
            var x = pad.left + idx * sW + (sW - bW) / 2;
            var bh = (m.v / maxP) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = m.col; roundRect(ctx, x, yt, bW, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('+' + m.v.toFixed(1) + '%', x + bW / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
            ctx.fillText(m.name.split(' ')[0], x + bW / 2, pad.top + ph + 20);
            hits.eraCanvas.push({ x: x, y: yt, w: bW, h: bh, title: m.name, body: m.tip });
          });
        }
      }

      function drawGenomeCanvas() {
        var env = prepCanvas('genomeCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.genomeCanvas = [];
        var pad = { top: 20, right: 48, bottom: 24, left: 132 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var peers = [
          { name: 'Hermès (工坊顶奢)', gm: 71.0, opm: 41.0, col: pal.violet },
          { name: 'On Holding (瑞士跑鞋)', gm: 62.8, opm: 13.5, col: pal.green },
          { name: 'Birkenstock (德国自造)', gm: 59.1, opm: 26.2, col: pal.blue },
          { name: 'Deckers (HOKA/UGG)', gm: 57.7, opm: 23.1, col: pal.amber },
          { name: 'NIKE (外包买量巨头)', gm: 42.9, opm: 8.3, col: pal.red }
        ];
        var isGm = state.gView === 'gm';
        if (!isGm) peers.sort(function (a, b) { return b.opm - a.opm; });
        var maxX = isGm ? 80 : 48, rowH = ph / peers.length;
        peers.forEach(function (p, idx) {
          var val = isGm ? p.gm : p.opm;
          var cy = pad.top + idx * rowH + rowH / 2, bh = 22, bl = (val / maxX) * pw;
          ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
          ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
          ctx.fillStyle = pal.sub; ctx.font = (p.name.indexOf('Birkenstock') === 0 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(p.name, pad.left - 10, cy + 4);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText(val.toFixed(1) + '%', pad.left + bl + 7, cy + 4);
          hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '毛利率 ' + p.gm.toFixed(1) + '% · EBIT 营业利润率 ' + p.opm.toFixed(1) + '%' });
        });
      }

      /* C4 Scarcity Entropy Simulator */
      var entSeries = [94, 91, 78, 62, 46];
      function drawEntropyCanvas() {
        var env = prepCanvas('entropyCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 20, right: 18, bottom: 24, left: 38 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = ['65%满足', '75%(勃肯)', '85%满足', '95%铺满', '100%塞货'];
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
        entSeries.forEach(function (v, i) {
          var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        entSeries.forEach(function (v, i) {
          var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
          ctx.fillStyle = i === 1 ? pal.green : pal.violet;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(Math.round(v) + '%', px, py - 7);
          ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.fillText(lbls[i], px, pad.top + ph + 15);
        });
      }

      function updateEntropySim() {
        var fill = parseInt(document.getElementById('rngFill').value, 10);
        var craft = parseInt(document.getElementById('rngCraft').value, 10);
        var mkt = parseFloat(document.getElementById('rngMkt').value);

        document.getElementById('valFill').textContent = fill + '%' + (fill <= 80 ? ' (黄金稀缺区)' : fill <= 90 ? ' (折扣抬头)' : ' (渠道泛滥)');
        document.getElementById('valCraft').textContent = craft + '%';
        document.getElementById('valMkt').textContent = mkt.toFixed(1) + '%' + (mkt <= 1.0 ? ' (零代言)' : ' (买量侵蚀)');

        var overFillPen = Math.max(0, (fill - 75) * 1.15);
        var craftLoss = Math.max(0, (95 - craft) * 0.25);
        var fullPrice = Math.max(48, Math.min(96, 91.5 - overFillPen - craftLoss * 0.6));
        var scarcity = Math.max(30, Math.min(99, Math.round(94 - overFillPen * 1.3 - craftLoss * 0.8)));
        var ebitda = Math.max(10, Math.min(35, 31.8 - overFillPen * 0.35 - craftLoss * 0.12 - Math.max(0, mkt - 0.5) * 0.85));

        document.getElementById('outFullPrice').textContent = fullPrice.toFixed(1) + '%';
        document.getElementById('outScarcity').textContent = scarcity + ' / 100';
        document.getElementById('outEbitda').textContent = ebitda.toFixed(1) + '%';

        entSeries = [65, 75, 85, 95, 100].map(function (f) {
          var p = Math.max(0, (f - 75) * 1.15);
          return Math.max(48, Math.min(96, 91.5 - p - craftLoss * 0.6));
        });
        drawEntropyCanvas();
      }
      ['rngFill', 'rngCraft', 'rngMkt'].forEach(function (id) { document.getElementById(id).addEventListener('input', updateEntropySim); });

      document.getElementById('eChartTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-eview]');
        if (!b) return;
        state.eView = b.getAttribute('data-eview');
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        drawEraCanvas();
      });
      document.getElementById('gChartTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-gview]');
        if (!b) return;
        state.gView = b.getAttribute('data-gview');
        this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
        drawGenomeCanvas();
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
            tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
            tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
          } else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['eraCanvas', 'genomeCanvas'].forEach(bindTip);

      function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }

      /* Quick Jump ⌘K */
      var QITEMS = [
        { id: 'sec-c0', t: 'C0 三大职能拓扑与古老初创悖论', s: '2013拆解38家家族公司 · 生产/分销/服务一统沙盘' },
        { id: 'sec-c1', t: 'C1 四大文化底层代码与精力罗盘', s: '解剖学鞋床 · 德国匠造 · 70–80%饥饿配货 · 巴黎1774' },
        { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1774–2026+)', s: '家族传承 → Reichert职业化 → L Catterton与上市倍增' },
        { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱对照', s: '勃肯 vs 爱马仕 / 耐克 / Crocs / Deckers 利润率对比' },
        { id: 'sec-c4', t: 'C4 稀缺熵增模拟器与组织六律体检', s: '过度铺货与外包压力测试 · 6项组织健康度持久化清单' }
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
        if (window.innerWidth <= 1040) document.body.classList.toggle('drawer-open');
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

      function refreshAudit() {
        var boxes = document.querySelectorAll('[data-cchk]'), done = 0;
        boxes.forEach(function (b) { if (b.checked) done++; });
        document.getElementById('auditScoreChip').textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项';
      }
      try {
        var savedA = JSON.parse(safeGet(STORAGE_AUDIT_KEY) || '{}');
        document.querySelectorAll('[data-cchk]').forEach(function (chk) {
          var k = chk.getAttribute('data-cchk');
          chk.checked = !!savedA[k];
          chk.addEventListener('change', function () {
            savedA[k] = chk.checked;
            safeSet(STORAGE_AUDIT_KEY, JSON.stringify(savedA));
            refreshAudit();
            showToast(chk.checked ? '已勾选该组织护城河指标' : '已取消勾选');
          });
        });
        refreshAudit();
      } catch (e) {}

      applyTheme((safeGet(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((safeGet(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      updateEntropySim();
      drawAll();
      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
    })();
  