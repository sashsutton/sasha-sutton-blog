import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import os from "node:os";

/**
 * This machine's LAN addresses, so `npm run dev` also works when opened from
 * a phone on the same Wi-Fi. Next 16 blocks dev resources from unlisted
 * origins, which would leave the page un-hydrated. Development only.
 */
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((net): net is os.NetworkInterfaceInfo => !!net && net.family === "IPv4" && !net.internal)
  .map((net) => net.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanAddresses,
};

/**
 * Posts are MDX: Markdown plus React components.
 * Plugins are named as strings so they work with Turbopack.
 *  - remark-gfm:        tables, strikethrough, task lists, footnotes
 *  - remark-math:       $inline$ and $$display$$ maths…
 *  - rehype-katex:      …rendered to HTML at build time (no client JS)
 *  - rehype-pretty-code: syntax highlighting via Shiki, light + dark themes
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-math"],
    rehypePlugins: [
      ["rehype-katex", {}],
      [
        "rehype-pretty-code",
        { theme: { light: "github-light", dark: "github-dark-dimmed" }, keepBackground: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
