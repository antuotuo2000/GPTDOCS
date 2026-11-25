
  (function () {
    'use strict';
    var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
    var STORAGE_LANG_KEY = 'mui_portal_lang_v1';
    var STORAGE_SIDEBAR_KEY = 'mui_portal_sidebar_collapsed_v1';

    var state = { theme: 'dark', lang: 'zh', fView: 'gtm', sView: 'pen', pe: 32 };
    var hits = { futureCanvas: [], siliconCanvas: [] };

    function showToast(msg) {
      var bar = document.getElementById('muiSnackbar');
      if (!bar) return;
      bar.textContent = msg;
      bar.classList.add('show');
      clearTimeout(bar._t);
      bar._t = setTimeout(function () { bar.classList.remove('show'); }, 2200);
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
        violet: dark ? '#A78BFA' : '#7C3AED',
        green: dark ? '#22C55E' : '#16A34A',
        amber: dark ? '#FFB74D' : '#D97706',
        red: dark ? '#FF6B6B' : '#DC2626'
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
      var lBtn = document.getElementById('sideThemeLightBtn'), dBtn = document.getElementById('sideThemeDarkBtn');
      if (lBtn) lBtn.classList.toggle('active', state.theme === 'light');
      if (dBtn) dBtn.classList.toggle('active', state.theme === 'dark');
      drawAll();
      if (!silent) showToast(state.theme === 'dark' ? '已切换至深色蓝图模式' : '已切换至 MUI 浅色模式');
    }

    function applyLang(lang, silent) {
      state.lang = (lang === 'en') ? 'en' : 'zh';
      document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
      var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
      if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
      if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
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

    var HORIZONS = [
      {
        badge: 'HORIZON 1 · 高确定性换代与扩圈期 (2026–2027)',
        title: 'Wi-Fi 7 全系换机潮 × 100G 园区核心破局 × Protect AI 爆发',
        items: [
          '<strong>Wi-Fi 7 全面放量：</strong>从室内 U7 Pro/Mesh 到室外 IP67 E7 Campus 形成完整梯队，带动多千兆 PoE++ 交换机同步升级。',
          '<strong>Network 11 &amp; Protect 7.3：</strong>AI Key ($799) 与 AI Port ($199) 激活存量安防改造，UNAS Pro 4/8 切入企业本地备份。',
          '<strong>5G 融合备份网关：</strong>Dream Router 5G Max 与 UniFi 5G Backup 打通商业门店主备无缝切换。'
        ],
        prob: '兑现确定性：极高 (90%+)',
        impact: '年化增量营收池：+$1.2B–$1.8B'
      },
      {
        badge: 'HORIZON 2 · 中大型企业与软件毛利跃升期 (2028–2029)',
        title: '中型园区标准配置化 × CyberSecure/Cloud 经常性收入跨越 $5亿',
        items: [
          '<strong>500–5,000人园区规模突破：</strong>Enterprise Firewall Core + ECS 100G 核心交换配合认证集成商计划，蚕食 Cisco Meraki 中端基本盘。',
          '<strong>自愿订阅高毛利池成型：</strong>CyberSecure、UniFi Cloud Storage 与 UI Care 渗透率突破 18%，推动全公司综合毛利率站稳 48%+。',
          '<strong>智慧建筑弱电一统：</strong>指纹/人脸门禁（UniFi Access）、SuperLink 消防安防传感器与商业音视频（Play/Connect）成为新建商业地产标配。'
        ],
        prob: '兑现确定性：中高 (75%–80%)',
        impact: '年化增量营收池：+$2.2B–$3.2B'
      },
      {
        badge: 'HORIZON 3 · 工业互联网与自治网络奇点期 (2030–2032)',
        title: 'Wi-Fi 8 超高可靠连接 × 自治 AI 网管代理 × 严苛工业物联网',
        items: [
          '<strong>UniFi Autonomous Network Agent：</strong>Network OS 内置端侧排障与射频自愈 AI 代理，让千人企业无需专职 CCIE 网络工程师即可零故障运行。',
          '<strong>UniFi Industrial 工业自动化：</strong>宽温防爆 PoE 工业交换与私有 5G/Wi-Fi 8 超低时延网络切入智能制造工厂与仓储机器人调度。',
          '<strong>全球连接底座：</strong>下一代 UISP 毫米波与低轨卫星（LEO）社区分发网络深度互补，打通新兴市场最后一公里。'
        ],
        prob: '兑现确定性：远期期权 (55%–65%)',
        impact: '年化增量营收池：+$3.5B+'
      }
    ];
    document.getElementById('hzTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-hz]');
      if (!b) return;
      var idx = parseInt(b.getAttribute('data-hz'), 10) || 0;
      var bs = this.querySelectorAll('.ft-hz-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var hz = HORIZONS[idx];
      document.getElementById('hzBadge').textContent = hz.badge;
      document.getElementById('hzTitle').textContent = hz.title;
      document.getElementById('hzList').innerHTML = hz.items.map(function (t) {
        return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
      }).join('');
      document.getElementById('hzProb').textContent = hz.prob;
      document.getElementById('hzImpact').textContent = hz.impact;
    });

    var ENGINES = [
      {
        badge: 'ENGINE 01 · UP-MARKET ENTERPRISE CAMPUS & FIREWALL CORE',
        title: '攻入思科腹地：以 EFG 双冗余网关 + 100G ECS 核心交换撕开中型企业与校园酒店市场',
        desc: '过去中型企业（500–5,000人园区、医院、大型酒店与学区）之所以不敢采用 UniFi，核心障碍在于缺乏双热插拔电源冗余、VRRP 网关自动故障切换、SSL/TLS 加密流量深度检测以及层三百兆核心汇聚交换机。随着 Enterprise Fortress Gateway（支持双机 Shadow Mode 热备与实时 SSL 解密）、Enterprise Firewall Core、100G QSFP28 堆叠的 Enterprise Campus Switch（ECS）及 UniFi OS Server 独立部署方案落地，叠加全新 Enterprise Partner Program 渠道赋能与 UI Care 极速备件替换，厄比奎蒂正式具备整园替代 Cisco Catalyst/Meraki 的工程底座。',
        formula: '变现弹性：单园区客单价从 SMB 的 ~$5K 跃升至 $45K–$150K+，同时仍比传统方案便宜 60% 以上',
        gauges: [['100G QSFP28', 'ECS 园区核心层三堆叠带宽'], ['Shadow Mode', 'EFG 硬件双机零中断高可用'], ['PoE+++', '单口高达 90W 驱动重型终端'], ['2026–2029', '中型政企与酒店替换主窗口']]
      },
      {
        badge: 'ENGINE 02 · WI-FI 7/8 PRISM™ RF & 5G CONVERGENCE',
        title: '高密射频看家本领：PRISM™ 主动滤波征服万人场馆，5G 主备融合覆盖商业分支',
        desc: '无线射频是创始人 Robert Pera 的本行。新一代 E7 与室外 IP67 级 E7 Campus 引入自研 PRISM™ 主动射频滤波芯片架构，将邻频干扰抑制能力提升逾千倍，一举攻克体育馆、音乐厅与大型会展中心高密度并发难题；同时 UniFi 5G Max 与 Dream Router 5G Max（下行达 3.4 Gbps）将蜂窝广域网原生纳入同一套双 WAN 负载均衡视图。',
        formula: '换机乘数：6GHz 频段与 MLO 多链路聚合要求上联口从 1GbE 全面升至 2.5G/10GbE，触发“AP + 交换机”成套换机潮',
        gauges: [['1,000x+', 'PRISM™ 邻频干扰主动隔离度'], ['3.4 Gbps', '5G Max 桌面/户外融合网关速率'], ['10GbE 双口', 'E7 企业级射频链路高可用上联'], ['+43.2%', 'Q1 FY27 企业平台同比高增印证']]
      },
      {
        badge: 'ENGINE 03 · UNIFI PROTECT EDGE VISION AI (AI KEY & AI PORT)',
        title: '视觉安防去云税化：用 $799 本地算力盒颠覆 Verkada 式昂贵月租监控',
        desc: '商业物理安防正经历从“被动录像”向“多模态视觉搜索”的代际跃迁。UniFi Protect 7.3 配合桌面算力盒 AI Key（每小时处理 1,800 次智能检测事件），支持管理员直接输入“穿红色外套背双肩包的人”在本地 NVR 秒级检索，无需向云端上传隐私画面、无需按摄像头缴纳每年数百美元订阅费；而 $199 的 AI Port 更可将客户原有旧款第三方 ONVIF 摄像头一秒接入 UniFi AI 生态。',
        formula: '变现闭环：G6 Edge / AI 系列摄像头高毛利放量 + UNVR Pro / Enterprise NVR 机架主机 + AI Key 算力节点搭售',
        gauges: [['1,800次/时', '单台 AI Key 智能视觉事件吞吐'], ['$199 改造', 'AI Port 兼容存量第三方摄像头'], ['0 云端月费', '全本地存储满足政企严苛隐私合规'], ['自然语言检索', '端侧多模态大模型实时搜图']]
      },
      {
        badge: 'ENGINE 04 · CYBERSECURE & VOLUNTARY CLOUD SERVICES',
        title: '克制而暴利的软件第二曲线：联合 Proofpoint 与 Cloudflare 打造自愿订阅层',
        desc: '厄比奎蒂坚守“绝不用软件锁绑架硬件”的底线，但巧妙开辟了客户主动买单的纯软件高毛利增量：CyberSecure（标准版 $99/年、企业版 $499/年）调用 Proofpoint 企业级威胁情报与 Cloudflare 内容过滤引擎，将网关 IDS/IPS 签名库从免费版扩容至 95,000+ 条；配合 2026 年 11 月新推的 UniFi Cloud Storage、Official Cloud Hosting 与 Site Magic SD-WAN，构建高粘性经常性现金流。',
        formula: '利润撬动：无需新增任何销售人员，直接在 UniFi 控制台内一键勾选开通，边际毛利率高达 75%–85%',
        gauges: [['95,000+', 'Proofpoint 实时更新入侵特征签名'], ['$105.2M', 'Q1 FY27 资产负债表递延收入规模'], ['一键内购', 'UniFi OS 控制台零获客成本转化'], ['75%+ GM', '纯软件与威胁情报分成超高毛利']]
      },
      {
        badge: 'ENGINE 05 · UNAS ENTERPRISE STORAGE & SMART BUILDING OS',
        title: '吞噬整栋建筑弱电预算：从 UNAS 万兆存储到门禁、传感器与商业充电桩',
        desc: '随着 UNAS Pro ($499)、UNAS Pro 8 与 Enterprise NAS 发布，厄比奎蒂正式杀入原本由群晖（Synology）与威联通主导的 SMB/企业级 NAS 市场；再加上指纹/掌纹/Apple Wallet 门禁（UniFi Access）、10年续航远距烟感/温湿度传感（SuperLink）、IP 话机（Talk）与商业智能充电桩（EV Station），弱电集成商只需拉一根网线（PoE）即可交付整栋写字楼全部数字化设施。',
        formula: '钱包份额倍增：从仅占弱电预算 20% 的路由器/AP，扩张为通吃整栋建筑 85%+ IT 与安防弱电采购清单',
        gauges: [['UNAS Pro 8', '双万兆 + M.2 缓存机架企业存储'], ['SuperLink', '超远穿墙 10 年续航楼宇传感器协议'], ['Fingerprint', '新一代生物识别与手机 NFC 门禁'], ['单根 PoE 线', '供电+组网+管理极简施工革命']]
      },
      {
        badge: 'ENGINE 06 · UISP 60GHZ MILLIMETER-WAVE & INDUSTRIAL IOT',
        title: '守护起家现金牛并切入严苛工业场景：Wave 60GHz 与 UniFi Industrial',
        desc: '尽管星链（Starlink）对部分偏远单户无线宽带产生分流，但在高密度社区宽带分发、跨楼宇多吉比特无线光纤替代（Wave 60GHz 点对多点毫米波）及新兴市场 WISP 骨干网领域，UISP 凭借极低每比特传输成本在 Q1 FY27 重回 +10.8% 增长（单季 $84.9M）；同时 2026 年 10 月发布的 UniFi Industrial 家族更将产品线推进户外油田、矿山、港口与工厂车间。',
        formula: '战略协同：高现金流 UISP 稳固全球百余国分销网络，反哺工业级远距无线与户外加固硬件研发',
        gauges: [['$84.9M', 'Q1 FY27 UISP 营收同比回升 +10.8%'], ['60GHz + 5GHz', 'Wave 毫米波主链路加自动雨衰备份'], ['Industrial', '无风扇宽温抗振工业级 PoE 硬件'], ['100+国家', '深耕二十年的全球草根运营商网络']]
      }
    ];
    document.getElementById('engineRail').addEventListener('click', function (e) {
      var b = e.target.closest('[data-eng]');
      if (!b) return;
      var idx = parseInt(b.getAttribute('data-eng'), 10) || 0;
      var bs = this.querySelectorAll('.ft-rail-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      var eg = ENGINES[idx];
      document.getElementById('engBadge').textContent = eg.badge;
      document.getElementById('engTitle').textContent = eg.title;
      document.getElementById('engDesc').textContent = eg.desc;
      document.getElementById('engFormula').textContent = eg.formula;
      document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
        return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + g[1] + '</span></div>';
      }).join('');
    });

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

    function drawFutureCanvas() {
      var env = prepCanvas('futureCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hits.futureCanvas = [];
      var pad = { top: 28, right: 20, bottom: 42, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

      if (state.fView === 'gtm') {
        var peers = [
          { name: 'Palo Alto', pct: 43.5, col: pal.red, tip: '高强度大客户销售与巨额股权激励（SG&A + SBC 合计占营收超 43%）' },
          { name: 'Fortinet', pct: 38.2, col: pal.amber, tip: '全球渠道与市场营销投入庞大（SG&A + SBC 约 38.2%）' },
          { name: 'Cisco', pct: 30.4, col: pal.violet, tip: '传统全球销售代表体系与并购整合激励（合计约 30.4%）' },
          { name: 'Arista', pct: 11.2, col: pal.blue, tip: '聚焦超大云厂商精简直销，效率优异（SG&A + SBC 约 11.2%）' },
          { name: 'Ubiquiti (UI)', pct: 3.95, col: pal.green, tip: 'FY2026 SG&A 3.72% + SBC 0.23% = 仅 3.95%！省下的每一分钱都成为降维打击对手的定价空间与股东净利' }
        ];
        var maxC = 50;
        for (var g = 0; g <= 4; g++) {
          var gv = (maxC / 4) * g, gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(gv.toFixed(0) + '%', pad.left - 8, gy + 4);
        }
        var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
        peers.forEach(function (p, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = Math.max(6, (p.pct / maxC) * ph), yt = pad.top + ph - bh;
          ctx.fillStyle = p.col;
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(p.pct.toFixed(1) + '%', x + bw / 2, yt - 6);
          ctx.fillStyle = i === 4 ? pal.green : pal.sub; ctx.font = (i === 4 ? 'bold ' : '600 ') + '11px sans-serif';
          ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
          hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' (SG&A + SBC 营收占比)', body: p.tip });
        });
      } else {
        var steps = [
          { lbl: 'FY26基准', v: 3.27, b: 0, col: pal.blue, tip: 'FY2026 审计总营收: $3.27B（注：Q1 FY27 年化已达 $4.10B）' },
          { lbl: '+WiFi7/交换', v: 1.65, b: 3.27, col: pal.green, tip: '存量商业网络向 Wi-Fi 7 与多千兆发光交换机升级贡献 +$1.65B' },
          { lbl: '+大中型园区', v: 1.45, b: 4.92, col: pal.violet, tip: 'EFG 防火墙与 100G ECS 核心交换攻入中型政企酒店贡献 +$1.45B' },
          { lbl: '+视觉AI安防', v: 1.15, b: 6.37, col: pal.amber, tip: 'Protect AI 摄像头、AI Key 与门禁楼宇扩圈贡献 +$1.15B' },
          { lbl: '+NAS与云安全', v: 1.13, b: 7.52, col: pal.green, tip: 'UNAS 存储阵列与 CyberSecure/Cloud 可选订阅贡献 +$1.13B' },
          { lbl: 'FY32E蓝图', v: 8.65, b: 0, col: pal.blue, tip: 'FY2032E 远期营收蓝图: ~$8.65B（营业利润池有望突破 $3.3B+）' }
        ];
        var maxB = 9.5;
        for (var k = 0; k <= 4; k++) {
          var kv = (maxB / 4) * k, ky = pad.top + ph - (k / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + kv.toFixed(1) + 'B', pad.left - 8, ky + 4);
        }
        var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
        steps.forEach(function (s, i) {
          var x = pad.left + i * sW + (sW - bW) / 2;
          var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
          var yb = pad.top + ph - (s.b / maxB) * ph;
          var bh = Math.max(5, yb - yt);
          ctx.fillStyle = s.col;
          roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(2) + 'B', x + bW / 2, yt - 6);
          ctx.fillStyle = pal.sub; ctx.font = '600 10.5px sans-serif';
          ctx.fillText(s.lbl, x + bW / 2, pad.top + ph + 20);
          hits.futureCanvas.push({ x: x, y: yt, w: bW, h: bh, title: s.lbl, body: s.tip });
        });
      }
    }

    function drawSiliconCanvas() {
      var env = prepCanvas('siliconCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      hits.siliconCanvas = [];
      var pad = { top: 28, right: 22, bottom: 40, left: 52 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var yrs = ['FY25', 'FY26', 'FY27E', 'FY28E', 'FY29E', 'FY30E'];

      if (state.sView === 'pen') {
        var secPen = [22, 29, 37, 45, 52, 58];
        var nasPen = [3, 9, 16, 24, 31, 38];
        for (var g = 0; g <= 4; g++) {
          var gv = g * 20, gy = pad.top + ph - (g / 4) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText(gv + '%', pad.left - 8, gy + 4);
        }
        function plotP(arr, col, label) {
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 80) * ph;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          arr.forEach(function (v, idx) {
            var px = pad.left + (idx / 5) * pw, py = pad.top + ph - (v / 80) * ph;
            ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px, py, 4.2, 0, Math.PI * 2); ctx.fill();
            if (idx === 1 || idx === 5) {
              ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
              ctx.fillText(v + '%', px, py - 8);
            }
            hits.siliconCanvas.push({ x: px - 10, y: py - 10, w: 20, h: 20, title: yrs[idx] + ' · ' + label, body: '在活跃 UniFi 企业网关站点中的渗透率约 ' + v + '%' });
          });
        }
        yrs.forEach(function (y, idx) {
          var px = pad.left + (idx / 5) * pw;
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(y, px, pad.top + ph + 20);
        });
        plotP(secPen, pal.blue, 'Protect AI 视觉监控与门禁搭售率');
        plotP(nasPen, pal.violet, 'UNAS 企业存储与 CyberSecure 渗透率');
      } else {
        var arrPool = [52, 88, 145, 225, 315, 420];
        var maxS = 480;
        for (var m = 0; m <= 4; m++) {
          var mv = m * 120, my = pad.top + ph - (mv / maxS) * ph;
          ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
          ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
          ctx.fillText('$' + mv + 'M', pad.left - 8, my + 4);
        }
        var slot = pw / yrs.length, bw = Math.min(40, slot * 0.54);
        yrs.forEach(function (y, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (arrPool[i] / maxS) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = i >= 2 ? pal.green : pal.blue;
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + arrPool[i] + 'M', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
          ctx.fillText(y, x + bw / 2, pad.top + ph + 20);
          hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: y + ' 可选软件与延保年化池', body: 'CyberSecure + Official Cloud + UI Care 合计年化收入约 $' + arrPool[i] + 'M（毛利率 >75%）' });
        });
      }
    }

    var OPT_DATA = {
      campus: { rev: 1.15, net: 0.352 },
      protect: { rev: 0.92, net: 0.296 },
      cyber: { rev: 0.38, net: 0.230 },
      nas: { rev: 0.55, net: 0.160 },
      ind: { rev: 0.65, net: 0.204 }
    };
    var miniCaps = [38.2, 42.1, 75.3];

    function drawOptMiniCanvas() {
      var env = prepCanvas('optMiniCanvas');
      if (!env) return;
      var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
      var pad = { top: 22, right: 18, bottom: 24, left: 48 };
      var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
      var lbls = document.documentElement.lang === 'en' ? ['Current value', '2030 base', '2030 upside'] : ['当前市值', '2030基础盘', '2030含期权'];
      var maxV = Math.max(85, Math.ceil(Math.max.apply(null, miniCaps) * 1.18));
      ctx.strokeStyle = pal.grid;
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
      var slot = pw / 3, bw = Math.min(54, slot * 0.5);
      miniCaps.forEach(function (v, i) {
        var x = pad.left + i * slot + (slot - bw) / 2;
        var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
        ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
        roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
        ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('$' + v.toFixed(1) + 'B', x + bw / 2, yt - 6);
        ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
        ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
      });
    }

    function recalcOptionality() {
      // Core organic baseline FY2030E (core SMB Wi-Fi/Switch + UISP = $4.45B rev, $1.315B net income, ~57.0M shares after buybacks)
      var baseRev = 4.45, baseNet = 1.315, sh2030 = 0.0570; // in Billions of shares (57.0M)
      var addRev = 0, addNet = 0;
      document.querySelectorAll('[data-opt]').forEach(function (chk) {
        if (chk.checked) {
          var d = OPT_DATA[chk.getAttribute('data-opt')];
          if (d) { addRev += d.rev; addNet += d.net; }
        }
      });
      var totRev = baseRev + addRev;
      var totNet = baseNet + addNet;
      var eps = totNet / sh2030;
      var mcapB = totNet * state.pe;
      var baseMcapB = baseNet * state.pe;
      var targetPrice = Math.round(eps * state.pe);

      document.getElementById('optRevOut').textContent = '$' + totRev.toFixed(2) + 'B';
      document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(2) + 'B';
      document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
      document.getElementById('optCapOut').textContent = '$' + mcapB.toFixed(1) + 'B (~$' + targetPrice + '/股)';

      miniCaps = [38.2, baseMcapB, mcapB];
      drawOptMiniCanvas();
    }

    document.querySelectorAll('[data-opt]').forEach(function (chk) { chk.addEventListener('change', recalcOptionality); });
    document.getElementById('peTabs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-pe]');
      if (!b) return;
      state.pe = parseInt(b.getAttribute('data-pe'), 10) || 32;
      var bs = this.querySelectorAll('.mui-seg-btn');
      for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
      recalcOptionality();
    });

    function bindSeg(gid, attr, skey, fn) {
      document.getElementById(gid).addEventListener('click', function (e) {
        var b = e.target.closest('[' + attr + ']');
        if (!b) return;
        state[skey] = b.getAttribute(attr);
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        fn();
      });
    }
    bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
    bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

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
          tip.style.left = Math.max(8, Math.min(window.innerWidth - tip.offsetWidth - 8, ev.clientX + 14)) + 'px';
          tip.style.top = Math.max(8, Math.min(window.innerHeight - tip.offsetHeight - 8, ev.clientY - 28)) + 'px';
        } else {
          tip.style.display = 'none';
        }
      });
      c.addEventListener('mouseleave', function () { tip.style.display = 'none'; });
    }
    ['futureCanvas', 'siliconCanvas'].forEach(bindTip);

    function drawAll() {
      drawFutureCanvas();
      drawSiliconCanvas();
      drawOptMiniCanvas();
    }

    var QITEMS = [
      { id: 'sec-f0', t: 'F0 上攻园区新政与三阶时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与增量池' },
      { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'EFG/ECS园区核心 · Wi-Fi 7 PRISM · Protect AI Key · CyberSecure · UNAS' },
      { id: 'sec-f2', t: 'F2 反寻租 GTM 纪律与 2032 营收桥', s: 'UI 3.95% (SG&A+SBC) 对比网通巨头 · 迈向 $8.65B 营收阶梯' },
      { id: 'sec-f3', t: 'F3 全栈物理 AI 与可选订阅爬坡', s: '多产品栈渗透率与 >$400M 高毛利自愿订阅池推演' },
      { id: 'sec-f4', t: 'F4 2030 冲击千亿市值期权组装器', s: '自由开关五大新业务期权与估值倍数实时测算目标股价' }
    ];
    var qIn = document.getElementById('quickJumpInput'), qPop = document.getElementById('quickJumpPopover');
    function renderQ(kw) {
      var q = (kw || '').trim().toLowerCase();
      var m = QITEMS.filter(function (x) { return !q || x.t.toLowerCase().indexOf(q) !== -1 || x.s.toLowerCase().indexOf(q) !== -1; });
      qPop.innerHTML = m.map(function (x) {
        return '<button type="button" class="quick-jump-item" data-jump="#' + x.id + '"><span class="quick-jump-item-title">' + x.t + '</span><span class="quick-jump-item-sub">' + x.s + '</span></button>';
      }).join('');
      qPop.classList.toggle('open', m.length > 0);
    }
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
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); qIn.focus(); }
    });

    var hub = document.getElementById('companySubfolderHub');
    hub.addEventListener('click', function (e) {
      var pill = e.target.closest('[data-co-cat]');
      if (pill) {
        var cat = pill.getAttribute('data-co-cat');
        hub.querySelectorAll('[data-co-cat]').forEach(function (p) { p.classList.toggle('active', p === pill); });
        hub.querySelectorAll('[data-co-item-cat]').forEach(function (it) {
          it.classList.toggle('co-hub-hidden', !(cat === 'ALL' || it.getAttribute('data-co-item-cat') === cat));
        });
        return;
      }
      var item = e.target.closest('[data-suite-file]');
      if (item) {
        if (item.classList.contains('active')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          showToast('同套系关联研报：' + item.getAttribute('data-suite-file') + '（可在聊天附件列表切换打开或下载）');
        }
      }
    });

    var sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
    document.getElementById('sidebarToggleBtn').addEventListener('click', function () {
      if (window.innerWidth < 1024) {
        var op = sb.classList.toggle('open');
        bd.classList.toggle('open', op);
      } else {
        var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
        if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
        else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
        try { localStorage.setItem(STORAGE_SIDEBAR_KEY, col ? '0' : '1'); } catch (err) {}
        setTimeout(drawAll, 60);
      }
    });
    bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

    document.getElementById('appbarThemeBtn').addEventListener('click', function () {
      var nxt = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nxt, false);
      try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
    });
    document.getElementById('sideThemeLightBtn')?.addEventListener('click', function () {
      applyTheme('light', false);
      try { localStorage.setItem(STORAGE_THEME_KEY, 'light'); } catch (e) {}
    });
    document.getElementById('sideThemeDarkBtn')?.addEventListener('click', function () {
      applyTheme('dark', false);
      try { localStorage.setItem(STORAGE_THEME_KEY, 'dark'); } catch (e) {}
    });
    document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
      var lb = e.target.closest('[data-lang]');
      if (!lb) return;
      var nl = lb.getAttribute('data-lang');
      applyLang(nl, false);
      try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
    });

    document.getElementById('sideExportBtn')?.addEventListener('click', function () {
      var url = URL.createObjectURL(new Blob(['<!DOCTYPE html>\n' + document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' }));
      var a = document.createElement('a');
      a.href = url;
      a.download = '厄比奎蒂未来十年（2026–2032）战略图谱.html';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast('已触发下载：厄比奎蒂未来十年（2026–2032）战略图谱.html');
    });
    document.getElementById('sidePrintBtn')?.addEventListener('click', function () { window.print(); });

    window.addEventListener('scroll', function () {
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      document.getElementById('readingProgressBar').style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
    }, { passive: true });

    try {
      if (localStorage.getItem(STORAGE_SIDEBAR_KEY) === '1') document.documentElement.setAttribute('data-sidebar-collapsed', '1');
      applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
      applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
    } catch (e) {}

    var rt = null;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
    recalcOptionality();
    drawAll();
  })();
  