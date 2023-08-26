import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';

const JobsContainer = () => {
	const { data } = useAllJobsContext();
	const { allJobs } = data;
	console.log('result: ', allJobs);
	if (allJobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs found</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<div className='jobs'>
				{allJobs.map(job => {
					return <Job key={job._id} {...job} />;
				})}
			</div>
		</Wrapper>
	);
};

export default JobsContainer;
