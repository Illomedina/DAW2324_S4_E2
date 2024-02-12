import React, { useEffect, useState } from "react";
import "./SectionTable.css";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

function SectionTable({ SectionName }) {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    getBenefits();
  }, []);

  const getBenefits = async () => {
    setLoading(true); 
    try {
      const url = "http://localhost:8000/api/getBenefits";
      const response = await axios.get(url);
      setBenefits(response.data);
    } catch (error) {
      console.error('Error fetching benefits:', error);
    } finally {
      setLoading(false); 
    }
  };

  const deleteBenefits = async (id) => {
    setLoading(true); 
    try {
      const response = await axios.delete(`http://localhost:8000/api/deleteBenefits/${id}`);
      console.log('Resource deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting resource:', error);
    } finally {
      getBenefits(...benefits);
      setLoading(false); 
    }
  };
  
 

  return (
    <div className="flex flex-col h-[100vh] divContainer">
      {/* Loading indicator */}
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      
      <div className="relative flex max-w-[550px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="headerContainer">
          <h4 className="text-lg font-bold text-primaryColor columns-3">
            {SectionName}
          </h4>
          <div className="buttonContainer">
              <Link className="buttonCreate"to="/benefits=create">Create</Link>
          </div>
        </div>
        <div className="scrollit relative flex max-w-[550px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
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
                <th
                  scope="col"
                  className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                >
                  Modify
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
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">
                    
                  <Link to={`/benefits=edit/${benefit.id}`}>
                      Edit
                    </Link>
                   <button
                      className="text-gray-900"
                      onClick={() => deleteBenefits(benefit.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SectionTable;