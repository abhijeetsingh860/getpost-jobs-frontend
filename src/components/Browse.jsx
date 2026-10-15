import React, { useEffect } from 'react';
import Navbar from './shared/NavBar';
import Footer from './shared/Footer';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetSavedJobs from '@/hooks/useGetSavedJobs';
import { Search, Sparkles, Briefcase, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const popularPills = ["Frontend", "Backend", "FullStack", "React", "Node", "Remote", "Data Analyst", "Design"];

const Browse = () => {
    useGetAllJobs();
    useGetSavedJobs();

    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className='min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />

            <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                {/* Header */}
                <div className='mb-8 text-center max-w-2xl mx-auto'>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Explore By Category
                    </div>
                    <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3'>
                        Browse Tech Roles
                    </h1>
                    <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6'>
                        Search through {allJobs.length} live job listings or tap any category pill below
                    </p>

                    {/* Search Input */}
                    <div className='flex items-center gap-2 px-4 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md shadow-indigo-500/5 mb-4'>
                        <Search className='w-4 h-4 text-indigo-500 shrink-0' />
                        <input
                            type="text"
                            placeholder="Filter by title, technology, or company..."
                            value={searchedQuery}
                            onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
                            className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                        />
                        {searchedQuery && (
                            <button onClick={() => dispatch(setSearchedQuery(""))} className="text-slate-400 hover:text-slate-600">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Popular Pills */}
                    <div className='flex items-center justify-center gap-2 flex-wrap'>
                        {popularPills.map((pill) => (
                            <button
                                key={pill}
                                onClick={() => dispatch(setSearchedQuery(pill))}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    searchedQuery === pill
                                        ? 'bg-indigo-600 text-white font-semibold'
                                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-400'
                                }`}
                            >
                                {pill}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {allJobs.length} {allJobs.length === 1 ? 'Job' : 'Jobs'} Available
                    </span>
                    {searchedQuery && (
                        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                            Matching: "{searchedQuery}"
                        </span>
                    )}
                </div>

                {/* Grid */}
                {allJobs.length <= 0 ? (
                    <div className='py-20 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800'>
                        <Briefcase className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">No Openings Found</h3>
                        <p className="text-xs text-slate-400 mt-1">Try clearing your search query to see all available roles.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <AnimatePresence>
                            {allJobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Browse;
