import Projects from "./Projects";
import webcontent from "@/webcontent.json";
import styles from './page.module.css'
const MyProjects = () => {
  return (
    <div className={styles.ProjectsContainer}>
      <h2>{webcontent.projects.projectsHeading}</h2>
      <Projects />
    </div>
  );
};

export default MyProjects;
