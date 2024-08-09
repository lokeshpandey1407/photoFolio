import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("auth_token"));
  const isAuthenticated = token;
  if (!isAuthenticated) return <Navigate to={"/"} replace />;
  else return children;
};

export default ProtectedRoute;
