import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is mandatory'],
		unique: true,
	},
	email: String,
	password: {
		type: String,
		required: true,
	},
	likedBlogs:{
		type : [Schema.Types.ObjectId],
		ref : 'Blogs'
	}
},{timestamps : true});
userSchema.pre('save', function (next) {
	const user = this;
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
});

// login-> password verification 
userSchema.methods.comparePassword = function(candidatePassword, cbFunc){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err) throw err;
		cbFunc(null, isMatch);
	})
}

const User = mongoose.model('User', userSchema);

export default User;
