import express from 'express';
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js"; // Added .js
import authMiddleware from "../middleware/auth.js"; // Ensure this is correct

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart); // Fixed typo
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
