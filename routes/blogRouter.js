import express from 'express';
import { addBlog, editBlog, deleteBlog } from '../controller/blogController.js';

const blogRouter = express.Router();

blogRouter.post('/add', addBlog);
blogRouter.post('/edit', editBlog);
blogRouter.delete('/delete', deleteBlog);

export default blogRouter;
