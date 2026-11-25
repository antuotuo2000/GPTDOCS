
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_AUDIT_KEY = 'rblx_culture_bp_audit_v1';

      var state = {
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        lang: 'zh',
        eView: 'revemp',
        gView: 'emp'
      };
      var hits = { eraCanvas: [], genomeCanvas: [] };

      function showToast(msg) {
        var bar = document.getElementById('muiSnackbar');
        if (!bar) return;
        bar.textContent = msg;
        bar.classList.add('show');
        clearTimeout(bar._t);
        bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2200);
      }

      function getPal() {
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
          amber: dark ? '#FFB74D' : '#D97706'
        };
      }

      function applyTheme(t, silent) {
        state.theme = t === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        var ic = document.getElementById('appbarThemeIcon');
        if (ic) {
          ic.innerHTML = state.theme === 'dark'
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        }
        
        
        try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
        drawAll();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至清晰浅色模式');
      }

      function applyLang(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
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
        try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      /* C0: Topology Switcher */
      document.getElementById('topoSwitch').addEventListener('click', function (e) {
        var b = e.target.closest('[data-topo]');
        if (!b) return;
        var mode = b.getAttribute('data-topo');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var stage = document.getElementById('topoStage');
        if (mode === 'rblx') {
          stage.innerHTML =
            '<div class="cc-topo-hub mono">CEO (David Baszucki · 63.1%投票权) × 3,065名系统级 Builders</div>' +
            '<div class="cc-topo-spokes">' +
            '<div class="cc-spoke"><b>引擎与 AI 底座组</b>Nick Tornow · Studio / Build / Cube 4D 无偿赋能全社区</div>' +
            '<div class="cc-spoke"><b>发现与社交图谱组</b>Seb Barrios &amp; Ciancutti · 28天留存公平算法分发</div>' +
            '<div class="cc-spoke"><b>创作者经济组</b>Vlad Loktev · TTM ~$1.7B 分润 + O18 溢价激励</div>' +
            '<div class="cc-spoke"><b>信任与安全护栏组</b>Matt Kaufman · 64%日活年龄核验 + RM3 实时审核</div>' +
            '<div class="cc-spoke"><b>混合云基础设施组</b>Anupam Singh · 77% AI请求自建裸金属集群处理</div>' +
            '<div class="cc-spoke"><b>商业与直充支付组</b>Enrico D\'Angelo · Roblox Plus 订阅 + 激励视频广告</div>' +
            '</div>' +
            '<div class="cc-topo-outcome">结果：官方零内容立项沉没成本，数百万创作者并发试错，长尾体验贡献过半增量消费，年创 $13.5亿 自由现金流</div>';
        } else {
          stage.innerHTML =
            '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统多工作室发行集团总部 · 13,000+ 美术策划人员背负单作销量对赌</div>' +
            '<div class="cc-topo-spokes">' +
            '<div class="cc-spoke silo"><b>旗舰工作室 A</b>5年耗资 $3亿 秘密立项，一旦口碑滑坡即冲击集团全年财报</div>' +
            '<div class="cc-spoke silo"><b>收购工作室 B</b>使用异构自研引擎，技术资产与美术管线无法跨团队复用</div>' +
            '<div class="cc-spoke silo"><b>移动买量工作室 C</b>每年将 35%–50% 流水交给外部广告平台买量获客</div>' +
            '<div class="cc-spoke silo"><b>内部平台中台</b>若官方下场做自营旗舰，第三方开发者担忧被抄袭与限流</div>' +
            '<div class="cc-spoke silo"><b>渠道发行部门</b>主机光盘与第三方商店抽成刚性，缺乏跨游统一社交好友链</div>' +
            '<div class="cc-spoke silo"><b>周期性人力震荡</b>新游上线后大量美术关卡岗位冗余，陷入“扩招—大裁员”循环</div>' +
            '</div>' +
            '<div class="cc-topo-outcome warn">恶果：高昂研发沉没成本 + 极低人均产出（~$0.52M/人）+ 单品档期延期导致的剧烈估值震荡</div>';
        }
      });

      /* C1: 2x2 Quadrant Selector */
      var QUADS = [
        {
          badge: 'Q1 · RESPECT THE COMMUNITY',
          title: '社区优先排序律：用持续升高的创作者分润换取生态垄断',
          desc: '当大多数平台在成熟期压榨创作者抽成时，Roblox 将上调 DevEx 视为“回报率最高的战略投资”：2025 年 9 月普涨 +8.5% 至 $0.0038，2026 年 6 月更对美国 18+ 核验玩家消费开出 $0.0054（+42%）溢价，直接吸引专业独立工作室入驻。',
          alloc: [42, 24, 20, 14]
        },
        {
          badge: 'Q2 · WE ARE RESPONSIBLE',
          title: '全后果责任制：把最棘手的青少年安全做成竞争对手无法逾越的高墙',
          desc: '面对日均 16 亿条游戏内聊天与数千万未成年用户，安全组不仅上线实时多模态审核系统 RM3 与自动改写不文明用语的 LLM 聊天过滤器，更顶住短期留存阵痛完成全球聊天强制年龄核验（Q3\'26 渗透率达 64%）。',
          alloc: [20, 46, 20, 14]
        },
        {
          badge: 'Q3 · TAKE THE LONG VIEW',
          title: '十年远见：20 票超级投票权护航与“终结全年业绩指引”的底气',
          desc: 'Baszucki 持有 20 票 B 类股（掌握 63.1% 投票权）且不领一分钱现金底薪，使管理层得以无视季度杂音：宣布 2027 年起不再发布全年指引，将资源押注于 Roblox Reality 视频世界模型与 Universal Player 跨界导入。',
          alloc: [24, 20, 38, 18]
        },
        {
          badge: 'Q4 · GET STUFF DONE',
          title: '务实笃行：圣马特奥周二至周四同场碰撞，把 AI 论文变成亿级产品',
          desc: '拒绝大厂研究院“只发论文不落地”弊病：从 4D 数据记录平台（DMR）到超过 50 万内测用户使用的自然语言建游工具 Build，再到免安装 Chrome WebAssembly 网页秒玩，全部由精干自治小组快速推向生产环境。',
          alloc: [26, 18, 30, 26]
        }
      ];
      var quadGrid = document.getElementById('quadGrid');
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
        for (var k = 1; k <= 4; k++) {
          document.getElementById('pctC' + k).textContent = q.alloc[k - 1] + '%';
          document.getElementById('barC' + k).style.width = q.alloc[k - 1] + '%';
        }
      });

      /* C2: 3-Era Timeline Scrubber */
      var ERAS = [
        {
          badge: 'ERA I · 2004–2012 · PHYSICS SANDBOX GENESIS',
          title: '双创始人奠基期：从教育物理实验室长出的“去中心化造物主”哲学',
          desc: 'David Baszucki 与 Erik Cassel 将此前开发教育软件 Interactive Physics 的经验迁移至多人在线世界：不预设剧情与通关目标，而是提供刚体物理引擎、积木原语与社交房间，确立“员工只造工具、社区创造万物”的底层组织契约。',
          kpis: [['2004–2006', '圣马特奥创立与正式上线'], ['100% UGC', '零自研商业游戏工作室传统'], ['物理仿真内核', '跨设备多人同步架构雏形'], ['社区共治', '早期百名极客顾问共创机制']]
        },
        {
          badge: 'ERA II · 2013–2023 · DEVEX FLYWHEEL & NYSE DPO',
          title: '经济飞轮成型期：DevEx 法币兑现引爆创作者创业潮与跨端扩张',
          desc: '2013 年推出 Developer Exchange 打通 Robux 到美元的双向闭环，大批青少年玩家成长为数十人规模的专业工作室；2021 年纽交所直接上市（DPO），全职员工由 2021 年 1,600 人增至 2023 年 2,457 人，完成移动、PC、主机与 VR 全端覆盖。',
          kpis: [['1,600→2,457人', 'FY21–FY23 研发与安全扩编'], ['$3.52B', 'FY2023 全年预订额规模'], ['$740.8M', 'FY2023 创作者 DevEx 分成'], ['$124.0M', 'FY2023 自由现金流重回正轨']]
        },
        {
          badge: 'ERA III · 2024–2026+ · AI-NATIVE & C-SUITE SCALING',
          title: '2024–2026+ 组织质变：线下高密度协同 × 顶级职业高管群 × 现金流大爆发',
          desc: '2024 年完成圣马特奥总部周二至周四线下回归，同时升级硅谷全明星高管班底（CFO Naveen Chopra、CPO Seb Barrios、CCO Vlad Loktev、CGO John Ciancutti 及合并人力与 IT 的 CPSO Jack Buckley），驱动 FY25 预订额冲上 $67.88亿、FCF 达 $13.53亿。',
          kpis: [['$6.79B', 'FY2025 全年预订额 (+55%)'], ['$2.21M / 人', '3,065名全职员工超高人效'], ['$1.35B', 'FY2025 自由现金流 (+111%)'], ['$394.9K', '2026 代理声明全员中位薪酬']]
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
      function prep(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(250, rect.width || 460), h = Math.max(135, rect.height || 260);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        var ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { c: c, ctx: ctx, w: w, h: h };
      }

      function rRect(ctx, x, y, w, h, r) {
        if (w <= 0 || h <= 0) return;
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
        var env = prep('eraCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        hits.eraCanvas = [];
        var pad = { top: 28, right: 20, bottom: 38, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.eView === 'revemp') {
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'];
          var bEmp = [1.71, 1.35, 1.43, 1.77, 2.21];
          var maxV = 2.6;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv.toFixed(1) + 'M', pad.left - 7, gy + 4);
          }
          var slot = pw / yrs.length, bw = Math.min(42, slot * 0.52);
          yrs.forEach(function (y, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (bEmp[i] / maxV) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i === 4 ? pal.green : pal.blue;
            rRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + bEmp[i].toFixed(2) + 'M', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
            ctx.fillText(y, x + bw / 2, pad.top + ph + 19);
            hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 人均预订额', body: '每位全职员工创造 $' + bEmp[i].toFixed(2) + 'M 预订额（零第一方游戏制作人力包袱）' });
          });
        } else {
          var lyrs = ['FY22', 'FY23', 'FY24', 'FY25'];
          var rdB = [0.87, 1.25, 1.44, 1.57];
          var fcfB = [-0.06, 0.12, 0.64, 1.35];
          var minF = -0.2, maxF = 1.8;
          for (var k = 0; k <= 4; k++) {
            var kv = minF + (k / 4) * (maxF - minF), ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + kv.toFixed(1) + 'B', pad.left - 7, ky + 4);
          }
          function plot(arr, col, name) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (lyrs.length - 1)) * pw, py = pad.top + ph - ((v - minF) / (maxF - minF)) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (lyrs.length - 1)) * pw, py = pad.top + ph - ((v - minF) / (maxF - minF)) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
              ctx.fillText('$' + v.toFixed(2) + 'B', px, py - 8);
              hits.eraCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: lyrs[idx] + ' · ' + name, body: '$' + v.toFixed(2) + 'B' });
            });
          }
          lyrs.forEach(function (lb, idx) {
            var px = pad.left + (idx / (lyrs.length - 1)) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(lb, px, pad.top + ph + 19);
          });
          plot(rdB, pal.blue, 'GAAP 研发总投入 R&D');
          plot(fcfB, pal.green, '年度自由现金流 FCF');
        }
      }

      function drawGenomeCanvas() {
        var env = prep('genomeCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        hits.genomeCanvas = [];
        var pad = { top: 20, right: 54, bottom: 24, left: 132 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        var peers = [
          { name: 'Roblox (UGC操作系统)', emp: 2.21, gm: 80.0, col: pal.blue },
          { name: 'Nintendo (京都一体匠造)', emp: 1.68, gm: 59.5, col: pal.green },
          { name: 'Take-Two (厂牌联邦)', emp: 0.52, gm: 55.9, col: pal.violet },
          { name: 'Electronic Arts (双事业群)', emp: 0.52, gm: 79.0, col: pal.amber },
          { name: 'Unity (B2B引擎+广告)', emp: 0.42, gm: 74.2, col: pal.blue }
        ];
        var isEmp = state.gView === 'emp';
        var maxX = isEmp ? 2.6 : 92;
        var rowH = ph / peers.length;
        peers.forEach(function (p, idx) {
          var val = isEmp ? p.emp : p.gm;
          var cy = pad.top + idx * rowH + rowH / 2;
          var bh = 22, bl = (val / maxX) * pw;
          ctx.fillStyle = pal.grid; rRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
          ctx.fillStyle = p.col; rRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
          ctx.fillStyle = pal.sub; ctx.font = (idx === 0 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(p.name, pad.left - 10, cy + 4);
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
          ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 7, cy + 4);
          hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: p.name, body: '人均产出 $' + p.emp.toFixed(2) + 'M · 渠道/销货后毛利空间 ' + p.gm.toFixed(1) + '%' });
        });
      }

      /* C4: Governance Simulator */
      var entropySeries = [92, 86, 75, 61, 44];
      function drawEntropyCanvas() {
        var env = prep('entropyCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        var pad = { top: 20, right: 18, bottom: 24, left: 38 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = ['0%自营(中立)', '10%自营', '25%自营', '35%自营', '50%争利'];
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
          ctx.fillStyle = i === 0 ? pal.green : pal.violet;
          ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(Math.round(v), px, py - 7);
          ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
          ctx.fillText(lbls[i], px, pad.top + ph + 15);
        });
      }

      function updateEntropySim() {
        var safe = parseInt(document.getElementById('rngSafe').value, 10);
        var dev = parseInt(document.getElementById('rngDevex').value, 10);
        var p1 = parseInt(document.getElementById('rng1P').value, 10);
        document.getElementById('valSafe').textContent = safe + '%' + (safe >= 65 ? ' (行业标杆)' : safe >= 45 ? ' (合规临界)' : ' (诉讼高危)');
        document.getElementById('valDevex').textContent = dev + '%';
        document.getElementById('val1P').textContent = p1 + '%' + (p1 === 0 ? ' (绝对中立)' : ' (与民争利)');

        var trust = Math.max(20, Math.min(99, Math.round(72 + (dev - 18) * 2.4 - p1 * 1.15)));
        var reg = Math.max(18, Math.min(98, Math.round(28 + safe * 0.82)));
        var fly = Math.max(20, Math.min(99, Math.round(trust * 0.48 + reg * 0.34 + (36 - Math.abs(dev - 26)) * 0.5 - p1 * 0.4)));

        document.getElementById('outTrust').textContent = trust + ' / 100';
        document.getElementById('outReg').textContent = reg + ' / 100';
        document.getElementById('outFlywheel').textContent = fly + ' / 100';

        entropySeries = [0, 10, 25, 35, 50].map(function (s) {
          var tr = Math.max(20, Math.min(99, 72 + (dev - 18) * 2.4 - s * 1.15));
          return Math.max(20, Math.min(99, tr * 0.52 + reg * 0.35 - s * 0.35));
        });
        drawEntropyCanvas();
      }
      ['rngSafe', 'rngDevex', 'rng1P'].forEach(function (id) {
        document.getElementById(id).addEventListener('input', updateEntropySim);
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
      bindSeg('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
      bindSeg('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);

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
            tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
          } else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['eraCanvas', 'genomeCanvas'].forEach(bindTip);

      function drawAll() {
        drawEraCanvas();
        drawGenomeCanvas();
        drawEntropyCanvas();
      }

      function exportHtml() {
        var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = '罗布乐思 Roblox 企业文化与组织操作系统.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        showToast('已下载《罗布乐思 Roblox 企业文化与组织操作系统.html》');
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
        { id: 'sec-c0', t: 'C0 零自研拓扑与平台中立悖论', s: '云游戏OS自治组 vs 传统万人3A工作室割据沙盘' },
        { id: 'sec-c1', t: 'C1 四大价值观代码与 Builder 罗盘', s: '社区优先 · 全后果责任 · 十年远见 · 务实笃行' },
        { id: 'sec-c2', t: 'C2 三纪元治理演进时间轴 (2004–2026+)', s: '物理沙盒 → DevEx飞轮 → C-Suite升级与 $2.21M人效' },
        { id: 'sec-c3', t: 'C3 全球游戏与引擎巨头基因光谱', s: 'Roblox vs 任天堂 / Take-Two / EA / Unity' },
        { id: 'sec-c4', t: 'C4 中立-安全治理模拟器与六律体检', s: '年龄核验、DevEx分润与自营诱惑动态压力推演' }
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

      /* Audit Persistence */
      function refreshAudit() {
        var boxes = document.querySelectorAll('[data-cchk]'), done = 0;
        for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
        document.getElementById('auditScoreChip').textContent = '文化自检核验：' + done + ' / ' + boxes.length + ' 项';
      }
      try {
        var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
        document.querySelectorAll('[data-cchk]').forEach(function (chk) {
          var k = chk.getAttribute('data-cchk');
          chk.checked = !!savedA[k];
          chk.addEventListener('change', function () {
            savedA[k] = chk.checked;
            try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {}
            refreshAudit();
          });
        });
        refreshAudit();
      } catch (e) {}

      document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
        if (window.innerWidth <= 1040) document.body.classList.toggle('drawer-open');
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
      updateEntropySim();
      drawAll();
    })();
  