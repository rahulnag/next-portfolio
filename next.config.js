/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   // These are all the locales you want to support in
  //   // your application
  //   locales: ["en-US", "fr", "nl-NL"],
  //   // This is the default locale you want to be used when visiting
  //   // a non-locale prefixed path e.g. `/hello`
  //   defaultLocale: "en-US",
  //   // This is a list of locale domains and the default locale they
  //   // should handle (these are only required when setting up domain routing)
  //   // Note: subdomains must be included in the domain value to be matched e.g. "fr.rahulnag.in".
  //   domains: [
  //     {
  //       domain: "rahulnag.in",
  //       defaultLocale: "en-US",
  //     },
  //     {
  //       domain: "rahulnag.in",
  //       defaultLocale: "nl-NL",
  //     },
  //     {
  //       domain: "rahulnag.in",
  //       defaultLocale: "fr",
  //       // an optional http field can also be used to test
  //       // locale domains locally with http instead of https
  //       http: true,
  //     },
  //   ],
  // },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
