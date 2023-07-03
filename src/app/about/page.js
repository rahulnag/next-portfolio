import React from "react";
import styles from "./page.module.css";
import webcontent from "@/webcontent.json";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import Education from "./Education";

export const metadata = {
  title: "About",
  description: "About Rahul Nag",
  openGraph: {
    title: "About Rahul Nag",
    description: "A highly experienced web developer with 6 year of experience",
    url: "https://www.rahulnag.in/about",
    siteName: "About Rahul Nag",
    images: [
      {
        url: "https://rahulnag.in/profile.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://rahulnag.in/profile.png",
        width: 1800,
        height: 1600,
        alt: "Rahul Nag",
      },
    ],
    locale: "en_US",
    type: "website",
    authors: ["Rahul Nag"],
  },
};

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
