import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const infoUser = JSON.parse(localStorage.getItem("infoUser"));
  return infoUser?.token ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};
const AdminProtectedRoutes = () => {
  const infoUser = JSON.parse(localStorage.getItem("infoUser"));
  return infoUser?.token ? (
    infoUser?.isAdmin ? (
      <Outlet></Outlet>
    ) : (
      <Navigate to="/*"></Navigate>
    )
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export { ProtectedRoutes, AdminProtectedRoutes };
