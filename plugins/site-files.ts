import type { HtmlTagDescriptor, Plugin } from "vite";
import { SITE } from "../site.config.ts";

const page = (hash = "") => `${SITE.url}/${hash}`;

function robots(): string {
  return ["User-agent: *", "Allow: /", "", `Sitemap: ${SITE.url}/sitemap.xml`, ""].join("\n");
}

/** One page site, so one url. Sections are hash anchors, which crawlers ignore. */
function sitemap(): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${page()}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`,
    "</urlset>",
    "",
  ].join("\n");
}

/** Plain markdown summary for language models, per llmstxt.org. */
function llms(): string {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "Users tag songs in their Apple Music library. Tags can be simple (Focus, Road Trip), hold a value (Energy 8, Mood: Happy), or be suggested by an LLM. A query combines tags with and, or, and not groups built by drag and drop, and runs over every song Cadenza knows, not only the user's library. Results play right away or save as a live playlist. Every play and skip is logged, which drives an Analytics tab.",
    "",
    "Built with Expo and React Native (iOS and Android), Apple MusicKit through a native module, a Rust backend (axum, SeaORM) on Supabase postgres, LLM tag generation, and a Python embedding service. A University of Utah capstone project.",
    "",
    "## Sections",
    "",
    ...SITE.sections.map((section) => `- [${section.title}](${page(`#${section.id}`)}): ${section.summary}`),
    "",
    "## Optional",
    "",
    `- [Website source](${SITE.sourceUrl}): this site, Vite + React + TypeScript.`,
    "",
  ].join("\n");
}

function manifest(): string {
  return JSON.stringify(
    {
      name: SITE.name,
      short_name: SITE.name,
      description: SITE.description,
      start_url: "/",
      display: "standalone",
      background_color: SITE.themeColor,
      theme_color: SITE.themeColor,
      icons: [
        { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      ],
    },
    null,
    2,
  );
}

/** Generated files, by the path they are served at. */
const FILES: Record<string, { type: string; body: () => string }> = {
  "robots.txt": { type: "text/plain", body: robots },
  "sitemap.xml": { type: "application/xml", body: sitemap },
  "llms.txt": { type: "text/markdown", body: llms },
  "site.webmanifest": { type: "application/manifest+json", body: manifest },
};

const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: "meta", attrs, injectTo: "head" });
const link = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: "link", attrs, injectTo: "head" });

/** Title, description, canonical, Open Graph, Twitter card, icons and manifest. */
function headTags(): HtmlTagDescriptor[] {
  const image = `${SITE.url}${SITE.ogImage}`;
  return [
    { tag: "title", children: SITE.title, injectTo: "head" },
    meta({ name: "description", content: SITE.description }),
    link({ rel: "canonical", href: page() }),
    meta({ name: "theme-color", content: SITE.themeColor }),
    meta({ name: "color-scheme", content: "dark light" }),
    link({ rel: "apple-touch-icon", href: "/apple-touch-icon.png" }),
    link({ rel: "manifest", href: "/site.webmanifest" }),
    meta({ property: "og:type", content: "website" }),
    meta({ property: "og:site_name", content: SITE.name }),
    meta({ property: "og:locale", content: SITE.locale }),
    meta({ property: "og:title", content: SITE.title }),
    meta({ property: "og:description", content: SITE.description }),
    meta({ property: "og:url", content: page() }),
    meta({ property: "og:image", content: image }),
    meta({ property: "og:image:width", content: "1200" }),
    meta({ property: "og:image:height", content: "630" }),
    meta({ property: "og:image:alt", content: SITE.ogImageAlt }),
    meta({ name: "twitter:card", content: "summary_large_image" }),
    meta({ name: "twitter:title", content: SITE.title }),
    meta({ name: "twitter:description", content: SITE.description }),
    meta({ name: "twitter:image", content: image }),
    meta({ name: "twitter:image:alt", content: SITE.ogImageAlt }),
  ];
}

/**
 * Builds the head meta and the crawler files from site.config.ts. Emits the
 * files into dist on build and serves the same ones from the dev server.
 */
export function siteFiles(): Plugin {
  return {
    name: "site-files",
    transformIndexHtml: () => headTags(),
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = FILES[(req.url ?? "").split("?")[0].replace(/^\//, "")];
        if (!file) return next();
        res.setHeader("Content-Type", `${file.type}; charset=utf-8`);
        res.end(file.body());
      });
    },
    generateBundle() {
      for (const [fileName, file] of Object.entries(FILES)) {
        this.emitFile({ type: "asset", fileName, source: file.body() });
      }
    },
  };
}
