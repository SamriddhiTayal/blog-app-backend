import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import userRouter from '../server/routes/userRouter.js';
import blogRouter from '../server/routes/blogRouter.js';
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {}) // returns a promise , so now handle it
	.then((con) => {
		// console.log(con.connection);
		console.log('DB connection successful');
	})
	.catch((err)=>{
		console.log("err : ",err);
	});

const func = (req, res) => {
	res.json({ success: true, message: 'Welcome', data: null });
};
// based on the url the request id redirected
app.get('/', func);
app.use('/user', userRouter);
// eg if the url is /blog/add then redirected to blogRouter
app.use('/blog', blogRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
