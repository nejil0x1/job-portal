import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {
	try {
		if (window.confirm('Do you want to delete this job?')) {
			await customFetch.delete(`/jobs/${params.id}`);
			toast.success('Job deleted successfully');
		}
	} catch (error) {
		toast.error(error?.response?.data?.msg);
	}
	return redirect('/dashboard/all-jobs');
};
