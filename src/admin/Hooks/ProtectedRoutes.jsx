// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthCheck from "./useAuthCheck";
import Spinner from "../ui/Spinner";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthCheck();

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
