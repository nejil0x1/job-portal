import express from 'express';
const router = express.Router();

import {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
} from '../controllers/jobController.js';
import {
	validateIdParam,
	validateJobInput,
} from '../middleware/validationMiddleware.js';

router.route('/').get(getAllJobs).post(validateJobInput, createJob);

router
	.route('/:id')
	.get(validateIdParam, getJob)
	.patch(validateJobInput, validateIdParam, updateJob)
	.delete(validateIdParam, deleteJob);

export default router;
