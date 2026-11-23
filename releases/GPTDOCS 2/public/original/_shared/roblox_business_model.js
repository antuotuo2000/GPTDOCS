
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_STRESS_KEY = 'rblx_bm_stress_v1';

      var state = {
        theme: document.documentElement.getAttribute('data-theme') || 'light',
        lang: 'zh',
        lens: 0,
        node: 0,
        pView: 'waterfall',
        cView: 'ltv',
        kView: 'float',
        cohort: 'o18'
      };

      var hits = { profitCanvas: [], cohortCanvas: [], capitalCanvas: [] };

      function showToast(msg) {
        var el = document.getElementById('muiSnackbar');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(function () { el.classList.remove('show'); }, 2400);
      }

      function applyTheme(theme, silent) {
        state.theme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        try { localStorage.setItem(STORAGE_THEME_KEY, state.theme); } catch (e) {}
        
        
        document.getElementById('appbarThemeIcon').innerHTML = state.theme === 'dark'
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        drawAll();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色外观' : '已切换至浅色高清晰度外观');
      }

      function applyLang(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
        document.documentElement.setAttribute('lang', state.lang === 'en' ? 'en' : 'zh-CN');
        try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
        document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
        document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var el = nodes[i];
          var val = state.lang === 'en' ? el.getAttribute('data-i18n-en') : el.getAttribute('data-i18n-zh');
          if (val !== null) el.innerHTML = val;
        }
        renderLens();
        renderNode();
        renderCohort();
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文界面');
      }

      /* M0 Lens Switcher */
      var LENSES = [
        {
          fZh: '内容风险豁免 = $0 自研3A立项沉没成本 + 玩家成功消费后才按 22%–24% 比例向创作者结算 DevEx',
          fEn: 'Zero Hit-Risk = $0 First-Party Studio CapEx + Success-Based 22%–24% DevEx Payout Only After Spend',
          bZh: '传统 3A 发行商（如 Take-Two、EA）单款旗舰需前置投入 $2亿–$5亿研发费与数年周期，一旦口碑翻车即面临巨额减值；Roblox 把内容试错完全交给全球去中心化创作者与 Build AI 工具，平台仅在玩家真金白银花掉 Robux 后才按既定汇率支付 DevEx 分润，彻底消除了“立项押宝失败”风险。',
          bEn: 'Traditional AAA publishers commit $200M–$500M upfront per flagship title with multi-year flop risk; Roblox crowdsources game creation across millions of AI-enabled builders and pays DevEx only after players actually spend Robux.'
        },
        {
          fZh: '边际利润剪刀差 = 第一方网页/礼品卡直充降费 (Q3 COR 降至 20.2%) + 美区 O18 高客单 (+50% 变现溢价)',
          fEn: 'Margin Scissors = Direct Web/Prepaid Mix (Q3 COR Down to 20.2%, -160bps YoY) + US O18 (+50% Monetization)',
          bZh: '过去移动端 Apple/Google 高达 30% 的应用商店渠道税吞噬了大量毛利；Roblox 通过在买币界面强化第一方直充激励与发行海量零售礼品卡，把 Q3 2026 渠道成本率压至 20.2%（同比大降 160bps），配合无需家长代付的美国 18+ 成人用户占比升至 37%，持续释放经营杠杆。',
          bEn: 'By steering Robux purchases toward lower-fee direct web checkout and prepaid cards, Roblox cut Q3 2026 Cost of Revenue to 20.2% (-160 bps YoY), amplified by US 18+ verified users reaching 37% of DAUs and monetizing 50%+ higher.'
        },
        {
          fZh: '自由现金流放大器 = 当期全额收现 Bookings ($6.79B) - 27个月递延摊销差额 → 沉淀 $7.04B 无息预收浮存池',
          fEn: 'Cash Float Amplifier = Upfront Cash Bookings ($6.79B) vs 27-Month GAAP Deferral → $7.04B Deferred Revenue Pool',
          bZh: '玩家充值购买虚拟耐用品时现金当日到账，但 GAAP 会计准则要求在 27 个月平均生命周期内分期确认营收。只要平台规模扩张，经营现金流便大幅领先账面利润——FY2025 经营现金流达 $17.96亿，加之 $62.38亿现金储备产生丰厚利息收入，反哺 AI 算力与股票回购。',
          bEn: 'Cash arrives immediately when Robux are purchased, while GAAP defers durable item revenue over 27 months—generating $1,796.4M FY25 operating cash flow, a $7,040M deferred revenue float, and $6,238M in cash & investments.'
        }
      ];

      function renderLens() {
        var d = LENSES[state.lens];
        document.getElementById('lensFormula').textContent = state.lang === 'en' ? d.fEn : d.fZh;
        document.getElementById('lensBody').textContent = state.lang === 'en' ? d.bEn : d.bZh;
      }

      document.getElementById('lensTabs').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-lens]');
        if (!btn) return;
        state.lens = parseInt(btn.getAttribute('data-lens'), 10);
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
        renderLens();
      });

      /* M1 5-Node Pipeline Inspector */
      var NODES = [
        {
          badge: 'NODE 01 · ZERO-1P-CAPEX AI CREATION ENGINE',
          tZh: '免费云原生工具链 + Build 一句话造游：把游戏业最重的“研发豪赌”变成零边际成本',
          tEn: 'Free Cloud Studio + Prompt-to-Game Build: Eliminating First-Party R&D Hit Risk',
          dZh: 'Roblox 免费向全球开发者提供 Roblox Studio、全球多活服务器托管、物理同步引擎与 ~400 个生产级 AI 模型（含 Cube 4D 与 Studio MCP）。2026 年推出的 Build 自然语言造游工具在 Alpha 阶段即吸引超 50 万用户发布 70,000+ 款可玩游戏，其中逾 75% 从未用过传统 Studio——平台无需承担一分钱游戏立项失败成本，却坐享指数级爆发的内容库。',
          dEn: 'Roblox provides free Studio tooling, global multiplayer hosting, and ~400 AI models. Its prompt-to-game Build alpha attracted 500K+ users publishing 70K+ playable experiences (>75% brand-new to creation) at zero 1P studio CapEx.',
          fZh: '商业传导：免费云托管 + AI 生成降本 → 供给端呈幂律高频试错 → 平台零内容减值锁定全部长尾爆款分成',
          fEn: 'Mechanics: Free Cloud Hosting + AI Tooling → Infinite Creator Experiments → Zero Title Write-Offs',
          kpis: [
            ['0 自研工作室', '100% 游戏内容由第三方社区共创'],
            ['>80%', 'Top 100 头部体验已接入官方 AI 工具'],
            ['70,000+ 款', 'Build Alpha 用户用自然语言发布新作'],
            ['+53% YoY', 'Q4\'25 非前十名长尾体验消费增速']
          ]
        },
        {
          badge: 'NODE 02 · AGE-CHECKED SOCIAL GRAPH & RFY DISCOVERY',
          tZh: '零外部买量获客：1.38亿日活好友关系链与“千人千面”推荐流自发冷启动',
          tEn: 'Zero Paid UA Tax: 138M DAU Social Graph & Personalized RFY Discovery',
          dZh: '普通手游厂商必须将流水 30%–50% 交给外部广告平台买量，而 Roblox 全年销售与营销费用（S&M）仅 $2.46 亿（占预订额仅 3.6%）。玩家因现实同学与好友在线而一键“Join Friend”同玩（日均发送 16 亿条游戏内消息），每周“为你推荐（RFY）”前 100 强体验中约 40% 创建不到 3 个月，新爆款冷启动速度冠绝全球。',
          dEn: 'While mobile publishers spend 30%–50% of revenue on user acquisition, Roblox spent just $246.2M on S&M in FY25 (3.6% of bookings). Social co-play (1.6B daily chat messages) and RFY discovery surface fresh hits organically (~40% of weekly RFY Top 100 created <3 months ago).',
          fZh: '商业传导：现实好友同玩邀请 + RFY 实时算法分发 → 获客费率仅 3.6% → 省下的买量税反哺算力与创作者',
          fEn: 'Mechanics: Co-Play Friend Invites + Real-Time RFY Feed → 3.6% S&M Ratio → Structural CAC Advantage',
          kpis: [
            ['138M DAU', 'Q3 2026 日活（两年累计增长 +55%）'],
            ['~34B 小时', 'Q3 单季总沉浸时长（日均超 3.5亿小时）'],
            ['~40%', '每周 RFY 百强中近 3 个月内新建新游占比'],
            ['3.6%', 'FY25 销售与营销费占预订额极低比例']
          ]
        },
        {
          badge: 'NODE 03 · PRE-PAID ROBUX ECONOMY & DIRECT-PAY STEERING',
          tZh: '统一央行货币 Robux × 第一方网页/礼品卡直充：系统性削减 30% 应用商店过路费',
          tEn: 'Unified Robux Currency × Direct Checkout Steering: Compressing App Store Fees to 20%',
          dZh: '玩家充值兑换通用虚拟货币 Robux，可在数百万款体验与 Avatar 商城间无缝流转。针对苹果/谷歌高达 30% 的内购抽成，Roblox 在“Buy Robux”流程中为网页端、PC 与线下预付卡提供额外赠币激励，推动 Q3 2026 营业成本（支付与渠道费）占营收比降至 20.2%（同比下降 160 个基点），每降 100bps 即释放逾 $6,000 万纯利。',
          dEn: 'Robux functions as a universal cross-experience currency. By rewarding direct web, PC, and prepaid gift-card purchases with bonus Robux, Roblox compressed Q3 2026 Cost of Revenue to 20.2% of revenue (-160 bps YoY).',
          fZh: '商业传导：网页/预付卡赠币导流 → 绕开移动端 30% 渠道重税 → Q3\'26 渠道成本率降至 20.2% (-160bps)',
          fEn: 'Mechanics: Bonus Robux on Direct Web/Prepaid → Lower App Store Mix → 20.2% Cost of Revenue (-160bps)',
          kpis: [
            ['20.2%', 'Q3 2026 渠道支付成本占营收比（-160bps）'],
            ['30.3M 人', 'Q3 月度独立付费用户 MUPs（客单 +5% YoY）'],
            ['7x 消费', 'Roblox Plus 订阅会员较普通玩家消费倍数'],
            ['$12.29', 'Q3 2026 单日活平均预订额 ABPDAU']
          ]
        },
        {
          badge: 'NODE 04 · TIERED DEVEX ($0.0038 / $0.0054) & DAILY PAYOUTS',
          tZh: '双轨制 DevEx 分润与日结金融基建：精准指挥全球工作室猛攻成人高毛利赛道',
          tEn: 'Dual-Rate DevEx ($0.0038 / $0.0054) & Airwallex Daily Wallet: Incentivizing O18 Genres',
          dZh: 'Roblox 自 2013 年累计向创作者分润超 $50 亿（截至 2026 年中 TTM 约 $17 亿，FY25 前 1,000 名创作者均赚 $130 万）。2025 年 9 月平台将基础 DevEx 汇率上调 8.5% 至 $0.0038/Robux，并于 2026 年 6 月对经核验美国 18+ 成人用户的合规消费给予 $0.0054/Robux（+42% 溢价），同时联合 Airwallex 推出工作日日结 Roblox Wallet。',
          dEn: 'With >$5B paid to creators cumulatively (~$1.7B TTM; Top 1,000 averaging $1.3M in FY25), Roblox raised base DevEx +8.5% to $0.0038/Robux and introduced a $0.0054/Robux (+42%) rate on verified US 18+ spend alongside daily Roblox Wallet payouts.',
          fZh: '商业传导：美区 O18 消费分润溢价 +42% → 吸引专业团队开发硬核射击/RPG → 反哺平台更高成人 ARPPU',
          fEn: 'Mechanics: +42% US O18 DevEx Rate → Attracts Hardcore Studios → Lifts Platform O18 Engagement & Spend',
          kpis: [
            ['~$1.7B', '过去12个月（TTM）创作者总收入规模'],
            ['$0.0038', '标准 DevEx 兑现汇率（2025.09 上调 +8.5%）'],
            ['$0.0054', '美区 18+ 核验用户合格消费专属溢价汇率'],
            ['$1.3M / 年', 'FY2025 前 1,000 名创作者平均年收入']
          ]
        },
        {
          badge: 'NODE 05 · 27-MONTH DEFERRED FLOAT, NET LIQUIDITY & BUYBACKS',
          tZh: '$70.4亿 递延收入浮存池 + $52.3亿 净现金：负营运资本驱动自由现金流倍增',
          tEn: '$7.04B Deferred Revenue Float + $5.23B Net Cash: Compounding Free Cash Flow per Share',
          dZh: '由于现金在充值瞬间入账，而会计营收按 27 个月分摊，截至 2026 年 9 月底 Roblox 账面递延收入总额高达 $70.40 亿，现金及长短期投资达 $62.38 亿（净现金 +$52.29 亿）。充沛现金流不仅全额覆盖自建裸金属 GPU 机房资本开支，更支撑公司在 Q3 2026 斥资约 $2 亿回购 440 万股（剩余回购授权约 $24 亿）。',
          dEn: 'Upfront cash collection paired with 27-month GAAP amortization built a $7,040M deferred revenue balance and $6,238M in cash & investments (+$5,229M net of $1,009M debt), funding bare-metal AI servers and $200M in Q3\'26 share buybacks (~$2.4B remaining).',
          fZh: '商业传导：预收浮存金生息 + 自建裸金属服务器摊薄单小时成本 → FCF 复利增长并回购对冲 SBC',
          fEn: 'Mechanics: Upfront Cash Float + Bare-Metal Infra Leverage → Compounding FCF Funding Buybacks',
          kpis: [
            ['$7,040M', 'Q3 2026 末总递延收入余额（流动+非流动）'],
            ['$6,238M', '现金、短期及长期国债投资总储备'],
            ['$1,352.9M', 'FY2025 全年自由现金流（同比 +111%）'],
            ['~$2.4B', '截至 Q3\'26 末剩余可用股票回购授权额度']
          ]
        }
      ];

      function renderNode() {
        var n = NODES[state.node];
        document.getElementById('nodeBadge').textContent = n.badge;
        document.getElementById('nodeTitle').textContent = state.lang === 'en' ? n.tEn : n.tZh;
        document.getElementById('nodeDesc').textContent = state.lang === 'en' ? n.dEn : n.dZh;
        document.getElementById('nodeFormula').textContent = state.lang === 'en' ? n.fEn : n.fZh;
        document.getElementById('nodeKpis').innerHTML = n.kpis.map(function (k) {
          return '<div class="bm-ins-card"><b class="mono">' + k[0] + '</b><span>' + k[1] + '</span></div>';
        }).join('');
      }

      document.getElementById('pipelineTrack').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-node]');
        if (!btn) return;
        state.node = parseInt(btn.getAttribute('data-node'), 10);
        var bs = this.querySelectorAll('.bm-node-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === btn);
        renderNode();
      });

      /* M2B Tier Filter */
      document.getElementById('tierFilter').addEventListener('click', function (e) {
        var b = e.target.closest('[data-tcat]');
        if (!b) return;
        var cat = b.getAttribute('data-tcat');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        var cards = document.querySelectorAll('#tierList .bm-tier-card');
        for (var j = 0; j < cards.length; j++) {
          cards[j].classList.toggle('hidden-tier', !(cat === 'all' || cards[j].getAttribute('data-tier') === cat));
        }
      });

      /* M3A Age Cohort Switcher */
      var COHORTS = {
        u13: {
          stats: [
            ['全球已核验 DAU 占比', '34%', '美国 U18 游戏市场渗透率约 20%'],
            ['核心支付与入口特征', '家长管控 + 礼品卡', '圣诞与暑期线下零售预付卡高峰明显'],
            ['安全与社交默认权限', 'RM3 严苛过滤', '受年龄核验分层保护，限制跨龄私聊'],
            ['长期战略漏斗价值', '零获客费种子池', '伴随年龄增长自然过渡为 13–17 与 O18 客群']
          ],
          note: '<strong>U13 青少年种子漏斗（占全球已核验 DAU 34%）：</strong>这是 Roblox 最难被竞争对手复刻的国民级心智入口。虽然单客短期消费受家长额度约束，但其以近乎零买量成本完成了下一代全球玩家的“数字社交启蒙”，并在实名年龄核验与开源 Sentinel 安全模型守护下持续留存。'
        },
        teen: {
          stats: [
            ['全球已核验 DAU 占比', '37% (最大群体)', '美国 13–17 岁人群日活渗透率高达 ~30%'],
            ['年龄核验完成覆盖率', '>80% 已核验', 'Q3 2026 日均聊天与语音互动环比大增 +24%'],
            ['核心消费驱动力', 'UGC 潮牌与联机通行证', '高频同玩驱动 Roblox Plus 会员快速渗透'],
            ['创作者供给匹配度', '病毒爆款发源地', 'Dress to Impress 与竞技塔防高频破圈人群']
          ],
          note: '<strong>13–17 岁社交中坚层（占全球已核验 DAU 37%）：</strong>在美国每三个青少年中就有一人每天打开 Roblox。超过 80% 的该年龄段活跃用户已完成年龄核验，日均收发 16 亿条游戏内消息，兼具极高的放学后组队粘性与虚拟身份审美消费意愿。'
        },
        o18: {
          stats: [
            ['美区已核验 DAU 占比 / 增速', '37% (全球 29%)', '美区 18–34 岁 DAU 两年暴涨 +114%'],
            ['单日活变现溢价 (vs U18)', '+50% 以上', '自主信用卡/网页直充比例显著更高'],
            ['专属创作者分润汇率 (2026.06起)', '$0.0054 / Robux', '较基础汇率 $0.0038 溢价 +42%'],
            ['高分润激励首批验证成效', '2,000+ 款体验', '成人向新游实现 10%+ 收入直接跃升']
          ],
          note: '<strong>“随用户长大而升级”的棘轮效应（Cohort Aging Ratchet）：</strong>过去十年玩着 Roblox 长大的千万级少年并未在成年后流失，而是带着已有数百位好友的社交关系链进入大学与职场。2026 年全球 64% 日活完成年龄核验后，平台将美区 O18 合规消费的 DevEx 汇率拉升 42% 至 <strong>$0.0054/Robux</strong>，倒逼顶尖工作室开发硬核射击、RPG 与体育新作。'
        }
      };

      function renderCohort() {
        var c = COHORTS[state.cohort];
        document.getElementById('cohortMetrics').innerHTML = c.stats.map(function (s) {
          return '<div class="bm-cohort-stat"><div class="lbl">' + s[0] + '</div><div class="val mono">' + s[1] + '</div><div class="delta">' + s[2] + '</div></div>';
        }).join('');
        document.getElementById('cohortNote').innerHTML = c.note;
      }

      document.getElementById('cohortTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-cohort]');
        if (!b) return;
        state.cohort = b.getAttribute('data-cohort');
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        renderCohort();
      });

      /* Canvas Setup & Theme Palette */
      function prepCanvas(id) {
        var c = document.getElementById(id);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var r = c.parentElement.getBoundingClientRect();
        var w = Math.max(260, r.width - 20);
        var h = Math.max(120, r.height - 20);
        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        var ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { ctx: ctx, w: w, h: h };
      }

      function pal() {
        var dark = state.theme === 'dark';
        return {
          text: dark ? '#F3F6F9' : '#0F1924',
          sub: dark ? '#94A3B8' : '#475569',
          grid: dark ? 'rgba(148,163,184,0.14)' : 'rgba(100,116,139,0.16)',
          blue: '#0073E6',
          cyan: '#00A3FF',
          green: dark ? '#66BB6A' : '#16A34A',
          violet: dark ? '#A78BFA' : '#7C3AED',
          amber: dark ? '#FFB74D' : '#D97706',
          red: dark ? '#FF6B6B' : '#DC2626'
        };
      }

      /* Chart 1: profitCanvas */
      function drawProfitCanvas() {
        var o = prepCanvas('profitCanvas'), ctx = o.ctx, w = o.w, h = o.h, p = pal();
        hits.profitCanvas = [];
        var pad = { l: 54, r: 22, t: 30, b: 46 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;

        if (state.pView === 'waterfall') {
          var items = [
            { lbl: 'FY25 预订额', val: 6788, col: p.blue, tip: 'FY2025 总预订额 $6,788.4M (+55% YoY)，现金当期全额入账' },
            { lbl: '渠道与基建/研发现金', val: -4992, col: p.amber, tip: '当期现金付现：渠道费、DevEx $1,503M、基建安全及现金薪酬研发（剔除SBC）' },
            { lbl: '经营现金流 OCF', val: 1796, col: p.cyan, tip: 'FY2025 经营活动现金流 $1,796.4M (+118% YoY)' },
            { lbl: '资本开支 CapEx', val: -443, col: p.violet, tip: '自建裸金属 GPU 服务器与无形资产投入 $(443.5)M' },
            { lbl: '自由现金流 FCF', val: 1353, col: p.green, tip: 'FY2025 自由现金流 $1,352.9M (+111% YoY，占预订额 19.9%)' },
            { lbl: 'GAAP 净亏损', val: -1072, col: p.red, tip: '账面净亏损 $(1,071.6)M：主因 $1,934M 净递延收入未确认及 $1,129M 非现金 SBC' }
          ];
          var maxV = 7200, minV = -1600, span = maxV - minV;
          var zeroY = pad.t + (maxV / span) * ph;

          for (var g = 0; g <= 4; g++) {
            var gv = minV + (span / 4) * g;
            var gy = pad.t + ((maxV - gv) / span) * ph;
            ctx.strokeStyle = p.grid;
            ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
            ctx.fillStyle = p.sub; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + Math.round(gv) + 'M', pad.l - 6, gy + 3);
          }
          ctx.strokeStyle = p.sub; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pad.l, zeroY); ctx.lineTo(w - pad.r, zeroY); ctx.stroke();

          var bw = Math.min(58, (pw / items.length) * 0.62);
          for (var i = 0; i < items.length; i++) {
            var it = items[i];
            var cx = pad.l + (pw / items.length) * (i + 0.5);
            var yTop = it.val >= 0 ? pad.t + ((maxV - it.val) / span) * ph : zeroY;
            var bh = Math.max(4, (Math.abs(it.val) / span) * ph);
            ctx.fillStyle = it.col;
            ctx.beginPath(); ctx.roundRect(cx - bw / 2, yTop, bw, bh, 5); ctx.fill();

            ctx.fillStyle = p.text; ctx.font = '700 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            var lblTxt = (it.val > 0 ? '$' : '-$') + Math.abs(it.val) + 'M';
            ctx.fillText(lblTxt, cx, it.val >= 0 ? yTop - 6 : yTop + bh + 13);

            ctx.fillStyle = p.sub; ctx.font = '600 10.5px system-ui, sans-serif';
            ctx.fillText(it.lbl, cx, h - 14);
            hits.profitCanvas.push({ x: cx - bw / 2, y: yTop, w: bw, h: bh, title: it.lbl, body: it.tip });
          }
        } else {
          var periods = ['FY2023', 'FY2024', 'FY2025', 'Q3 2026'];
          var corPct = [23.5, 22.4, 21.9, 20.2];
          var devPct = [21.0, 21.1, 22.1, 23.6];
          var fcfPct = [3.5, 14.7, 19.9, 21.3];
          var maxP = 30;

          for (var k = 0; k <= 3; k++) {
            var pv = (maxP / 3) * k;
            var py = pad.t + ph - (pv / maxP) * ph;
            ctx.strokeStyle = p.grid;
            ctx.beginPath(); ctx.moveTo(pad.l, py); ctx.lineTo(w - pad.r, py); ctx.stroke();
            ctx.fillStyle = p.sub; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(Math.round(pv) + '%', pad.l - 6, py + 3);
          }

          var series = [
            { name: '渠道成本 COR/营收', data: corPct, col: p.amber },
            { name: 'DevEx/预订额', data: devPct, col: p.blue },
            { name: '自由现金流 FCF/预订额', data: fcfPct, col: p.green }
          ];
          series.forEach(function (sr) {
            ctx.strokeStyle = sr.col; ctx.lineWidth = 2.6; ctx.beginPath();
            sr.data.forEach(function (v, idx) {
              var x = pad.l + (pw / (periods.length - 1)) * idx;
              var y = pad.t + ph - (v / maxP) * ph;
              if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();
            sr.data.forEach(function (v, idx) {
              var x = pad.l + (pw / (periods.length - 1)) * idx;
              var y = pad.t + ph - (v / maxP) * ph;
              ctx.fillStyle = sr.col; ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2); ctx.fill();
              ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
              ctx.fillText(v.toFixed(1) + '%', x, y - 8);
              hits.profitCanvas.push({ x: x - 12, y: y - 12, w: 24, h: 24, title: periods[idx] + ' · ' + sr.name, body: '比率：' + v.toFixed(1) + '%' });
            });
          });
          periods.forEach(function (pr, idx) {
            var x = pad.l + (pw / (periods.length - 1)) * idx;
            ctx.fillStyle = p.sub; ctx.font = '600 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(pr, x, h - 14);
          });
        }
      }

      /* Chart 2: cohortCanvas */
      function drawCohortCanvas() {
        var o = prepCanvas('cohortCanvas'), ctx = o.ctx, w = o.w, h = o.h, p = pal();
        hits.cohortCanvas = [];
        var pad = { l: 52, r: 22, t: 28, b: 44 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;

        if (state.cView === 'ltv') {
          var yrs = ['第1年', '第2年', '第3年', '第4年', '第5年'];
          var u13 = [100, 195, 295, 405, 525];
          var teen = [125, 255, 395, 545, 710];
          var o18 = [155, 325, 515, 725, 960];
          var maxL = 1050;

          for (var g = 0; g <= 4; g++) {
            var gv = (maxL / 4) * g;
            var gy = pad.t + ph - (gv / maxL) * ph;
            ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
            ctx.fillStyle = p.sub; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(Math.round(gv), pad.l - 6, gy + 3);
          }

          [
            { n: '美区 O18 成人客群 (+50%+ 溢价)', d: o18, c: p.green },
            { n: '13–17 社交主力客群', d: teen, c: p.blue },
            { n: 'U13 启蒙客群 (基准=100)', d: u13, c: p.violet }
          ].forEach(function (s) {
            ctx.strokeStyle = s.c; ctx.lineWidth = 2.6; ctx.beginPath();
            s.d.forEach(function (v, idx) {
              var x = pad.l + (pw / (yrs.length - 1)) * idx;
              var y = pad.t + ph - (v / maxL) * ph;
              if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();
            s.d.forEach(function (v, idx) {
              var x = pad.l + (pw / (yrs.length - 1)) * idx;
              var y = pad.t + ph - (v / maxL) * ph;
              ctx.fillStyle = s.c; ctx.beginPath(); ctx.arc(x, y, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 4) {
                ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
                ctx.fillText(v + ' idx', x - 6, y - 7);
              }
              hits.cohortCanvas.push({ x: x - 12, y: y - 12, w: 24, h: 24, title: yrs[idx] + ' · ' + s.n, body: '累计变现指数：' + v + '（以 U13 首年=100 计，基于官方 O18 +50%+ 变现能力披露建模）' });
            });
          });
          yrs.forEach(function (yr, idx) {
            var x = pad.l + (pw / (yrs.length - 1)) * idx;
            ctx.fillStyle = p.sub; ctx.font = '600 11px system-ui, sans-serif'; ctx.textAlign = 'center';
            ctx.fillText(yr, x, h - 14);
          });
        } else {
          var metrics = [
            { l: 'Q4\'25 非Top10长尾增速', v: 53, c: p.blue, t: 'Q4 2025 排名前10以外体验的 Robux 消费同比增长 +53%，贡献超一半总消费增量' },
            { l: 'RFY百强近3月新游占比', v: 40, c: p.violet, t: '每周“为你推荐”Top 100 体验中约 40% 创建于最近 3 个月内' },
            { l: 'Top100 接入Sponsored广告', v: 70, c: p.green, t: '超过 70% 的百强头部体验通过平台原生 Sponsored Ads 持续买量扩圈' },
            { l: 'Top100 接入官方AI比例', v: 80, c: p.cyan, t: '超过 80% 的百强游戏在生产或实时运行中使用 Roblox AI 模型' }
          ];
          var maxM = 100;
          var bh = 28;
          metrics.forEach(function (m, i) {
            var y = pad.t + i * ((ph - 10) / metrics.length) + 8;
            var wBar = (m.v / maxM) * (pw - 95);
            ctx.fillStyle = p.grid;
            ctx.beginPath(); ctx.roundRect(pad.l + 95, y, pw - 95, bh, 6); ctx.fill();
            ctx.fillStyle = m.c;
            ctx.beginPath(); ctx.roundRect(pad.l + 95, y, wBar, bh, 6); ctx.fill();
            ctx.fillStyle = p.text; ctx.font = '600 11px system-ui, sans-serif'; ctx.textAlign = 'right';
            ctx.fillText(m.l, pad.l + 88, y + 18);
            ctx.fillStyle = '#FFFFFF'; ctx.font = '700 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
            ctx.fillText(m.v + '%+', pad.l + 105, y + 18);
            hits.cohortCanvas.push({ x: pad.l + 95, y: y, w: wBar, h: bh, title: m.l, body: m.t });
          });
        }
      }

      /* Chart 3: capitalCanvas */
      function drawCapitalCanvas() {
        var o = prepCanvas('capitalCanvas'), ctx = o.ctx, w = o.w, h = o.h, p = pal();
        hits.capitalCanvas = [];
        var pad = { l: 54, r: 24, t: 28, b: 44 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;

        if (state.kView === 'float') {
          var labels = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'Q3 2026'];
          var defRev = [3039, 3780, 4630, 6564, 7040];
          var fcfArr = [-58, 124, 641, 1353, 1520]; // Q3'26 annualized / TTM run-rate note
          var maxD = 8000;

          for (var g = 0; g <= 4; g++) {
            var gv = (maxD / 4) * g;
            var gy = pad.t + ph - (gv / maxD) * ph;
            ctx.strokeStyle = p.grid; ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
            ctx.fillStyle = p.sub; ctx.font = '600 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + (gv / 1000).toFixed(1) + 'B', pad.l - 6, gy + 3);
          }

          var bw = Math.min(46, (pw / labels.length) * 0.48);
          labels.forEach(function (lb, idx) {
            var cx = pad.l + (pw / labels.length) * (idx + 0.5);
            var bh = (defRev[idx] / maxD) * ph;
            var y = pad.t + ph - bh;
            ctx.fillStyle = p.blue;
            ctx.beginPath(); ctx.roundRect(cx - bw / 2, y, bw, bh, 5); ctx.fill();
            ctx.fillStyle = p.text; ctx.font = '700 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + (defRev[idx] / 1000).toFixed(2) + 'B', cx, y - 6);
            ctx.fillStyle = p.sub; ctx.fillText(lb, cx, h - 14);
            hits.capitalCanvas.push({
              x: cx - bw / 2, y: y, w: bw, h: bh,
              title: lb + ' 递延收入浮存池',
              body: '总递延收入余额：$' + defRev[idx].toLocaleString() + 'M' + (idx < 4 ? ' · 当年自由现金流：$' + fcfArr[idx] + 'M' : '（流动 $4,781M + 非流动 $2,259M；Q3 单季 FCF $364M）')
            });
          });
        } else {
          var rows = [
            { l: '现金及长短期投资', v: 6238, c: p.green, t: '现金 $1,093M + 短期投资 $2,103M + 长期投资 $3,042M = $6,238M' },
            { l: '总递延收入浮存池', v: 7040, c: p.blue, t: '流动递延收入 $4,781M + 非流动递延收入 $2,259M = $7,040M' },
            { l: '长期有息债务净额', v: 1009, c: p.amber, t: '长期债务仅 $1,009M，净现金流动性高达 +$5,229M' },
            { l: '剩余股票回购授权', v: 2400, c: p.violet, t: 'Q3 2026 已回购 $200M (4.4M股)，剩余授权约 $2,400M' }
          ];
          var maxR = 7500;
          var bh2 = 28;
          rows.forEach(function (r, idx) {
            var y = pad.t + idx * ((ph - 10) / rows.length) + 8;
            var wb = (r.v / maxR) * (pw - 110);
            ctx.fillStyle = p.grid; ctx.beginPath(); ctx.roundRect(pad.l + 100, y, pw - 100, bh2, 6); ctx.fill();
            ctx.fillStyle = r.c; ctx.beginPath(); ctx.roundRect(pad.l + 100, y, wb, bh2, 6); ctx.fill();
            ctx.fillStyle = p.text; ctx.font = '600 11px system-ui, sans-serif'; ctx.textAlign = 'right';
            ctx.fillText(r.l, pad.l + 92, y + 18);
            ctx.fillStyle = p.text; ctx.font = '700 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
            ctx.fillText('$' + (r.v / 1000).toFixed(2) + 'B', pad.l + 106 + wb, y + 18);
            hits.capitalCanvas.push({ x: pad.l + 100, y: y, w: wb, h: bh2, title: r.l, body: r.t });
          });
        }
      }

      /* Chart 4: simMiniCanvas & Simulator */
      var simFcfSeries = [1.35, 1.70, 2.15, 2.72, 3.44, 4.05];
      function drawSimMini() {
        var o = prepCanvas('simMiniCanvas'), ctx = o.ctx, w = o.w, h = o.h, p = pal();
        var pad = { l: 38, r: 16, t: 18, b: 24 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var maxV = Math.max(5.0, Math.max.apply(null, simFcfSeries) * 1.15);
        var yrs = ['FY25', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
        var bw = Math.min(34, (pw / yrs.length) * 0.56);

        simFcfSeries.forEach(function (v, i) {
          var cx = pad.l + (pw / yrs.length) * (i + 0.5);
          var bh = (v / maxV) * ph;
          var y = pad.t + ph - bh;
          ctx.fillStyle = i === 0 ? p.blue : p.green;
          ctx.beginPath(); ctx.roundRect(cx - bw / 2, y, bw, bh, 4); ctx.fill();
          ctx.fillStyle = p.text; ctx.font = '700 9.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(2) + 'B', cx, y - 4);
          ctx.fillStyle = p.sub; ctx.fillText(yrs[i], cx, h - 6);
        });
      }

      function updateSim() {
        var cagr = parseFloat(document.getElementById('rngBkgsCagr').value) / 100;
        var mgn = parseFloat(document.getElementById('rngFcfMgn').value) / 100;
        var dil = parseFloat(document.getElementById('rngDilution').value) / 100;

        document.getElementById('lblBkgsCagr').textContent = Math.round(cagr * 100) + '%';
        document.getElementById('lblFcfMgn').textContent = Math.round(mgn * 100) + '%';
        document.getElementById('lblDilution').textContent = (dil > 0 ? '+' : '') + (dil * 100).toFixed(1) + '% / 年';

        var baseBkgs = 6.7884; // FY25 $B
        var baseShr = 755; // Q3'26 diluted shares M
        simFcfSeries = [1.353];
        for (var y = 1; y <= 5; y++) {
          var b = baseBkgs * Math.pow(1 + cagr, y);
          var curMgn = 0.199 + ((mgn - 0.199) * (y / 5));
          simFcfSeries.push(b * curMgn);
        }
        var y5Bkgs = baseBkgs * Math.pow(1 + cagr, 5);
        var y5Fcf = simFcfSeries[5];
        var y5Shr = Math.round(baseShr * Math.pow(1 + dil, 5));
        var fcfPs = y5Fcf * 1000 / y5Shr;

        document.getElementById('simOutBkgs').textContent = '$' + y5Bkgs.toFixed(1) + 'B';
        document.getElementById('simOutFcf').textContent = '$' + y5Fcf.toFixed(2) + 'B';
        document.getElementById('simOutShr').textContent = y5Shr + 'M';
        document.getElementById('simOutFcfPs').textContent = '$' + fcfPs.toFixed(2);
        document.getElementById('simScenarioChip').textContent = cagr >= 0.22 ? '牛市高增推演' : (cagr <= 0.14 ? '保守压力推演' : '基准重估推演');
        drawSimMini();
      }
      ['rngBkgsCagr', 'rngFcfMgn', 'rngDilution'].forEach(function (id) {
        document.getElementById(id).addEventListener('input', updateSim);
      });

      function bindSeg(gid, attr, skey, fn) {
        var g = document.getElementById(gid);
        g.addEventListener('click', function (e) {
          var b = e.target.closest('[' + attr + ']');
          if (!b) return;
          state[skey] = b.getAttribute(attr);
          var bs = g.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          fn();
        });
      }
      bindSeg('pChartTabs', 'data-pview', 'pView', drawProfitCanvas);
      bindSeg('cChartTabs', 'data-cview', 'cView', drawCohortCanvas);
      bindSeg('kChartTabs', 'data-kview', 'kView', drawCapitalCanvas);

      function bindTip(cid) {
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
            tip.style.left = Math.min(window.innerWidth - 300, ev.clientX + 14) + 'px';
            tip.style.top = Math.max(12, ev.clientY - 28) + 'px';
          } else tip.style.display = 'none';
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['profitCanvas', 'cohortCanvas', 'capitalCanvas'].forEach(bindTip);

      function drawAll() {
        drawProfitCanvas();
        drawCohortCanvas();
        drawCapitalCanvas();
        drawSimMini();
      }

      /* Export HTML */
      function exportHtml() {
        var blob = new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = '罗布乐思 Roblox 商业模式解构.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        showToast('已下载《罗布乐思 Roblox 商业模式解构.html》');
      }

      /* Suite Hub & Quick Jump */
      var hub = document.getElementById('companySubfolderHub');
      hub.addEventListener('click', function (e) {
        var catBtn = e.target.closest('[data-co-cat]');
        if (catBtn) {
          var cat = catBtn.getAttribute('data-co-cat');
          var ps = hub.querySelectorAll('[data-co-cat]');
          for (var i = 0; i < ps.length; i++) ps[i].classList.toggle('active', ps[i] === catBtn);
          var its = hub.querySelectorAll('[data-co-item-cat]');
          for (var j = 0; j < its.length; j++) its[j].classList.toggle('co-hub-hidden', !(cat === 'ALL' || its[j].getAttribute('data-co-item-cat') === cat));
          return;
        }
        var jb = e.target.closest('[data-suite-jump]');
        if (jb) showToast('请在画布列表或下载文件夹中打开《' + jb.getAttribute('data-suite-jump') + '》');
        else if (e.target.closest('[data-suite-current]')) window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      var QITEMS = [
        { id: 'mod-deck', t: 'M0 非对称指挥舱与三透镜公式', s: '零CapEx长尾 × 直充降费 × 27个月递延现金浮存' },
        { id: 'mod-pipeline', t: 'M1 五阶商业价值传导沙盘', s: 'Studio/Build → RFY分发 → 直充 → 双轨DevEx → 回购' },
        { id: 'mod-profit-pool', t: 'M2 $67.9亿预订额瀑布流与四级变现栈', s: 'FY25 FCF $1.35B 还原桥与 Roblox Plus / 视频广告' },
        { id: 'mod-cohort', t: 'M3 年龄分层单客经济与去爆款依赖', s: '美区 O18 +50% 变现溢价与 $0.0054 DevEx' },
        { id: 'mod-capital', t: 'M4 $70.4亿预收浮存池与 5年FCF推演器', s: '净现金 +$5.23B 与交互式每股 FCF 复利实验室' },
        { id: 'mod-matrix', t: 'M5 游戏巨头商业范式矩阵与三大压测', s: '对比任天堂 / EA / Take-Two / Epic / Unity' }
      ];
      var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQ(kw) {
        var q = (kw || '').trim().toLowerCase();
        var m = QITEMS.filter(function (x) { return !q || (x.t + ' ' + x.s).toLowerCase().indexOf(q) !== -1; });
        qPop.innerHTML = m.map(function (x) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
      }
      qIn.addEventListener('focus', function () { renderQ(qIn.value); });
      qIn.addEventListener('input', function () { renderQ(qIn.value); });
      qPop.addEventListener('click', function (e) {
        var b = e.target.closest('[data-jump]');
        if (!b) return;
        var el = document.querySelector(b.getAttribute('data-jump'));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        qPop.classList.remove('open');
      });
      document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
      });

      /* Stress Checkboxes */
      function refreshStress() {
        var boxes = document.querySelectorAll('[data-stress]'), done = 0;
        for (var i = 0; i < boxes.length; i++) if (boxes[i].checked) done++;
        document.getElementById('stressDoneChip').textContent = '压测复核：' + done + ' / ' + boxes.length + ' 已阅';
      }
      try {
        var savedS = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
        document.querySelectorAll('[data-stress]').forEach(function (chk) {
          var k = chk.getAttribute('data-stress');
          chk.checked = !!savedS[k];
          chk.addEventListener('change', function () {
            savedS[k] = chk.checked;
            try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedS)); } catch (err) {}
            refreshStress();
          });
        });
        refreshStress();
      } catch (e) {}

      document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
        if (window.innerWidth <= 1023) document.body.classList.toggle('drawer-open');
        else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(drawAll, 60); }
      });
      document.getElementById('drawerBackdrop').addEventListener('click', function () { document.body.classList.remove('drawer-open'); });
      document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
      
      
      
      
      document.getElementById('langZhBtn').addEventListener('click', function () { applyLang('zh', false); });
      document.getElementById('langEnBtn').addEventListener('click', function () { applyLang('en', false); });

      window.addEventListener('scroll', function () {
        var dh = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        document.getElementById('readingProgressBar').style.width = Math.min(100, (window.scrollY / dh) * 100) + '%';
      }, { passive: true });

      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {}

      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 80); });
      updateSim();
      drawAll();
    })();
  