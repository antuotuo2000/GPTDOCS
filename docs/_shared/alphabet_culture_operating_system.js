
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_AUDIT_KEY = 'googl_culture_bp_audit_v1';

      var state = { theme: 'dark', lang: 'zh', quadIdx: 0, eraIdx: 2, eView: 'revemp', gView: 'emp' };
      var hits = { eraCanvas: [], genomeCanvas: [] };

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

      var C0_LEAD = {
        zh: '苹果用“1997 单一损益表”解决了硬件工业品的软硬咬合难题，而谷歌在过去二十八年解答了另一个世纪管理难题：<strong>如何管理人类历史上规模最庞大的顶尖算法与系统工程师集群，使其不被大企业科层制窒息？</strong> 2015 年拉里·佩奇创立 <strong>Alphabet 控股架构</strong>，将搜索/广告核心现金牛与无人驾驶 Waymo、生命科学等超长周期赌注分账激励 <a class="cite-link" href="https://abc.xyz/investor/founders-letters/2015/" target="_blank" rel="noopener noreferrer">G is for Google ↗</a>；而当 2023 年生成式 AI 要求全集团毫秒级协同作战时，CEO 桑达尔·皮查伊又对核心 Google 实施了果断的<strong>“反向再集权手术”</strong>——把各自为战的 Google Brain 与 DeepMind 熔铸为单一 <strong>Google DeepMind 引擎室</strong>，将 Android、Chrome 与 Pixel 收归单一 <strong>Platforms &amp; Devices 兵团</strong>，支撑 Alphabet 在 Q3 2026 创下单季营收 <strong>$1,275.8亿（+25% YoY）</strong>的巅峰战绩 <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2026/" target="_blank" rel="noopener noreferrer">Q3\'26 财报致辞 ↗</a>。',
        en: 'While Apple solved hardware-software coupling via its 1997 Single P&amp;L, Google answered the opposite management riddle: <strong>how to scale history\'s largest concentration of elite computer scientists without suffocating invention under corporate bureaucracy.</strong> Larry Page\'s 2015 <strong>Alphabet holding umbrella</strong> ring-fenced moonshots like Waymo from core Search <a class="cite-link" href="https://abc.xyz/investor/founders-letters/2015/" target="_blank" rel="noopener noreferrer">G is for Google ↗</a>; then in 2023–2026 CEO Sundar Pichai executed a decisive <strong>wartime re-unification</strong> inside Google—fusing Brain and DeepMind into <strong>Google DeepMind</strong> and combining Android, Chrome, and Pixel into <strong>Platforms &amp; Devices</strong>—propelling Q3 2026 revenue +25% YoY to <strong>$127.58B</strong> <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2026/" target="_blank" rel="noopener noreferrer">Q3\'26 Remarks ↗</a>.'
      };

      // C0: Interactive Topology Switcher
      document.getElementById('topoSwitch').addEventListener('click', function (e) {
        var b = e.target.closest('[data-topo]');
        if (!b) return;
        var mode = b.getAttribute('data-topo');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var stage = document.getElementById('topoStage');
        if (mode === 'unified') {
          stage.innerHTML =
            '<div class="cc-topo-hub mono">Alphabet 顶层 (Pichai × Ashkenazi) · 集团共享 AI 研发池 ($7.7B/季)</div>' +
            '<div class="cc-topo-spokes">' +
            '<div class="cc-spoke"><b>Google DeepMind</b>Koray 统管 Gemini 工程 + Demis 主导前沿科学</div>' +
            '<div class="cc-spoke"><b>AI 算力底座</b>Amin Vahdat · TPU 8t/8i 全局统一配额与外售</div>' +
            '<div class="cc-spoke"><b>Search &amp; 商业</b>Liz Reid &amp; Schindler · AI Mode 与 UCP 一体推进</div>' +
            '<div class="cc-spoke"><b>Google Cloud</b>Kurian · $30.7B/季 (+103%) + $29.5B Wiz 融合</div>' +
            '<div class="cc-spoke"><b>Platforms &amp; 硬件</b>Osterloh · Android/Chrome/Pixel/XR 软硬合流</div>' +
            '<div class="cc-spoke"><b>Other Bets 隔离伞</b>Waymo 独立融资 ($5B贷款) · GFiber 分拆出表</div>' +
            '</div>' +
            '<div class="cc-topo-outcome">战果：Gemini 4 Carbon 登顶全球智能榜首，10亿+ 月活极速落地，Cloud 单季翻倍</div>';
        } else {
          stage.innerHTML =
            '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">2022 前碎片化科研温床 · 多头实验室争夺算力与话语权</div>' +
            '<div class="cc-topo-spokes">' +
            '<div class="cc-spoke silo"><b>Google Brain</b>硅谷团队自建一套大模型栈，与伦敦互不统属</div>' +
            '<div class="cc-spoke silo"><b>独立 DeepMind</b>偏重学术发论文，成果向搜索/云转化链条漫长</div>' +
            '<div class="cc-spoke silo"><b>Android 软件部</b>优先照顾外部 OEM，自家 Pixel 难获首发特性</div>' +
            '<div class="cc-spoke silo"><b>Pixel 硬件部</b>芯片与系统割裂，端侧模型适配滞后一个身位</div>' +
            '<div class="cc-spoke silo"><b>多层合规委员会</b>过度畏惧声誉风险，导致对话式 AI 首发迟疑</div>' +
            '<div class="cc-spoke silo"><b>晋升驱动造轮子</b>为凑晋升材料重复开发多款雷同聊天/工具 App</div>' +
            '</div>' +
            '<div class="cc-topo-outcome warn">教训：虽坐拥 Transformer 原创论文，却因研究孤岛与审批摩擦一度让创业公司抢得先发声量</div>';
        }
      });

      // C1: 2x2 Quadrant Selector + Oxygen Dial
      var QUADS = [
        {
          badge: 'Q1 · PROJECT ARISTOTLE & SRE POSTMORTEMS',
          title: '心理安全感第一定律：为什么“敢说真话”直接决定十亿级系统稳定性？',
          desc: 'Google People Analytics 对 180 个团队做双盲追踪发现，高效团队排名第一的特质是心理安全感。配套的 SRE“无指责事后复盘”确保任何线上故障都能在 24 小时内被彻底透明剖析并固化为全局自动防御规则。',
          alloc: [38, 28, 22, 12]
        },
        {
          badge: 'Q2 · STRETCH OKRs & PEER COMMITTEES',
          title: '极限 OKRs 与同侪盲审：用公开阳光和集体智慧替代长官意志',
          desc: '在谷歌，季度 OKR 拿到 0.7 分被视为最佳激进状态（拿到 1.0 分反而会被追问是否目标定得太低）；同时录用与晋升交由独立委员会盲审技术文档与代码贡献，最大限度过滤直属主管偏见。',
          alloc: [22, 28, 36, 14]
        },
        {
          badge: 'Q3 · PROJECT OXYGEN 10 BEHAVIORS',
          title: '氧气计划十大准则：从“怀疑管理者没用”到定义现代技术领导力',
          desc: '2008 年启动的 Project Oxygen 用离职率与绩效数据证明：优秀工程主管能让团队产出显著跃升，但其核心角色不是居高临下发号施令，而是“做技术教练、拒绝微操、帮工程师打通跨部门资源”。',
          alloc: [42, 26, 20, 12]
        },
        {
          badge: 'Q4 · WARTIME VELOCITY & AI SELF-BOOTSTRAPPING',
          title: '战时精简与 AI 编程自举：用 Gemini 4 重写谷歌自身的软件生产力曲线',
          desc: '2024–2026 谷歌在保持科研厚度的同时大幅砍除冗余协调会，并在内部全面铺开 Gemini 4 Argon/Carbon 代理编码，使决策拍板与代码交付效率进入全新量级。',
          alloc: [18, 42, 18, 22]
        }
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
        [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (pair) {
          document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
          document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
        });
      });

      // C2: 3-Era Leadership Scrubber
      var ERAS = [
        {
          badge: 'ERA I · 1998–2014 · FOUNDERS & SCHMIDT TRIUMVIRATE',
          title: '创业黄金期：双层股权守护长期主义，20% 时间与战略并购铸就七大超级入口',
          desc: '佩奇与布林在 2004 年 IPO 时创设每股 10 票的 Class B 股拒绝华尔街短期季报绑架，联合 Eric Schmidt 建立起 OKRs、TGIF 全员问答与 20% 自由探索传统，不仅内生孵化出 Gmail 与 Chrome，更精准收购 Android、YouTube 与 DeepMind。',
          kpis: [['$0 → $66B', '16年缔造搜索广告霸权'], ['10票 Class B', '创始人超级投票权制度先河'], ['Gmail / Chrome', '自下而上极客创新经典产物'], ['YouTube/Android', '商业史回报最高的平台并购']]
        },
        {
          badge: 'ERA II · 2015–2022 · ALPHABET UMBRELLA & AI-FIRST PIVOT',
          title: 'Alphabet 控股转型期：核心现金牛与登月赌注分账透明化，提前十年埋下 TPU 种子',
          desc: '2015 年成立 Alphabet 让华尔街清晰看到搜索主业的惊人印钞力，同时给 Waymo、Verily 等长周期项目戴上预算硬约束；皮查伊 2016 年提出“AI-First”并大规模量产自研 TPU 与发明 Transformer，但疫情期扩招至 19 万人也埋下机构臃肿隐患。',
          kpis: [['$75B → $283B', 'Alphabet 营收稳健翻近四倍'], ['TPU v1–v4', '提前十年量产自研 AI 算力芯'], ['Transformer', '2017 发表现代大模型奠基论文'], ['19.02万人', '2022 编制见顶触发后续精简']]
        },
        {
          badge: 'ERA III · 2023–2026+ · PICHAI WARTIME FULL-STACK AI ERA',
          title: '皮查伊全栈统合期：打破学院派温床，锻造科研深度与商业速度合一的铁军',
          desc: '面对 2023 年生成式 AI 浪潮与全球反垄断双线大考，皮查伊联合重返研发一线的谢尔盖·布林、新任 CFO Anat Ashkenazi 及 GDM 核心团队完成了谷歌史上最深刻的组织重塑：合并 Brain 与 DeepMind、合并 Android 与硬件、果断精简行政层级并将每年研发拉升至 $800亿+ 量级。',
          kpis: [['$510B+', 'Q3 2026 年化总营收规模'], ['$2.49M / 人', '20.48万员工年化超高人效'], ['36.2%', 'Google Cloud 分部营业利润率'], ['道指成分股', '2026.06 取代威瑞森纳入 DJIA']]
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

      function drawEraCanvas() {
        var env = prepCanvas('eraCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.eraCanvas = [];
        var pad = { top: 28, right: 20, bottom: 40, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.eView === 'revemp') {
          var yrs = ['2016', '2019', '2022', '2023', '2025', 'Q3\'26年化'];
          var revEmp = [1.25, 1.36, 1.49, 1.68, 2.11, 2.49];
          var maxV = 2.8;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv.toFixed(1) + 'M', pad.left - 8, gy + 4);
          }
          var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
          yrs.forEach(function (y, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (revEmp[i] / maxV) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i >= 4 ? pal.green : (i === 2 ? pal.amber : pal.blue);
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
            ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
            hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 人均年创收', body: '每位全职员工年创收 $' + revEmp[i].toFixed(2) + 'M' });
          });
        } else {
          var lyrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'TTM26'];
          var rdB = [31.6, 39.5, 45.4, 49.3, 61.1, 74.0];
          var opB = [78.7, 74.8, 84.3, 112.4, 129.0, 157.0];
          var maxF = 175;
          for (var k = 0; k <= 3; k++) {
            var kv = Math.round((maxF / 3) * k), ky = pad.top + ph - (k / 3) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
          }
          function plot(arr, col, name) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxF) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxF) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 0 || idx === 5) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText('$' + v.toFixed(0) + 'B', px, py - 8);
              }
              hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: lyrs[idx] + ' · ' + name, body: '$' + v.toFixed(1) + 'B' });
            });
          }
          lyrs.forEach(function (lb, idx) {
            var px = pad.left + (idx / 5) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(lb, px, pad.top + ph + 20);
          });
          plot(opB, pal.green, '合并营业利润 Operating Income');
          plot(rdB, pal.violet, '全集团研发投入 R&D');
        }
      }

      function drawGenomeCanvas() {
        var env = prepCanvas('genomeCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.genomeCanvas = [];
        var pad = { top: 24, right: 48, bottom: 26, left: 122 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        var peers = [
          { name: 'NVIDIA (扁平算力)', emp: 5.14, gm: 74.5, col: pal.violet },
          { name: 'Apple (单一P&L)', emp: 2.87, gm: 48.8, col: pal.green },
          { name: 'Alphabet (全栈AI)', emp: 2.49, gm: 59.7, col: pal.blue },
          { name: 'Meta (极客冲锋)', emp: 2.42, gm: 81.5, col: pal.amber },
          { name: 'Microsoft (事业部)', emp: 1.49, gm: 69.0, col: pal.blue }
        ];
        var isEmp = (state.gView === 'emp');
        var maxX = isEmp ? 5.8 : 90;
        var rowH = ph / peers.length;
        peers.forEach(function (p, idx) {
          var val = isEmp ? p.emp : p.gm;
          var cy = pad.top + idx * rowH + rowH / 2;
          var bh = 22, bl = (val / maxX) * pw;
          ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
          ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
          ctx.fillStyle = pal.sub; ctx.font = (idx === 2 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(p.name, pad.left - 10, cy + 4);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
          hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '年化人均创收 $' + p.emp.toFixed(2) + 'M · 综合毛利率 ' + p.gm.toFixed(1) + '%' });
        });
      }

      var entropySeries = [58, 72, 84, 91, 95];
      function drawEntropyCanvas() {
        var env = prepCanvas('entropyCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 20, right: 18, bottom: 24, left: 38 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = ['2022分治', '2023合并', '2024提速', '2026当前', '2027黄金年'];
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.5; ctx.beginPath();
        entropySeries.forEach(function (v, i) {
          var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        entropySeries.forEach(function (v, i) {
          var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
          ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(Math.round(v), px, py - 7);
          ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
          ctx.fillText(lbls[i], px, pad.top + ph + 15);
        });
      }

      function updateEntropySim() {
        var uni = parseInt(document.getElementById('rngUni').value, 10);
        var aiC = parseInt(document.getElementById('rngAiCode').value, 10);
        var drag = parseInt(document.getElementById('rngDrag').value, 10);
        document.getElementById('valUni').textContent = uni + '%' + (uni >= 85 ? ' (大一统)' : uni >= 60 ? ' (局部协同)' : ' (山头林立)');
        document.getElementById('valAiCode').textContent = aiC + '%';
        document.getElementById('valDrag').textContent = drag + '%' + (drag <= 28 ? ' (战时精简)' : ' (委员会拖沓)');

        var ship = Math.max(25, Math.min(99, Math.round(45 + uni * 0.42 + aiC * 0.24 - drag * 0.58)));
        var codeLift = Math.round(aiC * 0.42 - (drag - 20) * 0.18);
        var opmAnchor = Math.max(22.0, Math.min(39.0, 26.5 + (uni - 50) * 0.08 + aiC * 0.05 - (drag - 20) * 0.09)).toFixed(1);

        document.getElementById('outShip').textContent = ship + ' / 100';
        document.getElementById('outCode').textContent = (codeLift >= 0 ? '+' : '') + codeLift + '%';
        document.getElementById('outRoi').textContent = opmAnchor + '%';

        entropySeries = [
          Math.max(20, ship - 32),
          Math.max(28, ship - 18),
          Math.max(36, ship - 7),
          ship,
          Math.min(99, ship + 5)
        ];
        drawEntropyCanvas();
      }
      ['rngUni', 'rngAiCode', 'rngDrag'].forEach(function (id) {
        document.getElementById(id).addEventListener('input', updateEntropySim);
      });

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
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式');
      }

      function applyLang(lang, silent) {
        state.lang = (lang === 'en') ? 'en' : 'zh';
        document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
        var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
        if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
        if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
        var lead = document.getElementById('c0LeadText');
        if (lead) lead.innerHTML = C0_LEAD[state.lang];
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

      function bindSegChart(gid, attr, skey, fn) {
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
      bindSegChart('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
      bindSegChart('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);

      function bindTooltip(cid) {
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
            tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
            tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
          } else {
            tip.style.display = 'none';
          }
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['eraCanvas', 'genomeCanvas'].forEach(bindTooltip);

      function drawAll() {
        drawEraCanvas();
        drawGenomeCanvas();
        drawEntropyCanvas();
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
              its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
            }
            return;
          }
          var item = e.target.closest('.co-hub-item');
          if (item) {
            var jp = item.getAttribute('data-suite-jump');
            var ts = item.getAttribute('data-suite-toast');
            if (jp) {
              var el = document.querySelector(jp);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (ts) showToast(ts);
          }
        });
      }

      var QITEMS = [
        { id: 'sec-c0', t: 'C0 双层控股与 AI 大一统拓扑', s: '2026全栈合流 vs 2022前科研山头分治对比沙盘' },
        { id: 'sec-c1', t: 'C1 四大文化代码与氧气管理罗盘', s: '心理安全感 · 极限OKRs · 同侪委员会 · AI编码自举' },
        { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1998–2026+)', s: '佩奇&布林 / Alphabet重组 / 皮查伊战时统合 · 人效 $2.49M' },
        { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱与阴阳对决', s: 'Alphabet vs Apple / NVIDIA / Meta / 微软 / 伯克希尔' },
        { id: 'sec-c4', t: 'C4 共识延迟模拟器与谷歌六律体检', s: '组织合流与AI编程提效模拟 · 6项持久化核查清单' }
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
        document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
      }
      document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); } });

      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
      sbBtn.addEventListener('click', function () {
        if (window.innerWidth >= 1024) {
          var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
          if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
          else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
          try { localStorage.setItem('mui_portal_sidebar_collapsed_v1', col ? '0' : '1'); } catch (e) {}
          setTimeout(drawAll, 60);
        } else {
          var open = sb.classList.toggle('open'); bd.classList.toggle('open', open);
        }
      });
      bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

      
      
      

      window.addEventListener('scroll', function () {
        var bar = document.getElementById('readingProgressBar');
        if (bar) {
          var dh = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
        }
      }, { passive: true });

      function refreshAuditChip() {
        var boxes = document.querySelectorAll('[data-cchk]');
        var done = 0;
        for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
        var chip = document.getElementById('auditScoreChip');
        if (chip) chip.textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项';
      }
      try {
        var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
        document.querySelectorAll('[data-cchk]').forEach(function (chk) {
          var k = chk.getAttribute('data-cchk');
          chk.checked = !!savedA[k];
          chk.addEventListener('change', function () {
            savedA[k] = chk.checked;
            try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {}
            refreshAuditChip();
            showToast(chk.checked ? '已勾选该组织护城河指标' : '已取消勾选');
          });
        });
        refreshAuditChip();
      } catch (e) {}

      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {}

      document.getElementById('appbarThemeBtn').addEventListener('click', function () {
        var nxt = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nxt, false);
        try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
      });
      document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
        var lb = e.target.closest('[data-lang]');
        if (!lb) return;
        var nl = lb.getAttribute('data-lang');
        applyLang(nl, false);
        try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
      });

      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
      updateEntropySim();
      drawAll();
    })();
  