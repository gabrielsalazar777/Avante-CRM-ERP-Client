import { useState, useEffect } from "react";
import ProjectList from "../components/ProjectList";
import ProjectDetails from "../components/ProjectDetails";
import AddProject from "../components/AddProject";
import { get } from "../services/authService";

const ProjectsDash = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [weather, setWeather] = useState([]);

  const projectTypes = [
    "Re-Roof",
    "Repair",
    "Tile",
    "Shingle",
    "Flat",
    "Solar",
    "Water Proof",
    "GC",
  ];

  const getProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const getWeather = () => {
    get("/api/weather")
      .then((response) => {
        setWeather(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      {weather.length ? (
        <div>
          {weather.map((d) => {
            return (
              <div>
                <p>{d.day}</p>
                <img src={d.icon} alt="weather-icon" />
                <p>{d.condition}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
      <AddProject
        getProjectDetails={getProjectDetails}
        projectTypes={projectTypes}
      />
      <ProjectList
        getProjectDetails={getProjectDetails}
        selectedProject={selectedProject}
      />
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          getProjectDetails={getProjectDetails}
          projectTypes={projectTypes}
        />
      )}
    </div>
  );
};

export default ProjectsDash;
