import { FaTimes } from 'react-icons/fa';
import { useDashboardContext } from '../pages/DashboardLayout';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import Logo from './Logo';
import links from '../utils/links';

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useDashboardContext();

	return (
		<Wrapper>
			<div className={`sidebar-container ${showSidebar && `show-sidebar`}`}>
				<div className='content'>
					<button type='button' className='close-btn' onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks isBigSidebar={false} />
				</div>
			</div>
		</Wrapper>
	);
};

export default SmallSidebar;
