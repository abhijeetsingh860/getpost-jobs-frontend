import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { formatSalary } from '@/utils/formatSalary';
import { MapPin, IndianRupee, ArrowUpRight, Bookmark, Briefcase, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toggleSavedJobLocally } from '@/redux/jobSlice';
import { toast } from 'sonner';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { savedJobs } = useSelector(store => store.job);

    const isSaved = savedJobs?.some(j => (j._id || j) === job?._id) || 
                    user?.savedJobs?.some(j => (j._id || j) === job?._id);

    const handleBookmark = async (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error("Please sign in to bookmark jobs");
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

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group relative p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between backdrop-blur-md'
        >
            {/* Hover Glow Effect */}
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
            
            <div>
                {/* Top Header: Company + Bookmark */}
                <div className='flex items-start justify-between gap-3 mb-4'>
                    <div className='flex items-center gap-3 min-w-0'>
                        <Avatar className="h-12 w-12 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shrink-0 shadow-2xs">
                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                            <AvatarFallback className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl">
                                {job?.company?.name?.charAt(0) || "C"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <h3 className='font-semibold text-slate-900 dark:text-slate-100 text-sm truncate'>
                                    {job?.company?.name || "Company"}
                                </h3>
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            </div>
                            <div className='flex items-center gap-1 text-xs text-slate-400'>
                                <MapPin className='w-3 h-3 text-slate-400 shrink-0' />
                                <span className='truncate'>{job?.location || "India"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                        <button
                            type="button"
                            onClick={handleBookmark}
                            className={`p-2 rounded-full border transition-all duration-200 ${
                                isSaved 
                                    ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400' 
                                    : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-600 hover:border-indigo-300'
                            }`}
                            title={isSaved ? "Saved" : "Save job"}
                        >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                        </button>

                        <div className='p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200'>
                            <ArrowUpRight className='h-3.5 w-3.5' />
                        </div>
                    </div>
                </div>

                {/* Job Title */}
                <h2 className='font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1'>
                    {job?.title}
                </h2>
                
                {/* Description */}
                <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100 dark:border-slate-800'>
                <Badge variant="secondary" className='bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                    {job?.position || 1} Openings
                </Badge>
                <Badge variant="secondary" className='bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-900 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                    <Briefcase className="w-3 h-3 mr-1 inline" />
                    {job?.jobType}
                </Badge>
                <Badge variant="secondary" className='bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                    <IndianRupee className='h-3 w-3 mr-0.5 inline' />
                    {formatSalary(job?.salary)} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;