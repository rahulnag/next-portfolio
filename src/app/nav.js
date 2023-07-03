import webcontent from "@/webcontent.json";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
const Nav = () => {
  return (
    <nav>
      <div className={styles.logoHolder}>
        <Image
          src={"/logo.png"}
          height={60}
          width={60}
          priority
          className={styles.logo}
          alt={"Rahul Nag Logo"}
        />
      </div>

      <div className={styles.navHolder}>
        {Object.keys(webcontent).map((page) => {
          return (
            <Link
              href={webcontent[page].route}
              // prefetch={true}
              className={styles.NavLink}
            >
              {page}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
