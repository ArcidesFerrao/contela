import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/pt/", "/en/", "/api/"],
    },
    sitemap: "https://contela.evolurelabs.com/sitemap.xml",
  };
}