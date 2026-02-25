import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/TokenService";
import { getRole } from "../services/RoleService";
import { AccessDenied } from "./AccessDenied";

export function PrivateRoute({ allowedRoles }) {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <AccessDenied />;
  }

  return <Outlet />;
}
