import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from '../components/Login'
import PageNotFound from '../pages/PageNotFound'
import Dashboard from '../pages/Dashboard';

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;

 
