import webcontent from "@/webcontent.json";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  return Object.values(webcontent)
    .filter((page) => page.route)
    .map((page) => ({
      url: `${SITE_URL}${page.route === "/" ? "" : page.route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: page.route === "/" ? 1 : 0.8,
    }));
}
