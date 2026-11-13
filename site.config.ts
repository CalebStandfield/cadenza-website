/**
 * Facts about the deployed site, used to build the head meta, robots.txt,
 * sitemap.xml, llms.txt and the web manifest. Set SITE_URL at build time once
 * the site has a home, e.g. SITE_URL=https://cadenza.app npm run build.
 */
export const SITE = {
  url: (process.env.SITE_URL ?? "https://cadenza-website.pages.dev").replace(/\/+$/, ""),
  name: "Cadenza",
  title: "Cadenza - your library, tagged your way",
  description:
    "Cadenza is a music app built on Apple Music. Tag the songs in your library, then pull a playlist back out with a drag and drop tag query.",
  /** Matches the dark page background. */
  themeColor: "#0a0a0a",
  locale: "en_US",
  /** 1200x630, in public/. */
  ogImage: "/og-image.png",
  ogImageAlt: "Cadenza logo with the line: your library, tagged your way.",
  sourceUrl: "https://github.com/CalebStandfield/cadenza-website",
  sections: [
    { id: "about", title: "About", summary: "What Cadenza is, the problem it solves, and how it is built." },
    { id: "download", title: "Download", summary: "iOS TestFlight and Android APK betas (coming soon)." },
    { id: "team", title: "Team", summary: "The four University of Utah students who built it." },
    { id: "tutorial", title: "Tutorial", summary: "Five steps from install to your first tag query." },
  ],
} as const;
