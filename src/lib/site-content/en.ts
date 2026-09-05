export const englishContent = {
  labels: {
    productLab: {
      roomEyebrow: "Products & Systems",
      sideEyebrow: "Why I Build",
      sideQuote:
        "An idea can sound perfectly reasonable in conversation. Once people use the product, the real questions become concrete.",
      selectedEyebrow: "Current Products",
      selectedStatement:
        "Each product began with a specific problem: hiring questions several founders kept raising, or the friction I encountered while finding technology events and organizing city programs.",
      projectLabel: "Project",
      visitProject: "Visit project",
      explainerEyebrow: "Why I still build",
      explainerTitle: "Once people start using a product, the questions become concrete.",
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
          title: "Know when to stop",
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
      recentTitle: "Recently written",
      recentDescription:
        "The collection currently covers a China ecosystem visit and lessons from running a 31-agent work system.",
      empty: "Notes are being organized.",
      minRead: "min read",
    },
    about: {
      roomEyebrow: "About",
      eyebrow: "About",
      kernelEyebrow: "A few chapters",
      kernelTitle: "Looking back, these experiences mattered most.",
      kernelDescription:
        "They were not all planned, but each changed the questions I paid attention to afterward.",
      pullQuote:
        "Years of community work have taught me that an ecosystem is not a contact list. It is the understanding and trust people build slowly, until they are willing to work on something together.",
      workEyebrow: "What I Do Now",
      workTitle: "What I spend most of my time doing now.",
      workItems: [
        "Initiate and lead AI developer programs, multi-city activations, and conference partnerships.",
        "Help AI products from abroad meet developers in China, organize hands-on sessions, and collect early feedback.",
        "Share what I have learned from using AI, building agents, and running a multi-agent work system.",
        "Continue building MatchPoint, GlobalTechEvents, and AI+X Events.",
      ],
    },
  },
  fieldNotes: {
    hero: {
      eyebrow: "Field Notes",
      title: "After something is finished, I write down what happened and what I made of it.",
      subtitle:
        "The English collection currently begins with two field-tested subjects: connecting global and Chinese AI ecosystems, and what changes when a 31-agent system enters daily work.",
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
      title: "I also use 31 agents in my day-to-day work.",
      description:
        "The system currently includes 31 specialized agents and 44 recurring automations across research, products, content, operations, and personal knowledge. I use it every day and keep adjusting it as new problems appear in real work.",
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
          "The public site, candidate and employer flows, operations workspace, and remote MCP are live. The product is being used in real hiring, and we are still adjusting it around how both sides use it.",
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
        title: "Datawhale became a long-term part of my work",
        description:
          "I joined Datawhale as an AI learner in 2019, then became a teaching assistant, organizer, and city lead. I watched people who had never met become project partners through learning and working together.",
      },
      {
        title: "Monica and I later started AGI Villa",
        description:
          "Monica and I started AGI Villa to bring founders, product people, and developers interested in AI into the same community, and to see what collaborations or new projects might grow from it. Along the way, I met AI founders from around the world and many teams still looking for their first users.",
      },
      {
        title: "Then I began building products myself",
        description:
          "I co-founded MatchPoint, built GlobalTechEvents, and operate a work system of 31 agents. Once a product is live, questions about where users come from, why they stay, and whether to continue have to be answered through daily operations.",
      },
      {
        title: "I have also kept meditation and public-interest work in my life",
        description:
          "They do not make decisions for me, but they remind me to examine my motives and consider who will ultimately be affected.",
      },
    ],
    whyThisWork: {
      eyebrow: "Why This Work",
      title: "Why I work on both communities and products.",
      quote:
        "Community shows me why people choose to participate. A product quickly shows whether anyone needs the idea.",
      body:
        "When I organize an event, I can see why people come, when they begin to participate, and which relationships continue afterward. Products are more direct: once people start using one, the original idea quickly meets real feedback. Both kinds of work remind me that bringing people together and building products depend on understanding what someone needs and whether they want to stay involved.",
      points: [
        "AI makes it faster to build a new product, but finding the right users has not become simple.",
        "Community does not automatically create growth. Trust and feedback accumulate only when people keep participating.",
        "Running products and programs forces me to face the practical constraints around users, partners, and day-to-day operations.",
      ],
    },
  },
  seo: {
    ogImageAlt: "Darren Su - AI ecosystem programs, products, and global technology connections",
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
      listName: "Darren Su Services",
    },
  },
};
