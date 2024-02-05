import React from 'react'
import Sidebar from '../components/Sidebar'

export const AppLayout = ({ children }) => {
  return (
    <>
      <Sidebar children={children} />
    </>
  )
}

export default AppLayout;
