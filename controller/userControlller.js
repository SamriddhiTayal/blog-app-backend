import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
const login = (req, res) => {};
const signup = async (req, res) => {
	// extract data from req
	const { username, email, password } = req.body;
	console.log(req.body);
	// validate email id - if already exits in db or is even valid or not
	if (!email || !username) {
		return res.json({
			success: false,
			message: 'Kindly check emailId and username',
			data: { username, email },
		});
	}
	// password encryption using pre save hook
	// create object of user
	const user = new User({
		username,
		email,
		password,
	});

	try {
		await user.save();
	} catch (err) {
		return res.json({
			success: false,
			message: "There was an error",
			data: {err},
		});
	}
	// save to document
	res.json({
		success: true,
		message: 'User created successfully',
		data: user,
	});
};
export { login, signup };
