# SEO 与 AI 搜索检查

检查日期：2026-09-06。范围为 `codex/3d-studio-preview` 实验分支、本地正式构建及线上只读抓取样本；未部署或修改生产配置。

## 判断

网站已经有完整的 SEO 基础。3D 场景外的身份介绍、合作说明、案例、文章和联系链接都包含在服务器返回的 HTML 中，不依赖 WebGL 或执行 JavaScript 才能读取。34 个公开页面由中英文各 6 个主页面、8 个案例和 3 篇文章组成。

当前更值得完善的是身份关系与证据：让检索系统准确区分 Darren 本人的工作、组织身份、具体合作方式和公开实践记录。不能仅凭结构化数据判断搜索排名、被引用频率或合作转化率。

## 已落实的改进

- 关闭语言中间件的自动 HTTP alternate 链接。它会向 404 页面和实验室副本也添加语言地址，并与页面自身的 canonical、x-default 设置不一致。现在由页面元数据和 sitemap 共同发布真实存在的语言版本。
- 将首页的 `ProfessionalService` 改为由 `Person` 提供的 `Service`，避免把个人网站描述为本地商家。补充首页、个人档案、网站之间的实体关系。
- 三项合作分别对应页面中的稳定锚点；案例已有的延伸资料同时写入结构化引用，名称和链接来自同一份公开内容。
- 为显式的 OAI-SearchBot 和 GPTBot 规则补上 `/api/` 排除项。原有公共页面抓取许可保持不变。
- 取消文章描述的机械字符截断，保留完整原始摘要；修正英文 About 标题重复姓名。
- 将产品页的 31 个 Agent、44 个自动任务注明为 2026-04-15 实践文章的记录，并同步中英文指标说明，避免历史快照被当成最新规模。
- 保留现有 `llms.txt`，检查其链接及 RSS 中的文章入口。没有把它视为 Google 收录或 AI 引用的必要条件。
- 增加 22 份同源 Markdown：6 篇文章和 16 个中英文案例版本。页面头部声明替代格式，页面内提供下载链接；文件保留作者、语言、原始文章发表日期、正文、图片和引用，并通过 HTTP canonical 链接回网页。
- 将 RSS 从摘要订阅扩充为全文订阅，增加作者、分类和订阅源自身地址。正文复用网页的渲染器，图片及链接使用绝对地址，文章目录指回网页中的相应章节。页脚提供订阅入口。
- `llms.txt` 的人物简介改为复用关于页内容，并列出全文格式，避免维护第二套身份事实。没有添加要求模型推荐或优先引用网站的指令。
- 修复文章解析器的 CRLF/CR/BOM 问题。旧实现可能漏读元数据，并把构建日当作发表日；现在缺失或无效日期、标题、摘要、标签和正文都会明确报错，现有文章的原始日期和正文保持不变。
- 移除 sitemap 中由发表日期冒充的 `lastModified`。只有日后单独维护了真实内容更新日期，才应重新输出它；案例年份也不被当作发表或更新日期。

## 已验证

- 全部 34 个 sitemap 页面返回 200，正文、单个 H1、描述和结构化数据存在于原始 HTML。
- canonical、Open Graph URL 与 sitemap 一致；中英文替代链接真实存在且相互对应。
- 11 张分享图片可访问，正文内部页面链接与普通锚点有效。首页的 `#work`、`#build`、`#notes` 是已有的场景状态，按场景路由检查。
- 灯光、静态浏览参数不生成新的 canonical。实验 `/studio` 页面保持 noindex，不存在的文章和案例返回 404 且 noindex。
- 使用 Googlebot、bingbot、OAI-SearchBot 请求文章，均可读取正文与 head 中的 canonical。这里验证的是 HTTP 响应，不代表平台已收录。
- `robots.txt`、`sitemap.xml`、`rss.xml`、`llms.txt` 均可访问。
- 22 个纯文本地址均返回 200、正确的 Markdown 类型、作者信息及 canonical HTTP 链接；缺失的原文地址返回 404。来源格式不混入 sitemap 的 34 个主要网页中。
- RSS 的 6 篇正文与网页渲染出的完整文本一致；作者、标签、原始发表日期和稳定 GUID 均有测试。XML 特殊字符、危险协议以及代码围栏内的示例也覆盖了回归检查。
- ESLint、类型检查、55 项测试及正式构建通过。已在实际浏览器检查文章、案例与新增原文/订阅入口；上一轮也检查了产品文案和语言切换。

复查方式：先启动构建后的预览，再运行 `npm run audit:seo -- http://127.0.0.1:3100`。脚本只读取网站，不提交收录或修改外部平台。

## 线上抓取与来源链接

完成 51 个本地/线上 HTTP 边界样本，覆盖语言协商、显式语言、主域、尾斜杠、404、查询参数及不同 User-Agent。首页、robots、sitemap 和文章都可访问；尾斜杠使用 308 去除；显式 `/zh`、`/en` 不会因语言请求头而跳转。无语言入口按语言协商使用 307，属于正常行为。

同一环境中，Googlebot、bingbot、OAI-SearchBot 与普通浏览器 User-Agent 取得的文章正文哈希相同，没有为爬虫删减正文。这里使用的是请求头模拟，不是从搜索平台的真实 IP 发起请求，不能证明实际收录或排除 CDN 对来源 IP 的不同处理。

6 篇文章的 12 个去重外部引用中，10 个返回 200，OpenAI Harness Engineering 与 Axios 报道返回 403。403 仅表示本次访问受限，没有将它们当作失效链接删除；未发现 404/410。可访问的页面标题与引用相符，但这不等于独立核实每个论断。案例材料的 4 个中英文条目全部指向站内文章，内部链接已随全站检查。

线上目前仍是旧版：之前修好的自动语言 HTTP 链接和 AI 爬虫组 `/api/` 排除规则尚未发布，新增全文及纯文本入口也只在实验预览中可用。

## 发布时仍需处理

线上目前 `https://darren-su.com/zh` 使用临时 307 跳到 `https://www.darren-su.com/zh`，HTTP apex 还会先经过一次 HTTPS 跳转。这不阻断访问，但确定长期以 www 为主域后，适合在域名配置中改成永久 308/301，并尽量减少跳转。此次未修改域名配置，也未提交搜索收录。

## 后续最有价值的内容

8 个案例中，目前 SuperAI 走访和 Agent 分享附有公开文章。微信工坊、阶跃系列、AI+X 创造节等案例可以在材料具备时补充活动公告、公开复盘、日期和参与人数的统计口径。保留“约”“近”“接触到”等限定，不把触达人数改成到场人数，也不把组织关系描述成客户背书。

发布后再结合 Google Search Console、Bing Webmaster Tools 查看索引、搜索词、有效落地页和 AI 引用，并观察哪些内容带来相关的合作咨询。本轮没有访问这些后台或验证实际排名、引用与转化数据。

## 依据

- [Google：AI 功能与网站](https://developers.google.com/search/docs/appearance/ai-features)：可抓取、重要内容使用文本、内部链接以及与正文一致的结构化数据仍然是基础。
- [Google：生成式 AI 搜索优化指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)：无需特殊 AI 标记；Google 不把 llms.txt 作为排名优化机制。
- [Schema.org：ProfessionalService](https://schema.org/ProfessionalService)、[Service](https://schema.org/Service)：区分本地商家类型与个人提供的服务。
- [next-intl 路由配置](https://next-intl.dev/docs/routing/configuration#alternatelinks)：可以关闭自动语言链接，改由真实内容控制替代版本。
- [Google：sitemap 的构建规则](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)：`lastmod` 应当可核验地反映内容的实质更新。
- [Google：重定向与搜索](https://developers.google.com/search/docs/crawling-indexing/301-redirects)：永久与临时重定向对 canonical 的信号不同。
- [RSS 2.0 规范](https://www.rssboard.org/rss-specification)、[OpenAI 爬虫说明](https://developers.openai.com/api/docs/bots)：订阅分发与爬虫访问的边界。
