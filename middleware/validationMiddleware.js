import { check, param, validationResult } from 'express-validator';
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

// import EventEmitter from 'events';
// const emitter = new EventEmitter();
// emitter.setMaxListeners(20);

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
				if (errorMessages[0].startsWith('Not authorized')) {
					throw new UnauthorizedError('Not authorized to access this route');
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
	param('id').custom(async (value, { req }) => {
		const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidMongoId) {
			throw new BadRequestError('Invalid MongoDB ID');
		}

		const job = await Job.findById(value);
		if (!job) {
			throw new NotFoundError(`Job not found with id: ${value}`);
		}
		const isAdmin = req.user.role === 'admin';
		const isOwner = req.user.userId === job.createdBy.toString();
		if (!isAdmin && !isOwner) {
			throw new UnauthorizedError('Not authorized to access this route');
		}
	}),
]);

export const validateRegisterInput = withValidationErrors([
	check('name').not().isEmpty().withMessage('Name is required'),
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format')
		.custom(async email => {
			const user = await User.findOne({ email });
			if (user) {
				throw new BadRequestError('Email already exists');
			}
		}),
	check('password')
		.not()
		.isEmpty()
		.withMessage('Password is required')
		.isLength({ min: 6 })
		.withMessage('Password must be at-least 6 characters long'),
	check('location').not().isEmpty().withMessage('Location is required'),
	check('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format'),
	check('password').not().isEmpty().withMessage('Password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
	check('name').not().isEmpty().withMessage('Name is required'),
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Invalid email format')
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequestError('Email already exists');
			}
		}),
	check('location').not().isEmpty().withMessage('Location is required'),
	check('lastName').notEmpty().withMessage('last name is required'),
]);
