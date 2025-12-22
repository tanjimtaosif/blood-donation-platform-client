import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading,roleLoading,userState } = use(AuthContext);
  //   console.log(user);
  const location = useLocation();
  //   console.log(location);

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user || !userState=='active') {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
