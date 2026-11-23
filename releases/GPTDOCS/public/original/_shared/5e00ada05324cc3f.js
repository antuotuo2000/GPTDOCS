
    (function () {
      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';
      var STORAGE_STRESS_KEY = 'ko_munger_checklist_v2';

      var state = {
        theme: document.documentElement.getAttribute('data-theme') || 'dark',
        lang: 'zh',
        activeRule: 0,
        peerFilter: 'all',
        peerQuery: ''
      };

      function showToast(msg) {
        var el = document.getElementById('muiSnackbar');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(showToast._t);
        showToast._t = setTimeout(function () { el.classList.remove('show'); }, 2200);
      }

      // 1. Sidebar Drawer / Collapse Toggle
      var sidebarBtn = document.getElementById('sidebarToggleBtn');
      var sidebarEl = document.getElementById('muiSidebar');
      var backdropEl = document.getElementById('drawerBackdrop');
      if (sidebarBtn) {
        sidebarBtn.addEventListener('click', function () {
          if (window.innerWidth <= 1060) {
            var isOpen = sidebarEl.classList.toggle('open');
            backdropEl.classList.toggle('open', isOpen);
          } else {
            var collapsed = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
            if (collapsed) {
              document.documentElement.removeAttribute('data-sidebar-collapsed');
              try { localStorage.setItem(STORAGE_SIDEBAR_KEY, '0'); } catch (e) {}
            } else {
              document.documentElement.setAttribute('data-sidebar-collapsed', '1');
              try { localStorage.setItem(STORAGE_SIDEBAR_KEY, '1'); } catch (e) {}
            }
            setTimeout(drawAllCharts, 60);
          }
        });
      }
      if (backdropEl) {
        backdropEl.addEventListener('click', function () {
          sidebarEl.classList.remove('open');
          backdropEl.classList.remove('open');
        });
      }

      // 2. MUI Theme Toggle (Sapphire Light <-> Obsidian Dark)
      function applyTheme(t, silent) {
        state.theme = t === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        var iconSpan = document.getElementById('themeIconSpan');
        if (iconSpan) {
          iconSpan.innerHTML = state.theme === 'dark'
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        }
        drawAllCharts();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至 MUI 深色黑曜石主题' : '已切换至 MUI 官方浅色主题');
      }
      document.getElementById('themeToggle').addEventListener('click', function () {
        var next = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next, false);
        try { localStorage.setItem(STORAGE_THEME_KEY, next); } catch (e) {}
      });

      // 3. Language Toggle
      function applyLang(lang, silent) {
        state.lang = lang === 'en' ? 'en' : 'zh';
        document.getElementById('langZhBtn').classList.toggle('active', state.lang === 'zh');
        document.getElementById('langEnBtn').classList.toggle('active', state.lang === 'en');
        document.querySelectorAll('[data-i18n-zh]').forEach(function (node) {
          var txt = node.getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
          if (txt) node.textContent = txt;
        });
        if (!silent) showToast(state.lang === 'en' ? 'Switched UI labels to English' : '已切换为中文界面');
      }
      document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-lang]');
        if (!btn) return;
        var l = btn.getAttribute('data-lang');
        applyLang(l, false);
        try { localStorage.setItem(STORAGE_LANG_KEY, l); } catch (err) {}
      });

      // 4. Standalone HTML Export
      void 0;

      // 5. Quick Jump Search (Cmd/Ctrl+K)
      var jumpIndex = [
        { title: '01 · 1996 格洛茨思想实验与五大原则', kw: 'glotz 1996 五大原则 思想实验 munger', href: '#sec-thesis' },
        { title: '02 · 伽利略数学：2.92万亿杯与$1170亿净利', kw: '2.92 64盎司 数学 2034 4美分', href: '#sec-glotz-math' },
        { title: '03 · Lollapalooza 七大心理与经济驱动力', kw: 'lollapalooza 巴甫洛夫 社会认同 人类误判心理学 自催化', href: '#sec-lollapalooza' },
        { title: '04 · 浓缩液轻资产收费站 vs 特许装瓶商', kw: '浓缩液 装瓶 refranchising ccba 利润率 62% 31.2%', href: '#sec-economics' },
        { title: '05 · 伯克希尔 38 年复利总账 ($848M 股息)', kw: 'berkshire 巴菲特 65.2% 股息 1.3b 4亿股', href: '#sec-berkshire' },
        { title: '06 · 雅可比逆向排雷：New Coke / IRS / GLP-1', kw: 'new coke irs 税务 180亿 bodyarmor fairlife glp-1 zero sugar', href: '#sec-inversion' },
        { title: '07 · 同行对标矩阵 (KO vs PEP vs MNST) & 估值模拟', kw: '百事 怪兽 pep mnst 28.9x 三个篮子 估值 模拟器', href: '#sec-valuation' },
        { title: '08 · 权威财报与文献核验索引', kw: '信源 财报 文献 pdf', href: '#sec-sources' }
      ];
      var qInput = document.getElementById('quickJumpInput');
      var qPop = document.getElementById('quickJumpPopover');
      function renderJumpList(q) {
        var term = (q || '').trim().toLowerCase();
        var hits = jumpIndex.filter(function (it) {
          return !term || it.title.toLowerCase().indexOf(term) !== -1 || it.kw.indexOf(term) !== -1;
        });
        qPop.innerHTML = hits.map(function (it) {
          return '<a class="jump-item" href="' + it.href + '">' + it.title + '</a>';
        }).join('') || '<div style="padding:8px 10px;font-size:0.78rem;color:var(--text-muted);">未匹配到对应章节</div>';
      }
      qInput.addEventListener('focus', function () { renderJumpList(qInput.value); qPop.classList.add('open'); });
      qInput.addEventListener('input', function () { renderJumpList(qInput.value); qPop.classList.add('open'); });
      qPop.addEventListener('click', function (e) { if (e.target.closest('.jump-item')) qPop.classList.remove('open'); });
      document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open'); });
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qInput.focus(); }
      });

      // 6. Chapter 01 — 5 Helpful Notions Inspector
      var metaRules = [
        {
          step: 'NOTION 01 · SIMPLIFICATION',
          title: '简化问题：先砍掉枝节噪音，锁定四个“显而易见的大是非（Big No-Brainers）”',
          body: '芒格接手格洛茨难题的第一步，是确立四条不可妥协的底层公理：① 卖无商标的大宗汽水绝不可能值 2 万亿美元，必须将“Coca-Cola”铸造成受全球法律严密保护的排他商标，甚至决不允许任何“Peppy Cola”搭便车稀释半个名字；② 任何初创企业都无法一夜铺满全球，必须先在亚特兰大单城打透再渐进复制；③ 口味必须普世皆宜且“绝无甜腻余味”，让消费者在酷暑中能一瓶接一瓶畅饮；④ 遵循亚里士多德消除嫉妒的原则——用狂热的品质一致性与极低廉公道的单价“配得上自己的成功”。',
          formula: '商标排他性 × 零余味高频复购 × 普惠低客单价 = 消除竞争替代与社会嫉妒'
        },
        {
          step: 'NOTION 02 · GALILEO NUMERICAL FLUENCY',
          title: '伽利略的数学态度：用初等算术从人类生理极限倒推终局天花板',
          body: '无需商学院复杂的微积分或 Beta 回归，芒格只用一道初等乘法便看穿了 150 年后的终局：到 2034 年全球约 80 亿消费者 × 每人每天生理必需摄入 64 盎司水（8 个 8盎司标准杯）= 每年 23.36 万亿杯总摄水量；只要新型风味饮料替代其中 25% 的白水，而可口可乐占据一半份额（即全球人均每天喝 1 杯可口可乐旗下饮品），年物理销量即达 2.92 万亿杯；每杯只需净赚 4 美分，年净利润就高达 1,170 亿美元，足以稳健支撑 2 万亿美元市值。',
          formula: '80亿人 × 365天 × 1杯/天 × $0.04/杯净利 = $1,168亿净利润 → $2.0万亿市值 (~17.1x P/E)'
        },
        {
          step: 'NOTION 03 · JACOBI INVERSION',
          title: '雅可比逆向思维：“先告诉我可口可乐会死在哪里，我就永远不去那里”',
          body: '正向规划容易陷入盲目乐观，逆向排雷才能守住百年基业。芒格列出了足以亲手毁掉可口可乐的四条死路：① 饮后口干甜腻导致复购中断；② 商标保护松懈沦为行业通用词（如同阿司匹林或自动扶梯丧失商标权）；③ 暴利提价激起公众反感与监管重锤；④ 在原味已统治消费者潜意识后妄图大改配方——1985 年“新可乐（New Coke）”盲测虽胜出却险些葬送公司，正是忽略了人类本能的“剥夺超级反应综合征”。',
          formula: '避免愚蠢（守住红罐经典配方 + 严控提价节奏 + 商标铁壁） > 追求聪明'
        },
        {
          step: 'NOTION 04 · MULTIDISCIPLINARY WISDOM',
          title: '跨学科基础学术智慧：打通生物学、心理学、微观经济学与化学自催化',
          body: '芒格批判大学科系画地为牢，主张直接跨学科调用最硬核的基础原理：从进化生物学借用达尔文神经预设（人类对甜味、果香与清凉的先天偏好）；从心理学借用巴甫洛夫联想与斯金纳操作强化；从微观经济学借用特许装瓶网络规模效应；从化学借用“自催化（Autocatalysis）”反应——当品牌心智与街头冰柜密度跨过临界点后，销售周转、装瓶商利润与广告投入便会进入无需外力推拉的自我加速循环。',
          formula: '生物学本能 + 心理学反射 + 经济学规模优势 + 化学自催化 = 跨学科格栅护城河'
        },
        {
          step: 'NOTION 05 · LOLLAPALOOZA EFFECT',
          title: 'Lollapalooza 效应：多种力量同向叠加引爆的核聚变级商业奇迹',
          body: '正如当年根治肺结核必须同时联用三种药物一样，商业世界里最极端的超额回报永远来自 4–7 种独立驱动力在同一时刻、朝着同一个行为靶点同向发力。当“四重生理提神奖赏 + 巴甫洛夫快乐联想 + 22亿杯社会认同从众 + 30秒触手可及的冰柜网络 + 62%毛利浓缩液收费站”同时作用于消费者伸手拿饮料的那一秒时，任何竞争对手即便砸下百亿美元资本也无法撼动其分毫。',
          formula: 'Lollapalooza 非线性总合力 ≫ ∑ 单一竞争优势的简单算术加总'
        }
      ];
      function renderMetaRule(idx) {
        state.activeRule = idx;
        document.querySelectorAll('#metaRuleTabs .bm-node-btn').forEach(function (b, i) {
          b.classList.toggle('active', i === idx);
        });
        var r = metaRules[idx];
        document.getElementById('metaRuleDetail').innerHTML =
          '<span class="mui-chip mui-chip-primary mono" style="margin-bottom:8px;">' + r.step + '</span>' +
          '<h3 style="font-size:1.05rem;font-weight:800;margin-bottom:8px;color:var(--text-primary);">' + r.title + '</h3>' +
          '<p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.72;">' + r.body + '</p>' +
          '<div style="margin-top:12px;padding:9px 13px;border-radius:9px;background:var(--mui-primary-bg);border-left:3px solid var(--mui-primary-main);font-size:0.80rem;font-weight:700;color:var(--mui-primary-lighter);" class="mono">' + r.formula + '</div>';
      }
      document.getElementById('metaRuleTabs').addEventListener('click', function (e) {
        var btn = e.target.closest('[data-rule]');
        if (!btn) return;
        renderMetaRule(parseInt(btn.getAttribute('data-rule'), 10));
      });
      renderMetaRule(0);

      // 7. Chapter 02 — Glotz 2034 Funnel Calculator
      var gPop = document.getElementById('gPop');
      var gCat = document.getElementById('gCat');
      var gShare = document.getElementById('gShare');
      var gCents = document.getElementById('gCents');

      function updateGlotzFunnel() {
        var pop = parseFloat(gPop.value);
        var catPct = parseFloat(gCat.value) / 100;
        var sharePct = parseFloat(gShare.value) / 100;
        var cents = parseFloat(gCents.value);

        document.getElementById('gPopVal').textContent = pop.toFixed(1) + 'B';
        document.getElementById('gCatVal').textContent = (catPct * 100).toFixed(0) + '%';
        document.getElementById('gShareVal').textContent = (sharePct * 100).toFixed(0) + '%';
        document.getElementById('gCentsVal').textContent = cents.toFixed(1) + '¢';

        var totalWaterT = pop * 8 * 365 / 1000;
        var catT = totalWaterT * catPct;
        var koT = catT * sharePct;
        var netProfitB = koT * 1000 * (cents / 100);
        var valT = (netProfitB * 17.1) / 1000;

        document.getElementById('glotzFunnelSteps').innerHTML =
          '<div class="bm-tier-card"><div class="bm-tier-top"><span>① 人类年度生理总摄水量 (8杯×8盎司/天)</span><span class="mono">' + totalWaterT.toFixed(2) + ' 万亿杯/年</span></div></div>' +
          '<div class="bm-tier-card"><div class="bm-tier-top"><span>② 全球风味饮料总池容量 (' + (catPct * 100).toFixed(0) + '%)</span><span class="mono">' + catT.toFixed(2) + ' 万亿杯/年</span></div></div>' +
          '<div class="bm-tier-card"><div class="bm-tier-top"><span>③ 可口可乐年度物理总杯数 (' + (sharePct * 100).toFixed(0) + '% 份额)</span><span class="mono" style="color:var(--mui-primary-lighter);">' + koT.toFixed(2) + ' 万亿杯/年</span></div></div>' +
          '<div class="bm-tier-card" style="margin-bottom:0;background:var(--mui-primary-bg);border-color:var(--mui-primary-border);"><div class="bm-tier-top"><span>④ 2034E 年度净利润 → 隐含估值 (~17.1x P/E)</span><span class="mono" style="color:var(--mui-primary-lighter);">$' + netProfitB.toFixed(0) + 'B → $' + valT.toFixed(2) + ' 万亿</span></div><div class="bm-tier-desc">芒格 1996 基准：2.92 万亿杯 × 4.0¢ = $116.8B (约 $1,170亿净利) → 支撑 $2.00 万亿美元市值</div></div>';
      }
      [gPop, gCat, gShare, gCents].forEach(function (el) { el.addEventListener('input', updateGlotzFunnel); });
      document.getElementById('resetGlotzBtn').addEventListener('click', function () {
        gPop.value = '8.0'; gCat.value = '25'; gShare.value = '50'; gCents.value = '4.0';
        updateGlotzFunnel();
        showToast('已恢复芒格 1996 演讲原始参数');
      });
      updateGlotzFunnel();

      // 8. Chapter 03 — Lollapalooza 7 Forces (preserving IDs)
      var forces = [
        { id: 'habit', title: '1. 操作性条件反射（斯金纳四重生理奖赏）', desc: '甜味信号 + 气泡芳香刺激 + 咖啡因提神 + 冰镇物理降温，且零甜腻余味，驱动日复一日高频复购。', weight: 1.36, active: true },
        { id: 'pavlov', title: '2. 巴甫洛夫经典条件反射（替代性情感奖赏）', desc: '百年营销将红白商标与世界杯、奥运、青春欢聚深度绑定，看见视觉符号即触发潜意识愉悦渴望。', weight: 1.34, active: true },
        { id: 'social', title: '3. 社会认同倾向（Social Proof 从众验证）', desc: '全球 200+ 国家日均 22 亿杯公开消费形成强大示范效应，消除新市场决策摩擦并锁定餐饮标配地位。', weight: 1.28, active: true },
        { id: 'avail', title: '4. 物理与心智可得性（"Within Arm\'s Reach"）', desc: '数千万台冷柜、现调机与售货机覆盖全球毛细血管，在冲动消退前 30 秒内完成即时转化。', weight: 1.32, active: true },
        { id: 'autocat', title: '5. 化学自催化飞轮（Autocatalysis 自增强）', desc: '高周转降低装瓶商单车配送成本→增强冰柜排他垄断→反哺母公司巨额品牌投放，形成正向自循环。', weight: 1.30, active: true },
        { id: 'pricing', title: '6. 轻资产浓缩液收费站与抗通胀定价权', desc: '重资产交由特许装瓶商承担，母公司独享 62.2% 毛利率，无需大额资本开支即可随通胀稳步提价。', weight: 1.35, active: true },
        { id: 'inversion', title: '7. 剥夺超级反应护栏（1985 New Coke 铁律）', desc: '消费者对经典口味的情感占有欲构成极高转换壁垒，既约束管理层不乱改配方，也屏蔽低价山寨。', weight: 1.18, active: true }
      ];
      var forceListEl = document.getElementById('forceList');
      forces.forEach(function (f) {
        var div = document.createElement('div');
        div.className = 'force-item active';
        div.innerHTML = '<div class="force-switch"></div><div><div class="force-title">' + f.title + '</div><div class="force-desc">' + f.desc + '</div></div>';
        div.addEventListener('click', function () {
          f.active = !f.active;
          div.classList.toggle('active', f.active);
          drawLollaCanvas();
        });
        forceListEl.appendChild(div);
      });

      // 9. Chapter 06 — Persistent LocalStorage Checklist
      try {
        var savedChk = JSON.parse(localStorage.getItem(STORAGE_STRESS_KEY) || '{}');
        document.querySelectorAll('[data-stress-chk]').forEach(function (chk) {
          var k = chk.getAttribute('data-stress-chk');
          chk.checked = !!savedChk[k];
          chk.addEventListener('change', function () {
            savedChk[k] = chk.checked;
            try { localStorage.setItem(STORAGE_STRESS_KEY, JSON.stringify(savedChk)); } catch (e) {}
            showToast(chk.checked ? '已纳入重点跟踪清单' : '已取消跟踪标记');
          });
        });
      } catch (e) {}

      // 10. Chapter 07 — Peer Comparison Matrix
      var peerData = [
        {
          name: 'The Coca-Cola Co. (NYSE: KO)',
          tags: ['light', 'div'],
          highlight: true,
          model: '浓缩液轻资产收费站 + 全球特许装瓶网',
          rev: '$47.9B (LTM $51.1B)',
          gm: '62.16%',
          om: '31.2% 可比 (Q2 26: 34.9%)',
          pe: '28.9x TTM',
          div: '2.11% / 连涨 64 年',
          verdict: '护城河满分；老股东永动机，新资金等好球区'
        },
        {
          name: '1988 伯克希尔建仓期 KO (历史基准)',
          tags: ['light', 'div'],
          highlight: false,
          model: '剥离低效副业聚焦全球浓缩液扩张 + 回购',
          rev: '~$8.3B (1988)',
          gm: '~61.0%',
          om: '~22.5% → 持续扩张',
          pe: '~14.5x 买入倍数',
          div: '起始 ~3.0% → 现 YoC 65.2%',
          verdict: '芒格教科书击球点（YES 篮子：好生意+好价格）'
        },
        {
          name: 'Monster Beverage (NASDAQ: MNST)',
          tags: ['light'],
          highlight: false,
          model: '轻资产能量饮料品牌 + 代工 + 共享 KO 装瓶网',
          rev: '$8.29B (LTM $9.22B)',
          gm: '55.26%',
          om: '29.2% (Q3 26: 28.0%)',
          pe: '30.2x Forward',
          div: '0% (净现金回购)',
          verdict: 'KO 持股 ~16.7%–20.9%，印证品牌轻资产高利润率'
        },
        {
          name: 'PepsiCo, Inc. (NASDAQ: PEP)',
          tags: ['div'],
          highlight: false,
          model: '咸味零食霸主 (Frito-Lay) + 北美重资产自营装瓶',
          rev: '$93.92B',
          gm: '~54.5%',
          om: '12.2% GAAP',
          pe: '15.3x Forward',
          div: '4.61% / 连涨 54 年',
          verdict: '重资产拉低营业利润率至 KO 的 ~40%，但估值较低'
        }
      ];

      function renderPeerTable() {
        var q = state.peerQuery.toLowerCase();
        var rows = peerData.filter(function (d) {
          var passFilter = state.peerFilter === 'all' || d.tags.indexOf(state.peerFilter) !== -1;
          var blob = (d.name + ' ' + d.model + ' ' + d.verdict + ' ' + d.om).toLowerCase();
          return passFilter && (!q || blob.indexOf(q) !== -1);
        });
        document.getElementById('peerTableBody').innerHTML = rows.map(function (d) {
          return '<tr class="' + (d.highlight ? 'is-primary-row' : '') + '">' +
            '<td><strong>' + d.name + '</strong></td>' +
            '<td>' + d.model + '</td>' +
            '<td class="mono">' + d.rev + '</td>' +
            '<td class="mono">' + d.gm + '</td>' +
            '<td class="mono">' + d.om + '</td>' +
            '<td class="mono">' + d.pe + '</td>' +
            '<td class="mono">' + d.div + '</td>' +
            '<td>' + d.verdict + '</td>' +
            '</tr>';
        }).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);">未匹配到对应样本</td></tr>';
      }
      document.getElementById('peerFilterGroup').addEventListener('click', function (e) {
        var b = e.target.closest('[data-filter]');
        if (!b) return;
        state.peerFilter = b.getAttribute('data-filter');
        document.querySelectorAll('#peerFilterGroup .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
        renderPeerTable();
      });
      document.getElementById('peerSearchInput').addEventListener('input', function (e) {
        state.peerQuery = e.target.value || '';
        renderPeerTable();
      });
      renderPeerTable();

      // 11. MUI Canvas Engine (Sapphire #0073E6 / #3399FF + Emerald #16A34A + Amber #D97706)
      function setupCanvas(id) {
        var canvas = document.getElementById(id);
        if (!canvas) return null;
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.parentElement.getBoundingClientRect();
        var w = Math.max(260, rect.width - 20);
        var h = Math.max(190, rect.height - 20);
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var isDark = state.theme === 'dark';
        var boost = document.documentElement.getAttribute('data-hud-mode') === 'boost';

        // Draw subtle 4-corner Sci-Fi HUD calibration brackets inside chart
        ctx.save();
        ctx.strokeStyle = isDark ? (boost ? 'rgba(0, 240, 255, 0.55)' : 'rgba(0, 240, 255, 0.32)') : 'rgba(0, 115, 230, 0.25)';
        ctx.lineWidth = 1.25;
        var bl = 8;
        ctx.beginPath();
        ctx.moveTo(2, 2 + bl); ctx.lineTo(2, 2); ctx.lineTo(2 + bl, 2);
        ctx.moveTo(w - 2 - bl, 2); ctx.lineTo(w - 2, 2); ctx.lineTo(w - 2, 2 + bl);
        ctx.moveTo(2, h - 2 - bl); ctx.lineTo(2, h - 2); ctx.lineTo(2 + bl, h - 2);
        ctx.moveTo(w - 2 - bl, h - 2); ctx.lineTo(w - 2, h - 2); ctx.lineTo(w - 2, h - 2 - bl);
        ctx.stroke();
        ctx.restore();

        if (isDark && !ctx._scifiWrapped) {
          ctx._scifiWrapped = true;
          var origFillRect = ctx.fillRect.bind(ctx);
          ctx.fillRect = function (rx, ry, rw, rh) {
            var curFill = ctx.fillStyle;
            if (typeof curFill === 'string' && Math.abs(rw) >= 6 && Math.abs(rh) >= 6 && curFill.indexOf('rgba') === -1) {
              ctx.save();
              var isHoriz = Math.abs(rw) > Math.abs(rh) * 1.35;
              var grad = isHoriz
                ? ctx.createLinearGradient(rx, ry, rx + rw, ry)
                : ctx.createLinearGradient(rx, ry, rx, ry + rh);
              if (isHoriz) {
                grad.addColorStop(0, 'rgba(0, 184, 255, 0.22)');
                grad.addColorStop(1, curFill);
              } else {
                grad.addColorStop(0, curFill);
                grad.addColorStop(1, 'rgba(0, 184, 255, 0.16)');
              }
              ctx.fillStyle = grad;
              origFillRect(rx, ry, rw, rh);
              ctx.shadowColor = curFill;
              ctx.shadowBlur = boost ? 14 : 8;
              ctx.fillStyle = '#E0FAFF';
              if (isHoriz) {
                var capX = rw >= 0 ? rx + rw - 2 : rx;
                origFillRect(capX, ry, 2, rh);
              } else {
                origFillRect(rx, ry, rw, 2.2);
              }
              ctx.restore();
              return;
            }
            origFillRect(rx, ry, rw, rh);
          };

          var origStroke = ctx.stroke.bind(ctx);
          ctx.stroke = function () {
            if (ctx.lineWidth >= 2 && typeof ctx.strokeStyle === 'string' && ctx.strokeStyle.indexOf('0.1') === -1) {
              ctx.save();
              ctx.shadowColor = ctx.strokeStyle;
              ctx.shadowBlur = boost ? 16 : 9;
              origStroke();
              ctx.restore();
              return;
            }
            origStroke();
          };
        }

        return { ctx: ctx, w: w, h: h };
      }

      function muiColors() {
        var dark = state.theme === 'dark';
        return {
          text: dark ? '#F0F7FF' : '#071426',
          muted: dark ? '#7FA0C0' : '#526B84',
          grid: dark ? 'rgba(0, 240, 255, 0.13)' : 'rgba(0, 115, 230, 0.14)',
          primary: dark ? '#00E5FF' : '#0073E6',
          primarySoft: dark ? '#67E8F9' : '#0284C7',
          primaryFill: dark ? 'rgba(0, 229, 255, 0.22)' : 'rgba(0, 115, 230, 0.16)',
          success: dark ? '#34F5B5' : '#0D9488',
          warning: dark ? '#FFD166' : '#D97706',
          warningFill: dark ? 'rgba(255, 209, 102, 0.16)' : 'rgba(217, 119, 6, 0.12)',
          error: dark ? '#FF5C8A' : '#C62828'
        };
      }

      function drawGlotzChart() {
        var s = setupCanvas('glotzChart');
        if (!s) return;
        var ctx = s.ctx, w = s.w, h = s.h, col = muiColors();
        var pad = { l: 50, r: 16, t: 26, b: 30 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var pts = [
          { yr: '1996', munger: 125, actual: 125 },
          { yr: '2006', munger: 270, actual: 112 },
          { yr: '2016', munger: 583, actual: 180 },
          { yr: '2026', munger: 1258, actual: 428 },
          { yr: '2034E', munger: 2000, actual: null }
        ];
        var maxV = 2150;

        ctx.strokeStyle = col.grid;
        ctx.lineWidth = 1;
        for (var i = 0; i <= 4; i++) {
          var gy = pad.t + (ph / 4) * i;
          ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
          ctx.fillStyle = col.muted;
          ctx.font = '11px monospace';
          ctx.textAlign = 'right';
          ctx.fillText('$' + Math.round(maxV * (1 - i / 4)) + 'B', pad.l - 6, gy + 4);
        }

        ctx.save();
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = col.primary;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        pts.forEach(function (p, idx) {
          var x = pad.l + (pw * idx) / (pts.length - 1);
          var y = pad.t + ph - (p.munger / maxV) * ph;
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = col.success;
        ctx.lineWidth = 3;
        ctx.beginPath();
        pts.forEach(function (p, idx) {
          if (p.actual === null) return;
          var x = pad.l + (pw * idx) / (pts.length - 1);
          var y = pad.t + ph - (p.actual / maxV) * ph;
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();

        pts.forEach(function (p, idx) {
          var x = pad.l + (pw * idx) / (pts.length - 1);
          var ym = pad.t + ph - (p.munger / maxV) * ph;
          ctx.fillStyle = col.primary;
          ctx.beginPath(); ctx.arc(x, ym, 4, 0, Math.PI * 2); ctx.fill();

          if (p.actual !== null) {
            var ya = pad.t + ph - (p.actual / maxV) * ph;
            ctx.fillStyle = col.success;
            ctx.beginPath(); ctx.arc(x, ya, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.font = 'bold 11px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('$' + p.actual + 'B', x, ya + 16);
          }
          ctx.fillStyle = col.muted;
          ctx.font = '11px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(p.yr, x, h - 8);
        });

        ctx.textAlign = 'left';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = col.primary;
        ctx.fillText('--- 芒格 1996 年化 8% 终局线 ($2,000B)', pad.l + 8, 14);
        ctx.fillStyle = col.success;
        ctx.fillText('─── KO 实绩纯市值 (不含千亿分红再投)', pad.l + 8, 29);
      }

      function drawLollaCanvas() {
        var s = setupCanvas('lollaCanvas');
        if (!s) return;
        var ctx = s.ctx, w = s.w, h = s.h, col = muiColors();
        var active = forces.filter(function (f) { return f.active; });
        var mult = active.reduce(function (acc, f) { return acc * (1 + (f.weight - 1) * 0.82); }, 1);
        document.getElementById('lollaScoreBadge').textContent =
          '激活 ' + active.length + '/7 因子 · 共振乘数 ' + mult.toFixed(2) + 'x';

        var pad = { l: 42, r: 16, t: 24, b: 28 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;

        ctx.strokeStyle = col.grid;
        for (var i = 0; i <= 4; i++) {
          var gy = pad.t + (ph / 4) * i;
          ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        }

        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = col.muted;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var j = 0; j <= 24; j++) {
          var t0 = j / 24;
          var x0 = pad.l + pw * t0;
          var y0 = pad.t + ph - ((t0 * 1.35) / 4.2) * ph;
          j === 0 ? ctx.moveTo(x0, y0) : ctx.lineTo(x0, y0);
        }
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = col.primary;
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        for (var k = 0; k <= 24; k++) {
          var t = k / 24;
          var x = pad.l + pw * t;
          var v = 1 + (mult - 1) * Math.pow(t, 1.8);
          var y = pad.t + ph - Math.min(1, (v - 1) / 4.2) * ph;
          k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = col.primary;
        ctx.font = 'bold 11.5px sans-serif';
        ctx.fillText('─── Lollapalooza 多力非线性共振 (' + mult.toFixed(2) + 'x)', pad.l + 8, 15);
        ctx.fillStyle = col.muted;
        ctx.fillText('--- 单因子线性增长基准', pad.l + 8, 30);
        ctx.font = '11px monospace';
        ctx.fillText('心智渗透与装瓶网络自催化周期 (10Y → 50Y → 100Y)', pad.l + 8, h - 8);
      }

      function drawMarginChart() {
        var s = setupCanvas('marginChart');
        if (!s) return;
        var ctx = s.ctx, w = s.w, h = s.h, col = muiColors();
        var items = [
          { label: 'KO (FY25 可比)', gm: 62.2, om: 31.2 },
          { label: 'KO (Q2 26 峰值)', gm: 63.0, om: 34.9 },
          { label: 'MNST (FY25)', gm: 55.3, om: 29.2 },
          { label: 'PEP (FY25 重资产)', gm: 54.5, om: 12.2 }
        ];
        var pad = { l: 42, r: 12, t: 28, b: 32 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var maxV = 70;

        ctx.strokeStyle = col.grid;
        for (var i = 0; i <= 4; i++) {
          var gy = pad.t + (ph / 4) * i;
          ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
          ctx.fillStyle = col.muted;
          ctx.font = '10.5px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(Math.round(maxV * (1 - i / 4)) + '%', pad.l - 5, gy + 4);
        }

        var grpW = pw / items.length;
        var bw = Math.min(24, grpW * 0.28);
        items.forEach(function (it, idx) {
          var cx = pad.l + grpW * (idx + 0.5);
          var hGm = (it.gm / maxV) * ph;
          var hOm = (it.om / maxV) * ph;

          ctx.fillStyle = col.primary;
          ctx.fillRect(cx - bw - 2, pad.t + ph - hGm, bw, hGm);
          ctx.fillStyle = idx === 3 ? col.warning : col.success;
          ctx.fillRect(cx + 2, pad.t + ph - hOm, bw, hOm);

          ctx.fillStyle = col.text;
          ctx.font = 'bold 10.5px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(it.gm.toFixed(1) + '%', cx - bw / 2 - 2, pad.t + ph - hGm - 5);
          ctx.fillText(it.om.toFixed(1) + '%', cx + bw / 2 + 2, pad.t + ph - hOm - 5);

          ctx.fillStyle = col.muted;
          ctx.font = '11px sans-serif';
          ctx.fillText(it.label, cx, h - 9);
        });

        ctx.textAlign = 'left';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = col.primary;
        ctx.fillText('■ 毛利率 (Gross Margin)', pad.l + 6, 15);
        ctx.fillStyle = col.success;
        ctx.fillText('■ 营业利润率 (Op Margin)', pad.l + 156, 15);
      }

      function drawGrowthMixChart() {
        var s = setupCanvas('growthMixChart');
        if (!s) return;
        var ctx = s.ctx, w = s.w, h = s.h, col = muiColors();
        var bars = [
          { p: 'FY2025 全年', vol: 0.0, pm: 4.0 },
          { p: 'Q2 2026', vol: 5.0, pm: 2.0 },
          { p: 'Q3 2026', vol: 5.0, pm: 1.0 },
          { p: 'Zero Sugar Q3', vol: 16.0, pm: 1.0 }
        ];
        var pad = { l: 42, r: 14, t: 28, b: 32 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var maxV = 19;

        ctx.strokeStyle = col.grid;
        for (var i = 0; i <= 4; i++) {
          var gy = pad.t + (ph / 4) * i;
          ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
          ctx.fillStyle = col.muted;
          ctx.font = '10.5px monospace';
          ctx.textAlign = 'right';
          ctx.fillText('+' + Math.round(maxV * (1 - i / 4)) + '%', pad.l - 5, gy + 4);
        }

        var grpW = pw / bars.length;
        var bw = Math.min(26, grpW * 0.30);
        bars.forEach(function (b, idx) {
          var cx = pad.l + grpW * (idx + 0.5);
          var hVol = (b.vol / maxV) * ph;
          var hPm = (b.pm / maxV) * ph;

          ctx.fillStyle = col.primary;
          ctx.fillRect(cx - bw - 2, pad.t + ph - Math.max(2, hVol), bw, Math.max(2, hVol));
          ctx.fillStyle = col.success;
          ctx.fillRect(cx + 2, pad.t + ph - hPm, bw, hPm);

          ctx.fillStyle = col.text;
          ctx.font = 'bold 10.5px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('+' + b.vol + '%', cx - bw / 2 - 2, pad.t + ph - hVol - 5);
          ctx.fillText('+' + b.pm + '%', cx + bw / 2 + 2, pad.t + ph - hPm - 5);

          ctx.fillStyle = col.muted;
          ctx.font = '11px sans-serif';
          ctx.fillText(b.p, cx, h - 9);
        });

        ctx.textAlign = 'left';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = col.primary;
        ctx.fillText('■ 真实箱体销量增速 (Volume)', pad.l + 6, 15);
        ctx.fillStyle = col.success;
        ctx.fillText('■ 价格/组合贡献 (Price/Mix)', pad.l + 182, 15);
      }

      function drawBrkDivChart() {
        var s = setupCanvas('divCanvas');
        if (!s) return;
        var ctx = s.ctx, w = s.w, h = s.h, col = muiColors();
        var data = [
          { yr: '1994', div: 75, yoc: 5.8 },
          { yr: '2004', div: 200, yoc: 15.4 },
          { yr: '2014', div: 488, yoc: 37.5 },
          { yr: '2022', div: 704, yoc: 54.2 },
          { yr: '2025', div: 816, yoc: 62.8 },
          { yr: '2026E', div: 848, yoc: 65.2 }
        ];
        var pad = { l: 46, r: 16, t: 26, b: 30 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var maxV = 960;

        ctx.strokeStyle = col.grid;
        for (var i = 0; i <= 4; i++) {
          var gy = pad.t + (ph / 4) * i;
          ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        }

        var grpW = pw / data.length;
        var bw = Math.min(36, grpW * 0.54);
        data.forEach(function (d, idx) {
          var cx = pad.l + grpW * (idx + 0.5);
          var bh = (d.div / maxV) * ph;
          var x = cx - bw / 2, y = pad.t + ph - bh;
          ctx.fillStyle = idx === data.length - 1 ? col.success : col.primary;
          ctx.fillRect(x, y, bw, bh);

          ctx.fillStyle = col.text;
          ctx.font = 'bold 10.5px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('$' + d.div + 'M', cx, y - 15);
          ctx.fillStyle = col.success;
          ctx.fillText(d.yoc + '%', cx, y - 3);

          ctx.fillStyle = col.muted;
          ctx.font = '11px monospace';
          ctx.fillText(d.yr, cx, h - 8);
        });
      }

      function drawFcfChart() {
        var s = setupCanvas('fcfCanvas');
        if (!s) return;
        var ctx = s.ctx, w = s.w, h = s.h, col = muiColors();
        var data = [
          { lbl: 'FY25 账面', val: 5.3, c: col.warning },
          { lbl: 'FY25 还原常态', val: 11.4, c: col.primary },
          { lbl: 'FY26 初次指引', val: 12.2, c: col.primary },
          { lbl: 'FY26 Q3上调', val: 13.0, c: col.success },
          { lbl: '26E 总分红支出', val: 9.12, c: col.muted }
        ];
        var pad = { l: 44, r: 14, t: 26, b: 30 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var maxV = 15.0;

        ctx.strokeStyle = col.grid;
        for (var i = 0; i <= 3; i++) {
          var gy = pad.t + (ph / 3) * i;
          ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        }

        var grpW = pw / data.length;
        var bw = Math.min(38, grpW * 0.52);
        data.forEach(function (d, idx) {
          var cx = pad.l + grpW * (idx + 0.5);
          var bh = (d.val / maxV) * ph;
          ctx.fillStyle = d.c;
          ctx.fillRect(cx - bw / 2, pad.t + ph - bh, bw, bh);

          ctx.fillStyle = col.text;
          ctx.font = 'bold 10.5px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('$' + d.val.toFixed(1) + 'B', cx, pad.t + ph - bh - 5);
          ctx.fillStyle = col.muted;
          ctx.font = '10.5px sans-serif';
          ctx.fillText(d.lbl, cx, h - 8);
        });
      }

      // 12. Chapter 07 — Three-Baskets Valuation Simulator
      var sYears = document.getElementById('sYears');
      var sGrowth = document.getElementById('sGrowth');
      var sEntry = document.getElementById('sEntry');
      var sExit = document.getElementById('sExit');

      var presets = {
        brk1988: { yrs: 25, g: 9.0, peIn: 14.5, peOut: 25.0 },
        base2026: { yrs: 20, g: 6.0, peIn: 28.9, peOut: 23.0 },
        bull2026: { yrs: 20, g: 7.5, peIn: 28.9, peOut: 27.5 },
        bear2026: { yrs: 10, g: 4.0, peIn: 28.9, peOut: 19.0 }
      };

      document.getElementById('simPresetGroup').addEventListener('click', function (e) {
        var b = e.target.closest('[data-preset]');
        if (!b) return;
        var p = presets[b.getAttribute('data-preset')];
        if (!p) return;
        document.querySelectorAll('#simPresetGroup .mui-seg-btn').forEach(function (el) { el.classList.toggle('active', el === b); });
        sYears.value = String(p.yrs);
        sGrowth.value = String(p.g);
        sEntry.value = String(p.peIn);
        sExit.value = String(p.peOut);
        updateSimulator();
      });

      function updateSimulator() {
        var yrs = parseInt(sYears.value, 10);
        var g = parseFloat(sGrowth.value) / 100;
        var peIn = parseFloat(sEntry.value);
        var peOut = parseFloat(sExit.value);

        document.getElementById('vYears').textContent = yrs + ' 年';
        document.getElementById('vGrowth').textContent = (g * 100).toFixed(1) + '%';
        document.getElementById('vEntry').textContent = peIn.toFixed(1) + 'x';
        document.getElementById('vExit').textContent = peOut.toFixed(1) + 'x';

        var payout = 0.633;
        var startYield = payout / peIn;
        var endYoC = startYield * Math.pow(1 + g, yrs);
        var endPrice = 100 * Math.pow(1 + g, yrs) * (peOut / peIn);
        var cumDiv = 0;
        var pts = [{ t: 0, total: 100, price: 100 }];
        for (var t = 1; t <= yrs; t++) {
          cumDiv += 100 * startYield * Math.pow(1 + g, t);
          var curPe = peIn + (peOut - peIn) * (t / yrs);
          var pVal = 100 * Math.pow(1 + g, t) * (curPe / peIn);
          pts.push({ t: t, total: pVal + cumDiv, price: pVal });
        }
        var totalVal = endPrice + cumDiv;
        var cagr = Math.pow(totalVal / 100, 1 / yrs) - 1;
        var peImpact = Math.pow(peOut / peIn, 1 / yrs) - 1;

        document.getElementById('outYoC').textContent = (endYoC * 100).toFixed(1) + '%';
        document.getElementById('outStartYield').textContent = '起始股息率 ~' + (startYield * 100).toFixed(2) + '%';
        document.getElementById('outCagr').textContent = (cagr * 100).toFixed(2) + '%';
        document.getElementById('simNote').textContent = '估值变动影响 ' + (peImpact >= 0 ? '+' : '') + (peImpact * 100).toFixed(2) + '%/年';
        document.getElementById('simEndSummary').textContent = '期末总净值: ' + totalVal.toFixed(0) + '元 (纯股价 ' + endPrice.toFixed(0) + '元)';

        var banner = document.getElementById('basketVerdict');
        banner.className = 'basket-banner';
        if (cagr >= 0.095) {
          banner.classList.add('basket-yes');
          banner.textContent = '芒格三篮子判定：【YES / 重锤击球】伟大护城河与合理买入赔率共振，长期复利极为丰厚！';
        } else if (cagr >= 0.062) {
          banner.classList.add('basket-tough');
          banner.textContent = '芒格三篮子判定：【TOO TOUGH / 赔率偏紧】公司质地无可挑剔，但 28.9x 买入倍数透支部分涨幅，老股东长持、新资金宜等 ≤23x 回调。';
        } else {
          banner.classList.add('basket-no');
          banner.textContent = '芒格三篮子判定：【NO / 放弃当前赔率】估值压缩严重侵蚀内生增长，不符合安全边际原则。';
        }

        var s = setupCanvas('simCanvas');
        if (!s) return;
        var ctx = s.ctx, w = s.w, h = s.h, col = muiColors();
        var pad = { l: 48, r: 16, t: 24, b: 28 };
        var pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
        var maxY = Math.max(220, totalVal * 1.12);

        ctx.strokeStyle = col.grid;
        for (var i = 0; i <= 4; i++) {
          var gy = pad.t + (ph / 4) * i;
          ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
          ctx.fillStyle = col.muted;
          ctx.font = '10.5px monospace';
          ctx.textAlign = 'right';
          ctx.fillText(Math.round(maxY * (1 - i / 4)), pad.l - 5, gy + 4);
        }

        ctx.strokeStyle = col.success;
        ctx.lineWidth = 3;
        ctx.beginPath();
        pts.forEach(function (pt, idx) {
          var x = pad.l + (pw * pt.t) / yrs;
          var y = pad.t + ph - (pt.total / maxY) * ph;
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.strokeStyle = col.primary;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        pts.forEach(function (pt, idx) {
          var x = pad.l + (pw * pt.t) / yrs;
          var y = pad.t + ph - (pt.price / maxY) * ph;
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillStyle = col.success;
        ctx.fillText('─── 含累计分红总价值 (' + totalVal.toFixed(0) + '元)', pad.l + 8, 14);
        ctx.fillStyle = col.primary;
        ctx.fillText('─── 仅股价资本利得 (' + endPrice.toFixed(0) + '元)', pad.l + 8, 29);
        ctx.fillStyle = col.muted;
        ctx.font = '11px monospace';
        ctx.fillText('持有周期: 第 0 年 → 第 ' + yrs + ' 年', pad.l + 8, h - 8);
      }

      [sYears, sGrowth, sEntry, sExit].forEach(function (el) { el.addEventListener('input', updateSimulator); });

      function drawAllCharts() {
        drawGlotzChart();
        drawLollaCanvas();
        drawMarginChart();
        drawGrowthMixChart();
        drawBrkDivChart();
        drawFcfChart();
        updateSimulator();
      }

      // Scroll Progress & Active TOC Highlight
      var sections = ['sec-thesis', 'sec-glotz-math', 'sec-lollapalooza', 'sec-economics', 'sec-berkshire', 'sec-inversion', 'sec-valuation', 'sec-sources'];
      window.addEventListener('scroll', function () {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0;
        document.getElementById('scrollBeam').style.width = pct.toFixed(1) + '%';

        var currentId = sections[0];
        sections.forEach(function (id) {
          var el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) currentId = id;
        });
        document.querySelectorAll('#tocList .mui-nav-link').forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
        });
      }, { passive: true });

      // Cross-Tab Sync & Initial Boot
      window.addEventListener('storage', function (ev) {
        if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
        if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
      });

      try {
        var initT = (localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, '');
        applyTheme(initT, true);
        var initL = (localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, '');
        applyLang(initL, true);
      } catch (e) {
        drawAllCharts();
      }

      var hudOpticsBtn = document.getElementById('hudOpticsToggleBtn');
      function syncHudBtnLabel() {
        if (!hudOpticsBtn) return;
        var boosted = document.documentElement.getAttribute('data-hud-mode') === 'boost';
        var span = hudOpticsBtn.querySelector('span');
        if (span) {
          var zhTxt = boosted ? '◈ 全息视效: 超频 OVERDRIVE' : '◈ 全息视效: 标准 QUANTUM';
          var enTxt = boosted ? '◈ HUD OPTICS: OVERDRIVE' : '◈ HUD OPTICS: QUANTUM';
          span.setAttribute('data-i18n-zh', zhTxt);
          span.setAttribute('data-i18n-en', enTxt);
          span.textContent = state.lang === 'en' ? enTxt : zhTxt;
        }
      }
      if (hudOpticsBtn) {
        syncHudBtnLabel();
        hudOpticsBtn.addEventListener('click', function () {
          var boosted = document.documentElement.getAttribute('data-hud-mode') === 'boost';
          if (boosted) {
            document.documentElement.removeAttribute('data-hud-mode');
            try { localStorage.setItem('mui_scifi_hud_boost_v1', '0'); } catch (e) {}
            showToast(state.lang === 'en' ? 'Quantum HUD Standard Mode' : '已切换至标准全息量子视效');
          } else {
            document.documentElement.setAttribute('data-hud-mode', 'boost');
            try { localStorage.setItem('mui_scifi_hud_boost_v1', '1'); } catch (e) {}
            showToast(state.lang === 'en' ? 'Overdrive Holo-Grid Activated' : '已开启全息网格与霓虹超频视效');
          }
          syncHudBtnLabel();
          drawAllCharts();
        });
      }

      var resizeTimer = null;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawAllCharts, 80);
      });
    })();
  