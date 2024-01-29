import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login';
import PageNotFound from '../pages/404/PageNotFound';
import ProductsPage from '../pages/products/ProductsPage';

export const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
};

export default Router;


