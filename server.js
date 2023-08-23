import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Router imports
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => res.send('hi there'));

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
	res.status(404).json({ msg: 'Page not found' });
});

app.use(errorHandlerMiddleware);

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
