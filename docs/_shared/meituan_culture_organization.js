
    (function () {
      const K_THEME = 'meituan_suite_theme';
      const K_LANG = 'meituan_suite_lang';
      const K_CHK = 'meituan_culture_checklist_v1';

      function sGet(k, fb) { try { const v = localStorage.getItem(k); return v !== null ? v : fb; } catch (e) { return fb; } }
      function sSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

      let currentLang = sGet(K_LANG, 'zh');
      let currentTheme = sGet(K_THEME, 'light');
      let currentOrgView = 'rev';
      let currentEra = 0;
      let activePillar = 0;
      let checkedState = [true, true, true, false, false, false];
      try { const p = JSON.parse(sGet(K_CHK, 'null')); if (Array.isArray(p) && p.length === 6) checkedState = p; } catch (e) {}

      const sunSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>';
      const moonSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';

      function showSnack(msg) {
        const sb = document.getElementById('muiSnackbar');
        sb.textContent = msg; sb.classList.add('show');
        clearTimeout(sb._t); sb._t = setTimeout(() => sb.classList.remove('show'), 2200);
      }

      const eraData = [
        {
          zh: { title: '1.0 游击铁军期 (2010–2015)：千团大战与地推基本功', body: '在 5000 家团购网站混战中，美团率先实行“不投无效地铁广告、精算每一座城市 ROI”的策略，建立起覆盖全国的线下 BD 铁军，并于 2015 年与大众点评合并，确立中国本地生活绝对入口。' },
          en: { title: '1.0 Guerilla Iron Army (2010–2015): Thousand Groupon War', body: 'Amid 5,000+ groupon rivals, Meituan avoided vanity ad wars, enforced city-level ROI discipline, built an unmatched offline BD army, and merged with Dianping in 2015.' }
        },
        {
          zh: { title: '2.0 平台扩张期 (2016–2023)：“Food + Platform”与超脑调度', body: '围绕“吃”构建高频外卖漏斗，向高毛利到店酒旅（~87% 毛利率）交叉导流。自研实时智能调度系统支撑日均峰值超 9000 万单履约，员工规模突破 11 万。' },
          en: { title: '2.0 Platform Expansion (2016–2023): Food + Platform & Super-Brain', body: 'Used high-frequency food delivery to cross-sell ~87% GM In-Store/Hotel/Travel. Built the real-time dispatch engine handling >90M peak daily orders.' }
        },
        {
          zh: { title: '3.0 去登味与 Physical AI 期 (2024–2026+)：组织重塑与全球奇袭', body: '2026 年 3 月王兴推动“去登味”扁平化改革，打破资深管理者层级壁垒；内部 CatPaw AI 编程渗透率超 95%，LongCat-2.5 (1.6T) 落地小美 Agent；无人机（>90 万单）与 Keeta 沙特盈利（22 个月）验证了跨边界复利能力。' },
          en: { title: '3.0 Flat Org & Physical AI Era (2024–2026+): Global & Autonomous', body: 'Mar 2026 "Reducing Deng Flavor" flattened hierarchy; CatPaw reached >95% coding adoption; LongCat-2.5 (1.6T) powers Xiao Mei; Drones (>900k orders) & Keeta Saudi profitability prove global compounding.' }
        }
      ];

      const checklistItems = [
        { zh: '核心本地商业营业利润率稳定在 8%–15% 区间（Q2\'26 已修复至 7.9%）', en: 'CLC Operating Margin sustained at 8%–15% (rebounded to 7.9% in Q2\'26)' },
        { zh: '新业务（Keeta + 小象超市）亏损率持续收窄至 -5% 以内（Q2\'26 达 -5.3%）', en: 'New Initiatives loss margin narrowing below -5% (reached -5.3% in Q2\'26)' },
        { zh: '研发投入占营收比维持 6.5%+ 且内部 AI 工具（CatPaw）保持 >90% 渗透', en: 'R&D intensity >= 6.5% with >90% internal CatPaw AI coding adoption' },
        { zh: '“去登味”扁平化后一线 BU 决策周期缩短，非核心亏损业务（如优选）果断出清', en: 'Post-"Deng Flavor" flattening speeds BU decisions & exits non-core drags' },
        { zh: '骑手职业伤害保障（2026.7 全覆盖）未显著侵蚀单均长期盈利模型', en: 'Rider injury insurance (Jul 2026 rollout) absorbed without breaking unit economics' },
        { zh: '净现金（¥168.3B）+ 硬科技股权（¥77.3B）支撑持续股份回购注销', en: 'Net cash (¥168.3B) + hard-tech equity (¥77.3B) sustains share buyback cancellation' }
      ];

      function getCss(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
      function setupCanvas(c, h) {
        const dpr = window.devicePixelRatio || 1;
        const rectW = c.parentElement.getBoundingClientRect().width - 28;
        const w = Math.max(240, Math.floor(rectW));
        c.width = w * dpr; c.height = h * dpr;
        c.style.width = w + 'px'; c.style.height = h + 'px';
        const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx, w, h };
      }

      let orgHitboxes = [];
      function drawOrgChart() {
        const c = document.getElementById('orgCanvas');
        const { ctx, w, h } = setupCanvas(c, 285);
        const c1 = getCss('--chart-c1'), c2 = getCss('--chart-c2'), c3 = getCss('--chart-c3');
        const grid = getCss('--chart-grid'), tick = getCss('--chart-tick');
        ctx.clearRect(0, 0, w, h); orgHitboxes = [];

        const legEl = document.getElementById('orgLegend');
        if (currentOrgView === 'rev') {
          legEl.innerHTML = `<span class="legend-pill"><i class="legend-dot" style="background:${c1}"></i>${currentLang === 'zh' ? '核心本地商业 (CLC)' : 'Core Local Commerce'}</span>
                             <span class="legend-pill"><i class="legend-dot" style="background:${c2}"></i>${currentLang === 'zh' ? '新业务 (New Initiatives)' : 'New Initiatives'}</span>`;
        } else {
          legEl.innerHTML = `<span class="legend-pill"><i class="legend-dot" style="background:${c3}"></i>${currentLang === 'zh' ? '研发投入 (RMB B, 左轴)' : 'R&D Spend (RMB B, Left)'}</span>
                             <span class="legend-pill"><i class="legend-dot" style="background:${c2}"></i>${currentLang === 'zh' ? '新业务营业利润率 (%, 右轴)' : 'New Init OPM (%, Right)'}</span>`;
        }

        const labels = ['FY2024', 'FY2025', 'Q1 2026', 'Q2 2026'];
        const pad = { t: 26, r: currentOrgView === 'eff' ? 46 : 20, b: 36, l: 48 };
        const pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        const dataRev = [{ a: 250.2, b: 87.3, op: 52.4 }, { a: 260.8, b: 104.0, op: -6.9 }, { a: 64.9, b: 26.1, op: -3.8 }, { a: 71.5, b: 33.1, op: 5.7 }];
        const dataEff = [{ a: 21.1, b: -8.3 }, { a: 26.0, b: -11.5 }, { a: 6.8, b: -7.8 }, { a: 7.7, b: -5.3 }];
        const maxVal = currentOrgView === 'rev' ? 300 : 30;

        ctx.strokeStyle = grid; ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
          const y = pad.t + ph - (ph * i / 4);
          ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
          ctx.fillStyle = tick; ctx.font = '11px monospace'; ctx.textAlign = 'right';
          ctx.fillText(Math.round(maxVal * i / 4) + 'B', pad.l - 6, y + 4);
          if (currentOrgView === 'eff') { ctx.textAlign = 'left'; ctx.fillText((-16 + i * 4) + '%', w - pad.r + 6, y + 4); }
        }

        const gw = pw / labels.length, bw = Math.min(34, gw * 0.28);
        labels.forEach((lbl, idx) => {
          const cx = pad.l + gw * idx + gw / 2;
          if (currentOrgView === 'rev') {
            const d = dataRev[idx], h1 = (d.a / maxVal) * ph, h2 = (d.b / maxVal) * ph;
            ctx.fillStyle = c1; ctx.fillRect(cx - bw - 3, pad.t + ph - h1, bw, h1);
            ctx.fillStyle = c2; ctx.fillRect(cx + 3, pad.t + ph - h2, bw, h2);
            ctx.fillStyle = tick; ctx.font = '10.5px monospace'; ctx.textAlign = 'center';
            ctx.fillText(d.a.toFixed(0), cx - bw / 2 - 3, pad.t + ph - h1 - 5);
            ctx.fillText(d.b.toFixed(0), cx + bw / 2 + 3, pad.t + ph - h2 - 5);
            orgHitboxes.push({ x: cx - bw - 6, y: pad.t, w: bw * 2 + 12, h: ph, text: `${lbl} | CLC: ¥${d.a}B | New: ¥${d.b}B | CLC OP: ¥${d.op}B` });
          } else {
            const d = dataEff[idx], h1 = (d.a / maxVal) * ph;
            ctx.fillStyle = c3; ctx.fillRect(cx - bw / 2, pad.t + ph - h1, bw, h1);
            ctx.fillStyle = tick; ctx.font = '10.5px monospace'; ctx.textAlign = 'center';
            ctx.fillText('¥' + d.a + 'B', cx, pad.t + ph - h1 - 5);
            orgHitboxes.push({ x: cx - bw, y: pad.t, w: bw * 2, h: ph, text: `${lbl} | R&D: ¥${d.a}B | New Init OPM: ${d.b}%` });
          }
          ctx.fillStyle = tick; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(lbl, cx, h - 10);
        });

        if (currentOrgView === 'eff') {
          ctx.beginPath();
          dataEff.forEach((d, idx) => {
            const cx = pad.l + gw * idx + gw / 2, y = pad.t + ph - ((d.b + 16) / 16) * ph;
            idx === 0 ? ctx.moveTo(cx, y) : ctx.lineTo(cx, y);
          });
          ctx.strokeStyle = c2; ctx.lineWidth = 2.5; ctx.stroke();
          dataEff.forEach((d, idx) => {
            const cx = pad.l + gw * idx + gw / 2, y = pad.t + ph - ((d.b + 16) / 16) * ph;
            ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(cx, y, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.font = 'bold 10.5px monospace'; ctx.textAlign = 'center'; ctx.fillText(d.b + '%', cx, y - 9);
          });
        }
      }

      let radarPts = [];
      function drawRadarChart() {
        const c = document.getElementById('radarCanvas');
        const { ctx, w, h } = setupCanvas(c, 315);
        const c1 = getCss('--chart-c1'), c3 = getCss('--chart-c3'), grid = getCss('--chart-grid'), tick = getCss('--chart-tick');
        ctx.clearRect(0, 0, w, h); radarPts = [];

        document.getElementById('radarLegend').innerHTML =
          `<span class="legend-pill"><i class="legend-dot" style="background:${c1}"></i>Meituan (03690)</span>
           <span class="legend-pill"><i class="legend-dot" style="background:${c3}"></i>${currentLang === 'zh' ? '中国互联网均值' : 'China Tech Avg'}</span>`;

        const axes = currentLang === 'zh' ? ['基本功与UE', '地推与履约', '去登味敏捷', 'Physical AI', '资本韧性'] : ['Unit Econ', 'Execution', 'Flatness', 'Physical AI', 'Resilience'];
        const mtScores = [9.5, 9.6, 8.8, 9.2, 9.0], avgScores = [7.2, 6.8, 6.5, 7.4, 7.1];
        const cx = w / 2, cy = h / 2 + 8, r = Math.min(w, h) * 0.31;

        for (let ring = 1; ring <= 4; ring++) {
          ctx.beginPath();
          axes.forEach((_, i) => {
            const ang = -Math.PI / 2 + (Math.PI * 2 * i / axes.length);
            const x = cx + Math.cos(ang) * (r * ring / 4), y = cy + Math.sin(ang) * (r * ring / 4);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          });
          ctx.closePath(); ctx.strokeStyle = grid; ctx.stroke();
        }
        axes.forEach((ax, i) => {
          const ang = -Math.PI / 2 + (Math.PI * 2 * i / axes.length);
          const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.strokeStyle = grid; ctx.stroke();
          ctx.fillStyle = (i === activePillar) ? c1 : tick;
          ctx.font = (i === activePillar ? 'bold ' : '') + '11.5px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(ax, cx + Math.cos(ang) * (r + 22), cy + Math.sin(ang) * (r + 18));
        });
        function drawPoly(scores, color, alpha) {
          ctx.beginPath();
          scores.forEach((s, i) => {
            const ang = -Math.PI / 2 + (Math.PI * 2 * i / axes.length);
            const x = cx + Math.cos(ang) * (r * s / 10), y = cy + Math.sin(ang) * (r * s / 10);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            if (color === c1) radarPts.push({ x, y, text: `${axes[i]}: Meituan ${s}/10 vs Peer ${avgScores[i]}/10` });
          });
          ctx.closePath(); ctx.fillStyle = color + alpha; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
        }
        drawPoly(avgScores, c3, '22'); drawPoly(mtScores, c1, '38');
        radarPts.forEach((pt, idx) => { ctx.fillStyle = (idx === activePillar) ? c3 : c1; ctx.beginPath(); ctx.arc(pt.x, pt.y, idx === activePillar ? 6 : 4, 0, Math.PI * 2); ctx.fill(); });
      }

      let hbarHitboxes = [];
      function drawHbarChart() {
        const c = document.getElementById('hbarCanvas');
        const { ctx, w, h } = setupCanvas(c, 240);
        const c1 = getCss('--chart-c1'), c2 = getCss('--chart-c2'), tick = getCss('--chart-tick');
        ctx.clearRect(0, 0, w, h); hbarHitboxes = [];

        document.getElementById('hbarLegend').innerHTML =
          `<span class="legend-pill"><i class="legend-dot" style="background:${c1}"></i>${currentLang === 'zh' ? '研发占营收比 (%)' : 'R&D % of Revenue'}</span>
           <span class="legend-pill"><i class="legend-dot" style="background:${c2}"></i>${currentLang === 'zh' ? '物理履约执行力 (/10)' : 'Physical Execution (/10)'}</span>`;

        const rows = [
          { name: 'Meituan (03690)', rd: 7.1, exec: 9.6 },
          { name: 'Amazon (AMZN)', rd: 14.2, exec: 9.1 },
          { name: 'ByteDance', rd: 10.5, exec: 8.6 },
          { name: 'Alibaba (9988)', rd: 5.6, exec: 7.4 },
          { name: 'PDD Holdings', rd: 3.2, exec: 8.9 }
        ];
        const padL = Math.min(126, w * 0.34), padR = 46, rowH = 40, maxW = Math.max(80, w - padL - padR);
        rows.forEach((r, i) => {
          const y = 18 + i * rowH;
          ctx.fillStyle = tick; ctx.font = '11.5px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(r.name, padL - 8, y + 14);
          const w1 = (r.rd / 16) * maxW, w2 = (r.exec / 10) * maxW;
          ctx.fillStyle = c1; ctx.fillRect(padL, y, w1, 11);
          ctx.fillStyle = c2; ctx.fillRect(padL, y + 14, w2, 11);
          ctx.fillStyle = tick; ctx.font = '10.5px monospace'; ctx.textAlign = 'left';
          ctx.fillText(r.rd + '%', padL + w1 + 5, y + 9);
          ctx.fillText(r.exec + '/10', padL + w2 + 5, y + 23);
          hbarHitboxes.push({ x: padL, y, w: maxW + 40, h: 28, text: `${r.name}: R&D ${r.rd}% | Physical Execution ${r.exec}/10` });
        });
      }

      let comboHitboxes = [];
      function drawComboChart() {
        const c = document.getElementById('comboCanvas');
        const { ctx, w, h } = setupCanvas(c, 275);
        const c1 = getCss('--chart-c1'), c2 = getCss('--chart-c2'), c3 = getCss('--chart-c3'), grid = getCss('--chart-grid'), tick = getCss('--chart-tick');
        ctx.clearRect(0, 0, w, h); comboHitboxes = [];

        document.getElementById('comboLegend').innerHTML =
          `<span class="legend-pill"><i class="legend-dot" style="background:${c1}"></i>${currentLang === 'zh' ? '营收 (RMB B, 左轴)' : 'Revenue (RMB B, Left)'}</span>
           <span class="legend-pill"><i class="legend-dot" style="background:${c3}"></i>${currentLang === 'zh' ? '研发投入 (RMB B, 右轴)' : 'R&D (RMB B, Right)'}</span>`;

        const items = [
          { lbl: 'FY22', rev: 220.0, net: -6.7, rd: 20.7 },
          { lbl: 'FY23', rev: 276.7, net: 13.9, rd: 21.2 },
          { lbl: 'FY24', rev: 337.6, net: 35.8, rd: 21.1 },
          { lbl: 'FY25', rev: 364.9, net: -23.4, rd: 26.0 },
          { lbl: 'Q2\'26*', rev: 104.6, net: 2.2, rd: 7.7 }
        ];
        const pad = { t: 24, r: 44, b: 36, l: 48 }, pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        ctx.strokeStyle = grid;
        for (let i = 0; i <= 4; i++) {
          const y = pad.t + ph - ph * i / 4;
          ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
          ctx.fillStyle = tick; ctx.font = '11px monospace'; ctx.textAlign = 'right'; ctx.fillText((i * 100) + 'B', pad.l - 6, y + 4);
          ctx.textAlign = 'left'; ctx.fillText((i * 10) + 'B', w - pad.r + 6, y + 4);
        }
        const gw = pw / items.length, bw = Math.min(34, gw * 0.46);
        items.forEach((it, i) => {
          const cx = pad.l + gw * i + gw / 2, bh = (it.rev / 400) * ph;
          ctx.fillStyle = c1; ctx.fillRect(cx - bw / 2, pad.t + ph - bh, bw, bh);
          ctx.fillStyle = tick; ctx.font = '10.5px monospace'; ctx.textAlign = 'center';
          ctx.fillText(it.rev.toFixed(0), cx, pad.t + ph - bh - 5);
          ctx.font = '12px sans-serif'; ctx.fillText(it.lbl, cx, h - 10);
          comboHitboxes.push({ x: cx - bw, y: pad.t, w: bw * 2, h: ph, text: `${it.lbl}: Rev ¥${it.rev}B | Net ¥${it.net}B | R&D ¥${it.rd}B` });
        });
        ctx.beginPath();
        items.forEach((it, i) => {
          const cx = pad.l + gw * i + gw / 2, y = pad.t + ph - (it.rd / 40) * ph;
          i === 0 ? ctx.moveTo(cx, y) : ctx.lineTo(cx, y);
        });
        ctx.strokeStyle = c3; ctx.lineWidth = 2.5; ctx.stroke();
        items.forEach((it, i) => {
          const cx = pad.l + gw * i + gw / 2, y = pad.t + ph - (it.rd / 40) * ph;
          ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(cx, y, 4.5, 0, Math.PI * 2); ctx.fill();
        });
      }

      function applyTheme(t) {
        currentTheme = t;
        document.documentElement.setAttribute('data-theme', t);
        sSet(K_THEME, t);
        document.getElementById('appbarThemeIcon').innerHTML = t === 'dark' ? sunSvg : moonSvg;
        document.getElementById('sideThemeLightBtn').setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
        document.getElementById('sideThemeDarkBtn').setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
        drawAllCharts();
      }

      function applyLang(l) {
        currentLang = l;
        document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
        sSet(K_LANG, l);
        document.getElementById('langZhBtn').classList.toggle('active', l === 'zh');
        document.getElementById('langEnBtn').classList.toggle('active', l === 'en');
        document.querySelectorAll('[data-i18n-zh]').forEach(el => {
          const val = el.getAttribute(l === 'zh' ? 'data-i18n-zh' : 'data-i18n-en');
          if (val !== null) el.innerHTML = val;
        });
        document.getElementById('quickJumpInput').placeholder = l === 'zh' ? '快速跳转模块...' : 'Quick jump...';
        renderEra(); renderChecklist(); drawAllCharts();
      }

      function renderEra() {
        const d = eraData[currentEra][currentLang];
        document.getElementById('eraDetailBox').innerHTML = `<h3 style="margin-bottom:6px;">${d.title}</h3><p style="margin:0;">${d.body}</p>`;
      }

      function renderChecklist() {
        const cont = document.getElementById('checklistContainer'); cont.innerHTML = '';
        let score = 0;
        checklistItems.forEach((item, idx) => {
          const on = !!checkedState[idx]; if (on) score++;
          const div = document.createElement('div');
          div.className = 'check-item' + (on ? ' checked' : '');
          div.innerHTML = `<div class="check-box">${on ? '✓' : ''}</div><div style="font-size:0.82rem;font-weight:600;">${item[currentLang]}</div>`;
          div.addEventListener('click', () => { checkedState[idx] = !checkedState[idx]; sSet(K_CHK, JSON.stringify(checkedState)); renderChecklist(); });
          cont.appendChild(div);
        });
        document.getElementById('auditScoreText').textContent = `${score} / 6`;
      }

      function updateSimulator() {
        const clcOpm = parseFloat(document.getElementById('slClcOpm').value);
        const aiSave = parseFloat(document.getElementById('slAiSave').value);
        const newMargin = parseFloat(document.getElementById('slNewMargin').value);
        document.getElementById('sl1Val').textContent = clcOpm.toFixed(1) + '%';
        document.getElementById('sl2Val').textContent = '¥' + aiSave.toFixed(2);
        document.getElementById('sl3Val').textContent = newMargin.toFixed(1) + '%';
        const adjNet = Math.max(15, (390 * (clcOpm / 100) + 32 * aiSave * 0.55 + 185 * (newMargin / 100)) * 0.88 + 4.5);
        const impliedMcap = (adjNet * 18 + 77.3) / 1000;
        document.getElementById('simProfitOut').textContent = `¥${adjNet.toFixed(1)}B`;
        document.getElementById('simMcapOut').textContent = `¥${impliedMcap.toFixed(2)}T`;
      }

      function bindHover(canvasId, getBoxes, isPoint) {
        const c = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
        c.addEventListener('mousemove', e => {
          const r = c.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
          const hit = isPoint ? getBoxes().find(b => Math.hypot(mx - b.x, my - b.y) < 18) : getBoxes().find(b => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h);
          if (hit) { tip.textContent = hit.text; tip.style.left = Math.min(window.innerWidth - 260, e.clientX + 14) + 'px'; tip.style.top = Math.max(10, e.clientY - 34) + 'px'; tip.style.display = 'block'; }
          else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', () => tip.style.display = 'none');
      }

      function drawAllCharts() { drawOrgChart(); drawRadarChart(); drawHbarChart(); drawComboChart(); }

      // AppBar & Sidebar Events
      document.getElementById('appbarThemeBtn').addEventListener('click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
      document.getElementById('sideThemeLightBtn').addEventListener('click', () => applyTheme('light'));
      document.getElementById('sideThemeDarkBtn').addEventListener('click', () => applyTheme('dark'));
      document.getElementById('langZhBtn').addEventListener('click', () => applyLang('zh'));
      document.getElementById('langEnBtn').addEventListener('click', () => applyLang('en'));
      document.getElementById('sidePrintBtn')?.addEventListener('click', () => window.print());
      document.getElementById('sideExportBtn')?.addEventListener('click', () => {
        const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Meituan_Corporate_Culture_Analysis.html'; a.click();
        showSnack(currentLang === 'zh' ? '已导出 HTML 文件' : 'Exported HTML');
      });

      const sb = document.getElementById('muiSidebar'), db = document.getElementById('drawerBackdrop');
      document.getElementById('sidebarToggleBtn').addEventListener('click', () => {
        if (window.innerWidth < 1024) { sb.classList.toggle('open'); db.classList.toggle('open'); }
        else {
          const cur = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
          document.documentElement.setAttribute('data-sidebar-collapsed', cur ? '0' : '1');
          setTimeout(drawAllCharts, 60);
        }
      });
      db.addEventListener('click', () => { sb.classList.remove('open'); db.classList.remove('open'); });
      document.querySelectorAll('.mui-nav-link').forEach(a => a.addEventListener('click', () => { if (window.innerWidth < 1024) { sb.classList.remove('open'); db.classList.remove('open'); } }));

      // Quick Jump Popover
      const qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      const jumpItems = Array.from(document.querySelectorAll('#tocList .mui-nav-link')).map(a => ({ href: a.getAttribute('href'), title: a.textContent.trim() }));
      function renderPop(q) {
        qPop.innerHTML = '';
        jumpItems.filter(x => x.title.toLowerCase().includes(q.toLowerCase())).forEach(x => {
          const b = document.createElement('button'); b.type = 'button'; b.className = 'quick-jump-item';
          b.innerHTML = `<span class="quick-jump-item-title">${x.title}</span><span class="quick-jump-item-sub mono">${x.href}</span>`;
          b.addEventListener('click', () => { qPop.classList.remove('open'); location.hash = x.href; });
          qPop.appendChild(b);
        });
      }
      qInput.addEventListener('focus', () => { renderPop(qInput.value); qPop.classList.add('open'); });
      qInput.addEventListener('input', () => { renderPop(qInput.value); qPop.classList.add('open'); });
      document.addEventListener('click', e => { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
      document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qInput.focus(); }
        if (e.key === 'Escape') qPop.classList.remove('open');
      });

      // Reading progress & ScrollSpy
      const navLinks = document.querySelectorAll('#tocList .mui-nav-link');
      window.addEventListener('scroll', () => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        document.getElementById('readingProgressBar').style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
        let cur = 'mod-summary';
        document.querySelectorAll('.bm-workspace > section').forEach(s => { if (s.getBoundingClientRect().top <= 140) cur = s.id; });
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
      }, { passive: true });

      document.querySelectorAll('[data-orgview]').forEach(btn => btn.addEventListener('click', () => {
        document.querySelectorAll('[data-orgview]').forEach(b => b.classList.remove('active')); btn.classList.add('active');
        currentOrgView = btn.getAttribute('data-orgview'); drawOrgChart();
      }));
      document.querySelectorAll('[data-era]').forEach(btn => btn.addEventListener('click', () => {
        document.querySelectorAll('[data-era]').forEach(b => b.classList.remove('active')); btn.classList.add('active');
        currentEra = parseInt(btn.getAttribute('data-era'), 10); renderEra();
      }));
      document.querySelectorAll('.pillar-btn').forEach(card => card.addEventListener('click', () => {
        document.querySelectorAll('.pillar-btn').forEach(c => c.classList.remove('active')); card.classList.add('active');
        activePillar = parseInt(card.getAttribute('data-pillar'), 10) || 0; drawRadarChart();
      }));
      ['slClcOpm', 'slAiSave', 'slNewMargin'].forEach(id => document.getElementById(id).addEventListener('input', updateSimulator));
      document.getElementById('resetAuditBtn').addEventListener('click', () => { checkedState = [false, false, false, false, false, false]; sSet(K_CHK, JSON.stringify(checkedState)); renderChecklist(); });

      bindHover('orgCanvas', () => orgHitboxes, false);
      bindHover('radarCanvas', () => radarPts, true);
      bindHover('hbarCanvas', () => hbarHitboxes, false);
      bindHover('comboCanvas', () => comboHitboxes, false);
      window.addEventListener('resize', drawAllCharts);

      applyTheme(currentTheme);
      applyLang(currentLang);
      updateSimulator();
    })();
  