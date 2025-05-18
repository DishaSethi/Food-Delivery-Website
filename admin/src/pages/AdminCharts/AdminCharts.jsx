// import React, {useEffect, useState} from 'react';
// import {BarChart, Bar, XAxis, YAxis, Tooltip,Legend, PieChart, Pie, Cell, LineChart,Line} from "recharts";
// import axios from "axios";


// const AdminCharts=()=>{
//     const [orderData, setOrderData]=useState([]);


//     useEffect(()=>{
//         axios.get("/api/admin/orders")
//          .then(response=> setOrderData(response.data))
//          .catch(error=> console.error("Error fetching order data:",error));
//     },[]);


//     const processedData=orderData.map(order=>(
//         {
//             data:order.date,
//             total:order.totalPrice,
//             status:order.status
//         }
//     ));

//     const statusCount={
//         Processing:
//     }
// }