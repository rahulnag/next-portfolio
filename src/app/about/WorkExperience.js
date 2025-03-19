import webcontent from "@/webcontent";
import styles from "./page.module.css";
import Image from "next/image";

const WrokExperience = () => {
  return (
    <div className={styles.workExperienceHolder}>
      {webcontent.about.workExperiences.map((exp) => {
        return (
          <div className={styles.workExperienceCard + " " + "cards"}>
            <div>
              <div className={styles.organizationNameImageHolder}>
                <h4 className={styles.organizationName}>{exp.company}</h4>
                <Image
                  src={`/work-image/${exp.companylogo}`}
                  height={150}
                  width={200}
                  className={styles.organizationImage}
                  alt={exp.company}
                />
              </div>

              <div className={styles.workDetails}>
                <h5 className={styles.positionName}>{exp.role}</h5>
                <p className={styles.workTenure}>{exp.date}</p>
                <br />
                {exp.projectDetails.map((project) => {
                  return (
                    <div>
                      <p className={styles.projectName}>
                        Project name: {project.projectName}
                      </p>
                      <div className={styles.projectDetailsHolder}>
                        <p className={styles.projectDomain}>
                          <b>Domain:</b> {project.domain}
                        </p>
                        <br />
                        <p className={styles.projectDate}>
                          <b>Tenure:</b> {project.date}
                        </p>
                        <br />
                        <p className={styles.projectRole}>
                          <b>Role:</b> {project.projectRole}
                        </p>
                        <br />
                        <p className={styles.projectDesc}>
                          <b>Desc:</b> {project.desc}
                        </p>
                        <br />
                        <p className={styles.projectDesc}>
                          <b>Details</b>
                        </p>
                        {project.descBullets.map((desc) => {
                          return (
                            <li className={styles.projectDescBullet}>{desc}</li>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WrokExperience;
