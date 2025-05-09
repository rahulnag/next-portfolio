import "./globals.css";
import { Nunito } from "next/font/google";
import Nav from "./nav";

const inter = Nunito({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Rahul Nag",
  description:
    "Rahul Nag, A highly experienced web developer with 7.6 years of experience",
  generator: "Next.js",
  applicationName: "Rahul Nag Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Redux",
    "Visulization UI",
    "rahul nag",
    "Rahul Nag",
  ],
  authors: [{ name: "Rahul Nag" }],
  colorScheme: "light",
  themeColor: "black",
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: 'cyan' },
  //   { media: '(prefers-color-scheme: dark)', color: 'black' },
  // ],
  creator: "Rahul Nag",
  publisher: "Rahul Nag",

  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  metadataBase: new URL("https://rahulnag.in"),
  // alternates: {
  //   canonical: "/",
  //   languages: {
  //     "en-US": "/en-US",
  //     "de-DE": "/de-DE",
  //   },
  // },

  openGraph: {
    title: "Rahul Nag",
    description:
      "A highly experienced web developer with 7.6 years of experience",
    url: "https://www.rahulnag.in",
    siteName: "Rahul Nag",
    images: [
      {
        url: "https://rahulnag.in/profile.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://rahulnag.in/profile.png",
        width: 1800,
        height: 1600,
        alt: "Rahul Nag",
      },
    ],
    locale: "en_US",
    type: "website",
    authors: ["Rahul Nag"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Nag",
    description:
      "A highly experienced web developer with 7.6 years of experience",
    // siteId: "1467726470533754880",
    // creator: "@nextjs",
    // creatorId: "1467726470533754880",
    images: ["https://rahulnag.in/profile.png"],
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
  manifest: "https://www.rahulnag.in/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    // "user-scalable": "yes",
    // user-scalable=yes (default) to allow the user to zoom in or out on the web page;
    // user-scalable=no to prevent the user from zooming in or out.
  },
  verification: {
    google: "5KVnczAJCUTClb8IrXQuErHR2Dm2aXY4ruBS8_6VnOQ",
    // yandex: "yandex",
    // yahoo: "yahoo",
    other: {
      me: ["mr.rahulnag67@gmail.com", "www.rahulnag.in"],
    },
  },
  category: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="small-partition">{""}</div>
        {children}
        <footer>
          <p>Made with ♥ by Rahul Nag</p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rahulnag67@gmail.com&su=Looking for a web developer&body=Hello Rahul,"
            target="_blank"
          >
            <button>Hire me</button>
          </a>
          <br />
          <small>Copyright © rahulnag.in {new Date().getFullYear()}.</small>
        </footer>
      </body>
    </html>
  );
}
