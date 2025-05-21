import React, { useState,useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './PeakHoursAreaChart.css';
import axios from 'axios';


const PeakHoursAreaChart =()=>{
    const [data,setData]=useState([]);

    useEffect(()=>{
        const fetchPeakHourData=async()=>{
        try{
        const res=await axios.get("http://localhost:4000/api/order/peakHour-sales");

        if(res.data.success){
            setData(res.data.data);

        }
    }catch(err){
        console.error("Error fetching peak hour data",err);
    }}
    fetchPeakHourData();
    },[]);
    return(
        <div className="peak-hours chart-wrapper">
            <h2 className="chart-title">Peak Hours (Orders)</h2>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data} margin={{top:20, right:30, left:20, bottom:40}}>
                <defs>
                    <linearGradient id='colorOrders' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset="5%" stopColor='#10B981' stopOpacity={0.8}/>
                        <stop offset="95%" stopColor='#10B981' stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="hour" angle={-45} textAchor="end" interval={2}/>
                <YAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="orders" stroke='#10B981' fillOpacity={1} fill='url(#colorOrders)'/>
                </AreaChart>

            </ResponsiveContainer>
        </div>
    );
};

export default PeakHoursAreaChart