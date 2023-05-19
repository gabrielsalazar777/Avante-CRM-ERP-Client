import { useState, useEffect, useContext } from "react";
import { get, post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const ProjectList = ({ getProjectDetails }) => {
  const { allProjects, getProjects } = useContext(ProjectsContext);

  const [newProject, setNewProject] = useState({});

  const handleTextChange = (e) => {
    setNewProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/projects/create", newProject)
      .then(() => {
        getProjects();
        setNewProject({ name: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    get(`/projects/delete/${e}`).then((response) => {
      console.log(response);
      getProjects();
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      ProjectsDash
      {allProjects.length ? (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={newProject.name}
              onChange={handleTextChange}
            />
            <button type="submit">Create Job</button>
          </form>
          {allProjects.map((project) => {
            return (
              <div>
                <div onClick={() => getProjectDetails(project)}>
                  <h1>{project.name}</h1>
                  <p>This is a project</p>
                </div>
                <button onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
                <hr />
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectList;
