import type { MetadataRoute } from "next";
import { absoluteUrl, isSiteUrlConfigured } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A production build without a configured public URL would publish localhost
  // canonicals, so keep crawlers out until NEXT_PUBLIC_SITE_URL is set.
  if (process.env.NODE_ENV === "production" && !isSiteUrlConfigured()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
