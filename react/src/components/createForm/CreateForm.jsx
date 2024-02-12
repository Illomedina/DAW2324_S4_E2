import "./CreateForm.css";
import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { show_alert } from "../alert/alert";
import axios from "axios";
import "../sectionTable/alert.scss";

const CreateForm = ({ section }) => {
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  var [profit, setProfit] = useState("");
  profit = income - expense;
  const [alert, setAlert] = useState(false);

  const validate = () => {
    if (month === "") {
    } else if (income == null) {
      show_alert("Invalid income", "info");
    } else {
      handleCreate(month, income, expense, profit);
    }
  };

  const handleCreate = async (month, income, expense, profit) => {
    setAlert(false);
    const url = "http://localhost:8000/api/createBenefit";
    await axios({
      method: "POST",
      url: url,
      data: { month, income, expense, profit },
    })
      .then(function (response) {
        if (response.status === 200) {
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      })
      .finally(function () {
        setAlert(true);
        setMonth('');
        setIncome('');
        setExpense('');
        setProfit('');
      });
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        {alert && (
          <main>
            <section>
              <div class="alert alert-2-success">
                <h3 class="alert-title">Succes</h3>
                <p class="alert-content">Data inserted correctly</p>
              </div>
            </section>
          </main>
        )}
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            i
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Form Creation</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              Create a form for {section}
            </p>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
              <label className="labels">Profit</label>
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder={profit}
                onChange={(e) => setProfit(e.target.value)}
                disabled
              />
            </div>
          </div>
          <div className="pt-4 flex items-center space-x-4">
            <Link
              to="/benefits"
              className="buttonDelete flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
            >
              Exit
            </Link>
            <button
              className="buttonCreate flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              onClick={() => validate()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
