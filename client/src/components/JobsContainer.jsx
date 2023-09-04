import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
	const { data } = useAllJobsContext();
	const { allJobs, totalJobs, numPages } = data;

	if (allJobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs found</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} job{allJobs.length > 1 && 's'} found
			</h5>
			<div className='jobs'>
				{allJobs.map(job => {
					return <Job key={job._id} {...job} />;
				})}
			</div>
			{numPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

export default JobsContainer;
