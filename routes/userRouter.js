import express from 'express';
import { login, signup } from '../controller/user';
const userRouter = express.Router();

userRouter.post('/login', login);
userRouter.post('/add', signup);
export default userRouter;
