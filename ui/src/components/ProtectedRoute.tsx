import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  canActivate: boolean;
  children: React.ReactNode;
  redirectPath: string;
}

function ProtectedRoute({
  children,
  canActivate,
  redirectPath,
}: ProtectedRouteProps) {
  return canActivate ? children : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;
