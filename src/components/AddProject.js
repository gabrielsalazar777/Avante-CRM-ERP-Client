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
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              placeholder="Enter project name"
              value={newProject.name}
              onChange={handleTextChange}
              required
            />
            <label htmlFor="name">Project Name</label>
          </div>

          <br />

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              id="status"
              name="status"
              type="checkbox"
              checked={newProject.status}
              onChange={handleCheckChange}
            />
            <label className="form-check-label" htmlFor="status">
              Active Project
            </label>
          </div>

          <br />

          <label>Project Type:</label>
          <div className="form-check">
            {projectTypes.map((projectOption) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={projectOption}
                    checked={selectedTypes.includes(projectOption)}
                    onChange={handleTypeCheckChange}
                  />
                  <label className="form-check-label">{projectOption}</label>
                </div>
              );
            })}
          </div>

          <br />

          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              type="text"
              // placeholder="Enter project notes here."
              value={newProject.notes}
              onChange={handleTextChange}
            />
          </div>

          <br />

          <label htmlFor="client">Client</label>
          <select
            className="form-select"
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

          <br />

          <button className="btn btn-light btn-outline-success" type="submit">
            Create Job
          </button>
        </form>
      </div>
      <br />
      <hr />
    </div>
  );
};

export default AddProject;
