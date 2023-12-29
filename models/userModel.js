import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
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
const SALT_WORK_FACTOR = 10;
userSchema.pre('save', function(next){
	const user = this;
	console.log(user);
	const generateSaltFunc = (err, salt) => {
		if (err) return nexr(err);
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err);
			// override the user password
			user.password = hash;
			next();
		});
	};
	bcrypt.genSalt(SALT_WORK_FACTOR, generateSaltFunc);
})

	

const User = mongoose.model('User', userSchema);

export default User;
