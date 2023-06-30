import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "About",
  description: "About Rahul Nag",
};

export default function Layout({ children }) {
  return <>{children}</>;
}
