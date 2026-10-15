import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Clock, XCircle, Briefcase, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s === 'accepted') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Shortlisted / Accepted
                </span>
            );
        }
        if (s === 'rejected') {
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    Not Selected
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Under Review
            </span>
        );
    };

    if (!allAppliedJobs || allAppliedJobs.length <= 0) {
        return (
            <div className='py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8'>
                <div className='w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3'>
                    <Briefcase className="w-6 h-6" />
                </div>
                <h3 className='font-bold text-slate-800 dark:text-slate-200 text-sm'>You Haven't Applied to Any Jobs Yet</h3>
                <p className='text-xs text-slate-400 mt-1 mb-4'>Browse thousands of open roles and apply with one click.</p>
                <Link to="/jobs">
                    <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors">
                        Browse Opportunities
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                </Link>
            </div>
        );
    }

    return (
        <div className='rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden'>
            <Table>
                <TableHeader className="bg-slate-50/70 dark:bg-slate-800/50">
                    <TableRow className="border-b border-slate-200/80 dark:border-slate-800">
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Date</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Role & Company</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Job Type</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Status</TableHead>
                        <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-slate-500">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((item) => (
                        <TableRow key={item._id} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                            <TableCell className="text-xs text-slate-400 font-medium">
                                {item?.createdAt ? item.createdAt.split("T")[0] : "Recently"}
                            </TableCell>

                            <TableCell>
                                <div className='flex items-center gap-3'>
                                    <Avatar className="h-9 w-9 rounded-xl border border-slate-200/80 dark:border-slate-700 shrink-0">
                                        <AvatarImage src={item?.job?.company?.logo} alt={item?.job?.company?.name} />
                                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs rounded-xl">
                                            {item?.job?.company?.name?.charAt(0) || "C"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <Link to={`/description/${item?.job?._id}`} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">
                                            {item?.job?.title || "Role Title"}
                                        </Link>
                                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                            <Building2 className="w-3 h-3" />
                                            {item?.job?.company?.name || "Company"}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="text-xs text-slate-600 dark:text-slate-300">
                                <Badge variant="outline" className="text-[11px] font-semibold border-slate-200 dark:border-slate-700">
                                    {item?.job?.jobType || "Full-time"}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {getStatusBadge(item?.status)}
                            </TableCell>

                            <TableCell className="text-right">
                                <Link to={`/description/${item?.job?._id}`}>
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                        View Job
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
