import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Providing a username is must'],
		unique: true,
	},
	email: String,
	password: {
		type: String,
		required: true,
	},
});
const User = mongoose.model('User', userSchema);
export default User;
