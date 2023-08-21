import Wrapper from '../assets/wrappers/BigSidebar';
import { NavLink } from 'react-router-dom';
import { useDashboardContext } from '../pages/DashboardLayout';
import NavLinks from './NavLinks';
import Logo from './Logo';

const BigSidebar = () => {
	const { showSidebar } = useDashboardContext();

	return (
		<Wrapper>
			<div className={`sidebar-container ${!showSidebar && `show-sidebar`}`}>
				<div className='content'>
					<header>
						<Logo />
					</header>
					<NavLinks />
				</div>
			</div>
		</Wrapper>
	);
};

export default BigSidebar;
