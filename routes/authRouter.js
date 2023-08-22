import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/authController.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';

router.route('/register').post(validateRegisterInput, registerUser);

router.route('/login').post(loginUser);

export default router;
