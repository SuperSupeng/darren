---
title: "After a Year of Rapid Growth, Where Do Vector Databases Go Next? A Conversation with MyScaleDB"
archiveYear: "2024"
dateNote: "A conversation from 2024"
authors: [Darren Su]
description: A conversation with MyScale co-founder and CTO Linpeng Tang about vector databases, RAG and long context, combining SQL with vector queries, open source, commercialization, and technological ideals. The discussion retains its 2024 context.
tags: [Vector databases, RAG, MyScale, Open source, Technical conversations]
---

*English translation of [the Chinese original](/zh/blog/myscaledb-vector-database-dialogue).*

> Archive note: This article preserves the content and context of a conversation held in 2024. Its original publication date has not yet been verified.

You could call 2023 the first year of the large-model era. Riding that wave, vector databases also experienced explosive growth and attracted much greater attention.

On the one hand, vector databases and RAG have gained widespread attention and recognition because they can address problems that large models are unlikely to overcome in the short term, such as hallucinations. Attempts to apply vector databases and RAG in real scenarios have also produced promising results.

![A mind map of concepts related to vector databases](/blog/myscaledb-vector-database-dialogue/image-01.png)

On the other hand, we cannot ignore the confusion and controversy surrounding them. Have vector databases already lost their momentum? Will long-context models kill off RAG just as it is gaining traction?

More than a year after ChatGPT's release, how far have vector databases and RAG come? What is their current state, and where are they headed? How do industry experts view the doubts and controversies they face? What technical perspective should practitioners bring to planning their work and careers? These questions led to this conversation.

![Synced livestream poster featuring Darren Su and Linpeng Tang in a conversation about MyScaleDB](/blog/myscaledb-vector-database-dialogue/image-02.png)

The participants were:

- **Darren Su (Su Peng):** organizer of the Vector Search Lab and Shanghai lead for Datawhale
- **Linpeng Tang:** co-founder and CTO of the MyScale AI database

Both had previously been invited speakers at Synced's AI technology forum, “Vector Databases in the Large-Model Era.” Our thanks again to Synced for organizing this livestream.

Tang's team had also recently open-sourced its SQL vector database, MyScaleDB. What is it? Which problems does it solve? Why focus on SQL, and how will it develop? We explored those questions as well.

This article organizes and expands on the livestream, including almost all of the audience's questions. I hope it offers some useful ideas and insights.

## I. Background

Before we get into the conversation, here is some background to help readers follow along.

### 1. Vector Databases

At its core, a vector database addresses the problem of searching unstructured data. What is unstructured data? Datasets made up of text, images, or video are examples. How can this kind of data be searched? Let us use image-to-image search as an example.

![An image being converted into a vector by a convolutional neural network](/blog/myscaledb-vector-database-dialogue/image-03.png)

Feed an image into a model and it generates a set of numbers. That set of numbers is a vector. Send multiple images through the same model and each produces a corresponding vector. Because vectors consist of numbers, arithmetic operations can be performed on them.

![Vector similarity search comparing a query image with images in a database](/blog/myscaledb-vector-database-dialogue/image-04.png)

Here is a concrete example. When a query image arrives, a model converts it into a set of numbers. We can then subtract the existing sets of numbers in the database from the query's numbers, one by one. We treat the result closest to zero as the most similar match.

Working backward, we can identify which two images are most similar. That gives us a simple image-to-image search. In the diagram above, the vector for the input query image produces a result closer to zero when compared with the third image in the database, so we identify those two images as the closest match.

What problems does a vector database need to solve? Suppose you have 10 billion vectors. How should the system architecture be designed? How do you make retrieval fast? How should the data be sharded, and how should its indexes be built? These are examples of the engineering challenges a vector database must address.

![Screenshot of Superlinked's vector database comparison table](/blog/myscaledb-vector-database-dialogue/image-05.png)

Vector database comparison: [https://superlinked.com/vector-db-comparison](https://superlinked.com/vector-db-comparison)

### 2. RAG

Retrieval-Augmented Generation, or RAG, can be traced back to the 2020 paper “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.”

*Paper: [https://arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)*

Vector retrieval is one form of retrieval. Other methods include keyword retrieval and graph-based retrieval, such as searching knowledge graphs.

![The three stages of RAG: retrieval, augmentation, and generation](/blog/myscaledb-vector-database-dialogue/image-06.png)

Image source: [https://www.rungalileo.io/blog/announcing-rag-and-agent-analytics](https://www.rungalileo.io/blog/announcing-rag-and-agent-analytics)

A typical RAG system has three key processes: retrieval, augmentation, and generation. Retrieval has the greatest impact on output quality, latency, and cost.

RAG emerged to address three major challenges facing large models:

1. Hallucinations: generated content may be incorrect, inconsistent with the facts, or even absurd.
2. Timeliness: models may be unable to answer time-sensitive questions, or may give incorrect answers.
3. Private data: because of compliance and other constraints, an organization's private data may not be available on the public internet for model training, leaving a model unable to answer organization-specific questions.

But addressing these problems with RAG introduces challenges of its own:

1. Additional components make the system more complex.
2. Many engineering problems still need to be solved.
3. Knowledge bases need continuous updates and maintenance.
4. Results depend on embedding quality and retrieval effectiveness.

The vector databases discussed above are one of RAG's key architectural elements. That is why people now immediately think of RAG when they hear about vector databases. Our conversation considers the two together.

Since large models became available, people have primarily interacted with them through text. Language and text are forms of unstructured data well suited to vector retrieval. That helps explain why vector retrieval, vector databases, and RAG have become so closely connected—and why people discussing RAG often say they need both a vector database and a large model to build it.

## II. The Conversation

### 1. The History and Current State of Vector Databases

![A workflow from document chunking and embedding to retrieval and answer generation](/blog/myscaledb-vector-database-dialogue/image-07.png)

Image source: [https://myscale.com/blog/what-is-sql-vector-databases/](https://myscale.com/blog/what-is-sql-vector-databases/)

**Darren Su:** Vector databases and vector retrieval have a long history. They did not emerge only after large models. Why did vector databases attract so much attention only after large models appeared? Where does the field stand today?

**Linpeng Tang:** Let me briefly introduce their history and evolution. Before large models, vector databases were already used in many specialized scenarios, including image-to-image search, semantic search, the recommendation systems commonly used online, and anomaly detection in industrial settings. The core idea is to map unstructured data into a vector space and then use vector retrieval to provide those capabilities.

Before large models, these technologies may have been confined to particular fields, but they were already very important. Before developing the MyScale AI database, we built systems with hundreds of billions of vectors for specialized biometric applications. That was when we began accumulating experience with the technology. Over time, people began turning these specialized systems into more general-purpose products. For example:

- Pinecone: a well-known closed-source vector database SaaS product from Silicon Valley
- Milvus: an open-source vector database
- Other products such as Qdrant and Weaviate

These products were generally designed for vector retrieval: wrapping vector-search libraries, designing distributed systems around them, and so on. But they also have shortcomings. For example, their general-purpose data management and query capabilities have not been tested and refined extensively enough, leaving gaps in functionality.

Once large models became widely used, the importance of vectors was suddenly recognized. That led to many integrated vector databases. Elasticsearch, which had been particularly strong at text search, added vector capabilities, as did OpenSearch, which later emerged following the licensing change.

PostgreSQL is an open-source transactional database and one of the most widely used. Its well-designed plugin system also made it possible to add vector capabilities. We have run many evaluations of these systems. In my view, limitations in their architectures, together with insufficient understanding and optimization of vectors, cause performance and accuracy problems in somewhat more complex scenarios—for example, high resource consumption, slow complex queries, and low accuracy.

**Darren Su:** Even without large models, I think vector retrieval would have attracted attention at some point, perhaps this year or next. Unstructured data continues to grow, and people are gradually recognizing that handling it will probably become a discipline in its own right, with vector retrieval becoming an important search method. Once that recognition arrives, progress in vector retrieval can accelerate significantly.

### 2. Long Context vs. RAG

![Vellum's comparison of long context and RAG](/blog/myscaledb-vector-database-dialogue/image-08.png)

Image source: [https://www.vellum.ai/blog/rag-vs-long-context](https://www.vellum.ai/blog/rag-vs-long-context)

**Darren Su:** Vector databases have had what people call a “golden age.” Chroma, for example, raised substantial funding overseas. But many vector database vendors are now concerned that Chinese model companies might enter vector retrieval or particular vertical applications. Long context has been especially prominent recently—for example, Kimi's support for 200K of text. Will long context disrupt RAG applications? Will RAG still exist in the future, or can models themselves already meet these needs?

**Linpeng Tang:** I do think long context has made RAG less important in some scenarios. Previously, you could use RAG techniques to answer questions about or summarize a long document. Now, advanced models with long context windows can generally accommodate a single document, making those smaller applications less significant. Long context can be expensive and sometimes slow, but handling one document is usually not a major problem.

On the other hand, the data held by businesses, industries, and society as a whole is still enormous and complex. A medium-to-large company might have hundreds of thousands of documents and various kinds of heterogeneous data, with different versions of documents related to one another. With data this large and complex, no matter how big the context window is, it cannot hold everything. Retrieval is needed to locate the relevant passages precisely and exclude irrelevant information. For rapidly understanding knowledge and answering questions in these settings, RAG remains necessary.

In work we are doing with partners, we are also seeing deeper integration between RAG and language models. Cohere recently released Command R+, specifically optimized for RAG, and Contextual AI has proposed RAG 2.0. I think RAG may eventually become more than an external add-on, integrating much more deeply with knowledge bases and large models. Sometimes that integration may take the form of complex agent workflows, reducing costs and improving results. These technologies are likely to develop together.

**Darren Su:** As you said, I also think long context will eliminate some RAG use cases. If you have just one or two documents, you may not need RAG at all; you can give them directly to an existing model and expect it to handle them well. But there is a potential problem: when you give a model more irrelevant content, the quality of its answers becomes uncertain, even if the documents fit into a 200K context window.

When you ask a particular question, the model may also pick up irrelevant material, making answer quality hard to guarantee. That may keep the debate between RAG and long context alive for a long time. We should leave open the possibility that the two will move forward together.

### 3. Vector Database Products, Changes, and Commercialization

**Darren Su:** Looking back from where we stand in 2024, what progress or changes have we seen among the database vendors and products we mentioned? How is commercialization progressing?

**Linpeng Tang:** Let us leave aside internal figures that are not appropriate to share publicly. Overall, I think some products are growing very well. Some even expect to meet their targets for this year ahead of schedule. At the same time, everyone can feel how intense the competition remains. AI has been the focus of attention over the past two years, so both large models and vector databases are highly competitive fields.

Which vendors can stay in the race and eventually win the market will probably depend on their grasp of technology and the market, and on whether they can seize opportunities to bring technology, product, and market together effectively.

For MyScale's strategy, the development of long context means that smaller-data scenarios have many product choices and have become less important to us. We are focusing more on scenarios with larger volumes, more complex data modalities, and a need for integrated enterprise data management.

We believe MyScale's SQL + Vector capabilities give it advantages in performance, data density, and cost-effectiveness, so we lean toward medium-to-large businesses and industry applications. We also see large models combined with big data as a trend for the new era, and hope MyScale can become an important data foundation for that paradigm.

**Darren Su:** From a Chinese market perspective, economic conditions and other factors mean that, for large models, there has often been more talk than action—and even more so for vector databases. When choosing products, people tend to prioritize open source, ease of use, and ecosystem support. Still, there is demand in some SaaS scenarios, especially among Chinese companies expanding overseas, which may be more inclined to use SaaS.

### 4. Dedicated Vector Databases vs. Extensions to Traditional Databases

![The source article's positioning diagram for dedicated vector databases, keyword and vector retrieval, and SQL vector databases](/blog/myscaledb-vector-database-dialogue/image-09.png)

Image source: [https://mp.weixin.qq.com/s/JvyKnEbdOSb1fTwhiQTO5A](https://mp.weixin.qq.com/s/JvyKnEbdOSb1fTwhiQTO5A)

**Darren Su:** You mentioned that MyScaleDB is built on ClickHouse. I would like to explore another question. There are dedicated vector databases such as Pinecone and Milvus, and there are vector extensions or capabilities for traditional databases, such as pgvector, Oracle, and TiDB.

If traditional database vendors add some vector retrieval capabilities, does that mean vector retrieval may become a standard database feature? If so, what effect will that have on the overall market and business landscape for vector databases?

If the relational or distributed database I have already bought supports vector retrieval, I may be less likely to buy a separate dedicated vector database.

**Linpeng Tang:** I think that will certainly have a major impact on the market.

There are already many open-source vector databases, and now that the importance of vectors is widely recognized, integrating them is a natural step. As the technology evolves, users whose vector datasets are not especially large and whose query requirements are not especially demanding will have many choices. They will often consider adding a capability from their existing vendor: the system remains simple and meets their basic requirements. That part of the market, which may be a large proportion, will indeed be absorbed. On the other hand, vectors are a new data modality whose importance has been recognized and will receive increasing attention, so the volume of vector data is bound to grow. Vectors are also very resource-intensive to process. A vector may have at least 512 dimensions, with some now exceeding 3,000. In terms of processing difficulty, they can be harder to handle than traditional database or even big-data workloads. Adding vector functionality is not difficult for traditional vendors. The difficult part is making it genuinely good and competitive.

Our team believes both kinds of vector database will coexist for a long time. Based on our research and development so far and the engineering details we have examined, we see no fundamental conflict between column-oriented databases and vectors. If integrated well, the two can work together with essentially no performance loss while providing new benefits, including unified data management and querying and reduced engineering effort. Of course, that integration requires a lot of work, and we are only just getting started. We believe this approach can serve many scenarios with large datasets and complex requirements.

**Darren Su:** My own tentative understanding and prediction is that vector retrieval will very likely become a standard capability in all databases, perhaps alongside AI capabilities such as AIOps and Text2SQL. In some scenarios, users will be able to solve their problems by extending traditional databases with vector retrieval. How broad that category of scenarios becomes will depend on the scale and performance those extensions can support. At this stage, there is no settled answer.

### 5. Could Vectors Become a Universal Data Representation?

![A close-up of numbers illustrating the idea of data representation](/blog/myscaledb-vector-database-dialogue/image-10.png)

Image source: [https://unsplash.com/](https://unsplash.com/)

**Darren Su:** You mentioned that users have plenty of choices when they have relatively little vector data, because small datasets are usually manageable. As the volume grows, though, we increasingly need optimization or specialized approaches.

I recently encountered the idea that vectors might become a universal way of representing data. If that happened, the number of vectors could grow explosively, opening up a huge range of possibilities. What do you make of that idea?

**Linpeng Tang:** We have been thinking about this question for almost ten years. Our earlier biometric work also used vector representations—in fact, multiple vectors that you could think of as a tree or graph of vectors. Large models are certainly a good opportunity now, and history itself moves forward in cycles.

Before large models, most of the requests we received concerned images and video. Since the rise of large models, more of them have been language-related. Some large applications today, such as finance, scientific research, and other knowledge-intensive industries, have enormous amounts of data, which we believe gives our product substantial advantages. Large models are now moving toward cross-modal capabilities, so text, images, and video may come together again. Autonomous driving, for example, may be moving toward a Transformer-based large-model approach, while large models have dramatically expanded the possibilities and practical prospects for embodied intelligence. Overall, we owe a great deal to OpenAI: its persistence in pursuing scaling laws has allowed us to see AI's explosive growth continue to accelerate from last year into this year. We are very optimistic about this field and are actively exploring the emerging combination of large models and big data with our partners and customers.

**Darren Su:** Even before ChatGPT, people had broadly agreed that anything could be embedded. Any data can be represented as vectors, which opens up considerable possibilities. For example, combining an image with the text descriptions “blue background” and “red background” can produce two images. You cannot directly perform that operation on the raw data. Thinking of it as arithmetic between two vectors, rather than through the model, makes the possibilities quite striking. Whether vectors become a universal representation of data will depend on how far the technology evolves.

### 6. Why MyScaleDB Starts with SQL

![MyScale's architecture for combining SQL and vector queries](/blog/myscaledb-vector-database-dialogue/image-11.png)

Image source: [https://myscale.com/blog/why-sql-for-rag/](https://myscale.com/blog/why-sql-for-rag/)

**Linpeng Tang:** We built MyScaleDB by combining it with ClickHouse, a column-oriented SQL database. We focus on jointly optimizing storage and queries for SQL + Vector, and have also done extensive optimization of the vector algorithms.

A column-oriented database like ClickHouse has good support and optimization for structured data, vectors, JSON, spatial data, time-series data, and many other data types. It has also been extensively refined on data at the trillion scale. When choosing our approach, we did consider building a system directly around Faiss; that would certainly have been the quickest route. But we wanted to build something with more lasting impact, so we set out to create an AI database. An AI database cannot support only vectors; it needs to include other data modalities as well. We did not want to reinvent the wheel, though, because building a database requires substantial investment and refinement across many use cases.

MyScale's technical approach involves deeply modifying ClickHouse's high-performance column-oriented SQL database, combining SQL and vector execution and storage engines, and optimizing vector algorithms together with the overall execution and storage systems.

ClickHouse itself has vector capabilities, but at the time of this discussion they are still experimental. MyScale focuses on AI scenarios, on combined vector and SQL queries, and on related AI ecosystem tools. This builds on our deep understanding and know-how in the field, as well as the team's long-standing strengths. Without understanding an industry deeply enough, you cannot think further ahead than your customers. How, then, can you develop leading features or win the market? All of this requires years of experience and thought.

Our starting point is to make a distinctive contribution to the world, so we try to make the most of existing SQL databases. SQL databases have a history of 50 years. They have lived through big data, NoSQL, and other developments, and now we have come back to SQL architectures. In that sense, SQL databases are becoming increasingly vibrant.

To my knowledge, MyScale is the first—and the only—product in the world to support SQL while substantially outperforming dedicated databases in performance and overall cost-effectiveness. SQL + Vector has clear advantages because it is compatible with many established database and big-data processing patterns. But many questions remain unresolved: how to combine SQL with vectors, manage structured and unstructured data well, and integrate better with large models. I believe that, through everyone's efforts, the field will move forward over the next few years.

Despite the considerable challenges, we have taken the code through four or five iterations, addressing many technical difficulties along the way. The version people can see now is one we have refined to a point we are happy with. Most features have already been released in the open-source version, which is fully capable of meeting needs when data volumes are not too large. We welcome people to try it.

GitHub: [https://github.com/myscale/myscaledb](https://github.com/myscale/myscaledb)

If you have larger requirements—tens of millions of vectors or more, for example—or other commercial needs, you are welcome to contact us or use our SaaS version at myscale.com.

### 7. What Difference Does SQL Compatibility Make?

![SQL's ease of use, reliability, data management, and ability to scale](/blog/myscaledb-vector-database-dialogue/image-12.png)

Image source: [https://myscale.com/blog/why-sql-for-rag/](https://myscale.com/blog/why-sql-for-rag/)

**Darren Su:** For a vector database, what difference do you think compatibility with SQL statements—or the choice of interface—makes now and in the future? What thinking led you to make that choice?

**Linpeng Tang:** The well-known database researcher Professor Andy Pavlo has suggested that vector databases may eventually take two forms. One is an integrated database. SQL + Vector would certainly be an important category, since SQL is the main language for querying structured databases. But combining and optimizing the two systems remains challenging. The other form is a dedicated vector database such as Pinecone, which will have its own place. To survive over the long term, dedicated vector databases would ideally integrate and work well with more mainstream data systems such as SQL—in other words, serve as a good add-on while pursuing exceptional ease of use and cost-effectiveness.

**Darren Su:** Why choose April 2024 as the point to launch, including the open-source version?

**Linpeng Tang:** There was no particular reason beyond taking the code through four or five iterations before we felt it was ready. People may wonder whether we launched too late: we started early, designing and developing the system before around 2020, and the market is already very active. Friends and investors have asked us that too. But I am not worried, because deeper real-world adoption of large models and the paradigm of large models combined with big data may only just be beginning.

There may have been more hype in the market last year. This year, we are seeing more practical adoption, so it is a reasonably good time. Of course, I also think large-model technology needs to keep progressing. I hope our approach can eventually integrate more deeply with large models and lead to better AI systems.

### 8. Did You Design Your Own SQL Rules?

**Darren Su:** Does that mean you designed the rules for your SQL statements yourselves?

**Linpeng Tang:** We added a special index type: a vector index. We have some recommended defaults and try to simplify configuration and parameters so that users do not have to specify very much.

For retrieval, we also have a UDF called a distance function, which uses the index to return the nearest vectors. We may extend this later. For example, we recently added inverted indexes, and may next add combined queries over vectors and inverted indexes, followed by multi-vector representations and retrieval.

Beyond that, we will integrate with and extend support for more industries. This feels a little like the early days of enterprise information systems, when companies such as Oracle helped a wide range of industries. We hope SQL vector databases can play a similar role, which means optimizing for different industries' needs and adding different operators. We are working with customers to refine these capabilities together.

**Darren Su:** It does seem that many vendors are considering SQL as a way to provide vector retrieval. Each is developing its own approach. Could this eventually push the SQL specification to expand?

**Linpeng Tang:** I do not think it will change very much. SQL already has UDFs and various dialects. It has not changed fundamentally in the 50 years since it was invented, so I do not see a major problem—just some extensions.

### 9. Why Open Source?

![Unlocked and locked icons representing open-source and closed-source software](/blog/myscaledb-vector-database-dialogue/image-13.png)

Image source: [https://kinsta.com/knowledgebase/open-source-vs-closed-source/](https://kinsta.com/knowledgebase/open-source-vs-closed-source/)

**Darren Su:** Why did you decide to open-source MyScaleDB rather than simply launch a commercial version?

**Linpeng Tang:** We do have a commercial version. Our most advanced SQL vector engine is offered commercially, because the company needs to survive. But our open-source version is more than sufficient for fewer than five million vectors, and includes full SQL + Vector support and inverted indexes. Compared with other products, we believe MyScaleDB offers meaningful differences and advantages. By open-sourcing it, we also hope people will try it first. Sales cycles can be long, and using the open-source product lets people experience our technical capabilities, understand MyScaleDB better, and build trust. So releasing an open-source version is partly about contributing to society and partly about increasing the visibility of the company and product.

**Darren Su:** Many infrastructure teams in China choose the open-source path. Since PingCAP began open-sourcing its work, many infrastructure startups have released open-source products first and then explored commercialization. Open source is not, in itself, a business model. Put bluntly, it can be more of a way to reach the market and earn users' trust. People can try the open-source features while other features are paid for and supported through a commercial version.

At the same time, opening up technology lets more people see it and provide feedback, which in turn helps the technology improve. That is also a contribution to technical progress, so it is not purely a commercial activity.

**Linpeng Tang:** Yes, I agree. I also think that although open source is something a company does, it is not simply a commercial act. If making money were the only reason to start a company, there would certainly be easier ways. Having chosen infrastructure and technology, we want to help industries through technology and test whether that can work commercially.

We do bring technical ideals and a sense of social responsibility to this. Open source can increase mutual trust, which is especially important in infrastructure. It lets users try things at lower or even zero cost, and they may then be more willing to pay for our product. Infrastructure products also need ecosystem partners across many industries; letting those partners start with an open-source version often makes things easier. So I think open source and business can work very well together.

### 10. What Is Next for MyScaleDB?

![The source article's roadmap diagram for the MyScale AI database and agent toolchain](/blog/myscaledb-vector-database-dialogue/image-14.png)

Image source: [https://mp.weixin.qq.com/s/JvyKnEbdOSb1fTwhiQTO5A](https://mp.weixin.qq.com/s/JvyKnEbdOSb1fTwhiQTO5A)

**Linpeng Tang:** We recently launched inverted-index functionality, which is important to many customers. Pinecone, Qdrant, and Weaviate should all have this now, but we have found their capabilities relatively weak compared with Elasticsearch. Of course, we cannot expect to surpass Elasticsearch across all its surrounding features; it has accumulated 20 years of experience and is a well-known international company. For now, we can at least meet users' basic needs and then iterate according to customer requirements. We believe we have major advantages over Elasticsearch in vectors, and that our SQL interface offers distinct benefits as well. We hope that, before too long, we can become an alternative to Elasticsearch and find a place in that market.

![The source article's performance and accuracy comparison of MyScale, pgvector, and Elasticsearch](/blog/myscaledb-vector-database-dialogue/image-15.png)

We also see opportunities across industries and are working with companies in finance, manufacturing, scientific research, education, medicine, and other fields, optimizing around their needs. There is a great deal to do in SQL + Vector: optimizing queries, adding features, and improving distributed vector queries over enormous datasets, among other things. We hope to advance this work together with customers and partners.

In the SQL database era, many vendors invested in tools around their databases to make their products easier to use. In the AI era, those surrounding tools include data parsing, embedding, and RAG or agent workflows.

We are also developing our own tools and methodologies, and may consider open-sourcing some of them later. But we are cautious about open source: we want the work to be good enough before releasing it. There is a lot we could do, and we need to look ahead while focusing on what will actually serve customers and partners.

### 11. What Is the Future of AI Databases?

**Darren Su:** Let us return to vector databases. MyScaleDB positions itself as an AI database, rather than simply a vector database. How do you see the transition from vector databases to AI databases developing? What directions or trends might emerge?

**Linpeng Tang:** If we position ourselves as an AI database, we need to manage the data relevant to AI. It is not “one size fits all,” but I think it is “one size fits most.” Our technical choices, for example, mean that transaction processing is not especially efficient. If your workload has many transactions, you may still need pgvector or TiDB. TiDB is compatible with MySQL and has added vector retrieval. In my view, though, vector functionality in systems like these has fundamental limitations—for example, row-oriented storage can make complex queries and data analysis difficult to optimize.

If you have enormous amounts of data to analyze and query, across different types and modalities, that falls within our idea of an AI database. We will refine those capabilities according to customer and market needs. Why did we add inverted indexes? Because demand from the language-model market is strongest, and customers need that feature, so we scheduled the work.

For other modalities, if we later want to serve applications involving biological proteins and DNA, autonomous driving, or embodied intelligence, we will need to support the relevant modalities and functions. There are also the requirements we mentioned for unstructured data ingestion—the unstructured data pipeline—and RAG workflows. We think the product should combine some technical foresight with iteration informed by the needs of customers at the leading edge of the market.

### 12. A Technological Idealist?

![An astronaut and robot illustration created with OpenAI DALL-E](/blog/myscaledb-vector-database-dialogue/image-16.png)

Image source: Created with OpenAI DALL-E

**Darren Su:** From our conversation, I get the sense that you have high aspirations for technology. Recent discussions of technological idealism involving Yang Zhilin, Wang Xiaochuan, and Zhu Xiaohu have attracted a lot of attention. Would you consider yourself a technological idealist?

**Linpeng Tang:** I think there is an element of technological idealism in what I do. In our earlier biometric work, for example, we brought what I would describe as a disruptive improvement to the industry. We automated existing systems, improved performance by several hundred to a thousand times, and helped solve tens of thousands of major cases. Interestingly, demand in that market was limited, so in a sense our technology made the market smaller. Commercially, it was not a particularly successful venture. But from a public-safety perspective, I believe our work noticeably improved how society operated. Despite the limited commercial success, the sense of achievement has stayed with me for a long time. That may be the idealistic part.

AGI is more complex and raises many controversies. Sam Altman, for example, may be speaking partly from a market-positioning perspective when he says AGI will arrive soon, that AI will fundamentally change how society works, and that we need to consider Universal Basic Income, or UBI. In one sense, I think the UBI mechanism he proposes needs careful design. I do agree that AI will change society in significant ways. But how it changes society—for better or for worse—is something we can still influence and have a say in. Ultimately, a large model is a relatively static, virtual entity. It competes with people in many areas and may be used in products that keep people immersed in unhealthy habits. Is that the society we want to live in? Is it the society we want our children to live in? I, at least, find that hard to accept.

Our starting point places more emphasis on data. We see data as the link between large models and the world, and between large models and users. If we can combine models and data well—at the product level, the system level, or even within the deeper mechanisms of how models operate—we can also make them more efficient. We are already working on several of these areas, either ourselves or with partners. I think we have an opportunity to build AI that is more specialized, more up to date, and more effective at working with people. That kind of collaboration can create a stronger sense of value and achievement. It could help civilization become more vibrant and expand outward, rather than converge or collapse. We are working toward these possibilities and very much hope to help bring that vision about.

We need to build this together with partners and customers. I also think that process offers an opportunity to create more value, because such a system is more aligned with human needs. It does not conflict with business; it can be a business model that does good. I believe the two can be combined. Having taken some wrong turns before, though, we remain careful on the commercial side.

**Darren Su:** Yes, healthy business models can exist. I understand technological idealism in two ways. The first is “Don't be evil.” We should use technology to change the world, but not from harmful motives; we should create social value. The second is a conviction that technology can innovate and lead, even when most people do not yet understand it.

That concludes the conversation. Below are the questions asked by viewers during the livestream. Tang answered them together, with additional comments from Su, for readers' reference.

## III. Audience Q&A

### 1. Are Vectors the Same as Approximate Computation?

Vectors are not synonymous with approximate computation. Approximate computation is a method used in machine-learning processes involving vectors. For example, recommendation systems or document retrieval can use Approximate Nearest Neighbor (ANN) algorithms to speed up search.

### 2. Can Vector Databases Run on Edge Devices? What Are the Prospects?

Vector databases can run on edge devices with sufficient resources, such as vehicles or edge servers. MyScale, for example, also supports compilation for ARM. Edge devices are becoming more capable and will increasingly work together with the cloud, so the prospects are promising.

### 3. In RAG, Accuracy Seems to Be the Bottleneck Rather Than Vector Retrieval Speed. How Do You See This?

Both efficiency and accuracy are critical in RAG, and vector databases play a vital role. By optimizing search strategies, such as pre-filtering and post-filtering, vector databases can improve retrieval efficiency. Combining structured-data filtering with vector and keyword retrieval can improve accuracy overall.

### 4. Accuracy Is Not Just ANN Recall, but Relevance to the Original Data. Are Efficiency and Accuracy Still Important Database Metrics?

The relevance of retrieved results to the original data depends on the algorithms used to parse documents, split them into chunks, and embed them. For a vector database itself, efficiency and accuracy remain the main measures. As customers' data volumes grow, the cost of supporting a given number of vectors also becomes important.

### 5. How Many Vectors, and at What Dimensionality, Are Recommended per ANN Deployment Unit? Here, a Unit Means One Machine or Instance.

In general, if the data fits on one machine, avoid moving to a distributed setup. Taking MyScale Cloud as an example, at the time of the conversation a single machine could hold up to 320 million vectors with 768 dimensions.

### 6. Can SQL Be Thought of as a Web Front End for a Vector Database?

Most vector databases provide their own RESTful interfaces. MyScaleDB uses SQL as its interface. As a general-purpose database language, SQL allows MyScaleDB to offer richer functionality.

### 7. Which Indexes Does MyScaleDB Support, and Are They All Open Source?

The open-source version of MyScaleDB supports ScaNN, HNSW(SQ), and IVF(SQ/PQ) indexes. We generally recommend ScaNN because it offers the best overall balance of vector retrieval performance and index-building time. In the enterprise version, MyScaleDB recommends the Multi-Scale Tree Graph (MSTG) vector engine. For datasets of tens of millions of vectors or more, we report a 10× increase in data density and a performance improvement of nearly an order of magnitude.

### 8. Does MyScaleDB Have Plans for a Knowledge Base? How Does a Knowledge Base Differ from a Vector Database?

MyScaleDB itself is a SQL vector database. A knowledge base needs a more complete interface, including document ingestion, parsing, embedding, and semantic retrieval. We will consider providing these capabilities in other product modules or open-source projects.

### 9. Are Transactions Necessary for Vectors, or Mainly for Other Scalar Fields in a Vector Table?

Although a vector database is called a database, its use is closer to that of a search engine. Transactions are therefore not central. In general, vector databases guarantee eventual consistency rather than providing a transaction mechanism.

### 10. How Are Different Data Modalities Aligned into a Shared Vector Representation? Does a Model Encode and Align Them Before Storage?

This is generally handled by the embedding model. For example, CLIP can map images and text into a shared vector space.

### 11. What Research Directions in Vector Databases Are Still Worth Exploring?

- Greater vector acceleration using heterogeneous hardware
- Multi-vector representations of unstructured data for more precise matching
- Hybrid queries
- Queries over dynamic data
- Data security and privacy

### 12. For a Modest Workload, Such as 500,000 Vectors with 128 Dimensions, How Should You Choose Between a Vector Library and a Vector Database?

- If the work is experimental, there is no other metadata, and there is little need for filtered vector search, a vector library may be sufficient.
- For production requirements, or combined queries over structured data, vectors, and keywords, a database is still recommended.

---

[Public original on mdnice](https://www.mdnice.com/writing/5076589a233f4bc597a0bf5d9055d042)
