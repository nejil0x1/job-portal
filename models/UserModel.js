import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: {
		type: String,
		default: 'lastName',
	},
	location: {
		type: String,
		default: 'My City',
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
});

// UserSchema.methods.toJSON = function () {
// 	let obj = this.toObject();
// 	delete obj.password;
// 	return obj;
// };

const User = mongoose.model('User', UserSchema);
export default User;
