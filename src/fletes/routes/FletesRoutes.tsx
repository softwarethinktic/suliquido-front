import { Navigate, Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import { HomeRoutes } from './HomeRoutes'


export const FletesRoutes : FC = () => {
  return (
    <Routes>
        <Route path="/home/*" element={<HomeRoutes />} />
        <Route path="/*" element={ <Navigate to="/home" /> } />

    </Routes>
  )
}
