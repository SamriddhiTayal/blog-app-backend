// business logic of the app
// actual functionality takes places here
import Blog from '../models/blogModel.js';

const addBlog = async (req, res) => {
	
	// req body se data extract
	// console.log(req.body);
	// const author = body.author;
	
	// object destructing
	const { author, title, content } = req.body;
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
			content
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
	const { id, title, content } = req.body;
	try {
		if (!id || !title || !content) {
			return res.json({
				success: false,
				message: 'Check id, title and blog',
				data: {id, title, content },
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
	const { id } = req.body;
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
export { addBlog, editBlog, deleteBlog };
