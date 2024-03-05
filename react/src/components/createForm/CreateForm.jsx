import "./CreateForm.css";
import React, { useState } from "react";
import {Link } from "react-router-dom";
import axios from "axios";
import "../sectionTable/alert.scss";
/**
 * Function for creating a form.
 *
 * @param {Object} section - the section for which the form is created
 * @return {JSX.Element} the form component
 */
const CreateForm = ({ section }) => {
  //Declaramos variables
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [year, setYear] = useState("");
  var [profit, setProfit] = useState("");
  profit = income - expense;
  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  /**
   * Function to validate the input values for month, income, and expense.
   */
  const validate = () => {
    let isValid = true;
    const newErrors = {};
    if (month.trim() === "") {
      isValid = false;
      newErrors.month = "Month is required";
    }

    if(month != "January" || month != "February" || month != "March" || month != "April" || month != "May" || month != "June" || month != "July" || month != "August" || month != "September" || month != "October" || month != "November" || month != "December"){
      isValid = false;
      newErrors.month = "Month has to be valid";
    }

    if (
      isNaN(parseFloat(income)) ||
      !isFinite(income) ||
      parseFloat(income) <= 0
    ) {
      isValid = false;
      newErrors.username = "Username is required";
    }

    if (
      isNaN(parseFloat(expense)) ||
      !isFinite(expense) ||
      parseFloat(expense) <= 0
    ) {
      isValid = false;
      newErrors.expense = "Income is required";
    }

    if (parseFloat(income) < parseFloat(expense)) {
      isValid = false;
    }

    if (
      isNaN(parseInt(year)) ||
      !isFinite(year) ||
      parseFloat(year) <= 0
    ) {
      isValid = false;
      newErrors.year = "Year is required";
    }

    if (!isValid) {
      setErrors(newErrors);
    }

    if (isValid) {
      handleCreate(month, income, expense, year, profit);
    }
  };

  /**
   * Async function to handle creation of benefit data.
   *
   * @param {type} month - description of the month parameter
   * @param {type} income - description of the income parameter
   * @param {type} expense - description of the expense parameter
   * @param {type} profit - description of the profit parameter
   * @return {type} description of the return value
   */
  const handleCreate = async (month, income, expense, profit) => {
    setAlert(false);
    const url =`${import.meta.env.VITE_API_URL}/createBenefit`;
    await axios({
      method: "POST",
      url: url,
      data: { month, income, expense, year, profit },
    })
      .then(function (response) {
        if (response.status === 200) {
          console.log("Data inserted correctly");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        setAlert(false);
      })
      .finally(function () {
        setAlert(true);
        setMonth("");
        setIncome("");
        setExpense("");
        setProfit("");
      });
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        {alert && (
          <main>
            <section>
              <div className="alert alert-2-success">
                <h3 className="alert-title">Succes</h3>
                <p className="alert-content">Data inserted correctly</p>
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
              {errors.month && <div className="error">{errors.month}</div>}
              <input
                type="text"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              {errors.income && <div className="error">{errors.income}</div>}
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              {errors.expense && <div className="error">{errors.expense}</div>}
              <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
                 <input
                type="number"
                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="Year"
                value={year}
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
              Cancel
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
