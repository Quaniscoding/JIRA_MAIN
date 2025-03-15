import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const user = JSON.parse(localStorage.getItem("dataUser"));
  return user.role.name === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
