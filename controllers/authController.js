import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const registerUser = async (req, res) => {
	const { name, email, password, lastName, location } = req.body;

	const isFirstUser = (await User.countDocuments()) === 0;
	req.body.role = isFirstUser ? 'admin' : 'user';

	const newUser = await User.create({
		name,
		email,
		password,
		lastName,
		location,
		role: req.body.role,
	});

	res.status(StatusCodes.CREATED).json({ newUser });
};

export const loginUser = async (req, res) => {
	res.send('logged in');
};
