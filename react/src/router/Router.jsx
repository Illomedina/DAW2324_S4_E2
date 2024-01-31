import React, { Children } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import SectionTable from '../components/sectionTable/SectionTable'
import DashboardPage from '../pages/dashboard/DashboardPage'

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/sectionTable" element={<SectionTable SectionName={"Beneficios"}></SectionTable>} />
    </Routes>
  );
};

export default Router;

 
