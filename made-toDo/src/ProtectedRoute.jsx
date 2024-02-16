import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  // console.log(loading, isAuthenticated);
  //If it is loading, it shows the loading
  if (loading) return <h1>Loading...</h1>;
  //If it is not loading and you are not authenticated, it is redirected to the login
  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;
  return <Outlet />;
}

export default ProtectedRoute;
