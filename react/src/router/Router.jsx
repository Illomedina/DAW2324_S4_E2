import React, { Children } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import DashboardPage from '../pages/dashboard/DashboardPage'
import ProductsPage from '../pages/products/ProductsPage';
import { CustomersPage, CustomersCreate } from '../pages/customers';
import ProductDetailsPage from '../pages/products/ProductDetailsPage';
import BenefitsPage from '../pages/benefits/BenefitsPage';
import BenefitsCreate from '../pages/benefits/create/BenefitsCreate';
import BenefitsEdit from '../pages/benefits/edit/BenefitsEdit';

import SettingPage from '../pages/setting/SettingPage'
import SettingForm from '../pages/setting/SettingForm'


export const Router = () => {

  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/settings/create" element={<SettingForm />} />
        <Route path="/products" element={<ProductsPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      // CUSTOMERS
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/create" element={<CustomersCreate />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />

      // Benefits
      <Route path="/benefits" element={<BenefitsPage></BenefitsPage>} />
      <Route path="/benefits=create" element={<BenefitsCreate></BenefitsCreate>} />
      <Route path="/benefits=edit/:id" element={<BenefitsEdit />} />

      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;


