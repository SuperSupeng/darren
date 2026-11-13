# 架构与模块边界

网站使用 Next.js App Router、React、TypeScript、Tailwind CSS、next-intl，以及 React Three Fiber / Three.js。内容来自仓库中的 Markdown 和结构化数据，没有数据库或 CMS。主要页面由服务器生成可直接读取的 HTML，浏览器加载后增加 3D、菜单、阅读定位等交互。

## 页面与内容分层

| 模块 | 职责与边界 |
| --- | --- |
| `src/app/[locale]/` | 路由、页面组合、metadata 和静态参数；不复制共享事实。 |
| `src/i18n/` | 支持的语言、语言路由及保留本地化地址的导航工具。 |
| `src/lib/site-config.ts` | 域名、联系邮箱、社交链接与主导航（首页 / 咨询 / 案例与产品 / 文章 / 关于）的统一配置，供页面、联系组件和 SEO 读取。 |
| `src/lib/contact.ts` | 邮件地址与预填咨询主题、正文的编码；不发送邮件。 |
| `src/lib/portfolio/` | 案例与合作数据；`types.ts` 定义结构，`en.ts`、`zh.ts` 管理文案，`images.ts` 管理图片，`index.ts` 提供统一读取接口。 |
| `src/lib/about.ts`、`experience-archive.ts` | 关于页叙述、补充活动经历；与正式案例区分，保留具体身份与参与范围。 |
| `src/lib/site-content/`、`siteContent.ts` | 产品及页面共享文案，通过 `getSiteContent` 读取。 |
| `src/lib/blog.ts`、`blog-images.ts` | Markdown 解析、元数据校验、排序、语言可用性、文章封面和图片尺寸。 |
| `src/lib/studio-content.ts` | 在服务器上选择首页展示的文章和产品，向组件提供精简卡片；不把整篇文章传给 3D 场景。 |
| `src/components/` | 组合内容与交互；通用联系、标志、语言切换等组件供页面复用。 |

首页由 `StudioExperience` 与 `StudioPurpose` 组成，先说明咨询定位与入口，再展示三类问题、相关经历、文章与播客、联系方式。`/consulting` 是个人付费咨询的统一入口，主推 AI 原生组织转型，另有 GEO 与 GTM；开头与各方向提供邮件入口。`/projects` 先展示案例，再列产品；产品补充说明和其他经历用原生 `details` 展开，保留历史锚点。`/services` 承接讲座、工作坊与生态交流，作为次级入口。播客归入文章阅读路径，保留独立收听页。内容页面通过共享读取接口取得同一份案例、文章和产品信息。首页精选文章按语言明确指定，不会因新增翻译或旧文归档自动换位。内容调整入口与编辑规则见 [内容维护规范](content-strategy.md)。

## 3D 与普通阅读

`SiteChrome` 组合全站设置、导航和页脚。`StudioSettings` 管理日光 / 暮色及静态浏览偏好；`StudioScene` 负责模型、材质、灯光和热点；镜头与手势逻辑独立在 `scene-camera.ts`。`RoomPortal` 复用局部场景，`SpatialMotion` 负责共用页面动效。

3D 场景动态加载。首页仅在用户主动打开后挂载场景；桌面默认展示预览图，手机默认收起房间。关于页以照片与正文为主。场景初始化失败或用户选择静态浏览时，普通内容和链接仍然可用。热点和导航通往同一内容页面；历史房间锚点由 `studio-location.ts` 兼容处理。内容滚入视口时只改变透明度，不移动链接位置。

手机顶栏始终显示“联系我”和“菜单”；菜单覆盖页面，不推移正文。语言与主题切换在手机菜单内，桌面语言在顶栏，主题在页脚。页脚先展示四个常用平台，其他平台通过原生 `details` 展开。首页与咨询页的咨询邮件提供相同提纲。无 JavaScript 时保留普通导航、语言链接及原生联系展开入口，隐藏需要脚本的邮箱复制按钮。

`?light=evening` 随跨页和语言切换保留，静态偏好在浏览器保存。视觉状态不创建新的索引地址。修改交互时同时考虑键盘、触屏、减少动态偏好以及不执行 JavaScript 的访问者，验证路径见 [验证与发布](verification.md)。

样式放在负责该界面的模块中：`globals.css` 是导入入口，`src/styles/tokens.css`、`base.css`、`controls.css` 分别管理全局配色、基础样式与通用控件；`typography.css` 管理语言字体，`components/studio/` 与 `components/spatial/` 管理场景和页面样式。字体生成物不手工编辑，见 [字体维护](site-fonts.md)。

## HTML、搜索与内容导出

`seo.ts` 维护 canonical、语言替代链接、分享图片信息与结构化数据。`sitemap.ts`、`robots.ts` 根据公开路由生成抓取入口。语言替代地址只包含真实存在的内容，缺失页面返回 404；旧 `/studio` 兼容页不进入索引。

文章和案例的 HTML 页面是规范地址。`content-source.ts` 从相同数据生成 `source.md`，附带规范地址、语言、作者与绝对链接；文章正文通过 `render-markdown.ts` 渲染。RSS 使用文章摘要，不嵌入全文 HTML；`llms.txt` 从公开内容生成索引，不维护另一套事实。新增内容或修改元数据时，同时检查页面、导出、RSS 和 sitemap 的一致性。

没有核实原始发表日期的文章不声明 `datePublished`，归档年份也不是发表日。sitemap 不用构建日或发表日代替实际更新日期。结构化数据描述页面已有事实，公开来源的支持范围见 [案例证据](case-evidence.md)。

规范域名统一由 `site-config.ts` 提供，`NEXT_PUBLIC_SITE_URL` 可覆盖默认正式域名 `https://www.darren-su.com`。本地预览仍应保留正式规范地址。抓取检查通过只证明响应和内容结构符合检查项，不证明搜索平台已经收录或 AI 已引用。
