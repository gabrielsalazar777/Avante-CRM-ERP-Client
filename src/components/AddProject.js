import { useState, useEffect, useContext } from "react";
import { post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const AddProject = ({ getProjectDetails, projectTypes }) => {
  const { getProjects, getClients, allClients } = useContext(ProjectsContext);

  const [newProject, setNewProject] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTextChange = (e) => {
    setNewProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckChange = (e) => {
    setNewProject((prev) => ({
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

  const handleClientChange = (e) => {
    setNewProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/projects/create", newProject)
      .then((response) => {
        getProjects();
        console.log(response.data);
        const newDetails = response.data;
        getProjectDetails(...[newDetails]);
        setNewProject({ name: "", notes: "", client: "" });
        setSelectedTypes([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setNewProject((prev) => ({ ...prev, projectType: selectedTypes }));
  }, [selectedTypes]);

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={newProject.name}
          onChange={handleTextChange}
        />

        <label htmlFor="status">Active</label>
        <input
          id="status"
          name="status"
          type="checkbox"
          checked={newProject.status}
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
          value={newProject.notes}
          onChange={handleTextChange}
        />

        <label htmlFor="client">Client</label>
        <select
          name="client"
          id="client"
          value={newProject.client}
          onChange={handleClientChange}
        >
          <option value="">Select a Client</option>
          {allClients.map((client) => {
            return <option value={client._id}>{client.name}</option>;
          })}
        </select>

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default AddProject;
