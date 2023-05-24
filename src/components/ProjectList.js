import { useEffect, useContext } from "react";
import { get, post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const ProjectList = ({ getProjectDetails, selectedProject }) => {
  const { allProjects, getProjects } = useContext(ProjectsContext);

  const handleDelete = (e) => {
    get(`/projects/delete/${e}`).then((response) => {
      console.log(response);
      getProjects();
      if (selectedProject && selectedProject._id === e) {
        getProjectDetails();
      }
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      {allProjects.length ? (
        <>
          {allProjects.map((project) => {
            return (
              <div>
                <div onClick={() => getProjectDetails(project)}>
                  <h1>{project.name}</h1>
                  <h2>Client: {project.client.name}</h2>
                  <div>
                    {project.projectType.map((projType) => {
                      return <p>{projType}</p>;
                    })}
                  </div>
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
        <p>Begin by adding clients and then generating a project.</p>
      )}
    </div>
  );
};

export default ProjectList;
