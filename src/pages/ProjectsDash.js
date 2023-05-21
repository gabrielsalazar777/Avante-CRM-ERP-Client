import { useState } from "react";
import ProjectList from "../components/ProjectList";
import ProjectDetails from "../components/ProjectDetails";

const ProjectsDash = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projectTypes = [
    "Re-Roof",
    "Repair",
    "Tile",
    "Shingle",
    "Flat",
    "Solar",
    "Water Proof",
    "GC",
  ];

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
          projectTypes={projectTypes}
        />
      )}
    </div>
  );
};

export default ProjectsDash;
