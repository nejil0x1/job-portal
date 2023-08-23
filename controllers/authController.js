import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

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
	const user = await User.findOne({ email: req.body.email });

	const isValidUser =
		user && (await comparePassword(req.body.password, user.password));
	if (!isValidUser) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const token = createJWT({ userId: user._id, role: user.role });

	const oneDay = 1000 * 60 * 60 * 24;
	res.cookie('token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === 'production',
	});
	res.status(StatusCodes.OK).json({ msg: 'User logged in' });
};
