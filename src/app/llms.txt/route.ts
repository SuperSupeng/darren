import { locales } from '@/i18n/config';
import { getAllPosts, getPostsBySeries } from '@/lib/blog';
import { seriesCatalog, seriesSlugs } from '@/lib/series';
import { getPortfolio } from '@/lib/portfolio';
import { homepageOneLiner, homepageServiceLine, serviceDescription, serviceOffers } from '@/lib/services-copy';
import {
  contactEmail,
  getPersonJobTitle,
  personDisplayName,
  personProfileLinks,
  siteUrl,
} from '@/lib/site-config';

export const dynamic = 'force-static';

export function GET() {
  const articles = locales.flatMap((locale) =>
    getAllPosts(locale).map(
      (post) =>
        `- [${post.title}](${siteUrl}/${locale}/blog/${post.slug}): ${post.description}`
    )
  );
  const cases = locales.flatMap((locale) =>
    getPortfolio(locale).work.map(
      (work) =>
        `- [${work.title}](${siteUrl}/${locale}/work/${work.id}): ${work.summary}`
    )
  );
  const sourceFiles = locales.flatMap((locale) => [
    ...getAllPosts(locale).map(post => `- [${post.title} (${locale}, Markdown)](${siteUrl}/${locale}/blog/${post.slug}/source.md)`),
    ...getPortfolio(locale).work.map(work => `- [${work.title} (${locale}, Markdown)](${siteUrl}/${locale}/work/${work.id}/source.md)`),
  ]);
  const seriesTopics = seriesSlugs.flatMap((slug) => {
    const series = seriesCatalog[slug];
    const items = locales.flatMap((locale) =>
      getPostsBySeries(locale, slug).map(
        (post) => `- [${post.title}](${siteUrl}/${locale}/blog/${post.slug})`
      )
    );
    return [
      `### ${series.name.zh} / ${series.name.en}`,
      `- [${series.name.zh}](${siteUrl}/zh/blog/topic/${slug})`,
      `- [${series.name.en}](${siteUrl}/en/blog/topic/${slug})`,
      ...items,
      '',
    ];
  });
  const topicIndex = [
    '## Topics / 主题索引',
    '',
    ...seriesTopics,
    '### Managing AI agents as a digital organization / 管理 AI 员工与多 Agent 数字组织',
    `- [管了 31 个 AI 员工之后，我重新理解了管理学](${siteUrl}/zh/blog/managing-31-ai-employees): 过去三个月，我搭建了一个基于 OpenClaw 的多 Agent 协作系统。31 个 Agent，组成「四部一室」；44 个定时任务每天自动执行。当员工变成 AI，管理的核心矛盾从「意愿问题」变成了「理解问题」。`,
    `- [Managing 31 AI Employees Changed How I Understand Management](${siteUrl}/en/blog/managing-31-ai-employees): Over the past three months, I built a multi-agent collaboration system on OpenClaw. Thirty-one agents form what I call “four departments and one office.” I handed the daily operation of Global Tech Events entirely to the agent system.`,
    `- [31 个 Agent 的数字组织实践](${siteUrl}/zh/work/agent-speaking): 我会讲这些 Agent 怎样分工、哪里会出错，以及把任务交给 AI 后，我怎样调整自己的管理方式。`,
    `- [A Digital Organization with 31 Agents](${siteUrl}/en/work/agent-speaking): I explain how the agents divide tasks, where they fail, and how I manage the work I delegate to AI.`,
    '',
    '### One-person companies and expert agents / 一人公司（OPC）与专家智能体',
    `- [AI 时代，如何把一个人的经验变成一项资产？](${siteUrl}/zh/blog/turning-expertise-into-an-asset): 和 Leapility 跃向 CEO 白双聊专家智能体。真正的 OPC，不只是效率更高，而是把个人经验产品化。`,
    `- [How Can Personal Experience Become an Asset in the AI Era?](${siteUrl}/en/blog/turning-expertise-into-an-asset): A conversation with Bai Shuang, CEO of Leapility. A real OPC is about more than efficiency. It is about turning personal experience into a product.`,
    '',
    '### China\'s AI ecosystem, on the ground / 中国 AI 生态现场观察',
    `- [Five Observations from Accompanying the SuperAI Team in Hangzhou and Shanghai](${siteUrl}/en/blog/superai-china-ecosystem-visit): The team came to understand China's AI ecosystem more systematically. Global teams are curious about China, but the entry points are weak.`,
    `- [陪 SuperAI 团队走访杭州和上海后，我记下了五个现场观察](${siteUrl}/zh/blog/superai-china-ecosystem-visit): 海外到底怎么看中国 AI 生态？海外不是不关心中国，而是缺少理解中国的入口。`,
    `- [SuperAI’s China visit](${siteUrl}/en/work/superai-china): The SuperAI team wanted to learn about China’s AI ecosystem.`,
    '',
    '### AI learners and developers beyond the largest hubs / 一线城市之外的 AI 学习者与开发者',
    `- [AI+X Creation Festival](${siteUrl}/en/work/aix-creation-festival): Many AI learners and developers live outside the largest technology hubs. They still need local opportunities to meet, exchange ideas, and build together.`,
    `- [AI+X 创造节](${siteUrl}/zh/work/aix-creation-festival): 很多 AI 学习者和开发者不在一线城市，但他们同样需要在本地见面、交流和动手创作的机会。`,
    `- [Datawhale 城市与开发者生态](${siteUrl}/zh/work/datawhale-city-ecosystem): 从 2019 年开始参与 Datawhale，后来逐渐负责城市生态工作。`,
    `- [播撒 AI 的种子](${siteUrl}/zh/blog/ai-for-good-youth-classes): 记录 Datawhale 与铺路石、久牵合作，为青少年介绍 AI 的过程，以及信息资源不平等带来的思考。`,
    '',
    '### AI memory, RAG, and vector databases (2024 technical notes) / AI 记忆、RAG 与向量数据库（2024 技术笔记）',
    `- [How to Preserve AI Memory](${siteUrl}/en/blog/how-ai-memory-works) · [如何保持 AI 记忆](${siteUrl}/zh/blog/how-ai-memory-works)`,
    `- [A RAG Demo in a Week, Still Not in Production Six Months Later](${siteUrl}/en/blog/rag-from-demo-to-production) · [RAG 一周出 Demo，半年不上线。怎么解？](${siteUrl}/zh/blog/rag-from-demo-to-production)`,
    `- [Where Do Vector Databases Go Next? A Conversation with MyScaleDB](${siteUrl}/en/blog/myscaledb-vector-database-dialogue) · [狂奔一年后的向量数据库，何去何从？](${siteUrl}/zh/blog/myscaledb-vector-database-dialogue)`,
    '',
    '### Small-city AI / 小城市 AI',
    `- [在长治，我看到了小城市做AI的机会](${siteUrl}/zh/blog/changzhi-small-city-ai): 小城市做 AI，可以从哪里开始？在长治和当地伙伴交流后，我的一个思路是：聚起想做事的人，梳理产业需求和真实场景，再把全国的人才与资源连接进来。产业、文化和文旅，都有值得一起探索的方向。`,
    '',
    '### Life and travel / 生活与游记',
    `- [晋东南游记：长治、晋城与南太行](${siteUrl}/zh/blog/jindongnan-travel-notes): 山西真是一个值得多来的地方，文化底蕴深厚，风景也美，美食简直不要太多。`,
  ].join('\n');

  const body = [
    `# ${personDisplayName}`,
    '',
    '## Identity',
    '',
    '- Public name: Darren / Darren Su',
    '- Chinese name: 苏鹏',
    `- Roles (EN): ${getPersonJobTitle('en')}`,
    `- Roles (ZH): ${getPersonJobTitle('zh')}`,
    '- Podcast: 《重新组织》 / Re:Organize · Host',
    '- Site purpose: bilingual zh/en public archive hub for writing, the podcast entrance, projects, about, and collaboration',
    `Canonical website: ${siteUrl}`,
    `Primary contact: ${contactEmail}`,
    '',
    '## Main pages',
    '',
    `- [English home](${siteUrl}/en)`,
    `- [中文首页](${siteUrl}/zh)`,
    `- [Writing](${siteUrl}/en/blog)`,
    `- [文章](${siteUrl}/zh/blog)`,
    `- [Podcast Re:Organize / 《重新组织》](${siteUrl}/en/podcast)`,
    `- [播客《重新组织》 / Re:Organize](${siteUrl}/zh/podcast)`,
    `- [Projects](${siteUrl}/en/projects)`,
    `- [项目](${siteUrl}/zh/projects)`,
    `- [About Darren](${siteUrl}/en/about)`,
    `- [关于苏鹏](${siteUrl}/zh/about)`,
    `- [Collaborate](${siteUrl}/en/services)`,
    `- [合作](${siteUrl}/zh/services)`,
    '',
    '## Case studies',
    '',
    'Individual case studies remain at their current `/work/[slug]` URLs. The projects index is `/projects`; `/work` without a slug redirects there.',
    '',
    ...cases,
    '',
    '## Collaboration / 合作',
    '',
    `- ${serviceOffers.talks.zh.title}: ${serviceDescription('talks', 'zh')}`,
    `- ${serviceOffers.visits.zh.title}`,
    `- ${homepageServiceLine}`,
    `- ${serviceOffers.visits.en.title}`,
    `- ${serviceOffers.talks.en.title}`,
    `- ${homepageOneLiner}`,
    `- [合作](${siteUrl}/zh/services)`,
    `- [Collaborate](${siteUrl}/en/services)`,
    '',
    topicIndex,
    '',
    '## Published writing',
    '',
    ...articles,
    '',
    '## Full-text formats',
    '',
    'The HTML pages above are the canonical sources. These alternate formats are generated from the same public content, including authorship, article publication dates, images, and references. Case-study years describe when the work happened; they are not publication dates.',
    '',
    `- [RSS summaries, Chinese and English](${siteUrl}/rss.xml)`,
    ...sourceFiles,
    '',
    '## Public profiles',
    '',
    ...personProfileLinks.map(([label, href]) => `- ${label}: ${href}`),
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
