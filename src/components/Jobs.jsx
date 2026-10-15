import React, { useMemo, useState } from 'react';
import Navbar from './shared/NavBar';
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from './shared/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown, Briefcase, X } from 'lucide-react';
import { setSearchedQuery, clearAllFilters } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetSavedJobs from '@/hooks/useGetSavedJobs';
import { Button } from './ui/button';

const Jobs = () => {
    useGetAllJobs();
    useGetSavedJobs();

    const dispatch = useDispatch();
    const { 
        allJobs, 
        searchedQuery, 
        selectedLocation, 
        selectedJobType, 
        selectedSalaryRange 
    } = useSelector(store => store.job);

    const [sortBy, setSortBy] = useState("newest");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Multi-criteria Filtering & Sorting
    const filteredJobs = useMemo(() => {
        let result = [...allJobs];

        // 1. Text Query Search
        if (searchedQuery) {
            const query = searchedQuery.toLowerCase().trim();
            result = result.filter(job => {
                const titleMatch = job.title?.toLowerCase().includes(query);
                const descMatch = job.description?.toLowerCase().includes(query);
                const compMatch = job.company?.name?.toLowerCase().includes(query);
                const locMatch = job.location?.toLowerCase().includes(query);
                const reqMatch = Array.isArray(job.requirements) 
                    ? job.requirements.some(r => r.toLowerCase().includes(query))
                    : false;

                return titleMatch || descMatch || compMatch || locMatch || reqMatch;
            });
        }

        // 2. Location Filter
        if (selectedLocation) {
            result = result.filter(job => 
                job.location?.toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }

        // 3. Employment Type Filter
        if (selectedJobType) {
            result = result.filter(job => 
                job.jobType?.toLowerCase().includes(selectedJobType.toLowerCase())
            );
        }

        // 4. Numeric Salary Range Filter (LPA)
        if (selectedSalaryRange) {
            result = result.filter(job => {
                const salary = Number(job.salary) || 0;
                if (selectedSalaryRange === "0-6") return salary <= 6;
                if (selectedSalaryRange === "6-15") return salary >= 6 && salary <= 15;
                if (selectedSalaryRange === "15-30") return salary >= 15 && salary <= 30;
                if (selectedSalaryRange === "30+") return salary >= 30;
                return true;
            });
        }

        // 5. Sorting
        if (sortBy === "salary_high") {
            result.sort((a, b) => (Number(b.salary) || 0) - (Number(a.salary) || 0));
        } else if (sortBy === "positions") {
            result.sort((a, b) => (Number(b.position) || 0) - (Number(a.position) || 0));
        } else {
            // Newest first
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        return result;
    }, [allJobs, searchedQuery, selectedLocation, selectedJobType, selectedSalaryRange, sortBy]);

    return (
        <div className='min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />

            <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                
                {/* Header Banner */}
                <div className='mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
                            Explore Open Opportunities
                        </h1>
                        <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1'>
                            Showing <span className='font-bold text-indigo-600 dark:text-indigo-400'>{filteredJobs.length}</span> curated positions
                        </p>
                    </div>

                    {/* Search & Sort Controls */}
                    <div className='flex items-center gap-2.5 flex-wrap'>
                        {/* Inline Search Bar */}
                        <div className='flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs'>
                            <Search className='w-4 h-4 text-slate-400' />
                            <input
                                type="text"
                                placeholder="Search keyword, role, skill..."
                                value={searchedQuery}
                                onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
                                className="text-xs sm:text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 w-44 sm:w-56"
                            />
                            {searchedQuery && (
                                <button 
                                    onClick={() => dispatch(setSearchedQuery(""))}
                                    className='text-slate-400 hover:text-slate-600'
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Sort Selector */}
                        <div className='flex items-center gap-1.5 px-3 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-xs font-medium text-slate-600 dark:text-slate-300'>
                            <ArrowUpDown className='w-3.5 h-3.5 text-indigo-500' />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className='bg-transparent outline-none cursor-pointer text-slate-800 dark:text-slate-200 font-semibold text-xs'
                            >
                                <option value="newest" className="dark:bg-slate-900">Newest</option>
                                <option value="salary_high" className="dark:bg-slate-900">Highest Salary</option>
                                <option value="positions" className="dark:bg-slate-900">Most Openings</option>
                            </select>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <Button
                            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                            variant="outline"
                            className="md:hidden rounded-full text-xs font-semibold flex items-center gap-1.5"
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            Filters
                        </Button>
                    </div>
                </div>

                {/* Mobile Filter Drawer */}
                {mobileFilterOpen && (
                    <div className="md:hidden mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
                        <FilterCard />
                    </div>
                )}

                {/* Main Content Layout */}
                <div className='flex flex-col md:flex-row gap-8 items-start'>
                    
                    {/* Left Sticky Filter Sidebar */}
                    <div className='hidden md:block w-72 shrink-0'>
                        <FilterCard />
                    </div>

                    {/* Right Jobs Listing */}
                    <div className='flex-1 w-full'>
                        {filteredJobs.length <= 0 ? (
                            <div className='text-center py-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs p-8'>
                                <div className='w-16 h-16 mx-auto rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-sm'>
                                    <Briefcase className="w-8 h-8" />
                                </div>
                                <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-1'>
                                    No Openings Found
                                </h3>
                                <p className='text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6'>
                                    We couldn't find any jobs matching your current filter criteria. Try adjusting or resetting your filters.
                                </p>
                                <Button
                                    onClick={() => dispatch(clearAllFilters())}
                                    className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-xs font-semibold px-5 py-2.5 shadow-md shadow-indigo-500/20'
                                >
                                    Reset All Filters
                                </Button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch'>
                                <AnimatePresence>
                                    {filteredJobs.map((job) => (
                                        <motion.div
                                            key={job?._id}
                                            layout
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.25 }}
                                            className="h-full"
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Jobs;