// Approved service copy. Edit the strings here; the services page reads them directly.
export const serviceIds = {
  visits: 'field-visits',
  talks: 'talks',
} as const;

export type ServiceId = (typeof serviceIds)[keyof typeof serviceIds];

export const caseButtonLabel = {
  zh: '了解讲座与交流',
  en: 'Explore talks and visits',
} as const;

export const pricingLine = {
  zh: '按场次或按项目报价，来信时说一下人数、时长和想解决的问题',
  en: 'Quoted per session or per project. When you write, include the number of people, the duration, and the problem you want to solve.',
} as const;

export const serviceOffers = {
  talks: {
    zh: {
      title: 'AI 讲座与工作坊',
      paragraphs: [
        '为企业和团队做 AI 讲座、内训和动手工作坊。内容包括 AI 能做什么、人和智能助手怎样配合。我会结合自己使用多 Agent 的经历，讲怎么分工，也讲哪里出过错。',
      ],
    },
    en: {
      title: 'AI talks and workshops',
      paragraphs: ['Talks, in-house sessions, and hands-on workshops on what AI can do and how people and agents work together. I draw on my own multi-agent experiments, including where things went wrong.'],
    },
  },
  visits: {
    zh: {
      title: '中国 AI 走访与交流',
      paragraphs: [
        '海外投资人和创始人想来中国了解 AI 行业，我可以按你想了解的问题，安排 AI 公司、开源社区和高校的走访，并陪同交流。',
        '如果想接触中国开发者和潜在用户，也可以一起办产品 Workshop 或交流会。我参与确定活动目标、邀请参与者和组织现场，也和国内企业合作办活动。',
        '涉及引荐时，我会先确认双方都有交流意愿，不出售联系人名单。',
      ],
    },
    en: {
      title: 'China AI visits and events',
      paragraphs: [
        'For overseas investors and founders visiting China, I can arrange visits to AI companies, open-source communities, and universities around the questions you want to explore, and join the conversations.',
        'I also help organize product workshops and events to meet Chinese developers and potential users. I work on the purpose of the event, invitations, and the session itself, including events with Chinese companies.',
        'Before making an introduction, I check that both sides want to talk. I do not sell contact lists.',
      ],
    },
  },
} as const;

export function serviceDescription(id: 'talks' | 'visits', locale: string) {
  const language = locale === 'zh' ? 'zh' : 'en';
  const offer = serviceOffers[id][language];
  return offer.paragraphs.length > 0 ? offer.paragraphs.join(' ') : offer.title;
}

export const serviceOrder = {
  zh: ['talks', 'visits'] as const,
  en: ['visits', 'talks'] as const,
};

export const visitCaseIds = [
  'wechat-innovation-workshop',
  'stepfun-four-cities',
  'waic-pioneers-night',
  'aix-creation-festival',
  'superai-china',
  'rumata-workshop',
] as const;

export const visitArchiveLinks = [
  { id: 'amd-datawhale-program', href: '/projects#amd-datawhale-program' },
  { id: 'singapore-opc', href: '/projects#singapore-opc' },
] as const;

// Newest first. English lines that are not a supplied sentence are marked in the PR.
export const talkList = {
  zh: [
    '2026-09 威海：《从需求诊断到 AI 落地：长三角 FDE 企业 AI 落地班的实践与思考》',
    '2026-09 云栖大会 AgentCore 论坛圆桌主持：《从「惊艳」到「经验」，企业真正需要的智能体长什么样？》',
    '2026-06 火山引擎 veTalk × AI Builder 线上分享：《面向多 Agent 的数字组织设计思路与实践》',
    '2026 在南京做过一场线下分享《AI 革命：我们正在进入什么时代》',
    '上海交通大学 MEM 行业论坛特邀嘉宾分享（2025-12）',
    '在株洲主持过一场 AI 职业教育论坛',
    '2025-12 Networked OS 清迈大会特邀嘉宾分享',
    '2024 QCon 北京：《2024 年向量数据库与 RAG 落地思考与实践》',
  ],
  en: [
    '2026-09 Talk in Weihai: From needs diagnosis to AI adoption: practice and reflections from the Yangtze River Delta FDE enterprise AI program',
    '2026-09 Hosted a roundtable at the Yunqi Conference AgentCore forum: From “wow” to working experience: what kind of agent do companies actually need?',
    '2026-06 Volcano Engine veTalk × AI Builder online talk: Designing a digital organization for multiple agents',
    '2026 An in-person talk in Nanjing: The AI Revolution: What Era Are We Entering?',
    'Invited guest talk, Shanghai Jiao Tong University MEM Industry Forum (Dec 2025)',
    'Hosted an AI vocational education forum in Zhuzhou',
    '2025-12 Invited talk at the Networked OS conference in Chiang Mai',
    '2024 QCon Beijing: Thoughts and practice on vector databases and RAG in 2024',
  ],
} as const;

export const homepageServiceLine = '我主要做 AI 原生组织转型咨询，帮你梳理分工、流程和管理问题。也提供 AI 搜索（GEO）和产品市场策略（GTM）咨询。';

export const homepageOneLiner = 'I’m interested in how AI changes work and organizations. I started in engineering; now I build products, organize communities, and use agents in my own work.';
