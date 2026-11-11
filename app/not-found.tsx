import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-20">
      <h1 className="font-serif text-6xl tracking-tight">Not found.</h1>
      <p className="mt-6 text-muted">This page doesn&apos;t exist, or the post has moved.</p>
      <p className="mt-8 text-sm">
        <Link href="/" className="draw-underline text-muted hover:text-fg">
          ← All posts
        </Link>
      </p>
    </section>
  );
}
