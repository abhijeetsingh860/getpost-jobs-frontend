import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Briefcase } from 'lucide-react';
import { Button } from './ui/button';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
   
    return (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 lg:my-24'>
            {/* Header */}
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10'>
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Handpicked Opportunities
                    </div>
                    <h2 className='text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight'>
                        Latest & Top <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600'>Job Openings</span>
                    </h2>
                    <p className='text-slate-500 dark:text-slate-400 text-sm mt-1'>
                        Discover the freshest opportunities posted by top tier engineering and design teams.
                    </p>
                </div>

                <Link to="/jobs">
                    <Button variant="outline" className='rounded-full border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-xs sm:text-sm font-semibold flex items-center gap-2 group'>
                        <span>Explore All Roles ({allJobs?.length || 0})</span>
                        <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </Button>
                </Link>
            </div>

            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {allJobs.length <= 0 ? (
                    <div className='col-span-full py-16 text-center rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800'>
                        <div className='w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3'>
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h3 className='font-bold text-slate-800 dark:text-slate-200'>No Job Openings Yet</h3>
                        <p className='text-xs text-slate-400 mt-1'>Be the first recruiter to post an opportunity!</p>
                        <Link to="/admin/jobs/create" className="inline-block mt-4">
                            <Button size="sm" className="bg-indigo-600 text-white rounded-full">
                                Post a Job
                            </Button>
                        </Link>
                    </div>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </section>
    );
};

export default LatestJobs;
