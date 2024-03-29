import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// document to be stored in mongodb
const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User', //mongoose ki objectId from user collection
		},
		userLiked :{
			type: [Schema.Types.ObjectId],
			ref:'User'
		},
		userDisliked :{
			type: [Schema.Types.ObjectId],
			ref:'User'
		},
	},
	// mongoose will add a createdAt and updatedAt field

	{ timestamps: true }
);

// create blog model from the above schema
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
