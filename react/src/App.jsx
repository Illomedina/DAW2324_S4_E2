import { useState } from 'react'
import './App.css'
import Router from './router/Router'
import { BrowserRouter } from 'react-router-dom';


export const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};



export default App;