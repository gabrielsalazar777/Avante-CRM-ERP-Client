import { useState, useEffect, useContext } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectDetails from '../components/ProjectDetails';
import AddProject from '../components/AddProject';
import { get } from '../services/authService';
import { ProjectsContext } from '../context/projects.context';

const ProjectsDash = () => {
   const [selectedProject, setSelectedProject] = useState(null);
   const [weather, setWeather] = useState([]);
   const { mapKey, getMapKey } = useContext(ProjectsContext);
   const projectTypes = [
      'Re-Roof',
      'Repair',
      'Tile',
      'Shingle',
      'Flat',
      'Solar',
      'Water Proof',
      'GC',
   ];

   const getProjectDetails = (project) => {
      setSelectedProject(project);
   };

   const getWeather = () => {
      get('/api/weather')
         .then((response) => {
            setWeather(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      getWeather();
      getMapKey();
   }, []);

   return (
      <div className="container space-above">
         {weather.length && (
            <ul className="nav justify-content-around">
               {weather.map((d) => {
                  return (
                     <li className="nav-item d-flex flex-column align-items-center">
                        <p>{d.day}</p>
                        <img src={d.icon} alt="weather-icon" style={{ width: '3vw' }} />
                        <p>{d.condition}</p>
                     </li>
                  );
               })}
            </ul>
         )}
         <br />
         <h2 className="d-flex justify-content-center">Projects Dashboard</h2>
         <hr />

         <div className="row">
            <div className="col-5" style={{ borderRight: '1px solid lightgray' }}>
               <AddProject
                  getProjectDetails={getProjectDetails}
                  projectTypes={projectTypes}
               />
               <ProjectList
                  getProjectDetails={getProjectDetails}
                  selectedProject={selectedProject}
               />
            </div>

            <div className="col-7">
               {selectedProject && (
                  <ProjectDetails
                     project={selectedProject}
                     getProjectDetails={getProjectDetails}
                     projectTypes={projectTypes}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default ProjectsDash;
