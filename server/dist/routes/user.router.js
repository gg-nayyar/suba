"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
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
exports.default = userRouter;
