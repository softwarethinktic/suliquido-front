import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { FletesRoutes } from "../fletes/routes/FletesRoutes";
import { useAuthStore } from "../hooks/useAuthStore";
import { CheckingAuth } from "../auth/components/CheckingAuth";
import { AdminRoutes } from "../admin/routes/AdminRoutes";

export const AppRouter = () => {
  const { status, user } = useAuthStore();

  // if( status === 'checking' ) {

  //   return  <CheckingAuth />
  // }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route
          path="/*"
          element={user?.role === "admin" ? <AdminRoutes /> : <FletesRoutes />}
        />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
