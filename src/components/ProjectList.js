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
                <div className="listed-project" onClick={() => getProjectDetails(project)}>
                  <h3>{project.name}</h3>
                  <h5>Client: {project.client.name}</h5>
                  <div className="d-flex">
                    {project.projectType.map((projType) => {
                        const customClass =`border border-dark border-2 rounded-pill pill ${projType}`
                      return <p className={customClass} id="project-type-list">{projType}</p>;
                    })}
                  </div>
                </div>
                <button
                  className="btn btn-light btn-outline-danger"
                  onClick={() => handleDelete(project._id)}
                >
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
