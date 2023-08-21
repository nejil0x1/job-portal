import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

// Router imports
import jobRouter from './routes/jobRouter.js';

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => res.send('hi there'));

app.post('/', (req, res) => {
	console.log(req);
	res.json({ message: 'data received', data: req.body });
});

app.use('/api/v1/jobs', jobRouter);

app.use('*', (req, res) => {
	res.status(404).json({ msg: 'Page not found' });
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ msg: 'Something went wrong' });
});

const PORT = process.env.PORT || 5100;

try {
	const connect = await mongoose.connect(process.env.MONGO_URL);
	console.log(`MongoDB connected: ${connect.connection.host}`);
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
