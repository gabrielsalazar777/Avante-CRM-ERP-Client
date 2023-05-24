import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProjectsDash from "./pages/ProjectsDash";
import ClientsDash from "./pages/ClientsDash";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const LoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<LoggedOut/>}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<LoggedIn/>}>
          <Route path="/projects" element={<ProjectsDash />} />
          <Route path="/clients" element={<ClientsDash />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
