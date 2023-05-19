import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";

const Signup = () => {
  const { setUser } = useContext(AuthContext);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    fullName: "",
    adminKey: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
      .then((response) => {
        console.log("FRONTEND SIGNUP: ", response.data);
        // setUser(response.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={newUser.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={newUser.fullName}
          onChange={handleChange}
        />
        <label htmlFor="adminKey">Admin Key</label>
        <input
          id="adminKey"
          name="adminKey"
          type="text"
          value={newUser.adminKey}
          onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
