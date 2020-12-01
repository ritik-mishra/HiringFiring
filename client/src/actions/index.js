import axios from 'axios';
import { FETCH_USER, FETCH_JOBS } from './types';


// Beacuse we are using redux-thunk we are returning a dispatch function
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchJobs = () => async (dispatch) => {
    const res = await axios.get('/api/all_jobs');

    dispatch({ type: FETCH_JOBS, payload: res.data });
}