import React from "react";
import webcontent from "@/webcontent.json";
import Image from "next/image";
import styles from "./page.module.css";
const Skills = () => {
  return webcontent.about.techknowledge.map((skills) => {
    return (
      <div className={"cards" + " " + styles.skillcard}>
        <span className="cardHeading">{skills.skillName}</span>
        <Image
          src={"/skills-image/" + skills.iconName + ".png"}
          height={70}
          width={70}
          alt={skills.skillName}
          loading="lazy"
        />
      </div>
    );
  });
};

export default Skills;
