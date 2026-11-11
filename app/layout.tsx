import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { site } from "@/lib/site";
import "katex/dist/katex.min.css";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website" },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

const nav = [
  ...(site.links.portfolio ? [{ label: "Portfolio", href: site.links.portfolio }] : []),
  { label: "GitHub", href: site.links.github },
  { label: "RSS", href: "/rss.xml" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body className="bg-bg font-sans text-fg antialiased">
        <div className="mx-auto flex min-h-svh w-full max-w-2xl flex-col px-5 sm:px-6">
          <header className="flex h-16 items-center justify-between gap-6">
            <Link href="/" className="font-serif text-2xl tracking-tight">
              {site.name}
            </Link>
            <nav aria-label="Main">
              <ul className="flex items-center gap-5 text-sm text-muted">
                {nav.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="draw-underline transition-colors hover:text-fg">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-24 flex flex-wrap justify-between gap-4 border-t border-line py-8 font-mono text-xs text-muted">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <span className="flex gap-5">
              <a href={site.links.scholar} className="draw-underline hover:text-fg">
                Scholar
              </a>
              <a href={site.links.linkedin} className="draw-underline hover:text-fg">
                LinkedIn
              </a>
              <a href="/rss.xml" className="draw-underline hover:text-fg">
                RSS
              </a>
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
