# Sasha Sutton — writing

A simple blog for notes, tutorials and short research write-ups. It shares the
portfolio's fonts and colours but is a separate site.

```bash
npm install
npm run dev     # http://localhost:3000 (drafts are visible here)
npm run build   # what Vercel runs; drafts are left out
```

## Writing a post

1. Add a file to `content/posts/`, e.g. `my-post.mdx`. The file name becomes the
   address: `/posts/my-post`.
2. Start it with its details:

   ```js
   export const meta = {
     title: "My post",
     date: "2026-11-20",
     summary: "Shown on the home page and in link previews.",
     draft: true, // remove to publish
   };
   ```

3. Write Markdown below. Code blocks, `$maths$`, `$$display maths$$`, tables,
   footnotes, `<Note>` and `<Figure>` all work. See
   `content/posts/how-to-write-a-post.mdx` for an example of each.
4. Commit and push. Vercel publishes it.

Images go in `public/images/`. Interactive demos are React components in
`components/demos/`, imported at the top of a post.

## Settings

`lib/site.ts` holds the blog's name, description and links. Set
`NEXT_PUBLIC_SITE_URL` on Vercel once the blog has its own domain.

## Built in

- Post list and post pages, rendered to static HTML
- Syntax highlighting (Shiki), light and dark
- Maths (KaTeX), rendered at build time
- RSS feed at `/rss.xml`, sitemap at `/sitemap.xml`
- A link-preview image for every post
- Dark mode following the visitor's system setting

## Layout

```
app/              layout, home page, post page, RSS, sitemap, preview images
components/       Note, Figure, demos/
content/posts/    the posts (.mdx)
lib/              site.ts (settings), posts.ts (loads posts)
public/images/    images used in posts
```
