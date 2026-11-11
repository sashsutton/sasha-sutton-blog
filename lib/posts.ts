import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

/** What each post declares at the top of its .mdx file: `export const meta = { … }`. */
export type PostMeta = {
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  /** Drafts show up in `npm run dev` but are left out of the published site. */
  draft?: boolean;
};

export type Post = PostMeta & {
  slug: string;
  readingMinutes: number;
  Content: ComponentType;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export const showDrafts = process.env.NODE_ENV !== "production";

function slugs() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!slugs().includes(slug)) return null;

  const mod = (await import(`@/content/posts/${slug}.mdx`)) as { default: ComponentType; meta: PostMeta };
  const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  const words = source.split(/\s+/).filter(Boolean).length;

  const post = { ...mod.meta, slug, readingMinutes: Math.max(1, Math.round(words / 220)), Content: mod.default };
  return post.draft && !showDrafts ? null : post;
}

/** Every visible post, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(slugs().map(getPost));
  return posts.filter((post): post is Post => post !== null).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
