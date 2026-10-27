'use client'
import webcontent from "@/webcontent.json";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary">
      <Link href="/" className={styles.logoHolder} aria-label="Rahul Nag — home">
        <Image
          src={"/logo.png"}
          height={60}
          width={60}
          priority
          className={styles.logo}
          alt={"Rahul Nag Logo"}
        />
      </Link>

      <div className={styles.navHolder}>
        {Object.keys(webcontent)
          .filter((page) => webcontent[page].route)
          .map((page) => {
            const active = webcontent[page].route == pathname;
            return (
              <Link
                href={webcontent[page].route}
                key={webcontent[page].route}
                prefetch={true}
                aria-current={active ? "page" : undefined}
                className={active ? styles.activeNav : styles.NavLink}
              >
                {page}
              </Link>
            );
          })}
        <ThemeToggle />
      </div>
    </nav >
  );
};

export default Nav;
