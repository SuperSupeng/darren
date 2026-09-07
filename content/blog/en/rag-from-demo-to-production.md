---
title: "A RAG Demo in a Week, Still Not in Production Six Months Later. What Can We Do?"
archiveYear: "2024"
dateNote: "2024 technical note"
authors: ["Darren Su"]
description: "A 2024 paper review of RAG and external-data augmentation, covering four kinds of query: explicit facts, implicit facts, interpretable rationales, and hidden rationales, with their challenges and approaches."
tags: ["RAG", "Paper Reviews", "Large Language Models", "Retrieval-Augmented Generation"]
---

*English translation of [the Chinese original](/zh/blog/rag-from-demo-to-production). Code examples and original figures are preserved.*

This technical note is from 2024 and preserves the technical context in which it was written. The date on the [public mdnice copy](https://www.mdnice.com/writing/4baf5f0484e14f4bb7c189d59ab29ab7) reflects when that copy was made public, not when the article was written or first published. The original publication date remains unverified.

It has been almost two years since ChatGPT was released. People have been trying to put large language models into practical use, yet the results often fall short. A familiar line online is: "A RAG demo in a week, but still not in production six months later." Where does it go wrong, and can we fix it? This recent paper from Microsoft systematically reviews the situation. Let us take a look.

Retrieval Augmented Generation (RAG) and Beyond: A Comprehensive Survey on How to Make your LLMs use External Data More Wisely

![Original figure 1](/blog/rag-from-demo-to-production/figure-01.png)

Paper: [https://arxiv.org/pdf/2409.14924](https://arxiv.org/pdf/2409.14924)

## Paper overview

The authors argue that there is no one-size-fits-all approach to data-augmented LLMs. Poor performance often comes from failing to identify the central demands of a task, or from a task requiring several capabilities in combination. Those capabilities need to be broken down so that the problem can be addressed more effectively.

The paper therefore classifies RAG tasks into four levels of user queries: explicit fact queries, implicit fact queries, interpretable rationale queries, and hidden rationale queries.

![Paper overview: original figure 2](/blog/rag-from-demo-to-production/figure-02.png)

For each level, from Level 1 through Level 4, the paper identifies the corresponding challenges and approaches to addressing them.

![Paper overview: original figure 3](/blog/rag-from-demo-to-production/figure-03.jpg)

### 1. Explicit fact queries

> These queries concern explicit facts that are directly present in external data and require no additional reasoning. This is the simplest form of query: the model's main task is to locate and extract the relevant information. **For example, "Where will the 2024 Summer Olympics be held?" asks for a fact contained in external data.**

![1. Explicit fact queries: original figure 4](/blog/rag-from-demo-to-production/figure-04.png)

#### 1.1 Main challenges

At this level, the main requirement is to retrieve the correct data so that the LLM can provide an accurate answer. Because it is efficient, flexible, and relatively inexpensive, RAG is the most commonly used technical approach for these queries. Even with RAG, however, building a robust, high-quality system presents substantial challenges:

- **Difficult data processing:** External data is often highly unstructured and contains multimodal components such as tables, images, and videos. Dividing or "chunking" this data also makes it challenging to preserve its original context and meaning.

- **Difficult data retrieval:** Retrieving relevant passages from large, unstructured datasets can be computationally expensive and error-prone. Developing a retrieval mechanism that is both efficient and accurate is difficult.

- **Difficult evaluation:** Evaluating a RAG system, particularly at the component level, is complex. It requires robust metrics that accurately assess the quality of both data retrieval and response generation.

#### 1.2 Techniques

##### 1.2.1 Improving data processing

Document parsing typically involves extracting information from text, tables, and figures so that relevant passages can be identified and retrieved accurately.

**Multimodal document parsing:** Handling multimodal material in source documents, such as charts, tables, or even videos such as meeting recordings, is one of the most frequently mentioned problems. There are generally two approaches. The first converts multimodal content into text.

![1.2.1 Improving data processing: original figure 5](/blog/rag-from-demo-to-production/figure-05.png)

For example, table-to-text methods turn tables into text. Other techniques convert visual content into textual or attribute-based descriptions that a large language model can then process.

![1.2.1 Improving data processing: original figure 6](/blog/rag-from-demo-to-production/figure-06.png)

![1.2.1 Improving data processing: original figure 7](/blog/rag-from-demo-to-production/figure-07.png)

The second approach uses multimodal embeddings, supplying embeddings retrieved from multimodal data as soft prompts in the input.

![1.2.1 Improving data processing: original figure 8](/blog/rag-from-demo-to-production/figure-08.png)

![1.2.1 Improving data processing: original figure 9](/blog/rag-from-demo-to-production/figure-09.png)

**Chunking optimization:** Splitting a long document into chunks is a common and necessary step. Larger chunks preserve more semantic continuity, but they also tend to include more noise. Common strategies include fixed-size chunking, recursive chunking, sliding-window chunking, paragraph-based chunking, and semantic chunking.

![1.2.1 Improving data processing: original figure 10](/blog/rag-from-demo-to-production/figure-10.png)

Some methods determine the level of detail a query needs and use that to select an appropriate retrieval granularity.

![1.2.1 Improving data processing: original figure 11](/blog/rag-from-demo-to-production/figure-11.png)

![1.2.1 Improving data processing: original figure 12](/blog/rag-from-demo-to-production/figure-12.png)

Others process and refine the text into smaller passages while preserving as much of the information as possible.

![1.2.1 Improving data processing: original figure 13](/blog/rag-from-demo-to-production/figure-13.png)

Still others use vision models to segment text according to the original document structure.

![1.2.1 Improving data processing: original figure 14](/blog/rag-from-demo-to-production/figure-14.png)

##### 1.2.2 Improving data retrieval

**Indexing:** This includes sparse retrieval, dense retrieval, and hybrid retrieval.

![1.2.2 Improving data retrieval: original figure 15](/blog/rag-from-demo-to-production/figure-15.png)

**Query-document alignment:** Align the query with passages in the external data to identify the passages best suited to answering it.

![1.2.2 Improving data retrieval: original figure 16](/blog/rag-from-demo-to-production/figure-16.png)

- **Conventional alignment:** Map document passages and queries into the same representation space.

- **Document-domain alignment:** Generate synthetic answers first, then use them to retrieve relevant data. This addresses the mismatch between the distributions of queries and retrieved data. HyDE is a notable example.

![1.2.2 Improving data retrieval: original figure 17](/blog/rag-from-demo-to-production/figure-17.png)

- **Query-domain alignment:** Generate a set of synthetic questions for each atomic unit of text, mapping passages into query space. Then retrieve the synthetic questions closest to the original query, along with their corresponding passages.

![1.2.2 Improving data retrieval: original figure 18](/blog/rag-from-demo-to-production/figure-18.png)

This approach helps select passages that are both relevant and appropriate to the query's context.

![1.2.2 Improving data retrieval: original figure 19](/blog/rag-from-demo-to-production/figure-19.png)

**Reranking and correction:** After retrieving the top k chunks, a RAG system needs to filter and rerank them. Most RAG systems rank passages using the relevance scores supplied by the retriever. Some research instead uses specific measures such as perplexity or perplexity gain.

![1.2.2 Improving data retrieval: original figure 20](/blog/rag-from-demo-to-production/figure-20.png)

![1.2.2 Improving data retrieval: original figure 21](/blog/rag-from-demo-to-production/figure-21.png)

Other work uses an LLM to assess the credibility and usefulness of retrieved chunks, training a pluggable, reward-driven context adapter to improve the retriever's output.

![1.2.2 Improving data retrieval: original figure 22](/blog/rag-from-demo-to-production/figure-22.png)

Some research also focuses on pretraining a small language model specifically for fact verification. It filters out incorrect retrieved chunks to improve the quality of the retrieved text.

![1.2.2 Improving data retrieval: original figure 23](/blog/rag-from-demo-to-production/figure-23.png)

##### 1.2.3 Optimizing response generation

When generating a response, the system needs to determine whether the retrieved information is sufficient or whether more external data is required. Resolving conflicts between retrieved knowledge and the model's internal prior knowledge is also essential. Supervised fine-tuning is an effective way to improve generation in a RAG system.

![1.2.3 Optimizing response generation: original figure 24](/blog/rag-from-demo-to-production/figure-24.png)

![1.2.3 Optimizing response generation: original figure 25](/blog/rag-from-demo-to-production/figure-25.png)

![1.2.3 Optimizing response generation: original figure 26](/blog/rag-from-demo-to-production/figure-26.png)

Irrelevant or incorrect retrieved context can easily mislead pretrained LLMs into generating incorrect responses. Many studies show that carefully designed RAG training data, used in fine-tuning or pretraining, can help mitigate this problem.

![1.2.3 Optimizing response generation: original figure 27](/blog/rag-from-demo-to-production/figure-27.png)

Some studies also train the retriever and generator jointly to make their performance within the RAG system more consistent.

![1.2.3 Optimizing response generation: original figure 28](/blog/rag-from-demo-to-production/figure-28.png)

![1.2.3 Optimizing response generation: original figure 29](/blog/rag-from-demo-to-production/figure-29.png)

![1.2.3 Optimizing response generation: original figure 30](/blog/rag-from-demo-to-production/figure-30.png)

### 2. Implicit facts

> These queries concern facts that are implicit in the data rather than directly stated. They may require some commonsense reasoning or basic logical inference. The necessary information may be distributed across several passages, or a simple inference may be needed. **For example, "What is the current majority party in the country where Canberra is located?" can be answered by combining the fact that Canberra is in Australia with information about Australia's current majority party.**

![2. Implicit facts: original figure 31](/blog/rag-from-demo-to-production/figure-31.png)

#### 2.1 Main challenges

- **Adapting the amount of retrieval:** Different questions may require different amounts of retrieved context, depending on the question and the dataset. A fixed retrieval quantity can introduce noise or leave the system short of information.

- **Coordinating reasoning and retrieval:** Reasoning can guide what to retrieve, while insights from retrieved information can iteratively refine the reasoning strategy. Handling this complexity requires intelligently integrating and selectively using external data while making full use of the LLM's inherent reasoning capabilities.

#### 2.2 Techniques

##### 2.2.1 Iterative RAG

**Planning-based strategies:** Generating a step-by-step retrieval plan in advance, or updating a plan dynamically during retrieval, can sharpen the focus of each step and guide an iterative RAG system efficiently. ReAct, for example, updates the objective at each step to close the knowledge gaps needed to answer the question.

![2.2.1 Iterative RAG: original figure 32](/blog/rag-from-demo-to-production/figure-32.png)

IRCoT and RAT use chain of thought to guide the RAG process, deciding what to retrieve next based on information retrieved earlier.

![2.2.1 Iterative RAG: original figure 33](/blog/rag-from-demo-to-production/figure-33.png)

![2.2.1 Iterative RAG: original figure 34](/blog/rag-from-demo-to-production/figure-34.png)

GenGround alternates between two stages until it reaches a final answer: (1) generate a simpler, single-step question and answer it directly; (2) ground the question-answer pair in the retrieved documents, checking and correcting any inaccuracies in the prediction. This iterative process is designed to make responses more reliable and accurate.

![2.2.1 Iterative RAG: original figure 35](/blog/rag-from-demo-to-production/figure-35.png)

**Information-gap-filling strategies:** ITRG introduces a framework for iterative collaboration between retrieval and generation. It first generates an answer from existing knowledge, then continues retrieving information and generating responses for the unknown parts in subsequent rounds.

![2.2.1 Iterative RAG: original figure 36](/blog/rag-from-demo-to-production/figure-36.png)

Similarly, FLARE revisits and revises low-probability tokens in the generated answer at each iteration.

![2.2.1 Iterative RAG: original figure 37](/blog/rag-from-demo-to-production/figure-37.png)

Self-RAG, meanwhile, fine-tunes a large model to decide for itself when to keep searching and when to stop searching and answer the question.

![2.2.1 Iterative RAG: original figure 38](/blog/rag-from-demo-to-production/figure-38.png)

##### 2.2.2 Question answering with graph and tree structures

The traditional **knowledge graph (KG)** was one of the early structures used to improve the efficiency of LLMs. Each node represents an entity, and the edges represent relationships between entities.

![2.2.2 Question answering with graph and tree structures: original figure 39](/blog/rag-from-demo-to-production/figure-39.png)

Because LLMs have strong reading comprehension, they can understand text without reducing it to the finest granularity of entities and relationships. Researchers have therefore begun exploring text or data chunks as nodes in graph or tree structures, with edges representing higher-level or more deliberately designed relationships.

- Knowledge-Graph-Prompting discusses three common types of question that require uncovering implicit facts: (a) bridge questions that rely on sequential reasoning; (b) comparison questions that rely on parallel reasoning across passages; and (c) structural questions that rely on retrieving content from the corresponding document structure.

![2.2.2 Question answering with graph and tree structures: original figure 40](/blog/rag-from-demo-to-production/figure-40.png)

To address these questions, Knowledge-Graph-Prompting uses entity recognition, TF-IDF, KNN, and document structure hierarchies to build a document graph and extract subgraphs for answering questions.

- MoGG takes one or two sentences as the smallest semantic unit, uses these units as nodes, and creates edges based on semantic similarity between nodes. It also trains a predictor to determine the chunk granularity needed to answer a query, and thus the size of the required subgraph.

![2.2.2 Question answering with graph and tree structures: original figure 41](/blog/rag-from-demo-to-production/figure-41.png)

- RAPTOR uses a clustering algorithm to hierarchically cluster chunks at the smallest granularity, capturing higher-level semantic relationships between them. It summarizes new semantic information at each level and retrieves the most necessary information from the resulting hierarchy of nodes.

![2.2.2 Question answering with graph and tree structures: original figure 42](/blog/rag-from-demo-to-production/figure-42.png)

- GraphRAG also uses clustering. It first connects the smallest chunks based on semantic similarity, then groups nodes using a community detection algorithm. Finally, it generates a global answer to the query by analyzing the responses within each node community.

![2.2.2 Question answering with graph and tree structures: original figure 43](/blog/rag-from-demo-to-production/figure-43.jpg)

##### 2.2.3 Translating natural language into SQL queries

When working with structured data, translating natural-language queries into SQL, or NL2SQL, is an effective approach.

![2.2.3 Translating natural language into SQL queries: original figure 44](/blog/rag-from-demo-to-production/figure-44.png)

### 3. Interpretable rationales

> These queries require more than knowledge of the facts. They require the ability to understand and apply domain-specific reasoning that is closely tied to the data's context. This reasoning is often explicitly documented in external resources but may have been absent or rare in a general LLM's pretraining. **For example, in pharmaceuticals, an LLM must interpret FDA guidance to assess whether a drug application meets regulatory requirements. In customer support, it must navigate the complexity of predefined workflows to handle user queries effectively. In medicine, many diagnostic manuals provide authoritative, standardized criteria, such as guidelines for managing patients with acute chest pain. Following this external reasoning effectively could support specialized LLM expert systems for chest pain management.** It also involves understanding the procedural steps and decision trees that guide a support agent's interactions with customers, ensuring that responses are accurate and consistent with the company's service standards and protocols.

![3. Interpretable rationales: original figure 45](/blog/rag-from-demo-to-production/figure-45.png)

The data is commonly organized in the following forms:

- **Plain text:** This may include specialized or official documents such as manuals and guidelines, as well as domain-specific operating manuals or instructions. These texts set out the reasoning needed to make decisions in complex situations. For example, guidance issued by the U.S. Food and Drug Administration (FDA) for pharmaceutical factories, or medication guidance used by physicians, provides insight into how experts such as FDA officials and doctors approach particular cases.

- Structured instructions: descriptions resembling finite-state machines, such as the process a customer support agent follows, using a manual, to handle a user's product replacement or refund request.

![3. Interpretable rationales: original figure 46](/blog/rag-from-demo-to-production/figure-46.png)

#### 3.1 Main challenges

- **The cost of prompt optimization:** Optimizing prompts often takes substantial time and computation. Different queries require particular background knowledge and decision criteria, so a diverse set of examples is needed. Handcrafted prompts can be effective, but they are labor-intensive and time-consuming. Training models to generate prompts tailored to different queries also requires significant computing resources, increasing the cost further.

- **Limited interpretability:** The effect of prompts on LLMs is often opaque. Access to the models' internal parameters is restricted in most cases, making it hard to assess precisely how different prompts affect them. This lack of transparency makes it difficult to consistently understand and verify whether the models' responses to different prompts have coherent, interpretable explanations.

#### 3.2 Techniques

##### 3.2.1 Prompt tuning

For interpretable rationale queries, the central question is how to incorporate reasoning provided by external data into an LLM effectively, and ensure that the model accurately follows and responds according to it.

![3.2.1 Prompt tuning: original figure 47](/blog/rag-from-demo-to-production/figure-47.png)

Text2MDT provides a practical example, introducing two methods for automatically extracting medical decision trees from clinical guidelines and textbooks. This process makes the logical chains in lengthy medical texts clearer and easier to understand.

![3.2.1 Prompt tuning: original figure 48](/blog/rag-from-demo-to-production/figure-48.png)

MedDM develops a format for clinical guidance trees (CGTs) that LLMs can execute. It also proposes a method for reasoning with these executable trees and a framework for multi-turn dialogue between patients and LLMs.

![3.2.1 Prompt tuning: original figure 49](/blog/rag-from-demo-to-production/figure-49.png)

InstructRec aims to use LLM capabilities in recommendation systems. It designs a general format that describes user preferences, intentions, task forms, and context in natural language, creating a high-performing, language-based recommendation system.

Incorporating reasoning directly as natural-language instructions does not always produce the best performance, and manually designing prompts is slow and inefficient. Prompt tuning therefore becomes particularly important for improving an LLM's ability to follow specific reasoning. Reinforcement learning is one effective approach, as demonstrated by the TEMPERA framework.

![3.2.1 Prompt tuning: original figure 50](/blog/rag-from-demo-to-production/figure-50.png)

The framework defines a reinforcement-learning action space with a finite set of instructions, examples, and verbalizers for constructing prompts. The probability that an LLM generates the correct answer serves as the reward, guiding the model toward the best prompt configurations across datasets.

![3.2.1 Prompt tuning: original figure 51](/blog/rag-from-demo-to-production/figure-51.png)

Rlprompt also uses reinforcement learning. It trains an adapter that helps a smaller language model generate the best prompts, using feedback based on the relative accuracy of the LLM's answers.

![3.2.1 Prompt tuning: original figure 52](/blog/rag-from-demo-to-production/figure-52.png)

Another strategy, Directional Stimulus Prompting, uses downstream task performance as the reward. It trains a model to extract and use directional stimuli, meaning clues or keywords tailored to a particular instance, as prompts so that the LLM's behavior aligns more closely with the intended result.

![3.2.1 Prompt tuning: original figure 53](/blog/rag-from-demo-to-production/figure-53.png)

Edit-based methods such as GrIPS are also used to optimize within a discrete prompt space. GrIPS uses a small dataset as a scoring set and experimentally scores prompt edits, including deletion, swapping, paraphrasing, and addition, to find an effective configuration quickly.

![3.2.1 Prompt tuning: original figure 54](/blog/rag-from-demo-to-production/figure-54.png)

Recent work also points toward using LLMs themselves to support prompt optimization.

![3.2.1 Prompt tuning: original figure 55](/blog/rag-from-demo-to-production/figure-55.png)

OPRO uses an LLM to generate new prompt candidates from historical data and their associated performance metrics, then scores these prompts to simplify the optimization process.

![3.2.1 Prompt tuning: original figure 56](/blog/rag-from-demo-to-production/figure-56.png)

The Reflexion framework introduces prompt optimization based on linguistic feedback. A language model analyzes its outputs and stores reflections on them in an episodic memory buffer. This memory helps improve decisions in future interactions and supports evaluation using accumulated insights from past attempts.

![3.2.1 Prompt tuning: original figure 57](/blog/rag-from-demo-to-production/figure-57.png)

##### 3.2.2 CoT

Complex reasoning requires extended reasoning chains from an LLM, unlike the discrete pieces of factual information involved in fact queries.

- Chain of Thought (CoT)

![3.2.2 CoT: original figure 58](/blog/rag-from-demo-to-production/figure-58.png)

- Tree of Thoughts (ToT)

![3.2.2 CoT: original figure 59](/blog/rag-from-demo-to-production/figure-59.png)

- Graph of Thoughts (GoT)

![3.2.2 CoT: original figure 60](/blog/rag-from-demo-to-production/figure-60.png)

Chain of thought, tree of thoughts, and graph of thoughts have shown considerable effectiveness in this setting. For topics that are well studied and widely applicable, manually designing CoT prompts is a viable approach.

![3.2.2 CoT: original figure 61](/blog/rag-from-demo-to-production/figure-61.png)

For example, Ji et al. (2023) propose a self-reflection approach that combines knowledge acquisition with answer generation. Using external tools and designed prompts, they build three self-reflection loops: factual knowledge acquisition, knowledge-consistent answering, and question-entailment answering. These loops bring external reasoning into the model's process.

![3.2.2 CoT: original figure 62](/blog/rag-from-demo-to-production/figure-62.png)

Wu et al. (2024) manually analyze types of errors in clinical notes and design three CoT prompts to direct GPT-4's attention to intervention, diagnosis, and management errors. These targeted prompts enable the model to detect errors in clinical notes automatically, identify the affected spans, and correct them.

![3.2.2 CoT: original figure 63](/blog/rag-from-demo-to-production/figure-63.png)

Although manually designed CoT prompts can be effective, they require significant human effort and time. To reduce these costs, Automate-CoT proposes automatically generating enhanced reasoning chains from a dataset with limited labels. It uses a variance-reduced policy-gradient strategy to assess the importance of each CoT chain and help select the most effective combination of prompts.

![3.2.2 CoT: original figure 64](/blog/rag-from-demo-to-production/figure-64.png)

Another way to use CoT prompts is to build agent workflow systems around LLMs. This usually means developing a more comprehensive system for different real-world situations. According to Wang et al., such systems can generally be divided into profile, memory, planning, and action modules. Interpretable rationales can be incorporated in different forms across these modules, allowing agents to adapt and iterate in response to their environment or human feedback.

![3.2.2 CoT: original figure 65](/blog/rag-from-demo-to-production/figure-65.png)

Recent work such as LLM Reasoners and SocREval focuses on automatically evaluating the quality of reasoning chains. These methods also support the development of data-augmented LLM applications.

![3.2.2 CoT: original figure 66](/blog/rag-from-demo-to-production/figure-66.png)

Applications based on interpretable rationales span several domains. CoML, for example, incorporates AutoML knowledge into an LLM as prompts, dynamically retrieves useful information from previous experiment records, and combines these elements so the LLM can develop machine-learning solutions for new tasks.

![3.2.2 CoT: original figure 67](/blog/rag-from-demo-to-production/figure-67.png)

MetaGPT develops a multi-agent system for software development in which different project stakeholders are represented by individual agents. This setup allows several agents to collaborate according to real-world workflows and complete software development tasks effectively.

![3.2.2 CoT: original figure 68](/blog/rag-from-demo-to-production/figure-68.png)

Similarly, complex agent systems have been designed for areas such as customer service and medical question answering.

![3.2.2 CoT: original figure 69](/blog/rag-from-demo-to-production/figure-69.png)

![3.2.2 CoT: original figure 70](/blog/rag-from-demo-to-production/figure-70.png)

In these domains, agent systems are tailored to particular types of query, whether that means understanding complex user requests or providing accurate medical information. The systems improve the quality of interactions as well as response efficiency and accuracy, illustrating the broad applicability and potential of LLMs when integrated into carefully designed agent workflows.

### 4. Hidden rationales

> These queries involve a more challenging form of reasoning: it is not explicitly documented but must be inferred from patterns and outcomes in external data. Implicit reasoning here includes both unstated reasoning chains and logical relationships, as well as the inherently difficult task of identifying and extracting the external reasoning a particular query requires. **For example, in IT operations, a cloud operations team may have handled many past incidents, each with its own circumstances and solution. An LLM must be able to uncover successful strategies and decision processes within this implicit knowledge. Similarly, the history of previously debugged software errors can provide substantial implicit insight. Although the step-by-step reasoning behind every debugging decision may not have been systematically recorded, the LLM must extract the underlying principles that guided those decisions.** By synthesizing this implicit reasoning, the LLM can generate responses that are accurate and reflect the tacit expertise and problem-solving approaches that experienced professionals have developed over time.

![4. Hidden rationales: original figure 71](/blog/rag-from-demo-to-production/figure-71.png)

Sources of data containing hidden reasoning may include, but are not limited to:

- **In-domain data:** Hidden-rationale queries may use data from the same domain, such as historical question-answer records or human-generated examples. This data already contains reasoning skills or methods needed to answer the current query. For example, in a difficult Python programming problem, solutions to previous problems often contain classic algorithms and problem-solving strategies that can help solve the current one.

- **Foundational knowledge:** Another form of hidden reasoning resides in widely distributed knowledge bases whose application varies across situations. This foundational knowledge may constitute a complete axiomatic system, such as the local laws and regulations underlying legal judgments. It can also include verified intermediate conclusions that simplify reasoning in areas such as mathematical proofs. For real-world problems, this prior knowledge may come from the complex accumulation and distillation of human experience.

![4. Hidden rationales: original figure 72](/blog/rag-from-demo-to-production/figure-72.png)

#### 4.1 Main challenges

- **Retrieving by logic:** For questions involving hidden reasoning, the usefulness of external data depends on more than shared entities or semantic similarity. Logical consistency or alignment with the underlying theme matters more. Standard retrieval methods often struggle to capture a query's real objective or identify passages with a similar logical structure. More sophisticated retrieval algorithms are therefore needed to analyze and identify the logic behind the question, rather than relying only on surface-level textual similarity.

- **Insufficient data:** External data may not explicitly contain guidance or answers directly relevant to the current query. Useful information is often embedded in scattered knowledge or conveyed indirectly through examples. This indirect presentation requires strong interpretation and synthesis capabilities from the LLM so that it can derive coherent answers from dispersed or indirectly related sources.

#### 4.2 Techniques

##### 4.2.1 Offline learning

![4.2.1 Offline learning: original figure 73](/blog/rag-from-demo-to-production/figure-73.png)

A common approach to these queries is to identify and extract rules and guidance from a dataset offline, then retrieve the relevant items. For generating rationales, methods such as STaR and LXS use LLMs. STaR uses an iterative few-shot approach to grow from a small dataset to a larger one. LXS introduces a two-role explanation-extraction process in which a learner model generates explanations and a critic model evaluates and verifies them.

![4.2.1 Offline learning: original figure 74](/blog/rag-from-demo-to-production/figure-74.png)

GL identifies mistakes through in-context learning and generalizes them into guidance for future tasks. LEAP generates mistakes, low-level principles, and high-level principles to develop reasoning principles, then incorporates these principles into the prompt for final reasoning.

![4.2.1 Offline learning: original figure 75](/blog/rag-from-demo-to-production/figure-75.png)

RICP uses mistakes in training data to generate high-level reasoning and specific insights. It then groups error patterns through hierarchical clustering, produces task-level and problem-level principles, and combines them to provide problem-specific insights.

![4.2.1 Offline learning: original figure 76](/blog/rag-from-demo-to-production/figure-76.png)

Buffer-of-Thought uses a problem distiller to distill a meta-buffer across multiple reasoning tasks.

![4.2.1 Offline learning: original figure 77](/blog/rag-from-demo-to-production/figure-77.png)

Some integrated approaches, such as MedPrompt, use GPT-4-generated chains of thought as training examples and combine them, through self-verification, with in-context learning based on KNN retrieval.

![4.2.1 Offline learning: original figure 78](/blog/rag-from-demo-to-production/figure-78.png)

Agent Hospital generates rationales through reflection and uses both record retrieval and experience retrieval over the generated data.

Although these concepts go by many names, including guidelines, principles, experience, and thought templates, the central idea is to extract useful recurring rationales to improve reasoning queries. These rationales may come from self-generated chains of thought, as in MedPrompt and Buffer-of-Thought; mistakes in training data, as in GL, RICP, and Agent Hospital; or deliberately generated mistakes, as in LEAP. Some principles apply across tasks, as in Agent Hospital and RICP, while others are retrieved dynamically for a particular problem, as in MedPrompt and Buffer-of-Thought. Many studies show that learning from cases to accumulate experience as a basis for reasoning benefits a variety of reasoning tasks.

##### 4.2.2 In-context learning (ICL)

![4.2.2 In-context learning (ICL): original figure 79](/blog/rag-from-demo-to-production/figure-79.png)

In-context learning with examples is a common way to reveal hidden rationales. Pretrained LLMs exhibit substantial in-context learning ability, which can be strengthened by retrieving examples based on similarity and drawing on the model's few-shot learning capabilities. However, irrelevant information in the prompt can easily distract the model and lead to incorrect responses.

![4.2.2 In-context learning (ICL): original figure 80](/blog/rag-from-demo-to-production/figure-80.png)

OpenICL, developed by Wu et al., provides an ICL framework that explores how different conventional approaches to example retrieval and inference affect the effectiveness of in-context learning.

Smaller models can also be trained to select the best examples and demonstrations using feedback from the LLM on in-context examples. This provides a more targeted way to improve context construction for a particular task.

![4.2.2 In-context learning (ICL): original figure 81](/blog/rag-from-demo-to-production/figure-81.png)

Zhang et al. also propose Auto-CoT, which clusters examples into representative types. By sampling diverse questions and generating reasoning chains, it constructs examples that better support the learning process.

However, enabling LLMs to acquire reasoning skills outside their training domains through few-shot learning remains a major challenge. Wang et al. improve the likelihood of selecting the correct reasoning chain by sampling multiple reasoning paths, marginalizing over them, and choosing the most consistent answer.

![4.2.2 In-context learning (ICL): original figure 82](/blog/rag-from-demo-to-production/figure-82.png)

Agarwal et al. introduce two scalable ways to generate usable examples: reinforced ICL and unsupervised ICL. These approaches aim to replace manually generated examples and expand the pool of available demonstrations.

![4.2.2 In-context learning (ICL): original figure 83](/blog/rag-from-demo-to-production/figure-83.png)

DIN-SQL decomposes a task into simpler subtasks and uses their solutions as prompts for the LLM, substantially improving text-to-SQL performance.

![4.2.2 In-context learning (ICL): original figure 84](/blog/rag-from-demo-to-production/figure-84.png)

Similarly, DUP identifies three main problems LLMs face when using chain of thought to solve complex mathematical word problems: semantic misunderstanding, calculation errors, and missing steps. Semantic misunderstanding is the main limitation. Encouraging the model to understand the problem more deeply and extract the information essential to solving it can substantially improve mathematical problem-solving, particularly by addressing semantic misunderstanding.

![4.2.2 In-context learning (ICL): original figure 85](/blog/rag-from-demo-to-production/figure-85.png)

In-context learning is being applied increasingly widely across mathematics, law, medicine, finance, and other fields. It plays an essential role in developing data-augmented LLM applications, extending the models' capabilities and improving their practical usefulness across domains.

##### 4.2.3 Fine-tuning

Although LLMs have strong in-context learning capabilities, accurately identifying the relevant rationales or best examples within complex, lengthy logical chains remains difficult. Supplying large amounts of external prior knowledge can also challenge their reasoning ability. These factors make fine-tuning a promising approach. It can draw on the broad foundational knowledge acquired during pretraining while helping a model quickly learn new domain-specific reasoning. This offers a practical path toward greater adaptability and effectiveness on advanced, specialized tasks.

Instruction tuning is a common way to add new capabilities to LLMs, usually through supervised fine-tuning on paired instruction-output data. There are three main ways to construct an instruction dataset:

- Extract data from existing datasets.

![4.2.3 Fine-tuning: original figure 86](/blog/rag-from-demo-to-production/figure-86.png)

- Create data manually by writing instructions.

![4.2.3 Fine-tuning: original figure 87](/blog/rag-from-demo-to-production/figure-87.png)

- Generate synthetic data using LLMs.

![4.2.3 Fine-tuning: original figure 88](/blog/rag-from-demo-to-production/figure-88.png)

Many studies also explore how to optimize the distribution of data in instruction datasets to improve fine-tuning. However, fine-tuning remains relatively time-consuming and computationally intensive when building data-augmented LLM applications. Recent work has sought to reduce these costs. Adapter tuning, for example, integrates small adapter models with an LLM during fine-tuning, freezing the LLM's parameters and optimizing only the adapter weights.

![4.2.3 Fine-tuning: original figure 89](/blog/rag-from-demo-to-production/figure-89.png)

Prefix tuning and prompt tuning add a set of trainable vectors before the input. These vectors are optimized during training to improve the LLM's performance.

![4.2.3 Fine-tuning: original figure 90](/blog/rag-from-demo-to-production/figure-90.png)

Low-rank adaptation approximates update matrices by imposing low-rank constraints on each dense layer, reducing the number of trainable parameters needed to adapt the model to downstream tasks.

![4.2.3 Fine-tuning: original figure 91](/blog/rag-from-demo-to-production/figure-91.png)

In recent years, considerable work has used supervised fine-tuning to strengthen LLMs in specific domains, including mathematical reasoning, finance, law, and healthcare. ChatTimeLlama, for example, introduces an interpretable temporal-reasoning instruction-tuning dataset and fine-tunes LLaMA on it, substantially improving complex temporal reasoning, prediction of future events, and interpretability.

![4.2.3 Fine-tuning: original figure 92](/blog/rag-from-demo-to-production/figure-92.png)

LISA fine-tunes the multimodal LLM LLaVA using a small set of passage-based data samples involving reasoning, substantially improving its reasoning segmentation capabilities.

![4.2.3 Fine-tuning: original figure 93](/blog/rag-from-demo-to-production/figure-93.png)

MAmmoTH carefully constructs a dataset of mathematical examples combining chain-of-thought and program-of-thought reasoning. Broad coverage of different mathematical domains improves an LLM's ability to solve general mathematical problems.

![4.2.3 Fine-tuning: original figure 94](/blog/rag-from-demo-to-production/figure-94.png)

ReFT proposes learning from multiple annotated reasoning paths for the same question. It automatically samples many reasoning trajectories for a given mathematical problem and uses the correct answer to generate reward signals.

![4.2.3 Fine-tuning: original figure 95](/blog/rag-from-demo-to-production/figure-95.png)

ChatDoctor fine-tunes LLaMA on 100,000 doctor-patient conversations from a widely used online medical consultation platform. The study reports substantial improvements in the model's ability to understand patients' needs and provide useful advice.

![4.2.3 Fine-tuning: original figure 96](/blog/rag-from-demo-to-production/figure-96.png)

FinGPT develops an open-source LLM fine-tuned on financial data, using automated data management and lightweight low-rank adaptation.

![4.2.3 Fine-tuning: original figure 97](/blog/rag-from-demo-to-production/figure-97.png)

DISC-LawLLM creates a supervised fine-tuning dataset for China's judicial domain. Fine-tuning equips LLMs to provide stronger legal reasoning for different users across a range of legal scenarios.

![4.2.3 Fine-tuning: original figure 98](/blog/rag-from-demo-to-production/figure-98.png)

## Closing thoughts

In practice, data-augmented LLM applications usually involve a combination of query types. Developers therefore need to design a routing pipeline that brings several methods together to address these complex challenges effectively.

---

*Author's note: The basic architecture of a RAG system may be straightforward, but combining and evaluating different query categories, data formats, and techniques such as CoT to achieve good results is challenging. An effective path is an iterative cycle: build the business application → collect feedback → adjust the data and prompts → fine-tune the model and apply reinforcement learning.*
