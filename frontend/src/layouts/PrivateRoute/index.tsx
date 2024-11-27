import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";

export const PrivateRoute = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.access_token);

  return (
    isAuthenticated ? (
      <Outlet/>
    ) : (
      <Navigate to="/login" />
    )
  );
};