import { useContext, useEffect, useState } from "react";
import { post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const ProjectDetails = ({ project, getProjectDetails }) => {
  const [updatedProject, setUpdatedProject] = useState(project);

  const { getProjects } = useContext(ProjectsContext);

  const handleTextChange = (e) => {
    setUpdatedProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/projects/edit/${project._id}`, updatedProject).then(() => {
      getProjects();
      getProjectDetails(updatedProject);
    });
  };

  useEffect(() => {
    setUpdatedProject(project);
  }, [project]);

  return (
    <div>
      <h1>Selected Project:</h1>
      <h2>{project.name}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={updatedProject.name}
          onChange={handleTextChange}
        />
        <button type="submit">Confirm Edit</button>
      </form>
    </div>
  );
};

export default ProjectDetails;
