import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    toast.error("Please log in to access this page");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
