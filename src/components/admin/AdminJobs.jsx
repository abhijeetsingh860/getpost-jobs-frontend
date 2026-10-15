import React, { useEffect, useState } from 'react';
import Navbar from '../shared/NavBar';
import Footer from '../shared/Footer';
import { Input } from '../ui/input';
import { Button } from '../ui/button'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { Search, PlusCircle, Layers, CheckCircle2, XCircle, Users, X } from 'lucide-react';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allAdminJobs } = useSelector(store => store.job);

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    const activeCount = allAdminJobs?.filter(j => j.status !== 'closed')?.length || 0;
    const closedCount = allAdminJobs?.filter(j => j.status === 'closed')?.length || 0;
    const totalApplicants = allAdminJobs?.reduce((acc, curr) => acc + (curr.applications?.length || 0), 0) || 0;

    return (
        <div className='min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />

            <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                
                {/* Header Section */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                            <Layers className="w-3.5 h-3.5" />
                            Recruiter Operations
                        </div>
                        <h1 className='text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight'>
                            Manage Job Openings
                        </h1>
                        <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1'>
                            Review applicant pipelines, toggle live status, and configure job requirements.
                        </p>
                    </div>

                    <Button 
                        onClick={() => navigate("/admin/jobs/create")}
                        className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs px-5 py-2.5 shadow-md shadow-indigo-500/20 flex items-center gap-2 self-start sm:self-center"
                    >
                        <PlusCircle className="w-4 h-4" />
                        <span>Post New Opening</span>
                    </Button>
                </div>

                {/* Recruiter Metric Cards */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                    <div className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between'>
                        <div>
                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Total Postings</span>
                            <h3 className='text-2xl font-black text-slate-900 dark:text-white mt-1'>{allAdminJobs?.length || 0}</h3>
                        </div>
                        <div className='p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'>
                            <Layers className="w-5 h-5" />
                        </div>
                    </div>

                    <div className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between'>
                        <div>
                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Active Listings</span>
                            <h3 className='text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1'>{activeCount}</h3>
                        </div>
                        <div className='p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'>
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    <div className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between'>
                        <div>
                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Closed Listings</span>
                            <h3 className='text-2xl font-black text-slate-500 mt-1'>{closedCount}</h3>
                        </div>
                        <div className='p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500'>
                            <XCircle className="w-5 h-5" />
                        </div>
                    </div>

                    <div className='p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between'>
                        <div>
                            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>Total Candidates</span>
                            <h3 className='text-2xl font-black text-purple-600 dark:text-purple-400 mt-1'>{totalApplicants}</h3>
                        </div>
                        <div className='p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'>
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Filter / Search Bar */}
                <div className='mb-6 flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs w-full max-w-sm'>
                        <Search className='w-4 h-4 text-slate-400 shrink-0' />
                        <input
                            type="text"
                            placeholder="Filter by role title or company..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="text-xs sm:text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 w-full"
                        />
                        {input && (
                            <button onClick={() => setInput("")} className="text-slate-400 hover:text-slate-600">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Admin Table */}
                <AdminJobsTable />

            </main>

            <Footer />
        </div>
    );
};

export default AdminJobs;
