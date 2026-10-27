import Projects from "./Projects";
import webcontent from "@/webcontent.json";
const MyProjects = () => {
  return (
    <div className="container">
      <p className="eyebrow">built & shipped</p>
      <h1 className="section-title">{webcontent.projects.projectsHeading}</h1>
      <p className="section-subtitle">
        Products, startup websites, tools and open-source packages designed and developed by Rahul Nag.
      </p>
      <Projects />
    </div>
  );
};

export default MyProjects;
