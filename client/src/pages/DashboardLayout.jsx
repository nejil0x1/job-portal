import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';

const DashboardContext = createContext();

const DashboardLayout = () => {
	// temp
	const user = { name: 'anon' };
	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleDarkTheme = async () => {
		console.log('dark themse');
	};

	const toggleSidebar = async () => {
		setShowSidebar(!showSidebar);
		console.log('toggled');
	};

	const logoutUser = async () => {
		console.log('logged out');
	};

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				logoutUser,
			}}
		>
			<Wrapper>
				<main className='dashboard'>
					<SmallSidebar />
					<BigSidebar />
					<div>
						<Navbar />
						<div className='dashboard-page'>
							<Outlet />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
