
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_CHECK_KEY = 'mui_googl_culture_checks_v1';

      var CH0_PROSE = {
        zh: '如果说苹果代表<strong>“自上而下、工业设计铁腕集权与物理保密”</strong>的极致，那么<strong>谷歌母公司 Alphabet Inc.（NASDAQ: GOOGL）</strong>则开创了硅谷另一套影响深远的组织母本——<strong>以学术实验室式的自下而上探索（20% 自由时间）、公开透明的极限 OKRs、同侪委员会招聘晋升以及实证人才科学（Project Oxygen / Project Aristotle）驱动十亿级算法产品涌现</strong> <a class="cite-link" href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener noreferrer">Google re:Work ↗</a>。2015 年拉里·佩奇发表《G is for Google》重构 <strong>Alphabet 控股架构</strong>，将成熟搜索现金牛与高风险登月业务（Other Bets：Waymo、Isomorphic Labs 等）进行财务与激励隔离 <a class="cite-link" href="https://abc.xyz/investor/founders-letters/2015/" target="_blank" rel="noopener noreferrer">2015 创始人信 ↗</a>。更具启发意义的是 2023–2026 年的<strong>“战时组织重塑”</strong>：面对大公司共识迟缓与生成式 AI 挑战，CEO 桑达尔·皮查伊果断打破内部藩篱，将长期分立的 Google Brain 与 DeepMind 合并为单一引擎室 <strong>Google DeepMind</strong>，将 Android、Chrome 与 Pixel 硬件合并为统一的 <strong>Platforms &amp; Devices</strong>，并于 2026 年 8 月任命深度学习元老 Koray Kavukcuoglu 出任 SVP 加速模型产品化、让诺奖得主 Demis Hassabis 专注前沿科学与药物研发 <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/" target="_blank" rel="noopener noreferrer">GDM 架构升级 ↗</a>。财报验证了这场组织变革的爆发力：FY2025 营收首破 <strong>$4,028.36亿</strong>、净利润达 <strong>$1,321.70亿（中位员工年薪高达 $310,826）</strong>；2026 年 Q3 单季营收更提速至 <strong>$1,275.77亿（+25% YoY，年化破 $5,100亿）</strong>，204,757 名员工实现年化人均创收 <strong>$2.49M</strong>，并于 2026 年 6 月正式入选道琼斯工业平均指数 <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/googexhibit991q42025.htm" target="_blank" rel="noopener noreferrer">SEC FY25 8-K ↗</a> <a class="cite-link" href="https://www.nextgcomm.com/financials-google-q3-earnings-results-2026-analysis/" target="_blank" rel="noopener noreferrer">Q3\'26 10-Q ↗</a>。',
        en: 'Whereas Apple perfected top-down industrial design centralization and secrecy, <strong>Alphabet Inc. (NASDAQ: GOOGL)</strong> pioneered Silicon Valley\'s counter-archetype: <strong>bottom-up scientific exploration (20% time), company-wide transparent stretch OKRs, independent peer hiring/promotion committees, and empirical People Analytics (Projects Oxygen &amp; Aristotle)</strong> <a class="cite-link" href="https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers" target="_blank" rel="noopener noreferrer">Google re:Work ↗</a>. Larry Page\'s 2015 <em>"G is for Google"</em> reorganization ring-fenced moonshots (Waymo, Isomorphic Labs) under the <strong>Alphabet holding umbrella</strong> <a class="cite-link" href="https://abc.xyz/investor/founders-letters/2015/" target="_blank" rel="noopener noreferrer">2015 Founders\' Letter ↗</a>. Even more instructive is CEO Sundar Pichai\'s 2023–2026 <strong>wartime structural unification</strong>: merging Google Brain and DeepMind into <strong>Google DeepMind</strong>, combining Android, Chrome, and Pixel into <strong>Platforms &amp; Devices</strong>, and elevating Koray Kavukcuoglu to SVP GDM in August 2026 while freeing Nobel Laureate Demis Hassabis to spearhead frontier science <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/" target="_blank" rel="noopener noreferrer">GDM Update ↗</a>. The payoff is unmistakable: FY2025 sales topped <strong>$402.84B</strong> with <strong>$132.17B</strong> in GAAP net income ($310,826 median pay), while Q3 2026 accelerated +25% YoY to <strong>$127.58B (&gt;$510B run rate; $2.49M annualized rev/FTE across 204,757 employees)</strong> alongside Dow Jones Industrial Average inclusion <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/googexhibit991q42025.htm" target="_blank" rel="noopener noreferrer">SEC FY25 8-K ↗</a> <a class="cite-link" href="https://www.nextgcomm.com/financials-google-q3-earnings-results-2026-analysis/" target="_blank" rel="noopener noreferrer">Q3\'26 10-Q ↗</a>.'
      };

      var PILLAR_NOTES = [
        '<strong>当前选中支柱解读（01 OKRs 极限目标体系）：</strong>OKRs 与年度薪酬绩效考核刻意脱钩，防止员工为拿奖金而压低目标（Sandbagging）——正是这种机制支撑了 Chrome 从零逆袭、Gemini App 创史上最快速度突破 10 亿月活 <a class="cite-link" href="https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness" target="_blank" rel="noopener noreferrer">re:Work 团队科学 ↗</a>。',
        '<strong>当前选中支柱解读（02 Project Oxygen &amp; Aristotle）：</strong>谷歌对 180 个团队做多变量统计分析发现，“团队成员如何互动”远比“团队里有谁”更重要；<strong>心理安全感（敢于提出异议与承认失误而不遭羞辱）</strong>位列高效团队五大要素之首 <a class="cite-link" href="https://store.hbr.org/product/google-s-project-oxygen-do-managers-matter/313110" target="_blank" rel="noopener noreferrer">HBR Oxygen 案例 ↗</a>。',
        '<strong>当前选中支柱解读（03 10x 登月思维与宽容失败）：</strong>在 Alphabet 体系内，大胆尝试科学难题即使商业中止也能获得高度尊重（甚至在 X 实验室发奖金鼓励及早证伪不可行方案），由此沉淀出 TPU 光互连、Waymo 与 AlphaFold 等跨十年壁垒。',
        '<strong>当前选中支柱解读（04 委员会治企与战时提速）：</strong>同侪招聘与晋升委员会守住了全球最高 AI 人才纯度（中位年薪 $31.1万），而 2023–2026 砍掉冗余审批层级与内部部署 Gemini 4 编码助手则补齐了大公司执行速度短板。'
      ];

      var PILLAR_NOTES_EN = [
        '<strong>Selected Pillar (01 · Stretch OKRs):</strong> Decoupling OKRs from annual bonus formulas prevents sandbagging and empowers 0.6–0.7 stretch ambition—fueling Chrome\'s ascent and Gemini App\'s sprint past 1B MAUs <a class="cite-link" href="https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness" target="_blank" rel="noopener noreferrer">re:Work Study ↗</a>.',
        '<strong>Selected Pillar (02 · Projects Oxygen &amp; Aristotle):</strong> Analyzing 180+ Google teams proved that <em>how a team interacts</em> matters more than individual stardom, with <strong>Psychological Safety</strong> ranking #1 <a class="cite-link" href="https://store.hbr.org/product/google-s-project-oxygen-do-managers-matter/313110" target="_blank" rel="noopener noreferrer">HBR Case ↗</a>.',
        '<strong>Selected Pillar (03 · 10x Moonshot Mindset):</strong> Pursuing 10x breakthroughs rather than 10% incremental tweaks birthed custom TPUs, AlphaFold 3, and Waymo\'s 300M+ autonomous miles.',
        '<strong>Selected Pillar (04 · Peer Committees + Wartime Speed):</strong> Independent hiring/promotion committees protect A+ talent density ($310.8K median pay), while 2023–2026 delayering and internal Gemini coding (+35% output) restored startup velocity.'
      ];

      var PEER_ROWS = [
        {
          category: 'eng', benchmark: true,
          company: '研究基准：谷歌 Alphabet (GOOGL)',
          leader: '佩奇 & 布林 / 桑达尔·皮查伊 (Sundar Pichai)',
          positioning: 'Alphabet 控股风险隔离伞 + Google 内部全栈 AI 统一引擎室',
          culture: '公开极限 OKRs + 心理安全感科学 + 10x 登月思维 + 同侪委员会',
          headcount: '20.48万人 (Q3\'26) · 年化人效 $2.49M · 中位薪 $311K',
          margins: 'Q3\'26 营收 $1,276亿 (+25%) · 毛利率 59.7% · Cloud OPM 36.2%',
          verdict: '基础科研与大规模分布式工程天花板：合流 Google DeepMind 后补齐发版速度，成为唯一四层全栈自研 AI 巨头。',
          sourceLabel: 'SEC Q3\'26 / re:Work',
          sourceUrl: 'https://rework.withgoogle.com/intl/en/guides/following-the-data-the-research-behind-great-managers'
        },
        {
          category: 'eng', benchmark: false,
          company: '苹果公司 (Apple · AAPL)',
          leader: '乔布斯 / 库克 / 约翰·特努斯 (John Ternus)',
          positioning: '按专业能力划分的纯粹职能制 + 全公司唯一损益表 (Single P&L)',
          culture: '专家领导专家 + DRI 单点问责 + 物理保密 + 极致 SKU 减法',
          headcount: '16.7万人 · 人均创收 $2.87M (含直营店)',
          margins: 'FY26 营收 $4,788亿 · 综合毛利 48.8% (服务 76.2%) · 净利 $1,322亿',
          verdict: '工业精品与概率算法的两极：苹果靠“封闭保密+对99件事说不”打磨硬件神作；谷歌靠“开放生态+开源/论文影响力”统治全球信息与云底座。',
          sourceLabel: 'HBR Apple Study',
          sourceUrl: 'https://www.apple.com/careers/pdf/HBR_How_Apple_Is_Organized_For_Innovation-4.pdf'
        },
        {
          category: 'eng', benchmark: false,
          company: 'Meta Platforms (META)',
          leader: '马克·扎克伯格 (Mark Zuckerberg)',
          positioning: '创始人超级集权 + 极扁平算法推荐与开源 Llama 突击队',
          culture: 'Move Fast (黑客马拉松) + 效率之年铁腕扁平化 + 激进开源',
          headcount: '~7.4万人 · 人均创收 ~$2.42M+',
          margins: '综合毛利率 ~81% · 社交广告高利润率补贴 Reality Labs',
          verdict: '同为广告双雄，扎克伯格自上而下转向极快；但谷歌拥有 Meta 缺失的自有操作系统（Android/Chrome）与年入超千亿的 Google Cloud 回血池。',
          sourceLabel: 'SQ Ads Benchmark',
          sourceUrl: 'https://sqmagazine.co.uk/google-ads-statistics/'
        },
        {
          category: 'biz', benchmark: false,
          company: '微软 (Microsoft · MSFT)',
          leader: '萨提亚·纳德拉 (Satya Nadella)',
          positioning: '三大企业级事业部矩阵 (智能云 / 生产力 / 个人计算)',
          culture: '成长型思维 (Growth Mindset) + B2B 客户成功导向 + 外部模型结盟',
          headcount: '~22.3万人 · 人均创收 ~$1.49M',
          margins: '综合毛利率 ~69% · 企业席位订阅现金流极稳',
          verdict: '微软长于企业 CIO 关系与软件捆绑销售；谷歌则在自研 TPU 芯片性价比与一方原生多模态模型（Gemini 4）自主权上更具全栈优势。',
          sourceLabel: 'Big Tech 10-K Data',
          sourceUrl: 'https://bebop.ai/companies/largest-tech-companies'
        },
        {
          category: 'biz', benchmark: false,
          company: '亚马逊 (Amazon · AMZN)',
          leader: '贝索斯 / 安迪·贾西 (Andy Jassy)',
          positioning: '契约化 API 解耦 + 数千支自负盈亏“双披萨小队”',
          culture: '客户痴迷 + 六页纸叙事备忘录 + 节俭主义 (Frugality)',
          headcount: '~155万人 (含全球重物流仓配)',
          margins: 'AWS 云与零售广告贡献绝大部分营业利润',
          verdict: '亚马逊极度节俭务实、擅长标准化运营扩张；谷歌则以高薪酬福利与学术自由吸引科学奇才攻克量子计算、无人驾驶与蛋白质折叠。',
          sourceLabel: 'Amazon AR',
          sourceUrl: 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm'
        }
      ];

      var CHECKLIST_ITEMS = [
        {
          tag: '统一AI引擎',
          title: '1. 核心底座去孤岛测试：基础大模型与算力调度是否已彻底消除内部重复造轮子？',
          desc: '核查研究与工程团队是否像合并后的 Google DeepMind 一样共享统一算力池与单一产品接入点，而非各自为战。'
        },
        {
          tag: '0.6–0.7 OKRs',
          title: '2. 极限 OKRs 纯度测试：目标是否全员公开透明，且不因未达满分而遭薪酬惩罚？',
          desc: '检验团队是否敢于设定 10x 挑战性目标，避免将 OKR 异化为保守防御的传统 KPI 绩效打分表。'
        },
        {
          tag: '心理安全感',
          title: '3. Project Aristotle 心理安全测试：一线工程师能否在复盘会上直言架构缺陷？',
          desc: '核查事故复盘是否严格执行“无指责复盘（Blameless Postmortem）”，对事不对人地修复系统性漏洞。'
        },
        {
          tag: '委员会防稀释',
          title: '4. 人才密度防火墙测试：招聘与晋升是否由跨团队客观标准把关而非直属主管一言堂？',
          desc: '验证在业务扩张期是否依然守住高认知能力（GCA）与工程素养底线，同时避免“为晋升而造新轮子”。'
        },
        {
          tag: 'AI内部自举',
          title: '5. AI 原生工作流测试：自身研发与行政费率是否正因内部 AI Agent 部署出现显著杠杆？',
          desc: '对标谷歌内部代码量 +35% 且 G&A 费率压降至 4.8%，观察人均创收是否跑赢人员增速。'
        },
        {
          tag: '控股伞纪律',
          title: '6. 新业务组合退出纪律测试：对长期偏离护城河的副业能否果断剥离（如 GFiber）？',
          desc: '既要给 Waymo 类高壁垒项目十年耐心与外部融资检验，也要对缺乏超额回报的重资产果断瘦身出表。'
        }
      ];

      var QUICK_JUMP_INDEX = [
        { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: 'Q3 $127.6B (+25%) · 年化人效 $2.49M · 综合毛利 59.7%' },
        { sec: 'sec-01', title: '01 Alphabet 控股与 AI 全栈重构', sub: 'Google DeepMind 合流 · 分部营收与人效双视图图表' },
        { sec: 'sec-02', title: '02 四大文化支柱与创新护城河', sub: '极限 OKRs · 氧气与亚里士多德计划 · 五维雷达图' },
        { sec: 'sec-03', title: '03 全球科技巨头文化横向对比', sub: 'Alphabet vs Apple vs Meta vs Microsoft vs Amazon' },
        { sec: 'sec-04', title: '04 研发红利、利润率与复利推演', sub: 'FY21–FY25 净利跃升至 $132.2B · 跨代复利模拟器' },
        { sec: 'sec-05', title: '05 三代演进与四大战役复盘', sub: '车库创业 → Alphabet重组 → 2023–2026 AI战时集结' },
        { sec: 'sec-06', title: '06 谷歌文化法则核查清单', sub: '6 项平台型科技组织诊断与本地持久化评分' },
        { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC 10-K/10-Q · Google re:Work · HBR 权威信源' }
      ];

      var PRESETS = {
        p1: { principal: 10000, years: 11, priceCagr: 22.4, drip: true },
        p2: { principal: 10000, years: 11, priceCagr: 26.8, drip: false },
        p3: { principal: 10000, years: 10, priceCagr: 13.5, drip: true }
      };

      var state = {
        lang: 'zh',
        theme: 'dark',
        ch1View: 'viewA',
        activePillar: 0,
        radarSeries: { googl: true, aapl: true, msft: true },
        ch1Series: { s1: true, s2: true },
        epsSeries: { eps: true, oci: true },
        peerFilter: 'all',
        peerQuery: '',
        sim: { principal: 10000, years: 11, priceCagr: 22.4, drip: true, preset: 'p1' },
        checks: [true, true, true, false, false, false]
      };

      var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };

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
          c1: isDark ? '#3399FF' : '#0073E6',
          c2: isDark ? '#22C55E' : '#16A34A',
          c3: isDark ? '#FFB74D' : '#D97706',
          c4: isDark ? '#A78BFA' : '#7C3AED'
        };
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
        var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
        if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
        if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
        try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
        renderAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式');
      }

      function applyLanguage(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
        var en = state.lang === 'en';
        document.documentElement.lang = en ? 'en' : 'zh-CN';
        var zhBtn = document.getElementById('langZhBtn'), enBtn = document.getElementById('langEnBtn');
        if (zhBtn && enBtn) {
          zhBtn.classList.toggle('active', !en);
          enBtn.classList.toggle('active', en);
          zhBtn.setAttribute('aria-pressed', String(!en));
          enBtn.setAttribute('aria-pressed', String(en));
        }
        var lead = document.getElementById('ch0LeadProse');
        if (lead) lead.innerHTML = CH0_PROSE[state.lang];
        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var val = nodes[i].getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
          if (val !== null) {
            if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
            else nodes[i].textContent = val;
          }
        }
        document.getElementById('pillarFocusNote').innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES)[state.activePillar] + '</div>';
        renderPeerTable();
        renderChecklist();
        updateSimulatorUI();
        renderAllCharts();
        try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
        if (!silent) showToast(en ? 'Switched to English' : '已切换至中文');
      }

      function renderPeerTable() {
        var tbody = document.getElementById('peerTableBody');
        var badge = document.getElementById('peerCountBadge');
        if (!tbody) return;
        var q = state.peerQuery.trim().toLowerCase();
        var filtered = PEER_ROWS.filter(function (row) {
          var catOk = state.peerFilter === 'all' || row.category === state.peerFilter;
          if (!catOk) return false;
          if (!q) return true;
          var hay = (row.company + ' ' + row.leader + ' ' + row.positioning + ' ' + row.culture + ' ' + row.verdict + ' ' + row.margins).toLowerCase();
          return hay.indexOf(q) !== -1;
        });
        if (badge) badge.textContent = '显示 ' + filtered.length + ' / ' + PEER_ROWS.length + ' 家标杆企业';
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

      function renderChecklist() {
        var container = document.getElementById('checklistContainer');
        var chip = document.getElementById('checklistScoreChip');
        var bar = document.getElementById('checklistProgressBar');
        if (!container) return;
        var doneCount = state.checks.filter(Boolean).length;
        var pct = Math.round((doneCount / CHECKLIST_ITEMS.length) * 100);
        if (chip) chip.textContent = '已核查 ' + doneCount + ' / ' + CHECKLIST_ITEMS.length + ' 项 (' + pct + '%)';
        if (bar) bar.style.width = pct + '%';
        container.innerHTML = CHECKLIST_ITEMS.map(function (item, idx) {
          var isChecked = !!state.checks[idx];
          return '<label class="check-card ' + (isChecked ? 'checked' : '') + '">' +
            '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
            '<div style="flex:1;">' +
            '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
            '<span class="check-title">' + escapeHtml(item.title) + '</span>' +
            '<span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
            '</div>' +
            '<p class="check-desc">' + escapeHtml(item.desc) + '</p>' +
            '</div></label>';
        }).join('');
      }

      function formatCurrency(val) {
        if (val >= 10000000) return '$' + (val / 1000000).toFixed(2) + 'M';
        return '$' + Math.round(val).toLocaleString('en-US');
      }

      // Canvas Helpers
      function prepareCanvas(id) {
        var canvas = document.getElementById(id);
        if (!canvas || !canvas.parentElement) return null;
        var rect = canvas.parentElement.getBoundingClientRect();
        var w = Math.max(240, Math.floor(rect.width || 500));
        var h = Math.max(170, Math.floor(rect.height || 280));
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
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

      function drawCh1Chart() {
        var env = prepareCanvas('chartCh1');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartCh1 = [];
        var pad = { top: 28, right: 48, bottom: 42, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.ch1View === 'viewA') {
          var labels = ['Search & other', 'Google Cloud', '订阅/平台/硬件', 'YouTube Ads', 'Google Network'];
          var fy24 = [198.08, 43.23, 40.34, 36.15, 30.36];
          var ttm26 = [243.29, 93.17, 53.16, 43.55, 29.56];
          var maxY = 270;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
            ctx.fillText('$' + Math.round(gv) + 'B', pad.left - 7, gy + 4);
          }
          var step = pw / labels.length, bw = Math.min(34, step * 0.28);
          labels.forEach(function (lb, i) {
            var cx = pad.left + step * (i + 0.5);
            if (state.ch1Series.s1) {
              var h1 = (fy24[i] / maxY) * ph;
              ctx.fillStyle = pal.c1;
              roundRect(ctx, cx - bw - 3, pad.top + ph - h1, bw, h1, 5); ctx.fill();
            }
            if (state.ch1Series.s2) {
              var h2 = (ttm26[i] / maxY) * ph;
              ctx.fillStyle = pal.c2;
              roundRect(ctx, cx + 3, pad.top + ph - h2, bw, h2, 5); ctx.fill();
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
              ctx.fillText('$' + ttm26[i].toFixed(1) + 'B', cx + bw / 2 + 3, pad.top + ph - h2 - 6);
            }
            ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(lb, cx, pad.top + ph + 20);
            hitRegions.chartCh1.push({
              x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
              html: '<strong>' + lb + '</strong><br/>• FY2024 营收：$' + fy24[i].toFixed(2) + 'B<br/>• TTM Q3\'26 营收：<strong>$' + ttm26[i].toFixed(2) + 'B</strong>'
            });
          });
        } else {
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'Q3\'26年化'];
          var fteK = [156.5, 190.2, 182.5, 183.3, 190.8, 204.8];
          var revEmp = [1.65, 1.49, 1.68, 1.91, 2.11, 2.49];
          var maxF = 240, minR = 1.2, maxR = 2.7;
          for (var j = 0; j <= 4; j++) {
            var r = j / 4, yG = pad.top + ph - r * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, yG); ctx.lineTo(pad.left + pw, yG); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
            ctx.fillText(Math.round(maxF * r) + 'k', pad.left - 7, yG + 4);
            ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
            ctx.fillText('$' + (minR + r * (maxR - minR)).toFixed(2) + 'M', pad.left + pw + 6, yG + 4);
          }
          var stepB = pw / yrs.length, bW = Math.min(34, stepB * 0.44);
          var pts = [];
          yrs.forEach(function (yr, k) {
            var cx = pad.left + stepB * (k + 0.5);
            if (state.ch1Series.s1) {
              var bH = (fteK[k] / maxF) * ph;
              ctx.fillStyle = 'rgba(0, 115, 230, 0.35)';
              roundRect(ctx, cx - bW / 2, pad.top + ph - bH, bW, bH, 5); ctx.fill();
            }
            var py = pad.top + ph - ((revEmp[k] - minR) / (maxR - minR)) * ph;
            pts.push({ x: cx, y: py, v: revEmp[k] });
            ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(yr, cx, pad.top + ph + 20);
            hitRegions.chartCh1.push({
              x: pad.left + stepB * k, y: pad.top, w: stepB, h: ph + 26,
              html: '<strong>' + yr + '</strong><br/>• 全职员工数：' + fteK[k].toFixed(1) + 'k 人<br/>• 人均创收：<strong>$' + revEmp[k].toFixed(2) + 'M / 人</strong>'
            });
          });
          if (state.ch1Series.s2) {
            ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.6; ctx.beginPath();
            pts.forEach(function (pt, idx) { if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
            ctx.stroke();
            pts.forEach(function (pt) {
              ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.2, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
              ctx.fillText('$' + pt.v.toFixed(2) + 'M', pt.x, pt.y - 8);
            });
          }
        }
      }

      function drawRadarChart() {
        var env = prepareCanvas('chartRadar');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartRadar = [];
        var axes = ['基础科研与AI原力', '目标透明度(OKRs)', '心理安全与自由度', '工业减法与保密', '多生态平台扩展力'];
        var series = [
          { key: 'googl', name: '谷歌 (Alphabet)', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.9, 9.6, 9.4, 6.8, 9.7] },
          { key: 'aapl', name: '苹果 (Apple)', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [8.6, 7.2, 7.5, 9.9, 8.8] },
          { key: 'msft', name: '微软 (Microsoft)', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [8.8, 8.2, 8.5, 7.4, 9.5] }
        ];
        var cx = w / 2, cy = h / 2 + 6;
        var radius = Math.max(62, Math.min((w - 190) / 2, h * 0.35));
        for (var ring = 2; ring <= 10; ring += 2) {
          var r = (ring / 10) * radius;
          ctx.strokeStyle = pal.grid; ctx.beginPath();
          for (var i = 0; i < 5; i++) {
            var ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
            var px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke();
        }
        axes.forEach(function (axName, a) {
          var angle = -Math.PI / 2 + (a * 2 * Math.PI) / 5;
          var ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
          var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
          ctx.fillStyle = pal.text; ctx.font = '600 11px sans-serif';
          ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
          ctx.fillText(axName, lx, ly);
          hitRegions.chartRadar.push({
            x: lx - 40, y: ly - 16, w: 80, h: 32,
            html: '<strong>' + axName + '</strong><br/>• 谷歌：' + series[0].vals[a] + ' | 苹果：' + series[1].vals[a] + ' | 微软：' + series[2].vals[a]
          });
        });
        series.forEach(function (s) {
          if (!state.radarSeries[s.key]) return;
          ctx.beginPath();
          s.vals.forEach(function (v, idx) {
            var th = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
            var vx = cx + Math.cos(th) * (v / 10) * radius, vy = cy + Math.sin(th) * (v / 10) * radius;
            if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
          });
          ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.3; ctx.stroke();
        });
      }

      function drawHorizontalBars() {
        var env = prepareCanvas('chartBars');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartBars = [];
        var items = [
          { label: 'Alphabet 集团综合毛利率 Gross Margin (Q3\'26)', val: 59.7, col: pal.c2, sub: '$76.16B / $127.58B', note: '剔除 TAC 与数据中心折旧后仍保持近 60% 软件级高毛利' },
          { label: 'Google Services 分部营业利润率 (Q3\'26)', val: 40.7, col: pal.c1, sub: '$39.2B / $96.3B (+220bps)', note: '搜索与 YouTube 意图拍卖的恐怖印钞效率' },
          { label: 'Google Cloud 分部营业利润率 (Q3\'26)', val: 36.2, col: pal.c2, sub: '$11.1B / $30.71B (+1,250bps)', note: '自研 TPU 与高毛利 AI 企业席位带动利润率跨越式跃升' },
          { label: 'Alphabet 合并营业利润率 Operating Margin (Q3\'26)', val: 31.8, col: pal.c1, sub: '$40.58B / $127.58B', note: '已全额消化单季 $7.7B 集团层共享 AI 研发费用后的净营业利润率' },
          { label: '硬核研发投入强度 R&D / Revenue (Q3\'26)', val: 16.2, col: pal.c4, sub: '单季 $20.64B (+36% YoY)', note: '顶尖 AI 科学家与 TPU 架构研发强度远超传统科技巨头' },
          { label: '精简一般及行政管理费率 G&A / Revenue (Q3\'26)', val: 4.8, col: pal.c3, sub: '单季 $6.14B (-17% YoY)', note: '砍掉冗余管理层级，确保资源集中流向一线工程与算力' }
        ];
        var pad = { top: 10, right: 18, bottom: 24, left: 18 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 68;
        var rowH = ph / items.length;
        var refX = pad.left + (35 / maxX) * pw;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3;
        ctx.beginPath(); ctx.moveTo(refX, pad.top); ctx.lineTo(refX, pad.top + rowH * 4); ctx.stroke(); ctx.restore();
        items.forEach(function (it, i) {
          var rt = pad.top + rowH * i;
          var ly = rt + rowH * 0.36, by = rt + rowH * 0.52, bh = 13;
          var bw = (it.val / maxX) * pw;
          ctx.fillStyle = pal.text; ctx.font = '600 11.5px sans-serif'; ctx.textAlign = 'left';
          ctx.fillText(it.label, pad.left, ly);
          ctx.fillStyle = it.col; ctx.font = 'bold 12px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(it.val.toFixed(1) + '%', pad.left + pw, ly);
          ctx.fillStyle = pal.trackBg; roundRect(ctx, pad.left, by, pw, bh, 6); ctx.fill();
          ctx.fillStyle = it.col; roundRect(ctx, pad.left, by, bw, bh, 6); ctx.fill();
          hitRegions.chartBars.push({
            x: pad.left, y: rt, w: pw, h: rowH,
            html: '<strong>' + it.label + '：' + it.val + '%</strong><br/>• 明细：' + it.sub + '<br/>• 解读：' + it.note
          });
        });
      }

      function drawEpsComboChart() {
        var env = prepareCanvas('chartEps');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartEps = [];
        var years = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];
        var netB = [76.03, 59.97, 73.80, 100.12, 132.17];
        var gmPct = [56.9, 55.4, 56.6, 58.2, 59.7];
        var pad = { top: 26, right: 50, bottom: 38, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var maxNet = 150, minGm = 53, maxGm = 61;
        for (var g = 0; g <= 4; g++) {
          var r = g / 4, gy = pad.top + ph - r * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round(maxNet * r) + 'B', pad.left - 7, gy + 4);
          ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
          ctx.fillText((minGm + r * (maxGm - minGm)).toFixed(1) + '%', pad.left + pw + 6, gy + 4);
        }
        var step = pw / years.length, bw = Math.min(44, step * 0.42), pts = [];
        years.forEach(function (yr, i) {
          var cx = pad.left + step * (i + 0.5);
          if (state.epsSeries.eps) {
            var bh = (netB[i] / maxNet) * ph, by = pad.top + ph - bh;
            ctx.fillStyle = pal.c1; roundRect(ctx, cx - bw / 2, by, bw, bh, 6); ctx.fill();
            ctx.fillStyle = '#FFFFFF'; ctx.font = 'bold 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('$' + netB[i].toFixed(1) + 'B', cx, by + 16);
          }
          var oy = pad.top + ph - ((gmPct[i] - minGm) / (maxGm - minGm)) * ph;
          pts.push({ x: cx, y: oy, gm: gmPct[i] });
          ctx.fillStyle = pal.text; ctx.font = 'bold 11.5px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(yr, cx, pad.top + ph + 20);
          hitRegions.chartEps.push({
            x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
            html: '<strong>' + yr + ' (Form 10-K)</strong><br/>• GAAP 净利润：<strong>$' + netB[i].toFixed(2) + 'B</strong><br/>• 综合毛利率：<strong>' + gmPct[i].toFixed(1) + '%</strong>'
          });
        });
        if (state.epsSeries.oci) {
          ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
          pts.forEach(function (p, idx) { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
          ctx.stroke();
          pts.forEach(function (p) {
            ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(p.gm.toFixed(1) + '%', p.x, p.y - 9);
          });
        }
      }

      function drawSimChart() {
        var env = prepareCanvas('chartSim');
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
        var maxV = Math.max(totS[yrs], p * 1.2) * 1.08;
        var pad = { top: 18, right: 18, bottom: 26, left: 58 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        for (var g = 0; g <= 3; g++) {
          var v = (maxV / 3) * g, gy = pad.top + ph - (g / 3) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(v >= 1000000 ? ('$' + (v / 1000000).toFixed(1) + 'M') : ('$' + Math.round(v / 1000) + 'k'), pad.left - 6, gy + 4);
        }
        var stepX = pw / yrs;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.beginPath();
        baseS.forEach(function (bv, idx) {
          var px = pad.left + stepX * idx, py = pad.top + ph - (bv / maxV) * ph;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke(); ctx.restore();
        ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
        totS.forEach(function (tv, idx) {
          var px = pad.left + stepX * idx, py = pad.top + ph - (tv / maxV) * ph;
          if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          if (idx === 0 || idx === Math.floor(yrs / 2) || idx === yrs) {
            ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('Y' + idx, px, pad.top + ph + 18);
          }
          hitRegions.chartSim.push({
            x: px - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 20,
            html: '<strong>持有第 ' + idx + ' 年</strong><br/>• 含增益总资产：<strong>' + formatCurrency(tv) + '</strong><br/>• 基础内生价值：' + formatCurrency(baseS[idx])
          });
        });
        ctx.stroke();
      }

      function updateSimulatorUI() {
        var p = state.sim.principal, yrs = state.sim.years, cagr = state.sim.priceCagr;
        var totalRate = (cagr + (state.sim.drip ? 2.0 : 0)) / 100;
        var endingValue = p * Math.pow(1 + totalRate, yrs);
        var moic = endingValue / p;
        var midYear = Math.max(1, Math.floor(yrs / 2));
        document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US');
        document.getElementById('simYearsLabel').textContent = yrs + ' 年';
        document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
        document.getElementById('simEndingVal').textContent = formatCurrency(endingValue);
        document.getElementById('simMoicVal').textContent = moic.toFixed(2) + 'x · ' + (totalRate * 100).toFixed(2) + '%';
        document.getElementById('simNetGainVal').textContent = formatCurrency(endingValue - p);
        document.getElementById('simMidLabel').textContent = '第 ' + midYear + ' 年中期资产节点';
        document.getElementById('simMidVal').textContent = formatCurrency(p * Math.pow(1 + totalRate, midYear));
        var presetBtns = document.querySelectorAll('[data-preset]');
        for (var i = 0; i < presetBtns.length; i++) {
          presetBtns[i].classList.toggle('active', presetBtns[i].getAttribute('data-preset') === state.sim.preset);
        }
        drawSimChart();
      }

      function renderAllCharts() {
        drawCh1Chart();
        drawRadarChart();
        drawHorizontalBars();
        drawEpsComboChart();
        drawSimChart();
      }

      function wireTip(id) {
        var c = document.getElementById(id), tip = document.getElementById('chartTooltip');
        if (!c || !tip) return;
        c.addEventListener('mousemove', function (e) {
          var rect = c.getBoundingClientRect();
          var x = e.clientX - rect.left, y = e.clientY - rect.top;
          var regs = hitRegions[id] || [], hit = null;
          for (var i = 0; i < regs.length; i++) {
            var r = regs[i];
            if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { hit = r; break; }
          }
          if (hit) {
            tip.innerHTML = hit.html;
            tip.style.display = 'block';
            tip.style.left = Math.min(window.innerWidth - 295, e.clientX + 14) + 'px';
            tip.style.top = Math.max(12, e.clientY - 36) + 'px';
          } else {
            tip.style.display = 'none';
          }
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }

      function init() {
        try {
          var st = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
          var sl = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
          var sc = JSON.parse(localStorage.getItem(STORAGE_CHECK_KEY) || 'null');
          if (Array.isArray(sc) && sc.length === 6) state.checks = sc.map(Boolean);
          applyTheme(st, true);
          applyLanguage(sl, true);
        } catch (e) {
          renderPeerTable();
          renderChecklist();
          updateSimulatorUI();
          renderAllCharts();
        }

        document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
        document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
        document.getElementById('appbarThemeBtn').addEventListener('click', function () {
          applyTheme(state.theme === 'dark' ? 'light' : 'dark', false);
        });
        
        
        

        var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
        sbBtn.addEventListener('click', function () {
          if (window.innerWidth >= 1024) {
            var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
            if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
            else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
            try { localStorage.setItem('mui_portal_sidebar_collapsed_v1', col ? '0' : '1'); } catch (e) {}
            setTimeout(renderAllCharts, 60);
          } else {
            var open = sb.classList.toggle('open'); bd.classList.toggle('open', open);
          }
        });
        bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

        var hub = document.getElementById('companySubfolderHub');
        if (hub) {
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
              var jp = item.getAttribute('data-suite-jump');
              var ts = item.getAttribute('data-suite-toast');
              if (jp) {
                var el = document.querySelector(jp);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else if (ts) showToast(ts);
            }
          });
        }

        document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.ch1View = this.getAttribute('data-ch1-view');
            document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
            document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
            drawCh1Chart();
          });
        });

        document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var p = document.getElementById(this.getAttribute('data-collapse-target'));
            if (!p) return;
            var open = p.classList.toggle('open');
            this.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
          });
        });

        var pCards = document.querySelectorAll('[data-pillar]');
        pCards.forEach(function (card) {
          card.addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
            state.activePillar = idx;
            pCards.forEach(function (c, k) { c.classList.toggle('active', k === idx); });
            document.getElementById('pillarFocusNote').innerHTML = '<div>' + (state.lang === 'en' ? PILLAR_NOTES_EN : PILLAR_NOTES)[idx] + '</div>';
            drawRadarChart();
          });
        });

        document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
          pill.addEventListener('click', function () {
            var k = this.getAttribute('data-radar-key');
            state.radarSeries[k] = !state.radarSeries[k];
            if (!state.radarSeries.googl && !state.radarSeries.aapl && !state.radarSeries.msft) state.radarSeries[k] = true;
            this.classList.toggle('muted', !state.radarSeries[k]);
            drawRadarChart();
          });
        });

        document.querySelectorAll('[data-ch1-series]').forEach(function (pill) {
          pill.addEventListener('click', function () {
            var k = this.getAttribute('data-ch1-series');
            state.ch1Series[k] = !state.ch1Series[k];
            if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[k] = true;
            this.classList.toggle('muted', !state.ch1Series[k]);
            drawCh1Chart();
          });
        });

        document.querySelectorAll('[data-eps-series]').forEach(function (pill) {
          pill.addEventListener('click', function () {
            var k = this.getAttribute('data-eps-series');
            state.epsSeries[k] = !state.epsSeries[k];
            if (!state.epsSeries.eps && !state.epsSeries.oci) state.epsSeries[k] = true;
            this.classList.toggle('muted', !state.epsSeries[k]);
            drawEpsComboChart();
          });
        });

        document.getElementById('peerSearchInput').addEventListener('input', function () {
          state.peerQuery = this.value;
          renderPeerTable();
        });
        var pfBtns = document.querySelectorAll('[data-peer-filter]');
        pfBtns.forEach(function (b) {
          b.addEventListener('click', function () {
            state.peerFilter = this.getAttribute('data-peer-filter');
            pfBtns.forEach(function (x) { x.classList.toggle('active', x === b); });
            renderPeerTable();
          });
        });

        var pS = document.getElementById('simPrincipalSlider'), yS = document.getElementById('simYearsSlider'), cS = document.getElementById('simCagrSlider'), dT = document.getElementById('simDripToggle');
        pS.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
        yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 11; state.sim.preset = ''; updateSimulatorUI(); });
        cS.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
        dT.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
        document.querySelectorAll('[data-preset]').forEach(function (pb) {
          pb.addEventListener('click', function () {
            var k = this.getAttribute('data-preset'), cfg = PRESETS[k];
            if (!cfg) return;
            state.sim = { principal: cfg.principal, years: cfg.years, priceCagr: cfg.priceCagr, drip: cfg.drip, preset: k };
            pS.value = cfg.principal; yS.value = cfg.years; cS.value = cfg.priceCagr; dT.checked = cfg.drip;
            updateSimulatorUI();
          });
        });

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
          showToast('已勾选全部 6 项核查指标');
        });
        document.getElementById('resetCheckBtn').addEventListener('click', function () {
          state.checks = [true, true, true, false, false, false];
          try { localStorage.setItem(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); } catch (err) {}
          renderChecklist();
          showToast('核查清单已恢复默认基准');
        });

        var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
        function renderJump(q) {
          var kw = (q || '').trim().toLowerCase();
          var list = QUICK_JUMP_INDEX.filter(function (it) { return !kw || (it.title + ' ' + it.sub).toLowerCase().indexOf(kw) !== -1; });
          jumpPop.innerHTML = list.map(function (it) {
            return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
          }).join('');
          jumpPop.classList.toggle('open', list.length > 0);
        }
        jumpInput.addEventListener('focus', function () { renderJump(jumpInput.value); });
        jumpInput.addEventListener('input', function () { renderJump(jumpInput.value); });
        jumpPop.addEventListener('click', function (e) {
          var b = e.target.closest('[data-jump-sec]');
          if (!b) return;
          var sec = document.getElementById(b.getAttribute('data-jump-sec'));
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
          jumpPop.classList.remove('open');
        });
        document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
        document.addEventListener('keydown', function (e) { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); } });

        window.addEventListener('scroll', function () {
          var maxS = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxS) * 100) + '%';
        }, { passive: true });

        ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireTip);
        var rt = null;
        window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 80); });
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    })();
  