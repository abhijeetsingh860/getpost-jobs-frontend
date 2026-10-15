import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null, 
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [],
        selectedLocation: "",
        selectedJobType: "",
        selectedSalaryRange: "",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        },
        toggleSavedJobLocally: (state, action) => {
            const jobId = action.payload;
            const exists = state.savedJobs.some(j => (j._id || j) === jobId);
            if (exists) {
                state.savedJobs = state.savedJobs.filter(j => (j._id || j) !== jobId);
            } else {
                state.savedJobs.push(jobId);
            }
        },
        setSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },
        setSelectedJobType: (state, action) => {
            state.selectedJobType = action.payload;
        },
        setSelectedSalaryRange: (state, action) => {
            state.selectedSalaryRange = action.payload;
        },
        clearAllFilters: (state) => {
            state.searchedQuery = "";
            state.selectedLocation = "";
            state.selectedJobType = "";
            state.selectedSalaryRange = "";
        }
    }
});

export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery,
    setSavedJobs,
    toggleSavedJobLocally,
    setSelectedLocation,
    setSelectedJobType,
    setSelectedSalaryRange,
    clearAllFilters
} = jobSlice.actions;

export default jobSlice.reducer;