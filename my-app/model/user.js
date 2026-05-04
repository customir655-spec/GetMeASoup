import mongoose, { Schema, model } from "mongoose";

// 1. Define the Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true
  },
  profilePic: {
    type: String,
    default: "" // You can set a default placeholder URL here
  },
  coverPic: {
    type: String,
    default: ""
  },
  
  razorpay_id:{
    type: String,
    default:"",
    required: true
  },
   razorpay_secret:{
    type: String,
    default:"",
    required: true
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// 2. Create the Model
// The first argument is the singular name of the collection (Mongoose will create 'users')

const User2 = mongoose.models.User3 || model("User3", userSchema);

export default User2;