import { useContext, useEffect, useState } from 'react';
import { post } from '../services/authService';
import { ProjectsContext } from '../context/projects.context';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ProjectDetails = ({ project, getProjectDetails, projectTypes }) => {
   const [updatedProject, setUpdatedProject] = useState(project);
   const [selectedTypes, setSelectedTypes] = useState([]);
   const [newMaterial, setNewMaterial] = useState({
      name: '',
      squareFeet: 0,
      coverage: 0,
      units: 0,
   });
   const [saved, setSaved] = useState(false);
   const [dates, setDates] = useState([project.startDate, project.endDate]);

   const { getProjects, mapKey } = useContext(ProjectsContext);

   const updateMaterialArray = (e, i) => {
      const newArr = [...updatedProject.materials];
      newArr[i] = { ...newArr[i], [e.target.name]: e.target.value };
      setUpdatedProject((prev) => ({ ...prev, materials: newArr }));
   };

   const updateMaterialNumArray = (e, i) => {
      const newArr = [...updatedProject.materials];
      newArr[i] = { ...newArr[i], [e.target.name]: Number(e.target.value) };
      setUpdatedProject((prev) => ({ ...prev, materials: newArr }));
   };

   const handleTextChange = (e) => {
      setUpdatedProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleMatTextChange = (e) => {
      setNewMaterial((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };

   const handleNumberChange = (e) => {
      setNewMaterial((prev) => ({
         ...prev,
         [e.target.name]: Number(e.target.value),
      }));
   };

   const handleCheckChange = (e) => {
      setUpdatedProject((prev) => ({
         ...prev,
         [e.target.name]: e.target.checked,
      }));
   };

   const handleTypeCheckChange = (e) => {
      if (e.target.checked && !selectedTypes.includes(e.target.value)) {
         setSelectedTypes((prev) => [...prev, e.target.value]);
      } else if (!e.target.checked) {
         setSelectedTypes((prev) => prev.filter((type) => type !== e.target.value));
      }
   };

   const deleteMaterial = (i) => {
      const updatedMaterials = [...updatedProject.materials];
      updatedMaterials.splice(i, 1);
      setUpdatedProject((prev) => ({ ...prev, materials: updatedMaterials }));
   };

   const handleDates = (dates) => {
      setDates(dates);
      setUpdatedProject((prev) => ({
         ...prev,
         startDate: dates[0],
         endDate: dates[1],
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      let projectAfterMaterials = { ...updatedProject };

      if (newMaterial.name !== '') {
         const allMaterials = [...updatedProject.materials, newMaterial];
         projectAfterMaterials = { ...updatedProject, materials: allMaterials };
      }

      post(`/projects/edit/${project._id}`, projectAfterMaterials).then((result) => {
         getProjects();
         getProjectDetails(result.data);
         setNewMaterial({ name: '', squareFeet: 0, coverage: 0, units: 0 });
         setSaved(true);
         setDates([result.data.startDate, result.data.endDate]);
      });
   };

   useEffect(() => {
      setUpdatedProject(project);
      setSelectedTypes(project.projectType);
      setDates([project.startDate, project.endDate]);
      if (project) console.log(project.address.split(' ').join('+'));
      console.log('MAP KEY:', mapKey);
   }, [project]);

   useEffect(() => {
      setUpdatedProject((prev) => ({ ...prev, projectType: selectedTypes }));
   }, [selectedTypes]);

   useEffect(() => {
      if (saved) {
         const saveTimer = setTimeout(() => {
            setSaved(false);
         }, 5000);
         return () => {
            clearTimeout(saveTimer);
         };
      }
   }, [saved]);

   return (
      <div>
         <div>
            <h3 className="d-flex justify-content-center">{project.name}</h3>
            <h5 className="d-flex justify-content-center">
               Client: {project.client.name}
            </h5>
         </div>
         <form onSubmit={handleSubmit}>
            <br />

            <div className="row d-flex align-items-center">
               <div className="col">
                  <div className="form-floating">
                     <input
                        className="form-control"
                        id="name"
                        name="name"
                        type="text"
                        value={updatedProject.name}
                        onChange={handleTextChange}
                     />
                     <label htmlFor="name">
                        <b>Name</b>
                     </label>
                  </div>
               </div>
               <div className="col-3">
                  <div className="form-check form-switch">
                     <input
                        className="form-check-input"
                        id="status"
                        name="status"
                        type="checkbox"
                        checked={updatedProject.status}
                        onChange={handleCheckChange}
                     />
                     <label className="form-check-label" htmlFor="status">
                        Active Project
                     </label>
                  </div>
               </div>
            </div>

            <br />

            <div className="row">
               <div className="col">
                  <b>Project Type:</b>
                  <div className="form-check">
                     {projectTypes.map((projectOption) => {
                        return (
                           <div>
                              <input
                                 type="checkbox"
                                 className="form-check-input"
                                 value={projectOption}
                                 checked={selectedTypes.includes(projectOption)}
                                 onChange={handleTypeCheckChange}
                              />
                              <label className="form-check-label">{projectOption}</label>
                           </div>
                        );
                     })}
                  </div>
               </div>
               <div className="col">
                  <label className="form-label" htmlFor="notes">
                     <b>Notes</b>
                  </label>
                  <textarea
                     className="form-control"
                     id="notes"
                     name="notes"
                     type="text"
                     value={updatedProject.notes}
                     onChange={handleTextChange}
                  />

                  <label htmlFor="address" className="form-label">
                     <b>Address</b>
                  </label>
                  <input
                     className="form-control"
                     id="address"
                     name="address"
                     type="text"
                     value={updatedProject.address}
                     onChange={handleTextChange}
                  />
               </div>
            </div>

            <br />
            <hr />

            <div>
               <b className="d-flex justify-content-center">Add New Material</b>
               <br />
               <div className="row">
                  <div className="col">
                     <div className="form-floating">
                        <input
                           className="form-control"
                           id="matName"
                           name="name"
                           type="text"
                           value={newMaterial.name}
                           onChange={handleMatTextChange}
                        />
                        <label htmlFor="matName">New Material Name</label>
                     </div>
                  </div>

                  <div className="col">
                     <div className="form-floating">
                        <input
                           className="form-control"
                           id="squareFeet"
                           name="squareFeet"
                           type="number"
                           value={newMaterial.squareFeet}
                           onChange={handleNumberChange}
                        />
                        <label htmlFor="squareFeet">Square Feet Required</label>
                     </div>
                  </div>
               </div>

               <br />

               <div className="row">
                  <div className="col">
                     <div className="form-floating">
                        <input
                           className="form-control"
                           id="coverage"
                           name="coverage"
                           type="number"
                           value={newMaterial.coverage}
                           onChange={handleNumberChange}
                        />
                        <label htmlFor="coverage">Coverage Per Unit (Sq Ft)</label>
                     </div>
                  </div>

                  <div className="col">
                     <div className="form-floating">
                        <input
                           className="form-control"
                           id="units"
                           name="units"
                           type="number"
                           value={newMaterial.units}
                           onChange={handleNumberChange}
                        />
                        <label htmlFor="units">Units Required</label>
                     </div>
                  </div>
               </div>
            </div>

            <br />
            <b className="d-flex justify-content-center">Current Materials</b>
            <br />

            {updatedProject.materials.map((oneMaterial, i) => {
               return (
                  <div className="row d-flex align-items-center">
                     <div className="col">
                        <div className="form-floating">
                           <input
                              className="form-control"
                              id="matName"
                              name="name"
                              type="text"
                              value={oneMaterial.name}
                              onChange={(e) => updateMaterialArray(e, i)}
                           />
                           <label htmlFor="matName">Material {i + 1}</label>
                        </div>
                     </div>

                     <div className="col">
                        <div className="form-floating">
                           <input
                              className="form-control"
                              id="squareFeet"
                              name="squareFeet"
                              type="number"
                              value={oneMaterial.squareFeet}
                              onChange={(e) => updateMaterialNumArray(e, i)}
                           />
                           <label htmlFor="squareFeet">Sq Ft. Required</label>
                        </div>
                     </div>

                     <div className="col">
                        <div className="form-floating">
                           <input
                              className="form-control"
                              id="coverage"
                              name="coverage"
                              type="number"
                              value={oneMaterial.coverage}
                              onChange={(e) => updateMaterialNumArray(e, i)}
                           />
                           <label htmlFor="coverage">Coverage (Sq Ft)</label>
                        </div>
                     </div>

                     <div className="col">
                        <div className="form-floating">
                           <input
                              className="form-control"
                              id="units"
                              name="units"
                              type="number"
                              value={oneMaterial.units}
                              onChange={(e) => updateMaterialNumArray(e, i)}
                           />
                           <label htmlFor="units">Units Required</label>
                        </div>
                     </div>

                     <div className="col-1">
                        <button
                           className="btn btn-light btn-outline-danger"
                           onClick={() => deleteMaterial(i)}>
                           {' '}
                           X{' '}
                        </button>
                     </div>
                  </div>
               );
            })}

            <hr />

            {updatedProject.startDate && updatedProject.endDate && (
               <div className="d-flex flex-column align-items-center">
                  <b>Project Dates:</b>
                  <p>
                     {new Date(updatedProject.startDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                     })}{' '}
                     -{' '}
                     {new Date(updatedProject.endDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                     })}
                  </p>
               </div>
            )}
            {updatedProject.startDate && updatedProject.endDate ? (
               <div className="d-flex justify-content-center">
                  <Calendar
                     selectRange
                     value={dates}
                     onChange={handleDates}
                     // activeStartDate={new Date(dates[0])}
                  />
               </div>
            ) : (
               <div className="d-flex justify-content-center">
                  <Calendar
                     selectRange
                     value={dates}
                     onChange={handleDates}
                     //   activeStartDate={new Date()}
                  />
               </div>
            )}

            <br />
            <hr />
            {project.address && (
               <div>
                  <b className="d-flex justify-content-center">Project Location</b>

                  <div className="d-flex space-above">
                     <iframe
                        className="mx-auto"
                        title="Location"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${project.address
                           .split(' ')
                           .join('+')}`}
                     />
                  </div>
               </div>
            )}

            {saved && <h2 className="d-flex justify-content-center">Save success.</h2>}
            <div className="d-flex justify-content-center space-above">
               <button className="btn btn-light btn-outline-success" type="submit">
                  Confirm Edit
               </button>
            </div>
         </form>
      </div>
   );
};

export default ProjectDetails;
