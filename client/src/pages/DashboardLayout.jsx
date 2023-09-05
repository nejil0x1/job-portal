import { createContext, useContext, useState } from 'react';
import {
	Outlet,
	redirect,
	useLoaderData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Loading, Navbar, SmallSidebar } from '../components';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
	try {
		const { data } = await customFetch.get('/users/current-user');
		return data;
	} catch (error) {
		return redirect('/');
	}
};

const DashboardContext = createContext();

const DashboardLayout = () => {
	const { user } = useLoaderData();
	const navigate = useNavigate();

	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

	const toggleDarkTheme = async () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		document.body.classList.toggle('dark-theme', newDarkTheme);
		localStorage.setItem('darkTheme', newDarkTheme);
	};

	const toggleSidebar = async () => {
		setShowSidebar(!showSidebar);
		console.log('toggled');
	};

	const logoutUser = async () => {
		navigate('/');
		await customFetch.get('/auth/logout');
		toast.success('Logged out successfully');
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
							{isLoading ? <Loading /> : <Outlet context={{ user }} />}
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
