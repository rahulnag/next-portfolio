import { pageMetadata, yearsOfExperience } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About — Skills, Experience & Education",
  description: `About Rahul Nag: ${yearsOfExperience()}+ years as a frontend developer at 3Pillar Global, Accenture and IQVIA. Skills in React, Next.js, Generative AI interfaces, data visualization, Azure and more.`,
  path: "/about",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
