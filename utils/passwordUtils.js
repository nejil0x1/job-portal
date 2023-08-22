import bcrypt from 'bcryptjs';

export const hashPassword = async password => {
	const salting = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salting);

	return hashedPassword;
};
