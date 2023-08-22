import { check, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';

const withValidationErrors = validateValues => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map(error => error.msg);
				if (errorMessages[0].startsWith('Job not found')) {
					throw new NotFoundError(errorMessages);
				}
				throw new BadRequestError(errorMessages);
			}
			next();
		},
	];
};

export const validateJobInput = withValidationErrors([
	check('company').not().isEmpty().withMessage('Company is required'),
	check('position').not().isEmpty().withMessage('Position is required'),
	check('jobLocation').not().isEmpty().withMessage('Job location is required'),
	check('jobStatus')
		.isIn(Object.values(JOB_STATUS))
		.withMessage('Invalid status type'),
	check('jobType')
		.isIn(Object.values(JOB_TYPE))
		.withMessage('Invalid job type'),
]);

export const validateIdParam = withValidationErrors([
	param('id').custom(async value => {
		const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidMongoId) {
			throw new BadRequestError('Invalid MongoDB ID');
		}

		const job = await Job.findById(value);
		if (!job) {
			throw new NotFoundError(`Job not found with id: ${value}`);
		}
	}),
]);
