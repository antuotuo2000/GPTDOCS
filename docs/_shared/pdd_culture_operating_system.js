
 (function () {
 'use strict';
 var STORAGE_THEME_KEY = 'mui_portal_theme_v4', STORAGE_LANG_KEY = 'mui_portal_lang_v1', STORAGE_AUDIT_KEY = 'pdd_culture_bp_audit_v1';
 var TITLE_ZH = '拼多多企业文化与组织操作系统图谱：本分、原子化扁平与三代传承 | 数据中心';
 var TITLE_EN = 'PDD Organizational OS & Culture Blueprint: Benfen, Atomic Flatness & 3-Era Legacy | Research Hub';
 var state = { theme: 'light', lang: 'zh', topoMode: 'pdd', activeQuad: 0, activeEra: 2, eView: 'rev', gView: 'emp', hover: { eraCanvas: -1, genomeCanvas: -1, entropyCanvas: -1 } };
 var hits = { eraCanvas: [], genomeCanvas: [], entropyCanvas: [] };
 function isEn() { return state.lang === 'en'; }
 function showToast(msg) { var b = document.getElementById('muiSnackbar'); if (!b) return; b.textContent = msg; b.classList.add('show'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('show'); }, 2000); }
 function getPalette() {
 var dark = document.documentElement.getAttribute('data-theme') === 'dark';
 return { dark: dark, text: dark ? '#F3F6F9' : '#0F1924', sub: dark ? '#B2BAC2' : '#334155', tick: dark ? '#94A3B8' : '#475569', grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.15)', hoverBand: dark ? 'rgba(51,153,255,0.09)' : 'rgba(0,115,230,0.06)', pillBg: dark ? 'rgba(9,13,22,0.90)' : 'rgba(255,255,255,0.95)', pillBorder: dark ? 'rgba(51,153,255,0.34)' : 'rgba(0,115,230,0.25)', blue: dark ? '#3399FF' : '#0073E6', green: dark ? '#22C55E' : '#16A34A', violet: dark ? '#A78BFA' : '#7C3AED', amber: dark ? '#FFB74D' : '#D97706' };
 }

 var RICH_I18N = {
 c0_lead: {
 zh: '传统电商巨头一旦跨入数万亿 GMV 规模，往往演变为由数十个事业群、庞大中台与自建履约团队构成的<strong>“十几万至数十万人重矩阵”</strong>。但<strong>拼多多（PDD Holdings）</strong>却反其道而行之：截至 2025 年底全公司仅 <strong>25,474 名全职员工</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 20-F ↗</a>，却服务 1,680 万活跃商家与全球数亿买家。核心密码在于<strong>“原子化小分队 + 算法替代中层管理 + 零自营重履约”</strong>，让每个业务小队直接面向实时 ROI 与转化率赛马，把行政管理费率死死压在 <strong>1.5%</strong> 左右。',
 en: 'Legacy commerce giants crossing trillions in GMV typically swell into <strong>190k–600k+ bureaucratic matrices</strong>. Yet <strong>PDD Holdings</strong> employed just <strong>25,474 FTEs</strong> at year-end 2025 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1737806/000110465926050727/pdd-20251231x20f.htm" target="_blank" rel="noopener noreferrer">2025 20-F ↗</a> while serving 16.8M active merchants globally. By replacing middle-office bureaucracy with <strong>atomic tiger teams, algorithmic matching, and zero 1P warehouses</strong>, PDD holds G&amp;A near <strong>1.5%</strong>.'
 },
 c0_quote: {
 zh: '<strong>核心制度洞察（黄峥 · 创始人致股东信）：</strong>“本分意味着做正确的事，把事情做正确；不要把精力浪费在内部政治与外部公关表演上，而是像 Costco + Disney 一样，用极简组织为最广大的普通消费者创造实实在在的性价比与快乐。”',
 en: '<strong>Institutional Insight (Colin Huang · Shareholder Letter):</strong> “Benfen means doing the right things and doing things right—tuning out internal politics and PR theater to deliver Costco-grade value and Disney-grade joy with extreme organizational simplicity.”'
 }
 };

 function renderTopo(mode) {
 state.topoMode = mode === 'legacy' ? 'legacy' : 'pdd';
 var st = document.getElementById('topoStage'), en = isEn();
 if (state.topoMode === 'pdd') {
 st.innerHTML = en
 ? '<div class="cc-topo-hub mono">Co-Chairmen Lei Chen &amp; Jiazhen Zhao · Live Algo &amp; ROAS Dashboard (25,474 FTEs)</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>Algo &amp; Ads</b>Full-Site Promotion automated ROAS engine</div><div class="cc-spoke"><b>Domestic Squads</b>10B Subsidies &amp; RMB 100B Support</div><div class="cc-spoke"><b>Temu Local</b>Semi-managed US/EU warehouse teams</div><div class="cc-spoke"><b>Duoduo Grocery</b>Grid pickup network, zero 1P fleet</div><div class="cc-spoke"><b>Xinpinmu</b>Data-driven private-label OEMs</div><div class="cc-spoke"><b>Xiong\'an Hub</b>AI screening + 1M/day appeal desk</div></div><div class="cc-topo-outcome">Outcome: 1.54% G&amp;A ratio, RMB 16.95M Rev/FTE &amp; RMB 455.4B cash fortress.</div>'
 : '<div class="cc-topo-hub mono">双联席董事长 陈磊 × 赵佳臻 · 实时 ROI 数据中枢 (仅 25,474 名员工)</div><div class="cc-topo-spokes"><div class="cc-spoke"><b>核心算法组</b>全站推广自动出价与瀑布流分发</div><div class="cc-spoke"><b>国内主站小队</b>百亿补贴与千亿扶持商家生态</div><div class="cc-spoke"><b>Temu 全球组</b>欧美半托管与本对本本地仓团队</div><div class="cc-spoke"><b>多多买菜组</b>网格仓自提网络，零自建快递队</div><div class="cc-spoke"><b>新拼姆品牌组</b>大数据反向定制高性价比自有品牌</div><div class="cc-spoke"><b>雄安数智中心</b>AI初筛 + 日均百万级申诉优赔</div></div><div class="cc-topo-outcome">结果：G&amp;A 仅 1.54%、人均创收 RMB 1,695万、现金堡垒 RMB 4,554亿</div>';
 } else {
 st.innerHTML = en
 ? '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">Legacy Holding HQ · Multi-BG Silos &amp; Heavy 1P Operations (190k–600k FTEs)</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>Shelf BG</b>Bloated category managers &amp; PPT reviews</div><div class="cc-spoke silo"><b>1P Logistics</b>CapEx-heavy warehouses &amp; courier payroll</div><div class="cc-spoke silo"><b>Middle Office</b>Shared platforms detached from frontline ROI</div><div class="cc-spoke silo"><b>Intl Silo</b>Slow cross-BG coordination on global bets</div><div class="cc-spoke silo"><b>Ad Sales</b>Manual account teams raising S&amp;M drag</div><div class="cc-spoke silo"><b>PR &amp; Admin</b>High G&amp;A layers slowing decision speed</div></div><div class="cc-topo-outcome warn">Failure Mode: Bloated headcount, internal politics &amp; slow reaction to shifts.</div>'
 : '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统重型大厂 · 多BG事业群割据 + 自营重资产 (19万–60万员工)</div><div class="cc-topo-spokes"><div class="cc-spoke silo"><b>类目运营BG</b>层层汇报 PPT，小二人工干预过重</div><div class="cc-spoke silo"><b>自营仓储物流</b>巨额固定资产折旧与庞大快递人力</div><div class="cc-spoke silo"><b>臃肿大中台</b>脱离一线 ROI 考核，需求排期缓慢</div><div class="cc-spoke silo"><b>海外独立部门</b>跨部门资源调动阻力大、响应迟缓</div><div class="cc-spoke silo"><b>人工广告销售</b>高人力维护成本拉低净利率上限</div><div class="cc-spoke silo"><b>行政层级墙</b>G&amp;A 居高不下，面对关税剧变转身困难</div></div><div class="cc-topo-outcome warn">恶果：人员臃肿、内部赛马变内耗，丧失对市场剧变的闪电反应力</div>';
 }
 }

 var QUADS = [
 { badge: 'Q1 · BENFEN CREED', titleZh: '本分第一性原理：只问消费者实惠与商家效率', titleEn: 'Benfen First Principles: Consumer Value &amp; Merchant Throughput', descZh: '2025–2026 年拼多多在盈利巅峰期主动投入千亿扶持、退还技术服务费并上线“申诉优赔”，短期牺牲部分利润率以换取长期优质供给生态。', descEn: 'During peak profitability in 2025–2026, PDD proactively invested RMB 100B into merchant fee rebates and protection to fortify 10-year supply.', alloc: [42, 30, 20, 8] },
 { badge: 'Q2 · ATOMIC FLATNESS', titleZh: '花名平级制：1.54% 管理费率背后的去官僚革命', titleEn: 'Nickname Equality: Anti-Bureaucracy Behind 1.54% G&amp;A', descZh: '公司内部不设 VP 头衔崇拜，员工花名直呼，削减多余中层审批节点，使 2.5 万名员工创造出媲美二十万人大厂的 GMV 规模。', descEn: 'Eliminating VP title politics and unnecessary approval layers enables 25,474 FTEs to match the GMV output of 200k-person rivals.', alloc: [38, 35, 22, 5] },
 { badge: 'Q3 · HORSE RACING', titleZh: '小分队内部赛马：用最小试错成本孵化百亿曲线', titleEn: 'Tiger-Team Horse-Racing: Low-Cost S-Curve Incubation', descZh: '无论是 2020 年的多多买菜还是 2022 年的 Temu，均由精干小队率先跑通单位经济模型，随后由高层一键切换全公司饱和资源支援。', descEn: 'Both Duoduo Grocery (2020) and Temu (2022) started as lean tiger teams that earned instant company-wide scaling once unit economics worked.', alloc: [45, 28, 17, 10] },
 { badge: 'Q4 · ALGO OVER HEADCOUNT', titleZh: '算法替代人工：FY25 研发大增 30% 至 ¥165 亿', titleEn: 'Algorithms Over Headcount: FY25 R&amp;D +30% to RMB 16.5B', descZh: '将资金砸向全站推广自动出价与雄安 AI 标注质检，用代码能力代替人海战术，把人均年创收推高至 RMB 1,695 万。', descEn: 'Channeling +30% R&amp;D into automated ROAS bidding and AI quality screening replaces manual armies and drives RMB 16.95M Rev/FTE.', alloc: [25, 48, 22, 5] }
 ];
 function renderQuad(idx) {
 state.activeQuad = idx; var q = QUADS[idx] || QUADS[0], en = isEn();
 document.getElementById('dialBadge').textContent = q.badge;
 document.getElementById('dialTitle').textContent = en ? q.titleEn : q.titleZh;
 document.getElementById('dialDesc').textContent = en ? q.descEn : q.descZh;
 [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (p) {
 document.getElementById('pct' + p[0]).textContent = p[1] + '%';
 document.getElementById('bar' + p[0]).style.width = p[1] + '%';
 });
 }

 var ERAS = [
 { badge: 'ERA I · 2015–2020 · COLIN HUANG', titleZh: '黄峥创业期：拼团社交裂变与“Costco + Disney”底座', titleEn: 'Colin Huang Era: Viral Group-Buying &amp; "Costco + Disney"', descZh: '2015年创立拼多多，2018年赴美上市，2019年推出“百亿补贴”攻入一二线核心市场，确立去购物车化算法推荐与本分文化基因。', descEn: 'Founded in 2015, listed on Nasdaq in 2018, and launched 10B Subsidies in 2019—establishing cart-free algorithmic discovery and Benfen.', kpisZh: [['3年上市', '2018 登陆纳斯达克'], ['百亿补贴', '2019 破圈一二线城市'], ['9亿+买家', '夯实全国消费底座'], ['本分基因', '奠定极简原子化组织']], kpisEn: [['3Y to IPO', '2018 Nasdaq Listing'], ['10B Subsidies', '2019 Urban Breakthrough'], ['900M+ Buyers', 'Nationwide Demand Base'], ['Benfen Creed', 'Atomic Flatness DNA']] },
 { badge: 'ERA II · 2020–2025 · CHEN LEI', titleZh: '陈磊扩张期：多多买菜网格仓与 Temu 全球闪电战', titleEn: 'Chen Lei Era: Duoduo Grocery &amp; Temu Global Blitzscale', descZh: '技术出身的陈磊接棒后，成功跑通多多买菜生鲜履约网并于 2022年9月推出 Temu 席卷全球，集团年营收跨越 RMB 4,318 亿大关。', descEn: 'Technologist CEO Chen Lei scaled Duoduo Grocery and launched Temu in Sep 2022—driving annual revenue past RMB 431.8B.', kpisZh: [['¥431.8B', 'FY2025 集团总营收'], ['¥97.8B', 'FY2025 GAAP 净利润'], ['¥105.8B', 'FY2025 自由现金流'], ['25,474人', '仅增员维持极高人效']], kpisEn: [['RMB 431.8B', 'FY2025 Total Revenue'], ['RMB 97.8B', 'FY2025 Net Income'], ['RMB 105.8B', 'FY2025 Free Cash Flow'], ['25,474 FTEs', 'Ultra-Lean Headcount']] },
 { badge: 'ERA III · 2025.12+ · DUAL CO-CHAIRMEN', titleZh: '双联席董事长时代：陈磊（全球/技术）× 赵佳臻（国内/生态）', titleEn: 'Dual Co-Chairmen Era: Chen Lei (Global) × Zhao Jiazhen (Domestic)', descZh: '2025年12月赵佳臻升任联席董事长兼 Co-CEO，与陈磊形成海内外双核驱动：国内落地千亿扶持与新拼姆，海外 Temu 全面切换半托管本地仓，26Q3 净利重返 RMB 295.4 亿。', descEn: 'In Dec 2025, Zhao Jiazhen joined Chen Lei as Co-Chairman &amp; Co-CEO—anchoring RMB 100B domestic support, Xinpinmu, and Temu’s semi-managed pivot.', kpisZh: [['¥108.3B', 'Q3\'26 稳健单季营收'], ['28.8%', 'Q3\'26 营业利润率反弹'], ['¥455.4B', '现金+短投 ($67.9B)'], ['¥16.95M', '25,474 人人均年创收']], kpisEn: [['RMB 108.3B', 'Q3\'26 Quarterly Revenue'], ['28.8%', 'Q3\'26 Operating Margin'], ['RMB 455.4B', 'Cash &amp; ST Inv ($67.9B)'], ['RMB 16.95M', 'Revenue / Employee']] }
 ];
 function renderEra(idx) {
 state.activeEra = idx; var er = ERAS[idx] || ERAS[2], en = isEn();
 document.getElementById('eraBadge').textContent = er.badge;
 document.getElementById('eraTitle').textContent = en ? er.titleEn : er.titleZh;
 document.getElementById('eraDesc').textContent = en ? er.descEn : er.descZh;
 document.getElementById('eraKpis').innerHTML = (en ? er.kpisEn : er.kpisZh).map(function (k) { return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>'; }).join('');
 }

 function prepCanvas(id) {
 var c = document.getElementById(id); if (!c) return null;
 var rect = c.getBoundingClientRect(), w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5); c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
 var ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { c: c, ctx: ctx, w: w, h: h };
 }
 function roundRect(ctx, x, y, w, h, r) { if (w <= 0 || h <= 0) return; var rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2); ctx.beginPath(); ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr); ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath(); }
 function drawSmoothLine(ctx, pts) { if (!pts.length) return; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); for (var i = 0; i < pts.length - 1; i++) { var xc = (pts[i].x + pts[i + 1].x) / 2; ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y); } }
 function drawValueBadge(ctx, text, cx, cy, fgColor, pal, maxW, maxH) { ctx.save(); ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; var tw = ctx.measureText(text).width + 10, th = 17; var bx = cx; if (maxW) bx = Math.max(tw / 2 + 4, Math.min(maxW - tw / 2 - 4, cx)); var by = cy; if (maxH) by = Math.max(th / 2 + 2, Math.min(maxH - th / 2 - 2, cy)); ctx.fillStyle = pal.pillBg; roundRect(ctx, bx - tw / 2, by - th / 2, tw, th, 5); ctx.fill(); ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, bx, by + 0.5); ctx.restore(); }

 function drawEraCanvas() {
 var env = prepCanvas('eraCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hits.eraCanvas = [];
 var pad = { top: 28, right: 20, bottom: 38, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var yrs = ['FY22', 'FY23', 'FY24', 'FY25', '9M\'26'];
 var vals = state.eView === 'rev' ? [130.6, 247.6, 393.8, 431.8, 326.9] : [10.4, 11.0, 12.7, 16.5, 14.0];
 var maxV = state.eView === 'rev' ? 480 : 20, slot = pw / yrs.length, bw = Math.min(42, slot * 0.54);
 for (var g = 0; g <= 4; g++) { var gy = pad.top + ph - (g / 4) * ph; ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke(); ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText('¥' + ((maxV / 4) * g).toFixed(0) + 'B', pad.left - 8, gy + 4); }
 yrs.forEach(function (y, i) {
 var cx = pad.left + i * slot + slot / 2, bh = (vals[i] / maxV) * ph, yt = pad.top + ph - bh;
 ctx.fillStyle = i >= 3 ? pal.green : pal.blue; roundRect(ctx, cx - bw / 2, yt, bw, bh, 6); ctx.fill();
 drawValueBadge(ctx, '¥' + vals[i].toFixed(1) + 'B', cx, yt - 12, i >= 3 ? pal.green : pal.blue, pal);
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center'; ctx.fillText(y, cx, pad.top + ph + 20);
 hits.eraCanvas.push({ idx: i, x: pad.left + i * slot, y: pad.top, w: slot, h: ph + 24, title: y, body: (state.eView === 'rev' ? 'Revenue: ¥' : 'R&D Spend: ¥') + vals[i].toFixed(1) + 'B' });
 });
 }

 function drawGenomeCanvas() {
 var env = prepCanvas('genomeCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.genomeCanvas = [];
 var pad = { top: 18, right: 64, bottom: 24, left: 134 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var peers = [
 { name: 'NVIDIA (Flat)', emp: 5.14, gm: 71.1, col: pal.violet },
 { name: 'Apple (Single P&L)', emp: 2.87, gm: 48.8, col: pal.blue },
 { name: 'PDD (Atomic Flat)', emp: 2.42, gm: 58.2, col: pal.green },
 { name: 'Alibaba (Multi-BG)', emp: 0.72, gm: 38.0, col: pal.amber },
 { name: 'JD.com (1P Fleet)', emp: 0.28, gm: 15.5, col: pal.blue }
 ];
 var isEmp = state.gView === 'emp', maxX = isEmp ? 5.8 : 80, rowH = ph / peers.length;
 peers.forEach(function (p, idx) {
 var val = isEmp ? p.emp : p.gm, cy = pad.top + idx * rowH + rowH / 2, bl = (val / maxX) * pw;
 ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - 11, pw, 22, 5); ctx.fill();
 ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - 11, bl, 22, 5); ctx.fill();
 ctx.fillStyle = idx === 2 ? pal.green : pal.sub; ctx.font = (idx === 2 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(p.name, pad.left - 10, cy + 4);
 ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left'; ctx.fillText(isEmp ? ('$' + val.toFixed(2) + 'M') : (val.toFixed(1) + '%'), pad.left + bl + 8, cy + 4);
 hits.genomeCanvas.push({ idx: idx, x: 0, y: cy - rowH / 2, w: w, h: rowH, title: p.name, body: 'Rev/FTE: $' + p.emp.toFixed(2) + 'M · GM: ' + p.gm.toFixed(1) + '%' });
 });
 }

 var entropySeries = [94, 88, 76, 63, 51];
 function drawEntropyCanvas() {
 var env = prepCanvas('entropyCanvas'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(), en = isEn();
 hits.entropyCanvas = [];
 var pad = { top: 24, right: 44, bottom: 28, left: 46 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var lbls = en ? ['25k (PDD)', '50k', '80k', '120k', '150k (Rival)'] : ['2.5万 (PDD)', '5万人', '8万人', '12万人', '15万人 (大厂)'];
 for (var eg = 0; eg <= 2; eg++) {
 var egy = pad.top + ph - (eg / 2) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, egy); ctx.lineTo(pad.left + pw, egy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right'; ctx.fillText(String(eg * 50), pad.left - 6, egy + 3);
 }
 var pts = entropySeries.map(function (v, i) { return { x: pad.left + (i / 4) * pw, y: pad.top + ph - (v / 100) * ph, v: v }; });
 ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.6; drawSmoothLine(ctx, pts); ctx.stroke();
 var slot = pw / 4;
 pts.forEach(function (pt, i) {
 ctx.fillStyle = i === 0 ? pal.green : pal.violet; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, String(Math.round(pt.v)), pt.x, pt.y - 13, i === 0 ? pal.green : pal.violet, pal, w, h);
 ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif'; ctx.textAlign = i === 0 ? 'left' : (i === 4 ? 'right' : 'center'); ctx.fillText(lbls[i], i === 0 ? Math.max(4, pt.x - 12) : (i === 4 ? Math.min(w - 4, pt.x + 12) : pt.x), pad.top + ph + 16);
 hits.entropyCanvas.push({ idx: i, x: pt.x - slot / 2, y: pad.top, w: slot, h: ph + 24, title: lbls[i], body: (en ? 'Agility Score: ' : '组织敏捷度评分: ') + Math.round(pt.v) + ' / 100' });
 });
 }

 function updateEntropySim() {
 var fte = parseFloat(document.getElementById('rngFte').value), algo = parseInt(document.getElementById('rngAlgo').value, 10), sup = parseInt(document.getElementById('rngSup').value, 10), en = isEn();
 document.getElementById('valFte').textContent = fte.toFixed(2) + (en ? '0k FTEs' : ' 万人');
 document.getElementById('valAlgo').textContent = algo + '%';
 document.getElementById('valSup').textContent = sup + '%';
 var ag = Math.max(30, Math.min(99, Math.round(92 - (fte - 2.55) * 3.8 + (algo - 80) * 0.4)));
 var ga = Math.max(1.2, 1.54 + (fte - 2.55) * 0.35).toFixed(1);
 var rpe = (43.18 / fte).toFixed(1);
 document.getElementById('outEff').textContent = ag + ' / 100';
 document.getElementById('outGa').textContent = ga + '%';
 document.getElementById('outRpe').textContent = '¥' + rpe + 'M';
 entropySeries = [2.55, 5.0, 8.0, 12.0, 15.0].map(function (f) { return Math.max(28, Math.min(98, 92 - (f - 2.55) * 3.8 + (algo - 80) * 0.4)); });
 drawEntropyCanvas();
 }
 ['rngFte', 'rngAlgo', 'rngSup'].forEach(function (id) { document.getElementById(id).addEventListener('input', updateEntropySim); });

 function drawAll() { drawEraCanvas(); drawGenomeCanvas(); drawEntropyCanvas(); }
 function applyTheme(t, silent) {
 state.theme = (t === 'dark') ? 'dark' : 'light'; document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark' ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
 if (sl && sd) { sl.setAttribute('aria-pressed', String(state.theme === 'light')); sd.setAttribute('aria-pressed', String(state.theme === 'dark')); }
 drawAll(); if (!silent) showToast(isEn() ? (state.theme === 'dark' ? 'Dark Mode' : 'Light Mode') : (state.theme === 'dark' ? '已切换深色模式' : '已切换浅色模式'));
 }
 function applyLang(lang, silent) {
 state.lang = (lang === 'en') ? 'en' : 'zh'; var en = isEn();
 document.documentElement.lang = en ? 'en' : 'zh-CN'; document.title = en ? TITLE_EN : TITLE_ZH;
 document.getElementById('langZhBtn').classList.toggle('active', !en); document.getElementById('langEnBtn').classList.toggle('active', en);
 document.querySelectorAll('[data-i18n-zh]').forEach(function (el) { var v = el.getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh'); if (v !== null) { if (v.indexOf('<span') !== -1) el.innerHTML = v; else el.textContent = v; } });
 document.querySelectorAll('[data-i18n-rich]').forEach(function (el) { var rk = el.getAttribute('data-i18n-rich'); if (RICH_I18N[rk]) el.innerHTML = en ? RICH_I18N[rk].en : RICH_I18N[rk].zh; });
 document.querySelectorAll('[data-i18n-ph-zh]').forEach(function (el) { el.setAttribute('placeholder', el.getAttribute(en ? 'data-i18n-ph-en' : 'data-i18n-ph-zh')); });
 renderTopo(state.topoMode); renderQuad(state.activeQuad); renderEra(state.activeEra); updateEntropySim(); refreshAuditChip(); drawAll();
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 document.getElementById('topoSwitch').addEventListener('click', function (e) { var b = e.target.closest('[data-topo]'); if (!b) return; document.querySelectorAll('#topoSwitch .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); renderTopo(b.getAttribute('data-topo')); });
 document.getElementById('quadGrid').addEventListener('click', function (e) { var c = e.target.closest('[data-quad]'); if (!c) return; document.querySelectorAll('#quadGrid .cc-quad-card').forEach(function (x) { x.classList.toggle('active', x === c); }); renderQuad(parseInt(c.getAttribute('data-quad'), 10) || 0); });
 document.getElementById('eraTabs').addEventListener('click', function (e) { var t = e.target.closest('[data-era]'); if (!t) return; document.querySelectorAll('#eraTabs .cc-era-tab').forEach(function (x) { x.classList.toggle('active', x === t); }); renderEra(parseInt(t.getAttribute('data-era'), 10) || 0); });
 document.getElementById('eChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-eview]'); if (!b) return; state.eView = b.getAttribute('data-eview'); document.querySelectorAll('#eChartTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); drawEraCanvas(); });
 document.getElementById('gChartTabs').addEventListener('click', function (e) { var b = e.target.closest('[data-gview]'); if (!b) return; state.gView = b.getAttribute('data-gview'); document.querySelectorAll('#gChartTabs .mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); }); drawGenomeCanvas(); });

 function bindTip(cid) {
 var c = document.getElementById(cid), tip = document.getElementById('chartTooltip'); if (!c || !tip) return;
 c.addEventListener('mousemove', function (ev) {
 var r = c.getBoundingClientRect(), mx = ev.clientX - r.left, my = ev.clientY - r.top, arr = hits[cid] || [], hit = null;
 for (var i = 0; i < arr.length; i++) { var rg = arr[i]; if (mx >= rg.x && mx <= rg.x + rg.w && my >= rg.y && my <= rg.y + rg.h) { hit = rg; break; } }
 if (hit) { tip.innerHTML = '<div style="font-weight:800;color:var(--mui-primary-lighter);margin-bottom:2px;">' + hit.title + '</div><div>' + hit.body + '</div>'; tip.style.display = 'block'; tip.style.left = Math.min(window.innerWidth - 305, Math.max(12, ev.clientX + 14)) + 'px'; tip.style.top = Math.min(window.innerHeight - tip.offsetHeight - 12, Math.max(12, ev.clientY - 28)) + 'px'; } else tip.style.display = 'none';
 });
 c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }
 bindTip('eraCanvas'); bindTip('genomeCanvas'); bindTip('entropyCanvas');

 var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
 var QIDX = [{ id: 'sec-c0', t: 'C0 原子化拓扑与极简悖论' }, { id: 'sec-c1', t: 'C1 四大文化基因与时间罗盘' }, { id: 'sec-c2', t: 'C2 三代治理演进时间轴' }, { id: 'sec-c3', t: 'C3 巨头组织基因光谱对比' }, { id: 'sec-c4', t: 'C4 组织熵增模拟器与六律体检' }];
 qIn.addEventListener('focus', function () { qPop.innerHTML = QIDX.map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span></button>'; }).join(''); qPop.classList.add('open'); });
 qIn.addEventListener('input', function () { var q = qIn.value.toLowerCase(); qPop.innerHTML = QIDX.filter(function (x) { return x.t.toLowerCase().indexOf(q) !== -1; }).map(function (x) { return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span></button>'; }).join(''); qPop.classList.add('open'); });
 qPop.addEventListener('click', function (e) { var jb = e.target.closest('[data-jump]'); if (!jb) return; document.querySelector(jb.getAttribute('data-jump')).scrollIntoView({ behavior: 'smooth' }); qPop.classList.remove('open'); });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); } });

 var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 sbBtn.addEventListener('click', function () { if (window.innerWidth < 1024) { var op = sb.classList.toggle('open'); bd.classList.toggle('open', op); } else { var c = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1'; if (c) document.documentElement.setAttribute('data-sidebar-collapsed', '1'); else document.documentElement.removeAttribute('data-sidebar-collapsed'); setTimeout(drawAll, 60); } });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
 window.addEventListener('scroll', function () { var bar = document.getElementById('readingProgressBar'), dh = document.documentElement.scrollHeight - window.innerHeight; if (bar) bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%'; }, { passive: true });

 function refreshAuditChip() {
 var boxes = document.querySelectorAll('[data-cchk]'), done = 0;
 for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
 document.getElementById('auditScoreChip').textContent = isEn() ? ('Culture Audit: ' + done + ' / ' + boxes.length) : ('文化自检核验：' + done + ' / ' + boxes.length + ' 项');
 }
 try {
 var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
 document.querySelectorAll('[data-cchk]').forEach(function (chk) {
 var k = chk.getAttribute('data-cchk'); chk.checked = !!savedA[k];
 chk.addEventListener('change', function () { savedA[k] = chk.checked; try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {} refreshAuditChip(); });
 });
 } catch (e) {}

 document.getElementById('sideLightBtn')?.addEventListener('click', function () { applyTheme('light', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {} });
 document.getElementById('sideDarkBtn')?.addEventListener('click', function () { applyTheme('dark', false); try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {} });
 document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });
 document.getElementById('sideExportBtn')?.addEventListener('click', function () { var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }); var url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'PDD_Corporate_Culture_Blueprint.html'; a.click(); setTimeout(function () { URL.revokeObjectURL(url); }, 1500); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { var nxt = state.theme === 'dark' ? 'light' : 'dark'; applyTheme(nxt, false); try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {} });
 document.getElementById('langSwitchGroup').addEventListener('click', function (e) { var lb = e.target.closest('[data-lang]'); if (!lb) return; var nl = lb.getAttribute('data-lang'); applyLang(nl, false); try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {} });

 try {
 applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
 applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
 } catch (e) { applyLang('zh', true); }
 window.addEventListener('resize', function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 90); });
 window.addEventListener('load', drawAll);
 if (typeof ResizeObserver !== 'undefined') { var _ro = new ResizeObserver(function () { clearTimeout(window._rt); window._rt = setTimeout(drawAll, 60); }); document.querySelectorAll('.cc-canvas-wrap').forEach(function (b) { _ro.observe(b); }); }
 })();
 