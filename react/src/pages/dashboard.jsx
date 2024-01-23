import React from "react";

export const Dashboard = () => {
  return (
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
  
          <div className="mt-8 text-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyahN0hJAdrT3ln5XWdqrliJ91Ybz_ZG5clQ&usqp=CAU" alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
          </div>
  
          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-red-600 to-blue-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Home</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Users</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Orders</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Products</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Complaints</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Benefits</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Clients</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Translations</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">CMS</span>
              </a>
            </li>
            <li>
              <a href="#" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2V8ZM6 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                  <path d="M13 8a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                  <path d="M13 15a2 2 0 012-2h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                </svg>
                <span className="-mr-1 font-medium">Configurations</span>
              </a>
            </li>
          </ul>
        </div>
  
        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
    );
  };
  
  
  export default Dashboard;