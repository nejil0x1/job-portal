import {
	Link,
	Form,
	redirect,
	useActionData,
	useNavigate,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const errors = { msg: '' };
	if (data.password.length < 6) {
		errors.msg = 'Password too short';
		return errors;
	}

	try {
		await customFetch.post('/auth/login', data);
		toast.success('Logged in successfully');
		return redirect('/dashboard');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		errors.msg = error?.response?.data?.msg;
		return errors;
	}
};

const Login = () => {
	const errors = useActionData();

	const navigate = useNavigate();

	const loginDemoUser = async () => {
		const userData = {
			email: 'test@test.com',
			password: 'secret123',
		};
		try {
			await customFetch.post('/auth/login', userData);
			toast.success('Logged in as Demo User');
			navigate('/dashboard');
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		}
	};

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Login</h4>
				{errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
				<p></p>
				<FormRow
					type='email'
					name='email'
					labelText='email address'
					defaultValue='anonguy@email.com'
				/>
				<FormRow
					type='password'
					name='password'
					labelText='password'
					defaultValue='password123'
				/>
				<SubmitBtn />
				<button type='submit' className='btn btn-block' onClick={loginDemoUser}>
					explore the app
				</button>
				<p>
					Not a member yet?
					<Link to='/register' className='member-btn'>
						Register
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};

export default Login;
