import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (!currentUser) {
    toast.error("Please log in to access this page");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
