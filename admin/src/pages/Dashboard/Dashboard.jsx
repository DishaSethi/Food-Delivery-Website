// pages/Dashboard.jsx
import {useEffect, useState} from "react";
import  axios  from "axios";
import { SummaryCard } from "./SummaryCard";
import RevenueChart from "./RevenueChart";
import TopDishes from "./TopDishes";
import OrderStatusPieChart from "./OrderStatusPieChart";
import CategoryBarChart from "./CategoryBarChart";
import PeakHoursAreaChart from "./PeakHoursAreaChart";
import { FaShoppingCart, FaDollarSign, FaUtensils, FaClock } from "react-icons/fa";
import "./Dashboard.css"; // Import your custom CSS file

const Dashboard = () => {
  const [dashboardData, setDashboardData]=useState(null);
  const [categorySales, setCategorySales] = useState([]);
  useEffect(()=>{
    const fetchDashboardData=async()=>{
      try{
        const res=await axios.get("http://localhost:4000/api/order/dashboard");
        const categoryRes=await axios.get("http://localhost:4000/api/order/category-sales");
        if(res.data.success){
          setDashboardData(res.data.data),
           setCategorySales(categoryRes.data.data);

  
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
              </div >
        <div className="summary-cards1">

       <RevenueChart/>
       <TopDishes dishes={topDishes}/>
       <OrderStatusPieChart/>
        </div>
      

          <div className="p-6 ">
      <h2 className="text-xl font-bold mb-4">Category vs Items Sold</h2>
      <CategoryBarChart data={categorySales} />
      <PeakHoursAreaChart/>
    </div>
    </div>
  );
};

export default Dashboard;
