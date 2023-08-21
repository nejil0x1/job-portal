import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

export const getAllJobs = async (req, res) => {
	const allJobs = await Job.find({});
	res.status(StatusCodes.OK).json({ allJobs });
};

export const createJob = async (req, res) => {
	const { company, position } = req.body;

	const job = new Job({
		company,
		position,
	});

	const newJob = await job.save();
	res.status(StatusCodes.CREATED).json({ newJob });
};

export const getJob = async (req, res) => {
	const job = await Job.findById({ _id: req.params.id });
	if (!job) {
		throw new NotFoundError(`Job not found with id: ${req.params.id}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
	const { company, position } = req.body;

	const job = await Job.findById({ _id: req.params.id });
	if (!job) {
		return res
			.status(404)
			.json({ msg: `Job not found with id: ${req.params.id}` });
	}

	job.company = company;
	job.position = position;
	const updatedJob = await job.save();
	res.status(StatusCodes.OK).json({ msg: 'Job updated', job: updatedJob });
};

export const deleteJob = async (req, res) => {
	const deletedJob = await Job.findById({ _id: req.params.id });
	if (!deletedJob) {
		return res
			.status(404)
			.json({ msg: `Job not found with id: ${req.params.id}` });
	}

	await Job.deleteOne({ _id: deletedJob._id });
	res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: deletedJob });
};
