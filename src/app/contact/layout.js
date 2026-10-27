import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Rahul Nag to hire a senior frontend developer, discuss a project, build a website or get career guidance.",
  path: "/contact",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
