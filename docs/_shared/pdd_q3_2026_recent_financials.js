
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_pdd_theme_v1';
      var STORAGE_LANG_KEY = 'mui_pdd_lang_v1';
      var STORAGE_CHECK_KEY = 'mui_pdd_checks_v1';

      var DOC_TITLE_ZH = '拼多多控股 PDD Holdings (PDD) 2026年Q3及近期财报深度研究报告 | 数据中心';
      var DOC_TITLE_EN = 'PDD Holdings (PDD) Q3 2026 & Recent Earnings Deep Dive | Research Hub';

      var I18N_TEXT_PAIRS = [
        ['数据中心', 'Research Hub'],
        ['拼多多 (PDD Holdings) 2026年Q3及近期财报研报', 'PDD Holdings Q3 2026 Earnings Analysis'],
        ['拼多多财报深度研报', 'PDD Earnings Monograph'],
        ['营收停滞与利润跃升的剪刀差 × 营销费率大降5pct × ¥4,554亿现金与短期投资堡垒', 'Flat Revenue vs. +24.5% Operating Profit × S&M Ratio -4.7pp × RMB 455.4B Cash Fortress'],
        ['Q3 2026 总营收', 'Q3 2026 Revenue'],
        ['Non-GAAP 营业利润率', 'Non-GAAP Op Margin'],
        ['现金+短期投资储备', 'Cash & ST Investments'],
        ['核心研究章节 (00 – 07)', 'Report Chapters (00 – 07)'],
        ['执行摘要与核心指标', 'Executive Summary & KPIs'],
        ['收入结构分化与业务矩阵', 'Revenue Split & Business Matrix'],
        ['四大战略支柱与竞争力画像', '4 Pillars & Competitive Radar'],
        ['全球电商巨头财报横向对比', 'Global E-Commerce Peer Matrix'],
        ['现金堡垒与估值情景推演', 'Cash Fortress & Valuation Sim'],
        ['2025–2026 季度演进与复盘', '2025–2026 Quarterly Evolution'],
        ['财报质量与风险核查清单', 'Earnings Diagnostic Checklist'],
        ['官方财报与信源核验索引', 'Official Filings & Sources'],
        ['阅读与导出工具', 'Reading & Export Tools'],
        ['浅色外观', 'Light'],
        ['深色外观', 'Dark'],
        ['导出 HTML', 'Export HTML'],
        ['打印 / PDF', 'Print / PDF'],
        ['财报定评：营收零增长下的“控费增效与盈利强弹性拐点”', 'Verdict: Cost Discipline & Margin Inflection Amid Flat Top-Line'],
        ['覆盖周期：FY2025 全年 · Q1–Q3 2026（截至 2026-09-30）', 'Scope: FY2025 Full Year · Q1–Q3 2026 (Ended Sep 30, 2026)'],
        ['数据基准：2026-11-19 Q3财报', 'Baseline: Nov 19, 2026 Q3 Release'],
        ['双引擎分化：营销回暖 (+12.1%) 对冲交易回落 (-11.7%)', 'Dual-Engine Split: Marketing (+12.1%) Offsets Transaction (-11.7%)'],
        ['费用端“去泡沫”：营销费用大降 50 亿元', 'S&M De-Bloating: Marketing Spend Cut by RMB 5.0B'],
        ['¥5,711 亿广义现金储备与资本配置悬念', 'RMB 571.1B Liquidity Pool & Capital Return Question'],
        ['Non-GAAP 摊薄每 ADS 收益', 'Non-GAAP Diluted EPADS'],
        ['现金及短期投资储备', 'Cash & ST Investments'],
        ['一、收入结构分化与成本拆解：国内营销引擎稳盘，跨境交易主动降速提质', '1. Revenue Bifurcation & Cost Structure: Domestic Ads Stabilize While Cross-Border Resets'],
        ['从“全速买量换规模”转向“本地仓配深耕 + 高质量商户生态治理”', 'Shifting from aggressive user-acquisition spend to local warehousing and ecosystem governance'],
        ['视图A: 营销 vs 交易收入', 'View A: Marketing vs Transaction'],
        ['视图B: 营业利润与利润率', 'View B: Op Profit & Margin %'],
        ['二、四大战略支柱与护城河评估：战略投资期的取舍之道', '2. Four Strategic Pillars & Competitive Moat: Strategic Investment Trade-Offs'],
        ['点击左侧任一战略支柱卡片，联动查看拼多多与阿里、京东、亚马逊的五维财务与商业画像', 'Click any strategic pillar to highlight PDD vs. Alibaba, JD.com, and Amazon on the 5-axis radar'],
        ['全球核心电商平台 Q3 2026 财报五维竞争力雷达图（10分制）', 'Global E-Commerce Q3 2026 Five-Axis Competitiveness Radar (10-Point Scale)'],
        ['三、2026年Q3全球电商巨头横向对比：高盈利护城河 vs 增速与资本开支分歧', '3. Q3 2026 Global E-Commerce Peer Matrix: Margin Moat vs. Growth & CapEx Divergence'],
        ['全部电商平台', 'All Platforms'],
        ['中国核心电商', 'China E-Commerce'],
        ['全球化重资产平台', 'Global Asset-Heavy'],
        ['公司与股票代码', 'Company & Ticker'],
        ['Q3 2026 营收与同比增速', 'Q3 2026 Revenue & YoY'],
        ['GAAP 营业利润与利润率', 'GAAP Op Profit & Margin'],
        ['核心增长引擎 / 拖累项', 'Key Growth Driver / Drag'],
        ['现金储备与资本开支特征', 'Cash Reserve & CapEx Profile'],
        ['财报核心定评与同业对比', 'Analytical Verdict vs. Peers'],
        ['Q3 2026 拼多多成本费率结构 &amp; 全球同业 GAAP 营业利润率对比（%）', 'Q3 2026 PDD Cost Structure & Global Peer GAAP Operating Margins (%)'],
        ['四、现金堡垒与估值情景推演：7.5x PE 下的安全边际与净现金折价', '4. Cash Fortress & Valuation Simulator: Margin of Safety at 7.5x Forward P/E'],
        ['Q1 2025 – Q3 2026 归母净利润（Non-GAAP）vs 销售及营销费率趋势', 'Q1 2025 – Q3 2026 Non-GAAP Net Income vs. S&M Expense Ratio'],
        ['拼多多 SOTP / 远期 PE 与现金折价估值推演器', 'PDD Forward P/E & Net-Cash Re-Rating Simulator'],
        ['五、2025–2026 演进复盘：从“生态让利阵痛”到“控费利润拐点”', '5. 2025–2026 Evolution: From Ecosystem Investment Drag to Margin Inflection'],
        ['六、拼多多后续财报跟踪交互式核查清单', '6. Interactive PDD Earnings Quality & Catalyst Checklist'],
        ['全部勾选', 'Check All'],
        ['重置清单', 'Reset'],
        ['数据来源与官方财报核验索引（PDD Holdings IR & Official Releases）', 'Primary Filings & Official Earnings Releases Index (PDD IR & SEC EDGAR)']
      ];

      var _zhToEn = {};
      var _enToZh = {};
      for (var i = 0; i < I18N_TEXT_PAIRS.length; i++) {
        _zhToEn[I18N_TEXT_PAIRS[i][0]] = I18N_TEXT_PAIRS[i][1];
        _enToZh[I18N_TEXT_PAIRS[i][1]] = I18N_TEXT_PAIRS[i][0];
      }

      var PILLAR_NOTES_ZH = [
        '<strong>当前选中支柱解读（01 国内主站心智）：</strong>赵佳臻在 Q3 财报会指出，国内电商竞争在比价、品质与服务维度依然激烈，没有任何平台退缩；但拼多多凭借 12.1% 的在线营销增速证明其核心变现效率未受损 <a class="cite-link" href="https://thelowdown.momentum.asia/full-transcript-of-pdd-holdings-q3-2026-earnings-call-qa-section/" target="_blank" rel="noopener noreferrer">Q3 Transcript ↗</a>。',
        '<strong>当前选中支柱解读（02 跨境转型阵痛）：</strong>受欧美取消小额包裹免税及新关税政策冲击，Q3 交易服务收入同比下滑 11.7%；管理层正加速整合本地仓储物流以提升海外履约稳定性 <a class="cite-link" href="https://finance.biggo.com/news/US_PDD_2026-11-19" target="_blank" rel="noopener noreferrer">Q3 Call Summary ↗</a>。',
        '<strong>当前选中支柱解读（03 生态长远投入）：</strong>2026 Q2 以来公司落地雄安子公司并推进三年“再造一个拼多多”供应链升级计划，研发费用在 Q3 逆势增长 16.8% 至 50.59 亿元。',
        '<strong>当前选中支柱解读（04 极简高人效）：</strong>仅凭约 2.55 万名员工（FY25 20-F）支撑 4,300 亿+ 年营收，Q3 GAAP 营业利润率高达 28.8%，显著领先阿里 (10.7%)、京东 (1.7%) 与亚马逊 (13.9%)。'
      ];

      var PILLAR_NOTES_EN = [
        '<strong>Selected Pillar (01 Domestic Cash Cow):</strong> Co-CEO Jiazhen Zhao noted domestic competition across price, quality, and service remains intense, yet 12.1% online marketing growth proves resilient monetization <a class="cite-link" href="https://thelowdown.momentum.asia/full-transcript-of-pdd-holdings-q3-2026-earnings-call-qa-section/" target="_blank" rel="noopener noreferrer">Q3 Transcript ↗</a>.',
        '<strong>Selected Pillar (02 Global Pivot):</strong> Evolving trade rules and de minimis tax changes drove an 11.7% drop in transaction services revenue; management is building end-to-end local warehousing to stabilize Temu <a class="cite-link" href="https://finance.biggo.com/news/US_PDD_2026-11-19" target="_blank" rel="noopener noreferrer">Q3 Call Summary ↗</a>.',
        '<strong>Selected Pillar (03 Ecosystem 3-Year Plan):</strong> Following the May 2026 Xiongan subsidiary expansion, R&amp;D rose 16.8% YoY in Q3 to RMB 5.06B to empower supply-chain merchants and compliance governance.',
        '<strong>Selected Pillar (04 Elite Productivity):</strong> With ~25,474 FTEs (FY25 20-F), PDD delivered a 28.8% GAAP operating margin in Q3—far ahead of Alibaba (10.7%), JD.com (1.7%), and Amazon (13.9%).'
      ];

      var PEER_ROWS_ZH = [
        {
          category: 'china', benchmark: true,
          company: '研究基准：拼多多 (PDD)',
          rev: '¥108.34B (+0.06% YoY)',
          opm: '¥31.16B (28.8% GAAP / 30.1% Non-GAAP)',
          driver: '在线营销 +12.1% 稳盘；交易服务 -11.7% 拖累（跨境税制冲击）',
          cash: '现金+短期投资 ¥455.4B；零分红零回购；轻资产低 CapEx',
          verdict: '盈利能力居全行业之首，但营收增速放缓与零资本回馈压制估值至 ~7.5x 远期 PE。',
          sourceLabel: 'PDD Q3 2026', sourceUrl: 'https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/'
        },
        {
          category: 'china', benchmark: false,
          company: '阿里巴巴 (BABA)',
          rev: '¥271.52B (+10.0% YoY)',
          opm: '¥29.12B (10.7% GAAP · 同比 +443%)',
          driver: 'AI 云营收飙升 +53%、即时零售减亏；国际电商受欧盟税改 -8%',
          cash: '现金及流动投资 ¥487.9B；重金投入 AI 算力 CapEx（单季 FCF 流出 $51.4 亿）',
          verdict: 'AI 云计算成为强势第二曲线，但重资产算力投入大幅消耗自由现金流，营业利润率约为拼多多 1/3。',
          sourceLabel: 'Alibaba Sep Qtr', sourceUrl: 'https://www.securities.io/alibaba-operating-income-jumps-443-as-ai-cloud-revenue-grows-53/'
        },
        {
          category: 'china', benchmark: false,
          company: '京东集团 (JD)',
          rev: '¥309.6B (+3.5% YoY)',
          opm: '¥5.2B (1.7% 集团 GAAP · 京东零售 5.8%)',
          driver: '自营供应链与京东零售稳健，新业务单季亏损 ¥9.6B 拖累集团利润',
          cash: '重资产物流仓储体系支撑履约时效，净利率远低于轻资产平台',
          verdict: '重资产自营模式抗周期性强但利润率薄，集团营业利润率较拼多多低逾 27 个百分点。',
          sourceLabel: 'JD Q3 2026', sourceUrl: 'https://ir.jd.com/news-releases/news-release-details/jdcom-announces-third-quarter-2026-results'
        },
        {
          category: 'global', benchmark: false,
          company: '亚马逊 (AMZN)',
          rev: '$201.94B (+12.1% YoY)',
          opm: '$28.08B (13.9% 创历史新高 · AWS 38.7%)',
          driver: 'AWS 云业务 +39.3% 贡献 63% 营业利润；零售与广告稳健增长',
          cash: '2026 年预计现金 CapEx 高达 $2,200 亿，Q3 FCF 为 -$348.4 亿',
          verdict: 'AWS 带来高利润与强增长，但 AI 基建资本开支激增推高长期债务；拼多多则以轻资产维持净现金持续累积。',
          sourceLabel: 'Amazon Q3 2026', sourceUrl: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/'
        }
      ];

      var PEER_ROWS_EN = [
        {
          category: 'china', benchmark: true,
          company: 'Benchmark: PDD Holdings (PDD)',
          rev: 'RMB 108.34B (+0.06% YoY)',
          opm: 'RMB 31.16B (28.8% GAAP / 30.1% Non-GAAP)',
          driver: 'Online Marketing +12.1% offsets Transaction Services -11.7% (trade/tax headwinds)',
          cash: 'RMB 455.4B Cash+ST Inv; zero dividend/buyback; asset-light low CapEx',
          verdict: 'Highest operating margin among global e-commerce peers, but stalled top-line and zero capital return keep P/E compressed (~7.5x).',
          sourceLabel: 'PDD Q3 2026', sourceUrl: 'https://investor.pddholdings.com/news-releases/news-release-details/pdd-holdings-announces-third-quarter-2026-unaudited-financial/'
        },
        {
          category: 'china', benchmark: false,
          company: 'Alibaba Group (BABA)',
          rev: 'RMB 271.52B (+10.0% YoY)',
          opm: 'RMB 29.12B (10.7% GAAP · +443% YoY)',
          driver: 'AI Cloud +53% & Quick Commerce loss reduction; Intl commerce -8% on EU customs reform',
          cash: 'RMB 487.9B cash/liquid inv; heavy AI CapEx drove $5.14B quarterly FCF outflow',
          verdict: 'AI Cloud provides a powerful second growth curve, though heavy AI CapEx weighs on free cash flow and margin sits ~18pp below PDD.',
          sourceLabel: 'Alibaba Sep Qtr', sourceUrl: 'https://www.securities.io/alibaba-operating-income-jumps-443-as-ai-cloud-revenue-grows-53/'
        },
        {
          category: 'china', benchmark: false,
          company: 'JD.com (JD)',
          rev: 'RMB 309.6B (+3.5% YoY)',
          opm: 'RMB 5.2B (1.7% Group GAAP · JD Retail 5.8%)',
          driver: 'Stable 1P retail margin (5.8%), weighed down by RMB 9.6B New Businesses loss',
          cash: 'Asset-heavy fulfillment & logistics infrastructure limits consolidated margin',
          verdict: '1P supply chain delivers fulfillment reliability, but consolidated operating margin trails PDD by >27 percentage points.',
          sourceLabel: 'JD Q3 2026', sourceUrl: 'https://ir.jd.com/news-releases/news-release-details/jdcom-announces-third-quarter-2026-results'
        },
        {
          category: 'global', benchmark: false,
          company: 'Amazon.com (AMZN)',
          rev: '$201.94B (+12.1% YoY)',
          opm: '$28.08B (13.9% Record · AWS 38.7%)',
          driver: 'AWS +39.3% generates 63.3% of operating profit ($17.8B); retail steady',
          cash: '~$220B FY26 cash CapEx guide; Q3 FCF -$34.84B funded via debt',
          verdict: 'AWS drives record operating profit and top-line scale, whereas PDD preserves an unlevered asset-light cash fortress.',
          sourceLabel: 'Amazon Q3 2026', sourceUrl: 'https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/'
        }
      ];

      var CHECKLIST_ZH = [
        { tag: '增速拐点', title: '1. 交易服务收入何时止跌回正？', desc: '跟踪 Q4 2026 及 2027 Q1 交易服务收入环比/同比变化，验证 Temu 半托管与海外本地仓是否成功对冲关税及小额免税取消冲击。' },
        { tag: '变现韧性', title: '2. 国内在线营销增速能否维持 10%+？', desc: 'Q3 在线营销恢复至 +12.1% YoY，需观察国内消费复苏节奏及商家“千亿扶持”减费后的净货币化率趋势。' },
        { tag: '费用纪律', title: '3. 23.3% 营销费率是新常态还是季度波动？', desc: 'Q4 历来为双十一与海外黑五旺季，重点核查 Q4 销售及营销费用率是否反弹，以及 Non-GAAP 营业利润率能否守住 25%–30% 区间。' },
        { tag: '资本回报', title: '4. ¥4,554 亿现金池何时开启回购或分红？', desc: '当前现金+短期投资已占市值重要比重，若管理层宣布首次股票回购或特别派息，将成为估值重估（7.5x → 10x+）最强催化剂。' },
        { tag: '研发投入', title: '5. 研发加码 (+16.8%) 是否转化为 AI 转化率提升？', desc: '关注全站推广 AI 算法效率、商品合规审核自动化对运营杠杆的长期正向贡献。' },
        { tag: '税务与合规', title: '6. 有效税率与“其他净损失”是否趋于平稳？', desc: 'Q2 录得 73.99 亿其他净损失、Q3 有效税率升至 18.2%，需跟踪海外合规准备金与子公司税务安排是否已阶段性出清。' }
      ];

      var CHECKLIST_EN = [
        { tag: 'Revenue Inflection', title: '1. When do Transaction Services stabilize?', desc: 'Track Q4 2026 & Q1 2027 sequential/YoY transaction revenue to confirm Temu local warehousing offsets de minimis tax headwinds.' },
        { tag: 'Ad Monetization', title: '2. Can Online Marketing sustain 10%+ YoY?', desc: 'Marketing accelerated to +12.1% in Q3; monitor net take-rate durability alongside merchant fee-rebate programs.' },
        { tag: 'OpEx Discipline', title: '3. Is the 23.3% S&M ratio sustainable in Q4?', desc: 'Q4 includes Singles Day and Black Friday; check whether S&M stays disciplined and Non-GAAP operating margin holds 25%–30%.' },
        { tag: 'Capital Return', title: '4. Will PDD initiate buybacks or dividends?', desc: 'With RMB 455.4B in cash & ST investments, any inaugural buyback or dividend announcement would trigger major P/E re-rating.' },
        { tag: 'R&D ROI', title: '5. Does +16.8% R&D lift AI ad conversion?', desc: 'Monitor AI merchant tools and automated compliance governance for sustained operating leverage.' },
        { tag: 'Tax & One-Offs', title: '6. Have tax rates & other losses normalized?', desc: 'After Q2 RMB 7.4B other losses and Q3 18.2% effective tax rate, verify whether regulatory provisions are behind the company.' }
      ];

      var QUICK_JUMP_ZH = [
        { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '营收 ¥108.34B · Non-GAAP OPM 30.1% · 现金 ¥455.4B' },
        { sec: 'sec-01', title: '01 收入结构分化与业务矩阵', sub: '在线营销 +12.1% vs 交易服务 -11.7% · 季度趋势图' },
        { sec: 'sec-02', title: '02 四大战略支柱与竞争力画像', sub: '主站现金牛 · Temu 本地仓 · 五维雷达图' },
        { sec: 'sec-03', title: '03 全球电商巨头财报横向对比', sub: '拼多多 vs 阿里巴巴 vs 京东 vs 亚马逊 Q3 2026' },
        { sec: 'sec-04', title: '04 现金堡垒与估值情景推演', sub: '7.5x PE 安全边际 · 交互式 SOTP/PE 估值模拟器' },
        { sec: 'sec-05', title: '05 2025–2026 季度演进与复盘', sub: '生态让利 → 雄安扩容 → Q3 控费利润跳升' },
        { sec: 'sec-06', title: '06 财报质量与风险核查清单', sub: '6 项后续财报跟踪指标（本地保存）' },
        { sec: 'sec-07', title: '07 官方财报与信源核验索引', sub: 'PDD IR · Form 20-F · BABA / JD / AMZN Q3' }
      ];

      var QUICK_JUMP_EN = [
        { sec: 'sec-00', title: '00 Executive Summary & KPIs', sub: 'Rev RMB 108.34B · Non-GAAP OPM 30.1% · Cash RMB 455.4B' },
        { sec: 'sec-01', title: '01 Revenue Split & Business Matrix', sub: 'Marketing +12.1% vs Transaction -11.7% · Quarterly Chart' },
        { sec: 'sec-02', title: '02 Four Pillars & Competitive Radar', sub: 'Domestic Cash Cow · Temu Pivot · 5-Axis Radar' },
        { sec: 'sec-03', title: '03 Global E-Commerce Peer Matrix', sub: 'PDD vs. Alibaba vs. JD.com vs. Amazon Q3 2026' },
        { sec: 'sec-04', title: '04 Cash Fortress & Valuation Sim', sub: '7.5x P/E Margin of Safety · Interactive Valuation Model' },
        { sec: 'sec-05', title: '05 2025–2026 Quarterly Evolution', sub: 'Ecosystem Spend → H1 Tax Drag → Q3 Profit Inflection' },
        { sec: 'sec-06', title: '06 Earnings Diagnostic Checklist', sub: '6 Catalyst & Risk Checkpoints (Saved Locally)' },
        { sec: 'sec-07', title: '07 Official Filings & Sources Index', sub: 'PDD IR · Form 20-F · BABA / JD / AMZN Q3' }
      ];

      var PRESETS = {
        p1: { growth: 5.0, pe: 8.0, years: 3, cash: false },
        p2: { growth: 10.0, pe: 10.0, years: 3, cash: true },
        p3: { growth: 15.0, pe: 12.5, years: 3, cash: true }
      };

      var state = {
        lang: 'zh',
        theme: 'light',
        ch1View: 'viewA',
        ch1Series: { s1: true, s2: true },
        activePillar: 0,
        radarSeries: { pdd: true, baba: true, amzn: true },
        peerFilter: 'all',
        peerQuery: '',
        epsSeries: { ni: true, sm: true },
        sim: { growth: 10.0, pe: 10.0, years: 3, cash: true, preset: 'p2' },
        checks: [true, true, true, false, false, false]
      };

      function safeGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
      function safeSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
      function isEn() { return state.lang === 'en'; }

      var toastTimer = null;
      function showToast(msg) {
        var el = document.getElementById('muiSnackbar');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
      }

      function escapeHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }

      function highlightMatch(text, query) {
        var safe = escapeHtml(text);
        if (!query) return safe;
        var esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return safe.replace(new RegExp('(' + esc + ')', 'gi'), '<mark class="hl">$1</mark>');
      }

      function syncCh1Header() {
        var t = document.getElementById('ch1ChartTitle');
        var s = document.getElementById('ch1ChartSub');
        if (!t || !s) return;
        if (state.ch1View === 'viewA') {
          t.textContent = isEn() ? 'Q1 2025 – Q3 2026 Quarterly Revenue Split (RMB Billions)' : 'Q1 2025 – Q3 2026 季度营收双引擎拆分（亿元 RMB）';
          s.textContent = isEn() ? 'Online Marketing (+12.1% YoY in Q3) reclaimed top share as Transaction Services fell -11.7% YoY' : 'Q3 2026 在线营销服务 (+12.1% YoY) 重回第一大收入来源，交易服务受外部税制冲击回调 (-11.7% YoY)';
        } else {
          t.textContent = isEn() ? 'Q1 2025 – Q3 2026 GAAP Operating Profit (RMB B) vs. Non-GAAP Op Margin (%)' : 'Q1 2025 – Q3 2026 GAAP 营业利润（十亿元）vs Non-GAAP 营业利润率（%）';
          s.textContent = isEn() ? 'Q3 2026 Non-GAAP operating margin surged +5.1pp YoY to 30.1% on S&M discipline' : '受控费增效推动，Q3 2026 Non-GAAP 营业利润率同比大升 5.1 个百分点至 30.1%';
        }
      }

      function syncCollapseText() {
        var btns = document.querySelectorAll('[data-collapse-target]');
        for (var i = 0; i < btns.length; i++) {
          var panel = document.getElementById(btns[i].getAttribute('data-collapse-target'));
          var open = panel && panel.classList.contains('open');
          if (isEn()) btns[i].innerHTML = open ? '<span>Hide Breakdown</span> <span>⌃</span>' : '<span>Show Breakdown</span> <span>⌄</span>';
          else btns[i].innerHTML = open ? '<span>收起财务归因细节</span> <span>⌃</span>' : '<span>展开财务归因细节</span> <span>⌄</span>';
        }
      }

      function applyLanguage(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
        var en = isEn();
        document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
        document.title = en ? DOC_TITLE_EN : DOC_TITLE_ZH;

        var zhBtn = document.getElementById('langZhBtn');
        var enBtn = document.getElementById('langEnBtn');
        if (zhBtn && enBtn) {
          zhBtn.classList.toggle('active', !en);
          enBtn.classList.toggle('active', en);
          zhBtn.setAttribute('aria-pressed', !en ? 'true' : 'false');
          enBtn.setAttribute('aria-pressed', en ? 'true' : 'false');
        }

        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        var node;
        while ((node = walker.nextNode())) {
          var p = node.parentElement;
          if (!p || p.tagName === 'SCRIPT' || p.tagName === 'STYLE' || p.closest('#langSwitchGroup') || p.closest('#pillarFocusNote')) continue;
          var raw = node.nodeValue || '';
          var trimmed = raw.replace(/\s+/g, ' ').trim();
          if (!trimmed) continue;
          var mapped = en ? _zhToEn[trimmed] : _enToZh[trimmed];
          if (mapped) {
            var lead = raw.match(/^\s*/)[0];
            var trail = raw.match(/\s*$/)[0];
            node.nodeValue = lead + mapped + trail;
          }
        }

        var pNote = document.getElementById('pillarFocusNote');
        if (pNote) pNote.innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>';

        syncCh1Header();
        syncCollapseText();
        renderPeerTable();
        renderChecklist();
        updateSimulatorUI();
        renderAllCharts();
        safeSet(STORAGE_LANG_KEY, state.lang);
        if (!silent) showToast(en ? 'Switched to English Research Edition' : '已切换至中文深度研报视图');
      }

      function applyTheme(theme, silent) {
        state.theme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        var abIcon = document.getElementById('appbarThemeIcon');
        if (abIcon) {
          abIcon.innerHTML = state.theme === 'dark'
            ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        }
        document.getElementById('sideThemeDarkBtn').classList.toggle('active', state.theme === 'dark');
        document.getElementById('sideThemeLightBtn').classList.toggle('active', state.theme === 'light');
        safeSet(STORAGE_THEME_KEY, state.theme);
        renderAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Mode' : '已切换至深海黑曜石护眼模式') : (isEn() ? 'Switched to Light Mode' : '已切换至浅色明亮阅读模式'));
      }

      function toggleSidebar() {
        if (window.innerWidth <= 1120) document.body.classList.toggle('drawer-open');
        else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
      }
      function closeMobileDrawer() { document.body.classList.remove('drawer-open'); }

      function renderPeerTable() {
        var tbody = document.getElementById('peerTableBody');
        var badge = document.getElementById('peerCountBadge');
        if (!tbody) return;
        var rows = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH;
        var q = state.peerQuery.trim().toLowerCase();
        var filtered = rows.filter(function (row, idx) {
          if (state.peerFilter !== 'all' && row.category !== state.peerFilter) return false;
          if (!q) return true;
          var hay = (PEER_ROWS_ZH[idx].company + ' ' + PEER_ROWS_ZH[idx].driver + ' ' + PEER_ROWS_ZH[idx].verdict + ' ' + PEER_ROWS_EN[idx].company + ' ' + PEER_ROWS_EN[idx].driver + ' ' + PEER_ROWS_EN[idx].verdict).toLowerCase();
          return hay.indexOf(q) !== -1;
        });
        if (badge) badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + rows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + rows.length + ' 家标杆平台');
        if (!filtered.length) {
          tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching platform found.' : '未找到匹配的电商平台记录。') + '</td></tr>';
          return;
        }
        var rawQ = state.peerQuery.trim();
        tbody.innerHTML = filtered.map(function (r) {
          return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
            '<td><strong style="color:var(--text-primary);">' + highlightMatch(r.company, rawQ) + '</strong></td>' +
            '<td class="mono" style="font-size:0.8rem;">' + highlightMatch(r.rev, rawQ) + '</td>' +
            '<td class="mono" style="font-size:0.8rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.opm, rawQ) + '</td>' +
            '<td>' + highlightMatch(r.driver, rawQ) + '</td>' +
            '<td>' + highlightMatch(r.cash, rawQ) + '</td>' +
            '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
            '</tr>';
        }).join('');
      }

      function renderChecklist() {
        var container = document.getElementById('checklistContainer');
        var chip = document.getElementById('checklistScoreChip');
        var bar = document.getElementById('checklistProgressBar');
        if (!container) return;
        var list = isEn() ? CHECKLIST_EN : CHECKLIST_ZH;
        var done = state.checks.filter(Boolean).length;
        var pct = Math.round((done / list.length) * 100);
        if (chip) chip.textContent = isEn() ? ('Verified ' + done + ' / ' + list.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + list.length + ' 项 (' + pct + '%)');
        if (bar) bar.style.width = pct + '%';
        container.innerHTML = list.map(function (item, idx) {
          var ck = !!state.checks[idx];
          return '<label class="check-card ' + (ck ? 'checked' : '') + '">' +
            '<input type="checkbox" data-check-input="' + idx + '" ' + (ck ? 'checked' : '') + ' />' +
            '<div style="flex:1;">' +
            '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;">' +
            '<span class="check-title">' + escapeHtml(item.title) + '</span>' +
            '<span class="mui-chip mono">' + escapeHtml(item.tag) + '</span>' +
            '</div>' +
            '<p class="check-desc">' + escapeHtml(item.desc) + '</p>' +
            '</div></label>';
        }).join('');
      }

      function updateSimulatorUI() {
        var baseEps = 9.93;
        var g = state.sim.growth / 100;
        var pe = state.sim.pe;
        var yrs = state.sim.years;
        var cashPad = state.sim.cash ? 23.0 : 0.0;
        var endEps = baseEps * Math.pow(1 + g, yrs);
        var targetPrice = endEps * pe + cashPad;
        var curPrice = 86.92;
        var upside = ((targetPrice / curPrice) - 1) * 100;
        var ann = (Math.pow(targetPrice / curPrice, 1 / yrs) - 1) * 100;

        document.getElementById('simGrowthLabel').textContent = state.sim.growth.toFixed(1) + '%';
        document.getElementById('simPeLabel').textContent = state.sim.pe.toFixed(1) + 'x';
        document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
        document.getElementById('simTargetPrice').textContent = '$' + targetPrice.toFixed(2);
        document.getElementById('simUpsideVal').textContent = (upside >= 0 ? '+' : '') + upside.toFixed(1) + '% · ' + ann.toFixed(1) + '%/yr';
        document.getElementById('simEndEps').textContent = '$' + endEps.toFixed(2) + ' / ADS';
        document.getElementById('simCashContrib').textContent = state.sim.cash ? '+$23.00 / ADS' : '$0.00';

        var btns = document.querySelectorAll('[data-preset]');
        for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('active', btns[i].getAttribute('data-preset') === state.sim.preset);
        drawSimChart();
      }

      /* ======================================================================
         Zero-Dependency High-DPI Canvas Charts
         ====================================================================== */
      var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
      var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

      function getPalette() {
        var cs = getComputedStyle(document.documentElement);
        var isDark = state.theme === 'dark';
        return {
          isDark: isDark,
          grid: cs.getPropertyValue('--chart-grid').trim() || 'rgba(148,163,184,0.15)',
          tick: cs.getPropertyValue('--chart-tick').trim() || '#64748B',
          text: cs.getPropertyValue('--text-primary').trim() || '#0F1924',
          pillBg: isDark ? 'rgba(9, 13, 22, 0.88)' : 'rgba(255, 255, 255, 0.94)',
          pillBorder: isDark ? 'rgba(51, 153, 255, 0.28)' : 'rgba(0, 115, 230, 0.24)',
          trackBg: isDark ? 'rgba(148, 163, 184, 0.10)' : 'rgba(15, 25, 36, 0.06)',
          hoverBand: isDark ? 'rgba(51, 153, 255, 0.07)' : 'rgba(0, 115, 230, 0.05)',
          c1: cs.getPropertyValue('--chart-c1').trim() || '#0073E6',
          c2: cs.getPropertyValue('--chart-c2').trim() || '#16A34A',
          c3: cs.getPropertyValue('--chart-c3').trim() || '#D97706',
          c4: cs.getPropertyValue('--chart-c4').trim() || '#7C3AED'
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
        if (canvas.width !== Math.floor(w * dpr)) canvas.width = Math.floor(w * dpr);
        if (canvas.height !== Math.floor(h * dpr)) canvas.height = Math.floor(h * dpr);
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
        var tw = ctx.measureText(text).width + 10;
        var th = 17;
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

        var qLabels = ['Q1 25', 'Q2 25', 'Q3 25', 'Q1 26', 'Q2 26', 'Q3 26'];
        var mkt = [48.72, 55.70, 53.35, 49.94, 57.64, 59.82];
        var tx = [46.95, 48.28, 54.93, 56.29, 54.72, 48.52];
        var opP = [16.09, 25.79, 25.03, 19.57, 27.76, 31.16];
        var opM = [19.1, 26.7, 25.0, 19.9, 25.9, 30.1];

        if (state.ch1View === 'viewA') {
          if (metaEl) metaEl.innerHTML = isEn() ? '<span style="color:var(--chart-c1);">■ Left Axis: Segment Revenue (RMB B)</span><span style="color:var(--text-muted);">Q3 2026 Total: RMB 108.34B</span>' : '<span style="color:var(--chart-c1);">■ 左轴：分板块季度收入 (十亿元 RMB)</span><span style="color:var(--text-muted);">Q3 2026 合计 ¥108.34B</span>';
          if (leg1) leg1.textContent = isEn() ? 'Online Marketing & Others (RMB B)' : '在线营销服务及其他 (RMB B)';
          if (leg2) leg2.textContent = isEn() ? 'Transaction Services (RMB B)' : '交易服务收入 (RMB B)';

          var pad = { top: 26, right: 20, bottom: 40, left: 48 };
          var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxY = 70;
          for (var g = 0; g <= 4; g++) {
            var val = (maxY / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
            ctx.fillText('¥' + val.toFixed(0) + 'B', pad.left - 8, gy);
          }

          var step = pw / qLabels.length, bw = Math.min(28, Math.max(12, step * 0.28));
          for (var i = 0; i < qLabels.length; i++) {
            var cx = pad.left + step * (i + 0.5);
            if (hoverState.chartCh1 === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 3, pad.top, step - 6, ph, 6); ctx.fill(); }
            if (state.ch1Series.s1) {
              var h1 = (mkt[i] / maxY) * ph, x1 = state.ch1Series.s2 ? (cx - bw - 3) : (cx - bw / 2), y1 = pad.top + ph - h1;
              var g1 = ctx.createLinearGradient(0, y1, 0, pad.top + ph); g1.addColorStop(0, '#3399FF'); g1.addColorStop(1, '#0066CC');
              ctx.fillStyle = g1; topRoundedBar(ctx, x1, y1, bw, h1, 4); ctx.fill();
              if (w >= 540 || i === 5) drawValueBadge(ctx, mkt[i].toFixed(1), x1 + bw / 2, y1 - 11, pal.c1, pal);
            }
            if (state.ch1Series.s2) {
              var h2 = (tx[i] / maxY) * ph, x2 = state.ch1Series.s1 ? (cx + 3) : (cx - bw / 2), y2 = pad.top + ph - h2;
              var g2 = ctx.createLinearGradient(0, y2, 0, pad.top + ph); g2.addColorStop(0, '#34D399'); g2.addColorStop(1, '#16A34A');
              ctx.fillStyle = g2; topRoundedBar(ctx, x2, y2, bw, h2, 4); ctx.fill();
              if (w >= 540 || i === 5) drawValueBadge(ctx, tx[i].toFixed(1), x2 + bw / 2, y2 - 11, pal.c2, pal);
            }
            ctx.fillStyle = i === 5 ? pal.text : pal.tick; ctx.font = (i === 5 ? '700 ' : '600 ') + '11.5px system-ui, sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(qLabels[i], cx, pad.top + ph + 22);
            hitRegions.chartCh1.push({
              idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
              html: '<strong>' + qLabels[i] + '</strong><br/>• ' + (isEn() ? 'Online Marketing' : '在线营销') + ': <strong>¥' + mkt[i].toFixed(2) + 'B</strong><br/>• ' + (isEn() ? 'Transaction Services' : '交易服务') + ': <strong>¥' + tx[i].toFixed(2) + 'B</strong><br/>• ' + (isEn() ? 'Total' : '合计') + ': <strong>¥' + (mkt[i] + tx[i]).toFixed(2) + 'B</strong>'
            });
          }
        } else {
          if (metaEl) metaEl.innerHTML = isEn() ? '<span style="color:var(--chart-c1);">■ Left Axis: GAAP Operating Profit (RMB B)</span><span style="color:var(--chart-c2);">● Right Axis: Non-GAAP Op Margin (%)</span>' : '<span style="color:var(--chart-c1);">■ 左轴：GAAP 营业利润 (十亿元)</span><span style="color:var(--chart-c2);">● 右轴：Non-GAAP 营业利润率 (%)</span>';
          if (leg1) leg1.textContent = isEn() ? 'GAAP Operating Profit (RMB B)' : 'GAAP 营业利润 (RMB B)';
          if (leg2) leg2.textContent = isEn() ? 'Non-GAAP Operating Margin (%)' : 'Non-GAAP 营业利润率 (%)';

          var padB = { top: 26, right: 48, bottom: 40, left: 48 };
          var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
          var maxP = 40, minM = 12, maxM = 34;
          for (var gb = 0; gb <= 4; gb++) {
            var rb = gb / 4, gyb = padB.top + phB - rb * phB;
            ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padB.left, gyb); ctx.lineTo(padB.left + pwB, gyb); ctx.stroke();
            ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
            ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('¥' + (maxP * rb).toFixed(0) + 'B', padB.left - 7, gyb);
            ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((minM + rb * (maxM - minM)).toFixed(0) + '%', padB.left + pwB + 7, gyb);
          }
          var stepB = pwB / qLabels.length, bwB = Math.min(36, Math.max(18, stepB * 0.42)), pts = [];
          for (var k = 0; k < qLabels.length; k++) {
            var cxb = padB.left + stepB * (k + 0.5);
            if (hoverState.chartCh1 === k) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padB.left + stepB * k + 3, padB.top, stepB - 6, phB, 6); ctx.fill(); }
            if (state.ch1Series.s1) {
              var bh = (opP[k] / maxP) * phB, by = padB.top + phB - bh;
              var bg = ctx.createLinearGradient(0, by, 0, padB.top + phB); bg.addColorStop(0, '#3399FF'); bg.addColorStop(1, '#0066CC');
              ctx.fillStyle = bg; topRoundedBar(ctx, cxb - bwB / 2, by, bwB, bh, 5); ctx.fill();
              ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
              if (bh > 20) ctx.fillText(opP[k].toFixed(1), cxb, by + 14);
            }
            pts.push({ x: cxb, y: padB.top + phB - ((opM[k] - minM) / (maxM - minM)) * phB, m: opM[k] });
            ctx.fillStyle = k === 5 ? pal.text : pal.tick; ctx.font = (k === 5 ? '700 ' : '600 ') + '11.5px system-ui, sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(qLabels[k], cxb, padB.top + phB + 22);
            hitRegions.chartCh1.push({
              idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
              html: '<strong>' + qLabels[k] + '</strong><br/>• GAAP Op Profit: <strong>¥' + opP[k].toFixed(2) + 'B</strong><br/>• Non-GAAP Op Margin: <strong>' + opM[k].toFixed(1) + '%</strong>'
            });
          }
          if (state.ch1Series.s2) {
            ctx.save(); drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
            for (var n = 0; n < pts.length; n++) {
              ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 5.5, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 3.8, 0, Math.PI * 2); ctx.fill();
              drawValueBadge(ctx, pts[n].m.toFixed(1) + '%', pts[n].x, pts[n].y - 15, pal.c2, pal);
            }
          }
        }
      }

      function drawRadarChart() {
        var env = prepareCanvas('chartRadar');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartRadar = [];
        var axes = isEn() ? ['Op Margin', 'Workforce Eff.', 'Cash Fortress', 'Top-Line Growth', 'Capital Return'] : ['营业利润率', '组织人效', '净现金厚度', '营收增速', '股东回馈'];
        var pillarMap = [1, 3, 2, 0];
        var hiAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : pillarMap[state.activePillar];
        var series = [
          { key: 'pdd', color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: [9.8, 9.7, 9.8, 4.5, 2.0] },
          { key: 'baba', color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: [6.2, 6.5, 8.6, 7.6, 8.2] },
          { key: 'amzn', color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: [7.2, 6.0, 5.8, 8.2, 3.5] }
        ];
        var cx = w / 2, cy = h / 2 + 8, sidePad = w < 420 ? 84 : 102, radius = Math.max(62, Math.min((w - sidePad * 2) / 2, h * 0.35)), total = axes.length;
        for (var ring = 2; ring <= 10; ring += 2) {
          var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1; ctx.beginPath();
          for (var i = 0; i < total; i++) {
            var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total, px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '600 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(String(ring), cx + 4, cy - r);
        }
        for (var a = 0; a < total; a++) {
          var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total, ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius, isHi = a === hiAxis;
          ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.8 : 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
          var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
          ctx.fillStyle = isHi ? pal.c1 : pal.text; ctx.font = (isHi ? '800 ' : '600 ') + '11.5px system-ui, sans-serif'; ctx.textBaseline = 'middle';
          ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
          ctx.fillText(axes[a], lx, ly);
          hitRegions.chartRadar.push({
            idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44,
            html: '<strong>' + axes[a] + '</strong><br/>• PDD: <strong>' + series[0].vals[a].toFixed(1) + '</strong> · BABA: <strong>' + series[1].vals[a].toFixed(1) + '</strong> · AMZN: <strong>' + series[2].vals[a].toFixed(1) + '</strong>'
          });
        }
        for (var s = 0; s < series.length; s++) {
          var item = series[s]; if (!state.radarSeries[item.key]) continue;
          ctx.beginPath();
          for (var idx = 0; idx < total; idx++) {
            var th = -Math.PI / 2 + (idx * 2 * Math.PI) / total, d = (item.vals[idx] / 10) * radius;
            if (idx === 0) ctx.moveTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d); else ctx.lineTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d);
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
          { label: 'PDD Q3 2026 Gross Margin', val: 58.2, cStart: '#34D399', cEnd: '#16A34A', sub: 'RMB 63.10B / 108.34B (+1.5pp)' },
          { label: 'PDD Q3 2026 Sales & Marketing Ratio', val: 23.3, cStart: '#FBBF24', cEnd: '#D97706', sub: 'RMB 25.30B (-4.7pp YoY)' },
          { label: 'PDD Q3 2026 R&D Expense Ratio', val: 4.7, cStart: '#A78BFA', cEnd: '#7C3AED', sub: 'RMB 5.06B (+16.8% YoY)' },
          { label: 'PDD Holdings GAAP Operating Margin (Q3 2026)', val: 28.8, cStart: '#3399FF', cEnd: '#0073E6', sub: 'Non-GAAP 30.1%' },
          { label: 'Amazon GAAP Operating Margin (Q3 2026)', val: 13.9, cStart: '#60A5FA', cEnd: '#2563EB', sub: 'AWS 38.7% · Record High' },
          { label: 'Alibaba GAAP Operating Margin (Sep Qtr 2026)', val: 10.7, cStart: '#38BDF8', cEnd: '#0284C7', sub: 'RMB 29.12B / 271.52B' },
          { label: 'JD.com GAAP Operating Margin (Q3 2026)', val: 1.7, cStart: '#94A3B8', cEnd: '#64748B', sub: 'JD Retail 5.8%' }
        ] : [
          { label: '拼多多 Q3 2026 毛利率 (Gross Margin)', val: 58.2, cStart: '#34D399', cEnd: '#16A34A', sub: '¥63.10B / ¥108.34B (+1.5pp)' },
          { label: '拼多多 Q3 2026 销售与营销费率 (S&M Ratio)', val: 23.3, cStart: '#FBBF24', cEnd: '#D97706', sub: '¥25.30B (同比 -4.7pp)' },
          { label: '拼多多 Q3 2026 研发费用率 (R&D Ratio)', val: 4.7, cStart: '#A78BFA', cEnd: '#7C3AED', sub: '¥5.06B (+16.8% YoY)' },
          { label: '拼多多 Q3 2026 GAAP 营业利润率', val: 28.8, cStart: '#3399FF', cEnd: '#0073E6', sub: 'Non-GAAP 高达 30.1%' },
          { label: '亚马逊 Q3 2026 GAAP 营业利润率', val: 13.9, cStart: '#60A5FA', cEnd: '#2563EB', sub: '创历史新高 (AWS 38.7%)' },
          { label: '阿里巴巴 2026年9月季 GAAP 营业利润率', val: 10.7, cStart: '#38BDF8', cEnd: '#0284C7', sub: '¥29.12B / ¥271.52B' },
          { label: '京东集团 Q3 2026 GAAP 营业利润率', val: 1.7, cStart: '#94A3B8', cEnd: '#64748B', sub: '京东零售 5.8%' }
        ];
        var pad = { top: 10, right: 18, bottom: 24, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 65;
        for (var g = 0; g <= 4; g++) {
          var xv = Math.round((maxX / 4) * g), gx = pad.left + (xv / maxX) * pw;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = g === 0 ? 'left' : (g === 4 ? 'right' : 'center');
          ctx.fillText(xv + '%', gx, pad.top + ph + 17);
        }
        var rowH = ph / items.length;
        for (var i = 0; i < items.length; i++) {
          var rt = pad.top + rowH * i;
          if (hoverState.chartBars === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left - 6, rt + 2, pw + 12, rowH - 4, 8); ctx.fill(); }
          var ly = rt + Math.max(14, rowH * 0.34), by = rt + Math.max(21, rowH * 0.52), bh = Math.min(13, Math.max(10, rowH * 0.25)), bw = Math.max(8, (items[i].val / maxX) * pw);
          ctx.fillStyle = pal.text; ctx.font = '600 ' + (w < 460 ? '11px' : '11.5px') + ' system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.fillText(items[i].label, pad.left, ly);
          var vs = items[i].val.toFixed(1) + '%'; ctx.font = '800 12px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? items[i].cStart : items[i].cEnd; ctx.textAlign = 'right'; ctx.fillText(vs, pad.left + pw, ly);
          if (w >= 560) { var vw = ctx.measureText(vs).width + 10; ctx.font = '500 10.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.tick; ctx.fillText(items[i].sub, pad.left + pw - vw, ly); }
          ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, by, pw, bh, bh / 2); ctx.fill();
          var bg = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0); bg.addColorStop(0, items[i].cStart); bg.addColorStop(1, items[i].cEnd);
          ctx.fillStyle = bg; roundRectPath(ctx, pad.left, by, bw, bh, bh / 2); ctx.fill();
          hitRegions.chartBars.push({ idx: i, x: pad.left, y: rt, w: pw, h: rowH, html: '<strong>' + items[i].label + ': ' + items[i].val.toFixed(1) + '%</strong><br/>' + items[i].sub });
        }
      }

      function drawEpsComboChart() {
        var env = prepareCanvas('chartEps');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartEps = [];
        var labels = ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'];
        var ni = [16.92, 32.71, 31.38, 26.30, 14.07, 28.49, 31.02];
        var sm = [34.9, 26.2, 28.0, 27.0, 31.8, 26.4, 23.3];
        var pad = { top: 26, right: 48, bottom: 40, left: 48 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var maxN = 40, minS = 18, maxS = 38;
        for (var g = 0; g <= 4; g++) {
          var r = g / 4, gy = pad.top + ph - r * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
          ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText('¥' + (maxN * r).toFixed(0) + 'B', pad.left - 7, gy);
          ctx.fillStyle = pal.c3; ctx.textAlign = 'left'; ctx.fillText((minS + r * (maxS - minS)).toFixed(0) + '%', pad.left + pw + 7, gy);
        }
        var step = pw / labels.length, bw = Math.min(36, Math.max(16, step * 0.42)), pts = [];
        for (var i = 0; i < labels.length; i++) {
          var cx = pad.left + step * (i + 0.5);
          if (hoverState.chartEps === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 3, pad.top, step - 6, ph, 6); ctx.fill(); }
          if (state.epsSeries.ni) {
            var bh = (ni[i] / maxN) * ph, by = pad.top + ph - bh;
            var bg = ctx.createLinearGradient(0, by, 0, pad.top + ph); bg.addColorStop(0, i === 6 ? '#66B2FF' : '#3399FF'); bg.addColorStop(1, '#0066CC');
            ctx.fillStyle = bg; topRoundedBar(ctx, cx - bw / 2, by, bw, bh, 5); ctx.fill();
            ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
            if (bh > 20) ctx.fillText(ni[i].toFixed(1), cx, by + 14);
          }
          pts.push({ x: cx, y: pad.top + ph - ((sm[i] - minS) / (maxS - minS)) * ph, sm: sm[i] });
          ctx.fillStyle = i === 6 ? pal.text : pal.tick; ctx.font = (i === 6 ? '700 ' : '600 ') + '11.5px system-ui, sans-serif';
          ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.fillText(labels[i], cx, pad.top + ph + 22);
          hitRegions.chartEps.push({
            idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
            html: '<strong>' + labels[i] + '</strong><br/>• Non-GAAP Net Income: <strong>¥' + ni[i].toFixed(2) + 'B</strong><br/>• S&amp;M Expense Ratio: <strong>' + sm[i].toFixed(1) + '%</strong>'
          });
        }
        if (state.epsSeries.sm) {
          ctx.save(); drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c3; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
          for (var m = 0; m < pts.length; m++) {
            ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pts[m].x, pts[m].y, 5.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = pal.c3; ctx.beginPath(); ctx.arc(pts[m].x, pts[m].y, 3.8, 0, Math.PI * 2); ctx.fill();
            drawValueBadge(ctx, pts[m].sm.toFixed(1) + '%', pts[m].x, pts[m].y - 15, pal.c3, pal);
          }
        }
      }

      function drawSimChart() {
        var env = prepareCanvas('chartSim');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartSim = [];
        var baseEps = 9.93, g = state.sim.growth / 100, pe = state.sim.pe, yrs = state.sim.years, cashPad = state.sim.cash ? 23.0 : 0.0;
        var withCash = [], exCash = [];
        for (var y = 0; y <= yrs; y++) {
          var ep = baseEps * Math.pow(1 + g, y);
          exCash.push(ep * pe);
          withCash.push(ep * pe + cashPad * (y / yrs));
        }
        var maxV = Math.max(withCash[yrs], exCash[yrs], 100) * 1.12;
        var pad = { top: 20, right: 20, bottom: 28, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        for (var gg = 0; gg <= 3; gg++) {
          var v = (maxV / 3) * gg, gy = pad.top + ph - (gg / 3) * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
          ctx.fillText('$' + Math.round(v), pad.left - 7, gy);
        }
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.7; ctx.beginPath();
        for (var i = 0; i <= yrs; i++) {
          var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (exCash[i] / maxV) * ph;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke(); ctx.restore();
        ctx.beginPath();
        var stepX = pw / yrs;
        for (var j = 0; j <= yrs; j++) {
          var tx = pad.left + (j / yrs) * pw, ty = pad.top + ph - (withCash[j] / maxV) * ph;
          if (j === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
          hitRegions.chartSim.push({
            idx: j, x: tx - Math.max(10, stepX * 0.4), y: pad.top, w: Math.max(20, stepX * 0.8), h: ph + 24,
            html: '<strong>Year ' + j + '</strong><br/>• Target w/ Cash: <strong>$' + withCash[j].toFixed(2) + '</strong><br/>• Core Business Only: $' + exCash[j].toFixed(2)
          });
        }
        ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.8; ctx.stroke();
        ctx.lineTo(pad.left + pw, pad.top + ph); ctx.lineTo(pad.left, pad.top + ph); ctx.closePath();
        var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph); grad.addColorStop(0, 'rgba(0,115,230,0.30)'); grad.addColorStop(1, 'rgba(0,115,230,0.01)');
        ctx.fillStyle = grad; ctx.fill();
        drawValueBadge(ctx, '$' + withCash[yrs].toFixed(1), Math.min(w - 36, pad.left + pw - 20), Math.max(pad.top + 12, pad.top + ph - (withCash[yrs] / maxV) * ph - 14), pal.c1, pal);
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'left'; ctx.fillText(isEn() ? 'Year 0' : '第 0 年', pad.left, pad.top + ph + 19);
        ctx.textAlign = 'right'; ctx.fillText(isEn() ? ('Year ' + yrs) : ('第 ' + yrs + ' 年'), pad.left + pw, pad.top + ph + 19);
      }

      var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
      function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

      function wireCanvasTooltip(id) {
        var canvas = document.getElementById(id), tip = document.getElementById('chartTooltip');
        if (!canvas || !tip) return;
        function handle(cx, cy) {
          var rect = canvas.getBoundingClientRect(), mx = cx - rect.left, my = cy - rect.top, found = null;
          var list = hitRegions[id] || [];
          for (var i = 0; i < list.length; i++) {
            var r = list[i];
            if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { found = r; break; }
          }
          var nextIdx = found && typeof found.idx === 'number' ? found.idx : -1;
          if (hoverState[id] !== nextIdx) { hoverState[id] = nextIdx; if (redrawMap[id]) redrawMap[id](); }
          if (found) {
            tip.innerHTML = found.html; tip.style.display = 'block';
            var tw = tip.offsetWidth || 240, th = tip.offsetHeight || 70;
            tip.style.left = (cx + 14 + tw > window.innerWidth - 12 ? Math.max(12, cx - tw - 14) : cx + 14) + 'px';
            tip.style.top = Math.max(12, Math.min(window.innerHeight - th - 12, cy - 18)) + 'px';
          } else { tip.style.display = 'none'; }
        }
        canvas.addEventListener('mousemove', function (e) { handle(e.clientX, e.clientY); });
        canvas.addEventListener('mouseleave', function () {
          if (hoverState[id] !== -1) { hoverState[id] = -1; if (redrawMap[id]) redrawMap[id](); }
          tip.style.display = 'none';
        });
      }

      function exportStandaloneHtml() {
        var html = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
        var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'PDD_Q3_2026_Earnings_Analysis.html';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        showToast(isEn() ? 'Exported PDD_Q3_2026_Earnings_Analysis.html' : '已导出独立网页 PDD_Q3_2026_Earnings_Analysis.html');
      }

      function init() {
        var st = safeGet(STORAGE_THEME_KEY); if (st === 'light' || st === 'dark') state.theme = st;
        var sl = safeGet(STORAGE_LANG_KEY); if (sl === 'zh' || sl === 'en') state.lang = sl;
        var sc = safeGet(STORAGE_CHECK_KEY);
        if (sc) { try { var p = JSON.parse(sc); if (Array.isArray(p) && p.length === 6) state.checks = p.map(Boolean); } catch (e) {} }

        applyTheme(state.theme, true);
        applyLanguage(state.lang, true);

        document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
        document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
        document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
        document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
        document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
        document.getElementById('sideThemeLightBtn').addEventListener('click', function () { applyTheme('light', false); });
        document.getElementById('sideThemeDarkBtn').addEventListener('click', function () { applyTheme('dark', false); });
        document.getElementById('sideExportBtn')?.addEventListener('click', exportStandaloneHtml);
        document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

        var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
        for (var t = 0; t < tocLinks.length; t++) tocLinks[t].addEventListener('click', closeMobileDrawer);

        var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
        function renderJump(q) {
          var kw = (q || '').trim().toLowerCase(), list = isEn() ? QUICK_JUMP_EN : QUICK_JUMP_ZH;
          var hits = list.filter(function (it, idx) {
            return !kw || (QUICK_JUMP_ZH[idx].title + ' ' + QUICK_JUMP_ZH[idx].sub + ' ' + QUICK_JUMP_EN[idx].title + ' ' + QUICK_JUMP_EN[idx].sub).toLowerCase().indexOf(kw) !== -1;
          });
          jumpPop.innerHTML = hits.length ? hits.map(function (it) {
            return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
          }).join('') : '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">No match</div>';
          jumpPop.classList.add('open');
        }
        jumpInput.addEventListener('focus', function () { renderJump(jumpInput.value); });
        jumpInput.addEventListener('input', function () { renderJump(jumpInput.value); });
        jumpPop.addEventListener('click', function (e) {
          var b = e.target.closest('[data-jump-sec]');
          if (b) { var el = document.getElementById(b.getAttribute('data-jump-sec')); if (el) el.scrollIntoView({ behavior: 'smooth' }); jumpPop.classList.remove('open'); }
        });
        document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
        document.addEventListener('keydown', function (e) {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
          else if (e.key === 'Escape') { jumpPop.classList.remove('open'); closeMobileDrawer(); }
        });

        var ch1Btns = document.querySelectorAll('[data-ch1-view]');
        for (var c = 0; c < ch1Btns.length; c++) {
          ch1Btns[c].addEventListener('click', function () {
            state.ch1View = this.getAttribute('data-ch1-view');
            document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
            document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
            syncCh1Header(); drawCh1Chart();
          });
        }

        var cBtns = document.querySelectorAll('[data-collapse-target]');
        for (var cb = 0; cb < cBtns.length; cb++) {
          cBtns[cb].addEventListener('click', function () {
            var p = document.getElementById(this.getAttribute('data-collapse-target'));
            if (p) { p.classList.toggle('open'); syncCollapseText(); }
          });
        }

        var pCards = document.querySelectorAll('[data-pillar]');
        for (var pc = 0; pc < pCards.length; pc++) {
          pCards[pc].addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
            state.activePillar = idx;
            for (var k = 0; k < pCards.length; k++) pCards[k].classList.toggle('active', k === idx);
            document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[idx] + '</div>';
            drawRadarChart();
          });
        }

        var rPills = document.querySelectorAll('[data-radar-key]');
        for (var rp = 0; rp < rPills.length; rp++) {
          rPills[rp].addEventListener('click', function () {
            var k = this.getAttribute('data-radar-key');
            state.radarSeries[k] = !state.radarSeries[k];
            if (!state.radarSeries.pdd && !state.radarSeries.baba && !state.radarSeries.amzn) state.radarSeries[k] = true;
            this.classList.toggle('muted', !state.radarSeries[k]);
            drawRadarChart();
          });
        }

        document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
        var pfBtns = document.querySelectorAll('[data-peer-filter]');
        for (var pf = 0; pf < pfBtns.length; pf++) {
          pfBtns[pf].addEventListener('click', function () {
            state.peerFilter = this.getAttribute('data-peer-filter');
            for (var x = 0; x < pfBtns.length; x++) pfBtns[x].classList.toggle('active', pfBtns[x] === this);
            renderPeerTable();
          });
        }

        var gS = document.getElementById('simGrowthSlider'), pS = document.getElementById('simPeSlider'), yS = document.getElementById('simYearsSlider'), cT = document.getElementById('simCashToggle');
        gS.addEventListener('input', function () { state.sim.growth = parseFloat(this.value) || 0; state.sim.preset = ''; updateSimulatorUI(); });
        pS.addEventListener('input', function () { state.sim.pe = parseFloat(this.value) || 6; state.sim.preset = ''; updateSimulatorUI(); });
        yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 1; state.sim.preset = ''; updateSimulatorUI(); });
        cT.addEventListener('change', function () { state.sim.cash = !!this.checked; updateSimulatorUI(); });

        var preBtns = document.querySelectorAll('[data-preset]');
        for (var pb = 0; pb < preBtns.length; pb++) {
          preBtns[pb].addEventListener('click', function () {
            var k = this.getAttribute('data-preset'), cfg = PRESETS[k]; if (!cfg) return;
            state.sim.growth = cfg.growth; state.sim.pe = cfg.pe; state.sim.years = cfg.years; state.sim.cash = cfg.cash; state.sim.preset = k;
            gS.value = String(cfg.growth); pS.value = String(cfg.pe); yS.value = String(cfg.years); cT.checked = cfg.cash;
            updateSimulatorUI();
          });
        }

        document.getElementById('checklistContainer').addEventListener('change', function (e) {
          var inp = e.target.closest('[data-check-input]'); if (!inp) return;
          state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
        });
        document.getElementById('checkAllBtn').addEventListener('click', function () {
          state.checks = [true, true, true, true, true, true]; safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
          showToast(isEn() ? 'All 6 checkpoints verified' : '已勾选全部 6 项核查指标');
        });
        document.getElementById('resetCheckBtn').addEventListener('click', function () {
          state.checks = [true, true, true, false, false, false]; safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
          showToast(isEn() ? 'Checklist reset' : '核查清单已重置');
        });

        var ch1Ser = document.querySelectorAll('[data-ch1-series]');
        for (var cs = 0; cs < ch1Ser.length; cs++) {
          ch1Ser[cs].addEventListener('click', function () {
            var k = this.getAttribute('data-ch1-series');
            state.ch1Series[k] = !state.ch1Series[k];
            if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[k] = true;
            this.classList.toggle('muted', !state.ch1Series[k]); drawCh1Chart();
          });
        }

        var epsSer = document.querySelectorAll('[data-eps-series]');
        for (var es = 0; es < epsSer.length; es++) {
          epsSer[es].addEventListener('click', function () {
            var k = this.getAttribute('data-eps-series');
            state.epsSeries[k] = !state.epsSeries[k];
            if (!state.epsSeries.ni && !state.epsSeries.sm) state.epsSeries[k] = true;
            this.classList.toggle('muted', !state.epsSeries[k]); drawEpsComboChart();
          });
        }

        function updateScroll() {
          var d = document.documentElement, st = window.scrollY || d.scrollTop || 0, max = Math.max(1, d.scrollHeight - window.innerHeight);
          document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, (st / max) * 100)) + '%';
        }
        window.addEventListener('scroll', updateScroll, { passive: true }); updateScroll();

        if ('IntersectionObserver' in window) {
          var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                for (var i = 0; i < tocLinks.length; i++) tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === entry.target.id);
              }
            });
          }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
          for (var s = 0; s <= 7; s++) { var el = document.getElementById('sec-0' + s); if (el) obs.observe(el); }
        }

        wireCanvasTooltip('chartCh1'); wireCanvasTooltip('chartRadar'); wireCanvasTooltip('chartBars'); wireCanvasTooltip('chartEps'); wireCanvasTooltip('chartSim');

        var rTimer = null;
        window.addEventListener('resize', function () { if (rTimer) clearTimeout(rTimer); rTimer = setTimeout(renderAllCharts, 60); });
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    })();
  