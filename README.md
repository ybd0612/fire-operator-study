# 消防设施操作员（四级/中级工）学习站

面向**零基础学员**的「消防设施操作员（国家职业资格 四级 / 中级工）」线下常规考核（理论考试 + 技能操作考核）系统学习站点。

- 内容覆盖：理论考试全部知识板块 + 技能操作考核全部职业功能，循序渐进、零基础友好。
- 技术栈：[VitePress](https://vitepress.dev/)（纯静态站点，无需后端）。
- 部署：GitHub Pages（GitHub Actions 自动构建部署，见 `.github/workflows/deploy.yml`）。

## 目录结构

```
fire-operator-site/
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署工作流
├── .vitepress/config.js          # 站点导航与侧边栏配置
├── index.md                      # 首页（学习路径 / 模块总览）
├── exam-guide.md                 # 考核说明（报名、考试边界、合格线、流程）
├── sources.md                    # 权威依据、版本边界与链接
├── theory/                       # 理论考试知识点（10 个模块）
│   ├── 01-professional-ethics.md
│   ├── 02-fire-service-overview.md
│   ├── 03-combustion-fire.md
│   ├── 04-building-fire.md
│   ├── 05-electrical-fire.md
│   ├── 06-fire-facilities.md
│   ├── 07-initial-fire.md
│   ├── 08-computer.md
│   ├── 09-laws-standards.md
│   └── 10-safety-health.md
└── skill/                        # 技能操作考核（5 个职业功能）
    ├── 01-monitoring.md
    ├── 02-operation.md
    ├── 03-maintenance.md
    ├── 04-repair.md
    └── 05-detection.md
```

## 本地预览

```bash
npm install
npm run dev      # 本地开发服务器，默认 http://localhost:5173
```

## 构建

```bash
npm run build    # 输出到 .vitepress/dist
npm run preview  # 本地预览构建产物
```

## 部署到 GitHub Pages

1. 将本目录内容推送至 GitHub 仓库（建议以本目录为仓库根）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择
   **GitHub Actions**（工作流已包含 `Deploy to GitHub Pages`）。
3. 推送 `main` 分支即自动构建并发布。

### 关于 base 路径（重要）

- 若仓库为 **用户/组织页**（`https://<user>.github.io/`）：`base` 保持 `/` 即可。
- 若仓库为 **项目页**（`https://<user>.github.io/<repo>/`）：请修改 `.vitepress/config.js`
  中的 `base: '/'` 为 `base: '/<repo>/'`。

## 内容说明

知识点体系以《消防设施操作员国家职业技能标准（2019年版）》中级/四级「工作要求」为结构基线，并参考消防职业技能鉴定考试网、鉴定站公告和现行国家标准整理。固定结论、版本边界与链接见 `sources.md`。具体考核以报考地鉴定站最新公告、准考证和现场评分表为准；本站不把地方公告中的题量、时长或评分细则外推为全国统一规则。
