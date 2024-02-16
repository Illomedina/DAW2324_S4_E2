import React, {useEffect} from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Login from '../pages/auth/Login'
import PageNotFound from '../pages/404/PageNotFound'
import DashboardPage from '../pages/dashboard/DashboardPage'
import ProductsPage from '../pages/products/ProductsPage';
import { CustomersPage, CustomersCreate } from '../pages/customers';
import ProductDetailsPage from '../pages/products/ProductDetailsPage';
import BenefitsPage from '../pages/benefits/BenefitsPage';
import BenefitsCreate from '../pages/benefits/create/BenefitsCreate';
import BenefitsEdit from '../pages/benefits/edit/BenefitsEdit';
import axios from "axios";

export const Router = () => {
  const navigate = useNavigate();

  const checkRoute = () => {

    if(!localStorage.getItem('token')){
      const url = window.location.href;
      if(url!=='http://localhost:3000/'){
        navigate('/');
      }
    }
  }

 useEffect(() => {
   checkRoute();
 })
  return (
    <Routes>
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


