import React from "react";
import webcontent from "@/webcontent.json";
import Image from "next/image";
import styles from "./page.module.css";
const Projects = () => {
  return (
    <div className={styles.ProjectsContainer}>
      {webcontent.projects.myprojects.map((project) => {
        return (
          <div className={styles.ProjectsImageDescHolder + " " + "cards"}>
            <div>
              <Image
                src={`/project-image/${project.image}`}
                height={150}
                width={100}
                quality={100}
                style={{ width: "100%", borderRadius: "15px" }}
                alt={project.projectName}
              />
            </div>
            <div className={styles.ProjectDetailsHolder}>
              <h5 className={styles.projectName}>{project.projectName}</h5>
              <p>{project.projectDesc}</p>
              <a href={project.footerLink.url}>
                <button className={styles.visitButton}>
                  {project.footerLink.name}
                </button>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
