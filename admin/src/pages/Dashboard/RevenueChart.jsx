// components/RevenueChart.jsx
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  import "./RevenueChart.css"; // import the CSS
  import axios from "axios";
  import { useState,useEffect } from "react";
 
  
  const RevenueChart = () =>{
    const [data,setData]=useState([]);

    useEffect(()=>{
      const fetchRevenue=async()=>{
        try{
          const res=await axios.get("http://localhost:4000/api/order/revenue-weekly");
          setData(res.data);

        }catch(error){
          console.log("Error loading revenue chart:",error);
        }
      };
      fetchRevenue();
    },[]);
  
  return (
  <div className="revenue-chart-container">
    <h2 className="revenue-chart--title">
        Revenue This Week
    </h2>
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
        <XAxis dataKey="day"/>
        <YAxis/>
        <Tooltip/>
        <CartesianGrid strokeDasharray="3 3 "/>
        <Line type="monotone"
        dataKey="revenue"
        stroke="#3b82f6"
        strokeWidth={2}/>
        </LineChart>
        



    </ResponsiveContainer>
  </div>
    
  );
};
  
  export default RevenueChart;
  