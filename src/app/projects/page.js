import Projects from "./Projects";
import webcontent from "@/webcontent.json";

const MyProjects = () => {
  return (
    <div>
      <div className="small-partition">{""}</div>
      <h2>{webcontent.projects.projectsHeading}</h2>
      <Projects />
    </div>
  );
};

export default MyProjects;
