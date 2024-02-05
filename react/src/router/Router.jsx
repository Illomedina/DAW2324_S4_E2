import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import DashboardPage from '../pages/dashboard/DashboardPage'
import ProductsPage from '../pages/products/ProductsPage';
import { CustomersPage, CustomersCreate } from '../pages/customers';

import SettingPage from '../pages/setting/SettingPage'


export const Router = () => {

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/products" element={<ProductsPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      // CUSTOMERS
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/create" element={<CustomersCreate />} />
      
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;


