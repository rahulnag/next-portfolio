import webcontent from "@/webcontent.json";
import Image from "next/image";
import { socialHref } from "@/lib/site";

const SocialMediaLink = ({ center = false }) => {
  return (
    <div className={center ? "social-row center" : "social-row"}>
      {webcontent.home.socialMediaLinks.map((media) => {
        const href = socialHref(media);
        return (
          <a
            key={media.name}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="me noopener noreferrer"
            aria-label={`Rahul Nag on ${media.name}`}
            className="social-link"
          >
            <Image
              src={`/socialmedia-image/${media.name}.png`}
              height={44}
              width={44}
              alt={media.name}
              style={{
                borderRadius: "50%",
                border: "1px solid var(--card-border-hover)",
                padding: '0.2rem',
                display: 'block',
              }}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialMediaLink;
