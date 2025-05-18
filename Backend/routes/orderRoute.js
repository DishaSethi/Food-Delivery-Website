import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, userOrders, verifyOrder, listOrders, updateStatus, getOrderStatusSummary, getAdminDashboardData, getRevenueThisWeek } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware, userOrders);
orderRouter.get('/list',listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.get("/status-summary",getOrderStatusSummary);
orderRouter.get("/dashboard",getAdminDashboardData);
orderRouter.get("/revenue-weekly",getRevenueThisWeek);

export default orderRouter;
