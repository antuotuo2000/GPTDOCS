
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

 var state = { theme: 'dark', lang: 'zh', fView: 'capex', sView: 'mtia', pe: 28 };
 var hits = { futureCanvas: [], siliconCanvas: [] };

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
 violet: dark ? '#A78BFA' : '#7C3AED',
 green: dark ? '#22C55E' : '#16A34A',
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
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl) sl.classList.toggle('active', state.theme === 'light');
 if (sd) sd.classList.toggle('active', state.theme === 'dark');
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 drawAll();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
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
 try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
 drawAll();
 if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
 }

 function exportSelfHtml() {
 var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'Meta未来十年（2026–2032）战略图谱.html';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
 showToast('已开始下载《Meta未来十年（2026–2032）战略图谱.html》');
 }

 // Subfolder Hub
 var hubPills = document.getElementById('hubCatPills');
 if (hubPills) {
 hubPills.addEventListener('click', function (e) {
 var b = e.target.closest('[data-co-cat]');
 if (!b) return;
 var cat = b.getAttribute('data-co-cat');
 var bs = hubPills.querySelectorAll('.co-hub-pill');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var its = document.querySelectorAll('#hubItemList [data-co-item-cat]');
 for (var j = 0; j < its.length; j++) {
 its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
 }
 });
 }
 document.querySelectorAll('[data-nav-toast]').forEach(function (el) {
 el.addEventListener('click', function () { showToast(el.getAttribute('data-nav-toast')); });
 });

 // F0: 3-Horizon Radar Switcher
 var HORIZONS = [
 {
 badge: 'HORIZON 1 · 算力筑基与商业闭环期 (2026–2027)',
 title: 'Muse 前沿模型突围 × Class C 生效 × RL 亏损首次实质性收窄',
 items: [
 '<strong>Muse 家族与 Meta One 变现：</strong>Muse 独立代理试水 $20/$100 月费与云浏览器任务执行；Meta One 开启跨四大应用订阅。',
 '<strong>2027.01 Class C 股本武器库：</strong>1:1 无投票权股票股利生效，打开算力合资与 AI 并购弹性且不稀释创始人投票权。',
 '<strong>RL 亏损拐点确立：</strong>随资源向 AI 聚焦，Reality Labs 亏损预计由 2025 年 $19.2B 降至 2027 年 ~$15B。'
 ],
 prob: '兑现确定性：高 (85%+)',
 impact: '年化增量营收池：+$55B–$75B'
 },
 {
 badge: 'HORIZON 2 · 代理经济与自研芯片规模化期 (2028–2029)',
 title: 'MTIA 500 推理主导 × WhatsApp 企业 AI 爆发 × 眼镜迈过两千万副',
 items: [
 '<strong>WhatsApp 商家 AI 代理标配化：</strong>上千万中小企业雇用 Meta Business AI 全天候接待私聊询盘并自动收款。',
 '<strong>MTIA 压降算力折旧率：</strong>与博通合研的多代 MTIA 芯片承担过半推理与推荐负载，CapEx/营收比由 >50% 回落至稳态。',
 '<strong>带屏 AI 眼镜成为独立应用平台：</strong>Ray-Ban Display 二/三代与 Oakley 矩阵形成数千万级第一视角实时多模态入口。'
 ],
 prob: '兑现确定性：中高 (70%)',
 impact: '年化增量营收池：+$110B–$150B'
 },
 {
 badge: 'HORIZON 3 · 个人超级智能与全真空间奇点期 (2030–2032)',
 title: 'Orion 碳化硅全真 AR 眼镜量产 × 递归自我改进超级智能闭环',
 items: [
 '<strong>摆脱智能手机系统抽成：</strong>当碳化硅光波导成本下探至消费级区间，全天候 AR 眼镜联动肌电腕带直接替代部分手机场景。',
 '<strong>科研与工程级超级智能：</strong>MSL 前沿模型实现复杂软件研发与商业运营全自动代理，切入万亿级企业白领劳动力市场。',
 '<strong>冲击 2031 高管登月期权目标：</strong>若 AI 新曲线与广告主业共振，公司估值向高管激励上限（$6T–$8T+）发起冲击。'
 ],
 prob: '兑现确定性：远期登月期权 (45%–55%)',
 impact: '年化增量营收池：+$180B+'
 }
 ];
 var hzTabs = document.getElementById('hzTabs');
 if (hzTabs) {
 hzTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-hz]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
 var bs = hzTabs.querySelectorAll('.ft-hz-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var hz = HORIZONS[idx];
 document.getElementById('hzBadge').textContent = hz.badge;
 document.getElementById('hzTitle').textContent = hz.title;
 document.getElementById('hzList').innerHTML = hz.items.map(function (t) {
 return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
 }).join('');
 document.getElementById('hzProb').textContent = hz.prob;
 document.getElementById('hzImpact').textContent = hz.impact;
 });
 }

 // F1: 6-Engine Explorer
 var ENGINES = [
 {
 badge: 'ENGINE 01 · META SUPERINTELLIGENCE LABS & MUSE AGENT',
 title: '从开源 Llama 走向双轨商业闭环：Muse 个人超级智能代理与 Meta One 订阅',
 desc: '2025 年夏扎克伯格果断重组 AI 版图，邀请 Alexandr Wang 统帅 Meta Superintelligence Labs (MSL)，确立“开源生态护城河 + 专有前沿模型直接变现”双轨战略。2026 年 4 月首款前沿模型 Muse Spark 亮相，9 月推出能够通过云端浏览器跨服务自主执行复杂购物与工作流任务的 Muse 个人代理（上线首季即突破 1,000万高粘性用户，日活率达 25%），10 月再发多步推理与多模态模型 Muse Wonder，彻底补齐了独立 AI 原生商业闭环。',
 formula: '变现三叉戟：(1) Muse $20 / $100 月度专业订阅 + (2) 代理代购电商佣金抽成 + (3) Meta One 跨四大社交应用增强会员',
 gauges: [['1B+ MAU', 'Meta AI 跨应用月活跃底座'], ['Muse Wonder', '2026.10 发布前沿多步推理模型'], ['$20 / $100', '重度个人与专业级月度订阅梯度'], ['3.64B 社交上下文', '唯一掌握真实熟人与兴趣图谱的AI']]
 },
 {
 badge: 'ENGINE 02 · GENERATIVE AI END-TO-END AD AUTOMATION',
 title: '全自动印钞机终极形态：广告主只需输入银行卡与销售目标，其余全交 AI',
 desc: '扎克伯格提出对广告行业的颠覆性终局：未来企业不再需要制作广告素材、不再需要圈选人群甚至不再需要投放团队——只需告诉 Meta 你的产品链接与单次获客愿意支付的金额，Meta 大模型自动生成千人千面的视频/图文广告、实时匹配高转化潜客并完成结算。2026Q3 广告均价同比大涨 +14%，正是这套系统吞噬传统广告代理商预算的开端。',
 formula: '利润传导：省去品牌创意制作费与代理抽成 → 广告主总预算向 Meta 平台集中 → 广告 eCPM 与 take-rate 持续抬升',
 gauges: [['+26% YoY', 'Q3 2026 单季广告营收高速扩张'], ['+14% 单价', 'AI 精准匹配直接拉升竞拍价格'], ['1000万+ 广告主', '全球最庞大的长尾中小商家池'], ['>85% 边际毛利', '算力固定投入后的极高增量利润率']]
 },
 {
 badge: 'ENGINE 03 · WHATSAPP BUSINESS AGENT & THREADS MONETIZATION',
 title: '唤醒两大沉睡金矿：20亿日活 WhatsApp 商业代理 + 5亿月活 Threads 信息流',
 desc: 'WhatsApp 长期是用户体量超 20 亿却商业化极克制的超级入口，而 Threads 更在 2026 年中跨越 5 亿月活并反超 X。通过为全球数千万商家免费配置基于 Muse/Llama 的“7×24小时 WhatsApp 销售与售后 AI 员工”，商家为每次有效对话与导流广告付费，推动 9M 2026 FoA 其他收入飙升 +67%。',
 formula: '变现逻辑：Click-to-WhatsApp 导流广告 + 按对话计费 Business API + Threads 品牌原生信息流广告放量',
 gauges: [['500M+ MAU', 'Threads 跃居全球顶级文字广场'], ['+67% YoY', '9M 2026 FoA 其他非广告收入增速'], ['2B+ DAU', 'WhatsApp 垄断拉美/印/欧高频通信'], ['+$25B–$40B', '2030E 双平台合计新增年化收入池']]
 },
 {
 badge: 'ENGINE 04 · 4-GEN MTIA SILICON & GIGAWATT CLUSTERS',
 title: '两年四代 MTIA 自研芯片 + 吉瓦级园区：砍掉昂贵的外部推理算力税',
 desc: '当训练集群规模迈向吉瓦（GW）级别，若 100% 采购外部商用 GPU 将承受高昂毛利盘剥。Meta 于 2026 年春季宣布与博通深化多代战略合作，两年内密集部署四代 MTIA（300–500）芯片，专攻高带宽推荐系统与大模型低延迟推理；配合路易斯安那 Hyperion 与德州 El Paso 1GW 贝莱德合资园区，构建起全球前五的超算基础设施。',
 formula: '成本杠杆：自研 ASIC 替代高溢价通用 GPU 运行 36.4亿人日常 AI 推理 → 预计降低 30%–40% 单 Token 全周期成本',
 gauges: [['4 代连发', '2026–2027 MTIA 300–500 激进节奏'], ['1.08 PUE', '全球 33 座数据中心极致能效比'], ['1GW 合资', '携手贝莱德创新基建表外融资'], ['$135–145B', '2026 全年锁定全球稀缺电力与算力']]
 },
 {
 badge: 'ENGINE 05 · RAY-BAN / OAKLEY AI GLASSES & EMG NEURAL BAND',
 title: '意外引爆的消费电子黑马：依视路时尚镜架 × 第一视角多模态 AI × 肌电腕带',
 desc: '当重型头显受困于佩戴重量时，Meta 与全球眼镜霸主依视路陆逊梯卡（EssilorLuxottica）跨界打造的 Ray-Ban Meta、Oakley 运动眼镜及 $799 Meta Ray-Ban Display（配备手腕微动即可操控的 sEMG 肌电神经腕带）意外引爆主流消费市场，双方已探讨在 2026 年底前将年产能规划推向 2,000万副量级。因为眼镜天然具备人类所见即所得的视觉与听觉视角，它是个人 AI 代理最完美的物理载体。',
 formula: '战略卡位：用时尚墨镜/近视镜零负担形态普及随身 AI → 联合依视路全球数万家光学门店分销 → 大幅摊薄 RL 硬件亏损',
 gauges: [['2,000万副目标', '与依视路探讨的年化扩产级数'], ['$299 – $799', '无屏音频版到单目显示+腕带全覆盖'], ['sEMG 神经腕带', '手指微动毫秒级无感隔空输入'], ['~$15B (2027E)', 'RL 分部亏损较 2025 ($19.2B) 明显收窄']]
 },
 {
 badge: 'ENGINE 06 · ORION SILICON-CARBIDE FULL AR EYEWEAR',
 title: '终极圣杯 Orion：用碳化硅光波导把智能手机屏幕彻底搬到视网膜前',
 desc: '扎克伯格深知，只要用户仍在苹果 iPhone 或安卓手机上打开 Instagram，Meta 就永远面临系统商抽成与隐私断流威胁。代号 Orion 的全真 AR 眼镜原型采用超高折射率碳化硅（SiC）镜片与定制无线计算单元，在不足百克的眼镜外观下实现 70 度大视场角全彩全息投射——一旦 2029–2031 年碳化硅良率攻克，Meta 将首次拥有完全自主的下一代操作系统主权。',
 formula: '终局价值：掌控后智能手机时代底层 OS、空间应用分发税与全天候第一视角环境计算上下文',
 gauges: [['70° FOV', '碳化硅光波导突破行业视场角极限'], ['3 合 1 交互', '眼动追踪 + 手势 + 肌电神经腕带'], ['0 苹果税', '彻底摆脱移动操作系统守门人制约'], ['2029–2032', '消费级量产版商业化冲刺窗口']]
 }
 ];
 var rail = document.getElementById('engineRail');
 if (rail) {
 rail.addEventListener('click', function (e) {
 var b = e.target.closest('[data-eng]');
 if (!b) return;
 var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
 var bs = rail.querySelectorAll('.ft-rail-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 var eg = ENGINES[idx];
 document.getElementById('engBadge').textContent = eg.badge;
 document.getElementById('engTitle').textContent = eg.title;
 document.getElementById('engDesc').textContent = eg.desc;
 document.getElementById('engFormula').textContent = eg.formula;
 document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
 return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
 }).join('');
 });
 }

 // High-DPI Canvas Engine
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

 function drawFutureCanvas() {
 var env = prepCanvas('futureCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.futureCanvas = [];
 var pad = { top: 28, right: 20, bottom: 42, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 if (state.fView === 'capex') {
 var peers = [
 { name: 'Meta (META)', cap: 140.0, col: pal.blue, tip: '2026 官方指引 $135B–$145B（中枢 $140B，占预计营收逾 54%），全力押注 MSL 超智能与核心广告算力' },
 { name: 'Amazon', cap: 105.0, col: pal.amber, tip: 'AWS 云数据中心与全球电商物流双线重资产扩张' },
 { name: 'Microsoft', cap: 88.0, col: pal.violet, tip: 'Azure 全球 AI 算力基础设施扩张（企业云合同对冲）' },
 { name: 'Alphabet', cap: 78.0, col: pal.green, tip: 'TPU 自研集群与 Google Cloud / Search AI 基础设施投入' },
 { name: 'Apple (AAPL)', cap: 9.0, col: pal.red, tip: 'FY2026 CapEx 仅 $9.0B（占营收 1.9%），走轻资产端侧硬件由消费者买单路线' }
 ];
 var maxC = 155;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
 peers.forEach(function (p, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
 ctx.fillStyle = p.col;
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + p.cap.toFixed(0) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = i === 0 ? pal.blue : pal.sub; ctx.font = (i === 0 ? 'bold ' : '600 ') + '11px sans-serif';
 ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' 2026 年度资本开支规模', body: p.tip });
 });
 } else {
 var steps = [
 { lbl: 'FY25基准', v: 201.0, b: 0, col: pal.blue, tip: 'FY2025 审计总营收: $200.97B' },
 { lbl: '+26年跃升', v: 55.2, b: 201.0, col: pal.green, tip: '9M26 +29% 与 Q4 $73–76B 指引推升 FY26E 至 ~$256.2B' },
 { lbl: '+AI核心广告', v: 122.0, b: 256.2, col: pal.blue, tip: '2027–2032 Advantage+ 自动化竞价与新兴市场提价贡献 +$122B' },
 { lbl: '+WhatsApp/Threads', v: 46.0, b: 378.2, col: pal.violet, tip: 'WhatsApp 企业 AI 客服代理与 Threads 信息流成熟贡献 +$46B' },
 { lbl: '+Muse与眼镜', v: 68.0, b: 424.2, col: pal.amber, tip: 'Muse 超级智能订阅/代购抽成与 Ray-Ban/Orion 空间硬件贡献 +$68B' },
 { lbl: 'FY32E蓝图', v: 492.2, b: 0, col: pal.green, tip: 'FY2032E 远期营收蓝图: ~$492B（较 FY25 再翻约 2.45 倍）' }
 ];
 var maxB = 540;
 for (var k = 0; k <= 4; k++) {
 var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
 }
 var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
 steps.forEach(function (s, i) {
 var x = pad.left + i * sW + (sW - bW) / 2;
 var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
 var yb = pad.top + ph - (s.b / maxB) * ph;
 var bh = Math.max(5, yb - yt);
 ctx.fillStyle = s.col;
 roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', x + bW / 2, yt - 6);
 ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
 ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
 hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
 });
 }
 }

 function drawSiliconCanvas() {
 var env = prepCanvas('siliconCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.siliconCanvas = [];
 var pad = { top: 28, right: 22, bottom: 40, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['2025', '2026 (4代连发)', '2027E', '2028E', '2029E', '2030E'];

 if (state.sView === 'mtia') {
 var rankShare = [28, 48, 68, 82, 90, 95];
 var genShare = [5, 18, 38, 56, 70, 78];
 for (var g = 0; g <= 4; g++) {
 var gv = g * 25, gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText(gv + '%', pad.left - 8, gy + 4);
 }
 function plotP(arr, col, label) {
 ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
 if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 });
 ctx.stroke();
 arr.forEach(function (v, idx) {
 var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 100) * ph;
 ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
 if (idx === 1 || idx === 5) {
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(v + '%', px, py - 8);
 }
 hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: 'MTIA 预计承载比例: ' + v + '%' });
 });
 }
 yrs.forEach(function (y, idx) {
 var px = pad.left + (idx / 5) * pw;
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText(y, px, pad.top + ph + 20);
 });
 plotP(rankShare, pal.blue, '推荐与广告排序自研芯片承载率');
 plotP(genShare, pal.violet, '生成式 AI (Muse/Llama) 推理承载率');
 } else {
 var rlLoss = [19.2, 18.5, 15.0, 11.2, 6.5, 1.8];
 var maxL = 22;
 for (var m = 0; m <= 4; m++) {
 var mv = (maxL / 4) * m, my = pad.top + ph - (m / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
 ctx.fillText('-$' + mv.toFixed(1) + 'B', pad.left - 6, my + 4);
 }
 var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
 yrs.forEach(function (y, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (rlLoss[i] / maxL) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i <= 1 ? pal.red : (i === 2 ? pal.amber : pal.green);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('-$' + rlLoss[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
 ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
 hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' Reality Labs 营业亏损轨迹', body: '年度营业亏损: -$' + rlLoss[i].toFixed(1) + 'B（2026Q3 CFO 指引确认 2026 降至 $18–19B、2027 进一步收窄至 ~$15B）' });
 });
 }
 }

 // F4: Interactive 2031 Optionality Builder
 var OPT_DATA = {
 muse: { rev: 45, net: 26.5 },
 wa: { rev: 38, net: 19.8 },
 mtia: { rev: 0, net: 13.4 },
 glass: { rev: 24, net: 14.5 },
 b2b: { rev: 55, net: 25.4 }
 };
 var miniCaps = [1.65, 3.22, 5.30];

 function drawOptMiniCanvas() {
 var env = prepCanvas('optMiniCanvas');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 var pad = { top: 22, right: 18, bottom: 24, left: 46 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = ['参考基准市值', '2031基础广告盘', '2031含勾选期权'];
 var maxV = Math.max(6.5, Math.ceil(Math.max.apply(null, miniCaps) * 1.16));
 ctx.strokeStyle = pal.grid;
 ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
 var slot = pw / 3, bw = Math.min(54, slot * 0.5);
 miniCaps.forEach(function (v, i) {
 var x = pad.left + i * slot + (slot - bw) / 2;
 var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
 roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
 ctx.fillText('$' + v.toFixed(2) + 'T', x + bw / 2, yt - 6);
 ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
 ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
 });
 }

 function recalcOptionality() {
 var baseRev = 408.0, baseNet = 115.0, sh2031 = 2.52;
 var addRev = 0, addNet = 0;
 document.querySelectorAll('[data-opt]').forEach(function (chk) {
 if (chk.checked) {
 var d = OPT_DATA[chk.getAttribute('data-opt')];
 if (d) { addRev += d.rev; addNet += d.net; }
 }
 });
 var totRev = baseRev + addRev;
 var totNet = baseNet + addNet;
 var eps = totNet / sh2031;
 var mcapT = (totNet * state.pe) / 1000;
 var baseMcapT = (baseNet * state.pe) / 1000;

 document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
 document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
 document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
 document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

 miniCaps = [1.65, baseMcapT, mcapT];
 drawOptMiniCanvas();
 }

 document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
 var peTabs = document.getElementById('peTabs');
 if (peTabs) {
 peTabs.addEventListener('click', function (e) {
 var b = e.target.closest('[data-pe]');
 if (!b) return;
 state.pe = parseInt(b.getAttribute('data-pe'), 10) || 28;
 var bs = peTabs.querySelectorAll('.mui-seg-btn');
 for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
 recalcOptionality();
 });
 }

 function bindSeg(gid, attr, skey, fn) {
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
 bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
 bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

 function bindTip(cid) {
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
 tip.style.left = Math.min(window.innerWidth - 300, ev.clientX + 14) + 'px';
 tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

 function drawAll() {
 drawFutureCanvas();
 drawSiliconCanvas();
 drawOptMiniCanvas();
 }

 // Quick Jump ⌘K
 var QITEMS = [
 { id: 'sec-f0', t: 'F0 主权超智能与三阶战略时间窗雷达', s: 'Alexandr Wang 执掌 MSL · 2026–2032 三阶段兑现路线' },
 { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Muse个人代理 · 全自动广告 · WhatsApp · MTIA · 眼镜与Orion' },
 { id: 'sec-f2', t: 'F2 $140B 算力豪赌对决苹果轻资产路线', s: '五大巨头 CapEx 横向对比 · 迈向 $492B 营收阶梯桥' },
 { id: 'sec-f3', t: 'F3 四代 MTIA 芯片与智能眼镜主权', s: '博通联研 ASIC 替代率 · Reality Labs 2027 减亏至 ~$15B' },
 { id: 'sec-f4', t: 'F4 2031 冲击高管登月期权目标组装器', s: '自由勾选五大期权与估值倍数实时测算 2031 目标市值' }
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
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); }
 if (e.key === 'Escape') document.body.classList.remove('portal-detail-drawer');
 });

 // Sidebar, Export & Print
 var sbBtn = document.getElementById('sidebarToggleBtn'), bd = document.getElementById('portalDetailBackdrop');
 if (sbBtn) {
 sbBtn.addEventListener('click', function () {
 if (window.innerWidth >= 1024) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '1' : '0'); } catch (e) {}
 setTimeout(drawAll, 60);
 } else {
 document.body.classList.toggle('portal-detail-drawer');
 }
 });
 }
 if (bd) bd.addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 document.querySelectorAll('#muiSidebar .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 });
 document.querySelectorAll('[data-export-self]').forEach(function (btn) { btn.addEventListener('click', exportSelfHtml); });
 document.querySelectorAll('[data-set-theme]').forEach(function (btn) {
 btn.addEventListener('click', function () { applyTheme(btn.getAttribute('data-set-theme'), false); });
 });
 var prBtn = document.getElementById('sidePrintBtn');
 if (prBtn) prBtn.addEventListener('click', function () { window.print(); });

 window.addEventListener('scroll', function () {
 var bar = document.getElementById('readingProgressBar');
 if (bar) {
 var dh = document.documentElement.scrollHeight - window.innerHeight;
 bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
 }
 }, { passive: true });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) {}

 document.getElementById('appbarThemeBtn').addEventListener('click', function () {
 applyTheme(state.theme === 'dark' ? 'light' : 'dark', false);
 });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
 var lb = e.target.closest('[data-lang]');
 if (lb) applyLang(lb.getAttribute('data-lang'), false);
 });

 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 recalcOptionality();
 drawAll();
 })();
 