import { homepageServiceLine } from '@/lib/services-copy';
import { englishContent } from './en';
import type { LocalizedContent } from './types';

export const chineseContent: LocalizedContent = {
  ...englishContent,
  home: {
    intro: "我关注 AI 时代的人与组织。做过工程研发，现在做产品、参与社区，也把 Agent 用在自己的日常工作里。",
    detail: homepageServiceLine,
  },
  labels: {
    ...englishContent.labels,
    productLab: {
      ...englishContent.labels.productLab,
      roomEyebrow: "产品与系统",
      sideEyebrow: "为什么做产品",
      sideQuote: "讨论时容易觉得一个想法可行。交给用户试用后，才知道有哪些问题。",
      selectedEyebrow: "目前的产品",
      selectedStatement:
        "活动索引、社区日历，还有一个古建筑交互原型。它们分别来自我找活动、组织社区项目和看古建筑时遇到的问题。",
      projectLabel: "项目",
      visitProject: "访问项目",
      explainerEyebrow: "上线之后",
      explainerTitle: "产品上线后，我会继续看用户怎么用。",
      problem: "为什么做",
      signal: "现在怎么用",
      nextStep: "接下来想做",
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
      recentDescription: "关于 AI、创业和社区的文章，也有公益课程、禅修和旅行的记录。",
      empty: "文章正在整理中。",
      minRead: "分钟阅读",
      rss: "RSS",
      rssLabel: "通过 RSS 订阅文章",
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
        "继续做 GlobalTechEvents 和 AI+X Events，把遇到的问题做成产品。",
        "通过 Datawhale、AGI Villa 和社区活动，连接世界各地的 AI 与开源创造者。",
        "帮助海外 AI 产品在中国接触开发者，组织体验并收集早期反馈。",
        "分享 Agent、自动化与多 Agent 工作系统的实践。",
      ],
    },
  },
  writing: {
    hero: {
      eyebrow: "文章",
      title: "做过的事，和还没想明白的问题。",
      subtitle:
        "写 Agent 怎么分工，产品怎么找用户，也写社区、公益课程、禅修和旅行。",
    },
  },
  podcast: {
    hero: {
      eyebrow: "播客",
      title: "《重新组织》",
      subtitle:
        "和创业者、企业主聊 AI，也聊他们怎么做事、带团队。",
    },
    listen: "关于这档节目",
    listenUrl: "https://www.xiaoyuzhoufm.com/podcast/6aacb9b82527cf1af35662c9",
    listenCta: "在小宇宙收听",
    summary:
      "我平时经常和创业者、企业主聊天。《重新组织》把这些话题带进播客：AI 改变了哪些工作，做决定时遇到过什么困难，人又是怎样从经历中学到东西的。",
  },
  projects: {
    hero: {
      eyebrow: "项目",
      title: "我做的产品，参与的项目。",
      subtitle: "这里有产品介绍、多 Agent 使用记录，以及我在技术社区组织和参与的活动。案例里写明了我的角色和项目结果。",
    },
    productsTitle: "产品",
    casesTitle: "代表项目",
    archiveTitle: "项目案例",
    experiencesTitle: "其他活动与交流",
    role: "我的角色",
    result: "项目结果",
    read: "查看完整案例",
  },
  products: {
    hero: {
      eyebrow: "产品",
      title: "我做的产品和实验",
      subtitle:
        "GlobalTechEvents 整理全球科技活动，AI+X Events 服务 Datawhale 的城市活动。我也长期运行一套多 Agent 工作系统。",
    },
    digitalOrganization: {
      eyebrow: "AI 原生工作系统",
      title: "让 Agent 参与我的日常工作",
      description:
        "2026 年，我写过一篇管理 31 个 Agent、运行 44 个自动任务的记录。它们负责研究、产品、内容、运营和个人知识管理。文章里有分工方式，也有任务失败、流程停用的经历。我现在仍在使用和调整这套系统。",
      primaryMetric: "31 个专业 Agent",
      secondaryMetric: "44 个自动任务",
      image: "/blog/ai-employees/digital-organization.png",
      imageAlt: "Darren 的多 Agent 数字组织结构图",
      href: "/blog/managing-31-ai-employees",
      linkLabel: "阅读完整实践",
    },
    items: [
      {
        ...englishContent.products.items[0],
        tagline: "全球科技活动索引",
        description:
          "收集各地的科技会议和社区活动。我自己用它做海外研究、安排出行，也开放给其他人使用。",
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
        ...englishContent.products.items[1],
        tagline: "AI+X 社区活动日历",
        description:
          "收录各地的 AI Meetup、Workshop、Hackathon，以及高校和行业活动。可以查找活动，也可以提交和订阅。",
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
        ...englishContent.products.items[2],
        tagline: "拆懂一座古建筑",
        description:
          "一个古建筑交互教学原型。以山西大云院弥陀殿为例，可以旋转建筑、拆开木构件，看看它们怎样相接。",
        status: "运行中",
        problem:
          "屋檐下的木构件不容易从一张照片或一张平面图里看清。它们多在视线上方，怎么相接也容易淹没在整座殿里。",
        signal:
          "第一座已经开放：平顺大云院弥陀殿，可以三维拆解、看构件特写，也可以顺着故事走一程。",
        nextStep:
          "先把这座殿的旋转、拆解，以及和实景照片的对照，保持可用。",
        tags: ["古建筑", "木构", "交互"],
      },
    ],
  },
  about: {
    hero: {
      title: "Darren Su / 苏鹏",
      tags: ["AGI Villa 联合创始人", "Datawhale 城市生态负责人", "n8n Ambassador", "《重新组织》主持人"],
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
          "我做了 GlobalTechEvents，并持续运行一套多 Agent 工作系统。产品上线以后，用户从哪里来、为什么留下，以及要不要继续做，都需要在日常运营里回答。",
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
    ogImageAlt: "Darren Su / 苏鹏",
    home: {
      jobTitle: "AGI Villa 联合创始人 · Datawhale 城市生态负责人 · n8n Ambassador",
      knowsAbout: [
        "AI 产品",
        "Agent 与自动化",
        "中国 AI 生态",
        "全球 AI 与开源社区",
        "开发者社区",
        "多 Agent 数字组织",
        "全球科技活动",
        "社区驱动增长",
        "数字组织设计",
      ],
      professionalServiceName: "Darren Su 个人咨询",
      serviceTypes: [
        "AI 原生组织转型",
        "AI 搜索可见性（GEO）",
        "产品进入市场（GTM）",
      ],
    },
    services: {
      listName: "Darren Su 讲座与交流",
    },
  },
};
