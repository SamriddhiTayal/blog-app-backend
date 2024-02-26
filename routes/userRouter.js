import express from 'express';
import {fetchUserBlogs, login, signup, likeBlog, showLikedBlogs } from '../controller/userControlller.js';
const userRouter = express.Router();
userRouter.post('/', fetchUserBlogs);
userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.post('/like', likeBlog);
userRouter.post('/showLikedBlogs', showLikedBlogs);
export default userRouter;
