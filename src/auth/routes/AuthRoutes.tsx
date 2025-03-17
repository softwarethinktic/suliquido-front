import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { ForgotPassword } from "../pages/ForgotPassword";
import { AssignPassword } from "../pages/AssignPassword";

export const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/assign-password" element={<AssignPassword />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
