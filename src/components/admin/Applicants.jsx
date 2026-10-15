import React, { useEffect, useState } from 'react';
import Navbar from '../shared/NavBar';
import Footer from '../shared/Footer';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { ArrowLeft, Users, Search, CheckCircle2, Clock, XCircle, X } from 'lucide-react';

const Applicants = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    const [statusTab, setStatusTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    const applications = applicants?.applications || [];
    const totalCount = applications.length;
    const pendingCount = applications.filter(a => a.status === 'pending').length;
    const acceptedCount = applications.filter(a => a.status === 'accepted').length;
    const rejectedCount = applications.filter(a => a.status === 'rejected').length;

    return (
        <div className='min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300'>
            <Navbar />

            <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                
                {/* Back Link */}
                <button
                    onClick={() => navigate("/admin/jobs")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Job Openings
                </button>

                {/* Header Section */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                            <Users className="w-3.5 h-3.5" />
                            Candidate Review Pipeline
                        </div>
                        <h1 className='text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight'>
                            Applicants for {applicants?.title || "Role"}
                        </h1>
                        <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1'>
                            Review qualifications, inspect candidate resumes, and update recruitment status.
                        </p>
                    </div>
                </div>

                {/* Status Metric Pills */}
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8'>
                    <button
                        onClick={() => setStatusTab("all")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                            statusTab === "all"
                                ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Applicants</span>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalCount}</h3>
                    </button>

                    <button
                        onClick={() => setStatusTab("pending")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                            statusTab === "pending"
                                ? 'bg-amber-50/80 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pending Review</span>
                        <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</h3>
                    </button>

                    <button
                        onClick={() => setStatusTab("accepted")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                            statusTab === "accepted"
                                ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Accepted / Shortlist</span>
                        <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{acceptedCount}</h3>
                    </button>

                    <button
                        onClick={() => setStatusTab("rejected")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                            statusTab === "rejected"
                                ? 'bg-rose-50/80 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 shadow-xs'
                                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
                        }`}
                    >
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Not Selected</span>
                        <h3 className="text-2xl font-black text-rose-500 mt-1">{rejectedCount}</h3>
                    </button>
                </div>

                {/* Candidate Search Bar */}
                <div className='mb-6 flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs w-full max-w-sm'>
                        <Search className='w-4 h-4 text-slate-400 shrink-0' />
                        <input
                            type="text"
                            placeholder="Search by candidate name, email, or skill..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-xs sm:text-sm bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 w-full"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <ApplicantsTable filterStatus={statusTab} searchQuery={searchQuery} />

            </main>

            <Footer />
        </div>
    );
};

export default Applicants;
