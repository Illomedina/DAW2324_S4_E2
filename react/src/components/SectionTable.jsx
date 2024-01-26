import React, { useState } from "react";
import "./SectionTable.css";
import CreateForm from "./CreateForm";


function SectionTable ({SectionName}){
  const [seen, setSeen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  function handleLogin(e){
    setSeen(!seen);
    e.preventDefault()
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="relative flex max-w-[550px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="headerContainer">
          <h4 className="text-lg font-bold text-primaryColor columns-3">{SectionName}</h4>
          <div className="buttonContainer columns-1">
          <button className="buttonCreate" onClick={handleLogin}>Create</button>
          <button className="buttonEdit">Edit</button>
          <button className="buttonDelete">Delete</button>
          </div>
          </div>
        <div className="relative flex max-w-[550px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-softGray bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        </div>
      </div>
      {seen && (
       <div className="popup">
       <div className="popup-inner">
           <h2>Login</h2>
           <form onSubmit={handleLogin}>
               <label>
                   Username:
                   <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
               </label>
               <label>
                   Password:
                   <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
               </label>
               <button type="submit">Login</button>
           </form>
           {/* <button onClick={props.toggle}>Close</button> */}
       </div>
   </div>
      )}
    </div>
  );
};

export default SectionTable;
