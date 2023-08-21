import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';

const withValidationErrors = validateValues => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessage = errors.array().map(error => error.msg);
				return res.status(400).json({ errors: errorMessage });
			}
			next();
		},
	];
};

export const validateTest = withValidationErrors([
	[body('name').not().isEmpty().withMessage('Name is required').trim()],
]);
