
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_adea_theme_v1';
 var STORAGE_LANG_KEY = 'mui_adea_lang_v1';
 var STORAGE_STRESS_KEY = 'adea_bm_stress_v1';
 var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'cadence', kView: 'debt' };
 var hitRegions = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 if (!bar) return;
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t);
 bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return {
 dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155',
 tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)',
 blue: dark ? '#3399FF' : '#0073E6', blueSoft: dark ? 'rgba(51,153,255,0.24)' : 'rgba(0,115,230,0.16)',
 green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706',
 violet: dark ? '#A78BFA' : '#7C3AED', red: dark ? '#FF6B6B' : '#DC2626'
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
 drawAllCharts();
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
 drawAllCharts();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 // Lenses
 var LENSES = [
 { formula: '纯专利商业公式：毛利率 ≈ 100%（无实物 BOM 成本）| FY25 自由现金流 $156.3M ÷ 营收 $443.4M = 35.2% FCF 转化（CapEx 仅 $1.81M）', body: '与传统半导体厂需每年砸数百亿美元建晶圆厂不同，Adeia 的“工厂”是专利组合：客户（晶圆厂、HBM 内存巨头与 OTT 流媒体）承担全部制造与内容成本，Adeia 只在每颗芯片或每份订阅中抽取高确定性多年期许可费，2025 年资本开支仅占营收 <strong>0.41%</strong>。' },
 { formula: '议价护城河公式：协商优先 (85%+和解签约) + 诉讼威慑 (9M26 仅耗 $18.5M) → 过往侵权追缴 + 多年期常青长约 ($491.9M RPO)', body: '虽偶尔对未付费巨头提起侵权诉讼（如 2024 年对 Disney、2025 年对 AMD），但几乎均以多年期商业许可协议收官——一旦头部玩家签约，同业竞争者为避免法律与市场劣势往往加速跟进。' },
 { formula: '每股价值公式：高 FCF ($156.3M/年) → 定期贷款 2 年削减 >$100M 至 $386.5M + $140M 回购授权 + $0.20/股稳健分红', body: '剥离重资产硬件后，Adeia 优先用高利润自由现金流偿还分拆债务（S&amp;P 2026 年 4 月将评级由 BB- 升至 BB），随着利息支出下行（9M26 利息降至 $24.6M vs 9M25 $30.9M），更多现金正转向股票回购。' }
 ];
 document.getElementById('lensTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-lens'), 10) || 0;
 var all = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < all.length; i++) all[i].classList.toggle('active', all[i] === b);
 document.getElementById('lensFormula').textContent = LENSES[idx].formula;
 document.getElementById('lensBody').innerHTML = LENSES[idx].body;
 });

 // 5-Node Pipeline
 var NODES = [
 { badge: 'NODE 01 · FOUNDATIONAL R&D & PORTFOLIO CURATION', title: '底层发明孵化器：每年投入 ~15% 营收研发 + 精准补强收购，筑起 20 年有效期专利墙', desc: '继承自 Tessera（1990年创立的半导体封装先驱）与 TiVo/Rovi（交互式电视指南先驱），Adeia 每年将约 $6,750 万（FY25 占营收 15.2%）投入前沿研发，并通过小额精准收购（9M26 购入无形资产 $1,500 万）持续扩容。截至 2025 年底拥有约 13,750 项（2026 年增至 14,250+ 项）全球专利与申请，最晚授权专利有效期直抵 2045 年 3 月。', formula: '专利扩张飞轮：2022分拆时 9,500 项 → 2025年底 13,750 项 (+45%) → 2026年 14,250+ 项（覆盖至 2045 年）', kpis: [['14,250+', '2026 年全球专利及申请总量'], ['$67.5M', 'FY2025 研发投入 (15.2% 营收)'], ['2045.03', '现有已授权专利最晚到期日'], ['150人', '全公司精锐编制（含高密度研发）']] },
 { badge: 'NODE 02 · INDUSTRY CHOKEPOINT STANDARDS', title: '卡位摩尔定律尽头与流媒体交互的“收费咽喉”', desc: '当晶体管微缩逼近物理极限，AI 芯片算力与带宽只能依靠 2.5D/3D 异构集成与混合键合（DBI®/DBI Ultra™）突破；而在数字娱乐端，无论是 OTT 推荐还是电商视觉发现，均深度触及 Adeia 的底层交互专利。', formula: '技术卡位：HBM4/HBM5 与 3D 逻辑堆叠无法绕开直接键合铜-铜互连物理路径，行业预计投入 $1,250 亿扩充先进封装产能', kpis: [['DBI Ultra', '下一代超细间距 3D 混合键合'], ['RapidCool', '即插即用数据中心液冷/散热方案'], ['$125B', '晶圆与存储厂近期先进封装资本投入'], ['40亿+台', '全球搭载 Adeia 技术消费设备量级']] },
 { badge: 'NODE 03 · NEGOTIATION & LITIGATION BACKSTOP', title: '谈判桌为主、联邦法院为剑：高胜率转化未授权巨头', desc: 'Adeia 明确将诉讼定位为“最后手段”，仅在长期商业谈判僵持时启动。2024–2026 年接连与 X Corp.、Altice、Disney（2025.12）及 AMD（2026.03）达成和解并转化为长期付费客户，强力验证了专利组合的法律硬度。', formula: '商业威慑效应：每赢下一场头部巨头诉讼和解，都会显著降低后续同业谈判阻力并缩短签约周期', kpis: [['Disney', '2025.12 签署长期媒体专利许可'], ['AMD', '2026.03 签署半导体与混合键合长约'], ['RPX 10企', '2026 Q2 一次性签约 10 家电商巨头'], ['Charter/TCL', '2026 Q3 顺利完成核心长约续签']] },
 { badge: 'NODE 04 · MULTI-YEAR RECURRING ROYALTIES', title: '多年期合同积压与极高边际运营杠杆', desc: '签约后，客户按季度或年度支付固定许可费或按出货量计提版税，几乎不增加 Adeia 的直接交付成本。截至 2026 年 9 月 30 日，一年以上合同剩余履约义务（RPO）达 $4.919 亿，为未来现金流提供高能见度底座。', formula: '利润放大器：固定研发与管理费用率随营收爬坡迅速摊薄，FY25 营收增 17.9% 撬动营业利润大增 36.1%、净利暴涨 71.9%', kpis: [['$491.9M', '截至 26Q3 一年以上长期 RPO'], ['62.6%', 'FY2025 调整后 EBITDA 利润率'], ['39.5%', 'FY2025 GAAP 营业利润率'], ['~55.4%', 'FY2026E 调整后 EBITDA 利润率中枢']] },
 { badge: 'NODE 05 · DELEVERAGING & SHAREHOLDER RETURN', title: '轻资产自由现金流三路分配：降债降息 + 稳健分红 + 逢低回购', desc: '2022 年分拆时承接的定期贷款正在被高速吞噬：2024–2026 Q3 累计偿债超 $2.14 亿，余额降至 $386.5M，带动季度利息支出从 25Q3 的 $10.1M 降至 26Q3 的 $8.1M；同时维持 $0.20/股年化分红并保留 $1.40 亿股票回购弹性。', formula: '资本飞轮：FCF 偿债 → 利息下降 + S&P 升至 BB → 释放更多自由现金流回购缩股，驱动每股价值复利', kpis: [['$386.5M', '2026 Q3 末定期贷款余额 (持续下降)'], ['BB 评级', '2026.04 S&P 上调信用评级 (杠杆 1.6x)'], ['$140.0M', '截至 26Q3 剩余股票回购授权额度'], ['$0.05/季', '稳定季度现金分红 ($16.6M/9M26)']] }
 ];
 document.getElementById('pipelineTrack').addEventListener('click', function (e) {
 var btn = e.target.closest('[data-node]');
 if (!btn) return;
 var idx = parseInt(btn.getAttribute('data-node'), 10) || 0;
 var bs = this.querySelectorAll('.bm-node-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
 var nd = NODES[idx];
 document.getElementById('nodeBadge').textContent = nd.badge;
 document.getElementById('nodeTitle').textContent = nd.title;
 document.getElementById('nodeDesc').textContent = nd.desc;
 document.getElementById('nodeFormula').textContent = nd.formula;
 document.getElementById('nodeKpis').innerHTML = nd.kpis.map(function (k) {
 return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
 }).join('');
 });

 // Tier & Peer Filters
 document.getElementById('tierFilter').addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]');
 if (!b) return;
 var cat = b.getAttribute('data-tcat');
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var cards = document.querySelectorAll('#tierList [data-tier]');
 for (var j = 0; j < cards.length; j++) cards[j].style.display = (cat === 'all' || cards[j].getAttribute('data-tier') === cat) ? '' : 'none';
 });
 document.getElementById('peerFilter').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pcat]');
 if (!b) return;
 var cat = b.getAttribute('data-pcat');
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var rows = document.querySelectorAll('#peerTable tbody tr');
 for (var j = 0; j < rows.length; j++) {
 var rc = rows[j].getAttribute('data-row-cat') || '';
 rows[j].style.display = (cat === 'all' || rc.indexOf(cat) !== -1) ? '' : 'none';
 }
 });

 // Cohort Tabs
 var COHORTS = {
 paytv: { stats: [['核心客户群体', 'Comcast · Charter · Cox · Verizon', '全美及欧洲主力有线/电信商'], ['行业特征', '成熟期现金牛', '长约续签率极高但受剪线潮缓降'], ['近期重磅续约', 'Charter & Altice', '2025.09 Altice + 2026 Q3 Charter 续约'], ['战略角色', '现金流压舱石', '为研发与偿债提供稳定底座']], note: '<strong>Pay-TV 现金牛底座：</strong>尽管传统付费电视订户缓慢下滑，但 Adeia 凭借不可绕开的电子节目指南与 DVR 交互专利，持续与 Charter、Altice 等巨头完成多年期续约，为半导体扩张输血。' },
 semi: { stats: [['代表性签约巨头', 'AMD · Micron · SK hynix · Kioxia', '覆盖存储 HBM 与逻辑芯片'], ['2026 Q2 / Q3 单季贡献', '$14.8M / $15.2M', '占总营收 ~18.9% 且持续爬坡'], ['长期年度营收目标', '$200M / 年', '管理层 2026 年上调至 2 亿美元'], ['产业投资顺风', '$125B 行业扩产', '晶圆与存储厂加速导入混合键合']], note: '<strong>“AMD 破冰效应”：</strong>2026 年 3 月 AMD 在诉讼后与 Adeia 签署覆盖先进制程与混合键合的多年期许可协议，首次在高性能逻辑芯片（CPU/GPU Chiplet）领域确立 Adeia 混合键合专利的商业标杆。' },
 ott: { stats: [['核心签约阵营', 'Disney+ · YouTube · TCL · Fanatics', '2026 Q3 新签 4 家媒体/电商客户'], ['突破性交易', 'RPX 10家电商联盟', '2026 Q2 一次性覆盖 10 家数字商务平台'], ['电商远期空间', '~10% 总营收占比', '管理层预期看齐当前消费电子体量'], ['媒体长期总目标', '$400M / 年', 'OTT+电商+社交抵消 Pay-TV 衰减']], note: '<strong>非传统媒体破圈：</strong>2025 年底攻克 Disney、2026 年接连签约 RPX 电商联盟、Fanatics 及多家社交与消费电子公司，证明 Adeia 的内容发现与个性化专利已成功外溢至流媒体与电商生态。' }
 };
 document.getElementById('cohortTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]');
 if (!b) return;
 var k = b.getAttribute('data-cohort');
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var c = COHORTS[k] || COHORTS.semi;
 document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s, idx) {
 return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val' + (idx > 0 ? ' mono' : '') + '"' + (idx === 0 ? ' style="font-size:0.93rem;"' : '') + '>' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = c.note;
 });

 // Canvas Engine
 function prepCanvas(id) {
 var c = document.getElementById(id);
 if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 500), h = Math.max(140, rect.height || 280);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y);
 ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr);
 ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawProfitCanvas() {
 var env = prepCanvas('profitCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.pView === 'waterfall') {
 var steps = [
 { lbl: 'FY25营收', val: 443.4, col: pal.blue, tip: 'FY2025 10-K 总营收: $443.39M (+17.9% YoY)，无实物销售成本' },
 { lbl: '研发投入', val: 67.5, col: pal.violet, tip: 'FY2025 R&D 费用: $67.52M (占营收 15.2%，孵化混合键合与媒体专利)' },
 { lbl: '销管+诉讼', val: 143.9, col: pal.amber, tip: 'FY2025 SG&A ($119.5M) + 诉讼费，扣除摊销后支撑高营业杠杆' },
 { lbl: '营业利润', val: 175.0, col: pal.blue, tip: 'FY2025 GAAP 营业利润: $175.00M (营业利润率 39.5%，+36.1% YoY)' },
 { lbl: 'GAAP净利', val: 111.1, col: pal.violet, tip: 'FY2025 GAAP 净利润: $111.08M (净利率 25.1%，+71.9% YoY)' },
 { lbl: '自由现金流', val: 156.3, col: pal.green, tip: 'FY2025 自由现金流: $156.28M (FCF 率 35.2%，CapEx 仅 $1.81M)' }
 ];
 var maxV = 490;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv.toFixed(0) + 'M', pad.left - 8, gy + 4);
 }
 var slotW = pw / steps.length, barW = Math.min(46, slotW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * slotW + (slotW - barW) / 2;
 var bh = Math.max(5, (s.val / maxV) * ph), yTop = pad.top + ph - bh;
 ctx.fillStyle = s.col; roundRect(ctx, x, yTop, barW, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + s.val.toFixed(1) + 'M', x + barW / 2, yTop - 7);
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif';
 ctx.fillText(s.lbl, x + barW / 2, pad.top + ph + 20);
 hitRegions.profitCanvas.push({ x: x, y: yTop, w: barW, h: bh, title: s.lbl, body: s.tip });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'];
 var opm = [30.4, 34.9, 35.0, 34.2, 39.5];
 var fcfm = [56.4, 38.8, 38.3, 56.0, 35.2];
 var minM = 20, maxM = 65;
 for (var m = 0; m <= 4; m++) {
 var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4);
 }
 function plot(arr, col, name) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 4) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 4) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v.toFixed(1) + '%', px, py - 8);
 hitRegions.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + name, body: name + ': ' + v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / 4) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plot(fcfm, pal.green, '自由现金流利润率 (FCF Margin)');
 plot(opm, pal.blue, 'GAAP 营业利润率 (Op Margin)');
 }
 }

 function drawCohortCanvas() {
 var env = prepCanvas('cohortCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.cohortCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.cView === 'cadence') {
 var qs = ['25Q1', '25Q2', '25Q3', '25Q4(Disney)', '26Q1', '26Q2', '26Q3'];
 var revs = [87.7, 85.7, 87.3, 182.6, 104.8, 96.1, 80.2];
 var maxR = 200;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxR / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / qs.length, bw = Math.min(36, slot * 0.56);
 qs.forEach(function (q, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (revs[i] / maxR) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 3 ? pal.amber : (i >= 4 ? pal.green : pal.blue);
 roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + revs[i].toFixed(1) + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
 ctx.fillText(q, x + bw / 2, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: q + ' 单季营收', body: '$' + revs[i].toFixed(1) + 'M' + (i === 3 ? '（含 Disney 多年期签约过往追缴脉冲）' : '') });
 });
 } else {
 var cats = ['Media 媒体/OTT/电商', 'Semiconductor 半导体', '合计总营收'];
 var cur = [360, 83, 443.4];
 var tgt = [400, 200, 600];
 var maxT = 650, slot = pw / cats.length;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxT / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'M', pad.left - 8, ky + 4);
 }
 cats.forEach(function (c, idx) {
 var cx = pad.left + idx * slot + slot / 2, bw = 32;
 var h1 = (cur[idx] / maxT) * ph, h2 = (tgt[idx] / maxT) * ph;
 ctx.fillStyle = pal.blueSoft; roundRect(ctx, cx - bw - 4, pad.top + ph - h1, bw, h1, 5); ctx.fill();
 ctx.fillStyle = idx === 1 ? pal.green : pal.blue; roundRect(ctx, cx + 4, pad.top + ph - h2, bw, h2, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + cur[idx] + 'M', cx - bw / 2 - 4, pad.top + ph - h1 - 6);
 ctx.fillText('$' + tgt[idx] + 'M', cx + bw / 2 + 4, pad.top + ph - h2 - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(c, cx, pad.top + ph + 20);
 hitRegions.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: c, body: '当前基准 ~$' + cur[idx] + 'M → 远期目标 $' + tgt[idx] + 'M' });
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

 if (state.kView === 'debt') {
 var pts = ['2022分拆', '2023末', '2024末', '2025末', '2026 Q3'];
 var debt = [730, 601, 487, 427, 386.5];
 var maxD = 800;
 for (var g = 0; g <= 4; g++) {
 var gv = (maxD / 4) * g, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'M', pad.left - 8, gy + 4);
 }
 var slot = pw / pts.length, bw = Math.min(42, slot * 0.56);
 pts.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (debt[i] / maxD) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 4 ? pal.green : pal.blue;
 roundRect(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + debt[i] + 'M', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.fillText(p, x + bw / 2, pad.top + ph + 20);
 hitRegions.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p + ' 定期贷款余额', body: '债务余额降至 $' + debt[i] + 'M（S&P 于 2026.04 上调评级至 BB）' });
 });
 } else {
 var cos = [
 { name: 'Adeia (FY25)', cap: 0.41, col: pal.green },
 { name: 'Adeia (9M26)', cap: 0.75, col: pal.green },
 { name: 'Apple (FY26)', cap: 1.89, col: pal.blue },
 { name: 'NVIDIA (FY26)', cap: 2.50, col: pal.violet },
 { name: 'Alphabet (FY25)', cap: 17.0, col: pal.amber }
 ];
 var maxC = 20, rowH = ph / cos.length;
 cos.forEach(function (c, idx) {
 var cy = pad.top + idx * rowH + rowH / 2, bh = 20, bl = Math.max(8, (c.cap / maxC) * (pw - 60));
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left + 70, cy - bh / 2, pw - 70, bh, 5); ctx.fill();
 ctx.fillStyle = c.col; roundRect(ctx, pad.left + 70, cy - bh / 2, bl, bh, 5); ctx.fill();
 ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(c.name, pad.left + 62, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
 ctx.fillText(c.cap.toFixed(2) + '%', pad.left + 76 + bl, cy + 4);
 hitRegions.capitalCanvas.push({ x: pad.left, y: cy - 12, w: pw, h: 24, title: c.name + ' CapEx/营收比', body: '资本开支强度仅占营收 ' + c.cap.toFixed(2) + '%' });
 });
 }
 }

 // Simulator
 var simEpsArr = [1.32, 1.65, 2.01, 2.38, 2.79];
 function drawSimMiniCanvas() {
 var env = prepCanvas('simMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 26, left: 44 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2026E', '2027E', '2028E', '2029E', '2030E'];
 var maxE = Math.max(3.6, Math.ceil(Math.max.apply(null, simEpsArr) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = pal.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 simEpsArr.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / maxE) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 simEpsArr.forEach(function (v, i) {
 var px = pad.left + (i / 4) * pw, py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = i === 4 ? pal.green : pal.blue; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2), px, py - 8);
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }
 function runSimulator() {
 var sRev = parseFloat(document.getElementById('inpSemiRev').value);
 var mRev = parseFloat(document.getElementById('inpMediaRev').value);
 var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblSemiRev').textContent = '$' + sRev + 'M';
 document.getElementById('lblMediaRev').textContent = '$' + mRev + 'M';
 document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';

 var tot2030 = sRev + mRev;
 var ebitda2030 = tot2030 * 0.63;
 var interest2030 = 14.0; // lower debt by 2030
 var nonGaapNet = (ebitda2030 - 2.5 - interest2030) * 0.79;
 var sh2030 = 114.0 * Math.pow(1 - buy, 4);
 var eps2030 = nonGaapNet / sh2030;
 var fcf2030 = tot2030 * 0.413;

 document.getElementById('simRevOut').textContent = '$' + Math.round(tot2030) + 'M';
 document.getElementById('simEbitdaOut').textContent = '$' + Math.round(ebitda2030) + 'M';
 document.getElementById('simEpsOut').textContent = '$' + eps2030.toFixed(2);
 document.getElementById('simFcfOut').textContent = '$' + Math.round(fcf2030) + 'M';

 var base26 = 1.32; // midpoint FY26 guidance non-GAAP EPS (~$150.5M / 114M)
 simEpsArr = [0, 0.25, 0.5, 0.75, 1].map(function (t) { return base26 + (eps2030 - base26) * t; });
 drawSimMiniCanvas();
 }
 ['inpSemiRev', 'inpMediaRev', 'inpBuyRate'].forEach(function (id) {
 document.getElementById(id).addEventListener('input', runSimulator);
 });
 var PRESETS = { bear: { s: 120, m: 330, b: 1.0 }, base: { s: 200, m: 400, b: 2.0 }, bull: { s: 280, m: 440, b: 3.5 } };
 document.getElementById('simPresets').addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]');
 if (!b) return;
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var pr = PRESETS[b.getAttribute('data-preset')] || PRESETS.base;
 document.getElementById('inpSemiRev').value = pr.s;
 document.getElementById('inpMediaRev').value = pr.m;
 document.getElementById('inpBuyRate').value = pr.b;
 runSimulator();
 });

 function bindChartTab(gid, attr, skey, fn) {
 document.getElementById(gid).addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']');
 if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 fn();
 });
 }
 bindChartTab('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
 bindChartTab('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
 bindChartTab('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(function (cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
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
 tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
 } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 });

 function drawAllCharts() { drawProfitCanvas(); drawCohortCanvas(); drawCapitalCanvas(); drawSimMiniCanvas(); }

 // Quick Jump
 var QUICK_ITEMS = [
 { id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: '$443.4M 营收 · $2.96M 人均创收 · 0.41% CapEx' },
 { id: 'mod-pipeline', t: 'M1 五阶专利变现传导沙盘', s: '14,250+专利 → DBI混合键合 → 诉讼和解 → 降债回购' },
 { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与四层版税', s: '62.6% Adj. EBITDA · 半导体 $200M + 媒体 $400M 目标' },
 { id: 'mod-cohort', t: 'M3 赛道客户分层与合同积压', s: 'Pay-TV vs 半导体 AMD/Micron vs OTT/电商 · $491.9M RPO' },
 { id: 'mod-capital', t: 'M4 极简CapEx去杠杆与6亿推演', s: '定期贷款降至 $386.5M · S&P BB 评级 · 2030 EPS 模拟' },
 { id: 'mod-matrix', t: 'M5 全球 IP 巨头对标与风险压测', s: 'ADEA vs ARM / IDCC / DLB / QCOM' }
 ];
 var qInput = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(q) {
 var kw = (q || '').trim().toLowerCase();
 var matched = QUICK_ITEMS.filter(function (it) { return !kw || it.t.toLowerCase().indexOf(kw) !== -1 || it.s.toLowerCase().indexOf(kw) !== -1; });
 qPop.innerHTML = matched.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump="#' + it.id + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
 }).join('');
 qPop.classList.toggle('open', matched.length > 0);
 }
 qInput.addEventListener('focus', function () { renderQ(qInput.value); });
 qInput.addEventListener('input', function () { renderQ(qInput.value); });
 qPop.addEventListener('click', function (e) {
 var jb = e.target.closest('[data-jump]');
 if (!jb) return;
 var el = document.querySelector(jb.getAttribute('data-jump'));
 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qInput.focus(); } });

 // Sidebar, Export, Print, Theme, Lang
 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else {
 var c = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (c) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 setTimeout(drawAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
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
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'Adeia_Business_Model_Analysis.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast('已导出 Adeia_Business_Model_Analysis.html');
 });

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 var docH = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0) + '%';
 }, { passive: true });

 try {
 var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
 document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
 var k = chk.getAttribute('data-stress-chk'); chk.checked = !!savedChk[k];
 chk.addEventListener('change', function () {
 savedChk[k] = chk.checked;
 try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (err) {}
 showToast(chk.checked ? '已加入重点跟踪清单' : '已取消跟踪标记');
 });
 });
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAllCharts, 90); });
 runSimulator();
 drawAllCharts();
 })();
 