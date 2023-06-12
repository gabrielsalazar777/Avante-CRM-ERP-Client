import { useEffect, useContext, useState } from 'react';
import { get, post } from '../services/authService';
import { ProjectsContext } from '../context/projects.context';

const ProjectList = ({ getProjectDetails, selectedProject }) => {
   const { allProjects, getProjects } = useContext(ProjectsContext);
   const [sortedProjects, setSortedProjects] = useState([]);
   const [sortSelection, setSortSelection] = useState('Active');

   const sortOptions = ['A-Z', 'Z-A', 'Active', 'Inactive'];

   const handleDelete = (e) => {
      get(`/projects/delete/${e}`).then(() => {
         getProjects();
         if (selectedProject && selectedProject._id === e) {
            getProjectDetails();
         }
      });
   };

   const handleSortSelection = (e) => {
      setSortSelection(e.target.value);
   };

   const handleSort = () => {
      if (sortSelection) {
         if (sortSelection === 'A-Z') {
            const newSort = [...allProjects].sort((a, b) => a.name.localeCompare(b.name));
            setSortedProjects(newSort);
         }
         if (sortSelection === 'Z-A') {
            const newSort = [...allProjects].sort((a, b) => b.name.localeCompare(a.name));
            setSortedProjects(newSort);
         }
         if (sortSelection === 'Active') {
            const newSort = [...allProjects].sort((a, b) => {
               if (a.status && !b.status) return -1;
               if (!a.status && b.status) return 1;
               return 0;
            });
            setSortedProjects(newSort);
         }
         if (sortSelection === 'Inactive') {
            const newSort = [...allProjects].sort((a, b) => {
               if (b.status && !a.status) return -1;
               if (!b.status && a.status) return 1;
               return 0;
            });
            setSortedProjects(newSort);
         }
      }
   };

   useEffect(() => {
      getProjects();
      handleSort();
   }, []);

   useEffect(() => {
      handleSort();
   }, [allProjects]);

   useEffect(() => {
      handleSort();
   }, [sortSelection]);

   return (
      <div>
         {sortedProjects.length ? (
            <>
               <label htmlFor="sort">
                  <b>Sort</b>
               </label>
               <select
                  className="form-select"
                  name="sort"
                  id="sort"
                  value={sortSelection}
                  onChange={handleSortSelection}>
                  {sortOptions.map((option) => {
                     return <option value={option}>{option}</option>;
                  })}
               </select>
               <hr />
               {sortedProjects.map((project) => {
                  return (
                     <div>
                        <div
                           className="listed-project"
                           onClick={() => getProjectDetails(project)}>
                           <div className="row">
                              <div className="col-10">
                                 <h3>{project.name}</h3>
                              </div>
                              <div className="col-2 d-flex justify-content-end">
                                 {project.status ? (
                                    <p className="active">Active</p>
                                 ) : (
                                    <p className="inactive">Inactive</p>
                                 )}
                              </div>
                           </div>
                           <p>{project.status}</p>
                           <h5 className="no-space-above">
                              Client: {project.client.name}
                           </h5>
                           <div className="d-flex">
                              {project.projectType.map((projType) => {
                                 const customClass = `border border-dark border-2 rounded-pill pill ${projType}`;
                                 return (
                                    <p className={customClass} id="project-type-list">
                                       {projType}
                                    </p>
                                 );
                              })}
                           </div>
                        </div>
                        <button
                           className="btn btn-light btn-outline-danger"
                           onClick={() => handleDelete(project._id)}>
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
