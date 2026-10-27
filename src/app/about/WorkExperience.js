"use client";
import { useEffect, useRef, useState } from "react";
import webcontent from "@/webcontent.json";
import styles from "./page.module.css";
import Image from "next/image";

const TECH_BULLET = /^(?:technologies|libraries|tech used|tools used)[^:]*?(?::|\s+are\s+)(.*)$/i;

const hasContent = (project) =>
  project.projectName || project.desc || project.descBullets.length > 0;

const splitTech = (text) =>
  text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

// Derives the compact-card view from the untouched experience data.
const summarize = (exp) => {
  const projects = exp.projectDetails.filter(hasContent);
  const domains = [
    ...new Set(projects.flatMap((p) => p.domain.split("|").map((d) => d.trim())).filter(Boolean)),
  ];
  const tech = [
    ...new Set(
      projects.flatMap((p) =>
        p.descBullets.flatMap((b) => {
          const match = b.match(TECH_BULLET);
          return match ? splitTech(match[1]) : [];
        })
      )
    ),
  ];
  const firstDesc = projects.find((p) => p.desc)?.desc || "";
  const summary = firstDesc.match(/^.*?[.!?](\s|$)/)?.[0].trim() || firstDesc;
  return { projects, domains, tech, summary };
};

const ExperienceDetail = ({ exp, projects, dialogRef, onClose }) => (
  <dialog
    ref={dialogRef}
    className={styles.dialog}
    aria-labelledby={`${exp.companylogo}-title`}
    onClose={onClose}
    onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}
  >
    <div className={styles.dialogInner}>
      <header className={styles.dialogHeader}>
        <div className={styles.logoTile}>
          <Image src={`/work-image/${exp.companylogo}`} height={56} width={84} alt={exp.company} />
        </div>
        <div>
          <h3 id={`${exp.companylogo}-title`} className={styles.dialogTitle}>
            {exp.role}
          </h3>
          <p className={styles.dialogMeta}>
            {exp.company} · {exp.date}
          </p>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => dialogRef.current.close()}
          aria-label="Close details"
        >
          ✕
        </button>
      </header>

      <div className={styles.dialogBody}>
        {projects.map((project, i) => {
          const tech = [];
          const bullets = [];
          project.descBullets.forEach((b) => {
            const match = b.match(TECH_BULLET);
            if (match) tech.push(...splitTech(match[1]));
            else bullets.push(b);
          });
          return (
            <article key={i} className={styles.projectBlock}>
              <h4 className={styles.projectName}>
                {project.projectName || `${project.domain} project`}
              </h4>
              <dl className={styles.projectMeta}>
                {project.domain && (
                  <div>
                    <dt>Domain</dt>
                    <dd>{project.domain}</dd>
                  </div>
                )}
                {project.date && (
                  <div>
                    <dt>Tenure</dt>
                    <dd>{project.date}</dd>
                  </div>
                )}
                {project.projectRole && (
                  <div>
                    <dt>Role</dt>
                    <dd>{project.projectRole}</dd>
                  </div>
                )}
              </dl>
              {project.desc && <p className={styles.projectDesc}>{project.desc}</p>}
              {bullets.length > 0 && (
                <>
                  <h5 className={styles.detailLabel}>Key work</h5>
                  <ul className={styles.bulletList}>
                    {bullets.map((desc) => (
                      <li key={desc} className={styles.projectDescBullet}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {tech.length > 0 && (
                <>
                  <h5 className={styles.detailLabel}>Tech stack</h5>
                  <div className={styles.chipRow}>
                    {tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </div>
  </dialog>
);

const ExperienceCard = ({ exp, index }) => {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { projects, domains, tech, summary } = summarize(exp);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const openDetails = () => {
    dialogRef.current.showModal();
    setOpen(true);
  };

  return (
    <li className={styles.timelineItem} data-reveal style={{ "--d": index }}>
      <span className={styles.timelineNode} aria-hidden="true" />
      <article className={`cards ${styles.workExperienceCard}`}>
        <div className={styles.workHeader}>
          <div className={styles.logoTile}>
            <Image
              src={`/work-image/${exp.companylogo}`}
              height={48}
              width={72}
              className={styles.organizationImage}
              alt={exp.company}
            />
          </div>
          <div className={styles.workTitleBlock}>
            <h3 className={styles.positionName}>{exp.role}</h3>
            <p className={styles.organizationName}>{exp.company}</p>
          </div>
          <span className={styles.workTenure}>{exp.date}</span>
        </div>

        {summary && <p className={styles.workSummary}>{summary}</p>}

        <div className={styles.chipRow}>
          {domains.map((d) => (
            <span key={d} className={`chip ${styles.domainChip}`}>
              {d}
            </span>
          ))}
          {tech.slice(0, 4).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
          {tech.length > 4 && <span className="chip">+{tech.length - 4}</span>}
        </div>

        <div className={styles.workFooter}>
          <span className={styles.projectCount}>
            {projects.length} {projects.length === 1 ? "project" : "projects"}
            {projects.some((p) => p.projectName) &&
              `: ${projects
                .map((p) => p.projectName)
                .filter(Boolean)
                .join(", ")}`}
          </span>
          <button type="button" className={styles.readMore} onClick={openDetails}>
            Read more <span aria-hidden="true">→</span>
          </button>
        </div>
      </article>
      <ExperienceDetail
        exp={exp}
        projects={projects}
        dialogRef={dialogRef}
        onClose={() => setOpen(false)}
      />
    </li>
  );
};

const WorkExperience = () => (
  <ol className={styles.timeline}>
    {webcontent.about.workExperiences.map((exp, i) => (
      <ExperienceCard key={exp.company} exp={exp} index={i} />
    ))}
  </ol>
);

export default WorkExperience;
