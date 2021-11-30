import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "../payrollContext/AuthContext";
import FullPageLoader from "./FullPageLoader";

const PrivateRoute = ({ protectedRoutes, children }) => {
  const { authenticated, loading } = useAuthState();
  const router = useRouter();
  const isProtectedRoute = protectedRoutes.indexOf(router.pathname) !== -1;
  useEffect(() => {
    if (!loading && !authenticated && isProtectedRoute) {
      router.push("/login");
    }
  }, [loading, authenticated, isProtectedRoute]);
  if (loading && !authenticated) {
    return <FullPageLoader />;
  }
  if ((loading || !authenticated) && isProtectedRoute) {
    return <FullPageLoader />;
  }
  return children;
};

export default PrivateRoute;
