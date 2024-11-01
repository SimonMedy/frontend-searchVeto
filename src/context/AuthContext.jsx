import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();
const API_BASE_URL = "https://searchveto-api.vercel.app";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setToken(token);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/me`);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setToken(response.data.token);
      setIsAuthenticated(true);
      setMessage(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Une erreur est survenue.";
      setMessage(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setToken(response.data.token);
      setIsAuthenticated(true);
      setMessage(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Une erreur est survenue.";
      setMessage(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAdmin = user?.roles.includes("ROLE_ADMIN");

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, register, login, logout, message, user, loading, token, API_BASE_URL }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };