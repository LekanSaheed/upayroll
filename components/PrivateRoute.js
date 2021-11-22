import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "../payrollContext/AuthContext";

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
    return (
      <div
        style={{
          background: "#4bc2bc",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading</div>
      </div>
    );
  }
  if ((loading || !authenticated) && isProtectedRoute) {
    return (
      <div
        style={{
          background: "#4bc2bc",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading</div>
      </div>
    );
  }
  return children;
};

export default PrivateRoute;
