import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProjectsDash from "./pages/ProjectsDash";
import ClientsDash from "./pages/ClientsDash";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<ProjectsDash />} />
        <Route path="/clients" element={<ClientsDash />} />
      </Routes>
    </div>
  );
}

export default App;
