/* eslint-disable no-throw-literal */
// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const { data: response } = await axios.post(
        "/api/v1/authentication/login",
        {
          email,
          password,
        }
      );
      const newToken = response.data;
      localStorage.setItem("token", newToken);
      return true; // Indicate successful login
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const checkToken = async () => {
    try {
      const { data: checkToken } = await axios.get("/api/v1/verify/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!checkToken.isValid) throw { status: false };
    } catch (error) {
      console.error("Token validation failed:", error);
      logout(); // Invalidate the token on validation failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      checkToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
