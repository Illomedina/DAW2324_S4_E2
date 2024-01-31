import React, { useState } from "react";
import "./SectionTable.css";


function SectionTable ({SectionName}){
  const [seen, setSeen] = useState(false)
  
  function togglePop () {
    setSeen(!seen);
};  
  return (
    <div className="flex flex-col h-[100vh] divContainer">
      <div className="relative flex max-w-[550px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="headerContainer">
          <h4 className="text-lg font-bold text-primaryColor columns-3">{SectionName}</h4>
          <div className="buttonContainer columns-1">
          <button className="buttonCreate" onClick={togglePop}>Create</button>
          <button className="buttonEdit">Edit</button>
          <button className="buttonDelete">Delete</button>
          </div>
          </div>
        <div className="relative flex max-w-[550px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <table className="table divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                        <td className="p-4 w-4">
                                <div className="flex items-center">
                                </div>
                            </td>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Month
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Income
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Expenses
                            </th>   
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Profit
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                        <tr className="">
                            <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label for="checkbox-table-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">January</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">200€"</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500">100€</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">100€</td>
                        </tr>
                    </tbody>
                </table>
        </div>
      </div>
    </div>
  );
};

export default SectionTable;
