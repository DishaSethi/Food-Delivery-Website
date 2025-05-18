import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import "./OrderStatusPieChart.css"; // import the CSS
import { useEffect, useState } from "react";



const COLOURS=["#4ade80","#facc15","#f8171"] //Green, Yellow, Red

const OrderStatusPieChart=()=>{
const [chartData, setChartData]=useState([]);

useEffect(()=>{
    const fetchStatusData=async()=>{
        try{
            const response=await fetch("http://localhost:4000/api/order/status-summary");
            const data=await response.json();

            const formattedData=
                [
                    {name:"Delivered", value:data["Delivered"]||0},
                    {name:"Food Processing",value:data["Food Processing"]||0},
                    {name:"Out for delivery", value:data["Out for delivery"]||0},
                ];
            
                setChartData(formattedData);

        }catch(error){
            console.error("Error fetching order status summary",error);
        }
    };
    fetchStatusData();

},[]);

    return(
        <div className="order-status-container">
            <h2 className="order-status-title">Order Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={chartData} cx="50%" y="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={3} dataKey="value" label>
                        {chartData.map((entry, index)=>(
                            <Cell key={`cell-${index}`}  fill={COLOURS[index%COLOURS.length]}/>
                        ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                </PieChart>

            </ResponsiveContainer>
        </div>
    );
};

export default OrderStatusPieChart;