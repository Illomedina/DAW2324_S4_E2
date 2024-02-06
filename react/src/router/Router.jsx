import React, { Children } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import DashboardPage from '../pages/dashboard/DashboardPage'
import BenefitsPage from '../pages/benefits/BenefitsPage';
import BenefitsCreate from '../pages/benefits/create/BenefitsCreate';

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/benefits" element={<BenefitsPage></BenefitsPage>} />
        <Route path="/benefits=create" element={<BenefitsCreate></BenefitsCreate>} />
    </Routes>
  );
};

export default Router;

 
