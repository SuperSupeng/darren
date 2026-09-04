export type PortfolioMetric = {
  value: string;
  label: string;
  note: string;
};

export type PortfolioWork = {
  id: string;
  category: 'ecosystem' | 'conference' | 'global' | 'speaking';
  title: string;
  year: string;
  location: string;
  role: string;
  summary: string;
  result: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
  href?: string;
};

export type CollaborationPath = {
  number: string;
  title: string;
  bestFor: string;
  description: string;
  outcomes: string[];
};

type PortfolioContent = {
  metrics: PortfolioMetric[];
  work: PortfolioWork[];
  collaborations: CollaborationPath[];
};

const chinesePortfolio: PortfolioContent = {
  metrics: [
    {
      value: '40 城',
      label: '全国联动',
      note: '2026 AI+X 创造节',
    },
    {
      value: '近 1,000',
      label: '接触到的开发者',
      note: '阶跃星辰四城系列活动',
    },
    {
      value: '31 + 44',
      label: 'Agent 和自动任务',
      note: '日常使用的工作系统',
    },
    {
      value: '2019—',
      label: '长期社区实践',
      note: '从学习者到城市生态负责人',
    },
  ],
  work: [
    {
      id: 'wechat-innovation-workshop',
      category: 'conference',
      title: '微信开发者创新工坊',
      year: '2026',
      location: '成都 · 上海',
      role: '项目负责人',
      summary: '与微信小程序在成都和上海联合组织开发者创新工坊。我负责项目推进，也和团队一起设计内容、邀请开发者，并完成两地现场。',
      result: '单场约 100 人参与',
      image: '/images/work/03.jpg',
      imageAlt: '微信开发者创新工坊成都现场，开发者与组织团队合影',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'superai-china',
      category: 'global',
      title: 'SuperAI 中国科技生态连接',
      year: '2026',
      location: '杭州 · 上海 · 新加坡',
      role: '生态伙伴与现场连接者',
      summary: '陪同 SuperAI 团队在杭州和上海走访高校、开源社区与 AI 公司，后来也代表 Datawhale 参加了他们在新加坡的大会。',
      result: '完成杭州、上海和新加坡三地交流',
      image: '/blog/superai-china/team.jpg',
      imageAlt: 'Darren 与 SuperAI 生态团队及中国 AI 社区伙伴合影',
      imageClassName: 'object-cover object-center',
      href: '/blog/superai-china-ecosystem-visit',
    },
    {
      id: 'agent-speaking',
      category: 'speaking',
      title: '31 个 Agent 实践分享',
      year: '2026',
      location: '中国及国际科技现场',
      role: '作者、分享嘉宾',
      summary: '那篇关于 31 个 Agent 的文章发布以后，我陆续收到了一些分享邀请。现场里，我会具体讲这些 Agent 怎样分工、哪些地方会出错，以及 AI 开始承担执行工作以后，我自己的管理方式发生了什么变化。',
      result: '文章发布后，陆续带来多次分享与合作邀请',
      image: '/images/work/10.jpg',
      imageAlt: 'Darren 在科技活动现场进行主题分享',
      imageClassName: 'object-cover object-center',
      href: '/blog/managing-31-ai-employees',
    },
    {
      id: 'stepfun-four-cities',
      category: 'ecosystem',
      title: '阶跃星辰开发者系列活动',
      year: '2026',
      location: '北京 · 上海 · 杭州 · 深圳',
      role: '系列活动发起与负责人',
      summary: '在北京、上海、杭州和深圳组织四场开发者活动。我负责系列策划和整体推进，并与各地社区一起完成招募和现场执行。',
      result: '四城触达近 1,000 位开发者',
      image: '/images/work/14.jpg',
      imageAlt: 'Darren 在阶跃星辰 Agent Builders Gathering 现场分享',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'aix-creation-festival',
      category: 'ecosystem',
      title: 'AI+X 创造节',
      year: '2026',
      location: '全国 40 城',
      role: '发起人、项目负责人',
      summary: '我发起 AI+X 创造节，并和各地组织者一起把活动落到 40 座城市。我们希望不同地方的 AI 学习者和开发者，不必都赶去大城市，在自己的城市也能见面、交流和动手做东西。',
      result: '40 座城市同步参与',
      image: '/images/work/11.jpg',
      imageAlt: 'AI 创造者活动现场的大型开发者合影',
      imageClassName: 'object-cover object-[center_78%]',
    },
    {
      id: 'waic-pioneers-night',
      category: 'conference',
      title: "WAIC AI Pioneers' Night",
      year: '2026',
      location: '上海',
      role: '联合发起、项目负责人',
      summary: '我与 WAIC UP MORE、阿里云共同组织 WAIC 官方夜场，负责项目推进、嘉宾邀请和现场内容。',
      result: '约 100 位 AI 开发者、创业者与生态伙伴到场',
      image: '/images/work/01-cover.png',
      imageAlt: "Darren 在 WAIC AI Pioneers' Night 现场开场分享",
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'rumata-workshop',
      category: 'global',
      title: 'Rumata 产品共创 Workshop',
      year: '2026',
      location: '中国',
      role: '发起人、项目负责人',
      summary: '我邀请以色列 AI 创业者 Nitzan 和 Yoel 来中国。我们组织了一场小型产品 Workshop，让他们直接和开发者及潜在用户坐在一起，听大家实际使用产品之后怎么说。',
      result: '约 50 人参与，完成第一轮产品反馈',
      image: '/images/work/05.jpg',
      imageAlt: 'Rumata Startup Co-creation 产品工作坊现场合影',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'datawhale-city-ecosystem',
      category: 'ecosystem',
      title: 'Datawhale 城市与开发者生态',
      year: '2019—至今',
      location: '中国多城市',
      role: '城市生态负责人',
      summary: '从 2019 年开始参与 Datawhale，后来逐渐负责城市生态工作。日常会接触学习者、开发者、高校、开源贡献者和各地组织者。',
      result: '参与并推动多次城市活动与全国联动项目',
      image: '/images/work/12.jpg',
      imageAlt: 'Datawhale OpenClaw 城市开发者活动现场合影',
      imageClassName: 'object-cover object-center',
    },
  ],
  collaborations: [
    {
      number: '01',
      title: '开发者活动与生态项目',
      bestFor: '准备组织开发者活动、多城市联动或大会合作的团队',
      description: '我做过单城 Workshop、四城系列活动，也负责过 WAIC 官方夜场和 40 城全国联动。合作通常从目标和参与者开始，一直推进到嘉宾、内容、现场与后续整理。',
      outcomes: ['把这次活动为什么做、为谁做先说清楚', '邀请合适的嘉宾、开发者与生态伙伴', '完成策划、现场执行和后续内容'],
    },
    {
      number: '02',
      title: 'AI 产品早期用户 Workshop',
      bestFor: '已经有可用产品，希望进入中国或找到早期用户的 AI 团队',
      description: '如果产品已经可以上手，我可以帮助组织一场小范围体验，让团队直接和潜在用户坐在一起。现场会把时间留给实际使用、提问和反馈，而不只是介绍功能。',
      outcomes: ['先确认这一轮最想验证的问题', '找到愿意实际使用产品的开发者', '整理反馈，供团队判断下一步'],
    },
    {
      number: '03',
      title: 'AI 与 Agent 分享',
      bestFor: '企业、大会、高校与开发者社区',
      description: '我分享的内容都来自自己正在使用的系统和做过的项目，包括 AI 的日常使用、Agent 的搭建与分工，以及这些工具进入工作以后带来的具体变化。',
      outcomes: ['主题演讲或圆桌交流', '企业内部分享', '带着真实任务动手的工作坊'],
    },
  ],
};

const englishPortfolio: PortfolioContent = {
  metrics: [
    {
      value: '40 cities',
      label: 'in one nationwide program',
      note: '2026 AI+X Creation Festival',
    },
    {
      value: 'Nearly 1,000',
      label: 'developers reached',
      note: 'StepFun four-city series',
    },
    {
      value: '31 + 44',
      label: 'agents and automations',
      note: 'A work system used every day',
    },
    {
      value: 'Since 2019',
      label: 'community practice',
      note: 'From learner to city ecosystem lead',
    },
  ],
  work: [
    {
      id: 'wechat-innovation-workshop',
      category: 'conference',
      title: 'WeChat Developer Innovation Workshop',
      year: '2026',
      location: 'Chengdu · Shanghai',
      role: 'Program lead',
      summary: 'A developer workshop organized with WeChat Mini Programs in Chengdu and Shanghai. I led the program and worked with the team on the content, invitations, and delivery in both cities.',
      result: 'Around 100 participants per workshop',
      image: '/images/work/03.jpg',
      imageAlt: 'Developers and organizers at the WeChat Developer Innovation Workshop in Chengdu',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'superai-china',
      category: 'global',
      title: 'Connecting SuperAI with China\'s AI ecosystem',
      year: '2026',
      location: 'Hangzhou · Shanghai · Singapore',
      role: 'Ecosystem partner and local liaison',
      summary: 'I accompanied the SuperAI team through universities, open-source communities, and AI companies in Hangzhou and Shanghai, then represented Datawhale at their conference in Singapore.',
      result: 'Visits and exchanges in Hangzhou, Shanghai, and Singapore',
      image: '/blog/superai-china/team.jpg',
      imageAlt: 'Darren with the SuperAI ecosystem team and China AI community partners',
      imageClassName: 'object-cover object-center',
      href: '/blog/superai-china-ecosystem-visit',
    },
    {
      id: 'agent-speaking',
      category: 'speaking',
      title: 'Talks on Working with 31 Agents',
      year: '2026',
      location: 'Technology events in China and abroad',
      role: 'Author and invited speaker',
      summary: 'After I published an essay about my 31-agent work system, invitations to speak began to follow. In these talks, I explain how the agents divide the work, where they fail, and how my management changed once AI began handling more of the execution.',
      result: 'The essay led to several talks and collaboration invitations',
      image: '/images/work/10.jpg',
      imageAlt: 'Darren speaking at a technology event',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'stepfun-four-cities',
      category: 'ecosystem',
      title: 'StepFun developer series',
      year: '2026',
      location: 'Beijing · Shanghai · Hangzhou · Shenzhen',
      role: 'Series initiator and program lead',
      summary: 'I initiated and led a four-city developer series, working with local communities on participant outreach and event delivery.',
      result: 'Nearly 1,000 developers reached across four cities',
      image: '/images/work/14.jpg',
      imageAlt: 'Darren speaking at a StepFun Agent Builders Gathering',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'aix-creation-festival',
      category: 'ecosystem',
      title: 'AI+X Creation Festival',
      year: '2026',
      location: '40 cities across China',
      role: 'Initiator and program lead',
      summary: 'I initiated the AI+X Creation Festival and worked with local organizers to bring it to 40 cities, so AI learners and developers could meet and build where they lived rather than having to travel to a major hub.',
      result: 'A coordinated program across 40 cities',
      image: '/images/work/11.jpg',
      imageAlt: 'A large group of developers at an AI Creators event',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'waic-pioneers-night',
      category: 'conference',
      title: "WAIC AI Pioneers' Night",
      year: '2026',
      location: 'Shanghai',
      role: 'Co-initiator and program lead',
      summary: 'I organized this official WAIC evening event with WAIC UP MORE and Alibaba Cloud. I led program planning, invited speakers, and ran the on-site program.',
      result: 'Around 100 AI developers, founders, and ecosystem partners attended',
      image: '/images/work/01-cover.png',
      imageAlt: "Darren opening WAIC AI Pioneers' Night",
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'rumata-workshop',
      category: 'global',
      title: 'Rumata Product Co-creation Workshop',
      year: '2026',
      location: 'China',
      role: 'Initiator and program lead',
      summary: 'I invited Israeli AI founders Nitzan and Yoel to China for a small product workshop. They sat down directly with developers and potential users and heard what people thought after trying the product.',
      result: 'Around 50 people attended and provided the first round of product feedback.',
      image: '/images/work/05.jpg',
      imageAlt: 'Participants at the Rumata Startup Co-creation product workshop',
      imageClassName: 'object-cover object-center',
    },
    {
      id: 'datawhale-city-ecosystem',
      category: 'ecosystem',
      title: 'Datawhale city and developer ecosystem',
      year: '2019—present',
      location: 'Cities across China',
      role: 'City ecosystem lead',
      summary: 'I joined Datawhale in 2019 and gradually took responsibility for its city ecosystem work. Since then, I have worked with learners, developers, universities, open-source contributors, and local organizers across China.',
      result: 'Multiple city programs and nationwide collaborations',
      image: '/images/work/12.jpg',
      imageAlt: 'Developers at a Datawhale OpenClaw city event',
      imageClassName: 'object-cover object-center',
    },
  ],
  collaborations: [
    {
      number: '01',
      title: 'Developer events and ecosystem programs',
      bestFor: 'Teams planning a developer event, multi-city series, or conference partnership',
      description: 'I have led single-city workshops, a four-city series, an official WAIC evening event, and a 40-city national program. The work usually begins with the purpose and participants, then continues through speakers, content, delivery, and documentation.',
      outcomes: ['Clarify why the event exists and who it is for', 'Invite the right speakers, developers, and partners', 'Handle planning, delivery, and the content that follows'],
    },
    {
      number: '02',
      title: 'Early-user workshops for AI products',
      bestFor: 'AI teams with a usable product seeking early users or a path into China',
      description: 'If the product is ready to use, I can organize a small session where the team sits directly with potential users. The session centers on hands-on use, questions, and feedback instead of a product presentation.',
      outcomes: ['Define the question this round needs to answer', 'Find developers willing to use the product', 'Document the feedback for the team’s next decision'],
    },
    {
      number: '03',
      title: 'AI and agent talks',
      bestFor: 'Companies, conferences, universities, and developer communities',
      description: 'My talks draw on systems I use and projects I have actually done, including how I use AI day to day, how I build agents and divide work among them, and how these tools have changed the way I work.',
      outcomes: ['Keynotes or panel conversations', 'Private sessions for teams', 'Hands-on workshops built around real tasks'],
    },
  ],
};

export function getPortfolio(locale: string): PortfolioContent {
  return locale === 'zh' ? chinesePortfolio : englishPortfolio;
}

const featuredWorkIds = [
  'aix-creation-festival',
  'rumata-workshop',
  'waic-pioneers-night',
  'agent-speaking',
] as const;

export function getFeaturedWork(locale: string): PortfolioWork[] {
  const { work } = getPortfolio(locale);

  return featuredWorkIds
    .map((id) => work.find((item) => item.id === id))
    .filter((item): item is PortfolioWork => Boolean(item));
}
