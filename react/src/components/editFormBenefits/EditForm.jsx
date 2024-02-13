import "./EditForm.css";
import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import "../sectionTable/alert.scss";

const EditForm = () => {
  const [alertSucces, setAlertSucces] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [idBenefit, setId] = useState("");
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  var [profit, setProfit] = useState("");
  const [loading, setLoading] = useState(false); 


  profit = income - expense;
  let { id } = useParams();

  useEffect(() => {
    getFields(id);
  }, []);

  const getFields = async (id) => {
    setLoading(true); 
    try {
      const response = await axios.get(`http://localhost:8000/api/getOneBenefit/${id}`);
      setId(response.data.id);
      setMonth(response.data.month);
      setIncome(response.data.income);
      setExpense(response.data.expense);
      setProfit(response.data.profit);

    } catch (error) {
      console.error('Error deleting resource:', error);
    } finally {
      setLoading(false); 
    }
  };


  const validate = () => {
    let isValid = true;

    if (month.trim() === "") {
      alert('Please enter your username');

        isValid = false;
    }

    if (isNaN(parseFloat(income)) || !isFinite(income) || parseFloat(income) <= 0) {
        isValid = false;
    }

    if (isNaN(parseFloat(expense)) || !isFinite(expense) || parseFloat(expense) <= 0) {
        isValid = false;
    }

    if (parseFloat(income) < parseFloat(expense)) {
        isValid = false;
    }

      if (isValid) {
        handleUpdate(idBenefit, month, parseFloat(income), parseFloat(expense), parseFloat(income) - parseFloat(expense));
    }
};

  const handleUpdate = async (idBenefit, month, income, expense, profit) => {
    setAlertSucces(false);
    const url = "http://localhost:8000/api/UpdateBenefit";
    try {
      const response = await axios.post(url, {
        idBenefit: idBenefit,
        month: month,
        income: income,
        expense: expense,
        profit: profit
      });
  
      if (response.status === 200) {
      }
    } catch (error) {
      setAlertError(true);
      console.error("Error:", error);
    } finally {
      setAlertSucces(true);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        {alertSucces && (
          <main>
            <section>
              <div className="alert alert-2-success">
                <h3 className="alert-title">Succes</h3>
                <p className="alert-content">Data edited correctly</p>
              </div>
            </section>
          </main>
        )}

{alertError && (
          <main>
            <section>
              <div className="alert alert-1-warning">
                <h3 className="alert-title">Error</h3>
                <p className="alert-content">Something went wrong</p>
              </div>
            </section>
          </main>
        )}

    {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            i
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed">Form Edition</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">
              Edit form for Benefits
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
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
