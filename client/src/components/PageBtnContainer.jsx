import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
	const {
		data: { numPages, currentPage },
	} = useAllJobsContext();
	console.log(numPages, currentPage);

	return <div>PageBtnContainer</div>;
};

export default PageBtnContainer;
