import mongoose from "mongoose";    
import {DATABASE_URI,NODE_ENV} from '../config/env.js'
if(!DATABASE_URI){
    throw new Error('DB_URI must be defined')
}
const connectToDatabase=async()=>{
    try{
       await mongoose.connect(DATABASE_URI)
       console.log(`Connected to Database in ${NODE_ENV} mode`)
    }
    catch(err){
        console.error('Error Connecting to the Database ',err)
        process.exit(1);
    }
}

export default connectToDatabase;