import React from "react";
import { Navigate } from "react-router-dom";
import { useRootStore } from "../stores/RootStore";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authStore } = useRootStore();
  if (!authStore.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
