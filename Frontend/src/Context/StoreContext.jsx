import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
const [cartItems,setCartItems]=useState({});
const url="https://food-delivery-backend-auwe.onrender.com"; 
const [token, setToken]= useState("");
const [food_list, setFoodList]=useState([]);
const[searchTerm, setSearchTerm]=useState("");

const addToCart=async (itemId)=>{
    if(!cartItems[itemId]){
        setCartItems((prev)=>(
            {...prev,[itemId]:1}
        ))
        
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if (token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }

    }

    // useEffect(()=>{
    //     console.log(cartItems);

    // },[cartItems])

    const getTotalCartAmount=()=>{
        let totalAmount=0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=> product._id===item);
                totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList= async ()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData= async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);

    }

    useEffect(()=>{

       
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }

        }
        loadData();
    },[])

    useEffect(() => {
        console.log("Food List:", food_list);
        console.log("Cart Items:", cartItems);
      }, [food_list, cartItems]);
      
    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchTerm,
        setSearchTerm
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
