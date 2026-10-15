import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { setAllApplicants } from '@/redux/applicationSlice';

const shortlistingStatus = ["Accepted", "Rejected", "Pending"];

const ApplicantsTable = ({ filterStatus = "all", searchQuery = "" }) => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, applicationId) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message || `Status updated to ${status}`);
                
                // Update Redux state locally for immediate UI update
                if (applicants && applicants.applications) {
                    const updatedApps = applicants.applications.map(app => 
                        app._id === applicationId ? { ...app, status: status.toLowerCase() } : app
                    );
                    dispatch(setAllApplicants({ ...applicants, applications: updatedApps }));
                }
            }
        } catch (error) {
            console.error("Status update error:", error);
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    };

    let applications = applicants?.applications || [];

    // Filter by status tab
    if (filterStatus && filterStatus !== "all") {
        applications = applications.filter(item => 
            item.status?.toLowerCase() === filterStatus.toLowerCase()
        );
    }

    // Filter by search query
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        applications = applications.filter(item => {
            const name = item?.applicant?.fullname?.toLowerCase() || "";
            const email = item?.applicant?.email?.toLowerCase() || "";
            const skills = Array.isArray(item?.applicant?.profile?.skills)
                ? item.applicant.profile.skills.join(" ").toLowerCase()
                : "";
            return name.includes(q) || email.includes(q) || skills.includes(q);
        });
    }

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s === 'accepted') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Accepted
                </span>
            );
        }
        if (s === 'rejected') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    Rejected
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Pending
            </span>
        );
    };

    if (applications.length === 0) {
        return (
            <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No Candidates Found</h3>
                <p className="text-xs text-slate-400 mt-1">No applicants match your current search or status filter.</p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50/70 dark:bg-slate-800/50">
                    <TableRow className="border-b border-slate-200/80 dark:border-slate-800">
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Candidate</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Contact</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Resume</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Applied Date</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Current Status</TableHead>
                        <TableHead className="text-right font-bold text-xs uppercase tracking-wider text-slate-500">Decision</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((item) => (
                        <TableRow key={item._id} className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                            {/* Candidate Info */}
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
                                        <AvatarImage src={item?.applicant?.profile?.profilePhoto} alt={item?.applicant?.fullname} />
                                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs rounded-xl">
                                            {item?.applicant?.fullname?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                            {item?.applicant?.fullname}
                                        </h4>
                                        <p className="text-[11px] text-slate-400">
                                            {item?.applicant?.email}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Contact Number */}
                            <TableCell className="text-xs text-slate-600 dark:text-slate-300">
                                {item?.applicant?.phoneNumber || "N/A"}
                            </TableCell>

                            {/* Resume */}
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        href={item.applicant.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 text-xs font-semibold hover:bg-indigo-100 transition-colors"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                        <span className="truncate max-w-[130px]">
                                            {item.applicant.profile.resumeOriginalName || "Resume.pdf"}
                                        </span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                ) : (
                                    <span className="text-xs text-slate-400">No Resume</span>
                                )}
                            </TableCell>

                            {/* Date */}
                            <TableCell className="text-xs text-slate-400">
                                {item?.createdAt ? item.createdAt.split("T")[0] : (item?.applicant?.createdAt?.split("T")[0] || "Recently")}
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                {getStatusBadge(item?.status)}
                            </TableCell>

                            {/* Actions / Decision */}
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" align="end">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                                            Update Decision
                                        </span>
                                        {shortlistingStatus.map((status, index) => (
                                            <button
                                                key={index}
                                                onClick={() => statusHandler(status, item._id)}
                                                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors ${
                                                    item.status?.toLowerCase() === status.toLowerCase()
                                                        ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 font-bold'
                                                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                }`}
                                            >
                                                <span>{status}</span>
                                                {status === "Accepted" && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                                {status === "Rejected" && <XCircle className="w-3 h-3 text-rose-500" />}
                                                {status === "Pending" && <Clock className="w-3 h-3 text-amber-500" />}
                                            </button>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
