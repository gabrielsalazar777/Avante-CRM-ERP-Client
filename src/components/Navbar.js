import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  return (
    <nav
      className="navbar navbar-expand navbar-dark"
      style={{ background: "darkgreen" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="/Logo WHiteout.PNG"
            alt="Avante Logo"
            style={{ width: "5vw", height: "7.5vh" }}
          />
        </Link>
        {getToken() ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link active">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/clients" className="nav-link active">
                Clients
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/calendar" className="nav-link active">
                Calendar
              </Link>
            </li>
            <li className="nav-item" onClick={logOutUser}>
              <Link to="/" className="nav-link active">
                Log Out
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link active">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link active">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
