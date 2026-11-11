import { ogCard, ogSize, siteKicker } from "../../og";
import { getPost, getPosts } from "@/lib/posts";

export const alt = "Post preview";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function PostImage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  return ogCard({ kicker: siteKicker, title: post?.title ?? "Writing" });
}
