/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow:
          process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "/" : "/legal",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  exclude: ["/legal/*"],
  transform: (_, url) => {
    const isPrio = url === "/" || url.startsWith("/products/");

    return {
      loc: url,
      priority: isPrio ? 1.0 : 0.5,
      changefreq: isPrio ? "daily" : "weekly",
      lastmod: new Date().toISOString(),
    };
  },
};
