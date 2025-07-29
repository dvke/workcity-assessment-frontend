import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api"; // Adjust the path as necessary

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            id: decoded.id,
            name: decoded.name, // <-- add this line
            role: decoded.role,
          });
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({
      id: decoded.id,
      name: decoded.name, // <-- add this line
      role: decoded.role,
    });
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return response;
  };

  const signup = async (name, email, password, role = "user") => {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({
      id: decoded.id,
      name: decoded.name, // <-- add this line
      role: decoded.role,
    });
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return response;
  };

  const authContextValue = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
