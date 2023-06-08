import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      get("/auth/verify")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setUser(null);
          removeToken();
        });
    } else {
      setUser(null);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, storeToken, authenticateUser, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
