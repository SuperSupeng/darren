import { englishContent } from './en';
import type { LocalizedContent } from './types';

export const chineseContent: LocalizedContent = {
  ...englishContent,
  home: {
    hero: {
      eyebrow: "HANGZHOU · CHINA / 2019—NOW",
      title: "这一年，我见了很多开发者，也花了很多时间帮助 AI 产品接触用户。",
      subtitle:
        "这一年里，我发起和负责了几场开发者活动，也曾邀请两位以色列创始人带着产品来中国，和早期用户面对面交流。那篇关于 31 个 Agent 的文章发出以后，又有不少人邀请我去分享 AI 使用和 Agent 构建。",
      primaryCta: "查看代表项目",
      secondaryCta: "了解合作方式",
      quietLine:
        "Datawhale 城市生态负责人 · AGI Villa、MatchPoint 联合创始人 · GlobalTechEvents 创造者",
      imageAlt: "Darren Su 在科技活动现场交流",
      note: "常驻杭州，在中国与全球科技现场持续工作。",
    },
    problems: {
      eyebrow: "你可能正在问",
      title: "真正卡住的，不是要不要出海。",
      subtitle:
        "更常见的问题是：哪个区域值得先去，在哪里找种子用户，什么说法能被用户理解，如何用最低成本拿到反馈。",
      items: [
        {
          title: "第一批该找谁？",
          description:
            "不是越多越好。可能是开发者、社区组织者、渠道合作伙伴或行业合作方。",
        },
        {
          title: "怎么讲才能得到用户信任？",
          description:
            "海外开发者、渠道、合作伙伴和客户关心的不是同一件事。先把对方在意的问题讲清楚。",
        },
        {
          title: "怎么用最低成本拿到反馈？",
          description:
            "一次线下交流、工作坊或拜访，往往比大规模推广更能说明是否值得继续。",
        },
      ],
    },
    services: {
      eyebrow: "服务",
      title: "把出海问题，收敛成一次可执行的海外反馈试点。",
      subtitle:
        "先判断第一批海外用户在哪里，再梳理相关动作，最后设计一个足够小、但能收集反馈的试点。",
      support:
        "适合已有产品要被海外看见，但还不确定第一批用户、场景和下一步投入的团队。",
    },
    work: {
      eyebrow: "案例",
      title: "过往我是如何帮助团队验证问题的。",
      subtitle:
        "当前先保留案例结构，后续补充真实名称、数据、照片和结果。重点不是展示热闹，而是看一次合作如何产生判断和后续。",
    },
    method: {
      eyebrow: "工作方式",
      title: "先把问题说清楚，再决定怎么验证它。",
      description:
        "我会先判断现在最需要验证的假设，而不是直接建议铺渠道、办活动或做本地化。",
      steps: [
        {
          title: "把问题变具体",
          description:
            "你想把什么带到海外？为什么现在要看海外？这次反馈要帮助团队做什么决定？",
        },
        {
          title: "找愿意认真提出反馈的人",
          description:
            "从海外开发者社区、线下活动、合作伙伴，筛出和当下问题真正相关的人。",
        },
        {
          title: "设计能产生反馈的场景",
          description:
            "形式可能是一次线下交流、工作坊或拜访，让用户能真实提出反馈。",
        },
        {
          title: "把反馈变成决定",
          description:
            "试验结束后判断：继续找伙伴、做公开活动、准备本地化、扩大试点，还是先暂停。",
        },
      ],
    },
    proof: {
      eyebrow: "为什么是我",
      title: "信任来自长期在产品、社区和活动现场做判断。",
      subtitle:
        "我是 Datawhale 城市生态负责人，长期接触 AI 学习者、开发者，经常组织在地活动；也是 AGI Villa 联合创始人，持续和全球 AI 创造者、早期产品团队、创业者讨论产品和组织活动。",
      closingLine:
        "通过这些经历，我可以快速判断谁适合先接触、什么邀请会被认真对待、哪些路径现在不该做。",
    },
    fieldNotes: {
      eyebrow: "手记",
      title: "把做过的事情和当时的想法写下来。",
      subtitle:
        "我会写项目经验与复盘、全球化观察、产品实践经验，以及中国团队出海时真正遇到的问题。",
      sectionEyebrow: "观察与记录",
      noteLine:
        "欢迎联系我，找到真正有价值的问题。",
    },
    productLab: {
      eyebrow: "产品",
      title: "持续创造产品，也是我理解现实的一种方式。",
      subtitle:
        "产品与数字组织让我始终贴近真实用户、分发和日常运行，而不是只停留在活动与观点里。",
    },
    about: {
      eyebrow: "关于 Darren",
      title: "Darren Su / 苏鹏：在产品、社区与全球科技生态之间工作。",
      description:
        "我是 Datawhale 城市生态负责人、AGI Villa 与 MatchPoint 联合创始人，也是 GlobalTechEvents 创造者和多 Agent 数字组织实践者。",
      closingLine: "理解当时的问题，找到合适的人，把事情认真做完。",
      cta: "更完整地了解我",
    },
  },
  labels: {
    ...englishContent.labels,
    explore: "了解",
    viewCollaborationPaths: "查看合作方式",
    viewProductLab: "查看产品",
    viewWork: "查看案例",
    draftCase: "案例结构",
    services: {
      ...englishContent.labels.services,
      eyebrow: "服务",
      title: "先找到合适的用户，再决定出海策略。",
      subtitle:
        "面向中国 AI 创业者、开发者工具、机器人/硬件和创新团队：把出海想法拆成优先区域、种子用户、可信触达路径和低成本海外反馈试点。",
      roomEyebrow: "合作入口",
      entranceEyebrow: "先从验证开始",
      entranceQuote: "先别急着做全球化计划。先知道目标用户是谁、为什么在意、真实反馈会不会改变下一步。",
      mainEyebrow: "核心服务",
      mainTitle: "三种最常见的合作入口。",
      mainDescription:
        "先判断区域和用户，再找到合适的切入点，最后跑一次低成本海外反馈试点拿到反馈。",
      secondaryEyebrow: "其他合作形式",
      secondaryTitle: "不知道如何开始，可以先聊聊。",
      secondaryDescription:
        "如果现在还只有模糊想法，可以先一起把它收敛成一个可验证的问题。",
      ctaEyebrow: "联系入口",
      problem: "你现在在什么阶段",
      help: "我会怎么帮助",
      outcomes: "你能带走什么",
      bestFor: "适合",
    },
    productLab: {
      ...englishContent.labels.productLab,
      roomEyebrow: "产品与系统",
      sideEyebrow: "为什么做产品",
      sideQuote: "只在讨论里，一个想法常常显得很合理。做成产品交给用户以后，问题才会具体起来。",
      selectedEyebrow: "目前的产品",
      selectedStatement:
        "这三个产品的起点都很具体：有的是几位创始人反复提到的招聘问题，有的是我自己查找科技活动、组织城市项目时遇到的麻烦。",
      projectLabel: "项目",
      visitProject: "访问项目",
      explainerEyebrow: "为什么还在做",
      explainerTitle: "产品上线以后，判断才刚刚开始。",
      problem: "问题",
      signal: "反馈",
      nextStep: "下一步",
      explainerItems: [
        {
          title: "先让用户看到它",
          description:
            "当一个想法变成页面、工具或具体流程，用户能不能理解、愿不愿意使用，很快就会变得具体。",
        },
        {
          title: "再看实际怎么用",
          description:
            "上线以后，我会继续看用户从哪里来、在哪一步离开，哪些反馈说明原来的设想需要调整。",
        },
        {
          title: "也允许它停下来",
          description:
            "有些实验不会变成长期产品。它们仍然会留下答案：需求是否真的存在，问题是不是太宽，或者现在还不是合适的时间。",
        },
      ],
    },
    fieldNotes: {
      ...englishContent.labels.fieldNotes,
      roomEyebrow: "文章",
      sidebarEyebrow: "写在前面",
      sidebarQuote: "这些文章大多从一次活动、一个产品问题，或者一段亲身经历开始。",
      themesEyebrow: "主线",
      themesTitle: "我主要记录四类内容。",
      themesDescription:
        "AI 与 Agent、开发者生态、产品创造和长期实践。每一类都尽量来自真实做过的事情。",
      latestEyebrow: "最新",
      recentTitle: "最近写下的内容",
      recentDescription: "目前整理的内容从多 Agent 工作系统，到跨境科技访问和禅修经历。",
      empty: "手记正在整理中。",
      minRead: "分钟阅读",
    },
    about: {
      ...englishContent.labels.about,
      roomEyebrow: "关于我",
      eyebrow: "关于",
      kernelEyebrow: "几段经历",
      kernelTitle: "回头看，这几段经历对我影响比较大。",
      kernelDescription: "它们并不完全在计划之中，但每一段都改变了我后来关注的问题。",
      pullQuote:
        "这些年做社区，我越来越觉得，生态并不是一份联系人名单。它更接近一群人慢慢形成的理解、信任，以及愿意一起做事的关系。",
      workEyebrow: "现在在做什么",
      workTitle: "现在，我的时间主要花在这些事情上。",
      workItems: [
        "发起并负责 AI 开发者项目、多城市联动与大会生态合作。",
        "帮助海外 AI 产品在中国接触开发者，组织体验并收集早期反馈。",
        "分享自己使用 AI、构建 Agent 和运行多 Agent 工作系统的经验。",
        "继续做 MatchPoint、GlobalTechEvents 和 AI+X Events。",
      ],
    },
    work: {
      roomEyebrow: "案例室",
      typeEyebrow: "案例类型",
      typeTitle: "这里应该证明什么。",
      typeDescription:
        "这里会说明当时的问题、参与者、我做的工作，以及最后留下了什么。",
      detailsEyebrow: "案例",
      context: "背景",
      goal: "目标",
      workDone: "我做了什么",
      happened: "发生了什么",
      learned: "我学到什么",
      reusablePattern: "可复用模式",
    },
  },
  serviceItems: [
    {
      ...englishContent.serviceItems[0],
      title: "出海第一步判断",
      short:
        "当出海想法还很散时，先判断哪些区域值得看、第一批用户在哪里，以及现在最适合从哪一步开始。",
      bestFor:
        "已经有产品、开源项目、机器人/硬件能力或活动想法，但还不知道优先区域和第一批海外用户在哪里的团队。",
      problem:
        "你知道海外重要，但信息很散：不同区域、用户、渠道、社区和合作机会很多，不知道哪个和当下产品真正相关。",
      help:
        "我会围绕你的产品、目标市场和反馈目标，把问题拆成几个可判断的假设，说明优先区域、种子用户和现在最值得试的动作。",
      outcomes: ["优先区域和种子用户判断", "哪些渠道和动作现在先不做", "一个低成本试点形式：线下交流、工作坊、拜访或反馈会"],
    },
    {
      ...englishContent.serviceItems[1],
      title: "海外用户与渠道梳理",
      short:
        "围绕一个具体产品或合作目标，梳理海外种子用户、社区、渠道、活动和伙伴，找出值得优先接近的切入点。",
      bestFor:
        "已经有产品、开源项目、活动概念或合作目标，需要一条更可信出海路径的中国团队。",
      problem:
        "你不缺随机联系人列表。你需要知道目标用户在哪里、对方为什么会在意、什么渠道能建立信任。",
      help:
        "我会帮你定义用户画像，梳理潜在渠道和伙伴，判断优先级，并设计一个对双方都有意义的第一次接触方式。",
      outcomes: ["一份有优先级的海外用户、渠道和伙伴清单", "一条具体触达和信任建立路径", "一个反馈、演示、工作坊或会边活动的小实验设计"],
    },
    {
      ...englishContent.serviceItems[2],
      title: "低成本海外反馈试点",
      short:
        "把产品、项目或活动放到海外相关用户面前，跑一次足够小、但能看清反应的反馈试点。",
      bestFor:
        "已经准备把真实产品、开源项目、机器人/硬件能力或活动概念放到海外相关用户面前的团队。",
      problem:
        "你需要真实海外反馈。大规模宣传太早，内部猜测又不够，需要一个能产生有效反应的小场景。",
      help:
        "我会帮你设计形式、邀请相关用户或伙伴、组织现场，并把反馈整理成下一步策略判断。",
      outcomes: ["相关海外用户进入一个聚焦场景", "真实产品、市场或合作反馈", "判断下一步是深入、本地化、暂停、公开还是扩大"],
    },
  ],
  secondaryServices: [
    {
      ...englishContent.secondaryServices[0],
      title: "海外现场访问设计",
      short:
        "为创始人、产品团队、创新团队或机构设计一次主题明确的海外用户和生态访问。",
      bestFor:
        "想实地理解海外用户、开发者社区、展会、活动，但不想变成泛泛参观的中国团队。",
      problem:
        "你想通过真实的人和地方理解海外市场，而不是只读报告或做线上研究。",
      help:
        "我会帮你定义主题、设计访问结构，并判断哪些拜访和交流真正有助于下一步出海决策。",
      outcomes: ["一条主题明确的海外访问结构", "相关用户、社区、公司、会议或活动节点", "对未来市场切入点的更好判断"],
    },
    {
      ...englishContent.secondaryServices[1],
      title: "早期出海问题诊断",
      short:
        "当问题还比较宽时，先把一个泛泛的海外想法缩小成可执行的验证项目。",
      bestFor:
        "知道海外重要，但还说不清楚当前最应该验证什么的团队。",
      problem:
        "当前需求还不够清楚，不适合立刻找渠道、办活动或做试点。",
      help:
        "我会帮你缩小问题、判断需要什么证据，并建议下一步是方向判断、用户与渠道梳理、现场访问还是低成本反馈试点。",
      outcomes: ["一个更清楚的出海验证问题", "知道哪些事现在不该做", "一个建议的下一步合作形式"],
    },
  ],
  work: {
    hero: {
      eyebrow: "案例",
      title: "看一次合作，如何从想法变成可验证的出海策略。",
      subtitle:
        "这里先展示案例结构，后续补充真实名称、数据、照片和结果。重点是看我如何把产品问题、种子用户、反馈场景和下一步策略组织起来。",
    },
    caseTypes: [
      {
        title: "方向判断与市场访问",
        description:
          "帮助中国创始人、产品团队和机构，通过真实的人和地方理解海外用户、渠道和合作网络。",
      },
      {
        title: "低成本反馈试点",
        description:
          "用线下交流、工作坊、产品反馈会和线下拜访，从海外相关用户那里拿到能改变下一步的反馈。",
      },
      {
        title: "渠道和长期项目",
        description:
          "更长期的渠道、社区和生态项目，用来说明跨境连接、信任建立和后续推进能力。",
      },
    ],
    cases: [
      {
        ...englishContent.work.cases[0],
        title: "中国 AI 产品团队的出海第一步判断",
        type: "方向判断",
        status: "案例结构 - 真实细节待补充",
        location: "线上 / 海外",
        summary:
          "一个中国 AI 产品团队想知道：哪个区域值得先看、第一批种子用户是谁、怎么介绍产品、下一步是否值得继续。",
        context:
          "团队有产品方向，也希望出海，但海外信息很分散。当时最需要的不是完整全球化计划，而是一次清楚的第一步判断。",
        goal:
        "帮助团队判断优先区域、第一批值得接触的用户和场景，并形成一个低成本反馈试点方案。",
        workDone: [
          "先澄清产品问题，以及哪类海外反馈真正有助于下一步策略。",
          "梳理相关区域、社区、活动、渠道和潜在种子用户。",
          "把宽泛的出海想法拆成现实可做的一次低成本反馈试点。",
        ],
        happened: [
          "团队看清了哪些海外用户可能关心，哪些假设还需要测试。",
          "几个后续接触路径变得可以评估。",
          "这次梳理形成了一个更清晰的第一步验证方案。",
        ],
        learned:
          "对中国团队来说，出海第一阶段最有价值的结果往往不是立刻增长，而是知道哪个区域、用户和问题值得先测。",
        reusablePattern:
          "区域判断 + 种子用户地图 + 低成本反馈试点：把出海想法转成可执行策略。",
        tags: ["出海方向", "AI 产品", "种子用户"],
      },
      {
        ...englishContent.work.cases[1],
        title: "开发者工具出海的用户与渠道梳理",
        type: "用户与渠道",
        status: "案例结构 - 真实细节待补充",
        location: "线上 / 全球",
        summary:
          "一个中国开发者工具团队想判断：应该先靠近哪些海外开发者、社区、会议和渠道。",
        context:
          "团队已有产品，也想做海外，但还不知道应该先找用户、社区、开源项目、意见领袖、渠道伙伴还是公开活动。",
        goal:
          "帮助团队形成对目标海外市场的共同理解，并建议一个可信的第一路径。",
        workDone: [
          "围绕产品类别梳理可能相关的海外用户和渠道。",
          "解释不同社区、会议、开源节点和渠道会如何理解这个产品。",
          "列出可行选项：反馈会、演示交流、线下交流、会边活动、伙伴发现，或者先暂停直到产品更成熟。",
        ],
        happened: [
          "团队把宽泛的出海野心和当下可测试的增长问题分开了。",
          "下一步从公开推广调整成更小的反馈场景。",
          "团队也知道了哪些用户和渠道暂时不适合接触。",
        ],
        learned:
          "好的出海方向判断应该减少错误开始。它的价值不只是告诉团队做什么，也包括告诉团队现在不要做什么。",
        reusablePattern:
          "用户梳理 + 渠道判断 + 第一次测试建议。",
        tags: ["开发者工具", "海外用户", "渠道判断"],
      },
      {
        ...englishContent.work.cases[2],
        title: "机器人 / AI 硬件团队的海外产品反馈试点",
        type: "反馈试点",
        status: "案例结构 - 真实细节待补充",
        location: "线上 / 海外",
        summary:
          "一次聚焦的产品反馈试点，用来测试海外用户、开发者或合作方如何理解中国机器人和 AI 硬件能力。",
        context:
          "海外团队对中国机器人、具身智能和供应链能力感兴趣，但中国团队需要更清楚地讲产品、交付和合作边界。",
        goal:
          "设计一个小型海外反馈场景，看清产品叙事、演示方式、信任表达和后续合作问题。",
        workDone: [
          "把交流设计成先看真实演示，而不是公司介绍。",
          "邀请对机器人、硬件、AI 应用或采购合作有真实问题的人。",
          "围绕产品理解、可信度、交付边界和后续合作收集反馈。",
        ],
        happened: [
          "团队知道了海外受众真正看重哪些信息。",
          "部分合作问题从泛泛兴趣变成可继续追问的问题。",
          "这个形式为之后的海外低成本反馈试点留下经验。",
        ],
        learned:
          "中国硬件和机器人团队出海时，不能只讲成本和速度，也要讲清产品、质量、交付和合作边界。",
        reusablePattern:
          "先演示再反馈：短背景、真实演示、聚焦问题、反馈整理、后续策略判断。",
        tags: ["机器人", "AI 硬件", "海外反馈"],
      },
      {
        ...englishContent.work.cases[3],
        title: "开源项目的海外工作坊反馈试点",
        type: "反馈试点",
        status: "案例结构 - 真实细节待补充",
        location: "线上 / 海外活动",
        summary:
          "一次聚焦工作坊试点，帮助中国开源或开发者工具项目在海外开发者面前获得真实反馈。",
        context:
          "很多项目想进入海外开发者生态，但直接做大宣传往往太早。更有效的方式是先设计一个小而具体的互动场景。",
        goal:
          "建立一种可复用活动形式，让项目更容易被理解、被批评，也更容易连接到合适的人。",
        workDone: [
          "提前定义工作坊或会边活动的主题和参与预期。",
          "帮助团队说明自己在测试什么、需要什么反馈。",
          "围绕产品清晰度、开发者需求、分发和潜在伙伴组织反馈。",
        ],
        happened: [
          "项目通过反馈变得更容易被海外开发者理解。",
          "参与者围绕具体演示找到建议者或后续对话。",
          "这个形式成为之后海外产品反馈和种子用户验证的可复用模式。",
        ],
        learned:
          "海外开发者活动不是路演。它应该围绕产品清晰度、真实使用场景和用户反馈制造有用压力。",
        reusablePattern:
          "产品演示 + 聚焦问题 + 反馈整理 + 后续跟进。",
        tags: ["开源", "Workshop", "海外用户"],
      },
      {
        ...englishContent.work.cases[4],
        title: "Datawhale 城市实践：理解中国团队出海前的产品与用户基础",
        type: "社区实践",
        status: "长期实践",
        location: "中国",
        summary:
          "长期城市社区工作，把 AI 学习者、开源贡献者、高校和本地活动连接成更活跃的实践路径，也让我更理解中国团队出海前的真实产品和用户基础。",
        context:
          "AI 学习社区如果只分发内容，很容易变得被动。更有效的路径是让学习者走向实践、贡献和创造。",
        goal:
          "建立本地活动循环，让学习者、开发者、高校和组织者能见面、实践并一起创造机会。",
        workDone: [
          "组织和支持城市级 AI 学习与实践活动。",
          "连接学习者、贡献者、高校和本地技术社区。",
          "观察哪些社区机制能让人从学习走向行动。",
        ],
        happened: [
          "本地 AI 活动和真实的人连接得更紧，而不只是线上内容。",
          "这些工作提供了长期理解中国 AI 学习者和开发者的现场。",
          "它强化了我对中国团队如何找到海外种子用户和建立信任的底层理解。",
        ],
        learned:
          "生态信任建立得很慢。公开可见的是活动，更深的价值是理解人如何从兴趣走向参与。",
        reusablePattern:
          "学习社区到实践循环：内容、本地聚会、项目实践、组织者成长和后续连接。",
        tags: ["Datawhale", "开源", "社区"],
      },
    ],
  },
  proofItems: [
    {
      title: "我长期接触中国开发者和早期创造者",
      label: "中国现场",
      description:
        "Datawhale 的城市生态工作，让我理解中国科技生态，团队出海前真实的产品基础、用户基础和表达难点。",
    },
    {
      title: "我知道海外 AI 创造者如何判断一个产品",
      label: "海外现场",
      description:
        "在 AGI Villa，我持续和全球 AI 创造者、早期团队、创业者讨论产品，也知道什么增长方式更容易被海外接受。",
    },
    {
      title: "我自己也在产品里验证用户和分发",
      label: "产品实践",
      description:
        "自己做软件和生态型产品，会不断遇到需求、分发、反馈和取舍的问题，所以会更清楚真实问题到底在哪里。",
    },
    {
      title: "我能把一次交流设计成有效反馈",
      label: "反馈场景",
      description:
        "我参与和组织过多场 AI 与科技社区活动，熟悉从议题设计、用户邀请、现场互动到后续连接的完整过程。",
    },
  ],
  fieldNotes: {
    hero: {
      eyebrow: "手记",
      title: "我会在一件事做完以后，把当时发生的事和自己的理解写下来。",
      subtitle:
        "这里有项目结束后的复盘，也有我做产品、使用 Agent、参加科技活动和禅修时留下的记录。它们不一定完整，有些理解也还会继续变化。",
    },
    categories: [
      {
        title: "项目复盘",
        description:
          "记录活动、反馈会、海外访问和合作项目：目标是什么，现场发生了什么，反馈如何改变下一步。",
        scope: ["活动复盘", "反馈试点", "现场访问"],
      },
      {
        title: "生态观察",
        description:
          "观察海外开发者社区、会议、开源网络、创业者和渠道节点，判断哪些路径值得靠近。",
        scope: ["海外生态", "会议活动", "渠道节点"],
      },
      {
        title: "产品实验",
        description:
          "记录我自己做软件和生态型产品时，对需求、分发、用户反馈和市场时机的判断。",
        scope: ["产品实验室", "用户反馈", "分发"],
      },
      {
        title: "内在基础",
        description:
          "长期做事、禅修冥想，以及快节奏里的清楚判断。",
        scope: ["长期做事", "禅修冥想", "清楚判断"],
      },
    ],
  },
  products: {
    hero: {
      eyebrow: "产品",
      title: "MatchPoint、GlobalTechEvents 和 AI+X Events，都来自我在工作里反复遇到的问题。",
      subtitle:
        "MatchPoint 处理人才匹配，GlobalTechEvents 整理全球科技活动，AI+X Events 服务 Datawhale 的城市活动。我也长期运行一套多 Agent 工作系统。",
    },
    digitalOrganization: {
      eyebrow: "AI 原生工作系统",
      title: "我也把 31 个 Agent 放进了自己的日常工作。",
      description:
        "这套系统目前有 31 个专业 Agent 和 44 个自动任务，处理研究、产品、内容、运营和个人知识管理。我每天都在使用它，也会根据真实工作中出现的问题继续调整。",
      primaryMetric: "31 个专业 Agent",
      secondaryMetric: "44 个自动任务",
      image: "/blog/ai-employees/digital-organization.png",
      imageAlt: "Darren 的多 Agent 数字组织结构图",
      href: "/blog/managing-31-ai-employees",
      linkLabel: "阅读完整实践",
    },
    items: [
      {
        id: "matchpoint",
        name: "MatchPoint",
        tagline: "职业探索与岗位匹配",
        description:
          "求职者可以先和 AI 讨论自己的方向，再进一步了解具体岗位。平台也会记录候选人在实际任务中的思考和行动，补充简历很难呈现的部分。",
        image: "/projects/matchpoint.png",
        url: "https://matchpoint.careers",
        status: "运行中",
        problem:
          "简历很难说明一个人遇到陌生问题时会怎么想、怎么做；候选人也很难只凭职位描述理解这份工作的日常。",
        signal:
          "公开网站、候选人和企业两端的流程、运营工作台及远程 MCP 都已经上线。产品也已经用于实际招聘，目前还在根据双方的使用情况继续调整。",
        nextStep:
          "继续用于实际招聘，根据候选人和团队的反馈调整职业探索、岗位理解和申请流程。",
        tags: ["AI Native", "职业", "Agent"],
      },
      {
        ...englishContent.products.items[1],
        tagline: "全球科技活动索引",
        description:
          "把分散在不同城市和平台上的科技活动整理到一起，方便我和其他用户了解接下来有哪些会议与社区活动。",
        status: "运行中",
        problem:
          "这些信息散落在不同网站、城市和社区里。每次做海外研究或安排出行，都要重新寻找和核对。",
        signal:
          "我会在做海外研究和行程规划时实际使用它，也能从中看到不同地区最近在讨论什么。",
        nextStep:
          "继续补充活动信息，也继续用它支持自己的海外研究和行程规划。",
        tags: ["全球生态", "活动", "市场情报"],
      },
      {
        ...englishContent.products.items[2],
        tagline: "AI+X 社区活动日历",
        description:
          "集中收录 Meetup、Workshop、Hackathon，以及高校、城市和产业相关的 AI 活动，用户也可以自己提交和订阅。",
        status: "运行中",
        problem:
          "AI 活动信息散落在不同社区和平台，学习者很难持续找到本地可以参加的活动，组织者也缺少一个稳定的发布入口。",
        signal:
          "活动日历由社区一起维护。对参与者来说更容易找到本地活动，对组织者来说也多了一个稳定的发布入口。",
        nextStep:
          "继续扩大活动覆盖，也让提交、订阅和发起本地活动的流程更简单。",
        tags: ["Datawhale", "AI+X", "社区活动"],
      },
      {
        ...englishContent.products.items[3],
        tagline: "一次已经结束的跨境人才实验",
        description:
          "这个项目曾尝试把企业与国际学生、年轻创作者连接起来，为双方找到第一份具体的项目或实习合作。",
        status: "已停止",
        problem:
          "双方都有合作意愿，但缺少一个足够具体、也能建立信任的开始。",
        signal:
          "这次实验让我感觉，具体项目和实习可能比一个宽泛的人才社区更容易成为合作的起点。",
        nextStep:
          "实验已经结束；关于具体项目、信任建立和早期人才匹配的经验，会保留到后续实践中。",
        tags: ["人才", "亚洲", "社区"],
      },
    ],
  },
  about: {
    hero: {
      title: "Darren Su / 苏鹏",
      subtitle:
        "我常驻杭州。最早做工程，2019 年因为学习 AI 进入 Datawhale，后来开始组织开发者活动和城市项目。现在我也在做自己的产品，并用一套多 Agent 系统处理日常工作。",
      tags: ["AI 生态项目负责人", "AGI Villa 与 MatchPoint 联合创始人", "Datawhale 城市生态负责人", "GlobalTechEvents 创造者"],
    },
    kernel: [
      {
        title: "我最早做的是工程",
        description:
          "2021 年，我在 PingCAP 做 TiCDC 研发，后来做过 AI Infra、向量数据库、AI-Native SaaS、商业化和 AI 中台。这段经历让我习惯先看一项技术解决了什么问题，又会在哪个环节被实际使用。",
      },
      {
        title: "后来，我在 Datawhale 待了很长时间",
        description:
          "2019 年因为学习 AI 接触 Datawhale，后来做过助教、活动组织者，也参与城市生态和社区治理。我见过一些原本互不认识的人，因为共同学习和一起做事，慢慢成为项目伙伴。",
      },
      {
        title: "后来，我和朋友一起发起了 AGI Villa",
        description:
          "我和 Monica 发起 AGI Villa，是想把对 AI 感兴趣的创业者、产品人和开发者带到同一个社区里，看看会不会有合作和新项目从中发生。这个过程让我认识了许多全球 AI 创业者，也接触到不少还在寻找早期用户的团队。",
      },
      {
        title: "再后来，我开始自己做产品",
        description:
          "我联合创办 MatchPoint，也做了 GlobalTechEvents，并持续运行一套由 31 个 Agent 组成的工作系统。产品上线以后，用户从哪里来、为什么留下，以及要不要继续做，都需要在日常运营里回答。",
      },
      {
        title: "我也一直保留禅修和公益实践",
        description:
          "这些事情不会替我做决定，但会提醒我多看一眼自己的动机，也认真对待变化最终落在谁身上。"
      },
    ],
    whyThisWork: {
      eyebrow: "为什么做这件事",
      title: "我为什么会同时做社区和产品。",
      quote:
        "在社区里，我能看到人为什么愿意参与；做产品时，我会更快知道一个想法有没有人需要。",
      body:
        "组织活动时，我会直接看到一群人为什么愿意来、他们在哪个环节开始投入，以及哪些关系会在活动结束后继续。做产品则更直接：页面上线、用户进入流程以后，原来的设想很快就会遇到具体反馈。这两种工作一直在互相提醒我，连接人和创造产品离得并不远，都需要理解对方为什么需要，又愿不愿意继续参与。",
      points: [
        "AI 让做出一个新产品变得更快，但怎么找到用户并没有因此变得简单。",
        "社区不会自动带来增长。只有人愿意长期参与，信任和反馈才会慢慢积累起来。",
        "自己负责项目和产品，会迫使我不断面对用户、合作伙伴和日常运营里的具体限制。",
      ],
    },
  },
  cta: {
    title: "如果你也在处理类似的问题，欢迎给我写信。",
    description:
      "可以先说说你正在做什么、现在遇到了什么，以及你希望这次合作帮助团队弄清楚什么。",
    primary: "开始聊聊",
    secondary: "先看文章",
  },
  seo: {
    ogImageAlt: "Darren Su - AI 生态项目、产品与全球科技连接",
    home: {
      jobTitle: "AI 生态项目负责人和产品创造者",
      knowsAbout: [
        "AI 开发者生态",
        "开发者社区",
        "AI 产品 Workshop",
        "多 Agent 数字组织",
        "全球科技活动",
        "社区驱动增长",
      ],
      professionalServiceName: "Darren Su - AI 生态项目与产品 Workshop",
      serviceTypes: [
        "AI 开发者生态项目",
        "AI 产品 Workshop",
        "AI 与 Agent 分享",
        "大会与社区生态合作",
      ],
    },
    services: {
      listName: "Darren Su 服务",
    },
  },
};
