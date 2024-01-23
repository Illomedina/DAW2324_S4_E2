import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from '../components/Login'
import PageNotFound from '../pages/PageNotFound'

export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;

 
