import React, { Children } from "react";
import "./SectionTable.css";


function SectionTable ({SectionName}){
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="relative flex max-w-[550px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="headerContainer">
          <h4 className="text-lg font-bold text-primaryColor columns-3">{SectionName}</h4>
          <div className="buttonContainer columns-1">
          <button className="buttonCreate">Create</button>
          <button className="buttonEdit">Edit</button>
          <button className="buttonDelete">Delete</button>
          </div>
          </div>
        <div className="relative flex max-w-[550px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        </div>
      </div>
    </div>
  );
};

export default SectionTable;
