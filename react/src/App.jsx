import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import LoginForm from './components/Login'
import PageNotFound from './Pages/PageNotFound'


function App() {
  // initialize a browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <LoginForm />,
    },  
    {
      path: "*",
      element:  <PageNotFound />,
    },
    // other pages....
    // {
    //   path: "/inicio",
    //   element: <About />,
    // },
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App
