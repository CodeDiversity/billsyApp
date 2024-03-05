// RequireAuth.tsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const RequireAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return <Outlet />;
};
