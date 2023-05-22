import { useContext, useEffect, useState } from "react";
import { post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const ProjectDetails = ({ project, getProjectDetails, projectTypes }) => {
  const [updatedProject, setUpdatedProject] = useState(project);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const { getProjects } = useContext(ProjectsContext);

  const handleTextChange = (e) => {
    setUpdatedProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckChange = (e) => {
    setUpdatedProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleTypeCheckChange = (e) => {
    if (e.target.checked && !selectedTypes.includes(e.target.value)) {
      setSelectedTypes((prev) => [...prev, e.target.value]);
    } else if (!e.target.checked) {
      setSelectedTypes((prev) =>
        prev.filter((type) => type !== e.target.value)
      );
    }
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
    setSelectedTypes(project.projectType);
  }, [project]);

  useEffect(() => {
    setUpdatedProject((prev) => ({ ...prev, projectType: selectedTypes }));
  }, [selectedTypes]);

  return (
    <div>
      <h1>Selected Project:</h1>
      <h2>{project.name}</h2>
      <h3>Client: {project.client.name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={updatedProject.name}
          onChange={handleTextChange}
        />

        <label htmlFor="status">Active</label>
        <input
          id="status"
          name="status"
          type="checkbox"
          checked={updatedProject.status}
          onChange={handleCheckChange}
        />

        <label>Project Type</label>
        {projectTypes.map((projectOption) => {
          return (
            <div>
              <input
                type="checkbox"
                value={projectOption}
                checked={selectedTypes.includes(projectOption)}
                onChange={handleTypeCheckChange}
              />
              <label>{projectOption}</label>
            </div>
          );
        })}

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          type="text"
          value={updatedProject.notes}
          onChange={handleTextChange}
        />
        <button type="submit">Confirm Edit</button>
      </form>
    </div>
  );
};

export default ProjectDetails;
