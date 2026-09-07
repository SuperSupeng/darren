type BilingualText = { zh: string; en: string };

type ArchiveRecord = {
  id: string;
  title: BilingualText;
  date?: BilingualText;
  role: BilingualText;
};

export type ExperienceArchiveSection = {
  id: string;
  title: string;
  entries: { id: string; title: string; date?: string; role: string }[];
};

// Owner-provided Feishu profile, revision 543, plus the user's correction of
// the Hangzhou hosting photo. Unknown dates and unconfirmed outcomes stay out.
const organizationRecords: ArchiveRecord[] = [
  {
    id: 'un-ai-vibe-coding',
    title: { zh: 'un-ai 与 vibe coding 全国联动', en: 'Nationwide un-ai and vibe coding activities' },
    date: { zh: '2025 年 3 月', en: 'March 2025' },
    role: { zh: '组织全国联动的 un-ai 与 vibe coding 活动。', en: 'Organized nationwide un-ai and vibe coding activities.' },
  },
  {
    id: 'wtcc-forum-workshop',
    title: { zh: 'WTCC 分论坛与专场 Workshop', en: 'WTCC forum and dedicated workshop' },
    role: { zh: '组织分论坛与专场 Workshop。', en: 'Organized a forum and a dedicated workshop.' },
  },
  {
    id: 'ai-creators-day',
    title: { zh: 'AI Creators Day 全国联动与杭州场', en: 'AI Creators Day: nationwide program and Hangzhou event' },
    date: { zh: '2026 年 3 月全国联动', en: 'Nationwide program: March 2026' },
    role: {
      zh: '组织全国联动；其中杭州场由我担任主持，规模约 600 人。',
      en: 'Organized the nationwide program and hosted its Hangzhou event, with around 600 people.',
    },
  },
  {
    id: 'openclaw-nationwide',
    title: { zh: 'OpenClaw「用虾大会」全国联动', en: 'Nationwide OpenClaw community events' },
    date: { zh: '2026 年 4 月', en: 'April 2026' },
    role: { zh: '组织全国多城市联动活动。', en: 'Organized a program of community events across multiple cities in China.' },
  },
  {
    id: 'amd-datawhale-program',
    title: { zh: 'AMD 开发者大会 · Datawhale 环节', en: 'Datawhale programming at the AMD developer conference' },
    date: { zh: '2026 年 5 月 19 日', en: 'May 19, 2026' },
    role: { zh: '负责组织大会中 Datawhale 参与的环节。', en: 'Led the organization of the parts of the conference involving Datawhale.' },
  },
  {
    id: 'sial-food-ai-hackathon',
    title: { zh: '西雅食品展 · 食饮 AI 黑客松', en: 'Food and beverage AI hackathon at SIAL' },
    role: { zh: '以项目负责人身份参与食饮 AI 黑客松。', en: 'Participated as a project lead in the food and beverage AI hackathon.' },
  },
  {
    id: 'ai-hackathon-tour-host',
    title: { zh: 'AI Hackathon Tour 分论坛', en: 'AI Hackathon Tour forum' },
    role: { zh: '担任分论坛主持。', en: 'Hosted a forum session.' },
  },
  {
    id: 'go-summit-singapore',
    title: { zh: '新加坡 Go Summit', en: 'Go Summit in Singapore' },
    date: { zh: '2026 年 6 月', en: 'June 2026' },
    role: { zh: '参与活动组织。', en: 'Worked as an event organizer.' },
  },
  {
    id: 'chiang-mai-nomad-hackathon',
    title: { zh: '清迈数字游民大会 · 官方黑客松', en: 'Official hackathon at a Chiang Mai digital nomad conference' },
    role: { zh: '作为黑客松合作伙伴参与组织。', en: 'Helped organize the hackathon as an event partner.' },
  },
  {
    id: 'shenzhen-hardware-exhibition',
    title: { zh: '深圳 AI 硬件展 · 展区统筹', en: 'Exhibition area coordination at a Shenzhen AI hardware exhibition' },
    date: { zh: '2024 年底', en: 'Late 2024' },
    role: { zh: '负责一个展区，统筹三天的展区安排与协调。', en: 'Managed one exhibition area, coordinating its arrangements over three days.' },
  },
];

const exchangeRecords: ArchiveRecord[] = [
  {
    id: 'mushanghai-speaking',
    title: { zh: 'MuShanghai', en: 'MuShanghai' },
    role: { zh: '作为官方合作伙伴代表发言。', en: 'Spoke as a representative of an official partner.' },
  },
  {
    id: 'go-summit-shenzhen',
    title: { zh: '深圳 Go Summit', en: 'Go Summit in Shenzhen' },
    role: { zh: '进行主题分享。', en: 'Gave a talk.' },
  },
  {
    id: 'superai-delegate',
    title: { zh: 'SuperAI 大会', en: 'SuperAI conference' },
    role: { zh: 'Datawhale 作为官方合作伙伴，我作为代表受邀参会。', en: 'Attended by invitation as a representative of Datawhale, an official partner.' },
  },
  {
    id: 'clawtime-hong-kong',
    title: { zh: '香港 Clawtime 大会', en: 'Clawtime conference in Hong Kong' },
    role: { zh: '作为嘉宾分享发言。', en: 'Spoke as a guest.' },
  },
  {
    id: 'networked-os-chiang-mai',
    title: { zh: 'Networked OS 清迈大会', en: 'Networked OS conference in Chiang Mai' },
    role: { zh: '作为特邀嘉宾分享。', en: 'Spoke as an invited guest.' },
  },
  {
    id: 'cursor-hackathon-chiang-mai',
    title: { zh: '清迈 Cursor Hackathon', en: 'Cursor Hackathon in Chiang Mai' },
    role: { zh: '组队参与黑客松。', en: 'Took part in the hackathon as a team member.' },
  },
  {
    id: 'google-ai-builder-exchange',
    title: { zh: '与 Google 团队交流', en: 'Conversations with Google teams' },
    role: { zh: '以 AI Builder 身份，与 Google 开发者关系、云及开发者生态负责人交流。', en: 'Joined conversations as an AI builder with leaders in Google developer relations, Cloud, and developer ecosystems.' },
  },
];

export function getExperienceArchive(locale: string): ExperienceArchiveSection[] {
  const language = locale === 'zh' ? 'zh' : 'en';
  return [
    {
      id: 'organization-and-hosting',
      title: { zh: '活动组织与主持', en: 'Organizing and hosting' },
      records: organizationRecords,
    },
    {
      id: 'speaking-and-exchange',
      title: { zh: '分享与交流', en: 'Talks and exchanges' },
      records: exchangeRecords,
    },
  ].map((section) => ({
    id: section.id,
    title: section.title[language],
    entries: section.records.map((record) => ({
      id: record.id,
      title: record.title[language],
      date: record.date?.[language],
      role: record.role[language],
    })),
  }));
}

const caseDates: Record<string, BilingualText> = {
  'wechat-innovation-workshop': { zh: '2026 年 8 月、9 月', en: 'August and September 2026' },
  'superai-china': { zh: '2026 年', en: '2026' },
  'agent-speaking': { zh: '2026 年实践记录', en: 'Practice documented in 2026' },
  'stepfun-four-cities': { zh: '2026 年 6 月', en: 'June 2026' },
  'aix-creation-festival': { zh: '2026 年 5 月', en: 'May 2026' },
  'waic-pioneers-night': { zh: '2026 年 7 月', en: 'July 2026' },
  'rumata-workshop': { zh: '2026 年 7 月', en: 'July 2026' },
  'datawhale-city-ecosystem': { zh: '2019 年起参与', en: 'Involved since 2019' },
};

export function getWorkCaseDate(id: string, locale: string): string | undefined {
  return caseDates[id]?.[locale === 'zh' ? 'zh' : 'en'];
}
