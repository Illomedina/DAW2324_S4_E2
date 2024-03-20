import React, { useEffect, useState } from "react";
import "./SectionTable.css";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Renders a section table with benefits data and a chart.
 *
 * @param {Object} SectionName - the name of the section
 * @return {JSX.Element} the rendered section table and chart
 */
function SectionTable({ SectionName }) {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [chartData] = useState([]);
  const [labels] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [alertError, setAlertError] = useState(false);
  const [alertSucces, setAlertSucces] = useState(false);

  /**
   * Function to show a tooltip based on the event target.
   *
   * @param {Event} e - the event triggering the tooltip display
   * @return {void}
   */
  const showTooltip = (e) => {
    setTooltipContent(e.target.textContent);
    setTooltipX(e.target.offsetLeft - e.target.clientWidth);
    setTooltipY(e.target.clientHeight + e.target.clientWidth);
    setTooltipOpen(true);
  };

  /**
   * Hides the tooltip by resetting its content and position, and closing it.
   */
  const hideTooltip = () => {
    setTooltipContent("");
    setTooltipOpen(false);
    setTooltipX(0);
    setTooltipY(0);
  };

  useEffect(() => {
    getBenefits();
  }, []);

  /**
   * Retrieves benefits from the specified API endpoint and sets the retrieved benefits and profit data for each month in the chart.
   *
   * @return {Promise<void>} - Function does not return anything
   */
  const getBenefits = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_URL}/getBenefits`;
      const response = await axios.get(url, {
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      if (response.status === 200) {
        setBenefits(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].month === "January") {
            chartData[0] = response.data[i].profit;
            labels[0] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "February") {
            chartData[1] = response.data[i].profit;
            labels[1] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "March") {
            chartData[2] = response.data[i].profit;
            labels[2] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "April") {
            chartData[3] = response.data[i].profit;
            labels[3] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "May") {
            chartData[4] = response.data[i].profit;
            labels[4] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "June") {
            chartData[5] = response.data[i].profit;
            labels[5] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "July") {
            chartData[6] = response.data[i].profit;
            labels[6] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "August") {
            chartData[7] = response.data[i].profit;
            labels[7] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "September") {
            chartData[8] = response.data[i].profit;
            labels[8] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "October") {
            chartData[9] = response.data[i].profit;
            labels[9] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "November") {
            chartData[10] = response.data[i].profit;
            labels[10] = response.data[i].month.substring(0, 3);
          } else if (response.data[i].month === "December") {
            chartData[11] = response.data[i].profit;
            labels[11] = response.data[i].month.substring(0, 3);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching benefits:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes benefits from the server by making an asynchronous request.
   *
   * @param {type} id - The identifier of the benefits to be deleted
   * @return {type} description of return value
   */
  const deleteBenefits = async (id) => {
    setLoading(true);
    setAlertError(false);
    setAlertSucces(false);
    try {
      const url = `${import.meta.env.VITE_API_URL}/deleteBenefits/${id}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        console.log("Resource deleted successfully:", response.data);
        setAlertSucces(true);
        setAlertError(false);
      } else {
        setAlertSucces(false);
        setAlertError(true);
      }
    } catch (error) {
      setAlertError(true);
      console.error("Error deleting resource:", error);
    } finally {
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
        <div className="relative flex max-w-[650px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="headerContainer">
            <h4 className="text-lg font-bold text-primaryColor columns-3">
              {SectionName}
            </h4>
            <div className="buttonContainer">
              <Link className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300" to="/benefits=create">
                Create
              </Link>
            </div>
          </div>
          <div className="scrollit relative flex max-w-[650px] h-[550px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
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
                    Year
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
                      {benefit.year}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {/* En el momento que el usuario clique aqui le pasaremos el id de la tabla en question, esto sirve para que se puedan enviar datos a otras pantallas */}
                      <Link to={`/benefits=edit/${benefit.id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                        </svg>
                      </Link>
                      <button
                        className="text-gray-900"
                        //Si el usuario clica se elimina la fila
                        onClick={() => deleteBenefits(benefit.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                <h2 className="text-xl text-gray-800 font-bold leading-tight">
                  Benefits chart
                </h2>
                <p className="mb-2 text-gray-600 text-sm">
                  Monthly Average of Year 2024
                </p>
              </div>
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-violet mr-2 rounded-full"></div>
                  <div className="text-sm text-gray-700">Benefits</div>
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
                      <div>Benefits:</div>
                      <div className="font-bold ml-2">{tooltipContent}</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex -mx-2 items-end mb-2">
                {chartData.map((data, index) => (
                  <div key={index} className="px-2 w-1/6">
                    <div
                      style={{ height: `${data / 20}px` }}
                      className="transition ease-in duration-200 bg-violet hover:bg-blue-400 relative"
                    >
                      <div className="text-center absolute top-0 left-0 right-0 -mt-6 text-gray-800 text-sm">
                        {data}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="border-t border-gray-400 mx-auto"
                style={{
                  height: "1px",
                  width: `${100 - (1 / chartData.length) * 100 + 3}%`,
                }}
              ></div>
              <div className="flex -mx-2 items-end">
                {labels.map((label, index) => (
                  <div key={index} className="px-2 w-1/6">
                    <div className="bg-red-600 relative">
                      <div
                        className="text-center absolute top-0 left-0 right-0 h-2 -mt-px bg-gray-400 mx-auto"
                        style={{ width: "1px" }}
                      ></div>
                      <div className="text-center absolute top-0 left-0 right-0 mt-3 text-gray-700 text-sm">
                        {label}
                      </div>
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
}

export default SectionTable;
