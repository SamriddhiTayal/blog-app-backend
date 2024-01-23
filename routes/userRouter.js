import express from 'express';
import {fetchUserBlogs, login, signup } from '../controller/userControlller.js';
const userRouter = express.Router();
userRouter.post('/', fetchUserBlogs);
userRouter.post('/login', login);
userRouter.post('/signup', signup);
export default userRouter;
