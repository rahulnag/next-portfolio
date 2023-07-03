import React from "react";
import webcontent from "@/webcontent.json";
import styles from "./page.module.css";
import SocialMediaLink from "@/components/SocialMediaLink";

export const metadata = {
  title: "Contact",
  description: "Contact Rahul Nag",
  openGraph: {
    title: "Contact Rahul Nag",
    description: "A highly experienced web developer with 6 year of experience",
    url: "https://www.rahulnag.in/contact",
    siteName: "Contact Rahul Nag",
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

const page = () => {
  return (
    <div className={styles.contactHolder}>
      <h2>{webcontent.contact.title}</h2>
      <p className="subtitle">{webcontent.contact.subtitle}</p>
      <h5>{webcontent.contact.number}</h5>
      <h5>{webcontent.contact.email}</h5>
      <SocialMediaLink />
    </div>
  );
};

export default page;
