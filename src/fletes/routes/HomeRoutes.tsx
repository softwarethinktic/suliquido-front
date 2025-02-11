import { Navigate, Route, Routes } from "react-router-dom";
import { LiquidacionFlete } from "../pages/LiquidacionFlete";
import { HomePage } from "../pages/HomePage";
import { GenerarEstadoCuenta } from "../pages/GenerarEstadoCuenta";

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/liquidacion" element={<LiquidacionFlete />} />
      <Route path="/generar-estado-cuenta" element={<GenerarEstadoCuenta />} />
      <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  );
};
