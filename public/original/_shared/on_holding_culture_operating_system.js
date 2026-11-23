
 (function () {
  'use strict';

  var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
  var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
  var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
  var STORAGE_AUDIT_KEY = 'onon_culture_bp_audit_v1';

  var state = { theme: 'dark', lang: 'zh', topo: 'onon', quad: 0, era: 2, eView: 'sales', gView: 'gm' };
  var hits = { eraCanvas: [], genomeCanvas: [] };

  function isEn() { return state.lang === 'en'; }

  function showToast(msg) {
   var bar = document.getElementById('muiSnackbar');
   if (!bar) return;
   bar.textContent = msg;
   bar.classList.add('show');
   clearTimeout(bar._t);
   bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2200);
  }

  function getPalette() {
   var dark = document.documentElement.getAttribute('data-theme') === 'dark';
   return {
    dark: dark,
    text: dark ? '#F3F6F9' : '#0F172A',
    sub: dark ? '#B2BAC2' : '#334155',
    tick: dark ? '#94A3B8' : '#475569',
    grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
    blue: dark ? '#3399FF' : '#0073E6',
    green: dark ? '#22C55E' : '#16A34A',
    violet: dark ? '#A78BFA' : '#7C3AED',
    amber: dark ? '#FFB74D' : '#D97706',
    red: dark ? '#FF6B6B' : '#DC2626'
   };
  }

  var C0_LEAD = {
   zh: '管理学界曾长期好奇：昂跑如何从苏黎世教区活动中心里的 <strong>15 人小团队</strong>，在无任何大规模裁员重组的前提下扩张至近 <strong>4,000 名员工</strong>与 <strong>CHF 30.1亿+</strong> 年营收，同时创下 <strong>66.9% 的行业最高基础毛利率</strong>？前高管团队在 Thinkers50 访谈中给出了核心隐喻——<strong>“椋鸟群（Murmuration of Starlings）”</strong> <a class="cite-link" href="https://thinkers50.com/blog/guided-by-culture-to-navigate-rapid-growth/" target="_blank" rel="noopener noreferrer">Thinkers50 椋鸟隐喻 ↗</a>： 不同于传统运动大厂层层审批的金字塔指令，昂跑通过<strong>五大精神（Five Spirits）</strong>让每个跨学科小组紧盯身边最紧密的 7 个协作节点敏捷转向；而在顶层，2026 年 5 月<strong>联合创始人 David Allemann 与 Caspar Coppetti 重任联席 CEO</strong>，并由前戴森 COO <strong>Scott Maguire 出任总裁兼 COO 统管从实验室研发、LightSpray 智造到全球商业运营的唯一主干网</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1858985/000095010326004606/dp244091_ex9901.htm" target="_blank" rel="noopener noreferrer">SEC 2026 治理公报 ↗</a>，从组织根源上消灭了传统品牌“区域销售总监为冲季度奖金向奥莱倾销尾货”的毒瘤。',
   en: 'How did On scale from <strong>15 people in a Zurich parish hall</strong> to nearly <strong>4,000 employees</strong> and <strong>CHF 3.01B+</strong> in sales with zero mass layoffs—while achieving an industry-record <strong>66.9% underlying gross margin</strong>? Leadership describes On as a <strong>"Murmuration of Starlings"</strong> <a class="cite-link" href="https://thinkers50.com/blog/guided-by-culture-to-navigate-rapid-growth/" target="_blank" rel="noopener noreferrer">Thinkers50 Study ↗</a>: rather than rigid top-down hierarchies, cross-functional pods align instinctively via the <strong>Five Spirits</strong>; at the apex, <strong>Co-Founders David Allemann and Caspar Coppetti serve as Co-CEOs</strong> while ex-Dyson COO <strong>Scott Maguire oversees one unified R&amp;D-to-commercial spine</strong> <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1858985/000095010326004606/dp244091_ex9901.htm" target="_blank" rel="noopener noreferrer">SEC Filing ↗</a>—preventing regional sales silos from dumping discounted inventory.'
  };

  var C0_QUOTE = {
   zh: '<strong>核心文化宣言（Caspar Coppetti · 2026 投资者日）：</strong>“这是一套敢于说‘Yes’的文化（Culture of Yes）——可能性永远压倒约束。在昂跑，失败不是尝试后未达预期，真正的失败是从未起脚射门。当最大胆疯狂的创意出现时，Olivier、David 和我依然站在第一线说 Yes。” <a class="cite-link" href="https://stockanalysis.com/stocks/onon/transcripts/748336-investor-day-2026/" target="_blank" rel="noopener noreferrer">2026 投资者日演讲 ↗</a>',
   en: '<strong>Cultural Manifesto (Caspar Coppetti · 2026 Investor Day):</strong> "This is a Culture of Yes—where possibility beats constraint. Failure is not trying and falling short; failure is never taking the shot. When the boldest ideas show up, Olivier, David, and I are right there saying yes." <a class="cite-link" href="https://stockanalysis.com/stocks/onon/transcripts/748336-investor-day-2026/" target="_blank" rel="noopener noreferrer">Investor Day Transcript ↗</a>'
  };

  function renderTopo() {
   var stage = document.getElementById('topoStage');
   if (state.topo === 'onon') {
    stage.innerHTML = isEn()
     ? '<div class="cc-topo-hub mono">Co-CEOs (Allemann &amp; Coppetti) × President/COO (Maguire) Unified Spine</div>' +
       '<div class="cc-topo-spokes">' +
       '<div class="cc-spoke"><b>On Labs Pod</b>Olivier Bernhard &amp; chemists test Surreal™ daily</div>' +
       '<div class="cc-spoke"><b>LightSpray™</b>Zurich + Busan 36 robots run identical Swiss code</div>' +
       '<div class="cc-spoke"><b>Design &amp; Apparel</b>Thilo Brunner &amp; Marolf unify shoe-to-apparel DNA</div>' +
       '<div class="cc-spoke"><b>Equity Icons</b>Federer, Zendaya &amp; Mbappé co-create in Zurich</div>' +
       '<div class="cc-spoke"><b>CGMO Markets</b>Rebecca Cai enforces global full-price allocation</div>' +
       '<div class="cc-spoke"><b>~100 Brand Hubs</b>Zero outlet dumping · >20% flagship apparel mix</div>' +
       '</div>' +
       '<div class="cc-topo-outcome">Outcome: Q2\'26 held back US wholesale sell-in → Q3\'26 hit record CHF 931.4M &amp; 66.9% underlying GM</div>'
     : '<div class="cc-topo-hub mono">联席CEO (Allemann &amp; Coppetti) × 总裁兼COO (Maguire) 单一全价值链主干</div>' +
       '<div class="cc-topo-spokes">' +
       '<div class="cc-spoke"><b>苏黎世实验室 Pod</b>Bernhard 与化学家/跑者同楼日测原型</div>' +
       '<div class="cc-spoke"><b>LightSpray 智造</b>苏黎世4台+釜山32台共享同一套瑞士代码</div>' +
       '<div class="cc-spoke"><b>设计与全身服饰</b>鞋服统一审美语言，拒绝贴牌代工凑数</div>' +
       '<div class="cc-spoke"><b>共同创业者生态</b>费德勒 / Zendaya / 姆巴佩深度入局研发</div>' +
       '<div class="cc-spoke"><b>全球市场统管</b>CGMO Rebecca Cai 严控全球正价配额门禁</div>' +
       '<div class="cc-spoke"><b>~100家品牌中心</b>不设清仓奥莱指标，旗舰店服饰占比 >20%</div>' +
       '</div>' +
       '<div class="cc-topo-outcome">结果：2026Q2 敢于主动控货保健康库存 → Q3 兑现创纪录 CHF 931.4M 营收与 66.9% 基础毛利率</div>';
   } else {
    stage.innerHTML = isEn()
     ? '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">Legacy Sportswear Holding · Regional &amp; Category GMs Chasing Quarterly Volume</div>' +
       '<div class="cc-topo-spokes">' +
       '<div class="cc-spoke silo"><b>Footwear Unit</b>Over-produces retro cash cows, starves new foam R&amp;D</div>' +
       '<div class="cc-spoke silo"><b>Apparel Licensing</b>Disconnected basics heavily discounted at department stores</div>' +
       '<div class="cc-spoke silo"><b>Asian OEM Chain</b>200 manual steps · 9-month lead time &amp; tariff exposure</div>' +
       '<div class="cc-spoke silo"><b>Paid Endorsements</b>Fixed $50M+ ad contracts with zero lab co-design</div>' +
       '<div class="cc-spoke silo"><b>Regional Sales VPs</b>Stuff wholesale channels at quarter-end to hit bonuses</div>' +
       '<div class="cc-spoke silo"><b>Factory Outlets</b>40% off promos train consumers never to buy full price</div>' +
       '</div>' +
       '<div class="cc-topo-outcome warn">Consequence: Classic volume trap—bloated channel inventory crushes gross margin down to 42%–46%</div>'
     : '<div class="cc-topo-hub mono" style="border-color:var(--mui-error-border);">传统运动大厂 · 区域与品类总经理各自背负季度冲量返点 KPI</div>' +
       '<div class="cc-topo-spokes">' +
       '<div class="cc-spoke silo"><b>经典鞋事业部</b>无限翻印复古旧款吃老本，挤压前沿材料预算</div>' +
       '<div class="cc-spoke silo"><b>服饰贴牌部门</b>与鞋履设计脱节，沦为百货商场常年五折引流品</div>' +
       '<div class="cc-spoke silo"><b>200道代工长链</b>提前9个月盲目下期货，滞销库存堆积如山</div>' +
       '<div class="cc-spoke silo"><b>天价现金代言</b>球星只拍广告不进实验室，营销费率居高不下</div>' +
       '<div class="cc-spoke silo"><b>大区销售诸侯</b>季末向批发商强行塞货冲业绩，透支下季需求</div>' +
       '<div class="cc-spoke silo"><b>奥特莱斯清仓网</b>常年六折促销，彻底摧毁中产正价购买意愿</div>' +
       '</div>' +
       '<div class="cc-topo-outcome warn">恶果：典型“规模反噬毛利”陷阱——渠道窜货与打折把综合毛利率压制在 42%–46% 区间</div>';
   }
  }

  var QUADS = [
   {
    badge: 'Q1 · CULTURE OF YES IN ON LABS',
    zhT: '双速管理艺术：前端研发极度开放 × 后端渠道极度克制',
    enT: 'Dual-Speed Leadership: Radical Openness in R&D × Strict Restraint in Channels',
    zhD: '在苏黎世实验室，任何反常规原型（如无中底推进板的 Cloudmonster Hyper 或单丝喷织的 LightSpray）都受到“Culture of Yes”鼓励；创始人亲自把近四成核心精力投向突破性产品拍板。',
    enD: 'Inside On Labs, contrarian prototypes receive immediate founder backing under the "Culture of Yes," dedicating >40% of executive bandwidth to frontier product breakthroughs.',
    alloc: [42, 28, 18, 12]
   },
   {
    badge: 'Q2 · STARLING MURMURATION & EARNED LEADERSHIP',
    zhT: '椋鸟群智协同：没有金字塔命令，靠邻近节点信号高频自组织',
    enT: 'Starling Murmuration: Self-Organizing Cross-Functional Pods Without Bureaucracy',
    zhD: '当员工从 1,158 人扩至 3,963 人时，昂跑没有增设冗长中层审批链，而是依靠高透明度目标与运动社群纽带，把日常跑团运营与门店陈列自主权下放给一线团队。',
    enD: 'Scaling from 1,158 to 3,963 FTEs without bureaucratic bloat, On empowers local pods to run grassroots run clubs and retail hubs autonomously.',
    alloc: [28, 22, 26, 24]
   },
   {
    badge: 'Q3 · PREMIUM PLAYBOOK GATEKEEPING',
    zhT: '全价北极星铁律：宁可承受短期华尔街质疑，绝不向促销妥协',
    enT: 'Full-Price Northstar: Holding Back Wholesale Supply to Protect Desirability',
    zhD: '高端品牌最难的不是顺风期涨价，而是逆风期管住发货冲动。管理层将重兵投入全球批发准入审核与库存水位监控，确保昂跑在欧美百货保持最高正价售罄率。',
    enD: 'Luxury discipline is tested in promotional markets: leadership heavily prioritizes wholesale door curation and sell-through monitoring to defend ≥65% gross margins.',
    alloc: [24, 46, 16, 14]
   },
   {
    badge: 'Q4 · CO-ENTREPRENEURSHIP & SURVIVOR SPIRIT',
    zhT: '利益共同体与生态硬约束：把代言人变股东，把环保变制造优势',
    enT: 'Co-Entrepreneur Equity & Circular Constraints Driving Manufacturing Edge',
    zhD: '无论是费德勒共创网球鞋、Zendaya 操刀女性服饰，还是 Survivor 精神倒逼出 8 部件无胶 LightSpray 工艺，昂跑擅长把外部约束转化为长期排他性壁垒。',
    enD: 'From Federer and Mbappé equity partnerships to Survivor Spirit material rules birthing glue-free LightSpray™, On turns long-term alignment into structural moat.',
    alloc: [36, 26, 24, 14]
   }
  ];

  var ERAS = [
   {
    badge: 'ERA I · 2010–2019 · KITCHEN TABLE & FIVE PARTNERS',
    zhT: '创业合伙期：从阿尔卑斯花园水管原型到全球独立跑店口碑黑马',
    enT: 'Founding Partnership Era: From Garden-Hose Prototypes to Run-Specialty Phenomenon',
    zhD: '2010 年三位创始人在苏黎世起步，2013 年吸纳 Marc Maurer 与 Martin Hoffmann 形成“五人平权合伙制”。面对耐克、阿迪达斯的渠道封锁，团队逐家拜访欧美专业跑店老板试穿，凭真实缓震口碑跨过首亿瑞郎门槛。',
    enD: 'Founded in 2010 by Bernhard, Allemann, and Coppetti—joined in 2013 by Maurer and Hoffmann—On bypassed mass advertising to win specialty running shops door by door.',
    kZh: [['2010 创立', '荣获 ISPO 全球体育创新金奖'], ['5人合伙制', '无单一独裁者的瑞士集体领导'], ['2019 破局', '罗杰·费德勒入股成为共同创业者'], ['零电视硬广', '靠跑店试穿与跑团口碑自然裂变']],
    kEn: [['2010 Launch', 'Won ISPO BrandNew Innovation Award'], ['5 Partners', 'Egalitarian Swiss co-leadership'], ['2019 Inflection', 'Roger Federer joined as Co-Entrepreneur'], ['$0 Mass TV Ads', 'Pure run-specialty word-of-mouth']]
   },
   {
    badge: 'ERA II · 2020–2026.04 · NYSE IPO & GLOBAL SCALING',
    zhT: '上市狂飙期：启用 17 层苏黎世 On Labs，四年跨越 CHF 30亿里程碑',
    enT: 'Post-IPO Hypergrowth Era: Opening 17-Story On Labs & Surpassing CHF 3.0B',
    zhD: '2021年9月纽交所成功上市后，昂跑顶住全球海运供应链冲击，启用苏黎世新总部大楼，推出 Cloudmonster、Cloudtilt 与 LOEWE 高奢联名，亚太业务暴涨 6 倍，FY2025 净营收达 CHF 3,014.0M、毛利率升至 62.8%。',
    enD: 'Following its Sept 2021 NYSE IPO, On opened its 17-story Zurich On Labs HQ, launched Cloudmonster, Cloudtilt, and LOEWE capsules, and scaled FY25 sales to CHF 3,014.0M (62.8% GM).',
    kZh: [['CHF 0.72B→3.01B', 'FY21–FY25 净营收暴增 4.16 倍'], ['1,158 → 3,963人', '连续四年零裁员高质量扩编'], ['+106.7% CC', 'FY2025 亚太区固定汇率翻倍增长'], ['CHF 1,020M', '2025 年末现金首破十亿瑞郎']],
    kEn: [['CHF 0.72B→3.01B', '4.16x Net Sales Expansion (FY21–FY25)'], ['1,158 → 3,963', 'Zero-layoff global talent expansion'], ['+106.7% CC', 'FY2025 APAC Constant-Currency Surge'], ['CHF 1,020M', 'Year-end 2025 cash topped CHF 1B']]
   },
   {
    badge: 'ERA III · 2026.05+ · FOUNDER CO-CEOs & END-TO-END SPINE',
    zhT: '2026年5月组织归一：创始人重回一线联席挂帅，前戴森 COO 拉通全价值链',
    enT: 'May 2026 Unification: Founder Co-CEOs Return Paired With Ex-Dyson COO Spine',
    zhD: '随着 Marc Maurer 与功勋 CEO Martin Hoffmann 相继圆满交棒，联合创始人 David Allemann 与 Caspar Coppetti 直接出任联席 CEO 兼联席董事长，提拔 Scott Maguire 任总裁兼 COO 统管全价值链，引入 CFO Frank Sluis 与首席独董 Laura Miele——冲刺 2029 CHF 56亿+ 新周期。',
    enD: 'Effective May 1, 2026, Founders Allemann & Coppetti assumed Co-CEO roles alongside President/COO Scott Maguire and CFO Frank Sluis—targeting ≥CHF 5.6B & ≥22% EBITDA by 2029.',
    kZh: [['CHF 3.47–3.56B', 'FY2026E 全年净营收指引区间'], ['66.9%', 'Q3 2026 历史最高基础毛利率'], ['≥CHF 5.6B', '2029 投资者日承诺净营收目标'], ['USD 1.0B', '首轮 Class A 股票回购计划']],
    kEn: [['CHF 3.47–3.56B', 'FY2026E Net Sales Guidance'], ['66.9%', 'Q3 2026 Record Underlying GM'], ['≥CHF 5.6B', '2029 Investor Day Net Sales Target'], ['USD 1.0B', 'Inaugural Class A Share Buyback']]
   }
  ];

  function renderQuad() {
   var q = QUADS[state.quad] || QUADS[0];
   document.getElementById('dialBadge').textContent = q.badge;
   document.getElementById('dialTitle').textContent = isEn() ? q.enT : q.zhT;
   document.getElementById('dialDesc').textContent = isEn() ? q.enD : q.zhD;
   [['Own', q.alloc[0]], ['Learn', q.alloc[1]], ['Teach', q.alloc[2]], ['Del', q.alloc[3]]].forEach(function (p) {
    document.getElementById('pct' + p[0]).textContent = p[1] + '%';
    document.getElementById('bar' + p[0]).style.width = p[1] + '%';
   });
  }

  function renderEra() {
   var er = ERAS[state.era] || ERAS[2];
   document.getElementById('eraBadge').textContent = er.badge;
   document.getElementById('eraTitle').textContent = isEn() ? er.enT : er.zhT;
   document.getElementById('eraDesc').textContent = isEn() ? er.enD : er.zhD;
   var ks = isEn() ? er.kEn : er.kZh;
   document.getElementById('eraKpis').innerHTML = ks.map(function (k) {
    return '<div class="cc-era-kpi"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
   }).join('');
  }

  // High-DPI Retina Canvas Engine
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

  function drawEraCanvas() {
   var env = prepCanvas('eraCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hits.eraCanvas = [];
   var pad = { top: 28, right: 20, bottom: 40, left: 54 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E*'];

   if (state.eView === 'sales') {
    var sales = [724.6, 1222.1, 1792.1, 2318.3, 3014.0, 3515.0];
    var maxS = 3900;
    for (var g = 0; g <= 3; g++) {
     var gv = g * 1300, gy = pad.top + ph - (gv / maxS) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(gv + 'M', pad.left - 7, gy + 4);
    }
    var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * slot + (slot - bw) / 2;
     var bh = (sales[i] / maxS) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = i >= 4 ? pal.green : pal.blue;
     roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(Math.round(sales[i]) + 'M', x + bw / 2, yt - 6);
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
     ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
     hits.eraCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' Net Sales', body: 'CHF ' + sales[i].toFixed(1) + 'M' });
    });
   } else {
    var eb = [96.4, 165.3, 276.9, 387.6, 567.0, 695.0];
    var maxE = 780;
    for (var k = 0; k <= 3; k++) {
     var kv = k * 260, ky = pad.top + ph - (kv / maxE) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(kv + 'M', pad.left - 7, ky + 4);
    }
    var s2 = pw / yrs.length, b2 = Math.min(40, s2 * 0.56);
    yrs.forEach(function (y, i) {
     var x = pad.left + i * s2 + (s2 - b2) / 2;
     var bh = (eb[i] / maxE) * ph, yt = pad.top + ph - bh;
     ctx.fillStyle = i >= 4 ? pal.violet : pal.blue;
     roundRect(ctx, x, yt, b2, bh, 6); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(eb[i].toFixed(0) + 'M', x + b2 / 2, yt - 6);
     ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
     ctx.fillText(y, x + b2 / 2, pad.top + ph + 20);
     hits.eraCanvas.push({ x: x, y: yt, w: b2, h: bh, title: y + ' Adjusted EBITDA', body: 'CHF ' + eb[i].toFixed(1) + 'M' });
    });
   }
  }

  function drawGenomeCanvas() {
   var env = prepCanvas('genomeCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hits.genomeCanvas = [];
   var pad = { top: 24, right: 48, bottom: 26, left: 126 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

   var peers = [
    { name: 'On (椋鸟群智)', nameEn: 'On (Murmuration)', gm: 66.9, emp: 0.88, col: pal.green },
    { name: 'Birkenstock (德产)', nameEn: 'Birkenstock (DE)', gm: 59.1, emp: 0.37, col: pal.blue },
    { name: 'Lululemon (直营)', nameEn: 'Lululemon (DTC)', gm: 58.5, emp: 0.28, col: pal.violet },
    { name: 'Deckers (双核)', nameEn: 'Deckers (HOKA)', gm: 57.0, emp: 0.91, col: pal.blue },
    { name: 'Nike (全球矩阵)', nameEn: 'Nike (Matrix)', gm: 42.9, emp: 0.63, col: pal.amber }
   ];
   var isGm = (state.gView === 'gm');
   var maxX = isGm ? 75 : 1.05;
   var rowH = ph / peers.length;
   peers.forEach(function (p, idx) {
    var val = isGm ? p.gm : p.emp;
    var cy = pad.top + idx * rowH + rowH / 2;
    var bh = 22, bl = (val / maxX) * pw;
    ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
    ctx.fillStyle = p.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
    ctx.fillStyle = pal.sub; ctx.font = (idx === 0 ? 'bold ' : '600 ') + '11px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(isEn() ? p.nameEn : p.name, pad.left - 10, cy + 4);
    ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
    ctx.fillText(isGm ? (val.toFixed(1) + '%') : ('$' + val.toFixed(2) + 'M'), pad.left + bl + 7, cy + 4);
    hits.genomeCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: isEn() ? p.nameEn : p.name, body: 'Gross Margin: ' + p.gm.toFixed(1) + '% · Rev/Employee: ~$' + p.emp.toFixed(2) + 'M' });
   });
  }

  // C4: Brand Scarcity Dilution Simulator
  var entropySeries = [67.2, 66.4, 62.5, 56.8, 49.5];
  function drawEntropyCanvas() {
   var env = prepCanvas('entropyCanvas');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   var pad = { top: 20, right: 18, bottom: 24, left: 42 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var lbls = isEn() ? ['15% Doors', '25% (On)', '45%', '70%', '90% (Mass)'] : ['15%高奢', '25%(昂跑)', '45%扩铺', '70%街铺', '90%(烂大街)'];
   var minG = 40, maxG = 72;
   ctx.strokeStyle = pal.grid;
   ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
   ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.5; ctx.beginPath();
   entropySeries.forEach(function (v, i) {
    var px = pad.left + (i / 4) * pw, py = pad.top + ph - ((v - minG) / (maxG - minG)) * ph;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
   });
   ctx.stroke();
   entropySeries.forEach(function (v, i) {
    var px = pad.left + (i / 4) * pw, py = pad.top + ph - ((v - minG) / (maxG - minG)) * ph;
    ctx.fillStyle = i === 1 ? pal.green : pal.violet;
    ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
    ctx.fillText(v.toFixed(1) + '%', px, py - 7);
    ctx.fillStyle = pal.tick; ctx.font = '10px sans-serif';
    ctx.fillText(lbls[i], px, pad.top + ph + 15);
   });
  }

  function updateEntropySim() {
   var doors = parseInt(document.getElementById('rngDoors').value, 10);
   var lab = parseInt(document.getElementById('rngLab').value, 10);
   var disc = parseInt(document.getElementById('rngDisc').value, 10);

   document.getElementById('valDoors').textContent = doors + '%' + (doors <= 30 ? (isEn() ? ' (Curated)' : ' (精选克制区)') : doors <= 60 ? (isEn() ? ' (Watch)' : ' (稀释警戒)') : (isEn() ? ' (Oversupplied)' : ' (泛滥折损)'));
   document.getElementById('valLab').textContent = lab + '%';
   document.getElementById('valDisc').textContent = disc + '%';

   var doorPen = Math.max(0, (doors - 25) * 0.45);
   var labBonus = (lab - 60) * 0.28;
   var discPen = (disc - 8) * 0.65;

   var desire = Math.max(30, Math.min(99, Math.round(86 + labBonus - doorPen - discPen * 0.5)));
   var fullP = Math.max(45, Math.min(96, Math.round(100 - disc - doorPen * 0.25)));
   var gm = Math.max(43.0, Math.min(69.0, 66.9 + (lab - 90) * 0.08 - Math.max(0, doors - 25) * 0.16 - (disc - 8) * 0.34));

   document.getElementById('outDesire').textContent = desire + ' / 100';
   document.getElementById('outFullPrice').textContent = fullP + '%';
   document.getElementById('outGmSim').textContent = gm.toFixed(1) + '%';

   entropySeries = [15, 25, 45, 70, 90].map(function (d) {
    return Math.max(43.0, Math.min(69.5, 66.9 + (lab - 90) * 0.08 - Math.max(0, d - 25) * 0.18 - (disc - 8) * 0.34));
   });
   drawEntropyCanvas();
  }

  ['rngDoors', 'rngLab', 'rngDisc'].forEach(function (id) {
   document.getElementById(id).addEventListener('input', updateEntropySim);
  });

  function applyTheme(t, silent) {
   state.theme = (t === 'dark') ? 'dark' : 'light';
   document.documentElement.setAttribute('data-theme', state.theme);
   var ic = document.getElementById('appbarThemeIcon');
   if (ic) {
    ic.innerHTML = state.theme === 'dark'
     ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
     : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
   }
   
   
   drawAll();
   if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Dark Mode' : '已切换至深色外观') : (isEn() ? 'Light Mode' : '已切换至浅色外观'));
  }

  function refreshAuditChip() {
   var boxes = document.querySelectorAll('[data-cchk]');
   var done = 0;
   for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
   document.getElementById('auditScoreChip').textContent = isEn() ? ('Cultural Audit: ' + done + ' / ' + boxes.length) : ('文化自检核验：' + done + ' / ' + boxes.length + ' 项');
  }

  function applyLang(lang, silent) {
   state.lang = (lang === 'en') ? 'en' : 'zh';
   document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
   document.getElementById('langZhBtn').classList.toggle('active', !isEn());
   document.getElementById('langEnBtn').classList.toggle('active', isEn());
   var nodes = document.querySelectorAll('[data-i18n-zh]');
   for (var i = 0; i < nodes.length; i++) {
    var val = nodes[i].getAttribute(isEn() ? 'data-i18n-en' : 'data-i18n-zh');
    if (val !== null) {
     if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
     else nodes[i].textContent = val;
    }
   }
   document.getElementById('c0Lead').innerHTML = isEn() ? C0_LEAD.en : C0_LEAD.zh;
   document.getElementById('c0Quote').innerHTML = isEn() ? C0_QUOTE.en : C0_QUOTE.zh;
   document.getElementById('quickJumpInput').placeholder = isEn() ? 'Jump to module or law…' : '检索文化法则或高管…';
   renderTopo();
   renderQuad();
   renderEra();
   refreshAuditChip();
   updateEntropySim();
   drawAll();
   if (!silent) showToast(isEn() ? 'Switched to English' : '已切换为中文视图');
  }

  document.getElementById('topoSwitch').addEventListener('click', function (e) {
   var b = e.target.closest('[data-topo]');
   if (!b) return;
   state.topo = b.getAttribute('data-topo');
   this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
   renderTopo();
  });

  document.getElementById('quadGrid').addEventListener('click', function (e) {
   var card = e.target.closest('[data-quad]');
   if (!card) return;
   state.quad = parseInt(card.getAttribute('data-quad'), 10) || 0;
   this.querySelectorAll('.cc-quad-card').forEach(function (c) { c.classList.toggle('active', c === card); });
   renderQuad();
  });

  document.getElementById('eraTabs').addEventListener('click', function (e) {
   var t = e.target.closest('[data-era]');
   if (!t) return;
   state.era = parseInt(t.getAttribute('data-era'), 10) || 0;
   this.querySelectorAll('.cc-era-tab').forEach(function (x) { x.classList.toggle('active', x === t); });
   renderEra();
  });

  function bindSegChart(gid, attr, skey, fn) {
   document.getElementById(gid).addEventListener('click', function (e) {
    var b = e.target.closest('[' + attr + ']');
    if (!b) return;
    state[skey] = b.getAttribute(attr);
    this.querySelectorAll('.mui-seg-btn').forEach(function (x) { x.classList.toggle('active', x === b); });
    fn();
   });
  }
  bindSegChart('eChartTabs', 'data-eview', 'eView', drawEraCanvas);
  bindSegChart('gChartTabs', 'data-gview', 'gView', drawGenomeCanvas);

  ['eraCanvas', 'genomeCanvas'].forEach(function (cid) {
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
     tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
    } else tip.style.display = 'none';
   });
   c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
  });

  function drawAll() {
   drawEraCanvas();
   drawGenomeCanvas();
   drawEntropyCanvas();
  }

  // Suite Hub & Quick Jump
  var hub = document.getElementById('companySubfolderHub');
  hub.addEventListener('click', function (e) {
   var pill = e.target.closest('[data-co-cat]');
   if (pill) {
    var cat = pill.getAttribute('data-co-cat');
    hub.querySelectorAll('[data-co-cat]').forEach(function (p) { p.classList.toggle('active', p === pill); });
    hub.querySelectorAll('[data-co-item-cat]').forEach(function (it) {
     it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat));
    });
    return;
   }
   var item = e.target.closest('[data-sibling-doc]');
   if (item) {
    if (item.getAttribute('data-self-doc') === '1') window.scrollTo({ top: 0, behavior: 'smooth' });
    else showToast(isEn() ? ('Companion file in 4-page suite: ' + item.getAttribute('data-sibling-doc')) : ('请打开同套交付网页：《' + item.getAttribute('data-sibling-doc') + '》'));
   }
  });
  document.querySelector('[data-scroll-top="1"]').addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var QITEMS = [
   { id: 'sec-c0', t: 'C0 椋鸟群智拓扑与全价控货沙盘', s: '昂跑全链路一统 vs 传统运动大厂品类诸侯压货对比' },
   { id: 'sec-c1', t: 'C1 四大文化底层代码与领导力罗盘', s: 'Culture of Yes · 赢得式领导力 · 全价北极星 · 股权共创' },
   { id: 'sec-c2', t: 'C2 三阶段合伙人治理演进 (2010–2026+)', s: '创业三人组 → IPO狂飙 → 双创始人联席CEO + Maguire一统' },
   { id: 'sec-c3', t: 'C3 全球运动与鞋服组织基因光谱', s: '昂跑 vs 耐克 / 勃肯 / Lululemon / Deckers 对照' },
   { id: 'sec-c4', t: 'C4 渠道稀释熵增模拟器与六律体检', s: '批发泛滥与折扣妥协压力测试 · 6项文化持久化核查' }
  ];
  var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
  function renderQ(kw) {
   var q = (kw || '').trim().toLowerCase();
   var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
   qPop.innerHTML = m.map(function (x) {
    return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
   }).join('');
   qPop.classList.toggle('open', m.length > 0);
  }
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

  var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
  document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
   if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
   else {
    var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
    if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
    else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
    try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
    setTimeout(drawAll, 60);
   }
  });
  bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
  document.addEventListener('keydown', function (e) {
   if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
   if (e.key === 'Escape') { qPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
  });

  
  

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

  window.addEventListener('scroll', function () {
   var bar = document.getElementById('readingProgressBar');
   var dh = document.documentElement.scrollHeight - window.innerHeight;
   bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
  }, { passive: true });

  try {
   var savedA = JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY) || '{}');
   document.querySelectorAll('[data-cchk]').forEach(function (chk) {
    var k = chk.getAttribute('data-cchk');
    chk.checked = !!savedA[k];
    chk.addEventListener('change', function () {
     savedA[k] = chk.checked;
     try { localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(savedA)); } catch (err) {}
     refreshAuditChip();
     showToast(chk.checked ? (isEn() ? 'Checked moat indicator' : '已勾选该组织护城河指标') : (isEn() ? 'Unchecked' : '已取消勾选'));
    });
   });
  } catch (e) {}

  try {
   if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
   applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
   applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
  } catch (e) {
   renderTopo();
   renderQuad();
   renderEra();
   refreshAuditChip();
   updateEntropySim();
   drawAll();
  }

  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
 })();
 