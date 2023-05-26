import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Add from './Pages/AddEdit';
import Edit from './Pages/EditUser';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/addContact' Component={Add}/>
        <Route exact path='/update/:id' Component={Edit}/>
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;