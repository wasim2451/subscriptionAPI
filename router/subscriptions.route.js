import { Router } from "express";
import authorize from './../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from './../controllers/subscription.controller.js';
const subRouter =Router();

subRouter.get('/',(req,res)=>{
    res.send({ title:'Get All Subscriptions'})
})

subRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({ title:'Get Upcoming Renewals'})
})

subRouter.get('/:id',authorize,getUserSubscriptions)

subRouter.post('/',authorize,createSubscription)

subRouter.put('/',(req,res)=>{
    res.send({ title:'Update Subscription'})
})


subRouter.delete('/:id',(req,res)=>{
    res.send({ title:'Delete Subscription'})
})

subRouter.get('/user/:id',(req,res)=>{
    res.send({ title:'Get Subscription by UserId'})
})

subRouter.delete('/:id/cancel',(req,res)=>{
    res.send({ title:'Cancel Subscription'})
})

export default subRouter;