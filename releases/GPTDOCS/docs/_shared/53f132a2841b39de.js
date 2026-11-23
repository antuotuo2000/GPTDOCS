
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
      var STORAGE_CHK_KEY = 'aapl_iphone_bp_chk_v1';

      var state = { theme: 'dark', lang: 'zh', mView: 'rev', rView: 'geo' };
      var hits = { marketCanvas: [], regionCanvas: [] };

      function showToast(msg) {
        var bar = document.getElementById('muiSnackbar');
        if (!bar) return;
        bar.textContent = msg;
        bar.classList.add('show');
        clearTimeout(bar._t);
        bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2000);
      }

      function getPalette() {
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
          dark: dark,
          text: dark ? '#F3F6F9' : '#0F1924',
          sub: dark ? '#B2BAC2' : '#334155',
          tick: dark ? '#94A3B8' : '#475569',
          grid: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(100, 116, 139, 0.15)',
          blue: dark ? '#3399FF' : '#0073E6',
          cyan: dark ? '#38BDF8' : '#0284C7',
          green: dark ? '#22C55E' : '#16A34A',
          violet: dark ? '#A78BFA' : '#7C3AED',
          amber: dark ? '#FFB74D' : '#D97706'
        };
      }

      function applyTheme(t, silent) {
        state.theme = (t === 'dark') ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        var ic = document.getElementById('appbarThemeIcon');
        if (ic) {
          ic.innerHTML = state.theme === 'dark'
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
        }
        drawAll();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
      }

      function applyLang(lang, silent) {
        state.lang = (lang === 'en') ? 'en' : 'zh';
        document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
        var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
        if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', state.lang === 'zh'); }
        if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', state.lang === 'en'); }
        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
          if (val !== null) {
            if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
            else nodes[i].textContent = val;
          }
        }
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      // P1: 4-SKU Showroom & BOM Tear-Down Switcher
      var SKUS = [
        {
          badge: 'SKU 01 · FOLDABLE HALO FLAGSHIP ($1,999+)',
          title: 'iPhone Duo 首款折叠旗舰：把手机天花板直接拉升至 $2,000 价格带',
          desc: '苹果在折叠屏赛道隐忍七年直至无折痕超薄玻璃（UTG）与液态金属铰链成熟才一击必中，同步打通 iOS 27 与 iPadOS 27 多任务分屏生态。据 Counterpoint 追踪，尽管初代受铰链与双层 OLED 良率制约供不应求，但随着 2027 年产能爬坡，预计苹果折叠机出货量将在 2027 年实现近 3 倍爆发。',
          tags: ['2nm 级 A20 Pro 芯片', '零折痕柔性内屏 + 钛金属铰链', '高密度硅碳双电芯', 'AppleCare+ 高单价强附着'],
          gm: '预估毛利率 ~44.5%',
          segs: [18.0, 22.0, 15.5, 44.5],
          leg: [['芯片与高速内存', '~18.0%'], ['双屏与精密铰链', '~22.0%'], ['光学/电池/组装', '~15.5%'], ['单机硬件毛利额', '~$890+']]
        },
        {
          badge: 'SKU 02 · PRO PROFIT CORE ($1,099–$1,599)',
          title: 'iPhone 18 Pro / Pro Max：提价 $100 销量照涨的全球利润压舱石',
          desc: '作为苹果真正的现金牛中枢，18 Pro 系列独享高规格 Neural Engine 运存带宽、可变光圈潜望长焦与 ProMotion 超亮屏幕。2026 秋季即便全系上调起售价 $100，上市首三周全球销量仍逆势增长 +3.1%，直接推动 Q3 批发 ASP 历史首破 $1,000。',
          tags: ['A20 Pro 满血算力', '48MP 全焦段潜望光学', '12GB+ 端侧 AI 高速运存', '512GB/1TB 阶梯暴利主力'],
          gm: '预估毛利率 ~46.0%',
          segs: [19.5, 14.5, 20.0, 46.0],
          leg: [['A20 Pro 与 LPDDR5X', '~19.5%'], ['LTPO 屏幕与钛金属框', '~14.5%'], ['三摄潜望/射频/组装', '~20.0%'], ['单机硬件毛利额', '~$560+']]
        },
        {
          badge: 'SKU 03 · SPRING VOLUME WAVE ($799–$899)',
          title: 'iPhone 18 标准版（错峰至春季）：平滑果链稼动率的战略机动师',
          desc: '通过将标准版延后半年至春季发布，苹果一方面在秋季把心急换机用户推向更高毛利的 Pro 机型，另一方面在次年春季传统消费电子淡季制造第二波全球换机潮，显著压低晶圆与组装产线的季节性闲置成本。',
          tags: ['端侧 Siri AI 普及底座', '春季二次营销洪峰', '复用成熟期面板与镜头模组', '承接 3–4 年存量钉子户'],
          gm: '预估毛利率 ~38.5%',
          segs: [21.0, 16.5, 24.0, 38.5],
          leg: [['自研 SoC 与存储', '~21.0%'], ['OLED 屏幕与铝金属机身', '~16.5%'], ['双摄模组/电池/组装', '~24.0%'], ['单机硬件毛利额', '~$315']]
        },
        {
          badge: 'SKU 04 · ECOSYSTEM GATEKEEPER ($599)',
          title: 'iPhone 17e / e 系列：自研基带练兵场与新兴市场零补贴漏斗',
          desc: '不同于安卓阵营低毛利百元机，e 系列复用高度摊薄完毕的成熟机身模具，但塞入最新一代 Apple Silicon 与苹果自研蜂窝基带芯片（规避高通专利授权费），在守住约 ~35% 可观毛利率的同时，把印度、拉美及企业采购客群源源不断拉入 iCloud 与 App Store 收费站。',
          tags: ['自研基带芯片规模化替代', '成熟模具极致折旧摊薄', '安卓阵营转投首站入口', '企业与教育批量采购主力'],
          gm: '预估毛利率 ~35.0%',
          segs: [23.0, 15.0, 27.0, 35.0],
          leg: [['自研 SoC + 自研基带', '~23.0%'], ['成熟 OLED 与治具摊薄', '~15.0%'], ['单摄/电池/制造履约', '~27.0%'], ['单机硬件毛利额', '~$210']]
        }
      ];
      var skuDeck = document.getElementById('skuDeck');
      if (skuDeck) {
        skuDeck.addEventListener('click', function (e) {
          var card = e.target.closest('[data-sku]');
          if (!card) return;
          var idx = parseInt(card.getAttribute('data-sku'), 10) || 0;
          var cs = skuDeck.querySelectorAll('.ip-sku-card');
          for (var i = 0; i < cs.length; i++) cs[i].classList.toggle('active', cs[i] === card);
          var s = SKUS[idx];
          document.getElementById('tdBadge').textContent = s.badge;
          document.getElementById('tdTitle').textContent = s.title;
          document.getElementById('tdDesc').textContent = s.desc;
          document.getElementById('tdTags').innerHTML = s.tags.map(function (t) {
            return '<span class="ip-spec-tag mono">' + t + '</span>';
          }).join('');
          document.getElementById('bomGmTxt').textContent = s.gm;
          var cols = ['#0073E6', '#7C3AED', '#D97706', '#16A34A'];
          document.getElementById('bomBar').innerHTML = s.segs.map(function (w, k) {
            return '<div class="ip-bom-seg" style="width:' + w + '%;background:' + cols[k] + ';"></div>';
          }).join('');
          document.getElementById('bomLegend').innerHTML = s.leg.map(function (item, k) {
            return '<div class="ip-bom-leg-item"><span><i class="ip-dot" style="background:' + cols[k] + ';"></i>' + item[0] + '</span><b class="mono">' + item[1] + '</b></div>';
          }).join('');
        });
      }

      // P3: Dual-Wave vs Legacy Cadence Switcher
      var waveSwitch = document.getElementById('waveSwitch');
      if (waveSwitch) {
        waveSwitch.addEventListener('click', function (e) {
          var b = e.target.closest('[data-wave]');
          if (!b) return;
          var mode = b.getAttribute('data-wave');
          var bs = waveSwitch.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var wg = document.getElementById('waveGrid');
          if (mode === 'dual') {
            wg.innerHTML =
              '<div class="ip-qtr-card peak"><div><div class="ip-qtr-head mono"><span>WAVE 1 · 9–12月 (FY Q1)</span><span>产能负荷 96%</span></div><div class="ip-qtr-title">秋季超高端独占窗口：18 Pro + iPhone Duo</div><div class="ip-qtr-desc">秋季不发标准版，促使高达 62% 急于换机的标准版潜在买家向上迁移购买高毛利 Pro 或折叠机。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:96%;"></div></div></div>' +
              '<div class="ip-qtr-card peak"><div><div class="ip-qtr-head mono"><span>WAVE 2 · 3–5月 (FY Q2/Q3)</span><span>产能负荷 84%</span></div><div class="ip-qtr-title">春季大众走量波段：iPhone 18 + 18e 接棒</div><div class="ip-qtr-desc">在传统春季淡季投放标准版与 e 系列新机，二次引爆全球关注并填平晶圆与组装稼动率低谷。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:84%;"></div></div></div>' +
              '<div class="ip-qtr-card"><div><div class="ip-qtr-head mono"><span>WWDC · 6–8月 (FY Q3)</span><span>产能负荷 76%</span></div><div class="ip-qtr-title">软件催熟期：iOS 与 Siri AI 预览锁定返校季</div><div class="ip-qtr-desc">WWDC 发布新一代端侧 Siri AI 功能并限定大运存机型独享，提前为秋季 Pro 换机潮埋下钩子。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:76%;"></div></div></div>' +
              '<div class="ip-qtr-card"><div><div class="ip-qtr-head mono"><span>NET EFFECT · 全年财务效应</span><span>波动率 -45%</span></div><div class="ip-qtr-title">结果：抬高首波 ASP + 连续五季总营收破千亿</div><div class="ip-qtr-desc">消除四款机型同抢首发产能瓶颈，降低季节性临时招工溢价，全年利润率曲线更平滑。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:90%;"></div></div></div>';
          } else {
            wg.innerHTML =
              '<div class="ip-qtr-card"><div><div class="ip-qtr-head mono"><span>9–12月 · 四机齐发拥堵</span><span>产能超载 115%</span></div><div class="ip-qtr-title">标准版与 Pro 同台互搏，高昂加班招工费</div><div class="ip-qtr-desc">四款新机同时争抢首发备货产能，Pro Max 常年缺货数周，部分心急用户被迫降级买标准版。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:100%;background:#DC2626;"></div></div></div>' +
              '<div class="ip-qtr-card"><div><div class="ip-qtr-head mono"><span>1–3月 · 节后陡坡回落</span><span>产能跌至 58%</span></div><div class="ip-qtr-title">假日季后缺乏新品催化，渠道进入打折去库</div><div class="ip-qtr-desc">缺乏春季新主机支撑，第三方电商不得不靠补贴降价维持走量，拉低上半年均价。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:58%;background:#D97706;"></div></div></div>' +
              '<div class="ip-qtr-card"><div><div class="ip-qtr-head mono"><span>4–8月 · 漫长持币观望期</span><span>产能谷底 45%</span></div><div class="ip-qtr-title">长达半年“奥斯本效应”，消费者冻结换机等9月</div><div class="ip-qtr-desc">果链工厂上半年稼动率不足，固定设备折旧无法充分摊薄，形成剧烈季度周期波动。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:45%;background:#D97706;"></div></div></div>' +
              '<div class="ip-qtr-card"><div><div class="ip-qtr-head mono"><span>LEGACY PAIN · 传统模式瓶颈</span><span>折叠机难兼容</span></div><div class="ip-qtr-title">当机型扩充至 5–6 款，单点秋季发布会彻底过载</div><div class="ip-qtr-desc">引入折叠机 iPhone Duo 后若仍挤在同一天发布，营销焦点与供应链良率均会互相掣肘。</div></div><div class="ip-util-bar"><div class="ip-util-fill" style="width:50%;background:#DC2626;"></div></div></div>';
          }
        });
      }

      // P4: OEM Table Filter
      var oemFilter = document.getElementById('oemFilter');
      if (oemFilter) {
        oemFilter.addEventListener('click', function (e) {
          var b = e.target.closest('[data-ocat]');
          if (!b) return;
          var cat = b.getAttribute('data-ocat');
          var bs = oemFilter.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          var rows = document.querySelectorAll('#oemTable tbody tr');
          for (var j = 0; j < rows.length; j++) {
            var rc = rows[j].getAttribute('data-oem') || '';
            rows[j].style.display = (cat === 'all' || rc === cat || rows[j].classList.contains('is-apple')) ? '' : 'none';
          }
        });
      }

      // High-DPI Retina Canvas Engine
      function prepCanvas(id) {
        var c = document.getElementById(id);
        if (!c) return null;
        var rect = c.getBoundingClientRect();
        var w = Math.max(260, rect.width || 480), h = Math.max(135, rect.height || 260);
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
        var ctx = c.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        return { c: c, ctx: ctx, w: w, h: h };
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

      function drawMarketCanvas() {
        var env = prepCanvas('marketCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.marketCanvas = [];
        var pad = { top: 28, right: 20, bottom: 40, left: 52 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var yrs = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26'];

        if (state.mView === 'rev') {
          var revs = [191.97, 205.49, 200.58, 201.18, 209.59, 254.10];
          var maxR = 280;
          for (var g = 0; g <= 4; g++) {
            var gv = (maxR / 4) * g, gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv.toFixed(0) + 'B', pad.left - 8, gy + 4);
          }
          var slot = pw / yrs.length, bw = Math.min(40, slot * 0.56);
          yrs.forEach(function (y, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (revs[i] / maxR) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i === 5 ? pal.green : pal.blue;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + revs[i].toFixed(1) + 'B', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace';
            ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
            hits.marketCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' iPhone 净营收', body: '$' + revs[i].toFixed(2) + 'B' + (i === 5 ? '（同比猛增 +21.2% 打破四年平台期！）' : '') });
          });
        } else {
          var aaplAsp = [825, 868, 895, 918, 948, 1018];
          var mktAsp = [332, 345, 352, 357, 370, 442];
          var maxA = 1150;
          for (var k = 0; k <= 4; k++) {
            var kv = Math.round((maxA / 4) * k), ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + kv, pad.left - 8, ky + 4);
          }
          function drawL(arr, col, label) {
            ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - (v / maxA) * ph;
              if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.stroke();
            arr.forEach(function (v, idx) {
              var px = pad.left + (idx / (yrs.length - 1)) * pw, py = pad.top + ph - (v / maxA) * ph;
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
              if (idx === 5 || idx === 0) {
                ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
                ctx.fillText('$' + v, px, py - 8);
              }
              hits.marketCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '平均批发售价 $' + v });
            });
          }
          yrs.forEach(function (y, idx) {
            var px = pad.left + (idx / (yrs.length - 1)) * pw;
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(y, px, pad.top + ph + 20);
          });
          drawL(aaplAsp, pal.violet, 'iPhone 批发均价 ASP');
          drawL(mktAsp, pal.amber, '全球智能手机行业 ASP');
        }
      }

      function drawRegionCanvas() {
        var env = prepCanvas('regionCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.regionCanvas = [];
        var pad = { top: 24, right: 48, bottom: 26, left: 108 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.rView === 'geo') {
          var geos = [
            { name: '美洲 Americas', rev: 198.4, yoy: '+12%', col: pal.blue },
            { name: '欧洲 Europe', rev: 121.6, yoy: '+14%', col: pal.cyan },
            { name: '大中华区 China', rev: 82.4, yoy: '+28%', col: pal.green },
            { name: '亚太其他 APAC', rev: 42.8, yoy: '+17%', col: pal.violet },
            { name: '日本 Japan', rev: 33.6, yoy: '+15%', col: pal.amber }
          ];
          var maxG = 220, rowH = ph / geos.length;
          geos.forEach(function (g, idx) {
            var cy = pad.top + idx * rowH + rowH / 2, bh = 21;
            var bl = (g.rev / maxG) * pw;
            ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
            ctx.fillStyle = g.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
            ctx.fillStyle = pal.sub; ctx.font = (idx === 2 ? 'bold ' : '600 ') + '11.5px sans-serif'; ctx.textAlign = 'right';
            ctx.fillText(g.name, pad.left - 8, cy + 4);
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
            ctx.fillText('$' + g.rev + 'B (' + g.yoy + ')', pad.left + bl + 6, cy + 4);
            hits.regionCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: g.name + ' FY2026 营收', body: '年度贡献约 $' + g.rev + 'B（同比 ' + g.yoy + '），活跃设备数创该区历史最高' });
          });
        } else {
          var tiers = [
            { name: '256GB → 512GB 加价包', gm: 82.0, col: pal.green, tip: '零售加收 $200，新增 NAND 闪存芯片采购差价仅约 ~$35，边际毛利率超 82%' },
            { name: '512GB → 1TB 顶配包', gm: 85.5, col: pal.violet, tip: '零售再加收 $200，视频创作者与 ProRes 用户刚需，对冲全系内存涨价' },
            { name: 'iPhone 18 Pro 整机', gm: 46.0, col: pal.blue, tip: '高单价旗舰整机综合毛利率中枢约 ~46%' },
            { name: '中低端安卓走量机', gm: 11.5, col: pal.amber, tip: '存储占低端机 BOM 高达 25%–30%，内存涨价直接吞噬微薄毛利' }
          ];
          var maxT = 95, rH = ph / tiers.length;
          tiers.forEach(function (t, idx) {
            var cy = pad.top + idx * rH + rH / 2, bh = 22;
            var bl = (t.gm / maxT) * pw;
            ctx.fillStyle = pal.grid; roundRect(ctx, pad.left, cy - bh / 2, pw, bh, 5); ctx.fill();
            ctx.fillStyle = t.col; roundRect(ctx, pad.left, cy - bh / 2, bl, bh, 5); ctx.fill();
            ctx.fillStyle = pal.sub; ctx.font = '600 11px sans-serif'; ctx.textAlign = 'right';
            ctx.fillText(t.name, pad.left - 8, cy + 4);
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'left';
            ctx.fillText(t.gm.toFixed(1) + '%', pad.left + bl + 6, cy + 4);
            hits.regionCanvas.push({ x: pad.left, y: cy - 14, w: pw, h: 28, title: t.name, body: t.tip });
          });
        }
      }

      // P4: Interactive ASP × Cycle × Memory Simulator
      var simBars = [209.6, 254.1, 257.8];
      function drawSimIpCanvas() {
        var env = prepCanvas('simIpCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 22, right: 18, bottom: 24, left: 46 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = ['FY25 实际', 'FY26 实际', 'FY27E 推演'];
        var maxV = Math.max(310, Math.ceil(Math.max.apply(null, simBars) * 1.15));
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        var slot = pw / 3, bw = Math.min(54, slot * 0.5);
        simBars.forEach(function (v, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.cyan);
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(1) + 'B', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
          ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
        });
      }

      function updateIpSim() {
        var cyc = parseFloat(document.getElementById('rngCycle').value);
        var mix = parseFloat(document.getElementById('rngMix').value) / 100;
        var mem = parseFloat(document.getElementById('rngMem').value);

        document.getElementById('valCycle').textContent = cyc.toFixed(1) + ' 年';
        document.getElementById('valMix').textContent = Math.round(mix * 100) + '%';
        document.getElementById('valMem').textContent = '+$' + mem.toFixed(0) + ' / 台';

        // ~1.42B active iPhones / replacement cycle + ~38M Android switchers / first-timers (net of refurb)
        var unitsM = Math.round((1420 / cyc) * 0.56 + 31);
        var asp = Math.round(740 * (1 - mix) + 1225 * mix);
        var revB = (unitsM * asp) / 1000;
        var baseGm = 35.5 * (1 - mix) + 44.2 * mix;
        var netGm = baseGm - (mem / asp) * 100 * 0.65; // 35% offset by storage tier upsell

        document.getElementById('outUnits').textContent = unitsM + 'M 台';
        document.getElementById('outAsp').textContent = '$' + asp.toLocaleString();
        document.getElementById('outIpRev').textContent = '$' + revB.toFixed(1) + 'B';
        document.getElementById('outIpGm').textContent = netGm.toFixed(1) + '%';

        simBars = [209.6, 254.1, revB];
        drawSimIpCanvas();
      }
      ['rngCycle', 'rngMix', 'rngMem'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', updateIpSim);
      });

      function bindSeg(gid, attr, skey, fn) {
        var g = document.getElementById(gid);
        if (!g) return;
        g.addEventListener('click', function (e) {
          var b = e.target.closest('[' + attr + ']');
          if (!b) return;
          state[skey] = b.getAttribute(attr);
          var bs = g.querySelectorAll('.mui-seg-btn');
          for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
          fn();
        });
      }
      bindSeg('mChartTabs', 'data-mview', 'mView', drawMarketCanvas);
      bindSeg('rChartTabs', 'data-rview', 'rView', drawRegionCanvas);

      function bindTip(cid) {
        var c = document.getElementById(cid), tip = document.getElementById('chartTooltip');
        if (!c || !tip) return;
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
          } else {
            tip.style.display = 'none';
          }
        });
        c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
      }
      ['marketCanvas', 'regionCanvas'].forEach(bindTip);

      function drawAll() {
        drawMarketCanvas();
        drawRegionCanvas();
        drawSimIpCanvas();
      }

      // Quick Jump ⌘K
      var QITEMS = [
        { id: 'sec-p0', t: 'P0 全景旗舰看板与四大里程碑', s: '$254.1B 营收 · ASP 首破 $1,000 · 独占全球 50% 手机收入' },
        { id: 'sec-p1', t: 'P1 四阶机型展厅与 BOM 毛利拆解台', s: 'iPhone Duo 折叠机 / 18 Pro / 春季 18 / 17e 自研基带' },
        { id: 'sec-p2', t: 'P2 全球 K 型分化与大中华区 +28% 反转', s: '六年营收与 ASP 跃迁 · 256GB→1TB 闪存阶梯暴利护盾' },
        { id: 'sec-p3', t: 'P3 秋/春双波段错峰排产供应链矩阵', s: '对比旧式 9 月脉冲 · 62% 买家向 Pro/Fold 升级机制' },
        { id: 'sec-p4', t: 'P4 FY2027 敏感度推演器与全球竞品对标', s: '换机周期×存储涨价压测 · 对决三星 / 华为 / 小米 / Pixel' }
      ];
      var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
      function renderQ(kw) {
        if (!qPop) return;
        var q = (kw || '').trim().toLowerCase();
        var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
        qPop.innerHTML = m.map(function (x) {
          return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
        }).join('');
        qPop.classList.toggle('open', m.length > 0);
      }
      if (qIn && qPop) {
        qIn.addEventListener('focus', function () { renderQ(qIn.value); });
        qIn.addEventListener('input', function () { renderQ(qIn.value); });
        qPop.addEventListener('click', function (e) {
          var jb = e.target.closest('[data-jump]');
          if (!jb) return;
          var target = document.querySelector(jb.getAttribute('data-jump'));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          qPop.classList.remove('open');
        });
        document.addEventListener('click', function (e) {
          if (!e.target.closest('.quick-search-wrap')) qPop.classList.remove('open');
        });
      }
      document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (qIn) qIn.focus(); }
      });

      // Mobile Drawer, Progress & Checkboxes
      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
      if (sbBtn && sb && bd) {
        sbBtn.addEventListener('click', function () {
          if (window.innerWidth < 1024) { var open = sb.classList.toggle('open'); bd.classList.toggle('open', open); }
        });
        bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });
      }
      window.addEventListener('scroll', function () {
        var bar = document.getElementById('readingProgressBar');
        if (bar) {
          var dh = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
        }
      }, { passive: true });

      try {
        var savedK = JSON.parse(localStorage.getItem(STORAGE_CHK_KEY) || '{}');
        document.querySelectorAll('[data-ipchk]').forEach(function (chk) {
          var k = chk.getAttribute('data-ipchk');
          chk.checked = !!savedK[k];
          chk.addEventListener('change', function () {
            savedK[k] = chk.checked;
            try { localStorage.setItem(STORAGE_CHK_KEY, JSON.stringify(savedK)); } catch (err) {}
            showToast(chk.checked ? '已加入季度硬件跟踪项' : '已移除跟踪标记');
          });
        });
      } catch (e) {}

      // Init Theme, Lang & Resize
      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {}

      var tBtn = document.getElementById('appbarThemeBtn');
      if (tBtn) {
        tBtn.addEventListener('click', function () {
          var nxt = state.theme === 'dark' ? 'light' : 'dark';
          applyTheme(nxt, false);
          try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
        });
      }
      document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
        var lb = e.target.closest('[data-lang]');
        if (!lb) return;
        var nl = lb.getAttribute('data-lang');
        applyLang(nl, false);
        try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
      });
      window.addEventListener('storage', function (ev) {
        if (ev.key === STORAGE_THEME_KEY && ev.newValue) applyTheme(ev.newValue.replace(/^"|"$/g, ''), true);
        if (ev.key === STORAGE_LANG_KEY && ev.newValue) applyLang(ev.newValue.replace(/^"|"$/g, ''), true);
      });

      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
      updateIpSim();
      drawAll();
    })();
  