import webcontent from "@/webcontent.json";

export const SITE_URL = "https://www.rahulnag.in";
export const SITE_NAME = "Rahul Nag";

// First full-time role (IQVIA, Oct 2017) — used to keep "years of experience" current.
const CAREER_START = new Date(2017, 9, 1);

export const yearsOfExperience = () =>
  Math.floor((Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

export const SITE_DESCRIPTION = `Rahul Nag is a Senior Frontend Developer with ${yearsOfExperience()}+ years of experience building React, Next.js, data visualization and Generative AI web applications for Insurance, Retail, Healthcare and Business Intelligence domains.`;

export const socialHref = (media) => {
  if (/^(https?:|mailto:|tel:)/.test(media.link)) return media.link;
  if (media.link.includes("@")) return `mailto:${media.link}`;
  return `https://${media.link}`;
};

export const sameAsLinks = () =>
  webcontent.home.socialMediaLinks
    .map(socialHref)
    .filter((link) => link.startsWith("http"));

export const uniqueDomains = () => [
  ...new Set(
    webcontent.about.workExperiences
      .flatMap((exp) => exp.projectDetails)
      .flatMap((project) => project.domain.split("|"))
      .map((domain) => domain.trim())
      .filter(Boolean)
  ),
];

export const pageMetadata = ({ title, description, path }) => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    images: [{ url: "/profile.png", width: 500, height: 500, alt: "Rahul Nag" }],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: `${title} | ${SITE_NAME}`,
    description,
    images: ["/profile.png"],
  },
});

export const personJsonLd = () => {
  const current = webcontent.about.workExperiences[0];
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Rahul Nag",
    url: SITE_URL,
    image: `${SITE_URL}/profile.png`,
    email: `mailto:${webcontent.contact.email}`,
    jobTitle: current.role,
    worksFor: { "@type": "Organization", name: current.company },
    alumniOf: webcontent.about.educationInfo.map((edu) => ({
      "@type": "CollegeOrUniversity",
      name: edu.schoolName,
    })),
    nationality: { "@type": "Country", name: "India" },
    knowsAbout: webcontent.about.techknowledge.map((skill) => skill.skillName),
    sameAs: sameAsLinks(),
  };
};
