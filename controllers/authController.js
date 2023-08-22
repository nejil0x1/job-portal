import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const registerUser = async (req, res) => {
	let { name, email, password, lastName, location, role } = req.body;

	const isFirstUser = (await User.countDocuments()) === 0;
	role = isFirstUser ? 'admin' : 'user';

	password = await hashPassword(password);

	const newUser = await User.create({
		name,
		email,
		password,
		lastName,
		location,
		role,
	});

	res.status(StatusCodes.CREATED).json({ msg: 'User created', newUser });
};

export const loginUser = async (req, res) => {
	res.send('logged in');
};
