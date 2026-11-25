
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
      var STORAGE_DIAG_KEY = 'arm_culture_diag_v1';

      var state = {
        theme: 'dark',
        lang: 'zh',
        ch1View: 'rev',
        radarPeer: 'all'
      };

      var hitRegions = { chartCh1: [], chartBars: [], chartEps: [] };

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

      function setupHiDPI(canvas) {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var rect = canvas.getBoundingClientRect();
        var w = Math.max(260, Math.floor(rect.width));
        var h = Math.max(140, Math.floor(rect.height));
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
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

      // Sidebar Suite Hub
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

      // Ch 01: Org Node Inspector
      var ORG_DATA = {
        ceo: {
          t: 'Rene Haas · 首席执行官：把英伟达全栈商业化速度注入剑桥 36 年架构底座',
          b: '2013 年加入 Arm 执掌 IP 产品事业群（IPG），2022 年 2 月接任 CEO 并兼任软银集团董事。打破过去按单颗 CPU/GPU 模块分割的组织孤岛，重组为面向终端算力痛点的 Cloud AI、Edge AI、Physical AI 三大事业部，主导 CSS 子系统翻倍费率与首款 3nm 136 核 Arm AGI CPU 整芯突破。'
        },
        grisenthwaite: {
          t: 'Richard Grisenthwaite · 执行副总裁兼首席架构师（FREng 皇家工程院院士）',
          b: '剑桥大学物理学毕业，在 Arm 执掌顶层指令集架构逾 22 年，个人拥有 120 项核心专利。主导从 Armv6、64 位 Armv8 到 Armv9（机密计算 CCA 与矩阵扩展 SME2）的全部代际演进，执掌“指令集架构一致性一票否决权”，确保全球 3,000 万开发者生态零分裂。'
        },
        campbell: {
          t: 'Gary Campbell · 中央工程执行副总裁（EVP, Central Engineering）',
          b: '1998 年即以 CPU 微架构设计师身份加入剑桥总部，拥有 35 年芯片研发管理资历。统管全球超过 8,000 名工程师中的底层微架构池（Cortex / Neoverse / Immortalis GPU），将经过严苛验证的基础计算积木输出给三大垂直 AI 事业部。'
        },
        halter: {
          t: 'Steve Halter · 解决方案工程高级副总裁（SVP, Solutions Engineering）',
          b: '负责打通软硬件协同与物理实现最后一公里：领导先进工艺节点（TSMC 3nm N3P / 2nm）下的 UCIe 2 TB/s 双芯粒封装互联、DDR5/PCIe Gen6 系统集成以及 CSS / AGI CPU 的流片工程交付。'
        },
        hayes: {
          t: 'Eric Hayes · 运营执行副总裁（EVP, Operations）',
          b: '统筹晶圆代工与封测外部生态供应链（台积电、CoWoS/先进封装伙伴）、全球大规模 EDA 仿真云算力调度及跨美、英、欧、印研发中心的工程交付节奏，支撑 Arm 从纯 IP 交付向实体硅片运营跨越。'
        },
        awad: {
          t: 'Mohamed Awad · 云端 AI 事业部执行副总裁（EVP, Cloud AI BU）',
          b: '统帅增速最猛的数据中心战线：一方面通过 Neoverse CSS 赋能 AWS Graviton、NVIDIA Grace Blackwell、Google Axion 与 Microsoft Cobalt（头部云商新部署份额已达 ~50%）；另一方面携手首席伙伴 Meta 推进首款自研 136 核 Arm AGI CPU 剑指 FY31 ~$150亿硅片营收。'
        },
        bergey: {
          t: 'Chris Bergey · 边缘 AI 事业部执行副总裁（EVP, Edge AI BU）',
          b: '坐镇 >99% 市场份额的智能手机现金牛并开辟 AI PC 第二战场（Q2 FY27 Arm 架构 PC 已占全球出货约 20%）。主导推出 Mobile CSS 2 / Lumex 与 SME2 矩阵引擎（端侧 Agentic AI 提速 70%）及新一代 Mali G2-Ultra NX 光追图形架构。'
        },
        henry: {
          t: 'Drew Henry · 物理 AI 事业部执行副总裁（EVP, Physical AI BU）',
          b: '前 NVIDIA GeForce 总经理；将智能汽车与具身机器人整合为统一 Physical AI 事业部（Q2 FY27 版税同比大增 +50%）。推出车规级 Zena CSS（缩短车企 12 个月芯片研发周期，赋能单车搭载超 400 颗 Arm 核的 Tensor L4 自动驾驶出租车）及覆盖 80+ 伙伴的 Arm Total Design 生态。'
        },
        abbey: {
          t: 'Will Abbey · 执行副总裁兼首席商务官（EVP & CCO）',
          b: '2004 年加入 Arm 的资深商业统帅，兼任安谋科技（Arm China）董事。主导从脉冲式单次授权向长周期订阅制转型，将 Arm Total Access 扩展至 56 家核心巨头（覆盖超半数 Top 30 客户）、Flexible Access 扩展至 329 家创新企业。'
        },
        child: {
          t: 'Jason Child · 执行副总裁兼首席财务官（EVP & CFO）',
          b: '前 Splunk CFO 与亚马逊国际零售 CFO；为 Arm 引入高透明度 ACV（$17.32亿）与 RPO（$20.71亿）经常性合同指标，主导 FY26 $15.24亿经营现金流跃升及 FY2031 $250亿营收 / >$9.00 Non-GAAP EPS 长期资本配置框架。'
        },
        badani: {
          t: 'Ami Badani · 首席营销官与开发者生态负责人（CMO）',
          b: '前 NVIDIA 数据中心营销负责人；统管全球开发者生态战略，推动开源推理加速库 KleidiAI 深度集成至 PyTorch、MediaPipe 与主流端云大模型框架，助力全球原生 Arm 开发者在 Q2 FY27 突破 3,000 万大关。'
        },
        eaton: {
          t: 'Charlotte Eaton (CPO) & Spencer Collins (EVP, CLO & Corp Dev)',
          b: 'CPO 守护 84.1% 极端工程师密度与跨剑桥/奥斯汀/班加罗尔人才梯队；CLO Spencer Collins 统领高通许可诉讼攻防、全球反垄断合规及 2025 年剥离 Artisan 物理 IP 等战略资产优化。'
        }
      };
      var orgBp = document.getElementById('orgBlueprint');
      if (orgBp) {
        orgBp.addEventListener('click', function (e) {
          var nd = e.target.closest('[data-org]');
          if (!nd) return;
          var key = nd.getAttribute('data-org');
          var d = ORG_DATA[key];
          if (!d) return;
          var all = orgBp.querySelectorAll('[data-org]');
          for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === nd);
          document.getElementById('orgInsTitle').textContent = d.t;
          document.getElementById('orgInsBody').textContent = d.b;
        });
      }

      // Chart Ch1: Revenue Split vs Workforce Purity
      function drawChartCh1() {
        var c = document.getElementById('chartCh1');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        hitRegions.chartCh1 = [];
        var pad = { top: 28, right: 44, bottom: 34, left: 48 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.ch1View === 'rev') {
          var yrs = ['FY23', 'FY24', 'FY25', 'FY26'];
          var roy = [1675, 1802, 2168, 2613];
          var lic = [1004, 1431, 1839, 2307];
          var maxV = 5400;
          for (var g = 0; g <= 4; g++) {
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + Math.round((g / 4) * maxV) + 'M', pad.left - 6, gy + 3);
          }
          var bw = Math.min(54, pw / 7);
          yrs.forEach(function (yr, i) {
            var cx = pad.left + (i + 0.5) * (pw / yrs.length);
            var hR = (roy[i] / maxV) * ph;
            var hL = (lic[i] / maxV) * ph;
            var yR = pad.top + ph - hR;
            var yL = yR - hL;
            ctx.fillStyle = pal.blue;
            ctx.fillRect(cx - bw / 2, yR, bw, hR);
            ctx.fillStyle = pal.green;
            ctx.fillRect(cx - bw / 2, yL, bw, hL);
            var tot = roy[i] + lic[i];
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + tot + 'M', cx, yL - 6);
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
            ctx.fillText(yr, cx, pad.top + ph + 18);
            hitRegions.chartCh1.push({
              x: cx - bw / 2, y: yL, w: bw, h: hR + hL,
              title: yr + ' 总营收 $' + tot + 'M',
              body: '版税收入 (蓝): $' + roy[i] + 'M · 授权及其他 (绿): $' + lic[i] + 'M'
            });
          });
        } else {
          var fYrs = ['FY23', 'FY24', 'FY25', 'FY26'];
          var ftes = [5963, 7096, 8330, 9584];
          var engPct = [80.5, 82.8, 83.3, 84.1];
          var maxF = 11000;
          for (var k = 0; k <= 4; k++) {
            var ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(Math.round((k / 4) * maxF), pad.left - 6, ky + 3);
          }
          var bw2 = Math.min(54, pw / 7);
          var pts = [];
          fYrs.forEach(function (yr, i) {
            var cx = pad.left + (i + 0.5) * (pw / fYrs.length);
            var bh = (ftes[i] / maxF) * ph;
            var by = pad.top + ph - bh;
            ctx.fillStyle = pal.blueSoft;
            ctx.strokeStyle = pal.blue;
            ctx.lineWidth = 1.5;
            ctx.fillRect(cx - bw2 / 2, by, bw2, bh);
            ctx.strokeRect(cx - bw2 / 2, by, bw2, bh);
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(ftes[i].toLocaleString() + '人', cx, by - 6);
            ctx.fillStyle = pal.tick; ctx.fillText(yr, cx, pad.top + ph + 18);
            var py = pad.top + ph - ((engPct[i] - 70) / 20) * ph;
            pts.push({ x: cx, y: py, pct: engPct[i], yr: yr, fte: ftes[i] });
            hitRegions.chartCh1.push({
              x: cx - bw2 / 2, y: Math.min(by, py - 10), w: bw2, h: pad.top + ph - Math.min(by, py - 10),
              title: yr + ' 组织规模: ' + ftes[i].toLocaleString() + ' FTE',
              body: '研发工程师占比: ' + engPct[i] + '%（FY26 达 8,058 名工程师）'
            });
          });
          ctx.strokeStyle = pal.amber; ctx.lineWidth = 2.4; ctx.beginPath();
          pts.forEach(function (p, idx) { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
          ctx.stroke();
          pts.forEach(function (p) {
            ctx.fillStyle = pal.amber; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = pal.amber; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(p.pct + '% 工程', p.x, p.y - 10);
          });
        }
      }

      // Chart Ch2: 5-Axis Radar
      function drawChartRadar() {
        var c = document.getElementById('chartRadar');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        var cx = w / 2, cy = h / 2 + 6, r = Math.min(w, h) * 0.34;
        var labels = state.lang === 'en'
          ? ['Asset-Light GM (97.5%)', 'Engineer Purity (84.1%)', 'Ecosystem Neutrality', 'Full-Stack Monetization', 'Long-Tail Predictability']
          : ['轻资产毛利率 (97.5%)', '工程师纯度 (84.1%)', '跨厂商生态中立性', '软硬全栈变现力', '长尾版税可预期性'];
        var armVals = [98, 95, 92, 74, 94];
        var nvdaVals = [76, 86, 58, 99, 78];
        var idmVals = [38, 56, 42, 66, 55];

        for (var ring = 1; ring <= 4; ring++) {
          var rr = (ring / 4) * r;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath();
          for (var a = 0; a < 5; a++) {
            var ang = -Math.PI / 2 + (a * 2 * Math.PI) / 5;
            var px = cx + Math.cos(ang) * rr, py = cy + Math.sin(ang) * rr;
            if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke();
        }
        for (var j = 0; j < 5; j++) {
          var ang2 = -Math.PI / 2 + (j * 2 * Math.PI) / 5;
          var ex = cx + Math.cos(ang2) * r, ey = cy + Math.sin(ang2) * r;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
          var lx = cx + Math.cos(ang2) * (r + 22), ly = cy + Math.sin(ang2) * (r + 18);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = Math.abs(Math.cos(ang2)) < 0.2 ? 'center' : (Math.cos(ang2) > 0 ? 'left' : 'right');
          ctx.fillText(labels[j], lx, ly + 4);
        }

        function plotPoly(vals, stroke, fill, dash) {
          ctx.save();
          if (dash) ctx.setLineDash(dash);
          ctx.strokeStyle = stroke; ctx.fillStyle = fill; ctx.lineWidth = 2.2;
          ctx.beginPath();
          for (var i = 0; i < 5; i++) {
            var ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
            var vr = (vals[i] / 100) * r;
            var x = cx + Math.cos(ang) * vr, y = cy + Math.sin(ang) * vr;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.restore();
        }

        if (state.radarPeer === 'all' || state.radarPeer === 'idm') {
          plotPoly(idmVals, pal.amber, 'rgba(217, 119, 6, 0.08)', [3, 3]);
        }
        if (state.radarPeer === 'all' || state.radarPeer === 'nvda') {
          plotPoly(nvdaVals, pal.green, 'rgba(22, 163, 74, 0.10)', [6, 4]);
        }
        plotPoly(armVals, pal.blue, pal.blueSoft, null);
      }

      // Chart Ch3: 6-Row Horizontal Anatomy Bars
      function drawChartBars() {
        var c = document.getElementById('chartBars');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        hitRegions.chartBars = [];
        var items = [
          { lbl: 'GAAP 毛利率 (Gross Margin)', val: 97.5, col: pal.blue, desc: '$4,799M 毛利 / $4,920M 营收 (Non-GAAP 达 98.2%)' },
          { lbl: '研发工程师占比 (Engineers / FTE)', val: 84.1, col: pal.green, desc: '8,058 名工程师 / 9,584 名全职员工' },
          { lbl: 'GAAP 研发投入率 (R&D / Rev)', val: 56.4, col: pal.violet, desc: '$2,776M 研发总投入 (+34% YoY；Non-GAAP 为 38.8%)' },
          { lbl: 'Non-GAAP 营业利润率 (Op Margin)', val: 43.0, col: pal.blue, desc: '$2,115M Non-GAAP 营业利润 (Non-GAAP EPS $1.77)' },
          { lbl: 'GAAP 销售管理率 (SG&A / Rev)', val: 22.7, col: pal.amber, desc: '$1,115M SG&A 费用 (Non-GAAP 为 16.4%)' },
          { lbl: 'GAAP 营业利润率 (含 $1.05B SBC)', val: 18.3, col: pal.green, desc: '$900M GAAP 营业利润，扣除 $1,052M 股权激励后净利 $904M' }
        ];
        var padL = Math.min(235, w * 0.38), padR = 64, padT = 12, rowH = (h - padT * 2) / items.length;
        var barMaxW = w - padL - padR;
        items.forEach(function (it, i) {
          var ry = padT + i * rowH;
          var bh = Math.min(20, rowH * 0.56);
          var by = ry + (rowH - bh) / 2;
          ctx.fillStyle = pal.sub; ctx.font = '600 11.5px "Plus Jakarta Sans", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(it.lbl, padL - 10, by + bh * 0.76);
          ctx.fillStyle = pal.grid;
          ctx.fillRect(padL, by, barMaxW, bh);
          var fw = (it.val / 100) * barMaxW;
          ctx.fillStyle = it.col;
          ctx.fillRect(padL, by, fw, bh);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText(it.val.toFixed(1) + '%', padL + fw + 8, by + bh * 0.78);
          hitRegions.chartBars.push({ x: padL, y: by, w: barMaxW, h: bh, title: it.lbl + ': ' + it.val + '%', body: it.desc });
        });
      }

      // Chart Ch4: Profit & GM History
      function drawChartEps() {
        var c = document.getElementById('chartEps');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        hitRegions.chartEps = [];
        var yrs = ['FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
        var ngOp = [830, 783, 1408, 1871, 2115];
        var gm = [95.2, 96.0, 95.2, 97.0, 97.5];
        var pad = { top: 28, right: 36, bottom: 34, left: 48 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var maxOp = 2400;

        for (var g = 0; g <= 4; g++) {
          var gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round((g / 4) * maxOp) + 'M', pad.left - 6, gy + 3);
        }
        var bw = Math.min(46, pw / 8);
        var linePts = [];
        yrs.forEach(function (yr, i) {
          var cx = pad.left + (i + 0.5) * (pw / yrs.length);
          var bh = (ngOp[i] / maxOp) * ph;
          var by = pad.top + ph - bh;
          ctx.fillStyle = (i === 4) ? pal.blue : pal.blueSoft;
          ctx.strokeStyle = pal.blue; ctx.lineWidth = 1.4;
          ctx.fillRect(cx - bw / 2, by, bw, bh);
          ctx.strokeRect(cx - bw / 2, by, bw, bh);
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + ngOp[i] + 'M', cx, by - 6);
          ctx.fillStyle = pal.tick; ctx.fillText(yr, cx, pad.top + ph + 18);
          var ly = pad.top + 12 + (100 - gm[i]) * 4.2;
          linePts.push({ x: cx, y: ly, gm: gm[i] });
          hitRegions.chartEps.push({
            x: cx - bw / 2, y: Math.min(by, ly - 8), w: bw, h: pad.top + ph - Math.min(by, ly - 8),
            title: yr + ' 盈利护城河',
            body: 'Non-GAAP 营业利润: $' + ngOp[i] + 'M · GAAP 毛利率: ' + gm[i] + '%'
          });
        });
        ctx.strokeStyle = pal.green; ctx.lineWidth = 2.2; ctx.beginPath();
        linePts.forEach(function (p, i) { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.stroke();
        linePts.forEach(function (p) {
          ctx.fillStyle = pal.green; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
          ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(p.gm + '% GM', p.x, p.y - 8);
        });
      }

      // Ch 04: Simulator
      var simSeries = [4.92, 6.4, 8.6, 11.8, 15.2, 19.1];
      function drawChartSim() {
        var c = document.getElementById('chartSim');
        if (!c) return;
        var s = setupHiDPI(c), ctx = s.ctx, w = s.w, h = s.h, pal = getPalette();
        var pad = { top: 20, right: 20, bottom: 24, left: 36 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var yrs = ['FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
        var maxV = Math.max(12, Math.max.apply(null, simSeries) * 1.16);
        ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.4; ctx.beginPath();
        simSeries.forEach(function (v, i) {
          var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxV) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        simSeries.forEach(function (v, i) {
          var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxV) * ph;
          ctx.fillStyle = (i === 5) ? pal.green : pal.blue;
          ctx.beginPath(); ctx.arc(px, py, 3.8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(1) + 'B', px, py - 7);
          ctx.fillStyle = pal.tick; ctx.font = '9.5px "IBM Plex Mono", monospace';
          ctx.fillText(yrs[i], px, pad.top + ph + 15);
        });
      }

      function runSim() {
        var ipCagr = parseFloat(document.getElementById('rngSimIp').value) / 100;
        var chip31 = parseFloat(document.getElementById('rngSimChip').value);
        var fte31 = parseInt(document.getElementById('rngSimFte').value, 10);
        document.getElementById('lblSimIp').textContent = (ipCagr * 100).toFixed(1) + '%';
        document.getElementById('lblSimChip').textContent = '$' + chip31.toFixed(1) + 'B';
        document.getElementById('lblSimFte').textContent = fte31.toLocaleString();

        var baseIp = 4.92;
        var rampWeights = [0, 0.04, 0.18, 0.42, 0.72, 1.0];
        var arr = [4.92];
        var fy31Ip = 0;
        for (var y = 1; y <= 5; y++) {
          baseIp *= (1 + ipCagr);
          var cR = chip31 * rampWeights[y];
          arr.push(baseIp + cR);
          if (y === 5) fy31Ip = baseIp;
        }
        var tot31 = arr[5];
        var perFteM = (tot31 * 1000) / fte31;
        var ebit31 = fy31Ip * 0.65 + chip31 * 0.31;
        var eps31 = (ebit31 * 0.85) / 1.095;
        document.getElementById('outSimRev').textContent = '$' + tot31.toFixed(1) + 'B';
        document.getElementById('outSimPerFte').textContent = '$' + perFteM.toFixed(2) + 'M';
        document.getElementById('outSimEps').textContent = '$' + eps31.toFixed(2);
        simSeries = arr;
        drawChartSim();
      }
      ['rngSimIp', 'rngSimChip', 'rngSimFte'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', runSim);
      });
      var SIM_PRESETS = {
        ip: { ip: 13.5, ch: 0.0, fte: 12000 },
        css: { ip: 15.5, ch: 9.0, fte: 14500 },
        agi: { ip: 15.5, ch: 15.0, fte: 15500 }
      };
      var epGroup = document.getElementById('eraSimPresets');
      if (epGroup) {
        epGroup.addEventListener('click', function (e) {
          var b = e.target.closest('[data-epreset]');
          if (!b) return;
          var k = b.getAttribute('data-epreset');
          var bs = epGroup.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var pr = SIM_PRESETS[k] || SIM_PRESETS.css;
          document.getElementById('rngSimIp').value = pr.ip;
          document.getElementById('rngSimChip').value = pr.ch;
          document.getElementById('rngSimFte').value = pr.fte;
          runSim();
        });
      }

      // Ch 03 Peer Filter & Search
      var activePeerCat = 'ALL';
      function filterPeers() {
        var kw = (document.getElementById('peerSearchInput').value || '').trim().toLowerCase();
        var rows = document.querySelectorAll('#peerTable tbody tr');
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          var catOk = (activePeerCat === 'ALL' || r.getAttribute('data-cat') === activePeerCat);
          var txtOk = (!kw || r.textContent.toLowerCase().indexOf(kw) !== -1);
          r.style.display = (catOk && txtOk) ? '' : 'none';
        }
      }
      var pfTabs = document.getElementById('peerFilterTabs');
      if (pfTabs) {
        pfTabs.addEventListener('click', function (e) {
          var b = e.target.closest('[data-pcat]');
          if (!b) return;
          activePeerCat = b.getAttribute('data-pcat');
          var bs = pfTabs.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          filterPeers();
        });
      }
      var psInp = document.getElementById('peerSearchInput');
      if (psInp) psInp.addEventListener('input', filterPeers);

      // Segmented Chart Tabs
      var ch1Tabs = document.getElementById('ch1Tabs');
      if (ch1Tabs) {
        ch1Tabs.addEventListener('click', function (e) {
          var b = e.target.closest('[data-ch1]');
          if (!b) return;
          state.ch1View = b.getAttribute('data-ch1');
          var bs = ch1Tabs.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          drawChartCh1();
        });
      }
      var rGroup = document.getElementById('radarToggleGroup');
      if (rGroup) {
        rGroup.addEventListener('click', function (e) {
          var b = e.target.closest('[data-rpeer]');
          if (!b) return;
          state.radarPeer = b.getAttribute('data-rpeer');
          var bs = rGroup.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          drawChartRadar();
        });
      }

      // Hover Tooltips
      function bindTip(cid) {
        var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
        if (!c || !tip) return;
        c.addEventListener('mousemove', function (ev) {
          var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
          var list = hitRegions[cid] || [], hit = null;
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
      ['chartCh1', 'chartBars', 'chartEps'].forEach(bindTip);

      // Ch 06 Diagnostic Checklist
      var savedDiag = {};
      try { savedDiag = JSON.parse(localStorage.getItem(STORAGE_DIAG_KEY) || '{}'); } catch (e) {}
      function refreshDiagUI() {
        var chks = document.querySelectorAll('[data-diag]');
        var cnt = 0;
        for (var i = 0; i < chks.length; i++) if (chks[i].checked) cnt++;
        var pct = Math.round((cnt / chks.length) * 100);
        document.getElementById('diagFill').style.width = pct + '%';
        document.getElementById('diagPctText').textContent = pct + '%';
        document.getElementById('diagStatusText').textContent = '当前核验进度：' + cnt + ' / ' + chks.length + ' 项核心组织指标已确认';
      }
      document.querySelectorAll('[data-diag]').forEach(function (chk) {
        var k = chk.getAttribute('data-diag');
        chk.checked = !!savedDiag[k];
        chk.addEventListener('change', function () {
          savedDiag[k] = chk.checked;
          try { localStorage.setItem(STORAGE_DIAG_KEY, JSON.stringify(savedDiag)); } catch (err) {}
          refreshDiagUI();
        });
      });
      var rstBtn = document.getElementById('resetDiagBtn');
      if (rstBtn) {
        rstBtn.addEventListener('click', function () {
          savedDiag = {};
          try { localStorage.removeItem(STORAGE_DIAG_KEY); } catch (e) {}
          document.querySelectorAll('[data-diag]').forEach(function (c) { c.checked = false; });
          refreshDiagUI();
          showToast('已重置六维组织核验清单');
        });
      }
      refreshDiagUI();

      // Quick Jump Search (⌘K)
      var QUICK_ITEMS = [
        { id: 'sec-00', t: '00 执行摘要与核心论点', s: '9,584 FTE · 84.1% 工程师纯度 · 97.5% GAAP 毛利率' },
        { id: 'sec-01', t: '01 中央架构主干与三大 AI 事业部', s: 'Rene Haas · Richard Grisenthwaite · Cloud/Edge/Physical AI' },
        { id: 'sec-02', t: '02 四大文化支柱与五维能力雷达', s: '每瓦性能 · 瑞士中立 · 二十年兼容铁律 · 平台定价' },
        { id: 'sec-03', t: '03 全球半导体五巨头组织对标', s: 'ARM vs NVIDIA / Synopsys / TSMC / Intel 人效与毛利' },
        { id: 'sec-04', t: '04 研发经营杠杆与四大治理暗礁', s: '$1.52B OCF · FY31 $25B 模拟器 · 高通诉讼与软银 ~87% 控股' },
        { id: 'sec-05', t: '05 三十六年三幕历史与四大战役', s: '1990 剑桥火鸡谷仓 · 2016 软银退市 · 2026 AGI CPU' },
        { id: 'sec-06', t: '06 组织健康度六维交互诊断清单', s: '工程师纯度、AGI 硅片客户防火墙与 CSS 渗透跟踪' },
        { id: 'sec-07', t: '07 12 项权威 SEC 监管文件与文献', s: 'FY2026 Form 20-F · Q2 FYE27 股东信 · Hot Chips 2026' }
      ];
      var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQuick(q) {
        if (!qPop) return;
        var kw = (q || '').trim().toLowerCase();
        var m = QUICK_ITEMS.filter(function (it) { return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1; });
        qPop.innerHTML = m.map(function (it) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
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

      // Sidebar & Export Controls
      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
      if (sbBtn && sb && bd) {
        sbBtn.addEventListener('click', function () {
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
          a.download = 'Arm_企业文化与组织架构深度研究报告.html';
          a.click();
          setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
          showToast('已开始下载独立网页：Arm_企业文化与组织架构深度研究报告.html');
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

      function drawAllCharts() {
        drawChartCh1();
        drawChartRadar();
        drawChartBars();
        drawChartEps();
        drawChartSim();
      }

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

      runSim();
      drawAllCharts();
    })();
  