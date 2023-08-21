import { nanoid } from 'nanoid';

let jobs = [
	{ id: nanoid(), company: 'attlasian', position: 'frontend' },
	{ id: nanoid(), company: 'google', position: 'backend' },
];

export const getAllJobs = async (req, res) => {
	res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res
			.status(400)
			.json({ msg: 'Please provide a company and positon' });
	}

	const job = {
		id: nanoid(10),
		company,
		position,
	};
	jobs.push(job);
	res.status(201).json({ job });
};

export const getJob = async (req, res) => {
	const job = jobs.find(job => job.id === req.params.id);
	if (!job) {
		throw new Error('Job not found');
		return res
			.status(404)
			.json({ msg: `Job not found with id: ${req.params.id}` });
	}

	res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res
			.status(400)
			.json({ msg: 'Please provide company and posiition' });
	}

	const job = jobs.find(job => job.id === req.params.id);
	if (!job) {
		return res
			.status(404)
			.json({ msg: `Job not found with id: ${req.params.id}` });
	}

	job.company = company;
	job.position = position;
	res.status(200).json({ msg: 'Job updated', job });
};

export const deleteJob = async (req, res) => {
	const currJob = jobs.find(job => job.id === req.params.id);
	if (!currJob) {
		return res
			.status(404)
			.json({ msg: `Job not found with id: ${req.params.id}` });
	}

	const updatedJobs = jobs.filter(job => job.id !== currJob.id);
	jobs = updatedJobs;

	res.status(200).json({ msg: 'Job deleted', jobs });
};
