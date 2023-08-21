import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import { validateTest } from './middleware/validationMiddleware.js';

// Router imports
import jobRouter from './routes/jobRouter.js';

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => res.send('hi there'));

app.post(
	'/api/v1/test',
	validateTest,

	(req, res) => {
		res.json({ message: `hello ${req.body.name}` });
	}
);

app.use('/api/v1/jobs', jobRouter);

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
