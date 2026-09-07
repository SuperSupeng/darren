# Darren Su — Personal Site

Darren Su 的中英双语个人网站，记录项目、产品、写作、社区与生活经历，并为合作提供清楚的联系入口。3D 工作室负责视觉与交互，正文、导航和联系信息独立可读。

正式站：[www.darren-su.com](https://www.darren-su.com)

## 本地开发

使用 Node.js 24 和 npm 10.9.2。仓库通过 `.nvmrc`、`package.json` 和锁文件固定运行环境与依赖。

```sh
nvm use
npm ci
npm run dev
```

访问终端显示的地址。需要指定端口时，例如：

```sh
npm run dev -- --hostname 127.0.0.1 --port 3101
```

## 检查与发布

```sh
npm run check
```

完整检查包含代码规范、类型、测试、字体覆盖、生产构建及运行后的抓取检查；CI 执行相同命令。抓取检查使用临时本地服务，结束后自动关闭。它不能代替交互与视觉走查，具体方法见 [验证与发布](docs/verification.md)。

本项目使用现有 Git / Vercel 集成。推送到 `main` 会触发正式发布；检查完成后再发布，发布后核对正式域名。开发与整理工作使用独立分支。

## 从哪里修改

| 内容 | 位置 |
| --- | --- |
| 页面与中英路由 | `src/app/[locale]/`、`src/i18n/` |
| 域名、联系邮箱、社交链接与导航 | `src/lib/site-config.ts` |
| 3D 房间、镜头与首页 | `src/components/studio/` |
| 共用界面、动效与内页样式 | `src/components/spatial/` |
| 全局配色、基础样式与通用控件 | `src/styles/` |
| 案例、职责、成果与合作资料 | `src/lib/portfolio/` |
| 个人介绍与活动经历 | `src/lib/about.ts`、`src/lib/experience-archive.ts` |
| 产品、页面文案与首页精选文章 | `src/lib/site-content/`、`src/lib/studio-content.ts` |
| 中英文文章 | `content/blog/{zh,en}/` |
| 文章与项目图片 | `public/blog/`、`public/images/work/` |
| 界面短标签 | `messages/` |
| 内容、路由与交互逻辑检查 | `tests/`、`scripts/` |

组件负责展示，公开事实在共享内容层维护。新增文章、修改案例或调整首页精选前，先阅读 [内容维护规范](docs/content-strategy.md)。

## 维护文档

- [架构与模块边界](docs/architecture.md)：数据流、服务器与浏览器职责、3D 回退、SEO 与内容导出。
- [验证与发布](docs/verification.md)：命令、浏览器走查、发布和回退流程。
- [内容维护规范](docs/content-strategy.md)：文案、文章日期、署名、图片和双语规则。
- [案例证据](docs/case-evidence.md)：公开资料能支持什么，哪些事实仍需要补充来源。
- [字体维护](docs/site-fonts.md)：字形覆盖、重新生成、来源与许可。

仓库只保留公开内容和持续维护需要的文档。未采用的稿件、资料摘录、审阅记录与一次性测量报告在项目外归档；不要作为站点内容提交。`AGENTS.md` 是项目协作规则入口，`CLAUDE.md` 引用同一份规则。
