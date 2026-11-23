
    (function () {
      'use strict';

      var THEME_KEY = 'mui_portal_theme_v4';
      var LANG_KEY = 'mui_portal_lang_v1';
      var DEFAULT_TAB = 'feed';
      var WATCH_KEY = 'mui_portal_watchlist_v1';
      var CONV_KEY = 'mui_portal_conviction_v1';
      var NOTES_KEY = 'mui_portal_notes_v1';

      var IS_STANDALONE_PREVIEW = !document.getElementById('docsSearchIndexScript') &&
        window.location.protocol !== 'file:' &&
        !/github\.io|localhost|127\.0\.0\.1/.test(window.location.hostname || '');

      var CAT_ZH = {
        ALL: '全部深度专著矩阵',
        Company: '公司深度',
        SeniorExecutive: '高管人物',
        CorporateCulture: '企业文化',
        software: '软件生态',
        hardware: '硬件产品',
        patent: '核心专利',
        PhysicalStores: '实体零售',
        Other: '其他'
      };
      var CAT_EN = {
        ALL: 'Full Monograph Matrix',
        Company: 'Deep Dive',
        SeniorExecutive: 'Leadership',
        CorporateCulture: 'Culture & Org',
        software: 'Software',
        hardware: 'Hardware',
        patent: 'Patents',
        PhysicalStores: 'Retail',
        Other: 'Other'
      };
      var CAT_SERIAL = {
        ALL: 'SYS.ALL // FULL SPECTRUM',
        Company: 'N01 // MOAT & P&L',
        CorporateCulture: 'N02 // ORG TOPOLOGY',
        SeniorExecutive: 'N03 // LEADERSHIP',
        hardware: 'N04 // SILICON BOM',
        software: 'N05 // AI ECOSYSTEM',
        patent: 'N06 // CORE PATENTS',
        Other: 'others/'
      };
      var PILLAR_SVGS = {
        ALL: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
        Company: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1"/></svg>',
        CorporateCulture: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M10.5 7.5 6.5 16.5M13.5 7.5l4 9"/></svg>',
        SeniorExecutive: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.8-3.6 5-5.5 8-5.5s6.2 1.9 8 5.5"/></svg>',
        hardware: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>',
        software: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        patent: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
      };

      var SECTOR_SHORT_ZH = {
        '数字娱乐与社交生态': '数字娱乐与社交',
        '智能硬件与消费生态': '智能硬件与生态',
        '价值投资机构与ETF基准': '13F机构与ETF',
        '半导体芯片与存储': '半导体与存储',
        '电商与云基础设施': '电商与云计算',
        '消费零售与地产': '消费零售与地产',
        '商业航天与重工制造': '商业航天与制造',
        '云与AI应用软件': '企业云与AI软件',
        '消费零售与烟草龙头': '消费烟草龙头',
        '医疗健康与临床AI': '医疗与临床AI',
        '智能硬件与网络通信': '网络通信设备',
        '金融科技与支付网络': '金融科技与支付'
      };
      var SECTOR_EN = {
        '数字娱乐与社交生态': 'Media & Social',
        '智能硬件与消费生态': 'Consumer Hardware',
        '价值投资机构与ETF基准': '13F & Benchmarks',
        '半导体芯片与存储': 'Semiconductors',
        '电商与云基础设施': 'E-Commerce & Cloud',
        '消费零售与地产': 'Consumer & Housing',
        '商业航天与重工制造': 'Space & Defense',
        '云与AI应用软件': 'Enterprise AI SaaS',
        '消费零售与烟草龙头': 'Consumer Staples',
        '医疗健康与临床AI': 'Clinical AI',
        '智能硬件与网络通信': 'Networking',
        '金融科技与支付网络': 'Fintech'
      };
      var PILLAR_COLORS = {
        Company: '#0073E6',
        SeniorExecutive: '#10B981',
        CorporateCulture: '#7C3AED',
        software: '#F59E0B',
        hardware: '#06B6D4',
        patent: '#EC4899',
        Other: 'var(--text-secondary)'
      };
      var PILLAR_TINTS = {
        Company: 'rgba(0, 115, 230, 0.12)',
        SeniorExecutive: 'rgba(16, 185, 129, 0.12)',
        CorporateCulture: 'rgba(124, 58, 237, 0.12)',
        software: 'rgba(245, 158, 11, 0.13)',
        hardware: 'rgba(6, 182, 212, 0.12)',
        patent: 'rgba(236, 72, 153, 0.12)',
        Other: 'var(--bg-subtle)'
      };

      var BRAND_PALETTES = {
        AAPL: 'linear-gradient(135deg, #0F172A 0%, #0284C7 100%)',
        META: 'linear-gradient(135deg, #0055D4 0%, #00A6FF 100%)',
        GOOGL: 'linear-gradient(135deg, #1D4ED8 0%, #0EA5E9 100%)',
        PDD: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
        'BRK.B': 'linear-gradient(135deg, #92400E 0%, #D97706 100%)',
        NVDA: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
        CRWD: 'linear-gradient(135deg, #BE123C 0%, #F43F5E 100%)',
        RBLX: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
        NFLX: 'linear-gradient(135deg, #991B1B 0%, #EF4444 100%)',
        RKLB: 'linear-gradient(135deg, #312E81 0%, #06B6D4 100%)',
        'H&H': 'linear-gradient(135deg, #78350F 0%, #F59E0B 100%)',
        '13F': 'linear-gradient(135deg, #0F766E 0%, #0284C7 100%)'
      };
      var FALLBACK_GRADS = [
        'linear-gradient(135deg, #0059B2 0%, #06B6D4 100%)',
        'linear-gradient(135deg, #5B21B6 0%, #8B5CF6 100%)',
        'linear-gradient(135deg, #0F766E 0%, #10B981 100%)',
        'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        'linear-gradient(135deg, #9A3412 0%, #F59E0B 100%)'
      ];
      function getBrandGrad(ticker) {
        var tk = String(ticker || '').toUpperCase();
        if (BRAND_PALETTES[tk]) return BRAND_PALETTES[tk];
        var h = 0;
        for (var i = 0; i < tk.length; i++) h = (h * 31 + tk.charCodeAt(i)) % FALLBACK_GRADS.length;
        return FALLBACK_GRADS[h];
      }

      var MATRIX_DIMS = ['Company', 'CorporateCulture', 'SeniorExecutive', 'hardware', 'software', 'patent'];
      var CONV_ORDER = ['', 'CORE', 'FOCUS', 'WATCH'];
      var REPORT_HIGHLIGHTS = {
        'PDD/Company/pdd_12_ttm_rmb_450_8b.html': { rgb: '255, 105, 79', hash: '#ip=pdd_main', titleZh: '拼多多 · 12 大业务板块', titleEn: 'PDD · 12 Business Lines', noteZh: '主站 · Temu · 商业化', noteEn: 'PDD · Temu · Monetization' },
        'ARM/Company/arm_holdings_nasdaq_arm_12_fy2026_4_92b.html': { rgb: '45, 212, 191', hash: '', titleZh: 'Arm · 12 大产品与服务', titleEn: 'Arm · 12 Products & Services', noteZh: '架构授权 · CPU · 版税', noteEn: 'Architecture · CPU · Royalties' }
      };

      var catalog = window.DOCS_CATALOG || { companies: [], files: [], stats: {} };
      var navLinks = Array.isArray(window.DOCS_NAV_LINKS) ? window.DOCS_NAV_LINKS : [];
      var subMatrix = Array.isArray(window.DOCS_SUBFOLDER_MATRIX) ? window.DOCS_SUBFOLDER_MATRIX : [];

      var state = {
        lang: 'zh',
        theme: 'light',
        tab: DEFAULT_TAB,
        category: 'ALL',
        sector: 'ALL',
        company: 'ALL',
        conviction: 'ALL',
        sort: 'updated',
        query: '',
        watchOnly: false,
        simNarrow: false,
        pcTableMode: false,
        expandedCos: { Apple: true },
        watchlist: {},
        convMap: {},
        notes: {}
      };

      try {
        state.watchlist = JSON.parse(localStorage.getItem(WATCH_KEY) || '{}') || {};
        state.convMap = JSON.parse(localStorage.getItem(CONV_KEY) || '{}') || {};
        state.notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}') || {};
      } catch (e) {}

      function isEn() { return state.lang === 'en'; }
      function esc(s) {
        return String(s == null ? '' : s)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }
      function encodeRelUrl(relPath) {
        if (!relPath) return '#';
        return './' + String(relPath).split('/').map(function (seg) { return encodeURIComponent(seg); }).join('/');
      }
      function normalizeNavUrl(item) {
        if (item.relPath) return encodeRelUrl(item.relPath);
        var u = String(item.url || '');
        if (u.indexOf('antuotuo2000.github.io/ReactDocs/') !== -1) {
          var tail = u.split('antuotuo2000.github.io/ReactDocs/')[1];
          return tail ? ('./' + tail) : './index.html';
        }
        var m = u.match(/\/docs\/(.+)$/);
        if (m && m[1]) return './' + m[1];
        return u || '#';
      }

      function getTitle(it) { return (isEn() && it.titleEn) ? it.titleEn : (it.title || it.name || ''); }
      function getSummary(it) { return (isEn() && it.summaryEn) ? it.summaryEn : (it.summary || ''); }
      function getHeadings(it) { return (isEn() && it.headingsEn && it.headingsEn.length) ? it.headingsEn : (it.headings || []); }
      function getCatLabel(c) { return isEn() ? (CAT_EN[c] || c) : (CAT_ZH[c] || c); }
      function getSectorLabel(s) { return isEn() ? (SECTOR_EN[s] || s) : (SECTOR_SHORT_ZH[s] || s); }

      function showToast(msg) {
        var el = document.getElementById('mToast');
        if (!el) return;
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(el._t);
        el._t = setTimeout(function () { el.classList.remove('show'); }, 1800);
      }

      var indexFolderPrefixes = [];
      subMatrix.forEach(function (m) {
        if (m && m.isIndex && m.relPath) {
          var dir = m.relPath.replace(/\/index\.html$/i, '');
          if (dir && indexFolderPrefixes.indexOf(dir + '/') === -1) indexFolderPrefixes.push(dir + '/');
        }
      });

      var rawFiles = Array.isArray(catalog.files) ? catalog.files : [];
      var contentItems = rawFiles.filter(function (f) {
        if (!f || f.isPortalIndex || f.category === 'Portal' || f.relPath === 'index.html') return false;
        for (var i = 0; i < indexFolderPrefixes.length; i++) {
          var pfx = indexFolderPrefixes[i];
          if (f.relPath.indexOf(pfx) === 0 && f.relPath.toLowerCase() !== (pfx + 'index.html').toLowerCase()) return false;
        }
        return true;
      });

      var itemById = {};
      var itemsByCo = {};
      contentItems.forEach(function (it) {
        itemById[it.id] = it;
        if (!itemsByCo[it.company]) itemsByCo[it.company] = [];
        itemsByCo[it.company].push(it);
      });

      var companies = Array.isArray(catalog.companies) ? catalog.companies.slice() : [];
      var companyMap = {};
      companies.forEach(function (c) {
        var arr = itemsByCo[c.folder] || [];
        c.totalWords = arr.reduce(function (s, x) { return s + (x.wordCount || 0); }, 0);
        var pMap = {};
        arr.forEach(function (x) { pMap[x.category] = (pMap[x.category] || 0) + 1; });
        c.pillarCounts = pMap;
        c.pillarCovered = MATRIX_DIMS.filter(function (d) { return pMap[d] > 0; }).length;
        companyMap[c.folder] = c;
      });

      contentItems.forEach(function (it) {
        window.ReportSearch.prepare(it);
      });

      var fullTextRequest;
      var openSheetId;

      function prepareFullText() {
        var corpus = window.DOCS_FULLTEXT;
        if (!corpus) return false;
        contentItems.forEach(function (it) {
          it._rawFt = corpus[it.id] || corpus[it.relPath] || '';
          it._ftHay = it._rawFt.toLowerCase();
        });
        return true;
      }

      function loadFullText() {
        if (fullTextRequest) return fullTextRequest;
        if (window.DOCS_FULLTEXT) {
          fullTextRequest = Promise.resolve(prepareFullText());
          return fullTextRequest;
        }

        var config = document.getElementById('docsSearchIndexScript');
        var src = config && config.getAttribute('data-src');
        if (!src) return Promise.resolve(false);

        var script = document.createElement('script');
        script.src = src;
        script.async = true;
        fullTextRequest = new Promise(function (resolve) {
          script.addEventListener('load', function () {
            if (window.DOCS_FULLTEXT) resolve(prepareFullText());
            else retryLater();
          }, { once: true });
          script.addEventListener('error', retryLater, { once: true });

          function retryLater() {
            script.remove();
            fullTextRequest = null;
            resolve(false);
          }
          document.head.appendChild(script);
        });

        fullTextRequest.then(function (loaded) {
          if (!loaded) return;
          if (state.query.trim()) renderAll();
          if (openSheetId) openBottomSheet(openSheetId);
        });
        return fullTextRequest;
      }

      function tokenize(q) {
        return window.ReportSearch.tokenize(q);
      }
      function highlight(text, tokens) {
        var safe = esc(text);
        if (!tokens || !tokens.length) return safe;
        var out = safe;
        tokens.forEach(function (tk) {
          if (!tk) return;
          var re = new RegExp('(' + tk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
          out = out.replace(re, '<mark class="hl">$1</mark>');
        });
        return out;
      }
      function extractFtSnippet(it, tokens) {
        if (!tokens.length || !it._rawFt) return '';
        var low = it._ftHay;
        for (var i = 0; i < tokens.length; i++) {
          var pos = low.indexOf(tokens[i]);
          if (pos !== -1) {
            var start = Math.max(0, pos - 30);
            var sub = it._rawFt.slice(start, start + 100).replace(/\s+/g, ' ');
            return (start > 0 ? '…' : '') + highlight(sub, tokens) + '…';
          }
        }
        return '';
      }
      function scoreItem(it, tokens) {
        return window.ReportSearch.scoreItem(it, tokens);
      }

      function getFilteredItems() {
        var tokens = tokenize(state.query);
        var res = [];
        contentItems.forEach(function (it) {
          if (state.watchOnly && !state.watchlist[it.company]) return;
          if (state.category !== 'ALL' && it.category !== state.category) return;
          if (state.sector !== 'ALL' && it.sector !== state.sector) return;
          if (state.company !== 'ALL' && it.company !== state.company) return;
          if (state.conviction !== 'ALL' && (state.convMap[it.company] || '') !== state.conviction) return;
          var sc = scoreItem(it, tokens);
          if (sc <= 0) return;
          it._score = sc;
          res.push(it);
        });

        res.sort(function (a, b) {
          if (tokens.length && state.sort === 'updated' && b._score !== a._score) return b._score - a._score;
          if (state.sort === 'words') return (b.wordCount || 0) - (a.wordCount || 0);
          if (state.sort === 'ticker') return String(a.ticker || a.company).localeCompare(String(b.ticker || b.company));
          if (state.sort === 'conviction') {
            var rk = { CORE: 3, FOCUS: 2, WATCH: 1, '': 0 };
            var d = (rk[state.convMap[b.company] || ''] || 0) - (rk[state.convMap[a.company] || ''] || 0);
            if (d !== 0) return d;
          }
          return String(b.modifiedTime || '').localeCompare(String(a.modifiedTime || ''));
        });
        return res;
      }

      // =======================================================================
      var discoverChartFrame = 0;

      function scheduleDiscoverCharts() {
        if (discoverChartFrame) return;
        discoverChartFrame = requestAnimationFrame(function () {
          discoverChartFrame = 0;
          if (state.tab !== 'discover') return;
          drawHeroRadarScope();
          drawMobileSectorChart();
        });
      }

      // High-DPI Sci-Fi 6-Axis Hexagonal Radar Scope inside Hero Masthead
      // =======================================================================
      function drawHeroRadarScope() {
        var canvas = document.getElementById('heroRadarCanvas');
        if (!canvas || !canvas.parentElement) return;
        var rect = canvas.parentElement.getBoundingClientRect();
        if (rect.width < 20 || rect.height < 20) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        var ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, rect.width, rect.height);

        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var R = Math.min(cx, cy) - 22;

        var counts = {};
        contentItems.forEach(function (x) { counts[x.category] = (counts[x.category] || 0) + 1; });
        var maxCnt = Math.max.apply(null, MATRIX_DIMS.map(function (d) { return counts[d] || 0; }).concat([1]));
        var shortTags = ['深度', '文化', '高管', '硬件', '软件', '专利'];
        var shortTagsEn = ['MOAT', 'ORG', 'EXEC', 'HW', 'SW', 'IP'];

        // Concentric Hexagonal / Radar Rings
        [0.35, 0.68, 1.0].forEach(function (lv) {
          ctx.beginPath();
          for (var i = 0; i < 6; i++) {
            var ang = -Math.PI / 2 + (i * Math.PI * 2) / 6;
            var px = cx + Math.cos(ang) * R * lv;
            var py = cy + Math.sin(ang) * R * lv;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = lv === 1 ? 'rgba(103, 232, 249, 0.35)' : 'rgba(56, 189, 248, 0.16)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Axis Spokes & Labels
        ctx.font = '700 8.5px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (var j = 0; j < 6; j++) {
          var a = -Math.PI / 2 + (j * Math.PI * 2) / 6;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
          ctx.stroke();

          var lx = cx + Math.cos(a) * (R + 13);
          var ly = cy + Math.sin(a) * (R + 12);
          ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
          ctx.fillText(isEn() ? shortTagsEn[j] : shortTags[j], lx, ly);
        }

        // Signal Polygon (Normalized with sqrt boost so smaller pillars still show on scope)
        ctx.beginPath();
        var pts = [];
        MATRIX_DIMS.forEach(function (d, idx) {
          var v = counts[d] || 0;
          var norm = Math.max(0.22, Math.sqrt(v / maxCnt));
          var ang = -Math.PI / 2 + (idx * Math.PI * 2) / 6;
          var x = cx + Math.cos(ang) * R * norm;
          var y = cy + Math.sin(ang) * R * norm;
          pts.push({ x: x, y: y });
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        var grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, R);
        grad.addColorStop(0, 'rgba(0, 166, 255, 0.48)');
        grad.addColorStop(1, 'rgba(124, 58, 237, 0.22)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#67E8F9';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Glowing Vertices
        pts.forEach(function (p) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = '#67E8F9';
          ctx.fill();
        });
      }

      // =======================================================================
      // High-DPI Sector Oscilloscope Bar Array (Laser End-Cap Beads!)
      // =======================================================================
      var secTouchZones = [];
      function drawMobileSectorChart() {
        var canvas = document.getElementById('mobileSectorCanvas');
        if (!canvas || !canvas.parentElement) return;
        var rect = canvas.parentElement.getBoundingClientRect();
        if (rect.width < 20 || rect.height < 20) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        var ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, rect.width, rect.height);

        var secMap = {};
        contentItems.forEach(function (it) {
          var s = it.sector || '其他';
          if (!secMap[s]) secMap[s] = { cnt: 0, words: 0, tickers: [] };
          secMap[s].cnt += 1;
          secMap[s].words += (it.wordCount || 0);
          var tkCode = it.ticker || it.company;
          if (tkCode && secMap[s].tickers.indexOf(tkCode) === -1 && secMap[s].tickers.length < 2) {
            secMap[s].tickers.push(tkCode);
          }
        });
        var rows = Object.keys(secMap).map(function (k) {
          return { sec: k, cnt: secMap[k].cnt, words: secMap[k].words, tickers: secMap[k].tickers };
        }).sort(function (a, b) { return b.cnt - a.cnt || b.words - a.words; }).slice(0, 9);

        var isDark = state.theme === 'dark';
        var txtCol = isDark ? '#E2E8F0' : '#0F172A';
        var mutedCol = isDark ? '#7DD3FC' : '#0066DC';
        var subCol = isDark ? '#94A3B8' : '#64748B';
        var trackCol = isDark ? 'rgba(56, 189, 248, 0.11)' : 'rgba(0, 115, 230, 0.075)';
        var showFullReadout = rect.width >= 430;

        var totalDocs = Math.max(1, contentItems.length);
        var maxV = Math.max.apply(null, rows.map(function (r) { return r.cnt; }).concat([1]));
        var leftW = Math.min(116, Math.max(92, rect.width * 0.26));
        var rightW = showFullReadout ? 128 : 78;
        var barW = Math.max(40, rect.width - leftW - rightW);
        var rowH = rect.height / Math.max(1, rows.length);

        [0.25, 0.5, 0.75, 1.0].forEach(function (tk) {
          var gx = leftW + barW * tk;
          ctx.beginPath();
          ctx.moveTo(gx, 4);
          ctx.lineTo(gx, rect.height - 4);
          ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.09)' : 'rgba(0, 115, 230, 0.065)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        secTouchZones = [];
        ctx.textBaseline = 'middle';
        rows.forEach(function (r, i) {
          var cy = i * rowH + rowH / 2;
          var bh = Math.min(13, rowH - 9);
          var isSel = state.sector === r.sec;
          secTouchZones.push({ y1: i * rowH, y2: (i + 1) * rowH, sec: r.sec });

          ctx.fillStyle = isSel ? '#00A6FF' : txtCol;
          ctx.font = (isSel ? '700 ' : '600 ') + '11.2px Inter, -apple-system, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(getSectorLabel(r.sec).slice(0, 11), leftW - 9, cy);

          // Segmented Track
          ctx.fillStyle = trackCol;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(leftW, cy - bh / 2, barW, bh, 3);
          else ctx.rect(leftW, cy - bh / 2, barW, bh);
          ctx.fill();

          // Laser Gradient Bar
          var w = Math.max(10, (r.cnt / maxV) * barW);
          var grad = ctx.createLinearGradient(leftW, 0, leftW + w, 0);
          grad.addColorStop(0, isDark ? '#1D4ED8' : '#0055B8');
          grad.addColorStop(0.75, isDark ? '#0284C7' : '#0080FF');
          grad.addColorStop(1, isDark ? '#67E8F9' : '#00B4FF');
          ctx.fillStyle = grad;
          ctx.globalAlpha = (state.sector === 'ALL' || isSel) ? 0.96 : 0.28;
          ctx.beginPath();
          if (ctx.roundRect) ctx.roundRect(leftW, cy - bh / 2, w, bh, 3);
          else ctx.rect(leftW, cy - bh / 2, w, bh);
          ctx.fill();

          // Glowing Laser Tip Cap
          ctx.fillStyle = isDark ? '#A5F3FC' : '#0073E6';
          ctx.fillRect(leftW + w - 2.5, cy - bh / 2 - 1, 2.5, bh + 2);
          ctx.globalAlpha = 1;

          // Subtle Exemplar Tickers inside remaining track space on wide cards
          if (showFullReadout && barW - w > 64 && r.tickers.length) {
            ctx.textAlign = 'right';
            ctx.font = '600 9.5px "IBM Plex Mono", monospace';
            ctx.fillStyle = isDark ? 'rgba(148,163,184,0.58)' : 'rgba(71,85,105,0.62)';
            ctx.fillText(r.tickers.join('·'), leftW + barW - 6, cy);
          }

          // Rich Multi-Metric Telemetry Readout on Right
          ctx.textAlign = 'left';
          ctx.fillStyle = mutedCol;
          ctx.font = '800 10.5px "IBM Plex Mono", monospace';
          var wStr = isEn() ? ((r.words / 1000).toFixed(0) + 'k') : ((r.words / 10000).toFixed(1) + '万');
          var shareStr = Math.round((r.cnt / totalDocs) * 100) + '%';
          if (showFullReadout) {
            ctx.fillText(String(r.cnt).padStart(2, '0') + (isEn() ? 'd' : '篇'), leftW + barW + 8, cy);
            ctx.fillStyle = subCol;
            ctx.font = '600 10px "IBM Plex Mono", monospace';
            ctx.fillText('· ' + wStr + ' · ' + shareStr, leftW + barW + 38, cy);
          } else {
            ctx.fillText(String(r.cnt).padStart(2, '0') + (isEn() ? '·' : '篇·') + wStr, leftW + barW + 6, cy);
          }
        });
      }

      function renderPcSidebar() {
        document.getElementById('pcRailDocsCnt').textContent = contentItems.length;
        document.getElementById('pcRailCosCnt').textContent = companies.length;
        document.getElementById('pcRail13fCnt').textContent = contentItems.filter(function (f) { return f.sector === '价值投资机构与ETF基准'; }).length;

        var secCounts = {};
        contentItems.forEach(function (it) {
          var s = it.sector || '其他';
          secCounts[s] = (secCounts[s] || 0) + 1;
        });
        var keys = Object.keys(secCounts).sort(function (a, b) { return secCounts[b] - secCounts[a]; });
        var html = [
          '<button type="button" class="pc-nav-btn' + (state.sector === 'ALL' ? ' active' : '') + '" data-pick-sec="ALL">' +
            '<span class="pc-nav-lhs"><span>' + (isEn() ? 'ALL CHANNELS' : '全部行业频段') + '</span></span>' +
            '<span class="pc-nav-cnt mono">' + contentItems.length + '</span>' +
          '</button>'
        ];
        keys.forEach(function (sec) {
          var act = state.sector === sec ? ' active' : '';
          html.push(
            '<button type="button" class="pc-nav-btn' + act + '" data-pick-sec="' + esc(sec) + '">' +
              '<span class="pc-nav-lhs"><span>' + esc(getSectorLabel(sec)) + '</span></span>' +
              '<span class="pc-nav-cnt mono">' + secCounts[sec] + '</span>' +
            '</button>'
          );
        });
        document.getElementById('pcSectorNavList').innerHTML = html.join('');
      }

      function buildDocCardHtml(it, tokens) {
        var feature = REPORT_HIGHLIGHTS[it.relPath];
        var href = encodeRelUrl(it.relPath);
        var starred = !!state.watchlist[it.company];
        var conv = state.convMap[it.company] || '';
        var snippet = tokens.length ? extractFtSnippet(it, tokens) : '';
        var words = it.wordCount || 0;
        var readMin = Math.max(2, Math.round(words / 480));
        var dateTxt = (it.modifiedTime || '').slice(0, 10);
        var coShort = (it.companyLabel || it.company || '').split(' ')[0];
        var spineCol = feature ? ('rgb(' + feature.rgb + ')') : (PILLAR_COLORS[it.category] || '#0073E6');
        var chaps = getHeadings(it).slice(0, 2);

        var openAttrs = IS_STANDALONE_PREVIEW
          ? ('href="#sheet-' + esc(it.id) + '" data-open-sheet="' + esc(it.id) + '"')
          : ('href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"');

        return '<article class="m-doc-card hud-corners MuiCard' + (feature ? ' m-doc-featured' : '') + '" style="--doc-spine:' + spineCol + ';' + (feature ? '--feature-rgb:' + feature.rgb + ';' : '') + '">' +
          '<div style="display:flex;flex-direction:column;gap:9px;">' +
            '<div class="m-doc-meta">' +
              '<div class="m-badge-row">' +
                '<span class="m-tk-badge mono" data-jump-co="' + esc(it.company) + '">' +
                  '<span class="m-tk-dot" style="background:' + spineCol + ';color:' + spineCol + ';"></span>' +
                  esc((it.ticker || it.company).slice(0, 6)) + ' // ' + esc(coShort) +
                '</span>' +
                '<span class="m-pil-badge pil-' + esc(it.category) + '">' + esc(getCatLabel(it.category)) + '</span>' +
                (feature ? '<span class="m-featured-badge">' + (isEn() ? 'Featured' : '重点研究') + '</span>' : '') +
                '<button type="button" class="m-conv-pill mono' + (conv ? (' conv-' + conv) : '') + '" data-cycle-conv="' + esc(it.company) + '">' + (conv || '+评级') + '</button>' +
              '</div>' +
              '<button type="button" class="m-star-btn' + (starred ? ' on' : '') + '" data-star-co="' + esc(it.company) + '" aria-label="收藏该标的">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="' + (starred ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9L12 2.5z"/></svg>' +
              '</button>' +
            '</div>' +
            '<a class="m-doc-title" ' + openAttrs + '>' + highlight(getTitle(it), tokens) + '</a>' +
            '<p class="m-doc-sum">' + highlight(getSummary(it), tokens) + '</p>' +
            (chaps.length ? (
              '<div class="m-chap-pills">' +
                chaps.map(function (ch, idx) {
                  return '<span class="m-chap-pill mono">§0' + (idx + 1) + ' · ' + esc(ch.slice(0, 25)) + '</span>';
                }).join('') +
              '</div>'
            ) : '') +
            (snippet ? '<div class="m-hit-box">雷达命中：' + snippet + '</div>' : '') +
          '</div>' +
          '<div class="m-doc-foot">' +
            '<div class="m-doc-stats mono">' +
              '<span>' + (words / 1000).toFixed(1) + 'k字</span>' +
              '<span>· ~' + readMin + 'm</span>' +
              '<span>· ' + esc(dateTxt) + '</span>' +
            '</div>' +
            '<div class="m-doc-btns">' +
              '<button type="button" class="m-btn" data-open-sheet="' + esc(it.id) + '">' + (isEn() ? 'Outline' : '速览大纲') + '</button>' +
              '<a class="m-btn m-btn-primary" ' + openAttrs + '>' + (isEn() ? 'Launch ↗' : '进入观测 ↗') + '</a>' +
            '</div>' +
          '</div>' +
        '</article>';
      }

      function buildPcTableRows(items, tokens) {
        return items.map(function (it) {
          var href = encodeRelUrl(it.relPath);
          var conv = state.convMap[it.company] || '';
          var openAttrs = IS_STANDALONE_PREVIEW
            ? ('href="#sheet-' + esc(it.id) + '" data-open-sheet="' + esc(it.id) + '"')
            : ('href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"');
          return '<tr>' +
            '<td style="width:94px;"><span class="m-tk-badge mono" data-jump-co="' + esc(it.company) + '">' + esc((it.ticker || it.company).slice(0, 6)) + '</span></td>' +
            '<td style="width:120px;font-weight:700;">' + esc((it.companyLabel || it.company).split(' ')[0]) + '</td>' +
            '<td style="width:100px;"><span class="m-pil-badge pil-' + esc(it.category) + '">' + esc(getCatLabel(it.category)) + '</span></td>' +
            '<td><a class="m-doc-title" style="font-size:0.88rem;" ' + openAttrs + '>' + highlight(getTitle(it), tokens) + '</a></td>' +
            '<td style="width:82px;"><button type="button" class="m-conv-pill mono' + (conv ? (' conv-' + conv) : '') + '" data-cycle-conv="' + esc(it.company) + '">' + (conv || '+评级') + '</button></td>' +
            '<td class="mono" style="width:82px;text-align:right;color:var(--text-muted);">' + ((it.wordCount || 0) / 1000).toFixed(1) + 'k</td>' +
            '<td class="mono" style="width:98px;color:var(--text-muted);">' + esc((it.modifiedTime || '').slice(0, 10)) + '</td>' +
            '<td style="width:156px;text-align:right;"><div class="m-doc-btns" style="justify-content:flex-end;"><button type="button" class="m-btn" style="min-height:30px;padding:0 10px;" data-open-sheet="' + esc(it.id) + '">速览</button><a class="m-btn m-btn-primary" style="min-height:30px;padding:0 10px;" ' + openAttrs + '>观测 ↗</a></div></td>' +
          '</tr>';
        }).join('');
      }

      function buildPcTableHtml(items, tokens) {
        return '<div class="pc-table-wrap hud-corners"><table class="pc-table"><thead><tr><th>SIGNAL // 代码</th><th>研究标的</th><th>研究维度</th><th>深度专著标题</th><th>评级</th><th style="text-align:right;">语料</th><th>同步日期</th><th style="text-align:right;">指令</th></tr></thead><tbody>' + buildPcTableRows(items, tokens) + '</tbody></table></div>';
      }

      function buildPillarButtonsHtml() {
        var counts = { ALL: contentItems.length };
        contentItems.forEach(function (it) { counts[it.category] = (counts[it.category] || 0) + 1; });
        var total = Math.max(1, contentItems.length);

        var html = [
          '<button type="button" class="m-pillar-btn span-full' + (state.category === 'ALL' ? ' active' : '') + '" data-pick-cat="ALL" style="--pil-color:#0073E6;--pil-tint:rgba(0,115,230,0.12);">' +
            '<span class="m-pillar-lhs">' +
              '<span class="m-pil-ico-tile">' + PILLAR_SVGS.ALL + '</span>' +
              '<span><span class="m-pil-name">' + esc(getCatLabel('ALL')) + '</span><span class="m-pil-sub mono">' + CAT_SERIAL.ALL + '</span></span>' +
            '</span>' +
            '<span class="m-pillar-cnt mono">' + counts.ALL + ' 篇</span>' +
          '</button>'
        ];
        MATRIX_DIMS.concat('Other').forEach(function (d) {
          var count = counts[d] || 0;
          if (!count && d !== 'Other') return;
          var act = state.category === d ? ' active' : '';
          var pct = count ? Math.max(8, Math.round((count / total) * 100)) : 0;
          html.push(
            '<button type="button" class="m-pillar-btn' + act + '" data-pick-cat="' + esc(d) + '" style="--pil-color:' + PILLAR_COLORS[d] + ';--pil-tint:' + PILLAR_TINTS[d] + ';">' +
              '<span class="m-pillar-lhs">' +
                '<span class="m-pil-ico-tile">' + (PILLAR_SVGS[d] || PILLAR_SVGS.ALL) + '</span>' +
                '<span style="min-width:0;"><span class="m-pil-name">' + esc(getCatLabel(d)) + '</span><span class="m-pil-sub mono">' + esc(CAT_SERIAL[d] || d) + '</span></span>' +
              '</span>' +
              '<span class="m-pillar-cnt mono">' + count + '</span>' +
              '<span class="m-pil-bar" style="width:' + pct + '%;"></span>' +
            '</button>'
          );
        });
        return html.join('');
      }

      function renderDiscoverTab(items, tokens) {
        var stats = catalog.stats || {};
        var totalWords = stats.totalChars || 0;
        var gurus = companies.filter(function (c) { return c.sector === '价值投资机构与ETF基准'; });
        var coreCos = companies.filter(function (c) { return (c.reportCount || 0) >= 3; });

        var syncDate = (catalog.updatedAt || '').slice(0, 10);
        document.getElementById('heroSyncStamp').textContent = syncDate ? ('SYNC // ' + syncDate) : 'LIVE TELEMETRY';
        var catMap = {};
        contentItems.forEach(function (x) { catMap[x.category] = (catMap[x.category] || 0) + 1; });
        var specColors = { Company: '#38BDF8', CorporateCulture: '#A78BFA', SeniorExecutive: '#34D399', hardware: '#22D3EE', software: '#FBBF24', patent: '#F472B6' };
        document.getElementById('heroSpectrumBar').innerHTML = MATRIX_DIMS.map(function (d) {
          var cnt = catMap[d] || 0;
          if (!cnt) return '';
          var pct = ((cnt / Math.max(1, contentItems.length)) * 100).toFixed(1);
          return '<span class="m-spectrum-seg" style="width:' + pct + '%;background:' + specColors[d] + ';color:' + specColors[d] + ';"></span>';
        }).join('');
        document.getElementById('heroSpectrumSummary').textContent = contentItems.length + ' DOCS // ' + ((totalWords / 10000).toFixed(1)) + '万字';

        var sortedLatest = contentItems.slice().sort(function (a, b) {
          return String(b.modifiedTime || '').localeCompare(String(a.modifiedTime || ''));
        });
        if (sortedLatest.length) {
          var spot = sortedLatest[0];
          document.getElementById('heroSpotlightBox').innerHTML =
            '<div class="m-hero-spotlight" data-open-sheet="' + esc(spot.id) + '">' +
              '<div style="min-width:0;">' +
                '<span class="m-spot-tag mono">SIGNAL LOCK // ' + esc(spot.ticker || spot.company) + '</span>' +
                '<div class="m-spot-title">' + esc(getTitle(spot)) + '</div>' +
              '</div>' +
              '<span class="m-spot-cta">' + (isEn() ? 'SCAN ↗' : '接入 ↗') + '</span>' +
            '</div>';
        }
        var featured = contentItems.filter(function (it) { return !!REPORT_HIGHLIGHTS[it.relPath]; });
        featured.sort(function (a, b) { return a.company === 'PDD' ? -1 : b.company === 'PDD' ? 1 : 0; });
        document.getElementById('heroSpotlightBox').insertAdjacentHTML('afterbegin',
          '<div class="m-featured-pair">' + featured.map(function (it) {
            var feature = REPORT_HIGHLIGHTS[it.relPath];
            return '<a class="m-featured-report" data-featured-report="' + esc(it.ticker) + '" style="--feature-rgb:' + feature.rgb + ';" href="' + esc(encodeRelUrl(it.relPath) + feature.hash) + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="m-featured-kicker mono">FOCUS // ' + esc(it.ticker) + '</span>' +
              '<strong>' + esc(isEn() ? feature.titleEn : feature.titleZh) + '</strong>' +
              '<span class="m-featured-note">' + esc(isEn() ? feature.noteEn : feature.noteZh) + '<b aria-hidden="true">↗</b></span>' +
            '</a>';
          }).join('') + '</div>');

        var secTotal = Object.keys(stats.sectorCounts || {}).length || 4;
        document.getElementById('bentoSecCh').textContent = secTotal + 'CH';
        document.getElementById('pcRailSecCnt').textContent = secTotal + 'CH';
        document.getElementById('bentoCos').textContent = companies.length;
        document.getElementById('bentoCosSub').textContent = isEn()
          ? ((companies.length - gurus.length) + ' Equities · ' + gurus.length + ' 13F/ETFs')
          : ((companies.length - gurus.length) + ' 实体企业 · ' + gurus.length + ' 机构基准');
        document.getElementById('bentoDocs').textContent = contentItems.length;
        document.getElementById('bentoMb').textContent = ((stats.reportBytes || 0) / (1024 * 1024)).toFixed(1) + 'MB';
        document.getElementById('bentoWords').textContent = isEn()
          ? ((totalWords / 1000).toFixed(0) + 'K')
          : ((totalWords / 10000).toFixed(1) + '万');
        document.getElementById('bentoAvg').textContent = (isEn() ? 'Avg ' : '均') + ((totalWords / Math.max(1, contentItems.length)) / 1000).toFixed(1) + 'k';
        document.getElementById('bentoCore').textContent = coreCos.length;
        var corePctNum = Math.round((coreCos.length / Math.max(1, companies.length)) * 100);
        document.getElementById('bentoCorePct').textContent = corePctNum + '% CORE';
        document.getElementById('bentoCoreBarFill').style.width = corePctNum + '%';
        var coreDocsSum = coreCos.reduce(function (acc, x) { return acc + (x.reportCount || 0); }, 0);
        var coreDocsShare = Math.round((coreDocsSum / Math.max(1, contentItems.length)) * 100);
        document.getElementById('bentoCoreSub').textContent = isEn()
          ? ('Top franchises hold ' + coreDocsShare + '% of total docs')
          : ('重仓舰队贡献全库 ' + coreDocsShare + '% 深度专著');

        // Micro-chips for Telemetry 01..04
        document.getElementById('bentoChips01').innerHTML =
          '<span class="m-bento-micro mono">' + (isEn() ? 'EQUITIES ' : '实体龙头 ') + (companies.length - gurus.length) + '</span>' +
          '<span class="m-bento-micro mono">' + (isEn() ? '13F/ETF ' : '大师基准 ') + gurus.length + '</span>';

        document.getElementById('bentoChips02').innerHTML =
          '<span class="m-bento-micro mono">' + (isEn() ? 'EXEC ' : '高管 ') + (catMap.SeniorExecutive || 0) + '</span>' +
          '<span class="m-bento-micro mono">' + (isEn() ? 'MOAT ' : '深度 ') + (catMap.Company || 0) + '</span>' +
          '<span class="m-bento-micro mono">' + (isEn() ? 'ORG ' : '文化 ') + (catMap.CorporateCulture || 0) + '</span>';
        document.getElementById('bentoMeter02').innerHTML = MATRIX_DIMS.map(function (d) {
          var c = catMap[d] || 0;
          if (!c) return '';
          return '<span style="width:' + ((c / Math.max(1, contentItems.length)) * 100).toFixed(1) + '%;background:' + PILLAR_COLORS[d] + ';"></span>';
        }).join('');
        var subDirs = stats.totalSubfolders || 125;
        document.getElementById('bentoDocsSub').textContent = isEn()
          ? (subDirs + ' sub-nodes · Avg ' + (contentItems.length / Math.max(1, companies.length)).toFixed(1) + ' docs/tk')
          : (subDirs + ' 个研究子舱 · 标均 ' + (contentItems.length / Math.max(1, companies.length)).toFixed(1) + ' 篇');

        var maxDocWords = contentItems.reduce(function (m, x) { return Math.max(m, x.wordCount || 0); }, 0);
        document.getElementById('bentoChips03').innerHTML =
          '<span class="m-bento-micro mono">' + (isEn() ? 'MAX ' : '峰值 ') + (maxDocWords / 1000).toFixed(1) + 'k字</span>' +
          '<span class="m-bento-micro mono">HTML 100%</span>';

        var top3 = companies.slice().sort(function(a,b){return (b.reportCount||0)-(a.reportCount||0);}).slice(0,3);
        document.getElementById('bentoChips04').innerHTML = top3.map(function(c){
          return '<span class="m-bento-micro mono">' + esc((c.ticker||c.folder).slice(0,5)) + ' ' + String(c.reportCount||0).padStart(2,'0') + '</span>';
        }).join('');

        // Sector Array Top 3-Cell KPI Strip & Footer
        var secAgg = {};
        contentItems.forEach(function (it) {
          var sc = it.sector || '其他';
          if (!secAgg[sc]) secAgg[sc] = { cnt: 0, words: 0 };
          secAgg[sc].cnt += 1;
          secAgg[sc].words += (it.wordCount || 0);
        });
        var secSorted = Object.keys(secAgg).map(function (k) { return { k: k, cnt: secAgg[k].cnt, words: secAgg[k].words }; })
          .sort(function (a, b) { return b.cnt - a.cnt; });
        var topSec = secSorted[0] || { k: '—', cnt: 0, words: 0 };
        var cr4Cnt = secSorted.slice(0, 4).reduce(function (a, b) { return a + b.cnt; }, 0);
        var cr4Pct = Math.round((cr4Cnt / Math.max(1, contentItems.length)) * 100);
        document.getElementById('sectorArrayKpis').innerHTML =
          '<div class="m-sec-kpi-cell"><span class="m-sec-kpi-k mono">' + (isEn() ? 'LEAD CHANNEL' : '领跑主频赛道') + '</span><span class="m-sec-kpi-v">' + esc(getSectorLabel(topSec.k)) + ' (' + topSec.cnt + ')</span></div>' +
          '<div class="m-sec-kpi-cell"><span class="m-sec-kpi-k mono">' + (isEn() ? 'CR4 DENSITY' : '前四赛道集中度') + '</span><span class="m-sec-kpi-v mono">' + cr4Pct + '% (' + cr4Cnt + '/' + contentItems.length + ')</span></div>' +
          '<div class="m-sec-kpi-cell"><span class="m-sec-kpi-k mono">' + (isEn() ? 'AVG / SECTOR' : '赛道平均储备') + '</span><span class="m-sec-kpi-v mono">' + (contentItems.length / Math.max(1, secSorted.length)).toFixed(1) + (isEn() ? ' docs' : ' 篇 · ') + ((totalWords / Math.max(1, secSorted.length)) / 10000).toFixed(1) + (isEn() ? '' : '万') + '</span></div>';

        document.getElementById('sectorArrayFooter').innerHTML =
          '<span>13F BENCHMARKS // 机构基准快速锁定:</span>' +
          '<span style="display:inline-flex;gap:6px;flex-wrap:wrap;">' +
            gurus.map(function (g) {
              return '<button type="button" class="m-bento-micro mono" style="cursor:pointer;color:var(--accent);" data-jump-co="' + esc(g.folder) + '">' + esc(g.ticker || g.folder) + ' · ' + g.reportCount + '</button>';
            }).join('') +
          '</span>';

        var hotFolders = ['Apple', 'Meta', 'Google', 'PDD', 'BerkshireHathaway-B', 'NVIDIA', 'DuanYongping', 'HimalayaCapitalManagement', 'CrowdStrike', 'RocketLab'];
        document.getElementById('hotTickerRow').innerHTML = hotFolders.map(function (f) {
          var c = companyMap[f];
          if (!c) return '';
          var act = state.company === c.folder ? ' active' : '';
          return '<button type="button" class="m-hot-chip mono' + act + '" data-filter-co="' + esc(c.folder) + '">' +
            '<span>' + esc(c.ticker || c.folder) + '</span>' +
            '<span style="opacity:0.72;">' + String(c.reportCount || 0).padStart(2, '0') + '</span>' +
          '</button>';
        }).join('');

        document.getElementById('discoverPillarGrid').innerHTML = buildPillarButtonsHtml();

        var top8 = companies.slice().sort(function (a, b) {
          return (b.reportCount || 0) - (a.reportCount || 0) || (b.totalWords || 0) - (a.totalWords || 0);
        }).slice(0, 8);
        document.getElementById('coreHoldingsGrid').innerHTML = top8.map(function (c) {
          var tk = (c.ticker || c.folder).slice(0, 5);
          var miniSegs = MATRIX_DIMS.map(function (d) {
            var n = (c.pillarCounts && c.pillarCounts[d]) || 0;
            if (!n) return '';
            var w = ((n / Math.max(1, c.reportCount)) * 100).toFixed(1);
            return '<span style="width:' + w + '%;height:100%;background:' + PILLAR_COLORS[d] + ';"></span>';
          }).join('');

          return '<button type="button" class="m-core-card hud-corners" data-jump-co="' + esc(c.folder) + '">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;width:100%;">' +
              '<span class="m-monogram-sq mono" style="background:' + getBrandGrad(c.ticker || c.folder) + ';">' + esc(tk) + '</span>' +
              '<span class="mono" style="font-size:0.74rem;font-weight:800;color:var(--accent);">' + String(c.reportCount).padStart(2, '0') + (isEn() ? ' DOCS' : ' 篇') + '</span>' +
            '</div>' +
            '<div style="font-size:0.90rem;font-weight:800;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;">' + esc((c.label || c.folder).split(' ')[0]) + '</div>' +
            '<div class="m-mini-spectrum">' + miniSegs + '</div>' +
            '<div class="mono" style="font-size:0.69rem;color:var(--text-muted);">' + ((c.totalWords || 0) / 1000).toFixed(1) + 'k 字 // ' + c.pillarCovered + '/6D</div>' +
          '</button>';
        }).join('');

        var recent = items.slice(0, 12);
        document.getElementById('discoverLatestList').innerHTML = recent.map(function (it) {
          return buildDocCardHtml(it, tokens);
        }).join('');

        scheduleDiscoverCharts();
      }

      function populateSectorSelects() {
        var secCounts = {};
        contentItems.forEach(function (it) {
          var s = it.sector || '其他';
          secCounts[s] = (secCounts[s] || 0) + 1;
        });
        var keys = Object.keys(secCounts).sort(function (a, b) { return secCounts[b] - secCounts[a]; });
        var opts = ['<option value="ALL">' + (isEn() ? 'All Sectors' : '全部一级赛道') + ' (' + contentItems.length + ')</option>'];
        keys.forEach(function (s) {
          var sel = state.sector === s ? ' selected' : '';
          opts.push('<option value="' + esc(s) + '"' + sel + '>' + esc(getSectorLabel(s)) + ' (' + secCounts[s] + ')</option>');
        });
        var html = opts.join('');
        document.getElementById('mobileSectorSelect').innerHTML = html;
        document.getElementById('tickerSectorSelect').innerHTML = html;
      }

      var FEED_BATCH_SIZE = 12;
      var feedItems = [];
      var feedTokens = [];
      var feedShown = 0;
      var feedFilterKey;
      var feedUsesTable = false;
      var feedList = document.getElementById('feedFullList');
      var feedLoadMore = document.getElementById('feedLoadMoreBtn');

      function updateFeedProgress() {
        var total = feedItems.length;
        document.getElementById('feedCountLabel').textContent = isEn()
          ? ('Showing ' + feedShown + ' of ' + total + ' reports')
          : ('已显示 ' + feedShown + ' / ' + total + ' 份研报');
        feedLoadMore.textContent = isEn() ? 'Load more reports' : '加载更多研报';
        feedLoadMore.classList.toggle('hidden', feedShown >= total);
      }

      function appendFeedBatch() {
        if (state.tab !== 'feed' || feedShown >= feedItems.length) return;
        var next = feedItems.slice(feedShown, feedShown + FEED_BATCH_SIZE);
        if (feedUsesTable) {
          feedList.querySelector('tbody').insertAdjacentHTML('beforeend', buildPcTableRows(next, feedTokens));
        } else {
          feedList.insertAdjacentHTML('beforeend', next.map(function (it) {
            return buildDocCardHtml(it, feedTokens);
          }).join(''));
        }
        feedShown += next.length;
        updateFeedProgress();
      }

      feedLoadMore.addEventListener('click', appendFeedBatch);
      var feedScrollFrame = 0;
      window.addEventListener('scroll', function () {
        if (feedScrollFrame || state.tab !== 'feed' || feedShown >= feedItems.length) return;
        feedScrollFrame = requestAnimationFrame(function () {
          feedScrollFrame = 0;
          var trigger = feedLoadMore.getBoundingClientRect();
          if (trigger.height && trigger.top <= window.innerHeight + 120) appendFeedBatch();
        });
      }, { passive: true });

      function renderFeedTab(items, tokens) {
        document.getElementById('feedPillarGrid').innerHTML = buildPillarButtonsHtml();
        populateSectorSelects();
        document.getElementById('mobileSortSelect').value = state.sort;
        var filterKey = JSON.stringify([state.category, state.sector, state.company, state.conviction,
          state.watchOnly, state.sort, state.query.trim()]);
        if (filterKey !== feedFilterKey) feedShown = FEED_BATCH_SIZE;
        feedFilterKey = filterKey;
        feedItems = items;
        feedTokens = tokens;
        feedShown = Math.min(items.length, Math.max(FEED_BATCH_SIZE, feedShown));
        feedUsesTable = state.pcTableMode && !state.simNarrow && window.innerWidth >= 1024;
        updateFeedProgress();

        var layoutBtn = document.getElementById('pcFeedLayoutBtn');
        layoutBtn.textContent = state.pcTableMode ? '切换双栏卡片' : '切换宽表视图';

        var container = feedList;
        if (!items.length) {
          container.className = '';
          container.innerHTML = '<div class="m-doc-card" style="text-align:center;color:var(--text-muted);padding:28px;">未探测到符合当前滤波条件的研报，请点击上方「重置全部」恢复全频段。</div>';
          return;
        }
        var visible = items.slice(0, feedShown);
        if (feedUsesTable) {
          container.className = '';
          container.innerHTML = buildPcTableHtml(visible, tokens);
        } else {
          container.className = 'm-feed-list';
          container.innerHTML = visible.map(function (it) { return buildDocCardHtml(it, tokens); }).join('');
        }
      }

      function renderTickersTab(tokens) {
        populateSectorSelects();
        document.getElementById('tickerConvSelect').value = state.conviction;
        var q = state.query.trim().toLowerCase();

        var cos = companies.filter(function (c) {
          if (state.watchOnly && !state.watchlist[c.folder]) return false;
          if (state.sector !== 'ALL' && c.sector !== state.sector) return false;
          if (state.conviction !== 'ALL' && (state.convMap[c.folder] || '') !== state.conviction) return false;
          if (q) {
            var hay = (c.folder + ' ' + (c.ticker || '') + ' ' + (c.label || '') + ' ' + (c.sector || '')).toLowerCase();
            var hasDocHit = (itemsByCo[c.folder] || []).some(function (d) { return scoreItem(d, tokens) > 0; });
            if (hay.indexOf(q) === -1 && !hasDocHit) return false;
          }
          return true;
        }).sort(function (a, b) {
          var wA = state.watchlist[a.folder] ? 1 : 0, wB = state.watchlist[b.folder] ? 1 : 0;
          if (wA !== wB) return wB - wA;
          return (b.reportCount || 0) - (a.reportCount || 0) || String(a.folder).localeCompare(String(b.folder));
        });

        document.getElementById('tickersAccordionList').innerHTML = cos.map(function (c) {
          var isOpen = !!state.expandedCos[c.folder];
          var docs = (itemsByCo[c.folder] || []).slice().sort(function (a, b) {
            return String(b.modifiedTime || '').localeCompare(String(a.modifiedTime || ''));
          });
          var starred = !!state.watchlist[c.folder];
          var conv = state.convMap[c.folder] || '';
          var memo = state.notes[c.folder] || '';
          var tk = (c.ticker || c.folder).slice(0, 5);

          return '<div class="m-acc-card hud-corners' + (isOpen ? ' expanded' : '') + '" id="co-card-' + esc(c.folder) + '">' +
            '<button type="button" class="m-acc-head" data-toggle-acc="' + esc(c.folder) + '">' +
              '<div style="display:flex;align-items:center;gap:11px;min-width:0;">' +
                '<span class="m-monogram-sq mono" style="background:' + getBrandGrad(c.ticker || c.folder) + ';">' + esc(tk) + '</span>' +
                '<div style="min-width:0;">' +
                  '<div style="font-size:0.94rem;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(c.label || c.folder) + '</div>' +
                  '<div class="mono" style="font-size:0.72rem;color:var(--text-muted);">' + esc(getSectorLabel(c.sector || '')) + ' // ' + ((c.totalWords || 0) / 1000).toFixed(1) + 'k字</div>' +
                '</div>' +
              '</div>' +
              '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">' +
                '<span class="m-pillar-cnt mono">' + docs.length + '篇</span>' +
                '<span class="mono" style="font-size:0.86rem;color:var(--accent);">' + (isOpen ? '▴' : '▾') + '</span>' +
              '</div>' +
            '</button>' +
            (isOpen ? (
              '<div class="m-acc-body">' +
                '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:12px;flex-wrap:wrap;">' +
                  '<div style="display:flex;gap:7px;">' +
                    '<button type="button" class="m-btn" style="min-height:34px;padding:0 10px;" data-star-co="' + esc(c.folder) + '">' + (starred ? '★ 已锁定自选' : '☆ 锁定自选') + '</button>' +
                    '<button type="button" class="m-conv-pill mono' + (conv ? (' conv-' + conv) : '') + '" style="height:34px;padding:0 10px;" data-cycle-conv="' + esc(c.folder) + '">评级: ' + (conv || '点击设置') + '</button>' +
                  '</div>' +
                  '<span class="mono" style="font-size:0.72rem;color:var(--accent);">COVERAGE // ' + c.pillarCovered + '/6D</span>' +
                '</div>' +
                '<div>' +
                  '<textarea class="m-memo-area" data-memo-co="' + esc(c.folder) + '" placeholder="记录 ' + esc(c.ticker || c.folder) + ' 的核心估值锚、技术护城河假设或财报催化剂（本地持久化加密保存）…">' + esc(memo) + '</textarea>' +
                '</div>' +
                '<div class="m-acc-docs-grid">' +
                  docs.map(function (d) {
                    var href = encodeRelUrl(d.relPath);
                    var openAttrs = IS_STANDALONE_PREVIEW
                      ? ('href="#sheet-' + esc(d.id) + '" data-open-sheet="' + esc(d.id) + '"')
                      : ('href="' + esc(href) + '" target="_blank" rel="noopener noreferrer"');
                    return '<div class="m-acc-item">' +
                      '<div style="display:flex;flex-direction:column;gap:6px;">' +
                        '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">' +
                          '<span class="m-pil-badge pil-' + esc(d.category) + '">' + esc(getCatLabel(d.category)) + '</span>' +
                          '<span class="mono" style="font-size:0.72rem;color:var(--text-muted);">' + ((d.wordCount || 0) / 1000).toFixed(1) + 'k字</span>' +
                        '</div>' +
                        '<a class="m-doc-title" style="font-size:0.92rem;" ' + openAttrs + '>' + highlight(getTitle(d), tokens) + '</a>' +
                      '</div>' +
                      '<div style="display:flex;gap:8px;justify-content:flex-end;">' +
                        '<button type="button" class="m-btn" style="min-height:34px;" data-open-sheet="' + esc(d.id) + '">速览大纲</button>' +
                        '<a class="m-btn m-btn-primary" style="min-height:34px;" ' + openAttrs + '>进入观测 ↗</a>' +
                      '</div>' +
                    '</div>';
                  }).join('') +
                '</div>' +
              '</div>'
            ) : '') +
          '</div>';
        }).join('') || '<div class="m-doc-card" style="text-align:center;color:var(--text-muted);">无匹配标的</div>';
      }

      function renderGurusTab(tokens) {
        var gurus = companies.filter(function (c) { return c.sector === '价值投资机构与ETF基准'; });
        var overlap = ['Apple', 'Google', 'Meta', 'PDD', 'Amazon', 'NVIDIA', 'AVGO', 'Crocs', 'MO']
          .map(function (k) { return companyMap[k]; }).filter(Boolean);

        var html = [
          '<div class="m-doc-card hud-corners" style="--doc-spine:#D97706;">' +
            '<div class="m-section-title">13F 传奇大师重仓共振矩阵 // OVERLAP SIGNALS</div>' +
            '<div class="m-hot-chips" style="margin-top:4px;">' +
              overlap.map(function (c) {
                return '<button type="button" class="m-hot-chip mono" data-jump-co="' + esc(c.folder) + '">' +
                  '<span style="color:var(--accent);">' + esc(c.ticker || c.folder) + '</span>' +
                  '<span>' + esc((c.label || c.folder).split(' ')[0]) + '</span>' +
                '</button>';
              }).join('') +
            '</div>' +
          '</div>'
        ];

        gurus.forEach(function (g) {
          var docs = itemsByCo[g.folder] || [];
          html.push(
            '<div class="m-acc-card hud-corners" style="padding:16px;">' +
              '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">' +
                '<div style="display:flex;align-items:center;gap:10px;">' +
                  '<span class="m-monogram-sq mono" style="background:' + getBrandGrad(g.ticker || g.folder) + ';">' + esc((g.ticker || g.folder).slice(0, 5)) + '</span>' +
                  '<span style="font-size:0.98rem;font-weight:800;">' + esc(g.label || g.folder) + '</span>' +
                '</div>' +
                '<span class="m-pillar-cnt mono">' + docs.length + '篇</span>' +
              '</div>' +
              '<div class="m-feed-list">' +
                docs.map(function (d) { return buildDocCardHtml(d, tokens); }).join('') +
              '</div>' +
            '</div>'
          );
        });

        var curated = navLinks.filter(function (n) { return n && n.id !== 'nav_reactdocs_home'; });
        if (curated.length) {
          html.push(
            '<div class="m-chart-card hud-corners">' +
              '<div class="m-section-title" style="margin-bottom:10px;">精选专题跃迁通道 // QUICK PORTALS</div>' +
              '<div class="m-pillar-grid">' +
                curated.map(function (n) {
                  var u = normalizeNavUrl(n);
                  var attrs = IS_STANDALONE_PREVIEW
                    ? ('href="#nav" data-nav-toast="' + esc(n.title) + '"')
                    : ('href="' + esc(u) + '" target="_blank" rel="noopener noreferrer"');
                  return '<a class="m-pillar-btn" style="text-decoration:none;min-height:48px;" ' + attrs + '>' +
                    '<span style="font-size:0.81rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(n.title) + '</span>' +
                    '<span class="mono" style="color:var(--accent);">↗</span>' +
                  '</a>';
                }).join('') +
              '</div>' +
            '</div>'
          );
        }

        document.getElementById('tabGurus').innerHTML = html.join('');
      }

      function renderMatrixTab() {
        var cos = companies.filter(function (c) {
          if (state.watchOnly && !state.watchlist[c.folder]) return false;
          if (state.sector !== 'ALL' && c.sector !== state.sector) return false;
          return (c.reportCount || 0) > 0;
        }).sort(function (a, b) {
          return (b.reportCount || 0) - (a.reportCount || 0) || (b.totalWords || 0) - (a.totalWords || 0);
        });

        document.getElementById('tabMatrix').innerHTML = '<div class="m-adaptive-2col">' + cos.map(function (c) {
          var pct = Math.round(((c.pillarCovered || 0) / 6) * 100);
          var cells = MATRIX_DIMS.map(function (d) {
            var cnt = (c.pillarCounts && c.pillarCounts[d]) || 0;
            if (!cnt) {
              return '<div class="m-cov-cell"><span>' + esc(getCatLabel(d)) + '</span><span class="mono">—</span></div>';
            }
            return '<button type="button" class="m-cov-cell lit" data-matrix-drill="' + esc(c.folder) + '" data-matrix-dim="' + esc(d) + '">' +
              '<span>' + esc(getCatLabel(d)) + '</span>' +
              '<span class="mono">' + cnt + '篇</span>' +
            '</button>';
          }).join('');

          return '<div class="m-acc-card hud-corners" style="padding:15px;display:flex;flex-direction:column;gap:11px;">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">' +
              '<div style="display:flex;align-items:center;gap:10px;min-width:0;">' +
                '<span class="m-monogram-sq mono" style="width:32px;height:32px;border-radius:9px;background:' + getBrandGrad(c.ticker || c.folder) + ';" data-jump-co="' + esc(c.folder) + '">' + esc((c.ticker || c.folder).slice(0, 5)) + '</span>' +
                '<span style="font-weight:800;font-size:0.93rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(c.label || c.folder) + '</span>' +
              '</div>' +
              '<span class="mono" style="font-size:0.76rem;font-weight:800;color:var(--accent);">' + c.reportCount + '篇 // ' + pct + '%</span>' +
            '</div>' +
            '<div class="m-cov-grid">' + cells + '</div>' +
          '</div>';
        }).join('') + '</div>';
      }

      function openBottomSheet(docId) {
        var it = itemById[docId];
        if (!it) return;
        openSheetId = docId;
        loadFullText();
        var href = encodeRelUrl(it.relPath);
        var heads = getHeadings(it);
        var siblings = (itemsByCo[it.company] || []).filter(function (x) { return x.id !== it.id; });
        var ftExcerpt = (it._rawFt || ((window.DOCS_FULLTEXT || {})[it.relPath]) || '').slice(0, 860).trim();
        var tokens = tokenize(state.query);

        document.getElementById('sheetMeta').textContent =
          'TELEMETRY // ' + (it.ticker || it.company) + ' · ' + getCatLabel(it.category) + ' · ' + (it.wordCount || 0).toLocaleString() + (isEn() ? ' WORDS' : ' 字');
        document.getElementById('sheetTitle').textContent = getTitle(it);

        var ctaHtml = IS_STANDALONE_PREVIEW
          ? '<button type="button" class="m-btn m-btn-primary" style="width:100%;min-height:46px;font-size:0.90rem;" data-jump-co="' + esc(it.company) + '">展开 ' + esc(it.ticker || it.company) + ' 标的完整专著舱</button>' +
            '<div style="font-size:0.74rem;color:var(--text-muted);text-align:center;">本地解压门户包后点击「进入观测 ↗」可直接新窗口打开完整交互分析页</div>'
          : '<a class="m-btn m-btn-primary" style="width:100%;min-height:46px;font-size:0.90rem;" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' +
              (isEn() ? 'Launch Full Blueprint Monograph ↗' : '新窗口启动完整蓝图交互研报 ↗') +
            '</a>';

        document.getElementById('sheetBody').innerHTML =
          ctaHtml +
          '<div style="padding:14px;border-radius:13px;background:var(--bg-subtle);border:1px solid var(--border-subtle);">' +
            '<div class="mono" style="font-size:0.70rem;font-weight:800;color:var(--accent);margin-bottom:5px;">EXECUTIVE THESIS // 核心论点</div>' +
            '<p style="font-size:0.86rem;line-height:1.65;color:var(--text-primary);">' + highlight(getSummary(it) || '暂无摘要', tokens) + '</p>' +
          '</div>' +
          (heads.length ? (
            '<div style="display:flex;flex-direction:column;gap:6px;">' +
              '<div class="mono" style="font-size:0.72rem;font-weight:800;color:var(--text-muted);">CHAPTER TOPOLOGY // 章节拓扑 (' + heads.length + ')</div>' +
              heads.slice(0, 18).map(function (h, i) {
                return '<div style="padding:9px 11px;border-radius:10px;background:var(--bg-subtle);border:1px solid var(--border-subtle);font-size:0.82rem;display:flex;gap:8px;">' +
                  '<span class="mono" style="color:var(--accent);font-weight:800;">§' + String(i + 1).padStart(2, '0') + '</span>' +
                  '<span style="font-weight:600;">' + highlight(h, tokens) + '</span>' +
                '</div>';
              }).join('') +
            '</div>'
          ) : '') +
          (ftExcerpt ? (
            '<div style="padding:13px;border-radius:13px;border:1px solid var(--border-subtle);background:var(--bg-paper);">' +
              '<div class="mono" style="font-size:0.70rem;font-weight:800;color:var(--accent);margin-bottom:5px;">CORPUS STREAM // 语料切片</div>' +
              '<p style="font-size:0.80rem;line-height:1.65;color:var(--text-secondary);">' + highlight(ftExcerpt, tokens) + '…</p>' +
            '</div>'
          ) : '') +
          (siblings.length ? (
            '<div style="display:flex;flex-direction:column;gap:6px;">' +
              '<div class="mono" style="font-size:0.72rem;font-weight:800;color:var(--text-muted);">LINKED NODES // 同公司关联专著 (' + siblings.length + ')</div>' +
              siblings.map(function (s) {
                return '<button type="button" class="m-pillar-btn" style="min-height:48px;" data-open-sheet="' + esc(s.id) + '">' +
                  '<span style="font-size:0.82rem;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(getTitle(s)) + '</span>' +
                  '<span class="m-pillar-cnt mono">' + esc(getCatLabel(s.category)) + '</span>' +
                '</button>';
              }).join('') +
            '</div>'
          ) : '');

        document.getElementById('sheetBackdrop').classList.add('open');
        document.getElementById('mobileBottomSheet').classList.add('open');
      }

      function closeBottomSheet() {
        openSheetId = null;
        document.getElementById('sheetBackdrop').classList.remove('open');
        document.getElementById('mobileBottomSheet').classList.remove('open');
      }

      function renderFilterNotice() {
        var chips = [];
        if (state.watchOnly) chips.push('<span class="m-ftag">★ 自选池 <button type="button" data-clr="watch">×</button></span>');
        if (state.company !== 'ALL') chips.push('<span class="m-ftag">' + esc(state.company) + ' <button type="button" data-clr="co">×</button></span>');
        if (state.category !== 'ALL') chips.push('<span class="m-ftag">' + esc(getCatLabel(state.category)) + ' <button type="button" data-clr="cat">×</button></span>');
        if (state.sector !== 'ALL') chips.push('<span class="m-ftag">' + esc(getSectorLabel(state.sector)) + ' <button type="button" data-clr="sec">×</button></span>');
        if (state.conviction !== 'ALL') chips.push('<span class="m-ftag">评级:' + esc(state.conviction) + ' <button type="button" data-clr="conv">×</button></span>');
        if (state.query.trim()) chips.push('<span class="m-ftag">"' + esc(state.query.trim()) + '" <button type="button" data-clr="q">×</button></span>');

        var bar = document.getElementById('activeFilterNotice');
        if (chips.length) {
          document.getElementById('activeFilterChips').innerHTML = chips.join('');
          bar.classList.remove('hidden');
        } else {
          bar.classList.add('hidden');
        }
      }

      function renderAll() {
        var items = getFilteredItems();
        var tokens = tokenize(state.query);

        var wCount = Object.keys(state.watchlist).filter(function (k) { return state.watchlist[k]; }).length;
        document.getElementById('watchCountBadge').textContent = wCount;
        document.getElementById('watchFilterBtn').classList.toggle('active', state.watchOnly);
        document.getElementById('liveHeaderStat').textContent = isEn()
          ? ('SYS.ONLINE // ' + companies.length + ' TICKERS · ' + contentItems.length + ' DOCS')
          : ('SYS.ONLINE // ' + companies.length + ' 标的 · ' + contentItems.length + ' 专著');

        document.querySelectorAll('[data-tab]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-tab') === state.tab);
        });

        renderPcSidebar();
        renderFilterNotice();

        document.getElementById('tabDiscover').classList.toggle('hidden', state.tab !== 'discover');
        document.getElementById('tabFeed').classList.toggle('hidden', state.tab !== 'feed');
        document.getElementById('tabTickers').classList.toggle('hidden', state.tab !== 'tickers');
        document.getElementById('tabGurus').classList.toggle('hidden', state.tab !== 'gurus');
        document.getElementById('tabMatrix').classList.toggle('hidden', state.tab !== 'matrix');

        if (state.tab === 'discover') renderDiscoverTab(items, tokens);
        else if (state.tab === 'feed') renderFeedTab(items, tokens);
        else if (state.tab === 'tickers') renderTickersTab(tokens);
        else if (state.tab === 'gurus') renderGurusTab(tokens);
        else if (state.tab === 'matrix') renderMatrixTab();
      }

      function applyTheme(t, silent) {
        state.theme = t === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        document.getElementById('themeIconBox').innerHTML = state.theme === 'dark'
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        if (state.tab === 'discover') {
          scheduleDiscoverCharts();
        }
        if (!silent) showToast(state.theme === 'dark' ? '已接入深空黑曜石观测模式' : '已接入浅色工程蓝图观测模式');
      }

      function applyLang(l, silent) {
        state.lang = l === 'en' ? 'en' : 'zh';
        document.getElementById('langSwitchBtn').textContent = isEn() ? '中文' : 'EN';
        document.querySelectorAll('[data-ui-zh]').forEach(function (el) {
          el.textContent = el.getAttribute(isEn() ? 'data-ui-en' : 'data-ui-zh');
        });
        document.getElementById('globalSearchInput').placeholder = isEn()
          ? 'Scan tickers (AAPL), executives, or full-text corpus…'
          : '输入信号指令或检索代码 (AAPL / BRK.B)、高管与 全库研报语料…';
        renderAll();
        if (!silent) showToast(isEn() ? 'Switched to English' : '已切换为中文');
      }

      // Scroll Laser Progress Beam
      window.addEventListener('scroll', function () {
        var docH = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docH > 40 ? Math.min(100, Math.max(8, (window.scrollY / docH) * 100)) : 18;
        var beam = document.getElementById('scrollLaserBeam');
        if (beam) beam.style.width = pct.toFixed(1) + '%';
      }, { passive: true });

      document.addEventListener('click', function (e) {
        var t = e.target && e.target.nodeType === 3 ? e.target.parentElement : e.target;
        if (!t || !t.closest) return;

        var tabBtn = t.closest('[data-tab],[data-goto-tab]');
        if (tabBtn) {
          state.tab = tabBtn.getAttribute('data-tab') || tabBtn.getAttribute('data-goto-tab');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          renderAll();
          return;
        }

        var secNav = t.closest('[data-pick-sec]');
        if (secNav) {
          var sv = secNav.getAttribute('data-pick-sec');
          state.sector = (sv !== 'ALL' && state.sector === sv) ? 'ALL' : sv;
          if (state.sector !== 'ALL' && state.tab === 'discover') state.tab = 'feed';
          renderAll();
          return;
        }

        var starBtn = t.closest('[data-star-co]');
        if (starBtn) {
          e.stopPropagation();
          var coK = starBtn.getAttribute('data-star-co');
          state.watchlist[coK] = !state.watchlist[coK];
          if (!state.watchlist[coK]) delete state.watchlist[coK];
          try { localStorage.setItem(WATCH_KEY, JSON.stringify(state.watchlist)); } catch (err) {}
          showToast(state.watchlist[coK] ? ('★ 已锁定自选 ' + coK) : ('已解除自选 ' + coK));
          renderAll();
          return;
        }

        var convBtn = t.closest('[data-cycle-conv]');
        if (convBtn) {
          e.stopPropagation();
          var ck = convBtn.getAttribute('data-cycle-conv');
          var cur = state.convMap[ck] || '';
          var nxt = CONV_ORDER[(CONV_ORDER.indexOf(cur) + 1) % CONV_ORDER.length];
          if (nxt) state.convMap[ck] = nxt;
          else delete state.convMap[ck];
          try { localStorage.setItem(CONV_KEY, JSON.stringify(state.convMap)); } catch (err) {}
          showToast(ck + ' 评级: ' + (nxt || '未设置'));
          renderAll();
          return;
        }

        var pickCat = t.closest('[data-pick-cat]');
        if (pickCat) {
          var cv = pickCat.getAttribute('data-pick-cat');
          state.category = (state.category === cv && cv !== 'ALL') ? 'ALL' : cv;
          if (state.tab === 'discover' && state.category !== 'ALL') state.tab = 'feed';
          renderAll();
          return;
        }

        var filterCo = t.closest('[data-filter-co]');
        if (filterCo) {
          var fc = filterCo.getAttribute('data-filter-co');
          state.company = state.company === fc ? 'ALL' : fc;
          if (state.company !== 'ALL') state.tab = 'feed';
          renderAll();
          return;
        }

        var jumpCo = t.closest('[data-jump-co]');
        if (jumpCo) {
          e.preventDefault();
          var jc = jumpCo.getAttribute('data-jump-co');
          state.expandedCos[jc] = true;
          state.tab = 'tickers';
          closeBottomSheet();
          renderAll();
          setTimeout(function () {
            var card = document.getElementById('co-card-' + jc);
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 40);
          return;
        }

        var accBtn = t.closest('[data-toggle-acc]');
        if (accBtn) {
          var ac = accBtn.getAttribute('data-toggle-acc');
          state.expandedCos[ac] = !state.expandedCos[ac];
          renderTickersTab(tokenize(state.query));
          return;
        }

        var mDrill = t.closest('[data-matrix-drill]');
        if (mDrill) {
          state.company = mDrill.getAttribute('data-matrix-drill');
          state.category = mDrill.getAttribute('data-matrix-dim') || 'ALL';
          state.tab = 'feed';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          renderAll();
          return;
        }

        var openSh = t.closest('[data-open-sheet]');
        if (openSh) {
          e.preventDefault();
          openBottomSheet(openSh.getAttribute('data-open-sheet'));
          return;
        }

        var navToast = t.closest('[data-nav-toast]');
        if (navToast) {
          e.preventDefault();
          showToast('解压完整门户包后可直接打开: ' + navToast.getAttribute('data-nav-toast'));
          return;
        }

        var clr = t.closest('[data-clr]');
        if (clr) {
          var kind = clr.getAttribute('data-clr');
          if (kind === 'watch') state.watchOnly = false;
          if (kind === 'co') state.company = 'ALL';
          if (kind === 'cat') state.category = 'ALL';
          if (kind === 'sec') state.sector = 'ALL';
          if (kind === 'conv') state.conviction = 'ALL';
          if (kind === 'q') {
            state.query = '';
            document.getElementById('globalSearchInput').value = '';
            document.getElementById('clearSearchBtn').classList.add('hidden');
            document.getElementById('pcSearchKbd').classList.remove('hidden');
          }
          renderAll();
          return;
        }
      });

      document.getElementById('mobileSectorCanvas').addEventListener('click', function (ev) {
        var rect = ev.currentTarget.getBoundingClientRect();
        var y = ev.clientY - rect.top;
        for (var i = 0; i < secTouchZones.length; i++) {
          var z = secTouchZones[i];
          if (y >= z.y1 && y <= z.y2) {
            state.sector = z.sec;
            state.tab = 'feed';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            renderAll();
            break;
          }
        }
      });

      document.addEventListener('input', function (ev) {
        var t = ev.target;
        if (t && t.hasAttribute('data-memo-co')) {
          var co = t.getAttribute('data-memo-co');
          state.notes[co] = t.value;
          try { localStorage.setItem(NOTES_KEY, JSON.stringify(state.notes)); } catch (err) {}
        }
      });

      var sidebarToggle = document.getElementById('pcSidebarToggleBtn');
      sidebarToggle.setAttribute('aria-expanded', String(!document.documentElement.hasAttribute('data-sidebar-collapsed')));
      sidebarToggle.addEventListener('click', function () {
        var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
        if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
        else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        sidebarToggle.setAttribute('aria-expanded', String(col));
        if (state.tab === 'discover') {
          scheduleDiscoverCharts();
        }
      });

      document.getElementById('pcFeedLayoutBtn').addEventListener('click', function () {
        state.pcTableMode = !state.pcTableMode;
        renderAll();
      });

      document.getElementById('brandResetBtn').addEventListener('click', function () {
        state.tab = DEFAULT_TAB;
        state.category = 'ALL';
        state.sector = 'ALL';
        state.company = 'ALL';
        state.conviction = 'ALL';
        state.watchOnly = false;
        state.query = '';
        document.getElementById('globalSearchInput').value = '';
        document.getElementById('clearSearchBtn').classList.add('hidden');
        document.getElementById('pcSearchKbd').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        renderAll();
      });

      document.getElementById('resetFiltersBtn').addEventListener('click', function () {
        state.category = 'ALL';
        state.sector = 'ALL';
        state.company = 'ALL';
        state.conviction = 'ALL';
        state.watchOnly = false;
        state.query = '';
        document.getElementById('globalSearchInput').value = '';
        document.getElementById('clearSearchBtn').classList.add('hidden');
        document.getElementById('pcSearchKbd').classList.remove('hidden');
        renderAll();
      });

      document.getElementById('simWidthBtn').addEventListener('click', function () {
        state.simNarrow = !state.simNarrow;
        document.body.classList.toggle('sim-narrow', state.simNarrow);
        this.classList.toggle('active', state.simNarrow);
        document.getElementById('simWidthLabel').textContent = state.simNarrow ? '恢复宽屏' : '手机窄屏';
        renderAll();
      });

      document.getElementById('watchFilterBtn').addEventListener('click', function () {
        state.watchOnly = !state.watchOnly;
        if (state.watchOnly && state.tab === 'discover') state.tab = 'feed';
        renderAll();
      });

      document.getElementById('langSwitchBtn').addEventListener('click', function () {
        var nl = isEn() ? 'zh' : 'en';
        applyLang(nl, false);
        try { localStorage.setItem(LANG_KEY, nl); } catch (e) {}
      });

      document.getElementById('themeToggleBtn').addEventListener('click', function () {
        var nt = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nt, false);
        try { localStorage.setItem(THEME_KEY, nt); } catch (e) {}
      });

      var sInput = document.getElementById('globalSearchInput');
      var clrSearch = document.getElementById('clearSearchBtn');
      var kbdHint = document.getElementById('pcSearchKbd');
      sInput.addEventListener('input', function () {
        state.query = sInput.value;
        if (state.query.trim()) loadFullText();
        clrSearch.classList.toggle('hidden', !state.query);
        kbdHint.classList.toggle('hidden', !!state.query);
        if (state.query.trim() && state.tab !== 'feed' && state.tab !== 'tickers') {
          state.tab = 'feed';
        }
        renderAll();
      });
      clrSearch.addEventListener('click', function () {
        state.query = '';
        sInput.value = '';
        clrSearch.classList.add('hidden');
        kbdHint.classList.remove('hidden');
        sInput.focus();
        renderAll();
      });

      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          sInput.focus();
          sInput.select();
        } else if (e.key === 'Escape') {
          closeBottomSheet();
        } else if (e.key === '/' && document.activeElement !== sInput && (!e.target || (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA'))) {
          e.preventDefault();
          sInput.focus();
        }
      });

      document.getElementById('mobileSectorSelect').addEventListener('change', function (e) {
        state.sector = e.target.value;
        renderAll();
      });
      document.getElementById('tickerSectorSelect').addEventListener('change', function (e) {
        state.sector = e.target.value;
        renderAll();
      });
      document.getElementById('mobileSortSelect').addEventListener('change', function (e) {
        state.sort = e.target.value;
        renderAll();
      });
      document.getElementById('tickerConvSelect').addEventListener('change', function (e) {
        state.conviction = e.target.value;
        renderAll();
      });

      document.getElementById('mobileExportCsvBtn').addEventListener('click', function () {
        var items = getFilteredItems();
        var rows = [['Ticker', 'Company', 'Pillar', 'Title', 'Words', 'Updated', 'Path'].join(',')];
        items.forEach(function (it) {
          rows.push([
            it.ticker || it.company,
            it.companyLabel || it.company,
            getCatLabel(it.category),
            getTitle(it),
            String(it.wordCount || 0),
            (it.modifiedTime || '').slice(0, 10),
            it.relPath || ''
          ].map(function (v) { return '"' + String(v || '').replace(/"/g, '""') + '"'; }).join(','));
        });
        var blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'observatory_signals.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('已导出 ' + items.length + ' 条观测信号 CSV');
      });

      document.getElementById('closeSheetBtn').addEventListener('click', closeBottomSheet);
      document.getElementById('sheetBackdrop').addEventListener('click', closeBottomSheet);

      window.addEventListener('resize', function () {
        if (state.tab === 'discover') {
          scheduleDiscoverCharts();
        }
        if (state.tab === 'feed' && state.pcTableMode) renderAll();
      });
      window.addEventListener('storage', function (ev) {
        if (ev.key === THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
        if (ev.key === LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
      });

      var incomingQuery = new URLSearchParams(location.search).get('q');
      if (incomingQuery) {
        state.query = incomingQuery;
        state.tab = 'feed';
        sInput.value = incomingQuery;
        clrSearch.classList.remove('hidden');
        kbdHint.classList.add('hidden');
        loadFullText();
      }
      if (window.DOCS_FULLTEXT) loadFullText();

      try {
        applyTheme((localStorage.getItem(THEME_KEY) || 'light').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {
        renderAll();
      }
    })();
