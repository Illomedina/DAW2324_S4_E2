import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from '../views/auth/Login'
import PageNotFound from '../pages/PageNotFound'

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;

 
