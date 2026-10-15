import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setSavedJobs } from '@/redux/jobSlice';

const useGetSavedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            if (!user) return;
            try {
                const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.savedJobs || []));
                }
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
            }
        };

        fetchSavedJobs();
    }, [dispatch, user]);
};

export default useGetSavedJobs;
