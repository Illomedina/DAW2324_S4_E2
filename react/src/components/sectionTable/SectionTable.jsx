import React, { useEffect, useState } from "react";
import "./SectionTable.css";
import {Link } from "react-router-dom";
import axios from "axios";

function SectionTable({ SectionName }) {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false); 
  //Obtenemos el token recibio a la hora de hacer el login
  const token = localStorage.getItem('token');
  //Establecemos el token en el header, para que cada vez que hagamos una peticion se aplique el token de manera automatica
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
  const [chartData] = useState([]);
  const [labels] = useState ([]);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [alertError, setAlertError] = useState(false);
  const [alertSucces, setAlertSucces] = useState(false);
  
  //se encarga de mostrar un cuadro al hacer hover con el raton encima del grafico
  const showTooltip = (e) => {
    setTooltipContent(e.target.textContent);
    setTooltipX(e.target.offsetLeft - e.target.clientWidth);
    setTooltipY(e.target.clientHeight + e.target.clientWidth);
    setTooltipOpen(true);
  };
  // se encarga de esconder un cuadro al hacer hover con el raton encima del grafico
  const hideTooltip = () => {
    setTooltipContent('');
    setTooltipOpen(false);
    setTooltipX(0);
    setTooltipY(0);
  };
  
  useEffect(() => {
    getBenefits();
  }, []);

  //Funcion que obtiene todos los beneficios y de cargar el chart
  const getBenefits = async () => {
    //añadimos spinner de carga
    setLoading(true); 
    try {
      //Hacemos peticion a api
      const url = `${import.meta.env.VITE_API_URL}/getBenefits`;
      const response = await axios.get(url,
        {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      });
      if(response.status===200){
        //Asignamos los datos a la tabla de beneficios
        setBenefits(response.data);
        //asignamos los datos a la grafica
        for (let i = 0; i < response.data.length; i++) {
          //Si el mes que recibimos es igual a x añadimos el profit en el grafico del mes x
          if(response.data[i].month === 'January'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'February'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'March'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'April'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'May'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'June'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'July'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'August'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'September'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'October'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'November'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }else if(response.data[i].month === 'December'){
            chartData[i] = response.data[i].profit;
            labels[i] = response.data[i].month.substring(0,3);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching benefits:', error);
    } finally {
      //pasamos loading a false
      setLoading(false); 
    }
  };

  //este metodo se encarga de eliminar una fila de la tabla de beneficios y tambien lo elimina de la base de datos
  const deleteBenefits = async (id) => {
    setLoading(true); 
    setAlertError(false);
    setAlertSucces(false);
    try {
      const url =`${import.meta.env.VITE_API_URL}/deleteBenefits/${id}`;
      //Hacemos peticion con axios pasandole id que obtenemos previamente del get
      const response = await axios.delete(url);
      if(response.status === 200) {
        console.log('Resource deleted successfully:', response.data);
        setAlertSucces(true);
        setAlertError(false);
      }else{
        setAlertSucces(false);
        setAlertError(true);
      }
    } catch (error) {
      setAlertError(true);
      console.error('Error deleting resource:', error);
    } finally {
      //si todo ha ido bien acutalizamos la tabla y quitamos el elemento que hemos eliminado
      getBenefits(...benefits);
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[100vh] divContainer">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
     {alertSucces && (
          <main>
            <section>
              <div className="alert alert-2-success">
                <h3 className="alert-title">Succes</h3>
                <p className="alert-content">Data deleted correctly</p>
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

      <div className="flex">
        {/* Aqui pintamos la tabla */}
        <div className="relative flex max-w-[600px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="headerContainer">
            <h4 className="text-lg font-bold text-primaryColor columns-3">
              {SectionName}
            </h4>
            <div className="buttonContainer">
              <Link className="buttonCreate" to="/benefits=create">Create</Link>
            </div>
          </div>
          <div className="scrollit relative flex max-w-[600px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
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
                {/* Mapeamos lo que recibimos de getBenefits, esto es como un forEach */}
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
                      {/* En el momento que el usuario clique aqui le pasaremos el id de la tabla en question, esto sirve para que se puedan enviar datos a otras pantallas */}
                      <Link to={`/benefits=edit/${benefit.id}`}>
                        Edit <br />
                      </Link>
                      <button
                        className="text-gray-900"
                        //Si el usuario clica se elimina la fila
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

        {/* Aqui pintamos el grafico */}
        <div className="relative flex max-w-[600px] h-[350px] w-full flex-col ml-4 rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="shadow p-6 rounded-lg bg-white">
          <div className="md:flex md:justify-between md:items-center">
            <div>
              <h2 className="text-xl text-gray-800 font-bold leading-tight">Benefits chart</h2>
              <p className="mb-2 text-gray-600 text-sm">Monthly Average of Year 2024</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-violet mr-2 rounded-full"></div>
                <div className="text-sm text-gray-700">Sales</div>
              </div>
            </div>
          </div>
          <div className="line my-8 relative">
            {tooltipOpen && (
              <div
                className="p-0 m-0 z-10 shadow-lg rounded-lg absolute h-auto block"
                style={{ bottom: `${tooltipY}px`, left: `${tooltipX}px` }}
              >
                <div className="shadow-xs rounded-lg bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Sales:</div>
                    <div className="font-bold ml-2">{tooltipContent}</div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex -mx-2 items-end mb-2">
              {chartData.map((data, index) => (
                <div key={index} className="px-2 w-1/6">
                  <div
                    style={{ height: `${data / 10}px` }}
                    className="transition ease-in duration-200 bg-violet hover:bg-blue-400 relative"
                  >
                    <div className="text-center absolute top-0 left-0 right-0 -mt-6 text-gray-800 text-sm">{data}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-400 mx-auto" style={{ height: '1px', width: `${100 - (1 / chartData.length) * 100 + 3}%` }}></div>
            <div className="flex -mx-2 items-end">
              {labels.map((label, index) => (
                <div key={index} className="px-2 w-1/6">
                  <div className="bg-red-600 relative">
                    <div className="text-center absolute top-0 left-0 right-0 h-2 -mt-px bg-gray-400 mx-auto" style={{ width: '1px' }}></div>
                    <div className="text-center absolute top-0 left-0 right-0 mt-3 text-gray-700 text-sm">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default SectionTable;