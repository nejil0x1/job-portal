import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

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

export const showStats = async (req, res) => {
	let stats = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: '$jobStatus', count: { $sum: 1 } } },
	]);
	// console.log(stats);

	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});
	console.log(stats);

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};

	// const defaultStats = {
	// 	pending: 22,
	// 	interview: 11,
	// 	declined: 4,
	// };

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 },
	]);

	monthlyApplications = monthlyApplications
		.map(item => {
			const {
				_id: { year, month },
				count,
			} = item;

			const date = day()
				.month(month - 1)
				.year(year)
				.format('MMM YY');
			return { date, count };
		})
		.reverse();

	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
