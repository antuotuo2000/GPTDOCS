# 数据中心

首次访问默认夜间模式；已保存的深浅色选择继续生效，头部按钮可随时切换。

保留压缩包中原首页与 151 份研报的设计和交互。页面通过 Vite 提供，无 Python、后端或自动化任务。

```sh
pnpm install
pnpm dev
pnpm build
pnpm build:docs
pnpm preview
```

## 结构

- `index.html`：原版首页入口；保持蓝图网格、玻璃头部、发光边框、目录及搜索布局。
- `public/original/`：原页面树，报告之间的相对链接保持原有结构。
- `public/original/_shared/`：按内容去重的 CSS 和 JavaScript，共减少约 6.9 MB 重复代码。
- `src/theme/index.ts`：保留已配置的 MUI 主题，供后续组件化使用。

当前展示直接使用原 HTML/CSS/JS，不用通用 React 阅读模板替代原设计。React、TypeScript、MUI 依赖保留；原页面尚未重写为 React 组件。

`vite.config.ts` 将原页面目录作为静态资源根目录，因此研报地址保持 `/TTWO/Company/…html` 等原结构。打包后 `dist/` 可部署到静态服务器。

## GitHub 提交与静态页面

源码、配置和依赖锁文件放在仓库根目录，构建好的完整静态页面放在 `docs/`。执行 `pnpm build:docs` 可重新生成 `docs/`；无需提交 `node_modules/` 或 `dist/`。

页面使用相对资源地址，支持 GitHub Pages 的 `/GPTDOCS/` 子路径。在仓库 Settings → Pages 中选择分支及 `/docs` 目录即可部署。`docs/.nojekyll` 用于确保 `_shared/` 资源正常发布。

也可直接双击 `docs/index.html` 或研报 HTML 本地阅读。Adobe 和 Capcom 的产品数据通过普通脚本加载，无需 HTTP 服务，避免 `file://` 下读取 JSON 被浏览器拦截。

## 本次验证环境

Codex 内置 Node 有原生模块签名限制，本次开发服务使用临时 Node 副本：

```sh
PATH="/tmp/miui-node-bin:$PATH" pnpm dev --host 127.0.0.1
```

普通 Node.js 24 环境直接使用 `pnpm dev`。

## 菜单精简

所有研报共用 `_shared/navigation.js` 处理头部开关、侧栏折叠和移动抽屉。已删除侧栏“阅读与导出工具”整块面板，以及导出、打印和紧凑视图按钮；头部保留搜索、语言、主题和菜单开关。移除控件时同步清理其事件绑定，正文图表等研究内容保持原设计。

详情页头部固定在屏幕顶部，已隐藏字母图标；手机端隐藏头部搜索，保持紧凑单行，PC 端保留全站文章搜索。`_shared/article-search.js` 供首页和详情页复用文章匹配与排序，查询覆盖标题、股票代码、章节、摘要和全文。详情页可直接打开搜索结果，也可跳到首页查看完整结果；支持方向键、Enter、Escape 和 ⌘/Ctrl+K，本地 HTML 无需服务器。

## 联动研报的统一设计

151 份研报统一使用 `_shared/report-design.css`，以 `DYP/Company/DuanYongping.html#ip=AAPL` 的原版设计为基准。该文件复用基准页的配色、背景、头部、左侧菜单、卡片、按钮及响应式样式。数据中心首页保持原设计。

## 侧栏与切换卡片精简

已删除 33 页中与顶部切换台重复的侧栏产品、公司或高管列表。左侧保留报告摘要、跨页面导航及章节目录；顶部切换台保留。切换卡片保持紧凑高度，按最长标题计算等宽列并对齐图标和文字，大字完整显示；下方摘要保留一行，超过大字宽度的部分隐藏。另修复 Lennar、Disney 高管子页面加载时丢失 URL 中所选高管的问题。

首页移动端底栏使用 App Store 风格的 Liquid Glass 胶囊与独立圆形搜索入口，保留五个原有栏目；支持浅色、深色、安全区和减少动态效果偏好。

首页主要卡片统一使用 `_shared/home-glass.css` 的透明玻璃样式；首页与详情页头部共用 `_shared/transparent-chrome.css`，详情页侧栏也保留透明玻璃与选中标记。PDD、Arm 两篇研报在首页推荐区和列表中使用独立颜色突出。

详情页正文容器统一使用 `_shared/report-glass.css` 的毛玻璃样式，以半透明底色和模糊抑制文字背后的纹理，主要内容面板叠加原有细网格；侧栏卡片与正文共用磨砂玻璃底色、24px 模糊、田字格与立体阴影，卡片间隔为 16px；侧栏外层透明且不模糊，使各块之间露出页面背景。分类筛选行保留透明布局，仅圆角标签组带底色。首页和详情页共用 `_shared/page-background.css`，恢复最初配色与 36px 小格子背景。手机通过 `_shared/fixed-backdrop.css` 把背景固定在视口，内容单独滚动。首页卡片的大纲与阅读按钮使用透明玻璃样式，AN Logo 保留原有蓝紫渐变。

## Adobe 产品与服务分析

新增 `/ADBE/Company/adobe_16_products_services.html`，首页搜索 Adobe 或 ADBE 可进入。包含 16 个研究工作流、8 个章节、5 张交互图表、来源链接及客户工时价值沙盘。

- 样式：沿用共用研报设计，并通过 `_shared/adobe-report.css` 增加 Adobe 产品配色。
- 数据：`_shared/adobe-products.js`。内容以 2026-11-23 为分析时点，财务依据为 Adobe FY2026 Q3 官方披露，产品更新纳入 MAX 2026 官方公告。
- 引擎：Adobe 与 Capcom 共用 `_shared/portfolio-engine.js`；各自加载独立研究数据。
- 财务边界：16 个模块是研究分组，非 Adobe 报告分部；不分摊未披露的单品收入。集团指标、定性评分、产品能力与假设明确区分。
- 沙盘：席位 × 每月节省工时 × 12 × 每工时成本 × 年数；可选 10% 采用率增量。订阅成本是假设，工时价值不等于现金节省，也不是 Adobe 营收或股票回报预测。

首页使用一个显示模式按钮，按宽屏、手机窄屏（430px）、iPadMini（756px）循环切换。选择保存到本地，刷新后仍沿用；详情页自动跟随首页选择，并同步其他已打开页面的模式变化，详情页不显示切换按钮；窄屏预览使用真实 iframe 视口，让 CSS 媒体查询和交互同时适配。分类筛选组随容器换行。全站使用 `touch-action: manipulation` 避免连续点击放大，同时保留双指缩放。

详情页浅色侧栏使用更深的辅助文字，移动端遮罩仅覆盖侧栏旁的正文，避免透明侧栏被压灰。移动端双击除 `touch-action` 外增加普通内容的双击兼容处理，保留按钮、编辑、滚动与双指缩放。


## 勃肯新增四篇研报

导入用户提供的四份 HTML，沿用原有内容、来源与交互，接入首页目录及全文检索：

- `BIRK/Company/birkenstock_business_model.html`：商业模式架构拆解。
- `BIRK/Company/birkenstock_growth_2026_2032.html`：2026–2032 战略与增长曲线。
- `BIRK/CorporateCulture/birkenstock_culture_organization.html`：企业文化与组织架构。
- `BIRK/CorporateCulture/birkenstock_culture_operating_system.html`：企业文化与组织操作系统。

四篇保留各自图表、筛选和模拟器；使用共享研报设计、透明头部与侧栏、文章搜索及设备模式。`_shared/company-report-ui.js` 复用勃肯六篇页面的前后篇、分类和文章导航；原有产品、高管页面同步接入。移除导出、打印、侧栏主题及密度等已弃用工具。

`_shared/report-tables.css` 统一表头、间距、数字对齐、标杆行、悬停与滚动区域；表格适配及语言切换由共用适配器处理。窄屏局部横向滚动，长表头在滚动容器内固定，保留原有数据与筛选。

## 相邻内容面板的接缝

全部详情页共用 `_shared/report-surfaces.css`：布局容器不叠加玻璃背景，嵌套面板不重复模糊；田字格通过共享导航脚本按文档坐标对齐，重排和内容切换后更新，避免相邻卡片纹理起点不一致。保留外层卡片的阴影与透明玻璃效果。侧栏卡片也使用正文的背景和纹理，并纳入网格对齐；外侧栏不铺连续玻璃背景。


## Roblox 新增四篇研报

导入用户提供的四份 HTML，保留原文内容与交互，统一使用现有研报主题、正文式侧栏卡片、表格样式和设备模式：

- `RBLX/Company/roblox_business_model.html`：商业模式与现金流飞轮。
- `RBLX/Company/roblox_growth_2026_2032.html`：2026–2032 战略与增长曲线。
- `RBLX/CorporateCulture/roblox_culture_organization.html`：企业文化与组织架构。
- `RBLX/CorporateCulture/roblox_culture_operating_system.html`：Builder 文化与组织操作系统。

`_shared/company-report-ui.js` 统一处理公司文章导航、分类、表格适配和偏好同步，勃肯六篇与 Roblox 八篇共用；`_shared/imported-report-ui.css` 为导入页面提供响应式布局与玻璃面板适配。四篇已加入首页目录、分类和全文索引，默认夜间模式，详情页跟随首页设备模式且不出现切换按钮。

## 七家公司新增研报

导入 Meta、Netflix、Microsoft、Rocket Lab、Amazon、Anthropic、Alphabet 各四份用户 HTML，共 28 页。每家公司新增商业模式、2026–2032 战略增长、企业文化与组织架构、组织操作系统四篇，分别放在公司的 `Company/` 与 `CorporateCulture/` 下。

保留原文和图表、标签、模拟器交互，复用共享导航、检索、主题、设备预览、毛玻璃网格面板与表格组件；兼容 Rocket Lab 与 Amazon 的不同旧模板。七家公司的原有文章也接入同一公司导航。目录更新至 188 篇研报，静态成品在 `docs/`，发布包在 `releases/GPTDOCS.zip`。

ARM、On Holding、SpaceX、Tesla、Circle 各新增同样四类研报，共 20 页，同步接入原有公司目录及全文搜索；全部新增页面合计 48 页，目录总数更新为 208 篇。清理导入模板中已删除阅读工具的事件，保证标签、图表和模拟器继续初始化。
