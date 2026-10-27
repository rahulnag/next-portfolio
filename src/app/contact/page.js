import webcontent from "@/webcontent.json";
import styles from "./page.module.css";
import SocialMediaLink from "@/components/SocialMediaLink";
import AskAIButton from "@/components/AskAIButton";

const page = () => {
  const { contact } = webcontent;
  return (
    <div className={`container ${styles.contactHolder}`}>
      <div className={`cards ${styles.contactCard}`} data-reveal>
        <p className="eyebrow">let&apos;s talk</p>
        <h1 className={styles.title}>{contact.title}</h1>
        <p className="subheading">{contact.subtitle}</p>

        <div className={styles.contactLinks}>
          <a href={`tel:${contact.number.replace(/[^+\d]/g, "")}`} className={styles.contactLink}>
            <span className={styles.contactLabel}>Phone</span>
            {contact.number}
          </a>
          <a href={`mailto:${contact.email}`} className={styles.contactLink}>
            <span className={styles.contactLabel}>Email</span>
            {contact.email}
          </a>
        </div>

        <SocialMediaLink center />

        <div className={styles.aiRow}>
          <p>Have a quick question first?</p>
          <AskAIButton>Ask my AI assistant</AskAIButton>
        </div>
      </div>
    </div>
  );
};

export default page;
