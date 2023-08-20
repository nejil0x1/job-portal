import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';

const Login = () => {
	return (
		<Wrapper>
			<form className='form'>
				<Logo />
				<h4>Login</h4>
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
				<button className='btn btn-block'>submit</button>
				<button className='btn btn-block'>explore the app</button>
				<p>
					Not a member yet?
					<Link to='/register' className='member-btn'>
						Register
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};

export default Login;
