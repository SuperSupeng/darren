// Approved service copy. Edit the strings here; the services page reads them directly.
export const serviceIds = {
  visits: 'field-visits',
  talks: 'talks',
} as const;

export type ServiceId = (typeof serviceIds)[keyof typeof serviceIds];

export const caseButtonLabel = {
  zh: '了解活动与生态合作',
  en: 'Explore event and ecosystem collaborations',
} as const;

export const pricingLine = {
  zh: '按场次或按项目报价，来信时说一下人数、时长和想解决的问题',
  en: 'Quoted per session or per project. When you write, include the number of people, the duration, and the problem you want to solve.',
} as const;

export const serviceOffers = {
  talks: {
    zh: {
      title: '讲座和内训 / AI 转型咨询',
      paragraphs: [
        '给想用 AI、但还不知道从哪下手的企业老板和团队。①讲座/内训：AI 现在发展到哪一步、能做什么；还有 AI 时代的组织，人和 Agent、人和人、Agent 和 Agent 之间怎么配合。我会拿自己每天在用的一整套 AI 助手当例子，出过错的地方也讲。②转型咨询：和老板、管理团队一起看哪些事适合交给 AI，组织要跟着怎么调整。',
        '③动手工作坊和 Agent 构建。',
      ],
    },
    en: {
      title: 'Talks, in-house sessions and hands-on workshops on where AI is now, what it can do, and how teams work once people and agents work together; agent building too.',
      paragraphs: [],
    },
  },
  visits: {
    zh: {
      title: '带海外投资人和创始人了解、走访中国 AI，一起办活动',
      paragraphs: [
        '给想亲自看看中国 AI 的海外投资人和创始人。①实地了解：你想弄清楚什么，就按这个安排走访 AI 公司、开源社区、高校，我陪着一起聊。②在中国办活动：想见中国开发者和潜在用户，办一场产品 Workshop 或交流会，我帮你定目标、请人、组织现场。③引荐：双方都有交流需要才介绍，不卖联系人名单。',
        '也和企业一起办活动，包括国内厂商。',
      ],
    },
    en: {
      title: 'China AI field visits & events for global investors and founders',
      paragraphs: [
        "For investors and founders who want to see China's AI scene for themselves. Field visits planned around what you want to understand: companies, open-source communities, universities, and I join the conversations. Events in China: meet Chinese developers and potential users; I help set the goal, invite people and run the session. Introductions only when both sides have a reason to talk. I don't sell contact lists.",
        'I also co-host events with companies, including Chinese vendors.',
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

export const jobsCopy = {
  zh: {
    label: '找工作 / 招人',
    body: '找工作：来信写想做的方向、工作年限和所在城市。招人：写岗位、要求和预算范围。',
  },
  en: {
    label: 'Jobs / Hiring',
    body: 'Looking for a job: tell me the direction you want, your years of experience and your city. Hiring: tell me the role, its requirements and the budget range.',
  },
} as const;

export const homepageServiceLine = '给企业老板和管理团队讲 AI 能做什么、AI 时代的组织怎么协作；也带海外投资人和创始人来中国看 AI。';

export const homepageOneLiner = 'Connecting global founders and builders with China’s AI ecosystem.';
