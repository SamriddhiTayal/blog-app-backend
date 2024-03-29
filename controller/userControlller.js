import User from '../models/userModel.js';
import Blog from '../models/blogModel.js';
const fetchUserBlogs = async (req, res) => {
	const { author } = req.body;
	// console.log(req.body);
	try {
		const blogs = await Blog.find({ author }).populate({
			path: 'author',
		});
		return res.json({
			success: true,
			message: 'User slogs sent',
			data: { blogs },
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'Error while fetching data',
			data: { err },
		});
	}
};
const login = async (req, res) => {
	// extract email id and password
	// console.log(req.body);
	const { email, password } = req.body.data;
	// find the emailId if it exists in db or not
	try {
		let user = await User.findOne({ email });
		// function (err, user) {
		// 	if (err) throw err;
		// test
		user.comparePassword(password, function (err, isMatch) {
			if (err) throw err;
			if (isMatch) {
				return res.json({
					success: true,
					message: 'Logged In',
					data: user,
				});
			} else {
				return res.json({
					success: false,
					message: 'Check email or password',
					data: { email },
				});
			}
		});
	} catch (err) {
		console.log('err : ', err);
		return res.json({
			success: false,
			message: 'Error while logging in',
			data: { err },
		});
	}

	// send response
};
const signup = async (req, res) => {
	// extract data from req
	// console.log(req.body);
	const { username, email, password } = req.body.data;
	// validate email id - if already exits in db or is even valid or not
	try {
		if (!email || !username) {
			return res.json({
				success: false,
				message: 'Kindly check email or username',
				data: { username, email },
			});
		}
		let user = await User.findOne({ email });
		if (user) {
			return res.json({
				success: false,
				message: 'The user already exists',
				data: { username, email },
			});
		}

		// password encryption using pre save hook- userModel
		// create object of user
		user = new User({
			username,
			email,
			password,
		});

		await user.save();
		// save to document
		res.json({
			success: true,
			message: 'User created successfully',
			data: user,
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'There was an error while signup',
			data: { err },
		});
	}
};
const likeBlog = async (req, res) => {
	const blogId = req.body.id;
	const userId = req.body.user;
	try {
		if (!blogId || !userId) {
			return res.json({
				success: false,
				message: 'Invalid BlogID or UserID',
				data: { blogId, userId },
			});
		}
		const user = await User.findByIdAndUpdate(
			userId,
			{ $push: { likedBlogs: blogId } },
			{ returnDocument: 'after' }
		);
		return res.json({
			success: true,
			message: 'Liked Blog added successfully ',
			data: { user },
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'Error occured while liking the blog ',
			data: { err },
		});
	}
};
const showLikedBlogs = async (req, res) => {
	const { user } = req.body;
	try {
		if (!user) {
			return res.json({
				success: false,
				message: 'Invalid UserId',
				data: { user },
			});
		}
		const user = await User.findById(user);
		return res.json({
			success: true,
			message: 'Blog disliked successfully ',
			data: { user },
		});
	} catch (err) {
		return res.json({
			success: false,
			message: 'Error occured while disliking the blog ',
			data: { err },
		});
	}
};
export { fetchUserBlogs, login, signup, likeBlog, showLikedBlogs };
