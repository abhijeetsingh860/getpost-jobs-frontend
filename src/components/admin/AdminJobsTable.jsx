import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Power, CheckCircle2, XCircle, Users, ArrowUpRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { formatSalary } from '@/utils/formatSalary';
import { setAllAdminJobs } from '@/redux/jobSlice';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { 
        const filtered = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            const query = searchJobByText.toLowerCase();
            return job?.title?.toLowerCase().includes(query) || 
                   job?.company?.name?.toLowerCase().includes(query);
        });
        setFilterJobs(filtered);
    }, [allAdminJobs, searchJobByText]);

    const handleToggleStatus = async (jobId) => {
        try {
            const res = await axios.patch(`${JOB_API_END_POINT}/status/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                const updated = allAdminJobs.map(job => 
                    job._id === jobId ? { ...job, status: res.data.status } : job
                );
                dispatch(setAllAdminJobs(updated));
            }
        } catch (error) {
            console.error("Toggle job status error:", error);
            toast.error("Failed to update job status");
        }
    };

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No Jobs Created Yet</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Post your first company opening to begin reviewing candidates.</p>
                <Link to="/admin/jobs/create">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors">
                        Post an Opening
                    </span>
                </Link>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50/70 dark:bg-slate-800/50">
                    <TableRow className="border-b border-slate-200/80 dark:border-slate-800">
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Company</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Role & Compensation</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Applicants</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Status</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Posted Date</TableHead>
                        <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-slate-500">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.map((job) => {
                        const isClosed = job?.status === 'closed';
                        const applicantCount = job?.applications?.length || 0;

                        return (
                            <TableRow key={job._id} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                                {/* Company */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
                                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                                            <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs rounded-xl">
                                                {job?.company?.name?.charAt(0) || "C"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                                            {job?.company?.name || "Company"}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Title & Salary */}
                                <TableCell>
                                    <div>
                                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                                            {job?.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[11px] text-slate-400">{job?.jobType}</span>
                                            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                                {formatSalary(job?.salary)} LPA
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Applicants */}
                                <TableCell>
                                    <Link 
                                        to={`/admin/jobs/${job._id}/applicants`}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
                                    >
                                        <Users className="w-3.5 h-3.5" />
                                        <span>{applicantCount} Candidate{applicantCount === 1 ? '' : 's'}</span>
                                    </Link>
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                    <button
                                        onClick={() => handleToggleStatus(job._id)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                                            isClosed 
                                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                                                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'
                                        }`}
                                        title="Click to toggle status"
                                    >
                                        {isClosed ? <XCircle className="w-3 h-3 text-slate-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                        {isClosed ? 'Closed' : 'Active'}
                                    </button>
                                </TableCell>

                                {/* Date */}
                                <TableCell className="text-xs text-slate-400">
                                    {job?.createdAt ? job.createdAt.split("T")[0] : "Recently"}
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-44 p-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl" align="end">
                                            <button
                                                onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                                            >
                                                <Edit2 className="w-3.5 h-3.5 text-indigo-500" />
                                                Edit Opening
                                            </button>

                                            <button
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                                            >
                                                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                                                Review Applicants ({applicantCount})
                                            </button>

                                            <button
                                                onClick={() => handleToggleStatus(job._id)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left"
                                            >
                                                <Power className="w-3.5 h-3.5 text-amber-500" />
                                                {isClosed ? 'Reopen Job' : 'Close Job'}
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
