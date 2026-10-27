import styles from "./page.module.css";
import webcontent from "@/webcontent.json";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import AskAIButton from "@/components/AskAIButton";

const About = () => {
  const { about } = webcontent;
  return (
    <div className={`container ${styles['about-container']}`}>
      <section className={styles.intro}>
        <p className="eyebrow">about rahul nag</p>
        <h1 className={styles.pageTitle}>{about.heading}</h1>
        <p className="subheading">{about.subheading}</p>
        <ul className={styles.serviceList}>
          {about.subsubheading.map((subheading, i) => {
            return (
              <li key={subheading} className="cards" data-reveal style={{ "--d": i }}>
                {subheading.replace("⚡ ", "")}
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.section} id="skills" aria-labelledby="skills-heading">
        <p className="eyebrow">01 / skills</p>
        <h2 id="skills-heading" className="section-title">{about.skillHeading}</h2>
        <p className="section-subtitle">
          Grouped by area — open a category to see each skill with years of experience and projects delivered.
        </p>
        <Skills />
      </section>

      <section className={styles.section} id="experience" aria-labelledby="experience-heading">
        <p className="eyebrow">02 / experience</p>
        <h2 id="experience-heading" className="section-title">{about.workExperiencesHeading}</h2>
        <div className={styles.sectionHeaderRow}>
          <p className="section-subtitle">
            A quick view of my work at each organization. Use “Read more” for the full project details.
          </p>
          <AskAIButton question="Summarize Rahul's work experience">Ask AI to summarize</AskAIButton>
        </div>
        <WorkExperience />
      </section>

      <section className={styles.section} id="education" aria-labelledby="education-heading">
        <p className="eyebrow">03 / education</p>
        <h2 id="education-heading" className="section-title">{about.educationalHeading}</h2>
        <Education />
      </section>
    </div>
  );
};

export default About;
