import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import Dashboard from '../layout/DashboardLayout';

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;

 
