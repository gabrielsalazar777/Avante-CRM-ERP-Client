import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {getToken() ? (
        <>
          <Link to="/projects">Projects</Link>
          <Link to="/clients">Clients</Link>
          <button onClick={logOutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
