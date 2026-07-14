# Content Strategy

This site is not a translation-first website. Each language has its own primary audience and should make a different promise.

## Audience Direction

English audience:

- Overseas AI, robotics, hardware, open-source, and technology teams.
- They want to understand China, find relevant builders or partners, and test a focused path through field visits, briefings, feedback rooms, or focused pilots.
- Core direction: Overseas -> China.

Chinese audience:

- China-based AI, technology, developer tool, robotics, hardware, open-source, and innovation teams.
- They want to understand overseas builder ecosystems, developer communities, conferences, partners, and early go-to-market paths.
- Core direction: China -> Global.

## Implementation Rule

The current site follows this source structure:

- `src/lib/site-content/zh.ts`: Chinese audience narrative. Treat this as independent copy for China teams going global.
- `src/lib/site-content/en.ts`: English audience narrative. Treat this as the source of truth for overseas audiences trying to understand China.
- Future `es`, `pt`, `fr`, and other non-Chinese locales should be localized from the English audience narrative, not from Chinese.
- `messages/*.json` should mainly hold UI copy, route metadata, forms, navigation, and small interface labels. Strategic page content should live in the site-content files.

Do not treat Chinese and English as translations of each other. They share the same underlying capabilities, but they answer different buyer questions.

## Shared Capability

The underlying capability is the same in both languages:

- Ecosystem briefing.
- Community, partner, event, supplier, lab, and people mapping.
- Field visits and delegation design.
- Feedback rooms, workshops, side events, and focused pilots.
- Case studies, field notes, playbooks, and private relationship records.

The surface narrative changes by audience. Do not copy one language into the other.

## Important English Themes

English content should make China legible to global teams:

- China AI builder ecosystem.
- Robotics and embodied AI.
- Supply chain and hardware manufacturing networks.
- Open-source and developer communities.
- Universities, startups, and selected enterprise innovation teams.
- Field visits, delegations, feedback rooms, demo sessions, and focused pilots.

## Important Chinese Themes

Chinese content should help China teams work globally:

- Overseas developer, creator, and founder communities.
- Global conference, community, and field event strategy.
- AI product globalization.
- Open-source and developer relations outside China.
- Partner discovery and early market feedback testing.
- How to explain Chinese product, robotics, hardware, and supply chain capabilities to overseas teams.

## Content Decision Fields

Before publishing anything, classify it with:

- Audience: Overseas -> China, China -> Global, Both / Personal.
- Theme: AI, Robotics, Supply Chain, Builder Community, Product, Open Source, Inner Ground.
- Type: Case Study, Field Note, Playbook, Product Lab, Personal Note.
- Visibility: Public, Draft, Private.

## Reusing One Project

One project can become two different pieces.

Example: an overseas robotics team visits China.

English angle:

- What overseas robotics teams should understand before visiting China's supply chain ecosystem.
- Focus on preparation, misconceptions, field visit design, and follow-up paths.

Chinese angle:

- How China robotics or AI hardware teams can explain their capabilities to overseas customers.
- Focus on trust, product clarity, delivery boundaries, quality, and long-term collaboration.

## Maintenance Rhythm

- Each public project should leave one case study.
- Each meaningful project should leave one field note.
- Each repeated method should become a playbook or checklist.
- Private relationship knowledge should stay in a CRM, not on the public site.
- Product Lab updates only when project status, signal, or direction changes.

The goal is a compounding asset system: cases prove execution, notes sharpen judgment, playbooks capture reusable methods, and services become clearer through real work.
