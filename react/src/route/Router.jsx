import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from '../components/Login'
import PageNotFound from '../pages/PageNotFound'
import { Sidebar } from '../components/Sidebar';

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/side-bar" element={<Sidebar />} />
    </Routes>
  );
};

export default Router;

 
