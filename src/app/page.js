import Image from "next/image";
import styles from "./page.module.css";
import webcontent from "@/webcontent.json";
import SocialMediaLink from "@/components/SocialMediaLink";
import AskAIButton from "@/components/AskAIButton";
import ShootingStar from "@/components/ShootingStar";
import TypewriterEffect from "@/sharedComponent/TypewriterEffect/TypewriterEffect";
import Link from "next/link";
import { SITE_URL, yearsOfExperience, uniqueDomains } from "@/lib/site";

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: SITE_URL,
  name: "Rahul Nag — Portfolio",
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

export default function Home() {
  const { home, about, projects } = webcontent;
  const domains = uniqueDomains();
  const stats = [
    { value: `${yearsOfExperience()}+`, label: "Years of experience" },
    { value: about.workExperiences.length, label: "Organizations" },
    { value: `${projects.myprojects.length}+`, label: "Live projects" },
    { value: domains.length, label: "Industry domains" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <ShootingStar />
      <section className={styles.main}>
        <div className={styles.mainContainer}>
          <p className="eyebrow">{"frontend · data viz · generative AI"}</p>
          <h1>{home.heading}</h1>
          <p className={styles.roleLine}>
            <span className="visually-hidden">{home.roles.join(", ")}</span>
            <span aria-hidden="true">
              <TypewriterEffect words={home.roles} />
            </span>
          </p>
          <p className="subheading">{home.subheading}</p>

          <div className={styles.homeButton}>
            <Link href="/about" className="btn btn-primary">
              My Skills
            </Link>
            <a href={home.resumeLink} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              See My Resume
            </a>
            <AskAIButton>Ask my AI assistant</AskAIButton>
          </div>
          <SocialMediaLink />
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.orbit} aria-hidden="true">
            <span className={styles.orbitDot} />
            <span className={`${styles.orbitDot} ${styles.orbitDotAlt}`} />
          </div>
          <div className={styles.profileRing}>
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
        </div>
      </section>

      <section className={styles.statsSection} aria-label="Highlights">
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={`cards ${styles.statCard}`} data-reveal style={{ "--d": i }}>
              <span className={`${styles.statValue} gradient-text`}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.domainRow} data-reveal>
          <span className={styles.domainLabel}>Domains</span>
          {domains.map((domain) => (
            <span key={domain} className="chip">
              {domain}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
