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
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

  profit = income - expense;
  //Aqui recuperams el id que previamente hemos pasado por url
  let { id } = useParams();

  //En el momento que se inicie, indicamos que se ejecute de manera automatica el metodo getFields con parametro id dentro
  useEffect(() => {
    getFields(id);
  }, []);

  //Lo que hace este metodo es recibir un id el cual pasamos previamente y hacer una peticion axios
  const getFields = async (id) => {
      //Esto es un spinner que estara girando mientras se hace la peticion y se cargan los datos
    setLoading(true); 
    try {
      //Esta peticion axios se encargara de obtener los datos del beneficio que sea igual al id que le hemos pasado
      const response = await axios.get(`http://localhost:8000/api/getOneBenefit/${id}`);
      //Este metodo obtiene los datos, posteriormente asignaremos estos datos recibidos
      setId(response.data.id);
      setMonth(response.data.month);
      setIncome(response.data.income);
      setExpense(response.data.expense);
      setProfit(response.data.profit);

    } catch (error) {
      console.error('Error deleting resource:', error);
    } finally {
      //Cuando se carguen los datos lo pasamos a false para que no se muestre
      setLoading(false); 
    }
  };

//Este metodo se encarga de validar los datos que el usuario modifica, es lo mismo que en el CreateForm
  const validate = () => {
    let isValid = true;

    if (month.trim() === "") {
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

  //Este metodo se enargara de actualizar los datos que el usuario ha insertado, estos datos son previamente validados
  const handleUpdate = async (idBenefit, month, income, expense, profit) => {
    setAlertSucces(false);
    //Hacemos una peticion con axios pasandole los datos que el usuario ha cambiado
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
      //Si algo ha ido mal mostramos alerta de fallo
      setAlertError(true);
      console.error("Error:", error);
    } finally {
      //Si todo ha ido bien mostramos alerta de exito
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
