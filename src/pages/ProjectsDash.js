import { useState, useEffect } from "react";
import { get, post } from "../services/authService";
import { Link } from "react-router-dom";

const ProjectsDash = () => {
  const [allProjects, setAllProjects] = useState({});
  const [newProject, setNewProject] = useState({});

  const getProjects = () => {
    get("/projects/display")
      .then((response) => {
        setAllProjects(response.data);
        return allProjects;
      })
      .then((allProjects) => {
        console.log(allProjects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextChange = (e) => {
    setNewProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/projects/create", newProject)
      .then((response) => {
        getProjects();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    get(`/projects/delete/${e}`)
    .then((response) => {
        console.log(response);
        getProjects();
    })
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
                <h1>{project.name}</h1>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
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

export default ProjectsDash;
