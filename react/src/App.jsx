import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import LoginForm from './components/Login'



function App() {
  // initialize a browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <LoginForm />,
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
