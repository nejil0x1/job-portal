import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/authController.js';
import {
	validateLoginInput,
	validateRegisterInput,
} from '../middleware/validationMiddleware.js';

router.route('/register').post(validateRegisterInput, registerUser);

router.route('/login').post(validateLoginInput, loginUser);

export default router;
