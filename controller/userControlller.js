import User from '../models/userModel.js';

const login = async (req, res) => {
	// extract email id and password
	console.log(req.body);
	const { email, password } = req.body;
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
					data: { email, password },
				});
			} else {
				return res.json({
					success: false,
					message: 'Check email or password',
					data: {email, password},
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
	const { username, email, password } = req.body;
	// validate email id - if already exits in db or is even valid or not
	try {
		let user = await User.findOne({ email });
		if (!email || !username) {
			return res.json({
				success: false,
				message: 'Kindly check email or username does not exists',
				data: { username, email },
			});
		}
		if (user) {
			return res.json({
				success: false,
				message: 'The user already exists',
				data: { email },
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
