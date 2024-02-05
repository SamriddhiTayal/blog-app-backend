// business logic of the app
// actual functionality takes places here
import Blog from '../models/blogModel.js';
const fetchBlogs = async (req, res) => {
	try {
		// change to username-populate
		const blogs = await Blog.find().populate({
			path: 'author',
			select: 'username',
		});
		// console.log("Blog:", blogs);
		return res.json({
			success: true,
			message: 'All Blogs',
			data: { blogs },
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'There was an error',
			data: { err },
		});
	}
};
const addBlog = async (req, res) => {
	// req body se data extract
	console.log(req.body);
	// const author = body.author;

	// object destructing
	const { author, title, content } = req.body.data;
	try {
		if (!title || !content) {
			return res.json({
				success: false,
				message: 'Please check title or content',
				data: { title, content },
			});
		}
		// condition add that same author cannot add same blog
		let blog = await Blog.findOne({
			author,
			title,
			content,
		});
		if (blog) {
			return res.json({
				success: false,
				message: 'Blog already exists',
				data: { title, content },
			});
		}
		// create new object of blog
		blog = new Blog({
			author,
			title,
			content,
			likes: 0,
			dislikes: 0,
		});
		// store in db

		await blog.save();
		res.json({
			success: true,
			message: 'new blog added',
			data: blog,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'there was an error',
			data: { err },
		});
	}
};
const editBlog = async (req, res) => {
	const { id, title, content } = req.body.data;
	try {
		if (!id || !title || !content) {
			return res.json({
				success: false,
				message: 'Check id, title and blog',
				data: { id, title, content },
			});
		}
		const blog = await Blog.findByIdAndUpdate(
			id,
			{ title, content },
			{
				new: true,
			}
		);

		return res.json({
			success: true,
			message: 'Blog updated',
			data: blog,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'Error while editing blog',
			data: { err },
		});
	}
};
const deleteBlog = async (req, res) => {
	// console.log(req.body);
	const { id } = req.body;
	// console.log(id);
	try {
		const blog = await Blog.findByIdAndDelete(id);
		if (!blog) {
			return res.json({
				success: false,
				message: 'Id Provided is not valid',
				data: null,
			});
		}
		res.json({
			success: true,
			message: 'Blog deleted successfully',
			data: id,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'Error occured while deleting the blog ',
			data: { err },
		});
	}
};
const likeBlog = async(req, res)=>{
	const {id} = req.body;
	try{
		if(!id){
			return res.json({
				success : false,
				message : "Invalid ID",
				data : {id},
			})
		}
		const blog = await Blog.findByIdAndUpdate(id, {$inc : {"likes" : 1}});
		return res.json({
			success: true,
			message: 'Blog Liked successfully ',
			data: { blog },
		});

	}catch (err){
		return res.json({
			success: false,
			message: 'Error occured while liking the blog ',
			data: { err },
		});
	}
}
const dislikeBlog = async (req, res) => {
	const { id } = req.body;
	try {
		if (!id) {
			return res.json({
				success: false,
				message: 'Invalid ID',
				data: { id },
			});
		}
		const blog = await Blog.findByIdAndUpdate(id, { $inc: { dislikes: 1 } });
		return res.json({
			success: true,
			message: 'Blog disliked successfully ',
			data: { blog },
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'Error occured while disliking the blog ',
			data: { err },
		});
	}
};
export { addBlog, editBlog, deleteBlog, fetchBlogs , likeBlog, dislikeBlog};
