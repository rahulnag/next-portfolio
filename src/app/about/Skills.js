import webcontent from "@/webcontent.json";
import Image from "next/image";
import styles from "./page.module.css";
const Skills = () => {
  return webcontent.about.techknowledge.map((skills) => {
    return (
      <div className={"cards" + " " + styles.skillcard}>
        <span className="cardHeading">{skills.skillName}</span>
        <div className={styles.skillCardContent}>
          <Image
            src={"/skills-image/" + skills.iconName + ".png"}
            height={70}
            width={70}
            alt={skills.skillName}
            loading="lazy"
            className={styles.skillLogo}
          />

          <div className={styles.skillExperience}>
            <p>Exp.: {skills.experience}</p>
            <p>Projects.: {skills.projects}</p>
          </div>
        </div>
      </div>
    );
  });
};

export default Skills;
