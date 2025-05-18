import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"; // Rename the imported Stripe package to avoid conflict

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use the renamed `Stripe` here

// Placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder= async(req,res)=>{
const {orderId,success}=req.body;
try{
    if(success == "true"){
        await orderModel.findByIdAndUpdate(orderId, {payment:true});
        res.json({success:true, message:"Paid"})

    }else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false, message:"Not Paid"});
    }
    
 } catch(error){

        console.log(error);
        res.json({success:false, message:"Error"});

    }

}

const userOrders= async(req,res)=>{
try{
const orders= await orderModel.find({userId:req.body.userId})
res.json({success:true, data:orders})
}catch(error){
    console.log(error);
    res.json({success:false , message:"Error"})

}
}

// Listing orders for admin panel

const listOrders= async(req,res)=>{
try {
    const orders= await orderModel.find();
res.json({success:true, data:orders})

    
} catch (error) {
    console.log(error);
    res.json({
        success:false, message:"Error"
    })
}
}

// api for updating order status
const updateStatus= async(req,res)=>{
try{
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true , message:"Status updated"})

}catch(error){
  console.log(error);
  res.json({success:false, message:"Error"})

}
}

const getOrderStatusSummary=async(req,res)=>{
  try{
    const summary=await orderModel.aggregate([
    {  $group:{
        _id:"$status",
        count:{$sum:1},
      },
    },

    ]);

    const result={
      "Delivered":0,
      "Food Processing":0,
      "Out for delivery":0,

    };

    summary.forEach((item)=>{
      const status=item._id;
      if(result[status] !== undefined){
        result[status]=item.count;
      }
    });
      res.status(200).json(result);
  } catch(error){
    console.log(error);
    res.status(500).json({success:false,message:"Error fetching status summary"});
  }
    };
 

const getAdminDashboardData=async(req,res)=>{
  try{
    const today= new Date();
    today.setHours(0,0,0,0);

    const allOrders=await orderModel.find();
    const todayOrders=await orderModel.find({createdAt:{$gte:today}});



    const revenueToday=todayOrders.reduce((total,order)=> total+order.amount,0);

    const pendingOrders=allOrders.filter((order)=> order.status!=="Delivered").length;

    const dishSales={};

    allOrders.forEach(order=>{
      order.items.forEach(item=>{
        const {name,quantity}=item;
        if(dishSales[name]){
          dishSales[name]+=quantity;
        }else{
          dishSales[name]=quantity;
        }
      });
    });
    const topDishes=Object.entries(dishSales)
      .map(([name,sales])=>({name,sales}))
      .sort((a,b)=> b.sales-a.sales)
      .slice(0,3);

     

      
      

      res.status(200).json({
        success:true,
        data:{
          ordersToday:todayOrders.length,
          revenueToday,
          pendingOrders,
          topDishes,
          
        },
        
      });
    
    }catch(error){
      console.log(error);
      res.status(500).json({success:false,message:"Error fetching dashboard data"});
    }
  
  };

  const getRevenueThisWeek=async(req,res)=>{
    try{
      const today=new Date();
      const dayOfWeek=today.getDay();
      const monday=new Date(today);
      monday.setDate(today.getDate()-((dayOfWeek+6)%7));
      monday.setHours(0,0,0,0);

      const orders=await orderModel.find({
        createdAt:{$gte:monday}
      });

      const dailyRevenue={
        Mon:0,
        Tue:0,
        Wed:0,
        Thu:0,
        Fri:0,
        Sat:0,
        Sun:0,
      };

      orders.forEach(order=>{
        const dayName=new Date(order.createdAt).toLocaleDateString("en-US",{
          weekday:"short",
        });

        if(dailyRevenue[dayName]!==undefined){
          dailyRevenue[dayName]+=order.amount;
        }
      });

      const result=Object.entries(dailyRevenue).map(([day,revenue])=>({
        day,
        revenue
      }));

      res.status(200).json(result);
    } catch(error){
      console.log(error);
      res.status(500).json({success:false, message:"Error fetching weekly revenue"});
    }
  };

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getOrderStatusSummary, getAdminDashboardData, getRevenueThisWeek };
