import AppLayout from "../../layout/AppLayout";
import React, { useEffect, useState } from "react";
import "../../components/sectionTable/SectionTable.css";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
export const DashboardPage = () => {
  const [benefits, setBenefits] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    getBenefits();
    getProducts();
    getOrders();
    getCustomers();
  }, []);

  const getBenefits = async () => {
    setLoading(true);
    try {
      const url = "http://localhost:8000/api/getBenefits";
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setBenefits(response.data);
      }
    } catch (error) {
      console.error("Error fetching benefits:", error);
    }
  };

  const getCustomers = async () => {
    try {
      const url = "http://localhost:8000/api/customers";
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        console.log(response.data);
        setCustomers(response.data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      const url = "http://localhost:8000/api/products";
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getOrders = async () => {
    try {
      const url = "http://localhost:8000/api/orders";
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  return (
    <AppLayout>
      <div className="flex flex-col h-[100vh] divContainer">
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        {/* SECTION BENEFITS / CUSTOMERS */}
        <div className="flex">
          <div className="relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {""}
              </h4>
              <div
                className="buttonCreate"
                style={{ padding: "0px", paddingLeft: "5px", width: "90px" }}
              >
                <Link to="/benefits">◉ See more</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Month
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Income
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Expenses
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Profit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {benefits.map((benefit, i) => (
                    <tr key={benefit.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {benefit.month}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {benefit.income} €
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        -{benefit.expense} €
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {benefit.profit}€
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative flex max-w-[620px] h-[350px] w-full flex-col ml-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {""}
              </h4>
              <div
                className="buttonCreate"
                style={{ padding: "0px", paddingLeft: "5px", width: "90px" }}
              >
                <Link to="/customers">◉ See more</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[620px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      PostalCode
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {customers.map((customer, i) => (
                    <tr key={customer.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.mail}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.surname}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.postcode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
        {/* SECTION PRODUCTS / ORDERS */}
        <div className="flex mt-10 mb-10">
          <div className="relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {""}
              </h4>
              <div
                className="buttonCreate"
                style={{ padding: "0px", paddingLeft: "5px", width: "90px" }}
              >
                <Link to="/products">◉ See more</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[600px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      SKU
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      DPI
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {products.map((product, i) => (
                    <tr key={product.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.sku} 
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.dpi} 
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {product.dpi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="relative flex max-w-[620px] h-[350px] w-full flex-col ml-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="headerContainer">
              <h4 className="text-lg font-bold text-primaryColor columns-3">
                {""}
              </h4>
              <div
                className="buttonCreate"
                style={{ padding: "0px", paddingLeft: "5px", width: "90px" }}
              >
                <Link to="/orders">◉ See more</Link>
              </div>
            </div>
            <div className="scrollit relative flex max-w-[620px] h-[350px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <table className="table divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Shipping Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {customers.map((customer, i) => (
                    <tr key={customer.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.quantity}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.priceEach}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {customer.shippingPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
