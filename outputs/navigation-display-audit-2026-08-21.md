# 站点文件展示逻辑全面审查

> 日期：2026-08-21
> 范围：VitePress 展示配置、顶部导航、侧边栏路径匹配、Markdown 入口、训练页面构建输出和 GitHub Pages 部署方式。
> 本轮先审查，不修改站点配置。

## 一、结论

当前站点存在两个不同层面的真实问题：

1. **侧边栏消失是配置逻辑导致的，不是页面内容丢失。**
   `.vitepress/config.js` 使用路径侧边栏映射：`/theory/`、`/skill/`、`/`。VitePress 进入理论或技能页面后，会优先使用更具体的路径配置，整套 `homeSidebar` 被替换，因此左侧只显示对应模块。
2. **`training-skill` 源文件和构建结果都存在。**
   根目录存在 `training-skill.md`；重新执行 VitePress 构建成功，并生成 `.vitepress/dist/training-skill.html`。因此 404 更可能是部署 URL/静态服务器路径问题，而不是文件不存在。

## 二、实际核验结果

### 1. 页面和链接

- 课程 Markdown 页面（排除 `node_modules`、`.vitepress`、`outputs`、`.workbuddy`）：33 个。
- Markdown 中绝对站内链接：235 个。
- 缺失目标：0 个。
- `training-skill.md`：存在。
- `training-theory.md`：存在。
- `training.md`：存在。
- 训练页互链均使用 `/training-skill`、`/training-theory` 这类 clean URL。

### 2. 构建结果

使用当前项目依赖重新构建：

- VitePress 1.6.4 构建成功。
- 构建输出包含：
  - `.vitepress/dist/training.html`
  - `.vitepress/dist/training-theory.html`
  - `.vitepress/dist/training-skill.html`
  - `.vitepress/dist/training-labels.html`
  - `.vitepress/dist/404.html`
- 构建生成顶层 HTML 页面共 64 个。

### 3. 部署配置风险

当前配置：

```js
cleanUrls: true
```

部署工作流把 `.vitepress/dist` 直接上传到 GitHub Pages。构建产物是 `training-skill.html`，而不是 `training-skill/index.html`。

这会产生一个典型风险：

- 站内 SPA 导航可能能打开 `/training-skill`；
- 用户直接刷新或从外部打开 `https://域名/training-skill` 时，GitHub Pages 可能找不到对应目录，返回 404；
- 实际文件 URL 是 `/training-skill.html`。

因此“点击 training-skill 404”需要区分：是站内客户端跳转，还是刷新/直接访问后的静态服务器 404。当前构建结果证明源页面没有丢失。

## 三、展示逻辑问题清单

### P0：侧边栏按路径替换，造成栏目消失

当前映射：

```js
sidebar: {
  '/theory/': theorySidebar,
  '/skill/': skillSidebar,
  '/': homeSidebar
}
```

进入 `/theory/...` 后，左侧不再使用 `homeSidebar`；进入 `/skill/...` 后同理。`theorySidebar` 和 `skillSidebar` 虽然补了“学习导航”，但没有包含：

- 考核说明
- 权威依据与版本边界
- 综合学习课
- 标准逐条映射
- 理论训练
- 技能训练
- 题源与标记说明

所以用户感受到的“其他栏目消失”是正确反馈。

### P1：理论和技能页面没有统一的全站目录

首页、理论页、技能页各自看到的左侧菜单不同；用户无法把左侧理解成一份稳定的站点目录，只能把它理解成当前模块目录。

### P1：训练页面落在 `/` 侧边栏体系中

`/training`、`/training-theory`、`/training-skill`、`/training-labels` 都不匹配 `/theory/` 或 `/skill/`，因此使用 `homeSidebar`。但进入训练页后，理论/技能目录又消失，用户无法从训练页直接回到对应理论章或技能项目卡。

### P1：技能训练 404 更像部署路径兼容问题

源文件、配置链接和构建 HTML 均存在。当前 `cleanUrls: true` 与 GitHub Pages 直接静态托管组合存在直链/刷新风险，应优先核验实际访问 URL：

- `/training-skill`
- `/training-skill.html`

如果 `.html` 能打开而无扩展名 404，根因就是部署路径格式不兼容。

### P2：顶栏与左栏仍是两套入口体系

顶部当前为：

- 首页
- 考核说明
- 零基础导学
- 只读训练
- 核心术语
- 理论课程
- 技能路线

侧边栏还额外承载来源、综合课、标准映射和题源说明。用户从顶栏进入深层页后，能看到的左栏又会变化，造成同一站点多个目录版本。

### P2：`outputs/` 被构建为公开页面

当前构建输出包含 `outputs` 下的审查概览页面。它们属于工作记录/交付记录，不属于普通学习内容，却会进入站点页面和全文搜索，增加用户看到内部审查文档的概率。若不是有意公开，应在 VitePress 配置或目录组织层面排除。

## 四、推荐修复顺序

### 第一优先级：统一侧边栏

不要继续维护 `homeSidebar`、`theorySidebar`、`skillSidebar` 三套互相替换的目录。建议建立一套 `siteSidebar`，所有页面统一使用，内部按以下顺序分组：

1. 开始学习：首页、考核说明、零基础导学、核心术语表、技能考核路线图、综合学习课
2. 只读训练：训练总览、理论训练、技能训练、题源与标记说明
3. 理论课程：十章理论
4. 技能课程：五项职业功能、三类设备项目卡
5. 参考与治理：权威依据、标准逐条映射、知识覆盖矩阵（可折叠）

这样点击任意栏目后，左侧其他栏目不会消失，只会通过折叠控制信息密度。

### 第二优先级：处理 clean URL 兼容性

如果部署目标继续使用 GitHub Pages，优先验证 `/training-skill.html` 与 `/training-skill` 的实际表现。若确认无扩展名直链 404，建议将 `cleanUrls` 改为 `false`，让站内生成链接与静态文件名一致；或者改用目录式输出/支持 rewrite 的托管方式。

### 第三优先级：隔离工作记录页面

如果 `outputs/` 只是内部交付资料，不应作为公开课程页面参与构建。建议将其移出站点源目录，或配置为不参与页面生成；处理前需确认是否需要公开。

### 第四优先级：补齐训练与课程的双向入口

统一侧边栏后，再补页面内“上一层/下一层”入口：

- 理论训练 → 对应理论章节
- 技能训练 → 对应技能功能和设备项目卡
- 设备项目卡 → 对应技能训练和术语表
- 综合学习课 → 理论、技能、训练三类入口

## 五、尚未做的事情

- 未使用浏览器验证已部署域名的真实响应，因此无法在本轮确定线上 `/training-skill` 404 是无扩展名 URL、缓存、部署版本还是其他服务器行为。
- 未修改 `.vitepress/config.js`，等待先确认是否采用“一套全站统一侧边栏”和 `cleanUrls` 调整。
