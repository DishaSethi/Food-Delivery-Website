import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect('mongodb+srv://FoodDelivery:fooddelivery101@cluster0.mvtih.mongodb.net/fooddel').then(()=>console.log("MongoDB connected"));
}