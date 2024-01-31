import React, { useState } from "react";
import "./SectionTable.css";
import CrudFormBenefits from "../createForm/CrudFormBenefits";


function SectionTable ({SectionName}){
  const [seen, setSeen] = useState(false)
  
  function togglePop () {
    setSeen(!seen);
};
  return (
    <div className="flex flex-col justify-center h-[100vh] divContainer">
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
        </div>
      </div>
      {seen && (
          <div>
          {seen ? <CrudFormBenefits toggle={togglePop} section={SectionName} /> : null}
          </div>
      )}
    </div>
  );
};

export default SectionTable;
