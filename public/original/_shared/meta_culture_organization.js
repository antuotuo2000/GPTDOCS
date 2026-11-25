
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_meta_culture_checks_v1';

 var PILLAR_NOTES_ZH = [
 '<strong>当前选中支柱解读（01 扁平即极速）：</strong>通过将员工总数从 2022 年末 86,482 人压降至 2026Q3 的 66,775 人，Meta 不仅消除了内耗审批链，更把单季营收推上 $646.0 亿历史巅峰 <a class="cite-link" href="https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx" target="_blank" rel="noopener noreferrer">Q3 2026 财报 ↗</a>。',
 '<strong>当前选中支柱解读（02 PSC 鲨鱼池校准）：</strong>跨团队经理每半年在 Calibration 会议中拿真实实验指标（时长、转化率、算力吞吐）硬碰硬排名，确保薪酬与算力向最能打硬仗的 10% 极客倾斜 <a class="cite-link" href="https://www.compiler.today/career/surviving-meta-layoffs-year-efficiency-guide-2026" target="_blank" rel="noopener noreferrer">PSC 机制复盘 ↗</a>。',
 '<strong>当前选中支柱解读（03 创始人战时独裁）：</strong>60.8% 表决权叠加 2027 年生效的无投票权 Class C 普通股，让扎克伯格成为万亿科技巨头中唯一可单人拍板 $1400亿 年化资本开支的掌舵者 <a class="cite-link" href="https://www.universalassetowners.com/newsroom/meta-class-c-no-vote-offerings-written-consent/" target="_blank" rel="noopener noreferrer">Class C 解析 ↗</a>。',
 '<strong>当前选中支柱解读（04 快速上线与零包袱纠偏）：</strong>无论是 Threads 突破 5 亿月活，还是 2026 年迅速发布 Muse Spark / Muse / Muse Wonder 前沿模型，实战快速迭代始终优先于闭门造车 <a class="cite-link" href="https://ai.meta.com/research/" target="_blank" rel="noopener noreferrer">Meta AI Research ↗</a>。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Flatter is Faster):</strong> Compressing headcount from 86,482 (end-2022) to 66,775 (Q3 2026) removed middle-management bottlenecks while propelling quarterly sales to a record $64.60B <a class="cite-link" href="https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx" target="_blank" rel="noopener noreferrer">Q3 2026 Release ↗</a>.',
 '<strong>Selected Pillar (02 · Calibration Rigor):</strong> Cross-org managers debate measurable A/B experiment impact in semi-annual Calibration sessions, enforcing a high-intensity meritocracy <a class="cite-link" href="https://www.compiler.today/career/surviving-meta-layoffs-year-efficiency-guide-2026" target="_blank" rel="noopener noreferrer">Calibration Deep Dive ↗</a>.',
 '<strong>Selected Pillar (03 · Founder Sovereignty):</strong> 60.8% voting power plus non-voting Class C stock (effective Jan 2027) enables Mark Zuckerberg to commit $135B–$145B in 2026 AI CapEx without activist interference <a class="cite-link" href="https://www.universalassetowners.com/newsroom/meta-class-c-no-vote-offerings-written-consent/" target="_blank" rel="noopener noreferrer">Class C Filing ↗</a>.',
 '<strong>Selected Pillar (04 · Ship Fast &amp; Pivot Hard):</strong> Scaling Threads past 500M MAU and launching Muse Spark, Muse Agent, and Muse Wonder within months exemplifies zero-ego execution <a class="cite-link" href="https://ai.meta.com/research/" target="_blank" rel="noopener noreferrer">Meta AI Research ↗</a>.'
 ];

 var PEER_ROWS_ZH = [
 {
 category: 'founder',
 benchmark: true,
 company: '研究基准：Meta Platforms (META)',
 leader: '马克·扎克伯格 (创始人/董事长/CEO · 60.8%投票权)',
 positioning: '三层股本锁权 + 统一应用产品链 (FoA) + 独立超级智能实验室 (MSL)',
 culture: 'Flatter is Faster 去中层化 + A/B 实验数据赛马 + 15–20% 硬淘汰',
 headcount: '66,775人 (Q3 26, -15%) · 年化人效 $3.87M',
 margins: 'FY25 营收 $2,010亿 (9M26 +29%) · 毛利 82.0% · FoA 营业利润率 51.6%',
 verdict: '战略敏捷度全球第一：用最少的人与最猛的算力（$135–145B CapEx）完成短视频与 AI 双重逆袭；需警惕算力折旧与治理制衡缺失。',
 sourceLabel: 'Q3 2026 / FY25 8-K',
 sourceUrl: 'https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx'
 },
 {
 category: 'inst',
 benchmark: false,
 company: '苹果公司 (Apple · AAPL)',
 leader: '库克 (执行董事长) / 约翰·特努斯 (CEO, 2026.09+)',
 positioning: '一股一票公众治理 + 职能制集权 (Functional Org) + 全公司唯一损益表',
 culture: '专家领导专家 + DRI 唯一署名问责 + Apple University 极简审美',
 headcount: '167,000人 (+0.6%) · 人均创收 $2.87M',
 margins: 'FY26 营收 $4,788亿 · 综合毛利 48.8% (服务 76.2%) · CapEx 仅 $9.0B',
 verdict: '与 Meta 形成完美镜像：苹果靠严谨保密与轻资产端侧硬件收生态税，从不大扩招大裁员；Meta 靠开源/快速试错与重算力突围。',
 sourceLabel: 'HBR / Apple FY26',
 sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
 },
 {
 category: 'founder',
 benchmark: false,
 company: '英伟达 (NVIDIA · NVDA)',
 leader: '黄仁勋 (创始人/CEO)',
 positioning: '超扁平蛛网职能制 (~60名高管直报 CEO) + 软硬一体算力平台',
 culture: '零事业部墙 + Top-5 直通邮件透明信息流 + 光速危机感执行',
 headcount: '~42,000人 (~74%研发) · 人均创收 ~$5.14M',
 margins: 'FY26 营收 $2,159亿 · GAAP 毛利率 71.1% · 净利 $1,201亿',
 verdict: '同属硅谷“创始人战时模式”标杆：两者均痛恨中层官僚并亲自下沉一线技术细节，同时 Meta 也是英伟达最大算力买家之一。',
 sourceLabel: 'NVIDIA FY26 Stats',
 sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'inst',
 benchmark: false,
 company: 'Alphabet / Google (GOOGL)',
 leader: '桑达尔·皮查伊 (CEO) · 佩奇/布林双层股支持',
 positioning: 'Search / Cloud / YouTube 核心业务群 + DeepMind 统一 AI 中枢',
 culture: '深厚计算机科学学术基因 + TPU 十年自研积累 + 工程驱动',
 headcount: '~183,000人 · 人均创收 ~$2.20M',
 margins: 'FY25 营收 $4,028亿 · 毛利率 ~58.2% · 云与搜索双轮回血',
 verdict: '最直接的数字广告对手：谷歌拥有 Android/Chrome 系统入口与公有云分摊算力，但历史包袱较重，组织裁撤与调头烈度不如 Meta。',
 sourceLabel: 'SEC 10-K Comparison',
 sourceUrl: 'https://www.globalbrandsmagazine.com/meta-growth-in-charts-2015-2025/'
 },
 {
 category: 'inst',
 benchmark: false,
 company: '亚马逊 (Amazon · AMZN)',
 leader: '贝索斯 (执行董事长) / 安迪·贾西 (CEO)',
 positioning: '契约化服务 API 解耦 + 数千支“双披萨自治小队”分权矩阵',
 culture: '永远的 Day 1 + 16条领导力准则 + 六页纸深度备忘录',
 headcount: '~155万+ (含全球物流履约网络)',
 margins: 'FY25 营收 $7,169亿 · AWS 公有云与高毛利零售广告驱动',
 verdict: '分权试错大师：亚马逊用制度化小团队横向孵化百业，而 Meta 则靠高度集中的统一推荐栈与算力池纵向打穿 36.4 亿人注意力。',
 sourceLabel: 'SEC 10-K Comparison',
 sourceUrl: 'https://www.globalbrandsmagazine.com/meta-growth-in-charts-2015-2025/'
 }
 ];

 var PEER_ROWS_EN = [
 {
 category: 'founder',
 benchmark: true,
 company: 'Benchmark: Meta Platforms (META)',
 leader: 'Mark Zuckerberg (Founder/Chair/CEO · 60.8% Vote)',
 positioning: '3-Class Stock Shield + Unified FoA Product Chain + Dedicated MSL AI Lab',
 culture: 'Flatter is Faster de-layering + A/B metric rigor + 15–20% PSC culling',
 headcount: '66,775 FTE (Q3 26, -15%) · $3.87M Ann. Rev/FTE',
 margins: 'FY25 Sales $201.0B (9M26 +29%) · 82.0% GM · 51.6% FoA Op Margin',
 verdict: 'Unmatched wartime agility: 23% leaner than 2022 while funding $135–145B AI CapEx; key watchpoints are depreciation & founder unchecked power.',
 sourceLabel: 'Q3 2026 / FY25 8-K',
 sourceUrl: 'https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Third-Quarter-2026-Results/default.aspx'
 },
 {
 category: 'inst',
 benchmark: false,
 company: 'Apple Inc. (AAPL)',
 leader: 'Tim Cook (Exec Chair) / John Ternus (CEO, Sep 2026+)',
 positioning: 'One-share-one-vote + Functional Org + Single Company-Wide P&L',
 culture: 'Experts Leading Experts + Single DRI + Apple University craft',
 headcount: '167,000 FTE (+0.6%) · $2.87M Rev/FTE',
 margins: 'FY26 Sales $478.8B · 48.8% GM (Services 76.2%) · Lean $9.0B CapEx',
 verdict: 'Philosophical mirror image: Apple perfects stealth hardware with minimal CapEx; Meta ships fast in public and bets $140B on sovereign compute.',
 sourceLabel: 'HBR / Apple FY26',
 sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
 },
 {
 category: 'founder',
 benchmark: false,
 company: 'NVIDIA (NVDA)',
 leader: 'Jensen Huang (Founder/CEO)',
 positioning: 'Ultra-flat web (~60 direct reports) + unified CUDA/silicon stack',
 culture: 'Zero business units + Top-5 email transparency + speed-of-light execution',
 headcount: '~42,000 FTE (~74% R&D) · ~$5.14M Rev/FTE',
 margins: 'FY26 Sales $215.9B · 71.1% GAAP GM · Net Inc $120.1B',
 verdict: 'Co-standard-bearer of Silicon Valley Founder Mode: flat, technical, anti-bureaucratic, and key compute supplier to Meta.',
 sourceLabel: 'NVIDIA FY26 Stats',
 sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'inst',
 benchmark: false,
 company: 'Alphabet / Google (GOOGL)',
 leader: 'Sundar Pichai (CEO) · Dual-Class Founder Backing',
 positioning: 'Search / Cloud / YouTube segments + unified DeepMind AI engine',
 culture: 'Deep CS research heritage + decade-long custom TPU advantage',
 headcount: '~183,000 FTE · ~$2.20M Rev/FTE',
 margins: 'FY25 Sales $402.8B · ~58.2% GM · Cloud external monetization',
 verdict: 'Closest ad rival: owns Android/Chrome distribution and cloud revenue, though historically less aggressive than Meta in de-layering.',
 sourceLabel: 'SEC 10-K Comparison',
 sourceUrl: 'https://www.globalbrandsmagazine.com/meta-growth-in-charts-2015-2025/'
 },
 {
 category: 'inst',
 benchmark: false,
 company: 'Amazon (AMZN)',
 leader: 'Jeff Bezos (Exec Chair) / Andy Jassy (CEO)',
 positioning: 'Service-oriented APIs + thousands of decentralized Two-Pizza Teams',
 culture: 'Day 1 obsession + 16 Leadership Principles + 6-Pager memos',
 headcount: '~1.55M+ (incl. global fulfillment)',
 margins: 'FY25 Sales $716.9B · AWS cloud & high-margin retail ads',
 verdict: 'Decentralized scale engine: excels at multi-business incubation, whereas Meta centralizes ranking & AI across one 3.64B-user graph.',
 sourceLabel: 'SEC 10-K Comparison',
 sourceUrl: 'https://www.globalbrandsmagazine.com/meta-growth-in-charts-2015-2025/'
 }
 ];

 var CHECKLIST_ZH = [
 { tag: '去中层纪律', title: '1. “扁平即极速”防反弹测试：营收高增期是否严控纯管理岗回潮？', desc: '检验公司员工规模是否维持在 ~6.5万–7万精兵区间、管理幅度保持宽幅且人均年化创收站稳 $3.5M+。' },
 { tag: '算力变现闭环', title: '2. $135B–$145B 算力投资回报测试：广告提价与 Muse 能否跑赢折旧？', desc: '跟踪每季单条广告均价涨幅（Q3 +14%）及 Muse / WhatsApp 商业代理收入能否消化未来五年的巨额服务器折旧。' },
 { tag: 'MSL × 产品协同', title: '3. 特区融合测试：超级智能实验室（MSL）成果能否丝滑注入四大应用？', desc: '核查 Alexandr Wang 前沿模型团队与 Chris Cox / Bosworth 应用工程团队是否形成正向飞轮而非高薪孤岛。' },
 { tag: 'SBC 摊薄约束', title: '4. 股权激励克制测试：高管登月期权与 AI 顶薪包是否可控？', desc: '9M 2026 SBC 达 $210.5亿，需跟踪股权激励增速是否低于经营现金流增速，避免长期侵蚀中小股东权益。' },
 { tag: 'RL 减亏兑现', title: '5. 硬件资本纪律测试：Reality Labs 2027 年能否如期减亏至 ~$15B？', desc: '核查依视路智能眼镜放量是否真正改善硬件毛利，兑现 CFO 对 2026–2027 连续减亏的公开承诺。' },
 { tag: 'Class C 与合规', title: '6. 三层股本与青少年合规测试：Class C 发行与欧美诉讼是否受控？', desc: '跟踪 2027.01 Class C 普通股生效后的资本运作纪律，以及美国青少年诉讼与欧盟 DMA 后续合规冲击。' }
 ];

 var CHECKLIST_EN = [
 { tag: 'Flat Discipline', title: '1. Anti-Bloat Test: Is Meta holding the line near ~67k FTEs amid 26%+ growth?', desc: 'Verify whether management layers stay compressed and annualized revenue per employee remains above $3.5M.' },
 { tag: '$140B CapEx ROI', title: '2. Compute Payback Test: Are ad price gains (+14%) & Muse outpacing depreciation?', desc: 'Monitor whether AI-driven ad eCPM lift and Muse / WhatsApp Business monetization offset rising D&A.' },
 { tag: 'MSL Integration', title: '3. Lab-to-Product Test: Are MSL frontier models translating into daily app engagement?', desc: 'Check synergy between Alexandr Wang\'s Superintelligence Lab and Chris Cox / Bosworth product engineering.' },
 { tag: 'SBC Dilution', title: '4. Stock Compensation Test: Is $21B+ YTD SBC disciplined relative to cash flow?', desc: 'Track C-suite moonshot options and AI researcher packages against operating cash flow growth.' },
 { tag: 'RL ~$15B Target', title: '5. Hardware Discipline Test: Does Reality Labs narrow losses to ~$15B in 2027?', desc: 'Verify Ray-Ban / Oakley / Display eyewear unit economics and adherence to CFO loss-reduction guidance.' },
 { tag: 'Class C & Legal', title: '6. Governance & Regulatory Test: Disciplined Class C issuance & youth trial outcomes?', desc: 'Monitor post-Jan 2027 Class C equity deployment, US youth trial verdicts, and EU DMA ad compliance.' }
 ];

 var QUICK_JUMP = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '60.8%投票权 · 66,775人创 $3.87M 年化人效 · 82%毛利率' },
 { sec: 'sec-01', title: '01 创始人锁权与战时扁平架构', sub: 'MSL 特区 + FoA 统一产品链 + Class C 新股 · 双视图图表' },
 { sec: 'sec-02', title: '02 四大文化支柱与五维雷达图', sub: 'Flatter is Faster · PSC 鲨鱼池 · 对比 Apple 与 Alphabet' },
 { sec: 'sec-03', title: '03 全球科技巨头文化横向对比', sub: 'Meta vs Apple vs NVIDIA vs Alphabet vs Amazon' },
 { sec: 'sec-04', title: '04 AI 商业红利与跨周期复利推演', sub: 'IPO 以来 >1,700% 涨幅 · 交互式复利模拟器' },
 { sec: 'sec-05', title: '05 三代演进与四大生死战役复盘', sub: '移动并购 · 效率之年 · MSL 重组 · 智能眼镜转向' },
 { sec: 'sec-06', title: '06 Meta 组织法则诊断清单', sub: '6 项战时组织效能与治理暗礁本地持久化核查' },
 { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC FY25 10-K · Q3 2026 财报 · 官方 AI 与芯片公报' }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 14, priceCagr: 23.0, drip: true },
 p2: { principal: 10000, years: 4, priceCagr: 48.0, drip: false },
 p3: { principal: 10000, years: 5, priceCagr: 18.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 ch1Series: { s1: true, s2: true },
 activePillar: 0,
 radarSeries: { meta: true, aapl: true, goog: true },
 epsSeries: { eps: true, oci: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 10000, years: 14, priceCagr: 23.0, drip: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };

 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function isEn() { return state.lang === 'en'; }

 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg;
 el.classList.add('show');
 clearTimeout(el._t);
 el._t = setTimeout(function () { el.classList.remove('show'); }, 2600);
 }

 function escapeHtml(s) {
 return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 }

 function highlightMatch(text, query) {
 var safe = escapeHtml(text);
 if (!query) return safe;
 var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
 }

 function applyTheme(theme, silent) {
 state.theme = theme === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var abIconEl = document.getElementById('appbarThemeIcon');
 if (abIconEl) {
 abIconEl.innerHTML = state.theme === 'dark'
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 
 
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色护眼模式' : '已切换至浅色阅读模式');
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.getElementById('langZhBtn').classList.toggle('active', !en);
 document.getElementById('langEnBtn').classList.toggle('active', en);
 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
 else nodes[i].textContent = val;
 }
 }
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>';
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
 if (!silent) showToast(en ? 'Switched to English Edition' : '已切换至中文研报视图');
 }

 function exportSelfHtml() {
 var htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
 var blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
 var url = URL.createObjectURL(blob);
 var link = document.createElement('a');
 link.href = url;
 link.download = 'Meta公司 Meta Platforms 企业文化与组织架构深度研究报告.html';
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 setTimeout(function () { URL.revokeObjectURL(url); }, 1800);
 showToast('已开始下载《Meta公司 Meta Platforms 企业文化与组织架构深度研究报告.html》');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody');
 var badge = document.getElementById('peerCountBadge');
 if (!tbody) return;
 var rows = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = rows.filter(function (row, idx) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var hay = (PEER_ROWS_ZH[idx].company + ' ' + PEER_ROWS_ZH[idx].leader + ' ' + PEER_ROWS_ZH[idx].positioning + ' ' + PEER_ROWS_ZH[idx].culture + ' ' + PEER_ROWS_EN[idx].company + ' ' + PEER_ROWS_EN[idx].culture).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 if (badge) badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + rows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + rows.length + ' 家标杆企业');
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配的标杆企业记录，请清空搜索词重试。</td></tr>';
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

 function formatCurrency(val) {
 if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
 return '$' + Math.round(val).toLocaleString('en-US');
 }

 function updateSimulatorUI() {
 var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
 var boost = state.sim.drip ? 2.5 : 0.0;
 var totalRate = (cagr + boost) / 100;
 var endingValue = p * Math.pow(1 + totalRate, yrs);
 var moic = endingValue / p;
 var netGain = endingValue - p;
 var midYear = Math.max(1, Math.floor(yrs / 2));
 var midValue = p * Math.pow(1 + totalRate, midYear);

 document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
 document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
 document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
 document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
 document.getElementById('simMoicVal').textContent = (moic >= 100 ? moic.toFixed(1) : moic.toFixed(2)) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
 document.getElementById('simNetGainVal').textContent = formatCurrency(netGain);
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint') : ('第 ' + midYear + ' 年中期资产节点');
 document.getElementById('simMidVal').textContent = formatCurrency(midValue);

 var pBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < pBtns.length; i++) pBtns[i].classList.toggle('active', pBtns[i].getAttribute('data-preset') === state.sim.preset);
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 if (!container) return;
 var items = isEn() ? CHECKLIST_EN : CHECKLIST_ZH;
 var done = state.checks.filter(Boolean).length;
 var pct = Math.round((done / items.length) * 100);
 if (chip) chip.textContent = isEn() ? ('Verified ' + done + ' / ' + items.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + items.length + ' 项 (' + pct + '%)');
 if (bar) bar.style.width = pct + '%';
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

 // High-DPI Canvas Suite (5 Charts)
 function getPalette() {
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
 tick: isDark ? '#94A3B8' : '#475569',
 text: isDark ? '#F3F6F9' : '#0F1924',
 sub: isDark ? '#B2BAC2' : '#334155',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.88)' : 'rgba(255, 255, 255, 0.94)',
 pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
 trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
 hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
 c1: isDark ? '#3399FF' : '#0073E6',
 c2: isDark ? '#22C55E' : '#16A34A',
 c3: isDark ? '#FFB74D' : '#D97706',
 c4: isDark ? '#A78BFA' : '#7C3AED'
 };
 }

 function prepareCanvas(id) {
 var canvas = document.getElementById(id);
 if (!canvas || !canvas.parentElement) return null;
 var rect = canvas.parentElement.getBoundingClientRect();
 var w = Math.max(240, Math.floor(rect.width));
 var h = Math.max(170, Math.floor(rect.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 canvas.style.width = w + 'px';
 canvas.style.height = h + 'px';
 canvas.width = Math.floor(w * dpr);
 canvas.height = Math.floor(h * dpr);
 var ctx = canvas.getContext('2d');
 ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
 ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }

 function roundRectPath(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h - rad);
 ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
 ctx.lineTo(x + rad, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.closePath();
 }

 function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
 ctx.save();
 ctx.font = '700 10.5px "IBM Plex Mono", system-ui, sans-serif';
 var tw = ctx.measureText(text).width + 9, th = 17;
 ctx.fillStyle = pal.pillBg;
 roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5);
 ctx.fill();
 ctx.strokeStyle = pal.pillBorder;
 ctx.lineWidth = 1;
 ctx.stroke();
 ctx.fillStyle = fgColor;
 ctx.textAlign = 'center';
 ctx.textBaseline = 'middle';
 ctx.fillText(text, cx, cy + 0.5);
 ctx.restore();
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var metaEl = document.getElementById('ch1AxisMeta');
 var leg1 = document.getElementById('ch1Leg1'), leg2 = document.getElementById('ch1Leg2');

 if (state.ch1View === 'viewA') {
 if (metaEl) metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 蓝色：FY2024 审计值 ($B)</span><span style="color:var(--chart-c2);">■ 绿色：FY2025 审计值 ($B · 9M26 营收再增 +29%)</span>';
 if (leg1) leg1.textContent = 'FY2024 审计财务规模 ($B)';
 if (leg2) leg2.textContent = 'FY2025 审计财务规模 ($B)';
 var pad = { top: 30, right: 18, bottom: 44, left: 52 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var labels = ['集团总营收', '核心广告营收', 'FoA营业利润', '集团营业利润', '经营现金流OCF'];
 var sub = ['+22.2% YoY', '+22.1% YoY', '+17.6% YoY', '+20.0% YoY', '+26.8% YoY'];
 var fy24 = [164.50, 160.63, 87.11, 69.38, 91.33];
 var fy25 = [200.97, 196.18, 102.47, 83.28, 115.80];
 var maxY = 225;
 for (var g = 0; g <= 4; g++) {
 var gv = Math.round((maxY / 4) * g), gy = pad.top + ph - (g / 4) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
 }
 var step = pw / labels.length, bw = Math.min(36, Math.max(14, step * 0.27));
 for (var i = 0; i < labels.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (hoverState.chartCh1 === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 8); ctx.fill(); }
 var y1 = pad.top + ph - (fy24[i] / maxY) * ph, y2 = pad.top + ph - (fy25[i] / maxY) * ph;
 if (state.ch1Series.s1) {
 var x1 = state.ch1Series.s2 ? (cx - bw - 3) : (cx - bw / 2);
 ctx.fillStyle = pal.c1; roundRectPath(ctx, x1, y1, bw, pad.top + ph - y1, 5); ctx.fill();
 }
 if (state.ch1Series.s2) {
 var x2 = state.ch1Series.s1 ? (cx + 3) : (cx - bw / 2);
 ctx.fillStyle = pal.c2; roundRectPath(ctx, x2, y2, bw, pad.top + ph - y2, 5); ctx.fill();
 drawValueBadge(ctx, '$' + fy25[i].toFixed(1) + 'B', x2 + bw / 2, y2 - 12, pal.c2, pal);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(labels[i], cx, pad.top + ph + 18);
 ctx.fillStyle = pal.c2; ctx.font = '600 10px "IBM Plex Mono", sans-serif';
 ctx.fillText(sub[i], cx, pad.top + ph + 33);
 hitRegions.chartCh1.push({ idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36, html: '<strong>' + labels[i] + '</strong><br/>• FY2024: <strong>$' + fy24[i].toFixed(2) + 'B</strong><br/>• FY2025: <strong>$' + fy25[i].toFixed(2) + 'B</strong> (' + sub[i] + ')' });
 }
 } else {
 if (metaEl) metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ 左轴：员工总数 (千人 · 86.5k 压降至 66.8k)</span><span style="color:var(--chart-c2);">● 右轴：年化人均创收 ($M/人)</span>';
 if (leg1) leg1.textContent = '期末全职员工人数 (左轴 · 千人)';
 if (leg2) leg2.textContent = '年化人均创收 (右轴 · $M/人)';
 var padB = { top: 28, right: 52, bottom: 38, left: 48 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var yrs = ['FY21', 'FY22膨胀', 'FY23刮骨', 'FY24', 'FY25', 'Q3 26精兵'];
 var empK = [72.0, 86.5, 67.3, 74.1, 78.9, 66.8];
 var revM = [1.64, 1.35, 2.00, 2.22, 2.55, 3.87];
 var maxEmp = 110, minR = 1.0, maxR = 4.2;
 for (var j = 0; j <= 4; j++) {
 var r = j / 4, yg = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yg); ctx.lineTo(padB.left + pwB, yg); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.fillText(Math.round(maxEmp * r) + 'k', padB.left - 7, yg + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText('$' + (minR + r * (maxR - minR)).toFixed(2) + 'M', padB.left + pwB + 7, yg + 4);
 }
 var stepB = pwB / yrs.length, bW = Math.min(36, stepB * 0.42), pts = [];
 for (var k = 0; k < yrs.length; k++) {
 var cxB = padB.left + stepB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bhB = (empK[k] / maxEmp) * phB, byB = padB.top + phB - bhB;
 ctx.fillStyle = k === 1 ? '#DC2626' : pal.c1;
 roundRectPath(ctx, cxB - bW / 2, byB, bW, bhB, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(empK[k].toFixed(1) + 'k', cxB, byB + 15);
 }
 var ly = padB.top + phB - ((revM[k] - minR) / (maxR - minR)) * phB;
 pts.push({ x: cxB, y: ly, v: revM[k] });
 ctx.fillStyle = pal.tick; ctx.font = '600 11px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(yrs[k], cxB, padB.top + phB + 22);
 hitRegions.chartCh1.push({ idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 26, html: '<strong>' + yrs[k] + '</strong><br/>• 总员工数：<strong>' + Math.round(empK[k] * 1000).toLocaleString() + ' 人</strong><br/>• 年化人均创收：<strong>$' + revM[k].toFixed(2) + 'M / 人</strong>' });
 }
 if (state.ch1Series.s2) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
 pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
 ctx.stroke();
 pts.forEach(function (pt, idx) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2); ctx.fill();
 if (idx === 1 || idx >= 4) drawValueBadge(ctx, '$' + pt.v.toFixed(2) + 'M', pt.x, pt.y - 15, pal.c2, pal);
 });
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = ['战略急转弯速度', '去中层扁平人效', '实验数据驱动力', '算力资本激进度', '硬件工匠保密性'];
 var series = [
 { key: 'meta', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.6, 9.8, 9.9, 6.8] },
 { key: 'aapl', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [7.6, 8.8, 7.8, 5.5, 9.9] },
 { key: 'goog', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [7.2, 7.4, 8.9, 8.8, 7.2] }
 ];
 var cx = w / 2, cy = h / 2 + 8, radius = Math.max(62, Math.min((w - 200) / 2, h * 0.35)), total = 5;
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
 for (var a = 0; a < total; a++) {
 var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total;
 var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
 var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
 ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textBaseline = 'middle';
 ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({ idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 20, w: 72 + Math.abs(lx - ax), h: 40, html: '<strong>' + axes[a] + '</strong><br/>• Meta: <strong>' + series[0].vals[a] + '</strong> · Apple: <strong>' + series[1].vals[a] + '</strong> · Alphabet: <strong>' + series[2].vals[a] + '</strong>' });
 }
 series.forEach(function (it) {
 if (!state.radarSeries[it.key]) return;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total, d = (it.vals[idx] / 10) * radius;
 var vx = cx + Math.cos(th) * d, vy = cy + Math.sin(th) * d;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath(); ctx.fillStyle = it.fill; ctx.fill(); ctx.strokeStyle = it.color; ctx.lineWidth = 2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = [
 { label: 'Meta 全集团全年综合毛利率 (FY2025)', val: 82.0, col: '#16A34A', sub: '$164,791M / $200,966M', note: '零内容采购与高自动化广告竞价铸就科技五巨头最高毛利率' },
 { label: '扎克伯格创始人总投票权控制比例 (Class B 10票权)', val: 60.8, col: '#0073E6', sub: '经济持股仅 ~13.4%', note: '叠加 2027.01 Class C 无投票权普通股永久锁定战略拍板权' },
 { label: '应用家族 (Family of Apps) 全年营业利润率 (FY25)', val: 51.6, col: '#2563EB', sub: '$102,469M / $198,759M', note: '单分部年产超千亿美元营业利润输血 AI 与智能眼镜' },
 { label: 'Meta 全集团全年合并营业利润率 (FY25)', val: 41.4, col: '#0284C7', sub: '营业利润 $83,276M (+20%)', note: '全额消化 Reality Labs -$191.9亿亏损后仍超四成' },
 { label: '9M 2026 研发费用占总营收比重 (R&D Intensity)', val: 32.7, col: '#7C3AED', sub: '$59,409M / $181,712M (+48%)', note: '全力投向 MSL 超智能人才与 AI 基础设施' },
 { label: '9M 2026 营销与销售费用占总营收比重 (M&S Ratio)', val: 5.3, col: '#D97706', sub: '$9,672M / $181,712M', note: '自助式 Advantage+ 竞价使销售人力占比极度精简' }
 ];
 var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 90;
 for (var g = 0; g <= 4; g++) {
 var xv = Math.round((maxX / 4) * g), gx = pad.left + (xv / maxX) * pw;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.fillText(xv + '%', gx, pad.top + ph + 18);
 }
 var rowH = ph / items.length;
 items.forEach(function (it, i) {
 var rt = pad.top + rowH * i;
 var ly = rt + Math.max(15, rowH * 0.34), by = rt + Math.max(22, rowH * 0.50), bh = 13;
 var bw = Math.max(8, (it.val / maxX) * pw);
 ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText(it.label, pad.left, ly);
 ctx.fillStyle = it.col; ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, ly);
 if (w >= 560) { ctx.fillStyle = pal.tick; ctx.font = '500 11px "IBM Plex Mono", sans-serif'; ctx.fillText(it.sub, pad.left + pw - 58, ly); }
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, by, pw, bh, 6); ctx.fill();
 ctx.fillStyle = it.col; roundRectPath(ctx, pad.left, by, bw, bh, 6); ctx.fill();
 hitRegions.chartBars.push({ idx: i, x: pad.left, y: rt, w: pw, h: rowH, html: '<strong>' + it.label + ': ' + it.val.toFixed(1) + '%</strong><br/>• 口径：' + it.sub + '<br/>• 洞察：' + it.note });
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var years = ['FY2021', 'FY2022谷底', 'FY2023反转', 'FY2024', 'FY2025', 'FY2026E内生'];
 var opB = [46.75, 28.94, 46.75, 69.38, 83.28, 89.50]; // FY26E ex-$9.89B AG settlement guided > FY25 ($83.28B)
 var gmPct = [80.8, 78.3, 80.8, 81.7, 82.0, 80.8];
 var pad = { top: 26, right: 50, bottom: 38, left: 50 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var maxOp = 105, minGm = 74, maxGm = 85;
 for (var g = 0; g <= 4; g++) {
 var r = g / 4, gy = pad.top + ph - r * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.fillText('$' + Math.round(maxOp * r) + 'B', pad.left - 7, gy + 4);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minGm + r * (maxGm - minGm)).toFixed(1) + '%', pad.left + pw + 7, gy + 4);
 }
 var step = pw / years.length, bw = Math.min(42, step * 0.44), pts = [];
 years.forEach(function (y, i) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = (opB[i] / maxOp) * ph, by = pad.top + ph - bh;
 ctx.fillStyle = i === 1 ? '#DC2626' : pal.c1;
 roundRectPath(ctx, cx - bw / 2, by, bw, bh, 6); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + opB[i].toFixed(1) + 'B', cx, by + 16);
 }
 var oy = pad.top + ph - ((gmPct[i] - minGm) / (maxGm - minGm)) * ph;
 pts.push({ x: cx, y: oy, gm: gmPct[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(y, cx, pad.top + ph + 20);
 hitRegions.chartEps.push({ idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28, html: '<strong>' + y + '</strong><br/>• 营业利润：<strong>$' + opB[i].toFixed(2) + 'B</strong><br/>• 综合毛利率：<strong>' + gmPct[i].toFixed(1) + '%</strong>' });
 });
 if (state.epsSeries.oci) {
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
 pts.forEach(function (p, i) { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
 ctx.stroke();
 pts.forEach(function (p) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.2, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, p.gm.toFixed(1) + '%', p.x, p.y - 15, pal.c2, pal);
 });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years;
 var rBase = state.sim.priceCagr / 100;
 var rTot = (state.sim.priceCagr + (state.sim.drip ? 2.5 : 0)) / 100;
 var totS = [], baseS = [];
 for (var y = 0; y <= yrs; y++) { totS.push(p * Math.pow(1 + rTot, y)); baseS.push(p * Math.pow(1 + rBase, y)); }
 var maxV = Math.max(totS[yrs], baseS[yrs], p * 1.2) * 1.08;
 var pad = { top: 20, right: 20, bottom: 28, left: 60 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 for (var g = 0; g <= 3; g++) {
 var v = (maxV / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
 ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 7, gy + 4);
 }
 var stepX = pw / yrs;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var px = pad.left + stepX * i, py = pad.top + ph - (baseS[i] / maxV) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.stroke(); ctx.restore();

 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 for (var k = 0; k <= yrs; k++) {
 var tx = pad.left + stepX * k, ty = pad.top + ph - (totS[k] / maxV) * ph;
 if (k === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
 if (k === 0 || k === Math.floor(yrs / 2) || k === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + k, tx, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({ idx: k, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22, html: '<strong>第 ' + k + ' 年资产模拟</strong><br/>• 含 AI 溢价与分红复投：<strong>' + formatCurrency(totS[k]) + '</strong><br/>• 基础增长轨迹：<strong>' + formatCurrency(baseS[k]) + '</strong>' });
 }
 ctx.stroke();
 }

 function renderAllCharts() {
 drawCh1Chart();
 drawRadarChart();
 drawHorizontalBars();
 drawEpsComboChart();
 drawSimChart();
 }

 function wireCanvasTooltip(cid) {
 var canvas = document.getElementById(cid), tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
 canvas.addEventListener('mousemove', function (e) {
 var rect = canvas.getBoundingClientRect();
 var x = e.clientX - rect.left, y = e.clientY - rect.top;
 var regs = hitRegions[cid] || [], matched = null;
 for (var i = 0; i < regs.length; i++) {
 var r = regs[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
 }
 var nextIdx = matched ? matched.idx : -1;
 if (hoverState[cid] !== nextIdx) { hoverState[cid] = nextIdx; if (redrawMap[cid]) redrawMap[cid](); }
 if (matched) {
 tip.innerHTML = matched.html;
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () {
 hoverState[cid] = -1;
 if (redrawMap[cid]) redrawMap[cid]();
 tip.style.display = 'none';
 });
 }

 function init() {
 try {
 var st = (localStorage.getItem(STORAGE_THEME_KEY) || '').replace(/^"|"$/g, '');
 if (st === 'light' || st === 'dark') state.theme = st;
 var sl = (localStorage.getItem(STORAGE_LANG_KEY) || '').replace(/^"|"$/g, '');
 if (sl === 'zh' || sl === 'en') state.lang = sl;
 var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
 if (Array.isArray(sc) && sc.length === 6) state.checks = sc.map(Boolean);
 } catch (e) {}

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

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

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 
 
 document.querySelectorAll('[data-export-self]').forEach(function (b) { b.addEventListener('click', exportSelfHtml); });
 

 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth >= 1120) {
 var col = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
 if (col) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
 else document.documentElement.removeAttribute('data-sidebar-collapsed');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '1' : '0'); } catch (e) {}
 setTimeout(renderAllCharts, 60);
 } else {
 document.body.classList.toggle('portal-detail-drawer');
 }
 });
 document.getElementById('portalDetailBackdrop').addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 document.querySelectorAll('#tocNavList .mui-nav-link').forEach(function (lnk) {
 lnk.addEventListener('click', function () { document.body.classList.remove('portal-detail-drawer'); });
 });

 // Quick Jump
 var jIn = document.getElementById('quickJumpInput'), jPop = document.getElementById('quickJumpPopover');
 function renderJump(q) {
 var kw = (q || '').trim().toLowerCase();
 var list = QUICK_JUMP.filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
 jPop.innerHTML = list.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
 }).join('');
 jPop.classList.toggle('open', list.length > 0);
 }
 jIn.addEventListener('focus', function () { renderJump(jIn.value); });
 jIn.addEventListener('input', function () { renderJump(jIn.value); });
 jPop.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-jump-sec]');
 if (!btn) return;
 var secEl = document.getElementById(btn.getAttribute('data-jump-sec'));
 if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
 jPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jPop.classList.remove('open'); });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jIn.focus(); }
 if (e.key === 'Escape') { jPop.classList.remove('open'); document.body.classList.remove('portal-detail-drawer'); }
 });

 // Ch1 Tabs & Series
 document.querySelectorAll('[data-ch1-view]').forEach(function (b) {
 b.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-ch1-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-ch1-series');
 state.ch1Series[k] = !state.ch1Series[k];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[k] = true;
 this.classList.toggle('muted', !state.ch1Series[k]);
 drawCh1Chart();
 });
 });

 // Collapsible Matrix Cards
 document.querySelectorAll('[data-collapse-target]').forEach(function (b) {
 b.addEventListener('click', function () {
 var panel = document.getElementById(this.getAttribute('data-collapse-target'));
 if (!panel) return;
 var open = panel.classList.toggle('open');
 this.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
 });
 });

 // Pillars & Radar
 var pCards = document.querySelectorAll('[data-pillar]');
 pCards.forEach(function (c) {
 c.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 pCards.forEach(function (el, k) { el.classList.toggle('active', k === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[idx] + '</div>';
 drawRadarChart();
 });
 });
 document.querySelectorAll('[data-radar-key]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-radar-key');
 state.radarSeries[k] = !state.radarSeries[k];
 if (!state.radarSeries.meta && !state.radarSeries.aapl && !state.radarSeries.goog) state.radarSeries[k] = true;
 this.classList.toggle('muted', !state.radarSeries[k]);
 drawRadarChart();
 });
 });

 // Peer Table Filter
 document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
 var pfBtns = document.querySelectorAll('[data-peer-filter]');
 pfBtns.forEach(function (b) {
 b.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 pfBtns.forEach(function (el) { el.classList.toggle('active', el === b); });
 renderPeerTable();
 });
 });

 // EPS Legend & Simulator
 document.querySelectorAll('[data-eps-series]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-eps-series');
 state.epsSeries[k] = !state.epsSeries[k];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[k] = true;
 this.classList.toggle('muted', !state.epsSeries[k]);
 drawEpsComboChart();
 });
 });

 var pSl = document.getElementById('simPrincipalSlider'), ySl = document.getElementById('simYearsSlider'), cSl = document.getElementById('simCagrSlider'), dTg = document.getElementById('simDripToggle');
 pSl.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 ySl.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 14; state.sim.preset = ''; updateSimulatorUI(); });
 cSl.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
 dTg.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
 document.querySelectorAll('[data-preset]').forEach(function (b) {
 b.addEventListener('click', function () {
 var k = this.getAttribute('data-preset'), cfg = PRESETS[k];
 if (!cfg) return;
 state.sim = { principal: cfg.principal, years: cfg.years, priceCagr: cfg.priceCagr, drip: cfg.drip, preset: k };
 pSl.value = String(cfg.principal); ySl.value = String(cfg.years); cSl.value = String(cfg.priceCagr); dTg.checked = cfg.drip;
 updateSimulatorUI();
 });
 });

 // Checklist
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
 showToast('已勾选全部 6 项 Meta 战时组织核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 showToast('核查清单已恢复默认基准状态 (50%)');
 });

 window.addEventListener('scroll', function () {
 var docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / docH) * 100) + '%';
 }, { passive: true });

 if ('IntersectionObserver' in window) {
 var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
 var obs = new IntersectionObserver(function (entries) {
 entries.forEach(function (en) {
 if (en.isIntersecting) {
 tocLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-sec') === en.target.id); });
 }
 });
 }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
 for (var s = 0; s <= 7; s++) { var sn = document.getElementById('sec-0' + s); if (sn) obs.observe(sn); }
 }

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);
 var rt = null;
 window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 70); });
 renderAllCharts();
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 