import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllJobs = async (req, res) => {
	// console.log(req.user);
	const allJobs = await Job.find({ createdBy: req.user.userId });
	// console.log(req);
	res.status(StatusCodes.OK).json({ allJobs });
};

export const createJob = async (req, res) => {
	// const { company, position } = req.body;

	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);

	res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
	const job = await Job.findById({ _id: req.params.id });

	res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
	// const { company, position, jobStatus, jobType, jobLocation } = req.body;

	// const job = await Job.findById({ _id: req.params.id });
	// if (!job) {
	// 	return res
	// 		.status(404)
	// 		.json({ msg: `Job not found with id: ${req.params.id}` });
	// }

	// job.company = company;
	// job.position = position;
	// job.jobStatus = jobStatus;
	// job.jobType = job.jobType;
	// job.jobLocation = job.jobLocation;
	// const updatedJob = await job.save();
	const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(StatusCodes.OK).json({ msg: 'Job updated', job: updatedJob });
};

export const deleteJob = async (req, res) => {
	const deletedJob = await Job.findById({ _id: req.params.id });

	await Job.deleteOne({ _id: deletedJob._id });
	res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: deletedJob });
};
