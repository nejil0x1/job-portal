import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';

fetch('https://www.course-api.com/react-useReducer-cart-project')
	.then(res => res.json())
	.then(data => console.log(data));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => res.send('hi there'));

app.post('/', (req, res) => {
	console.log(req);
	res.json({ message: 'data received', data: req.body });
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
