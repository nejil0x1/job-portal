import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
	const searchValues = useAllJobsContext();
	// console.log(searchValues);
	const { search, jobStatus, jobType, sort } = searchValues;
	const submit = useSubmit();

	const debounce = onChange => {
		let timeout;
		return event => {
			const form = event.target.value;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				onChange(form);
			}, 2000);
			// console.log(event.target.form);
		};
	};

	return (
		<Wrapper>
			<Form className='form'>
				<h5 className='form-title'>search form</h5>
				<div className='form-center'>
					<FormRow
						type='search'
						name='search'
						labelText='search'
						defaultValue={search}
						onChange={debounce(form => {
							submit(form);
						})}
					/>
					<FormRowSelect
						name='jobStatus'
						labelText='job status'
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue={jobStatus}
						onChange={event => submit(event.target.form)}
					/>
					<FormRowSelect
						name='jobType'
						labelText='job type'
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue={jobType}
						onChange={event => submit(event.target.form)}
					/>
					<FormRowSelect
						name='sort'
						labelText='sort by'
						list={[...Object.values(JOB_SORT_BY)]}
						defaultValue={sort}
						onChange={event => submit(event.target.form)}
					/>
					<Link to={'/dashboard/all-jobs'} className='btn form-btn delete-btn'>
						Reset
					</Link>
					{/* TEMP */}
				</div>
			</Form>
		</Wrapper>
	);
};

export default SearchContainer;
