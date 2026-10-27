import webcontent from "@/webcontent.json";
import Image from "next/image";
import styles from "./page.module.css";
const Projects = () => {
  return (
    <ul className={styles.ProjectsHolder}>
      {webcontent.projects.myprojects.map((project, i) => {
        return (
          <li
            key={project.projectName}
            className={styles.ProjectsImageDescHolder + " " + "cards"}
            data-reveal
            style={{ "--d": i % 3 }}
          >
            <div className={styles.imageFrame}>
              <Image
                src={`/project-image/${project.image}`}
                height={225}
                width={400}
                quality={90}
                sizes="(max-width: 680px) 100vw, 22rem"
                className={styles.projectImage}
                alt={`${project.projectName} website screenshot`}
              />
            </div>
            <div className={styles.ProjectDetailsHolder}>
              <h2 className={styles.projectName}>{project.projectName}</h2>
              <p>{project.projectDesc}</p>
              <a
                href={project.footerLink.url}
                className={styles.visitButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.footerLink.name} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
