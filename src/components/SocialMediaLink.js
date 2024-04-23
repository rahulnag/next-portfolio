import webcontent from "@/webcontent.json";
import Image from "next/image";
const SocialMediaLink = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {webcontent.home.socialMediaLinks.map((media) => {
        return (
          <>
            <a href={media.link} style={{
              margin: "0.2rem"
            }}>
              <Image
                src={`/socialmedia-image/${media.name}.png`}
                height={50}
                width={50}
                alt={media.name}
                style={{
                  borderRadius: "50%",
                  border: "1px solid var(--primary-color)",
                  padding: '0.2rem',
                }}
              />
            </a>
          </>
        );
      })}
    </div>
  );
};

export default SocialMediaLink;
