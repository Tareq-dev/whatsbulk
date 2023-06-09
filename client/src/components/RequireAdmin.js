import React from "react";
import { useAuth } from "./context/auth";
import { Navigate, useLocation } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const auth = useAuth();
  const user = auth.user;
  const location = useLocation();

  if (!user || user?.role !== "admin") {
    auth.logout();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
