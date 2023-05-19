import { createContext, useState } from "react";
import { get } from "../services/authService";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [allProjects, setAllProjects] = useState([]);

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

  return (
    <ProjectsContext.Provider value={{ allProjects, getProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext, ProjectsProvider };
