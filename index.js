import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import userRouter from './routes/userRouter';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {}) // returns a promise , so now handle it
	.then((con) => {
		// console.log(con.connection);
		console.log('DB connection successful');
	});

const func = (req, res) => {
	res.send('Ok');
};
app.get('/', func);
app.use('/user', userRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
