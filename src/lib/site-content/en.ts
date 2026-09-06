export const englishContent = {
  labels: {
    productLab: {
      roomEyebrow: "Products & Systems",
      sideEyebrow: "Why I Build",
      sideQuote:
        "An idea may sound promising in conversation. Letting people try it shows where the problems are.",
      selectedEyebrow: "Current Products",
      selectedStatement:
        "Each product began with a specific problem: hiring questions several founders kept raising, or the friction I encountered while finding technology events and organizing city programs.",
      projectLabel: "Project",
      visitProject: "Visit project",
      explainerEyebrow: "After launch",
      explainerTitle: "After launch, I keep watching how people use the product.",
      problem: "Problem",
      signal: "Feedback",
      nextStep: "Next step",
      explainerItems: [
        {
          title: "Let people see it",
          description:
            "Once an idea becomes a page, tool, or working process, it becomes much easier to see whether people understand it and want to use it.",
        },
        {
          title: "Then watch what they do",
          description:
            "After launch, I watch where users come from, where they drop off, and what feedback suggests that the original idea needs to change.",
        },
        {
          title: "Sometimes I stop",
          description:
            "Some experiments do not become long-term products. They still leave useful answers: whether the need exists, whether the problem is too broad, or whether the timing is simply wrong.",
        },
      ],
    },
    fieldNotes: {
      roomEyebrow: "Writing",
      sidebarEyebrow: "A note before reading",
      sidebarQuote:
        "I usually begin with an event, a product question, or something I experienced firsthand.",
      latestEyebrow: "Latest",
      recentTitle: "Recent articles",
      recentDescription:
        "The collection covers a China ecosystem visit, lessons from running a 31-agent work system, and a meditation retreat in northern Thailand.",
      empty: "Notes are being organized.",
      minRead: "min read",
    },
    about: {
      roomEyebrow: "About",
      eyebrow: "About",
      kernelEyebrow: "My background",
      kernelTitle: "From engineering to communities and products",
      kernelDescription:
        "They were not all planned, but each changed the questions I paid attention to afterward.",
      pullQuote:
        "Trust grows when people work through problems and projects together. That is what keeps me involved in community work.",
      workEyebrow: "What I Do Now",
      workTitle: "What I spend most of my time doing now.",
      workItems: [
        "Initiate and lead AI developer programs, coordinated events across cities, and conference partnerships.",
        "Help AI products from abroad meet developers in China, organize hands-on sessions, and collect early feedback.",
        "Share what I have learned from using AI, building agents, and running a multi-agent work system.",
        "Continue building MatchPoint, GlobalTechEvents, and AI+X Events.",
      ],
    },
  },
  fieldNotes: {
    hero: {
      eyebrow: "Field Notes",
      title: "I write about projects, products, and how I use AI.",
      subtitle:
        "There are also notes from running a 31-agent system, ecosystem visits, and meditation retreats, including what I noticed and where my thinking changed.",
    },
  },
  products: {
    hero: {
      eyebrow: "Products",
      title: "MatchPoint, GlobalTechEvents, and AI+X Events all began with problems I kept encountering at work.",
      subtitle:
        "MatchPoint works on talent matching, GlobalTechEvents collects technology events worldwide, and AI+X Events supports Datawhale city activities. I also run a multi-agent work system over the long term.",
    },
    digitalOrganization: {
      eyebrow: "AI-native work system",
      title: "I also use a multi-agent system in my day-to-day work.",
      description:
        "In the essay I published on April 15, 2026, I documented 31 specialized agents and 44 recurring automations across research, products, content, operations, and personal knowledge. I continue to use and refine the system in my daily work.",
      primaryMetric: "31 specialized agents",
      secondaryMetric: "44 recurring automations",
      image: "/blog/ai-employees/digital-organization.png",
      imageAlt: "Structure of Darren's multi-agent digital organization",
      href: "/blog/managing-31-ai-employees",
      linkLabel: "Read the full essay",
    },
    items: [
      {
        id: "matchpoint",
        name: "MatchPoint",
        tagline: "Career exploration and role matching",
        description:
          "People can first talk through their direction with AI, then explore specific roles in more depth. The platform also records how candidates think and act in practical tasks, adding context a résumé rarely captures.",
        image: "/projects/matchpoint.png",
        url: "https://matchpoint.careers",
        status: "live",
        problem:
          "A résumé says little about how someone thinks and acts in an unfamiliar situation. A job description also tells candidates very little about the role's actual day-to-day work.",
        signal:
          "The site is live, with working tools for candidates, hiring teams, and day-to-day operations. The product is being used in real hiring, and we continue to improve it based on how both sides use it.",
        nextStep:
          "Keep using it in real hiring and adjust career exploration, role understanding, and application flows around feedback from candidates and teams.",
        tags: ["AI native", "Careers", "Agent"],
      },
      {
        id: "globaltechevents",
        name: "GlobalTechEvents",
        tagline: "A global technology event index",
        description:
          "An index that brings together technology conferences and community events scattered across cities and platforms.",
        image: "/projects/globaltechevents.webp",
        url: "https://www.globaltechevents.xyz",
        status: "live",
        problem:
          "The information is scattered across websites, cities, and communities. Each research trip or travel plan used to mean finding and checking it again.",
        signal:
          "I use it for international research and travel planning, and to see what different regions are discussing right now.",
        nextStep:
          "Keep adding events and continue using the index for my own international research and travel planning.",
        tags: ["Global ecosystem", "Events", "Market intelligence"],
      },
      {
        id: "datawhale-aix-events",
        name: "Datawhale AI+X Events",
        tagline: "A community calendar for practical AI",
        description:
          "A shared calendar for AI meetups, workshops, hackathons, and university, city, and industry events. People can discover events, submit their own, and subscribe to updates in one place.",
        image: "/projects/aix-events.svg",
        url: "https://aixevents.datawhale.cn/",
        status: "live",
        problem:
          "AI events are scattered across communities and platforms. Learners struggle to find local events consistently, while organizers lack a stable place to publish them.",
        signal:
          "The calendar is maintained with the community. Participants get a simpler way to find local events, while organizers get a stable place to publish them.",
        nextStep:
          "Keep expanding coverage and make submitting, following, and organizing local events simpler.",
        tags: ["Datawhale", "AI+X", "Community events"],
      },
      {
        id: "internplanet",
        name: "Intern Planet",
        tagline: "A concluded cross-border talent experiment",
        description:
          "The project tried to connect companies with international students and young builders through a first concrete project or internship.",
        image: "/projects/internplanet.png",
        url: "https://internplanet.tech",
        status: "stopped",
        problem:
          "Both sides were open to working together, but lacked a concrete starting point that could also build trust.",
        signal:
          "The experiment suggested that a concrete project or internship may be a better starting point than a broad talent community.",
        nextStep:
          "The experiment has ended. Its lessons about concrete projects, trust, and early talent matching remain useful for future work.",
        tags: ["Talent", "Asia", "Community"],
      },
    ],
  },
  about: {
    hero: {
      title: "Darren Su / 苏鹏",
      subtitle:
        "I am based in Hangzhou. I began in engineering and joined Datawhale in 2019 while learning AI. Later I started organizing developer events and city programs. Today I also build products and use a multi-agent system in my daily work.",
      tags: [
        "AI Ecosystem Program Lead",
        "AGI Villa & MatchPoint Co-founder",
        "Datawhale City Ecosystem Lead",
        "GlobalTechEvents Creator",
      ],
    },
    kernel: [
      {
        title: "I began in engineering",
        description:
          "In 2021, I worked on TiCDC at PingCAP. After that, I worked on AI infrastructure, vector databases, AI-native SaaS, commercialization, and AI platform development. The experience taught me to ask what a technology actually solves and where people will use it.",
      },
      {
        title: "From learner to organizer at Datawhale",
        description:
          "I joined Datawhale as an AI learner in 2019, then worked as a teaching assistant and event organizer and became involved in city programs and community governance. I watched people who had never met become project partners through learning and working together.",
      },
      {
        title: "Starting AGI Villa with Monica",
        description:
          "Monica and I started AGI Villa so founders, product people, and developers interested in AI could meet and try new projects together. Through the community, I met AI founders from around the world and many teams still looking for their first users.",
      },
      {
        title: "Building my own products",
        description:
          "I co-founded MatchPoint, built GlobalTechEvents, and operate a multi-agent work system. Once a product is live, questions about where users come from, why they stay, and whether to continue have to be answered through daily operations.",
      },
      {
        title: "Meditation and public-interest work",
        description:
          "These practices remind me to examine my motives and consider who my decisions will affect.",
      },
    ],
    whyThisWork: {
      eyebrow: "Why This Work",
      title: "Why I work on communities and products",
      quote:
        "Community shows me why people choose to participate. A product quickly shows whether anyone needs the idea.",
      body:
        "When I organize an event, I watch why people come, when they take part, and whether they stay in touch afterward. With products, how people use them tells me which assumptions need to change. Both kinds of work depend on understanding what people need and whether they want to stay involved.",
      points: [
        "AI makes it faster to build a new product, but finding the right users has not become simple.",
        "Community does not automatically create growth. Trust and feedback accumulate only when people keep participating.",
        "Running products and programs forces me to face the practical constraints around users, partners, and day-to-day operations.",
      ],
    },
  },
  seo: {
    ogImageAlt: "Darren Su - Developer events, products, and practical AI",
    home: {
      jobTitle: "AI Ecosystem Program Lead and Product Builder",
      knowsAbout: [
        "China AI ecosystem",
        "developer communities",
        "AI ecosystem programs",
        "AI product workshops",
        "multi-agent organizations",
        "global technology events",
        "community-led growth",
      ],
      professionalServiceName:
        "Darren Su - AI Ecosystem Programs and Product Workshops",
      serviceTypes: [
        "AI developer ecosystem programs",
        "AI product workshops in China",
        "AI and agent talks",
        "conference and community partnerships",
      ],
    },
    services: {
      listName: "Darren Su Collaboration",
    },
  },
};
