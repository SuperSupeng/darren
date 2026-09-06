# SEO 与 AI 搜索检查

检查日期：2026-09-06。范围为 `codex/3d-studio-preview` 实验分支及本地正式构建；本轮未部署。

## 判断

网站已经有完整的 SEO 基础。3D 场景外的身份介绍、合作说明、案例、文章和联系链接都包含在服务器返回的 HTML 中，不依赖 WebGL 或执行 JavaScript 才能读取。34 个公开页面由中英文各 6 个主页面、8 个案例和 3 篇文章组成。

当前更值得完善的是身份关系与证据：让检索系统准确区分 Darren 本人的工作、组织身份、具体合作方式和公开实践记录。不能仅凭结构化数据判断搜索排名、被引用频率或合作转化率。

## 本轮修正

- 关闭语言中间件的自动 HTTP alternate 链接。它会向 404 页面和实验室副本也添加语言地址，并与页面自身的 canonical、x-default 设置不一致。现在由页面元数据和 sitemap 共同发布真实存在的语言版本。
- 将首页的 `ProfessionalService` 改为由 `Person` 提供的 `Service`，避免把个人网站描述为本地商家。补充首页、个人档案、网站之间的实体关系。
- 三项合作分别对应页面中的稳定锚点；案例已有的延伸资料同时写入结构化引用，名称和链接来自同一份公开内容。
- 为显式的 OAI-SearchBot 和 GPTBot 规则补上 `/api/` 排除项。原有公共页面抓取许可保持不变。
- 取消文章描述的机械字符截断，保留完整原始摘要；修正英文 About 标题重复姓名。
- 将产品页的 31 个 Agent、44 个自动任务注明为 2026-04-15 实践文章的记录，并同步中英文指标说明，避免历史快照被当成最新规模。
- 保留现有 `llms.txt`，检查其链接及 RSS 中的文章入口。没有把它视为 Google 收录或 AI 引用的必要条件。

## 已验证

- 全部 34 个 sitemap 页面返回 200，正文、单个 H1、描述和结构化数据存在于原始 HTML。
- canonical、Open Graph URL 与 sitemap 一致；中英文替代链接真实存在且相互对应。
- 11 张分享图片可访问，正文内部页面链接与普通锚点有效。首页的 `#work`、`#build`、`#notes` 是已有的场景状态，按场景路由检查。
- 灯光、静态浏览参数不生成新的 canonical。实验 `/studio` 页面保持 noindex，不存在的文章和案例返回 404 且 noindex。
- 使用 Googlebot、bingbot、OAI-SearchBot 请求文章，均可读取正文与 head 中的 canonical。这里验证的是 HTTP 响应，不代表平台已收录。
- `robots.txt`、`sitemap.xml`、`rss.xml`、`llms.txt` 均可访问。
- ESLint、类型检查、43 项测试及正式构建通过。已在实际浏览器检查产品文案、文章入口和语言切换。

复查方式：先启动构建后的预览，再运行 `npm run audit:seo -- http://127.0.0.1:3100`。脚本只读取网站，不提交收录或修改外部平台。

另做了线上只读抽查：`https://www.darren-su.com/zh`、`/robots.txt` 和 `/sitemap.xml` 返回 200，线上 sitemap 也包含 34 个地址。这只证明这些入口可访问，不代表实验分支已发布，也不能排除搜索平台或 CDN 针对不同来源的行为差异。

## 后续最有价值的内容

8 个案例中，目前 SuperAI 走访和 Agent 分享附有公开文章。微信工坊、阶跃系列、AI+X 创造节等案例可以在材料具备时补充活动公告、公开复盘、日期和参与人数的统计口径。保留“约”“近”“接触到”等限定，不把触达人数改成到场人数，也不把组织关系描述成客户背书。

发布后再结合 Google Search Console、Bing Webmaster Tools 查看索引、搜索词、有效落地页和 AI 引用，并观察哪些内容带来相关的合作咨询。本轮没有访问这些后台或验证实际排名、引用与转化数据。

## 依据

- [Google：AI 功能与网站](https://developers.google.com/search/docs/appearance/ai-features)：可抓取、重要内容使用文本、内部链接以及与正文一致的结构化数据仍然是基础。
- [Google：生成式 AI 搜索优化指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)：无需特殊 AI 标记；Google 不把 llms.txt 作为排名优化机制。
- [Schema.org：ProfessionalService](https://schema.org/ProfessionalService)、[Service](https://schema.org/Service)：区分本地商家类型与个人提供的服务。
- [next-intl 路由配置](https://next-intl.dev/docs/routing/configuration#alternatelinks)：可以关闭自动语言链接，改由真实内容控制替代版本。
