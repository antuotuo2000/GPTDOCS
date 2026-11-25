
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_adea_theme_v1', STORAGE_LANG_KEY = 'mui_adea_lang_v1';
 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'rev', pe: 18 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

 function showToast(msg) {
 var bar = document.getElementById('muiSnackbar');
 bar.textContent = msg; bar.classList.add('show');
 clearTimeout(bar._t); bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
 }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)', blue: dark ? '#3399FF' : '#0073E6', violet: dark ? '#A78BFA' : '#7C3AED', green: dark ? '#22C55E' : '#16A34A', amber: dark ? '#FFB74D' : '#D97706', red: dark ? '#FF6B6B' : '#DC2626' };
 }
 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
 }
 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) { if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val; else nodes[i].textContent = val; }
 }
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 var HORIZONS = [
 { badge: 'HORIZON 1 · 高确定性兑现期 (2026–2027)', title: 'AMD 版税爬坡 × 电商/社交扩圈 × 跨年大单落袋', items: ['<strong>AMD 逻辑芯片放量：</strong>随混合键合在 AMD 处理器与加速器普及，季度版税有望逐步爬坡至 $5M–$10M+ 量级。', '<strong>电商与社交商业化：</strong>RPX 10 家电商与 Fanatics 之后，持续拓展头部电商与社交媒体交互推荐专利许可。', '<strong>去杠杆利息红利：</strong>定期贷款持续压降至 $350M 以下，释放更多自由现金流用于股票回购。'], prob: '兑现确定性：高 (85%+)', impact: '年度营收阶梯：$415M → $480M' },
 { badge: 'HORIZON 2 · 半导体规模跃迁期 (2028–2029)', title: 'HBM4/5 全覆盖 × 新逻辑大厂签约 × RapidCool 商用', items: ['<strong>逻辑芯片阵列扩围：</strong>继 AMD 之后，向 Broadcom、Intel、Marvell 及头部云厂商自研 ASIC 推进混合键合许可。', '<strong>RapidCool™ 散热落地：</strong>应对千瓦级 AI 服务器散热瓶颈，开启数据中心热管理 IP 商业化。', '<strong>媒体目标达成：</strong>OTT、消费电子与电商增量彻底抵消传统 Pay-TV 自然下滑，稳固 $400M 媒体盘。'], prob: '兑现确定性：中高 (75%)', impact: '年度营收阶梯：$520M → $600M' },
 { badge: 'HORIZON 3 · 远期生态奇点期 (2030–2032)', title: '汽车智能化 IP × STCO 协同优化 × 零债复利机器', items: ['<strong>汽车半导体与软件 IP：</strong>Dipti Vachani 充分激活 Arm SOAFEE 生态人脉，拓展车载芯片与座舱交互许可。', '<strong>MicroLED 与 3D STCO：</strong>下一代光学与系统级协同设计专利步入收获期，已授权专利护城河延续至 2045 年。', '<strong>净现金回购飞轮：</strong>长期债务清零后，>40% FCF 转化率近乎全额回馈股东。'], prob: '兑现确定性：远期期权 (50%–60%)', impact: '年度营收蓝图：$650M+' }
 ];
 document.getElementById('hzTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 var bs = this.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var hz = HORIZONS[idx];
 document.getElementById('hzBadge').textContent = hz.badge;
 document.getElementById('hzTitle').textContent = hz.title;
 document.getElementById('hzList').innerHTML = hz.items.map(function (t) { return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>'; }).join('');
 document.getElementById('hzProb').textContent = hz.prob;
 document.getElementById('hzImpact').textContent = hz.impact;
 });

 var ENGINES = [
 { badge: 'ENGINE 01 · DBI® & DBI ULTRA™ HYBRID BONDING', title: '直接键合互连（DBI）：后摩尔时代 HBM4/5 与 3D Chiplet 堆叠的“物理粘合剂”', desc: '随着 AI 训练与推理芯片对内存带宽和算力密度提出极限要求，传统微凸块（Micro-bump）封装已无法满足超细间距互连需求。Adeia 深耕二十余年的 DBI®（室温铜-铜直接键合）及下一代 DBI Ultra™ 技术成为 HBM 高带宽内存垂直堆叠与逻辑芯片 3D 集成的核心底层专利。随着 Apple、Intel、Broadcom 与 AMD 相继量产混合键合产品，Adeia 在 2026 年将半导体长期年营收目标上调至 $2.00 亿。', formula: '商业抓手：行业预计投入 $1,250 亿扩充先进封装 → Adeia 零资本开支坐收晶圆/芯片级技术许可费', gauges: [['$200M/年', '上调后的半导体长期营收目标'], ['AMD 26.03', '逻辑芯片领域里程碑级签约'], ['$125B', '行业先进封装近期投资规模'], ['2045.03', '专利组合护城河有效期至']] },
 { badge: 'ENGINE 02 · RAPIDCOOL™ DATA CENTER THERMAL', title: 'RapidCool™ 直接芯片冷却：把 AI 服务器“热墙”痛点变成新专利池', desc: '单颗 AI GPU 功耗正突破 1,000W–1,500W，传统风冷与常规冷板渐近极限。Adeia 研发的 RapidCool™ 技术通过微通道直接散热方案，无需大幅改造现有机房即可“即插即用（Plug-and-Play）”降低芯片结温，2026 年已面向数据中心与服务器产业链展开商业化验证。', formula: '商业逻辑：瞄准 AI 算力基础设施最紧迫的散热能耗瓶颈，复用半导体大客户渠道交叉销售', gauges: [['即插即用', '兼容现行数据中心机柜架构'], ['>1,000W', '解决 AI 芯片极高热流密度'], ['2026 演示', '已向头部客户展示商用原型'], ['零制造', '延续轻资产 IP 授权变现模式']] },
 { badge: 'ENGINE 03 · OTT STREAMING & AI MEDIA DISCOVERY', title: 'AI 赋能内容发现与个性化：从有线机顶盒全面迁移至全球流媒体巨头', desc: '虽然传统有线电视订户下滑，但全球观众在流媒体平台面临更严重的内容过载，对 AI 个性化推荐、多端续播与沉浸式 UI 的依赖大幅提升。Adeia 先后将 Disney+、YouTube、Paramount+、Peacock 与 TCL 等纳入被许可阵营，推动 OTT 占比向总营收 30%+ 迈进。', formula: '变现双轮：存量 Pay-TV 长约现金牛托底 + 全球 OTT/智能电视厂商增量签约对冲剪线潮', gauges: [['Disney+', '2025.12 达成多年期媒体长约'], ['Charter/TCL', '2026 Q3 顺利续签核心合同'], ['>30%', 'OTT 迈向总营收核心支柱门槛'], ['$400M/年', '媒体业务远期年度营收目标']] },
 { badge: 'ENGINE 04 · E-COMMERCE & SOCIAL MEDIA EXPANSION', title: '数字商务与社交媒体破圈：把媒体发现专利复制到千亿级电商购物场景', desc: '电商平台的商品瀑布流推荐、视觉搜索与社交短视频带货，在底层交互逻辑上与 Adeia 媒体专利高度同构。2026 Q2 Adeia 与 RPX 签署涵盖 10 家电商成员企业的突破性协议，Q3 再签体育电商巨头 Fanatics 及一家社交媒体公司，管理层预计电商业务最终可占总营收约 10%。', formula: '复制路径：以 RPX 联盟批量破冰为杠杆，逐一拓展全球头部电商与社交内容平台', gauges: [['RPX 10企', '2026 Q2 一次性覆盖 10 家电商'], ['Fanatics', '2026 Q3 签下体育电商巨头'], ['~10%', '管理层预期电商占总营收远期比'], ['0 新增硬件', '纯既有专利资产跨赛道变现']] },
 { badge: 'ENGINE 05 · AUTOMOTIVE IP & SOAFEE ECOSYSTEM', title: '汽车智能化与车载算力 IP：Dipti Vachani 带来的全新非对称增长极', desc: '新任 CEO Dipti Vachani 过去 8 年执掌 Arm 汽车业务并创立超 200 家车企/芯片商参与的 SOAFEE 联盟。随着软件定义汽车（SDV）引入高性能 Chiplet 座舱芯片与车内多屏流媒体娱乐，Adeia 有望将其半导体封装与媒体交互专利打包切入汽车供应链。', formula: '管理层协同：Arm 汽车生态人脉 × Adeia 芯片封装与车载娱乐专利池 = 全新汽车长期经常性收入', gauges: [['8年 Arm', 'Vachani 深耕汽车 IP 商业化'], ['200+ 成员', '曾创立 SOAFEE 车载开放联盟'], ['SDV 趋势', '车载算力与多屏娱乐双轮驱动'], ['2027–2030', '汽车授权管线逐步孵化期']] },
 { badge: 'ENGINE 06 · STCO CO-OPTIMIZATION & MICROLED', title: '系统技术协同优化（STCO）与 MicroLED：锁定 2030 年后次世代显示与芯片红利', desc: 'Adeia 推出超越传统工艺节点的 Co-Optimization（电路-工艺-系统协同优化）专利组合，并持续积累 MicroLED 巨量转移与混合键合显示专利，确保在下一代 AR 眼镜与高亮度微显示时代依然占据上游专利收费咽喉。', formula: '长期主义：以每年 ~15% 研发强度保持技术代差，确保 2030–2045 年专利池持续造血', gauges: [['STCO', '电路+工艺+系统三层协同专利'], ['MicroLED', '面向下一代 AR/车载微显示'], ['14,250+', '持续扩容的全球专利资产库'], ['2045.03', '超长生命周期护城河保障']] }
 ];
 document.getElementById('engineRail').addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 var bs = this.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var eg = ENGINES[idx];
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').textContent = eg.title;
 document.getElementById('engDesc').textContent = eg.desc;
 document.getElementById('engFormula').textContent = eg.formula;
 document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) { return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>'; }).join('');
 });

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect();
 var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) {
 var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rr, y);
 ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr);
 ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
 }

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var peers = [
 { name: 'Intel (代工转型)', cap: 34.0, col: pal.red, tip: '晶圆厂重资产扩产，CapEx 占营收常年逾 30%' },
 { name: 'TSMC (先进封装)', cap: 36.0, col: pal.amber, tip: 'CoWoS 与 2nm 晶圆厂极重资本投入' },
 { name: 'Micron (HBM扩产)', cap: 32.0, col: pal.violet, tip: 'HBM 产能建设推高内存厂资本开支强度' },
 { name: 'Arm (纯架构IP)', cap: 4.0, col: pal.blue, tip: '轻资产 IP 模式典型代表 (~3%–5%)' },
 { name: 'Adeia (ADEA)', cap: 0.41, col: pal.green, tip: 'FY2025 CapEx 仅 $1.81M（占营收 0.41%），9M26 仅 0.75%' }
 ];
 var maxC = 42;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(p.cap.toFixed(i === 4 ? 2 : 0) + '%', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '10.5px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' CapEx/营收', body: p.tip });
 });
 } else {
 var steps = [
 { lbl: 'FY26E中枢', v: 395, b: 0, col: pal.blue, tip: 'FY2026 最新指引区间 $375M–$415M 中枢 $395M' },
 { lbl: '+HBM放量', v: 65, b: 395, col: pal.green, tip: 'HBM4/HBM5 混合键合与存储客户放量贡献' },
 { lbl: '+逻辑芯片', v: 75, b: 460, col: pal.violet, tip: 'AMD 爬坡及 Broadcom/Intel/云巨头新签逻辑授权' },
 { lbl: '+OTT/电商', v: 65, b: 535, col: pal.amber, tip: 'OTT、RPX/Fanatics 电商及社交抵消 Pay-TV 并净增' },
 { lbl: '远期目标', v: 600, b: 0, col: pal.green, tip: '管理层 2026 年 11 月重申长期年度营收目标：$600M（$400M 媒体 + $200M 半导体）' }
 ];
 var maxB = 660;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'M', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph, yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col; roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v + 'M', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E'];
 var sRev = [84, 65, 95, 135, 170, 200];
 var sMix = [18.9, 16.5, 21.5, 26.5, 30.5, 33.3];
 var isRev = (state.sView === 'rev');
 var arr = isRev ? sRev : sMix;
 var maxV = isRev ? 230 : 40;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxV / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(isRev ? ('$' + gv + 'M') : (gv + '%'), pad.left - 8, gy + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (arr[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue; roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(isRev ? ('$' + arr[i] + 'M') : (arr[i].toFixed(1) + '%'), x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 半导体业务推演', body: '年营收 ~$' + sRev[i] + 'M（占集团比 ~' + sMix[i].toFixed(1) + '%）' });
 });
 }

 var OPT_DATA = { hbm: { rev: 65, net: 34 }, logic: { rev: 75, net: 40 }, ott: { rev: 50, net: 26 }, cool: { rev: 45, net: 24 }, delev: { rev: 0, net: 22 } };
 var miniCaps = [1.49, 2.55, 5.62];
 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前市值', '2030基础盘', '2030含期权'];
 var maxV = Math.max(6.5, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif'; ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }
 function recalcOptionality() {
 var baseRev = 405, baseNet = 190, sh2030 = 104.5;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) { var d = OPT_DATA[chk.getAttribute('data-opt')]; if (d) { addRev += d.rev; addNet += d.net; } }
 });
 var totRev = baseRev + addRev, totNet = baseNet + addNet;
 var eps = totNet / sh2030, mcapB = (totNet * state.pe) / 1000, baseMcapB = (baseNet * state.pe) / 1000;
 document.getElementById('optRevOut').textContent = '$' + totRev + 'M';
 document.getElementById('optNetOut').textContent = '$' + totNet + 'M';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapB.toFixed(2) + 'B';
 miniCaps = [1.49, baseMcapB, mcapB];
 drawOptMiniCanvas();
 }
 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 document.getElementById('peTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]'); if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 18;
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 recalcOptionality();
 });
 function bindSeg(gid, attr, skey, fn) {
 document.getElementById(gid).addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[skey] = b.getAttribute(attr);
 var bs = this.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 fn();
 });
 }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 ['futureCanvas', 'siliconCanvas'].forEach(function (cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top;
 var arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) { var rg = arr[i]; if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; } }
 if (hit) {
 tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>';
 tip.style.display = 'block'; tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
 } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 });

 function drawAll() { drawFutureCanvas(); drawSiliconCanvas(); drawOptMiniCanvas(); }

 var QITEMS = [
 { id: 'sec-f0', t: 'F0 Vachani 新政与三阶时间窗雷达', s: '前 Arm 高管接任 CEO · 近中远三阶路线图' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'DBI Ultra · RapidCool · OTT/AI · 电商 · 汽车 IP · STCO' },
 { id: 'sec-f2', t: 'F2 轻资产 AI 卖水人与 $600M 营收桥', s: '0.41% CapEx 对比行业 $125B 封装扩产' },
 { id: 'sec-f3', t: 'F3 混合键合从 HBM 迈向逻辑芯片', s: '2025–2030 半导体授权营收爬坡至 $200M' },
 { id: 'sec-f4', t: 'F4 2030 重估市值期权组装器', s: '开关五大催化剂与估值倍数实时测算市值' }
 ];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function renderQ(kw) {
 var q = (kw || '').trim().toLowerCase();
 var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 qIn.addEventListener('focus', function () { renderQ(qIn.value); });
 qIn.addEventListener('input', function () { renderQ(qIn.value); });
 qPop.addEventListener('click', function (e) {
 var jb = e.target.closest('[data-jump]'); if (!jb) return;
 var target = document.querySelector(jb.getAttribute('data-jump'));
 if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
 qPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
 else {
 var c = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
 if (c) document.documentElement.removeAttribute('data-sidebar-collapsed');
 else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 setTimeout(drawAll, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () { applyTheme('light', false); });
 document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false);
 try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]'); if (!lb) return;
 var nl = lb.getAttribute('data-lang'); applyLang(nl, false);
 try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
 });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var url = URL.createObjectURL(new Blob(['<!doctype html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = url; a.download = 'Adeia_Future_Horizon_2030_Blueprint.html'; a.click();
 setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
 showToast('已导出 Adeia_Future_Horizon_2030_Blueprint.html');
 });
 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }, { passive: true });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}
 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 