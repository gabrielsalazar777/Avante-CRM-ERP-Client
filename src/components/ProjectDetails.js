import { useContext, useEffect, useState } from "react";
import { post } from "../services/authService";
import { ProjectsContext } from "../context/projects.context";

const ProjectDetails = ({ project, getProjectDetails, projectTypes }) => {
  const [updatedProject, setUpdatedProject] = useState(project);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ name: "", squareFeet: 0, coverage: 0, units: 0 });
  const [saved, setSaved] = useState(false);

  const { getProjects } = useContext(ProjectsContext);

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
      setSelectedTypes((prev) =>
        prev.filter((type) => type !== e.target.value)
      );
    }
  };

  const deleteMaterial = (i) => {
    const updatedMaterials = [...updatedProject.materials];
    updatedMaterials.splice(i, 1);
    setUpdatedProject((prev) => ({ ...prev, materials: updatedMaterials }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let projectAfterMaterials = { ...updatedProject };

    if (newMaterial.name !== "") {
      const allMaterials = [...updatedProject.materials, newMaterial];
      projectAfterMaterials = { ...updatedProject, materials: allMaterials };
    }

    post(`/projects/edit/${project._id}`, projectAfterMaterials).then(
      (result) => {
        getProjects();
        getProjectDetails(result.data);
        setNewMaterial({ name: "", squareFeet: 0, coverage: 0, units: 0 });
        setSaved(true);
      }
    );
  };

  useEffect(() => {
    setUpdatedProject(project);
    setSelectedTypes(project.projectType);
  }, [project]);

  useEffect(() => {
    setUpdatedProject((prev) => ({ ...prev, projectType: selectedTypes }));
  }, [selectedTypes]);

  useEffect(() => {
    if (saved) {
        const saveTimer = setTimeout(() => {
            setSaved(false);
        }, 5000);
        return () => {clearTimeout(saveTimer)};
    }
  }, [saved])

  return (
    <div>
    {saved && <h2>Save success.</h2>}

      <h1>Selected Project:</h1>
      <h2>{project.name}</h2>
      <h3>Client: {project.client.name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={updatedProject.name} onChange={handleTextChange}
        />

        <label htmlFor="status">Active</label>
        <input id="status" name="status" type="checkbox" checked={updatedProject.status} onChange={handleCheckChange}
        />

        <label>Project Type</label>
        {projectTypes.map((projectOption) => {
          return (
            <div>
              <input type="checkbox" value={projectOption} checked={selectedTypes.includes(projectOption)}
                onChange={handleTypeCheckChange}
              />
              <label>{projectOption}</label>
            </div>
          );
        })}

        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" type="text" value={updatedProject.notes} onChange={handleTextChange}
        />
        <div>
          <p>Add New Material</p>
          <label htmlFor="matName">Material</label>
          <input id="matName" name="name" type="text" value={newMaterial.name} onChange={handleMatTextChange}
          />
          <label htmlFor="squareFeet">Square Feet Required</label>
          <input id="squareFeet" name="squareFeet" type="number" value={newMaterial.squareFeet}
            onChange={handleNumberChange}
          />
          <label htmlFor="coverage">Coverage</label>
          <input id="coverage" name="coverage" type="number" value={newMaterial.coverage}
            onChange={handleNumberChange}
          />
          <label htmlFor="units">Units</label>
          <input id="units" name="units" type="number" value={newMaterial.units} onChange={handleNumberChange}
          />
        </div>
        {updatedProject.materials.map((oneMaterial, i, matArr) => {
          return (
            <div>
              <label htmlFor="matName">Material {i+1}</label>
              <input id="matName" name="name" type="text" value={oneMaterial.name}
                onChange={(e) => updateMaterialArray(e, i)}
              />
              <label htmlFor="squareFeet">Square Feet Required</label>
              <input id="squareFeet" name="squareFeet" type="number" value={oneMaterial.squareFeet}
                onChange={(e) => updateMaterialNumArray(e, i)}
              />
              <label htmlFor="coverage">Coverage Per Unit (Sq Ft)</label>
              <input id="coverage" name="coverage" type="number" value={oneMaterial.coverage}
                onChange={(e) => updateMaterialNumArray(e, i)}
              />
              <label htmlFor="units">Units Required</label>
              <input id="units" name="units" type="number" value={oneMaterial.units}
                onChange={(e) => updateMaterialNumArray(e, i)}
              />
              <button onClick={() => deleteMaterial(i)}>X</button>
            </div>
          );
        })}

        <button type="submit">Confirm Edit</button>
      </form>
    </div>
  );
};

export default ProjectDetails;
