import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		await customFetch.post('/auth/register', data);
		toast.success('Registration successful');
		return redirect('/login');
	} catch (error) {
		toast.error(error?.response?.data?.msg);
		return error;
	}
};

const Register = () => {
	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>Register</h4>
				<FormRow type='text' name='name' labelText='name' defaultValue='anon' />
				<FormRow
					type='text'
					name='lastName'
					labelText='last name'
					defaultValue='guy'
				/>
				<FormRow
					type='text'
					name='location'
					labelText='location'
					defaultValue='asia'
				/>
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
				{/* @toDo - add a confirmPassword component */}
				<SubmitBtn />
				<p>
					Already a member?
					<Link to='/login' className='member-btn'>
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};

export default Register;
