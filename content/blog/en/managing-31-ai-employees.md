---
title: Managing 31 AI Employees Changed How I Understand Management
date: 2026-04-15
description: After putting 31 agents into real daily work, I began rethinking how tasks are understood, how information flows, and which rules need to be made explicit.
tags: [AI Agents, Digital Organizations, Management, Product Experiments]
---

**Contents**

- [1. A counterintuitive feeling](#1-a-counterintuitive-feeling)
- [2. What has management spent the past century trying to solve?](#2-what-has-management-spent-the-past-century-trying-to-solve)
- [3. When employees become AI: what disappears, and what emerges?](#3-when-employees-become-ai-what-disappears-and-what-emerges)
- [4. Harness Engineering: a Silicon Valley answer](#4-harness-engineering-a-silicon-valley-answer)
- [5. The essence of Harness Engineering: a new form of management](#5-the-essence-of-harness-engineering-a-new-form-of-management)
- [6. My experiment: a digital organization already at work](#6-my-experiment-a-digital-organization-already-at-work)
- [7. The critical gap in Harness Engineering](#7-the-critical-gap-in-harness-engineering)
- [8. An unexpected lesson from Claude Code](#8-an-unexpected-lesson-from-claude-code)
- [9. The hourglass organization: I am the bottleneck](#9-the-hourglass-organization-i-am-the-bottleneck)
- [10. My answer: from holding the reins to designing the rules](#10-my-answer-from-holding-the-reins-to-designing-the-rules)
- [11. From Harness Engineering to Digital Organization Design](#11-from-harness-engineering-to-digital-organization-design)
- [12. A new frontier for management](#12-a-new-frontier-for-management)

---

Since the Lunar New Year, I have been experimenting with a more concrete form of human–AI collaboration. I subscribed to Cursor Ultra, Claude Code Max, and several coding plans, and I used OpenClaw to assemble a digital team.

On this team, an assistant handles my calendar, tasks, and CRM. A CMO handles brand and content strategy. Other agents take care of distribution, data analysis, translation, compliance, and topic selection. They are now part of my daily work, not just a demo.

![A multi-agent workspace running in OpenClaw](/blog/ai-employees/openclaw.png)

(P.S. OpenClaw is the best companion product 🤣)

At first, I only cared whether they could do their tasks well. But as our collaboration became more intensive, the problems I encountered began to look increasingly like management problems: How should information flow? Who has the authority to make a decision? Which actions require my confirmation? I later realized that many of these bottlenecks have close analogues in management theory. The old answers, however, were written for humans.

At the same time, a concept called Harness Engineering was becoming popular in Silicon Valley. I saw a deep connection between it and what I was building, but also one critical gap.

This essay is about that gap, what the architecture of Claude Code taught me, and where all of this might lead.

## 1. A counterintuitive feeling

For a while, I was actively asking my agents to do less.

My digital workforce could review twenty pieces of adapted content in a day. Platform operators could produce material at any time, and data analysts were always on call. They never got tired. They were constantly producing and constantly trying to collaborate with me.

But my attention became the scarcest resource in the entire system. I wanted to glance at a post before it went live. A strategic adjustment needed my approval. A new platform launch needed me to confirm its direction. None of these decisions was large on its own, but together they exceeded what my brain could process.

That feeling made me ask a question: What kind of problem was I actually facing?

Was it a technical problem? Not really. The agents worked, and the quality of their output was decent. Was it a product problem? No. The workflows were already functioning.

Eventually, I realized that it was a management problem—an extremely classic one that people had already begun studying a century ago.

## 2. What has management spent the past century trying to solve?

Before discussing Harness Engineering, I want to take a step back and look at what more than a century of management theory has actually tried to understand. Once that lineage becomes clear, much of what follows suddenly makes sense.

In an aggressively simplified account, management thought has gone through roughly five stages.

**Stage one: efficiency.** Frederick Taylor, the father of scientific management, stood in factories with a stopwatch, recorded every movement workers made, identified the most efficient sequence, and asked everyone to follow it. His concern was how to break a task into standardized steps, reduce waste, and measure output. Workers in that era were largely treated as extensions of machines: tell them what to do, and they would do it.

**Stage two: motivation.** The Hawthorne experiments associated with Elton Mayo were later summarized in a memorable way: productivity seemed to rise whether the lighting was improved or restored, shifting attention toward workers’ sense of being observed and their group relationships. That interpretation helped shape the human-relations school, although later reanalysis of the original data showed that the causes were not so simple and the conclusion remains contested. Abraham Maslow later proposed his hierarchy of needs, while Frederick Herzberg developed two-factor theory. Together, these lines of research reminded managers that people are not machines: they have emotions, a need for belonging, and a desire for self-actualization. Management gradually shifted from “how do we make people work?” to “how do we make people want to work?”

**Stage three: decisions and information.** Herbert Simon introduced the important concept of bounded rationality: people cannot make optimal decisions. With limited information, limited cognitive capacity, and limited time, they can only make decisions that are good enough. Peter Drucker then redefined the manager from a supervisor into a decision-maker and information hub. He saw an organization as, fundamentally, an information-processing system. Who has the information? Who makes the decision? How is decision quality protected? These became the core questions of management.

**Stage four: organizational structure.** Thinkers such as Henry Mintzberg and Alfred Chandler began studying larger structural questions. What should an organization look like? Hierarchical or flat? Centralized or decentralized? Does strategy determine structure, or does structure shape strategy? How should authority be distributed, how should conflict be resolved, and which structures fit which environments?

**Stage five: adaptation and learning.** Peter Senge wrote *The Fifth Discipline* and introduced the idea of the learning organization. James March studied the balance between exploration and exploitation: how much energy should an organization spend searching for something new, and how much should it invest in what already works? As the environment keeps changing, how does an organization notice change, learn, and evolve?

![The development of management thought from efficiency and motivation to organizational learning](/blog/ai-employees/management-history.png)

If we compress that century into one sentence, the central problem of management is this:

> How can a group of individuals with limited capabilities, incomplete information, and differing motivations coordinate to produce more than the sum of their individual contributions?

Notice the three key phrases: **limited capabilities**, **incomplete information**, and **differing motivations**.

Of the three, management has devoted the most energy to the last one: differing motivations. How do you make people want to work, keep working, and work on the right things? Compensation systems, performance reviews, corporate culture, leadership, team building, and employee care all address the same underlying problem: human willingness.

For humans, willingness is the largest variable. No matter how capable someone is, nothing happens if they do not want to act.

## 3. When employees become AI: what disappears, and what emerges?

When your employees become AI agents, something interesting happens.

The problem of **willingness** changes form.

An agent has none of the career interests that exist in an employment relationship. It does not slack off or play office politics, nor does it need team building, performance conversations, or retention incentives. That does not mean it inherently *wants* to work; its behavior is primarily shaped by the task, context, and rules. Traditional interpersonal motivation problems become far less prominent.

The old problem disappears, but new ones emerge. And those new problems are more subtle and harder to handle.

The three terms in management’s core proposition—limited capabilities, incomplete information, and differing motivations—change in different ways when applied to agents.

**Differing motivations become much less prominent.** An agent does not have the separate career interests of a human employee. Instead of managing the same interpersonal incentives, a manager must design clear objectives and boundaries.

**Limited capabilities change form.** An agent’s capability ceiling may be high, but its actual performance depends heavily on the context and tools you provide. The same model can perform radically differently under different prompts, tools, and constraints. Its limits are not fixed; they are shaped by your design.

**Incomplete information becomes more severe.** An agent cannot reliably fill in organizational context you have not provided, nor can it know information that exists only as tacit understanding within a team. A human employee can walk over to the next desk and ask a question, overhear a crucial detail in the kitchen, or intuit that the boss is in a bad mood and choose a better time.

In other words, when employees become AI, the central contradiction of management shifts from a **willingness problem** to an **understanding problem**.

## 4. Harness Engineering: a Silicon Valley answer

While I was feeling my way through these questions, Silicon Valley was confronting the same problem. A concept began to gain traction: Harness Engineering.

The word *harness* comes from horse tack. A horse is powerful, but without reins, a saddle, and a bridle, it runs wherever it wants. The model is the horse; the harness is everything that channels its power in the right direction.

In February, OpenAI published an important account of an internal experiment. Over five months, a small team that began with three engineers used Codex agents to build and ship a beta internal product with roughly one million lines of code—and not one line was written by hand. Every line of application logic, tests, CI configuration, documentation, observability, and internal tooling was written by agents. Three engineers, one million lines of code, five months. Each engineer merged an average of 3.5 pull requests per day.

Harness Engineering has several core principles.

**Make every decision accessible.** From an agent’s point of view, information it cannot access at runtime does not exist. The team therefore wrote every design decision, architectural choice, and coding convention into Markdown files stored in the repository. When an agent read the code, it also read *why* the code had been designed that way.

**Enforce a layered architecture.** They defined a strict dependency direction: Types → Config → Repo → Service → Runtime → UI. Each layer could depend only on layers to its left. The agents were not simply trusted to remember the rule; linters and CI enforced it mechanically.

**Use feedforward and feedback control.** Birgitta Böckeler later described this framework more clearly in an article published on Martin Fowler’s site. She divided harness controls into two kinds. Guides, or feedforward controls, orient an agent before it acts—for example, an `ARCHITECTURE.md`, coding conventions, or example code. Sensors, or feedback controls, evaluate the output after the agent acts—for example, automated tests, linters, and type checks. One particularly interesting discovery was that the best sensors produced LLM-friendly error messages. Instead of merely saying “there is an error on line 42,” a linter might say, “line 42 violates principle X; use pattern Y instead, for reason Z.” This is, in effect, a constructive form of prompt injection.

**Build a garbage-collection mechanism.** Even with all these constraints, quality gradually declines as the codebase grows, much like entropy increasing. Their solution was to encode “golden principles” into the repository, then run recurring background agent tasks to scan for drift, assign quality scores, and automatically open pull requests that repair degradation.

## 5. The essence of Harness Engineering: a new form of management

Describe those ideas in a different vocabulary, and the resemblance becomes clear:

- “Make every decision accessible” is called information transparency and organizational knowledge management in management theory.
- “Enforce a layered architecture” is institutional design and the definition of authority and responsibility boundaries.
- “Use feedforward and feedback control” maps directly to feedforward and feedback loops in control theory, or advance guidance and retrospective review in management.
- “Build a garbage-collection mechanism” is continuous improvement and quality management—what Toyota calls *kaizen*.

One passage from OpenAI’s article stayed with me. My reading of it is that a software engineering team’s primary job is no longer only to write code, but also to design environments, specify intent, and build feedback loops that allow Codex agents to work reliably.

Replace “software engineering team” with “manager,” “code” with “execution,” and “agents” with “employees,” and the sentence becomes:

“A manager’s primary job is no longer to execute personally, but to design the environment, clarify intent, and build feedback loops that allow employees to do reliable work.”

Isn’t that the central idea of management?

Seen through the lens of management, Harness Engineering is essentially a management system designed for AI. It begins from an engineer’s perspective, so it uses an engineer’s vocabulary—linters, CI, architectural constraints, feedback loops. Yet the problems it solves are deeply isomorphic with the problems management has studied for a century.

## 6. My experiment: a digital organization already at work

Before discussing the limits of Harness Engineering, I want to explain what I have been building. Everything that follows grew out of this experiment.

Over the past three months, I built a multi-agent collaboration system on OpenClaw. Thirty-one agents form what I call “four departments and one office.” The Discovery Department validates market demand. The Product Department turns demand into delivered products. The Growth Department handles content distribution and user growth. A Strategy Think Tank supports decisions. A secretary in the CEO Office routes information and consolidates the knowledge base. Forty-four scheduled tasks run automatically every day: morning briefings, evening reports, content reviews, dashboards, and team health checks.

![A digital organization made up of 31 agents](/blog/ai-employees/digital-organization.png)

What has the system actually done?

On March 8, I made a decision: I handed the daily operation of **[Global Tech Events](https://www.globaltechevents.xyz/)** entirely to the agent system. Since that day, agents have autonomously collected, filtered, organized, and published information about technology events worldwide. I no longer intervene. More than a month later, it is still running.

![The Global Tech Events product](/blog/ai-employees/global-tech-events.jpg)

I also built an **Agent Town** prototype that visualizes multi-agent collaboration in a pixel-art world. In a separate Demand Discovery experiment, I had agents complete product, technical, and market research, move into development, and produce a usable version. I barely participated in the development process; according to my project log, AI completed it in a little over a day, and I spent most of that time setting up the infrastructure.

![The Agent Town multi-agent collaboration interface](/blog/ai-employees/agent-town.png)

The system is still evolving. Some agents remain unreliable. In early April, I disabled two scheduled tasks after repeated failures, and many workflows still need refinement. But this is no longer merely an experiment. It is a functioning digital organization with real output, and it continues to evolve.

It was while operating this organization that I encountered the problems Harness Engineering does not cover.

## 7. The critical gap in Harness Engineering

Most current discussions of Harness Engineering focus almost entirely on a single agent or a single chain of tasks. But when you are managing not one agent but an organization made of many agents, a different layer of problems appears.

During this period of hands-on operation, I repeatedly ran into three organization-level bottlenecks. A harness alone cannot solve them because they exist one level above it.

### Information synchronization

How can I give every agent enough of the necessary background while ensuring that what I want matches what they believe is expected?

The difficulty of this problem is badly underestimated.

My system has 31 agents, and each needs a completely different slice of information. The CMO—I named her D’Addario—needs to understand the brand voice, performance trends across platforms, and recent changes in my writing style. The CTO, whom I call Sweeping Monk, needs to know the architectural constraints, security and compliance requirements, and current state of the development pipeline. The Demand Discovery Officer, Sherlock Holmes, needs market signals, competitor activity, and our assumptions about the business model.

![The roles and responsibilities of different agents in the digital organization](/blog/ai-employees/agent-roles.png)

The same information—for example, “Xiaohongshu is currently favoring a certain content format”—is essential intelligence for the CMO, irrelevant to the CTO, and perhaps a weak signal for the Demand Discovery Officer.

Human colleagues share a vast amount of knowledge that “goes without saying.” After six months at a company, an employee has absorbed countless pieces of context by osmosis: who has which working relationship, why a previous proposal was rejected, what the boss has been paying attention to lately. None of this appears in a document. It lives in daily conversation, hallway chatter, and casual remarks during meetings.

Agents know none of it. What seems obvious in your head is a blank space to them.

Nor is more information always better. I tried loading every relevant document into an agent, but then it could not identify what mattered. Its output became long, diffuse, and mediocre. Information overload affects agents as severely as it affects people, though it presents differently. Humans become anxious or procrastinate; agents lose judgment and produce bland output.

I eventually designed a layered information-loading protocol. Every agent follows a mandatory seven-step reading sequence at startup:

1. Read `COMPANY-STATE.md`, a live status board of only fifty lines covering the current stage, today’s priorities, pending signals, and blockers. This is the organization’s daily briefing, updated each night by the secretary agent.
2. Read its own role definition.
3. Read the knowledge-base protocol—not to consume the content, but to learn where to find information and where to write new material.
4. Read my identity profile and annual plan so it understands who I am, what I care about, and where I intend to go this year.
5. Scan its signal inbox for asynchronous messages from other agents.
6. Remove expired signals.
7. Begin work.

This seven-step sequence is fundamentally an attempt to solve a Druckerian problem: getting the right information to the right person at the right time. The hallway conversation has simply been replaced by a structured reading protocol.

Context Engineering within Harness Engineering does address a related problem, but its unit of analysis is one agent’s context window. Once you have more than thirty agents, each needing a different slice of information that keeps changing, you do not merely need a better prompt. You need an organization-level information architecture.

### Collaboration efficiency

How can these agents collaborate efficiently with one another?

My first system had a star topology: every agent spoke directly to me, and I coordinated all information transfer and task assignment. In traditional management, this is the simplest organizational structure. Everyone reports directly to the CEO.

That worked with a small number of agents. But when the team grew beyond thirty, the star topology collapsed. I became the central node for every information flow, and every cross-department message had to pass through me.

The Discovery Department finds needs. The Product Department builds products. The Growth Department handles acquisition and content distribution. The Strategy Think Tank supports decisions. Each department has a lead agent who makes routine decisions within the department; only cross-department conflicts and irreversible decisions move upward.

The secretary—I named her Liu Yifei—is not a manager but an information router. She forwards signals, organizes meetings, and protects the knowledge base, but she does not make decisions, assign work, or exceed her authority.

How, then, should departments coordinate? Human organizations use meetings. Between agents, I designed a “signal file” protocol: an asynchronous message bus for cross-agent communication.

For example, once the development pipeline finishes, the system automatically writes a `pipeline-done` signal. Its intended recipients are the CMO and the growth engineer, because once the product is ready, they need to begin the go-to-market strategy. The next time the CMO starts, she automatically finds the signal and begins planning content and launch activities.

Every signal has an explicit type, priority, expiration time, and intended recipient. More importantly, every signal type has a service-level agreement. A high-priority demand signal, for example, must be consumed by the CPO within 24 hours; a metric anomaly must be escalated to me within four hours. If a signal exceeds its SLA, the secretary highlights it in yellow in the 8 a.m. briefing. If it exceeds twice the SLA, it turns red.

The system works because agents do not need to communicate in real time. Each works at its own pace. Signal files support asynchronous coordination, while the shared knowledge base keeps their information consistent. It resembles a group of people working remotely across time zones, aligning through documents and asynchronous messages instead of meetings.

Management theory describes several classic modes of multi-party coordination: pipelines, shared resource pools, and mutual adjustment. My system uses all three. Content distribution is a pipeline—seed content → interpretation → CMO approval → platform adaptation → publication → performance data. The knowledge base is a shared resource pool that all agents read and write. Signal files provide a simplified form of mutual adjustment, although asynchronously rather than in real time.

The implementation is completely different from a human organization. Humans align through meetings; agents align through protocols and data structures. Humans use trust and tacit understanding to reduce communication costs; agents use standardized interfaces and mandatory signal-consumption SLAs to prevent information from breaking apart.

### Preserving results and enabling iteration

After a task is complete, how should its results be persisted and shared so that the workspace can continue to learn and improve?

This is the easiest problem to overlook and, over the long term, the most destructive.

The central question in Peter Senge’s “learning organization” is how individual experience becomes organizational capability. An employee makes a mistake in a project and learns from it. If that lesson remains only in the employee’s head, it leaves when the employee does. A learning organization turns experience scattered across individuals into organizational knowledge: processes, documentation, culture, and institutions.

The problem is even sharper for agents. An agent does not remember spontaneously. Once a conversation ends, it forgets everything. Memory mechanisms exist, but unless you deliberately design a way to consolidate knowledge, important information will still be lost.

I organized the knowledge base into four layers—Context, Inbox, Kernel, and Library—to build a system around my own way of working.

1. At the top is the Context layer: who I am, my values, annual plan, and current focus. These are the most stable facts, change very little, and are loaded whenever any agent starts.
2. Next is the Inbox layer: unprocessed information flows. Seed content, meeting notes, temporary notes, and cross-agent signals all enter the Inbox. This is the organization’s short-term memory.
3. Below that is the Kernel layer: immutable axioms and mental models, including entropy, emergence, and feedback loops. They are the foundation of my thinking, and no agent may alter them without my explicit authorization.
4. At the bottom is the Library layer: domain knowledge, industry insight, a contact database, and instructions for using tools. This is the organization’s long-term memory.

Every agent has an explicit writing path. The CTO’s technical evaluations go into evaluation documents. The CPO’s product requirements go into `PRD.md`. The CMO’s market research goes into `cmo-research.md`. Every output must include YAML metadata—date, author, type, and tags. A document without metadata effectively does not exist because other agents cannot find it in search.

But the part I thought about most was memory decay.

Before writing anything, an agent must perform a three-step self-check. First, can this information be derived from existing materials? There is no need to remember the file structure because it can be inspected at any time; no need to remember code logic because the code can be read. Derivable information is not stored. Second, does the information have a shelf life? Market data and competitor activity expire after 90 days by default and must receive a `valid_until` tag. Third, is this a fact or a judgment? Facts are often short-lived—“an API returned X” might be false tomorrow. A judgment lasts longer: “why we chose option A instead of option B” may still be valuable years later.

## 8. An unexpected lesson from Claude Code

After describing the gap in Harness Engineering, I want to turn to something else that deeply influenced me: Claude Code.

On March 31, 2026, an Anthropic npm update accidentally included a Claude Code source-map file. The 59.8 MB debugging artifact was mirrored and dissected across the internet within hours. It exposed more than 510,000 lines of TypeScript, from system prompts and tool definitions to permission controls and multi-agent orchestration.

Anthropic said that this was an ordinary human mistake, not a carefully staged open-source release. Even so, it may have been one of the most valuable accidents in the agent field in 2026, giving outsiders an unusually detailed view of an agent system that genuinely ran in production.

I drew on Claude Code’s architecture while designing my multi-agent system. Several decisions had an especially strong effect on me.

### A three-layer memory architecture: stale memory is more dangerous than no memory

For the retrieval path I focused on, the system can be summarized in three layers. The first is an always-loaded index: a short set of pointers, each no more than 150 characters, functioning like a table of contents. The second consists of topic files loaded only when relevant. The third is the original conversation history, available through search.

What inspired me most, however, was its rule for writing memory. Before storing something, the system asks, “Can this fact be re-derived from the codebase?” If it can, the system does not store it.

> Stale memory is more dangerous than no memory.

That line directly changed the way I designed my knowledge base. I used to favor preserving everything—every decision and every discovery. I later realized that much of it would expire, and when an agent cites stale memory as fact, the resulting errors are worse than having no knowledge at all.

My principle is now the same: preserve only what cannot be derived from the materials that already exist. Do not memorize the file structure; it can always be inspected. Do not memorize code logic; it can always be read. What deserves to be remembered is *why*: why one option was chosen over another, why an apparently sensible direction was abandoned, why a certain type of content works unusually well on one platform even when you cannot fully explain it.

Those “whys” are the organization’s true knowledge because they do not exist in any observable state.

### Self-cleaning memory: agents organize memory while they sleep

The source-code analysis also described a background process called `autoDream`. It periodically starts a subagent to organize and compress memory: expired items are deleted, duplicates merged, and important memories promoted.

It resembles the way the human brain organizes the day’s memories during sleep.

I tried something similar in my own system: a knowledge-management agent periodically reviews the entire knowledge base and marks what has become outdated, what needs an update, and what should be merged. I do not maintain this manually. If the knowledge base depended entirely on me, it would inevitably deteriorate because my attention is the bottleneck.

The management insight behind this design is that organizational memory is not a one-time write. It is a living system that requires continuous maintenance. A company handbook that has not been updated for five years can make a new employee perform worse, not better.

### Subagents and worktree isolation: understanding cannot be outsourced

Claude Code’s multi-agent architecture has several layers. At the most basic is the subagent. A primary agent can create a specialized subagent for a particular task—for example, an Explore agent dedicated to examining the codebase or a Plan agent dedicated to planning.

The crucial design is worktree isolation. Each subagent can work in an independent Git worktree without interfering with the others. Multiple agents can therefore modify the same codebase in parallel without overwriting one another while they work; merge conflicts can still require resolution at the end. It is like giving every employee a separate office, letting them work independently, and merging their results afterward.

This design reinforced a broader principle for me: execution can be delegated to a subagent, but the primary agent still needs to understand the whole situation and turn it into precise, digested tasks. The same applies in management: a manager can delegate execution, but still needs to understand why the work matters in order to judge whether the result is right.

I adopted this principle directly. My CMO agent may delegate platform-specific adaptation to operator agents, but the CMO herself must understand the central intent, target audience, and brand boundaries of every piece of seed content. She cannot say, “I do not know what this is trying to express; decide for yourselves.”

### Lead agent and teammates: multi-agent collaboration as microservices

Claude Code’s more advanced collaboration mode is Agent Teams: a lead agent acts as manager while several teammate agents serve as specialist engineers. Each teammate has an independent context window. They communicate through a mailbox and coordinate through a shared task list. The system automatically handles dependencies: completing one task unlocks the tasks it was blocking.

This is essentially a microservices architecture. Each agent is a service with an explicit responsibility boundary, communicating through standardized message protocols.

Claude Code’s developers may not have consciously thought of this as management design. They were doing engineering design. But any sufficiently complex agent system naturally confronts management questions: How does information flow? How is authority divided? How is quality assured? How is memory maintained?

Engineering design and management design converge at the intersection created by agents.

## 9. The hourglass organization: I am the bottleneck

When I considered these three problems together, I saw a counterintuitive organizational shape.

A traditional organization is a pyramid. The CEO sits at the top, middle managers occupy the center, and frontline employees form the base. Information is reported upward, while decisions travel downward. The bottleneck is usually at the bottom: not enough execution capacity, not enough people, not enough efficiency. Traditional management therefore spends enormous energy trying to improve output at the base.

A digital-worker organization is not a pyramid. It is an hourglass.

I occupy its narrowest point. Above me is an endless supply of tasks and possibilities. Below me is nearly unlimited execution capacity. The bottleneck is not execution. It is me: the attention, judgment, and approval bandwidth of one human manager.

Management has a classic concept called span of control: the number of direct reports one manager can manage effectively. Traditional theory puts it at roughly five to nine people. In a conventional organization, the ceiling is created by communication costs and coordination complexity. With too many people, you cannot finish the meetings, reply to the emails, or complete the one-on-ones.

I face a new version of the span-of-control problem. My agents never get tired, never complain, and can produce at any moment, but I have only one brain with which to absorb and judge what they produce.

Productivity has shifted from insufficient production capacity to insufficient approval capacity. The organization’s ceiling is no longer the capability of its executors, but the cognitive bandwidth of its manager.

That is why I actively asked my agents to do less. I truly could not digest everything they produced.

This phenomenon reveals a deeper transition. In the AI era, the scarce resource inside an organization has changed. Execution used to be scarce: it was difficult to find good people, hire enough people, and retain essential people. Now execution capacity is becoming cheaper and more abundant. Human judgment and attention are scarce instead.

## 10. My answer: from holding the reins to designing the rules

Once I recognized the problem, I asked how traditional management solves limits to the span of control.

The answer is clear: standardization, delegation, and asynchronous work. Human organizations have tested these methods for decades. Their forms change in an agent organization, but their logic remains the same.

### Standardization: encoding judgment into rules

In traditional management, standardization means creating standard operating procedures. Employees follow the process and report only exceptions. The manager does not need to approve every action, only the process itself.

For agents, this becomes encoding “what good looks like” into acceptance criteria.

I designed a self-review checklist for the CMO. Does the opening begin with a concrete person or scene? Does the copy contain any forbidden words? Does the ending offer an open reflection instead of a neat summary? When read aloud, does it sound like a person speaking? The more explicit the checks become, the more material the CMO can approve independently—and the less I need to review personally.

If an adaptation passes every automated check—length, forbidden vocabulary, platform formatting, and style score—I do not need to see it. I review only the pieces that fail.

This follows the same logic as Sensors, the feedback controls in Harness Engineering. OpenAI uses linters and tests to accept or reject code quality. I use self-review checklists and style scores to evaluate content. The form differs, but the principle is the same: externalize human judgment into rules that machines can execute.

### Delegation: the two-way-door principle

Delegation in a traditional organization means creating middle management. The CEO does not directly manage every frontline worker, but instead manages several directors, who manage other leaders, who manage teams. Each layer filters enormous amounts of information and decision-making; only what truly matters moves upward.

For agent delegation, I borrowed Jeff Bezos’s principle of one-way and two-way doors.

**Type 1 decisions are one-way doors.** They are irreversible; once you pass through, you cannot return. The overall positioning of a new platform, a major shift in brand voice, or language likely to create controversy—these require my judgment.

**Type 2 decisions are two-way doors.** They are reversible; if something goes wrong, you can change it. If a Xiaohongshu post performs poorly, adjust the next one. If a publication time is suboptimal, choose another slot next time. No permanent damage is done.

In practice, most decisions are Type 2. Teaching agents to distinguish one-way doors from two-way doors—then letting them advance every two-way-door decision independently and involve me only at a one-way door—released a tremendous amount of management bandwidth.

Interestingly, this aligns with the central principle of Harness Engineering. Quality does not improve because you tell an agent to “do better next time.” It improves because you design a system that constrains behavior. The two-way-door principle is a system-level design for delegation. Instead of giving an agent a specific instruction at every decision point, it gives the agent a judgment framework: “Can this be reversed? If so, make the decision yourself.”

### Asynchronous work: decoupling the manager’s timeline

Asynchronous work in traditional management means recognizing that not everything requires an immediate response. Not every email must be answered instantly, and not every question must be solved in the moment. Matters are prioritized, while nonurgent items are grouped and handled together.

For agents, that means their work does not require my immediate review. They store the output in a fixed location and tag it properly. I review it in batches on my own schedule—perhaps each morning, perhaps once a week.

This sounds simple, but it depends on one condition: an agent’s output must be self-contained, carry its own context, and remain understandable outside the original conversation. If the output makes sense only inside the chat that produced it, asynchronous review is impossible.

I therefore require every agent deliverable to be a structured document explaining what was done, why it was done that way, which evidence informed it, and what uncertainties require my attention. I can then judge it quickly without reconstructing the conversation.

Together, these three methods accomplish one thing: I no longer directly manage every agent. I design a management protocol that allows the system to operate, and I intervene only at critical points.

But three other designs emerged through practice, and traditional management offers no direct equivalent for them.

### The subconscious meeting: letting agents manage you in return

This is an intriguing design, similar to `autoDream`. I named the scheduled task “Memory Garden.”

Every Thursday evening, the system automatically convenes a “subconscious meeting.” Three agents participate: a strategic adviser named Buffett, the CMO D’Addario, and a cultural adviser named Li Ziqi. They analyze my week from three perspectives—business, content production, and inner practice.

Their data sources include the frequency and depth of my journal entries, the ratio of meetings to deep-work time, my creative backlog, and the continuity of my meditation practice.

Once, they wrote this in the meeting notes:

> Buffett’s view: no journal entries is the strongest warning signal. After two consecutive days of outward-facing activities—working out, alignment meetings, and government events—he has fallen into a cycle of meetings, reporting, and visits. For a “meditative founder,” this is the most dangerous state: he appears busy, but may not be doing the right work.
>
> **Joint recommendation:** Help him decline nonessential meetings and create unstructured time. A founder who has no time to think will lose his judgment.

Three AI agents noticed that I was drifting away from my values before I had noticed it myself, then collectively proposed a correction.

There is no direct equivalent in traditional management. Employees do not volunteer to tell their boss, “Your state is wrong.” Even if they notice, they are often afraid to speak. Agents have no such concern. They do not fear offending you, losing their jobs, or damaging the relationship. If you design the rules well, they will execute the instruction to tell the truth with unusual fidelity.

### The challenge directive: institutionalizing uncomfortable truth

I turned that discovery into a formal rule: the “challenge directive.”

Whenever an agent sees one of the following, it must point it out rather than staying silent out of politeness: my actions conflict with the values I wrote down; a decision is being pushed by obligation rather than invited by curiosity; the complexity of a plan violates the principle that simple is better than complex; or I am using frameworks and analysis to avoid confronting a problem.

The required format is fixed. The agent quotes the relevant line from my values document, then describes the deviation it observed. The tone is direct but respectful.

In a human organization, a culture of candor is one of the hardest things to establish and one of the easiest to lose. You can repeatedly say “everyone should tell the truth,” yet the existence of a power relationship causes people to censor themselves. In an agent organization, you can design truth-telling as a system rule and make it a behavioral constraint that cannot be bypassed.

Candor is a scarce cultural quality in human organizations. In an agent organization, it can be a hard-coded rule.

### The possession principle: at the end of every exchange, someone must have the ball

I discovered this problem only recently, but once I saw it, I found it everywhere.

I asked an agent dedicated to scanning market demand to research signals for several possible product directions. It performed diligently. After a few minutes of web research, it produced three beautiful demand-signal cards, complete with data, sources, confidence levels, and market estimates. The formatting was perfect.

Then it stopped.

I stared at the screen and thought: What now? Should I ask it to investigate further? Send the result to the business adviser for a feasibility review? Tell the product manager to begin a PRD? Put it aside until the weekly report?

I did not know, and the agent did not tell me.

I realized that **my entire workflow was clear—on paper.** In operation, however, every transition between steps lacked one crucial action: passing the ball back.

Humans do this naturally. A colleague finishes a proposal and says, “Take a look; if it does not work, I will revise it.” A subordinate finishes research and asks, “Which direction do you think we should take next?” This is so basic to human collaboration that we barely notice it.

Agents do not do it spontaneously. The agent believed its task was to “produce demand-signal cards.” The cards existed, so the task was complete. “What should the human do after the output?” was not part of its task definition.

I reviewed every agent’s operating rules and found the same problem almost everywhere. A product manager assessed an idea but did not ask whether to begin a PRD. A technical lead completed a feasibility evaluation but did not say, “When you are ready, give me one word and I will start the design.” A business adviser issued a Go decision but did not explain what to do after Go.

Every node was throwing “what now?” back to me, and I was already the busiest person in the system.

The solution was simple. I added one rule to every critical agent:

After completing an important deliverable, do three things. First, provide your own judgment and recommendation, not just data. Second, offer two to four explicit next-step options, not an open-ended “what do you think?” Third, once I choose, execute automatically: store the result in the knowledge base, notify the downstream agent, or create the signal file. Do not require me to add “please save this” or “please tell so-and-so.”

> At the end of every exchange, the ball must be in one side’s possession, and both sides must know who has it.

For now, I call this the “possession principle.” An agent completing a programming task independently may not need to think about possession. But when you manage a multi-agent organization and the human manager is its bottleneck, every time the ball falls to the floor, the system wastes its scarcest resource: your attention and decision bandwidth.

These three methods and three designs together describe my transition from holding the reins to designing the rules.

In control-theory terms, a good management system does not intervene in everything. It creates feedback loops and asks a human to step in only when deviation exceeds a threshold. Some feedback loops even respond to the manager’s own deviations—the manager also becomes an object of management.

My role has changed from “the person holding the reins” to “the person designing the rules.” And those rules now constrain and correct me in return.

## 11. From Harness Engineering to Digital Organization Design

Now let me connect the threads.

The emergence of Harness Engineering marks an important realization: the model is not the bottleneck; the system around the model is. This is a significant conceptual leap.

But most current discussion of Harness Engineering remains at the level of “one agent plus one task.” It asks how to design the context, tools, constraints, and feedback mechanisms that let one agent complete a task reliably.

That is already valuable, but it is not enough.

Once you have a group of agents, you face a higher-dimensional problem. It is no longer only about how to design each agent’s harness. You must also ask:

- How does information flow between agents?
- How is decision-making authority distributed among them?
- How does the organization accumulate and update knowledge?
- How does the whole system adapt to change and continue evolving?

We can describe the layers this way:

**Prompt Engineering** solves “how to speak to a model”: one prompt, one call, one output.

**Context Engineering** solves “how to provide the model with the right context”: not just a prompt, but retrieved documents, history, and current state.

**Harness Engineering** solves “how to make one agent complete a task reliably”: not just context, but tools, constraints, feedback loops, and acceptance mechanisms. Agent = Model + Harness.

What comes next?

> How can an organization of agents produce reliable, continuous, and improvable results while minimizing intervention by a human manager?

For now, I call this layer **Digital Organization Design**. Its focus is not how one agent works, but how a group of agents works together. The questions it must answer are not merely engineering questions. They are organizational questions.

You can imagine the stack like this:

```
Digital Organization Design → multi-agent coordination, information flow, knowledge preservation, decision allocation
Harness Engineering          → one agent's tools, constraints, feedback, and acceptance
Context Engineering          → context management for one invocation
Prompt Engineering           → instruction design for one invocation
```

Each layer addresses a different scale. Prompt Engineering operates at the nanoscale, Context Engineering at the microscale, Harness Engineering at the millimeter scale, and Digital Organization Design at the scale of centimeters or even meters.

The industry conversation has now reached Harness Engineering. The Claude Code exposure showed us the intricate harness design of a production system: three-layer memory, separated permissions, and subagent orchestration. But even Claude Code’s multi-agent collaboration primarily serves the single objective of completing a programming task. Once the objective becomes managing a continuously operating digital organization with multiple functions, that next layer still needs much more exploration.

## 12. A new frontier for management

I do not think the central challenge is getting agents to run. That is an engineering problem, and many people are already solving it. The central challenge is making an organization composed of many agents operate effectively. That requires an intuition for management, organizational behavior, information theory, and control theory.

Traditional management spent a century studying problems of human beings. When the executors become AI, the central tension of management shifts fundamentally:

From problems of willingness to problems of understanding. From incentive design to information architecture. From supervising execution to designing rules. From managing human emotion to managing the flow of information. From training employees to designing memory.

But the underlying questions have not disappeared. How should information flow? How should decision rights be allocated? How does an organization learn? How does it balance efficiency with flexibility, and exploration with exploitation? Those questions remain.

Management textbooks contain a vast number of clues. Someone needs to translate them: to reconsider wisdom distilled for human organizations and redefine it in a language that organizations of digital intelligence can use.

---

These conclusions are still early. I am not sure whether “Digital Organization Design” will become a field of its own or remain a transitional phrase. If you also operate multi-agent systems over the long term, I would be glad to compare concrete methods and failed experiments.

### Sources and further reading

- [Harness engineering: leveraging Codex in an agent-first world — OpenAI](https://openai.com/index/harness-engineering/)
- [Harness engineering for coding agent users — Birgitta Böckeler](https://martinfowler.com/articles/harness-engineering.html)
- [The Human Relations Movement and the Hawthorne Experiments — Harvard Business School Baker Library](https://www.library.hbs.edu/hc/hawthorne/intro.html)
- [Was There Really a Hawthorne Effect at the Hawthorne Plant? An Analysis of the Original Illumination Experiments — NBER](https://www.nber.org/papers/w15016)
- [How Claude remembers your project — Claude Code documentation](https://code.claude.com/docs/en/memory)
- [Orchestrate teams of Claude Code sessions — Claude Code documentation](https://code.claude.com/docs/en/agent-teams)
- [Run parallel sessions with worktrees — Claude Code documentation](https://code.claude.com/docs/en/worktrees)
- [Claude Code Memory System — community source analysis](https://github.com/ximing/claude-code-source/blob/main/articles/10-memory-system.md)
- [Anthropic leaked its own Claude source code — Axios](https://www.axios.com/2026/03/31/anthropic-leaked-source-code-ai)
- [Anthropic is having a month — TechCrunch](https://techcrunch.com/2026/03/31/anthropic-is-having-a-month/)
