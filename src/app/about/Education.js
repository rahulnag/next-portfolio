import webcontent from "@/webcontent.json";
import Image from "next/image";
import styles from "./page.module.css";
const Education = () => {
  return (
    <div className={styles.educationGrid}>
      {webcontent.about.educationInfo.map((edu) => {
        return (
          <article key={edu.schoolName} className={`cards ${styles.educationCard}`} data-reveal>
            <div className={styles.workHeader}>
              <Image
                src={`/work-image/${edu.image}`}
                width={56}
                height={56}
                className={styles.collegeImage}
                alt={edu.schoolName}
              />
              <div className={styles.workTitleBlock}>
                <h3 className={styles.positionName}>{edu.degreeName}</h3>
                <p className={styles.organizationName}>{edu.schoolName}</p>
              </div>
              <span className={styles.workTenure}>{edu.duration}</span>
            </div>
            <ul className={styles.bulletList}>
              {edu.descBullets.map((desc) => {
                return <li key={desc}>{desc}</li>;
              })}
            </ul>

            <h4 className={styles.detailLabel}>Highlight</h4>
            <ul className={styles.bulletList}>
              {edu.highlights.map((highlight) => {
                return <li key={highlight}>{highlight}</li>;
              })}
            </ul>
          </article>
        );
      })}
    </div>
  );
};

export default Education;
