import {Router} from 'express';
import { getUser,getUsers } from '../controllers/user.controller.js';
import authorize  from '../middlewares/auth.middleware.js';
const userRouter=Router();
userRouter.get('/',getUsers);

userRouter.get('/:id',authorize,getUser);

userRouter.post('/',(req,res)=>{
    res.send({
        title:'Create a new user',
    })
})
userRouter.put('/:id',(req,res)=>{
    res.send({
        title:'Update User details',
    })
})

userRouter.delete('/:id',(req,res)=>{
    res.send({
        title:'Delete User',
    })
})

export default userRouter;
