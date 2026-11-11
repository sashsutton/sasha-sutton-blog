import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

/** Every post is rendered to static HTML at build time. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const { Content } = post;

  return (
    <article className="pt-14 sm:pt-20">
      <header className="mb-12 border-b border-fg pb-8">
        <p className="font-mono text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          {post.draft && <span className="ml-2 text-accent">· draft</span>}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1] tracking-tight text-balance sm:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{post.summary}</p>
      </header>

      <div className="prose">
        <Content />
      </div>

      <p className="mt-16 text-sm">
        <Link href="/" className="draw-underline text-muted hover:text-fg">
          ← All posts
        </Link>
      </p>
    </article>
  );
}
