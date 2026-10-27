import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Web apps, startup websites, AI tools and open-source packages built by Rahul Nag — including Smart File Reader, CapsCode, Web Dev Resource and more.",
  path: "/projects",
});

export default function Layout({ children }) {
  return <>{children}</>;
}
