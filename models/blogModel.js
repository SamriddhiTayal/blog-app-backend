import mongoose from "mongoose";

// document to be stored in mongodb
const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: String,
	// mongoose will add a createdAt and updatedAt field 
  timestamps : true,
  author : Number,
});

// create blog model from the above schema 
const Blog = mongoose.model("Blog", blogSchema)

export default Blog;