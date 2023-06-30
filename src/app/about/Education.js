import React from "react";
import webcontent from "@/webcontent";
import Image from "next/image";
import styles from "./page.module.css";
const Education = () => {
  return (
    <div>
      {webcontent.about.educationInfo.map((edu) => {
        return (
          <>
            <Image
              src={`/work-image/${edu.image}`}
              width={70}
              height={70}
              className={styles.collegeImage}
              alt={edu.schoolName}
            />
            <h4>{edu.schoolName}</h4>
            <p>{edu.degreeName}</p>
            <p>{edu.duration}</p>
            {edu.descBullets.map((desc) => {
              return <li>{desc}</li>;
            })}

            <h5>Highlight</h5>
            {edu.highlights.map((highlight) => {
              return <li>{highlight}</li>;
            })}
          </>
        );
      })}
    </div>
  );
};

export default Education;
