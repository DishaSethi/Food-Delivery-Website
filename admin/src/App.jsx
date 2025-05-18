import React from 'react';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import {Routes, Route} from 'react-router-dom';
import Orders from './pages/Orders/Orders.jsx';
import List from './pages/List/List.jsx';
import Add from './pages/Add/Add.jsx';
import { ToastContainer } from 'react-toastify';

import Dashboard from './pages/Dashboard/Dashboard.jsx';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const url="http://localhost:4000";

  return (
    <div>
      <ToastContainer/>

     
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
                <Route path="/add" element={<Add url={url}/>}/>
                <Route path="/list" element={<List url={url}/>}/>
                <Route path="/orders" element={<Orders url={url}/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
      </div>
    </div>
  );
}

export default App;