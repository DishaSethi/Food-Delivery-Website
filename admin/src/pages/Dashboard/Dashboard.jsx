// pages/Dashboard.jsx
import {useEffect, useState} from "react";
import  axios  from "axios";
import { SummaryCard } from "./SummaryCard";
import RevenueChart from "./RevenueChart";
import TopDishes from "./TopDishes";
import OrderStatusPieChart from "./OrderStatusPieChart";
import { FaShoppingCart, FaDollarSign, FaUtensils, FaClock } from "react-icons/fa";
import "./Dashboard.css"; // Import your custom CSS file

const Dashboard = () => {
  const [dashboardData, setDashboardData]=useState(null);

  useEffect(()=>{
    const fetchDashboardData=async()=>{
      try{
        const res=await axios.get("http://localhost:4000/api/order/dashboard");
        if(res.data.success){
          setDashboardData(res.data.data);
        }
      }
      catch(err){
        console.error("Error fetching dashboard data",err);
      }
    };

    fetchDashboardData();
  },[]);
  if (!dashboardData) return <div>Loading...</div>;

  const {ordersToday, revenueToday, pendingOrders,topDishes,pieChartData}=dashboardData;

  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <SummaryCard title="Orders Today" value={ordersToday} icon={<FaShoppingCart />} />
        <SummaryCard title="Revenue Today" value={`${revenueToday}`} icon={<FaDollarSign />} />
        <SummaryCard title="Top Dish" value={topDishes[0].name} icon={<FaUtensils />} />
        <SummaryCard title="Pending Orders" value={pendingOrders} icon={<FaClock />} />
       <RevenueChart/>
       <TopDishes dishes={topDishes}/>
       <OrderStatusPieChart/>
      </div>
    </div>
  );
};

export default Dashboard;
