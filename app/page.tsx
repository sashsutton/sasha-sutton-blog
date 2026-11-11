import Link from "next/link";
import { formatDate, getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <section className="pt-14 pb-12 sm:pt-20">
        <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl">
          Writing<em className="text-accent">.</em>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-muted">{site.intro}</p>
      </section>

      {posts.length === 0 ? (
        <p className="border-t border-fg py-10 text-muted">First post coming soon.</p>
      ) : (
        <ol className="border-t border-fg">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link href={`/posts/${post.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <time dateTime={post.date} className="pt-1.5 font-mono text-xs text-muted">
                  {formatDate(post.date)}
                </time>
                <div>
                  <h2 className="font-serif text-3xl leading-tight text-balance transition-colors group-hover:text-accent">
                    {post.title}
                    {post.draft && (
                      <span className="ml-3 rounded-full border border-line px-2 py-0.5 align-middle font-mono text-[11px] text-muted">
                        draft
                      </span>
                    )}
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted">{post.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
