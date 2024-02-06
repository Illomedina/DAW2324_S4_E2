import React, { useEffect, useState } from "react";
import "./SectionTable.css";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

function SectionTable({ SectionName }) {
  const [benefits, setBenefits] = useState([]);
  const [id, setId] = useState("");
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [profit, setProfit] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    getBenefits();
  }, []);

  const getBenefits = async () => {
    const url = "http://localhost:8000/api/getBenefits";
    const response = await axios.get(url);
    setBenefits(response.data);
  };

  const deleteBenefits = async (id) => {
    const response = await axios.delete('http://localhost:8000/api/deleteBenefits', {params: {'id': id}, method: 'DELETE'});
    if(response.status === 200) {
      console.log("OK", response.data);
    }else{
      console.log("Error");
    }
  };

  return (
    <div className="flex flex-col h-[100vh] divContainer">
      <div className="relative flex max-w-[550px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="headerContainer">
          <h4 className="text-lg font-bold text-primaryColor columns-3">
            {SectionName}
          </h4>
          <div className="buttonContainer columns-1">
            <button className="buttonCreate">
              <Link to="/benefits=create">Create</Link>
            </button>
            {/* <button className="buttonEdit">
              <Link>Edit</Link>
            </button>
            <button className="buttonDelete">Delete</button> */}
          </div>
        </div>
        <div className="scrollit relative flex max-w-[550px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <table className="table divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <td className="p-4 w-4">
                  <div className="flex items-center"></div>
                </td>
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
                  <td className="p-4 w-4">
                    <div className="flex items-center">
                      <input
                        id={"checkbox-table-"+benefit.id}                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-1"
                        className="sr-only"
                      ></label>
                    </div>
                  </td>
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
                    +{benefit.profit}€
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        openModal(
                          benefit.id,
                          benefit.month,
                          benefit.income,
                          benefit.expense,
                          benefit.profit
                        )
                      }
                      className="text-gray-900"
                    >
                      <i className=""></i>Edit
                    </button>
                    nbsp;
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
