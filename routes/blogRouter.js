import express from 'express';
import { addBlog, editBlog, deleteBlog, fetchBlogs } from '../controller/blogController.js';

const blogRouter = express.Router();
blogRouter.get('/', fetchBlogs);
blogRouter.post('/add', addBlog);
blogRouter.post('/edit', editBlog);
blogRouter.post('/delete', deleteBlog);

export default blogRouter;
