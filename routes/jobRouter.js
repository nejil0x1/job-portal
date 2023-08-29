import express from 'express';
const router = express.Router();

import {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
	showStats,
} from '../controllers/jobController.js';
import {
	validateIdParam,
	validateJobInput,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

router
	.route('/')
	.get(getAllJobs)
	.post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);

router
	.route('/:id')
	.get(validateIdParam, getJob)
	.patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
	.delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
