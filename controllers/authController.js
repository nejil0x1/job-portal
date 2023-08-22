import User from '../models/UserModel.js';

export const loginUser = async (req, res) => {
	res.send('logged in');
};

export const registerUser = async (req, res) => {
	res.send('registered');
};
