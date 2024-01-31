import React from 'react'
import Sidebar from '../components/Sidebar'

export const AppLayout = ({ children }) => {
  return (
    <>
        <Sidebar children={children} />

        <main className="content">
            {children}
        </main>
    </>
  )
}

export default AppLayout;
