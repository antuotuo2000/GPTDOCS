
    (function () {
      const K_THEME = 'meituan_suite_theme';
      const K_LANG = 'meituan_suite_lang';
      const K_CHK = 'meituan_os_chk_v1';

      function sGet(k, fb) { try { const v = localStorage.getItem(k); return v !== null ? v : fb; } catch (e) { return fb; } }
      function sSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

      let lang = sGet(K_LANG, 'zh');
      let theme = sGet(K_THEME, 'light');
      let topoMode = 'unified', activeTopoIdx = 0, activeRole = 'wx';
      let chk = [true, true, true, true, false, false];
      try { const p = JSON.parse(sGet(K_CHK, 'null')); if (Array.isArray(p) && p.length === 6) chk = p; } catch (e) {}

      const sunSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>';
      const moonSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';

      function showSnack(msg) {
        const sb = document.getElementById('muiSnackbar');
        sb.textContent = msg; sb.classList.add('show');
        clearTimeout(sb._t); sb._t = setTimeout(() => sb.classList.remove('show'), 2200);
      }

      const roleData = { wx: [25, 35, 20, 20], wpz: [40, 15, 25, 20], my: [30, 40, 20, 10], ops: [55, 10, 20, 15] };
      const eraInfo = [
        { zh: ['2010–2015 · 1.0 游击铁军期', '百城地推网格化扩张，千团大战胜出，建立“苦练基本功”与精细化城市 ROI 核算体系。'], en: ['2010–2015 · 1.0 Guerilla Army', 'Won the Thousand Groupon War via Tier-2/3 city density and strict unit ROI discipline.'] },
        { zh: ['2016–2023 · 2.0 平台扩张期', '“Food + Platform”确立，超脑调度支撑日峰值 >9000 万单，到店酒旅贡献 ~87% 高毛利现金流。'], en: ['2016–2023 · 2.0 Platform Scale', 'Food + Platform flywheel; Super-Brain dispatch scaled >90M peak daily orders alongside ~87% GM In-Store.'] },
        { zh: ['2024–2026+ · 3.0 去登味与 Physical AI 期', '统一核心本地商业（王莆中），2026 年 3 月“去登味”扁平化；CatPaw >95% 编码，Keeta 沙特盈利，无人机 >90 万单。'], en: ['2024–2026+ · 3.0 Flat & Physical AI', 'Unified CLC + Mar 2026 "Reducing Deng Flavor" flattening; CatPaw >95% coding, Keeta Saudi breakeven, >900k drone orders.'] }
      ];
      const osLaws = [
        { zh: '法则 1：单点统一指挥（CLC 整合外卖+到店，消除内部流量内耗）', en: 'Law 1: Unified CLC Command (Delivery + In-Store under one P&L)' },
        { zh: '法则 2：去登味扁平化（废除敬称与冗余审批，一线直通核心决策层）', en: 'Law 2: Flat Candor (Drop honorifics, direct frontline escalation)' },
        { zh: '法则 3：AI 原生研发杠杆（CatPaw 覆盖 >95% 代码，控编提效）', en: 'Law 3: AI-Native R&D Leverage (CatPaw >95% coding adoption)' },
        { zh: '法则 4：非线性前沿直管（无人机与 Keeta 出海由 CEO 直接督战）', en: 'Law 4: CEO-Direct Frontier Bets (Drones & Keeta bypass legacy layers)' },
        { zh: '法则 5：UE 铁律出清（非盈利业务如优选果断收缩，聚焦小象 68 城）', en: 'Law 5: Strict UE Discipline (Exit Select, focus Xiaoxiang 68 cities)' },
        { zh: '法则 6：长期主义反内卷（2026.7 骑手职业伤害全覆盖 + 硬科技生态）', en: 'Law 6: Anti-Involution Sustainability (Jul 2026 rider insurance + Hard-Tech)' }
      ];
      const topoNodes = {
        unified: [
          { titleZh: '核心本地商业 (王莆中)', titleEn: 'Core Local Commerce (Wang Puzhong)', subZh: '统一外卖+到店+闪购+AI转型部(穆遥)', subEn: 'Unified Delivery+In-Store+Instashopping+AI Dept', detailZh: 'Q2 2026 营收 ¥715.3亿（+10.1% YoY），营业利润迅速修复至 ¥57亿（7.9% OPM）；打通 7.7亿用户与 1450万商户。', detailEn: 'Q2 2026 Rev ¥71.53B (+10.1% YoY), OP rebounded to ¥5.7B (7.9% OPM); unifies 770M users & 14.5M merchants.' },
          { titleZh: 'Keeta 全球出海 (CEO 直管)', titleEn: 'Keeta Global (Direct to CEO)', subZh: '香港 #1 · 沙特 22 月盈利 · 巴西 32 城', subEn: 'HK #1 · Saudi 22-mo Breakeven · Brazil 32 Cities', detailZh: '由王兴直接督战绕过国内业务惯性：香港第一且盈利；沙特 2026.7 盈利；巴西 10 月扩至 32 城、下载破 1000 万。', detailEn: 'CEO-direct oversight: HK #1 & profitable; Saudi breakeven Jul 2026; Brazil 32 cities & 10M+ downloads.' },
          { titleZh: 'Physical AI 与无人机 (毛一年)', titleEn: 'Physical AI & Drones (Mao Yining)', subZh: '无人机 >90万单 · 无人车 >550万单 · LongCat-2.5', subEn: 'Drones >900k · AV >5.5M · LongCat-2.5 (1.6T)', detailZh: '2026.11 发布 LongCat-2.5 (1.6T MoE) 赋能“小美” Agent；M-Drone 4L 覆盖 97% 城市场景，累计交付超 90 万单。', detailEn: 'Nov 2026 LongCat-2.5 (1.6T MoE) powers Xiao Mei; M-Drone 4L covers 97% urban scenarios with >900k orders.' }
        ],
        legacy: [
          { titleZh: '到家事业群 (独立 P&L)', titleEn: 'In-Home BG (Siloed)', subZh: '2018–2023 外卖骑手与补贴防御', subEn: '2018–2023 Delivery & Rider Dispatch', detailZh: '早期独立核算外卖履约，虽建立了“超脑”调度壁垒，但与到店商户 BD 体系存在联动延迟。', detailEn: 'Built Super-Brain dispatch, but separate P&L created coordination lag with In-Store BD.' },
          { titleZh: '到店事业群 (独立 P&L)', titleEn: 'In-Store BG (Siloed)', subZh: '高毛利 (~87% GM) 现金牛', subEn: 'High-Margin (~87% GM) Cash Cow', detailZh: '贡献丰厚利润，但在面对抖音本地生活冲击时跨 BG 协同较慢，促成了 2024 年 CLC 合并。', detailEn: 'Delivered ~87% GM, but cross-BG friction prompted the 2024 unification into CLC.' },
          { titleZh: '美团优选 (重资产补贴)', titleEn: 'Meituan Select (Heavy Loss)', subZh: 'FY22 新业务亏 ¥284亿 -> 战略收缩', subEn: 'FY22 Loss ¥28.4B -> Strategic Exit', detailZh: '社区团购重履约模式下亏损高企，2025–2026 年果断收缩优选、聚焦小象超市（68城）与叮咚收购。', detailEn: 'Heavy loss led to decisive 2025–26 retrenchment in favor of Xiaoxiang (68 cities) + Dingdong.' }
        ]
      };

      function renderTopo() {
        const b = document.getElementById('topoBoard'), list = topoNodes[topoMode], sel = list[activeTopoIdx] || list[0], isUni = topoMode === 'unified';
        b.innerHTML = `
          <div class="topo-root" style="${isUni ? '' : 'border-color:var(--text-muted);background:var(--bg-subtle);'}">
            <div style="font-weight:800;font-size:0.88rem;">${isUni ? (lang === 'zh' ? '王兴 (CEO) · WVR 长期主义治理' : 'Wang Xing (CEO) · WVR Long-Termism') : (lang === 'zh' ? 'S-team 委员会 · 多层级事业群架构' : 'S-team Committee · Multi-Layer BG')}</div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:3px;">${isUni ? (lang === 'zh' ? '2026.3“去登味”扁平化 · 直管科技与全球奇袭' : 'Mar 2026 Flattened · Direct Tech & Global') : (lang === 'zh' ? '2018–2023 到家与到店分治 · 存在协同摩擦' : '2018–2023 Split In-Home vs In-Store')}</div>
          </div>
          <div class="topo-branches">
            ${list.map((n, i) => `<div class="topo-node ${i === activeTopoIdx ? 'active' : ''}" data-tidx="${i}"><div style="font-weight:700;font-size:0.84rem;">${lang === 'zh' ? n.titleZh : n.titleEn}</div><p style="font-size:0.74rem;color:var(--text-secondary);margin:4px 0 0;">${lang === 'zh' ? n.subZh : n.subEn}</p></div>`).join('')}
          </div>
          <div class="topo-inspector"><strong>${lang === 'zh' ? sel.titleZh : sel.titleEn}：</strong>${lang === 'zh' ? sel.detailZh : sel.detailEn}</div>`;
        b.querySelectorAll('.topo-node').forEach(el => el.addEventListener('click', () => { activeTopoIdx = parseInt(el.getAttribute('data-tidx'), 10); renderTopo(); }));
      }

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

      let dialSlices = [];
      function drawDial() {
        const c = document.getElementById('dialCanvas');
        const { ctx, w, h } = setupCanvas(c, 220);
        ctx.clearRect(0, 0, w, h); dialSlices = [];
        const vals = roleData[activeRole];
        const labels = lang === 'zh' ? ['一线督战 (Owning)', '战略学习 (Learning)', '组织赋能 (Teaching)', '授权下放 (Delegating)'] : ['Owning', 'Learning', 'Teaching', 'Delegating'];
        const cols = [getCss('--chart-c1'), getCss('--chart-c4'), getCss('--chart-c2'), getCss('--chart-c3')];
        const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.42;
        let ang = -Math.PI / 2;
        vals.forEach((v, i) => {
          const sweep = (v / 100) * Math.PI * 2;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, ang, ang + sweep); ctx.closePath();
          ctx.fillStyle = cols[i]; ctx.fill();
          dialSlices.push({ a0: ang, a1: ang + sweep, cx, cy, r, text: `${labels[i]}: ${v}%` });
          ang += sweep;
        });
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.54, 0, Math.PI * 2); ctx.fillStyle = getCss('--bg-paper-solid'); ctx.fill();
        ctx.fillStyle = getCss('--text-primary'); ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(activeRole.toUpperCase(), cx, cy + 4);
        document.getElementById('dialLegend').innerHTML = labels.map((lb, i) => `<span class="legend-pill"><i class="legend-dot" style="background:${cols[i]}"></i>${lb} (${vals[i]}%)</span>`).join('');
      }

      let fteBoxes = [];
      function drawFte() {
        const c = document.getElementById('fteCanvas');
        const { ctx, w, h } = setupCanvas(c, 260);
        ctx.clearRect(0, 0, w, h); fteBoxes = [];
        const c1 = getCss('--chart-c1'), c2 = getCss('--chart-c2'), grid = getCss('--chart-grid'), tick = getCss('--chart-tick');
        document.getElementById('fteLegend').innerHTML =
          `<span class="legend-pill"><i class="legend-dot" style="background:${c1}"></i>${lang === 'zh' ? '人均年营收 (RMB 百万, 左轴)' : 'Rev/FTE (RMB M, Left)'}</span>
           <span class="legend-pill"><i class="legend-dot" style="background:${c2}"></i>${lang === 'zh' ? '研发投入强度 (%, 右轴)' : 'R&D % of Rev (Right)'}</span>`;
        const pts = [{ lbl: 'FY23', revFte: 2.41, rd: 7.7 }, { lbl: 'FY24', revFte: 3.10, rd: 6.3 }, { lbl: 'FY25', revFte: 3.18, rd: 7.1 }, { lbl: 'FY26E', revFte: 3.45, rd: 7.3 }];
        const pad = { t: 26, r: 44, b: 34, l: 46 }, pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        ctx.strokeStyle = grid;
        for (let i = 0; i <= 4; i++) {
          const y = pad.t + ph - ph * i / 4;
          ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
          ctx.fillStyle = tick; ctx.font = '11px monospace'; ctx.textAlign = 'right'; ctx.fillText('¥' + i + 'M', pad.l - 6, y + 4);
          ctx.textAlign = 'left'; ctx.fillText((i * 2.5).toFixed(1) + '%', w - pad.r + 6, y + 4);
        }
        const gw = pw / pts.length, bw = Math.min(38, gw * 0.42);
        pts.forEach((p, i) => {
          const cx = pad.l + gw * i + gw / 2, bh = (p.revFte / 4) * ph;
          ctx.fillStyle = c1; ctx.fillRect(cx - bw / 2, pad.t + ph - bh, bw, bh);
          ctx.fillStyle = tick; ctx.font = '10.5px monospace'; ctx.textAlign = 'center'; ctx.fillText('¥' + p.revFte + 'M', cx, pad.t + ph - bh - 5);
          ctx.font = '12px sans-serif'; ctx.fillText(p.lbl, cx, h - 10);
          fteBoxes.push({ x: cx - bw, y: pad.t, w: bw * 2, h: ph, text: `${p.lbl}: ¥${p.revFte}M/FTE | R&D ${p.rd}%` });
        });
        ctx.beginPath();
        pts.forEach((p, i) => { const cx = pad.l + gw * i + gw / 2, y = pad.t + ph - (p.rd / 10) * ph; i === 0 ? ctx.moveTo(cx, y) : ctx.lineTo(cx, y); });
        ctx.strokeStyle = c2; ctx.lineWidth = 2.5; ctx.stroke();
        pts.forEach((p, i) => {
          const cx = pad.l + gw * i + gw / 2, y = pad.t + ph - (p.rd / 10) * ph;
          ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(cx, y, 4.5, 0, Math.PI * 2); ctx.fill();
          ctx.font = 'bold 10.5px monospace'; ctx.textAlign = 'center'; ctx.fillText(p.rd + '%', cx, y - 9);
        });
      }

      let arenaPts = [];
      function drawArena() {
        const c = document.getElementById('arenaCanvas');
        const { ctx, w, h } = setupCanvas(c, 285);
        ctx.clearRect(0, 0, w, h); arenaPts = [];
        const padL = 42, padR = 24, padT = 28, padB = 34, pw = w - padL - padR, ph = h - padT - padB;
        const grid = getCss('--chart-grid'), tick = getCss('--chart-tick');
        ctx.strokeStyle = grid; ctx.strokeRect(padL, padT, pw, ph);
        ctx.beginPath(); ctx.moveTo(padL, padT + ph / 2); ctx.lineTo(padL + pw, padT + ph / 2);
        ctx.moveTo(padL + pw / 2, padT); ctx.lineTo(padL + pw / 2, padT + ph); ctx.stroke();
        ctx.fillStyle = tick; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(lang === 'zh' ? '物理世界履约密度 →' : 'Physical Execution Density →', padL + pw / 2, h - 10);
        ctx.textAlign = 'left'; ctx.fillText(lang === 'zh' ? '↑ AI 与技术自治' : '↑ AI & Tech Autonomy', padL, 16);
        const peers = [
          { name: 'Meituan', x: 9.6, y: 8.8, c: getCss('--chart-c1') },
          { name: 'Amazon', x: 9.1, y: 9.4, c: getCss('--chart-c3') },
          { name: 'ByteDance', x: 7.4, y: 9.2, c: getCss('--chart-c4') },
          { name: 'Alibaba', x: 7.0, y: 8.0, c: getCss('--chart-c2') },
          { name: 'PDD', x: 8.2, y: 6.4, c: getCss('--mui-error-text') }
        ];
        peers.forEach(p => {
          const px = padL + ((p.x - 5.5) / 4.8) * pw, py = padT + ph - ((p.y - 5.5) / 4.5) * ph;
          ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(px, py, p.name === 'Meituan' ? 11 : 8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = getCss('--text-primary'); ctx.font = 'bold 11.5px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.name, px, py - 14);
          arenaPts.push({ x: px, y: py, text: `${p.name}: Physical ${p.x}/10 | AI/Tech ${p.y}/10` });
        });
      }

      function updateEntropy() {
        const layers = parseInt(document.getElementById('eLayers').value, 10);
        const sub = parseInt(document.getElementById('eSub').value, 10);
        const ai = parseInt(document.getElementById('eAi').value, 10);
        document.getElementById('eSl1V').textContent = layers + (lang === 'zh' ? ' 级' : ' layers');
        document.getElementById('eSl2V').textContent = sub + '%';
        document.getElementById('eSl3V').textContent = ai + '%';
        const vel = Math.min(99, Math.max(35, Math.round(112 - layers * 7 + (ai - 50) * 0.2)));
        const res = Math.min(98, Math.max(28, Math.round(108 - sub * 1.6 + (ai - 40) * 0.25)));
        document.getElementById('eVelOut').textContent = vel + ' / 100';
        document.getElementById('eResOut').textContent = res + ' / 100';
        const riskEl = document.getElementById('eRiskOut');
        if (layers <= 5 && ai >= 80) { riskEl.textContent = lang === 'zh' ? '低 (Low)' : 'Low'; riskEl.style.color = 'var(--mui-success-text)'; }
        else if (layers <= 7) { riskEl.textContent = lang === 'zh' ? '中 (Medium)' : 'Medium'; riskEl.style.color = 'var(--mui-warning-text)'; }
        else { riskEl.textContent = lang === 'zh' ? '高 (High)' : 'High'; riskEl.style.color = 'var(--mui-error-text)'; }
      }

      function renderChecklist() {
        const cont = document.getElementById('osChecklist'); cont.innerHTML = '';
        osLaws.forEach((it, idx) => {
          const on = !!chk[idx], div = document.createElement('div');
          div.className = 'check-item' + (on ? ' checked' : '');
          div.innerHTML = `<div class="check-box">${on ? '✓' : ''}</div><div style="font-size:0.82rem;font-weight:600;">${it[lang]}</div>`;
          div.addEventListener('click', () => { chk[idx] = !chk[idx]; sSet(K_CHK, JSON.stringify(chk)); renderChecklist(); });
          cont.appendChild(div);
        });
      }

      function applyTheme(t) {
        theme = t; document.documentElement.setAttribute('data-theme', t); sSet(K_THEME, t);
        document.getElementById('appbarThemeIcon').innerHTML = t === 'dark' ? sunSvg : moonSvg;
        document.getElementById('sideThemeLightBtn').setAttribute('aria-pressed', t === 'light' ? 'true' : 'false');
        document.getElementById('sideThemeDarkBtn').setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
        drawAll();
      }

      function applyLang(l) {
        lang = l; document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'; sSet(K_LANG, l);
        document.getElementById('langZhBtn').classList.toggle('active', l === 'zh');
        document.getElementById('langEnBtn').classList.toggle('active', l === 'en');
        document.querySelectorAll('[data-i18n-zh]').forEach(el => {
          const val = el.getAttribute(l === 'zh' ? 'data-i18n-zh' : 'data-i18n-en');
          if (val !== null) el.innerHTML = val;
        });
        document.getElementById('quickJumpInput').placeholder = l === 'zh' ? '快速跳转模块...' : 'Quick jump...';
        renderTopo(); updateScrub(); updateEntropy(); renderChecklist(); drawAll();
      }

      function updateScrub() {
        const v = parseInt(document.getElementById('eraScrubber').value, 10);
        document.getElementById('eraBadge').textContent = eraInfo[v][lang][0];
        document.getElementById('eraScrubDesc').textContent = eraInfo[v][lang][1];
      }
      function drawAll() { drawDial(); drawFte(); drawArena(); }

      document.getElementById('appbarThemeBtn').addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));
      document.getElementById('sideThemeLightBtn').addEventListener('click', () => applyTheme('light'));
      document.getElementById('sideThemeDarkBtn').addEventListener('click', () => applyTheme('dark'));
      document.getElementById('langZhBtn').addEventListener('click', () => applyLang('zh'));
      document.getElementById('langEnBtn').addEventListener('click', () => applyLang('en'));
      document.getElementById('sidePrintBtn')?.addEventListener('click', () => window.print());
      document.getElementById('sideExportBtn')?.addEventListener('click', () => {
        const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Meituan_Corporate_Culture_Blueprint.html'; a.click();
        showSnack(lang === 'zh' ? '已导出 HTML 文件' : 'Exported HTML');
      });

      const sb = document.getElementById('muiSidebar'), db = document.getElementById('drawerBackdrop');
      document.getElementById('sidebarToggleBtn').addEventListener('click', () => {
        if (window.innerWidth < 1024) { sb.classList.toggle('open'); db.classList.toggle('open'); }
        else {
          const cur = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
          document.documentElement.setAttribute('data-sidebar-collapsed', cur ? '0' : '1');
          setTimeout(drawAll, 60);
        }
      });
      db.addEventListener('click', () => { sb.classList.remove('open'); db.classList.remove('open'); });
      document.querySelectorAll('.mui-nav-link').forEach(a => a.addEventListener('click', () => { if (window.innerWidth < 1024) { sb.classList.remove('open'); db.classList.remove('open'); } }));

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

      const navLinks = document.querySelectorAll('#tocList .mui-nav-link');
      window.addEventListener('scroll', () => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        document.getElementById('readingProgressBar').style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
        let cur = 'mod-c0';
        document.querySelectorAll('.bm-workspace > section').forEach(s => { if (s.getBoundingClientRect().top <= 140) cur = s.id; });
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
      }, { passive: true });

      document.querySelectorAll('[data-topo]').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('[data-topo]').forEach(x => x.classList.remove('active')); b.classList.add('active');
        topoMode = b.getAttribute('data-topo'); activeTopoIdx = 0; renderTopo();
      }));
      document.querySelectorAll('[data-role]').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('[data-role]').forEach(x => x.classList.remove('active')); b.classList.add('active');
        activeRole = b.getAttribute('data-role'); drawDial();
      }));
      document.getElementById('eraScrubber').addEventListener('input', updateScrub);
      ['eLayers', 'eSub', 'eAi'].forEach(id => document.getElementById(id).addEventListener('input', updateEntropy));

      const dialC = document.getElementById('dialCanvas'), tip = document.getElementById('chartTooltip');
      dialC.addEventListener('mousemove', e => {
        const r = dialC.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top, s = dialSlices[0];
        if (s && Math.hypot(mx - s.cx, my - s.cy) <= s.r && Math.hypot(mx - s.cx, my - s.cy) >= s.r * 0.5) {
          let a = Math.atan2(my - s.cy, mx - s.cx); if (a < -Math.PI / 2) a += Math.PI * 2;
          const hit = dialSlices.find(x => a >= x.a0 && a <= x.a1);
          if (hit) { tip.textContent = hit.text; tip.style.left = Math.min(window.innerWidth - 220, e.clientX + 14) + 'px'; tip.style.top = Math.max(10, e.clientY - 34) + 'px'; tip.style.display = 'block'; return; }
        }
        tip.style.display = 'none';
      });
      dialC.addEventListener('mouseleave', () => tip.style.display = 'none');

      function bindBoxHover(cid, getter, isPt) {
        const c = document.getElementById(cid);
        c.addEventListener('mousemove', e => {
          const r = c.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
          const hit = isPt ? getter().find(b => Math.hypot(mx - b.x, my - b.y) < 18) : getter().find(b => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h);
          if (hit) { tip.textContent = hit.text; tip.style.left = Math.min(window.innerWidth - 260, e.clientX + 14) + 'px'; tip.style.top = Math.max(10, e.clientY - 34) + 'px'; tip.style.display = 'block'; }
          else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', () => tip.style.display = 'none');
      }
      bindBoxHover('fteCanvas', () => fteBoxes, false);
      bindBoxHover('arenaCanvas', () => arenaPts, true);
      window.addEventListener('resize', drawAll);

      applyTheme(theme);
      applyLang(lang);
    })();
  