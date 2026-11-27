
 (function () {
 'use strict';

 var STORAGE_THEME_KEY = 'mt_q3_26_mui3_theme';
 var STORAGE_LANG_KEY = 'mt_q3_26_mui3_lang';
 var STORAGE_CHECK_KEY = 'mt_q3_26_mui3_checks';

 var PILLAR_NOTES = [
 '<strong>当前选中支柱解读（01 分钟级履约密度）：</strong>即时配送是典型的双边规模经济，7,300万日均单量摊薄骑手驻留与调度损耗，形成约 ¥0.40/单的行业现金流差值。',
 '<strong>当前选中支柱解读（02 4,000万+ 高阶会员）：</strong>2,000+ 品牌联合会员显著提升复购，驱动外卖客单价（AOV）在补贴退坡下依然实现同比回升。',
 '<strong>当前选中支柱解读（03 1P 自营与闪电仓）：</strong>核心商品销售同比飙升 75.8%，小象超市 85 城成熟盈利叠加叮咚中国业务整合，打开即时零售毛利天花板。',
 '<strong>当前选中支柱解读（04 AI 与出海第二曲线）：</strong>LongCat-2.5 开源与 CatPaw（200万+商家）降低长尾运营成本，Keeta 沙特全季盈利验证海外模型可复制性。'
 ];
 var PILLAR_NOTES_EN = [
 '<strong>Selected Pillar (01 · Fulfillment Density):</strong> ~73M daily orders dilute dispatch overhead, creating a ~¥0.40/order structural cost edge (~¥6.50 vs ~¥6.90 rivals).',
 '<strong>Selected Pillar (02 · 40M+ High-Tier Members):</strong> 2,000+ brand co-memberships lift retention and drive YoY AOV recovery as subsidies normalize.',
 '<strong>Selected Pillar (03 · 1P Supply &amp; Flash Warehouses):</strong> Core 1P sales surged +75.8% YoY while Xiaoxiang (85 cities) and Dingdong integration deepen retail margins.',
 '<strong>Selected Pillar (04 · AI &amp; Keeta Global):</strong> LongCat-2.5 &amp; CatPaw (2M+ merchants) boost efficiency while Keeta Saudi turns profitable for full Q3.'
 ];

 var PEER_ROWS = [
 { category:'functional', benchmark:true, company:'美团 · 核心本地商业', leader:'外卖 + 闪购闪电仓 + 到店酒旅', positioning:'即时配送 ~7,300万日单 · 高阶会员 4,000万+', culture:'¥782.82亿 (+16.8% YoY) · >50% GMV 份额', headcount:'营业利润 ¥57.0亿 (7.3% OPM) · UE ~+¥0.40', margins:'同比扭亏近 ¥200亿，单均履约成本 ~¥6.5 具绝对优势', verdict:'主业利润大超预期 37%，正式确认盈利拐点。', sourceLabel:'亿欧拆解', sourceUrl:'https://www.iyiou.com/news/202611271147463' },
 { category:'functional', benchmark:true, company:'美团 · 新业务分部', leader:'小象超市(1P) + Keeta 出海 + 无人机', positioning:'小象 85 城 + 9 家实体店 · 巴西 32 城', culture:'¥372.73亿 (+32.9% YoY) · 商品销售 +48.6%', headcount:'营业亏损 -¥13.1亿 (-3.5% OPM)', margins:'沙特全季盈利、香港利润率扩张，亏损连续收窄', verdict:'海外盈利模板跑通，第二曲线估值重塑。', sourceLabel:'BigGo Finance', sourceUrl:'https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6' },
 { category:'functional', benchmark:false, company:'美团 · 1P 核心商品销售', leader:'歪马送酒 + 1P 医药 + 品牌闪电仓', positioning:'30分钟万物到家高毛利自营供给', culture:'¥42.6亿 (+75.8% YoY · 核心最快板块)', headcount:'显著拉升即时零售非餐客单与毛利池', margins:'与 2,000+ 品牌联合会员深度协同', verdict:'即时零售供给加密的核心增长引擎。', sourceLabel:'华盛通', sourceUrl:'https://www.hstong.com/news/detail/26112509530475644' },
 { category:'divisional', benchmark:false, company:'淘宝闪购 (阿里体系)', leader:'远近场电商融合 + 88VIP 导流', positioning:'~4,800–5,200万日单 (第三方估算)', culture:'易观 Q2 口径即时零售订单份额 ~45.7%', headcount:'单均履约成本 ~¥6.9 · 汇丰估25Q2–26Q1亏~870亿', margins:'高补贴拉新后 ROI 考核趋严，Q3 补贴降温', verdict:'高客单正餐粘性与履约密度仍弱于美团。', sourceLabel:'第三方估算', sourceUrl:'https://www.iyiou.com/news/202611271147463' },
 { category:'divisional', benchmark:false, company:'京东外卖 / 秒送', leader:'品质堂食 + 3C/商超即时达', positioning:'~630–1,000万日单 (第三方估算)', culture:'即时配送订单份额 ~5%–8%', headcount:'聚焦高客单品质餐饮与自营生态协同', margins:'全职骑手品牌心智强，但高频餐饮密度待提升', verdict:'差异化切入品质餐饮，对美团大盘冲击可控。', sourceLabel:'第三方估算', sourceUrl:'https://www.iyiou.com/news/202611271147463' },
 { category:'divisional', benchmark:false, company:'抖音本地生活', leader:'短视频/直播内容到店核销', positioning:'2025年支付 GMV >¥8,500亿', culture:'内容种草流量极强，切入货架团购', headcount:'压制美团到店 OPM 自 ~45% 向 ~26.5% 收敛', margins:'缺乏 30 分钟即时配送物理履约网络', verdict:'美团到店业务的核心长期结构性对手。', sourceLabel:'市场研究', sourceUrl:'https://www.iyiou.com/news/202611271147463' }
 ];
 var PEER_ROWS_EN = [
 { category:'functional', benchmark:true, company:'Meituan · Core Local Commerce', leader:'Delivery + Flash Warehouses + In-Store', positioning:'~73M daily orders · 40M+ high-tier members', culture:'¥78.28B (+16.8% YoY) · >50% GMV share', headcount:'OP ¥5.70B (7.3% OPM) · UE ~+¥0.40', margins:'~¥20B YoY OP swing; ~¥6.5/order cost moat', verdict:'Core beat consensus by 37%, confirming UE inflection.', sourceLabel:'Iyiou', sourceUrl:'https://www.iyiou.com/news/202611271147463' },
 { category:'functional', benchmark:true, company:'Meituan · New Initiatives', leader:'Xiaoxiang (1P) + Keeta + Drones', positioning:'Xiaoxiang 85 cities · Keeta Brazil 32 cities', culture:'¥37.27B (+32.9% YoY) · Merchandise +48.6%', headcount:'Op Loss -¥1.31B (-3.5% OPM)', margins:'Saudi Q3 profitable; HK margin expanding', verdict:'Global unit model validated; narrowing losses.', sourceLabel:'BigGo', sourceUrl:'https://finance.biggo.com/news/7f36f126-d6db-425b-a63e-41077e272bf6' },
 { category:'functional', benchmark:false, company:'Meituan · Core 1P Sales', leader:'Waima Songjiu + 1P Pharma + Flash', positioning:'30-min high-margin 1P retail supply', culture:'¥4.26B (+75.8% YoY · fastest line)', headcount:'Lifts non-meal AOV and gross margin pool', margins:'Synergizes with 2,000+ brand co-memberships', verdict:'Fastest growth engine inside Core Local Commerce.', sourceLabel:'Hstong', sourceUrl:'https://www.hstong.com/news/detail/26112509530475644' },
 { category:'divisional', benchmark:false, company:'Taobao Instant Commerce', leader:'E-Commerce + Instant Retail', positioning:'~48M–52M daily orders (est.)', culture:'~45.7% Q2 instant retail order share (est.)', headcount:'~¥6.9/order cost; ~¥87B losses (HSBC est.)', margins:'ROI tightening drove Q3 subsidy rationalization', verdict:'Trails Meituan in high-AOV meals &amp; density.', sourceLabel:'Est.', sourceUrl:'https://www.iyiou.com/news/202611271147463' },
 { category:'divisional', benchmark:false, company:'JD Food Delivery', leader:'Quality Dining + 3C Instant', positioning:'~6.3M–10M daily orders (est.)', culture:'~5%–8% order share', headcount:'Focused on quality dine-in &amp; 1P synergy', margins:'Strong brand trust, lower high-frequency density', verdict:'Manageable niche competition in quality meals.', sourceLabel:'Est.', sourceUrl:'https://www.iyiou.com/news/202611271147463' },
 { category:'divisional', benchmark:false, company:'Douyin Local Services', leader:'Content-Driven In-Store', positioning:'2025 Paid GMV >¥850B', culture:'Dominant discovery &amp; livestream traffic', headcount:'Compresses Meituan in-store OPM toward ~26.5%', margins:'Lacks 30-min physical fulfillment grid', verdict:'Primary structural rival in in-store dining/hotels.', sourceLabel:'Est.', sourceUrl:'https://www.iyiou.com/news/202611271147463' }
 ];

 var CHECKLIST_ITEMS = [
 { tag:'7.3%+ OPM', title:'1. 核心本地商业营业利润率稳定在 7.3%–9.0% 区间', desc:'跟踪 Q4 淡季补贴不反弹，核心商业单季营业利润维持 ¥55–80亿中枢。' },
 { tag:'~¥6.5/单', title:'2. 单均履约成本在骑手社保落地后仍保持 ¥0.3–0.4 优势', desc:'验证 7,300万日单密度与 LongCat-2.5 调度对冲社保增量成本。' },
 { tag:'+75.8% 1P', title:'3. 1P 商品销售（医药/酒水/闪电仓）保持 50%+ 高增', desc:'持续拉升非餐即时零售客单价与毛利结构。' },
 { tag:'AI 杠杆', title:'4. 未分配项目（¥16.5–17亿）中 AI 基建投入增速见顶', desc:'释放 Non-IFRS 净利率向核心营业利润率收敛的弹性。' },
 { tag:'85城盈利', title:'5. 小象超市 85 城及叮咚买菜中国业务冷链协同兑现', desc:'跟踪华东仓网整合后前置仓净利率继续改善。' },
 { tag:'Keeta', title:'6. Keeta 巴西（32城）复刻沙特与香港盈利爬坡曲线', desc:'监测巴西 43万骑手与 8.3万餐厅的单均亏损收窄速度。' }
 ];
 var CHECKLIST_ITEMS_EN = [
 { tag:'7.3%+ OPM', title:'1. Core Local OPM holds 7.3%–9.0% in Q4 &amp; 2027', desc:'Confirm subsidy discipline keeps Core OP in RMB 5.5–8.0B range.' },
 { tag:'~¥6.5/order', title:'2. Fulfillment cost stays ¥0.3–0.4 below peers', desc:'Verify 73M daily order density &amp; LongCat-2.5 offset rider insurance.' },
 { tag:'+75.8% 1P', title:'3. 1P Merchandise (Pharma/Liquor/Flash) grows >50%', desc:'Expand non-meal instant retail AOV and gross margin pool.' },
 { tag:'AI Capex', title:'4. Unallocated AI spend (¥1.65–1.70B) peaks', desc:'Unlock Non-IFRS net margin convergence toward Core OPM.' },
 { tag:'85 Cities', title:'5. Xiaoxiang &amp; Dingdong China cold-chain synergy', desc:'Track East China warehouse integration boosting grocery margins.' },
 { tag:'Keeta', title:'6. Keeta Brazil (32 cities) replicates Saudi playbook', desc:'Monitor per-order loss narrowing across 430K riders &amp; 83K merchants.' }
 ];

 var QUICK_JUMP_INDEX = [
 { sec:'sec-00', title:'00 执行摘要与核心指标', sub:'营收 ¥1,155.6亿 (+21.6%) · 核心OP ¥57.0亿 · 现金 ¥1,575亿' },
 { sec:'sec-01', title:'01 业务架构与损益表协同', sub:'核心商业 ¥782.8亿 · 新业务 ¥372.7亿 · 双视图图表' },
 { sec:'sec-02', title:'02 四大护城河支柱与雷达', sub:'履约密度 ~¥6.5/单 · 4,000万会员 · 五维竞争雷达' },
 { sec:'sec-03', title:'03 即时零售巨头横向对比', sub:'美团 vs 淘宝闪购 vs 京东外卖 vs 抖音本地生活' },
 { sec:'sec-04', title:'04 单均UE拐点与利润推演', sub:'补贴减半 UE +¥0.40 · 交互式季度利润弹性模拟器' },
 { sec:'sec-05', title:'05 三阶段演进与四大战役', sub:'2025Q3 承压 → 2026Q3 拐点 → 2027+ AI与出海' },
 { sec:'sec-06', title:'06 美团护城河核查清单', sub:'6 项季度追踪指标与本地持久化进度' },
 { sec:'sec-07', title:'07 官方披露与信源索引', sub:'Meituan IR · 亿欧 · BigGo · Investing.com · 华盛通 · MLQ.ai' }
 ];

 var PRESETS = {
 p1: { principal: 73, years: 8, priceCagr: 0.40, drip: true },
 p2: { principal: 68, years: 8, priceCagr: -0.15, drip: false },
 p3: { principal: 85, years: 10, priceCagr: 0.85, drip: true }
 };

 var state = {
 lang: 'zh', theme: 'light', ch1View: 'viewA', activePillar: 0,
 radarSeries: { aapl: true, nvda: true, mform: true },
 ch1Series: { s1: true, s2: true }, epsSeries: { eps: true, oci: true },
 peerFilter: 'all', peerQuery: '',
 sim: { principal: 73, years: 8, priceCagr: 0.40, drip: true, preset: 'p1' },
 checks: [true, true, true, false, false, false]
 };
 var hitRegions = { chartCh1: [], chartRadar: [], chartBars: [], chartEps: [], chartSim: [] };
 var hoverState = { chartCh1: -1, chartRadar: -1, chartBars: -1, chartEps: -1, chartSim: -1 };

 function safeGet(k) { try { return localStorage.getItem(k); } catch(e){ return null; } }
 function safeSet(k, v) { try { localStorage.setItem(k, v); } catch(e){} }
 function isEn() { return state.lang === 'en'; }
 function showToast(msg) {
 var el = document.getElementById('muiSnackbar');
 if (!el) return;
 el.textContent = msg; el.classList.add('show');
 clearTimeout(el._t); el._t = setTimeout(function(){ el.classList.remove('show'); }, 2400);
 }
 function escapeHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
 function hl(t, q) {
 var safe = escapeHtml(t);
 if (!q) return safe;
 return safe.replace(new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi'), '<mark class="hl">$1</mark>');
 }

 function applyTheme(t, silent) {
 state.theme = t === 'dark' ? 'dark' : 'light';
 document.documentElement.setAttribute('data-theme', state.theme);
 var ic = document.getElementById('appbarThemeIcon');
 if (ic) ic.innerHTML = state.theme === 'dark'
 ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>'
 : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
 document.getElementById('sideThemeLightBtn').classList.toggle('active', state.theme === 'light');
 document.getElementById('sideThemeDarkBtn').classList.toggle('active', state.theme === 'dark');
 safeSet(STORAGE_THEME_KEY, state.theme);
 renderAllCharts();
 if (!silent) showToast(state.theme === 'dark' ? (isEn()?'Dark Mode':'已切换至 MUI 深海黑曜石模式') : (isEn()?'Light Mode':'已切换至 MUI 浅色明亮模式'));
 }

 function applyLanguage(l, silent) {
 state.lang = l === 'en' ? 'en' : 'zh';
 document.documentElement.lang = isEn() ? 'en' : 'zh-CN';
 document.getElementById('langZhBtn').classList.toggle('active', !isEn());
 document.getElementById('langEnBtn').classList.toggle('active', isEn());
 document.querySelectorAll('[data-zh][data-en]').forEach(function(el){
 var v = el.getAttribute(isEn()?'data-en':'data-zh');
 if (v.indexOf('<span') !== -1 || v.indexOf('<br') !== -1 || v.indexOf('<strong') !== -1) el.innerHTML = v;
 else el.textContent = v;
 });
 document.getElementById('pillarFocusNote').innerHTML = '<div>' + (isEn()?PILLAR_NOTES_EN:PILLAR_NOTES)[state.activePillar] + '</div>';
 renderPeerTable();
 renderChecklist();
 updateSimulatorUI();
 renderAllCharts();
 safeSet(STORAGE_LANG_KEY, state.lang);
 if (!silent) showToast(isEn() ? 'Switched to English' : '已切换至中文视图');
 }

 function renderPeerTable() {
 var tbody = document.getElementById('peerTableBody'), badge = document.getElementById('peerCountBadge');
 var rows = isEn() ? PEER_ROWS_EN : PEER_ROWS, q = state.peerQuery.trim().toLowerCase();
 var filtered = rows.filter(function(r, idx){
 if (state.peerFilter !== 'all' && r.category !== state.peerFilter) return false;
 if (!q) return true;
 var blob = (PEER_ROWS[idx].company + ' ' + PEER_ROWS[idx].leader + ' ' + PEER_ROWS[idx].culture + ' ' + PEER_ROWS[idx].headcount + ' ' + PEER_ROWS_EN[idx].company + ' ' + PEER_ROWS_EN[idx].culture).toLowerCase();
 return blob.indexOf(q) !== -1;
 });
 badge.textContent = isEn() ? ('Showing ' + filtered.length + ' / ' + rows.length) : ('显示 ' + filtered.length + ' / ' + rows.length + ' 条记录');
 tbody.innerHTML = filtered.map(function(r){
 return '<tr class="'+(r.benchmark?'benchmark-row':'')+'">'+
 '<td><strong style="color:var(--text-primary);display:block;">'+hl(r.company, state.peerQuery.trim())+'</strong></td>'+
 '<td>'+hl(r.leader, state.peerQuery.trim())+'</td>'+
 '<td class="mono" style="font-size:0.79rem;">'+hl(r.positioning, state.peerQuery.trim())+'</td>'+
 '<td>'+hl(r.culture, state.peerQuery.trim())+'</td>'+
 '<td class="mono" style="font-size:0.79rem;color:var(--mui-primary-lighter);font-weight:700;">'+hl(r.headcount, state.peerQuery.trim())+'</td>'+
 '<td>'+hl(r.margins, state.peerQuery.trim())+' <a class="cite-link" href="'+r.sourceUrl+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(r.sourceLabel)+' ↗</a></td>'+
 '</tr>';
 }).join('') || '<tr><td colspan="6" style="text-align:center;padding:24px;">未找到匹配记录</td></tr>';
 }

 function renderChecklist() {
 var c = document.getElementById('checklistContainer'), chip = document.getElementById('checklistScoreChip'), bar = document.getElementById('checklistProgressBar');
 var list = isEn() ? CHECKLIST_ITEMS_EN : CHECKLIST_ITEMS;
 var done = state.checks.filter(Boolean).length, pct = Math.round((done / list.length) * 100);
 chip.textContent = isEn() ? ('Verified ' + done + ' / ' + list.length + ' (' + pct + '%)') : ('已核查 ' + done + ' / ' + list.length + ' 项 (' + pct + '%)');
 bar.style.width = pct + '%';
 c.innerHTML = list.map(function(it, i){
 var chk = !!state.checks[i];
 return '<label class="check-card '+(chk?'checked':'')+'"><input type="checkbox" data-check-input="'+i+'" '+(chk?'checked':'')+' /><div style="flex:1;"><div style="display:flex;justify-content:space-between;gap:6px;margin-bottom:4px;"><span class="check-title">'+escapeHtml(it.title)+'</span><span class="mui-chip mono">'+escapeHtml(it.tag)+'</span></div><p class="check-desc">'+escapeHtml(it.desc)+'</p></div></label>';
 }).join('');
 }

 function updateSimulatorUI() {
 var vol = state.sim.principal, qs = state.sim.years, ue = state.sim.priceCagr, ai = state.sim.drip ? 0.12 : 0;
 document.getElementById('simPrincipalLabel').textContent = vol + 'M';
 document.getElementById('simYearsLabel').textContent = qs + (isEn()?' Qtrs':' 季度');
 document.getElementById('simCagrLabel').textContent = (ue>=0?'+¥':'-¥') + Math.abs(ue).toFixed(2);

 var coreArr = [], grpArr = [], cum = 0;
 for (var i=1; i<=qs; i++) {
 var effUe = ue + ai * (i / qs);
 var coreOp = 30.5 + (vol * 1e6 * 91.25 * effUe) / 1e8;
 var grpOp = coreOp - 13.1 * Math.pow(0.85, i / 2) - 15.5;
 coreArr.push(coreOp); grpArr.push(grpOp); cum += Math.max(0, coreOp);
 }
 var mid = Math.max(0, Math.floor(qs/2) - 1);
 document.getElementById('simEndingVal').textContent = '¥' + coreArr[qs-1].toFixed(1) + '亿';
 document.getElementById('simMoicVal').textContent = '¥' + grpArr[qs-1].toFixed(1) + '亿';
 document.getElementById('simNetGainVal').textContent = '¥' + Math.round(cum) + '亿';
 document.getElementById('simMidVal').textContent = '¥' + grpArr[mid].toFixed(1) + '亿';

 document.querySelectorAll('[data-preset]').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-preset')===state.sim.preset); });
 drawSimChart();
 }

 // Canvas Helpers & Charts
 function getPalette() {
 var cs = getComputedStyle(document.documentElement), isDark = state.theme === 'dark';
 return {
 isDark: isDark, grid: cs.getPropertyValue('--chart-grid').trim(), tick: cs.getPropertyValue('--chart-tick').trim(),
 text: cs.getPropertyValue('--text-primary').trim(), pillBg: isDark?'rgba(9,13,22,0.88)':'rgba(255,255,255,0.94)',
 pillBorder: isDark?'rgba(51,153,255,0.28)':'rgba(0,115,230,0.24)', trackBg: isDark?'rgba(148,163,184,0.10)':'rgba(15,25,36,0.06)',
 hoverBand: isDark?'rgba(51,153,255,0.08)':'rgba(0,115,230,0.05)', c1: cs.getPropertyValue('--chart-c1').trim(),
 c2: cs.getPropertyValue('--chart-c2').trim(), c3: cs.getPropertyValue('--chart-c3').trim(), c4: cs.getPropertyValue('--chart-c4').trim()
 };
 }
 function prepareCanvas(id) {
 var canvas = document.getElementById(id); if (!canvas || !canvas.parentElement) return null;
 var r = canvas.parentElement.getBoundingClientRect(), w = Math.max(240, Math.floor(r.width)), h = Math.max(170, Math.floor(r.height));
 var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
 canvas.style.width = w+'px'; canvas.style.height = h+'px'; canvas.width = Math.floor(w*dpr); canvas.height = Math.floor(h*dpr);
 var ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
 return { ctx: ctx, w: w, h: h };
 }
 function roundRectPath(ctx, x, y, w, h, r) {
 if (w<=0||h<=0) return; var rad=Math.min(r,w/2,h/2); ctx.beginPath(); ctx.moveTo(x+rad,y); ctx.lineTo(x+w-rad,y); ctx.quadraticCurveTo(x+w,y,x+w,y+rad); ctx.lineTo(x+w,y+h-rad); ctx.quadraticCurveTo(x+w,y+h,x+w-rad,y+h); ctx.lineTo(x+rad,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-rad); ctx.lineTo(x,y+rad); ctx.quadraticCurveTo(x,y,x+rad,y); ctx.closePath();
 }
 function drawValueBadge(ctx, text, cx, cy, fg, pal) {
 ctx.save(); ctx.font='700 10.5px "IBM Plex Mono", sans-serif'; var tw=ctx.measureText(text).width+9, th=17;
 ctx.fillStyle=pal.pillBg; roundRectPath(ctx, cx-tw/2, cy-th/2, tw, th, 5); ctx.fill();
 ctx.strokeStyle=pal.pillBorder; ctx.lineWidth=1; ctx.stroke();
 ctx.fillStyle=fg; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(text, cx, cy+0.5); ctx.restore();
 }
 function drawSmoothLine(ctx, pts) {
 if (!pts.length) return; ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
 for (var i=0; i<pts.length-1; i++) { var xc=(pts[i].x+pts[i+1].x)/2; ctx.bezierCurveTo(xc, pts[i].y, xc, pts[i+1].y, pts[i+1].x, pts[i+1].y); }
 }

 function drawCh1Chart() {
 var env = prepareCanvas('chartCh1'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartCh1 = [];
 var pad = { top: 28, right: 24, bottom: 38, left: 52 }, pw = w-pad.left-pad.right, ph = h-pad.top-pad.bottom;
 if (state.ch1View === 'viewA') {
 var lbls = ['24Q3','25Q2','25Q3','26Q1','26Q2','26Q3'], revs = [936,918,951,910,1046,1156], coreOp = [146,37.2,-140.7,-38.0,56.7,57.0];
 var minV = -200, maxV = 1250, yOf = function(v){ return pad.top + (1-(v-minV)/(maxV-minV))*ph; };
 [-200,0,300,600,900,1200].forEach(function(v){
 var y=yOf(v); ctx.strokeStyle=v===0?pal.c1:pal.grid; ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(w-pad.right,y); ctx.stroke();
 ctx.fillStyle=pal.tick; ctx.font='11px "IBM Plex Mono", sans-serif'; ctx.textAlign='right'; ctx.fillText(v, pad.left-7, y+4);
 });
 var step = pw/lbls.length, bw = Math.min(36, step*0.42), pts = [];
 lbls.forEach(function(lb, i){
 var cx = pad.left + step*(i+0.5);
 if (state.ch1Series.s1) {
 var y0=yOf(0), y1=yOf(revs[i]); ctx.fillStyle=i===5?pal.c2:pal.c1;
 roundRectPath(ctx, cx-bw/2, y1, bw, y0-y1, 5); ctx.fill();
 drawValueBadge(ctx, revs[i]+'亿', cx, y1-11, i===5?pal.c2:pal.c1, pal);
 }
 pts.push({ x:cx, y:yOf(coreOp[i]), v:coreOp[i] });
 ctx.fillStyle=pal.text; ctx.font='700 11px sans-serif'; ctx.textAlign='center'; ctx.fillText(lb, cx, h-12);
 hitRegions.chartCh1.push({ idx:i, x:cx-step/2, y:pad.top, w:step, h:ph+24, html:'<strong>'+lb+'</strong><br/>总营收: '+revs[i]+'亿<br/>核心OP: '+coreOp[i]+'亿' });
 });
 if (state.ch1Series.s2) {
 ctx.strokeStyle=pal.c3; ctx.lineWidth=2.8; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function(pt){ ctx.fillStyle=pal.c3; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI*2); ctx.fill(); });
 }
 } else {
 var items = [
 { l:'总营收', v:1155.6, c:pal.c1 }, { l:'销售成本', v:-778.7, c:pal.tick },
 { l:'销售营销', v:-270.2, c:pal.c3 }, { l:'研发开支', v:-77.2, c:pal.c4 },
 { l:'核心OP', v:57.0, c:pal.c2 }, { l:'新业务OP', v:-13.1, c:'#EF4444' }, { l:'集团OP', v:27.4, c:'#0EA5E9' }
 ];
 var minB=-850, maxB=1250, yB=function(v){ return pad.top+(1-(v-minB)/(maxB-minB))*ph; };
 [-800,-400,0,400,800,1200].forEach(function(v){ var y=yB(v); ctx.strokeStyle=pal.grid; ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(w-pad.right,y); ctx.stroke(); ctx.fillStyle=pal.tick; ctx.font='11px monospace'; ctx.textAlign='right'; ctx.fillText(v, pad.left-7, y+4); });
 var st = pw/items.length;
 items.forEach(function(it, i){
 var cx=pad.left+st*(i+0.5), y0=yB(0), y1=yB(it.v), bbw=Math.min(42, st*0.52);
 ctx.fillStyle=it.c; roundRectPath(ctx, cx-bbw/2, Math.min(y0,y1), bbw, Math.max(3,Math.abs(y1-y0)), 4); ctx.fill();
 ctx.fillStyle=pal.text; ctx.font='11px sans-serif'; ctx.textAlign='center'; ctx.fillText(it.l, cx, h-12);
 hitRegions.chartCh1.push({ idx:i, x:cx-st/2, y:pad.top, w:st, h:ph+24, html:'<strong>'+it.l+'</strong>: '+it.v+'亿元' });
 });
 }
 }

 function drawRadarChart() {
 var env = prepareCanvas('chartRadar'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartRadar = [];
 var axes = isEn() ? ['Fulfillment','Membership','1P Supply','AI & Global','In-Store'] : ['履约网络密度','高阶会员壁垒','自营供应链','AI & 出海能力','到店核销心智'];
 var series = [
 { key:'aapl', color:pal.c1, fill:'rgba(51,153,255,0.24)', vals:[9.6, 9.2, 8.9, 9.1, 8.2] },
 { key:'nvda', color:pal.c2, fill:'rgba(34,197,94,0.16)', vals:[8.2, 8.5, 8.4, 7.8, 5.5] },
 { key:'mform', color:pal.c3, fill:'rgba(255,183,77,0.14)', vals:[4.5, 7.0, 5.0, 7.6, 9.4] }
 ];
 var cx=w/2, cy=h/2+8, R=Math.max(60, Math.min((w-200)/2, h*0.35)), n=axes.length;
 [2,4,6,8,10].forEach(function(ring){
 var r=(ring/10)*R; ctx.strokeStyle=pal.grid; ctx.beginPath();
 for(var i=0;i<n;i++){ var ang=-Math.PI/2+(2*Math.PI*i)/n, x=cx+Math.cos(ang)*r, y=cy+Math.sin(ang)*r; if(i===0)ctx.moveTo(x,y); else ctx.lineTo(x,y); }
 ctx.closePath(); ctx.stroke();
 });
 for(var a=0;a<n;a++){
 var ang=-Math.PI/2+(2*Math.PI*a)/n, ax=cx+Math.cos(ang)*R, ay=cy+Math.sin(ang)*R;
 ctx.strokeStyle=a===state.activePillar?pal.c1:pal.grid; ctx.lineWidth=a===state.activePillar?2:1;
 ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ax,ay); ctx.stroke();
 ctx.fillStyle=a===state.activePillar?pal.c1:pal.text; ctx.font='700 11.5px sans-serif'; ctx.textAlign='center';
 ctx.fillText(axes[a], cx+Math.cos(ang)*(R+22), cy+Math.sin(ang)*(R+16));
 }
 series.forEach(function(s){
 if(!state.radarSeries[s.key]) return;
 ctx.beginPath();
 s.vals.forEach(function(v,i){ var ang=-Math.PI/2+(2*Math.PI*i)/n, x=cx+Math.cos(ang)*R*(v/10), y=cy+Math.sin(ang)*R*(v/10); if(i===0)ctx.moveTo(x,y); else ctx.lineTo(x,y); });
 ctx.closePath(); ctx.fillStyle=s.fill; ctx.fill(); ctx.strokeStyle=s.color; ctx.lineWidth=2.4; ctx.stroke();
 });
 }

 function drawHorizontalBars() {
 var env = prepareCanvas('chartBars'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartBars = [];
 var items = [
 { l:'核心本地商业核心商品 (1P) 同比增速', v:75.8, c:pal.c2, sub:'¥42.6亿 · 医药/歪马送酒' },
 { l:'集团销售成本占营收比 (较Q3\'25降6.6pct)', v:67.4, c:pal.c1, sub:'¥778.7亿 / ¥1,155.6亿' },
 { l:'新业务分部营收同比增速', v:32.9, c:pal.c4, sub:'¥372.73亿 · 小象/Keeta' },
 { l:'配送服务营收同比增速', v:25.3, c:'#38BDF8', sub:'¥288.7亿 · 一对一急送' },
 { l:'销售及营销开支占营收比 (YoY -20.0%)', v:23.4, c:pal.c3, sub:'¥270.2亿 (Q3\'25 ¥338亿)' },
 { l:'核心本地商业营业利润率 (Core OPM)', v:7.3, c:pal.c2, sub:'¥57.0亿 (+37% 超预期)' }
 ];
 var pad={top:10,right:20,bottom:24,left:20}, pw=w-pad.left-pad.right, ph=h-pad.top-pad.bottom, maxX=85, rowH=ph/items.length;
 items.forEach(function(it, i){
 var top=pad.top+i*rowH, ly=top+rowH*0.34, by=top+rowH*0.52, bh=14, bw=Math.max(8,(it.v/maxX)*pw);
 ctx.fillStyle=pal.text; ctx.font='600 12px sans-serif'; ctx.textAlign='left'; ctx.fillText(it.l, pad.left, ly);
 ctx.fillStyle=it.c; ctx.font='800 12px monospace'; ctx.textAlign='right'; ctx.fillText(it.v.toFixed(1)+'%', pad.left+pw, ly);
 ctx.fillStyle=pal.trackBg; roundRectPath(ctx, pad.left, by, pw, bh, 7); ctx.fill();
 ctx.fillStyle=it.c; roundRectPath(ctx, pad.left, by, bw, bh, 7); ctx.fill();
 hitRegions.chartBars.push({ idx:i, x:pad.left, y:top, w:pw, h:rowH, html:'<strong>'+it.l+'</strong>: '+it.v+'%<br/>'+it.sub });
 });
 }

 function drawEpsComboChart() {
 var env = prepareCanvas('chartEps'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartEps = [];
 var yrs=['24Q3','25Q2','25Q3','26Q1','26Q2','26Q3'], rev=[936,918,951,910,1046,1156], opm=[21.0,5.7,-20.9,-5.5,7.9,7.3];
 var pad={top:26,right:50,bottom:36,left:52}, pw=w-pad.left-pad.right, ph=h-pad.top-pad.bottom;
 var yR=function(v){ return pad.top+(1-v/1300)*ph; }, yP=function(v){ return pad.top+(1-(v+25)/50)*ph; };
 [0,300,600,900,1200].forEach(function(v){ var y=yR(v); ctx.strokeStyle=pal.grid; ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(w-pad.right,y); ctx.stroke(); ctx.fillStyle=pal.tick; ctx.font='11px monospace'; ctx.textAlign='right'; ctx.fillText(v, pad.left-7, y+4); });
 [-20,0,10,20].forEach(function(v){ ctx.fillStyle=pal.c2; ctx.font='11px monospace'; ctx.textAlign='left'; ctx.fillText(v+'%', w-pad.right+7, yP(v)+4); });
 var step=pw/yrs.length, bw=Math.min(38, step*0.42), pts=[];
 yrs.forEach(function(lb, i){
 var cx=pad.left+step*(i+0.5);
 if(state.epsSeries.eps){ var y1=yR(rev[i]), y0=yR(0); ctx.fillStyle=i===5?pal.c1:'rgba(51,153,255,0.45)'; roundRectPath(ctx, cx-bw/2, y1, bw, y0-y1, 5); ctx.fill(); }
 pts.push({ x:cx, y:yP(opm[i]), v:opm[i] });
 ctx.fillStyle=pal.text; ctx.font='700 11px sans-serif'; ctx.textAlign='center'; ctx.fillText(lb, cx, h-10);
 hitRegions.chartEps.push({ idx:i, x:cx-step/2, y:pad.top, w:step, h:ph+24, html:'<strong>'+lb+'</strong><br/>营收: '+rev[i]+'亿<br/>核心OPM: '+opm[i]+'%' });
 });
 if(state.epsSeries.oci){
 ctx.strokeStyle=pal.c2; ctx.lineWidth=2.8; drawSmoothLine(ctx, pts); ctx.stroke();
 pts.forEach(function(pt){ ctx.fillStyle=pal.c2; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI*2); ctx.fill(); drawValueBadge(ctx, pt.v+'%', pt.x, pt.y-14, pal.c2, pal); });
 }
 }

 function drawSimChart() {
 var env = prepareCanvas('chartSim'); if (!env) return;
 var ctx = env.ctx, w = env.w, h = env.h, pal = getPalette(); hitRegions.chartSim = [];
 var vol=state.sim.principal, qs=state.sim.years, ue=state.sim.priceCagr, ai=state.sim.drip?0.12:0;
 var s1=[], s2=[];
 for(var i=1;i<=qs;i++){
 s1.push(30.5 + (vol*1e6*91.25*(ue+ai*(i/qs)))/1e8);
 s2.push(30.5 + (vol*1e6*91.25*ue)/1e8);
 }
 var maxV=Math.max(100, Math.max.apply(null,s1)*1.12), minV=Math.min(0, Math.min.apply(null,s2)-10);
 var pad={top:18,right:20,bottom:26,left:52}, pw=w-pad.left-pad.right, ph=h-pad.top-pad.bottom;
 var yOf=function(v){ return pad.top+(1-(v-minV)/(maxV-minV))*ph; };
 [minV, Math.round(maxV/2), Math.round(maxV)].forEach(function(v){ var y=yOf(v); ctx.strokeStyle=pal.grid; ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(w-pad.right,y); ctx.stroke(); ctx.fillStyle=pal.tick; ctx.font='10.5px monospace'; ctx.textAlign='right'; ctx.fillText('¥'+v+'亿', pad.left-6, y+4); });
 var step=pw/(qs-1), p1=[], p2=[];
 for(var k=0;k<qs;k++){ p1.push({x:pad.left+k*step, y:yOf(s1[k])}); p2.push({x:pad.left+k*step, y:yOf(s2[k])}); }
 ctx.save(); ctx.setLineDash([4,4]); ctx.strokeStyle=pal.tick; ctx.lineWidth=1.8; drawSmoothLine(ctx, p2); ctx.stroke(); ctx.restore();
 ctx.strokeStyle=pal.c1; ctx.lineWidth=2.6; drawSmoothLine(ctx, p1); ctx.stroke();
 p1.forEach(function(pt, i){
 ctx.fillStyle=pal.c1; ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, Math.PI*2); ctx.fill();
 ctx.fillStyle=pal.tick; ctx.font='10px monospace'; ctx.textAlign='center'; ctx.fillText('Q+'+(i+1), pt.x, h-8);
 hitRegions.chartSim.push({ idx:i, x:pt.x-step/2, y:pad.top, w:Math.max(12,step), h:ph+20, html:'<strong>Q+'+(i+1)+'</strong><br/>含AI降本: ¥'+s1[i].toFixed(1)+'亿<br/>基准: ¥'+s2[i].toFixed(1)+'亿' });
 });
 }

 function renderAllCharts() { drawCh1Chart(); drawRadarChart(); drawHorizontalBars(); drawEpsComboChart(); drawSimChart(); }
 function wireCanvasTooltip(id) {
 var c=document.getElementById(id), tip=document.getElementById('chartTooltip'); if(!c||!tip) return;
 c.addEventListener('mousemove', function(e){
 var r=c.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
 var hit=(hitRegions[id]||[]).find(function(rg){ return x>=rg.x && x<=rg.x+rg.w && y>=rg.y && y<=rg.y+rg.h; });
 if(hit){ tip.innerHTML=hit.html; tip.style.display='block'; tip.style.left=Math.min(window.innerWidth-290,e.clientX+14)+'px'; tip.style.top=Math.max(12,e.clientY-30)+'px'; }
 else tip.style.display='none';
 });
 c.addEventListener('mouseleave', function(){ tip.style.display='none'; });
 }

 function init() {
 applyTheme(safeGet(STORAGE_THEME_KEY)||'light', true);
 applyLanguage(safeGet(STORAGE_LANG_KEY)||'zh', true);
 var savedChk = safeGet(STORAGE_CHECK_KEY);
 if(savedChk){ try{ var p=JSON.parse(savedChk); if(Array.isArray(p)&&p.length===6) state.checks=p.map(Boolean); }catch(e){} }
 renderPeerTable(); renderChecklist(); updateSimulatorUI();

 document.getElementById('langZhBtn').onclick = function(){ applyLanguage('zh', false); };
 document.getElementById('langEnBtn').onclick = function(){ applyLanguage('en', false); };
 document.getElementById('appbarThemeBtn').onclick = function(){ applyTheme(state.theme==='dark'?'light':'dark', false); };
 document.getElementById('sideThemeLightBtn').onclick = function(){ applyTheme('light', false); };
 document.getElementById('sideThemeDarkBtn').onclick = function(){ applyTheme('dark', false); };
 document.getElementById('sidebarToggleBtn').onclick = function(){
 if(window.innerWidth<=1120) document.body.classList.toggle('drawer-open');
 else { document.body.classList.toggle('sidebar-collapsed'); setTimeout(renderAllCharts, 60); }
 };
 document.getElementById('drawerBackdrop').onclick = function(){ document.body.classList.remove('drawer-open'); };

 document.getElementById('sideExportBtn').onclick = function(){
 var blob = new Blob(['<!DOCTYPE html>\n'+document.documentElement.outerHTML], {type:'text/html;charset=utf-8'});
 var url = URL.createObjectURL(blob), a = document.createElement('a');
 a.href = url; a.download = 'Meituan_Q3_2026_MUI_Research_Report.html';
 document.body.appendChild(a); a.click(); a.remove();
 setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
 showToast(isEn()?'Exported standalone HTML':'已导出独立网页 Meituan_Q3_2026_MUI_Research_Report.html');
 };
 document.getElementById('sidePrintBtn').onclick = function(){ window.print(); };

 // Quick Jump
 var ji=document.getElementById('quickJumpInput'), jp=document.getElementById('quickJumpPopover');
 function renderJ(q){
 var kw=(q||'').trim().toLowerCase();
 var list=QUICK_JUMP_INDEX.filter(function(it){ return !kw||(it.title+' '+it.sub).toLowerCase().indexOf(kw)!==-1; });
 jp.innerHTML=list.map(function(it){ return '<button type="button" class="quick-jump-item" data-jump-sec="'+it.sec+'"><span class="quick-jump-item-title">'+it.title+'</span><span class="quick-jump-item-sub">'+it.sub+'</span></button>'; }).join('');
 jp.classList.add('open');
 }
 ji.onfocus=function(){ renderJ(ji.value); }; ji.oninput=function(){ renderJ(ji.value); };
 jp.onclick=function(e){ var b=e.target.closest('[data-jump-sec]'); if(!b)return; document.getElementById(b.getAttribute('data-jump-sec')).scrollIntoView({behavior:'smooth'}); jp.classList.remove('open'); };
 document.addEventListener('click', function(e){ if(!e.target.closest('.quick-search-wrap')) jp.classList.remove('open'); });
 document.addEventListener('keydown', function(e){ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); ji.focus(); } });

 document.querySelectorAll('[data-ch1-view]').forEach(function(b){
 b.onclick=function(){ state.ch1View=b.getAttribute('data-ch1-view'); document.getElementById('ch1TabA').classList.toggle('active',state.ch1View==='viewA'); document.getElementById('ch1TabB').classList.toggle('active',state.ch1View==='viewB'); drawCh1Chart(); };
 });
 document.querySelectorAll('[data-collapse-target]').forEach(function(b){
 b.onclick=function(){ document.getElementById(b.getAttribute('data-collapse-target')).classList.toggle('open'); };
 });
 document.querySelectorAll('[data-pillar]').forEach(function(b){
 b.onclick=function(){
 state.activePillar=parseInt(b.getAttribute('data-pillar'),10)||0;
 document.querySelectorAll('[data-pillar]').forEach(function(x,idx){ x.classList.toggle('active', idx===state.activePillar); });
 document.getElementById('pillarFocusNote').innerHTML='<div>'+(isEn()?PILLAR_NOTES_EN:PILLAR_NOTES)[state.activePillar]+'</div>';
 drawRadarChart();
 };
 });
 document.querySelectorAll('[data-radar-key]').forEach(function(b){
 b.onclick=function(){ var k=b.getAttribute('data-radar-key'); state.radarSeries[k]=!state.radarSeries[k]; b.classList.toggle('muted',!state.radarSeries[k]); drawRadarChart(); };
 });
 document.getElementById('peerSearchInput').oninput = function(){ state.peerQuery=this.value; renderPeerTable(); };
 document.querySelectorAll('[data-peer-filter]').forEach(function(b){
 b.onclick=function(){ state.peerFilter=b.getAttribute('data-peer-filter'); document.querySelectorAll('[data-peer-filter]').forEach(function(x){ x.classList.toggle('active',x===b); }); renderPeerTable(); };
 });

 var ps=document.getElementById('simPrincipalSlider'), ys=document.getElementById('simYearsSlider'), cs=document.getElementById('simCagrSlider'), dt=document.getElementById('simDripToggle');
 ps.oninput=function(){ state.sim.principal=parseInt(this.value,10); state.sim.preset=''; updateSimulatorUI(); };
 ys.oninput=function(){ state.sim.years=parseInt(this.value,10); state.sim.preset=''; updateSimulatorUI(); };
 cs.oninput=function(){ state.sim.priceCagr=parseFloat(this.value); state.sim.preset=''; updateSimulatorUI(); };
 dt.onchange=function(){ state.sim.drip=!!this.checked; updateSimulatorUI(); };
 document.querySelectorAll('[data-preset]').forEach(function(b){
 b.onclick=function(){ var cfg=PRESETS[b.getAttribute('data-preset')]; state.sim.principal=cfg.principal; state.sim.years=cfg.years; state.sim.priceCagr=cfg.priceCagr; state.sim.drip=cfg.drip; state.sim.preset=b.getAttribute('data-preset'); ps.value=cfg.principal; ys.value=cfg.years; cs.value=cfg.priceCagr; dt.checked=cfg.drip; updateSimulatorUI(); };
 });

 document.getElementById('checklistContainer').onchange = function(e){
 var inp=e.target.closest('[data-check-input]'); if(!inp) return;
 state.checks[parseInt(inp.getAttribute('data-check-input'),10)]=!!inp.checked;
 safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist();
 };
 document.getElementById('checkAllBtn').onclick = function(){ state.checks=[true,true,true,true,true,true]; safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist(); };
 document.getElementById('resetCheckBtn').onclick = function(){ state.checks=[true,true,true,false,false,false]; safeSet(STORAGE_CHECK_KEY, JSON.stringify(state.checks)); renderChecklist(); };

 window.addEventListener('scroll', function(){
 var d=document.documentElement, st=window.scrollY||d.scrollTop||0, mx=Math.max(1,d.scrollHeight-window.innerHeight);
 document.getElementById('readingProgressBar').style.width=Math.min(100,(st/mx)*100)+'%';
 var secs=document.querySelectorAll('main > section[id], main > footer[id]'), links=document.querySelectorAll('#tocNavList .mui-nav-link'), cur='sec-00';
 secs.forEach(function(s){ if(s.getBoundingClientRect().top<=130) cur=s.id; });
 links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('data-sec')===cur); });
 }, { passive: true });

 document.querySelectorAll('[data-ch1-series]').forEach(function(b){
 b.onclick=function(){ var k=b.getAttribute('data-ch1-series'); state.ch1Series[k]=!state.ch1Series[k]; if(!state.ch1Series.s1&&!state.ch1Series.s2) state.ch1Series[k]=true; b.classList.toggle('muted',!state.ch1Series[k]); drawCh1Chart(); };
 });
 document.querySelectorAll('[data-eps-series]').forEach(function(b){
 b.onclick=function(){ var k=b.getAttribute('data-eps-series'); state.epsSeries[k]=!state.epsSeries[k]; if(!state.epsSeries.eps&&!state.epsSeries.oci) state.epsSeries[k]=true; b.classList.toggle('muted',!state.epsSeries[k]); drawEpsComboChart(); };
 });
 ['chartCh1','chartRadar','chartBars','chartEps','chartSim'].forEach(wireCanvasTooltip);
 window.addEventListener('resize', renderAllCharts);
 }
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
 })();
 