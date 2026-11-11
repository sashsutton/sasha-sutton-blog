/** Site-wide settings. Edit here; no component needs touching. */

/**
 * The public address of the blog, used for RSS, the sitemap and link
 * previews. Set NEXT_PUBLIC_SITE_URL on Vercel once you have a domain;
 * until then Vercel's own production URL is used automatically.
 */
const url =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Sasha Sutton",
  title: "Sasha Sutton — Writing",
  description: "Tutorials and short research write-ups on machine learning, maths and sound.",
  intro: "Tutorials and short research write-ups — mostly machine learning and maths, sometimes sound.",
  url,
  links: {
    // Add the portfolio's address here and a "Portfolio" link appears in the header.
    portfolio: "",
    github: "https://github.com/sashsutton",
    scholar: "https://scholar.google.com/citations?hl=en&user=6fiOkWgAAAAJ",
    linkedin: "https://www.linkedin.com/in/sashasutton4",
  },
};
