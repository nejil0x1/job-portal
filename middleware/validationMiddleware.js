import { body, check, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

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

export const validateTest = withValidationErrors([
	[check('name').not().isEmpty().withMessage('Name is required').trim()],
]);
