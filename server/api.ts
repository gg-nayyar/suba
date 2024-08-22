import express  from "express";
import userRouter from "./routes/user.router";

const api = express.Router();

api.use('/api',userRouter);

export default api ;