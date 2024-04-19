// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element }) => {
  const { token, loading } = useAuth();

  if (loading) {
    // You might want to render a loading spinner or some indicator while checking the token
    return <div>Loading...</div>;
  }
  return token ? element : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
