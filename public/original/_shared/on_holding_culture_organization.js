
 (function () {
  'use strict';

  var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
  var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
  var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
  var STORAGE_CHECK_KEY = 'mui_onon_culture_checks_v1';

  var state = {
   lang: 'zh',
   theme: 'dark',
   ch1View: 'viewA',
   activePillar: 0,
   radarSeries: { onon: true, deck: true, legacy: true },
   ch1Series: { s1: true, s2: true },
   epsSeries: { eps: true, oci: true },
   peerFilter: 'all',
   peerQuery: '',
   sim: { principal: 10000, years: 5, priceCagr: 20.5, drip: true, preset: 'p1' },
   checks: [true, true, true, false, false, false]
  };

  function isEn() { return state.lang === 'en'; }

  function showToast(message) {
   var el = document.getElementById('muiSnackbar');
   if (!el) return;
   el.textContent = message;
   el.classList.add('show');
   clearTimeout(el._t);
   el._t = setTimeout(function () { el.classList.remove('show'); }, 2500);
  }

  var CH00_LEAD = {
   zh: '为什么百年运动用品行业几乎被美德老牌巨头垄断，唯独诞生于瑞士阿尔卑斯山下的<strong>昂跑（On Holding AG, NYSE: ONON）</strong>能在短短十六年间改写全球高端跑鞋与运动时尚版图？答案深植于三位联合创始人——铁人三项世界冠军 <strong>Olivier Bernhard</strong>、品牌战略家 <strong>David Allemann</strong> 与商业架构师 <strong>Caspar Coppetti</strong> 建立的<strong>“合伙人共治 + 椋鸟群智自治（Starling Murmuration）+ 五大精神（Five Spirits）”</strong>组织基因 <a class="cite-link" href="https://thinkers50.com/blog/guided-by-culture-to-navigate-rapid-growth/" target="_blank" rel="noopener noreferrer">Thinkers50 组织研究 ↗</a> <a class="cite-link" href="https://www.imd.org/research-knowledge/entrepreneurship/articles/in-the-field-with-sportswear-brand-on/" target="_blank" rel="noopener noreferrer">IMD 商学院案例 ↗</a>。 在苏黎世 17 层总部 <strong>On Labs</strong> 内，逾 <strong>30% 的建筑空间</strong>直接分配给生物力学跑道、超临界化学实验室与机械臂工坊；当同行在 2023–2026 年爆发大规模裁员（如耐克三年净减员超万人）时，昂跑连续多年保持<strong>零结构性裁员</strong>，员工总数稳步增至 <strong>3,963 人（FY2025 Form 20-F）</strong> <a class="cite-link" href="https://stockanalysis.com/stocks/onon/employees/" target="_blank" rel="noopener noreferrer">20-F 员工统计 ↗</a>， 驱动 FY2025 净营收首破 <strong>CHF 3,014.0M（+35.6% CC）</strong>、Q3 2026 单季创纪录达 <strong>CHF 931.4M</strong> 且剔除退税后基础毛利率高达 <strong>66.9%</strong> <a class="cite-link" href="https://press.on-running.com/on-reports-results-for-the-third-quarter-and-nine-month-period-ended-september-30-2026" target="_blank" rel="noopener noreferrer">Q3\'26 官方财报 ↗</a>。 2026 年 5 月 1 日，随着功勋 CEO Martin Hoffmann 圆满交棒，<strong>David Allemann 与 Caspar Coppetti 重任联席 CEO</strong>，并提拔前戴森 18 年运营统帅 <strong>Scott Maguire 出任总裁兼 COO</strong> 统管端到端价值链，以创始人直连一线执行的新架构冲刺 2029 年 <strong>≥CHF 5.6B</strong> 战略蓝图 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1858985/000095010326004606/dp244091_ex9901.htm" target="_blank" rel="noopener noreferrer">SEC 联席CEO公报 ↗</a>。',
   en: 'Why has virtually no newcomer cracked the global sportswear oligopoly in decades—except Swiss-born <strong>On Holding AG (NYSE: ONON)</strong>? The answer lies in the <strong>"Partner Co-Leadership + Starling Murmuration Autonomy + Five Spirits"</strong> architecture forged by six-time Ironman champion <strong>Olivier Bernhard</strong>, <strong>David Allemann</strong>, and <strong>Caspar Coppetti</strong> <a class="cite-link" href="https://thinkers50.com/blog/guided-by-culture-to-navigate-rapid-growth/" target="_blank" rel="noopener noreferrer">Thinkers50 Study ↗</a> <a class="cite-link" href="https://www.imd.org/research-knowledge/entrepreneurship/articles/in-the-field-with-sportswear-brand-on/" target="_blank" rel="noopener noreferrer">IMD Case ↗</a>. Inside its 17-story Zurich HQ <strong>On Labs</strong>, <strong>>30% of space</strong> houses biomechanics tracks, superfoam labs, and robotic cells. While peers conducted sweeping layoffs in 2023–2026, On maintained <strong>zero mass layoffs</strong> while scaling to <strong>3,963 FTEs (FY25 20-F)</strong> <a class="cite-link" href="https://stockanalysis.com/stocks/onon/employees/" target="_blank" rel="noopener noreferrer">20-F FTEs ↗</a>, delivering FY25 net sales of <strong>CHF 3,014.0M (+35.6% CC)</strong> and Q3 2026 records of <strong>CHF 931.4M</strong> and <strong>66.9% underlying gross margin</strong> <a class="cite-link" href="https://press.on-running.com/on-reports-results-for-the-third-quarter-and-nine-month-period-ended-september-30-2026" target="_blank" rel="noopener noreferrer">Q3\'26 Release ↗</a>. Effective May 1, 2026, <strong>Allemann and Coppetti resumed Co-CEO roles</strong> alongside ex-Dyson COO <strong>Scott Maguire as President &amp; COO</strong> to execute On\'s 2029 <strong>≥CHF 5.6B</strong> plan <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1858985/000095010326004606/dp244091_ex9901.htm" target="_blank" rel="noopener noreferrer">SEC Filing ↗</a>.'
  };

  var PILLAR_NOTES = {
   zh: [
    '<strong>当前选中支柱解读（01 探索者精神）：</strong>2010 年三位创始人用剪碎的花园橡胶水管粘在跑鞋底部时曾遭传统大厂嘲笑；正是探索者精神支持团队拿下 ISPO 创新金奖，并在 16 年后孕育出釜山 32 台全自动机械臂工厂 <a class="cite-link" href="https://culture.on.com/blog/the-origin-story-of-our-spirits/" target="_blank" rel="noopener noreferrer">On Spirits 起源 ↗</a>。',
    '<strong>当前选中支柱解读（02 运动员精神）：</strong>昂跑将职业铁人三项“高强度冲刺 + 科学恢复”移植进职场管理，既保持高目标饥饿感（2029 冲击 CHF 56亿），又拒绝低效加班内卷，实现高速成长期零大规模裁员。',
    '<strong>当前选中支柱解读（03 团队精神）：</strong>前联席 CEO 将昂跑团队比作天空中的“椋鸟群（Murmuration）”——没有僵化行政官僚发号施令，每个跨职能小组紧盯最邻近的 7 名伙伴与共同北极星极速转向协同 <a class="cite-link" href="https://thinkers50.com/blog/guided-by-culture-to-navigate-rapid-growth/" target="_blank" rel="noopener noreferrer">Thinkers50 ↗</a>。',
    '<strong>当前选中支柱解读（04 正向 Wow 与幸存者精神）：</strong>幸存者精神早年主动限制研发团队可用的高污染胶水与原生塑料清单，这种“带着脚镣跳舞”的生态约束反而直接催生了仅 8 个部件、零胶水的 LightSpray™ 革命。'
   ],
   en: [
    '<strong>Selected Pillar (01 · Explorer Spirit):</strong> When the founders glued sliced garden hoses onto shoe soles in 2010, legacy giants scoffed—yet Explorer curiosity won the ISPO BrandNew Award and birthed the 32-robot Busan LightSpray™ plant <a class="cite-link" href="https://culture.on.com/blog/the-origin-story-of-our-spirits/" target="_blank" rel="noopener noreferrer">On Spirits ↗</a>.',
    '<strong>Selected Pillar (02 · Athlete Spirit):</strong> Rooted in elite triathlon science, On pairs ambitious podium targets (≥CHF 5.6B by 2029) with active physical recovery—achieving rapid expansion with zero mass layoffs.',
    '<strong>Selected Pillar (03 · Team Spirit):</strong> Modeled on a starling murmuration, cross-functional pods align fluidly with adjacent teammates rather than waiting on top-down bureaucratic memos <a class="cite-link" href="https://thinkers50.com/blog/guided-by-culture-to-navigate-rapid-growth/" target="_blank" rel="noopener noreferrer">Thinkers50 ↗</a>.',
    '<strong>Selected Pillar (04 · Positive &amp; Survivor Spirits):</strong> Restricting virgin plastics and toxic adhesives early on forced engineers to invent 8-part, glue-free LightSpray™ uppers (-75% CO₂).'
   ]
  };

  var PEER_ROWS = {
   zh: [
    { category: 'craft', benchmark: true, company: '研究基准：昂跑 (On Holding · ONON)', leader: 'Allemann & Coppetti (联席CEO) / Maguire (COO)', positioning: '双创始人联席统帅 + 苏黎世 On Labs 跨学科 Pod + 单一全链路 COO', culture: '五大精神 + 椋鸟群智自治 + 全价控货纪律 + 费德勒式股权共创', headcount: '3,963人 (零裁员扩张) · 人均创收 CHF 0.76M (~$0.88M)', margins: 'FY25 营收 CHF 30.1亿 · Q3\'26 基础毛利率 66.9% · 现金 CHF 13.4亿', verdict: '瑞士工程与高奢控价完美融合：靠技术辨识度与配额纪律夺得全球运动行业第 1 毛利率。', sourceLabel: 'SEC FY25 20-F', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1858985/000185898526000008/onholdingag-20251231.htm' },
    { category: 'nam', benchmark: false, company: 'Deckers Brands (DECK · HOKA & UGG)', leader: 'Stefano Caroti (CEO)', positioning: '精简双核心品牌事业部 (HOKA 专业跑鞋 + UGG 时尚鞋履)', culture: '品牌聚焦 + 严格库存周转纪律 + 高比例自由现金流回购', headcount: '~6,000人 · 人均创收 $0.91M', margins: 'FY26 营收 $54.7亿 · 毛利率 ~57.0% · 营业利润率 23.1%', verdict: '昂跑最直接的跑道劲敌：HOKA ($25.9亿) 缓震心智极强，但服饰与奢侈品跨界深度弱于昂跑。', sourceLabel: 'Deckers FY26 10-K', sourceUrl: 'https://ir.deckers.com/news-events/press-releases/detail/656/deckers-brands-reports-fourth-quarter-and-full-fiscal-year-2026-financial-results' },
    { category: 'nam', benchmark: false, company: 'Lululemon Athletica (LULU)', leader: '门店教育家与社区大使驱动架构', positioning: '垂直自营 DTC 门店网络 (767+店) + 瑜伽/训练生活方式品类', culture: '门店“教育家 (Educators)”社群种草 + 全价直营零售基因', headcount: '~39,000人 (含庞大门店团队) · 人均创收 ~$0.28M', margins: 'FY25 营收 $111.0亿 · 毛利率 ~58.5%–59.2%', verdict: '昂跑“Win with Her”服饰学习的标杆：验证了运动社群门店可支撑百亿美元高毛利衣橱。', sourceLabel: 'LULU 10-K', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1397187/000139718726000020/lulu-20260201.htm' },
    { category: 'craft', benchmark: false, company: '勃肯 (Birkenstock · BIRK)', leader: 'Oliver Reichert (CEO)', positioning: '三大区域市场 + 德国本土 100% 垂直自建鞋床工厂体系', culture: '解剖学功能主义至上 + 零明星天价代言 + 70%–80% 配额控货', headcount: '~6,500+人 (重欧洲自有产业工人)', margins: 'FY25 营收 €21.0亿 (+18% CC) · 毛利率 59.1% · EBITDA率 31.8%', verdict: '欧洲稀缺控价同盟：与昂跑同样坚守 >90% 正价率，勃肯靠重资产德国自产，昂跑靠机械臂近岸智造。', sourceLabel: 'BIRK 20-F', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1977102/000119312525323615/birk-ex99_1.htm' },
    { category: 'nam', benchmark: false, company: '耐克 (NIKE, Inc. · NKE)', leader: 'Elliott Hill (回归修复期 CEO)', positioning: '全球多地区 × 男/女/童及 Jordan/Converse 庞大矩阵', culture: 'Just Do It 竞技赢家文化；近年因过度数字化压货正重返运动本源', headcount: '73,000人 (较 FY23 峰值 83,700人净减逾万人)', margins: 'FY26 营收 $463亿 · 毛利率 42.9% (受清库折让压制)', verdict: '规模之王的组织镜鉴：证明一旦偏离前沿跑道创新并过度铺货经典款，毛利率将损失逾 2,000bps。', sourceLabel: 'Nike FY26 10-K', sourceUrl: 'https://investors.nike.com/sec-filings/all-sec-filings/content/0000320187-26-000088/0000320187-26-000088.pdf' }
   ],
   en: [
    { category: 'craft', benchmark: true, company: 'Benchmark: On Holding AG (ONON)', leader: 'Allemann & Coppetti (Co-CEOs) / Maguire (COO)', positioning: 'Founder Co-CEOs + Zurich On Labs Pods + Unified COO Spine', culture: 'Five Spirits + Starling Murmuration + Full-Price Gatekeeping + Equity Icons', headcount: '3,963 FTEs (Zero layoffs) · CHF 0.76M (~$0.88M) Rev/FTE', margins: 'FY25 CHF 3.01B · Q3\'26 66.9% Underlying GM · Cash CHF 1.34B', verdict: 'Swiss engineering meets luxury scarcity: commands the #1 gross margin in public athletic footwear.', sourceLabel: 'SEC FY25 20-F', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1858985/000185898526000008/onholdingag-20251231.htm' },
    { category: 'nam', benchmark: false, company: 'Deckers Brands (DECK · HOKA & UGG)', leader: 'Stefano Caroti (CEO)', positioning: 'Focused dual-powerhouse brand units (HOKA Run + UGG Lifestyle)', culture: 'Strict inventory discipline + full-price sell-through + aggressive buybacks', headcount: '~6,000 FTEs · $0.91M Rev/FTE', margins: 'FY26 $5.47B (+10%) · ~57.0% GM · 23.1% Operating Margin', verdict: 'Closest specialty running rival: HOKA ($2.59B) excels in cushioning, while On leads in apparel & luxury collabs.', sourceLabel: 'Deckers FY26 10-K', sourceUrl: 'https://ir.deckers.com/news-events/press-releases/detail/656/deckers-brands-reports-fourth-quarter-and-full-fiscal-year-2026-financial-results' },
    { category: 'nam', benchmark: false, company: 'Lululemon Athletica (LULU)', leader: 'Store Educator & Ambassador Community Model', positioning: 'Vertically integrated 767+ owned stores + direct digital ecosystem', culture: 'Grassroots studio ambassadors + store Educator autonomy', headcount: '~39,000 employees · ~$0.28M Rev/FTE', margins: 'FY25 $11.10B · ~58.5%–59.2% Gross Margin', verdict: 'Blueprint for On\'s "Win with Her" apparel expansion and high-productivity community retail.', sourceLabel: 'LULU 10-K', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1397187/000139718726000020/lulu-20260201.htm' },
    { category: 'craft', benchmark: false, company: 'Birkenstock (BIRK)', leader: 'Oliver Reichert (CEO)', positioning: '3 regional segments + 100% German-owned footbed manufacturing', culture: 'Orthopedic function-first + $0 celebrity endorsements + engineered scarcity', headcount: '~6,500+ FTEs (European factory base)', margins: 'FY25 €2.10B (+18% CC) · 59.1% GM · 31.8% Adj. EBITDA', verdict: 'Fellow European full-price purist (>90% full-price realization) via vertical manufacturing control.', sourceLabel: 'BIRK 20-F', sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1977102/000119312525323615/birk-ex99_1.htm' },
    { category: 'nam', benchmark: false, company: 'NIKE, Inc. (NKE)', leader: 'Elliott Hill (Turnaround CEO)', positioning: 'Global matrix across geographies, genders & Jordan/Converse', culture: 'Iconic athlete storytelling; resetting after lifestyle oversupply', headcount: '73,000 FTEs (-10,700 vs FY23 peak)', margins: 'FY26 $46.3B · 42.9% Gross Margin', verdict: 'Cautionary tale of over-distributing retro franchises—trailing On\'s underlying GM by >2,300 bps.', sourceLabel: 'Nike FY26 10-K', sourceUrl: 'https://investors.nike.com/sec-filings/all-sec-filings/content/0000320187-26-000088/0000320187-26-000088.pdf' }
   ]
  };

  var CHECKLIST_ITEMS = {
   zh: [
    { tag: '全价铁律', title: '1. 反促销控货测试：面对行业价格战，管理层是否敢于主动压降批发发货？', desc: '核查品牌在逆风期是否宁可少确认当季批发收入（如昂跑 Q2\'26），也绝不把尾货倾销至折扣奥莱损伤品牌溢价。' },
    { tag: '实验室密度', title: '2. 物理级专利辨识度测试：核心产品是否拥有无需看 Logo 即可识别的结构/材料创新？', desc: '检验研发预算是否投向真实高分子化学（Surreal™）与自动化制程（LightSpray™），而非流于换配色营销。' },
    { tag: '创始人护盾', title: '3. 长期主义治理测试：创始人是否仍在产品一线并具备抵御短期投机压力的投票权？', desc: '对标昂跑双创始人联席 CEO 架构与 Class B 10倍投票权（~52%），确保十年战略不被季度噪音打断。' },
    { tag: '股权共创', title: '4. 真实领奖台背书测试：品牌代言人是“拿钱拍广告”还是“入股进实验室共创”？', desc: '观察顶级运动员与文化偶像（如费德勒、Zendaya、姆巴佩）是否深度参与产品迭代并共享长期股权增值。' },
    { tag: '全身连带', title: '5. 多品类破圈测试：单一爆款能否自然延伸至高毛利服饰与多运动场景？', desc: '跟踪服饰营收增速（9M26 +49.3% CC）与旗舰店服饰占比（>20%），验证从单品公司向生活方式帝国的跨越。' },
    { tag: '零负债造血', title: '6. 轻资产现金流转化测试：高速扩张期是否保持净现金充沛并回馈股东？', desc: '核查 CapEx 占比（~2.6%）、零有息负债资产负债表（CHF 13.39亿现金）及股票回购执行纪律。' }
   ],
   en: [
    { tag: 'Full-Price Gate', title: '1. Anti-Discount Test: Does leadership hold back sell-in rather than discount?', desc: 'Verify whether management curbs wholesale shipments during promotional cycles (as in Q2\'26) to protect brand equity.' },
    { tag: 'Lab Density', title: '2. Visibly Distinct IP Test: Are innovations recognizable from 10 meters without a logo?', desc: 'Check whether R&D funds proprietary superfoams (Surreal™) and robotics (LightSpray™) rather than cosmetic colorways.' },
    { tag: 'Founder Shield', title: '3. Long-Term Stewardship Test: Are founders hands-on with structural voting protection?', desc: 'Benchmarked against On\'s Founder Co-CEOs and ~52% Class B voting power shielding multi-year bets.' },
    { tag: 'Equity Icons', title: '4. Co-Entrepreneur Test: Do ambassadors co-design with equity skin in the game?', desc: 'Assess whether icons like Federer, Zendaya, and Mbappé co-create products rather than sign transactional ad deals.' },
    { tag: 'Toe-to-Head', title: '5. Multi-Category Elasticity Test: Is footwear successfully pulling high-margin apparel?', desc: 'Track apparel growth (+49.3% CC in 9M26) and >20% flagship store apparel share.' },
    { tag: 'Cash Fortress', title: '6. Self-Funded Compounding Test: Does growth generate net cash & buybacks?', desc: 'Verify ~2.6% CapEx intensity, CHF 1.34B debt-free cash, and disciplined execution of the $1.0B buyback.' }
   ]
  };

  function escapeHtml(str) {
   return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlightMatch(text, query) {
   var safe = escapeHtml(text);
   if (!query) return safe;
   var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
  }

  function renderPeerTable() {
   var tbody = document.getElementById('peerTableBody');
   var badge = document.getElementById('peerCountBadge');
   var activeRows = isEn() ? PEER_ROWS.en : PEER_ROWS.zh;
   var q = state.peerQuery.trim().toLowerCase();
   var filtered = activeRows.filter(function (row, idx) {
    var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
    if (!catOk) return false;
    if (!q) return true;
    var zhR = PEER_ROWS.zh[idx], enR = PEER_ROWS.en[idx];
    var hay = (zhR.company + ' ' + zhR.leader + ' ' + zhR.culture + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.leader + ' ' + enR.culture + ' ' + enR.verdict).toLowerCase();
    return hay.indexOf(q) !== -1;
   });
   badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆企业');
   if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">' + (isEn() ? 'No matching companies found.' : '未找到匹配的标杆企业记录。') + '</td></tr>';
    return;
   }
   var rawQ = state.peerQuery.trim();
   tbody.innerHTML = filtered.map(function (r) {
    return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
     '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
     '<td>' + highlightMatch(r.positioning, rawQ) + '</td>' +
     '<td>' + highlightMatch(r.culture, rawQ) + '</td>' +
     '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.headcount, rawQ) + '</td>' +
     '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.margins, rawQ) + '</td>' +
     '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
     '</tr>';
   }).join('');
  }

  function renderChecklist() {
   var container = document.getElementById('checklistContainer');
   var chip = document.getElementById('checklistScoreChip');
   var bar = document.getElementById('checklistProgressBar');
   var items = isEn() ? CHECKLIST_ITEMS.en : CHECKLIST_ITEMS.zh;
   var done = state.checks.filter(Boolean).length;
   var pct = Math.round((done / items.length) * 100);
   chip.textContent = isEn() ? ('Verified ' + done + ' / ' + items.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + items.length + ' 项 (' + pct + '%)');
   bar.style.width = pct + '%';
   container.innerHTML = items.map(function (it, idx) {
    var ck = !!state.checks[idx];
    return '<label class="check-card ' + (ck ? 'checked' : '') + '">' +
     '<input type="checkbox" data-check-input="' + idx + '" ' + (ck ? 'checked' : '') + ' />' +
     '<div style="flex:1;">' +
     '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
     '<span class="check-title">' + escapeHtml(it.title) + '</span>' +
     '<span class="mui-chip mono">' + escapeHtml(it.tag) + '</span>' +
     '</div>' +
     '<p class="check-desc">' + escapeHtml(it.desc) + '</p>' +
     '</div></label>';
   }).join('');
  }

  function formatCurrency(val) {
   if (val >= 1000000) return '$' + (val / 1000000).toFixed(2) + 'M';
   return '$' + Math.round(val).toLocaleString('en-US');
  }

  function syncCh1Header() {
   var tEl = document.getElementById('ch1ChartTitle'), sEl = document.getElementById('ch1ChartSub');
   if (state.ch1View === 'viewA') {
    tEl.textContent = isEn() ? 'FY2024 vs. FY2025 Net Sales Across Channels & Regions (CHF M · 20-F)' : 'FY2024 vs FY2025 渠道与区域协同跃升（CHF M · SEC Form 20-F）';
    sEl.textContent = isEn() ? 'DTC (+39.9% CC), APAC (+106.7% CC), and Apparel (+75.5% CC) led company-wide compounding' : '全链路无孤岛协同：DTC (+39.9% CC)、亚太区 (+106.7% CC) 与服饰 (+75.5% CC) 全面领跑';
   } else {
    tEl.textContent = isEn() ? 'FY2021–FY2025 Zero-Layoff FTE Scaling vs. Revenue per Employee (CHF k)' : 'FY2021–FY2025 零裁员员工稳步扩编（人）vs 人均创收（CHF 千）';
    sEl.textContent = isEn() ? 'Workforce grew from 1,158 to 3,963 with zero restructuring layoffs while Rev/FTE reached CHF 761k' : '员工由 1,158 人稳健增至 3,963 人（零结构性裁员），人均创收升至 CHF 76.1万';
   }
  }

  /* High-DPI Retina 5-Chart Engine */
  var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };

  function getPalette() {
   var isDark = state.theme === 'dark';
   return {
    isDark: isDark,
    grid: isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
    tick: isDark ? '#94A3B8' : '#475569',
    text: isDark ? '#F3F6F9' : '#0F172A',
    sub: isDark ? '#B2BAC2' : '#334155',
    pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
    pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
    trackBg: isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(15, 25, 36, 0.06)',
    c1: isDark ? '#3399FF' : '#0073E6',
    c2: isDark ? '#22C55E' : '#16A34A',
    c3: isDark ? '#FFB74D' : '#D97706',
    c4: isDark ? '#A78BFA' : '#7C3AED'
   };
  }

  function prepCanvas(id) {
   var canvas = document.getElementById(id);
   if (!canvas || !canvas.parentElement) return null;
   var rect = canvas.parentElement.getBoundingClientRect();
   var w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
   var dpr = Math.min(window.devicePixelRatio || 1, 2);
   canvas.width = Math.floor(w * dpr);
   canvas.height = Math.floor(h * dpr);
   var ctx = canvas.getContext('2d');
   ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
   ctx.clearRect(0, 0, w, h);
   return { ctx: ctx, w: w, h: h };
  }

  function roundRect(ctx, x, y, w, h, r) {
   if (w <= 0 || h <= 0) return;
   var rr = Math.min(r, w / 2, h / 2);
   ctx.beginPath();
   ctx.moveTo(x + rr, y);
   ctx.arcTo(x + w, y, x + w, y + h, rr);
   ctx.arcTo(x + w, y + h, x, y + h, rr);
   ctx.arcTo(x, y + h, x, y, rr);
   ctx.arcTo(x, y, x + w, y, rr);
   ctx.closePath();
  }

  function drawCh1Chart() {
   var env = prepCanvas('chartCh1');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hitRegions.chartCh1 = [];
   var metaEl = document.getElementById('ch1AxisMeta');
   var leg1 = document.getElementById('ch1Leg1'), leg2 = document.getElementById('ch1Leg2');

   if (state.ch1View === 'viewA') {
    metaEl.innerHTML = isEn()
     ? '<span style="color:var(--chart-c1);">■ Blue: FY2024 Net Sales (CHF M)</span><span style="color:var(--chart-c2);">■ Green: FY2025 Net Sales (CHF M · Total 3,014.0M)</span>'
     : '<span style="color:var(--chart-c1);">■ 蓝色：FY2024 净营收 (CHF M)</span><span style="color:var(--chart-c2);">■ 绿色：FY2025 净营收 (CHF M · 总计 3,014.0M)</span>';
    leg1.textContent = isEn() ? 'FY2024 Net Sales (CHF M)' : 'FY2024 净营收 (CHF M)';
    leg2.textContent = isEn() ? 'FY2025 Net Sales (CHF M)' : 'FY2025 净营收 (CHF M)';

    var pad = { top: 28, right: 20, bottom: 44, left: 56 };
    var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
    var labels = isEn() ? ['Wholesale', 'DTC Direct', 'Americas', 'EMEA', 'APAC'] : ['精选批发', 'DTC直营', '美洲区', 'EMEA欧非', '亚太区APAC'];
    var subs = ['+32.6% CC', '+39.9% CC', '+23.4% CC', '+34.7% CC', '+106.7% CC'];
    var v24 = [1375.5, 942.8, 1480.3, 577.8, 260.2];
    var v25 = [1753.4, 1260.5, 1740.1, 762.7, 511.1];
    var maxY = 2000;

    for (var g = 0; g <= 4; g++) {
     var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(gv.toFixed(0) + 'M', pad.left - 7, gy + 4);
    }
    var step = pw / labels.length, bw = Math.min(34, Math.max(14, step * 0.27));
    labels.forEach(function (lb, i) {
     var cx = pad.left + step * (i + 0.5);
     if (state.ch1Series.s1) {
      var h1 = (v24[i] / maxY) * ph, y1 = pad.top + ph - h1;
      var x1 = state.ch1Series.s2 ? (cx - bw - 3) : (cx - bw / 2);
      ctx.fillStyle = pal.c1; roundRect(ctx, x1, y1, bw, h1, 5); ctx.fill();
     }
     if (state.ch1Series.s2) {
      var h2 = (v25[i] / maxY) * ph, y2 = pad.top + ph - h2;
      var x2 = state.ch1Series.s1 ? (cx + 3) : (cx - bw / 2);
      ctx.fillStyle = pal.c2; roundRect(ctx, x2, y2, bw, h2, 5); ctx.fill();
      ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillText(Math.round(v25[i]) + 'M', x2 + bw / 2, y2 - 6);
     }
     ctx.fillStyle = pal.text; ctx.font = '700 11px sans-serif'; ctx.textAlign = 'center';
     ctx.fillText(lb, cx, pad.top + ph + 18);
     ctx.fillStyle = pal.c2; ctx.font = '600 10px "IBM Plex Mono", monospace';
     ctx.fillText(subs[i], cx, pad.top + ph + 33);
     hitRegions.chartCh1.push({ x: pad.left + step * i, y: pad.top, w: step, h: ph + 36, html: '<strong>' + lb + '</strong><br/>• FY24: CHF ' + v24[i].toFixed(1) + 'M<br/>• FY25: <strong>CHF ' + v25[i].toFixed(1) + 'M (' + subs[i] + ')</strong>' });
    });
   } else {
    metaEl.innerHTML = isEn()
     ? '<span style="color:var(--chart-c1);">■ Left: Employees (FTEs · Zero Layoffs)</span><span style="color:var(--chart-c2);">● Right: Revenue / Employee (CHF k)</span>'
     : '<span style="color:var(--chart-c1);">■ 左轴：员工总数 (人 · 连续零裁员)</span><span style="color:var(--chart-c2);">● 右轴：人均年创收 (CHF 千/人)</span>';
    leg1.textContent = isEn() ? 'Total Employees (Left Axis)' : '全职员工总数 (左轴 · 人)';
    leg2.textContent = isEn() ? 'Revenue per Employee (Right · CHF k)' : '人均年创收 (右轴 · CHF k)';

    var padB = { top: 28, right: 54, bottom: 38, left: 52 };
    var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
    var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'];
    var ftes = [1158, 1701, 2353, 3254, 3963];
    var revK = [626, 718, 762, 712, 761];
    var maxF = 4600, minR = 500, maxR = 850;

    for (var j = 0; j <= 4; j++) {
     var r = j / 4, yg = padB.top + phB - r * phB;
     ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yg); ctx.lineTo(padB.left + pwB, yg); ctx.stroke();
     ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
     ctx.fillText(Math.round(maxF * r), padB.left - 7, yg + 4);
     ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
     ctx.fillText(Math.round(minR + r * (maxR - minR)) + 'k', padB.left + pwB + 7, yg + 4);
    }
    var stepB = pwB / yrs.length, bW = Math.min(42, stepB * 0.44);
    var pts = [];
    yrs.forEach(function (y, k) {
     var cx = padB.left + stepB * (k + 0.5);
     if (state.ch1Series.s1) {
      var bh = (ftes[k] / maxF) * phB, by = padB.top + phB - bh;
      ctx.fillStyle = pal.c1; roundRect(ctx, cx - bW / 2, by, bW, bh, 5); ctx.fill();
      ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
      if (bh > 22) ctx.fillText(ftes[k], cx, by + 15);
     }
     var ly = padB.top + phB - ((revK[k] - minR) / (maxR - minR)) * phB;
     pts.push({ x: cx, y: ly, v: revK[k] });
     ctx.fillStyle = pal.text; ctx.font = '700 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(y, cx, padB.top + phB + 20);
     hitRegions.chartCh1.push({ x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28, html: '<strong>' + y + ' (Form 20-F)</strong><br/>• Employees: <strong>' + ftes[k].toLocaleString() + '</strong><br/>• Rev / Employee: <strong>CHF ' + revK[k] + 'k</strong>' });
    });
    if (state.ch1Series.s2) {
     ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
     pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
     ctx.stroke();
     pts.forEach(function (pt) {
      ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillText('CHF ' + pt.v + 'k', pt.x, pt.y - 9);
     });
    }
   }
  }

  function drawRadarChart() {
   var env = prepCanvas('chartRadar');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hitRegions.chartRadar = [];
   var axes = isEn() ? ['Lab R&D Speed', 'Full-Price Discipline', 'Pod Autonomy', 'Athlete Equity', 'Circular Tech'] : ['实验室原型速度', '全价反促销定力', '椋鸟群智自治度', '运动员股权共创', '循环减碳硬科技'];
   var series = [
    { key: 'onon', color: pal.c1, fill: 'rgba(51,153,255,0.22)', vals: [9.7, 9.8, 9.4, 9.6, 9.5] },
    { key: 'deck', color: pal.c2, fill: 'rgba(34,197,94,0.15)', vals: [8.6, 9.2, 8.2, 7.8, 7.6] },
    { key: 'legacy', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [7.2, 5.8, 5.4, 7.5, 6.8] }
   ];
   var cx = w / 2, cy = h / 2 + 6;
   var radius = Math.max(60, Math.min((w - 190) / 2, h * 0.35));
   var total = axes.length;
   for (var ring = 2; ring <= 10; ring += 2) {
    var r = (ring / 10) * radius;
    ctx.strokeStyle = pal.grid; ctx.beginPath();
    for (var i = 0; i < total; i++) {
     var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total;
     var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
     if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.stroke();
   }
   axes.forEach(function (axName, a) {
    var ang = -Math.PI / 2 + (a * 2 * Math.PI) / total;
    var ax = cx + Math.cos(ang) * radius, ay = cy + Math.sin(ang) * radius;
    ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
    var lx = cx + Math.cos(ang) * (radius + 14), ly = cy + Math.sin(ang) * (radius + 14);
    ctx.fillStyle = pal.text; ctx.font = '700 11px sans-serif';
    ctx.textAlign = Math.abs(Math.cos(ang)) < 0.2 ? 'center' : (Math.cos(ang) > 0 ? 'left' : 'right');
    ctx.fillText(axName, lx, ly + 4);
    hitRegions.chartRadar.push({ x: Math.min(ax, lx) - 34, y: Math.min(ay, ly) - 20, w: 70 + Math.abs(lx - ax), h: 40, html: '<strong>' + axName + '</strong><br/>• On (ONON): <strong>' + series[0].vals[a] + '/10</strong><br/>• Deckers: <strong>' + series[1].vals[a] + '/10</strong><br/>• Legacy Peers: <strong>' + series[2].vals[a] + '/10</strong>' });
   });
   series.forEach(function (s) {
    if (!state.radarSeries[s.key]) return;
    ctx.beginPath();
    s.vals.forEach(function (v, idx) {
     var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total, d = (v / 10) * radius;
     var vx = cx + Math.cos(th) * d, vy = cy + Math.sin(th) * d;
     if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
    });
    ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
   });
  }

  function drawHorizontalBars() {
   var env = prepCanvas('chartBars');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hitRegions.chartBars = [];
   var items = isEn() ? [
    { label: "Q3 2026 Underlying Gross Margin (Ex-Tariff Refund)", val: 66.9, col: pal.c2, sub: '72.6% Reported · #1 in Sportswear' },
    { label: 'FY2025 Full-Year Gross Profit Margin (Audited 20-F)', val: 62.8, col: pal.c1, sub: 'CHF 1,893.6M / CHF 3,014.0M' },
    { label: 'Extended Founder Team Voting Power (10x Class B)', val: 52.0, col: pal.c4, sub: 'Long-Term Strategic Shield' },
    { label: 'Q3 2026 Direct-to-Consumer (DTC) Revenue Share', val: 42.2, col: pal.c1, sub: 'CHF 393.3M (+25.0% YoY)' },
    { label: 'Zurich On Labs HQ Space Dedicated to R&D Labs', val: 33.0, col: pal.c3, sub: '>30% of 17-Story Zurich HQ' },
    { label: "Q3 2026 Underlying Adjusted EBITDA Margin", val: 21.9, col: pal.c2, sub: '27.6% Reported · 2029 Target ≥22%' }
   ] : [
    { label: 'Q3 2026 基础毛利率（剔除退税 · 全球运动鞋服第1）', val: 66.9, col: pal.c2, sub: '报告毛利率高达 72.6%' },
    { label: 'FY2025 全年经审计综合毛利率 (Form 20-F)', val: 62.8, col: pal.c1, sub: 'CHF 1,893.6M / CHF 3,014.0M' },
    { label: '扩展创始团队投票权护城河 (Class B 10倍投票权)', val: 52.0, col: pal.c4, sub: '隔绝短期促销冲量压力' },
    { label: 'Q3 2026 DTC 直营渠道净营收占比', val: 42.2, col: pal.c1, sub: '单季 CHF 393.3M (+25.0% YoY)' },
    { label: '苏黎世 On Labs 总部大楼实验研发空间占比', val: 33.0, col: pal.c3, sub: '17层大楼逾 30% 归属实验室' },
    { label: 'Q3 2026 基础 Adjusted EBITDA 利润率', val: 21.9, col: pal.c2, sub: '报告达 27.6% · 提前触及2029目标线' }
   ];
   var pad = { top: 10, right: 20, bottom: 24, left: 20 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 75;
   var rowH = ph / items.length;
   items.forEach(function (it, i) {
    var rt = pad.top + rowH * i;
    var ly = rt + rowH * 0.38, by = rt + rowH * 0.54, bh = 13;
    var bw = (it.val / maxX) * pw;
    ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(it.label, pad.left, ly);
    ctx.fillStyle = it.col; ctx.font = '800 12px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
    ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, ly);
    ctx.fillStyle = pal.trackBg; roundRect(ctx, pad.left, by, pw, bh, 6); ctx.fill();
    ctx.fillStyle = it.col; roundRect(ctx, pad.left, by, bw, bh, 6); ctx.fill();
    hitRegions.chartBars.push({ x: pad.left, y: rt, w: pw, h: rowH, html: '<strong>' + it.label + ': ' + it.val.toFixed(1) + '%</strong><br/>• ' + it.sub });
   });
  }

  function drawEpsComboChart() {
   var env = prepCanvas('chartEps');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hitRegions.chartEps = [];
   var yrs = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026E*'];
   var ebM = [96.4, 165.3, 276.9, 387.6, 567.0, 695.0];
   var gmP = [59.4, 56.0, 59.6, 60.6, 62.8, 66.0];
   var pad = { top: 26, right: 52, bottom: 38, left: 54 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   var maxEb = 800, minGm = 50, maxGm = 70;

   for (var g = 0; g <= 4; g++) {
    var r = g / 4, gy = pad.top + ph - r * ph;
    ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
    ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxEb * r) + 'M', pad.left - 7, gy + 4);
    ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
    ctx.fillText((minGm + r * (maxGm - minGm)).toFixed(0) + '%', pad.left + pw + 7, gy + 4);
   }
   var targetY = pad.top + ph - ((65.0 - minGm) / (maxGm - minGm)) * ph;
   ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.beginPath(); ctx.moveTo(pad.left, targetY); ctx.lineTo(pad.left + pw, targetY); ctx.stroke(); ctx.restore();

   var step = pw / yrs.length, barW = Math.min(42, step * 0.44);
   var pts = [];
   yrs.forEach(function (y, i) {
    var cx = pad.left + step * (i + 0.5);
    if (state.epsSeries.eps) {
     var bh = (ebM[i] / maxEb) * ph, by = pad.top + ph - bh;
     ctx.fillStyle = i === 5 ? pal.c4 : pal.c1;
     roundRect(ctx, cx - barW / 2, by, barW, bh, 5); ctx.fill();
     ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     if (bh > 20) ctx.fillText(Math.round(ebM[i]) + 'M', cx, by + 15);
    }
    var oy = pad.top + ph - ((gmP[i] - minGm) / (maxGm - minGm)) * ph;
    pts.push({ x: cx, y: oy, gm: gmP[i] });
    ctx.fillStyle = pal.text; ctx.font = '700 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
    ctx.fillText(y, cx, pad.top + ph + 20);
    hitRegions.chartEps.push({ x: pad.left + step * i, y: pad.top, w: step, h: ph + 28, html: '<strong>' + y + '</strong><br/>• Adj. EBITDA: <strong>CHF ' + ebM[i].toFixed(1) + 'M</strong><br/>• Underlying GM: <strong>' + gmP[i].toFixed(1) + '%</strong>' });
   });
   if (state.epsSeries.oci) {
    ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
    pts.forEach(function (p, idx) { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
    ctx.stroke();
    pts.forEach(function (p) {
     ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill();
     ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText(p.gm.toFixed(1) + '%', p.x, p.y - 8);
    });
   }
  }

  function drawSimChart() {
   var env = prepCanvas('chartSim');
   if (!env) return;
   var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
   hitRegions.chartSim = [];
   var p = state.sim.principal, yrs = state.sim.years;
   var baseR = state.sim.priceCagr / 100;
   var totR = (state.sim.priceCagr + (state.sim.drip ? 2.0 : 0)) / 100;
   var totS = [], baseS = [];
   for (var y = 0; y <= yrs; y++) {
    totS.push(p * Math.pow(1 + totR, y));
    baseS.push(p * Math.pow(1 + baseR, y));
   }
   var maxV = totS[yrs] * 1.1, pad = { top: 20, right: 18, bottom: 26, left: 56 };
   var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
   for (var g = 0; g <= 3; g++) {
    var v = (maxV / 3) * g, gy = pad.top + ph - (g / 3) * ph;
    ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
    ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
    ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 6, gy + 4);
   }
   var stepX = pw / yrs;
   ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.beginPath();
   baseS.forEach(function (bv, i) { var px = pad.left + stepX * i, py = pad.top + ph - (bv / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
   ctx.stroke(); ctx.restore();

   ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
   totS.forEach(function (tv, i) { var px = pad.left + stepX * i, py = pad.top + ph - (tv / maxV) * ph; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); });
   ctx.stroke();

   totS.forEach(function (tv, t) {
    var tx = pad.left + stepX * t;
    if (t === 0 || t === Math.floor(yrs / 2) || t === yrs) {
     ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
     ctx.fillText('Y' + t, tx, pad.top + ph + 16);
    }
    hitRegions.chartSim.push({ x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 20, html: '<strong>Year ' + t + '</strong><br/>• w/ Buyback & Leverage: <strong>' + formatCurrency(tv) + '</strong><br/>• Base Only: <strong>' + formatCurrency(baseS[t]) + '</strong>' });
   });
  }

  function updateSimulatorUI() {
   var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
   var boost = state.sim.drip ? 2.0 : 0.0;
   var totR = (cagr + boost) / 100;
   var endV = p * Math.pow(1 + totR, yrs);
   var midY = Math.max(1, Math.floor(yrs / 2));
   var midV = p * Math.pow(1 + totR, midY);

   document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
   document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
   document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
   document.getElementById('simEndingVal').textContent = formatCurrency(endV);
   document.getElementById('simMoicVal').textContent = (endV / p).toFixed(2) + 'x · ' + (totR * 100).toFixed(2) + '%';
   document.getElementById('simNetGainVal').textContent = formatCurrency(endV - p);
   document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midY + ' Midpoint') : ('第 ' + midY + ' 年中期节点');
   document.getElementById('simMidVal').textContent = formatCurrency(midV);

   var pbs = document.querySelectorAll('[data-preset]');
   for (var i = 0; i < pbs.length; i++) pbs[i].classList.toggle('active', pbs[i].getAttribute('data-preset') === state.sim.preset);
   drawSimChart();
  }

  function renderAllCharts() {
   drawCh1Chart();
   drawRadarChart();
   drawHorizontalBars();
   drawEpsComboChart();
   drawSimChart();
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
   renderAllCharts();
   if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Dark Mode' : '已切换至深色外观') : (isEn() ? 'Light Mode' : '已切换至浅色外观'));
  }

  function applyLang(lang, silent) {
   state.lang = lang === 'en' ? 'en' : 'zh';
   document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
   document.getElementById('langZhBtn').classList.toggle('active', !isEn());
   document.getElementById('langEnBtn').classList.toggle('active', isEn());
   var nodes = document.querySelectorAll('[data-i18n-zh]');
   for (var i = 0; i < nodes.length; i++) {
    var val = nodes[i].getAttribute(isEn() ? 'data-i18n-en' : 'data-i18n-zh');
    if (val !== null) {
     if (val.indexOf('<') !== -1) nodes[i].innerHTML = val;
     else nodes[i].textContent = val;
    }
   }
   document.getElementById('ch00Lead').innerHTML = isEn() ? CH00_LEAD.en : CH00_LEAD.zh;
   document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES.en : PILLAR_NOTES.zh)[state.activePillar] + '</div>';
   syncCh1Header();
   renderPeerTable();
   renderChecklist();
   updateSimulatorUI();
   renderAllCharts();
   try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
   if (!silent) showToast(isEn() ? 'Switched to English' : '已切换至中文研报视图');
  }

  // Wire Tooltip
  ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(function (cid) {
   var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
   c.addEventListener('mousemove', function (e) {
    var r = c.getBoundingClientRect();
    var x = e.clientX - r.left, y = e.clientY - r.top;
    var regs = hitRegions[cid] || [], hit = null;
    for (var i = 0; i < regs.length; i++) {
     if (x >= regs[i].x && x <= regs[i].x + regs[i].w && y >= regs[i].y && y <= regs[i].y + regs[i].h) { hit = regs[i]; break; }
    }
    if (hit) {
     tip.innerHTML = hit.html;
     tip.style.display = 'block';
     tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, e.clientX + 14)) + 'px';
     tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, e.clientY - 30)) + 'px';
    } else tip.style.display = 'none';
   });
   c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
  });

  // Wire Controls
  document.getElementById('ch1TabA').addEventListener('click', function () {
   state.ch1View = 'viewA'; this.classList.add('active'); document.getElementById('ch1TabB').classList.remove('active'); syncCh1Header(); drawCh1Chart();
  });
  document.getElementById('ch1TabB').addEventListener('click', function () {
   state.ch1View = 'viewB'; this.classList.add('active'); document.getElementById('ch1TabA').classList.remove('active'); syncCh1Header(); drawCh1Chart();
  });

  document.querySelectorAll('[data-ch1-series]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    var k = this.getAttribute('data-ch1-series');
    state.ch1Series[k] = !state.ch1Series[k];
    if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[k] = true;
    this.classList.toggle('muted', !state.ch1Series[k]);
    drawCh1Chart();
   });
  });

  document.querySelectorAll('[data-eps-series]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    var k = this.getAttribute('data-eps-series');
    state.epsSeries[k] = !state.epsSeries[k];
    if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[k] = true;
    this.classList.toggle('muted', !state.epsSeries[k]);
    drawEpsComboChart();
   });
  });

  document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    var p = document.getElementById(this.getAttribute('data-collapse-target'));
    var open = p.classList.toggle('open');
    this.innerHTML = open ? (isEn() ? '<span>Hide Details ⌃</span>' : '<span>收起微观执行机制 ⌃</span>') : (isEn() ? '<span>Show Details ⌄</span>' : '<span>展开微观执行机制 ⌄</span>');
   });
  });

  document.querySelectorAll('[data-pillar]').forEach(function (card) {
   card.addEventListener('click', function () {
    state.activePillar = parseInt(this.getAttribute('data-pillar'), 10) || 0;
    document.querySelectorAll('[data-pillar]').forEach(function (c, idx) { c.classList.toggle('active', idx === state.activePillar); });
    document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES.en : PILLAR_NOTES.zh)[state.activePillar] + '</div>';
    drawRadarChart();
   });
  });

  document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
   pill.addEventListener('click', function () {
    var k = this.getAttribute('data-radar-key');
    state.radarSeries[k] = !state.radarSeries[k];
    if (!state.radarSeries.onon && !state.radarSeries.deck && !state.radarSeries.legacy) state.radarSeries[k] = true;
    this.classList.toggle('muted', !state.radarSeries[k]);
    drawRadarChart();
   });
  });

  document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
  document.querySelectorAll('[data-peer-filter]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    state.peerFilter = this.getAttribute('data-peer-filter');
    document.querySelectorAll('[data-peer-filter]').forEach(function (b) { b.classList.toggle('active', b === btn); });
    renderPeerTable();
   });
  });

  var PRESETS = {
   p1: { principal: 10000, years: 5, priceCagr: 20.5, drip: true },
   p2: { principal: 10000, years: 4, priceCagr: 42.8, drip: false },
   p3: { principal: 10000, years: 10, priceCagr: 16.0, drip: true }
  };
  document.querySelectorAll('[data-preset]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    var k = this.getAttribute('data-preset'), cfg = PRESETS[k];
    state.sim = { principal: cfg.principal, years: cfg.years, priceCagr: cfg.priceCagr, drip: cfg.drip, preset: k };
    document.getElementById('simPrincipalSlider').value = cfg.principal;
    document.getElementById('simYearsSlider').value = cfg.years;
    document.getElementById('simCagrSlider').value = cfg.priceCagr;
    document.getElementById('simDripToggle').checked = cfg.drip;
    updateSimulatorUI();
   });
  });
  document.getElementById('simPrincipalSlider').addEventListener('input', function () { state.sim.principal = parseFloat(this.value); state.sim.preset = ''; updateSimulatorUI(); });
  document.getElementById('simYearsSlider').addEventListener('input', function () { state.sim.years = parseInt(this.value, 10); state.sim.preset = ''; updateSimulatorUI(); });
  document.getElementById('simCagrSlider').addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value); state.sim.preset = ''; updateSimulatorUI(); });
  document.getElementById('simDripToggle').addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });

  document.getElementById('checklistContainer').addEventListener('change', function (e) {
   var inp = e.target.closest('[data-check-input]');
   if (!inp) return;
   state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
   try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
   renderChecklist();
  });
  document.getElementById('checkAllBtn').addEventListener('click', function () {
   state.checks = [true, true, true, true, true, true];
   try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
   renderChecklist();
   showToast(isEn() ? 'All 6 items checked' : '已勾选全部 6 项文化指标');
  });
  document.getElementById('resetCheckBtn').addEventListener('click', function () {
   state.checks = [true, true, true, false, false, false];
   try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
   renderChecklist();
   showToast(isEn() ? 'Checklist reset' : '已恢复默认状态');
  });

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

  var QJUMP = [
   { sec: 'sec-00', t: '00 执行摘要与核心指标', s: 'CHF 3.01B 营收 · 3,963人零裁员 · 66.9% 基础毛利率' },
   { sec: 'sec-01', t: '01 联席CEO治理与苏黎世实验室协同', s: 'Allemann & Coppetti 重任联席CEO · Maguire 全链路 COO' },
   { sec: 'sec-02', t: '02 五大精神（Five Spirits）与文化雷达', s: '探索者 · 运动员 · 团队 · 正向 Wow · 地球幸存者' },
   { sec: 'sec-03', t: '03 全球运动巨头文化横向对比', s: '昂跑 vs Deckers(HOKA) vs Lululemon vs 勃肯 vs 耐克' },
   { sec: 'sec-04', t: '04 全价红利、利润率与复利推演', s: 'FY21–FY26E EBITDA 与毛利跃升 · $10亿回购推演器' },
   { sec: 'sec-05', t: '05 三阶段演进与四大战役复盘', s: '花园水管原型 → 费德勒入股 → 2026Q2控货与釜山机械臂' },
   { sec: 'sec-06', t: '06 昂跑文化法则核查清单', s: '6 项高端运动消费组织诊断（本地自动保存）' },
   { sec: 'sec-07', t: '07 数据来源与监管核验索引', s: 'SEC 20-F/6-K · 投资者日 · IMD 与 Thinkers50 文献' }
  ];
  var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
  function renderQ(q) {
   var kw = (q || '').trim().toLowerCase();
   var list = QJUMP.filter(function (it) { return !kw || (it.t + ' ' + it.s).toLowerCase().indexOf(kw) !== -1; });
   qPop.innerHTML = list.map(function (it) {
    return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + it.t + '</span><span class="quick-jump-item-sub">' + it.s + '</span></button>';
   }).join('');
   qPop.classList.toggle('open', list.length > 0);
  }
  qIn.addEventListener('focus', function () { renderQ(qIn.value); });
  qIn.addEventListener('input', function () { renderQ(qIn.value); });
  qPop.addEventListener('click', function (e) {
   var b = e.target.closest('[data-jump-sec]');
   if (!b) return;
   var sec = document.getElementById(b.getAttribute('data-jump-sec'));
   if (sec) sec.scrollIntoView({ behavior: 'smooth' });
   qPop.classList.remove('open');
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });

  var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
  document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
   if (window.innerWidth < 1024) { var op = sb.classList.toggle('open'); bd.classList.toggle('open', op); }
   else {
    var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
    if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
    else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
    try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (e) {}
    setTimeout(renderAllCharts, 60);
   }
  });
  bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
  document.addEventListener('keydown', function (e) {
   if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
   if (e.key === 'Escape') { qPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
  });

  document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
  
  
  document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
  document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });

  
  

  window.addEventListener('scroll', function () {
   var dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
   document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / dh) * 100) + '%';
  }, { passive: true });

  try {
   if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
   var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
   if (Array.isArray(sc) && sc.length === 6) state.checks = sc.map(Boolean);
   applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
   applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
  } catch (e) {
   renderPeerTable();
   renderChecklist();
   updateSimulatorUI();
   renderAllCharts();
  }

  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 80); });
 })();
 