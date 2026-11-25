
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_DENSITY_KEY = 'mui_clarity_density_v1';
      var STORAGE_CHECK_KEY = 'mui_birk_culture_checks_v1';

      var PILLAR_NOTES_ZH = [
        '<strong>当前选中支柱解读（01 解剖学功能原教旨）：</strong>正如 Oliver Reichert 在 IPO 公开信中所言：“我们既不是奢侈品，也不是时装或普通鞋企——我们是鞋床（Footbed）的发明者，一个建立在功能、品质与传统之上、超越潮流周期的品牌” <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1977102/000119312523233488/d541624df1.htm" target="_blank" rel="noopener noreferrer">SEC F-1 Letter ↗</a>。',
        '<strong>当前选中支柱解读（02 德国垂直制造主权）：</strong>100% 鞋床与超 95% 整鞋在德国自产，使勃肯成为全球百亿级鞋企中的唯一孤例；即便闭口鞋带动生产工时激增逾 50%，单双同口径制造成本依然稳步下降 <a class="cite-link" href="https://quartr.com/insights/edge/deutsche-qualitaet-the-story-of-birkenstock" target="_blank" rel="noopener noreferrer">Quartr Ops ↗</a>。',
        '<strong>当前选中支柱解读（03 工程化稀缺配额）：</strong>管理层在 Q1 FY2026 电话会上明确披露，公司仅满足批发订单簿约 70%–80% 的需求，主动留出 20%–30% 饥饿缺口，从而在全渠道实现超 90% 的正价销售率 <a class="cite-link" href="https://www.fool.com/earnings/call-transcripts/2026/02/12/birkenstock-birk-q1-2026-earnings-transcript/" target="_blank" rel="noopener noreferrer">Q1 FY26 Call ↗</a>。',
        '<strong>当前选中支柱解读（04 零代言与可维修长寿命）：</strong>由 CCO Jochen Gutzy 严守零付费明星代言红线，省下传统运动巨头高达 10%+ 的营销买量税；同时鞋底与鞋床可独立拆换维修，铸就跨世代口碑复购。'
      ];

      var PILLAR_NOTES_EN = [
        '<strong>Selected Pillar (01 · Orthopedic Function First):</strong> As CEO Oliver Reichert wrote in the IPO prospectus: "We are neither luxury nor fashion—we are the inventor of the footbed, built on function, quality, and tradition beyond fashion cycles" <a class="cite-link" href="https://www.sec.gov/Archives/edgar/data/1977102/000119312523233488/d541624df1.htm" target="_blank" rel="noopener noreferrer">SEC F-1 Letter ↗</a>.',
        '<strong>Selected Pillar (02 · German Craft Sovereignty):</strong> Producing 100% of footbeds and >95% of final footwear in Germany sets Birkenstock apart globally—reducing like-for-like unit cost even as closed-toe hours rose >50% <a class="cite-link" href="https://quartr.com/insights/edge/deutsche-qualitaet-the-story-of-birkenstock" target="_blank" rel="noopener noreferrer">Quartr Ops ↗</a>.',
        '<strong>Selected Pillar (03 · Engineered Scarcity):</strong> Management intentionally fulfills only 70%–80% of wholesale demand (leaving 20%–30% unfilled), locking in >90% full-price realization across channels <a class="cite-link" href="https://www.fool.com/earnings/call-transcripts/2026/02/12/birkenstock-birk-q1-2026-earnings-transcript/" target="_blank" rel="noopener noreferrer">Q1 FY26 Call ↗</a>.',
        '<strong>Selected Pillar (04 · Zero Paid Endorsements &amp; Longevity):</strong> Spending €0 on celebrity athlete contracts avoids the ~10% marketing tax paid by sportswear giants, translating ~59% GM into 31.8%+ Adj. EBITDA.'
      ];

      var PEER_ROWS_ZH = [
        {
          category: 'vertical',
          benchmark: true,
          company: '研究基准：勃肯 (Birkenstock · BIRK)',
          leader: 'Oliver Reichert (CEO) / J. Michael Chu (主席)',
          positioning: '三大职能单一集团 + 6大德国工厂垂直整合 (>95%德国总装)',
          culture: '百年鞋床功能原教旨 + 70%–80% 饥饿配额 + 零明星代言',
          headcount: '~7,600+ 人 (>75%制造工匠) · 零重大裁员',
          margins: 'FY25 营收 €20.97亿 · 毛利 59.1% · Adj. EBITDA 31.8% (Q3 FY26 33.7%)',
          verdict: '大众价格带的“民主版爱马仕”：以 €55–€500 定价跑出媲美顶奢的 >90% 全价率与 >31% EBITDA 利润率。',
          sourceLabel: 'SEC 20-F / Q3 6-K',
          sourceUrl: 'https://www.birkenstock-holding.com/media/document/73985536-d719-473e-bd3a-cfb54205f0db/assets/BIRK_Earnings_Release_6-K_Q3_26.pdf?disposition=inline'
        },
        {
          category: 'vertical',
          benchmark: false,
          company: '爱马仕 (Hermès · RMS.PA)',
          leader: 'Axel Dumas (执行主席)',
          positioning: '法国本土 24+ 皮具工坊垂直自造 + 家族控股长期主义',
          culture: 'École Hermès 工匠传承 + 极致配额稀缺 + 反快消保值哲学',
          headcount: '26,494 人 · 人均创收 ~€60.4万',
          margins: '2025 营收 €160.0亿 · 毛利率 ~71% · 经常性营业利润率 41.0%',
          verdict: '勃肯最接近的灵魂导师：同样拒绝外包代工、同样以供给克制塑造稀缺，但勃肯受众基数比顶奢宽广百倍。',
          sourceLabel: 'Hermès 2025 PR',
          sourceUrl: 'https://assets-finance.hermes.com/s3fs-public/node/pdf_file/2026-02/1770842738/hermes_20260212_pr_2025fullyearresults_va.pdf?VersionId=b_gXeCpcnuB3ftYcPgTb8IVxf8wfnw0k'
        },
        {
          category: 'outsourced',
          benchmark: false,
          company: 'Deckers Outdoor (DECK · HOKA/UGG)',
          leader: 'Stefano Caroti (CEO)',
          positioning: '美国总部轻资产研发营销 + 100% 亚洲第三方 OEM 代工',
          culture: '双爆款品牌矩阵 (HOKA 专业跑鞋 + UGG 秋冬稀缺配货)',
          headcount: '~6,000 人 · 人均创收 ~$91.2万',
          margins: 'FY26 营收 $54.7亿 · 毛利率 57.7% · 营业利润率 23.1%',
          verdict: 'UGG 的渠道控货与勃肯异曲同工，但 100% 外部代工意味着缺乏德国自有软木鞋床那样的物理制造壁垒。',
          sourceLabel: 'Deckers FY26 10-K',
          sourceUrl: 'https://www.jvinvest.ai/stocks/deckers-brands'
        },
        {
          category: 'outsourced',
          benchmark: false,
          company: '昂跑 (On Holding · ONON)',
          leader: 'Martin Hoffmann (CEO) / 联席创始人',
          positioning: '苏黎世工程实验室研发 + 越南自动化代工 + 高端多渠道',
          culture: '瑞士运动科技美学 + CloudTec 缓震专利 + 体育精英赞助',
          headcount: '轻资产研发与直营团队高速扩张',
          margins: 'FY25 毛利率高达 62.8% · 高端跑鞋提价能力强劲',
          verdict: '同为欧洲高端鞋履新贵且高毛利，但昂跑需持续迭代中底科技与赛事赞助，而勃肯核心鞋床百年无需推翻重来。',
          sourceLabel: 'ONON Analysis',
          sourceUrl: 'https://koalagains.com/stocks/XETRA/49G'
        },
        {
          category: 'outsourced',
          benchmark: false,
          company: '耐克 (NIKE · NKE)',
          leader: 'Elliott Hill (CEO)',
          positioning: '全球运动多品类矩阵 + 100% 外部代工 + 巨额体育明星营销',
          culture: '“Sport Offense” 竞技叙事 + 每年 $47.5亿 需求创造营销投入',
          headcount: '~73,000 人 (2026推进裁员重组) · 人均创收 ~$63.6万',
          margins: 'FY26 营收 $464.0亿 · 毛利率 42.9% · EBIT 利润率 8.3%',
          verdict: '反面镜像验证：耐克因早年过度挤压批发与经典款泛滥陷入去库存阵痛，凸显勃肯“70%–80%饥饿配货+零代言税”的稳健。',
          sourceLabel: 'Nike FY26 10-K',
          sourceUrl: 'https://dcfanalyst.com/blogs/overview/nke-overview'
        }
      ];

      var PEER_ROWS_EN = [
        {
          category: 'vertical',
          benchmark: true,
          company: 'Benchmark: Birkenstock (BIRK)',
          leader: 'Oliver Reichert (CEO) / J. Michael Chu (Chair)',
          positioning: 'Unified 3-Division Group + 6 German Plants (>95% German assembly)',
          culture: '120-yr footbed purism + 70%–80% order fulfillment + €0 celebrity ads',
          headcount: '~7,600+ staff (>75% craft mfg) · Zero mass layoffs',
          margins: 'FY25 Sales €2.10B · 59.1% GM · 31.8% Adj. EBITDA (Q3 FY26 33.7%)',
          verdict: '"Democratic Hermès": achieves >90% full-price realization and >31% EBITDA margin at accessible €55–€500 price points.',
          sourceLabel: 'SEC 20-F / Q3 6-K',
          sourceUrl: 'https://www.birkenstock-holding.com/media/document/73985536-d719-473e-bd3a-cfb54205f0db/assets/BIRK_Earnings_Release_6-K_Q3_26.pdf?disposition=inline'
        },
        {
          category: 'vertical',
          benchmark: false,
          company: 'Hermès International (RMS.PA)',
          leader: 'Axel Dumas (Executive Chairman)',
          positioning: '24+ French artisanal leather workshops + family-controlled horizon',
          culture: 'École Hermès craft mastery + strict quota scarcity + anti-discounting',
          headcount: '26,494 employees · ~€604K Rev / employee',
          margins: '2025 Sales €16.0B · ~71% GM · 41.0% Recurring Operating Margin',
          verdict: 'Closest philosophical peer: likewise owns European vertical craft and scarcity, though at ultra-HNW price points.',
          sourceLabel: 'Hermès 2025 PR',
          sourceUrl: 'https://assets-finance.hermes.com/s3fs-public/node/pdf_file/2026-02/1770842738/hermes_20260212_pr_2025fullyearresults_va.pdf?VersionId=b_gXeCpcnuB3ftYcPgTb8IVxf8wfnw0k'
        },
        {
          category: 'outsourced',
          benchmark: false,
          company: 'Deckers Outdoor (DECK · HOKA/UGG)',
          leader: 'Stefano Caroti (CEO)',
          positioning: 'Asset-light US brand HQ + 100% outsourced Asian OEM factories',
          culture: 'Dual-engine portfolio (HOKA running + UGG allocation discipline)',
          headcount: '~6,000 staff · ~$912K Rev / employee',
          margins: 'FY26 Sales $5.47B · 57.7% GM · 23.1% Operating Margin',
          verdict: 'Shares UGG scarcity discipline, but relies on third-party Asian factories rather than proprietary German footbed plants.',
          sourceLabel: 'Deckers FY26 10-K',
          sourceUrl: 'https://www.jvinvest.ai/stocks/deckers-brands'
        },
        {
          category: 'outsourced',
          benchmark: false,
          company: 'On Holding AG (ONON)',
          leader: 'Martin Hoffmann (CEO)',
          positioning: 'Swiss R&D lab + outsourced Vietnam manufacturing + premium DTC',
          culture: 'Swiss performance engineering + CloudTec cushioning + athlete sponsorships',
          headcount: 'Asset-light R&D & global retail expansion',
          margins: 'FY25 Gross Margin 62.8% · Premium pricing momentum',
          verdict: 'High-margin European peer, yet requires continuous performance R&D cycles vs. Birkenstock\'s timeless century-old footbed.',
          sourceLabel: 'ONON Analysis',
          sourceUrl: 'https://koalagains.com/stocks/XETRA/49G'
        },
        {
          category: 'outsourced',
          benchmark: false,
          company: 'NIKE, Inc. (NKE)',
          leader: 'Elliott Hill (CEO)',
          positioning: 'Global sportswear giant + 100% Asian OEM + $4.75B marketing engine',
          culture: '"Sport Offense" + massive athlete endorsements (10.2% of sales)',
          headcount: '~73,000 employees (2026 restructuring) · ~$636K Rev / emp',
          margins: 'FY26 Sales $46.4B · 42.9% GM · 8.3% EBIT Margin',
          verdict: 'Illustrates the risk of over-saturating classic franchises and heavy marketing tax vs. Birkenstock\'s zero-endorsement scarcity.',
          sourceLabel: 'Nike FY26 10-K',
          sourceUrl: 'https://dcfanalyst.com/blogs/overview/nke-overview'
        }
      ];

      var CHECKLIST_ZH = [
        { tag: '制造主权', title: '1. 核心部件自产测试：最核心的体验载体是否 100% 掌握在自有工厂？', desc: '对标勃肯 100% 德国自产软木乳胶鞋床与 >95% 德国总装，检验企业是否拥有第三方代工厂无法复制的工艺护城河。' },
        { tag: '70–80% 配货', title: '2. 工程化稀缺测试：管理层是否敢于拒绝 20%–30% 的短期批发订单？', desc: '核查品牌在顺风期是否克制铺货冲动，通过主动供给留白换取零售渠道 >90% 的全价销售率与零库存崩盘风险。' },
        { tag: '零代言税', title: '3. 自然口碑获客测试：不买天价明星代言能否维持高双位数内生增长？', desc: '检验品牌毛利率是否真正沉淀为 30%+ EBITDA 营业利润，而非被每年 10%–15% 的买量与代言费用吞噬。' },
        { tag: '反时尚长青', title: '4. 经典母体延展测试：核心单品能否跨越数十年不降价且拓展四季场景？', desc: '观察是否如 Arizona 到 Boston 闭口鞋（占比由 15% 升至 38%）一样，在同一功能母体上平滑切入高单价全季品类。' },
        { tag: '12–18月回本', title: '5. 直营门店单店经济测试：新开自营门店能否在 18 个月内收回投资？', desc: '对标勃肯单店 €40万–€80万 精益建店成本与 12–18 个月快速回本周期，警惕为撑门面而开设亏损旗舰店。' },
        { tag: '3.6双复购', title: '6. 物理转换成本测试：产品是否随使用时间推移变得“越来越贴合个人”？', desc: '核查产品是否具备类似软木鞋床随体温与足弓踩踏专属塑形的棘轮效应，驱动老客形成人均 3.6 双的收藏式复购。' }
      ];

      var CHECKLIST_EN = [
        { tag: 'Craft Sovereignty', title: '1. In-House Core Test: Is 100% of the core product anatomy built in owned plants?', desc: 'Benchmarked against Birkenstock\'s 100% German-made footbeds and >95% German assembly—preventing OEM commoditization.' },
        { tag: '70–80% Fill Rate', title: '2. Engineered Scarcity Test: Does leadership intentionally leave 20%–30% demand unfilled?', desc: 'Verify whether management resists over-shipping wholesale doors in boom years to protect >90% full-price realization.' },
        { tag: '€0 Endorsements', title: '3. Organic Word-of-Mouth Test: Can the brand compound at 15% cc without celebrity ad tax?', desc: 'Check whether ~59% gross margin flows through to >30% Adjusted EBITDA rather than leaking into 10%+ endorsement spend.' },
        { tag: 'De-Seasonality', title: '4. Timeless Silhouette Extension Test: Can one core footbed unlock 4-season higher-ASP shoes?', desc: 'Mirroring closed-toe expansion from 15% (FY21) to 38% (FY25) via Boston, Tokio, and Naples clogs/loafers.' },
        { tag: '12–18m Payback', title: '5. Retail Store Payback Test: Do new own-retail doors pay back CapEx within 12–18 months?', desc: 'Compare against Birkenstock\'s lean €400K–€800K store CapEx across 124 global doors rather than vanity flagships.' },
        { tag: '3.6 Pairs / Fan', title: '6. Biomechanical Lock-In Test: Does the product mold to the user and get better with age?', desc: 'Natural cork-latex molds uniquely to each wearer\'s foot arch, driving 3.6 pairs per US customer and decades-long loyalty.' }
      ];

      var QUICK_JUMP = [
        { sec: 'sec-00', title: '00 执行摘要与核心指标', sub: '€2,097M 营收 · >95% 德国总装 · 59.1% 毛利率 · Q3 33.7% EBITDA' },
        { sec: 'sec-01', title: '01 三大职能一统与德国垂直自造', sub: '终结38家家族公司迷宫 · 6大德国工厂 · 区域与渠道双视图图表' },
        { sec: 'sec-02', title: '02 四大文化支柱与五维竞争力雷达', sub: '解剖学鞋床 · 70–80%饥饿配货 · 零明星代言 · 对比爱马仕' },
        { sec: 'sec-03', title: '03 全球鞋履与顶奢巨头横向对比', sub: 'Birkenstock vs Hermès vs Deckers vs On Holding vs Nike' },
        { sec: 'sec-04', title: '04 稀缺红利、利润率与复利推演器', sub: 'FY21–FY26E EBITDA与毛利率 · 2026–2032 CMD 复利模拟器' },
        { sec: 'sec-05', title: '05 三幕百年演进与四大战役复盘', sub: '1774起源 · 2013一统 · 断供乱价平台 · 闭口鞋破局38%' },
        { sec: 'sec-06', title: '06 勃肯文化法则交互核查清单', sub: '6项长青品牌与制造主权自检（自动保存进度）' },
        { sec: 'sec-07', title: '07 数据来源与监管核验索引', sub: 'SEC Form 20-F / 6-K / F-1 · 2026 CMD · 标普评级报告' }
      ];

      var PRESETS = {
        p1: { principal: 10000, years: 6, priceCagr: 15.0, drip: true },
        p2: { principal: 10000, years: 12, priceCagr: 18.0, drip: false },
        p3: { principal: 10000, years: 5, priceCagr: 19.3, drip: true }
      };

      var state = {
        lang: 'zh',
        theme: 'dark',
        density: 'comfortable',
        ch1View: 'viewA',
        ch1Series: { s1: true, s2: true },
        epsSeries: { eps: true, oci: true },
        activePillar: 0,
        radarSeries: { birk: true, rms: true, oem: true },
        peerFilter: 'all',
        peerQuery: '',
        sim: { principal: 10000, years: 6, priceCagr: 15.0, drip: true, preset: 'p1' },
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

      function escapeHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }

      function highlightMatch(text, query) {
        var safe = escapeHtml(text);
        if (!query) return safe;
        var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
      }

      /* Theme, Density & Language */
      function applyTheme(t, silent) {
        state.theme = t === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        var ic = document.getElementById('appbarThemeIcon');
        if (ic) {
          ic.innerHTML = state.theme === 'dark'
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        }
        
        
        safeSet(STORAGE_THEME_KEY, state.theme);
        renderAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Mode' : '已切换至深色护眼外观') : (isEn() ? 'Switched to Light Mode' : '已切换至清晰浅色外观'));
      }

      function applyLanguage(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
        var en = isEn();
        document.documentElement.lang = en ? 'en' : 'zh-CN';
        document.getElementById('langZhBtn').classList.toggle('active', !en);
        document.getElementById('langEnBtn').classList.toggle('active', en);
        document.getElementById('langZhBtn').setAttribute('aria-pressed', String(!en));
        document.getElementById('langEnBtn').setAttribute('aria-pressed', String(en));

        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var v = nodes[i].getAttribute(en ? 'data-i18n-en' : 'data-i18n-zh');
          if (v !== null) {
            if (v.indexOf('<span') !== -1) nodes[i].innerHTML = v;
            else nodes[i].textContent = v;
          }
        }
        document.getElementById('pillarFocusNote').innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>';
        syncCh1Header();
        renderPeerTable();
        renderChecklist();
        updateSimulatorUI();
        renderAllCharts();
        safeSet(STORAGE_LANG_KEY, state.lang);
        if (!silent) showToast(en ? 'Switched to English Edition' : '已切换至中文深度研报');
      }

      function syncCh1Header() {
        var tEl = document.getElementById('ch1ChartTitle');
        var sEl = document.getElementById('ch1ChartSub');
        if (state.ch1View === 'viewA') {
          tEl.textContent = isEn()
            ? 'FY2024 vs. FY2025 Regional & Channel Net Revenue Synergy (€M · SEC Form 20-F)'
            : 'FY2024 vs FY2025 三大区域与双渠道营收协同增长（€M · SEC Form 20-F）';
          sEl.textContent = isEn()
            ? 'Engineered distribution drove broad double-digit growth: Americas €1,085.7M (+18% cc), EMEA €785.2M (+17% cc), APAC €221.8M (+34% cc)'
            : '工程化配额驱动全区域双位数增长：美洲 €1,085.7M (+18% cc)、EMEA €785.2M (+17% cc)、亚太 €221.8M (+34% cc)';
        } else {
          tEl.textContent = isEn()
            ? 'FY2021–FY2026E Revenue Scaling (€M) vs. Closed-Toe Revenue Share (%)'
            : 'FY2021–FY2026E 年度营收跃迁（€M）vs 闭口鞋去季节化占比跃升（%）';
          sEl.textContent = isEn()
            ? 'Closed-toe silhouettes (Boston/Tokio/Naples) surged from 15% (FY21) to ~40% (FY26E), lifting ASP and 4-season demand'
            : 'Boston / Naples 等闭口鞋占比从 FY21 的 15% 跃升至 ~40%，彻底打破夏季凉鞋单季宿命并推升双均价';
        }
      }

      function renderPeerTable() {
        var tbody = document.getElementById('peerTableBody');
        var badge = document.getElementById('peerCountBadge');
        var rows = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH;
        var q = state.peerQuery.trim().toLowerCase();
        var filtered = rows.filter(function (r, idx) {
          if (state.peerFilter !== 'all' && r.category !== state.peerFilter) return false;
          if (!q) return true;
          var hay = (PEER_ROWS_ZH[idx].company + ' ' + PEER_ROWS_ZH[idx].leader + ' ' + PEER_ROWS_ZH[idx].positioning + ' ' + PEER_ROWS_ZH[idx].culture + ' ' + PEER_ROWS_EN[idx].company + ' ' + PEER_ROWS_EN[idx].positioning).toLowerCase();
          return hay.indexOf(q) !== -1;
        });
        badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + rows.length + ' Peers') : ('显示 ' + filtered.length + ' / ' + rows.length + ' 家标杆企业');
        if (!filtered.length) {
          tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">' + (isEn() ? 'No matching peers found.' : '未找到匹配的对比企业，请尝试其他关键词。') + '</td></tr>';
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

      function formatEuro(val) {
        if (val >= 1000000) return '€' + (val / 1000000).toFixed(2) + 'M';
        return '€' + Math.round(val).toLocaleString('en-US');
      }

      function updateSimulatorUI() {
        var p = state.sim.principal;
        var yrs = state.sim.years;
        var cagr = state.sim.priceCagr;
        var boost = state.sim.drip ? 2.0 : 0.0;
        var totRate = (cagr + boost) / 100;

        var endVal = p * Math.pow(1 + totRate, yrs);
        var moic = endVal / p;
        var midY = Math.max(1, Math.floor(yrs / 2));
        var midVal = p * Math.pow(1 + totRate, midY);

        document.getElementById('simPrincipalLabel').textContent = '€' + Math.round(p).toLocaleString('en-US');
        document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
        document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
        document.getElementById('simEndingVal').textContent = formatEuro(endVal);
        document.getElementById('simMoicVal').textContent = moic.toFixed(2) + 'x · ' + (totRate * 100).toFixed(2) + '%';
        document.getElementById('simNetGainVal').textContent = formatEuro(endVal - p);
        document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midY + ' Midpoint') : ('第 ' + midY + ' 年中期资产节点');
        document.getElementById('simMidVal').textContent = formatEuro(midVal);

        var pBtns = document.querySelectorAll('[data-preset]');
        for (var i = 0; i < pBtns.length; i++) pBtns[i].classList.toggle('active', pBtns[i].getAttribute('data-preset') === state.sim.preset);
        drawSimChart();
      }

      function renderChecklist() {
        var container = document.getElementById('checklistContainer');
        var list = isEn() ? CHECKLIST_EN : CHECKLIST_ZH;
        var done = state.checks.filter(Boolean).length;
        var pct = Math.round((done / list.length) * 100);
        document.getElementById('checklistScoreChip').textContent = isEn() ? ('Verified ' + done + ' / ' + list.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + list.length + ' 项 (' + pct + '%)');
        document.getElementById('checklistProgressBar').style.width = pct + '%';
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
            '</div>' +
          '</label>';
        }).join('');
      }

      /* High-DPI Retina Canvas Engine */
      var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
      var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

      function getPalette() {
        var dark = state.theme === 'dark';
        return {
          isDark: dark,
          grid: dark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)',
          tick: dark ? '#94A3B8' : '#475569',
          text: dark ? '#F3F6F9' : '#0F1924',
          pillBg: dark ? 'rgba(9,13,22,0.90)' : 'rgba(255,255,255,0.95)',
          pillBorder: dark ? 'rgba(51,153,255,0.30)' : 'rgba(0,115,230,0.24)',
          trackBg: dark ? 'rgba(148,163,184,0.10)' : 'rgba(15,25,36,0.06)',
          hoverBand: dark ? 'rgba(51,153,255,0.07)' : 'rgba(0,115,230,0.05)',
          c1: dark ? '#3399FF' : '#0073E6',
          c2: dark ? '#22C55E' : '#16A34A',
          c3: dark ? '#FFB74D' : '#D97706',
          c4: dark ? '#A78BFA' : '#7C3AED'
        };
      }

      function prepareCanvas(id) {
        var canvas = document.getElementById(id);
        if (!canvas || !canvas.parentElement) return null;
        var rect = canvas.parentElement.getBoundingClientRect();
        var w = Math.max(250, Math.floor(rect.width));
        var h = Math.max(175, Math.floor(rect.height));
        var dpr = Math.min(window.devicePixelRatio || 1, 2.2);
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

      function drawBadge(ctx, txt, cx, cy, fg, pal) {
        ctx.save();
        ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
        var tw = ctx.measureText(txt).width + 9;
        ctx.fillStyle = pal.pillBg;
        roundRectPath(ctx, cx - tw / 2, cy - 8.5, tw, 17, 5);
        ctx.fill();
        ctx.strokeStyle = pal.pillBorder;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = fg;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(txt, cx, cy + 0.5);
        ctx.restore();
      }

      function drawCh1Chart() {
        var env = prepareCanvas('chartCh1');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartCh1 = [];
        var meta = document.getElementById('ch1AxisMeta');
        var l1 = document.getElementById('ch1Leg1'), l2 = document.getElementById('ch1Leg2');

        if (state.ch1View === 'viewA') {
          meta.innerHTML = '<span style="color:var(--chart-c1);">■ FY2024 (€M · Total €1,801.9M)</span><span style="color:var(--chart-c2);">■ FY2025 (€M · Total €2,097.4M)</span>';
          l1.textContent = isEn() ? 'FY2024 Segment Revenue (€M)' : 'FY2024 分部净营收 (€M)';
          l2.textContent = isEn() ? 'FY2025 Segment Revenue (€M)' : 'FY2025 分部净营收 (€M)';

          var pad = { top: 28, right: 18, bottom: 44, left: 52 };
          var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
          var labels = ['美洲 Americas', '欧洲 EMEA', '亚太 APAC', '批发 B2B', '直营 DTC'];
          var subs = ['+18% cc', '+17% cc', '+34% cc', '62% 权重', '38% 权重'];
          var fy24 = [946.0, 682.0, 170.0, 1106.0, 692.0];
          var fy25 = [1085.7, 785.2, 221.8, 1297.9, 794.8];
          var maxY = 1450;

          for (var g = 0; g <= 4; g++) {
            var gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
            ctx.fillText('€' + Math.round((maxY / 4) * g) + 'M', pad.left - 7, gy + 4);
          }

          var step = pw / labels.length;
          var bw = Math.min(34, Math.max(14, step * 0.27));
          for (var i = 0; i < labels.length; i++) {
            var cx = pad.left + step * (i + 0.5);
            if (hoverState.chartCh1 === i) {
              ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 8); ctx.fill();
            }
            var h1 = (fy24[i] / maxY) * ph, y1 = pad.top + ph - h1;
            var h2 = (fy25[i] / maxY) * ph, y2 = pad.top + ph - h2;
            if (state.ch1Series.s1) {
              var x1 = state.ch1Series.s2 ? (cx - bw - 3) : (cx - bw / 2);
              ctx.fillStyle = pal.c1; roundRectPath(ctx, x1, y1, bw, h1, 5); ctx.fill();
            }
            if (state.ch1Series.s2) {
              var x2 = state.ch1Series.s1 ? (cx + 3) : (cx - bw / 2);
              ctx.fillStyle = pal.c2; roundRectPath(ctx, x2, y2, bw, h2, 5); ctx.fill();
              drawBadge(ctx, '€' + Math.round(fy25[i]) + 'M', cx, Math.min(y1, y2) - 12, pal.c2, pal);
            }
            ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(labels[i], cx, pad.top + ph + 18);
            ctx.fillStyle = pal.c2; ctx.font = '600 10px "IBM Plex Mono", sans-serif';
            ctx.fillText(subs[i], cx, pad.top + ph + 33);
            hitRegions.chartCh1.push({
              idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
              html: '<strong>' + labels[i] + ' (SEC 20-F)</strong><br/>• FY2024: <strong>€' + fy24[i].toFixed(1) + 'M</strong><br/>• FY2025: <strong>€' + fy25[i].toFixed(1) + 'M</strong> (' + subs[i] + ')'
            });
          }
        } else {
          meta.innerHTML = '<span style="color:var(--chart-c1);">■ 左轴：集团年度总营收 (€M)</span><span style="color:var(--chart-c2);">● 右轴：闭口鞋占总营收比重 (%)</span>';
          l1.textContent = isEn() ? 'Annual Revenue (Left · €M)' : '集团年度营收 (左轴 · €M)';
          l2.textContent = isEn() ? 'Closed-Toe Share (Right · %)' : '闭口鞋营收占比 (右轴 · %)';

          var padB = { top: 28, right: 48, bottom: 38, left: 52 };
          var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26E'];
          var revM = [962.0, 1242.8, 1491.9, 1801.9, 2097.4, 2325.0];
          var closedPct = [15.0, 20.0, 26.0, 32.0, 38.0, 40.5];
          var maxRev = 2600, maxPct = 50;

          for (var j = 0; j <= 4; j++) {
            var r = j / 4, yg = padB.top + phB - r * phB;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yg); ctx.lineTo(padB.left + pwB, yg); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
            ctx.fillText('€' + Math.round(maxRev * r) + 'M', padB.left - 7, yg + 4);
            ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
            ctx.fillText(Math.round(maxPct * r) + '%', padB.left + pwB + 7, yg + 4);
          }

          var stepB = pwB / yrs.length, bwB = Math.min(38, stepB * 0.42), pts = [];
          for (var k = 0; k < yrs.length; k++) {
            var cxB = padB.left + stepB * (k + 0.5);
            if (state.ch1Series.s1) {
              var bhB = (revM[k] / maxRev) * phB, byB = padB.top + phB - bhB;
              ctx.fillStyle = pal.c1; roundRectPath(ctx, cxB - bwB / 2, byB, bwB, bhB, 5); ctx.fill();
            }
            var ly = padB.top + phB - (closedPct[k] / maxPct) * phB;
            pts.push({ x: cxB, y: ly, v: closedPct[k] });
            ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(yrs[k], cxB, padB.top + phB + 22);
            hitRegions.chartCh1.push({
              idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 28,
              html: '<strong>' + yrs[k] + '</strong><br/>• 年度总营收：<strong>€' + revM[k].toFixed(1) + 'M</strong><br/>• 闭口鞋占比：<strong>' + closedPct[k].toFixed(1) + '%</strong>'
            });
          }
          if (state.ch1Series.s2) {
            ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
            for (var m = 0; m < pts.length; m++) { if (m === 0) ctx.moveTo(pts[m].x, pts[m].y); else ctx.lineTo(pts[m].x, pts[m].y); }
            ctx.stroke();
            for (var n = 0; n < pts.length; n++) {
              ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 4.5, 0, Math.PI * 2); ctx.fill();
              drawBadge(ctx, pts[n].v.toFixed(0) + '%', pts[n].x, pts[n].y - 15, pal.c2, pal);
            }
          }
        }
      }

      function drawRadarChart() {
        var env = prepareCanvas('chartRadar');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartRadar = [];
        var axes = isEn()
          ? ['In-House Craft', 'Full-Price Power', 'Zero-Ad Organic', 'Silhouette Longevity', 'Mass Reach']
          : ['欧洲自造主权', '全价稀缺控盘', '零代言自然口碑', '单品跨周期寿命', '大众客群触达广度'];
        var mapAxis = [3, 0, 1, 2];
        var hi = hoverState.chartRadar >= 0 ? hoverState.chartRadar : mapAxis[state.activePillar];

        var series = [
          { key: 'birk', color: pal.c1, fill: 'rgba(51,153,255,0.22)', vals: [9.6, 9.3, 9.7, 9.8, 8.8] },
          { key: 'rms', color: pal.c2, fill: 'rgba(34,197,94,0.14)', vals: [9.9, 9.9, 9.5, 9.9, 4.8] },
          { key: 'oem', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [2.5, 5.6, 4.2, 5.4, 9.5] }
        ];
        var cx = w / 2, cy = h / 2 + 6, radius = Math.max(60, Math.min((w - 190) / 2, h * 0.35));
        for (var ring = 2; ring <= 10; ring += 2) {
          var r = (ring / 10) * radius;
          ctx.strokeStyle = pal.grid; ctx.beginPath();
          for (var i = 0; i < 5; i++) {
            var ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
            if (i === 0) ctx.moveTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
            else ctx.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
          }
          ctx.closePath(); ctx.stroke();
        }
        for (var a = 0; a < 5; a++) {
          var ag = -Math.PI / 2 + (a * 2 * Math.PI) / 5;
          var ax = cx + Math.cos(ag) * radius, ay = cy + Math.sin(ag) * radius;
          ctx.strokeStyle = a === hi ? pal.c1 : pal.grid; ctx.lineWidth = a === hi ? 1.8 : 1;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
          var lx = cx + Math.cos(ag) * (radius + 14), ly = cy + Math.sin(ag) * (radius + 14);
          ctx.fillStyle = a === hi ? pal.c1 : pal.text; ctx.font = (a === hi ? '800 ' : '600 ') + '11px system-ui, sans-serif';
          ctx.textAlign = Math.abs(Math.cos(ag)) < 0.2 ? 'center' : (Math.cos(ag) > 0 ? 'left' : 'right');
          ctx.textBaseline = 'middle'; ctx.fillText(axes[a], lx, ly);
          hitRegions.chartRadar.push({
            idx: a, x: Math.min(ax, lx) - 34, y: Math.min(ay, ly) - 20, w: 68 + Math.abs(lx - ax), h: 40,
            html: '<strong>' + axes[a] + '</strong><br/>• 勃肯 (BIRK): <strong>' + series[0].vals[a] + '</strong><br/>• 爱马仕 (Hermès): <strong>' + series[1].vals[a] + '</strong><br/>• 传统外包巨头: <strong>' + series[2].vals[a] + '</strong>'
          });
        }
        series.forEach(function (s) {
          if (!state.radarSeries[s.key]) return;
          ctx.beginPath();
          for (var idx = 0; idx < 5; idx++) {
            var th = -Math.PI / 2 + (idx * 2 * Math.PI) / 5, d = (s.vals[idx] / 10) * radius;
            if (idx === 0) ctx.moveTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d);
            else ctx.lineTo(cx + Math.cos(th) * d, cy + Math.sin(th) * d);
          }
          ctx.closePath(); ctx.fillStyle = s.fill; ctx.fill(); ctx.strokeStyle = s.color; ctx.lineWidth = 2.4; ctx.stroke();
        });
      }

      function drawHorizontalBars() {
        var env = prepareCanvas('chartBars');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartBars = [];
        var items = [
          { label: '核心软木乳胶鞋床德国本土制造率 (Footbed Made in Germany)', val: 100.0, col: pal.c2, sub: 'Sankt Katharinen / Görlitz / Pasewalk' },
          { label: '整鞋总装德国自有工厂完成率 (Final Assembly in Germany)', val: 95.0, col: pal.c1, sub: '6 座德国自有工厂端到端把控' },
          { label: '全渠道终端正价实现率 (Full-Price Realization Rate)', val: 90.0, col: pal.c2, sub: '批发仅满足 70%–80% 订单消除打折' },
          { label: 'FY2025 / Q3 FY2026 集团综合毛利率 (Gross Margin)', val: 59.1, col: pal.c4, sub: '长期战略锚定 ~60% 奢品级毛利线' },
          { label: 'FY2025 闭口鞋品类营收占比 (Closed-Toe Footwear Share)', val: 38.0, col: pal.c3, sub: '较 FY2021 (15%) 翻逾 2.5 倍抹平季节性' },
          { label: 'Q3 FY2026 调整后 EBITDA 利润率 (Adj. EBITDA Margin)', val: 33.7, col: pal.c1, sub: '€242.5M / €719.5M 零明星代言费转化' }
        ];
        var pad = { top: 10, right: 18, bottom: 26, left: 18 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, rowH = ph / items.length;

        var targetX = pad.left + 0.55 * pw;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3;
        ctx.beginPath(); ctx.moveTo(targetX, pad.top); ctx.lineTo(targetX, pad.top + ph); ctx.stroke(); ctx.restore();

        for (var i = 0; i < items.length; i++) {
          var rt = pad.top + rowH * i;
          var ly = rt + rowH * 0.35, by = rt + rowH * 0.52, bh = 13, bw = (items[i].val / 100) * pw;
          ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left';
          ctx.fillText(items[i].label, pad.left, ly);
          ctx.fillStyle = items[i].col; ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText((i === 1 || i === 2 ? '>' : '') + items[i].val.toFixed(1) + '%', pad.left + pw, ly);
          ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, by, pw, bh, 6); ctx.fill();
          ctx.fillStyle = items[i].col; roundRectPath(ctx, pad.left, by, bw, bh, 6); ctx.fill();
          hitRegions.chartBars.push({
            idx: i, x: pad.left, y: rt, w: pw, h: rowH,
            html: '<strong>' + items[i].label + ': ' + items[i].val.toFixed(1) + '%</strong><br/>• 核验说明：' + items[i].sub
          });
        }
      }

      function drawEpsComboChart() {
        var env = prepareCanvas('chartEps');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hitRegions.chartEps = [];
        var yrs = ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026E'];
        var ebitda = [305.0, 434.6, 482.5, 555.0, 667.0, 715.0];
        var gm = [57.0, 60.3, 62.1, 58.8, 59.1, 57.5];
        var pad = { top: 26, right: 50, bottom: 38, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var maxE = 800, minG = 50, maxG = 65;

        for (var g = 0; g <= 4; g++) {
          var r = g / 4, gy = pad.top + ph - r * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText('€' + Math.round(maxE * r) + 'M', pad.left - 7, gy + 4);
          ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
          ctx.fillText((minG + r * (maxG - minG)).toFixed(1) + '%', pad.left + pw + 7, gy + 4);
        }

        var step = pw / yrs.length, bw = Math.min(40, step * 0.42), pts = [];
        for (var i = 0; i < yrs.length; i++) {
          var cx = pad.left + step * (i + 0.5);
          if (state.epsSeries.eps) {
            var bh = (ebitda[i] / maxE) * ph, by = pad.top + ph - bh;
            ctx.fillStyle = i === 5 ? '#38BDF8' : pal.c1;
            roundRectPath(ctx, cx - bw / 2, by, bw, bh, 6); ctx.fill();
            ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('€' + Math.round(ebitda[i]), cx, by + 16);
          }
          var oy = pad.top + ph - ((gm[i] - minG) / (maxG - minG)) * ph;
          pts.push({ x: cx, y: oy, v: gm[i] });
          ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(yrs[i], cx, pad.top + ph + 20);
          hitRegions.chartEps.push({
            idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 28,
            html: '<strong>' + yrs[i] + '</strong><br/>• Adj. EBITDA: <strong>€' + ebitda[i].toFixed(1) + 'M</strong><br/>• 综合毛利率 (Adj.): <strong>' + gm[i].toFixed(1) + '%</strong>'
          });
        }
        if (state.epsSeries.oci) {
          ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
          pts.forEach(function (p, idx) { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
          ctx.stroke();
          pts.forEach(function (p) {
            ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(p.x, p.y, 4.2, 0, Math.PI * 2); ctx.fill();
            drawBadge(ctx, p.v.toFixed(1) + '%', p.x, p.y - 15, pal.c2, pal);
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
        var pad = { top: 18, right: 18, bottom: 26, left: 56 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        for (var g = 0; g <= 3; g++) {
          var gy = pad.top + ph - (g / 3) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText('€' + Math.round(((maxV / 3) * g) / 1000) + 'k', pad.left - 6, gy + 4);
        }
        var stepX = pw / yrs;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
        for (var i = 0; i <= yrs; i++) {
          var bx = pad.left + stepX * i, by = pad.top + ph - (baseS[i] / maxV) * ph;
          if (i === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
        }
        ctx.stroke(); ctx.restore();

        ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
        for (var k = 0; k <= yrs; k++) {
          var tx = pad.left + stepX * k, ty = pad.top + ph - (totS[k] / maxV) * ph;
          if (k === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
          if (k === 0 || k === Math.floor(yrs / 2) || k === yrs) {
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('Y' + k, tx, pad.top + ph + 17);
          }
          hitRegions.chartSim.push({
            idx: k, x: tx - stepX / 2, y: pad.top, w: Math.max(10, stepX), h: ph + 20,
            html: '<strong>第 ' + k + ' 年推演对比</strong><br/>• 含回购与去杠杆：<strong>' + formatEuro(totS[k]) + '</strong><br/>• 仅内生增长：<strong>' + formatEuro(baseS[k]) + '</strong>'
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

      function wireTooltip(id) {
        var c = document.getElementById(id), tip = document.getElementById('chartTooltip');
        if (!c || !tip) return;
        c.addEventListener('mousemove', function (e) {
          var rect = c.getBoundingClientRect();
          var x = e.clientX - rect.left, y = e.clientY - rect.top;
          var list = hitRegions[id] || [], hit = null;
          for (var i = 0; i < list.length; i++) {
            var r = list[i];
            if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { hit = r; break; }
          }
          hoverState[id] = hit ? hit.idx : -1;
          if (hit) {
            tip.innerHTML = hit.html;
            tip.style.display = 'block';
            tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
            tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
          } else {
            tip.style.display = 'none';
          }
        });
        c.addEventListener('mouseleave', function () { hoverState[id] = -1; tip.style.display = 'none'; });
      }

      

      function init() {
        var st = (safeGet(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
        var sl = (safeGet(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
        var sd = safeGet(STORAGE_DENSITY_KEY) || 'comfortable';
        document.body.setAttribute('data-density', sd);

        var sc = safeGet(STORAGE_CHECK_KEY);
        if (sc) {
          try {
            var arr = JSON.parse(sc);
            if (Array.isArray(arr) && arr.length === 6) state.checks = arr.map(Boolean);
          } catch (e) {}
        }

        applyTheme(st, true);
        applyLanguage(sl, true);

        document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
          if (window.innerWidth <= 1080) document.body.classList.toggle('drawer-open');
          else {
            var cur = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
            if (cur) document.documentElement.removeAttribute('data-sidebar-collapsed');
            else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
            safeSet('mui_portal_sidebar_collapsed_v1', cur ? '0' : '1');
            setTimeout(renderAllCharts, 60);
          }
        });
        document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });

        

        document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
        document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
        document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
        
        
        
        

        /* Subfolder hub category pills & companion notice (zero auto-scroll) */
        var hub = document.getElementById('companySubfolderHub');
        hub.addEventListener('click', function (e) {
          var catBtn = e.target.closest('[data-co-cat]');
          if (catBtn) {
            var cat = catBtn.getAttribute('data-co-cat');
            var pills = hub.querySelectorAll('[data-co-cat]');
            for (var i = 0; i < pills.length; i++) pills[i].classList.toggle('active', pills[i] === catBtn);
            var items = hub.querySelectorAll('[data-co-item-cat]');
            for (var j = 0; j < items.length; j++) items[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || items[j].getAttribute('data-co-item-cat') === cat));
            return;
          }
          var jumpBtn = e.target.closest('[data-suite-jump]');
          if (jumpBtn) {
            var target = jumpBtn.getAttribute('data-suite-jump');
            if (target === 'current') window.scrollTo({ top: 0, behavior: 'smooth' });
            else showToast('配套网页《' + target + '》已同步生成供下载');
          }
        });

        /* Quick Jump ⌘K */
        var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
        function renderJump(kw) {
          var q = (kw || '').trim().toLowerCase();
          var list = QUICK_JUMP.filter(function (it) { return !q || (it.title + ' ' + it.sub).toLowerCase().indexOf(q) !== -1; });
          qPop.innerHTML = list.map(function (it) {
            return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
          }).join('');
          qPop.classList.add('open');
        }
        qIn.addEventListener('focus', function () { renderJump(qIn.value); });
        qIn.addEventListener('input', function () { renderJump(qIn.value); });
        qPop.addEventListener('click', function (e) {
          var b = e.target.closest('[data-jump-sec]');
          if (!b) return;
          var el = document.getElementById(b.getAttribute('data-jump-sec'));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          qPop.classList.remove('open');
        });
        document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
        document.addEventListener('keydown', function (e) {
          if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
        });

        /* Ch1 Tabs, Collapses, Pillars, Radar Pills */
        document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.ch1View = this.getAttribute('data-ch1-view');
            document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
            document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
            syncCh1Header();
            drawCh1Chart();
          });
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
            this.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
          });
        });
        var pCards = document.querySelectorAll('[data-pillar]');
        pCards.forEach(function (card) {
          card.addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
            state.activePillar = idx;
            pCards.forEach(function (c, k) { c.classList.toggle('active', k === idx); });
            document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[idx] + '</div>';
            drawRadarChart();
          });
        });
        document.querySelectorAll('[data-radar-key]').forEach(function (pill) {
          pill.addEventListener('click', function () {
            var k = this.getAttribute('data-radar-key');
            state.radarSeries[k] = !state.radarSeries[k];
            if (!state.radarSeries.birk && !state.radarSeries.rms && !state.radarSeries.oem) state.radarSeries[k] = true;
            this.classList.toggle('muted', !state.radarSeries[k]);
            drawRadarChart();
          });
        });

        /* Peer Table & Simulator */
        document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
        var pfBtns = document.querySelectorAll('[data-peer-filter]');
        pfBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.peerFilter = this.getAttribute('data-peer-filter');
            pfBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
            renderPeerTable();
          });
        });

        var pSl = document.getElementById('simPrincipalSlider'), ySl = document.getElementById('simYearsSlider'), cSl = document.getElementById('simCagrSlider'), dTg = document.getElementById('simDripToggle');
        pSl.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 10000; state.sim.preset = ''; updateSimulatorUI(); });
        ySl.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 6; state.sim.preset = ''; updateSimulatorUI(); });
        cSl.addEventListener('input', function () { state.sim.priceCagr = parseFloat(this.value) || 15; state.sim.preset = ''; updateSimulatorUI(); });
        dTg.addEventListener('change', function () { state.sim.drip = !!this.checked; updateSimulatorUI(); });
        document.querySelectorAll('[data-preset]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var k = this.getAttribute('data-preset'), cfg = PRESETS[k];
            if (!cfg) return;
            state.sim = { principal: cfg.principal, years: cfg.years, priceCagr: cfg.priceCagr, drip: cfg.drip, preset: k };
            pSl.value = String(cfg.principal); ySl.value = String(cfg.years); cSl.value = String(cfg.priceCagr); dTg.checked = cfg.drip;
            updateSimulatorUI();
          });
        });

        /* Checklist */
        document.getElementById('checklistContainer').addEventListener('change', function (e) {
          var inp = e.target.closest('[data-check-input]');
          if (!inp) return;
          state.checks[parseInt(inp.getAttribute('data-check-input'), 10)] = !!inp.checked;
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
          renderChecklist();
        });
        document.getElementById('checkAllBtn').addEventListener('click', function () {
          state.checks = [true, true, true, true, true, true];
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
          renderChecklist();
          showToast('已勾选全部 6 项勃肯文化核查指标');
        });
        document.getElementById('resetCheckBtn').addEventListener('click', function () {
          state.checks = [true, true, true, false, false, false];
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
          renderChecklist();
          showToast('核查清单已重置');
        });

        /* Scroll Progress & TOC Spy */
        var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
        tocLinks.forEach(function (l) { l.addEventListener('click', function () { document.body.classList.remove('drawer-open'); }); });
        window.addEventListener('scroll', function () {
          var maxS = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, (window.scrollY / maxS) * 100)) + '%';
        }, { passive: true });

        if ('IntersectionObserver' in window) {
          var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) {
                tocLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-sec') === en.target.id); });
              }
            });
          }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
          for (var s = 0; s <= 7; s++) { var nd = document.getElementById('sec-0' + s); if (nd) obs.observe(nd); }
        }

        ['chartCh1', 'chartRadar', 'chartBars', 'chartEps', 'chartSim'].forEach(wireTooltip);
        var rt = null;
        window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 70); });
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    })();
  