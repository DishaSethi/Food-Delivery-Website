import React, { useState } from 'react';
import './Home.css';
import Header from '../../Header/Header';
import ExploreMenu from '../../ExploreMenu/ExploreMenu';
import FoodDisplay from '../../FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState('all');
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  );
}

export default Home;
