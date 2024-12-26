import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home.jsx'; // Adjust path if necessary
import Cart from './components/pages/Cart/Cart.jsx';
import PlaceOrder from './components/pages/PlaceOrder/PlaceOrder.jsx';
import ExploreMenu from './components/ExploreMenu/ExploreMenu.jsx';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
       
      </Routes>
      {/* <ExploreMenu/> */}
    </div>
  );
};

export default App;
