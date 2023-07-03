import webcontent from "@/webcontent";
import styles from "./page.module.css";
import Image from "next/image";
const WrokExperience = () => {
  return (
    <div className={styles.workExperienceHolder}>
      {webcontent.about.workExperiences.map((exp) => {
        return (
          <div className={styles.workExperienceCard + " " + "cards"}>
            <div className={styles.organizationNameImageHolder}>
              <h4 className={styles.organizationName}>{exp.company}</h4>
              <Image
                src={`/work-image/${exp.companylogo}`}
                height={100}
                width={100}
                className={styles.organizationImage}
                alt={exp.company}
              />
            </div>

            <div className={styles.workDetails}>
              <h5 className={styles.positionName}>{exp.role}</h5>
              <p className={styles.workTenure}>{exp.date}</p>
              <p className={styles.jobDescription}>{exp.desc}</p>
              <br />
              {exp.descBullets.map((desc) => {
                return <li>{desc}</li>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WrokExperience;
