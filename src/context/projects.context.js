import { createContext, useState } from 'react';
import { get } from '../services/authService';

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
   const [allProjects, setAllProjects] = useState([]);
   const [allClients, setAllClients] = useState([]);

   const getProjects = () => {
      get('/projects/display')
         .then((response) => {
            // const sortedProjects = response.data.sort((a, b) => {
            //    if (a.status && !b.status) return -1;
            //    if (!a.status && b.status) return 1;
            //    return 0;
            // });
            // setAllProjects(sortedProjects);
            setAllProjects(response.data);
            return allProjects;
            // return response.data;
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const getClients = () => {
      get('/clients/display')
         .then((response) => {
            setAllClients(response.data);
            return allClients;
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <ProjectsContext.Provider
         value={{ allProjects, getProjects, allClients, getClients }}>
         {children}
      </ProjectsContext.Provider>
   );
};

export { ProjectsContext, ProjectsProvider };
