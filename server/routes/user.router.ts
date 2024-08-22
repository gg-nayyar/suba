import  express  from "express";
import userSchema from "../models/user.mongo";

const userRouter = express.Router();

// userRouter.post('/signup',async (req,res)=>{
//     const user = new userSchema({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         alias: req.body.alias,
//         username: req.body.username,
//         contactNumber: req.body.phoneNumber
//         accessToken: 
//     })
// })

export default userRouter;