import { check, param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';

const withValidationErrors = validateValues => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessage = errors.array().map(error => error.msg);
				throw new BadRequestError(errorMessage);
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
	param('id')
		.custom(value => mongoose.Types.ObjectId.isValid(value))
		.withMessage('Invalid MongoDB ID'),
]);
