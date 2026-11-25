
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_AUDIT_KEY = 'aapl_culture_bp_audit_v1';

      var state = { theme: 'dark', lang: 'zh', eView: 'revemp', gView: 'emp' };
      var hits = { eraCanvas: [], genomeCanvas: [] };

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
          green: dark ? '#22C55E' : '#16A34A',
          violet: dark ? '#A78BFA' : '#7C3AED',
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

      // C0: Interactive Topology Switcher (Single-P&L vs Siloed Multi-P&L)
      var topoSwitch = document.getElementById('topoSwitch');
      if (topoSwitch) {
        topoSwitch.addEventListener('click', function (e) {
          var b = e.target.closest('[data-topo]');
          if (!b) return;
          var mode = b.getAttribute('data-topo');
          var bs = topoSwitch.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var stage = document.getElementById('topoStage');
          if (mode === 'apple') {
            stage.innerHTML =
              '<div class="cc-topo-hub mono">CEO (John Ternus) × CFO 唯一损益表池 ($478.8B)</div>' +
              '<div class="cc-topo-spokes">' +
                '<div class="cc-spoke"><b>芯片技术 SVP</b>Johny Srouji · A/M/C 硅片跨全品类无偿共享</div>' +
                '<div class="cc-spoke"><b>软件工程 SVP</b>Craig Federighi · 6大OS共享内核与端侧 AI</div>' +
                '<div class="cc-spoke"><b>硬件工程 SVP</b>全系结构/声学/光学相机模组统一攻坚</div>' +
                '<div class="cc-spoke"><b>工业与人机设计</b>Squircle 曲率与交互规范全局一票否决权</div>' +
                '<div class="cc-spoke"><b>服务生态 SVP</b>Eddy Cue · 零内耗预装 iCloud / Pay / Music</div>' +
                '<div class="cc-spoke"><b>全球运营/零售</b>Sabih Khan · 统一采购锁产能 + 540店零折扣</div>' +
              '</div>' +
              '<div class="cc-topo-outcome">结果：相机团队不为自身利润惜售算法，Mac 主动配合 iPhone 连续互通，新品敢于自我革命（iPhone 吞噬 iPod）</div>';
          } else {
            stage.innerHTML =
              '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统集团控股总部 · 各事业部总经理背负独立 KPI 与奖金池</div>' +
              '<div class="cc-topo-spokes">' +
                '<div class="cc-spoke silo"><b>手机事业部 GM</b>独自养一套芯片/OS团队，拒绝补贴平板部门</div>' +
                '<div class="cc-spoke silo"><b>PC 电脑事业部 GM</b>死守旧接口标准，抗拒与手机底层打通</div>' +
                '<div class="cc-spoke silo"><b>音频/相机事业部</b>担心影响高端单品毛利，拒绝下放旗舰传感器</div>' +
                '<div class="cc-spoke silo"><b>云与内容事业部</b>内部结算高额渠道分成，预装谈判旷日持久</div>' +
                '<div class="cc-spoke silo"><b>区域销售诸侯</b>为冲季度返点各自打折，破坏全球高端定价体系</div>' +
                '<div class="cc-spoke silo"><b>采购各自为政</b>订单分散丧失对晶圆厂与存储厂的首发包产议价权</div>' +
              '</div>' +
              '<div class="cc-topo-outcome warn">恶果：典型的昔日索尼/诺基亚困境——每个部门都在最大化局部报表，最终输掉跨终端系统级体验战</div>';
          }
        });
      }

      // C1: 2x2 Quadrant Selector + Discretionary Leadership Dial
      var QUADS = [
        {
          badge: 'Q1 · EXPERTS LEADING EXPERTS (HBR)',
          title: '专家治企三大硬指标：深度专业 × 细节沉浸 × 协同辩论',
          desc: '在苹果，600 多名硬件相机专家归属于同一个相机硬件副总裁，而非散落在 iPhone、iPad 或 Mac 事业部。高管不仅要懂方向，更要懂底层物理约束（如双摄人像景深算法或超椭圆连续曲率），才能在跨部门辩论中做出专业裁决。',
          alloc: [45, 25, 18, 12]
        },
        {
          badge: 'Q2 · DRI ACCOUNTABILITY & TOP 100',
          title: 'DRI 直接责任人铁律：消灭大公司最致命的“集体免责”',
          desc: '《财富》杂志披露，苹果内部流传一句格言：“永远不存在没有单点负责人的项目。”当年 MobileMe 首秀失利，乔布斯当场更换 DRI 并重组团队，最终锻造出支撑超 15 亿付费订阅的 iCloud 云底座。',
          alloc: [38, 22, 15, 25]
        },
        {
          badge: 'Q3 · RADICAL FOCUS & SECRECY',
          title: '残酷减法：对 99 个好点子说“不”，只把全部算力砸向 1 个神作',
          desc: '1997 年苹果产品线杂乱无章，乔布斯在白板上画出“消费/专业 × 台式/便携” 2×2 四格表，砍掉 70% 项目。即便在万亿市值阶段，苹果依然果断关停缺乏护城河闭环的整车制造，将数千名工程师火速转入端侧生成式 AI。',
          alloc: [50, 28, 12, 10]
        },
        {
          badge: 'Q4 · APPLE UNIVERSITY CODIFICATION',
          title: 'Apple University：把创始人的直觉转化为可传承的组织教材',
          desc: '毕加索画《公牛》从第一版繁复写实到第十一版仅余寥寥数笔却神韵毕现——苹果大学以此训练每一代新晋总监：伟大的工程不是堆砌参数，而是替用户消化全部底层复杂度，只留下最直觉的交互。',
          alloc: [25, 30, 30, 15]
        }
      ];
      var quadGrid = document.getElementById('quadGrid');
      if (quadGrid) {
        quadGrid.addEventListener('click', function (e) {
          var card = e.target.closest('[data-quad]');
          if (!card) return;
          var idx = parseInt(card.getAttribute('data-quad'), 10) || 0;
          var cs = quadGrid.querySelectorAll('.cc-quad-card');
          for (var i = 0; i < cs.length; i++) cs[i].classList.toggle('active', cs[i] === card);
          var q = QUADS[idx];
          document.getElementById('dialBadge').textContent = q.badge;
          document.getElementById('dialTitle').textContent = q.title;
          document.getElementById('dialDesc').textContent = q.desc;
          var ids = [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]];
          ids.forEach(function (pair) {
            document.getElementById('pct' + pair[0]).textContent = pair[1] + '%';
            document.getElementById('bar' + pair[0]).style.width = pair[1] + '%';
          });
        });
      }

      // C2: 3-Era Leadership Scrubber
      var ERAS = [
        {
          badge: 'ERA I · 1997–2011 · STEVE JOBS REFOUNDING',
          title: '乔布斯重塑期：一日废除事业部诸侯，用“海盗精神”拯救濒死苹果',
          desc: '1997 年回归时苹果距破产仅 90 天。乔布斯一天内裁撤全部事业部总经理、确立唯一损益表职能制，用 2×2 矩阵砍掉 70% 冗余型号，建立工业设计至高话语权、DRI 问责制与 Top 100 峰会，接连引爆 iMac、iPod、iTunes、iPhone、App Store 与 iPad 六大物种革命。',
          kpis: [['$7.1B → $108B', '14年营收暴增逾 15 倍'], ['2×2 四象限', '砍掉 70% 亏损杂乱产品线'], ['2008 创立', 'Apple University 制度化传承'], ['单一 P&L', '彻底终结内部部门利润墙']]
        },
        {
          badge: 'ERA II · 2011–2026.08 · TIM COOK SCALING SYMPHONY',
          title: '库克扩张期：在十倍规模上升级“审慎领导力”，打造自研芯片与服务双帝国',
          desc: '外界曾质疑职能制无法支撑十万人级巨舰，库克却在保持单一损益表不变的前提下，推动 SVP 团队践行“审慎领导力”，完成苹果史上最硬核的 Apple Silicon（A/M 系列）全系自研切换，孵化出 Apple Watch 与 AirPods 两大百亿级新品类，并将高毛利服务业务推过千亿美元大关。',
          kpis: [['$108B → $479B', '营收再翻 4.4 倍登顶全球'], ['-58天 CCC', '全球极致供应链零库存艺术'], ['>25亿台', '全球活跃安装设备底座'], ['>$7,300亿', '累计股票回购重塑股东回报']]
        },
        {
          badge: 'ERA III · 2026.09+ · JOHN TERNUS PRODUCT ENGINEERING ERA',
          title: '约翰·特努斯时代（库克转任执行董事长）：老兵回归产品工程第一性原理',
          desc: '在库克掌舵 15 年将苹果推上 $5万亿市值后，深耕苹果硬件工程逾二十年、主导过 iPad、Mac 向 Apple Silicon 迁移及 iPhone 架构重构的 John Ternus 接任 CEO。这一交接本身就是“专家领导专家”文化的最高加冕：在端侧 Siri AI、折叠机 iPhone Duo 与触控 Mac 破局的关键十年，最高决策权交还给最懂工程细节的产品统帅。',
          kpis: [['$478.83B', 'FY2026 历史新高总营收'], ['$2.87M / 人', '16.7万全职员工超高人效'], ['48.8%', '全栈自研推升综合毛利率'], ['6大OS + AI', '端侧隐私大模型深度耦合']]
        }
      ];
      var eraTabs = document.getElementById('eraTabs');
      if (eraTabs) {
        eraTabs.addEventListener('click', function (e) {
          var t = e.target.closest('[data-era]');
          if (!t) return;
          var idx = parseInt(t.getAttribute('data-era'), 10) || 0;
          var ts = eraTabs.querySelectorAll('.cc-era-tab');
          for (var i = 0; i < ts.length; i++) ts[i].classList.toggle('active', ts[i] === t);
          var er = ERAS[idx];
          document.getElementById('eraBadge').textContent = er.badge;
          document.getElementById('eraTitle').textContent = er.title;
          document.getElementById('eraDesc').textContent = er.desc;
          document.getElementById('eraKpis').innerHTML = er.kpis.map(function (k) {
            return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
          }).join('');
        });
      }

      // High-DPI Retina Canvas Helpers
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
          var yrs = ['1997', '2005', '2011', '2016', '2021', '2026'];
          var revEmp = [0.70, 0.94, 1.79, 1.86, 2.37, 2.87];
          var maxV = 3.2;
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
            ctx.fillStyle = i >= 4 ? pal.violet : pal.blue;
            if (i === 5) ctx.fillStyle = pal.green;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + revEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
            ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
            hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: 'FY' + y + ' 人均创收', body: '每位全职员工年创收 $' + revEmp[i].toFixed(2) + 'M（单一损益表无冗余中后台内耗）' });
          });
        } else {
          var lyrs = ['FY18', 'FY20', 'FY22', 'FY24', 'FY26'];
          var rdB = [14.2, 18.8, 26.3, 31.4, 35.6];
          var fcfB = [64.1, 73.4, 111.4, 108.8, 136.1];
          var maxF = 150;
          for (var k = 0; k <= 3; k++) {
            var kv = k * 50, ky = pad.top + ph - (kv / maxF) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
          }
          function plot(arr, col, name) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (lyrs.length - 1)) * pw, py = pad.top + ph - (v / maxF) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (lyrs.length - 1)) * pw, py = pad.top + ph - (v / maxF) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
              ctx.fillText('$' + v + 'B', px, py - 8);
              hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: lyrs[idx] + ' · ' + name, body: '$' + v + 'B（单一共享研发池跨全产品线复用）' });
            });
          }
          lyrs.forEach(function (lb, idx) {
            var px = pad.left + (idx / (lyrs.length - 1)) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(lb, px, pad.top + ph + 20);
          });
          plot(fcfB, pal.green, '年度自由现金流 FCF');
          plot(rdB, pal.blue, '全栈共享研发投入 R&D');
        }
      }

      function drawGenomeCanvas() {
        var env = prepCanvas('genomeCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.genomeCanvas = [];
        var pad = { top: 24, right: 44, bottom: 26, left: 118 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        var peers = [
          { name: 'NVIDIA (职能扁平)', emp: 5.14, gm: 74.5, col: pal.violet },
          { name: 'Apple (单一P&L)', emp: 2.87, gm: 48.8, col: pal.blue },
          { name: 'Meta (黑客扁平)', emp: 2.42, gm: 81.5, col: pal.green },
          { name: 'Alphabet (工程行会)', emp: 1.92, gm: 58.2, col: pal.amber },
          { name: 'Microsoft (事业部)', emp: 1.49, gm: 69.0, col: pal.blue }
        ];
        var isEmp = (state.gView === 'emp');
        var maxX = isEmp ? 5.8 : 90;
        var rowH = ph / peers.length;
        peers.forEach(function (p, idx) {
          var val = isEmp ? p.emp : p.gm;
          var cy = pad.top + idx * rowH + rowH / 2;
          var bh = 22, bl = (val / maxX) * pw;
          ctx.fillStyle = pal.grid;
          roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
          ctx.fillStyle = p.col;
          roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
          ctx.fillStyle = pal.sub; ctx.font = (idx === 1 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(p.name, pad.left - 10, cy + 4);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
          hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '人均创收 $' + p.emp.toFixed(2) + 'M · 综合毛利率 ' + p.gm.toFixed(1) + '%' });
        });
      }

      // C4: Scaling Bottleneck Simulator + Mini Canvas
      var entropySeries = [93, 88, 82, 74, 65];
      function drawEntropyCanvas() {
        var env = prepCanvas('entropyCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 20, right: 18, bottom: 24, left: 38 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = ['15款SKU', '30款(苹果)', '60款', '90款', '120款(机海)'];
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
        entropySeries.forEach(function (v, i) {
          var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        entropySeries.forEach(function (v, i) {
          var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / 100) * ph;
          ctx.fillStyle = i === 1 ? pal.green : pal.violet;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(Math.round(v), px, py - 7);
          ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
          ctx.fillText(lbls[i], px, pad.top + ph + 15);
        });
      }

      function updateEntropySim() {
        var skus = parseInt(document.getElementById('rngSkus').value, 10);
        var exp = parseInt(document.getElementById('rngExp').value, 10);
        var lag = parseInt(document.getElementById('rngLag').value, 10);
        document.getElementById('valSkus').textContent = skus + ' 款' + (skus <= 35 ? ' (极简区)' : skus <= 70 ? ' (膨胀警戒)' : ' (机海失控)');
        document.getElementById('valExp').textContent = exp + '%';
        document.getElementById('valLag').textContent = lag + '%';

        var skuPenalty = Math.max(0, (skus - 25) * 0.42);
        var expBonus = (exp - 50) * 0.48;
        var synergy = Math.max(25, Math.min(99, Math.round(80 + expBonus - skuPenalty * 0.7 - (lag - 18) * 0.35)));
        var velocity = Math.max(20, Math.min(98, Math.round(94 - skuPenalty * 0.85 - (lag - 15) * 0.55 + (exp - 70) * 0.2)));
        var gmPrem = Math.max(-2.0, ((synergy - 50) * 0.27)).toFixed(1);

        document.getElementById('outSynergy').textContent = synergy + ' / 100';
        document.getElementById('outVelocity').textContent = velocity + ' / 100';
        document.getElementById('outGmPrem').textContent = (gmPrem >= 0 ? '+' : '') + gmPrem + 'pp';

        entropySeries = [15, 30, 60, 90, 120].map(function (s) {
          var sp = Math.max(0, (s - 25) * 0.45);
          return Math.max(22, Math.min(99, 80 + expBonus - sp - (lag - 18) * 0.35));
        });
        drawEntropyCanvas();
      }
      ['rngSkus', 'rngExp', 'rngLag'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', updateEntropySim);
      });

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

      // Quick Jump ⌘K
      var QITEMS = [
        { id: 'sec-c0', t: 'C0 单一损益表拓扑与初创悖论', s: '1997一日裁撤事业部GM · 职能制 vs 事业部诸侯对比沙盘' },
        { id: 'sec-c1', t: 'C1 四大文化基因与审慎领导力罗盘', s: '专家领导专家 · Squircle圆角 · DRI问责 · 苹果大学毕加索公牛' },
        { id: 'sec-c2', t: 'C2 三代治理演进时间轴 (1997–2026+)', s: '乔布斯 / 库克 / 约翰·特努斯 · 人均创收跃迁至 $2.87M' },
        { id: 'sec-c3', t: 'C3 全球巨头组织基因光谱对比', s: 'Apple vs NVIDIA / 微软 / 亚马逊 / 伯克希尔阴阳两极对照' },
        { id: 'sec-c4', t: 'C4 组织熵增模拟器与苹果六律体检', s: 'SKU 复杂度压力测试 · 6项组织健康度持久化核查清单' }
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

      // Mobile Drawer, Scroll Progress & 6-Law Audit Persistence
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

      // Init Theme, Lang & Resize
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
      updateEntropySim();
      drawAll();
    })();
  