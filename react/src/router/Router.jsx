import React, { Children } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from '../views/auth/Login'
import PageNotFound from '../pages/PageNotFound'
import SectionTable from '../components/SectionTable'
export const Router = () => {

return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/sectionTable" element={<SectionTable>{Children}</SectionTable>} />
    </Routes>
  );
};

export default Router;

 
