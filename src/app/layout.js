import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Nav from "./nav";
import NeuralBackground from "@/components/NeuralBackground";
import RevealObserver from "@/components/RevealObserver";
import ChatWidget from "@/components/ChatWidget";
import { themeInitScript } from "@/components/ThemeToggle";
import webcontent from "@/webcontent.json";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  personJsonLd,
} from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const heading = Space_Grotesk({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});
const mono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const TITLE = "Rahul Nag | Senior Frontend Developer — React, Next.js & Generative AI";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Rahul Nag",
  },
  description: SITE_DESCRIPTION,
  generator: "Next.js",
  applicationName: "Rahul Nag Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Rahul Nag",
    "rahul nag",
    "Rahul Nag developer",
    "Rahul Nag frontend developer",
    "Rahul Nag portfolio",
    "rahulnag.in",
    "Senior Frontend Developer",
    "React developer India",
    "Next.js developer",
    "Generative AI UI",
    "Data visualization",
    "JavaScript",
    "React",
    "Next.js",
    "Redux",
    "CapsCode",
  ],
  authors: [{ name: "Rahul Nag", url: SITE_URL }],
  creator: "Rahul Nag",
  publisher: "Rahul Nag",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/profile.png", width: 500, height: 500, alt: "Rahul Nag" }],
    locale: "en_US",
    type: "profile",
    firstName: "Rahul",
    lastName: "Nag",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: ["/profile.png"],
  },
  icons: {
    icon: "/profile.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },
  manifest: "/manifest.json",
  verification: {
    google: "5KVnczAJCUTClb8IrXQuErHR2Dm2aXY4ruBS8_6VnOQ",
    other: {
      me: ["mr.rahulnag67@gmail.com", "www.rahulnag.in"],
    },
  },
  category: "Portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#06040f" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    personJsonLd(),
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Before first paint: apply the saved/system theme and mark JS as available (for scroll-reveal) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NeuralBackground />
        <Nav />
        <main id="main">{children}</main>
        <footer>
          <p>Made with ♥ by Rahul Nag</p>
          <a
            className="btn btn-primary"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rahulnag67@gmail.com&su=Looking for a web developer&body=Hello Rahul,"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hire me
          </a>
          <small>Copyright © rahulnag.in {new Date().getFullYear()}.</small>
        </footer>
        <RevealObserver />
        <ChatWidget config={webcontent.home.chatAssistant} />
      </body>
    </html>
  );
}
