import { useState } from "react";
import ProjectList from "../components/ProjectList";
import ProjectDetails from "../components/ProjectDetails";

const ProjectsDash = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const getProjectDetails = (project) => {
    setSelectedProject(project);
  };

  return (
    <div>
      <ProjectList getProjectDetails={getProjectDetails} />
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          getProjectDetails={getProjectDetails}
        />
      )}
    </div>
  );
};

export default ProjectsDash;
