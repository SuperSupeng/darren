# 📋 Darren.Su 个人网站 - TODO

> 最后更新：2026-01-22

## 📊 项目进度概览

| 模块 | 状态 | 备注 |
|------|------|------|
| 首页 | ✅ 完成 | Hero、Now Building、Build Direction、Signals、Explore、FooterCta |
| Blog | ✅ 完成 | 列表页 + 详情页 + Markdown 渲染 |
| Co-build | ✅ 完成 | 合作页面 |
| 导航 & 页脚 | ✅ 完成 | 响应式设计 |
| i18n | ✅ 框架完成 | 7种语言支持，中英文翻译完成 |
| 语言选择器 | ✅ 完成 | 搜索 + 下拉菜单 |
| Build 页面 | ⏳ 待开发 | 作品展示 |
| Community 页面 | ⏳ 待开发 | 社区介绍 |
| Impact 页面 | ⏳ 待开发 | 公益项目 |
| Global 页面 | ⏳ 待开发 | 全球节点 |
| About 页面 | ⏳ 待开发 | 关于我 |

---

## 🎯 高优先级

### 页面开发

- [ ] **Build 作品页** - 展示项目和作品
  - 项目卡片组件
  - 项目详情页（可选）
  - 标签筛选
  - 参考：`docs/doc03-build作品页.md`

- [ ] **About 关于页** - 个人介绍
  - 个人简介
  - 技能 / 经历
  - 联系方式
  - 参考：`docs/doc07-about.md`

- [ ] **Community 社区页** - 社区介绍
  - 参与的社区
  - 活动 / 工作坊
  - 参考：`docs/doc04-community.md`

- [ ] **Impact 公益页** - 公益项目
  - 公益项目展示
  - 参考：`docs/doc05-impact.md`

- [ ] **Global 全球页** - 全球节点
  - 地图或城市展示
  - 参考：`docs/doc06-global.md`

### 功能完善

- [ ] **邮件订阅** - 对接邮件服务
  - 选择服务：Resend / Mailchimp / ConvertKit
  - API 路由实现
  - 成功/失败提示

---

## 📝 中优先级

### 内容补充

- [ ] **Blog 文章** - 写更多博客内容
  - 项目复盘
  - 技术笔记
  - 思考与反思

- [ ] **多语言翻译** - 补充其他语言
  - [ ] 日语 (ja)
  - [ ] 韩语 (ko)
  - [ ] 西班牙语 (es)
  - [ ] 法语 (fr)
  - [ ] 德语 (de)

### SEO 优化

- [ ] **Sitemap** - 生成站点地图
- [ ] **robots.txt** - 爬虫配置
- [ ] **Open Graph** - 社交分享卡片
- [ ] **Meta 标签** - 各页面 SEO 优化
- [ ] **Structured Data** - JSON-LD 结构化数据

### 性能优化

- [ ] **图片优化** - 使用 next/image
- [ ] **字体优化** - 字体子集化
- [ ] **代码分割** - 动态导入
- [ ] **缓存策略** - 静态资源缓存

---

## 🔧 低优先级

### 功能增强

- [ ] **主题切换** - 深色/浅色模式
- [ ] **搜索功能** - Blog 文章搜索
- [ ] **RSS 订阅** - Blog RSS 输出
- [ ] **评论系统** - Giscus / Utterances
- [ ] **阅读进度** - Blog 阅读进度条
- [ ] **代码高亮** - 使用 Shiki / Prism

### 分析 & 监控

- [ ] **网站分析** - Google Analytics / Plausible / Umami
- [ ] **错误监控** - Sentry
- [ ] **性能监控** - Web Vitals

### 部署 & 运维

- [ ] **部署到 Vercel** - 生产环境部署
- [ ] **域名配置** - 绑定自定义域名
- [ ] **SSL 证书** - HTTPS 配置
- [ ] **CI/CD** - 自动化部署流程

---

## 💡 未来想法

- [ ] **数字分身** - AI 聊天机器人
- [ ] **作品互动** - 可交互的项目 Demo
- [ ] **时间线** - 个人经历时间线
- [ ] **成就系统** - 游戏化元素
- [ ] **访客留言板** - 让访客留言
- [ ] **暗黑模式** - 更极客的暗黑主题
- [ ] **终端模式** - 可选的终端风格界面

---

## 📁 项目结构

```
darren/
├── content/
│   └── blog/           # Blog 文章 (Markdown)
├── docs/               # 文档
├── messages/           # i18n 翻译文件
│   ├── en.json
│   ├── zh.json
│   ├── ja.json
│   ├── ko.json
│   ├── es.json
│   ├── fr.json
│   └── de.json
├── public/             # 静态资源
└── src/
    ├── app/
    │   └── [locale]/   # 多语言路由
    │       ├── blog/
    │       ├── co-build/
    │       └── page.tsx
    ├── components/
    │   ├── home/       # 首页组件
    │   ├── Footer.tsx
    │   ├── LanguageSwitcher.tsx
    │   └── Nav.tsx
    ├── i18n/           # i18n 配置
    └── lib/            # 工具函数
```

---

## 🚀 快速开始

```bash
# 开发
npm run dev

# 构建
npm run build

# 启动生产服务
npm start
```

---

## 📌 注意事项

1. **翻译文件格式**：新增语言需要在 `messages/` 目录创建对应的 JSON 文件
2. **Blog 文章格式**：使用 Markdown，支持 frontmatter（title, date, tags 等）
3. **默认语言**：已改为英文 (en)
4. **样式系统**：使用 Tailwind CSS，自定义颜色在 `globals.css` 中定义

---

*Keep shipping! 🚀*
