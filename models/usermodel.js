import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "User Name is required"],
        trim:true,
        minLength:3,
        maxLength:50,
    },
    email:{
        type: String,
        required: [true, "User Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:255,
        match: [/\S+@\S+\.\S+/, 'Eamil is invalid . Try Again '],
    },
    password:{
        type: String,
        required: [true, "User Password is required"],
        minLength:6,
    }

},{timestamps:true});

const User=mongoose.model('User',userSchema);
export default User;