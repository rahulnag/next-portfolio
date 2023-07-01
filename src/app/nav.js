import webcontent from "@/webcontent.json";
import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
const Nav = () => {
  return (
    <nav>
      <div className={styles.logoHolder}>
        <Image
          src={"/mylogo.mpeg"}
          height={60}
          width={60}
          className={styles.logo}
          alt={"Rahul Nag Logo"}
        />
      </div>

      <div className={styles.navHolder}>
        {Object.keys(webcontent).map((page) => {
          return (
            <Link
              href={webcontent[page].route}
              prefetch={true}
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
