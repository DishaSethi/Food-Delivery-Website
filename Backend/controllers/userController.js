import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
};

// Login user
const loginUser = async (req, res) => {
  // Implementation needed
  const {email,password}=req.body;
  try{
    const user=await userModel.findOne({email});

    if(!user){
        return res.json({success:false, messsage:"User doesn't exist"})
    }

    const isMatch=await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.json({
            success:false,
            message:"Invalid credentials"
        })
    }

    const token=createToken(user._id);
    res.json({success:true, token});


  }catch(error){
    console.log(error);
    res.json({success:false,message:error.message});

  }


};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser };
