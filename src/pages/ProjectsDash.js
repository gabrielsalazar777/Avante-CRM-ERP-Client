import { useState } from "react";
import ProjectList from "../components/ProjectList";
import ProjectDetails from "../components/ProjectDetails";
import AddProject from "../components/AddProject";

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
      <AddProject
        getProjectDetails={getProjectDetails}
        projectTypes={projectTypes}
      />
      <ProjectList
        getProjectDetails={getProjectDetails}
        selectedProject={selectedProject}
      />
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
