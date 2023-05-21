import { useEffect, useContext } from "react";
import { get, post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const ProjectList = ({ getProjectDetails, selectedProject }) => {
  const { allProjects, getProjects } = useContext(ProjectsContext);

  const handleDelete = (e) => {
    get(`/projects/delete/${e}`).then((response) => {
      console.log(response);
      getProjects();
      if (!allProjects.includes(selectedProject)) {
        getProjectDetails();
      }
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <h1>ProjectsDash</h1>
      {allProjects.length ? (
        <>
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
