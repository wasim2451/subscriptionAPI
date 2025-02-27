import express from 'express';
import cookieParser from 'cookie-parser';
import {PORT} from './config/env.js';  

import authRouter from './router/auth.js';
import userRouter from './router/user.route.js';
import subRouter from './router/subscriptions.route.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { arcjetMiddleware } from './middlewares/arcjet.middleware.js';
import workflowRouter from './router/workflow.routes.js';

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
//Parse the cookies from the request headers

//Rate Limiting Middleware
app.use(arcjetMiddleware);

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/subscriptions',subRouter);
app.use('/api/v1/workflows',workflowRouter);

app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send('Hello World from Subscription Tracker !');
})
app.listen(PORT,async ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDatabase();
})
export default app;
