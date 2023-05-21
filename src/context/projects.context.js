import { createContext, useState } from "react";
import { get } from "../services/authService";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [allClients, setAllClients] = useState([]);

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

  const getClients = () => {
    get("/clients/display")
      .then((response) => {
        setAllClients(response.data);
        return allClients;
      })
      .then((allClients) => {
        console.log(allClients);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ProjectsContext.Provider
      value={{ allProjects, getProjects, allClients, getClients }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContext, ProjectsProvider };
