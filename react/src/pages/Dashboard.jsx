import React from "react";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="font-poppins antialiased">
    <div
      id="view"
      className="h-full w-screen flex flex-row"
      x-data="{ sidenav: true }"
    >
      <div
        id="sidebar"
        className="bg-primaryColor h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
        x-show="sidenav"
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <h1 className="font-bold text-4xl text-center md:hidden">
          </h1>
          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center"> CustomAIze
          </h1>
          <div id="menu" className="flex flex-col space-y-2.5">
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Home</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Users</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Orders</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Products</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Claims</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Benefits</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Clients</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Translations</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">CMS</span>
            </a>
            <a 
              href=""
              className="SideBarLink"
            >
              <span className="">Configurations</span>
            </a>
          </div>
        </div>
      </div>
     
    </div>
  </div>
    );
  };
  
  
  export default Dashboard;