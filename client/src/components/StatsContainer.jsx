import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({ defaultStats }) => {
	const stats = [
		{
			title: 'pending applications',
			count: defaultStats?.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#f59e0b',
			bgColor: '#fef3c7',
		},
		{
			title: 'interviews scheduled',
			count: defaultStats?.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bgColor: '#e0e8f9',
		},
		{
			title: 'jobs declined',
			count: defaultStats?.declined || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bgColor: '#ffeeee',
		},
	];

	return (
		<Wrapper>
			{stats.map(stat => {
				return (
					<StatItem
						key={stat.title}
						title={stat.title}
						count={stat.count}
						icon={stat.icon}
						color={stat.color}
						bgColor={stat.bgColor}
					/>
				);
			})}
		</Wrapper>
	);
};

export default StatsContainer;
