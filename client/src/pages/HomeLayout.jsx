import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
	return (
		<div>
			<nav>NavBar</nav>
			<Outlet />
		</div>
	);
};

export default HomeLayout;
