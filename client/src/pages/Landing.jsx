import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Echo park big mood DIY mumblecore salvia sustainable fixie sriracha
						same church-key. Grailed polaroid pork belly af praxis. Jianbing
						edison bulb man braid, chillwave ascot forage subway tile VHS
						gatekeep. Single-origin coffee man braid synth, farm-to-table marfa
						literally deep v artisan. Edison bulb iceland knausgaard coloring
						book forage, woke artisan godard schlitz. Ascot DSA next level,
						salvia vinyl twee selvage.
					</p>
					<Link to='/register' className='btn register-link'>
						Register
					</Link>
					<Link to='/login' className='btn'>
						Login / Demo User
					</Link>
				</div>
				<img src={main} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

export default Landing;
