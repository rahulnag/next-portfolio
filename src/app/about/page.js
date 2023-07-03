import styles from "./page.module.css";
import webcontent from "@/webcontent.json";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import Education from "./Education";

const About = () => {
  return (
    <>
      <div className="small-partition">{""}</div>
      <div>
        <h2>{webcontent.about.heading}</h2>
        <p className="subheading">{webcontent.about.subheading}</p>
        {webcontent.about.subsubheading.map((subheading) => {
          return <li>{subheading}</li>;
        })}

        <div className="partition">{""}</div>

        <h2>{webcontent.about.skillHeading}</h2>
        <div className={styles["skill-card-container"]}>
          <Skills />
        </div>

        <div className="partition">{""}</div>

        <h2>{webcontent.about.workExperiencesHeading}</h2>
        <p className="subheading">{webcontent.about.subheading}</p>
        <div className={styles["skill-card-container"]}>
          <WorkExperience />
        </div>

        <div className="partition">{""}</div>

        <h2>{webcontent.about.educationalHeading}</h2>
        <div>
          <Education />
        </div>
      </div>
    </>
  );
};

export default About;
