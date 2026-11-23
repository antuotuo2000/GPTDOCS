
  (function () {
    'use strict';

    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_DENSITY_KEY = 'ti_mui_density_v1';
    var STORAGE_SIDEBAR_KEY = 'ti_mui_sidebar_collapsed_v1';

    var ALL_IPS = JSON.parse(document.getElementById('tiPillarsJson').textContent);
    var IP_MAP = {};
    for (var _i = 0; _i < ALL_IPS.length; _i++) {
      IP_MAP[ALL_IPS[_i].id] = ALL_IPS[_i];
    }

    var state = {
      ipId: ALL_IPS[0].id,
      catFilter: 'all',
      focusMode: false,
      density: 'relaxed',
      lang: 'zh',
      theme: 'light',
      ch1View: 'viewA',
      ch1Series: { s1: true, s2: true },
      activePillar: 0,
      radarSeries: { s0: true, s1: true, s2: true },
      peerFilter: 'all',
      peerQuery: '',
      epsSeries: { rev: true, oci: true },
      sim: {
        views: ALL_IPS[0].ch4.sim.presets.p2.views,
        v_per_view: ALL_IPS[0].ch4.sim.presets.p2.v_per_view,
        ancillary_m: ALL_IPS[0].ch4.sim.presets.p2.ancillary_m,
        years: ALL_IPS[0].ch4.sim.presets.p2.years,
        transmedia: ALL_IPS[0].ch4.sim.presets.p2.transmedia,
        preset: 'p2'
      },
      checks: [true, true, true, true, false, false]
    };

    function curIp() { return IP_MAP[state.ipId] || ALL_IPS[0]; }
    function isEn() { return state.lang === 'en'; }
    function safeGetStorage(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
    function safeSetStorage(key, val) { try { window.localStorage.setItem(key, val); } catch (e) {} }

    function loadChecksForIp(ip) {
      var raw = safeGetStorage(ip.checkKey);
      if (raw) {
        try {
          var parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length === ip.ch6.items_zh.length) return parsed.map(Boolean);
        } catch (e) {}
      }
      return [true, true, true, true, false, false];
    }

    var toastTimer = null;
    function showToast(msg) {
      var el = document.getElementById('muiSnackbar');
      if (!el) return;
      el.textContent = msg;
      el.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
    }

    function escapeHtml(str) {
      return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getRichMap(ip) {
      if (ip._richMap) return ip._richMap;
      var rm = {
        hero_h1: { zh: ip.hero.h1_zh, en: ip.hero.h1_en },
        lead_prose: { zh: ip.hero.lead_zh, en: ip.hero.lead_en },
        ch1_alert: { zh: ip.ch1.alert_zh, en: ip.ch1.alert_en },
        moat_pos: { zh: ip.ch4.moat_pos_zh, en: ip.ch4.moat_pos_en },
        moat_risk: { zh: ip.ch4.moat_risk_zh, en: ip.ch4.moat_risk_en }
      };
      for (var i = 0; i < ip.hero.kpis.length; i++) rm['kpi_desc_' + i] = { zh: ip.hero.kpis[i].desc_zh, en: ip.hero.kpis[i].desc_en || ip.hero.kpis[i].desc_zh };
      for (var j = 0; j < ip.ch1.principles.length; j++) rm['pr_desc_' + j] = { zh: ip.ch1.principles[j].desc_zh, en: ip.ch1.principles[j].desc_en || ip.ch1.principles[j].desc_zh };
      for (var k = 0; k < ip.ch1.matrix_cards.length; k++) rm['mc_body_' + k] = { zh: ip.ch1.matrix_cards[k].body_zh, en: ip.ch1.matrix_cards[k].body_en || ip.ch1.matrix_cards[k].body_zh };
      for (var a = 0; a < ip.ch5.acts.length; a++) rm['act_desc_' + a] = { zh: ip.ch5.acts[a].desc_zh, en: ip.ch5.acts[a].desc_en || ip.ch5.acts[a].desc_zh };
      for (var b = 0; b < ip.ch5.battles.length; b++) rm['bat_desc_' + b] = { zh: ip.ch5.battles[b].desc_zh, en: ip.ch5.battles[b].desc_en || ip.ch5.battles[b].desc_zh };
      ip._richMap = rm;
      return rm;
    }

    function biSpan(zh, en, cls, tag) {
      var t = tag || 'span';
      var eTxt = en || zh;
      var cAttr = cls ? (' class="' + cls + '"') : '';
      return '<' + t + cAttr + ' data-i18n-zh="' + escapeHtml(zh) + '" data-i18n-en="' + escapeHtml(eTxt) + '">' + escapeHtml(zh) + '</' + t + '>';
    }

    function buildSectionsHtmlForIp(ip) {
      var chipCls = ['mui-chip-primary', 'mui-chip-success', 'mui-chip-warning', 'mui-chip-violet'];
      var iconSvgs = [
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>',
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
      ];
      var iconStyles = [
        '',
        'style="color: var(--mui-success-text); background: var(--mui-success-bg); border-color: var(--mui-success-border);"',
        'style="color: var(--mui-warning-text); background: var(--mui-warning-bg); border-color: var(--mui-warning-border);"'
      ];

      var thesisHtml = ip.hero.thesis_cards.map(function (tc, i) {
        return '<div class="feature-card"><div class="mui-avatar-icon" ' + iconStyles[i % 3] + '>' + iconSvgs[i % 3] + '</div>' +
          biSpan(tc.title_zh, tc.title_en, '', 'h3') + biSpan(tc.desc_zh, tc.desc_en, '', 'p') + '</div>';
      }).join('');

      var kpiHtml = ip.hero.kpis.map(function (kp, i) {
        return '<div class="mui-paper mui-card-interactive kpi-card"><div class="kpi-top">' +
          biSpan(kp.label_zh, kp.label_en, 'kpi-label') +
          biSpan(kp.badge_zh, kp.badge_en, 'mui-chip ' + chipCls[i % 4] + ' mono') +
          '</div>' + biSpan(kp.val_zh, kp.val_en, 'kpi-value mono', 'div') +
          '<p class="kpi-desc" data-i18n-rich="kpi_desc_' + i + '">' + kp.desc_zh + '</p></div>';
      }).join('');

      var nodesHtml = ip.ch1.nodes.map(function (nd) {
        return '<div class="arch-node">' +
          biSpan(nd.tag_zh, nd.tag_en, 'arch-node-tag mono', 'div') +
          biSpan(nd.name_zh, nd.name_en, 'arch-node-name', 'div') +
          biSpan(nd.desc_zh, nd.desc_en || nd.desc_zh, 'arch-node-desc', 'div') + '</div>';
      }).join('');

      var pBarsHtml = ip.ch1.platform_bars.map(function (pb) {
        return '<div class="arch-platform">' + biSpan(pb.title_zh, pb.title_en, '', 'strong') + biSpan(pb.sub_zh, pb.sub_en || pb.sub_zh, '') + '</div>';
      }).join('');

      var prinHtml = ip.ch1.principles.map(function (pr, i) {
        return '<div class="feature-card">' + biSpan(pr.title_zh, pr.title_en, '', 'h3') + '<p data-i18n-rich="pr_desc_' + i + '">' + pr.desc_zh + '</p></div>';
      }).join('');

      var matHtml = ip.ch1.matrix_cards.map(function (mc, i) {
        return '<div class="matrix-card"><div class="matrix-card-head">' +
          biSpan(mc.title_zh, mc.title_en, 'matrix-card-title', 'div') +
          biSpan(mc.badge_zh, mc.badge_en, 'mui-chip ' + chipCls[i % 4] + ' mono') +
          '</div><p class="matrix-card-body" data-i18n-rich="mc_body_' + i + '">' + mc.body_zh + '</p>' +
          '<button type="button" class="collapse-toggle" data-collapse-target="matrixDetail' + (i + 1) + '"><span>展开微观机制拆解</span> <span>⌄</span></button>' +
          '<div id="matrixDetail' + (i + 1) + '" class="collapse-panel" data-i18n-zh="' + escapeHtml(mc.detail_zh) + '" data-i18n-en="' + escapeHtml(mc.detail_en) + '">' + escapeHtml(mc.detail_zh) + '</div></div>';
      }).join('');

      var pilHtml = ip.ch2.pillars.map(function (pl, i) {
        return '<button type="button" class="pillar-card' + (i === 0 ? ' active' : '') + '" data-pillar="' + i + '"><div class="pillar-head">' +
          biSpan(pl.title_zh, pl.title_en, 'pillar-title') +
          biSpan(pl.badge_zh, pl.badge_en, 'mui-chip ' + chipCls[i % 4] + ' mono') +
          '</div>' + biSpan(pl.desc_zh, pl.desc_en || pl.desc_zh, 'pillar-desc', 'p') + '</button>';
      }).join('');

      var econColors = ['var(--mui-primary-lighter)', 'var(--mui-success-text)', 'var(--mui-warning-text)', 'var(--mui-violet-text)'];
      var econHtml = ip.ch4.econ_cards.map(function (ec, i) {
        return '<div class="mui-paper kpi-card">' +
          biSpan(ec.label_zh, ec.label_en, 'kpi-label mono') +
          '<div class="kpi-value mono" style="color:' + econColors[i % 4] + ';" data-i18n-zh="' + escapeHtml(ec.val_zh) + '" data-i18n-en="' + escapeHtml(ec.val_en) + '">' + escapeHtml(ec.val_zh) + '</div>' +
          biSpan(ec.desc_zh, ec.desc_en || ec.desc_zh, 'kpi-desc', 'p') + '</div>';
      }).join('');

      var dotStyles = ['', 'style="background:#3399FF;"', 'style="background:#22C55E;"'];
      var actChips = ['mono', 'mui-chip-primary mono', 'mui-chip-success mono'];
      var actsHtml = ip.ch5.acts.map(function (act, i) {
        return '<div class="timeline-step"><span class="timeline-dot" ' + dotStyles[i % 3] + '></span>' +
          '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;margin-bottom:6px;">' +
          '<strong style="font-size:0.95rem;" data-i18n-zh="' + escapeHtml(act.title_zh) + '" data-i18n-en="' + escapeHtml(act.title_en) + '">' + escapeHtml(act.title_zh) + '</strong>' +
          biSpan(act.badge_zh, act.badge_en, 'mui-chip ' + actChips[i % 3]) +
          '</div><p style="font-size:0.84rem;color:var(--text-secondary);" data-i18n-rich="act_desc_' + i + '">' + act.desc_zh + '</p></div>';
      }).join('');

      var batChips = ['mui-chip-error', 'mui-chip-success', 'mui-chip-warning', 'mui-chip-primary'];
      var batsHtml = ip.ch5.battles.map(function (bat, i) {
        return '<div class="feature-card"><div style="display:flex;justify-content:space-between;align-items:center;">' +
          biSpan(bat.tag_zh, bat.tag_en, 'mui-chip ' + batChips[i % 4] + ' mono') +
          '<span class="mono" style="font-size:0.75rem;color:var(--text-muted);" data-i18n-zh="' + escapeHtml(bat.sub_zh) + '" data-i18n-en="' + escapeHtml(bat.sub_en) + '">' + escapeHtml(bat.sub_zh) + '</span>' +
          '</div>' + biSpan(bat.title_zh, bat.title_en || bat.title_zh, '', 'h3') + '<p data-i18n-rich="bat_desc_' + i + '">' + bat.desc_zh + '</p></div>';
      }).join('');

      var lawP = [['商业铁律一：', 'Law 01: '], ['商业铁律二：', 'Law 02: '], ['商业铁律三：', 'Law 03: ']];
      var lawsHtml = ip.ch5.laws.map(function (lw, i) {
        return '<div class="mui-alert"><div>' + biSpan(lawP[i % 3][0], lawP[i % 3][1], '', 'strong') + biSpan(lw.zh, lw.en, '') + '</div></div>';
      }).join('');

      var srcHtml = ip.sources.map(function (sr, idx) {
        var nStr = (idx + 1) < 10 ? ('0' + (idx + 1)) : String(idx + 1);
        return '<li><span class="mono">[' + nStr + ']</span><a href="' + escapeHtml(sr.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(sr.label) + ' ↗</a></li>';
      }).join('');

      var sc = ip.ch4.sim;
      var p1 = sc.presets.p1, p2 = sc.presets.p2, p3 = sc.presets.p3;
      var comboLineBadgeZh = ip.ch4.combo.line_badge_zh || (ip.ch4.combo.ref_line !== undefined ? ('--- ' + ip.ch4.combo.ref_line + (ip.ch4.combo.u_line || '%') + ' 基准线') : '');
      var comboLineBadgeEn = ip.ch4.combo.line_badge_en || (ip.ch4.combo.ref_line !== undefined ? ('--- ' + ip.ch4.combo.ref_line + (ip.ch4.combo.u_line || '%') + ' Benchmark') : '');

      return '<section id="sec-00" class="mui-paper hero-card section-block">' +
        '<div class="status-strip">' +
        biSpan(ip.hero.strip1_zh, ip.hero.strip1_en, 'mui-chip mui-chip-primary') +
        biSpan(ip.hero.strip2_zh, ip.hero.strip2_en, 'mui-chip') +
        biSpan(ip.hero.strip3_zh, ip.hero.strip3_en, 'mui-chip mui-chip-success mono') +
        '</div>' +
        '<div class="hero-overline mono">' + biSpan(ip.hero.overline_zh, ip.hero.overline_en, '') + '</div>' +
        '<h1 class="hero-h1" data-i18n-rich="hero_h1">' + ip.hero.h1_zh + '</h1>' +
        '<p class="lead-prose" data-i18n-rich="lead_prose">' + ip.hero.lead_zh + '</p>' +
        '<div class="grid-3" style="margin-bottom: 18px;">' + thesisHtml + '</div>' +
        '<div class="grid-4">' + kpiHtml + '</div></section>' +

        '<section id="sec-01" class="mui-paper section-block"><div class="sec-header"><div>' +
        '<div class="sec-eyebrow mono">' + escapeHtml(ip.ch1.eyebrow) + '</div>' +
        biSpan(ip.ch1.h2_zh, ip.ch1.h2_en, 'sec-h2', 'h2') +
        biSpan(ip.ch1.sub_zh, ip.ch1.sub_en, 'sec-sub', 'p') +
        '</div>' + biSpan(ip.ch1.badge_zh, ip.ch1.badge_en, 'mui-chip mui-chip-primary mono') + '</div>' +
        '<div class="arch-blueprint"><div class="arch-hub">' +
        biSpan(ip.ch1.hub_title_zh, ip.ch1.hub_title_en, 'arch-hub-title', 'div') +
        biSpan(ip.ch1.hub_sub_zh, ip.ch1.hub_sub_en, 'arch-hub-sub', 'div') +
        '</div><div class="arch-nodes">' + nodesHtml + '</div><div class="arch-platform-bar">' + pBarsHtml + '</div></div>' +
        '<div class="grid-3" style="margin-bottom: 16px;">' + prinHtml + '</div>' +
        '<div class="mui-alert" style="margin-bottom: 18px;">' + biSpan('财报与机制核验', 'VERIFIED', 'mui-chip mui-chip-primary mono') + '<div data-i18n-rich="ch1_alert">' + ip.ch1.alert_zh + '</div></div>' +
        '<div class="chart-card" style="margin-bottom: 18px;"><div class="chart-toolbar"><div>' +
        '<div id="ch1ChartTitle" class="chart-title">' + escapeHtml(ip.ch1.chart.viewA.title_zh) + '</div>' +
        '<div id="ch1ChartSub" class="chart-caption">' + escapeHtml(ip.ch1.chart.viewA.sub_zh) + '</div>' +
        '</div><div class="mui-segmented" role="tablist">' +
        '<button type="button" id="ch1TabA" class="mui-seg-btn active" data-ch1-view="viewA" data-i18n-zh="' + escapeHtml(ip.ch1.chart.tabA_zh) + '" data-i18n-en="' + escapeHtml(ip.ch1.chart.tabA_en) + '">' + escapeHtml(ip.ch1.chart.tabA_zh) + '</button>' +
        '<button type="button" id="ch1TabB" class="mui-seg-btn" data-ch1-view="viewB" data-i18n-zh="' + escapeHtml(ip.ch1.chart.tabB_zh) + '" data-i18n-en="' + escapeHtml(ip.ch1.chart.tabB_en) + '">' + escapeHtml(ip.ch1.chart.tabB_zh) + '</button>' +
        '</div></div><div id="ch1AxisMeta" class="chart-axis-meta mono"></div>' +
        '<div class="canvas-stage"><canvas id="chartCh1"></canvas></div>' +
        '<div class="chart-legend" id="ch1Legend">' +
        '<button type="button" class="legend-pill" data-ch1-series="s1"><span id="ch1Dot1" class="legend-dot" style="background:var(--chart-c1);"></span><span id="ch1Leg1"></span></button>' +
        '<button type="button" class="legend-pill" data-ch1-series="s2"><span id="ch1Dot2" class="legend-dot" style="background:var(--chart-c2);"></span><span id="ch1Leg2"></span></button>' +
        '</div></div><div class="grid-2">' + matHtml + '</div></section>' +

        '<section id="sec-02" class="mui-paper section-block"><div class="sec-header"><div>' +
        '<div class="sec-eyebrow mono">' + escapeHtml(ip.ch2.eyebrow) + '</div>' +
        biSpan(ip.ch2.h2_zh, ip.ch2.h2_en, 'sec-h2', 'h2') +
        biSpan('点击左侧任一核心壁垒支柱卡片，联动高亮右侧五维竞争护城河雷达图与财报实证拆解', 'Click any competitive pillar card on the left to highlight its axis on the 5-Axis Moat Radar', 'sec-sub', 'p') +
        '</div>' + biSpan(ip.ch2.badge_zh, ip.ch2.badge_en, 'mui-chip mui-chip-success') + '</div>' +
        '<div class="grid-radar"><div class="pillar-stack" id="pillarStack">' + pilHtml +
        '<div id="pillarFocusNote" class="mui-alert" style="margin-top: 4px;"><div>' + ip.ch2.pillars[0].note_zh + '</div></div></div>' +
        '<div class="chart-card" style="display:flex; flex-direction:column; justify-content:space-between;"><div>' +
        biSpan(ip.ch2.radar.title_zh, ip.ch2.radar.title_en, 'chart-title', 'div') +
        biSpan('点击下方图例胶囊可单独开关对比曲线，悬停顶点查看精确评分明细', 'Click legend pills below to toggle competitor curves; hover vertices for exact scores', 'chart-caption', 'div') +
        '</div><div class="canvas-stage-tall"><canvas id="chartRadar"></canvas></div>' +
        '<div class="chart-legend" id="radarLegend">' +
        '<button type="button" class="legend-pill" data-radar-key="s0"><span class="legend-dot" style="background:#3399FF;"></span>' + biSpan(ip.ch2.radar.s0_zh, ip.ch2.radar.s0_en, '') + '</button>' +
        '<button type="button" class="legend-pill" data-radar-key="s1"><span class="legend-dot" style="background:#22C55E;"></span>' + biSpan(ip.ch2.radar.s1_zh, ip.ch2.radar.s1_en, '') + '</button>' +
        '<button type="button" class="legend-pill" data-radar-key="s2"><span class="legend-dot" style="background:#FFB74D;"></span>' + biSpan(ip.ch2.radar.s2_zh, ip.ch2.radar.s2_en, '') + '</button>' +
        '</div></div></div></section>' +

        '<section id="sec-03" class="mui-paper section-block"><div class="sec-header"><div>' +
        '<div class="sec-eyebrow mono">' + escapeHtml(ip.ch3.eyebrow) + '</div>' +
        biSpan(ip.ch3.h2_zh, ip.ch3.h2_en, 'sec-h2', 'h2') +
        biSpan('支持按产品型号、制程工艺、定价区间、市场份额或外部竞品关键词实时检索高亮与分类筛选', 'Search and highlight in real time by model, process node, pricing, market share, or external rival', 'sec-sub', 'p') +
        '</div><span id="peerCountBadge" class="mui-chip mui-chip-primary mono"></span></div>' +
        '<div class="datagrid-toolbar">' +
        '<input type="search" id="peerSearchInput" class="mui-input-outlined" placeholder="搜索产品系列、工艺架构、份额或竞品名称…" data-ph-zh="搜索产品系列、工艺架构、份额或竞品名称…" data-ph-en="Search product family, node, share, or peer…" aria-label="筛选对标矩阵" />' +
        '<div class="mui-segmented" role="group">' +
        '<button type="button" id="peerFilterAll" class="mui-seg-btn active" data-peer-filter="all" data-i18n-zh="全部对标项" data-i18n-en="All Benchmarks">全部对标项</button>' +
        '<button type="button" id="peerFilterInternal" class="mui-seg-btn" data-peer-filter="ti" data-i18n-zh="TI 产品阶梯" data-i18n-en="TI Portfolio">TI 产品阶梯</button>' +
        '<button type="button" id="peerFilterExternal" class="mui-seg-btn" data-peer-filter="external" data-i18n-zh="全球外部竞争对手" data-i18n-en="External Rivals">全球外部竞争对手</button>' +
        '</div></div>' +
        '<div class="table-wrap" style="margin-bottom: 20px;"><table class="mui-table"><thead><tr>' +
        biSpan('产品阶梯 / 对标竞品', 'Product Tier / Competitor', '', 'th') +
        biSpan('发布节奏与价格定位', 'Cadence & Price Tier', '', 'th') +
        biSpan('制程节点与工程特征', 'Process & Craft Signature', '', 'th') +
        biSpan('营收体量与市场份额', 'Revenue & Market Share', '', 'th') +
        biSpan('利润质量与核心优势', 'Margin & Competitive Edge', '', 'th') +
        biSpan('战略定评与权威信源', 'Strategic Takeaway & Source', '', 'th') +
        '</tr></thead><tbody id="peerTableBody"></tbody></table></div>' +
        '<div class="chart-card"><div class="chart-toolbar"><div>' +
        biSpan(ip.ch3.bars.title_zh, ip.ch3.bars.title_en, 'chart-title', 'div') +
        biSpan(ip.ch3.bars.sub_zh, ip.ch3.bars.sub_en, 'chart-caption', 'div') +
        '</div>' + biSpan(ip.ch3.bars.badge_zh, ip.ch3.bars.badge_en, 'mui-chip mui-chip-success mono') + '</div>' +
        '<div class="canvas-stage-bars"><canvas id="chartBars"></canvas></div>' +
        '<div class="chart-legend">' +
        biSpan(ip.ch3.bars.leg1_zh, ip.ch3.bars.leg1_en, 'mui-chip mui-chip-success mono') +
        biSpan(ip.ch3.bars.leg2_zh, ip.ch3.bars.leg2_en, 'mui-chip mui-chip-violet mono') +
        '</div></div></section>' +

        '<section id="sec-04" class="mui-paper section-block"><div class="sec-header"><div>' +
        '<div class="sec-eyebrow mono">' + escapeHtml(ip.ch4.eyebrow) + '</div>' +
        biSpan(ip.ch4.h2_zh, ip.ch4.h2_en, 'sec-h2', 'h2') +
        biSpan(ip.ch4.sub_zh, ip.ch4.sub_en, 'sec-sub', 'p') +
        '</div>' + biSpan(ip.ch4.badge_zh, ip.ch4.badge_en, 'mui-chip mui-chip-warning mono') + '</div>' +
        '<div class="grid-4" style="margin-bottom: 18px;">' + econHtml + '</div>' +
        '<div class="chart-card"><div class="chart-toolbar"><div>' +
        biSpan(ip.ch4.combo.title_zh, ip.ch4.combo.title_en, 'chart-title', 'div') +
        biSpan(ip.ch4.combo.sub_zh, ip.ch4.combo.sub_en, 'chart-caption', 'div') +
        '</div>' + biSpan(ip.ch4.combo.badge_zh, ip.ch4.combo.badge_en, 'mui-chip mui-chip-primary mono') + '</div>' +
        '<div class="chart-axis-meta mono">' +
        '<span style="color:var(--chart-c1);" data-i18n-zh="' + escapeHtml(ip.ch4.combo.left_zh) + '" data-i18n-en="' + escapeHtml(ip.ch4.combo.left_en) + '">' + escapeHtml(ip.ch4.combo.left_zh) + '</span>' +
        '<span style="color:var(--chart-c2);" data-i18n-zh="' + escapeHtml(ip.ch4.combo.right_zh) + '" data-i18n-en="' + escapeHtml(ip.ch4.combo.right_en) + '">' + escapeHtml(ip.ch4.combo.right_zh) + '</span>' +
        '</div><div class="canvas-stage"><canvas id="chartEps"></canvas></div>' +
        '<div class="chart-legend" id="epsLegend">' +
        '<button type="button" class="legend-pill" data-eps-series="rev"><span class="legend-dot" style="background:var(--chart-c1);"></span>' + biSpan(ip.ch4.combo.leg1_zh, ip.ch4.combo.leg1_en, '') + '</button>' +
        '<button type="button" class="legend-pill" data-eps-series="oci"><span class="legend-dot" style="background:var(--chart-c2);"></span>' + biSpan(ip.ch4.combo.leg2_zh, ip.ch4.combo.leg2_en, '') + '</button>' +
        (comboLineBadgeZh ? biSpan(comboLineBadgeZh, comboLineBadgeEn, 'mui-chip mui-chip-warning mono') : '') +
        '</div></div>' +
        '<div class="simulator-grid"><div class="sim-controls"><div>' +
        '<div class="sec-eyebrow mono" style="margin-bottom:2px;">INTERACTIVE UNIT ECONOMICS &amp; ECOSYSTEM LTV SIMULATOR</div>' +
        '<h3 style="font-size:1rem;font-weight:800;" data-i18n-zh="' + escapeHtml(sc.title_zh) + '" data-i18n-en="' + escapeHtml(sc.title_en) + '">' + escapeHtml(sc.title_zh) + '</h3></div>' +
        '<label class="mui-switch-row" for="simDripToggle"><div>' +
        '<div style="font-size:0.84rem;font-weight:700;color:var(--text-primary);" data-i18n-zh="' + escapeHtml(sc.toggle_title_zh) + '" data-i18n-en="' + escapeHtml(sc.toggle_title_en) + '">' + escapeHtml(sc.toggle_title_zh) + '</div>' +
        '<div style="font-size:0.74rem;color:var(--text-secondary);" data-i18n-zh="' + escapeHtml(sc.toggle_sub_zh) + '" data-i18n-en="' + escapeHtml(sc.toggle_sub_en) + '">' + escapeHtml(sc.toggle_sub_zh) + '</div>' +
        '</div><input type="checkbox" id="simDripToggle" ' + (p2.transmedia ? 'checked' : '') + ' /></label>' +
        '<div class="preset-stack" role="group">' +
        '<button type="button" class="preset-btn" data-preset="p1">' + biSpan(p1.label_zh, p1.label_en, '') + biSpan(p1.tag_zh, p1.tag_en, 'mono') + '</button>' +
        '<button type="button" class="preset-btn active" data-preset="p2">' + biSpan(p2.label_zh, p2.label_en, '') + biSpan(p2.tag_zh, p2.tag_en, 'mono') + '</button>' +
        '<button type="button" class="preset-btn" data-preset="p3">' + biSpan(p3.label_zh, p3.label_en, '') + biSpan(p3.tag_zh, p3.tag_en, 'mono') + '</button>' +
        '</div>' +
        '<div class="slider-group"><div class="slider-head">' + biSpan(sc.s1_label_zh, sc.s1_label_en, '') + '<span id="simPrincipalLabel" class="slider-val mono"></span></div>' +
        '<input type="range" id="simPrincipalSlider" class="mui-slider" min="' + sc.s1_min + '" max="' + sc.s1_max + '" step="' + sc.s1_step + '" value="' + p2.views + '" /></div>' +
        '<div class="slider-group"><div class="slider-head">' + biSpan(sc.s2_label_zh, sc.s2_label_en, '') + '<span id="simCagrLabel" class="slider-val mono"></span></div>' +
        '<input type="range" id="simCagrSlider" class="mui-slider" min="' + sc.s2_min + '" max="' + sc.s2_max + '" step="' + sc.s2_step + '" value="' + p2.v_per_view + '" /></div>' +
        '<div class="slider-group"><div class="slider-head">' + biSpan(sc.s3_label_zh, sc.s3_label_en, '') + '<span id="simLiveArpuLabel" class="slider-val mono"></span></div>' +
        '<input type="range" id="simLiveArpuSlider" class="mui-slider" min="' + sc.s3_min + '" max="' + sc.s3_max + '" step="' + sc.s3_step + '" value="' + p2.ancillary_m + '" /></div>' +
        '<div class="slider-group"><div class="slider-head">' + biSpan('测算运营周期 (Years)', 'Simulation Horizon (Years)', '') + '<span id="simYearsLabel" class="slider-val mono"></span></div>' +
        '<input type="range" id="simYearsSlider" class="mui-slider" min="3" max="10" step="1" value="' + p2.years + '" /></div>' +
        '</div><div class="sim-output-panel"><div class="sim-readouts">' +
        '<div class="sim-stat-box">' + biSpan('预估周期内全生态累计总毛利', 'Projected Cumulative Total Gross Profit', 'sim-stat-label', 'div') + '<div id="simEndingVal" class="sim-stat-num mono" style="color:var(--mui-primary-lighter);">$0B</div></div>' +
        '<div class="sim-stat-box">' + biSpan(sc.roi_label_zh, sc.roi_label_en, 'sim-stat-label', 'div') + '<div id="simMoicVal" class="sim-stat-num mono" style="color:var(--mui-success-text);">0.00x</div></div>' +
        '<div class="sim-stat-box">' + biSpan(sc.sum_a_zh, sc.sum_a_en, 'sim-stat-label', 'div') + '<div id="simNetGainVal" class="sim-stat-num mono">$0B</div></div>' +
        '<div class="sim-stat-box">' + biSpan(sc.sum_b_zh, sc.sum_b_en, 'sim-stat-label', 'div') + '<div id="simMidVal" class="sim-stat-num mono">$0B</div></div>' +
        '</div><div class="canvas-stage-sim"><canvas id="chartSim"></canvas></div>' +
        '<div class="chart-legend" style="margin-top:4px;">' +
        biSpan('━ 核心主业 + 生态连带累计总毛利', '━ Direct + Ecosystem Attach Cumulative GP', 'mui-chip mui-chip-primary mono') +
        biSpan('- - 仅本产品线直接毛利基准线', '- - Direct Product Gross Profit Baseline', 'mui-chip mono') +
        '</div>' +
        biSpan('拖动左侧滑块或切换情景预设，悬停曲线可逐年对比“单一产品直接毛利”与“生态服务/配件连带复利”剪刀差。', 'Adjust sliders or presets; hover along the curve to inspect year-by-year direct gross profit vs. ecosystem attach compounding.', 'chart-caption', 'div') +
        '</div></div>' +
        '<div class="grid-2" style="margin-top: 18px;">' +
        '<div class="mui-alert mui-alert-success" style="flex-direction:column; gap:8px;"><div style="display:flex;align-items:center;gap:8px;"><span class="mui-chip mui-chip-success mono">STRUCTURAL MOAT</span>' + biSpan('核心商业壁垒与正向复利定评', 'Core Structural Moat & Catalysts', '', 'strong') + '</div><p style="font-size:0.83rem;color:var(--text-secondary);line-height:1.65;" data-i18n-rich="moat_pos">' + ip.ch4.moat_pos_zh + '</p></div>' +
        '<div class="mui-alert mui-alert-warning" style="flex-direction:column; gap:8px;"><div style="display:flex;align-items:center;gap:8px;"><span class="mui-chip mui-chip-warning mono">CRITICAL LENS</span>' + biSpan('客观风险、成本张力与跟踪要点', 'Key Risks, Tensions & Watchpoints', '', 'strong') + '</div><p style="font-size:0.83rem;color:var(--text-secondary);line-height:1.65;" data-i18n-rich="moat_risk">' + ip.ch4.moat_risk_zh + '</p></div>' +
        '</div></section>' +

        '<section id="sec-05" class="mui-paper section-block"><div class="sec-header"><div>' +
        '<div class="sec-eyebrow mono">' + escapeHtml(ip.ch5.eyebrow) + '</div>' +
        biSpan(ip.ch5.h2_zh, ip.ch5.h2_en, 'sec-h2', 'h2') +
        biSpan(ip.ch5.sub_zh, ip.ch5.sub_en, 'sec-sub', 'p') +
        '</div>' + biSpan(ip.ch5.badge_zh, ip.ch5.badge_en, 'mui-chip mui-chip-primary mono') + '</div>' +
        '<div class="mui-timeline">' + actsHtml + '</div>' +
        '<div class="grid-2" style="margin-bottom: 18px;">' + batsHtml + '</div>' +
        '<div class="grid-3">' + lawsHtml + '</div></section>' +

        '<section id="sec-06" class="mui-paper section-block"><div class="sec-header"><div>' +
        '<div class="sec-eyebrow mono">CHAPTER 06 · INTERACTIVE PRODUCT MOAT &amp; CYCLE CHECKLIST</div>' +
        biSpan(ip.ch6.h2_zh, ip.ch6.h2_en, 'sec-h2', 'h2') +
        biSpan('用于持续跟踪检验该德州仪器产品线的定价权、300mm 成本韧性与设计导入粘性（勾选状态独立保存在本地）', 'Audit pricing power, 300mm margin resilience, and design-in lock-in across quarters (saved locally per pillar)', 'sec-sub', 'p') +
        '</div><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">' +
        '<span id="checklistScoreChip" class="mui-chip mui-chip-primary mono"></span>' +
        '<button type="button" id="checkAllBtn" class="mui-btn" data-i18n-zh="全部勾选" data-i18n-en="Check All">全部勾选</button>' +
        '<button type="button" id="resetCheckBtn" class="mui-btn" data-i18n-zh="重置清单" data-i18n-en="Reset">重置清单</button>' +
        '</div></div><div class="progress-track"><div id="checklistProgressBar" class="progress-fill"></div></div>' +
        '<div id="checklistContainer" class="checklist-grid"></div></section>' +

        '<footer id="sec-07" class="mui-paper section-block" style="padding: 22px 26px;">' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px;">' +
        '<strong style="font-size:0.92rem;" data-i18n-zh="权威数据来源与一手财报/公告核验索引（SEC Form 10-K/10-Q · TI Investor Relations · Yole &amp; 行业研报）" data-i18n-en="Primary Official Filings &amp; Source Verification Index (SEC Form 10-K/10-Q · TI Investor Relations · Industry Audits)">权威数据来源与一手财报/公告核验索引（SEC Form 10-K/10-Q · TI Investor Relations · Yole &amp; 行业研报）</strong>' +
        '<span class="mui-chip mono">MUI High-Clarity Architecture · Offline Ready</span>' +
        '</div>' +
        '<p style="font-size:0.8rem;color:var(--text-muted);line-height:1.6;" data-i18n-zh="本报告所有营收、毛利率、自由现金流、300mm 晶圆产能、并购参数及市场份额数据均核验自 Texas Instruments Inc. FY2025 Form 10-K、Q1–Q3 2026 官方财报新闻稿、TI Newsroom 公告及权威行业研究数据库，仅供产品战略与商业模式研究参考，不构成任何证券投资建议。" data-i18n-en="All revenue, margin, free cash flow, 300mm wafer capacity, M&A terms, and market share metrics are verified against Texas Instruments Inc. FY2025 Form 10-K, Q1–Q3 2026 earnings releases, TI Newsroom announcements, and institutional market audits. For product strategy research only; not investment advice.">本报告所有营收、毛利率、自由现金流、300mm 晶圆产能、并购参数及市场份额数据均核验自 Texas Instruments Inc. FY2025 Form 10-K、Q1–Q3 2026 官方财报新闻稿、TI Newsroom 公告及权威行业研究数据库，仅供产品战略与商业模式研究参考，不构成任何证券投资建议。</p>' +
        '<ul class="sources-list">' + srcHtml + '</ul></footer>';
    }

    function highlightMatch(text, query) {
      var safe = escapeHtml(text);
      if (!query) return safe;
      var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return safe.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
    }

    function applyCategoryFilter(cat) {
      state.catFilter = cat || 'all';
      var catBtns = document.querySelectorAll('[data-cat-filter]');
      for (var i = 0; i < catBtns.length; i++) catBtns[i].classList.toggle('active', catBtns[i].getAttribute('data-cat-filter') === state.catFilter);
      var pills = document.querySelectorAll('[data-switch-ip]');
      for (var j = 0; j < pills.length; j++) {
        var prod = IP_MAP[pills[j].getAttribute('data-switch-ip')];
        pills[j].classList.toggle('cat-hidden', !(state.catFilter === 'all' || (prod && prod.cat === state.catFilter)));
      }
    }

    function applyDensity(density, silent) {
      state.density = density === 'compact' ? 'compact' : 'relaxed';
      if (state.density === 'compact') document.documentElement.setAttribute('data-density', 'compact');
      else document.documentElement.removeAttribute('data-density');
      safeSetStorage(STORAGE_DENSITY_KEY, state.density);
      var dBtn = document.getElementById('appbarDensityBtn');
      if (dBtn) {
        var lbl = state.density === 'compact' ? (isEn() ? 'Compact' : '紧凑视图') : (isEn() ? 'Comfort' : '舒适排版');
        void 0;
      }
      setTimeout(renderAllCharts, 40);
      if (!silent) showToast(state.density === 'compact' ? (isEn() ? 'Switched to Compact View' : '已切换至高信息密度紧凑视图') : (isEn() ? 'Switched to Comfort View' : '已切换至舒适阅读排版视图'));
    }

    function syncFocusButtonText() {
      var fBtn = document.getElementById('hubFocusModeBtn');
      if (fBtn) fBtn.textContent = state.focusMode ? (isEn() ? 'Show All 10 Pillars ▾' : '展开 10 大业务支柱 ▾') : (isEn() ? 'Single-Pillar Focus ▴' : '单支柱沉浸阅读 ▴');
    }

    function syncHeaderAndSidebarForIp(ip) {
      var en = isEn();
      var monoEl = document.getElementById('appbarMonogram');
      if (monoEl) monoEl.textContent = ip.monogram;
      var crumbEl = document.getElementById('appbarCrumbCurrent');
      if (crumbEl) { crumbEl.setAttribute('data-i18n-zh', ip.crumb_zh); crumbEl.setAttribute('data-i18n-en', ip.crumb_en); crumbEl.textContent = en ? ip.crumb_en : ip.crumb_zh; }
      var b1 = document.getElementById('appbarBadgePlatform');
      if (b1) { b1.setAttribute('data-i18n-zh', ip.chip1_zh); b1.setAttribute('data-i18n-en', ip.chip1_en); b1.textContent = en ? ip.chip1_en : ip.chip1_zh; }
      var b2 = document.getElementById('appbarBadgeStatus');
      if (b2) { b2.setAttribute('data-i18n-zh', ip.chip2_zh); b2.setAttribute('data-i18n-en', ip.chip2_en); b2.textContent = en ? ip.chip2_en : ip.chip2_zh; }

      var sbTag = document.getElementById('sideBrandTag');
      if (sbTag) sbTag.textContent = ip.sidebar.badge;
      var sbTitle = document.getElementById('sideCardTitle');
      if (sbTitle) { sbTitle.setAttribute('data-i18n-zh', ip.sidebar.title_zh); sbTitle.setAttribute('data-i18n-en', ip.sidebar.title_en); sbTitle.textContent = en ? ip.sidebar.title_en : ip.sidebar.title_zh; }
      var sbSub = document.getElementById('sideCardSub');
      if (sbSub) { sbSub.setAttribute('data-i18n-zh', ip.sidebar.sub_zh); sbSub.setAttribute('data-i18n-en', ip.sidebar.sub_en); sbSub.textContent = en ? ip.sidebar.sub_en : ip.sidebar.sub_zh; }

      var mkWrap = document.getElementById('sideMiniKpis');
      if (mkWrap) {
        mkWrap.innerHTML = ip.sidebar.mini_kpis.map(function (mk) {
          return '<div class="sidebar-mini-row"><span class="sidebar-mini-label">' + escapeHtml(en ? mk.label_en : mk.label_zh) + '</span><span class="sidebar-mini-val mono">' + escapeHtml(en ? mk.val_en : mk.val_zh) + '</span></div>';
        }).join('');
      }

      var curIdx = ALL_IPS.indexOf(ip) + 1;
      var coTitle = document.getElementById('coSideCounter');
      if (coTitle) coTitle.textContent = 'TXN · ' + (curIdx < 10 ? '0' : '') + curIdx + '/' + ALL_IPS.length;

      var coItems = document.querySelectorAll('[data-hub-ip]');
      for (var ci = 0; ci < coItems.length; ci++) {
        var pid = coItems[ci].getAttribute('data-hub-ip');
        coItems[ci].classList.toggle('active', pid === ip.id);
        var tSpan = coItems[ci].querySelector('.co-hub-title');
        if (tSpan && IP_MAP[pid]) tSpan.textContent = en ? IP_MAP[pid].short_en : IP_MAP[pid].short_zh;
      }

      for (var t = 0; t < ip.toc.length; t++) {
        var tl = document.getElementById('tocLbl' + t);
        if (tl) tl.textContent = en ? ip.toc[t][1] : ip.toc[t][0];
      }

      var pillBtns = document.querySelectorAll('[data-switch-ip]');
      for (var pb = 0; pb < pillBtns.length; pb++) {
        var isAct = pillBtns[pb].getAttribute('data-switch-ip') === ip.id;
        pillBtns[pb].classList.toggle('active', isAct);
        pillBtns[pb].setAttribute('aria-pressed', isAct ? 'true' : 'false');
      }
      for (var m = 0; m < ALL_IPS.length; m++) {
        var it = ALL_IPS[m];
        var pn = document.querySelector('[data-pill-name="' + it.id + '"]');
        var pm = document.querySelector('[data-pill-meta="' + it.id + '"]');
        if (pn) pn.textContent = it.idx_pad + '. ' + (en ? it.short_en : it.short_zh);
        if (pm) pm.textContent = it.pill_kpi + ' · ' + (en ? it.short_zh : it.short_en);
      }
      syncFocusButtonText();
    }

    function syncCh1HeaderText() {
      var vCfg = curIp().ch1.chart[state.ch1View];
      var en = isEn();
      var tEl = document.getElementById('ch1ChartTitle'), sEl = document.getElementById('ch1ChartSub');
      var l1El = document.getElementById('ch1Leg1'), l2El = document.getElementById('ch1Leg2'), metaEl = document.getElementById('ch1AxisMeta');
      if (!tEl || !vCfg) return;
      tEl.textContent = en ? vCfg.title_en : vCfg.title_zh;
      sEl.textContent = en ? vCfg.sub_en : vCfg.sub_zh;
      var l1 = en ? vCfg.leg1_en : vCfg.leg1_zh, l2 = en ? vCfg.leg2_en : vCfg.leg2_zh;
      if (l1El) l1El.textContent = l1;
      if (l2El) l2El.textContent = l2;
      if (metaEl) {
        metaEl.innerHTML = '<span style="color:var(--chart-c1);">■ ' + escapeHtml(l1) + '</span><span style="color:var(--chart-c2);">' + (vCfg.mode === 'dual_bar_line' ? '● ' : '■ ') + escapeHtml(l2) + '</span>';
      }
    }

    function syncCollapseButtonsText() {
      var btns = document.querySelectorAll('[data-collapse-target]');
      for (var i = 0; i < btns.length; i++) {
        var panel = document.getElementById(btns[i].getAttribute('data-collapse-target'));
        var isOpen = panel && panel.classList.contains('open');
        btns[i].innerHTML = isEn()
          ? (isOpen ? '<span>Hide Mechanics Breakdown</span> <span>⌃</span>' : '<span>Show Mechanics Breakdown</span> <span>⌄</span>')
          : (isOpen ? '<span>收起微观机制拆解</span> <span>⌃</span>' : '<span>展开微观机制拆解</span> <span>⌄</span>');
      }
    }

    function renderPeerTable() {
      var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
      if (!tbody || !badge) return;
      var ip = curIp(), activeRows = isEn() ? ip.ch3.peers_en : ip.ch3.peers_zh, q = state.peerQuery.trim().toLowerCase();
      var filtered = activeRows.filter(function (row, idx) {
        if (state.peerFilter !== 'all' && row.category !== state.peerFilter) return false;
        if (!q) return true;
        var rZh = ip.ch3.peers_zh[idx] || row, rEn = ip.ch3.peers_en[idx] || row;
        return (rZh.title + ' ' + rZh.creator + ' ' + rZh.format + ' ' + rZh.craft + ' ' + rZh.views + ' ' + rZh.acclaim + ' ' + rZh.takeaway + ' ' +
          rEn.title + ' ' + rEn.creator + ' ' + rEn.format + ' ' + rEn.craft + ' ' + rEn.takeaway).toLowerCase().indexOf(q) !== -1;
      });
      badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + activeRows.length + ' Benchmarks') : ('显示 ' + filtered.length + ' / ' + activeRows.length + ' 项对标');
      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;">' + (isEn() ? 'No matching models or competitors found.' : '未找到匹配的产品阶梯或外部竞品记录。') + '</td></tr>';
        return;
      }
      var rawQ = state.peerQuery.trim();
      tbody.innerHTML = filtered.map(function (r) {
        return '<tr class="' + (r.benchmark ? 'benchmark-row' : '') + '">' +
          '<td><strong style="color:var(--text-primary);display:block;">' + highlightMatch(r.title, rawQ) + '</strong><span style="font-size:0.76rem;color:var(--text-muted);">' + highlightMatch(r.creator, rawQ) + '</span></td>' +
          '<td>' + highlightMatch(r.format, rawQ) + '</td><td>' + highlightMatch(r.craft, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;">' + highlightMatch(r.views, rawQ) + '</td>' +
          '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">' + highlightMatch(r.acclaim, rawQ) + '</td>' +
          '<td>' + highlightMatch(r.takeaway, rawQ) + ' <a class="cite-link" href="' + escapeHtml(r.sourceUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(r.sourceLabel) + ' ↗</a></td></tr>';
      }).join('');
    }

    function computeLifecycleSeries() {
      var sc = curIp().ch4.sim;
      var s1 = state.sim.views, s2 = state.sim.v_per_view, s3 = state.sim.ancillary_m, yrs = state.sim.years;
      var mult = state.sim.transmedia ? sc.mult : 1.0;
      var baseAnnualDirectM = sc.scale_mode === 'M' ? (s1 * s2) : (s1 * s2 * 10);
      var baseAnnualAttachM = sc.scale_mode === 'M' ? s3 : (s3 * 1000);
      var cumDirectM = [0], cumTotalM = [0];
      for (var y = 1; y <= yrs; y++) {
        var growthStep = Math.pow(state.sim.transmedia ? 1.045 : 1.015, y - 1);
        var yrDirectM = baseAnnualDirectM * growthStep;
        var yrAttachM = baseAnnualAttachM * mult * Math.pow(1.05, y - 1);
        cumDirectM.push(cumDirectM[y - 1] + yrDirectM);
        cumTotalM.push(cumTotalM[y - 1] + yrDirectM + yrAttachM);
      }
      var costBenchM = sc.scale_mode === 'M' ? (sc.cost_base_m * (yrs / 5)) : (sc.cost_base_m * 1000 * (yrs / 5));
      return { yrs: yrs, cumStreamM: cumDirectM, cumTotalM: cumTotalM, streamTotalM: cumDirectM[yrs], ancTotalM: cumTotalM[yrs] - cumDirectM[yrs], grandTotalM: cumTotalM[yrs], costBenchM: Math.max(1, costBenchM) };
    }

    function fmtMoneyM(valM) {
      if (valM >= 100000) return '$' + (valM / 1000).toFixed(1) + 'B';
      if (valM >= 1000) return '$' + (valM / 1000).toFixed(2) + 'B';
      return '$' + Math.round(valM).toLocaleString() + 'M';
    }

    function updateSimulatorUI() {
      var sc = curIp().ch4.sim, res = computeLifecycleSeries();
      var roi = res.grandTotalM / res.costBenchM;
      var ancPct = res.grandTotalM > 0 ? Math.round((res.ancTotalM / res.grandTotalM) * 100) : 0;
      document.getElementById('simPrincipalLabel').textContent = state.sim.views + ' ' + (isEn() ? sc.s1_unit_en : sc.s1_unit_zh);
      document.getElementById('simCagrLabel').textContent = state.sim.v_per_view + ' ' + (isEn() ? sc.s2_unit_en : sc.s2_unit_zh);
      document.getElementById('simLiveArpuLabel').textContent = state.sim.ancillary_m + ' ' + (isEn() ? sc.s3_unit_en : sc.s3_unit_zh);
      document.getElementById('simYearsLabel').textContent = state.sim.years + (isEn() ? ' yrs' : ' 年');
      document.getElementById('simEndingVal').textContent = fmtMoneyM(res.grandTotalM);
      document.getElementById('simMoicVal').textContent = roi.toFixed(2) + 'x · ' + (isEn() ? ('Attach ' + ancPct + '%') : ('生态连带 ' + ancPct + '%'));
      document.getElementById('simNetGainVal').textContent = fmtMoneyM(res.streamTotalM);
      document.getElementById('simMidVal').textContent = fmtMoneyM(res.ancTotalM);
      var pBtns = document.querySelectorAll('[data-preset]');
      for (var i = 0; i < pBtns.length; i++) pBtns[i].classList.toggle('active', pBtns[i].getAttribute('data-preset') === state.sim.preset);
      drawSimChart();
    }

    function renderChecklist() {
      var container = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
      if (!container || !chip || !bar) return;
      var ip = curIp(), items = isEn() ? ip.ch6.items_en : ip.ch6.items_zh;
      var doneCount = state.checks.filter(Boolean).length, pct = Math.round((doneCount / items.length) * 100);
      chip.textContent = isEn() ? ('Verified ' + doneCount + ' / ' + items.length + ' (' + pct + '%)') : ('已核查 ' + doneCount + ' / ' + items.length + ' 项 (' + pct + '%)');
      bar.style.width = pct + '%';
      container.innerHTML = items.map(function (item, idx) {
        var isChecked = !!state.checks[idx];
        return '<label class="check-card ' + (isChecked ? 'checked' : '') + '" data-check-idx="' + idx + '">' +
          '<input type="checkbox" data-check-input="' + idx + '" ' + (isChecked ? 'checked' : '') + ' />' +
          '<div style="flex:1;"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">' + escapeHtml(item.title) + '</span><span class="mui-chip mono">' + escapeHtml(item.tag) + '</span></div>' +
          '<p class="check-desc">' + escapeHtml(item.desc) + '</p></div></label>';
      }).join('');
    }

    var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
    var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

    function getPalette() {
      var cs = getComputedStyle(document.documentElement), isDark = state.theme === 'dark';
      return {
        isDark: isDark,
        grid: cs.getPropertyValue('--chart-grid').trim() || (isDark ? 'rgba(148,163,184,0.13)' : 'rgba(100,116,139,0.16)'),
        tick: cs.getPropertyValue('--chart-tick').trim() || '#94A3B8',
        text: cs.getPropertyValue('--text-primary').trim() || '#0F1924',
        pillBg: isDark ? 'rgba(9, 13, 22, 0.90)' : 'rgba(255, 255, 255, 0.95)',
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
      var w = Math.max(240, Math.floor(rect.width)), h = Math.max(170, Math.floor(rect.height));
      var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      var tw = Math.floor(w * dpr), th = Math.floor(h * dpr);
      if (canvas.width !== tw) canvas.width = tw;
      if (canvas.height !== th) canvas.height = th;
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      return { ctx: ctx, w: w, h: h };
    }

    function roundRectPath(ctx, x, y, w, h, r) {
      if (w <= 0 || h <= 0) return;
      var rad = Math.min(r, w / 2, h / 2);
      ctx.beginPath(); ctx.moveTo(x + rad, y); ctx.lineTo(x + w - rad, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h - rad);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h); ctx.lineTo(x + rad, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rad); ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y); ctx.closePath();
    }

    function topRoundedBar(ctx, x, y, w, h, r) {
      if (w <= 0 || h <= 0) return;
      var rad = Math.min(r, w / 2, h);
      ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y); ctx.lineTo(x + w - rad, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rad); ctx.lineTo(x + w, y + h); ctx.closePath();
    }

    function drawValueBadge(ctx, text, cx, cy, fgColor, pal) {
      ctx.save(); ctx.font = '700 11px "IBM Plex Mono", system-ui, sans-serif';
      var tw = ctx.measureText(text).width + 10, th = 18;
      ctx.fillStyle = pal.pillBg; roundRectPath(ctx, cx - tw / 2, cy - th / 2, tw, th, 5); ctx.fill();
      ctx.strokeStyle = pal.pillBorder; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = fgColor; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, cx, cy + 0.5); ctx.restore();
    }

    function drawSmoothLine(ctx, pts) {
      if (!pts.length) return;
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      for (var i = 0; i < pts.length - 1; i++) {
        var xc = (pts[i].x + pts[i + 1].x) / 2;
        ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i + 1].y, pts[i + 1].x, pts[i + 1].y);
      }
    }

    function drawCh1Chart() {
      var env = prepareCanvas('chartCh1'); if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartCh1 = [];
      var vCfg = curIp().ch1.chart[state.ch1View], en = isEn();
      var labels = en ? vCfg.labels_en : vCfg.labels_zh, subs = en ? vCfg.subs_en : vCfg.subs_zh;
      var s1 = vCfg.s1, s2 = vCfg.s2, u1 = vCfg.u1 || '', u2 = vCfg.u2 || '';

      if (vCfg.mode === 'dual_bar_line') {
        var pad = { top: 28, right: 54, bottom: 44, left: 54 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var max1 = vCfg.max1, max2 = vCfg.max2;
        for (var g = 0; g <= 4; g++) {
          var r = g / 4, gy = pad.top + ph - r * ph;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
          ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText(Math.round(max1 * r) + u1, pad.left - 8, gy);
          ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText((max2 <= 10 ? (max2 * r).toFixed(1) : Math.round(max2 * r)) + u2, pad.left + pw + 8, gy);
        }
        var step = pw / labels.length, barW = Math.min(62, Math.max(26, step * 0.36)), pts = [];
        for (var i = 0; i < labels.length; i++) {
          var cx = pad.left + step * (i + 0.5);
          if (hoverState.chartCh1 === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 6, pad.top, step - 12, ph, 8); ctx.fill(); }
          if (state.ch1Series.s1) {
            var bh = (s1[i] / max1) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
            var grad = ctx.createLinearGradient(0, by, 0, pad.top + ph); grad.addColorStop(0, '#3399FF'); grad.addColorStop(1, '#0066CC');
            ctx.fillStyle = grad; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
            ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
            if (bh > 22) ctx.fillText(s1[i] + u1, cx, by + 16); else drawValueBadge(ctx, s1[i] + u1, cx, by - 11, pal.c1, pal);
          }
          pts.push({ x: cx, y: pad.top + ph - (s2[i] / max2) * ph, val: s2[i] });
          ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
          ctx.fillText(labels[i], cx, pad.top + ph + 20);
          ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif'; ctx.fillText(subs[i], cx, pad.top + ph + 35);
          hitRegions.chartCh1.push({ idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 38, html: '<strong>' + escapeHtml(labels[i]) + ' (' + escapeHtml(subs[i]) + ')</strong><br/>• ' + escapeHtml(en ? vCfg.leg1_en : vCfg.leg1_zh) + ': <strong>' + s1[i] + u1 + '</strong><br/>• ' + escapeHtml(en ? vCfg.leg2_en : vCfg.leg2_zh) + ': <strong>' + s2[i] + u2 + '</strong>' });
        }
        if (state.ch1Series.s2) {
          ctx.save(); drawSmoothLine(ctx, pts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
          for (var n = 0; n < pts.length; n++) {
            ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 6, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(pts[n].x, pts[n].y, 4.2, 0, Math.PI * 2); ctx.fill();
            drawValueBadge(ctx, pts[n].val + u2, pts[n].x, Math.max(12, pts[n].y - 15), pal.c2, pal);
          }
        }
      } else {
        var padB = { top: 28, right: 24, bottom: 44, left: 54 }, pwB = w - padB.left - padB.right, phB = h - padB.top - padB.bottom, maxV = vCfg.max1;
        for (var j = 0; j <= 4; j++) {
          var v = (maxV / 4) * j, yG = padB.top + phB - (j / 4) * phB;
          ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(padB.left, yG); ctx.lineTo(padB.left + pwB, yG); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
          ctx.fillText(Math.round(v) + u1, padB.left - 8, yG);
        }
        var stepB = pwB / labels.length, bW = Math.min(52, Math.max(22, stepB * 0.26));
        for (var k = 0; k < labels.length; k++) {
          var centerX = padB.left + stepB * (k + 0.5);
          if (hoverState.chartCh1 === k) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, padB.left + stepB * k + 6, padB.top, stepB - 12, phB, 8); ctx.fill(); }
          if (state.ch1Series.s1) {
            var h1 = Math.min(phB, (s1[k] / maxV) * phB), x1 = state.ch1Series.s2 ? (centerX - bW - 4) : (centerX - bW / 2), y1 = padB.top + phB - h1;
            var g1 = ctx.createLinearGradient(0, y1, 0, padB.top + phB); g1.addColorStop(0, '#3399FF'); g1.addColorStop(1, '#0066CC');
            ctx.fillStyle = g1; topRoundedBar(ctx, x1, y1, bW, h1, 6); ctx.fill();
            drawValueBadge(ctx, s1[k] + u1, x1 + bW / 2, Math.max(12, y1 - 12), pal.c1, pal);
          }
          if (state.ch1Series.s2) {
            var h2 = Math.min(phB, (s2[k] / maxV) * phB), x2 = state.ch1Series.s1 ? (centerX + 4) : (centerX - bW / 2), y2 = padB.top + phB - h2;
            var g2 = ctx.createLinearGradient(0, y2, 0, padB.top + phB); g2.addColorStop(0, '#34D399'); g2.addColorStop(1, '#16A34A');
            ctx.fillStyle = g2; topRoundedBar(ctx, x2, y2, bW, h2, 6); ctx.fill();
            drawValueBadge(ctx, s2[k] + u2, x2 + bW / 2, Math.max(12, y2 - 12), pal.c2, pal);
          }
          ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
          ctx.fillText(labels[k], centerX, padB.top + phB + 20);
          ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif'; ctx.fillText(subs[k], centerX, padB.top + phB + 35);
          hitRegions.chartCh1.push({ idx: k, x: padB.left + stepB * k, y: padB.top, w: stepB, h: phB + 38, html: '<strong>' + escapeHtml(labels[k]) + '</strong><br/>• ' + escapeHtml(en ? vCfg.leg1_en : vCfg.leg1_zh) + ': <strong>' + s1[k] + u1 + '</strong><br/>• ' + escapeHtml(en ? vCfg.leg2_en : vCfg.leg2_zh) + ': <strong>' + s2[k] + u2 + '</strong>' });
        }
      }
    }

    function drawRadarChart() {
      var env = prepareCanvas('chartRadar'); if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartRadar = [];
      var rCfg = curIp().ch2.radar, axes = isEn() ? rCfg.axes_en : rCfg.axes_zh;
      var highlightedAxis = hoverState.chartRadar >= 0 ? hoverState.chartRadar : (state.activePillar % 4);
      var series = [
        { key: 's0', name: isEn() ? rCfg.s0_en : rCfg.s0_zh, color: pal.c1, fill: 'rgba(51, 153, 255, 0.24)', vals: rCfg.v0 },
        { key: 's1', name: isEn() ? rCfg.s1_en : rCfg.s1_zh, color: pal.c2, fill: 'rgba(34, 197, 94, 0.16)', vals: rCfg.v1 },
        { key: 's2', name: isEn() ? rCfg.s2_en : rCfg.s2_zh, color: pal.c3, fill: 'rgba(255, 183, 77, 0.14)', vals: rCfg.v2 }
      ];
      var cx = w / 2, cy = h / 2 + 8, sidePad = w < 420 ? 88 : 108, radius = Math.max(58, Math.min((w - sidePad * 2) / 2, h * 0.35)), total = axes.length;
      for (var ring = 2; ring <= 10; ring += 2) {
        var r = (ring / 10) * radius; ctx.strokeStyle = pal.grid; ctx.lineWidth = ring === 10 ? 1.3 : 1; ctx.beginPath();
        for (var i = 0; i < total; i++) {
          var ang = -Math.PI / 2 + (i * 2 * Math.PI) / total, px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '600 9.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(String(ring), cx + 4, cy - r);
      }
      for (var a = 0; a < total; a++) {
        var angle = -Math.PI / 2 + (a * 2 * Math.PI) / total, ax = cx + Math.cos(angle) * radius, ay = cy + Math.sin(angle) * radius, isHi = a === highlightedAxis;
        ctx.strokeStyle = isHi ? pal.c1 : pal.grid; ctx.lineWidth = isHi ? 1.8 : 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ax, ay); ctx.stroke();
        var lx = cx + Math.cos(angle) * (radius + 14), ly = cy + Math.sin(angle) * (radius + 15);
        ctx.fillStyle = isHi ? pal.c1 : pal.text; ctx.font = (isHi ? '800 ' : '600 ') + '11px system-ui, sans-serif'; ctx.textBaseline = 'middle';
        ctx.textAlign = Math.abs(Math.cos(angle)) < 0.2 ? 'center' : (Math.cos(angle) > 0 ? 'left' : 'right');
        ctx.fillText(axes[a], lx, ly);
        hitRegions.chartRadar.push({ idx: a, x: Math.min(ax, lx) - 36, y: Math.min(ay, ly) - 22, w: 72 + Math.abs(lx - ax), h: 44, html: '<strong>' + escapeHtml(axes[a]) + '</strong><br/>• ' + escapeHtml(series[0].name) + ': <strong>' + series[0].vals[a].toFixed(1) + '</strong><br/>• ' + escapeHtml(series[1].name) + ': <strong>' + series[1].vals[a].toFixed(1) + '</strong><br/>• ' + escapeHtml(series[2].name) + ': <strong>' + series[2].vals[a].toFixed(1) + '</strong>' });
      }
      for (var s = 0; s < series.length; s++) {
        var item = series[s]; if (!state.radarSeries[item.key]) continue;
        ctx.beginPath();
        for (var idx = 0; idx < total; idx++) {
          var theta = -Math.PI / 2 + (idx * 2 * Math.PI) / total, dist = (item.vals[idx] / 10) * radius;
          var vx = cx + Math.cos(theta) * dist, vy = cy + Math.sin(theta) * dist;
          if (idx === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
        }
        ctx.closePath(); ctx.fillStyle = item.fill; ctx.fill(); ctx.strokeStyle = item.color; ctx.lineWidth = 2.4; ctx.stroke();
        for (var pIdx = 0; pIdx < total; pIdx++) {
          var pTheta = -Math.PI / 2 + (pIdx * 2 * Math.PI) / total, pDist = (item.vals[pIdx] / 10) * radius;
          var pX = cx + Math.cos(pTheta) * pDist, pY = cy + Math.sin(pTheta) * pDist;
          ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(pX, pY, 5.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = item.color; ctx.beginPath(); ctx.arc(pX, pY, 3.6, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    function drawHorizontalBars() {
      var env = prepareCanvas('chartBars'); if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartBars = [];
      var bCfg = curIp().ch3.bars, items = isEn() ? bCfg.items_en : bCfg.items_zh, maxX = bCfg.max_x || 100;
      var colors = [['#34D399', '#16A34A'], ['#3399FF', '#0073E6'], ['#60A5FA', '#2563EB'], ['#FBBF24', '#D97706'], ['#A78BFA', '#7C3AED'], ['#38BDF8', '#0284C7']];
      var pad = { top: 10, right: 18, bottom: 26, left: 18 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      for (var g = 0; g <= 5; g++) {
        var xVal = Math.round((maxX / 5) * g), gx = pad.left + (g / 5) * pw;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, pad.top); ctx.lineTo(gx, pad.top + ph); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = g === 0 ? 'left' : (g === 5 ? 'right' : 'center'); ctx.textBaseline = 'alphabetic';
        ctx.fillText(String(xVal), gx, pad.top + ph + 18);
      }
      var rowH = ph / items.length;
      if (bCfg.ref_line) {
        var tx = pad.left + (bCfg.ref_line / maxX) * pw;
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(tx, pad.top + 4); ctx.lineTo(tx, pad.top + ph - 4); ctx.stroke(); ctx.restore();
      }
      for (var i = 0; i < items.length; i++) {
        var rowTop = pad.top + rowH * i, cPair = colors[i % colors.length];
        if (hoverState.chartBars === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left - 6, rowTop + 2, pw + 12, rowH - 4, 8); ctx.fill(); }
        var labelY = rowTop + Math.max(15, rowH * 0.34), barY = rowTop + Math.max(22, rowH * 0.50), barH = Math.min(15, Math.max(11, rowH * 0.26));
        var bw = Math.max(8, Math.min(pw, (items[i].val / maxX) * pw));
        ctx.fillStyle = pal.text; ctx.font = '600 12px system-ui, sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillText(items[i].label, pad.left, labelY);
        var valStr = items[i].disp || String(items[i].val);
        ctx.font = '800 12.5px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.isDark ? cPair[0] : cPair[1]; ctx.textAlign = 'right'; ctx.fillText(valStr, pad.left + pw, labelY);
        if (w >= 580 && items[i].sub) {
          var valW = ctx.measureText(valStr).width + 10; ctx.font = '500 11px "IBM Plex Mono", sans-serif'; ctx.fillStyle = pal.tick; ctx.fillText(items[i].sub, pad.left + pw - valW, labelY);
        }
        ctx.fillStyle = pal.trackBg; roundRectPath(ctx, pad.left, barY, pw, barH, barH / 2); ctx.fill();
        var barGrad = ctx.createLinearGradient(pad.left, 0, pad.left + bw, 0); barGrad.addColorStop(0, cPair[0]); barGrad.addColorStop(1, cPair[1]);
        ctx.fillStyle = barGrad; roundRectPath(ctx, pad.left, barY, bw, barH, barH / 2); ctx.fill();
        hitRegions.chartBars.push({ idx: i, x: pad.left, y: rowTop, w: pw, h: rowH, html: '<strong>' + escapeHtml(items[i].label) + ': ' + escapeHtml(valStr) + '</strong><br/>• ' + escapeHtml(items[i].sub || '') + '<br/>• ' + escapeHtml(items[i].note || '') });
      }
    }

    function drawEpsComboChart() {
      var env = prepareCanvas('chartEps'); if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartEps = [];
      var cCfg = curIp().ch4.combo, en = isEn(), titles = en ? cCfg.titles_en : cCfg.titles_zh, subs = en ? cCfg.subs_en : cCfg.subs_zh;
      var bars = cCfg.bars, line = cCfg.line, uB = cCfg.u_bar !== undefined ? cCfg.u_bar : '', uL = cCfg.u_line !== undefined ? cCfg.u_line : '%';
      var pad = { top: 26, right: 54, bottom: 44, left: 52 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var minB = 0, maxB = cCfg.max_bar, minL = cCfg.min_line || 0, maxL = cCfg.max_line;
      for (var g = 0; g <= 4; g++) {
        var ratio = g / 4, gy = pad.top + ph - ratio * ph;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.font = '11px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'middle';
        ctx.fillStyle = pal.tick; ctx.textAlign = 'right'; ctx.fillText((maxB <= 25 ? (minB + ratio * (maxB - minB)).toFixed(1) : Math.round(minB + ratio * (maxB - minB))) + uB, pad.left - 7, gy);
        ctx.fillStyle = pal.c2; ctx.textAlign = 'left'; ctx.fillText(Math.round(minL + ratio * (maxL - minL)) + uL, pad.left + pw + 7, gy);
      }
      if (cCfg.ref_line !== undefined) {
        var targetY = pad.top + ph - ((cCfg.ref_line - minL) / (maxL - minL || 1)) * ph;
        ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = pal.c3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(pad.left, targetY); ctx.lineTo(pad.left + pw, targetY); ctx.stroke(); ctx.restore();
      }
      var step = pw / titles.length, barW = Math.min(48, Math.max(24, step * 0.42)), linePts = [];
      for (var i = 0; i < titles.length; i++) {
        var cx = pad.left + step * (i + 0.5);
        if (hoverState.chartEps === i) { ctx.fillStyle = pal.hoverBand; roundRectPath(ctx, pad.left + step * i + 4, pad.top, step - 8, ph, 6); ctx.fill(); }
        if (state.epsSeries.rev) {
          var bh = ((bars[i] - minB) / (maxB - minB || 1)) * ph, bx = cx - barW / 2, by = pad.top + ph - bh;
          var eGrad = ctx.createLinearGradient(0, by, 0, pad.top + ph);
          if (i === cCfg.highlight_idx) { eGrad.addColorStop(0, '#66B2FF'); eGrad.addColorStop(1, '#0073E6'); } else { eGrad.addColorStop(0, '#3399FF'); eGrad.addColorStop(1, '#0059B2'); }
          ctx.fillStyle = eGrad; topRoundedBar(ctx, bx, by, barW, bh, 6); ctx.fill();
          ctx.fillStyle = '#FFFFFF'; ctx.font = '700 10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
          if (bh > 22) ctx.fillText(bars[i] + uB, cx, by + 16); else drawValueBadge(ctx, bars[i] + uB, cx, by - 11, pal.c1, pal);
        }
        linePts.push({ x: cx, y: pad.top + ph - ((line[i] - minL) / (maxL - minL || 1)) * ph, val: line[i] });
        ctx.fillStyle = pal.text; ctx.font = '700 11.5px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
        ctx.fillText(titles[i], cx, pad.top + ph + 19);
        ctx.fillStyle = pal.tick; ctx.font = '10px system-ui, sans-serif'; ctx.fillText(subs[i], cx, pad.top + ph + 33);
        hitRegions.chartEps.push({ idx: i, x: pad.left + step * i, y: pad.top, w: step, h: ph + 36, html: '<strong>' + escapeHtml(titles[i]) + ' (' + escapeHtml(subs[i]) + ')</strong><br/>• ' + escapeHtml(en ? cCfg.leg1_en : cCfg.leg1_zh) + ': <strong>' + bars[i] + uB + '</strong><br/>• ' + escapeHtml(en ? cCfg.leg2_en : cCfg.leg2_zh) + ': <strong>' + line[i] + uL + '</strong>' });
      }
      if (state.epsSeries.oci) {
        ctx.save(); drawSmoothLine(ctx, linePts); ctx.strokeStyle = pal.c2; ctx.lineWidth = 2.8; ctx.stroke(); ctx.restore();
        for (var m = 0; m < linePts.length; m++) {
          ctx.fillStyle = pal.pillBg; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 6, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = pal.c2; ctx.beginPath(); ctx.arc(linePts[m].x, linePts[m].y, 4.2, 0, Math.PI * 2); ctx.fill();
          drawValueBadge(ctx, linePts[m].val + uL, linePts[m].x, Math.max(12, linePts[m].y - 15), pal.c2, pal);
        }
      }
    }

    function drawSimChart() {
      var env = prepareCanvas('chartSim'); if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartSim = [];
      var simRes = computeLifecycleSeries(), yrs = simRes.yrs, totalS = simRes.cumTotalM, baseS = simRes.cumStreamM;
      var maxVal = Math.max(totalS[yrs], 100) * 1.12, pad = { top: 20, right: 20, bottom: 28, left: 62 }, pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      for (var g = 0; g <= 3; g++) {
        var v = (maxVal / 3) * g, gy = pad.top + ph - (g / 3) * ph;
        ctx.strokeStyle = pal.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
        ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        ctx.fillText(fmtMoneyM(v), pad.left - 7, gy);
      }
      var stepX = pw / yrs;
      ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = pal.tick; ctx.lineWidth = 1.7; ctx.beginPath();
      for (var i = 0; i <= yrs; i++) {
        var px = pad.left + (i / yrs) * pw, py = pad.top + ph - (baseS[i] / maxVal) * ph;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.restore();
      ctx.beginPath();
      for (var j = 0; j <= yrs; j++) {
        var tx = pad.left + (j / yrs) * pw, ty = pad.top + ph - (totalS[j] / maxVal) * ph;
        if (j === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
        hitRegions.chartSim.push({ idx: j, x: tx - Math.max(6, stepX * 0.5), y: pad.top, w: Math.max(12, stepX), h: ph + 24, html: isEn() ? ('<strong>Year ' + j + '</strong><br/>• Total GP: <strong>' + fmtMoneyM(totalS[j]) + '</strong><br/>• Direct GP: ' + fmtMoneyM(baseS[j])) : ('<strong>第 ' + j + ' 年累计总毛利</strong><br/>• 全生态累计毛利：<strong>' + fmtMoneyM(totalS[j]) + '</strong><br/>• 直接毛利基准：' + fmtMoneyM(baseS[j])) });
      }
      ctx.strokeStyle = pal.c1; ctx.lineWidth = 2.8; ctx.stroke();
      ctx.lineTo(pad.left + pw, pad.top + ph); ctx.lineTo(pad.left, pad.top + ph); ctx.closePath();
      var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ph); grad.addColorStop(0, 'rgba(0, 115, 230, 0.30)'); grad.addColorStop(1, 'rgba(0, 115, 230, 0.01)');
      ctx.fillStyle = grad; ctx.fill();
      var midYr = Math.max(1, Math.floor(yrs / 2));
      drawValueBadge(ctx, fmtMoneyM(totalS[yrs]), Math.min(w - 46, pad.left + pw - 26), Math.max(pad.top + 12, pad.top + ph - (totalS[yrs] / maxVal) * ph - 14), pal.c1, pal);
      ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", sans-serif'; ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left'; ctx.fillText(isEn() ? 'Year 0' : '测算起点', pad.left, pad.top + ph + 19);
      ctx.textAlign = 'center'; ctx.fillText((isEn() ? ('Year ' + midYr) : ('第 ' + midYr + ' 年')) + ' (' + fmtMoneyM(totalS[midYr]) + ')', pad.left + (midYr / yrs) * pw, pad.top + ph + 19);
      ctx.textAlign = 'right'; ctx.fillText(isEn() ? ('Year ' + yrs) : ('第 ' + yrs + ' 年'), pad.left + pw, pad.top + ph + 19);
    }

    var redrawMap = { chartCh1: drawCh1Chart, chartRadar: drawRadarChart, chartBars: drawHorizontalBars, chartEps: drawEpsComboChart, chartSim: drawSimChart };
    function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }

    function wireCanvasTooltip(canvasId) {
      var canvas = document.getElementById(canvasId), tip = document.getElementById('chartTooltip');
      if (!canvas || !tip) return;
      function handlePointer(clientX, clientY) {
        var rect = canvas.getBoundingClientRect(), mx = clientX - rect.left, my = clientY - rect.top;
        var regions = hitRegions[canvasId] || [], found = null;
        for (var i = 0; i < regions.length; i++) {
          var r = regions[i];
          if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { found = r; break; }
        }
        var nextIdx = found && typeof found.idx === 'number' ? found.idx : -1;
        if (hoverState[canvasId] !== nextIdx) { hoverState[canvasId] = nextIdx; if (redrawMap[canvasId]) redrawMap[canvasId](); }
        if (found) {
          tip.innerHTML = found.html; tip.style.display = 'block';
          var tipW = tip.offsetWidth || 260, tipH = tip.offsetHeight || 74;
          var leftPos = clientX + 14; if (leftPos + tipW > window.innerWidth - 12) leftPos = Math.max(12, clientX - tipW - 14);
          tip.style.left = leftPos + 'px'; tip.style.top = Math.max(12, Math.min(window.innerHeight - tipH - 12, clientY - 18)) + 'px';
        } else tip.style.display = 'none';
      }
      canvas.addEventListener('mousemove', function (e) { handlePointer(e.clientX, e.clientY); });
      canvas.addEventListener('mouseleave', function () {
        if (hoverState[canvasId] !== -1) { hoverState[canvasId] = -1; if (redrawMap[canvasId]) redrawMap[canvasId](); }
        tip.style.display = 'none';
      });
    }
    function wireAllCanvases() { wireCanvasTooltip('chartCh1'); wireCanvasTooltip('chartRadar'); wireCanvasTooltip('chartBars'); wireCanvasTooltip('chartEps'); wireCanvasTooltip('chartSim'); }

    var secObserver = null;
    function observeSections() {
      var tocLinks = document.querySelectorAll('#tocNavList .mui-nav-link');
      if (secObserver) secObserver.disconnect();
      if ('IntersectionObserver' in window) {
        secObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              for (var i = 0; i < tocLinks.length; i++) tocLinks[i].classList.toggle('active', tocLinks[i].getAttribute('data-sec') === entry.target.id);
            }
          });
        }, { rootMargin: '-18% 0px -68% 0px', threshold: 0.02 });
        for (var s = 0; s <= 7; s++) { var secNode = document.getElementById('sec-0' + s); if (secNode) secObserver.observe(secNode); }
      }
    }

    function applyLanguage(lang, silent) {
      state.lang = lang === 'en' ? 'en' : 'zh';
      var en = isEn(), ip = curIp(), rMap = getRichMap(ip);
      document.documentElement.setAttribute('lang', en ? 'en' : 'zh-CN');
      document.documentElement.setAttribute('data-lang', state.lang);
      document.title = en ? ('Texas Instruments (TXN) All Products & Services Hub (' + ip.short_en + ')') : ('德州仪器 (TXN) 全产品线与服务生态研报中枢（当前：' + ip.short_zh + '）| 数据中心');

      var zhBtn = document.getElementById('langZhBtn'), enBtn = document.getElementById('langEnBtn');
      if (zhBtn && enBtn) { zhBtn.classList.toggle('active', !en); enBtn.classList.toggle('active', en); }
      syncHeaderAndSidebarForIp(ip);
      applyDensity(state.density, true);

      var txtNodes = document.querySelectorAll('[data-i18n-zh][data-i18n-en]');
      for (var i = 0; i < txtNodes.length; i++) txtNodes[i].textContent = en ? txtNodes[i].getAttribute('data-i18n-en') : txtNodes[i].getAttribute('data-i18n-zh');
      var richNodes = document.querySelectorAll('[data-i18n-rich]');
      for (var r = 0; r < richNodes.length; r++) { var entry = rMap[richNodes[r].getAttribute('data-i18n-rich')]; if (entry) richNodes[r].innerHTML = en ? entry.en : entry.zh; }
      var phNodes = document.querySelectorAll('[data-ph-zh][data-ph-en]');
      for (var p = 0; p < phNodes.length; p++) phNodes[p].setAttribute('placeholder', en ? phNodes[p].getAttribute('data-ph-en') : phNodes[p].getAttribute('data-ph-zh'));

      var pNoteEl = document.getElementById('pillarFocusNote');
      if (pNoteEl) pNoteEl.innerHTML = '<div>' + (en ? ip.ch2.pillars[state.activePillar].note_en : ip.ch2.pillars[state.activePillar].note_zh) + '</div>';

      syncCh1HeaderText(); syncCollapseButtonsText(); renderPeerTable(); renderChecklist(); updateSimulatorUI(); renderAllCharts();
      safeSetStorage(STORAGE_LANG_KEY, state.lang);
      if (!silent) showToast(en ? 'Switched to English Research Edition' : '已切换至中文深度研报视图');
    }

    function applyTheme(theme, silent) {
      state.theme = theme === 'dark' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      var abIconEl = document.getElementById('appbarThemeIcon');
      if (abIconEl) {
        abIconEl.innerHTML = (state.theme === 'dark')
          ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
      }
      var sDark = document.getElementById('sideThemeDarkBtn'), sLight = document.getElementById('sideThemeLightBtn');
      if (sDark) void 0;
      if (sLight) void 0;
      safeSetStorage(STORAGE_THEME_KEY, state.theme);
      renderAllCharts();
      if (!silent) showToast(state.theme === 'dark' ? (isEn() ? 'Dark Obsidian Mode' : '已切换至 MUI 深海黑曜石护眼模式') : (isEn() ? 'High-Clarity Light Mode' : '已切换至 MUI 高清明亮浅色模式'));
    }

    function toggleSidebar() {
      if (window.innerWidth < 1024) document.body.classList.toggle('drawer-open');
      else {
        var next = document.documentElement.getAttribute('data-sidebar-collapsed') !== '1';
        if (next) document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        else document.documentElement.removeAttribute('data-sidebar-collapsed');
        safeSetStorage(STORAGE_SIDEBAR_KEY, next ? '1' : '0');
        setTimeout(renderAllCharts, 60);
      }
    }
    function closeMobileDrawer() { document.body.classList.remove('drawer-open'); }

    function switchIp(nextId, silent) {
      if (!IP_MAP[nextId]) return;
      state.ipId = nextId;
 try { history.replaceState(null, '', '#ip=' + encodeURIComponent(nextId)); } catch (error) {}

      var ip = curIp();
      state.ch1View = 'viewA'; state.ch1Series = { s1: true, s2: true }; state.activePillar = 0;
      state.radarSeries = { s0: true, s1: true, s2: true }; state.peerFilter = 'all'; state.peerQuery = ''; state.epsSeries = { rev: true, oci: true };
      hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };
      var p2 = ip.ch4.sim.presets.p2;
      state.sim = { views: p2.views, v_per_view: p2.v_per_view, ancillary_m: p2.ancillary_m, years: p2.years, transmedia: p2.transmedia, preset: 'p2' };
      state.checks = loadChecksForIp(ip);
      document.getElementById('ipSectionsHost').innerHTML = buildSectionsHtmlForIp(ip);
      wireAllCanvases(); observeSections(); applyLanguage(state.lang, true);
      closeMobileDrawer();
      if (!silent && window.scrollY > 360) window.scrollTo({ top: 0, behavior: 'smooth' });
      if (!silent) showToast(isEn() ? ('Switched to [' + ip.idx_pad + '] ' + ip.short_en) : ('已切换至 [' + ip.idx_pad + '] ' + ip.short_zh + ' 深度研报'));
    }

    function stepIp(delta) {
      var curIdx = ALL_IPS.indexOf(curIp());
      switchIp(ALL_IPS[(curIdx + delta + ALL_IPS.length) % ALL_IPS.length].id, false);
    }

    function exportActiveIpHtml() {
      var ip = curIp(), cloneRoot = document.documentElement.cloneNode(true);
      var banner = cloneRoot.querySelector('#ipHubSwitcher'); if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
      var tip = cloneRoot.querySelector('#chartTooltip'); if (tip) tip.style.display = 'none';
      var titleEl = cloneRoot.querySelector('title'); if (titleEl) titleEl.textContent = isEn() ? ip.docTitleEn : ip.docTitleZh;
      var blob = new Blob(['<!DOCTYPE html>\n' + cloneRoot.outerHTML], { type: 'text/html;charset=utf-8' });
      var url = URL.createObjectURL(blob), link = document.createElement('a');
      link.href = url; link.download = ip.filename; document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast(isEn() ? ('Exported: ' + ip.filename) : ('已导出独立支柱研报：' + ip.filename));
    }

    function buildQuickJumpItems() {
      var ip = curIp(), en = isEn();
      var ipItems = ALL_IPS.map(function (item) {
        return { type: 'ip', id: item.id, title: (en ? '[Pillar ' : '[切换支柱 ') + item.idx_pad + '] ' + (en ? item.short_en : item.short_zh), sub: en ? (item.chip1_en + ' · ' + item.chip2_en) : (item.chip1_zh + ' · ' + item.chip2_zh) };
      });
      var secItems = ip.toc.map(function (t, i) {
        return { type: 'sec', id: 'sec-0' + i, title: '0' + i + ' · ' + (en ? t[1] : t[0]), sub: en ? ip.short_en : ip.short_zh };
      });
      return ipItems.concat(secItems);
    }

    function init() {
 var requestedTopic = new URLSearchParams(location.hash.slice(1)).get('ip');
 if (requestedTopic && IP_MAP[requestedTopic]) state.ipId = requestedTopic;

      var savedTheme = safeGetStorage(STORAGE_THEME_KEY); if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
      var savedLang = safeGetStorage(STORAGE_LANG_KEY); if (savedLang === 'zh' || savedLang === 'en') state.lang = savedLang;
      var savedDens = safeGetStorage(STORAGE_DENSITY_KEY); if (savedDens === 'compact' || savedDens === 'relaxed') state.density = savedDens;
      state.checks = loadChecksForIp(curIp());
      document.getElementById('ipSectionsHost').innerHTML = buildSectionsHtmlForIp(curIp());
      wireAllCanvases(); observeSections(); applyTheme(state.theme, true); applyDensity(state.density, true); applyLanguage(state.lang, true);

      document.getElementById('langZhBtn').addEventListener('click', function () { applyLanguage('zh', false); });
      document.getElementById('langEnBtn').addEventListener('click', function () { applyLanguage('en', false); });
      document.getElementById('appbarThemeBtn').addEventListener('click', function () { applyTheme(state.theme === 'dark' ? 'light' : 'dark', false); });
      void 0;
      document.getElementById('sidebarToggleBtn').addEventListener('click', toggleSidebar);
      document.getElementById('drawerBackdrop').addEventListener('click', closeMobileDrawer);
      void 0;
      void 0;
      void 0;
      void 0;
      document.getElementById('prevIpBtn').addEventListener('click', function () { stepIp(-1); });
      document.getElementById('nextIpBtn').addEventListener('click', function () { stepIp(1); });
      document.getElementById('coHubPrevBtn')?.addEventListener('click', function () { stepIp(-1); });
      document.getElementById('coHubNextBtn')?.addEventListener('click', function () { stepIp(1); });
      void 0;
      document.getElementById('hubFocusModeBtn')?.addEventListener('click', function () {
        state.focusMode = !state.focusMode; document.body.classList.toggle('focus-single-mode', state.focusMode); syncFocusButtonText(); setTimeout(renderAllCharts, 40);
      });

      document.addEventListener('click', function (e) {
        var catBtn = e.target.closest('[data-cat-filter]'); if (catBtn) { applyCategoryFilter(catBtn.getAttribute('data-cat-filter')); return; }
        var ipBtn = e.target.closest('[data-switch-ip]'); if (ipBtn) { switchIp(ipBtn.getAttribute('data-switch-ip'), false); return; }
        var sideIp = e.target.closest('[data-hub-ip]'); if (sideIp) { switchIp(sideIp.getAttribute('data-hub-ip'), false); return; }
        var ch1Btn = e.target.closest('[data-ch1-view]'); if (ch1Btn) { state.ch1View = ch1Btn.getAttribute('data-ch1-view'); document.getElementById('ch1TabA').classList.toggle('active', state.ch1View === 'viewA'); document.getElementById('ch1TabB').classList.toggle('active', state.ch1View === 'viewB'); syncCh1HeaderText(); drawCh1Chart(); return; }
        var ch1Ser = e.target.closest('[data-ch1-series]'); if (ch1Ser) { var sk = ch1Ser.getAttribute('data-ch1-series'); state.ch1Series[sk] = !state.ch1Series[sk]; if (!state.ch1Series.s1 && !state.ch1Series.s2) state.ch1Series[sk] = true; ch1Ser.classList.toggle('muted', !state.ch1Series[sk]); drawCh1Chart(); return; }
        var colBtn = e.target.closest('[data-collapse-target]'); if (colBtn) { var panel = document.getElementById(colBtn.getAttribute('data-collapse-target')); if (panel) panel.classList.toggle('open'); syncCollapseButtonsText(); return; }
        var pilCard = e.target.closest('[data-pillar]'); if (pilCard) { state.activePillar = parseInt(pilCard.getAttribute('data-pillar'), 10) || 0; var allP = document.querySelectorAll('[data-pillar]'); for (var k = 0; k < allP.length; k++) allP[k].classList.toggle('active', k === state.activePillar); var ipN = curIp(); document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn() ? ipN.ch2.pillars[state.activePillar].note_en : ipN.ch2.pillars[state.activePillar].note_zh) + '</div>'; drawRadarChart(); return; }
        var radPill = e.target.closest('[data-radar-key]'); if (radPill) { var rKey = radPill.getAttribute('data-radar-key'); state.radarSeries[rKey] = !state.radarSeries[rKey]; if (!state.radarSeries.s0 && !state.radarSeries.s1 && !state.radarSeries.s2) state.radarSeries[rKey] = true; radPill.classList.toggle('muted', !state.radarSeries[rKey]); drawRadarChart(); return; }
        var pfBtn = e.target.closest('[data-peer-filter]'); if (pfBtn) { state.peerFilter = pfBtn.getAttribute('data-peer-filter'); var allPf = document.querySelectorAll('[data-peer-filter]'); for (var x = 0; x < allPf.length; x++) allPf[x].classList.toggle('active', allPf[x] === pfBtn); renderPeerTable(); return; }
        var epsBtn = e.target.closest('[data-eps-series]'); if (epsBtn) { var ek = epsBtn.getAttribute('data-eps-series'); state.epsSeries[ek] = !state.epsSeries[ek]; if (!state.epsSeries.rev && !state.epsSeries.oci) state.epsSeries[ek] = true; epsBtn.classList.toggle('muted', !state.epsSeries[ek]); drawEpsComboChart(); return; }
        var prBtn = e.target.closest('[data-preset]'); if (prBtn) { var cfg = curIp().ch4.sim.presets[prBtn.getAttribute('data-preset')]; if (!cfg) return; state.sim = { views: cfg.views, v_per_view: cfg.v_per_view, ancillary_m: cfg.ancillary_m, years: cfg.years, transmedia: cfg.transmedia, preset: prBtn.getAttribute('data-preset') }; document.getElementById('simPrincipalSlider').value = String(cfg.views); document.getElementById('simCagrSlider').value = String(cfg.v_per_view); document.getElementById('simLiveArpuSlider').value = String(cfg.ancillary_m); document.getElementById('simYearsSlider').value = String(cfg.years); document.getElementById('simDripToggle').checked = cfg.transmedia; updateSimulatorUI(); return; }
        if (e.target.closest('#checkAllBtn')) { state.checks = [true, true, true, true, true, true]; safeSetStorage(curIp().checkKey, JSON.stringify(state.checks)); renderChecklist(); showToast(isEn() ? 'Checked all 6 criteria' : '已勾选全部 6 项护城河核查指标'); return; }
        if (e.target.closest('#resetCheckBtn')) { state.checks = [true, true, true, true, false, false]; safeSetStorage(curIp().checkKey, JSON.stringify(state.checks)); renderChecklist(); showToast(isEn() ? 'Checklist reset' : '核查清单已恢复默认基准状态'); return; }
      });

      document.addEventListener('input', function (e) {
        if (e.target.id === 'peerSearchInput') { state.peerQuery = e.target.value; renderPeerTable(); }
        else if (e.target.id === 'simPrincipalSlider') { state.sim.views = parseFloat(e.target.value) || 1; state.sim.preset = ''; updateSimulatorUI(); }
        else if (e.target.id === 'simCagrSlider') { state.sim.v_per_view = parseFloat(e.target.value) || 0.1; state.sim.preset = ''; updateSimulatorUI(); }
        else if (e.target.id === 'simLiveArpuSlider') { state.sim.ancillary_m = parseFloat(e.target.value) || 0; state.sim.preset = ''; updateSimulatorUI(); }
        else if (e.target.id === 'simYearsSlider') { state.sim.years = parseInt(e.target.value, 10) || 5; state.sim.preset = ''; updateSimulatorUI(); }
      });

      document.addEventListener('change', function (e) {
        if (e.target.id === 'simDripToggle') { state.sim.transmedia = !!e.target.checked; updateSimulatorUI(); return; }
        var chk = e.target.closest ? e.target.closest('[data-check-input]') : null;
        if (chk) { state.checks[parseInt(chk.getAttribute('data-check-input'), 10)] = !!chk.checked; safeSetStorage(curIp().checkKey, JSON.stringify(state.checks)); renderChecklist(); }
      });

      var jumpInput = document.getElementById('quickJumpInput'), jumpPop = document.getElementById('quickJumpPopover');
      function renderJumpList(q) {
        var kw = (q || '').trim().toLowerCase();
        var items = buildQuickJumpItems().filter(function (it) { return !kw || (it.title + ' ' + it.sub + ' ' + it.id).toLowerCase().indexOf(kw) !== -1; });
        jumpPop.innerHTML = items.length ? items.map(function (it) { return '<button type="button" class="quick-jump-item" data-jump-type="' + it.type + '" data-jump-id="' + it.id + '"><span class="quick-jump-item-title">' + escapeHtml(it.title) + '</span><span class="quick-jump-item-sub">' + escapeHtml(it.sub) + '</span></button>'; }).join('') : '<div style="padding:10px;font-size:0.78rem;color:var(--text-muted);">未匹配到对应章节或支柱</div>';
        jumpPop.classList.add('open');
      }
      jumpInput.addEventListener('focus', function () { renderJumpList(jumpInput.value); });
      jumpInput.addEventListener('input', function () { renderJumpList(jumpInput.value); });
      jumpPop.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-jump-id]'); if (!btn) return;
        if (btn.getAttribute('data-jump-type') === 'ip') switchIp(btn.getAttribute('data-jump-id'), false);
        else { var secEl = document.getElementById(btn.getAttribute('data-jump-id')); if (secEl) secEl.scrollIntoView({ behavior: 'smooth' }); }
        jumpPop.classList.remove('open');
      });
      document.addEventListener('click', function (e) { if (!e.target.closest('.quick-search-wrap')) jumpPop.classList.remove('open'); });
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); jumpInput.focus(); }
        else if (e.key === 'Escape') { jumpPop.classList.remove('open'); closeMobileDrawer(); }
        else if (!e.target.matches('input, textarea')) { if (e.key === '[') stepIp(-1); else if (e.key === ']') stepIp(1); }
      });

      window.addEventListener('scroll', function () {
        var docEl = document.documentElement, st = window.scrollY || docEl.scrollTop || 0, maxS = Math.max(1, docEl.scrollHeight - window.innerHeight);
        document.getElementById('readingProgressBar').style.width = Math.min(100, Math.max(0, (st / maxS) * 100)) + '%';
      }, { passive: true });
      window.addEventListener('resize', function () { setTimeout(renderAllCharts, 60); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();
