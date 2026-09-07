# Darren Su — Personal Site

这是 Darren Su 的中英双语个人网站，用来整理公开项目、产品实验、服务方向与长期写作。中文和英文面向不同读者，不要求逐字互译；新增内容前请先阅读 [内容策略](docs/content-strategy.md)。

线上地址：[www.darren-su.com](https://www.darren-su.com)

全站采用 3D 工作室设计，保留可直接读取的正文、案例与联系入口。交互与静态回退说明见 [3D 版本说明](docs/studio-preview.md)，修改文案后请执行 [本地字体覆盖检查](docs/site-fonts.md)。

## 技术栈

- Next.js 16（App Router）与 React 19
- TypeScript、Tailwind CSS
- `next-intl` 双语路由
- Vercel Analytics

## 本地运行

请使用 Node.js 24 LTS 与 npm。运行 `nvm use` 可直接切换到仓库指定的版本。

```bash
npm ci
npm run dev
```

开发服务启动后，访问终端显示的本地地址。日常提交前运行完整检查：

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## 目录

```text
content/blog/{en,zh}/       中英文文章
public/blog/                文章图片
public/images/work/         项目图片
src/app/[locale]/           页面与双语路由
src/components/             页面组件
src/lib/                    内容、SEO 与数据读取逻辑
messages/                   界面翻译
tests/                      离线内容完整性检查
```

## 添加文章

在 `content/blog/en/` 或 `content/blog/zh/` 新建 Markdown 文件，文件名就是文章地址中的 slug。每篇文章必须包含以下 frontmatter：

```markdown
---
title: 文章标题
date: 2026-09-04
description: 用于列表页和搜索摘要的一句话介绍。
tags: [AI, Field Notes]
---
```

图片放在 `public/blog/<主题>/`，Markdown 中使用以 `/` 开头的站内路径，例如：

```markdown
![准确描述图片内容的替代文字](/blog/example/cover.webp)
```

如果文章需要自定义列表封面，同时在 `src/lib/blog.ts` 的 `postImages` 中登记图片尺寸。中文与英文可以使用相同 slug，但应分别服务各自的读者。

## 添加项目

项目资料集中维护在 `src/lib/portfolio.ts`，图片放在 `public/images/work/`。新增或替换图片时保留明确的替代文字，并填写真实的角色、范围和结果；不要发布仍是占位内容的案例。

## 部署

站点按标准 Next.js 项目部署到 Vercel。发布前先完成上述全部检查，再通过项目已有的 Vercel 配置发布；密钥和环境变量只保存在 Vercel 项目设置或本地 `.env.local`，不要提交进仓库。本仓库的持续检查会在提交和拉取请求上执行同一套质量命令。
