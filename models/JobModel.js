import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
	{
		company: String,
		position: String,
		jobStatus: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		jobType: {
			type: String,
			enum: ['full-time', 'part-time', 'internship'],
			default: 'full-time',
		},
		jobLocation: {
			type: String,
			default: 'My City',
		},
	},
	{ timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);
export default Job;

// export default mongoose.model('Job', JobSchema);
