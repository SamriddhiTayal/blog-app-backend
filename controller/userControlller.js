import User from '../models/userModel.js';
const login = (req, res) => {
	// extract email id and password
	const { email, password } = req.body;
	// find the emailId if it exists in db or not

	// hash the password given by user
	// check with the password from db

	// send response
};
const signup = async (req, res) => {
	// extract data from req
	const { username, email, password } = req.body;
	// console.log(req.body);
	// validate email id - if already exits in db or is even valid or not
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.json({
				success: false,
				message: 'The user already exits ',
				data: { email },
			});
		}
		if (!email || !username) {
			return res.json({
				success: false,
				message: 'Kindly check emailId and username',
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
export { login, signup };
