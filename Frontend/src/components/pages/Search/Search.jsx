import React, {useContext, useState,useEffect} from 'react';
import { StoreContext } from '../../../Context/StoreContext';
import './Search.css';
import FoodItem from '../../FoodItem/FoodItem';
const Search=()=>{
    const {food_list}=useContext(StoreContext);
    const [query, setQuery]=useState("");
    const [filtered, setFiltered]=useState([]);


    useEffect(()=>{
        if(query.trim()===''){
            setFiltered([]);
        }else{
            const results=food_list.filter(item=>
                item.name.toLowerCase().includes(query.toLowerCase())
            );

            setFiltered(results);
        }
    
},[query, food_list]);

return(
    <div className="search-page">
        <input type="text"
        placeholder='Search food...'
        value={query}
        onChange={(e)=> setQuery(e.target.value)} 
        className='search-input'
        />
        <div className="search-results">
            {filtered.length>0 ? (
                filtered.map(item=>(
                 <FoodItem
                 key={item._id}
                 id={item._id}
                 name={item.name}
                 price={item.price}
                 description={item.description}
                 image={item.image}
                 />
                ))
            ):(
                query && <p>No matching items found</p>
            )

        }
        </div>
    </div>
);
};

export default Search;