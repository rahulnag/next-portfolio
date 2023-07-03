import webcontent from "@/webcontent.json";
import styles from "./page.module.css";
import SocialMediaLink from "@/components/SocialMediaLink";

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
