import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/utils/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 *
 * @param children - The component(s) to render if authenticated
 * @returns The children if authenticated, otherwise redirects to /login
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
