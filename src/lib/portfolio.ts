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
  heroSummary?: string;
  result: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  href?: string;
  noteHref?: string;
  caseStudy: {
    context: string;
    responsibilities: string[];
    outcome: string;
    outcomeNote?: string;
    reflection: string;
    materials?: {
      type: string;
      title: string;
      description: string;
      href: string;
    }[];
  };
};

export type CollaborationPath = {
  id: 'developer-events' | 'product-workshops' | 'ai-talks';
  number: string;
  title: string;
  bestFor: string;
  description: string;
  outcomes: string[];
  invitation: string;
  linkLabel: string;
  inquiry: string[];
};

export type FieldStory = {
  id: string;
  src: string;
  imageAlt: string;
  title: string;
  place: string;
  role: string;
  result: string;
  shape: 'wide' | 'portrait';
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
      summary: '与微信小程序在成都和上海联合组织开发者创新工坊。我负责项目推进，也和团队一起策划内容、邀请开发者，并组织两地活动。',
      result: '单场约 100 人参与',
      image: '/images/work/03.jpg',
      imageAlt: '微信开发者创新工坊成都现场，开发者与组织团队合影',
      imageClassName: 'object-cover object-center',
      caseStudy: {
        context: '这是一个与微信小程序联合推进的两城开发者项目。目标是让开发者在现场获得有用的内容，也能和同行交流。',
        responsibilities: ['协调项目进度与两地协作', '与团队一起策划活动内容', '邀请开发者，组织成都和上海两场活动'],
        outcome: '成都和上海两场工坊均已举办，单场约 100 人参与。',
        reflection: '一场有用的开发者活动，应该先把参与者要带走什么说清楚，再决定内容与规模。',
      },
    },
    {
      id: 'superai-china',
      category: 'global',
      title: 'SuperAI 中国 AI 生态走访',
      year: '2026',
      location: '杭州 · 上海 · 新加坡',
      role: '生态伙伴、走访协调与陪同',
      summary: '陪同 SuperAI 团队在杭州和上海走访高校、开源社区与 AI 公司，后来也代表 Datawhale 参加了他们在新加坡的大会。',
      result: '完成杭州、上海和新加坡三地交流',
      image: '/blog/superai-china/team.jpg',
      imageAlt: 'Darren 与 SuperAI 生态团队及中国 AI 社区伙伴合影',
      imageClassName: 'object-cover object-center',
      noteHref: '/blog/superai-china-ecosystem-visit',
      caseStudy: {
        context: 'SuperAI 团队希望了解中国 AI 生态。安排走访时，需要了解双方的背景和关心的问题。',
        responsibilities: ['协助安排杭州与上海的走访行程', '协助联系高校、开源社区与 AI 公司', '陪同交流，后续代表 Datawhale 前往新加坡参会'],
        outcome: '杭州与上海的走访覆盖浙大、魔搭社区、Qwen、MiniMax 等高校、社区与 AI 团队。我将交流中的五个现场观察整理成公开手记，后来代表 Datawhale 参加了新加坡的 SuperAI 大会。',
        reflection: '了解双方各自想解决的问题，才更容易在走访之后继续交流。',
        materials: [
          {
            type: '现场手记 · 2026.05.18',
            title: '陪 SuperAI 团队走访杭州和上海后，我记下了五个现场观察',
            description: '我把陪同走访中的交流整理成五个观察，附上走访路线与现场合影，记录双方关心的问题，以及跨境生态交流需要补足的背景。',
            href: '/blog/superai-china-ecosystem-visit',
          },
        ],
      },
    },
    {
      id: 'agent-speaking',
      category: 'speaking',
      title: '31 个 Agent 实践分享',
      year: '2026',
      location: '中国及海外科技活动',
      role: '作者、分享嘉宾',
      summary: '关于 31 个 Agent 的文章发布后，我陆续收到分享邀请。我会讲这些 Agent 怎样分工、哪里会出错，以及把任务交给 AI 后，我怎样调整自己的管理方式。',
      result: '文章发布后，陆续带来多次分享与合作邀请',
      image: '/images/work/10.jpg',
      imageAlt: 'Darren 在科技活动现场进行主题分享',
      imageClassName: 'object-cover object-center',
      noteHref: '/blog/managing-31-ai-employees',
      caseStudy: {
        context: '一篇关于 31 个 Agent 工作系统的文章发布后，不同的企业、大会与社区开始邀请我把这套实践讲清楚。',
        responsibilities: ['说明 Agent 如何分工、同步信息，以及哪些环节容易出错', '根据不同听众调整分享结构', '结合日常任务，说明把工作交给 AI 后怎样管理'],
        outcome: '我把日常使用的 31 个 Agent、44 个自动任务及协作规则整理成公开长文。文章带来多次分享与合作邀请，也让这套工作系统在交流中继续迭代。',
        reflection: '对 Agent 的分享最有价值的部分，往往不是工具清单，而是任务怎样被理解、授权和检查。',
        materials: [
          {
            type: '实践长文 · 2026.04.15',
            title: '管了 31 个 AI 员工之后，我重新理解了管理学',
            description: '文中保留了当时的组织结构、Agent 分工和产品界面，具体记录信息同步、授权与检查规则，也写下任务失败和停用的经历。',
            href: '/blog/managing-31-ai-employees',
          },
        ],
      },
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
      caseStudy: {
        context: '四座城市的开发者群体与合作社区各不相同，但整个系列需要保持一致的主题与质量。',
        responsibilities: ['发起四城系列并负责整体策划', '与北京、上海、杭州、深圳当地社区协作', '推进参与者招募与现场执行'],
        outcome: '四场活动共触达近 1,000 位开发者。',
        reflection: '多城项目需要共同的目标和安排，也要让当地组织者根据各自社区的情况调整。',
      },
    },
    {
      id: 'aix-creation-festival',
      category: 'ecosystem',
      title: 'AI+X 创造节',
      heroSummary: '我发起创造节，与各地组织者一起在全国 40 座城市举办活动。',
      year: '2026',
      location: '全国 40 城',
      role: '发起人、项目负责人',
      summary: '我发起 AI+X 创造节，并和各地组织者一起在 40 座城市举办活动。我们希望各地的 AI 学习者和开发者，可以在自己的城市见面、交流和动手做东西。',
      result: '40 座城市同步参与',
      image: '/images/work/11.jpg',
      imageAlt: 'AI 创造者活动现场的大型开发者合影',
      imageClassName: 'object-cover object-[center_78%]',
      caseStudy: {
        context: '很多 AI 学习者和开发者不在一线城市，但他们同样需要在本地见面、交流和动手创作的机会。',
        responsibilities: ['发起 AI+X 创造节，确定共同的项目安排', '与各地组织者协作推进', '协调 40 座城市的活动安排'],
        outcome: '全国 40 座城市在同一时期开展了活动。',
        reflection: '40 座城市有共同的目标，各地组织者也需要根据当地情况安排活动。',
      },
    },
    {
      id: 'waic-pioneers-night',
      category: 'conference',
      title: "WAIC AI Pioneers' Night",
      year: '2026',
      location: '上海',
      role: '联合发起、项目负责人',
      summary: '我与 WAIC UP MORE、阿里云共同组织 WAIC 官方夜场，负责项目推进、嘉宾邀请和活动内容。',
      result: '约 100 位 AI 开发者、创业者与生态伙伴到场',
      image: '/images/work/01-cover.png',
      imageAlt: "Darren 在 WAIC AI Pioneers' Night 现场开场分享",
      imageClassName: 'object-cover object-center',
      caseStudy: {
        context: '这场 WAIC 官方夜场由 WAIC UP MORE、阿里云与我们共同组织，希望参会者在大会期间有机会在晚间进一步交流。',
        responsibilities: ['共同发起并推进整体项目', '策划活动内容、邀请嘉宾', '协调活动当晚的执行'],
        outcome: '约 100 位 AI 开发者、创业者与生态伙伴到场。',
        reflection: '夜场的议程需要留出交流时间，让参与者有机会把关心的问题聊下去。',
      },
    },
    {
      id: 'rumata-workshop',
      category: 'global',
      title: 'Rumata 产品共创 Workshop',
      heroSummary: '我组织产品体验和交流，让创始人听到开发者的第一轮反馈。',
      year: '2026',
      location: '中国',
      role: '发起人、项目负责人',
      summary: '我邀请以色列 AI 创业者 Nitzan 和 Yoel 来中国。我们组织了一场小型产品 Workshop，让他们直接和开发者及潜在用户坐在一起，听大家实际使用产品之后怎么说。',
      result: '约 50 人参与，完成第一轮产品反馈',
      image: '/images/work/05.jpg',
      imageAlt: 'Rumata Startup Co-creation 产品工作坊现场合影',
      imageClassName: 'object-cover object-center',
      caseStudy: {
        context: '以色列 AI 创业者 Nitzan 和 Yoel 希望了解中国开发者与潜在用户怎样使用 Rumata。这次 Workshop 希望让他们直接听到试用反馈。',
        responsibilities: ['邀请 Nitzan 和 Yoel 来中国，并与创始人确认这一轮的测试目标', '邀请愿意试用产品的开发者和潜在用户', '安排产品体验、提问与反馈，让创始人直接听取使用感受'],
        outcome: '约 50 人参与 Workshop。开发者与潜在用户实际体验了产品，并与创始人面对面交流，团队完成了第一轮产品反馈收集。',
        outcomeNote: '这份记录只包括产品体验和首轮反馈，暂未记录后续的产品调整与使用情况。',
        reflection: '设计这类 Workshop 时，我会先确认团队想验证什么，再考虑邀请谁。把时间留给实际使用，创始人才能听见用户怎样理解产品、在哪里需要解释；这些反馈的价值，需要由团队后续的判断和行动继续验证。',
      },
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
      caseStudy: {
        context: '从 2019 年的普通学习者开始，这项工作逐渐变成一项长期的城市与开发者生态实践。',
        responsibilities: ['连接学习者、开发者、高校与开源贡献者', '与各地组织者协作完成城市活动', '参与并推动多次全国联动项目'],
        outcome: '持续参与城市活动与全国项目，并逐渐承担城市生态责任。',
        reflection: '社区需要持续维护。成员之间的信任，来自一次次一起学习和做事的经历。',
      },
    },
  ],
  collaborations: [
    {
      id: 'developer-events',
      number: '01',
      title: '开发者活动与生态项目',
      bestFor: '准备组织开发者活动、多城市联动或大会合作的团队',
      description: '我做过单城 Workshop、四城系列活动，也负责过 WAIC 官方夜场和 40 城全国联动。合作可以从活动策划开始，再根据需要安排嘉宾邀请、活动执行和后续内容整理。',
      outcomes: ['确定活动目标、参与者和内容安排', '邀请嘉宾、开发者与合作伙伴', '组织活动，并整理活动后的内容记录'],
      invitation: '你也在筹备开发者活动或生态项目？',
      linkLabel: '了解活动与生态合作',
      inquiry: ['团队或项目的简单介绍', '希望邀请哪些人、达成什么目标', '预计时间、城市与规模'],
    },
    {
      id: 'product-workshops',
      number: '02',
      title: 'AI 产品早期用户 Workshop',
      bestFor: '已经有可用产品，希望听到早期用户反馈或接触中国开发者的 AI 团队',
      description: '产品已经可以试用时，我可以组织小范围 Workshop，邀请开发者和潜在用户体验产品，让团队直接听到使用反馈。',
      outcomes: ['明确这次试用要回答的问题', '邀请愿意试用产品的开发者', '整理使用反馈，供团队决定下一步'],
      invitation: '希望组织一次产品试用和交流？',
      linkLabel: '了解产品 Workshop',
      inquiry: ['产品链接与当前可体验的版本', '这一轮最想验证的问题', '预计时间与希望邀请的用户'],
    },
    {
      id: 'ai-talks',
      number: '03',
      title: 'AI 与 Agent 分享',
      bestFor: '企业、大会、高校与开发者社区',
      description: '我分享自己日常使用 AI、搭建 Agent 和管理多 Agent 系统的经验，具体讲任务怎样分工、怎样检查结果，以及哪些地方容易出错。',
      outcomes: ['主题演讲或圆桌交流', '企业内部分享', '结合工作任务动手的工作坊'],
      invitation: '想邀请我分享 AI 或 Agent 的使用经验？',
      linkLabel: '了解 AI 与 Agent 分享',
      inquiry: ['活动或团队的简单介绍', '听众背景与最关心的问题', '预计时间与分享形式'],
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
      summary: 'A developer workshop organized with WeChat Mini Programs in Chengdu and Shanghai. I led the program and worked with the team to plan the content, invite developers, and organize both sessions.',
      result: 'Around 100 participants per workshop',
      image: '/images/work/03.jpg',
      imageAlt: 'Developers and organizers at the WeChat Developer Innovation Workshop in Chengdu',
      imageClassName: 'object-cover object-center',
      caseStudy: {
        context: 'This was a two-city developer program organized with WeChat Mini Programs. The aim was to give developers useful content and a setting where they could exchange ideas with peers.',
        responsibilities: ['Kept the two-city program moving on one shared timeline', 'Co-designed the workshop content with the team', 'Invited developers and organized the Chengdu and Shanghai sessions'],
        outcome: 'Both workshops took place, with around 100 participants at each session.',
        reflection: 'A useful developer event starts by defining what participants should leave with, then choosing the content and scale that support that outcome.',
      },
    },
    {
      id: 'superai-china',
      category: 'global',
      title: 'SuperAI’s China visit',
      year: '2026',
      location: 'Hangzhou · Shanghai · Singapore',
      role: 'Ecosystem partner and local liaison',
      summary: 'I accompanied the SuperAI team through universities, open-source communities, and AI companies in Hangzhou and Shanghai, then represented Datawhale at their conference in Singapore.',
      result: 'Visits and exchanges in Hangzhou, Shanghai, and Singapore',
      image: '/blog/superai-china/team.jpg',
      imageAlt: 'Darren with the SuperAI ecosystem team and China AI community partners',
      imageClassName: 'object-cover object-center',
      noteHref: '/blog/superai-china-ecosystem-visit',
      caseStudy: {
        context: 'The SuperAI team wanted to learn about China’s AI ecosystem. Planning the visits meant understanding each side’s background and the questions they wanted to discuss.',
        responsibilities: ['Helped shape the visit across Hangzhou and Shanghai', 'Connected the team with universities, open-source communities, and AI companies', 'Joined the conversations, then represented Datawhale at SuperAI in Singapore'],
        outcome: 'The Hangzhou and Shanghai visits included Zhejiang University, ModelScope, Qwen, and MiniMax. I published a field note with five observations from the exchange, then represented Datawhale at SuperAI in Singapore.',
        reflection: 'Understanding what each side wants to learn makes it easier to continue the conversation after a visit.',
        materials: [
          {
            type: 'Field note · 2026.05.18',
            title: 'Five Observations from Accompanying the SuperAI Team in Hangzhou and Shanghai',
            description: 'I documented five observations from the conversations, with the visit route and a group photo. The note records what each side wanted to understand and the context needed for useful cross-border exchanges.',
            href: '/blog/superai-china-ecosystem-visit',
          },
        ],
      },
    },
    {
      id: 'agent-speaking',
      category: 'speaking',
      title: 'Talks on Working with 31 Agents',
      year: '2026',
      location: 'Technology events in China and abroad',
      role: 'Author and invited speaker',
      summary: 'After publishing my essay about working with 31 agents, I received invitations to speak. I explain how the agents divide tasks, where they fail, and how I manage the work I delegate to AI.',
      result: 'The essay led to several talks and collaboration invitations',
      image: '/images/work/10.jpg',
      imageAlt: 'Darren speaking at a technology event',
      imageClassName: 'object-cover object-center',
      noteHref: '/blog/managing-31-ai-employees',
      caseStudy: {
        context: 'After an essay about my 31-agent work system was published, companies, conferences, and communities began inviting me to explain the practice in person.',
        responsibilities: ['Mapped the agents\' roles, information flow, and common failure points', 'Adapted the talk for different audiences and settings', 'Used day-to-day tasks to explain how I manage work delegated to AI'],
        outcome: 'I published an essay documenting the 31 agents, 44 automated tasks, and collaboration rules I use in daily work. It led to several talks and collaboration invitations, while the questions from those rooms helped the system keep evolving.',
        reflection: 'The most useful part of an agent talk is rarely a tool list. It is the design of how work is understood, delegated, checked, and improved.',
        materials: [
          {
            type: 'Practice essay · 2026.04.15',
            title: 'Managing 31 AI Employees Changed How I Understand Management',
            description: 'The essay includes the organization chart, agent roles, and product screenshots from that stage of the system. It explains information sharing, delegation, and review rules, alongside failed tasks and automations I disabled.',
            href: '/blog/managing-31-ai-employees',
          },
        ],
      },
    },
    {
      id: 'stepfun-four-cities',
      category: 'ecosystem',
      title: 'StepFun developer series',
      year: '2026',
      location: 'Beijing · Shanghai · Hangzhou · Shenzhen',
      role: 'Series initiator and program lead',
      summary: 'I initiated and led a four-city developer series, working with local communities to reach participants and organize the events.',
      result: 'Nearly 1,000 developers reached across four cities',
      image: '/images/work/14.jpg',
      imageAlt: 'Darren speaking at a StepFun Agent Builders Gathering',
      imageClassName: 'object-cover object-center',
      caseStudy: {
        context: 'The developers and local partners differed in each city, while all four events needed a consistent theme and standard of organization.',
        responsibilities: ['Initiated the series and led the overall program', 'Worked with local communities in Beijing, Shanghai, Hangzhou, and Shenzhen', 'Coordinated participant outreach and event operations'],
        outcome: 'The four-city series reached nearly 1,000 developers.',
        reflection: 'A multi-city program needs a shared plan, with room for local organizers to adapt it to their own communities.',
      },
    },
    {
      id: 'aix-creation-festival',
      category: 'ecosystem',
      title: 'AI+X Creation Festival',
      heroSummary: 'I initiated the festival and worked with local organizers across 40 cities in China.',
      year: '2026',
      location: '40 cities across China',
      role: 'Initiator and program lead',
      summary: 'I initiated the AI+X Creation Festival and worked with local organizers to bring it to 40 cities, so AI learners and developers could meet and build where they lived rather than having to travel to a major hub.',
      result: 'A coordinated program across 40 cities',
      image: '/images/work/11.jpg',
      imageAlt: 'A large group of developers at an AI Creators event',
      imageClassName: 'object-cover object-center',
      caseStudy: {
        context: 'Many AI learners and developers live outside the largest technology hubs. They still need local opportunities to meet, exchange ideas, and build together.',
        responsibilities: ['Initiated the AI+X Creation Festival and agreed on a shared plan', 'Worked with local organizers to move each city forward', 'Coordinated one nationwide program across 40 cities'],
        outcome: 'Local events took place in 40 cities during the same period.',
        reflection: 'Across 40 cities, organizers need a shared purpose and room to adapt events to local needs.',
      },
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
      caseStudy: {
        context: 'This official WAIC evening event, organized with WAIC UP MORE and Alibaba Cloud, created a smaller setting for deeper conversation during a large conference week.',
        responsibilities: ['Co-initiated the event and led the overall program', 'Shaped the content and invited speakers', 'Coordinated the event on the night'],
        outcome: 'Around 100 AI developers, founders, and ecosystem partners attended.',
        reflection: 'An evening event needs time outside the agenda so participants can continue discussing the questions that matter to them.',
      },
    },
    {
      id: 'rumata-workshop',
      category: 'global',
      title: 'Rumata Product Co-creation Workshop',
      heroSummary: 'I brought founders and potential users together to try the product and share early feedback.',
      year: '2026',
      location: 'China',
      role: 'Initiator and program lead',
      summary: 'I invited Israeli AI founders Nitzan and Yoel to China for a small product workshop. They sat down directly with developers and potential users and heard what people thought after trying the product.',
      result: 'Around 50 participants; first round of product feedback collected',
      image: '/images/work/05.jpg',
      imageAlt: 'Participants at the Rumata Startup Co-creation product workshop',
      imageClassName: 'object-cover object-center',
      caseStudy: {
        context: 'Israeli AI founders Nitzan and Yoel wanted to understand how developers and potential users in China would use Rumata. The workshop gave them a chance to hear directly from people trying the product.',
        responsibilities: ['Invited Nitzan and Yoel to China and clarified what this round needed to test with the founders', 'Brought together developers and potential users around hands-on product use', 'Designed a workshop around trying the product, asking questions, and sharing feedback directly with the founders'],
        outcome: 'Around 50 people joined the workshop. Developers and potential users tried the product and spoke directly with its founders, completing the team’s first round of product feedback collection.',
        outcomeNote: 'This record covers hands-on use and initial feedback collection. Follow-up product changes and usage outcomes are not yet documented here.',
        reflection: 'For this kind of workshop, I start with what the team wants to test before deciding whom to invite. Time spent using the product helps founders hear how people understand it and where they need an explanation. The value of that feedback still depends on the team’s subsequent decisions and actions.',
      },
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
      caseStudy: {
        context: 'I joined Datawhale in 2019 to learn AI and gradually took on more work with city communities and developers.',
        responsibilities: ['Connected learners, developers, universities, and open-source contributors', 'Worked with local organizers to deliver city events', 'Helped move multiple nationwide collaborations forward'],
        outcome: 'I continued contributing to city programs and nationwide projects, gradually taking responsibility for the city ecosystem.',
        reflection: 'A community needs ongoing care. Trust grows as its members keep learning and working together.',
      },
    },
  ],
  collaborations: [
    {
      id: 'developer-events',
      number: '01',
      title: 'Developer events and ecosystem programs',
      bestFor: 'Teams planning a developer event, multi-city series, or conference partnership',
      description: 'I have led single-city workshops, a four-city series, an official WAIC evening event, and a 40-city national program. I can help with planning, speaker invitations, running the event, and documenting it afterward, depending on what the team needs.',
      outcomes: ['Agree on the event’s purpose, participants, and content', 'Invite speakers, developers, and partners', 'Run the event and document what happened'],
      invitation: 'Planning a developer event or ecosystem program?',
      linkLabel: 'Explore event and ecosystem collaborations',
      inquiry: ['A short introduction to your team or project', 'Whom you want to reach and what you want to achieve', 'Approximate timing, city, and scale'],
    },
    {
      id: 'product-workshops',
      number: '02',
      title: 'Early-user workshops for AI products',
      bestFor: 'AI teams with a usable product seeking early feedback or conversations with developers in China',
      description: 'When the product is ready to try, I can organize a small workshop with developers and potential users so the team can hear their feedback directly.',
      outcomes: ['Agree on what this round of product testing should answer', 'Invite developers willing to try the product', 'Document the feedback to help the team decide what to do next'],
      invitation: 'Planning a hands-on product workshop?',
      linkLabel: 'Explore a product workshop',
      inquiry: ['A product link and the version people can try', 'The main question you want this round to answer', 'Approximate timing and the users you hope to invite'],
    },
    {
      id: 'ai-talks',
      number: '03',
      title: 'AI and agent talks',
      bestFor: 'Companies, conferences, universities, and developer communities',
      description: 'I share lessons from using AI, building agents, and managing a multi-agent system in my daily work: how I divide tasks, check results, and deal with things going wrong.',
      outcomes: ['Keynotes or panel conversations', 'Private sessions for teams', 'Hands-on workshops using day-to-day work tasks'],
      invitation: 'Would an AI or agent talk be useful for your team?',
      linkLabel: 'Explore AI and agent talks',
      inquiry: ['A short introduction to your event or team', 'The audience’s background and main questions', 'Approximate timing and session format'],
    },
  ],
};

const portfolioImageDimensions: Record<string, { width: number; height: number }> = {
  '/images/work/03.jpg': { width: 3200, height: 2100 },
  '/blog/superai-china/team.jpg': { width: 1922, height: 1280 },
  '/images/work/10.jpg': { width: 1600, height: 1067 },
  '/images/work/14.jpg': { width: 2064, height: 3200 },
  '/images/work/11.jpg': { width: 3200, height: 2134 },
  '/images/work/01-cover.png': { width: 1620, height: 1080 },
  '/images/work/05.jpg': { width: 1706, height: 1279 },
  '/images/work/12.jpg': { width: 1920, height: 1279 },
};

export function getPortfolio(locale: string): PortfolioContent {
  const portfolio = locale === 'zh' ? chinesePortfolio : englishPortfolio;

  return {
    ...portfolio,
    work: portfolio.work.map((item) => {
      const dimensions = item.image ? portfolioImageDimensions[item.image] : undefined;

      if (item.image && !dimensions) {
        throw new Error(`Missing image dimensions for portfolio asset: ${item.image}`);
      }

      return {
        ...item,
        href: `/work/${item.id}`,
        imageWidth: dimensions?.width,
        imageHeight: dimensions?.height,
      };
    }),
  };
}

export function getWorkById(locale: string, id: string): PortfolioWork | null {
  return getPortfolio(locale).work.find((item) => item.id === id) ?? null;
}

const workCollaborationIds: Record<string, CollaborationPath['id']> = {
  'wechat-innovation-workshop': 'developer-events',
  'superai-china': 'developer-events',
  'agent-speaking': 'ai-talks',
  'stepfun-four-cities': 'developer-events',
  'aix-creation-festival': 'developer-events',
  'waic-pioneers-night': 'developer-events',
  'rumata-workshop': 'product-workshops',
  'datawhale-city-ecosystem': 'developer-events',
};

export function getWorkCollaboration(locale: string, workId: string): CollaborationPath | null {
  const collaborationId = workCollaborationIds[workId];

  return getPortfolio(locale).collaborations.find((item) => item.id === collaborationId) ?? null;
}

export function getAllWorkIds(): string[] {
  return Array.from(new Set([...chinesePortfolio.work, ...englishPortfolio.work].map((item) => item.id)));
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

const portfolioFieldStories = [
  {
    workId: 'wechat-innovation-workshop',
    shape: 'wide',
    place: { zh: '成都', en: 'Chengdu' },
  },
  {
    workId: 'stepfun-four-cities',
    shape: 'portrait',
    place: { zh: '中国', en: 'China' },
  },
  {
    workId: 'datawhale-city-ecosystem',
    shape: 'wide',
    place: { zh: '北京', en: 'Beijing' },
  },
] as const;

const supplementalFieldStories: Record<'zh' | 'en', FieldStory[]> = {
  zh: [
    {
      id: 'global-ai-builders-talk',
      src: '/images/work/19.jpg',
      imageAlt: '在新加坡举行的全球 AI 创造者分享现场',
      title: '全球 AI 创造者分享',
      place: '新加坡',
      role: '分享嘉宾',
      result: '在新加坡介绍中国开发者社区与 Agent 实践',
      shape: 'portrait',
    },
    {
      id: 'global-developer-ecosystem',
      src: '/images/work/21.jpg',
      imageAlt: '在新加坡举行的全球开发者生态交流现场',
      title: '全球开发者社区交流',
      place: '新加坡',
      role: '生态伙伴',
      result: '认识不同地区的创业者与社区伙伴',
      shape: 'wide',
    },
    {
      id: 'ai-founder-roundtable',
      src: '/images/work/08.jpg',
      imageAlt: '在上海举行的 AI 创业圆桌现场',
      title: 'AI 创业圆桌',
      place: '上海',
      role: '圆桌嘉宾、组织者',
      result: '围绕 AI 产品和创业实践展开讨论',
      shape: 'wide',
    },
  ],
  en: [
    {
      id: 'global-ai-builders-talk',
      src: '/images/work/19.jpg',
      imageAlt: 'Darren speaking at a global AI builders event in Singapore',
      title: 'Global AI Builders Talk',
      place: 'Singapore',
      role: 'Invited speaker',
      result: 'Spoke in Singapore about China’s developer communities and my work with agents',
      shape: 'portrait',
    },
    {
      id: 'global-developer-ecosystem',
      src: '/images/work/21.jpg',
      imageAlt: 'A global developer ecosystem gathering in Singapore',
      title: 'Global Developer Community Gathering',
      place: 'Singapore',
      role: 'Ecosystem partner',
      result: 'Met founders and community partners from different regions',
      shape: 'wide',
    },
    {
      id: 'ai-founder-roundtable',
      src: '/images/work/08.jpg',
      imageAlt: 'An AI founder roundtable in Shanghai',
      title: 'AI Founder Roundtable',
      place: 'Shanghai',
      role: 'Panelist and organizer',
      result: 'Discussed AI products and early-stage company building',
      shape: 'wide',
    },
  ],
};

export function getFieldStories(locale: string): FieldStory[] {
  const safeLocale = locale === 'zh' ? 'zh' : 'en';
  const workById = new Map(getPortfolio(safeLocale).work.map((item) => [item.id, item]));
  const linkedStories = portfolioFieldStories.map(({ workId, shape, place }) => {
    const work = workById.get(workId);

    if (!work?.image) {
      throw new Error(`Missing portfolio work or image for field story: ${workId}`);
    }

    return {
      id: work.id,
      src: work.image,
      imageAlt: work.imageAlt ?? work.title,
      title: work.title,
      place: place[safeLocale],
      role: work.role,
      result: work.result,
      shape,
    };
  });

  return [...linkedStories, ...supplementalFieldStories[safeLocale]];
}
