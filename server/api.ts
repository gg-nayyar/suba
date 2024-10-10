import express  from "express";
import userRouter from "./routes/user.router";
import postRouter from "./routes/post.router";

const api = express.Router();

api.use('/api',userRouter);
api.use('/api',postRouter);

export default api ;