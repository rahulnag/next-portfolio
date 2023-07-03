export const metadata = {
  title: "Projects",
  description: "Web development projects developed by Rahul Nag",
  openGraph: {
    title: "Projects developed by Rahul Nag",
    description: "A highly experienced web developer with 6 year of experience",
    url: "https://www.rahulnag.in/projects",
    siteName: "Projects by Rahul Nag",
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
};

export default function Layout({ children }) {
  return <>{children}</>;
}
