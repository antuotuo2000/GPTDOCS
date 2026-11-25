
 (function () {
 'use strict';
 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'ai', pe: 30 };
 var hits = { futureCanvas: [], siliconCanvas: [] };
 function showToast(m) { var b = document.getElementById('muiSnackbar'); b.textContent = m; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 1800); }
 function pal() {
 var d = document.documentElement.getAttribute('data-theme') === 'dark';
 return { text: d ? '#F3F6F9' : '#0F1924', sub: d ? '#B2BAC2' : '#334155', tick: d ? '#94A3B8' : '#475569', grid: d ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', blue: d ? '#3399FF' : '#0073E6', violet: d ? '#A78BFA' : '#7C3AED', green: d ? '#22C55E' : '#16A34A', amber: d ? '#FFB74D' : '#D97706', red: d ? '#FF6B6B' : '#DC2626' };
 }
 function prep(id) {
 var c = document.getElementById(id); if (!c) return null;
 var r = c.getBoundingClientRect(), w = Math.max(260, r.width || 480), h = Math.max(135, r.height || 260), dpr = Math.min(window.devicePixelRatio || 1, 2);
 c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function rr(ctx, x, y, w, h, r) {
 var rad = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
 ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.arcTo(x + w, y, x + w, y + h, rad); ctx.arcTo(x + w, y + h, x, y + h, rad); ctx.arcTo(x, y + h, x, y, rad); ctx.arcTo(x, y, x + w, y, rad); ctx.closePath();
 }

 var HZ = [
 { b: 'HORIZON 1 · 百万卡集群与 TH6 放量期 (2026–2027)', t: 'Q4 AI 营收冲向 $21.7B × Tomahawk 6 全面铺货 × 3.5D XPU 爬坡', l: ['<strong>Q4 FY26 加速：</strong>AI 半导体单季预计达 $21.7B (+236% YoY)，全年 AI 营收突破 $57B+。', '<strong>Tomahawk 6 交付：</strong>102.4 Tbps 交换芯片规模放量，支撑 200G/lane PAM4 铜缆与光互连。', '<strong>VMware VCF 转化：</strong>存量永久授权客户全面续签为 VCF 全栈订阅，软件营业利润率站稳 70%+。'], p: '兑现确定性：极高 (90%+)', im: 'AI 年化营收：~$58B–$85B' },
 { b: 'HORIZON 2 · 3.5D 生态扩圈与 CPO 拐点期 (2028–2029)', t: '新增 AI 大客户量产 × 200G/400G 光互连爆发 × 债务彻底清零级降档', l: ['<strong>XPU 客户扩容：</strong>从既有 3 家核心巨头扩展至 5–7 家超大规模云与 AI 实验室进入规模交付。', '<strong>Davisson CPO 商用：</strong>102.4T 共封装光学与 400G/lane 光 DSP 成为大型训练集群标准配置。', '<strong>资本释放：</strong>VMware 并购债务降至低位，年化逾 $60B 自由现金流全面转向回购与新特许并购。'], p: '兑现确定性：高 (78%)', im: 'AI 年化营收：~$90B–$120B' },
 { b: 'HORIZON 3 · 2030 $120B PSU 终局与后万亿时代 (2030–2032)', t: 'Ultra Ethernet 统治开放 AI 互连 × 企业主权私有云 VCF 全面渗透', l: ['<strong>冲击 $120B AI 里程碑：</strong>若达成 Hock Tan FY2030 PSU 最高门槛，博通 AI 营收将比肩甚至超越早期云巨头。', '<strong>Scale-Up 以太网：</strong>以开放协议全面渗透机柜内芯片间高速互连，切入千亿美元级互连新市场。', '<strong>百亿美元级软件二期并购：</strong>借超级资产负债表吸收下一代企业基础设施软件垄断资产。'], p: '兑现确定性：中长期期权 (60%+)', im: '总营收蓝图：~$250B–$300B+' }
 ];
 document.getElementById('hzTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]'); if (!b) return;
 var h = HZ[parseInt(b.getAttribute('data-hz'), 10)];
 this.querySelectorAll('.ft-hz-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.getElementById('hzBadge').textContent = h.b;
 document.getElementById('hzTitle').textContent = h.t;
 document.getElementById('hzList').innerHTML = h.l.map(function (t) { return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>'; }).join('');
 document.getElementById('hzProb').textContent = h.p;
 document.getElementById('hzImpact').textContent = h.im;
 });

 var ENG = [
 { b: 'ENGINE 01 · 3.5D CUSTOM AI XPU CO-DESIGN', t: '3.5D Face-to-Face 封装 XPU：用定制算力帮云巨头砍掉 40%–50% 推理成本', d: '随着大模型重心从预训练转向万亿次推理与多模态 Agent，云巨头绝不甘心长期被单一通用 GPU 厂商拿走 75% 毛利。博通联合 Google、Meta、ByteDance 及新兴前沿 AI 实验室，利用 3.5D 混合键合与多 HBM4 堆叠，在每代制程上以“专属赛车”取代通用“山地车”。', f: '变现双轮：(1) 单颗 XPU 面积与 HBM 价值量倍增拉高 ASP + (2) 客户从 3 家扩至 5–7 家形成十年锁量订单', g: [['+3.5x YoY', 'Q3 FY26 XPU 出货量激增'], ['60%–80%', 'AI-ASIC 市场绝对主导份额'], ['3.5D F2F', '领先行业的立体晶粒堆叠'], ['-45% TCO', '相比通用 GPU 的推理能耗比']] },
 { b: 'ENGINE 02 · TOMAHAWK 6 & DAVISSON CPO', t: 'Tomahawk 6 与共封装光学 (CPO)：百万卡级开放 AI 网络的心脏', d: '2026 年 3 月博通率先量产全球首款 102.4 Tbps 以太网交换芯片 Tomahawk 6，将单芯片带宽在 Tomahawk 5 基础上直接翻倍，并推出第三代共封装光学开关 Davisson，用低功耗光互连打通大规模分布式训练的通信瓶颈。', f: '变现逻辑：单集群交换层级从 2 层扩至 3 层 + CPO 单端口 ASP 跃升 → AI 网络营收同比 +2.5 倍以上', g: [['102.4 Tbps', 'Tomahawk 6 行业最高带宽'], ['2.0x', '相比上一代 Tomahawk 5 翻倍'], ['1,024×100G', '单芯片超高密度 SerDes 接口'], ['3rd Gen CPO', 'Davisson 突破可插拔光模块能耗']] },
 { b: 'ENGINE 03 · 200G/400G OPTICAL DSP & SERDES', t: '200G/400G 光电互连 DSP 与 PAM4 物理层：每一条光纤的必交过路费', d: '在数据中心迈向 800G / 1.6T / 3.2T 光模块时代，连接 GPU/XPU 与交换机的光模块内部核心电芯片（PAM4 DSP、Driver、TIA）几乎被博通与极少数对手垄断，享受极高毛利且不区分客户使用哪种算力卡。', f: '变现逻辑：AI 集群光口密度随卡数呈超线性增长（1:4 至 1:8 光模块配比），DSP 出货量随集群扩张倍增', g: [['200G/400G', '单通道 PAM4 SerDes 领先代差'], ['1.6T → 3.2T', '光模块升级周期单价跃升'], ['全生态通吃', '同时服务 GPU 与 XPU 集群'], ['>70% GM', '高速模拟与混合信号极高壁垒']] },
 { b: 'ENGINE 04 · VMWARE VCF PRIVATE AI CLOUD', t: 'VMware Cloud Foundation (VCF)：把企业私有云打造为“主权 AI 操作系统”', d: '并非所有金融、医疗与政府核心数据都能上传公有云。博通通过 VCF AI ReadyNodes 认证体系，将 NVIDIA GPU 与定制 AI 加速卡统一纳入 VMware 虚拟化调度底座，让全球 500 强直接在本地安全数据中心运行企业级私有大模型。', f: '变现逻辑：3–5 年全栈订阅合同 + 跨主机安全/网络（NSX/vSAN）交叉增购 → 年化逾 $350亿 稳定软件底盘', g: [['$8.75B/季', 'Q3 基础设施软件营收 (+29%)'], ['~70%+ OM', '行业顶尖企业软件营业利润率'], ['AI ReadyNodes', '兼容 CPU/GPU/XPU 混合调度'], ['90%+ 续费', 'Fortune 500 核心生产工作负载']] },
 { b: 'ENGINE 05 · SCALE-UP ETHERNET VS NVLINK', t: 'Scale-Up 纵向扩展新战线：用 Tomahawk Ultra 与 PCIe 7 切入机柜内互连', d: '过去以太网主要负责机柜间 Scale-Out 通信，机柜内卡间高速互连则被专有协议垄断。博通正以 Tomahawk Ultra、Jericho4 与超低延迟 RoCEv2 以太网架构配合 PCIe Gen6/7 交换芯片，正面切入百亿级 Scale-Up 机柜内互联市场。', f: '变现逻辑：把原本属于专有封闭协议的机柜内部互连价值量，转化为开放标准以太网交换硅片新增量', g: [['Jericho4', '深度缓存广域与多集群互连'], ['<微秒级', 'AI 尾部延迟优化拥塞控制'], ['Ultra Ethernet', '行业开放联盟标准制定核心'], ['PCIe Gen6/7', '服务器内部交换芯片市占第一']] },
 { b: 'ENGINE 06 · NEXT-GEN FRANCHISE M&A', t: '2028+ 资本配置终极期权：还清 VMware 债务后的下一场百亿级并购', d: '陈福阳过去 20 年凭借 Avago → LSI → Broadcom → Brocade → CA → Symantec → VMware 缔造了年化逾 40% 的复合回报。随着每年逾 $50B–$60B 自由现金流迅速压低净杠杆，博通将在 2028 年前后再度拥有千亿美元级并购弹药。', f: '筛选铁律：细分行业前二垄断地位 + 高客户迁移成本 + 具备将 SG&A 砍半并翻倍提升营业利润率的改造空间', g: [['~40% CAGR', '2006 IPO 以来历史复利回报'], ['18 个月', '并购后利润率翻倍典型改造期'], ['~$59.4B', '总债务已较 FY25 再降 $5.7B'], ['2028+ 窗口', '净现金转正后的新一轮资本扩张']] }
 ];
 document.getElementById('engineRail').addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]'); if (!b) return;
 var eg = ENG[parseInt(b.getAttribute('data-eng'), 10)];
 this.querySelectorAll('.ft-rail-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 document.getElementById('engBadge').textContent = eg.b; document.getElementById('engTitle').textContent = eg.t;
 document.getElementById('engDesc').textContent = eg.d; document.getElementById('engFormula').textContent = eg.f;
 document.getElementById('engGauges').innerHTML = eg.g.map(function (x) { return '<div class="ft-gauge-card"><b class="mono">' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
 });

 function drawFuture() {
 var e = prep('futureCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 if (state.fView === 'capex') {
 var ps = [{ n: 'Amazon', v: 102, c: p.amber, t: 'AWS 与履约重资本投入' }, { n: 'Microsoft', v: 86, c: p.blue, t: 'Azure AI 数据中心重度扩建' }, { n: 'Alphabet', v: 75, c: p.violet, t: 'TPU 集群与云基础设施投入' }, { n: 'Meta', v: 66, c: p.red, t: 'AI 训练集群巨额资本开支' }, { n: 'Broadcom', v: 2.0, c: p.green, t: 'FY26E 年化 CapEx 仅 ~$2.0B（占营收 1.8%），极致 Fabless 轻资产卖水人！' }];
 var maxC = 115;
 for (var g = 0; g <= 4; g++) { var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4); }
 var sw = pw / 5, bw = Math.min(44, sw * 0.56);
 ps.forEach(function (x, i) {
 var px = pad.left + i * sw + (sw - bw) / 2, bh = Math.max(6, (x.v / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = x.c; rr(ctx, px, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + x.v + 'B', px + bw / 2, yt - 6);
 ctx.fillStyle = i === 4 ? p.green : p.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.fillText(x.n, px + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: px, y: yt, w: bw, h: bh, title: x.n + ' 年度资本开支', body: x.t });
 });
 } else {
 var st = [{ l: 'FY26E基准', v: 105.9, b: 0, c: p.blue, t: 'FY26E 隐含营收 ~$105.9B (9M $71.1B + Q4 指引 $34.8B)' }, { l: '+3.5D XPU扩圈', v: 72.0, b: 105.9, c: p.violet, t: '3.5D 定制 XPU 与新AI实验室客户放量贡献 +$72B' }, { l: '+102.4T/CPO网络', v: 38.0, b: 177.9, c: p.green, t: 'Tomahawk 6/7、CPO 与 400G 光 DSP 贡献 +$38B' }, { l: '+VCF软件复利', v: 24.0, b: 215.9, c: p.amber, t: 'VMware VCF 订阅与企业 AI 节点复利贡献 +$24B' }, { l: '+外延特许并购', v: 25.0, b: 239.9, c: p.green, t: '去杠杆后下一代特许软件/芯片并购期权 +$25B' }, { l: 'FY32E蓝图', v: 264.9, b: 0, c: p.blue, t: 'FY2032E 远期营收蓝图 ~$265B（Non-GAAP 净利破 $130B）' }];
 var maxB = 290;
 for (var k = 0; k <= 4; k++) { var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4); }
 var sw2 = pw / st.length, bw2 = Math.min(44, sw2 * 0.56);
 st.forEach(function (s, i) {
 var x = pad.left + i * sw2 + (sw2 - bw2) / 2, yt = pad.top + ph - ((s.b + s.v) / maxB) * ph, yb = pad.top + ph - (s.b / maxB) * ph, bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.c; rr(ctx, x, yt, bw2, bh, 5); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', x + bw2 / 2, yt - 6);
 ctx.fillStyle = p.sub; ctx.font = '600 10px sans-serif'; ctx.fillText(s.l, x + bw2 / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw2, h: bh, title: s.l, body: s.t });
 });
 }
 }

 function drawSilicon() {
 var e = prep('siliconCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal(); hits.siliconCanvas = [];
 var pad = { top: 28, right: 20, bottom: 40, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY23', 'FY24', 'FY25', 'FY26E', 'FY28E', 'FY30E'];
 if (state.sView === 'ai') {
 var ai = [3.8, 12.2, 20.2, 57.6, 95.0, 128.0], maxA = 145;
 for (var g = 0; g <= 4; g++) { var gv = Math.round((maxA / 4) * g), gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4); }
 ctx.strokeStyle = p.violet; ctx.lineWidth = 2.6; ctx.beginPath();
 ai.forEach(function (v, idx) { var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxA) * ph; if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
 ctx.stroke();
 ai.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / maxA) * ph;
 ctx.fillStyle = idx >= 4 ? p.green : p.violet; ctx.beginPath(); ctx.arc(px, py, 4.4, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + v.toFixed(1) + 'B', px, py - 9);
 ctx.fillStyle = p.tick; ctx.fillText(yrs[idx], px, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: yrs[idx] + ' AI 半导体营收', body: '$' + v.toFixed(1) + 'B（对照 Hock Tan FY30 PSU $90B–$120B 目标）' });
 });
 } else {
 var fcf = [17.6, 19.4, 26.9, 47.5, 68.0, 92.0], maxF = 105;
 for (var m = 0; m <= 3; m++) { var mv = m * 35, my = pad.top + ph - (mv / maxF) * ph; ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke(); ctx.fillStyle = p.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('$' + mv + 'B', pad.left - 8, my + 4); }
 var sw = pw / 6, bw = Math.min(40, sw * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * sw + (sw - bw) / 2, bh = (fcf[i] / maxF) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? p.green : p.blue; rr(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + fcf[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = p.tick; ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 年度自由现金流', body: '预计全年收割自由现金流 $' + fcf[i].toFixed(1) + 'B' });
 });
 }
 }

 var OPT = { xpu: [55, 27.5], newxpu: [35, 16.8], cpo: [28, 15.8], vcf: [15, 9.2], ma: [22, 11.8] };
 var miniCaps = [1.45, 2.04, 3.55];
 function drawOptMini() {
 var e = prep('optMiniCanvas'); if (!e) return;
 var ctx = e.ctx, w = e.w, h = e.h, p = pal();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前市值', '2030基础盘', '2030含期权'], maxV = Math.max(4.5, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
 ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2, bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? p.green : (i === 1 ? p.blue : p.violet); rr(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = p.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText('$' + v.toFixed(2) + 'T', x + bw / 2, yt - 6);
 ctx.fillStyle = p.tick; ctx.font = '10.5px sans-serif'; ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }
 function recalc() {
 var bRev = 108, bNet = 49.1, sh = 4.70, addR = 0, addN = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) { if (chk.checked) { var d = OPT[chk.getAttribute('data-opt')]; addR += d[0]; addN += d[1]; } });
 var totR = bRev + addR, totN = bNet + addN, eps = totN / sh, cap = (totN * state.pe) / 1000, bCap = (bNet * state.pe) / 1000;
 document.getElementById('optRevOut').textContent = '$' + Math.round(totR) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totN.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + cap.toFixed(2) + 'T';
 miniCaps = [1.45, bCap, cap]; drawOptMini();
 }
 document.querySelectorAll('[data-opt]').forEach(function (c) { c.addEventListener('change', recalc); });
 document.getElementById('peTabs').addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]'); if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10);
 this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
 recalc();
 });

 function bindSeg(gid, attr, sk, fn) { document.getElementById(gid).addEventListener('click', function (e) { var b = e.target.closest('[' + attr + ']'); if (!b) return; state[sk] = b.getAttribute(attr); this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); fn(); }); }
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFuture);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSilicon);

 ['futureCanvas', 'siliconCanvas'].forEach(function (cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) if (mx >= arr[i].x && mx <= arr[i].x + arr[i].w && my >= arr[i].y && my <= arr[i].y + arr[i].h) { hit = arr[i]; break; }
 if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px'; tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px'; }
 else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 });

 function drawAll() { drawFuture(); drawSilicon(); drawOptMini(); }
 var Q = [{ id: 'sec-f0', t: 'F0 2030 军令状与三阶时间窗', s: 'Hock Tan FY2030 PSU · $120B AI 营收目标' }, { id: 'sec-f1', t: 'F1 六大未来增长引擎深潜舱', s: '3.5D XPU · Tomahawk 6 · Davisson CPO · VCF' }, { id: 'sec-f2', t: 'F2 轻资产卖水人与 2032 营收桥', s: '1.8% CapEx 对比云巨头千亿军备竞赛' }, { id: 'sec-f3', t: 'F3 3.5D XPU + 102.4T CPO 矩阵', s: '2023–2030 AI 营收跃迁至 $128B' }, { id: 'sec-f4', t: 'F4 2030 冲击 $3万亿市值组装器', s: '自由开关五大新业务期权测算 EPS' }];
 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 function rQ(kw) { var q = (kw || '').trim().toLowerCase(), m = Q.filter(function (x) { return !q || (x.t + x.s).toLowerCase().indexOf(q) !== -1; }); qPop.innerHTML = m.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>'; }).join(''); qPop.classList.toggle('open', m.length > 0); }
 qIn.addEventListener('focus', function () { rQ(qIn.value); }); qIn.addEventListener('input', function () { rQ(qIn.value); });
 qPop.addEventListener('click', function (e) { var b = e.target.closest('[data-jump]'); if (b) { document.querySelector(b.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); } });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth < 1024) { var o = document.getElementById('muiSidebar').classList.toggle('open'); document.getElementById('drawerBackdrop').classList.toggle('open', o); }
 else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); }
 });
 document.getElementById('drawerBackdrop').addEventListener('click', function () { document.getElementById('muiSidebar').classList.remove('open'); this.classList.remove('open'); });
 window.addEventListener('scroll', function () { var dh = document.documentElement.scrollHeight - window.innerHeight; document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });
 function setTheme(t) { state.theme = t; document.documentElement.setAttribute('data-theme', t); drawAll(); }
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { setTheme(state.theme === 'dark' ? 'light' : 'dark'); showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至浅色模式'); });
 document.getElementById('sideLightBtn')?.addEventListener('click', function () { setTheme('light'); });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { setTheme('dark'); });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var b = e.target.closest('[data-lang]'); if (!b) return;
 state.lang = b.getAttribute('data-lang');
 document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
 document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) { var v = el.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh'); if (v) { if (v.indexOf('<span') !== -1) el.innerHTML = v; else el.textContent = v; } });
 });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () {
 var u = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
 var a = document.createElement('a'); a.href = u; a.download = 'Broadcom_Future_Horizon_2030_Blueprint.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
 showToast('已导出 Broadcom_Future_Horizon_2030_Blueprint.html');
 });
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 90); });
 recalc(); drawAll();
 })();
 