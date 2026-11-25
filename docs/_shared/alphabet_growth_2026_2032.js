
    (function () {
      'use strict';

      var STORAGE_THEME_KEY = 'mui_portal_theme_v4';
      var STORAGE_LANG_KEY = 'mui_portal_lang_v1';

      var state = { theme: 'dark', lang: 'zh', hzIdx: 0, engIdx: 0, fView: 'capex', sView: 'rpo', pe: 28 };
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

      var F0_LEAD = {
        zh: '2023 年初市场曾恐慌 ChatGPT 将颠覆谷歌搜索；然而截至 2026 年 Q3，Alphabet 用单季营收 <strong>$1,275.8亿（+25% YoY，连续 13 个季度双位数增长）</strong>给出了最强有力的反击 <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2026/" target="_blank" rel="noopener noreferrer">Pichai Q3 致辞 ↗</a>。正如诺贝尔奖得主 Demis Hassabis 在 2026 年组织升级信中所言：<strong>“我们是全球唯一在每一层都拥有世界级自研能力的公司”</strong> <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/" target="_blank" rel="noopener noreferrer">GDM 升级公告 ↗</a>——底层拥有外售级 <strong>TPU 8t/8i 光互联算力集群</strong>与 <strong>$59亿收购的 Intersect 清洁能源网</strong>；模型层拥有登顶全球智能榜首（59分）的 <strong>Gemini 4 Carbon</strong> 与实时交互世界模型 <strong>Genie 4</strong>（每分钟吞吐 ~320 亿 Tokens）；应用层握有 <strong>10 亿+ 月活的 Gemini App</strong>、<strong>$295亿 收购的 Wiz 云安全平台</strong>与 <strong>通用商务协议（UCP）</strong>；物理层则让 <strong>Waymo（3亿+全无人英里）</strong>与 <strong>Isomorphic Labs（AI制药）</strong>走向万亿级实体产业 <a class="cite-link" href="https://www.nextgcomm.com/financials-google-q3-earnings-results-2026-analysis/" target="_blank" rel="noopener noreferrer">Q3\'26 10-Q 全解 ↗</a>。',
        en: 'In early 2023 Wall Street feared ChatGPT would dethrone Search; by Q3 2026 Alphabet answered with <strong>$127.58B in quarterly revenue (+25% YoY, 13th straight double-digit quarter)</strong> <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2026/" target="_blank" rel="noopener noreferrer">Pichai Q3 Remarks ↗</a>. As Nobel Laureate Demis Hassabis wrote in August 2026: <strong>"We are the only company that has the full stack and we\'re world-class at every layer"</strong> <a class="cite-link" href="https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/" target="_blank" rel="noopener noreferrer">GDM Update ↗</a>—spanning custom <strong>TPU 8t/8i pods</strong> &amp; <strong>Intersect clean power ($5.9B)</strong>, #1-ranked <strong>Gemini 4 Carbon</strong> &amp; <strong>Genie 4 world models</strong> (~32B tokens/min), <strong>1B+ Gemini App MAUs</strong>, <strong>Wiz cloud security ($29.5B)</strong> &amp; <strong>Universal Commerce Protocol (UCP)</strong>, and <strong>Waymo (300M+ autonomous miles)</strong> + <strong>Isomorphic Labs</strong> <a class="cite-link" href="https://www.nextgcomm.com/financials-google-q3-earnings-results-2026-analysis/" target="_blank" rel="noopener noreferrer">Q3\'26 10-Q Brief ↗</a>.'
      };

      var HORIZONS = [
        {
          badge: 'HORIZON 1 · 算力交付与AI广告全球变现期 (2026–2027)',
          enBadge: 'HORIZON 1 · TPU RAMP & GLOBAL AI MODE MONETIZATION (2026–2027)',
          zhT: '$5,608亿云积压订单加速确收 × TPU整机交付潮 × AI Mode多轮广告出海',
          enT: '$560.8B Cloud Backlog Conversion × TPU System Ramp × Global Multi-Turn Ads',
          zhItems: [
            '<strong>TPU 系统商业化主浪：</strong>$133亿已锁定合同的 TPU 硬件库存于 2026Q4–2027 大规模交付确收。',
            '<strong>AI Mode 变现闭环：</strong>多轮对话赞助广告（Multi-turn Ads）与国际市场变现全面铺开。',
            '<strong>2027 工程生产力黄金年：</strong>全员部署 Gemini 4 Carbon 驱动内部代码交付效率再上台阶。'
          ],
          enItems: [
            '<strong>External TPU System Wave:</strong> $13.3B of contract-backed TPU inventory ships across Q4 2026 and 2027.',
            '<strong>Global AI Mode Ads:</strong> Multi-turn conversational ads and international AI Mode monetization scale globally.',
            '<strong>2027 "Golden Year" of Engineering:</strong> Company-wide Gemini 4 Carbon deployment accelerates code velocity.'
          ],
          prob: '兑现确定性：极高 (90%+)', enProb: 'Conviction: Very High (90%+)',
          impact: '年化增量营收池：+$110B–$150B', enImpact: 'Incremental Run-Rate: +$110B–$150B'
        },
        {
          badge: 'HORIZON 2 · 代理商务爆发与自由现金流V型反转期 (2028–2029)',
          enBadge: 'HORIZON 2 · AGENTIC COMMERCE & FCF V-SHAPED INFLECTION (2028–2029)',
          zhT: 'UCP 代理结账普及 × Aluminium OS / Android XR × CapEx 强度回落释放千亿 FCF',
          enT: 'Universal Commerce Checkout × Android XR × CapEx Normalization Unlocks $120B+ FCF',
          zhItems: [
            '<strong>Agentic Commerce 抽成：</strong>Search、Chrome 与 Gemini Agent 打通数十万零售品牌一键代买结算。',
            '<strong>自由现金流大反转：</strong>前期 40年数据中心土建完工，CapEx/营收比重回落，FCF 于 2029 年强劲转正破千亿。',
            '<strong>Waymo 跨国运营：</strong>在伦敦、东京、柏林、新加坡与多伦多等海外大都市实现商业无人出租车落地。'
          ],
          enItems: [
            '<strong>Agentic Checkout Scale:</strong> Universal Commerce Protocol (UCP) powers cross-merchant autonomous shopping.',
            '<strong>FCF Inflection:</strong> Data-center shell build-outs mature, normalizing CapEx intensity and surging 2029+ FCF.',
            '<strong>Waymo International:</strong> Commercial autonomous fleets expand into UK, Japan, Germany, Canada, and Singapore.'
          ],
          prob: '兑现确定性：中高 (75%)', enProb: 'Conviction: Medium-High (75%)',
          impact: '年化增量营收池：+$180B–$240B', enImpact: 'Incremental Run-Rate: +$180B–$240B'
        },
        {
          badge: 'HORIZON 3 · 具身智能、AI新药与量子容错奇点期 (2030–2032)',
          enBadge: 'HORIZON 3 · PHYSICAL AI, AI THERAPEUTICS & QUANTUM ERA (2030–2032)',
          zhT: 'Genie 世界模型赋能通用机器人 × Isomorphic 临床收获 × 核聚变零碳算力网',
          enT: 'Genie World-Model Robotics × Isomorphic Drug Royalties × Fusion-Powered Compute',
          zhItems: [
            '<strong>具身机器人大脑：</strong>Genie 世界模型与 Gemini Robotics 成为全球工业与家庭机器人的“Android 系统”。',
            '<strong>AI 制药专利分成：</strong>Isomorphic Labs 多条肿瘤与疑难病管线进入商业化里程碑与高毛利版税期。',
            '<strong>容错量子与核聚变：</strong>Willow 后续量子芯片商业化求解材料化学难题，CFS 首座 200MW 核聚变电站并网供电。'
          ],
          enItems: [
            '<strong>Robotics OS:</strong> Genie world models and Gemini Robotics power general-purpose industrial and home robots.',
            '<strong>AI Drug Royalties:</strong> Isomorphic Labs harvests clinical milestones and royalties with global pharma partners.',
            '<strong>Quantum & Fusion:</strong> Fault-tolerant quantum chemistry computing + 200MW CFS ARC fusion power online.'
          ],
          prob: '兑现确定性：远期高赔率期权 (50%)', enProb: 'Conviction: High-Upside Optionality (50%)',
          impact: '年化增量营收池：+$260B+', enImpact: 'Incremental Run-Rate: +$260B+'
        }
      ];

      var ENGINES = [
        {
          badge: 'ENGINE 01 · GOOGLE CLOUD, TPU SYSTEMS & CRUX AI JV',
          zhT: 'Google Cloud + 自研 TPU 8t/8i 整机外售：打破英伟达算力垄断的第二极',
          enT: 'Google Cloud + External TPU 8t/8i System Sales: Breaking the Single-Vendor GPU Monopoly',
          zhD: '2026 年谷歌做出了一项改写全球算力格局的战略跃迁：不仅在 GCP 云端出租算力，更开始将液冷 TPU 8t（训练性能提升 2.7 倍）与 TPU 8i（推理性价比提升 80%）连同光路交换机（OCS）与 TorchTPU（联合 Meta 打通 PyTorch 生态）打包成整套集群系统，通过自有云、客户本地机房、Oracle 及与黑石集团组建的 Crux AI 合资公司（贡献 $168亿 RPO）向超 100 家大型客户（含 Anthropic、Apple、Citadel）直接销售。',
          enD: 'Alphabet rewrote AI infrastructure economics in 2026 by selling full liquid-cooled TPU 8t (2.7x training) and TPU 8i (+80% inference price-performance) pods—paired with Optical Circuit Switches and Meta-co-developed TorchTPU—across GCP, customer data centers, Oracle, and the Blackstone-backed Crux AI joint venture ($16.8B backlog) to 100+ major customers including Anthropic and Apple.',
          zhF: '变现双轮：$5,608亿 云合同积压确收 + TPU 整机硬件/软件/维保一体化销售（36.2% 高营业利润率底座）',
          enF: 'Monetization: $560.8B Cloud RPO conversion + bundled TPU hardware/software/support system sales (36.2% Cloud OPM)',
          gauges: [['+103% YoY', 'Q3 Cloud 营收翻倍', 'Q3 Cloud Rev Growth'], ['$560.8B', 'Cloud 剩余履约积压订单', 'Cloud Backlog (RPO)'], ['100+ 大客户', 'Anthropic / Apple 等用 TPU', 'Major TPU Customers'], ['2.7x / +80%', 'TPU 8t训练 / 8i推理跃升', '8t Train / 8i Infer Gain']]
        },
        {
          badge: 'ENGINE 02 · GEMINI 4 CARBON & AGENTIC COMMERCE (UCP)',
          zhT: 'Gemini 4 Carbon × 通用商务协议（UCP）：把全球搜索流量升级为“AI 代买收银台”',
          enT: 'Gemini 4 Carbon × Universal Commerce Protocol (UCP): Agentic Discovery & Checkout',
          zhD: 'Gemini 4 Carbon 以 59 分登顶 Artificial Analysis 全球智能指数榜首，Gemini App 突破 10 亿月活成为谷歌史上最快破十亿产品。更重要的是商业闭环重构：谷歌联合 Chewy、Nike、Tapestry 与美国运通推出通用商务协议（UCP）与 Universal Cart，让 AI Agent 在 Search、Chrome 与 Wallet 中自动帮用户比价、填表并直接完成支付结算，在不丢失零售商品牌关系的前提下开辟增量交易与多轮广告佣金。',
          enD: 'Ranked #1 on the Artificial Analysis Intelligence Index (score 59), Gemini 4 powers 1B+ Gemini App MAUs. With Universal Commerce Protocol (UCP), Agent Payments Protocol, and Universal Cart adopted by Nike, Chewy, Tapestry, and Amex, Google turns multi-step agentic queries into direct checkout and multi-turn ad revenue.',
          zhF: '变现逻辑：AI Mode 多轮赞助对话广告 + UCP 直连结账分润 + Gemini Enterprise 1亿+ 企业知识席位',
          enF: 'Monetization: Multi-turn AI Mode ads + UCP checkout economics + 100M+ enterprise knowledge-work AI seats',
          gauges: [['#1 (59分)', 'Gemini 4 Carbon 智能榜首', 'Intelligence Index Rank'], ['10亿+ MAU', 'Gemini App 史上最快破十亿', 'Gemini App Monthly Users'], ['~32B/分钟', '一方模型 API Token 吞吐', '1P Tokens / Minute'], ['3.0x 转化', 'Ulta 等零售 AI 导购转化提升', 'Retail AI Conversion Lift']]
        },
        {
          badge: 'ENGINE 03 · WIZ ($29.5B) & AUTONOMOUS CYBERSECURITY',
          zhT: '$295亿并购 Wiz + Gemini Cyber：卡位 AI 时代企业最刚需的“多云免疫系统”',
          enT: '$29.5B Wiz Acquisition + Gemini Flash Cyber: Autonomous Multi-Cloud Security Shield',
          zhD: '随着 AI Agent 加速软件迭代，AI 驱动的网络攻击同步激增。谷歌于 2026 年 3 月正式完成史上最大规模收购——以 $295亿 净现金拿下云安全领头羊 Wiz，并注入 Gemini Flash Cyber/Carbon 安全模型（覆盖 20 种编程语言自动漏洞挖掘，补丁可靠度达竞品 2.6 倍，每日分析数百万外部威胁准确率达 98%）。超过 95% 的 Wiz 客户已启用其 AI 安全功能，成为拉动跨云企业客户入驻 Google Cloud 的尖刀产品。',
          enD: 'Closed on March 11, 2026 for $29.5B net cash, Wiz combines with Mandiant and Gemini Flash Cyber (patching vulnerabilities 2.6x more reliably across 20 languages; 98% threat accuracy). Over 95% of Wiz customers adopt its AI features, acting as a multi-cloud wedge for GCP.',
          zhF: '变现逻辑：Wiz 高毛利 ARR 独立高增（支持 AWS/Azure/GCP 多云）+ 交叉销售 BigQuery 与 Gemini 安全套件',
          enF: 'Monetization: High-margin multi-cloud Wiz SaaS ARR + cross-selling Google Threat Intelligence & BigQuery',
          gauges: [['$29.5B', '2026.03 完成交割净现金对价', 'Wiz Net Cash Acquisition'], ['>95%', 'Wiz 客户 AI 安全特性采纳率', 'Wiz AI Feature Adoption'], ['2.6x 可靠度', 'Gemini Cyber 自动漏洞修复', 'Automated Patching Edge'], ['98% 准确率', '每日数百万威胁情报研判', 'Threat Intel Accuracy']]
        },
        {
          badge: 'ENGINE 04 · YOUTUBE LIVING-ROOM & CREATOR SHOPPING',
          zhT: 'YouTube 客厅流媒体王座 + Amazon 跨生态带货：冲击千亿美元媒体商业体',
          enT: 'YouTube Living-Room Dominance + Amazon Creator Tagging: Marching Toward $100B',
          zhD: 'YouTube 不仅以 >$600亿 年营收稳居全球流媒体之巅，更在 2026 年打通社交电商任督二脉：全美超 130 万个频道接入 YouTube Shopping，并重磅引入 Amazon 联盟——美国创作者可在长视频、Shorts 短剧与直播间直接挂载亚马逊海量商品链接。叠加 YouTube Music & Premium 突破 1.5 亿订户及 AI 创作助手降低制作门槛，YouTube 正同时收割“有线电视预算迁移 + 直播电商佣金 + 无广告订阅”。',
          enD: 'Surpassing $60B/yr with >1/3 of ad revenue from living-room TVs and 150M+ Premium subscribers, YouTube enrolled 1.3M+ channels in YouTube Shopping and partnered with Amazon so creators tag Amazon products directly in videos, Shorts, and livestreams.',
          zhF: '变现三叉戟：客厅大屏 CTV 品牌广告 + Demand Gen 效果广告 (ROAS 2.3x) + 1.5亿订阅与电商分佣',
          enF: 'Monetization: Connected-TV brand budgets + Demand Gen (2.3x ROAS) + 150M+ subscriptions & Amazon commerce',
          gauges: [['>$60B/年', 'YouTube 广告+订阅总规模', 'Annual YouTube Revenue'], ['1.5亿+', 'YouTube Music & Premium 订户', 'Music & Premium Subs'], ['130万+', 'YouTube Shopping 入驻频道', 'Shopping Channels'], ['2,000万/日', '全球创作者每日新增上传视频', 'Daily Video Uploads']]
        },
        {
          badge: 'ENGINE 05 · WAYMO AUTONOMOUS MOBILITY NETWORK',
          zhT: 'Waymo 跨越商业化奇点：3亿全无人英里领跑，开启全球大都市与独立债务融资',
          enT: 'Waymo Crosses Commercial Escape Velocity: 300M+ Autonomous Miles & Global Expansion',
          zhD: '历经十五年深耕，Waymo 已从“烧钱登月项目”蜕变为真实运转的无人驾驶商业网络：累计全无人驾驶里程突破 3 亿英里，在旧金山、洛杉矶、凤凰城、奥斯汀及新开通的圣迭戈、圣安东尼奥、坦帕等 15 座美国大都市运营，每周付费乘车突破 50 万单，并正式启动进军加拿大、德国、新加坡与西班牙。2026 年 10 月 Waymo 独立获得 $50亿 无追索权资产抵押贷款（无需母公司担保），标志着资本市场认可其独立现金流造血潜力。',
          enD: 'With 300M+ fully autonomous miles and >500K weekly paid rides across 15 U.S. metros (expanding to Canada, Germany, Singapore, and Spain), Waymo raised $16B in Feb 2026 equity plus a standalone $5.0B non-recourse term loan in Oct 2026.',
          zhF: '变现路线：自营 Robotaxi 出行抽成 + 机场/高速高客单价路线 + 远期车企个人乘用车 L4 系统授权',
          enF: 'Monetization: Robotaxi per-mile fares + airport/freeway premium routes + OEM L4 licensing optionality',
          gauges: [['300M+ 英里', '全无人驾驶真实路测与运营里程', 'Fully Autonomous Miles'], ['15 座美城', '商业化运营并进军加/德/新/西', 'Active U.S. Metros'], ['>50万单/周', '常态化全无人付费出行订单', 'Weekly Paid Rides'], ['$5.0B 贷款', '2026.10 独立无追索权融资', 'Standalone Term Loan']]
        },
        {
          badge: 'ENGINE 06 · ISOMORPHIC LABS, QUANTUM & FUSION POWER',
          zhT: '硬核科学护城河：AlphaFold 3 / Gemini 4 新药研发、Willow 量子计算与清洁能源自主',
          enT: 'Deep-Science Moat: Isomorphic AI Drug Design, Willow Quantum & Fusion Energy',
          zhD: '这是 Alphabet 控股架构最独特的长期阿尔法：Demis Hassabis 亲自兼任 CEO 的 Isomorphic Labs 正调用 Gemini 4 Argon 与 AlphaFold 3 与礼来、诺华、默克等医药巨头合作设计抗癌与免疫小分子药物；量子团队首次演示“魔态培育”迈向容错量子计算机；同时谷歌以 $59亿 收购绿电开发商 Intersect 并签署 200MW 核聚变购电协议，从物理底层解决 2030 年代超大规模 AI 的能源天花板。',
          enD: 'Led by Demis Hassabis, Isomorphic Labs uses AlphaFold 3 and Gemini 4 Argon to design therapeutics alongside global pharma giants; Quantum AI demonstrated magic state cultivation; and Alphabet acquired Intersect ($5.9B) while signing a 200MW fusion PPA.',
          zhF: '战略价值：以高壁垒科学突破创造非对称高毛利专利池（AI 新药里程碑 + 量子算力云 + 零碳低成本电力）',
          enF: 'Value Capture: High-margin biopharma milestones/royalties + quantum cloud advantage + captive clean power',
          gauges: [['诺奖团队', 'AlphaFold 蛋白质结构预测底座', 'Nobel-Winning Science'], ['$5.9B', '收购绿电开发商 Intersect', 'Intersect Energy Deal'], ['200 MW', 'CFS 首座商用核聚变购电签约', 'Fusion Power PPA'], ['魔态培育', '容错量子计算关键物理突破', 'Magic State Quantum']]
        }
      ];

      function renderHorizon() {
        var hz = HORIZONS[state.hzIdx] || HORIZONS[0];
        var en = state.lang === 'en';
        document.getElementById('hzBadge').textContent = en ? hz.enBadge : hz.badge;
        document.getElementById('hzTitle').textContent = en ? hz.enT : hz.zhT;
        var items = en ? hz.enItems : hz.zhItems;
        document.getElementById('hzList').innerHTML = items.map(function (t) {
          return '<li><span class="ft-hz-dot"></span><span>' + t + '</span></li>';
        }).join('');
        document.getElementById('hzProb').textContent = en ? hz.enProb : hz.prob;
        document.getElementById('hzImpact').textContent = en ? hz.enImpact : hz.impact;
      }

      function renderEngine() {
        var eg = ENGINES[state.engIdx] || ENGINES[0];
        var en = state.lang === 'en';
        document.getElementById('engBadge').textContent = eg.badge;
        document.getElementById('engTitle').textContent = en ? eg.enT : eg.zhT;
        document.getElementById('engDesc').textContent = en ? eg.enD : eg.zhD;
        document.getElementById('engFormula').textContent = en ? eg.enF : eg.zhF;
        document.getElementById('engGauges').innerHTML = eg.gauges.map(function (g) {
          return '<div class="ft-gauge-card"><b class="mono">' + g[0] + '</b><span>' + (en ? g[2] : g[1]) + '</span></div>';
        }).join('');
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
        var sl = document.getElementById('sideLightBtn'), sd = document.getElementById('sideDarkBtn');
        if (sl) sl.setAttribute('aria-pressed', String(state.theme === 'light'));
        if (sd) sd.setAttribute('aria-pressed', String(state.theme === 'dark'));
        drawAll();
        if (!silent) showToast(state.theme === 'dark' ? '已切换至深色模式' : '已切换至浅色模式');
      }

      function applyLang(lang, silent) {
        state.lang = (lang === 'en') ? 'en' : 'zh';
        document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
        var zhB = document.getElementById('langZhBtn'), enB = document.getElementById('langEnBtn');
        if (zhB) { zhB.classList.toggle('active', state.lang === 'zh'); zhB.setAttribute('aria-pressed', String(state.lang === 'zh')); }
        if (enB) { enB.classList.toggle('active', state.lang === 'en'); enB.setAttribute('aria-pressed', String(state.lang === 'en')); }
        var lead = document.getElementById('f0LeadText');
        if (lead) lead.innerHTML = F0_LEAD[state.lang];
        var nodes = document.querySelectorAll('[data-i18n-zh]');
        for (var i = 0; i < nodes.length; i++) {
          var val = nodes[i].getAttribute(state.lang === 'en' ? 'data-i18n-en' : 'data-i18n-zh');
          if (val !== null) {
            if (val.indexOf('<span') !== -1) nodes[i].innerHTML = val;
            else nodes[i].textContent = val;
          }
        }
        renderHorizon();
        renderEngine();
        drawAll();
        if (!silent) showToast(state.lang === 'en' ? 'Switched to English' : '已切换为中文');
      }

      document.getElementById('hzTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-hz]');
        if (!b) return;
        state.hzIdx = parseInt(b.getAttribute('data-hz'), 10) || 0;
        var bs = this.querySelectorAll('.ft-hz-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        renderHorizon();
      });

      document.getElementById('engineRail').addEventListener('click', function (e) {
        var b = e.target.closest('[data-eng]');
        if (!b) return;
        state.engIdx = parseInt(b.getAttribute('data-eng'), 10) || 0;
        var bs = this.querySelectorAll('.ft-rail-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        renderEngine();
      });

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
            } else if (ts) {
              showToast(ts);
            }
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

      function drawFutureCanvas() {
        var env = prepCanvas('futureCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        hits.futureCanvas = [];
        var pad = { top: 28, right: 20, bottom: 42, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.fView === 'capex') {
          var peers = [
            { name: 'Alphabet (GOOGL)', cap: 200.0, col: pal.blue, tip: '2026 官方指引 $195B–$205B（中值 $200B）：65% 投向 TPU/服务器，35% 投向 40年数据中心，对应 $560.8B 云订单' },
            { name: 'Amazon', cap: 102.0, col: pal.amber, tip: 'AWS AI 集群与物流履约网络合计约 ~$102B' },
            { name: 'Microsoft', cap: 86.0, col: pal.violet, tip: 'Azure 全球 AI 算力机房重资本扩张约 ~$86B' },
            { name: 'Meta', cap: 66.0, col: pal.red, tip: 'Llama 训练与推荐算法算力投入约 ~$66B' },
            { name: 'Apple', cap: 9.0, col: pal.green, tip: '端侧芯片由购机用户买单，FY26 CapEx 仅 $9.0B' }
          ];
          var maxC = 225;
          for (var g = 0; g <= 4; g++) {
            var gv = Math.round((maxC / 4) * g), gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
          }
          var slot = pw / peers.length, bw = Math.min(44, slot * 0.56);
          peers.forEach(function (p, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = Math.max(6, (p.cap / maxC) * ph), yt = pad.top + ph - bh;
            ctx.fillStyle = p.col;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + p.cap.toFixed(0) + 'B', x + bw / 2, yt - 6);
            ctx.fillStyle = i === 0 ? pal.blue : pal.sub; ctx.font = (i === 0 ? 'bold ' : '600 ') + '10.5px sans-serif';
            ctx.fillText(p.name, x + bw / 2, pad.top + ph + 20);
            hits.futureCanvas.push({ x: x, y: yt, w: bw, h: bh, title: p.name + ' 2026E CapEx', body: p.tip });
          });
        } else {
          var steps = [
            { lbl: 'FY25基准', v: 402.8, b: 0, col: pal.blue, tip: 'FY2025 实际总营收: $402.84B（首次突破四千亿美元）' },
            { lbl: '+Cloud&TPU', v: 245.0, b: 402.8, col: pal.green, tip: 'Google Cloud、Gemini Enterprise 与外售 TPU 集群贡献 +$245B（消化 $560.8B RPO）' },
            { lbl: '+AI搜索&UCP', v: 132.0, b: 647.8, col: pal.violet, tip: 'Search + AI Mode 多轮广告与通用商务协议代理结账增量 +$132B' },
            { lbl: '+YouTube&One', v: 78.0, b: 779.8, col: pal.amber, tip: 'YouTube 客厅广告、带货及 Google One AI Pro/Ultra 订阅贡献 +$78B' },
            { lbl: '+Wiz&Waymo', v: 57.0, b: 857.8, col: pal.green, tip: 'Wiz 多云安全套件与 Waymo 全球无人出行网络贡献 +$57B' },
            { lbl: 'FY32E蓝图', v: 914.8, b: 0, col: pal.blue, tip: 'FY2032E 远期营收蓝图: ~$915B（非广告的企业云、算力、订阅与出行占比超 45%）' }
          ];
          var maxB = 1000;
          for (var k = 0; k <= 4; k++) {
            var kv = Math.round((maxB / 4) * k), ky = pad.top + ph - (k / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, ky); ctx.lineTo(pad.left + pw, ky); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + kv + 'B', pad.left - 8, ky + 4);
          }
          var sW = pw / steps.length, bW = Math.min(44, sW * 0.58);
          steps.forEach(function (s, i) {
            var x = pad.left + i * sW + (sW - bW) / 2;
            var yt = pad.top + ph - ((s.b + s.v) / maxB) * ph;
            var yb = pad.top + ph - (s.b / maxB) * ph;
            var bh = Math.max(5, yb - yt);
            ctx.fillStyle = s.col;
            roundRect(ctx, x, yt, bW, bh, 5); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText((s.b > 0 ? '+' : '') + '$' + s.v.toFixed(0) + 'B', x + bW / 2, yt - 6);
            ctx.fillStyle = pal.sub; ctx.font = '600 10px sans-serif';
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
        var pad = { top: 28, right: 22, bottom: 40, left: 54 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;

        if (state.sView === 'rpo') {
          var qtrs = ['Q4\'23', 'Q4\'24', 'Q4\'25', 'Q1\'26', 'Q2\'26', 'Q3\'26'];
          var rpo = [74.1, 93.2, 240.0, 460.0, 514.0, 560.8];
          var maxR = 620;
          for (var g = 0; g <= 4; g++) {
            var gv = Math.round((maxR / 4) * g), gy = pad.top + ph - (g / 4) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + pw, gy); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText('$' + gv + 'B', pad.left - 8, gy + 4);
          }
          var slot = pw / qtrs.length, bw = Math.min(40, slot * 0.56);
          qtrs.forEach(function (q, i) {
            var x = pad.left + i * slot + (slot - bw) / 2;
            var bh = (rpo[i] / maxR) * ph, yt = pad.top + ph - bh;
            ctx.fillStyle = i >= 3 ? pal.green : pal.blue;
            roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 10.5px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText('$' + rpo[i].toFixed(0) + 'B', x + bw / 2, yt - 6);
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
            ctx.fillText(q, x + bw / 2, pad.top + ph + 20);
            hits.siliconCanvas.push({ x: x, y: yt, w: bw, h: bh, title: q + ' Google Cloud 积压订单', body: '已签约未履约合同余额 $' + rpo[i].toFixed(1) + 'B（超 55% 在未来 24 个月确收）' });
          });
        } else {
          var pts = ['Q3\'25', 'Q4\'25', 'Q1\'26', 'Q2\'26', 'Q3\'26'];
          var tok = [7.5, 10.2, 16.5, 22.8, 32.0];
          var maxT = 36;
          for (var m = 0; m <= 3; m++) {
            var mv = m * 12, my = pad.top + ph - (mv / maxT) * ph;
            ctx.strokeStyle = pal.grid; ctx.beginPath(); ctx.moveTo(pad.left, my); ctx.lineTo(pad.left + pw, my); ctx.stroke();
            ctx.fillStyle = pal.tick; ctx.font = '11px "IBM Plex Mono", monospace'; ctx.textAlign = 'right';
            ctx.fillText(mv + 'B/m', pad.left - 8, my + 4);
          }
          ctx.strokeStyle = pal.violet; ctx.lineWidth = 2.8; ctx.beginPath();
          tok.forEach(function (v, idx) {
            var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxT) * ph;
            if (idx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          });
          ctx.stroke();
          tok.forEach(function (v, idx) {
            var px = pad.left + (idx / 4) * pw, py = pad.top + ph - (v / maxT) * ph;
            ctx.fillStyle = pal.violet; ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(v.toFixed(1) + 'B', px, py - 9);
            ctx.fillStyle = pal.tick; ctx.font = '10.5px "IBM Plex Mono", monospace';
            ctx.fillText(pts[idx], px, pad.top + ph + 20);
            hits.siliconCanvas.push({ x: px - 12, y: py - 12, w: 24, h: 24, title: pts[idx] + ' 一方模型吞吐速率', body: '每分钟处理约 ' + v.toFixed(1) + '0 亿 Tokens（同比飙升逾 4 倍）' });
          });
        }
      }

      // F4: Interactive 2030 Optionality Builder
      var OPT_DATA = {
        tpu: { rev: 75, net: 23.1 },
        agent: { rev: 58, net: 22.6 },
        wiz: { rev: 22, net: 7.5 },
        waymo: { rev: 28, net: 6.4 },
        moon: { rev: 35, net: 12.8 }
      };
      var miniCaps = [4.17, 5.74, 7.41];

      function drawOptMiniCanvas() {
        var env = prepCanvas('optMiniCanvas');
        if (!env) return;
        var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette();
        var pad = { top: 22, right: 18, bottom: 24, left: 46 };
        var pw = w - pad.left - pad.right, ph = h - pad.top - pad.bottom;
        var lbls = state.lang === 'en' ? ['2026 Base', '2030 Core', '2030 + Options'] : ['当前基准', '2030基础盘', '2030含期权'];
        var maxV = Math.max(9.0, Math.ceil(Math.max.apply(null, miniCaps) * 1.15));
        ctx.strokeStyle = pal.grid;
        ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ph); ctx.lineTo(pad.left + pw, pad.top + ph); ctx.stroke();
        var slot = pw / 3, bw = Math.min(54, slot * 0.5);
        miniCaps.forEach(function (v, i) {
          var x = pad.left + i * slot + (slot - bw) / 2;
          var bh = (v / maxV) * ph, yt = pad.top + ph - bh;
          ctx.fillStyle = i === 2 ? pal.green : (i === 1 ? pal.blue : pal.violet);
          roundRect(ctx, x, yt, bw, bh, 6); ctx.fill();
          ctx.fillStyle = pal.text; ctx.font = 'bold 11px "IBM Plex Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText('$' + v.toFixed(2) + 'T', x + bw / 2, yt - 6);
          ctx.fillStyle = pal.tick; ctx.font = '10.5px sans-serif';
          ctx.fillText(lbls[i], x + bw / 2, pad.top + ph + 16);
        });
      }

      function recalcOptionality() {
        // Organic FY2030E baseline (~$665B core search/YT/cloud base, ~$205B core net income, ~12.5B diluted shares)
        var baseRev = 665.0, baseNet = 204.9, sh2030 = 12.50;
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
        var mcapT = (totNet * state.pe) / 1000;
        var baseMcapT = (baseNet * state.pe) / 1000;

        document.getElementById('optRevOut').textContent = '$' + Math.round(totRev) + 'B';
        document.getElementById('optNetOut').textContent = '$' + totNet.toFixed(1) + 'B';
        document.getElementById('optEpsOut').textContent = '$' + eps.toFixed(2);
        document.getElementById('optCapOut').textContent = '$' + mcapT.toFixed(2) + 'T';

        miniCaps = [4.17, baseMcapT, mcapT];
        drawOptMiniCanvas();
      }

      document.querySelectorAll('[data-opt]').forEach(function (chk) {
        chk.addEventListener('change', recalcOptionality);
      });
      document.getElementById('peTabs').addEventListener('click', function (e) {
        var b = e.target.closest('[data-pe]');
        if (!b) return;
        state.pe = parseInt(b.getAttribute('data-pe'), 10) || 28;
        var bs = this.querySelectorAll('.mui-seg-btn');
        for (var i = 0; i < bs.length; i++) bs[i].classList.toggle('active', bs[i] === b);
        recalcOptionality();
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
      bindSeg('fChartTabs', 'data-fview', 'fView', drawFutureCanvas);
      bindSeg('sChartTabs', 'data-sview', 'sView', drawSiliconCanvas);

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

      // Quick Jump ⌘K
      var QITEMS = [
        { id: 'sec-f0', t: 'F0 全栈 AI 宣言与三阶时间窗雷达', s: '2026–2032 近程/中程/远期三大兑现阶段与确定性评级' },
        { id: 'sec-f1', t: 'F1 六大未来增长引擎纵向深潜舱', s: 'Cloud/TPU · Gemini 4/UCP · Wiz · YouTube带货 · Waymo · 量子制药' },
        { id: 'sec-f2', t: 'F2 $2,000亿 AI 资本开支对比与 2032 营收桥', s: '谷歌 ~$200B CapEx 对比硅谷同行 · 迈向 $915B 营收阶梯' },
        { id: 'sec-f3', t: 'F3 硅片与清洁能源主权闭环', s: 'TPU 8t/8i + TorchTPU + $560.8B 订单飙升 + 32B/分钟吞吐' },
        { id: 'sec-f4', t: 'F4 2030 冲击 $8万亿市值期权组装器', s: '自由开关五大新业务期权与估值倍数实时推演 EPS' }
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

      var sbBtn = document.getElementById('sidebarToggleBtn'), sb = document.getElementById('muiSidebar'), bd = document.getElementById('drawerBackdrop');
      sbBtn.addEventListener('click', function () {
        if (window.innerWidth >= 1024) {
          var col = document.documentElement.getAttribute('data-sidebar-collapsed') === '1';
          if (col) document.documentElement.removeAttribute('data-sidebar-collapsed');
          else document.documentElement.setAttribute('data-sidebar-collapsed', '1');
          try { localStorage.setItem('mui_portal_sidebar_collapsed_v1', col ? '0' : '1'); } catch (e) {}
          setTimeout(drawAll, 60);
        } else {
          var open = sb.classList.toggle('open'); bd.classList.toggle('open', open);
        }
      });
      bd.addEventListener('click', function () { sb.classList.remove('open'); bd.classList.remove('open'); });

      
      
      

      window.addEventListener('scroll', function () {
        var bar = document.getElementById('readingProgressBar');
        if (bar) {
          var dh = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (dh > 0 ? Math.min(100, (window.scrollY / dh) * 100) : 0) + '%';
        }
      }, { passive: true });

      try {
        applyTheme((localStorage.getItem(STORAGE_THEME_KEY) || 'dark').replace(/^"|"$/g, ''), true);
        applyLang((localStorage.getItem(STORAGE_LANG_KEY) || 'zh').replace(/^"|"$/g, ''), true);
      } catch (e) {}

      document.getElementById('appbarThemeBtn').addEventListener('click', function () {
        var nxt = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nxt, false);
        try { localStorage.setItem(STORAGE_THEME_KEY, nxt); } catch (e) {}
      });
      document.getElementById('langSwitchGroup').addEventListener('click', function (e) {
        var lb = e.target.closest('[data-lang]');
        if (!lb) return;
        var nl = lb.getAttribute('data-lang');
        applyLang(nl, false);
        try { localStorage.setItem(STORAGE_LANG_KEY, nl); } catch (err) {}
      });

      var rt = null;
      window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 90); });
      recalcOptionality();
      drawAll();
    })();
  