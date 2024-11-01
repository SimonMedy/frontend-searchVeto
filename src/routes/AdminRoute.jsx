import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default AdminRoute;
