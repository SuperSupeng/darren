# Content Strategy

The site is Darren Su's bilingual public record of work: developer ecosystem programs, conference collaborations, early-user product workshops, AI and agent talks, products, and writing.

Chinese and English should communicate the same verified facts. They do not need to be literal translations: English copy should add context that an international reader may not have, while Chinese copy can assume more familiarity with China's technology and community landscape.

## Audience and Promise

The primary audience is a team, event organizer, community, university, or conference considering a concrete collaboration with Darren.

Every public page should help that reader answer four questions:

1. What kind of work does Darren do?
2. What did he personally handle?
3. What was actually completed?
4. What is the simplest way to begin a relevant conversation?

The site should not imply capabilities, geographic reach, client work, or results that are not supported by a published project or product.

## Voice and Interface Copy

Write in Darren's first-person voice: warm, direct, and specific about the work. Introduce the person on the homepage; use clear names such as Work, Products, Writing, and Collaboration for navigation and page titles.

The 3D studio is a visual setting. Visitors should not need to interpret room metaphors to understand a page or choose a link. Avoid invented brand names, ornamental slogans, and repeated claims that work is “real” or creates “connections”; describe what happened instead.

For teams considering collaboration, explain who a format suits, what Darren can personally contribute, and what information would help start a conversation. Keep the tone conversational without implying an agency, a guaranteed result, or services beyond the published record.

## Source of Truth

- `src/lib/portfolio.ts` is the source of truth for public work, case studies, metrics, and collaboration paths in both languages.
- `src/lib/site-content/{en,zh}.ts` holds the About, Products, Writing, and SEO narratives still used by those routes.
- `content/blog/{en,zh}/` holds finished public essays and field notes. A translated version may share a slug, but each language must be reviewed on its own.
- `messages/*.json` should contain navigation and small interface labels rather than strategic page copy.
- Page-local copy is acceptable for a page-specific editorial introduction, but facts and repeated service claims should come from the shared sources above.

When a fact changes, update its source rather than patching several rendered pages independently.

## Public Themes

- Developer events and multi-city ecosystem programs.
- Conference and technology-brand collaborations.
- Cross-border ecosystem visits and product feedback workshops.
- Practical AI and multi-agent work systems.
- Products built from recurring problems in community, events, and hiring work.
- Long-term community practice and the personal disciplines behind it.

Robotics, hardware, supply chain, market-entry work, or other adjacent topics should only become primary themes after there is real, publishable work to support them.

## Case Study Standard

Every project in the public work index should have a case page containing:

- Context: why the work existed.
- Role: what Darren personally handled.
- Process: the small number of actions that moved it forward.
- Outcome: a concrete, supportable result.
- Reflection: one useful lesson without turning the case into advertising copy.

Use approximate numbers when the underlying record is approximate. Do not turn participation, reach, or invitations into stronger business outcomes unless they are verified.

## Writing Standard

Publish after there is something real to record. Field notes should preserve what happened and what changed in Darren's understanding; essays should make a clear argument grounded in direct practice.

Before publishing, confirm:

- Frontmatter is complete and the date is accurate.
- Every local image exists and has meaningful alternative text.
- Every external reference still resolves and is described honestly.
- Long pieces have a linked table of contents.
- A second-language version is either complete or intentionally unavailable; never show an empty link.

## Public Source Formats

The HTML page is the canonical source for every article and case. Its `source.md` download is generated from the same content, with author, language, original article date, canonical URL, and absolute reference/image links. RSS includes the full published articles through the same renderer used on the website. Do not hand-edit a second copy of these exports.

Article frontmatter uses single-line `title`, `date`, `description`, and a non-empty inline `tags` list. The production parser accepts LF/CRLF/CR and a UTF-8 BOM, but rejects missing or invalid metadata instead of substituting a build date. Preserve original publication dates. Project years describe the work, not the publication date of the case page. Do not add `lastModified` to the sitemap until a verified editorial update date is maintained separately.

After changing routes or source formats, run `npm run audit:seo` against a built, running preview. Keep all published HTML pages, Markdown variants, feed entries, and language alternatives in agreement. Source-download routes must enumerate both `locale` and `slug` when generated; testing a handler in isolation does not verify the deployed route exists.

## Maintenance Rhythm

- Add or update a case page when a public project reaches a meaningful milestone.
- Add a field note when the experience contains evidence or judgment that the case page cannot show.
- Update Product pages only when status, signal, or direction changes.
- Keep private relationship knowledge in the appropriate private system, not on the public site.
- Run the repository's full quality check before publishing.

The goal is a compact, credible body of work: cases prove execution, writing shows judgment, products demonstrate building ability, and the collaboration page sets clear expectations.
