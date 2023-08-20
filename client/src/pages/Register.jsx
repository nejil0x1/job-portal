import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';

const Register = () => {
	return (
		<Wrapper>
			<form className='form'>
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
				<button className='btn btn-block'>submit</button>
				<p>
					Already a member?
					<Link to='/login' className='member-btn'>
						Login
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
