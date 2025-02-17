import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import PageNotFound from "../pages/404/PageNotFound";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProductsPage from "../pages/products/ProductsPage";
import {
  CustomersPage,
  CustomersCreate,
  CustomersShow,
  CustomersEdit,
} from "../pages/customers";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import BenefitsPage from "../pages/benefits/BenefitsPage";
import BenefitsCreate from "../pages/benefits/create/BenefitsCreate";
import BenefitsEdit from "../pages/benefits/edit/BenefitsEdit";
import UserPage from "../pages/users/UserPage";
import UsersCreate from "../pages/users/UsersCreate";
import UsersEdit from "../pages/users/UsersEdit";
import UsersShow from "../pages/users/UsersShow";
import UserProfile from "../pages/users/UserProfile";

import SettingPage from "../pages/setting/SettingPage";
import SettingForm from "../pages/setting/SettingForm";
import OrdersPage from "../pages/orders/OrdersPage";
import OrderDetailsPage from "../pages/orders/OrderDetailsPage";

export const Router = () => {
  const navigate = useNavigate();

  const checkRoute = () => {
    if (!localStorage.getItem("token")) {
      const url = window.location.href;
      if (url !== "http://localhost:3000/") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkRoute();
  }, []);
  return (
    <Routes>
      // ROOT
      <Route path="/" element={<Login />} />
      // 404
      <Route path="/*" element={<PageNotFound />} />
      // DASHBOARD
      <Route path="/dashboard" element={<DashboardPage />} />
      // SETTINGS
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/settings/create" element={<SettingForm />} />
      // CUSTOMERS
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/customers/create" element={<CustomersCreate />} />
      <Route strict path="/customers/:customerId" element={<CustomersShow />} />
      <Route path="/customers/:customerId/edit" element={<CustomersEdit />} />
      // PRODUCTS
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      // BENEFITS
      <Route path="/benefits" element={<BenefitsPage></BenefitsPage>} />
      <Route
        path="/benefits=create"
        element={<BenefitsCreate></BenefitsCreate>}
      />
      <Route path="/benefits=edit/:id" element={<BenefitsEdit />} />
      //Users
      <Route strict path="/users/:userId" element={<UsersShow />} />
      <Route path="/users" element={<UserPage />} />
      <Route path="/users/:userId/edit" element={<UsersEdit />} />
      <Route path="/users/create" element={<UsersCreate></UsersCreate>} />
      <Route path="/users/profile/:userId" element={<UserProfile />} />



      <Route path="/*" element={<PageNotFound />} />

      // ORDERS
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:idOrder" element={<OrderDetailsPage />} />
      // 404
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Router;
