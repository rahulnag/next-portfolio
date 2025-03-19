import Image from "next/image";
import styles from "./page.module.css";
import webcontent from "@/webcontent.json";
import SocialMediaLink from "@/components/SocialMediaLink";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <h1>{webcontent.home.heading}</h1>
          <p className="subheading">{webcontent.home.subheading}</p>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/profile.gif"
            width={700}
            height={700}
            priority
            alt="Rahul Nag"
            className={styles.profileImage}
            unoptimized
          />
        </div>
      </main>
      <SocialMediaLink />
      <div className={styles.homeButton}>
        <Link href="/about">
          <button>My Skills</button>
        </Link>
        <a href={webcontent.home.resumeLink}>
          <button>See My Resume</button>
        </a>
      </div>
    </>
  );
}
