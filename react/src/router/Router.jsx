import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import DashboardPage from '../pages/dashboard/DashboardPage'
import ProductsPage from '../pages/products/ProductsPage';
import { CustomersPage, CustomersCreate } from '../pages/customers';
import ProductDetailsPage from '../pages/products/ProductDetailsPage';

export const Router = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      // CUSTOMERS
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/create" element={<CustomersCreate />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;


