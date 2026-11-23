# 数据中心

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

## 联动研报的统一设计

151 份研报统一使用 `_shared/report-design.css`，以 `DYP/Company/DuanYongping.html#ip=AAPL` 的原版设计为基准。该文件复用基准页的配色、背景、头部、左侧菜单、卡片、按钮及响应式样式。数据中心首页保持原设计。

## 侧栏与切换卡片精简

已删除 33 页中与顶部切换台重复的侧栏产品、公司或高管列表。左侧保留报告摘要、跨页面导航及章节目录；顶部切换台保留。切换卡片保持紧凑高度，按最长标题计算等宽列并对齐图标和文字，大字完整显示；下方摘要保留一行，超过大字宽度的部分隐藏。另修复 Lennar、Disney 高管子页面加载时丢失 URL 中所选高管的问题。

首页移动端底栏使用 App Store 风格的 Liquid Glass 胶囊与独立圆形搜索入口，保留五个原有栏目；支持浅色、深色、安全区和减少动态效果偏好。

## Adobe 产品与服务分析

新增 `/ADBE/Company/adobe_16_products_services.html`，首页搜索 Adobe 或 ADBE 可进入。包含 16 个研究工作流、8 个章节、5 张交互图表、来源链接及客户工时价值沙盘。

- 样式：沿用共用研报设计，并通过 `_shared/adobe-report.css` 增加 Adobe 产品配色。
- 数据：`_shared/adobe-products.js`。内容以 2026-11-23 为分析时点，财务依据为 Adobe FY2026 Q3 官方披露，产品更新纳入 MAX 2026 官方公告。
- 引擎：Adobe 与 Capcom 共用 `_shared/portfolio-engine.js`；各自加载独立研究数据。
- 财务边界：16 个模块是研究分组，非 Adobe 报告分部；不分摊未披露的单品收入。集团指标、定性评分、产品能力与假设明确区分。
- 沙盘：席位 × 每月节省工时 × 12 × 每工时成本 × 年数；可选 10% 采用率增量。订阅成本是假设，工时价值不等于现金节省，也不是 Adobe 营收或股票回报预测。
