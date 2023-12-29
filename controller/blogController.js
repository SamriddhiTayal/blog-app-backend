// business logic of the app
// actual functionality takes places here
import Blog from '../models/blogModel.js';

const addBlog = async (req, res) => {
	// req body se data extract
	// console.log(req.body);
	// const author = body.author;

	// object destructing
	const { author, title, content } = req.body;
	// const title = req.body.title;
	// const content = req.body.content;
	if (!title) {
		return res.json({
			success: false,
			message: 'title is not valid',
			data: { title },
		});
	}
	if (!content) {
		return res.json({
			success: false,
			message: 'blog is not valid',
			data: { content },
		});
	}
	// create new object of blog
	// create entity of that object
	const blog = new Blog({
		author,
		title,
		content,
	});
	// store in db
	try {
		await blog.save();
	} catch (err) {
		return res.json({
			success: false,
			message: err,
			data: blog,
		});
	}

	res.json({
		success: true,
		message: 'new blog added',
		data: blog,
	});
};
const editBlog = (req, res) => {};
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
