import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;

 
