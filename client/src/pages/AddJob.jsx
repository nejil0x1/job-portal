import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const AddJob = () => {
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<h4 className='form-title'>Add Job</h4>
				<div className='form-center'>
					<FormRow type='text' name='position' />
					<FormRow type='text' name='company' />
					<FormRow
						type='text'
						labelText='Job Location'
						name='jobLocation'
						defaultValue={user.location}
					/>
					<FormRowSelect
						name='jobStatus'
						labelText='Job Status'
						defaultValue={JOB_STATUS.PENDING}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						name='jobType'
						labelText='Job Type'
						defaultValue={JOB_TYPE.FULL_TIME}
						list={Object.values(JOB_TYPE)}
					/>
					<button
						type='submit'
						className='btn btn-block form-btn'
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Submitting' : 'Submit'}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
};

export default AddJob;
