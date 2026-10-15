import React from 'react';
import { Button } from './ui/button';
import { Bookmark, MapPin, Briefcase, IndianRupee, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { formatSalary } from '@/utils/formatSalary';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toggleSavedJobLocally } from '@/redux/jobSlice';
import { toast } from 'sonner';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { savedJobs } = useSelector(store => store.job);

    const isSaved = savedJobs?.some(j => (j._id || j) === job?._id) || 
                    user?.savedJobs?.some(j => (j._id || j) === job?._id);

    const daysAgo = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const diffDays = Math.floor((currentTime - createdAt) / (1000 * 24 * 60 * 60));
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "1 day ago";
        return `${diffDays} days ago`;
    };

    const handleBookmark = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please sign in to save this job");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/saved-jobs/${job?._id}`, {}, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(toggleSavedJobLocally(job?._id));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Bookmark error:", error);
            toast.error("Failed to update bookmark");
        }
    };

    const isClosed = job?.status === 'closed';

    return (
        <div 
            onClick={() => navigate(`/description/${job?._id}`)}
            className='group relative p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 dark:hover:border-indigo-500/50 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-md'
        >
            {/* Top hover gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
                {/* Header: Date + Status + Bookmark */}
                <div className='flex items-center justify-between mb-4'>
                    <span className='inline-flex items-center gap-1.5 text-xs font-medium text-slate-400'>
                        <Clock className='w-3.5 h-3.5' />
                        {daysAgo(job?.createdAt)}
                    </span>

                    <div className='flex items-center gap-2'>
                        {isClosed ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                                Closed
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                Actively Hiring
                            </span>
                        )}

                        <button 
                            type="button"
                            onClick={handleBookmark}
                            className={`p-2 rounded-full border transition-all duration-200 ${
                                isSaved 
                                    ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 shadow-xs' 
                                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-600 hover:border-indigo-300'
                            }`}
                            title={isSaved ? "Saved to bookmarks" : "Save job"}
                        >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Company Info */}
                <div className='flex items-center gap-3.5 mb-4'>
                    <Avatar className="h-11 w-11 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-2xs">
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        <AvatarFallback className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl">
                            {job?.company?.name?.charAt(0) || "C"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                            <h3 className='font-semibold text-slate-800 dark:text-slate-200 text-sm truncate'>
                                {job?.company?.name || "Company"}
                            </h3>
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        </div>
                        <div className='flex items-center gap-1 text-xs text-slate-400'>
                            <MapPin className='w-3 h-3 text-slate-400 shrink-0' />
                            <span className="truncate">{job?.location || "Remote, India"}</span>
                        </div>
                    </div>
                </div>

                {/* Job Title */}
                <h2 className='font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1'>
                    {job?.title}
                </h2>

                {/* Description Snippet */}
                <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed'>
                    {job?.description}
                </p>

                {/* Pill Badges */}
                <div className='flex items-center gap-2 flex-wrap mb-5'>
                    <Badge variant="secondary" className='bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                        {job?.position || 1} {job?.position === 1 ? 'Opening' : 'Openings'}
                    </Badge>

                    <Badge variant="secondary" className='bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-900 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                        <Briefcase className="w-3 h-3 mr-1 inline" />
                        {job?.jobType}
                    </Badge>

                    <Badge variant="secondary" className='bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                        <IndianRupee className="w-3 h-3 mr-0.5 inline" />
                        {formatSalary(job?.salary)} LPA
                    </Badge>
                </div>
            </div>

            {/* Bottom Card Actions */}
            <div className='pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between'>
                <span className="text-xs text-slate-400 font-medium">
                    {job?.applications?.length || 0} Applicants
                </span>

                <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-full px-3 py-1 flex items-center gap-1 group/btn"
                >
                    <span>View Role</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
            </div>
        </div>
    );
};

export default Job;