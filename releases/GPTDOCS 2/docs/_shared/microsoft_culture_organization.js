
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
 var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
 var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
 var STORAGE_CHECK_KEY = 'mui_msft_culture_checks_v1';

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 成长型思维）：</strong>纳德拉在 2026 年致股东信中引用古罗马诗人贺拉斯名言“敢于求知，即刻启程（Dare to know. Begin.）”——正是这种承认未知、拒绝守旧的文化，让一家 51 岁老牌软件巨头跑出了超越初创公司的 AI 商业化速度 <a class="cite-link" href="https://www.microsoft.com/investor/reports/ar26/index.html" target="_blank" rel="noopener noreferrer">2026 股东信 ↗</a>。',
 '<strong>当前选中支柱解读（02 生态实用主义）：</strong>微软从不被“必须只用自家技术”的执念束缚：在 Foundry 中同时托管 OpenAI、Anthropic、Meta Llama 与自研 MAI 模型，谁能帮企业降低单位产出成本就集成谁 <a class="cite-link" href="https://news.microsoft.com/source/2026/11/17/microsoft-ignite-2026-empowering-human-ambition-intelligence-and-trust/" target="_blank" rel="noopener noreferrer">Ignite 2026 ↗</a>。',
 '<strong>当前选中支柱解读（03 教练式高绩效管理）：</strong>温暖不等同于纵容低效——2025–2026 年微软退役冗长旧 SLT、严控编制（同比净减 5,000 人）并开放自愿离职通道压缩层级，推动 Q1 FY27 营业利润率飙至 49.8% <a class="cite-link" href="https://www.businessinsider.com/satya-nadella-microsoft-ai-leadership-reset-2026-5" target="_blank" rel="noopener noreferrer">组织扁平化 ↗</a>。',
 '<strong>当前选中支柱解读（04 安全与主权信任）：</strong>通过 10,000 人安全工程团队与 SFI 全员薪酬挂钩问责，微软将“安全高于一切”植入每一行代码与每一个 Agent 365 权限护栏中 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/789019/000119312526427849/d61756ddef14a.htm" target="_blank" rel="noopener noreferrer">2026 DEF 14A ↗</a>。'
 ];

 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Growth Mindset):</strong> Quoting Horace ("Dare to know. Begin.") in his 2026 Shareholder Letter, Satya Nadella embedded "learn-it-all" curiosity across 223,000 employees—enabling a 51-year-old enterprise giant to move at startup speed <a class="cite-link" href="https://www.microsoft.com/investor/reports/ar26/index.html" target="_blank" rel="noopener noreferrer">2026 AR Letter ↗</a>.',
 '<strong>Selected Pillar (02 · Pragmatic Openness):</strong> Rejecting Not-Invented-Here dogma, Microsoft Foundry hosts OpenAI, Anthropic, Meta Llama, and in-house MAI models side by side so enterprises optimize cost-to-outcome <a class="cite-link" href="https://news.microsoft.com/source/2026/11/17/microsoft-ignite-2026-empowering-human-ambition-intelligence-and-trust/" target="_blank" rel="noopener noreferrer">Ignite 2026 ↗</a>.',
 '<strong>Selected Pillar (03 · High-Rigor Model-Coach-Care):</strong> Pairing empathy with rigor, Microsoft retired its bureaucratic SLT, trimmed FTEs by -2.2%, and lifted Q1 FY27 operating margin to 49.8% <a class="cite-link" href="https://www.businessinsider.com/satya-nadella-microsoft-ai-leadership-reset-2026-5" target="_blank" rel="noopener noreferrer">AI Org Reboot ↗</a>.',
 '<strong>Selected Pillar (04 · Secure Future Initiative):</strong> Backed by 10,000 security engineers, SFI ties every employee\'s performance review directly to cybersecurity milestones and enterprise data sovereignty <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/789019/000119312526427849/d61756ddef14a.htm" target="_blank" rel="noopener noreferrer">2026 DEF 14A ↗</a>.'
 ];

 var PEER_ROWS = [
 {
 category: 'unitary',
 benchmark: true,
 company: '研究基准：微软 (Microsoft · MSFT)',
 leader: '萨提亚·纳德拉 / Judson Althoff (商业CEO)',
 positioning: '单一法人横向工程栈 (One Microsoft) + 商业/技术双核分治',
 culture: '成长型思维 (Learn-It-All) + SFI 安全入绩效 + 35人扁平工程圈',
 headcount: '22.3万人 (-2.2% YoY) · 人均创收 $1.49M',
 margins: 'FY26 营收 $3,318亿 · 营业利润率 46.8% (Q1: 49.8%) · 净利 $1,337亿',
 verdict: '企业级跨栈协同王者：无子公司壁垒，将身份、Office、GitHub 与 Azure AI 无缝织成 $6,780亿 RPO 护城河。',
 sourceLabel: 'SEC FY26 10-K',
 sourceUrl: 'https://www.sec.gov/Archives/edgar/data/789019/000119312526323660/msft-20260630.htm'
 },
 {
 category: 'unitary',
 benchmark: false,
 company: '苹果公司 (Apple · AAPL)',
 leader: '蒂姆·库克 (执行董事长) / 约翰·特努斯 (CEO)',
 positioning: '职能制高度集权 + 全公司唯一损益表 (Single P&L)',
 culture: '专家领导专家 + DRI 唯一问责 + 极致工业设计减法与隔舱保密',
 headcount: '16.7万人 (41%工程) · 人均创收 $2.87M',
 margins: 'FY26 营收 $4,788亿 · 综合毛利 48.8% (服务 76.2%) · 净利 $1,322亿',
 verdict: '消费硬件极简巅峰 vs 企业软件广度霸主：苹果靠封闭自研赚硬件与个人生态税，微软靠开放结盟赚企业工作流与云算力税。',
 sourceLabel: 'HBR / SEC 10-K',
 sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
 },
 {
 category: 'unitary',
 benchmark: false,
 company: '英伟达 (NVIDIA · NVDA)',
 leader: '黄仁勋 (Jensen Huang)',
 positioning: '超扁平蛛网职能制 (~60名高管直报CEO) + 全栈算力单平台',
 culture: 'Top-5 邮件全员透明广播 + 零事业部内耗 + 光速执行危机感',
 headcount: '~4.2万人 (~74%研发) · 人均创收 ~$5.14M',
 margins: 'FY26 营收 $2,159亿 · GAAP 毛利率 71.1% · 净利 $1,201亿',
 verdict: '算力军火库盟友与竞合者：英伟达极致聚焦 AI 芯片与 CUDA 单一赛道，而微软覆盖从硅片、云到上层千万企业应用全链条。',
 sourceLabel: 'NVDA FY26 Stats',
 sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'modular',
 benchmark: false,
 company: '亚马逊 (Amazon · AMZN)',
 leader: '安迪·贾西 (Andy Jassy)',
 positioning: 'API 服务契约解耦 + 数千支“双披萨自治小队 (Two-Pizza Teams)”',
 culture: '永远的 Day 1 + 六页纸叙事备忘录 + 5天全员返岗铁腕去官僚',
 headcount: '~155万人 (含全球自建仓储物流网络)',
 margins: 'FY25 营收 $7,169亿 · AWS 云与高毛利零售广告双利润柱',
 verdict: '底层 IaaS 老对手：亚马逊小团队高度解耦适合单点基础设施高速创新，微软则在跨 Office/安全/云的一体化企业整合上占优。',
 sourceLabel: 'Amazon AR',
 sourceUrl: 'https://s2.q4cdn.com/299287126/files/doc_financials/2026/ar/Amazon-2025-Annual-Report.pdf'
 },
 {
 category: 'modular',
 benchmark: false,
 company: 'Alphabet / 谷歌 (GOOGL)',
 leader: '桑达尔·皮查伊 (Sundar Pichai)',
 positioning: '控股伞状架构 (Google 核心搜索/云 + DeepMind + Waymo 等 Other Bets)',
 culture: '底部向上工程研究文化 + TPU 全栈自研 + 搜索大模型融合提速',
 headcount: '~18.3万–19万人 · 人均创收 ~$1.9M+',
 margins: '综合毛利率 ~58% · 搜索广告高现金流补贴云与自动驾驶长线',
 verdict: 'AI 原生科研劲旅：谷歌拥有最深厚的原生大模型研究基因（Transformer 发源地），微软则凭借企业销售铁军与办公入口更快完成 B2B 变现。',
 sourceLabel: 'Big Tech 10-K',
 sourceUrl: 'https://bebop.ai/companies/largest-tech-companies'
 }
 ];

 var PEER_ROWS_EN = [
 {
 category: 'unitary',
 benchmark: true,
 company: 'Benchmark: Microsoft (MSFT)',
 leader: 'Satya Nadella / Judson Althoff (Commercial CEO)',
 positioning: 'Unitary One Microsoft Engineering + Dual-Core Commercial/Tech Split',
 culture: 'Learn-It-All Growth Mindset + SFI Comp Mandate + 35-Builder AI Circle',
 headcount: '223,000 FTE (-2.2% YoY) · $1.49M Rev / FTE',
 margins: 'FY26 Sales $331.8B · 46.8% Op Margin (Q1: 49.8%) · Net Inc $133.7B',
 verdict: 'Enterprise cross-stack standard: zero subsidiary silos weave Entra, M365, GitHub, and Azure AI into a $678B RPO moat.',
 sourceLabel: 'SEC FY26 10-K',
 sourceUrl: 'https://www.sec.gov/Archives/edgar/data/789019/000119312526323660/msft-20260630.htm'
 },
 {
 category: 'unitary',
 benchmark: false,
 company: 'Apple Inc. (AAPL)',
 leader: 'Tim Cook (Exec Chair) / John Ternus (CEO)',
 positioning: 'Centralized Functional Organization + Single Unified P&L',
 culture: 'Experts Leading Experts + Single DRI + Radical SKU Simplicity',
 headcount: '167,000 FTE (41% Eng) · $2.87M Rev / FTE',
 margins: 'FY26 Sales $478.8B · 48.8% GM (Services 76.2%) · Net Inc $132.2B',
 verdict: 'Consumer craft vs. enterprise platform breadth: Apple monetizes closed hardware-to-services; Microsoft monetizes open multi-model B2B workflows.',
 sourceLabel: 'HBR / SEC 10-K',
 sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
 },
 {
 category: 'unitary',
 benchmark: false,
 company: 'NVIDIA (NVDA)',
 leader: 'Jensen Huang',
 positioning: 'Ultra-flat ~60 direct reports + unified full-stack AI compute platform',
 culture: 'Top-5 email transparency + zero business units + speed-of-light execution',
 headcount: '~42,000 FTE (~74% R&D) · ~$5.14M Rev / FTE',
 margins: 'FY26 Sales $215.9B · 71.1% GAAP GM · Net Inc $120.1B',
 verdict: 'Compute supplier & co-opetitive partner: pure-play AI infrastructure vs. Microsoft\'s end-to-end cloud-to-enterprise-application stack.',
 sourceLabel: 'NVDA FY26 Stats',
 sourceUrl: 'https://www.gradually.ai/en/nvidia-statistics/'
 },
 {
 category: 'modular',
 benchmark: false,
 company: 'Amazon (AMZN)',
 leader: 'Andy Jassy',
 positioning: 'Decoupled API service contracts + Autonomous Two-Pizza Teams',
 culture: 'Day 1 obsession + 6-Pager narrative memos + strict 5-day RTO flattening',
 headcount: '~1.55M+ (including fulfillment operations)',
 margins: 'FY25 Sales $716.9B · AWS cloud & high-margin retail advertising',
 verdict: 'Modular speed vs. integrated suite: AWS excels in granular cloud primitives while Microsoft wins via bundled M365 + Security + Azure EAs.',
 sourceLabel: 'Amazon AR',
 sourceUrl: 'https://s2.q4cdn.com/299287126/files/doc_financials/2026/ar/Amazon-2025-Annual-Report.pdf'
 },
 {
 category: 'modular',
 benchmark: false,
 company: 'Alphabet / Google (GOOGL)',
 leader: 'Sundar Pichai',
 positioning: 'Holding company umbrella (Google Services / Cloud / DeepMind / Waymo)',
 culture: 'Bottom-up research excellence + custom TPU stack + AI search pivot',
 headcount: '~183k–190k FTE · ~$1.9M+ Rev / FTE',
 margins: '~58% Gross Margin · Search cash engine funding Cloud & Waymo',
 verdict: 'Research pioneer vs. enterprise GTM machine: Google pioneered Transformers and TPUs; Microsoft leads in Fortune 500 distribution and seat attach.',
 sourceLabel: 'Big Tech 10-K',
 sourceUrl: 'https://bebop.ai/companies/largest-tech-companies'
 }
 ];

 var CHECKLIST_ITEMS = [
 {
 tag: '去旧神坛勇气',
 title: '1. “反 Windows 路径依赖”测试：核心新业务是否被允许跨出甚至蚕食传统现金牛？',
 desc: '核查企业是否允许新一代产品（如跨平台云、多模型 Foundry）无视旧部门边界自由扩张，而非被迫捆绑保护落后的历史业务。'
 },
 {
 tag: '单一主干协同',
 title: '2. 并购与跨栈融合测试：新收购或孵化的产品能否迅速接入统一身份与销售总账单？',
 desc: '对标微软整合 LinkedIn、GitHub 与 Nuance 的做法，检验多业务线是共享底层客户图谱，还是沦为互不相通的控股孤岛。'
 },
 {
 tag: '双核带宽解放',
 title: '3. 最高统帅技术带宽测试：CEO 是否从日常销售琐事中抽身直抓前沿架构？',
 desc: '对标纳德拉任命商业 CEO 并直管 35 人创业型工程核心组，检验最高决策者是否真正深入底层算力、模型与产品细节。'
 },
 {
 tag: '人效与规模脱钩',
 title: '4. AI 内部提效损益表测试：营收高增期能否实现人员零膨胀与营业利润率扩张？',
 desc: '核查企业是否真正用 AI 改造自身研发与中后台（如微软 FY26 减员 2.2% 而营收增 18%、Q1 营业利润率达 49.8%）。'
 },
 {
 tag: 'SFI 硬约束',
 title: '5. 安全与主权信任测试：网络安全与客户数据边界是否具备绩效一票否决权？',
 desc: '在智能体深入企业核心库的时代，核查安全合规是否写入全员薪酬考核，并严格兑现“绝不挪用客户私有数据”契约。'
 },
 {
 tag: 'RPO 合同质量',
 title: '6. 重资本投入确定性测试：高额算力资本开支背后是否有多年期履约合同与正 FCF 支撑？',
 desc: '对标微软 $678B RPO 与 $182.9B OCF，区分“有真实企业订单锁定的基础设施扩建”与“纯投机性烧钱军备竞赛”。'
 }
 ];

 var CHECKLIST_ITEMS_EN = [
 {
 tag: 'Zero Sacred Cows',
 title: '1. Anti-Dogma Test: Are new platforms free to outgrow or cannibalize legacy cash cows?',
 desc: 'Verify whether emerging businesses (like multi-model cloud AI) can scale across any OS or model without protecting legacy silos.'
 },
 {
 tag: 'One Microsoft Spine',
 title: '2. Cross-Stack Integration Test: Do acquisitions plug into one unified identity & GTM graph?',
 desc: 'Benchmarked against LinkedIn and GitHub, check whether product lines compound on shared customer data rather than sitting in isolated subsidiaries.'
 },
 {
 tag: 'Builder Bandwidth',
 title: '3. CEO Technical Focus Test: Is top leadership shielded from bureaucracy to drive architecture?',
 desc: 'Like Nadella pairing Commercial CEO Judson Althoff with a flat 35-leader builder group, verify direct CEO engagement in product craft.'
 },
 {
 tag: '49.8% Op Margin',
 title: '4. AI Operating Leverage Test: Is revenue compounding faster than headcount?',
 desc: 'Check whether internal AI adoption enables revenue acceleration (+18% FY26) alongside leaner headcount (-2.2% FTEs) and margin expansion.'
 },
 {
 tag: 'SFI Comp Link',
 title: '5. Security & Data Sovereignty Test: Is cybersecurity tied directly to employee compensation?',
 desc: 'Verify whether security carries veto power over feature shipping and guarantees enterprise customers full ownership of their data and IP.'
 },
 {
 tag: '$678B RPO Backing',
 title: '6. Demand-Backed CapEx Test: Is infrastructure CapEx anchored by contracted RPO & positive FCF?',
 desc: 'Distinguish multi-year enterprise backlog-backed capacity expansion ($678B RPO, $67B positive FCF) from uncontracted speculative spend.'
 }
 ];

 var PRESETS = {
 p1: { principal: 10000, years: 12, priceCagr: 24.5, drip: true },
 p2: { principal: 10000, years: 12, priceCagr: 1.8, drip: true },
 p3: { principal: 10000, years: 10, priceCagr: 13.5, drip: true }
 };

 var state = {
 lang: 'zh',
 theme: 'dark',
 ch1View: 'viewA',
 activePillar: 0,
 radarSeries: { msft: true, aapl: true, legacy: true },
 ch1Series: { s1: true, s2: true },
 epsSeries: { eps: true, oci: true },
 peerFilter: 'all',
 peerQuery: '',
 sim: { principal: 10000, years: 12, priceCagr: 24.5, drip: true, preset: 'p1' },
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
 el._t = setTimeout(function () { el.classList.remove('show'); }, 2400);
 }

 

 function escapeHtml(str) {
 return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
 abIconEl.innerHTML = (state.theme === 'dark')
 ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 }
 
 
 try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? '已切换至深色外观' : '已切换至清晰浅色外观');
 }

 function syncCh1HeaderText() {
 var titleEl = document.getElementById('ch1ChartTitle');
 var subEl = document.getElementById('ch1ChartSub');
 if (state.ch1View === 'viewA') {
 titleEl.textContent = isEn()
 ? 'Q1 FY2026 vs. Q1 FY2027 Product & Cloud Offerings Revenue ($B · SEC EX-99.1)'
 : 'Q1 FY2026 vs Q1 FY2027 新口径核心产品与云服务营收跃升（$B · SEC EX-99.1）';
 subEl.textContent = isEn()
 ? 'First standalone dollar disclosure: Azure ($33.17B, +48.2%) and M365 Cloud ($27.78B, +17.2%) drive 66% of total company sales'
 : '首次透明化披露单季美元规模：Azure ($33.17B, +48.2%) 与 M365 Cloud ($27.78B, +17.2%) 双擎合计贡献全公司 66% 营收';
 } else {
 titleEl.textContent = isEn()
 ? 'FY2021–FY2026 FTE Headcount Discipline (k) vs. Revenue per Employee ($M · 10-K)'
 : 'FY2021–FY2026 人员编制克制（千人）vs 人均创收跃迁（$M · Form 10-K）';
 subEl.textContent = isEn()
 ? 'FY26 FTEs declined by 5,000 (-2.2% YoY to 223k) while revenue per employee surged to an all-time high of $1.49M'
 : 'FY26 全职员工同比净减 5,000 人至 22.3 万人，人均年创收跃升至历史新高的 $1.49M';
 }
 }

 function applyLanguage(lang, silent) {
 state.lang = lang === 'en' ? 'en' : 'zh';
 var en = isEn();
 document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
 document.getElementById('langZhBtn').classList.toggle('active', !en);
 document.getElementById('langEnBtn').classList.toggle('active', en);
 document.getElementById('langZhBtn').setAttribute('aria-pressed', String(!en));
 document.getElementById('langEnBtn').setAttribute('aria-pressed', String(en));

 var nodes = document.querySelectorAll('[data-i18n-zh]');
 for (var i = 0; i < nodes.length; i++) {
 var val = nodes[i].getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
 if (val !== null) {
 if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
 else nodes[i].textContent = val;
 }
 }
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES)[state.activePillar] + '</div>';
 syncCh1HeaderText();
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
 if (!silent) showToast(en ? 'Switched to English' : '已切换为中文');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody');
 var badge = document.getElementById('peerCountBadge');
 var activeRows = isEn() ? PEER_ROWS_EN : PEER_ROWS;
 var q = state.peerQuery.trim().toLowerCase();
 var filtered = activeRows.filter(function (row, idx) {
 var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
 if (!catOk) return false;
 if (!q) return true;
 var zhR = PEER_ROWS[idx] || row;
 var enR = PEER_ROWS_EN[idx] || row;
 var hay = (zhR.company + ' ' + zhR.leader + ' ' + zhR.positioning + ' ' + zhR.culture + ' ' + zhR.verdict + ' ' + enR.company + ' ' + enR.leader + ' ' + enR.culture).toLowerCase();
 return hay.indexOf(q) !== -1;
 });
 badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 家标杆企业');
 if (!filtered.length) {
 tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配的标杆企业，请清空搜索词重试。</td></tr>';
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
 var dripRate = state.sim.drip ? 1.6 : 0.0;
 var totalRate = (cagr + dripRate) / 100;
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
 document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midYear + ' Midpoint Value') : ('第 ' + midYear + ' 年中期资产节点');
 document.getElementById('simMidVal').textContent = formatCurrency(midValue);

 var presetBtns = document.querySelectorAll('[data-preset]');
 for (var i = 0; i < presetBtns.length; i++) {
 presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
 }
 drawSimChart();
 }

 function renderChecklist() {
 var container = document.getElementById('checklistContainer');
 var chip = document.getElementById('checklistScoreChip');
 var bar = document.getElementById('checklistProgressBar');
 var itemsList = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
 var doneCount = state.checks.filter(Boolean).length;
 var pct = Math.round((doneCount / itemsList.length) * 100);
 chip.textContent = isEn() ? ('Verified ' + doneCount + ' / ' + itemsList.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + itemsList.length + ' 项 (' + pct + '%)');
 bar.style.width = pct + '%';
 container.innerHTML = itemsList.map(function (item, idx) {
 var isChecked = !!state.checks[idx];
 return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
 '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
 '<div style="flex:1;">' +
 '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
 '<span class="check-title">' + escapeHtml(item.title) + '</span>' +
 '<span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
 '</div>' +
 '<p class="check-desc">' + escapeHtml(item.desc) + '</p>' +
 '</div>' +
 '</label>';
 }).join('');
 }

 // High-DPI Canvas Engine
 function getPalette() {
 var isDark = state.theme === 'dark';
 return {
 isDark: isDark,
 grid: isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
 tick: isDark ? '#94A3B8' : '#475569',
 text: isDark ? '#F3F6F9' : '#0F1924',
 pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
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
 var w = Math.max(240, Math.floor(rect.width || 520));
 var h = Math.max(170, Math.floor(rect.height || 300));
 var dpr = Math.min(window.devicePixelRatio || 1, 2);
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
 var radius = Math.min(r, w / 2, h / 2);
 ctx.beginPath();
 ctx.moveTo(x + radius, y);
 ctx.lineTo(x + w - radius, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
 ctx.lineTo(x + w, y + h - radius);
 ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
 ctx.lineTo(x + radius, y + h);
 ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
 ctx.lineTo(x, y + radius);
 ctx.quadraticCurveTo(x, y, x + radius, y);
 ctx.closePath();
 }

 function topRoundedBar(ctx, x, y, w, h, r) {
 if (w <= 0 || h <= 0) return;
 var rad = Math.min(r, w / 2, h);
 ctx.beginPath();
 ctx.moveTo(x, y + h);
 ctx.lineTo(x, y + rad);
 ctx.quadraticCurveTo(x, y, x + rad, y);
 ctx.lineTo(x + w - rad, y);
 ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
 ctx.lineTo(x + w, y + h);
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

 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return;
 ctx.beginPath();
 ctx.moveTo(pts[0].x, pts[0].y);
 for (var i = 0; i < pts.length - 1; i++) {
 var xc = (pts[i].x + pts[i + 1].x) / 2;
 ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
 }
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartCh1 = [];
 var metaEl = document.getElementById('ch1AxisMeta');
 var leg1 = document.getElementById('ch1Leg1');
 var leg2 = document.getElementById('ch1Leg2');

 if (state.ch1View === 'viewA') {
 metaEl.innerHTML = isEn()
 ? '<span style="color:var(--chart-c1);">■ Blue: Q1 FY26 Revenue ($B)</span><span style="color:var(--chart-c2);">■ Green: Q1 FY27 Revenue ($B · Total $92.28B)</span>'
 : '<span style="color:var(--chart-c1);">■ 蓝色：Q1 FY2026 单季营收 ($B)</span><span style="color:var(--chart-c2);">■ 绿色：Q1 FY2027 单季营收 ($B · 总计 $92.28B)</span>';
 leg1.textContent = isEn() ? 'Q1 FY2026 Revenue ($B · Total $77.67B)' : 'Q1 FY2026 单季营收 ($B · 合计 $77.67B)';
 leg2.textContent = isEn() ? 'Q1 FY2027 Revenue ($B · Total $92.28B)' : 'Q1 FY2027 单季营收 ($B · 合计 $92.28B)';

 var padA = { top: 30, right: 18, bottom: 44, left: 48 };
 var pwA = w - padA.left - padA.right, phA = h - padA.top - padA.bottom;
 var labelsA = ['Azure', 'M365 Cloud', 'Server/Lic', 'Search Ads', 'XBOX', 'Industry'];
 var subA = ['+48.2% YoY', '+17.2% YoY', '-3.1% YoY', '+10.3% YoY', '-2.3% YoY', '+9.1% YoY'];
 var q126 = [22.38, 23.69, 8.68, 5.94, 5.51, 4.89];
 var q127 = [33.17, 27.78, 8.41, 6.55, 5.38, 5.34];
 var maxY = 38.0;

 for (var g = 0; g <= 4; g++) {
 var val = (maxY / 4) * g, gy = padA.top + phA - (g / 4) * phA;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
 ctx.beginPath(); ctx.moveTo(padA.left, gy); ctx.lineTo(padA.left + pwA, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText('$' + val.toFixed(0) + 'B', padA.left - 8, gy);
 }
 var stepA = pwA / labelsA.length;
 var barW = Math.min(34, Math.max(13, stepA * 0.28));

 for (var i = 0; i < labelsA.length; i++) {
 var cx = padA.left + stepA * (i + 0.5);
 if (hoverState.chartCh1 === i) {
 ctx.fillStyle = pal.hoverBand;
 roundRectPath(ctx, padA.left + stepA * i + 3, padA.top, stepA - 6, phA, 8);
 ctx.fill();
 }
 var y1 = padA.top + phA - (q126[i] / maxY) * phA;
 var y2 = padA.top + phA - (q127[i] / maxY) * phA;
 if (state.ch1Series.s1) {
 var h1 = (q126[i] / maxY) * phA;
 var x1 = state.ch1Series.s2 ? (cx - barW - 2) : (cx - barW / 2);
 ctx.fillStyle = pal.c1;
 topRoundedBar(ctx, x1, y1, barW, h1, 5);
 ctx.fill();
 }
 if (state.ch1Series.s2) {
 var h2 = (q127[i] / maxY) * phA;
 var x2 = state.ch1Series.s1 ? (cx + 2) : (cx - barW / 2);
 ctx.fillStyle = pal.c2;
 topRoundedBar(ctx, x2, y2, barW, h2, 5);
 ctx.fill();
 drawValueBadge(ctx, '$' + q127[i].toFixed(1) + 'B', cx, Math.min(y1, y2) - 12, pal.c2, pal);
 }
 ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
 ctx.fillText(labelsA[i], cx, padA.top + phA + 18);
 ctx.fillStyle = subA[i].indexOf('+') === 0 ? pal.c2 : pal.tick;
 ctx.font = '600 9.5px "IBM Plex Mono", sans-serif';
 ctx.fillText(subA[i], cx, padA.top + phA + 33);

 hitRegions.chartCh1.push({
 idx: i, x: padA.left + stepA * i, y: padA.top, w: stepA, h: phA + 36,
 html: '<strong>' + labelsA[i] + ' (SEC Q1 FY27)</strong><br/>• Q1 FY26: <strong>$' + q126[i].toFixed(2) + 'B</strong><br/>• Q1 FY27: <strong>$' + q127[i].toFixed(2) + 'B</strong> (' + subA[i] + ')'
 });
 }
 } else {
 metaEl.innerHTML = isEn()
 ? '<span style="color:var(--chart-c1);">■ Left Axis: Full-Time Employees (k)</span><span style="color:var(--chart-c2);">● Right Axis: Revenue / Employee ($M)</span>'
 : '<span style="color:var(--chart-c1);">■ 左轴：全职员工人数 (千人 · FY26 首次净减 5k)</span><span style="color:var(--chart-c2);">● 右轴：人均年创收 ($M/人)</span>';
 leg1.textContent = isEn() ? 'Full-Time Employees (Left · k)' : '全职员工总数 (左轴 · 千人)';
 leg2.textContent = isEn() ? 'Revenue per Employee (Right · $M)' : '人均年创收 (右轴 · $M)';

 var padB = { top: 28, right: 52, bottom: 38, left: 48 };
 var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
 var labelsB = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26'];
 var empK = [181.0, 221.0, 221.0, 228.0, 228.0, 223.0];
 var revM = [0.93, 0.90, 0.96, 1.08, 1.24, 1.49];
 var maxEmp = 340.0, minRev = 0.70, maxRev = 1.65;

 for (var j = 0; j <= 4; j++) {
 var r = j / 4, yGrid = padB.top + phB - r * phB;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yGrid); ctx.lineTo(padB.left + pwB, yGrid); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText((maxEmp * r).toFixed(0) + 'k', padB.left - 7, yGrid);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText('$' + (minRev + r * (maxRev - minRev)).toFixed(2) + 'M', padB.left + pwB + 7, yGrid);
 }
 var stepB = pwB / labelsB.length, bWidth = Math.min(38, Math.max(18, stepB * 0.42)), pts = [];
 for (var k = 0; k < labelsB.length; k++) {
 var centerX = padB.left + stepB * (k + 0.5);
 if (state.ch1Series.s1) {
 var bH = (empK[k] / maxEmp) * phB, bX = centerX - bWidth / 2, bY = padB.top + phB - bH;
 ctx.fillStyle = pal.c1;
 topRoundedBar(ctx, bX, bY, bWidth, bH, 5); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(empK[k].toFixed(0) + 'k', centerX, bY + 15);
 }
 var lY = padB.top + phB - ((revM[k] - minRev) / (maxRev - minRev)) * phB;
 pts.push({ x: centerX, y: lY, rev: revM[k] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(labelsB[k], centerX, padB.top + phB + 22);
 hitRegions.chartCh1.push({
 idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
 html: '<strong>' + labelsB[k] + ' (Form 10-K)</strong><br/>• 全职员工：<strong>' + Math.round(empK[k] * 1000).toLocaleString() + ' 人</strong><br/>• 人均年创收：<strong>$' + revM[k].toFixed(2) + 'M</strong>'
 });
 }
 if (state.ch1Series.s2) {
 drawSmoothLine(ctx, pts);
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke();
 for (var n = 0; n < pts.length; n++) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 4.5, 0, Math.PI * 2); ctx.fill();
 if (w >= 500 || n % 2 === 1) drawValueBadge(ctx, '$' + pts[n].rev.toFixed(2) + 'M', pts[n].x, pts[n].y - 16, pal.c2, pal);
 }
 }
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartRadar = [];
 var axes = isEn() ? ['Enterprise Trust', 'Open Alliance', 'Cross-Stack Reuse', 'Operating Margin', 'Hardware Craft'] : [
 '企业客户信任护城河', '开放生态结盟弹性', '跨产品线工程复用', '软件与云利润率杠杆', '消费级工业硬件审美'
 ];
 var series = [
 { key: 'msft', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.7, 9.5, 9.6, 6.8] },
 { key: 'aapl', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [8.6, 6.5, 9.8, 9.1, 9.9] },
 { key: 'legacy', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [7.8, 6.2, 5.8, 6.9, 4.5] }
 ];
 var cx = w / 2, cy = h / 2 + 8;
 var sidePad = w < 420 ? 88 : 112;
 var radius = Math.max(60, Math.min((w - sidePad * 2) / 2, h * 0.35));
 var total = axes.length;

 for (var ring = 2; ring <= 10; ring += 2) {
 var r = (ring / 10) * radius;
 ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath();
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
 ctx.fillStyle = pal.text; ctx.font = '600 11px system-ui, sans-serif'; ctx.textBaseline = 'middle';
 if (Math.abs(Math.cos(angle)) < 0.2) ctx.textAlign = 'center';
 else if (Math.cos(angle) > 0) ctx.textAlign = 'left';
 else ctx.textAlign = 'right';
 ctx.fillText(axes[a], lx, ly);
 hitRegions.chartRadar.push({
 idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 20, w: 72 + Math.abs(lx - ax), h: 40,
 html: '<strong>' + axes[a] + '</strong><br/>• Microsoft: <strong>' + series[0].vals[a] + '</strong><br/>• Apple: <strong>' + series[1].vals[a] + '</strong><br/>• 传统企业软件: <strong>' + series[2].vals[a] + '</strong>'
 });
 }
 for (var s = 0; s < series.length; s++) {
 var item = series[s];
 if (!state.radarSeries[item.key]) continue;
 ctx.beginPath();
 for (var idx = 0; idx < total; idx++) {
 var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
 var dist = (item.vals[idx] / 10) * radius;
 var vx = cx + Math.cos(theta) * dist, vy = cy + Math.sin(theta) * dist;
 if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
 }
 ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
 }
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartBars = [];
 var items = isEn() ? [
 { label: 'Microsoft Consolidated Gross Margin (FY26)', val: 67.9, cStart: '#34D399', cEnd: '#16A34A', sub: '$225,465M / $331,839M', note: 'Software & Cloud scale sustains ~68% gross margin despite AI buildout' },
 { label: 'Productivity & Business Processes Op Margin (FY26)', val: 59.9, cStart: '#3399FF', cEnd: '#0073E6', sub: '$83,879M / $139,996M', note: 'Core M365 & Copilot cash-cow engine generating 54% of company operating profit' },
 { label: 'Agents & Infra Realigned Segment Op Margin (Q1 FY27)', val: 52.8, cStart: '#60A5FA', cEnd: '#2563EB', sub: '$40,558M / $76,795M', note: '83.2% of total company revenue operating at >52% operating margin' },
 { label: 'Microsoft Consolidated Operating Margin (Q1 FY27)', val: 49.8, cStart: '#38BDF8', cEnd: '#0284C7', sub: '$45,915M / $92,279M', note: 'Up from 46.8% in FY26 via disciplined OpEx & FTE reduction' },
 { label: 'Operations, Cloud Fleet & Consulting Workforce Share', val: 39.9, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '89,000 / 223,000 FTEs', note: 'Global datacenter operations, enterprise deployment & support backbone' },
 { label: 'Product R&D Engineering Workforce Share (vs. 6.3% G&A)', val: 34.5, cStart: '#FBBF24', cEnd: '#D97706', sub: '77,000 Engineers (G&A only 14k)', note: '5.5x more product engineers than G&A administrative staff' }
 ] : [
 { label: 'Microsoft 全集团全年综合毛利率 (FY26)', val: 67.9, cStart: '#34D399', cEnd: '#16A34A', sub: '$225,465M / $331,839M', note: '软件高毛利底座对冲云基础设施折旧，守住 ~68% 顶级毛利率' },
 { label: 'PBP 生产力与业务流程分部营业利润率 (FY26)', val: 59.9, cStart: '#3399FF', cEnd: '#0073E6', sub: '$83,879M / $139,996M', note: 'M365 与 Copilot 超级现金牛，贡献全集团 54.0% 营业利润' },
 { label: 'Agents & Infra 新智能体与基建分部营业利润率 (Q1 FY27)', val: 52.8, cStart: '#60A5FA', cEnd: '#2563EB', sub: '$40,558M / $76,795M', note: '占全公司 83.2% 营收的主力航母仍保持超 52% 惊人营业利润率' },
 { label: 'Microsoft 全集团单季营业利润率 (Q1 FY27 新高)', val: 49.8, cStart: '#38BDF8', cEnd: '#0284C7', sub: '$45,915M / $92,279M', note: '较 FY26 全年 (46.8%) 再升 300bps，展现极强 AI 内部控费杠杆' },
 { label: '云机房运维、技术支持与咨询交付人员占比 (FY26)', val: 39.9, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '89,000 / 223,000 人', note: '支撑全球超大规模数据中心运转与政企复杂私有化落地' },
 { label: '产品研发工程师占比 (对比行政 G&A 仅占 6.3%)', val: 34.5, cStart: '#FBBF24', cEnd: '#D97706', sub: '77,000 名研发 (G&A 仅 14,000 人)', note: '研发工程师规模为综合行政岗位的 5.5 倍，组织精干度极高' }
 ];

 var pad = { top: 10, right: 18, bottom: 26, left: 18 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 80;
 for (var g = 0; g <= 4; g++) {
 var xVal = Math.round((maxX / 4) * g), gx = pad.left + (xVal / maxX) * pw;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(xVal + '%', gx, pad.top + ph + 18);
 }
 var rowH = ph / items.length;
 var targetX = pad.left + (45 / maxX) * pw;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5;
 ctx.beginPath(); ctx.moveTo(targetX, pad.top + 4); ctx.lineTo(targetX, pad.top + rowH * 4 - 4); ctx.stroke(); ctx.restore();

 for (var i = 0; i < items.length; i++) {
 var rowTop = pad.top + rowH * i;
 var labelY = rowTop + Math.max(15, rowH * 0.34);
 var barY = rowTop + Math.max(22, rowH * 0.50);
 var barH = Math.min(15, Math.max(11, rowH * 0.26));
 var bw = Math.max(8, (items[i].val / maxX) * pw);

 ctx.fillStyle = pal.text; ctx.font = '600 11.5px system-ui, sans-serif'; ctx.textAlign = 'left';
 ctx.fillText(items[i].label, pad.left, labelY);
 var valStr = items[i].val.toFixed(1) + '%';
 ctx.font = '800 12px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? items[i].cStart : items[i].cEnd; ctx.textAlign = 'right';
 ctx.fillText(valStr, pad.left + pw, labelY);
 if (w >= 580) {
 var valW = ctx.measureText(valStr).width + 10;
 ctx.font = '500 10.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.tick;
 ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
 }
 ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
 var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0);
 barGrad.addColorStop(0, items[i].cStart); barGrad.addColorStop(1, items[i].cEnd);
 ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();
 hitRegions.chartBars.push({
 idx: i, x: pad.left, y: rowTop, w: pw, h: rowH,
 html: '<strong>' + items[i].label + ': ' + items[i].val.toFixed(1) + '%</strong><br/>• ' + items[i].sub + '<br/>• ' + items[i].note
 });
 }
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartEps = [];
 var years = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
 var subYears = ['(云底座)', '(Copilot首发)', '(动视并表)', '(Azure破$75B)', '(Azure破$100B)'];
 var netB = [72.74, 72.36, 88.14, 101.83, 133.75];
 var opmPct = [42.1, 41.8, 44.6, 45.6, 46.8];

 var pad = { top: 26, right: 50, bottom: 44, left: 50 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
 var minNet = 40.0, maxNet = 155.0, minOm = 38.0, maxOm = 49.0;

 for (var g = 0; g <= 4; g++) {
 var ratio = g / 4, gy = pad.top + ph - ratio * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
 ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('$' + (minNet + ratio * (maxNet - minNet)).toFixed(0) + 'B', pad.left - 7, gy);
 ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minOm + ratio * (maxOm - minOm)).toFixed(1) + '%', pad.left + pw + 7, gy);
 }
 var step = pw / years.length, barW = Math.min(46, Math.max(24, step * 0.42)), linePts = [];
 for (var i = 0; i < years.length; i++) {
 var cx = pad.left + step * (i + 0.5);
 if (state.epsSeries.eps) {
 var bh = ((netB[i] - minNet) / (maxNet - minNet)) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
 ctx.fillStyle = pal.c1; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
 ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('$' + netB[i].toFixed(1) + 'B', cx, by + 17);
 }
 var oy = pad.top + ph - ((opmPct[i] - minOm) / (maxOm - minOm)) * ph;
 linePts.push({ x: cx, y: oy, om: opmPct[i] });
 ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center';
 ctx.fillText(years[i], cx, pad.top + ph + 19);
 ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif';
 ctx.fillText(subYears[i], cx, pad.top + ph + 33);
 hitRegions.chartEps.push({
 idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
 html: '<strong>' + years[i] + ' ' + subYears[i] + '</strong><br/>• GAAP 净利润: <strong>$' + netB[i].toFixed(2) + 'B</strong><br/>• 全年营业利润率: <strong>' + opmPct[i].toFixed(1) + '%</strong>'
 });
 }
 if (state.epsSeries.oci) {
 drawSmoothLine(ctx, linePts);
 ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke();
 for (var m = 0; m < linePts.length; m++) {
 ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 4.5, 0, Math.PI * 2); ctx.fill();
 drawValueBadge(ctx, linePts[m].om.toFixed(1) + '%', linePts[m].x, linePts[m].y - 16, pal.c2, pal);
 }
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim');
 if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
 hitRegions.chartSim = [];
 var p = state.sim.principal, yrs = state.sim.years;
 var priceRate = state.sim.priceCagr / 100;
 var totalRate = (state.sim.priceCagr + (state.sim.drip ? 1.6 : 0)) / 100;
 var totalSeries = [], priceOnlySeries = [];
 for (var y = 0; y <= yrs; y++) {
 totalSeries.push(p * Math.pow(1 + totalRate, y));
 priceOnlySeries.push(p * Math.pow(1 + priceRate, y));
 }
 var maxVal = Math.max(totalSeries[yrs], priceOnlySeries[yrs], p * 1.2) * 1.08;
 var pad = { top: 20, right: 20, bottom: 28, left: 60 };
 var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

 for (var g = 0; g <= 3; g++) {
 var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
 ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
 ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 7, gy);
 }
 var stepX = pw / yrs;
 ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
 for (var i = 0; i <= yrs; i++) {
 var px = pad.left + stepX * i, py = pad.top + ph - (priceOnlySeries[i] / maxVal) * ph;
 if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
 }
 ctx.stroke(); ctx.restore();

 ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
 for (var m = 0; m <= yrs; m++) {
 var tx = pad.left + stepX * m, ty = pad.top + ph - (totalSeries[m] / maxVal) * ph;
 if (m === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
 if (m === 0 || m === Math.floor(yrs / 2) || m === yrs) {
 ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
 ctx.fillText('Y' + m, tx, pad.top + ph + 18);
 }
 hitRegions.chartSim.push({
 idx: m, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 22,
 html: '<strong>第 ' + m + ' 年总资产对比</strong><br/>• 含分红复投与回购: <strong>' + formatCurrency(totalSeries[m]) + '</strong><br/>• 仅内生增值: <strong>' + formatCurrency(priceOnlySeries[m]) + '</strong>'
 });
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

 function wireCanvasTooltip(canvasId) {
 var canvas = document.getElementById(canvasId);
 var tip = document.getElementById('chartTooltip');
 if (!canvas || !tip) return;
 canvas.addEventListener('mousemove', function (e) {
 var rect = canvas.getBoundingClientRect();
 var x = e.clientX - rect.left, y = e.clientY - rect.top;
 var regions = hitRegions[canvasId] || [], matched = null;
 for (var i = 0; i < regions.length; i++) {
 var r = regions[i];
 if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { matched = r; break; }
 }
 if (matched) {
 tip.innerHTML = matched.html;
 tip.style.display = 'block';
 tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
 tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
 } else {
 tip.style.display = 'none';
 }
 });
 canvas.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
 }

 function init() {
 try {
 var savedTheme = (localStorage.getItem(STORAGE_THEME_KEY) || '').replace(/^"|"$/g, '');
 if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
 var savedLang = (localStorage.getItem(STORAGE_LANG_KEY) || '').replace(/^"|"$/g, '');
 if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;
 var savedChecks = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
 if (Array.isArray(savedChecks) && savedChecks.length === CHECKLIST_ITEMS.length) state.checks = savedChecks.map(Boolean);
 } catch (e) {}

 applyTheme(state.theme, true);
 applyLanguage(state.lang, true);

 document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
 document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
 document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
 
 
 
 
 

 var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
 document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
 if (window.innerWidth <= 1120) {
 var open = sb.classList.toggle('open');
 bd.classList.toggle('open', open);
 } else {
 var root = document.documentElement;
 var collapsed = root.getAttribute('data-sidebar-collapsed') !== '1';
 if (collapsed) root.setAttribute('data-sidebar-collapsed', '1');
 else root.removeAttribute('data-sidebar-collapsed');
 try { localStorage.setItem(STORAGE_SIDEBAR_KEY, collapsed ? '1' : '0'); } catch (err) {}
 setTimeout(renderAllCharts, 60);
 }
 });
 bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

 var hub = document.getElementById('companySubfolderHub');
 hub.addEventListener('click', function (e) {
 var pill = e.target.closest('[data-co-cat]');
 if (pill) {
 var cat = pill.getAttribute('data-co-cat');
 var ps = hub.querySelectorAll('[data-co-cat]');
 for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === pill);
 var its = hub.querySelectorAll('[data-co-item-cat]');
 for (var j = 0; j < its.length; j++) {
 its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
 }
 return;
 }
 var item = e.target.closest('.co-hub-item');
 if (item) {
 var jump = item.getAttribute('data-suite-jump');
 var msg = item.getAttribute('data-suite-msg');
 if (jump) {
 var el = document.querySelector(jump);
 if (el) el.scrollIntoView({ behavior: 'smooth' });
 } else if (msg) showToast(msg);
 }
 });

 // Quick Jump
 var QUICK_JUMP = [
 { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '$331.8B 营收 · $1.49M 人效 · Q1 FY27 营业利润率 49.8%' },
 { sec: 'sec-01', title: '01 单一公司架构与双核变阵', sub: 'Judson Althoff 商业 CEO · Agents & Infra 新分部拆解' },
 { sec: 'sec-02', title: '02 四大文化支柱与雷达图', sub: 'Learn-It-All · 多模型开放结盟 · SFI 安全问责' },
 { sec: 'sec-03', title: '03 全球科技巨头文化对比', sub: 'Microsoft vs Apple vs NVIDIA vs Amazon vs Google' },
 { sec: 'sec-04', title: '04 文化复利与跨代推演器', sub: '2014–2026 纳德拉期 vs 2001–2013 孤岛期财富模拟对比' },
 { sec: 'sec-05', title: '05 三代演进与四大战役复盘', sub: '盖茨 · 鲍尔默 · 纳德拉跨越半世纪管理得失' },
 { sec: 'sec-06', title: '06 微软文化法则核查清单', sub: '6 项平台转型与 AI 经营杠杆自检清单' },
 { sec: 'sec-07', title: '07 数据来源与监管索引', sub: 'SEC FY26 10-K · Q1 FY27 8-K · 2026 DEF 14A' }
 ];
 var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
 function renderJumpList(q) {
 var kw = (q || '').trim().toLowerCase();
 var list = QUICK_JUMP.filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
 jumpPop.innerHTML = list.map(function (it) {
 return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
 }).join('');
 jumpPop.classList.toggle('open', list.length > 0);
 }
 jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
 jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
 jumpPop.addEventListener('click', function (e) {
 var btn = e.target.closest('[data-jump-sec]');
 if (!btn) return;
 var secEl = document.getElementById(btn.getAttribute('data-jump-sec'));
 if (secEl) secEl.scrollIntoView({ behavior: 'smooth' });
 jumpPop.classList.remove('open');
 });
 document.addEventListener('click', function (e) {
 if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open');
 });
 document.addEventListener('keydown', function (e) {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
 if (e.key === 'Escape') { jumpPop.classList.remove('open'); sb.classList.remove('open'); bd.classList.remove('open'); }
 });

 document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.ch1View = this.getAttribute('data-ch1-view');
 document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
 document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
 syncCh1HeaderText();
 drawCh1Chart();
 });
 });

 document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var panel = document.getElementById(this.getAttribute('data-collapse-target'));
 if (!panel) return;
 var open = panel.classList.toggle('open');
 this.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
 });
 });

 var pillarCards = document.querySelectorAll('[data-pillar]');
 pillarCards.forEach(function (card) {
 card.addEventListener('click', function () {
 var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
 state.activePillar = idx;
 pillarCards.forEach(function (c, k) { c.classList.toggle('active', k === idx); });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES)[idx] + '</div>';
 drawRadarChart();
 });
 });

 document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
 pill.addEventListener('click', function () {
 var key = this.getAttribute('data-radar-key');
 state.radarSeries[key] = !state.radarSeries[key];
 if (!state.radarSeries.msft && !state.radarSeries.aapl && !state.radarSeries.legacy) state.radarSeries[key] = true;
 this.classList.toggle('muted', !state.radarSeries[key]);
 drawRadarChart();
 });
 });

 document.getElementById('peerSearchInput').addEventListener('input', function () {
 state.peerQuery = this.value;
 renderPeerTable();
 });
 var pfBtns = document.querySelectorAll('[data-peer-filter]');
 pfBtns.forEach(function (btn) {
 btn.addEventListener('click', function () {
 state.peerFilter = this.getAttribute('data-peer-filter');
 pfBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
 renderPeerTable();
 });
 });

 var pSlider = document.getElementById('simPrincipalSlider');
 var ySlider = document.getElementById('simYearsSlider');
 var cSlider = document.getElementById('simCagrSlider');
 var dToggle = document.getElementById('simDripToggle');
 pSlider.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
 ySlider.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 12; state.sim.preset = ''; updateSimulatorUI(); });
 cSlider.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
 dToggle.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });

 document.querySelectorAll('[data-preset]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var key = this.getAttribute('data-preset');
 var cfg = PRESETS[key];
 if (!cfg) return;
 state.sim = { principal: cfg.principal, years: cfg.years, priceCagr: cfg.priceCagr, drip: cfg.drip, preset: key };
 pSlider.value = String(cfg.principal);
 ySlider.value = String(cfg.years);
 cSlider.value = String(cfg.priceCagr);
 dToggle.checked = cfg.drip;
 updateSimulatorUI();
 });
 });

 document.getElementById('checklistContainer').addEventListener('change', function (e) {
 var input = e.target.closest('[data-check-input]');
 if (!input) return;
 state.checks[parseInt(input.getAttribute('data-check-input'), 10)] = !!input.checked;
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 });
 document.getElementById('checkAllBtn').addEventListener('click', function () {
 state.checks = [true, true, true, true, true, true];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 showToast('已勾选全部 6 项核查指标');
 });
 document.getElementById('resetCheckBtn').addEventListener('click', function () {
 state.checks = [true, true, true, false, false, false];
 try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
 renderChecklist();
 showToast('核查清单已恢复默认基准状态 (50%)');
 });

 document.querySelectorAll('[data-ch1-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var sk = this.getAttribute('data-ch1-series');
 state.ch1Series[sk] = !state.ch1Series[sk];
 if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true;
 this.classList.toggle('muted', !state.ch1Series[sk]);
 drawCh1Chart();
 });
 });
 document.querySelectorAll('[data-eps-series]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 var ek = this.getAttribute('data-eps-series');
 state.epsSeries[ek] = !state.epsSeries[ek];
 if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[ek] = true;
 this.classList.toggle('muted', !state.epsSeries[ek]);
 drawEpsComboChart();
 });
 });

 ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireCanvasTooltip);

 window.addEventListener('scroll', function () {
 var docEl = document.documentElement;
 var maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
 document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) + '%';
 }, { passive: true });

 var resizeTimer = null;
 window.addEventListener('resize', function () {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(renderAllCharts, 70);
 });
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();
 })();
 