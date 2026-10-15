import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, selectedLocation, selectedJobType } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (searchedQuery) queryParams.append("keyword", searchedQuery);
                if (selectedLocation) queryParams.append("location", selectedLocation);
                if (selectedJobType) queryParams.append("jobType", selectedJobType);

                const url = `${JOB_API_END_POINT}/get${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
                const res = await axios.get(url, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs in useGetAllJobs:", error);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery, selectedLocation, selectedJobType]);
};

export default useGetAllJobs;