import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import DashboardPage from '../pages/dashboard/DashboardPage'
import User from '../pages/User'

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/user" element={<User />} />
    </Routes>
  );
};

export default Router;

 
