import express from 'express';
import { addBlog, editBlog, deleteBlog, fetchBlogs, likeBlog, dislikeBlog } from '../controller/blogController.js';

const blogRouter = express.Router();
blogRouter.get('/', fetchBlogs);
blogRouter.post('/add', addBlog);
blogRouter.post('/edit', editBlog);
blogRouter.post('/delete', deleteBlog);
blogRouter.post('/like', likeBlog);
blogRouter.post('/dislike', dislikeBlog);
export default blogRouter;
