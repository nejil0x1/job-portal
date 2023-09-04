import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { StatItem } from '../components';

export const loader = async () => {
	try {
		const responseData = await customFetch.get('/users/admin/app-stats');
		return responseData.data;
	} catch (error) {
		toast.error('You are not authorized to access this page');
		return redirect('/dashboard');
	}
};

const Admin = () => {
	const { users, jobs } = useLoaderData();

	return (
		<Wrapper>
			<StatItem
				title='Current users'
				count={users}
				color='#e9b949'
				bgColor='#fcefc7'
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title='Total jobs'
				count={jobs}
				color='#647acb'
				bgColor='#e0e8f9'
				icon={<FaCalendarCheck />}
			/>
		</Wrapper>
	);
};

export default Admin;
