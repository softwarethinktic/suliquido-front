import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminPage } from "../pages/AdminPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AdminRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Routes>
            <Route path="/" element={<AdminPage />} />
            <Route path="/register-user" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        }
      />
      <Route path="/*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};
