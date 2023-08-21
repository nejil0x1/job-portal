import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

let jobs = [
	{ id: nanoid(), company: 'attlasian', position: 'frontend' },
	{ id: nanoid(), company: 'google', position: 'backend' },
];

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => res.send('hi there'));

app.post('/', (req, res) => {
	console.log(req);
	res.json({ message: 'data received', data: req.body });
});

// GET all jobs
app.get('/api/v1/jobs', (req, res) => {
	res.status(200).json({ jobs });
});

// CREATE job
app.post('/api/v1/jobs', (req, res) => {
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
});

// GET a job
app.get('/api/v1/jobs/:id', (req, res) => {
	const job = jobs.find(job => job.id === req.params.id);
	if (!job) {
		return res
			.status(404)
			.json({ msg: `Job not found with id: ${req.params.id}` });
	}

	res.status(200).json({ job });
});

// EDIT a job
app.patch('/api/v1/jobs/:id', (req, res) => {
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
});

// DELETE a job
app.delete('/api/v1/jobs/:id', (req, res) => {
	const currJob = jobs.find(job => job.id === req.params.id);
	if (!currJob) {
		return res
			.status(404)
			.json({ msg: `Job not found with id: ${req.params.id}` });
	}

	const updatedJobs = jobs.filter(job => job.id !== currJob.id);
	jobs = updatedJobs;

	res.status(200).json({ msg: 'Job deleted', jobs });
});

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
