import "./CreateForm.css";
import "../sectionTable/SectionTable.css";
import React, { useState } from "react";

const CreateForm = (props, { section }) => {
  const listBenefits = [
    {
      id: 1,
      month: "January",
      income: 100,
      expenses: 100
    }
  ];

  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  var [profit, setProfit] = useState("");

  profit = income - expenses;

  function handleCreate(e) {
    e.preventDefault();
    props.toggle();
  }

  return (
    <div className="popup">
      <div className="popup-inner">
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
          <form onSubmit={handleCreate}>
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Month" 
                value={month} onChange={e => setMonth(e.target.value)}/>
                <input type="number" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Income"
                value={income} onChange={e => setIncome(e.target.value)}/>
                <input type="number" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Expenses"
                  value={expenses} onChange={e => setExpenses(e.target.value)}/>
                  <label className="labels">Profit</label>
                  <input type="number" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                  placeholder={profit} disabled/>
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <button
                className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                onClick={props.toggle}
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>{" "}
                Cancel
              </button>
              <button className="buttonCreate flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none" ype="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

    
    </div>
  );
};

export default CreateForm;
