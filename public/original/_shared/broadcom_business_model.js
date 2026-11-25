
 (function () {
 'use strict';
 var state = { theme: 'dark', lang: 'zh', pView: 'waterfall', cView: 'airamp', kView: 'div' };
 var hits = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

 function showToast(msg) {
 var b = document.getElementById('muiSnackbar');
 if (!b) return;
 b.textContent = msg; b.classList.add('show');
 clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 1800);
 }
 function pal() {
 var d = document.documentElement.getAttribute('data-theme') === 'dark';
 return { d: d, text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', tick: d ? '#94A3B8' : '#475569', grid: d ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: d ? '#3399FF' : '#0073E6', green: d ? '#22C55E' : '#16A34A', violet: d ? '#A78BFA' : '#7C3AED', amber: d ? '#FFB74D' : '#D97706', red: d ? '#FF6B6B' : '#DC2626' };
 }
 function applyTheme(t) {
 state.theme = t === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 drawAll();
 }
 function applyLang(l) {
 state.lang = l === 'en' ? 'en' : 'zh';
 document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) {
 var v = el.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
 if (v) { if (v.indexOf('<span') !== -1) el.innerHTML = v; else el.textContent = v; }
 });
 }

 // Lens switcher
 var LENSES = [
 { f: '事业部准入铁律 = 细分市场份额 #1 或 #2 + 极高客户迁移成本 + 45%+ 营业利润率门槛（不达标即剥离）', b: 'CEO 陈福阳（Hock Tan）只保留具备绝对定价权的“特许经营权（Franchise）”业务：从 Google TPU/Meta MTIA 定制 XPU、超大规模数据中心以太网交换芯片，到 5G 射频 FBAR 滤波器与 VMware 企业虚拟化底座，一旦锁定系统架构便形成长达 5–10 年的替换壁垒。' },
 { f: '综合 Non-GAAP 毛利率 (75.0%) = 半导体 (~76% × 70%权重) + 基础设施软件 (~90%+ × 30%权重) → 营业利润率 67.9%', b: '与传统芯片厂毛利随周期剧烈波动不同，博通不仅通过定制 AI XPU 与 102.4T 交换芯片拿到 ~76% 硬件毛利，还叠加年化逾 $350亿 的 VMware/CA/Symantec 订阅软件底座，使集团营业利润率稳居 66%–68% 的罕见高位。' },
 { f: '现金复利闭环 = 1.8% 极低 CapEx → 46.2% FCF 转化率 ($13.67B/季) → 极速偿还并购债 + 50% FCF 现金分红', b: '博通每次重大并购（Broadcom Corp / CA / Symantec / VMware）均采用适度杠杆融资，随后通过 18 个月外科手术式砍掉冗余 SG&A，释放出的巨额自由现金流在 2–3 年内迅速还清债务并推高季度股息（连续 15 年增长至 $0.65/股）。' }
 ];
 document.getElementById('lensTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lens]'); if (!b) return;
 var i = parseInt(b.getAttribute('data-lens'), 10);
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.getElementById('lensFormula').textContent = LENSES[i].f;
 document.getElementById('lensBody').textContent = LENSES[i].b;
 });

 // Pipeline switcher
 var NODES = [
 { b: 'NODE 01 · SERDES, OPTICS & 3.5D PACKAGING MOAT', t: '底层互连技术霸权：掌控 AI 集群“算力血管”与前沿混合键合封装', d: '当超大规模云厂商（Hyperscalers）试图自研 AI 芯片以摆脱通用 GPU 税时，真正的工程瓶颈并非逻辑算子，而是高速 SerDes 接口、HBM 内存控制器、UCIe 芯粒互连与台积电 3.5D 先进封装协同。博通凭借 200G/400G-per-lane SerDes 与光学 DSP 绝对领先优势，成为 Google、Meta 等巨头唯一可信赖的协同设计（Co-Design）伙伴。', f: '商业传导：全栈基础 IP 复用 + 仅面向前 5 大云巨头大客户接单 → 研发 ROI 极高，避免消费电子碎片化低效投入', k: [['73%', 'Q3 AI 营收中 XPU 占比'], ['102.4 Tbps', 'Tomahawk 6 全球首款量产带宽'], ['1.8%', 'Q3 FY26 CapEx / 总营收比'], ['57%', '3.3万员工中研发工程占比']] },
 { b: 'NODE 02 · HYPERSCALER CO-DESIGN & ETHERNET FABRIC', t: '算力与网络双轮锁死：用定制 XPU + 开放以太网瓦解封闭壁垒', d: '博通不与客户争夺云服务或大模型生意，而是帮客户以低于通用 GPU 约 40%–50% 的 TCO 打造专属算力，同时将 Tomahawk 6 与 Jericho4 交换芯片深度绑定进 AI 集群的 Scale-Up 与 Scale-Out 网络中，Q3 FY26 AI 半导体收入同比大涨 +221% 至 $167亿。', f: '商业传导：XPU 芯片出货同比 +3.5 倍 × AI 网络芯片同比 +2.5 倍 → Q4 指引 AI 营收再跃升至 $217亿', k: [['$16.7B', 'Q3 FY26 AI 半导体营收'], ['+221% YoY', 'Q3 AI 业务同比增速'], ['$21.7B', 'Q4 FY26 AI 营收官方指引'], ['60%–80%', '全球 AI-ASIC 市场主导份额']] },
 { b: 'NODE 03 · 24 AUTONOMOUS DIVISIONS + ULTRA-LEAN SG&A', t: '24 个独立损益表事业部：用极端财务纪律压榨出 1.8% 超低 SG&A 费率', d: '博通全公司划分为 24 个在各自细分市场排名第一或第二的半导体与软件事业部，每位总经理独立背负直属费用与 P&L 指标；同时销售与行政费用（Non-GAAP SG&A）被压缩至仅占总营收 1.84%（Q3 仅 $5.45亿），拒绝任何不产生直接毛利的行政膨胀。', f: '商业传导：聚焦核心大客户直供 + 极简中后台 → Non-GAAP 营业利润率高达 67.9%（较多数软件巨头更高）', k: [['24个', '细分市场 #1/#2 事业部'], ['1.84%', 'Q3 Non-GAAP SG&A 占营收比'], ['67.9%', 'Q3 Non-GAAP 营业利润率'], ['$3.21M', 'FY26E 隐含人均年创收']] },
 { b: 'NODE 04 · VMWARE CLOUD FOUNDATION (VCF) TOLLBOOTH', t: '软件收租飞轮：把 VMware 从低效永久授权改造为 70% 营业利润率年金', d: '2023 年底完成 VMware 并购后，博通砍掉数千个冗余 SKU、剥离非核心终端计算业务（EUC），将产品收敛为统一的订阅制 VMware Cloud Foundation (VCF) 私有云全栈平台，18 个月内将软件营业利润率拉升至 ~70% 区间，Q3 贡献 $87.5亿高确定性现金流。', f: '商业传导：企业核心虚拟化迁移成本极高 → 全面转向 3–5 年订阅合同 → 为高成长芯片业务提供稳健估值锚', k: [['$8.75B', 'Q3 基础设施软件营收 (+29%)'], ['~70%+', '软件分部营业利润率水平'], ['VCF', '全栈私有云 + AI ReadyNodes'], ['30%', '软件占 Q3 总营收稳定性底座']] },
 { b: 'NODE 05 · 46% FCF MARGIN, DELEVERAGING & DIVIDEND', t: '金融工程级的资本复利：单季 $136.7亿 自由现金流极速还债并派息', d: '依托极轻的晶圆代工模式，博通 Q3 仅投入 $5.32亿 资本开支便收割 $136.65亿 自由现金流（占营收 46.2%）。管理层将庞大现金流用于偿还 VMware 并购债务（总债务 9 个月内压降逾 $57亿至 $594亿）与连续 15 年提升现金分红。', f: '商业传导：并购加杠杆买垄断 → 精益运营释放 46% FCF → 2–3 年还清债务 → 回购与分红（$2.60/年）', k: [['$13.67B', 'Q3 FY26 自由现金流 (+95%)'], ['46.2%', 'Q3 自由现金流利润率'], ['$59.4B', '总债务较 FY25 年底再降 $5.7B'], ['$0.65/季', '季度现金股息 (连续15年上调)']] }
 ];
 document.getElementById('pipelineTrack').addEventListener('click', function (e) {
 var b = e.target.closest('[data-node]'); if (!b) return;
 var i = parseInt(b.getAttribute('data-node'), 10);
 this.querySelectorAll('.bm-node-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var nd = NODES[i];
 document.getElementById('nodeBadge').textContent = nd.b;
 document.getElementById('nodeTitle').textContent = nd.t;
 document.getElementById('nodeDesc').textContent = nd.d;
 document.getElementById('nodeFormula').textContent = nd.f;
 document.getElementById('nodeKpis').innerHTML = nd.k.map(function (x) { return '<div class="bm-ins-card"><b class="mono">' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
 });

 // Tier & Peer filters
 document.getElementById('tierFilter').addEventListener('click', function (e) {
 var b = e.target.closest('[data-tcat]'); if (!b) return;
 var c = b.getAttribute('data-tcat');
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.querySelectorAll('#tierList [data-tier]').forEach(function (el) { el.style.display = (c === 'all' || el.getAttribute('data-tier') === c) ? '' : 'none'; });
 });
 document.getElementById('peerFilter').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pcat]'); if (!b) return;
 var c = b.getAttribute('data-pcat');
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.querySelectorAll('#peerTable tbody tr').forEach(function (r) { var rc = r.getAttribute('data-row-cat') || ''; r.style.display = (c === 'all' || rc.indexOf(c) !== -1) ? '' : 'none'; });
 });

 // Cohort switcher
 var COHORTS = {
 oem: { s: [['典型采购组合', 'FBAR 射频 + Wi-Fi/BT + 存储控制', '旗舰消费电子与服务器标配'], ['单代绑定周期', '3–5 年', '专利与供应链良率双认证'], ['毛利率特征', '~62%–68%', '稳健高现金流成熟板块'], ['战略定位', '成熟现金奶牛', '反哺 AI 前沿研发与并购偿债']], n: '<strong>特许射频与连接壁垒：</strong>即便面临苹果等大客户部分组件自研，博通的 FBAR 薄膜体声波滤波器与企业级 RAID/PCIe 交换芯片仍占据高端市场绝对主导份额，无需巨额增量 CapEx。' },
 ent: { s: [['典型采购组合', 'VMware Cloud Foundation (VCF)', '全栈虚拟化 + 软件定义网络/存储'], ['合同绑定周期', '3–5 年订阅', '彻底告别永久授权买断'], ['分部营收体量', '$8.75B / 季 (+29%)', '年化逾 $350亿 经常性收入'], ['分部营业利润率', '~70%+', '堪比顶级纯 SaaS 巨头']], n: '<strong>企业私有云房产税：</strong>全球数万家金融、电信与制造巨头的生产级虚拟机深度运行在 ESXi/vSAN 之上，全面迁移架构的风险远高于订阅费涨价，形成极高续费确定性。' },
 hyper: { s: [['典型采购组合', '3.5D XPU + Tomahawk 6 + DSP', '计算与网络全栈耦合'], ['单代绑定周期', '5–8 年', '跨 3–4 代硅片演进路线图'], ['单客户年化贡献', '$5B–$20B+', '极度聚焦前 5–7 家头部买家'], ['半导体营业利润率', '61.0%', 'Q3 FY26 同比提升 +440bps']], n: '<strong>架构共研锁死效应：</strong>当超大规模云厂商将自家 AI 模型编译器与博通定制 XPU 微架构及 Tomahawk 拥塞控制算法深度对齐后，切换至第二家 ASIC 设计商意味着重做底层软硬栈并损失 12–18 个月算力代差。' }
 };
 document.getElementById('cohortTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-cohort]'); if (!b) return;
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var c = COHORTS[b.getAttribute('data-cohort')];
 document.getElementById('cohortMetrics').innerHTML = c.s.map(function (x, idx) {
 return '<div class="bm-cohort-stat"><div class="lbl">' + x[0] + '</div><div class="val' + (idx > 0 ? ' mono' : '') + '"' + (idx === 0 ? ' style="font-size:0.93rem;"' : '') + '>' + x[1] + '</div><div class="delta">' + x[2] + '</div></div>';
 }).join('');
 document.getElementById('cohortNote').innerHTML = c.n;
 });

 // Canvas helpers
 function prep(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(260, r.width || 480), h = Math.max(140, r.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function rr(ctx, x, y, w, h, r) {
 var rad = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.arcTo(x + w, y, x + w, y + h, rad); ctx.arcTo(x + w, y + h, x, y + h, rad); ctx.arcTo(x, y + h, x, y, rad); ctx.arcTo(x, y, x + w, y, rad); ctx.closePath();
 }

 function drawProfit() {
 var e = prep('profitCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.profitCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.pView === 'waterfall') {
 var steps = [
 { l: '半导体营收', v: 20.84, b: 0, c: p.blue, t: 'Q3 FY26 半导体营收 $20.84B (+127% YoY)，其中 AI 半导体 $16.7B' },
 { l: '+软件营收', v: 8.75, b: 20.84, c: p.green, t: 'Q3 FY26 基础设施软件 $8.75B (+29% YoY)，合计总营收 $29.59B' },
 { l: 'Non-GAAP毛利', v: 22.19, b: 0, c: p.violet, t: 'Q3 Non-GAAP 毛利 $22.19B（综合毛利率 75.0%）' },
 { l: 'Non-GAAP营业利', v: 20.10, b: 0, c: p.blue, t: 'Non-GAAP 营业利润 $20.10B（营业利润率 67.9%，SG&A 仅 $0.55B）' },
 { l: 'Non-GAAP净利', v: 16.37, b: 0, c: p.amber, t: 'Non-GAAP 净利润 $16.37B (+95% YoY)，稀释 EPS $3.32' },
 { l: '自由现金流FCF', v: 13.67, b: 0, c: p.green, t: 'Q3 自由现金流 $13.67B（占营收 46.2%，CapEx 仅 $0.53B）' }
 ];
 var maxV = 33;
 for (var g = 0; g <= 3; g++) { var gv = (maxV / 3) * g, gy = pad.top + ph - (g / 3) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4); }
 var sw = pw / steps.length, bw = Math.min(46, sw * 0.56);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sw + (sw - bw) / 2, yt = pad.top + ph - ((s.b + s.v) / maxV) * ph, yb = pad.top + ph - (s.b / maxV) * ph, bh = Math.max(4, yb - yt);
 ctx.fillStyle = s.c; rr(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + s.v.toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = p.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(s.l, x + bw / 2, pad.top + ph + 20);
 hits.profitCanvas.push({ x: x, y: yt, w: bw, h: bh, title: s.l, body: s.t });
 });
 } else {
 var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'Q3 FY26'];
 var gm = [74.5, 75.6, 74.7, 76.5, 78.6, 75.0];
 var om = [58.0, 61.1, 61.8, 59.6, 65.7, 67.9];
 var minM = 45, maxM = 85;
 for (var m = 0; m <= 4; m++) { var mv = minM + ((maxM - minM) / 4) * m, my = pad.top + ph - (m / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(mv.toFixed(0) + '%', pad.left - 8, my + 4); }
 function plot(arr, col, lbl) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) { var px = pad.left + (idx / 5) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph; if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - ((v - minM) / (maxM - minM)) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(v.toFixed(1) + '%', px, py - 8);
 hits.profitCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + lbl, body: v.toFixed(1) + '%' });
 });
 }
 yrs.forEach(function (y, idx) { var px = pad.left + (idx / 5) * pw; ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(y, px, pad.top + ph + 20); });
 plot(gm, p.green, 'Non-GAAP 毛利率');
 plot(om, p.blue, 'Non-GAAP 营业利润率');
 }
 }

 function drawCohort() {
 var e = prep('cohortCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.cohortCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.cView === 'airamp') {
 var lbls = ['FY23', 'FY24', 'FY25', 'Q1 26', 'Q2 26', 'Q3 26', 'Q4 26E'];
 var vals = [3.8, 12.2, 20.2, 8.4, 10.8, 16.7, 21.7];
 var maxV = 25;
 for (var g = 0; g <= 4; g++) { var gv = (maxV / 4) * g, gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4); }
 var sw = pw / lbls.length, bw = Math.min(38, sw * 0.56);
 lbls.forEach(function (lb, i) {
 var x = pad.left + i * sw + (sw - bw) / 2, bh = (vals[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? p.violet : p.blue; if (i === 6) ctx.fillStyle = p.green;
 rr(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + vals[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = p.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.fillText(lb, x + bw / 2, pad.top + ph + 20);
 hits.cohortCanvas.push({ x: x, y: yt, w: bw, h: bh, title: lb + ' AI 半导体营收', body: '$' + vals[i].toFixed(1) + 'B（前三柱为财年全年，后四柱为 FY26 单季加速轨迹）' });
 });
 } else {
 var segs = [{ n: 'Semiconductor (Q3)', gm: 76.0, om: 61.0, c: p.blue }, { n: 'Infra Software (VCF)', gm: 90.0, om: 70.0, c: p.green }, { n: 'Broadcom Consolidated', gm: 75.0, om: 67.9, c: p.violet }];
 var slot = pw / 3;
 for (var k = 0; k <= 4; k++) { var kv = k * 25, ky = pad.top + ph - (k / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(kv + '%', pad.left - 8, ky + 4); }
 segs.forEach(function (s, idx) {
 var cx = pad.left + idx * slot + slot / 2, bw = 34, gh = (s.gm / 100) * ph, oh = (s.om / 100) * ph;
 ctx.fillStyle = p.grid; rr(ctx, cx - bw - 4, pad.top + ph - gh, bw, gh, 5); ctx.fill();
 ctx.fillStyle = s.c; rr(ctx, cx + 4, pad.top + ph - oh, bw, oh, 5); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(s.gm + '%', cx - bw / 2 - 4, pad.top + ph - gh - 6); ctx.fillText(s.om + '%', cx + bw / 2 + 4, pad.top + ph - oh - 6);
 ctx.fillStyle = p.sub; ctx.font = '600 11px sans-serif'; ctx.fillText(s.n, cx, pad.top + ph + 20);
 hits.cohortCanvas.push({ x: cx - bw - 6, y: pad.top, w: bw * 2 + 12, h: ph, title: s.n, body: '毛利率 ~' + s.gm + '% · 营业利润率 ~' + s.om + '%' });
 });
 }
 }

 function drawCapital() {
 var e = prep('capitalCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.capitalCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.kView === 'div') {
 var yrs = ['FY18', 'FY20', 'FY22', 'FY24', 'FY25', 'FY26'];
 var div = [0.70, 1.30, 1.64, 2.105, 2.36, 2.60];
 var maxD = 3.0;
 for (var g = 0; g <= 3; g++) { var gv = (maxD / 3) * g, gy = pad.top + ph - (g / 3) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv.toFixed(1), pad.left - 8, gy + 4); }
 var sw = pw / yrs.length, bw = Math.min(38, sw * 0.56);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sw + (sw - bw) / 2, bh = (div[i] / maxD) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 5 ? p.green : p.blue; rr(ctx, x, yt, bw, bh, 5); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + div[i].toFixed(2), x + bw / 2, yt - 6);
 ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.capitalCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 拆股调整后每股年股息', body: '$' + div[i].toFixed(2) + ' / 股（自 FY11 以来连续 15 年上调）' });
 });
 } else {
 var dyrs = ['FY24初(并购后)', 'FY24末', 'FY25末', 'Q3 FY26'];
 var debt = [73.5, 67.6, 65.1, 59.4];
 var maxDt = 85;
 for (var k = 0; k <= 4; k++) { var kv = (maxDt / 4) * k, ky = pad.top + ph - (k / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv.toFixed(0) + 'B', pad.left - 8, ky + 4); }
 var sw2 = pw / dyrs.length, bw2 = Math.min(48, sw2 * 0.5);
 dyrs.forEach(function (y, i) {
 var x = pad.left + i * sw2 + (sw2 - bw2) / 2, bh = (debt[i] / maxDt) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 3 ? p.green : p.amber; rr(ctx, x, yt, bw2, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + debt[i].toFixed(1) + 'B', x + bw2 / 2, yt - 6);
 ctx.fillStyle = p.sub; ctx.font = '600 10.5px sans-serif'; ctx.fillText(y, x + bw2 / 2, pad.top + ph + 20);
 hits.capitalCanvas.push({ x: x, y: yt, w: bw2, h: bh, title: y + ' 总有息债务', body: '$' + debt[i].toFixed(1) + 'B（依靠 46% 自由现金流率快速去杠杆）' });
 });
 }
 }

 var simEps = [11.05, 13.5, 16.2, 19.3, 22.6, 25.95];
 function drawSim() {
 var e = prep('simMiniCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal();
 var pad = { top: 22, right: 18, bottom: 26, left: 44 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY26E', 'FY27E', 'FY28E', 'FY29E', 'FY30E', 'FY31E'];
 var maxE = Math.max(30, Math.ceil(Math.max.apply(null, simEps) * 1.15));
 ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 ctx.strokeStyle = p.blue; ctx.lineWidth = 2.6; ctx.beginPath();
 simEps.forEach(function (v, i) { var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 simEps.forEach(function (v, i) {
 var px = pad.left + (i / 5) * pw, py = pad.top + ph - (v / maxE) * ph;
 ctx.fillStyle = i === 5 ? p.green : p.blue; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + v.toFixed(2), px, py - 8);
 ctx.fillStyle = p.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.fillText(yrs[i], px, pad.top + ph + 16);
 });
 }
 function runSim() {
 var gA = parseFloat(document.getElementById('inpAiCagr').value) / 100;
 var gS = parseFloat(document.getElementById('inpSoftCagr').value) / 100;
 var buy = parseFloat(document.getElementById('inpBuyRate').value) / 100;
 document.getElementById('lblAiCagr').textContent = (gA * 100).toFixed(1) + '%';
 document.getElementById('lblSoftCagr').textContent = (gS * 100).toFixed(1) + '%';
 document.getElementById('lblBuyRate').textContent = (buy * 100).toFixed(1) + '%';
 var ai = 57.6, nonAi = 15.0, soft = 33.3, sh = 4.94;
 var baseOp = (ai + nonAi) * 0.61 + soft * 0.70; // ~67.6B
 var arr = [11.05];
 for (var y = 1; y <= 5; y++) {
 ai *= (1 + gA); nonAi *= 1.03; soft *= (1 + gS); sh *= (1 - buy);
 var op = (ai + nonAi) * 0.60 + soft * 0.72;
 var net = 54.6 * (op / baseOp);
 arr.push(net / sh);
 }
 var rev31 = ai + nonAi + soft, eps31 = arr[5], cagr = (Math.pow(eps31 / 11.05, 0.2) - 1) * 100;
 document.getElementById('simRevOut').textContent = '$' + Math.round(rev31) + 'B';
 document.getElementById('simAiOut').textContent = '$' + Math.round(ai) + 'B';
 document.getElementById('simEpsOut').textContent = '$' + eps31.toFixed(2);
 document.getElementById('simCagrOut').textContent = '+' + cagr.toFixed(1) + '%';
 simEps = arr; drawSim();
 }
 ['inpAiCagr', 'inpSoftCagr', 'inpBuyRate'].forEach(function (id) { document.getElementById(id).addEventListener('input', runSim); });
 var PRE = { bear: [14, 5, 1.0], base: [26, 10, 1.6], bull: [34, 13, 2.2] };
 document.getElementById('simPresets').addEventListener('click', function (e) {
 var b = e.target.closest('[data-preset]'); if (!b) return;
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 var p = PRE[b.getAttribute('data-preset')];
 document.getElementById('inpAiCagr').value = p[0]; document.getElementById('inpSoftCagr').value = p[1]; document.getElementById('inpBuyRate').value = p[2];
 runSim();
 });

 function bindTab(gid, attr, sk, fn) {
 document.getElementById(gid).addEventListener('click', function (e) {
 var b = e.target.closest('[' + attr + ']'); if (!b) return;
 state[sk] = b.getAttribute(attr);
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 fn();
 });
 }
 bindTab('pChartTabs', 'data-pview', 'pView', drawProfit);
 bindTab('cChartTabs', 'data-cview', 'cView', drawCohort);
 bindTab('kChartTabs', 'data-kview', 'kView', drawCapital);

 ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(function (cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) if (mx >= arr[i].x && mx <= arr[i].x + arr[i].w && my >= arr[i].y && my <= arr[i].y + arr[i].h) { hit = arr[i]; break; }
 if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 295, ev.clientX + 14) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
 else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 });

 function drawAll() { drawProfit(); drawCohort(); drawCapital(); drawSim(); }

 // Quick Jump & Chrome
 var Q = [{ id: 'mod-deck', t: 'M0 双栏指挥舱与核心公式', s: 'Q3 $29.59B 营收 · 75% 毛利 · 46.2% FCF' }, { id: 'mod-pipeline', t: 'M1 五阶价值链传导沙盘', s: 'SerDes IP → 定制 XPU → 24事业部 → VCF → 并购复利' }, { id: 'mod-profit-pool', t: 'M2 利润池瀑布流与特许拆解', s: 'Non-GAAP 营业利润率 67.9% · 四大垄断池' }, { id: 'mod-cohort', t: 'M3 客户经济模型与 AI 跃迁', s: 'AI 半导体 +221% YoY · XPU 占比 73%' }, { id: 'mod-capital', t: 'M4 去杠杆与 5 年 EPS 推演器', s: '债务压降至 $59.4B · 15年连续派息' }, { id: 'mod-matrix', t: 'M5 巨头范式对标与风险压测', s: 'AVGO vs NVDA / AAPL / MRVL / ORCL / MSFT' }];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function rQ(kw) {
 var q = (kw || '').trim().toLowerCase(), m = Q.filter(function (x) { return !q || (x.t + x.s).toLowerCase().indexOf(q) !== -1; });
 qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join('');
 qPop.classList.toggle('open', m.length > 0);
 }
 qIn.addEventListener('focus', function () { rQ(qIn.value); });
 qIn.addEventListener('input', function () { rQ(qIn.value); });
 qPop.addEventListener('click', function (e) { var b = e.target.closest('[data-jump]'); if (!b) return; document.querySelector(b.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth < 1024) { var o = document.getElementById('muiSidebar').classList.toggle('open'); document.getElementById('drawerBackdrop').classList.toggle('open', o); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.getElementById('muiSidebar').classList.remove('open'); this.classList.remove('open'); });
 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark'); showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至浅色模式'); });
 document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light'); });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark'); });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var b = e.target.closest('[data-lang]'); if (b) applyLang(b.getAttribute('data-lang')); });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Broadcom_Business_Model_Analysis.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出 Broadcom_Business_Model_Analysis.html');
 });
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 90); });
 runSim(); drawAll();
 })();
 