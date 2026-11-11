import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

/** /sitemap.xml — helps Google find every post. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    { url: site.url },
    ...posts.map((post) => ({ url: `${site.url}/posts/${post.slug}`, lastModified: post.date })),
  ];
}
