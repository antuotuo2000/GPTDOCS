
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_DENSITY_KEY = 'mui_clarity_density_v1';
      var STORAGE_CHECK_KEY = 'mui_rblx_culture_checks_v1';

      var PILLAR_NOTES_ZH = [
        '<strong>当前选中支柱解读（01 尊重社区）：</strong>FY2025 Top 1,000 创作者平均年收入达 <strong>$130 万美元（同比大增 +50%+）</strong>，自 2013 年推出 DevEx 以来累计向全球开发者支付超 <strong>$50 亿美元</strong>，将外部创作者培育成繁荣的原生游戏创业生态 <a class="cite-link" href="https://about.roblox.com/newsroom/2024/04/roblox-values-principles" target="_blank" rel="noopener noreferrer">Roblox Values ↗</a>。',
        '<strong>当前选中支柱解读（02 勇担全责）：</strong>在首席安全官 Matt Kaufman 带领下，公司不仅部署 RM3 实时多模态场景审核与 BAM 违规装扮识别，更于 2026 年初完成全球通信强制年龄核验上线，Q3 末全球日活核验率已达 <strong>64%（美英 75%、澳洲 80%）</strong> <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3\'26 股东信 ↗</a>。',
        '<strong>当前选中支柱解读（03 秉持远见）：</strong>创始人 David Baszucki 拒绝短期迎合资本市场线性指引预期，宣布 2027 年起不再提供全年财务指引，持续重仓 Cube 4D 基础世界模型、Roblox Everywhere 与第三座核心数据中心 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q4\'25 股东信 ↗</a>。',
        '<strong>当前选中支柱解读（04 务实笃行）：</strong>自治 Builder 产品组在 2026 年密集交付手机端自然语言建游工具 Build（50万+内测用户发布 7万+游戏）、Roblox Plus 订阅（数百万订户贡献 7 倍消费）与 Chrome 免安装秒玩 <a class="cite-link" href="https://about.roblox.com/newsroom/2026/09/rdc-2026-the-world-needs-more-play" target="_blank" rel="noopener noreferrer">RDC 2026 ↗</a>。'
      ];

      var PILLAR_NOTES_EN = [
        '<strong>Selected Pillar (01 · Respect the Community):</strong> Top 1,000 creators averaged <strong>$1.3M</strong> in FY2025 (+50%+ YoY) and cumulative DevEx payouts topped <strong>$5B+</strong> since 2013—prioritizing creator economics before short-term corporate margin <a class="cite-link" href="https://about.roblox.com/newsroom/2024/04/roblox-values-principles" target="_blank" rel="noopener noreferrer">Roblox Values ↗</a>.',
        '<strong>Selected Pillar (02 · We Are Responsible):</strong> Led by CSO Matt Kaufman, Roblox deployed RM3 real-time multimodal scene moderation and global mandatory age-checks for chat—reaching <strong>64% of global DAUs (75% US/UK, 80% Australia)</strong> by Q3\'26 <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q3\'26 Letter ↗</a>.',
        '<strong>Selected Pillar (03 · Take the Long View):</strong> Backed by 20-vote Class B founder governance, management announced 2026 is the final year of annual guidance, focusing capital on Cube 4D models, Roblox Everywhere, and a 3rd core data center <a class="cite-link" href="https://s27.q4cdn.com/984876518/files/doc_financials/2025/q4/Q4-2025-Shareholder-Letter.pdf" target="_blank" rel="noopener noreferrer">Q4\'25 Letter ↗</a>.',
        '<strong>Selected Pillar (04 · Get Stuff Done):</strong> Autonomous Builder groups shipped Build prompt-to-game (500K+ alpha users, 70K+ games), Roblox Plus (2x hours, 7x Robux spend), and zero-install Chrome WebAssembly play in 2026 <a class="cite-link" href="https://about.roblox.com/newsroom/2026/09/rdc-2026-the-world-needs-more-play" target="_blank" rel="noopener noreferrer">RDC 2026 ↗</a>.'
      ];

      var PEER_ROWS_ZH = [
        {
          category: 'platform',
          benchmark: true,
          company: '研究基准：罗布乐思 (Roblox · RBLX)',
          leader: 'David Baszucki (创始人 / 63.1% 投票权)',
          positioning: '零第一方工作室 + 自治 Builder 产品组 + 云游戏 OS',
          culture: '社区优先排序算法 + 强制年龄核验安全底座 + 圣马特奥混合办公',
          headcount: '3,065人 · 人均预订额 $2.21M (营收 $1.60M)',
          margins: 'FY25 预订额 $6.79B · GAAP营收 $4.89B · FCF $1.35B',
          verdict: '零自研爆款资本开支，靠数百万社区创作者与 27 个月递延预收浮存池（$7.04B）实现超高人效与强劲自由现金流。',
          sourceLabel: 'FY25 10-K / Q3\'26',
          sourceUrl: 'https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf'
        },
        {
          category: 'platform',
          benchmark: false,
          company: '任天堂 (Nintendo · 7974.T)',
          leader: '古川俊太郎 / 宫本茂',
          positioning: '京都本部软硬一体集权研发 (EPD) + 顶级第一方 IP 圣殿',
          culture: '“枯萎技术的水平思考” + 14.6年超长司龄匠人传承 + 零裁员传统',
          headcount: '8,666人 (母公司3,084人) · 人均营收 ~$1.68M',
          margins: 'FY26 营收 ¥2.31万亿 (~$14.6B) · 营业利润 ¥3,601亿',
          verdict: '第一方精品极境（Switch 2 首年狂销 1,986万台），但严控外部 UGC 自由度；Roblox 则完全走向无边界社区共创。',
          sourceLabel: 'Nintendo FY26 / SQ',
          sourceUrl: 'https://sqmagazine.co.uk/how-many-people-work-at-nintendo/'
        },
        {
          category: 'studio',
          benchmark: false,
          company: '艺电 (Electronic Arts · EA)',
          leader: 'Andrew Wilson',
          positioning: '两大业务集团 (EA Sports / EA Entertainment) 多工作室矩阵',
          culture: '体育年货牌照护城河 + 实时服务微交易运营 + 事业部 P&L 考核',
          headcount: '14,600人 · 人均营收 ~$0.52M',
          margins: 'FY26 营收 $7.53B · 营业利润 $1.16B · 净利 $887M',
          verdict: '体育长青树现金流稳健，但需养活逾 1.4 万名研发与美术人员，人均产出不足 Roblox 人均预订额的四分之一。',
          sourceLabel: 'EA FY26 Financials',
          sourceUrl: 'https://bullfincher.io/companies/electronic-arts/financial-statements'
        },
        {
          category: 'studio',
          benchmark: false,
          company: 'Take-Two Interactive (TTWO)',
          leader: 'Strauss Zelnick',
          positioning: '控股分权联邦 (Rockstar / 2K / Zynga 独立厂牌自治)',
          culture: '顶级创意厂牌高度自治 + 十年磨一剑超级大作 (GTA VI) 豪赌',
          headcount: '12,909人 · 人均预订额 ~$0.52M',
          margins: 'FY26 营收 $6.66B · 预订额 $6.72B · GAAP净亏 $(298)M',
          verdict: '与 Roblox 预订额体量几乎持平（~$6.7B vs $6.8B），但 TTWO 员工数是 Roblox 的 4.2 倍且高度依赖超级单品档期。',
          sourceLabel: 'TTWO FY26 / 10-K',
          sourceUrl: 'https://bullfincher.io/companies/take-two-interactive-software/revenue'
        },
        {
          category: 'studio',
          benchmark: false,
          company: 'Unity Software (NYSE: U)',
          leader: 'Matthew Bromberg',
          positioning: 'Create 引擎工具订阅 (33.6%) + Grow 广告变现网络 (66.4%)',
          culture: '纯 B2B 开发者中立工具链 + 跨平台分发解耦模式',
          headcount: '~4,400人 · 人均营收 $0.42M',
          margins: 'FY25 营收 $1.85B (+2.0%) · 毛利率 74.2%',
          verdict: '只卖铲子不控流量与货币，曾因 Runtime 按安装收费风波损伤信任；Roblox 垂直整合了引擎、云托管、社交图谱与钱包。',
          sourceLabel: 'Unity FY25 Profile',
          sourceUrl: 'https://bullfincher.io/companies/unity-software/overview'
        }
      ];

      var PEER_ROWS_EN = [
        {
          category: 'platform',
          benchmark: true,
          company: 'Benchmark: Roblox Corp. (RBLX)',
          leader: 'David Baszucki (Founder / 63.1% Vote)',
          positioning: 'Zero 1P Studios + Autonomous Builder Groups + Cloud Gaming OS',
          culture: 'Community-first algorithm + mandatory age-check safety + San Mateo hybrid',
          headcount: '3,065 FTE · $2.21M Bookings/FTE ($1.60M Rev)',
          margins: 'FY25 Bkgs $6.79B · GAAP Rev $4.89B · FCF $1.35B',
          verdict: 'Zero 1P hit CapEx; leverages millions of UGC creators and a $7.04B deferred revenue float to achieve 3–4x peer productivity.',
          sourceLabel: 'FY25 10-K / Q3\'26',
          sourceUrl: 'https://s27.q4cdn.com/984876518/files/content_files/Q3-2026-Earnings-Shareholder-Letter.pdf'
        },
        {
          category: 'platform',
          benchmark: false,
          company: 'Nintendo (7974.T / NTDOY)',
          leader: 'Shuntaro Furukawa / Shigeru Miyamoto',
          positioning: 'Centralized Kyoto hardware-software EPD guild + iconic 1P IP',
          culture: 'Lateral thinking with withered tech + 14.6-yr average tenure craft',
          headcount: '8,666 FTE (3,084 parent) · ~$1.68M Rev/FTE',
          margins: 'FY26 Sales ¥2.31T (~$14.6B) · Op Profit ¥360.1B',
          verdict: 'Pinnacle of curated 1P IP (19.86M Switch 2 units by Mar 2026), whereas Roblox cedes 100% of game creation to its community.',
          sourceLabel: 'Nintendo FY26 / SQ',
          sourceUrl: 'https://sqmagazine.co.uk/how-many-people-work-at-nintendo/'
        },
        {
          category: 'studio',
          benchmark: false,
          company: 'Electronic Arts (EA)',
          leader: 'Andrew Wilson',
          positioning: 'Dual-pillar studio matrix (EA Sports / EA Entertainment)',
          culture: 'Licensed sports franchises + live-service Ultimate Team P&Ls',
          headcount: '14,600 FTE · ~$0.52M Rev/FTE',
          margins: 'FY26 Rev $7.53B · Op Inc $1.16B · Net Inc $887M',
          verdict: 'Durable sports moat, but carries 4.8x Roblox\'s headcount to produce content internally.',
          sourceLabel: 'EA FY26 Financials',
          sourceUrl: 'https://bullfincher.io/companies/electronic-arts/financial-statements'
        },
        {
          category: 'studio',
          benchmark: false,
          company: 'Take-Two Interactive (TTWO)',
          leader: 'Strauss Zelnick',
          positioning: 'Decentralized creative label federation (Rockstar / 2K / Zynga)',
          culture: 'Autonomous auteur labels + multi-hundred-million blockbuster bets',
          headcount: '12,909 FTE · ~$0.52M Bookings/FTE',
          margins: 'FY26 Rev $6.66B · Bkgs $6.72B · Net Loss $(298)M',
          verdict: 'Nearly identical bookings scale (~$6.7B vs $6.8B), yet TTWO employs 4.2x more staff and bears massive release-slate cyclicality.',
          sourceLabel: 'TTWO FY26 / 10-K',
          sourceUrl: 'https://bullfincher.io/companies/take-two-interactive-software/revenue'
        },
        {
          category: 'studio',
          benchmark: false,
          company: 'Unity Software (NYSE: U)',
          leader: 'Matthew Bromberg',
          positioning: 'Create SaaS Engine (33.6%) + Grow Ad Network (66.4%)',
          culture: 'Unbundled B2B developer toolchain across mobile/PC platforms',
          headcount: '~4,400 FTE · $0.42M Rev/FTE',
          margins: 'FY25 Rev $1.85B (+2.0%) · 74.2% Gross Margin',
          verdict: 'Provides engine tools without owning the consumer social graph, hosting cloud, or unified Robux currency.',
          sourceLabel: 'Unity FY25 Profile',
          sourceUrl: 'https://bullfincher.io/companies/unity-software/overview'
        }
      ];

      var CHECKLIST_ITEMS_ZH = [
        {
          tag: '平台中立铁律',
          title: '1. 零自营争利测试：平台是否始终拒绝组建第一方工作室与创作者抢流量？',
          desc: '核查首页 RFY 推荐位与 Moments 流量池是否完全依据留存率与拉新贡献公平分配，杜绝官方自研内容特权。'
        },
        {
          tag: 'DevEx 飞轮健康度',
          title: '2. 创作者致富效应测试：腰部与头部开发者收入是否持续跑赢平台固定费用？',
          desc: '跟踪 Top 1,000 开发者均收（$130万+）与 Top 10 以外长尾体验消费增速，确保 $0.0054 成人高费率持续吸引外部专业团队。'
        },
        {
          tag: '安全护栏渗透',
          title: '3. 强制年龄核验与多模态防线测试：合规摩擦后日活与社交频次是否如期反弹？',
          desc: '检验全球年龄核验率（Q3\'26 达 64%）提升后，跨年龄段隔离匹配、RM3 实时场景审核与州检察长诉讼风险是否有效收敛。'
        },
        {
          tag: 'O18 成人破圈',
          title: '4. 18岁以上高价值客群测试：O18 占比与新锐硬核品类（射击/RPG/体育）是否持续扩张？',
          desc: '跟踪美国核验 O18 占比（已升至 37%）及其 +50% 单客变现溢价能否顺利带动激励视频广告与品牌电商放量。'
        },
        {
          tag: '混合云与直充杠杆',
          title: '5. 渠道脱媒与 AI 算力成本测试：COR 费率与单小时服务成本（CtS）是否稳步下行？',
          desc: '观察网页端/预付卡直充占比提升（Q3\'26 COR 降至 20%）与 77% 自托管 AI 裸金属集群能否对冲 AI 生成调用激增。'
        },
        {
          tag: 'SBC 稀释约束',
          title: '6. 股东自由现金流归属测试：股票回购是否有效遏制每年逾 $11亿 的 SBC 股本稀释？',
          desc: '核查 $30亿 回购计划执行力度（Q3\'26 回购 $2亿）能否将完全稀释股本年增速压制在 1%–2% 以内并最终实现净缩股。'
        }
      ];

      var CHECKLIST_ITEMS_EN = [
        {
          tag: 'Platform Neutrality',
          title: '1. Zero-1P Conflict Test: Does Roblox strictly avoid building internal studios competing with creators?',
          desc: 'Verify that RFY homepage and Moments impressions allocate purely on 28-day retention and new-user acquisition merit.'
        },
        {
          tag: 'DevEx Flywheel',
          title: '2. Creator Wealth Test: Are top-1,000 ($1.3M avg) and long-tail creator earnings compounding?',
          desc: 'Track whether the $0.0038 base and $0.0054 U.S. O18 DevEx rates attract veteran external studios onto the platform.'
        },
        {
          tag: 'Safety Architecture',
          title: '3. Age-Check & RM3 Safety Test: Does engagement re-accelerate cleanly post age-verification?',
          desc: 'Monitor global age-check penetration (64% in Q3\'26), RM3 multimodal moderation, and resolution of state AG youth-safety litigation.'
        },
        {
          tag: 'O18 Expansion',
          title: '4. Adult Cohort Test: Is O18 DAU share (37% in U.S.) and Novel genre adoption expanding?',
          desc: 'Verify whether Shooters/RPG/Sports titles powered by Server Authority unlock the +50% O18 monetization premium and video ads.'
        },
        {
          tag: 'Infra & Direct Pay',
          title: '5. App-Store Steering & AI Cost Test: Are Cost of Revenue (20%) and CtS trending lower?',
          desc: 'Assess first-party web/prepaid Robux checkout adoption and 77% self-hosted bare-metal AI inference efficiency.'
        },
        {
          tag: 'SBC Discipline',
          title: '6. Per-Share FCF Test: Are share buybacks offsetting ~$1.13B annual stock-based compensation?',
          desc: 'Check whether the $3.0B repurchase authorization ($200M executed in Q3\'26) caps diluted share growth below 2%.'
        }
      ];

      var QUICK_JUMP_ITEMS = [
        { sec: 'sec-00', zh: '00 执行摘要与核心指标', en: '00 Executive Summary & KPIs', sub: '$6.79B 预订额 · 3,065员工 · $1.35B FCF' },
        { sec: 'sec-01', zh: '01 云游戏OS与自治产品组', en: '01 Cloud OS & Product Groups', sub: '零第一方工作室 · Build AI · 人效双视图图表' },
        { sec: 'sec-02', zh: '02 四大价值观算法与护城河', en: '02 4 Core Values & Safety Moat', sub: '社区优先 · 64%强制年龄核验 · 五维雷达图' },
        { sec: 'sec-03', zh: '03 全球游戏巨头文化横向对比', en: '03 Global Gaming Peer Matrix', sub: 'Roblox vs 任天堂 / EA / Take-Two / Unity' },
        { sec: 'sec-04', zh: '04 创作者飞轮与递延浮存复利', en: '04 Creator Flywheel & Float', sub: '$7.04B 递延收入池 · FCF 复利推演器' },
        { sec: 'sec-05', zh: '05 三代演进与四大治理战役', en: '05 3-Era Evolution & Battles', sub: '年龄核验断腕 · O18溢价分成 · 终结年度指引' },
        { sec: 'sec-06', zh: '06 Builder 文化法则核查清单', en: '06 Builder Diagnostic Checklist', sub: '6 项双边生态健康度本地持久化自检' },
        { sec: 'sec-07', zh: '07 数据来源与监管核验索引', en: '07 Primary Filings & Sources', sub: 'SEC 10-K/DEF 14A · Q3 2026 股东信 · RDC 2026' }
      ];

      var PRESETS = {
        p1: { principal: 1350, years: 6, cagr: 20.0, boost: true },
        p2: { principal: 641, years: 3, cagr: 33.2, boost: false },
        p3: { principal: 1350, years: 6, cagr: 12.5, boost: true }
      };

      var state = {
        lang: 'zh',
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
        density: 'comfortable',
        ch1View: 'viewA',
        ch1Series: { s1: true, s2: true },
        activePillar: 0,
        radarSeries: { rblx: true, ntdoy: true, aaa: true },
        peerFilter: 'all',
        peerQuery: '',
        epsSeries: { fcf: true, bkgs: true },
        sim: { principal: 1350, years: 6, cagr: 20.0, boost: true, preset: 'p1' },
        checks: [true, true, true, false, false, false]
      };

      var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
      var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

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
        var q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return safe.replace(new RegExp('(' + q + ')', 'gi'), '<mark class="hl">$1</mark>');
      }

      function applyTheme(theme, silent) {
        state.theme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        var ic = document.getElementById('appbarThemeIcon');
        if (ic) {
          ic.innerHTML = state.theme === 'dark'
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        }
        
        
        safeSet(STORAGE_THEME_KEY, state.theme);
        renderAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Switched to Dark Mode' : '已切换至深空暗色护眼模式') : (isEn() ? 'Switched to Light Mode' : '已切换至清晰浅色阅读模式'));
      }

      function applyDensity(density, silent) {
        state.density = density === 'compact' ? 'compact' : 'comfortable';
        document.body.setAttribute('data-density', state.density);
        var btn = document.getElementById('densityToggleBtn');
        if (btn) {
          btn.textContent = isEn()
            ? (state.density === 'compact' ? 'Compact' : 'Comfort')
            : (state.density === 'compact' ? '紧凑视图' : '舒适排版');
        }
        safeSet(STORAGE_DENSITY_KEY, state.density);
        setTimeout(renderAllCharts, 40);
        if (!silent) showToast(state.density === 'compact' ? '已切换至高密度紧凑视图' : '已切换至舒适阅读排版');
      }

      function applyLanguage(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
        var en = isEn();
        document.documentElement.lang = en ? 'en' : 'zh-CN';
        document.title = en
          ? 'Roblox Corporation (RBLX) Corporate Culture & Organizational Architecture Deep Dive | Research Hub'
          : '罗布乐思 Roblox Corporation (RBLX) 企业文化与组织架构深度研究报告 | 数据中心';

        document.getElementById('langZhBtn').classList.toggle('active', !en);
        document.getElementById('langEnBtn').classList.toggle('active', en);
        document.getElementById('langZhBtn').setAttribute('aria-pressed', String(!en));
        document.getElementById('langEnBtn').setAttribute('aria-pressed', String(en));

        var nodes = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
        for (var i = 0; i < nodes.length; i++) {
          nodes[i].textContent = en ? nodes[i].getAttribute('data-i18n-en') : nodes[i].getAttribute('data-i18n-zh');
        }

        var heroTitle = document.getElementById('heroTitleBlock');
        if (heroTitle) {
          heroTitle.innerHTML = en
            ? 'Roblox Corporate Culture &amp; Organizational Architecture Deep Dive: <span class="gradient-accent">Zero First-Party Studios, 3,065 System Builders &amp; the Multi-Million Creator Empire</span>'
            : '罗布乐思 Roblox 企业文化与组织架构深度研究报告：<span class="gradient-accent">放弃自己做爆款游戏的诱惑，用 3,065 名系统工程师托举数百万创作者帝国</span>';
        }

        var pNote = document.getElementById('pillarFocusNote');
        if (pNote) {
          pNote.innerHTML = '<div>' + (en ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[state.activePillar] + '</div>';
        }

        applyDensity(state.density, true);
        syncCh1Header();
        renderPeerTable();
        renderChecklist();
        updateSimulatorUI();
        renderAllCharts();
        safeSet(STORAGE_LANG_KEY, state.lang);
        if (!silent) showToast(en ? 'Switched to English View' : '已切换至中文深度研报视图');
      }

      function syncCh1Header() {
        var t = document.getElementById('ch1ChartTitle');
        var s = document.getElementById('ch1ChartSub');
        if (!t || !s) return;
        if (state.ch1View === 'viewA') {
          t.textContent = isEn()
            ? 'FY2024 vs. FY2025 Bookings, GAAP Revenue, Creator DevEx & Free Cash Flow ($B · 10-K)'
            : 'FY2024 vs FY2025 平台预订额、GAAP 营收、创作者分润与自由现金流跃升（$B · 10-K）';
          s.textContent = isEn()
            ? 'Bookings jumped +55% to $6.79B while DevEx rose +63% to $1.50B and Free Cash Flow more than doubled to $1.35B'
            : '预订额大涨 +55% 至 $6.79B，创作者 DevEx 分成同步跃升 +63% 至 $1.50B，自由现金流翻倍至 $1.35B';
        } else {
          t.textContent = isEn()
            ? 'FY2021–FY2025 Disciplined FTE Headcount (k) vs. Bookings per Employee ($M · 10-K)'
            : 'FY2021–FY2025 精英编制扩张（千人）vs 人均年预订额跃迁（$M · Form 10-K）';
          s.textContent = isEn()
            ? '3,065 FTEs generated $2.21M in bookings per employee in FY25—more than 4x multi-studio AAA publishers'
            : 'FY25 仅以 3,065 名全职员工创下 $2.21M 人均预订额，人效超越传统多工作室 3A 巨头逾 4 倍';
        }
      }

      function renderPeerTable() {
        var tbody = document.getElementById('peerTableBody');
        var badge = document.getElementById('peerCountBadge');
        if (!tbody) return;
        var rows = isEn() ? PEER_ROWS_EN : PEER_ROWS_ZH;
        var q = state.peerQuery.trim().toLowerCase();
        var filtered = rows.filter(function (r, idx) {
          if (state.peerFilter !== 'all' && r.category !== state.peerFilter) return false;
          if (!q) return true;
          var zh = PEER_ROWS_ZH[idx], en = PEER_ROWS_EN[idx];
          var hay = (zh.company + ' ' + zh.leader + ' ' + zh.positioning + ' ' + zh.culture + ' ' + zh.verdict + ' ' + en.company + ' ' + en.positioning).toLowerCase();
          return hay.indexOf(q) !== -1;
        });
        if (badge) {
          badge.textContent = isEn()
            ? ('Showing ' + filtered.length + ' / ' + rows.length + ' Peers')
            : ('显示 ' + filtered.length + ' / ' + rows.length + ' 家标杆企业');
        }
        if (!filtered.length) {
          tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">' + (isEn() ? 'No matching companies found.' : '未找到匹配的标杆企业，请尝试其他关键词。') + '</td></tr>';
          return;
        }
        var rawQ = state.peerQuery.trim();
        tbody.innerHTML = filtered.map(function (r) {
          return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
            '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.company, rawQ) + '</strong><span style="font-size:0.75rem;color:var(--text-muted);">' + highlightMatch(r.leader, rawQ) + '</span></td>' +
            '<td>' + highlightMatch(r.positioning, rawQ) + '</td>' +
            '<td>' + highlightMatch(r.culture, rawQ) + '</td>' +
            '<td class="mono" style="font-size:0.78rem;">' + highlightMatch(r.headcount, rawQ) + '</td>' +
            '<td class="mono" style="font-size:0.78rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.margins, rawQ) + '</td>' +
            '<td>' + highlightMatch(r.verdict, rawQ) + ' <a class="cite-link" href="' + r.sourceUrl + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td>' +
            '</tr>';
        }).join('');
      }

      function renderChecklist() {
        var container = document.getElementById('checklistContainer');
        var chip = document.getElementById('checklistScoreChip');
        var bar = document.getElementById('checklistProgressBar');
        if (!container) return;
        var items = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS_ZH;
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

      function fmtM(v) {
        if (v >= 10000) return '$' + (v / 1000).toFixed(2) + 'B';
        return '$' + Math.round(v).toLocaleString('en-US') + 'M';
      }

      function updateSimulatorUI() {
        var p = state.sim.principal;
        var yrs = state.sim.years;
        var cagr = state.sim.cagr;
        var boost = state.sim.boost ? 3.2 : 0.0;
        var rate = (cagr + boost) / 100;

        var ending = p * Math.pow(1 + rate, yrs);
        var mult = ending / p;
        var cumFcf = 0;
        for (var y = 1; y <= yrs; y++) cumFcf += p * Math.pow(1 + rate, y);
        var midY = Math.max(1, Math.floor(yrs / 2));
        var midVal = p * Math.pow(1 + rate, midY);

        document.getElementById('simPrincipalLabel').textContent = '$' + Math.round(p).toLocaleString('en-US') + 'M';
        document.getElementById('simYearsLabel').textContent = yrs + (isEn() ? ' yrs' : ' 年');
        document.getElementById('simCagrLabel').textContent = cagr.toFixed(1) + '%';
        document.getElementById('simEndingVal').textContent = fmtM(ending);
        document.getElementById('simMoicVal').textContent = mult.toFixed(2) + 'x · ' + (rate * 100).toFixed(2) + '%';
        document.getElementById('simNetGainVal').textContent = '$' + (cumFcf / 1000).toFixed(2) + 'B';
        document.getElementById('simMidLabel').textContent = isEn() ? ('Year ' + midY + ' Annual FCF') : ('第 ' + midY + ' 年中期年化 FCF 节点');
        document.getElementById('simMidVal').textContent = fmtM(midVal);

        var pbs = document.querySelectorAll('[data-preset]');
        for (var i = 0; i < pbs.length; i++) pbs[i].classList.toggle('active', pbs[i].getAttribute('data-preset') === state.sim.preset);
        drawSimChart();
      }

      /* High-DPI Retina Canvas Engine */
      function getPal() {
        var cs = getComputedStyle(document.documentElement);
        var dark = state.theme === 'dark';
        return {
          dark: dark,
          grid: cs.getPropertyValue('--chart-grid').trim() || 'rgba(100,116,139,0.16)',
          tick: cs.getPropertyValue('--chart-tick').trim() || '#475569',
          text: cs.getPropertyValue('--text-primary').trim() || '#0F1924',
          pillBg: dark ? 'rgba(9,13,22,0.90)' : 'rgba(255,255,255,0.95)',
          pillBorder: dark ? 'rgba(51,153,255,0.30)' : 'rgba(0,115,230,0.24)',
          trackBg: dark ? 'rgba(148,163,184,0.10)' : 'rgba(15,25,36,0.06)',
          hoverBand: dark ? 'rgba(51,153,255,0.08)' : 'rgba(0,115,230,0.05)',
          c1: cs.getPropertyValue('--chart-c1').trim() || '#0073E6',
          c2: cs.getPropertyValue('--chart-c2').trim() || '#16A34A',
          c3: cs.getPropertyValue('--chart-c3').trim() || '#D97706',
          c4: cs.getPropertyValue('--chart-c4').trim() || '#7C3AED'
        };
      }

      function prep(id) {
        var canvas = document.getElementById(id);
        if (!canvas || !canvas.parentElement) return null;
        var rect = canvas.parentElement.getBoundingClientRect();
        var w = Math.max(240, Math.floor(rect.width));
        var h = Math.max(170, Math.floor(rect.height));
        var dpr = Math.min(window.devicePixelRatio || 1, 2.2);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
      }

      function rRect(ctx, x, y, w, h, r) {
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

      function badge(ctx, txt, cx, cy, fg, pal) {
        ctx.save();
        ctx.font = '700 10.5px "IBM Plex Mono", sans-serif';
        var tw = ctx.measureText(txt).width + 9;
        ctx.fillStyle = pal.pillBg;
        rRect(ctx, cx - tw / 2, cy - 8.5, tw, 17, 5);
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
        var env = prep('chartCh1');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        hitRegions.chartCh1 = [];
        var meta = document.getElementById('ch1AxisMeta');
        var l1 = document.getElementById('ch1Leg1'), l2 = document.getElementById('ch1Leg2');

        if (state.ch1View === 'viewA') {
          if (meta) meta.innerHTML = '<span style="color:var(--chart-c1);">■ FY2024 ($B)</span><span style="color:var(--chart-c2);">■ FY2025 ($B · 创历史纪录)</span>';
          if (l1) l1.textContent = isEn() ? 'FY2024 Audited ($B)' : 'FY2024 审计金额 ($B)';
          if (l2) l2.textContent = isEn() ? 'FY2025 Audited ($B)' : 'FY2025 审计金额 ($B)';

          var pad = { top: 28, right: 18, bottom: 44, left: 48 };
          var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
          var labels = isEn()
            ? ['Bookings', 'GAAP Revenue', 'Operating Cash Flow', 'Creator DevEx', 'Free Cash Flow']
            : ['预订额 Bookings', 'GAAP 营收', '经营现金流 OCF', '创作者分成 DevEx', '自由现金流 FCF'];
          var growth = ['+55.4%', '+35.8%', '+118.5%', '+62.9%', '+111.0%'];
          var v24 = [4.37, 3.60, 0.82, 0.92, 0.64];
          var v25 = [6.79, 4.89, 1.80, 1.50, 1.35];
          var maxY = 7.5;

          for (var g = 0; g <= 5; g++) {
            var val = (maxY / 5) * g, gy = pad.top + ph - (g / 5) * ph;
            ctx.strokeStyle = pal.grid; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif';
            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
            ctx.fillText('$' + val.toFixed(1) + 'B', pad.left - 7, gy);
          }

          var step = pw / labels.length, bw = Math.min(36, Math.max(14, step * 0.27));
          for (var i = 0; i < labels.length; i++) {
            var cx = pad.left + step * (i + 0.5);
            if (hoverState.chartCh1 === i) {
              ctx.fillStyle = pal.hoverBand;
              rRect(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 8); ctx.fill();
            }
            var h1 = (v24[i] / maxY) * ph, y1 = pad.top + ph - h1;
            var h2 = (v25[i] / maxY) * ph, y2 = pad.top + ph - h2;

            if (state.ch1Series.s1) {
              var x1 = state.ch1Series.s2 ? (cx - bw - 3) : (cx - bw / 2);
              ctx.fillStyle = pal.c1;
              rRect(ctx, x1, y1, bw, h1, 5); ctx.fill();
            }
            if (state.ch1Series.s2) {
              var x2 = state.ch1Series.s1 ? (cx + 3) : (cx - bw / 2);
              ctx.fillStyle = pal.c2;
              rRect(ctx, x2, y2, bw, h2, 5); ctx.fill();
              badge(ctx, '$' + v25[i].toFixed(2) + 'B', cx, Math.min(y1, y2) - 12, pal.c2, pal);
            }
            ctx.fillStyle = pal.text; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(labels[i], cx, pad.top + ph + 18);
            ctx.fillStyle = pal.c2; ctx.font = '700 10px "IBM Plex Mono", sans-serif';
            ctx.fillText(growth[i], cx, pad.top + ph + 33);

            hitRegions.chartCh1.push({
              idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
              html: '<strong>' + labels[i] + ' (SEC 10-K)</strong><br/>• FY2024: <strong>$' + v24[i].toFixed(2) + 'B</strong><br/>• FY2025: <strong>$' + v25[i].toFixed(2) + 'B</strong> (' + growth[i] + ')'
            });
          }
        } else {
          if (meta) meta.innerHTML = '<span style="color:var(--chart-c1);">■ 左轴：全职员工 FTEs (人)</span><span style="color:var(--chart-c2);">● 右轴：人均预订额 ($M/人)</span>';
          if (l1) l1.textContent = isEn() ? 'Full-Time Employees (Left)' : '全职员工人数 (左轴 · 人)';
          if (l2) l2.textContent = isEn() ? 'Bookings / FTE (Right · $M)' : '人均预订额 (右轴 · $M)';

          var padB = { top: 28, right: 54, bottom: 38, left: 50 };
          var pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom;
          var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25'];
          var ftes = [1600, 2128, 2457, 2474, 3065];
          var bPerFte = [1.71, 1.35, 1.43, 1.77, 2.21];
          var maxFte = 3600, minB = 1.0, maxB = 2.5;

          for (var j = 0; j <= 4; j++) {
            var r = j / 4, yg = padB.top + phB - r * phB;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(padB.left, yg); ctx.lineTo(padB.left + pwB, yg); ctx.stroke();
            ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
            ctx.fillStyle = pal.tick; ctx.textAlign = 'right';
            ctx.fillText(Math.round(maxFte * r), padB.left - 7, yg);
            ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
            ctx.fillText('$' + (minB + r * (maxB - minB)).toFixed(2) + 'M', padB.left + pwB + 7, yg);
          }

          var stepB = pwB / yrs.length, bW = Math.min(40, stepB * 0.42), pts = [];
          for (var k = 0; k < yrs.length; k++) {
            var cxB = padB.left + stepB * (k + 0.5);
            if (state.ch1Series.s1) {
              var bh = (ftes[k] / maxFte) * phB, by = padB.top + phB - bh;
              ctx.fillStyle = pal.c1;
              rRect(ctx, cxB - bW / 2, by, bW, bh, 5); ctx.fill();
              ctx.fillStyle = '#FFFFFF'; ctx.font = '700 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
              if (bh > 20) ctx.fillText(ftes[k], cxB, by + 14);
            }
            var ly = padB.top + phB - ((bPerFte[k] - minB) / (maxB - minB)) * phB;
            pts.push({ x: cxB, y: ly, v: bPerFte[k] });
            ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(yrs[k], cxB, padB.top + phB + 21);

            hitRegions.chartCh1.push({
              idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 26,
              html: '<strong>' + yrs[k] + ' 组织人效</strong><br/>• 全职员工：<strong>' + ftes[k].toLocaleString() + ' 人</strong><br/>• 人均预订额：<strong>$' + bPerFte[k].toFixed(2) + 'M / 人</strong>'
            });
          }

          if (state.ch1Series.s2) {
            ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
            for (var p = 0; p < pts.length; p++) { if (p === 0) ctx.moveTo(pts[p].x, pts[p].y); else ctx.lineTo(pts[p].x, pts[p].y); }
            ctx.stroke();
            for (var m = 0; m < pts.length; m++) {
              ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[m].x, pts[m].y, 4.5, 0, Math.PI * 2); ctx.fill();
              badge(ctx, '$' + pts[m].v.toFixed(2) + 'M', pts[m].x, pts[m].y - 15, pal.c2, pal);
            }
          }
        }
      }

      function drawRadarChart() {
        var env = prep('chartRadar');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        hitRegions.chartRadar = [];
        var axes = isEn()
          ? ['UGC Neutrality', 'Safety & Age Tech', 'Long-Term Vision', 'AI Velocity', 'Cash Float Efficiency']
          : ['UGC平台中立性', '青少年安全基建', '长周期战略定力', 'AI原生工具速度', '预收浮存现金转化'];
        var series = [
          { key: 'rblx', color: pal.c1, fill: 'rgba(51,153,255,0.22)', vals: [9.8, 9.4, 9.6, 9.5, 9.3] },
          { key: 'ntdoy', color: pal.c2, fill: 'rgba(34,197,94,0.15)', vals: [4.2, 9.2, 9.7, 5.8, 8.8] },
          { key: 'aaa', color: pal.c3, fill: 'rgba(255,183,77,0.14)', vals: [5.0, 6.8, 6.2, 6.9, 6.5] }
        ];
        var cx = w / 2, cy = h / 2 + 8;
        var radius = Math.max(60, Math.min((w - 190) / 2, h * 0.35));
        var total = axes.length;

        for (var ring = 2; ring <= 10; ring += 2) {
          var rr = (ring / 10) * radius;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath();
          for (var i = 0; i < total; i++) {
            var a = -Math.PI / 2 + (i * 2 * Math.PI) / total;
            var px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke();
        }

        for (var k = 0; k < total; k++) {
          var ang = -Math.PI / 2 + (k * 2 * Math.PI) / total;
          var ax = cx + Math.cos(ang) * radius, ay = cy + Math.sin(ang) * radius;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
          var lx = cx + Math.cos(ang) * (radius + 14), ly = cy + Math.sin(ang) * (radius + 14);
          ctx.fillStyle = pal.text; ctx.font = '600 11px system-ui, sans-serif'; ctx.textBaseline = 'middle';
          ctx.textAlign = Math.abs(Math.cos(ang)) < 0.2 ? 'center' : (Math.cos(ang) > 0 ? 'left' : 'right');
          ctx.fillText(axes[k], lx, ly);

          hitRegions.chartRadar.push({
            idx: k, x: Math.min(ax, lx) - 34, y: Math.min(ay, ly) - 20, w: 72 + Math.abs(lx - ax), h: 40,
            html: '<strong>' + axes[k] + '</strong><br/>• Roblox: <strong>' + series[0].vals[k] + '/10</strong><br/>• 任天堂: <strong>' + series[1].vals[k] + '/10</strong><br/>• 传统3A发行商: <strong>' + series[2].vals[k] + '/10</strong>'
          });
        }

        for (var s = 0; s < series.length; s++) {
          var it = series[s];
          if (!state.radarSeries[it.key]) continue;
          ctx.beginPath();
          for (var m = 0; m < total; m++) {
            var th = -Math.PI / 2 + (m * 2 * Math.PI) / total;
            var d = (it.vals[m] / 10) * radius;
            var vx = cx + Math.cos(th) * d, vy = cy + Math.sin(th) * d;
            if (m === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
          }
          ctx.closePath();
          ctx.fillStyle = it.fill; ctx.fill();
          ctx.strokeStyle = it.color; ctx.lineWidth = 2.4; ctx.stroke();
        }
      }

      function drawHorizontalBars() {
        var env = prep('chartBars');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        hitRegions.chartBars = [];
        var items = [
          { label: 'Q3\'26 支付渠道扣费后毛利空间 (1 - Cost of Revenue)', val: 80.0, col: pal.c2, sub: 'COR 同比降 160bps 至 20%', note: '第一方网页与预付卡直充占比提升持续降低应用商店过路费' },
          { label: 'Top 100 爆款游戏采用 AI 工具加速开发比例 (Q3\'26)', val: 80.0, col: pal.c1, sub: '>80% 按活跃时长排名', note: 'Studio Assistant、Build 与 MCP 连接器已成为头部工作流标配' },
          { label: '~400 个平台 AI 模型中自有基础设施托管请求占比', val: 77.0, col: pal.c4, sub: '77% 自托管推理请求', note: '裸金属服务器 + 微调开源模型大幅压低单次 AI 生成与审核成本' },
          { label: 'Top 100 吸金游戏接入原生赞助商广告比例 (Q3\'26)', val: 70.0, col: pal.c3, sub: '>70% 运行 Sponsored Ads', note: '内生流量采买与品牌激励视频（完播率 >90%）打开第二变现极' },
          { label: '全球日活用户（DAU）完成强制年龄核验渗透率', val: 64.0, col: pal.c2, sub: '美/英 75% · 澳洲 80%', note: '精准年龄分层支撑安全聊天与美国 O18 (+37%占比) 高单价破圈' },
          { label: '创作者分成（DevEx）占全平台预订额比重 (Q3\'26)', val: 24.0, col: pal.c1, sub: '$403M / $1.7B (+140bps)', note: '主动上调标准汇率与美国 18+ 溢价费率以驱动优质内容供给' }
        ];

        var pad = { top: 10, right: 18, bottom: 26, left: 18 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom, maxX = 90;
        for (var g = 0; g <= 3; g++) {
          var xv = g * 30, gx = pad.left + (xv / maxX) * pw;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(xv + '%', gx, pad.top + ph + 18);
        }

        var rowH = ph / items.length;
        for (var i = 0; i < items.length; i++) {
          var rt = pad.top + rowH * i;
          var ly = rt + rowH * 0.36, by = rt + rowH * 0.52, bh = Math.min(14, rowH * 0.25);
          var bw = (items[i].val / maxX) * pw;
          ctx.fillStyle = pal.text; ctx.font = '600 11.5px system-ui, sans-serif'; ctx.textAlign = 'left';
          ctx.fillText(items[i].label, pad.left, ly);
          ctx.fillStyle = items[i].col; ctx.font = '800 12px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(items[i].val.toFixed(1) + '%', pad.left + pw, ly);
          if (w >= 580) {
            ctx.fillStyle = pal.tick; ctx.font = '500 10.5px "IBM Plex Mono", sans-serif';
            ctx.fillText(items[i].sub, pad.left + pw - 58, ly);
          }
          ctx.fillStyle = pal.trackBg; rRect(ctx, pad.left, by, pw, bh, bh / 2); ctx.fill();
          ctx.fillStyle = items[i].col; rRect(ctx, pad.left, by, bw, bh, bh / 2); ctx.fill();

          hitRegions.chartBars.push({
            idx: i, x: pad.left, y: rt, w: pw, h: rowH,
            html: '<strong>' + items[i].label + ': ' + items[i].val.toFixed(1) + '%</strong><br/>• 披露口径：' + items[i].sub + '<br/>• 战略意义：' + items[i].note
          });
        }
      }

      function drawEpsComboChart() {
        var env = prep('chartEps');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        hitRegions.chartEps = [];
        var yrs = ['FY2022', 'FY2023', 'FY2024', 'FY2025'];
        var sub = ['(基建投入高峰)', '(经营拐点显现)', '(FCF暴增+417%)', '(创纪录$1.35B)'];
        var fcfM = [-58.4, 124.0, 641.3, 1352.9];
        var bkgsB = [2.87, 3.52, 4.37, 6.79];

        var pad = { top: 28, right: 52, bottom: 44, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var minF = -200, maxF = 1600, minB = 2.0, maxB = 7.5;

        for (var g = 0; g <= 4; g++) {
          var r = g / 4, gy = pad.top + ph - r * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
          ctx.fillStyle = pal.tick; ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round(minF + r * (maxF - minF)) + 'M', pad.left - 7, gy);
          ctx.fillStyle = pal.c2; ctx.textAlign = 'left';
          ctx.fillText('$' + (minB + r * (maxB - minB)).toFixed(1) + 'B', pad.left + pw + 7, gy);
        }

        var zeroY = pad.top + ph - ((0 - minF) / (maxF - minF)) * ph;
        ctx.strokeStyle = pal.c3; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(pad.left, zeroY); ctx.lineTo(pad.left + pw, zeroY); ctx.stroke();
        ctx.setLineDash([]);

        var step = pw / yrs.length, bw = Math.min(48, step * 0.40), pts = [];
        for (var i = 0; i < yrs.length; i++) {
          var cx = pad.left + step * (i + 0.5);
          if (state.epsSeries.fcf) {
            var valY = pad.top + ph - ((fcfM[i] - minF) / (maxF - minF)) * ph;
            var topY = Math.min(zeroY, valY), barH = Math.max(4, Math.abs(zeroY - valY));
            ctx.fillStyle = fcfM[i] >= 0 ? pal.c1 : '#EF4444';
            rRect(ctx, cx - bw / 2, topY, bw, barH, 5); ctx.fill();
            badge(ctx, (fcfM[i] >= 0 ? '$' : '-$') + Math.abs(Math.round(fcfM[i])) + 'M', cx, topY - 12, fcfM[i] >= 0 ? pal.c1 : '#EF4444', pal);
          }
          var by = pad.top + ph - ((bkgsB[i] - minB) / (maxB - minB)) * ph;
          pts.push({ x: cx, y: by, b: bkgsB[i] });
          ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(yrs[i], cx, pad.top + ph + 19);
          ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif';
          ctx.fillText(sub[i], cx, pad.top + ph + 33);

          hitRegions.chartEps.push({
            idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36,
            html: '<strong>' + yrs[i] + ' ' + sub[i] + '</strong><br/>• 自由现金流 FCF：<strong>$' + fcfM[i].toFixed(1) + 'M</strong><br/>• 全年预订额 Bookings：<strong>$' + bkgsB[i].toFixed(2) + 'B</strong>'
          });
        }

        if (state.epsSeries.bkgs) {
          ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.beginPath();
          for (var m = 0; m < pts.length; m++) { if (m === 0) ctx.moveTo(pts[m].x, pts[m].y); else ctx.lineTo(pts[m].x, pts[m].y); }
          ctx.stroke();
          for (var n = 0; n < pts.length; n++) {
            ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 4.5, 0, Math.PI * 2); ctx.fill();
            badge(ctx, '$' + pts[n].b.toFixed(2) + 'B', pts[n].x, pts[n].y - 15, pal.c2, pal);
          }
        }
      }

      function drawSimChart() {
        var env = prep('chartSim');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPal();
        hitRegions.chartSim = [];
        var p = state.sim.principal, yrs = state.sim.years;
        var baseR = state.sim.cagr / 100;
        var totR = (state.sim.cagr + (state.sim.boost ? 3.2 : 0)) / 100;
        var totArr = [], baseArr = [];
        for (var y = 0; y <= yrs; y++) {
          totArr.push(p * Math.pow(1 + totR, y));
          baseArr.push(p * Math.pow(1 + baseR, y));
        }
        var maxV = Math.max(totArr[yrs], baseArr[yrs]) * 1.1;
        var pad = { top: 18, right: 20, bottom: 26, left: 56 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        for (var g = 0; g <= 3; g++) {
          var v = (maxV / 3) * g, gy = pad.top + ph - (g / 3) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right';
          ctx.fillText(fmtM(v), pad.left - 7, gy + 3);
        }

        var sx = pw / yrs;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.8; ctx.beginPath();
        for (var i = 0; i <= yrs; i++) {
          var bx = pad.left + sx * i, by = pad.top + ph - (baseArr[i] / maxV) * ph;
          if (i === 0) ctx.moveTo(bx, by); else ctx.lineTo(bx, by);
        }
        ctx.stroke(); ctx.restore();

        ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.6; ctx.beginPath();
        for (var k = 0; k <= yrs; k++) {
          var tx = pad.left + sx * k, ty = pad.top + ph - (totArr[k] / maxV) * ph;
          if (k === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
          ctx.fillStyle = pal.tick; ctx.font = '10px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center';
          if (k === 0 || k === Math.floor(yrs / 2) || k === yrs) ctx.fillText('Y' + k, tx, pad.top + ph + 17);
          hitRegions.chartSim.push({
            idx: k, x: tx - sx / 2, y: pad.top, w: Math.max(12, sx), h: ph + 20,
            html: '<strong>第 ' + k + ' 年年化 FCF 推演</strong><br/>• 含直充与广告增厚：<strong>' + fmtM(totArr[k]) + '</strong><br/>• 仅内生增长基准：<strong>' + fmtM(baseArr[k]) + '</strong>'
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

      function wireTip(id, redrawFn) {
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
          var next = hit ? hit.idx : -1;
          if (hoverState[id] !== next) { hoverState[id] = next; redrawFn(); }
          if (hit) {
            tip.innerHTML = hit.html;
            tip.style.display = 'block';
            tip.style.left = Math.min(window.innerWidth - 295, Math.max(12, e.clientX + 14)) + 'px';
            tip.style.top = Math.max(12, e.clientY - tip.offsetHeight - 12) + 'px';
          } else {
            tip.style.display = 'none';
          }
        });
        c.addEventListener('mouseleave', function () {
          hoverState[id] = -1; redrawFn(); tip.style.display = 'none';
        });
      }

      

      function init() {
        var st = (safeGet(STORAGE_THEME_KEY) || '').replace(/^"|"$/g, '');
        if (st === 'dark' || st === 'light') state.theme = st;
        var sl = (safeGet(STORAGE_LANG_KEY) || '').replace(/^"|"$/g, '');
        if (sl === 'en' || sl === 'zh') state.lang = sl;
        var sd = safeGet(STORAGE_DENSITY_KEY);
        if (sd === 'compact' || sd === 'comfortable') state.density = sd;
        var sc = safeGet(STORAGE_CHECK_KEY);
        if (sc) {
          try {
            var arr = JSON.parse(sc);
            if (Array.isArray(arr) && arr.length === 6) state.checks = arr.map(Boolean);
          } catch (e) {}
        }

        applyTheme(state.theme, true);
        applyLanguage(state.lang, true);

        document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
        document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
        document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
        
        
        
        
        

        document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
          if (window.innerWidth <= 1080) document.body.classList.toggle('drawer-open');
          else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
        });
        document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });

        /* Suite Hub Filter & Companion Toast (Zero auto-scroll on load!) */
        var hub = document.getElementById('companySubfolderHub');
        if (hub) {
          hub.addEventListener('click', function (e) {
            var catBtn = e.target.closest('[data-co-cat]');
            if (catBtn) {
              var cat = catBtn.getAttribute('data-co-cat');
              var pills = hub.querySelectorAll('[data-co-cat]');
              for (var i = 0; i < pills.length; i++) pills[i].classList.toggle('active', pills[i] === catBtn);
              var items = hub.querySelectorAll('[data-co-item-cat]');
              for (var j = 0; j < items.length; j++) {
                var ic = items[j].getAttribute('data-co-item-cat');
                items[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || ic === cat));
              }
              return;
            }
            var jumpBtn = e.target.closest('[data-suite-jump]');
            if (jumpBtn) {
              showToast('请在右侧画布文件列表或下载目录中打开《' + jumpBtn.getAttribute('data-suite-jump') + '》');
            } else if (e.target.closest('[data-suite-current]')) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          });
        }

        /* Quick Jump ⌘K */
        var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
        function renderJump(kw) {
          var q = (kw || '').trim().toLowerCase();
          var list = QUICK_JUMP_ITEMS.filter(function (it) {
            return !q || (it.zh + ' ' + it.en + ' ' + it.sub).toLowerCase().indexOf(q) !== -1;
          });
          qPop.innerHTML = list.map(function (it) {
            return '<button type="button" class="quick-jump-item" data-jump-sec="' + it.sec + '"><span class="quick-jump-item-title">' + escapeHtml(isEn() ? it.en : it.zh) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>';
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
          else if (e.key === 'Escape') { qPop.classList.remove('open'); document.body.classList.remove('drawer-open'); }
        });

        /* Ch1 Tabs & Series */
        document.querySelectorAll('[data-ch1-view]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.ch1View = this.getAttribute('data-ch1-view');
            document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA');
            document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB');
            syncCh1Header(); drawCh1Chart();
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

        /* Expandable Cards */
        document.querySelectorAll('[data-collapse-target]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var panel = document.getElementById(this.getAttribute('data-collapse-target'));
            if (!panel) return;
            var open = panel.classList.toggle('open');
            this.innerHTML = open ? '<span>收起微观执行机制</span> <span>⌃</span>' : '<span>展开微观执行机制</span> <span>⌄</span>';
          });
        });

        /* Pillars & Radar */
        var pCards = document.querySelectorAll('[data-pillar]');
        pCards.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var idx = parseInt(this.getAttribute('data-pillar'), 10) || 0;
            state.activePillar = idx;
            pCards.forEach(function (c, k) { c.classList.toggle('active', k === idx); });
            document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? PILLAR_NOTES_EN : PILLAR_NOTES_ZH)[idx] + '</div>';
            drawRadarChart();
          });
        });
        document.querySelectorAll('[data-radar-key]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var k = this.getAttribute('data-radar-key');
            state.radarSeries[k] = !state.radarSeries[k];
            if (!state.radarSeries.rblx && !state.radarSeries.ntdoy && !state.radarSeries.aaa) state.radarSeries[k] = true;
            this.classList.toggle('muted', !state.radarSeries[k]);
            drawRadarChart();
          });
        });

        /* Peer Search & Filter */
        document.getElementById('peerSearchInput').addEventListener('input', function () { state.peerQuery = this.value; renderPeerTable(); });
        var pfBtns = document.querySelectorAll('[data-peer-filter]');
        pfBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.peerFilter = this.getAttribute('data-peer-filter');
            pfBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
            renderPeerTable();
          });
        });

        /* Eps Series & Simulator */
        document.querySelectorAll('[data-eps-series]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var k = this.getAttribute('data-eps-series');
            state.epsSeries[k] = !state.epsSeries[k];
            if (!state.epsSeries.fcf && !state.epsSeries.bkgs) state.epsSeries[k] = true;
            this.classList.toggle('muted', !state.epsSeries[k]);
            drawEpsComboChart();
          });
        });

        var pS = document.getElementById('simPrincipalSlider'), yS = document.getElementById('simYearsSlider'), cS = document.getElementById('simCagrSlider'), fT = document.getElementById('simFloatToggle');
        pS.addEventListener('input', function () { state.sim.principal = parseFloat(this.value) || 1350; state.sim.preset = ''; updateSimulatorUI(); });
        yS.addEventListener('input', function () { state.sim.years = parseInt(this.value, 10) || 6; state.sim.preset = ''; updateSimulatorUI(); });
        cS.addEventListener('input', function () { state.sim.cagr = parseFloat(this.value) || 20; state.sim.preset = ''; updateSimulatorUI(); });
        fT.addEventListener('change', function () { state.sim.boost = !!this.checked; updateSimulatorUI(); });
        document.querySelectorAll('[data-preset]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var k = this.getAttribute('data-preset'), cfg = PRESETS[k];
            if (!cfg) return;
            state.sim = { principal: cfg.principal, years: cfg.years, cagr: cfg.cagr, boost: cfg.boost, preset: k };
            pS.value = cfg.principal; yS.value = cfg.years; cS.value = cfg.cagr; fT.checked = cfg.boost;
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
          renderChecklist(); showToast('已勾选全部 6 项平台诊断指标');
        });
        document.getElementById('resetCheckBtn').addEventListener('click', function () {
          state.checks = [true, true, true, false, false, false];
          safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks));
          renderChecklist(); showToast('已恢复默认核查基准 (50%)');
        });

        /* Scroll Progress & TOC Spy */
        var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
        tocLinks.forEach(function (l) { l.addEventListener('click', function () { document.body.classList.remove('drawer-open'); }); });
        window.addEventListener('scroll', function () {
          var doc = document.documentElement;
          var maxS = Math.max(1, doc.scrollHeight - window.innerHeight);
          document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / maxS) * 100) + '%';
        }, { passive: true });

        if ('IntersectionObserver' in window) {
          var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) {
                tocLinks.forEach(function (l) { l.classList.toggle('active', l.getAttribute('data-sec') === en.target.id); });
              }
            });
          }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
          for (var s = 0; s <= 7; s++) {
            var sec = document.getElementById('sec-0' + s);
            if (sec) obs.observe(sec);
          }
        }

        wireTip('chartCh1', drawCh1Chart);
        wireTip('chartRadar', drawRadarChart);
        wireTip('chartBars', drawHorizontalBars);
        wireTip('chartEps', drawEpsComboChart);
        wireTip('chartSim', drawSimChart);

        var rt = null;
        window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAllCharts, 70); });
      }

      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    })();
  