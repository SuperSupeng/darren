import { englishContent } from './en';
import type { LocalizedContent } from './types';

export const chineseContent: LocalizedContent = {
  ...englishContent,
  labels: {
    ...englishContent.labels,
    productLab: {
      ...englishContent.labels.productLab,
      roomEyebrow: "产品与系统",
      sideEyebrow: "为什么做产品",
      sideQuote: "讨论时容易觉得一个想法可行。交给用户试用后，才知道有哪些问题。",
      selectedEyebrow: "目前的产品",
      selectedStatement:
        "这些产品的起点都很具体：有的是几位创始人反复提到的招聘问题，有的是我自己查找科技活动、组织城市项目时遇到的麻烦。",
      projectLabel: "项目",
      visitProject: "访问项目",
      explainerEyebrow: "上线之后",
      explainerTitle: "产品上线后，我会继续看用户怎么用。",
      problem: "问题",
      signal: "反馈",
      nextStep: "下一步",
      explainerItems: [
        {
          title: "先让用户看到它",
          description:
            "把想法做成页面、工具或流程，才能看到用户是否理解、愿不愿意使用。",
        },
        {
          title: "再看实际怎么用",
          description:
            "上线以后，我会继续看用户从哪里来、在哪一步离开，哪些反馈说明原来的设想需要调整。",
        },
        {
          title: "有时也会停止",
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
      latestEyebrow: "最新",
      recentTitle: "最近的文章",
      recentDescription: "关于多 Agent 工作系统、科技访问和禅修经历的文章。",
      empty: "文章正在整理中。",
      minRead: "分钟阅读",
    },
    about: {
      ...englishContent.labels.about,
      roomEyebrow: "关于我",
      eyebrow: "关于",
      kernelEyebrow: "几段经历",
      kernelTitle: "从工程、社区到产品",
      kernelDescription: "它们并不完全在计划之中，但每一段都改变了我后来关注的问题。",
      pullQuote:
        "一起做过项目、解决过问题，人和人之间才会慢慢有信任。这也是我愿意长期做社区的原因。",
      workEyebrow: "现在在做什么",
      workTitle: "现在，我的时间主要花在这些事情上。",
      workItems: [
        "发起并负责 AI 开发者项目、多城市联动与大会生态合作。",
        "帮助海外 AI 产品在中国接触开发者，组织体验并收集早期反馈。",
        "分享自己使用 AI、构建 Agent 和运行多 Agent 工作系统的经验。",
        "继续做 MatchPoint、GlobalTechEvents 和 AI+X Events。",
      ],
    },
  },
  fieldNotes: {
    hero: {
      eyebrow: "手记",
      title: "我把做项目、做产品和使用 AI 的经验写在这里。",
      subtitle:
        "也有科技访问和禅修的记录，写下当时的观察，以及后来改变的看法。",
    },
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
      title: "我也在日常工作中使用多 Agent 系统。",
      description:
        "我在 2026 年 4 月 15 日发布的实践文章里，记录了当时的 31 个专业 Agent 和 44 个自动任务，分别处理研究、产品、内容、运营和个人知识管理。我仍在日常工作中使用这套系统，并根据遇到的问题继续调整。",
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
          "网站已经上线，候选人、招聘团队和日常运营所需的工具都已可用。产品也已经用于实际招聘，目前还在根据双方的使用情况继续调整。",
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
        title: "在 Datawhale，从学习者到组织者",
        description:
          "2019 年因为学习 AI 接触 Datawhale，后来做过助教、活动组织者，也参与城市生态和社区治理。我见过一些原本互不认识的人，因为共同学习和一起做事，慢慢成为项目伙伴。",
      },
      {
        title: "和 Monica 一起发起 AGI Villa",
        description:
          "我和 Monica 发起 AGI Villa，希望对 AI 感兴趣的创业者、产品人和开发者能在社区里认识彼此，一起尝试新项目。这个过程让我认识了许多全球 AI 创业者，也接触到不少还在寻找早期用户的团队。",
      },
      {
        title: "开始做自己的产品",
        description:
          "我联合创办 MatchPoint，也做了 GlobalTechEvents，并持续运行一套多 Agent 工作系统。产品上线以后，用户从哪里来、为什么留下，以及要不要继续做，都需要在日常运营里回答。",
      },
      {
        title: "禅修和公益也是生活的一部分",
        description:
          "这些实践会提醒我想清楚自己的动机，也留意自己的决定会影响哪些人。"
      },
    ],
    whyThisWork: {
      eyebrow: "为什么做这件事",
      title: "为什么同时做社区和产品",
      quote:
        "在社区里，我能看到人为什么愿意参与；做产品时，我会更快知道一个想法有没有人需要。",
      body:
        "组织活动时，我会观察大家为什么来、什么时候愿意参与，以及活动后是否还会继续交流。做产品时，用户的实际使用会直接告诉我，哪些设想需要调整。两件事都需要理解对方需要什么，以及是否愿意继续参与。",
      points: [
        "AI 让做出一个新产品变得更快，但怎么找到用户并没有因此变得简单。",
        "社区不会自动带来增长。只有人愿意长期参与，信任和反馈才会慢慢积累起来。",
        "自己负责项目和产品，会迫使我不断面对用户、合作伙伴和日常运营里的具体限制。",
      ],
    },
  },
  seo: {
    ogImageAlt: "Darren Su - 开发者活动、产品与 AI 实践",
    home: {
      jobTitle: "AI 生态项目负责人和产品创造者",
      knowsAbout: [
        "中国 AI 生态",
        "开发者社区",
        "AI 生态项目",
        "AI 产品 Workshop",
        "多 Agent 数字组织",
        "全球科技活动",
        "社区驱动增长",
      ],
      professionalServiceName: "Darren Su - AI 生态项目与产品 Workshop",
      serviceTypes: [
        "AI 开发者生态项目",
        "在中国开展的 AI 产品 Workshop",
        "AI 与 Agent 分享",
        "大会与社区生态合作",
      ],
    },
    services: {
      listName: "Darren Su 合作方式",
    },
  },
};
