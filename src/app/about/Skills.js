import webcontent from "@/webcontent.json";
import Image from "next/image";
import styles from "./page.module.css";

const initials = (name) =>
  name
    .split(/[\s/&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

const SkillIcon = ({ skill }) =>
  skill.iconName ? (
    <Image
      src={"/skills-image/" + skill.iconName + ".png"}
      height={40}
      width={40}
      alt=""
      loading="lazy"
      className={styles.skillLogo}
    />
  ) : (
    <span className={styles.skillGlyph} aria-hidden="true">
      {initials(skill.skillName)}
    </span>
  );

// Skills grouped by category, each category is a native <details> accordion (crawlable, no JS needed).
const Skills = () => {
  const { skillCategories, techknowledge } = webcontent.about;
  return (
    <div className={styles.accordion}>
      {skillCategories.map((category, index) => {
        const skills = techknowledge.filter((s) => s.category === category.id);
        if (!skills.length) return null;
        return (
          <details
            key={category.id}
            className={`cards ${styles.accordionItem} ${category.id === "ai" ? styles.accordionAI : ""}`}
            open={index === 0}
            data-reveal
            style={{ "--d": index }}
          >
            <summary className={styles.accordionSummary}>
              <span className={styles.accordionIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.accordionTitleBlock}>
                <span className={styles.accordionTitle}>{category.title}</span>
                <span className={styles.accordionDesc}>{category.description}</span>
              </span>
              <span className="chip">{skills.length} skills</span>
              <span className={styles.chevron} aria-hidden="true" />
            </summary>

            <ul className={styles.skillGrid}>
              {skills.map((skill) => (
                <li key={skill.skillName} className={styles.skillcard}>
                  <SkillIcon skill={skill} />
                  <div className={styles.skillCardContent}>
                    <span className={styles.skillName}>{skill.skillName}</span>
                    <span className={styles.skillExperience}>
                      {skill.experience} · {skill.projects} projects
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </div>
  );
};

export default Skills;
